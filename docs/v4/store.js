/* Monitor Światła v4 — store.js
 *
 * ROLA PLIKU: jedno miejsce, w którym mieszkają ustawienia użytkownika, jedyne
 * miejsce, które je zapisuje, i jedyne miejsce, które przekłada je na atrybuty
 * elementu <html>. Nikt inny nie dotyka klucza 'ms4.settings.v1' i nikt inny nie
 * pisze data-theme / data-accent / data-text-scale / data-motion.
 *
 * Dlaczego ten plik ładuje się przed ui.js: Store.apply() woła się natychmiast po
 * zdefiniowaniu, czyli zanim przeglądarka namaluje treść. Ktoś, kto wybrał motyw
 * ciemny, nie zobaczy błysku jasnego tła.
 *
 * Brak pamięci trwałej (tryb prywatny, zablokowane dane witryn) nie jest błędem
 * krytycznym: ustawienia działają wtedy z pamięci procesu i znikają razem z kartą.
 * Store.persistent() mówi powłoce, czy wolno obiecywać trwałość — app.js pokazuje
 * na tej podstawie UI.T.error.storageBlocked raz na sesję.
 *
 * Nazwy palet i motywów są napisami dla użytkownika i przychodzą z warstwy
 * językowej (../shared/i18n.js), która musi być wczytana przed tym plikiem.
 *
 * Kolory strefy i akcentu żyją w tokens.css. Jedyne hexy poniżej to próbki palet
 * (Store.ACCENTS), bo próbka w ekranie ustawień musi pokazać kolor, którego akurat
 * nie ma na ekranie — dokładnie tak jak miniatura motywu.
 */
(function (global) {
  'use strict';

  var KEY = 'ms4.settings.v1';
  var doc = global.document;

  /** Napis spod klucza warstwy językowej. Bez window.I18n zwracamy sam klucz —
   *  ekran ustawień ma wtedy pokazać, czego brakuje, a nie pustą etykietę. */
  function T(key) {
    var I = global.I18n;
    if (I && typeof I.t === 'function') return I.t(key);
    return String(key);
  }

  /* Sześć palet z rozdziału 2.4 SPEC.md, w tej samej kolejności.
     swatch = [wartość --c-accent w motywie jasnym, w motywie ciemnym].
     Nazwy palet i motywów są napisami dla użytkownika, więc — jak wszystkie
     napisy tej wersji — przychodzą z warstwy językowej. Pole nazywa się dalej
     namePL, bo tak czyta je screen-support.js; nazwa pola to sprawa kodu,
     a nie języka, i zmiana jej należy do osobnego porządkowania. */
  var ACCENTS = [
    { id: 'ocean',    namePL: T('accent.ocean'),    swatch: ['#0F6E86', '#35C0DA'] },
    { id: 'violet',   namePL: T('accent.violet'),   swatch: ['#6A35D9', '#A98BFF'] },
    { id: 'sunset',   namePL: T('accent.sunset'),   swatch: ['#C2410C', '#FF9457'] },
    { id: 'forest',   namePL: T('accent.forest'),   swatch: ['#146B3A', '#4FC97A'] },
    { id: 'graphite', namePL: T('accent.graphite'), swatch: ['#3E4956', '#A7B4C4'] },
    { id: 'rose',     namePL: T('accent.rose'),     swatch: ['#BE1F62', '#FF7AAE'] }
  ];

  var THEMES = [
    { id: 'system', namePL: T('settings.themeSystem') },
    { id: 'light',  namePL: T('settings.themeLight') },
    { id: 'dark',   namePL: T('settings.themeDark') }
  ];

  /* Po zmianie języka nazwy palet i motywów trzeba przepisać na nowo: obie
     tablice powstają raz, przy wczytaniu pliku. Woła to app.js. */
  function relanguage() {
    var i;
    var accentKeys = ['accent.ocean', 'accent.violet', 'accent.sunset',
                      'accent.forest', 'accent.graphite', 'accent.rose'];
    for (i = 0; i < ACCENTS.length; i += 1) ACCENTS[i].namePL = T(accentKeys[i]);
    var themeKeys = ['settings.themeSystem', 'settings.themeLight', 'settings.themeDark'];
    for (i = 0; i < THEMES.length; i += 1) THEMES[i].namePL = T(themeKeys[i]);
  }

  var DEFAULTS = {
    theme: 'system',
    accent: 'ocean',
    textScale: 1,
    motion: 'auto',
    haptics: true,
    leadMetric: 'share',
    onboarded: false,
    cameraFacing: 'environment',
    /* Ostatni wybór na ekranie HISTORIA. Pusty historyMetric znaczy „nic jeszcze
       nie wybrano" — wtedy ekran bierze kanał wiodący. */
    historyRange: '1min',
    historyMetric: ''
  };

  var SCALES = [1, 1.15, 1.3];

  /* Identyfikatory zakresów ekranu HISTORIA — trzymamy je tu, bo Store musi umieć
     sprawdzić zapisaną wartość także zanim screen-history.js się załaduje. */
  var HISTORY_RANGES = [
    { id: '1min' }, { id: '1h' }, { id: '24h' }, { id: '7d' }, { id: '30d' }
  ];

  var state = clone(DEFAULTS);
  var persistent = true;      // dopóki zapis się nie wywróci, zakładamy trwałość

  /* ------------------------------------------------------------------
     Pomocnicze
     ------------------------------------------------------------------ */

  function clone(o) {
    var out = {}, k;
    for (k in o) { if (Object.prototype.hasOwnProperty.call(o, k)) out[k] = o[k]; }
    return out;
  }

  function has(list, id) {
    for (var i = 0; i < list.length; i += 1) { if (list[i].id === id) return true; }
    return false;
  }

  function knownMetric(id) {
    // Katalog wielkości jest jedynym źródłem prawdy o tym, co wolno postawić
    // na dużym wskaźniku. Własnej listy identyfikatorów tu nie ma.
    if (!global.Metrics || typeof global.Metrics.byId !== 'function') return true;
    return !!global.Metrics.byId(id);
  }

  /* Sanityzacja jednego pola. Nieznana wartość cicho wraca do domyślnej —
     ustawienia z przyszłej wersji albo ręcznie zepsuty localStorage nie mogą
     wywrócić aplikacji. */
  function coerce(key, value) {
    var n, i;
    switch (key) {
      case 'theme':
        return has(THEMES, value) ? value : DEFAULTS.theme;
      case 'accent':
        return has(ACCENTS, value) ? value : DEFAULTS.accent;
      case 'textScale':
        n = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;
        for (i = 0; i < SCALES.length; i += 1) { if (SCALES[i] === n) return n; }
        return DEFAULTS.textScale;
      case 'motion':
        return value === 'reduced' ? 'reduced' : 'auto';
      case 'haptics':
        return !!value;
      case 'onboarded':
        return !!value;
      case 'leadMetric':
        return (typeof value === 'string' && knownMetric(value)) ? value : DEFAULTS.leadMetric;
      case 'cameraFacing':
        return value === 'user' ? 'user' : 'environment';
      case 'historyRange':
        return has(HISTORY_RANGES, value) ? value : DEFAULTS.historyRange;
      case 'historyMetric':
        return (typeof value === 'string' && value && knownMetric(value)) ? value : '';
      default:
        return undefined;   // klucz spoza kształtu — ignorujemy
    }
  }

  function normalize(raw) {
    var out = clone(DEFAULTS), k, v;
    if (!raw || typeof raw !== 'object') return out;
    for (k in DEFAULTS) {
      if (!Object.prototype.hasOwnProperty.call(DEFAULTS, k)) continue;
      if (!Object.prototype.hasOwnProperty.call(raw, k)) continue;
      v = coerce(k, raw[k]);
      if (v !== undefined) out[k] = v;
    }
    return out;
  }

  /* ------------------------------------------------------------------
     Trwałość — każdy dostęp w try/catch, bo w trybie prywatnym samo
     dotknięcie localStorage potrafi rzucić wyjątkiem.
     ------------------------------------------------------------------ */

  function read() {
    try {
      if (!global.localStorage) { persistent = false; return null; }
      var raw = global.localStorage.getItem(KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (_) {
      persistent = false;
      return null;
    }
  }

  function write() {
    try {
      if (!global.localStorage) { persistent = false; return false; }
      global.localStorage.setItem(KEY, JSON.stringify(state));
      persistent = true;
      return true;
    } catch (_) {
      persistent = false;
      return false;
    }
  }

  /* ------------------------------------------------------------------
     Zastosowanie: atrybuty <html> i kolor paska systemowego
     ------------------------------------------------------------------ */

  var themeMeta = null;

  function root() {
    return doc ? doc.documentElement : null;
  }

  function darkPreferred() {
    try {
      return !!(global.matchMedia && global.matchMedia('(prefers-color-scheme: dark)').matches);
    } catch (_) { return false; }
  }

  /* Motyw, który użytkownik naprawdę widzi — potrzebny tylko metadanej
     theme-color, bo o samych barwach decyduje CSS. */
  function effectiveTheme() {
    if (state.theme === 'light' || state.theme === 'dark') return state.theme;
    return darkPreferred() ? 'dark' : 'light';
  }

  /* Meta theme-color w index.html jest dwuwariantowa i sterowana zapytaniem
     medialnym — działa, dopóki motyw idzie za systemem. Kiedy użytkownik wymusi
     motyw, żadne z tych zapytań nie opisuje już prawdy, więc dokładamy własną
     metę PRZED tamtymi (przeglądarka bierze pierwszą pasującą) i trzymamy w niej
     bieżące --c-bg. Wartość czytamy z tokenów, żeby nie powielać hexów. */
  function paintThemeColor() {
    if (!doc || !doc.head) return;
    var el = root();
    if (!el) return;
    var color = '';
    try {
      color = (global.getComputedStyle(el).getPropertyValue('--c-bg') || '').trim();
    } catch (_) { color = ''; }
    if (!color) return;                        // tokens.css jeszcze nie działa
    if (!themeMeta) {
      themeMeta = doc.createElement('meta');
      themeMeta.setAttribute('name', 'theme-color');
      themeMeta.setAttribute('data-owner', 'store');
      doc.head.insertBefore(themeMeta, doc.head.firstChild);
    }
    themeMeta.setAttribute('content', color);
    // Podpowiedź dla formantów przeglądarki (paski przewijania, pola formularzy),
    // które nie czytają zmiennych CSS.
    el.style.colorScheme = effectiveTheme();
  }

  function apply() {
    var el = root();
    if (!el) return;

    // 'system' to BRAK atrybutu — o motywie decyduje wtedy prefers-color-scheme.
    if (state.theme === 'system') el.removeAttribute('data-theme');
    else el.setAttribute('data-theme', state.theme);

    el.setAttribute('data-accent', state.accent);

    if (state.textScale === 1) el.removeAttribute('data-text-scale');
    else el.setAttribute('data-text-scale', String(state.textScale));

    if (state.motion === 'reduced') el.setAttribute('data-motion', 'reduced');
    else el.removeAttribute('data-motion');

    paintThemeColor();
  }

  /* ------------------------------------------------------------------
     API
     ------------------------------------------------------------------ */

  function emit() {
    if (global.Bus && typeof global.Bus.emit === 'function') {
      global.Bus.emit('settings:changed', { settings: clone(state) });
    }
  }

  var Store = {
    DEFAULTS: clone(DEFAULTS),
    ACCENTS: ACCENTS,
    THEMES: THEMES,

    /** Przepisanie nazw palet i motywów po zmianie języka. Woła to app.js. */
    relanguage: relanguage,

    get: function () { return clone(state); },

    /* Zwraca kopię PO sanityzacji, żeby wołający zobaczył to, co naprawdę
       zostało zapisane, a nie to, o co poprosił. */
    set: function (patch) {
      if (!patch || typeof patch !== 'object') return clone(state);
      var changed = false, k, v;
      for (k in patch) {
        if (!Object.prototype.hasOwnProperty.call(patch, k)) continue;
        if (!Object.prototype.hasOwnProperty.call(DEFAULTS, k)) continue;
        v = coerce(k, patch[k]);
        if (v === undefined || v === state[k]) continue;
        state[k] = v;
        changed = true;
      }
      if (!changed) return clone(state);
      write();
      apply();
      emit();
      return clone(state);
    },

    reset: function () {
      state = clone(DEFAULTS);
      write();
      apply();
      emit();
      return clone(state);
    },

    apply: apply,

    /* Czy ustawienia przeżyją zamknięcie karty. Powłoka mówi o tym raz na sesję,
       zamiast milczeć albo zawracać głowę przy każdym zapisie. */
    persistent: function () { return persistent; }
  };

  /* ------------------------------------------------------------------
     Start
     ------------------------------------------------------------------ */

  state = normalize(read());
  apply();

  // Zmiana motywu systemowego przy ustawieniu 'system' zmienia kolor tła, więc
  // trzeba odświeżyć metę theme-color. Sam motyw przełącza CSS, bez udziału JS.
  (function watchSystemTheme() {
    if (!global.matchMedia) return;
    var mq;
    try { mq = global.matchMedia('(prefers-color-scheme: dark)'); } catch (_) { return; }
    var onChange = function () { paintThemeColor(); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }());

  // tokens.css bywa gotowy dopiero po pierwszym malowaniu, gdy plik przyszedł
  // z sieci wolniej niż skrypt z pamięci podręcznej — druga próba nic nie kosztuje.
  if (doc) {
    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', paintThemeColor);
    else global.setTimeout(paintThemeColor, 0);
  }

  global.Store = Store;

}(typeof window !== 'undefined' ? window : globalThis));
