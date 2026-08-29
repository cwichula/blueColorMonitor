/* Monitor Światła v5 — słownik czeski.
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr), ale NIE JEST
 * kalką żadnego z nich: czeska składnia i czeski termin techniczny mają
 * pierwszeństwo przed układem polskiego zdania.
 *
 * Zachowane zostało to, co niesie znaczenie: liczby, progi, jednostki, nazwy
 * wstawek i — co do treści — zastrzeżenia medyczne oraz zdania o prywatności.
 * Tych ostatnich nie wolno osłabiać ani wzmacniać: „nie zastępuje rozmowy
 * z lekarzem” ma po czesku znaczyć dokładnie tyle samo, a „obraz nie opuszcza
 * urządzenia” nie może stać się obietnicą szerszą niż polska.
 *
 * REJESTR: konsekwentne „vykání” (2. os. lm.) — tak mówi do użytkownika
 * większość czeskiego oprogramowania i tak brzmi ciepło, a nie poufale.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w tekstach pomocy):
 *   podíl modré, jas scény, barevná teplota, cirkadiánní vliv (w opisie:
 *   melanopický poměr), blikání, rovnoměrnost, zrakový komfort.
 * „Wielkość” to zawsze veličina, sesja pomiarowa to relace, próbka to vzorek,
 * pojedynczy zapis w historii to měření, a odczyt z wykresu to odečet.
 * STREFY: bezpečná / mírná / škodlivá — przymiotniki w rodzaju żeńskim, bo
 * najczęściej wchodzą w zdanie „zóna: {zone}”; mówią o świetle, nie o stanie
 * aplikacji.
 *
 * CUDZYSŁÓW czeski to „ … “ (dolny otwierający, górny zamykający), przecinek
 * dziesiętny jak po polsku. SPACJE NIEROZDZIELAJĄCE zapisujemy jako \u00A0,
 * a znak minus jako \u2212 — w źródle nie da się ich odróżnić od zwykłej
 * spacji i od dywizu.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Text se vsuvkou {name}'    — napis zwykły,
 *   'klucz.kropkowany': { one, few, many, other }   — forma zależna od liczby.
 * Czeski ma w CLDR cztery kategorie: one (1), few (2–4), many (ułamki) i other
 * (0 oraz od 5 w górę). `many` NIE jest tu kopią `other`: ułamek bierze
 * dopełniacz liczby pojedynczej („1,5 vzorku”), a piątka i więcej — dopełniacz
 * liczby mnogiej („5 vzorků”). Nazwy wstawek są identyczne jak w pl.js —
 * pilnuje tego keys.test.js; kolejność wstawek w zdaniu wolno zmieniać,
 * nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Monitor světla',
  'app.description': 'Monitor světla — kamerou změří sedm veličin světla kolem vás. Všechno se počítá v tomto zařízení, nic neodchází do sítě.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Monitor světla',
  'app.skipToContent': 'Přejít k obsahu',
  'app.nav.aria': 'Hlavní navigace',
  'app.noscript.title': 'Tato aplikace potřebuje JavaScript',
  'app.noscript.text': 'Celé měření probíhá v této kartě prohlížeče: JavaScript čte snímky z kamery a počítá z nich sedm veličin světla. Bez něj není čím měřit. Povolte pro tuto stránku JavaScript a otevřete ji znovu — ani pak se do sítě nic neodešle.',

  'nav.measure': 'Měření',
  'nav.history': 'Historie',
  'nav.tools': 'Nástroje',
  'nav.support': 'Podpora',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Měření běží',
  'shell.live.aria': 'Měření běží. {metric}: {value}. Zpět na obrazovku měření.',
  'shell.live.metricFallback': 'Hlavní veličina',
  'shell.action.fallback': 'Akce obrazovky',

  'shell.loadFail.title': 'Obrazovku „{screen}“ se nepodařilo načíst',
  'shell.loadFail.text': 'V paměti zařízení nejspíš chybí část souborů. Připojte se k síti a načtěte stránku znovu.',
  'shell.fatal.title': 'Něco se pokazilo',
  'shell.fatal.text': 'Aplikace nedokázala obrazovku sestavit. Obvykle stačí načíst stránku znovu — uložená měření a nastavení zůstávají na svém místě.',
  'shell.fatal.reload': 'Načíst stránku znovu',
  'shell.boot.failTitle': 'Aplikaci se nepodařilo spustit',
  'shell.boot.failText': 'Prostředí aplikace nenastartovalo. Načtěte stránku znovu — uložená měření a nastavení zůstávají na svém místě.',
  'shell.background.error': 'Na pozadí se něco pokazilo',
  'shell.background.action': 'Načíst znovu',
  'shell.update.title': 'Je dostupná nová verze',
  'shell.update.action': 'Načíst znovu',

  'onboarding.title': 'Než začnete',
  'onboarding.lead': 'Monitor světla se kamerou dívá na světlo kolem vás a počítá z něj sedm veličin — od podílu modré po zrakový komfort.',
  'onboarding.privacy': 'Obraz toto zařízení neopouští: není tu žádný server, žádný účet a nic se neodesílá. Všech sedm veličin funguje hned, bez přihlašování a bez poplatků.',
  'onboarding.honesty': 'Je to orientační pomůcka, ne měřicí přístroj ani lékařské vyšetření. Co změřit nejde, to neukazujeme — místo čísla uvidíte pomlčku.',
  'onboarding.start': 'Začínáme',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Provést',
  'overlay.toast.close': 'Zavřít zprávu',
  'overlay.sheet.label': 'Okno',
  'overlay.sheet.close': 'Zavřít',
  'overlay.dialog.confirm': 'Potvrdit',
  'overlay.dialog.cancel': 'Zrušit',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'Zrušit',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'Měření',

  'measure.intro.aria': 'Začít měření',
  'measure.intro.headline': 'Podívejte se, čím svítíte',
  'measure.intro.lead': 'Kamera ukáže, kolik modré je ve světle, které na vás právě dopadá — a jestli ho v tuto denní dobu není příliš.',
  'measure.intro.start': 'Spustit měření',
  'measure.intro.hint': 'Prohlížeč požádá o přístup ke kameře. Měření začne hned, jakmile ho povolíte.',
  'measure.intro.privacy': 'Obraz z kamery se zpracovává v tomto zařízení a nikdy ho neopouští. Neodesíláme, neukládáme ani nesdílíme jediný snímek.',

  'measure.live.aria': 'Probíhá měření',
  'measure.badge.starting': 'Spouštím',
  'measure.badge.paused': 'Pozastaveno',
  'measure.badge.running': 'Měření běží',
  'measure.stale': 'Čekám na obraz — náhled zamrzá, když je aplikace na pozadí.',
  'measure.crop': 'Měříme střed záběru — vyznačených {percent} % šířky a výšky obrazu.',
  'measure.facing.front': 'přední objektiv',
  'measure.facing.back': 'zadní objektiv',

  'measure.boot.title': 'Spouštím kameru…',
  'measure.boot.text': 'Pokud prohlížeč žádá o povolení, udělte ho — bez obrazu není co měřit. Povolení platí jen pro tuto stránku a můžete ho později odebrat.',
  'measure.boot.cancel': 'Zrušit',

  'measure.hold': 'Údaje jsou zmrazené. Kamera běží dál, ale nic se nedostane do historie ani do průměrů.',
  'measure.gridHint': 'Vyberte dlaždici, chcete-li tuto veličinu přesunout na velký ukazatel.',

  'measure.stop': 'Zastavit',
  'measure.pause': 'Pozastavit',
  'measure.resume': 'Pokračovat',
  'measure.flip.aria': 'Přepnout kameru',
  'measure.flip.toBack': 'Přepnout na zadní objektiv',
  'measure.flip.toFront': 'Přepnout na přední objektiv',

  'measure.fail.aria': 'Chyba kamery',
  'measure.fail.headline': 'Kamera se nespustila',
  'measure.fail.retry': 'Zkusit znovu',
  'measure.fail.back': 'Zpět',
  'measure.fail.savedSession': 'Relace z doby před přerušením ({duration}) byla uložena do historie.',
  'measure.error.fallback': 'Kameru se nepodařilo spustit.',

  'measure.summary.aria': 'Shrnutí relace',
  'measure.summary.title': 'Shrnutí relace',
  'measure.summary.paused': 'pozastaveno {duration}',
  'measure.summary.nothingMeasured': 'Žádná veličina nezaznamenala měření — kamera po celou relaci neviděla světlo.',
  'measure.summary.note': 'Průměry počítají jen vzorky mimo pozastavení. Veličiny, které se nezměřily, se vynechávají — nepočítají se jako nula.',
  'measure.summary.nearThreshold': 'Nejblíž prahu',
  'measure.summary.worstPoint': 'Nejslabší místo',
  'measure.summary.averageZone': 'průměrně {zone}',
  'measure.summary.tooShort': 'Relace trvala {duration} — na to, aby se do historie dostala sama, je to málo. Uložit ji můžete ručně.',
  'measure.summary.again': 'Měřit znovu',
  'measure.summary.save': 'Uložit do historie',
  'measure.summary.saved': 'Uloženo do historie',
  'measure.summary.savedToast': 'Relace uložena do historie.',
  'measure.summary.close': 'Zavřít',

  'measure.method.title': 'Jak to měříme',
  'measure.method.p1': 'Aplikace vzorkuje obraz z kamery desetkrát za sekundu a veličiny počítá ze středních {percent} % záběru — zaměřovač v náhledu vyznačuje přesně tuto oblast.',
  'measure.method.p2': 'Kamera telefonu má tři široké kanály a k tomu vlastní automatickou expozici a vyvážení bílé. Vidí poměry světla, ne jeho spektrum.',
  'measure.method.p3': 'Podíl modré, jas, blikání a rovnoměrnost jsou to, co kamera opravdu měří. Barevná teplota a cirkadiánní vliv jsou přiznaná přiblížení spočítaná ze základních barev sRGB.',
  'measure.method.p4': 'Blikání je vidět jen pod čtyřmi hertzy. Síťové blikání na 100 Hz leží daleko za dosahem tohoto vzorkování a nikdy ho neuvedeme jako odečet.',
  'measure.method.p5': 'Žádné z těchto čísel není fotometrické měření ani lékařský výsledek. Obraz z kamery zařízení neopouští.',
  'measure.method.ok': 'Rozumím',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'Spouštění kamery zrušeno.',
  'measure.announce.stoppedNoSamples': 'Měření zastaveno. Nebyl zaznamenán žádný vzorek.',
  'measure.announce.stopped': 'Měření zastaveno. Shrnutí relace je připravené.',
  'measure.announce.interrupted': 'Měření přerušeno. Shrnutí relace je připravené.',
  'measure.announce.paused': 'Měření pozastaveno. Údaje jsou zmrazené.',
  'measure.announce.resumed': 'Měření pokračuje.',
  'measure.announce.switchedFront': 'Přepnuto na přední objektiv. Začíná nová relace.',
  'measure.announce.switchedBack': 'Přepnuto na zadní objektiv. Začíná nová relace.',
  'measure.announce.lead': 'Hlavní veličina: {metric}.',
  'measure.announce.cameraError': 'Chyba kamery. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'Světlo se po celou relaci drželo v bezpečném rozsahu — nechte lampu tak, jak je, a zkontrolujte ji znovu po setmění, kdy svítí jiný zdroj.',
  'measure.advice.share.evening': 'Podíl modré byl průměrně {value} — zapněte na obrazovkách noční režim a zhasněte horní světlo, nechte jen jednu teplou lampičku ve výšce stolu.',
  'measure.advice.share.day': 'Podíl modré byl průměrně {value} — přes den je to přijatelné, ale nastavte obrazovce automatický přechod do teplého režimu dvě hodiny před spaním.',
  'measure.advice.brightness': 'Záběr byl přesvětlený (průměrně {value}) — odstupte od zdroje světla nebo snižte jas měřené obrazovky, protože při takové expozici ztrácejí přesnost i ostatní veličiny.',
  'measure.advice.kelvin.evening': 'Barva světla se držela průměrně na {value} — po setmění jděte pod 3000 K: přepněte lampu do teplého režimu nebo našroubujte žárovku 2700 K.',
  'measure.advice.kelvin.day': 'Barva světla se držela průměrně na {value} — na den je to dobrá, povzbuzující bílá, ale večer tutéž lampu přepněte na 2700 K.',
  'measure.advice.melanopic.evening': 'Cirkadiánní vliv byl průměrně {value} — dvě hodiny před spaním jděte pod 0,50 ×: ztlumte hlavní světlo a sviťte z výšky stolu místo ze stropu.',
  'measure.advice.melanopic.day': 'Cirkadiánní vliv byl průměrně {value} — v tuto dobu taková dávka pomáhá, ale večer tento zdroj vyměňte za slabší a teplejší.',
  'measure.advice.flicker': 'Blikání dosahovalo průměrně {value} — obvykle za tím stojí stmívač nebo nízko stažené podsvícení: zvyšte jas obrazovky nad 40 % nebo stmívač vyměňte za takový, který nepoužívá PWM.',
  'measure.advice.uniformity': 'Světlo dopadalo nerovnoměrně (průměrně {value}) — postavte lampu bokem ke stolu a přidejte druhý, slabší zdroj z opačné strany místo jednoho silného bodu.',
  'measure.advice.comfort': 'Zrakový komfort vyšel průměrně {value} — začněte jedinou změnou: ztlumte hlavní zdroj na polovinu a teprve potom se pusťte do barvy světla.',
  'measure.advice.default': 'Změňte na osvětlení jednu věc a změřte ho znovu — srovnání dvou relací řekne víc než jediný odečet.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'Historie',
  'history.action.export': 'Exportovat historii',

  'history.metricGroup.aria': 'Výběr měřené veličiny',
  'history.announce.metric': 'Veličina: {metric}',
  'history.rangeGroup.aria': 'Časový rozsah',
  'history.range.aria': 'Posledních {range}',

  'history.stats.title': 'Statistika rozsahu',
  'history.stats.head': '{metric}\u00A0—\u00A0posledních {range}',
  'history.stats.note': 'Počítáno z toho, co je vidět v grafu. Čas bez měření se nezapočítává — nedosazujeme za něj nulu.',
  'history.stat.min': 'Minimum',
  'history.stat.avg': 'Průměr',
  'history.stat.max': 'Maximum',
  'history.trend.up': 'v tomto rozsahu roste',
  'history.trend.flat': 'bez zřetelné změny',
  'history.trend.down': 'v tomto rozsahu klesá',
  'history.trend.none': 'není s čím porovnat',

  'history.sessions.title': 'Měřicí relace',
  'history.sessions.count': '{sessions}, od nejnovější',
  'history.sessions.empty': 'Zatím žádná relace',
  'history.sessions.hint': 'Relace se uloží po zastavení měření.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'rozsah: {range}',
  'history.session.noMeasure': 'bez měření',

  'history.data.title': 'Data',
  'history.data.subtitle': 'Historie je uložená výhradně v tomto zařízení.',
  'history.export.csv': 'Exportovat CSV',
  'history.export.json': 'Exportovat JSON',
  'history.export.ok': 'Soubor je připravený k uložení',
  'history.export.fail': 'Soubor se nepodařilo připravit. V anonymním režimu a v okně vloženém do jiné aplikace prohlížeč ukládání blokuje — otevřete stránku v běžné kartě.',
  'history.export.sheet.title': 'Export historie',
  'history.export.sheet.text': 'CSV se otevře v tabulkovém procesoru (středník, desetinná čárka). JSON zachová všechno včetně seznamu relací a míst bez měření.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Vymazat historii',
  'history.clear.title': 'Vymazat historii?',
  'history.clear.text': 'Smažeme {points} a {sessions}. Vrátit to nejde — pokud chcete data zachovat, nejdřív je exportujte.',
  'history.clear.confirm': 'Vymazat',
  'history.clear.announce': 'Historie vymazána.',
  'history.clear.toast': 'Historie vymazána',

  'history.empty.title': 'Zatím není co ukázat',
  'history.empty.text': 'Historie se plní během měření — jeden bod za sekundu. Všechno zůstává v tomto zařízení.',
  'history.empty.action': 'Přejít na měření',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 min',
  'range.5m': '5 min',
  'range.1h': '1 hod.',
  'range.24h': '24 hod.',
  'range.7d': '7 dní',
  'range.30d': '30 dní',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Datum a čas',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'Paměť zařízení je plná — nová měření se už neukládají.',
  'storage.blocked': 'Prohlížeč neumožňuje historii uložit — data zmizí po zavření karty.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Nástroje',
  'tools.action.about': 'O měření',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Jazyk',
  'tools.language.subtitle': 'Ve výchozím stavu se aplikace řídí jazykem zařízení; volba z tohoto seznamu se projeví hned a zůstane v tomto prohlížeči.',
  'tools.language.aria': 'Jazyk rozhraní',
  'tools.language.system': 'Auto',
  'tools.language.announce': 'Jazyk rozhraní: {language}.',

  'tools.appearance.title': 'Vzhled',
  'tools.appearance.theme.title': 'Motiv',
  'tools.appearance.theme.desc': '„Auto“ se řídí nastavením systému.',
  'tools.appearance.theme.aria': 'Motiv',
  'tools.theme.system': 'Auto',
  'tools.theme.light': 'Světlý',
  'tools.theme.dark': 'Tmavý',
  'tools.appearance.accent.title': 'Barva zvýraznění',
  'tools.appearance.accent.desc': 'Barva tlačítek, výběru a posuvníků.',
  'tools.appearance.accent.aria': 'Barva zvýraznění',
  'tools.appearance.textScale.title': 'Velikost textu',
  'tools.appearance.textScale.desc': 'Zvětšuje celé rozhraní, nejen popisky.',
  'tools.appearance.textScale.aria': 'Velikost textu',
  'tools.appearance.density.title': 'Hustota',
  'tools.appearance.density.desc': 'Kompaktní vejde na jednu obrazovku víc obsahu.',
  'tools.appearance.density.aria': 'Hustota rozvržení',
  'tools.density.comfortable': 'Běžná',
  'tools.density.compact': 'Kompaktní',
  'tools.appearance.motion.title': 'Méně pohybu',
  'tools.appearance.motion.desc': 'Vypne animace a plynulé dojíždění ručičky. Nastavení systému respektujeme nezávisle na tom.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Oceán',
  'accent.violet': 'Fialová',
  'accent.amber': 'Jantar',
  'accent.mint': 'Máta',
  'accent.rose': 'Růže',

  'tools.thresholds.title': 'Prahy',
  'tools.thresholds.subtitle': 'Od jaké hodnoty má aplikace říkat „mírná“ a od jaké „škodlivá“. Výchozí prahy jsou náš návrh, ne norma — nastavte si je po svém.',
  'tools.thresholds.warn': 'Práh varování',
  'tools.thresholds.crit': 'Práh poplachu',
  'tools.thresholds.warn.aria': 'Práh varování — {metric}',
  'tools.thresholds.crit.aria': 'Práh poplachu — {metric}',
  'tools.thresholds.reset': 'Výchozí',
  'tools.thresholds.reset.aria': 'Obnovit výchozí prahy: {metric}',
  'tools.thresholds.moved': '{threshold} posunut na {value}.',
  'tools.thresholds.resetAll': 'Obnovit všechny prahy',
  'tools.thresholds.resetAll.title': 'Obnovit výchozí prahy?',
  'tools.thresholds.resetAll.text': 'Všech sedm veličin se vrátí k prahům, které navrhuje aplikace. Historie měření zůstane nedotčená.',
  'tools.thresholds.resetAll.confirm': 'Obnovit',
  'tools.thresholds.resetAll.cancel': 'Ponechat',
  'tools.thresholds.resetAll.toast': 'Prahy se vrátily na výchozí',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'nad {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} a méně',
  'tools.zoneRange.goodBelow': 'pod {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} a více',

  'tools.calibration.title': 'Kalibrace',
  'tools.calibration.subtitle': 'Pro ty, kdo mají s čím porovnávat.',
  'tools.calibration.intro': 'Dva telefony namířené na tutéž lampu ukážou trochu jiná čísla — každý snímač má vlastní barevný nádech. Pokud máte po ruce měření, kterému věříte, můžete tu jednotlivé kanály obrazu jemně zesílit nebo zeslabit. Násobitele působí dřív, než cokoli spočítáme, takže mění všech sedm veličin naráz.',
  'tools.calibration.neutral': 'Nemáte s čím porovnávat? Nechte 1,00 — to je tovární nastavení a nic nekazí.',
  'tools.calibration.forward': 'Změna platí od této chvíle. Měření dříve uložená v historii zůstávají taková, jaká byla v okamžiku uložení — zpětně je nepřepočítáváme, protože by to znamenalo měnit data až po jejich pořízení.',
  'tools.calibration.reset': 'Vynulovat kalibraci',
  'tools.calibration.reset.toast': 'Kalibrace vynulována',
  'tools.calibration.channel.r': 'Červený kanál',
  'tools.calibration.channel.g': 'Zelený kanál',
  'tools.calibration.channel.b': 'Modrý kanál',
  'tools.calibration.channel.aria': '{channel} — kalibrační násobitel',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'Měření',
  'tools.measurement.wake.title': 'Nezhasínat obrazovku',
  'tools.measurement.wake.desc': 'Během měření obrazovka zůstane rozsvícená. Baterie se pak vybíjí rychleji.',
  'tools.measurement.wake.unsupported': 'Tento prohlížeč neumožňuje zabránit zhasnutí obrazovky.',
  'tools.measurement.haptics.title': 'Vibrace',
  'tools.measurement.haptics.desc': 'Krátké potvrzení při spuštění, zastavení a změně veličiny.',
  'tools.measurement.haptics.unsupported': 'Toto zařízení nehlásí vibrační motorek.',

  'tools.about.title': 'O měření',
  'tools.about.subtitle': 'Co přesně počítá každá ze sedmi veličin a kde končí poctivost této metody.',
  'tools.about.scale': 'Škála: od {min} do {max}.',
  'tools.about.threshold': 'Varujeme od {warn}, poplach hlásíme od {crit}.',
  'tools.about.thresholdInvert': 'Varujeme pod {warn}, poplach hlásíme pod {crit}.',
  'tools.about.limitsHead': 'Co toto měření nedokáže',
  'tools.about.limit.spectrum.title': 'Kamera nevidí barvy tak jako měřicí přístroj',
  'tools.about.limit.spectrum.text': 'Fotoaparát v telefonu má tři kanály: červený, zelený a modrý. Přístroj na měření světla rozkládá světlo na desítky úzkých pásem. To, co tu vidíte, je odvozené z těch tří čísel — rozumným způsobem, ale pořád je to výpočet, ne změřené spektrum.',
  'tools.about.limit.exposure.title': 'Fotoaparát si jas reguluje sám',
  'tools.about.limit.exposure.text': 'Když telefon namíříte na okno, kamera obraz ztmaví, aby ho nepřesvětlila. „Jas scény“ tehdy klesne, i když se v místnosti nic nezměnilo. Proto tuto hodnotu porovnávejte v rámci jednoho záběru, ne mezi místnostmi.',
  'tools.about.limit.flicker.title': 'Rychlé blikání pomalá kamera nezachytí',
  'tools.about.limit.flicker.text': 'Obraz kontrolujeme {hz}krát za sekundu. Pulzování rychlejší než {nyquist}krát za sekundu se v takovém měření může ukázat jako pomalejší, než ve skutečnosti je, nebo zmizet úplně — a blikání z elektrické sítě je právě takové. Když aplikace něco zachytí, berte to jako signál „tady něco pulzuje“, ne jako změřenou frekvenci.',
  'tools.about.limit.medical.title': 'Toto není vyšetření ani lékařská rada',
  'tools.about.limit.medical.text': 'Aplikace pomáhá všimnout si, že světlo kolem je studené, jasné nebo neklidné, a napovídá, co se s tím dá dělat. Nevynáší žádný soud o zdraví a nenahrazuje rozhovor s lékařem ani měření profesionálním přístrojem.',
  'tools.about.privacy': 'Všechno se počítá ve vašem zařízení. Obraz z kamery se nikam neodesílá ani neukládá — do paměti se dostanou pouze spočítaná čísla.',

  'tools.data.title': 'Data',
  'tools.data.subtitle': 'Všechno leží v paměti tohoto prohlížeče a nikam odsud neodchází.',
  'tools.data.summary.empty': 'Zatím tu nejsou žádná uložená měření.',
  'tools.data.summary': 'V paměti: {points} a {sessions}.',
  'tools.data.export.csv': 'Exportovat CSV',
  'tools.data.export.json': 'Exportovat JSON',
  'tools.data.clear': 'Vymazat historii',
  'tools.data.reset': 'Výchozí nastavení',
  'tools.data.reset.title': 'Obnovit výchozí nastavení?',
  'tools.data.reset.text': 'Vzhled, prahy, kalibrace a nastavení měření se vrátí do počátečního stavu. Historie měření zůstane nedotčená.',
  'tools.data.reset.confirm': 'Obnovit',
  'tools.data.reset.toast': 'Výchozí nastavení obnoveno',
  'tools.data.wipe': 'Smazat všechna data',
  'tools.data.wipe.title': 'Smazat všechna data aplikace?',
  'tools.data.wipe.text': 'Zmizí: celá historie měření i seznam relací, vaše prahy a kalibrace a nastavení vzhledu. Aplikace se vrátí do stavu z prvního spuštění.',
  'tools.data.wipe.note': 'Kopii těchto dat nemáme — nikdy neopustila toto zařízení, takže není odkud je obnovit.',
  'tools.data.wipe.check': 'Rozumím, že to nejde vzít zpět',
  'tools.data.wipe.confirm': 'Smazat vše',
  'tools.data.wipe.toast': 'Všechna data aplikace byla smazána',
  'tools.data.wipe.announce': 'Všechna data aplikace byla smazána. Nastavení se vrátilo na výchozí.',
  'tools.data.storage.blocked': 'Tento prohlížeč neumožňuje nic trvale uložit (anonymní režim nebo blokovaná data webů). Všechno, co tu nastavíte, zmizí po zavření karty.',
  'tools.data.storage.full': 'Paměť prohlížeče se zaplnila a nová měření se už neukládají. Vymazání historie uvolní místo.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Podpora',
  'support.free.title': 'Všechno je dostupné',
  'support.free.lead': 'Všech sedm veličin, celá historie, prahy, kalibrace i export fungují od prvního spuštění — bez účtu, bez limitů a bez poplatků.',
  'support.free.note': 'Měření se celé počítá v tomto zařízení a funguje i bez sítě. Není tu žádná lepší verze schovaná za zdí.',
  'support.why.title': 'Proč o to prosím',
  'support.why.lead': 'Monitor světla vzniká po večerech a nestojí za ním ani reklama, ani sponzor, ani firma. Podpora pokrývá čas na opravy, nové veličiny a udržování toho, co už funguje.',
  'support.what.title': 'Co dar přinese',
  'support.what.lead': 'Nic. Dar nic neodemyká — žádnou funkci navíc, žádný odznak u jména, žádnou přednost. Všechno, co aplikace umí, už máte.',
  'support.what.note': 'Zůstane jen to, že vím, že se to někomu hodilo. To je opravdu dostatečný důvod.',
  'support.cta.title': 'Pokud chcete pomoct',
  'support.cta.button': 'Kupte mi kávu',
  'support.cta.nolink': 'Profil pro dary zatím není připojený. Až se objeví, bude na tomto místě tlačítko.',
  'support.cta.privacy': 'Tento odkaz otevře externí stránku Buy Me a Coffee v nové kartě. To je jediný okamžik, kdy cokoli opouští toto zařízení — samotné měření zůstává vždy tady.',
  'support.cta.privacyFuture': 'Až bude adresa na místě, tlačítko otevře externí stránku Buy Me a Coffee v nové kartě. Bude to jediný okamžik, kdy cokoli opouští toto zařízení — samotné měření zůstává vždy tady.',
  'support.cta.note': 'Není tu žádné odpočítávání, žádné připomínky ani okno, které se otevře samo. Tato prosba čeká jen na této záložce.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'poslední minuta',
  'gauge.aria': '{metric}: {value}, zóna: {zone}',
  'gauge.aria.note': '{metric}: {value}, zóna: {zone}, {note}',
  'gauge.aria.initial': '{metric}: bez dat',
  'gauge.value.none': 'bez dat',
  /* Odczyt słowny z jednostką: „27 procent”, „1,20 krát”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'přibližná hodnota',
  'gauge.note.offScale': 'mimo škálu',
  'gauge.metric.unknown': 'Neznámá veličina',

  'chart.aria.label': 'Graf historie měření',
  'chart.hint': 'Interaktivní graf. Šipky vlevo a vpravo posouvají kurzor odečtu, Home a End skočí na začátek a konec rozsahu, Escape kurzor skryje.',
  'chart.empty.title': 'Žádná data',
  'chart.empty.text': 'Spusťte měření — graf se objeví po prvních odečtech.',
  'chart.few.title': 'Málo dat',
  'chart.few.text': 'Máme jeden odečet: {value}. Čáru kreslíme od dvou.',
  'chart.legend.line': 'měření',
  'chart.legend.gap': 'přerušení měření',
  'chart.aria.head': 'Graf: {metric}, rozsah {range}',
  'chart.aria.empty': 'V tomto rozsahu nejsou data.',
  'chart.aria.one': 'Jeden odečet: {value}.',
  'chart.aria.summary': 'Od {min} do {max}, průměr {avg}, {points}.',
  'chart.aria.gaps': 'V řadě jsou mezery — tehdy jsme neměřili.',
  'chart.readout.empty': 'V tomto rozsahu nejsou data.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'Na vykreslení grafu je málo dat.',
  'chart.readout.hint': 'Jedno měření odečtete přejetím po grafu nebo šipkami.',
  'chart.time.now': 'teď',
  'chart.time.justNow': 'před chvílí',
  'chart.time.ago': 'před {duration}',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku. */
  'chart.sample.ago': '\u221230\u00A0min',
  'chart.sample.clock': '00:00',
  'chart.sample.date': '30.\u00A0srp',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'Podíl modré',
  'metric.share.short': 'Kolik z viděného světla připadá na modrý kanál.',
  'metric.share.help': 'Odděluje barvu od jasu — je to hodnota, která se pohne, když zapnete noční režim.',
  'metric.brightness.name': 'Jas scény',
  'metric.brightness.short': 'Průměrný jas obrazu z kamery.',
  'metric.brightness.help': 'Relativní hodnota, ne luxy — automatická expozice kamery s ní nepozorovaně pohybuje.',
  'metric.kelvin.name': 'Barevná teplota',
  'metric.kelvin.short': 'Jestli je světlo teplé, nebo studené.',
  'metric.kelvin.help': 'Pod 3000 K je světlo teplé a večer šetrnější. 6500 K je výchozí bílá většiny obrazovek.',
  'metric.melanopic.name': 'Cirkadiánní vliv',
  'metric.melanopic.short': 'Jak silně toto světlo působí na vnitřní hodiny.',
  'metric.melanopic.help': 'Přiblížení melanopického poměru. 1,00 je neutrální denní bílá; večer se vyplatí jít pod 0,50.',
  'metric.flicker.name': 'Blikání',
  'metric.flicker.short': 'Neviditelné pulzování zdroje světla.',
  'metric.flicker.help': 'Levné stmívače a podsvícení pulzují. Oko to nevidí, ale bývá to příčinou únavy a bolesti hlavy.',
  'metric.uniformity.name': 'Rovnoměrnost',
  'metric.uniformity.short': 'Jestli se světlo rozkládá po záběru rovnoměrně.',
  'metric.uniformity.help': 'Nízká hodnota na obrazovce znamená prosvítající podsvícení nebo odraz; na stole — špatně postavenou lampu.',
  'metric.comfort.name': 'Zrakový komfort',
  'metric.comfort.short': 'Jedno hodnocení místo šesti čísel.',
  'metric.comfort.help': 'Skládá ostatní měření do výsledku 0–100 a ukazuje, co ho nejvíc snižuje. Váhy jsou náš redakční odhad, ne norma.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'bezpečná',
  'zone.warn': 'mírná',
  'zone.crit': 'škodlivá',
  'zone.none': 'bez dat',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24. srp'). */
  'date.month.short.1': 'led',
  'date.month.short.2': 'úno',
  'date.month.short.3': 'bře',
  'date.month.short.4': 'dub',
  'date.month.short.5': 'kvě',
  'date.month.short.6': 'čvn',
  'date.month.short.7': 'čvc',
  'date.month.short.8': 'srp',
  'date.month.short.9': 'zář',
  'date.month.short.10': 'říj',
  'date.month.short.11': 'lis',
  'date.month.short.12': 'pro',

  'date.clock': '{hours}:{minutes}',
  /* Czeski dzień miesiąca pisze się z kropką porządkową: „30. srp”. */
  'date.short': '{day}.\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0{year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0hod.',
  'time.duration.hourMinute': '{hours}\u00A0hod. {minutes}\u00A0min',
  'time.duration.hour': '{hours}\u00A0hod.',
  'time.duration.minuteSecond': '{minutes}\u00A0min {seconds}\u00A0s',
  'time.duration.minute': '{minutes}\u00A0min',
  'time.duration.second': '{seconds}\u00A0s',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „před chvílí”. */
  'time.justNow': 'před chvílí',
  'time.aMinuteAgo': 'před minutou',
  'time.minutesAgo': 'před {minutes}\u00A0min',
  'time.hoursAgo': 'před {hours}\u00A0hod.',
  'time.yesterday': 'včera',
  'time.daysAgo': 'před {days}\u00A0dny',

  /* Formy zależne od liczby. Rozstrzyga je Intl.PluralRules dla języka
     aktywnego. Czeski: one = 1, few = 2–4, many = ułamki (dopełniacz liczby
     pojedynczej), other = 0 i od 5 w górę (dopełniacz liczby mnogiej). */
  'time.days.plural': { one: 'den', few: 'dny', many: 'dne', other: 'dní' },
  'unit.sample.plural': { one: 'vzorek', few: 'vzorky', many: 'vzorku', other: 'vzorků' },
  /* „měření” jest nieodmienne w tych czterech pozycjach — cztery formy zostają,
     bo kształt wpisu jest wspólny dla wszystkich języków. */
  'unit.measurement.plural': { one: 'měření', few: 'měření', many: 'měření', other: 'měření' },
  /* Mianownik („3 relace, od nejnovější”) i biernik („Smažeme 1 relaci”) różnią
     się po czesku tylko w liczbie pojedynczej — stąd dwa klucze, jak w pl.js. */
  'unit.session.plural': { one: 'relace', few: 'relace', many: 'relace', other: 'relací' },
  'unit.session.accusative.plural': { one: 'relaci', few: 'relace', many: 'relace', other: 'relací' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy, choć po czesku brzmią tak samo — w innych językach już nie. */
  'unit.chartPoint.plural': { one: 'bod', few: 'body', many: 'bodu', other: 'bodů' },
  'unit.point.plural': { one: 'bod', few: 'body', many: 'bodu', other: 'bodů' },
  'unit.kelvin.plural': { one: 'kelvin', few: 'kelviny', many: 'kelvinu', other: 'kelvinů' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „procent”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'procent',
  'unit.spoken.times': 'krát',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, bez rady,
     co zrobić dalej. Każdy kod ma tu jedno zdanie diagnozy i jedno zdanie
     rady. */
  'camera.error.denied': 'Přístup ke kameře nebyl povolen. Povolte kameru pro tuto stránku v nastavení prohlížeče a zkuste to znovu.',
  'camera.error.notfound': 'Kamera nebyla nalezena. Zkontrolujte, jestli zařízení fotoaparát má a jestli není v systému vypnutý.',
  'camera.error.inuse': 'Kameru používá jiná aplikace. Zavřete ji, případně její kartu, a zkuste to znovu.',
  'camera.error.insecure': 'Kamera funguje jen přes HTTPS nebo na localhostu. Otevřete tuto stránku na adrese, která začíná na „https://“.',
  'camera.error.unsupported': 'Tento prohlížeč tu kameru nezpřístupňuje. Zkuste Chrome nebo Safari v běžném okně — ne v náhledu vestavěném do jiné aplikace.',
  'camera.error.unknown': 'Kameru se nepodařilo spustit.'
};
