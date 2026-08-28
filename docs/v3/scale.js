/* Monitor Światła v3 — scale.js
 *
 * WYŁĄCZNIE słownik napisów tej wersji. Rdzeń skali — geometria (pozycje,
 * pasma, strefy, podziałka) i formatowanie liczb — stoi w
 * ../shared/scale-core.js i jest wspólny dla kilku wersji; ten plik tylko
 * dokłada do gotowego już obiektu `window.Scale` słownik Scale.TEXT.
 *
 * DLACZEGO taki podział: geometria jest ta sama we wszystkich wersjach, a
 * napisy nie są — każda wersja mówi do użytkownika własnym głosem. Trzymanie
 * jednego wspólnego pliku z napisami zmusiłoby do warunków „jeśli wersja v3",
 * a to jest dokładnie ta konstrukcja, przez którą teksty czterech autorów
 * rozjeżdżają się w tydzień.
 *
 * KOLEJNOŚĆ ŁADOWANIA: ../shared/i18n.js ORAZ ../shared/scale-core.js MUSZĄ
 * stać przed tym plikiem — pierwszy wystawia window.I18n, drugi tworzy
 * window.Scale. Tutaj nie ma `global.Scale = Scale;`, bo rdzeń wystawił
 * globalne wcześniej i drugi zapis tylko zaciemniałby, kto jest właścicielem
 * obiektu.
 *
 * ---------------------------------------------------------------------------
 * CO SIĘ TU ZMIENIŁO WRAZ Z TRZYDZIESTOMA JĘZYKAMI
 * ---------------------------------------------------------------------------
 * Do tej pory ten plik BYŁ słownikiem: literał przy literale, rozdział 8
 * DESIGN.md słowo w słowo. Teraz jest MAPĄ. Każdy liść w SHAPE poniżej to
 * klucz w warstwie językowej, a Scale.TEXT powstaje z niego przy starcie
 * i po każdej zmianie języka. Polszczyzna przeniosła się bez zmiany ani
 * jednego znaku do dwóch plików:
 *
 *   ../shared/i18n/pl.js   zdania wspólne wszystkim wersjom — nazwy stref,
 *                          zdania oceniające, noty o granicach metody,
 *                          nazwy i opisy siedmiu wielkości, zastrzeżenie
 *                          medyczne;
 *   ./i18n/pl.js           zdania własne v3 — nazwy ekranów, klawiszy,
 *                          modułów, kolumn.
 *
 * KSZTAŁT Scale.TEXT NIE ZMIENIŁ SIĘ ANI O JEDNO POLE. Kilkanaście plików tej
 * wersji czyta go po ścieżkach ('verdict.warning.share', 'modules.07.planes[2]
 * .namePL') i żaden z nich nie wymagał poprawki. Dlatego mapa jest zapisana
 * jako obiekt o dokładnie tym samym kształcie, a nie jako lista przypisań:
 * różnicę między nią a poprzednią wersją pliku widać wtedy w jednym rzucie
 * oka, klucz pod kluczem.
 *
 * DLACZEGO KLUCZE WSKAZUJĄ W DWA MIEJSCA: zdanie, które w v3 brzmi tak samo
 * jak w v4 (a takich jest większość — strefy, oceny, noty), stoi w słowniku
 * WSPÓLNYM i tłumaczy się je raz na trzydzieści języków, a nie cztery razy.
 * Mapa poniżej jest jedynym miejscem, w którym widać, które zdanie jest czyje.
 *
 * SKŁADANIE ZDAŃ (funkcja zamiast klucza) jest użyte w trzech miejscach i
 * tylko tam, gdzie zdanie v3 to zdanie wspólne z doklejoną formułą z
 * rozporządzenia (UE) 2017/745. Formuła jest prawna, więc ma jedno źródło
 * ('legal.mdr'); wynik składania jest co do znaku tym, co stało tu wcześniej.
 *
 * GDY WARSTWY JĘZYKOWEJ NIE MA (nie wczytał się ../shared/i18n.js): t()
 * oddaje sam klucz. Ekran jest wtedy brzydki, ale kompletny i klikalny, a
 * boot.js i tak melduje brakujący plik. Aplikacja nie wywraca się na tym.
 */
(function (global) {
  'use strict';

  var Scale = global.Scale;
  if (!Scale) {
    if (global.console) console.error('scale.js: brak window.Scale — ../shared/scale-core.js musi być załadowany wcześniej.');
    return;
  }

  /* ------------------------------------------------------------------
     Dostęp do warstwy językowej
     ------------------------------------------------------------------ */

  function I18n() { return global.I18n || null; }

  /** Napis spod klucza. Bez warstwy językowej oddaje sam klucz — nigdy
   *  `undefined`, bo połowa tego pliku trafia wprost do textContent. */
  function t(key, params) {
    var api = I18n();
    return api ? api.t(key, params) : String(key);
  }

  /** Liczba w zapisie aktywnego języka. Używana tam, gdzie liczba jest
   *  częścią napisu na stałe (5,0 Hz, ×1,15), a nie wynikiem pomiaru —
   *  te ostatnie formatuje Scale.formatValue z rdzenia. */
  function num(value, options) {
    var api = I18n();
    if (api && typeof api.number === 'function') return api.number(value, options);
    return String(value);
  }

  /** Nazwa aplikacji jako wstawka do zdania. */
  function appName() { return t('app.name'); }

  /* Wartość, która NIE jest napisem do tłumaczenia: numer modułu, identyfikator
     planszy, identyfikator profilu. Owinięta w funkcję, żeby całą mapę dało się
     przejść jedną regułą: napis to klucz, funkcja to wynik wywołania. */
  function raw(value) {
    return function () { return value; };
  }

  /* ------------------------------------------------------------------
     MAPA: gałąź Scale.TEXT → klucz słownika

     'metric.share.name'  — klucz WSPÓLNY  (../shared/i18n/<kod>.js)
     'keys.start'         — klucz WŁASNY v3 (./i18n/<kod>.js)

     Rozróżnienie widać po nazwie: wspólne mówią o pomiarze i o prawie,
     własne o układzie tej wersji.
     ------------------------------------------------------------------ */

  var SHAPE = {

    /* ---- 8.1 listwa stanu i klawisze ---- */

    app: {
      name: 'app.wordmark',
      title: 'app.name'
    },

    state: {
      idle: 'state.idle',
      starting: 'state.starting',
      running: 'state.running',
      runningTpl: 'state.runningTpl',
      stopped: 'state.stopped',
      error: 'state.error',
      /* Częstotliwość próbkowania silnika. Jedna cyfra po przecinku jest
         częścią zapisu, nie zaokrągleniem, więc idzie przez NumberFormat —
         inaczej trzydzieści języków dostałoby polskie „5,0”. */
      hz: function () { return t('state.hzTpl', { rate: num(5, { minimumFractionDigits: 1 }) }); }
    },

    keys: {
      start: 'keys.start',
      starting: 'keys.starting',
      stop: 'keys.stop',
      flip: 'keys.flip',
      flipAria: 'keys.flipAria',
      menu: 'keys.menu',
      menuAria: 'keys.menuAria',
      back: 'keys.back',
      backAria: 'keys.backAria',
      dash: 'keys.dash',
      zoom: 'keys.zoom',
      retry: 'keys.retry',
      refresh: 'keys.refresh',
      close: 'keys.close'
    },

    monitor: {
      legend: 'monitor.legend',
      badge: 'monitor.badge',
      open: 'keys.zoom'
    },

    aim: {
      titlePL: 'aim.title',
      hintPL: 'aim.hint',
      close: 'keys.close',
      flip: 'keys.flip'
    },

    /* ---- 8.2 studnia odczytu ---- */

    readout: {
      legend: 'readout.legend',
      helpAriaTpl: 'aria.help',
      thresholdTpl: 'readout.thresholdTpl',
      contextTpl: 'readout.contextTpl',
      contextEmpty: 'readout.contextEmpty',
      approxSign: 'readout.approxSign'
    },

    /* Słowo stempla to nazwa strefy — ta sama, którą czyta czytnik ekranu
       i ta sama, którą v4 wypisuje na swoim ekranie. Klucz wspólny. */
    stamp: {
      good: 'zone.good',
      warning: 'zone.warning',
      critical: 'zone.critical',
      none: 'zone.none',
      settling: 'zone.settling'
    },

    /* ---- 8.3 zdania oceniające ---- */

    verdict: {
      idle: 'verdict.idle',
      warmup: 'verdict.warmup',
      noValue: 'verdict.noValue',
      stoppedTpl: 'transient.measureStopped',

      good: { any: 'verdict.good' },

      warning: {
        share: 'verdict.warning.share',
        brightness: 'verdict.warning.brightness',
        kelvin: 'verdict.warning.kelvin',
        melanopic: 'verdict.warning.melanopic',
        flicker: 'verdict.warning.flicker',
        uniformity: 'verdict.warning.uniformity',
        comfort: 'verdict.warning.comfort'
      },

      critical: {
        share: 'verdict.critical.share',
        brightness: 'verdict.critical.brightness',
        kelvin: 'verdict.critical.kelvin',
        melanopic: 'verdict.critical.melanopic',
        flicker: 'verdict.critical.flicker',
        uniformity: 'verdict.critical.uniformity',
        /* v3 nadpisuje ten jeden klucz u siebie — odsyła do modułu 01. */
        comfort: 'verdict.critical.comfort'
      }
    },

    /* ---- 8.4 noty o granicach metody ---- */

    note: {
      titleLimits: 'note.limitsTitle',
      titleWarning: 'note.warningTitle',

      dashTitle: 'note.dashTitle',
      /* Nota pulpitu = wspólne zdanie o trzech kanałach + formuła z
         rozporządzenia. Sklejone tutaj, bo formuła ma jedno źródło. */
      dashText: function () {
        return t('note.dashText') + ' ' + t('legal.mdr', { app: appName() });
      },

      approxLegend: 'note.approxLegend',
      kelvinOutOfRange: 'note.kelvinOutOfRange',
      /* Częstotliwość próbkowania i granica Nyquista jako LICZBY: 5 / 2,5 po
         polsku, 5 / 2.5 po angielsku. Wcześniej stały tu wpisane na sztywno. */
      flickerOutOfRange: function () {
        return t('note.flickerOutOfRange', { rate: 5, limit: 2.5 });
      },

      helpTitle: 'note.helpTitle',
      helpText: 'note.helpText',

      calibration: 'note.calibration',

      howToTitle: 'note.howToTitle',
      howTo: [
        { titlePL: 'note.howTo.hold.title', textPL: 'note.howTo.hold.text' },
        { titlePL: 'note.howTo.aim.title', textPL: 'note.howTo.aim.text' },
        { titlePL: 'note.howTo.compare.title', textPL: 'note.howTo.compare.text' }
      ]
    },

    /* ---- 8.5 komunikaty ulotne ---- */

    transient: {
      firstRun: 'transient.firstRun',
      measureStopped: 'transient.measureStopped',
      leadChanged: 'live.lead',
      warmupDone: 'live.ready',
      newVersion: 'transient.newVersion',
      newVersionKey: 'keys.refresh',
      thresholdsSaved: 'transient.thresholdsSaved',
      thresholdsRejected: 'transient.thresholdsRejected',
      historyCleared: 'transient.historyCleared'
    },

    live: {
      lead: 'live.lead',
      ready: 'live.ready',
      started: 'live.started',
      stopped: 'transient.measureStopped'
    },

    /* Jak czytnik ekranu ma usłyszeć wartość. '%' i '×' są znakami; wymówione
       potrzebują słowa — a słowo należy do wielkości, więc klucz jest wspólny. */
    spoken: {
      noValue: 'zone.spoken.none',
      units: {
        share: 'metric.share.unitSpoken',
        brightness: 'metric.brightness.unitSpoken',
        kelvin: 'metric.kelvin.unitSpoken',
        melanopic: 'metric.melanopic.unitSpoken',
        flicker: 'metric.flicker.unitSpoken',
        uniformity: 'metric.uniformity.unitSpoken',
        comfort: 'metric.comfort.unitSpoken'
      },
      zones: {
        good: 'zone.spoken.good',
        warning: 'zone.spoken.warning',
        critical: 'zone.spoken.critical',
        none: 'zone.spoken.none'
      }
    },

    /* ---- 8.6 puste ekrany ---- */

    empty: {
      recorderNoHistory: 'empty.recorderNoHistory',
      recorderNoRange: 'empty.recorderNoRange',
      coverageTpl: 'empty.coverageTpl',
      reportsNoData: 'empty.reportsNoData',
      compareOneSession: 'empty.compareOneSession',
      exportNoData: 'empty.exportNoData',
      alertsOff: 'empty.alertsOff',
      scheduleEmpty: 'empty.scheduleEmpty',
      historyEmpty: 'empty.historyEmpty'
    },

    /* ---- 8.8 spis modułów ---- */

    menu: {
      titlePL: 'menu.title'
    },

    modules: {
      '01': { no: raw('01'), titlePL: 'modules.01.title', descPL: 'modules.01.desc' },
      '02': { no: raw('02'), titlePL: 'modules.02.title', descPL: 'modules.02.desc' },
      '03': { no: raw('03'), titlePL: 'modules.03.title', descPL: 'modules.03.desc' },
      '04': { no: raw('04'), titlePL: 'modules.04.title', descPL: 'modules.04.desc' },
      '05': { no: raw('05'), titlePL: 'modules.05.title', descPL: 'modules.05.desc' },
      '06': { no: raw('06'), titlePL: 'modules.06.title', descPL: 'modules.06.desc' },
      '07': { no: raw('07'), titlePL: 'modules.07.title', descPL: 'modules.07.desc' },
      '08': { no: raw('08'), titlePL: 'modules.08.title', descPL: 'modules.08.desc' },
      '09': { no: raw('09'), titlePL: 'modules.09.title', descPL: 'modules.09.desc' },
      '10': { no: raw('10'), titlePL: 'modules.10.title', descPL: 'modules.10.desc' },
      '11': { no: raw('11'), titlePL: 'modules.11.title', descPL: 'modules.11.desc' },
      '12': { no: raw('12'), titlePL: 'modules.12.title', descPL: 'modules.12.desc' }
    },

    /* ---- napisy, których potrzebują komponenty (rozdziały 4-7) ---- */

    errata: {
      titlePL: 'state.error',
      retry: 'keys.retry'
    },

    channels: {
      groupAria: 'channels.groupAria',
      pick: 'channels.pick',
      stale: 'channels.stale',
      approx: 'channels.approx'
    },

    aria: {
      help: 'aria.help',
      channel: 'aria.channel',
      channelStale: 'aria.channelStale',
      scale: 'aria.scale',
      readout: 'aria.readout',
      readoutApprox: 'aria.readoutApprox',
      /* Nazwa dostępna skali, zanim padnie pierwszy odczyt. Wpisana wprost
         w index.html, żeby skala miała nazwę także wtedy, gdy dash.js się nie
         wczytał — a stamtąd bierze ją powłoka przez data-i18n-aria. */
      scaleIdle: 'aria.scaleIdle'
    },

    livebar: {
      stopped: 'livebar.stopped',
      key: 'keys.dash'
    },

    help: {
      titleTpl: 'aria.help',
      unit: 'help.unit',
      range: 'help.range',
      thresholds: 'help.thresholds',
      warn: 'help.warn',
      crit: 'help.crit',
      now: 'help.now'
    },

    recorder: {
      rangeAria: 'recorder.rangeAria',
      ranges: {
        '60s': 'recorder.range.60s',
        '15min': 'recorder.range.15min',
        '1h': 'recorder.range.1h',
        '24h': 'recorder.range.24h',
        '30d': 'recorder.range.30d'
      },
      gap: 'recorder.gap',
      sessionTitle: 'recorder.sessionTitle',
      zonesCaption: 'recorder.zonesCaption',
      tableCaption: 'recorder.tableCaption',
      crosshair: 'recorder.crosshair',
      prevAria: 'recorder.prevAria',
      nextAria: 'recorder.nextAria',
      colTime: 'col.time'
    },

    settings: {
      themeLabel: 'settings.themeLabel',
      themeSystem: 'settings.themeSystem',
      themeLight: 'settings.themeLight',
      themeDark: 'settings.themeDark',
      textLabel: 'settings.textLabel',
      /* Mnożnik rozmiaru tekstu przez NumberFormat: ×1,15 po polsku,
         ×1.15 po angielsku, ×١٫١٥ po arabsku. */
      text1: function () { return t('settings.textScaleTpl', { scale: 1 }); },
      text115: function () { return t('settings.textScaleTpl', { scale: 1.15 }); },
      text13: function () { return t('settings.textScaleTpl', { scale: 1.3 }); },
      motionLabel: 'settings.motionLabel',
      clearLabel: 'settings.clearLabel',
      clearConfirm: 'settings.clearConfirm',
      clearKey: 'settings.clearKey'
    },

    common: {
      /* Jedna półpauza, nie trzy. Trzy z rzędu to nie zastępnik, to REGUŁA:
         w rozmiarze odczytu malują czarny pas przez studnię, a w rozmiarze
         wiersza rysują kreskę tam, gdzie ma być wartość. Pojedyncza półpauza
         jest typograficznym znakiem „brak wartości” i nie da się jej pomylić
         z niczym innym. */
      noValue: 'common.noValue',
      close: 'keys.close',
      cancel: 'common.cancel',
      save: 'common.save',
      reset: 'common.reset',
      yes: 'common.yes',
      no: 'common.no',
      on: 'common.on',
      off: 'common.off',
      sep: 'common.sep'
    }
  };

  /* ==================================================================
     Scale.TEXT.modules — napisy należące do modules.js (moduły 02-09).

     Rozdział 8 DESIGN.md nie ma tabeli dla tych ekranów, więc zdania idą
     za 8.9: druga osoba, tryb rozkazujący, żadnej obietnicy wyniku i żadnego
     ze słów zakazanych. Każdy moduł trzyma swoje napisy pod swoim numerem,
     obok trójki {no, titlePL, descPL}, którą czyta spis modułów.
     ================================================================== */

  (function (M) {

    /* ---- 02 Progi ---- */

    M['02'].introTitle = 'modules.02.introTitle';
    M['02'].intro = 'modules.02.intro';
    M['02'].warnLabel = 'help.warn';
    M['02'].critLabel = 'help.crit';
    M['02'].orderNormal = 'modules.02.orderNormal';
    M['02'].orderInvert = 'modules.02.orderInvert';
    M['02'].sliderAriaTpl = 'modules.02.sliderAriaTpl';
    M['02'].previewAriaTpl = 'modules.02.previewAriaTpl';
    M['02'].nowTpl = 'modules.02.nowTpl';
    M['02'].resetDone = 'modules.02.resetDone';
    M['02'].profilesTitle = 'modules.02.profilesTitle';
    M['02'].profilesHint = 'modules.02.profilesHint';
    M['02'].profileApply = 'keys.apply';
    M['02'].profileRemove = 'keys.remove';
    M['02'].profileSaveKey = 'modules.02.profileSaveKey';
    M['02'].profileNameLabel = 'modules.02.profileNameLabel';
    M['02'].profileNameHint = 'modules.02.profileNameHint';
    M['02'].profileNameEmpty = 'modules.02.profileNameEmpty';
    M['02'].profileSavedTpl = 'modules.02.profileSavedTpl';
    M['02'].profileAppliedTpl = 'modules.02.profileAppliedTpl';
    M['02'].profileRemovedTpl = 'modules.02.profileRemovedTpl';
    M['02'].profileFailed = 'modules.02.profileFailed';
    M['02'].profileCustomTpl = 'modules.02.profileCustomTpl';
    M['02'].builtin = [
      { id: raw('builtin.default'), namePL: 'modules.02.builtin.default.name',
        descPL: 'modules.02.builtin.default.desc' },
      { id: raw('builtin.evening'), namePL: 'modules.02.builtin.evening.name',
        descPL: 'modules.02.builtin.evening.desc' },
      { id: raw('builtin.work'), namePL: 'modules.02.builtin.work.name',
        descPL: 'modules.02.builtin.work.desc' }
    ];

    /* ---- 03 Kalibracja ---- */

    M['03'].whyTitle = 'modules.03.whyTitle';
    M['03'].why = 'modules.03.why';
    M['03'].stepsTitle = 'common.stepsTitle';
    M['03'].steps = ['modules.03.steps.1', 'modules.03.steps.2', 'modules.03.steps.3'];
    M['03'].runKey = 'modules.03.runKey';
    M['03'].clearKey = 'modules.03.clearKey';
    M['03'].busyTpl = 'modules.03.busyTpl';
    M['03'].statusNone = 'modules.03.statusNone';
    M['03'].statusOnTpl = 'modules.03.statusOnTpl';
    M['03'].gainsTitle = 'modules.03.gainsTitle';
    M['03'].colChannel = 'col.channel';
    M['03'].colGain = 'col.gain';
    M['03'].gainR = 'modules.03.gainR';
    M['03'].gainG = 'modules.03.gainG';
    M['03'].gainB = 'modules.03.gainB';
    M['03'].gainsNone = 'modules.03.gainsNone';
    M['03'].needRunning = 'modules.03.needRunning';
    M['03'].tooFew = 'modules.03.tooFew';
    M['03'].tooDark = 'modules.03.tooDark';
    M['03'].refused = 'modules.03.refused';
    M['03'].done = 'modules.03.done';
    M['03'].cleared = 'modules.03.cleared';
    M['03'].limitsTitle = 'modules.03.limitsTitle';
    M['03'].limits = ['modules.03.limits.1', 'modules.03.limits.2', 'modules.03.limits.3'];

    /* ---- 04 Raporty ---- */

    M['04'].rangeAria = 'modules.04.rangeAria';
    M['04'].rangeDay = 'modules.04.rangeDay';
    M['04'].rangeWeek = 'modules.04.rangeWeek';
    M['04'].headTpl = 'modules.04.headTpl';
    M['04'].tableTitle = 'modules.04.tableTitle';
    M['04'].tableCaption = 'modules.04.tableCaption';
    M['04'].colMetric = 'col.metric';
    M['04'].colAvg = 'col.avg';
    M['04'].colMin = 'col.min';
    M['04'].colMax = 'col.max';
    M['04'].panoramaTitle = 'modules.04.panoramaTitle';
    M['04'].panoramaAriaTpl = 'modules.04.panoramaAriaTpl';
    M['04'].panoramaSpanDay = 'modules.04.panoramaSpanDay';
    M['04'].panoramaSpanWeek = 'modules.04.panoramaSpanWeek';
    M['04'].panoramaHint = 'modules.04.panoramaHint';
    M['04'].coverageDayTpl = 'modules.04.coverageDayTpl';
    M['04'].coverageWeekTpl = 'modules.04.coverageWeekTpl';
    M['04'].zonesTitle = 'modules.04.zonesTitle';
    M['04'].zonesCaptionTpl = 'modules.04.zonesCaptionTpl';
    M['04'].zoneGood = 'zone.good';
    M['04'].zoneWarning = 'zone.warning';
    M['04'].zoneCritical = 'zone.critical';
    M['04'].worstTpl = 'modules.04.worstTpl';
    M['04'].worstNone = 'modules.04.worstNone';
    M['04'].worstHourTpl = 'modules.04.worstHourTpl';
    M['04'].adviceTitle = 'modules.04.adviceTitle';
    M['04'].adviceMelanopicTpl = 'modules.04.adviceMelanopicTpl';
    M['04'].adviceKelvinTpl = 'modules.04.adviceKelvinTpl';
    M['04'].adviceFlickerTpl = 'modules.04.adviceFlickerTpl';
    M['04'].adviceUniformityTpl = 'modules.04.adviceUniformityTpl';
    M['04'].adviceWorstTpl = 'modules.04.adviceWorstTpl';
    M['04'].adviceNone = 'modules.04.adviceNone';
    M['04'].limitsTitle = 'modules.04.limitsTitle';
    M['04'].limits = function () {
      return t('modules.04.limitsLead') + ' ' + t('legal.mdr', { app: appName() });
    };
    M['04'].printHint = 'modules.04.printHint';

    /* ---- 05 Eksport ---- */

    M['05'].rangeAria = 'modules.05.rangeAria';
    M['05'].range1h = 'modules.05.range1h';
    M['05'].range24h = 'modules.05.range24h';
    M['05'].range7d = 'modules.05.range7d';
    M['05'].range30d = 'modules.05.range30d';
    M['05'].csvKey = 'modules.05.csvKey';
    M['05'].jsonKey = 'modules.05.jsonKey';
    M['05'].formatTitle = 'modules.05.formatTitle';
    M['05'].formatCsv = 'modules.05.formatCsv';
    M['05'].formatJson = 'modules.05.formatJson';
    M['05'].resolution = 'modules.05.resolution';
    M['05'].offline = 'modules.05.offline';
    M['05'].columnsTitle = 'modules.05.columnsTitle';
    M['05'].columnsCaption = 'modules.05.columnsCaption';
    M['05'].colName = 'col.name';
    M['05'].colMeaning = 'col.meaning';
    M['05'].colDate = 'col.date';
    M['05'].colTime = 'col.time';
    M['05'].colZone = 'col.zone';
    M['05'].descDate = 'modules.05.descDate';
    M['05'].descTime = 'modules.05.descTime';
    M['05'].descZone = 'modules.05.descZone';
    M['05'].descMetricTpl = 'modules.05.descMetricTpl';
    M['05'].previewTitle = 'modules.05.previewTitle';
    M['05'].previewHint = 'modules.05.previewHint';
    M['05'].savedTpl = 'modules.05.savedTpl';
    M['05'].failed = 'modules.05.failed';

    /* ---- 06 Porównanie ---- */

    M['06'].intro = 'modules.06.intro';
    M['06'].noSessions = 'modules.06.noSessions';
    M['06'].slotA = 'modules.06.slotA';
    M['06'].slotB = 'modules.06.slotB';
    M['06'].sessionTpl = 'modules.06.sessionTpl';
    M['06'].tapeTitle = 'modules.06.tapeTitle';
    M['06'].tapeAriaTpl = 'modules.06.tapeAriaTpl';
    M['06'].tapeHint = 'modules.06.tapeHint';
    M['06'].tapeChannelTpl = 'modules.06.tapeChannelTpl';
    M['06'].diffTitle = 'modules.06.diffTitle';
    M['06'].diffCaption = 'modules.06.diffCaption';
    M['06'].colMetric = 'col.metric';
    M['06'].colA = 'col.a';
    M['06'].colB = 'col.b';
    M['06'].colDiff = 'col.diff';
    M['06'].clearKey = 'modules.06.clearKey';
    M['06'].cleared = 'modules.06.cleared';
    M['06'].savedTpl = 'modules.06.savedTpl';
    M['06'].limitsTitle = 'modules.06.limitsTitle';
    M['06'].limits = 'modules.06.limits';
    M['06'].keepTpl = 'modules.06.keepTpl';

    /* ---- 07 Test ekranu ---- */

    M['07'].intro = 'modules.07.intro';
    M['07'].stepsTitle = 'common.stepsTitle';
    M['07'].steps = [
      'modules.07.steps.1', 'modules.07.steps.2', 'modules.07.steps.3', 'modules.07.steps.4'
    ];
    M['07'].planesTitle = 'modules.07.planesTitle';
    M['07'].exitKey = 'modules.07.exitKey';
    M['07'].showKey = 'keys.show';
    M['07'].showAriaTpl = 'modules.07.showAriaTpl';
    M['07'].planeAriaTpl = 'modules.07.planeAriaTpl';
    M['07'].planes = [
      { id: raw('white'), namePL: 'modules.07.plane.white.name', hintPL: 'modules.07.plane.white.hint' },
      { id: raw('gray75'), namePL: 'modules.07.plane.gray75.name', hintPL: 'modules.07.plane.gray75.hint' },
      { id: raw('gray50'), namePL: 'modules.07.plane.gray50.name', hintPL: 'modules.07.plane.gray50.hint' },
      { id: raw('gray25'), namePL: 'modules.07.plane.gray25.name', hintPL: 'modules.07.plane.gray25.hint' },
      { id: raw('black'), namePL: 'modules.07.plane.black.name', hintPL: 'modules.07.plane.black.hint' },
      { id: raw('red'), namePL: 'modules.07.plane.red.name', hintPL: 'modules.07.plane.red.hint' },
      { id: raw('green'), namePL: 'modules.07.plane.green.name', hintPL: 'modules.07.plane.green.hint' },
      { id: raw('blue'), namePL: 'modules.07.plane.blue.name', hintPL: 'modules.07.plane.blue.hint' },
      { id: raw('grid'), namePL: 'modules.07.plane.grid.name', hintPL: 'modules.07.plane.grid.hint' }
    ];
    M['07'].warnTitle = 'note.warningTitle';
    M['07'].warn = 'modules.07.warn';
    M['07'].cameraTitle = 'modules.07.cameraTitle';
    M['07'].camera = 'modules.07.camera';

    /* ---- 08 Harmonogram ---- */

    M['08'].intro = 'modules.08.intro';
    M['08'].onlyOpenTitle = 'modules.08.onlyOpenTitle';
    M['08'].onlyOpen = 'modules.08.onlyOpen';
    M['08'].enableLabel = 'modules.08.enableLabel';
    M['08'].timesTitle = 'modules.08.timesTitle';
    M['08'].timeAriaTpl = 'modules.08.timeAriaTpl';
    M['08'].addKey = 'modules.08.addKey';
    M['08'].removeKey = 'keys.remove';
    M['08'].removeAriaTpl = 'modules.08.removeAriaTpl';
    M['08'].addedTpl = 'modules.08.addedTpl';
    M['08'].removedTpl = 'modules.08.removedTpl';
    M['08'].badTime = 'modules.08.badTime';
    M['08'].nextTpl = 'modules.08.nextTpl';
    M['08'].nextNone = 'modules.08.nextNone';
    M['08'].dueTpl = 'modules.08.dueTpl';
    M['08'].dueKey = 'modules.08.dueKey';

    /* ---- 09 Alerty ---- */

    M['09'].intro = 'modules.09.intro';
    M['09'].enableLabel = 'modules.09.enableLabel';
    M['09'].metricLabel = 'modules.09.metricLabel';
    M['09'].levelLabel = 'modules.09.levelLabel';
    M['09'].levelWarning = 'modules.09.levelWarning';
    M['09'].levelCritical = 'modules.09.levelCritical';
    M['09'].sustainLabel = 'modules.09.sustainLabel';
    M['09'].sustainHint = 'modules.09.sustainHint';
    M['09'].soundLabel = 'modules.09.soundLabel';
    M['09'].soundHint = 'modules.09.soundHint';
    M['09'].cooldownHint = 'modules.09.cooldownHint';
    M['09'].whenNotTitle = 'modules.09.whenNotTitle';
    M['09'].whenNot = 'modules.09.whenNot';
    M['09'].firedTpl = 'modules.09.firedTpl';
    M['09'].saved = 'modules.09.saved';
    M['09'].statusOnTpl = 'modules.09.statusOnTpl';

  }(SHAPE.modules));

  /* ------------------------------------------------------------------
     Budowanie Scale.TEXT z mapy
     ------------------------------------------------------------------ */

  function isArray(v) {
    return Object.prototype.toString.call(v) === '[object Array]';
  }

  /* Jedna reguła na całą mapę: napis to klucz słownika, funkcja to wynik jej
     wywołania, tablica i obiekt idą wgłąb. Nic innego w mapie nie występuje. */
  function resolveShape(node) {
    if (typeof node === 'string') return t(node);
    if (typeof node === 'function') return node();
    if (isArray(node)) {
      var list = [];
      for (var i = 0; i < node.length; i += 1) list.push(resolveShape(node[i]));
      return list;
    }
    if (node && typeof node === 'object') {
      var out = {};
      for (var k in node) {
        if (Object.prototype.hasOwnProperty.call(node, k)) out[k] = resolveShape(node[k]);
      }
      return out;
    }
    return node;
  }

  /* Dokłada gałęzie, których jeszcze nie ma, i NIE nadpisuje istniejących —
     dokładnie tak, jak robiły to dotąd warunki `if (!st.appearanceTitle)`
     w docs.js. Właścicielem wspólnej gałęzi zostaje ten, kto ją założył. */
  function mergeMissing(target, source) {
    for (var k in source) {
      if (!Object.prototype.hasOwnProperty.call(source, k)) continue;
      var v = source[k];
      if (v && typeof v === 'object' && !isArray(v) &&
          target[k] && typeof target[k] === 'object' && !isArray(target[k])) {
        mergeMissing(target[k], v);
      } else if (!Object.prototype.hasOwnProperty.call(target, k)) {
        target[k] = v;
      }
    }
    return target;
  }

  /* Mapy dopisywane przez docs.js i support.js. Trzymane, a nie tylko raz
     wykonane, bo po zmianie języka trzeba je przejść jeszcze raz — inaczej
     ekran dokumentacji zostałby w poprzednim języku. */
  var parts = [];

  function buildText() {
    var text = resolveShape(SHAPE);
    for (var i = 0; i < parts.length; i += 1) {
      try { mergeMissing(text, resolveShape(parts[i])); }
      catch (err) { if (global.console) console.error('scale.js: fragment słownika nie zbudował się', err); }
    }
    return text;
  }

  Scale.TEXT = buildText();

  /**
   * Dopisuje własną mapę do Scale.TEXT — dla plików, które mają napisy
   * wyłącznie swoich ekranów (docs.js, support.js). Mapa ma ten sam kształt
   * co SHAPE wyżej: liściem jest klucz słownika albo funkcja.
   *
   * Fragment jest zapamiętywany, więc po zmianie języka zbuduje się na nowo.
   * Klucza, który już w Scale.TEXT stoi, fragment NIE nadpisuje.
   */
  Scale.registerText = function (shape) {
    if (!shape || typeof shape !== 'object') return false;
    parts.push(shape);
    try { mergeMissing(Scale.TEXT, resolveShape(shape)); }
    catch (err) { if (global.console) console.error('scale.js: fragment słownika nie zbudował się', err); }
    return true;
  };

  /** Przebudowuje CAŁY Scale.TEXT z aktywnego języka. Woła się sama po
   *  zdarzeniu 'i18n:changed'; wystawiona, bo bez niej nie da się tego
   *  sprawdzić z konsoli. */
  Scale.rebuildText = function () {
    Scale.TEXT = buildText();
    return Scale.TEXT;
  };

  /* ------------------------------------------------------------------
     Nazwy siedmiu wielkości

     Metrics.CATALOGUE jest wspólny dla v2-v4 i ma w sobie polskie namePL,
     shortPL i helpPL. Katalogu nie ruszamy (pilnuje go docs/lib/
     shared-parity.test.js), więc napisy bierzemy stąd — z warstwy językowej,
     kluczami 'metric.<id>.*'. Gdyby klucza zabrakło, spadamy na katalog:
     lepszy polski napis niż goła nazwa klucza na ekranie.
     ------------------------------------------------------------------ */

  function metricText(id, suffix, legacy) {
    var key = 'metric.' + id + '.' + suffix;
    var api = I18n();
    if (api && typeof api.has === 'function' && !api.has(key)) {
      var m = global.Metrics && global.Metrics.byId ? global.Metrics.byId(id) : null;
      if (m && m[legacy]) return m[legacy];
    }
    return t(key);
  }

  /** Nazwa wielkości, np. 'Udział niebieskiego'. */
  Scale.metricName = function (id) { return metricText(id, 'name', 'namePL'); };
  /** Jedno zdanie o tym, co ta wielkość mierzy. */
  Scale.metricShort = function (id) { return metricText(id, 'short', 'shortPL'); };
  /** Dłuższe wyjaśnienie do arkusza pomocy. */
  Scale.metricHelp = function (id) { return metricText(id, 'help', 'helpPL'); };

  /* ------------------------------------------------------------------
     Zmiana języka

     Ten plik reaguje PIERWSZY — stoi w index.html przed shell.js i dash.js,
     a Bus wywołuje słuchaczy w kolejności zapisania. Dzięki temu, gdy powłoka
     i pulpit dostaną to samo zdarzenie, Scale.TEXT jest już nowy.
     ------------------------------------------------------------------ */

  if (global.Bus && typeof global.Bus.on === 'function') {
    global.Bus.on('i18n:changed', function () { Scale.rebuildText(); });
  }

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

     WARSTWA JĘZYKOWA (ten plik)
       Scale.metricName(id) / metricShort(id) / metricHelp(id)
                                            -> nazwa i opisy wielkości
       Scale.registerText(shape)            -> dopisz własną mapę do Scale.TEXT
       Scale.rebuildText()                  -> przebuduj Scale.TEXT po zmianie języka

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
       .docs       — dopisuje docs.js przez Scale.registerText
       .support    — dopisuje support.js przez Scale.registerText

     Nazwy, opisy i pomoc siedmiu wielkości NIE są w Scale.TEXT — sięga się
     po nie przez Scale.metricName / metricShort / metricHelp. Jednostki
     i zakresy zostają w Metrics.CATALOGUE, bo to liczby, nie napisy.
     ------------------------------------------------------------------ */

}(typeof window !== 'undefined' ? window : globalThis));
