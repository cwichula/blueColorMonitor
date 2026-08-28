/* docs/v3/i18n/en.js — słownik WŁASNY wersji v3, angielski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/en.js — i ZAWSZE,
 * także gdy aktywny jest inny język. Angielski jest wartością zapasową każdego
 * brakującego klucza, więc ten plik musi być kompletny; pozostałe 28 języków
 * wolno uzupełniać stopniowo.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js tego katalogu — pilnuje
 * tego docs/shared/i18n/keys.test.js. Kluczy, które stoją w słowniku wspólnym
 * (nazwy stref, zdania oceniające, noty o granicach metody, nazwy i opisy
 * siedmiu wielkości, zastrzeżenie z rozporządzenia (UE) 2017/745), tu NIE MA —
 * poza jednym świadomym nadpisaniem, opisanym przy 'verdict.critical.comfort'.
 *
 * TŁUMACZENIE JEST WZORCEM DLA POZOSTAŁYCH 28 JĘZYKÓW, więc:
 *  • angielszczyzna brytyjska („colour”), jak w docs/shared/i18n/en.js;
 *  • nazwy wielkości brzmią DOKŁADNIE tak, jak w warstwie wspólnej: blue share,
 *    scene brightness, colour temperature, circadian impact, flicker,
 *    uniformity, eye comfort;
 *  • zastrzeżenia medyczne i akapity o prywatności przetłumaczone DOKŁADNIE,
 *    bez osłabiania i bez dodawania obietnic — to zdania o skutkach prawnych.
 *
 * ZAPIS LICZB WE WZORACH. Polska redakcja pisze przecinek dziesiętny
 * („0,3320”), angielska kropkę („0.3320”) — i tak ma być w każdym języku,
 * bo wzory czyta człowiek, a nie parser. Liczby wstawiane przez '{…}' są
 * osobną sprawą: te formatuje warstwa językowa według aktywnego języka.
 */
window.I18nData = window.I18nData || {};
window.I18nData['en'] = Object.assign(window.I18nData['en'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. */
  'app.wordmark': 'LIGHT MONITOR',

  'state.idle': 'Ready',
  'state.starting': 'Starting',
  'state.running': 'Measuring',
  'state.runningTpl': 'Measuring {time}',
  'state.stopped': 'Stopped',
  'state.error': 'Camera error',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5.0 po angielsku, 5,0 po polsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'Start measuring',
  'keys.starting': 'Starting…',
  'keys.stop': 'Stop',
  'keys.flip': 'Flip',
  'keys.flipAria': 'Switch camera, front or rear',
  'keys.menu': 'Menu',
  'keys.menuAria': 'List of modules',
  'keys.back': '‹ Back',
  'keys.backAria': 'Back to the dashboard',
  'keys.dash': 'Dashboard',
  'keys.zoom': 'Enlarge the preview',
  'keys.retry': 'Try again',
  'keys.refresh': 'Refresh',
  'keys.close': 'Close',
  'keys.show': 'Show',
  'keys.apply': 'Apply',
  'keys.remove': 'Delete',

  'monitor.legend': 'Control preview',
  'monitor.badge': 'Live',

  'aim.title': 'Aiming',
  'aim.hint': 'The frame shows exactly the part of the image the app measures.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'Main channel',
  'readout.thresholdTpl': '(threshold {value})',
  'readout.contextTpl': 'min {min} · avg {avg} · max {max} — last 60 s',
  'readout.contextEmpty': 'no data from the last 60 s',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'What this means: {name}',
  'aria.channel': '{name}, {value}, {zone}. Show on the large display.',
  'aria.channelStale': '{name}, no data. Show on the large display.',
  'aria.scale': 'Scale: {name}, from {min} to {max}. Now {value}, {zone}. Caution threshold {warn}, critical threshold {crit}.',
  'aria.readout': '{name}: {value}, {zone}.',
  'aria.readoutApprox': '{name}: about {value}, {zone}. An approximate value.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'Main channel scale. No data',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': 'Press “Start measuring”, point the phone at a lit surface and hold it still for a few seconds.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'Eye comfort is low. Look in module 01 to see what lowers it.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'Start with the “Start measuring” key at the bottom of the screen. The camera comes on only once you press it.',
  'transient.measureStopped': 'Measurement finished · {time} · saved to the history.',
  'transient.newVersion': 'There is a new version of the app.',
  'transient.thresholdsSaved': 'Thresholds saved.',
  'transient.thresholdsRejected': 'Not saved — the caution threshold and the critical threshold cannot cross.',
  'transient.historyCleared': 'History cleared.',

  'live.lead': 'Main channel: {name}, {value}, {zone}.',
  'live.ready': 'Verdict ready. {name} {value}, {zone}.',
  'live.started': 'Measurement started.',
  'livebar.stopped': 'Measurement stopped',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'There are no recordings yet. The history is written while measuring — run a measurement for a minute and come back here.',
  'empty.recorderNoRange': 'There was no measurement in this range.',
  'empty.coverageTpl': 'Measuring covered {done} of {total} hours.',
  'empty.reportsNoData': 'The daily report will appear after the first full day with measurements.',
  'empty.compareOneSession': 'Comparing needs two finished sessions. So far you have one.',
  'empty.exportNoData': 'There is nothing to export. Start measuring so that the history has something in it.',
  'empty.alertsOff': 'Alerts are off. Once switched on, they work only while the app is open.',
  'empty.scheduleEmpty': 'No time has been set. The schedule works only while the app is open.',
  'empty.historyEmpty': 'The history is empty.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'List of modules',

  'modules.01.title': 'Recorder',
  'modules.01.desc': 'The course of the measurement over time, from a minute to thirty days.',
  'modules.02.title': 'Thresholds',
  'modules.02.desc': 'Set your own caution and alarm boundaries for every quantity.',
  'modules.03.title': 'Calibration',
  'modules.03.desc': 'A reference to a known light source, and what calibration will not fix.',
  'modules.04.title': 'Reports',
  'modules.04.desc': 'Daily and weekly summaries laid out like a printout.',
  'modules.05.title': 'Export',
  'modules.05.desc': 'Saving the readings to a CSV or JSON file, with the columns described.',
  'modules.06.title': 'Comparison',
  'modules.06.desc': 'Two sessions side by side, with the difference given as a number.',
  'modules.07.title': 'Screen test',
  'modules.07.desc': 'Test patterns for checking your own monitor, step by step.',
  'modules.08.title': 'Schedule',
  'modules.08.desc': 'Measurements at times you choose.',
  'modules.09.title': 'Alerts',
  'modules.09.desc': 'A notification once a threshold is crossed — and when it will not work.',
  'modules.10.title': 'Support',
  'modules.10.desc': 'The app is free in its entirety. Here you can buy the author a coffee.',
  'modules.11.title': 'Documentation',
  'modules.11.desc': 'What this measurement is, and what it certainly is not.',
  'modules.12.title': 'Settings',
  'modules.12.desc': 'Theme, text size, reduced motion, clearing the history.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'Measurement channels',
  'channels.pick': 'Show on the large display',
  'channels.stale': 'no data',
  'channels.approx': 'an approximate value',

  'help.unit': 'Unit',
  'help.range': 'Range',
  'help.thresholds': 'Thresholds',
  'help.warn': 'Caution threshold',
  'help.crit': 'Critical threshold',
  'help.now': 'now',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „Quantity” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'Quantity',
  'col.unit': 'Unit',
  'col.range': 'Range',
  'col.direction': 'Direction',
  'col.time': 'Time',
  'col.date': 'Date',
  'col.zone': 'Zone',
  'col.avg': 'Average',
  'col.min': 'Minimum',
  'col.max': 'Maximum',
  'col.name': 'Column',
  'col.meaning': 'What it holds',
  'col.channel': 'Channel',
  'col.gain': 'Gain',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'Time range',
  'recorder.range.60s': '60 s',
  'recorder.range.15min': '15 min',
  'recorder.range.1h': '1 hr',
  'recorder.range.24h': '24 hr',
  'recorder.range.30d': '30 days',
  'recorder.gap': 'no measurement',
  'recorder.sessionTitle': 'Session statistics',
  'recorder.zonesCaption': 'Zone breakdown for the blue share',
  'recorder.tableCaption': 'Readings from the selected range',
  'recorder.crosshair': 'Reading crosshair',
  'recorder.prevAria': 'Earlier point',
  'recorder.nextAria': 'Later point',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'Appearance',
  'settings.themeLabel': 'Theme',
  'settings.themeSystem': 'Match the system',
  'settings.themeLight': 'Light',
  'settings.themeDark': 'Dark',
  'settings.themeHint': 'The “match the system” theme changes together with the setting on your phone.',
  'settings.textLabel': 'Text size',
  /* Mnożnik jako LICZBA we wstawce — 1.15 po angielsku, 1,15 po polsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'Enlarges the whole interface, not only the letters — keys and rows grow together with the text.',
  'settings.motionGroup': 'Motion',
  'settings.motionLabel': 'Reduce motion',
  'settings.motionHint': 'Switches off every transition. The scale pointer then jumps once a second instead of gliding.',
  'settings.dataTitle': 'Data',
  'settings.clearLabel': 'Clear the history',
  'settings.clearHintTpl': 'The history currently holds {count} saved points.',
  'settings.clearHintEmpty': 'The history is empty.',
  'settings.clearTitle': 'Clear the history?',
  'settings.clearConfirm': 'Clear the whole measurement history? This cannot be undone.',
  'settings.clearKey': 'Clear',
  'settings.aboutTitle': 'About the app',
  'settings.versionTpl': '{app}, version {version}.',
  'settings.offlineText': 'The app works without a network. After the first opening all of its files sit in the browser storage, so aeroplane mode changes nothing. Nothing is sent to any server, because the app makes no network requests.',
  'settings.docsKey': 'Open the documentation',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'Cancel',
  'common.save': 'Save',
  'common.reset': 'Restore defaults',
  'common.yes': 'Yes',
  'common.no': 'No',
  'common.on': 'On',
  'common.off': 'Off',
  'common.sep': ' · ',
  'common.stepsTitle': 'Step by step',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'What your own thresholds are for',
  'modules.02.intro': 'A threshold decides when the app says “Caution” and when it says “Critical”. The default values are our editorial judgement, not a standard — if you measure in different conditions, move them to suit yourself. The verdict and the sentence on the dashboard are computed from the new thresholds straight away.',
  'modules.02.orderNormal': 'The caution threshold must lie below the critical one.',
  'modules.02.orderInvert': 'Here a higher value is better, so the caution threshold lies above the critical one.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'Scale preview: {name}',
  'modules.02.nowTpl': 'now {value}',
  'modules.02.resetDone': 'Default thresholds restored.',
  'modules.02.profilesTitle': 'Profiles',
  'modules.02.profilesHint': 'A profile is a saved set of thresholds for all seven quantities. Applying a profile swaps them all at once.',
  'modules.02.profileSaveKey': 'Save the current thresholds',
  'modules.02.profileNameLabel': 'Name of the new profile',
  'modules.02.profileNameHint': 'The name stays on this device. 40 characters at most.',
  'modules.02.profileNameEmpty': 'Enter a profile name.',
  'modules.02.profileSavedTpl': 'Saved the “{name}” profile.',
  'modules.02.profileAppliedTpl': 'Applied the “{name}” profile.',
  'modules.02.profileRemovedTpl': 'Deleted the “{name}” profile.',
  'modules.02.profileFailed': 'That profile could not be applied.',
  'modules.02.profileCustomTpl': 'Your own profile, saved {date}.',
  'modules.02.builtin.default.name': 'Default',
  'modules.02.builtin.default.desc': 'The thresholds from the catalogue of quantities — the starting point for every measurement.',
  'modules.02.builtin.evening.name': 'Evening — gentle',
  'modules.02.builtin.evening.desc': 'Warns earlier about cool colour and circadian impact.',
  'modules.02.builtin.work.name': 'Desk work',
  'modules.02.builtin.work.desc': 'Allows bright, cool daylight; watches flicker and uniformity.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'Why this works',
  'modules.03.why': 'A camera sensor has a fixed bias between its channels. Measuring a sheet of white paper shows how large that bias is and lets it be subtracted. It is the one feature in this app that genuinely improves accuracy — and it still does not turn a camera into a spectrometer.',
  'modules.03.steps.1': 'Put a sheet of white paper under the light you are measuring.',
  'modules.03.steps.2': 'Press “Start measuring” on the dashboard and fill the frame with the paper.',
  'modules.03.steps.3': 'Come back here, press “Calibrate” and hold the phone still for three seconds.',
  'modules.03.runKey': 'Calibrate (3 s)',
  'modules.03.clearKey': 'Delete the calibration',
  'modules.03.busyTpl': 'Measuring the paper… {sec} s left',
  'modules.03.statusNone': 'No calibration. Measuring works; treat the values as comparative.',
  'modules.03.statusOnTpl': 'Calibrated {date} at {time}.',
  'modules.03.gainsTitle': 'Channel gains',
  'modules.03.gainR': 'Red',
  'modules.03.gainG': 'Green',
  'modules.03.gainB': 'Blue',
  'modules.03.gainsNone': 'not set',
  'modules.03.needRunning': 'Start measuring first and point the camera at a sheet of white paper.',
  'modules.03.tooFew': 'Too few samples. Check that the measurement is really running.',
  'modules.03.tooDark': 'The image is too dark to calibrate. Light the paper better and try again.',
  'modules.03.refused': 'The channel bias is too large to accept as a calibration. Use white paper in even light.',
  'modules.03.done': 'Calibrated. Colour temperature and circadian impact will be more accurate now.',
  'modules.03.cleared': 'Calibration deleted.',
  'modules.03.limitsTitle': 'What calibration does not fix',
  'modules.03.limits.1': 'Calibration levels the three channels of the camera and nothing beyond that. It does not give the camera a spectrum, so colour temperature and circadian impact remain approximations calculated from sRGB primaries.',
  'modules.03.limits.2': 'It does not turn scene brightness into an absolute quantity — that number stays relative. It does not switch off the automatic exposure or white balance, which shift the reading underneath.',
  'modules.03.limits.3': 'It does not carry over to other light: a calibration made under one bulb describes that bulb. With a different source, repeat it. And it changes nothing about what this measurement is not — it is still not an examination and still not a basis for diagnosing an illness.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'Report period',
  'modules.04.rangeDay': 'Day',
  'modules.04.rangeWeek': 'Week',
  'modules.04.headTpl': 'From {from} to {to} · {count} points of history.',
  'modules.04.tableTitle': 'Summary',
  'modules.04.tableCaption': 'Average, minimum and maximum over the selected period',
  'modules.04.panoramaTitle': 'Panorama',
  'modules.04.panoramaAriaTpl': 'Panorama: {name}, {span}.',
  'modules.04.panoramaSpanDay': 'the last 24 hours broken down by hour',
  'modules.04.panoramaSpanWeek': 'the last week broken down by day',
  'modules.04.panoramaHint': 'The height and the colour of a bar say the same thing: within range — low, caution — middling, critical — full. A dash at the base marks an hour without a measurement.',
  'modules.04.coverageDayTpl': 'Measuring covered {done} of {total} hours.',
  'modules.04.coverageWeekTpl': 'Measuring covered {done} of {total} days.',
  'modules.04.zonesTitle': 'Zone breakdown',
  'modules.04.zonesCaptionTpl': 'Calculated for the main channel: {name}.',
  'modules.04.worstTpl': 'Hardest time: {value}.',
  'modules.04.worstNone': 'none stands out',
  'modules.04.worstHourTpl': '{hour}',
  'modules.04.adviceTitle': 'What to do about it',
  'modules.04.adviceMelanopicTpl': 'The average circadian impact was {value}×. In the evening it is worth going below 0.50 — most easily with a warmer bulb or night mode.',
  'modules.04.adviceKelvinTpl': 'The light was cool ({value} K on average). For work that is fine; for the two hours before sleep, below 3000 K is gentler.',
  'modules.04.adviceFlickerTpl': 'There is noticeable flicker ({value}% on average). It is usually down to a cheap dimmer or a backlight driver.',
  'modules.04.adviceUniformityTpl': 'The light is spread unevenly ({value}%). Moving the lamp or changing its angle usually does more than changing the bulb.',
  'modules.04.adviceWorstTpl': 'Most of the readings outside the thresholds gather at {hour}.',
  'modules.04.adviceNone': 'Nothing in this period stands out beyond the thresholds you set.',
  'modules.04.limitsTitle': 'This is not health advice',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'The conclusions follow solely from what this phone’s camera saw. The app does not measure a spectrum and makes no diagnosis.',
  'modules.04.printHint': 'This page is laid out like a printout: the table and the captions read the same on paper, under the system magnifier and in a screen reader.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'Data range',
  'modules.05.range1h': 'Hour',
  'modules.05.range24h': 'Day',
  'modules.05.range7d': '7 days',
  'modules.05.range30d': '30 days',
  'modules.05.csvKey': 'Save the CSV file',
  'modules.05.jsonKey': 'Save the JSON file',
  'modules.05.formatTitle': 'File format',
  'modules.05.formatCsv': 'CSV: a semicolon separates the columns, a comma is the decimal separator, the encoding is UTF-8 with a byte order mark. Excel set to a locale that uses the comma as its decimal separator opens such a file without configuring anything.',
  'modules.05.formatJson': 'JSON: the same data in the “points” field, with a decimal point and a timestamp in milliseconds — that is what the format requires.',
  'modules.05.resolution': 'The history saves one point every 5 seconds and reaches 30 days back. The file does not contain the full resolution of five samples a second — the engine keeps that for one minute only.',
  'modules.05.offline': 'The file is created on the device and stays on the device. Exporting connects to no network.',
  'modules.05.columnsTitle': 'The columns explained',
  'modules.05.columnsCaption': 'The columns of the file and what they mean',
  'modules.05.descDate': 'The date of the point from the device clock, written day-month-year.',
  'modules.05.descTime': 'The time of the point, to the second.',
  'modules.05.descZone': 'The blue share zone at the moment of saving. The engine saves the zone for that one quantity only — for the others, work it out from the thresholds.',
  'modules.05.descMetricTpl': '{short} Unit: {unit}. Range {min}–{max}.',
  'modules.05.previewTitle': 'Preview',
  'modules.05.previewHint': 'The first five rows of the file, exactly as they will be saved.',
  'modules.05.savedTpl': 'Saved the file {name} — {rows} rows.',
  'modules.05.failed': 'This browser would not let the file be saved.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'The app saves every finished measuring session on this device. Pick two to see them on one tape and read the difference as a number.',
  'modules.06.noSessions': 'There is no finished session yet. Start a measurement, stop it and come back here.',
  'modules.06.slotA': 'Session A',
  'modules.06.slotB': 'Session B',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'Tape',
  'modules.06.tapeAriaTpl': 'The course of session {slot}, quantity {name}.',
  'modules.06.tapeHint': 'Both sessions are stretched to the same width: a bar is the same fraction of the duration, not the same clock time. The height and the colour say the same as on the dashboard.',
  'modules.06.tapeChannelTpl': 'The tape shows the main channel: {name}.',
  'modules.06.diffTitle': 'Difference',
  'modules.06.diffCaption': 'The averages of both sessions and the difference between them',
  'modules.06.clearKey': 'Delete the saved sessions',
  'modules.06.cleared': 'The saved sessions have been deleted.',
  'modules.06.savedTpl': 'Session saved: {dur}.',
  'modules.06.limitsTitle': 'What this comparison does not tell you',
  'modules.06.limits': 'You are comparing two measurements, not two light sources. If the framing, the distance, the time of day or the position of the phone changed between the sessions, the difference is about that too. The most honest comparison is the same scene before and after a change of lighting.',
  'modules.06.keepTpl': 'At most {count} of the most recent sessions are remembered.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'The test patterns are displayed full screen on this device. They are for looking at the screen with your own eyes: whether the white is even, whether the greys drift into a colour and whether the backlight leaks at the corners.',
  'modules.07.steps.1': 'Set the screen brightness to the level you normally work at and switch off the system night mode.',
  'modules.07.steps.2': 'Choose a pattern from the list below. It will fill the whole screen.',
  'modules.07.steps.3': 'Look from about sixty centimetres, square on to the screen. Then look at the same pattern from an angle.',
  'modules.07.steps.4': 'Leave with the “Close the pattern” key or the Escape key and go on to the next one.',
  'modules.07.planesTitle': 'Patterns',
  'modules.07.exitKey': 'Close the pattern',
  'modules.07.showAriaTpl': 'Show the pattern: {name}',
  'modules.07.planeAriaTpl': 'Test pattern: {name}. The close key is at the bottom of the screen.',
  'modules.07.plane.white.name': 'White',
  'modules.07.plane.white.hint': 'Look for patches, colour casts and brighter areas near the edges. White should be one colour across the whole surface.',
  'modules.07.plane.gray75.name': 'Grey 75%',
  'modules.07.plane.gray75.hint': 'Grey should be grey. A greenish or pinkish cast means the screen’s white balance has drifted.',
  'modules.07.plane.gray50.name': 'Grey 50%',
  'modules.07.plane.gray50.hint': 'The best pattern for judging a colour cast. Compare the middle with the corners.',
  'modules.07.plane.gray25.name': 'Grey 25%',
  'modules.07.plane.gray25.hint': 'Dark grey reveals backlight leaks and banding on cheap panels.',
  'modules.07.plane.black.name': 'Black',
  'modules.07.plane.black.hint': 'In a dark room this shows every backlight leak and every brightened corner.',
  'modules.07.plane.red.name': 'Pure red',
  'modules.07.plane.red.hint': 'Uniform red reveals dead subpixels and unevenness in the panel.',
  'modules.07.plane.green.name': 'Pure green',
  'modules.07.plane.green.hint': 'Green carries the most brightness — a damaged pixel is easiest to spot on it.',
  'modules.07.plane.blue.name': 'Pure blue',
  'modules.07.plane.blue.hint': 'Blue shows dirt and smears on the surface of the screen better than white does.',
  'modules.07.plane.grid.name': 'Grid',
  'modules.07.plane.grid.hint': 'The lines should be as sharp in the corners as in the middle. Blurring at the edges is a matter of image scaling.',
  'modules.07.warn': 'A pattern covers the whole screen, the control dashboard with the measuring key included. It is the only place in the app where that happens, which is why the exit key is large and always visible. While a pattern is on screen the measurement keeps running and cannot be stopped — close the pattern to get back to the keys.',
  'modules.07.cameraTitle': 'What you cannot do here',
  'modules.07.camera': 'A phone does not see its own screen, so you cannot measure these patterns with the same device. To measure a monitor, display the pattern on the monitor and measure with the phone — two different devices and two different roles.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'The schedule reminds you to measure at a set time. It does not switch the camera on by itself: at the appointed hour it shows a reminder, and you start the measurement with the “Start measuring” key on the dashboard. Just as you did the first time.',
  'modules.08.onlyOpenTitle': 'When this will not work',
  'modules.08.onlyOpen': 'The schedule works only while the app is open. A closed browser tab counts no time and will remind you of nothing. We do not ask for permission to send system notifications and we send nothing to the network.',
  'modules.08.enableLabel': 'Turn on reminders',
  'modules.08.timesTitle': 'Times',
  'modules.08.timeAriaTpl': 'Time {n}: hour of the reminder',
  'modules.08.addKey': 'Add a time',
  'modules.08.removeAriaTpl': 'Delete the {time} time',
  'modules.08.addedTpl': 'Added the {time} time.',
  'modules.08.removedTpl': 'Deleted the {time} time.',
  'modules.08.badTime': 'Enter the time in the 22:00 format.',
  'modules.08.nextTpl': 'Next reminder: {time}.',
  'modules.08.nextNone': 'Reminders are off.',
  'modules.08.dueTpl': 'Scheduled measuring time: {time}.',
  'modules.08.dueKey': 'Show the dashboard',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'An alert watches one quantity and speaks up only once that quantity has held the chosen zone without a break for the time you set. It never stops the measurement and never covers the keys.',
  'modules.09.enableLabel': 'Turn on alerts',
  'modules.09.metricLabel': 'Quantity to watch',
  'modules.09.levelLabel': 'From which zone',
  'modules.09.levelWarning': 'From caution upwards',
  'modules.09.levelCritical': 'Critical only',
  'modules.09.sustainLabel': 'After how many seconds without a break',
  'modules.09.sustainHint': 'Shorter times give more false alarms when you move the phone. We do not go below five seconds.',
  'modules.09.soundLabel': 'A short beep',
  'modules.09.soundHint': 'The sound is produced on the device. Nothing is downloaded from the network.',
  'modules.09.cooldownHint': 'At most one alert every two minutes. An alarm repeated on every sample is an alarm that gets switched off for good.',
  'modules.09.whenNotTitle': 'When an alert will not work',
  'modules.09.whenNot': 'The notification lives inside the app, not in the system. It will not work when the app is closed or hidden in the background, when no measurement is running, or when the watched quantity cannot be measured at that moment. We do not ask for permission to send system notifications.',
  'modules.09.firedTpl': '{name}: {zone} for {sec} s — now {value}.',
  'modules.09.saved': 'Alert settings saved.',
  'modules.09.statusOnTpl': 'Watching: {name}, {level}, after {sec} s.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'This app is free',
  'support.freeText': 'All seven quantities show numbers from the first launch. The recorder, thresholds, calibration, reports, export, session comparison and the whole thirty days of history work without an account, without payment and without limits — the same offline. Nothing here is held back behind a payment for later.',
  'support.whyTitle': 'Why I am asking',
  'support.whyText': 'I make and maintain Light Monitor on my own, after hours. Support goes towards the time needed for fixes, for testing on more phones and for the next tools in the list of modules. Nothing will stop working if nobody pays anything.',
  'support.nothingTitle': 'What a donation gets you',
  'support.nothingText': 'Nothing. No number, no module and no setting unlocks after a donation, because everything is unlocked from the start. All that is left is that I know it was useful to someone.',
  'support.keyTitle': 'If you want to help',
  'support.keyLabel': 'Buy me a coffee',
  'support.keyAria': 'Buy me a coffee — opens an external page in a new tab',
  'support.serviceText': 'The donation profile is run by an external service, Buy Me a Coffee for example. The app loads no script, widget or image from it — what stands here is a plain link and nothing besides.',
  'support.privacyText': 'Pressing this key opens an external page in a new tab, and that is the only moment when anything leaves this device. Measurements, history and settings stay where they were — in the storage of this browser.',
  'support.privacyPendingText': 'Once the address is available, pressing the key will open an external page in a new tab, and that will be the only moment when anything leaves this device. Measurements, history and settings stay where they were — in the storage of this browser.',
  'support.emptyTitle': 'The profile is not connected yet',
  'support.emptyText': 'The address of the donation profile has not been entered yet, so there is no key here that would lead nowhere. The rest of the app works unchanged — nothing is waiting on that donation.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'What this app does NOT measure',
  'docs.notList.1': 'It does not measure a spectrum. A camera has three broad colour channels, automatic exposure and automatic white balance.',
  'docs.notList.2': 'It does not measure absolute values. Scene brightness is a relative indicator, not the result of a photometric measurement.',
  'docs.notList.3': 'It does not measure colour temperature directly. Colour temperature and circadian impact are approximations calculated from sRGB primaries.',
  'docs.notList.4': 'It does not see mains flicker. Sampling at 5 Hz only sees pulsing below 2.5 Hz — mains flicker at 100 Hz is out of reach and the app will never report it as a reading.',
  'docs.notList.5': 'It makes no diagnosis and gives no health advice. No reading is either of those.',
  'docs.notList.6': 'It does not compare your light with any official reference. The thresholds are settings you can change in module 02.',
  'docs.whatTitle': 'What it measures, and how',
  'docs.whatLead': 'The phone camera looks at a lit surface, and five times a second the app averages the R, G and B channels of the middle section of the frame. From those three numbers it derives seven readings.',
  'docs.whatCrop': 'The section is the middle 60% of the width and 60% of the height of the frame — exactly the rectangle outlined by the sight on the AIMING screen. Nothing outside it is counted.',
  'docs.whatRate': 'One sample every 200 ms, that is 5 times a second. The last minute sits in memory at full resolution; everything older is saved every 5 seconds and reaches thirty days back.',
  'docs.metricsTitle': 'The seven quantities',
  'docs.formulasTitle': 'Formulas',
  'docs.formula.share.formula': 'blue share = B / (R + G + B) × 100%',
  'docs.formula.share.text': 'Calculated on sRGB values without inverting the gamma — deliberately, because that is the same definition as in the previous version of the app, so thresholds set back then still mean the same thing. It separates colour from brightness.',
  'docs.formula.brightness.formula': 'brightness = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': 'The average channel value as a percentage of the range. Automatic exposure shifts it underneath, so it is a relative indicator — compare two scenes rather than reading a single number as a measurement.',
  'docs.formula.kelvin.title': 'Colour temperature — McCamy’s approximation',
  'docs.formula.kelvin.formula': 'n = (x − 0.3320) / (y − 0.1858)\nCCT = −449 n³ + 3525 n² − 6823.3 n + 5520.33',
  'docs.formula.kelvin.text': 'First we invert the sRGB gamma, then we go through the matrix to CIE XYZ for the D65 white point and calculate the chromaticity x, y. McCamy’s formula is trustworthy roughly between 2000 K and 12500 K. Outside that range the cubic drifts, so the result is clipped and flagged as untrustworthy — the baseline of the scale then turns dashed and the sentence “outside the range of the method” appears.',
  'docs.formula.melanopic.title': 'Circadian impact — the melanopic ratio',
  'docs.formula.melanopic.formula': 'mel = 0.0016 R + 0.3110 G + 0.8460 B\nY = 0.2127 R + 0.7152 G + 0.0722 B\nresult = (mel / Y) × normalisation to 1.00 for neutral white',
  'docs.formula.melanopic.text': 'All three channels in linear values. The true quantity is the integral of the spectrum with the melanopsin sensitivity curve (peaking around 490 nm); a camera has three broad channels, so we weight the sRGB primaries by melanopic sensitivity at their approximate wavelengths (R 612 nm, G 549 nm, B 465 nm). The direction of change is trustworthy, the absolute value is not — which is why this number carries the “≈” sign.',
  'docs.formula.flicker.formula': 'flicker = (max − min) / (max + min) × 100%',
  'docs.formula.flicker.text': 'The IES definition, calculated from a window of brightness samples. We estimate the frequency from the number of times the signal crosses its mean. Sampling at 5 Hz only sees modulation below 2.5 Hz (the Nyquist limit), and we accept a frequency as trustworthy only between 0.2 and 2 Hz at an amplitude from 0.5% upwards — below that threshold the crossings of the mean are sensor noise, not a pulsing source.',
  'docs.formula.uniformity.formula': 'uniformity = darkest cell / brightest cell × 100%',
  'docs.formula.uniformity.text': 'We divide the section into nine cells in a 3×3 grid and compare the extremes. 100% is light spread perfectly evenly. A low value on a screen means backlight bleed or a reflection; on a desk it means a badly placed lamp. It is the only quantity, together with comfort, where higher means better.',
  'docs.formula.comfort.formula': '100 points minus penalties:\ncircadian impact above 0.75 — up to 35 pts\ncolour above 4000 K — up to 25 pts\nflicker above 5% — up to 25 pts\nuniformity below 60% — up to 15 pts',
  'docs.formula.comfort.text': 'One verdict instead of six numbers. A quantity that could not be measured carries no penalty — missing data never poses as a good result. The weights are our editorial judgement, not a standard; that is why module 01 shows the breakdown into components, so that it is possible to disagree with the verdict.',
  'docs.rangesTitle': 'Ranges and thresholds',
  'docs.rangesLead': 'The thresholds below are the ones in force right now — if you changed them in module 02, the table shows your values, not the factory ones.',
  'docs.dirNormal': 'lower means gentler',
  'docs.dirInvert': 'higher means better',
  'docs.privacyTitle': 'Data and privacy',
  'docs.privacyText': 'The camera image is neither sent nor saved anywhere — only three numbers are kept from each frame. Measurements, thresholds and settings live in the browser storage on this device. The app makes no network requests and works offline.',
  'docs.mdrTitle': 'Disclaimer',
  'docs.freeText': 'The app is free in its entirety and stays that way: all seven quantities, the history, the reports, the export and offline mode work without an account, without payment and without limits. Anyone who wants to say thank you will find module 10, “Support”.',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'The app loaded incompletely',
  'boot.filesTpl': 'These files did not load: {list}.',
  'boot.modulesTpl': 'These modules did not report in: {list} — those entries will not open from the list.',
  'boot.modulesRangeTpl': 'modules {from}–{to}',
  'boot.tail': 'Reload the page. If that does not help, the files on the server are incomplete.',
  'boot.loss.bus': 'the modules will stop seeing each other and the measurement will not start',
  'boot.loss.metrics': 'no value will be calculated',
  'boot.loss.scaleCore': 'the geometry of the scale and the number formatting will disappear',
  'boot.loss.scaleText': 'every interface label will disappear',
  'boot.loss.shell': 'no module can be opened',
  'boot.loss.engine': 'the camera and the measurement will not start',
  'boot.loss.dash': 'the dashboard will stay empty'
});
