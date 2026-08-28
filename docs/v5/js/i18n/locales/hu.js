/* Monitor Światła v5 — słownik węgierski.
 *
 * Powstał z pl.js (treść) i en.js (terminologia, rejestr). NIE JEST KALKĄ:
 * zdania przełożono na naturalną węgierszczyznę. Zachowane zostało to, co
 * niesie znaczenie: liczby, progi, jednostki, nazwy wstawek i — co do treści —
 * zastrzeżenia medyczne oraz zdania o prywatności. Tych ostatnich nie wolno
 * osłabiać ani wzmacniać.
 *
 * FORMA OSOBOWA: drugą osobą liczby pojedynczej (tegezés) — tak mówi do
 * użytkownika większość węgierskich aplikacji mobilnych, a aplikacja o sobie
 * mówi w pierwszej osobie liczby mnogiej („mérjük”, „nem küldjük”).
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych):
 *   kék arány, jelenet fényereje, színhőmérséklet, cirkadián hatás
 *   (w opisie: melanopikus arány), villódzás, egyenletesség, látáskomfort.
 * STREFY: biztonságos / mérsékelt / káros — przymiotniki, bo wchodzą w zdanie
 * „zóna: {zone}” i „átlagosan {zone}”.
 *
 * LICZEBNIKI: węgierski ma w CLDR dwie formy (`one`, `other`), ale po
 * liczebniku rzeczownik zawsze stoi w liczbie pojedynczej („3 mérés”, nie
 * „3 mérések”) — dlatego obie formy są tu celowo identyczne. To nie jest
 * niedoróbka: dopisanie do `other` końcówki -k dałoby napis błędny.
 *
 * DATY: kolejność jest odwrotna niż po polsku — węgierski pisze „aug. 30.”
 * i „2026. aug. 30.”, od największej jednostki do najmniejszej. Nazwy wstawek
 * zostają te same, zmienia się wyłącznie ich miejsce we wzorcu.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Szöveg {name} helyőrzővel'   — napis zwykły,
 *   'klucz.kropkowany': { one, other }                — forma zależna od liczby.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Fénymonitor',
  'app.description': 'Fénymonitor — a kamerával hét mennyiséget mér a körülötted lévő fényből. Minden számítás ezen az eszközön történik; semmi nem megy ki a hálózatra.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Fénymonitor',
  'app.skipToContent': 'Ugrás a tartalomra',
  'app.nav.aria': 'Fő navigáció',
  'app.noscript.title': 'Ehhez az alkalmazáshoz JavaScript kell',
  'app.noscript.text': 'A teljes mérés ebben a böngészőlapban zajlik: a JavaScript olvassa be a kamera képkockáit, és azokból számítja ki a fény hét mennyiségét. Nélküle nincs mivel mérni. Engedélyezd a JavaScriptet ehhez az oldalhoz, és nyisd meg újra — továbbra sem megy ki semmi a hálózatra.',

  'nav.measure': 'Mérés',
  'nav.history': 'Előzmények',
  'nav.tools': 'Eszközök',
  'nav.support': 'Támogatás',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Mérés folyik',
  'shell.live.aria': 'Mérés folyik. {metric}: {value}. Vissza a mérés képernyőjére.',
  'shell.live.metricFallback': 'Vezető mennyiség',
  'shell.action.fallback': 'Képernyőművelet',

  'shell.loadFail.title': 'A(z) „{screen}” képernyőt nem sikerült betölteni',
  'shell.loadFail.text': 'Valószínűleg hiányzik néhány fájl az eszköz tárolójából. Csatlakozz a hálózathoz, és töltsd újra az oldalt.',
  'shell.fatal.title': 'Valami elromlott',
  'shell.fatal.text': 'Az alkalmazás nem tudta összeállítani a képernyőt. Az oldal újratöltése általában elég — a mentett mérések és beállítások a helyükön maradnak.',
  'shell.fatal.reload': 'Oldal újratöltése',
  'shell.boot.failTitle': 'Az alkalmazás nem tudott elindulni',
  'shell.boot.failText': 'A keretprogram nem indult el. Töltsd újra az oldalt — a mentett mérések és beállítások a helyükön maradnak.',
  'shell.background.error': 'Valami elromlott a háttérben',
  'shell.background.action': 'Újratöltés',
  'shell.update.title': 'Új verzió érhető el',
  'shell.update.action': 'Újratöltés',

  'onboarding.title': 'Mielőtt elkezded',
  'onboarding.lead': 'A Fénymonitor a kamerával nézi a körülötted lévő fényt, és hét mennyiséget számít belőle — a kék aránytól a látáskomfortig.',
  'onboarding.privacy': 'A kép soha nem hagyja el ezt az eszközt: nincs szerver, nincs fiók, és nincs mit feltölteni. Mind a hét mennyiség azonnal működik, bejelentkezés és díj nélkül.',
  'onboarding.honesty': 'Ez tájékozódás, nem mérőműszer és nem orvosi vizsgálat. Amit nem lehet megmérni, azt nem mutatjuk meg — szám helyett gondolatjelet látsz.',
  'onboarding.start': 'Kezdjük',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Alkalmaz',
  'overlay.toast.close': 'Üzenet bezárása',
  'overlay.sheet.label': 'Ablak',
  'overlay.sheet.close': 'Bezárás',
  'overlay.dialog.confirm': 'Megerősítés',
  'overlay.dialog.cancel': 'Mégse',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'Mégse',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'Mérés',

  'measure.intro.aria': 'Mérés indítása',
  'measure.intro.headline': 'Nézd meg, milyen fényben vagy',
  'measure.intro.lead': 'A kamera megmutatja, mennyi kék van az éppen rád eső fényben — és hogy a napnak ebben a szakában nem sok-e ez.',
  'measure.intro.start': 'Mérés indítása',
  'measure.intro.hint': 'A böngésző engedélyt kér a kamera használatához. A mérés az engedély megadása után azonnal elindul.',
  'measure.intro.privacy': 'A kamera képét ezen az eszközön dolgozzuk fel, és soha nem hagyja el. Egyetlen képkockát sem küldünk el, nem tárolunk és nem osztunk meg.',

  'measure.live.aria': 'Mérés folyamatban',
  'measure.badge.starting': 'Indítás',
  'measure.badge.paused': 'Szüneteltetve',
  'measure.badge.running': 'Mérés folyik',
  'measure.stale': 'Várakozás a képre — az előnézet megáll, amíg az alkalmazás a háttérben van.',
  'measure.crop': 'A képkocka közepét mérjük — a kép szélességének és magasságának megjelölt {percent}%-át.',
  'measure.facing.front': 'előlapi kamera',
  'measure.facing.back': 'hátlapi kamera',

  'measure.boot.title': 'Kamera indítása…',
  'measure.boot.text': 'Ha a böngésző engedélyt kér, add meg — kép nélkül nincs mit mérni. Az engedély csak erre az oldalra vonatkozik, és később visszavonhatod.',
  'measure.boot.cancel': 'Mégse',

  'measure.hold': 'Az értékek befagyasztva. A kamera tovább dolgozik, de semmi nem kerül az előzményekbe és az átlagokba.',
  'measure.gridHint': 'Válassz egy csempét, hogy az a mennyiség kerüljön a nagy mutatóra.',

  'measure.stop': 'Leállítás',
  'measure.pause': 'Szünet',
  'measure.resume': 'Folytatás',
  'measure.flip.aria': 'Kameraváltás',
  'measure.flip.toBack': 'Váltás a hátlapi kamerára',
  'measure.flip.toFront': 'Váltás az előlapi kamerára',

  'measure.fail.aria': 'Kamerahiba',
  'measure.fail.headline': 'A kamera nem indult el',
  'measure.fail.retry': 'Próbáld újra',
  'measure.fail.back': 'Vissza',
  'measure.fail.savedSession': 'A megszakítás előtti munkamenet ({duration}) mentve az előzményekbe.',
  'measure.error.fallback': 'A kamerát nem sikerült elindítani.',

  'measure.summary.aria': 'A munkamenet összegzése',
  'measure.summary.title': 'A munkamenet összegzése',
  'measure.summary.paused': 'ebből {duration} szünet',
  'measure.summary.nothingMeasured': 'Egyetlen mennyiség sem gyűjtött mérést — a kamera a teljes munkamenet alatt nem látott fényt.',
  'measure.summary.note': 'Az átlagok csak a szüneten kívüli mintákat számolják. A meg nem mért mennyiségek kimaradnak, nem nullaként szerepelnek.',
  'measure.summary.nearThreshold': 'Küszöbhöz legközelebb',
  'measure.summary.worstPoint': 'Leggyengébb pont',
  'measure.summary.averageZone': 'átlagosan {zone}',
  'measure.summary.tooShort': 'A munkamenet {duration} volt — túl rövid ahhoz, hogy magától az előzményekbe kerüljön. Kézzel elmentheted.',
  'measure.summary.again': 'Új mérés',
  'measure.summary.save': 'Mentés az előzményekbe',
  'measure.summary.saved': 'Mentve az előzményekbe',
  'measure.summary.savedToast': 'A munkamenet mentve az előzményekbe.',
  'measure.summary.close': 'Bezárás',

  'measure.method.title': 'Hogyan mérjük',
  'measure.method.p1': 'Az alkalmazás másodpercenként tízszer mintázza a kamera képét, és a képkocka középső {percent}%-ából számolja a mennyiségeket — az előnézetben látható keret pontosan ezt a területet jelöli.',
  'measure.method.p2': 'A telefon kamerájának három széles csatornája van, és saját, automatikus expozíciója és fehéregyensúlya. A fény arányait látja, nem a színképét.',
  'measure.method.p3': 'A kék arány, a fényerő, a villódzás és az egyenletesség az, amit a kamera valóban mér. A színhőmérséklet és a cirkadián hatás nyíltan vállalt közelítés, az sRGB alapszínekből számolva.',
  'measure.method.p4': 'A villódzás csak négy hertz alatt látszik. A hálózati 100 Hz messze kívül esik a mintavételezés hatókörén, és soha nem jelenik meg leolvasott értékként.',
  'measure.method.p5': 'Ezek közül egyik szám sem fotometriai mérés vagy orvosi eredmény. A kamera képe nem hagyja el az eszközt.',
  'measure.method.ok': 'Értem',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'A kamera indítása megszakítva.',
  'measure.announce.stoppedNoSamples': 'A mérés leállt. Egyetlen minta sem gyűlt össze.',
  'measure.announce.stopped': 'A mérés leállt. A munkamenet összegzése kész.',
  'measure.announce.interrupted': 'A mérés megszakadt. A munkamenet összegzése kész.',
  'measure.announce.paused': 'A mérés szünetel. Az értékek befagyasztva.',
  'measure.announce.resumed': 'A mérés folytatódik.',
  'measure.announce.switchedFront': 'Átváltás az előlapi kamerára. Új munkamenet kezdődik.',
  'measure.announce.switchedBack': 'Átváltás a hátlapi kamerára. Új munkamenet kezdődik.',
  'measure.announce.lead': 'Vezető mennyiség: {metric}.',
  'measure.announce.cameraError': 'Kamerahiba. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'A fény a teljes munkamenet alatt a biztonságos tartományban maradt — hagyd a lámpát úgy, ahogy van, és ellenőrizd újra sötétedés után, amikor másik fényforrás dolgozik.',
  'measure.advice.share.evening': 'A kék arány átlagosan {value} volt — kapcsold éjszakai módba a képernyőket, és oltsd le a mennyezeti világítást, egyetlen meleg fényű lámpát hagyva az asztal magasságában.',
  'measure.advice.share.day': 'A kék arány átlagosan {value} volt — nappal ez elfogadható, de állítsd be, hogy a képernyő két órával lefekvés előtt automatikusan meleg módba váltson.',
  'measure.advice.brightness': 'A képkocka túlexponált volt (átlagosan {value}) — menj távolabb a fényforrástól, vagy vedd lejjebb a mért képernyő fényerejét, mert ekkora expozíciónál a többi mennyiség is veszít a pontosságából.',
  'measure.advice.kelvin.evening': 'A színhőmérséklet átlagosan {value} körül maradt — sötétedés után menj 3000 K alá: kapcsold a lámpát meleg módba, vagy tegyél bele 2700 K-es izzót.',
  'measure.advice.kelvin.day': 'A színhőmérséklet átlagosan {value} körül maradt — nappalra ez jó, éberséget segítő fehér, de este ugyanezt a lámpát állítsd 2700 K-re.',
  'measure.advice.melanopic.evening': 'A cirkadián hatás átlagosan {value} volt — a lefekvés előtti két órában menj 0,50 × alá: halványítsd le a fő fényt, és a mennyezet helyett az asztal magasságából világíts.',
  'measure.advice.melanopic.day': 'A cirkadián hatás átlagosan {value} volt — ebben az órában ez az adag segít, de este cseréld ezt a fényforrást gyengébbre és melegebbre.',
  'measure.advice.flicker': 'A villódzás átlagosan {value} volt — ez rendszerint fényerőszabályzó vagy alacsonyra vett háttérvilágítás: vidd a képernyő fényerejét 40% fölé, vagy cseréld a szabályzót olyanra, amelyik nem PWM-mel működik.',
  'measure.advice.uniformity': 'A fény egyenetlenül esett (átlagosan {value}) — állítsd a lámpát az asztal oldalára, és tegyél a szemközti oldalra egy második, gyengébb fényforrást egyetlen erős pont helyett.',
  'measure.advice.comfort': 'A látáskomfort átlagosan {value} lett — kezdd egyetlen változtatással: felezd meg a fő fényforrás fényerejét, és csak utána foglalkozz a fény színével.',
  'measure.advice.default': 'Változtass egy dolgot a világításon, és mérd meg újra — két munkamenet összevetése többet mond, mint egyetlen leolvasás.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'Előzmények',
  'history.action.export': 'Előzmények exportálása',

  'history.metricGroup.aria': 'Mennyiség kiválasztása',
  'history.announce.metric': 'Mennyiség: {metric}',
  'history.rangeGroup.aria': 'Időtartomány',
  'history.range.aria': 'Az elmúlt {range}',

  'history.stats.title': 'A tartomány statisztikái',
  'history.stats.head': '{metric}\u00A0—\u00A0az elmúlt {range}',
  'history.stats.note': 'Abból számolva, ami a diagramon látszik. A mérés nélküli idő nem számít bele — nem teszünk a helyére nullát.',
  'history.stat.min': 'Minimum',
  'history.stat.avg': 'Átlag',
  'history.stat.max': 'Maximum',
  'history.trend.up': 'emelkedik ebben a tartományban',
  'history.trend.flat': 'nincs egyértelmű változás',
  'history.trend.down': 'csökken ebben a tartományban',
  'history.trend.none': 'nincs mihez hasonlítani',

  'history.sessions.title': 'Mérési munkamenetek',
  'history.sessions.count': '{sessions}, a legújabbtól',
  'history.sessions.empty': 'Még nincs munkamenet',
  'history.sessions.hint': 'A munkamenet a mérés leállításakor mentődik.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'tartomány: {range}',
  'history.session.noMeasure': 'nincs mérés',

  'history.data.title': 'Adatok',
  'history.data.subtitle': 'Az előzmények kizárólag ezen az eszközön tárolódnak.',
  'history.export.csv': 'CSV exportálása',
  'history.export.json': 'JSON exportálása',
  'history.export.ok': 'A fájl mentésre kész',
  'history.export.fail': 'A fájlt nem sikerült előkészíteni. Privát módban és más alkalmazásba ágyazott ablakban a böngésző letiltja a mentést — nyisd meg az oldalt egy szokásos lapon.',
  'history.export.sheet.title': 'Előzmények exportálása',
  'history.export.sheet.text': 'A CSV táblázatkezelőben nyílik meg (pontosvesszővel elválasztva, tizedesvesszővel). A JSON mindent megőriz, a munkamenetek listájával és a mérési hézagokkal együtt.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Előzmények törlése',
  'history.clear.title': 'Törlöd az előzményeket?',
  'history.clear.text': 'Ezzel törlődik {points} és {sessions}. Ez nem vonható vissza — ha meg akarod tartani az adatokat, előbb exportáld őket.',
  'history.clear.confirm': 'Törlés',
  'history.clear.announce': 'Az előzmények törölve.',
  'history.clear.toast': 'Előzmények törölve',

  'history.empty.title': 'Még nincs mit mutatni',
  'history.empty.text': 'Az előzmények mérés közben telnek meg — másodpercenként egy pont. Minden ezen az eszközön marad.',
  'history.empty.action': 'Ugrás a méréshez',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 perc',
  'range.5m': '5 perc',
  'range.1h': '1 óra',
  'range.24h': '24 óra',
  'range.7d': '7 nap',
  'range.30d': '30 nap',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Dátum és idő',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'Az eszköz tárolója megtelt — az új mérések már nem mentődnek.',
  'storage.blocked': 'A böngésző nem engedi menteni az előzményeket — az adatok eltűnnek, ha bezárod a lapot.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Eszközök',
  'tools.action.about': 'A mérésről',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Nyelv',
  'tools.language.subtitle': 'Alapértelmezés szerint az alkalmazás az eszköz nyelvét követi; az ebből a listából választott nyelv azonnal érvénybe lép, és megmarad ebben a böngészőben.',
  'tools.language.aria': 'A felület nyelve',
  'tools.language.system': 'Auto',
  'tools.language.announce': 'A felület nyelve: {language}.',

  'tools.appearance.title': 'Megjelenés',
  'tools.appearance.theme.title': 'Téma',
  'tools.appearance.theme.desc': 'Az „Auto” a rendszer beállítását követi.',
  'tools.appearance.theme.aria': 'Téma',
  'tools.theme.system': 'Auto',
  'tools.theme.light': 'Világos',
  'tools.theme.dark': 'Sötét',
  'tools.appearance.accent.title': 'Kiemelőszín',
  'tools.appearance.accent.desc': 'A gombok, a kijelölések és a csúszkák színe.',
  'tools.appearance.accent.aria': 'Kiemelőszín',
  'tools.appearance.textScale.title': 'Szövegméret',
  'tools.appearance.textScale.desc': 'Az egész felületet nagyítja, nem csak a feliratokat.',
  'tools.appearance.textScale.aria': 'Szövegméret',
  'tools.appearance.density.title': 'Sűrűség',
  'tools.appearance.density.desc': 'A tömör elrendezésbe több tartalom fér egy képernyőre.',
  'tools.appearance.density.aria': 'Az elrendezés sűrűsége',
  'tools.density.comfortable': 'Kényelmes',
  'tools.density.compact': 'Tömör',
  'tools.appearance.motion.title': 'Kevesebb mozgás',
  'tools.appearance.motion.desc': 'Kikapcsolja az animációkat és a mutató finom befutását. A rendszerbeállítást ettől függetlenül tiszteletben tartjuk.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Óceán',
  'accent.violet': 'Ibolya',
  'accent.amber': 'Borostyán',
  'accent.mint': 'Menta',
  'accent.rose': 'Rózsa',

  'tools.thresholds.title': 'Küszöbök',
  'tools.thresholds.subtitle': 'Melyik értéktől mondja az alkalmazás, hogy „mérsékelt”, és melyiktől, hogy „káros”. Az alapértelmezett küszöbök a mi javaslatunk, nem szabvány — állítsd őket magadhoz.',
  'tools.thresholds.warn': 'Figyelmeztetési küszöb',
  'tools.thresholds.crit': 'Riasztási küszöb',
  'tools.thresholds.warn.aria': 'Figyelmeztetési küszöb — {metric}',
  'tools.thresholds.crit.aria': 'Riasztási küszöb — {metric}',
  'tools.thresholds.reset': 'Alapértelmezett',
  'tools.thresholds.reset.aria': 'Alapértelmezett küszöbök visszaállítása: {metric}',
  'tools.thresholds.moved': '{threshold} áthelyezve ide: {value}.',
  'tools.thresholds.resetAll': 'Minden küszöb visszaállítása',
  'tools.thresholds.resetAll.title': 'Visszaállítod az alapértelmezett küszöböket?',
  'tools.thresholds.resetAll.text': 'Mind a hét mennyiség visszatér az alkalmazás által javasolt küszöbökhöz. A mérési előzmények érintetlenek maradnak.',
  'tools.thresholds.resetAll.confirm': 'Visszaállítás',
  'tools.thresholds.resetAll.cancel': 'Marad',
  'tools.thresholds.resetAll.toast': 'A küszöbök visszaálltak az alapértelmezettre',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': '{warn} fölött',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} és az alatt',
  'tools.zoneRange.goodBelow': '{warn} alatt',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} és a fölött',

  'tools.calibration.title': 'Kalibrálás',
  'tools.calibration.subtitle': 'Azoknak, akiknek van mihez hasonlítaniuk.',
  'tools.calibration.intro': 'Két telefon ugyanarra a lámpára fordítva kicsit más számokat mutat — minden érzékelőnek saját színezete van. Ha van kéznél olyan mérés, amelyben megbízol, itt finoman feljebb vagy lejjebb hangolhatod az egyes képcsatornákat. A szorzók minden számítás előtt hatnak, így mind a hét mennyiséget egyszerre változtatják.',
  'tools.calibration.neutral': 'Nincs mihez hasonlítanod? Hagyd 1,00-en — ez a gyári beállítás, és semmit nem ront el.',
  'tools.calibration.forward': 'A változtatás mostantól érvényes. Az előzményekben már szereplő mérések olyanok maradnak, amilyenek a mentés pillanatában voltak — nem számoljuk újra őket, mert az utólag írná át az adatokat.',
  'tools.calibration.reset': 'Kalibrálás nullázása',
  'tools.calibration.reset.toast': 'Kalibrálás nullázva',
  'tools.calibration.channel.r': 'Vörös csatorna',
  'tools.calibration.channel.g': 'Zöld csatorna',
  'tools.calibration.channel.b': 'Kék csatorna',
  'tools.calibration.channel.aria': '{channel} — kalibrációs szorzó',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'Mérés',
  'tools.measurement.wake.title': 'A képernyő maradjon bekapcsolva',
  'tools.measurement.wake.desc': 'Mérés közben a képernyő ébren marad. Az akkumulátor ilyenkor gyorsabban merül.',
  'tools.measurement.wake.unsupported': 'Ez a böngésző nem engedi ébren tartani a képernyőt.',
  'tools.measurement.haptics.title': 'Rezgés',
  'tools.measurement.haptics.desc': 'Rövid visszajelzés indításkor, leállításkor és mennyiségváltáskor.',
  'tools.measurement.haptics.unsupported': 'Ez az eszköz nem jelez rezgőmotort.',

  'tools.about.title': 'A mérésről',
  'tools.about.subtitle': 'Mit számol pontosan a hét mennyiség mindegyike, és hol ér véget ennek a módszernek a megbízhatósága.',
  'tools.about.scale': 'Skála: {min} és {max} között.',
  'tools.about.threshold': '{warn} értéktől figyelmeztetünk, {crit} értéktől riasztunk.',
  'tools.about.thresholdInvert': '{warn} alatt figyelmeztetünk, {crit} alatt riasztunk.',
  'tools.about.limitsHead': 'Mire nem képes ez a mérés',
  'tools.about.limit.spectrum.title': 'A kamera nem úgy látja a színeket, mint egy mérőműszer',
  'tools.about.limit.spectrum.text': 'A telefon kamerájának három csatornája van: vörös, zöld és kék. A fénymérő műszer ezeket több tucat keskeny sávra bontja. Amit itt látsz, ebből a három számból származik — ésszerű módon, de mégiscsak számítás, nem mért színkép.',
  'tools.about.limit.exposure.title': 'A kamera magától szabályozza a fényerőt',
  'tools.about.limit.exposure.text': 'Ha az ablakra fordítod a telefont, a kamera sötétíti a képet, hogy ne exponálja túl. A „jelenet fényereje” ilyenkor csökken, pedig a szobában semmi nem változott. Ezért ezt az értéket egyetlen felvételen belül hasonlítsd össze, ne szobák között.',
  'tools.about.limit.flicker.title': 'A lassú kamera nem kapja el a gyors villódzást',
  'tools.about.limit.flicker.text': 'Másodpercenként {hz} alkalommal nézzük meg a képet. A {nyquist} alkalomnál gyorsabb lüktetés egy ilyen mérésben lassabbnak látszhat a valóságosnál, vagy teljesen eltűnhet — a hálózati villódzás pedig épp ilyen gyors. Ha az alkalmazás elkap valamit, tekintsd annak jelének, hogy „itt lüktet valami”, ne mért frekvenciának.',
  'tools.about.limit.medical.title': 'Ez nem orvosi vizsgálat és nem orvosi tanács',
  'tools.about.limit.medical.text': 'Az alkalmazás segít észrevenni, hogy a körülötted lévő fény hideg, erős vagy nyugtalan, és javaslatot tesz, mit lehet ezzel kezdeni. Nem mond ítéletet az egészségedről, és nem helyettesíti sem az orvossal folytatott beszélgetést, sem a szakműszerrel végzett mérést.',
  'tools.about.privacy': 'Minden számítás a te eszközödön történik. A kamera képét sehová nem küldjük el és nem mentjük el — csak a kiszámolt számok kerülnek a tárolóba.',

  'tools.data.title': 'Adatok',
  'tools.data.subtitle': 'Minden ennek a böngészőnek a tárolójában van, és innen sehová nem kerül.',
  'tools.data.summary.empty': 'Még nincs egyetlen mentett mérés sem.',
  'tools.data.summary': 'A tárolóban: {points} és {sessions}.',
  'tools.data.export.csv': 'CSV exportálása',
  'tools.data.export.json': 'JSON exportálása',
  'tools.data.clear': 'Előzmények törlése',
  'tools.data.reset': 'Alapértelmezett beállítások',
  'tools.data.reset.title': 'Visszaállítod az alapértelmezett beállításokat?',
  'tools.data.reset.text': 'A megjelenés, a küszöbök, a kalibrálás és a mérési beállítások visszatérnek a kiindulási állapotba. A mérési előzmények érintetlenek maradnak.',
  'tools.data.reset.confirm': 'Visszaállítás',
  'tools.data.reset.toast': 'Alapértelmezett beállítások visszaállítva',
  'tools.data.wipe': 'Minden adat törlése',
  'tools.data.wipe.title': 'Törlöd az alkalmazás összes adatát?',
  'tools.data.wipe.text': 'Eltűnik: a teljes mérési előzmény és a munkamenetek listája, a küszöbeid és a kalibrálásod, valamint a megjelenési beállításaid. Az alkalmazás visszatér az első indításkori állapotába.',
  'tools.data.wipe.note': 'Nincs másolatunk ezekről az adatokról — soha nem hagyták el ezt az eszközt, így nincs honnan visszaállítani őket.',
  'tools.data.wipe.check': 'Megértettem, hogy ez nem vonható vissza',
  'tools.data.wipe.confirm': 'Minden törlése',
  'tools.data.wipe.toast': 'Az alkalmazás összes adata törölve',
  'tools.data.wipe.announce': 'Az alkalmazás összes adata törölve. A beállítások visszaálltak az alapértelmezettre.',
  'tools.data.storage.blocked': 'Ez a böngésző nem engedi, hogy bármit tartósan eltároljunk (privát mód vagy letiltott webhelyadatok). Minden, amit itt beállítasz, eltűnik, ha bezárod a lapot.',
  'tools.data.storage.full': 'A böngésző tárolója megtelt, és az új mérések már nem mentődnek. Az előzmények törlése helyet szabadít fel.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Támogatás',
  'support.free.title': 'Minden elérhető',
  'support.free.lead': 'Mind a hét mennyiség, a teljes előzmény, a küszöbök, a kalibrálás és az exportálás az első indítástól működik — fiók, korlátok és díj nélkül.',
  'support.free.note': 'A mérés teljes egészében ezen az eszközön történik, és hálózat nélkül is működik. Nincs itt jobb változat, amelyet fal mögött tartanánk.',
  'support.why.title': 'Miért kérem',
  'support.why.lead': 'A Fénymonitor munka után készül, nincs mögötte sem hirdetés, sem szponzor, sem cég. A támogatás a javításokra, az új mennyiségekre és a már működő dolgok életben tartására fordított időt fedezi.',
  'support.what.title': 'Mit ad az adomány',
  'support.what.lead': 'Semmit. Az adomány semmit nem old fel — nincs plusz funkció, nincs jelvény a neved mellett, nincs elsőbbség. Amit az alkalmazás tud, azt már most megkapod.',
  'support.what.note': 'Annyi marad belőle, hogy tudom: valakinek hasznára vált. Ez tényleg elég ok.',
  'support.cta.title': 'Ha segíteni szeretnél',
  'support.cta.button': 'Hívj meg egy kávéra',
  'support.cta.nolink': 'Az adományozási profil még nincs bekötve. Amint meglesz, ezen a helyen áll majd egy gomb.',
  'support.cta.privacy': 'Ez a hivatkozás külső oldalt (például a Buy Me a Coffee-t) nyit meg új lapon. Ez az egyetlen pillanat, amikor bármi elhagyja ezt az eszközt — maga a mérés mindig itt marad.',
  'support.cta.privacyFuture': 'Amint a cím a helyére kerül, a gomb külső oldalt (például a Buy Me a Coffee-t) nyitja meg új lapon. Ez lesz az egyetlen pillanat, amikor bármi elhagyja ezt az eszközt — maga a mérés mindig itt marad.',
  'support.cta.note': 'Nincs itt visszaszámlálás, nincsenek emlékeztetők, és nincs magától megnyíló ablak. Ez a kérés csak ezen a lapon várakozik.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'az utolsó perc',
  'gauge.aria': '{metric}: {value}, zóna: {zone}',
  'gauge.aria.note': '{metric}: {value}, zóna: {zone}, {note}',
  'gauge.aria.initial': '{metric}: nincs adat',
  'gauge.value.none': 'nincs adat',
  /* Odczyt słowny z jednostką: „27 százalék”, „1,20 szeres”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'közelítő érték',
  'gauge.note.offScale': 'a skálán kívül',
  'gauge.metric.unknown': 'Ismeretlen mennyiség',

  'chart.aria.label': 'A mérési előzmények diagramja',
  'chart.hint': 'Interaktív diagram. A balra és a jobbra nyíl mozgatja a leolvasó kurzort, a Home és az End a tartomány elejére és végére ugrik, az Escape elrejti a kurzort.',
  'chart.empty.title': 'Nincs adat',
  'chart.empty.text': 'Indítsd el a mérést — a diagram az első leolvasások után jelenik meg.',
  'chart.few.title': 'Túl kevés adat',
  'chart.few.text': 'Egyetlen leolvasásunk van: {value}. A vonalhoz kettő kell.',
  'chart.legend.line': 'mérés',
  'chart.legend.gap': 'hézag a mérésben',
  'chart.aria.head': 'Diagram: {metric}, tartomány: {range}',
  'chart.aria.empty': 'Nincs adat ebben a tartományban.',
  'chart.aria.one': 'Egyetlen leolvasás: {value}.',
  'chart.aria.summary': '{min} és {max} között, átlag {avg}, {points}.',
  'chart.aria.gaps': 'A sorozatban hézagok vannak — akkor nem mértünk.',
  'chart.readout.empty': 'Nincs adat ebben a tartományban.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'Túl kevés adat a diagram megrajzolásához.',
  'chart.readout.hint': 'Húzz végig a diagramon, vagy használd a nyílbillentyűket egyetlen mérés leolvasásához.',
  'chart.time.now': 'most',
  'chart.time.justNow': 'az imént',
  'chart.time.ago': '{duration} ezelőtt',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd „szept.”, najdłuższy węgierski skrót
     miesiąca, i kropka po dniu, bo tak wygląda węgierska data. */
  'chart.sample.ago': '\u221230\u00A0perc',
  'chart.sample.clock': '00:00',
  'chart.sample.date': 'szept.\u00A030.',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'Kék arány',
  'metric.share.short': 'A látott fényből mennyi jut a kék csatornára.',
  'metric.share.help': 'Elválasztja a színt a fényerőtől — ez az az érték, amely megváltozik, amikor bekapcsolod az éjszakai módot.',
  'metric.brightness.name': 'Jelenet fényereje',
  'metric.brightness.short': 'A kamerakép átlagos fényereje.',
  'metric.brightness.help': 'Viszonyszám, nem lux — a kamera automatikus expozíciója alatta elmozdítja.',
  'metric.kelvin.name': 'Színhőmérséklet',
  'metric.kelvin.short': 'Meleg vagy hideg-e a fény.',
  'metric.kelvin.help': '3000 K alatt a fény meleg, és este kíméletesebb. A 6500 K a legtöbb képernyő alapértelmezett fehére.',
  'metric.melanopic.name': 'Cirkadián hatás',
  'metric.melanopic.short': 'Mennyire erősen hat ez a fény a biológiai órára.',
  'metric.melanopic.help': 'A melanopikus arány közelítése. Az 1,00 a semleges nappali fehér; este érdemes 0,50 alá menni.',
  'metric.flicker.name': 'Villódzás',
  'metric.flicker.short': 'A fényforrás láthatatlan lüktetése.',
  'metric.flicker.help': 'Az olcsó fényerőszabályzók és háttérvilágítások lüktetnek. A szem ezt nem látja, de ismert oka a fáradtságnak és a fejfájásnak.',
  'metric.uniformity.name': 'Egyenletesség',
  'metric.uniformity.short': 'Egyenletesen oszlik-e el a fény a képen.',
  'metric.uniformity.help': 'Képernyőn az alacsony érték háttérvilágítás-átszűrődést vagy tükröződést jelent; asztalon rosszul beállított lámpát.',
  'metric.comfort.name': 'Látáskomfort',
  'metric.comfort.short': 'Egyetlen pontszám hat szám helyett.',
  'metric.comfort.help': 'A többi mérést 0–100 közötti pontszámmá fűzi össze, és megmutatja, mi rontja a leginkább. A súlyok a mi szerkesztői megítélésünk, nem szabvány.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'biztonságos',
  'zone.warn': 'mérsékelt',
  'zone.crit': 'káros',
  'zone.none': 'nincs adat',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku („aug. 24.”). */
  'date.month.short.1': 'jan.',
  'date.month.short.2': 'febr.',
  'date.month.short.3': 'márc.',
  'date.month.short.4': 'ápr.',
  'date.month.short.5': 'máj.',
  'date.month.short.6': 'jún.',
  'date.month.short.7': 'júl.',
  'date.month.short.8': 'aug.',
  'date.month.short.9': 'szept.',
  'date.month.short.10': 'okt.',
  'date.month.short.11': 'nov.',
  'date.month.short.12': 'dec.',

  'date.clock': '{hours}:{minutes}',
  /* Węgierska data idzie od największej jednostki do najmniejszej: „aug. 30.”
     i „2026. aug. 30.”. Kolejność wstawek jest więc odwrotna niż po polsku,
     a po każdej liczbie stoi kropka. Nazwy wstawek zostają te same. */
  'date.short': '{month}\u00A0{day}.',
  'date.shortWithYear': '{year}.\u00A0{date}',
  'date.dateTime': '{date} {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0óra',
  'time.duration.hourMinute': '{hours}\u00A0óra {minutes}\u00A0perc',
  'time.duration.hour': '{hours}\u00A0óra',
  'time.duration.minuteSecond': '{minutes}\u00A0perc {seconds}\u00A0mp',
  'time.duration.minute': '{minutes}\u00A0perc',
  'time.duration.second': '{seconds}\u00A0mp',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „az imént”. */
  'time.justNow': 'az imént',
  'time.aMinuteAgo': 'egy perce',
  'time.minutesAgo': '{minutes}\u00A0perce',
  'time.hoursAgo': '{hours}\u00A0órája',
  'time.yesterday': 'tegnap',
  'time.daysAgo': '{days}\u00A0napja',

  /* Formy zależne od liczby. Węgierski ma w CLDR dwie: `one` i `other`, ale po
     liczebniku rzeczownik stoi zawsze w liczbie pojedynczej („3 mérés”) —
     dlatego obie formy są tu celowo identyczne. */
  'time.days.plural': { one: 'nap', other: 'nap' },
  'unit.sample.plural': { one: 'minta', other: 'minta' },
  'unit.measurement.plural': { one: 'mérés', other: 'mérés' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Węgierski dokleja przypadek końcówką, której nie da się dopisać do gotowej
     wstawki — oba klucze zostają, a zdania wokół nich są tak zbudowane, żeby
     wystarczył mianownik. */
  'unit.session.plural': { one: 'munkamenet', other: 'munkamenet' },
  'unit.session.accusative.plural': { one: 'munkamenet', other: 'munkamenet' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy, choć po węgiersku brzmią tak samo — w innych językach już nie. */
  'unit.chartPoint.plural': { one: 'pont', other: 'pont' },
  'unit.point.plural': { one: 'pont', other: 'pont' },
  'unit.kelvin.plural': { one: 'kelvin', other: 'kelvin' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „százalék”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'százalék',
  'unit.spoken.times': 'szeres',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, bez rady,
     co zrobić dalej. Każdy kod ma tu jedno zdanie diagnozy i jedno zdanie
     rady. */
  'camera.error.denied': 'A kamera használatához nem kaptunk engedélyt. Engedélyezd a kamerát ehhez az oldalhoz a böngésző beállításaiban, és próbáld újra.',
  'camera.error.notfound': 'Nem található kamera. Ellenőrizd, hogy van-e az eszközön kamera, és hogy nincs-e kikapcsolva a rendszerben.',
  'camera.error.inuse': 'A kamerát egy másik alkalmazás foglalja. Zárd be azt az alkalmazást vagy lapot, és próbáld újra.',
  'camera.error.insecure': 'A kamera csak HTTPS-en vagy localhoston működik. Nyisd meg ezt az oldalt „https://” kezdetű címen.',
  'camera.error.unsupported': 'Ez a böngésző itt nem teszi elérhetővé a kamerát. Próbáld meg Chrome-ban vagy Safariban, szokásos ablakban — ne más alkalmazásba ágyazott előnézetben.',
  'camera.error.unknown': 'A kamerát nem sikerült elindítani.'
};
