/* docs/shared/metrics.js — kod wspólny wersji v2–v4.
 *
 * SKĄD: przeniesione BEZ ZMIAN z docs/v4/metrics.js. Redakcje v2, v3 i v4
 * różniły się wyłącznie komentarzami — ani jedną linią kodu. Wybrano v4, bo
 * jej komentarze są najnowsze.
 *
 * KTO ŁADUJE: v2, v3 i v4 — plik jest wpięty w index.html i wymieniony
 * w APP_SHELL każdej z tych trzech wersji.
 *
 * CO WYSTAWIA: globalne `window.Metrics` — czystą matematykę pomiaru
 * (funkcje liczbowe bez DOM) oraz katalog wielkości Metrics.CATALOGUE, który
 * jest jedynym domem nazw, jednostek i zakresów.
 *
 * CZEGO TU NIE WOLNO: odwoływać się do DOM, do magistrali, do silnika ani do
 * układu ekranu konkretnej wersji; dopisywać napisów widocznych dla
 * użytkownika ponad te, które już tu są w katalogu. Zmiana w tym pliku
 * dotyka trzech wersji naraz.
 */
/* Monitor Światła — pomiar (czysta matematyka, bez DOM).
 *
 * Everything here is a pure function of numbers so it can be checked without a
 * camera or a browser. The UI layer is not allowed to do arithmetic on pixels;
 * it asks this module instead.
 *
 * Honesty note that belongs in the code and not only in the documentation:
 * a phone camera is a three-channel device with an unknown, auto-adjusting
 * white balance. It cannot measure a spectrum. Every quantity below is either
 * a ratio the camera CAN see (blue share, brightness, flicker, uniformity) or
 * an explicitly labelled approximation derived from sRGB primaries (colour
 * temperature, melanopic ratio). None of them is a photometric measurement and
 * none is a medical result.
 */
(function (global) {
  'use strict';

  var Metrics = {};

  /* ------------------------------------------------------------------
     Colour space
     ------------------------------------------------------------------ */

  // sRGB stores values gamma-encoded. Every physical calculation below needs
  // linear light, so undo the transfer function first. Skipping this step is
  // the single most common error in "colour temperature from a photo" code and
  // it skews every result towards the middle.
  function toLinear(channel) {
    var c = Math.min(1, Math.max(0, channel / 255));
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }

  Metrics.toLinear = toLinear;

  // sRGB (linear) -> CIE XYZ, D65 reference white.
  function toXYZ(rLin, gLin, bLin) {
    return {
      X: 0.4124564 * rLin + 0.3575761 * gLin + 0.1804375 * bLin,
      Y: 0.2126729 * rLin + 0.7151522 * gLin + 0.0721750 * bLin,
      Z: 0.0193339 * rLin + 0.1191920 * gLin + 0.9503041 * bLin
    };
  }

  Metrics.toXYZ = toXYZ;

  /* ------------------------------------------------------------------
     Metric 1 — blue share (the original metric)
     ------------------------------------------------------------------ */

  // Blue's share of total channel energy. Deliberately computed on gamma
  // values, not linear ones: this is the same number the previous version of
  // the app reported, and changing its definition would silently invalidate
  // every threshold a user has already tuned.
  Metrics.blueShare = function (r, g, b) {
    var sum = r + g + b;
    if (sum <= 0) return 0;
    return (b / sum) * 100;
  };

  /* ------------------------------------------------------------------
     Metric 2 — scene brightness
     ------------------------------------------------------------------ */

  // Mean channel value as a percentage. A relative exposure indicator, not lux:
  // the camera's auto-exposure moves underneath it and there is no reference.
  Metrics.brightness = function (r, g, b) {
    return ((r + g + b) / 3 / 255) * 100;
  };

  /* ------------------------------------------------------------------
     Metric 3 — correlated colour temperature
     ------------------------------------------------------------------ */

  // McCamy's cubic approximation of CCT from CIE 1931 chromaticity.
  // Valid roughly between 2000 K and 12500 K; outside that the cubic diverges,
  // so the result is clamped and flagged rather than reported as fact.
  Metrics.colourTemperature = function (r, g, b) {
    var X = toXYZ(toLinear(r), toLinear(g), toLinear(b));
    var sum = X.X + X.Y + X.Z;
    if (sum <= 1e-9) return { kelvin: null, reliable: false };
    var x = X.X / sum;
    var y = X.Y / sum;
    // Chromaticity epicentre of the Planckian locus used by McCamy.
    var denom = y - 0.1858;
    if (Math.abs(denom) < 1e-6) return { kelvin: null, reliable: false };
    var n = (x - 0.3320) / denom;
    var cct = -449 * n * n * n + 3525 * n * n - 6823.3 * n + 5520.33;
    var reliable = cct >= 2000 && cct <= 12500;
    return {
      kelvin: Math.round(Math.min(12500, Math.max(1500, cct))),
      reliable: reliable
    };
  };

  /* ------------------------------------------------------------------
     Metric 4 — melanopic ratio
     ------------------------------------------------------------------ */

  // Approximate melanopic-to-photopic ratio ("how strongly this light speaks to
  // the body clock, per unit of visible brightness").
  //
  // The real quantity is an integral of the spectrum against the melanopsin
  // action spectrum (peak ~490 nm). A camera has three broad channels, so this
  // weights the sRGB primaries by the melanopic efficiency at their approximate
  // dominant wavelengths (R 612 nm, G 549 nm, B 465 nm) and normalises so that
  // an equal-energy D65 white reads 1.00. It tracks the right direction with
  // real confidence and the right magnitude with none, which is exactly how the
  // interface labels it.
  var MEL_R = 0.0016, MEL_G = 0.3110, MEL_B = 0.8460;
  var MEL_WHITE = MEL_R + MEL_G + MEL_B;              // melanopic sum at RGB=1,1,1
  var LUM_WHITE = 0.2126729 + 0.7151522 + 0.0721750;  // photopic sum, = 1

  Metrics.melanopicRatio = function (r, g, b) {
    var rl = toLinear(r), gl = toLinear(g), bl = toLinear(b);
    var lum = 0.2126729 * rl + 0.7151522 * gl + 0.0721750 * bl;
    if (lum <= 1e-9) return 0;
    var mel = MEL_R * rl + MEL_G * gl + MEL_B * bl;
    // Normalised so neutral white == 1.00 rather than 1.16.
    return (mel / lum) * (LUM_WHITE / MEL_WHITE);
  };

  /* ------------------------------------------------------------------
     Metric 5 — flicker
     ------------------------------------------------------------------ */

  // Percent flicker over a window of brightness samples:
  //     (max - min) / (max + min) * 100
  // the standard IES definition. Screens and cheap LED drivers dim by pulsing;
  // that pulsing is invisible but is a documented trigger for eye strain and
  // headaches, and it is the one property here a camera detects genuinely well.
  //
  // Hard limit worth stating plainly: sampling at S Hz can only see modulation
  // below S/2 Hz (Nyquist). Mains-driven 100/120 Hz flicker is far above that
  // and will alias. `withinRange` reports whether the frequency estimate can be
  // trusted at all, so the interface never presents an alias as a reading.
  Metrics.flicker = function (samples, sampleHz) {
    if (!samples || samples.length < 8) return { percent: null, hz: null, withinRange: false };
    var min = Infinity, max = -Infinity, sum = 0;
    for (var i = 0; i < samples.length; i += 1) {
      var v = samples[i];
      if (v < min) min = v;
      if (v > max) max = v;
      sum += v;
    }
    var span = max + min;
    var percent = span <= 1e-9 ? 0 : ((max - min) / span) * 100;

    // Zero-crossing count around the mean gives a coarse dominant frequency.
    var mean = sum / samples.length;
    var crossings = 0;
    for (var j = 1; j < samples.length; j += 1) {
      var a = samples[j - 1] - mean, c = samples[j] - mean;
      if ((a < 0 && c >= 0) || (a >= 0 && c < 0)) crossings += 1;
    }
    var seconds = samples.length / (sampleHz || 1);
    var hz = seconds > 0 ? (crossings / 2) / seconds : null;
    var nyquist = (sampleHz || 0) / 2;

    // A flat signal has no frequency: the zero crossings are then just sensor
    // noise wobbling around the mean, and reporting them as hertz would dress
    // noise up as a measurement.
    var hasSignal = percent >= 0.5;
    return {
      percent: percent,
      hz: hasSignal ? hz : null,
      // Only trust a frequency comfortably inside the sampling limit. Anything
      // near Nyquist is indistinguishable from an alias of something faster.
      withinRange: hasSignal && hz !== null && hz > 0.2 && hz < nyquist * 0.8
    };
  };

  /* ------------------------------------------------------------------
     Metric 6 — uniformity
     ------------------------------------------------------------------ */

  // Ratio of the darkest to the brightest cell of a grid across the frame,
  // as a percentage. Low uniformity on a screen means backlight bleed or glare;
  // on a desk it means the light is badly placed. 100% is perfectly even.
  Metrics.uniformity = function (cellLuminances) {
    if (!cellLuminances || cellLuminances.length < 2) return null;
    var min = Infinity, max = -Infinity;
    for (var i = 0; i < cellLuminances.length; i += 1) {
      var v = cellLuminances[i];
      if (v < min) min = v;
      if (v > max) max = v;
    }
    if (max <= 1e-9) return null;
    return (min / max) * 100;
  };

  /* ------------------------------------------------------------------
     Metric 7 — eye comfort index
     ------------------------------------------------------------------ */

  // A single 0-100 score, because "six numbers" is not an answer to "is this
  // light bad for me right now". Each component is a penalty in points; the
  // weights are a stated editorial judgement, not a standard, and the interface
  // says so and shows the breakdown so the user can disagree with it.
  //
  // Anything the sensor could not measure contributes no penalty at all, so an
  // unavailable metric can never masquerade as a good result.
  Metrics.comfortIndex = function (input) {
    var penalties = [];
    var score = 100;

    if (typeof input.melanopic === 'number') {
      // 1.0 is neutral daylight-white. Evening exposure above that is the
      // single most evidence-backed factor here, so it carries the most weight.
      var over = Math.max(0, input.melanopic - 0.75);
      var p = Math.min(35, over * 55);
      if (p > 0.5) penalties.push({ id: 'melanopic', labelPL: 'Wpływ na rytm dobowy', points: p });
      score -= p;
    }

    if (typeof input.kelvin === 'number' && input.kelvin !== null) {
      // Cool light late is the classic complaint; warm light is never penalised.
      var overK = Math.max(0, input.kelvin - 4000);
      var pk = Math.min(25, (overK / 3000) * 25);
      if (pk > 0.5) penalties.push({ id: 'kelvin', labelPL: 'Chłodna barwa światła', points: pk });
      score -= pk;
    }

    if (typeof input.flickerPercent === 'number' && input.flickerPercent !== null) {
      // Below ~5% is broadly considered imperceptible; above 30% is bad.
      var overF = Math.max(0, input.flickerPercent - 5);
      var pf = Math.min(25, (overF / 25) * 25);
      if (pf > 0.5) penalties.push({ id: 'flicker', labelPL: 'Migotanie', points: pf });
      score -= pf;
    }

    if (typeof input.uniformity === 'number' && input.uniformity !== null) {
      var underU = Math.max(0, 60 - input.uniformity);
      var pu = Math.min(15, (underU / 60) * 15);
      if (pu > 0.5) penalties.push({ id: 'uniformity', labelPL: 'Nierównomierne oświetlenie', points: pu });
      score -= pu;
    }

    penalties.sort(function (a, b) { return b.points - a.points; });
    return {
      score: Math.round(Math.min(100, Math.max(0, score))),
      penalties: penalties,
      measured: penalties.length > 0 || score === 100
    };
  };

  /* ------------------------------------------------------------------
     Zones
     ------------------------------------------------------------------ */

  // Every metric maps onto the same three zones so one colour language covers
  // the whole interface. `invert` is for metrics where HIGHER is better.
  Metrics.zoneFor = function (value, warn, crit, invert) {
    if (value === null || value === undefined || !isFinite(value)) return null;
    if (invert) {
      if (value <= crit) return 'critical';
      if (value <= warn) return 'warning';
      return 'good';
    }
    if (value >= crit) return 'critical';
    if (value >= warn) return 'warning';
    return 'good';
  };

  /* ------------------------------------------------------------------
     Metric catalogue — the single source of truth for the whole app
     ------------------------------------------------------------------ */

  // The UI builds gauges, the documentation builds its tables and the export
  // builds its columns from this one array. A metric added here appears
  // everywhere; there is no second list to keep in sync.
  //
  // Wszystkie siedem wielkości jest dostępnych dla każdego, bez warunków —
  // w tym katalogu nie ma i nie ma być pola dzielącego je na dostępne i nie.
  Metrics.CATALOGUE = [
    {
      id: 'share',
      namePL: 'Udział niebieskiego',
      unit: '%',
      shortPL: 'Ile z widzianego światła przypada na kanał niebieski.',
      helpPL: 'Izoluje barwę od jasności — to ta wartość zmienia się, gdy włączysz tryb nocny.',
      decimals: 0, min: 0, max: 60,
      warn: 26, crit: 33, invert: false
    },
    {
      id: 'brightness',
      namePL: 'Jasność sceny',
      unit: '%',
      shortPL: 'Średnia jasność obrazu z kamery.',
      helpPL: 'Wartość względna, nie luksy — automatyka ekspozycji kamery przesuwa ją pod spodem.',
      decimals: 0, min: 0, max: 100,
      warn: 70, crit: 88, invert: false
    },
    {
      id: 'kelvin',
      namePL: 'Temperatura barwowa',
      unit: 'K',
      shortPL: 'Czy światło jest ciepłe, czy chłodne.',
      helpPL: 'Poniżej 3000 K światło jest ciepłe i wieczorem łagodniejsze. 6500 K to domyślna biel większości ekranów.',
      decimals: 0, min: 1500, max: 9000,
      warn: 4600, crit: 6000, invert: false
    },
    {
      id: 'melanopic',
      namePL: 'Wpływ na rytm dobowy',
      unit: '×',
      shortPL: 'Jak mocno to światło działa na zegar biologiczny.',
      helpPL: 'Przybliżenie współczynnika melanopicznego. 1,00 to neutralna biel dzienna; wieczorem warto schodzić poniżej 0,50.',
      decimals: 2, min: 0, max: 1.6,
      warn: 0.75, crit: 1.0, invert: false
    },
    {
      id: 'flicker',
      namePL: 'Migotanie',
      unit: '%',
      shortPL: 'Niewidoczne pulsowanie źródła światła.',
      helpPL: 'Tanie ściemniacze i podświetlenia pulsują. Oko tego nie widzi, ale bywa to przyczyną zmęczenia i bólu głowy.',
      decimals: 1, min: 0, max: 60,
      warn: 8, crit: 20, invert: false
    },
    {
      id: 'uniformity',
      namePL: 'Równomierność',
      unit: '%',
      shortPL: 'Czy światło rozkłada się równo w kadrze.',
      helpPL: 'Niska wartość na ekranie oznacza przeświecanie podświetlenia lub odbicie; na biurku — źle ustawioną lampę.',
      decimals: 0, min: 0, max: 100,
      warn: 60, crit: 35, invert: true
    },
    {
      id: 'comfort',
      namePL: 'Komfort wzrokowy',
      unit: 'pkt',
      shortPL: 'Jedna ocena zamiast sześciu liczb.',
      helpPL: 'Składa pozostałe pomiary w wynik 0–100 i pokazuje, co najbardziej go obniża. Wagi są naszą oceną redakcyjną, nie normą.',
      decimals: 0, min: 0, max: 100,
      warn: 70, crit: 45, invert: true
    }
  ];

  Metrics.byId = function (id) {
    for (var i = 0; i < Metrics.CATALOGUE.length; i += 1) {
      if (Metrics.CATALOGUE[i].id === id) return Metrics.CATALOGUE[i];
    }
    return null;
  };

  Metrics.formatValue = function (id, value) {
    var m = Metrics.byId(id);
    if (!m || value === null || value === undefined || !isFinite(value)) return '—';
    if (m.decimals === 0) return String(Math.round(value));
    return value.toFixed(m.decimals).replace('.', ',');
  };

  global.Metrics = Metrics;
})(typeof window !== 'undefined' ? window : globalThis);
