/* Monitor Światła v2 — powłoka interfejsu: nawigacja, ekran pomiaru, wykresy, tabela.
 *
 * This file owns three things and deliberately nothing else.
 *
 *   1. window.UI — the ONLY owner of panel, sheet and tab visibility (chapter 3
 *      of ARCHITEKTURA.md). No other module may set `hidden`, `display` or
 *      `aria-selected` on a panel*, nav* or sheet* element. In v1 two modules
 *      fought over that and screens flickered; here there is one writer.
 *   2. The measurement presentation: seven tiles generated in a loop from
 *      Metrics.CATALOGUE, the history chart drawn by hand on a canvas, and the
 *      readings table (the `Viz` contract of the specification).
 *   3. Nothing about money. The one donation screen lives in support.js; this
 *      file only reserves its panel and its place in the tab bar.
 *
 * Two rules shaped most of the code below:
 *
 *   - Measurement is never blocked, and nothing in the application gates a
 *     metric, a chart range or a tool. All seven metrics are drawn for
 *     everybody, always; there is no code path here that could hide one.
 *   - A canvas measured inside a hidden panel is 0 px wide. That was a real bug
 *     in v1: charts drawn on a hidden tab came out empty and never repaired
 *     themselves. Every reveal here therefore schedules a redraw in
 *     requestAnimationFrame, and a draw that finds a zero-width canvas marks
 *     itself dirty instead of drawing garbage.
 *
 * Code comments are English; not one interface string lives in this file any
 * more. Every napis przechodzi przez t() -> window.I18n, a treści leżą
 * w docs/shared/i18n/<kod>.js (rzeczy wspólne dla wszystkich wersji) oraz
 * docs/v2/i18n/<kod>.js (rzeczy tej wersji). Ten plik zna wyłącznie klucze.
 */
(function (global) {
  'use strict';

  var DOC = global.document;

  /* ==================================================================
     0a. Warstwa językowa
     ==================================================================
     Jedno wejście dla całego pliku. Gdyby ../shared/i18n.js się nie wczytał,
     t() oddaje sam klucz: ekran wygląda wtedy źle, ale stoi i nic nie rzuca.
     Ani jednego polskiego zdania „na zapas” — zapasem jest angielski, a ten
     leży w słowniku, nie w kodzie.
     ------------------------------------------------------------------ */

  function t(key, params) {
    var I = global.I18n;
    if (I && typeof I.t === 'function') return I.t(key, params);
    return String(key);
  }

  function appName() { return t('app.name'); }

  /* Katalog wielkości (Metrics.CATALOGUE) trzyma liczby: id, zakres, progi,
     liczbę miejsc po przecinku. Nazwy, opisy i jednostki są treścią, więc
     przychodzą ze słownika wspólnego pod kluczami wyprowadzonymi z id. */
  function metricName(m) { return m ? t('metric.' + m.id + '.name') : ''; }
  function metricShort(m) { return m ? t('metric.' + m.id + '.short') : ''; }
  function metricHelp(m) { return m ? t('metric.' + m.id + '.help') : ''; }
  function metricUnit(m) { return m ? t('metric.' + m.id + '.unit') : ''; }

  /* ==================================================================
     0. Small utilities
     ================================================================== */

  function byId(id) { return id ? DOC.getElementById(id) : null; }

  function make(tag, className, text) {
    var el = DOC.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined && text !== null) el.textContent = text;
    return el;
  }

  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  function isNum(v) { return typeof v === 'number' && isFinite(v); }

  function setText(el, text) { if (el) el.textContent = text; }

  /* Liczebniki. Własna reguła odmiany („22 odczyty” kontra „12 odczytów”)
     stała tu do tej pory i była poprawna — po polsku. Trzydzieści języków ma
     trzydzieści takich reguł, więc formę wybiera teraz Intl.PluralRules
     aktywnego języka, a wszystkie formy stoją w słowniku pod jednym kluczem. */
  function count(key, n) { return t(key, { n: Math.round(n) }); }

  function samples(n) { return count('count.samples', n || 0); }
  function readings(n) { return count('count.readings', n || 0); }

  /* rAF with a timeout fallback: a redraw that never runs looks like a freeze,
     and some embedded browsers stop serving frames in a backgrounded view. */
  function nextFrame(fn) {
    if (global.requestAnimationFrame) global.requestAnimationFrame(fn);
    else global.setTimeout(fn, 16);
  }

  function throttle(fn, ms) {
    var last = 0, timer = null, lastArgs = null;
    return function () {
      lastArgs = arguments;
      var now = Date.now();
      var wait = ms - (now - last);
      if (wait <= 0) {
        last = now;
        fn.apply(null, lastArgs);
      } else if (!timer) {
        timer = global.setTimeout(function () {
          timer = null;
          last = Date.now();
          fn.apply(null, lastArgs);
        }, wait);
      }
    };
  }

  function prefersReducedMotion() {
    try {
      return !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (e) { return false; }
  }

  /* ==================================================================
     1. Event bus
     ==================================================================
     bus.js owns window.Bus. This module must survive both loading orders, so
     it installs a contract-shaped fallback when Bus is absent and resolves
     window.Bus at call time. Listeners are attached during init(), never at
     parse time, so a real bus.js loaded afterwards still gets them.

     Od teraz szynę daje ../shared/bus.js, ładowany w index.html przed tym
     plikiem, więc poniższy fallback jest już tylko siatką bezpieczeństwa na
     wypadek, gdyby tamten plik się nie wczytał.
     ------------------------------------------------------------------ */

  function installFallbackBus() {
    var map = {};
    var Bus = {};
    Bus.on = function (name, cb) {
      if (!name || typeof cb !== 'function') return cb;
      if (!map[name]) map[name] = [];
      map[name].push(cb);
      return cb;
    };
    Bus.once = function (name, cb) {
      var wrap = function (data) { Bus.off(name, wrap); cb(data); };
      return Bus.on(name, wrap);
    };
    Bus.off = function (name, cb) {
      var list = map[name];
      if (!list) return;
      for (var i = list.length - 1; i >= 0; i -= 1) {
        if (list[i] === cb) list.splice(i, 1);
      }
    };
    Bus.emit = function (name, data) {
      var list = map[name];
      if (!list) return;
      var copy = list.slice();
      for (var i = 0; i < copy.length; i += 1) {
        // One broken listener must never stop the measurement loop.
        try { copy[i](data); } catch (e) { /* isolated on purpose */ }
      }
    };
    Bus.names = function () {
      var out = [];
      for (var k in map) { if (Object.prototype.hasOwnProperty.call(map, k)) out.push(k); }
      return out;
    };
    global.Bus = Bus;
  }

  if (!global.Bus || typeof global.Bus.emit !== 'function') installFallbackBus();

  function emit(name, data) {
    var b = global.Bus;
    if (b && typeof b.emit === 'function') b.emit(name, data);
  }

  function on(name, cb) {
    var b = global.Bus;
    if (b && typeof b.on === 'function') b.on(name, cb);
  }

  /* ==================================================================
     2. Settings (ms2.settings.v1)
     ==================================================================
     Owned here. Nobody reads the key directly; the rest of the app goes
     through UI.getSetting() / UI.setSetting().
     ------------------------------------------------------------------ */

  var SETTINGS_KEY = 'ms2.settings.v1';

  var DEFAULT_SETTINGS = {
    theme: 'auto',
    textScale: 1,
    contrast: false,
    sound: true,
    vibrate: true,
    simulateFailures: false,
    firstRunDone: false,
    chartMetric: 'share',
    chartRangeMs: 60000,
    tableOpen: true
  };

  var settings = null;

  function loadSettings() {
    var out = {};
    for (var k in DEFAULT_SETTINGS) {
      if (Object.prototype.hasOwnProperty.call(DEFAULT_SETTINGS, k)) out[k] = DEFAULT_SETTINGS[k];
    }
    try {
      var raw = global.localStorage.getItem(SETTINGS_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        for (var j in parsed) {
          if (Object.prototype.hasOwnProperty.call(DEFAULT_SETTINGS, j)) out[j] = parsed[j];
        }
      }
    } catch (e) { /* private mode or corrupted value: defaults are fine */ }
    return out;
  }

  function saveSettings() {
    try { global.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }
    catch (e) { /* quota or private mode: the app keeps working in memory */ }
  }

  function getSetting(key) {
    if (!settings) settings = loadSettings();
    return settings[key];
  }

  function setSetting(key, value) {
    if (!settings) settings = loadSettings();
    if (!Object.prototype.hasOwnProperty.call(DEFAULT_SETTINGS, key)) return;
    settings[key] = value;
    saveSettings();
  }

  /* ==================================================================
     3. Theme, text scale, contrast
     ==================================================================
     The stylesheet defines the light palette on bare :root and redefines it
     under both prefers-color-scheme and [data-theme]. "Systemowy" therefore
     means: remove the attribute and let the media query win.
     ------------------------------------------------------------------ */

  var THEMES = ['auto', 'light', 'dark'];
  var TEXT_SCALES = [1, 1.15, 1.3];

  /* Type tokens are absolute px, so scaling the root font-size would do
     nothing at all. The scale rewrites the tokens themselves, which keeps
     every component in proportion instead of only the body copy. */
  var TYPE_TOKENS = {
    '--ms-t-display': 44,
    '--ms-t-h1': 28,
    '--ms-t-h2': 22,
    '--ms-t-h3': 18,
    '--ms-t-body': 17,
    '--ms-t-label': 15,
    '--ms-t-cap': 13
  };

  function systemPrefersDark() {
    try { return !!(global.matchMedia && global.matchMedia('(prefers-color-scheme: dark)').matches); }
    catch (e) { return false; }
  }

  function effectiveTheme() {
    var mode = getSetting('theme');
    if (mode === 'light' || mode === 'dark') return mode;
    return systemPrefersDark() ? 'dark' : 'light';
  }

  function applyTheme(silent) {
    var mode = getSetting('theme');
    var root = DOC.documentElement;
    if (mode === 'light' || mode === 'dark') root.setAttribute('data-theme', mode);
    else root.removeAttribute('data-theme');
    if (!silent) emit('ui:themechange', { theme: mode, effective: effectiveTheme() });
  }

  function setTheme(value) {
    if (THEMES.indexOf(value) < 0) return;
    setSetting('theme', value);
    applyTheme(false);
    syncAppearanceControls();
    scheduleRedraw();
  }

  function applyTextScale(silent) {
    var scale = Number(getSetting('textScale'));
    if (TEXT_SCALES.indexOf(scale) < 0) scale = 1;
    var style = DOC.documentElement.style;
    for (var token in TYPE_TOKENS) {
      if (!Object.prototype.hasOwnProperty.call(TYPE_TOKENS, token)) continue;
      if (scale === 1) style.removeProperty(token);
      else style.setProperty(token, Math.round(TYPE_TOKENS[token] * scale) + 'px');
    }
    if (!silent) emit('ui:textscale', { scale: scale });
  }

  function setTextScale(value) {
    var v = Number(value);
    if (TEXT_SCALES.indexOf(v) < 0) return;
    setSetting('textScale', v);
    applyTextScale(false);
    syncAppearanceControls();
    scheduleRedraw();
  }

  /* "Wyższy kontrast" is done with tokens rather than a new class: the muted
     text steps collapse towards the primary one and borders take the strong
     value. No component has to know the mode exists. */
  function applyContrast() {
    var isOn = !!getSetting('contrast');
    var style = DOC.documentElement.style;
    if (isOn) {
      style.setProperty('--ms-text-2', 'var(--ms-text)');
      style.setProperty('--ms-text-3', 'var(--ms-text-2)');
      style.setProperty('--ms-border', 'var(--ms-border-strong)');
    } else {
      style.removeProperty('--ms-text-2');
      style.removeProperty('--ms-text-3');
      style.removeProperty('--ms-border');
    }
  }

  function watchSystemTheme() {
    if (!global.matchMedia) return;
    var mq;
    try { mq = global.matchMedia('(prefers-color-scheme: dark)'); } catch (e) { return; }
    var handler = function () {
      if (getSetting('theme') !== 'auto') return;
      emit('ui:themechange', { theme: 'auto', effective: effectiveTheme() });
      scheduleRedraw();
    };
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else if (mq.addListener) mq.addListener(handler);
  }

  /* ==================================================================
     4. Formatting helpers
     ==================================================================
     Zegar i data zostają zapisane cyframi i separatorem, bo są odczytem
     przyrządu, a nie zdaniem: 14:05:30 i 28.08.2026 czyta się tak samo
     w każdym języku i tak samo w każdej przeglądarce, także bez sieci.
     Zdania wokół liczb — czas trwania sesji — idą już przez słownik.
     ------------------------------------------------------------------ */

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  function formatTime(ms) {
    var d = new Date(ms);
    return pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
  }

  function formatShortTime(ms) {
    var d = new Date(ms);
    return pad2(d.getHours()) + ':' + pad2(d.getMinutes());
  }

  function formatDate(ms) {
    var d = new Date(ms);
    return pad2(d.getDate()) + '.' + pad2(d.getMonth() + 1) + '.' + d.getFullYear();
  }

  /* Trzy warianty zamiast jednego sklejanego napisu: w wielu językach skrót
     jednostki stoi przed liczbą. Minuty i sekundy idą jako napis, bo mają
     zero wiodące, którego formatowanie liczb by nie dołożyło. */
  function formatDuration(ms) {
    var total = Math.max(0, Math.round((ms || 0) / 1000));
    var h = Math.floor(total / 3600);
    var m = Math.floor((total % 3600) / 60);
    var s = total % 60;
    if (h > 0) return t('duration.hm', { h: h, m: pad2(m) });
    if (m > 0) return t('duration.ms', { m: m, s: pad2(s) });
    return t('duration.s', { s: s });
  }

  /* ==================================================================
     5. Icons
     ==================================================================
     The stylesheet draws icons as CSS masks on a <span>, so one glyph inherits
     currentColor everywhere and nothing is fetched. UI.icon() therefore returns
     an HTMLElement rather than the SVGElement an early draft assumed; the call
     shape is unchanged. The alias map keeps the older semantic names working.
     ------------------------------------------------------------------ */

  var ICON_ALIAS = {
    measure: 'monitor', tools: 'tune', more: 'menu', 'switch': 'flip',
    back: 'chevron', support: 'cup', 'export': 'download',
    calendar: 'timer', compare: 'grid', target: 'eye', screen: 'monitor',
    star: 'sparkle', ad: 'doc', sync: 'refresh'
  };

  function icon(name, size) {
    var real = ICON_ALIAS[name] || name || 'info';
    var cls = 'ms-icon ms-icon--' + real;
    if (size === 'sm' || size === 'lg' || size === 'xl') cls += ' ms-icon--' + size;
    var el = make('span', cls);
    el.setAttribute('aria-hidden', 'true');
    return el;
  }

  function srOnly(text) { return make('span', 'ms-visually-hidden', text); }

  /* ==================================================================
     6. Screen registry
     ==================================================================
     Ekrany trzymają KLUCZ nazwy, a nie gotowy napis: nazwa ekranu pada
     w trzech miejscach (pasek, nagłówek nakładki, ogłoszenie dla czytnika)
     i po zmianie języka musi się zmienić we wszystkich naraz.
     ------------------------------------------------------------------ */

  var TABS = [
    { tabId: 'measure', panelId: 'panelMeasure', navId: 'navMeasure', labelKey: 'nav.measure', iconName: 'monitor' },
    { tabId: 'history', panelId: 'panelHistory', navId: 'navHistory', labelKey: 'nav.history', iconName: 'history' },
    { tabId: 'tools', panelId: 'panelTools', navId: 'navTools', labelKey: 'nav.tools', iconName: 'tune' },
    { tabId: 'support', panelId: 'panelSupport', navId: 'navSupport', labelKey: 'nav.support', iconName: 'cup' },
    { tabId: 'more', panelId: 'panelMore', navId: 'navMore', labelKey: 'nav.more', iconName: 'menu' }
  ];

  /* Overlay screens. Most belong to other modules; the shell creates the empty
     panel with its back button and title so navigation works even if a module
     is not loaded yet, and every module can find its container by id. */
  var OVERLAYS = [
    { panelId: 'panelDocs', titleKey: 'panel.docs' },
    { panelId: 'panelThresholds', titleKey: 'panel.thresholds' },
    { panelId: 'panelReports', titleKey: 'panel.reports' },
    { panelId: 'panelExport', titleKey: 'panel.export' },
    { panelId: 'panelCompare', titleKey: 'panel.compare' },
    { panelId: 'panelCalibration', titleKey: 'panel.calibration' },
    { panelId: 'panelScreenCheck', titleKey: 'panel.screenCheck' },
    { panelId: 'panelSchedule', titleKey: 'panel.schedule' },
    { panelId: 'panelAlerts', titleKey: 'panel.alerts' }
  ];

  /* panelXxx -> backXxx / titleXxx, the naming convention from chapter 2.2. */
  function overlaySuffix(panelId) { return panelId.replace(/^panel/, ''); }

  var panels = {};        // panelId -> spec
  var tabByPanel = {};    // panelId -> tabId
  var activeTabId = 'measure';
  var currentView = { kind: 'tab', id: 'measure', panelId: 'panelMeasure' };
  var ready = false;

  function registerPanel(spec) {
    if (!spec || !spec.panelId) return false;
    var existing = panels[spec.panelId] || {};
    /* titleKey wygrywa z titlePL: obcy moduł wolno zarejestrować ekran gotowym
       napisem (i taki napis zostanie, jaki podał), ale ekrany tej wersji
       podają klucz, żeby nazwa zmieniała się razem z językiem. */
    var merged = {
      panelId: spec.panelId,
      tabId: spec.tabId || existing.tabId || null,
      titleKey: spec.titleKey || existing.titleKey || null,
      titlePL: spec.titlePL || existing.titlePL || '',
      onShow: spec.onShow || existing.onShow || null,
      onHide: spec.onHide || existing.onHide || null
    };
    panels[spec.panelId] = merged;
    if (merged.tabId) tabByPanel[spec.panelId] = merged.tabId;
    return true;
  }

  function panelEl(panelId) { return byId(panelId); }

  function panelTitle(panelId) {
    var spec = panels[panelId];
    if (!spec) return '';
    if (spec.titleKey) return t(spec.titleKey);
    return spec.titlePL || '';
  }

  function isTabPanel(panelId) { return !!tabByPanel[panelId]; }

  /* ==================================================================
     8. Navigation stack and history
     ==================================================================
     One stack, one owner. `history.pushState` is touched here and nowhere else
     in the application (chapter 3). The hardware back button and every close
     button walk the same path: history.back() -> popstate -> closeTopEntry().
     ------------------------------------------------------------------ */

  var navStack = [];        // entries: {kind:'overlay'|'sheet', id, returnFocus, result}
  var pendingTabId = null;

  /* Set to false the first time pushState is refused (file:// under a strict
     sandbox). Without it back() still called history.back() for an entry that
     was never pushed, and the tab navigated AWAY from the application —
     killing a running measurement — instead of closing an overlay. */
  var historyUsable = true;
  /* Set only by replaceSheet: the outgoing sheet leaves its browser-history
     entry behind for the incoming one to occupy, so a swap costs zero
     additional Back presses. */
  var reuseHistoryEntry = false;

  function pushEntry(entry) {
    navStack.push(entry);
    if (reuseHistoryEntry) { reuseHistoryEntry = false; return; }
    try {
      global.history.pushState({ msNav: true, depth: navStack.length }, '', global.location.href);
    } catch (e) {
      historyUsable = false;
    }
  }

  function topEntry() { return navStack.length ? navStack[navStack.length - 1] : null; }

  function closeTopEntry() {
    var entry = navStack.pop();
    if (!entry) return;
    if (entry.kind === 'sheet') performCloseSheet(entry);
    else performCloseOverlay(entry);
  }

  function onPopState(ev) {
    var depth = (ev && ev.state && ev.state.msNav) ? ev.state.depth : 0;
    var guard = 0;
    while (navStack.length > depth && guard < 32) { closeTopEntry(); guard += 1; }
    if (pendingTabId) {
      var nextTab = pendingTabId;
      pendingTabId = null;
      showTab(nextTab);
    }
  }

  function back() {
    if (!navStack.length) return false;
    if (!historyUsable) { closeTopEntry(); return true; }
    try { global.history.back(); }
    catch (e) { closeTopEntry(); }
    return true;
  }

  /* Swap the sheet on top of the stack without touching browser history.
     Closing one sheet and opening another in the same tick queued a
     history.back() that landed AFTER the new pushState, so popstate then
     closed the sheet that had just been opened — it flashed and dismissed
     itself. One entry in, one entry out, no navigation. */
  function replaceSheet(fromId, toId, opts) {
    var top = topEntry();
    if (!top || top.kind !== 'sheet' || top.id !== fromId) {
      closeSheet(fromId, null);
      return openSheet(toId, opts);
    }
    var entry = navStack.pop();
    entry.result = null;
    var keepFocus = entry.returnFocus;
    performCloseSheet(entry);
    reuseHistoryEntry = true;
    var ok = openSheet(toId, opts);
    reuseHistoryEntry = false;
    var fresh = topEntry();
    if (ok && fresh && fresh.kind === 'sheet' && fresh.id === toId) fresh.returnFocus = keepFocus;
    return ok;
  }

  /* ==================================================================
     9. Showing panels — the single writer of `hidden` on views
     ================================================================== */

  function hideOtherPanels(keepPanelId) {
    for (var id in panels) {
      if (!Object.prototype.hasOwnProperty.call(panels, id)) continue;
      if (id === keepPanelId) continue;
      var el = panelEl(id);
      if (el && !el.hidden) {
        el.hidden = true;
        var spec = panels[id];
        if (spec && typeof spec.onHide === 'function') {
          try { spec.onHide(); } catch (e) { /* a broken screen must not trap the user */ }
        }
      }
    }
  }

  function revealPanel(panelId, kind, viewId, opts) {
    var el = panelEl(panelId);
    if (!el) return false;
    var previousPanelId = currentView.panelId;
    hideOtherPanels(panelId);
    el.hidden = false;
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');

    currentView = { kind: kind, id: viewId, panelId: panelId };
    updateHeaderForView();
    updateNavSelection();

    announce(t('a11y.screenAnnounce', { name: panelTitle(panelId) || '' }));

    emit('ui:viewchange', {
      kind: kind, id: viewId, panelId: panelId, previousPanelId: previousPanelId
    });

    // The canvas inside a panel that was hidden a moment ago still measures
    // 0 px until the browser has laid it out. Everything that draws therefore
    // runs one frame later, never synchronously here.
    nextFrame(function () {
      var spec = panels[panelId];
      if (spec && typeof spec.onShow === 'function') {
        try { spec.onShow(); } catch (e) { /* isolated */ }
      }
      redraw();
      if (opts && opts.focusId) {
        var f = byId(opts.focusId);
        if (f && typeof f.focus === 'function') f.focus();
      }
    });
    return true;
  }

  function showTab(tabId) {
    var tab = null;
    for (var i = 0; i < TABS.length; i += 1) { if (TABS[i].tabId === tabId) tab = TABS[i]; }
    if (!tab) return false;
    if (!panelEl(tab.panelId)) return false;

    // Tapping the bar while an overlay or sheet is open unwinds the history
    // entries first, so the hardware back button never replays dead screens.
    if (navStack.length) {
      pendingTabId = tabId;
      try { global.history.go(-navStack.length); }
      catch (e) {
        while (navStack.length) closeTopEntry();
        pendingTabId = null;
        return showTab(tabId);
      }
      return true;
    }

    activeTabId = tabId;
    return revealPanel(tab.panelId, 'tab', tabId, null);
  }

  function showPanel(panelId, opts) {
    if (!panelId) return false;
    if (isTabPanel(panelId)) return showTab(tabByPanel[panelId]);
    if (!panelEl(panelId)) return false;
    if (currentView.panelId === panelId) return true;

    var entry = {
      kind: 'overlay',
      id: panelId,
      returnFocus: DOC.activeElement && DOC.activeElement !== DOC.body ? DOC.activeElement : null
    };
    pushEntry(entry);

    var suffix = overlaySuffix(panelId);
    var focusId = (opts && opts.focusId) || ('back' + suffix);
    return revealPanel(panelId, 'overlay', panelId, { focusId: byId(focusId) ? focusId : null });
  }

  function performCloseOverlay(entry) {
    var el = panelEl(entry.id);
    var spec = panels[entry.id];
    if (el) el.hidden = true;
    if (spec && typeof spec.onHide === 'function') {
      try { spec.onHide(); } catch (e) { /* isolated */ }
    }

    // Reveal whatever was underneath: a lower overlay, otherwise the tab that
    // is still marked in the bar. An empty tablist reads as "nothing selected",
    // so the tab selection was never cleared while the overlay was open.
    var beneath = null;
    for (var i = navStack.length - 1; i >= 0; i -= 1) {
      if (navStack[i].kind === 'overlay') { beneath = navStack[i]; break; }
    }
    if (beneath) revealPanel(beneath.id, 'overlay', beneath.id, null);
    else {
      var tab = tabById(activeTabId);
      if (tab) revealPanel(tab.panelId, 'tab', tab.tabId, null);
    }

    if (entry.returnFocus && DOC.contains(entry.returnFocus) && typeof entry.returnFocus.focus === 'function') {
      entry.returnFocus.focus();
    }
  }

  function tabById(tabId) {
    for (var i = 0; i < TABS.length; i += 1) { if (TABS[i].tabId === tabId) return TABS[i]; }
    return null;
  }

  function updateNavSelection() {
    for (var i = 0; i < TABS.length; i += 1) {
      var el = byId(TABS[i].navId);
      if (!el) continue;
      var selected = TABS[i].tabId === activeTabId;
      el.setAttribute('aria-selected', selected ? 'true' : 'false');
      // Roving tabindex: one stop for the whole bar, arrows move inside it.
      el.setAttribute('tabindex', selected ? '0' : '-1');
    }
  }

  /* Exactly one place says the name of the screen. An overlay carries its own
     header (back button + title, the panelXxx -> backXxx/titleXxx contract), so
     the app bar goes back to the application name there instead of printing
     "Dokumentacja" twice, 40px apart. On a tab screen there is no second header, so
     the bar names the tab. */
  function updateHeaderForView() {
    var titleEl = byId('appTitle');
    if (titleEl) {
      titleEl.textContent = isTabPanel(currentView.panelId)
        ? (panelTitle(currentView.panelId) || appName())
        : appName();
    }
    updateMeasureStatus();
  }

  /* ==================================================================
     10. Bottom navigation bar
     ==================================================================
     Icon AND label on every item, always. Arrow keys, Home and End move the
     roving focus; Enter and Space activate, which <button> gives for free.
     ------------------------------------------------------------------ */

  function buildNavBar() {
    var nav = byId('navBar');
    if (!nav) {
      nav = make('nav', 'ms-nav');
      nav.id = 'navBar';
      var root = byId('appRoot') || DOC.body;
      root.appendChild(nav);
    }
    // The landmark stays on <nav>; the tablist goes on the element that owns
    // the buttons. Mirrors the markup in index.html — see the note there.
    nav.removeAttribute('role');
    nav.setAttribute('aria-label', t('nav.aria'));

    var list = nav.querySelector('.ms-nav__list');
    if (!list) {
      list = make('div', 'ms-nav__list');
      nav.appendChild(list);
    }
    list.setAttribute('role', 'tablist');
    list.setAttribute('aria-label', t('nav.tablistAria'));

    for (var i = 0; i < TABS.length; i += 1) {
      var tab = TABS[i];
      if (byId(tab.navId)) continue;
      var btn = make('button', 'ms-nav__item');
      btn.id = tab.navId;
      btn.type = 'button';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', tab.tabId === activeTabId ? 'true' : 'false');
      btn.setAttribute('aria-controls', tab.panelId);
      btn.setAttribute('tabindex', tab.tabId === activeTabId ? '0' : '-1');

      var iconWrap = make('span', 'ms-nav__icon');
      iconWrap.appendChild(icon(tab.iconName));
      btn.appendChild(iconWrap);
      btn.appendChild(make('span', 'ms-nav__label', t(tab.labelKey)));
      list.appendChild(btn);
    }

    for (var j = 0; j < TABS.length; j += 1) {
      (function (tab) {
        var el = byId(tab.navId);
        if (!el || el.getAttribute('data-ms-bound') === 'nav') return;
        el.setAttribute('data-ms-bound', 'nav');
        el.addEventListener('click', function () { showTab(tab.tabId); });
        el.addEventListener('keydown', onNavKeydown);
      })(TABS[j]);
    }
  }

  function navIndexOf(el) {
    for (var i = 0; i < TABS.length; i += 1) { if (byId(TABS[i].navId) === el) return i; }
    return -1;
  }

  function focusNav(index) {
    var count = TABS.length;
    var i = ((index % count) + count) % count;
    var el = byId(TABS[i].navId);
    if (el && typeof el.focus === 'function') el.focus();
  }

  function onNavKeydown(ev) {
    var index = navIndexOf(ev.currentTarget);
    if (index < 0) return;
    var key = ev.key;
    if (key === 'ArrowRight' || key === 'ArrowDown') { focusNav(index + 1); ev.preventDefault(); }
    else if (key === 'ArrowLeft' || key === 'ArrowUp') { focusNav(index - 1); ev.preventDefault(); }
    else if (key === 'Home') { focusNav(0); ev.preventDefault(); }
    else if (key === 'End') { focusNav(TABS.length - 1); ev.preventDefault(); }
  }

  /* ==================================================================
     11. Live regions, toasts, busy state
     ================================================================== */

  function announce(textPL, assertive) {
    var el = byId(assertive ? 'liveRegionAlert' : 'liveRegion');
    if (!el) return;
    // Clearing first makes a repeated identical message announce again.
    el.textContent = '';
    global.setTimeout(function () { el.textContent = textPL || ''; }, 40);
  }

  var toastTimer = null;

  function toast(messagePL, opts) {
    var layer = byId('toastLayer');
    if (!layer) return;
    var o = opts || {};
    layer.innerHTML = '';

    var el = make('div', 'ms-toast');
    /* Deliberately NO role="status": announce() below already routes the text
       to one of the two live regions, and the polite region plus this one read
       the same sentence twice — for an error, once politely and once
       assertively. One channel, chosen by kind. */
    el.appendChild(make('span', 'ms-toast__text', messagePL || ''));

    if (o.actionPL) {
      var action = make('button', 'ms-toast__action', o.actionPL);
      action.type = 'button';
      action.addEventListener('click', function () {
        hideToast(el);
        if (typeof o.onAction === 'function') { try { o.onAction(); } catch (e) { /* isolated */ } }
      });
      el.appendChild(action);
    }

    layer.appendChild(el);
    el.hidden = false;
    nextFrame(function () { el.classList.add('is-open'); });
    announce(messagePL, o.kind === 'error');

    if (toastTimer) global.clearTimeout(toastTimer);
    var duration = o.durationMs || (o.actionPL ? 7000 : 4200);
    var arm = function () {
      if (toastTimer) global.clearTimeout(toastTimer);
      toastTimer = global.setTimeout(function () { hideToast(el); }, duration);
    };
    /* WCAG 2.2.1: a control that disappears on a timer must be reachable. The
       countdown stops while the toast has focus or the pointer, and restarts
       when both leave, so the action button cannot expire mid-reach. */
    var hold = function () { if (toastTimer) { global.clearTimeout(toastTimer); toastTimer = null; } };
    el.addEventListener('focusin', hold);
    el.addEventListener('mouseenter', hold);
    el.addEventListener('focusout', arm);
    el.addEventListener('mouseleave', arm);
    arm();
  }

  function hideToast(el) {
    if (!el) return;
    el.classList.remove('is-open');
    global.setTimeout(function () {
      el.hidden = true;
      if (el.parentNode) el.parentNode.removeChild(el);
    }, prefersReducedMotion() ? 0 : 220);
  }

  function setBusy(elOrId, isBusy) {
    var el = typeof elOrId === 'string' ? byId(elOrId) : elOrId;
    if (!el) return;
    el.setAttribute('aria-busy', isBusy ? 'true' : 'false');
    if (typeof el.disabled === 'boolean') el.disabled = !!isBusy;
    var spinner = el.querySelector ? el.querySelector('.ms-spinner') : null;
    if (isBusy && !spinner) {
      var s = make('span', 'ms-spinner');
      s.setAttribute('aria-hidden', 'true');
      el.insertBefore(s, el.firstChild);
    } else if (!isBusy && spinner && spinner.parentNode) {
      spinner.parentNode.removeChild(spinner);
    }
  }

  /* ==================================================================
     12. Sheets — focus trap, Escape, focus restoration
     ==================================================================
     Escape closes the topmost sheet and nothing else. It never closes a screen:
     on a phone that would drop the user two levels at once, and a keyboard user
     pressing Escape out of habit would lose the panel they were reading.
     ------------------------------------------------------------------ */

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function focusableIn(el) {
    if (!el) return [];
    var list = el.querySelectorAll(FOCUSABLE);
    var out = [];
    for (var i = 0; i < list.length; i += 1) {
      var node = list[i];
      if (node.offsetParent !== null || node === DOC.activeElement) out.push(node);
    }
    return out;
  }

  function scrimEl() { return byId('sheetScrim'); }

  function anySheetOpen() {
    for (var i = 0; i < navStack.length; i += 1) { if (navStack[i].kind === 'sheet') return true; }
    return false;
  }

  function topSheetEntry() {
    for (var i = navStack.length - 1; i >= 0; i -= 1) {
      if (navStack[i].kind === 'sheet') return navStack[i];
    }
    return null;
  }

  function openSheet(sheetId, opts) {
    var el = byId(sheetId);
    if (!el) return false;
    var o = opts || {};

    /* Two fast taps on the same opener pushed two entries for one sheet.
       Closing it popped one, anySheetOpen() still saw the other, and the user
       was left looking at a bare scrim with nothing on it. A sheet is a set,
       not a stack: opening one that is already open just moves the focus. */
    for (var d = 0; d < navStack.length; d += 1) {
      if (navStack[d].kind === 'sheet' && navStack[d].id === sheetId) {
        var again = o.focusId ? byId(o.focusId) : null;
        if (again) { try { again.focus(); } catch (e) { /* ignore */ } }
        return true;
      }
    }

    var entry = {
      kind: 'sheet',
      id: sheetId,
      dismissible: o.dismissible !== false,
      returnFocus: DOC.activeElement && DOC.activeElement !== DOC.body ? DOC.activeElement : null,
      result: undefined
    };
    pushEntry(entry);

    el.hidden = false;
    el.setAttribute('role', el.getAttribute('role') || 'dialog');
    el.setAttribute('aria-modal', 'true');

    /* The Tab trap and the scrim stop a keyboard and a mouse, but a swipe
       gesture or a virtual cursor walked straight into the tiles and the buy
       buttons underneath — invisible and unclickable. aria-modal alone is not
       a guarantee, so the background is really made inert. */
    var appRoot = byId('appRoot');
    if (appRoot) {
      appRoot.inert = true;
      appRoot.setAttribute('aria-hidden', 'true');
    }

    var scrim = scrimEl();
    if (scrim) {
      scrim.hidden = false;
      nextFrame(function () { scrim.classList.add('is-open'); });
    }
    nextFrame(function () { el.classList.add('is-open'); });

    var focusTarget = o.focusId ? byId(o.focusId) : null;
    if (!focusTarget) {
      var list = focusableIn(el);
      focusTarget = list.length ? list[0] : el;
    }
    if (focusTarget) {
      if (focusTarget === el && !el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
      nextFrame(function () { try { focusTarget.focus(); } catch (e) { /* ignore */ } });
    }

    emit('ui:sheetopen', { sheetId: sheetId });
    return true;
  }

  function closeSheet(sheetId, result) {
    var top = topEntry();
    if (top && top.kind === 'sheet' && top.id === sheetId) {
      top.result = result;
      back();
      return;
    }
    for (var i = navStack.length - 1; i >= 0; i -= 1) {
      if (navStack[i].kind === 'sheet' && navStack[i].id === sheetId) {
        var entry = navStack.splice(i, 1)[0];
        entry.result = result;
        performCloseSheet(entry);
        return;
      }
    }
  }

  function performCloseSheet(entry) {
    /* Escape, a tap on the scrim and the hardware Back button all arrive here
       and never touched dialogResolver, so a dismissed UI.confirm() hung for
       the life of the page and the next call silently replaced it. Dismissing
       a confirmation means "no", exactly like the Cancel button. */
    if (entry.id === 'sheetDialog' && dialogResolver) {
      var pending = dialogResolver;
      dialogResolver = null;
      var answer = entry.result === undefined ? false : entry.result;
      global.setTimeout(function () { pending(answer); }, 0);
    }
    var el = byId(entry.id);
    if (el) {
      el.classList.remove('is-open');
      var finish = function () {
        el.hidden = true;
        el.removeAttribute('aria-modal');
      };
      if (prefersReducedMotion()) finish();
      else global.setTimeout(finish, 260);
    }
    if (!anySheetOpen()) {
      var appRootBack = byId('appRoot');
      if (appRootBack) {
        appRootBack.inert = false;
        appRootBack.removeAttribute('aria-hidden');
      }
      var scrim = scrimEl();
      if (scrim) {
        scrim.classList.remove('is-open');
        global.setTimeout(function () { if (!anySheetOpen()) scrim.hidden = true; },
          prefersReducedMotion() ? 0 : 260);
      }
    }
    if (entry.returnFocus && DOC.contains(entry.returnFocus) && typeof entry.returnFocus.focus === 'function') {
      entry.returnFocus.focus();
    }
    emit('ui:sheetclose', { sheetId: entry.id, result: entry.result });
  }

  function onDocumentKeydown(ev) {
    if (ev.key === 'Escape') {
      var sheet = topSheetEntry();
      if (sheet && sheet.dismissible !== false) {
        ev.preventDefault();
        closeSheet(sheet.id, undefined);
      }
      return;
    }
    if (ev.key !== 'Tab') return;

    // Focus trap: only the topmost sheet is reachable while it is open.
    var top = topSheetEntry();
    if (!top) return;
    var el = byId(top.id);
    if (!el) return;
    var list = focusableIn(el);
    if (!list.length) { ev.preventDefault(); return; }
    var first = list[0], last = list[list.length - 1];
    if (ev.shiftKey && (DOC.activeElement === first || !el.contains(DOC.activeElement))) {
      last.focus();
      ev.preventDefault();
    } else if (!ev.shiftKey && DOC.activeElement === last) {
      first.focus();
      ev.preventDefault();
    }
  }

  /* ==================================================================
     13. Dialog and help sheets (owned by the shell)
     ================================================================== */

  var dialogResolver = null;

  function confirmDialog(o) {
    var opts = o || {};
    return new Promise(function (resolve) {
      var sheet = byId('sheetDialog');
      if (!sheet) { resolve(false); return; }
      setText(byId('dialogTitle'), opts.titlePL || t('dialog.title'));
      setText(byId('dialogBody'), opts.bodyPL || '');

      var confirmBtn = byId('dialogConfirm');
      var cancelBtn = byId('dialogCancel');
      if (confirmBtn) {
        confirmBtn.className = 'ms-btn ' + (opts.danger ? 'ms-btn--danger' : 'ms-btn--filled');
        confirmBtn.textContent = opts.confirmPL || t('dialog.confirm');
      }
      if (cancelBtn) {
        cancelBtn.hidden = opts.cancelPL === false;
        cancelBtn.textContent = opts.cancelPL || t('dialog.cancel');
      }
      dialogResolver = resolve;
      openSheet('sheetDialog', { focusId: opts.danger ? 'dialogCancel' : 'dialogConfirm' });
    });
  }

  function alertDialog(o) {
    var opts = o || {};
    return confirmDialog({
      titlePL: opts.titlePL || t('dialog.infoTitle'),
      bodyPL: opts.bodyPL || '',
      confirmPL: opts.okPL || t('dialog.ok'),
      cancelPL: false
    }).then(function () { return undefined; });
  }

  function openHelpSheet(metric) {
    if (!metric) return;
    var unit = metricUnit(metric);
    setText(byId('helpTitle'), metricName(metric));
    var body = byId('helpBody');
    if (body) {
      body.innerHTML = '';
      body.appendChild(make('p', 'ms-t-body', metricShort(metric)));
      body.appendChild(make('p', 'ms-t-body ms-t-muted', metricHelp(metric)));

      var th = thresholdFor(metric);
      var kv = make('dl', 'ms-kv');
      kv.appendChild(kvRow(t('help.unit'), unit));
      kv.appendChild(kvRow(t('help.scaleRange'), t('range.dash', {
        min: formatMetric(metric.id, metric.min), max: formatMetric(metric.id, metric.max)
      })));
      kv.appendChild(kvRow(t('threshold.warnLabel'), t('value.withUnit', {
        value: formatMetric(metric.id, th.warn), unit: unit
      })));
      kv.appendChild(kvRow(t('threshold.critLabel'), t('value.withUnit', {
        value: formatMetric(metric.id, th.crit), unit: unit
      })));
      body.appendChild(kv);

      var note = make('div', 'ms-note ms-note--info');
      note.appendChild(icon('info'));
      var noteText = make('div', 'ms-note__text');
      noteText.appendChild(make('span', 'ms-note__title', t('note.helpTitle')));
      noteText.appendChild(make('span', null, t('note.helpText')));
      note.appendChild(noteText);
      body.appendChild(note);
    }
    openSheet('sheetHelp', { focusId: 'helpClose' });
  }

  function kvRow(keyText, valueText) {
    var row = make('div', 'ms-kv__row');
    row.appendChild(make('dt', 'ms-kv__key', keyText));
    row.appendChild(make('dd', 'ms-kv__val', valueText));
    return row;
  }

  /* ==================================================================
     14. Shell construction
     ==================================================================
     Everything below is built only when it is missing. If index.html already
     ships the markup, these functions find it by id and leave it alone; if it
     does not, the shell still stands up on its own. That is what keeps four
     people working on this app in parallel without blocking each other.
     ------------------------------------------------------------------ */

  function ensureShell() {
    var root = byId('appRoot');
    if (!root) {
      root = make('div', 'ms-app');
      root.id = 'appRoot';
      DOC.body.appendChild(root);
    }
    if (!root.classList.contains('ms-app')) root.classList.add('ms-app');

    ensureSkipLink(root);
    ensureHeader(root);
    ensureMain(root);
    buildNavBar();
    ensureLiveRegions();
    ensureSheetLayer();
    ensureToastLayer();
  }

  function ensureSkipLink(root) {
    if (byId('skipLink')) return;
    var a = make('a', 'ms-skip', t('app.skipToContent'));
    a.id = 'skipLink';
    a.href = '#appMain';
    root.insertBefore(a, root.firstChild);
  }

  function ensureHeader(root) {
    var header = byId('appHeader');
    if (!header) {
      header = make('header', 'ms-header');
      header.id = 'appHeader';
      var inner = make('div', 'ms-header__inner');

      var title = make('h1', 'ms-header__title', appName());
      title.id = 'appTitle';
      inner.appendChild(title);

      var status = make('span', 'ms-status ms-status--good');
      status.id = 'measureStatus';
      status.hidden = true;
      status.appendChild(icon('play', 'sm'));
      status.appendChild(make('span', null, t('app.measuring')));
      inner.appendChild(status);

      var actions = make('div', 'ms-header__actions');

      var infoBtn = make('button', 'ms-iconbtn');
      infoBtn.id = 'btnInfo';
      infoBtn.type = 'button';
      infoBtn.setAttribute('aria-label', t('app.docsButton'));
      infoBtn.appendChild(icon('info'));
      actions.appendChild(infoBtn);

      inner.appendChild(actions);
      header.appendChild(inner);
      root.insertBefore(header, byId('skipLink') ? byId('skipLink').nextSibling : root.firstChild);
    }
  }

  function ensureMain(root) {
    var main = byId('appMain');
    if (!main) {
      main = make('main', 'ms-main');
      main.id = 'appMain';
      main.setAttribute('tabindex', '-1');
      var inner = make('div', 'ms-main__inner');
      inner.id = 'appMainInner';
      main.appendChild(inner);
      root.appendChild(main);
    }
    if (!main.querySelector('.ms-main__inner')) {
      var wrap = make('div', 'ms-main__inner');
      wrap.id = 'appMainInner';
      while (main.firstChild) wrap.appendChild(main.firstChild);
      main.appendChild(wrap);
    }
  }

  function mainInner() {
    return byId('appMainInner') || (byId('appMain') ? byId('appMain').querySelector('.ms-main__inner') : null) || byId('appMain');
  }

  function ensureLiveRegions() {
    // document.body, never #appRoot: an open sheet marks #appRoot inert and
    // aria-hidden, which would silence both regions for as long as it is up.
    var root = DOC.body || byId('appRoot');
    if (!byId('liveRegion')) {
      var polite = make('div', 'ms-visually-hidden');
      polite.id = 'liveRegion';
      polite.setAttribute('role', 'status');
      polite.setAttribute('aria-live', 'polite');
      polite.setAttribute('aria-atomic', 'true');
      root.appendChild(polite);
    }
    if (!byId('liveRegionAlert')) {
      var assertive = make('div', 'ms-visually-hidden');
      assertive.id = 'liveRegionAlert';
      assertive.setAttribute('role', 'alert');
      assertive.setAttribute('aria-live', 'assertive');
      assertive.setAttribute('aria-atomic', 'true');
      root.appendChild(assertive);
    }
  }

  function ensureToastLayer() {
    if (byId('toastLayer')) return;
    var layer = make('div', null);
    layer.id = 'toastLayer';
    DOC.body.appendChild(layer);
  }

  function ensureSheetLayer() {
    var layer = byId('sheetLayer');
    if (!layer) {
      layer = make('div', null);
      layer.id = 'sheetLayer';
      DOC.body.appendChild(layer);
    }
    if (!byId('sheetScrim')) {
      var scrim = make('div', 'ms-scrim');
      scrim.id = 'sheetScrim';
      scrim.hidden = true;
      scrim.addEventListener('click', function () {
        var top = topSheetEntry();
        if (top && top.dismissible !== false) closeSheet(top.id, undefined);
      });
      layer.insertBefore(scrim, layer.firstChild);
    }
    ensureDialogSheet(layer);
    ensureHelpSheet(layer);
  }

  function sheetSkeleton(sheetId, titleId, titleText) {
    var sheet = make('div', 'ms-sheet');
    sheet.id = sheetId;
    sheet.hidden = true;
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-labelledby', titleId);

    var grabber = make('div', 'ms-sheet__grabber');
    grabber.setAttribute('aria-hidden', 'true');
    sheet.appendChild(grabber);

    var head = make('div', 'ms-sheet__head');
    var titles = make('div', 'ms-sheet__titles');
    var title = make('h2', 'ms-sheet__title', titleText);
    title.id = titleId;
    titles.appendChild(title);
    head.appendChild(titles);
    sheet.appendChild(head);
    return sheet;
  }

  function ensureDialogSheet(layer) {
    if (byId('sheetDialog')) return;
    var sheet = sheetSkeleton('sheetDialog', 'dialogTitle', t('dialog.title'));

    var body = make('div', 'ms-sheet__body');
    var p = make('p', 'ms-t-body');
    p.id = 'dialogBody';
    body.appendChild(p);
    sheet.appendChild(body);

    var foot = make('div', 'ms-sheet__foot');
    var cancel = make('button', 'ms-btn ms-btn--text', t('dialog.cancel'));
    cancel.id = 'dialogCancel';
    cancel.type = 'button';
    var confirm = make('button', 'ms-btn ms-btn--filled', t('dialog.confirm'));
    confirm.id = 'dialogConfirm';
    confirm.type = 'button';
    foot.appendChild(cancel);
    foot.appendChild(confirm);
    sheet.appendChild(foot);

    layer.appendChild(sheet);

    cancel.addEventListener('click', function () { resolveDialog(false); });
    confirm.addEventListener('click', function () { resolveDialog(true); });
  }

  /* Single path: close the sheet with the answer as its result and let
     performCloseSheet settle the promise. Resolving here as well would fire
     twice for the button path and once for the dismiss path. */
  function resolveDialog(value) {
    closeSheet('sheetDialog', value);
  }

  function ensureHelpSheet(layer) {
    if (byId('sheetHelp')) return;
    var sheet = sheetSkeleton('sheetHelp', 'helpTitle', t('help.sheetTitle'));
    var body = make('div', 'ms-sheet__body');
    body.id = 'helpBody';
    sheet.appendChild(body);
    var foot = make('div', 'ms-sheet__foot');
    var close = make('button', 'ms-btn ms-btn--tonal', t('action.close'));
    close.id = 'helpClose';
    close.type = 'button';
    close.addEventListener('click', function () { closeSheet('sheetHelp', undefined); });
    foot.appendChild(close);
    sheet.appendChild(foot);
    layer.appendChild(sheet);
  }

  /* ==================================================================
     15. Panels: create what is missing, register everything
     ================================================================== */

  function ensurePanels() {
    var host = mainInner();
    if (!host) return;

    var i, tab, el;
    for (i = 0; i < TABS.length; i += 1) {
      tab = TABS[i];
      el = byId(tab.panelId);
      if (!el) {
        el = make('section', 'ms-view');
        el.id = tab.panelId;
        el.hidden = true;
        host.appendChild(el);
      }
      el.setAttribute('role', 'tabpanel');
      el.setAttribute('aria-labelledby', tab.navId);
      el.setAttribute('tabindex', '-1');
      registerPanel({ panelId: tab.panelId, tabId: tab.tabId, titleKey: tab.labelKey });
    }

    for (i = 0; i < OVERLAYS.length; i += 1) {
      var spec = OVERLAYS[i];
      el = byId(spec.panelId);
      if (!el) {
        el = make('section', 'ms-view');
        el.id = spec.panelId;
        el.hidden = true;
        host.appendChild(el);
      }
      el.setAttribute('role', 'region');
      el.setAttribute('tabindex', '-1');
      ensureOverlayHeader(el, spec);
      registerPanel({ panelId: spec.panelId, titleKey: spec.titleKey });
    }
  }

  /* Every overlay gets the same header: back button on the left, title next to
     it. The convention panelXxx -> backXxx / titleXxx is a contract, so other
     modules can find both without asking. */
  function ensureOverlayHeader(el, spec) {
    var suffix = overlaySuffix(spec.panelId);
    var backId = 'back' + suffix;
    var titleId = 'title' + suffix;
    /* Nagłówek już stoi: to jest wywołanie po zmianie języka, więc jedyne, co
       trzeba zrobić, to odświeżyć oba napisy. Zbudowanie go drugi raz zerwałoby
       podpięte zdarzenie przycisku „Wróć”. */
    if (byId(backId)) {
      byId(backId).setAttribute('aria-label', t('action.back'));
      setText(byId(titleId), t(spec.titleKey));
      return;
    }

    var row = make('div', 'ms-row ms-panel-head');
    var backBtn = make('button', 'ms-iconbtn');
    backBtn.id = backId;
    backBtn.type = 'button';
    backBtn.setAttribute('aria-label', t('action.back'));
    // The chevron glyph points right; a back button must point left.
    var chev = icon('chevron');
    chev.style.transform = 'rotate(180deg)';
    backBtn.appendChild(chev);
    backBtn.addEventListener('click', function () { back(); });

    var title = make('h2', 'ms-section__title', t(spec.titleKey));
    title.id = titleId;

    row.appendChild(backBtn);
    row.appendChild(title);
    el.insertBefore(row, el.firstChild);
    el.setAttribute('aria-labelledby', titleId);
  }

  /* ==================================================================
     16. Measure screen
     ==================================================================
     Built only when panelMeasure is empty. The order of elements is a rule,
     not a preference: camera, controls, tiles, then everything else. An ad can
     never be inserted above the controls because nothing here creates a slot on
     this screen, and the specification forbids one.
     ------------------------------------------------------------------ */

  var builtMeasure = false;

  /* Podgląd kamery jest jedynym kawałkiem ekranu, którego NIE WOLNO zbudować
     od nowa przy zmianie języka: engine.js zapamiętuje <video> i <p> zastępczy
     przy pierwszym uruchomieniu i trzyma na nich strumień. Nowe elementy
     zostawiłyby silnik z odczepionym obrazem — podgląd byłby czarny, a pomiar
     wyglądałby na zawieszony. Dlatego przebudowa ekranu odkłada tu cały
     #cameraStage i wstawia z powrotem ten sam węzeł. */
  var keptStage = null;

  function isCalibrated() {
    var E = global.Engine;
    if (!E || typeof E.getCalibration !== 'function') return false;
    try { return !!E.getCalibration(); } catch (e) { return false; }
  }

  function cameraStage() {
    if (keptStage) {
      var kept = keptStage;
      keptStage = null;
      /* Napis zastępczy bywa teraz komunikatem silnika („Pomiar zatrzymany…”),
         więc odświeżamy go tylko wtedy, gdy kamera jest wyłączona. */
      var keptText = kept.querySelector('#cameraPlaceholderText');
      var keptBadge = kept.querySelector('#cameraLiveBadge span');
      if (keptBadge) keptBadge.textContent = t('camera.live');
      var E = global.Engine;
      var busy = !!(E && typeof E.state === 'function' && E.state() !== 'idle');
      if (keptText && !busy) keptText.textContent = t('camera.idle');
      return kept;
    }

    var stage = make('div', 'ms-camera');
    stage.id = 'cameraStage';

    var video = DOC.createElement('video');
    video.id = 'cameraVideo';
    video.className = 'ms-camera__video';
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    video.muted = true;
    video.setAttribute('aria-hidden', 'true');
    stage.appendChild(video);

    var reticle = make('div', 'ms-camera__reticle');
    reticle.id = 'cameraOverlay';
    reticle.setAttribute('aria-hidden', 'true');
    stage.appendChild(reticle);

    var badge = make('div', 'ms-camera__badge');
    badge.id = 'cameraLiveBadge';
    badge.hidden = true;
    badge.appendChild(make('span', null, t('camera.live')));
    stage.appendChild(badge);

    var placeholder = make('div', 'ms-camera__placeholder');
    placeholder.id = 'cameraPlaceholder';
    placeholder.appendChild(icon('camera', 'xl'));
    var placeholderText = make('p', null, t('camera.idle'));
    placeholderText.id = 'cameraPlaceholderText';
    placeholder.appendChild(placeholderText);
    stage.appendChild(placeholder);

    return stage;
  }

  function buildMeasureScreen() {
    var panel = byId('panelMeasure');
    if (!panel) return;
    if (byId('tileGrid')) { buildTiles(); return; }
    builtMeasure = true;

    var section = make('section', 'ms-section');

    /* --- first-run instruction (see boot.js) --- */
    var firstRun = make('div', 'ms-note ms-note--info');
    firstRun.id = 'firstRunNote';
    firstRun.hidden = true;
    firstRun.appendChild(icon('info'));
    var firstRunText = make('div', 'ms-note__text');
    firstRunText.appendChild(make('span', 'ms-note__title', t('firstRun.title')));
    firstRunText.appendChild(make('span', null, t('firstRun.text')));
    firstRun.appendChild(firstRunText);
    var firstRunClose = make('button', 'ms-btn ms-btn--icon');
    firstRunClose.id = 'firstRunNoteClose';
    firstRunClose.type = 'button';
    firstRunClose.setAttribute('aria-label', t('firstRun.close'));
    firstRunClose.appendChild(icon('close', 'sm'));
    firstRunClose.addEventListener('click', function () {
      firstRun.hidden = true;
      setSetting('firstRunDone', true);
      var startBtnEl = byId('btnStart');
      if (startBtnEl) { try { startBtnEl.focus(); } catch (e) { /* ignore */ } }
    });
    firstRun.appendChild(firstRunClose);
    section.appendChild(firstRun);

    /* --- camera --- */
    var cameraCard = make('div', 'ms-card ms-card--bare');
    cameraCard.appendChild(cameraStage());
    section.appendChild(cameraCard);

    /* --- controls: in the normal flow, above everything optional --- */
    var controls = make('div', 'ms-camera__controls');
    controls.id = 'measureControls';

    var startBtn = make('button', 'ms-btn ms-btn--filled ms-btn--lg');
    startBtn.id = 'btnStart';
    startBtn.type = 'button';
    startBtn.appendChild(icon('play'));
    startBtn.appendChild(make('span', 'ms-btn__label', t('action.start')));

    var stopBtn = make('button', 'ms-btn ms-btn--tonal ms-btn--lg');
    stopBtn.id = 'btnStop';
    stopBtn.type = 'button';
    stopBtn.disabled = true;
    stopBtn.appendChild(icon('stop'));
    stopBtn.appendChild(make('span', 'ms-btn__label', t('action.stop')));

    var switchBtn = make('button', 'ms-btn ms-btn--outline ms-btn--lg');
    switchBtn.id = 'btnSwitchCamera';
    switchBtn.type = 'button';
    switchBtn.setAttribute('aria-label', t('action.switchAria'));
    switchBtn.appendChild(icon('flip'));
    switchBtn.appendChild(make('span', 'ms-btn__label ms-only-wide', t('action.switch')));

    controls.appendChild(startBtn);
    controls.appendChild(stopBtn);
    controls.appendChild(switchBtn);
    section.appendChild(controls);

    /* --- tiles --- */
    var head = make('div', 'ms-section__head');
    head.appendChild(make('h2', 'ms-section__title', t('metrics.sevenTitle')));
    head.appendChild(make('p', 'ms-section__sub', t('measure.tilesSub')));
    section.appendChild(head);

    var grid = make('div', 'ms-grid');
    grid.id = 'tileGrid';
    section.appendChild(grid);

    /* --- session summary --- */
    var summary = make('div', 'ms-card');
    summary.id = 'sessionSummary';
    var sumHead = make('div', 'ms-card__head');
    sumHead.appendChild(make('h3', 'ms-card__title', t('session.title')));
    summary.appendChild(sumHead);
    var kv = make('dl', 'ms-kv');
    kv.appendChild(kvRowWithId(t('session.duration'), 'sessionDuration', '—'));
    kv.appendChild(kvRowWithId(t('session.samples'), 'sessionSamples', '—'));
    kv.appendChild(kvRowWithId(t('zone.count.good'), 'sessionZoneGood', '—'));
    kv.appendChild(kvRowWithId(t('zone.count.warning'), 'sessionZoneWarning', '—'));
    kv.appendChild(kvRowWithId(t('zone.count.critical'), 'sessionZoneCritical', '—'));
    summary.appendChild(kv);
    section.appendChild(summary);

    /* --- calibration notice (filled by tools.js when calibration exists) --- */
    var calib = make('div', 'ms-note ms-note--info');
    calib.id = 'calibrationNotice';
    calib.appendChild(icon('info'));
    /* Stan kalibracji czytamy z silnika, a nie zakładamy „brak”: po przebudowie
       ekranu (zmiana języka) zdarzenie 'engine:calibration' już nie przyjdzie,
       a notka nie może wtedy skłamać. */
    var calibText = make('div', 'ms-note__text', t(isCalibrated() ? 'note.calibrated' : 'note.calibration'));
    calib.appendChild(calibText);
    section.appendChild(calib);

    /* --- the app admits what it cannot do; this never gets hidden --- */
    var disclaimer = make('div', 'ms-note ms-note--warning');
    disclaimer.id = 'disclaimerMeasure';
    disclaimer.appendChild(icon('warning'));
    var disc = make('div', 'ms-note__text');
    disc.appendChild(make('span', 'ms-note__title', t('note.dashTitle')));
    /* Dwa skończone zdania warstwy wspólnej postawione obok siebie, a nie
       sklejony napis: drugie z nich to sformułowanie, przy którym
       rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za wykluczone,
       i musi stać w całości, we własnym kluczu, w każdym z trzydziestu języków. */
    disc.appendChild(make('span', null,
      t('note.dashText') + ' ' + t('legal.mdr', { app: appName() })));
    disclaimer.appendChild(disc);
    section.appendChild(disclaimer);

    panel.appendChild(section);
    buildTiles();
    wireMeasureControls();
    if (firstRunPending) showFirstRunNote();
  }

  /* Called once by boot.js on a first run. Shows the note if the Measure screen
     has already been built, and remembers the request if it has not. */
  var firstRunPending = false;

  function showFirstRunNote() {
    if (getSetting('firstRunDone')) return;
    var note = byId('firstRunNote');
    if (!note) { firstRunPending = true; return; }
    firstRunPending = false;
    note.hidden = false;
  }

  function kvRowWithId(keyText, valueId, valueText) {
    var row = make('div', 'ms-kv__row');
    row.appendChild(make('dt', 'ms-kv__key', keyText));
    var dd = make('dd', 'ms-kv__val', valueText);
    dd.id = valueId;
    row.appendChild(dd);
    return row;
  }

  /* Camera buttons are wired defensively: every handler checks Engine's state
     first, so if engine.js also binds them a double click cannot start two
     sessions — the second call sees state 'starting' and returns. */
  function wireMeasureControls() {
    bindOnce('btnStart', 'click', function () {
      var E = global.Engine;
      if (!E) { toast(t('error.engineMissing'), { kind: 'error' }); return; }
      var state = typeof E.state === 'function' ? E.state() : 'idle';
      if (state === 'starting' || state === 'running') return;
      setBusy('btnStart', true);
      Promise.resolve(E.start()).then(function (res) {
        // setBusy(false) clears `disabled`; the engine state, not the spinner,
        // decides whether Start may be pressed again.
        setBusy('btnStart', false);
        applyEngineState(typeof E.state === 'function' ? E.state() : 'idle');
        if (res && res.ok === false && res.messagePL) toast(res.messagePL, { kind: 'error' });
      }, function () {
        setBusy('btnStart', false);
        applyEngineState(typeof E.state === 'function' ? E.state() : 'idle');
      });
    });

    bindOnce('btnStop', 'click', function () {
      var E = global.Engine;
      if (!E || (typeof E.isRunning === 'function' && !E.isRunning())) return;
      E.stop();
    });

    bindOnce('btnSwitchCamera', 'click', function () {
      var E = global.Engine;
      if (!E || typeof E.switchCamera !== 'function') return;
      Promise.resolve(E.switchCamera()).then(function (res) {
        if (res && res.ok === false && res.messagePL) toast(res.messagePL, { kind: 'error' });
        else drawOverlay();
      }, function () { /* Engine never rejects; this is belt and braces */ });
    });
  }

  function bindOnce(id, type, handler) {
    var el = byId(id);
    if (!el) return;
    var key = 'data-ms-bound-' + type;
    if (el.getAttribute(key) === 'ui-core') return;
    el.setAttribute(key, 'ui-core');
    el.addEventListener(type, handler);
  }

  /* ==================================================================
     17. Metric tiles — one loop over Metrics.CATALOGUE
     ==================================================================
     Seven tiles are generated, never written out seven times. A metric added to
     the catalogue appears here with no change to this file.
     ------------------------------------------------------------------ */

  /* Nazwa strefy pada w dwóch postaciach: napisem na kafelku (wielką literą)
     i w środku zdania dla czytnika ekranu (małą). Obie stoją w słowniku, więc
     nie ma tu ani listy słów, ani toLowerCase(). */
  function zoneWord(zone) { return zone ? t('zone.' + zone) : ''; }
  function zoneSpoken(zone) { return zone ? t('zone.spoken.' + zone) : ''; }
  /* Editorial judgement, not a standard: two seconds of a held zone is long
     enough that a reading balanced on a threshold stops chattering, and short
     enough that a real change is still news; twenty seconds between repeats of
     the same metric keeps a genuinely unstable room from filling the whole
     live region. Both are in samples the user can feel, not in frames. */
  var ZONE_HOLD_MS = 2000;
  var ZONE_REPEAT_MS = 20000;
  /* { metricId: { zone, since, announcedAt } } */
  var lastZones = {};

  function catalogue() {
    return (global.Metrics && global.Metrics.CATALOGUE) ? global.Metrics.CATALOGUE : [];
  }

  /* Zapis liczby po myśli aktywnego języka: 2,5 po polsku, 2.5 po angielsku,
     ٢٫٥ po arabsku. Metrics.formatValue jest wspólny dla pięciu wersji i zna
     tylko polski przecinek, więc służy tu wyłącznie jako siatka bezpieczeństwa
     na wypadek braku Intl. Grupowanie tysięcy jest WYŁĄCZONE: „5234 K” było
     i ma zostać jedną liczbą, bez odstępu w środku. */
  function formatMetric(metricId, value) {
    var m = global.Metrics && typeof global.Metrics.byId === 'function'
      ? global.Metrics.byId(metricId) : null;
    if (!isNum(value)) return '—';
    var I = global.I18n;
    if (m && I && typeof I.number === 'function') {
      var d = typeof m.decimals === 'number' ? m.decimals : 0;
      var out = I.number(value, {
        minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: false
      });
      if (out) return out;
    }
    if (global.Metrics && typeof global.Metrics.formatValue === 'function') {
      return global.Metrics.formatValue(metricId, value);
    }
    return String(Math.round(value));
  }

  function thresholdFor(metric) {
    var E = global.Engine;
    if (E && typeof E.getThresholds === 'function') {
      try {
        var map = E.getThresholds();
        if (map && map[metric.id]) return map[metric.id];
      } catch (e) { /* fall through to the catalogue defaults */ }
    }
    return { warn: metric.warn, crit: metric.crit };
  }

  function buildTiles() {
    var grid = byId('tileGrid');
    if (!grid) return;
    grid.innerHTML = '';

    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      grid.appendChild(buildTile(list[i], list[i].id === HERO_METRIC_ID));
    }
  }

  /* The metric the application is named after leads the screen. Seven identical
     120px dials gave the eye nowhere to land and no answer to "which number is
     the headline"; the visual system ships .ms-tile--wide, .ms-gauge--lg and a
     44px display size for exactly this, and nothing was using them. It also
     squares the grid: one full-width tile plus six leaves no orphan cell at
     either two or three columns, which is what left "Komfort wzrokowy" sitting
     alone next to 177x399px of nothing. Editorial choice, not a measurement
     one — the engine treats all seven identically. */
  var HERO_METRIC_ID = 'share';

  function buildTile(metric, hero) {
    var tile = make('article', 'ms-tile' + (hero ? ' ms-tile--wide' : ''));
    tile.id = 'tile-' + metric.id;
    tile.setAttribute('role', 'group');
    tile.setAttribute('aria-labelledby', 'tileName-' + metric.id);

    var head = make('div', 'ms-tile__head');
    var name = make('h3', 'ms-tile__name', metricName(metric));
    name.id = 'tileName-' + metric.id;
    head.appendChild(name);

    var help = make('button', 'ms-tile__info');
    help.id = 'tileHelp-' + metric.id;
    help.type = 'button';
    help.setAttribute('aria-label', t('tile.helpAria', { name: metricName(metric) }));
    help.appendChild(icon('help', 'sm'));
    help.addEventListener('click', function () { openHelpSheet(metric); });
    head.appendChild(help);
    tile.appendChild(head);

    /* The dial. Seven of them, which is the honest answer to "more than two
       gauges": every metric gets the same instrument. The lead metric gets the
       same instrument in the large size — a difference of emphasis, never of
       kind, and never of accuracy. */
    var gauge = make('div', 'ms-gauge ' + (hero ? 'ms-gauge--lg' : 'ms-gauge--sm'));
    gauge.id = 'tileGauge-' + metric.id;
    var dial = make('div', 'ms-gauge__dial');
    dial.setAttribute('aria-hidden', 'true');
    gauge.appendChild(dial);

    var readout = make('div', 'ms-gauge__readout');
    var value = make('span', 'ms-gauge__value', '—');
    value.id = 'tileValue-' + metric.id;
    var unit = make('span', 'ms-gauge__unit', metricUnit(metric));
    unit.id = 'tileUnit-' + metric.id;
    readout.appendChild(value);
    readout.appendChild(unit);
    gauge.appendChild(readout);

    tile.appendChild(gauge);

    var status = make('p', 'ms-tile__status');
    status.id = 'tileZone-' + metric.id;
    var mark = make('span', 'ms-mark');
    mark.setAttribute('aria-hidden', 'true');
    status.appendChild(mark);
    status.appendChild(make('span', null, t('tile.noMeasurement')));
    tile.appendChild(status);

    var hint = make('p', 'ms-tile__hint', metricShort(metric));
    hint.id = 'tileHint-' + metric.id;
    tile.appendChild(hint);

    return tile;
  }

  function setZoneStatus(metricId, zone, word) {
    var status = byId('tileZone-' + metricId);
    if (!status) return;
    var mark = status.querySelector('.ms-mark');
    var label = status.querySelector('span:last-child');
    if (zone) {
      if (mark) mark.setAttribute('data-zone', zone);
    } else if (mark) {
      mark.removeAttribute('data-zone');
    }
    if (label) label.textContent = word;
  }

  function drawTiles(reading) {
    var now = (reading && isNum(reading.t)) ? reading.t : Date.now();
    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      var metric = list[i];
      var tile = byId('tile-' + metric.id);
      if (!tile) continue;

      var value = reading && reading.values ? reading.values[metric.id] : null;
      var zone = reading && reading.zones ? reading.zones[metric.id] : null;
      var valueEl = byId('tileValue-' + metric.id);
      var gauge = byId('tileGauge-' + metric.id);

      if (!isNum(value)) {
        setText(valueEl, '—');
        tile.removeAttribute('data-zone');
        if (gauge) {
          gauge.removeAttribute('data-zone');
          gauge.style.setProperty('--ms-gauge-pct', 0);
        }
        setZoneStatus(metric.id, null, t(reading ? 'zone.none' : 'tile.noMeasurement'));
        continue;
      }

      setText(valueEl, formatMetric(metric.id, value));
      var pct = clamp(((value - metric.min) / (metric.max - metric.min)) * 100, 0, 100);
      if (gauge) {
        gauge.style.setProperty('--ms-gauge-pct', Math.round(pct * 10) / 10);
        if (zone) gauge.setAttribute('data-zone', zone); else gauge.removeAttribute('data-zone');
      }
      if (zone) tile.setAttribute('data-zone', zone); else tile.removeAttribute('data-zone');
      setZoneStatus(metric.id, zone, zone ? zoneWord(zone) : t('tile.outOfScale'));

      /* A zone change is worth saying out loud once; a value changing five
         times a second is not. Screen readers get the transition, not the
         stream — and a value sitting exactly on a threshold produces a
         transition on every one of those five samples, which used to bury the
         reader under several announcements a second across seven metrics.
         A new zone therefore has to HOLD before it is worth a word, and the
         same metric keeps quiet for a while afterwards. */
      if (zone && currentView.panelId === 'panelMeasure') {
        var seen = lastZones[metric.id];
        if (!seen || seen.zone !== zone) {
          lastZones[metric.id] = { zone: zone, since: now, announcedAt: seen ? seen.announcedAt : 0 };
        } else if (zone !== 'good'
            && now - seen.since >= ZONE_HOLD_MS
            && now - (seen.announcedAt || 0) >= ZONE_REPEAT_MS) {
          seen.announcedAt = now;
          announce(t('a11y.zoneAnnounce', {
            name: metricName(metric),
            zone: zoneWord(zone),
            value: formatMetric(metric.id, value),
            unit: metricUnit(metric)
          }));
        }
      } else if (zone) {
        lastZones[metric.id] = { zone: zone, since: now, announcedAt: 0 };
      }
    }
    updateSessionSummary();
  }

  function updateSessionSummary() {
    var E = global.Engine;
    if (!E || typeof E.session !== 'function') return;
    var s = null;
    try { s = E.session(); } catch (e) { s = null; }
    if (!s) return;
    setText(byId('sessionDuration'), formatDuration(s.durationMs));
    setText(byId('sessionSamples'), samples(s.samples || 0));
    var z = s.zones || { good: 0, warning: 0, critical: 0 };
    setText(byId('sessionZoneGood'), samples(z.good || 0));
    setText(byId('sessionZoneWarning'), samples(z.warning || 0));
    setText(byId('sessionZoneCritical'), samples(z.critical || 0));
  }

  /* The reticle shows the part of the frame that is actually sampled: the
     middle 60 % of the VIDEO, which is not the middle 60 % of the box once
     object-fit: cover has cropped the picture. Getting this wrong would make
     the app lie about where it is looking. */
  function drawOverlay() {
    var box = byId('cameraStage');
    var video = byId('cameraVideo');
    var reticle = byId('cameraOverlay');
    if (!box || !reticle) return;
    // Taken from the engine, never re-typed: two 0.6 constants in two files
    // drift apart and the app then lies about where it is looking.
    var E = global.Engine;
    var CROP = (E && typeof E.CROP_FRACTION === 'number') ? E.CROP_FRACTION : 0.6;
    var bw = box.clientWidth, bh = box.clientHeight;
    var vw = video ? video.videoWidth : 0;
    var vh = video ? video.videoHeight : 0;
    if (!bw || !bh || !vw || !vh) {
      var side = ((1 - CROP) / 2) * 100;
      reticle.style.inset = side + '%';
      return;
    }
    var scale = Math.max(bw / vw, bh / vh);
    var cropW = vw * CROP * scale;
    var cropH = vh * CROP * scale;
    var insetX = clamp(((bw - cropW) / 2 / bw) * 100, 0, 45);
    var insetY = clamp(((bh - cropH) / 2 / bh) * 100, 0, 45);
    reticle.style.inset = insetY + '% ' + insetX + '%';
  }

  /* ==================================================================
     18. History screen: chart and table
     ==================================================================
     The chart is drawn by hand on a 2D canvas. No library, no build step, and
     no network — which also means the drawing code has to be honest about the
     one thing canvases get wrong in a tabbed layout: a hidden panel has no
     width, so a draw attempted there is postponed instead of faked.
     ------------------------------------------------------------------ */

  var HOUR_MS = 3600000;
  var DAY_MS = 86400000;

  // No full stops: "1 godz." wrapped onto two lines in a five-way segment.
  var RANGES = [
    { id: 'range1m', ms: 60000, labelKey: 'range.1m' },
    { id: 'range1h', ms: HOUR_MS, labelKey: 'range.1h' },
    { id: 'range24h', ms: 24 * HOUR_MS, labelKey: 'range.24h' },
    { id: 'range7d', ms: 7 * DAY_MS, labelKey: 'range.7d' },
    { id: 'range30d', ms: 30 * DAY_MS, labelKey: 'range.30d' }
  ];

  var chartMetricId = 'share';
  var chartRangeMs = 60000;
  var chartDirty = false;

  function rangeById(id) {
    for (var i = 0; i < RANGES.length; i += 1) { if (RANGES[i].id === id) return RANGES[i]; }
    return null;
  }

  function rangeByMs(ms) {
    for (var i = 0; i < RANGES.length; i += 1) { if (RANGES[i].ms === ms) return RANGES[i]; }
    return RANGES[0];
  }

  function buildHistoryScreen() {
    var panel = byId('panelHistory');
    if (!panel) return;

    chartMetricId = getSetting('chartMetric') || 'share';
    chartRangeMs = Number(getSetting('chartRangeMs')) || 60000;
    if (!global.Metrics || !global.Metrics.byId(chartMetricId)) chartMetricId = 'share';

    if (!byId('chartMain')) {
      var section = make('section', 'ms-section');

      var head = make('div', 'ms-section__head');
      head.appendChild(make('h2', 'ms-section__title', t('history.title')));
      // The reading count belongs here, not in the legend: a legend explains
      // what the ink means, and "0 odczytów" next to a grey swatch pretended
      // to be a fourth series.
      var headSub = make('p', 'ms-section__sub', t('history.pickHint'));
      headSub.id = 'chartCountSub';
      head.appendChild(headSub);
      section.appendChild(head);

      var controls = make('div', 'ms-card');

      var field = make('div', 'ms-field');
      var label = make('label', 'ms-field__label', t('history.metricLabel'));
      label.setAttribute('for', 'chartMetricSelect');
      field.appendChild(label);
      var wrap = make('div', 'ms-selectwrap');
      var select = make('select', 'ms-select');
      select.id = 'chartMetricSelect';
      wrap.appendChild(select);
      field.appendChild(wrap);
      controls.appendChild(field);

      var group = make('div', 'ms-segment');
      group.id = 'chartRangeGroup';
      group.setAttribute('role', 'group');
      group.setAttribute('aria-label', t('history.rangeAria'));
      controls.appendChild(group);
      section.appendChild(controls);

      var chartBox = make('div', 'ms-chart');
      chartBox.id = 'chartBox';
      var canvas = DOC.createElement('canvas');
      canvas.id = 'chartMain';
      canvas.className = 'ms-chart__canvas';
      canvas.setAttribute('role', 'img');
      chartBox.appendChild(canvas);
      section.appendChild(chartBox);

      var legend = make('div', 'ms-legend');
      legend.id = 'chartLegend';
      section.appendChild(legend);

      var empty = make('div', 'ms-empty');
      empty.id = 'chartEmpty';
      var emptyIcon = make('div', 'ms-empty__icon');
      emptyIcon.appendChild(icon('chart', 'lg'));
      empty.appendChild(emptyIcon);
      empty.appendChild(make('p', 'ms-empty__title', t('history.emptyTitle')));
      empty.appendChild(make('p', 'ms-empty__text', t('history.emptyText')));
      section.appendChild(empty);

      var actions = make('div', 'ms-row');
      var reportsBtn = make('button', 'ms-btn ms-btn--outline');
      reportsBtn.id = 'btnOpenReports';
      reportsBtn.type = 'button';
      reportsBtn.appendChild(icon('doc', 'sm'));
      reportsBtn.appendChild(make('span', 'ms-btn__label', t('action.reports')));
      reportsBtn.addEventListener('click', function () { openOrExplain('panelReports'); });
      var exportBtn = make('button', 'ms-btn ms-btn--outline');
      exportBtn.id = 'btnOpenExport';
      exportBtn.type = 'button';
      exportBtn.appendChild(icon('download', 'sm'));
      exportBtn.appendChild(make('span', 'ms-btn__label', t('action.exportCsv')));
      exportBtn.addEventListener('click', function () { openOrExplain('panelExport'); });
      actions.appendChild(reportsBtn);
      actions.appendChild(exportBtn);
      section.appendChild(actions);

      /* --- table --- */
      /* The toggle belongs beside the heading it controls. Centred on its own
         line it was the only bare text link in an application where every
         other action is a pill, and it read as a stray hyperlink. */
      var tableHead = make('div', 'ms-section__head');
      tableHead.appendChild(make('h2', 'ms-section__title', t('history.tableTitle')));
      tableHead.appendChild(make('span', 'ms-spacer'));

      var toggle = make('button', 'ms-btn ms-btn--text');
      toggle.id = 'tableToggle';
      toggle.type = 'button';
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-controls', 'tableWrap');
      toggle.appendChild(make('span', 'ms-btn__label', t('history.tableHide')));
      tableHead.appendChild(toggle);
      section.appendChild(tableHead);

      var tableWrap = make('div', 'ms-tablewrap');
      tableWrap.id = 'tableWrap';
      var table = make('table', 'ms-table');
      table.id = 'readingsTable';
      var caption = make('caption', 'ms-visually-hidden', t('history.tableCaption'));
      table.appendChild(caption);
      table.appendChild(make('thead', null));
      var tbody = make('tbody', null);
      tbody.id = 'readingsBody';
      table.appendChild(tbody);
      tableWrap.appendChild(table);
      section.appendChild(tableWrap);

      panel.appendChild(section);
    }

    fillMetricSelect();
    buildRangeSegment();
    buildTableHead();
    wireHistoryControls();
    updateRangePressed();
    /* Decide chart-versus-empty once at build time as well. drawCharts settles
       it on every draw, but its first run is a frame after the panel is
       revealed, and until then the screen showed a fully drawn empty axis and
       a "Brak danych" panel one above the other — the exact pairing this was
       meant to remove. */
    applyChartVisibility(chartSeriesCount() === 0);
  }

  /* Chart, legend and empty panel are mutually exclusive: exactly one of the
     two states is on screen at any moment. */
  function applyChartVisibility(nothingToPlot) {
    var emptyBox = byId('chartEmpty');
    if (emptyBox) emptyBox.hidden = !nothingToPlot;
    var chartBox = byId('chartBox');
    if (chartBox) chartBox.hidden = nothingToPlot;
    var legendBox = byId('chartLegend');
    if (legendBox) legendBox.hidden = nothingToPlot;
  }

  function chartSeriesCount() {
    var metric = global.Metrics ? global.Metrics.byId(chartMetricId) : null;
    if (!metric) return 1;
    try { return getSeries(metric.id, chartRangeMs).length; }
    catch (e) { return 0; }
  }

  function fillMetricSelect() {
    var select = byId('chartMetricSelect');
    if (!select) return;
    select.innerHTML = '';
    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      var m = list[i];
      var opt = DOC.createElement('option');
      opt.value = m.id;
      opt.textContent = metricName(m);
      if (m.id === chartMetricId) opt.selected = true;
      select.appendChild(opt);
    }
  }

  function buildRangeSegment() {
    var group = byId('chartRangeGroup');
    if (!group) return;
    for (var i = 0; i < RANGES.length; i += 1) {
      var r = RANGES[i];
      if (byId(r.id)) continue;
      var btn = make('button', 'ms-segment__item');
      btn.id = r.id;
      btn.type = 'button';
      btn.setAttribute('aria-pressed', r.ms === chartRangeMs ? 'true' : 'false');
      btn.appendChild(make('span', null, t(r.labelKey)));
      group.appendChild(btn);
    }
    for (var j = 0; j < RANGES.length; j += 1) {
      (function (r) {
        var btn = byId(r.id);
        if (!btn || btn.getAttribute('data-ms-bound') === 'range') return;
        btn.setAttribute('data-ms-bound', 'range');
        btn.addEventListener('click', function () { setChartRange(r.ms); });
      })(RANGES[j]);
    }
  }

  function updateRangePressed() {
    for (var i = 0; i < RANGES.length; i += 1) {
      var btn = byId(RANGES[i].id);
      if (btn) btn.setAttribute('aria-pressed', RANGES[i].ms === chartRangeMs ? 'true' : 'false');
    }
  }

  function setChartMetric(metricId) {
    var metric = global.Metrics ? global.Metrics.byId(metricId) : null;
    if (!metric) return false;
    chartMetricId = metricId;
    setSetting('chartMetric', metricId);
    drawCharts();
    drawTable();
    return true;
  }

  function setChartRange(ms) {
    var r = rangeByMs(ms);
    chartRangeMs = r.ms;
    setSetting('chartRangeMs', chartRangeMs);
    updateRangePressed();
    drawCharts();
    return true;
  }

  function wireHistoryControls() {
    bindOnce('chartMetricSelect', 'change', function (ev) {
      setChartMetric(ev.target.value);
    });
    bindOnce('tableToggle', 'click', function () {
      var wrap = byId('tableWrap');
      var btn = byId('tableToggle');
      if (!wrap || !btn) return;
      var open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      wrap.hidden = !open;
      setText(btn.querySelector('.ms-btn__label'), t(open ? 'history.tableHide' : 'history.tableShow'));
      setSetting('tableOpen', open);
      if (open) drawTable();
    });
    var wrapEl = byId('tableWrap');
    var toggleEl = byId('tableToggle');
    if (wrapEl && toggleEl) {
      var open = getSetting('tableOpen') !== false;
      wrapEl.hidden = !open;
      toggleEl.setAttribute('aria-expanded', open ? 'true' : 'false');
      setText(toggleEl.querySelector('.ms-btn__label'), t(open ? 'history.tableHide' : 'history.tableShow'));
    }
  }

  function openOrExplain(panelId) {
    if (showPanel(panelId)) return;
    toast(t('toast.screenUnavailable'), { kind: 'info' });
  }

  /* ------------------------------------------------------------------
     Series
     ------------------------------------------------------------------ */

  function getSeries(metricId, rangeMs) {
    var E = global.Engine;
    var out = [];
    if (!E) return out;
    var now = Date.now();
    var i, v;

    // A one-minute window is the live buffer at full 5 Hz; anything longer is
    // the persisted history, which stores one point per five seconds.
    if (rangeMs <= 60000 && typeof E.buffer === 'function') {
      var readings = [];
      try { readings = E.buffer(rangeMs) || []; } catch (e) { readings = []; }
      for (i = 0; i < readings.length; i += 1) {
        v = readings[i] && readings[i].values ? readings[i].values[metricId] : null;
        if (isNum(v)) out.push({ t: readings[i].t, v: v, zone: readings[i].zones ? readings[i].zones[metricId] : null });
      }
      return out;
    }
    if (typeof E.history === 'function') {
      var pts = [];
      try { pts = E.history({ sinceMs: now - rangeMs, untilMs: now, maxPoints: 900 }) || []; }
      catch (e) { pts = []; }
      for (i = 0; i < pts.length; i += 1) {
        v = pts[i][metricId];
        if (isNum(v)) out.push({ t: pts[i].t, v: v, zone: null });
      }
    }
    return out;
  }

  function zoneOf(metric, value) {
    if (!global.Metrics || typeof global.Metrics.zoneFor !== 'function') return null;
    var th = thresholdFor(metric);
    return global.Metrics.zoneFor(value, th.warn, th.crit, metric.invert);
  }

  /* ------------------------------------------------------------------
     Canvas
     ------------------------------------------------------------------ */

  function chartCanvas() {
    var el = byId('chartMain');
    if (!el) return null;
    if (el.tagName === 'CANVAS') return el;
    var inner = el.querySelector('canvas');
    if (!inner) {
      inner = DOC.createElement('canvas');
      inner.className = 'ms-chart__canvas';
      el.appendChild(inner);
    }
    return inner;
  }

  function cssVar(name, fallback) {
    try {
      var v = global.getComputedStyle(DOC.documentElement).getPropertyValue(name);
      v = v ? v.replace(/^\s+|\s+$/g, '') : '';
      return v || fallback;
    } catch (e) { return fallback; }
  }

  function chartColors() {
    return {
      text: cssVar('--ms-text-3', '#5a6472'),
      grid: cssVar('--ms-border', '#d8dee8'),
      accent: cssVar('--ms-accent', '#2f6df6'),
      good: cssVar('--ms-good', '#1e7a45'),
      warn: cssVar('--ms-warn', '#9a6100'),
      crit: cssVar('--ms-crit', '#b3261e'),
      surface: cssVar('--ms-surface', '#ffffff')
    };
  }

  function zoneColor(zone) {
    if (zone === 'good') return 'var(--ms-good)';
    if (zone === 'warning') return 'var(--ms-warn)';
    if (zone === 'critical') return 'var(--ms-crit)';
    return 'var(--ms-neutral)';
  }

  function drawCharts(opts) {
    if (opts && opts.metricId) chartMetricId = opts.metricId;
    if (opts && opts.rangeMs) chartRangeMs = opts.rangeMs;

    var canvas = chartCanvas();
    if (!canvas) return;
    var metric = global.Metrics ? global.Metrics.byId(chartMetricId) : null;
    if (!metric) return;

    var data = getSeries(metric.id, chartRangeMs);

    /* Exactly one empty state at a time. A fully drawn axis with two threshold
       rules and a legend, sitting directly above a second "Brak danych" panel,
       was 404px of the application saying nothing twice.
       This runs BEFORE the canvas is measured on purpose: un-hiding the box
       first is what lets clientWidth report a real number on the very draw
       where the first sample arrives. */
    var nothingToPlot = data.length === 0;
    applyChartVisibility(nothingToPlot);
    if (nothingToPlot) { drawLegend(metric, 0); chartDirty = false; return; }

    var cssW = canvas.clientWidth;
    var cssH = canvas.clientHeight;
    // The v1 bug, fixed in one place: a canvas inside a hidden panel measures
    // zero. Remember that the drawing is owed and repeat it after the reveal.
    if (!cssW || !cssH) { chartDirty = true; return; }
    chartDirty = false;

    var dpr = Math.min(global.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
    }
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    var colors = chartColors();
    var scale = Number(getSetting('textScale')) || 1;
    var fontSmall = Math.round(12 * scale);
    var padL = Math.round(46 * scale);
    var padR = 12;
    var padT = 12;
    var padB = Math.round(24 * scale);
    var plotW = Math.max(10, cssW - padL - padR);
    var plotH = Math.max(10, cssH - padT - padB);

    var rangeLabel = t(rangeByMs(chartRangeMs).labelKey);

    var lo = metric.min, hi = metric.max;
    var now = Date.now();
    var tEnd = now;
    var tStart = now - chartRangeMs;
    if (data.length) {
      tStart = Math.min(tStart, data[0].t);
      tEnd = Math.max(tEnd, data[data.length - 1].t);
    }

    function yFor(v) { return padT + (1 - (clamp(v, lo, hi) - lo) / (hi - lo)) * plotH; }
    function xFor(t) { return padL + ((t - tStart) / Math.max(1, tEnd - tStart)) * plotW; }

    ctx.font = '600 ' + fontSmall + 'px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
    ctx.textBaseline = 'middle';

    /* grid + value labels */
    ctx.strokeStyle = colors.grid;
    ctx.fillStyle = colors.text;
    ctx.lineWidth = 1;
    var steps = 4;
    for (var i = 0; i <= steps; i += 1) {
      var value = lo + ((hi - lo) * i) / steps;
      var y = Math.round(yFor(value)) + 0.5;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(padL + plotW, y);
      ctx.stroke();
      ctx.textAlign = 'right';
      ctx.fillText(formatMetric(metric.id, value), padL - 6, y);
    }

    /* threshold lines — dashed, so they never read as data */
    var th = thresholdFor(metric);
    ctx.setLineDash([5, 4]);
    ctx.lineWidth = 1.5;
    var pairs = [[th.warn, colors.warn], [th.crit, colors.crit]];
    for (var p = 0; p < pairs.length; p += 1) {
      var tv = pairs[p][0];
      if (!isNum(tv) || tv < lo || tv > hi) continue;
      ctx.strokeStyle = pairs[p][1];
      var ty = Math.round(yFor(tv)) + 0.5;
      ctx.beginPath();
      ctx.moveTo(padL, ty);
      ctx.lineTo(padL + plotW, ty);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    /* time axis */
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'left';
    ctx.fillText(formatShortTime(tStart), padL, cssH - padB / 2);
    ctx.textAlign = 'right';
    ctx.fillText(t('chart.now'), padL + plotW, cssH - padB / 2);

    if (!data.length) {
      canvas.setAttribute('aria-label',
        t('chart.ariaEmpty', { name: metricName(metric), range: rangeLabel }));
      drawLegend(metric, 0);
      return;
    }

    /* the series */
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 2.2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    for (var d = 0; d < data.length; d += 1) {
      var px = xFor(data[d].t);
      var py = yFor(data[d].v);
      if (d === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    /* the last point, coloured by its zone: the only place colour carries
       meaning here, and the tile beside it repeats the same word in text */
    var last = data[data.length - 1];
    var lastZone = last.zone || zoneOf(metric, last.v);
    ctx.fillStyle = lastZone === 'critical' ? colors.crit
      : (lastZone === 'warning' ? colors.warn : (lastZone === 'good' ? colors.good : colors.accent));
    ctx.beginPath();
    ctx.arc(xFor(last.t), yFor(last.v), 4.5, 0, Math.PI * 2);
    ctx.fill();

    /* Dwa całe zdania zamiast jednego z doklejanym ogonkiem: „strefa: …”
       nie w każdym języku daje się dopiąć na końcu. */
    var ariaParams = {
      name: metricName(metric),
      range: rangeLabel,
      count: readings(data.length),
      value: formatMetric(metric.id, last.v),
      unit: metricUnit(metric),
      zone: zoneSpoken(lastZone)
    };
    canvas.setAttribute('aria-label', t(lastZone ? 'chart.ariaZone' : 'chart.aria', ariaParams));

    drawLegend(metric, data.length);
  }

  function drawChartMessage(ctx, w, h, colors, text) {
    ctx.save();
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, w / 2, h / 2);
    ctx.restore();
  }

  function drawLegend(metric, n) {
    var sub = byId('chartCountSub');
    if (sub) {
      /* Cała fraza odmienia się razem z liczebnikiem — dlatego formy CLDR
         obejmują też „w wybranym zakresie”, a nie sam rzeczownik. */
      setText(sub, n > 0 ? count('chart.countSub', n) : t('history.pickHint'));
    }
    var legend = byId('chartLegend');
    if (!legend) return;
    legend.innerHTML = '';
    legend.appendChild(legendItem(cssVar('--ms-accent', '#2f6df6'),
      t('metric.withUnit', { name: metricName(metric), unit: metricUnit(metric) })));
    legend.appendChild(legendItem(cssVar('--ms-warn', '#9a6100'), t('threshold.warnLabel')));
    legend.appendChild(legendItem(cssVar('--ms-crit', '#b3261e'), t('threshold.critLabel')));
  }

  function legendItem(color, text) {
    var item = make('span', 'ms-legend__item');
    var swatch = make('span', 'ms-legend__swatch');
    swatch.style.background = color;
    item.appendChild(swatch);
    item.appendChild(make('span', null, text));
    return item;
  }

  /* ------------------------------------------------------------------
     Table
     ------------------------------------------------------------------ */

  function buildTableHead() {
    var table = byId('readingsTable');
    if (!table) return;
    var thead = table.querySelector('thead');
    if (!thead) { thead = make('thead', null); table.insertBefore(thead, table.querySelector('tbody')); }
    thead.innerHTML = '';
    var tr = make('tr', null);
    var th = make('th', null, t('table.time'));
    th.setAttribute('scope', 'col');
    tr.appendChild(th);

    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      var m = list[i];
      var cell = make('th', null);
      cell.setAttribute('scope', 'col');
      cell.id = 'tableCol-' + m.id;
      cell.appendChild(make('span', null, metricName(m)));
      tr.appendChild(cell);
    }
    thead.appendChild(tr);
  }

  function recentRows(limit) {
    var E = global.Engine;
    var rows = [];
    if (!E) return rows;
    var i, j;
    var list = catalogue();

    var readings = [];
    if (typeof E.buffer === 'function') {
      try { readings = E.buffer(60000) || []; } catch (e) { readings = []; }
    }
    if (readings.length) {
      for (i = readings.length - 1; i >= 0 && rows.length < limit; i -= 1) {
        rows.push({ t: readings[i].t, values: readings[i].values || {}, zones: readings[i].zones || {} });
      }
      return rows;
    }
    if (typeof E.history === 'function') {
      var pts = [];
      try { pts = E.history({ sinceMs: Date.now() - 30 * DAY_MS, maxPoints: limit }) || []; }
      catch (e) { pts = []; }
      for (i = pts.length - 1; i >= 0 && rows.length < limit; i -= 1) {
        var values = {}, zones = {};
        for (j = 0; j < list.length; j += 1) {
          var v = pts[i][list[j].id];
          values[list[j].id] = v;
          zones[list[j].id] = isNum(v) ? zoneOf(list[j], v) : null;
        }
        rows.push({ t: pts[i].t, values: values, zones: zones });
      }
    }
    return rows;
  }

  function drawTable(limit) {
    var body = byId('readingsBody');
    if (!body) return;
    var lim = limit || 60;
    var list = catalogue();
    var rows = recentRows(lim);
    body.innerHTML = '';

    if (!rows.length) {
      var emptyRow = make('tr', null);
      var td = make('td', null, t('history.tableEmpty'));
      td.setAttribute('colspan', String(list.length + 1));
      emptyRow.appendChild(td);
      body.appendChild(emptyRow);
      return;
    }

    for (var i = 0; i < rows.length; i += 1) {
      var row = rows[i];
      var tr = make('tr', null);
      var th = make('th', null, formatTime(row.t));
      th.setAttribute('scope', 'row');
      tr.appendChild(th);

      for (var j = 0; j < list.length; j += 1) {
        var metric = list[j];
        var cell = make('td', null);
        var value = row.values[metric.id];
        cell.textContent = formatMetric(metric.id, value);
        var zone = row.zones[metric.id];
        if (zone) cell.setAttribute('data-zone', zone);
        tr.appendChild(cell);
      }
      body.appendChild(tr);
    }
  }

  /* ==================================================================
     19. Tools screen — container only
     ==================================================================
     tools.js owns every row inside #toolsList. The shell creates the empty
     list so P4 has a place to mount and never has to touch the panel itself.
     ------------------------------------------------------------------ */

  function buildToolsScreen() {
    var panel = byId('panelTools');
    if (!panel || byId('toolsList')) return;

    var section = make('section', 'ms-section');
    var head = make('div', 'ms-section__head');
    head.appendChild(make('h2', 'ms-section__title', t('nav.tools')));
    head.appendChild(make('p', 'ms-section__sub', t('tools.sub')));
    section.appendChild(head);

    var list = make('div', 'ms-list');
    list.id = 'toolsList';
    section.appendChild(list);

    var note = make('div', 'ms-note ms-note--info');
    note.appendChild(icon('info'));
    note.appendChild(make('div', 'ms-note__text', t('tools.note')));
    section.appendChild(note);

    panel.appendChild(section);
  }

  /* ==================================================================
     20. More screen — appearance and accessibility (owned by the shell)
     ==================================================================
     Everything on this screen belongs to the shell. Other modules may still
     mount a card into #panelMore; it lands at the end of the screen.
     ------------------------------------------------------------------ */

  function buildMoreScreen() {
    var panel = byId('panelMore');
    if (!panel || byId('themeSelect')) return;

    var section = make('section', 'ms-section');

    var navHead = make('div', 'ms-section__head');
    navHead.appendChild(make('h2', 'ms-section__title', t('more.settingsTitle')));
    section.appendChild(navHead);

    var list = make('div', 'ms-list');
    list.appendChild(listRowButton('btnOpenThresholds', 'tune', t('panel.thresholds'),
      t('more.thresholdsSub'), function () { openOrExplain('panelThresholds'); }));
    list.appendChild(listRowButton('btnOpenDocs', 'doc', t('panel.docs'),
      t('more.docsSub'), function () { openOrExplain('panelDocs'); }));
    section.appendChild(list);

    var lookHead = make('div', 'ms-section__head');
    lookHead.appendChild(make('h2', 'ms-section__title', t('more.appearanceTitle')));
    section.appendChild(lookHead);

    var card = make('div', 'ms-card');

    /* Wybór języka stoi PRZED motywem i rozmiarem tekstu, bo jest od nich
       ogólniejszy: reszta tej karty jest już napisana w wybranym języku. */
    card.appendChild(languageField());

    card.appendChild(selectField('themeSelect', t('settings.theme'), [
      { value: 'auto', label: t('theme.auto') },
      { value: 'light', label: t('theme.light') },
      { value: 'dark', label: t('theme.dark') }
    ], String(getSetting('theme'))));

    card.appendChild(selectField('textScaleSelect', t('settings.textScale'), [
      { value: '1', label: t('textScale.100') },
      { value: '1.15', label: t('textScale.115') },
      { value: '1.3', label: t('textScale.130') }
    ], String(getSetting('textScale'))));

    card.appendChild(switchRow('contrastToggle', t('settings.contrast'),
      t('settings.contrastSub'), !!getSetting('contrast')));
    card.appendChild(switchRow('soundToggle', t('settings.sound'),
      t('settings.soundSub'), !!getSetting('sound')));
    card.appendChild(switchRow('vibrateToggle', t('settings.vibrate'),
      t('settings.vibrateSub'), !!getSetting('vibrate')));

    section.appendChild(card);

    /* --- data ---
       Wired here because this screen belongs to the shell; the control only
       calls the module that owns the data and never touches its storage key. */
    var dataHead = make('div', 'ms-section__head');
    dataHead.appendChild(make('h2', 'ms-section__title', t('more.dataTitle')));
    section.appendChild(dataHead);

    var dataCard = make('div', 'ms-card');

    var dataList = make('div', 'ms-list');

    var clearRow = make('button', 'ms-list__item ms-list__item--button ms-list__item--danger');
    clearRow.id = 'btnClearHistory';
    clearRow.type = 'button';
    var clearIcon = make('span', 'ms-list__icon');
    clearIcon.appendChild(icon('trash'));
    clearRow.appendChild(clearIcon);
    var clearText = make('span', 'ms-list__text');
    clearText.appendChild(make('span', 'ms-list__title', t('more.clearHistory')));
    clearText.appendChild(make('span', 'ms-list__sub', t('more.clearHistorySub')));
    clearRow.appendChild(clearText);
    dataList.appendChild(clearRow);

    dataCard.appendChild(dataList);
    section.appendChild(dataCard);

    /* The one permitted second mention of the donation screen in the whole
       application: a single line of text at the very bottom of the settings,
       no graphic, no frame, no badge. Everything else about it lives on the
       Wsparcie tab, where the user goes of their own accord. */
    var supportLine = make('p', 'ms-t-cap ms-t-muted');
    supportLine.id = 'moreSupportLine';
    supportLine.appendChild(DOC.createTextNode(t('more.freeLine')));
    var supportLink = make('button', 'ms-linkbtn', t('more.supportLink'));
    supportLink.id = 'btnOpenSupport';
    supportLink.type = 'button';
    supportLink.addEventListener('click', function () { showTab('support'); });
    supportLine.appendChild(supportLink);
    section.appendChild(supportLine);

    var version = make('p', 'ms-t-cap ms-t-muted', t('app.version', { app: appName() }));
    version.id = 'appVersion';
    section.appendChild(version);

    panel.appendChild(section);
    wireAppearanceControls();
    wireDataControls();
  }

  function listRowButton(id, iconName, title, sub, handler) {
    var btn = make('button', 'ms-list__item ms-list__item--button');
    btn.id = id;
    btn.type = 'button';
    var iconBox = make('span', 'ms-list__icon ms-list__icon--accent');
    iconBox.appendChild(icon(iconName));
    btn.appendChild(iconBox);
    var text = make('span', 'ms-list__text');
    text.appendChild(make('span', 'ms-list__title', title));
    if (sub) text.appendChild(make('span', 'ms-list__sub', sub));
    btn.appendChild(text);
    var end = make('span', 'ms-list__end');
    end.appendChild(icon('chevron'));
    btn.appendChild(end);
    btn.addEventListener('click', handler);
    return btn;
  }

  function selectField(id, labelText, options, selectedValue) {
    var field = make('div', 'ms-field');
    var label = make('label', 'ms-field__label', labelText);
    label.setAttribute('for', id);
    field.appendChild(label);
    var wrap = make('div', 'ms-selectwrap');
    var select = make('select', 'ms-select');
    select.id = id;
    for (var i = 0; i < options.length; i += 1) {
      var opt = DOC.createElement('option');
      opt.value = options[i].value;
      opt.textContent = options[i].label;
      if (options[i].value === selectedValue) opt.selected = true;
      select.appendChild(opt);
    }
    wrap.appendChild(select);
    field.appendChild(wrap);
    return field;
  }

  /* ------------------------------------------------------------------
     Wybór języka
     ------------------------------------------------------------------
     Lista nazw WŁASNYCH (endonimów) — „Deutsch”, a nie „Niemiecki”: czyta ją
     ten, kto szuka swojego języka, a nie ten, kto rozumie obecny. Pierwsza
     pozycja oddaje wybór urządzeniu i to ona jest stanem domyślnym; kasuje
     zapisany wybór, zamiast zapisywać kod wykryty dziś.
     ------------------------------------------------------------------ */

  function languageOptions() {
    var I = global.I18n;
    var out = [{ value: 'auto', label: t('language.auto') }];
    var langs = (I && I.LANGUAGES) ? I.LANGUAGES : [];
    for (var i = 0; i < langs.length; i += 1) {
      out.push({ value: langs[i].code, label: langs[i].endonym });
    }
    return out;
  }

  function currentLanguageValue() {
    var I = global.I18n;
    if (!I || typeof I.language !== 'function') return 'auto';
    return I.isAuto && I.isAuto() ? 'auto' : I.language();
  }

  function languageField() {
    var field = selectField('languageSelect', t('language.label'),
      languageOptions(), currentLanguageValue());
    field.appendChild(make('p', 'ms-help', t('language.help')));
    return field;
  }

  /* DOM order is required by the stylesheet's sibling selectors:
     input, then track (with the thumb inside), then the text block. */
  function switchRow(id, title, sub, checked) {
    var label = make('label', 'ms-switch');
    label.setAttribute('for', id);
    var input = DOC.createElement('input');
    input.type = 'checkbox';
    input.className = 'ms-switch__input';
    input.id = id;
    input.checked = !!checked;
    label.appendChild(input);
    var track = make('span', 'ms-switch__track');
    track.appendChild(make('span', 'ms-switch__thumb'));
    label.appendChild(track);
    var text = make('span', 'ms-switch__text');
    text.appendChild(make('span', 'ms-switch__label', title));
    if (sub) text.appendChild(make('span', 'ms-switch__sub', sub));
    label.appendChild(text);
    return label;
  }

  /* The one destructive control of the More screen. It asks the module that
     owns the data to do the work — the shell never deletes another module's
     data itself — and the irreversible step is confirmed first. */
  function wireDataControls() {
    bindOnce('btnClearHistory', 'click', function () {
      var E = global.Engine;
      if (!E || typeof E.clearHistory !== 'function') return;
      var n = typeof E.historyCount === 'function' ? E.historyCount() : 0;
      confirmDialog({
        titlePL: t('dialog.clearHistory.title'),
        /* Całe zdanie odmienia się z liczebnikiem, więc formy CLDR obejmują je
           w całości — nie da się odmienić samego rzeczownika i doklejać reszty. */
        bodyPL: count('dialog.clearHistory.body', n),
        confirmPL: t('dialog.clearHistory.confirm'),
        cancelPL: t('dialog.clearHistory.cancel'),
        danger: true
      }).then(function (yes) {
        if (!yes) return;
        E.clearHistory();
        toast(t('toast.historyCleared'), { kind: 'info' });
      });
    });
  }

  function wireAppearanceControls() {
    /* 'auto' kasuje zapisany wybór (setLanguage(null)), a nie zapisuje kodu
       wykrytego w tej chwili: telefon może zmienić język jutro i wybór „jak
       w urządzeniu” ma za nim pójść. */
    bindOnce('languageSelect', 'change', function (ev) {
      var I = global.I18n;
      if (!I || typeof I.setLanguage !== 'function') return;
      var value = ev.target.value;
      I.setLanguage(value === 'auto' ? null : value);
    });
    bindOnce('themeSelect', 'change', function (ev) { setTheme(ev.target.value); });
    bindOnce('textScaleSelect', 'change', function (ev) { setTextScale(Number(ev.target.value)); });
    bindOnce('contrastToggle', 'change', function (ev) {
      setSetting('contrast', !!ev.target.checked);
      applyContrast();
      scheduleRedraw();
    });
    bindOnce('soundToggle', 'change', function (ev) { setSetting('sound', !!ev.target.checked); });
    bindOnce('vibrateToggle', 'change', function (ev) { setSetting('vibrate', !!ev.target.checked); });
  }

  function syncAppearanceControls() {
    var lang = byId('languageSelect');
    if (lang) lang.value = currentLanguageValue();
    var theme = byId('themeSelect');
    if (theme) theme.value = String(getSetting('theme'));
    var scale = byId('textScaleSelect');
    if (scale) scale.value = String(getSetting('textScale'));
    var contrast = byId('contrastToggle');
    if (contrast) contrast.checked = !!getSetting('contrast');
  }

  /* ==================================================================
     21. Documentation screen
     ==================================================================
     The place where the app says out loud what it cannot do. Written from the
     catalogue, so a new metric documents itself.
     ------------------------------------------------------------------ */

  function buildDocsScreen() {
    var panel = byId('panelDocs');
    if (!panel || byId('docsBody')) return;

    var section = make('section', 'ms-section');
    section.id = 'docsBody';

    var lead = make('div', 'ms-card ms-card--hero');
    lead.appendChild(make('h3', 'ms-card__title', t('docs.leadTitle')));
    lead.appendChild(make('p', 'ms-card__sub', t('docs.leadText')));
    section.appendChild(lead);

    /* Częstotliwość próbkowania i granica wykrywania migotania są liczbami
       silnika, nie treścią: bierzemy je stąd, gdzie są ustalone, i wstawiamy
       w zdanie — inaczej trzydzieści tłumaczeń miałoby wpisane „5 Hz” na
       sztywno i pierwsza zmiana w engine.js zrobiłaby z nich nieprawdę. */
    var E = global.Engine;
    var rate = (E && typeof E.sampleHz === 'function') ? E.sampleHz() : 5;

    var warn = make('div', 'ms-note ms-note--warning');
    warn.appendChild(icon('warning'));
    var warnText = make('div', 'ms-note__text');
    warnText.appendChild(make('span', 'ms-note__title', t('docs.limitsTitle')));
    warnText.appendChild(make('span', null,
      t('docs.limitsText', { rate: rate, limit: rate / 2 }) + ' ' +
      t('legal.noDiagnosis') + ' ' +
      t('legal.mdr', { app: appName() })));
    warn.appendChild(warnText);
    section.appendChild(warn);

    var howHead = make('div', 'ms-section__head');
    howHead.appendChild(make('h3', 'ms-section__title', t('note.howToTitle')));
    section.appendChild(howHead);

    /* Trzy pierwsze kroki są wspólne dla wszystkich wersji i leżą w warstwie
       wspólnej; czwarty należy tylko do tej wersji. */
    var steps = make('div', 'ms-list');
    steps.appendChild(docRow(1, t('note.howTo.hold.title'), t('note.howTo.hold.text')));
    steps.appendChild(docRow(2, t('note.howTo.aim.title'), t('note.howTo.aim.text')));
    steps.appendChild(docRow(3, t('note.howTo.compare.title'), t('note.howTo.compare.text')));
    steps.appendChild(docRow(4, t('note.howTo.repeat.title'), t('note.howTo.repeat.text')));
    section.appendChild(steps);

    var metricsHead = make('div', 'ms-section__head');
    metricsHead.appendChild(make('h3', 'ms-section__title', t('metrics.sevenTitle')));
    section.appendChild(metricsHead);

    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      var m = list[i];
      var card = make('div', 'ms-card ms-card--flat');
      var head = make('div', 'ms-card__head');
      head.appendChild(make('h4', 'ms-card__title', metricName(m)));
      card.appendChild(head);
      card.appendChild(make('p', 'ms-card__sub', metricShort(m)));
      card.appendChild(make('p', 'ms-t-body', metricHelp(m)));
      var kv = make('dl', 'ms-kv');
      kv.appendChild(kvRow(t('help.unit'), metricUnit(m)));
      kv.appendChild(kvRow(t('docs.scale'), t('range.dash', {
        min: formatMetric(m.id, m.min), max: formatMetric(m.id, m.max)
      })));
      kv.appendChild(kvRow(t('docs.direction'),
        t(m.invert ? 'docs.directionHigher' : 'docs.directionLower')));
      card.appendChild(kv);
      section.appendChild(card);
    }

    var privacy = make('div', 'ms-note ms-note--info');
    privacy.appendChild(icon('info'));
    var privacyText = make('div', 'ms-note__text');
    privacyText.appendChild(make('span', 'ms-note__title', t('docs.privacyTitle')));
    privacyText.appendChild(make('span', null, t('docs.privacyText')));
    privacy.appendChild(privacyText);
    section.appendChild(privacy);

    /* Stwierdzenie faktu, nie prośba: bez ramki, bez ikony kubka i bez odsyłania
       do zakładki Wsparcie. Cała aplikacja prosi o wsparcie w jednym miejscu —
       na ekranie Wsparcie — plus jedno zdanie w „Więcej”, i na tym koniec. */
    var free = make('p', 'ms-t-cap ms-t-muted', t('docs.freeLine'));
    free.id = 'docsFreeLine';
    section.appendChild(free);

    panel.appendChild(section);
  }

  /* Numer kroku jest liczbą, nie napisem: w arabskim i hindi ma się zapisać
     cyframi tego pisma, tak samo jak każda inna liczba w tej aplikacji. */
  function docRow(number, title, sub) {
    var row = make('div', 'ms-list__item');
    var I = global.I18n;
    var label = (I && typeof I.number === 'function') ? I.number(number) : String(number);
    var iconBox = make('span', 'ms-list__icon ms-list__icon--accent', label);
    row.appendChild(iconBox);
    var text = make('span', 'ms-list__text');
    text.appendChild(make('span', 'ms-list__title', title));
    text.appendChild(make('span', 'ms-list__sub', sub));
    row.appendChild(text);
    return row;
  }

  /* ==================================================================
     22. Redraw orchestration
     ================================================================== */

  function redraw() {
    if (currentView.panelId === 'panelMeasure') {
      drawTiles(latestReading);
      drawOverlay();
    } else if (currentView.panelId === 'panelHistory') {
      drawCharts();
      drawTable();
    }
    updateMeasureStatus();
  }

  var scheduleRedrawRaw = throttle(function () { nextFrame(redraw); }, 120);
  function scheduleRedraw() { scheduleRedrawRaw(); }

  var historyRefresh = throttle(function () {
    if (currentView.panelId !== 'panelHistory') return;
    drawCharts();
    drawTable();
  }, 1000);

  function updateMeasureStatus() {
    var el = byId('measureStatus');
    if (!el) return;
    var E = global.Engine;
    var running = !!(E && typeof E.isRunning === 'function' && E.isRunning());
    // The indicator only makes sense away from the measurement screen, where
    // the camera preview already says the same thing far more clearly.
    el.hidden = !(running && currentView.panelId !== 'panelMeasure');
  }

  /* ==================================================================
     23. Engine wiring
     ================================================================== */

  var latestReading = null;

  function applyEngineState(state) {
    var running = state === 'running';
    var starting = state === 'starting';
    var start = byId('btnStart');
    var stop = byId('btnStop');
    var sw = byId('btnSwitchCamera');
    if (start) start.disabled = running || starting;
    if (stop) stop.disabled = !running;
    // Idle is a legal moment to choose a lens: Engine remembers the choice for
    // the next Start instead of opening a camera. Only the hand-over is locked.
    if (sw) sw.disabled = starting;
    var badge = byId('cameraLiveBadge');
    if (badge) badge.hidden = !running;
    var placeholder = byId('cameraPlaceholder');
    if (placeholder) placeholder.hidden = running;
    updateMeasureStatus();
  }

  function wireBus() {
    on('engine:state', function (data) { applyEngineState(data && data.state); });

    on('engine:started', function () {
      lastZones = {};
      applyEngineState('running');
      nextFrame(drawOverlay);
      announce(t('a11y.measureStarted'));
    });

    on('engine:sample', function (data) {
      latestReading = data && data.reading ? data.reading : null;
      if (currentView.panelId === 'panelMeasure') drawTiles(latestReading);
      else if (currentView.panelId === 'panelHistory') historyRefresh();
    });

    on('engine:stopped', function (data) {
      applyEngineState('idle');
      updateSessionSummary();
      var text = byId('cameraPlaceholderText');
      if (text) text.textContent = t('camera.stopped');
      var s = data && data.session ? data.session : null;
      announce(s
        ? t('a11y.measureStoppedSummary', {
            duration: formatDuration(s.durationMs), samples: samples(s.samples || 0)
          })
        : t('a11y.measureStopped'));
      historyRefresh();
    });

    on('engine:error', function (data) {
      applyEngineState('error');
      var text = byId('cameraPlaceholderText');
      /* Treść komunikatu daje silnik (../shared/engine.js) i on odpowiada za
         jej język; tutaj jest tylko zdanie na wypadek, gdyby jej nie podał. */
      var messagePL = (data && data.messagePL) || t('error.cameraStart');
      if (text) text.textContent = messagePL;
      toast(messagePL, { kind: 'error' });
    });

    on('engine:thresholds', function () {
      if (currentView.panelId === 'panelMeasure') drawTiles(latestReading);
      else if (currentView.panelId === 'panelHistory') { drawCharts(); drawTable(); }
    });

    on('engine:history', function () { historyRefresh(); });

    on('engine:calibration', function (data) {
      var notice = byId('calibrationNotice');
      if (!notice) return;
      var text = notice.querySelector('.ms-note__text') || notice;
      var cal = data && data.calibration;
      text.textContent = t(cal ? 'note.calibrated' : 'note.calibration');
    });

    on('tools:alert', function (data) {
      if (data && data.messagePL) announce(data.messagePL, true);
    });

    /* Rejestracja jest tutaj, a nie przy parsowaniu pliku, bo cała reszta
       nasłuchów powłoki też jest tutaj — i bo zmiana języka może przyjść
       najwcześniej z ekranu „Więcej”, czyli długo po starcie. */
    on('i18n:changed', function () { rebuildForLanguage(); });
  }

  /* ==================================================================
     24. Global wiring
     ================================================================== */

  function wireHeader() {
    bindOnce('btnInfo', 'click', function () { showPanel('panelDocs'); });
    var skip = byId('skipLink');
    if (skip && skip.getAttribute('data-ms-bound') !== 'skip') {
      skip.setAttribute('data-ms-bound', 'skip');
      skip.addEventListener('click', function (ev) {
        var main = byId('appMain');
        if (!main) return;
        ev.preventDefault();
        main.focus();
      });
    }
  }

  function wireGlobalEvents() {
    global.addEventListener('popstate', onPopState);
    DOC.addEventListener('keydown', onDocumentKeydown);

    var onScroll = throttle(function () {
      var header = byId('appHeader');
      if (!header) return;
      var y = global.pageYOffset || DOC.documentElement.scrollTop || 0;
      if (y > 4) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    }, 100);
    global.addEventListener('scroll', onScroll, true);

    var onResize = throttle(function () {
      emit('ui:resize', {
        width: global.innerWidth || DOC.documentElement.clientWidth,
        height: global.innerHeight || DOC.documentElement.clientHeight
      });
      redraw();
    }, 100);
    global.addEventListener('resize', onResize);
    global.addEventListener('orientationchange', onResize);

    // A chart that could not be drawn (hidden panel, zero width) owes a draw.
    // Repaying that debt on the next visibility change is what keeps the
    // history screen from ever showing an empty box after a tab switch.
    DOC.addEventListener('visibilitychange', function () {
      if (!DOC.hidden && chartDirty) scheduleRedraw();
    });
  }

  function deepLinkPanel() {
    try {
      var match = /[?&]ekran=([A-Za-z]+)/.exec(global.location.search || '');
      if (!match) return null;
      var id = match[1];
      return panels[id] ? id : null;
    } catch (e) { return null; }
  }

  /* ==================================================================
     24a. Zmiana języka
     ==================================================================
     Ekrany tej wersji budują się raz i trzymają gotowe napisy w węzłach DOM,
     więc jedynym uczciwym sposobem przetłumaczenia ich jest zbudowanie ich od
     nowa. Przeładowanie strony byłoby prostsze, ale zabijałoby trwający pomiar
     razem z sesją, której użytkownik nie prosił o skasowanie.

     Dwa węzły przeżywają przebudowę nietknięte:
       #cameraStage  — bo engine.js trzyma na nim strumień (patrz cameraStage());
       arkusze       — bo mogą być właśnie otwarte, a ich napisy da się podmienić
                       na miejscu.

     Na koniec idzie 'ui:relocalized'. To NIE jest to samo co 'i18n:changed':
     tamto zdarzenie mówi „język się zmienił”, to mówi „powłoka jest już
     przebudowana, można wstawiać swoje ekrany”. Bez tego rozróżnienia
     tools.js i support.js — zapisane na szynie WCZEŚNIEJ niż ten plik —
     odbudowałyby swoje ekrany tuż przed tym, jak powłoka je wyczyści.
     ------------------------------------------------------------------ */

  function clearPanel(panelId) {
    var el = byId(panelId);
    if (!el) return;
    while (el.firstChild) el.removeChild(el.firstChild);
  }

  function relocalizeSheets() {
    setText(byId('dialogTitle'), t('dialog.title'));
    setText(byId('dialogCancel'), t('dialog.cancel'));
    setText(byId('dialogConfirm'), t('dialog.confirm'));
    setText(byId('helpTitle'), t('help.sheetTitle'));
    setText(byId('helpClose'), t('action.close'));
  }

  /* Napisy, które przyszły gotowe z index.html. Powłoka buduje je sama tylko
     wtedy, gdy ich w markupie nie ma, więc tu je bezwarunkowo nadpisujemy. */
  function applyStaticText() {
    try { DOC.title = t('app.documentTitle'); } catch (e) { /* ignore */ }
    var desc = DOC.querySelector ? DOC.querySelector('meta[name="description"]') : null;
    if (desc) desc.setAttribute('content', t('app.description'));

    setText(byId('skipLink'), t('app.skipToContent'));

    var status = byId('measureStatus');
    if (status) setText(status.querySelector('span:last-child'), t('app.measuring'));

    var info = byId('btnInfo');
    if (info) info.setAttribute('aria-label', t('app.docsButton'));

    var nav = byId('navBar');
    if (nav) {
      nav.setAttribute('aria-label', t('nav.aria'));
      var navList = nav.querySelector('.ms-nav__list');
      if (navList) navList.setAttribute('aria-label', t('nav.tablistAria'));
    }
    for (var i = 0; i < TABS.length; i += 1) {
      var btn = byId(TABS[i].navId);
      if (btn) setText(btn.querySelector('.ms-nav__label'), t(TABS[i].labelKey));
    }

    updateHeaderForView();
  }

  function rebuildForLanguage() {
    var stage = byId('cameraStage');
    if (stage && stage.parentNode) {
      stage.parentNode.removeChild(stage);
      keptStage = stage;
    }
    var firstRunWasOpen = !!(byId('firstRunNote') && !byId('firstRunNote').hidden);

    /* #panelSupport nie jest tu czyszczony: ten ekran należy do support.js
       i to on go opróżnia, kiedy buduje go od nowa. */
    clearPanel('panelMeasure');
    clearPanel('panelHistory');
    clearPanel('panelTools');
    clearPanel('panelMore');
    clearPanel('panelDocs');
    builtMeasure = false;

    ensurePanels();          // odświeża nagłówki dziewięciu nakładek
    relocalizeSheets();
    buildMeasureScreen();
    buildHistoryScreen();
    buildToolsScreen();
    buildMoreScreen();
    buildDocsScreen();
    wireHeader();
    applyStaticText();
    syncAppearanceControls();

    if (firstRunWasOpen) showFirstRunNote();

    var E = global.Engine;
    applyEngineState(E && typeof E.state === 'function' ? E.state() : 'idle');
    drawTiles(latestReading);

    emit('ui:relocalized', {
      code: (global.I18n && typeof global.I18n.language === 'function') ? global.I18n.language() : null
    });

    redraw();
  }

  /* ==================================================================
     25. Boot
     ================================================================== */

  function init() {
    settings = loadSettings();
    applyTheme(true);
    applyTextScale(true);
    applyContrast();

    ensureShell();
    ensurePanels();
    buildMeasureScreen();
    buildHistoryScreen();
    buildToolsScreen();
    buildMoreScreen();
    buildDocsScreen();

    wireHeader();
    wireGlobalEvents();
    watchSystemTheme();
    applyStaticText();
    syncAppearanceControls();

    try {
      global.history.replaceState({ msNav: true, depth: 0 }, '', global.location.href);
    } catch (e) { /* nothing to do; navigation degrades to in-app buttons */ }

    showTab('measure');
    drawTiles(null);
  }

  function afterReady() {
    ready = true;
    wireBus();               // re-resolved here, so a later bus.js still gets us
    emit('app:ready', {});
    var deep = deepLinkPanel();
    if (deep && deep !== 'panelMeasure') {
      global.setTimeout(function () { showPanel(deep); }, 0);
    }
    scheduleRedraw();
  }

  function boot() {
    init();
    // The specification asks for one macrotask between DOMContentLoaded and
    // app:ready, so every module has finished registering before screens build.
    global.setTimeout(afterReady, 0);
  }

  if (DOC.readyState === 'loading') DOC.addEventListener('DOMContentLoaded', boot);
  else boot();

  /* ==================================================================
     26. Public API
     ================================================================== */

  var UI = {
    isReady: function () { return ready; },

    showTab: showTab,
    showPanel: showPanel,
    back: back,
    current: function () {
      return { kind: currentView.kind, id: currentView.id, panelId: currentView.panelId };
    },
    registerPanel: registerPanel,

    showFirstRunNote: showFirstRunNote,
    openSheet: openSheet,
    closeSheet: closeSheet,
    // Swap one sheet for another without a browser-history round trip.
    replaceSheet: replaceSheet,
    confirm: confirmDialog,
    alert: alertDialog,
    toast: toast,
    announce: announce,
    setBusy: setBusy,

    icon: icon,

    getTheme: function () { return getSetting('theme'); },
    setTheme: setTheme,
    getEffectiveTheme: effectiveTheme,
    getTextScale: function () { return Number(getSetting('textScale')) || 1; },
    setTextScale: setTextScale,
    getSetting: getSetting,
    setSetting: setSetting,

    formatDate: formatDate,
    formatTime: formatTime,
    formatDuration: formatDuration,
    /* Liczebnik pod kluczem słownika. Zastąpił UI.pluralPL/UI.countPL: tamte
       przyjmowały trzy polskie formy, a form jest tyle, ile kategorii CLDR
       w aktywnym języku. Wywołanie: UI.count('count.points', 12). */
    count: count,

    /* Mounting points for the tools and support modules. */
    panelBody: function (panelId) { return byId(panelId); },
    contentAnchor: function () { return null; },
    mount: function (panelId, node) {
      var panel = byId(panelId);
      if (!panel || !node) return false;
      panel.appendChild(node);
      return true;
    },
    slot: function (name) {
      var map = {
        tools: 'toolsList',
        measureStatus: 'measureStatus', calibrationNotice: 'calibrationNotice'
      };
      return byId(map[name] || '') || null;
    },
    openMetricHelp: function (metricId) {
      var m = global.Metrics ? global.Metrics.byId(metricId) : null;
      if (m) openHelpSheet(m);
      return !!m;
    }
  };

  /* The drawing half of the module. It is published both as UI.viz and as
     window.Viz, because the architecture names Viz as the owner of the tiles,
     the chart and the table; if a separate viz.js ever ships, it replaces this
     object and the shell keeps working unchanged. */
  var Viz = {
    buildTiles: buildTiles,
    drawTiles: drawTiles,
    drawCharts: drawCharts,
    drawTable: drawTable,
    drawOverlay: drawOverlay,
    redraw: redraw,
    setChartMetric: setChartMetric,
    setChartRange: setChartRange,
    chartState: function () { return { metricId: chartMetricId, rangeMs: chartRangeMs }; },
    zoneColor: zoneColor
  };

  UI.viz = Viz;
  global.UI = UI;
  global.Viz = Viz;

})(typeof window !== 'undefined' ? window : globalThis);
