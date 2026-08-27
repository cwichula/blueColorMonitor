/* Monitor Światła v3 — powłoka aplikacji (window.UI3).
 *
 * This file owns everything that is not the dashboard and not a measurement:
 * the fullscreen layers (module screens, the module index, the aiming screen),
 * the modal sheet, the live bar pinned to the bottom of every module, the
 * toast, the screen-reader live region, settings, theme and `app:ready`.
 *
 * Three rules shaped the code below and none of them has an exception:
 *
 *  1. The control desk is never covered. Every surface this file creates sits
 *     below --ms3-z-desk and stops above the desk height. A sheet that hides
 *     the STOP key would be a defect, not a style choice.
 *
 *  2. Only dash.js listens to `engine:sample` and only dash.js starts, stops
 *     or flips the camera. Modules receive readings through UI3.onLive, which
 *     is a single subscription with a single throttle. The "Obróć" key on the
 *     aiming screen does not call the engine — it clicks the desk key that
 *     dash.js owns, so the call still happens in exactly one place.
 *
 *  3. Polish wording lives in Scale.TEXT. This file reads it through `text()`,
 *     which tries a handful of plausible keys and falls back to the literal
 *     wording of chapter 8 of DESIGN.md, so a rename in scale.js degrades to a
 *     correct sentence instead of an empty label.
 */
(function (global) {
  'use strict';

  var doc = global.document;
  var Bus = global.Bus;

  var UI3 = {};

  /* ------------------------------------------------------------------
     Constants
     ------------------------------------------------------------------ */

  var SETTINGS_KEY = 'ms3.settings.v1';

  var LIVE_MS = 1000;    // modules and the live bar update at 1 Hz, not 5 Hz
  var SAY_MS = 2000;     // the live region speaks at most once per 2 s (7.6)
  var TOAST_MS = 6000;

  var LAYER_SCREEN = 'screen';
  var LAYER_MENU = 'menu';
  var LAYER_AIM = 'aim';
  var LAYER_SHEET = 'sheet';

  var DEFAULTS = {
    theme: 'system',
    textScale: 1,
    motion: 'system',
    leadChannel: 'share',
    firstRunDone: false,
    lastRange: '60s'
  };

  var TEXT_SCALES = [1, 1.15, 1.3];

  /* ------------------------------------------------------------------
     Tiny DOM helpers
     ------------------------------------------------------------------ */

  function byId(id) {
    try { return doc ? doc.getElementById(id) : null; } catch (_) { return null; }
  }

  function make(tag, className) {
    var node = doc.createElement(tag);
    if (className) node.className = className;
    return node;
  }

  function put(parent, child) {
    parent.appendChild(child);
    return child;
  }

  function setText(node, value) {
    if (node && node.textContent !== value) node.textContent = value;
  }

  /* A key is always a real <button> with a visible label span (5.6).
     `className` carries the modifiers only; the base class is added here. */
  function key(labelPL, className, ariaPL) {
    var btn = make('button', 'ms3-key' + (className ? ' ' + className : ' ms3-key--ghost'));
    btn.type = 'button';
    var label = put(btn, make('span', 'ms3-key__label'));
    label.textContent = labelPL;
    if (ariaPL) btn.setAttribute('aria-label', ariaPL);
    return btn;
  }

  /* ------------------------------------------------------------------
     Polish wording — Scale.TEXT is the single source, chapter 8 the fallback
     ------------------------------------------------------------------ */

  function lookup(path) {
    var Scale = global.Scale;
    if (!Scale || !Scale.TEXT) return null;
    var node = Scale.TEXT;
    var parts = path.split('.');
    for (var i = 0; i < parts.length; i += 1) {
      if (node === null || typeof node !== 'object') return null;
      node = node[parts[i]];
      if (node === undefined) return null;
    }
    return typeof node === 'string' && node.length ? node : null;
  }

  // `paths` is tried in order; the first string wins. The fallback is the
  // literal wording from chapter 8 — never an invented sentence.
  function text(paths, fallback) {
    for (var i = 0; i < paths.length; i += 1) {
      var found = lookup(paths[i]);
      if (found) return found;
    }
    return fallback;
  }

  function T_back() { return text(['keys.back', 'key.back', 'keyBack', 'ui.back', 'back'], '‹ Wróć'); }
  function T_backAria() { return text(['keys.backAria', 'key.backAria', 'aria.back', 'backAria'], 'Wróć do pulpitu'); }
  function T_dash() { return text(['keys.dash', 'key.dash', 'keyDash', 'livebar.key', 'live.key'], 'Pulpit'); }
  function T_close() { return text(['keys.close', 'key.close', 'close'], 'Zamknij'); }
  function T_flip() { return text(['keys.flip', 'key.flip', 'keyFlip', 'flip'], 'Obróć'); }
  function T_flipAria() { return text(['keys.flipAria', 'key.flipAria', 'aria.flip'], 'Przełącz kamerę przód/tył'); }
  function T_menuTitle() { return text(['menu.titlePL', 'menu.title', 'modules.titlePL', 'screens.menu'], 'Spis modułów'); }
  function T_aimTitle() { return text(['aim.titlePL', 'aim.title', 'screens.aim'], 'Celowanie'); }
  function T_stopped() { return text(['live.stoppedPL', 'livebar.stopped', 'live.stopped', 'states.stopped'], 'Pomiar zatrzymany'); }
  function T_none() { return text(['noValue', 'empty', 'dashes', 'values.none'], '—'); }
  function T_aimHint() {
    return text(['aim.hintPL', 'aim.hint', 'aim.textPL'],
      'Celownik obejmuje dokładnie ten wycinek, który jest mierzony. ' +
      'Kieruj na oświetloną powierzchnię i trzymaj telefon nieruchomo.');
  }

  /* ------------------------------------------------------------------
     Settings — every access guarded, private mode throws on read as well
     ------------------------------------------------------------------ */

  var settings = null;

  function readSettings() {
    var out = {};
    var k;
    for (k in DEFAULTS) if (Object.prototype.hasOwnProperty.call(DEFAULTS, k)) out[k] = DEFAULTS[k];
    var raw = null;
    try {
      if (global.localStorage) raw = global.localStorage.getItem(SETTINGS_KEY);
    } catch (_) { raw = null; }
    if (!raw) return out;
    var parsed = null;
    try { parsed = JSON.parse(raw); } catch (_) { parsed = null; }
    if (!parsed || typeof parsed !== 'object') return out;
    for (k in DEFAULTS) {
      if (Object.prototype.hasOwnProperty.call(DEFAULTS, k) && parsed[k] !== undefined) out[k] = parsed[k];
    }
    return out;
  }

  function writeSettings() {
    try {
      if (global.localStorage) global.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (_) { /* private mode: the session still works, it just forgets */ }
  }

  function ensureSettings() {
    if (!settings) settings = readSettings();
    return settings;
  }

  UI3.getSetting = function (k) {
    ensureSettings();
    return Object.prototype.hasOwnProperty.call(settings, k) ? settings[k] : undefined;
  };

  UI3.setSetting = function (k, value) {
    ensureSettings();
    if (settings[k] === value) return value;
    settings[k] = value;
    writeSettings();
    return value;
  };

  /* ---- theme, text size, motion: attributes on <html> ---- */

  function root() { return doc ? doc.documentElement : null; }

  function applyTheme() {
    var el = root();
    if (!el) return;
    var v = UI3.getSetting('theme');
    // "system" means: no attribute at all, so prefers-color-scheme decides.
    if (v === 'light' || v === 'dark') el.setAttribute('data-theme', v);
    else el.removeAttribute('data-theme');
  }

  function applyTextScale() {
    var el = root();
    if (!el) return;
    var v = Number(UI3.getSetting('textScale')) || 1;
    el.setAttribute('data-text-scale', String(v));
    // Written directly as well: the multiplier must work even if base.css has
    // no rule for this exact attribute value.
    try { el.style.setProperty('--ms3-scale', String(v)); } catch (_) {}
  }

  function applyMotion() {
    var el = root();
    if (!el) return;
    if (UI3.getSetting('motion') === 'reduced') el.setAttribute('data-motion', 'reduced');
    else el.removeAttribute('data-motion');
  }

  function applyAll() {
    applyTheme();
    applyTextScale();
    applyMotion();
  }

  function emit(name, data) {
    if (Bus && typeof Bus.emit === 'function') Bus.emit(name, data || {});
  }

  UI3.setTheme = function (v) {
    if (v !== 'light' && v !== 'dark') v = 'system';
    UI3.setSetting('theme', v);
    applyTheme();
    emit('ui3:theme', { theme: v, textScale: UI3.getSetting('textScale'), motion: UI3.getSetting('motion') });
    return v;
  };

  UI3.setTextScale = function (v) {
    var n = Number(v);
    var ok = 1;
    for (var i = 0; i < TEXT_SCALES.length; i += 1) if (TEXT_SCALES[i] === n) ok = n;
    UI3.setSetting('textScale', ok);
    applyTextScale();
    emit('ui3:theme', { theme: UI3.getSetting('theme'), textScale: ok, motion: UI3.getSetting('motion') });
    return ok;
  };

  UI3.setMotion = function (v) {
    var m = v === 'reduced' ? 'reduced' : 'system';
    UI3.setSetting('motion', m);
    applyMotion();
    emit('ui3:theme', { theme: UI3.getSetting('theme'), textScale: UI3.getSetting('textScale'), motion: m });
    return m;
  };

  UI3.leadChannel = function () {
    var id = UI3.getSetting('leadChannel');
    return id || DEFAULTS.leadChannel;
  };

  UI3.setLeadChannel = function (id) {
    var Metrics = global.Metrics;
    if (Metrics && Metrics.byId && !Metrics.byId(id)) return UI3.leadChannel();
    UI3.setSetting('leadChannel', id);
    renderLiveBars();
    emit('ui3:lead', { id: id });
    return id;
  };

  // Applied while the document head is still parsing: waiting for
  // DOMContentLoaded would show one frame of the wrong theme.
  ensureSettings();
  applyAll();

  /* ------------------------------------------------------------------
     No stylesheet here.
     ------------------------------------------------------------------
     components.css owns every ms3-* class (9.1). A second definition of the
     module index, the aiming screen or the toast in this file would drift from
     it within a week — v3 had one such pair and it had already rotted, so the
     class names below are the ones components.css actually styles.
  */

  /* ------------------------------------------------------------------
     Layer stack — screens, menu, aiming screen and sheet share one stack
     ------------------------------------------------------------------
     Every open layer owns one history entry, so the Android back key closes
     the layer instead of leaving the application. `pendingBack` swallows the
     popstate that our own history.back() produces after a layer was already
     dismissed by a key press.
  */

  var layers = [];
  var pendingBack = 0;

  function topLayer() { return layers.length ? layers[layers.length - 1] : null; }

  function pushHistory() {
    try {
      if (global.history && global.history.pushState) {
        global.history.pushState({ ms3: layers.length + 1 }, '', global.location.href);
        return true;
      }
    } catch (_) { /* file:// and locked-down browsers: no history, no crash */ }
    return false;
  }

  function focusables(rootEl) {
    var out = [];
    if (!rootEl || !rootEl.querySelectorAll) return out;
    var all = rootEl.querySelectorAll(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),' +
      'textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
    );
    for (var i = 0; i < all.length; i += 1) {
      var node = all[i];
      if (node.hasAttribute('hidden')) continue;
      if (node.getAttribute('aria-hidden') === 'true') continue;
      if (node.getAttribute('tabindex') === '-1') continue;
      // A node with no boxes is invisible; offsetParent lies inside position:fixed.
      if (node.getClientRects && node.getClientRects().length === 0) continue;
      out.push(node);
    }
    return out;
  }

  function indexOfNode(list, node) {
    for (var i = 0; i < list.length; i += 1) if (list[i] === node) return i;
    return -1;
  }

  function focusInto(layer) {
    var target = layer.el;
    try {
      if (target && target.focus) { target.focus(); return; }
    } catch (_) {}
    var items = focusables(layer.el);
    if (items.length) { try { items[0].focus(); } catch (_) {} }
  }

  function restoreFocus(layer) {
    var opener = layer.opener;
    if (!opener || !opener.focus) return;
    if (doc && doc.body && !doc.body.contains(opener)) return;
    try { opener.focus(); } catch (_) {}
  }

  // What a layer hides from a screen reader is the DASHBOARD, never the control
  // desk and never the live region. `aria-modal` cannot express that — it hides
  // everything outside the dialog — so the application says it itself. Rule 7 of
  // chapter 1 holds for a screen-reader user exactly as it does for a finger.
  function syncDashHidden() {
    var dash = byId('ms3Dash');
    if (!dash) return;
    if (layers.length) dash.setAttribute('aria-hidden', 'true');
    else dash.removeAttribute('aria-hidden');
  }

  function openLayer(layer) {
    layer.opener = layer.opener || (doc ? doc.activeElement : null);
    layer.pushed = pushHistory();
    layers.push(layer);
    syncDashHidden();
    show(layer.el);
    layer.el.setAttribute('data-open', '1');
    focusInto(layer);
  }

  // A replacement inherits the history entry and the opener of the layer it
  // takes over (module index → module, help sheet → module). No new entry, so
  // one back press still lands on the dashboard.
  function replaceLayer(oldLayer, layer) {
    var idx = indexOf(oldLayer);
    if (idx === -1) { openLayer(layer); return; }
    layer.opener = oldLayer.opener;
    layer.pushed = oldLayer.pushed;
    hideLayer(oldLayer);
    layers[idx] = layer;
    show(layer.el);
    layer.el.setAttribute('data-open', '1');
    focusInto(layer);
  }

  // A fullscreen layer takes over whatever fullscreen layer or sheet is on top:
  // there is no third level of navigation and a sheet never survives under a
  // module it opened.
  function replaceable(layer) {
    if (!layer) return null;
    if (layer.kind === LAYER_SCREEN || layer.kind === LAYER_MENU || layer.kind === LAYER_SHEET) return layer;
    return null;
  }

  function indexOf(layer) {
    for (var i = 0; i < layers.length; i += 1) if (layers[i] === layer) return i;
    return -1;
  }

  function hideLayer(layer) {
    if (layer.el) {
      layer.el.hidden = true;
      layer.el.removeAttribute('data-open');
    }
    if (typeof layer.onHide === 'function') {
      try { layer.onHide(); } catch (_) {}
    }
  }

  function dismiss(layer, viaHistory) {
    var idx = indexOf(layer);
    if (idx === -1) return;
    layers.splice(idx, 1);
    syncDashHidden();
    hideLayer(layer);
    restoreFocus(layer);
    if (layer.pushed && !viaHistory) {
      pendingBack += 1;
      try { global.history.back(); } catch (_) { pendingBack -= 1; }
    }
  }

  function dismissKind(kind, viaHistory) {
    for (var i = layers.length - 1; i >= 0; i -= 1) {
      if (layers[i].kind === kind) { dismiss(layers[i], viaHistory); return true; }
    }
    return false;
  }

  function onPopState() {
    if (pendingBack > 0) { pendingBack -= 1; return; }
    var top = topLayer();
    if (!top) return;
    top.pushed = false;      // the entry is already gone; do not call back()
    dismiss(top, true);
  }

  // The entry animation (7.4) is keyed in components.css off `:not([hidden])`,
  // so removing the attribute is the whole trigger. Nothing to schedule here.
  function show(el) {
    el.hidden = false;
  }

  function onKeyDown(ev) {
    var top = topLayer();
    if (!top) return;
    var k = ev.key;
    if (k === 'Escape' || k === 'Esc') {
      ev.preventDefault();
      dismiss(top, false);
      return;
    }
    if (k !== 'Tab') return;
    // The ring runs through the open layer AND through the control desk: START
    // and STOP stay one Tab away from wherever the user is (rule 7, chapter 1).
    var items = focusables(top.el).concat(focusables(byId('ms3Desk')));
    if (!items.length) { ev.preventDefault(); return; }
    var first = items[0];
    var last = items[items.length - 1];
    var active = doc.activeElement;
    if (indexOfNode(items, active) === -1) {
      ev.preventDefault();
      try { (ev.shiftKey ? last : first).focus(); } catch (_) {}
      return;
    }
    if (ev.shiftKey && active === first) {
      ev.preventDefault();
      try { last.focus(); } catch (_) {}
    } else if (!ev.shiftKey && active === last) {
      ev.preventDefault();
      try { first.focus(); } catch (_) {}
    }
  }

  UI3.isScreenOpen = function () {
    for (var i = 0; i < layers.length; i += 1) {
      var kind = layers[i].kind;
      if (kind === LAYER_SCREEN || kind === LAYER_MENU || kind === LAYER_AIM) return true;
    }
    return false;
  };

  function openModuleLayer() {
    for (var i = 0; i < layers.length; i += 1) if (layers[i].kind === LAYER_SCREEN) return layers[i];
    return null;
  }

  /* ------------------------------------------------------------------
     Live bar (5.8) — one per module, updated at 1 Hz from publishLive
     ------------------------------------------------------------------ */

  var lastReading = null;
  var lastLiveAt = 0;
  var running = false;
  var subs = [];

  function buildLiveBar() {
    var bar = make('div', 'ms3-livebar');
    var shape = put(bar, make('span', 'ms3-shape ms3-shape--none'));
    shape.setAttribute('aria-hidden', 'true');
    var name = put(bar, make('span', 'ms3-livebar__name'));
    var value = put(bar, make('span', 'ms3-livebar__value'));
    var unit = put(bar, make('span', 'ms3-livebar__unit'));
    var state = put(bar, make('span', 'ms3-livebar__state'));
    var back = key(T_dash(), 'ms3-key--ghost ms3-livebar__key');
    back.onclick = function () { UI3.closeScreen(); };
    put(bar, back);
    return { el: bar, shape: shape, name: name, value: value, unit: unit, state: state };
  }

  function metricOf(id) {
    var Metrics = global.Metrics;
    return Metrics && Metrics.byId ? Metrics.byId(id) : null;
  }

  function formatValue(id, value) {
    var Scale = global.Scale;
    if (Scale && typeof Scale.formatValue === 'function') return Scale.formatValue(id, value);
    var Metrics = global.Metrics;
    if (value === null || value === undefined) return T_none();
    return Metrics && Metrics.formatValue ? Metrics.formatValue(id, value) : String(value);
  }

  // Hot-ish path (1 Hz): textContent and one class only. No background, no
  // width, no innerHTML — the same budget the 5 Hz loop lives on.
  function renderLiveBar(live, reading) {
    if (!live) return;
    var id = UI3.leadChannel();
    var metric = metricOf(id);
    setText(live.name, metric ? metric.namePL : id);
    setText(live.unit, metric && metric.unit ? metric.unit : '');

    var value = null;
    var zone = null;
    if (reading && reading.values) value = reading.values[id];
    if (reading && reading.zones) zone = reading.zones[id];

    if (!running || !reading) {
      setText(live.value, T_none());
      setText(live.state, T_stopped());
      setShape(live.shape, null);
      return;
    }
    setText(live.value, formatValue(id, value));
    setText(live.state, '');
    setShape(live.shape, zone);
  }

  function setShape(node, zone) {
    if (!node) return;
    var mod = zone === 'good' ? 'good' : zone === 'warning' ? 'warning' : zone === 'critical' ? 'critical' : 'none';
    var cls = 'ms3-shape ms3-shape--' + mod;
    if (node.className !== cls) node.className = cls;
  }

  function renderLiveBars() {
    var layer = openModuleLayer();
    if (layer && layer.live) renderLiveBar(layer.live, lastReading);
  }

  UI3.publishLive = function (reading) {
    lastReading = reading || null;
    var layer = openModuleLayer();
    // Nothing is listening and nothing is visible: drop the sample here so the
    // dashboard's 5 Hz loop pays nothing for modules that are not open.
    if (!layer && !subs.length) return;
    var now = Date.now();
    if (now - lastLiveAt < LIVE_MS) return;
    lastLiveAt = now;
    if (layer) renderLiveBar(layer.live, lastReading);
    if (!layer) return;   // subscribers are modules; no module open, no call
    for (var i = subs.length - 1; i >= 0; i -= 1) {
      try { subs[i](lastReading); } catch (err) {
        if (global.console && console.error) console.error('UI3.onLive: subskrybent rzucił', err);
      }
    }
  };

  UI3.onLive = function (fn) {
    if (typeof fn !== 'function') return function () {};
    subs.push(fn);
    var off = false;
    return function () {
      if (off) return;
      off = true;
      for (var i = 0; i < subs.length; i += 1) {
        if (subs[i] === fn) { subs.splice(i, 1); return; }
      }
    };
  };

  UI3.latestLive = function () { return lastReading; };

  /* ------------------------------------------------------------------
     Module registry and module screens (5.9)
     ------------------------------------------------------------------ */

  var registry = [];

  function normalizeNo(no) {
    var s = String(no === undefined || no === null ? '' : no).replace(/[^0-9]/g, '');
    if (!s.length) return '';
    if (s.length === 1) s = '0' + s;
    return s;
  }

  function entryOf(no) {
    var wanted = normalizeNo(no);
    for (var i = 0; i < registry.length; i += 1) if (registry[i].no === wanted) return registry[i];
    return null;
  }

  UI3.registerModule = function (def) {
    if (!def || typeof def.build !== 'function') return false;
    var no = normalizeNo(def.no);
    if (!no) return false;
    if (entryOf(no)) return false;      // first registration wins; no silent replacement
    registry.push({
      no: no,
      titlePL: String(def.titlePL || ''),
      descPL: String(def.descPL || ''),
      build: def.build,
      built: false,
      layer: null
    });
    registry.sort(function (a, b) { return a.no < b.no ? -1 : a.no > b.no ? 1 : 0; });
    return true;
  };

  UI3.modules = function () {
    var out = [];
    for (var i = 0; i < registry.length; i += 1) {
      out.push({ no: registry[i].no, titlePL: registry[i].titlePL, descPL: registry[i].descPL });
    }
    return out;
  };

  function screenShell(idBase, titlePL, noPL, withLiveBar) {
    var section = make('section', 'ms3-screen');
    section.id = idBase;
    section.setAttribute('role', 'dialog');
    section.setAttribute('tabindex', '-1');
    section.hidden = true;

    var head = put(section, make('header', 'ms3-screen__head'));
    var back = key(T_back(), 'ms3-key--ghost ms3-screen__back', T_backAria());
    put(head, back);
    if (noPL) {
      var noEl = put(head, make('span', 'ms3-screen__no'));
      noEl.textContent = noPL;
    }
    var title = put(head, make('h1', 'ms3-screen__title'));
    title.id = idBase + 'Title';
    title.textContent = titlePL;
    section.setAttribute('aria-labelledby', title.id);

    var body = put(section, make('div', 'ms3-screen__body'));
    var live = null;
    if (withLiveBar) {
      live = buildLiveBar();
      put(section, live.el);
    }
    return { el: section, head: head, back: back, body: body, live: live, title: title };
  }

  function screensHost() {
    return byId('ms3Screens') || (doc ? doc.body : null);
  }

  UI3.openScreen = function (no) {
    var entry = entryOf(no);
    if (!entry) return false;

    var top = topLayer();
    if (top && top.kind === LAYER_SCREEN && top.entry === entry) return true;
    // Already open underneath a sheet: never push the same layer twice.
    if (entry.layer && indexOf(entry.layer) !== -1) return true;

    if (!entry.layer) {
      var parts = screenShell('ms3Screen' + entry.no, entry.titlePL, entry.no, true);
      parts.back.onclick = function () { UI3.closeScreen(); };
      var host = screensHost();
      if (!host) return false;
      host.appendChild(parts.el);
      entry.layer = {
        kind: LAYER_SCREEN,
        el: parts.el,
        body: parts.body,
        live: parts.live,
        entry: entry
      };
    }

    var layer = entry.layer;
    layer.opener = doc ? doc.activeElement : null;

    // A module never opens a module and the index is replaced, not stacked:
    // one back press always lands on the dashboard (chapter 3, two levels).
    var replaced = replaceable(top);
    if (replaced) replaceLayer(replaced, layer);
    else openLayer(layer);

    // build() runs only after the screen is visible: a canvas measured inside a
    // hidden element reports width 0. That trap cost v2 a release.
    if (!entry.built) {
      entry.built = true;
      try {
        entry.build(layer.body);
      } catch (err) {
        if (global.console && console.error) console.error('UI3: moduł ' + entry.no + ' nie zbudował się', err);
      }
    }
    renderLiveBar(layer.live, lastReading);
    return true;
  };

  UI3.closeScreen = function () {
    if (dismissKind(LAYER_SCREEN, false)) return true;
    if (dismissKind(LAYER_MENU, false)) return true;
    return false;
  };

  /* ------------------------------------------------------------------
     Module index (SPIS MODUŁÓW) — built from the registry, never from a list
     ------------------------------------------------------------------ */

  var menuLayer = null;
  var menuList = null;

  function buildMenu() {
    var parts = screenShell('ms3Menu', T_menuTitle(), '', false);
    parts.back.onclick = function () { UI3.closeMenu(); };
    menuList = put(parts.body, make('div', 'ms3-menu'));
    var host = screensHost();
    if (host) host.appendChild(parts.el);
    menuLayer = { kind: LAYER_MENU, el: parts.el, body: parts.body, live: null };
    return menuLayer;
  }

  function fillMenu() {
    if (!menuList) return;
    while (menuList.firstChild) menuList.removeChild(menuList.firstChild);
    for (var i = 0; i < registry.length; i += 1) {
      menuList.appendChild(menuRow(registry[i]));
    }
  }

  // three-column grid that places the number, the two lines of text and the
  // chevron itself, so there is no wrapper span and no glyph to draw.
  function menuRow(entry) {
    var btn = make('button', 'ms3-menu__item');
    btn.type = 'button';

    var no = put(btn, make('span', 'ms3-menu__no'));
    no.textContent = entry.no;

    var name = put(btn, make('span', 'ms3-menu__name'));
    name.textContent = entry.titlePL;
    if (entry.descPL) {
      var desc = put(btn, make('span', 'ms3-menu__desc'));
      desc.textContent = entry.descPL;
    }

    // The chevron is a shape in CSS (clip-path), not a character: a glyph on top
    // of it would draw the arrow twice.
    var chevron = put(btn, make('span', 'ms3-menu__chevron'));
    chevron.setAttribute('aria-hidden', 'true');

    btn.setAttribute('aria-label', entry.no + '. ' + entry.titlePL + (entry.descPL ? '. ' + entry.descPL : ''));
    btn.onclick = function () { UI3.openScreen(entry.no); };
    return btn;
  }

  UI3.openMenu = function () {
    var top = topLayer();
    if (top && top.kind === LAYER_MENU) return true;    // idempotent: two owners may wire the MENU key
    if (!menuLayer) buildMenu();
    if (!menuLayer) return false;
    fillMenu();                                          // late registrations show up
    menuLayer.opener = doc ? doc.activeElement : null;
    var replaced = replaceable(top);
    if (replaced) replaceLayer(replaced, menuLayer);
    else openLayer(menuLayer);
    return true;
  };

  UI3.closeMenu = function () { return dismissKind(LAYER_MENU, false); };

  /* ------------------------------------------------------------------
     Aiming screen (CELOWANIE) — moves the one camera panel, never clones it
     ------------------------------------------------------------------ */

  var aimLayer = null;
  var aimStage = null;
  var aimHome = null;

  function buildAim() {
    var section = make('section', 'ms3-aim');
    section.id = 'ms3Aim';
    section.setAttribute('role', 'dialog');
    section.setAttribute('aria-label', T_aimTitle());
    section.setAttribute('tabindex', '-1');
    section.hidden = true;

    aimStage = put(section, make('div', 'ms3-aim__stage'));

    var hint = put(section, make('p', 'ms3-aim__hint'));
    hint.textContent = T_aimHint();

    var keys = put(section, make('div', 'ms3-aim__keys'));
    var close = key(T_close(), 'ms3-key--ghost');
    close.onclick = function () { UI3.closeAim(); };
    put(keys, close);

    var flip = key(T_flip(), 'ms3-key--square', T_flipAria());
    // dash.js is the only file allowed to call Engine.switchCamera(); clicking
    // its key keeps that rule intact and inherits its disabled state for free.
    flip.onclick = function () {
      var deskFlip = byId('ms3KeyFlip');
      if (deskFlip && !deskFlip.disabled) deskFlip.click();
    };
    put(keys, flip);

    var host = screensHost();
    if (host) host.appendChild(section);

    aimLayer = { kind: LAYER_AIM, el: section, live: null, onHide: returnCameraPanel };
    return aimLayer;
  }

  function takeCameraPanel() {
    var panel = byId('ms3CameraPanel');
    if (!panel || !aimStage) return;
    aimHome = { parent: panel.parentNode, next: panel.nextSibling };
    aimStage.appendChild(panel);
    panel.setAttribute('data-aim', '1');
    panel.setAttribute('data-state', 'expanded');
  }

  function returnCameraPanel() {
    var panel = byId('ms3CameraPanel');
    if (!panel) { aimHome = null; return; }
    panel.removeAttribute('data-aim');
    // dash.js owns data-state; Engine is the single source of truth about the
    // camera, so the collapsed/expanded choice is re-derived, not remembered.
    var Engine = global.Engine;
    var live = !!(Engine && typeof Engine.isRunning === 'function' && Engine.isRunning());
    panel.setAttribute('data-state', live ? 'collapsed' : 'expanded');
    if (!aimHome || !aimHome.parent) return;
    try {
      if (aimHome.next && aimHome.next.parentNode === aimHome.parent) {
        aimHome.parent.insertBefore(panel, aimHome.next);
      } else {
        aimHome.parent.appendChild(panel);
      }
    } catch (_) {
      try { aimHome.parent.appendChild(panel); } catch (__) {}
    }
    aimHome = null;
  }

  UI3.openAim = function () {
    var top = topLayer();
    if (top && top.kind === LAYER_AIM) return true;
    if (aimLayer && indexOf(aimLayer) !== -1) return true;
    if (!aimLayer) buildAim();
    if (!aimLayer) return false;
    aimLayer.opener = doc ? doc.activeElement : null;
    takeCameraPanel();
    openLayer(aimLayer);
    return true;
  };

  UI3.closeAim = function () { return dismissKind(LAYER_AIM, false); };

  /* ------------------------------------------------------------------
     Sheet (5.10) — modal above everything except the control desk
     ------------------------------------------------------------------ */

  var sheetLayer = null;
  var sheetParts = null;

  function buildSheet() {
    var wrap = make('div', 'ms3-sheet');
    wrap.id = 'ms3Sheet';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-labelledby', 'ms3SheetTitle');
    wrap.setAttribute('tabindex', '-1');
    wrap.hidden = true;

    // The scrim is a real <button> (rule 5: never a <div> with onclick). It is
    // taken out of the tab order because the visible "Zamknij" key is the
    // keyboard path out.
    var scrim = make('button', 'ms3-sheet__scrim');
    scrim.type = 'button';
    scrim.tabIndex = -1;
    scrim.setAttribute('aria-hidden', 'true');
    scrim.onclick = function () { UI3.closeSheet(); };
    put(wrap, scrim);

    var panel = put(wrap, make('div', 'ms3-sheet__panel'));
    var head = put(panel, make('header', 'ms3-sheet__head'));
    var title = put(head, make('h2', ''));
    title.id = 'ms3SheetTitle';
    var close = key(T_close(), 'ms3-key--ghost');
    close.onclick = function () { UI3.closeSheet(); };
    put(head, close);
    var body = put(panel, make('div', 'ms3-sheet__body'));

    var host = byId('ms3Sheets') || (doc ? doc.body : null);
    if (host) host.appendChild(wrap);

    sheetParts = { el: wrap, title: title, body: body, close: close };
    sheetLayer = { kind: LAYER_SHEET, el: wrap, live: null, onHide: afterSheetHidden };
    return sheetLayer;
  }

  var sheetOnClose = null;

  function afterSheetHidden() {
    var fn = sheetOnClose;
    sheetOnClose = null;
    if (typeof fn === 'function') {
      try { fn(); } catch (_) {}
    }
  }

  UI3.openSheet = function (opts) {
    opts = opts || {};
    if (!sheetLayer) buildSheet();
    if (!sheetLayer) return false;

    // One sheet at a time: a sheet over a sheet is a third level of depth. The
    // replaced sheet still gets its onClose — a caller that registered cleanup
    // must not lose it because someone opened another sheet.
    var openedAlready = indexOf(sheetLayer) !== -1;
    if (openedAlready) afterSheetHidden();

    setText(sheetParts.title, String(opts.titlePL || ''));
    while (sheetParts.body.firstChild) sheetParts.body.removeChild(sheetParts.body.firstChild);
    sheetOnClose = typeof opts.onClose === 'function' ? opts.onClose : null;

    if (!openedAlready) {
      sheetLayer.opener = doc ? doc.activeElement : null;
      openLayer(sheetLayer);
    }

    if (typeof opts.build === 'function') {
      try {
        opts.build(sheetParts.body);      // built visible, same reason as modules
      } catch (err) {
        if (global.console && console.error) console.error('UI3.openSheet: build rzucił', err);
      }
    }
    return true;
  };

  UI3.closeSheet = function () { return dismissKind(LAYER_SHEET, false); };

  /* ------------------------------------------------------------------
     Toast — one at a time, never over the control desk
     ------------------------------------------------------------------ */

  var toastEl = null;
  var toastText = null;
  var toastAction = null;
  var toastClose = null;
  var toastTimer = null;

  function buildToast() {
    var el = make('div', 'ms3-toast');
    el.id = 'ms3Toast';
    el.setAttribute('role', 'status');
    el.hidden = true;
    toastText = put(el, make('span', 'ms3-toast__text'));
    toastAction = key('', 'ms3-key--ghost ms3-toast__action');
    toastAction.hidden = true;
    put(el, toastAction);

    // A toast that offers a key never disappears on a timer (WCAG 2.2.1): the
    // reader of this application needs longer than six seconds to notice a
    // message, read it and hit a key. It closes when a person says so.
    toastClose = key(T_close(), 'ms3-key--ghost ms3-toast__action');
    toastClose.hidden = true;
    toastClose.onclick = function () { hideToast(); };
    put(el, toastClose);

    // Inserted before the control desk so the desk stays the last child of
    // #ms3App — the layout rule that keeps START/STOP on top (4.7).
    var app = byId('ms3App');
    var desk = byId('ms3Desk');
    if (app && desk && desk.parentNode === app) app.insertBefore(el, desk);
    else if (app) app.appendChild(el);
    else if (doc && doc.body) doc.body.appendChild(el);

    toastEl = el;
    return el;
  }

  function hideToast() {
    if (toastTimer) { global.clearTimeout(toastTimer); toastTimer = null; }
    if (!toastEl) return;
    // Hiding the node the keyboard is standing on drops focus to <body> and the
    // user loses their place. START/STOP is the safe landing.
    if (toastEl.contains(doc.activeElement)) {
      var home = byId('ms3KeyMain');
      if (home) { try { home.focus(); } catch (_) {} }
    }
    toastEl.hidden = true;
  }

  UI3.toast = function (textPL, opts) {
    if (!textPL) return function () {};
    opts = opts || {};
    if (!toastEl) buildToast();
    if (!toastEl) return function () {};
    hideToast();

    setText(toastText, String(textPL));

    var withAction = !!(opts.actionPL && typeof opts.onAction === 'function');
    if (withAction) {
      var label = toastAction.querySelector('.ms3-key__label') || toastAction;
      setText(label, String(opts.actionPL));
      toastAction.hidden = false;
      toastAction.onclick = function () {
        hideToast();
        try { opts.onAction(); } catch (_) {}
      };
    } else {
      toastAction.hidden = true;
      toastAction.onclick = null;
    }
    if (toastClose) toastClose.hidden = !withAction;

    toastEl.hidden = false;
    // Only a toast that is pure information runs out of time on its own.
    if (!withAction) {
      var ms = typeof opts.durationMs === 'number' && opts.durationMs > 0 ? opts.durationMs : TOAST_MS;
      toastTimer = global.setTimeout(hideToast, ms);
    }
    return hideToast;
  };

  UI3.closeToast = hideToast;

  /* ------------------------------------------------------------------
     Live region (7.6) — at most one sentence per 2 s, never a stream of digits
     ------------------------------------------------------------------ */

  var sayPending = null;
  var sayTimer = null;
  var sayAt = 0;

  function flushSay() {
    sayTimer = null;
    if (sayPending === null) return;
    var node = byId('ms3Live');
    if (node) node.textContent = sayPending;
    sayPending = null;
    sayAt = Date.now();
  }

  UI3.say = function (textPL) {
    if (!textPL) return;
    // The newest sentence replaces the queued one: an announcement two seconds
    // stale describes light that is already gone.
    sayPending = String(textPL);
    var wait = SAY_MS - (Date.now() - sayAt);
    if (wait <= 0) { flushSay(); return; }
    if (!sayTimer) sayTimer = global.setTimeout(flushSay, wait);
  };

  /* ------------------------------------------------------------------
     Engine state — the live bar needs it, the dashboard owns everything else
     ------------------------------------------------------------------ */

  function bindEngine() {
    if (!Bus || typeof Bus.on !== 'function') return;
    Bus.on('engine:state', function (data) {
      var wasRunning = running;
      running = !!(data && data.state === 'running');
      if (!running) lastReading = null;
      if (wasRunning !== running) renderLiveBars();
    });
    Bus.on('engine:stopped', function () {
      running = false;
      lastReading = null;
      renderLiveBars();
    });
  }

  /* ------------------------------------------------------------------
     Ready
     ------------------------------------------------------------------ */

  var readyQueue = [];
  var isReady = false;

  UI3.ready = function (fn) {
    if (typeof fn !== 'function') return;
    if (Bus && typeof Bus.once === 'function') { Bus.once('app:ready', fn); return; }
    if (isReady) { global.setTimeout(fn, 0); return; }
    readyQueue.push(fn);
  };

  function wireShell() {
    // The MENU key belongs to the control desk (dash.js), but the index it
    // opens belongs to the shell. Both may wire it; openMenu is idempotent, so
    // a double binding opens one screen, not two.
    var menuKey = byId('ms3KeyMenu');
    if (menuKey && !menuKey.getAttribute('data-ms3-menu')) {
      menuKey.setAttribute('data-ms3-menu', '1');
      menuKey.addEventListener('click', function () { UI3.openMenu(); });
    }
    if (doc) doc.addEventListener('keydown', onKeyDown, true);
    if (global.addEventListener) global.addEventListener('popstate', onPopState);
  }

  // Manifest shortcuts land as ?modul=07. Handled after every module has had
  // its chance to register, which happens inside the app:ready callbacks.
  function openFromQuery() {
    var search = '';
    try { search = global.location && global.location.search ? global.location.search : ''; } catch (_) { return; }
    var m = /[?&]modul=([0-9]{1,2})/.exec(search);
    if (!m) return;
    var no = normalizeNo(m[1]);
    if (!no) return;
    if (entryOf(no)) UI3.openScreen(no);
  }

  /* The control desk is the one fixed element every other layout measures against:
     #ms3Screens stops above it, #ms3Scroll pads for it, every module's live bar
     sits on top of it. base.css can only guess its height from the tokens, and the
     guess is wrong in two states that both happen in normal use — the docked
     camera monitor makes it 96 px tall during a measurement, and text scale 1,3
     makes it taller still. A wrong guess does not look like a wrong guess: it
     looks like the live bar of a module has been cut in half.

     So the desk measures itself and publishes its real height. One ResizeObserver,
     one custom property, no polling; browsers without ResizeObserver keep the
     token value and the orientation listener below. */
  function watchDeskHeight() {
    var desk = byId('ms3Desk');
    var el = root();
    if (!desk || !el) return;

    function publish() {
      var h = Math.round(desk.getBoundingClientRect().height);
      if (!h) return;                                    // hidden or not laid out yet
      try { el.style.setProperty('--ms3-desk-total', h + 'px'); } catch (_) {}
    }

    if (typeof global.ResizeObserver === 'function') {
      try { new global.ResizeObserver(publish).observe(desk); } catch (_) {}
    }
    if (global.addEventListener) {
      global.addEventListener('resize', publish, false);
      global.addEventListener('orientationchange', publish, false);
    }
    Bus.on('engine:state', function () { global.setTimeout(publish, 260); });   // after the monitor animates
    Bus.on('ui3:theme', function () { global.setTimeout(publish, 0); });
    publish();
  }

  function boot() {
    ensureSettings();
    applyAll();
    wireShell();
    bindEngine();
    watchDeskHeight();

    isReady = true;
    // engine.js waits for exactly this event to grab #cameraVideo. One
    // macrotask after DOMContentLoaded: the whole static skeleton is parsed and
    // every script has registered its listeners.
    emit('app:ready', {});
    for (var i = 0; i < readyQueue.length; i += 1) {
      try { readyQueue[i](); } catch (err) {
        if (global.console && console.error) console.error('UI3.ready: handler rzucił', err);
      }
    }
    readyQueue.length = 0;

    global.setTimeout(openFromQuery, 0);
  }

  function scheduleBoot() {
    global.setTimeout(boot, 0);
  }

  if (doc) {
    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', scheduleBoot);
    else scheduleBoot();
  }

  global.UI3 = UI3;

}(typeof window !== 'undefined' ? window : globalThis));
