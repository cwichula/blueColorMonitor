/* docs/v1/i18n/hu.js — słownik WŁASNY wersji v1, węgierski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka. Kolejność jest treścią umowy: plik wersji dokłada się do tego samego
 * obiektu i może nadpisać dowolny klucz wspólny — nigdy odwrotnie.
 *
 * DLACZEGO TEN SŁOWNIK JEST SAMOWYSTARCZALNY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar w app.js, własne
 * dwie wielkości zamiast siedmiu i własne nazwy stref („Biztonságos” zamiast
 * wspólnego „Rendben”). Dlatego wszystko, co v1 pokazuje, stoi TUTAJ — także
 * klucze, które przypadkiem brzmią tak samo jak wspólne. Zestaw kluczy jest
 * dokładnie taki sam jak w pl.js tego katalogu — pilnuje tego
 * docs/shared/i18n/keys.test.js.
 *
 * TERMINOLOGIA wzięta ze słownika wspólnego docs/shared/i18n/hu.js i z v5, żeby
 * ta sama rzecz nie nazywała się w v1 inaczej niż w pozostałych wersjach:
 *   kék arány (udział niebieskiego), jelenet fényereje (jasność sceny),
 *   színhőmérséklet (temperatura barwowa), küszöb (próg), zóna (strefa),
 *   leolvasás (odczyt), mérés (sesja pomiarowa), előzmények (historia).
 * Nazw pozostałych pięciu wielkości warstwy wspólnej tu NIE MA — v1 ich nie
 * mierzy. Własne pojęcia tej wersji to B-csatorna fényereje (jasność kanału B)
 * i számlap (gałka); każde ma jeden odpowiednik w całym pliku.
 * NAZWY STREF są własne dla v1 (biztonságos / mérsékelt / káros) — mówią
 * o świetle, a nie o stanie aplikacji. Wersja plakatowa (zone.badge.*) jest
 * osobnym kluczem, a nie zapisem wielkimi literami przez CSS.
 *
 * REJESTR: forma „ty” (nyomd meg, tartsd), tak jak w docs/shared/i18n/hu.js
 * i w v5 — bez urzędowego „Ön”.
 *
 * ZAPIS: cudzysłowy „ ” (U+201E … U+201D); apostrofu ASCII w napisach nie ma
 * i być nie może — rozerwałby napis w pojedynczych cudzysłowach. Symbole
 * jednostek (%, K, ×, Hz), identyfikatory i nazwy formatów (CSV) bez zmian.
 * Skróty czasu za warstwą wspólną: „mp” (sekunda), „p” (minuta), „ó”
 * (godzina).
 *
 * LICZEBNIKI: węgierski ma dwie kategorie CLDR (one, other), ale rzeczownik po
 * liczebniku zostaje w liczbie pojedynczej („5 leolvasás”), więc obie formy
 * brzmią tak samo. To nie jest niedopatrzenie. Wyjątek świadomy: count.points
 * niesie końcówkę narzędnika („{n} százalékponttal”), bo jego jedyne użycie to
 * report.change.more/less — po węgiersku stoi tam przypadek -val/-vel, a nie
 * mianownik.
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
window.I18nData['hu'] = Object.assign(window.I18nData['hu'] || {}, {

  /* ---- aplikacja ----
     Nazwa własna zapisana zgodnie z regułą ruchomą: „káros fény” + „monitor”
     daje wyraz zbyt długi, żeby pisać go łącznie, stąd łącznik. */

  'app.name': 'Károsfény-monitor',
  'app.description': 'A kamerával méri, milyen erős a kék szín a képernyőn, és jól olvasható diagramon mutatja meg, zónákkal: biztonságos, mérsékelt, káros.',

  /* ---- wybór języka ---- */

  'language.label': 'Nyelv',
  'language.help': 'Az egész alkalmazás nyelve. Minden nyelv már ezen az eszközön van — semmi sem töltődik le, és semmi nem kerül ki sehová.',
  'language.auto': 'Az eszköz szerint',

  /* ---- nawigacja ---- */

  'nav.aria': 'Főmenü',
  'nav.tabsAria': 'Alkalmazásnézetek',
  'nav.announce': 'Képernyő: {screen}',
  'nav.camera': 'Kamera',
  'nav.monitoring': 'Monitorozás',
  'nav.support': 'Támogatás',
  'nav.more': 'Továbbiak',
  'nav.docs': 'Dokumentáció',
  'nav.about': 'Az alkalmazásról és kapcsolat',
  'nav.settings': 'Figyelmeztetési küszöbök',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← Vissza',
  'action.back.aria': 'Vissza az előző képernyőre',
  'action.openDocs': 'Ugrás a dokumentációhoz',
  'action.exportCsv': 'CSV exportálása',
  'action.delete': 'Törlés',
  'action.closeNotification': 'Értesítés bezárása',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref: „Biztonságos / Mérsékelt / Káros”, a nie
     wspólne „Rendben / Figyelem / Kritikus”. Wersja plakatowa (zone.badge.*)
     jest osobnym kluczem, a nie zapisem wielkimi literami przez CSS: tureckie
     „i” i greckie akcenty nie znoszą automatycznej zamiany. */

  'zone.good': 'Biztonságos',
  'zone.warning': 'Mérsékelt',
  'zone.critical': 'Káros',
  'zone.none': 'Nincs adat',

  'zone.badge.good': 'BIZTONSÁGOS',
  'zone.badge.warning': 'MÉRSÉKELT',
  'zone.badge.critical': 'KÁROS',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'B-csatorna fényereje',
  'metric.raw.unitLabel': 'B-csatorna fényereje (%)',
  'metric.share.name': 'Kék arány',
  'metric.share.longName': 'A fény kék aránya',
  'metric.share.unitLabel': 'Kék arány (%)',
  'stat.overallBrightness': 'A jelenet általános fényereje',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': 'Kamera előnézete',
  'camera.pressStart': 'Nyomd meg a „Start” gombot.',
  'camera.start': 'Start',
  'camera.stop': 'Stop',
  'camera.switch': 'Kamera váltása',
  'camera.error': 'A kamerát nem sikerült elindítani. Ellenőrizd a böngésző kameraengedélyét, és próbáld újra. ({message})',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': 'Aktuális leolvasások',
  'disclaimer.short': 'Tájékoztató jellegű eredmény. Ez nem orvostechnikai eszköz.',
  'disclaimer.more': 'Bővebben',

  /* ---- wykresy ---- */

  'chart.aria': 'Diagramok az idő függvényében',
  'chart.title': 'Diagramok az idő függvényében (utolsó {seconds} mp)',
  'chart.empty': 'Indítsd el a kamerát a diagram megjelenítéséhez',
  'chart.axis.past': '-{seconds}mp',
  'chart.axis.now': 'most',
  'chart.raw.aria': 'A B-csatorna fényerejének diagramja az idő függvényében, jelölt biztonságos, mérsékelt és káros zónával',
  'chart.share.aria': 'A fény kék arányának diagramja az idő függvényében, jelölt biztonságos, mérsékelt és káros zónával',

  /* ---- tabela odczytów ---- */

  'table.show': 'Megjelenítés táblázatként',
  'table.hide': 'Táblázat elrejtése',
  'table.caption': 'Legutóbbi leolvasások (a legújabb felül)',
  'table.col.time': 'Idő',
  'table.col.zone': 'Zóna',

  /* ---- ustawienia progów ---- */

  'settings.title': 'Zónaküszöbök beállítása',
  'settings.boundary.critical': 'Sárga / piros határ:',
  'settings.boundary.warning': 'Zöld / sárga határ:',

  /* ---- historia i raport (features.js) ---- */

  'history.title': 'Előzmények és jelentés',
  'history.rangeAria': 'Előzmények időtartománya',
  'history.unavailable': 'Az előzményadatok átmenetileg nem érhetők el.',
  'history.empty': 'Ebben a tartományban nincs mentett leolvasás. Indítsd el a mérést — az előzmények maguktól gyűlnek.',
  'history.savedReadings': 'Mentett leolvasások: {count}. Az idő megoszlása zónánként:',
  'history.zoneLine': '{zone}: {percent}% ({readings})',

  'range.1h': '1 ó',
  'range.24h': '24 ó',
  'range.7d': '7 nap',
  'range.30d': '30 nap',

  'report.dailyTitle': 'Napi jelentés',
  'report.empty': 'A jelentés akkor jelenik meg, ha a kiválasztott tartományban lesznek mentett leolvasások.',
  'report.dailyCaption': 'A zónákban töltött idő aránya, napról napra',
  'report.col.day': 'Nap',
  'report.col.week': 'Hét',
  'report.col.readings': 'Leolvasások',
  'report.compare.day': 'Napi összehasonlítás: {day} — az idő {percent}%-a a káros zónában, {change}',
  'report.compare.dayPending': 'A napi összehasonlítás a mérések második napja után jelenik meg.',
  'report.compare.week': 'Heti összehasonlítás: {week} — az idő {percent}%-a a káros zónában, {change}',
  'report.compare.weekPending': 'A heti összehasonlítás a mérések második hete után jelenik meg.',
  'report.change.same': 'ugyanannyi, mint {other}.',
  'report.change.more': '{points} több, mint {other}.',
  'report.change.less': '{points} kevesebb, mint {other}.',
  'report.peak': 'A legtöbb leolvasás a káros zónában {from} és {to} között született.',
  'report.peak.none': 'Ebben a tartományban nem mentődött leolvasás a káros zónában.',
  'report.weeklyTitle': 'Heti jelentés',
  'report.weeklyEmpty': 'A heti jelentés akkor jelenik meg, ha a kiválasztott tartományban lesznek mentett leolvasások.',
  'report.weeklyCaption': 'A zónákban töltött idő aránya, hétről hétre',
  'report.weekLabel': '{week}. hét ({year})',
  'report.footnote': 'A számok a kiválasztott tartományban mentett leolvasások arányát mutatják, nem a pontos expozíciós időt.',

  /* ---- profile progów ---- */

  'profiles.title': 'Küszöbprofilok',
  'profiles.empty': 'Még nincs mentett profilod.',
  'profiles.itemActive': '{name} (aktív)',
  'profiles.applyAria': 'A(z) {name} profil alkalmazása',
  'profiles.deleteAria': 'A(z) {name} profil törlése',
  'profiles.applied': 'A(z) „{name}” profil alkalmazva.',
  'profiles.deleted': 'A(z) „{name}” profil törölve.',
  'profiles.saved': 'A(z) „{name}” profil mentve.',
  'profiles.namePlaceholder': 'Profil neve (például Este)',
  'profiles.saveLabel': 'A jelenlegi küszöbök mentése profilként',
  'profiles.saveBtn': 'Profil mentése',
  'profiles.needName': 'Add meg a profil nevét.',
  'profiles.limit': {
    one: 'Legfeljebb {n} profilt menthetsz. Törölj egyet, hogy újat vehess fel.',
    other: 'Legfeljebb {n} profilt menthetsz. Törölj egyet, hogy újat vehess fel.'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku też — ale musi
     zostać bezpieczna dla systemu plików: bez ukośników, dwukropków i bez
     węgierskich znaków diakrytycznych. */

  'csv.header': 'ido;b_csatorna_szazalek;kek_arany_szazalek;jelenet_fenyereje_szazalek;zona',
  'csv.filename': 'fenymonitor-{stamp}.csv',
  'csv.empty': 'Nincs exportálható leolvasás. Indítsd el a mérést, és próbáld újra.',
  'csv.done': '{readings} exportálva CSV-fájlba.',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut. Po węgiersku stoi tam „{n} perce”
     (czas trwania), a nie mianownik z count.minutes — i w każdym z trzydziestu
     języków przypadek może wypaść inaczej. */

  'alert.exposure': {
    one: 'Küszöbriasztás: a leolvasás {n} perce a káros zónában van. Fontold meg a szünetet, vagy csökkentsd a képernyő kék arányát.',
    other: 'Küszöbriasztás: a leolvasás {n} perce a káros zónában van. Fontold meg a szünetet, vagy csökkentsd a képernyő kék arányát.'
  },

  'session.title': 'A legutóbbi mérés összefoglalása',
  'session.line': 'Mérési idő: {duration}. Mentett leolvasások: {count}.',
  'session.zoneLine': '{zone}: a mérés idejének {percent}%-a.',
  'session.endedAt': 'Az összefoglaló a {time} időpontban befejezett mérésre vonatkozik.',
  'session.toast': 'A mérés befejeződött: {duration}, {readings}, az idő {percent}%-a a káros zónában.',

  'duration.seconds': '{n} mp',
  'duration.minutesSeconds': '{minutes} p {seconds} mp',

  /* ---- liczebniki ----
     Węgierski ma dwie kategorie CLDR: one i other. Rzeczownik po liczebniku
     zostaje w liczbie pojedynczej, więc obie formy są takie same — formę
     wybiera Intl.PluralRules('hu'), nie nasza reguła. count.points niesie
     końcówkę narzędnika, bo jego jedyne użycie (report.change.more/less)
     wymaga po węgiersku przypadka -val/-vel. */

  'count.readings': { one: '{n} leolvasás', other: '{n} leolvasás' },
  'count.points': {
    one: '{n} százalékponttal',
    other: '{n} százalékponttal'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': 'Továbbiak',
  'more.section.settings': 'BEÁLLÍTÁSOK',
  'more.section.help': 'SÚGÓ',
  'more.thresholds.title': 'Figyelmeztetési küszöbök',
  'more.thresholds.sub': 'Állítsd be a biztonságos, a mérsékelt és a káros zóna határait.',
  'more.docs.title': 'Dokumentáció',
  'more.docs.sub': 'Hogyan működik a mérés, mértékegységek, szabványok és zónák.',
  'more.about.title': 'Az alkalmazásról és kapcsolat',
  'more.about.sub': 'Verzió, adatvédelem és kapcsolat.',
  'more.free': 'Az alkalmazás teljes egészében ingyenes.',
  'more.supportLink': 'Önkéntesen támogathatod.',
  'more.version': '{version} verzió · Minden funkció elérhető fiók és fizetés nélkül',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': 'Az alkalmazásról és kapcsolat',
  'about.version': '{version} verzió',
  'about.what.title': 'Mi ez az alkalmazás',
  'about.what.p1': 'A {app} a telefon kamerájával méri, mennyi kék fényt rögzít az érzékelő, és két számlapon, valamint zónákkal ellátott diagramokon mutatja meg. Minden funkció — a mérés, az előzmények, a jelentések, a küszöbprofilok, a küszöbriasztás, a CSV-exportálás és a dokumentáció — mindenki számára elérhető, fiók és fizetés nélkül.',
  'about.what.p2': 'Az alkalmazás „úgy, ahogy van” érhető el, tájékoztató célra. A mérés eredménye tájékoztató jellegű, és nem szolgál egészségügyi döntések alapjául.',
  'about.privacy.title': 'Adatvédelem és adatok',
  'about.privacy.p1': 'A kamera képét kizárólag a te eszközöd elemzi, és soha nem küldjük el semmilyen kiszolgálóra. Nem hozunk létre fiókokat, és nem gyűjtjük az adataidat. A küszöbbeállítások, a profilok és a mérési előzmények kizárólag ennek az eszköznek és ennek a böngészőnek a tárolójába kerülnek.',
  'about.privacy.p2': 'Az alkalmazás nem jelenít meg hirdetéseket, és nem szólal meg a hálózaton. Az egyetlen kivétel a „Támogatás” képernyő gombja: ha megnyomod, a böngésző külső oldalt nyit meg új lapon. Semmi nem történik addig, amíg ezt magad meg nem teszed.',
  'about.contact.title': 'Kapcsolat',
  'about.contact.p1': 'Észrevételek, hibák és javaslatok: [E-MAIL]. Válaszolunk, amint tudunk — ezt a projektet munka után tartjuk fenn.',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': 'Támogatás',
  'support.free.title': 'Minden elérhető',
  'support.free.text': 'Az egész alkalmazás ingyenes: a mérés, az előzmények és a jelentések, a küszöbprofilok, a riasztás, a CSV-exportálás és a dokumentáció. Minden azonnal működik, fiók nélkül, korlátok nélkül és internet nélkül.',
  'support.why': 'A {app} munka után készül. Ha hasznodra válik, meghívhatsz egy kávéra. Ez segít életben tartani az alkalmazást és továbbfejleszteni — javítani a mérésen, bővíteni a dokumentációt és újabb telefonokon ellenőrizni.',
  'support.nothing': 'Az adomány semmit nem old fel. Nincs jobb és nincs rosszabb változat — a támogatás után az alkalmazás pontosan ugyanúgy működik. Az egyetlen különbség az, hogy a szerző tudja: valakinek hasznára vált.',
  'support.button': 'Hívj meg egy kávéra',
  'support.button.aria': 'Hívj meg egy kávéra — az adományozási profilt nyitja meg új lapon',
  'support.pending': 'Az adományozási profil még nincs bekötve. Amint meglesz, ezen a helyen áll majd a gomb. Addig nincs teendő — az alkalmazás amúgy is teljes egészében ingyenes.',
  'support.privacy': 'A gomb külső oldalt (például a Buy Me a Coffee-t) nyit meg új böngészőlapon. Ez az egyetlen pillanat, amikor bármi elhagyja ezt az eszközt. A kamera képe és minden mérésed itt marad — sehová nem küldjük el, sem a kattintás előtt, sem utána.',
  'support.privacyPending': 'Amint a cím elérhető lesz, a gomb megnyomása külső oldalt (például a Buy Me a Coffee-t) nyit meg új böngészőlapon. Ez lesz az egyetlen pillanat, amikor bármi elhagyja ezt az eszközt. A kamera képe és minden mérésed itt marad — sehová nem küldjük el.',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': 'Dokumentáció',

  'disclaimer.title': 'Ez nem orvostechnikai eszköz',
  'disclaimer.body.docs': 'Ez az alkalmazás nem orvostechnikai eszköz. Nem szolgál semmilyen betegség diagnosztizálására, kezelésére vagy megelőzésére. A telefon kamerájával végzett mérés eredményei tájékoztató jellegűek, és nem helyettesítik az orvosi vizsgálatot vagy az orvos tanácsát. A szem egészségével kapcsolatos kérdésekben fordulj orvoshoz vagy optometristához. Az alkalmazás zónaküszöbei semmilyen biztonsági szabványt nem képeznek le — a részletek a 3. fejezetben.',
  'disclaimer.body.about': 'Ez az alkalmazás nem orvostechnikai eszköz. Nem szolgál semmilyen betegség diagnosztizálására, kezelésére vagy megelőzésére. A telefon kamerájával végzett mérés eredményei tájékoztató jellegűek, és nem helyettesítik az orvosi vizsgálatot vagy az orvos tanácsát. A szem egészségével kapcsolatos kérdésekben fordulj orvoshoz vagy optometristához. Az alkalmazás zónaküszöbei semmilyen biztonsági szabványt nem képeznek le — a részletek a dokumentáció 3. fejezetében.',

  'doc.toc.aria': 'A dokumentáció tartalomjegyzéke',
  'doc.toc.title': 'Tartalom',

  'doc.ch1.title': 'Gyors kezdés',
  'doc.ch2.title': 'Hogyan működik a mérés',
  'doc.ch3.title': 'Mértékegységek és szabványok',
  'doc.ch4.title': 'Zónák és küszöbök',
  'doc.ch5.title': 'Eltérések az eszközök között',

  'doc.ch1.heading': '1. Gyors kezdés',
  'doc.ch2.heading': '2. Hogyan működik a mérés',
  'doc.ch3.heading': '3. Mértékegységek és szabványok',
  'doc.ch4.heading': '4. Zónák és küszöbök',
  'doc.ch5.heading': '5. Eltérések az eszközök között',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': 'Hogyan mérj pontosabban',
  'doc.ch1.tips.li1': 'A „Kamera” képernyőn (az alsó sáv első gombja) nyomd meg a „Start” gombot, és irányítsd a hátsó kamerát arra a képernyőre vagy fényforrásra, amelyet ellenőrizni szeretnél.',
  'doc.ch1.tips.li2': 'Menj át a „Monitorozás” képernyőre (az alsó sáv második gombja) — felül egyszerre látod mindkét számlapot, alatta pedig (görgess) az időbeli változás diagramjait. A mérés a háttérben fut, függetlenül attól, melyik képernyőt nézed éppen.',
  'doc.ch1.tips.li3': 'Tartsd a telefont állandó távolságban a képernyőtől (például 15–20 cm), és a mérés közben ne változtass a környezeti világításon.',
  'doc.ch1.tips.li4': 'A hátsó kamerát használd — kevésbé agresszív automatikus korrekciói vannak, mint az elülsőnek.',
  'doc.ch1.tips.li5': 'Az eredményeket relatív mutatóként (%) kezeld, ne abszolút fizikai mértékegységként — egymáshoz hasonlítsd őket (például bekapcsolt és kikapcsolt éjszakai móddal).',
  'doc.ch1.tips.li6': 'A beállításokban igazítsd a zónaküszöböket a saját képernyőd fényerejéhez (4. fejezet).',

  'doc.ch1.fonts.title': 'Nagy betűk és számlapok — mindig',
  'doc.ch1.fonts.p1': 'Az egész alkalmazás nagy, jól olvasható betűket és teljes méretű számlapokat használ, hogy a gyengénlátók (és mindenki más) külön beállítások nélkül tudják leolvasni az adatokat. A „Monitorozás” képernyőn mindkét számlap együtt elfér egy képernyőn, görgetés nélkül — az időbeli változás diagramjai rögtön alattuk vannak, egy görgetésnyire.',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': 'A telefon kamerája és a spektrométer',
  'doc.ch2.spectro.p1.html': 'Annak valódi méréséhez, hogy „mennyi a káros kék fény”, a fényt hullámhosszakra kell bontani — ezt teszi a <b>spektrométer</b>: prizma vagy diffrakciós rács tucatnyi vagy több száz keskeny sávra (például 1–5 nm-enként) bontja a fényt, és mindegyikben külön méri az optikai teljesítményt. Csak egy ilyen teljes színképi eloszlásból számíthatók ki olyan mértékegységek, mint a lux, a lumen vagy a kékfény-veszélyességi függvénnyel súlyozott besugárzottság.',
  'doc.ch2.spectro.p2.html': '<b>A telefon kamerája ebből semmit nem csinál.</b> Három széles szűrője van (Bayer: R/G/B), és mindegyik a hullámhosszak széles, egymást átfedő tartományából gyűjti a fényt — a „kék csatorna” nem a 435–440 nm körüli keskeny sáv (a retinát fenyegető veszély csúcsa), hanem nagyjából 400–570 nm, zölddel keverve. Ehhez jön még a demozaikolás, az automatikus expozíció, az automatikus fehéregyensúly és az sRGB gammatömörítés — ezek közül a böngésző egyetlen lépést sem enged teljesen kikapcsolni. Ennek eredményeként a képpont értéke, amelyet a JavaScript lát, nincs lineáris kapcsolatban az érzékelőre eső tényleges optikai teljesítménnyel. Ez alapvető hardveres korlát, nem ennek az alkalmazásnak a hibája.',

  'doc.ch2.raw.title': '1. diagram — A B-csatorna fényereje',
  'doc.ch2.raw.what.html': '<b>Mit mutat:</b> a kép mintavételezett részletén a kék (B) csatorna önmagában vett átlagos fényerejét, 0–255 skálán, %-ra átszámítva.',
  'doc.ch2.raw.algo.html': '<b>Az algoritmus:</b>',
  'doc.ch2.raw.step1': 'Másodpercenként 5 alkalommal veszünk egy képkockát a kamerából.',
  'doc.ch2.raw.step2': 'Kivágjuk a képkocka középső 60%-át (így elkerüljük a kép szélét és az oldalról érkező fényfátyolt).',
  'doc.ch2.raw.step3': 'A kivágott részletet 32×32 képpontos rácsra kicsinyítjük (elég pontos, és sokkal gyorsabb, mint teljes felbontáson számolni — ez a gyengébb hardveren, például belépő szintű Xiaomi- vagy Ulefone-telefonokon számít).',
  'doc.ch2.raw.step4': 'A rács mind az 1024 képpontjának B-értékét átlagoljuk.',
  'doc.ch2.raw.step5.html': '<code>eredmény = átlagos_B ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>Miért hagytuk meg:</b> ez a legegyszerűbb, közvetlen leolvasása annak, „mennyi kék jelet fog egyáltalán az érzékelő”. A gyengéje az, hogy összekeveri a fényerőt a színnel — egy nagyon világos, de semlegesen fehér jelenet is magas eredményt ad, pedig nem különösebben „kék”. Ezért mutatjuk mellette a 2. diagramot.',

  'doc.ch2.share.title': '2. diagram — A fény kék aránya',
  'doc.ch2.share.what.html': '<b>Mit mutat:</b> a rögzített összes fény (R+G+B) hány százalékát teszi ki a kék összetevő — vagyis a szín eltolódását a hideg felé, függetlenül attól, mennyire világos a jelenet.',
  'doc.ch2.share.algo.html': '<b>Az algoritmus:</b> ugyanaz az 1–4. lépés, mint fent, de a puszta B helyett ezt számoljuk:',
  'doc.ch2.share.formula.html': '<code>eredmény = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': 'A semleges fehér (R≈G≈B) körülbelül <b>33%</b>-ot ad. A melegebb, vörösebb fény kevesebbet. Az erősen kék többet, egészen a ~100%-os határig a szinte tisztán kék fénynél.',
  'doc.ch2.share.why.html': '<b>Miért ez a „káros kék” pontosabb mérőszáma:</b> ugyanaz az elv, amelyen az éjszakai mód és a Night Shift típusú szűrők működnek — a <b>szín</b> számít, nem a fényerő. Egy nagyon világos, de semleges képernyő nem kap tévesen káros jelölést; egy letompított, de erősen kék igen. Ezért ez a mérőszám vezérli a zóna színét a leolvasások táblázatában.',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': 'Miért nem lux vagy lumen',
  'doc.ch3.units.p1.html': 'A <b>lumen (lm)</b> a fényforrás által kibocsátott teljes fényáramot írja le — ez magának a forrásnak a tulajdonsága, nem azé, ami egy adott pontba érkezik. A <b>lux (lx)</b> már egy pont megvilágítása (lm/m²) — közelebb áll ahhoz, amiről szó van, de továbbra is <b>fotometriai</b> egység: a színképet az emberi szem fényerő-érzékenységi görbéjével (V(λ)) súlyozza, nem a kékfény-veszélyességi görbével. A veszély valódi méréséhez egy harmadik, szűkebb egység kell: a színképileg súlyozott besugárzottság <b>W/m²</b>-ben (IEC 62471 szabvány, az érzékenység csúcsa 435–440 nm körül), ehhez pedig spektrométer szükséges — lásd a fenti szakaszt.',
  'doc.ch3.units.p2.html': 'Még ha be is érnénk a luxszal: a telefon külső, kalibrált fényérzékelő nélkül nem képes megbízhatóan meghatározni. A telefon beépített fényérzékelője (ahol egyáltalán van ilyen) egyébként is a ház <b>ellenkező oldalán</b> méri a fényt, mint amerre a hátsó kamerával a képernyőre célzol — vagyis a hátad mögötti fényt mérné, nem a képernyőét. Ezért ahelyett, hogy olyan egységben találgatnánk egy számot, amely úgysem lenne megbízható, egy őszintén megnevezett <b>relatív mutatót (%)</b> mutatunk — ez ugyanazon a telefonon, ugyanolyan körülmények között (például bekapcsolt és kikapcsolt éjszakai móddal) értelmes összehasonlításra való, nem abszolút értéknek.',

  'doc.ch3.norms.title': 'Vannak globális szabványok a biztonsági küszöbökre?',
  'doc.ch3.norms.p1.html': 'Röviden: <b>nincs a kamera egy csatornájának százalékában kifejezett szabvány</b> — ez egyáltalán nem olyan egység, amelyben bármit is szabályoznának. A kék fényre vonatkozó valódi szabványok léteznek, de más mennyiségeket mérnek, más egységekben, és más jelenségre vonatkoznak, mint amire általában gondolunk, amikor azt mondjuk: „a kék fény fárasztja a szemet”.',
  'doc.ch3.norms.p2.html': '<b>A retina heveny fotokémiai károsodása — IEC 62471 / ICNIRP.</b> Az egyetlen ténylegesen szabályozott „kékfény-veszély” — lámpákra és világítási rendszerekre vonatkozó szabvány, amelyet az ICNIRP (International Commission on Non-Ionizing Radiation Protection) iránymutatásai támogatnak. A forrásokat RG0–RG3 kockázati csoportokba sorolja a B(λ) veszélyességi függvénnyel súlyozott sugársűrűség alapján, <b>W·m⁻²·sr⁻¹</b>-ben, az expozíciós idő korlátjával (<code>t_max = 100 / L_B</code> másodperc). A telefon- és monitorképernyők — még maximális fényerőn is — a gyakorlatban mindig az <b>RG0 (mentesített, korlátozás nélküli)</b> csoportba esnek. Ez a szabvány sokkal erősebb forrásokra vonatkozik (hegesztőívek, egyes projektorok, ipari LED-ek), nem a fogyasztói képernyőkre.',
  'doc.ch3.norms.p3.html': '<b>Hatás a cirkadián ritmusra és az alvásra — CIE S 026.</b> Ez az a jelenség, amelyről általában szó van (az esti képernyő „felébreszt”) — de ez nem a szem károsodása, hanem a biológiai órára gyakorolt hatás a retina ganglionsejtjein (ipRGC) keresztül, amelyek 480 nm körül a legérzékenyebbek. A CIE S 026:2018 szabvány határozza meg a <b>melanopikus lux (melanopic EDI)</b> egységet. A legközelebbi „hivatalos” tudományos konszenzus Brown és szerzőtársai közleménye (<i>PLOS Biology</i>, 2022), amely tájékoztató jelleggel azt ajánlja: este &lt; 10 melanopikus lux, nappal &gt; 250. Ezek alváskutatók ajánlásai, nem jogszabály.',
  'doc.ch3.norms.p4.html': '<b>A WHO.</b> Az Egészségügyi Világszervezet nem ad ki saját, önálló expozíciós határértékeket a kék fényre — az optikai sugárzás biztonsága ügyében az ICNIRP-hez utal (lásd fent). A WHO egyetlen konkrét, saját dokumentuma a képernyők tárgyában a <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i> (2019) — ez azonban a képernyő előtt töltött <b>időről</b> szól, nem a fény színéről vagy erősségéről: 1 éves kor alatt semennyi képernyő, 2–4 éves kor között legfeljebb 1 óra. Felnőttekre a WHO-nak nincs ugyanilyen konkrét számszerű iránymutatása.',
  'doc.ch3.norms.p5.html': '<b>Miért nem segít ez mégsem az alkalmazás kalibrálásában:</b> mindkét szabvány (IEC/ICNIRP és CIE) teljes színképi eloszlást és ismert mérési elrendezésben kalibrált sugársűrűséget kíván — pontosan azt, amit a telefon a böngészőn keresztül nem tud nyújtani (lásd a fenti „A telefon kamerája és a spektrométer” szakaszt). Nincs olyan átváltás, hogy „33% kék arány = X melanopikus lux”, ezért ennek az alkalmazásnak a küszöbei <b>semmilyen biztonsági szabványt nem képeznek le</b> (WHO, IEC, ICNIRP vagy CIE — erre a mutatóra egyszerűen nem létezik ilyen). A kék arány alapértelmezett küszöbértékei viszont a fény valódi színhőmérsékleteiből és a széles körben ismételt, gyakorlati ajánlásból — este meleg fény — vannak levezetve: szilárdabb alap, mint a puszta kerekítés, de még mindig nem hivatalos szabvány (a teljes levezetés: 4. fejezet). A beállításokban bármikor sajátra cserélheted őket.',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': 'A színzónák és honnan jönnek a küszöbök',
  'doc.ch4.zones.p1.html': 'Mindkét mérőszámnak saját, egymástól függetlenül állítható küszöbei vannak („Monitorozás” képernyő → „Zónaküszöbök beállítása”, az oldal alján) — a 33%/66% az egyiken nem ugyanazt jelenti, mint a másikon (lásd a fenti 2. fejezetet). A diagramok alatti jelmagyarázat és a leolvasások táblázatának színéről a <b>kék arány</b> dönt:',
  'doc.ch4.zones.li1.html': '<b>Zöld — biztonságos:</b> meleg vagy semleges fény, a szem pihen.',
  'doc.ch4.zones.li2.html': '<b>Sárga — mérsékelt:</b> érzékelhető eltolódás a kék felé, érdemes szüneteket tartani.',
  'doc.ch4.zones.li3.html': '<b>Piros — káros:</b> erősen kék fény, hosszabb expozíció mellett erősen fárasztja a szemet (különösen este).',
  'doc.ch4.zones.p2.html': '<b>Honnan jönnek ezek a konkrét számok.</b> A <b>B-csatorna fényerejének</b> nincs természetes viszonyítási pontja — az értelmes küszöbérték kizárólag attól függ, mennyire világos az a jelenet, amelyet felveszel (ez a fényerő mértéke, nem a színé). Az alapértelmezett 33%/66% itt még mindig megállapodás szerinti kiindulópont — próbálgatással igazítsd a saját képernyőd, illetve környezeted szokásos fényerejéhez.',
  'doc.ch4.zones.p3.html': 'A <b>kék arány</b> alapértelmezett küszöbei a fény valódi színhőmérsékleteiből vannak levezetve (fizika, nem kerekítés), nem valamilyen biztonsági szabványból — erre a mennyiségre nincs ilyen szabvány (3. fejezet). A viszonyítási pontok:',
  'doc.ch4.zones.li4.html': '<b>~4000K</b> („meleg fehér”, tipikus LED-izzó) → körülbelül <b>26%</b> kék arány. Az ennél melegebb fény (alacsonyabb színhőmérséklet) az a tartomány, amelyet estére széles körben ajánlanak az f.lux vagy a Night Shift típusú eszközök — innen az alsó küszöb.',
  'doc.ch4.zones.li5.html': '<b>6500K (D65)</b>, a legtöbb telefon- és monitorképernyő gyári fehérpontja — körülbelül <b>33%</b>. Ettől az értéktől felfelé kezdődik az a tartomány, amelyben jellemzően a kék fény korlátozását ajánlják — innen a felső küszöb.',
  'doc.ch4.zones.p4.html': '<b>Fontos megszorítás:</b> az, hogy mennyire „kék” a fény, nem függ a napszaktól, a kék fény korlátozására vonatkozó ajánlások viszont tulajdonképpen csak az <b>estére és az éjszakára</b> vonatkoznak — nappal a hideg, kék fény (a napfényt is beleértve) megszokott, sőt a cirkadián ritmus szempontjából hasznos is. A nap közepén, szokásos, változatlan képernyőt nézve a piros zóna nem jelent valódi veszélyt — ugyanaz a fény este már érdemes a korlátozásra.',
  'doc.ch4.zones.p5.html': 'A két mérőszám küszöbei teljesen függetlenek — az egyik módosítása nem hat a másikra. A megváltoztatott küszöböket az alkalmazás <b>ezen az eszközön és ebben a böngészőben megjegyzi</b> a következő megnyitásokra is (helyben, semmi nem kerül ki sehová) — a „Start” gomb nem állítja vissza őket az alapértelmezettre.',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': 'Miért néz ki másképp az előnézet a különböző eszközökön',
  'doc.ch5.devices.p1.html': '<b>A böngésző és a gyári kameraalkalmazás.</b> Amikor a telefonra gyárilag telepített kamerát nyitod meg, a gyártó (például a Xiaomi) saját, védett algoritmusokat tesz hozzá az élő előnézethez — valós idejű HDR-t, digitális fényerő-növelést gyenge fényben, simítást. A weboldal a böngészőn keresztül sokkal „nyersebb” képfolyamot kap a kamerából (a <code>getUserMedia</code> függvény), ezen javítások egyike nélkül — így alapvetően laposabbnak és sötétebbnek fog látszani, mint a gyári kamera, telefontól függetlenül.',
  'doc.ch5.devices.p2.html': '<b>Eltérő kameravezérlési lehetőségek.</b> Az, hogy a böngésző mennyi vezérlést kap egyáltalán a rendszertől az expozíció és a fehéregyensúly fölött, az adott telefontól, a kamera illesztőprogramjától és a Chrome vagy a WebView verziójától függ — egyes eszközök (jellemzően USB-kamerás számítógépek) csak a teljes automatikát jelentik, mások (egyes androidos telefonok) további, fejlettebb módokat is. Az alkalmazás korábbi változata megpróbált kézi expozíciós módra váltani ott, ahol a telefon ezt engedte, konkrét érték beállítása nélkül — ez egyes telefonokon a kamera indulásának pillanatából származó véletlenszerű, sötét expozícióra fagyasztotta a képet. Ez hiba volt a kódban (már javítva), nem mértékegységbeli különbség — de jól mutatja, milyen könnyen eltérhet a viselkedés az eszközök között, ha még ugyanaz a kódsor is csak egy részükön lép működésbe.',
  'doc.ch5.devices.p3.html': '<b>Eltérő érzékelők és képfeldolgozás (ISP).</b> Azonos kód és ugyanaz a jelenet mellett is különböző minőségű érzékelői vannak az egyes telefonmodelleknek, és a gyártói automatika hangolása is eltérő — az egyik gyorsabban és találóbban választ expozíciót gyenge fényben, mint a másik. Ez azzal együtt, hogy az alkalmazás mutatói <b>relatívak</b> (lásd a 3. fejezetet), azt jelenti: az eredményeket (és az előnézet kinézetét) ugyanazon a telefonon, időben hasonlítsd össze, ne különböző modellek vagy eszközök között.'
});
