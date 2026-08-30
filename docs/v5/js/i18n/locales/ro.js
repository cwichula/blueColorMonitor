/* Monitor Światła v5 — słownik rumuński.
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr). NIE JEST
 * KALKĄ żadnego z nich: polskie i angielskie zdania przełożono na naturalną
 * rumuńszczyznę. Zachowane zostało to, co niesie znaczenie: liczby, progi,
 * jednostki, nazwy wstawek i — co do treści — zastrzeżenia medyczne oraz
 * zdania o prywatności. Tych ostatnich nie wolno osłabiać ani wzmacniać:
 * „nie zastępuje rozmowy z lekarzem” i „obraz nie opuszcza urządzenia”
 * znaczą po rumuńsku dokładnie tyle samo, ani mniej, ani więcej.
 *
 * REJESTR: bezpośrednie „tu” — tak mówią rumuńskie aplikacje użytkowe;
 * „dumneavoastră” brzmiałoby jak pismo z urzędu. Ton rzeczowy i ciepły, bez
 * marketingu. Cudzysłowy rumuńskie „ … ” są takie same jak polskie.
 * Diakrytyki z przecinkiem pod spodem (ș, ț), nie z cedyllą. Przecinek
 * dziesiętny (1,00). Przed znakiem % stoi spacja nierozdzielająca (40 %),
 * jak w rumuńskiej typografii. Godzina dwudziestoczterogodzinna.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych i pomocy):
 *   ponderea albastrului, luminozitatea scenei, temperatura de culoare,
 *   impact circadian (w opisie: raportul melanopic), pâlpâire, uniformitate,
 *   confort vizual.
 * STREFY: sigur / moderat / dăunător — mówią o świetle, a nie o stanie
 * aplikacji, i wchodzą w zdanie „zonă: {zone}” tak samo jak polskie
 * „bezpiecznie / umiarkowanie / szkodliwie”.
 * POZOSTAŁE STAŁE ODPOWIEDNIKI: istoric (historia), sesiune (sesja),
 * eșantion (próbka), măsurătoare (pomiar), mărime (wielkość), prag (próg),
 * citire (odczyt), cadru (kadr), încăpere (pomieszczenie — nigdy „cameră”,
 * bo tym słowem nazywa się po rumuńsku kamerę).
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Text cu un substituent {name}'   — napis zwykły,
 *   'klucz.kropkowany': { one, few, other }               — forma zależna
 *                                                            od liczby.
 * Rumuński ma w CLDR trzy formy: `one` (1), `few` (0 oraz liczby, których dwie
 * ostatnie cyfry mieszczą się w 1–19: 2, 12, 102…) i `other` (reszta, od 20
 * w górę). Rumuńskie `other` zaczyna się od „de” — „20 de sesiuni” obok
 * „2 sesiuni” — więc nie wolno go zrównać z `few`. Nazwy wstawek są identyczne
 * jak w pl.js. Kolejność wstawek w zdaniu wolno zmieniać, nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Monitor de Lumină',
  'app.description': 'Monitor de Lumină — camera măsoară șapte mărimi ale luminii din jurul tău. Totul se calculează pe acest dispozitiv, nimic nu iese în rețea.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Monitor de Lumină',
  'app.skipToContent': 'Sari la conținut',
  'app.nav.aria': 'Navigare principală',
  'app.noscript.title': 'Această aplicație are nevoie de JavaScript',
  'app.noscript.text': 'Toată măsurătoarea se face în această filă de browser: JavaScript citește cadrele de la cameră și calculează din ele cele șapte mărimi ale luminii. Fără el nu are cu ce să măsoare. Activează JavaScript pentru această pagină și deschide-o din nou — tot nimic nu va fi trimis în rețea.',

  'nav.measure': 'Măsurare',
  'nav.history': 'Istoric',
  'nav.tools': 'Unelte',
  'nav.support': 'Sprijin',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Se măsoară',
  'shell.live.aria': 'Se măsoară. {metric}: {value}. Înapoi la ecranul de măsurare.',
  'shell.live.metricFallback': 'Mărime principală',
  'shell.action.fallback': 'Acțiune de ecran',

  'shell.loadFail.title': 'Ecranul „{screen}” nu a putut fi încărcat',
  'shell.loadFail.text': 'Probabil lipsesc câteva fișiere din memoria dispozitivului. Conectează-te la rețea și reîncarcă pagina.',
  'shell.fatal.title': 'Ceva nu a mers bine',
  'shell.fatal.text': 'Aplicația nu a reușit să compună ecranul. De obicei este de ajuns să reîncarci pagina — măsurătorile salvate și setările rămân la locul lor.',
  'shell.fatal.reload': 'Reîncarcă pagina',
  'shell.boot.failTitle': 'Aplicația nu a putut porni',
  'shell.boot.failText': 'Învelișul aplicației nu a pornit. Reîncarcă pagina — măsurătorile salvate și setările rămân la locul lor.',
  'shell.background.error': 'Ceva s-a stricat în fundal',
  'shell.background.action': 'Reîncarcă',
  'shell.update.title': 'Este disponibilă o versiune nouă',
  'shell.update.action': 'Reîncarcă',

  'onboarding.title': 'Înainte să începi',
  'onboarding.lead': 'Monitor de Lumină se uită cu camera la lumina din jurul tău și calculează din ea șapte mărimi — de la ponderea albastrului până la confortul vizual.',
  'onboarding.privacy': 'Imaginea nu părăsește acest dispozitiv: nu există server, nu există cont și nu există nimic de trimis. Toate cele șapte mărimi funcționează de la bun început, fără autentificare și fără plată.',
  'onboarding.honesty': 'Este o orientare, nu un instrument de măsură și nu un examen medical. Ce nu se poate măsura nu se arată — în locul unui număr vei vedea o liniuță.',
  'onboarding.start': 'Să începem',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Aplică',
  'overlay.toast.close': 'Închide mesajul',
  'overlay.sheet.label': 'Fereastră',
  'overlay.sheet.close': 'Închide',
  'overlay.dialog.confirm': 'Confirmă',
  'overlay.dialog.cancel': 'Anulează',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'Anulează',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'Măsurare',

  'measure.intro.aria': 'Începe o măsurătoare',
  'measure.intro.headline': 'Vezi în ce lumină stai',
  'measure.intro.lead': 'Camera arată cât albastru are lumina care cade acum pe tine — și dacă este prea mult pentru ora asta din zi.',
  'measure.intro.start': 'Începe măsurarea',
  'measure.intro.hint': 'Browserul îți va cere permisiunea de a folosi camera. Măsurarea pornește imediat ce o acorzi.',
  'measure.intro.privacy': 'Imaginea de la cameră este prelucrată pe acest dispozitiv și nu îl părăsește niciodată. Nu trimitem, nu salvăm și nu partajăm niciun cadru.',
  'measure.intro.honesty': 'Aceasta nu este un dispozitiv medical și nici o investigație. Aplicația arată o aproximare a luminii din jur; nu se pronunță asupra sănătății tale și nu înlocuiește discuția cu un medic.',

  'measure.live.aria': 'Măsurătoare în curs',
  'measure.badge.starting': 'Pornește',
  'measure.badge.paused': 'În pauză',
  'measure.badge.running': 'Se măsoară',
  'measure.stale': 'Aștept imaginea — previzualizarea îngheață cât timp aplicația este în fundal.',
  'measure.crop': 'Măsurăm centrul cadrului — cele {percent}\u00A0% marcate din lățimea și înălțimea imaginii.',
  'measure.facing.front': 'camera frontală',
  'measure.facing.back': 'camera din spate',

  'measure.boot.title': 'Pornesc camera…',
  'measure.boot.text': 'Dacă browserul cere permisiunea, acord-o — fără imagine nu avem ce măsura. Permisiunea privește numai această pagină și o poți retrage mai târziu.',
  'measure.boot.cancel': 'Anulează',

  'measure.hold': 'Citirile sunt înghețate. Camera merge mai departe, dar nimic nu ajunge în istoric și nici în medii.',
  'measure.gridHint': 'Alege o casetă ca să muți acea mărime pe cadranul mare.',

  'measure.stop': 'Oprește',
  'measure.pause': 'Pauză',
  'measure.resume': 'Reia',
  'measure.flip.aria': 'Comută camera',
  'measure.flip.toBack': 'Comută pe camera din spate',
  'measure.flip.toFront': 'Comută pe camera frontală',

  'measure.fail.aria': 'Eroare de cameră',
  'measure.fail.headline': 'Camera nu a pornit',
  'measure.fail.retry': 'Încearcă din nou',
  'measure.fail.back': 'Înapoi',
  'measure.fail.savedSession': 'Sesiunea de dinaintea întreruperii ({duration}) a fost salvată în istoric.',
  'measure.error.fallback': 'Camera nu a putut fi pornită.',

  'measure.summary.aria': 'Rezumatul sesiunii',
  'measure.summary.title': 'Rezumatul sesiunii',
  'measure.summary.paused': 'în pauză {duration}',
  'measure.summary.nothingMeasured': 'Nicio mărime nu a strâns vreo citire — camera nu a văzut lumină pe toată durata sesiunii.',
  'measure.summary.note': 'Mediile numără doar eșantioanele din afara pauzei. Mărimile care nu au fost măsurate sunt lăsate deoparte, nu socotite ca zero.',
  'measure.summary.nearThreshold': 'Cel mai aproape de prag',
  'measure.summary.worstPoint': 'Punctul cel mai slab',
  'measure.summary.averageZone': 'în medie {zone}',
  'measure.summary.tooShort': 'Sesiunea a durat {duration} — prea puțin ca să ajungă singură în istoric. O poți salva manual.',
  'measure.summary.again': 'Măsoară din nou',
  'measure.summary.save': 'Salvează în istoric',
  'measure.summary.saved': 'Salvată în istoric',
  'measure.summary.savedToast': 'Sesiune salvată în istoric.',
  'measure.summary.close': 'Închide',

  'measure.method.title': 'Cum măsurăm',
  'measure.method.p1': 'Aplicația ia eșantioane din imaginea camerei de zece ori pe secundă și calculează mărimile din cele {percent}\u00A0% centrale ale cadrului — reticulul din previzualizare marchează exact acea zonă.',
  'measure.method.p2': 'Camera unui telefon are trei canale largi, plus corecție automată proprie de expunere și de balans de alb. Vede proporțiile luminii, nu spectrul ei.',
  'measure.method.p3': 'Ponderea albastrului, luminozitatea, pâlpâirea și uniformitatea sunt ceea ce camera chiar măsoară. Temperatura de culoare și impactul circadian sunt aproximări declarate deschis, calculate din primarele sRGB.',
  'measure.method.p4': 'Pâlpâirea se vede numai sub patru herți. Pâlpâirea rețelei electrice, la 100 Hz, se află mult dincolo de raza acestei rate de eșantionare și nu va fi raportată niciodată ca citire.',
  'measure.method.p5': 'Niciunul dintre aceste numere nu este o măsurătoare fotometrică sau un rezultat medical. Imaginea de la cameră nu părăsește dispozitivul.',
  'measure.method.ok': 'Am înțeles',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'Pornirea camerei a fost anulată.',
  'measure.announce.stoppedNoSamples': 'Măsurătoare oprită. Nu s-a strâns niciun eșantion.',
  'measure.announce.stopped': 'Măsurătoare oprită. Rezumatul sesiunii este gata.',
  'measure.announce.interrupted': 'Măsurătoare întreruptă. Rezumatul sesiunii este gata.',
  'measure.announce.paused': 'Măsurătoare în pauză. Citirile sunt înghețate.',
  'measure.announce.resumed': 'Măsurătoare reluată.',
  'measure.announce.switchedFront': 'S-a comutat pe camera frontală. Începe o sesiune nouă.',
  'measure.announce.switchedBack': 'S-a comutat pe camera din spate. Începe o sesiune nouă.',
  'measure.announce.lead': 'Mărime principală: {metric}.',
  'measure.announce.cameraError': 'Eroare de cameră. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'Lumina s-a păstrat în intervalul sigur pe toată durata sesiunii — lasă lampa așa cum este și verifică din nou după lăsarea întunericului, când lucrează altă sursă.',
  'measure.advice.share.evening': 'Ponderea albastrului a fost în medie {value} — treci ecranele pe modul de noapte și stinge lumina din tavan, lăsând o singură lampă caldă la înălțimea biroului.',
  'measure.advice.share.day': 'Ponderea albastrului a fost în medie {value} — ziua este acceptabil, dar setează ecranul să treacă automat pe modul cald cu două ore înainte de culcare.',
  'measure.advice.brightness': 'Cadrul a fost supraexpus (în medie {value}) — depărtează-te de sursa de lumină sau scade luminozitatea ecranului pe care îl măsori, fiindcă la expunerea asta și celelalte mărimi pierd din precizie.',
  'measure.advice.kelvin.evening': 'Temperatura de culoare s-a menținut în medie la {value} — după lăsarea întunericului coboară sub 3000 K: treci lampa pe modul cald sau montează un bec de 2700 K.',
  'measure.advice.kelvin.day': 'Temperatura de culoare s-a menținut în medie la {value} — pentru zi este un alb bun, care ține treaz, dar seara pune aceeași lampă pe 2700 K.',
  'measure.advice.melanopic.evening': 'Impactul circadian a fost în medie {value} — în cele două ore dinainte de culcare coboară sub 0,50\u00A0×, atenuând lumina principală și luminând de la înălțimea biroului în loc de tavan.',
  'measure.advice.melanopic.day': 'Impactul circadian a fost în medie {value} — la ora asta doza aceasta ajută, dar seara schimbă sursa cu una mai slabă și mai caldă.',
  'measure.advice.flicker': 'Pâlpâirea a atins în medie {value} — de obicei este un variator sau o iluminare de fundal dată prea jos: ridică luminozitatea ecranului peste 40\u00A0% ori înlocuiește variatorul cu unul fără modulație PWM.',
  'measure.advice.uniformity': 'Lumina a căzut neuniform (în medie {value}) — așază lampa lateral față de birou și adaugă o a doua sursă, mai slabă, din partea opusă, în loc de un singur punct puternic.',
  'measure.advice.comfort': 'Confortul vizual a ieșit în medie {value} — începe cu o singură schimbare: înjumătățește luminozitatea sursei principale și abia apoi ocupă-te de culoarea luminii.',
  'measure.advice.default': 'Schimbă un singur lucru la iluminat și măsoară din nou — comparația a două sesiuni spune mai mult decât o citire singură.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'Istoric',
  'history.action.export': 'Exportă istoricul',

  'history.metricGroup.aria': 'Alegerea mărimii',
  'history.announce.metric': 'Mărime: {metric}',
  'history.rangeGroup.aria': 'Interval de timp',
  'history.range.aria': 'Ultimele {range}',

  'history.stats.title': 'Statistici pe interval',
  'history.stats.head': '{metric}\u00A0—\u00A0ultimele {range}',
  'history.stats.note': 'Calculate din ce arată graficul. Timpul fără măsurătoare nu intră la socoteală — nu punem zero în locul lui.',
  'history.stat.min': 'Minim',
  'history.stat.avg': 'Medie',
  'history.stat.max': 'Maxim',
  'history.trend.up': 'crește pe acest interval',
  'history.trend.flat': 'fără schimbare clară',
  'history.trend.down': 'scade pe acest interval',
  'history.trend.none': 'nu există cu ce compara',

  'history.sessions.title': 'Sesiuni de măsurare',
  'history.sessions.count': '{sessions}, de la cea mai nouă',
  'history.sessions.empty': 'Încă nicio sesiune',
  'history.sessions.hint': 'Sesiunea se salvează după ce oprești măsurarea.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'interval: {range}',
  'history.session.noMeasure': 'nimic măsurat',

  'history.data.title': 'Date',
  'history.data.subtitle': 'Istoricul este păstrat numai pe acest dispozitiv.',
  'history.export.csv': 'Exportă CSV',
  'history.export.json': 'Exportă JSON',
  'history.export.ok': 'Fișier pregătit pentru salvare',
  'history.export.fail': 'Fișierul nu a putut fi pregătit. În modul privat și într-o fereastră încorporată în altă aplicație, browserul blochează salvarea — deschide pagina într-o filă obișnuită.',
  'history.export.sheet.title': 'Exportul istoricului',
  'history.export.sheet.text': 'CSV se deschide într-un program de calcul tabelar (separator punct și virgulă, virgulă zecimală). JSON păstrează tot, inclusiv lista sesiunilor și golurile în care nu s-a măsurat nimic.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Golește istoricul',
  'history.clear.title': 'Golești istoricul?',
  'history.clear.text': 'Vom șterge {points} și {sessions}. Asta nu se poate anula — dacă vrei să păstrezi datele, exportă-le mai întâi.',
  'history.clear.confirm': 'Golește',
  'history.clear.announce': 'Istoric golit.',
  'history.clear.toast': 'Istoric golit',

  'history.empty.title': 'Încă nu este nimic de arătat',
  'history.empty.text': 'Istoricul se umple pe măsură ce măsori — un punct pe secundă. Totul rămâne pe acest dispozitiv.',
  'history.empty.action': 'Mergi la măsurare',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 min',
  'range.5m': '5 min',
  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 zile',
  'range.30d': '30 de zile',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Data și ora',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'Memoria dispozitivului este plină — măsurătorile noi nu mai sunt salvate.',
  'storage.blocked': 'Browserul nu lasă istoricul să fie salvat — datele vor dispărea după ce închizi fila.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Unelte',
  'tools.action.about': 'Despre măsurătoare',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Limbă',
  'tools.language.subtitle': 'Implicit, aplicația urmează limba dispozitivului; o alegere din această listă are efect imediat și rămâne în acest browser.',
  'tools.language.aria': 'Limba interfeței',
  'tools.language.system': 'Auto',
  'tools.language.announce': 'Limba interfeței: {language}.',

  'tools.appearance.title': 'Aspect',
  'tools.appearance.theme.title': 'Temă',
  'tools.appearance.theme.desc': '„Auto” urmează setarea sistemului.',
  'tools.appearance.theme.aria': 'Temă',
  'tools.theme.system': 'Auto',
  'tools.theme.light': 'Luminoasă',
  'tools.theme.dark': 'Întunecată',
  'tools.appearance.accent.title': 'Culoare de accent',
  'tools.appearance.accent.desc': 'Culoarea butoanelor, a selecțiilor și a glisoarelor.',
  'tools.appearance.accent.aria': 'Culoare de accent',
  'tools.appearance.textScale.title': 'Mărimea textului',
  'tools.appearance.textScale.desc': 'Mărește toată interfața, nu doar etichetele.',
  'tools.appearance.textScale.aria': 'Mărimea textului',
  'tools.appearance.density.title': 'Densitate',
  'tools.appearance.density.desc': 'Cea compactă încape mai mult conținut pe un ecran.',
  'tools.appearance.density.aria': 'Densitatea aranjării',
  'tools.density.comfortable': 'Obișnuită',
  'tools.density.compact': 'Compactă',
  'tools.appearance.motion.title': 'Mai puțină mișcare',
  'tools.appearance.motion.desc': 'Oprește animațiile și alunecarea lină a acului. Setarea sistemului este respectată oricum.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Ocean',
  'accent.violet': 'Violet',
  'accent.amber': 'Chihlimbar',
  'accent.mint': 'Mentă',
  'accent.rose': 'Trandafir',

  'tools.thresholds.title': 'Praguri',
  'tools.thresholds.subtitle': 'De la ce valoare să spună aplicația „moderat” și de la care „critic”. Pragurile implicite sunt propunerea noastră, nu o normă — potrivește-le după tine.',
  'tools.thresholds.warn': 'Prag de avertizare',
  'tools.thresholds.crit': 'Prag de alarmă',
  'tools.thresholds.warn.aria': 'Prag de avertizare — {metric}',
  'tools.thresholds.crit.aria': 'Prag de alarmă — {metric}',
  'tools.thresholds.reset': 'Implicite',
  'tools.thresholds.reset.aria': 'Restabilește pragurile implicite: {metric}',
  'tools.thresholds.moved': '{threshold} mutat la {value}.',
  'tools.thresholds.resetAll': 'Restabilește toate pragurile',
  'tools.thresholds.resetAll.title': 'Restabilești pragurile implicite?',
  'tools.thresholds.resetAll.text': 'Toate cele șapte mărimi revin la pragurile propuse de aplicație. Istoricul măsurătorilor rămâne neatins.',
  'tools.thresholds.resetAll.confirm': 'Restabilește',
  'tools.thresholds.resetAll.cancel': 'Lasă-le pe ale mele',
  'tools.thresholds.resetAll.toast': 'Pragurile au revenit la valorile implicite',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'peste {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} și sub',
  'tools.zoneRange.goodBelow': 'sub {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} și peste',

  'tools.calibration.title': 'Calibrare',
  'tools.calibration.subtitle': 'Pentru cine are cu ce compara.',
  'tools.calibration.intro': 'Două telefoane îndreptate spre aceeași lampă vor arăta numere puțin diferite — fiecare senzor are nuanța lui. Dacă ai la îndemână o măsurătoare în care ai încredere, poți urca sau coborî ușor de aici fiecare canal al imaginii. Multiplicatorii lucrează înainte să calculăm ceva, așa că schimbă toate cele șapte mărimi deodată.',
  'tools.calibration.neutral': 'Nu ai cu ce compara? Lasă 1,00 — aceasta este setarea din fabrică și nu strică nimic.',
  'tools.calibration.forward': 'Schimbarea are efect de acum înainte. Măsurătorile aflate deja în istoric rămân așa cum au fost în clipa salvării — nu le recalculăm, fiindcă asta ar rescrie datele după fapt.',
  'tools.calibration.reset': 'Resetează calibrarea',
  'tools.calibration.reset.toast': 'Calibrare resetată',
  'tools.calibration.channel.r': 'Canalul roșu',
  'tools.calibration.channel.g': 'Canalul verde',
  'tools.calibration.channel.b': 'Canalul albastru',
  'tools.calibration.channel.aria': '{channel} — multiplicator de calibrare',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'Măsurare',
  'tools.measurement.wake.title': 'Ține ecranul aprins',
  'tools.measurement.wake.desc': 'Ecranul rămâne aprins în timpul măsurării. Bateria scade atunci mai repede.',
  'tools.measurement.wake.unsupported': 'Acest browser nu ne lasă să ținem ecranul aprins.',
  'tools.measurement.haptics.title': 'Vibrație',
  'tools.measurement.haptics.desc': 'O confirmare scurtă la pornire, la oprire și la schimbarea mărimii.',
  'tools.measurement.haptics.unsupported': 'Acest dispozitiv nu raportează niciun motor de vibrație.',

  'tools.about.title': 'Despre măsurătoare',
  'tools.about.subtitle': 'Ce calculează exact fiecare dintre cele șapte mărimi și unde se termină onestitatea acestei metode.',
  'tools.about.scale': 'Scală: de la {min} la {max}.',
  'tools.about.threshold': 'Avertizăm de la {warn} și dăm alarma de la {crit}.',
  'tools.about.thresholdInvert': 'Avertizăm sub {warn} și dăm alarma sub {crit}.',
  'tools.about.limitsHead': 'Ce nu poate face această măsurătoare',
  'tools.about.limit.spectrum.title': 'Camera nu vede culoarea așa cum o vede un instrument',
  'tools.about.limit.spectrum.text': 'Camera unui telefon are trei canale: roșu, verde și albastru. Un instrument de măsurat lumina le desface în zeci de benzi înguste. Ce vezi aici este dedus din acele trei numere — într-un mod rezonabil, dar rămâne un calcul, nu un spectru măsurat.',
  'tools.about.limit.exposure.title': 'Camera își reglează singură luminozitatea',
  'tools.about.limit.exposure.text': 'Îndreaptă telefonul spre o fereastră și camera întunecă imaginea ca să nu o supraexpună. „Luminozitatea scenei” scade atunci, deși în încăpere nu s-a schimbat nimic. De aceea compară această valoare în interiorul aceluiași cadru, nu între încăperi.',
  'tools.about.limit.flicker.title': 'O cameră lentă nu prinde pâlpâirea rapidă',
  'tools.about.limit.flicker.text': 'Verificăm imaginea de {hz} ori pe secundă. O pulsație mai rapidă de {nyquist} ori pe secundă poate apărea într-o astfel de măsurătoare mai lentă decât este în realitate sau poate dispărea cu totul — iar pâlpâirea rețelei electrice este exact atât de rapidă. Dacă aplicația prinde ceva, ia-o ca pe un semn că „aici pulsează ceva”, nu ca pe o frecvență măsurată.',
  'tools.about.limit.medical.title': 'Aceasta nu este nici un examen medical, nici un sfat medical',
  'tools.about.limit.medical.text': 'Aplicația te ajută să observi că lumina din jur este rece, puternică sau neliniștită și îți sugerează ce se poate face. Nu se pronunță asupra sănătății tale și nu înlocuiește discuția cu un medic și nici măsurarea cu un aparat profesional.',
  'tools.about.privacy': 'Totul se calculează pe dispozitivul tău. Imaginea de la cameră nu este trimisă și nu este salvată nicăieri — în memorie ajung numai numerele calculate.',
  'tools.about.privacyPolicy': 'Politica de confidențialitate completă',

  'tools.data.title': 'Date',
  'tools.data.subtitle': 'Totul stă în memoria acestui browser și nu pleacă nicăieri de aici.',
  'tools.data.summary.empty': 'Încă nu există măsurători salvate.',
  'tools.data.summary': 'În memorie: {points} și {sessions}.',
  'tools.data.export.csv': 'Exportă CSV',
  'tools.data.export.json': 'Exportă JSON',
  'tools.data.clear': 'Golește istoricul',
  'tools.data.reset': 'Setări implicite',
  'tools.data.reset.title': 'Restabilești setările implicite?',
  'tools.data.reset.text': 'Aspectul, pragurile, calibrarea și setările de măsurare revin la starea inițială. Istoricul măsurătorilor rămâne neatins.',
  'tools.data.reset.confirm': 'Restabilește',
  'tools.data.reset.toast': 'Setările implicite au fost restabilite',
  'tools.data.wipe': 'Șterge toate datele',
  'tools.data.wipe.title': 'Ștergi toate datele aplicației?',
  'tools.data.wipe.text': 'Vor dispărea: tot istoricul măsurătorilor și lista sesiunilor, pragurile și calibrarea ta, precum și setările de aspect. Aplicația va reveni la starea de la prima pornire.',
  'tools.data.wipe.note': 'Nu avem nicio copie a acestor date — nu au părăsit niciodată acest dispozitiv, așa că nu există de unde să fie aduse înapoi.',
  'tools.data.wipe.check': 'Înțeleg că asta nu se poate anula',
  'tools.data.wipe.confirm': 'Șterge tot',
  'tools.data.wipe.toast': 'Toate datele aplicației au fost șterse',
  'tools.data.wipe.announce': 'Toate datele aplicației au fost șterse. Setările au revenit la valorile implicite.',
  'tools.data.storage.blocked': 'Acest browser nu lasă nimic să fie salvat permanent (mod privat sau date de site blocate). Tot ce setezi aici va dispărea după ce închizi fila.',
  'tools.data.storage.full': 'Memoria browserului s-a umplut și măsurătorile noi nu mai sunt salvate. Golirea istoricului va elibera spațiu.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Sprijin',
  'support.free.title': 'Totul este disponibil',
  'support.free.lead': 'Toate cele șapte mărimi, istoricul complet, pragurile, calibrarea și exportul funcționează de la prima pornire — fără cont, fără limite și fără plată.',
  'support.free.note': 'Măsurătoarea se calculează în întregime pe acest dispozitiv și merge fără rețea. Nu există aici o versiune mai bună ținută după un zid.',
  'support.why.title': 'De ce te rog',
  'support.why.lead': 'Monitor de Lumină se face după program, fără reclame, fără sponsor și fără vreo firmă în spate. Sprijinul plătește timpul pentru corecturi, pentru mărimi noi și pentru păstrarea în viață a ceea ce funcționează deja.',
  'support.what.title': 'Ce îți aduce o donație',
  'support.what.lead': 'Nimic. O donație nu deblochează nimic — nicio funcție în plus, nicio insignă lângă nume, nicio prioritate. Tot ce poate aplicația ai deja.',
  'support.what.note': 'Rămâne doar atât: că știu că i-a folosit cuiva. Chiar este un motiv destul de bun.',
  'support.cta.title': 'Dacă vrei să ajuți',
  'support.cta.button': 'Cumpără-mi o cafea',
  'support.cta.nolink': 'Profilul de donații nu este încă legat. Când va fi, în locul acesta va sta un buton.',
  'support.cta.privacy': 'Acest link deschide pagina externă Buy Me a Coffee într-o filă nouă. Este singurul moment în care ceva părăsește acest dispozitiv — măsurătoarea în sine rămâne mereu aici.',
  'support.cta.privacyFuture': 'Când adresa va fi la locul ei, butonul va deschide pagina externă Buy Me a Coffee într-o filă nouă. Va fi singurul moment în care ceva părăsește acest dispozitiv — măsurătoarea în sine rămâne mereu aici.',
  'support.cta.note': 'Nu există aici nicio numărătoare inversă, niciun memento și nicio fereastră care se deschide singură. Rugămintea aceasta așteaptă numai în această filă.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'ultimul minut',
  'gauge.aria': '{metric}: {value}, zonă: {zone}',
  'gauge.aria.note': '{metric}: {value}, zonă: {zone}, {note}',
  'gauge.aria.initial': '{metric}: fără date',
  'gauge.value.none': 'fără date',
  /* Odczyt słowny z jednostką: „27 la sută”, „1,20 ori”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'valoare aproximativă',
  'gauge.note.offScale': 'în afara scalei',
  'gauge.metric.unknown': 'Mărime necunoscută',

  'chart.aria.label': 'Graficul istoricului măsurătorilor',
  'chart.hint': 'Grafic interactiv. Săgețile stânga și dreapta mută cursorul de citire, Home și End sar la începutul și la sfârșitul intervalului, Escape ascunde cursorul.',
  'chart.empty.title': 'Fără date',
  'chart.empty.text': 'Pornește măsurarea — graficul apare după primele citiri.',
  'chart.few.title': 'Prea puține date',
  'chart.few.text': 'Avem o singură citire: {value}. Pentru o linie este nevoie de două.',
  'chart.legend.line': 'măsurătoare',
  'chart.legend.gap': 'pauză în măsurare',
  'chart.aria.head': 'Grafic: {metric}, interval {range}',
  'chart.aria.empty': 'Fără date pe acest interval.',
  'chart.aria.one': 'O singură citire: {value}.',
  'chart.aria.summary': 'De la {min} la {max}, medie {avg}, {points}.',
  'chart.aria.gaps': 'Seria are goluri — atunci nu măsuram.',
  'chart.readout.empty': 'Fără date pe acest interval.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'Prea puține date pentru a desena un grafic.',
  'chart.readout.hint': 'Trage de-a lungul graficului sau folosește săgețile ca să citești o singură măsurătoare.',
  'chart.time.now': 'acum',
  'chart.time.justNow': 'chiar acum',
  'chart.time.ago': 'acum {duration}',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} \u00B7 {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — najdłuższy rumuński skrót miesiąca to
     „sept.”. */
  'chart.sample.ago': '\u221230\u00A0min',
  'chart.sample.clock': '00:00',
  'chart.sample.date': '30\u00A0sept.',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'Ponderea albastrului',
  'metric.share.short': 'Cât din lumina văzută revine canalului albastru.',
  'metric.share.help': 'Separă culoarea de luminozitate — aceasta este valoarea care se mișcă atunci când pornești modul de noapte.',
  'metric.brightness.name': 'Luminozitatea scenei',
  'metric.brightness.short': 'Luminozitatea medie a imaginii de la cameră.',
  'metric.brightness.help': 'O valoare relativă, nu lucși — expunerea automată a camerei o deplasează pe dedesubt.',
  'metric.kelvin.name': 'Temperatura de culoare',
  'metric.kelvin.short': 'Dacă lumina este caldă sau rece.',
  'metric.kelvin.help': 'Sub 3000 K lumina este caldă și mai blândă seara. 6500 K este albul implicit al majorității ecranelor.',
  'metric.melanopic.name': 'Impact circadian',
  'metric.melanopic.short': 'Cât de puternic acționează această lumină asupra ceasului biologic.',
  'metric.melanopic.help': 'O aproximare a raportului melanopic. 1,00 este albul neutru al zilei; seara merită să cobori sub 0,50.',
  'metric.flicker.name': 'Pâlpâire',
  'metric.flicker.short': 'Pulsația invizibilă a sursei de lumină.',
  'metric.flicker.help': 'Variatoarele ieftine și iluminarea de fundal pulsează. Ochiul nu o vede, dar este semnalat drept o posibilă cauză de oboseală și de dureri de cap.',
  'metric.uniformity.name': 'Uniformitate',
  'metric.uniformity.short': 'Dacă lumina se împrăștie uniform în cadru.',
  'metric.uniformity.help': 'O valoare mică pe un ecran înseamnă scurgeri ale iluminării de fundal sau o reflexie; pe birou — o lampă prost așezată.',
  'metric.comfort.name': 'Confort vizual',
  'metric.comfort.short': 'O singură notă în locul a șase numere.',
  'metric.comfort.help': 'Adună celelalte măsurători într-o notă de la 0 la 100 și arată ce o coboară cel mai mult. Ponderile sunt aprecierea noastră redacțională, nu o normă.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'bun',
  'zone.warn': 'moderat',
  'zone.crit': 'critic',
  'zone.none': 'fără date',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 aug.'). */
  'date.month.short.1': 'ian.',
  'date.month.short.2': 'feb.',
  'date.month.short.3': 'mar.',
  'date.month.short.4': 'apr.',
  'date.month.short.5': 'mai',
  'date.month.short.6': 'iun.',
  'date.month.short.7': 'iul.',
  'date.month.short.8': 'aug.',
  'date.month.short.9': 'sept.',
  'date.month.short.10': 'oct.',
  'date.month.short.11': 'nov.',
  'date.month.short.12': 'dec.',

  'date.clock': '{hours}:{minutes}',
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0{year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0h',
  'time.duration.hourMinute': '{hours}\u00A0h {minutes}\u00A0min',
  'time.duration.hour': '{hours}\u00A0h',
  'time.duration.minuteSecond': '{minutes}\u00A0min {seconds}\u00A0s',
  'time.duration.minute': '{minutes}\u00A0min',
  'time.duration.second': '{seconds}\u00A0s',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „chiar acum”. */
  'time.justNow': 'chiar acum',
  'time.aMinuteAgo': 'acum un minut',
  'time.minutesAgo': 'acum {minutes}\u00A0min',
  'time.hoursAgo': 'acum {hours}\u00A0h',
  'time.yesterday': 'ieri',
  'time.daysAgo': 'acum {days}\u00A0zile',

  /* Formy zależne od liczby. Rumuński ma w CLDR trzy: `one`, `few` i `other`.
     Rozstrzyga je Intl.PluralRules dla języka aktywnego. Rumuńskie `other`
     (od 20 w górę) wymaga przyimka „de” przed rzeczownikiem — stąd
     „20 de sesiuni” obok „2 sesiuni” — i dlatego nie jest równe `few`. */
  'time.days.plural': { one: 'zi', few: 'zile', other: 'de zile' },
  'unit.sample.plural': { one: 'eșantion', few: 'eșantioane', other: 'de eșantioane' },
  'unit.measurement.plural': { one: 'măsurătoare', few: 'măsurători', other: 'de măsurători' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Rumuński ma jedną — oba klucze zostają (kształt słownika jest wspólny dla
     wszystkich języków), a wartości są tu identyczne. */
  'unit.session.plural': { one: 'sesiune', few: 'sesiuni', other: 'de sesiuni' },
  'unit.session.accusative.plural': { one: 'sesiune', few: 'sesiuni', other: 'de sesiuni' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy, choć po rumuńsku brzmią tak samo — w innych językach już nie. */
  'unit.chartPoint.plural': { one: 'punct', few: 'puncte', other: 'de puncte' },
  'unit.point.plural': { one: 'punct', few: 'puncte', other: 'de puncte' },
  'unit.kelvin.plural': { one: 'kelvin', few: 'kelvini', other: 'de kelvini' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „la sută”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'la sută',
  'unit.spoken.times': 'ori',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, bez rady,
     co zrobić dalej. Każdy kod ma tu jedno zdanie diagnozy i jedno zdanie
     rady. */
  'camera.error.denied': 'Permisiunea de a folosi camera nu a fost acordată. Permite camera pentru această pagină din setările browserului sau ale sistemului și încearcă din nou.',
  'camera.error.notfound': 'Nu a fost găsită nicio cameră. Verifică dacă dispozitivul are una și dacă nu este dezactivată în sistem.',
  'camera.error.inuse': 'Camera este ocupată de altă aplicație. Închide acea aplicație sau filă și încearcă din nou.',
  'camera.error.insecure': 'Camera funcționează numai prin HTTPS sau pe localhost. Deschide această pagină la o adresă care începe cu „https://”.',
  'camera.error.unsupported': 'Acest browser nu oferă camera aici. Încearcă în Chrome sau în Safari, într-o fereastră obișnuită — nu într-o previzualizare încorporată în altă aplicație.',
  'camera.error.unknown': 'Camera nu a putut fi pornită.'
};
