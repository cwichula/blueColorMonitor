/* docs/v1/i18n/cs.js — słownik WŁASNY wersji v1, czeski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka. Kolejność jest treścią umowy: plik wersji dokłada się do tego samego
 * obiektu i może nadpisać dowolny klucz wspólny — nigdy odwrotnie.
 *
 * DLACZEGO TEN SŁOWNIK JEST SAMOWYSTARCZALNY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar w app.js, własne
 * dwie wielkości zamiast siedmiu i własne nazwy stref („Bezpečná“ zamiast
 * wspólnego „V normě“). Dlatego wszystko, co v1 pokazuje, stoi TUTAJ — także
 * klucze, które przypadkiem brzmią tak samo jak wspólne. Gdyby kiedyś warstwa
 * wspólna zmieniła brzmienie stref albo nazwę aplikacji, v1 ma zostać
 * nietknięta.
 *
 * SKĄD TE ZDANIA: przekład polskiego oryginału z docs/v1/i18n/pl.js, z rejestrem
 * i terminologią przejętymi z docs/shared/i18n/cs.js — forma grzecznościowa
 * „vy“, „podíl modré“, „jas scény“, „barevná teplota“, „zdravotnický
 * prostředek“, „odečet“. Nazw wielkości, których v1 nie ma (blikání,
 * rovnoměrnost, zrakový komfort), nie przenosimy tu wcale.
 *
 * CUDZYSŁÓW I PROCENT: czeski cudzysłów „…“ (dolny–górny), jak w słowniku
 * wspólnym. Przed znakiem % stoi spacja („33 %“) — czeska typografia, tak samo
 * jak w czeskim tłumaczeniu v5.
 *
 * LICZEBNIKI: Intl.PluralRules('cs') zwraca cztery kategorie — one (1),
 * few (2–4), many (ułamki: „1,5 minuty“) i other (0, 5 i więcej).
 *
 * MARKUP W WARTOŚCIACH. Część kluczy (rozdziały Dokumentacji) zawiera znaczniki
 * <b>, <i>, <code> i encje HTML. Wstawiane są przez data-i18n-html, czyli tylko
 * tam, gdzie autor tekstu świadomie tego chciał — nigdy do treści pochodzącej
 * od użytkownika.
 */
window.I18nData = window.I18nData || {};
window.I18nData['cs'] = Object.assign(window.I18nData['cs'] || {}, {

  /* ---- aplikacja ---- */

  'app.name': 'Monitor škodlivého světla',
  'app.description': 'Kamerou měří intenzitu modré barvy na obrazovce a ukazuje ji v přehledném grafu se zónami: bezpečná, mírná, škodlivá.',

  /* ---- wybór języka ---- */

  'language.label': 'Jazyk',
  'language.help': 'Jazyk celé aplikace. Všechny jazyky už jsou v tomto zařízení — nic se nestahuje a nic se nikam neodesílá.',
  'language.auto': 'Podle zařízení',

  /* ---- nawigacja ---- */

  'nav.aria': 'Hlavní nabídka',
  'nav.tabsAria': 'Zobrazení aplikace',
  'nav.announce': 'Obrazovka: {screen}',
  'nav.camera': 'Kamera',
  'nav.monitoring': 'Monitorování',
  'nav.support': 'Podpora',
  'nav.more': 'Více',
  'nav.docs': 'Dokumentace',
  'nav.about': 'O aplikaci a kontakt',
  'nav.settings': 'Prahy varování',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← Zpět',
  'action.back.aria': 'Zpět na předchozí obrazovku',
  'action.openDocs': 'Přejít na dokumentaci',
  'action.exportCsv': 'Exportovat CSV',
  'action.delete': 'Smazat',
  'action.closeNotification': 'Zavřít zprávu',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref: przymiotnik w rodzaju żeńskim („zóna
     bezpečná“), a nie wspólne „V normě“. Wersja plakatowa (zone.badge.*) jest
     osobnym kluczem, a nie zapisem wielkimi literami przez CSS: tureckie „i“
     i greckie akcenty nie znoszą automatycznej zamiany. */

  'zone.good': 'Bezpečná',
  'zone.warning': 'Mírná',
  'zone.critical': 'Škodlivá',
  'zone.none': 'Bez dat',

  'zone.badge.good': 'BEZPEČNÁ',
  'zone.badge.warning': 'MÍRNÁ',
  'zone.badge.critical': 'ŠKODLIVÁ',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'Jas kanálu B',
  'metric.raw.unitLabel': '% jasu kanálu B',
  'metric.share.name': 'Podíl modré',
  'metric.share.longName': 'Podíl modré ve světle',
  'metric.share.unitLabel': '% podílu modré',
  'stat.overallBrightness': 'Celkový jas scény',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': 'Náhled kamery',
  'camera.pressStart': 'Stiskněte „Start“.',
  'camera.start': 'Start',
  'camera.stop': 'Stop',
  'camera.switch': 'Přepnout kameru',
  'camera.error': 'Kameru se nepodařilo spustit. Zkontrolujte oprávnění prohlížeče ke kameře a zkuste to znovu. ({message})',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': 'Aktuální odečty',
  'disclaimer.short': 'Orientační výsledek. Toto není zdravotnický prostředek.',
  'disclaimer.more': 'Více',

  /* ---- wykresy ---- */

  'chart.aria': 'Grafy v čase',
  'chart.title': 'Grafy v čase (posledních {seconds} s)',
  'chart.empty': 'Spusťte kameru, ať uvidíte graf',
  'chart.axis.past': '-{seconds}s',
  'chart.axis.now': 'teď',
  'chart.raw.aria': 'Graf jasu kanálu B v čase, s vyznačenou bezpečnou, mírnou a škodlivou zónou',
  'chart.share.aria': 'Graf podílu modré ve světle v čase, s vyznačenou bezpečnou, mírnou a škodlivou zónou',

  /* ---- tabela odczytów ---- */

  'table.show': 'Zobrazit jako tabulku',
  'table.hide': 'Skrýt tabulku',
  'table.caption': 'Poslední odečty (nejnovější nahoře)',
  'table.col.time': 'Čas',
  'table.col.zone': 'Zóna',

  /* ---- ustawienia progów ---- */

  'settings.title': 'Nastavení prahů zón',
  'settings.boundary.critical': 'Hranice žlutá / červená:',
  'settings.boundary.warning': 'Hranice zelená / žlutá:',

  /* ---- historia i raport (features.js) ---- */

  'history.title': 'Historie a přehled',
  'history.rangeAria': 'Rozsah historie',
  'history.unavailable': 'Data historie jsou dočasně nedostupná.',
  'history.empty': 'V tomto rozsahu nejsou uložené žádné odečty. Spusťte měření — historie se plní sama.',
  'history.savedReadings': 'Uložené odečty: {count}. Rozdělení času podle zón:',
  'history.zoneLine': '{zone}: {percent} % ({readings})',

  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 dní',
  'range.30d': '30 dní',

  'report.dailyTitle': 'Denní přehled',
  'report.empty': 'Přehled se objeví, jakmile budou ve zvoleném rozsahu uložené odečty.',
  'report.dailyCaption': 'Podíl času v jednotlivých zónách, den po dni',
  'report.col.day': 'Den',
  'report.col.week': 'Týden',
  'report.col.readings': 'Odečty',
  'report.compare.day': 'Srovnání den po dni: {day} — {percent} % času ve škodlivé zóně, {change}',
  'report.compare.dayPending': 'Srovnání den po dni se objeví po druhém dni měření.',
  'report.compare.week': 'Srovnání týden po týdnu: {week} — {percent} % času ve škodlivé zóně, {change}',
  'report.compare.weekPending': 'Srovnání týden po týdnu se objeví po druhém týdnu měření.',
  'report.change.same': 'stejně jako {other}.',
  'report.change.more': 'o {points} více než {other}.',
  'report.change.less': 'o {points} méně než {other}.',
  'report.peak': 'Nejvíce odečtů ve škodlivé zóně padlo mezi {from} a {to}.',
  'report.peak.none': 'V tomto rozsahu nebyly uložené žádné odečty ve škodlivé zóně.',
  'report.weeklyTitle': 'Týdenní přehled',
  'report.weeklyEmpty': 'Týdenní přehled se objeví, jakmile budou ve zvoleném rozsahu uložené odečty.',
  'report.weeklyCaption': 'Podíl času v jednotlivých zónách, týden po týdnu',
  'report.weekLabel': 'Týden {week} ({year})',
  'report.footnote': 'Čísla jsou podílem uložených odečtů ve zvoleném rozsahu, ne přesnou dobou expozice.',

  /* ---- profile progów ---- */

  'profiles.title': 'Profily prahů',
  'profiles.empty': 'Zatím nemáte uložené žádné profily.',
  'profiles.itemActive': '{name} (aktivní)',
  'profiles.applyAria': 'Použít profil {name}',
  'profiles.deleteAria': 'Smazat profil {name}',
  'profiles.applied': 'Profil „{name}“ byl použit.',
  'profiles.deleted': 'Profil „{name}“ byl smazán.',
  'profiles.saved': 'Profil „{name}“ byl uložen.',
  'profiles.namePlaceholder': 'Název profilu (například Večer)',
  'profiles.saveLabel': 'Uložit současné prahy jako profil',
  'profiles.saveBtn': 'Uložit profil',
  'profiles.needName': 'Zadejte název profilu.',
  'profiles.limit': {
    one: 'Uložit můžete nejvýše {n} profil. Jeden smažte, ať můžete přidat nový.',
    few: 'Uložit můžete nejvýše {n} profily. Jeden smažte, ať můžete přidat nový.',
    many: 'Uložit můžete nejvýše {n} profilu. Jeden smažte, ať můžete přidat nový.',
    other: 'Uložit můžete nejvýše {n} profilů. Jeden smažte, ať můžete přidat nový.'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku też — ale musi
     zostać bezpieczna dla systemu plików: bez ukośników, dwukropków i bez
     czeskich znaków diakrytycznych. */

  'csv.header': 'cas;jas_B_proc;podil_modre_proc;jas_sceny_proc;zona',
  'csv.filename': 'monitorovani-svetla-{stamp}.csv',
  'csv.empty': 'Není co exportovat. Spusťte měření a zkuste to znovu.',
  'csv.done': 'Do souboru CSV bylo exportováno {readings}.',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut. Powód: po czesku wypada tam biernik
     trwania („už 1 minutu“, „už 5 minut“), a w każdym z trzydziestu języków
     przypadek może wypaść inaczej. */

  'alert.exposure': {
    one: 'Prahové upozornění: odečet je už {n} minutu ve škodlivé zóně. Zvažte přestávku nebo snížení podílu modré na obrazovce.',
    few: 'Prahové upozornění: odečet je už {n} minuty ve škodlivé zóně. Zvažte přestávku nebo snížení podílu modré na obrazovce.',
    many: 'Prahové upozornění: odečet je už {n} minuty ve škodlivé zóně. Zvažte přestávku nebo snížení podílu modré na obrazovce.',
    other: 'Prahové upozornění: odečet je už {n} minut ve škodlivé zóně. Zvažte přestávku nebo snížení podílu modré na obrazovce.'
  },

  'session.title': 'Shrnutí poslední relace',
  'session.line': 'Doba měření: {duration}. Uložené odečty: {count}.',
  'session.zoneLine': '{zone}: {percent} % času relace.',
  'session.endedAt': 'Shrnutí se týká relace ukončené v {time}.',
  'session.toast': 'Relace ukončena: {duration}, {readings}, {percent} % času ve škodlivé zóně.',

  'duration.seconds': '{n} s',
  'duration.minutesSeconds': '{minutes} min {seconds} s',

  /* ---- liczebniki ----
     Czeski ma cztery kategorie CLDR: one (1), few (2–4), many — ta ostatnia
     dotyczy ułamków: „1,5 odečtu“ — i other (0, 5 i więcej). Formę wybiera
     Intl.PluralRules('cs'), nie nasza reguła. */

  'count.readings': { one: '{n} odečet', few: '{n} odečty', many: '{n} odečtu', other: '{n} odečtů' },
  'count.points': {
    one: '{n} procentní bod',
    few: '{n} procentní body',
    many: '{n} procentního bodu',
    other: '{n} procentních bodů'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': 'Více',
  'more.section.settings': 'NASTAVENÍ',
  'more.section.help': 'NÁPOVĚDA',
  'more.thresholds.title': 'Prahy varování',
  'more.thresholds.sub': 'Nastavte hranice bezpečné, mírné a škodlivé zóny.',
  'more.docs.title': 'Dokumentace',
  'more.docs.sub': 'Jak měření funguje, jednotky, normy a zóny.',
  'more.about.title': 'O aplikaci a kontakt',
  'more.about.sub': 'Verze, soukromí a kontakt.',
  'more.free': 'Aplikace je celá zdarma.',
  'more.supportLink': 'Můžete ji dobrovolně podpořit.',
  'more.version': 'Verze {version} · Všechny funkce dostupné bez účtu a bez poplatků',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': 'O aplikaci a kontakt',
  'about.version': 'Verze {version}',
  'about.what.title': 'Co je tato aplikace',
  'about.what.p1': '{app} měří kamerou telefonu, kolik modrého světla senzor zaznamená, a ukazuje to na dvou cifernících a v grafech se zónami. Všechny funkce — měření, historie, přehledy, profily prahů, prahové upozornění, export CSV i dokumentace — jsou dostupné každému, bez účtu a bez poplatků.',
  'about.what.p2': 'Aplikace je poskytována „tak jak je“, k informačním účelům. Výsledek měření je orientační a není podkladem pro zdravotní rozhodnutí.',
  'about.privacy.title': 'Soukromí a data',
  'about.privacy.p1': 'Obraz z kamery se analyzuje výhradně ve vašem zařízení a nikdy se neodesílá na žádný server. Nezakládáme účty a nesbíráme vaše data. Nastavení prahů, profily a historie měření se ukládají pouze do paměti tohoto zařízení a tohoto prohlížeče.',
  'about.privacy.p2': 'Aplikace nezobrazuje reklamy a nekomunikuje se sítí. Jedinou výjimkou je tlačítko na obrazovce „Podpora“: když ho stisknete, prohlížeč otevře externí stránku v nové kartě. Nic se nestane, dokud to sami neuděláte.',
  'about.contact.title': 'Kontakt',
  'about.contact.p1': 'Připomínky, chyby a návrhy: [E-MAIL]. Odpovídáme, kdykoli to jde — je to projekt udržovaný po večerech.',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': 'Podpora',
  'support.free.title': 'Všechno je dostupné',
  'support.free.text': 'Celá aplikace je zdarma: měření, historie a přehledy, profily prahů, upozornění, export CSV i dokumentace. Všechno funguje hned, bez účtu, bez limitů a bez internetu.',
  'support.why': '{app} vzniká po večerech. Pokud se vám hodí, můžete mi koupit kávu. Pomáhá to aplikaci udržet a posunout ji dál — zlepšovat měření, dopisovat dokumentaci a zkoušet ji na dalších telefonech.',
  'support.nothing': 'Dar nic neodemyká. Není tu lepší ani horší verze — po podpoře funguje aplikace přesně stejně. Jediný rozdíl je ten, že autor ví, že se to někomu hodilo.',
  'support.button': 'Kupte mi kávu',
  'support.button.aria': 'Kupte mi kávu — otevře profil pro dary v nové kartě',
  'support.pending': 'Profil pro dary zatím není připojený. Jakmile se objeví, bude na tomto místě tlačítko. Do té doby není třeba nic dělat — aplikace je stejně celá zdarma.',
  'support.privacy': 'Tlačítko otevře externí stránku (například Buy Me a Coffee) v nové kartě prohlížeče. To je jediný okamžik, kdy cokoli opouští toto zařízení. Obraz z kamery a všechna vaše měření zůstávají tady — neodesílají se nikam, ani před stisknutím, ani po něm.',
  'support.privacyPending': 'Až se adresa objeví, otevře stisknutí tlačítka externí stránku (například Buy Me a Coffee) v nové kartě prohlížeče. Bude to jediný okamžik, kdy cokoli opouští toto zařízení. Obraz z kamery a všechna vaše měření zůstávají tady — neodesílají se nikam.',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': 'Dokumentace',

  'disclaimer.title': 'Toto není zdravotnický prostředek',
  'disclaimer.body.docs': 'Tato aplikace není zdravotnickým prostředkem. Neslouží k diagnostice, léčbě ani prevenci jakýchkoli nemocí. Výsledky měření kamerou telefonu jsou orientační a nenahrazují vyšetření ani radu lékaře. Ve věcech zdraví zraku se poraďte s lékařem nebo optometristou. Prahy zón v této aplikaci neodpovídají žádné bezpečnostní normě — podrobnosti v kapitole 3.',
  'disclaimer.body.about': 'Tato aplikace není zdravotnickým prostředkem. Neslouží k diagnostice, léčbě ani prevenci jakýchkoli nemocí. Výsledky měření kamerou telefonu jsou orientační a nenahrazují vyšetření ani radu lékaře. Ve věcech zdraví zraku se poraďte s lékařem nebo optometristou. Prahy zón v této aplikaci neodpovídají žádné bezpečnostní normě — podrobnosti v dokumentaci, kapitola 3.',

  'doc.toc.aria': 'Obsah dokumentace',
  'doc.toc.title': 'Obsah',

  'doc.ch1.title': 'Rychlý start',
  'doc.ch2.title': 'Jak měření funguje',
  'doc.ch3.title': 'Jednotky a normy',
  'doc.ch4.title': 'Zóny a prahy',
  'doc.ch5.title': 'Rozdíly mezi zařízeními',

  'doc.ch1.heading': '1. Rychlý start',
  'doc.ch2.heading': '2. Jak měření funguje',
  'doc.ch3.heading': '3. Jednotky a normy',
  'doc.ch4.heading': '4. Zóny a prahy',
  'doc.ch5.heading': '5. Rozdíly mezi zařízeními',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': 'Jak měřit přesněji',
  'doc.ch1.tips.li1': 'Na obrazovce „Kamera“ (první tlačítko na spodní liště) stiskněte „Start“ a namiřte zadní fotoaparát na obrazovku nebo světelný zdroj, který chcete zkontrolovat.',
  'doc.ch1.tips.li2': 'Přejděte na obrazovku „Monitorování“ (druhé tlačítko spodní lišty) — nahoře uvidíte oba ciferníky naráz a níž (posuňte se) grafy změn v čase. Měření běží na pozadí bez ohledu na to, kterou obrazovku právě sledujete.',
  'doc.ch1.tips.li3': 'Držte telefon ve stálé vzdálenosti od obrazovky (například 15–20 cm) a během měření neměňte okolní osvětlení.',
  'doc.ch1.tips.li4': 'Použijte zadní fotoaparát — má méně agresivní automatické korekce než přední.',
  'doc.ch1.tips.li5': 'Berte výsledky jako relativní ukazatele (%), ne jako absolutní fyzikální jednotky — porovnávejte je mezi sebou (například noční režim zapnutý a vypnutý).',
  'doc.ch1.tips.li6': 'Přizpůsobte prahy zón v nastavení jasu vlastní obrazovky (kapitola 4).',

  'doc.ch1.fonts.title': 'Velké písmo a ciferníky — vždy',
  'doc.ch1.fonts.p1': 'Celá aplikace používá velké, čitelné písmo a ciferníky v plné velikosti, aby lidé se slabým zrakem (a všichni ostatní) mohli údaje přečíst bez dalšího nastavování. Na obrazovce „Monitorování“ se oba ciferníky vejdou společně na jednu obrazovku, bez posouvání — grafy změn v čase jsou hned pod nimi, o jedno posunutí dál.',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': 'Fotoaparát telefonu a spektrometr',
  'doc.ch2.spectro.p1.html': 'Skutečné měření „kolik je škodlivého modrého světla“ vyžaduje rozklad světla na vlnové délky — to dělá <b>spektrometr</b>: hranol nebo difrakční mřížka rozloží světlo na desítky či stovky úzkých pásem (například po 1–5 nm) a v každém zvlášť změří optický výkon. Teprve z takového úplného spektrálního rozkladu se počítají jednotky jako lux, lumen nebo ozáření vážené funkcí ohrožení modrým světlem.',
  'doc.ch2.spectro.p2.html': '<b>Fotoaparát telefonu nedělá nic z toho.</b> Má tři široké filtry (Bayer: R/G/B), z nichž každý sbírá světlo ze širokého, překrývajícího se rozsahu vlnových délek — „modrý kanál“ není úzké pásmo kolem 435–440 nm (vrchol ohrožení sítnice), ale zhruba 400–570 nm smíchaných se zelenou. Po cestě se přidá demozaikování, automatická expozice, automatické vyvážení bílé a gama komprese sRGB — žádný z těchto kroků prohlížeč nedovolí úplně vypnout. Výsledkem je, že hodnota pixelu, kterou vidí JavaScript, není lineárně svázaná se skutečným optickým výkonem dopadajícím na senzor. To je zásadní hardwarové omezení, ne chyba této aplikace.',

  'doc.ch2.raw.title': 'Graf 1 — Jas kanálu B',
  'doc.ch2.raw.what.html': '<b>Co ukazuje:</b> průměrný jas samotného modrého kanálu (B) ze vzorkované části obrazu, ve škále 0–255 přepočtené na %.',
  'doc.ch2.raw.algo.html': '<b>Algoritmus:</b>',
  'doc.ch2.raw.step1': '5krát za sekundu odebereme z kamery snímek.',
  'doc.ch2.raw.step2': 'Vyřízneme prostředních 60 % záběru (vyhneme se tak okrajům obrazu a záři ze stran).',
  'doc.ch2.raw.step3': 'Vyříznutou část zmenšíme na mřížku 32×32 pixelů (dost přesné a mnohem rychlejší než počítání v plném rozlišení — důležité na slabším hardwaru, jako jsou levné telefony Xiaomi nebo Ulefone).',
  'doc.ch2.raw.step4': 'Zprůměrujeme hodnotu B všech 1024 pixelů této mřížky.',
  'doc.ch2.raw.step5.html': '<code>výsledek = průměr_B ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>Proč jsme ho ponechali:</b> je to nejjednodušší, přímý odečet „kolik modrého signálu senzor vůbec zaznamenává“. Slabinou je, že míchá jas s barvou — velmi jasná, ale neutrálně bílá scéna dá také vysoký výsledek, přestože není nijak zvlášť „modrá“. Proto vedle něj ukazujeme graf 2.',

  'doc.ch2.share.title': 'Graf 2 — Podíl modré ve světle',
  'doc.ch2.share.what.html': '<b>Co ukazuje:</b> jaké procento veškerého zaznamenaného světla (R+G+B) tvoří modrá složka — tedy posun barvy do studena, nezávisle na tom, jak jasná scéna je.',
  'doc.ch2.share.algo.html': '<b>Algoritmus:</b> stejné kroky 1–4 jako výše, ale místo samotného B počítáme:',
  'doc.ch2.share.formula.html': '<code>výsledek = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': 'Neutrální bílá (R≈G≈B) dává asi <b>33 %</b>. Teplejší, červenější světlo méně. Silně modré více, až k hranici ~100 % pro světlo téměř čistě modré.',
  'doc.ch2.share.why.html': '<b>Proč je to přesnější míra „škodlivé modré“:</b> je to tentýž princip, na kterém fungují filtry typu noční režim nebo Night Shift — rozhoduje <b>barva</b>, ne jas. Velmi jasná, ale neutrální obrazovka nebude falešně označena za škodlivou; ztlumená, ale silně modrá ano. Proto právě tato veličina řídí barvu zóny v tabulce odečtů.',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': 'Proč ne luxy ani lumeny',
  'doc.ch3.units.p1.html': '<b>Lumen (lm)</b> popisuje celkový světelný tok vyzářený zdrojem — je to vlastnost samotného zdroje, ne toho, co dopadá do daného místa. <b>Lux (lx)</b> je už osvětlenost v místě (lm/m²) — bližší tomu, oč jde, ale stále <b>fotometrická</b> jednotka: váží spektrum křivkou citlivosti lidského oka na jas (V(λ)), ne křivkou ohrožení modrým světlem. Ke skutečnému měření ohrožení je potřeba třetí, užší jednotka: spektrálně vážené ozáření ve <b>W/m²</b> (norma IEC 62471, vrchol citlivosti kolem 435–440 nm), a to vyžaduje spektrometr — viz oddíl výše.',
  'doc.ch3.units.p2.html': 'I kdybychom zůstali u luxů: telefon bez externího, kalibrovaného čidla světla je nedokáže spolehlivě určit. Vestavěné čidlo světla telefonu (tam, kde je) navíc měří světlo z <b>opačné strany</b> těla přístroje, než kterou míříte zadním fotoaparátem na obrazovku — měřilo by tedy světlo za vašimi zády, ne to z obrazovky. Proto místo hádání čísla v jednotce, která by stejně nebyla důvěryhodná, ukazujeme poctivě popsaný <b>relativní ukazatel (%)</b> — smysluplný pro srovnání na tomtéž telefonu za stejných podmínek (například noční režim zapnutý a vypnutý), ne jako absolutní hodnotu.',

  'doc.ch3.norms.title': 'Existují globální normy pro bezpečnostní prahy?',
  'doc.ch3.norms.p1.html': 'Krátce: <b>norma vyjádřená v procentech kanálu kamery neexistuje</b> — to vůbec není jednotka, ve které by se cokoli regulovalo. Skutečné normy týkající se modrého světla existují, ale měří jiné veličiny, v jiných jednotkách, a týkají se jiného jevu, než jaký obvykle máme na mysli, když řekneme „modré světlo unavuje oči“.',
  'doc.ch3.norms.p2.html': '<b>Akutní fotochemické poškození sítnice — IEC 62471 / ICNIRP.</b> Jediná skutečně regulovaná „škodlivost modrého světla“ — norma pro svítidla a osvětlovací soustavy, podepřená pokyny ICNIRP (International Commission on Non-Ionizing Radiation Protection). Řadí zdroje do skupin rizika RG0–RG3 na základě záře vážené funkcí ohrožení B(λ), ve <b>W·m⁻²·sr⁻¹</b>, s limitem doby expozice (<code>t_max = 100 / L_B</code> sekund). Obrazovky telefonů a monitorů — i při maximálním jasu — spadají prakticky vždy do <b>RG0 (osvobozeno, bez omezení)</b>. Tato norma se týká mnohem intenzivnějších zdrojů (svářecí oblouky, některé projektory, průmyslové LED), ne spotřebitelských obrazovek.',
  'doc.ch3.norms.p3.html': '<b>Vliv na cirkadiánní rytmus a spánek — CIE S 026.</b> To je jev, o který obvykle jde (obrazovka večer „probouzí“) — ale není to poškození oka, nýbrž vliv na biologické hodiny prostřednictvím gangliových buněk sítnice (ipRGC), nejcitlivějších kolem 480 nm. Norma CIE S 026:2018 definuje jednotku <b>melanopický lux (melanopic EDI)</b>. Nejblíž „oficiálnímu“ vědeckému konsenzu je publikace Browna a spoluautorů (<i>PLOS Biology</i>, 2022), která orientačně doporučuje: večer &lt; 10 melanopických luxů, přes den &gt; 250. Jsou to doporučení výzkumníků spánku, ne právní předpis.',
  'doc.ch3.norms.p4.html': '<b>WHO.</b> Světová zdravotnická organizace nevydává vlastní, nezávislé limity expozice modrému světlu — v bezpečnosti optického záření odkazuje na ICNIRP (výše). Jediným konkrétním vlastním dokumentem WHO k obrazovkám jsou <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i> (2019) — týkají se však <b>času</b> stráveného u obrazovky, ne barvy či intenzity světla: žádná obrazovka do 1 roku věku, nejvýše 1 hodina pro věk 2–4 roky. Pro dospělé WHO stejně konkrétní číselné pokyny nemá.',
  'doc.ch3.norms.p5.html': '<b>Proč to stejně nepomáhá aplikaci zkalibrovat:</b> obě normy (IEC/ICNIRP i CIE) vyžadují úplný spektrální rozklad a kalibrovanou září ve známé geometrii měření — přesně to, co telefon přes prohlížeč dodat nedokáže (viz oddíl „Fotoaparát telefonu a spektrometr“ výše). Přepočet „33 % podílu modré = X melanopických luxů“ neexistuje, takže prahy v této aplikaci <b>neodpovídají žádné bezpečnostní normě</b> (WHO, IEC, ICNIRP ani CIE — pro tento ukazatel prostě žádná neexistuje). Výchozí hodnoty prahu podílu modré jsou zato odvozené ze skutečných barevných teplot světla a ze široce opakovaného, praktického doporučení teplého světla večer — pevnější základ než pouhé zaokrouhlení, ale pořád ne formální norma (celé odvození: kapitola 4). Vždycky si je můžete v nastavení změnit na vlastní.',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': 'Barevné zóny a odkud se prahy berou',
  'doc.ch4.zones.p1.html': 'Obě veličiny mají vlastní, nezávisle nastavitelné prahy (obrazovka „Monitorování“ → „Nastavení prahů zón“, dole na stránce) — 33 %/66 % u jedné neznamená totéž co u druhé (viz kapitola 2 výše). O barvě v legendě pod grafy a v tabulce odečtů rozhoduje <b>podíl modré</b>:',
  'doc.ch4.zones.li1.html': '<b>Zelená — bezpečná:</b> teplé nebo neutrální světlo, oči odpočívají.',
  'doc.ch4.zones.li2.html': '<b>Žlutá — mírná:</b> znatelný posun do modra, vyplatí se dělat přestávky.',
  'doc.ch4.zones.li3.html': '<b>Červená — škodlivá:</b> silně modré světlo, při delší expozici oči výrazně unavuje (zvlášť večer).',
  'doc.ch4.zones.p2.html': '<b>Odkud se tato konkrétní čísla berou.</b> <b>Jas kanálu B</b> nemá přirozený vztažný bod — rozumná hodnota prahu závisí výhradně na tom, jak jasnou scénu snímáte (je to míra jasu, ne barvy). Výchozích 33 %/66 % je tu pořád smluvený výchozí bod — upravte si ho zkusmo podle typického jasu vlastní obrazovky a okolí.',
  'doc.ch4.zones.p3.html': '<b>Podíl modré</b> má výchozí prahy odvozené ze skutečných barevných teplot světla (fyzika, ne zaokrouhlení), ne z nějaké bezpečnostní normy — taková norma pro tuto veličinu neexistuje (kapitola 3). Vztažné body:',
  'doc.ch4.zones.li4.html': '<b>~4000K</b> („teplá bílá“, typická LED žárovka) → asi <b>26 %</b> podílu modré. Světlo teplejší než toto (nižší barevná teplota) je rozsah široce doporučovaný na večer nástroji typu f.lux nebo Night Shift — odtud dolní práh.',
  'doc.ch4.zones.li5.html': '<b>6500K (D65)</b>, standardní bílý bod většiny obrazovek telefonů a monitorů z výroby — asi <b>33 %</b>. Od této hodnoty výš začíná rozsah, ve kterém se typicky uplatňují doporučení omezit modré světlo — odtud horní práh.',
  'doc.ch4.zones.p4.html': '<b>Důležitá výhrada:</b> to, jak „modré“ světlo je, na denní době nezávisí, ale doporučení omezovat modré světlo se týkají vlastně jen <b>večera a noci</b> — přes den je expozice studenému, modrému světlu (včetně slunečního) normální, a pro cirkadiánní rytmus dokonce prospěšná. Červená zóna uprostřed dne při pohledu na běžnou, nezměněnou obrazovku neznamená skutečné ohrožení — totéž světlo večer už za omezení stojí.',
  'doc.ch4.zones.p5.html': 'Prahy obou veličin jsou zcela nezávislé — změna jedné neovlivní druhou. Změněné prahy se <b>pamatují v tomto zařízení a prohlížeči</b> mezi jednotlivými otevřeními aplikace (lokálně, nic se nikam neodesílá) — tlačítko „Start“ je na výchozí nevrací.',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': 'Proč náhled vypadá na různých zařízeních jinak',
  'doc.ch5.devices.p1.html': '<b>Prohlížeč versus nativní aplikace fotoaparátu.</b> Když otevřete fotoaparát nainstalovaný v telefonu z výroby, výrobce (například Xiaomi) přidává do živého náhledu vlastní, chráněné algoritmy — HDR v reálném čase, digitální zesilování jasu ve slabém světle, vyhlazování. Webová stránka dostává přes prohlížeč mnohem „syrovější“ proud z kamery (funkce <code>getUserMedia</code>), bez jediného z těchto vylepšení — takže bude ze zásady vypadat plošeji a tmavěji než nativní fotoaparát, ať je telefon jakýkoli.',
  'doc.ch5.devices.p2.html': '<b>Různé možnosti ovládání kamery.</b> Kolik kontroly nad expozicí a vyvážením bílé prohlížeč od systému vůbec dostane, závisí na konkrétním telefonu, ovladači kamery a verzi Chrome nebo WebView — jedna zařízení (typicky počítače s USB kamerou) hlásí jen plnou automatiku, jiná (část telefonů s Androidem) hlásí další, pokročilejší režimy. Dřívější verze této aplikace se snažila přepínat na ruční expozici tam, kde to telefon dovolil, bez nastavení konkrétní hodnoty — což na části telefonů zmrazilo obraz na náhodné, tmavé expozici z okamžiku spuštění kamery. To byla chyba v kódu (už opravená), ne rozdíl jednotek — ale dobře ukazuje, jak snadno se chování mezi zařízeními liší, když i tentýž řádek kódu se zapne jen na některých z nich.',
  'doc.ch5.devices.p3.html': '<b>Různé senzory a zpracování obrazu (ISP).</b> I při shodném kódu a téže scéně mají různé modely telefonů senzory různé kvality a různě vyladěnou automatiku výrobce — jeden dobere expozici ve slabém světle rychleji a přesněji než druhý. To spolu s tím, že ukazatele v této aplikaci jsou <b>relativní</b> (viz kapitola 3), znamená: výsledky (a vzhled náhledu) porovnávejte rozumně na tomtéž telefonu v čase, ne mezi různými modely či zařízeními.'
});
