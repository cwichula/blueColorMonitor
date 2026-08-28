/* docs/v3/i18n/cs.js — słownik WŁASNY wersji v3, czeski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/cs.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * SKĄD TE ZDANIA: przekład z polskiego (docs/v3/i18n/pl.js jest redakcją
 * pierwotną), z angielskim (en.js) jako wzorcem terminologii i rejestru. Ton
 * oryginału — rzeczowy i spokojny, bez marketingu i bez straszenia — został
 * zachowany razem ze zdaniami mówiącymi wprost, czego ten pomiar nie potrafi.
 *
 * TERMINOLOGIA jest przejęta z docs/shared/i18n/cs.js co do słowa: „podíl
 * modré“, „jas scény“, „barevná teplota“, „cirkadiánní vliv“ (melanopický
 * poměr), „blikání“, „rovnoměrnost“, „zrakový komfort“, strefy „v normě /
 * pozor / kriticky“; wielkość to „veličina“, odczyt to „odečet“, sesja pomiaru
 * to „měření“, próg to „práh“. Nazwy progów idą za nazwami stref: „práh
 * upozornění“ i „kritický práh“ — tak samo jak w docs/v4/i18n/cs.js, gdzie te
 * same zdania stoją już po czesku. Dalsze ustalenia wspólne z v4: pulpit =
 * přehled, klawisz = tlačítko, plansza = obrazec, alert = výstraha,
 * harmonogram = plánovač, raporty = reporty, rejestrator = záznamník.
 *
 * REJESTR: forma grzecznościowa „vy“ (stiskněte, držte), jednolicie w całym
 * pliku — dokładnie jak w warstwie wspólnej. Cudzysłowy czeskie „…“.
 *
 * CZEGO TU NIE MA — i dlaczego: kluczy, które stoją już w słowniku wspólnym
 * (docs/shared/i18n/cs.js) z DOKŁADNIE tym samym zdaniem. Nazwy stref, zdania
 * oceniające, noty o granicach metody, nazwy i opisy siedmiu wielkości oraz
 * zastrzeżenie medyczne są wspólne dla wersji i tłumaczy się je RAZ. Kształt
 * obiektu Scale.TEXT wskazuje na nie wprost — mapa „gałąź Scale.TEXT → klucz”
 * leży w docs/v3/scale.js i to ona jest miejscem, w którym widać oba źródła
 * naraz.
 *
 * ZESTAW KLUCZY wyznacza docs/v3/i18n/pl.js, a kompletności pilnuje
 * docs/shared/i18n/keys.test.js. Klucza, którego nie ma we wzorcu, nie wolno
 * tu dopisywać.
 *
 * ZAPIS LICZB WE WZORACH: przecinek dziesiętny („0,3320”), jak po polsku i jak
 * w czeskiej typografii; przed znakiem procentu stoi spacja („100 %”), tak jak
 * w docs/v4/i18n/cs.js. Symbole jednostek (%, K, ×, Hz, ms, nm), nazwy
 * formatów (CSV, JSON) i identyfikatory techniczne zostają bez zmian. Liczby
 * wstawiane przez '{…}' formatuje warstwa językowa, nie ten plik.
 */
window.I18nData = window.I18nData || {};
window.I18nData['cs'] = Object.assign(window.I18nData['cs'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. */
  'app.wordmark': 'MONITOR SVĚTLA',

  'state.idle': 'Připraveno',
  'state.starting': 'Spouštím',
  'state.running': 'Měření',
  'state.runningTpl': 'Měření {time}',
  'state.stopped': 'Zastaveno',
  'state.error': 'Chyba kamery',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5,0 po czesku, 5.0 po angielsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'Start měření',
  'keys.starting': 'Spouštím…',
  'keys.stop': 'Stop',
  'keys.flip': 'Otočit',
  'keys.flipAria': 'Přepnout přední a zadní kameru',
  'keys.menu': 'Menu',
  'keys.menuAria': 'Seznam modulů',
  'keys.back': '‹ Zpět',
  'keys.backAria': 'Zpět na přehled',
  'keys.dash': 'Přehled',
  'keys.zoom': 'Zvětšit náhled',
  'keys.retry': 'Zkusit znovu',
  'keys.refresh': 'Obnovit',
  'keys.close': 'Zavřít',
  'keys.show': 'Zobrazit',
  'keys.apply': 'Použít',
  'keys.remove': 'Smazat',

  'monitor.legend': 'Kontrolní náhled',
  'monitor.badge': 'Živě',

  'aim.title': 'Zaměřování',
  'aim.hint': 'Rámeček ukazuje přesně tu část obrazu, kterou aplikace měří.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'Hlavní kanál',
  'readout.thresholdTpl': '(práh {value})',
  'readout.contextTpl': 'min {min} · prům. {avg} · max {max} — posledních 60 s',
  'readout.contextEmpty': 'žádná data z posledních 60 s',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'Co to znamená: {name}',
  'aria.channel': '{name}, {value}, {zone}. Zobrazit na velkém ukazateli.',
  'aria.channelStale': '{name}, bez dat. Zobrazit na velkém ukazateli.',
  'aria.scale': 'Škála: {name}, od {min} do {max}. Teď {value}, {zone}. Práh upozornění {warn}, kritický práh {crit}.',
  'aria.readout': '{name}: {value}, {zone}.',
  'aria.readoutApprox': '{name}: přibližně {value}, {zone}. Přibližná hodnota.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'Škála hlavního kanálu. Bez dat',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': 'Stiskněte „Start měření“, namiřte telefon na osvětlenou plochu a několik sekund jej držte v klidu.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'Zrakový komfort je nízký. Nahlédněte do modulu 01, ať vidíte, co ho snižuje.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'Začněte tlačítkem „Start měření“ dole na obrazovce. Kamera se zapne až po jeho stisknutí.',
  'transient.measureStopped': 'Měření dokončeno · {time} · uloženo do historie.',
  'transient.newVersion': 'Je k dispozici nová verze aplikace.',
  'transient.thresholdsSaved': 'Prahy uloženy.',
  'transient.thresholdsRejected': 'Neuloženo — práh upozornění a kritický práh se nesmějí křížit.',
  'transient.historyCleared': 'Historie vymazána.',

  'live.lead': 'Hlavní kanál: {name}, {value}, {zone}.',
  'live.ready': 'Hodnocení je připravené. {name} {value}, {zone}.',
  'live.started': 'Měření začalo.',
  'livebar.stopped': 'Měření zastaveno',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'Zatím tu nejsou žádné záznamy. Historie se zapisuje během měření — spusťte měření na minutu a vraťte se sem.',
  'empty.recorderNoRange': 'V tomto rozsahu neproběhlo žádné měření.',
  'empty.coverageTpl': 'Měření pokrylo {done} z {total} hodin.',
  'empty.reportsNoData': 'Denní report vznikne po prvním celém dni s měřením.',
  'empty.compareOneSession': 'K porovnání jsou potřeba dvě dokončená měření. Zatím máte jedno.',
  'empty.exportNoData': 'Není co exportovat. Spusťte měření, aby historie měla obsah.',
  'empty.alertsOff': 'Výstrahy jsou vypnuté. Po zapnutí zaberou jen tehdy, když je aplikace otevřená.',
  'empty.scheduleEmpty': 'Není nastavený žádný čas. Plánovač funguje jen při otevřené aplikaci.',
  'empty.historyEmpty': 'Historie je prázdná.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'Seznam modulů',

  'modules.01.title': 'Záznamník',
  'modules.01.desc': 'Průběh měření v čase, od minuty po třicet dní.',
  'modules.02.title': 'Prahy',
  'modules.02.desc': 'Nastavte si vlastní hranice upozornění a poplachu pro každou veličinu.',
  'modules.03.title': 'Kalibrace',
  'modules.03.desc': 'Vztažení ke známému světelnému zdroji a to, co kalibrace nespraví.',
  'modules.04.title': 'Reporty',
  'modules.04.desc': 'Denní a týdenní souhrny v podobě výtisku.',
  'modules.05.title': 'Export',
  'modules.05.desc': 'Uložení odečtů do souboru CSV nebo JSON s popisem sloupců.',
  'modules.06.title': 'Porovnání',
  'modules.06.desc': 'Dvě měření vedle sebe, s rozdílem vyjádřeným číslem.',
  'modules.07.title': 'Test obrazovky',
  'modules.07.desc': 'Obrazce pro kontrolu vlastního monitoru, krok za krokem.',
  'modules.08.title': 'Plánovač',
  'modules.08.desc': 'Automatická měření ve zvolených časech.',
  'modules.09.title': 'Výstrahy',
  'modules.09.desc': 'Oznámení po překročení prahu — a kdy nezabere.',
  'modules.10.title': 'Podpora',
  'modules.10.desc': 'Aplikace je celá zdarma. Tady můžete autorovi koupit kávu.',
  'modules.11.title': 'Dokumentace',
  'modules.11.desc': 'Čím toto měření je a čím rozhodně není.',
  'modules.12.title': 'Nastavení',
  'modules.12.desc': 'Motiv, velikost textu, omezení pohybu, mazání historie.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'Měřicí kanály',
  'channels.pick': 'Zobrazit na velkém ukazateli',
  'channels.stale': 'bez dat',
  'channels.approx': 'přibližná hodnota',

  'help.unit': 'Jednotka',
  'help.range': 'Rozsah',
  'help.thresholds': 'Prahy',
  'help.warn': 'Práh upozornění',
  'help.crit': 'Kritický práh',
  'help.now': 'teď',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „Veličina“ w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'Veličina',
  'col.unit': 'Jednotka',
  'col.range': 'Rozsah',
  'col.direction': 'Směr',
  'col.time': 'Čas',
  'col.date': 'Datum',
  'col.zone': 'Zóna',
  'col.avg': 'Průměr',
  'col.min': 'Minimum',
  'col.max': 'Maximum',
  'col.name': 'Sloupec',
  'col.meaning': 'Co obsahuje',
  'col.channel': 'Kanál',
  'col.gain': 'Zesílení',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'Časový rozsah',
  'recorder.range.60s': '60 s',
  'recorder.range.15min': '15 min',
  'recorder.range.1h': '1 h',
  'recorder.range.24h': '24 h',
  'recorder.range.30d': '30 dní',
  'recorder.gap': 'bez měření',
  'recorder.sessionTitle': 'Statistika měření',
  'recorder.zonesCaption': 'Rozdělení zón pro podíl modré',
  'recorder.tableCaption': 'Odečty ze zvoleného rozsahu',
  'recorder.crosshair': 'Kříž odečtu',
  'recorder.prevAria': 'Dřívější bod',
  'recorder.nextAria': 'Pozdější bod',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'Vzhled',
  'settings.themeLabel': 'Motiv',
  'settings.themeSystem': 'Podle systému',
  'settings.themeLight': 'Světlý',
  'settings.themeDark': 'Tmavý',
  'settings.themeHint': 'Motiv „podle systému“ se mění spolu s nastavením telefonu.',
  'settings.textLabel': 'Velikost textu',
  /* Mnożnik jako LICZBA we wstawce — 1,15 po czesku, 1.15 po angielsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'Zvětší celé rozhraní, nejen písmena — tlačítka i řádky rostou spolu s textem.',
  'settings.motionGroup': 'Pohyb',
  'settings.motionLabel': 'Omezit pohyb',
  'settings.motionHint': 'Vypne všechny přechody. Ručička škály pak přeskakuje jednou za sekundu, místo aby plynula.',
  'settings.dataTitle': 'Data',
  'settings.clearLabel': 'Vymazat historii',
  'settings.clearHintTpl': 'V historii je teď {count} uložených bodů.',
  'settings.clearHintEmpty': 'Historie je prázdná.',
  'settings.clearTitle': 'Vymazat historii?',
  'settings.clearConfirm': 'Vymazat celou historii měření? Nejde to vzít zpět.',
  'settings.clearKey': 'Vymazat',
  'settings.aboutTitle': 'O aplikaci',
  'settings.versionTpl': '{app}, verze {version}.',
  'settings.offlineText': 'Aplikace funguje bez sítě. Po prvním otevření leží všechny její soubory v paměti prohlížeče, takže režim letadlo nic nemění. Nic se neodesílá na žádný server, protože aplikace neprovádí síťové požadavky.',
  'settings.docsKey': 'Otevřít dokumentaci',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'Zrušit',
  'common.save': 'Uložit',
  'common.reset': 'Obnovit výchozí',
  'common.yes': 'Ano',
  'common.no': 'Ne',
  'common.on': 'Zapnuto',
  'common.off': 'Vypnuto',
  'common.sep': ' · ',
  'common.stepsTitle': 'Krok za krokem',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'K čemu jsou vlastní prahy',
  'modules.02.intro': 'Práh rozhoduje, kdy aplikace řekne „Pozor“ a kdy „Kriticky“. Výchozí hodnoty jsou naše redakční úvaha, ne norma — pokud měříte v jiných podmínkách, posuňte si je. Hodnocení i věta na přehledu se z nových prahů počítají okamžitě.',
  'modules.02.orderNormal': 'Práh upozornění musí ležet pod kritickým.',
  'modules.02.orderInvert': 'Tady je vyšší hodnota lepší, proto práh upozornění leží nad kritickým.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'Náhled škály: {name}',
  'modules.02.nowTpl': 'teď {value}',
  'modules.02.resetDone': 'Výchozí prahy obnoveny.',
  'modules.02.profilesTitle': 'Profily',
  'modules.02.profilesHint': 'Profil je uložená sada prahů všech sedmi veličin. Použití profilu je vymění naráz.',
  'modules.02.profileSaveKey': 'Uložit současné prahy',
  'modules.02.profileNameLabel': 'Název nového profilu',
  'modules.02.profileNameHint': 'Název zůstane v tomto zařízení. Nejvýše 40 znaků.',
  'modules.02.profileNameEmpty': 'Zadejte název profilu.',
  'modules.02.profileSavedTpl': 'Profil „{name}“ uložen.',
  'modules.02.profileAppliedTpl': 'Profil „{name}“ použit.',
  'modules.02.profileRemovedTpl': 'Profil „{name}“ smazán.',
  'modules.02.profileFailed': 'Tento profil se nepodařilo použít.',
  'modules.02.profileCustomTpl': 'Vlastní profil uložený {date}.',
  'modules.02.builtin.default.name': 'Výchozí',
  'modules.02.builtin.default.desc': 'Prahy z katalogu veličin — výchozí bod pro všechna měření.',
  'modules.02.builtin.evening.name': 'Večer — šetrný',
  'modules.02.builtin.evening.desc': 'Varuje dřív před studenou barvou a cirkadiánním vlivem.',
  'modules.02.builtin.work.name': 'Práce u stolu',
  'modules.02.builtin.work.desc': 'Připouští jasné studené denní světlo; hlídá blikání a rovnoměrnost.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'Proč to funguje',
  'modules.03.why': 'Snímač fotoaparátu má mezi kanály stálou odchylku. Změření bílého papíru ukáže, jak velká je, a dovolí ji odečíst. Je to jediná funkce v této aplikaci, která opravdu zvyšuje přesnost — a fotoaparát se z ní stejně spektrometrem nestane.',
  'modules.03.steps.1': 'Položte bílý papír pod měřené světlo.',
  'modules.03.steps.2': 'Na přehledu stiskněte „Start měření“ a vyplňte papírem celý záběr.',
  'modules.03.steps.3': 'Vraťte se sem, stiskněte „Kalibrovat“ a tři sekundy telefonem nehýbejte.',
  'modules.03.runKey': 'Kalibrovat (3 s)',
  'modules.03.clearKey': 'Smazat kalibraci',
  'modules.03.busyTpl': 'Měřím papír… zbývá {sec} s',
  'modules.03.statusNone': 'Bez kalibrace. Měření funguje, hodnoty berte jako srovnávací.',
  'modules.03.statusOnTpl': 'Zkalibrováno {date} v {time}.',
  'modules.03.gainsTitle': 'Zesílení kanálů',
  'modules.03.gainR': 'Červený',
  'modules.03.gainG': 'Zelený',
  'modules.03.gainB': 'Modrý',
  'modules.03.gainsNone': 'nenastaveno',
  'modules.03.needRunning': 'Nejprve spusťte měření a namiřte kameru na bílý papír.',
  'modules.03.tooFew': 'Příliš málo vzorků. Zkontrolujte, zda měření opravdu běží.',
  'modules.03.tooDark': 'Obraz je na kalibraci příliš tmavý. Přisviťte papíru a zkuste to znovu.',
  'modules.03.refused': 'Odchylka kanálů je příliš velká, než aby ji šlo uznat za kalibraci. Použijte bílý papír v rovnoměrném světle.',
  'modules.03.done': 'Zkalibrováno. Barevná teplota a cirkadiánní vliv teď budou přesnější.',
  'modules.03.cleared': 'Kalibrace smazána.',
  'modules.03.limitsTitle': 'Co kalibrace nespraví',
  'modules.03.limits.1': 'Kalibrace srovná tři kanály fotoaparátu a nic víc. Nedá fotoaparátu spektrum, takže barevná teplota a cirkadiánní vliv zůstávají přiblížením vypočteným z barev sRGB.',
  'modules.03.limits.2': 'Nepromění jas scény v absolutní veličinu — to číslo zůstává relativní. Nevypne automatiku expozice ani vyvážení bílé, které odečet pod povrchem posouvají.',
  'modules.03.limits.3': 'Nepřenáší se na jiné světlo: kalibrace pořízená pod žárovkou popisuje tuto žárovku. U jiného zdroje ji zopakujte. A nemění nic na tom, čím toto měření není — pořád to není vyšetření ani podklad pro stanovení nemoci.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'Období reportu',
  'modules.04.rangeDay': 'Den',
  'modules.04.rangeWeek': 'Týden',
  'modules.04.headTpl': 'Od {from} do {to} · {count} bodů historie.',
  'modules.04.tableTitle': 'Souhrn',
  'modules.04.tableCaption': 'Průměr, minimum a maximum ve zvoleném období',
  'modules.04.panoramaTitle': 'Panorama',
  'modules.04.panoramaAriaTpl': 'Panorama: {name}, {span}.',
  'modules.04.panoramaSpanDay': 'poslední den rozdělený po hodinách',
  'modules.04.panoramaSpanWeek': 'poslední týden rozdělený po dnech',
  'modules.04.panoramaHint': 'Výška i barva sloupce říkají totéž: v normě — nízký, pozor — střední, kriticky — plný. Čárka u paty značí hodinu bez měření.',
  'modules.04.coverageDayTpl': 'Měření pokrylo {done} z {total} hodin.',
  'modules.04.coverageWeekTpl': 'Měření pokrylo {done} z {total} dní.',
  'modules.04.zonesTitle': 'Rozdělení zón',
  'modules.04.zonesCaptionTpl': 'Počítáno pro hlavní kanál: {name}.',
  'modules.04.worstTpl': 'Nejnáročnější doba: {value}.',
  'modules.04.worstNone': 'žádná výrazná',
  'modules.04.worstHourTpl': '{hour}',
  'modules.04.adviceTitle': 'Co s tím',
  'modules.04.adviceMelanopicTpl': 'Průměrný cirkadiánní vliv byl {value}×. Večer se vyplatí klesnout pod 0,50 — nejsnáz teplejší žárovkou nebo nočním režimem.',
  'modules.04.adviceKelvinTpl': 'Světlo bylo studené (průměrně {value} K). K práci je to bez výhrad; dvě hodiny před spaním je šetrnější méně než 3000 K.',
  'modules.04.adviceFlickerTpl': 'Je znát zřetelné blikání (průměrně {value} %). Obvykle za ně může levný stmívač nebo napájení podsvícení.',
  'modules.04.adviceUniformityTpl': 'Světlo se rozkládá nerovnoměrně ({value} %). Přesunutí lampy nebo změna úhlu obvykle udělá víc než výměna žárovky.',
  'modules.04.adviceWorstTpl': 'Nejvíc odečtů mimo prahy se soustředí v {hour}.',
  'modules.04.adviceNone': 'V tomto období nic nevybočuje nad nastavené prahy.',
  'modules.04.limitsTitle': 'Toto není zdravotní rada',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'Závěry vyplývají výhradně z toho, co viděla kamera tohoto telefonu. Aplikace neměří spektrum a nestanovuje žádnou diagnózu.',
  'modules.04.printHint': 'Tato stránka je pojatá jako výtisk: tabulka i popisky se čtou stejně na papíře, v systémové lupě i ve čtečce obrazovky.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'Rozsah dat',
  'modules.05.range1h': 'Hodina',
  'modules.05.range24h': 'Den',
  'modules.05.range7d': '7 dní',
  'modules.05.range30d': '30 dní',
  'modules.05.csvKey': 'Uložit soubor CSV',
  'modules.05.jsonKey': 'Uložit soubor JSON',
  'modules.05.formatTitle': 'Formát souboru',
  'modules.05.formatCsv': 'CSV: sloupce odděluje středník, desetinným oddělovačem je čárka, kódování UTF-8 se značkou BOM. Excel s českým nastavením takový soubor otevře, aniž byste cokoli nastavovali.',
  'modules.05.formatJson': 'JSON: tatáž data v poli „points“, s desetinnou tečkou a časovou značkou v milisekundách — to formát vyžaduje.',
  'modules.05.resolution': 'Historie ukládá jeden bod každých 5 sekund a sahá 30 dní zpět. Plné rozlišení pěti vzorků za sekundu soubor neobsahuje — měřicí jádro je drží jen minutu.',
  'modules.05.offline': 'Soubor vzniká v zařízení a v zařízení zůstává. Export se nepřipojuje k síti.',
  'modules.05.columnsTitle': 'Popis sloupců',
  'modules.05.columnsCaption': 'Sloupce souboru a jejich význam',
  'modules.05.descDate': 'Datum bodu z hodin zařízení, v zápisu den-měsíc-rok.',
  'modules.05.descTime': 'Čas bodu s přesností na sekundu.',
  'modules.05.descZone': 'Zóna podílu modré v okamžiku zápisu. Měřicí jádro ukládá zónu jen pro tuto jedinou veličinu — u ostatních si ji spočítejte z prahů.',
  'modules.05.descMetricTpl': '{short} Jednotka: {unit}. Rozsah {min}–{max}.',
  'modules.05.previewTitle': 'Náhled',
  'modules.05.previewHint': 'Prvních pět řádků souboru, přesně tak, jak budou uloženy.',
  'modules.05.savedTpl': 'Soubor {name} uložen — {rows} řádků.',
  'modules.05.failed': 'Tento prohlížeč soubor uložit nedovolil.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'Aplikace ukládá každé dokončené měření do tohoto zařízení. Vyberte dvě, ať je uvidíte na jednom pásu a rozdíl si přečtete v číslech.',
  'modules.06.noSessions': 'Zatím tu není žádné dokončené měření. Spusťte měření, zastavte je a vraťte se sem.',
  'modules.06.slotA': 'Měření A',
  'modules.06.slotB': 'Měření B',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'Pás',
  'modules.06.tapeAriaTpl': 'Průběh měření {slot}, veličina {name}.',
  'modules.06.tapeHint': 'Obě měření jsou roztažena na stejnou šířku: sloupec je stejná část doby trvání, ne stejná hodina. Výška a barva říkají totéž co na přehledu.',
  'modules.06.tapeChannelTpl': 'Pás ukazuje hlavní kanál: {name}.',
  'modules.06.diffTitle': 'Rozdíl',
  'modules.06.diffCaption': 'Průměry obou měření a rozdíl mezi nimi',
  'modules.06.clearKey': 'Smazat uložená měření',
  'modules.06.cleared': 'Uložená měření smazána.',
  'modules.06.savedTpl': 'Měření uloženo: {dur}.',
  'modules.06.limitsTitle': 'Co toto porovnání neříká',
  'modules.06.limits': 'Porovnáváte dvě měření, ne dva světelné zdroje. Pokud se mezi nimi změnil záběr, vzdálenost, denní doba nebo poloha telefonu, je rozdíl i o tom. Nejpoctivější porovnání je tatáž scéna před změnou osvětlení a po ní.',
  'modules.06.keepTpl': 'Pamatuje se nejvýše {count} posledních měření.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'Kontrolní obrazce se zobrazují přes celou obrazovku tohoto zařízení. Slouží k prohlédnutí obrazovky okem: zda je bílá rovnoměrná, zda šedé netáhnou do barvy a zda podsvícení neprosvítá v rozích.',
  'modules.07.steps.1': 'Nastavte jas obrazovky na hodnotu, při které běžně pracujete, a vypněte systémový noční režim.',
  'modules.07.steps.2': 'Vyberte obrazec ze seznamu níže. Vyplní celou obrazovku.',
  'modules.07.steps.3': 'Dívejte se z přibližně šedesáti centimetrů, kolmo na obrazovku. Potom si tentýž obrazec prohlédněte pod úhlem.',
  'modules.07.steps.4': 'Odejděte tlačítkem „Zavřít obrazec“ nebo klávesou Escape a přejděte k dalšímu.',
  'modules.07.planesTitle': 'Obrazce',
  'modules.07.exitKey': 'Zavřít obrazec',
  'modules.07.showAriaTpl': 'Zobrazit obrazec: {name}',
  'modules.07.planeAriaTpl': 'Kontrolní obrazec: {name}. Tlačítko pro zavření je dole na obrazovce.',
  'modules.07.plane.white.name': 'Bílá',
  'modules.07.plane.white.hint': 'Hledejte skvrny, barevné nádechy a projasnění u okrajů. Bílá má být po celé ploše jedna barva.',
  'modules.07.plane.gray75.name': 'Šedá 75 %',
  'modules.07.plane.gray75.hint': 'Šedá má být šedá. Nazelenalý nebo narůžovělý nádech znamená rozladěné vyvážení bílé obrazovky.',
  'modules.07.plane.gray50.name': 'Šedá 50 %',
  'modules.07.plane.gray50.hint': 'Nejlepší obrazec pro posouzení nádechu. Porovnejte střed s rohy.',
  'modules.07.plane.gray25.name': 'Šedá 25 %',
  'modules.07.plane.gray25.hint': 'Tmavá šedá ukáže prosvítající podsvícení a pruhy na levných panelech.',
  'modules.07.plane.black.name': 'Černá',
  'modules.07.plane.black.hint': 'V tmavé místnosti je tu vidět každé prosvítající podsvícení i projasněné rohy.',
  'modules.07.plane.red.name': 'Čistá červená',
  'modules.07.plane.red.hint': 'Jednolitá červená odhalí mrtvé subpixely a nerovnoměrnost panelu.',
  'modules.07.plane.green.name': 'Čistá zelená',
  'modules.07.plane.green.hint': 'Zelená nese nejvíc jasu — na ní se poškozený pixel hledá nejsnáz.',
  'modules.07.plane.blue.name': 'Čistá modrá',
  'modules.07.plane.blue.hint': 'Modrá ukáže nečistoty a šmouhy na povrchu obrazovky lépe než bílá.',
  'modules.07.plane.grid.name': 'Mřížka',
  'modules.07.plane.grid.hint': 'Čáry mají být v rozích stejně ostré jako uprostřed. Rozmazání u okrajů je věc škálování obrazu.',
  'modules.07.warn': 'Obrazec zakryje celou obrazovku, i ovládací přehled s tlačítkem měření. Je to jediné místo v aplikaci, kde se to děje, a proto je tlačítko pro odchod velké a stále viditelné. Dokud je obrazec na obrazovce, měření běží dál a nejde zastavit — zavřete obrazec, ať se vrátíte k tlačítkům.',
  'modules.07.cameraTitle': 'Co tady nezvládnete',
  'modules.07.camera': 'Telefon nevidí vlastní obrazovku, takže tyto obrazce tímtéž zařízením nezměříte. Chcete-li změřit monitor, zobrazte obrazec na monitoru a měřte telefonem — to jsou dvě různá zařízení a dvě různé role.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'Plánovač připomene měření ve stanovenou dobu. Kameru sám nezapíná: v určenou hodinu ukáže připomenutí a měření spustíte tlačítkem „Start měření“ na přehledu. Stejně jako poprvé.',
  'modules.08.onlyOpenTitle': 'Kdy to nezabere',
  'modules.08.onlyOpen': 'Plánovač funguje jen při otevřené aplikaci. Zavřená karta prohlížeče čas nepočítá a nic nepřipomene. Nežádáme o souhlas se systémovými oznámeními a nic neodesíláme do sítě.',
  'modules.08.enableLabel': 'Zapnout připomenutí',
  'modules.08.timesTitle': 'Časy',
  'modules.08.timeAriaTpl': 'Čas {n}: hodina připomenutí',
  'modules.08.addKey': 'Přidat čas',
  'modules.08.removeAriaTpl': 'Smazat čas {time}',
  'modules.08.addedTpl': 'Čas {time} přidán.',
  'modules.08.removedTpl': 'Čas {time} smazán.',
  'modules.08.badTime': 'Zadejte hodinu ve tvaru 22:00.',
  'modules.08.nextTpl': 'Nejbližší připomenutí: {time}.',
  'modules.08.nextNone': 'Připomenutí jsou vypnutá.',
  'modules.08.dueTpl': 'Naplánovaná doba měření: {time}.',
  'modules.08.dueKey': 'Zobrazit přehled',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'Výstraha hlídá jednu veličinu a ozve se teprve tehdy, když ta drží zvolenou zónu nepřetržitě po nastavenou dobu. Nikdy nezastaví měření a nikdy nezakryje tlačítka.',
  'modules.09.enableLabel': 'Zapnout výstrahy',
  'modules.09.metricLabel': 'Hlídaná veličina',
  'modules.09.levelLabel': 'Od které zóny',
  'modules.09.levelWarning': 'Od „Pozor“ výše',
  'modules.09.levelCritical': 'Jen kritická',
  'modules.09.sustainLabel': 'Po kolika sekundách nepřetržitě',
  'modules.09.sustainHint': 'Kratší časy dávají víc planých poplachů, když telefonem pohnete. Pod pět sekund nejdeme.',
  'modules.09.soundLabel': 'Krátký zvukový signál',
  'modules.09.soundHint': 'Zvuk vzniká v zařízení. Nic se nestahuje ze sítě.',
  'modules.09.cooldownHint': 'Nejvýše jedna výstraha za dvě minuty. Poplach opakovaný při každém vzorku je poplach, který se vypne natrvalo.',
  'modules.09.whenNotTitle': 'Kdy výstraha nezabere',
  'modules.09.whenNot': 'Oznámení je uvnitř aplikace, ne v systému. Nezabere, když je aplikace zavřená nebo schovaná na pozadí, když měření neběží a když hlídanou veličinu nelze v danou chvíli změřit. Nežádáme o souhlas se systémovými oznámeními.',
  'modules.09.firedTpl': '{name}: {zone} už {sec} s — teď {value}.',
  'modules.09.saved': 'Nastavení výstrahy uloženo.',
  'modules.09.statusOnTpl': 'Hlídám: {name}, {level}, po {sec} s.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'Tato aplikace je zdarma',
  'support.freeText': 'Všech sedm veličin ukazuje čísla od prvního spuštění. Záznamník, prahy, kalibrace, reporty, export, porovnání měření i celá historie z třiceti dní fungují bez účtu, bez poplatků a bez limitů — stejně tak v režimu offline. Nic tu není odložené za poplatek na později.',
  'support.whyTitle': 'Proč o to prosím',
  'support.whyText': 'Monitor světla dělám a udržuji sám, po práci. Podpora jde na čas potřebný na opravy, na testování na dalších telefonech a na další nástroje v seznamu modulů. Nic nepřestane fungovat, když nikdo nic nepošle.',
  'support.nothingTitle': 'Co dar přinese',
  'support.nothingText': 'Nic. Žádné číslo, žádný modul ani žádné nastavení se po daru neodemkne, protože všechno je odemčené od začátku. Zbude jen to, že vím, že se to někomu hodilo.',
  'support.keyTitle': 'Pokud chcete pomoct',
  'support.keyLabel': 'Kupte mi kávu',
  'support.keyAria': 'Kupte mi kávu — otevře externí stránku na nové kartě',
  'support.serviceText': 'Profil pro dary vede externí služba, například Buy Me a Coffee. Aplikace z něj nenačítá žádný skript, widget ani obrázek — stojí tu obyčejný odkaz a nic víc.',
  'support.privacyText': 'Stisknutí tohoto tlačítka otevře externí stránku na nové kartě a je to jediný okamžik, kdy cokoli opouští toto zařízení. Měření, historie a nastavení zůstávají tam, kde byly — v paměti tohoto prohlížeče.',
  'support.privacyPendingText': 'Až se adresa objeví, stisknutí tlačítka otevře externí stránku na nové kartě a bude to jediný okamžik, kdy cokoli opouští toto zařízení. Měření, historie a nastavení zůstávají tam, kde byly — v paměti tohoto prohlížeče.',
  'support.emptyTitle': 'Profil zatím není připojený',
  'support.emptyText': 'Adresa profilu pro dary zatím nebyla zadána, takže tu není tlačítko, které by vedlo nikam. Zbytek aplikace funguje beze změny — nic na ten dar nečeká.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'Co tato aplikace NEMĚŘÍ',
  'docs.notList.1': 'Neměří spektrum. Fotoaparát má tři široké barevné kanály, automatickou expozici a automatické vyvážení bílé.',
  'docs.notList.2': 'Neměří absolutní hodnoty. Jas scény je relativní ukazatel, ne výsledek fotometrického měření.',
  'docs.notList.3': 'Neměří barevnou teplotu přímo. Barevná teplota a cirkadiánní vliv jsou přiblížení vypočtená z barev sRGB.',
  'docs.notList.4': 'Nevidí síťové blikání. Vzorkování 5 Hz vidí pulzování jen pod 2,5 Hz — síťových 100 Hz je mimo dosah a aplikace je nikdy neuvede jako výsledek.',
  'docs.notList.5': 'Nestanovuje diagnózu a nedává zdravotní radu. Žádný výsledek není ani jedním, ani druhým.',
  'docs.notList.6': 'Neporovnává vaše světlo s žádným úředním vzorem. Prahy jsou nastavení, které si můžete změnit v modulu 02.',
  'docs.whatTitle': 'Co měří a jak',
  'docs.whatLead': 'Kamera telefonu se dívá na osvětlenou plochu a aplikace pětkrát za sekundu počítá průměry kanálů R, G a B ze středního výřezu záběru. Z těchto tří čísel odvozuje sedm ukazatelů.',
  'docs.whatCrop': 'Výřez tvoří prostředních 60 % šířky a 60 % výšky snímku — přesně ten obdélník, který na obrazovce ZAMĚŘOVÁNÍ obkresluje zaměřovač. Mimo něj se nepočítá nic.',
  'docs.whatRate': 'Jeden vzorek každých 200 ms, tedy 5krát za sekundu. Poslední minuta leží v paměti v plném rozlišení; všechno starší se ukládá každých 5 sekund a sahá třicet dní zpět.',
  'docs.metricsTitle': 'Sedm veličin',
  'docs.formulasTitle': 'Vzorce',
  'docs.formula.share.formula': 'podíl = B / (R + G + B) × 100 %',
  'docs.formula.share.text': 'Počítá se z hodnot sRGB bez odstranění gamma — záměrně, protože je to táž definice jako v předchozí verzi aplikace a prahy nastavené tehdy znamenají dál totéž. Odděluje barvu od jasu.',
  'docs.formula.brightness.formula': 'jas = (R + G + B) / 3 / 255 × 100 %',
  'docs.formula.brightness.text': 'Průměrná hodnota kanálů v procentech rozsahu. Automatika expozice s ní pod povrchem pohybuje, takže je to relativní ukazatel — porovnávejte dvě scény, nečtěte jedno číslo jako výsledek měření.',
  'docs.formula.kelvin.title': 'Barevná teplota — McCamyho přiblížení',
  'docs.formula.kelvin.formula': 'n = (x − 0,3320) / (y − 0,1858)\nCCT = −449 n³ + 3525 n² − 6823,3 n + 5520,33',
  'docs.formula.kelvin.text': 'Nejprve odstraníme gamma sRGB, potom maticí přejdeme na CIE XYZ pro bílou D65 a spočítáme chromatičnost x, y. McCamyho vzorec je věrohodný zhruba mezi 2000 K a 12500 K. Mimo tento rozsah se kubická křivka rozjíždí, takže se výsledek ořízne a označí za nevěrohodný — základní čára škály se tehdy změní na čárkovanou a objeví se věta „mimo rozsah metody“.',
  'docs.formula.melanopic.title': 'Cirkadiánní vliv — melanopický poměr',
  'docs.formula.melanopic.formula': 'mel = 0,0016 R + 0,3110 G + 0,8460 B\nY = 0,2127 R + 0,7152 G + 0,0722 B\nvýsledek = (mel / Y) × normalizace na 1,00 pro neutrální bílou',
  'docs.formula.melanopic.text': 'Všechny tři kanály v lineárních hodnotách. Skutečná veličina je integrál spektra s křivkou citlivosti melanopsinu (vrchol kolem 490 nm); fotoaparát má tři široké kanály, proto vážíme základní barvy sRGB melanopickou citlivostí při jejich přibližných vlnových délkách (R 612 nm, G 549 nm, B 465 nm). Směr změn je věrohodný, absolutní hodnota ne — proto u tohoto čísla stojí znak „≈“.',
  'docs.formula.flicker.formula': 'blikání = (max − min) / (max + min) × 100 %',
  'docs.formula.flicker.text': 'Definice IES, počítaná z okna vzorků jasu. Frekvenci odhadujeme z počtu průchodů signálu průměrnou hodnotou. Vzorkování 5 Hz vidí modulaci jen pod 2,5 Hz (Nyquistova mez) a za věrohodnou uznáváme teprve frekvenci mezi 0,2 a 2 Hz při amplitudě od 0,5 % — pod tímto prahem jsou průchody průměrem šum snímače, ne pulzování zdroje.',
  'docs.formula.uniformity.formula': 'rovnoměrnost = nejtmavší pole / nejsvětlejší pole × 100 %',
  'docs.formula.uniformity.text': 'Výřez dělíme na devět polí v mřížce 3×3 a porovnáváme krajní. 100 % je světlo rozložené dokonale rovnoměrně. Nízká hodnota na obrazovce znamená prosvítající podsvícení nebo odraz, na stole špatně postavenou lampu. Je to jediná veličina, u které spolu se zrakovým komfortem platí, že výš znamená lépe.',
  'docs.formula.comfort.formula': '100 bodů minus srážky:\ncirkadiánní vliv nad 0,75 — až 35 b.\nbarva nad 4000 K — až 25 b.\nblikání nad 5 % — až 25 b.\nrovnoměrnost pod 60 % — až 15 b.',
  'docs.formula.comfort.text': 'Jedno hodnocení místo šesti čísel. Veličina, kterou se nepodařilo změřit, nedává žádnou srážku — chybějící data nikdy nepředstírají dobrý výsledek. Váhy jsou naše redakční úvaha, ne norma; proto modul 01 ukazuje rozpis na složky, aby s tímto hodnocením šlo nesouhlasit.',
  'docs.rangesTitle': 'Rozsahy a prahy',
  'docs.rangesLead': 'Prahy níže jsou ty, které právě teď platí — pokud jste si je změnili v modulu 02, tabulka ukazuje vaše hodnoty, ne tovární.',
  'docs.dirNormal': 'níž znamená šetrněji',
  'docs.dirInvert': 'výš znamená lépe',
  'docs.privacyTitle': 'Data a soukromí',
  'docs.privacyText': 'Obraz z kamery se nikam neodesílá ani neukládá — z každého snímku zbývají jen tři čísla. Měření, prahy a nastavení leží v paměti prohlížeče v tomto zařízení. Aplikace neprovádí žádné síťové požadavky a funguje v režimu offline.',
  'docs.mdrTitle': 'Upozornění',
  'docs.freeText': 'Aplikace je celá zdarma a taková zůstane: všech sedm veličin, historie, reporty, export i režim offline fungují bez účtu, bez poplatků a bez limitů. Kdo chce poděkovat, najde modul 10 „Podpora“.',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'Aplikace se načetla neúplně',
  'boot.filesTpl': 'Nenačetly se soubory: {list}.',
  'boot.modulesTpl': 'Nepřihlásily se moduly: {list} — tyto položky se ze seznamu neotevřou.',
  'boot.modulesRangeTpl': 'moduly {from}–{to}',
  'boot.tail': 'Načtěte stránku znovu. Pokud to nepomůže, soubory na serveru jsou neúplné.',
  'boot.loss.bus': 'moduly se přestanou vidět a měření se nespustí',
  'boot.loss.metrics': 'nespočítá se žádná hodnota',
  'boot.loss.scaleCore': 'zmizí geometrie škály a formátování čísel',
  'boot.loss.scaleText': 'zmizí všechny nápisy rozhraní',
  'boot.loss.shell': 'nepůjde otevřít žádný modul',
  'boot.loss.engine': 'kamera a měření se nespustí',
  'boot.loss.dash': 'přehled zůstane prázdný'
});
