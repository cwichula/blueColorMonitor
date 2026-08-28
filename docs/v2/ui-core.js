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
 * Interface strings are Polish; code comments are English. That split is a
 * project rule, not a preference.
 */
(function (global) {
  'use strict';

  var DOC = global.document;

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

  /* Polish plural, three forms. The exception nobody remembers is 12-14:
     "22 odczyty" but "12 odczytów". Every count shown to the user goes through
     this helper — there is no second place where a noun gets an ending. */
  function pluralPL(n, one, few, many) {
    var abs = Math.abs(Math.round(n));
    if (abs === 1) return one;
    var mod10 = abs % 10;
    var mod100 = abs % 100;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
    return many;
  }

  function countPL(n, one, few, many) {
    var v = Math.round(n);
    return v + ' ' + pluralPL(v, one, few, many);
  }

  function samplesPL(n) { return countPL(n, 'próbka', 'próbki', 'próbek'); }
  function readingsPL(n) { return countPL(n, 'odczyt', 'odczyty', 'odczytów'); }

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
    var t = getSetting('theme');
    if (t === 'light' || t === 'dark') return t;
    return systemPrefersDark() ? 'dark' : 'light';
  }

  function applyTheme(silent) {
    var t = getSetting('theme');
    var root = DOC.documentElement;
    if (t === 'light' || t === 'dark') root.setAttribute('data-theme', t);
    else root.removeAttribute('data-theme');
    if (!silent) emit('ui:themechange', { theme: t, effective: effectiveTheme() });
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
     4. Formatting helpers (pl-PL, written out rather than Intl-formatted so
        the output is identical in every browser and offline)
     ================================================================== */

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

  function formatDuration(ms) {
    var total = Math.max(0, Math.round((ms || 0) / 1000));
    var h = Math.floor(total / 3600);
    var m = Math.floor((total % 3600) / 60);
    var s = total % 60;
    if (h > 0) return h + ' godz. ' + pad2(m) + ' min';
    if (m > 0) return m + ' min ' + pad2(s) + ' s';
    return s + ' s';
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

  function srOnly(textPL) { return make('span', 'ms-visually-hidden', textPL); }

  /* ==================================================================
     6. Screen registry
     ================================================================== */

  var TABS = [
    { tabId: 'measure', panelId: 'panelMeasure', navId: 'navMeasure', labelPL: 'Pomiar', iconName: 'monitor' },
    { tabId: 'history', panelId: 'panelHistory', navId: 'navHistory', labelPL: 'Historia', iconName: 'history' },
    { tabId: 'tools', panelId: 'panelTools', navId: 'navTools', labelPL: 'Narzędzia', iconName: 'tune' },
    { tabId: 'support', panelId: 'panelSupport', navId: 'navSupport', labelPL: 'Wsparcie', iconName: 'cup' },
    { tabId: 'more', panelId: 'panelMore', navId: 'navMore', labelPL: 'Więcej', iconName: 'menu' }
  ];

  /* Overlay screens. Most belong to other modules; the shell creates the empty
     panel with its back button and title so navigation works even if a module
     is not loaded yet, and every module can find its container by id. */
  var OVERLAYS = [
    { panelId: 'panelDocs', titlePL: 'Dokumentacja' },
    { panelId: 'panelThresholds', titlePL: 'Progi i profile' },
    { panelId: 'panelReports', titlePL: 'Raporty' },
    { panelId: 'panelExport', titlePL: 'Eksport danych' },
    { panelId: 'panelCompare', titlePL: 'Porównywarka A/B' },
    { panelId: 'panelCalibration', titlePL: 'Kalibracja białą kartką' },
    { panelId: 'panelScreenCheck', titlePL: 'Sprawdź mój monitor' },
    { panelId: 'panelSchedule', titlePL: 'Harmonogram' },
    { panelId: 'panelAlerts', titlePL: 'Alerty ekspozycji' }
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
    var merged = {
      panelId: spec.panelId,
      tabId: spec.tabId || existing.tabId || null,
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
    return spec && spec.titlePL ? spec.titlePL : '';
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
      var t = pendingTabId;
      pendingTabId = null;
      showTab(t);
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
     closed the sheet that had just been opened — the purchase sheet flashed
     and dismissed itself. One entry in, one entry out, no navigation. */
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

    var title = panelTitle(panelId) || '';
    announce('Ekran: ' + title);

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
        ? (panelTitle(currentView.panelId) || 'Monitor Światła')
        : 'Monitor Światła';
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
    nav.setAttribute('aria-label', 'Główna nawigacja');

    var list = nav.querySelector('.ms-nav__list');
    if (!list) {
      list = make('div', 'ms-nav__list');
      nav.appendChild(list);
    }
    list.setAttribute('role', 'tablist');
    list.setAttribute('aria-label', 'Ekrany aplikacji');

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
      btn.appendChild(make('span', 'ms-nav__label', tab.labelPL));
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
      setText(byId('dialogTitle'), opts.titlePL || 'Potwierdzenie');
      setText(byId('dialogBody'), opts.bodyPL || '');

      var confirmBtn = byId('dialogConfirm');
      var cancelBtn = byId('dialogCancel');
      if (confirmBtn) {
        confirmBtn.className = 'ms-btn ' + (opts.danger ? 'ms-btn--danger' : 'ms-btn--filled');
        confirmBtn.textContent = opts.confirmPL || 'Potwierdzam';
      }
      if (cancelBtn) {
        cancelBtn.hidden = opts.cancelPL === false;
        cancelBtn.textContent = opts.cancelPL || 'Anuluj';
      }
      dialogResolver = resolve;
      openSheet('sheetDialog', { focusId: opts.danger ? 'dialogCancel' : 'dialogConfirm' });
    });
  }

  function alertDialog(o) {
    var opts = o || {};
    return confirmDialog({
      titlePL: opts.titlePL || 'Informacja',
      bodyPL: opts.bodyPL || '',
      confirmPL: opts.okPL || 'Rozumiem',
      cancelPL: false
    }).then(function () { return undefined; });
  }

  function openHelpSheet(metric) {
    if (!metric) return;
    setText(byId('helpTitle'), metric.namePL);
    var body = byId('helpBody');
    if (body) {
      body.innerHTML = '';
      body.appendChild(make('p', 'ms-t-body', metric.shortPL));
      body.appendChild(make('p', 'ms-t-body ms-t-muted', metric.helpPL));

      var kv = make('dl', 'ms-kv');
      kv.appendChild(kvRow('Jednostka', metric.unit));
      kv.appendChild(kvRow('Zakres skali', formatMetric(metric.id, metric.min) + ' – ' + formatMetric(metric.id, metric.max)));
      kv.appendChild(kvRow('Próg ostrzegawczy', formatMetric(metric.id, thresholdFor(metric).warn) + ' ' + metric.unit));
      kv.appendChild(kvRow('Próg krytyczny', formatMetric(metric.id, thresholdFor(metric).crit) + ' ' + metric.unit));
      body.appendChild(kv);

      var note = make('div', 'ms-note ms-note--info');
      note.appendChild(icon('info'));
      var noteText = make('div', 'ms-note__text');
      noteText.appendChild(make('span', 'ms-note__title', 'Czego ta liczba nie mówi'));
      noteText.appendChild(make('span', null,
        'Aparat telefonu ma trzy szerokie kanały i nie mierzy widma. Ta wartość jest ' +
        'wskaźnikiem porównawczym — dobrze pokazuje różnice między światłami i zmiany w czasie, ' +
        'a nie wynikiem pomiaru laboratoryjnego ani informacją medyczną.'));
      note.appendChild(noteText);
      body.appendChild(note);
    }
    openSheet('sheetHelp', { focusId: 'helpClose' });
  }

  function kvRow(keyPL, valuePL) {
    var row = make('div', 'ms-kv__row');
    row.appendChild(make('dt', 'ms-kv__key', keyPL));
    row.appendChild(make('dd', 'ms-kv__val', valuePL));
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
    var a = make('a', 'ms-skip', 'Przejdź do treści');
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

      var title = make('h1', 'ms-header__title', 'Monitor Światła');
      title.id = 'appTitle';
      inner.appendChild(title);

      var status = make('span', 'ms-status ms-status--good');
      status.id = 'measureStatus';
      status.hidden = true;
      status.appendChild(icon('play', 'sm'));
      status.appendChild(make('span', null, 'Pomiar trwa'));
      inner.appendChild(status);

      var actions = make('div', 'ms-header__actions');

      var infoBtn = make('button', 'ms-iconbtn');
      infoBtn.id = 'btnInfo';
      infoBtn.type = 'button';
      infoBtn.setAttribute('aria-label', 'Dokumentacja i wyjaśnienia');
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

  function sheetSkeleton(sheetId, titleId, titlePL) {
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
    var title = make('h2', 'ms-sheet__title', titlePL);
    title.id = titleId;
    titles.appendChild(title);
    head.appendChild(titles);
    sheet.appendChild(head);
    return sheet;
  }

  function ensureDialogSheet(layer) {
    if (byId('sheetDialog')) return;
    var sheet = sheetSkeleton('sheetDialog', 'dialogTitle', 'Potwierdzenie');

    var body = make('div', 'ms-sheet__body');
    var p = make('p', 'ms-t-body');
    p.id = 'dialogBody';
    body.appendChild(p);
    sheet.appendChild(body);

    var foot = make('div', 'ms-sheet__foot');
    var cancel = make('button', 'ms-btn ms-btn--text', 'Anuluj');
    cancel.id = 'dialogCancel';
    cancel.type = 'button';
    var confirm = make('button', 'ms-btn ms-btn--filled', 'Potwierdzam');
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
    var sheet = sheetSkeleton('sheetHelp', 'helpTitle', 'Opis metryki');
    var body = make('div', 'ms-sheet__body');
    body.id = 'helpBody';
    sheet.appendChild(body);
    var foot = make('div', 'ms-sheet__foot');
    var close = make('button', 'ms-btn ms-btn--tonal', 'Zamknij');
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
      registerPanel({ panelId: tab.panelId, tabId: tab.tabId, titlePL: tab.labelPL });
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
      registerPanel({ panelId: spec.panelId, titlePL: spec.titlePL });
    }
  }

  /* Every overlay gets the same header: back button on the left, title next to
     it. The convention panelXxx -> backXxx / titleXxx is a contract, so other
     modules can find both without asking. */
  function ensureOverlayHeader(el, spec) {
    var suffix = overlaySuffix(spec.panelId);
    var backId = 'back' + suffix;
    var titleId = 'title' + suffix;
    if (byId(backId)) return;

    var row = make('div', 'ms-row ms-panel-head');
    var backBtn = make('button', 'ms-iconbtn');
    backBtn.id = backId;
    backBtn.type = 'button';
    backBtn.setAttribute('aria-label', 'Wróć');
    // The chevron glyph points right; a back button must point left.
    var chev = icon('chevron');
    chev.style.transform = 'rotate(180deg)';
    backBtn.appendChild(chev);
    backBtn.addEventListener('click', function () { back(); });

    var title = make('h2', 'ms-section__title', spec.titlePL);
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
    firstRunText.appendChild(make('span', 'ms-note__title', 'Jak zmierzyć'));
    firstRunText.appendChild(make('span', null,
      'Naciśnij „Start”, skieruj telefon na oświetloną powierzchnię i trzymaj go nieruchomo ' +
      'przez kilka sekund. Ramka na podglądzie pokazuje wycinek, który aplikacja naprawdę czyta.'));
    firstRun.appendChild(firstRunText);
    var firstRunClose = make('button', 'ms-btn ms-btn--icon');
    firstRunClose.id = 'firstRunNoteClose';
    firstRunClose.type = 'button';
    firstRunClose.setAttribute('aria-label', 'Zamknij podpowiedź');
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
    badge.appendChild(make('span', null, 'NA ŻYWO'));
    stage.appendChild(badge);

    var placeholder = make('div', 'ms-camera__placeholder');
    placeholder.id = 'cameraPlaceholder';
    placeholder.appendChild(icon('camera', 'xl'));
    var placeholderText = make('p', null,
      'Kamera jest wyłączona. Naciśnij „Start”, skieruj telefon na oświetloną powierzchnię ' +
      'i trzymaj go nieruchomo przez kilka sekund.');
    placeholderText.id = 'cameraPlaceholderText';
    placeholder.appendChild(placeholderText);
    stage.appendChild(placeholder);

    cameraCard.appendChild(stage);
    section.appendChild(cameraCard);

    /* --- controls: in the normal flow, above everything optional --- */
    var controls = make('div', 'ms-camera__controls');
    controls.id = 'measureControls';

    var startBtn = make('button', 'ms-btn ms-btn--filled ms-btn--lg');
    startBtn.id = 'btnStart';
    startBtn.type = 'button';
    startBtn.appendChild(icon('play'));
    startBtn.appendChild(make('span', 'ms-btn__label', 'Start'));

    var stopBtn = make('button', 'ms-btn ms-btn--tonal ms-btn--lg');
    stopBtn.id = 'btnStop';
    stopBtn.type = 'button';
    stopBtn.disabled = true;
    stopBtn.appendChild(icon('stop'));
    stopBtn.appendChild(make('span', 'ms-btn__label', 'Stop'));

    var switchBtn = make('button', 'ms-btn ms-btn--outline ms-btn--lg');
    switchBtn.id = 'btnSwitchCamera';
    switchBtn.type = 'button';
    switchBtn.setAttribute('aria-label', 'Przełącz kamerę: przednia lub tylna');
    switchBtn.appendChild(icon('flip'));
    switchBtn.appendChild(make('span', 'ms-btn__label ms-only-wide', 'Przełącz'));

    controls.appendChild(startBtn);
    controls.appendChild(stopBtn);
    controls.appendChild(switchBtn);
    section.appendChild(controls);

    /* --- tiles --- */
    var head = make('div', 'ms-section__head');
    head.appendChild(make('h2', 'ms-section__title', 'Siedem wskaźników'));
    head.appendChild(make('p', 'ms-section__sub', 'Odświeżane 5 razy na sekundę'));
    section.appendChild(head);

    var grid = make('div', 'ms-grid');
    grid.id = 'tileGrid';
    section.appendChild(grid);

    /* --- session summary --- */
    var summary = make('div', 'ms-card');
    summary.id = 'sessionSummary';
    var sumHead = make('div', 'ms-card__head');
    sumHead.appendChild(make('h3', 'ms-card__title', 'Ta sesja'));
    summary.appendChild(sumHead);
    var kv = make('dl', 'ms-kv');
    kv.appendChild(kvRowWithId('Czas pomiaru', 'sessionDuration', '—'));
    kv.appendChild(kvRowWithId('Liczba próbek', 'sessionSamples', '—'));
    kv.appendChild(kvRowWithId('W normie', 'sessionZoneGood', '—'));
    kv.appendChild(kvRowWithId('Ostrzeżenia', 'sessionZoneWarning', '—'));
    kv.appendChild(kvRowWithId('Krytyczne', 'sessionZoneCritical', '—'));
    summary.appendChild(kv);
    section.appendChild(summary);

    /* --- calibration notice (filled by tools.js when calibration exists) --- */
    var calib = make('div', 'ms-note ms-note--info');
    calib.id = 'calibrationNotice';
    calib.appendChild(icon('info'));
    var calibText = make('div', 'ms-note__text', 'Pomiar bez kalibracji — wartości traktuj porównawczo.');
    calib.appendChild(calibText);
    section.appendChild(calib);

    /* --- the app admits what it cannot do; this never gets hidden --- */
    var disclaimer = make('div', 'ms-note ms-note--warning');
    disclaimer.id = 'disclaimerMeasure';
    disclaimer.appendChild(icon('warning'));
    var disc = make('div', 'ms-note__text');
    disc.appendChild(make('span', 'ms-note__title', 'Czym ten pomiar nie jest'));
    disc.appendChild(make('span', null,
      'Aparat telefonu ma trzy szerokie kanały barwne i automatyczny balans bieli — nie mierzy widma. ' +
      'Temperatura barwowa i wpływ na rytm dobowy są przybliżeniami wyliczonymi z barw sRGB. ' +
      'Aplikacja dobrze pokazuje różnice i zmiany w czasie, nie zastępuje miernika i nie stawia żadnej diagnozy. ' +
      /* The sentence a health-category reviewer looks for, and the wording the
         EU MDR expects for ruling out a medical purpose. "Nie stawia diagnozy"
         is true but is not this statement. */
      'Monitor Światła nie jest wyrobem medycznym w rozumieniu rozporządzenia (UE) 2017/745, nie służy do diagnozowania, zapobiegania, monitorowania ani leczenia jakiegokolwiek stanu chorobowego i nie zastępuje badania u lekarza ani optometrysty.'));
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

  function kvRowWithId(keyPL, valueId, valuePL) {
    var row = make('div', 'ms-kv__row');
    row.appendChild(make('dt', 'ms-kv__key', keyPL));
    var dd = make('dd', 'ms-kv__val', valuePL);
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
      if (!E) { toast('Moduł pomiaru nie został wczytany.', { kind: 'error' }); return; }
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

  var ZONE_WORD = { good: 'W normie', warning: 'Ostrzeżenie', critical: 'Krytycznie' };
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

  function formatMetric(metricId, value) {
    if (global.Metrics && typeof global.Metrics.formatValue === 'function') {
      return global.Metrics.formatValue(metricId, value);
    }
    return isNum(value) ? String(Math.round(value)) : '—';
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
    var name = make('h3', 'ms-tile__name', metric.namePL);
    name.id = 'tileName-' + metric.id;
    head.appendChild(name);

    var help = make('button', 'ms-tile__info');
    help.id = 'tileHelp-' + metric.id;
    help.type = 'button';
    help.setAttribute('aria-label', 'Co oznacza: ' + metric.namePL);
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
    var unit = make('span', 'ms-gauge__unit', metric.unit);
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
    status.appendChild(make('span', null, 'Brak pomiaru'));
    tile.appendChild(status);

    var hint = make('p', 'ms-tile__hint', metric.shortPL);
    hint.id = 'tileHint-' + metric.id;
    tile.appendChild(hint);

    return tile;
  }

  function setZoneStatus(metricId, zone, wordPL) {
    var status = byId('tileZone-' + metricId);
    if (!status) return;
    var mark = status.querySelector('.ms-mark');
    var label = status.querySelector('span:last-child');
    if (zone) {
      if (mark) mark.setAttribute('data-zone', zone);
    } else if (mark) {
      mark.removeAttribute('data-zone');
    }
    if (label) label.textContent = wordPL;
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
        setZoneStatus(metric.id, null, reading ? 'Brak danych' : 'Brak pomiaru');
        continue;
      }

      setText(valueEl, formatMetric(metric.id, value));
      var pct = clamp(((value - metric.min) / (metric.max - metric.min)) * 100, 0, 100);
      if (gauge) {
        gauge.style.setProperty('--ms-gauge-pct', Math.round(pct * 10) / 10);
        if (zone) gauge.setAttribute('data-zone', zone); else gauge.removeAttribute('data-zone');
      }
      if (zone) tile.setAttribute('data-zone', zone); else tile.removeAttribute('data-zone');
      setZoneStatus(metric.id, zone, zone ? ZONE_WORD[zone] : 'Poza skalą');

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
          announce(metric.namePL + ': ' + ZONE_WORD[zone] + ', ' + formatMetric(metric.id, value) + ' ' + metric.unit);
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
    setText(byId('sessionSamples'), samplesPL(s.samples || 0));
    var z = s.zones || { good: 0, warning: 0, critical: 0 };
    setText(byId('sessionZoneGood'), samplesPL(z.good || 0));
    setText(byId('sessionZoneWarning'), samplesPL(z.warning || 0));
    setText(byId('sessionZoneCritical'), samplesPL(z.critical || 0));
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

  var RANGES = [
    { id: 'range1m', ms: 60000, labelPL: '1 min' },
    // No full stops: "1 godz." wrapped onto two lines in a five-way segment.
    { id: 'range1h', ms: HOUR_MS, labelPL: '1 godz' },
    { id: 'range24h', ms: 24 * HOUR_MS, labelPL: '24 godz' },
    { id: 'range7d', ms: 7 * DAY_MS, labelPL: '7 dni' },
    { id: 'range30d', ms: 30 * DAY_MS, labelPL: '30 dni' }
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
      head.appendChild(make('h2', 'ms-section__title', 'Przebieg w czasie'));
      // The reading count belongs here, not in the legend: a legend explains
      // what the ink means, and "0 odczytów" next to a grey swatch pretended
      // to be a fourth series.
      var headSub = make('p', 'ms-section__sub', 'Wybierz metrykę i zakres');
      headSub.id = 'chartCountSub';
      head.appendChild(headSub);
      section.appendChild(head);

      var controls = make('div', 'ms-card');

      var field = make('div', 'ms-field');
      var label = make('label', 'ms-field__label', 'Metryka');
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
      group.setAttribute('aria-label', 'Zakres czasu wykresu');
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
      empty.appendChild(make('p', 'ms-empty__title', 'Brak danych w tym zakresie'));
      empty.appendChild(make('p', 'ms-empty__text',
        'Uruchom pomiar na ekranie Pomiar — wykres zapełni się w kilka sekund.'));
      section.appendChild(empty);

      var actions = make('div', 'ms-row');
      var reportsBtn = make('button', 'ms-btn ms-btn--outline');
      reportsBtn.id = 'btnOpenReports';
      reportsBtn.type = 'button';
      reportsBtn.appendChild(icon('doc', 'sm'));
      reportsBtn.appendChild(make('span', 'ms-btn__label', 'Raporty'));
      reportsBtn.addEventListener('click', function () { openOrExplain('panelReports'); });
      var exportBtn = make('button', 'ms-btn ms-btn--outline');
      exportBtn.id = 'btnOpenExport';
      exportBtn.type = 'button';
      exportBtn.appendChild(icon('download', 'sm'));
      exportBtn.appendChild(make('span', 'ms-btn__label', 'Eksport CSV'));
      exportBtn.addEventListener('click', function () { openOrExplain('panelExport'); });
      actions.appendChild(reportsBtn);
      actions.appendChild(exportBtn);
      section.appendChild(actions);

      /* --- table --- */
      /* The toggle belongs beside the heading it controls. Centred on its own
         line it was the only bare text link in an application where every
         other action is a pill, and it read as a stray hyperlink. */
      var tableHead = make('div', 'ms-section__head');
      tableHead.appendChild(make('h2', 'ms-section__title', 'Ostatnie odczyty'));
      tableHead.appendChild(make('span', 'ms-spacer'));

      var toggle = make('button', 'ms-btn ms-btn--text');
      toggle.id = 'tableToggle';
      toggle.type = 'button';
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-controls', 'tableWrap');
      toggle.appendChild(make('span', 'ms-btn__label', 'Ukryj tabelę'));
      tableHead.appendChild(toggle);
      section.appendChild(tableHead);

      var tableWrap = make('div', 'ms-tablewrap');
      tableWrap.id = 'tableWrap';
      var table = make('table', 'ms-table');
      table.id = 'readingsTable';
      var caption = make('caption', 'ms-visually-hidden',
        'Ostatnie odczyty pomiaru, najnowszy na górze.');
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
      opt.textContent = m.namePL;
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
      btn.appendChild(make('span', null, r.labelPL));
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
      setText(btn.querySelector('.ms-btn__label'), open ? 'Ukryj tabelę' : 'Pokaż tabelę');
      setSetting('tableOpen', open);
      if (open) drawTable();
    });
    var wrapEl = byId('tableWrap');
    var toggleEl = byId('tableToggle');
    if (wrapEl && toggleEl) {
      var open = getSetting('tableOpen') !== false;
      wrapEl.hidden = !open;
      toggleEl.setAttribute('aria-expanded', open ? 'true' : 'false');
      setText(toggleEl.querySelector('.ms-btn__label'), open ? 'Ukryj tabelę' : 'Pokaż tabelę');
    }
  }

  function openOrExplain(panelId) {
    if (showPanel(panelId)) return;
    toast('Ten ekran nie jest jeszcze dostępny w tej wersji.', { kind: 'info' });
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

    var rangeLabel = rangeByMs(chartRangeMs).labelPL;

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
    ctx.fillText('teraz', padL + plotW, cssH - padB / 2);

    if (!data.length) {
      canvas.setAttribute('aria-label',
        metric.namePL + ' — brak danych w zakresie ' + rangeLabel + '.');
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

    canvas.setAttribute('aria-label',
      metric.namePL + ', zakres ' + rangeLabel + ', ' + readingsPL(data.length) +
      ', ostatnia wartość ' + formatMetric(metric.id, last.v) + ' ' + metric.unit +
      (lastZone ? ', strefa: ' + ZONE_WORD[lastZone].toLowerCase() : '') + '.');

    drawLegend(metric, data.length);
  }

  function drawChartMessage(ctx, w, h, colors, textPL) {
    ctx.save();
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(textPL, w / 2, h / 2);
    ctx.restore();
  }

  function drawLegend(metric, count) {
    var sub = byId('chartCountSub');
    if (sub) {
      setText(sub, count > 0
        ? (readingsPL(count) + ' w wybranym zakresie')
        : 'Wybierz metrykę i zakres');
    }
    var legend = byId('chartLegend');
    if (!legend) return;
    legend.innerHTML = '';
    legend.appendChild(legendItem(cssVar('--ms-accent', '#2f6df6'), metric.namePL + ' (' + metric.unit + ')'));
    legend.appendChild(legendItem(cssVar('--ms-warn', '#9a6100'), 'Próg ostrzegawczy'));
    legend.appendChild(legendItem(cssVar('--ms-crit', '#b3261e'), 'Próg krytyczny'));
  }

  function legendItem(color, textPL) {
    var item = make('span', 'ms-legend__item');
    var swatch = make('span', 'ms-legend__swatch');
    swatch.style.background = color;
    item.appendChild(swatch);
    item.appendChild(make('span', null, textPL));
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
    var th = make('th', null, 'Godzina');
    th.setAttribute('scope', 'col');
    tr.appendChild(th);

    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      var m = list[i];
      var cell = make('th', null);
      cell.setAttribute('scope', 'col');
      cell.id = 'tableCol-' + m.id;
      cell.appendChild(make('span', null, m.namePL));
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
      var td = make('td', null, 'Brak odczytów. Uruchom pomiar na ekranie Pomiar.');
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
    head.appendChild(make('h2', 'ms-section__title', 'Narzędzia'));
    head.appendChild(make('p', 'ms-section__sub', 'Kreatory i funkcje pomocnicze'));
    section.appendChild(head);

    var list = make('div', 'ms-list');
    list.id = 'toolsList';
    section.appendChild(list);

    var note = make('div', 'ms-note ms-note--info');
    note.appendChild(icon('info'));
    note.appendChild(make('div', 'ms-note__text',
      'Narzędzia pomagają zinterpretować pomiar. Wszystkie są dostępne od razu, ' +
      'a sam pomiar działa niezależnie od nich.'));
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
    navHead.appendChild(make('h2', 'ms-section__title', 'Ustawienia'));
    section.appendChild(navHead);

    var list = make('div', 'ms-list');
    list.appendChild(listRowButton('btnOpenThresholds', 'tune', 'Progi i profile',
      'Kiedy wartość ma zapalać ostrzeżenie', function () { openOrExplain('panelThresholds'); }));
    list.appendChild(listRowButton('btnOpenDocs', 'doc', 'Dokumentacja',
      'Jak mierzyć i czego ten pomiar nie mówi', function () { openOrExplain('panelDocs'); }));
    section.appendChild(list);

    var lookHead = make('div', 'ms-section__head');
    lookHead.appendChild(make('h2', 'ms-section__title', 'Wygląd i dostępność'));
    section.appendChild(lookHead);

    var card = make('div', 'ms-card');

    card.appendChild(selectField('themeSelect', 'Motyw', [
      { value: 'auto', labelPL: 'Jak w systemie' },
      { value: 'light', labelPL: 'Jasny' },
      { value: 'dark', labelPL: 'Ciemny' }
    ], String(getSetting('theme'))));

    card.appendChild(selectField('textScaleSelect', 'Rozmiar tekstu', [
      { value: '1', labelPL: 'Standardowy' },
      { value: '1.15', labelPL: 'Większy (115%)' },
      { value: '1.3', labelPL: 'Największy (130%)' }
    ], String(getSetting('textScale'))));

    card.appendChild(switchRow('contrastToggle', 'Wyższy kontrast',
      'Mocniejsze obramowania i ciemniejszy tekst pomocniczy.', !!getSetting('contrast')));
    card.appendChild(switchRow('soundToggle', 'Dźwięk alertów',
      'Krótki sygnał, gdy alert ekspozycji się włączy.', !!getSetting('sound')));
    card.appendChild(switchRow('vibrateToggle', 'Wibracja przy alertach',
      'Działa tylko na urządzeniach, które ją obsługują.', !!getSetting('vibrate')));

    section.appendChild(card);

    /* --- data ---
       Wired here because this screen belongs to the shell; the control only
       calls the module that owns the data and never touches its storage key. */
    var dataHead = make('div', 'ms-section__head');
    dataHead.appendChild(make('h2', 'ms-section__title', 'Dane'));
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
    clearText.appendChild(make('span', 'ms-list__title', 'Wyczyść historię pomiarów'));
    clearText.appendChild(make('span', 'ms-list__sub',
      'Kasuje zapisane odczyty z tego urządzenia. Progi, profile i ustawienia zostają.'));
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
    supportLine.appendChild(DOC.createTextNode('Aplikacja jest bezpłatna w całości. '));
    var supportLink = make('button', 'ms-linkbtn', 'Możesz ją wesprzeć dobrowolnie.');
    supportLink.id = 'btnOpenSupport';
    supportLink.type = 'button';
    supportLink.addEventListener('click', function () { showTab('support'); });
    supportLine.appendChild(supportLink);
    section.appendChild(supportLine);

    var version = make('p', 'ms-t-cap ms-t-muted', 'Monitor Światła — wersja 2');
    version.id = 'appVersion';
    section.appendChild(version);

    panel.appendChild(section);
    wireAppearanceControls();
    wireDataControls();
  }

  function listRowButton(id, iconName, titlePL, subPL, handler) {
    var btn = make('button', 'ms-list__item ms-list__item--button');
    btn.id = id;
    btn.type = 'button';
    var iconBox = make('span', 'ms-list__icon ms-list__icon--accent');
    iconBox.appendChild(icon(iconName));
    btn.appendChild(iconBox);
    var text = make('span', 'ms-list__text');
    text.appendChild(make('span', 'ms-list__title', titlePL));
    if (subPL) text.appendChild(make('span', 'ms-list__sub', subPL));
    btn.appendChild(text);
    var end = make('span', 'ms-list__end');
    end.appendChild(icon('chevron'));
    btn.appendChild(end);
    btn.addEventListener('click', handler);
    return btn;
  }

  function selectField(id, labelPL, options, selectedValue) {
    var field = make('div', 'ms-field');
    var label = make('label', 'ms-field__label', labelPL);
    label.setAttribute('for', id);
    field.appendChild(label);
    var wrap = make('div', 'ms-selectwrap');
    var select = make('select', 'ms-select');
    select.id = id;
    for (var i = 0; i < options.length; i += 1) {
      var opt = DOC.createElement('option');
      opt.value = options[i].value;
      opt.textContent = options[i].labelPL;
      if (options[i].value === selectedValue) opt.selected = true;
      select.appendChild(opt);
    }
    wrap.appendChild(select);
    field.appendChild(wrap);
    return field;
  }

  /* DOM order is required by the stylesheet's sibling selectors:
     input, then track (with the thumb inside), then the text block. */
  function switchRow(id, titlePL, subPL, checked) {
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
    text.appendChild(make('span', 'ms-switch__label', titlePL));
    if (subPL) text.appendChild(make('span', 'ms-switch__sub', subPL));
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
      var count = typeof E.historyCount === 'function' ? E.historyCount() : 0;
      confirmDialog({
        titlePL: 'Usunąć zapisaną historię?',
        bodyPL: 'Skasujemy ' + countPL(count, 'zapisany punkt', 'zapisane punkty', 'zapisanych punktów') +
          ' pomiaru z tego urządzenia. Tej operacji nie da się cofnąć. Progi, profile i ustawienia zostaną nietknięte.',
        confirmPL: 'Usuń historię',
        cancelPL: 'Zostaw',
        danger: true
      }).then(function (yes) {
        if (!yes) return;
        E.clearHistory();
        toast('Historia pomiarów usunięta.', { kind: 'info' });
      });
    });
  }

  function wireAppearanceControls() {
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
    lead.appendChild(make('h3', 'ms-card__title', 'Co ta aplikacja mierzy'));
    lead.appendChild(make('p', 'ms-card__sub',
      'Kamera telefonu patrzy na oświetloną powierzchnię, a aplikacja pięć razy na sekundę ' +
      'liczy średnie kanałów R, G i B ze środkowego wycinka kadru. Z tych trzech liczb ' +
      'wyprowadza siedem wskaźników.'));
    section.appendChild(lead);

    var warn = make('div', 'ms-note ms-note--warning');
    warn.appendChild(icon('warning'));
    var warnText = make('div', 'ms-note__text');
    warnText.appendChild(make('span', 'ms-note__title', 'Granice metody'));
    warnText.appendChild(make('span', null,
      'Aparat ma trzy szerokie kanały barwne, automatyczną ekspozycję i automatyczny balans bieli. ' +
      'Nie mierzy widma i nie zna wartości bezwzględnych, więc jasność jest wskaźnikiem względnym, ' +
      'a nie luksami. Temperatura barwowa i wpływ na rytm dobowy to przybliżenia liczone z barw sRGB. ' +
      'Próbkowanie 5 Hz widzi migotanie tylko poniżej 2,5 Hz — sieciowe 100 Hz jest poza zasięgiem ' +
      'i aplikacja nigdy nie poda go jako wyniku. Żaden wynik nie jest diagnozą ani poradą zdrowotną. ' +
      'Monitor Światła nie jest wyrobem medycznym w rozumieniu rozporządzenia (UE) 2017/745, nie służy do diagnozowania, zapobiegania, monitorowania ani leczenia jakiegokolwiek stanu chorobowego i nie zastępuje badania u lekarza ani optometrysty.'));
    warn.appendChild(warnText);
    section.appendChild(warn);

    var howHead = make('div', 'ms-section__head');
    howHead.appendChild(make('h3', 'ms-section__title', 'Jak mierzyć sensownie'));
    section.appendChild(howHead);

    var steps = make('div', 'ms-list');
    steps.appendChild(docRow('1', 'Trzymaj telefon nieruchomo',
      'Automatyka ekspozycji potrzebuje 2–3 sekund, żeby się ustabilizować.'));
    steps.appendChild(docRow('2', 'Kieruj na oświetloną powierzchnię',
      'Biała kartka albo jasna ściana. Nie mierz, patrząc prosto w źródło światła.'));
    steps.appendChild(docRow('3', 'Porównuj, nie oceniaj bezwzględnie',
      'Ta sama scena przed zmianą i po zmianie oświetlenia mówi więcej niż jedna liczba.'));
    steps.appendChild(docRow('4', 'Powtórz pomiar',
      'Pojedynczy odczyt to migawka. Kilkanaście sekund pomiaru daje wiarygodniejszy obraz.'));
    section.appendChild(steps);

    var metricsHead = make('div', 'ms-section__head');
    metricsHead.appendChild(make('h3', 'ms-section__title', 'Siedem wskaźników'));
    section.appendChild(metricsHead);

    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      var m = list[i];
      var card = make('div', 'ms-card ms-card--flat');
      var head = make('div', 'ms-card__head');
      head.appendChild(make('h4', 'ms-card__title', m.namePL));
      card.appendChild(head);
      card.appendChild(make('p', 'ms-card__sub', m.shortPL));
      card.appendChild(make('p', 'ms-t-body', m.helpPL));
      var kv = make('dl', 'ms-kv');
      kv.appendChild(kvRow('Jednostka', m.unit));
      kv.appendChild(kvRow('Skala', formatMetric(m.id, m.min) + ' – ' + formatMetric(m.id, m.max)));
      kv.appendChild(kvRow('Kierunek', m.invert ? 'Wyżej znaczy lepiej' : 'Niżej znaczy łagodniej'));
      card.appendChild(kv);
      section.appendChild(card);
    }

    var privacy = make('div', 'ms-note ms-note--info');
    privacy.appendChild(icon('info'));
    var privacyText = make('div', 'ms-note__text');
    privacyText.appendChild(make('span', 'ms-note__title', 'Dane i prywatność'));
    privacyText.appendChild(make('span', null,
      'Obraz z kamery nigdzie nie jest wysyłany ani zapisywany — z każdej klatki zostają tylko trzy ' +
      'liczby. Pomiary, progi i ustawienia leżą w pamięci przeglądarki na tym urządzeniu. ' +
      'Aplikacja nie wykonuje żadnych zapytań sieciowych i działa w trybie offline.'));
    privacy.appendChild(privacyText);
    section.appendChild(privacy);

    /* Stwierdzenie faktu, nie prośba: bez ramki, bez ikony kubka i bez odsyłania
       do zakładki Wsparcie. Cała aplikacja prosi o wsparcie w jednym miejscu —
       na ekranie Wsparcie — plus jedno zdanie w „Więcej”, i na tym koniec. */
    var free = make('p', 'ms-t-cap ms-t-muted',
      'Wszystkie siedem wskaźników, historia, wykres, narzędzia i tryb offline ' +
      'działają dla każdego, bez konta i bez opłat.');
    free.id = 'docsFreeLine';
    section.appendChild(free);

    panel.appendChild(section);
  }

  function docRow(numberPL, titlePL, subPL) {
    var row = make('div', 'ms-list__item');
    var iconBox = make('span', 'ms-list__icon ms-list__icon--accent', numberPL);
    row.appendChild(iconBox);
    var text = make('span', 'ms-list__text');
    text.appendChild(make('span', 'ms-list__title', titlePL));
    text.appendChild(make('span', 'ms-list__sub', subPL));
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
      announce('Pomiar rozpoczęty.');
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
      if (text) {
        text.textContent = 'Pomiar zatrzymany. Naciśnij „Start”, aby zmierzyć ponownie.';
      }
      var s = data && data.session ? data.session : null;
      announce(s
        ? 'Pomiar zatrzymany. Czas: ' + formatDuration(s.durationMs) + ', ' + samplesPL(s.samples || 0) + '.'
        : 'Pomiar zatrzymany.');
      historyRefresh();
    });

    on('engine:error', function (data) {
      applyEngineState('error');
      var text = byId('cameraPlaceholderText');
      var messagePL = (data && data.messagePL) || 'Nie udało się uruchomić kamery.';
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
      text.textContent = cal
        ? 'Pomiar skalibrowany białą kartką — kanały wyrównane.'
        : 'Pomiar bez kalibracji — wartości traktuj porównawczo.';
    });

    on('tools:alert', function (data) {
      if (data && data.messagePL) announce(data.messagePL, true);
    });
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
    pluralPL: pluralPL,
    countPL: countPL,

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
