/* Monitor Światła v5 — słownik angielski.
 *
 * TO JEST SŁOWNIK ZAPASOWY I WZORZEC DLA POZOSTAŁYCH 28 JĘZYKÓW. Silnik i18n
 * sięga po klucz najpierw do języka aktywnego, potem TUTAJ, a dopiero na końcu
 * oddaje samą nazwę klucza. Każdy brak w tym pliku zamienia się więc w gołe
 * 'measure.start' na przycisku — i to we wszystkich językach naraz.
 *
 * Powstał z pl.js, ale NIE JEST JEGO KALKĄ: polskie zdania przełożono na
 * naturalną angielszczyznę, a nie słowo w słowo. Zachowane zostało to, co niesie
 * znaczenie: liczby, progi, jednostki, nazwy wstawek i — co do treści —
 * zastrzeżenia medyczne oraz zdania o prywatności. Tych ostatnich nie wolno
 * osłabiać ani wzmacniać: „nie zastępuje rozmowy z lekarzem” ma po angielsku
 * znaczyć dokładnie tyle samo, a „obraz nie opuszcza urządzenia” nie może stać
 * się obietnicą szerszą niż polska.
 *
 * PISOWNIA: brytyjska (colour, honour, centre) — konsekwentnie w całym pliku.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych):
 *   blue share, scene brightness, colour temperature, circadian impact
 *   (w opisie: melanopic ratio), flicker, uniformity, visual comfort.
 * STREFY: safe / moderate / harmful. Wybrane zamiast good/warning/critical,
 * bo mówią o świetle, a nie o stanie aplikacji — i tak samo jak polskie
 * „bezpiecznie / umiarkowanie / szkodliwie” wchodzą w zdanie „zone: {zone}”.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Text with a {name} placeholder'   — napis zwykły,
 *   'klucz.kropkowany': { one, other }                     — forma zależna od
 *                                                            liczby.
 * Angielski ma w CLDR dwie formy: `one` i `other`. Nazwy wstawek są identyczne
 * jak w pl.js — pilnuje tego keys.test.js. Kolejność wstawek w zdaniu wolno
 * zmieniać (i tak robimy w datach), nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Light Monitor',
  'app.description': 'Light Monitor — your camera measures seven qualities of the light around you. Everything is computed on this device; nothing goes out to the network.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Light Monitor',
  'app.skipToContent': 'Skip to content',
  'app.nav.aria': 'Main navigation',
  'app.noscript.title': 'This app needs JavaScript',
  'app.noscript.text': 'The whole measurement happens inside this browser tab: JavaScript reads the frames from the camera and computes the seven light metrics from them. Without it there is nothing to measure with. Enable JavaScript for this page and open it again — still nothing will be sent to the network.',

  'nav.measure': 'Measure',
  'nav.history': 'History',
  'nav.tools': 'Tools',
  'nav.support': 'Support',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Measuring',
  'shell.live.aria': 'Measuring. {metric}: {value}. Back to the measurement screen.',
  'shell.live.metricFallback': 'Lead metric',
  'shell.action.fallback': 'Screen action',

  'shell.loadFail.title': 'The “{screen}” screen could not be loaded',
  'shell.loadFail.text': 'Some of the files are probably missing from the device’s storage. Connect to the network and reload the page.',
  'shell.fatal.title': 'Something went wrong',
  'shell.fatal.text': 'The app could not put the screen together. Reloading the page is usually enough — your saved measurements and settings stay where they are.',
  'shell.fatal.reload': 'Reload the page',
  'shell.boot.failTitle': 'The app could not start',
  'shell.boot.failText': 'The shell did not start. Reload the page — your saved measurements and settings stay where they are.',
  'shell.background.error': 'Something broke in the background',
  'shell.background.action': 'Reload',
  'shell.update.title': 'A new version is available',
  'shell.update.action': 'Reload',

  'onboarding.title': 'Before you start',
  'onboarding.lead': 'Light Monitor uses the camera to look at the light around you and computes seven metrics from it — from blue share to visual comfort.',
  'onboarding.privacy': 'The image never leaves this device: there is no server, no account and nothing to upload. All seven metrics work straight away, with no sign-in and no fee.',
  'onboarding.honesty': 'This is a rough guide, not a measuring instrument and not a medical test. What cannot be measured is not shown — instead of a number you will see a dash.',
  'onboarding.start': 'Let’s begin',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Apply',
  'overlay.toast.close': 'Dismiss message',
  'overlay.sheet.label': 'Dialog',
  'overlay.sheet.close': 'Close',
  'overlay.dialog.confirm': 'Confirm',
  'overlay.dialog.cancel': 'Cancel',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'Cancel',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'Measure',

  'measure.intro.aria': 'Start a measurement',
  'measure.intro.headline': 'See what you are lit by',
  'measure.intro.lead': 'The camera shows how much blue there is in the light falling on you right now — and whether that is too much for this hour of the day.',
  'measure.intro.start': 'Start measuring',
  'measure.intro.hint': 'The browser will ask for permission to use the camera. Measuring begins the moment you grant it.',
  'measure.intro.privacy': 'The camera image is processed on this device and never leaves it. We do not send, store or share a single frame.',
  'measure.intro.honesty': 'This is not a medical device and not a medical test. The app shows an approximation of the light around you; it does not judge your health and does not replace a conversation with a doctor.',

  'measure.live.aria': 'Measurement in progress',
  'measure.badge.starting': 'Starting',
  'measure.badge.paused': 'Paused',
  'measure.badge.running': 'Measuring',
  'measure.stale': 'Waiting for the image — the preview freezes while the app is in the background.',
  'measure.crop': 'We measure the centre of the frame — the marked {percent}% of the image width and height.',
  'measure.facing.front': 'front camera',
  'measure.facing.back': 'rear camera',

  'measure.boot.title': 'Starting the camera…',
  'measure.boot.text': 'If the browser asks for permission, grant it — without an image there is nothing to measure. The permission covers this page only, and you can withdraw it later.',
  'measure.boot.cancel': 'Cancel',

  'measure.hold': 'Readings frozen. The camera keeps running, but nothing reaches the history or the averages.',
  'measure.gridHint': 'Pick a tile to move that metric onto the large gauge.',

  'measure.stop': 'Stop',
  'measure.pause': 'Pause',
  'measure.resume': 'Resume',
  'measure.flip.aria': 'Switch camera',
  'measure.flip.toBack': 'Switch to the rear camera',
  'measure.flip.toFront': 'Switch to the front camera',

  'measure.fail.aria': 'Camera error',
  'measure.fail.headline': 'The camera did not start',
  'measure.fail.retry': 'Try again',
  'measure.fail.back': 'Back',
  'measure.fail.savedSession': 'The session from before the interruption ({duration}) was saved to the history.',
  'measure.error.fallback': 'The camera could not be started.',

  'measure.summary.aria': 'Session summary',
  'measure.summary.title': 'Session summary',
  'measure.summary.paused': 'paused for {duration}',
  'measure.summary.nothingMeasured': 'No metric collected a reading — the camera saw no light for the whole session.',
  'measure.summary.note': 'The averages count only samples taken outside the pause. Metrics that were never measured are left out, not counted as zero.',
  'measure.summary.nearThreshold': 'Closest to a threshold',
  'measure.summary.worstPoint': 'Weakest point',
  'measure.summary.averageZone': '{zone} on average',
  'measure.summary.tooShort': 'The session lasted {duration} — too short to reach the history on its own. You can save it by hand.',
  'measure.summary.again': 'Measure again',
  'measure.summary.save': 'Save to history',
  'measure.summary.saved': 'Saved to the history',
  'measure.summary.savedToast': 'Session saved to the history.',
  'measure.summary.close': 'Close',

  'measure.method.title': 'How we measure this',
  'measure.method.p1': 'The app samples the camera image ten times a second and computes the metrics from the middle {percent}% of the frame — the reticle in the preview marks exactly that area.',
  'measure.method.p2': 'A phone camera has three broad channels plus automatic exposure and white balance of its own. It sees the proportions of light, not its spectrum.',
  'measure.method.p3': 'Blue share, brightness, flicker and uniformity are what the camera really measures. Colour temperature and circadian impact are openly declared approximations, computed from the sRGB primaries.',
  'measure.method.p4': 'Flicker is only visible below four hertz. Mains flicker at 100 Hz lies far beyond the reach of this sampling rate and will never be reported as a reading.',
  'measure.method.p5': 'None of these numbers is a photometric measurement or a medical result. The camera image does not leave the device.',
  'measure.method.ok': 'Got it',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'Camera start-up cancelled.',
  'measure.announce.stoppedNoSamples': 'Measurement stopped. No samples were collected.',
  'measure.announce.stopped': 'Measurement stopped. The session summary is ready.',
  'measure.announce.interrupted': 'Measurement interrupted. The session summary is ready.',
  'measure.announce.paused': 'Measurement paused. Readings frozen.',
  'measure.announce.resumed': 'Measurement resumed.',
  'measure.announce.switchedFront': 'Switched to the front camera. A new session begins.',
  'measure.announce.switchedBack': 'Switched to the rear camera. A new session begins.',
  'measure.announce.lead': 'Lead metric: {metric}.',
  'measure.announce.cameraError': 'Camera error. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'The light stayed in the safe range for the whole session — leave the lamp as it is and check again after dark, when a different source is at work.',
  'measure.advice.share.evening': 'Blue share averaged {value} — switch your screens to night mode and turn off the ceiling light, leaving one warm lamp at desk height.',
  'measure.advice.share.day': 'Blue share averaged {value} — acceptable during the day, but set your screen to shift to warm mode automatically two hours before bedtime.',
  'measure.advice.brightness': 'The frame was overexposed ({value} on average) — move away from the light source or turn down the screen you are measuring, because at that exposure the other metrics lose accuracy too.',
  'measure.advice.kelvin.evening': 'Colour temperature held at {value} on average — after dark, go below 3000 K: switch the lamp to warm mode or fit a 2700 K bulb.',
  'measure.advice.kelvin.day': 'Colour temperature held at {value} on average — a good, alerting white for the daytime, but set the same lamp to 2700 K in the evening.',
  'measure.advice.melanopic.evening': 'Circadian impact averaged {value} — in the two hours before bed go below 0.50 ×, by dimming the main light and lighting from desk height instead of from the ceiling.',
  'measure.advice.melanopic.day': 'Circadian impact averaged {value} — at this hour that dose helps, but in the evening swap this source for a weaker and warmer one.',
  'measure.advice.flicker': 'Flicker reached {value} on average — usually a dimmer or a backlight turned down low: raise the screen brightness above 40% or replace the dimmer with one that does not use PWM.',
  'measure.advice.uniformity': 'The light fell unevenly ({value} on average) — set the lamp to the side of the desk and add a second, weaker source from the opposite side, instead of one strong point.',
  'measure.advice.comfort': 'Visual comfort came out at {value} on average — start with a single change: halve the brightness of the main source, and only then deal with the colour of the light.',
  'measure.advice.default': 'Change one thing about your lighting and measure it again — comparing two sessions says more than a single reading.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'History',
  'history.action.export': 'Export the history',

  'history.metricGroup.aria': 'Choice of metric',
  'history.announce.metric': 'Metric: {metric}',
  'history.rangeGroup.aria': 'Time range',
  'history.range.aria': 'Last {range}',

  'history.stats.title': 'Range statistics',
  'history.stats.head': '{metric}\u00A0—\u00A0last {range}',
  'history.stats.note': 'Computed from what the chart shows. Time without a measurement is not counted in — we do not stand zero in its place.',
  'history.stat.min': 'Minimum',
  'history.stat.avg': 'Average',
  'history.stat.max': 'Maximum',
  'history.trend.up': 'rising across this range',
  'history.trend.flat': 'no clear change',
  'history.trend.down': 'falling across this range',
  'history.trend.none': 'nothing to compare against',

  'history.sessions.title': 'Measurement sessions',
  'history.sessions.count': '{sessions}, newest first',
  'history.sessions.empty': 'No sessions yet',
  'history.sessions.hint': 'A session is saved once you stop measuring.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'range: {range}',
  'history.session.noMeasure': 'nothing measured',

  'history.data.title': 'Data',
  'history.data.subtitle': 'The history is stored on this device only.',
  'history.export.csv': 'Export CSV',
  'history.export.json': 'Export JSON',
  'history.export.ok': 'File ready to save',
  'history.export.fail': 'The file could not be prepared. In private mode, and in a window embedded in another app, the browser blocks saving — open the page in an ordinary tab.',
  'history.export.sheet.title': 'History export',
  'history.export.sheet.text': 'CSV opens in a spreadsheet (semicolon separated, comma as the decimal mark). JSON keeps everything, including the list of sessions and the gaps where nothing was measured.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Clear the history',
  'history.clear.title': 'Clear the history?',
  'history.clear.text': 'This will delete {points} and {sessions}. It cannot be undone — if you want to keep the data, export it first.',
  'history.clear.confirm': 'Clear',
  'history.clear.announce': 'History cleared.',
  'history.clear.toast': 'History cleared',

  'history.empty.title': 'Nothing to show yet',
  'history.empty.text': 'The history fills up as you measure — one point per second. Everything stays on this device.',
  'history.empty.action': 'Go to the measurement',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 min',
  'range.5m': '5 min',
  'range.1h': '1 hr',
  'range.24h': '24 hrs',
  'range.7d': '7 days',
  'range.30d': '30 days',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Date and time',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'The device’s storage is full — new measurements are no longer being saved.',
  'storage.blocked': 'The browser will not let the history be saved — the data will be gone once you close the tab.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Tools',
  'tools.action.about': 'About the measurement',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Language',
  'tools.language.subtitle': 'By default the app follows your device’s language; a choice from this list takes effect at once and stays in this browser.',
  'tools.language.aria': 'Interface language',
  'tools.language.system': 'Auto',
  'tools.language.announce': 'Interface language: {language}.',

  'tools.appearance.title': 'Appearance',
  'tools.appearance.theme.title': 'Theme',
  'tools.appearance.theme.desc': '“Auto” follows your system setting.',
  'tools.appearance.theme.aria': 'Theme',
  'tools.theme.system': 'Auto',
  'tools.theme.light': 'Light',
  'tools.theme.dark': 'Dark',
  'tools.appearance.accent.title': 'Accent colour',
  'tools.appearance.accent.desc': 'The colour of buttons, selections and sliders.',
  'tools.appearance.accent.aria': 'Accent colour',
  'tools.appearance.textScale.title': 'Text size',
  'tools.appearance.textScale.desc': 'Enlarges the whole interface, not just the labels.',
  'tools.appearance.textScale.aria': 'Text size',
  'tools.appearance.density.title': 'Density',
  'tools.appearance.density.desc': 'Compact fits more content on one screen.',
  'tools.appearance.density.aria': 'Layout density',
  'tools.density.comfortable': 'Comfortable',
  'tools.density.compact': 'Compact',
  'tools.appearance.motion.title': 'Less motion',
  'tools.appearance.motion.desc': 'Turns off animations and the gliding of the needle. Your system setting is honoured regardless.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Ocean',
  'accent.violet': 'Violet',
  'accent.amber': 'Amber',
  'accent.mint': 'Mint',
  'accent.rose': 'Rose',

  'tools.thresholds.title': 'Thresholds',
  'tools.thresholds.subtitle': 'The value from which the app should say “moderate”, and the one from which it should say “poor”. The default thresholds are our suggestion, not a standard — set them to suit you.',
  'tools.thresholds.warn': 'Warning threshold',
  'tools.thresholds.crit': 'Alarm threshold',
  'tools.thresholds.warn.aria': 'Warning threshold — {metric}',
  'tools.thresholds.crit.aria': 'Alarm threshold — {metric}',
  'tools.thresholds.reset': 'Defaults',
  'tools.thresholds.reset.aria': 'Restore the default thresholds: {metric}',
  'tools.thresholds.moved': '{threshold} moved to {value}.',
  'tools.thresholds.resetAll': 'Restore every threshold',
  'tools.thresholds.resetAll.title': 'Restore the default thresholds?',
  'tools.thresholds.resetAll.text': 'All seven metrics will go back to the thresholds the app suggests. Your measurement history stays untouched.',
  'tools.thresholds.resetAll.confirm': 'Restore',
  'tools.thresholds.resetAll.cancel': 'Keep mine',
  'tools.thresholds.resetAll.toast': 'Thresholds are back to the defaults',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'above {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} and below',
  'tools.zoneRange.goodBelow': 'below {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} and above',

  'tools.calibration.title': 'Calibration',
  'tools.calibration.subtitle': 'For those who have something to compare against.',
  'tools.calibration.intro': 'Two phones pointed at the same lamp will show slightly different numbers — every sensor has a tint of its own. If you have a reading you trust at hand, you can nudge the individual image channels up or down here. The multipliers act before anything is computed, so they change all seven metrics at once.',
  'tools.calibration.neutral': 'Nothing to compare against? Leave it at 1.00 — that is the factory setting and it spoils nothing.',
  'tools.calibration.forward': 'The change applies from now on. Measurements already in the history stay as they were at the moment they were saved — we do not recompute them, because that would rewrite data after the fact.',
  'tools.calibration.reset': 'Reset the calibration',
  'tools.calibration.reset.toast': 'Calibration reset',
  'tools.calibration.channel.r': 'Red channel',
  'tools.calibration.channel.g': 'Green channel',
  'tools.calibration.channel.b': 'Blue channel',
  'tools.calibration.channel.aria': '{channel} — calibration multiplier',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'Measurement',
  'tools.measurement.wake.title': 'Keep the screen on',
  'tools.measurement.wake.desc': 'The screen stays awake while measuring. The battery drains faster then.',
  'tools.measurement.wake.unsupported': 'This browser does not let us keep the screen awake.',
  'tools.measurement.haptics.title': 'Vibration',
  'tools.measurement.haptics.desc': 'A short confirmation on start, on stop and when the metric changes.',
  'tools.measurement.haptics.unsupported': 'This device reports no vibration motor.',

  'tools.about.title': 'About the measurement',
  'tools.about.subtitle': 'What exactly each of the seven metrics computes, and where the honesty of this method ends.',
  'tools.about.scale': 'Scale: from {min} to {max}.',
  'tools.about.threshold': 'We warn from {warn} and raise the alarm from {crit}.',
  'tools.about.thresholdInvert': 'We warn below {warn} and raise the alarm below {crit}.',
  'tools.about.limitsHead': 'What this measurement cannot do',
  'tools.about.limit.spectrum.title': 'A camera does not see colour the way an instrument does',
  'tools.about.limit.spectrum.text': 'A phone camera has three channels: red, green and blue. An instrument for measuring light splits them into dozens of narrow bands. What you see here is derived from those three numbers — in a reasonable way, but it is still a calculation, not a measured spectrum.',
  'tools.about.limit.exposure.title': 'The camera adjusts its own brightness',
  'tools.about.limit.exposure.text': 'Point the phone at a window and the camera darkens the image so as not to overexpose it. “Scene brightness” then falls, although nothing in the room has changed. So compare this value within a single shot, not between rooms.',
  'tools.about.limit.flicker.title': 'A slow camera will not catch fast flicker',
  'tools.about.limit.flicker.text': 'We check the image {hz} times a second. Pulsing faster than {nyquist} times a second can appear in such a measurement as slower than it really is, or vanish altogether — and mains flicker is exactly that fast. If the app catches something, treat it as a sign that “something is pulsing here”, not as a measured frequency.',
  'tools.about.limit.medical.title': 'This is neither a medical test nor medical advice',
  'tools.about.limit.medical.text': 'The app helps you notice that the light around you is cool, bright or restless, and suggests what can be done about it. It makes no judgement about your health and does not replace a conversation with a doctor or a measurement with a professional meter.',
  'tools.about.privacy': 'Everything is computed on your device. The camera image is never sent or saved anywhere — only the computed numbers reach storage.',
  'tools.about.privacyPolicy': 'Full privacy policy',

  'tools.data.title': 'Data',
  'tools.data.subtitle': 'Everything sits in this browser’s storage and never goes anywhere from here.',
  'tools.data.summary.empty': 'There are no saved measurements yet.',
  'tools.data.summary': 'In storage: {points} and {sessions}.',
  'tools.data.export.csv': 'Export CSV',
  'tools.data.export.json': 'Export JSON',
  'tools.data.clear': 'Clear the history',
  'tools.data.reset': 'Default settings',
  'tools.data.reset.title': 'Restore the default settings?',
  'tools.data.reset.text': 'Appearance, thresholds, calibration and measurement settings will go back to their initial state. Your measurement history stays untouched.',
  'tools.data.reset.confirm': 'Restore',
  'tools.data.reset.toast': 'Default settings restored',
  'tools.data.wipe': 'Delete all data',
  'tools.data.wipe.title': 'Delete all of the app’s data?',
  'tools.data.wipe.text': 'Gone will be: the whole measurement history and the list of sessions, your thresholds and calibration, and your appearance settings. The app will go back to the state it was in on first launch.',
  'tools.data.wipe.note': 'We hold no copy of this data — it has never left this device, so there is nowhere to restore it from.',
  'tools.data.wipe.check': 'I understand this cannot be undone',
  'tools.data.wipe.confirm': 'Delete everything',
  'tools.data.wipe.toast': 'All of the app’s data has been deleted',
  'tools.data.wipe.announce': 'All of the app’s data has been deleted. The settings are back to their defaults.',
  'tools.data.storage.blocked': 'This browser will not let anything be stored permanently (private mode, or site data blocked). Everything you set here will be gone once you close the tab.',
  'tools.data.storage.full': 'The browser’s storage has filled up and new measurements are no longer being saved. Clearing the history will free up space.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Support',
  'support.free.title': 'Everything is available',
  'support.free.lead': 'All seven metrics, the full history, thresholds, calibration and export work from the first launch — no account, no limits and no fee.',
  'support.free.note': 'The measurement is computed entirely on this device and works with no network. There is no better version kept behind a wall here.',
  'support.why.title': 'Why I am asking',
  'support.why.lead': 'Light Monitor is built after hours, with no advertising, no sponsor and no company behind it. Support pays for the time spent on fixes, on new metrics and on keeping what already works alive.',
  'support.what.title': 'What a donation gets you',
  'support.what.lead': 'Nothing. A donation unlocks nothing — no extra feature, no badge beside your name, no priority. Everything the app can do, you already have.',
  'support.what.note': 'All that is left is that I know it was of use to someone. That really is reason enough.',
  'support.cta.title': 'If you would like to help',
  'support.cta.button': 'Buy me a coffee',
  'support.cta.nolink': 'The donation profile is not connected yet. When it is, a button will stand in this place.',
  'support.cta.privacy': 'This link opens the external Buy Me a Coffee page in a new tab. That is the only moment when anything leaves this device — the measurement itself always stays here.',
  'support.cta.privacyFuture': 'Once the address is in place, the button will open the external Buy Me a Coffee page in a new tab. That will be the only moment when anything leaves this device — the measurement itself always stays here.',
  'support.cta.note': 'There is no countdown here, no reminders and no window that opens by itself. This request waits on this tab and nowhere else.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'last minute',
  'gauge.aria': '{metric}: {value}, zone: {zone}',
  'gauge.aria.note': '{metric}: {value}, zone: {zone}, {note}',
  'gauge.aria.initial': '{metric}: no data',
  'gauge.value.none': 'no data',
  /* Odczyt słowny z jednostką: „27 percent”, „1.20 times”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'approximate value',
  'gauge.note.offScale': 'off the scale',
  'gauge.metric.unknown': 'Unknown metric',

  'chart.aria.label': 'Chart of the measurement history',
  'chart.hint': 'Interactive chart. Left and right arrows move the reading cursor, Home and End jump to the start and the end of the range, Escape hides the cursor.',
  'chart.empty.title': 'No data',
  'chart.empty.text': 'Start measuring — the chart appears after the first readings.',
  'chart.few.title': 'Not enough data',
  'chart.few.text': 'We have one reading: {value}. A line needs two.',
  'chart.legend.line': 'measurement',
  'chart.legend.gap': 'gap in the measurement',
  'chart.aria.head': 'Chart: {metric}, range {range}',
  'chart.aria.empty': 'No data in this range.',
  'chart.aria.one': 'One reading: {value}.',
  'chart.aria.summary': 'From {min} to {max}, average {avg}, {points}.',
  'chart.aria.gaps': 'The series has gaps — we were not measuring then.',
  'chart.readout.empty': 'No data in this range.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'Not enough data to draw a chart.',
  'chart.readout.hint': 'Drag across the chart, or use the arrow keys, to read a single measurement.',
  'chart.time.now': 'now',
  'chart.time.justNow': 'a moment ago',
  'chart.time.ago': '{duration} ago',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd zegar dwunastogodzinny z „AM”, bo tak
     angielskie ustawienia regionalne formatują godzinę. */
  'chart.sample.ago': '\u221230\u00A0min',
  'chart.sample.clock': '12:00 AM',
  'chart.sample.date': 'Aug\u00A030',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'Blue share',
  'metric.share.short': 'How much of the light we see falls on the blue channel.',
  'metric.share.help': 'It separates colour from brightness — this is the value that moves when you turn night mode on.',
  'metric.brightness.name': 'Scene brightness',
  'metric.brightness.short': 'The average brightness of the camera image.',
  'metric.brightness.help': 'A relative value, not lux — the camera’s automatic exposure shifts it underneath.',
  'metric.kelvin.name': 'Colour temperature',
  'metric.kelvin.short': 'Whether the light is warm or cool.',
  'metric.kelvin.help': 'Below 3000 K light is warm and gentler in the evening. 6500 K is the default white of most screens.',
  'metric.melanopic.name': 'Circadian impact',
  'metric.melanopic.short': 'How strongly this light acts on the body clock.',
  'metric.melanopic.help': 'An approximation of the melanopic ratio. 1.00 is neutral daylight white; in the evening it is worth going below 0.50.',
  'metric.flicker.name': 'Flicker',
  'metric.flicker.short': 'Invisible pulsing of the light source.',
  'metric.flicker.help': 'Cheap dimmers and backlights pulse. The eye does not see it, but it is reported as a possible cause of tiredness and headaches.',
  'metric.uniformity.name': 'Uniformity',
  'metric.uniformity.short': 'Whether the light spreads evenly across the frame.',
  'metric.uniformity.help': 'A low value on a screen means backlight bleed or a reflection; on a desk — a badly placed lamp.',
  'metric.comfort.name': 'Visual comfort',
  'metric.comfort.short': 'One score instead of six numbers.',
  'metric.comfort.help': 'It folds the other measurements into a score from 0 to 100 and shows what lowers it the most. The weights are our editorial judgement, not a standard.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'good',
  'zone.warn': 'moderate',
  'zone.crit': 'poor',
  'zone.none': 'no data',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('Aug 24'). */
  'date.month.short.1': 'Jan',
  'date.month.short.2': 'Feb',
  'date.month.short.3': 'Mar',
  'date.month.short.4': 'Apr',
  'date.month.short.5': 'May',
  'date.month.short.6': 'Jun',
  'date.month.short.7': 'Jul',
  'date.month.short.8': 'Aug',
  'date.month.short.9': 'Sep',
  'date.month.short.10': 'Oct',
  'date.month.short.11': 'Nov',
  'date.month.short.12': 'Dec',

  'date.clock': '{hours}:{minutes}',
  /* Kolejność wstawek jest tu odwrotna niż po polsku: angielski skrót daty to
     „Aug 30”, nie „30 Aug”. Nazwy wstawek zostają te same — zmienia się
     wyłącznie ich miejsce w zdaniu. */
  'date.short': '{month}\u00A0{day}',
  'date.shortWithYear': '{date}, {year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0hr',
  'time.duration.hourMinute': '{hours}\u00A0hr {minutes}\u00A0min',
  'time.duration.hour': '{hours}\u00A0hr',
  'time.duration.minuteSecond': '{minutes}\u00A0min {seconds}\u00A0s',
  'time.duration.minute': '{minutes}\u00A0min',
  'time.duration.second': '{seconds}\u00A0s',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „a moment ago”. */
  'time.justNow': 'a moment ago',
  'time.aMinuteAgo': 'a minute ago',
  'time.minutesAgo': '{minutes}\u00A0min ago',
  'time.hoursAgo': '{hours}\u00A0hr ago',
  'time.yesterday': 'yesterday',
  'time.daysAgo': '{days}\u00A0days ago',

  /* Formy zależne od liczby. Angielski ma w CLDR dwie: `one` i `other`.
     Rozstrzyga je Intl.PluralRules dla języka aktywnego. */
  'time.days.plural': { one: 'day', other: 'days' },
  'unit.sample.plural': { one: 'sample', other: 'samples' },
  'unit.measurement.plural': { one: 'measurement', other: 'measurements' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Angielski ma jedną — oba klucze zostają (kształt słownika jest wspólny dla
     wszystkich języków), a wartości są tu identyczne. */
  'unit.session.plural': { one: 'session', other: 'sessions' },
  'unit.session.accusative.plural': { one: 'session', other: 'sessions' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy, choć po angielsku brzmią tak samo — w innych językach już nie. */
  'unit.chartPoint.plural': { one: 'point', other: 'points' },
  'unit.point.plural': { one: 'point', other: 'points' },
  'unit.kelvin.plural': { one: 'kelvin', other: 'kelvins' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „percent”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'percent',
  'unit.spoken.times': 'times',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, bez rady,
     co zrobić dalej. Każdy kod ma tu jedno zdanie diagnozy i jedno zdanie
     rady. */
  'camera.error.denied': 'Permission to use the camera was not granted. Allow the camera for this page in your browser or system settings and try again.',
  'camera.error.notfound': 'No camera found. Check that the device has one and that it is not switched off in the system.',
  'camera.error.inuse': 'The camera is busy in another app. Close that app or tab and try again.',
  'camera.error.insecure': 'The camera only works over HTTPS or on localhost. Open this page at an address that starts with “https://”.',
  'camera.error.unsupported': 'This browser does not offer the camera here. Try Chrome or Safari, in an ordinary window — not in a preview embedded in another app.',
  'camera.error.unknown': 'The camera could not be started.'
};
