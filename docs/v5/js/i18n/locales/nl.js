/* Monitor Światła v5 — słownik niderlandzki.
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr). NIE JEST
 * KALKĄ żadnego z nich: polskie i angielskie zdania przełożono na naturalną
 * niderlandczyznę. Zachowane zostało to, co niesie znaczenie: liczby, progi,
 * jednostki, nazwy wstawek i — co do treści — zastrzeżenia medyczne oraz
 * zdania o prywatności. Tych ostatnich nie wolno osłabiać ani wzmacniać:
 * „nie zastępuje rozmowy z lekarzem” i „obraz nie opuszcza urządzenia”
 * znaczą po niderlandzku dokładnie tyle samo, ani mniej, ani więcej.
 *
 * REJESTR: bezpośrednie „je/jij” — konsekwentnie w całym pliku, także
 * w komunikatach błędów. Tak mówią niderlandzkie aplikacje użytkowe; „u”
 * brzmiałoby tu jak pismo z urzędu albo z banku.
 * Cudzysłowy: “ … ” (podwójne, dziś w niderlandzkim zapisie standardowe).
 * Apostrof zawsze typograficzny: ’s avonds, zo’n.
 * Przecinek dziesiętny, jak po polsku (1,00). Znak % stoi bez odstępu po
 * liczbie (40%), zgodnie z niderlandzką praktyką typograficzną.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych i pomocy):
 *   blauwaandeel, scènehelderheid, kleurtemperatuur, circadiane invloed
 *   (w opisie: melanopische factor), flikkering, gelijkmatigheid,
 *   visueel comfort.
 * STREFY: veilig / matig / schadelijk — mówią o świetle, a nie o stanie
 * aplikacji, i wchodzą w zdanie „zone: {zone}” tak samo jak polskie
 * „bezpiecznie / umiarkowanie / szkodliwie”.
 * POZOSTAŁE STAŁE ODPOWIEDNIKI: geschiedenis (historia), sessie (sesja),
 * sample (próbka), meting (pomiar), grootheid (wielkość), drempel (próg),
 * gegevens (dane).
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Tekst met een {name}-invoeging'   — napis zwykły,
 *   'klucz.kropkowany': { one, other }                     — forma zależna
 *                                                            od liczby.
 * Niderlandzki ma w CLDR dwie formy: `one` i `other`. Nazwy wstawek są
 * identyczne jak w pl.js — pilnuje tego keys.test.js. Kolejność wstawek
 * w zdaniu wolno zmieniać, nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Lichtmonitor',
  'app.description': 'Lichtmonitor — je camera meet zeven grootheden van het licht om je heen. Alles wordt op dit apparaat berekend, er gaat niets het netwerk op.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Lichtmonitor',
  'app.skipToContent': 'Naar de inhoud',
  'app.nav.aria': 'Hoofdnavigatie',
  'app.noscript.title': 'Deze app heeft JavaScript nodig',
  'app.noscript.text': 'De hele meting gebeurt in dit browsertabblad: JavaScript leest de beelden van de camera uit en berekent daaruit de zeven lichtgrootheden. Zonder JavaScript is er niets om mee te meten. Zet JavaScript aan voor deze pagina en open de pagina opnieuw — er wordt nog steeds niets naar het netwerk gestuurd.',

  'nav.measure': 'Meten',
  'nav.history': 'Geschiedenis',
  'nav.tools': 'Gereedschap',
  'nav.support': 'Steun',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Meting loopt',
  'shell.live.aria': 'Meting loopt. {metric}: {value}. Terug naar het meetscherm.',
  'shell.live.metricFallback': 'Hoofdgrootheid',
  'shell.action.fallback': 'Schermactie',

  'shell.loadFail.title': 'Het scherm “{screen}” kon niet worden geladen',
  'shell.loadFail.text': 'Waarschijnlijk ontbreken er bestanden in het geheugen van het apparaat. Maak verbinding met het netwerk en ververs de pagina.',
  'shell.fatal.title': 'Er is iets misgegaan',
  'shell.fatal.text': 'De app kon het scherm niet samenstellen. De pagina verversen helpt meestal — je opgeslagen metingen en instellingen blijven waar ze zijn.',
  'shell.fatal.reload': 'Pagina verversen',
  'shell.boot.failTitle': 'De app kon niet starten',
  'shell.boot.failText': 'De schil is niet gestart. Ververs de pagina — je opgeslagen metingen en instellingen blijven waar ze zijn.',
  'shell.background.error': 'Er ging iets mis op de achtergrond',
  'shell.background.action': 'Verversen',
  'shell.update.title': 'Er is een nieuwe versie',
  'shell.update.action': 'Verversen',

  'onboarding.title': 'Voordat je begint',
  'onboarding.lead': 'Lichtmonitor kijkt met de camera naar het licht om je heen en berekent daaruit zeven grootheden — van blauwaandeel tot visueel comfort.',
  'onboarding.privacy': 'Het beeld verlaat dit apparaat nooit: er is geen server, geen account en er wordt niets verstuurd. Alle zeven grootheden werken meteen, zonder inloggen en zonder kosten.',
  'onboarding.honesty': 'Dit is een indicatie, geen meetinstrument en geen medisch onderzoek. Wat niet te meten valt, laten we niet zien — in plaats van een getal zie je een streepje.',
  'onboarding.start': 'We beginnen',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Uitvoeren',
  'overlay.toast.close': 'Melding sluiten',
  'overlay.sheet.label': 'Venster',
  'overlay.sheet.close': 'Sluiten',
  'overlay.dialog.confirm': 'Bevestigen',
  'overlay.dialog.cancel': 'Annuleren',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'Annuleren',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'Meten',

  'measure.intro.aria': 'Begin een meting',
  'measure.intro.headline': 'Zie in welk licht je zit',
  'measure.intro.lead': 'De camera laat zien hoeveel blauw er zit in het licht dat nu op je valt — en of dat op dit uur van de dag te veel is.',
  'measure.intro.start': 'Meting starten',
  'measure.intro.hint': 'De browser vraagt toestemming voor de camera. Zodra je die geeft, begint de meting.',
  'measure.intro.privacy': 'Het camerabeeld wordt op dit apparaat verwerkt en verlaat het nooit. We versturen, bewaren of delen geen enkel frame.',
  'measure.intro.honesty': 'Dit is geen medisch hulpmiddel en geen onderzoek. De app toont een benadering van het licht om je heen; hij oordeelt niet over je gezondheid en vervangt geen gesprek met een arts.',

  'measure.live.aria': 'Meting bezig',
  'measure.badge.starting': 'Starten',
  'measure.badge.paused': 'Gepauzeerd',
  'measure.badge.running': 'Meting loopt',
  'measure.stale': 'Wachten op beeld — het voorbeeld bevriest zolang de app op de achtergrond staat.',
  'measure.crop': 'We meten het midden van het beeld — de gemarkeerde {percent}% van de breedte en de hoogte.',
  'measure.facing.front': 'frontcamera',
  'measure.facing.back': 'achtercamera',

  'measure.boot.title': 'De camera wordt gestart…',
  'measure.boot.text': 'Vraagt de browser om toestemming, geef die dan — zonder beeld valt er niets te meten. De toestemming geldt alleen voor deze pagina en je kunt die later weer intrekken.',
  'measure.boot.cancel': 'Annuleren',

  'measure.hold': 'Waarden bevroren. De camera loopt door, maar er komt niets in de geschiedenis of in de gemiddelden terecht.',
  'measure.gridHint': 'Kies een tegel om die grootheid naar de grote meter te halen.',

  'measure.stop': 'Stoppen',
  'measure.pause': 'Pauzeren',
  'measure.resume': 'Hervatten',
  'measure.flip.aria': 'Camera wisselen',
  'measure.flip.toBack': 'Naar de achtercamera wisselen',
  'measure.flip.toFront': 'Naar de frontcamera wisselen',

  'measure.fail.aria': 'Camerafout',
  'measure.fail.headline': 'De camera is niet gestart',
  'measure.fail.retry': 'Opnieuw proberen',
  'measure.fail.back': 'Terug',
  'measure.fail.savedSession': 'De sessie van voor de onderbreking ({duration}) is in de geschiedenis opgeslagen.',
  'measure.error.fallback': 'De camera kon niet worden gestart.',

  'measure.summary.aria': 'Samenvatting van de sessie',
  'measure.summary.title': 'Samenvatting van de sessie',
  'measure.summary.paused': '{duration} gepauzeerd',
  'measure.summary.nothingMeasured': 'Geen enkele grootheid heeft een waarde verzameld — de camera zag de hele sessie geen licht.',
  'measure.summary.note': 'De gemiddelden tellen alleen samples van buiten de pauze mee. Grootheden die niet gemeten zijn, blijven weg en tellen niet als nul.',
  'measure.summary.nearThreshold': 'Dichtst bij een drempel',
  'measure.summary.worstPoint': 'Zwakste punt',
  'measure.summary.averageZone': 'gemiddeld {zone}',
  'measure.summary.tooShort': 'De sessie duurde {duration} — te kort om vanzelf in de geschiedenis te komen. Je kunt de sessie met de hand opslaan.',
  'measure.summary.again': 'Opnieuw meten',
  'measure.summary.save': 'In geschiedenis opslaan',
  'measure.summary.saved': 'Opgeslagen in de geschiedenis',
  'measure.summary.savedToast': 'Sessie opgeslagen in de geschiedenis.',
  'measure.summary.close': 'Sluiten',

  'measure.method.title': 'Hoe we dit meten',
  'measure.method.p1': 'De app bemonstert het camerabeeld tien keer per seconde en berekent de grootheden uit de middelste {percent}% van het beeld — het kader in het voorbeeld markeert precies dat gebied.',
  'measure.method.p2': 'Een telefooncamera heeft drie brede kanalen plus een eigen, automatische belichting en witbalans. Ze ziet de verhoudingen van het licht, niet het spectrum.',
  'measure.method.p3': 'Blauwaandeel, helderheid, flikkering en gelijkmatigheid zijn wat de camera werkelijk meet. Kleurtemperatuur en circadiane invloed zijn openlijk benoemde benaderingen, berekend uit de sRGB-primairen.',
  'measure.method.p4': 'Flikkering is alleen onder vier hertz zichtbaar. Netflikkering van 100 Hz ligt ver buiten het bereik van deze bemonstering en wordt nooit als waarde gemeld.',
  'measure.method.p5': 'Geen van deze getallen is een fotometrische meting of een medische uitslag. Het camerabeeld verlaat het apparaat niet.',
  'measure.method.ok': 'Duidelijk',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'Starten van de camera afgebroken.',
  'measure.announce.stoppedNoSamples': 'Meting gestopt. Er zijn geen samples verzameld.',
  'measure.announce.stopped': 'Meting gestopt. De samenvatting van de sessie staat klaar.',
  'measure.announce.interrupted': 'Meting onderbroken. De samenvatting van de sessie staat klaar.',
  'measure.announce.paused': 'Meting gepauzeerd. Waarden bevroren.',
  'measure.announce.resumed': 'Meting hervat.',
  'measure.announce.switchedFront': 'Overgeschakeld naar de frontcamera. Er begint een nieuwe sessie.',
  'measure.announce.switchedBack': 'Overgeschakeld naar de achtercamera. Er begint een nieuwe sessie.',
  'measure.announce.lead': 'Hoofdgrootheid: {metric}.',
  'measure.announce.cameraError': 'Camerafout. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'Het licht bleef de hele sessie binnen het veilige bereik — laat de lamp staan zoals hij staat en kijk na zonsondergang nog eens, wanneer een andere bron aan het werk is.',
  'measure.advice.share.evening': 'Het blauwaandeel was gemiddeld {value} — zet je schermen in de nachtmodus en doe het plafondlicht uit, met één warme lamp op bureauhoogte.',
  'measure.advice.share.day': 'Het blauwaandeel was gemiddeld {value} — overdag is dat acceptabel, maar laat je scherm twee uur voor het slapengaan automatisch naar de warme stand overgaan.',
  'measure.advice.brightness': 'Het beeld was overbelicht (gemiddeld {value}) — ga verder van de lichtbron af staan of draai het gemeten scherm zachter, want bij zo’n belichting verliezen de andere grootheden ook nauwkeurigheid.',
  'measure.advice.kelvin.evening': 'De kleurtemperatuur bleef gemiddeld op {value} — ga na zonsondergang onder 3000 K: zet de lamp in de warme stand of draai er een lamp van 2700 K in.',
  'measure.advice.kelvin.day': 'De kleurtemperatuur bleef gemiddeld op {value} — overdag een goed, activerend wit, maar zet dezelfde lamp ’s avonds op 2700 K.',
  'measure.advice.melanopic.evening': 'De circadiane invloed was gemiddeld {value} — ga in de twee uur voor het slapengaan onder 0,50 ×, door het hoofdlicht te dimmen en vanaf bureauhoogte te schijnen in plaats van vanaf het plafond.',
  'measure.advice.melanopic.day': 'De circadiane invloed was gemiddeld {value} — op dit uur helpt zo’n dosis, maar vervang deze bron ’s avonds door een zwakkere en warmere.',
  'measure.advice.flicker': 'De flikkering kwam gemiddeld op {value} — meestal is dat een dimmer of een laag gezette achtergrondverlichting: zet de schermhelderheid boven 40% of vervang de dimmer door een zonder PWM.',
  'measure.advice.uniformity': 'Het licht viel ongelijkmatig (gemiddeld {value}) — zet de lamp opzij van het blad en voeg een tweede, zwakkere bron aan de andere kant toe, in plaats van één sterk punt.',
  'measure.advice.comfort': 'Het visuele comfort kwam gemiddeld op {value} — begin met één verandering: dim de hoofdbron tot de helft en pak pas daarna de kleur van het licht aan.',
  'measure.advice.default': 'Verander één ding aan je verlichting en meet opnieuw — twee sessies vergelijken zegt meer dan één losse waarde.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'Geschiedenis',
  'history.action.export': 'Geschiedenis exporteren',

  'history.metricGroup.aria': 'Keuze van de grootheid',
  'history.announce.metric': 'Grootheid: {metric}',
  'history.rangeGroup.aria': 'Tijdbereik',
  'history.range.aria': 'Laatste {range}',

  'history.stats.title': 'Statistieken van het bereik',
  'history.stats.head': '{metric}\u00A0—\u00A0laatste {range}',
  'history.stats.note': 'Berekend uit wat de grafiek laat zien. Tijd zonder meting telt niet mee — we zetten er geen nul voor in de plaats.',
  'history.stat.min': 'Minimum',
  'history.stat.avg': 'Gemiddelde',
  'history.stat.max': 'Maximum',
  'history.trend.up': 'stijgt in dit bereik',
  'history.trend.flat': 'geen duidelijke verandering',
  'history.trend.down': 'daalt in dit bereik',
  'history.trend.none': 'niets om mee te vergelijken',

  'history.sessions.title': 'Meetsessies',
  'history.sessions.count': '{sessions}, nieuwste eerst',
  'history.sessions.empty': 'Nog geen sessies',
  'history.sessions.hint': 'Een sessie wordt opgeslagen zodra je de meting stopt.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'bereik: {range}',
  'history.session.noMeasure': 'niets gemeten',

  'history.data.title': 'Gegevens',
  'history.data.subtitle': 'De geschiedenis staat alleen op dit apparaat.',
  'history.export.csv': 'CSV exporteren',
  'history.export.json': 'JSON exporteren',
  'history.export.ok': 'Bestand klaar om op te slaan',
  'history.export.fail': 'Het bestand kon niet worden klaargemaakt. In de privémodus en in een venster dat in een andere app is ingebed, blokkeert de browser het opslaan — open de pagina in een gewoon tabblad.',
  'history.export.sheet.title': 'Geschiedenis exporteren',
  'history.export.sheet.text': 'CSV opent in een spreadsheet (puntkomma als scheidingsteken, komma als decimaalteken). JSON bewaart alles, inclusief de lijst met sessies en de gaten waar niets is gemeten.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Geschiedenis wissen',
  'history.clear.title': 'Geschiedenis wissen?',
  'history.clear.text': 'Hiermee verwijderen we {points} en {sessions}. Dat kan niet ongedaan worden gemaakt — wil je de gegevens houden, exporteer ze dan eerst.',
  'history.clear.confirm': 'Wissen',
  'history.clear.announce': 'Geschiedenis gewist.',
  'history.clear.toast': 'Geschiedenis gewist',

  'history.empty.title': 'Nog niets te laten zien',
  'history.empty.text': 'De geschiedenis vult zich terwijl je meet — één punt per seconde. Alles blijft op dit apparaat.',
  'history.empty.action': 'Naar de meting',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 min',
  'range.5m': '5 min',
  'range.1h': '1 uur',
  'range.24h': '24 uur',
  'range.7d': '7 dagen',
  'range.30d': '30 dagen',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Datum en tijd',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'Het geheugen van het apparaat is vol — nieuwe metingen worden niet meer opgeslagen.',
  'storage.blocked': 'De browser laat niet toe dat de geschiedenis wordt opgeslagen — de gegevens zijn weg zodra je het tabblad sluit.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Gereedschap',
  'tools.action.about': 'Over de meting',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Taal',
  'tools.language.subtitle': 'Standaard volgt de app de taal van je apparaat; een keuze uit deze lijst werkt meteen en blijft in deze browser bewaard.',
  'tools.language.aria': 'Taal van de interface',
  'tools.language.system': 'Auto',
  'tools.language.announce': 'Taal van de interface: {language}.',

  'tools.appearance.title': 'Weergave',
  'tools.appearance.theme.title': 'Thema',
  'tools.appearance.theme.desc': '“Auto” volgt de instelling van je systeem.',
  'tools.appearance.theme.aria': 'Thema',
  'tools.theme.system': 'Auto',
  'tools.theme.light': 'Licht',
  'tools.theme.dark': 'Donker',
  'tools.appearance.accent.title': 'Accentkleur',
  'tools.appearance.accent.desc': 'De kleur van knoppen, selecties en schuifregelaars.',
  'tools.appearance.accent.aria': 'Accentkleur',
  'tools.appearance.textScale.title': 'Tekstgrootte',
  'tools.appearance.textScale.desc': 'Vergroot de hele interface, niet alleen de bijschriften.',
  'tools.appearance.textScale.aria': 'Tekstgrootte',
  'tools.appearance.density.title': 'Dichtheid',
  'tools.appearance.density.desc': 'Compact zet meer inhoud op één scherm.',
  'tools.appearance.density.aria': 'Dichtheid van de indeling',
  'tools.density.comfortable': 'Ruim',
  'tools.density.compact': 'Compact',
  'tools.appearance.motion.title': 'Minder beweging',
  'tools.appearance.motion.desc': 'Schakelt animaties en het vloeiend aanlopen van de wijzer uit. De instelling van je systeem respecteren we hoe dan ook.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Oceaan',
  'accent.violet': 'Violet',
  'accent.amber': 'Amber',
  'accent.mint': 'Mint',
  'accent.rose': 'Roze',

  'tools.thresholds.title': 'Drempels',
  'tools.thresholds.subtitle': 'Vanaf welke waarde de app “matig” moet zeggen en vanaf welke “kritiek”. De standaarddrempels zijn ons voorstel, geen norm — stel ze op jezelf af.',
  'tools.thresholds.warn': 'Waarschuwingsdrempel',
  'tools.thresholds.crit': 'Alarmdrempel',
  'tools.thresholds.warn.aria': 'Waarschuwingsdrempel — {metric}',
  'tools.thresholds.crit.aria': 'Alarmdrempel — {metric}',
  'tools.thresholds.reset': 'Standaard',
  'tools.thresholds.reset.aria': 'Standaarddrempels herstellen: {metric}',
  'tools.thresholds.moved': '{threshold} verzet naar {value}.',
  'tools.thresholds.resetAll': 'Alle drempels herstellen',
  'tools.thresholds.resetAll.title': 'Standaarddrempels herstellen?',
  'tools.thresholds.resetAll.text': 'Alle zeven grootheden gaan terug naar de drempels die de app voorstelt. Je meetgeschiedenis blijft onaangeroerd.',
  'tools.thresholds.resetAll.confirm': 'Herstellen',
  'tools.thresholds.resetAll.cancel': 'Laten staan',
  'tools.thresholds.resetAll.toast': 'Drempels staan weer op de standaardwaarden',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'boven {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} en lager',
  'tools.zoneRange.goodBelow': 'onder {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} en hoger',

  'tools.calibration.title': 'Kalibratie',
  'tools.calibration.subtitle': 'Voor wie iets heeft om mee te vergelijken.',
  'tools.calibration.intro': 'Twee telefoons die op dezelfde lamp gericht zijn, laten iets andere getallen zien — elke sensor heeft zijn eigen kleurzweem. Heb je een meting bij de hand die je vertrouwt, dan kun je hier de afzonderlijke beeldkanalen voorzichtig ophogen of afzwakken. De vermenigvuldigers werken voordat er iets berekend wordt, dus ze veranderen alle zeven grootheden tegelijk.',
  'tools.calibration.neutral': 'Niets om mee te vergelijken? Laat het op 1,00 staan — dat is de fabrieksinstelling en die bederft niets.',
  'tools.calibration.forward': 'De wijziging geldt vanaf nu. Metingen die al in de geschiedenis staan, blijven zoals ze op het moment van opslaan waren — we rekenen ze niet opnieuw door, want dat zou gegevens achteraf veranderen.',
  'tools.calibration.reset': 'Kalibratie terugzetten',
  'tools.calibration.reset.toast': 'Kalibratie teruggezet',
  'tools.calibration.channel.r': 'Rood kanaal',
  'tools.calibration.channel.g': 'Groen kanaal',
  'tools.calibration.channel.b': 'Blauw kanaal',
  'tools.calibration.channel.aria': '{channel} — kalibratiefactor',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'Meting',
  'tools.measurement.wake.title': 'Scherm aan houden',
  'tools.measurement.wake.desc': 'Tijdens de meting blijft het scherm aan. De batterij loopt dan sneller leeg.',
  'tools.measurement.wake.unsupported': 'Deze browser laat ons het scherm niet wakker houden.',
  'tools.measurement.haptics.title': 'Trillen',
  'tools.measurement.haptics.desc': 'Een korte bevestiging bij het starten, het stoppen en het wisselen van grootheid.',
  'tools.measurement.haptics.unsupported': 'Dit apparaat meldt geen trilmotor.',

  'tools.about.title': 'Over de meting',
  'tools.about.subtitle': 'Wat elk van de zeven grootheden precies berekent en waar de betrouwbaarheid van deze methode ophoudt.',
  'tools.about.scale': 'Schaal: van {min} tot {max}.',
  'tools.about.threshold': 'We waarschuwen vanaf {warn} en slaan alarm vanaf {crit}.',
  'tools.about.thresholdInvert': 'We waarschuwen onder {warn} en slaan alarm onder {crit}.',
  'tools.about.limitsHead': 'Wat deze meting niet kan',
  'tools.about.limit.spectrum.title': 'Een camera ziet kleur niet zoals een meetinstrument',
  'tools.about.limit.spectrum.text': 'Een telefooncamera heeft drie kanalen: rood, groen en blauw. Een instrument om licht te meten splitst ze in tientallen smalle banden. Wat je hier ziet, is uit die drie getallen afgeleid — op een verstandige manier, maar het blijft een berekening en geen gemeten spectrum.',
  'tools.about.limit.exposure.title': 'De camera regelt zijn helderheid zelf',
  'tools.about.limit.exposure.text': 'Richt je de telefoon op het raam, dan maakt de camera het beeld donkerder om het niet te overbelichten. De “scènehelderheid” daalt dan, terwijl er in de kamer niets is veranderd. Vergelijk deze waarde daarom binnen één opname, niet tussen kamers.',
  'tools.about.limit.flicker.title': 'Snelle flikkering vangt een trage camera niet',
  'tools.about.limit.flicker.text': 'We bekijken het beeld {hz} keer per seconde. Pulseren dat sneller gaat dan {nyquist} keer per seconde kan in zo’n meting trager lijken dan het werkelijk is, of helemaal verdwijnen — en flikkering van het lichtnet is precies zo snel. Vangt de app iets op, vat het dan op als een teken dat “hier iets pulseert”, en niet als een gemeten frequentie.',
  'tools.about.limit.medical.title': 'Dit is geen medisch onderzoek en geen medisch advies',
  'tools.about.limit.medical.text': 'De app helpt je opmerken dat het licht om je heen koel, fel of onrustig is, en geeft aan wat je eraan kunt doen. Ze doet geen uitspraak over je gezondheid en vervangt geen gesprek met een arts of een meting met een professionele meter.',
  'tools.about.privacy': 'Alles wordt op jouw apparaat berekend. Het camerabeeld wordt nergens naartoe gestuurd en nergens opgeslagen — alleen de berekende getallen komen in het geheugen terecht.',
  'tools.about.privacyPolicy': 'Volledig privacybeleid',

  'tools.data.title': 'Gegevens',
  'tools.data.subtitle': 'Alles staat in het geheugen van deze browser en gaat hier nergens naartoe.',
  'tools.data.summary.empty': 'Er zijn nog geen metingen opgeslagen.',
  'tools.data.summary': 'In het geheugen: {points} en {sessions}.',
  'tools.data.export.csv': 'CSV exporteren',
  'tools.data.export.json': 'JSON exporteren',
  'tools.data.clear': 'Geschiedenis wissen',
  'tools.data.reset': 'Standaardinstellingen',
  'tools.data.reset.title': 'Standaardinstellingen herstellen?',
  'tools.data.reset.text': 'Weergave, drempels, kalibratie en meetinstellingen gaan terug naar hun begintoestand. Je meetgeschiedenis blijft onaangeroerd.',
  'tools.data.reset.confirm': 'Herstellen',
  'tools.data.reset.toast': 'Standaardinstellingen hersteld',
  'tools.data.wipe': 'Alle gegevens verwijderen',
  'tools.data.wipe.title': 'Alle gegevens van de app verwijderen?',
  'tools.data.wipe.text': 'Weg zijn dan: de hele meetgeschiedenis en de lijst met sessies, jouw drempels en kalibratie, en je weergave-instellingen. De app gaat terug naar de toestand van de eerste start.',
  'tools.data.wipe.note': 'We hebben geen kopie van deze gegevens — ze hebben dit apparaat nooit verlaten, dus er is nergens iets vandaan te halen.',
  'tools.data.wipe.check': 'Ik begrijp dat dit niet ongedaan te maken is',
  'tools.data.wipe.confirm': 'Alles verwijderen',
  'tools.data.wipe.toast': 'Alle gegevens van de app zijn verwijderd',
  'tools.data.wipe.announce': 'Alle gegevens van de app zijn verwijderd. De instellingen staan weer op de standaardwaarden.',
  'tools.data.storage.blocked': 'Deze browser laat niet toe dat er iets blijvend wordt opgeslagen (privémodus of geblokkeerde sitegegevens). Alles wat je hier instelt, is weg zodra je het tabblad sluit.',
  'tools.data.storage.full': 'Het geheugen van de browser is vol en nieuwe metingen worden niet meer opgeslagen. De geschiedenis wissen maakt ruimte vrij.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Steun',
  'support.free.title': 'Alles is beschikbaar',
  'support.free.lead': 'Alle zeven grootheden, de volledige geschiedenis, drempels, kalibratie en export werken vanaf de eerste start — zonder account, zonder limieten en zonder kosten.',
  'support.free.note': 'De meting wordt volledig op dit apparaat berekend en werkt zonder netwerk. Er is hier geen betere versie die we achter een muur houden.',
  'support.why.title': 'Waarom ik erom vraag',
  'support.why.lead': 'Lichtmonitor wordt na werktijd gebouwd, zonder advertenties, zonder sponsor en zonder bedrijf erachter. Steun betaalt de tijd voor verbeteringen, voor nieuwe grootheden en voor het onderhoud van wat er al werkt.',
  'support.what.title': 'Wat een donatie oplevert',
  'support.what.lead': 'Niets. Een donatie ontgrendelt niets — geen extra functie, geen speldje bij je naam, geen voorrang. Alles wat de app kan, heb je nu al.',
  'support.what.note': 'Wat overblijft, is dat ik weet dat iemand er iets aan had. Dat is echt reden genoeg.',
  'support.cta.title': 'Als je wilt helpen',
  'support.cta.button': 'Trakteer me op een koffie',
  'support.cta.nolink': 'Het donatieprofiel is nog niet aangesloten. Zodra het er is, staat op deze plek een knop.',
  'support.cta.privacy': 'Deze link opent de externe pagina van Buy Me a Coffee in een nieuw tabblad. Dat is het enige moment waarop er iets dit apparaat verlaat — de meting zelf blijft altijd hier.',
  'support.cta.privacyFuture': 'Zodra het adres er is, opent de knop de externe pagina van Buy Me a Coffee in een nieuw tabblad. Dat zal het enige moment zijn waarop er iets dit apparaat verlaat — de meting zelf blijft altijd hier.',
  'support.cta.note': 'Er is hier geen aftelklok, er zijn geen herinneringen en er gaat geen venster vanzelf open. Dit verzoek wacht alleen op dit tabblad.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'laatste minuut',
  'gauge.aria': '{metric}: {value}, zone: {zone}',
  'gauge.aria.note': '{metric}: {value}, zone: {zone}, {note}',
  'gauge.aria.initial': '{metric}: geen gegevens',
  'gauge.value.none': 'geen gegevens',
  /* Odczyt słowny z jednostką: „27 procent”, „1,20 keer”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'waarde bij benadering',
  'gauge.note.offScale': 'buiten de schaal',
  'gauge.metric.unknown': 'Onbekende grootheid',

  'chart.aria.label': 'Grafiek van de meetgeschiedenis',
  'chart.hint': 'Interactieve grafiek. Pijl links en pijl rechts verplaatsen de leescursor, Home en End springen naar het begin en het einde van het bereik, Escape verbergt de cursor.',
  'chart.empty.title': 'Geen gegevens',
  'chart.empty.text': 'Start een meting — de grafiek verschijnt na de eerste waarden.',
  'chart.few.title': 'Te weinig gegevens',
  'chart.few.text': 'We hebben één waarde: {value}. Voor een lijn zijn er twee nodig.',
  'chart.legend.line': 'meting',
  'chart.legend.gap': 'gat in de meting',
  'chart.aria.head': 'Grafiek: {metric}, bereik {range}',
  'chart.aria.empty': 'Geen gegevens in dit bereik.',
  'chart.aria.one': 'Eén waarde: {value}.',
  'chart.aria.summary': 'Van {min} tot {max}, gemiddeld {avg}, {points}.',
  'chart.aria.gaps': 'De reeks heeft gaten — toen maten we niet.',
  'chart.readout.empty': 'Geen gegevens in dit bereik.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'Te weinig gegevens om een grafiek te tekenen.',
  'chart.readout.hint': 'Sleep over de grafiek of gebruik de pijltjestoetsen om één meting af te lezen.',
  'chart.time.now': 'nu',
  'chart.time.justNow': 'zojuist',
  'chart.time.ago': '{duration} geleden',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd zegar dwudziestoczterogodzinny i kropka
     po skrócie miesiąca, bo tak niderlandzkie ustawienia regionalne zapisują
     datę. */
  'chart.sample.ago': '\u221230\u00A0min',
  'chart.sample.clock': '00:00',
  'chart.sample.date': '30\u00A0aug.',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'Blauwaandeel',
  'metric.share.short': 'Hoeveel van het waargenomen licht op het blauwe kanaal valt.',
  'metric.share.help': 'Scheidt de kleur van de helderheid — dit is de waarde die verandert als je de nachtmodus aanzet.',
  'metric.brightness.name': 'Scènehelderheid',
  'metric.brightness.short': 'De gemiddelde helderheid van het camerabeeld.',
  'metric.brightness.help': 'Een relatieve waarde, geen lux — de automatische belichting van de camera verschuift die ongemerkt.',
  'metric.kelvin.name': 'Kleurtemperatuur',
  'metric.kelvin.short': 'Of het licht warm of koel is.',
  'metric.kelvin.help': 'Onder 3000 K is het licht warm en ’s avonds zachter. 6500 K is het standaardwit van de meeste schermen.',
  'metric.melanopic.name': 'Circadiane invloed',
  'metric.melanopic.short': 'Hoe sterk dit licht op de biologische klok werkt.',
  'metric.melanopic.help': 'Een benadering van de melanopische factor. 1,00 is neutraal daglichtwit; ’s avonds is het goed om onder 0,50 te blijven.',
  'metric.flicker.name': 'Flikkering',
  'metric.flicker.short': 'Onzichtbaar pulseren van de lichtbron.',
  'metric.flicker.help': 'Goedkope dimmers en achtergrondverlichting pulseren. Het oog ziet het niet, maar het geldt als mogelijke oorzaak van vermoeidheid en hoofdpijn.',
  'metric.uniformity.name': 'Gelijkmatigheid',
  'metric.uniformity.short': 'Of het licht zich gelijkmatig over het beeld verdeelt.',
  'metric.uniformity.help': 'Een lage waarde betekent op een scherm doorschijnende achtergrondverlichting of een spiegeling; op het bureau — een slecht geplaatste lamp.',
  'metric.comfort.name': 'Visueel comfort',
  'metric.comfort.short': 'Eén beoordeling in plaats van zes getallen.',
  'metric.comfort.help': 'Vat de overige metingen samen in een score van 0 tot 100 en laat zien wat die het sterkst omlaag haalt. De wegingen zijn onze redactionele inschatting, geen norm.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'goed',
  'zone.warn': 'matig',
  'zone.crit': 'kritiek',
  'zone.none': 'geen gegevens',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 aug.'). */
  'date.month.short.1': 'jan.',
  'date.month.short.2': 'feb.',
  'date.month.short.3': 'mrt.',
  'date.month.short.4': 'apr.',
  'date.month.short.5': 'mei',
  'date.month.short.6': 'jun.',
  'date.month.short.7': 'jul.',
  'date.month.short.8': 'aug.',
  'date.month.short.9': 'sep.',
  'date.month.short.10': 'okt.',
  'date.month.short.11': 'nov.',
  'date.month.short.12': 'dec.',

  'date.clock': '{hours}:{minutes}',
  /* Kolejność wstawek jak po polsku: niderlandzki skrót daty to „30 aug.”.
     Nazwy wstawek zostają te same — zmienia się wyłącznie skrót miesiąca. */
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0{year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0uur',
  'time.duration.hourMinute': '{hours}\u00A0uur {minutes}\u00A0min',
  'time.duration.hour': '{hours}\u00A0uur',
  'time.duration.minuteSecond': '{minutes}\u00A0min {seconds}\u00A0s',
  'time.duration.minute': '{minutes}\u00A0min',
  'time.duration.second': '{seconds}\u00A0s',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „zojuist”. */
  'time.justNow': 'zojuist',
  'time.aMinuteAgo': 'een minuut geleden',
  'time.minutesAgo': '{minutes}\u00A0min geleden',
  'time.hoursAgo': '{hours}\u00A0uur geleden',
  'time.yesterday': 'gisteren',
  'time.daysAgo': '{days}\u00A0dagen geleden',

  /* Formy zależne od liczby. Niderlandzki ma w CLDR dwie: `one` i `other`.
     Rozstrzyga je Intl.PluralRules dla języka aktywnego. */
  'time.days.plural': { one: 'dag', other: 'dagen' },
  'unit.sample.plural': { one: 'sample', other: 'samples' },
  'unit.measurement.plural': { one: 'meting', other: 'metingen' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Niderlandzki ma tu jedną — oba klucze zostają (kształt słownika jest
     wspólny dla wszystkich języków), a wartości są identyczne. */
  'unit.session.plural': { one: 'sessie', other: 'sessies' },
  'unit.session.accusative.plural': { one: 'sessie', other: 'sessies' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy — po niderlandzku rozdziela je złożenie „datapunt”. */
  'unit.chartPoint.plural': { one: 'datapunt', other: 'datapunten' },
  'unit.point.plural': { one: 'punt', other: 'punten' },
  /* Nazwa jednostki po liczbie zostaje nieodmieniona: „3000 kelvin”. */
  'unit.kelvin.plural': { one: 'kelvin', other: 'kelvin' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „procent”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'procent',
  'unit.spoken.times': 'keer',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'Er is geen toestemming voor de camera gegeven. Sta de camera voor deze pagina toe in de instellingen van je browser of systeem en probeer het opnieuw.',
  'camera.error.notfound': 'Geen camera gevonden. Controleer of het apparaat er een heeft en of die niet in het systeem is uitgeschakeld.',
  'camera.error.inuse': 'De camera is bezet door een andere app. Sluit die app of dat tabblad en probeer het opnieuw.',
  'camera.error.insecure': 'De camera werkt alleen via HTTPS of op localhost. Open deze pagina op een adres dat met “https://” begint.',
  'camera.error.unsupported': 'Deze browser geeft de camera hier niet vrij. Probeer het in Chrome of Safari, in een gewoon venster — niet in een voorbeeld dat in een andere app is ingebed.',
  'camera.error.unknown': 'De camera kon niet worden gestart.'
};
