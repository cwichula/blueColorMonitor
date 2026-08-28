/* docs/shared/i18n/cs.js — słownik WSPÓLNY, czeski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest czeski.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — i tak ma zostać
 * (patrz docs/shared/README.md, rozdział „Warstwa językowa”). Klucza, którego
 * nie ma w angielskim, nie wolno tu dopisać: angielski jest wartością
 * zapasową, więc to on wyznacza zestaw.
 *
 * REJESTR: forma grzecznościowa „vy” (držte, stiskněte), jednolicie w całym
 * pliku — aplikacja mówi o zdrowiu i o rozporządzeniu (EU) 2017/745, więc
 * „ty” brzmiałoby zbyt poufale. Ton rzeczowy i ciepły, bez marketingu.
 *
 * TERMINOLOGIA (jeden odpowiednik na pojęcie): podíl modré, jas scény,
 * barevná teplota, cirkadiánní vliv (współczynnik: melanopický poměr),
 * blikání, rovnoměrnost, zrakový komfort; „zegar biologiczny” = biologické
 * hodiny. Zastrzeżenie medyczne: zdravotnický prostředek, nařízení (EU)
 * 2017/745 — terminologia czeskiego tłumaczenia rozporządzenia.
 *
 * LICZBY: czeski zapisuje ułamek przecinkiem (1,00 — 0,50), tak jak polski.
 *
 * LICZEBNIKI: Intl.PluralRules('cs') zwraca cztery kategorie — one (1),
 * few (2–4), many (ułamki: „1,5 sekundy”) i other (0, 5 i więcej).
 */
window.I18nData = window.I18nData || {};
window.I18nData['cs'] = Object.assign(window.I18nData['cs'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu
     (EU) 2017/745, gdzie stoi jako podmiot w mianowniku. */
  'app.name': 'Monitor světla',

  /* ---- wybór języka ---- */

  'language.label': 'Jazyk',
  'language.help': 'Jazyk celé aplikace. Všechny jazyky už jsou v tomto zařízení — nic se nestahuje a nic se nikam neodesílá.',
  'language.auto': 'Podle zařízení',
  'language.autoHint': 'Podle jazyka nastaveného v telefonu nebo v prohlížeči.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Podíl modré',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'procent',
  'metric.share.short': 'Kolik z viděného světla připadá na modrý kanál.',
  'metric.share.help': 'Odděluje barvu od jasu — právě tato hodnota se změní, když zapnete noční režim.',

  'metric.brightness.name': 'Jas scény',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'procent',
  'metric.brightness.short': 'Průměrný jas obrazu z kamery.',
  'metric.brightness.help': 'Relativní hodnota, ne luxy — automatika expozice kamery s ní pod povrchem pohybuje.',

  'metric.kelvin.name': 'Barevná teplota',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'kelvinů',
  'metric.kelvin.short': 'Zda je světlo teplé, nebo studené.',
  'metric.kelvin.help': 'Pod 3000 K je světlo teplé a večer šetrnější. 6500 K je výchozí bílá většiny obrazovek.',

  'metric.melanopic.name': 'Cirkadiánní vliv',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'krát',
  'metric.melanopic.short': 'Jak silně toto světlo působí na biologické hodiny.',
  'metric.melanopic.help': 'Přiblížení melanopického poměru. 1,00 je neutrální denní bílá; večer se vyplatí klesnout pod 0,50.',

  'metric.flicker.name': 'Blikání',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'procent',
  'metric.flicker.short': 'Neviditelné pulzování světelného zdroje.',
  'metric.flicker.help': 'Levné stmívače a podsvícení pulzují. Oko to nevidí, ale bývá to příčinou únavy a bolesti hlavy.',

  'metric.uniformity.name': 'Rovnoměrnost',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'procent',
  'metric.uniformity.short': 'Zda se světlo rozkládá rovnoměrně po záběru.',
  'metric.uniformity.help': 'Nízká hodnota na obrazovce znamená prosvítající podsvícení nebo odraz; na stole špatně postavenou lampu.',

  'metric.comfort.name': 'Zrakový komfort',
  'metric.comfort.unit': 'b.',
  'metric.comfort.unitSpoken': 'bodů',
  'metric.comfort.short': 'Jedno hodnocení místo šesti čísel.',
  'metric.comfort.help': 'Skládá ostatní měření do výsledku 0–100 a ukazuje, co ho snižuje nejvíc. Váhy jsou naše redakční úvaha, ne norma.',

  /* Etykiety składników oceny komfortu — Metrics.comfortIndex zwraca je jako
     `penalties[].id`, więc nazwa klucza idzie za tym identyfikatorem. */
  'comfort.penalty.melanopic': 'Cirkadiánní vliv',
  'comfort.penalty.kelvin': 'Studená barva světla',
  'comfort.penalty.flicker': 'Blikání',
  'comfort.penalty.uniformity': 'Nerovnoměrné osvětlení',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': 'Stisknutím „Start“ zapněte kameru.',
  'engine.starting': 'Spouštím kameru…',

  'engine.error.permission': 'Chybí souhlas s přístupem ke kameře. Povolte kameru v nastavení prohlížeče a stiskněte „Start“ znovu.',
  'engine.error.notFound': 'Kamera nebyla nalezena. Zkontrolujte, zda zařízení kameru má a zda není vypnutá v systému.',
  'engine.error.busy': 'Kameru používá jiná aplikace. Zavřete ji a zkuste to znovu.',
  'engine.error.unknown': 'Kameru se nepodařilo spustit.',
  'engine.error.unsupported': 'Tento prohlížeč této stránce kameru nezpřístupňuje. Otevřete aplikaci přes HTTPS nebo použijte jiný prohlížeč.',

  /* ---- strefy ---- */

  'zone.good': 'V normě',
  'zone.warning': 'Pozor',
  'zone.critical': 'Kriticky',
  'zone.none': 'Bez dat',
  'zone.settling': 'Ustaluji',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania, więc małą literą
     i bez kropki. To nie jest to samo, co napis na plakietce. */
  'zone.spoken.good': 'v normě',
  'zone.spoken.warning': 'pozor',
  'zone.spoken.critical': 'kriticky',
  'zone.spoken.none': 'bez dat',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'b.',
  'unit.hertz': 'Hz',
  'unit.second': 's',
  'unit.minute': 'min',
  'unit.hour': 'h',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'Toto světlo je v pořádku — nic nepřekračuje nastavené prahy.',
  'verdict.noValue': 'Tuto veličinu teď nelze změřit. Zkontrolujte, zda objektiv není zakrytý.',
  'verdict.warmup': 'Ustaluji hodnocení — držte telefon ještě chvíli v klidu.',

  'verdict.warning.share': 'Značná část tohoto světla připadá na modrý kanál. Večer se vyplatí ho ztlumit.',
  'verdict.warning.brightness': 'Scéna je jasná — kamera pracuje blízko horní hranice měření.',
  'verdict.warning.kelvin': 'Světlo je dost studené. Večer bývá šetrnější žárovka kolem 2700 K.',
  'verdict.warning.melanopic': 'Toto světlo působí na biologické hodiny dost silně.',
  'verdict.warning.flicker': 'Světelný zdroj zřetelně pulzuje.',
  'verdict.warning.uniformity': 'Světlo se v záběru rozkládá nerovnoměrně.',
  'verdict.warning.comfort': 'Zrakový komfort je snížený — složilo se na to několik věcí naráz.',

  'verdict.critical.share': 'Velmi mnoho modré. Večer zapněte noční režim nebo změňte světelný zdroj.',
  'verdict.critical.brightness': 'Scéna je velmi jasná. Neměřte pohledem přímo do světelného zdroje.',
  'verdict.critical.kelvin': 'Světlo je studené. Večer to oči unavuje nejvíc — pomůže teplejší žárovka nebo noční režim.',
  'verdict.critical.melanopic': 'Toto světlo silně působí na biologické hodiny. Večer se vyplatí klesnout pod 0,50.',
  'verdict.critical.flicker': 'Světelný zdroj silně pulzuje. Bývá to příčinou únavy očí a bolesti hlavy.',
  'verdict.critical.uniformity': 'Světlo se rozkládá velmi nerovnoměrně. Zkontrolujte postavení lampy nebo odrazy na obrazovce.',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'Zrakový komfort je nízký. Nahlédněte do rozpisu hodnocení, ať vidíte, co ho snižuje.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'Co toto číslo neříká',
  'note.warningTitle': 'Pozor',
  'note.dashTitle': 'Čím toto měření není',
  'note.dashText': 'Fotoaparát telefonu má tři široké barevné kanály a automatické vyvážení bílé — neměří spektrum. Barevná teplota a cirkadiánní vliv jsou přiblížení vypočtená z barev sRGB. Aplikace dobře ukazuje rozdíly a změny v čase, nenahrazuje měřicí přístroj a nestanovuje žádnou diagnózu.',
  'note.approxLegend': '≈ přibližná hodnota — vypočtená z barev sRGB, ne z měření spektra.',
  'note.kelvinOutOfRange': 'Mimo rozsah metody — při této barvě přestává být vzorec pro barevnou teplotu spolehlivý.',
  /* {rate} i {limit} podaje wywołanie, bo to liczby z silnika (5 Hz, 2,5 Hz),
     a ich zapis jest różny w różnych językach: 2.5 po angielsku, 2,5 po czesku.
     Zapisu liczby nie wolno wpisywać do zdania na sztywno. */
  'note.flickerOutOfRange': 'Mimo rozsah metody — vzorkování {rate} Hz vidí pulzování jen pod {limit} Hz. Síťových 100 Hz je mimo dosah a aplikace je nikdy neuvede jako výsledek.',
  'note.helpTitle': 'Co toto číslo neříká',
  'note.helpText': 'Fotoaparát telefonu má tři široké kanály a neměří spektrum. Tato hodnota je srovnávací ukazatel — dobře ukazuje rozdíly mezi světly a změny v čase, není to výsledek laboratorního měření ani zdravotnická informace.',
  'note.calibration': 'Měření bez kalibrace — hodnoty berte jako srovnávací.',

  'note.howToTitle': 'Jak měřit smysluplně',
  'note.howTo.hold.title': 'Držte telefon v klidu',
  'note.howTo.hold.text': 'Automatika expozice potřebuje 2–3 sekundy, aby se ustálila.',
  'note.howTo.aim.title': 'Miřte na osvětlenou plochu',
  'note.howTo.aim.text': 'Bílý papír nebo světlá stěna. Neměřte pohledem přímo do světelného zdroje.',
  'note.howTo.compare.title': 'Porovnávejte, nehodnoťte absolutně',
  'note.howTo.compare.text': 'Tatáž scéna před změnou osvětlení a po ní řekne víc než jedno číslo.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Skracanie go w tłumaczeniu nie jest kwestią stylu. */

  'legal.noDiagnosis': 'Žádný výsledek není diagnózou ani zdravotní radou.',
  'legal.mdr': '{app} není zdravotnickým prostředkem ve smyslu nařízení (EU) 2017/745, neslouží k diagnostice, prevenci, monitorování ani léčbě jakéhokoli chorobného stavu a nenahrazuje vyšetření u lékaře ani u optometristy.',

  /* ---- prywatność ---- */

  'privacy.title': 'Co opouští toto zařízení',
  'privacy.short': 'Nic v této aplikaci neodesílá nic do sítě. Všechna čísla vznikají v tomto zařízení a tady zůstávají.',
  'privacy.onDevice': 'Kamera se zapne až po stisknutí tlačítka a obraz nikdy neopustí toto zařízení.',
  'privacy.external': 'Toto je jediné místo v celé aplikaci, kde cokoli opouští toto zařízení: tlačítko otevře externí stránku na nové kartě, a to až po jeho stisknutí. Měření, historie a nastavení zůstávají tady.',
  'privacy.externalPending': 'Až bude adresa k dispozici, tlačítko otevře externí stránku na nové kartě. Bude to jediný okamžik, kdy cokoli opouští toto zařízení. Měření, historie a nastavení zůstávají tady.',
  'privacy.storageBlocked': 'Tento prohlížeč nedovolí nic uložit (anonymní režim nebo zablokovaná data webů). Měření funguje, ale historie po zavření karty zmizí.',

  /* ---- liczebniki ----
     Czeski ma cztery kategorie CLDR: one (1), few (2–4), many — ta ostatnia
     dotyczy ułamków: „1,5 sekundy” — i other (0, 5 i więcej). Formę wybiera
     Intl.PluralRules('cs'), nie nasza reguła. */

  'count.readings': { one: '{n} odečet', few: '{n} odečty', many: '{n} odečtu', other: '{n} odečtů' },
  'count.sessions': { one: '{n} měření', few: '{n} měření', many: '{n} měření', other: '{n} měření' },
  'count.seconds': { one: '{n} sekunda', few: '{n} sekundy', many: '{n} sekundy', other: '{n} sekund' },
  'count.minutes': { one: '{n} minuta', few: '{n} minuty', many: '{n} minuty', other: '{n} minut' },
  'count.hours': { one: '{n} hodina', few: '{n} hodiny', many: '{n} hodiny', other: '{n} hodin' },
  'count.days': { one: '{n} den', few: '{n} dny', many: '{n} dne', other: '{n} dní' }
});
