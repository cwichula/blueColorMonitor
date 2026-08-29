/* docs/v3/i18n/hu.js — słownik WŁASNY wersji v3, węgierski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/hu.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js tego katalogu — pilnuje
 * tego docs/shared/i18n/keys.test.js. Kluczy, które stoją w słowniku wspólnym
 * (nazwy stref, zdania oceniające, noty o granicach metody, nazwy i opisy
 * siedmiu wielkości, zastrzeżenie z rozporządzenia (UE) 2017/745), tu NIE MA —
 * poza jednym świadomym nadpisaniem, opisanym przy 'verdict.critical.comfort'.
 *
 * REJESTR: druga osoba liczby pojedynczej (tegezés), dokładnie jak
 * w docs/shared/i18n/hu.js — oba pliki składają się w JEDEN obiekt napisów,
 * więc rejestr musi być jeden. O sobie aplikacja mówi w pierwszej osobie liczby
 * mnogiej („nem küldjük”, „nem kérünk engedélyt”).
 *
 * TERMINOLOGIA — wzięta ze słownika wspólnego i trzymana bez wyjątków:
 *   kék arány, jelenet fényereje, színhőmérséklet, cirkadián hatás
 *   (współczynnik: melanopikus arány), villódzás, egyenletesség, látáskomfort;
 *   strefy: Rendben / Figyelem / Kritikus; jednostki czasu: mp, p, ó;
 *   „az sRGB alapszínekből számított közelítés”, „a módszer tartományán kívül”,
 *   „az értékeket összehasonlításra használd”.
 * ODPOWIEDNIKI WŁASNE v3: műszerfal (pulpit), modul (moduł), mennyiség
 *   (wielkość), küszöb (próg), figyelmeztetési küszöb / kritikus küszöb
 *   (próg uwagi / próg krytyczny), munkamenet (sesja), előzmények (historia),
 *   leolvasás (odczyt), minta (próbka), tesztkép (plansza), Rögzítő
 *   (rejestrator), szalag (taśma).
 *
 * ZAPIS: cudzysłowy „ ” (U+201E, U+201D); apostrofu ASCII w napisach nie ma
 * i być nie może — rozerwałby napis w pojedynczych cudzysłowach. Przed znakiem
 * % nie stawiamy spacji. Rodzajnik przed wstawką zapisujemy „A(z)”, bo dopiero
 * treść wstawki rozstrzyga, który wariant jest poprawny.
 *
 * ZAPIS LICZB WE WZORACH. Polska redakcja pisze przecinek dziesiętny
 * („0,3320”), angielska kropkę — węgierski, jak polski, pisze przecinek.
 * Liczby wstawiane przez '{…}' są osobną sprawą: te formatuje warstwa językowa
 * według aktywnego języka.
 */
window.I18nData = window.I18nData || {};
window.I18nData['hu'] = Object.assign(window.I18nData['hu'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. */
  'app.wordmark': 'FÉNYMONITOR',

  'state.idle': 'Kész',
  'state.starting': 'Indítás',
  'state.running': 'Mérés',
  'state.runningTpl': 'Mérés {time}',
  'state.stopped': 'Leállítva',
  'state.error': 'Kamerahiba',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5,0 po węgiersku, 5.0 po angielsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'Mérés indítása',
  'keys.starting': 'Indítás…',
  'keys.stop': 'Leállítás',
  'keys.flip': 'Váltás',
  'keys.flipAria': 'Kameraváltás: előlapi vagy hátlapi',
  'keys.menu': 'Menü',
  'keys.menuAria': 'Modulok listája',
  'keys.back': '‹ Vissza',
  'keys.backAria': 'Vissza a műszerfalra',
  'keys.dash': 'Műszerfal',
  'keys.zoom': 'Előnézet nagyítása',
  'keys.retry': 'Próbáld újra',
  'keys.refresh': 'Frissítés',
  'keys.close': 'Bezárás',
  'keys.show': 'Megjelenítés',
  'keys.apply': 'Alkalmaz',
  'keys.remove': 'Törlés',

  'monitor.legend': 'Ellenőrző előnézet',
  'monitor.badge': 'Élő',

  'aim.title': 'Célzás',
  'aim.hint': 'A keret pontosan azt a képrészletet mutatja, amelyet az alkalmazás mér.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'Fő csatorna',
  'readout.thresholdTpl': '(küszöb {value})',
  'readout.contextTpl': 'min. {min} · átl. {avg} · max. {max} — az utolsó 60 mp',
  'readout.contextEmpty': 'nincs adat az utolsó 60 mp-ből',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'Mit jelent: {name}',
  'aria.channel': '{name}, {value}, {zone}. Megjelenítés a nagy kijelzőn.',
  'aria.channelStale': '{name}, nincs adat. Megjelenítés a nagy kijelzőn.',
  'aria.scale': 'Skála: {name}, {min} és {max} között. Most {value}, {zone}. Figyelmeztetési küszöb {warn}, kritikus küszöb {crit}.',
  'aria.readout': '{name}: {value}, {zone}.',
  'aria.readoutApprox': '{name}: körülbelül {value}, {zone}. Közelítő érték.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'A fő csatorna skálája. Nincs adat',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': 'Nyomd meg a „Mérés indítása” gombot, irányítsd a telefont megvilágított felületre, és tartsd mozdulatlanul néhány másodpercig.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'A látáskomfort alacsony. Nézd meg a 01-es modult, hogy lásd, mi rontja.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'Kezdd a képernyő alján lévő „Mérés indítása” gombbal. A kamera csak a megnyomása után kapcsol be.',
  'transient.measureStopped': 'A mérés befejeződött · {time} · mentve az előzményekbe.',
  'transient.newVersion': 'Elérhető az alkalmazás új verziója.',
  'transient.thresholdsSaved': 'A küszöbök mentve.',
  'transient.thresholdsRejected': 'Nem mentettük — a figyelmeztetési és a kritikus küszöb nem keresztezheti egymást.',
  'transient.historyCleared': 'Az előzmények törölve.',

  'live.lead': 'Fő csatorna: {name}, {value}, {zone}.',
  'live.ready': 'Az értékelés kész. {name} {value}, {zone}.',
  'live.started': 'A mérés elindult.',
  'livebar.stopped': 'A mérés leállt',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'Még nincs egyetlen felvétel sem. Az előzmények mérés közben telnek meg — mérj egy percet, és gyere vissza ide.',
  'empty.recorderNoRange': 'Ebben a tartományban nem volt mérés.',
  'empty.coverageTpl': 'A mérés {total} óra közül {done} órát fedett le.',
  'empty.reportsNoData': 'A napi jelentés az első teljes mérési nap után készül el.',
  'empty.compareOneSession': 'Az összehasonlításhoz két befejezett munkamenet kell. Egyelőre egy van.',
  'empty.exportNoData': 'Nincs mit exportálni. Indíts mérést, hogy legyen tartalma az előzményeknek.',
  'empty.alertsOff': 'A riasztások ki vannak kapcsolva. Bekapcsolás után is csak akkor működnek, ha az alkalmazás nyitva van.',
  'empty.scheduleEmpty': 'Nincs beállítva egyetlen időpont sem. Az ütemezés csak nyitott alkalmazás mellett működik.',
  'empty.historyEmpty': 'Az előzmények üresek.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'Modulok listája',

  'modules.01.title': 'Rögzítő',
  'modules.01.desc': 'A mérés időbeli lefutása, egy perctől harminc napig.',
  'modules.02.title': 'Küszöbök',
  'modules.02.desc': 'Állítsd be a saját figyelmeztetési és riasztási határaidat minden mennyiséghez.',
  'modules.03.title': 'Kalibrálás',
  'modules.03.desc': 'Igazodás ismert fényforráshoz — és az, amit a kalibrálás nem javít meg.',
  'modules.04.title': 'Jelentések',
  'modules.04.desc': 'Napi és heti összesítők nyomtatvány formájában.',
  'modules.05.title': 'Exportálás',
  'modules.05.desc': 'A leolvasások mentése CSV vagy JSON fájlba, az oszlopok leírásával.',
  'modules.06.title': 'Összehasonlítás',
  'modules.06.desc': 'Két munkamenet egymás mellett, számszerűen megadott különbséggel.',
  'modules.07.title': 'Képernyőteszt',
  'modules.07.desc': 'Tesztképek a saját monitorod ellenőrzéséhez, lépésről lépésre.',
  'modules.08.title': 'Ütemezés',
  'modules.08.desc': 'Mérések az általad megadott időpontokban.',
  'modules.09.title': 'Riasztások',
  'modules.09.desc': 'Értesítés a küszöb átlépésekor — és az, amikor nem működik.',
  'modules.10.title': 'Támogatás',
  'modules.10.desc': 'Az alkalmazás teljes egészében ingyenes. Itt meghívhatod a szerzőt egy kávéra.',
  'modules.11.title': 'Dokumentáció',
  'modules.11.desc': 'Mi ez a mérés, és mi biztosan nem.',
  'modules.12.title': 'Beállítások',
  'modules.12.desc': 'Téma, szövegméret, mozgás csökkentése, előzmények törlése.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'Mérési csatornák',
  'channels.pick': 'Megjelenítés a nagy kijelzőn',
  'channels.stale': 'nincs adat',
  'channels.approx': 'közelítő érték',

  'help.unit': 'Mértékegység',
  'help.range': 'Tartomány',
  'help.thresholds': 'Küszöbök',
  'help.warn': 'Figyelmeztetési küszöb',
  'help.crit': 'Kritikus küszöb',
  'help.now': 'most',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „Mennyiség” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'Mennyiség',
  'col.unit': 'Mértékegység',
  'col.range': 'Tartomány',
  'col.direction': 'Irány',
  'col.time': 'Idő',
  'col.date': 'Dátum',
  'col.zone': 'Zóna',
  'col.avg': 'Átlag',
  'col.min': 'Minimum',
  'col.max': 'Maximum',
  'col.name': 'Oszlop',
  'col.meaning': 'Mit tartalmaz',
  'col.channel': 'Csatorna',
  'col.gain': 'Erősítés',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'Időtartomány',
  'recorder.range.60s': '60 mp',
  'recorder.range.15min': '15 perc',
  'recorder.range.1h': '1 óra',
  'recorder.range.24h': '24 óra',
  'recorder.range.30d': '30 nap',
  'recorder.gap': 'nincs mérés',
  'recorder.sessionTitle': 'Munkamenet-statisztika',
  'recorder.zonesCaption': 'A kék arány zónáinak megoszlása',
  'recorder.tableCaption': 'A kiválasztott tartomány leolvasásai',
  'recorder.crosshair': 'Leolvasó szálkereszt',
  'recorder.prevAria': 'Korábbi pont',
  'recorder.nextAria': 'Későbbi pont',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'Megjelenés',
  'settings.themeLabel': 'Téma',
  'settings.themeSystem': 'A rendszer szerint',
  'settings.themeLight': 'Világos',
  'settings.themeDark': 'Sötét',
  'settings.themeHint': 'A „rendszer szerint” téma a telefon beállításával együtt változik.',
  'settings.textLabel': 'Szövegméret',
  /* Mnożnik jako LICZBA we wstawce — 1,15 po węgiersku, 1.15 po angielsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'Az egész felületet nagyítja, nem csak a betűket — a gombok és a sorok a szöveggel együtt nőnek.',
  'settings.motionGroup': 'Mozgás',
  'settings.motionLabel': 'Mozgás csökkentése',
  'settings.motionHint': 'Kikapcsol minden átmenetet. A skála mutatója ilyenkor másodpercenként egyszer ugrik, nem folyamatosan mozog.',
  'settings.dataTitle': 'Adatok',
  'settings.clearLabel': 'Előzmények törlése',
  'settings.clearHintTpl': 'Az előzményekben most {count} mentett pont van.',
  'settings.clearHintEmpty': 'Az előzmények üresek.',
  'settings.clearTitle': 'Törlöd az előzményeket?',
  'settings.clearConfirm': 'Törlöd a teljes mérési előzményt? Ez nem vonható vissza.',
  'settings.clearKey': 'Törlés',
  'settings.aboutTitle': 'Az alkalmazásról',
  'settings.versionTpl': '{app}, {version} verzió.',
  'settings.offlineText': 'Az alkalmazás hálózat nélkül működik. Az első megnyitás után minden fájlja a böngésző tárolójában van, így a repülőgép üzemmód semmit nem változtat. Semmi nem kerül ki egyetlen szerverre sem, mert az alkalmazás nem indít hálózati kéréseket.',
  'settings.docsKey': 'Dokumentáció megnyitása',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'Mégse',
  'common.save': 'Mentés',
  'common.reset': 'Alapértelmezett visszaállítása',
  'common.yes': 'Igen',
  'common.no': 'Nem',
  'common.on': 'Bekapcsolva',
  'common.off': 'Kikapcsolva',
  'common.sep': ' · ',
  'common.stepsTitle': 'Lépésről lépésre',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'Mire jók a saját küszöbök',
  'modules.02.intro': 'A küszöb dönti el, mikor mondja az alkalmazás, hogy „Figyelem”, és mikor azt, hogy „Kritikus”. Az alapértelmezett értékek a mi szerkesztői megítélésünk, nem szabvány — ha más körülmények között mérsz, told el őket magadhoz. Az értékelés és a műszerfalon álló mondat azonnal az új küszöbökből számolódik.',
  'modules.02.orderNormal': 'A figyelmeztetési küszöbnek a kritikus alatt kell lennie.',
  'modules.02.orderInvert': 'Itt a magasabb érték a jobb, ezért a figyelmeztetési küszöb a kritikus fölött van.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'A skála előnézete: {name}',
  'modules.02.nowTpl': 'most {value}',
  'modules.02.resetDone': 'Az alapértelmezett küszöbök visszaálltak.',
  'modules.02.profilesTitle': 'Profilok',
  'modules.02.profilesHint': 'A profil mind a hét mennyiség küszöbeinek elmentett készlete. A profil alkalmazása egyszerre cseréli le mindet.',
  'modules.02.profileSaveKey': 'A jelenlegi küszöbök mentése',
  'modules.02.profileNameLabel': 'Az új profil neve',
  'modules.02.profileNameHint': 'A név ezen az eszközön marad. Legfeljebb 40 karakter.',
  'modules.02.profileNameEmpty': 'Add meg a profil nevét.',
  'modules.02.profileSavedTpl': 'A(z) „{name}” profil mentve.',
  'modules.02.profileAppliedTpl': 'A(z) „{name}” profil alkalmazva.',
  'modules.02.profileRemovedTpl': 'A(z) „{name}” profil törölve.',
  'modules.02.profileFailed': 'Ezt a profilt nem sikerült alkalmazni.',
  'modules.02.profileCustomTpl': 'Saját profil, mentve {date}.',
  'modules.02.builtin.default.name': 'Alapértelmezett',
  'modules.02.builtin.default.desc': 'A mennyiségek katalógusából vett küszöbök — minden mérés kiindulópontja.',
  'modules.02.builtin.evening.name': 'Este — kíméletes',
  'modules.02.builtin.evening.desc': 'Korábban figyelmeztet a hideg fényszínre és a cirkadián hatásra.',
  'modules.02.builtin.work.name': 'Íróasztali munka',
  'modules.02.builtin.work.desc': 'Megengedi a világos, hideg nappali fényt; a villódzásra és az egyenletességre figyel.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'Miért működik ez',
  'modules.03.why': 'A kamera érzékelőjének állandó eltérése van a csatornái között. Egy fehér papírlap megmérése megmutatja, mekkora ez az eltérés, és lehetővé teszi a levonását. Ez az egyetlen funkció ebben az alkalmazásban, amely valóban növeli a pontosságot — és a kamerából még így sem lesz spektrométer.',
  'modules.03.steps.1': 'Tegyél egy fehér papírlapot a mért fény alá.',
  'modules.03.steps.2': 'Nyomd meg a műszerfalon a „Mérés indítása” gombot, és töltsd ki a képet a papírlappal.',
  'modules.03.steps.3': 'Gyere vissza ide, nyomd meg a „Kalibrálás” gombot, és három másodpercig ne mozdítsd meg a telefont.',
  'modules.03.runKey': 'Kalibrálás (3 mp)',
  'modules.03.clearKey': 'Kalibrálás törlése',
  'modules.03.busyTpl': 'Mérem a papírlapot… {sec} mp van hátra',
  'modules.03.statusNone': 'Nincs kalibrálás. A mérés működik, az értékeket összehasonlításra használd.',
  'modules.03.statusOnTpl': 'Kalibrálva {date} {time} órakor.',
  'modules.03.gainsTitle': 'Csatornaerősítések',
  'modules.03.gainR': 'Vörös',
  'modules.03.gainG': 'Zöld',
  'modules.03.gainB': 'Kék',
  'modules.03.gainsNone': 'nincs beállítva',
  'modules.03.needRunning': 'Előbb indítsd el a mérést, és irányítsd a kamerát egy fehér papírlapra.',
  'modules.03.tooFew': 'Túl kevés minta. Ellenőrizd, hogy tényleg fut-e a mérés.',
  'modules.03.tooDark': 'A kép túl sötét a kalibráláshoz. Világítsd meg jobban a papírlapot, és próbáld újra.',
  'modules.03.refused': 'A csatornák eltérése túl nagy ahhoz, hogy kalibrálásnak fogadjuk el. Használj fehér papírlapot egyenletes fényben.',
  'modules.03.done': 'Kalibrálva. A színhőmérséklet és a cirkadián hatás mostantól pontosabb lesz.',
  'modules.03.cleared': 'A kalibrálás törölve.',
  'modules.03.limitsTitle': 'Amit a kalibrálás nem javít meg',
  'modules.03.limits.1': 'A kalibrálás a kamera három csatornáját egyenlíti ki, és semmi mást. Nem ad a kamerának színképet, ezért a színhőmérséklet és a cirkadián hatás továbbra is az sRGB alapszínekből számított közelítés marad.',
  'modules.03.limits.2': 'A jelenet fényerejét nem változtatja abszolút mennyiséggé — ez a szám relatív marad. Nem kapcsolja ki sem az automatikus expozíciót, sem a fehéregyensúlyt, amelyek alatta elmozdítják a leolvasást.',
  'modules.03.limits.3': 'Nem vihető át másik fényre: az egy izzó alatt végzett kalibrálás azt az izzót írja le. Másik fényforrásnál ismételd meg. És semmit nem változtat azon, hogy mi nem ez a mérés — továbbra sem vizsgálat, és továbbra sem alapja betegség megállapításának.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'A jelentés időszaka',
  'modules.04.rangeDay': 'Nap',
  'modules.04.rangeWeek': 'Hét',
  'modules.04.headTpl': '{from} és {to} között · {count} előzménypont.',
  'modules.04.tableTitle': 'Összesítés',
  'modules.04.tableCaption': 'Átlag, minimum és maximum a kiválasztott időszakban',
  'modules.04.panoramaTitle': 'Panoráma',
  'modules.04.panoramaAriaTpl': 'Panoráma: {name}, {span}.',
  'modules.04.panoramaSpanDay': 'az utolsó nap órákra bontva',
  'modules.04.panoramaSpanWeek': 'az utolsó hét napokra bontva',
  'modules.04.panoramaHint': 'Az oszlop magassága és színe ugyanazt mondja: rendben — alacsony, figyelem — közepes, kritikus — teli. Az alapjánál álló vonás mérés nélküli órát jelöl.',
  'modules.04.coverageDayTpl': 'A mérés {total} óra közül {done} órát fedett le.',
  'modules.04.coverageWeekTpl': 'A mérés {total} nap közül {done} napot fedett le.',
  'modules.04.zonesTitle': 'A zónák megoszlása',
  'modules.04.zonesCaptionTpl': 'A fő csatornára számolva: {name}.',
  'modules.04.worstTpl': 'A legnehezebb időszak: {value}.',
  'modules.04.worstNone': 'nincs kiugró',
  'modules.04.worstHourTpl': '{hour} óra',
  'modules.04.adviceTitle': 'Mit lehet ezzel kezdeni',
  'modules.04.adviceMelanopicTpl': 'A cirkadián hatás átlaga {value}× volt. Este érdemes 0,50 alá menni — legegyszerűbben melegebb izzóval vagy éjszakai móddal.',
  'modules.04.adviceKelvinTpl': 'A fény hideg volt (átlagosan {value} K). Munkához ez kifogástalan; alvás előtt két órával a 3000 K alatti kíméletesebb.',
  'modules.04.adviceFlickerTpl': 'Érzékelhető villódzás látszik (átlagosan {value}%). Rendszerint olcsó fényerőszabályzó vagy a háttérvilágítás tápegysége felel érte.',
  'modules.04.adviceUniformityTpl': 'A fény egyenetlenül oszlik el ({value}%). A lámpa áthelyezése vagy a szögének megváltoztatása általában többet ad, mint az izzó cseréje.',
  'modules.04.adviceWorstTpl': 'A küszöbökön kívüli leolvasások többsége {hour} óra körül gyűlik össze.',
  'modules.04.adviceNone': 'Ebben az időszakban semmi nem lép túl a beállított küszöbökön.',
  'modules.04.limitsTitle': 'Ez nem egészségügyi tanács',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'A következtetések kizárólag abból származnak, amit ennek a telefonnak a kamerája látott. Az alkalmazás nem mér színképet, és semmilyen diagnózist nem állít fel.',
  'modules.04.printHint': 'Ez az oldal nyomtatványnak készült: a táblázat és a feliratok ugyanúgy olvashatók papíron, a rendszernagyítóban és a képernyőolvasóban.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'Adattartomány',
  'modules.05.range1h': 'Óra',
  'modules.05.range24h': 'Nap',
  'modules.05.range7d': '7 nap',
  'modules.05.range30d': '30 nap',
  'modules.05.csvKey': 'CSV fájl mentése',
  'modules.05.jsonKey': 'JSON fájl mentése',
  'modules.05.formatTitle': 'Fájlformátum',
  'modules.05.formatCsv': 'CSV: az oszlopokat pontosvessző választja el, a tizedesjel a vessző, a kódolás UTF-8 bájtsorrend-jellel. Az ilyen fájlt a magyar Excel mindenféle beállítás nélkül nyitja meg.',
  'modules.05.formatJson': 'JSON: ugyanazok az adatok a „points” mezőben, tizedesponttal és ezredmásodpercben megadott időbélyeggel — ezt a formátum követeli meg.',
  'modules.05.resolution': 'Az előzmények 5 másodpercenként mentenek egy pontot, és 30 napra nyúlnak vissza. A másodpercenkénti öt minta teljes felbontását a fájl nem tartalmazza — azt a motor csak egy percig tartja meg.',
  'modules.05.offline': 'A fájl az eszközön keletkezik, és az eszközön is marad. Az exportálás nem kapcsolódik hálózathoz.',
  'modules.05.columnsTitle': 'Az oszlopok leírása',
  'modules.05.columnsCaption': 'A fájl oszlopai és a jelentésük',
  'modules.05.descDate': 'A pont dátuma az eszköz órájáról, nap-hónap-év alakban.',
  'modules.05.descTime': 'A pont időpontja másodperc pontossággal.',
  'modules.05.descZone': 'A kék arány zónája a mentés pillanatában. A motor csak ehhez az egy mennyiséghez menti a zónát — a többinél a küszöbökből számold ki.',
  'modules.05.descMetricTpl': '{short} Mértékegység: {unit}. Tartomány: {min}–{max}.',
  'modules.05.previewTitle': 'Előnézet',
  'modules.05.previewHint': 'A fájl első öt sora, pontosan úgy, ahogy mentésre kerül.',
  'modules.05.savedTpl': 'A(z) {name} fájl mentve — {rows} sor.',
  'modules.05.failed': 'Ez a böngésző nem engedte menteni a fájlt.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'Az alkalmazás minden befejezett mérési munkamenetet elment ezen az eszközön. Válassz ki kettőt, hogy egy szalagon lásd őket, és számszerűen olvasd le a különbséget.',
  'modules.06.noSessions': 'Még nincs egyetlen befejezett munkamenet sem. Indíts mérést, állítsd le, és gyere vissza ide.',
  'modules.06.slotA': 'A munkamenet',
  'modules.06.slotB': 'B munkamenet',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'Szalag',
  'modules.06.tapeAriaTpl': 'A(z) {slot} munkamenet lefutása, mennyiség: {name}.',
  'modules.06.tapeHint': 'Mindkét munkamenet ugyanarra a szélességre van kifeszítve: egy oszlop az időtartam ugyanakkora része, nem ugyanaz az óra. A magasság és a szín ugyanazt mondja, mint a műszerfalon.',
  'modules.06.tapeChannelTpl': 'A szalag a fő csatornát mutatja: {name}.',
  'modules.06.diffTitle': 'Különbség',
  'modules.06.diffCaption': 'A két munkamenet átlaga és a köztük lévő különbség',
  'modules.06.clearKey': 'A mentett munkamenetek törlése',
  'modules.06.cleared': 'A mentett munkamenetek törölve.',
  'modules.06.savedTpl': 'Munkamenet mentve: {dur}.',
  'modules.06.limitsTitle': 'Amit ez az összehasonlítás nem mond meg',
  'modules.06.limits': 'Két mérést hasonlítasz össze, nem két fényforrást. Ha a munkamenetek között megváltozott a képkivágás, a távolság, a napszak vagy a telefon tartása, a különbség erről is szól. A legőszintébb összehasonlítás ugyanaz a jelenet a világítás megváltoztatása előtt és után.',
  'modules.06.keepTpl': 'Legfeljebb az utolsó {count} munkamenetre emlékszünk.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'A tesztképek ennek az eszköznek a teljes képernyőjén jelennek meg. Arra valók, hogy szemmel nézd meg a képernyőt: egyenletes-e a fehér, nem húz-e színbe a szürke, és nem szűrődik-e át a háttérvilágítás a sarkoknál.',
  'modules.07.steps.1': 'Állítsd a képernyő fényerejét arra a szintre, amelyen dolgozni szoktál, és kapcsold ki a rendszer éjszakai módját.',
  'modules.07.steps.2': 'Válassz egy tesztképet az alábbi listából. Kitölti az egész képernyőt.',
  'modules.07.steps.3': 'Nézd körülbelül hatvan centiméterről, merőlegesen a képernyőre. Utána nézd meg ugyanazt a tesztképet ferdén is.',
  'modules.07.steps.4': 'Lépj ki a „Tesztkép bezárása” gombbal vagy az Escape billentyűvel, és menj tovább a következőre.',
  'modules.07.planesTitle': 'Tesztképek',
  'modules.07.exitKey': 'Tesztkép bezárása',
  'modules.07.showAriaTpl': 'Tesztkép megjelenítése: {name}',
  'modules.07.planeAriaTpl': 'Ellenőrző tesztkép: {name}. A bezáró gomb a képernyő alján van.',
  'modules.07.plane.white.name': 'Fehér',
  'modules.07.plane.white.hint': 'Keress foltokat, elszíneződéseket és világosabb részeket a szélek közelében. A fehérnek a teljes felületen egyetlen színnek kell lennie.',
  'modules.07.plane.gray75.name': 'Szürke 75%',
  'modules.07.plane.gray75.hint': 'A szürkének szürkének kell lennie. A zöldes vagy rózsaszínes árnyalat a képernyő elcsúszott fehéregyensúlyát jelenti.',
  'modules.07.plane.gray50.name': 'Szürke 50%',
  'modules.07.plane.gray50.hint': 'A legjobb tesztkép az árnyalat megítéléséhez. Hasonlítsd össze a közepét a sarkokkal.',
  'modules.07.plane.gray25.name': 'Szürke 25%',
  'modules.07.plane.gray25.hint': 'A sötét szürke megmutatja a háttérvilágítás átszűrődését és a sávosodást az olcsó paneleken.',
  'modules.07.plane.black.name': 'Fekete',
  'modules.07.plane.black.hint': 'Sötét szobában itt látszik a háttérvilágítás minden szivárgása és minden kivilágosodott sarok.',
  'modules.07.plane.red.name': 'Tiszta vörös',
  'modules.07.plane.red.hint': 'Az egyenletes vörös felfedi a halott alpixeleket és a panel egyenetlenségeit.',
  'modules.07.plane.green.name': 'Tiszta zöld',
  'modules.07.plane.green.hint': 'A zöld viszi a legtöbb fényerőt — ezen a legkönnyebb kiszúrni a sérült pixelt.',
  'modules.07.plane.blue.name': 'Tiszta kék',
  'modules.07.plane.blue.hint': 'A kék jobban megmutatja a képernyő felületén lévő koszt és maszatot, mint a fehér.',
  'modules.07.plane.grid.name': 'Rács',
  'modules.07.plane.grid.hint': 'A vonalaknak a sarkokban ugyanolyan élesnek kell lenniük, mint középen. A szélek elmosódása a kép méretezésének kérdése.',
  'modules.07.warn': 'A tesztkép az egész képernyőt eltakarja, a mérés gombját viselő műszerfalat is. Ez az egyetlen hely az alkalmazásban, ahol ez megtörténik, és ezért nagy és mindig látható a kilépő gomb. Amíg a tesztkép a képernyőn van, a mérés tovább fut, és nem lehet leállítani — zárd be a tesztképet, hogy visszatérj a gombokhoz.',
  'modules.07.cameraTitle': 'Amit itt nem tudsz megcsinálni',
  'modules.07.camera': 'A telefon nem látja a saját képernyőjét, ezért ezeket a tesztképeket nem méred meg ugyanazzal az eszközzel. Monitor méréséhez jelenítsd meg a tesztképet a monitoron, a mérést pedig a telefonnal végezd — ez két különböző eszköz és két különböző szerep.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'Az ütemezés a megadott időpontban emlékeztet a mérésre. A kamerát nem kapcsolja be magától: a kitűzött órában emlékeztetőt mutat, a mérést pedig a műszerfalon lévő „Mérés indítása” gombbal indítod. Ugyanúgy, mint első alkalommal.',
  'modules.08.onlyOpenTitle': 'Amikor ez nem működik',
  'modules.08.onlyOpen': 'Az ütemezés csak nyitott alkalmazás mellett működik. A bezárt böngészőlap nem számol időt, és semmire nem emlékeztet. Nem kérünk engedélyt rendszerértesítésekre, és semmit nem küldünk a hálózatra.',
  'modules.08.enableLabel': 'Emlékeztetők bekapcsolása',
  'modules.08.timesTitle': 'Időpontok',
  'modules.08.timeAriaTpl': '{n}. időpont: az emlékeztető órája',
  'modules.08.addKey': 'Időpont hozzáadása',
  'modules.08.removeAriaTpl': 'A(z) {time} időpont törlése',
  'modules.08.addedTpl': 'A(z) {time} időpont hozzáadva.',
  'modules.08.removedTpl': 'A(z) {time} időpont törölve.',
  'modules.08.badTime': 'Add meg az időt 22:00 alakban.',
  'modules.08.nextTpl': 'A legközelebbi emlékeztető: {time}.',
  'modules.08.nextNone': 'Az emlékeztetők ki vannak kapcsolva.',
  'modules.08.dueTpl': 'Ütemezett mérési időpont: {time}.',
  'modules.08.dueKey': 'Műszerfal megjelenítése',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'A riasztás egy mennyiséget figyel, és csak akkor szólal meg, ha az a kiválasztott zónát megszakítás nélkül tartja a beállított ideig. Soha nem állítja le a mérést, és soha nem takarja el a gombokat.',
  'modules.09.enableLabel': 'Riasztások bekapcsolása',
  'modules.09.metricLabel': 'Figyelt mennyiség',
  'modules.09.levelLabel': 'Melyik zónától',
  'modules.09.levelWarning': 'Figyelemtől felfelé',
  'modules.09.levelCritical': 'Csak a kritikus',
  'modules.09.sustainLabel': 'Hány másodperc megszakítás nélkül',
  'modules.09.sustainHint': 'A rövidebb idők több téves riasztást adnak, amikor mozgatod a telefont. Öt másodperc alá nem megyünk.',
  'modules.09.soundLabel': 'Rövid hangjelzés',
  'modules.09.soundHint': 'A hang az eszközön keletkezik. Semmi nem töltődik le a hálózatról.',
  'modules.09.cooldownHint': 'Legfeljebb két percenként egy riasztás. A minden egyes mintánál megismételt riasztás olyan riasztás, amelyet véglegesen kikapcsolnak.',
  'modules.09.whenNotTitle': 'Amikor a riasztás nem működik',
  'modules.09.whenNot': 'Az értesítés az alkalmazáson belül él, nem a rendszerben. Nem működik, ha az alkalmazás be van zárva vagy a háttérben van, ha nem fut mérés, és ha a figyelt mennyiség az adott pillanatban nem mérhető. Nem kérünk engedélyt rendszerértesítésekre.',
  'modules.09.firedTpl': '{name}: {zone} már {sec} mp-e — most {value}.',
  'modules.09.saved': 'A riasztás beállításai mentve.',
  'modules.09.statusOnTpl': 'Figyelt mennyiség: {name}, {level}, {sec} mp után.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'Ez az alkalmazás ingyenes',
  'support.freeText': 'Mind a hét mennyiség az első indítástól számokat mutat. A rögzítő, a küszöbök, a kalibrálás, a jelentések, az exportálás, a munkamenetek összehasonlítása és a teljes harmincnapos előzmény fiók, díj és korlátok nélkül működik — offline ugyanúgy. Itt semmi nincs fizetség fejében későbbre félretéve.',
  'support.whyTitle': 'Miért kérem ezt',
  'support.whyText': 'A Fénymonitort egyedül készítem és tartom karban, munka után. A támogatás a javításokra, az újabb telefonokon végzett tesztelésre és a modullista következő eszközeire fordított időt fedezi. Semmi nem áll le, ha senki nem fizet semmit.',
  'support.nothingTitle': 'Mit ad az adomány',
  'support.nothingText': 'Semmit. Egyetlen szám, egyetlen modul és egyetlen beállítás sem oldódik fel az adomány után, mert minden fel van oldva a kezdetektől. Annyi marad belőle, hogy tudom: valakinek hasznára vált.',
  'support.keyTitle': 'Ha segíteni szeretnél',
  'support.keyLabel': 'Hívj meg egy kávéra',
  'support.keyAria': 'Hívj meg egy kávéra — külső oldalt nyit meg új lapon',
  'support.serviceText': 'Az adományozási profilt a Buy Me a Coffee vezeti, és ez a támogatás egyetlen formája ebben az alkalmazásban. Az alkalmazás semmilyen szkriptet, widgetet vagy képet nem tölt be onnan — itt egy egyszerű hivatkozás áll, és semmi más.',
  'support.privacyText': 'Ennek a gombnak a megnyomása külső oldalt nyit meg új lapon, és ez az egyetlen pillanat, amikor bármi elhagyja ezt az eszközt. A mérések, az előzmények és a beállítások ott maradnak, ahol voltak — ennek a böngészőnek a tárolójában.',
  'support.privacyPendingText': 'Amint a cím elérhető lesz, a gomb megnyomása külső oldalt nyit majd meg új lapon, és ez lesz az egyetlen pillanat, amikor bármi elhagyja ezt az eszközt. A mérések, az előzmények és a beállítások ott maradnak, ahol voltak — ennek a böngészőnek a tárolójában.',
  'support.emptyTitle': 'A profil még nincs bekötve',
  'support.emptyText': 'Az adományozási profil címe még nincs beírva, ezért nincs itt gomb, amely a semmibe vezetne. Az alkalmazás többi része változatlanul működik — semmi nem vár erre az adományra.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'Amit ez az alkalmazás NEM mér',
  'docs.notList.1': 'Nem mér színképet. A kamerának három széles színcsatornája, automatikus expozíciója és automatikus fehéregyensúlya van.',
  'docs.notList.2': 'Nem mér abszolút értékeket. A jelenet fényereje relatív mutató, nem fotometriai mérés eredménye.',
  'docs.notList.3': 'Nem méri közvetlenül a színhőmérsékletet. A színhőmérséklet és a cirkadián hatás az sRGB alapszínekből számított közelítés.',
  'docs.notList.4': 'Nem látja a hálózati villódzást. Az 5 Hz-es mintavétel csak 2,5 Hz alatt látja a lüktetést — a hálózati 100 Hz elérhetetlen, és az alkalmazás soha nem adja meg eredményként.',
  'docs.notList.5': 'Nem állít fel diagnózist, és nem ad egészségügyi tanácsot. Egyetlen eredmény sem az egyik, sem a másik.',
  'docs.notList.6': 'Nem hasonlítja össze a fényedet semmilyen hivatalos etalonnal. A küszöbök beállítások, amelyeket a 02-es modulban megváltoztathatsz.',
  'docs.whatTitle': 'Mit mér, és hogyan',
  'docs.whatLead': 'A telefon kamerája megvilágított felületet néz, az alkalmazás pedig másodpercenként ötször kiszámolja a képkocka középső részletének R, G és B csatornaátlagát. Ebből a három számból vezeti le a hét mutatót.',
  'docs.whatCrop': 'A részlet a képkocka szélességének és magasságának középső 60%-a — pontosan az a téglalap, amelyet a CÉLZÁS képernyőn a célkereszt rajzol körbe. Rajta kívül semmi nem számít bele.',
  'docs.whatRate': 'Egy minta 200 ezredmásodpercenként, vagyis másodpercenként 5 alkalommal. Az utolsó perc teljes felbontásban a memóriában van; minden régebbi 5 másodpercenként mentődik, és harminc napra nyúlik vissza.',
  'docs.metricsTitle': 'A hét mennyiség',
  'docs.formulasTitle': 'Képletek',
  'docs.formula.share.formula': 'kék arány = B / (R + G + B) × 100%',
  'docs.formula.share.text': 'Az sRGB értékeken számolva, a gamma visszafordítása nélkül — szándékosan, mert ez ugyanaz a meghatározás, mint az alkalmazás előző verziójában, így a régebben beállított küszöbök továbbra is ugyanazt jelentik. Elválasztja a színt a fényerőtől.',
  'docs.formula.brightness.formula': 'fényerő = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': 'A csatornák átlagos értéke a tartomány százalékában. Az automatikus expozíció alatta elmozdítja, ezért ez relatív mutató — két jelenetet hasonlíts össze, ne egyetlen számot olvass mérésként.',
  'docs.formula.kelvin.title': 'Színhőmérséklet — McCamy közelítése',
  'docs.formula.kelvin.formula': 'n = (x − 0,3320) / (y − 0,1858)\nCCT = −449 n³ + 3525 n² − 6823,3 n + 5520,33',
  'docs.formula.kelvin.text': 'Először visszafordítjuk az sRGB gammát, majd mátrixszal átmegyünk CIE XYZ-be a D65 fehérpontra, és kiszámoljuk az x, y színességet. McCamy képlete nagyjából 2000 K és 12500 K között megbízható. Ezen a tartományon kívül a harmadfokú görbe elszalad, ezért az eredményt levágjuk és megbízhatatlannak jelöljük — ilyenkor a skála alapvonala szaggatottá válik, és megjelenik a „módszer tartományán kívül” mondat.',
  'docs.formula.melanopic.title': 'Cirkadián hatás — melanopikus arány',
  'docs.formula.melanopic.formula': 'mel = 0,0016 R + 0,3110 G + 0,8460 B\nY = 0,2127 R + 0,7152 G + 0,0722 B\neredmény = (mel / Y) × 1,00-re normálva semleges fehérnél',
  'docs.formula.melanopic.text': 'Mind a három csatorna lineáris értékben. A valódi mennyiség a színkép integrálja a melanopszin érzékenységi görbéjével (csúcs 490 nm körül); a kamerának három széles csatornája van, ezért az sRGB alapszíneket a hozzávetőleges hullámhosszukon vett melanopikus érzékenységgel súlyozzuk (R 612 nm, G 549 nm, B 465 nm). A változás iránya megbízható, az abszolút érték nem — ezért áll ennél a számnál a „≈” jel.',
  'docs.formula.flicker.formula': 'villódzás = (max − min) / (max + min) × 100%',
  'docs.formula.flicker.text': 'Az IES meghatározása, a fényerőminták ablakából számolva. A frekvenciát abból becsüljük, hányszor lépi át a jel az átlagértéket. Az 5 Hz-es mintavétel csak 2,5 Hz alatt látja a modulációt (Nyquist-határ), megbízhatónak pedig csak a 0,2 és 2 Hz közötti frekvenciát tekintjük, 0,5%-tól induló amplitúdó mellett — e küszöb alatt az átlag átlépései az érzékelő zaja, nem a fényforrás lüktetése.',
  'docs.formula.uniformity.formula': 'egyenletesség = legsötétebb mező / legvilágosabb mező × 100%',
  'docs.formula.uniformity.text': 'A képrészletet 3×3-as rácsban kilenc mezőre osztjuk, és a szélsőket hasonlítjuk össze. A 100% a tökéletesen egyenletesen eloszló fény. Képernyőn az alacsony érték a háttérvilágítás átszűrődését vagy tükröződést jelent, az íróasztalon rosszul beállított lámpát. Ez az egyetlen mennyiség — a komforttal együtt —, amelynél a magasabb érték a jobb.',
  'docs.formula.comfort.formula': '100 pont mínusz a levonások:\ncirkadián hatás 0,75 fölött — legfeljebb 35 pt\nfényszín 4000 K fölött — legfeljebb 25 pt\nvillódzás 5% fölött — legfeljebb 25 pt\negyenletesség 60% alatt — legfeljebb 15 pt',
  'docs.formula.comfort.text': 'Egyetlen értékelés hat szám helyett. Az a mennyiség, amelyet nem sikerült megmérni, semmilyen levonást nem ad — a hiányzó adat soha nem tetteti magát jó eredménynek. A súlyok a mi szerkesztői megítélésünk, nem szabvány; ezért mutatja a 01-es modul az összetevőkre bontást, hogy lehessen ezzel az értékeléssel nem egyetérteni.',
  'docs.rangesTitle': 'Tartományok és küszöbök',
  'docs.rangesLead': 'Az alábbi küszöbök azok, amelyek most érvényben vannak — ha megváltoztattad őket a 02-es modulban, a táblázat a te értékeidet mutatja, nem a gyáriakat.',
  'docs.dirNormal': 'az alacsonyabb kíméletesebb',
  'docs.dirInvert': 'a magasabb jobb',
  'docs.privacyTitle': 'Adatok és adatvédelem',
  'docs.privacyText': 'A kamera képét sehová nem küldjük el és nem mentjük el — minden képkockából csak három szám marad meg. A mérések, a küszöbök és a beállítások a böngésző tárolójában vannak ezen az eszközön. Az alkalmazás nem indít semmilyen hálózati kérést, és offline módban működik.',
  'docs.mdrTitle': 'Jogi nyilatkozat',
  'docs.freeText': 'Az alkalmazás teljes egészében ingyenes, és az is marad: mind a hét mennyiség, az előzmények, a jelentések, az exportálás és az offline mód fiók, díj és korlátok nélkül működik. Aki köszönetet szeretne mondani, megtalálja a 10-es, „Támogatás” modult.',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'Az alkalmazás nem töltődött be teljesen',
  'boot.filesTpl': 'Ezek a fájlok nem töltődtek be: {list}.',
  'boot.modulesTpl': 'Ezek a modulok nem jelentkeztek be: {list} — ezek a tételek nem nyílnak meg a listából.',
  'boot.modulesRangeTpl': '{from}–{to}. modul',
  'boot.tail': 'Töltsd újra az oldalt. Ha ez nem segít, a szerveren lévő fájlok hiányosak.',
  'boot.loss.bus': 'a modulok nem látják majd egymást, és a mérés nem indul el',
  'boot.loss.metrics': 'egyetlen érték sem számolódik ki',
  'boot.loss.scaleCore': 'eltűnik a skála geometriája és a számok formázása',
  'boot.loss.scaleText': 'eltűnik a felület összes felirata',
  'boot.loss.shell': 'egyetlen modult sem lehet megnyitni',
  'boot.loss.engine': 'a kamera és a mérés nem indul el',
  'boot.loss.dash': 'a műszerfal üres marad'
});
