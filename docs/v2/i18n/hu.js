/* docs/v2/i18n/hu.js — słownik WERSJI 2, węgierski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/hu.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: to samo, co w pl.js tego katalogu — układ TEJ wersji: pięć
 * zakładek, dziewięć ekranów nakładkowych, siedem narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej. Zestaw kluczy jest identyczny
 * z pl.js — pilnuje tego docs/shared/i18n/keys.test.js.
 *
 * TERMINOLOGIA: przepisana co do słowa z docs/shared/i18n/hu.js — kék arány,
 * jelenet fényereje, színhőmérséklet, cirkadián hatás (melanopikus arány
 * w opisie), villódzás, egyenletesség, látáskomfort. Dalej: mérés (pomiar),
 * előzmények (historia), leolvasás (odczyt), minta (próbka), küszöb (próg),
 * mennyiség (metryka — tak samo jak w v5), zóna (strefa). Klucze *.nameLower
 * to te same nazwy małą literą: węgierski nie pisze rzeczowników wielką, więc
 * różnica jest wyłącznie w pierwszej literze.
 *
 * REJESTR: druga osoba liczby pojedynczej (tegezés: nyomd meg, tartsd,
 * indítsd el), dokładnie jak w warstwie wspólnej i w v5 — bez urzędowego „Ön”.
 * Cudzysłowy węgierskie „ … ”, przecinek dziesiętny (0,50), skrót sekundy
 * „mp” za warstwą wspólną (unit.second), a nie SI-owe „s”. Apostrofu ASCII
 * w napisach nie ma i być nie może — rozerwałby napis w pojedynczych
 * cudzysłowach.
 *
 * ZASTRZEŻENIA MEDYCZNE i akapity o prywatności przetłumaczone DOKŁADNIE, bez
 * osłabiania i bez dodawania obietnic — to zdania o skutkach prawnych.
 *
 * LICZEBNIKI: węgierski ma dwie kategorie CLDR (one, other), ale rzeczownik po
 * liczebniku zostaje w liczbie pojedynczej („5 minta”, nie „5 minták”) —
 * dlatego obie formy brzmią tak samo. To nie jest niedopatrzenie; kategorii
 * `other` wymaga Intl.PluralRules.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (te same co w pl.js i z tego samego powodu):
 *   'zone.warning'        — wspólne mówi „Figyelem”, ta wersja od zawsze mówi
 *                           „Figyelmeztetés” (i „Figyelmeztetések”
 *                           w podsumowaniu);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi o pomiarach
 *                           w liczbie mnogiej („A mérések”).
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules. Patrz nagłówek docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['hu'] = Object.assign(window.I18nData['hu'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Fénymonitor — a kék fény mérése',
  'app.description': 'Fénymonitor — a fény kék arányának mérése a telefon kamerájával. Hét mennyiség, diagram, előzmények. Minden elérhető, fiók és díj nélkül.',
  'app.skipToContent': 'Ugrás a tartalomra',
  'app.measuring': 'Mérés folyik',
  'app.docsButton': 'Dokumentáció és magyarázatok',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — 2. verzió',

  'nav.aria': 'Fő navigáció',
  'nav.tablistAria': 'Az alkalmazás képernyői',
  'nav.measure': 'Mérés',
  'nav.history': 'Előzmények',
  'nav.tools': 'Eszközök',
  'nav.support': 'Támogatás',
  'nav.more': 'Továbbiak',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Dokumentáció',
  'panel.thresholds': 'Küszöbök és profilok',
  'panel.reports': 'Jelentések',
  'panel.export': 'Adatexport',
  'panel.compare': 'A/B összehasonlítás',
  'panel.calibration': 'Kalibrálás fehér papírral',
  'panel.screenCheck': 'A monitorom ellenőrzése',
  'panel.schedule': 'Ütemezés',
  'panel.alerts': 'Expozíciós riasztások',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Vissza',
  'action.close': 'Bezárás',
  'action.refresh': 'Frissítés',
  'action.apply': 'Alkalmaz',
  'action.delete': 'Törlés',
  'action.hide': 'Elrejtés',
  'action.start': 'Start',
  'action.stop': 'Stop',
  'action.switch': 'Váltás',
  'action.switchAria': 'Kameraváltás: előlapi vagy hátlapi',
  'action.resetDefaults': 'Alapértelmezett visszaállítása',
  'action.reports': 'Jelentések',
  'action.exportCsv': 'CSV exportálása',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Képernyő: {name}',
  'a11y.measureStarted': 'A mérés elindult.',
  'a11y.measureStopped': 'A mérés leállt.',
  'a11y.measureStoppedSummary': 'A mérés leállt. Idő: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'A küszöbprofil alkalmazva.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Megerősítés',
  'dialog.confirm': 'Megerősítem',
  'dialog.cancel': 'Mégse',
  'dialog.infoTitle': 'Tájékoztatás',
  'dialog.ok': 'Értem',

  'help.sheetTitle': 'A mennyiség leírása',
  'help.unit': 'Mértékegység',
  'help.scaleRange': 'A skála tartománya',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'Figyelmeztetés',
  'threshold.crit': 'Kritikus',
  'threshold.warnLabel': 'Figyelmeztetési küszöb',
  'threshold.critLabel': 'Kritikus küszöb',
  'threshold.warnAria': '{name} — küszöb: figyelmeztetés',
  'threshold.critAria': '{name} — küszöb: kritikus',

  /* ==================================================================
     Drobne złożenia liczby, jednostki i nazwy
     ==================================================================
     Wyglądają na zbędne, ale to właśnie one usuwają z kodu sklejanie
     napisów: szyk „wartość jednostka” i nawias po nazwie nie w każdym
     języku wyglądają tak samo. */

  'value.withUnit': '{value} {unit}',
  'metric.withUnit': '{name} ({unit})',
  'range.dash': '{min} – {max}',

  /* ==================================================================
     Ekran Pomiar
     ================================================================== */

  'firstRun.title': 'Hogyan mérj',
  'firstRun.text': 'Nyomd meg a „Start” gombot, irányítsd a telefont megvilágított felületre, és tartsd mozdulatlanul néhány másodpercig. Az előnézeten látható keret azt a részletet mutatja, amelyet az alkalmazás valóban beolvas.',
  'firstRun.close': 'Tipp bezárása',

  'camera.live': 'ÉLŐ',
  'camera.idle': 'A kamera ki van kapcsolva. Nyomd meg a „Start” gombot, irányítsd a telefont megvilágított felületre, és tartsd mozdulatlanul néhány másodpercig.',
  'camera.stopped': 'A mérés leállt. Nyomd meg a „Start” gombot az újbóli méréshez.',

  'error.cameraStart': 'A kamerát nem sikerült elindítani.',
  'error.engineMissing': 'A mérési modul nem töltődött be.',

  'metrics.sevenTitle': 'Hét mennyiség',
  'measure.tilesSub': 'Másodpercenként 5-ször frissül',

  'session.title': 'Ez a munkamenet',
  'session.duration': 'Mérési idő',
  'session.samples': 'Minták száma',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     „Figyelmeztetések” to nie to samo słowo co „Figyelmeztetés” pod suwakiem. */
  'zone.count.good': 'Rendben',
  'zone.count.warning': 'Figyelmeztetések',
  'zone.count.critical': 'Kritikus',

  'note.calibrated': 'A mérés fehér papírral kalibrálva — a csatornák kiegyenlítve.',

  'tile.helpAria': 'Mit jelent: {name}',
  'tile.noMeasurement': 'Nincs mérés',
  'tile.outOfScale': 'A skálán kívül',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Figyelmeztetés',
  'zone.spoken.warning': 'figyelmeztetés',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Időbeli alakulás',
  'history.pickHint': 'Válassz mennyiséget és tartományt',
  'history.metricLabel': 'Mennyiség',
  'history.rangeAria': 'A diagram időtartománya',
  'history.emptyTitle': 'Nincs adat ebben a tartományban',
  'history.emptyText': 'Indíts mérést a Mérés képernyőn — a diagram néhány másodperc alatt megtelik.',
  'history.tableTitle': 'Legutóbbi leolvasások',
  'history.tableHide': 'Táblázat elrejtése',
  'history.tableShow': 'Táblázat megjelenítése',
  'history.tableCaption': 'A mérés legutóbbi leolvasásai, a legújabb legfelül.',
  'history.tableEmpty': 'Nincsenek leolvasások. Indíts mérést a Mérés képernyőn.',

  'table.time': 'Időpont',
  'table.metric': 'Mennyiség',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     dłuższy zapis łamał się na dwie linie. */
  'range.1m': '1 perc',
  'range.1h': '1 óra',
  'range.24h': '24 óra',
  'range.7d': '7 nap',
  'range.30d': '30 nap',

  'chart.now': 'most',
  'chart.countSub': {
    one: '{n} leolvasás a kiválasztott tartományban',
    other: '{n} leolvasás a kiválasztott tartományban'
  },
  'chart.aria': '{name}, tartomány: {range}, {count}, utolsó érték: {value} {unit}.',
  'chart.ariaZone': '{name}, tartomány: {range}, {count}, utolsó érték: {value} {unit}, zóna: {zone}.',
  'chart.ariaEmpty': '{name} — nincs adat a következő tartományban: {range}.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Varázslók és segédfunkciók',
  'tools.note': 'Az eszközök segítenek értelmezni a mérést. Mindegyik azonnal elérhető, maga a mérés pedig tőlük függetlenül működik.',

  'tool.thresholds.sub': 'Mikor gyulladjon ki a figyelmeztetés',
  'tool.compare.sub': 'Melyik a kíméletesebb a két fény közül',
  'tool.calibration.sub': 'Az egyetlen funkció, amely valóban javítja a pontosságot',
  'tool.screenCheck.sub': 'Öt lépés és kész következtetés a képernyőről',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Küszöbök ütemezése”
     kontra „Ütemezés”. Tak było i tak zostaje. */
  'tool.schedule.title': 'Küszöbök ütemezése',
  'tool.schedule.sub': 'Este más küszöbök, anélkül hogy emlékezned kellene rá',
  'tool.alerts.sub': 'Jelzés, ha a kritikus zóna túl sokáig tart',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Beállítások',
  'more.thresholdsSub': 'Mikor gyulladjon ki a figyelmeztetés',
  'more.docsSub': 'Hogyan mérj, és mit nem mond meg ez a mérés',
  'more.appearanceTitle': 'Megjelenés és akadálymentesség',

  'settings.theme': 'Téma',
  'theme.auto': 'A rendszer szerint',
  'theme.light': 'Világos',
  'theme.dark': 'Sötét',

  'settings.textScale': 'Szövegméret',
  'textScale.100': 'Alapértelmezett',
  'textScale.115': 'Nagyobb (115%)',
  'textScale.130': 'Legnagyobb (130%)',

  'settings.contrast': 'Nagyobb kontraszt',
  'settings.contrastSub': 'Erősebb szegélyek és sötétebb kiegészítő szöveg.',
  'settings.sound': 'Riasztási hang',
  'settings.soundSub': 'Rövid jelzés, amikor egy expozíciós riasztás bekapcsol.',
  'settings.vibrate': 'Rezgés riasztáskor',
  'settings.vibrateSub': 'Csak azokon az eszközökön működik, amelyek támogatják.',

  'more.dataTitle': 'Adatok',
  'more.clearHistory': 'Mérési előzmények törlése',
  'more.clearHistorySub': 'Törli a mentett leolvasásokat erről az eszközről. A küszöbök, a profilok és a beállítások megmaradnak.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'Az alkalmazás teljes egészében ingyenes. ',
  'more.supportLink': 'Ha szeretnéd, önkéntesen támogathatod.',

  'dialog.clearHistory.title': 'Törlöd a mentett előzményeket?',
  'dialog.clearHistory.body': {
    one: 'Törlünk {n} mentett mérési pontot erről az eszközről. Ez a művelet nem vonható vissza. A küszöbök, a profilok és a beállítások érintetlenek maradnak.',
    other: 'Törlünk {n} mentett mérési pontot erről az eszközről. Ez a művelet nem vonható vissza. A küszöbök, a profilok és a beállítások érintetlenek maradnak.'
  },
  'dialog.clearHistory.confirm': 'Előzmények törlése',
  'dialog.clearHistory.cancel': 'Marad',

  'toast.historyCleared': 'A mérési előzmények törölve.',
  'toast.screenUnavailable': 'Ez a képernyő ebben a verzióban még nem érhető el.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'Mit mér ez az alkalmazás',
  'docs.leadText': 'A telefon kamerája megvilágított felületet néz, az alkalmazás pedig másodpercenként ötször kiszámolja a képkocka középső részletének R, G és B csatornaátlagát. Ebből a három számból vezeti le a hét mennyiséget.',
  'docs.limitsTitle': 'A módszer határai',
  'docs.limitsText': 'A kamerának három széles színcsatornája, automatikus expozíciója és automatikus fehéregyensúlya van. Nem mér színképet, és nem ismer abszolút értékeket, ezért a fényerő viszonyszám, nem lux. A színhőmérséklet és a cirkadián hatás az sRGB alapszínekből számított közelítés. A {rate} Hz-es mintavétel csak {limit} Hz alatt látja a villódzást — a hálózati 100 Hz elérhetetlen, és az alkalmazás soha nem adja meg eredményként.',

  'note.howTo.repeat.title': 'Ismételd meg a mérést',
  'note.howTo.repeat.text': 'Egyetlen leolvasás pillanatkép. Egy-két tucat másodpercnyi mérés megbízhatóbb képet ad.',

  'docs.scale': 'Skála',
  'docs.direction': 'Irány',
  'docs.directionHigher': 'A magasabb a jobb',
  'docs.directionLower': 'Az alacsonyabb a kíméletesebb',
  'docs.privacyTitle': 'Adatok és adatvédelem',
  'docs.privacyText': 'A kamera képét sehová nem küldjük el és nem mentjük el — minden képkockából csak három szám marad. A mérések, a küszöbök és a beállítások a böngésző tárolójában, ezen az eszközön vannak. Az alkalmazás semmilyen hálózati kérést nem küld, és offline módban is működik.',
  'docs.freeLine': 'Mind a hét mennyiség, az előzmények, a diagram, az eszközök és az offline mód mindenkinek működik, fiók és díj nélkül.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Minden elérhető',
  'support.heroText': 'Mind a hét mennyiség, a mérési előzmények, a diagram, minden eszköz és az offline mód mindenkinek működik, azonnal. Fiók, korlátok és díj nélkül.',
  'support.whyTitle': 'Miért kérem',
  'support.whyText': 'A {app} munka után készül, és senkin nem keres: nincs benne hirdetés, nem gyűjt adatot, és nincs mit eladnia. A fenntartása és a továbbfejlesztése — új mennyiségek, javítások, tesztelés újabb telefonokon — időbe kerül. Ha hasznodra vált az alkalmazás, hozzátehetsz. Nem kötelező.',
  'support.whatTitle': 'Mit ad az adomány',
  'support.whatText': 'Semmit. Tényleg semmit nem old fel és semmit nem gyorsít meg — az alkalmazás előtte és utána pontosan ugyanúgy néz ki és működik. Csak annyit ad, hogy a szerző tudja: ez a munka valakinek hasznára vált.',
  'support.button': 'Hívj meg egy kávéra',
  'support.pendingTitle': 'A profil még nincs bekötve',
  'support.pendingText': 'Itt még nincs cím, ahová támogatást lehetne küldeni. Ezen a helyen jelenik majd meg, amint elkészül — addig az alkalmazásban minden pontosan ugyanúgy működik.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'A gomb a Buy Me a Coffee külső oldalát nyit meg új lapon. Ez az egyetlen pillanat, amikor bármi elhagyja ezt az eszközt — és csak azután történik meg, hogy rákattintottál. A mérések, az előzmények és a beállítások itt maradnak.',
  'privacy.externalPending': 'Amint a cím megjelenik, a kattintás külső oldalt nyit majd meg új lapon. Ez lesz az egyetlen pillanat, amikor bármi elhagyja ezt az eszközt. A mérések, az előzmények és a beállítások itt maradnak.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (tartalék az ui-core.js fájlban)',
  'boot.need.metrics': 'egyetlen érték sem lesz kiszámolva',
  'boot.need.bus': 'a modulok nem látják majd egymást',
  'boot.need.ui': 'nem lehet képernyőt váltani',
  'boot.need.engine': 'a kamera és a mérés nem indul el',
  'boot.need.support': 'a Támogatás képernyő üres lesz',
  'boot.need.tools': 'az Eszközök fül üres lesz',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'Nem töltődtek be a következő modulok: {list}.',
  'boot.consoleHint': 'Ellenőrizd a <script> elemek sorrendjét és útvonalait az index.html fájlban.',
  'boot.incompleteTitle': 'Az alkalmazás hiányosan töltődött be',
  'boot.incompleteText': '{missing} Töltsd újra az oldalt; ha ez nem segít, a fájlok hiányosak a szerveren.',
  'boot.newVersion': 'Elérhető az alkalmazás új verziója.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'Mit csinálnak a küszöbök. ',
  'thresholds.noteText': 'A figyelmeztetési küszöb sárga állapotot gyújt, a kritikus küszöb pirosat. A változás azonnal hat — arra a leolvasásra is, amely már a képernyőn van. A saját küszöbkészletedet elmentheted egy néven, és bármikor visszatérhetsz hozzá.',
  'thresholds.profilesTitle': 'Küszöbprofilok',
  'thresholds.profilesSub': 'A három beépített és a sajátjaid',
  'thresholds.customName': 'A saját profil neve',
  'thresholds.customPlaceholder': 'például Hálószoba este',
  'thresholds.save': 'Aktuális küszöbök mentése',
  'thresholds.saveHelp': 'Pontosan azokat a küszöböket menti, amelyek fent be vannak állítva.',

  'profile.builtin.default.name': 'Alapértelmezett',
  'profile.builtin.default.desc': 'A mennyiségek katalógusából vett küszöbök — minden mérés kiindulópontja.',
  'profile.builtin.evening.name': 'Este — kíméletes',
  'profile.builtin.evening.desc': 'Korábban figyelmeztet a hideg fényszínre és a cirkadián hatásra.',
  'profile.builtin.work.name': 'Íróasztali munka',
  'profile.builtin.work.desc': 'Megengedi a világos, hideg nappali fényt; a villódzásra és az egyenletességre figyel.',
  'profile.custom.desc': 'Saját profil, mentve: {date}.',

  'toast.thresholdsReset': 'Az alapértelmezett küszöbök visszaállítva.',
  'toast.thresholdOrder': 'A figyelmeztetési küszöbnek alacsonyabbnak kell lennie a kritikusnál.',
  'toast.thresholdOrderInverted': 'Ennél a mennyiségnél a figyelmeztetési küszöbnek magasabbnak kell lennie a kritikusnál.',
  'toast.profileNameMissing': 'Add meg a profil nevét.',
  'toast.profileSaved': 'A(z) „{name}” profil mentve.',
  'toast.profileApplied': 'A(z) „{name}” profil alkalmazva.',
  'toast.profileApplyFailed': 'Ezt a profilt nem sikerült alkalmazni.',
  'toast.profileRemoved': 'A profil törölve.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'Mire való az ütemezés. ',
  'schedule.noteText': 'Este más küszöbök észszerűek, mint délben. Az „ettől–eddig” szabály magától cseréli a profilt, hogy ne kelljen emlékezned rá. Az ütemezés soha nem indítja el és nem állítja le a mérést.',
  'schedule.toggle': 'Automatikus váltás bekapcsolása',
  'schedule.toggleSub': 'Percenként ellenőrizzük az eszköz óráján.',
  'schedule.emptyTitle': 'Nincsenek szabályok',
  'schedule.emptyText': 'Vedd fel az első szabályt az alábbi gombbal.',
  'schedule.add': 'Szabály hozzáadása',
  'schedule.to': 'eddig',
  'schedule.profile': 'Profil',
  'schedule.fromAria': '{n}. szabály: kezdési időpont',
  'schedule.toAria': '{n}. szabály: befejezési időpont',
  'toast.scheduleTimeFormat': 'Az időpontokat 22:00 alakban add meg.',
  'toast.scheduleEnded': 'Az ütemezés véget ért — visszatértek a korábbi küszöbök.',
  'toast.scheduleApplied': 'Az ütemezés bekapcsolta a(z) „{name}” profilt.',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'Mit csinál a riasztás. ',
  'alerts.noteText': 'Egyetlen mennyiséget figyel, és csak akkor szólal meg, ha az a kiválasztott zónát megszakítás nélkül a beállított ideig tartja. Soha nem állítja le a mérést, és nem takarja el a gombokat.',
  'alerts.toggle': 'Expozíciós riasztások bekapcsolása',
  'alerts.toggleSub': 'Csak folyamatban lévő mérés közben működnek.',
  'alerts.metric': 'Figyelt mennyiség',
  'alerts.level': 'Melyik zónától',
  'alerts.level.warning': 'Figyelmeztetéstől és fölötte',
  'alerts.level.critical': 'Csak a kritikustól',
  'alerts.sustain': 'Hány másodperc megszakítás nélkül',
  'alerts.sustainHelp': 'A rövidebb idők több téves riasztást adnak, amikor mozgatod a telefont.',
  'alerts.sound': 'Rövid hangjelzés',
  'alerts.soundSub': 'A hang helyben keletkezik. A Továbbiak képernyőn globálisan is kikapcsolható.',
  'alerts.barTitle': 'Expozíciós riasztás',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': 'A(z) {name} {seconds} mp óta a figyelmeztetési zónában van — most {value} {unit}.',
  'alerts.message.critical': 'A(z) {name} {seconds} mp óta a kritikus zónában van — most {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'Hogyan hasonlíts. ',
  'compare.noteText': 'Indítsd el a mérést, irányítsd a kamerát az első fényforrásra, és mentsd el A jelűként. A távolságot és a szöget nem változtatva kapcsold át a világítást, és mentsd el a B jelűt. Az összehasonlításnak csak akkor van értelme, ha a jelenet ugyanaz.',
  'compare.slotA': 'A jelű fény',
  'compare.slotB': 'B jelű fény',
  'compare.save': 'Aktuális leolvasás mentése',
  'compare.savedAt': 'Mentve: {date}, {time}',
  'compare.empty': 'Még semmi nincs elmentve.',
  'compare.verdictTitle': 'Az összehasonlítás eredménye',
  'compare.verdictEmpty': 'Mentsd el mindkét fényt, hogy lásd, melyik a kíméletesebb.',
  'compare.notEnough': 'Túl kevés adat a két mérés összehasonlításához.',
  'compare.tie': 'A két fényforrás gyakorlatilag ugyanúgy jön ki ({metric}: {a} és {b} {unit}). A különbség belefér a mérés zajába.',
  'compare.betterA': 'Az A jelű fény a kíméletesebb — a(z) {metric} {better} {unit}, szemben a {worse} {unit} értékkel.',
  'compare.betterB': 'A B jelű fény a kíméletesebb — a(z) {metric} {better} {unit}, szemben a {worse} {unit} értékkel.',
  'compare.clear': 'Összehasonlítás törlése',
  'toast.compareSavedA': 'Az A jelű fény elmentve.',
  'toast.compareSavedB': 'A B jelű fény elmentve.',
  'toast.compareCleared': 'Az összehasonlítás törölve.',
  'toast.measureFirst': 'Előbb indíts mérést a Mérés képernyőn.',

  /* Nazwa wielkości w środku zdania. Po węgiersku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. */
  'metric.share.nameLower': 'kék arány',
  'metric.brightness.nameLower': 'jelenet fényereje',
  'metric.kelvin.nameLower': 'színhőmérséklet',
  'metric.melanopic.nameLower': 'cirkadián hatás',
  'metric.flicker.nameLower': 'villódzás',
  'metric.uniformity.nameLower': 'egyenletesség',
  'metric.comfort.nameLower': 'látáskomfort',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'Miért működik ez. ',
  'calib.noteText': 'A kamera érzékelőjének állandó eltérése van a csatornái között. Egy fehér papírlap megmérése megmutatja, mekkora ez az eltérés, és lehetővé teszi a levonását. Ez az egyetlen funkció ebben az alkalmazásban, amely valóban javítja a pontosságot — és a kamerából még így sem lesz spektrométer.',
  'calib.step1': 'Tegyél fehér papírlapot a mért fény alá',
  'calib.step2': 'Indítsd el a mérést, és töltsd ki a képkockát a papírral',
  'calib.step3': 'Nyomd meg a „Kalibrálás” gombot, és ne mozdítsd a telefont 3 másodpercig',
  'calib.done': 'Kalibrálva: {date}, {time}.',
  'calib.none': 'Nincs kalibrálás. A mérés működik, az értékeket összehasonlításra használd.',
  'calib.gain': '{channel} erősítése',
  'calib.gainsLabel': 'Csatornaerősítések',
  'calib.gainsUnset': 'nincs beállítva',
  'calib.start': 'Kalibrálás (3 mp)',
  'calib.clear': 'Kalibrálás törlése',
  'toast.calibCleared': 'A kalibrálás törölve.',
  'calib.error.noEngine': 'A mérési modul nem érhető el.',
  'calib.error.notRunning': 'Előbb indítsd el a mérést, és irányítsd a kamerát fehér papírlapra.',
  'calib.error.busy': 'A kalibrálás már folyamatban van.',
  'calib.error.tooFewSamples': 'Túl kevés minta. Ellenőrizd, hogy a mérés valóban működik-e.',
  'calib.error.tooDark': 'A kép túl sötét a kalibráláshoz. Világítsd meg jobban a papírt, és próbáld újra.',
  'calib.error.tooSkewed': 'A csatornák eltérése túl nagy ahhoz, hogy kalibrálásnak fogadjuk el. Használj fehér papírt egyenletes fényben.',
  'calib.ok': 'Kalibrálva. A színhőmérséklet és a cirkadián hatás mostantól pontosabb lesz.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'Mire való ez. ',
  'screencheck.noteText': 'Öt lépés úgy ellenőrzi a monitort, ahogyan egy teszt szokta: fehér két fényerőn, a háttérvilágítás egyenletessége, és hogy a rendszer éjszakai módja tényleg változtat-e valamin. A varázsló a folyamatban lévő mérést olvassa; magától nem indítja el.',
  'screencheck.step.white100.title': 'Fehér teljes fényerőn',
  'screencheck.step.white100.hint': 'Nyiss meg egy fehér oldalt a monitoron, állítsd a fényerőt maximumra, és töltsd ki a képkockát a képernyővel.',
  'screencheck.step.white20.title': 'Fehér alacsony fényerőn',
  'screencheck.step.white20.hint': 'Vedd le a monitor fényerejét körülbelül az egyötödére, és ne változtasd a képkivágást.',
  'screencheck.step.corners.title': 'A képernyő sarkai',
  'screencheck.step.corners.hint': 'Térj vissza a teljes fényerőre, és mutasd meg a kamerának az egész képernyőt — a háttérvilágítás egyenletességét ellenőrizzük.',
  'screencheck.step.nightOff.title': 'Éjszakai mód kikapcsolva',
  'screencheck.step.nightOff.hint': 'Győződj meg róla, hogy a kékfényszűrő ki van kapcsolva.',
  'screencheck.step.nightOn.title': 'Éjszakai mód bekapcsolva',
  'screencheck.step.nightOn.hint': 'Kapcsold be a rendszer kékfényszűrőjét, és ismételd meg ugyanazt a képkivágást.',
  'screencheck.stepHeading': '{n}. lépés a {total} közül: {title}',
  'screencheck.idleTitle': 'A varázsló nem fut',
  'screencheck.idleHint': 'Indíts mérést a Mérés képernyőn, aztán térj vissza ide, és nyomd meg a „Varázsló indítása” gombot.',
  'screencheck.next': 'Lépés mentése és tovább',
  'screencheck.cancel': 'Megszakítás',
  'screencheck.start': 'Varázsló indítása',
  'screencheck.clearResult': 'Eredmény törlése',
  'screencheck.resultTitle': 'Eredmény',
  'screencheck.resultEmpty': 'Még egyetlen lépés sincs elmentve.',
  'screencheck.resultPartial': '{total} lépésből {done} elmentve. A következtetések akkor jelennek meg, ha lesz mit összehasonlítani.',
  'screencheck.note.uniformityLow': 'A háttérvilágítás egyenletessége {value}% — jól látható fényerőkülönbségek vannak a képkockában.',
  'screencheck.note.uniformityOk': 'A háttérvilágítás egyenletes ({value}%).',
  'screencheck.note.nightWorks': 'Az éjszakai mód {value} százalékponttal csökkenti a kék arányt — működik.',
  'screencheck.note.nightWeak': 'Az éjszakai mód csak {value} százalékponttal változtatja meg a kék arányt. Ez kevesebb annál, mint amennyit egy rendszerszűrő általában ad.',
  'screencheck.note.pwm': 'Alacsony fényerőn a villódzás {from}%-ról {to}%-ra nő — ez az impulzusszélesség-modulációval (PWM) végzett fényerőszabályzás tipikus jele.',
  'toast.screencheckDone': 'A varázsló befejeződött. Az eredmény alább látható.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'Honnan jönnek ezek a számok. ',
  'reports.noteText': 'A jelentés az ezen az eszközön mentett előzményekből számolódik — öt másodpercenként egy pont. A motor az első mérés óta gyűjti, így a jelentés azonnal kész.',
  'reports.rangeAria': 'A jelentés tartománya',
  'reports.day': 'Az elmúlt 24 óra',
  'reports.week': 'Az elmúlt 7 nap',
  'reports.date': 'Jelentés: {date}.',
  'report.headerDay': 'Nap {from} és {to} között — {count}.',
  'report.headerWeek': 'Hét {from} és {to} között — {count}.',
  'count.points': { one: '{n} pont', other: '{n} pont' },
  'count.samples': { one: '{n} minta', other: '{n} minta' },
  'report.emptyTitle': 'Nincs adat ebben az időszakban',
  'report.emptyText': 'Indíts mérést a Mérés képernyőn — az előzmények maguktól mentődnek.',
  'report.colAvg': 'Átlag',
  'report.colMin': 'Minimum',
  'report.colMax': 'Maximum',
  'report.zonesTitle': 'A zónák megoszlása',
  'report.worstHour': 'A nap legrosszabb szaka',
  'report.worstHourNone': 'nincs kiugró',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'Mit lehet ezzel kezdeni',
  'report.disclaimerTitle': 'Ez nem egészségügyi tanács. ',
  'report.disclaimerText': 'A következtetések kizárólag abból származnak, amit ennek a telefonnak a kamerája látott. Az alkalmazás nem mér színképet, nem ismeri a luxot, és semmilyen diagnózist nem állít fel.',

  'advice.melanopic': 'A cirkadián hatás átlagosan {value}× volt. Este érdemes 0,50 alá menni — a legegyszerűbben melegebb izzóval vagy éjszakai móddal.',
  'advice.kelvin': 'A fény hideg volt (átlagosan {value} K). Munkához ez kifogástalan; alvás előtt két órával jobb a 3000 K alatti.',
  'advice.flicker': 'Érzékelhető villódzást mértünk (átlagosan {value}%). Rendszerint olcsó fényerőszabályzó vagy háttérvilágítás-tápegység felel érte.',
  'advice.uniformity': 'A fény egyenetlenül oszlik el ({value}%). A lámpa áthelyezése vagy a szögének megváltoztatása általában többet ad, mint az izzó cseréje.',
  'advice.worstHour': 'A nap legrosszabb szaka a {hour}:00 óra — ekkor gyűlik össze a legtöbb tartományon kívüli leolvasás.',
  'advice.none': 'Ebben az időszakban semmi nem lép ki a megszokott tartományból. Most az adna a legtöbbet, ha két fényforrást összehasonlítanál az A/B összehasonlítóban.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'A fájl formátuma. ',
  'export.noteText': 'Pontosvessző az oszlopok elválasztására, tizedesvessző a tizedesjegyek előtt, UTF-8 kódolás BOM jelöléssel. Az ilyen fájlt a magyar Excel bármilyen beállítás nélkül megnyitja.',
  'export.range': 'Adattartomány',
  'export.columns': 'A fájl oszlopai',
  'export.chipFilled': ' — kitöltött oszlop',
  'export.help': 'A fájl mind a hét oszlopot tartalmazza — a motor az első méréstől kezdve számolja őket, és mindegyik bekerül a fájlba.',
  'export.run': 'CSV-fájl mentése',
  'export.previewEmpty': 'Nincsenek leolvasások ebben a tartományban. Indíts mérést — az előzmények maguktól mentődnek.',
  'csv.range.hour': 'Az elmúlt óra',
  'csv.range.day': 'Az elmúlt 24 óra',
  'csv.range.week': 'Az elmúlt 7 nap',
  'csv.range.month': 'Az elmúlt 30 nap',
  'csv.colDate': 'Dátum',
  'csv.colTime': 'Időpont',
  'csv.colZone': 'Zóna',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'A kiválasztott tartományban egyetlen leolvasás sincs.',
  'toast.exportFailed': 'Ez a böngésző nem engedte menteni a fájlt.',
  'toast.exportSaved': {
    one: 'A(z) {filename} fájl mentve ({n} sor).',
    other: 'A(z) {filename} fájl mentve ({n} sor).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} óra {m} perc',
  'duration.ms': '{m} perc {s} mp',
  'duration.s': '{s} mp'
});
