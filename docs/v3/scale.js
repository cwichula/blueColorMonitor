/* Monitor Światła v3 — scale.js
 *
 * Two jobs, both of them pure:
 *
 *   1. GEOMETRY. Every position, every band and every zone in the application
 *      comes from this file. Two implementations of the same formula in two
 *      files drift apart within a week, so the dial, the micro scale in a
 *      channel row and the recorder tape all ask here instead of doing their
 *      own arithmetic on pixels.
 *
 *   2. WORDING. Every Polish string the interface can show lives in Scale.TEXT
 *      (chapter 8 of DESIGN.md, transcribed literally). No other file writes a
 *      Polish literal — that is what keeps the wording reviewable in one place
 *      and stops four authors from inventing four different vocabularies.
 *
 * No DOM, no engine, no bus, no storage. Everything below can be checked in a
 * plain console with nothing else loaded except metrics.js.
 *
 * Thresholds are ALWAYS passed in by the caller (from Engine.getThresholds()),
 * never read from the catalogue: the user may have moved them.
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
   *  Computed from ALL SEVEN metrics — every one of them is measured and
   *  shown for everybody, so the verdict has the whole reading behind it.
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

  /* ==================================================================
     Scale.TEXT — chapter 8 of DESIGN.md, word for word.
     The single source of Polish in this application.
     ================================================================== */

  Scale.TEXT = {

    /* ---- 8.1 status rail and keys ---- */

    app: {
      name: 'MONITOR ŚWIATŁA',
      title: 'Monitor Światła'
    },

    state: {
      idle: 'Gotowy',
      starting: 'Uruchamiam',
      running: 'Pomiar',
      runningTpl: 'Pomiar {time}',
      stopped: 'Zatrzymany',
      error: 'Błąd kamery',
      hz: '5,0 Hz'
    },

    keys: {
      start: 'Start pomiaru',
      starting: 'Uruchamiam…',
      stop: 'Stop',
      flip: 'Obróć',
      flipAria: 'Przełącz kamerę przód/tył',
      menu: 'Menu',
      menuAria: 'Spis modułów',
      back: '‹ Wróć',
      backAria: 'Wróć do pulpitu',
      dash: 'Pulpit',
      zoom: 'Powiększ podgląd',
      retry: 'Spróbuj ponownie',
      refresh: 'Odśwież',
      close: 'Zamknij'
    },

    monitor: {
      legend: 'Podgląd kontrolny',
      badge: 'Na żywo',
      open: 'Powiększ podgląd'
    },

    /* Full-screen aiming view. The instruction line is not spelled out in
       chapter 8; it repeats what the reticle actually promises (0.4). */
    aim: {
      titlePL: 'Celowanie',
      hintPL: 'Ramka pokazuje dokładnie ten wycinek obrazu, który mierzy aplikacja.',
      close: 'Zamknij',
      flip: 'Obróć'
    },

    /* ---- 8.2 the readout well ---- */

    readout: {
      legend: 'Kanał główny',
      helpAriaTpl: 'Co oznacza: {name}',
      thresholdTpl: '(próg {value})',
      contextTpl: 'min {min} · śr. {avg} · maks {max} — ostatnie 60 s',
      contextEmpty: 'brak danych z ostatnich 60 s',
      approxSign: '≈'
    },

    stamp: {
      good: 'W normie',
      warning: 'Uwaga',
      critical: 'Krytycznie',
      none: 'Brak danych',
      settling: 'Ustalam'
    },

    /* ---- 8.3 verdicts, keyed [zone][culprit] ---- */

    verdict: {
      /* Situations that are not a reading at all (8.2). */
      idle: 'Naciśnij „Start pomiaru”, skieruj telefon na oświetloną powierzchnię i trzymaj nieruchomo kilka sekund.',
      warmup: 'Ustalam ocenę — trzymaj telefon nieruchomo jeszcze chwilę.',
      noValue: 'Ta wielkość nie daje się teraz zmierzyć. Sprawdź, czy obiektyw nie jest zasłonięty.',
      stoppedTpl: 'Pomiar zakończony · {time} · zapisano w historii.',

      good: {
        any: 'To światło jest w porządku — nic nie przekracza ustawionych progów.'
      },

      warning: {
        share: 'Sporo tego światła przypada na kanał niebieski. Wieczorem warto je przyciemnić.',
        brightness: 'Scena jest jasna — kamera pracuje blisko górnej granicy pomiaru.',
        kelvin: 'Światło jest dość chłodne. Wieczorem łagodniejsza bywa żarówka około 2700 K.',
        melanopic: 'To światło dość mocno działa na zegar biologiczny.',
        flicker: 'Źródło światła wyraźnie pulsuje.',
        uniformity: 'Światło rozkłada się nierówno w kadrze.',
        comfort: 'Komfort wzrokowy jest obniżony — złożyło się na to kilka rzeczy naraz.'
      },

      critical: {
        share: 'Bardzo dużo niebieskiego. Wieczorem włącz tryb nocny albo zmień źródło światła.',
        brightness: 'Scena jest bardzo jasna. Nie mierz, patrząc prosto w źródło światła.',
        kelvin: 'Światło jest zimne. Wieczorem to najbardziej męczy oczy — cieplejsza żarówka albo tryb nocny pomogą.',
        melanopic: 'To światło mocno działa na zegar biologiczny. Wieczorem warto zejść poniżej 0,50.',
        flicker: 'Źródło światła mocno pulsuje. To bywa przyczyną zmęczenia oczu i bólu głowy.',
        uniformity: 'Światło rozkłada się bardzo nierówno. Sprawdź ustawienie lampy albo odbicia na ekranie.',
        comfort: 'Komfort wzrokowy jest niski. Zajrzyj do modułu 01, żeby zobaczyć, co go obniża.'
      }
    },

    /* ---- 8.4 notes about the limits of the measurement ---- */

    note: {
      titleLimits: 'Czego ta liczba nie mówi',
      titleWarning: 'Uwaga',

      dashTitle: 'Czym ten pomiar nie jest',
      dashText: 'Aparat telefonu ma trzy szerokie kanały barwne i automatyczny balans bieli — nie mierzy widma. Temperatura barwowa i wpływ na rytm dobowy są przybliżeniami wyliczonymi z barw sRGB. Aplikacja dobrze pokazuje różnice i zmiany w czasie, nie zastępuje miernika i nie stawia żadnej diagnozy. Monitor Światła nie jest wyrobem medycznym w rozumieniu rozporządzenia (UE) 2017/745, nie służy do diagnozowania, zapobiegania, monitorowania ani leczenia jakiegokolwiek stanu chorobowego i nie zastępuje badania u lekarza ani optometrysty.',

      approxLegend: '≈ wartość przybliżona — wyliczona z barw sRGB, nie z pomiaru widma.',
      kelvinOutOfRange: 'Poza zakresem metody — przy tej barwie wzór na temperaturę barwową przestaje być wiarygodny.',
      flickerOutOfRange: 'Poza zakresem metody — próbkowanie 5 Hz widzi pulsowanie tylko poniżej 2,5 Hz. Sieciowe 100 Hz jest poza zasięgiem i aplikacja nigdy nie poda go jako wyniku.',

      helpTitle: 'Czego ta liczba nie mówi',
      helpText: 'Aparat telefonu ma trzy szerokie kanały i nie mierzy widma. Ta wartość jest wskaźnikiem porównawczym — dobrze pokazuje różnice między światłami i zmiany w czasie, a nie wynikiem pomiaru laboratoryjnego ani informacją medyczną.',

      calibration: 'Pomiar bez kalibracji — wartości traktuj porównawczo.',

      howToTitle: 'Jak mierzyć sensownie',
      howTo: [
        { titlePL: 'Trzymaj telefon nieruchomo', textPL: 'Automatyka ekspozycji potrzebuje 2–3 sekund, żeby się ustabilizować.' },
        { titlePL: 'Kieruj na oświetloną powierzchnię', textPL: 'Biała kartka albo jasna ściana. Nie mierz, patrząc prosto w źródło światła.' },
        { titlePL: 'Porównuj, nie oceniaj bezwzględnie', textPL: 'Ta sama scena przed zmianą i po zmianie oświetlenia mówi więcej niż jedna liczba.' }
      ]
    },

    /* ---- 8.5 transient messages ---- */

    transient: {
      firstRun: 'Zacznij od klawisza „Start pomiaru” na dole ekranu. Kamera włączy się dopiero po naciśnięciu.',
      measureStopped: 'Pomiar zakończony · {time} · zapisano w historii.',
      leadChanged: 'Kanał główny: {name}, {value}, {zone}.',
      warmupDone: 'Ocena gotowa. {name} {value}, {zone}.',
      newVersion: 'Jest nowa wersja aplikacji.',
      newVersionKey: 'Odśwież',
      thresholdsSaved: 'Zapisano progi.',
      thresholdsRejected: 'Nie zapisano — próg uwagi i próg krytyczny nie mogą się mijać.',
      historyCleared: 'Wyczyszczono historię.'
    },

    /* Live-region wording (7.6). Same sentences as above, kept under their own
       key so the announcer does not have to know it is quoting 8.5. */
    live: {
      lead: 'Kanał główny: {name}, {value}, {zone}.',
      ready: 'Ocena gotowa. {name} {value}, {zone}.',
      started: 'Pomiar rozpoczęty.',
      stopped: 'Pomiar zakończony · {time} · zapisano w historii.'
    },

    /* How a screen reader should hear a value. The '%' sign and the '×' are
       symbols; spoken they need a word. */
    spoken: {
      noValue: 'brak danych',
      units: {
        share: 'procent',
        brightness: 'procent',
        kelvin: 'kelwinów',
        melanopic: 'razy',
        flicker: 'procent',
        uniformity: 'procent',
        comfort: 'punktów'
      },
      zones: {
        good: 'w normie',
        warning: 'uwaga',
        critical: 'krytycznie',
        none: 'brak danych'
      }
    },

    /* ---- 8.6 empty screens ---- */

    empty: {
      recorderNoHistory: 'Nie ma jeszcze żadnych zapisów. Historia zapisuje się w trakcie pomiaru — uruchom pomiar na minutę i wróć tutaj.',
      recorderNoRange: 'W tym zakresie nie było pomiaru.',
      coverageTpl: 'Pomiar objął {done} z {total} godzin.',
      reportsNoData: 'Raport dobowy powstanie po pierwszym pełnym dniu z pomiarami.',
      compareOneSession: 'Do porównania potrzebne są dwie zakończone sesje. Masz na razie jedną.',
      exportNoData: 'Nie ma czego wyeksportować. Uruchom pomiar, żeby historia miała treść.',
      alertsOff: 'Alerty są wyłączone. Po włączeniu zadziałają tylko wtedy, gdy aplikacja jest otwarta.',
      scheduleEmpty: 'Nie ustawiono żadnej pory. Harmonogram działa tylko przy otwartej aplikacji.',
      historyEmpty: 'Historia jest pusta.'
    },

    /* ---- 8.8 the module index ---- */

    menu: {
      titlePL: 'Spis modułów'
    },

    modules: {
      '01': { no: '01', titlePL: 'Rejestrator', descPL: 'Przebieg pomiaru w czasie, od minuty do trzydziestu dni.' },
      '02': { no: '02', titlePL: 'Progi', descPL: 'Ustaw własne granice ostrzeżenia i alarmu dla każdej wielkości.' },
      '03': { no: '03', titlePL: 'Kalibracja', descPL: 'Odniesienie do znanego źródła światła i to, czego kalibracja nie naprawi.' },
      '04': { no: '04', titlePL: 'Raporty', descPL: 'Zestawienia dobowe i tygodniowe w formie wydruku.' },
      '05': { no: '05', titlePL: 'Eksport', descPL: 'Zapis odczytów do pliku CSV lub JSON z opisem kolumn.' },
      '06': { no: '06', titlePL: 'Porównanie', descPL: 'Dwie sesje obok siebie, z różnicą podaną liczbowo.' },
      '07': { no: '07', titlePL: 'Test ekranu', descPL: 'Plansze do sprawdzenia własnego monitora, krok po kroku.' },
      '08': { no: '08', titlePL: 'Harmonogram', descPL: 'Automatyczne pomiary o zadanych porach.' },
      '09': { no: '09', titlePL: 'Alerty', descPL: 'Powiadomienie po przekroczeniu progu — i kiedy ono nie zadziała.' },
      '10': { no: '10', titlePL: 'Wsparcie', descPL: 'Aplikacja jest w całości darmowa. Tu można postawić kawę autorowi.' },
      '11': { no: '11', titlePL: 'Dokumentacja', descPL: 'Czym ten pomiar jest, a czym na pewno nie jest.' },
      '12': { no: '12', titlePL: 'Ustawienia', descPL: 'Motyw, rozmiar tekstu, ograniczenie ruchu, czyszczenie historii.' }
    },

    /* ---- wording the components need, derived from chapters 4-7 ---- */

    errata: {
      titlePL: 'Błąd kamery',
      retry: 'Spróbuj ponownie'
    },

    channels: {
      groupAria: 'Kanały pomiarowe',
      pick: 'Pokaż na dużym wyświetlaczu',
      stale: 'brak danych',
      approx: 'wartość przybliżona'
    },

    /* Accessible names for the dashboard (5.1, 5.3, 5.4, 7.6). The eye gets the
       shape, the colour and the micro scale; a screen reader gets the same three
       facts as words, and only from here. Every {value}, {min}, {max}, {warn}
       and {crit} arrives already spoken — Scale.spoken() puts the unit into
       words and turns a missing number into 'brak danych', so no accessible name
       ever contains '———' or a bare '%'. */
    aria: {
      help: 'Co oznacza: {name}',
      channel: '{name}, {value}, {zone}. Pokaż na dużym wyświetlaczu.',
      channelStale: '{name}, brak danych. Pokaż na dużym wyświetlaczu.',
      scale: 'Skala: {name}, od {min} do {max}. Teraz {value}, {zone}. Próg uwagi {warn}, próg krytyczny {crit}.',
      readout: '{name}: {value}, {zone}.',
      readoutApprox: '{name}: około {value}, {zone}. Wartość przybliżona.'
    },

    livebar: {
      stopped: 'Pomiar zatrzymany',
      key: 'Pulpit'
    },

    help: {
      titleTpl: 'Co oznacza: {name}',
      unit: 'Jednostka',
      range: 'Zakres',
      thresholds: 'Progi',
      warn: 'Próg uwagi',
      crit: 'Próg krytyczny',
      now: 'teraz'
    },

    recorder: {
      rangeAria: 'Zakres czasu',
      ranges: {
        '60s': '60 s',
        '15min': '15 min',
        '1h': '1 godz',
        '24h': '24 godz',
        '30d': '30 dni'
      },
      gap: 'brak pomiaru',
      sessionTitle: 'Statystyka sesji',
      zonesCaption: 'Rozkład stref dla udziału niebieskiego',
      tableCaption: 'Odczyty z wybranego zakresu',
      crosshair: 'Krzyż odczytu',
      prevAria: 'Wcześniejszy punkt',
      nextAria: 'Późniejszy punkt',
      colTime: 'Godzina'
    },

    settings: {
      themeLabel: 'Motyw',
      themeSystem: 'Jak w systemie',
      themeLight: 'Jasny',
      themeDark: 'Ciemny',
      textLabel: 'Rozmiar tekstu',
      text1: '×1',
      text115: '×1,15',
      text13: '×1,3',
      motionLabel: 'Ogranicz ruch',
      clearLabel: 'Wyczyść historię',
      clearConfirm: 'Wyczyścić całą historię pomiarów? Tego nie da się cofnąć.',
      clearKey: 'Wyczyść'
    },

    common: {
      /* One em dash, not three. Three in a row are not a placeholder, they are a
         RULE: at readout size they paint a black bar across the well and at row
         size they draw a line where the value should be. A single em dash is the
         typographic mark for "no value" and cannot be mistaken for anything else. */
      noValue: '—',
      close: 'Zamknij',
      cancel: 'Anuluj',
      save: 'Zapisz',
      reset: 'Przywróć domyślne',
      yes: 'Tak',
      no: 'Nie',
      on: 'Włączone',
      off: 'Wyłączone',
      sep: ' · '
    }
  };

  /* ==================================================================
     Scale.TEXT.modules — wording owned by modules.js (modules 02-09).

     Chapter 8 of DESIGN.md has no table for these screens, so the sentences
     below follow 8.9: second person, imperative, no promise of an outcome and
     none of the forbidden words. Where v2 already had a proven Polish sentence
     for the same function (docs/v2/tools.js) it is carried over verbatim.

     Each module keeps its wording under its own number, next to the {no,
     titlePL, descPL} triple the module index already reads.
     ================================================================== */

  (function (M) {

    /* ---- 02 Progi ---- */

    M['02'].introTitle = 'Po co własne progi';
    M['02'].intro = 'Próg decyduje, kiedy aplikacja mówi „Uwaga”, a kiedy „Krytycznie”. Wartości domyślne są naszą oceną redakcyjną, nie normą — jeśli mierzysz w innych warunkach, przesuń je pod siebie. Ocena i zdanie na pulpicie liczą się od razu z nowych progów.';
    M['02'].warnLabel = 'Próg uwagi';
    M['02'].critLabel = 'Próg krytyczny';
    M['02'].orderNormal = 'Próg uwagi musi leżeć poniżej krytycznego.';
    M['02'].orderInvert = 'Tu wyższa wartość jest lepsza, więc próg uwagi leży powyżej krytycznego.';
    M['02'].sliderAriaTpl = '{name} — {which}';
    M['02'].previewAriaTpl = 'Podgląd skali: {name}';
    M['02'].nowTpl = 'teraz {value}';
    M['02'].resetDone = 'Przywrócono progi domyślne.';
    M['02'].profilesTitle = 'Profile';
    M['02'].profilesHint = 'Profil to zapisany komplet progów wszystkich siedmiu wielkości. Zastosowanie profilu podmienia je naraz.';
    M['02'].profileApply = 'Zastosuj';
    M['02'].profileRemove = 'Usuń';
    M['02'].profileSaveKey = 'Zapisz bieżące progi';
    M['02'].profileNameLabel = 'Nazwa nowego profilu';
    M['02'].profileNameHint = 'Nazwa zostaje na tym urządzeniu. Maksymalnie 40 znaków.';
    M['02'].profileNameEmpty = 'Podaj nazwę profilu.';
    M['02'].profileSavedTpl = 'Zapisano profil „{name}”.';
    M['02'].profileAppliedTpl = 'Zastosowano profil „{name}”.';
    M['02'].profileRemovedTpl = 'Usunięto profil „{name}”.';
    M['02'].profileFailed = 'Nie udało się zastosować tego profilu.';
    M['02'].profileCustomTpl = 'Własny profil zapisany {date}.';
    M['02'].builtin = [
      { id: 'builtin.default', namePL: 'Domyślny',
        descPL: 'Progi z katalogu wielkości — punkt wyjścia dla wszystkich pomiarów.' },
      { id: 'builtin.evening', namePL: 'Wieczór — łagodny',
        descPL: 'Ostrzega wcześniej o chłodnej barwie i wpływie na rytm dobowy.' },
      { id: 'builtin.work', namePL: 'Praca przy biurku',
        descPL: 'Dopuszcza jasne, chłodne światło dzienne; pilnuje migotania i równomierności.' }
    ];

    /* ---- 03 Kalibracja ---- */

    M['03'].whyTitle = 'Dlaczego to działa';
    M['03'].why = 'Matryca aparatu ma stały odchył między kanałami. Zmierzenie białej kartki pokazuje, jak duży on jest, i pozwala go odjąć. To jedyna funkcja w tej aplikacji, która realnie podnosi dokładność — i nadal nie zamienia aparatu w spektrometr.';
    M['03'].stepsTitle = 'Krok po kroku';
    M['03'].steps = [
      'Połóż białą kartkę pod mierzonym światłem.',
      'Naciśnij „Start pomiaru” na pulpicie i wypełnij kadr kartką.',
      'Wróć tutaj, naciśnij „Kalibruj” i nie ruszaj telefonem przez trzy sekundy.'
    ];
    M['03'].runKey = 'Kalibruj (3 s)';
    M['03'].clearKey = 'Usuń kalibrację';
    M['03'].busyTpl = 'Mierzę kartkę… zostało {sec} s';
    M['03'].statusNone = 'Brak kalibracji. Pomiar działa, wartości traktuj porównawczo.';
    M['03'].statusOnTpl = 'Skalibrowano {date} o {time}.';
    M['03'].gainsTitle = 'Wzmocnienia kanałów';
    M['03'].colChannel = 'Kanał';
    M['03'].colGain = 'Wzmocnienie';
    M['03'].gainR = 'Czerwony';
    M['03'].gainG = 'Zielony';
    M['03'].gainB = 'Niebieski';
    M['03'].gainsNone = 'nie ustawione';
    M['03'].needRunning = 'Najpierw uruchom pomiar i skieruj kamerę na białą kartkę.';
    M['03'].tooFew = 'Za mało próbek. Sprawdź, czy pomiar naprawdę działa.';
    M['03'].tooDark = 'Obraz jest za ciemny do kalibracji. Doświetl kartkę i spróbuj ponownie.';
    M['03'].refused = 'Odchył kanałów jest za duży, żeby uznać go za kalibrację. Użyj białej kartki w równym świetle.';
    M['03'].done = 'Skalibrowano. Temperatura barwowa i wpływ na rytm dobowy będą teraz dokładniejsze.';
    M['03'].cleared = 'Kalibracja usunięta.';
    M['03'].limitsTitle = 'Czego kalibracja nie naprawia';
    M['03'].limits = [
      'Kalibracja wyrównuje trzy kanały aparatu i nic poza tym. Nie daje aparatowi widma, więc temperatura barwowa i wpływ na rytm dobowy zostają przybliżeniami wyliczonymi z barw sRGB.',
      'Nie zamienia jasności sceny w wielkość bezwzględną — ta liczba pozostaje względna. Nie wyłącza automatyki ekspozycji ani balansu bieli, które przesuwają odczyt pod spodem.',
      'Nie przenosi się na inne światło: kalibracja zrobiona pod żarówką opisuje tę żarówkę. Przy innym źródle powtórz ją. I nie zmienia niczego w tym, czym ten pomiar nie jest — nadal nie jest badaniem ani podstawą do rozpoznania choroby.'
    ];

    /* ---- 04 Raporty ---- */

    M['04'].rangeAria = 'Okres raportu';
    M['04'].rangeDay = 'Doba';
    M['04'].rangeWeek = 'Tydzień';
    M['04'].headTpl = 'Od {from} do {to} · {count} punktów historii.';
    M['04'].tableTitle = 'Zestawienie';
    M['04'].tableCaption = 'Średnia, minimum i maksimum w wybranym okresie';
    M['04'].colMetric = 'Wielkość';
    M['04'].colAvg = 'Średnia';
    M['04'].colMin = 'Minimum';
    M['04'].colMax = 'Maksimum';
    M['04'].panoramaTitle = 'Panorama';
    M['04'].panoramaAriaTpl = 'Panorama: {name}, {span}.';
    M['04'].panoramaSpanDay = 'ostatnia doba w podziale na godziny';
    M['04'].panoramaSpanWeek = 'ostatni tydzień w podziale na dni';
    M['04'].panoramaHint = 'Wysokość i barwa słupka mówią to samo: w normie — niski, uwaga — średni, krytycznie — pełny. Kreska przy podstawie oznacza godzinę bez pomiaru.';
    M['04'].coverageDayTpl = 'Pomiar objął {done} z {total} godzin.';
    M['04'].coverageWeekTpl = 'Pomiar objął {done} z {total} dni.';
    M['04'].zonesTitle = 'Rozkład stref';
    M['04'].zonesCaptionTpl = 'Liczone dla kanału głównego: {name}.';
    M['04'].zoneGood = 'W normie';
    M['04'].zoneWarning = 'Uwaga';
    M['04'].zoneCritical = 'Krytycznie';
    M['04'].worstTpl = 'Najtrudniejsza pora: {value}.';
    M['04'].worstNone = 'brak wyraźnej';
    M['04'].worstHourTpl = 'godzina {hour}';
    M['04'].adviceTitle = 'Co z tym zrobić';
    M['04'].adviceMelanopicTpl = 'Średni wpływ na rytm dobowy wyniósł {value}×. Wieczorem warto zejść poniżej 0,50 — najprościej przez cieplejszą żarówkę albo tryb nocny.';
    M['04'].adviceKelvinTpl = 'Światło było chłodne (średnio {value} K). Do pracy to bez zarzutu; na dwie godziny przed snem łagodniejsze jest poniżej 3000 K.';
    M['04'].adviceFlickerTpl = 'Widać zauważalne migotanie (średnio {value}%). Zwykle odpowiada za nie tani ściemniacz albo zasilacz podświetlenia.';
    M['04'].adviceUniformityTpl = 'Światło rozkłada się nierówno ({value}%). Przesunięcie lampy albo zmiana kąta zwykle daje więcej niż wymiana żarówki.';
    M['04'].adviceWorstTpl = 'Najwięcej odczytów poza progami skupia się o godzinie {hour}.';
    M['04'].adviceNone = 'W tym okresie nic nie wybija się ponad ustawione progi.';
    M['04'].limitsTitle = 'To nie jest porada zdrowotna';
    M['04'].limits = 'Wnioski wynikają wyłącznie z tego, co zobaczyła kamera tego telefonu. Aplikacja nie mierzy widma i nie stawia żadnego rozpoznania. Monitor Światła nie jest wyrobem medycznym w rozumieniu rozporządzenia (UE) 2017/745, nie służy do diagnozowania, zapobiegania, monitorowania ani leczenia jakiegokolwiek stanu chorobowego i nie zastępuje badania u lekarza ani optometrysty.';
    M['04'].printHint = 'Ta strona jest pomyślana jak wydruk: tabela i podpisy czytają się tak samo na papierze, w lupie systemowej i w czytniku ekranu.';

    /* ---- 05 Eksport ---- */

    M['05'].rangeAria = 'Zakres danych';
    M['05'].range1h = 'Godzina';
    M['05'].range24h = 'Doba';
    M['05'].range7d = '7 dni';
    M['05'].range30d = '30 dni';
    M['05'].csvKey = 'Zapisz plik CSV';
    M['05'].jsonKey = 'Zapisz plik JSON';
    M['05'].formatTitle = 'Format pliku';
    M['05'].formatCsv = 'CSV: średnik rozdziela kolumny, przecinek jest separatorem dziesiętnym, kodowanie UTF-8 ze znacznikiem BOM. Taki plik polski Excel otwiera bez ustawiania czegokolwiek.';
    M['05'].formatJson = 'JSON: te same dane w polu „points”, z kropką dziesiętną i znacznikiem czasu w milisekundach — tego wymaga format.';
    M['05'].resolution = 'Historia zapisuje jeden punkt co 5 sekund i sięga 30 dni wstecz. Pełnej rozdzielczości pięciu próbek na sekundę plik nie zawiera — silnik trzyma ją tylko przez minutę.';
    M['05'].offline = 'Plik powstaje w urządzeniu i zostaje w urządzeniu. Eksport nie łączy się z siecią.';
    M['05'].columnsTitle = 'Opis kolumn';
    M['05'].columnsCaption = 'Kolumny pliku i ich znaczenie';
    M['05'].colName = 'Kolumna';
    M['05'].colMeaning = 'Co zawiera';
    M['05'].colDate = 'Data';
    M['05'].colTime = 'Godzina';
    M['05'].colZone = 'Strefa';
    M['05'].descDate = 'Data punktu z zegara urządzenia, w zapisie dzień-miesiąc-rok.';
    M['05'].descTime = 'Godzina punktu z dokładnością do sekundy.';
    M['05'].descZone = 'Strefa udziału niebieskiego w chwili zapisu. Silnik zapisuje strefę tylko dla tej jednej wielkości — dla pozostałych policz ją z progów.';
    M['05'].descMetricTpl = '{short} Jednostka: {unit}. Zakres {min}–{max}.';
    M['05'].previewTitle = 'Podgląd';
    M['05'].previewHint = 'Pierwsze pięć wierszy pliku, dokładnie tak, jak zostaną zapisane.';
    M['05'].savedTpl = 'Zapisano plik {name} — {rows} wierszy.';
    M['05'].failed = 'Ta przeglądarka nie pozwoliła zapisać pliku.';

    /* ---- 06 Porównanie ---- */

    M['06'].intro = 'Aplikacja zapisuje każdą zakończoną sesję pomiaru na tym urządzeniu. Wybierz dwie, żeby zobaczyć je na jednej taśmie i przeczytać różnicę liczbowo.';
    M['06'].noSessions = 'Nie ma jeszcze żadnej zakończonej sesji. Uruchom pomiar, zatrzymaj go i wróć tutaj.';
    M['06'].slotA = 'Sesja A';
    M['06'].slotB = 'Sesja B';
    M['06'].sessionTpl = '{date}, {time} · {dur}';
    M['06'].tapeTitle = 'Taśma';
    M['06'].tapeAriaTpl = 'Przebieg sesji {slot}, wielkość {name}.';
    M['06'].tapeHint = 'Obie sesje rozciągnięte na tę samą szerokość: słupek to ta sama część czasu trwania, nie ta sama godzina. Wysokość i barwa mówią to samo co na pulpicie.';
    M['06'].tapeChannelTpl = 'Taśma pokazuje kanał główny: {name}.';
    M['06'].diffTitle = 'Różnica';
    M['06'].diffCaption = 'Średnie obu sesji i różnica między nimi';
    M['06'].colMetric = 'Wielkość';
    M['06'].colA = 'A';
    M['06'].colB = 'B';
    M['06'].colDiff = 'B − A';
    M['06'].clearKey = 'Usuń zapisane sesje';
    M['06'].cleared = 'Usunięto zapisane sesje.';
    M['06'].savedTpl = 'Zapisano sesję: {dur}.';
    M['06'].limitsTitle = 'Czego to porównanie nie mówi';
    M['06'].limits = 'Porównujesz dwa pomiary, nie dwa źródła światła. Jeżeli między sesjami zmienił się kadr, odległość, pora dnia albo ustawienie telefonu, różnica jest także o tym. Najuczciwsze porównanie to ta sama scena przed zmianą i po zmianie oświetlenia.';
    M['06'].keepTpl = 'Pamiętanych jest najwyżej {count} ostatnich sesji.';

    /* ---- 07 Test ekranu ---- */

    M['07'].intro = 'Plansze kontrolne wyświetlają się na całym ekranie tego urządzenia. Służą do obejrzenia ekranu okiem: czy biel jest równa, czy szarości nie wpadają w kolor i czy podświetlenie nie przecieka po rogach.';
    M['07'].stepsTitle = 'Krok po kroku';
    M['07'].steps = [
      'Ustaw jasność ekranu na taką, przy której zwykle pracujesz, i wyłącz systemowy tryb nocny.',
      'Wybierz planszę z listy poniżej. Wypełni cały ekran.',
      'Patrz z odległości mniej więcej sześćdziesięciu centymetrów, prostopadle do ekranu. Potem obejrzyj tę samą planszę pod kątem.',
      'Wyjdź klawiszem „Zamknij planszę” albo klawiszem Escape i przejdź do następnej.'
    ];
    M['07'].planesTitle = 'Plansze';
    M['07'].exitKey = 'Zamknij planszę';
    M['07'].showKey = 'Pokaż';
    M['07'].showAriaTpl = 'Pokaż planszę: {name}';
    M['07'].planeAriaTpl = 'Plansza kontrolna: {name}. Klawisz zamknięcia na dole ekranu.';
    M['07'].planes = [
      { id: 'white', namePL: 'Biel', hintPL: 'Szukaj plam, przebarwień i pojaśnień przy krawędziach. Biel powinna być jednym kolorem na całej powierzchni.' },
      { id: 'gray75', namePL: 'Szarość 75%', hintPL: 'Szarość ma być szara. Zielonkawy albo różowy odcień oznacza rozjechany balans bieli ekranu.' },
      { id: 'gray50', namePL: 'Szarość 50%', hintPL: 'Najlepsza plansza do oceny odcienia. Porównaj środek z rogami.' },
      { id: 'gray25', namePL: 'Szarość 25%', hintPL: 'Ciemna szarość pokazuje przecieki podświetlenia i pasy na tanich matrycach.' },
      { id: 'black', namePL: 'Czerń', hintPL: 'W ciemnym pokoju widać tu każdą nieszczelność podświetlenia i rozjaśnione rogi.' },
      { id: 'red', namePL: 'Czysta czerwień', hintPL: 'Jednolita czerwień ujawnia martwe subpiksele i nierówności matrycy.' },
      { id: 'green', namePL: 'Czysta zieleń', hintPL: 'Zieleń niesie najwięcej jasności — na niej najłatwiej wypatrzyć uszkodzony piksel.' },
      { id: 'blue', namePL: 'Czysty błękit', hintPL: 'Błękit pokazuje brud i smugi na powierzchni ekranu lepiej niż biel.' },
      { id: 'grid', namePL: 'Siatka', hintPL: 'Linie mają być równie ostre w rogach jak w środku. Rozmycie na brzegach to sprawa skalowania obrazu.' }
    ];
    M['07'].warnTitle = 'Uwaga';
    M['07'].warn = 'Plansza zasłania cały ekran, także pulpit sterowania z klawiszem pomiaru. To jedyne miejsce w aplikacji, gdzie tak się dzieje, i dlatego klawisz wyjścia jest duży i zawsze widoczny. Dopóki plansza jest na ekranie, pomiar biegnie dalej i nie da się go zatrzymać — zamknij planszę, żeby wrócić do klawiszy.';
    M['07'].cameraTitle = 'Czego tu nie zrobisz';
    M['07'].camera = 'Telefon nie widzi własnego ekranu, więc tych plansz nie zmierzysz tym samym urządzeniem. Żeby zmierzyć monitor, wyświetl planszę na monitorze, a pomiar prowadź telefonem — to dwa różne urządzenia i dwie różne role.';

    /* ---- 08 Harmonogram ---- */

    M['08'].intro = 'Harmonogram przypomina o pomiarze o ustalonej porze. Kamery nie włącza sam: o wyznaczonej godzinie pokazuje przypomnienie, a pomiar uruchamiasz klawiszem „Start pomiaru” na pulpicie. Tak samo jak za pierwszym razem.';
    M['08'].onlyOpenTitle = 'Kiedy to nie zadziała';
    M['08'].onlyOpen = 'Harmonogram działa tylko przy otwartej aplikacji. Zamknięta karta przeglądarki nie liczy czasu i o niczym nie przypomni. Nie prosimy o zgodę na powiadomienia systemowe i niczego nie wysyłamy do sieci.';
    M['08'].enableLabel = 'Włącz przypomnienia';
    M['08'].timesTitle = 'Pory';
    M['08'].timeAriaTpl = 'Pora {n}: godzina przypomnienia';
    M['08'].addKey = 'Dodaj porę';
    M['08'].removeKey = 'Usuń';
    M['08'].removeAriaTpl = 'Usuń porę {time}';
    M['08'].addedTpl = 'Dodano porę {time}.';
    M['08'].removedTpl = 'Usunięto porę {time}.';
    M['08'].badTime = 'Podaj godzinę w formacie 22:00.';
    M['08'].nextTpl = 'Najbliższe przypomnienie: {time}.';
    M['08'].nextNone = 'Przypomnienia są wyłączone.';
    M['08'].dueTpl = 'Zaplanowana pora pomiaru: {time}.';
    M['08'].dueKey = 'Pokaż pulpit';

    /* ---- 09 Alerty ---- */

    M['09'].intro = 'Alert pilnuje jednej wielkości i odzywa się dopiero wtedy, gdy trzyma ona wybraną strefę nieprzerwanie przez ustawiony czas. Nigdy nie zatrzymuje pomiaru i nigdy nie zasłania klawiszy.';
    M['09'].enableLabel = 'Włącz alerty';
    M['09'].metricLabel = 'Pilnowana wielkość';
    M['09'].levelLabel = 'Od której strefy';
    M['09'].levelWarning = 'Od uwagi w górę';
    M['09'].levelCritical = 'Tylko krytyczna';
    M['09'].sustainLabel = 'Po ilu sekundach nieprzerwanie';
    M['09'].sustainHint = 'Krótsze czasy dają więcej fałszywych alarmów, gdy przesuwasz telefon. Poniżej pięciu sekund nie schodzimy.';
    M['09'].soundLabel = 'Krótki sygnał dźwiękowy';
    M['09'].soundHint = 'Dźwięk powstaje w urządzeniu. Nic nie jest pobierane z sieci.';
    M['09'].cooldownHint = 'Najwyżej jeden alert na dwie minuty. Alarm powtarzany co próbkę to alarm, który się wyłącza na stałe.';
    M['09'].whenNotTitle = 'Kiedy alert nie zadziała';
    M['09'].whenNot = 'Powiadomienie jest wewnątrz aplikacji, nie w systemie. Nie zadziała, gdy aplikacja jest zamknięta albo schowana w tle, gdy pomiar nie działa oraz gdy pilnowana wielkość nie daje się w danej chwili zmierzyć. Nie prosimy o zgodę na powiadomienia systemowe.';
    M['09'].firedTpl = '{name}: {zone} od {sec} s — teraz {value}.';
    M['09'].saved = 'Zapisano ustawienia alertu.';
    M['09'].statusOnTpl = 'Pilnuję: {name}, {level}, po {sec} s.';

  }(Scale.TEXT.modules));

  global.Scale = Scale;

  /* ------------------------------------------------------------------
     Key map — what a module author may reach for.

     FUNCTIONS
       Scale.pos(id, value)                 -> 0..100 | null
       Scale.bands(id, thresholds)          -> [{zone,from,to} x3], left to right
       Scale.zone(id, value, thresholds)    -> 'good'|'warning'|'critical'|null
       Scale.severity(id, value, thresholds)-> 0..3 | null
       Scale.ticks(id)                      -> {major:[{pos,labelPL}x5], minor:[pos x21]}
       Scale.verdict(reading, thresholds)   -> {zone, culprit, textPL}   (no hysteresis)
       Scale.stamp(zone)                    -> {wordPL, shapeMod, shapeClass}
       Scale.threshold(id, zone, thresholds)-> '(próg 26%)'
       Scale.formatValue(id, value)         -> '27' | '———'      (alias: Scale.formatFor)
       Scale.unitSuffix(id)                 -> '%' | ' K' | ' ×' | ' pkt'
       Scale.duration(ms)                   -> '00:04:12'
       Scale.durationWords(ms)              -> '4 min 12 s'
       Scale.context(id, {min,avg,max})     -> 'min 21 · śr. 24 · maks 29 — ostatnie 60 s'
       Scale.spoken(id, value)              -> '4200 kelwinów'
       Scale.spokenZone(zone)               -> 'uwaga'
       Scale.announceLead(id, value, zone)  -> live-region sentence, 7.3
       Scale.announceReady(id, value, zone) -> live-region sentence, 8.5
       Scale.announceStopped(ms)            -> 'Pomiar zakończony · 4 min 12 s · …'
       Scale.railRunning(ms)                -> 'Pomiar 00:04:12'
       Scale.fill(template, map)            -> fills {placeholders}

     TEXT
       .app        name, title
       .state      idle starting running runningTpl stopped error hz
       .keys       start starting stop flip flipAria menu menuAria back backAria
                   dash zoom retry refresh close
       .monitor    legend badge open
       .aim        titlePL hintPL close flip
       .readout    legend helpAriaTpl thresholdTpl contextTpl contextEmpty approxSign
       .stamp      good warning critical none settling
       .verdict    idle warmup noValue stoppedTpl
                   good.any · warning.<metricId> · critical.<metricId>
       .note       titleLimits titleWarning dashTitle dashText approxLegend
                   kelvinOutOfRange flickerOutOfRange helpTitle helpText calibration
                   howToTitle howTo[3].{titlePL,textPL}
       .transient  firstRun measureStopped leadChanged warmupDone newVersion
                   newVersionKey thresholdsSaved thresholdsRejected historyCleared
       .live       lead ready started stopped
       .spoken     noValue units.<metricId> zones.<zone>
       .empty      recorderNoHistory recorderNoRange coverageTpl reportsNoData
                   compareOneSession exportNoData alertsOff scheduleEmpty historyEmpty
       .menu       titlePL
       .modules    '01'..'12' -> {no, titlePL, descPL}
       .errata     titlePL retry
       .aria       help channel channelStale scale readout readoutApprox
       .channels   groupAria pick stale approx
       .livebar    stopped key
       .help       titleTpl unit range thresholds warn crit now
       .recorder   rangeAria ranges.{60s,15min,1h,24h,30d} gap sessionTitle zonesCaption
                   tableCaption crosshair prevAria nextAria colTime
       .settings   themeLabel themeSystem themeLight themeDark textLabel text1 text115
                   text13 motionLabel clearLabel clearConfirm clearKey
       .common     noValue close cancel save reset yes no on off sep

     Metric names, units, ranges and help texts are NOT here — they come from
     Metrics.CATALOGUE, which is their only home.
     ------------------------------------------------------------------ */

}(typeof window !== 'undefined' ? window : globalThis));
