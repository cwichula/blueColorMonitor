/* docs/v1/i18n/en.js — słownik WŁASNY wersji v1, angielski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka — i ZAWSZE, także wtedy, gdy aktywny jest inny język. Angielski jest
 * wartością zapasową każdego brakującego klucza, więc ten plik musi być
 * kompletny; pozostałe 28 języków wolno uzupełniać stopniowo.
 *
 * DLACZEGO JEST PEŁNY, A NIE RÓŻNICOWY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar, własne dwie
 * wielkości zamiast siedmiu i własne nazwy stref („Safe” zamiast wspólnego
 * „Within range”). Zestaw kluczy jest więc dokładnie taki sam jak w pl.js tego
 * katalogu — pilnuje tego docs/shared/i18n/keys.test.js.
 *
 * TŁUMACZENIE JEST WZORCEM DLA POZOSTAŁYCH 28 JĘZYKÓW, więc:
 *  • angielszczyzna brytyjska („colour”), zgodnie z docs/shared/i18n/en.js;
 *  • terminologia jak w docs/lib i w słowniku wspólnym: blue share, scene
 *    brightness, colour temperature — nazwa wielkości brzmi tak samo wszędzie;
 *  • zastrzeżenia medyczne i akapity o prywatności przetłumaczone DOKŁADNIE,
 *    bez osłabiania i bez dodawania obietnic: to zdania o skutkach prawnych,
 *    a nie o stylu.
 *
 * MARKUP W WARTOŚCIACH. Klucze z sufiksem `.html` zawierają <b>, <i>, <code>
 * i encje HTML; wstawia je data-i18n-html, czyli tylko tam, gdzie autor tekstu
 * świadomie tego chciał — nigdy do treści pochodzącej od użytkownika.
 */
window.I18nData = window.I18nData || {};
window.I18nData['en'] = Object.assign(window.I18nData['en'] || {}, {

  /* ---- aplikacja ---- */

  'app.name': 'Harmful Light Monitor',
  'app.description': 'Uses the camera to measure how strong the blue colour on a screen is and plots it on a clear chart with zones: safe, moderate, harmful.',

  /* ---- wybór języka ---- */

  'language.label': 'Language',
  'language.help': 'The wording of the whole app. Every language is already on this device — nothing is downloaded and nothing is sent anywhere.',
  'language.auto': 'Match my device',

  /* ---- nawigacja ---- */

  'nav.aria': 'Main menu',
  'nav.tabsAria': 'App views',
  'nav.announce': 'Screen: {screen}',
  'nav.camera': 'Camera',
  'nav.monitoring': 'Monitoring',
  'nav.support': 'Support',
  'nav.more': 'More',
  'nav.docs': 'Documentation',
  'nav.about': 'About and contact',
  'nav.settings': 'Warning thresholds',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← Back',
  'action.back.aria': 'Back to the previous screen',
  'action.openDocs': 'Go to the documentation',
  'action.exportCsv': 'Export CSV',
  'action.delete': 'Delete',
  'action.closeNotification': 'Close notification',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref — „Safe / Moderate / Harmful”, a nie wspólne
     „Within range / Caution / Critical”. Wersja plakatowa (zone.badge.*) jest
     osobnym kluczem, a nie zapisem wielkimi literami przez CSS: tureckie „i”
     i greckie akcenty nie znoszą automatycznej zamiany. */

  'zone.good': 'Safe',
  'zone.warning': 'Moderate',
  'zone.critical': 'Harmful',
  'zone.none': 'No data',

  'zone.badge.good': 'SAFE',
  'zone.badge.warning': 'MODERATE',
  'zone.badge.critical': 'HARMFUL',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'B channel brightness',
  'metric.raw.unitLabel': '% of B channel brightness',
  'metric.share.name': 'Blue share',
  'metric.share.longName': 'Blue share of the light',
  'metric.share.unitLabel': '% blue share',
  'stat.overallBrightness': 'Overall scene brightness',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': 'Camera preview',
  'camera.pressStart': 'Press “Start”.',
  'camera.start': 'Start',
  'camera.stop': 'Stop',
  'camera.switch': 'Switch camera',
  'camera.error': 'The camera could not be started. Check the browser’s camera permission and try again. ({message})',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': 'Current readings',
  'disclaimer.short': 'An approximate result. This is not a medical device.',
  'disclaimer.more': 'More',

  /* ---- wykresy ---- */

  'chart.aria': 'Charts over time',
  'chart.title': 'Charts over time (last {seconds} s)',
  'chart.empty': 'Start the camera to see the chart',
  'chart.axis.past': '-{seconds}s',
  'chart.axis.now': 'now',
  'chart.raw.aria': 'Chart of B channel brightness over time, with the safe, moderate and harmful zones marked',
  'chart.share.aria': 'Chart of the blue share of the light over time, with the safe, moderate and harmful zones marked',

  /* ---- tabela odczytów ---- */

  'table.show': 'Show as a table',
  'table.hide': 'Hide the table',
  'table.caption': 'Latest readings (newest at the top)',
  'table.col.time': 'Time',
  'table.col.zone': 'Zone',

  /* ---- ustawienia progów ---- */

  'settings.title': 'Zone threshold settings',
  'settings.boundary.critical': 'Yellow / red boundary:',
  'settings.boundary.warning': 'Green / yellow boundary:',

  /* ---- historia i raport (features.js) ---- */

  'history.title': 'History and report',
  'history.rangeAria': 'History range',
  'history.unavailable': 'History data is temporarily unavailable.',
  'history.empty': 'No readings saved in this range. Start measuring — the history builds up on its own.',
  'history.savedReadings': 'Saved readings: {count}. Time split by zone:',
  'history.zoneLine': '{zone}: {percent}% ({readings})',

  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 days',
  'range.30d': '30 days',

  'report.dailyTitle': 'Daily report',
  'report.empty': 'The report will appear once there are readings saved in the selected range.',
  'report.dailyCaption': 'Share of time in each zone, day by day',
  'report.col.day': 'Day',
  'report.col.week': 'Week',
  'report.col.readings': 'Readings',
  'report.compare.day': 'Day-to-day comparison: {day} — {percent}% of the time in the harmful zone, {change}',
  'report.compare.dayPending': 'The day-to-day comparison will appear after a second day of measurements.',
  'report.compare.week': 'Week-to-week comparison: {week} — {percent}% of the time in the harmful zone, {change}',
  'report.compare.weekPending': 'The week-to-week comparison will appear after a second week of measurements.',
  'report.change.same': 'the same as {other}.',
  'report.change.more': '{points} more than {other}.',
  'report.change.less': '{points} less than {other}.',
  'report.peak': 'Most readings in the harmful zone fell between {from} and {to}.',
  'report.peak.none': 'No readings in the harmful zone were saved in this range.',
  'report.weeklyTitle': 'Weekly report',
  'report.weeklyEmpty': 'The weekly report will appear once there are readings saved in the selected range.',
  'report.weeklyCaption': 'Share of time in each zone, week by week',
  'report.weekLabel': 'Week {week} ({year})',
  'report.footnote': 'The figures are the share of saved readings in the selected range, not the exact exposure time.',

  /* ---- profile progów ---- */

  'profiles.title': 'Threshold profiles',
  'profiles.empty': 'You have not saved any profiles yet.',
  'profiles.itemActive': '{name} (active)',
  'profiles.applyAria': 'Apply the {name} profile',
  'profiles.deleteAria': 'Delete the {name} profile',
  'profiles.applied': 'Applied the “{name}” profile.',
  'profiles.deleted': 'Deleted the “{name}” profile.',
  'profiles.saved': 'Saved the “{name}” profile.',
  'profiles.namePlaceholder': 'Profile name (for example Evening)',
  'profiles.saveLabel': 'Save the current thresholds as a profile',
  'profiles.saveBtn': 'Save profile',
  'profiles.needName': 'Enter a profile name.',
  'profiles.limit': {
    one: 'You can save at most {n} profile. Delete one to add another.',
    other: 'You can save at most {n} profiles. Delete one to add another.'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku też — ale musi
     zostać bezpieczna dla systemu plików: bez ukośników i dwukropków. */

  'csv.header': 'time;b_channel_pct;blue_share_pct;scene_brightness_pct;zone',
  'csv.filename': 'light-monitoring-{stamp}.csv',
  'csv.empty': 'There are no readings to export. Start measuring and try again.',
  'csv.done': 'Exported {readings} to a CSV file.',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut: po polsku wypada tam dopełniacz („od
     5 minut”), w innych językach jeszcze inny przypadek, a angielski wzorzec ma
     pokazywać tłumaczowi całe zdanie, nie jego okrawek. */

  'alert.exposure': {
    one: 'Threshold alert: the reading has been in the harmful zone for {n} minute. Consider a break, or lowering the blue share on the screen.',
    other: 'Threshold alert: the reading has been in the harmful zone for {n} minutes. Consider a break, or lowering the blue share on the screen.'
  },

  'session.title': 'Summary of the last session',
  'session.line': 'Measuring time: {duration}. Saved readings: {count}.',
  'session.zoneLine': '{zone}: {percent}% of the session.',
  'session.endedAt': 'The summary covers the session that ended at {time}.',
  'session.toast': 'Session finished: {duration}, {readings}, {percent}% of the time in the harmful zone.',

  'duration.seconds': '{n} s',
  'duration.minutesSeconds': '{minutes} min {seconds} s',

  /* ---- liczebniki ----
     Angielski ma dwie kategorie CLDR: one i other. Formę wybiera
     Intl.PluralRules('en'), nie nasza reguła — w innych językach kategorii jest
     więcej (polski cztery, arabski sześć), i właśnie dlatego pisze się formy,
     a nie regułę odmiany. */

  'count.readings': { one: '{n} reading', other: '{n} readings' },
  'count.points': {
    one: '{n} percentage point',
    other: '{n} percentage points'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': 'More',
  'more.section.settings': 'SETTINGS',
  'more.section.help': 'HELP',
  'more.thresholds.title': 'Warning thresholds',
  'more.thresholds.sub': 'Set the boundaries of the safe, moderate and harmful zones.',
  'more.docs.title': 'Documentation',
  'more.docs.sub': 'How the measurement works, units, standards and zones.',
  'more.about.title': 'About and contact',
  'more.about.sub': 'Version, privacy and contact.',
  'more.free': 'The app is free in its entirety.',
  'more.supportLink': 'You are welcome to support it voluntarily.',
  'more.version': 'Version {version} · Every feature available without an account and without payment',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': 'About and contact',
  'about.version': 'Version {version}',
  'about.what.title': 'What this app is',
  'about.what.p1': '{app} uses the phone camera to measure how much blue light the sensor records, and shows it on two dials and on charts with zones. Every feature — measuring, history, reports, threshold profiles, the threshold alert, CSV export and the documentation — is available to everyone, without an account and without payment.',
  'about.what.p2': 'The app is provided “as is”, for informational use. The result of a measurement is approximate and is not a basis for health decisions.',
  'about.privacy.title': 'Privacy and data',
  'about.privacy.p1': 'The camera image is analysed on your device only and is never sent to any server. We do not create accounts and we do not collect your data. Threshold settings, profiles and measurement history are saved only in the storage of this device and this browser.',
  'about.privacy.p2': 'The app shows no advertising and does not talk to the network. The only exception is the button on the “Support” screen: when you press it, the browser opens an external page in a new tab. Nothing happens until you do that yourself.',
  'about.contact.title': 'Contact',
  'about.contact.p1': 'Comments, bugs and suggestions: [E-MAIL]. We reply whenever we can — this project is maintained after hours.',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': 'Support',
  'support.free.title': 'Everything is available',
  'support.free.text': 'The whole app is free: measuring, history and reports, threshold profiles, the alert, CSV export and the documentation. It all works straight away, without an account, without limits and without an internet connection.',
  'support.why': '{app} is built after hours. If you find it useful, you can buy me a coffee. That helps keep the app running and take it further — improving the measurement, writing more documentation and checking it on more phones.',
  'support.nothing': 'A donation unlocks nothing. There is no better and no worse version — after you give, the app works in exactly the same way. The only difference is that the author knows it was useful to someone.',
  'support.button': 'Buy me a coffee',
  'support.button.aria': 'Buy me a coffee — opens the donation profile in a new tab',
  'support.pending': 'The donation profile is not connected yet. The button will stand here as soon as it is. Until then there is nothing to do — the app is free in its entirety anyway.',
  'support.privacy': 'The button opens an external page (Buy Me a Coffee, for example) in a new browser tab. That is the only moment when anything leaves this device. The camera image and all of your measurements stay here — they are not sent anywhere, either before you press it or after.',
  'support.privacyPending': 'Once the address is available, pressing the button will open an external page (Buy Me a Coffee, for example) in a new browser tab. That will be the only moment when anything leaves this device. The camera image and all of your measurements stay here — they are not sent anywhere.',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem .html, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': 'Documentation',

  'disclaimer.title': 'This is not a medical device',
  'disclaimer.body.docs': 'This app is not a medical device. It is not intended to diagnose, treat or prevent any disease. Results measured with a phone camera are approximate and do not replace an examination or the advice of a doctor. On matters of eye health, consult a doctor or an optometrist. The zone thresholds in this app do not reproduce any safety standard — details in chapter 3.',
  'disclaimer.body.about': 'This app is not a medical device. It is not intended to diagnose, treat or prevent any disease. Results measured with a phone camera are approximate and do not replace an examination or the advice of a doctor. On matters of eye health, consult a doctor or an optometrist. The zone thresholds in this app do not reproduce any safety standard — details in the documentation, chapter 3.',

  'doc.toc.aria': 'Documentation contents',
  'doc.toc.title': 'Contents',

  'doc.ch1.title': 'Quick start',
  'doc.ch2.title': 'How the measurement works',
  'doc.ch3.title': 'Units and standards',
  'doc.ch4.title': 'Zones and thresholds',
  'doc.ch5.title': 'Differences between devices',

  'doc.ch1.heading': '1. Quick start',
  'doc.ch2.heading': '2. How the measurement works',
  'doc.ch3.heading': '3. Units and standards',
  'doc.ch4.heading': '4. Zones and thresholds',
  'doc.ch5.heading': '5. Differences between devices',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': 'How to measure more accurately',
  'doc.ch1.tips.li1': 'On the “Camera” screen (the first button on the bottom bar) press “Start” and point the rear camera at the screen or the light source you want to check.',
  'doc.ch1.tips.li2': 'Go to the “Monitoring” screen (the second button on the bottom bar) — at the top you see both dials at once, and below them (scroll down) the charts of change over time. The measurement keeps running in the background whichever screen you happen to be looking at.',
  'doc.ch1.tips.li3': 'Keep the phone at a fixed distance from the screen (15–20 cm, say), without changing the ambient lighting while measuring.',
  'doc.ch1.tips.li4': 'Use the rear camera — its automatic corrections are less aggressive than the front one’s.',
  'doc.ch1.tips.li5': 'Treat the results as relative indicators (%), not as absolute physical units — compare them against each other (night mode on versus off, for example).',
  'doc.ch1.tips.li6': 'Adjust the zone thresholds in the settings to the brightness of your own screen (chapter 4).',

  'doc.ch1.fonts.title': 'Large type and dials — always',
  'doc.ch1.fonts.p1': 'The whole app uses large, legible type and full-size dials, so that people with low vision (and everyone else) can read the data without extra settings. On the “Monitoring” screen both dials fit on one screen together, with no scrolling — the charts of change over time are right below them, one scroll further.',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': 'A phone camera versus a spectrometer',
  'doc.ch2.spectro.p1.html': 'Really measuring “how much harmful blue light there is” requires splitting the light into wavelengths — which is what a <b>spectrometer</b> does: a prism or a diffraction grating disperses the light into dozens or hundreds of narrow bands (every 1–5 nm, say) and measures the optical power in each one separately. Only from such a full spectral distribution can units like lux, lumen or irradiance weighted by the blue-light hazard function be calculated.',
  'doc.ch2.spectro.p2.html': '<b>A phone camera does none of that.</b> It has three broad filters (Bayer: R/G/B), each of which collects light across a wide, overlapping range of wavelengths — the “blue channel” is not a narrow band around 435–440 nm (the peak of the hazard to the retina) but roughly 400–570 nm mixed with green. On top of that come demosaicing, automatic exposure, automatic white balance and sRGB gamma compression — the browser does not let a single one of those steps be switched off completely. As a result, the pixel value that JavaScript sees is not linearly related to the actual optical power falling on the sensor. That is a fundamental hardware limitation, not a fault of this app.',

  'doc.ch2.raw.title': 'Chart 1 — B channel brightness',
  'doc.ch2.raw.what.html': '<b>What it shows:</b> the average brightness of the blue (B) channel alone across the sampled part of the image, on a 0–255 scale converted to %.',
  'doc.ch2.raw.algo.html': '<b>The algorithm:</b>',
  'doc.ch2.raw.step1': 'We take a frame from the camera 5 times a second.',
  'doc.ch2.raw.step2': 'We crop the middle 60% of the frame (this avoids the edges of the image and glare from the sides).',
  'doc.ch2.raw.step3': 'We scale the cropped part down to a 32×32 pixel grid (accurate enough, and far faster than working at full resolution — which matters on lower-powered hardware such as budget Xiaomi or Ulefone phones).',
  'doc.ch2.raw.step4': 'We average the B value of all 1024 pixels of that grid.',
  'doc.ch2.raw.step5.html': '<code>result = average_B ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>Why we kept it:</b> it is the simplest, most direct reading of “how much blue signal the sensor is picking up at all”. Its weakness is that it mixes brightness with colour — a very bright but neutrally white scene will also give a high result, even though it is not particularly “blue”. That is why we show chart 2 next to it.',

  'doc.ch2.share.title': 'Chart 2 — Blue share of the light',
  'doc.ch2.share.what.html': '<b>What it shows:</b> what percentage of all the recorded light (R+G+B) the blue component makes up — that is, the shift of the colour towards cool, regardless of how bright the scene is.',
  'doc.ch2.share.algo.html': '<b>The algorithm:</b> the same steps 1–4 as above, but instead of B alone we calculate:',
  'doc.ch2.share.formula.html': '<code>result = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': 'Neutral white (R≈G≈B) gives about <b>33%</b>. Warmer, redder light gives less. Strongly blue light gives more, up to a limit of ~100% for light that is almost purely blue.',
  'doc.ch2.share.why.html': '<b>Why this is the more accurate measure of “harmful blue”:</b> it is the same principle that night mode and Night Shift filters work on — what counts is <b>colour</b>, not brightness. A very bright but neutral screen will not be falsely flagged as harmful; a dimmed but strongly blue one will. That is why this is the metric that drives the zone colour in the table of readings.',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': 'Why not lux or lumens',
  'doc.ch3.units.p1.html': 'A <b>lumen (lm)</b> describes the total luminous flux emitted by a source — a property of the source itself, not of what reaches a given point. A <b>lux (lx)</b> is already illuminance at a point (lm/m²) — closer to what we are after, but still a <b>photometric</b> unit: it weights the spectrum by the human eye’s luminous sensitivity curve (V(λ)), not by the blue-light hazard curve. Truly measuring the hazard needs a third, narrower unit: spectrally weighted irradiance in <b>W/m²</b> (standard IEC 62471, sensitivity peaking around 435–440 nm), and that requires a spectrometer — see the section above.',
  'doc.ch3.units.p2.html': 'Even if we settled for lux: a phone without an external, calibrated light sensor cannot determine them reliably. The phone’s built-in light sensor (where there is one) in any case measures the light on the <b>opposite side</b> of the case from the one you point at the screen with the rear camera — so it would be measuring the light behind your back, not the light from the screen. Rather than guess a number in a unit that would be untrustworthy anyway, we show an honestly labelled <b>relative indicator (%)</b> — meaningful for comparisons on the same phone under the same conditions (night mode on versus off, say), not as an absolute value.',

  'doc.ch3.norms.title': 'Are there global standards for safety thresholds?',
  'doc.ch3.norms.p1.html': 'Briefly: <b>there is no standard expressed as a percentage of a camera channel</b> — that is not a unit anything is regulated in at all. Real standards on blue light do exist, but they measure different quantities, in different units, and they concern a different phenomenon from the one usually meant by “blue light tires the eyes”.',
  'doc.ch3.norms.p2.html': '<b>Acute photochemical damage to the retina — IEC 62471 / ICNIRP.</b> The only genuinely regulated “blue-light hazard” — a standard for lamps and lighting systems, supported by the guidelines of the ICNIRP (International Commission on Non-Ionizing Radiation Protection). It sorts sources into risk groups RG0–RG3 on the basis of radiance weighted by the hazard function B(λ), in <b>W·m⁻²·sr⁻¹</b>, with a limit on exposure time (<code>t_max = 100 / L_B</code> seconds). Phone and monitor screens — even at maximum brightness — fall in practice always into <b>RG0 (exempt, no restrictions)</b>. That standard concerns far more intense sources (welding arcs, some projectors, industrial LEDs), not consumer screens.',
  'doc.ch3.norms.p3.html': '<b>Effect on the circadian rhythm and sleep — CIE S 026.</b> This is the phenomenon usually meant (a screen in the evening “wakes you up”) — but it is not damage to the eye; it is an effect on the body clock through the retinal ganglion cells (ipRGCs), most sensitive around 480 nm. The CIE S 026:2018 standard defines the unit <b>melanopic lux (melanopic EDI)</b>. The nearest thing to an “official” scientific consensus is the paper by Brown and co-authors (<i>PLOS Biology</i>, 2022), which recommends as a rough guide: in the evening &lt; 10 melanopic lux, during the day &gt; 250. Those are recommendations from sleep researchers, not a legal requirement.',
  'doc.ch3.norms.p4.html': '<b>The WHO.</b> The World Health Organization publishes no independent exposure limits of its own for blue light — on optical radiation safety it refers to the ICNIRP (above). The only concrete WHO document of its own on screens is the <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i> (2019) — and that concerns the <b>time</b> spent at a screen, not the colour or the intensity of the light: no screen below the age of 1, at most 1 hour for ages 2–4. For adults the WHO has no equally specific numerical guidance.',
  'doc.ch3.norms.p5.html': '<b>Why none of that helps calibrate the app anyway:</b> both families of standards (IEC/ICNIRP and CIE) require a full spectral distribution and calibrated radiance in a known measurement geometry — exactly what a phone cannot deliver through a browser (see the section “A phone camera versus a spectrometer” above). There is no conversion of “33% blue share = X melanopic lux”, so the thresholds in this app <b>do not reproduce any safety standard</b> (WHO, IEC, ICNIRP or CIE — for this indicator none simply exists). The default blue-share thresholds are, however, derived from real colour temperatures of light and from the widely repeated, practical recommendation of warm light in the evening — a firmer basis than plain rounding, but still not a formal standard (the full derivation is in chapter 4). You can always change them to your own in the settings.',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': 'The colour zones and where the thresholds come from',
  'doc.ch4.zones.p1.html': 'Both metrics have their own, independently adjustable thresholds (“Monitoring” screen → “Zone threshold settings”, at the bottom of the page) — 33%/66% on one does not mean the same as on the other (see chapter 2 above). It is the <b>blue share</b> that decides the colour in the legend under the charts and in the table of readings:',
  'doc.ch4.zones.li1.html': '<b>Green — safe:</b> warm or neutral light, the eyes are resting.',
  'doc.ch4.zones.li2.html': '<b>Yellow — moderate:</b> a noticeable shift towards blue, worth taking breaks.',
  'doc.ch4.zones.li3.html': '<b>Red — harmful:</b> strongly blue light, distinctly tiring for the eyes over longer exposure (especially in the evening).',
  'doc.ch4.zones.p2.html': '<b>Where these particular numbers come from.</b> <b>B channel brightness</b> has no natural point of reference — a sensible threshold value depends entirely on how bright the scene you are filming is (it is a measure of brightness, not of colour). The default 33%/66% is still an arbitrary starting point here — adjust it by trial to the typical brightness of your own screen and surroundings.',
  'doc.ch4.zones.p3.html': 'The <b>blue share</b> has default thresholds derived from real colour temperatures of light (physics, not rounding), not from any safety standard — no such standard exists for this quantity (chapter 3). The reference points:',
  'doc.ch4.zones.li4.html': '<b>~4000K</b> (“warm white”, a typical LED bulb) → about <b>26%</b> blue share. Light warmer than that (a lower colour temperature) is the range widely recommended for the evening by tools such as f.lux or Night Shift — hence the lower threshold.',
  'doc.ch4.zones.li5.html': '<b>6500K (D65)</b>, the standard white point of most phone and monitor screens out of the box — about <b>33%</b>. From that value upwards begins the range in which recommendations to limit blue light are typically made — hence the upper threshold.',
  'doc.ch4.zones.p4.html': '<b>An important caveat:</b> how “blue” light is does not depend on the time of day, but recommendations to limit blue light really only concern the <b>evening and night</b> — during the day, exposure to cool, blue light (sunlight included) is normal, and even good for the circadian rhythm. A red zone in the middle of the day while looking at an ordinary, unmodified screen does not mean a real hazard — the same light in the evening is worth limiting.',
  'doc.ch4.zones.p5.html': 'The thresholds of the two metrics are entirely independent — changing one does not affect the other. Changed thresholds are <b>remembered on this device and in this browser</b> between openings of the app (locally; nothing is sent anywhere) — the “Start” button does not reset them to the defaults.',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': 'Why the preview looks different on different devices',
  'doc.ch5.devices.p1.html': '<b>The browser versus the native camera app.</b> When you open the camera app that came with the phone, the manufacturer (Xiaomi, for instance) adds its own proprietary algorithms to the live preview — real-time HDR, digital brightness boosting in low light, smoothing. A web page gets a far more “raw” stream from the camera through the browser (the <code>getUserMedia</code> function), with none of those enhancements — so as a rule it will look flatter and darker than the native camera, whatever the phone.',
  'doc.ch5.devices.p2.html': '<b>Different degrees of camera control.</b> How much control over exposure and white balance the browser is given by the system at all depends on the particular phone, the camera driver and the version of Chrome or WebView — some devices (typically computers with a USB camera) report only full automation, others (some Android phones) report additional, more advanced modes. An earlier version of this app tried to switch to manual exposure mode wherever the phone allowed it, without setting a specific value — which on some phones froze the image at a random, dark exposure from the moment the camera started. That was a bug in the code (already fixed), not a difference in units — but it shows nicely how easily behaviour can differ between devices, when even the same line of code takes effect on only some of them.',
  'doc.ch5.devices.p3.html': '<b>Different sensors and image processing (ISP).</b> Even with identical code and the same scene, different phone models have sensors of different quality and manufacturer automation tuned differently — one will settle on an exposure in low light faster and more accurately than another. Combined with the fact that the indicators in this app are <b>relative</b> (see chapter 3), this means: compare results (and the look of the preview) on the same phone over time, not between different models or devices.'
});
