/**
 * js/app.js — powłoka aplikacji: pasek górny, nawigacja, montaż ekranów.
 *
 * Jedyny moduł wejściowy. Spina router z czterema ekranami, trzyma tytuł
 * i akcje w górnym pasku, pokazuje wskaźnik trwającego pomiaru, gdy kamera
 * pracuje poza ekranem pomiaru, obsługuje onboarding i service workera.
 * Ekrany ładują się leniwie — kto wchodzi tylko zmierzyć światło, nie płaci
 * pobraniem trzech pozostałych.
 */

import { ROUTES, start as startRouter, go } from './router.js';
import { bus } from './bus.js';
import * as store from './store.js';
import * as camera from './camera.js';
import { metricValueUnit } from './format.js';
import { byId } from './metrics.js';
import { h, icon, clear, mount, announce } from './ui/dom.js';
import { toast, sheet, closeAll } from './ui/overlays.js';

/* ──────────────────────────  Style powłoki  ─────────────────────────────
   Cztery arkusze opisują tokeny, powłokę, komponenty i ekrany. Wskaźnik
   trwającego pomiaru należy wyłącznie do tego pliku i nigdzie indziej się nie
   pojawia, więc jego kilkanaście linii jedzie razem z nim — dokładnie tak, jak
   robi to screens/measure.js. Selektory w :where(), żeby niczego nie przebiły. */

const STYLE_ID = 'm5-shell-style';
const STYLE = `
:where(.m5-topbar__status){display:flex;align-items:center;flex:0 1 auto;min-width:0}
:where(.m5-topbar__status[hidden]){display:none}

:where(.m5-livechip){display:inline-flex;align-items:center;gap:var(--sp-2);
  min-height:var(--tap);max-width:100%;padding:0 var(--sp-3);
  border-radius:var(--r-pill);background:var(--accent-soft);color:var(--accent);
  font-size:var(--fs-sm);font-weight:650;white-space:nowrap;
  transition:background-color var(--dur-1) var(--ease-out)}
@media (hover:hover){:where(.m5-livechip:hover){background:var(--accent-ring)}}
:where(.m5-livechip:active){transform:scale(.96)}
:where(.m5-livechip__dot){flex:0 0 auto;width:8px;height:8px;border-radius:var(--r-pill);
  background:currentColor;animation:m5-livepulse 1.6s var(--ease-in-out) infinite}
:where(.m5-livechip__value){font-family:var(--ff-num);font-variant-numeric:tabular-nums;
  overflow:hidden;text-overflow:ellipsis}
/* Etykieta słowna ustępuje pierwsza — wartość jest ważniejsza niż powtórzenie
   tego, co i tak mówi pulsująca kropka. */
:where(.m5-livechip__label){overflow:hidden;text-overflow:ellipsis}
@media (max-width:26rem){:where(.m5-livechip__label){display:none}}

@keyframes m5-livepulse{0%,100%{opacity:1}50%{opacity:.35}}
/* Kropka ma pulsować, ale nie u kogoś, kto ruchu sobie nie życzy. Wybór
   ustawiony w aplikacji wygrywa z ustawieniem systemu w obie strony. */
:root[data-motion="reduced"] :where(.m5-livechip__dot){animation:none}
@media (prefers-reduced-motion:reduce){
  :where(.m5-livechip__dot){animation:none}
}

/* Ostatnia deska ratunku po nieprzechwyconym wyjątku: zamiast białej strony
   komunikat i przycisk. Wygląda jak reszta aplikacji, bo używa jej tokenów. */
:where(.m5-fatal){display:flex;flex-direction:column;align-items:flex-start;
  gap:var(--sp-4);max-width:60ch}
:where(.m5-fatal__title){font-size:var(--fs-h2);font-weight:650}
:where(.m5-fatal__text){color:var(--text-2);line-height:var(--lh-normal)}
`;

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const tag = document.createElement('style');
  tag.id = STYLE_ID;
  tag.textContent = STYLE;
  document.head.appendChild(tag);
}

/* ─────────────────────────────  Elementy powłoki  ───────────────────────── */

const shell = {
  main: document.getElementById('main'),
  title: document.getElementById('screenTitle'),
  status: document.getElementById('topbarStatus'),
  actions: document.getElementById('topbarActions'),
  tabbar: document.getElementById('tabbar'),
  sidenav: document.getElementById('sidenav'),
  video: document.getElementById('camera'),
  canvas: document.getElementById('camCanvas')
};

/* Import statyczny wszystkich ekranów kosztowałby przy starcie cztery moduły
 * i wszystko, co one ciągną. Ścieżki są literałami, żeby przeglądarka
 * i service worker widziały je bez zgadywania. */
const LOADERS = {
  measure: () => import('./screens/measure.js'),
  history: () => import('./screens/history.js'),
  tools: () => import('./screens/tools.js'),
  support: () => import('./screens/support.js')
};

// id trasy -> {api, scrollTop}. Raz zbudowany ekran zostaje: powrót na niego
// ma przywrócić stan i pozycję przewijania, a nie zaczynać od zera.
const screens = new Map();
const navLinks = [];

let activeId = null;
let mountToken = 0;

/* ─────────────────────────────  Nawigacja  ─────────────────────────────── */

function buildNav() {
  // Kotwice są bezpośrednimi dziećmi obu list: pasek zakładek to siatka
  // o równych kolumnach, a pasek boczny kolumna flex — wtrącone <li>
  // przejęłoby rolę elementu układu i zakładka przestałaby wypełniać swoją
  // kolumnę (a z nią cel dotyku). Nawigacja i tak niesie już rolę listy przez
  // element <nav>, więc znacznika listy tu nie potrzeba.
  const tabs = h('div.m5-tabbar__list');
  const items = h('div.m5-sidenav__list');

  ROUTES.forEach((route) => {
    // Zwykłe kotwice, nie przyciski: działa środkowy przycisk myszy, działa
    // „otwórz w nowej karcie”, a klawiatura dostaje wszystko za darmo.
    const tab = h('a.m5-tab', { href: '#' + route.path },
      icon(route.icon, { size: 24 }),
      h('span.m5-tab__label', { text: route.labelPL }));

    const item = h('a.m5-navitem', { href: '#' + route.path },
      icon(route.icon, { size: 22 }),
      h('span.m5-navitem__label', { text: route.labelPL }));

    navLinks.push({ id: route.id, nodes: [tab, item] });
    mount(tabs, tab);
    mount(items, item);
  });

  mount(shell.tabbar, tabs);
  mount(shell.sidenav,
    h('div.m5-sidenav__brand', null,
      icon('gauge', { size: 22 }),
      h('span', { text: 'Monitor Światła' })),
    items);
}

function markActiveNav(id) {
  navLinks.forEach((entry) => {
    entry.nodes.forEach((node) => {
      if (entry.id === id) node.setAttribute('aria-current', 'page');
      else node.removeAttribute('aria-current');
    });
  });
}

/* ────────────────────────  Górny pasek: akcje ekranu  ──────────────────── */

function renderActions(api) {
  clear(shell.actions);
  let list = [];
  try {
    list = typeof api.actions === 'function' ? (api.actions() || []) : [];
  } catch (err) {
    // Ekran bez akcji jest w porządku; ekran, który przez akcje wywraca
    // powłokę, nie jest. Dlatego łykamy błąd i zostawiamy pusty pasek.
    console.error('[app] actions() ekranu rzuciło wyjątkiem:', err);
    return;
  }
  list.filter(Boolean).forEach((action) => {
    const label = action.labelPL || 'Akcja ekranu';
    mount(shell.actions, h('button.m5-iconbtn', {
      type: 'button',
      title: label,
      aria: { label },
      on: { click: () => { if (typeof action.onClick === 'function') action.onClick(); } }
    }, icon(action.icon || 'info', { size: 22 })));
  });
}

/* ─────────────────  Wskaźnik trwającego pomiaru (topbar)  ───────────────── */

const liveDot = h('span.m5-livechip__dot', { aria: { hidden: 'true' } });
const liveLabel = h('span.m5-livechip__label', { text: 'Pomiar trwa' });
const liveValue = h('span.m5-livechip__value', { text: '—' });
const liveChip = h('button.m5-livechip', {
  type: 'button',
  on: { click: () => go('/measure') }
}, liveDot, liveLabel, liveValue);

let cameraRunning = false;
let leadId = 'share';
let lastChipPaint = 0;

function refreshChipVisibility() {
  // Na ekranie pomiaru wskaźnik byłby powtórzeniem tego, na co użytkownik
  // właśnie patrzy — pokazujemy go dopiero, gdy pomiar zniknął z oczu.
  const show = cameraRunning && activeId !== 'measure';
  shell.status.hidden = !show;
  if (!show) lastChipPaint = 0;
}

function paintChip(reading, force) {
  if (shell.status.hidden) return;
  const now = Date.now();
  // Odczyty idą dziesięć razy na sekundę; tekst zmieniany z taką
  // częstotliwością jest nieczytelny i bez potrzeby zajmuje główny wątek.
  if (!force && now - lastChipPaint < 500) return;
  lastChipPaint = now;

  const metric = byId(leadId);
  const value = reading && typeof reading[leadId] === 'number' ? reading[leadId] : null;
  liveValue.textContent = metricValueUnit(leadId, value);
  liveChip.setAttribute('aria-label',
    'Pomiar trwa. ' + (metric ? metric.namePL : 'Wielkość wiodąca') + ': ' +
    liveValue.textContent + '. Wróć do ekranu pomiaru.');
}

function setupLiveChip() {
  mount(shell.status, liveChip);
  shell.status.hidden = true;
  leadId = store.get().leadMetric || 'share';

  bus.on('settings:changed', ({ settings }) => {
    leadId = (settings && settings.leadMetric) || 'share';
    paintChip(camera.last(), true);
  });

  bus.on('camera:state', ({ state }) => {
    cameraRunning = state === 'running' || state === 'starting';
    refreshChipVisibility();
    paintChip(camera.last(), true);
  });

  bus.on('camera:reading', ({ reading }) => paintChip(reading, false));
}

/* ────────────────────────────  Montaż ekranów  ─────────────────────────── */

async function instanceFor(id) {
  const cached = screens.get(id);
  if (cached) return cached;
  const module = await LOADERS[id]();
  const entry = { api: module.create(), scrollTop: 0 };
  screens.set(id, entry);
  return entry;
}

function detachCurrent() {
  if (!activeId) return;
  const entry = screens.get(activeId);
  if (!entry) return;
  entry.scrollTop = shell.main.scrollTop;
  try { entry.api.unmount(); }
  catch (err) { console.error('[app] unmount() ekranu rzuciło wyjątkiem:', err); }
  if (entry.api.el.parentNode === shell.main) shell.main.removeChild(entry.api.el);
}

// Ekran dociąga się leniwie, więc między zdjęciem poprzedniego a pojawieniem
// się nowego mija chwila (przy zimnej pamięci — kilka sekund). Zamiast pustej
// płaszczyzny pokazujemy szkielet i mówimy czytnikowi ekranu, że trwa praca.
function loadingPlaceholder() {
  return h('div.m5-screen', { aria: { hidden: 'true' } },
    h('div.m5-skeleton.m5-skeleton--title'),
    h('div.m5-skeleton.m5-skeleton--block'),
    h('div.m5-skeleton.m5-skeleton--block'));
}

async function showRoute(route) {
  if (route.id === activeId) return;

  const token = ++mountToken;
  detachCurrent();
  activeId = route.id;
  markActiveNav(route.id);
  refreshChipVisibility();

  // Tytuł ustawiamy przed dociągnięciem modułu: przy wolnym łączu pasek ma
  // od razu mówić, dokąd się idzie, a nie zostawać na poprzedniej nazwie.
  shell.title.textContent = route.labelPL;
  document.title = route.labelPL + ' — Monitor Światła';
  clear(shell.actions);

  const placeholder = loadingPlaceholder();
  mount(shell.main, placeholder);
  shell.main.setAttribute('aria-busy', 'true');
  const clearPlaceholder = () => {
    if (placeholder.parentNode === shell.main) shell.main.removeChild(placeholder);
    // aria-busy zdejmuje wyłącznie montaż aktualny: nowszy mógł je dopiero co
    // ustawić i wciąż czeka na swój moduł.
    if (token === mountToken) shell.main.removeAttribute('aria-busy');
  };

  let entry = null;
  try {
    entry = await instanceFor(route.id);
  } catch (err) {
    clearPlaceholder();
    if (token !== mountToken) return;
    showFatal('Nie udało się wczytać ekranu „' + route.labelPL + '”',
      'Prawdopodobnie zabrakło części plików w pamięci urządzenia. Połącz się z siecią i odśwież stronę.', err);
    return;
  }
  // W międzyczasie ktoś mógł dotknąć innej zakładki — wtedy ten montaż jest
  // już nieaktualny i nie ma prawa nadpisać nowszego.
  clearPlaceholder();
  if (token !== mountToken) return;

  mount(shell.main, entry.api.el);
  shell.title.textContent = entry.api.titlePL || route.labelPL;
  renderActions(entry.api);

  try { entry.api.mount(); }
  catch (err) { console.error('[app] mount() ekranu rzuciło wyjątkiem:', err); }

  shell.main.scrollTop = entry.scrollTop;
  // preventScroll: fokus ma trafić na <main> bez cofania właśnie przywróconej
  // pozycji przewijania.
  shell.main.focus({ preventScroll: true });
  announce(entry.api.titlePL || route.labelPL);
}

/* ─────────────────────────────  Onboarding  ────────────────────────────── */

function maybeOnboard() {
  if (store.get().onboarded) return;

  // Zapisujemy przy otwarciu, nie przy zamknięciu: arkusz zamknięty gestem
  // albo zamknięciem karty nie ma wracać przy każdym uruchomieniu.
  store.set({ onboarded: true });

  sheet({
    title: 'Zanim zaczniesz',
    body: [
      h('p.m5-screen__lead', { text: 'Monitor Światła patrzy kamerą na światło wokół Ciebie i liczy z niego siedem wielkości — od udziału niebieskiego po komfort wzrokowy.' }),
      h('p.m5-screen__note', { text: 'Obraz nie opuszcza tego urządzenia: nie ma serwera, nie ma konta i nie ma wysyłki. Wszystkie siedem wielkości działa od razu, bez logowania i bez opłat.' }),
      h('p.m5-screen__note', { text: 'To orientacja, a nie przyrząd pomiarowy ani badanie lekarskie. Czego nie da się zmierzyć, tego nie pokazujemy — zamiast liczby zobaczysz pauzę.' })
    ],
    actions: [{ labelPL: 'Zaczynamy', tone: 'primary', autofocus: true }]
  });
}

/* ────────────────────────────  Service worker  ─────────────────────────── */

let reloading = false;

function offerUpdate(worker) {
  if (!worker) return;
  // Komunikat z akcją nie znika sam — decyzję zostawiamy użytkownikowi,
  // bo przeładowanie w trakcie pomiaru zabrałoby trwającą sesję.
  toast('Dostępna nowa wersja', {
    tone: 'neutral',
    action: {
      labelPL: 'Odśwież',
      onClick: () => {
        try { worker.postMessage({ type: 'SKIP_WAITING' }); }
        catch (err) { window.location.reload(); }
      }
    }
  });
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // Nowy worker przejął stronę — dokładnie raz, inaczej pętla przeładowań.
    if (reloading) return;
    reloading = true;
    window.location.reload();
  });

  navigator.serviceWorker.register('./sw.js', { scope: './' }).then((reg) => {
    if (reg.waiting && navigator.serviceWorker.controller) offerUpdate(reg.waiting);

    reg.addEventListener('updatefound', () => {
      const next = reg.installing;
      if (!next) return;
      next.addEventListener('statechange', () => {
        // Brak controllera znaczy „pierwsza instalacja”, a nie „aktualizacja”;
        // wtedy nie ma o czym informować.
        if (next.state === 'installed' && navigator.serviceWorker.controller) offerUpdate(next);
      });
    });
  }).catch(() => {
    // Brak HTTPS, tryb prywatny, workery wyłączone w przeglądarce. Aplikacja
    // działa dalej, tylko bez trybu offline — nie ma tu czego zgłaszać.
  });
}

/* ──────────────────────  Awaria: nigdy biały ekran  ────────────────────── */

const SCREEN_ROOTS = '.m5-screen, .m5-measure, .m5-history, .m5-tools, .m5-support, .m5-fatal';

let fatalShown = false;
let lastFailToastAt = 0;

function showFatal(title, text, err) {
  if (err) console.error('[app] ' + title, err);
  if (fatalShown) return;
  fatalShown = true;
  clear(shell.actions);
  clear(shell.main);
  mount(shell.main, h('div.m5-screen', null,
    h('div.m5-fatal', null,
      h('h2.m5-fatal__title', { text: title }),
      h('p.m5-fatal__text', { text }),
      h('button.m5-btn.m5-btn--primary', {
        type: 'button',
        on: { click: () => window.location.reload() }
      }, 'Odśwież stronę'))));
  announce(title);
}

function onFatalError(event) {
  const err = event && (event.error || event.reason);
  if (!shell.main || !shell.main.querySelector(SCREEN_ROOTS)) {
    showFatal('Coś poszło nie tak',
      'Aplikacja nie zdołała złożyć ekranu. Odświeżenie strony zwykle wystarcza — zapisane pomiary i ustawienia zostają na miejscu.', err);
    return;
  }
  // Ekran stoi, więc awaria dotknęła fragmentu, nie całości. Zabranie
  // działającego widoku byłoby gorsze od samej usterki: zostaje dyskretny
  // komunikat, najwyżej raz na dziesięć sekund.
  const now = Date.now();
  if (now - lastFailToastAt < 10000) return;
  lastFailToastAt = now;
  console.error('[app] nieprzechwycony błąd:', err);
  toast('Coś się popsuło w tle', {
    tone: 'error',
    action: { labelPL: 'Odśwież', onClick: () => window.location.reload() }
  });
}

/* ──────────────────  Sprzątanie po symulowanej monetyzacji  ─────────────── */

/* Symulowane konto i płatności zniknęły z aplikacji, ale ich klucze zostały
 * w pamięci przeglądarek, w których poprzednia wersja zdążyła się uruchomić.
 * Kasujemy dokładnie te dwa — pomiary (ms5.history.v1), sesje
 * (ms5.sessions.v1) i ustawienia (ms5.settings.v1) zostają nietknięte. */
const LEGACY_KEYS = ['ms5.account.v1', 'ms5.billing.v1'];

function dropLegacyKeys() {
  try {
    LEGACY_KEYS.forEach((key) => window.localStorage.removeItem(key));
  } catch (err) { /* tryb prywatny albo zablokowana pamięć — nie ma czego kasować */ }
}

/* ───────────────────────────────  Start  ──────────────────────────────── */

function boot() {
  ensureStyles();
  dropLegacyKeys();
  store.applyToRoot();

  buildNav();
  setupLiveChip();

  // Kamera dostaje elementy z powłoki raz, na starcie: dzięki temu istnieje
  // dokładnie jeden strumień i jeden canvas próbkujący, niezależnie od tego,
  // ile razy ekran pomiaru będzie montowany i odmontowywany.
  camera.attach({ video: shell.video, canvas: shell.canvas });

  bus.on('route:changed', ({ route }) => {
    // Arkusz otwarty na poprzednim ekranie nie ma prawa przeżyć zmiany trasy:
    // zostałby nad nowym ekranem razem z zasłoną i pułapką fokusa.
    closeAll();
    showRoute(route);
  });
  startRouter();

  maybeOnboard();

  if (document.readyState === 'complete') registerServiceWorker();
  else window.addEventListener('load', registerServiceWorker, { once: true });
}

window.addEventListener('error', onFatalError);
window.addEventListener('unhandledrejection', onFatalError);

try {
  boot();
} catch (err) {
  showFatal('Nie udało się uruchomić aplikacji',
    'Powłoka nie wystartowała. Odśwież stronę — zapisane pomiary i ustawienia zostają na miejscu.', err);
}
