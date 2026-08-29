/* docs/v1/i18n/sv.js — słownik WŁASNY wersji v1, szwedzki.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka. Kolejność jest treścią umowy: plik wersji dokłada się do tego samego
 * obiektu i może nadpisać dowolny klucz wspólny — nigdy odwrotnie.
 *
 * DLACZEGO TEN SŁOWNIK JEST SAMOWYSTARCZALNY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar w app.js, własne
 * dwie wielkości zamiast siedmiu i własne nazwy stref („Säker” zamiast
 * wspólnego „Normalt”). Dlatego wszystko, co v1 pokazuje, stoi TUTAJ — także
 * klucze, które przypadkiem brzmią tak samo jak wspólne. Zestaw kluczy jest
 * dokładnie taki sam jak w pl.js tego katalogu — pilnuje tego
 * docs/shared/i18n/keys.test.js.
 *
 * REJESTR: bezpośrednie „du”, jednolicie w całym pliku — tak jak
 * w docs/shared/i18n/sv.js i w v5. W szwedczyźnie jest to forma neutralna,
 * standardowa także w tekstach urzędowych i medycznych; „ni” brzmiałoby dziś
 * sztucznie. Cudzysłowy szwedzkie ” … ” (ten sam znak z obu stron), przecinek
 * dziesiętny, spacja nierozdzielająca przed znakiem % (zalecenie Språkrådet).
 *
 * TERMINOLOGIA — wzięta co do słowa z warstwy wspólnej wszędzie tam, gdzie
 * v1 mówi o tym samym: blåandel (udział niebieskiego), scenens ljusstyrka
 * (jasność sceny), färgtemperatur, mätvärde (odczyt), historik (historia),
 * session (sesja), tröskel (próg), dygnsrytm (rytm dobowy), optiker
 * (optometrysta). Nazw pozostałych pięciu wielkości warstwy wspólnej tu NIE MA
 * — v1 ich nie mierzy. Własne pojęcia tej wersji to B-kanalens ljusstyrka
 * (jasność kanału B) i mätare (gałka); każde ma jeden odpowiednik i trzyma się
 * go w całym pliku. „Ekran aplikacji” to vy, „ekran urządzenia” to skärm.
 *
 * ZASTRZEŻENIA MEDYCZNE i akapity o prywatności przetłumaczone DOKŁADNIE, bez
 * osłabiania i bez dodawania obietnic — to zdania o skutkach prawnych.
 *
 * MARKUP W WARTOŚCIACH. Część kluczy (rozdziały Dokumentacji) zawiera znaczniki
 * <b>, <i>, <code> i encje HTML. Wstawiane są przez data-i18n-html, czyli tylko
 * tam, gdzie autor tekstu świadomie tego chciał — nigdy do treści pochodzącej
 * od użytkownika. Bez tego wyróżnienia w akapitach Dokumentacji trzeba by było
 * rozbić każde zdanie na kilkanaście kluczy po jednym słowie.
 */
window.I18nData = window.I18nData || {};
window.I18nData['sv'] = Object.assign(window.I18nData['sv'] || {}, {

  /* ---- aplikacja ---- */

  'app.name': 'Monitor för skadligt ljus',
  'app.description': 'Mäter med kameran hur stark den blå färgen på en skärm är och visar den i ett tydligt diagram med zoner: säker, måttlig, skadlig.',

  /* ---- wybór języka ---- */

  'language.label': 'Språk',
  'language.help': 'Språket i hela appen. Alla språk finns redan på den här enheten — ingenting laddas ned och ingenting skickas någonstans.',
  'language.auto': 'Följ enheten',

  /* ---- nawigacja ---- */

  'nav.aria': 'Huvudmeny',
  'nav.tabsAria': 'Appens vyer',
  'nav.announce': 'Vy: {screen}',
  'nav.camera': 'Kamera',
  'nav.monitoring': 'Övervakning',
  'nav.support': 'Stöd',
  'nav.more': 'Mer',
  'nav.docs': 'Dokumentation',
  'nav.about': 'Om appen och kontakt',
  'nav.settings': 'Varningströsklar',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← Tillbaka',
  'action.back.aria': 'Tillbaka till föregående vy',
  'action.openDocs': 'Gå till dokumentationen',
  'action.exportCsv': 'Exportera CSV',
  'action.delete': 'Ta bort',
  'action.closeNotification': 'Stäng aviseringen',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref — „Säker / Måttlig / Skadlig”, a nie
     wspólne „Normalt / Varning / Kritiskt”. Przymiotniki stoją w rodzaju
     wspólnym (en zon), bo opisują strefę. Wersja plakatowa (zone.badge.*) jest
     osobnym kluczem, a nie zapisem wielkimi literami przez CSS: tureckie „i”
     i greckie akcenty nie znoszą automatycznej zamiany. */

  'zone.good': 'Säker',
  'zone.warning': 'Måttlig',
  'zone.critical': 'Skadlig',
  'zone.none': 'Inga data',

  'zone.badge.good': 'SÄKER',
  'zone.badge.warning': 'MÅTTLIG',
  'zone.badge.critical': 'SKADLIG',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'B-kanalens ljusstyrka',
  'metric.raw.unitLabel': '% av B-kanalens ljusstyrka',
  'metric.share.name': 'Blåandel',
  'metric.share.longName': 'Ljusets blåandel',
  'metric.share.unitLabel': '% blåandel',
  'stat.overallBrightness': 'Scenens totala ljusstyrka',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': 'Förhandsvisning från kameran',
  'camera.pressStart': 'Tryck på ”Start”.',
  'camera.start': 'Start',
  'camera.stop': 'Stopp',
  'camera.switch': 'Byt kamera',
  'camera.error': 'Kameran kunde inte startas. Kontrollera webbläsarens behörighet till kameran och försök igen. ({message})',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': 'Aktuella mätvärden',
  'disclaimer.short': 'Ett ungefärligt resultat. Det här är inte en medicinteknisk produkt.',
  'disclaimer.more': 'Mer',

  /* ---- wykresy ---- */

  'chart.aria': 'Diagram över tid',
  'chart.title': 'Diagram över tid (senaste {seconds} s)',
  'chart.empty': 'Starta kameran för att se diagrammet',
  'chart.axis.past': '-{seconds}s',
  'chart.axis.now': 'nu',
  'chart.raw.aria': 'Diagram över B-kanalens ljusstyrka över tid, med den säkra, den måttliga och den skadliga zonen utmärkta',
  'chart.share.aria': 'Diagram över ljusets blåandel över tid, med den säkra, den måttliga och den skadliga zonen utmärkta',

  /* ---- tabela odczytów ---- */

  'table.show': 'Visa som tabell',
  'table.hide': 'Dölj tabellen',
  'table.caption': 'Senaste mätvärdena (nyaste överst)',
  'table.col.time': 'Tid',
  'table.col.zone': 'Zon',

  /* ---- ustawienia progów ---- */

  'settings.title': 'Inställningar för zontrösklar',
  'settings.boundary.critical': 'Gräns gul / röd:',
  'settings.boundary.warning': 'Gräns grön / gul:',

  /* ---- historia i raport (features.js) ---- */

  'history.title': 'Historik och rapport',
  'history.rangeAria': 'Historikens tidsintervall',
  'history.unavailable': 'Historikens data är tillfälligt otillgängliga.',
  'history.empty': 'Inga mätvärden sparade i det här intervallet. Starta en mätning — historiken byggs upp av sig själv.',
  'history.savedReadings': 'Sparade mätvärden: {count}. Tiden fördelad på zoner:',
  'history.zoneLine': '{zone}: {percent} % ({readings})',

  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 dagar',
  'range.30d': '30 dagar',

  'report.dailyTitle': 'Daglig rapport',
  'report.empty': 'Rapporten visas när det finns sparade mätvärden i det valda intervallet.',
  'report.dailyCaption': 'Andel tid i varje zon, dag för dag',
  'report.col.day': 'Dag',
  'report.col.week': 'Vecka',
  'report.col.readings': 'Mätvärden',
  'report.compare.day': 'Jämförelse dag för dag: {day} — {percent} % av tiden i den skadliga zonen, {change}',
  'report.compare.dayPending': 'Jämförelsen dag för dag visas efter en andra mätdag.',
  'report.compare.week': 'Jämförelse vecka för vecka: {week} — {percent} % av tiden i den skadliga zonen, {change}',
  'report.compare.weekPending': 'Jämförelsen vecka för vecka visas efter en andra mätvecka.',
  'report.change.same': 'lika mycket som {other}.',
  'report.change.more': '{points} mer än {other}.',
  'report.change.less': '{points} mindre än {other}.',
  'report.peak': 'Flest mätvärden i den skadliga zonen inföll mellan {from} och {to}.',
  'report.peak.none': 'Inga mätvärden i den skadliga zonen sparades i det här intervallet.',
  'report.weeklyTitle': 'Veckorapport',
  'report.weeklyEmpty': 'Veckorapporten visas när det finns sparade mätvärden i det valda intervallet.',
  'report.weeklyCaption': 'Andel tid i varje zon, vecka för vecka',
  'report.weekLabel': 'Vecka {week} ({year})',
  'report.footnote': 'Siffrorna är andelen sparade mätvärden i det valda intervallet, inte den exakta exponeringstiden.',

  /* ---- profile progów ---- */

  'profiles.title': 'Tröskelprofiler',
  'profiles.empty': 'Du har inte sparat några profiler än.',
  'profiles.itemActive': '{name} (aktiv)',
  'profiles.applyAria': 'Använd profilen {name}',
  'profiles.deleteAria': 'Ta bort profilen {name}',
  'profiles.applied': 'Profilen ”{name}” används nu.',
  'profiles.deleted': 'Profilen ”{name}” är borttagen.',
  'profiles.saved': 'Profilen ”{name}” är sparad.',
  'profiles.namePlaceholder': 'Profilnamn (till exempel Kväll)',
  'profiles.saveLabel': 'Spara nuvarande trösklar som en profil',
  'profiles.saveBtn': 'Spara profil',
  'profiles.needName': 'Ange ett profilnamn.',
  'profiles.limit': {
    one: 'Du kan spara högst {n} profil. Ta bort en för att lägga till en ny.',
    other: 'Du kan spara högst {n} profiler. Ta bort en för att lägga till en ny.'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku też — ale musi
     zostać bezpieczna dla systemu plików: bez ukośników i dwukropków, a po
     szwedzku dodatkowo bez å, ä i ö. */

  'csv.header': 'tid;b_kanal_proc;blaandel_proc;scenens_ljusstyrka_proc;zon',
  'csv.filename': 'ljusmonitor-{stamp}.csv',
  'csv.empty': 'Det finns inga mätvärden att exportera. Starta en mätning och försök igen.',
  'csv.done': '{readings} exporterades till en CSV-fil.',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut. Powód: po polsku wypada tam dopełniacz
     („od 5 minut”), po szwedzku czas trwania wchodzi dopiero na koniec zdania,
     po przyimku „i” („i 5 minuter”), a każdy z trzydziestu języków rozstrzyga
     to inaczej. */

  'alert.exposure': {
    one: 'Tröskellarm: mätvärdet har legat i den skadliga zonen i {n} minut. Överväg en paus eller att sänka blåandelen på skärmen.',
    other: 'Tröskellarm: mätvärdet har legat i den skadliga zonen i {n} minuter. Överväg en paus eller att sänka blåandelen på skärmen.'
  },

  'session.title': 'Sammanfattning av den senaste sessionen',
  'session.line': 'Mättid: {duration}. Sparade mätvärden: {count}.',
  'session.zoneLine': '{zone}: {percent} % av sessionen.',
  'session.endedAt': 'Sammanfattningen gäller sessionen som avslutades {time}.',
  'session.toast': 'Sessionen avslutad: {duration}, {readings}, {percent} % av tiden i den skadliga zonen.',

  'duration.seconds': '{n} s',
  'duration.minutesSeconds': '{minutes} min {seconds} s',

  /* ---- liczebniki ----
     Szwedzki ma dwie kategorie CLDR: one (dokładnie 1) i other — ta druga
     obejmuje też 0 i ułamki („1,5 mätvärden”). Formę wybiera
     Intl.PluralRules('sv'), nie nasza reguła. */

  'count.readings': { one: '{n} mätvärde', other: '{n} mätvärden' },
  'count.points': {
    one: '{n} procentenhet',
    other: '{n} procentenheter'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': 'Mer',
  'more.section.settings': 'INSTÄLLNINGAR',
  'more.section.help': 'HJÄLP',
  'more.thresholds.title': 'Varningströsklar',
  'more.thresholds.sub': 'Ställ in gränserna för den säkra, den måttliga och den skadliga zonen.',
  'more.docs.title': 'Dokumentation',
  'more.docs.sub': 'Hur mätningen fungerar, enheter, standarder och zoner.',
  'more.about.title': 'Om appen och kontakt',
  'more.about.sub': 'Version, integritet och kontakt.',
  'more.free': 'Appen är gratis i sin helhet.',
  'more.supportLink': 'Du är välkommen att stödja den frivilligt.',
  'more.version': 'Version {version} · Alla funktioner tillgängliga utan konto och utan avgift',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': 'Om appen och kontakt',
  'about.version': 'Version {version}',
  'about.what.title': 'Vad den här appen är',
  'about.what.p1': '{app} mäter med telefonens kamera hur mycket blått ljus sensorn registrerar och visar det på två mätare och i diagram med zoner. Alla funktioner — mätningen, historiken, rapporterna, tröskelprofilerna, tröskellarmet, CSV-exporten och dokumentationen — är tillgängliga för alla, utan konto och utan avgift.',
  'about.what.p2': 'Appen tillhandahålls ”i befintligt skick”, för informationsändamål. Mätresultatet är ungefärligt och är inget underlag för beslut om hälsan.',
  'about.privacy.title': 'Integritet och data',
  'about.privacy.p1': 'Kamerabilden analyseras uteslutande på din enhet och skickas aldrig till någon server. Vi skapar inga konton och samlar inte in dina data. Tröskelinställningar, profiler och mäthistorik sparas bara i minnet på den här enheten och i den här webbläsaren.',
  'about.privacy.p2': 'Appen visar ingen reklam och hör inte av sig till nätet. Det enda undantaget är knappen på vyn ”Stöd”: när du trycker på den öppnar webbläsaren en extern sida i en ny flik. Ingenting händer förrän du gör det själv.',
  'about.contact.title': 'Kontakt',
  'about.contact.p1': 'Synpunkter, fel och förslag: [E-MAIL]. Vi svarar så fort vi kan — det här är ett projekt som underhålls på fritiden.',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': 'Stöd',
  'support.free.title': 'Allt är tillgängligt',
  'support.free.text': 'Hela appen är gratis: mätningen, historiken och rapporterna, tröskelprofilerna, larmet, CSV-exporten och dokumentationen. Allt fungerar direkt, utan konto, utan gränser och utan internet.',
  'support.why': '{app} byggs på fritiden. Om du har nytta av den kan du bjuda mig på en kaffe. Det hjälper till att hålla appen i gång och utveckla den vidare — förbättra mätningen, skriva mer dokumentation och prova den på fler telefoner.',
  'support.nothing': 'En gåva låser inte upp något. Det finns ingen bättre och ingen sämre version — efter att du har gett fungerar appen precis likadant. Den enda skillnaden är att upphovsmannen vet att den kom någon till nytta.',
  'support.button': 'Bjud mig på en kaffe',
  'support.button.aria': 'Bjud mig på en kaffe — öppnar gåvoprofilen i en ny flik',
  'support.pending': 'Gåvoprofilen är inte kopplad än. Så fort den är det står knappen på den här platsen. Fram till dess finns ingenting att göra — appen är ändå gratis i sin helhet.',
  'support.privacy': 'Knappen öppnar en extern sida (till exempel Buy Me a Coffee) i en ny flik i webbläsaren. Det är det enda tillfället då något lämnar den här enheten. Kamerabilden och alla dina mätningar stannar här — de skickas ingenstans, varken innan du trycker eller efteråt.',
  'support.privacyPending': 'När adressen väl finns öppnar ett tryck på knappen en extern sida (till exempel Buy Me a Coffee) i en ny flik i webbläsaren. Det blir det enda tillfället då något lämnar den här enheten. Kamerabilden och alla dina mätningar stannar här — de skickas ingenstans.',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': 'Dokumentation',

  'disclaimer.title': 'Det här är inte en medicinteknisk produkt',
  'disclaimer.body.docs': 'Den här appen är inte en medicinteknisk produkt. Den är inte avsedd att diagnostisera, behandla eller förebygga någon sjukdom. Resultat som mäts med en telefonkamera är ungefärliga och ersätter inte en undersökning eller råd från läkare. I frågor om ögonhälsa, rådfråga en läkare eller en optiker. Zontrösklarna i den här appen återger ingen säkerhetsstandard — mer om det i kapitel 3.',
  'disclaimer.body.about': 'Den här appen är inte en medicinteknisk produkt. Den är inte avsedd att diagnostisera, behandla eller förebygga någon sjukdom. Resultat som mäts med en telefonkamera är ungefärliga och ersätter inte en undersökning eller råd från läkare. I frågor om ögonhälsa, rådfråga en läkare eller en optiker. Zontrösklarna i den här appen återger ingen säkerhetsstandard — mer om det i dokumentationen, kapitel 3.',

  'doc.toc.aria': 'Dokumentationens innehållsförteckning',
  'doc.toc.title': 'Innehåll',

  'doc.ch1.title': 'Snabbstart',
  'doc.ch2.title': 'Så fungerar mätningen',
  'doc.ch3.title': 'Enheter och standarder',
  'doc.ch4.title': 'Zoner och trösklar',
  'doc.ch5.title': 'Skillnader mellan enheter',

  'doc.ch1.heading': '1. Snabbstart',
  'doc.ch2.heading': '2. Så fungerar mätningen',
  'doc.ch3.heading': '3. Enheter och standarder',
  'doc.ch4.heading': '4. Zoner och trösklar',
  'doc.ch5.heading': '5. Skillnader mellan enheter',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': 'Så mäter du mer träffsäkert',
  'doc.ch1.tips.li1': 'På vyn ”Kamera” (första knappen i det nedre fältet) trycker du på ”Start” och riktar den bakre kameran mot skärmen eller ljuskällan du vill kontrollera.',
  'doc.ch1.tips.li2': 'Gå till vyn ”Övervakning” (andra knappen i det nedre fältet) — högst upp ser du båda mätarna samtidigt, och under dem (rulla neråt) diagrammen över förändringar i tiden. Mätningen fortsätter i bakgrunden oavsett vilken vy du råkar titta på.',
  'doc.ch1.tips.li3': 'Håll telefonen på ett fast avstånd från skärmen (säg 15–20 cm), utan att ändra omgivningens belysning under mätningen.',
  'doc.ch1.tips.li4': 'Använd den bakre kameran — dess automatiska korrigeringar är mindre aggressiva än den främre kamerans.',
  'doc.ch1.tips.li5': 'Behandla resultaten som relativa indikatorer (%), inte som absoluta fysikaliska enheter — jämför dem med varandra (till exempel nattläge på mot av).',
  'doc.ch1.tips.li6': 'Anpassa zontrösklarna i inställningarna efter ljusstyrkan på din egen skärm (kapitel 4).',

  'doc.ch1.fonts.title': 'Stor text och stora mätare — alltid',
  'doc.ch1.fonts.p1': 'Hela appen använder stor, läsbar text och mätare i full storlek, så att synsvaga (och alla andra) kan läsa av värdena utan extra inställningar. På vyn ”Övervakning” ryms båda mätarna tillsammans på en skärmbild, utan att du behöver rulla — diagrammen över förändringar i tiden ligger direkt under dem, en rullning bort.',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': 'En telefonkamera mot en spektrometer',
  'doc.ch2.spectro.p1.html': 'Att på riktigt mäta ”hur mycket skadligt blått ljus det finns” kräver att ljuset delas upp i våglängder — det är vad en <b>spektrometer</b> gör: ett prisma eller ett diffraktionsgitter delar upp ljuset i tiotals eller hundratals smala band (säg var 1–5 nm) och mäter den optiska effekten i vart och ett för sig. Först ur en sådan fullständig spektralfördelning går det att räkna ut enheter som lux, lumen eller bestrålning viktad med funktionen för blåljusrisk.',
  'doc.ch2.spectro.p2.html': '<b>En telefonkamera gör inget av det.</b> Den har tre breda filter (Bayer: R/G/B), och vart och ett samlar in ljus över ett brett, överlappande våglängdsområde — den ”blå kanalen” är inte ett smalt band kring 435–440 nm (toppen för risken mot näthinnan), utan grovt räknat 400–570 nm blandat med grönt. Till det kommer demosaicing, automatisk exponering, automatisk vitbalans och sRGB-gammakomprimering — inget av de stegen låter webbläsaren stänga av helt. Följden är att pixelvärdet som JavaScript ser inte står i något linjärt förhållande till den verkliga optiska effekt som faller på sensorn. Det är en grundläggande hårdvarubegränsning, inte ett fel i den här appen.',

  'doc.ch2.raw.title': 'Diagram 1 — B-kanalens ljusstyrka',
  'doc.ch2.raw.what.html': '<b>Vad det visar:</b> den genomsnittliga ljusstyrkan i enbart den blå kanalen (B) i den samplade delen av bilden, på skalan 0–255 omräknad till %.',
  'doc.ch2.raw.algo.html': '<b>Algoritmen:</b>',
  'doc.ch2.raw.step1': 'Vi hämtar en bildruta från kameran 5 gånger i sekunden.',
  'doc.ch2.raw.step2': 'Vi skär ut de mittersta 60 % av bildrutan (det undviker bildens kanter och sken från sidorna).',
  'doc.ch2.raw.step3': 'Vi skalar ner den utskurna delen till ett rutnät på 32×32 pixlar (tillräckligt noggrant och mycket snabbare än att räkna i full upplösning — viktigt på svagare hårdvara som budgetmodeller från Xiaomi eller Ulefone).',
  'doc.ch2.raw.step4': 'Vi tar medelvärdet av B-värdet för alla 1024 pixlar i det rutnätet.',
  'doc.ch2.raw.step5.html': '<code>resultat = medel_B ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>Därför behöll vi den:</b> det är den enklaste, mest direkta avläsningen av ”hur mycket blå signal sensorn över huvud taget fångar upp”. Svagheten är att den blandar ljusstyrka med färg — en mycket ljus men neutralt vit scen ger också ett högt resultat, trots att den inte är särskilt ”blå”. Därför visar vi diagram 2 bredvid den.',

  'doc.ch2.share.title': 'Diagram 2 — Ljusets blåandel',
  'doc.ch2.share.what.html': '<b>Vad det visar:</b> hur många procent av allt registrerat ljus (R+G+B) som den blå komponenten står för — alltså färgens förskjutning mot det kalla, oberoende av hur ljus scenen är.',
  'doc.ch2.share.algo.html': '<b>Algoritmen:</b> samma steg 1–4 som ovan, men i stället för enbart B räknar vi:',
  'doc.ch2.share.formula.html': '<code>resultat = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': 'Neutralt vitt (R≈G≈B) ger ungefär <b>33 %</b>. Varmare, rödare ljus ger mindre. Starkt blått ljus ger mer, ända upp till gränsen ~100 % för ljus som är nästan rent blått.',
  'doc.ch2.share.why.html': '<b>Därför är det här det noggrannare måttet på ”skadligt blått”:</b> det är samma princip som filter av typen nattläge eller Night Shift bygger på — det som räknas är <b>färgen</b>, inte ljusstyrkan. En mycket ljus men neutral skärm blir inte felaktigt märkt som skadlig; en nedtonad men starkt blå blir det. Därför är det den här storheten som styr zonfärgen i tabellen med mätvärden.',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': 'Därför inte lux eller lumen',
  'doc.ch3.units.p1.html': '<b>Lumen (lm)</b> beskriver det totala ljusflöde som en källa avger — en egenskap hos själva källan, inte hos det som når en viss punkt. <b>Lux (lx)</b> är redan belysningsstyrkan i en punkt (lm/m²) — närmare det vi är ute efter, men fortfarande en <b>fotometrisk</b> enhet: den viktar spektrumet med det mänskliga ögats ljuskänslighetskurva (V(λ)), inte med kurvan för blåljusrisk. En verklig mätning av risken kräver en tredje, smalare enhet: spektralt viktad bestrålning i <b>W/m²</b> (standarden IEC 62471, känsligheten toppar kring 435–440 nm), och det kräver en spektrometer — se avsnittet ovan.',
  'doc.ch3.units.p2.html': 'Även om vi nöjde oss med lux: en telefon utan en extern, kalibrerad ljussensor kan inte bestämma dem tillförlitligt. Telefonens inbyggda ljussensor (där en sådan finns) mäter dessutom ljuset på den <b>motsatta sidan</b> av höljet mot den du riktar mot skärmen med den bakre kameran — den skulle alltså mäta ljuset bakom din rygg, inte ljuset från skärmen. I stället för att gissa ett tal i en enhet som ändå inte skulle gå att lita på visar vi därför en ärligt benämnd <b>relativ indikator (%)</b> — meningsfull för jämförelser på samma telefon under samma förhållanden (säg nattläge på mot av), inte som ett absolut värde.',

  'doc.ch3.norms.title': 'Finns det globala standarder för säkerhetströsklar?',
  'doc.ch3.norms.p1.html': 'Kort: <b>det finns ingen standard uttryckt i procent av en kamerakanal</b> — det är över huvud taget inte en enhet som något regleras i. Verkliga standarder om blått ljus finns, men de mäter andra storheter, i andra enheter, och de gäller ett annat fenomen än det man vanligen menar med att ”blått ljus tröttar ögonen”.',
  'doc.ch3.norms.p2.html': '<b>Akut fotokemisk skada på näthinnan — IEC 62471 / ICNIRP.</b> Den enda ”blåljusrisk” som faktiskt regleras — en standard för lampor och belysningssystem, med stöd i riktlinjerna från ICNIRP (International Commission on Non-Ionizing Radiation Protection). Den delar in källor i riskgrupperna RG0–RG3 utifrån radians viktad med riskfunktionen B(λ), i <b>W·m⁻²·sr⁻¹</b>, med en gräns för exponeringstiden (<code>t_max = 100 / L_B</code> sekunder). Skärmar på telefoner och bildskärmar — även vid maximal ljusstyrka — hamnar i praktiken alltid i <b>RG0 (undantagna, utan begränsningar)</b>. Den standarden gäller långt intensivare källor (svetsbågar, vissa projektorer, industriella lysdioder), inte konsumentskärmar.',
  'doc.ch3.norms.p3.html': '<b>Påverkan på dygnsrytmen och sömnen — CIE S 026.</b> Det här är det fenomen man vanligen menar (en skärm på kvällen ”väcker”) — men det är ingen skada på ögat, utan en påverkan på den biologiska klockan genom näthinnans ganglieceller (ipRGC), känsligast kring 480 nm. Standarden CIE S 026:2018 definierar enheten <b>melanopisk lux (melanopic EDI)</b>. Det närmaste en ”officiell” vetenskaplig samsyn är artikeln av Brown med medförfattare (<i>PLOS Biology</i>, 2022), som rekommenderar ungefärligt: på kvällen &lt; 10 melanopiska lux, under dagen &gt; 250. Det är rekommendationer från sömnforskare, inte ett rättsligt krav.',
  'doc.ch3.norms.p4.html': '<b>WHO.</b> Världshälsoorganisationen publicerar inga egna, självständiga exponeringsgränser för blått ljus — när det gäller säkerhet vid optisk strålning hänvisar den till ICNIRP (ovan). Det enda konkreta WHO-dokument med egen text om skärmar är <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i> (2019) — men det gäller den <b>tid</b> som tillbringas vid en skärm, inte ljusets färg eller styrka: ingen skärm före 1 års ålder, högst 1 timme för 2–4 år. För vuxna har WHO ingen lika preciserad vägledning i siffror.',
  'doc.ch3.norms.p5.html': '<b>Därför hjälper inget av det ändå till att kalibrera appen:</b> båda standardfamiljerna (IEC/ICNIRP och CIE) kräver en fullständig spektralfördelning och kalibrerad radians i en känd mätgeometri — precis det som en telefon inte kan leverera genom en webbläsare (se avsnittet ”En telefonkamera mot en spektrometer” ovan). Det finns ingen omräkning av typen ”33 % blåandel = X melanopiska lux”, så trösklarna i den här appen <b>återger ingen säkerhetsstandard</b> (WHO, IEC, ICNIRP eller CIE — för den här indikatorn finns det helt enkelt ingen). Standardvärdena för blåandelens trösklar är däremot härledda ur verkliga färgtemperaturer hos ljus och ur den ofta upprepade, praktiska rekommendationen om varmt ljus på kvällen — en fastare grund än en enkel avrundning, men fortfarande ingen formell standard (hela härledningen finns i kapitel 4). Du kan alltid ändra dem till dina egna i inställningarna.',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': 'Färgzonerna och var trösklarna kommer ifrån',
  'doc.ch4.zones.p1.html': 'Båda storheterna har egna, oberoende inställbara trösklar (vyn ”Övervakning” → ”Inställningar för zontrösklar”, längst ned på sidan) — 33 %/66 % på den ena betyder inte samma sak som på den andra (se kapitel 2 ovan). Det är <b>blåandelen</b> som avgör färgen i teckenförklaringen under diagrammen och i tabellen med mätvärden:',
  'doc.ch4.zones.li1.html': '<b>Grön — säker:</b> varmt eller neutralt ljus, ögonen vilar.',
  'doc.ch4.zones.li2.html': '<b>Gul — måttlig:</b> en märkbar förskjutning mot blått, värt att ta pauser.',
  'doc.ch4.zones.li3.html': '<b>Röd — skadlig:</b> starkt blått ljus, tydligt tröttande för ögonen vid längre exponering (särskilt på kvällen).',
  'doc.ch4.zones.p2.html': '<b>Var just de här talen kommer ifrån.</b> <b>B-kanalens ljusstyrka</b> har ingen naturlig referenspunkt — ett rimligt tröskelvärde beror helt på hur ljus den scen du filmar är (det är ett mått på ljusstyrka, inte på färg). Standardvärdena 33 %/66 % är fortfarande en godtycklig utgångspunkt här — prova dig fram till den vanliga ljusstyrkan på din egen skärm och i din omgivning.',
  'doc.ch4.zones.p3.html': '<b>Blåandelen</b> har standardtrösklar härledda ur verkliga färgtemperaturer hos ljus (fysik, inte avrundning), inte ur någon säkerhetsstandard — någon sådan standard finns inte för den här storheten (kapitel 3). Referenspunkterna:',
  'doc.ch4.zones.li4.html': '<b>~4000K</b> (”varmvitt”, en typisk LED-lampa) → ungefär <b>26 %</b> blåandel. Ljus som är varmare än så (en lägre färgtemperatur) ligger i det område som allmänt rekommenderas på kvällen av verktyg som f.lux eller Night Shift — därav den nedre tröskeln.',
  'doc.ch4.zones.li5.html': '<b>6500K (D65)</b>, standardvitpunkten för de flesta telefon- och bildskärmar från fabrik — ungefär <b>33 %</b>. Från det värdet och uppåt börjar det område där rekommendationer om att begränsa blått ljus typiskt ges — därav den övre tröskeln.',
  'doc.ch4.zones.p4.html': '<b>Ett viktigt förbehåll:</b> hur ”blått” ljuset är beror inte på tiden på dygnet, men rekommendationerna om att begränsa blått ljus gäller egentligen bara <b>kvällen och natten</b> — under dagen är exponering för kallt, blått ljus (även solljus) normal, och till och med bra för dygnsrytmen. En röd zon mitt på dagen när du tittar på en vanlig, oförändrad skärm betyder ingen verklig fara — samma ljus på kvällen är däremot värt att begränsa.',
  'doc.ch4.zones.p5.html': 'Trösklarna för de två storheterna är helt oberoende — att ändra den ena påverkar inte den andra. Ändrade trösklar <b>sparas på den här enheten och i den här webbläsaren</b> mellan gångerna du öppnar appen (lokalt; ingenting skickas någonstans) — knappen ”Start” återställer dem inte till standardvärdena.',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': 'Därför ser förhandsvisningen olika ut på olika enheter',
  'doc.ch5.devices.p1.html': '<b>Webbläsaren mot telefonens egen kameraapp.</b> När du öppnar kameraappen som följde med telefonen lägger tillverkaren (till exempel Xiaomi) egna, skyddade algoritmer på direktbilden — HDR i realtid, digital uppljusning i svagt ljus, utjämning. En webbsida får genom webbläsaren en betydligt ”råare” ström från kameran (funktionen <code>getUserMedia</code>), utan någon av de förbättringarna — den kommer alltså som regel att se plattare och mörkare ut än den inbyggda kameran, oavsett telefon.',
  'doc.ch5.devices.p2.html': '<b>Olika möjligheter att styra kameran.</b> Hur mycket kontroll över exponering och vitbalans webbläsaren över huvud taget får av systemet beror på den enskilda telefonen, kameradrivrutinen och versionen av Chrome eller WebView — vissa enheter (typiskt datorer med en USB-kamera) rapporterar bara full automatik, andra (en del Android-telefoner) rapporterar ytterligare, mer avancerade lägen. En tidigare version av den här appen försökte växla till manuell exponering där telefonen tillät det, utan att sätta något bestämt värde — vilket på en del telefoner frös bilden vid en slumpmässig, mörk exponering från ögonblicket då kameran startade. Det var ett fel i koden (sedan rättat), ingen skillnad i enheterna — men det visar väl hur lätt beteendet kan skilja sig mellan enheter, när till och med samma kodrad slår till bara på en del av dem.',
  'doc.ch5.devices.p3.html': '<b>Olika sensorer och bildbehandling (ISP).</b> Även med identisk kod och samma scen har olika telefonmodeller sensorer av olika kvalitet och tillverkarens automatik olika inställd — den ena träffar exponeringen i svagt ljus snabbare och säkrare än den andra. Tillsammans med att indikatorerna i den här appen är <b>relativa</b> (se kapitel 3) betyder det: jämför resultaten (och hur förhandsvisningen ser ut) på samma telefon över tid, inte mellan olika modeller eller enheter.'
});
