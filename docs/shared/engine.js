/* docs/shared/engine.js — kod wspólny wersji v2–v4.
 *
 * SKĄD: kod przeniesiony BEZ ZMIAN z docs/v3/engine.js. docs/v4/engine.js był
 * bajtowo identyczny, a docs/v2/engine.js różnił się wyłącznie trzema blokami
 * komentarza — ani jedną linią kodu. Te trzy bloki wzięto tutaj w redakcji v2,
 * bo jej komentarze są najnowsze — tak samo jak w metrics.js, gdzie z tego
 * samego powodu wybrano redakcję v4.
 *
 * KTO ŁADUJE: v2, v3 i v4 — plik jest wpięty w index.html i wymieniony
 * w APP_SHELL każdej z tych trzech wersji.
 *
 * CO WYSTAWIA: globalne `window.Engine` — cykl życia kamery, próbkowanie
 * 5 Hz, bufory pomiarów, progi i kalibrację. Wymaga, żeby wcześniej były już
 * załadowane `window.Metrics` (matematyka) i `window.Bus` (zdarzenia) —
 * dotyczy to także v2, która ładuje wspólny bus.js przed tym plikiem; zapasowa
 * magistrala z v2/ui-core.js zakłada się tylko wtedy, gdy `window.Bus` nie
 * istnieje.
 *
 * CZEGO TU NIE WOLNO: sięgać do DOM, do układu ekranu konkretnej wersji ani
 * do żadnego ekranu z osobna; liczyć czegokolwiek na pikselach — to robota
 * metrics.js; dopisywać napisów widocznych dla użytkownika ponad te, które
 * już tu są. Zmiana w tym pliku dotyka trzech wersji naraz.
 */
/* Monitor Światła v2 — silnik pomiaru (P2).
 *
 * Camera lifecycle, 5 Hz sampling, all seven metrics, the live buffer, the
 * 30-day buffer, thresholds and calibration. Nothing else.
 *
 * Two rules govern this file and neither has an exception:
 *
 *  1. Measurement is sacred. This module knows nothing about the interface and
 *     checks no permissions, because there are none: nothing in this
 *     application is conditional on anything. Delete every other file in
 *     docs/v2/ except metrics.js and this engine still starts a camera and
 *     produces readings.
 *
 *  2. All seven metrics are computed on every sample, for everybody, and all
 *     seven are handed to whoever asks. This file makes no distinction between
 *     one reading and another, and no caller can ask it for a subset.
 *
 * Honesty, repeated here because it belongs next to the code that samples
 * pixels: a phone camera has three broad channels and an auto-adjusting white
 * balance. It does not measure a spectrum. Colour temperature and melanopic
 * ratio are labelled approximations; flicker, blue share, brightness and
 * uniformity are ratios the sensor genuinely sees. None of it is a photometric
 * instrument reading and none of it is a medical result.
 *
 * All arithmetic on pixel values lives in metrics.js. This file gathers
 * numbers, hands them to Metrics, and stores what comes back. If a formula
 * appears here that is a bug.
 */
(function (global) {
  'use strict';

  var Metrics = global.Metrics;
  if (!Metrics) {
    // Script order is part of the architecture contract: metrics.js first.
    // Refusing to define a half-working Engine is better than reporting zeros.
    if (global.console && console.error) {
      console.error('engine.js: brak metrics.js — sprawdź kolejność skryptów w index.html');
    }
    return;
  }

  var Engine = {};

  /* ------------------------------------------------------------------
     Constants — the sampling contract
     ------------------------------------------------------------------ */

  var SAMPLE_MS = 200;            // 5 Hz; light enough for budget phones
  var SAMPLE_HZ = 1000 / SAMPLE_MS;
  var SAMPLE_SIZE = 64;           // offscreen sampling canvas side, px
  var CROP_FRACTION = 0.6;        // sample the centre 60% of the frame
  var GRID = 3;                   // 3x3 cells feed Metrics.uniformity
  var CELLS = GRID * GRID;

  // Flicker needs a window, not a sample. 40 samples at 5 Hz is 8 seconds —
  // long enough for a stable min/max, short enough to still describe "now".
  var FLICKER_WINDOW = 40;

  var LIVE_WINDOW_MS = 60000;     // live buffer: what the 1-minute chart reads
  var LIVE_MARGIN_MS = 5000;      // keep a little past the window so trimming is lazy

  // Long buffer. This is what the Historia screen, the chart and the reports
  // read back, so it is collected continuously and for everybody: 30 days at
  // one point per 5 s, trimmed by age and by count.
  var LONG_STEP_MS = 5000;        // 1 point / 5 s
  var LONG_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;
  var HISTORY_MAX = 15000;        // ~21 h of continuous measurement, or 30 days of use
  var HISTORY_FLUSH_EVERY = 64;   // batch writes; the 5 Hz path never touches storage

  // Anything below this is a duration, not an epoch stamp: 1e12 ms is the year
  // 2001. Callers that pass a range ("last hour") instead of an absolute stamp
  // therefore still get what they meant, which is worth more here than purity.
  var STAMP_FLOOR = 1e12;

  var STORE_HISTORY = 'ms2.history.v1';
  var STORE_THRESHOLDS = 'ms2.thresholds.v1';
  var STORE_SESSION = 'ms2.session.v1';
  var STORE_CALIBRATION = 'ms2.calibration.v1';

  var ZONE_CODES = ['good', 'warning', 'critical'];

  // Metric ids, in catalogue order. Derived, never re-typed: a metric added to
  // Metrics.CATALOGUE is measured and stored here without touching this file.
  var IDS = [];
  for (var ci = 0; ci < Metrics.CATALOGUE.length; ci += 1) IDS.push(Metrics.CATALOGUE[ci].id);

  // The leading metric, as in v1: it is the one whose zone colours a history row.
  var LEAD_ID = 'share';

  // Storage precision per metric. Rounding before JSON.stringify is what keeps
  // 15 000 records under a megabyte; the extra digit over the displayed
  // precision means a stored point never rounds worse than what was shown.
  var STORE_DECIMALS = {
    share: 1, brightness: 1, kelvin: 0, melanopic: 3,
    flicker: 2, uniformity: 1, comfort: 0
  };

  Engine.SAMPLE_MS = SAMPLE_MS;
  // Exposed so viz.js can draw the reticle over exactly the region that is
  // sampled. Two hardcoded 0.6 values in two files would drift apart.
  Engine.CROP_FRACTION = CROP_FRACTION;
  Engine.SAMPLE_SIZE = SAMPLE_SIZE;
  Engine.GRID = GRID;
  Engine.FLICKER_WINDOW = FLICKER_WINDOW;

  /* ------------------------------------------------------------------
     Bus and storage — both treated as things that can fail
     ------------------------------------------------------------------ */

  // The bus is P1's. If it is missing, or a listener throws, the measurement
  // loop still has to finish its sample. Emitting is never load-bearing here.
  function emit(name, data) {
    try {
      if (global.Bus && typeof global.Bus.emit === 'function') global.Bus.emit(name, data);
    } catch (_) { /* a broken listener cannot break the sampler */ }
  }

  // Private browsing throws on EVERY localStorage access, reads included, not
  // only on write. One try/catch per access is the only shape that survives it;
  // the app then runs entirely from memory and simply forgets on reload.
  function readStore(key) {
    try {
      var raw = global.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (_) { return null; }
  }

  function writeStore(key, value) {
    try {
      global.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_) { return false; }
  }

  function removeStore(key) {
    try { global.localStorage.removeItem(key); } catch (_) { /* nothing to do */ }
  }

  function num(v) {
    return typeof v === 'number' && isFinite(v) ? v : null;
  }

  function round(value, decimals) {
    if (value === null) return null;
    var f = Math.pow(10, decimals);
    return Math.round(value * f) / f;
  }

  /* ------------------------------------------------------------------
     Linearisation lookup table
     ------------------------------------------------------------------ */

  // Metrics.toLinear does a pow() per channel. Per-cell luminance needs it for
  // 4096 pixels x 3 channels, five times a second; a 256-entry table turns that
  // into an array read. The values come from Metrics, so this is a cache of the
  // single source of truth, not a second implementation of it.
  var LIN = new Array(256);
  for (var li = 0; li < 256; li += 1) LIN[li] = Metrics.toLinear(li);

  /* ------------------------------------------------------------------
     Thresholds
     ------------------------------------------------------------------ */

  function defaultThresholds() {
    var out = {};
    for (var i = 0; i < Metrics.CATALOGUE.length; i += 1) {
      var m = Metrics.CATALOGUE[i];
      out[m.id] = { warn: m.warn, crit: m.crit };
    }
    return out;
  }

  function cloneThresholds(src) {
    var out = {};
    for (var id in src) {
      if (Object.prototype.hasOwnProperty.call(src, id)) {
        out[id] = { warn: src[id].warn, crit: src[id].crit };
      }
    }
    return out;
  }

  function loadThresholds() {
    var base = defaultThresholds();
    var saved = readStore(STORE_THRESHOLDS);
    if (!saved || typeof saved !== 'object') return base;
    for (var i = 0; i < IDS.length; i += 1) {
      var id = IDS[i];
      var entry = saved[id];
      if (!entry) continue;
      var warn = num(entry.warn);
      var crit = num(entry.crit);
      // A stored value that no longer validates is dropped back to the default
      // rather than repaired: a half-repaired threshold silently changes what
      // "critical" means for someone who tuned it deliberately.
      if (warn !== null && crit !== null && validPair(id, warn, crit)) {
        base[id] = { warn: warn, crit: crit };
      }
    }
    return base;
  }

  function validPair(id, warn, crit) {
    var m = Metrics.byId(id);
    if (!m) return false;
    if (warn < m.min || warn > m.max || crit < m.min || crit > m.max) return false;
    // For inverted metrics (higher is better) the warning threshold sits ABOVE
    // the critical one. Equal values are rejected: a zone of zero width is
    // almost certainly a slip of the slider, not an intention.
    return m.invert ? warn > crit : warn < crit;
  }

  var thresholds = loadThresholds();

  Engine.defaultThresholds = defaultThresholds;

  Engine.getThresholds = function () {
    return cloneThresholds(thresholds);
  };

  // `source` is not part of the published signature; it exists so Tools can say
  // "this came from a profile" when it applies one. Callers that omit it get
  // 'user', which is what a slider drag is.
  Engine.setThresholds = function (map, source) {
    if (!map || typeof map !== 'object') return false;
    var next = cloneThresholds(thresholds);
    var touched = false;

    for (var id in map) {
      if (!Object.prototype.hasOwnProperty.call(map, id)) continue;
      var m = Metrics.byId(id);
      if (!m) return false;
      var entry = map[id];
      if (!entry || typeof entry !== 'object') return false;
      // A partial entry merges over the current value, so setting only `warn`
      // is legal and the untouched half keeps working.
      var warn = entry.warn === undefined ? next[id].warn : num(entry.warn);
      var crit = entry.crit === undefined ? next[id].crit : num(entry.crit);
      if (warn === null || crit === null) return false;
      if (!validPair(id, warn, crit)) return false;
      next[id] = { warn: warn, crit: crit };
      touched = true;
    }

    if (!touched) return false;

    // All or nothing. A partially applied profile is a state nobody asked for.
    thresholds = next;
    writeStore(STORE_THRESHOLDS, thresholds);
    rezoneLive();
    emit('engine:thresholds', {
      thresholds: cloneThresholds(thresholds),
      source: source === 'profile' || source === 'schedule' || source === 'reset' ? source : 'user'
    });
    return true;
  };

  Engine.resetThresholds = function () {
    thresholds = defaultThresholds();
    writeStore(STORE_THRESHOLDS, thresholds);
    rezoneLive();
    emit('engine:thresholds', { thresholds: cloneThresholds(thresholds), source: 'reset' });
  };

  function zoneOf(id, value) {
    var m = Metrics.byId(id);
    if (!m) return null;
    var t = thresholds[id] || { warn: m.warn, crit: m.crit };
    return Metrics.zoneFor(value, t.warn, t.crit, m.invert);
  }

  // Moving a threshold has to recolour what is already on screen, otherwise the
  // last reading keeps the zone it had under the old rule until the next sample
  // — a two-hundred-millisecond lie, but a lie the user can see.
  function rezoneLive() {
    for (var i = 0; i < live.length; i += 1) {
      var reading = live[i];
      for (var j = 0; j < IDS.length; j += 1) {
        reading.zones[IDS[j]] = zoneOf(IDS[j], reading.values[IDS[j]]);
      }
    }
  }

  /* ------------------------------------------------------------------
     Calibration
     ------------------------------------------------------------------ */

  // White-card calibration removes a fixed per-channel bias of the sensor. It
  // genuinely improves kelvin and melanopic, which are the two most approximate
  // numbers here; it cannot turn a camera into a spectrometer. Gains are
  // clamped hard, because a gain of 40 would produce confident nonsense.
  var GAIN_MIN = 0.25;
  var GAIN_MAX = 4;

  function loadCalibration() {
    var saved = readStore(STORE_CALIBRATION);
    if (!saved) return null;
    var r = num(saved.gainR), g = num(saved.gainG), b = num(saved.gainB);
    if (r === null || g === null || b === null) return null;
    if (r < GAIN_MIN || r > GAIN_MAX || g < GAIN_MIN || g > GAIN_MAX || b < GAIN_MIN || b > GAIN_MAX) return null;
    return { gainR: r, gainG: g, gainB: b, at: num(saved.at) || Date.now() };
  }

  var calibration = loadCalibration();

  Engine.getCalibration = function () {
    return calibration ? { gainR: calibration.gainR, gainG: calibration.gainG, gainB: calibration.gainB, at: calibration.at } : null;
  };

  Engine.setCalibration = function (cal) {
    if (cal === null || cal === undefined) {
      calibration = null;
      removeStore(STORE_CALIBRATION);
      emit('engine:calibration', { calibration: null });
      return true;
    }
    var r = num(cal.gainR), g = num(cal.gainG), b = num(cal.gainB);
    if (r === null || g === null || b === null) return false;
    if (r < GAIN_MIN || r > GAIN_MAX || g < GAIN_MIN || g > GAIN_MAX || b < GAIN_MIN || b > GAIN_MAX) return false;
    calibration = { gainR: r, gainG: g, gainB: b, at: num(cal.at) || Date.now() };
    writeStore(STORE_CALIBRATION, calibration);
    emit('engine:calibration', { calibration: Engine.getCalibration() });
    return true;
  };

  /* ------------------------------------------------------------------
     History — long buffer
     ------------------------------------------------------------------ */

  // Storage form is an array per point, in this exact column order. Objects
  // would cost roughly three times the bytes for the same 15 000 records.
  var COLUMNS = ['share', 'brightness', 'kelvin', 'melanopic', 'flicker', 'uniformity', 'comfort'];

  function encodePoint(p) {
    var row = [p.t];
    for (var i = 0; i < COLUMNS.length; i += 1) {
      var id = COLUMNS[i];
      row.push(round(num(p[id]), STORE_DECIMALS[id] === undefined ? 2 : STORE_DECIMALS[id]));
    }
    row.push(ZONE_CODES.indexOf(p.zone));
    return row;
  }

  function decodePoint(row) {
    if (!row || row.length < COLUMNS.length + 2) return null;
    var t = num(row[0]);
    if (t === null) return null;
    var p = { t: t };
    for (var i = 0; i < COLUMNS.length; i += 1) p[COLUMNS[i]] = num(row[i + 1]);
    var zone = ZONE_CODES[row[COLUMNS.length + 1]];
    p.zone = zone || null;
    return p;
  }

  var historyLong = [];
  var historyDirty = false;
  var historyPushes = 0;
  var lastLongAt = 0;
  // Set once a write has failed even after shedding data. Automatic batch
  // writes then stop hammering a storage that refuses us, but an explicit
  // Engine.flush() still tries — the user may have freed space since.
  var storageRefused = false;

  function loadHistory() {
    var saved = readStore(STORE_HISTORY);
    if (!saved || !saved.points || !saved.points.length) return [];
    var now = Date.now();
    var cutoff = now - LONG_WINDOW_MS;
    var out = [];
    for (var i = 0; i < saved.points.length; i += 1) {
      var p = decodePoint(saved.points[i]);
      // A clock that jumped backwards would otherwise leave points dated in the
      // future that no range query can ever reach again.
      if (p && p.t >= cutoff && p.t <= now + 60000) out.push(p);
    }
    out.sort(function (a, b) { return a.t - b.t; });
    return out.slice(-HISTORY_MAX);
  }

  function trimHistory() {
    var cutoff = Date.now() - LONG_WINDOW_MS;
    var first = 0;
    while (first < historyLong.length && historyLong[first].t < cutoff) first += 1;
    if (first > 0) historyLong = historyLong.slice(first);
    if (historyLong.length > HISTORY_MAX) historyLong = historyLong.slice(-HISTORY_MAX);
  }

  function persistHistory() {
    var rows = new Array(historyLong.length);
    for (var i = 0; i < historyLong.length; i += 1) rows[i] = encodePoint(historyLong[i]);
    if (writeStore(STORE_HISTORY, { v: 1, points: rows })) {
      historyDirty = false;
      storageRefused = false;
      return true;
    }
    // Quota exceeded. Shed the oldest half and try once more: keeping recent
    // history is worth more than keeping all of it, and losing everything
    // silently is the worst of the three outcomes.
    // Math.floor(1/2) is 0 and slice(-0) is slice(0) — the "shed half" retry
    // used to hand back the identical array and fail identically. Below four
    // points there is nothing left to shed.
    if (historyLong.length < 4) { storageRefused = true; return false; }
    historyLong = historyLong.slice(historyLong.length - Math.floor(historyLong.length / 2));
    rows = new Array(historyLong.length);
    for (var j = 0; j < historyLong.length; j += 1) rows[j] = encodePoint(historyLong[j]);
    if (writeStore(STORE_HISTORY, { v: 1, points: rows })) {
      historyDirty = false;
      storageRefused = false;
      return true;
    }
    // Storage is unavailable, not merely full (private mode, blocked cookies).
    // The buffer keeps working from memory for the rest of this visit.
    storageRefused = true;
    return false;
  }

  historyLong = loadHistory();
  lastLongAt = historyLong.length ? historyLong[historyLong.length - 1].t : 0;

  Engine.historyRangeMs = function () { return LONG_WINDOW_MS; };

  Engine.historyCount = function () { return historyLong.length; };

  Engine.history = function (opts) {
    var o = opts || {};
    var now = Date.now();
    var until = num(o.untilMs);
    if (until === null) until = now;
    var since = num(o.sinceMs);
    if (since === null) since = now - LONG_WINDOW_MS;
    else if (since < STAMP_FLOOR) since = now - since;   // a duration, see STAMP_FLOOR
    if (until < STAMP_FLOOR) until = now - until;
    if (since > until) { var swap = since; since = until; until = swap; }

    var out = [];
    for (var i = 0; i < historyLong.length; i += 1) {
      var p = historyLong[i];
      if (p.t < since) continue;
      if (p.t > until) break;                            // buffer is sorted ascending
      out.push(p);
    }

    var maxPoints = num(o.maxPoints);
    if (maxPoints !== null && maxPoints >= 2 && out.length > maxPoints) {
      var cap = Math.floor(maxPoints);
      var step = out.length / cap;
      var thinned = new Array(cap);
      for (var k = 0; k < cap; k += 1) thinned[k] = out[Math.floor(k * step)];
      // The newest point always survives thinning; a chart whose right edge is
      // eight seconds stale looks like a stalled measurement.
      thinned[cap - 1] = out[out.length - 1];
      out = thinned;
    }

    // Copies, so a caller sorting or annotating the result cannot corrupt the
    // buffer the sampler is appending to.
    var copy = new Array(out.length);
    for (var n = 0; n < out.length; n += 1) {
      var src = out[n];
      copy[n] = {
        t: src.t, share: src.share, brightness: src.brightness, kelvin: src.kelvin,
        melanopic: src.melanopic, flicker: src.flicker, uniformity: src.uniformity,
        comfort: src.comfort, zone: src.zone
      };
    }
    return copy;
  };

  Engine.clearHistory = function () {
    historyLong = [];
    historyDirty = false;
    historyPushes = 0;
    lastLongAt = 0;
    storageRefused = false;
    removeStore(STORE_HISTORY);
    emit('engine:history', { reason: 'cleared' });
  };

  Engine.flush = function () {
    if (!historyDirty) return;
    if (persistHistory()) emit('engine:history', { reason: 'flushed' });
  };

  /* ------------------------------------------------------------------
     Session bookkeeping
     ------------------------------------------------------------------ */

  var sessionState = null;   // live accumulator, null when not measuring
  var lastSession = readStore(STORE_SESSION);

  function newSessionState(startedAt, facing) {
    var acc = {};
    for (var i = 0; i < IDS.length; i += 1) {
      acc[IDS[i]] = { sum: 0, n: 0, min: Infinity, max: -Infinity };
    }
    return {
      startedAt: startedAt,
      samples: 0,
      zones: { good: 0, warning: 0, critical: 0 },
      acc: acc,
      facingMode: facing,
      calibrated: !!calibration
    };
  }

  function accumulate(reading) {
    if (!sessionState) return;
    sessionState.samples += 1;
    var lead = reading.zones[LEAD_ID];
    if (lead && sessionState.zones[lead] !== undefined) sessionState.zones[lead] += 1;
    for (var i = 0; i < IDS.length; i += 1) {
      var v = num(reading.values[IDS[i]]);
      if (v === null) continue;                 // an unmeasured metric skews no average
      var a = sessionState.acc[IDS[i]];
      a.sum += v; a.n += 1;
      if (v < a.min) a.min = v;
      if (v > a.max) a.max = v;
    }
  }

  function buildSession(endedAt) {
    if (!sessionState) return null;
    var avg = {}, min = {}, max = {};
    for (var i = 0; i < IDS.length; i += 1) {
      var a = sessionState.acc[IDS[i]];
      avg[IDS[i]] = a.n ? a.sum / a.n : null;
      min[IDS[i]] = a.n ? a.min : null;
      max[IDS[i]] = a.n ? a.max : null;
    }
    var end = endedAt === null ? null : endedAt;
    return {
      startedAt: sessionState.startedAt,
      endedAt: end,
      durationMs: (end === null ? Date.now() : end) - sessionState.startedAt,
      samples: sessionState.samples,
      zones: {
        good: sessionState.zones.good,
        warning: sessionState.zones.warning,
        critical: sessionState.zones.critical
      },
      avg: avg, min: min, max: max,
      facingMode: sessionState.facingMode,
      calibrated: sessionState.calibrated
    };
  }

  Engine.session = function () {
    // While measuring, the live session; afterwards, the last finished one, so
    // the summary card survives a reload and a tab switch.
    return sessionState ? buildSession(null) : (lastSession || null);
  };

  /* ------------------------------------------------------------------
     Camera state
     ------------------------------------------------------------------ */

  var state = 'idle';
  var stream = null;
  var facingMode = 'environment';
  var sampleTimer = null;
  var startToken = 0;            // guards against a getUserMedia that resolves after stop()
  var startPromise = null;

  var video = null;
  var placeholderEl = null;
  var placeholderTextEl = null;

  /* Integration note (resolved by the integrator, 2026-08):
     the three measurement buttons had two owners — this file bound them and so
     did ui-core.js, and the two disagreed about when "Przełącz" may be pressed.
     The interface layer won, because it also owns the busy spinner and the
     error toast. This module now reads no button and writes no `disabled`;
     it drives the camera and the placeholder text and nothing else. */

  var sampleCanvas = null;
  var sampleCtx = null;

  var live = [];                 // Reading[], last LIVE_WINDOW_MS
  var flickerWindow = [];        // brightness samples feeding Metrics.flicker
  var latestReading = null;

  /* ------------------------------------------------------------------
     Napisy widziane przez użytkownika — zasłona podglądu i komunikaty
     o nieudanym starcie kamery.

     Treść mieszka w warstwie językowej (docs/shared/i18n/, klucze
     'engine.*'). Silnik sięga po nią przez text() DOPIERO W CHWILI
     WYŚWIETLENIA, nigdy przy ładowaniu tego pliku. Dwa powody, oba realne:
     kolejność skryptów bywa taka, że engine.js wykonuje się, zanim słownik
     dojedzie, a napis pobrany raz zostałby na ekranie po zmianie języka
     przez I18n.setLanguage().

     DLACZEGO ISTNIEJE ZAPAS WBUDOWANY (TEXT_FALLBACK): ten silnik bywa
     ładowany przez wersję, w której warstwa językowa nie wstała — nie wpięto
     i18n.js, plik słownika wrócił z 404, skrypt przed nim się wywalił. Wtedy
     nie ma kogo zapytać o napis, a milcząca pusta zasłona jest gorsza od
     napisu w jednym języku: użytkownik nie wiedziałby ani po co nacisnąć
     „Start”, ani dlaczego kamera nie ruszyła — zobaczyłby czarny prostokąt
     i tyle. Zapas jest ANGIELSKI, nie polski, bo angielski jest językiem
     zapasowym całej aplikacji (docs/shared/i18n.js, FALLBACK = 'en').
     Zdania są przepisane z docs/shared/i18n/en.js i poprawia się je w obu
     miejscach naraz.
     ------------------------------------------------------------------ */

  // Nazwy wewnętrzne odpowiadają kodom błędów z mapError(); IDLE i STARTING
  // to dwa stany zasłony.
  var TEXT_KEY = {
    IDLE: 'engine.idle',
    STARTING: 'engine.starting',
    PERMISSION: 'engine.error.permission',
    NOTFOUND: 'engine.error.notFound',
    BUSY: 'engine.error.busy',
    UNKNOWN: 'engine.error.unknown',
    UNSUPPORTED: 'engine.error.unsupported'
  };

  var TEXT_FALLBACK = {
    IDLE: 'Press “Start” to turn the camera on.',
    STARTING: 'Starting the camera…',
    PERMISSION: 'No permission to use the camera. Allow the camera in your browser settings and press “Start” again.',
    NOTFOUND: 'No camera found. Check that the device has a camera and that it is not switched off in the system.',
    BUSY: 'The camera is busy in another application. Close it and try again.',
    UNKNOWN: 'The camera could not be started.',
    UNSUPPORTED: 'This browser does not give this page access to the camera. Open the app over HTTPS or use a different browser.'
  };

  /* Napis pod nazwą wewnętrzną, pobierany w chwili użycia. Kolejno: warstwa
     językowa → zapas angielski. I18n.t() nigdy nie rzuca i nigdy nie zwraca
     undefined — gdy klucza nie zna, oddaje sam klucz, więc porównanie z nim
     jest jedynym sposobem odróżnienia trafienia od pudła. Nieznana nazwa
     schodzi na UNKNOWN, żeby ta funkcja nigdy nie zwróciła pustego napisu. */
  function text(name) {
    var known = Object.prototype.hasOwnProperty.call(TEXT_KEY, name) ? name : 'UNKNOWN';
    try {
      var i18n = global.I18n;
      if (i18n && typeof i18n.t === 'function') {
        var value = i18n.t(TEXT_KEY[known]);
        if (value && value !== TEXT_KEY[known]) return value;
      }
    } catch (_) { /* warstwa językowa nie wstała — idziemy zapasem */ }
    return TEXT_FALLBACK[known];
  }

  function setState(next) {
    if (state === next) return;
    state = next;
    // The buttons follow this event, they are not written to from here.
    emit('engine:state', { state: state });
  }

  Engine.state = function () { return state; };
  Engine.isRunning = function () { return state === 'running'; };
  Engine.facingMode = function () { return facingMode; };
  Engine.sampleHz = function () { return SAMPLE_HZ; };

  function el(id) {
    try { return global.document ? global.document.getElementById(id) : null; }
    catch (_) { return null; }
  }

  function grabDom() {
    if (!video) video = el('cameraVideo');
    if (!placeholderEl) placeholderEl = el('cameraPlaceholder');
    if (!placeholderTextEl) placeholderTextEl = el('cameraPlaceholderText');
  }

  // The placeholder is the only element this module writes to, and it is not a
  // panel, a sheet or a tab — panel visibility belongs to UI alone.
  // Parametr nazywa się `message`, a nie `text` — inaczej przesłoniłby funkcję
  // text() wyżej i pierwsze jej wywołanie stąd byłoby cichym błędem.
  function showPlaceholder(message) {
    grabDom();
    if (placeholderTextEl) placeholderTextEl.textContent = message;
    if (placeholderEl) placeholderEl.hidden = false;
  }

  function hidePlaceholder() {
    grabDom();
    if (placeholderEl) placeholderEl.hidden = true;
  }

  function ensureCanvas() {
    if (sampleCtx) return true;
    try {
      sampleCanvas = global.document.createElement('canvas');
      sampleCanvas.width = SAMPLE_SIZE;
      sampleCanvas.height = SAMPLE_SIZE;
      // willReadFrequently: every single frame is read back, which is exactly
      // the case the hint exists for.
      sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true }) || sampleCanvas.getContext('2d');
    } catch (_) { sampleCtx = null; }
    return !!sampleCtx;
  }

  function releaseStream() {
    if (stream) {
      try {
        var tracks = stream.getTracks();
        for (var i = 0; i < tracks.length; i += 1) tracks[i].stop();
      } catch (_) { /* the track is already dead */ }
      stream = null;
    }
    if (video) {
      try { video.pause(); } catch (_) { /* ignore */ }
      try { video.srcObject = null; } catch (_) { /* ignore */ }
    }
  }

  function mapError(err) {
    var name = err && err.name ? err.name : '';
    if (name === 'NotAllowedError' || name === 'SecurityError' || name === 'PermissionDeniedError') return 'PERMISSION';
    if (name === 'NotFoundError' || name === 'OverconstrainedError' || name === 'DevicesNotFoundError') return 'NOTFOUND';
    if (name === 'NotReadableError' || name === 'TrackStartError' || name === 'AbortError') return 'BUSY';
    return 'UNKNOWN';
  }

  function fail(code) {
    var messagePL = text(code);
    setState('error');
    showPlaceholder(messagePL);
    emit('engine:error', { code: code, messagePL: messagePL });
    return { ok: false, code: code, messagePL: messagePL };
  }

  /* ------------------------------------------------------------------
     Camera lifecycle
     ------------------------------------------------------------------ */

  // We deliberately do NOT lock exposure or white balance to 'manual'. v1 tried
  // that, to cut the jitter that auto-exposure hunting adds to every reading.
  // Switching a track to manual mode without also pinning an explicit exposure
  // value simply freezes the camera at whatever it happened to be at that
  // instant — usually a dark, not-yet-converged frame — and the preview stays
  // visibly dimmer than the native camera app for the whole session. Full auto
  // gives a properly exposed image; the documentation screen states the
  // measurement-noise trade-off that this choice implies. Do not "fix" this.
  function constraintsFor(facing) {
    return {
      video: {
        facingMode: { ideal: facing },
        width: { ideal: 640 },
        height: { ideal: 480 }
      },
      audio: false
    };
  }

  Engine.start = function (opts) {
    var o = opts || {};
    if (o.facingMode === 'user' || o.facingMode === 'environment') facingMode = o.facingMode;

    if (state === 'running') return Promise.resolve({ ok: true });
    // A second tap while the permission prompt is open joins the first attempt
    // instead of opening a second one.
    if (state === 'starting' && startPromise) return startPromise;

    grabDom();
    if (!video) {
      return Promise.resolve(fail('UNKNOWN'));
    }
    if (!ensureCanvas()) {
      return Promise.resolve(fail('UNKNOWN'));
    }
    var md = global.navigator && global.navigator.mediaDevices;
    if (!md || typeof md.getUserMedia !== 'function') {
      return Promise.resolve(fail('UNSUPPORTED'));
    }

    setState('starting');
    showPlaceholder(text('STARTING'));
    startToken += 1;
    var token = startToken;
    var wanted = facingMode;

    startPromise = md.getUserMedia(constraintsFor(wanted)).then(function (s) {
      // stop() may have been pressed while the prompt was open. Adopting the
      // stream now would leave a camera light on with nothing reading it.
      if (token !== startToken) {
        try {
          var tracks = s.getTracks();
          for (var i = 0; i < tracks.length; i += 1) tracks[i].stop();
        } catch (_) { /* ignore */ }
        return { ok: false, code: 'UNKNOWN', messagePL: text('UNKNOWN') };
      }

      stream = s;
      video.srcObject = s;
      video.muted = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');

      return Promise.resolve(video.play()).catch(function () {
        // Some browsers reject play() and still render the stream. Reporting a
        // failure here would stop a measurement that is in fact running.
        return null;
      }).then(function () {
        if (token !== startToken) return { ok: false, code: 'UNKNOWN', messagePL: text('UNKNOWN') };

        hidePlaceholder();
        live = [];
        flickerWindow = [];
        latestReading = null;
        sessionState = newSessionState(Date.now(), facingMode);

        if (sampleTimer) clearInterval(sampleTimer);
        sampleTimer = setInterval(takeSample, SAMPLE_MS);

        setState('running');
        emit('engine:started', { startedAt: sessionState.startedAt, facingMode: facingMode });
        return { ok: true };
      });
    }).catch(function (err) {
      if (token !== startToken) return { ok: false, code: 'UNKNOWN', messagePL: text('UNKNOWN') };
      releaseStream();
      return fail(mapError(err));
    }).then(function (result) {
      if (token === startToken) startPromise = null;
      return result;
    });

    return startPromise;
  };

  Engine.stop = function () {
    startToken += 1;          // orphan any getUserMedia still in flight
    startPromise = null;

    if (sampleTimer) { clearInterval(sampleTimer); sampleTimer = null; }
    releaseStream();

    var finished = null;
    if (sessionState) {
      finished = buildSession(Date.now());
      lastSession = finished;
      writeStore(STORE_SESSION, finished);
      sessionState = null;
    }

    // Write before announcing the stop, so anything that reads history in
    // response to engine:stopped sees the complete buffer.
    if (historyDirty) persistHistory();

    latestReading = null;
    flickerWindow = [];
    setState('idle');
    showPlaceholder(text('IDLE'));

    if (finished) emit('engine:stopped', { session: finished });
    // Nothing is triggered from here: no dialog, no prompt, no interruption.
    // A measurement that ends must end quietly; that is a rule of this
    // project, not an omission.
  };

  Engine.toggle = function () {
    if (state === 'running' || state === 'starting') {
      Engine.stop();
      return Promise.resolve({ ok: true, running: false });
    }
    return Engine.start();
  };

  Engine.switchCamera = function () {
    var next = facingMode === 'environment' ? 'user' : 'environment';
    if (state !== 'running' && state !== 'starting') {
      // Nothing to restart: just remember the choice for the next Start.
      facingMode = next;
      return Promise.resolve({ ok: true });
    }
    // A new lens is a new set of optics and a new exposure curve, so it is a
    // new session rather than a continuation of the old one — averaging both
    // into one summary would describe a scene that was never measured.
    Engine.stop();
    return Engine.start({ facingMode: next });
  };

  /* ------------------------------------------------------------------
     Sampling — the 5 Hz loop
     ------------------------------------------------------------------ */

  var cellSum = new Array(CELLS);
  var cellCount = new Array(CELLS);

  function takeSample() {
    if (!video || !sampleCtx) return;
    var vw = video.videoWidth, vh = video.videoHeight;
    // The first frames after play() have no dimensions yet. Skipping is right:
    // a black frame reads as 0% blue share and would be a fabricated data point.
    if (!vw || !vh) return;

    var sw = vw * CROP_FRACTION, sh = vh * CROP_FRACTION;
    var sx = (vw - sw) / 2, sy = (vh - sh) / 2;

    var data;
    try {
      sampleCtx.drawImage(video, sx, sy, sw, sh, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
      data = sampleCtx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE).data;
    } catch (_) {
      // One unreadable frame is not a reason to tear down a session.
      return;
    }

    var i;
    for (i = 0; i < CELLS; i += 1) { cellSum[i] = 0; cellCount[i] = 0; }

    var sumR = 0, sumG = 0, sumB = 0;
    var pixels = SAMPLE_SIZE * SAMPLE_SIZE;

    for (var y = 0; y < SAMPLE_SIZE; y += 1) {
      var rowCell = ((y * GRID / SAMPLE_SIZE) | 0) * GRID;
      for (var x = 0; x < SAMPLE_SIZE; x += 1) {
        var p = (y * SAMPLE_SIZE + x) * 4;
        var r = data[p], g = data[p + 1], b = data[p + 2];
        sumR += r; sumG += g; sumB += b;
        var c = rowCell + ((x * GRID / SAMPLE_SIZE) | 0);
        // Cell luminance must be averaged in LINEAR light. Averaging gamma
        // values first would flatter every uneven scene.
        cellSum[c] += 0.2126729 * LIN[r] + 0.7151522 * LIN[g] + 0.0721750 * LIN[b];
        cellCount[c] += 1;
      }
    }

    var meanR = sumR / pixels, meanG = sumG / pixels, meanB = sumB / pixels;
    var cells = new Array(CELLS);
    for (i = 0; i < CELLS; i += 1) cells[i] = cellCount[i] ? cellSum[i] / cellCount[i] : 0;

    if (calibration) {
      meanR = clamp255(meanR * calibration.gainR);
      meanG = clamp255(meanG * calibration.gainG);
      meanB = clamp255(meanB * calibration.gainB);
      // Cell luminances are relative to each other, and uniformity is a ratio
      // of two of them, so a per-channel gain cancels out. They stay raw.
    }

    var reading = buildReading(Date.now(), meanR, meanG, meanB, cells);

    latestReading = reading;
    live.push(reading);
    var liveCutoff = reading.t - LIVE_WINDOW_MS - LIVE_MARGIN_MS;
    while (live.length && live[0].t < liveCutoff) live.shift();

    accumulate(reading);
    pushLongPoint(reading);

    emit('engine:sample', { reading: reading });
  }

  function clamp255(v) {
    return v < 0 ? 0 : (v > 255 ? 255 : v);
  }

  /* Brightness floor of 2 %: below that the sensor is returning noise, and a
     flicker figure computed from noise is not evidence that anything was
     measured. Editorial threshold, not a standard. */
  var COMFORT_MIN_BRIGHTNESS = 2;

  function comfortUsable(cct, uniformity, fl, brightness) {
    if (cct && cct.kelvin !== null) return true;
    if (uniformity !== null) return true;
    return fl && fl.percent !== null && brightness > COMFORT_MIN_BRIGHTNESS;
  }

  // Every metric, every sample, for everybody: the reading is always built
  // whole, and no number in it is ever conditional.
  function buildReading(t, r, g, b, cells) {
    var brightness = Metrics.brightness(r, g, b);

    // Flicker is the one metric that needs history rather than a frame.
    flickerWindow.push(brightness);
    if (flickerWindow.length > FLICKER_WINDOW) flickerWindow.shift();
    var fl = Metrics.flicker(flickerWindow, SAMPLE_HZ);

    var cct = Metrics.colourTemperature(r, g, b);
    var melanopic = Metrics.melanopicRatio(r, g, b);
    var uniformity = Metrics.uniformity(cells);

    var comfort = Metrics.comfortIndex({
      melanopic: melanopic,
      kelvin: cct.kelvin,
      flickerPercent: fl.percent,
      uniformity: uniformity
    });

    var values = {
      share: Metrics.blueShare(r, g, b),
      brightness: brightness,
      kelvin: cct.kelvin,
      melanopic: melanopic,
      flicker: fl.percent,
      uniformity: uniformity,
      /* comfortIndex always returns a number; `measured` says whether anything
         fed into it. That flag is not strict enough on its own: for a covered
         lens every input degrades to "no penalty" — melanopic 0, kelvin null,
         uniformity null, flicker 0 — the score stays 100 and `measured` is
         true, because it is defined as "some penalty OR a perfect score". The
         result was a black frame reported as "Komfort wzrokowy: 100 pkt, W
         normie", and written to history and to the CSV that way.

         metrics.js is the single source of truth for the arithmetic and is not
         to be edited, so the credibility test lives here: at least one input
         has to have actually said something. A dash and "Brak danych" is the
         true answer, and this application would rather print it. */
      comfort: (comfort.measured && comfortUsable(cct, uniformity, fl, brightness))
        ? comfort.score
        : null
    };

    var zones = {};
    for (var i = 0; i < IDS.length; i += 1) zones[IDS[i]] = zoneOf(IDS[i], values[IDS[i]]);

    return {
      t: t,
      r: r, g: g, b: b,
      values: values,
      zones: zones,
      extra: {
        kelvinReliable: cct.reliable,
        // Above Nyquist a frequency estimate is an alias, not a reading. It is
        // reported as absent rather than as a number nobody can trust.
        flickerHz: fl.withinRange ? fl.hz : null,
        flickerWithinRange: fl.withinRange,
        comfortPenalties: comfort.penalties,
        cells: cells
      }
    };
  }

  function pushLongPoint(reading) {
    if (reading.t - lastLongAt < LONG_STEP_MS) return;
    lastLongAt = reading.t;
    historyLong.push({
      t: reading.t,
      share: reading.values.share,
      brightness: reading.values.brightness,
      kelvin: reading.values.kelvin,
      melanopic: reading.values.melanopic,
      flicker: reading.values.flicker,
      uniformity: reading.values.uniformity,
      comfort: reading.values.comfort,
      zone: reading.zones[LEAD_ID]
    });
    historyDirty = true;
    historyPushes += 1;

    // Batched: trimming and stringifying 15 000 records five times a second
    // would stall a budget phone. Once every 64 points is once every 5 minutes.
    if (historyPushes % HISTORY_FLUSH_EVERY === 0) {
      trimHistory();
      if (!storageRefused && persistHistory()) emit('engine:history', { reason: 'flushed' });
    }
  }

  /* ------------------------------------------------------------------
     Readings out
     ------------------------------------------------------------------ */

  function copyReading(reading) {
    if (!reading) return null;
    var values = {}, zones = {};
    for (var i = 0; i < IDS.length; i += 1) {
      values[IDS[i]] = reading.values[IDS[i]];
      zones[IDS[i]] = reading.zones[IDS[i]];
    }
    var penalties = [];
    for (var j = 0; j < reading.extra.comfortPenalties.length; j += 1) {
      var pen = reading.extra.comfortPenalties[j];
      penalties.push({ id: pen.id, labelPL: pen.labelPL, points: pen.points });
    }
    return {
      t: reading.t, r: reading.r, g: reading.g, b: reading.b,
      values: values, zones: zones,
      extra: {
        kelvinReliable: reading.extra.kelvinReliable,
        flickerHz: reading.extra.flickerHz,
        flickerWithinRange: reading.extra.flickerWithinRange,
        comfortPenalties: penalties,
        cells: reading.extra.cells.slice()
      }
    };
  }

  Engine.latest = function () {
    // The live object is handed out by reference on purpose: it is read five
    // times a second by the tiles and copying it every time is waste. Callers
    // that keep it must not mutate it — snapshot() exists for that.
    return latestReading;
  };

  Engine.buffer = function (ms) {
    var span = num(ms);
    if (span === null || span <= 0) span = LIVE_WINDOW_MS;
    var cutoff = Date.now() - span;
    var out = [];
    for (var i = 0; i < live.length; i += 1) {
      if (live[i].t >= cutoff) out.push(live[i]);
    }
    return out;
  };

  Engine.snapshot = function (labelPL) {
    var copy = copyReading(latestReading);
    if (!copy) return null;          // nothing measured yet; the caller decides what to say
    copy.labelPL = typeof labelPL === 'string' ? labelPL : '';
    copy.at = Date.now();
    return copy;
  };

  /* ------------------------------------------------------------------
     Wiring
     ------------------------------------------------------------------ */

  function onReady() {
    grabDom();
    if (state === 'idle') showPlaceholder(text('IDLE'));
  }

  try {
    if (global.Bus && typeof global.Bus.on === 'function') global.Bus.on('app:ready', onReady);
  } catch (_) { /* the shell will call nothing; the API still works */ }

  if (global.document) {
    if (global.document.readyState === 'loading') {
      global.document.addEventListener('DOMContentLoaded', onReady);
    } else {
      // Loaded late (cache, back/forward): the shell may already be ready.
      setTimeout(onReady, 0);
    }

    // Leaving the page is the last chance to keep the points that have not been
    // batched yet. visibilitychange fires on mobile where pagehide often does not.
    global.document.addEventListener('visibilitychange', function () {
      if (global.document.visibilityState === 'hidden' && historyDirty) persistHistory();
    });
  }

  global.addEventListener('pagehide', function () {
    if (historyDirty) persistHistory();
  });

  global.Engine = Engine;
})(typeof window !== 'undefined' ? window : globalThis);
