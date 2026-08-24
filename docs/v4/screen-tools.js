/* screen-tools.js — the TOOLS view and the nine tool sheets.
 *
 * Role of this file (SPEC 0.1, author 8):
 *   - registers the `tools` view: a grid of tool cards grouped into four
 *     sections (measurement, data, automation, knowledge);
 *   - implements the nine tools themselves, each one a full-screen sheet:
 *     thresholds, calibration, screen test, reports, export, compare,
 *     schedule, alerts, documentation;
 *   - publishes `window.Tools` so any other screen can open a tool directly
 *     (the history screen links to the export sheet, for instance);
 *   - runs two background workers that must live for as long as the app is
 *     open: the schedule reminder and the alert watcher.
 *
 * Rules this file obeys and the reader should not have to rediscover:
 *   - not one Polish literal lives here. Every sentence comes from
 *     `Scale.TEXT` (which already owns the wording of modules 02-09 and 12)
 *     or from `UI.T`. A missing key renders as an empty string and warns once
 *     in the console; it never throws and never invents wording.
 *   - only classes from SPEC chapter 5 and chapter 9 are used.
 *   - nothing here subscribes to `engine:sample`. The two places that need a
 *     live value (the threshold preview needle and the alert watcher) poll
 *     `Engine.latest()` once a second, which keeps the 5 Hz path free.
 *   - every storage access is wrapped; private mode must not break a tool.
 *   - comments are English, as in engine.js / metrics.js / scale.js, because
 *     SPEC 8.5 point 4 requires screen-*.js to contain no Polish characters.
 */
(function (global) {
  'use strict';

  var doc = global.document;

  /* ------------------------------------------------------------------
     Constants
     ------------------------------------------------------------------ */

  /* This file owns these four keys. The engine's own keys (ms2.*) are never
     touched from here — SPEC 8.4. */
  var KEY_PROFILES = 'ms4.profiles.v1';
  var KEY_SESSIONS = 'ms4.sessions.v1';
  var KEY_SCHEDULE = 'ms4.schedule.v1';
  var KEY_ALERTS = 'ms4.alerts.v1';

  var MINUTE_MS = 60000;
  var HOUR_MS = 3600000;
  var DAY_MS = 86400000;
  var WEEK_MS = 7 * DAY_MS;

  var CALIB_MS = 3000;          // three seconds of white card
  var CALIB_STEP_MS = 200;      // one engine sample per read attempt
  var CALIB_MIN_SAMPLES = 5;
  var CALIB_MIN_LEVEL = 8;      // below this the frame is too dark to trust

  var MAX_SESSIONS = 12;        // kept in storage, oldest dropped first
  var SESSION_POINTS = 90;      // points stored per session — enough for a tape
  var TAPE_BUCKETS = 48;
  var SESSION_MIN_MS = 5000;    // shorter than one history point

  var ALERT_COOLDOWN_MS = 120000;
  var ALERT_MIN_SUSTAIN = 5;
  var ALERT_MAX_SUSTAIN = 3600;
  var ALERT_SLIDER_MAX = 600;   // the slider stops here; stored values may be larger
  var ALERT_STALE_MS = 3000;

  var SCHEDULE_TICK_MS = 20000;
  var WATCH_TICK_MS = 1000;
  var PREVIEW_TICK_MS = 1000;
  var COMMIT_DELAY_MS = 260;    // slider quiet time before the engine hears about it

  var EXPORT_STEP_MS = 5000;    // the engine writes one history point per 5 s
  var PREVIEW_ROWS = 5;

  /* Typographic marks built from code points so that this file stays plain
     ASCII (SPEC 8.5, point 4: no Polish characters in screen-*.js). */
  var RANGE_DASH = ' ' + String.fromCharCode(0x2013) + ' ';   // en dash, "od-do"

  /* ------------------------------------------------------------------
     Wording — Scale.TEXT and UI.T are the only sources (SPEC 0.3, rule 2)
     ------------------------------------------------------------------ */

  var warned = {};

  function lookup(root, path) {
    if (!root) return undefined;
    var parts = path.split('.');
    var cur = root;
    for (var i = 0; i < parts.length; i += 1) {
      if (cur === null || typeof cur !== 'object') return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function dict(path) {
    var found = lookup(global.UI ? global.UI.T : null, path);
    if (found === undefined) found = lookup(global.Scale ? global.Scale.TEXT : null, path);
    return found;
  }

  function warnOnce(path) {
    if (warned[path]) return;
    warned[path] = true;
    if (global.console && global.console.warn) {
      global.console.warn('screen-tools.js: no wording for "' + path + '"');
    }
  }

  /** One sentence. `vars` fills {placeholders}. */
  function T(path, vars) {
    var found = dict(path);
    if (typeof found !== 'string') { warnOnce(path); return ''; }
    return vars ? fill(found, vars) : found;
  }

  /** A list of sentences or of objects (steps, planes, glossary, profiles). */
  function TL(path) {
    var found = dict(path);
    if (!found || typeof found.length !== 'number') { warnOnce(path); return []; }
    return found;
  }

  function fill(tpl, vars) {
    return String(tpl).replace(/\{(\w+)\}/g, function (whole, key) {
      return Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : whole;
    });
  }

  /* ------------------------------------------------------------------
     DOM helpers
     ------------------------------------------------------------------ */

  function el(tag, className, textPL) {
    var node = doc.createElement(tag);
    if (className) node.className = className;
    if (textPL) node.textContent = textPL;
    return node;
  }

  function put(parent, child) {
    if (parent && child) parent.appendChild(child);
    return child;
  }

  function clear(node) {
    while (node && node.firstChild) node.removeChild(node.firstChild);
  }

  function setText(node, textPL) {
    if (node && node.textContent !== textPL) node.textContent = textPL;
  }

  function on(node, event, fn) {
    if (node && node.addEventListener) node.addEventListener(event, fn);
    return function () {
      if (node && node.removeEventListener) node.removeEventListener(event, fn);
    };
  }

  /** UI primitives may return the element itself or a small handle around it. */
  function nodeOf(value) {
    if (!value) return null;
    if (value.nodeType === 1) return value;
    if (value.root && value.root.nodeType === 1) return value.root;
    if (value.el && value.el.nodeType === 1) return value.el;
    if (value.node && value.node.nodeType === 1) return value.node;
    return null;
  }

  function ui() { return global.UI || null; }

  function icon(name, size, className) {
    var lib = ui();
    if (lib && typeof lib.icon === 'function') {
      var svg = lib.icon(name, size, className);
      if (svg) return svg;
    }
    return el('span', className ? className + ' is-hidden' : 'is-hidden');
  }

  function button(opts) {
    var lib = ui();
    if (lib && typeof lib.button === 'function') {
      var made = nodeOf(lib.button(opts));
      if (made) return made;
    }
    // ui.js is loaded before this file, so this branch only ever runs if the
    // primitive is missing entirely. The markup follows SPEC 5.E exactly.
    var btn = el('button', 'ms4-btn ms4-btn--' + (opts.variant || 'ghost') +
      ' ms4-btn--' + (opts.size || 'md') + (opts.full ? ' ms4-btn--full' : ''));
    btn.type = 'button';
    if (opts.icon) {
      put(btn, icon(opts.icon, opts.size === 'sm' ? 20 : 24, 'ms4-btn__icon'));
    }
    put(btn, el('span', 'ms4-btn__label', opts.label));
    if (opts.onClick) on(btn, 'click', opts.onClick);
    return btn;
  }

  function section(titlePL, subtitlePL) {
    var lib = ui();
    if (lib && typeof lib.section === 'function') {
      var made = nodeOf(lib.section(titlePL, subtitlePL));
      if (made) return made;
    }
    var head = el('div', 'ms4-section');
    put(head, el('h2', 'ms4-section__title', titlePL));
    if (subtitlePL) put(head, el('p', 'ms4-section__sub', subtitlePL));
    return head;
  }

  function card(opts) {
    var lib = ui();
    if (lib && typeof lib.card === 'function') {
      var made = lib.card(opts);
      if (made && nodeOf(made) && made.body) return made;
    }
    var root = el('div', 'ms4-card' + (opts.className ? ' ' + opts.className : ''));
    var header = put(root, el('div', 'ms4-card__header'));
    if (opts.title) put(header, el('h3', 'ms4-card__title', opts.title));
    if (opts.subtitle) put(header, el('p', 'ms4-card__subtitle', opts.subtitle));
    var body = put(root, el('div', 'ms4-card__body'));
    return { root: root, body: body, header: header };
  }

  function row(opts) {
    var lib = ui();
    if (lib && typeof lib.row === 'function') {
      var made = nodeOf(lib.row(opts));
      if (made) return made;
    }
    var node = el(opts.onClick ? 'button' : 'div', 'ms4-row');
    if (opts.onClick) { node.type = 'button'; on(node, 'click', opts.onClick); }
    if (opts.icon) {
      var box = put(node, el('span', 'ms4-row__icon'));
      put(box, icon(opts.icon, 24));
    }
    var text = put(node, el('div', 'ms4-row__text'));
    put(text, el('span', 'ms4-row__title', opts.title));
    if (opts.subtitle) put(text, el('span', 'ms4-row__subtitle', opts.subtitle));
    if (opts.value) put(node, el('span', 'ms4-row__value', opts.value));
    if (opts.control) put(node, el('div', 'ms4-row__control')).appendChild(opts.control);
    if (opts.chevron) {
      put(node, icon('chevron-right', 20, 'ms4-row__chevron'));
    }
    return node;
  }

  function list(className) {
    return el('div', 'ms4-list' + (className ? ' ' + className : ''));
  }

  function toast(textPL, tone) {
    var lib = ui();
    if (lib && typeof lib.toast === 'function' && textPL) lib.toast(textPL, tone);
  }

  function say(textPL) {
    var lib = ui();
    if (lib && typeof lib.announce === 'function' && textPL) lib.announce(textPL);
  }

  function confirmDialog(opts) {
    var lib = ui();
    if (lib && typeof lib.dialog === 'function') return lib.dialog(opts);
    return { then: function (fn) { fn(false); } };
  }

  function zoneTone(zone) {
    var lib = ui();
    if (lib && typeof lib.zoneTone === 'function') {
      var tone = lib.zoneTone(zone);
      if (tone) return tone;
    }
    if (zone === 'warning') return 'warn';
    if (zone === 'critical') return 'crit';
    if (zone === 'good') return 'good';
    return null;
  }

  /* A note (SPEC 5.J). `body` is one sentence or an array of them. */
  function note(variant, titlePL, body, iconName) {
    var node = el('aside', 'ms4-note ms4-note--' + variant);
    put(node, icon(iconName || (variant === 'warning' ? 'warning' : 'info'), 20, 'ms4-note__icon'));
    var text = put(node, el('div', 'ms4-note__body'));
    if (titlePL) put(text, el('p', 'ms4-note__title', titlePL));
    var lines = typeof body === 'string' ? [body] : (body || []);
    for (var i = 0; i < lines.length; i += 1) {
      put(text, el('p', 'ms4-note__text', lines[i]));
    }
    return node;
  }

  function emptyState(iconName, titlePL, textPL, action) {
    var lib = ui();
    if (lib && typeof lib.empty === 'function') {
      var made = nodeOf(lib.empty({ icon: iconName, title: titlePL, text: textPL, action: action }));
      if (made) return made;
    }
    var node = el('div', 'ms4-empty');
    var box = put(node, el('div', 'ms4-empty__icon'));
    put(box, icon(iconName, 56));
    if (titlePL) put(node, el('p', 'ms4-empty__title', titlePL));
    if (textPL) put(node, el('p', 'ms4-empty__text', textPL));
    if (action) put(node, action);
    return node;
  }

  /* A table inside a sheet (SPEC 9). Cells are strings or
     { textPL, num, head, lock, tone }. */
  function table(captionPL, headings, rows) {
    var wrap = el('div', 'ms4-scroll-x');
    var tbl = put(wrap, el('table', 'ms4-table'));
    if (captionPL) put(tbl, el('caption', 'ms4-sronly', captionPL));

    var head = put(tbl, el('thead'));
    var htr = put(head, el('tr'));
    for (var i = 0; i < headings.length; i += 1) {
      var th = put(htr, el('th', '', headings[i]));
      th.setAttribute('scope', 'col');
    }

    var body = put(tbl, el('tbody'));
    for (var r = 0; r < rows.length; r += 1) {
      var tr = put(body, el('tr'));
      for (var c = 0; c < rows[r].length; c += 1) {
        var cell = rows[r][c];
        if (typeof cell === 'string') cell = { textPL: cell };
        var td = put(tr, el(cell.head ? 'th' : 'td', cell.num ? 'ms4-num' : ''));
        if (cell.head) td.setAttribute('scope', 'row');
        if (cell.lock) {
          var lock = put(td, el('span', 'ms4-lock'));
          put(lock, icon('lock', 16));
          lock.setAttribute('aria-hidden', 'true');
          put(td, el('span', 'ms4-sronly', T('channels.locked')));
        }
        if (cell.tone) {
          var chip = put(td, el('span', 'ms4-chip ms4-chip--' + cell.tone));
          put(chip, el('span', 'ms4-chip__label', cell.textPL));
        } else if (cell.textPL) {
          put(td, el('span', '', cell.textPL));
        }
      }
    }
    return wrap;
  }

  function steps(listPL) {
    var ol = el('ol', 'ms4-steps');
    for (var i = 0; i < listPL.length; i += 1) {
      put(ol, el('li', 'ms4-steps__item', listPL[i]));
    }
    return ol;
  }

  function field(labelPL, control, hintPL, forId) {
    var wrap = el('div', 'ms4-stack');
    if (labelPL) {
      var label = put(wrap, el('label', 'ms4-field__label', labelPL));
      if (forId) label.setAttribute('for', forId);
    }
    put(wrap, control);
    if (hintPL) put(wrap, el('p', 'ms4-field__hint', hintPL));
    return wrap;
  }

  function select(id, options, value, onChange) {
    var node = el('select', 'ms4-select');
    node.id = id;
    for (var i = 0; i < options.length; i += 1) {
      var opt = el('option', '', options[i].labelPL);
      opt.value = String(options[i].value);
      if (String(options[i].value) === String(value)) opt.selected = true;
      put(node, opt);
    }
    on(node, 'change', function () { onChange(node.value); });
    return node;
  }

  function segmented(ariaPL, options, value, onChange) {
    var lib = ui();
    var normalised = [];
    for (var i = 0; i < options.length; i += 1) {
      normalised.push({
        value: options[i].value,
        label: options[i].labelPL,
        labelPL: options[i].labelPL
      });
    }
    if (lib && typeof lib.segmented === 'function') {
      var made = nodeOf(lib.segmented({
        options: normalised, value: value, onChange: onChange,
        ariaLabel: ariaPL, full: true
      }));
      if (made) return made;
    }
    var group = el('div', 'ms4-segmented ms4-segmented--full');
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', ariaPL);
    var buttons = [];
    function paint(active) {
      for (var b = 0; b < buttons.length; b += 1) {
        var isOn = buttons[b].getAttribute('data-value') === String(active);
        buttons[b].className = 'ms4-segmented__option' + (isOn ? ' is-active' : '');
        buttons[b].setAttribute('aria-pressed', isOn ? 'true' : 'false');
      }
    }
    for (var j = 0; j < options.length; j += 1) {
      (function (item) {
        var btn = el('button', 'ms4-segmented__option', item.labelPL);
        btn.type = 'button';
        btn.setAttribute('data-value', String(item.value));
        on(btn, 'click', function () { paint(item.value); onChange(String(item.value)); });
        buttons.push(put(group, btn));
      }(options[j]));
    }
    paint(value);
    return group;
  }

  function switchControl(labelPL, checked, onChange) {
    var lib = ui();
    if (lib && typeof lib.switch === 'function') {
      var made = nodeOf(lib.switch({ label: labelPL, checked: checked, onChange: onChange }));
      if (made) return made;
    }
    var wrap = el('div', 'ms4-row-inline');
    var btn = put(wrap, el('button', 'ms4-switch' + (checked ? ' is-checked' : '')));
    btn.type = 'button';
    btn.setAttribute('role', 'switch');
    btn.setAttribute('aria-checked', checked ? 'true' : 'false');
    var track = put(btn, el('span', 'ms4-switch__track'));
    put(track, el('span', 'ms4-switch__thumb'));
    put(wrap, el('span', 'ms4-switch__label', labelPL));
    on(btn, 'click', function () {
      checked = !checked;
      btn.className = 'ms4-switch' + (checked ? ' is-checked' : '');
      btn.setAttribute('aria-checked', checked ? 'true' : 'false');
      onChange(checked);
    });
    return wrap;
  }

  function slider(opts) {
    var lib = ui();
    if (lib && typeof lib.slider === 'function') {
      var made = lib.slider(opts);
      var node = nodeOf(made);
      if (node) return { root: node, handle: made };
    }
    var wrap = el('div', 'ms4-slider');
    var head = put(wrap, el('div', 'ms4-slider__head'));
    put(head, el('span', 'ms4-slider__label', opts.label));
    var out = put(head, el('span', 'ms4-slider__value', opts.format ? opts.format(opts.value) : String(opts.value)));
    var input = put(wrap, el('input', 'ms4-slider__input'));
    input.type = 'range';
    input.min = String(opts.min);
    input.max = String(opts.max);
    input.step = String(opts.step);
    input.value = String(opts.value);
    input.setAttribute('aria-label', opts.label);
    on(input, 'input', function () {
      var v = Number(input.value);
      setText(out, opts.format ? opts.format(v) : String(v));
      input.setAttribute('aria-valuetext', out.textContent);
      opts.onChange(v);
    });
    return { root: wrap, handle: { input: input, output: out } };
  }

  /** Moves a slider back to a value the engine actually accepted. */
  function setSliderValue(entry, value, formatFn) {
    if (!entry) return;
    var handle = entry.handle;
    if (handle && typeof handle.setValue === 'function') { handle.setValue(value); return; }
    var input = (handle && handle.input) || (entry.root ? entry.root.querySelector('input[type="range"]') : null);
    if (input) input.value = String(value);
    var out = (handle && handle.output) || (entry.root ? entry.root.querySelector('.ms4-slider__value') : null);
    if (out && formatFn) setText(out, formatFn(value));
  }

  /* ------------------------------------------------------------------
     Numbers, dates, engine access
     ------------------------------------------------------------------ */

  function isNum(v) { return typeof v === 'number' && isFinite(v); }

  function E() { return global.Engine || null; }
  function S() { return global.Scale || null; }

  function catalogue() {
    return global.Metrics && global.Metrics.CATALOGUE ? global.Metrics.CATALOGUE : [];
  }

  function metric(id) {
    return global.Metrics && global.Metrics.byId ? global.Metrics.byId(id) : null;
  }

  function thresholds() {
    var engine = E();
    if (!engine || typeof engine.getThresholds !== 'function') return null;
    try { return engine.getThresholds(); } catch (err) { return null; }
  }

  function history(opts) {
    var engine = E();
    if (!engine || typeof engine.history !== 'function') return [];
    try { return engine.history(opts) || []; } catch (err) { return []; }
  }

  function latest() {
    var engine = E();
    if (!engine || typeof engine.latest !== 'function') return null;
    try { return engine.latest(); } catch (err) { return null; }
  }

  function leadId() {
    var store = global.Store;
    var id = null;
    if (store && typeof store.get === 'function') {
      try { id = store.get().leadMetric; } catch (err) { id = null; }
    }
    return metric(id) ? id : 'share';
  }

  /* The catalogue says a metric is paid; whether it is unlocked right now is
     billing.js's business. Anything unknown stays locked. */
  function isLocked(m) {
    if (!m || !m.premium) return false;
    var billing = global.Billing;
    if (billing && typeof billing.isUnlocked === 'function') {
      try { if (billing.isUnlocked(m.id)) return false; } catch (err) { /* stays locked */ }
    }
    return true;
  }

  function openPaywall(source, metricId) {
    var billing = global.Billing;
    if (billing && typeof billing.openPaywall === 'function') {
      billing.openPaywall({ source: source, metricId: metricId });
    }
  }

  function fmt(id, value) {
    var scale = S();
    return scale ? scale.formatValue(id, value) : String(value);
  }

  function unitSuffix(id) {
    var scale = S();
    return scale && scale.unitSuffix ? scale.unitSuffix(id) : '';
  }

  function fmtUnit(id, value) {
    if (!isNum(value)) return T('common.noValue');
    return fmt(id, value) + unitSuffix(id);
  }

  function durationWords(ms) {
    var scale = S();
    return scale && scale.durationWords ? scale.durationWords(ms) : String(Math.round(ms / 1000));
  }

  function zoneOf(id, value, map) {
    var scale = S();
    if (!scale || !isNum(value)) return null;
    return scale.zone(id, value, map);
  }

  /* Digits and separators only — these strings carry no Polish and are the
     same in the interface and inside an exported file. */
  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  function fmtDate(ms) {
    var d = new Date(ms);
    return pad2(d.getDate()) + '.' + pad2(d.getMonth() + 1) + '.' + d.getFullYear();
  }

  function fmtClock(ms) {
    var d = new Date(ms);
    return pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
  }

  function fmtHm(ms) {
    var d = new Date(ms);
    return pad2(d.getHours()) + ':' + pad2(d.getMinutes());
  }

  function minutesToHm(minutes) {
    return pad2(Math.floor(minutes / 60)) + ':' + pad2(minutes % 60);
  }

  function hmToMinutes(text) {
    var parts = /^(\d{1,2}):(\d{2})$/.exec(text || '');
    if (!parts) return null;
    var h = Number(parts[1]), m = Number(parts[2]);
    if (h > 23 || m > 59) return null;
    return h * 60 + m;
  }

  function worseZone(a, b) {
    var rank = { good: 1, warning: 2, critical: 3 };
    if (!b) return a;
    if (!a) return b;
    return rank[b] > rank[a] ? b : a;
  }

  /* ------------------------------------------------------------------
     Storage
     ------------------------------------------------------------------ */

  function readJson(key, fallback) {
    try {
      var raw = global.localStorage.getItem(key);
      if (!raw) return fallback;
      var parsed = JSON.parse(raw);
      return parsed === null || parsed === undefined ? fallback : parsed;
    } catch (err) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      global.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      return false;
    }
  }

  function removeKey(key) {
    try { global.localStorage.removeItem(key); } catch (err) { /* nothing to undo */ }
  }

  function isArray(v) {
    return Object.prototype.toString.call(v) === '[object Array]';
  }

  /* ------------------------------------------------------------------
     Sheet plumbing

     Every tool is a full-screen sheet. A tool keeps its live wiring —
     bus subscriptions, timers, gauges — on the handle it is given, and the
     shared teardown below unhooks all of it when the sheet closes. Nothing
     from a closed tool survives, which is what makes nine tools affordable.
     ------------------------------------------------------------------ */

  function makeHandle() {
    var handle = {
      offs: [],
      timers: [],
      gauges: [],
      sheet: null,
      own: function (off) { if (typeof off === 'function') handle.offs.push(off); return off; },
      bus: function (event, fn) {
        if (!global.Bus) return;
        handle.own(global.Bus.on(event, fn));
      },
      every: function (ms, fn) {
        var id = global.setInterval(fn, ms);
        handle.timers.push(id);
        return id;
      },
      gauge: function (g) { if (g) handle.gauges.push(g); return g; },
      close: function () { if (handle.sheet && handle.sheet.close) handle.sheet.close(); }
    };
    return handle;
  }

  function teardown(handle) {
    var i;
    for (i = 0; i < handle.offs.length; i += 1) {
      try { handle.offs[i](); } catch (err) { /* already detached */ }
    }
    for (i = 0; i < handle.timers.length; i += 1) global.clearInterval(handle.timers[i]);
    for (i = 0; i < handle.gauges.length; i += 1) {
      try { if (handle.gauges[i].destroy) handle.gauges[i].destroy(); } catch (err) { /* gone */ }
    }
    handle.offs = [];
    handle.timers = [];
    handle.gauges = [];
  }

  /** Opens one tool sheet. `build(body, handle)` fills the sheet body. */
  function openTool(opts) {
    var lib = ui();
    if (!lib || typeof lib.sheet !== 'function') return null;

    var handle = makeHandle();
    var body = el('div', 'ms4-stack');
    var actions = opts.actions ? opts.actions(handle) : null;

    opts.build(body, handle);

    handle.sheet = lib.sheet({
      title: opts.title,
      subtitle: opts.subtitle,
      size: 'full',
      body: body,
      actions: actions,
      onClose: function () { teardown(handle); }
    });
    return handle;
  }

  /** The button every tool sheet carries on the right of its action bar. */
  function closeAction(handle) {
    return button({
      label: T('confirm.close'),
      variant: 'ghost',
      size: 'md',
      onClick: function () { handle.close(); }
    });
  }

  /* ==================================================================
     02 — Progi (thresholds)
     ================================================================== */

  /* Editorial judgements, not standards. The evening profile is stricter
     about everything connected with sleep; the desk profile loosens
     brightness so a well lit room in daylight is not a warning all day. */
  var BUILTIN_MAPS = {
    'builtin.default': null,          // null = Engine.defaultThresholds()
    'builtin.evening': {
      share: { warn: 20, crit: 26 },
      brightness: { warn: 55, crit: 75 },
      kelvin: { warn: 3400, crit: 4600 },
      melanopic: { warn: 0.45, crit: 0.75 }
    },
    'builtin.work': {
      share: { warn: 30, crit: 38 },
      brightness: { warn: 82, crit: 94 },
      kelvin: { warn: 6000, crit: 7200 },
      melanopic: { warn: 1.0, crit: 1.3 },
      flicker: { warn: 6, crit: 14 },
      uniformity: { warn: 70, crit: 45 }
    }
  };

  function customProfiles() {
    var stored = readJson(KEY_PROFILES, []);
    return isArray(stored) ? stored : [];
  }

  function listProfiles() {
    var out = [];
    var builtin = TL('modules.02.builtin');
    var i;
    for (i = 0; i < builtin.length; i += 1) {
      out.push({
        id: builtin[i].id, namePL: builtin[i].namePL,
        descPL: builtin[i].descPL, builtin: true
      });
    }
    var custom = customProfiles();
    for (i = 0; i < custom.length; i += 1) {
      out.push({
        id: custom[i].id,
        namePL: custom[i].namePL,
        descPL: T('modules.02.profileCustomTpl', { date: fmtDate(custom[i].at) }),
        builtin: false
      });
    }
    return out;
  }

  function profileMap(id) {
    if (Object.prototype.hasOwnProperty.call(BUILTIN_MAPS, id)) {
      if (BUILTIN_MAPS[id]) return BUILTIN_MAPS[id];
      var engine = E();
      return engine && engine.defaultThresholds ? engine.defaultThresholds() : null;
    }
    var custom = customProfiles();
    for (var i = 0; i < custom.length; i += 1) if (custom[i].id === id) return custom[i].map;
    return null;
  }

  function sliderStep(m) {
    if (m.id === 'kelvin') return 100;
    if (m.decimals >= 2) return 0.01;
    if (m.decimals === 1) return 0.5;
    return 1;
  }

  /* The preview under each pair of sliders: the zone bands as the thresholds
     currently draw them, the major ticks of the scale, and a needle that
     follows the live reading once a second. */
  function miniScale(m) {
    var wrap = el('div', 'ms4-miniscale');
    wrap.setAttribute('role', 'img');
    wrap.setAttribute('aria-label', T('modules.02.previewAriaTpl', { name: m.namePL }));
    var bands = put(wrap, el('div', 'ms4-miniscale__bands'));
    var ticks = put(wrap, el('div', 'ms4-miniscale__ticks'));
    var needle = put(wrap, el('div', 'ms4-miniscale__needle'));
    needle.hidden = true;
    var labels = put(wrap, el('div', 'ms4-miniscale__labels'));
    return { root: wrap, bands: bands, ticks: ticks, needle: needle, labels: labels };
  }

  function paintMiniScale(entry, map) {
    var scale = S();
    if (!scale) return;
    var id = entry.metric.id;
    var i, span;

    clear(entry.preview.bands);
    var bandList = scale.bands(id, map) || [];
    for (i = 0; i < bandList.length; i += 1) {
      var zone = bandList[i].zone;
      span = el('span', 'ms4-miniscale__band ms4-miniscale__band--' + (zoneTone(zone) || 'good'));
      span.style.left = bandList[i].from + '%';
      span.style.width = Math.max(0, bandList[i].to - bandList[i].from) + '%';
      put(entry.preview.bands, span);
    }

    var marks = scale.ticks(id) || { major: [], minor: [] };
    clear(entry.preview.ticks);
    clear(entry.preview.labels);
    for (i = 0; i < marks.major.length; i += 1) {
      span = el('span', 'ms4-miniscale__tick');
      span.style.left = marks.major[i].pos + '%';
      put(entry.preview.ticks, span);
      var label = el('span', 'ms4-miniscale__label', marks.major[i].labelPL);
      label.style.left = marks.major[i].pos + '%';
      put(entry.preview.labels, label);
    }
  }

  function thresholdCard(state, m) {
    var built = card({ title: m.namePL + ' (' + m.unit + ')', subtitle: m.shortPL });
    var entry = { metric: m, pending: null, commitTimer: null };
    state.rows[m.id] = entry;

    entry.preview = miniScale(m);
    put(built.body, entry.preview.root);
    entry.now = put(built.body, el('p', 'ms4-muted', ''));

    function formatFn(value) { return fmtUnit(m.id, value); }

    function change(which) {
      return function (value) {
        entry.pending = entry.pending || {};
        entry.pending[which] = value;
        if (entry.commitTimer) global.clearTimeout(entry.commitTimer);
        entry.commitTimer = global.setTimeout(function () {
          entry.commitTimer = null;
          commitThresholds(state, entry);
        }, COMMIT_DELAY_MS);
      };
    }

    var map = thresholds() || {};
    var current = map[m.id] || { warn: m.warn, crit: m.crit };

    entry.warn = slider({
      label: T('modules.02.warnLabel'), min: m.min, max: m.max, step: sliderStep(m),
      value: current.warn, format: formatFn, onChange: change('warn')
    });
    entry.crit = slider({
      label: T('modules.02.critLabel'), min: m.min, max: m.max, step: sliderStep(m),
      value: current.crit, format: formatFn, onChange: change('crit')
    });
    entry.format = formatFn;
    put(built.body, entry.warn.root);
    put(built.body, entry.crit.root);

    put(built.body, el('p', 'ms4-field__hint',
      m.invert ? T('modules.02.orderInvert') : T('modules.02.orderNormal')));

    return built.root;
  }

  /* The engine validates the pair all-or-nothing: warn below crit normally,
     warn above crit for an inverted metric. A refused pair is not repaired
     here — the sliders go back to what is really in force and the user is
     told why, because a half-applied threshold is a threshold nobody set. */
  function commitThresholds(state, entry) {
    var engine = E();
    if (!engine || typeof engine.setThresholds !== 'function' || !entry.pending) return;
    var patch = {};
    patch[entry.metric.id] = entry.pending;
    entry.pending = null;
    if (engine.setThresholds(patch, 'user')) {
      toast(T('transient.thresholdsSaved'), 'good');
      return;
    }
    toast(T('transient.thresholdsRejected'), 'warn');
    syncThresholds(state);
  }

  function syncThresholds(state) {
    var map = thresholds();
    if (!map) return;
    for (var id in state.rows) {
      if (!Object.prototype.hasOwnProperty.call(state.rows, id)) continue;
      var entry = state.rows[id];
      var t = map[id];
      if (!t || !entry.warn) continue;
      setSliderValue(entry.warn, t.warn, entry.format);
      setSliderValue(entry.crit, t.crit, entry.format);
      paintMiniScale(entry, map);
    }
  }

  function paintThresholdNeedles(state) {
    var scale = S();
    var reading = latest();
    var values = reading && reading.values ? reading.values : null;
    for (var id in state.rows) {
      if (!Object.prototype.hasOwnProperty.call(state.rows, id)) continue;
      var entry = state.rows[id];
      if (!entry.preview) continue;
      var value = values && !isLocked(entry.metric) ? values[id] : null;
      var pos = scale && isNum(value) ? scale.pos(id, value) : null;
      if (pos === null || pos === undefined) {
        entry.preview.needle.hidden = true;
        setText(entry.now, '');
      } else {
        entry.preview.needle.hidden = false;
        entry.preview.needle.style.left = pos + '%';
        setText(entry.now, T('modules.02.nowTpl', { value: fmtUnit(id, value) }));
      }
    }
  }

  function profilesSection(state) {
    var wrap = el('div', 'ms4-stack');
    put(wrap, section(T('modules.02.profilesTitle')));
    put(wrap, el('p', 'ms4-field__hint', T('modules.02.profilesHint')));

    state.profileList = put(wrap, list());
    renderProfiles(state);

    var input = el('input', 'ms4-field');
    input.type = 'text';
    input.id = 'ms4ProfileName';
    input.maxLength = 40;
    state.nameInput = input;
    put(wrap, field(T('modules.02.profileNameLabel'), input,
      T('modules.02.profileNameHint'), 'ms4ProfileName'));

    put(wrap, button({
      label: T('modules.02.profileSaveKey'), variant: 'tonal', size: 'md', icon: 'plus',
      onClick: function () { saveProfile(state); }
    }));
    return wrap;
  }

  function renderProfiles(state) {
    if (!state.profileList) return;
    clear(state.profileList);
    var items = listProfiles();
    for (var i = 0; i < items.length; i += 1) {
      (function (profile) {
        var controls = el('div', 'ms4-row-inline');
        put(controls, button({
          label: T('modules.02.profileApply'), variant: 'tonal', size: 'sm',
          onClick: function () { applyProfile(state, profile); }
        }));
        if (!profile.builtin) {
          put(controls, button({
            label: T('modules.02.profileRemove'), variant: 'ghost', size: 'sm',
            onClick: function () { removeProfile(state, profile); }
          }));
        }
        put(state.profileList, row({
          icon: 'sliders', title: profile.namePL, subtitle: profile.descPL, control: controls
        }));
      }(items[i]));
    }
  }

  function applyProfile(state, profile) {
    var engine = E();
    var map = profileMap(profile.id);
    if (!engine || !map || typeof engine.setThresholds !== 'function' ||
        !engine.setThresholds(map, 'profile')) {
      toast(T('modules.02.profileFailed'), 'warn');
      return;
    }
    syncThresholds(state);
    toast(T('modules.02.profileAppliedTpl', { name: profile.namePL }), 'good');
  }

  function saveProfile(state) {
    var engine = E();
    if (!engine || typeof engine.getThresholds !== 'function') return;
    var name = (state.nameInput ? state.nameInput.value : '').replace(/^\s+|\s+$/g, '');
    if (!name) { toast(T('modules.02.profileNameEmpty'), 'warn'); return; }
    var items = customProfiles();
    items.push({
      id: 'user.' + Date.now().toString(36),
      namePL: name.slice(0, 40),
      map: engine.getThresholds(),
      at: Date.now()
    });
    writeJson(KEY_PROFILES, items);
    state.nameInput.value = '';
    renderProfiles(state);
    toast(T('modules.02.profileSavedTpl', { name: name }), 'good');
  }

  function removeProfile(state, profile) {
    var items = customProfiles();
    var kept = [];
    for (var i = 0; i < items.length; i += 1) {
      if (items[i].id !== profile.id) kept.push(items[i]);
    }
    writeJson(KEY_PROFILES, kept);
    renderProfiles(state);
    toast(T('modules.02.profileRemovedTpl', { name: profile.namePL }), 'good');
  }

  function openThresholds() {
    var state = { rows: {}, profileList: null, nameInput: null };
    return openTool({
      title: T('tools.thresholds'),
      subtitle: T('modules.02.descPL'),
      actions: function (handle) {
        return [
          button({
            label: T('common.reset'), variant: 'ghost', size: 'md', icon: 'refresh',
            onClick: function () {
              var engine = E();
              if (!engine || typeof engine.resetThresholds !== 'function') return;
              engine.resetThresholds();
              syncThresholds(state);
              toast(T('modules.02.resetDone'), 'good');
            }
          }),
          closeAction(handle)
        ];
      },
      build: function (body, handle) {
        put(body, note('limits', T('modules.02.introTitle'), T('modules.02.intro')));

        var items = catalogue();
        for (var i = 0; i < items.length; i += 1) put(body, thresholdCard(state, items[i]));

        put(body, el('hr', 'ms4-divider'));
        put(body, profilesSection(state));

        syncThresholds(state);
        paintThresholdNeedles(state);
        handle.every(PREVIEW_TICK_MS, function () { paintThresholdNeedles(state); });
        handle.bus('engine:thresholds', function () { syncThresholds(state); });
      }
    });
  }

  /* ==================================================================
     03 — Kalibracja (calibration)
     ================================================================== */

  function gainText(v) {
    return v.toFixed(3).replace('.', ',');
  }

  function renderCalibrationStatus(state) {
    var engine = E();
    var info = engine && typeof engine.getCalibration === 'function' ? engine.getCalibration() : null;

    setText(state.status, info
      ? T('modules.03.statusOnTpl', { date: fmtDate(info.at), time: fmtHm(info.at) })
      : T('modules.03.statusNone'));

    clear(state.gains);
    var rows;
    if (info) {
      rows = [
        [{ textPL: T('modules.03.gainR'), head: true }, { textPL: gainText(info.gainR), num: true }],
        [{ textPL: T('modules.03.gainG'), head: true }, { textPL: gainText(info.gainG), num: true }],
        [{ textPL: T('modules.03.gainB'), head: true }, { textPL: gainText(info.gainB), num: true }]
      ];
    } else {
      rows = [[{ textPL: T('modules.03.gainsTitle'), head: true }, { textPL: T('modules.03.gainsNone') }]];
    }
    put(state.gains, table(T('modules.03.gainsTitle'),
      [T('modules.03.colChannel'), T('modules.03.colGain')], rows));
  }

  function startCalibration(state) {
    var engine = E();
    if (state.running || !engine) return;
    if (typeof engine.isRunning !== 'function' || !engine.isRunning()) {
      toast(T('modules.03.needRunning'), 'warn');
      return;
    }

    state.running = true;
    if (state.runKey) state.runKey.setAttribute('aria-busy', 'true');

    /* Odczyty z Engine.latest() są JUŻ pomnożone przez zapisane wzmocnienia, a
       setCalibration zastępuje je, nie mnoży. Bez wyzerowania druga kalibracja tej
       samej karty dałaby wzmocnienia ≈ 1,00 i skasowała poprzednią korektę.
       Zbieramy więc próbki surowe; poprzednie wzmocnienia wracają, jeśli seria
       się nie uda albo arkusz zostanie zamknięty w trakcie. */
    state.prevCal = typeof engine.getCalibration === 'function' ? engine.getCalibration() : null;
    if (typeof engine.setCalibration === 'function') engine.setCalibration(null);
    if (state.handle && !state.restoreOwned) {
      state.restoreOwned = true;
      state.handle.own(function () { restoreCalibration(state); });
    }

    var sumR = 0, sumG = 0, sumB = 0, n = 0;
    var startedAt = Date.now();

    var timer = global.setInterval(function () {
      var reading = latest();
      if (reading) { sumR += reading.r; sumG += reading.g; sumB += reading.b; n += 1; }

      var elapsed = Date.now() - startedAt;
      var left = Math.max(0, Math.ceil((CALIB_MS - elapsed) / 1000));
      setText(state.status, T('modules.03.busyTpl', { sec: left }));
      if (elapsed < CALIB_MS) return;

      global.clearInterval(timer);
      state.running = false;
      if (state.runKey) state.runKey.removeAttribute('aria-busy');
      finishCalibration(state, sumR, sumG, sumB, n);
    }, CALIB_STEP_MS);
    state.handle.timers.push(timer);
  }

  /** Przywraca wzmocnienia sprzed nieudanej (lub przerwanej) serii. */
  function restoreCalibration(state) {
    if (!state.running && !state.prevCal) return;
    var engine = E();
    state.running = false;
    if (engine && typeof engine.setCalibration === 'function') {
      engine.setCalibration(state.prevCal || null);
    }
    state.prevCal = null;
  }

  function finishCalibration(state, sumR, sumG, sumB, n) {
    var engine = E();
    if (n < CALIB_MIN_SAMPLES) {
      restoreCalibration(state);
      renderCalibrationStatus(state);
      toast(T('modules.03.tooFew'), 'warn');
      return;
    }
    var r = sumR / n, g = sumG / n, b = sumB / n;
    if (r < CALIB_MIN_LEVEL || g < CALIB_MIN_LEVEL || b < CALIB_MIN_LEVEL) {
      restoreCalibration(state);
      renderCalibrationStatus(state);
      toast(T('modules.03.tooDark'), 'warn');
      return;
    }
    // Equalising the three channel means is the whole method: R = G = B on a
    // surface we have been told is neutral.
    var target = (r + g + b) / 3;
    var ok = engine.setCalibration({
      gainR: target / r, gainG: target / g, gainB: target / b, at: Date.now()
    });
    if (ok) state.prevCal = null;      /* nowe wzmocnienia obowiązują */
    else restoreCalibration(state);    /* silnik odmówił — wracamy do poprzednich */
    renderCalibrationStatus(state);
    toast(ok ? T('modules.03.done') : T('modules.03.refused'), ok ? 'good' : 'warn');
    if (ok) say(T('modules.03.done'));
  }

  function openCalibration() {
    var state = {
      status: null, gains: null, runKey: null, running: false, handle: null,
      prevCal: null, restoreOwned: false
    };
    return openTool({
      title: T('tools.calibration'),
      subtitle: T('modules.03.descPL'),
      actions: function (handle) { return [closeAction(handle)]; },
      build: function (body, handle) {
        state.handle = handle;

        put(body, note('info', T('modules.03.whyTitle'), T('modules.03.why'), 'bulb'));

        put(body, section(T('modules.03.stepsTitle')));
        put(body, steps(TL('modules.03.steps')));

        var run = card({ title: T('modules.03.gainsTitle') });
        state.status = put(run.body, el('p', 'ms4-muted', ''));
        state.gains = put(run.body, el('div', ''));
        var actions = put(run.body, el('div', 'ms4-row-inline'));
        state.runKey = put(actions, button({
          label: T('modules.03.runKey'), variant: 'primary', size: 'md', icon: 'calibrate',
          onClick: function () { startCalibration(state); }
        }));
        put(actions, button({
          label: T('modules.03.clearKey'), variant: 'ghost', size: 'md', icon: 'trash',
          onClick: function () {
            var engine = E();
            state.prevCal = null;   /* świadome wyczyszczenie — nie ma czego przywracać */
            if (engine && typeof engine.setCalibration === 'function') engine.setCalibration(null);
            renderCalibrationStatus(state);
            toast(T('modules.03.cleared'), 'info');
          }
        }));
        put(body, run.root);

        put(body, note('warning', T('modules.03.limitsTitle'), TL('modules.03.limits'), 'warning'));

        renderCalibrationStatus(state);
        handle.bus('engine:calibration', function () { renderCalibrationStatus(state); });
      }
    });
  }

  /* ==================================================================
     04 — Raporty (reports)
     ================================================================== */

  function reportData(kind) {
    var span = kind === 'week' ? WEEK_MS : DAY_MS;
    var bucketMs = kind === 'week' ? DAY_MS : HOUR_MS;
    var count = kind === 'week' ? 7 : 24;
    var until = Date.now();
    var from = until - span;
    var points = history({ sinceMs: from, untilMs: until });

    var map = thresholds();
    var lead = leadId();
    var items = catalogue();
    var ids = [];
    var i, j;
    for (i = 0; i < items.length; i += 1) ids.push(items[i].id);

    var acc = {};
    for (i = 0; i < ids.length; i += 1) acc[ids[i]] = { sum: 0, n: 0, min: Infinity, max: -Infinity };

    var zones = { good: 0, warning: 0, critical: 0 };
    var slots = [];
    for (i = 0; i < count; i += 1) {
      slots.push({ t: from + i * bucketMs, sum: 0, n: 0, min: Infinity, max: -Infinity, zone: null });
    }
    var hours = {};

    for (i = 0; i < points.length; i += 1) {
      var p = points[i];
      for (j = 0; j < ids.length; j += 1) {
        var v = p[ids[j]];
        if (!isNum(v)) continue;
        var a = acc[ids[j]];
        a.sum += v; a.n += 1;
        if (v < a.min) a.min = v;
        if (v > a.max) a.max = v;
      }

      // point.zone is always the blue-share zone, so the zone of the lead
      // channel is computed here rather than read.
      var zone = zoneOf(lead, p[lead], map);
      if (zone && zones[zone] !== undefined) zones[zone] += 1;

      var index = Math.floor((p.t - from) / bucketMs);
      if (index >= 0 && index < count) {
        var slot = slots[index];
        var lv = p[lead];
        if (isNum(lv)) {
          slot.sum += lv; slot.n += 1;
          if (lv < slot.min) slot.min = lv;
          if (lv > slot.max) slot.max = lv;
        }
        slot.zone = worseZone(slot.zone, zone);
      }

      var hour = new Date(p.t).getHours();
      if (!hours[hour]) hours[hour] = { bad: 0, n: 0 };
      hours[hour].n += 1;
      if (zone === 'warning') hours[hour].bad += 1;
      if (zone === 'critical') hours[hour].bad += 2;
    }

    var avg = {}, min = {}, max = {};
    for (i = 0; i < ids.length; i += 1) {
      var e = acc[ids[i]];
      avg[ids[i]] = e.n ? e.sum / e.n : null;
      min[ids[i]] = e.n ? e.min : null;
      max[ids[i]] = e.n ? e.max : null;
    }

    var buckets = [];
    var covered = 0;
    for (i = 0; i < slots.length; i += 1) {
      var s = slots[i];
      if (s.n) covered += 1;
      buckets.push({
        t: s.t,
        avg: s.n ? s.sum / s.n : null,
        min: s.n ? s.min : null,
        max: s.n ? s.max : null,
        zone: s.zone
      });
    }

    // Worst hour: the highest share of samples outside the good band. Three
    // samples is not an hour, so those are skipped.
    var worstHour = null, worstScore = 0;
    for (var h in hours) {
      if (!Object.prototype.hasOwnProperty.call(hours, h)) continue;
      if (hours[h].n < 3) continue;
      var score = hours[h].bad / hours[h].n;
      if (score >= worstScore && score > 0) { worstScore = score; worstHour = Number(h); }
    }

    return {
      kind: kind, fromMs: from, untilMs: until, samples: points.length,
      avg: avg, min: min, max: max, zones: zones, buckets: buckets,
      covered: covered, count: count,
      worstHour: worstHour, worstScore: worstScore, leadId: lead
    };
  }

  function reportAdvice(data) {
    var out = [];
    var avg = data.avg;
    if (isNum(avg.melanopic) && avg.melanopic > 0.8 && !isLocked(metric('melanopic'))) {
      out.push(T('modules.04.adviceMelanopicTpl', { value: fmt('melanopic', avg.melanopic) }));
    }
    if (isNum(avg.kelvin) && avg.kelvin > 5000) {
      out.push(T('modules.04.adviceKelvinTpl', { value: fmt('kelvin', avg.kelvin) }));
    }
    if (isNum(avg.flicker) && avg.flicker > 8 && !isLocked(metric('flicker'))) {
      out.push(T('modules.04.adviceFlickerTpl', { value: fmt('flicker', avg.flicker) }));
    }
    if (isNum(avg.uniformity) && avg.uniformity < 60 && !isLocked(metric('uniformity'))) {
      out.push(T('modules.04.adviceUniformityTpl', { value: fmt('uniformity', avg.uniformity) }));
    }
    if (data.worstHour !== null && data.worstScore > 0.2) {
      out.push(T('modules.04.adviceWorstTpl', { hour: pad2(data.worstHour) + ':00' }));
    }
    if (!out.length) out.push(T('modules.04.adviceNone'));
    return out.slice(0, 3);
  }

  /* The share of time each zone held, as one bar plus a legend. Colour is
     never alone: every segment is named in the legend next to its share. */
  function zoneBar(zones) {
    var wrap = el('div', 'ms4-stack');
    var total = zones.good + zones.warning + zones.critical;
    var bar = put(wrap, el('div', 'ms4-zonebar'));
    var legend = put(wrap, el('div', 'ms4-zonebar__legend'));
    var order = [
      { zone: 'good', labelPL: T('modules.04.zoneGood') },
      { zone: 'warning', labelPL: T('modules.04.zoneWarning') },
      { zone: 'critical', labelPL: T('modules.04.zoneCritical') }
    ];
    for (var i = 0; i < order.length; i += 1) {
      var count = zones[order[i].zone];
      var share = total ? Math.round((count / total) * 100) : 0;
      var tone = zoneTone(order[i].zone);
      var seg = put(bar, el('span', 'ms4-zonebar__seg ms4-zonebar__seg--' + tone));
      seg.style.width = share + '%';
      var item = put(legend, el('span', 'ms4-chip ms4-chip--' + tone));
      put(item, el('span', 'ms4-chip__label', order[i].labelPL + ' ' + share + '%'));
    }
    return wrap;
  }

  function renderReport(state) {
    if (!state.body) return;
    clear(state.body);
    if (state.panorama) {
      try { state.panorama.destroy(); } catch (err) { /* gone */ }
      state.panorama = null;
    }

    var data = reportData(state.kind);
    var lead = metric(data.leadId);

    if (!data.samples) {
      put(state.body, emptyState('report', T('modules.04.titlePL'), T('empty.reportsNoData')));
      return;
    }

    put(state.body, el('p', 'ms4-muted', T('modules.04.headTpl', {
      from: fmtDate(data.fromMs), to: fmtDate(data.untilMs), count: data.samples
    })));

    /* ---- panorama ---- */
    var panorama = card({ title: T('modules.04.panoramaTitle') });
    var host = put(panorama.body, el('div', ''));
    var spanPL = state.kind === 'week'
      ? T('modules.04.panoramaSpanWeek') : T('modules.04.panoramaSpanDay');
    host.setAttribute('role', 'img');
    host.setAttribute('aria-label', T('modules.04.panoramaAriaTpl', {
      name: lead ? lead.namePL : '', span: spanPL
    }));
    if (global.Gauge && typeof global.Gauge.bars === 'function') {
      state.panorama = global.Gauge.bars(host, {
        metricId: data.leadId, thresholds: thresholds()
      });
      if (state.panorama) state.panorama.update(data.buckets);
    }
    put(panorama.body, el('p', 'ms4-muted', state.kind === 'week'
      ? T('modules.04.coverageWeekTpl', { done: data.covered, total: data.count })
      : T('modules.04.coverageDayTpl', { done: data.covered, total: data.count })));
    put(panorama.body, el('p', 'ms4-field__hint', T('modules.04.panoramaHint')));
    put(state.body, panorama.root);

    /* ---- table ---- */
    var tab = card({ title: T('modules.04.tableTitle') });
    var items = catalogue();
    var rows = [];
    for (var i = 0; i < items.length; i += 1) {
      var m = items[i];
      var locked = isLocked(m);
      rows.push([
        { textPL: m.namePL + ' (' + m.unit + ')', head: true, lock: locked },
        { textPL: locked ? T('common.noValue') : fmt(m.id, data.avg[m.id]), num: true },
        { textPL: locked ? T('common.noValue') : fmt(m.id, data.min[m.id]), num: true },
        { textPL: locked ? T('common.noValue') : fmt(m.id, data.max[m.id]), num: true }
      ]);
    }
    put(tab.body, table(T('modules.04.tableCaption'),
      [T('modules.04.colMetric'), T('modules.04.colAvg'), T('modules.04.colMin'), T('modules.04.colMax')],
      rows));
    put(state.body, tab.root);

    /* ---- zone distribution ---- */
    var zonesCard = card({
      title: T('modules.04.zonesTitle'),
      subtitle: T('modules.04.zonesCaptionTpl', { name: lead ? lead.namePL : '' })
    });
    put(zonesCard.body, zoneBar(data.zones));
    put(zonesCard.body, el('p', 'ms4-muted', T('modules.04.worstTpl', {
      value: data.worstHour === null
        ? T('modules.04.worstNone')
        : T('modules.04.worstHourTpl', { hour: pad2(data.worstHour) + ':00' })
    })));
    put(state.body, zonesCard.root);

    /* ---- advice ---- */
    var advice = card({ title: T('modules.04.adviceTitle') });
    var lines = reportAdvice(data);
    for (var a = 0; a < lines.length; a += 1) put(advice.body, el('p', '', lines[a]));
    put(state.body, advice.root);

    put(state.body, note('warning', T('modules.04.limitsTitle'), T('modules.04.limits'), 'warning'));
    put(state.body, el('p', 'ms4-field__hint', T('modules.04.printHint')));
  }

  function openReports() {
    var state = { kind: 'day', body: null, panorama: null };
    return openTool({
      title: T('tools.reports'),
      subtitle: T('modules.04.descPL'),
      actions: function (handle) { return [closeAction(handle)]; },
      build: function (body, handle) {
        put(body, segmented(T('modules.04.rangeAria'), [
          { value: 'day', labelPL: T('modules.04.rangeDay') },
          { value: 'week', labelPL: T('modules.04.rangeWeek') }
        ], state.kind, function (value) {
          state.kind = value === 'week' ? 'week' : 'day';
          renderReport(state);
        }));

        state.body = put(body, el('div', 'ms4-stack'));
        renderReport(state);

        handle.own(function () {
          if (!state.panorama) return;
          try { state.panorama.destroy(); } catch (err) { /* gone */ }
          state.panorama = null;
        });
        handle.bus('engine:history', function () { renderReport(state); });
        handle.bus('billing:changed', function () { renderReport(state); });
      }
    });
  }

  /* ==================================================================
     05 — Eksport (export)
     ================================================================== */

  function exportRows(rangeMs) {
    var until = Date.now();
    var since = until - rangeMs;
    var points = history({ sinceMs: since, untilMs: until });
    var items = catalogue();
    var head = [T('modules.05.colDate'), T('modules.05.colTime')];
    var i, j;
    for (i = 0; i < items.length; i += 1) head.push(items[i].namePL + ' [' + items[i].unit + ']');
    head.push(T('modules.05.colZone'));

    var rows = [head];
    for (i = 0; i < points.length; i += 1) {
      var p = points[i];
      var line = [fmtDate(p.t), fmtClock(p.t)];
      for (j = 0; j < items.length; j += 1) {
        var m = items[j];
        var v = p[m.id];
        // A locked premium column stays empty. Inventing a number inside
        // something that looks like an export is the one thing this app
        // must never do.
        line.push(isLocked(m) || !isNum(v) ? '' : v.toFixed(m.decimals).replace('.', ','));
      }
      line.push(p.zone || '');
      rows.push(line);
    }
    return { rows: rows, points: points, since: since, until: until };
  }

  function exportJson(data) {
    var items = catalogue();
    var columns = [];
    var i, j;
    for (i = 0; i < items.length; i += 1) {
      columns.push({
        id: items[i].id, namePL: items[i].namePL, unit: items[i].unit,
        decimals: items[i].decimals, locked: isLocked(items[i])
      });
    }
    var points = [];
    for (i = 0; i < data.points.length; i += 1) {
      var p = data.points[i];
      var out = { t: p.t, zone: p.zone || null };
      for (j = 0; j < items.length; j += 1) {
        var m = items[j];
        out[m.id] = isLocked(m) || !isNum(p[m.id]) ? null : p[m.id];
      }
      points.push(out);
    }
    return {
      app: T('app.title'),
      version: 4,
      exportedAt: data.until,
      sinceMs: data.since,
      untilMs: data.until,
      stepMs: EXPORT_STEP_MS,
      columns: columns,
      points: points
    };
  }

  function csvText(data) {
    var lines = '';
    for (var i = 0; i < data.rows.length; i += 1) lines += data.rows[i].join(';') + '\r\n';
    // BOM first: without it a Polish Excel reads UTF-8 as Windows-1250 and
    // every diacritic in the header turns to rubbish. Written as an escape so
    // that this file stays plain ASCII (SPEC 8.5, point 4).
    return String.fromCharCode(0xFEFF) + lines;
  }

  function stampName(ms, ext) {
    var d = new Date(ms);
    return 'monitor-swiatla-' + d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' +
      pad2(d.getDate()) + '-' + pad2(d.getHours()) + pad2(d.getMinutes()) + '.' + ext;
  }

  /* Blob + a[download], nothing else. No network, no library, no build step.
     The object URL is revoked once the browser has had time to take it. */
  function download(filename, mime, text) {
    try {
      var blob = new global.Blob([text], { type: mime });
      var url = global.URL.createObjectURL(blob);
      var a = doc.createElement('a');
      a.href = url;
      a.download = filename;
      a.className = 'ms4-sronly';
      a.setAttribute('aria-hidden', 'true');
      doc.body.appendChild(a);
      a.click();
      doc.body.removeChild(a);
      global.setTimeout(function () {
        try { global.URL.revokeObjectURL(url); } catch (err) { /* already gone */ }
      }, 4000);
      return true;
    } catch (err) {
      return false;
    }
  }

  function runExport(state, kind) {
    var data = exportRows(state.rangeMs);
    if (data.rows.length < 2) { toast(T('empty.exportNoData'), 'warn'); return; }

    var filename, mime, text;
    if (kind === 'json') {
      filename = stampName(data.until, 'json');
      mime = 'application/json;charset=utf-8';
      text = JSON.stringify(exportJson(data), null, 2);
    } else {
      filename = stampName(data.until, 'csv');
      mime = 'text/csv;charset=utf-8';
      text = csvText(data);
    }

    if (download(filename, mime, text)) {
      toast(T('modules.05.savedTpl', { name: filename, rows: data.rows.length - 1 }), 'good');
    } else {
      toast(T('modules.05.failed'), 'crit');
    }
  }

  function copyExport(state) {
    var data = exportRows(state.rangeMs);
    if (data.rows.length < 2) { toast(T('empty.exportNoData'), 'warn'); return; }
    var text = csvText(data);
    var clipboard = global.navigator && global.navigator.clipboard;
    if (clipboard && typeof clipboard.writeText === 'function') {
      clipboard.writeText(text).then(function () {
        toast(T('toast.copied'), 'good');
      }, function () {
        toast(T('error.unknown'), 'crit');
      });
      return;
    }
    toast(T('error.unknown'), 'crit');
  }

  function columnsTable() {
    var rows = [
      [{ textPL: T('modules.05.colDate'), head: true }, T('modules.05.descDate')],
      [{ textPL: T('modules.05.colTime'), head: true }, T('modules.05.descTime')]
    ];
    var items = catalogue();
    for (var i = 0; i < items.length; i += 1) {
      var m = items[i];
      var descPL = T('modules.05.descMetricTpl', {
        short: m.shortPL, unit: m.unit,
        min: fmt(m.id, m.min), max: fmt(m.id, m.max)
      });
      if (isLocked(m)) descPL += ' ' + T('modules.05.lockedColumn');
      rows.push([
        { textPL: m.namePL + ' [' + m.unit + ']', head: true, lock: isLocked(m) },
        descPL
      ]);
    }
    rows.push([{ textPL: T('modules.05.colZone'), head: true }, T('modules.05.descZone')]);
    return table(T('modules.05.columnsCaption'),
      [T('modules.05.colName'), T('modules.05.colMeaning')], rows);
  }

  function renderExportPreview(state) {
    if (!state.preview) return;
    clear(state.preview);
    var data = exportRows(state.rangeMs);
    if (data.rows.length < 2) {
      put(state.preview, emptyState('export', T('modules.05.titlePL'), T('empty.exportNoData')));
      return;
    }
    var rows = [];
    var shown = Math.min(PREVIEW_ROWS, data.rows.length - 1);
    for (var i = 1; i <= shown; i += 1) {
      var cells = [];
      for (var j = 0; j < data.rows[i].length; j += 1) {
        cells.push({ textPL: data.rows[i][j] || T('common.noValue'), num: j > 1 });
      }
      rows.push(cells);
    }
    put(state.preview, table(T('modules.05.previewHint'), data.rows[0], rows));
  }

  function openExport() {
    var state = { rangeMs: DAY_MS, preview: null };
    return openTool({
      title: T('tools.export'),
      subtitle: T('modules.05.descPL'),
      actions: function (handle) {
        return [
          button({
            label: T('modules.05.csvKey'), variant: 'primary', size: 'md', icon: 'export',
            onClick: function () { runExport(state, 'csv'); }
          }),
          button({
            label: T('modules.05.jsonKey'), variant: 'tonal', size: 'md', icon: 'export',
            onClick: function () { runExport(state, 'json'); }
          }),
          closeAction(handle)
        ];
      },
      build: function (body, handle) {
        put(body, section(T('tools.exportRange')));
        put(body, segmented(T('modules.05.rangeAria'), [
          { value: String(HOUR_MS), labelPL: T('modules.05.range1h') },
          { value: String(DAY_MS), labelPL: T('modules.05.range24h') },
          { value: String(WEEK_MS), labelPL: T('modules.05.range7d') },
          { value: String(30 * DAY_MS), labelPL: T('modules.05.range30d') }
        ], String(state.rangeMs), function (value) {
          state.rangeMs = Number(value);
          renderExportPreview(state);
        }));

        put(body, button({
          label: T('tools.copyKey'), variant: 'ghost', size: 'md', icon: 'share',
          onClick: function () { copyExport(state); }
        }));

        var format = card({ title: T('modules.05.formatTitle') });
        put(format.body, el('p', '', T('modules.05.formatCsv')));
        put(format.body, el('p', '', T('modules.05.formatJson')));
        put(format.body, el('p', 'ms4-field__hint', T('modules.05.resolution')));
        put(body, format.root);

        put(body, note('demo', '', T('modules.05.offline'), 'shield'));

        var cols = card({ title: T('modules.05.columnsTitle') });
        put(cols.body, columnsTable());
        put(body, cols.root);

        var prev = card({ title: T('modules.05.previewTitle'), subtitle: T('modules.05.previewHint') });
        state.preview = put(prev.body, el('div', ''));
        put(body, prev.root);

        renderExportPreview(state);
        handle.bus('engine:history', function () { renderExportPreview(state); });
      }
    });
  }

  /* ==================================================================
     06 — Porownanie (compare)

     The engine keeps only the last session, so this file keeps the rest.
     `engine:stopped` is a state event, not the sampler, so listening to it
     costs nothing in the 5 Hz budget.
     ================================================================== */

  function sessions() {
    var stored = readJson(KEY_SESSIONS, []);
    return isArray(stored) ? stored : [];
  }

  function findSession(id) {
    var items = sessions();
    for (var i = 0; i < items.length; i += 1) if (items[i].id === id) return items[i];
    return null;
  }

  function rememberSession(session) {
    if (!session || !session.startedAt) return;
    var endedAt = session.endedAt || Date.now();
    var durationMs = session.durationMs || (endedAt - session.startedAt);
    if (durationMs < SESSION_MIN_MS) return;

    var entry = {
      id: 's' + session.startedAt.toString(36),
      startedAt: session.startedAt,
      endedAt: endedAt,
      durationMs: durationMs,
      samples: session.samples || 0,
      zones: session.zones || { good: 0, warning: 0, critical: 0 },
      avg: session.avg || {},
      min: session.min || {},
      max: session.max || {},
      calibrated: !!session.calibrated,
      series: history({ sinceMs: session.startedAt, untilMs: endedAt, maxPoints: SESSION_POINTS })
    };

    // The id is derived from the start time, so a second writer storing the
    // same finished session cannot produce a duplicate entry.
    var items = sessions();
    var kept = [];
    for (var i = 0; i < items.length; i += 1) {
      if (items[i].id !== entry.id) kept.push(items[i]);
    }
    kept.push(entry);
    while (kept.length > MAX_SESSIONS) kept.shift();
    if (!writeJson(KEY_SESSIONS, kept)) {
      // Out of space: drop the oldest half and try once more rather than lose
      // the session that has just finished.
      kept = kept.slice(Math.floor(kept.length / 2));
      writeJson(KEY_SESSIONS, kept);
    }
  }

  function sessionLabel(s) {
    return T('modules.06.sessionTpl', {
      date: fmtDate(s.startedAt), time: fmtHm(s.startedAt), dur: durationWords(s.durationMs)
    });
  }

  function sessionBuckets(s, lead, map) {
    var buckets = [];
    var i;
    for (i = 0; i < TAPE_BUCKETS; i += 1) {
      buckets.push({ t: 0, sum: 0, n: 0, min: Infinity, max: -Infinity, zone: null });
    }
    var span = Math.max(1, s.durationMs);
    var series = s.series || [];
    for (i = 0; i < series.length; i += 1) {
      var p = series[i];
      var index = Math.floor(((p.t - s.startedAt) / span) * TAPE_BUCKETS);
      if (index < 0) index = 0;
      if (index >= TAPE_BUCKETS) index = TAPE_BUCKETS - 1;
      var slot = buckets[index];
      var v = p[lead];
      if (isNum(v)) {
        slot.sum += v; slot.n += 1;
        if (v < slot.min) slot.min = v;
        if (v > slot.max) slot.max = v;
      }
      slot.zone = worseZone(slot.zone, zoneOf(lead, v, map));
    }
    var out = [];
    for (i = 0; i < buckets.length; i += 1) {
      var b = buckets[i];
      out.push({
        t: s.startedAt + Math.round((i / TAPE_BUCKETS) * span),
        avg: b.n ? b.sum / b.n : null,
        min: b.n ? b.min : null,
        max: b.n ? b.max : null,
        zone: b.zone
      });
    }
    return out;
  }

  function tapeCard(state, slotPL, s, lead, map) {
    var built = card({ title: slotPL, subtitle: sessionLabel(s), className: 'ms4-card--flat' });
    var host = put(built.body, el('div', ''));
    var m = metric(lead);
    host.setAttribute('role', 'img');
    host.setAttribute('aria-label', T('modules.06.tapeAriaTpl', {
      slot: slotPL, name: m ? m.namePL : ''
    }));
    if (global.Gauge && typeof global.Gauge.bars === 'function') {
      var gauge = global.Gauge.bars(host, { metricId: lead, thresholds: map });
      if (gauge) {
        gauge.update(sessionBuckets(s, lead, map));
        state.tapes.push(gauge);
      }
    }
    return built.root;
  }

  function diffCell(id, a, b, map) {
    if (!isNum(a) || !isNum(b)) return { textPL: T('common.noValue'), num: true };
    var d = b - a;
    // U+2212, the real minus sign: a hyphen next to tabular digits reads as a
    // dash in the middle of the number.
    var sign = d < 0 ? String.fromCharCode(0x2212) : '+';
    return {
      textPL: sign + fmt(id, Math.abs(d)),
      num: true,
      tone: zoneTone(zoneOf(id, b, map)) || 'info'
    };
  }

  function destroyTapes(state) {
    for (var i = 0; i < state.tapes.length; i += 1) {
      try { state.tapes[i].destroy(); } catch (err) { /* gone */ }
    }
    state.tapes = [];
  }

  function renderCompare(state) {
    if (!state.body) return;
    destroyTapes(state);
    clear(state.body);

    var items = sessions();
    if (!items.length) {
      put(state.body, emptyState('compare', T('modules.06.titlePL'), T('modules.06.noSessions')));
      return;
    }
    if (items.length < 2) {
      put(state.body, emptyState('compare', T('modules.06.titlePL'), T('empty.compareOneSession')));
      return;
    }

    var A = findSession(state.a), B = findSession(state.b);
    if (!A || !B) return;

    var lead = leadId();
    var leadMetric = metric(lead);
    var map = thresholds();

    var tapes = card({
      title: T('modules.06.tapeTitle'),
      subtitle: T('modules.06.tapeChannelTpl', { name: leadMetric ? leadMetric.namePL : '' })
    });
    put(tapes.body, tapeCard(state, T('modules.06.slotA'), A, lead, map));
    put(tapes.body, tapeCard(state, T('modules.06.slotB'), B, lead, map));
    put(tapes.body, el('p', 'ms4-field__hint', T('modules.06.tapeHint')));
    put(state.body, tapes.root);

    var diff = card({ title: T('modules.06.diffTitle') });
    var catalog = catalogue();
    var rows = [];
    for (var i = 0; i < catalog.length; i += 1) {
      var m = catalog[i];
      var locked = isLocked(m);
      var a = A.avg ? A.avg[m.id] : null;
      var b = B.avg ? B.avg[m.id] : null;
      rows.push([
        { textPL: m.namePL + ' (' + m.unit + ')', head: true, lock: locked },
        { textPL: locked ? T('common.noValue') : fmt(m.id, a), num: true },
        { textPL: locked ? T('common.noValue') : fmt(m.id, b), num: true },
        locked ? { textPL: T('common.noValue'), num: true } : diffCell(m.id, a, b, map)
      ]);
    }
    put(diff.body, table(T('modules.06.diffCaption'),
      [T('modules.06.colMetric'), T('modules.06.colA'), T('modules.06.colB'), T('modules.06.colDiff')],
      rows));
    put(state.body, diff.root);
  }

  function renderCompareSelects(state) {
    if (!state.selects) return;
    clear(state.selects);
    var items = sessions();
    if (items.length < 2) return;

    var options = [];
    for (var i = items.length - 1; i >= 0; i -= 1) {
      options.push({ value: items[i].id, labelPL: sessionLabel(items[i]) });
    }
    if (!state.a || !findSession(state.a)) state.a = options[options.length - 1].value;
    if (!state.b || !findSession(state.b)) state.b = options[0].value;

    put(state.selects, field(T('modules.06.slotA'),
      select('ms4CompareA', options, state.a, function (v) { state.a = v; renderCompare(state); }),
      '', 'ms4CompareA'));
    put(state.selects, field(T('modules.06.slotB'),
      select('ms4CompareB', options, state.b, function (v) { state.b = v; renderCompare(state); }),
      '', 'ms4CompareB'));
  }

  function openCompare() {
    var state = { a: null, b: null, selects: null, body: null, tapes: [] };
    return openTool({
      title: T('tools.compare'),
      subtitle: T('modules.06.descPL'),
      actions: function (handle) { return [closeAction(handle)]; },
      build: function (body, handle) {
        put(body, el('p', '', T('modules.06.intro')));

        state.selects = put(body, el('div', 'ms4-stack'));
        state.body = put(body, el('div', 'ms4-stack'));

        put(body, note('limits', T('modules.06.limitsTitle'),
          [T('modules.06.limits'), T('modules.06.keepTpl', { count: MAX_SESSIONS })]));

        put(body, button({
          label: T('modules.06.clearKey'), variant: 'danger', size: 'md', icon: 'trash',
          onClick: function () {
            confirmDialog({
              title: T('modules.06.clearKey'),
              text: T('tools.clearSessionsConfirm'),
              confirm: T('confirm.delete'),
              cancel: T('confirm.cancel'),
              tone: 'danger'
            }).then(function (ok) {
              if (!ok) return;
              removeKey(KEY_SESSIONS);
              state.a = null;
              state.b = null;
              renderCompareSelects(state);
              renderCompare(state);
              toast(T('modules.06.cleared'), 'info');
            });
          }
        }));

        renderCompareSelects(state);
        renderCompare(state);

        handle.own(function () { destroyTapes(state); });
        handle.bus('engine:stopped', function () {
          renderCompareSelects(state);
          renderCompare(state);
        });
        handle.bus('billing:changed', function () { renderCompare(state); });
      }
    });
  }

  /* ==================================================================
     07 — Test ekranu (screen test)

     The planes are the one place in the app that leaves the theme: a test
     plane tinted by a palette is not a test plane. The absolute colours live
     in the `ms4-plate--*` classes (SPEC chapter 9), never in this file.
     ================================================================== */

  var plate = { root: null, opener: null, index: 0, planes: [], onKey: null, hint: null, count: null };

  function planeClass(id) {
    return 'ms4-plate ms4-plate--' + id;
  }

  function plateFocusRing() {
    if (!plate.root) return [];
    var found = plate.root.querySelectorAll('button');
    var out = [];
    for (var i = 0; i < found.length; i += 1) out.push(found[i]);
    return out;
  }

  function showPlane(index) {
    if (!plate.root || !plate.planes.length) return;
    var total = plate.planes.length;
    plate.index = ((index % total) + total) % total;
    var plane = plate.planes[plate.index];
    plate.root.className = planeClass(plane.id);
    plate.root.setAttribute('aria-label', T('modules.07.planeAriaTpl', { name: plane.namePL }));
    setText(plate.hint, plane.namePL + T('common.sep') + plane.hintPL);
    setText(plate.count, T('tools.planeCountTpl', { n: plate.index + 1, total: total }));
  }

  function closePlane() {
    if (!plate.root) return;
    if (plate.onKey) doc.removeEventListener('keydown', plate.onKey, true);
    global.removeEventListener('popstate', closePlane);
    if (plate.root.parentNode) plate.root.parentNode.removeChild(plate.root);
    var lib = ui();
    if (lib && typeof lib.lockScroll === 'function') lib.lockScroll(false);
    var opener = plate.opener;
    plate.root = null;
    plate.opener = null;
    plate.onKey = null;
    plate.hint = null;
    plate.count = null;
    plate.planes = [];
    if (opener && typeof opener.focus === 'function') opener.focus();
  }

  function openPlane(planes, index, opener) {
    if (plate.root) closePlane();
    if (!planes.length) return;

    var root = el('div', planeClass(planes[index].id));
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');

    var bar = put(root, el('div', 'ms4-plate__bar'));
    plate.count = put(bar, el('span', 'ms4-plate__count', ''));
    put(bar, button({
      label: T('tools.planePrev'), variant: 'ghost', size: 'sm', icon: 'chevron-left',
      onClick: function () { showPlane(plate.index - 1); }
    }));
    put(bar, button({
      label: T('tools.planeNext'), variant: 'ghost', size: 'sm', icon: 'chevron-right',
      onClick: function () { showPlane(plate.index + 1); }
    }));
    var exit = put(bar, button({
      label: T('modules.07.exitKey'), variant: 'primary', size: 'sm', icon: 'close',
      onClick: function () { closePlane(); }
    }));
    plate.hint = put(bar, el('span', 'ms4-plate__hint', ''));

    // A tap anywhere on the plane goes to the next one; the bar keeps its own
    // clicks, otherwise every press of "Zamknij" would also advance a plane.
    on(bar, 'click', function (ev) { ev.stopPropagation(); });
    on(root, 'click', function () { showPlane(plate.index + 1); });

    plate.root = root;
    plate.planes = planes;
    plate.opener = opener || null;

    plate.onKey = function (ev) {
      if (!plate.root) return;
      if (ev.key === 'Escape' || ev.keyCode === 27) {
        ev.preventDefault();
        ev.stopPropagation();
        closePlane();
        return;
      }
      if (ev.key === 'ArrowRight' || ev.keyCode === 39 || ev.key === 'ArrowDown' || ev.keyCode === 40) {
        ev.preventDefault();
        showPlane(plate.index + 1);
        return;
      }
      if (ev.key === 'ArrowLeft' || ev.keyCode === 37 || ev.key === 'ArrowUp' || ev.keyCode === 38) {
        ev.preventDefault();
        showPlane(plate.index - 1);
        return;
      }
      if (ev.key === 'Tab' || ev.keyCode === 9) {
        ev.preventDefault();
        var ring = plateFocusRing();
        if (!ring.length) return;
        var at = -1, i;
        for (i = 0; i < ring.length; i += 1) if (ring[i] === doc.activeElement) at = i;
        var next = ev.shiftKey ? at - 1 : at + 1;
        if (next < 0) next = ring.length - 1;
        if (next > ring.length - 1) next = 0;
        try { ring[next].focus(); } catch (err) { /* element went away */ }
      }
    };

    doc.body.appendChild(root);
    var lib = ui();
    if (lib && typeof lib.lockScroll === 'function') lib.lockScroll(true);
    doc.addEventListener('keydown', plate.onKey, true);
    global.addEventListener('popstate', closePlane);

    showPlane(index);
    if (exit && exit.focus) exit.focus();
  }

  function openScreenTest() {
    return openTool({
      title: T('tools.screentest'),
      subtitle: T('modules.07.descPL'),
      actions: function (handle) { return [closeAction(handle)]; },
      build: function (body, handle) {
        put(body, el('p', '', T('modules.07.intro')));
        put(body, note('info', '', T('tools.screenTestHint'), 'bulb'));

        put(body, section(T('modules.07.stepsTitle')));
        put(body, steps(TL('modules.07.steps')));

        put(body, note('warning', T('modules.07.warnTitle'), T('modules.07.warn'), 'warning'));

        put(body, section(T('modules.07.planesTitle')));
        var planes = TL('modules.07.planes');
        var host = put(body, list());
        for (var i = 0; i < planes.length; i += 1) {
          (function (plane, index) {
            var open = button({
              label: T('modules.07.showKey'), variant: 'tonal', size: 'sm', icon: 'expand',
              onClick: function (ev) {
                openPlane(planes, index, ev && ev.currentTarget ? ev.currentTarget : null);
              }
            });
            open.setAttribute('aria-label', T('modules.07.showAriaTpl', { name: plane.namePL }));
            put(host, row({
              icon: 'screen', title: plane.namePL, subtitle: plane.hintPL, control: open
            }));
          }(planes[i], i));
        }

        put(body, note('limits', T('modules.07.cameraTitle'), T('modules.07.camera')));
        handle.own(closePlane);
      }
    });
  }

  /* ==================================================================
     08 — Harmonogram (schedule)
     ================================================================== */

  function defaultSchedule() {
    return { enabled: false, times: [] };
  }

  function getSchedule() {
    var stored = readJson(KEY_SCHEDULE, null);
    if (!stored || typeof stored !== 'object' || !isArray(stored.times)) return defaultSchedule();
    var clean = { enabled: !!stored.enabled, times: [] };
    for (var i = 0; i < stored.times.length; i += 1) {
      var t = stored.times[i];
      if (!t || !isNum(t.min)) continue;
      clean.times.push({
        id: t.id || ('t' + i),
        min: Math.max(0, Math.min(1439, Math.round(t.min)))
      });
    }
    clean.times.sort(function (a, b) { return a.min - b.min; });
    return clean;
  }

  function setSchedule(value) {
    writeJson(KEY_SCHEDULE, value);
  }

  function renderScheduleNext(state) {
    if (!state.next) return;
    var s = getSchedule();
    if (!s.enabled || !s.times.length) {
      setText(state.next, T('modules.08.nextNone'));
      return;
    }
    var now = new Date();
    var minutes = now.getHours() * 60 + now.getMinutes();
    var best = null;
    for (var i = 0; i < s.times.length; i += 1) {
      var delta = s.times[i].min - minutes;
      if (delta < 0) delta += 1440;
      if (best === null || delta < best.delta) best = { delta: delta, min: s.times[i].min };
    }
    setText(state.next, best ? T('modules.08.nextTpl', { time: minutesToHm(best.min) }) : '');
  }

  function renderScheduleTimes(state) {
    if (!state.list) return;
    clear(state.list);
    var s = getSchedule();
    if (!s.times.length) {
      put(state.list, emptyState('schedule', T('modules.08.titlePL'), T('empty.scheduleEmpty')));
      return;
    }
    for (var i = 0; i < s.times.length; i += 1) {
      (function (t, index) {
        var hm = minutesToHm(t.min);
        var input = el('input', 'ms4-field');
        input.type = 'time';
        input.value = hm;
        input.setAttribute('aria-label', T('modules.08.timeAriaTpl', { n: index + 1 }));
        on(input, 'change', function () {
          var minutes = hmToMinutes(input.value);
          if (minutes === null) {
            toast(T('modules.08.badTime'), 'warn');
            input.value = minutesToHm(t.min);
            return;
          }
          var cur = getSchedule();
          for (var j = 0; j < cur.times.length; j += 1) {
            if (cur.times[j].id === t.id) cur.times[j].min = minutes;
          }
          setSchedule(cur);
          renderScheduleNext(state);
        });

        var controls = el('div', 'ms4-row-inline');
        put(controls, input);
        var remove = button({
          label: T('modules.08.removeKey'), variant: 'ghost', size: 'sm', icon: 'trash',
          onClick: function () {
            var cur = getSchedule();
            var kept = [];
            for (var k = 0; k < cur.times.length; k += 1) {
              if (cur.times[k].id !== t.id) kept.push(cur.times[k]);
            }
            cur.times = kept;
            setSchedule(cur);
            renderScheduleTimes(state);
            renderScheduleNext(state);
            toast(T('modules.08.removedTpl', { time: hm }), 'info');
          }
        });
        remove.setAttribute('aria-label', T('modules.08.removeAriaTpl', { time: hm }));
        put(controls, remove);

        put(state.list, row({ icon: 'clock', title: hm, control: controls }));
      }(s.times[i], i));
    }
  }

  function openSchedule() {
    var state = { list: null, next: null };
    return openTool({
      title: T('tools.schedule'),
      subtitle: T('modules.08.descPL'),
      actions: function (handle) {
        return [
          button({
            label: T('modules.08.addKey'), variant: 'primary', size: 'md', icon: 'plus',
            onClick: function () {
              var cur = getSchedule();
              cur.times.push({ id: 't' + Date.now().toString(36), min: 20 * 60 });
              setSchedule(cur);
              renderScheduleTimes(state);
              renderScheduleNext(state);
              toast(T('modules.08.addedTpl', { time: minutesToHm(20 * 60) }), 'good');
            }
          }),
          closeAction(handle)
        ];
      },
      build: function (body, handle) {
        put(body, el('p', '', T('modules.08.intro')));
        put(body, note('warning', T('modules.08.onlyOpenTitle'),
          [T('modules.08.onlyOpen'), T('tools.scheduleHint')], 'warning'));

        var box = card({ title: T('modules.08.timesTitle') });
        put(box.body, switchControl(T('modules.08.enableLabel'), getSchedule().enabled, function (checked) {
          var cur = getSchedule();
          cur.enabled = checked;
          setSchedule(cur);
          renderScheduleNext(state);
        }));
        state.next = put(box.body, el('p', 'ms4-muted', ''));
        state.list = put(box.body, list());
        put(body, box.root);

        renderScheduleTimes(state);
        renderScheduleNext(state);
        handle.every(MINUTE_MS, function () { renderScheduleNext(state); });
      }
    });
  }

  /* The reminder never touches the camera: at the appointed minute it says so
     and the human presses "Start pomiaru". A tool that turned the camera on by
     itself would be a tool nobody asked for. */
  var firedAt = {};

  function scheduleTick() {
    var s = getSchedule();
    if (!s.enabled || !s.times.length) return;
    var now = new Date();
    var minutes = now.getHours() * 60 + now.getMinutes();
    var stamp = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + '-' + minutes;

    for (var i = 0; i < s.times.length; i += 1) {
      var t = s.times[i];
      if (t.min !== minutes) continue;
      if (firedAt[t.id] === stamp) continue;
      firedAt[t.id] = stamp;
      var messagePL = T('modules.08.dueTpl', { time: minutesToHm(t.min) });
      toast(messagePL, 'info');
      say(messagePL);
    }
  }

  /* ==================================================================
     09 — Alerty (alerts)
     ================================================================== */

  function defaultAlerts() {
    return { enabled: false, metricId: 'melanopic', level: 'critical', sustainS: 60, sound: true };
  }

  function cleanAlerts(a) {
    var d = defaultAlerts();
    if (!a || typeof a !== 'object') return d;
    return {
      enabled: !!a.enabled,
      metricId: metric(a.metricId) ? a.metricId : d.metricId,
      level: a.level === 'warning' ? 'warning' : 'critical',
      sustainS: isNum(a.sustainS)
        ? Math.max(ALERT_MIN_SUSTAIN, Math.min(ALERT_MAX_SUSTAIN, Math.round(a.sustainS)))
        : d.sustainS,
      sound: a.sound !== false
    };
  }

  var alertCfg = null;
  var alertSince = 0;
  var alertFiredAt = 0;

  /* The watcher runs once a second for as long as the app is open, so the
     configuration is parsed once and kept in memory. setAlerts is its only
     writer. */
  function alertConfig() {
    if (!alertCfg) alertCfg = cleanAlerts(readJson(KEY_ALERTS, null));
    return alertCfg;
  }

  function setAlerts(patch, state) {
    var cur = alertConfig();
    var next = {
      enabled: cur.enabled, metricId: cur.metricId, level: cur.level,
      sustainS: cur.sustainS, sound: cur.sound
    };
    for (var k in patch) {
      if (Object.prototype.hasOwnProperty.call(patch, k)) next[k] = patch[k];
    }
    var clean = cleanAlerts(next);
    writeJson(KEY_ALERTS, clean);
    alertCfg = clean;
    alertSince = 0;
    if (state) renderAlertStatus(state);
    toast(T('modules.09.saved'), 'good');
    return clean;
  }

  function renderAlertStatus(state) {
    if (!state.status) return;
    var cfg = alertConfig();
    if (!cfg.enabled) { setText(state.status, T('empty.alertsOff')); return; }
    var m = metric(cfg.metricId);
    setText(state.status, T('modules.09.statusOnTpl', {
      name: m ? m.namePL : '',
      level: cfg.level === 'warning' ? T('modules.09.levelWarning') : T('modules.09.levelCritical'),
      sec: cfg.sustainS
    }));
  }

  function renderAlertMetrics(state) {
    if (!state.metrics) return;
    clear(state.metrics);
    var cfg = alertConfig();
    var items = catalogue();
    for (var i = 0; i < items.length; i += 1) {
      (function (m) {
        var locked = isLocked(m);
        var selected = cfg.metricId === m.id;
        var chip = el('button', 'ms4-chip ms4-chip--selectable' +
          (selected ? ' is-selected' : '') + (locked ? ' is-locked' : ''));
        chip.type = 'button';
        chip.setAttribute('aria-pressed', selected ? 'true' : 'false');
        if (locked) {
          put(chip, icon('lock', 16, 'ms4-chip__icon'));
        }
        put(chip, el('span', 'ms4-chip__label', m.namePL));
        on(chip, 'click', function () {
          // A metric whose number is still behind the paywall cannot be
          // watched honestly, so the chip opens the offer instead of pretending.
          if (locked) { openPaywall('alerts', m.id); return; }
          setAlerts({ metricId: m.id }, state);
          renderAlertMetrics(state);
        });
        put(state.metrics, chip);
      }(items[i]));
    }
  }

  function openAlerts() {
    var state = { status: null, metrics: null };
    return openTool({
      title: T('tools.alerts'),
      subtitle: T('modules.09.descPL'),
      actions: function (handle) { return [closeAction(handle)]; },
      build: function (body, handle) {
        var cfg = alertConfig();

        put(body, el('p', '', T('modules.09.intro')));
        put(body, note('info', '', T('tools.alertsHint'), 'bulb'));

        var box = card({ title: T('modules.09.enableLabel') });
        put(box.body, switchControl(T('modules.09.enableLabel'), cfg.enabled, function (checked) {
          setAlerts({ enabled: checked }, state);
        }));
        state.status = put(box.body, el('p', 'ms4-muted', ''));
        put(body, box.root);

        var pick = card({ title: T('modules.09.metricLabel') });
        state.metrics = put(pick.body, el('div', 'ms4-row-inline'));
        renderAlertMetrics(state);

        put(pick.body, el('p', 'ms4-field__label', T('modules.09.levelLabel')));
        put(pick.body, segmented(T('modules.09.levelLabel'), [
          { value: 'warning', labelPL: T('modules.09.levelWarning') },
          { value: 'critical', labelPL: T('modules.09.levelCritical') }
        ], cfg.level, function (value) { setAlerts({ level: value }, state); }));

        var sustain = slider({
          label: T('modules.09.sustainLabel'),
          min: ALERT_MIN_SUSTAIN,
          max: ALERT_SLIDER_MAX,
          step: 5,
          value: Math.min(ALERT_SLIDER_MAX, cfg.sustainS),
          format: function (v) { return String(v) + ' s'; },
          onChange: function (v) {
            if (state.sustainTimer) global.clearTimeout(state.sustainTimer);
            state.sustainTimer = global.setTimeout(function () {
              state.sustainTimer = null;
              setAlerts({ sustainS: v }, state);
            }, COMMIT_DELAY_MS);
          }
        });
        put(pick.body, sustain.root);
        put(pick.body, el('p', 'ms4-field__hint', T('modules.09.sustainHint')));
        put(body, pick.root);

        var sound = card({ title: T('modules.09.soundLabel') });
        put(sound.body, switchControl(T('modules.09.soundLabel'), cfg.sound, function (checked) {
          setAlerts({ sound: checked }, state);
        }));
        put(sound.body, el('p', 'ms4-field__hint', T('modules.09.soundHint')));
        put(sound.body, el('p', 'ms4-field__hint', T('modules.09.cooldownHint')));
        put(body, sound.root);

        put(body, note('warning', T('modules.09.whenNotTitle'), T('modules.09.whenNot'), 'warning'));

        renderAlertStatus(state);
        handle.bus('billing:changed', function () { renderAlertMetrics(state); });
        handle.own(function () {
          if (state.sustainTimer) global.clearTimeout(state.sustainTimer);
        });
      }
    });
  }

  function zoneRank(zone) {
    return zone === 'critical' ? 2 : (zone === 'warning' ? 1 : 0);
  }

  /* Polls Engine.latest() once a second instead of subscribing to the sampler:
     the watcher has to work while any screen is open, and the 5 Hz path has
     one owner. */
  function alertTick() {
    var cfg = alertConfig();
    if (!cfg.enabled) { alertSince = 0; return; }

    // The tool says out loud that a hidden tab gets no alert. This is the line
    // that makes that sentence true.
    if (doc && doc.hidden) { alertSince = 0; return; }

    var engine = E();
    if (!engine || typeof engine.isRunning !== 'function' || !engine.isRunning()) {
      alertSince = 0;
      return;
    }
    var reading = latest();
    if (!reading || !reading.zones) { alertSince = 0; return; }
    if (Date.now() - reading.t > ALERT_STALE_MS) { alertSince = 0; return; }

    var wanted = cfg.level === 'warning' ? 1 : 2;
    if (zoneRank(reading.zones[cfg.metricId]) < wanted) { alertSince = 0; return; }

    if (!alertSince) { alertSince = reading.t; return; }
    if (reading.t - alertSince < cfg.sustainS * 1000) return;
    if (Date.now() - alertFiredAt < ALERT_COOLDOWN_MS) return;

    alertFiredAt = Date.now();
    fireAlert(cfg, reading);
  }

  function fireAlert(cfg, reading) {
    var m = metric(cfg.metricId);
    var scale = S();
    var messagePL = T('modules.09.firedTpl', {
      name: m ? m.namePL : cfg.metricId,
      zone: scale ? scale.stamp(reading.zones[cfg.metricId]).wordPL : '',
      sec: Math.round((reading.t - alertSince) / 1000),
      value: fmtUnit(cfg.metricId, reading.values ? reading.values[cfg.metricId] : null)
    });

    // In-app only: a toast and the live region. No system notification is ever
    // requested, so nothing here can arrive when the app is closed.
    toast(messagePL, zoneTone(reading.zones[cfg.metricId]) || 'warn');
    say(messagePL);
    if (cfg.sound) beep();
    try {
      if (global.navigator && global.navigator.vibrate) global.navigator.vibrate([120, 80, 120]);
    } catch (err) { /* unsupported: silence is an acceptable degradation */ }
    // The measurement keeps running. An alert that stopped the camera would
    // destroy the very data the user asked to be warned about.
  }

  /* A short sine burst built in the device. No file, no network, and only ever
     as a direct consequence of an alert the user switched on. */
  function beep() {
    try {
      var Ctx = global.AudioContext || global.webkitAudioContext;
      if (!Ctx) return;
      var ctx = new Ctx();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 660;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.36);
      osc.onended = function () { try { ctx.close(); } catch (err) { /* already closed */ } };
    } catch (err) { /* autoplay policy or no audio device: not worth a message */ }
  }

  /* ==================================================================
     12 — Dokumentacja (documentation)
     ================================================================== */

  function metricDocCard(m) {
    var built = card({ title: m.namePL, subtitle: m.shortPL });
    put(built.body, el('p', '', m.helpPL));

    var map = thresholds() || {};
    var t = map[m.id] || { warn: m.warn, crit: m.crit };
    var rows = [
      [{ textPL: T('help.unit'), head: true }, { textPL: m.unit }],
      [{ textPL: T('help.range'), head: true },
        { textPL: fmt(m.id, m.min) + RANGE_DASH + fmt(m.id, m.max), num: true }],
      [{ textPL: T('help.warn'), head: true }, { textPL: fmtUnit(m.id, t.warn), num: true }],
      [{ textPL: T('help.crit'), head: true }, { textPL: fmtUnit(m.id, t.crit), num: true }],
      [{ textPL: T('help.availability'), head: true },
        { textPL: m.premium ? T('help.premium') : T('help.free') }]
    ];
    put(built.body, table(m.namePL,
      [T('tools.docsColProperty'), T('tools.docsColValue')], rows));

    if (m.id === 'kelvin' || m.id === 'melanopic') {
      put(built.body, el('p', 'ms4-field__hint', T('note.approxLegend')));
    }
    if (m.id === 'kelvin') {
      put(built.body, el('p', 'ms4-field__hint', T('note.kelvinOutOfRange')));
    }
    if (m.id === 'flicker') {
      put(built.body, el('p', 'ms4-field__hint', T('note.flickerOutOfRange')));
    }
    return built.root;
  }

  function openDocs() {
    return openTool({
      title: T('tools.docs'),
      subtitle: T('tools.docsDesc'),
      actions: function (handle) { return [closeAction(handle)]; },
      build: function (body) {
        put(body, note('limits', T('note.dashTitle'), T('note.dashText')));

        put(body, section(T('note.howToTitle')));
        var how = list();
        var howTo = TL('note.howTo');
        for (var i = 0; i < howTo.length; i += 1) {
          put(how, row({ icon: 'bulb', title: howTo[i].titlePL, subtitle: howTo[i].textPL }));
        }
        put(body, how);

        put(body, section(T('tools.docsMetricsTitle'), T('tools.docsMetricsSub')));
        var items = catalogue();
        for (var j = 0; j < items.length; j += 1) put(body, metricDocCard(items[j]));

        put(body, section(T('tools.premiumWord')));
        put(body, note('info', '', T('demo.fairness'), 'crown'));

        put(body, section(T('tools.docsGlossaryTitle')));
        var glossary = TL('tools.docsGlossary');
        var terms = list();
        for (var k = 0; k < glossary.length; k += 1) {
          put(terms, row({ icon: 'book', title: glossary[k].termPL, subtitle: glossary[k].textPL }));
        }
        put(body, terms);

        put(body, section(T('account.privacy')));
        put(body, note('demo', T('account.privacy'), T('account.privacyText'), 'shield'));

        put(body, section(T('account.aboutTitle')));
        var about = list();
        put(about, row({
          icon: 'info', title: T('account.version'), value: T('account.versionValue')
        }));
        put(body, about);
      }
    });
  }

  /* ==================================================================
     The TOOLS view
     ================================================================== */

  function toolGroups() {
    return [
      {
        titlePL: T('tools.groupMeasure'),
        items: [
          { id: 'thresholds', namePL: T('tools.thresholds'), descPL: T('modules.02.descPL'), icon: 'sliders', open: openThresholds },
          { id: 'calibration', namePL: T('tools.calibration'), descPL: T('modules.03.descPL'), icon: 'calibrate', open: openCalibration },
          { id: 'screentest', namePL: T('tools.screentest'), descPL: T('modules.07.descPL'), icon: 'screen', open: openScreenTest }
        ]
      },
      {
        titlePL: T('tools.groupData'),
        items: [
          { id: 'reports', namePL: T('tools.reports'), descPL: T('modules.04.descPL'), icon: 'report', open: openReports },
          { id: 'export', namePL: T('tools.export'), descPL: T('modules.05.descPL'), icon: 'export', open: openExport },
          { id: 'compare', namePL: T('tools.compare'), descPL: T('modules.06.descPL'), icon: 'compare', open: openCompare }
        ]
      },
      {
        titlePL: T('tools.groupAuto'),
        items: [
          { id: 'schedule', namePL: T('tools.schedule'), descPL: T('modules.08.descPL'), icon: 'schedule', open: openSchedule },
          { id: 'alerts', namePL: T('tools.alerts'), descPL: T('modules.09.descPL'), icon: 'bell', open: openAlerts }
        ]
      },
      {
        titlePL: T('tools.groupKnow'),
        items: [
          { id: 'docs', namePL: T('tools.docs'), descPL: T('tools.docsDesc'), icon: 'book', open: openDocs }
        ]
      }
    ];
  }

  function toolCard(item) {
    var node = el('button', 'ms4-card ms4-card--interactive ms4-tool');
    node.type = 'button';
    node.setAttribute('aria-label', T('tools.openAria', { name: item.namePL }));

    var glyph = put(node, el('span', 'ms4-tool__icon'));
    put(glyph, icon(item.icon, 24));

    put(node, icon('chevron-right', 20, 'ms4-tool__chevron'));

    put(node, el('h3', 'ms4-tool__title', item.namePL));
    put(node, el('p', 'ms4-tool__desc ms4-clamp2', item.descPL));

    on(node, 'click', function () { item.open(); });
    return node;
  }

  function buildToolsView(root) {
    put(root, el('p', 'ms4-muted', T('tools.sub')));

    var groups = toolGroups();
    for (var i = 0; i < groups.length; i += 1) {
      put(root, section(groups[i].titlePL));
      var grid = put(root, el('div', 'ms4-grid ms4-grid--tools ms4-tools'));
      for (var j = 0; j < groups[i].items.length; j += 1) {
        put(grid, toolCard(groups[i].items[j]));
      }
    }
  }

  /* ==================================================================
     Public interface, registration and the two background workers
     ================================================================== */

  var Tools = {
    openThresholds: openThresholds,
    openCalibration: openCalibration,
    openReports: openReports,
    openExport: openExport,
    openCompare: openCompare,
    openScreenTest: openScreenTest,
    openSchedule: openSchedule,
    openAlerts: openAlerts,
    openDocs: openDocs
  };

  global.Tools = Tools;

  var VIEW = {
    id: 'tools',
    labelPL: T('tools.title'),
    icon: 'tools',
    build: buildToolsView,
    enter: function () { /* the grid is static; nothing to refresh on entry */ },
    leave: function () { closePlane(); }
  };

  /* app.js is the last script (SPEC 0.2), so window.App does not exist yet when
     this file runs. The four screens queue themselves in
     window.__ms4PendingViews — whichever screen runs first also installs the
     stub App that writes into that queue — and app.js drains it in script
     order, which is the order the views take in the navigation. */
  function registerView(view) {
    var A = global.App;
    if (A && typeof A.registerView === 'function' && !A.__pending) {
      A.registerView(view);
      return;
    }
    var q = global.__ms4PendingViews || (global.__ms4PendingViews = []);
    q.push(view);
    if (!A) global.App = { registerView: registerView, __pending: q };
  }

  registerView(VIEW);

  /* The two workers outlive every sheet: an alert that only fired while its
     own screen was open would be an alert nobody would ever see. */
  function startWorkers() {
    global.setInterval(alertTick, WATCH_TICK_MS);
    global.setInterval(scheduleTick, SCHEDULE_TICK_MS);
    if (global.Bus) {
      global.Bus.on('engine:stopped', function (data) {
        rememberSession(data && data.session);
      });
    }
  }

  if (global.Bus && typeof global.Bus.once === 'function') global.Bus.once('app:ready', startWorkers);
  else if (doc && doc.addEventListener) doc.addEventListener('DOMContentLoaded', startWorkers);

}(typeof window !== 'undefined' ? window : globalThis));
