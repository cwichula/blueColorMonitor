/* Monitor Światła v5 — słownik szwedzki.
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr). NIE JEST
 * KALKĄ żadnego z nich: polskie i angielskie zdania przełożono na naturalną
 * szwedczyznę. Zachowane zostało to, co niesie znaczenie: liczby, progi,
 * jednostki, nazwy wstawek i — co do treści — zastrzeżenia medyczne oraz
 * zdania o prywatności. Tych ostatnich nie wolno osłabiać ani wzmacniać:
 * „nie zastępuje rozmowy z lekarzem” i „obraz nie opuszcza urządzenia”
 * znaczą po szwedzku dokładnie tyle samo, ani mniej, ani więcej.
 *
 * REJESTR: bezpośrednie „du” — konsekwentnie w całym pliku, także
 * w komunikatach błędów. Tak mówią szwedzkie aplikacje użytkowe i tak mówią
 * szwedzkie urzędy od czasu du-reformen; forma grzecznościowa brzmiałaby tu
 * jak pismo z ubiegłego wieku. Cudzysłowy szwedzkie: ” … ” (ten sam znak
 * z obu stron). Przecinek dziesiętny, jak po polsku (1,00). Przed znakiem %
 * stoi spacja nierozdzielająca, zapisana jako escape, tak samo jak między
 * liczbą a jednostką czasu. Zegar dwudziestoczterogodzinny, data w kolejności
 * dzień-miesiąc.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych i pomocy):
 *   blåandel, scenens ljusstyrka, färgtemperatur, dygnsrytmpåverkan
 *   (w opisie: melanopisk kvot), flimmer, jämnhet, synkomfort.
 * STREFY: säkert / måttligt / skadligt — formy nijakie, więc wchodzą zarówno
 * w zdanie „zon: {zone}”, jak i w „i snitt {zone}”, tak samo jak polskie
 * „bezpiecznie / umiarkowanie / szkodliwie”. Mówią o świetle, a nie o stanie
 * aplikacji.
 * POZOSTAŁE STAŁE ODPOWIEDNIKI: historik (historia), session (sesja),
 * sampel (próbka), mätning (pomiar), storhet (wielkość), tröskel (próg),
 * avläsning (odczyt), vy (ekran aplikacji) wobec skärm (ekran urządzenia).
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Text med en {name}-insättning'   — napis zwykły,
 *   'klucz.kropkowany': { one, other }                    — forma zależna od
 *                                                           liczby.
 * Szwedzki ma w CLDR dwie formy: `one` i `other`. Nazwy wstawek są identyczne
 * jak w pl.js — pilnuje tego keys.test.js. Kolejność wstawek w zdaniu wolno
 * zmieniać (i tak robimy w datach), nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Ljusmonitor',
  'app.description': 'Ljusmonitor — kameran mäter sju storheter hos ljuset omkring dig. Allt räknas ut på den här enheten; ingenting går ut på nätet.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Ljusmonitor',
  'app.skipToContent': 'Hoppa till innehållet',
  'app.nav.aria': 'Huvudnavigering',
  'app.noscript.title': 'Appen behöver JavaScript',
  'app.noscript.text': 'Hela mätningen sker i den här webbläsarfliken: det är JavaScript som läser bildrutorna från kameran och räknar ut de sju ljusstorheterna ur dem. Utan det finns ingenting att mäta med. Aktivera JavaScript för den här sidan och öppna den igen — fortfarande skickas ingenting ut på nätet.',

  'nav.measure': 'Mätning',
  'nav.history': 'Historik',
  'nav.tools': 'Verktyg',
  'nav.support': 'Stöd',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Mäter',
  'shell.live.aria': 'Mäter. {metric}: {value}. Tillbaka till mätvyn.',
  'shell.live.metricFallback': 'Ledande storhet',
  'shell.action.fallback': 'Åtgärd i vyn',

  'shell.loadFail.title': 'Vyn ”{screen}” kunde inte läsas in',
  'shell.loadFail.text': 'Troligen saknas några av filerna i enhetens lagring. Anslut till nätet och läs om sidan.',
  'shell.fatal.title': 'Något gick fel',
  'shell.fatal.text': 'Appen kunde inte bygga upp vyn. Att läsa om sidan brukar räcka — dina sparade mätningar och inställningar ligger kvar.',
  'shell.fatal.reload': 'Läs om sidan',
  'shell.boot.failTitle': 'Appen kunde inte starta',
  'shell.boot.failText': 'Skalet startade inte. Läs om sidan — dina sparade mätningar och inställningar ligger kvar.',
  'shell.background.error': 'Något gick sönder i bakgrunden',
  'shell.background.action': 'Läs om',
  'shell.update.title': 'En ny version finns',
  'shell.update.action': 'Läs om',

  'onboarding.title': 'Innan du börjar',
  'onboarding.lead': 'Ljusmonitor tittar med kameran på ljuset omkring dig och räknar ut sju storheter ur det — från blåandel till synkomfort.',
  'onboarding.privacy': 'Bilden lämnar aldrig den här enheten: det finns ingen server, inget konto och ingenting att ladda upp. Alla sju storheter fungerar direkt, utan inloggning och utan avgift.',
  'onboarding.honesty': 'Det här är en vägledning, inte ett mätinstrument och inte en medicinsk undersökning. Det som inte går att mäta visar vi inte — i stället för en siffra ser du ett streck.',
  'onboarding.start': 'Sätt i gång',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Utför',
  'overlay.toast.close': 'Stäng meddelandet',
  'overlay.sheet.label': 'Dialogruta',
  'overlay.sheet.close': 'Stäng',
  'overlay.dialog.confirm': 'Bekräfta',
  'overlay.dialog.cancel': 'Avbryt',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'Avbryt',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'Mätning',

  'measure.intro.aria': 'Starta en mätning',
  'measure.intro.headline': 'Se vad du lyses upp av',
  'measure.intro.lead': 'Kameran visar hur mycket blått det finns i ljuset som faller på dig just nu — och om det är för mycket så här dags.',
  'measure.intro.start': 'Starta mätning',
  'measure.intro.hint': 'Webbläsaren ber om tillstånd att använda kameran. Mätningen börjar så snart du ger det.',
  'measure.intro.privacy': 'Kamerabilden behandlas på den här enheten och lämnar den aldrig. Vi skickar, sparar och delar inte en enda bildruta.',
  'measure.intro.honesty': 'Det här är ingen medicinteknisk produkt och ingen undersökning. Appen visar en uppskattning av ljuset omkring dig; den bedömer inte din hälsa och ersätter inte ett samtal med läkare.',

  'measure.live.aria': 'Mätning pågår',
  'measure.badge.starting': 'Startar',
  'measure.badge.paused': 'Pausad',
  'measure.badge.running': 'Mäter',
  'measure.stale': 'Väntar på bilden — förhandsvisningen fryser när appen ligger i bakgrunden.',
  'measure.crop': 'Vi mäter mitten av bildrutan — de markerade {percent}\u00A0% av bildens bredd och höjd.',
  'measure.facing.front': 'främre kameran',
  'measure.facing.back': 'bakre kameran',

  'measure.boot.title': 'Startar kameran…',
  'measure.boot.text': 'Om webbläsaren ber om tillstånd, ge det — utan bild finns ingenting att mäta. Tillståndet gäller bara den här sidan och du kan ta tillbaka det senare.',
  'measure.boot.cancel': 'Avbryt',

  'measure.hold': 'Avläsningarna är frysta. Kameran fortsätter att gå, men ingenting når historiken eller medelvärdena.',
  'measure.gridHint': 'Välj en ruta för att flytta den storheten till den stora mätaren.',

  'measure.stop': 'Stoppa',
  'measure.pause': 'Pausa',
  'measure.resume': 'Återuppta',
  'measure.flip.aria': 'Byt kamera',
  'measure.flip.toBack': 'Byt till bakre kameran',
  'measure.flip.toFront': 'Byt till främre kameran',

  'measure.fail.aria': 'Kamerafel',
  'measure.fail.headline': 'Kameran startade inte',
  'measure.fail.retry': 'Försök igen',
  'measure.fail.back': 'Tillbaka',
  'measure.fail.savedSession': 'Sessionen före avbrottet ({duration}) sparades i historiken.',
  'measure.error.fallback': 'Kameran kunde inte startas.',

  'measure.summary.aria': 'Sammanfattning av sessionen',
  'measure.summary.title': 'Sammanfattning av sessionen',
  'measure.summary.paused': 'pausad {duration}',
  'measure.summary.nothingMeasured': 'Ingen storhet fick något värde — kameran såg inget ljus under hela sessionen.',
  'measure.summary.note': 'Medelvärdena räknar bara sampel som togs utanför pausen. Storheter som aldrig mättes lämnas utanför, de räknas inte som noll.',
  'measure.summary.nearThreshold': 'Närmast en tröskel',
  'measure.summary.worstPoint': 'Svagaste punkten',
  'measure.summary.averageZone': 'i snitt {zone}',
  'measure.summary.tooShort': 'Sessionen varade {duration} — för kort för att hamna i historiken av sig själv. Du kan spara den för hand.',
  'measure.summary.again': 'Mät igen',
  'measure.summary.save': 'Spara i historiken',
  'measure.summary.saved': 'Sparad i historiken',
  'measure.summary.savedToast': 'Sessionen sparades i historiken.',
  'measure.summary.close': 'Stäng',

  'measure.method.title': 'Så här mäter vi',
  'measure.method.p1': 'Appen tar prov på kamerabilden tio gånger i sekunden och räknar ut storheterna ur de mellersta {percent}\u00A0% av bildrutan — siktet i förhandsvisningen markerar exakt det området.',
  'measure.method.p2': 'En mobilkamera har tre breda kanaler och dessutom egen automatisk exponering och vitbalans. Den ser ljusets proportioner, inte dess spektrum.',
  'measure.method.p3': 'Blåandel, ljusstyrka, flimmer och jämnhet är det som kameran verkligen mäter. Färgtemperatur och dygnsrytmpåverkan är öppet redovisade uppskattningar, uträknade ur sRGB-primärfärgerna.',
  'measure.method.p4': 'Flimmer syns bara under fyra hertz. Elnätets flimmer på 100 Hz ligger långt bortom vad den här samplingen når och kommer aldrig att redovisas som en avläsning.',
  'measure.method.p5': 'Ingen av de här siffrorna är en fotometrisk mätning eller ett medicinskt resultat. Kamerabilden lämnar inte enheten.',
  'measure.method.ok': 'Jag förstår',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'Kamerastarten avbröts.',
  'measure.announce.stoppedNoSamples': 'Mätningen stoppad. Inga sampel samlades in.',
  'measure.announce.stopped': 'Mätningen stoppad. Sammanfattningen av sessionen är klar.',
  'measure.announce.interrupted': 'Mätningen avbröts. Sammanfattningen av sessionen är klar.',
  'measure.announce.paused': 'Mätningen pausad. Avläsningarna är frysta.',
  'measure.announce.resumed': 'Mätningen återupptagen.',
  'measure.announce.switchedFront': 'Bytte till främre kameran. En ny session börjar.',
  'measure.announce.switchedBack': 'Bytte till bakre kameran. En ny session börjar.',
  'measure.announce.lead': 'Ledande storhet: {metric}.',
  'measure.announce.cameraError': 'Kamerafel. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'Ljuset höll sig i det säkra intervallet hela sessionen — låt lampan stå som den står och mät igen efter mörkrets inbrott, när en annan källa är i gång.',
  'measure.advice.share.evening': 'Blåandelen låg i snitt på {value} — slå på nattläge på skärmarna och släck taklampan, och låt en varm lampa i bordshöjd vara kvar.',
  'measure.advice.share.day': 'Blåandelen låg i snitt på {value} — på dagen går det an, men ställ in skärmen så att den går över till varmt läge automatiskt två timmar före läggdags.',
  'measure.advice.brightness': 'Bildrutan var överexponerad (i snitt {value}) — flytta dig bort från ljuskällan eller sänk ljusstyrkan på skärmen du mäter, för vid den exponeringen tappar även de andra storheterna i noggrannhet.',
  'measure.advice.kelvin.evening': 'Färgtemperaturen höll sig i snitt på {value} — gå under 3000 K efter mörkrets inbrott: ställ lampan i varmt läge eller skruva i en lampa på 2700 K.',
  'measure.advice.kelvin.day': 'Färgtemperaturen höll sig i snitt på {value} — ett bra, uppiggande vitt för dagtid, men ställ om samma lampa till 2700 K på kvällen.',
  'measure.advice.melanopic.evening': 'Dygnsrytmpåverkan låg i snitt på {value} — gå under 0,50 × de sista två timmarna före läggdags, genom att dämpa huvudljuset och lysa från bordshöjd i stället för från taket.',
  'measure.advice.melanopic.day': 'Dygnsrytmpåverkan låg i snitt på {value} — så här dags gör den dosen nytta, men byt den här källan mot en svagare och varmare på kvällen.',
  'measure.advice.flicker': 'Flimret nådde i snitt {value} — oftast är det en dimmer eller en nedskruvad bakgrundsbelysning: höj skärmens ljusstyrka över 40\u00A0% eller byt dimmern mot en som inte använder PWM.',
  'measure.advice.uniformity': 'Ljuset föll ojämnt (i snitt {value}) — ställ lampan vid sidan av bordet och lägg till en andra, svagare källa från motsatt håll, i stället för en enda stark punkt.',
  'measure.advice.comfort': 'Synkomforten hamnade i snitt på {value} — börja med en enda ändring: halvera ljusstyrkan på huvudkällan, och ta itu med ljusets färg först därefter.',
  'measure.advice.default': 'Ändra en sak i belysningen och mät den igen — att jämföra två sessioner säger mer än en enstaka avläsning.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'Historik',
  'history.action.export': 'Exportera historiken',

  'history.metricGroup.aria': 'Val av storhet',
  'history.announce.metric': 'Storhet: {metric}',
  'history.rangeGroup.aria': 'Tidsintervall',
  'history.range.aria': 'Senaste {range}',

  'history.stats.title': 'Statistik för intervallet',
  'history.stats.head': '{metric}\u00A0—\u00A0senaste {range}',
  'history.stats.note': 'Uträknad ur det som diagrammet visar. Tid utan mätning räknas inte in — vi sätter ingen nolla i dess ställe.',
  'history.stat.min': 'Minimum',
  'history.stat.avg': 'Medelvärde',
  'history.stat.max': 'Maximum',
  'history.trend.up': 'stiger över intervallet',
  'history.trend.flat': 'ingen tydlig förändring',
  'history.trend.down': 'sjunker över intervallet',
  'history.trend.none': 'inget att jämföra med',

  'history.sessions.title': 'Mätsessioner',
  'history.sessions.count': '{sessions}, nyaste först',
  'history.sessions.empty': 'Inga sessioner än',
  'history.sessions.hint': 'En session sparas när du stoppar mätningen.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'intervall: {range}',
  'history.session.noMeasure': 'inget mätt',

  'history.data.title': 'Data',
  'history.data.subtitle': 'Historiken lagras bara på den här enheten.',
  'history.export.csv': 'Exportera CSV',
  'history.export.json': 'Exportera JSON',
  'history.export.ok': 'Filen är klar att sparas',
  'history.export.fail': 'Filen kunde inte förberedas. I privat läge, och i ett fönster inbäddat i en annan app, blockerar webbläsaren sparandet — öppna sidan i en vanlig flik.',
  'history.export.sheet.title': 'Export av historiken',
  'history.export.sheet.text': 'CSV öppnas i ett kalkylprogram (semikolon som avgränsare, komma som decimaltecken). JSON behåller allt, även listan över sessioner och luckorna där ingenting mättes.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Rensa historiken',
  'history.clear.title': 'Rensa historiken?',
  'history.clear.text': 'Då raderas {points} och {sessions}. Det går inte att ångra — vill du behålla dina data, exportera dem först.',
  'history.clear.confirm': 'Rensa',
  'history.clear.announce': 'Historiken rensad.',
  'history.clear.toast': 'Historiken rensad',

  'history.empty.title': 'Inget att visa än',
  'history.empty.text': 'Historiken fylls på medan du mäter — en punkt i sekunden. Allt stannar på den här enheten.',
  'history.empty.action': 'Gå till mätningen',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 min',
  'range.5m': '5 min',
  'range.1h': '1 tim',
  'range.24h': '24 tim',
  'range.7d': '7 dagar',
  'range.30d': '30 dagar',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Datum och tid',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'Enhetens lagring är full — nya mätningar sparas inte längre.',
  'storage.blocked': 'Webbläsaren låter inte historiken sparas — dina data försvinner när du stänger fliken.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Verktyg',
  'tools.action.about': 'Om mätningen',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Språk',
  'tools.language.subtitle': 'Som standard följer appen enhetens språk; ett val ur den här listan gäller direkt och stannar i den här webbläsaren.',
  'tools.language.aria': 'Gränssnittets språk',
  'tools.language.system': 'Auto',
  'tools.language.announce': 'Gränssnittets språk: {language}.',

  'tools.appearance.title': 'Utseende',
  'tools.appearance.theme.title': 'Tema',
  'tools.appearance.theme.desc': '”Auto” följer systemets inställning.',
  'tools.appearance.theme.aria': 'Tema',
  'tools.theme.system': 'Auto',
  'tools.theme.light': 'Ljust',
  'tools.theme.dark': 'Mörkt',
  'tools.appearance.accent.title': 'Accentfärg',
  'tools.appearance.accent.desc': 'Färgen på knappar, markeringar och reglage.',
  'tools.appearance.accent.aria': 'Accentfärg',
  'tools.appearance.textScale.title': 'Textstorlek',
  'tools.appearance.textScale.desc': 'Förstorar hela gränssnittet, inte bara etiketterna.',
  'tools.appearance.textScale.aria': 'Textstorlek',
  'tools.appearance.density.title': 'Täthet',
  'tools.appearance.density.desc': 'Tät får in mer innehåll på en och samma skärm.',
  'tools.appearance.density.aria': 'Layoutens täthet',
  'tools.density.comfortable': 'Luftig',
  'tools.density.compact': 'Tät',
  'tools.appearance.motion.title': 'Mindre rörelse',
  'tools.appearance.motion.desc': 'Stänger av animationer och visarens mjuka glidning. Systemets inställning respekteras oavsett.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Ocean',
  'accent.violet': 'Violett',
  'accent.amber': 'Bärnsten',
  'accent.mint': 'Mynta',
  'accent.rose': 'Ros',

  'tools.thresholds.title': 'Trösklar',
  'tools.thresholds.subtitle': 'Från vilket värde appen ska säga ”måttligt” och från vilket ”kritiskt”. Standardtrösklarna är vårt förslag, inte en norm — ställ in dem efter dig själv.',
  'tools.thresholds.warn': 'Varningströskel',
  'tools.thresholds.crit': 'Larmtröskel',
  'tools.thresholds.warn.aria': 'Varningströskel — {metric}',
  'tools.thresholds.crit.aria': 'Larmtröskel — {metric}',
  'tools.thresholds.reset': 'Standard',
  'tools.thresholds.reset.aria': 'Återställ standardtrösklarna: {metric}',
  'tools.thresholds.moved': '{threshold} flyttad till {value}.',
  'tools.thresholds.resetAll': 'Återställ alla trösklar',
  'tools.thresholds.resetAll.title': 'Återställa standardtrösklarna?',
  'tools.thresholds.resetAll.text': 'Alla sju storheter går tillbaka till de trösklar som appen föreslår. Din mäthistorik lämnas orörd.',
  'tools.thresholds.resetAll.confirm': 'Återställ',
  'tools.thresholds.resetAll.cancel': 'Behåll mina',
  'tools.thresholds.resetAll.toast': 'Trösklarna är tillbaka på standard',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'över {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} och lägre',
  'tools.zoneRange.goodBelow': 'under {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} och högre',

  'tools.calibration.title': 'Kalibrering',
  'tools.calibration.subtitle': 'För dig som har något att jämföra med.',
  'tools.calibration.intro': 'Två mobiler riktade mot samma lampa visar lite olika siffror — varje sensor har sin egen färgton. Har du en avläsning du litar på till hands kan du putta de enskilda bildkanalerna uppåt eller nedåt här. Multiplikatorerna verkar innan något räknas ut, så de ändrar alla sju storheter på en gång.',
  'tools.calibration.neutral': 'Inget att jämföra med? Låt det stå på 1,00 — det är fabriksinställningen och den förstör ingenting.',
  'tools.calibration.forward': 'Ändringen gäller från och med nu. Mätningar som redan ligger i historiken står kvar som de var när de sparades — vi räknar inte om dem, för det vore att skriva om data i efterhand.',
  'tools.calibration.reset': 'Nollställ kalibreringen',
  'tools.calibration.reset.toast': 'Kalibreringen nollställd',
  'tools.calibration.channel.r': 'Röd kanal',
  'tools.calibration.channel.g': 'Grön kanal',
  'tools.calibration.channel.b': 'Blå kanal',
  'tools.calibration.channel.aria': '{channel} — kalibreringsmultiplikator',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'Mätning',
  'tools.measurement.wake.title': 'Håll skärmen tänd',
  'tools.measurement.wake.desc': 'Skärmen står tänd under mätningen. Batteriet tar då slut fortare.',
  'tools.measurement.wake.unsupported': 'Den här webbläsaren låter oss inte hålla skärmen tänd.',
  'tools.measurement.haptics.title': 'Vibration',
  'tools.measurement.haptics.desc': 'En kort bekräftelse vid start, vid stopp och när storheten byts.',
  'tools.measurement.haptics.unsupported': 'Den här enheten rapporterar ingen vibrationsmotor.',

  'tools.about.title': 'Om mätningen',
  'tools.about.subtitle': 'Vad var och en av de sju storheterna räknar ut, och var den här metodens ärlighet tar slut.',
  'tools.about.scale': 'Skala: från {min} till {max}.',
  'tools.about.threshold': 'Vi varnar från {warn} och slår larm från {crit}.',
  'tools.about.thresholdInvert': 'Vi varnar under {warn} och slår larm under {crit}.',
  'tools.about.limitsHead': 'Vad den här mätningen inte klarar',
  'tools.about.limit.spectrum.title': 'En kamera ser inte färg som ett mätinstrument gör',
  'tools.about.limit.spectrum.text': 'En mobilkamera har tre kanaler: röd, grön och blå. Ett instrument för ljusmätning delar upp dem i tiotals smala band. Det du ser här är härlett ur de tre talen — på ett rimligt sätt, men det är fortfarande en uträkning, inte ett uppmätt spektrum.',
  'tools.about.limit.exposure.title': 'Kameran ställer in sin ljusstyrka själv',
  'tools.about.limit.exposure.text': 'Riktar du mobilen mot ett fönster mörkar kameran bilden för att inte överexponera den. ”Scenens ljusstyrka” sjunker då, fast ingenting i rummet har ändrats. Jämför därför det här värdet inom en och samma tagning, inte mellan rum.',
  'tools.about.limit.flicker.title': 'En långsam kamera fångar inte snabbt flimmer',
  'tools.about.limit.flicker.text': 'Vi kontrollerar bilden {hz} gånger i sekunden. Pulserande som är snabbare än {nyquist} gånger i sekunden kan i en sådan mätning framstå som långsammare än det verkligen är, eller försvinna helt — och elnätets flimmer är precis så snabbt. Fångar appen upp något, ta det som ett tecken på att ”något pulserar här”, inte som en uppmätt frekvens.',
  'tools.about.limit.medical.title': 'Det här är varken en medicinsk undersökning eller medicinsk rådgivning',
  'tools.about.limit.medical.text': 'Appen hjälper dig att märka att ljuset omkring dig är kallt, starkt eller oroligt, och föreslår vad som går att göra åt det. Den uttalar sig inte om din hälsa och ersätter inte ett samtal med läkare eller en mätning med ett professionellt instrument.',
  'tools.about.privacy': 'Allt räknas ut på din enhet. Kamerabilden skickas eller sparas aldrig någonstans — bara de uträknade talen når lagringen.',
  'tools.about.privacyPolicy': 'Fullständig integritetspolicy',

  'tools.data.title': 'Data',
  'tools.data.subtitle': 'Allt ligger i den här webbläsarens lagring och går aldrig någonstans härifrån.',
  'tools.data.summary.empty': 'Det finns inga sparade mätningar än.',
  'tools.data.summary': 'I lagringen: {points} och {sessions}.',
  'tools.data.export.csv': 'Exportera CSV',
  'tools.data.export.json': 'Exportera JSON',
  'tools.data.clear': 'Rensa historiken',
  'tools.data.reset': 'Standardinställningar',
  'tools.data.reset.title': 'Återställa standardinställningarna?',
  'tools.data.reset.text': 'Utseende, trösklar, kalibrering och mätinställningar går tillbaka till sitt ursprungliga läge. Din mäthistorik lämnas orörd.',
  'tools.data.reset.confirm': 'Återställ',
  'tools.data.reset.toast': 'Standardinställningarna återställda',
  'tools.data.wipe': 'Radera alla data',
  'tools.data.wipe.title': 'Radera alla appens data?',
  'tools.data.wipe.text': 'Borta blir: hela mäthistoriken och listan över sessioner, dina trösklar och din kalibrering samt dina utseendeinställningar. Appen går tillbaka till det läge den var i vid första starten.',
  'tools.data.wipe.note': 'Vi har ingen kopia av de här uppgifterna — de har aldrig lämnat den här enheten, så det finns ingenstans att återställa dem ifrån.',
  'tools.data.wipe.check': 'Jag förstår att det här inte går att ångra',
  'tools.data.wipe.confirm': 'Radera allt',
  'tools.data.wipe.toast': 'Alla appens data har raderats',
  'tools.data.wipe.announce': 'Alla appens data har raderats. Inställningarna är tillbaka på standard.',
  'tools.data.storage.blocked': 'Den här webbläsaren låter ingenting lagras permanent (privat läge, eller blockerade webbplatsdata). Allt du ställer in här försvinner när du stänger fliken.',
  'tools.data.storage.full': 'Webbläsarens lagring har blivit full och nya mätningar sparas inte längre. Att rensa historiken frigör plats.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Stöd',
  'support.free.title': 'Allt är tillgängligt',
  'support.free.lead': 'Alla sju storheter, hela historiken, trösklar, kalibrering och export fungerar från första starten — inget konto, inga gränser och ingen avgift.',
  'support.free.note': 'Mätningen räknas ut helt på den här enheten och fungerar utan nät. Det finns ingen bättre version undanhållen bakom en vägg här.',
  'support.why.title': 'Därför frågar jag',
  'support.why.lead': 'Ljusmonitor byggs på fritiden, utan reklam, utan sponsor och utan företag bakom sig. Stödet betalar tiden för rättningar, för nya storheter och för att hålla i gång det som redan fungerar.',
  'support.what.title': 'Vad en gåva ger dig',
  'support.what.lead': 'Ingenting. En gåva låser inte upp något — ingen extra funktion, inget märke vid namnet, ingen förtur. Allt som appen kan har du redan.',
  'support.what.note': 'Kvar blir bara att jag vet att den kom någon till nytta. Det är faktiskt skäl nog.',
  'support.cta.title': 'Om du vill hjälpa till',
  'support.cta.button': 'Bjud mig på en kaffe',
  'support.cta.nolink': 'Gåvoprofilen är inte kopplad än. När den är det står det en knapp på den här platsen.',
  'support.cta.privacy': 'Den här länken öppnar den externa sidan Buy Me a Coffee i en ny flik. Det är det enda tillfället då något lämnar den här enheten — själva mätningen stannar alltid här.',
  'support.cta.privacyFuture': 'När adressen väl är på plats öppnar knappen den externa sidan Buy Me a Coffee i en ny flik. Det blir det enda tillfället då något lämnar den här enheten — själva mätningen stannar alltid här.',
  'support.cta.note': 'Här finns ingen nedräkning, inga påminnelser och inget fönster som öppnar sig självt. Den här förfrågan väntar på den här fliken och ingen annanstans.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'senaste minuten',
  'gauge.aria': '{metric}: {value}, zon: {zone}',
  'gauge.aria.note': '{metric}: {value}, zon: {zone}, {note}',
  'gauge.aria.initial': '{metric}: inga data',
  'gauge.value.none': 'inga data',
  /* Odczyt słowny z jednostką: „27 procent”, „1,20 gånger”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'ungefärligt värde',
  'gauge.note.offScale': 'utanför skalan',
  'gauge.metric.unknown': 'Okänd storhet',

  'chart.aria.label': 'Diagram över mäthistoriken',
  'chart.hint': 'Interaktivt diagram. Vänster- och högerpil flyttar avläsningsmarkören, Home och End hoppar till intervallets början och slut, Escape döljer markören.',
  'chart.empty.title': 'Inga data',
  'chart.empty.text': 'Starta en mätning — diagrammet dyker upp efter de första avläsningarna.',
  'chart.few.title': 'För lite data',
  'chart.few.text': 'Vi har en avläsning: {value}. En linje kräver två.',
  'chart.legend.line': 'mätning',
  'chart.legend.gap': 'lucka i mätningen',
  'chart.aria.head': 'Diagram: {metric}, intervall {range}',
  'chart.aria.empty': 'Inga data i det här intervallet.',
  'chart.aria.one': 'En avläsning: {value}.',
  'chart.aria.summary': 'Från {min} till {max}, medelvärde {avg}, {points}.',
  'chart.aria.gaps': 'Serien har luckor — då mätte vi inte.',
  'chart.readout.empty': 'Inga data i det här intervallet.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'För lite data för att rita ett diagram.',
  'chart.readout.hint': 'Dra över diagrammet, eller använd piltangenterna, för att läsa av en enskild mätning.',
  'chart.time.now': 'nu',
  'chart.time.justNow': 'nyss',
  'chart.time.ago': 'för {duration} sedan',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} \u00B7 {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd zegar dwudziestoczterogodzinny i data
     w kolejności dzień-miesiąc, bo tak szwedzkie ustawienia regionalne
     formatują godzinę i datę. */
  'chart.sample.ago': '\u221230\u00A0min',
  'chart.sample.clock': '00:00',
  'chart.sample.date': '30\u00A0aug',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'Blåandel',
  'metric.share.short': 'Hur mycket av ljuset vi ser som faller på den blå kanalen.',
  'metric.share.help': 'Den skiljer färgen från ljusstyrkan — det är det här värdet som rör sig när du slår på nattläge.',
  'metric.brightness.name': 'Scenens ljusstyrka',
  'metric.brightness.short': 'Kamerabildens genomsnittliga ljusstyrka.',
  'metric.brightness.help': 'Ett relativt värde, inte lux — kamerans automatiska exponering förskjuter det under ytan.',
  'metric.kelvin.name': 'Färgtemperatur',
  'metric.kelvin.short': 'Om ljuset är varmt eller kallt.',
  'metric.kelvin.help': 'Under 3000 K är ljuset varmt och skonsammare på kvällen. 6500 K är standardvitt på de flesta skärmar.',
  'metric.melanopic.name': 'Dygnsrytmpåverkan',
  'metric.melanopic.short': 'Hur starkt det här ljuset verkar på den biologiska klockan.',
  'metric.melanopic.help': 'En uppskattning av den melanopiska kvoten. 1,00 är neutralt dagsljusvitt; på kvällen är det värt att gå under 0,50.',
  'metric.flicker.name': 'Flimmer',
  'metric.flicker.short': 'Osynligt pulserande hos ljuskällan.',
  'metric.flicker.help': 'Billiga dimrar och bakgrundsbelysningar pulserar. Ögat ser det inte, men det anges som en möjlig orsak till trötthet och huvudvärk.',
  'metric.uniformity.name': 'Jämnhet',
  'metric.uniformity.short': 'Om ljuset fördelar sig jämnt över bildrutan.',
  'metric.uniformity.help': 'Ett lågt värde på en skärm betyder ljusläckage från bakgrundsbelysningen eller en reflex; på ett skrivbord — en illa placerad lampa.',
  'metric.comfort.name': 'Synkomfort',
  'metric.comfort.short': 'Ett samlat betyg i stället för sex tal.',
  'metric.comfort.help': 'Den väger ihop de övriga mätningarna till ett betyg från 0 till 100 och visar vad som sänker det mest. Vikterna är vår redaktionella bedömning, inte en norm.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'bra',
  'zone.warn': 'måttligt',
  'zone.crit': 'kritiskt',
  'zone.none': 'inga data',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 aug'). */
  'date.month.short.1': 'jan',
  'date.month.short.2': 'feb',
  'date.month.short.3': 'mar',
  'date.month.short.4': 'apr',
  'date.month.short.5': 'maj',
  'date.month.short.6': 'jun',
  'date.month.short.7': 'jul',
  'date.month.short.8': 'aug',
  'date.month.short.9': 'sep',
  'date.month.short.10': 'okt',
  'date.month.short.11': 'nov',
  'date.month.short.12': 'dec',

  'date.clock': '{hours}:{minutes}',
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0{year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0tim',
  'time.duration.hourMinute': '{hours}\u00A0tim {minutes}\u00A0min',
  'time.duration.hour': '{hours}\u00A0tim',
  'time.duration.minuteSecond': '{minutes}\u00A0min {seconds}\u00A0s',
  'time.duration.minute': '{minutes}\u00A0min',
  'time.duration.second': '{seconds}\u00A0s',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „nyss”. */
  'time.justNow': 'nyss',
  'time.aMinuteAgo': 'för en minut sedan',
  'time.minutesAgo': 'för {minutes}\u00A0min sedan',
  'time.hoursAgo': 'för {hours}\u00A0tim sedan',
  'time.yesterday': 'i går',
  'time.daysAgo': 'för {days}\u00A0dagar sedan',

  /* Formy zależne od liczby. Szwedzki ma w CLDR dwie: `one` i `other`.
     Rozstrzyga je Intl.PluralRules dla języka aktywnego. */
  'time.days.plural': { one: 'dag', other: 'dagar' },
  /* „sampel” jest po szwedzku rzeczownikiem nijakim bez końcówki w liczbie
     mnogiej: ett sampel, flera sampel — obie formy są więc identyczne. */
  'unit.sample.plural': { one: 'sampel', other: 'sampel' },
  'unit.measurement.plural': { one: 'mätning', other: 'mätningar' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Szwedzki ma jedną — oba klucze zostają (kształt słownika jest wspólny dla
     wszystkich języków), a wartości są tu identyczne. */
  'unit.session.plural': { one: 'session', other: 'sessioner' },
  'unit.session.accusative.plural': { one: 'session', other: 'sessioner' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to po szwedzku
     dwa różne słowa: punkt na wykresie, poäng jako jednostka oceny. */
  'unit.chartPoint.plural': { one: 'punkt', other: 'punkter' },
  'unit.point.plural': { one: 'poäng', other: 'poäng' },
  'unit.kelvin.plural': { one: 'kelvin', other: 'kelvin' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „procent”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'procent',
  'unit.spoken.times': 'gånger',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'Tillstånd att använda kameran gavs inte. Tillåt kameran för den här sidan i webbläsarens eller systemets inställningar och försök igen.',
  'camera.error.notfound': 'Ingen kamera hittades. Kontrollera att enheten har en och att den inte är avstängd i systemet.',
  'camera.error.inuse': 'Kameran är upptagen av en annan app. Stäng den appen eller fliken och försök igen.',
  'camera.error.insecure': 'Kameran fungerar bara över HTTPS eller på localhost. Öppna den här sidan på en adress som börjar med ”https://”.',
  'camera.error.unsupported': 'Den här webbläsaren erbjuder inte kameran här. Prova Chrome eller Safari, i ett vanligt fönster — inte i en förhandsvisning inbäddad i en annan app.',
  'camera.error.unknown': 'Kameran kunde inte startas.'
};
