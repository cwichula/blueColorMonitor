/* Monitor Światła v3 — dash.js — the dashboard (level 1).
 *
 * Owns: status rail, readout well, main scale, channel strip, camera monitor,
 * control desk and the errata block.
 *
 * Two exclusivity rules from DESIGN.md 9.3 live here and nowhere else:
 *   1. this is the ONLY file subscribed to `engine:sample`; every other screen
 *      gets its data through UI3.onLive(), which throttles to 1 Hz;
 *   2. this is the ONLY file calling Engine.start / stop / switchCamera, and it
 *      does so exclusively in response to a key press by a human.
 *
 * Nothing here decides what a percentage looks like on a ruler (Scale does) and
 * nothing here contains a Polish sentence (Scale.TEXT does). The camera state is
 * never mirrored in a local variable — `engine:state` is the only source.
 *
 * Drawing budget (DESIGN.md 6.7): inside the 5 Hz handler only `textContent`,
 * `style.setProperty('--ms3-pos', …)` and state classes are touched. Bands,
 * ticks and labels are repainted only when the lead channel, the thresholds or
 * the theme change. Everything that needs geometry in percent (the min–max
 * trace) runs on the 1 Hz timer instead.
 */
(function (global) {
  'use strict';

  var doc = global.document;

  /* ------------------------------------------------------------------
     Constants — all of them come from the specification, none is a guess
     ------------------------------------------------------------------ */

  var WARMUP_MS = 3000;        // 7.1 — the verdict waits, the numbers do not
  var HYST_SAMPLES = 20;       // 7.2 — 20 samples at 5 Hz = 4 s in the new zone
  var CULPRIT_MIN_MS = 2000;   // 7.2 — the culprit inside one zone may move once per 2 s
  var CONTEXT_MS = 60000;      // 4.3 — the context row and the trace read the live buffer
  var LONGPRESS_MS = 600;      // 3.  — long press on a channel row opens its help sheet

  /* ------------------------------------------------------------------
     Module state
     ------------------------------------------------------------------ */

  var el = {};                 // resolved DOM nodes, filled once in grabDom()
  var rows = [];               // channel rows in catalogue order (lead excluded)
  var leadId = 'share';
  var previousLeadId = 'share';   // the row that replaces the strip's focus after a switch
  var thresholds = null;
  var engineState = 'idle';    // mirror of engine:state, written only by its handler
  var lastReading = null;
  var frozen = false;          // true after a stop: values stay, dimmed
  var sessionStartedAt = null;
  var warmupDone = true;
  var secondTimer = null;

  // Verdict machine (7.2). `shown*` is what the user reads, `cand*` is what the
  // data currently says. The gap between them is the hysteresis.
  var shownZone = null;
  var shownCulprit = null;
  var shownText = '';
  var candZone = null;
  var candCount = 0;
  var culpritAt = 0;
  var verdictPrimed = false;
  // Czas ostatniej zakończonej sesji — trzymany po to, żeby po zmianie języka
  // dało się napisać zdanie „Pomiar zakończony…" jeszcze raz, w nowym języku.
  var lastStoppedMs = null;

  // Last value written to each node. Comparing before writing keeps the hot
  // path free of redundant DOM work and, more importantly, keeps class churn
  // out of the compositor.
  var cache = {
    approx: null,
    stampZone: null, stampWord: null, stampThreshold: null,
    verdict: null, railState: null, railText: null, keyMode: null,
    baseDashed: null, needleShown: null, rangeNote: null,
    scaleKey: null
  };

  /* ------------------------------------------------------------------
     Text — every Polish string in the dashboard is looked up in Scale.TEXT.
     A missing key is reported once, in English, in the console; it never
     becomes an invented sentence.
     ------------------------------------------------------------------ */

  var warned = {};

  function resolve(path) {
    var table = global.Scale && global.Scale.TEXT;
    if (!table) return null;
    var parts = path.split('.');
    var node = table;
    for (var i = 0; i < parts.length; i += 1) {
      if (node === null || typeof node !== 'object') return null;
      node = node[parts[i]];
    }
    if (typeof node === 'string' || typeof node === 'function') return node;
    return null;
  }

  function fill(tpl, vars) {
    if (!vars) return tpl;
    return tpl.replace(/\{(\w+)\}/g, function (whole, key) {
      return Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : whole;
    });
  }

  // paths: candidate keys, most likely first. vars: substitution map for {token}.
  function T(paths, vars) {
    var found = null;
    for (var i = 0; i < paths.length && found === null; i += 1) found = resolve(paths[i]);
    if (found === null) {
      if (!warned[paths[0]]) {
        warned[paths[0]] = true;
        if (global.console && global.console.warn) {
          global.console.warn('dash.js: Scale.TEXT has no "' + paths[0] + '"');
        }
      }
      return '';
    }
    if (typeof found === 'function') {
      try { found = found(vars || {}); } catch (err) { return ''; }
      return typeof found === 'string' ? found : '';
    }
    return fill(found, vars);
  }

  /* Nazwa i opisy wielkości z warstwy językowej. Metrics.CATALOGUE jest
     wspólny dla v2-v4 i wciąż nosi polskie namePL — zostaje ono ostatnią
     deską ratunku, gdy klucza 'metric.<id>.name' zabrakło w obu słownikach. */
  function mName(m) {
    var S = global.Scale;
    return (m && S && S.metricName) ? S.metricName(m.id) : (m ? m.namePL : '');
  }

  function mShort(m) {
    var S = global.Scale;
    return (m && S && S.metricShort) ? S.metricShort(m.id) : (m ? m.shortPL : '');
  }

  function mHelp(m) {
    var S = global.Scale;
    return (m && S && S.metricHelp) ? S.metricHelp(m.id) : (m ? m.helpPL : '');
  }

  /* ------------------------------------------------------------------
     Tiny DOM helpers
     ------------------------------------------------------------------ */

  function byId(id) { return doc.getElementById(id); }

  function setText(node, value) {
    if (node && node.textContent !== value) node.textContent = value;
  }

  function setAttr(node, name, value) {
    if (!node) return;
    if (value === null) { if (node.hasAttribute(name)) node.removeAttribute(name); return; }
    if (node.getAttribute(name) !== value) node.setAttribute(name, value);
  }

  // Swap one modifier out of a known family without touching foreign classes.
  function swapMod(node, base, mods, active) {
    if (!node || !node.classList) return;
    for (var i = 0; i < mods.length; i += 1) {
      if (mods[i] === active) node.classList.add(base + '--' + mods[i]);
      else node.classList.remove(base + '--' + mods[i]);
    }
  }

  function toggleClass(node, name, on) {
    if (!node || !node.classList) return;
    if (on) node.classList.add(name);
    else node.classList.remove(name);
  }

  function make(tag, cls) {
    var node = doc.createElement(tag);
    if (cls) node.className = cls;
    return node;
  }

  function pct(value) { return value.toFixed(2); }

  var ZONE_MODS = ['good', 'warning', 'critical', 'none'];

  function zoneMod(zone) {
    if (zone === 'good' || zone === 'warning' || zone === 'critical') return zone;
    return 'none';
  }

  // Word and shape for a zone always come from Scale.stamp: a status without a
  // word would be colour only, which this application never does (1.5).
  function shapeOf(zone) {
    var stamp = (global.Scale && global.Scale.stamp) ? global.Scale.stamp(zone) : null;
    return {
      word: (stamp && stamp.wordPL) ? stamp.wordPL : '',
      mod: (stamp && stamp.shapeMod) ? stamp.shapeMod : zoneMod(zone)
    };
  }

  function zoneWord(zone) { return shapeOf(zone).word; }

  function reducedMotion() {
    var attr = doc.documentElement.getAttribute('data-motion');
    if (attr === 'reduced') return true;
    try {
      return !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (err) { return false; }
  }

  function say(textPL) {
    if (textPL && global.UI3 && typeof global.UI3.say === 'function') global.UI3.say(textPL);
  }

  /* ------------------------------------------------------------------
     DOM
     ------------------------------------------------------------------ */

  function grabDom() {
    el.rail = byId('ms3Rail');
    el.stateDot = byId('ms3StateDot');
    el.stateText = byId('ms3StateText');
    el.hz = byId('ms3Hz');
    el.warmup = byId('ms3Warmup');

    el.errata = byId('ms3Errata');
    el.errataText = byId('ms3ErrataText');
    el.errataRetry = byId('ms3ErrataRetry');

    el.readout = byId('ms3Readout');
    el.readoutName = byId('ms3ReadoutName');
    el.help = byId('ms3Help');
    el.value = byId('ms3ReadoutValue');
    el.approx = byId('ms3Approx');
    el.num = byId('ms3Num');
    el.unit = byId('ms3Unit');
    el.stamp = byId('ms3Stamp');
    el.stampShape = byId('ms3StampShape');
    el.stampWord = byId('ms3StampWord');
    el.stampThreshold = byId('ms3StampThreshold');
    el.verdict = byId('ms3Verdict');

    el.scale = byId('ms3Scale');
    el.bands = byId('ms3Bands');
    el.base = byId('ms3Base');
    el.ticks = byId('ms3Ticks');
    el.trace = byId('ms3Trace');
    el.needleTrack = byId('ms3NeedleTrack');
    el.needle = byId('ms3Needle');
    el.labels = byId('ms3Labels');
    el.context = byId('ms3Context');

    el.scroll = byId('ms3Scroll');
    el.channels = byId('ms3Channels');
    el.notes = byId('ms3Notes');
    el.approxNote = byId('ms3ApproxNote');
    el.rangeNote = byId('ms3RangeNote');

    el.cameraPanel = byId('ms3CameraPanel');
    el.frame = byId('ms3MonitorFrame');
    el.reticle = byId('ms3Reticle');
    el.monitorOpen = byId('ms3MonitorOpen');
    el.monitorBadge = byId('ms3MonitorBadge');
    el.video = byId('cameraVideo');

    el.keyMain = byId('ms3KeyMain');
    el.keyFlip = byId('ms3KeyFlip');
    el.keyMenu = byId('ms3KeyMenu');
    el.deskSlot = byId('ms3DeskMonitorSlot');

    if (el.keyMain) {
      el.keyIcon = el.keyMain.querySelector('.ms3-key__icon');
      el.keyLabel = el.keyMain.querySelector('.ms3-key__label');
    }
  }

  /* ------------------------------------------------------------------
     Main scale — static layers. Repainted only on a channel, threshold or
     theme change (6.7 rule 5), never in the sampling loop.
     ------------------------------------------------------------------ */

  function paintScale(force) {
    var Scale = global.Scale;
    var m = global.Metrics.byId(leadId);
    if (!m || !Scale || !thresholds) return;

    // One string identifies the whole static drawing; if it has not changed
    // there is nothing to repaint.
    var t = thresholds[leadId] || {};
    var key = leadId + '|' + t.warn + '|' + t.crit;
    if (!force && key === cache.scaleKey) return;
    cache.scaleKey = key;

    var bands = Scale.bands(leadId, thresholds) || [];
    var i, span, band;

    if (el.bands) {
      el.bands.textContent = '';
      for (i = 0; i < bands.length; i += 1) {
        band = bands[i];
        span = make('span', 'ms3-band ms3-band--' + zoneMod(band.zone));
        span.style.left = pct(band.from) + '%';
        span.style.width = pct(Math.max(0, band.to - band.from)) + '%';
        el.bands.appendChild(span);
      }
    }

    var ticks = Scale.ticks(leadId) || { major: [], minor: [] };

    if (el.ticks) {
      el.ticks.textContent = '';
      for (i = 0; i < ticks.minor.length; i += 1) {
        span = make('span', 'ms3-tick ms3-tick--minor');
        span.style.left = pct(ticks.minor[i]) + '%';
        el.ticks.appendChild(span);
      }
      for (i = 0; i < ticks.major.length; i += 1) {
        span = make('span', 'ms3-tick ms3-tick--major');
        span.style.left = pct(ticks.major[i].pos) + '%';
        el.ticks.appendChild(span);
      }
    }

    if (el.labels) {
      el.labels.textContent = '';
      for (i = 0; i < ticks.major.length; i += 1) {
        span = make('span', 'ms3-scale__label');
        // The outermost labels are pulled inwards so they cannot leave the well.
        if (i === 0) span.className += ' ms3-scale__label--first';
        if (i === ticks.major.length - 1) span.className += ' ms3-scale__label--last';
        span.style.left = pct(ticks.major[i].pos) + '%';
        span.textContent = ticks.major[i].labelPL;
        el.labels.appendChild(span);
      }
    }
  }

  // A micro scale is the same instrument at 88×18 px: bands, baseline, needle.
  // No ticks, no labels and no hatching (5.4) — the row's shape marker carries
  // the status instead.
  function buildMicro(metricId) {
    var wrap = make('span', 'ms3-micro');
    wrap.setAttribute('aria-hidden', 'true');

    var bandBox = make('span', 'ms3-micro__bands');
    var bands = global.Scale.bands(metricId, thresholds) || [];
    for (var i = 0; i < bands.length; i += 1) {
      var b = make('span', 'ms3-band ms3-band--' + zoneMod(bands[i].zone));
      b.style.left = pct(bands[i].from) + '%';
      b.style.width = pct(Math.max(0, bands[i].to - bands[i].from)) + '%';
      bandBox.appendChild(b);
    }
    wrap.appendChild(bandBox);
    wrap.appendChild(make('span', 'ms3-micro__base'));

    var track = make('span', 'ms3-micro__track');
    var needle = make('span', 'ms3-micro__needle');
    needle.hidden = true;
    track.appendChild(needle);
    wrap.appendChild(track);

    return { root: wrap, needle: needle };
  }

  /* ------------------------------------------------------------------
     Channel strip (4.4, 5.2)
     ------------------------------------------------------------------ */

  function buildChannels() {
    if (!el.channels) return;
    el.channels.textContent = '';
    rows = [];

    var catalogue = global.Metrics.CATALOGUE;
    for (var i = 0; i < catalogue.length; i += 1) {
      var m = catalogue[i];
      if (m.id === leadId) continue;          // the lead channel lives in the well
      rows.push(buildRow(m));
    }

    // Roving tabindex: the strip is one Tab stop, arrows move inside it (5.2).
    for (var j = 0; j < rows.length; j += 1) {
      rows[j].button.setAttribute('tabindex', j === 0 ? '0' : '-1');
    }

    renderRows(lastReading);
    labelRows();
    toggleClass(el.channels, 'ms3-channels--frozen', frozen);
  }

  function buildRow(m) {
    var button = make('button', 'ms3-channel');
    button.type = 'button';
    button.setAttribute('data-metric', m.id);

    var shape = make('span', 'ms3-shape ms3-shape--none');
    shape.setAttribute('aria-hidden', 'true');
    button.appendChild(shape);

    var name = make('span', 'ms3-channel__name');
    name.appendChild(doc.createTextNode(mName(m)));
    button.appendChild(name);

    var micro = buildMicro(m.id);
    button.appendChild(micro.root);

    var value = make('span', 'ms3-channel__value');
    value.textContent = global.Scale.formatValue(m.id, null);
    value.setAttribute('data-empty', 'true');
    button.appendChild(value);

    var unit = make('span', 'ms3-channel__unit');
    unit.textContent = m.unit;
    button.appendChild(unit);

    el.channels.appendChild(button);

    var row = {
      metric: m, button: button, shape: shape,
      value: value, unit: unit, needle: micro.needle,
      zone: null, stale: false, needleShown: false, label: null,
      pressTimer: null, suppressClick: false
    };

    button.addEventListener('click', function () {
      if (row.suppressClick) { row.suppressClick = false; return; }
      setLead(m.id, true);
    });

    // Long press opens the metric's help sheet (chapter 3). The click that
    // follows the press is swallowed so the channel does not switch as well.
    button.addEventListener('pointerdown', function () {
      row.pressTimer = global.setTimeout(function () {
        row.pressTimer = null;
        row.suppressClick = true;
        openHelp(m.id);
      }, LONGPRESS_MS);
    });
    var cancelPress = function () {
      if (row.pressTimer) { global.clearTimeout(row.pressTimer); row.pressTimer = null; }
    };
    // A long press on a touch screen also raises the browser's own menu; that
    // menu would steal the gesture the help sheet is bound to.
    button.addEventListener('contextmenu', function (ev) { ev.preventDefault(); });
    button.addEventListener('pointerup', cancelPress);
    button.addEventListener('pointercancel', cancelPress);
    button.addEventListener('pointerleave', cancelPress);

    return row;
  }

  function rowIndex(node) {
    for (var i = 0; i < rows.length; i += 1) if (rows[i].button === node) return i;
    return -1;
  }

  function moveFocus(to) {
    if (!rows.length) return;
    var next = to < 0 ? 0 : (to > rows.length - 1 ? rows.length - 1 : to);
    for (var i = 0; i < rows.length; i += 1) {
      rows[i].button.setAttribute('tabindex', i === next ? '0' : '-1');
    }
    rows[next].button.focus();
  }

  // Puts the keyboard back on a named row after the strip has been rebuilt.
  function focusRow(metricId) {
    for (var i = 0; i < rows.length; i += 1) {
      if (rows[i].metric.id === metricId) { moveFocus(i); return; }
    }
    moveFocus(0);
  }

  function onStripKey(ev) {
    var i = rowIndex(ev.target);
    if (i === -1) return;
    var key = ev.key;
    // Arrows move the focus only. Changing the lead channel by arrow would be
    // choosing by accident (5.2).
    if (key === 'ArrowDown' || key === 'Down') { moveFocus(i + 1); ev.preventDefault(); }
    else if (key === 'ArrowUp' || key === 'Up') { moveFocus(i - 1); ev.preventDefault(); }
    else if (key === 'Home') { moveFocus(0); ev.preventDefault(); }
    else if (key === 'End') { moveFocus(rows.length - 1); ev.preventDefault(); }
    // The same "?" as in the well, so the long press is a shortcut and never the
    // only way in: a gesture without a keyboard equivalent excludes a switch user.
    else if (key === '?' || key === 'F1') { openHelp(rows[i].metric.id); ev.preventDefault(); }
    // Enter and Space stay with the button: they are its native activation.
  }

  function renderRows(reading) {
    for (var i = 0; i < rows.length; i += 1) {
      var row = rows[i];
      var id = row.metric.id;
      var v = reading ? reading.values[id] : null;
      var zone = reading ? reading.zones[id] : null;

      var shownRow = global.Scale.formatValue(id, v);
      setText(row.value, shownRow);
      setAttr(row.value, 'data-empty', shownRow === global.Scale.TEXT.common.noValue ? 'true' : null);

      var pos = global.Scale.pos(id, v);
      if (pos === null) {
        if (row.needleShown !== false) { row.needle.hidden = true; row.needleShown = false; }
      } else {
        row.needle.style.setProperty('--ms3-pos', pct(pos));
        if (row.needleShown !== true) { row.needle.hidden = false; row.needleShown = true; }
      }

      var mod = zoneMod(zone);
      if (row.zone !== mod) {
        row.zone = mod;
        swapMod(row.shape, 'ms3-shape', ZONE_MODS, mod);
      }
      // A metric reading null while the camera runs is stale, not zero (5.2).
      // Tracked apart from the zone, because leaving the running state clears
      // it without the zone changing at all.
      var stale = (mod === 'none' && engineState === 'running');
      if (row.stale !== stale) {
        row.stale = stale;
        toggleClass(row.button, 'ms3-channel--stale', stale);
      }
    }
  }

  // Leaving the running state clears every "stale" mark: outside a measurement
  // a missing number is simply a number that is not being measured.
  function refreshStale() {
    for (var i = 0; i < rows.length; i += 1) {
      var row = rows[i];
      var stale = (row.zone === 'none' && engineState === 'running');
      if (row.stale !== stale) {
        row.stale = stale;
        toggleClass(row.button, 'ms3-channel--stale', stale);
      }
    }
  }

  // Accessible names describe what the row will DO (7.6). Refreshed once a
  // second, never five times: a screen reader must not be flooded.
  function labelRows() {
    for (var i = 0; i < rows.length; i += 1) {
      var row = rows[i];
      var m = row.metric;
      var v = lastReading ? lastReading.values[m.id] : null;
      var vars = {
        name: mName(m),
        value: spoken(m.id, v),
        zone: zoneWord(lastReading ? lastReading.zones[m.id] : null).toLowerCase()
      };
      var label = (v === null || v === undefined)
        ? T(['aria.channelStale'], vars)
        : T(['aria.channel'], vars);
      if (label && row.label !== label) {
        row.label = label;
        row.button.setAttribute('aria-label', label);
      }
    }
  }

  // A screen reader hears '27 procent', never '27 %' and never the '———' the
  // eye gets when there is no value (7.6).
  function spoken(metricId, value) {
    return global.Scale.spoken(metricId, value);
  }

  /* ------------------------------------------------------------------
     Lead channel (7.3)
     ------------------------------------------------------------------ */

  function setLead(id, announce) {
    var m = global.Metrics.byId(id);
    if (!m || id === leadId) return;
    leadId = id;
    if (global.UI3 && typeof global.UI3.setLeadChannel === 'function') global.UI3.setLeadChannel(id);
    applyLead();
    if (announce) {
      var v = lastReading ? lastReading.values[id] : null;
      var z = lastReading ? lastReading.zones[id] : null;
      // Scale owns the sentence, the unit word and the zone word (7.3.2).
      say(global.Scale.announceLead(id, v, z));
    }
  }

  // Everything about the well that depends on WHICH channel is shown. Called on
  // a channel switch, on new thresholds and once at start-up. The screen does
  // not change and nothing navigates (7.3.2).
  function applyLead() {
    var m = global.Metrics.byId(leadId);
    if (!m) return;

    setText(el.readoutName, mName(m));
    // Never clear the attribute: with no text the literal from index.html has
    // to survive, because a key called "?" has no accessible name of its own.
    var helpLabel = T(['aria.help', 'readout.helpAriaTpl'], { name: mName(m) });
    if (helpLabel) setAttr(el.help, 'aria-label', helpLabel);

    // The ≈ sign is decoration for the eye; the word reaches a screen reader
    // through the block's accessible name instead (5.1).
    var approximate = (leadId === 'kelvin' || leadId === 'melanopic');
    if (cache.approx !== approximate) {
      cache.approx = approximate;
      if (el.approx) el.approx.hidden = !approximate;
      if (el.approxNote) el.approxNote.hidden = !approximate;
    }

    setText(el.unit, m.unit);

    paintScale(true);

    // buildChannels() empties the strip, so the button the keyboard is standing
    // on disappears and focus falls to <body>. The row that takes its place is
    // the one for the channel that just left the well.
    var hadFocus = null;
    if (el.channels && doc.activeElement && el.channels.contains(doc.activeElement)) {
      hadFocus = doc.activeElement.getAttribute('data-metric');
    }
    buildChannels();
    if (hadFocus !== null) focusRow(hadFocus === leadId ? previousLeadId : hadFocus);
    previousLeadId = leadId;

    cache.stampThreshold = null;
    renderReadout();
    tickSecond();
  }

  /* ------------------------------------------------------------------
     The readout well — the hot path
     ------------------------------------------------------------------ */

  function renderReadout() {
    var m = global.Metrics.byId(leadId);
    if (!m) return;
    var reading = lastReading;
    var v = reading ? reading.values[leadId] : null;
    var zone = reading ? reading.zones[leadId] : null;

    var shown = global.Scale.formatValue(leadId, v);
    setText(el.num, shown);
    // The empty mark is styled down to a placeholder (components.css). At the full
    // readout size its three em dashes paint a black rule across the well, which
    // reads as a redaction rather than as "nothing measured yet".
    setAttr(el.num, 'data-empty', shown === global.Scale.TEXT.common.noValue ? 'true' : null);

    var pos = global.Scale.pos(leadId, v);
    if (pos === null) {
      if (cache.needleShown !== false) {
        cache.needleShown = false;
        if (el.needle) el.needle.hidden = true;
      }
    } else {
      if (el.needle) el.needle.style.setProperty('--ms3-pos', pct(pos));
      if (cache.needleShown !== true) {
        cache.needleShown = true;
        if (el.needle) el.needle.hidden = false;
      }
    }

    renderStamp(m, v, zone);
    renderBaseline(reading);
  }

  function renderStamp(m, v, zone) {
    var word, mod, threshold = '';

    if (engineState === 'running' && !warmupDone) {
      word = T(['stamp.settling']);
      mod = 'none';
    } else if (v === null || v === undefined) {
      word = zoneWord(null);
      mod = 'none';
    } else {
      word = zoneWord(zone);
      mod = zoneMod(zone);
      // '(próg 26%)' — Scale knows which boundary the stamp is talking about.
      threshold = global.Scale.threshold(m.id, zone, thresholds);
    }

    if (cache.stampZone !== mod) {
      cache.stampZone = mod;
      swapMod(el.stamp, 'ms3-stamp', ZONE_MODS, mod);
      swapMod(el.stampShape, 'ms3-shape', ZONE_MODS, mod);
    }
    if (cache.stampWord !== word) { cache.stampWord = word; setText(el.stampWord, word); }
    if (cache.stampThreshold !== threshold) {
      cache.stampThreshold = threshold;
      setText(el.stampThreshold, threshold);
    }
  }

  // The baseline says out loud when the method stops being trustworthy (1.8):
  // a dashed rule plus the matching note under the well.
  function renderBaseline(reading) {
    var dashed = false;
    var note = '';
    if (reading && reading.extra) {
      if (leadId === 'kelvin' && reading.extra.kelvinReliable === false) {
        dashed = true;
        note = T(['note.kelvinOutOfRange']);
      } else if (leadId === 'flicker' && reading.extra.flickerWithinRange === false) {
        dashed = true;
        note = T(['note.flickerOutOfRange']);
      }
    }
    if (cache.baseDashed !== dashed) {
      cache.baseDashed = dashed;
      toggleClass(el.base, 'ms3-scale__base--dashed', dashed);
    }
    if (cache.rangeNote !== note) {
      cache.rangeNote = note;
      if (el.rangeNote) {
        setText(el.rangeNote, note);
        el.rangeNote.hidden = !note;
      }
    }
  }

  function setVerdict(textPL) {
    if (cache.verdict === textPL) return;
    cache.verdict = textPL;
    setText(el.verdict, textPL);
  }

  /* ------------------------------------------------------------------
     Verdict with hysteresis (7.2)
     ------------------------------------------------------------------ */

  function resetVerdict() {
    shownZone = null; shownCulprit = null; shownText = '';
    candZone = null; candCount = 0; culpritAt = 0; verdictPrimed = false;
  }

  function updateVerdict(reading, now) {
    if (!warmupDone) {
      setVerdict(T(['readout.verdictWarmup', 'verdict.warmup']));
      return;
    }

    var v = global.Scale.verdict(reading, thresholds);
    if (!v) return;

    if (!verdictPrimed) {
      // First verdict of a session: it appears the moment the warm-up ends,
      // not four seconds later. Hysteresis guards changes, not the first show.
      verdictPrimed = true;
      shownZone = v.zone; shownCulprit = v.culprit; shownText = v.textPL;
      culpritAt = now;
      candZone = null; candCount = 0;
      setVerdict(shownText);
      announceReady();
      return;
    }

    if (v.zone === shownZone) {
      candZone = null; candCount = 0;
      if (v.culprit !== shownCulprit && (now - culpritAt) >= CULPRIT_MIN_MS) {
        shownCulprit = v.culprit;
        shownText = v.textPL;
        culpritAt = now;
        setVerdict(shownText);
      }
      return;
    }

    if (v.zone === candZone) candCount += 1;
    else { candZone = v.zone; candCount = 1; }

    if (candCount >= HYST_SAMPLES) {
      shownZone = v.zone; shownCulprit = v.culprit; shownText = v.textPL;
      culpritAt = now;
      candZone = null; candCount = 0;
      setVerdict(shownText);
      say(shownText);            // a changed zone is worth exactly one sentence
    }
  }

  function announceReady() {
    var v = lastReading ? lastReading.values[leadId] : null;
    var z = lastReading ? lastReading.zones[leadId] : null;
    say(global.Scale.announceReady(leadId, v, z));
  }

  /* ------------------------------------------------------------------
     5 Hz — the only subscriber to engine:sample in the application
     ------------------------------------------------------------------ */

  function onSample(payload) {
    var reading = payload && payload.reading;
    if (!reading) return;
    lastReading = reading;
    if (frozen) setFrozen(false);

    var now = reading.t || Date.now();

    if (!warmupDone && sessionStartedAt !== null && (now - sessionStartedAt) >= WARMUP_MS) {
      warmupDone = true;
      if (el.warmup) el.warmup.hidden = true;
    }
    if (!warmupDone && !reducedMotion()) paintWarmup(now);

    renderReadout();
    renderRows(reading);
    updateVerdict(reading, now);

    // One publication per sample; shell.js decides who gets it and how often.
    if (global.UI3 && typeof global.UI3.publishLive === 'function') global.UI3.publishLive(reading);
  }

  // The warm-up line is the one bar in the application, and it moves through a
  // custom property so the 5 Hz budget stays intact.
  function paintWarmup(now) {
    if (!el.warmup || sessionStartedAt === null) return;
    var p = ((now - sessionStartedAt) / WARMUP_MS) * 100;
    if (p < 0) p = 0; else if (p > 100) p = 100;
    el.warmup.style.setProperty('--ms3-warm', pct(p));
  }

  /* ------------------------------------------------------------------
     1 Hz — everything that must not run five times a second
     ------------------------------------------------------------------ */

  function tickSecond() {
    renderRail();
    renderContext();
    labelRows();
    labelScale();
    placeMonitor();
    // With reduced motion the bar steps once a second instead of flowing (7.4).
    if (!warmupDone && reducedMotion()) paintWarmup(Date.now());
  }

  function renderRail() {
    var word;
    if (engineState === 'running') {
      var ms = sessionStartedAt === null ? 0 : (Date.now() - sessionStartedAt);
      var clock = global.Scale.duration(ms);
      word = T(['state.running', 'rail.running'], { time: clock, duration: clock });
      // A template without a slot for the clock still gets one, appended.
      if (word && word.indexOf(':') === -1) word = word + ' ' + clock;
    } else if (engineState === 'starting') {
      word = T(['state.starting', 'rail.starting']);
    } else if (engineState === 'error') {
      word = T(['state.error', 'rail.error']);
    } else {
      word = sessionStartedAt === null
        ? T(['state.idle', 'rail.idle'])
        : T(['state.stopped', 'rail.stopped']);
    }
    if (cache.railText !== word) { cache.railText = word; setText(el.stateText, word); }

    var mod = engineState;
    if (mod === 'idle' && sessionStartedAt !== null) mod = 'stopped';
    if (cache.railState !== mod) {
      cache.railState = mod;
      // The lamp is a square that never blinks (4.2); the class is its only cue.
      swapMod(el.stateDot, 'ms3-dot', ['idle', 'starting', 'running', 'stopped', 'error'], mod);
      setAttr(el.stateDot, 'data-state', mod);
    }

    if (el.hz && !el.hz.textContent) setText(el.hz, T(['rail.hz', 'state.hz']));
  }

  function statsFor(id) {
    if (!global.Engine || typeof global.Engine.buffer !== 'function') return null;
    var buf = global.Engine.buffer(CONTEXT_MS);
    var n = 0, sum = 0, mn = Infinity, mx = -Infinity, v, i;
    for (i = 0; i < buf.length; i += 1) {
      v = (buf[i] && buf[i].values) ? buf[i].values[id] : null;
      if (v === null || v === undefined || !isFinite(v)) continue;
      n += 1; sum += v;
      if (v < mn) mn = v;
      if (v > mx) mx = v;
    }
    if (!n) return null;
    return { min: mn, avg: sum / n, max: mx };
  }

  function renderContext() {
    if (!el.context) return;
    var s = (engineState === 'running') ? statsFor(leadId) : null;
    if (!s) {
      setText(el.context, T(['readout.contextEmpty', 'context.empty']));
      if (el.trace) el.trace.hidden = true;
      return;
    }
    setText(el.context, global.Scale.context(leadId, s));

    // Geometry in percent is allowed here because this runs once a second,
    // never inside the sampling loop (6.7 rule 3).
    if (el.trace) {
      var a = global.Scale.pos(leadId, s.min);
      var b = global.Scale.pos(leadId, s.max);
      if (a === null || b === null) { el.trace.hidden = true; return; }
      var from = Math.min(a, b), to = Math.max(a, b);
      el.trace.style.left = pct(from) + '%';
      el.trace.style.width = pct(to - from) + '%';
      el.trace.hidden = false;
    }
  }

  function labelScale() {
    var m = global.Metrics.byId(leadId);
    if (!m || !thresholds) return;
    var t = thresholds[leadId] || {};
    var v = lastReading ? lastReading.values[leadId] : null;
    var zone = zoneWord(lastReading ? lastReading.zones[leadId] : null).toLowerCase();

    if (el.scale) {
      var label = T(['aria.scale'], {
        name: mName(m),
        min: spoken(leadId, m.min),
        max: spoken(leadId, m.max),
        value: spoken(leadId, v),
        zone: zone,
        warn: spoken(leadId, t.warn),
        crit: spoken(leadId, t.crit)
      });
      if (label) setAttr(el.scale, 'aria-label', label);
    }

    if (el.readout) {
      var approximate = (leadId === 'kelvin' || leadId === 'melanopic');
      var readoutLabel = T(
        approximate ? ['aria.readoutApprox', 'aria.readout'] : ['aria.readout'],
        { name: mName(m), value: spoken(leadId, v), zone: zone }
      );
      if (readoutLabel) setAttr(el.readout, 'aria-label', readoutLabel);
    }
  }

  /* ------------------------------------------------------------------
     Camera monitor (4.5, 5.7)
     ------------------------------------------------------------------ */

  function placeMonitor() {
    var panel = el.cameraPanel;
    if (!panel) return;

    var host = panel.parentNode;
    var underDash = (host === el.scroll || host === el.deskSlot);

    if (!underDash) {
      // The aim screen is holding the panel: there the reticle is the truth and
      // the panel is never collapsed. Moving it now would break that screen.
      setAttr(panel, 'data-state', 'expanded');
      if (el.reticle) el.reticle.hidden = false;
      if (el.monitorBadge) el.monitorBadge.hidden = true;
      return;
    }

    var collapsed = (engineState === 'running');
    setAttr(panel, 'data-state', collapsed ? 'collapsed' : 'expanded');
    // A reticle over a square crop of a 4:3 stream is a lie, so it goes away
    // together with the full frame (5.7). Never display:none on the video.
    if (el.reticle) el.reticle.hidden = collapsed;
    // In its place the badge says the 96×96 square is a live image, not a frozen
    // thumbnail (4.5).
    if (el.monitorBadge) el.monitorBadge.hidden = !collapsed;

    var target = collapsed ? el.deskSlot : el.scroll;
    if (!target || host === target) return;
    if (target === el.scroll && el.notes && el.notes.parentNode === el.scroll) {
      el.scroll.insertBefore(panel, el.notes);
    } else {
      target.appendChild(panel);
    }
  }

  function onMetadata() {
    if (!el.video || !el.frame) return;
    var w = el.video.videoWidth, h = el.video.videoHeight;
    if (!w || !h) return;
    // Only now is `inset: 20%` exactly the 60%×60% rectangle the engine samples
    // (trap 4 in chapter 0).
    el.frame.style.aspectRatio = w + ' / ' + h;
  }

  /* ------------------------------------------------------------------
     Control desk (4.6)
     ------------------------------------------------------------------ */

  function renderKey() {
    if (!el.keyMain) return;
    var mode = (engineState === 'running') ? 'stop'
      : (engineState === 'starting' ? 'starting' : 'start');
    if (cache.keyMode === mode) return;
    cache.keyMode = mode;

    setText(el.keyLabel, T(
      mode === 'stop' ? ['keys.stop', 'key.stop']
        : mode === 'starting' ? ['keys.starting', 'key.starting']
          : ['keys.start', 'key.start']
    ));

    // Colour AND icon AND word change together (4.6). The left edge staying put
    // is the layout's job, not this file's.
    swapMod(el.keyMain, 'ms3-key', ['primary', 'stop'], mode === 'stop' ? 'stop' : 'primary');
    swapMod(el.keyIcon, 'ms3-key__icon', ['play', 'stop'], mode === 'stop' ? 'stop' : 'play');
    setAttr(el.keyMain, 'data-mode', mode);

    if (mode === 'starting') {
      setAttr(el.keyMain, 'aria-busy', 'true');
      setAttr(el.keyMain, 'aria-disabled', 'true');
    } else {
      setAttr(el.keyMain, 'aria-busy', null);
      setAttr(el.keyMain, 'aria-disabled', null);
    }
    // `disabled` is never set: the key must stay reachable so a second press
    // can cancel a start that is taking too long.
  }

  function onMainKey() {
    if (engineState === 'running' || engineState === 'starting') {
      global.Engine.stop();
      return;
    }
    hideErrata();
    try { global.Engine.start(); } catch (err) { /* failures arrive as engine:error */ }
  }

  /* ------------------------------------------------------------------
     Errata (5.15) — slides in above the well, never a modal
     ------------------------------------------------------------------ */

  // The text is written AFTER the block is shown. A role="alert" that is still
  // display:none when its content changes is not announced by NVDA or VoiceOver;
  // the change has to happen inside a live element.
  function showErrata(messagePL) {
    if (!el.errata) return;
    setText(el.errataText, '');
    el.errata.hidden = false;
    global.setTimeout(function () {
      setText(el.errataText, messagePL || '');     // verbatim from the engine
    }, 0);
  }

  function hideErrata() {
    if (el.errata) el.errata.hidden = true;
  }

  /* ------------------------------------------------------------------
     Help sheet for one metric
     ------------------------------------------------------------------ */

  function openHelp(metricId) {
    var m = global.Metrics.byId(metricId || leadId);
    if (!m || !global.UI3 || typeof global.UI3.openSheet !== 'function') return;
    global.UI3.openSheet({
      titlePL: mName(m),
      build: function (body) { buildHelp(body, m); }
    });
  }

  function addLine(parent, cls, text) {
    if (!text) return;
    var p = make('p', cls);
    p.textContent = text;
    parent.appendChild(p);
  }

  function addPair(list, label, value) {
    if (!label && !value) return;
    var dt = make('dt', 'ms3-kv__key');
    dt.textContent = label;
    var dd = make('dd', 'ms3-kv__value');
    dd.textContent = value;
    list.appendChild(dt);
    list.appendChild(dd);
  }

  function buildHelp(body, m) {
    var t = (thresholds && thresholds[m.id]) || {};
    addLine(body, 'ms3-note__text', mShort(m));
    addLine(body, 'ms3-note__text', mHelp(m));

    var list = make('dl', 'ms3-kv');
    addPair(list, T(['help.unit']), m.unit);
    addPair(list, T(['help.range']),
      global.Scale.formatValue(m.id, m.min) + ' – ' + global.Scale.formatValue(m.id, m.max) + ' ' + m.unit);
    addPair(list, T(['help.warn']), global.Scale.formatValue(m.id, t.warn) + ' ' + m.unit);
    addPair(list, T(['help.crit']), global.Scale.formatValue(m.id, t.crit) + ' ' + m.unit);
    body.appendChild(list);

    // An empty framed box would read as an unfinished screen, so the note only
    // exists when it has something to say.
    var noteTitle = T(['note.helpTitle']);
    var noteText = T(['note.helpText']);
    if (noteTitle || noteText) {
      var note = make('div', 'ms3-note ms3-note--limits');
      addLine(note, 'ms3-note__title', noteTitle);
      addLine(note, 'ms3-note__text', noteText);
      body.appendChild(note);
    }
  }

  /* ------------------------------------------------------------------
     Engine events — the single source of truth about the camera
     ------------------------------------------------------------------ */

  function onState(payload) {
    var next = (payload && payload.state) || 'idle';
    if (next === engineState) return;
    engineState = next;

    if (next === 'running') hideErrata();
    if (next !== 'running' && el.warmup) el.warmup.hidden = true;

    // Before the first measurement, and after an error, there is nothing to
    // freeze: the well goes back to "———".
    if (next === 'error' || (next === 'idle' && sessionStartedAt === null)) {
      lastReading = null;
      resetVerdict();
      renderRows(null);
    }

    setFrozen(next === 'idle' && sessionStartedAt !== null);
    refreshStale();
    renderKey();
    renderReadout();
    renderIdleVerdict();
    placeMonitor();
    renderRail();
    renderContext();
  }

  // After a stop the numbers stay on screen, dimmed: the last measurement is
  // still the truth about the light that was there (7.1).
  function setFrozen(state) {
    if (frozen === state) return;
    frozen = state;
    toggleClass(el.readout, 'ms3-readout--frozen', state);
    toggleClass(el.channels, 'ms3-channels--frozen', state);
    setAttr(el.readout, 'data-frozen', state ? 'true' : null);
    setAttr(el.channels, 'data-frozen', state ? 'true' : null);
  }

  // The verdict line when there is no verdict to give (8.2).
  function renderIdleVerdict() {
    if (engineState === 'running') return;
    if (engineState === 'error' || sessionStartedAt === null) {
      setVerdict(T(['readout.verdictIdle', 'verdict.idle']));
    }
  }

  function onStarted(payload) {
    sessionStartedAt = (payload && payload.startedAt) || Date.now();
    warmupDone = false;
    resetVerdict();
    setFrozen(false);
    hideErrata();
    if (el.warmup) {
      el.warmup.style.setProperty('--ms3-warm', '0');
      el.warmup.hidden = false;
    }
    var warm = T(['readout.verdictWarmup', 'verdict.warmup']);
    setVerdict(warm);
    say(warm);
    renderRail();
    placeMonitor();
  }

  function onStopped(payload) {
    var session = payload && payload.session;
    lastStoppedMs = session ? session.durationMs : 0;
    var text = global.Scale.announceStopped(lastStoppedMs);
    warmupDone = true;
    if (el.warmup) el.warmup.hidden = true;
    setVerdict(text);
    say(text);
    setFrozen(true);
    renderContext();
    // Nothing else opens here: a measurement ends quietly (7.8.4).
  }

  function onError(payload) {
    // The engine has five ready Polish messages; we print the one it sends and
    // never write our own (5.15).
    showErrata(payload && payload.messagePL);
  }

  function onThresholds() {
    thresholds = global.Engine.getThresholds();
    paintScale(true);
    buildChannels();
    cache.stampThreshold = null;
    renderReadout();
    renderContext();
  }

  /* ------------------------------------------------------------------
     Zmiana języka

     Powłoka wpisuje napisy szkieletu i przebudowuje ekrany modułów; pulpit
     jest jej poza zasięgiem, bo jego węzły mają jednego właściciela — ten
     plik. Nic tu nie jest budowane od nowa poza listwą kanałów: reszta to te
     same funkcje rysujące, które biegną przy zmianie kanału głównego, tylko
     z wyczyszczoną pamięcią podręczną — bez tego setText porównałby nowy
     napis ze starym i uznał, że nie ma nic do roboty.
     ------------------------------------------------------------------ */

  function relabelVerdict() {
    if (engineState === 'running') {
      if (!warmupDone) { setVerdict(T(['readout.verdictWarmup', 'verdict.warmup'])); return; }
      // Ta sama strefa i ten sam winowajca, tylko po nowemu — histereza nie
      // ma tu nic do rzeczy, bo pomiar się nie zmienił, zmienił się język.
      if (verdictPrimed && lastReading) {
        var v = global.Scale.verdict(lastReading, thresholds);
        if (v) { shownText = v.textPL; setVerdict(shownText); }
      }
      return;
    }
    if (lastStoppedMs !== null && engineState !== 'error') {
      setVerdict(global.Scale.announceStopped(lastStoppedMs));
      return;
    }
    renderIdleVerdict();
  }

  function relabel() {
    // Każda pozycja pamięci podręcznej trzyma napis w POPRZEDNIM języku,
    // a porównanie „ta sama wartość” jest jedynym warunkiem zapisu do DOM.
    cache.approx = null;
    cache.stampZone = null;
    cache.stampWord = null;
    cache.stampThreshold = null;
    cache.verdict = null;
    cache.railState = null;
    cache.railText = null;
    cache.keyMode = null;
    cache.rangeNote = null;
    cache.scaleKey = null;

    // renderRail() wpisuje częstotliwość tylko do pustego pola — inaczej
    // przepisywałby ją pięć razy na sekundę.
    if (el.hz) setText(el.hz, '');

    applyLead();        // nazwa kanału, pomoc, jednostka, skala, listwa, odczyt
    renderKey();
    renderRail();
    renderContext();
    labelRows();
    labelScale();
    relabelVerdict();

    var flipLabel = T(['keys.flipAria']);
    if (el.keyFlip && flipLabel) setAttr(el.keyFlip, 'aria-label', flipLabel);
    var menuLabel = T(['keys.menuAria']);
    if (el.keyMenu && menuLabel) setAttr(el.keyMenu, 'aria-label', menuLabel);
  }

  /* ------------------------------------------------------------------
     Start-up
     ------------------------------------------------------------------ */

  function init() {
    // boot.js reports a missing global on screen; here we simply stand down.
    if (!global.Metrics || !global.Scale || !global.Engine || !global.UI3 || !global.Bus) return;

    grabDom();
    thresholds = global.Engine.getThresholds();
    engineState = global.Engine.state();

    var saved = (typeof global.UI3.leadChannel === 'function') ? global.UI3.leadChannel() : null;
    if (saved && global.Metrics.byId(saved)) leadId = saved;

    applyLead();
    renderKey();
    renderIdleVerdict();
    placeMonitor();

    if (el.keyMain) el.keyMain.addEventListener('click', onMainKey);
    if (el.keyFlip) {
      el.keyFlip.addEventListener('click', function () { global.Engine.switchCamera(); });
      var flipLabel = T(['keys.flipAria']);
      if (flipLabel) setAttr(el.keyFlip, 'aria-label', flipLabel);
    }
    // shell.js marks this key when it wires it. Whoever gets there first owns the
    // click; two listeners would open the index twice and push two history entries.
    if (el.keyMenu && !el.keyMenu.getAttribute('data-ms3-menu')) {
      el.keyMenu.setAttribute('data-ms3-menu', '1');
      el.keyMenu.addEventListener('click', function () { global.UI3.openMenu(); });
      var menuLabel = T(['keys.menuAria']);
      if (menuLabel) setAttr(el.keyMenu, 'aria-label', menuLabel);
    }
    if (el.help) el.help.addEventListener('click', function () { openHelp(leadId); });
    if (el.errataRetry) {
      el.errataRetry.addEventListener('click', function () {
        hideErrata();
        global.Engine.start();
      });
    }
    // One control, one owner. Collapsed, CSS lays this key over the 96×96 frame,
    // so the tap on the preview and the Tab stop are the same <button>.
    if (el.monitorOpen) {
      el.monitorOpen.addEventListener('click', function () { global.UI3.openAim(); });
    }
    if (el.channels) el.channels.addEventListener('keydown', onStripKey);
    if (el.video) el.video.addEventListener('loadedmetadata', onMetadata);

    global.Bus.on('engine:sample', onSample);
    global.Bus.on('engine:state', onState);
    global.Bus.on('engine:started', onStarted);
    global.Bus.on('engine:stopped', onStopped);
    global.Bus.on('engine:error', onError);
    global.Bus.on('engine:thresholds', onThresholds);
    global.Bus.on('ui3:theme', function () { paintScale(true); });
    /* scale.js przebudował Scale.TEXT, a shell.js wpisał napisy szkieletu —
       oba stoją w index.html przed tym plikiem, więc tu jest już po wszystkim. */
    global.Bus.on('i18n:changed', relabel);
    global.Bus.on('ui3:lead', function (data) {
      var id = data && (data.id || data.leadChannel);
      if (id && id !== leadId && global.Metrics.byId(id)) { leadId = id; applyLead(); }
    });
    if (secondTimer) global.clearInterval(secondTimer);
    secondTimer = global.setInterval(tickSecond, 1000);
    tickSecond();
  }

  if (global.UI3 && typeof global.UI3.ready === 'function') global.UI3.ready(init);
  else if (global.Bus) global.Bus.once('app:ready', init);

}(window));
