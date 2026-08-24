/* Monitor Światła v3 — recorder.js — module 01 "Rejestrator".
 *
 * The only file in the application that owns a <canvas> (DESIGN.md 6.3). It
 * draws one tape for the ranges up to an hour, one bar panorama built from
 * plain <div>s for 24 h and 30 days (6.4), a reading crosshair, the session
 * statistics (6.6) and — under every chart, always — the tabular print-out
 * (5.12) with the same data.
 *
 * Four traps this file exists to avoid, all of them paid for once already:
 *
 *   1. A canvas measured inside a hidden element reports width 0. Everything
 *      here starts from getBoundingClientRect() and bails on `w < 2`, and the
 *      shell calls build() only after the screen is visible.
 *   2. `point.zone` from Engine.history() is ALWAYS the zone of `share`. Any
 *      other lead channel gets its zone computed here, through Scale.zone().
 *   3. Colours baked into a canvas do not follow a theme change the way CSS
 *      does, so every colour is read from the custom properties at draw time
 *      and the whole tape is repainted on `ui3:theme`.
 *   4. History is written only while measuring, so the series is full of
 *      holes. A hole wider than 3 × LONG_STEP_MS breaks the polyline with
 *      moveTo and gets the words "brak pomiaru" written over it — joining
 *      across a three-day hole would be a lie drawn in ink.
 *
 * Drawing budget (6.7): no requestAnimationFrame anywhere, at most one repaint
 * per second while measuring, nothing at all while the tab is hidden or the
 * module is off screen.
 *
 * No Polish literal appears below. Every string is looked up in Scale.TEXT.
 */
(function (global) {
  'use strict';

  var doc = global.document;

  /* ------------------------------------------------------------------
     Constants — from the specification, none of them invented
     ------------------------------------------------------------------ */

  var MODULE_NO = '01';
  var GAP_MS = 15000;          // 6.3.6 — 3 × LONG_STEP_MS breaks the line
  var MAX_DPR = 2;             // 6.3 — device pixel ratio is capped at 2
  var RESIZE_MS = 150;         // 6.3 — debounce on resize / orientationchange
  var TICK_MS = 1000;          // 6.3 — at most one repaint per second
  var DEAD_ZONE_PX = 24;       // 6.3 — the system back-swipe lane on the left
  var ARIA_MS = 1000;          // 6.3 — aria-valuetext at most once per second
  var TABLE_ROWS = 60;         // rows kept in the print-out, see the note below
  var BASE_FONT = 15;          // 6.3.7 — never below 15 px, scaled with the UI
  var ENVELOPE_ALPHA = 0.12;   // 6.3.4 — min–max envelope when points aggregate

  // 6.3, the source table. `ms` is a duration; Engine.history() accepts one.
  var RANGES = [
    { key: '60s', ms: 60000, source: 'live', form: 'line', seconds: true },
    { key: '15min', ms: 900000, source: 'history', form: 'line' },
    { key: '1h', ms: 3600000, source: 'history', form: 'line' },
    { key: '24h', ms: 86400000, source: 'history', form: 'bars', buckets: 72 },
    { key: '30d', ms: 2592000000, source: 'history', form: 'bars', buckets: 30, days: true }
  ];

  var ZONE_RANK = { good: 0, warning: 1, critical: 2 };
  var ZONE_ORDER = ['good', 'warning', 'critical'];

  /* ------------------------------------------------------------------
     Module state
     ------------------------------------------------------------------ */

  var el = {};                 // DOM nodes built once in build()
  var built = false;
  var root = null;

  var rangeKey = '60s';
  var leadId = 'share';
  var thresholds = null;

  var points = [];             // flat points {t, share, brightness, …} in time order
  var series = [];             // what the polyline actually draws
  var buckets = [];            // panorama buckets, one per bar
  var items = [];              // what the crosshair walks: {pct, t, p}
  var crossIndex = 0;
  var crossTime = null;        // the moment the crosshair is anchored to
  var crossAtEnd = true;       // the crosshair follows the newest sample unless moved
  var geom = null;             // last canvas geometry, in CSS pixels

  var barNodes = [];
  var tableRows = [];
  var zoneRows = {};

  var tickTimer = null;
  var resizeTimer = null;
  var ariaTimer = null;
  var ariaAt = 0;
  var wasVisible = false;
  var dragging = false;

  /* ------------------------------------------------------------------
     Text — same discipline as dash.js: every string comes from Scale.TEXT,
     a missing key is one English console warning and an empty string, never
     an invented Polish sentence.
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
    return typeof node === 'string' ? node : null;
  }

  function fill(tpl, vars) {
    if (!vars) return tpl;
    return tpl.replace(/\{(\w+)\}/g, function (whole, key) {
      return Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : whole;
    });
  }

  function T(paths, vars) {
    var found = null;
    for (var i = 0; i < paths.length && found === null; i += 1) found = resolve(paths[i]);
    if (found === null) {
      if (!warned[paths[0]]) {
        warned[paths[0]] = true;
        if (global.console && global.console.warn) {
          global.console.warn('recorder.js: Scale.TEXT has no "' + paths[0] + '"');
        }
      }
      return '';
    }
    return fill(found, vars);
  }

  function sep() { return T(['common.sep']) || ' · '; }

  function noValue() { return T(['common.noValue']) || '—'; }

  /* ------------------------------------------------------------------
     Tiny DOM helpers
     ------------------------------------------------------------------ */

  function make(tag, cls) {
    var node = doc.createElement(tag);
    if (cls) node.className = cls;
    return node;
  }

  function put(parent, node) { parent.appendChild(node); return node; }

  function setText(node, value) {
    if (node && node.textContent !== value) node.textContent = value;
  }

  function setAttr(node, name, value) {
    if (!node) return;
    if (value === null) { if (node.hasAttribute(name)) node.removeAttribute(name); return; }
    if (node.getAttribute(name) !== value) node.setAttribute(name, value);
  }

  function setHidden(node, on) {
    if (!node) return;
    if (on) { if (!node.hidden) node.hidden = true; }
    else if (node.hidden) node.hidden = false;
  }

  function clear(node) {
    while (node && node.firstChild) node.removeChild(node.firstChild);
  }

  function cssVar(name, fallback) {
    var v = '';
    try {
      v = global.getComputedStyle(doc.documentElement).getPropertyValue(name);
    } catch (err) { v = ''; }
    v = String(v || '').replace(/^\s+|\s+$/g, '');
    return v || fallback;
  }

  // The text-size setting multiplies the whole interface; canvas labels have to
  // grow with it or the axes stay 15 px while everything around them is 20 px.
  function uiScale() {
    var v = parseFloat(cssVar('--ms3-scale', '1'));
    return isFinite(v) && v > 0 ? v : 1;
  }

  function reducedMotion() {
    if (doc.documentElement.getAttribute('data-motion') === 'reduced') return true;
    try {
      return !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (err) { return false; }
  }

  /* ------------------------------------------------------------------
     Catalogue and premium access
     ------------------------------------------------------------------ */

  function catalogue() {
    return (global.Metrics && global.Metrics.CATALOGUE) ? global.Metrics.CATALOGUE : [];
  }

  function metric(id) {
    return (global.Metrics && global.Metrics.byId) ? global.Metrics.byId(id) : null;
  }

  // The catalogue says a metric is paid; whether it is locked right now is
  // offer.js's business. With no answer it stays locked — the honest default.
  function isLocked(m) {
    if (!m || !m.premium) return false;
    var offer = global.Offer;
    if (offer && typeof offer.isUnlocked === 'function') {
      try { if (offer.isUnlocked(m.id)) return false; } catch (err) { /* stays locked */ }
    }
    return true;
  }

  function valueText(id, v) {
    var m = metric(id);
    if (isLocked(m)) return noValue();
    return global.Scale.formatValue(id, v);
  }

  /* ------------------------------------------------------------------
     Time formatting. Digits only — no Polish word is produced here.
     ------------------------------------------------------------------ */

  function two(n) { return n < 10 ? '0' + n : String(n); }

  function axisTime(range, t) {
    var d = new Date(t);
    if (range.days) return two(d.getDate()) + '.' + two(d.getMonth() + 1);
    var s = two(d.getHours()) + ':' + two(d.getMinutes());
    return range.seconds ? s + ':' + two(d.getSeconds()) : s;
  }

  function pointTime(range, t) {
    var d = new Date(t);
    if (range.days) {
      return two(d.getDate()) + '.' + two(d.getMonth() + 1) + ' ' +
        two(d.getHours()) + ':' + two(d.getMinutes());
    }
    return axisTime(range, t);
  }

  /* ------------------------------------------------------------------
     Data
     ------------------------------------------------------------------ */

  function currentRange() {
    for (var i = 0; i < RANGES.length; i += 1) if (RANGES[i].key === rangeKey) return RANGES[i];
    return RANGES[0];
  }

  // Engine.buffer() hands out full readings, Engine.history() hands out flat
  // points. The rest of this file only ever sees the flat shape.
  function flatten(reading) {
    var out = { t: reading.t };
    var ids = catalogue();
    for (var i = 0; i < ids.length; i += 1) out[ids[i].id] = reading.values[ids[i].id];
    out.zone = reading.zones ? reading.zones.share : null;
    return out;
  }

  function collect(range, widthPx) {
    var Engine = global.Engine;
    var out = [];
    var i;
    if (range.source === 'live') {
      var buf = Engine.buffer(range.ms) || [];
      for (i = 0; i < buf.length; i += 1) out.push(flatten(buf[i]));
      return out;
    }
    var opts = { sinceMs: range.ms };
    // One point per pixel column is all a line can show; asking for more only
    // makes the engine copy records nobody will ever draw.
    if (range.form === 'line' && widthPx >= 2) opts.maxPoints = Math.floor(widthPx);
    return Engine.history(opts) || [];
  }

  function zoneOf(value) {
    if (typeof value !== 'number' || !isFinite(value)) return null;
    return global.Scale.zone(leadId, value, thresholds);
  }

  function statsOf(list) {
    var min = null, max = null, sum = 0, n = 0;
    for (var i = 0; i < list.length; i += 1) {
      var v = list[i][leadId];
      if (typeof v !== 'number' || !isFinite(v)) continue;
      if (min === null || v < min) min = v;
      if (max === null || v > max) max = v;
      sum += v; n += 1;
    }
    if (!n) return null;
    return { min: min, max: max, avg: sum / n, n: n };
  }

  /* ------------------------------------------------------------------
     Sentences assembled from existing wording (never invented)
     ------------------------------------------------------------------ */

  function leadName() {
    var m = metric(leadId);
    return m ? m.namePL : '';
  }

  // The context template ends with a fixed "— ostatnie 60 s"; here the range is
  // named separately, so the tail is dropped rather than repeated wrongly.
  function statsText(stats) {
    if (!stats) return T(['readout.contextEmpty']);
    var tpl = T(['readout.contextTpl']);
    var cut = tpl.indexOf('—');
    if (cut > 0) tpl = tpl.slice(0, cut).replace(/\s+$/, '');
    return fill(tpl, {
      min: valueText(leadId, stats.min),
      avg: valueText(leadId, stats.avg),
      max: valueText(leadId, stats.max)
    });
  }

  function zoneWord(zone) {
    var stamp = global.Scale.stamp(zone);
    return stamp ? stamp.wordPL : '';
  }

  function joinParts(parts) {
    var out = [];
    for (var i = 0; i < parts.length; i += 1) if (parts[i]) out.push(parts[i]);
    return out.join(sep());
  }

  function rangeWord() { return T(['recorder.ranges.' + rangeKey]); }

  /* ------------------------------------------------------------------
     The tape (6.3)
     ------------------------------------------------------------------ */

  function colours() {
    return {
      well: cssVar('--ms3-well', '#F1F3F7'),
      rule: cssVar('--ms3-rule', '#6A7480'),
      hairline: cssVar('--ms3-hairline', '#C7CDD5'),
      ink: cssVar('--ms3-ink', '#0B0E13'),
      ink3: cssVar('--ms3-ink-3', '#565F6B'),
      fill: {
        good: cssVar('--ms3-fill-good', 'rgba(10,107,46,.20)'),
        warning: cssVar('--ms3-fill-warn', 'rgba(133,72,10,.20)'),
        critical: cssVar('--ms3-fill-crit', 'rgba(176,31,25,.22)')
      },
      hatch: {
        warning: cssVar('--ms3-hatch-a', 'rgba(133,72,10,.55)'),
        critical: cssVar('--ms3-hatch-b', 'rgba(176,31,25,.55)')
      }
    };
  }

  // The same three textures the scale bands use: smooth / 45° at 6 px / crossed
  // at 5 px. Drawn with a lineTo loop, never with an image (6.3.2).
  function hatch(ctx, x, y, w, h, colour, spacing, crossed) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    ctx.strokeStyle = colour;
    ctx.lineWidth = 1;
    ctx.beginPath();
    var i;
    for (i = -h; i < w + h; i += spacing) {
      ctx.moveTo(x + i, y + h);
      ctx.lineTo(x + i + h, y);
    }
    if (crossed) {
      for (i = -h; i < w + h; i += spacing) {
        ctx.moveTo(x + i, y);
        ctx.lineTo(x + i + h, y + h);
      }
    }
    ctx.stroke();
    ctx.restore();
  }

  /* Turns the raw points into what the polyline draws. When there are more
     points than pixel columns they are folded into one bucket per column, and
     the bucket keeps its min and max so the envelope can be drawn (6.3.4). */
  function buildSeries(list, tStart, tSpan, fw) {
    var raw = [];
    var i, v;
    for (i = 0; i < list.length; i += 1) {
      v = list[i][leadId];
      if (typeof v !== 'number' || !isFinite(v)) continue;
      raw.push({ t: list[i].t, v: v, p: list[i] });
    }
    if (!raw.length) return { list: [], aggregated: false };

    var cols = Math.max(2, Math.floor(fw));
    if (raw.length <= cols) {
      var plain = [];
      for (i = 0; i < raw.length; i += 1) {
        plain.push({
          t: raw[i].t, v: raw[i].v, min: raw[i].v, max: raw[i].v, p: raw[i].p,
          gapBefore: i > 0 && (raw[i].t - raw[i - 1].t) > GAP_MS,
          prevT: i > 0 ? raw[i - 1].t : raw[i].t
        });
      }
      return { list: plain, aggregated: false };
    }

    var out = [];
    var cur = null;
    var curCol = -1;
    var prevT = null;
    for (i = 0; i < raw.length; i += 1) {
      var col = Math.floor(((raw[i].t - tStart) / tSpan) * cols);
      if (col < 0) col = 0;
      if (col > cols - 1) col = cols - 1;
      if (col !== curCol) {
        if (cur) out.push(closeBucket(cur));
        curCol = col;
        cur = {
          sum: 0, n: 0, min: raw[i].v, max: raw[i].v, first: raw[i].t, last: raw[i].t,
          p: raw[i].p, gapBefore: prevT !== null && (raw[i].t - prevT) > GAP_MS,
          prevT: prevT === null ? raw[i].t : prevT
        };
      }
      cur.sum += raw[i].v;
      cur.n += 1;
      if (raw[i].v < cur.min) cur.min = raw[i].v;
      if (raw[i].v > cur.max) cur.max = raw[i].v;
      cur.last = raw[i].t;
      prevT = raw[i].t;
    }
    if (cur) out.push(closeBucket(cur));
    return { list: out, aggregated: true };
  }

  function closeBucket(b) {
    return {
      t: (b.first + b.last) / 2,
      v: b.sum / b.n,
      min: b.min,
      max: b.max,
      p: b.p,
      gapBefore: b.gapBefore,
      prevT: b.prevT
    };
  }

  function drawTape(range) {
    var cv = el.canvas;
    if (!cv || !cv.getContext) { series = []; geom = null; return; }

    var rect = cv.getBoundingClientRect();
    var w = Math.round(rect.width);
    var h = Math.round(rect.height);
    // The trap from v2: a canvas inside a hidden panel measures zero.
    if (w < 2 || h < 2) { series = []; geom = null; return; }

    var dpr = Math.min(MAX_DPR, global.devicePixelRatio || 1);
    var pw = Math.round(w * dpr);
    var ph = Math.round(h * dpr);
    if (cv.width !== pw) cv.width = pw;
    if (cv.height !== ph) cv.height = ph;

    var ctx = cv.getContext('2d');
    if (!ctx) { series = []; geom = null; return; }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    var c = colours();
    var font = Math.round(BASE_FONT * uiScale());
    var family = cssVar('--ms3-font', 'system-ui, sans-serif');
    ctx.font = font + 'px ' + family;
    ctx.textBaseline = 'middle';

    var m = metric(leadId);
    if (!m) { series = []; geom = null; return; }

    // Three value labels sit OUTSIDE the data field (6.3.7), so the field's
    // left padding is whatever the widest of them needs.
    var labels = valueLabels(m);
    var labelW = 0;
    var i;
    for (i = 0; i < labels.length; i += 1) {
      labelW = Math.max(labelW, ctx.measureText(labels[i].text).width);
    }

    var padL = Math.ceil(labelW) + 10;
    var padR = 8;
    var padT = Math.round(font * 0.8);
    var padB = font + 14;
    var x0 = padL;
    var y0 = padT;
    var fw = w - padL - padR;
    var fh = h - padT - padB;
    if (fw < 16 || fh < 16) { series = []; geom = null; return; }

    var now = Date.now();
    var tEnd = now;
    var tStart = now - range.ms;
    var tSpan = range.ms;

    function xOf(t) { return x0 + ((t - tStart) / tSpan) * fw; }
    function yOf(v) {
      var pos = global.Scale.pos(leadId, v);
      if (pos === null) return null;
      return y0 + fh - (pos / 100) * fh;
    }
    function yOfPos(pos) { return y0 + fh - (pos / 100) * fh; }

    /* 1. the well */
    ctx.fillStyle = c.well;
    ctx.fillRect(x0, y0, fw, fh);

    /* 2. zone bands, full width, in the same three textures as the scale */
    var bands = global.Scale.bands(leadId, thresholds) || [];
    for (i = 0; i < bands.length; i += 1) {
      var band = bands[i];
      var yTop = yOfPos(band.to);
      var yBot = yOfPos(band.from);
      var bh = yBot - yTop;
      if (bh <= 0) continue;
      ctx.fillStyle = c.fill[band.zone] || c.fill.good;
      ctx.fillRect(x0, yTop, fw, bh);
      if (band.zone === 'warning') hatch(ctx, x0, yTop, fw, bh, c.hatch.warning, 6, false);
      else if (band.zone === 'critical') hatch(ctx, x0, yTop, fw, bh, c.hatch.critical, 5, true);
    }

    /* 3. grid, one hairline every quarter of the height */
    ctx.strokeStyle = c.hairline;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (i = 1; i < 4; i += 1) {
      var gy = Math.round(y0 + (fh * i) / 4) + 0.5;
      ctx.moveTo(x0, gy);
      ctx.lineTo(x0 + fw, gy);
    }
    ctx.stroke();

    /* 4 + 5. envelope and the trace itself */
    var made = buildSeries(points, tStart, tSpan, fw);
    series = made.list;

    ctx.save();
    ctx.beginPath();
    ctx.rect(x0, y0, fw, fh);
    ctx.clip();

    if (made.aggregated && series.length > 1) {
      ctx.globalAlpha = ENVELOPE_ALPHA;
      ctx.fillStyle = c.ink;
      var start = 0;
      while (start < series.length) {
        var end = start;
        while (end + 1 < series.length && !series[end + 1].gapBefore) end += 1;
        if (end > start) {
          ctx.beginPath();
          for (i = start; i <= end; i += 1) ctx.lineTo(xOf(series[i].t), yOf(series[i].max));
          for (i = end; i >= start; i -= 1) ctx.lineTo(xOf(series[i].t), yOf(series[i].min));
          ctx.closePath();
          ctx.fill();
        }
        start = end + 1;
      }
      ctx.globalAlpha = 1;
    }

    // 6.3.5 — the trace is ALWAYS ink, never a status colour: the bands behind
    // it already carry the meaning, and one colour must mean one thing.
    ctx.strokeStyle = c.ink;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    for (i = 0; i < series.length; i += 1) {
      var px = xOf(series[i].t);
      var py = yOf(series[i].v);
      if (py === null) continue;
      if (i === 0 || series[i].gapBefore) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    if (series.length === 1) {
      var sy = yOf(series[0].v);
      if (sy !== null) {
        ctx.moveTo(xOf(series[0].t) - 3, sy);
        ctx.lineTo(xOf(series[0].t) + 3, sy);
      }
    }
    ctx.stroke();
    ctx.restore();

    /* 6. "brak pomiaru" over every hole wide enough to hold the words */
    var gapText = T(['recorder.gap']);
    if (gapText) {
      ctx.fillStyle = c.ink3;
      ctx.textAlign = 'center';
      var gapW = ctx.measureText(gapText).width;
      for (i = 1; i < series.length; i += 1) {
        if (!series[i].gapBefore) continue;
        var ga = xOf(series[i].prevT);
        var gb = xOf(series[i].t);
        if (gb - ga < gapW + 12) continue;
        var gx = (ga + gb) / 2;
        if (gx < x0 + gapW / 2 || gx > x0 + fw - gapW / 2) continue;
        ctx.fillText(gapText, gx, y0 + fh / 2);
      }
      // A hole that runs to the right edge (the measurement stopped a while
      // ago) has no point after it, so it is labelled from the last one.
      if (series.length) {
        var lastT = series[series.length - 1].t;
        if (tEnd - lastT > GAP_MS) {
          var la = xOf(lastT);
          if (x0 + fw - la >= gapW + 12) {
            var lx = (la + x0 + fw) / 2;
            if (lx <= x0 + fw - gapW / 2) ctx.fillText(gapText, lx, y0 + fh / 2);
          }
        }
      }
      ctx.textAlign = 'left';
    }

    /* the field border, drawn last so nothing paints over it */
    ctx.strokeStyle = c.rule;
    ctx.lineWidth = 1;
    ctx.strokeRect(x0 + 0.5, y0 + 0.5, fw - 1, fh - 1);

    /* 7. axes */
    ctx.fillStyle = c.ink3;
    ctx.textAlign = 'right';
    for (i = 0; i < labels.length; i += 1) {
      ctx.fillText(labels[i].text, x0 - 6, yOfPos(labels[i].pos));
    }
    ctx.textAlign = 'left';
    var ty = h - padB / 2;
    for (i = 0; i < 4; i += 1) {
      var frac = i / 3;
      var tx = x0 + fw * frac;
      var stamp = axisTime(range, tStart + tSpan * frac);
      if (i === 0) ctx.textAlign = 'left';
      else if (i === 3) ctx.textAlign = 'right';
      else ctx.textAlign = 'center';
      ctx.fillText(stamp, tx, ty);
    }
    ctx.textAlign = 'left';

    geom = { w: w, h: h, x0: x0, y0: y0, fw: fw, fh: fh, tStart: tStart, tSpan: tSpan };

    /* 8. the alternative text. The table under the canvas carries the data. */
    setAttr(cv, 'aria-label', joinParts([rangeWord(), leadName(), statsText(statsOf(points))]));
  }

  function valueLabels(m) {
    var mid = (m.min + m.max) / 2;
    return [
      { pos: 100, text: global.Scale.formatValue(m.id, m.max) + global.Scale.unitSuffix(m.id) },
      { pos: 50, text: global.Scale.formatValue(m.id, mid) },
      { pos: 0, text: global.Scale.formatValue(m.id, m.min) }
    ];
  }

  /* ------------------------------------------------------------------
     The bar panorama (6.4) — <div>s, so the screen reader, forced colours
     and the system magnifier all keep working, and drawing costs nothing.
     ------------------------------------------------------------------ */

  function buildBuckets(range) {
    var n = range.buckets;
    var now = Date.now();
    var tStart = now - range.ms;
    var step = range.ms / n;
    var out = new Array(n);
    var i;
    for (i = 0; i < n; i += 1) {
      out[i] = { tStart: tStart + i * step, zone: null, rank: -1, n: 0, p: null };
    }
    for (i = 0; i < points.length; i += 1) {
      var p = points[i];
      var v = p[leadId];
      if (typeof v !== 'number' || !isFinite(v)) continue;
      var idx = Math.floor((p.t - tStart) / step);
      if (idx < 0) idx = 0;
      if (idx > n - 1) idx = n - 1;
      var b = out[idx];
      b.n += 1;
      // Trap 2: point.zone is the zone of `share`. Any other channel needs its
      // own arithmetic, and the bucket keeps the WORST zone it saw.
      var zone = zoneOf(v);
      var rank = ZONE_RANK[zone];
      if (rank === undefined) rank = -1;
      if (b.p === null || rank > b.rank) { b.rank = rank; b.zone = zone; b.p = p; }
    }
    return out;
  }

  function renderBars(range) {
    buckets = buildBuckets(range);
    var n = buckets.length;
    var i;

    if (barNodes.length !== n) {
      clear(el.bars);
      barNodes = [];
      for (i = 0; i < n; i += 1) barNodes.push(put(el.bars, make('div', 'ms3-bars__bar')));
    }

    var counts = { good: 0, warning: 0, critical: 0, none: 0 };
    for (i = 0; i < n; i += 1) {
      var b = buckets[i];
      var cls = 'ms3-bars__bar';
      if (!b.n) { cls += ' ms3-bars__bar--empty'; counts.none += 1; }
      else if (b.zone === 'warning') { cls += ' ms3-bars__bar--warning'; counts.warning += 1; }
      else if (b.zone === 'critical') { cls += ' ms3-bars__bar--critical'; counts.critical += 1; }
      else if (b.zone === 'good') { counts.good += 1; }
      else { cls += ' ms3-bars__bar--empty'; counts.none += 1; }
      if (barNodes[i].className !== cls) barNodes[i].className = cls;
    }

    var parts = [rangeWord(), leadName()];
    for (i = 0; i < ZONE_ORDER.length; i += 1) {
      if (counts[ZONE_ORDER[i]]) parts.push(zoneWord(ZONE_ORDER[i]) + ' ' + counts[ZONE_ORDER[i]]);
    }
    if (counts.none) parts.push(zoneWord(null) + ' ' + counts.none);
    setAttr(el.bars, 'aria-label', joinParts(parts));

    // Coverage is counted in whole hours for both panoramas: "3 z 24" and
    // "3 z 720" both read correctly with the one template chapter 8.6 gives.
    var hours = {};
    for (i = 0; i < points.length; i += 1) {
      var v = points[i][leadId];
      if (typeof v !== 'number' || !isFinite(v)) continue;
      hours[Math.floor(points[i].t / 3600000)] = true;
    }
    var done = 0;
    for (var key in hours) if (Object.prototype.hasOwnProperty.call(hours, key)) done += 1;
    var total = Math.round(range.ms / 3600000);
    setText(el.coverage, T(['empty.coverageTpl'], { done: done, total: total }));
  }

  /* ------------------------------------------------------------------
     The reading crosshair (6.3). Drag, the two 48 px keys and the arrow
     keys all move the same index — a gesture is never the only way in.
     ------------------------------------------------------------------ */

  function buildItems(range) {
    var out = [];
    var i;
    if (range.form === 'line') {
      if (!geom) return out;
      for (i = 0; i < series.length; i += 1) {
        var x = geom.x0 + ((series[i].t - geom.tStart) / geom.tSpan) * geom.fw;
        out.push({ pct: (x / geom.w) * 100, t: series[i].t, p: series[i].p });
      }
      return out;
    }
    // Bars are flex: 1 with a 1 px gap, so the centre of bar i is NOT
    // (i + 0.5) / n of the width — with 72 bars the gaps add up to a third of a
    // bar and the crosshair would drift visibly to the right.
    var n = buckets.length;
    var width = el.bars ? el.bars.getBoundingClientRect().width : 0;
    var barW = width >= 2 ? (width - (n - 1)) / n : 0;
    for (i = 0; i < n; i += 1) {
      if (!buckets[i].n || !buckets[i].p) continue;
      var pct = barW > 0
        ? ((i * (barW + 1) + barW / 2) / width) * 100
        : ((i + 0.5) / n) * 100;
      out.push({ pct: pct, t: buckets[i].p.t, p: buckets[i].p });
    }
    return out;
  }

  function syncCross(range) {
    var wasEnd = crossAtEnd;
    items = buildItems(range);
    var has = items.length > 0;
    setHidden(el.cross, !has);
    setHidden(el.nav, !has);
    setHidden(el.crossList, !has);
    setHidden(el.chip, !has);
    if (!has) { crossIndex = 0; crossTime = null; return; }
    // The crosshair is anchored to a MOMENT, not to an index: while measuring,
    // the 60 s window slides and index 40 is a different second every second.
    if (wasEnd || crossTime === null) {
      crossIndex = items.length - 1;
    } else {
      var best = items.length - 1;
      var dist = Infinity;
      for (var i = 0; i < items.length; i += 1) {
        var d = Math.abs(items[i].t - crossTime);
        if (d < dist) { dist = d; best = i; }
      }
      crossIndex = best;
    }
    crossAtEnd = crossIndex === items.length - 1;
    renderCross(range, true);
  }

  function renderCross(range, quiet) {
    if (!items.length) return;
    var item = items[crossIndex];
    crossTime = item.t;
    var pct = Math.max(0, Math.min(100, item.pct));
    el.strip.style.setProperty('--ms3-pos', pct.toFixed(2));

    var stamp = pointTime(range, item.t);
    setText(el.chip, stamp);
    setText(el.navTime, stamp);

    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      var id = list[i].id;
      var cell = el.crossCells[id];
      if (!cell) continue;
      setText(cell.value, valueText(id, item.p[id]));
      setText(cell.unit, isLocked(list[i]) ? '' : global.Scale.unitSuffix(id));
    }

    setAttr(el.cross, 'aria-valuemin', '0');
    setAttr(el.cross, 'aria-valuemax', String(items.length - 1));
    setAttr(el.cross, 'aria-valuenow', String(crossIndex));

    var voice = joinParts([
      stamp,
      leadName() + ' ' + global.Scale.spoken(leadId, item.p[leadId]),
      global.Scale.spokenZone(zoneOf(item.p[leadId]))
    ]);
    announce(voice, quiet);
  }

  // 6.3: aria-valuetext is refreshed at most once a second. A drag would
  // otherwise fire a hundred announcements across one tape.
  function announce(voice, quiet) {
    if (!dragging || quiet) {
      ariaAt = Date.now();
      setAttr(el.cross, 'aria-valuetext', voice);
      return;
    }
    var now = Date.now();
    if (now - ariaAt >= ARIA_MS) {
      ariaAt = now;
      setAttr(el.cross, 'aria-valuetext', voice);
      return;
    }
    if (ariaTimer) global.clearTimeout(ariaTimer);
    ariaTimer = global.setTimeout(function () {
      ariaTimer = null;
      ariaAt = Date.now();
      setAttr(el.cross, 'aria-valuetext', voice);
    }, ARIA_MS - (now - ariaAt));
  }

  function moveCross(delta) {
    if (!items.length) return;
    setCross(crossIndex + delta);
  }

  function setCross(index) {
    if (!items.length) return;
    var i = index;
    if (i < 0) i = 0;
    if (i > items.length - 1) i = items.length - 1;
    if (i === crossIndex) return;
    crossIndex = i;
    crossAtEnd = crossIndex === items.length - 1;
    renderCross(currentRange(), false);
  }

  function pickAtX(x) {
    if (!items.length) return;
    var rect = el.tape.getBoundingClientRect();
    if (rect.width < 2) return;
    var pct = (x / rect.width) * 100;
    var best = 0;
    var bestDist = Infinity;
    for (var i = 0; i < items.length; i += 1) {
      var d = Math.abs(items[i].pct - pct);
      if (d < bestDist) { bestDist = d; best = i; }
    }
    setCross(best);
  }

  /* ------------------------------------------------------------------
     The print-out (5.12) — the same data, in the one form a screen reader
     and the system magnifier handle perfectly.
     ------------------------------------------------------------------ */

  function thin(list, max) {
    if (list.length <= max) return list.slice(0);
    var out = new Array(max);
    var step = list.length / max;
    for (var i = 0; i < max; i += 1) out[i] = list[Math.floor(i * step)];
    out[max - 1] = list[list.length - 1];   // the newest reading always survives
    return out;
  }

  function tableSource(range) {
    var out = [];
    var i;
    if (range.form === 'line') {
      for (i = 0; i < series.length; i += 1) out.push(series[i].p);
      if (!out.length) {
        for (i = 0; i < points.length; i += 1) out.push(points[i]);
      }
    } else {
      for (i = 0; i < buckets.length; i += 1) if (buckets[i].n && buckets[i].p) out.push(buckets[i].p);
    }
    return thin(out, TABLE_ROWS);
  }

  function ensureRows(n) {
    var list = catalogue();
    while (tableRows.length < n) {
      var tr = put(el.tbody, make('tr'));
      var row = { el: tr, time: put(tr, make('td')), cells: {} };
      for (var i = 0; i < list.length; i += 1) {
        row.cells[list[i].id] = put(tr, make('td', 'ms3-num'));
      }
      tableRows.push(row);
    }
    for (var k = 0; k < tableRows.length; k += 1) setHidden(tableRows[k].el, k >= n);
  }

  function renderTable(range) {
    var src = tableSource(range);
    ensureRows(src.length);
    var list = catalogue();
    for (var i = 0; i < src.length; i += 1) {
      var row = tableRows[i];
      setText(row.time, pointTime(range, src[i].t));
      for (var j = 0; j < list.length; j += 1) {
        var id = list[j].id;
        var text = valueText(id, src[i][id]);
        setText(row.cells[id], text);
        // "Brak wartości: ——— w --ms3-ink-3, nigdy pusta komórka" (5.12)
        var empty = text === noValue();
        if (row.cells[id].classList) {
          if (empty) row.cells[id].classList.add('ms3-empty');
          else row.cells[id].classList.remove('ms3-empty');
        }
      }
    }
    setHidden(el.tableWrap, src.length === 0);
  }

  /* ------------------------------------------------------------------
     Session statistics (6.6)
     ------------------------------------------------------------------ */

  function renderSession() {
    var s = global.Engine.session();
    if (!s) { setHidden(el.session, true); return; }
    setHidden(el.session, false);
    setText(el.counter, global.Scale.duration(s.durationMs));

    var total = s.zones.good + s.zones.warning + s.zones.critical;
    for (var i = 0; i < ZONE_ORDER.length; i += 1) {
      var zone = ZONE_ORDER[i];
      var row = zoneRows[zone];
      if (!row) continue;
      var pct = total ? Math.round((s.zones[zone] / total) * 100) : 0;
      setText(row.pct, pct + '%');
      // Not the 5 Hz loop: the session bars move once a second at most.
      var width = pct + '%';
      if (row.bar.style.width !== width) row.bar.style.width = width;
    }
  }

  /* ------------------------------------------------------------------
     Empty states (8.6)
     ------------------------------------------------------------------ */

  function renderEmpty(range) {
    var nothingAnywhere = global.Engine.historyCount() === 0 && points.length === 0;
    var emptyRange = items.length === 0;
    var text = '';
    if (nothingAnywhere) text = T(['empty.recorderNoHistory']);
    else if (emptyRange) text = T(['empty.recorderNoRange']);
    setText(el.empty, text);
    setHidden(el.empty, !text);
    setHidden(el.coverage, range.form !== 'bars' || emptyRange);
  }

  /* ------------------------------------------------------------------
     The one refresh path
     ------------------------------------------------------------------ */

  function isVisible() {
    if (!root) return false;
    var node = root;
    while (node && node !== doc.body) {
      if (node.hidden) return false;
      node = node.parentNode;
    }
    return !!node;
  }

  function refresh() {
    if (!built) return;
    if (!isVisible()) return;
    if (doc.visibilityState === 'hidden') return;   // 6.7.4 — nothing is drawn for a hidden tab

    thresholds = global.Engine.getThresholds();
    var saved = (global.UI3 && typeof global.UI3.leadChannel === 'function') ? global.UI3.leadChannel() : null;
    if (saved && metric(saved)) leadId = saved;
    setText(el.leadName, leadName());

    // A paid channel promoted to lead (a stale setting; the strip itself never
    // switches to one) must not leak its numbers into a chart. The tape goes
    // away and the sentence says why — the same one the well shows.
    if (isLocked(metric(leadId))) {
      points = []; series = []; buckets = []; items = []; geom = null;
      setHidden(el.strip, true);
      setHidden(el.nav, true);
      setHidden(el.crossList, true);
      setHidden(el.tableWrap, true);
      setText(el.empty, T(['verdict.premium']));
      setHidden(el.empty, false);
      renderSession();
      return;
    }
    setHidden(el.strip, false);

    var range = currentRange();
    var lineForm = range.form === 'line';
    setHidden(el.canvas, !lineForm);
    setHidden(el.bars, lineForm);
    setAttr(el.tape, 'data-form', range.form);

    var width = 0;
    if (lineForm && el.canvas) width = Math.round(el.canvas.getBoundingClientRect().width);
    points = collect(range, width);

    if (lineForm) {
      drawTape(range);
      // A canvas too narrow to draw still has role="img" and still needs a name.
      if (!geom) {
        setAttr(el.canvas, 'aria-label', joinParts([rangeWord(), leadName(), statsText(statsOf(points))]));
      }
    } else {
      series = [];
      geom = null;
      renderBars(range);
    }

    syncCross(range);
    renderTable(range);
    renderSession();
    renderEmpty(range);
  }

  function scheduleResize() {
    if (resizeTimer) global.clearTimeout(resizeTimer);
    resizeTimer = global.setTimeout(function () {
      resizeTimer = null;
      refresh();
    }, RESIZE_MS);
  }

  /* One timer, one second, no requestAnimationFrame anywhere (6.7.1). It also
     catches the module being reopened, which the shell does not announce. */
  function tick() {
    var visible = isVisible() && doc.visibilityState !== 'hidden';
    if (visible && !wasVisible) { wasVisible = true; refresh(); return; }
    wasVisible = visible;
    if (!visible) return;
    if (global.Engine.isRunning()) refresh();
  }

  /* ------------------------------------------------------------------
     Building the screen (once, on the first open, already visible)
     ------------------------------------------------------------------ */

  function buildRangeSwitch(parent) {
    var group = put(parent, make('div', 'ms3-segments'));
    group.setAttribute('role', 'group');
    setAttr(group, 'aria-label', T(['recorder.rangeAria']));
    el.segments = [];
    for (var i = 0; i < RANGES.length; i += 1) {
      var btn = put(group, make('button', 'ms3-segments__item'));
      btn.type = 'button';
      btn.textContent = T(['recorder.ranges.' + RANGES[i].key]);
      btn.setAttribute('data-range', RANGES[i].key);
      btn.setAttribute('aria-pressed', RANGES[i].key === rangeKey ? 'true' : 'false');
      btn.onclick = onRangeClick;
      el.segments.push(btn);
    }
    return group;
  }

  function onRangeClick(ev) {
    var key = ev.currentTarget.getAttribute('data-range');
    if (!key || key === rangeKey) return;
    rangeKey = key;
    crossAtEnd = true;
    crossIndex = 0;
    barNodes = [];
    clear(el.bars);
    if (global.UI3 && typeof global.UI3.setSetting === 'function') global.UI3.setSetting('lastRange', key);
    for (var i = 0; i < el.segments.length; i += 1) {
      var on = el.segments[i].getAttribute('data-range') === key;
      setAttr(el.segments[i], 'aria-pressed', on ? 'true' : 'false');
      // 5.13: the active segment is scrolled into view when the switch scrolls.
      if (on && el.segments[i].scrollIntoView) {
        try {
          el.segments[i].scrollIntoView(reducedMotion()
            ? { block: 'nearest', inline: 'nearest' }
            : { behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        } catch (err) { /* an older browser simply does not scroll */ }
      }
    }
    refresh();
  }

  function buildTape(parent) {
    var head = put(parent, make('div', 'ms3-rec__head'));
    var legend = put(head, make('span', 'ms3-legend'));
    legend.textContent = T(['readout.legend']);
    el.leadName = put(head, make('span', 'ms3-rec__lead'));

    // The chip sits ABOVE the tape, not inside it: the tape clips its own
    // overflow so the 48 px crosshair grip cannot push the page sideways, and a
    // clipped time chip would be worse than no chip. Both read --ms3-pos from
    // this shared wrapper.
    el.strip = put(parent, make('div', 'ms3-rec__strip'));

    var chipRow = put(el.strip, make('div', 'ms3-rec__chiprow'));
    el.chip = put(chipRow, make('span', 'ms3-rec__chip'));
    el.chip.setAttribute('aria-hidden', 'true');

    el.tape = put(el.strip, make('div', 'ms3-rec__tape'));

    el.canvas = put(el.tape, make('canvas', 'ms3-rec__canvas'));
    el.canvas.setAttribute('role', 'img');

    el.bars = put(el.tape, make('div', 'ms3-bars'));
    el.bars.setAttribute('role', 'img');
    el.bars.hidden = true;

    el.cross = put(el.tape, make('button', 'ms3-rec__cross'));
    el.cross.type = 'button';
    el.cross.setAttribute('role', 'slider');
    el.cross.setAttribute('aria-orientation', 'horizontal');
    setAttr(el.cross, 'aria-label', T(['recorder.crosshair']));
    put(el.cross, make('span', 'ms3-rec__crossline'));
    el.cross.onkeydown = onCrossKey;

    el.coverage = put(el.strip, make('p', 'ms3-bars__caption'));
    el.empty = put(parent, make('p', 'ms3-empty'));

    bindDrag();
  }

  function buildNav(parent) {
    el.nav = put(parent, make('div', 'ms3-rec__nav'));

    el.prev = put(el.nav, make('button', 'ms3-key ms3-key--square'));
    el.prev.type = 'button';
    setAttr(el.prev, 'aria-label', T(['recorder.prevAria']));
    var prevLabel = put(el.prev, make('span', 'ms3-key__label'));
    prevLabel.textContent = '‹';
    el.prev.onclick = function () { moveCross(-1); };

    el.navTime = put(el.nav, make('span', 'ms3-rec__navtime'));

    el.next = put(el.nav, make('button', 'ms3-key ms3-key--square'));
    el.next.type = 'button';
    setAttr(el.next, 'aria-label', T(['recorder.nextAria']));
    var nextLabel = put(el.next, make('span', 'ms3-key__label'));
    nextLabel.textContent = '›';
    el.next.onclick = function () { moveCross(1); };
  }

  function buildCrossList(parent) {
    el.crossList = put(parent, make('div', 'ms3-rec__cross-list'));
    el.crossCells = {};
    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      var row = put(el.crossList, make('div', 'ms3-rec__cross-row'));
      var name = put(row, make('span', 'ms3-rec__cross-name'));
      name.textContent = list[i].namePL;
      var value = put(row, make('span', 'ms3-rec__cross-value ms3-num'));
      var unit = put(row, make('span', 'ms3-rec__cross-unit'));
      el.crossCells[list[i].id] = { value: value, unit: unit };
    }
  }

  function buildTable(parent) {
    el.tableWrap = put(parent, make('div', 'ms3-tablewrap'));
    var table = put(el.tableWrap, make('table', 'ms3-table'));
    var caption = put(table, make('caption', 'ms3-sr'));
    caption.textContent = T(['recorder.tableCaption']);
    var thead = put(table, make('thead'));
    var tr = put(thead, make('tr'));
    var th = put(tr, make('th'));
    th.scope = 'col';
    th.textContent = T(['recorder.colTime']);
    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      var cell = put(tr, make('th'));
      cell.scope = 'col';
      cell.textContent = list[i].namePL;
    }
    el.tbody = put(table, make('tbody'));
  }

  function buildSession(parent) {
    el.session = put(parent, make('section', 'ms3-screen__section'));
    var title = put(el.session, make('h2'));
    title.textContent = T(['recorder.sessionTitle']);

    var stats = put(el.session, make('div', 'ms3-stats'));
    var stat = put(stats, make('div', 'ms3-stat'));
    var label = put(stat, make('span', 'ms3-stat__label'));
    label.textContent = T(['state.running']);
    el.counter = put(stat, make('span', 'ms3-stat__value'));
    el.counter.textContent = global.Scale.duration(0);

    var rows = put(el.session, make('div', 'ms3-rec__zones'));
    zoneRows = {};
    for (var i = 0; i < ZONE_ORDER.length; i += 1) {
      var zone = ZONE_ORDER[i];
      var row = put(rows, make('div', 'ms3-rec__zone'));
      var stamp = global.Scale.stamp(zone);
      var shape = put(row, make('span', stamp.shapeClass + ' ms3-shape--sm'));
      shape.setAttribute('aria-hidden', 'true');
      var word = put(row, make('span', 'ms3-rec__zone-word'));
      word.textContent = stamp.wordPL;
      var track = put(row, make('span', 'ms3-rec__zone-track'));
      var bar = put(track, make('span', 'ms3-stat__bar' + (zone === 'good' ? '' : ' ms3-stat__bar--' + zone)));
      var pct = put(row, make('span', 'ms3-rec__zone-pct ms3-num'));
      pct.textContent = '0%';
      zoneRows[zone] = { bar: bar, pct: pct };
    }

    var caption = put(el.session, make('p', 'ms3-bars__caption'));
    caption.textContent = T(['recorder.zonesCaption']);
    el.session.hidden = true;
  }

  function build(host) {
    root = host;
    el = {};

    var saved = (global.UI3 && typeof global.UI3.getSetting === 'function')
      ? global.UI3.getSetting('lastRange') : null;
    for (var i = 0; i < RANGES.length; i += 1) if (RANGES[i].key === saved) rangeKey = saved;

    buildRangeSwitch(host);
    buildTape(host);
    buildNav(host);
    buildCrossList(host);
    buildTable(host);
    buildSession(host);

    built = true;
    wasVisible = true;
    refresh();

    if (tickTimer) global.clearInterval(tickTimer);
    tickTimer = global.setInterval(tick, TICK_MS);
  }

  /* ------------------------------------------------------------------
     Input: drag on the tape, arrows on the crosshair
     ------------------------------------------------------------------ */

  function localX(ev) {
    var rect = el.tape.getBoundingClientRect();
    var clientX = ev.clientX;
    if (clientX === undefined && ev.touches && ev.touches.length) clientX = ev.touches[0].clientX;
    if (clientX === undefined) return null;
    return clientX - rect.left;
  }

  function startDrag(ev) {
    if (!items.length) return false;
    var x = localX(ev);
    if (x === null) return false;
    // 6.3: 24 px on the left belong to the system "back" gesture, never to us.
    if (x < DEAD_ZONE_PX) return false;
    dragging = true;
    pickAtX(x);
    return true;
  }

  function moveDrag(ev) {
    if (!dragging) return;
    var x = localX(ev);
    if (x === null) return;
    pickAtX(x);
  }

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    if (items.length) renderCross(currentRange(), true);   // final value, announced at once
  }

  function bindDrag() {
    var tape = el.tape;
    if (global.PointerEvent) {
      tape.addEventListener('pointerdown', function (ev) {
        if (!startDrag(ev)) return;
        if (tape.setPointerCapture && ev.pointerId !== undefined) {
          try { tape.setPointerCapture(ev.pointerId); } catch (err) { /* not fatal */ }
        }
        ev.preventDefault();
      });
      tape.addEventListener('pointermove', function (ev) {
        if (!dragging) return;
        moveDrag(ev);
        ev.preventDefault();
      });
      tape.addEventListener('pointerup', endDrag);
      tape.addEventListener('pointercancel', endDrag);
      return;
    }
    tape.addEventListener('touchstart', function (ev) {
      if (startDrag(ev)) ev.preventDefault();
    });
    tape.addEventListener('touchmove', function (ev) {
      if (!dragging) return;
      moveDrag(ev);
      ev.preventDefault();
    });
    tape.addEventListener('touchend', endDrag);
    tape.addEventListener('touchcancel', endDrag);
    tape.addEventListener('mousedown', function (ev) { startDrag(ev); });
    tape.addEventListener('mousemove', moveDrag);
    doc.addEventListener('mouseup', endDrag);
  }

  function onCrossKey(ev) {
    var k = ev.key;
    var step = 0;
    if (k === 'ArrowLeft' || k === 'Left') step = -1;
    else if (k === 'ArrowRight' || k === 'Right') step = 1;
    else if (k === 'ArrowDown' || k === 'Down') step = -1;
    else if (k === 'ArrowUp' || k === 'Up') step = 1;
    else if (k === 'PageDown') step = -10;
    else if (k === 'PageUp') step = 10;
    else if (k === 'Home') { ev.preventDefault(); setCross(0); return; }
    else if (k === 'End') { ev.preventDefault(); setCross(items.length - 1); return; }
    if (!step) return;
    ev.preventDefault();
    moveCross(step);
  }

  /* ------------------------------------------------------------------
     Start-up
     ------------------------------------------------------------------ */

  function init() {
    if (!global.Metrics || !global.Scale || !global.Engine || !global.UI3 || !global.Bus) return;

    global.UI3.registerModule({
      no: MODULE_NO,
      titlePL: T(['modules.' + MODULE_NO + '.titlePL']),
      descPL: T(['modules.' + MODULE_NO + '.descPL']),
      build: build
    });

    // Every repaint trigger from 6.3, and not one more.
    global.Bus.on('engine:history', refresh);
    global.Bus.on('engine:thresholds', refresh);
    global.Bus.on('engine:started', refresh);
    global.Bus.on('engine:stopped', refresh);
    global.Bus.on('ui3:theme', refresh);      // canvas colours do not follow the theme by themselves
    global.Bus.on('ui3:lead', refresh);
    global.Bus.on('offer:changed', refresh);  // an unlocked channel changes the print-out

    global.addEventListener('resize', scheduleResize);
    global.addEventListener('orientationchange', scheduleResize);
    doc.addEventListener('visibilitychange', function () {
      if (doc.visibilityState === 'visible') refresh();
    });
  }

  if (global.UI3 && typeof global.UI3.ready === 'function') global.UI3.ready(init);
  else if (global.Bus) global.Bus.once('app:ready', init);

}(window));
