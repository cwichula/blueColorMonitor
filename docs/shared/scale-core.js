/* docs/shared/scale-core.js — kod wspólny wersji v2–v4.
 *
 * SKĄD: przeniesione BEZ ZMIAN z docs/v4/scale.js, linie 22–341 — czyli od
 * otwarcia `(function (global) {` do końca funkcji Scale.railRunning, tuż
 * przed słownikiem Scale.TEXT. Prefiks v3 i v4 różnił się tylko dwiema
 * liniami komentarza. Dopisane tutaj są WYŁĄCZNIE: ten nagłówek oraz
 * `global.Scale = Scale;` z domknięciem IIFE na końcu — w oryginale stały one
 * dopiero za słownikiem, który tu nie trafia.
 *
 * KTO ŁADUJE: v3 i v4 — plik jest wpięty w index.html i wymieniony
 * w APP_SHELL obu tych wersji. v2 nie ma warstwy skali i tego pliku nie
 * ładuje.
 *
 * CO WYSTAWIA: globalne `window.Scale` — geometrię skali (pozycje, pasma,
 * strefy) i formatowanie liczb. Bez DOM, bez silnika, bez magistrali, bez
 * storage. Progi ZAWSZE podaje wywołujący (z Engine.getThresholds()), nigdy
 * nie są czytane z katalogu: użytkownik mógł je przesunąć.
 *
 * KOLEJNOŚĆ ŁADOWANIA — najważniejsza rzecz w tym pliku: to on tworzy
 * `window.Scale` i musi być załadowany PRZED lokalnym scale.js danej wersji,
 * który dokłada do tego samego obiektu słownik Scale.TEXT (napisy opisujące
 * ekrany konkretnej wersji, więc z natury nie do współdzielenia). Funkcje
 * zdefiniowane niżej sięgają po Scale.TEXT dopiero w chwili wywołania, a nie
 * w chwili definicji, więc taka kolejność w zupełności wystarcza.
 *
 * CZEGO TU NIE WOLNO: odwoływać się do układu ekranu konkretnej wersji, do
 * DOM, do silnika ani do magistrali; dopisywać napisów widocznych dla
 * użytkownika — te mieszkają w Scale.TEXT lokalnego scale.js. Zmiana w tym
 * pliku dotyka wszystkich wersji, które go ładują, naraz.
 */
(function (global) {
  'use strict';

  var Scale = {};

  /* ------------------------------------------------------------------
     Small helpers over metrics.js
     ------------------------------------------------------------------ */

  // Looked up lazily rather than captured at load time: a wrong <script>
  // order should produce a null metric, not a hard reference error at parse.
  function byId(id) {
    return global.Metrics ? global.Metrics.byId(id) : null;
  }

  function isNum(v) {
    return typeof v === 'number' && isFinite(v);
  }

  // The catalogue values are a last resort only, for a caller that has no
  // engine yet (a unit test, the help sheet before the first start).
  function thresholdOf(id, thresholds) {
    var t = thresholds ? thresholds[id] : null;
    if (t && isNum(t.warn) && isNum(t.crit)) return t;
    var m = byId(id);
    return m ? { warn: m.warn, crit: m.crit } : null;
  }

  var ZONE_RANK = { good: 0, warning: 1, critical: 2 };

  /* ------------------------------------------------------------------
     6.0 — the one geometry function
     ------------------------------------------------------------------ */

  /** Position of a value on its metric scale, as a percentage 0..100. */
  Scale.pos = function (metricId, value) {
    var m = byId(metricId);
    if (!m || value === null || value === undefined || !isFinite(value)) return null;
    var span = m.max - m.min;
    if (!span) return null;
    var pct = ((value - m.min) / span) * 100;
    return pct < 0 ? 0 : (pct > 100 ? 100 : pct);
  };

  /** The three band widths, already ordered left to right for THIS metric.
   *  invert === true means higher is better, so the bad end of the ruler is
   *  on the LEFT and warn sits above crit. Call this on a lead-channel
   *  change, on engine:thresholds and when a row is built — never at 5 Hz. */
  Scale.bands = function (metricId, thresholds) {
    var m = byId(metricId);
    var t = thresholdOf(metricId, thresholds);
    if (!m || !t) return [];
    var w = Scale.pos(metricId, t.warn);
    var c = Scale.pos(metricId, t.crit);
    if (w === null || c === null) return [];
    return m.invert
      ? [{ zone: 'critical', from: 0, to: c }, { zone: 'warning', from: c, to: w },
         { zone: 'good', from: w, to: 100 }]
      : [{ zone: 'good', from: 0, to: w }, { zone: 'warning', from: w, to: c },
         { zone: 'critical', from: c, to: 100 }];
  };

  /** Zone of a value. The arithmetic itself stays in metrics.js. */
  Scale.zone = function (metricId, value, thresholds) {
    var m = byId(metricId);
    var t = thresholdOf(metricId, thresholds);
    if (!m || !t || !global.Metrics) return null;
    return global.Metrics.zoneFor(value, t.warn, t.crit, m.invert);
  };

  /* ------------------------------------------------------------------
     7.2 — severity and the verdict
     ------------------------------------------------------------------ */

  /** 0 = fine, 1..2 = inside the warning band, 2..3 = past critical.
   *  null means "not measured", which is an absence of opinion and never a
   *  good result. */
  Scale.severity = function (metricId, value, thresholds) {
    var m = byId(metricId);
    var t = thresholdOf(metricId, thresholds);
    if (!m || !t) return null;
    if (!isNum(value)) return null;
    var zone = Scale.zone(metricId, value, thresholds);
    if (zone === null) return null;
    if (zone === 'good') return 0;
    var spanW = Math.abs(t.crit - t.warn) || 1;
    var over = m.invert ? (t.warn - value) : (value - t.warn);
    return Math.min(3, 1 + over / spanW);
  };

  /** The sentence under the big number.
   *
   *  Computed from ALL SEVEN metrics — every one of them, always, for
   *  everybody.
   *
   *  Worst zone wins; inside that zone the culprit is the metric with the
   *  highest severity, ties resolved by catalogue order. NO hysteresis here —
   *  this is a pure function of one reading; dash.js holds the 4 s delay.
   *
   *  Returns { zone, culprit, textPL }. Sentences are finished, in the
   *  nominative, and contain no numbers and no metric names spliced in:
   *  Polish inflection without a dictionary produces grammar errors, and a
   *  grammar error here costs trust. */
  Scale.verdict = function (reading, thresholds) {
    var cat = global.Metrics ? global.Metrics.CATALOGUE : [];
    var values = reading && reading.values ? reading.values : null;
    var worst = null, culprit = null, bestSev = -1;
    var i, id, value, zone, sev;

    for (i = 0; i < cat.length; i += 1) {
      id = cat[i].id;
      value = values ? values[id] : null;
      zone = Scale.zone(id, value, thresholds);
      if (zone === null) continue;                 // unmeasured: no opinion
      sev = Scale.severity(id, value, thresholds);
      if (sev === null) sev = 0;
      if (worst === null || ZONE_RANK[zone] > ZONE_RANK[worst]) {
        worst = zone;
        culprit = null;
        bestSev = -1;
      }
      // Strict ">" keeps the earlier catalogue entry when severities tie.
      if (ZONE_RANK[zone] === ZONE_RANK[worst] && sev > bestSev) {
        bestSev = sev;
        culprit = id;
      }
    }

    if (worst === null) {
      return { zone: null, culprit: null, textPL: Scale.TEXT.verdict.noValue };
    }
    if (worst === 'good') {
      return { zone: 'good', culprit: null, textPL: Scale.TEXT.verdict.good.any };
    }
    var table = Scale.TEXT.verdict[worst];
    return {
      zone: worst,
      culprit: culprit,
      textPL: (table && table[culprit]) || Scale.TEXT.verdict.noValue
    };
  };

  /* ------------------------------------------------------------------
     Ticks
     ------------------------------------------------------------------ */

  // Quartered kelvins land on 3375 K and 7125 K. That much precision on a
  // ruler reads as noise, so the labels round to the nearest 50 K — the value
  // itself is never rounded, only its engraving.
  function tickLabel(m, value) {
    var v = m.id === 'kelvin' ? Math.round(value / 50) * 50 : value;
    return global.Metrics ? global.Metrics.formatValue(m.id, v) : String(v);
  }

  /** 5 major ticks (every 1/4 of the range) with labels, 21 minor ones
   *  (every 1/20). Positions are percentages, so the caller only writes
   *  `left`. Built once per lead-channel change, never at 5 Hz. */
  Scale.ticks = function (metricId) {
    var m = byId(metricId);
    var out = { major: [], minor: [] };
    if (!m) return out;
    var span = m.max - m.min;
    var i;
    for (i = 0; i <= 4; i += 1) {
      out.major.push({ pos: i * 25, labelPL: tickLabel(m, m.min + span * (i / 4)) });
    }
    for (i = 0; i <= 20; i += 1) {
      out.minor.push(i * 5);
    }
    return out;
  };

  /* ------------------------------------------------------------------
     Formatting
     ------------------------------------------------------------------ */

  /** Metrics.formatValue with the application's "no value" glyph. Three em
   *  dashes, never an empty field: an empty cell looks like a zero. */
  Scale.formatValue = function (metricId, value) {
    var m = byId(metricId);
    if (!m || !isNum(value)) return Scale.TEXT.common.noValue;
    return global.Metrics.formatValue(metricId, value);
  };

  // Name used by the file table in DESIGN.md 9.1. Same function.
  Scale.formatFor = function (metricId, value) {
    return Scale.formatValue(metricId, value);
  };

  /** '00:04:12' — the session clock. */
  Scale.duration = function (ms) {
    var total = Math.max(0, Math.round((ms || 0) / 1000));
    var h = Math.floor(total / 3600);
    var m = Math.floor((total % 3600) / 60);
    var s = total % 60;
    return pad2(h) + ':' + pad2(m) + ':' + pad2(s);
  };

  /** '4 min 12 s' — the same span said in words, for sentences. */
  Scale.durationWords = function (ms) {
    var total = Math.max(0, Math.round((ms || 0) / 1000));
    var h = Math.floor(total / 3600);
    var m = Math.floor((total % 3600) / 60);
    var s = total % 60;
    if (h > 0) return h + ' godz ' + m + ' min';
    if (m > 0) return m + ' min ' + s + ' s';
    return s + ' s';
  };

  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }

  /** Fills {placeholders} in a TEXT template. Placeholder names are English
   *  because they are code; the sentence around them is the Polish part. */
  Scale.fill = function (template, map) {
    if (typeof template !== 'string') return '';
    return template.replace(/\{(\w+)\}/g, function (whole, key) {
      return map && map[key] !== undefined && map[key] !== null ? String(map[key]) : whole;
    });
  };

  /* ------------------------------------------------------------------
     Status stamp
     ------------------------------------------------------------------ */

  /** Colour is never the only carrier: the caller gets the shape modifier and
   *  the word together, and 5.5 forbids one without the other. */
  Scale.stamp = function (zone) {
    switch (zone) {
      case 'good': return { wordPL: Scale.TEXT.stamp.good, shapeMod: 'good', shapeClass: 'ms3-shape ms3-shape--good' };
      case 'warning': return { wordPL: Scale.TEXT.stamp.warning, shapeMod: 'warning', shapeClass: 'ms3-shape ms3-shape--warning' };
      case 'critical': return { wordPL: Scale.TEXT.stamp.critical, shapeMod: 'critical', shapeClass: 'ms3-shape ms3-shape--critical' };
      default: return { wordPL: Scale.TEXT.stamp.none, shapeMod: 'none', shapeClass: 'ms3-shape ms3-shape--none' };
    }
  };

  /** '(próg 26%)' — the boundary the stamp is talking about. In the good zone
   *  it names the next boundary ahead, which is the one worth knowing. */
  Scale.threshold = function (metricId, zone, thresholds) {
    var m = byId(metricId);
    var t = thresholdOf(metricId, thresholds);
    if (!m || !t || zone === null || zone === undefined) return '';
    var v = zone === 'critical' ? t.crit : t.warn;
    return Scale.fill(Scale.TEXT.readout.thresholdTpl, {
      value: Scale.formatValue(metricId, v) + unitSuffix(m)
    });
  };

  // '27%' has no space, '4200 K' and '24 pkt' do — a percent sign binds to
  // the digits in Polish typography, a unit word does not.
  function unitSuffix(m) {
    if (!m || !m.unit) return '';
    return m.unit === '%' ? '%' : ' ' + m.unit;
  }

  Scale.unitSuffix = function (metricId) {
    return unitSuffix(byId(metricId));
  };

  /* ------------------------------------------------------------------
     Sentences built from numbers
     ------------------------------------------------------------------ */

  /** 'min 21 · śr. 24 · maks 29 — ostatnie 60 s' from the 60 s buffer. */
  Scale.context = function (metricId, stats) {
    if (!stats || !isNum(stats.min) || !isNum(stats.avg) || !isNum(stats.max)) {
      return Scale.TEXT.readout.contextEmpty;
    }
    return Scale.fill(Scale.TEXT.readout.contextTpl, {
      min: Scale.formatValue(metricId, stats.min),
      avg: Scale.formatValue(metricId, stats.avg),
      max: Scale.formatValue(metricId, stats.max)
    });
  };

  /** '4200 kelwinów' — a value as a screen reader should hear it. */
  Scale.spoken = function (metricId, value) {
    if (!isNum(value)) return Scale.TEXT.spoken.noValue;
    var word = Scale.TEXT.spoken.units[metricId];
    var num = Scale.formatValue(metricId, value);
    return word ? num + ' ' + word : num;
  };

  Scale.spokenZone = function (zone) {
    return Scale.TEXT.spoken.zones[zone] || Scale.TEXT.spoken.zones.none;
  };

  /** 'Kanał główny: Temperatura barwowa, 4200 kelwinów, uwaga.' (7.3) */
  Scale.announceLead = function (metricId, value, zone) {
    var m = byId(metricId);
    return Scale.fill(Scale.TEXT.live.lead, {
      name: m ? m.namePL : '',
      value: Scale.spoken(metricId, value),
      zone: Scale.spokenZone(zone)
    });
  };

  /** 'Ocena gotowa. Udział niebieskiego 27 procent, uwaga.' (8.5) */
  Scale.announceReady = function (metricId, value, zone) {
    var m = byId(metricId);
    return Scale.fill(Scale.TEXT.live.ready, {
      name: m ? m.namePL : '',
      value: Scale.spoken(metricId, value),
      zone: Scale.spokenZone(zone)
    });
  };

  /** 'Pomiar zakończony · 4 min 12 s · zapisano w historii.' (8.5) */
  Scale.announceStopped = function (durationMs) {
    return Scale.fill(Scale.TEXT.transient.measureStopped, {
      time: Scale.durationWords(durationMs)
    });
  };

  /** 'Pomiar 00:04:12' for the status rail. */
  Scale.railRunning = function (durationMs) {
    return Scale.fill(Scale.TEXT.state.runningTpl, { time: Scale.duration(durationMs) });
  };

  global.Scale = Scale;

}(typeof window !== 'undefined' ? window : globalThis));
