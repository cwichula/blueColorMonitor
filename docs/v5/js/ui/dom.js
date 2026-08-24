/**
 * ui/dom.js — warstwa pomocnicza nad DOM dla Monitora Światła v5.
 *
 * Zawiera fabrykę elementów h(), drobne narzędzia (frag/clear/mount/qs/qsa),
 * pułapkę fokusa, komunikaty dla czytnika ekranu, długie przytrzymanie,
 * dławienie do klatki, pobieranie pliku, wibrację oraz komplet ikon SVG.
 * Moduł nie ma statycznych zależności — jest liściem drzewa importów, więc
 * ustawienia (wibracja) czyta ze store.js dopiero przez import dynamiczny.
 */

/* ─────────────────────────────  h() i budowa DOM  ───────────────────────── */

// 'button.m5-btn.m5-btn--primary' -> nazwa taga + lista klas.
// Sam skrót klasowy ('.m5-card') daje <div>, bo to najczęstszy przypadek.
function parseTag(tag) {
  const parts = String(tag || 'div').split('.');
  const name = parts.shift() || 'div';
  return { name, classes: parts.filter(Boolean) };
}

function applyClass(el, value) {
  if (Array.isArray(value)) {
    value.filter(Boolean).forEach((c) => applyClass(el, c));
    return;
  }
  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([name, on]) => { if (on) el.classList.add(name); });
    return;
  }
  String(value).split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
}

function applyStyle(el, value) {
  if (typeof value === 'string') { el.setAttribute('style', value); return; }
  Object.entries(value).forEach(([key, v]) => {
    if (v === null || v === undefined) return;
    // Własne właściwości (--x) wymagają setProperty, zwykłe idą przez el.style.
    if (key.startsWith('--')) el.style.setProperty(key, String(v));
    else el.style[key] = v;
  });
}

// Właściwości, których nie da się poprawnie ustawić atrybutem po pierwszym
// renderze (atrybut opisuje wartość początkową, nie bieżącą).
const AS_PROPERTY = new Set(['value', 'checked', 'indeterminate', 'selected']);

function applyProps(el, props) {
  Object.entries(props).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (key === 'class' || key === 'className') { applyClass(el, value); return; }
    if (key === 'text') { el.textContent = String(value); return; }
    if (key === 'html') { el.innerHTML = value; return; } // wyłącznie własne, stałe fragmenty
    if (key === 'style') { applyStyle(el, value); return; }
    if (key === 'dataset') {
      Object.entries(value).forEach(([k, v]) => {
        if (v !== null && v !== undefined) el.dataset[k] = String(v);
      });
      return;
    }
    if (key === 'aria') {
      Object.entries(value).forEach(([k, v]) => {
        if (v === null || v === undefined || v === false) return;
        el.setAttribute(k === 'role' ? 'role' : 'aria-' + k, v === true ? 'true' : String(v));
      });
      return;
    }
    if (key === 'on') {
      Object.entries(value).forEach(([name, handler]) => {
        if (!handler) return;
        if (Array.isArray(handler)) el.addEventListener(name, handler[0], handler[1]);
        else el.addEventListener(name, handler);
      });
      return;
    }
    if (key === 'ref') {
      if (typeof value === 'function') value(el);
      else if (typeof value === 'object') value.current = el;
      return;
    }
    if (AS_PROPERTY.has(key)) { el[key] = value; return; }
    if (value === true) { el.setAttribute(key, ''); return; }
    if (value === false) { el.removeAttribute(key); return; }
    el.setAttribute(key, String(value));
  });
}

function appendChild(parent, child) {
  if (child === null || child === undefined || child === false || child === true) return;
  if (Array.isArray(child)) { child.forEach((c) => appendChild(parent, c)); return; }
  parent.appendChild(child instanceof Node ? child : document.createTextNode(String(child)));
}

// Drugi argument jest propsami tylko wtedy, gdy to zwykły obiekt — dzięki temu
// h('p', 'tekst') i h('div', [a, b]) działają bez pustego {}.
function isProps(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Node);
}

export function h(tag, props, ...children) {
  const { name, classes } = parseTag(tag);
  const el = document.createElement(name);
  if (classes.length) el.classList.add(...classes);
  if (isProps(props)) applyProps(el, props);
  else if (props !== undefined) children.unshift(props);
  children.forEach((child) => appendChild(el, child));
  return el;
}

export function frag(...children) {
  const f = document.createDocumentFragment();
  children.forEach((child) => appendChild(f, child));
  return f;
}

export function clear(el) {
  if (!el) return el;
  while (el.firstChild) el.removeChild(el.firstChild);
  return el;
}

export function mount(parent, ...children) {
  children.forEach((child) => appendChild(parent, child));
  return parent;
}

export function qs(sel, root = document) {
  return root ? root.querySelector(sel) : null;
}

export function qsa(sel, root = document) {
  return root ? Array.from(root.querySelectorAll(sel)) : [];
}

/* ───────────────────────────────  Ikony  ──────────────────────────────── */

// Koło zębate rysujemy proceduralnie: ręcznie zapisana ścieżka z ośmioma
// zębami byłaby nieczytelna i łatwo o pomyłkę w jednym z 32 punktów.
function gearPath({ cx = 12, cy = 12, teeth = 8, rOut = 9.1, rIn = 7.1, half = 11, flank = 4 } = {}) {
  const step = 360 / teeth;
  const pt = (r, deg) => {
    const a = (deg * Math.PI) / 180;
    return (cx + r * Math.cos(a)).toFixed(2) + ' ' + (cy + r * Math.sin(a)).toFixed(2);
  };
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const c = i * step;
    d += (i === 0 ? 'M' : 'L') + pt(rOut, c - half);
    d += 'A' + rOut + ' ' + rOut + ' 0 0 1 ' + pt(rOut, c + half);              // wierzchołek zęba
    d += 'L' + pt(rIn, c + half + flank);                                       // bok zęba
    d += 'A' + rIn + ' ' + rIn + ' 0 0 1 ' + pt(rIn, c + step - half - flank);  // wcięcie
  }
  return d + 'Z';
}

/**
 * ICONS[name] to wnętrze <svg viewBox="0 0 24 24"> — same kształty, bez
 * atrybutów prezentacji (te dokłada icon()). Wspólny rysunek całego zestawu:
 * kreska 1.75, currentColor, fill none, zaokrąglone końce i złączenia,
 * treść w polu 3–21 px, ten sam promień łuków i ten sam rytm odstępów.
 */
export const ICONS = {
  gauge: '<path d="M3.6 17.8a8.4 8.4 0 1 1 16.8 0"/><path d="M12 17.8l4.8-6.2"/><circle cx="12" cy="17.8" r="1.2"/>',
  chart: '<path d="M4.2 3.8v14.6a1.4 1.4 0 0 0 1.4 1.4h14.2"/><path d="M7.6 15.4l3.6-4.2 3 2.4 4.6-6"/>',
  sliders: '<path d="M4 8.2h8.2M17.2 8.2h2.8M4 15.8h2.8M11.8 15.8h8.2"/><circle cx="14.6" cy="8.2" r="2.4"/><circle cx="9.2" cy="15.8" r="2.4"/>',
  user: '<circle cx="12" cy="8.6" r="3.8"/><path d="M4.8 20c0-3.4 3.2-5.6 7.2-5.6s7.2 2.2 7.2 5.6"/>',
  droplet: '<path d="M12 3.4c3.6 4.2 5.6 7.1 5.6 9.5a5.6 5.6 0 1 1-11.2 0c0-2.4 2-5.3 5.6-9.5z"/>',
  sun: '<circle cx="12" cy="12" r="4.1"/><path d="M12 3.2v2.1M12 18.7v2.1M3.2 12h2.1M18.7 12h2.1M5.8 5.8l1.5 1.5M16.7 16.7l1.5 1.5M18.2 5.8l-1.5 1.5M7.3 16.7l-1.5 1.5"/>',
  thermometer: '<path d="M14 14.3V6.2a2 2 0 1 0-4 0v8.1a4.2 4.2 0 1 0 4 0z"/><path d="M16.6 8.2H14M16.6 11.2H14"/>',
  moon: '<path d="M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8a8.6 8.6 0 1 0 10.8 10.8z"/>',
  wave: '<path d="M3 12c1.5-4.6 3-4.6 4.5 0s3 4.6 4.5 0 3-4.6 4.5 0 3 4.6 4.5 0"/>',
  grid: '<rect x="3.8" y="3.8" width="7" height="7" rx="1.9"/><rect x="13.2" y="3.8" width="7" height="7" rx="1.9"/><rect x="3.8" y="13.2" width="7" height="7" rx="1.9"/><rect x="13.2" y="13.2" width="7" height="7" rx="1.9"/>',
  heart: '<path d="M12 20.2S4.4 15.6 4.4 10.5A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 7.6 2.5c0 5.1-7.6 9.7-7.6 9.7z"/>',
  play: '<path d="M8.4 5.4l10.2 6.6-10.2 6.6z"/>',
  stop: '<rect x="6.4" y="6.4" width="11.2" height="11.2" rx="2.6"/>',
  cameraFlip: '<rect x="2.9" y="7.6" width="18.2" height="12.5" rx="2.6"/><path d="M8.4 7.6l1.5-2.6h4.2l1.5 2.6"/><path d="M9.3 13.2a2.9 2.9 0 0 1 5.4 0"/><path d="M14.7 13.2h-2.2M14.7 13.2V11"/><path d="M14.7 15.2a2.9 2.9 0 0 1-5.4 0"/><path d="M9.3 15.2h2.2M9.3 15.2v2.2"/>',
  info: '<circle cx="12" cy="12" r="8.6"/><path d="M12 11.2v5.2"/><path d="M12 7.9h.01"/>',
  close: '<path d="M6.6 6.6l10.8 10.8M17.4 6.6L6.6 17.4"/>',
  check: '<path d="M4.8 12.4l4.8 4.8L19.2 6.8"/>',
  lock: '<rect x="4.6" y="10.2" width="14.8" height="9.6" rx="2.6"/><path d="M8.2 10.2V8a3.8 3.8 0 1 1 7.6 0v2.2"/><path d="M12 13.9v2.2"/>',
  chevronRight: '<path d="M9.4 5.2L16.2 12l-6.8 6.8"/>',
  chevronDown: '<path d="M5.2 9.4L12 16.2l6.8-6.8"/>',
  download: '<path d="M12 3.8v11"/><path d="M7.2 10l4.8 4.8L16.8 10"/><path d="M4.4 19.4h15.2"/>',
  trash: '<path d="M4.4 7h15.2"/><path d="M9.6 7V5.4a1.4 1.4 0 0 1 1.4-1.4h2a1.4 1.4 0 0 1 1.4 1.4V7"/><path d="M6.6 7l.9 12a1.6 1.6 0 0 0 1.6 1.5h5.8a1.6 1.6 0 0 0 1.6-1.5l.9-12"/><path d="M10.5 10.8v6M13.5 10.8v6"/>',
  share: '<path d="M12 3.8v10.6"/><path d="M8.2 7.6L12 3.8l3.8 3.8"/><path d="M5.8 13.4v4.8a2.2 2.2 0 0 0 2.2 2.2h8a2.2 2.2 0 0 0 2.2-2.2v-4.8"/>',
  plus: '<path d="M12 5.2v13.6M5.2 12h13.6"/>',
  minus: '<path d="M5.2 12h13.6"/>',
  settings: '<path d="' + gearPath() + '"/><circle cx="12" cy="12" r="3.1"/>',
  sparkle: '<path d="M10.4 3.9C10.4 8.2 11.6 9.4 15.9 9.4 11.6 9.4 10.4 10.6 10.4 14.9 10.4 10.6 9.2 9.4 4.9 9.4 9.2 9.4 10.4 8.2 10.4 3.9Z"/><path d="M17.8 14.6C17.8 16.8 18.9 17.9 21.1 17.9 18.9 17.9 17.8 19 17.8 21.2 17.8 19 16.7 17.9 14.5 17.9 16.7 17.9 17.8 16.8 17.8 14.6Z"/>',
  alert: '<path d="M10.6 5.4a1.6 1.6 0 0 1 2.8 0l7 12.4a1.6 1.6 0 0 1-1.4 2.4H5a1.6 1.6 0 0 1-1.4-2.4z"/><path d="M12 10.2v3.9"/><path d="M12 17.2h.01"/>',
  google: '<path d="M20 12a8 8 0 1 1-2.34-5.66"/><path d="M20 12h-7.4"/>',
  apple: '<path d="M12 8.4C10.6 7.3 8.6 7.4 7.4 8.8 5.8 10.7 6.2 14.6 7.6 17.2 8.4 18.7 9.3 19.9 10.3 19.9 11 19.9 11.4 19.4 12 19.4 12.6 19.4 13 19.9 13.7 19.9 14.7 19.9 15.6 18.7 16.4 17.2 17.8 14.6 18.2 10.7 16.6 8.8 15.4 7.4 13.4 7.3 12 8.4Z"/><path d="M12.6 7.7c-.4-2 .8-3.9 2.8-4.4.4 2-.8 3.9-2.8 4.4z"/>',
  mail: '<rect x="3" y="5.4" width="18" height="13.2" rx="2.6"/><path d="M3.6 7.6l7.3 5.1a2 2 0 0 0 2.2 0l7.3-5.1"/>'
};

const iconTemplates = new Map();
const missingIcons = new Set();

function iconTemplate(name) {
  if (iconTemplates.has(name)) return iconTemplates.get(name);
  const inner = ICONS[name] || '';
  // Parsujemy przez DOMParser zamiast wstawiać innerHTML do dokumentu:
  // pewna przestrzeń nazw SVG i zero markupu wstrzykiwanego na żywo.
  const markup =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  const doc = new DOMParser().parseFromString(markup, 'image/svg+xml');
  const svg = doc.documentElement;
  iconTemplates.set(name, svg);
  return svg;
}

/**
 * icon('close', {size: 24}) -> <svg> gotowy do wstawienia.
 * Domyślnie aria-hidden, bo ikona zwykle towarzyszy tekstowi. Podanie `title`
 * zmienia ją w obrazek z nazwą dla czytnika (gdy stoi sama, bez etykiety).
 */
export function icon(name, { size = 20, title = '', class: cls = '' } = {}) {
  if (!ICONS[name] && !missingIcons.has(name)) {
    missingIcons.add(name);
    console.warn('[dom] nieznana ikona: ' + name);
  }
  const svg = document.importNode(iconTemplate(name), true);
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('focusable', 'false');
  svg.setAttribute('class', cls ? 'm5-icon ' + cls : 'm5-icon');
  if (title) {
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', title);
  } else {
    svg.setAttribute('aria-hidden', 'true');
  }
  return svg;
}

/* ────────────────────────────  Pułapka fokusa  ────────────────────────── */

const FOCUSABLE = [
  'a[href]', 'area[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])', 'textarea:not([disabled])', 'iframe', 'summary',
  'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

function isReachable(el) {
  if (el.hasAttribute('disabled') || el.getAttribute('aria-hidden') === 'true') return false;
  if (el.closest('[hidden], [inert], [aria-hidden="true"]')) return false;
  return el.getClientRects().length > 0;
}

// Listę liczymy przy każdym Tabie — zawartość arkusza zmienia się w locie
// (przyciski znikają, pojawia się stan „przetwarzanie”).
function focusables(root) {
  return qsa(FOCUSABLE, root).filter(isReachable);
}

// Stos pułapek: gdy arkusz otworzy dialog, pilnuje tylko ta na wierzchu.
const traps = [];

function onTrapKeydown(event) {
  if (event.key !== 'Tab' || event.defaultPrevented) return;
  const trap = traps[traps.length - 1];
  if (!trap) return;
  const items = focusables(trap.el);
  if (!items.length) { event.preventDefault(); trap.el.focus({ preventScroll: true }); return; }
  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement;
  const inside = trap.el.contains(active);
  if (event.shiftKey) {
    if (!inside || active === first) { event.preventDefault(); last.focus(); }
  } else if (!inside || active === last) {
    event.preventDefault();
    first.focus();
  }
}

// Fokus ustawiony programowo poza warstwą (np. przez kod tła) wraca do środka.
function onTrapFocusIn(event) {
  const trap = traps[traps.length - 1];
  if (!trap || trap.el.contains(event.target)) return;
  const items = focusables(trap.el);
  (items[0] || trap.el).focus({ preventScroll: true });
}

function bindTrapListeners() {
  document.addEventListener('keydown', onTrapKeydown, true);
  document.addEventListener('focusin', onTrapFocusIn, true);
}

function unbindTrapListeners() {
  document.removeEventListener('keydown', onTrapKeydown, true);
  document.removeEventListener('focusin', onTrapFocusIn, true);
}

/**
 * Zamyka fokus wewnątrz `el` (Tab i Shift+Tab krążą w kółko) i przenosi go
 * na pierwszy sensowny element. Zwraca funkcję zwalniającą. Nie przywraca
 * fokusa po zwolnieniu — robi to warstwa, która wie, co ją otworzyło
 * (patrz ui/overlays.js).
 */
export function trapFocus(el) {
  if (!el) return () => {};
  let addedTabindex = false;
  if (!el.hasAttribute('tabindex')) { el.setAttribute('tabindex', '-1'); addedTabindex = true; }
  const trap = { el };
  traps.push(trap);
  if (traps.length === 1) bindTrapListeners();

  const start = el.querySelector('[autofocus]') || focusables(el)[0] || el;
  start.focus({ preventScroll: true });

  let released = false;
  return function release() {
    if (released) return;
    released = true;
    const idx = traps.indexOf(trap);
    if (idx >= 0) traps.splice(idx, 1);
    if (!traps.length) unbindTrapListeners();
    if (addedTabindex) el.removeAttribute('tabindex');
  };
}

/* ──────────────────────  Komunikaty dla czytnika  ─────────────────────── */

let liveTimer = 0;
let liveClearTimer = 0;

function liveRegion() {
  let el = document.getElementById('live');
  if (!el) {
    // Powłoka dostarcza #live; tworzymy go awaryjnie, żeby moduł działał także
    // w izolacji (podgląd pojedynczego ekranu, testy).
    el = h('div.m5-sronly', { id: 'live', aria: { live: 'polite', atomic: 'true' } });
    document.body.appendChild(el);
  }
  return el;
}

export function announce(text) {
  const value = String(text ?? '').trim();
  if (!value) return;
  const el = liveRegion();
  clearTimeout(liveTimer);
  clearTimeout(liveClearTimer);
  // Czyścimy przed wpisaniem, bo ten sam tekst dwa razy z rzędu nie zostałby
  // odczytany ponownie — region reaguje na zmianę treści, nie na zapis.
  el.textContent = '';
  liveTimer = setTimeout(() => {
    el.textContent = value;
    liveClearTimer = setTimeout(() => { el.textContent = ''; }, 5000);
  }, 60);
}

/* ─────────────────────────  Długie przytrzymanie  ─────────────────────── */

/**
 * onLongPress(el, fn, {delay, tolerance}) -> dispose
 * Działa dotykiem i myszą. Ruch powyżej tolerancji (czyli przewijanie strony)
 * anuluje odliczanie. Po udanym przytrzymaniu tłumimy najbliższy `click`
 * i menu kontekstowe, żeby jedno dotknięcie nie wywołało dwóch akcji.
 */
export function onLongPress(el, fn, { delay = 500, tolerance = 10 } = {}) {
  if (!el || typeof fn !== 'function') return () => {};
  let timer = 0;
  let startX = 0;
  let startY = 0;
  let fired = false;

  const cancel = () => { clearTimeout(timer); timer = 0; };

  const suppressClick = () => {
    const stop = (event) => {
      event.preventDefault();
      event.stopPropagation();
      el.removeEventListener('click', stop, true);
    };
    el.addEventListener('click', stop, true);
    // Gdy kliknięcie nie nadejdzie, uprzątamy strażnika, żeby nie zjadł kolejnego.
    setTimeout(() => el.removeEventListener('click', stop, true), 400);
  };

  const begin = (x, y, event) => {
    if (timer) return;
    fired = false;
    startX = x;
    startY = y;
    timer = setTimeout(() => {
      timer = 0;
      fired = true;
      fn(event);
    }, delay);
  };

  const moved = (x, y) => {
    if (!timer) return;
    if (Math.hypot(x - startX, y - startY) > tolerance) cancel();
  };

  const finish = () => {
    cancel();
    if (fired) suppressClick();
  };

  const abort = () => { cancel(); fired = false; };
  const onContextMenu = (event) => { if (fired) event.preventDefault(); };
  const listeners = [['contextmenu', onContextMenu]];

  if (window.PointerEvent) {
    listeners.push(
      ['pointerdown', (e) => { if (e.button === undefined || e.button === 0) begin(e.clientX, e.clientY, e); }],
      ['pointermove', (e) => moved(e.clientX, e.clientY)],
      ['pointerup', finish],
      ['pointercancel', abort],
      ['pointerleave', abort]
    );
  } else {
    // Ścieżka zapasowa dla przeglądarek bez Pointer Events.
    listeners.push(
      ['touchstart', (e) => { const t = e.touches[0]; if (t) begin(t.clientX, t.clientY, e); }],
      ['touchmove', (e) => { const t = e.touches[0]; if (t) moved(t.clientX, t.clientY); }],
      ['touchend', finish],
      ['touchcancel', abort],
      ['mousedown', (e) => { if (e.button === 0) begin(e.clientX, e.clientY, e); }],
      ['mousemove', (e) => moved(e.clientX, e.clientY)],
      ['mouseup', finish],
      ['mouseleave', abort]
    );
  }

  listeners.forEach(([name, handler]) => el.addEventListener(name, handler, { passive: true }));
  return function dispose() {
    cancel();
    listeners.forEach(([name, handler]) => el.removeEventListener(name, handler, { passive: true }));
  };
}

/* ──────────────────────────  Drobne narzędzia  ────────────────────────── */

/**
 * reducedMotion() -> boolean
 * Wybór zapisany w aplikacji (data-motion na <html>) ma pierwszeństwo nad
 * ustawieniem systemu — użytkownik mógł go świadomie wybrać wbrew systemowi.
 */
export function reducedMotion() {
  if (typeof document === 'undefined') return true;
  const attr = document.documentElement.getAttribute('data-motion');
  if (attr === 'reduced') return true;
  if (attr !== null && attr !== 'system') return false;
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) {
    return false;
  }
}

/** Dławi wywołania do jednej klatki; ostatnie argumenty wygrywają. */
export function rafThrottle(fn) {
  let handle = 0;
  let pending = null;
  const throttled = (...args) => {
    pending = args;
    if (handle) return;
    handle = requestAnimationFrame(() => {
      handle = 0;
      const call = pending;
      pending = null;
      if (call) fn(...call);
    });
  };
  throttled.cancel = () => {
    if (handle) cancelAnimationFrame(handle);
    handle = 0;
    pending = null;
  };
  return throttled;
}

/** Zapis pliku po stronie przeglądarki (eksport CSV/JSON) — bez sieci. */
export function download(filename, text, mime = 'text/plain;charset=utf-8') {
  const blob = text instanceof Blob ? text : new Blob([String(text)], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = h('a', { href: url, download: filename, style: 'display:none' });
  document.body.appendChild(a);
  a.click();
  // Natychmiastowe zwolnienie adresu potrafi przerwać pobieranie — stąd zwłoka.
  setTimeout(() => { a.remove(); URL.revokeObjectURL(url); }, 1000);
}

// store.js ładujemy dynamicznie, żeby ui/dom.js pozostał liściem drzewa
// importów z kontraktu. Ładowanie startuje od razu, bo pierwsza wibracja
// przychodzi dopiero po pierwszym dotknięciu — moduł zdąży być gotowy.
let settingsModule = null;
let settingsLoading = null;

function loadSettings() {
  if (settingsModule || settingsLoading) return settingsLoading;
  settingsLoading = import('../store.js')
    .then((mod) => { settingsModule = mod; return mod; })
    .catch(() => null);
  return settingsLoading;
}
loadSettings();

/**
 * haptic(pattern, enabled) — krótka wibracja potwierdzająca dotknięcie.
 * `enabled` podane jawnie ma pierwszeństwo (przydatne, gdy wołający i tak
 * trzyma ustawienia w ręku); bez niego pytamy store.js. Zwraca, czy zawibrowało.
 */
export function haptic(pattern = 10, enabled) {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return false;
  let on = enabled;
  if (typeof on !== 'boolean') {
    loadSettings();
    on = settingsModule && typeof settingsModule.get === 'function'
      ? settingsModule.get().haptics !== false
      : true; // zanim store się wczyta, trzymamy się wartości domyślnej
  }
  if (!on) return false;
  try {
    return navigator.vibrate(pattern);
  } catch {
    return false;
  }
}
