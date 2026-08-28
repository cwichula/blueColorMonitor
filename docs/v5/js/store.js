/* Monitor Światła v5 — js/store.js
 *
 * ROLA PLIKU: jedyne miejsce, które trzyma ustawienia użytkownika, jedyne, które
 * zapisuje klucz 'ms5.settings.v1', i jedyne, które przekłada ustawienia na
 * atrybuty elementu <html> oraz na metę theme-color.
 *
 * Dwie zasady, na których stoi ten moduł:
 * 1. Nie ufamy temu, co leży w localStorage — pochodzi ze starszej wersji, z
 *    ręcznej edycji albo z uszkodzonego zapisu. Każde pole przechodzi walidację,
 *    a wartość nierozpoznana wraca do domyślnej, zamiast rozlać się po aplikacji.
 * 2. Brak trwałej pamięci (tryb prywatny, zablokowane dane witryn) nie jest
 *    błędem krytycznym: ustawienia działają wtedy z pamięci procesu i znikają
 *    razem z kartą. Dlatego każdy dostęp do localStorage stoi w try/catch.
 */

import { bus } from './bus.js';
import { byId } from './metrics.js';

const KEY = 'ms5.settings.v1';

export const DEFAULTS = {
  // null znaczy „wg urządzenia”: dopóki użytkownik nie wybierze języka ręcznie,
  // decyduje navigator.languages, a nie zapis. Rozstrzyga to js/i18n/index.js.
  language: null,
  theme: 'system',
  accent: 'ocean',
  textScale: 1,
  density: 'comfortable',
  motion: 'system',
  leadMetric: 'share',
  historyRange: '1h',
  keepAwake: true,
  haptics: true,
  thresholds: {},                 // { [metricId]: {warn, crit} } — nadpisania użytkownika
  calibration: { r: 1, g: 1, b: 1 },
  onboarded: false
};

export const THEMES = ['system', 'light', 'dark'];

/* Próbki palet. Ekran „Wygląd” musi pokazać kolor akcentu, którego akurat nie ma
   na ekranie, więc jedyne hexy w tym pliku to te pięć par. Są to wartości
   --accent dla danego data-accent z css/tokens.css:
   swatchLight — motyw jasny (kontrast ≥ 4,5:1 na białej karcie),
   swatchDark  — motyw ciemny (kontrast ≥ 4,5:1 na ciemnym tle).

   Nazwy palet zostały stąd wyjęte: paleta niesie KLUCZ, a napis bierze ekran
   przez t(nameKey). Ten moduł nie może zawołać t() sam — i18n/index.js
   importuje store, więc import w drugą stronę zrobiłby cykl. */
export const ACCENTS = [
  { id: 'ocean',  nameKey: 'accent.ocean',  swatchLight: '#0b5fd0', swatchDark: '#79b4ff' },
  { id: 'violet', nameKey: 'accent.violet', swatchLight: '#6636cf', swatchDark: '#b39bff' },
  { id: 'amber',  nameKey: 'accent.amber',  swatchLight: '#8a5a06', swatchDark: '#e9b45c' },
  { id: 'mint',   nameKey: 'accent.mint',   swatchLight: '#0a6f5c', swatchDark: '#4fd3ae' },
  { id: 'rose',   nameKey: 'accent.rose',   swatchLight: '#b31552', swatchDark: '#ff8aa6' }
];

/* Listy dopuszczalnych wartości — ekran ustawień buduje z nich kontrolki, dzięki
   czemu nigdzie nie powstaje drugi, rozjeżdżający się zbiór opcji. */
export const TEXT_SCALES = [1, 1.15, 1.3];
export const DENSITIES = ['comfortable', 'compact'];
export const MOTIONS = ['system', 'reduced'];

/* Identyfikatory zakresów historii. Store nie importuje history.js (drzewo
   zależności z kontraktu), a musi umieć sprawdzić zapisaną wartość, zanim
   history.js w ogóle się załaduje. Lista ma być zgodna z history.RANGES. */
export const HISTORY_RANGE_IDS = ['1m', '5m', '1h', '24h', '7d', '30d'];

/* Kolory awaryjne mety theme-color: używane tylko wtedy, gdy tokens.css jeszcze
   się nie wczytał i getComputedStyle nie zna --surface-0. */
const FALLBACK_SURFACE = { light: '#eff2f8', dark: '#0f1622' };

let state = clone(DEFAULTS);
let persistent = true;          // dopóki zapis się nie wywróci, zakładamy trwałość

/* ------------------------------------------------------------------
   Pomocnicze
   ------------------------------------------------------------------ */

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function oneOf(value, list, fallback) {
  return list.indexOf(value) === -1 ? fallback : value;
}

function bool(value, fallback) {
  return typeof value === 'boolean' ? value : fallback;
}

/* Skala tekstu bywa zapisana jako '1.15' (np. przez skrypt anty-FOUC, który
   czyta i zapisuje atrybut), więc przyjmujemy też napis — ale wynik musi trafić
   w jedną z trzech dozwolonych wartości. */
function scale(value, fallback) {
  const n = typeof value === 'string' ? Number(value.replace(',', '.')) : value;
  if (typeof n !== 'number' || !isFinite(n)) return fallback;
  for (let i = 0; i < TEXT_SCALES.length; i += 1) {
    if (Math.abs(TEXT_SCALES[i] - n) < 0.001) return TEXT_SCALES[i];
  }
  return fallback;
}

function gain(value) {
  if (typeof value !== 'number' || !isFinite(value)) return 1;
  // Kalibracja to korekta, nie filtr — poza tym zakresem pomiar przestałby
  // cokolwiek znaczyć, więc przycinamy zamiast odrzucać całe ustawienie.
  return Math.min(2, Math.max(0.5, Math.round(value * 1000) / 1000));
}

function accentIds() {
  return ACCENTS.map((a) => a.id);
}

/* Kod języka sprawdzamy tu tylko co do KSZTAŁTU (dwie–trzy małe litery albo
   null), a nie co do listy obsługiwanych języków. Lista mieszka w
   js/i18n/index.js, a ten moduł importuje store — zaimportowanie jej z
   powrotem zrobiłoby cykl. Kod spoza listy nie jest groźny: i18n i tak sięgnie
   po zapas, a ustawienie przestanie istnieć przy pierwszym zapisie. */
function languageCode(value) {
  if (typeof value !== 'string') return null;
  return /^[a-z]{2,3}$/.test(value) ? value : null;
}

/* ------------------------------------------------------------------
   Walidacja
   ------------------------------------------------------------------ */

/* Nadpisanie progów przyjmujemy tylko wtedy, gdy dotyczy znanej wielkości,
   mieści się w jej zakresie i zachowuje kierunek skali (przy `invert` wyższa
   wartość jest lepsza, więc warn musi być WYŻSZY od crit). Nadpisanie, które
   tego nie spełnia, odrzucamy po cichu — wielkość dostanie progi katalogowe. */
function validThreshold(metricId, entry) {
  const metric = byId(metricId);
  if (!metric || !isPlainObject(entry)) return null;

  const warn = Number(entry.warn);
  const crit = Number(entry.crit);
  if (!isFinite(warn) || !isFinite(crit)) return null;
  if (warn < metric.min || warn > metric.max) return null;
  if (crit < metric.min || crit > metric.max) return null;
  if (metric.invert ? !(warn > crit) : !(warn < crit)) return null;

  return { warn, crit };
}

function validThresholds(raw) {
  const out = {};
  if (!isPlainObject(raw)) return out;
  Object.keys(raw).forEach((id) => {
    const entry = validThreshold(id, raw[id]);
    if (entry) out[id] = entry;
  });
  return out;
}

function validCalibration(raw) {
  if (!isPlainObject(raw)) return clone(DEFAULTS.calibration);
  return { r: gain(raw.r), g: gain(raw.g), b: gain(raw.b) };
}

function validate(raw) {
  const source = isPlainObject(raw) ? raw : {};
  return {
    language: languageCode(source.language),
    theme: oneOf(source.theme, THEMES, DEFAULTS.theme),
    accent: oneOf(source.accent, accentIds(), DEFAULTS.accent),
    textScale: scale(source.textScale, DEFAULTS.textScale),
    density: oneOf(source.density, DENSITIES, DEFAULTS.density),
    motion: oneOf(source.motion, MOTIONS, DEFAULTS.motion),
    // Wielkość wiodąca musi istnieć w katalogu — inaczej ekran pomiaru zostałby
    // bez wskaźnika-bohatera.
    leadMetric: byId(source.leadMetric) ? source.leadMetric : DEFAULTS.leadMetric,
    historyRange: oneOf(source.historyRange, HISTORY_RANGE_IDS, DEFAULTS.historyRange),
    keepAwake: bool(source.keepAwake, DEFAULTS.keepAwake),
    haptics: bool(source.haptics, DEFAULTS.haptics),
    thresholds: validThresholds(source.thresholds),
    calibration: validCalibration(source.calibration),
    onboarded: bool(source.onboarded, DEFAULTS.onboarded)
  };
}

/* ------------------------------------------------------------------
   Trwałość
   ------------------------------------------------------------------ */

function load() {
  let raw = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch (err) {
    persistent = false;         // tryb prywatny albo zablokowane dane witryn
    return clone(DEFAULTS);
  }
  if (!raw) return clone(DEFAULTS);
  try {
    return validate(JSON.parse(raw));
  } catch (err) {
    // Uszkodzony wpis jest gorszy niż jego brak: kasujemy, żeby nie wracał.
    try { window.localStorage.removeItem(KEY); } catch (e) { /* nie szkodzi */ }
    return clone(DEFAULTS);
  }
}

function save() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
    persistent = true;
  } catch (err) {
    // Ustawienia to kilkaset bajtów — porażka oznacza brak zgody na zapis,
    // a nie brak miejsca. Aplikacja działa dalej z pamięci procesu.
    persistent = false;
  }
}

/** Czy ustawienia przetrwają zamknięcie karty. Powłoka może o tym uprzedzić. */
export function isPersistent() {
  return persistent;
}

/* ------------------------------------------------------------------
   Motyw na <html> i meta theme-color
   ------------------------------------------------------------------ */

function prefersDark() {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (err) {
    return false;
  }
}

function effectiveTheme() {
  return state.theme === 'system' ? (prefersDark() ? 'dark' : 'light') : state.theme;
}

/* Jedna meta theme-color, w całości sterowana z JS. Gdyby index.html zostawił
   warianty z atrybutem `media`, wygrywałyby one z naszą wartością i pasek
   przeglądarki rozjechałby się z ręcznie wybranym motywem — więc zostawiamy
   dokładnie jedną metę, bez `media`. */
function themeMeta() {
  const all = Array.prototype.slice.call(
    document.querySelectorAll('meta[name="theme-color"]')
  );
  let meta = all.shift() || null;
  all.forEach((extra) => extra.remove());
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  meta.removeAttribute('media');
  return meta;
}

export function applyToRoot() {
  if (typeof document === 'undefined' || !document.documentElement) return;
  const root = document.documentElement;

  // Brak atrybutu znaczy „domyślnie”: motyw wg systemu, skala 1, gęstość
  // comfortable, ruch wg systemu. Dlatego wartości domyślne kasują atrybut,
  // zamiast go ustawiać — CSS nie musi znać przypadku „system”.
  if (state.theme === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', state.theme);

  root.setAttribute('data-accent', state.accent);

  if (state.textScale === 1) root.removeAttribute('data-text-scale');
  else root.setAttribute('data-text-scale', String(state.textScale));

  if (state.density === 'comfortable') root.removeAttribute('data-density');
  else root.setAttribute('data-density', state.density);

  if (state.motion === 'reduced') root.setAttribute('data-motion', 'reduced');
  else root.removeAttribute('data-motion');

  // Kolor paska przeglądarki bierzemy z tokenów, a nie z drugiej palety w JS —
  // dzięki temu zmiana tokens.css nie wymaga ruszania tego pliku.
  let computed = '';
  try {
    computed = window.getComputedStyle(root).getPropertyValue('--surface-0').trim();
  } catch (err) { /* brak stylów — użyjemy koloru awaryjnego */ }
  themeMeta().setAttribute('content', computed || FALLBACK_SURFACE[effectiveTheme()]);
}

/* Przy theme:'system' przełączenie motywu w systemie zmienia tokeny, ale nie
   przechodzi przez set() — bez tego nasłuchu meta theme-color zostawałaby
   z kolorem sprzed zmiany i pasek przeglądarki nie pasowałby do interfejsu. */
try {
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const onSchemeChange = () => { if (state.theme === 'system') applyToRoot(); };
  if (typeof darkQuery.addEventListener === 'function') darkQuery.addEventListener('change', onSchemeChange);
  else if (typeof darkQuery.addListener === 'function') darkQuery.addListener(onSchemeChange);
} catch (err) { /* brak matchMedia: pasek zostaje z kolorem ustawionym przy starcie */ }

/* ------------------------------------------------------------------
   Publiczne API
   ------------------------------------------------------------------ */

/** Kopia ustawień — wywołujący może ją bezkarnie modyfikować. */
export function get() {
  return clone(state);
}

/**
 * Scala łatkę z bieżącym stanem, waliduje CAŁOŚĆ (nie samą łatkę, bo pola
 * zależą od siebie: próg musi pasować do wielkości), zapisuje, stosuje na
 * <html> i ogłasza zmianę.
 */
export function set(patch) {
  if (!isPlainObject(patch)) return get();

  const next = Object.assign(clone(state), patch);
  // Obiekty zagnieżdżone scalamy polami, żeby zapis jednego progu nie skasował
  // pozostałych; podanie pustego obiektu nadal czyści całość.
  if (isPlainObject(patch.thresholds)) {
    next.thresholds = Object.assign(clone(state.thresholds), patch.thresholds);
  }
  if (isPlainObject(patch.calibration)) {
    next.calibration = Object.assign(clone(state.calibration), patch.calibration);
  }

  state = validate(next);
  save();
  applyToRoot();
  bus.emit('settings:changed', { settings: get() });
  return get();
}

export function reset() {
  state = clone(DEFAULTS);
  save();
  applyToRoot();
  bus.emit('settings:changed', { settings: get() });
  return get();
}

/**
 * Progi obowiązujące dla wielkości: nadpisanie użytkownika, a w jego braku
 * wartości z katalogu metrics.js. Nieznana wielkość → null, żeby wywołujący
 * nie dostał wymyślonych liczb.
 */
export function thresholdsFor(metricId) {
  const metric = byId(metricId);
  if (!metric) return null;
  const override = state.thresholds[metricId];
  if (override) return { warn: override.warn, crit: override.crit };
  return { warn: metric.warn, crit: metric.crit };
}

/* ------------------------------------------------------------------
   Start
   ------------------------------------------------------------------ */

state = load();

if (typeof document !== 'undefined') {
  applyToRoot();

  // Przy theme='system' zmiana motywu systemu nie przechodzi przez set(), więc
  // metę theme-color trzeba odświeżyć samodzielnie.
  try {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => { if (state.theme === 'system') applyToRoot(); };
    if (typeof query.addEventListener === 'function') query.addEventListener('change', onChange);
    else if (typeof query.addListener === 'function') query.addListener(onChange);
  } catch (err) { /* starsza przeglądarka — motyw i tak przełącza CSS */ }
}
