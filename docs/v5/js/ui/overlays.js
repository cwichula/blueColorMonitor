/**
 * ui/overlays.js — warstwy nad interfejsem: toast, arkusz, dialog, paywall.
 *
 * Jeden stos warstw pilnuje wspólnych rzeczy: zasłony, blokady przewijania
 * tła, pułapki fokusa, klawisza Esc i powrotu fokusa do elementu, który
 * warstwę otworzył. Arkusz i dialog to ta sama konstrukcja — o tym, czy
 * wjeżdża od dołu, czy stoi na środku, decyduje wyłącznie CSS.
 * Jedyna zależność: ui/dom.js. billing.js i metrics.js ładujemy leniwie.
 *
 * Klasy dla autora css/components.css:
 *   m5-scrim              zasłona pod warstwami (element #scrim), [hidden], [data-state="open"|"closing"]
 *   m5-layer              host warstw (#sheetHost, #dialogHost); modyfikatory
 *                         m5-layer--sheet (dół ekranu / środek od 720 px) i m5-layer--dialog
 *   m5-sheet              korpus warstwy: [data-state="open"|"closing"]
 *     m5-sheet__grip      uchwyt-kreska u góry arkusza (ozdoba, aria-hidden)
 *     m5-sheet__head      nagłówek: tytuł + przycisk zamknięcia
 *     m5-sheet__title     tytuł (h2), cel dla aria-labelledby
 *     m5-sheet__close     przycisk „Zamknij” (ikona, cel dotyku 44 px)
 *     m5-sheet__body      przewijalna treść
 *     m5-sheet__actions   pasek przycisków na dole
 *   m5-dialog             wariant wąski, zawsze wyśrodkowany (razem z m5-sheet)
 *     m5-dialog__text     akapit pytania, cel dla aria-describedby
 *   m5-toasts             kontener komunikatów (#toasts)
 *   m5-toast              komunikat: [data-tone="neutral|success|warn|error"]
 *     m5-toast__text  m5-toast__action  m5-toast__close
 *   m5-paywall            treść arkusza sprzedażowego wewnątrz m5-sheet__body
 *     m5-paywall__demo  m5-paywall__badge  m5-paywall__lead  m5-paywall__benefits  m5-paywall__benefit
 *     m5-paywall__plans m5-paywall__plan  m5-paywall__plan-badge m5-paywall__note
 *   m5-btn                przycisk; modyfikatory --primary, --ghost, --danger, --icon
 *                         (dodatkowo data-tone z tą samą wartością)
 */

import { h, icon, trapFocus } from './dom.js';

/* ────────────────────────────  Hosty warstw  ──────────────────────────── */

let uid = 0;
const nextId = (prefix) => `m5-${prefix}-${++uid}`;

// Powłoka dostarcza hosty w index.html; brakujące dorabiamy, żeby warstwy
// działały także zanim powłoka je doda (i w podglądzie pojedynczego ekranu).
function host(id, classes) {
  let el = document.getElementById(id);
  if (!el) {
    el = h('div', { id });
    document.body.appendChild(el);
  }
  classes.split(' ').forEach((c) => el.classList.add(c));
  return el;
}

const hosts = {
  get scrim() { return host('scrim', 'm5-scrim'); },
  get sheet() { return host('sheetHost', 'm5-layer m5-layer--sheet'); },
  get dialog() { return host('dialogHost', 'm5-layer m5-layer--dialog'); },
  get toasts() { return host('toasts', 'm5-toasts'); }
};

/* ────────────────────  Blokada przewijania tła  ───────────────────────── */

let lockCount = 0;
let lockedY = 0;

// W tej powłoce <body> się nie przewija: .m5-app ma 100dvh, a jedynym obszarem
// przewijania jest .m5-main. Dlatego blokujemy klasą .m5-noscroll z base.css
// (zatrzymuje i dokument, i .m5-main), a pozycję odtwarzamy na tym scrollerze.
function scroller() {
  return document.querySelector('.m5-main');
}

function lockScroll() {
  if (lockCount++) return;
  const main = scroller();
  lockedY = main ? main.scrollTop : (window.scrollY || document.documentElement.scrollTop || 0);
  document.documentElement.classList.add('m5-noscroll');
  document.body.dataset.scrollLocked = 'true';
}

function unlockScroll() {
  if (lockCount === 0 || --lockCount) return;
  document.documentElement.classList.remove('m5-noscroll');
  delete document.body.dataset.scrollLocked;
  const main = scroller();
  // Wymuszamy przeliczenie układu: dopóki obszar nie odzyska pełnej wysokości,
  // przeglądarka przycięłaby przywracane przewinięcie do zera.
  void document.body.offsetHeight;
  if (main) main.scrollTop = lockedY;
  else window.scrollTo(0, lockedY);
}

/* ─────────────────────────────  Stos warstw  ──────────────────────────── */

const layers = [];

function onEscape(event) {
  if (event.key !== 'Escape' || event.defaultPrevented) return;
  const top = layers[layers.length - 1];
  if (!top || !top.dismissible) return;
  event.preventDefault();
  top.close();
}

function onScrimClick() {
  const top = layers[layers.length - 1];
  if (top && top.dismissible) top.close();
}

function syncScrim() {
  const scrim = hosts.scrim;
  if (layers.length) {
    scrim.hidden = false;
    scrim.dataset.state = 'open';
    return;
  }
  scrim.dataset.state = 'closing';
  exitTransition(scrim, () => {
    if (layers.length) return; // w międzyczasie otwarto kolejną warstwę
    scrim.hidden = true;
    delete scrim.dataset.state;
  });
}

// Czeka na koniec przejścia CSS, ale nie ufa mu bezgranicznie: przy
// prefers-reduced-motion przejścia trwają 1 ms albo nie ma ich wcale.
function exitTransition(el, done) {
  let finished = false;
  const end = () => {
    if (finished) return;
    finished = true;
    el.removeEventListener('transitionend', onEnd);
    clearTimeout(timer);
    done();
  };
  const onEnd = (event) => { if (event.target === el) end(); };
  el.addEventListener('transitionend', onEnd);
  const timer = setTimeout(end, 420);
}

/**
 * Wspólny mechanizm otwierania warstwy modalnej.
 * root — element z role="dialog", hostEl — kontener na ekranie.
 */
function openLayer(root, hostEl, { dismissible = true, onClosed } = {}) {
  const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  let closed = false;

  const layer = {
    root,
    dismissible,
    close(result) {
      if (closed) return;
      closed = true;
      const idx = layers.indexOf(layer);
      if (idx >= 0) layers.splice(idx, 1);
      release();
      hostEl.removeEventListener('click', onHostClick);
      if (!layers.length) {
        document.removeEventListener('keydown', onEscape, true);
        hosts.scrim.removeEventListener('click', onScrimClick);
      }
      root.dataset.state = 'closing';
      unlockScroll();
      syncScrim();
      // Fokus wraca od razu — czekanie na koniec animacji zostawiłoby
      // klawiaturę w próżni na kilkaset milisekund.
      if (opener && opener.isConnected) opener.focus({ preventScroll: true });
      exitTransition(root, () => {
        root.remove();
        if (!hostEl.childElementCount) {
          hostEl.hidden = true;
          delete hostEl.dataset.open;
        }
        if (typeof onClosed === 'function') onClosed(result);
      });
    }
  };

  // Klik w tło hosta (obok korpusu) działa jak klik w zasłonę.
  const onHostClick = (event) => {
    if (event.target === hostEl && dismissible && !closed) layer.close();
  };

  lockScroll();
  hostEl.hidden = false;
  hostEl.dataset.open = 'true';
  hostEl.appendChild(root);
  layers.push(layer);
  if (layers.length === 1) {
    document.addEventListener('keydown', onEscape, true);
    hosts.scrim.addEventListener('click', onScrimClick);
  }
  syncScrim();

  hostEl.addEventListener('click', onHostClick);

  const release = trapFocus(root);
  // Stan „open” po wymuszonym przeliczeniu układu, a nie w requestAnimationFrame:
  // rAF nie chodzi w ukrytej karcie, a warstwa musi pojawić się zawsze.
  void root.offsetHeight;
  root.dataset.state = 'open';

  return layer;
}

/** Zamyka wszystkie otwarte warstwy — przydatne przy zmianie trasy. */
export function closeAll() {
  [...layers].reverse().forEach((layer) => layer.close());
}

/* ────────────────────────────────  Toast  ─────────────────────────────── */

const MAX_TOASTS = 3;
const toastQueue = [];
const toastsVisible = [];

function shiftToastQueue() {
  while (toastsVisible.length < MAX_TOASTS && toastQueue.length) {
    showToast(toastQueue.shift());
  }
}

function showToast(item) {
  const { text, tone, action, duration } = item;
  const alarming = tone === 'error' || tone === 'warn';
  const el = h('div.m5-toast', {
    dataset: { tone },
    // Błąd musi przerwać czytnik, zwykłe potwierdzenie może poczekać. Sama rola
    // niesie już aria-live i aria-atomic — jawne atrybuty dublowałyby zgłoszenie.
    aria: { role: alarming ? 'alert' : 'status' }
  }, h('span.m5-toast__text', { text }));

  let timer = 0;
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    clearTimeout(timer);
    el.dataset.state = 'closing';
    exitTransition(el, () => {
      el.remove();
      const idx = toastsVisible.indexOf(entry);
      if (idx >= 0) toastsVisible.splice(idx, 1);
      shiftToastQueue();
    });
  };
  const entry = { close };

  if (action) {
    el.appendChild(h('button.m5-btn.m5-toast__action', {
      type: 'button',
      dataset: { tone: 'ghost' },
      on: { click: () => { close(); action.onClick?.(); } }
    }, action.labelPL || 'Wykonaj'));
  }
  // Zamknięcie dostaje każdy komunikat, także ten bez akcji: inaczej zdania
  // o błędzie nie da się ani zatrzymać, ani odzyskać — nie ma dziennika.
  el.appendChild(h('button.m5-btn.m5-btn--icon.m5-toast__close', {
    type: 'button',
    aria: { label: 'Zamknij komunikat' },
    on: { click: close }
  }, icon('close', { size: 18 })));

  // Błąd i ostrzeżenie niosą radę naprawczą — 3,2 s to za mało, żeby je
  // przeczytać przy powiększeniu albo wolniejszym czytaniu.
  const life = alarming && duration > 0 ? Math.max(duration, 8000) : duration;
  let remaining = life;
  let startedAt = 0;
  const startTimer = () => {
    // Komunikat z akcją czeka na decyzję — sam nie znika.
    if (closed || action || !(remaining > 0)) return;
    startedAt = Date.now();
    timer = setTimeout(close, remaining);
  };
  const pauseTimer = () => {
    if (closed || !timer) return;
    clearTimeout(timer);
    timer = 0;
    remaining -= Date.now() - startedAt;
  };
  // Wskaźnik nad komunikatem i fokus w jego wnętrzu wstrzymują odliczanie
  // (WCAG 2.2.1); po zejściu odliczamy resztę, a nie pełny czas od nowa.
  el.addEventListener('pointerenter', pauseTimer);
  el.addEventListener('focusin', pauseTimer);
  el.addEventListener('pointerleave', startTimer);
  el.addEventListener('focusout', startTimer);

  hosts.toasts.appendChild(el);
  toastsVisible.push(entry);
  el.dataset.state = 'closed';
  void el.offsetHeight; // punkt startowy przejścia CSS (patrz openLayer)
  el.dataset.state = 'open';
  startTimer();
  item.resolve(entry);
}

/**
 * toast('Zapisano', {tone:'success'})
 * tone: 'neutral' | 'success' | 'warn' | 'error'
 * action: {labelPL, onClick} — komunikat z akcją nie znika samoczynnie
 * Zwraca {close}. Na ekranie widoczne są najwyżej trzy naraz, reszta czeka.
 */
export function toast(text, { tone = 'neutral', action = null, duration = 3200 } = {}) {
  const handle = {
    // Dopóki komunikat czeka w kolejce, zamknięcie oznacza wyjęcie go z niej.
    close: () => {
      const idx = toastQueue.indexOf(item);
      if (idx >= 0) toastQueue.splice(idx, 1);
    }
  };
  const item = {
    text: String(text ?? ''),
    tone,
    action,
    duration,
    resolve: (entry) => { handle.close = entry.close; }
  };
  toastQueue.push(item);
  shiftToastQueue();
  return handle;
}

/* ────────────────────────────────  Arkusz  ────────────────────────────── */

function actionButton(action, api) {
  if (action instanceof Node) return action;
  const tone = action.tone || 'ghost';
  const btn = h('button.m5-btn', {
    type: 'button',
    class: `m5-btn--${tone}`,
    dataset: { tone },
    disabled: action.disabled === true,
    autofocus: action.autofocus === true,
    on: {
      click: () => {
        const keep = action.onClick ? action.onClick(api) : undefined;
        // Akcja może zatrzymać arkusz otwarty: zwracając true albo flagą keepOpen.
        if (!action.keepOpen && keep !== true) api.close();
      }
    }
  }, action.labelPL || '');
  return btn;
}

/**
 * sheet({title, body, actions, dismissible}) -> {close}
 *
 * body: element / tekst / tablica. actions: lista {labelPL, onClick, tone,
 * keepOpen, disabled, autofocus} albo gotowych elementów.
 * Dodatkowo (poza kontraktem, opcjonalnie): className — dodatkowa klasa
 * korpusu, onClose — wywoływane po zamknięciu, labelPL — etykieta dla
 * czytnika, gdy arkusz nie ma widocznego tytułu.
 */
export function sheet({
  title = '',
  body = null,
  actions = [],
  dismissible = true,
  className = '',
  labelPL = '',
  onClose = null
} = {}) {
  const titleId = nextId('title');
  const root = h('div.m5-sheet', {
    class: className,
    aria: { role: 'dialog', modal: 'true' },
    dataset: { state: 'closed' }
  });
  if (title) root.setAttribute('aria-labelledby', titleId);
  else root.setAttribute('aria-label', labelPL || 'Okno');

  const api = { close: () => {} };

  if (dismissible) root.appendChild(h('div.m5-sheet__grip', { aria: { hidden: 'true' } }));

  if (title || dismissible) {
    root.appendChild(h('header.m5-sheet__head', null,
      title ? h('h2.m5-sheet__title', { id: titleId, text: title }) : h('span'),
      dismissible
        ? h('button.m5-btn.m5-btn--icon.m5-sheet__close', {
            type: 'button',
            aria: { label: 'Zamknij' },
            on: { click: () => api.close() }
          }, icon('close', { size: 22 }))
        : null
    ));
  }

  const bodyEl = h('div.m5-sheet__body', null, body);
  root.appendChild(bodyEl);

  const list = (actions || []).filter(Boolean);
  if (list.length) {
    root.appendChild(h('div.m5-sheet__actions', null, list.map((a) => actionButton(a, api))));
  }

  // Dopóki pod dolną krawędzią została treść, korzeń arkusza nosi
  // data-more="true" — components.css zapala wtedy wygaszenie nad paskiem
  // akcji. Sam overflow tego nie powie: ucięty w połowie wiersz wygląda
  // identycznie jak wiersz, który po prostu się nie zmieścił.
  const syncOverflow = () => {
    const left = bodyEl.scrollHeight - bodyEl.clientHeight - bodyEl.scrollTop;
    root.dataset.more = left > 2 ? 'true' : 'false';
  };
  bodyEl.addEventListener('scroll', syncOverflow, { passive: true });
  const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(syncOverflow) : null;

  const layer = openLayer(root, hosts.sheet, {
    dismissible,
    onClosed: (result) => {
      if (observer) observer.disconnect();
      if (typeof onClose === 'function') onClose(result);
    }
  });
  // Obserwujemy i kadr, i treść: kadr zmienia się przy obrocie ekranu,
  // a treść — gdy arkusz dopisze coś po otwarciu.
  if (observer) {
    observer.observe(bodyEl);
    if (bodyEl.firstElementChild) observer.observe(bodyEl.firstElementChild);
  }
  syncOverflow();
  api.close = (result) => layer.close(result);
  api.el = root;
  api.body = bodyEl;
  return api;
}

/* ────────────────────────────────  Dialog  ────────────────────────────── */

/**
 * dialog({title, text, confirmPL, cancelPL, tone}) -> Promise<boolean>
 * Esc, zasłona i „Anuluj” dają false. tone:'danger' maluje potwierdzenie na
 * czerwono i ustawia fokus na „Anuluj” — przy operacji nieodwracalnej to
 * bezpieczniejszy domyślny wybór.
 */
export function dialog({
  title = '',
  text = '',
  confirmPL = 'Potwierdź',
  cancelPL = 'Anuluj',
  tone = 'primary'
} = {}) {
  return new Promise((resolve) => {
    const danger = tone === 'danger';
    const textId = nextId('desc');
    let answer = false;

    const api = sheet({
      title,
      className: 'm5-dialog',
      dismissible: true,
      body: text ? h('p.m5-dialog__text', { id: textId, text }) : null,
      actions: [
        {
          labelPL: cancelPL,
          tone: 'ghost',
          autofocus: danger,
          onClick: () => { answer = false; }
        },
        {
          labelPL: confirmPL,
          tone: danger ? 'danger' : 'primary',
          autofocus: !danger,
          onClick: () => { answer = true; }
        }
      ],
      onClose: () => resolve(answer)
    });
    if (text) api.el.setAttribute('aria-describedby', textId);
  });
}

/* ───────────────────────────────  Paywall  ────────────────────────────── */

// billing.js i metrics.js wchodzą do gry dopiero tutaj — dzięki temu
// ui/overlays.js zależy statycznie wyłącznie od ui/dom.js, a brak modułu
// (albo jego wcześniejszy błąd) nie wywraca całej aplikacji.
async function lazyModule(path) {
  try {
    return await import(path);
  } catch {
    return null;
  }
}

// Wiersz planu WYBIERA plan, nie kupuje go: zakup rusza dopiero z przycisku
// w stopce arkusza, który powtarza cenę. Warunki odnowienia (perMonthPL,
// notePL) stoją w samym wierszu — tak samo jak na ekranie Konto.
function planRow(plan, onSelect) {
  const metaText = [plan.perMonthPL, plan.notePL].filter(Boolean).join('. ');
  return h('button.m5-btn.m5-paywall__plan', {
    type: 'button',
    dataset: { plan: plan.id, tone: 'primary' },
    aria: { pressed: 'false' },
    on: { click: (event) => onSelect(plan, event.currentTarget) }
  },
  h('span.m5-paywall__plan-name', { text: plan.namePL || plan.id }),
  h('span.m5-paywall__plan-price', { text: [plan.pricePL, plan.periodPL].filter(Boolean).join(' ') }),
  plan.badgePL ? h('span.m5-paywall__plan-badge', { text: plan.badgePL }) : null,
  plan.savingPL ? h('span.m5-paywall__plan-saving', { text: plan.savingPL }) : null,
  metaText ? h('span.m5-account__plan-meta', { style: { flex: '1 1 100%' }, text: metaText }) : null);
}

function planSentence(plan) {
  return [plan.namePL, [plan.pricePL, plan.periodPL].filter(Boolean).join(' ')]
    .filter(Boolean).join(' — ');
}

// Kształt wyniku purchase() nie jest w kontrakcie ustalony, więc traktujemy
// odrzucenie szeroko: wyjątek, false, ok:false, error, status 'declined'.
function purchaseFailed(result) {
  if (result === false) return true;
  if (!result || typeof result !== 'object') return false;
  return result.ok === false || result.declined === true || result.status === 'declined' || !!result.error;
}

function failureText(result) {
  const message = result && typeof result === 'object'
    ? (result.messagePL || result.reasonPL || result.error)
    : null;
  return typeof message === 'string' && message ? message : 'Płatność odrzucona (symulacja). Spróbuj ponownie.';
}

/**
 * paywall(metricId) -> Promise<void>
 * Arkusz sprzedażowy dla zablokowanej wielkości. Ceny i korzyści zawsze
 * z billing.js — nic nie jest wpisane na sztywno. Rozwiązuje się w chwili
 * zamknięcia arkusza, niezależnie od wyniku „zakupu”.
 */
export async function paywall(metricId) {
  const [billing, metrics] = await Promise.all([lazyModule('../billing.js'), lazyModule('../metrics.js')]);

  if (!billing || typeof billing.PLANS === 'undefined') {
    // Bez modułu płatności nie udajemy sklepu — mówimy wprost, co się dzieje.
    return new Promise((resolve) => {
      sheet({
        title: 'Wersja premium',
        body: h('p', { text: 'Ta część demonstracji nie jest teraz dostępna. Pomiar i historia działają bez zmian.' }),
        actions: [{ labelPL: 'Rozumiem', tone: 'primary' }],
        onClose: () => resolve()
      });
    });
  }

  const item = metrics && typeof metrics.byId === 'function' ? metrics.byId(metricId) : null;
  const metricName = item?.namePL || '';
  const plans = Array.isArray(billing.PLANS) ? billing.PLANS : [];
  const benefits = typeof billing.benefits === 'function' ? (billing.benefits() || []) : [];
  const trialAvailable = typeof billing.startTrial === 'function'
    && !(typeof billing.isTrial === 'function' && billing.isTrial())
    && !(typeof billing.isPremium === 'function' && billing.isPremium());

  return new Promise((resolve) => {
    const content = h('div.m5-paywall');

    content.appendChild(h('p.m5-paywall__demo', {
      aria: { role: 'note' }
    }, h('span.m5-paywall__badge', { text: 'Demo' }),
       ' Płatności są symulowane. Żadne dane nie opuszczają urządzenia.'));

    content.appendChild(h('p.m5-paywall__lead', {
      text: metricName
        ? `„${metricName}” to wielkość z pakietu pełnego. Odblokuj wszystkie siedem wielkości i pełną historię.`
        : 'Odblokuj wszystkie wielkości pomiaru i pełną historię.'
    }));

    if (benefits.length) {
      content.appendChild(h('ul.m5-paywall__benefits', null, benefits.map((b) => h('li.m5-paywall__benefit', null,
        icon(b.icon || 'check', { size: 20 }),
        h('span', null,
          h('strong', { text: b.titlePL || '' }),
          b.textPL ? h('span', { text: ` ${b.textPL}` }) : null)
      ))));
    }

    const plansEl = h('div.m5-paywall__plans', {
      aria: { role: 'group', label: 'Plany do wyboru' }
    });
    content.appendChild(plansEl);
    // Główna akcja jest czynna od pierwszej chwili: dopóki nic nie wybrano,
    // jej napis jest poleceniem („Wybierz plan”) i przewija arkusz do listy
    // planów. Wyłączony przycisk pod listą, której nie widać bez przewinięcia,
    // wyglądałby na zepsuty i nie mówiłby, czego brakuje.
    const buyButton = h('button.m5-btn.m5-btn--primary', {
      type: 'button',
      dataset: { tone: 'primary' },
      on: {
        click: () => {
          if (selected) { buy(selected, buyButton); return; }
          plansEl.scrollIntoView({ block: 'nearest' });
          rows[0]?.focus();
        }
      }
    }, 'Wybierz plan');
    content.appendChild(h('p.m5-paywall__note', {
      text: 'Symulacja: nie pobieramy żadnych opłat, a zakup możesz cofnąć w zakładce Konto.'
    }));

    const api = sheet({
      title: 'Pełny pomiar',
      className: 'm5-paywall-sheet',
      body: content,
      actions: [
        buyButton,
        trialAvailable ? {
          labelPL: 'Rozpocznij 7 dni próbnych',
          tone: 'primary',
          onClick: () => {
            try {
              billing.startTrial();
              toast('Okres próbny aktywny przez 7 dni.', { tone: 'success' });
            } catch {
              toast('Nie udało się rozpocząć okresu próbnego.', { tone: 'error' });
            }
          }
        } : null,
        typeof billing.restore === 'function' ? {
          labelPL: 'Przywróć zakup',
          tone: 'ghost',
          keepOpen: true,
          onClick: () => {
            let restored = false;
            try {
              restored = billing.restore() !== false;
            } catch {
              restored = false;
            }
            toast(restored ? 'Zakup przywrócony.' : 'Nie znaleziono zakupu do przywrócenia.',
              { tone: restored ? 'success' : 'neutral' });
            if (restored) api.close();
          }
        } : null,
        { labelPL: 'Nie teraz', tone: 'ghost' }
      ],
      onClose: () => resolve()
    });

    let selected = null;
    const rows = [];
    const select = (plan, button) => {
      selected = plan;
      rows.forEach((row) => row.setAttribute('aria-pressed', row === button ? 'true' : 'false'));
      buyButton.disabled = busy;
      buyButton.textContent = `Kup: ${planSentence(plan)}`;
    };

    let busy = false;
    const buy = async (plan, button) => {
      if (busy || typeof billing.purchase !== 'function') return;
      busy = true;
      button.disabled = true;
      button.dataset.state = 'busy';
      button.setAttribute('aria-busy', 'true');
      try {
        const result = await billing.purchase(plan.id);
        if (purchaseFailed(result)) {
          toast(failureText(result), { tone: 'error' });
        } else {
          toast('Pakiet pełny aktywny. Dziękujemy!', { tone: 'success' });
          api.close();
          return;
        }
      } catch {
        toast('Nie udało się dokończyć zakupu (symulacja).', { tone: 'error' });
      } finally {
        busy = false;
        if (button.isConnected) {
          button.disabled = false;
          delete button.dataset.state;
          button.removeAttribute('aria-busy');
        }
      }
    };

    plans.forEach((plan) => {
      const row = planRow(plan, select);
      rows.push(row);
      plansEl.appendChild(row);
    });
  });
}
