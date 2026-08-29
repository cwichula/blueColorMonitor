/* docs/v1/i18n/nl.js — słownik WŁASNY wersji v1, niderlandzki.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka. Kolejność jest treścią umowy: plik wersji dokłada się do tego samego
 * obiektu i może nadpisać dowolny klucz wspólny — nigdy odwrotnie.
 *
 * DLACZEGO TEN SŁOWNIK JEST SAMOWYSTARCZALNY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar w app.js, własne
 * dwie wielkości zamiast siedmiu i własne nazwy stref („Veilig” zamiast
 * wspólnego „Binnen bereik”). Dlatego wszystko, co v1 pokazuje, stoi TUTAJ —
 * także klucze, które przypadkiem brzmią tak samo jak wspólne. Zestaw kluczy
 * jest dokładnie taki sam jak w pl.js tego katalogu — pilnuje tego
 * docs/shared/i18n/keys.test.js.
 *
 * REJESTR: forma grzecznościowa „u”, jednolicie w całym pliku — tak jak
 * w docs/shared/i18n/nl.js i w docs/v2/i18n/nl.js. (v5 mówi „je”; to osobna
 * wersja z własnym rejestrem i tu się nią nie sugerujemy.) Cudzysłowy “ … ”,
 * przecinek dziesiętny, znak % bez odstępu po liczbie. Apostrof zawsze
 * typograficzny (U+2019): ’s avonds, zo’n — prosty rozerwałby napis stojący
 * w apostrofach pojedynczych.
 *
 * TERMINOLOGIA — wzięta z warstwy wspólnej, mimo że v1 jej nie ładuje: ta sama
 * rzecz ma się nazywać tak samo we wszystkich wersjach. blauwaandeel (udział
 * niebieskiego), scènehelderheid (jasność sceny), kleurtemperatuur, meetwaarde
 * (odczyt), meting i sessie (pomiar, sesja), drempel (próg), zone (strefa),
 * geschiedenis (historia), gegevens (dane). Nazwy stref „veilig / matig /
 * schadelijk” brzmią jak w v5 — to jedyne trzy słowa, w których v1 i v5 dzielą
 * światło tak samo, a warstwa wspólna inaczej.
 *
 * ZASTRZEŻENIA MEDYCZNE i akapity o prywatności przetłumaczone DOKŁADNIE, bez
 * osłabiania i bez dodawania obietnic — to zdania o skutkach prawnych.
 *
 * MARKUP W WARTOŚCIACH. Część kluczy (rozdziały Dokumentacji) zawiera znaczniki
 * <b>, <i>, <code> i encje HTML. Wstawiane są przez data-i18n-html, czyli tylko
 * tam, gdzie autor tekstu świadomie tego chciał — nigdy do treści pochodzącej
 * od użytkownika.
 *
 * LICZEBNIKI: Intl.PluralRules('nl') zwraca dwie kategorie — one i other.
 */
window.I18nData = window.I18nData || {};
window.I18nData['nl'] = Object.assign(window.I18nData['nl'] || {}, {

  /* ---- aplikacja ---- */

  'app.name': 'Monitor schadelijk licht',
  'app.description': 'Meet met de camera hoe sterk de blauwe kleur op een scherm is en zet die uit op een duidelijke grafiek met zones: veilig, matig, schadelijk.',

  /* ---- wybór języka ---- */

  'language.label': 'Taal',
  'language.help': 'De taal van de hele app. Alle talen staan al op dit apparaat — er wordt niets gedownload en er wordt niets ergens naartoe gestuurd.',
  'language.auto': 'Zoals het apparaat',

  /* ---- nawigacja ---- */

  'nav.aria': 'Hoofdmenu',
  'nav.tabsAria': 'Weergaven van de app',
  'nav.announce': 'Scherm: {screen}',
  'nav.camera': 'Camera',
  'nav.monitoring': 'Monitoring',
  'nav.support': 'Steun',
  'nav.more': 'Meer',
  'nav.docs': 'Documentatie',
  'nav.about': 'Over de app en contact',
  'nav.settings': 'Waarschuwingsdrempels',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← Terug',
  'action.back.aria': 'Terug naar het vorige scherm',
  'action.openDocs': 'Naar de documentatie',
  'action.exportCsv': 'CSV exporteren',
  'action.delete': 'Verwijderen',
  'action.closeNotification': 'Melding sluiten',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref — „Veilig / Matig / Schadelijk”, a nie
     wspólne „Binnen bereik / Let op / Kritiek”. Wersja plakatowa
     (zone.badge.*) jest osobnym kluczem, a nie zapisem wielkimi literami przez
     CSS: tureckie „i” i greckie akcenty nie znoszą automatycznej zamiany. */

  'zone.good': 'Veilig',
  'zone.warning': 'Matig',
  'zone.critical': 'Schadelijk',
  'zone.none': 'Geen gegevens',

  'zone.badge.good': 'VEILIG',
  'zone.badge.warning': 'MATIG',
  'zone.badge.critical': 'SCHADELIJK',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'Helderheid kanaal B',
  'metric.raw.unitLabel': '% helderheid kanaal B',
  'metric.share.name': 'Blauwaandeel',
  'metric.share.longName': 'Blauwaandeel van het licht',
  'metric.share.unitLabel': '% blauwaandeel',
  'stat.overallBrightness': 'Algehele scènehelderheid',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': 'Voorbeeld van de camera',
  'camera.pressStart': 'Druk op “Start”.',
  'camera.start': 'Start',
  'camera.stop': 'Stop',
  'camera.switch': 'Van camera wisselen',
  'camera.error': 'De camera kon niet worden gestart. Controleer de cameratoestemming van de browser en probeer het opnieuw. ({message})',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': 'Huidige meetwaarden',
  'disclaimer.short': 'Een indicatief resultaat. Dit is geen medisch hulpmiddel.',
  'disclaimer.more': 'Meer',

  /* ---- wykresy ---- */

  'chart.aria': 'Grafieken in de tijd',
  'chart.title': 'Grafieken in de tijd (laatste {seconds} s)',
  'chart.empty': 'Start de camera om de grafiek te zien',
  'chart.axis.past': '-{seconds}s',
  'chart.axis.now': 'nu',
  'chart.raw.aria': 'Grafiek van de helderheid van kanaal B in de tijd, met de veilige, de matige en de schadelijke zone aangegeven',
  'chart.share.aria': 'Grafiek van het blauwaandeel van het licht in de tijd, met de veilige, de matige en de schadelijke zone aangegeven',

  /* ---- tabela odczytów ---- */

  'table.show': 'Als tabel tonen',
  'table.hide': 'Tabel verbergen',
  'table.caption': 'Laatste meetwaarden (nieuwste bovenaan)',
  'table.col.time': 'Tijd',
  'table.col.zone': 'Zone',

  /* ---- ustawienia progów ---- */

  'settings.title': 'Instellingen van de zonedrempels',
  'settings.boundary.critical': 'Grens geel / rood:',
  'settings.boundary.warning': 'Grens groen / geel:',

  /* ---- historia i raport (features.js) ---- */

  'history.title': 'Geschiedenis en rapport',
  'history.rangeAria': 'Bereik van de geschiedenis',
  'history.unavailable': 'De gegevens van de geschiedenis zijn tijdelijk niet beschikbaar.',
  'history.empty': 'Geen meetwaarden opgeslagen in dit bereik. Start een meting — de geschiedenis vult zich vanzelf.',
  'history.savedReadings': 'Opgeslagen meetwaarden: {count}. Verdeling van de tijd over de zones:',
  'history.zoneLine': '{zone}: {percent}% ({readings})',

  'range.1h': '1 u',
  'range.24h': '24 u',
  'range.7d': '7 dagen',
  'range.30d': '30 dagen',

  'report.dailyTitle': 'Dagrapport',
  'report.empty': 'Het rapport verschijnt zodra er in het gekozen bereik meetwaarden zijn opgeslagen.',
  'report.dailyCaption': 'Aandeel van de tijd per zone, dag na dag',
  'report.col.day': 'Dag',
  'report.col.week': 'Week',
  'report.col.readings': 'Meetwaarden',
  'report.compare.day': 'Vergelijking van dag tot dag: {day} — {percent}% van de tijd in de schadelijke zone, {change}',
  'report.compare.dayPending': 'De vergelijking van dag tot dag verschijnt na een tweede dag meten.',
  'report.compare.week': 'Vergelijking van week tot week: {week} — {percent}% van de tijd in de schadelijke zone, {change}',
  'report.compare.weekPending': 'De vergelijking van week tot week verschijnt na een tweede week meten.',
  'report.change.same': 'evenveel als {other}.',
  'report.change.more': '{points} meer dan {other}.',
  'report.change.less': '{points} minder dan {other}.',
  'report.peak': 'De meeste meetwaarden in de schadelijke zone vielen tussen {from} en {to}.',
  'report.peak.none': 'In dit bereik zijn geen meetwaarden in de schadelijke zone opgeslagen.',
  'report.weeklyTitle': 'Weekrapport',
  'report.weeklyEmpty': 'Het weekrapport verschijnt zodra er in het gekozen bereik meetwaarden zijn opgeslagen.',
  'report.weeklyCaption': 'Aandeel van de tijd per zone, week na week',
  'report.weekLabel': 'Week {week} ({year})',
  'report.footnote': 'De getallen zijn het aandeel van de opgeslagen meetwaarden in het gekozen bereik, niet de precieze blootstellingstijd.',

  /* ---- profile progów ---- */

  'profiles.title': 'Drempelprofielen',
  'profiles.empty': 'U hebt nog geen profielen opgeslagen.',
  'profiles.itemActive': '{name} (actief)',
  'profiles.applyAria': 'Profiel {name} toepassen',
  'profiles.deleteAria': 'Profiel {name} verwijderen',
  'profiles.applied': 'Profiel “{name}” toegepast.',
  'profiles.deleted': 'Profiel “{name}” verwijderd.',
  'profiles.saved': 'Profiel “{name}” opgeslagen.',
  'profiles.namePlaceholder': 'Naam van het profiel (bijvoorbeeld Avond)',
  'profiles.saveLabel': 'De huidige drempels als profiel opslaan',
  'profiles.saveBtn': 'Profiel opslaan',
  'profiles.needName': 'Geef een naam voor het profiel op.',
  'profiles.limit': {
    one: 'U kunt hoogstens {n} profiel opslaan. Verwijder er een om een nieuw profiel toe te voegen.',
    other: 'U kunt hoogstens {n} profielen opslaan. Verwijder er een om een nieuw profiel toe te voegen.'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku też — ale musi
     zostać bezpieczna dla systemu plików: bez ukośników i dwukropków. Nagłówek
     kolumn zostaje w ASCII (stąd „scenehelderheid” bez akcentu). */

  'csv.header': 'tijd;helderheid_B_pct;blauwaandeel_pct;scenehelderheid_pct;zone',
  'csv.filename': 'lichtmonitoring-{stamp}.csv',
  'csv.empty': 'Er zijn geen meetwaarden om te exporteren. Start een meting en probeer het opnieuw.',
  'csv.done': '{readings} naar een CSV-bestand geëxporteerd.',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut. Niderlandzki ma tu tylko dwie formy
     („1 minuut”, „5 minuten”), ale zdanie i tak stoi w całości: w części
     z trzydziestu języków przypadek albo szyk wypadają inaczej. */

  'alert.exposure': {
    one: 'Drempelalarm: de meetwaarde staat al {n} minuut in de schadelijke zone. Overweeg een pauze of verlaag het blauwaandeel op het scherm.',
    other: 'Drempelalarm: de meetwaarde staat al {n} minuten in de schadelijke zone. Overweeg een pauze of verlaag het blauwaandeel op het scherm.'
  },

  'session.title': 'Samenvatting van de laatste sessie',
  'session.line': 'Meettijd: {duration}. Opgeslagen meetwaarden: {count}.',
  'session.zoneLine': '{zone}: {percent}% van de sessie.',
  'session.endedAt': 'De samenvatting gaat over de sessie die om {time} is geëindigd.',
  'session.toast': 'Sessie beëindigd: {duration}, {readings}, {percent}% van de tijd in de schadelijke zone.',

  'duration.seconds': '{n} s',
  'duration.minutesSeconds': '{minutes} min {seconds} s',

  /* ---- liczebniki ----
     Niderlandzki ma dwie kategorie CLDR: one (dokładnie 1) i other — ta druga
     obejmuje też 0 i ułamki („1,5 meetwaarden”). Formę wybiera
     Intl.PluralRules('nl'), nie nasza reguła. */

  'count.readings': { one: '{n} meetwaarde', other: '{n} meetwaarden' },
  'count.points': {
    one: '{n} procentpunt',
    other: '{n} procentpunten'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': 'Meer',
  'more.section.settings': 'INSTELLINGEN',
  'more.section.help': 'HULP',
  'more.thresholds.title': 'Waarschuwingsdrempels',
  'more.thresholds.sub': 'Stel de grenzen van de veilige, de matige en de schadelijke zone in.',
  'more.docs.title': 'Documentatie',
  'more.docs.sub': 'Hoe de meting werkt, eenheden, normen en zones.',
  'more.about.title': 'Over de app en contact',
  'more.about.sub': 'Versie, privacy en contact.',
  'more.free': 'De app is volledig gratis.',
  'more.supportLink': 'U kunt hem vrijwillig steunen.',
  'more.version': 'Versie {version} · Alle functies beschikbaar zonder account en zonder kosten',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': 'Over de app en contact',
  'about.version': 'Versie {version}',
  'about.what.title': 'Wat deze app is',
  'about.what.p1': '{app} meet met de camera van de telefoon hoeveel blauw licht de sensor registreert, en toont dat op twee wijzerplaten en op grafieken met zones. Alle functies — de meting, de geschiedenis, de rapporten, de drempelprofielen, het drempelalarm, de CSV-export en de documentatie — zijn voor iedereen beschikbaar, zonder account en zonder kosten.',
  'about.what.p2': 'De app wordt “zoals hij is” aangeboden, voor informatief gebruik. Het resultaat van een meting is indicatief en vormt geen grondslag voor beslissingen over de gezondheid.',
  'about.privacy.title': 'Privacy en gegevens',
  'about.privacy.p1': 'Het camerabeeld wordt uitsluitend op uw apparaat geanalyseerd en wordt nooit naar een server gestuurd. Wij maken geen accounts aan en wij verzamelen uw gegevens niet. De drempelinstellingen, de profielen en de meetgeschiedenis worden alleen in het geheugen van dit apparaat en van deze browser opgeslagen.',
  'about.privacy.p2': 'De app toont geen advertenties en praat niet met het netwerk. De enige uitzondering is de knop op het scherm “Steun”: wanneer u erop drukt, opent de browser een externe pagina in een nieuw tabblad. Er gebeurt niets totdat u dat zelf doet.',
  'about.contact.title': 'Contact',
  'about.contact.p1': 'Opmerkingen, fouten en suggesties: [E-MAIL]. Wij antwoorden zodra het kan — dit project wordt na werktijd onderhouden.',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': 'Steun',
  'support.free.title': 'Alles is beschikbaar',
  'support.free.text': 'De hele app is gratis: de meting, de geschiedenis en de rapporten, de drempelprofielen, het alarm, de CSV-export en de documentatie. Alles werkt meteen, zonder account, zonder limieten en zonder internet.',
  'support.why': '{app} wordt na werktijd gebouwd. Als u er iets aan hebt, kunt u mij op een koffie trakteren. Dat helpt de app in de lucht te houden en verder te brengen — de meting verbeteren, de documentatie aanvullen en haar op steeds meer telefoons controleren.',
  'support.nothing': 'Een donatie ontgrendelt niets. Er is geen betere en geen slechtere versie — na uw steun werkt de app precies hetzelfde. Het enige verschil is dat de auteur weet dat iemand er iets aan had.',
  'support.button': 'Trakteer me op een koffie',
  'support.button.aria': 'Trakteer me op een koffie — opent het donatieprofiel in een nieuw tabblad',
  'support.pending': 'Het donatieprofiel is nog niet aangesloten. Zodra het er is, staat op deze plek een knop. Tot die tijd hoeft u niets te doen — de app is toch al volledig gratis.',
  'support.privacy': 'De knop opent een externe pagina (bijvoorbeeld Buy Me a Coffee) in een nieuw tabblad van de browser. Dat is het enige moment waarop er iets dit apparaat verlaat. Het camerabeeld en al uw metingen blijven hier — ze worden nergens naartoe gestuurd, niet voor het drukken en niet erna.',
  'support.privacyPending': 'Zodra het adres er is, opent een druk op de knop een externe pagina (bijvoorbeeld Buy Me a Coffee) in een nieuw tabblad van de browser. Dat zal het enige moment zijn waarop er iets dit apparaat verlaat. Het camerabeeld en al uw metingen blijven hier — ze worden nergens naartoe gestuurd.',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': 'Documentatie',

  'disclaimer.title': 'Dit is geen medisch hulpmiddel',
  'disclaimer.body.docs': 'Deze app is geen medisch hulpmiddel. Zij is niet bestemd voor het diagnosticeren, behandelen of voorkomen van welke ziekte dan ook. Resultaten van een meting met een telefooncamera zijn indicatief en vervangen geen onderzoek of het advies van een arts. Raadpleeg in zaken van de gezondheid van de ogen een arts of een optometrist. De zonedrempels in deze app geven geen enkele veiligheidsnorm weer — de details staan in hoofdstuk 3.',
  'disclaimer.body.about': 'Deze app is geen medisch hulpmiddel. Zij is niet bestemd voor het diagnosticeren, behandelen of voorkomen van welke ziekte dan ook. Resultaten van een meting met een telefooncamera zijn indicatief en vervangen geen onderzoek of het advies van een arts. Raadpleeg in zaken van de gezondheid van de ogen een arts of een optometrist. De zonedrempels in deze app geven geen enkele veiligheidsnorm weer — de details staan in de documentatie, hoofdstuk 3.',

  'doc.toc.aria': 'Inhoud van de documentatie',
  'doc.toc.title': 'Inhoud',

  'doc.ch1.title': 'Snelle start',
  'doc.ch2.title': 'Hoe de meting werkt',
  'doc.ch3.title': 'Eenheden en normen',
  'doc.ch4.title': 'Zones en drempels',
  'doc.ch5.title': 'Verschillen tussen apparaten',

  'doc.ch1.heading': '1. Snelle start',
  'doc.ch2.heading': '2. Hoe de meting werkt',
  'doc.ch3.heading': '3. Eenheden en normen',
  'doc.ch4.heading': '4. Zones en drempels',
  'doc.ch5.heading': '5. Verschillen tussen apparaten',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': 'Hoe u nauwkeuriger meet',
  'doc.ch1.tips.li1': 'Druk op het scherm “Camera” (de eerste knop op de onderste balk) op “Start” en richt de achtercamera op het scherm of op de lichtbron die u wilt controleren.',
  'doc.ch1.tips.li2': 'Ga naar het scherm “Monitoring” (de tweede knop op de onderste balk) — bovenaan ziet u beide wijzerplaten tegelijk, en daaronder (scroll omlaag) de grafieken van de verandering in de tijd. De meting loopt op de achtergrond door, welk scherm u ook bekijkt.',
  'doc.ch1.tips.li3': 'Houd de telefoon op een vaste afstand van het scherm (bijvoorbeeld 15–20 cm), zonder de omgevingsverlichting tijdens de meting te veranderen.',
  'doc.ch1.tips.li4': 'Gebruik de achtercamera — haar automatische correcties zijn minder agressief dan die van de frontcamera.',
  'doc.ch1.tips.li5': 'Behandel de resultaten als relatieve indicatoren (%), niet als absolute natuurkundige eenheden — vergelijk ze met elkaar (bijvoorbeeld de nachtmodus aan of uit).',
  'doc.ch1.tips.li6': 'Stem de zonedrempels in de instellingen af op de helderheid van uw eigen scherm (hoofdstuk 4).',

  'doc.ch1.fonts.title': 'Grote letters en wijzerplaten — altijd',
  'doc.ch1.fonts.p1': 'De hele app gebruikt grote, goed leesbare letters en wijzerplaten op volle grootte, zodat slechtziende mensen (en alle anderen) de gegevens zonder extra instellingen kunnen aflezen. Op het scherm “Monitoring” passen beide wijzerplaten samen op één scherm, zonder scrollen — de grafieken van de verandering in de tijd staan er direct onder, één scroll verder.',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': 'Een telefooncamera versus een spectrometer',
  'doc.ch2.spectro.p1.html': 'Werkelijk meten “hoeveel schadelijk blauw licht er is” vraagt erom het licht in golflengten uiteen te leggen — en dat doet een <b>spectrometer</b>: een prisma of een tralie splitst het licht in tientallen tot honderden smalle banden (bijvoorbeeld om de 1–5 nm) en meet het optische vermogen in elk daarvan afzonderlijk. Pas uit zo’n volledige spectrale verdeling worden eenheden als lux, lumen of met de blauwlichtgevaarfunctie gewogen bestralingssterkte berekend.',
  'doc.ch2.spectro.p2.html': '<b>Een telefooncamera doet daar niets van.</b> Hij heeft drie brede filters (Bayer: R/G/B), die elk licht opvangen uit een breed, overlappend bereik van golflengten — het “blauwe kanaal” is geen smalle band rond 435–440 nm (de piek van het gevaar voor het netvlies), maar ruwweg 400–570 nm vermengd met groen. Daar komen nog demozaïekbewerking, automatische belichting, automatische witbalans en sRGB-gammacompressie bij — geen van die stappen laat de browser volledig uitschakelen. Daardoor is de pixelwaarde die JavaScript ziet niet lineair verbonden met het werkelijke optische vermogen dat op de sensor valt. Dat is een fundamentele beperking van de hardware, geen fout van deze app.',

  'doc.ch2.raw.title': 'Grafiek 1 — Helderheid kanaal B',
  'doc.ch2.raw.what.html': '<b>Wat hij toont:</b> de gemiddelde helderheid van alleen het blauwe kanaal (B) over het bemonsterde deel van het beeld, op een schaal van 0–255 omgerekend naar %.',
  'doc.ch2.raw.algo.html': '<b>Het algoritme:</b>',
  'doc.ch2.raw.step1': 'Vijf keer per seconde halen we een frame van de camera.',
  'doc.ch2.raw.step2': 'We snijden de middelste 60% van het beeld uit (dat vermijdt de randen van het beeld en de gloed van opzij).',
  'doc.ch2.raw.step3': 'We schalen het uitgesneden deel naar een raster van 32×32 pixels (nauwkeurig genoeg en veel sneller dan rekenen op de volle resolutie — belangrijk op zwakkere hardware zoals goedkope Xiaomi- of Ulefone-toestellen).',
  'doc.ch2.raw.step4': 'We middelen de B-waarde van alle 1024 pixels van dat raster.',
  'doc.ch2.raw.step5.html': '<code>resultaat = gemiddelde_B ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>Waarom we hem hebben gehouden:</b> het is de eenvoudigste, meest directe aflezing van “hoeveel blauw signaal de sensor überhaupt registreert”. Het nadeel is dat hij helderheid met kleur vermengt — een heel heldere, maar neutraal witte scène geeft ook een hoge waarde, ook al is die niet bijzonder “blauw”. Daarom tonen we er grafiek 2 naast.',

  'doc.ch2.share.title': 'Grafiek 2 — Blauwaandeel van het licht',
  'doc.ch2.share.what.html': '<b>Wat hij toont:</b> welk percentage van al het geregistreerde licht (R+G+B) de blauwe component uitmaakt — dus de verschuiving van de kleur naar koel, onafhankelijk van hoe helder de scène is.',
  'doc.ch2.share.algo.html': '<b>Het algoritme:</b> dezelfde stappen 1–4 als hierboven, maar in plaats van B alleen rekenen we:',
  'doc.ch2.share.formula.html': '<code>resultaat = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': 'Neutraal wit (R≈G≈B) geeft ongeveer <b>33%</b>. Warmer, roder licht geeft minder. Sterk blauw licht meer, tot een grens van ~100% voor bijna zuiver blauw licht.',
  'doc.ch2.share.why.html': '<b>Waarom dit de nauwkeurigere maat voor “schadelijk blauw” is:</b> het is hetzelfde beginsel waarop filters als de nachtmodus of Night Shift werken — wat telt is de <b>kleur</b>, niet de helderheid. Een heel helder maar neutraal scherm wordt niet ten onrechte als schadelijk aangemerkt; een gedimd maar sterk blauw scherm wel. Daarom is dit de grootheid die de kleur van de zone in de tabel met meetwaarden stuurt.',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': 'Waarom geen lux en geen lumen',
  'doc.ch3.units.p1.html': 'Een <b>lumen (lm)</b> beschrijft de totale lichtstroom die een bron uitzendt — een eigenschap van de bron zelf, niet van wat er op een bepaald punt aankomt. Een <b>lux (lx)</b> is al de verlichtingssterkte in een punt (lm/m²) — dichter bij waar het om gaat, maar nog altijd een <b>fotometrische</b> eenheid: hij weegt het spectrum met de gevoeligheidskromme van het menselijk oog voor helderheid (V(λ)), niet met de kromme van het blauwlichtgevaar. Voor een echte meting van het gevaar is een derde, smallere eenheid nodig: spectraal gewogen bestralingssterkte in <b>W/m²</b> (norm IEC 62471, gevoeligheidspiek rond 435–440 nm), en dat vraagt om een spectrometer — zie het gedeelte hierboven.',
  'doc.ch3.units.p2.html': 'Zelfs als we het bij lux zouden houden: een telefoon zonder externe, gekalibreerde lichtsensor kan die niet betrouwbaar bepalen. De ingebouwde lichtsensor van de telefoon (waar die er is) meet trouwens het licht aan de <b>tegenovergestelde kant</b> van de behuizing dan de kant die u met de achtercamera op het scherm richt — hij zou dus het licht achter uw rug meten, niet dat van het scherm. Daarom raden we geen getal in een eenheid die toch niet betrouwbaar zou zijn, maar tonen we een eerlijk benoemde <b>relatieve indicator (%)</b> — zinvol om te vergelijken op dezelfde telefoon onder dezelfde omstandigheden (bijvoorbeeld de nachtmodus aan of uit), niet als absolute waarde.',

  'doc.ch3.norms.title': 'Bestaan er wereldwijde normen voor veiligheidsdrempels?',
  'doc.ch3.norms.p1.html': 'Kort gezegd: <b>er is geen norm die in procenten van een camerakanaal is uitgedrukt</b> — dat is überhaupt geen eenheid waarin iets wordt gereguleerd. Echte normen voor blauw licht bestaan wel, maar ze meten andere grootheden, in andere eenheden, en ze gaan over een ander verschijnsel dan wat we gewoonlijk bedoelen met “blauw licht vermoeit de ogen”.',
  'doc.ch3.norms.p2.html': '<b>Acute fotochemische beschadiging van het netvlies — IEC 62471 / ICNIRP.</b> Het enige werkelijk gereguleerde “gevaar van blauw licht” — een norm voor lampen en verlichtingssystemen, ondersteund door de richtlijnen van de ICNIRP (International Commission on Non-Ionizing Radiation Protection). Zij deelt bronnen in de risicogroepen RG0–RG3 in op grond van de met de gevaarfunctie B(λ) gewogen radiantie, in <b>W·m⁻²·sr⁻¹</b>, met een grens aan de blootstellingsduur (<code>t_max = 100 / L_B</code> seconden). Schermen van telefoons en monitoren — zelfs op de hoogste helderheid — vallen in de praktijk altijd in <b>RG0 (vrijgesteld, zonder beperkingen)</b>. Die norm gaat over veel intensievere bronnen (lasbogen, sommige projectoren, industriële leds), niet over consumentenschermen.',
  'doc.ch3.norms.p3.html': '<b>Invloed op het circadiane ritme en de slaap — CIE S 026.</b> Dit is het verschijnsel waar het gewoonlijk om gaat (een scherm ’s avonds “maakt wakker”) — maar dat is geen beschadiging van het oog, het is een invloed op de biologische klok via de ganglioncellen van het netvlies (ipRGC), die rond 480 nm het gevoeligst zijn. De norm CIE S 026:2018 definieert de eenheid <b>melanopische lux (melanopic EDI)</b>. Het dichtst bij een “officiële” wetenschappelijke consensus komt de publicatie van Brown en medeauteurs (<i>PLOS Biology</i>, 2022), die bij benadering aanbeveelt: ’s avonds &lt; 10 melanopische lux, overdag &gt; 250. Dat zijn aanbevelingen van slaaponderzoekers, geen wettelijk voorschrift.',
  'doc.ch3.norms.p4.html': '<b>De WHO.</b> De Wereldgezondheidsorganisatie publiceert geen eigen, onafhankelijke blootstellingslimieten voor blauw licht — voor de veiligheid van optische straling verwijst zij naar de ICNIRP (hierboven). Het enige concrete, eigen document van de WHO over schermen is <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i> (2019) — dat gaat echter over de <b>tijd</b> die aan een scherm wordt doorgebracht, niet over de kleur of de sterkte van het licht: geen scherm onder het eerste levensjaar, hoogstens 1 uur voor kinderen van 2–4 jaar. Voor volwassenen heeft de WHO geen even concrete richtlijnen met getallen.',
  'doc.ch3.norms.p5.html': '<b>Waarom dat de app toch niet helpt kalibreren:</b> beide normen (IEC/ICNIRP en CIE) vragen om een volledige spectrale verdeling en om gekalibreerde radiantie in een bekende meetgeometrie — precies wat een telefoon via de browser niet kan leveren (zie het gedeelte “Een telefooncamera versus een spectrometer” hierboven). Er bestaat geen omrekening “33% blauwaandeel = X melanopische lux”, dus de drempels in deze app <b>geven geen enkele veiligheidsnorm weer</b> (van de WHO, IEC, ICNIRP of CIE — voor deze indicator bestaat er eenvoudigweg geen). De standaardwaarden van de drempel voor het blauwaandeel zijn wel afgeleid van werkelijke kleurtemperaturen van licht en van de breed herhaalde, praktische aanbeveling van warm licht ’s avonds — een steviger grondslag dan een gewone afronding, maar nog altijd geen formele norm (de volledige afleiding staat in hoofdstuk 4). U kunt ze in de instellingen altijd in uw eigen waarden veranderen.',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': 'De kleurzones en waar de drempels vandaan komen',
  'doc.ch4.zones.p1.html': 'Beide grootheden hebben hun eigen, onafhankelijk in te stellen drempels (scherm “Monitoring” → “Instellingen van de zonedrempels”, onderaan de pagina) — 33%/66% bij de ene betekent niet hetzelfde als bij de andere (zie hoofdstuk 2 hierboven). Het is het <b>blauwaandeel</b> dat de kleur bepaalt in de legenda onder de grafieken en in de tabel met meetwaarden:',
  'doc.ch4.zones.li1.html': '<b>Groen — veilig:</b> warm of neutraal licht, de ogen rusten uit.',
  'doc.ch4.zones.li2.html': '<b>Geel — matig:</b> een merkbare verschuiving naar blauw, het is de moeite waard om pauzes te nemen.',
  'doc.ch4.zones.li3.html': '<b>Rood — schadelijk:</b> sterk blauw licht, duidelijk vermoeiend voor de ogen bij langere blootstelling (vooral ’s avonds).',
  'doc.ch4.zones.p2.html': '<b>Waar deze concrete getallen vandaan komen.</b> De <b>helderheid van kanaal B</b> heeft geen natuurlijk referentiepunt — een zinvolle drempelwaarde hangt volledig af van hoe helder de scène is die u filmt (het is een maat voor helderheid, niet voor kleur). De standaard 33%/66% is hier nog altijd een afgesproken vertrekpunt — stem die met vallen en opstaan af op de gebruikelijke helderheid van uw eigen scherm en omgeving.',
  'doc.ch4.zones.p3.html': 'Het <b>blauwaandeel</b> heeft standaarddrempels die zijn afgeleid van werkelijke kleurtemperaturen van licht (natuurkunde, geen afronding), niet van een veiligheidsnorm — zo’n norm bestaat voor deze grootheid niet (hoofdstuk 3). De referentiepunten:',
  'doc.ch4.zones.li4.html': '<b>~4000K</b> (“warm wit”, een gebruikelijke ledlamp) → ongeveer <b>26%</b> blauwaandeel. Licht dat warmer is dan dat (een lagere kleurtemperatuur) is het bereik dat ’s avonds breed wordt aanbevolen door hulpmiddelen als f.lux of Night Shift — vandaar de ondergrens.',
  'doc.ch4.zones.li5.html': '<b>6500K (D65)</b>, het standaard witpunt van de meeste telefoon- en monitorschermen af fabriek — ongeveer <b>33%</b>. Vanaf die waarde omhoog begint het bereik waarin gewoonlijk aanbevelingen gelden om blauw licht te beperken — vandaar de bovengrens.',
  'doc.ch4.zones.p4.html': '<b>Een belangrijk voorbehoud:</b> hoe “blauw” licht is, hangt niet af van het tijdstip van de dag, maar de aanbevelingen om blauw licht te beperken gelden eigenlijk alleen voor de <b>avond en de nacht</b> — overdag is blootstelling aan koel, blauw licht (ook zonlicht) normaal en zelfs gunstig voor het circadiane ritme. Een rode zone midden op de dag bij het kijken naar een gewoon, onveranderd scherm betekent geen werkelijk gevaar — hetzelfde licht is ’s avonds wel de moeite waard om te beperken.',
  'doc.ch4.zones.p5.html': 'De drempels van beide grootheden zijn volledig onafhankelijk — de ene veranderen heeft geen invloed op de andere. Veranderde drempels worden <b>op dit apparaat en in deze browser onthouden</b> tussen het openen van de app door (lokaal, er wordt niets ergens naartoe gestuurd) — de knop “Start” zet ze niet terug op de standaardwaarden.',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': 'Waarom het voorbeeld er op verschillende apparaten anders uitziet',
  'doc.ch5.devices.p1.html': '<b>De browser versus de camera-app van de telefoon.</b> Wanneer u de camera opent die op de telefoon is voorgeïnstalleerd, voegt de fabrikant (bijvoorbeeld Xiaomi) aan het live voorbeeld eigen, gesloten algoritmen toe — HDR in real time, digitale versterking van de helderheid bij weinig licht, verzachting. Een webpagina krijgt via de browser een veel “ruwere” stroom van de camera (de functie <code>getUserMedia</code>), zonder een van die verbeteringen — dus zal die er in de regel vlakker en donkerder uitzien dan de camera-app van de telefoon, ongeacht het toestel.',
  'doc.ch5.devices.p2.html': '<b>Verschillende mogelijkheden om de camera te sturen.</b> Hoeveel controle over de belichting en de witbalans de browser überhaupt van het systeem krijgt, hangt af van de concrete telefoon, van het camerastuurprogramma en van de versie van Chrome of WebView — sommige apparaten (meestal computers met een usb-camera) melden alleen volledige automatiek, andere (een deel van de Android-telefoons) melden extra, meer geavanceerde standen. Een eerdere versie van deze app probeerde over te schakelen op handmatige belichting waar de telefoon dat toestond, zonder een concrete waarde in te stellen — wat op een deel van de telefoons het beeld bevroor op een willekeurige, donkere belichting van het moment waarop de camera startte. Dat was een fout in de code (inmiddels hersteld), geen verschil in eenheden — maar het laat goed zien hoe gemakkelijk het gedrag tussen apparaten kan verschillen, als zelfs dezelfde regel code maar op een deel ervan aanslaat.',
  'doc.ch5.devices.p3.html': '<b>Verschillende sensoren en beeldverwerking (ISP).</b> Zelfs bij identieke code en dezelfde scène hebben verschillende telefoonmodellen sensoren van verschillende kwaliteit en een verschillend afgestelde automatiek van de fabrikant — de ene kiest bij weinig licht sneller en trefzekerder een belichting dan de andere. In combinatie met het feit dat de indicatoren in deze app <b>relatief</b> zijn (zie hoofdstuk 3), betekent dat: vergelijk de resultaten (en het uiterlijk van het voorbeeld) zinvol op dezelfde telefoon in de tijd, niet tussen verschillende modellen of apparaten.'
});
