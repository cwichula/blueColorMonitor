/* docs/shared/i18n/en.js — słownik WSPÓLNY, angielski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zawsze — także wtedy, gdy aktywny jest inny
 * język. Angielski jest wartością zapasową każdego brakującego klucza, więc ten
 * jeden plik musi być kompletny; pozostałe 29 wolno uzupełniać stopniowo.
 *
 * CO TU JEST: wyłącznie treści wspólne dla wszystkich wersji — nazwy i opisy
 * siedmiu wielkości, nazwy stref, jednostki, zdania o granicach pomiaru,
 * zastrzeżenie medyczne, prywatność, liczebniki. Nic o układzie ekranu
 * konkretnej wersji: nazwy ekranów i opisy przycisków należą do docs/vN/i18n/.
 *
 * FORMAT: patrz nagłówek docs/shared/i18n.js. Object.assign, a nie zwykłe
 * podstawienie — inaczej plik wersji skasowałby warstwę wspólną albo odwrotnie.
 *
 * WSTAWKI: '{app}' w legal.mdr, '{rate}' i '{limit}' w note.flickerOutOfRange,
 * '{n}' w liczebnikach. We wszystkich językach dokładnie te same nazwy.
 */
window.I18nData = window.I18nData || {};
window.I18nData['en'] = Object.assign(window.I18nData['en'] || {}, {

  /* Nazwa własna aplikacji. Osobny klucz, bo wchodzi jako wstawka w zdanie
     o rozporządzeniu (UE) 2017/745 i musi być tam odmieniona po swojemu. */
  'app.name': 'Light Monitor',

  /* ---- wybór języka (ta sama pozycja w opcjach każdej wersji) ---- */

  'language.label': 'Language',
  'language.help': 'The wording of the whole app. Every language is already on this device — nothing is downloaded and nothing is sent anywhere.',
  'language.auto': 'Match my device',
  'language.autoHint': 'Follows the language set in your phone or browser.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Blue share',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'percent',
  'metric.share.short': 'How much of the light in view falls on the blue channel.',
  'metric.share.help': 'It separates colour from brightness — this is the value that moves when you switch night mode on.',

  'metric.brightness.name': 'Scene brightness',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'percent',
  'metric.brightness.short': 'The average brightness of the camera image.',
  'metric.brightness.help': 'A relative value, not lux — the camera moves its own exposure underneath it.',

  'metric.kelvin.name': 'Colour temperature',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'kelvin',
  'metric.kelvin.short': 'Whether the light is warm or cool.',
  'metric.kelvin.help': 'Below 3000 K light is warm and gentler in the evening. 6500 K is the default white of most screens.',

  'metric.melanopic.name': 'Circadian impact',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'times',
  'metric.melanopic.short': 'How strongly this light acts on the body clock.',
  'metric.melanopic.help': 'An approximation of the melanopic ratio. 1.00 is neutral daylight white; in the evening it is worth going below 0.50.',

  'metric.flicker.name': 'Flicker',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'percent',
  'metric.flicker.short': 'Invisible pulsing of the light source.',
  'metric.flicker.help': 'Cheap dimmers and backlights pulse. The eye does not see it, but it is a known cause of tiredness and headaches.',

  'metric.uniformity.name': 'Uniformity',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'percent',
  'metric.uniformity.short': 'Whether the light is spread evenly across the frame.',
  'metric.uniformity.help': 'A low value on a screen means backlight bleed or a reflection; on a desk it means a badly placed lamp.',

  'metric.comfort.name': 'Eye comfort',
  'metric.comfort.unit': 'pts',
  'metric.comfort.unitSpoken': 'points',
  'metric.comfort.short': 'One verdict instead of six numbers.',
  'metric.comfort.help': 'It folds the other readings into a 0–100 score and shows what lowers it most. The weights are our editorial judgement, not a standard.',

  /* Etykiety składników oceny komfortu — Metrics.comfortIndex zwraca je jako
     `penalties[].id`, więc nazwa klucza idzie za tym identyfikatorem. */
  'comfort.penalty.melanopic': 'Circadian impact',
  'comfort.penalty.kelvin': 'Cool light colour',
  'comfort.penalty.flicker': 'Flicker',
  'comfort.penalty.uniformity': 'Uneven lighting',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Te same zdania
     stoją wpisane wprost w engine.js jako zapas na wypadek, gdyby warstwa
     językowa się nie wczytała — poprawiane są więc w dwóch miejscach naraz. */

  'engine.idle': 'Press “Start” to turn the camera on.',
  'engine.starting': 'Starting the camera…',

  'engine.error.permission': 'No permission to use the camera. Allow the camera in your browser settings and press “Start” again.',
  'engine.error.notFound': 'No camera found. Check that the device has a camera and that it is not switched off in the system.',
  'engine.error.busy': 'The camera is busy in another application. Close it and try again.',
  'engine.error.unknown': 'The camera could not be started.',
  'engine.error.unsupported': 'This browser does not give this page access to the camera. Open the app over HTTPS or use a different browser.',

  /* ---- strefy: jeden język barw dla całej aplikacji ---- */

  'zone.good': 'Within range',
  'zone.warning': 'Caution',
  'zone.critical': 'Critical',
  'zone.none': 'No data',
  'zone.settling': 'Settling',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania, więc małą literą
     i bez kropki. To nie jest to samo, co napis na plakietce. */
  'zone.spoken.good': 'within range',
  'zone.spoken.warning': 'caution',
  'zone.spoken.critical': 'critical',
  'zone.spoken.none': 'no data',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'pts',
  'unit.hertz': 'Hz',
  'unit.second': 's',
  'unit.minute': 'min',
  'unit.hour': 'h',

  /* ---- zdania oceniające, po jednym na wielkość i strefę ----
     Są tu, a nie w słowniku wersji, bo mówią o samej wielkości, nie o ekranie.
     Wersja, która chce dopisać nazwę swojego modułu, nadpisuje pojedynczy
     klucz u siebie. */

  'verdict.good': 'This light is fine — nothing crosses the thresholds you set.',
  'verdict.noValue': 'This quantity cannot be measured right now. Check that nothing is covering the lens.',
  'verdict.warmup': 'Working out the verdict — hold the phone still a moment longer.',

  'verdict.warning.share': 'A fair amount of this light falls on the blue channel. In the evening it is worth dimming it.',
  'verdict.warning.brightness': 'The scene is bright — the camera is working close to the top of its range.',
  'verdict.warning.kelvin': 'The light is fairly cool. In the evening a bulb around 2700 K is gentler.',
  'verdict.warning.melanopic': 'This light acts fairly strongly on the body clock.',
  'verdict.warning.flicker': 'The light source is visibly pulsing.',
  'verdict.warning.uniformity': 'The light is spread unevenly across the frame.',
  'verdict.warning.comfort': 'Eye comfort is reduced — several things add up to it.',

  'verdict.critical.share': 'A great deal of blue. In the evening switch night mode on or change the light source.',
  'verdict.critical.brightness': 'The scene is very bright. Do not measure by pointing straight at the light source.',
  'verdict.critical.kelvin': 'The light is cold. In the evening this is the most tiring for the eyes — a warmer bulb or night mode will help.',
  'verdict.critical.melanopic': 'This light acts strongly on the body clock. In the evening it is worth going below 0.50.',
  'verdict.critical.flicker': 'The light source pulses heavily. This is a known cause of eye strain and headaches.',
  'verdict.critical.uniformity': 'The light is spread very unevenly. Check the lamp position or reflections on the screen.',
  'verdict.critical.comfort': 'Eye comfort is low. Look at what the score is made of to see what lowers it.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'What this number does not tell you',
  'note.warningTitle': 'Caution',
  'note.dashTitle': 'What this measurement is not',
  'note.dashText': 'A phone camera has three broad colour channels and an automatic white balance — it does not measure a spectrum. Colour temperature and circadian impact are approximations calculated from sRGB primaries. The app shows differences and changes over time well; it does not replace a meter and it makes no diagnosis.',
  'note.approxLegend': '≈ approximate value — calculated from sRGB primaries, not from a spectral measurement.',
  'note.kelvinOutOfRange': 'Outside the range of the method — at this colour the colour-temperature formula stops being trustworthy.',
  /* {rate} i {limit} podaje wywołanie, bo to liczby z silnika (5 Hz, 2,5 Hz),
     a ich zapis jest różny w różnych językach: 2.5 po angielsku, 2,5 po polsku.
     Zapisu liczby nie wolno wpisywać do zdania na sztywno. */
  'note.flickerOutOfRange': 'Outside the range of the method — sampling at {rate} Hz only sees pulsing below {limit} Hz. Mains flicker at 100 Hz is out of reach and the app will never report it as a reading.',
  'note.helpTitle': 'What this number does not tell you',
  'note.helpText': 'A phone camera has three broad channels and does not measure a spectrum. This value is a comparative indicator — it shows differences between lights and changes over time well, and it is neither a laboratory measurement nor medical information.',
  'note.calibration': 'Measurement without calibration — treat the values as comparative.',

  'note.howToTitle': 'How to measure sensibly',
  'note.howTo.hold.title': 'Hold the phone still',
  'note.howTo.hold.text': 'The automatic exposure needs 2–3 seconds to settle.',
  'note.howTo.aim.title': 'Point at a lit surface',
  'note.howTo.aim.text': 'A white sheet of paper or a light wall. Do not measure by looking straight into the light source.',
  'note.howTo.compare.title': 'Compare, do not judge in absolute terms',
  'note.howTo.compare.text': 'The same scene before and after a change of lighting says more than a single number.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Skracanie go w tłumaczeniu nie jest kwestią stylu. */

  'legal.noDiagnosis': 'No reading is a diagnosis or health advice.',
  'legal.mdr': '{app} is not a medical device within the meaning of Regulation (EU) 2017/745, is not intended to diagnose, prevent, monitor or treat any medical condition, and does not replace an examination by a doctor or an optometrist.',

  /* ---- prywatność ---- */

  'privacy.title': 'What leaves this device',
  'privacy.short': 'Nothing in this app sends anything to the network. Every number is produced on this device and stays here.',
  'privacy.onDevice': 'The camera starts only after you press the button, and the image never leaves this device.',
  'privacy.external': 'This is the only place in the whole app where anything leaves this device: the button opens an external page in a new tab, and only once you press it. Measurements, history and settings stay here.',
  'privacy.externalPending': 'Once the address is available, the button will open an external page in a new tab. That will be the only moment when anything leaves this device. Measurements, history and settings stay here.',
  'privacy.storageBlocked': 'This browser will not let anything be saved (private mode, or site data blocked). Measuring works, but the history will disappear when you close the tab.',

  /* ---- liczebniki ----
     Wartością jest obiekt form CLDR; formę wybiera Intl.PluralRules aktywnego
     języka po params.n. Angielski ma dwie kategorie, polski cztery, arabski
     sześć — dlatego pisze się formy, a nie regułę. */

  'count.readings': { one: '{n} reading', other: '{n} readings' },
  'count.sessions': { one: '{n} session', other: '{n} sessions' },
  'count.seconds': { one: '{n} second', other: '{n} seconds' },
  'count.minutes': { one: '{n} minute', other: '{n} minutes' },
  'count.hours': { one: '{n} hour', other: '{n} hours' },
  'count.days': { one: '{n} day', other: '{n} days' }
});
