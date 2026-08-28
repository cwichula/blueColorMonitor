/* docs/shared/i18n/hu.js — słownik WSPÓLNY, węgierski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest węgierski.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — pilnuje tego
 * keys.test.js. Klucza, którego nie ma w angielskim, nie wolno tu dopisać:
 * angielski jest wartością zapasową, więc to on wyznacza zestaw.
 *
 * LICZEBNIKI: węgierski ma dwie kategorie CLDR (one, other), ale rzeczownik po
 * liczebniku zostaje w liczbie pojedynczej („5 másodperc”, nie „5 másodpercek”)
 * — dlatego obie formy brzmią tak samo. To nie jest niedopatrzenie.
 *
 * TERMINOLOGIA: színhőmérséklet (temperatura barwowa), villódzás (migotanie),
 * melanopikus arány (współczynnik melanopiczny), cirkadián hatás (wpływ na rytm
 * dobowy), egyenletesség (równomierność), látáskomfort (komfort wzrokowy) —
 * po jednym odpowiedniku na pojęcie w całym pliku.
 *
 * ZWROT DO UŻYTKOWNIKA: forma „ty” (tartsd, ellenőrizd), tak jak w polskim
 * oryginale — bez urzędowego „Ön”.
 *
 * CUDZYSŁÓW: węgierski otwiera „ (U+201E) i zamyka ” (U+201D); apostrofu ASCII
 * w napisach nie ma i być nie może — rozerwałby napis w pojedynczych
 * cudzysłowach.
 */
window.I18nData = window.I18nData || {};
window.I18nData['hu'] = Object.assign(window.I18nData['hu'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu (UE)
     2017/745, gdzie stoi jako podmiot po rodzajniku „A”. */
  'app.name': 'Fénymonitor',

  /* ---- wybór języka ---- */

  'language.label': 'Nyelv',
  'language.help': 'Az egész alkalmazás nyelve. Minden nyelv már ezen az eszközön van — semmi sem töltődik le, és semmi nem kerül ki sehová.',
  'language.auto': 'Az eszköz szerint',
  'language.autoHint': 'A telefonon vagy a böngészőben beállított nyelvet követi.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Kék arány',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'százalék',
  'metric.share.short': 'A látott fényből mennyi jut a kék csatornára.',
  'metric.share.help': 'A színt választja el a fényerőtől — ez az az érték, amely elmozdul, amikor bekapcsolod az éjszakai módot.',

  'metric.brightness.name': 'Jelenet fényereje',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'százalék',
  'metric.brightness.short': 'A kamera képének átlagos fényereje.',
  'metric.brightness.help': 'Relatív érték, nem lux — a kamera automatikus expozíciója alatta folyamatosan elmozdítja.',

  'metric.kelvin.name': 'Színhőmérséklet',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'kelvin',
  'metric.kelvin.short': 'A fény meleg vagy hideg-e.',
  'metric.kelvin.help': '3000 K alatt a fény meleg, és este kíméletesebb. A 6500 K a legtöbb képernyő alapértelmezett fehére.',

  'metric.melanopic.name': 'Cirkadián hatás',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'szeres',
  'metric.melanopic.short': 'Mennyire erősen hat ez a fény a biológiai órára.',
  'metric.melanopic.help': 'A melanopikus arány közelítése. Az 1,00 a semleges nappali fehér; este érdemes 0,50 alá menni.',

  'metric.flicker.name': 'Villódzás',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'százalék',
  'metric.flicker.short': 'A fényforrás nem látható lüktetése.',
  'metric.flicker.help': 'Az olcsó fényerőszabályzók és háttérvilágítások lüktetnek. A szem nem látja, de ismert oka a fáradtságnak és a fejfájásnak.',

  'metric.uniformity.name': 'Egyenletesség',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'százalék',
  'metric.uniformity.short': 'Egyenletesen oszlik-e el a fény a képmezőben.',
  'metric.uniformity.help': 'Képernyőn az alacsony érték a háttérvilágítás átszűrődését vagy tükröződést jelent; az íróasztalon rosszul beállított lámpát.',

  'metric.comfort.name': 'Látáskomfort',
  'metric.comfort.unit': 'pt',
  'metric.comfort.unitSpoken': 'pont',
  'metric.comfort.short': 'Egyetlen értékelés hat szám helyett.',
  'metric.comfort.help': 'A többi mérést 0–100 közötti pontszámmá fogja össze, és megmutatja, mi rontja a legjobban. A súlyok a mi szerkesztői megítélésünk, nem szabvány.',

  /* Etykiety składników oceny komfortu — nazwa klucza idzie za identyfikatorem
     zwracanym przez Metrics.comfortIndex. */
  'comfort.penalty.melanopic': 'Cirkadián hatás',
  'comfort.penalty.kelvin': 'Hideg fényszín',
  'comfort.penalty.flicker': 'Villódzás',
  'comfort.penalty.uniformity': 'Egyenetlen világítás',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. */

  'engine.idle': 'Nyomd meg a „Start” gombot a kamera bekapcsolásához.',
  'engine.starting': 'Kamera indítása…',

  'engine.error.permission': 'Nincs engedély a kamera használatához. Engedélyezd a kamerát a böngésző beállításaiban, és nyomd meg újra a „Start” gombot.',
  'engine.error.notFound': 'Nem található kamera. Ellenőrizd, hogy van-e kamera az eszközön, és hogy nincs-e kikapcsolva a rendszerben.',
  'engine.error.busy': 'A kamerát egy másik alkalmazás használja. Zárd be, és próbáld újra.',
  'engine.error.unknown': 'A kamerát nem sikerült elindítani.',
  'engine.error.unsupported': 'Ez a böngésző nem ad hozzáférést a kamerához ezen az oldalon. Nyisd meg az alkalmazást HTTPS-en, vagy használj másik böngészőt.',

  /* ---- strefy ---- */

  'zone.good': 'Rendben',
  'zone.warning': 'Figyelem',
  'zone.critical': 'Kritikus',
  'zone.none': 'Nincs adat',
  'zone.settling': 'Beállás',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania, więc małą literą
     i bez kropki. */
  'zone.spoken.good': 'rendben',
  'zone.spoken.warning': 'figyelem',
  'zone.spoken.critical': 'kritikus',
  'zone.spoken.none': 'nincs adat',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'pt',
  'unit.hertz': 'Hz',
  'unit.second': 'mp',
  'unit.minute': 'p',
  'unit.hour': 'ó',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'Ez a fény rendben van — semmi sem lépi túl a beállított küszöböket.',
  'verdict.noValue': 'Ez a mennyiség most nem mérhető. Ellenőrizd, hogy nem takarja-e valami az objektívet.',
  'verdict.warmup': 'Az értékelés még alakul — tartsd a telefont mozdulatlanul még egy kicsit.',

  'verdict.warning.share': 'Ebből a fényből elég sok jut a kék csatornára. Este érdemes tompítani.',
  'verdict.warning.brightness': 'A jelenet világos — a kamera a mérési tartománya felső határa közelében dolgozik.',
  'verdict.warning.kelvin': 'A fény elég hideg. Este egy 2700 K körüli izzó kíméletesebb.',
  'verdict.warning.melanopic': 'Ez a fény elég erősen hat a biológiai órára.',
  'verdict.warning.flicker': 'A fényforrás láthatóan lüktet.',
  'verdict.warning.uniformity': 'A fény egyenetlenül oszlik el a képmezőben.',
  'verdict.warning.comfort': 'A látáskomfort csökkent — több dolog adódik össze benne.',

  'verdict.critical.share': 'Nagyon sok a kék. Este kapcsold be az éjszakai módot, vagy cseréld le a fényforrást.',
  'verdict.critical.brightness': 'A jelenet nagyon világos. Ne mérj úgy, hogy egyenesen a fényforrásra nézel.',
  'verdict.critical.kelvin': 'A fény hideg. Este ez fárasztja leginkább a szemet — egy melegebb izzó vagy az éjszakai mód segít.',
  'verdict.critical.melanopic': 'Ez a fény erősen hat a biológiai órára. Este érdemes 0,50 alá menni.',
  'verdict.critical.flicker': 'A fényforrás erősen lüktet. Ez ismert oka a szemfáradtságnak és a fejfájásnak.',
  'verdict.critical.uniformity': 'A fény nagyon egyenetlenül oszlik el. Ellenőrizd a lámpa beállítását vagy a képernyő tükröződéseit.',
  /* Wersje v3 i v4 kierują tu do swojego modułu; w warstwie wspólnej stoi zdanie
     bez numeru modułu. */
  'verdict.critical.comfort': 'A látáskomfort alacsony. Nézd meg az értékelés részletezését, hogy lásd, mi rontja.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'Amit ez a szám nem mond meg',
  'note.warningTitle': 'Figyelem',
  'note.dashTitle': 'Ami ez a mérés nem',
  'note.dashText': 'A telefon kamerájának három széles színcsatornája és automatikus fehéregyensúlya van — nem mér színképet. A színhőmérséklet és a cirkadián hatás az sRGB alapszínekből számított közelítés. Az alkalmazás jól mutatja a különbségeket és az időbeli változásokat; nem helyettesíti a mérőműszert, és semmilyen diagnózist nem állít fel.',
  'note.approxLegend': '≈ közelítő érték — az sRGB alapszínekből számítva, nem színképmérésből.',
  'note.kelvinOutOfRange': 'A módszer tartományán kívül — ennél a színnél a színhőmérséklet képlete már nem megbízható.',
  /* {rate} i {limit} podaje wywołanie: to liczby z silnika, a ich zapis jest
     w każdym języku inny (2.5 po angielsku, 2,5 po węgiersku). */
  'note.flickerOutOfRange': 'A módszer tartományán kívül — a {rate} Hz-es mintavétel csak {limit} Hz alatt látja a lüktetést. A hálózati 100 Hz elérhetetlen, és az alkalmazás soha nem adja meg eredményként.',
  'note.helpTitle': 'Amit ez a szám nem mond meg',
  'note.helpText': 'A telefon kamerájának három széles csatornája van, és nem mér színképet. Ez az érték összehasonlító mutató — jól mutatja a fények közötti különbségeket és az időbeli változásokat, de nem laboratóriumi mérés és nem orvosi információ.',
  'note.calibration': 'Kalibrálás nélküli mérés — az értékeket összehasonlításra használd.',

  'note.howToTitle': 'Hogyan érdemes mérni',
  'note.howTo.hold.title': 'Tartsd mozdulatlanul a telefont',
  'note.howTo.hold.text': 'Az automatikus expozíciónak 2–3 másodperc kell, hogy beálljon.',
  'note.howTo.aim.title': 'Megvilágított felületre irányítsd',
  'note.howTo.aim.text': 'Fehér papírlapra vagy világos falra. Ne mérj úgy, hogy egyenesen a fényforrásba nézel.',
  'note.howTo.compare.title': 'Hasonlíts, ne ítélj abszolút értékben',
  'note.howTo.compare.text': 'Ugyanaz a jelenet a világítás megváltoztatása előtt és után többet mond, mint egyetlen szám.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Skracanie go w tłumaczeniu nie jest kwestią stylu. */

  'legal.noDiagnosis': 'Egyetlen mérési eredmény sem diagnózis vagy egészségügyi tanács.',
  'legal.mdr': 'A {app} nem orvostechnikai eszköz az (EU) 2017/745 rendelet értelmében, nem szolgál semmilyen kóros állapot diagnosztizálására, megelőzésére, figyelemmel kísérésére vagy kezelésére, és nem helyettesíti az orvos vagy optometrista által végzett vizsgálatot.',

  /* ---- prywatność ---- */

  'privacy.title': 'Mi hagyja el ezt az eszközt',
  'privacy.short': 'Ebben az alkalmazásban semmi nem küld semmit a hálózatra. Minden szám ezen az eszközön keletkezik, és itt is marad.',
  'privacy.onDevice': 'A kamera csak azután indul el, hogy megnyomod a gombot, és a kép soha nem hagyja el ezt az eszközt.',
  'privacy.external': 'Az egész alkalmazásban ez az egyetlen hely, ahol bármi elhagyja ezt az eszközt: a gomb külső oldalt nyit meg új lapon, és ez is csak azután, hogy megnyomtad. A mérés, az előzmények és a beállítások itt maradnak.',
  'privacy.externalPending': 'Amint a cím elérhető lesz, a gomb külső oldalt nyit majd meg új lapon. Ez lesz az egyetlen pillanat, amikor bármi elhagyja ezt az eszközt. A mérés, az előzmények és a beállítások itt maradnak.',
  'privacy.storageBlocked': 'Ez a böngésző nem engedi semminek a mentését (privát mód vagy letiltott webhelyadatok). A mérés működik, de az előzmények eltűnnek, amint bezárod a lapot.',

  /* ---- liczebniki ----
     Węgierski ma dwie kategorie CLDR: one i other. Rzeczownik po liczebniku
     zostaje w liczbie pojedynczej, więc obie formy są takie same — formę
     wybiera Intl.PluralRules('hu'), nie nasza reguła. */

  'count.readings': { one: '{n} leolvasás', other: '{n} leolvasás' },
  'count.sessions': { one: '{n} mérés', other: '{n} mérés' },
  'count.seconds': { one: '{n} másodperc', other: '{n} másodperc' },
  'count.minutes': { one: '{n} perc', other: '{n} perc' },
  'count.hours': { one: '{n} óra', other: '{n} óra' },
  'count.days': { one: '{n} nap', other: '{n} nap' }
});
