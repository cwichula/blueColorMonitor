/* Monitor Światła v4 — scale.js
 *
 * ROLA PLIKU: budowa Scale.TEXT — słownika, z którego cała ta wersja bierze
 * każde swoje zdanie. Do etapu warstwy językowej stały tu polskie napisy
 * wypisane wprost; dziś stoją tu WYŁĄCZNIE NAZWY KLUCZY, a napisy przychodzą
 * z warstwy językowej (window.I18n). Kształt obiektu nie zmienił się o jotę:
 * Scale.TEXT ma dokładnie te same pola co przedtem, w tej samej kolejności,
 * więc żaden plik czytający ten słownik nie musiał być ruszony.
 *
 * GDZIE SĄ TERAZ NAPISY:
 *   docs/shared/i18n/<kod>.js  — treść wspólna wszystkim wersjom: nazwy i opisy
 *                                siedmiu wielkości, nazwy stref, zdania
 *                                oceniające, zastrzeżenie medyczne, prywatność;
 *   docs/v4/i18n/<kod>.js      — treść własna tej wersji: nazwy jej ekranów,
 *                                klawiszy i dziewięciu narzędzi.
 * Plik wersji dokłada się do warstwy wspólnej i może ją nadpisać — i tylko
 * w tę stronę. Rozdział 7 SPEC.md opisuje te napisy dalej; zmieniło się
 * miejsce, w którym leżą, a nie ich treść.
 *
 * KLUCZ WSPÓLNY CZY WŁASNY: jeżeli zdanie brzmi identycznie we wszystkich
 * wersjach (a tak jest z wszystkim, co opisuje sam pomiar), wołamy klucz
 * wspólny — 'zone.good', 'verdict.warning.share', 'note.helpText'. Własne
 * klucze tej wersji opisują wyłącznie jej układ: 'keys.start', 'modules.07.planes.*'.
 * Dzięki temu jedno zdanie tłumaczy się raz na trzydzieści języków, a nie pięć
 * razy — po razie na wersję.
 *
 * SKŁADANIE W KODZIE: cztery napisy powstają z dwóch kluczy albo z liczby.
 * Powód jest za każdym razem ten sam — inaczej trzydziestu tłumaczy dostałoby
 * do przepisania zdanie, które już przetłumaczyli gdzie indziej, albo liczbę
 * zapisaną po polsku ('2,5') wklejoną w środek arabskiego zdania. Patrz hz(),
 * mdr() i N() niżej.
 *
 * KOLEJNOŚĆ ŁADOWANIA. Muszą stać wcześniej:
 *   ../shared/i18n.js       — bo stąd bierze się każdy napis (window.I18n);
 *   ../shared/scale-core.js — bo to on tworzy window.Scale, a ten plik tylko
 *                             dokłada do niego pole TEXT;
 *   ../shared/metrics.js    — bo localizeCatalogue() podmienia w nim napisy.
 * Funkcje ze scale-core.js sięgają po Scale.TEXT dopiero w chwili wywołania,
 * więc taka kolejność wystarcza. Odwrotna nie zadziała i strażnik niżej powie
 * o tym wprost.
 */
(function (global) {
  'use strict';

  // Strażnik kolejności ładowania: dokładamy słownik do obiektu, który tworzy
  // ../shared/scale-core.js. Gdy tamten plik nie został wczytany wcześniej, nie
  // ma do czego dokładać — wychodzimy wtedy cicho i z jednym czytelnym zdaniem
  // w konsoli, zamiast wysypywać stronę błędem w losowym miejscu.
  var Scale = global.Scale;
  if (!Scale) {
    if (global.console && console.error) {
      console.error('scale.js: brak window.Scale — najpierw trzeba załadować ../shared/scale-core.js.');
    }
    return;
  }

  /* ==================================================================
     Dostęp do warstwy językowej

     Brak window.I18n nie jest tu stanem do obsłużenia „ładnie”: bez słownika
     nie ma z czego zbudować ekranu. Zwracamy wtedy sam klucz — widać wtedy
     od razu, czego brakuje, i widać to w każdym miejscu ekranu naraz, zamiast
     pustych dziur, które wyglądają jak błąd układu.
     ================================================================== */

  function T(key, params) {
    var I = global.I18n;
    if (I && typeof I.t === 'function') return I.t(key, params);
    return String(key);
  }

  /** Liczba w zapisie aktywnego języka: 1,15 po polsku, 1.15 po angielsku,
   *  ١٫١٥ po arabsku. */
  function N(value, options) {
    var I = global.I18n;
    if (I && typeof I.number === 'function') return I.number(value, options);
    return String(value);
  }

  /* Częstotliwość próbkowania bierzemy z silnika, a nie z napisu: to jedna
     liczba opisująca zachowanie kodu i nie ma powodu, żeby stała w słowniku
     trzydzieści razy. */
  var SAMPLE_HZ = (global.Engine && typeof global.Engine.sampleHz === 'function')
    ? global.Engine.sampleHz() : 5;

  /** '5,0 Hz' po polsku, '5.0 Hz' po angielsku. Jednostka jest kluczem
   *  wspólnym, bo hertz nazywa się tak samo w każdym ekranie tej aplikacji. */
  function hz() {
    return N(SAMPLE_HZ, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' ' + T('unit.hertz');
  }

  /** Zdanie o rozporządzeniu (UE) 2017/745. Stoi w dwóch miejscach tej wersji
   *  (nota na pulpicie i stopka raportu) i jest identyczne we wszystkich
   *  wersjach, więc ma jeden klucz wspólny i jedno tłumaczenie. */
  function mdr() {
    return T('legal.mdr', { app: T('app.name') });
  }

  /* ==================================================================
     Scale.TEXT — rozdział 7 SPEC.md, klucz po kluczu.

     Kolejność pól jest kolejnością z poprzedniej wersji tego pliku i ma taka
     zostać: mapa kluczy na końcu pliku opisuje ją jako umowę z autorami modułów.
     ================================================================== */

  function buildText() {
    return {
    app: {
      name: T('app.wordmark'),
      title: T('app.name')
    },
    state: {
      idle: T('state.idle'),
      starting: T('state.starting'),
      running: T('state.running'),
      runningTpl: T('state.runningTpl'),
      stopped: T('state.stopped'),
      error: T('state.error'),
      hz: hz()
    },
    keys: {
      start: T('keys.start'),
      starting: T('keys.starting'),
      stop: T('keys.stop'),
      flip: T('keys.flip'),
      flipAria: T('keys.flipAria'),
      menu: T('keys.menu'),
      menuAria: T('keys.menuAria'),
      back: T('keys.back'),
      backAria: T('keys.backAria'),
      dash: T('keys.dash'),
      zoom: T('keys.zoom'),
      retry: T('keys.retry'),
      refresh: T('keys.refresh'),
      close: T('keys.close')
    },
    monitor: {
      legend: T('monitor.legend'),
      badge: T('monitor.badge'),
      open: T('monitor.open')
    },
    aim: {
      titlePL: T('aim.title'),
      hintPL: T('aim.hint'),
      close: T('aim.close'),
      flip: T('aim.flip')
    },
    readout: {
      legend: T('readout.legend'),
      helpAriaTpl: T('readout.helpAriaTpl'),
      thresholdTpl: T('readout.thresholdTpl'),
      contextTpl: T('readout.contextTpl'),
      contextEmpty: T('readout.contextEmpty'),
      approxSign: T('readout.approxSign')
    },
    stamp: {
      good: T('zone.good'),
      warning: T('zone.warning'),
      critical: T('zone.critical'),
      none: T('zone.none'),
      settling: T('zone.settling')
    },
    verdict: {
      idle: T('verdict.idle'),
      warmup: T('verdict.warmup'),
      noValue: T('verdict.noValue'),
      stoppedTpl: T('verdict.stoppedTpl'),
      good: {
        any: T('verdict.good')
      },
      warning: {
        share: T('verdict.warning.share'),
        brightness: T('verdict.warning.brightness'),
        kelvin: T('verdict.warning.kelvin'),
        melanopic: T('verdict.warning.melanopic'),
        flicker: T('verdict.warning.flicker'),
        uniformity: T('verdict.warning.uniformity'),
        comfort: T('verdict.warning.comfort')
      },
      critical: {
        share: T('verdict.critical.share'),
        brightness: T('verdict.critical.brightness'),
        kelvin: T('verdict.critical.kelvin'),
        melanopic: T('verdict.critical.melanopic'),
        flicker: T('verdict.critical.flicker'),
        uniformity: T('verdict.critical.uniformity'),
        comfort: T('verdict.critical.comfort')
      }
    },
    note: {
      titleLimits: T('note.limitsTitle'),
      titleWarning: T('note.warningTitle'),
      dashTitle: T('note.dashTitle'),
      dashText: T('note.dashText') + ' ' + mdr(),
      approxLegend: T('note.approxLegend'),
      kelvinOutOfRange: T('note.kelvinOutOfRange'),
      flickerOutOfRange: T('note.flickerOutOfRange', { rate: SAMPLE_HZ, limit: SAMPLE_HZ / 2 }),
      helpTitle: T('note.helpTitle'),
      helpText: T('note.helpText'),
      calibration: T('note.calibration'),
      howToTitle: T('note.howToTitle'),
      howTo: [
        {
          titlePL: T('note.howTo.hold.title'),
          textPL: T('note.howTo.hold.text')
        },
        {
          titlePL: T('note.howTo.aim.title'),
          textPL: T('note.howTo.aim.text')
        },
        {
          titlePL: T('note.howTo.compare.title'),
          textPL: T('note.howTo.compare.text')
        }
      ]
    },
    transient: {
      firstRun: T('transient.firstRun'),
      measureStopped: T('transient.measureStopped'),
      leadChanged: T('transient.leadChanged'),
      warmupDone: T('transient.warmupDone'),
      newVersion: T('transient.newVersion'),
      newVersionKey: T('transient.newVersionKey'),
      thresholdsSaved: T('transient.thresholdsSaved'),
      thresholdsRejected: T('transient.thresholdsRejected'),
      historyCleared: T('transient.historyCleared')
    },
    live: {
      lead: T('live.lead'),
      ready: T('live.ready'),
      started: T('live.started'),
      stopped: T('live.stopped')
    },
    spoken: {
      noValue: T('zone.spoken.none'),
      units: {
        share: T('metric.share.unitSpoken'),
        brightness: T('metric.brightness.unitSpoken'),
        kelvin: T('metric.kelvin.unitSpoken'),
        melanopic: T('metric.melanopic.unitSpoken'),
        flicker: T('metric.flicker.unitSpoken'),
        uniformity: T('metric.uniformity.unitSpoken'),
        comfort: T('metric.comfort.unitSpoken')
      },
      zones: {
        good: T('zone.spoken.good'),
        warning: T('zone.spoken.warning'),
        critical: T('zone.spoken.critical'),
        none: T('zone.spoken.none')
      }
    },
    empty: {
      recorderNoHistory: T('empty.recorderNoHistory'),
      recorderNoRange: T('empty.recorderNoRange'),
      coverageTpl: T('empty.coverageTpl'),
      reportsNoData: T('empty.reportsNoData'),
      compareOneSession: T('empty.compareOneSession'),
      exportNoData: T('empty.exportNoData'),
      alertsOff: T('empty.alertsOff'),
      scheduleEmpty: T('empty.scheduleEmpty'),
      historyEmpty: T('empty.historyEmpty')
    },
    menu: {
      titlePL: T('menu.title')
    },
    modules: {
      '10': {
        no: '10',
        titlePL: T('modules.10.title'),
        descPL: T('modules.10.desc')
      },
      '12': {
        no: '12',
        titlePL: T('modules.12.title'),
        descPL: T('modules.12.desc')
      },
      '13': {
        no: '13',
        titlePL: T('modules.13.title'),
        descPL: T('modules.13.desc')
      },
      '01': {
        no: '01',
        titlePL: T('modules.01.title'),
        descPL: T('modules.01.desc')
      },
      '02': {
        no: '02',
        titlePL: T('modules.02.title'),
        descPL: T('modules.02.desc'),
        introTitle: T('modules.02.introTitle'),
        intro: T('modules.02.intro'),
        warnLabel: T('modules.02.warnLabel'),
        critLabel: T('modules.02.critLabel'),
        orderNormal: T('modules.02.orderNormal'),
        orderInvert: T('modules.02.orderInvert'),
        sliderAriaTpl: T('modules.02.sliderAriaTpl'),
        previewAriaTpl: T('modules.02.previewAriaTpl'),
        nowTpl: T('modules.02.nowTpl'),
        resetDone: T('modules.02.resetDone'),
        profilesTitle: T('modules.02.profilesTitle'),
        profilesHint: T('modules.02.profilesHint'),
        profileApply: T('modules.02.profileApply'),
        profileRemove: T('modules.02.profileRemove'),
        profileSaveKey: T('modules.02.profileSaveKey'),
        profileNameLabel: T('modules.02.profileNameLabel'),
        profileNameHint: T('modules.02.profileNameHint'),
        profileNameEmpty: T('modules.02.profileNameEmpty'),
        profileSavedTpl: T('modules.02.profileSavedTpl'),
        profileAppliedTpl: T('modules.02.profileAppliedTpl'),
        profileRemovedTpl: T('modules.02.profileRemovedTpl'),
        profileFailed: T('modules.02.profileFailed'),
        profileCustomTpl: T('modules.02.profileCustomTpl'),
        builtin: [
          {
            id: 'builtin.default',
            namePL: T('modules.02.builtin.default.name'),
            descPL: T('modules.02.builtin.default.desc')
          },
          {
            id: 'builtin.evening',
            namePL: T('modules.02.builtin.evening.name'),
            descPL: T('modules.02.builtin.evening.desc')
          },
          {
            id: 'builtin.work',
            namePL: T('modules.02.builtin.work.name'),
            descPL: T('modules.02.builtin.work.desc')
          }
        ]
      },
      '03': {
        no: '03',
        titlePL: T('modules.03.title'),
        descPL: T('modules.03.desc'),
        whyTitle: T('modules.03.whyTitle'),
        why: T('modules.03.why'),
        stepsTitle: T('modules.03.stepsTitle'),
        steps: [
          T('modules.03.steps.0'),
          T('modules.03.steps.1'),
          T('modules.03.steps.2')
        ],
        runKey: T('modules.03.runKey'),
        clearKey: T('modules.03.clearKey'),
        busyTpl: T('modules.03.busyTpl'),
        statusNone: T('modules.03.statusNone'),
        statusOnTpl: T('modules.03.statusOnTpl'),
        gainsTitle: T('modules.03.gainsTitle'),
        colChannel: T('modules.03.colChannel'),
        colGain: T('modules.03.colGain'),
        gainR: T('modules.03.gainR'),
        gainG: T('modules.03.gainG'),
        gainB: T('modules.03.gainB'),
        gainsNone: T('modules.03.gainsNone'),
        needRunning: T('modules.03.needRunning'),
        tooFew: T('modules.03.tooFew'),
        tooDark: T('modules.03.tooDark'),
        refused: T('modules.03.refused'),
        done: T('modules.03.done'),
        cleared: T('modules.03.cleared'),
        limitsTitle: T('modules.03.limitsTitle'),
        limits: [
          T('modules.03.limits.0'),
          T('modules.03.limits.1'),
          T('modules.03.limits.2')
        ]
      },
      '04': {
        no: '04',
        titlePL: T('modules.04.title'),
        descPL: T('modules.04.desc'),
        rangeAria: T('modules.04.rangeAria'),
        rangeDay: T('modules.04.rangeDay'),
        rangeWeek: T('modules.04.rangeWeek'),
        headTpl: T('modules.04.headTpl'),
        tableTitle: T('modules.04.tableTitle'),
        tableCaption: T('modules.04.tableCaption'),
        colMetric: T('modules.04.colMetric'),
        colAvg: T('modules.04.colAvg'),
        colMin: T('modules.04.colMin'),
        colMax: T('modules.04.colMax'),
        panoramaTitle: T('modules.04.panoramaTitle'),
        panoramaAriaTpl: T('modules.04.panoramaAriaTpl'),
        panoramaSpanDay: T('modules.04.panoramaSpanDay'),
        panoramaSpanWeek: T('modules.04.panoramaSpanWeek'),
        panoramaHint: T('modules.04.panoramaHint'),
        coverageDayTpl: T('modules.04.coverageDayTpl'),
        coverageWeekTpl: T('modules.04.coverageWeekTpl'),
        zonesTitle: T('modules.04.zonesTitle'),
        zonesCaptionTpl: T('modules.04.zonesCaptionTpl'),
        zoneGood: T('zone.good'),
        zoneWarning: T('zone.warning'),
        zoneCritical: T('zone.critical'),
        worstTpl: T('modules.04.worstTpl'),
        worstNone: T('modules.04.worstNone'),
        worstHourTpl: T('modules.04.worstHourTpl'),
        adviceTitle: T('modules.04.adviceTitle'),
        adviceMelanopicTpl: T('modules.04.adviceMelanopicTpl'),
        adviceKelvinTpl: T('modules.04.adviceKelvinTpl'),
        adviceFlickerTpl: T('modules.04.adviceFlickerTpl'),
        adviceUniformityTpl: T('modules.04.adviceUniformityTpl'),
        adviceWorstTpl: T('modules.04.adviceWorstTpl'),
        adviceNone: T('modules.04.adviceNone'),
        limitsTitle: T('modules.04.limitsTitle'),
        limits: T('modules.04.limits') + ' ' + mdr(),
        printHint: T('modules.04.printHint')
      },
      '05': {
        no: '05',
        titlePL: T('modules.05.title'),
        descPL: T('modules.05.desc'),
        rangeAria: T('modules.05.rangeAria'),
        range1h: T('modules.05.range1h'),
        range24h: T('modules.05.range24h'),
        range7d: T('modules.05.range7d'),
        range30d: T('modules.05.range30d'),
        csvKey: T('modules.05.csvKey'),
        jsonKey: T('modules.05.jsonKey'),
        formatTitle: T('modules.05.formatTitle'),
        formatCsv: T('modules.05.formatCsv'),
        formatJson: T('modules.05.formatJson'),
        resolution: T('modules.05.resolution'),
        offline: T('modules.05.offline'),
        columnsTitle: T('modules.05.columnsTitle'),
        columnsCaption: T('modules.05.columnsCaption'),
        colName: T('modules.05.colName'),
        colMeaning: T('modules.05.colMeaning'),
        colDate: T('modules.05.colDate'),
        colTime: T('modules.05.colTime'),
        colZone: T('modules.05.colZone'),
        descDate: T('modules.05.descDate'),
        descTime: T('modules.05.descTime'),
        descZone: T('modules.05.descZone'),
        descMetricTpl: T('modules.05.descMetricTpl'),
        previewTitle: T('modules.05.previewTitle'),
        previewHint: T('modules.05.previewHint'),
        savedTpl: T('modules.05.savedTpl'),
        failed: T('modules.05.failed')
      },
      '06': {
        no: '06',
        titlePL: T('modules.06.title'),
        descPL: T('modules.06.desc'),
        intro: T('modules.06.intro'),
        noSessions: T('modules.06.noSessions'),
        slotA: T('modules.06.slotA'),
        slotB: T('modules.06.slotB'),
        sessionTpl: T('modules.06.sessionTpl'),
        tapeTitle: T('modules.06.tapeTitle'),
        tapeAriaTpl: T('modules.06.tapeAriaTpl'),
        tapeHint: T('modules.06.tapeHint'),
        tapeChannelTpl: T('modules.06.tapeChannelTpl'),
        diffTitle: T('modules.06.diffTitle'),
        diffCaption: T('modules.06.diffCaption'),
        colMetric: T('modules.06.colMetric'),
        colA: T('modules.06.colA'),
        colB: T('modules.06.colB'),
        colDiff: T('modules.06.colDiff'),
        clearKey: T('modules.06.clearKey'),
        cleared: T('modules.06.cleared'),
        savedTpl: T('modules.06.savedTpl'),
        limitsTitle: T('modules.06.limitsTitle'),
        limits: T('modules.06.limits'),
        keepTpl: T('modules.06.keepTpl')
      },
      '07': {
        no: '07',
        titlePL: T('modules.07.title'),
        descPL: T('modules.07.desc'),
        intro: T('modules.07.intro'),
        stepsTitle: T('modules.07.stepsTitle'),
        steps: [
          T('modules.07.steps.0'),
          T('modules.07.steps.1'),
          T('modules.07.steps.2'),
          T('modules.07.steps.3')
        ],
        planesTitle: T('modules.07.planesTitle'),
        exitKey: T('modules.07.exitKey'),
        showKey: T('modules.07.showKey'),
        showAriaTpl: T('modules.07.showAriaTpl'),
        planeAriaTpl: T('modules.07.planeAriaTpl'),
        planes: [
          {
            id: 'white',
            namePL: T('modules.07.planes.white.name'),
            hintPL: T('modules.07.planes.white.hint')
          },
          {
            id: 'gray75',
            namePL: T('modules.07.planes.gray75.name'),
            hintPL: T('modules.07.planes.gray75.hint')
          },
          {
            id: 'gray50',
            namePL: T('modules.07.planes.gray50.name'),
            hintPL: T('modules.07.planes.gray50.hint')
          },
          {
            id: 'gray25',
            namePL: T('modules.07.planes.gray25.name'),
            hintPL: T('modules.07.planes.gray25.hint')
          },
          {
            id: 'black',
            namePL: T('modules.07.planes.black.name'),
            hintPL: T('modules.07.planes.black.hint')
          },
          {
            id: 'red',
            namePL: T('modules.07.planes.red.name'),
            hintPL: T('modules.07.planes.red.hint')
          },
          {
            id: 'green',
            namePL: T('modules.07.planes.green.name'),
            hintPL: T('modules.07.planes.green.hint')
          },
          {
            id: 'blue',
            namePL: T('modules.07.planes.blue.name'),
            hintPL: T('modules.07.planes.blue.hint')
          },
          {
            id: 'grid',
            namePL: T('modules.07.planes.grid.name'),
            hintPL: T('modules.07.planes.grid.hint')
          }
        ],
        warnTitle: T('note.warningTitle'),
        warn: T('modules.07.warn'),
        cameraTitle: T('modules.07.cameraTitle'),
        camera: T('modules.07.camera')
      },
      '08': {
        no: '08',
        titlePL: T('modules.08.title'),
        descPL: T('modules.08.desc'),
        intro: T('modules.08.intro'),
        onlyOpenTitle: T('modules.08.onlyOpenTitle'),
        onlyOpen: T('modules.08.onlyOpen'),
        enableLabel: T('modules.08.enableLabel'),
        timesTitle: T('modules.08.timesTitle'),
        timeAriaTpl: T('modules.08.timeAriaTpl'),
        addKey: T('modules.08.addKey'),
        removeKey: T('modules.08.removeKey'),
        removeAriaTpl: T('modules.08.removeAriaTpl'),
        addedTpl: T('modules.08.addedTpl'),
        removedTpl: T('modules.08.removedTpl'),
        badTime: T('modules.08.badTime'),
        nextTpl: T('modules.08.nextTpl'),
        nextNone: T('modules.08.nextNone'),
        dueTpl: T('modules.08.dueTpl'),
        dueKey: T('modules.08.dueKey')
      },
      '09': {
        no: '09',
        titlePL: T('modules.09.title'),
        descPL: T('modules.09.desc'),
        intro: T('modules.09.intro'),
        enableLabel: T('modules.09.enableLabel'),
        metricLabel: T('modules.09.metricLabel'),
        levelLabel: T('modules.09.levelLabel'),
        levelWarning: T('modules.09.levelWarning'),
        levelCritical: T('modules.09.levelCritical'),
        sustainLabel: T('modules.09.sustainLabel'),
        sustainHint: T('modules.09.sustainHint'),
        soundLabel: T('modules.09.soundLabel'),
        soundHint: T('modules.09.soundHint'),
        cooldownHint: T('modules.09.cooldownHint'),
        whenNotTitle: T('modules.09.whenNotTitle'),
        whenNot: T('modules.09.whenNot'),
        firedTpl: T('modules.09.firedTpl'),
        saved: T('modules.09.saved'),
        statusOnTpl: T('modules.09.statusOnTpl')
      }
    },
    errata: {
      titlePL: T('errata.title'),
      retry: T('errata.retry')
    },
    channels: {
      groupAria: T('channels.groupAria'),
      pick: T('channels.pick'),
      stale: T('zone.spoken.none'),
      approx: T('channels.approx')
    },
    aria: {
      help: T('aria.help'),
      channel: T('aria.channel'),
      channelStale: T('aria.channelStale'),
      scale: T('aria.scale'),
      readout: T('aria.readout'),
      readoutApprox: T('aria.readoutApprox')
    },
    livebar: {
      stopped: T('livebar.stopped'),
      key: T('livebar.key')
    },
    help: {
      titleTpl: T('help.titleTpl'),
      unit: T('help.unit'),
      range: T('help.range'),
      thresholds: T('help.thresholds'),
      warn: T('help.warn'),
      crit: T('help.crit'),
      availability: T('help.availability'),
      free: T('help.free'),
      now: T('help.now')
    },
    recorder: {
      rangeAria: T('recorder.rangeAria'),
      ranges: {
        '60s': T('recorder.ranges.60s'),
        '15min': T('recorder.ranges.15min'),
        '1h': T('recorder.ranges.1h'),
        '24h': T('recorder.ranges.24h'),
        '30d': T('recorder.ranges.30d')
      },
      gap: T('recorder.gap'),
      sessionTitle: T('recorder.sessionTitle'),
      zonesCaption: T('recorder.zonesCaption'),
      tableCaption: T('recorder.tableCaption'),
      crosshair: T('recorder.crosshair'),
      prevAria: T('recorder.prevAria'),
      nextAria: T('recorder.nextAria'),
      colTime: T('recorder.colTime')
    },
    settings: {
      themeLabel: T('settings.themeLabel'),
      themeSystem: T('settings.themeSystem'),
      themeLight: T('settings.themeLight'),
      themeDark: T('settings.themeDark'),
      textLabel: T('settings.textLabel'),
      text1: '\u00d7' + N(1),
      text115: '\u00d7' + N(1.15),
      text13: '\u00d7' + N(1.3),
      motionLabel: T('settings.motionLabel'),
      clearLabel: T('settings.clearLabel'),
      clearConfirm: T('settings.clearConfirm'),
      clearKey: T('settings.clearKey')
    },
    common: {
      noValue: T('common.noValue'),
      close: T('common.close'),
      cancel: T('common.cancel'),
      save: T('common.save'),
      reset: T('common.reset'),
      yes: T('common.yes'),
      no: T('common.no'),
      on: T('common.on'),
      off: T('common.off'),
      sep: T('common.sep')
    }
  };
  }

  Scale.TEXT = buildText();

  /* ==================================================================
     Nazwy siedmiu wielkości w Metrics.CATALOGUE

     Katalog wielkości jest wspólny (../shared/metrics.js) i jego napisy też —
     leżą pod kluczami 'metric.<id>.name', '.unit', '.short' i '.help'
     w docs/shared/i18n/. Zamiast przerabiać czterdzieści miejsc, które czytają
     m.namePL, podmieniamy te cztery pola w katalogu raz, przy starcie: katalog
     dalej jest jedynym domem opisów wielkości, a warstwa językowa dostarcza mu
     słowa. Pola liczbowe (min, max, warn, crit, decimals, invert) są nietykalne
     — to one, a nie napisy, rozstrzygają o pomiarze.

     Robi to WYŁĄCZNIE wersja, która wczytała warstwę językową; wersja bez niej
     zobaczy w katalogu polskie napisy zapisane w metrics.js i będzie działać
     tak jak dotąd.
     ================================================================== */

  function localizeCatalogue() {
    var M = global.Metrics;
    if (!M || !M.CATALOGUE || !global.I18n) return;
    for (var i = 0; i < M.CATALOGUE.length; i += 1) {
      var m = M.CATALOGUE[i];
      var base = 'metric.' + m.id + '.';
      if (global.I18n.has(base + 'name')) m.namePL = T(base + 'name');
      if (global.I18n.has(base + 'unit')) m.unit = T(base + 'unit');
      if (global.I18n.has(base + 'short')) m.shortPL = T(base + 'short');
      if (global.I18n.has(base + 'help')) m.helpPL = T(base + 'help');
    }
  }

  localizeCatalogue();

  /** Przebudowa całego słownictwa po zmianie języka. Wołana z app.js —
   *  i tylko stamtąd, bo to on decyduje, co dalej dzieje się z ekranem. */
  Scale.relanguage = function () {
    Scale.TEXT = buildText();
    localizeCatalogue();
    return Scale.TEXT;
  };


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
       .modules    '01'..'13' -> {no, titlePL, descPL}
       .errata     titlePL retry
       .aria       help channel channelStale scale readout readoutApprox
       .channels   groupAria pick stale approx
       .livebar    stopped key
       .help       titleTpl unit range thresholds warn crit availability free now
       .recorder   rangeAria ranges.{60s,15min,1h,24h,30d} gap sessionTitle zonesCaption
                   tableCaption crosshair prevAria nextAria colTime
       .settings   themeLabel themeSystem themeLight themeDark textLabel text1 text115
                   text13 motionLabel clearLabel clearConfirm clearKey
       .common     noValue close cancel save reset yes no on off sep

     Metric names, units, ranges and help texts are NOT here — they come from
     Metrics.CATALOGUE, which is their only home. Their WORDS come from the
     shared dictionary ('metric.<id>.name' and friends); localizeCatalogue()
     above puts them into the catalogue at start-up and after a language change.

       Scale.relanguage()                   -> rebuilds TEXT in the new language;
                                               app.js is the only caller.
     ------------------------------------------------------------------ */

}(typeof window !== 'undefined' ? window : globalThis));
