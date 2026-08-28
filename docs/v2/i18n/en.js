/* docs/v2/i18n/en.js — słownik WERSJI 2, angielski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/en.js — i ZAWSZE,
 * także gdy aktywny jest inny język. Angielski jest wartością zapasową każdego
 * brakującego klucza, więc ten plik musi być kompletny; pozostałe 28 języków
 * wolno uzupełniać stopniowo.
 *
 * CO TU JEST: to samo, co w pl.js tego katalogu — układ TEJ wersji: pięć
 * zakładek, dziewięć ekranów nakładkowych, siedem narzędzi, komunikaty
 * i zdania kreatorów. Nazwy wielkości, strefy, jednostki, zastrzeżenie
 * medyczne i prywatność leżą w warstwie wspólnej; tutaj są tylko nadpisania
 * wypisane niżej. Zestaw kluczy jest identyczny z pl.js — pilnuje tego
 * docs/shared/i18n/keys.test.js.
 *
 * TŁUMACZENIE JEST WZORCEM DLA POZOSTAŁYCH 28 JĘZYKÓW, więc:
 *  • angielszczyzna brytyjska („colour”), jak w docs/shared/i18n/en.js;
 *  • nazwy siedmiu wielkości brzmią DOKŁADNIE tak, jak w warstwie wspólnej —
 *    blue share, scene brightness, colour temperature, circadian impact,
 *    flicker, uniformity, eye comfort. Klucze *.nameLower to te same nazwy
 *    małą literą, bo stoją w środku zdania;
 *  • zastrzeżenia medyczne i akapity o prywatności przetłumaczone DOKŁADNIE,
 *    bez osłabiania i bez dodawania obietnic — to zdania o skutkach prawnych.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (te same co w pl.js i z tego samego powodu):
 *   'zone.warning'        — wspólne mówi „Caution”, ta wersja od zawsze mówi
 *                           „Warning” (i „Warnings” w podsumowaniu);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja wymienia
 *                           z nazwy przykładowy serwis i mówi o pomiarach
 *                           w liczbie mnogiej.
 */
window.I18nData = window.I18nData || {};
window.I18nData['en'] = Object.assign(window.I18nData['en'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Light Monitor — measure blue light',
  'app.description': 'Light Monitor — measuring the blue share of light with a phone camera. Seven readings, a chart, history. Everything available, without an account and without payment.',
  'app.skipToContent': 'Skip to content',
  'app.measuring': 'Measuring',
  'app.docsButton': 'Documentation and explanations',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — version 2',

  'nav.aria': 'Main navigation',
  'nav.tablistAria': 'App screens',
  'nav.measure': 'Measure',
  'nav.history': 'History',
  'nav.tools': 'Tools',
  'nav.support': 'Support',
  'nav.more': 'More',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Documentation',
  'panel.thresholds': 'Thresholds and profiles',
  'panel.reports': 'Reports',
  'panel.export': 'Data export',
  'panel.compare': 'A/B comparison',
  'panel.calibration': 'White paper calibration',
  'panel.screenCheck': 'Check my monitor',
  'panel.schedule': 'Schedule',
  'panel.alerts': 'Exposure alerts',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Back',
  'action.close': 'Close',
  'action.refresh': 'Refresh',
  'action.apply': 'Apply',
  'action.delete': 'Delete',
  'action.hide': 'Hide',
  'action.start': 'Start',
  'action.stop': 'Stop',
  'action.switch': 'Switch',
  'action.switchAria': 'Switch camera: front or rear',
  'action.resetDefaults': 'Restore defaults',
  'action.reports': 'Reports',
  'action.exportCsv': 'Export CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Screen: {name}',
  'a11y.measureStarted': 'Measurement started.',
  'a11y.measureStopped': 'Measurement stopped.',
  'a11y.measureStoppedSummary': 'Measurement stopped. Time: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'Threshold profile applied.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Confirmation',
  'dialog.confirm': 'Confirm',
  'dialog.cancel': 'Cancel',
  'dialog.infoTitle': 'Information',
  'dialog.ok': 'Got it',

  'help.sheetTitle': 'About this reading',
  'help.unit': 'Unit',
  'help.scaleRange': 'Scale range',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'Warning',
  'threshold.crit': 'Critical',
  'threshold.warnLabel': 'Warning threshold',
  'threshold.critLabel': 'Critical threshold',
  'threshold.warnAria': '{name} — threshold: warning',
  'threshold.critAria': '{name} — threshold: critical',

  /* ==================================================================
     Drobne złożenia liczby, jednostki i nazwy
     ==================================================================
     Wyglądają na zbędne, ale to właśnie one usuwają z kodu sklejanie
     napisów: szyk „wartość jednostka” i nawias po nazwie nie w każdym
     języku wyglądają tak samo. */

  'value.withUnit': '{value} {unit}',
  'metric.withUnit': '{name} ({unit})',
  'range.dash': '{min} – {max}',

  /* ==================================================================
     Ekran Pomiar
     ================================================================== */

  'firstRun.title': 'How to measure',
  'firstRun.text': 'Press “Start”, point the phone at a lit surface and hold it still for a few seconds. The frame on the preview shows the part the app actually reads.',
  'firstRun.close': 'Close the hint',

  'camera.live': 'LIVE',
  'camera.idle': 'The camera is off. Press “Start”, point the phone at a lit surface and hold it still for a few seconds.',
  'camera.stopped': 'Measurement stopped. Press “Start” to measure again.',

  'error.cameraStart': 'The camera could not be started.',
  'error.engineMissing': 'The measurement module did not load.',

  'metrics.sevenTitle': 'Seven readings',
  'measure.tilesSub': 'Refreshed 5 times a second',

  'session.title': 'This session',
  'session.duration': 'Measuring time',
  'session.samples': 'Samples',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     „Warnings” to nie to samo słowo co „Warning” pod suwakiem. */
  'zone.count.good': 'Within range',
  'zone.count.warning': 'Warnings',
  'zone.count.critical': 'Critical',

  'note.calibrated': 'Measurement calibrated with white paper — the channels are levelled.',

  'tile.helpAria': 'What this means: {name}',
  'tile.noMeasurement': 'No measurement',
  'tile.outOfScale': 'Off the scale',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Warning',
  'zone.spoken.warning': 'warning',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Over time',
  'history.pickHint': 'Choose a reading and a range',
  'history.metricLabel': 'Reading',
  'history.rangeAria': 'Chart time range',
  'history.emptyTitle': 'No data in this range',
  'history.emptyText': 'Start measuring on the Measure screen — the chart fills up in a few seconds.',
  'history.tableTitle': 'Latest readings',
  'history.tableHide': 'Hide the table',
  'history.tableShow': 'Show the table',
  'history.tableCaption': 'The latest measurement readings, newest at the top.',
  'history.tableEmpty': 'No readings. Start measuring on the Measure screen.',

  'table.time': 'Time',
  'table.metric': 'Reading',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     dłuższy zapis łamał się na dwie linie. */
  'range.1m': '1 min',
  'range.1h': '1 hr',
  'range.24h': '24 hr',
  'range.7d': '7 days',
  'range.30d': '30 days',

  'chart.now': 'now',
  'chart.countSub': {
    one: '{n} reading in the selected range',
    other: '{n} readings in the selected range'
  },
  'chart.aria': '{name}, range {range}, {count}, latest value {value} {unit}.',
  'chart.ariaZone': '{name}, range {range}, {count}, latest value {value} {unit}, zone: {zone}.',
  'chart.ariaEmpty': '{name} — no data in the {range} range.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Wizards and helper features',
  'tools.note': 'The tools help you make sense of a measurement. All of them are available straight away, and the measurement itself works independently of them.',

  'tool.thresholds.sub': 'When a value should raise a warning',
  'tool.compare.sub': 'Which of two lights is gentler',
  'tool.calibration.sub': 'The one feature that genuinely improves accuracy',
  'tool.screenCheck.sub': 'Five steps and a finished verdict on your screen',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Threshold schedule”
     kontra „Schedule”. Tak było i tak zostaje. */
  'tool.schedule.title': 'Threshold schedule',
  'tool.schedule.sub': 'Different thresholds in the evening, without remembering to switch',
  'tool.alerts.sub': 'A signal when the critical zone lasts too long',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Settings',
  'more.thresholdsSub': 'When a value should raise a warning',
  'more.docsSub': 'How to measure, and what this measurement does not tell you',
  'more.appearanceTitle': 'Appearance and accessibility',

  'settings.theme': 'Theme',
  'theme.auto': 'Match the system',
  'theme.light': 'Light',
  'theme.dark': 'Dark',

  'settings.textScale': 'Text size',
  'textScale.100': 'Standard',
  'textScale.115': 'Larger (115%)',
  'textScale.130': 'Largest (130%)',

  'settings.contrast': 'Higher contrast',
  'settings.contrastSub': 'Stronger borders and darker secondary text.',
  'settings.sound': 'Alert sound',
  'settings.soundSub': 'A short signal when an exposure alert comes on.',
  'settings.vibrate': 'Vibrate on alerts',
  'settings.vibrateSub': 'Works only on devices that support it.',

  'more.dataTitle': 'Data',
  'more.clearHistory': 'Clear measurement history',
  'more.clearHistorySub': 'Deletes the saved readings from this device. Thresholds, profiles and settings stay.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'The app is free in its entirety. ',
  'more.supportLink': 'You are welcome to support it voluntarily.',

  'dialog.clearHistory.title': 'Delete the saved history?',
  'dialog.clearHistory.body': {
    one: 'We will delete {n} saved measurement point from this device. This cannot be undone. Thresholds, profiles and settings will be left untouched.',
    other: 'We will delete {n} saved measurement points from this device. This cannot be undone. Thresholds, profiles and settings will be left untouched.'
  },
  'dialog.clearHistory.confirm': 'Delete history',
  'dialog.clearHistory.cancel': 'Keep it',

  'toast.historyCleared': 'Measurement history deleted.',
  'toast.screenUnavailable': 'That screen is not available in this version yet.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'What this app measures',
  'docs.leadText': 'The phone camera looks at a lit surface, and five times a second the app averages the R, G and B channels of the middle section of the frame. From those three numbers it derives seven readings.',
  'docs.limitsTitle': 'The limits of the method',
  'docs.limitsText': 'A camera has three broad colour channels, automatic exposure and automatic white balance. It does not measure a spectrum and knows no absolute values, so brightness is a relative indicator, not lux. Colour temperature and circadian impact are approximations calculated from sRGB primaries. Sampling at {rate} Hz only sees flicker below {limit} Hz — mains flicker at 100 Hz is out of reach and the app will never report it as a reading.',

  'note.howTo.repeat.title': 'Repeat the measurement',
  'note.howTo.repeat.text': 'A single reading is a snapshot. A dozen or so seconds of measuring gives a more trustworthy picture.',

  'docs.scale': 'Scale',
  'docs.direction': 'Direction',
  'docs.directionHigher': 'Higher is better',
  'docs.directionLower': 'Lower is gentler',
  'docs.privacyTitle': 'Data and privacy',
  'docs.privacyText': 'The camera image is neither sent nor saved anywhere — only three numbers are kept from each frame. Measurements, thresholds and settings live in the browser storage on this device. The app makes no network requests and works offline.',
  'docs.freeLine': 'All seven readings, the history, the chart, the tools and offline mode work for everyone, without an account and without payment.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Everything is available',
  'support.heroText': 'All seven readings, the measurement history, the chart, every tool and offline mode work for everyone, straight away. No account, no limits and no payment.',
  'support.whyTitle': 'Why I am asking',
  'support.whyText': '{app} is built after hours and earns nothing from anyone: no advertising, no data collection, nothing to sell. Keeping it running and taking it further — new readings, fixes, testing on more phones — costs time. If the app has been useful to you, you can chip in. You do not have to.',
  'support.whatTitle': 'What a donation gets you',
  'support.whatText': 'Nothing. It really does unlock nothing and speed nothing up — the app looks and works exactly the same before and after. All it gives is that the author knows this work was useful to someone.',
  'support.button': 'Buy me a coffee',
  'support.pendingTitle': 'The profile is not connected yet',
  'support.pendingText': 'There is no address here yet to send support to. It will appear in this spot when it is ready — until then everything in the app works exactly the same.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'The button opens an external page (Buy Me a Coffee, for example) in a new tab. That is the only moment when anything leaves this device — and it happens only after you press it. Measurements, history and settings stay here.',
  'privacy.externalPending': 'Once the address is available, pressing the button will open an external page in a new tab. That will be the only moment when anything leaves this device. Measurements, history and settings stay here.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (fallback in ui-core.js)',
  'boot.need.metrics': 'no value will be calculated',
  'boot.need.bus': 'the modules will stop seeing each other',
  'boot.need.ui': 'screens cannot be switched',
  'boot.need.engine': 'the camera and the measurement will not start',
  'boot.need.support': 'the Support screen will be empty',
  'boot.need.tools': 'the Tools tab will be empty',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'These modules did not load: {list}.',
  'boot.consoleHint': 'Check the order and the paths of the <script> tags in index.html.',
  'boot.incompleteTitle': 'The app loaded incompletely',
  'boot.incompleteText': '{missing} Reload the page; if that does not help, the files on the server are incomplete.',
  'boot.newVersion': 'There is a new version of the app.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'What the thresholds do. ',
  'thresholds.noteText': 'The warning threshold lights up the yellow state, the critical threshold the red one. A change takes effect immediately — including on the reading already on screen. The thresholds are free; only saving your own named sets is paid.',
  'thresholds.profilesTitle': 'Threshold profiles',
  'thresholds.profilesSub': 'The three built-in ones are free',
  'thresholds.customName': 'Name of your own profile',
  'thresholds.customPlaceholder': 'for example Bedroom in the evening',
  'thresholds.save': 'Save the current thresholds',
  'thresholds.saveHelp': 'Saves exactly the thresholds set above.',

  'profile.builtin.default.name': 'Default',
  'profile.builtin.default.desc': 'The thresholds from the catalogue of readings — the starting point for every measurement.',
  'profile.builtin.evening.name': 'Evening — gentle',
  'profile.builtin.evening.desc': 'Warns earlier about cool colour and circadian impact.',
  'profile.builtin.work.name': 'Desk work',
  'profile.builtin.work.desc': 'Allows bright, cool daylight; watches flicker and uniformity.',
  'profile.custom.desc': 'Your own profile, saved {date}.',

  'toast.thresholdsReset': 'Default thresholds restored.',
  'toast.thresholdOrder': 'The warning threshold must be lower than the critical one.',
  'toast.thresholdOrderInverted': 'For this reading the warning threshold must be higher than the critical one.',
  'toast.profileNameMissing': 'Enter a profile name.',
  'toast.profileSaved': 'Saved the “{name}” profile.',
  'toast.profileApplied': 'Applied the “{name}” profile.',
  'toast.profileApplyFailed': 'That profile could not be applied.',
  'toast.profileRemoved': 'Profile deleted.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'What the schedule is for. ',
  'schedule.noteText': 'Thresholds that make sense in the evening are not the ones that make sense at noon. A “from–to” rule swaps the profile on its own, so you do not have to remember. The schedule never starts or stops a measurement.',
  'schedule.toggle': 'Switch profiles automatically',
  'schedule.toggleSub': 'Checked every minute against the device clock.',
  'schedule.emptyTitle': 'No rules',
  'schedule.emptyText': 'Add your first rule with the button below.',
  'schedule.add': 'Add a rule',
  'schedule.to': 'to',
  'schedule.profile': 'Profile',
  'schedule.fromAria': 'Rule {n}: start time',
  'schedule.toAria': 'Rule {n}: end time',
  'toast.scheduleTimeFormat': 'Enter the times in the 22:00 format.',
  'toast.scheduleEnded': 'The schedule has ended — the previous thresholds are back.',
  'toast.scheduleApplied': 'The schedule switched on the “{name}” profile.',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'What the alert does. ',
  'alerts.noteText': 'It watches one reading and speaks up only once that reading has held the chosen zone without a break for the time you set. It never stops the measurement and never covers the buttons.',
  'alerts.toggle': 'Turn on exposure alerts',
  'alerts.toggleSub': 'They work only while a measurement is running.',
  'alerts.metric': 'Reading to watch',
  'alerts.level': 'From which zone',
  'alerts.level.warning': 'Warning and above',
  'alerts.level.critical': 'Critical only',
  'alerts.sustain': 'After how many seconds without a break',
  'alerts.sustainHelp': 'Shorter times give more false alarms when you move the phone.',
  'alerts.sound': 'A short beep',
  'alerts.soundSub': 'The sound is generated locally. It can also be turned off globally on the More screen.',
  'alerts.barTitle': 'Exposure alert',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} has held the warning zone for {seconds} s — now {value} {unit}.',
  'alerts.message.critical': '{name} has held the critical zone for {seconds} s — now {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'How to compare. ',
  'compare.noteText': 'Start measuring, point the camera at the first source and save it as A. Without changing the distance or the angle, switch the light and save B. The comparison only means something if the scene is the same.',
  'compare.slotA': 'Light A',
  'compare.slotB': 'Light B',
  'compare.save': 'Save the current reading',
  'compare.savedAt': 'Saved {date}, {time}',
  'compare.empty': 'Nothing saved yet.',
  'compare.verdictTitle': 'Comparison result',
  'compare.verdictEmpty': 'Save both lights to see which one is gentler.',
  'compare.notEnough': 'Not enough data to compare these two measurements.',
  'compare.tie': 'The two sources come out practically the same ({metric}: {a} and {b} {unit}). The difference is within the noise of the measurement.',
  'compare.betterA': 'Light A is the gentler one — {metric} is {better} {unit} against {worse} {unit}.',
  'compare.betterB': 'Light B is the gentler one — {metric} is {better} {unit} against {worse} {unit}.',
  'compare.clear': 'Clear the comparison',
  'toast.compareSavedA': 'Light A saved.',
  'toast.compareSavedB': 'Light B saved.',
  'toast.compareCleared': 'Comparison cleared.',
  'toast.measureFirst': 'Start measuring on the Measure screen first.',

  /* Nazwa wielkości w środku zdania. Po angielsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. */
  'metric.share.nameLower': 'blue share',
  'metric.brightness.nameLower': 'scene brightness',
  'metric.kelvin.nameLower': 'colour temperature',
  'metric.melanopic.nameLower': 'circadian impact',
  'metric.flicker.nameLower': 'flicker',
  'metric.uniformity.nameLower': 'uniformity',
  'metric.comfort.nameLower': 'eye comfort',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'Why this works. ',
  'calib.noteText': 'A camera sensor has a fixed bias between its channels. Measuring a sheet of white paper shows how large that bias is and lets it be subtracted. It is the one feature in this app that genuinely improves accuracy — and it still does not turn a camera into a spectrometer.',
  'calib.step1': 'Put a sheet of white paper under the light you are measuring',
  'calib.step2': 'Start measuring and fill the frame with the paper',
  'calib.step3': 'Press “Calibrate” and hold the phone still for 3 seconds',
  'calib.done': 'Calibrated {date}, {time}.',
  'calib.none': 'No calibration. Measuring works; treat the values as comparative.',
  'calib.gain': '{channel} gain',
  'calib.gainsLabel': 'Channel gains',
  'calib.gainsUnset': 'not set',
  'calib.start': 'Calibrate (3 s)',
  'calib.clear': 'Delete the calibration',
  'toast.calibCleared': 'Calibration deleted.',
  'calib.error.noEngine': 'The measurement module is not available.',
  'calib.error.notRunning': 'Start measuring first and point the camera at a sheet of white paper.',
  'calib.error.busy': 'Calibration is already running.',
  'calib.error.tooFewSamples': 'Too few samples. Check that the measurement is really running.',
  'calib.error.tooDark': 'The image is too dark to calibrate. Light the paper better and try again.',
  'calib.error.tooSkewed': 'The channel bias is too large to accept as a calibration. Use white paper in even light.',
  'calib.ok': 'Calibrated. Colour temperature and circadian impact will be more accurate now.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'What this is for. ',
  'screencheck.noteText': 'Five steps check a monitor the way a review checks one: white at two brightness levels, backlight uniformity, and whether the system night mode really changes anything. The wizard reads a measurement that is already running; it does not start one itself.',
  'screencheck.step.white100.title': 'White at full brightness',
  'screencheck.step.white100.hint': 'Open a white page on the monitor, set the brightness to maximum and fill the frame with the screen.',
  'screencheck.step.white20.title': 'White at low brightness',
  'screencheck.step.white20.hint': 'Lower the monitor brightness to about a fifth and do not change the framing.',
  'screencheck.step.corners.title': 'The corners of the screen',
  'screencheck.step.corners.hint': 'Go back to full brightness and show the camera the whole screen — we are checking backlight uniformity.',
  'screencheck.step.nightOff.title': 'Night mode off',
  'screencheck.step.nightOff.hint': 'Make sure the blue light filter is switched off.',
  'screencheck.step.nightOn.title': 'Night mode on',
  'screencheck.step.nightOn.hint': 'Switch on the system blue light filter and repeat the same framing.',
  'screencheck.stepHeading': 'Step {n} of {total}: {title}',
  'screencheck.idleTitle': 'The wizard is not running',
  'screencheck.idleHint': 'Start measuring on the Measure screen, then come back here and press “Start”.',
  'screencheck.next': 'Save the step and go on',
  'screencheck.cancel': 'Abort',
  'screencheck.start': 'Start the wizard',
  'screencheck.clearResult': 'Clear the result',
  'screencheck.resultTitle': 'Result',
  'screencheck.resultEmpty': 'No step has been saved yet.',
  'screencheck.resultPartial': '{done} of {total} steps saved. The conclusions will appear once there is something to compare.',
  'screencheck.note.uniformityLow': 'Backlight uniformity is {value}% — there are clear differences in brightness across the frame.',
  'screencheck.note.uniformityOk': 'The backlight is even ({value}%).',
  'screencheck.note.nightWorks': 'Night mode lowers the blue share by {value} percentage points — it works.',
  'screencheck.note.nightWeak': 'Night mode changes the blue share by only {value} percentage points. That is less than a system filter usually gives.',
  'screencheck.note.pwm': 'At low brightness the flicker rises from {from}% to {to}% — the classic sign of pulse-width dimming (PWM).',
  'toast.screencheckDone': 'The wizard has finished. The result is below.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'Where these numbers come from. ',
  'reports.noteText': 'The report is calculated from the history saved on this device — one point every five seconds. The engine has been collecting it since your first measurement, so the report is ready straight away.',
  'reports.rangeAria': 'Report range',
  'reports.day': 'Last 24 hours',
  'reports.week': 'Last 7 days',
  'reports.date': 'Report for {date}.',
  'report.headerDay': 'Day from {from} to {to} — {count}.',
  'report.headerWeek': 'Week from {from} to {to} — {count}.',
  'count.points': { one: '{n} point', other: '{n} points' },
  'count.samples': { one: '{n} sample', other: '{n} samples' },
  'report.emptyTitle': 'No data in this period',
  'report.emptyText': 'Start measuring on the Measure screen — the history saves itself.',
  'report.colAvg': 'Average',
  'report.colMin': 'Minimum',
  'report.colMax': 'Maximum',
  'report.zonesTitle': 'Zone breakdown',
  'report.worstHour': 'Worst time of day',
  'report.worstHourNone': 'none stands out',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'What to do about it',
  'report.disclaimerTitle': 'This is not health advice. ',
  'report.disclaimerText': 'The conclusions follow solely from what this phone’s camera saw. The app does not measure a spectrum, knows no lux and makes no diagnosis.',

  'advice.melanopic': 'The average circadian impact was {value}×. In the evening it is worth going below 0.50 — most easily with a warmer bulb or night mode.',
  'advice.kelvin': 'The light was cool ({value} K on average). For work that is fine; for the two hours before sleep, below 3000 K is better.',
  'advice.flicker': 'Noticeable flicker was detected ({value}% on average). It is usually down to a cheap dimmer or a backlight driver.',
  'advice.uniformity': 'The light is spread unevenly ({value}%). Moving the lamp or changing its angle usually does more than changing the bulb.',
  'advice.worstHour': 'The worst time of day is {hour}:00 — that is where most of the out-of-range readings gather.',
  'advice.none': 'Nothing stands out beyond the normal range in this period. The most useful next step would be comparing two light sources in the A/B comparison.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'File format. ',
  'export.noteText': 'Semicolon as the column separator, comma as the decimal separator, UTF-8 encoding with a byte order mark. Excel set to a locale that uses the comma as its decimal separator opens such a file without configuring anything.',
  'export.range': 'Data range',
  'export.columns': 'Columns in the file',
  'export.chipFilled': ' — column filled in',
  'export.help': 'The file contains all seven columns — the engine calculates them from your first measurement onwards and all of them go into the file.',
  'export.run': 'Save the CSV file',
  'export.previewEmpty': 'No readings in this range. Start measuring — the history saves itself.',
  'csv.range.hour': 'Last hour',
  'csv.range.day': 'Last 24 hours',
  'csv.range.week': 'Last 7 days',
  'csv.range.month': 'Last 30 days',
  'csv.colDate': 'Date',
  'csv.colTime': 'Time',
  'csv.colZone': 'Zone',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'There are no readings at all in the selected range.',
  'toast.exportFailed': 'This browser would not let the file be saved.',
  'toast.exportSaved': {
    one: 'Saved the file {filename} ({n} row).',
    other: 'Saved the file {filename} ({n} rows).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} hr {m} min',
  'duration.ms': '{m} min {s} s',
  'duration.s': '{s} s'
});
