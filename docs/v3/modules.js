/* Monitor Światła v3 — modules.js — modules 02 to 09.
 *
 *   02 Progi         thresholds and profiles
 *   03 Kalibracja    white-card calibration
 *   04 Raporty       daily and weekly print-out
 *   05 Eksport       CSV and JSON, Blob + a[download], never the network
 *   06 Porównanie    two finished sessions on one tape
 *   07 Test ekranu   full-screen test planes
 *   08 Harmonogram   reminders about a measurement
 *   09 Alerty        in-app alert on a threshold
 *
 * Three contract rules from DESIGN.md 9.3 shape everything below:
 *
 *   1. NOBODY here subscribes to `engine:sample` — that is dash.js's alone.
 *      Modules read live data through UI3.onLive(), which the shell throttles
 *      to 1 Hz and only calls while a module is on screen. The alert watcher
 *      (09) and the schedule ticker (08) have to work with the dashboard
 *      showing, so they poll Engine.latest() on their own 1 Hz timer instead:
 *      a public read, not a second subscription to the sampler.
 *   2. NOBODY here calls Engine.start / stop / switchCamera. The schedule
 *      therefore reminds and offers a way back to the dashboard; the human
 *      presses the key. A timer that started the camera on its own would be
 *      exactly the thing rule 4 of the contract forbids.
 *   3. NO Polish literal lives in this file. Every string is looked up in
 *      Scale.TEXT (module wording sits under Scale.TEXT.modules.<no>), and a
 *      missing key produces one English console warning and an empty string —
 *      never an invented sentence.
 *
 * Geometry (percentages, bands, zones) comes from Scale. Numbers are formatted
 * by Scale.formatValue, which gives the Polish decimal comma.
 */
(function (global) {
  'use strict';

  var doc = global.document;

  /* ------------------------------------------------------------------
     Constants
     ------------------------------------------------------------------ */

  var KEY_PROFILES = 'ms3.profiles.v1';
  var KEY_SESSIONS = 'ms3.sessions.v1';
  var KEY_SCHEDULE = 'ms3.schedule.v1';
  var KEY_ALERTS   = 'ms3.alerts.v1';

  var MINUTE_MS = 60000;
  var HOUR_MS   = 3600000;
  var DAY_MS    = 86400000;
  var WEEK_MS   = 7 * DAY_MS;

  var CALIB_MS = 3000;          // three seconds of white card, as in v2
  var CALIB_STEP_MS = 200;      // one engine sample per read attempt
  var CALIB_MIN_SAMPLES = 5;
  var CALIB_MIN_LEVEL = 8;      // below this the frame is too dark to trust

  var MAX_SESSIONS = 12;        // kept in localStorage, oldest dropped first
  var SESSION_POINTS = 90;      // points stored per session — enough for a tape
  var TAPE_BUCKETS = 48;

  var ALERT_COOLDOWN_MS = 120000;   // at most one alert per two minutes
  var ALERT_MIN_SUSTAIN = 5;
  var ALERT_MAX_SUSTAIN = 3600;
  var ALERT_STALE_MS = 3000;        // a reading older than this is not "now"

  var SCHEDULE_TICK_MS = 20000;
  var WATCH_TICK_MS = 1000;

  /* ------------------------------------------------------------------
     Polish wording — Scale.TEXT is the only source (9.3)
     ------------------------------------------------------------------ */

  var warned = {};

  function node(path) {
    var table = global.Scale && global.Scale.TEXT;
    if (!table) return undefined;
    var parts = path.split('.');
    var cur = table;
    for (var i = 0; i < parts.length; i += 1) {
      if (cur === null || typeof cur !== 'object') return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function warnOnce(path) {
    if (warned[path]) return;
    warned[path] = true;
    if (global.console && global.console.warn) {
      global.console.warn('modules.js: Scale.TEXT has no "' + path + '"');
    }
  }

  /** A sentence. `vars` fills {placeholders}. */
  function T(path, vars) {
    var found = node(path);
    if (typeof found !== 'string') { warnOnce(path); return ''; }
    return vars ? fill(found, vars) : found;
  }

  /** A list of sentences or of objects (steps, planes, built-in profiles). */
  function TL(path) {
    var found = node(path);
    if (!found || typeof found.length !== 'number') { warnOnce(path); return []; }
    return found;
  }

  function fill(tpl, vars) {
    return String(tpl).replace(/\{(\w+)\}/g, function (whole, k) {
      return Object.prototype.hasOwnProperty.call(vars, k) ? String(vars[k]) : whole;
    });
  }

  /* ------------------------------------------------------------------
     Tiny DOM helpers — the same shape shell.js and dash.js use
     ------------------------------------------------------------------ */

  function make(tag, className) {
    var el = doc.createElement(tag);
    if (className) el.className = className;
    return el;
  }

  function put(parent, child) {
    parent.appendChild(child);
    return child;
  }

  function setText(el, value) {
    if (el && el.textContent !== value) el.textContent = value;
  }

  function clear(el) {
    while (el && el.firstChild) el.removeChild(el.firstChild);
  }

  function textNode(parent, tag, className, textPL) {
    var el = put(parent, make(tag, className));
    el.textContent = textPL;
    return el;
  }

  /* Rule 5 of the contract: every interactive element is a real <button>. */
  function keyBtn(labelPL, className, onClick, ariaPL) {
    var btn = make('button', 'ms3-key ' + (className || 'ms3-key--ghost'));
    btn.type = 'button';
    var label = put(btn, make('span', 'ms3-key__label'));
    label.textContent = labelPL;
    if (ariaPL) btn.setAttribute('aria-label', ariaPL);
    if (onClick) btn.addEventListener('click', onClick);
    return btn;
  }

  function section(titlePL) {
    var el = make('section', 'ms3-screen__section');
    if (titlePL) textNode(el, 'h2', '', titlePL);
    return el;
  }

  function actions() {
    return make('div', 'ms3-actions');
  }

  /** 5.11 — variant is 'limits' | 'warning' | 'demo'. `body` is one sentence
   *  or an array of them. */
  function note(variant, titlePL, body) {
    var el = make('aside', 'ms3-note ms3-note--' + variant);
    if (titlePL) textNode(el, 'span', 'ms3-note__title', titlePL);
    var list = typeof body === 'string' ? [body] : (body || []);
    for (var i = 0; i < list.length; i += 1) {
      textNode(el, 'p', 'ms3-note__text', list[i]);
    }
    return el;
  }

  /* An empty screen (8.6) is one calm sentence. It keeps the note's left bar
     so it reads as an aside, but no overline: chapter 8 gives these screens a
     sentence and no heading, and inventing one would be inventing wording. */
  function emptyNote(textPL) {
    return note('limits', '', textPL);
  }

  function srOnly(parent, textPL) {
    return textNode(parent, 'span', 'ms3-sr', textPL);
  }

  /* The enclosing module screen. Matching on the whole class token matters:
     the body of a screen is `ms3-screen__body`, which starts with the same
     eight characters and would otherwise answer for the screen itself. */
  function closestScreen(el) {
    var cur = el;
    while (cur && cur !== doc.body) {
      if (cur.className && (' ' + cur.className + ' ').indexOf(' ms3-screen ') !== -1) return cur;
      cur = cur.parentNode;
    }
    return null;
  }

  /* UI3 builds a module once and then only unhides it, so anything that reads
     storage or history has to redraw when the screen comes back. There is no
     "screen opened" event in the shell contract, so the `hidden` attribute of
     the screen itself is the signal. */
  function onShow(root, fn) {
    var screen = closestScreen(root);
    if (!screen || !global.MutationObserver) return;
    var obs = new global.MutationObserver(function () {
      if (screen.hidden) return;
      try { fn(); } catch (err) {
        if (global.console && global.console.error) global.console.error('modules.js: onShow', err);
      }
    });
    obs.observe(screen, { attributes: true, attributeFilter: ['hidden'] });
  }

  /* ------------------------------------------------------------------
     Storage — every access guarded; private mode throws on read too
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

  /* ------------------------------------------------------------------
     Engine, metrics and premium access
     ------------------------------------------------------------------ */

  function E() { return global.Engine || null; }
  function S() { return global.Scale || null; }
  function M() { return global.Metrics || null; }

  function catalogue() {
    var m = M();
    return m && m.CATALOGUE ? m.CATALOGUE : [];
  }

  function metric(id) {
    var m = M();
    return m && m.byId ? m.byId(id) : null;
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

  function leadId() {
    var ui = global.UI3;
    var id = ui && typeof ui.leadChannel === 'function' ? ui.leadChannel() : 'share';
    return metric(id) ? id : 'share';
  }

  /* The catalogue says a metric is paid; whether it is locked right now is
     offer.js's business. Default to locked, exactly as dash.js does. */
  function isLocked(m) {
    if (!m || !m.premium) return false;
    var offer = global.Offer;
    if (offer && typeof offer.isUnlocked === 'function') {
      try { if (offer.isUnlocked(m.id)) return false; } catch (err) { /* stays locked */ }
    }
    return true;
  }

  function zoneMod(zone) {
    if (zone === 'good' || zone === 'warning' || zone === 'critical') return zone;
    return 'none';
  }

  function isNum(v) {
    return typeof v === 'number' && isFinite(v);
  }

  function fmt(id, value) {
    var Scale = S();
    return Scale ? Scale.formatValue(id, value) : String(value);
  }

  function unit(id) {
    var Scale = S();
    return Scale && Scale.unitSuffix ? Scale.unitSuffix(id) : '';
  }

  function fmtUnit(id, value) {
    if (!isNum(value)) return T('common.noValue');
    return fmt(id, value) + unit(id);
  }

  function toast(textPL, opts) {
    var ui = global.UI3;
    if (ui && typeof ui.toast === 'function' && textPL) ui.toast(textPL, opts);
  }

  function say(textPL) {
    var ui = global.UI3;
    if (ui && typeof ui.say === 'function' && textPL) ui.say(textPL);
  }

  /* ------------------------------------------------------------------
     Dates and clock — digits and separators only, no Polish words
     ------------------------------------------------------------------ */

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

  function durationWords(ms) {
    var Scale = S();
    return Scale && Scale.durationWords ? Scale.durationWords(ms) : String(Math.round(ms / 1000));
  }

  /* ------------------------------------------------------------------
     Shared components
     ------------------------------------------------------------------ */

  /** 5.13 — the range switch. Returns { el, set(value) }. */
  function segments(ariaPL, items, value, onPick) {
    var wrap = make('div', 'ms3-segments');
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', ariaPL);
    var buttons = [];

    function paint(active) {
      for (var i = 0; i < buttons.length; i += 1) {
        buttons[i].setAttribute('aria-pressed', buttons[i].getAttribute('data-value') === active ? 'true' : 'false');
      }
    }

    for (var i = 0; i < items.length; i += 1) {
      (function (item) {
        var btn = make('button', 'ms3-segments__item');
        btn.type = 'button';
        btn.textContent = item.labelPL;
        btn.setAttribute('data-value', item.value);
        btn.addEventListener('click', function () {
          paint(item.value);
          onPick(item.value);
        });
        buttons.push(put(wrap, btn));
      }(items[i]));
    }
    paint(value);
    return { el: wrap, set: paint };
  }

  /** 5.12 — the tabular print-out. `rows` are arrays of cells; a cell is a
   *  string or { textPL, num, head, lock }. */
  function table(captionPL, headings, rows) {
    var wrap = make('div', 'ms3-tablewrap');
    var tbl = put(wrap, make('table', 'ms3-table'));
    if (captionPL) textNode(tbl, 'caption', 'ms3-sr', captionPL);

    var thead = put(tbl, make('thead', ''));
    var htr = put(thead, make('tr', ''));
    for (var i = 0; i < headings.length; i += 1) {
      var th = textNode(htr, 'th', '', headings[i]);
      th.setAttribute('scope', 'col');
    }

    var tbody = put(tbl, make('tbody', ''));
    for (var r = 0; r < rows.length; r += 1) {
      var tr = put(tbody, make('tr', ''));
      for (var c = 0; c < rows[r].length; c += 1) {
        var cell = rows[r][c];
        if (typeof cell === 'string') cell = { textPL: cell };
        var el = put(tr, make(cell.head ? 'th' : 'td', cell.num ? 'ms3-num' : ''));
        if (cell.head) el.setAttribute('scope', 'row');
        if (cell.lock) {
          var lock = put(el, make('span', 'ms3-lock'));
          lock.setAttribute('aria-hidden', 'true');
          srOnly(el, T('channels.locked'));
        }
        if (cell.textPL) {
          var span = put(el, make('span', ''));
          span.textContent = cell.textPL;
        }
      }
    }
    return wrap;
  }

  /** 6.4 — the bar panorama. `buckets` is an array of 'good'|'warning'|
   *  'critical'|null; null means "no measurement", drawn as a mark on the
   *  baseline, never as an empty column. */
  function bars(buckets, ariaPL, captionPL) {
    var wrap = make('div', '');
    var strip = put(wrap, make('div', 'ms3-bars'));
    strip.setAttribute('role', 'img');
    strip.setAttribute('aria-label', ariaPL);
    for (var i = 0; i < buckets.length; i += 1) {
      var zone = buckets[i];
      var cls = 'ms3-bars__bar';
      if (zone === null || zone === undefined) cls += ' ms3-bars__bar--empty';
      else if (zone !== 'good') cls += ' ms3-bars__bar--' + zone;
      put(strip, make('span', cls));
    }
    if (captionPL) textNode(wrap, 'p', 'ms3-bars__caption', captionPL);
    return wrap;
  }

  /** A label + control + hint block. Returns the wrapper. */
  function field(labelPL, control, hintPL, forId) {
    var wrap = make('div', 'ms3-field');
    if (labelPL) {
      var label = textNode(wrap, 'label', 'ms3-field__label', labelPL);
      if (forId) label.setAttribute('for', forId);
    }
    if (control) put(wrap, control);
    if (hintPL) textNode(wrap, 'p', 'ms3-field__hint', hintPL);
    return wrap;
  }

  function selectControl(id, options, value, onChange) {
    var sel = make('select', 'ms3-field__input');
    sel.id = id;
    for (var i = 0; i < options.length; i += 1) {
      var opt = make('option', '');
      opt.value = options[i].value;
      opt.textContent = options[i].labelPL;
      if (String(options[i].value) === String(value)) opt.selected = true;
      sel.appendChild(opt);
    }
    sel.addEventListener('change', function () { onChange(sel.value); });
    return sel;
  }

  function checkOption(id, labelPL, checked, onChange) {
    var wrap = make('div', 'ms3-field');
    var opt = put(wrap, make('label', 'ms3-field__option'));
    opt.setAttribute('for', id);
    var input = put(opt, make('input', 'ms3-field__check'));
    input.type = 'checkbox';
    input.id = id;
    input.checked = !!checked;
    input.addEventListener('change', function () { onChange(input.checked); });
    textNode(opt, 'span', '', labelPL);
    return { el: wrap, input: input };
  }

  /** A bordered row with a title, a sub-line and keys on the right. */
  function row(namePL, subPL) {
    var el = make('div', 'ms3-row');
    var text = put(el, make('div', 'ms3-row__text'));
    textNode(text, 'span', 'ms3-row__name', namePL);
    if (subPL) textNode(text, 'span', 'ms3-row__sub', subPL);
    var end = put(el, make('div', 'ms3-row__end'));
    return { el: el, text: text, end: end };
  }

  /* ==================================================================
     02 — Progi
     ================================================================== */

  var BUILTIN_MAPS = {
    // Editorial judgements, not standards. "Wieczór" is stricter about
    // everything connected with sleep; "Praca" loosens brightness so a well
    // lit desk in daylight does not read as a warning all day long.
    'builtin.default': null,        // null = Engine.defaultThresholds()
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
    var list = readJson(KEY_PROFILES, []);
    return Object.prototype.toString.call(list) === '[object Array]' ? list : [];
  }

  function listProfiles() {
    var out = [];
    var builtin = TL('modules.02.builtin');
    for (var i = 0; i < builtin.length; i += 1) {
      out.push({ id: builtin[i].id, namePL: builtin[i].namePL, descPL: builtin[i].descPL, builtin: true });
    }
    var custom = customProfiles();
    for (var j = 0; j < custom.length; j += 1) {
      out.push({
        id: custom[j].id,
        namePL: custom[j].namePL,
        descPL: T('modules.02.profileCustomTpl', { date: fmtDate(custom[j].at) }),
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

  var thr = {
    root: null,
    rows: {},          // metricId -> { warn, crit, warnOut, critOut, preview }
    profileList: null,
    nameInput: null,
    offLive: null
  };

  function buildThresholds(root) {
    thr.root = root;

    var intro = section('');
    put(intro, note('limits', T('modules.02.introTitle'), T('modules.02.intro')));
    var top = put(intro, actions());
    put(top, keyBtn(T('common.reset'), 'ms3-key--ghost', function () {
      var engine = E();
      if (!engine || typeof engine.resetThresholds !== 'function') return;
      engine.resetThresholds();
      toast(T('modules.02.resetDone'));
    }));
    put(root, intro);

    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) put(root, thresholdCard(list[i]));

    put(root, profilesSection());

    syncThresholds();
    onShow(root, syncThresholds);

    // The preview needle follows the live reading at 1 Hz. The shell only
    // calls subscribers while a module is on screen, and the guard below drops
    // the call when the open module is somebody else's.
    var ui = global.UI3;
    if (ui && typeof ui.onLive === 'function') {
      thr.offLive = ui.onLive(function (reading) {
        if (!visible(thr.root)) return;
        paintThresholdNeedles(reading);
      });
    }

    if (global.Bus) {
      global.Bus.on('engine:thresholds', function () { syncThresholds(); });
      global.Bus.on('ui3:theme', function () { repaintThresholdPreviews(); });
    }
  }

  function visible(root) {
    var screen = closestScreen(root);
    return !!screen && !screen.hidden;
  }

  function sliderStep(m) {
    if (m.id === 'kelvin') return 100;
    if (m.decimals >= 2) return 0.01;
    if (m.decimals === 1) return 0.5;
    return 1;
  }

  function thresholdCard(m) {
    var el = section(m.namePL + ' (' + m.unit + ')');
    var entry = { metric: m };
    thr.rows[m.id] = entry;

    textNode(el, 'p', 'ms3-field__hint', m.shortPL);

    // The preview is the same ruler as the dashboard: same bands, same ticks,
    // same needle. Chapter 1 rule 3 — one instrument in three sizes.
    var preview = put(el, make('div', 'ms3-scale'));
    preview.setAttribute('role', 'img');
    preview.setAttribute('aria-label', T('modules.02.previewAriaTpl', { name: m.namePL }));
    entry.bands = put(preview, make('div', 'ms3-scale__bands'));
    put(preview, make('div', 'ms3-scale__base'));
    entry.ticks = put(preview, make('div', 'ms3-scale__ticks'));
    var track = put(preview, make('div', 'ms3-needle-track'));
    entry.needle = put(track, make('div', 'ms3-needle'));
    entry.needle.hidden = true;
    entry.labels = put(preview, make('div', 'ms3-scale__labels'));
    entry.preview = preview;

    entry.now = textNode(el, 'p', 'ms3-context', '');

    entry.warn = slider(el, m, 'warn', T('modules.02.warnLabel'));
    entry.crit = slider(el, m, 'crit', T('modules.02.critLabel'));

    textNode(el, 'p', 'ms3-field__hint',
      m.invert ? T('modules.02.orderInvert') : T('modules.02.orderNormal'));

    return el;
  }

  function slider(parent, m, which, captionPL) {
    var id = 'ms3Thr-' + which + '-' + m.id;
    var wrap = put(parent, make('div', 'ms3-field'));
    var label = textNode(wrap, 'label', 'ms3-field__label', captionPL);
    label.setAttribute('for', id);

    var line = put(wrap, make('div', 'ms3-field__row'));
    var input = put(line, make('input', 'ms3-field__range'));
    input.type = 'range';
    input.id = id;
    input.min = String(m.min);
    input.max = String(m.max);
    input.step = String(sliderStep(m));
    input.setAttribute('aria-label',
      T('modules.02.sliderAriaTpl', { name: m.namePL, which: captionPL }));

    var out = put(line, make('output', 'ms3-field__value'));
    out.setAttribute('for', id);

    function show(value) {
      var textPL = fmtUnit(m.id, value);
      setText(out, textPL);
      input.setAttribute('aria-valuetext', textPL);
    }

    // Dragging only moves the number; the engine hears about it on release.
    input.addEventListener('input', function () { show(Number(input.value)); });
    input.addEventListener('change', function () {
      commitThreshold(m, which, Number(input.value));
    });

    return { input: input, out: out, show: show };
  }

  function commitThreshold(m, which, value) {
    var engine = E();
    if (!engine || typeof engine.setThresholds !== 'function') return;
    var patch = {};
    patch[m.id] = {};
    patch[m.id][which] = value;
    if (engine.setThresholds(patch, 'user')) {
      toast(T('transient.thresholdsSaved'));
      return;
    }
    // Refused. The engine validates all or nothing, so the sliders go back to
    // what is actually in force rather than showing a value nobody uses.
    toast(T('transient.thresholdsRejected'));
    syncThresholds();
  }

  function syncThresholds() {
    var map = thresholds();
    if (!map) return;
    for (var id in thr.rows) {
      if (!Object.prototype.hasOwnProperty.call(thr.rows, id)) continue;
      var entry = thr.rows[id];
      var t = map[id];
      if (!t || !entry.warn) continue;
      entry.warn.input.value = String(t.warn);
      entry.warn.show(t.warn);
      entry.crit.input.value = String(t.crit);
      entry.crit.show(t.crit);
    }
    repaintThresholdPreviews();
  }

  function repaintThresholdPreviews() {
    var Scale = S();
    if (!Scale) return;
    var map = thresholds();
    for (var id in thr.rows) {
      if (!Object.prototype.hasOwnProperty.call(thr.rows, id)) continue;
      paintRuler(thr.rows[id], id, map, Scale);
    }
  }

  function paintRuler(entry, id, map, Scale) {
    if (!entry.bands) return;
    var i, span;

    clear(entry.bands);
    var bandList = Scale.bands(id, map) || [];
    for (i = 0; i < bandList.length; i += 1) {
      span = make('span', 'ms3-band ms3-band--' + zoneMod(bandList[i].zone));
      span.style.left = bandList[i].from + '%';
      span.style.width = Math.max(0, bandList[i].to - bandList[i].from) + '%';
      entry.bands.appendChild(span);
    }

    var ticks = Scale.ticks(id) || { major: [], minor: [] };
    clear(entry.ticks);
    for (i = 0; i < ticks.minor.length; i += 1) {
      span = make('span', 'ms3-tick');
      span.style.left = ticks.minor[i] + '%';
      entry.ticks.appendChild(span);
    }
    for (i = 0; i < ticks.major.length; i += 1) {
      span = make('span', 'ms3-tick ms3-tick--major');
      span.style.left = ticks.major[i].pos + '%';
      entry.ticks.appendChild(span);
    }

    clear(entry.labels);
    for (i = 0; i < ticks.major.length; i += 1) {
      span = make('span', '');
      span.style.left = ticks.major[i].pos + '%';
      span.textContent = ticks.major[i].labelPL;
      entry.labels.appendChild(span);
    }
  }

  function paintThresholdNeedles(reading) {
    var Scale = S();
    if (!Scale) return;
    var values = reading && reading.values ? reading.values : null;
    for (var id in thr.rows) {
      if (!Object.prototype.hasOwnProperty.call(thr.rows, id)) continue;
      var entry = thr.rows[id];
      if (!entry.needle) continue;
      var m = entry.metric;
      var value = values && !isLocked(m) ? values[id] : null;
      var pos = isNum(value) ? Scale.pos(id, value) : null;
      if (pos === null) {
        entry.needle.hidden = true;
        setText(entry.now, '');
      } else {
        entry.needle.hidden = false;
        entry.needle.style.setProperty('--ms3-pos', String(pos));
        setText(entry.now, T('modules.02.nowTpl', { value: fmtUnit(id, value) }));
      }
    }
  }

  function profilesSection() {
    var el = section(T('modules.02.profilesTitle'));
    textNode(el, 'p', 'ms3-field__hint', T('modules.02.profilesHint'));

    thr.profileList = put(el, make('div', 'ms3-rows'));
    renderProfiles();

    var id = 'ms3ProfileName';
    var input = make('input', 'ms3-field__input');
    input.type = 'text';
    input.id = id;
    input.maxLength = 40;
    thr.nameInput = input;
    put(el, field(T('modules.02.profileNameLabel'), input, T('modules.02.profileNameHint'), id));

    var act = put(el, actions());
    put(act, keyBtn(T('modules.02.profileSaveKey'), 'ms3-key--ghost', function () {
      saveProfile();
    }));
    return el;
  }

  function renderProfiles() {
    if (!thr.profileList) return;
    clear(thr.profileList);
    var list = listProfiles();
    for (var i = 0; i < list.length; i += 1) {
      (function (p) {
        var r = row(p.namePL, p.descPL);
        put(r.end, keyBtn(T('modules.02.profileApply'), 'ms3-key--ghost', function () {
          applyProfile(p);
        }));
        if (!p.builtin) {
          put(r.end, keyBtn(T('modules.02.profileRemove'), 'ms3-key--ghost', function () {
            removeProfile(p);
          }, T('modules.02.profileRemove') + ': ' + p.namePL));
        }
        put(thr.profileList, r.el);
      }(list[i]));
    }
  }

  function applyProfile(p) {
    var engine = E();
    var map = profileMap(p.id);
    if (!engine || !map || typeof engine.setThresholds !== 'function' ||
        !engine.setThresholds(map, 'profile')) {
      toast(T('modules.02.profileFailed'));
      return;
    }
    syncThresholds();
    toast(T('modules.02.profileAppliedTpl', { name: p.namePL }));
  }

  function saveProfile() {
    var engine = E();
    if (!engine || typeof engine.getThresholds !== 'function') return;
    var name = (thr.nameInput ? thr.nameInput.value : '').replace(/^\s+|\s+$/g, '');
    if (!name) { toast(T('modules.02.profileNameEmpty')); return; }
    var list = customProfiles();
    list.push({
      id: 'user.' + Date.now().toString(36),
      namePL: name.slice(0, 40),
      map: engine.getThresholds(),
      at: Date.now()
    });
    writeJson(KEY_PROFILES, list);
    thr.nameInput.value = '';
    renderProfiles();
    toast(T('modules.02.profileSavedTpl', { name: name }));
  }

  function removeProfile(p) {
    var list = customProfiles();
    var kept = [];
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].id !== p.id) kept.push(list[i]);
    }
    writeJson(KEY_PROFILES, kept);
    renderProfiles();
    toast(T('modules.02.profileRemovedTpl', { name: p.namePL }));
  }

  /* ==================================================================
     03 — Kalibracja
     ================================================================== */

  var cal = { status: null, gains: null, runKey: null, running: false };

  function buildCalibration(root) {
    var why = section('');
    put(why, note('limits', T('modules.03.whyTitle'), T('modules.03.why')));
    put(root, why);

    var steps = section(T('modules.03.stepsTitle'));
    var list = put(steps, make('ol', 'ms3-ol'));
    var stepList = TL('modules.03.steps');
    for (var i = 0; i < stepList.length; i += 1) textNode(list, 'li', 'ms3-ol__item', stepList[i]);
    put(root, steps);

    var run = section('');
    cal.status = textNode(run, 'p', 'ms3-context', '');
    cal.gains = put(run, make('div', ''));
    var act = put(run, actions());
    cal.runKey = put(act, keyBtn(T('modules.03.runKey'), 'ms3-key--ghost', function () {
      startCalibration();
    }));
    put(act, keyBtn(T('modules.03.clearKey'), 'ms3-key--ghost', function () {
      var engine = E();
      if (engine && typeof engine.setCalibration === 'function') engine.setCalibration(null);
      toast(T('modules.03.cleared'));
    }));
    put(root, run);

    var limits = section('');
    put(limits, note('limits', T('modules.03.limitsTitle'), TL('modules.03.limits')));
    put(root, limits);

    renderCalibrationStatus();
    onShow(root, renderCalibrationStatus);
    if (global.Bus) global.Bus.on('engine:calibration', function () { renderCalibrationStatus(); });
  }

  function renderCalibrationStatus() {
    if (!cal.status) return;
    var engine = E();
    var info = engine && typeof engine.getCalibration === 'function' ? engine.getCalibration() : null;

    setText(cal.status, info
      ? T('modules.03.statusOnTpl', { date: fmtDate(info.at), time: fmtHm(info.at) })
      : T('modules.03.statusNone'));

    clear(cal.gains);
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
    put(cal.gains, table(T('modules.03.gainsTitle'),
      [T('modules.03.colChannel'), T('modules.03.colGain')], rows));
  }

  function gainText(v) {
    return v.toFixed(3).replace('.', ',');
  }

  function startCalibration() {
    var engine = E();
    if (cal.running || !engine) return;
    if (typeof engine.isRunning !== 'function' || !engine.isRunning()) {
      toast(T('modules.03.needRunning'));
      return;
    }

    cal.running = true;
    if (cal.runKey) cal.runKey.setAttribute('aria-busy', 'true');

    var sumR = 0, sumG = 0, sumB = 0, n = 0;
    var startedAt = Date.now();

    var timer = global.setInterval(function () {
      var reading = typeof engine.latest === 'function' ? engine.latest() : null;
      if (reading) { sumR += reading.r; sumG += reading.g; sumB += reading.b; n += 1; }

      var elapsed = Date.now() - startedAt;
      var left = Math.max(0, Math.ceil((CALIB_MS - elapsed) / 1000));
      if (cal.status) setText(cal.status, T('modules.03.busyTpl', { sec: left }));
      if (elapsed < CALIB_MS) return;

      global.clearInterval(timer);
      cal.running = false;
      if (cal.runKey) cal.runKey.removeAttribute('aria-busy');
      finishCalibration(sumR, sumG, sumB, n);
    }, CALIB_STEP_MS);
  }

  function finishCalibration(sumR, sumG, sumB, n) {
    var engine = E();
    if (n < CALIB_MIN_SAMPLES) {
      renderCalibrationStatus();
      toast(T('modules.03.tooFew'));
      return;
    }
    var r = sumR / n, g = sumG / n, b = sumB / n;
    if (r < CALIB_MIN_LEVEL || g < CALIB_MIN_LEVEL || b < CALIB_MIN_LEVEL) {
      renderCalibrationStatus();
      toast(T('modules.03.tooDark'));
      return;
    }
    // Equalising the three channel means is the whole method: R = G = B on a
    // surface we know to be neutral.
    var target = (r + g + b) / 3;
    var ok = engine.setCalibration({
      gainR: target / r, gainG: target / g, gainB: target / b, at: Date.now()
    });
    renderCalibrationStatus();
    toast(ok ? T('modules.03.done') : T('modules.03.refused'));
    if (ok) say(T('modules.03.done'));
  }

  /* ==================================================================
     04 — Raporty
     ================================================================== */

  var rep = { kind: 'day', body: null };

  function buildReports(root) {
    var head = section('');
    var seg = segments(T('modules.04.rangeAria'), [
      { value: 'day', labelPL: T('modules.04.rangeDay') },
      { value: 'week', labelPL: T('modules.04.rangeWeek') }
    ], rep.kind, function (value) {
      rep.kind = value;
      renderReport();
    });
    put(head, seg.el);
    put(root, head);

    rep.body = put(root, make('div', 'ms3-screen__section'));
    renderReport();
    onShow(root, renderReport);

    if (global.Bus) {
      global.Bus.on('engine:history', function () { if (visible(rep.body)) renderReport(); });
    }
  }

  function reportData(kind) {
    var span = kind === 'week' ? WEEK_MS : DAY_MS;
    var bucketMs = kind === 'week' ? DAY_MS : HOUR_MS;
    var buckets = kind === 'week' ? 7 : 24;
    var until = Date.now();
    var from = until - span;
    var points = history({ sinceMs: from, untilMs: until });

    var map = thresholds();
    var Scale = S();
    var lead = leadId();
    var list = catalogue();
    var ids = [];
    var i, j;
    for (i = 0; i < list.length; i += 1) ids.push(list[i].id);

    var acc = {};
    for (i = 0; i < ids.length; i += 1) acc[ids[i]] = { sum: 0, n: 0, min: Infinity, max: -Infinity };

    var zones = { good: 0, warning: 0, critical: 0 };
    var slots = [];
    for (i = 0; i < buckets; i += 1) slots.push(null);
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

      // Pitfall 2 of chapter 0: point.zone is always the share zone, so the
      // zone of the lead channel is computed here instead of read.
      var zone = Scale ? Scale.zone(lead, p[lead], map) : null;
      if (zone && zones[zone] !== undefined) zones[zone] += 1;

      var slot = Math.floor((p.t - from) / bucketMs);
      if (slot >= 0 && slot < buckets) slots[slot] = worseZone(slots[slot], zone);

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

    // Worst hour: the highest share of samples outside the good band. Three
    // samples is not an hour, so those are skipped.
    var worstHour = null, worstScore = 0;
    for (var h in hours) {
      if (!Object.prototype.hasOwnProperty.call(hours, h)) continue;
      if (hours[h].n < 3) continue;
      var score = hours[h].bad / hours[h].n;
      if (score >= worstScore && score > 0) { worstScore = score; worstHour = Number(h); }
    }

    var covered = 0;
    for (i = 0; i < slots.length; i += 1) if (slots[i] !== null) covered += 1;

    return {
      kind: kind, fromMs: from, untilMs: until, samples: points.length,
      avg: avg, min: min, max: max, zones: zones, slots: slots,
      covered: covered, buckets: buckets,
      worstHour: worstHour, worstScore: worstScore, leadId: lead
    };
  }

  function worseZone(a, b) {
    var rank = { good: 1, warning: 2, critical: 3 };
    if (!b) return a;
    if (!a) return b;
    return rank[b] > rank[a] ? b : a;
  }

  function renderReport() {
    if (!rep.body) return;
    clear(rep.body);

    var data = reportData(rep.kind);
    var lead = metric(data.leadId);

    if (!data.samples) {
      put(rep.body, emptyNote(T('empty.reportsNoData')));
      return;
    }

    textNode(rep.body, 'p', 'ms3-context', T('modules.04.headTpl', {
      from: fmtDate(data.fromMs), to: fmtDate(data.untilMs), count: data.samples
    }));

    /* ---- panorama ---- */
    var panorama = put(rep.body, section(T('modules.04.panoramaTitle')));
    var spanPL = rep.kind === 'week' ? T('modules.04.panoramaSpanWeek') : T('modules.04.panoramaSpanDay');
    var coverage = rep.kind === 'week'
      ? T('modules.04.coverageWeekTpl', { done: data.covered, total: data.buckets })
      : T('modules.04.coverageDayTpl', { done: data.covered, total: data.buckets });
    put(panorama, bars(data.slots,
      T('modules.04.panoramaAriaTpl', { name: lead ? lead.namePL : '', span: spanPL }),
      coverage));
    textNode(panorama, 'p', 'ms3-field__hint', T('modules.04.panoramaHint'));

    /* ---- table ---- */
    var tab = put(rep.body, section(T('modules.04.tableTitle')));
    var list = catalogue();
    var rows = [];
    for (var i = 0; i < list.length; i += 1) {
      var m = list[i];
      var locked = isLocked(m);
      rows.push([
        { textPL: m.namePL + ' (' + m.unit + ')', head: true, lock: locked },
        { textPL: locked ? T('common.noValue') : fmt(m.id, data.avg[m.id]), num: true },
        { textPL: locked ? T('common.noValue') : fmt(m.id, data.min[m.id]), num: true },
        { textPL: locked ? T('common.noValue') : fmt(m.id, data.max[m.id]), num: true }
      ]);
    }
    put(tab, table(T('modules.04.tableCaption'),
      [T('modules.04.colMetric'), T('modules.04.colAvg'), T('modules.04.colMin'), T('modules.04.colMax')],
      rows));

    /* ---- zone distribution ---- */
    var zonesBox = put(rep.body, section(T('modules.04.zonesTitle')));
    textNode(zonesBox, 'p', 'ms3-field__hint',
      T('modules.04.zonesCaptionTpl', { name: lead ? lead.namePL : '' }));
    var total = data.zones.good + data.zones.warning + data.zones.critical;
    put(zonesBox, zoneRow('good', T('modules.04.zoneGood'), data.zones.good, total));
    put(zonesBox, zoneRow('warning', T('modules.04.zoneWarning'), data.zones.warning, total));
    put(zonesBox, zoneRow('critical', T('modules.04.zoneCritical'), data.zones.critical, total));
    textNode(zonesBox, 'p', 'ms3-context', T('modules.04.worstTpl', {
      value: data.worstHour === null
        ? T('modules.04.worstNone')
        : T('modules.04.worstHourTpl', { hour: pad2(data.worstHour) + ':00' })
    }));

    /* ---- advice ---- */
    var adviceBox = put(rep.body, section(T('modules.04.adviceTitle')));
    var lines = reportAdvice(data);
    for (var a = 0; a < lines.length; a += 1) textNode(adviceBox, 'p', '', lines[a]);

    put(rep.body, note('warning', T('modules.04.limitsTitle'), T('modules.04.limits')));
    textNode(rep.body, 'p', 'ms3-field__hint', T('modules.04.printHint'));
  }

  /* One row of the zone distribution: shape, word, bar with the zone texture
     and the percentage. Colour is never alone (rule 5 of chapter 1). */
  function zoneRow(zone, wordPL, count, total) {
    var el = make('div', 'ms3-stat__row');
    var shape = put(el, make('span', 'ms3-shape ms3-shape--' + zone + ' ms3-shape--sm'));
    shape.setAttribute('aria-hidden', 'true');
    var bar = put(el, make('span', 'ms3-stat__bar' + (zone === 'good' ? '' : ' ms3-stat__bar--' + zone)));
    var share = total ? Math.round((count / total) * 100) : 0;
    bar.style.width = share + '%';
    var value = textNode(el, 'span', 'ms3-num', share + '%');
    value.setAttribute('aria-hidden', 'true');
    srOnly(el, wordPL + ' ' + share + '%');
    return el;
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

  /* ==================================================================
     05 — Eksport
     ================================================================== */

  var exp = { rangeMs: DAY_MS, preview: null };

  function buildExport(root) {
    var head = section('');
    var seg = segments(T('modules.05.rangeAria'), [
      { value: String(HOUR_MS), labelPL: T('modules.05.range1h') },
      { value: String(DAY_MS), labelPL: T('modules.05.range24h') },
      { value: String(WEEK_MS), labelPL: T('modules.05.range7d') },
      { value: String(30 * DAY_MS), labelPL: T('modules.05.range30d') }
    ], String(exp.rangeMs), function (value) {
      exp.rangeMs = Number(value);
      renderExportPreview();
    });
    put(head, seg.el);

    var act = put(head, actions());
    put(act, keyBtn(T('modules.05.csvKey'), 'ms3-key--ghost', function () { runExport('csv'); }));
    put(act, keyBtn(T('modules.05.jsonKey'), 'ms3-key--ghost', function () { runExport('json'); }));
    put(root, head);

    var format = section(T('modules.05.formatTitle'));
    textNode(format, 'p', '', T('modules.05.formatCsv'));
    textNode(format, 'p', '', T('modules.05.formatJson'));
    textNode(format, 'p', 'ms3-field__hint', T('modules.05.resolution'));
    textNode(format, 'p', 'ms3-field__hint', T('modules.05.offline'));
    put(root, format);

    put(root, columnsSection());

    var prev = section(T('modules.05.previewTitle'));
    textNode(prev, 'p', 'ms3-field__hint', T('modules.05.previewHint'));
    exp.preview = put(prev, make('div', ''));
    put(root, prev);
    renderExportPreview();
    onShow(root, renderExportPreview);
  }

  function columnsSection() {
    var el = section(T('modules.05.columnsTitle'));
    var rows = [
      [{ textPL: T('modules.05.colDate'), head: true }, T('modules.05.descDate')],
      [{ textPL: T('modules.05.colTime'), head: true }, T('modules.05.descTime')]
    ];
    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      var m = list[i];
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
    put(el, table(T('modules.05.columnsCaption'),
      [T('modules.05.colName'), T('modules.05.colMeaning')], rows));
    return el;
  }

  function exportRows() {
    var until = Date.now();
    var since = until - exp.rangeMs;
    var points = history({ sinceMs: since, untilMs: until });
    var list = catalogue();
    var head = [T('modules.05.colDate'), T('modules.05.colTime')];
    var i, j;
    for (i = 0; i < list.length; i += 1) head.push(list[i].namePL + ' [' + list[i].unit + ']');
    head.push(T('modules.05.colZone'));

    var rows = [head];
    for (i = 0; i < points.length; i += 1) {
      var p = points[i];
      var line = [fmtDate(p.t), fmtClock(p.t)];
      for (j = 0; j < list.length; j += 1) {
        var m = list[j];
        var v = p[m.id];
        // A locked premium column stays empty. An invented number in a file
        // that looks like an export would be the one thing this app must not do.
        line.push(isLocked(m) || !isNum(v) ? '' : v.toFixed(m.decimals).replace('.', ','));
      }
      line.push(p.zone || '');
      rows.push(line);
    }
    return { rows: rows, points: points, since: since, until: until };
  }

  function renderExportPreview() {
    if (!exp.preview) return;
    clear(exp.preview);
    var data = exportRows();
    if (data.rows.length < 2) {
      put(exp.preview, emptyNote(T('empty.exportNoData')));
      return;
    }
    var body = [];
    var shown = Math.min(5, data.rows.length - 1);
    for (var i = 1; i <= shown; i += 1) {
      var cells = [];
      for (var j = 0; j < data.rows[i].length; j += 1) {
        cells.push({ textPL: data.rows[i][j] || T('common.noValue'), num: j > 1 });
      }
      body.push(cells);
    }
    put(exp.preview, table(T('modules.05.previewHint'), data.rows[0], body));
  }

  function stampName(ms, ext) {
    var d = new Date(ms);
    return 'monitor-swiatla-' + d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' +
      pad2(d.getDate()) + '-' + pad2(d.getHours()) + pad2(d.getMinutes()) + '.' + ext;
  }

  function runExport(kind) {
    var data = exportRows();
    if (data.rows.length < 2) { toast(T('empty.exportNoData')); return; }

    var filename, mime, text;
    if (kind === 'json') {
      filename = stampName(data.until, 'json');
      mime = 'application/json;charset=utf-8';
      text = JSON.stringify(exportJson(data), null, 2);
    } else {
      filename = stampName(data.until, 'csv');
      mime = 'text/csv;charset=utf-8';
      var lines = '';
      for (var i = 0; i < data.rows.length; i += 1) lines += data.rows[i].join(';') + '\r\n';
      // BOM first: without it Excel reads UTF-8 as Windows-1250 and every
      // Polish diacritic in the header turns to rubbish.
      text = '\uFEFF' + lines;
    }

    if (download(filename, mime, text)) {
      toast(T('modules.05.savedTpl', { name: filename, rows: data.rows.length - 1 }));
    } else {
      toast(T('modules.05.failed'));
    }
  }

  function exportJson(data) {
    var list = catalogue();
    var columns = [];
    var i, j;
    for (i = 0; i < list.length; i += 1) {
      columns.push({
        id: list[i].id, namePL: list[i].namePL, unit: list[i].unit,
        decimals: list[i].decimals, locked: isLocked(list[i])
      });
    }
    var points = [];
    for (i = 0; i < data.points.length; i += 1) {
      var p = data.points[i];
      var out = { t: p.t, zone: p.zone || null };
      for (j = 0; j < list.length; j += 1) {
        var m = list[j];
        out[m.id] = isLocked(m) || !isNum(p[m.id]) ? null : p[m.id];
      }
      points.push(out);
    }
    return {
      app: T('app.title'),
      version: 3,
      exportedAt: data.until,
      sinceMs: data.since,
      untilMs: data.until,
      stepMs: 5000,
      columns: columns,
      points: points
    };
  }

  /* Blob + a[download], nothing else. No network, no library, no build step. */
  function download(filename, mime, text) {
    try {
      var blob = new global.Blob([text], { type: mime });
      var url = global.URL.createObjectURL(blob);
      var a = doc.createElement('a');
      a.href = url;
      a.download = filename;
      a.setAttribute('aria-hidden', 'true');
      a.className = 'ms3-sr';
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

  /* ==================================================================
     06 — Porównanie
     ================================================================== */

  function sessions() {
    var list = readJson(KEY_SESSIONS, []);
    return Object.prototype.toString.call(list) === '[object Array]' ? list : [];
  }

  /* The engine keeps only the last session, so this file keeps the rest.
     engine:stopped is a state event, not the sampler — subscribing to it does
     not break the "only dash.js hears engine:sample" rule. */
  function rememberSession(session) {
    if (!session || !session.startedAt) return;
    var endedAt = session.endedAt || Date.now();
    var entry = {
      id: 's' + session.startedAt.toString(36),
      startedAt: session.startedAt,
      endedAt: endedAt,
      durationMs: session.durationMs || (endedAt - session.startedAt),
      samples: session.samples || 0,
      zones: session.zones || { good: 0, warning: 0, critical: 0 },
      avg: session.avg || {},
      min: session.min || {},
      max: session.max || {},
      calibrated: !!session.calibrated,
      series: history({ sinceMs: session.startedAt, untilMs: endedAt, maxPoints: SESSION_POINTS })
    };
    if (entry.durationMs < 5000) return;      // shorter than one history point

    var list = sessions();
    list.push(entry);
    while (list.length > MAX_SESSIONS) list.shift();
    if (!writeJson(KEY_SESSIONS, list)) {
      // Out of space: drop the oldest half and try once more rather than lose
      // the session that just finished.
      list = list.slice(Math.floor(list.length / 2));
      writeJson(KEY_SESSIONS, list);
    }
    if (cmp.body && visible(cmp.body)) renderCompare();
  }

  var cmp = { a: null, b: null, body: null, selects: null };

  function buildCompare(root) {
    var intro = section('');
    textNode(intro, 'p', '', T('modules.06.intro'));
    put(root, intro);

    cmp.selects = put(root, make('div', 'ms3-screen__section'));
    cmp.body = put(root, make('div', 'ms3-screen__section'));

    var limits = section('');
    put(limits, note('limits', T('modules.06.limitsTitle'), T('modules.06.limits')));
    textNode(limits, 'p', 'ms3-field__hint', T('modules.06.keepTpl', { count: MAX_SESSIONS }));
    var act = put(limits, actions());
    put(act, keyBtn(T('modules.06.clearKey'), 'ms3-key--ghost', function () {
      removeKey(KEY_SESSIONS);
      cmp.a = null;
      cmp.b = null;
      toast(T('modules.06.cleared'));
      renderCompareSelects();
      renderCompare();
    }));
    put(root, limits);

    renderCompareSelects();
    renderCompare();
    onShow(root, function () {
      renderCompareSelects();
      renderCompare();
    });
  }

  function sessionLabel(s) {
    return T('modules.06.sessionTpl', {
      date: fmtDate(s.startedAt), time: fmtHm(s.startedAt), dur: durationWords(s.durationMs)
    });
  }

  function renderCompareSelects() {
    if (!cmp.selects) return;
    clear(cmp.selects);
    var list = sessions();
    if (list.length < 2) return;

    var options = [];
    for (var i = list.length - 1; i >= 0; i -= 1) {
      options.push({ value: list[i].id, labelPL: sessionLabel(list[i]) });
    }
    if (!cmp.a || !findSession(cmp.a)) cmp.a = options[options.length - 1].value;
    if (!cmp.b || !findSession(cmp.b)) cmp.b = options[0].value;

    put(cmp.selects, field(T('modules.06.slotA'),
      selectControl('ms3CompareA', options, cmp.a, function (v) { cmp.a = v; renderCompare(); }),
      '', 'ms3CompareA'));
    put(cmp.selects, field(T('modules.06.slotB'),
      selectControl('ms3CompareB', options, cmp.b, function (v) { cmp.b = v; renderCompare(); }),
      '', 'ms3CompareB'));
  }

  function findSession(id) {
    var list = sessions();
    for (var i = 0; i < list.length; i += 1) if (list[i].id === id) return list[i];
    return null;
  }

  function renderCompare() {
    if (!cmp.body) return;
    clear(cmp.body);

    var list = sessions();
    if (!list.length) {
      put(cmp.body, emptyNote(T('modules.06.noSessions')));
      return;
    }
    if (list.length < 2) {
      put(cmp.body, emptyNote(T('empty.compareOneSession')));
      return;
    }

    var A = findSession(cmp.a), B = findSession(cmp.b);
    if (!A || !B) return;

    var lead = leadId();
    var leadMetric = metric(lead);

    var tape = put(cmp.body, section(T('modules.06.tapeTitle')));
    textNode(tape, 'p', 'ms3-field__hint',
      T('modules.06.tapeChannelTpl', { name: leadMetric ? leadMetric.namePL : '' }));
    put(tape, tapeRow(T('modules.06.slotA'), A, lead));
    put(tape, tapeRow(T('modules.06.slotB'), B, lead));
    textNode(tape, 'p', 'ms3-field__hint', T('modules.06.tapeHint'));

    var diff = put(cmp.body, section(T('modules.06.diffTitle')));
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
        { textPL: locked ? T('common.noValue') : diffText(m.id, a, b), num: true }
      ]);
    }
    put(diff, table(T('modules.06.diffCaption'),
      [T('modules.06.colMetric'), T('modules.06.colA'), T('modules.06.colB'), T('modules.06.colDiff')],
      rows));
  }

  function diffText(id, a, b) {
    if (!isNum(a) || !isNum(b)) return T('common.noValue');
    var d = b - a;
    // U+2212, the real minus sign: a hyphen next to tabular digits reads as a
    // dash in the middle of the number.
    var sign = d < 0 ? '−' : '+';
    return sign + fmt(id, Math.abs(d));
  }

  function tapeRow(slotPL, s, lead) {
    var el = make('div', 'ms3-tape');
    textNode(el, 'span', 'ms3-tape__label', slotPL + ' — ' + sessionLabel(s));

    var map = thresholds();
    var Scale = S();
    var series = s.series || [];
    var buckets = [];
    var i;
    for (i = 0; i < TAPE_BUCKETS; i += 1) buckets.push(null);

    var span = Math.max(1, s.durationMs);
    for (i = 0; i < series.length; i += 1) {
      var p = series[i];
      var slot = Math.floor(((p.t - s.startedAt) / span) * TAPE_BUCKETS);
      if (slot < 0) slot = 0;
      if (slot >= TAPE_BUCKETS) slot = TAPE_BUCKETS - 1;
      var zone = Scale ? Scale.zone(lead, p[lead], map) : null;
      buckets[slot] = worseZone(buckets[slot], zone);
    }

    var m = metric(lead);
    put(el, bars(buckets,
      T('modules.06.tapeAriaTpl', { slot: slotPL, name: m ? m.namePL : '' }), ''));
    return el;
  }

  /* ==================================================================
     07 — Test ekranu
     ================================================================== */

  /* Solid fills are literal colours on purpose: this is the one screen that
     leaves the theme (chapter 3), because a test plane tinted by a theme is
     not a test plane. */
  var PLANE_FILL = {
    white: '#FFFFFF', gray75: '#BFBFBF', gray50: '#808080', gray25: '#404040',
    black: '#000000', red: '#FF0000', green: '#00FF00', blue: '#0000FF', grid: '#000000'
  };

  var plate = { el: null, exit: null, opener: null, onKey: null };

  function buildScreenTest(root) {
    var intro = section('');
    textNode(intro, 'p', '', T('modules.07.intro'));
    put(root, intro);

    var steps = section(T('modules.07.stepsTitle'));
    var ol = put(steps, make('ol', 'ms3-ol'));
    var stepList = TL('modules.07.steps');
    for (var i = 0; i < stepList.length; i += 1) textNode(ol, 'li', 'ms3-ol__item', stepList[i]);
    put(root, steps);

    put(root, note('warning', T('modules.07.warnTitle'), T('modules.07.warn')));

    var planes = section(T('modules.07.planesTitle'));
    var list = TL('modules.07.planes');
    var host = put(planes, make('div', 'ms3-rows'));
    for (var j = 0; j < list.length; j += 1) {
      (function (plane) {
        var r = row(plane.namePL, plane.hintPL);
        put(r.end, keyBtn(T('modules.07.showKey'), 'ms3-key--ghost', function (ev) {
          openPlane(plane, ev.currentTarget);
        }, T('modules.07.showAriaTpl', { name: plane.namePL })));
        put(host, r.el);
      }(list[j]));
    }
    put(root, planes);

    put(root, note('limits', T('modules.07.cameraTitle'), T('modules.07.camera')));
  }

  // Exit key first, then whatever the control desk has to offer.
  function plateRing() {
    var out = [];
    if (plate.exit) out.push(plate.exit);
    var desk = doc.getElementById('ms3Desk');
    if (!desk) return out;
    var keys = desk.querySelectorAll('button:not([disabled])');
    for (var i = 0; i < keys.length; i += 1) {
      if (keys[i].hasAttribute('hidden')) continue;
      if (keys[i].getAttribute('tabindex') === '-1') continue;
      out.push(keys[i]);
    }
    return out;
  }

  function openPlane(plane, opener) {
    if (plate.el) closePlane();

    var el = make('div', 'ms3-plate' + (plane.id === 'grid' ? ' ms3-plate--grid' : ''));
    el.setAttribute('role', 'dialog');
    // Deliberately NOT aria-modal: the plane stops above the control desk and
    // START/STOP must stay both visible and announced (rule 7, chapter 1). What
    // the plane covers is the dashboard, and that is what it hides.
    el.setAttribute('aria-label', T('modules.07.planeAriaTpl', { name: plane.namePL }));
    if (PLANE_FILL[plane.id]) el.style.backgroundColor = PLANE_FILL[plane.id];

    var bar = put(el, make('div', 'ms3-plate__bar'));
    var exit = keyBtn(T('modules.07.exitKey'), 'ms3-plate__exit', function () { closePlane(); });
    put(bar, exit);

    doc.body.appendChild(el);
    var dash = doc.getElementById('ms3Dash');
    if (dash) dash.setAttribute('aria-hidden', 'true');
    plate.el = el;
    plate.exit = exit;
    plate.opener = opener || null;

    // The shell also listens for Escape and would close the module underneath.
    // This handler runs in the capture phase and stops the event there, so
    // Escape closes the plane and only the plane.
    plate.onKey = function (ev) {
      if (!plate.el) return;
      if (ev.key === 'Escape' || ev.keyCode === 27) {
        ev.preventDefault();
        ev.stopPropagation();
        closePlane();
        return;
      }
      // Tab cycles between the exit key and the control desk: the plane may not
      // be the only thing a keyboard can reach while the camera is running.
      if (ev.key === 'Tab' || ev.keyCode === 9) {
        ev.preventDefault();
        var ring = plateRing();
        if (!ring.length) return;
        var at = -1, i;
        for (i = 0; i < ring.length; i += 1) if (ring[i] === doc.activeElement) at = i;
        var next = ev.shiftKey ? at - 1 : at + 1;
        if (next < 0) next = ring.length - 1;
        if (next > ring.length - 1) next = 0;
        try { ring[next].focus(); } catch (_) {}
      }
    };
    doc.addEventListener('keydown', plate.onKey, true);
    global.addEventListener('popstate', closePlane);

    exit.focus();
  }

  function closePlane() {
    if (!plate.el) return;
    if (plate.onKey) doc.removeEventListener('keydown', plate.onKey, true);
    global.removeEventListener('popstate', closePlane);
    if (plate.el.parentNode) plate.el.parentNode.removeChild(plate.el);
    var dash = doc.getElementById('ms3Dash');
    if (dash) dash.removeAttribute('aria-hidden');
    var opener = plate.opener;
    plate.el = null;
    plate.exit = null;
    plate.opener = null;
    plate.onKey = null;
    if (opener && typeof opener.focus === 'function') opener.focus();
  }

  /* ==================================================================
     08 — Harmonogram
     ================================================================== */

  function defaultSchedule() {
    return { enabled: false, times: [] };
  }

  function getSchedule() {
    var s = readJson(KEY_SCHEDULE, null);
    if (!s || typeof s !== 'object' || Object.prototype.toString.call(s.times) !== '[object Array]') {
      return defaultSchedule();
    }
    var clean = { enabled: !!s.enabled, times: [] };
    for (var i = 0; i < s.times.length; i += 1) {
      var t = s.times[i];
      if (!t || !isNum(t.min)) continue;
      clean.times.push({
        id: t.id || ('t' + i),
        min: Math.max(0, Math.min(1439, Math.round(t.min)))
      });
    }
    clean.times.sort(function (a, b) { return a.min - b.min; });
    return clean;
  }

  function setSchedule(s) {
    writeJson(KEY_SCHEDULE, s);
  }

  var sched = { list: null, next: null };

  function buildSchedule(root) {
    var intro = section('');
    textNode(intro, 'p', '', T('modules.08.intro'));
    put(intro, note('warning', T('modules.08.onlyOpenTitle'), T('modules.08.onlyOpen')));
    put(root, intro);

    var s = getSchedule();
    var toggle = checkOption('ms3ScheduleOn', T('modules.08.enableLabel'), s.enabled, function (checked) {
      var cur = getSchedule();
      cur.enabled = checked;
      setSchedule(cur);
      renderScheduleNext();
    });
    var box = section('');
    put(box, toggle.el);
    sched.next = textNode(box, 'p', 'ms3-context', '');
    put(root, box);

    var times = section(T('modules.08.timesTitle'));
    sched.list = put(times, make('div', 'ms3-rows'));
    var act = put(times, actions());
    put(act, keyBtn(T('modules.08.addKey'), 'ms3-key--ghost', function () {
      var cur = getSchedule();
      cur.times.push({ id: 't' + Date.now().toString(36), min: 20 * 60 });
      setSchedule(cur);
      renderScheduleTimes();
      renderScheduleNext();
      toast(T('modules.08.addedTpl', { time: minutesToHm(20 * 60) }));
    }));
    put(root, times);

    renderScheduleTimes();
    renderScheduleNext();
    onShow(root, function () {
      renderScheduleTimes();
      renderScheduleNext();
    });
  }

  function renderScheduleTimes() {
    if (!sched.list) return;
    clear(sched.list);
    var s = getSchedule();
    if (!s.times.length) {
      put(sched.list, emptyNote(T('empty.scheduleEmpty')));
      return;
    }
    for (var i = 0; i < s.times.length; i += 1) {
      (function (t, index) {
        var hm = minutesToHm(t.min);
        var r = row('', '');
        var id = 'ms3ScheduleTime-' + t.id;
        var input = make('input', 'ms3-field__input');
        input.type = 'time';
        input.id = id;
        input.value = hm;
        input.setAttribute('aria-label', T('modules.08.timeAriaTpl', { n: index + 1 }));
        input.addEventListener('change', function () {
          var minutes = hmToMinutes(input.value);
          if (minutes === null) { toast(T('modules.08.badTime')); input.value = minutesToHm(t.min); return; }
          var cur = getSchedule();
          for (var j = 0; j < cur.times.length; j += 1) {
            if (cur.times[j].id === t.id) cur.times[j].min = minutes;
          }
          setSchedule(cur);
          renderScheduleNext();
        });
        clear(r.text);
        r.text.appendChild(input);

        put(r.end, keyBtn(T('modules.08.removeKey'), 'ms3-key--ghost', function () {
          var cur = getSchedule();
          var kept = [];
          for (var k = 0; k < cur.times.length; k += 1) {
            if (cur.times[k].id !== t.id) kept.push(cur.times[k]);
          }
          cur.times = kept;
          setSchedule(cur);
          renderScheduleTimes();
          renderScheduleNext();
          toast(T('modules.08.removedTpl', { time: hm }));
        }, T('modules.08.removeAriaTpl', { time: hm })));

        put(sched.list, r.el);
      }(s.times[i], i));
    }
  }

  function renderScheduleNext() {
    if (!sched.next) return;
    var s = getSchedule();
    if (!s.enabled || !s.times.length) {
      setText(sched.next, T('modules.08.nextNone'));
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
    setText(sched.next, best ? T('modules.08.nextTpl', { time: minutesToHm(best.min) }) : '');
  }

  /* The reminder. It never touches the camera — rule 4 of the contract and
     9.3: only dash.js calls Engine.start, and only after a key press. */
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
      remind(minutesToHm(t.min));
    }
    if (sched.next && visible(sched.next)) renderScheduleNext();
  }

  function remind(hm) {
    var messagePL = T('modules.08.dueTpl', { time: hm });
    var ui = global.UI3;
    toast(messagePL, {
      actionPL: T('modules.08.dueKey'),
      durationMs: 20000,
      onAction: function () {
        // Back to the dashboard, where the START key lives. The human presses it.
        if (ui && typeof ui.closeScreen === 'function') ui.closeScreen();
      }
    });
    say(messagePL);
  }

  /* ==================================================================
     09 — Alerty
     ================================================================== */

  function defaultAlerts() {
    return { enabled: false, metricId: 'melanopic', level: 'critical', sustainS: 60, sound: true };
  }

  var alertCfg = null;

  /* The watcher runs once a second for as long as the app is open, so the
     configuration is read from storage once and kept, not parsed 3600 times
     an hour. setAlerts is the only writer. */
  function alertConfig() {
    if (!alertCfg) alertCfg = getAlerts();
    return alertCfg;
  }

  function getAlerts() {
    var a = readJson(KEY_ALERTS, null);
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

  function setAlerts(patch) {
    var cur = getAlerts();
    for (var k in patch) {
      if (Object.prototype.hasOwnProperty.call(patch, k)) cur[k] = patch[k];
    }
    var clean = getAlertsFrom(cur);
    writeJson(KEY_ALERTS, clean);
    alertCfg = clean;
    alertSince = 0;
    renderAlertStatus();
    toast(T('modules.09.saved'));
    return clean;
  }

  function getAlertsFrom(a) {
    var d = defaultAlerts();
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

  var alr = { status: null };

  function buildAlerts(root) {
    var cfg = getAlerts();

    var intro = section('');
    textNode(intro, 'p', '', T('modules.09.intro'));
    put(root, intro);

    var box = section('');
    var toggle = checkOption('ms3AlertsOn', T('modules.09.enableLabel'), cfg.enabled, function (checked) {
      setAlerts({ enabled: checked });
    });
    put(box, toggle.el);
    alr.status = textNode(box, 'p', 'ms3-context', '');

    var options = [];
    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      options.push({ value: list[i].id, labelPL: list[i].namePL });
    }
    put(box, field(T('modules.09.metricLabel'),
      selectControl('ms3AlertMetric', options, cfg.metricId, function (v) { setAlerts({ metricId: v }); }),
      '', 'ms3AlertMetric'));

    put(box, field(T('modules.09.levelLabel'), selectControl('ms3AlertLevel', [
      { value: 'warning', labelPL: T('modules.09.levelWarning') },
      { value: 'critical', labelPL: T('modules.09.levelCritical') }
    ], cfg.level, function (v) { setAlerts({ level: v }); }), '', 'ms3AlertLevel'));

    var sustain = make('input', 'ms3-field__input');
    sustain.type = 'number';
    sustain.id = 'ms3AlertSustain';
    sustain.min = String(ALERT_MIN_SUSTAIN);
    sustain.max = String(ALERT_MAX_SUSTAIN);
    sustain.step = '5';
    sustain.value = String(cfg.sustainS);
    sustain.addEventListener('change', function () {
      var v = Number(sustain.value);
      var clean = setAlerts({ sustainS: isNum(v) ? v : ALERT_MIN_SUSTAIN });
      sustain.value = String(clean.sustainS);
    });
    put(box, field(T('modules.09.sustainLabel'), sustain, T('modules.09.sustainHint'), 'ms3AlertSustain'));

    var sound = checkOption('ms3AlertSound', T('modules.09.soundLabel'), cfg.sound, function (checked) {
      setAlerts({ sound: checked });
    });
    textNode(sound.el, 'p', 'ms3-field__hint', T('modules.09.soundHint'));
    put(box, sound.el);

    textNode(box, 'p', 'ms3-field__hint', T('modules.09.cooldownHint'));
    put(root, box);

    put(root, note('warning', T('modules.09.whenNotTitle'), T('modules.09.whenNot')));

    renderAlertStatus();
    onShow(root, renderAlertStatus);
  }

  function renderAlertStatus() {
    if (!alr.status) return;
    var cfg = getAlerts();
    if (!cfg.enabled) { setText(alr.status, T('empty.alertsOff')); return; }
    var m = metric(cfg.metricId);
    setText(alr.status, T('modules.09.statusOnTpl', {
      name: m ? m.namePL : '',
      level: cfg.level === 'warning' ? T('modules.09.levelWarning') : T('modules.09.levelCritical'),
      sec: cfg.sustainS
    }));
  }

  var alertSince = 0;
  var alertFiredAt = 0;

  function zoneRank(zone) {
    return zone === 'critical' ? 2 : (zone === 'warning' ? 1 : 0);
  }

  /* Polls Engine.latest() once a second. It has to work while the dashboard is
     on screen, and UI3.onLive only fires for an open module — so this reads the
     public latest reading instead of taking a second subscription to the
     sampler, which belongs to dash.js alone. */
  function alertTick() {
    var cfg = alertConfig();
    if (!cfg.enabled) { alertSince = 0; return; }

    // The module says out loud that a hidden tab gets no alert. This is the
    // line that makes that sentence true, and it drops the running count so a
    // return to the app does not fire on a window nobody was watching.
    if (doc && doc.hidden) { alertSince = 0; return; }

    var engine = E();
    if (!engine || typeof engine.isRunning !== 'function' || !engine.isRunning()) {
      alertSince = 0;
      return;
    }
    var reading = typeof engine.latest === 'function' ? engine.latest() : null;
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
    var Scale = S();
    var messagePL = T('modules.09.firedTpl', {
      name: m ? m.namePL : cfg.metricId,
      zone: Scale ? Scale.stamp(reading.zones[cfg.metricId]).wordPL : '',
      sec: Math.round((reading.t - alertSince) / 1000),
      value: fmtUnit(cfg.metricId, reading.values ? reading.values[cfg.metricId] : null)
    });

    // In-app only: a toast and the live region. No system notification is ever
    // requested, so nothing here can arrive when the app is closed.
    toast(messagePL, { durationMs: 8000 });
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
     Registration and background workers
     ================================================================== */

  function register(no, build) {
    var ui = global.UI3;
    if (!ui || typeof ui.registerModule !== 'function') return;
    ui.registerModule({
      no: no,
      titlePL: T('modules.' + no + '.titlePL'),
      descPL: T('modules.' + no + '.descPL'),
      build: build
    });
  }

  register('02', buildThresholds);
  register('03', buildCalibration);
  register('04', buildReports);
  register('05', buildExport);
  register('06', buildCompare);
  register('07', buildScreenTest);
  register('08', buildSchedule);
  register('09', buildAlerts);

  var alertTimer = null;
  var scheduleTimer = null;

  function startWorkers() {
    if (!alertTimer) alertTimer = global.setInterval(alertTick, WATCH_TICK_MS);
    if (!scheduleTimer) scheduleTimer = global.setInterval(scheduleTick, SCHEDULE_TICK_MS);
  }

  function ready() {
    startWorkers();
    if (global.Bus) {
      global.Bus.on('engine:stopped', function (data) {
        rememberSession(data && data.session);
      });
    }
  }

  if (global.UI3 && typeof global.UI3.ready === 'function') global.UI3.ready(ready);
  else if (doc && doc.addEventListener) doc.addEventListener('DOMContentLoaded', ready);

}(typeof window !== 'undefined' ? window : globalThis));
