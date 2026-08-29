/* docs/v2/i18n/cs.js — słownik WERSJI 2, czeski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/cs.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej. Zestaw kluczy jest identyczny
 * z pl.js — pilnuje tego docs/shared/i18n/keys.test.js.
 *
 * SKĄD TE ZDANIA: przekład z pl.js (polszczyzna jest tu redakcją pierwotną),
 * z en.js jako wzorcem terminologii i rejestru. Ton oryginału — rzeczowy
 * i ciepły, bez marketingu i bez straszenia — został zachowany.
 *
 * REJESTR: forma grzecznościowa „vy” (stiskněte, držte), jednolicie w całym
 * pliku — dokładnie tak, jak w docs/shared/i18n/cs.js, z którym ten plik stoi
 * w jednym zdaniu na ekranie. Cudzysłowy czeskie „ … “, przecinek dziesiętny
 * (0,50), spacja przed znakiem % zgodnie z czeską typografią.
 *
 * TERMINOLOGIA — wzięta co do słowa z warstwy wspólnej i z v5: podíl modré,
 * jas scény, barevná teplota, cirkadiánní vliv (współczynnik: melanopický
 * poměr), blikání, rovnoměrnost, zrakový komfort. Dalej: veličina (metryka,
 * wskaźnik), odečet (odczyt), vzorek (próbka), bod (punkt historii), práh
 * (próg), zóna (strefa). Klucze *.nameLower to te same nazwy w środku zdania —
 * czeski nie pisze rzeczowników pospolitych wielką literą, więc małą literą.
 *
 * ZASTRZEŻENIA MEDYCZNE i akapity o prywatności przetłumaczone DOKŁADNIE, bez
 * osłabiania i bez dodawania obietnic — to zdania o skutkach prawnych.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (te same co w pl.js i z tego samego powodu):
 *   'zone.warning'        — wspólne mówi „Pozor”, ta wersja od zawsze mówi
 *                           „Varování” (i to samo słowo w podsumowaniu, bo
 *                           czeski rzeczownik nijaki ma tu obie liczby równe);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi o pomiarach
 *                           w liczbie mnogiej.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules — czeski ma cztery: one (1), few (2–4), many (ułamki:
 * „1,5 vzorku”) i other (0, 5 i więcej). Patrz nagłówek docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['cs'] = Object.assign(window.I18nData['cs'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Monitor světla — měření modrého světla',
  'app.description': 'Monitor světla — měření podílu modrého světla kamerou telefonu. Sedm veličin, graf, historie. Všechno dostupné, bez účtu a bez poplatků.',
  'app.skipToContent': 'Přejít k obsahu',
  'app.measuring': 'Měření běží',
  'app.docsButton': 'Dokumentace a vysvětlení',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — verze 2',

  'nav.aria': 'Hlavní navigace',
  'nav.tablistAria': 'Obrazovky aplikace',
  'nav.measure': 'Měření',
  'nav.history': 'Historie',
  'nav.tools': 'Nástroje',
  'nav.support': 'Podpora',
  'nav.more': 'Více',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Dokumentace',
  'panel.thresholds': 'Prahy a profily',
  'panel.reports': 'Přehledy',
  'panel.export': 'Export dat',
  'panel.compare': 'Porovnání A/B',
  'panel.calibration': 'Kalibrace bílým papírem',
  'panel.screenCheck': 'Kontrola monitoru',
  'panel.schedule': 'Rozvrh',
  'panel.alerts': 'Upozornění na expozici',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Zpět',
  'action.close': 'Zavřít',
  'action.refresh': 'Obnovit',
  'action.apply': 'Použít',
  'action.delete': 'Smazat',
  'action.hide': 'Skrýt',
  'action.start': 'Start',
  'action.stop': 'Stop',
  'action.switch': 'Přepnout',
  'action.switchAria': 'Přepnout kameru: přední, nebo zadní',
  'action.resetDefaults': 'Obnovit výchozí',
  'action.reports': 'Přehledy',
  'action.exportCsv': 'Export CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Obrazovka: {name}',
  'a11y.measureStarted': 'Měření spuštěno.',
  'a11y.measureStopped': 'Měření zastaveno.',
  'a11y.measureStoppedSummary': 'Měření zastaveno. Čas: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'Profil prahů byl použit.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Potvrzení',
  'dialog.confirm': 'Potvrdit',
  'dialog.cancel': 'Zrušit',
  'dialog.infoTitle': 'Informace',
  'dialog.ok': 'Rozumím',

  'help.sheetTitle': 'Popis veličiny',
  'help.unit': 'Jednotka',
  'help.scaleRange': 'Rozsah škály',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'Varování',
  'threshold.crit': 'Kritické',
  'threshold.warnLabel': 'Varovný práh',
  'threshold.critLabel': 'Kritický práh',
  'threshold.warnAria': '{name} — práh: varování',
  'threshold.critAria': '{name} — práh: kritický',

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

  'firstRun.title': 'Jak měřit',
  'firstRun.text': 'Stiskněte „Start“, namiřte telefon na osvětlenou plochu a držte ho několik sekund v klidu. Rámeček v náhledu ukazuje výřez, který aplikace opravdu čte.',
  'firstRun.close': 'Zavřít nápovědu',

  'camera.live': 'ŽIVĚ',
  'camera.idle': 'Kamera je vypnutá. Stiskněte „Start“, namiřte telefon na osvětlenou plochu a držte ho několik sekund v klidu.',
  'camera.stopped': 'Měření zastaveno. Stisknutím „Start“ změříte znovu.',

  'error.cameraStart': 'Kameru se nepodařilo spustit.',
  'error.engineMissing': 'Modul měření se nenačetl.',

  'metrics.sevenTitle': 'Sedm veličin',
  'measure.tilesSub': 'Obnovuje se 5× za sekundu',

  'session.title': 'Toto měření',
  'session.duration': 'Doba měření',
  'session.samples': 'Počet vzorků',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     Czeskie „Varování” jest w obu liczbach takie samo, ale klucz zostaje
     osobny: w innych językach to dwa różne słowa. */
  'zone.count.good': 'V normě',
  'zone.count.warning': 'Varování',
  'zone.count.critical': 'Kritické',

  'note.calibrated': 'Měření je zkalibrováno bílým papírem — kanály jsou vyrovnané.',

  'tile.helpAria': 'Co znamená: {name}',
  'tile.noMeasurement': 'Bez měření',
  'tile.outOfScale': 'Mimo škálu',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Varování',
  'zone.spoken.warning': 'varování',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Průběh v čase',
  'history.pickHint': 'Vyberte veličinu a rozsah',
  'history.metricLabel': 'Veličina',
  'history.rangeAria': 'Časový rozsah grafu',
  'history.emptyTitle': 'V tomto rozsahu nejsou data',
  'history.emptyText': 'Spusťte měření na obrazovce Měření — graf se během několika sekund zaplní.',
  'history.tableTitle': 'Poslední odečty',
  'history.tableHide': 'Skrýt tabulku',
  'history.tableShow': 'Zobrazit tabulku',
  'history.tableCaption': 'Poslední odečty měření, nejnovější nahoře.',
  'history.tableEmpty': 'Žádné odečty. Spusťte měření na obrazovce Měření.',

  'table.time': 'Čas',
  'table.metric': 'Veličina',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     dłuższy zapis łamał się na dwie linie. */
  'range.1m': '1 min',
  'range.1h': '1 hod',
  'range.24h': '24 hod',
  'range.7d': '7 dní',
  'range.30d': '30 dní',

  'chart.now': 'teď',
  'chart.countSub': {
    one: '{n} odečet ve zvoleném rozsahu',
    few: '{n} odečty ve zvoleném rozsahu',
    many: '{n} odečtu ve zvoleném rozsahu',
    other: '{n} odečtů ve zvoleném rozsahu'
  },
  'chart.aria': '{name}, rozsah {range}, {count}, poslední hodnota {value} {unit}.',
  'chart.ariaZone': '{name}, rozsah {range}, {count}, poslední hodnota {value} {unit}, zóna: {zone}.',
  'chart.ariaEmpty': '{name} — v rozsahu {range} nejsou data.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Průvodci a pomocné funkce',
  'tools.note': 'Nástroje pomáhají měření vyložit. Všechny jsou dostupné hned a samotné měření funguje nezávisle na nich.',

  'tool.thresholds.sub': 'Kdy má hodnota rozsvítit varování',
  'tool.compare.sub': 'Které ze dvou světel je šetrnější',
  'tool.calibration.sub': 'Jediná funkce, která opravdu zvyšuje přesnost',
  'tool.screenCheck.sub': 'Pět kroků a hotový závěr o obrazovce',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Rozvrh prahů”
     kontra „Rozvrh”. Tak było i tak zostaje. */
  'tool.schedule.title': 'Rozvrh prahů',
  'tool.schedule.sub': 'Večer jiné prahy, aniž byste na to museli myslet',
  'tool.alerts.sub': 'Signál, když kritická zóna trvá příliš dlouho',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Nastavení',
  'more.thresholdsSub': 'Kdy má hodnota rozsvítit varování',
  'more.docsSub': 'Jak měřit a co toto měření neříká',
  'more.appearanceTitle': 'Vzhled a přístupnost',

  'settings.theme': 'Motiv',
  'theme.auto': 'Podle systému',
  'theme.light': 'Světlý',
  'theme.dark': 'Tmavý',

  'settings.textScale': 'Velikost textu',
  'textScale.100': 'Standardní',
  'textScale.115': 'Větší (115 %)',
  'textScale.130': 'Největší (130 %)',

  'settings.contrast': 'Vyšší kontrast',
  'settings.contrastSub': 'Výraznější obrysy a tmavší pomocný text.',
  'settings.sound': 'Zvuk upozornění',
  'settings.soundSub': 'Krátký signál, když se zapne upozornění na expozici.',
  'settings.vibrate': 'Vibrace při upozorněních',
  'settings.vibrateSub': 'Funguje jen na zařízeních, která ji podporují.',

  'more.dataTitle': 'Data',
  'more.clearHistory': 'Vymazat historii měření',
  'more.clearHistorySub': 'Smaže uložené odečty z tohoto zařízení. Prahy, profily a nastavení zůstanou.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'Aplikace je celá bezplatná. ',
  'more.supportLink': 'Můžete ji dobrovolně podpořit.',

  'dialog.clearHistory.title': 'Smazat uloženou historii?',
  'dialog.clearHistory.body': {
    one: 'Smažeme z tohoto zařízení {n} uložený bod měření. Tuto operaci nelze vrátit zpět. Prahy, profily a nastavení zůstanou nedotčené.',
    few: 'Smažeme z tohoto zařízení {n} uložené body měření. Tuto operaci nelze vrátit zpět. Prahy, profily a nastavení zůstanou nedotčené.',
    many: 'Smažeme z tohoto zařízení {n} uloženého bodu měření. Tuto operaci nelze vrátit zpět. Prahy, profily a nastavení zůstanou nedotčené.',
    other: 'Smažeme z tohoto zařízení {n} uložených bodů měření. Tuto operaci nelze vrátit zpět. Prahy, profily a nastavení zůstanou nedotčené.'
  },
  'dialog.clearHistory.confirm': 'Smazat historii',
  'dialog.clearHistory.cancel': 'Ponechat',

  'toast.historyCleared': 'Historie měření byla smazána.',
  'toast.screenUnavailable': 'Tato obrazovka v této verzi zatím není dostupná.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'Co tato aplikace měří',
  'docs.leadText': 'Kamera telefonu se dívá na osvětlenou plochu a aplikace pětkrát za sekundu počítá průměry kanálů R, G a B ze středního výřezu záběru. Z těchto tří čísel odvozuje sedm veličin.',
  'docs.limitsTitle': 'Hranice metody',
  'docs.limitsText': 'Fotoaparát má tři široké barevné kanály, automatickou expozici a automatické vyvážení bílé. Neměří spektrum a nezná absolutní hodnoty, takže jas je relativní ukazatel, ne luxy. Barevná teplota a cirkadiánní vliv jsou přiblížení vypočtená z barev sRGB. Vzorkování {rate} Hz vidí blikání jen pod {limit} Hz — síťových 100 Hz je mimo dosah a aplikace je nikdy neuvede jako výsledek.',

  'note.howTo.repeat.title': 'Zopakujte měření',
  'note.howTo.repeat.text': 'Jediný odečet je momentka. Zhruba patnáct sekund měření dá věrohodnější obraz.',

  'docs.scale': 'Škála',
  'docs.direction': 'Směr',
  'docs.directionHigher': 'Výš znamená lépe',
  'docs.directionLower': 'Níž znamená šetrněji',
  'docs.privacyTitle': 'Data a soukromí',
  'docs.privacyText': 'Obraz z kamery se nikam neodesílá ani neukládá — z každého snímku zůstanou jen tři čísla. Měření, prahy a nastavení leží v paměti prohlížeče v tomto zařízení. Aplikace neprovádí žádné síťové požadavky a funguje i offline.',
  'docs.freeLine': 'Všech sedm veličin, historie, graf, nástroje i režim offline fungují pro každého, bez účtu a bez poplatků.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Všechno je dostupné',
  'support.heroText': 'Všech sedm veličin, historie měření, graf, všechny nástroje i režim offline fungují pro každého, hned. Bez účtu, bez limitů a bez poplatků.',
  'support.whyTitle': 'Proč o to prosím',
  'support.whyText': '{app} vzniká po večerech a na nikom nevydělává: nemá reklamy, nesbírá data a nemá co prodat. Udržování a další vývoj — nové veličiny, opravy, testy na dalších telefonech — stojí čas. Pokud se vám aplikace hodila, můžete přispět. Nemusíte.',
  'support.whatTitle': 'Co dar přinese',
  'support.whatText': 'Nic. Opravdu nic neodemyká a nic nezrychluje — aplikace vypadá a funguje před ním i po něm přesně stejně. Dá jen tolik, že autor ví, že se tato práce někomu hodila.',
  'support.button': 'Kupte mi kávu',
  'support.pendingTitle': 'Profil zatím není připojený',
  'support.pendingText': 'Zatím tu není adresa, na kterou by šlo podporu poslat. Objeví se na tomto místě, až bude připravená — do té doby všechno v aplikaci funguje přesně stejně.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'Tlačítko otevře externí stránku Buy Me a Coffee na nové kartě. To je jediný okamžik, kdy cokoli opouští toto zařízení — a děje se to až po vašem kliknutí. Měření, historie a nastavení zůstávají tady.',
  'privacy.externalPending': 'Až se adresa objeví, kliknutí otevře externí stránku na nové kartě. Bude to jediný okamžik, kdy cokoli opouští toto zařízení. Měření, historie a nastavení zůstávají tady.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (záloha v ui-core.js)',
  'boot.need.metrics': 'nespočítá se žádná hodnota',
  'boot.need.bus': 'moduly se přestanou vidět',
  'boot.need.ui': 'nepůjde přepínat obrazovky',
  'boot.need.engine': 'kamera ani měření se nerozjedou',
  'boot.need.support': 'obrazovka Podpora bude prázdná',
  'boot.need.tools': 'záložka Nástroje bude prázdná',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'Nenačetly se moduly: {list}.',
  'boot.consoleHint': 'Zkontrolujte pořadí a cesty <script> v index.html.',
  'boot.incompleteTitle': 'Aplikace se načetla neúplně',
  'boot.incompleteText': '{missing} Načtěte stránku znovu; pokud to nepomůže, jsou soubory na serveru neúplné.',
  'boot.newVersion': 'Je k dispozici nová verze aplikace.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'Co dělají prahy. ',
  'thresholds.noteText': 'Varovný práh rozsvítí žlutý stav, kritický práh červený. Změna platí okamžitě — i pro odečet, který už je na obrazovce. Vlastní sadu prahů si můžete uložit pod názvem a kdykoli se k ní vrátit.',
  'thresholds.profilesTitle': 'Profily prahů',
  'thresholds.profilesSub': 'Tři vestavěné a vaše vlastní',
  'thresholds.customName': 'Název vlastního profilu',
  'thresholds.customPlaceholder': 'např. Ložnice večer',
  'thresholds.save': 'Uložit aktuální prahy',
  'thresholds.saveHelp': 'Uloží přesně ty prahy, které jsou nastavené výše.',

  'profile.builtin.default.name': 'Výchozí',
  'profile.builtin.default.desc': 'Prahy z katalogu veličin — výchozí bod pro všechna měření.',
  'profile.builtin.evening.name': 'Večer — šetrný',
  'profile.builtin.evening.desc': 'Varuje dřív před studenou barvou a cirkadiánním vlivem.',
  'profile.builtin.work.name': 'Práce u stolu',
  'profile.builtin.work.desc': 'Připouští jasné, studené denní světlo; hlídá blikání a rovnoměrnost.',
  'profile.custom.desc': 'Vlastní profil uložený {date}.',

  'toast.thresholdsReset': 'Výchozí prahy byly obnoveny.',
  'toast.thresholdOrder': 'Varovný práh musí být nižší než kritický.',
  'toast.thresholdOrderInverted': 'U této veličiny musí být varovný práh vyšší než kritický.',
  'toast.profileNameMissing': 'Zadejte název profilu.',
  'toast.profileSaved': 'Profil „{name}“ byl uložen.',
  'toast.profileApplied': 'Profil „{name}“ byl použit.',
  'toast.profileApplyFailed': 'Tento profil se nepodařilo použít.',
  'toast.profileRemoved': 'Profil byl smazán.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'K čemu je rozvrh. ',
  'schedule.noteText': 'Večer dávají smysl jiné prahy než v poledne. Pravidlo „od–do“ přepne profil samo, abyste na to nemuseli myslet. Rozvrh nikdy měření nespouští ani nezastavuje.',
  'schedule.toggle': 'Zapnout automatické přepínání',
  'schedule.toggleSub': 'Kontroluje se každou minutu podle hodin zařízení.',
  'schedule.emptyTitle': 'Žádná pravidla',
  'schedule.emptyText': 'Přidejte první pravidlo tlačítkem níže.',
  'schedule.add': 'Přidat pravidlo',
  'schedule.to': 'do',
  'schedule.profile': 'Profil',
  'schedule.fromAria': 'Pravidlo {n}: čas začátku',
  'schedule.toAria': 'Pravidlo {n}: čas konce',
  'toast.scheduleTimeFormat': 'Zadejte časy ve formátu 22:00.',
  'toast.scheduleEnded': 'Rozvrh skončil — vrátily se předchozí prahy.',
  'toast.scheduleApplied': 'Rozvrh zapnul profil „{name}“.',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'Co dělá upozornění. ',
  'alerts.noteText': 'Hlídá jednu veličinu a ozve se teprve tehdy, když se drží ve zvolené zóně nepřetržitě po nastavenou dobu. Nikdy nezastavuje měření a nezakrývá tlačítka.',
  'alerts.toggle': 'Zapnout upozornění na expozici',
  'alerts.toggleSub': 'Fungují jen během probíhajícího měření.',
  'alerts.metric': 'Hlídaná veličina',
  'alerts.level': 'Od které zóny',
  'alerts.level.warning': 'Varovné a vyšší',
  'alerts.level.critical': 'Jen kritické',
  'alerts.sustain': 'Po kolika sekundách nepřetržitě',
  'alerts.sustainHelp': 'Kratší časy dávají víc falešných poplachů, když telefonem pohnete.',
  'alerts.sound': 'Krátký zvukový signál',
  'alerts.soundSub': 'Zvuk vzniká lokálně. Vypnout ho lze i globálně na obrazovce Více.',
  'alerts.barTitle': 'Upozornění na expozici',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} se drží ve varovné zóně už {seconds} s — teď {value} {unit}.',
  'alerts.message.critical': '{name} se drží v kritické zóně už {seconds} s — teď {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'Jak porovnávat. ',
  'compare.noteText': 'Spusťte měření, namiřte kameru na první zdroj a uložte ho jako A. Beze změny vzdálenosti i úhlu přepněte světlo a uložte B. Porovnání dává smysl jen tehdy, když je scéna stejná.',
  'compare.slotA': 'Světlo A',
  'compare.slotB': 'Světlo B',
  'compare.save': 'Uložit aktuální odečet',
  'compare.savedAt': 'Uloženo {date}, {time}',
  'compare.empty': 'Zatím není nic uloženo.',
  'compare.verdictTitle': 'Výsledek porovnání',
  'compare.verdictEmpty': 'Uložte obě světla, ať vidíte, které je šetrnější.',
  'compare.notEnough': 'Na porovnání těchto dvou měření je málo dat.',
  'compare.tie': 'Oba zdroje vycházejí prakticky stejně ({metric}: {a} a {b} {unit}). Rozdíl se vejde do šumu měření.',
  'compare.betterA': 'Šetrnější je světlo A — {metric} je {better} {unit} proti {worse} {unit}.',
  'compare.betterB': 'Šetrnější je světlo B — {metric} je {better} {unit} proti {worse} {unit}.',
  'compare.clear': 'Vymazat porovnání',
  'toast.compareSavedA': 'Světlo A bylo uloženo.',
  'toast.compareSavedB': 'Světlo B bylo uloženo.',
  'toast.compareCleared': 'Porovnání bylo vymazáno.',
  'toast.measureFirst': 'Nejdřív spusťte měření na obrazovce Měření.',

  /* Nazwa wielkości w środku zdania. Po czesku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. */
  'metric.share.nameLower': 'podíl modré',
  'metric.brightness.nameLower': 'jas scény',
  'metric.kelvin.nameLower': 'barevná teplota',
  'metric.melanopic.nameLower': 'cirkadiánní vliv',
  'metric.flicker.nameLower': 'blikání',
  'metric.uniformity.nameLower': 'rovnoměrnost',
  'metric.comfort.nameLower': 'zrakový komfort',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'Proč to funguje. ',
  'calib.noteText': 'Snímač fotoaparátu má stálou odchylku mezi kanály. Změření bílého papíru ukáže, jak je velká, a umožní ji odečíst. Je to jediná funkce v této aplikaci, která opravdu zvyšuje přesnost — a fotoaparát se tím pořád nemění ve spektrometr.',
  'calib.step1': 'Položte bílý papír pod měřené světlo',
  'calib.step2': 'Spusťte měření a vyplňte záběr papírem',
  'calib.step3': 'Stiskněte „Kalibrovat“ a 3 sekundy telefonem nehýbejte',
  'calib.done': 'Zkalibrováno {date}, {time}.',
  'calib.none': 'Bez kalibrace. Měření funguje, hodnoty berte jako srovnávací.',
  'calib.gain': 'Zesílení {channel}',
  'calib.gainsLabel': 'Zesílení kanálů',
  'calib.gainsUnset': 'nenastaveno',
  'calib.start': 'Kalibrovat (3 s)',
  'calib.clear': 'Smazat kalibraci',
  'toast.calibCleared': 'Kalibrace byla smazána.',
  'calib.error.noEngine': 'Modul měření není dostupný.',
  'calib.error.notRunning': 'Nejdřív spusťte měření a namiřte kameru na bílý papír.',
  'calib.error.busy': 'Kalibrace už probíhá.',
  'calib.error.tooFewSamples': 'Málo vzorků. Zkontrolujte, jestli měření opravdu běží.',
  'calib.error.tooDark': 'Obraz je na kalibraci příliš tmavý. Přisviťte papír a zkuste to znovu.',
  'calib.error.tooSkewed': 'Odchylka kanálů je příliš velká na to, aby se dala uznat za kalibraci. Použijte bílý papír v rovnoměrném světle.',
  'calib.ok': 'Zkalibrováno. Barevná teplota a cirkadiánní vliv budou teď přesnější.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'K čemu to slouží. ',
  'screencheck.noteText': 'Pět kroků zkontroluje monitor tak, jak se kontroluje v recenzi: bílá při dvou jasech, rovnoměrnost podsvícení a to, jestli systémový noční režim opravdu něco změní. Průvodce čte probíhající měření; sám ho nespouští.',
  'screencheck.step.white100.title': 'Bílá při plném jasu',
  'screencheck.step.white100.hint': 'Otevřete na monitoru bílou stránku, nastavte jas na maximum a vyplňte záběr obrazovkou.',
  'screencheck.step.white20.title': 'Bílá při nízkém jasu',
  'screencheck.step.white20.hint': 'Snižte jas monitoru zhruba na pětinu a neměňte záběr.',
  'screencheck.step.corners.title': 'Rohy obrazovky',
  'screencheck.step.corners.hint': 'Vraťte se na plný jas a ukažte kameře celou obrazovku — kontrolujeme rovnoměrnost podsvícení.',
  'screencheck.step.nightOff.title': 'Noční režim vypnutý',
  'screencheck.step.nightOff.hint': 'Ujistěte se, že filtr modrého světla je vypnutý.',
  'screencheck.step.nightOn.title': 'Noční režim zapnutý',
  'screencheck.step.nightOn.hint': 'Zapněte v systému filtr modrého světla a zopakujte tentýž záběr.',
  'screencheck.stepHeading': 'Krok {n} z {total}: {title}',
  'screencheck.idleTitle': 'Průvodce neběží',
  'screencheck.idleHint': 'Spusťte měření na obrazovce Měření, pak se sem vraťte a stiskněte „Spustit“.',
  'screencheck.next': 'Uložit krok a pokračovat',
  'screencheck.cancel': 'Přerušit',
  'screencheck.start': 'Spustit průvodce',
  'screencheck.clearResult': 'Vymazat výsledek',
  'screencheck.resultTitle': 'Výsledek',
  'screencheck.resultEmpty': 'Zatím nebyl uložen žádný krok.',
  'screencheck.resultPartial': 'Uloženo {done} z {total} kroků. Závěry se objeví, až bude co porovnat.',
  'screencheck.note.uniformityLow': 'Rovnoměrnost podsvícení je {value} % — v záběru jsou vidět zřetelné rozdíly jasu.',
  'screencheck.note.uniformityOk': 'Podsvícení je rovnoměrné ({value} %).',
  'screencheck.note.nightWorks': 'Noční režim snižuje podíl modré o {value} procentního bodu — funguje.',
  'screencheck.note.nightWeak': 'Noční režim mění podíl modré jen o {value} procentního bodu. To je méně, než systémový filtr obvykle dává.',
  'screencheck.note.pwm': 'Při nízkém jasu blikání roste z {from} % na {to} % — to je typický příznak pulzního stmívání (PWM).',
  'toast.screencheckDone': 'Průvodce skončil. Výsledek je níže.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'Odkud jsou tato čísla. ',
  'reports.noteText': 'Přehled se počítá z historie uložené v tomto zařízení — po jednom bodu za pět sekund. Modul měření ji sbírá od prvního spuštění, takže je přehled hotový hned.',
  'reports.rangeAria': 'Rozsah přehledu',
  'reports.day': 'Posledních 24 hodin',
  'reports.week': 'Posledních 7 dní',
  'reports.date': 'Přehled za den {date}.',
  'report.headerDay': 'Den od {from} do {to} — {count}.',
  'report.headerWeek': 'Týden od {from} do {to} — {count}.',
  'count.points': { one: '{n} bod', few: '{n} body', many: '{n} bodu', other: '{n} bodů' },
  'count.samples': { one: '{n} vzorek', few: '{n} vzorky', many: '{n} vzorku', other: '{n} vzorků' },
  'report.emptyTitle': 'V tomto období nejsou data',
  'report.emptyText': 'Spusťte měření na obrazovce Měření — historie se ukládá sama.',
  'report.colAvg': 'Průměr',
  'report.colMin': 'Minimum',
  'report.colMax': 'Maximum',
  'report.zonesTitle': 'Rozložení zón',
  'report.worstHour': 'Nejhorší denní doba',
  'report.worstHourNone': 'žádná nevyčnívá',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'Co s tím dělat',
  'report.disclaimerTitle': 'Toto není zdravotní rada. ',
  'report.disclaimerText': 'Závěry vyplývají výhradně z toho, co viděla kamera tohoto telefonu. Aplikace neměří spektrum, nezná luxy a nestanovuje žádnou diagnózu.',

  'advice.melanopic': 'Průměrný cirkadiánní vliv byl {value}×. Večer se vyplatí klesnout pod 0,50 — nejjednodušeji teplejší žárovkou nebo nočním režimem.',
  'advice.kelvin': 'Světlo bylo studené (průměrně {value} K). Na práci je to bez výhrad; dvě hodiny před spaním je lepší pod 3000 K.',
  'advice.flicker': 'Bylo zjištěno znatelné blikání (průměrně {value} %). Obvykle za ně může levný stmívač nebo napájení podsvícení.',
  'advice.uniformity': 'Světlo se rozkládá nerovnoměrně ({value} %). Posunutí lampy nebo změna úhlu obvykle udělá víc než výměna žárovky.',
  'advice.worstHour': 'Nejhorší denní doba je {hour}:00 — tam se soustředí nejvíc odečtů mimo normu.',
  'advice.none': 'V tomto období nic nevyčnívá nad normu. Nejvíc by teď dalo porovnání dvou zdrojů světla v porovnání A/B.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'Formát souboru. ',
  'export.noteText': 'Středník jako oddělovač sloupců, čárka jako desetinný oddělovač, kódování UTF-8 se značkou BOM. Takový soubor otevře český Excel bez jakéhokoli nastavování.',
  'export.range': 'Rozsah dat',
  'export.columns': 'Sloupce v souboru',
  'export.chipFilled': ' — sloupec vyplněn',
  'export.help': 'Soubor obsahuje všech sedm sloupců — modul měření je počítá od prvního měření a všechny se do souboru dostanou.',
  'export.run': 'Uložit soubor CSV',
  'export.previewEmpty': 'V tomto rozsahu nejsou žádné odečty. Spusťte měření — historie se ukládá sama.',
  'csv.range.hour': 'Poslední hodina',
  'csv.range.day': 'Posledních 24 hodin',
  'csv.range.week': 'Posledních 7 dní',
  'csv.range.month': 'Posledních 30 dní',
  'csv.colDate': 'Datum',
  'csv.colTime': 'Čas',
  'csv.colZone': 'Zóna',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'Ve zvoleném rozsahu nejsou vůbec žádné odečty.',
  'toast.exportFailed': 'Tento prohlížeč soubor uložit nedovolil.',
  'toast.exportSaved': {
    one: 'Soubor {filename} byl uložen ({n} řádek).',
    few: 'Soubor {filename} byl uložen ({n} řádky).',
    many: 'Soubor {filename} byl uložen ({n} řádku).',
    other: 'Soubor {filename} byl uložen ({n} řádků).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} hod. {m} min',
  'duration.ms': '{m} min {s} s',
  'duration.s': '{s} s'
});
