/* docs/shared/i18n/nl.js — słownik WSPÓLNY, niderlandzki.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest niderlandzki.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — i tak ma zostać
 * (patrz docs/shared/README.md, rozdział „Warstwa językowa”). Klucza, którego
 * nie ma w angielskim, nie wolno tu dopisać: angielski jest wartością
 * zapasową, więc to on wyznacza zestaw.
 *
 * REJESTR: forma grzecznościowa „u”, jednolicie w całym pliku — aplikacja mówi
 * o zdrowiu i o rozporządzeniu (UE) 2017/745, więc „je” brzmiałoby tu zbyt
 * poufale. Ton rzeczowy i ciepły, bez marketingu.
 *
 * TERMINOLOGIA (jeden odpowiednik na pojęcie): blauwaandeel, scènehelderheid,
 * kleurtemperatuur, circadiane invloed (współczynnik: melanopische factor),
 * flikkering, gelijkmatigheid, kijkcomfort; „zegar biologiczny” = biologische
 * klok.
 *
 * LICZBY: niderlandzki zapisuje ułamek przecinkiem (1,00 — 0,50), tak jak
 * polski. Apostrof w „’s avonds” jest typograficzny (U+2019), nie prosty —
 * inaczej rozerwałby napis stojący w apostrofach pojedynczych.
 *
 * LICZEBNIKI: Intl.PluralRules('nl') zwraca dwie kategorie — one i other.
 */
window.I18nData = window.I18nData || {};
window.I18nData['nl'] = Object.assign(window.I18nData['nl'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu
     (UE) 2017/745, gdzie stoi jako podmiot. */
  'app.name': 'Lichtmonitor',

  /* ---- wybór języka ---- */

  'language.label': 'Taal',
  'language.help': 'De taal van de hele app. Alle talen staan al op dit apparaat — er wordt niets gedownload en er wordt niets ergens naartoe gestuurd.',
  'language.auto': 'Zoals het apparaat',
  'language.autoHint': 'Volgt de taal die in de telefoon of in de browser is ingesteld.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Blauwaandeel',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'procent',
  'metric.share.short': 'Hoeveel van het zichtbare licht op het blauwe kanaal valt.',
  'metric.share.help': 'Het scheidt kleur van helderheid — dit is de waarde die verandert wanneer u de nachtmodus inschakelt.',

  'metric.brightness.name': 'Scènehelderheid',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'procent',
  'metric.brightness.short': 'De gemiddelde helderheid van het camerabeeld.',
  'metric.brightness.help': 'Een relatieve waarde, geen lux — de camera verschuift er zijn eigen belichting onder.',

  'metric.kelvin.name': 'Kleurtemperatuur',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'kelvin',
  'metric.kelvin.short': 'Of het licht warm of koel is.',
  'metric.kelvin.help': 'Onder 3000 K is licht warm en ’s avonds milder. 6500 K is het standaardwit van de meeste schermen.',

  'metric.melanopic.name': 'Circadiane invloed',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'keer',
  'metric.melanopic.short': 'Hoe sterk dit licht op de biologische klok werkt.',
  'metric.melanopic.help': 'Een benadering van de melanopische factor. 1,00 is neutraal daglichtwit; ’s avonds is het de moeite waard om onder 0,50 te komen.',

  'metric.flicker.name': 'Flikkering',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'procent',
  'metric.flicker.short': 'Onzichtbaar pulseren van de lichtbron.',
  'metric.flicker.help': 'Goedkope dimmers en achtergrondverlichting pulseren. Het oog ziet het niet, maar het is een bekende oorzaak van vermoeidheid en hoofdpijn.',

  'metric.uniformity.name': 'Gelijkmatigheid',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'procent',
  'metric.uniformity.short': 'Of het licht gelijkmatig over het beeld is verdeeld.',
  'metric.uniformity.help': 'Een lage waarde op een scherm betekent doorschijnende achtergrondverlichting of een weerspiegeling; op een bureau een verkeerd geplaatste lamp.',

  'metric.comfort.name': 'Kijkcomfort',
  'metric.comfort.unit': 'ptn',
  'metric.comfort.unitSpoken': 'punten',
  'metric.comfort.short': 'Eén oordeel in plaats van zes getallen.',
  'metric.comfort.help': 'Het vouwt de overige metingen samen tot een score van 0–100 en laat zien wat die het sterkst verlaagt. De wegingen zijn ons redactionele oordeel, geen norm.',

  /* Etykiety składników oceny komfortu — nazwa klucza idzie za identyfikatorem
     zwracanym przez Metrics.comfortIndex. */
  'comfort.penalty.melanopic': 'Circadiane invloed',
  'comfort.penalty.kelvin': 'Koele lichtkleur',
  'comfort.penalty.flicker': 'Flikkering',
  'comfort.penalty.uniformity': 'Ongelijkmatige verlichting',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ---- */

  'engine.idle': 'Druk op “Start” om de camera in te schakelen.',
  'engine.starting': 'De camera wordt gestart…',

  'engine.error.permission': 'Geen toestemming voor de camera. Sta de camera toe in de instellingen van uw browser en druk opnieuw op “Start”.',
  'engine.error.notFound': 'Geen camera gevonden. Controleer of het apparaat een camera heeft en of die niet in het systeem is uitgeschakeld.',
  'engine.error.busy': 'De camera is in gebruik door een andere app. Sluit die en probeer het opnieuw.',
  'engine.error.unknown': 'De camera kon niet worden gestart.',
  'engine.error.unsupported': 'Deze browser geeft deze pagina geen toegang tot de camera. Open de app via HTTPS of gebruik een andere browser.',

  /* ---- strefy ---- */

  'zone.good': 'Binnen bereik',
  'zone.warning': 'Let op',
  'zone.critical': 'Kritiek',
  'zone.none': 'Geen gegevens',
  'zone.settling': 'Stabiliseren',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania, więc małą literą
     i bez kropki. */
  'zone.spoken.good': 'binnen bereik',
  'zone.spoken.warning': 'let op',
  'zone.spoken.critical': 'kritiek',
  'zone.spoken.none': 'geen gegevens',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'ptn',
  'unit.hertz': 'Hz',
  'unit.second': 's',
  'unit.minute': 'min',
  'unit.hour': 'u',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'Dit licht is in orde — niets overschrijdt de ingestelde drempels.',
  'verdict.noValue': 'Deze grootheid is nu niet te meten. Controleer of de lens niet is afgedekt.',
  'verdict.warmup': 'Bezig met het bepalen van het oordeel — houd de telefoon nog even stil.',

  'verdict.warning.share': 'Een flink deel van dit licht valt op het blauwe kanaal. ’s Avonds is het de moeite waard om het te dimmen.',
  'verdict.warning.brightness': 'De scène is helder — de camera werkt dicht bij de bovengrens van haar meetbereik.',
  'verdict.warning.kelvin': 'Het licht is vrij koel. ’s Avonds is een lamp van ongeveer 2700 K milder.',
  'verdict.warning.melanopic': 'Dit licht werkt vrij sterk op de biologische klok.',
  'verdict.warning.flicker': 'De lichtbron pulseert zichtbaar.',
  'verdict.warning.uniformity': 'Het licht is ongelijkmatig over het beeld verdeeld.',
  'verdict.warning.comfort': 'Het kijkcomfort is verminderd — daar spelen meerdere dingen tegelijk in mee.',

  'verdict.critical.share': 'Heel veel blauw. Schakel ’s avonds de nachtmodus in of verander de lichtbron.',
  'verdict.critical.brightness': 'De scène is heel helder. Meet niet door recht in de lichtbron te kijken.',
  'verdict.critical.kelvin': 'Het licht is koud. ’s Avonds is dat het vermoeiendst voor de ogen — een warmere lamp of de nachtmodus helpt.',
  'verdict.critical.melanopic': 'Dit licht werkt sterk op de biologische klok. ’s Avonds is het de moeite waard om onder 0,50 te komen.',
  'verdict.critical.flicker': 'De lichtbron pulseert sterk. Dat is een bekende oorzaak van vermoeide ogen en hoofdpijn.',
  'verdict.critical.uniformity': 'Het licht is heel ongelijkmatig verdeeld. Controleer de stand van de lamp of weerspiegelingen op het scherm.',
  /* Bez numeru modułu — wersja nadpisze ten jeden klucz u siebie, jeśli chce
     odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'Het kijkcomfort is laag. Bekijk waaruit de score is opgebouwd om te zien wat die verlaagt.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'Wat dit getal niet zegt',
  'note.warningTitle': 'Let op',
  'note.dashTitle': 'Wat deze meting niet is',
  'note.dashText': 'Een telefooncamera heeft drie brede kleurkanalen en een automatische witbalans — hij meet geen spectrum. Kleurtemperatuur en circadiane invloed zijn benaderingen die uit de sRGB-primairen zijn berekend. De app laat verschillen en veranderingen in de tijd goed zien; hij vervangt geen meetinstrument en stelt geen enkele diagnose.',
  'note.approxLegend': '≈ benaderde waarde — berekend uit de sRGB-primairen, niet uit een spectrale meting.',
  'note.kelvinOutOfRange': 'Buiten het bereik van de methode — bij deze kleur is de formule voor de kleurtemperatuur niet meer betrouwbaar.',
  /* {rate} i {limit} podaje wywołanie — zapisu liczby nie wolno wpisywać
     do zdania na sztywno (2,5 po niderlandzku, tak jak po polsku). */
  'note.flickerOutOfRange': 'Buiten het bereik van de methode — bemonstering met {rate} Hz ziet pulseren alleen onder {limit} Hz. Netflikkering van 100 Hz ligt buiten bereik en de app zal die nooit als meetwaarde geven.',
  'note.helpTitle': 'Wat dit getal niet zegt',
  'note.helpText': 'Een telefooncamera heeft drie brede kanalen en meet geen spectrum. Deze waarde is een vergelijkende indicator — hij laat verschillen tussen lichtbronnen en veranderingen in de tijd goed zien, en is geen laboratoriummeting en geen medische informatie.',
  'note.calibration': 'Meting zonder kalibratie — behandel de waarden als vergelijkend.',

  'note.howToTitle': 'Hoe u zinvol meet',
  'note.howTo.hold.title': 'Houd de telefoon stil',
  'note.howTo.hold.text': 'De automatische belichting heeft 2–3 seconden nodig om te stabiliseren.',
  'note.howTo.aim.title': 'Richt op een verlicht oppervlak',
  'note.howTo.aim.text': 'Een wit vel papier of een lichte muur. Meet niet door recht in de lichtbron te kijken.',
  'note.howTo.compare.title': 'Vergelijk, oordeel niet absoluut',
  'note.howTo.compare.text': 'Dezelfde scène voor en na een verandering van de verlichting zegt meer dan één getal.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Skracanie go w tłumaczeniu nie jest kwestią stylu. */

  'legal.noDiagnosis': 'Geen enkele meetwaarde is een diagnose of gezondheidsadvies.',
  'legal.mdr': '{app} is geen medisch hulpmiddel in de zin van Verordening (EU) 2017/745, is niet bestemd voor het diagnosticeren, voorkomen, bewaken of behandelen van enige medische aandoening en vervangt geen onderzoek door een arts of een optometrist.',

  /* ---- prywatność ---- */

  'privacy.title': 'Wat dit apparaat verlaat',
  'privacy.short': 'Niets in deze app stuurt iets naar het netwerk. Alle getallen ontstaan op dit apparaat en blijven hier.',
  'privacy.onDevice': 'De camera gaat pas aan nadat u op de knop hebt gedrukt, en het beeld verlaat dit apparaat nooit.',
  'privacy.external': 'Dit is de enige plek in de hele app waar iets dit apparaat verlaat: de knop opent een externe pagina in een nieuw tabblad, en dat pas nadat u erop hebt gedrukt. Meting, geschiedenis en instellingen blijven hier.',
  'privacy.externalPending': 'Zodra het adres beschikbaar is, opent de knop een externe pagina in een nieuw tabblad. Dat zal het enige moment zijn waarop iets dit apparaat verlaat. Meting, geschiedenis en instellingen blijven hier.',
  'privacy.storageBlocked': 'Deze browser laat niets opslaan (privémodus of geblokkeerde sitegegevens). Meten werkt, maar de geschiedenis verdwijnt zodra u het tabblad sluit.',

  /* ---- liczebniki ----
     Niderlandzki ma dwie kategorie CLDR: one (dokładnie 1) i other — ta druga
     obejmuje też 0 i ułamki („1,5 meetwaarden”). Formę wybiera
     Intl.PluralRules('nl'), nie nasza reguła. Po liczebniku „uur” zostaje
     nieodmienione: 1 uur, 2 uur. */

  'count.readings': { one: '{n} meetwaarde', other: '{n} meetwaarden' },
  'count.sessions': { one: '{n} meting', other: '{n} metingen' },
  'count.seconds': { one: '{n} seconde', other: '{n} seconden' },
  'count.minutes': { one: '{n} minuut', other: '{n} minuten' },
  'count.hours': { one: '{n} uur', other: '{n} uur' },
  'count.days': { one: '{n} dag', other: '{n} dagen' }
});
