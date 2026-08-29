/* docs/v1/i18n/ro.js — słownik WŁASNY wersji v1, rumuński.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka. Kolejność jest treścią umowy: plik wersji dokłada się do tego samego
 * obiektu i może nadpisać dowolny klucz wspólny — nigdy odwrotnie.
 *
 * DLACZEGO TEN SŁOWNIK JEST SAMOWYSTARCZALNY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar w app.js, własne
 * dwie wielkości zamiast siedmiu i własne nazwy stref („Sigură” zamiast
 * wspólnego „În limite”). Dlatego wszystko, co v1 pokazuje, stoi TUTAJ —
 * także klucze, które przypadkiem brzmią tak samo jak wspólne. Gdyby kiedyś
 * warstwa wspólna zmieniła brzmienie stref albo nazwę aplikacji, v1 ma zostać
 * nietknięta.
 *
 * SKĄD TE ZDANIA: przełożono je z pl.js (treść) i z en.js (terminologia oraz
 * rejestr), zdanie po zdaniu, bez skracania i bez dopisywania. Zachowane
 * zostało to, co niesie znaczenie: liczby, progi, jednostki, nazwy wstawek
 * i — co do treści — zastrzeżenia medyczne oraz akapity o prywatności. Tych
 * ostatnich nie wolno osłabiać ani wzmacniać.
 *
 * REJESTR: bezpośrednie „tu”, tak jak w docs/v5/js/i18n/locales/ro.js —
 * „dumneavoastră” brzmiałoby jak pismo z urzędu.
 * TYPOGRAFIA za docs/shared/i18n/ro.js i za v5: diakrytyki z przecinkiem pod
 * spodem (ș, ț), nie z cedyllą; przecinek dziesiętny; cudzysłowy „ … ” takie
 * same jak polskie; przed znakiem % stoi spacja nierozdzielająca (U+00A0), tak
 * jak w docs/v5/js/i18n/locales/ro.js.
 *
 * TERMINOLOGIA ZE SŁOWNIKA WSPÓLNEGO: „ponderea albastrului”, „luminozitatea
 * scenei”, „temperatura de culoare”, „citire” (odczyt), „prag” (próg),
 * „măsurătoare” (pomiar), „mărime” (wielkość), „istoric” (historia), „cadru”
 * (kadr). Nazwy pięciu wielkości, których v1 nie mierzy, NIE zostały stąd
 * przeniesione.
 * STREFY: „Sigură / Moderată / Dăunătoare” — te same słowa co w v5, ale
 * w rodzaju żeńskim, bo w v1 stoją jako przydawka do „zonă” (jak polskie
 * „strefa bezpieczna”).
 *
 * MARKUP W WARTOŚCIACH. Część kluczy (rozdziały Dokumentacji) zawiera znaczniki
 * <b>, <i>, <code> i encje HTML. Wstawiane są przez data-i18n-html, czyli tylko
 * tam, gdzie autor tekstu świadomie tego chciał — nigdy do treści pochodzącej
 * od użytkownika.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ro'] = Object.assign(window.I18nData['ro'] || {}, {

  /* ---- aplikacja ---- */

  'app.name': 'Monitor de Lumină Dăunătoare',
  'app.description': 'Măsoară cu camera intensitatea culorii albastre de pe ecran și o arată pe un grafic clar, cu zone: sigură, moderată, dăunătoare.',

  /* ---- wybór języka ---- */

  'language.label': 'Limbă',
  'language.help': 'Limba întregii aplicații. Toate limbile sunt deja pe acest dispozitiv — nu se descarcă nimic și nu se trimite nimic nicăieri.',
  'language.auto': 'Limba dispozitivului',

  /* ---- nawigacja ---- */

  'nav.aria': 'Meniu principal',
  'nav.tabsAria': 'Vizualizările aplicației',
  'nav.announce': 'Ecran: {screen}',
  'nav.camera': 'Cameră',
  'nav.monitoring': 'Monitorizare',
  'nav.support': 'Sprijin',
  'nav.more': 'Mai multe',
  'nav.docs': 'Documentație',
  'nav.about': 'Despre și contact',
  'nav.settings': 'Praguri de avertizare',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← Înapoi',
  'action.back.aria': 'Înapoi la ecranul anterior',
  'action.openDocs': 'Mergi la documentație',
  'action.exportCsv': 'Exportă CSV',
  'action.delete': 'Șterge',
  'action.closeNotification': 'Închide notificarea',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref: przymiotnik odmieniony do rodzaju żeńskiego
     („zonă sigură”), a nie wspólne „În limite”. Wersja plakatowa (zone.badge.*)
     jest osobnym kluczem, a nie zapisem wielkimi literami przez CSS: tureckie
     „i” i greckie akcenty nie znoszą automatycznej zamiany. */

  'zone.good': 'Sigură',
  'zone.warning': 'Moderată',
  'zone.critical': 'Dăunătoare',
  'zone.none': 'Fără date',

  'zone.badge.good': 'SIGURĂ',
  'zone.badge.warning': 'MODERATĂ',
  'zone.badge.critical': 'DĂUNĂTOARE',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'Luminozitatea canalului B',
  'metric.raw.unitLabel': '% din luminozitatea canalului B',
  'metric.share.name': 'Ponderea albastrului',
  'metric.share.longName': 'Ponderea albastrului în lumină',
  'metric.share.unitLabel': '% pondere a albastrului',
  'stat.overallBrightness': 'Luminozitatea generală a scenei',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': 'Previzualizarea camerei',
  'camera.pressStart': 'Apasă „Start”.',
  'camera.start': 'Start',
  'camera.stop': 'Stop',
  'camera.switch': 'Schimbă camera',
  'camera.error': 'Camera nu a putut fi pornită. Verifică permisiunea browserului pentru cameră și încearcă din nou. ({message})',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': 'Citiri curente',
  'disclaimer.short': 'Rezultat orientativ. Acesta nu este un dispozitiv medical.',
  'disclaimer.more': 'Mai mult',

  /* ---- wykresy ---- */

  'chart.aria': 'Grafice în timp',
  'chart.title': 'Grafice în timp (ultimele {seconds} s)',
  'chart.empty': 'Pornește camera ca să vezi graficul',
  'chart.axis.past': '-{seconds}s',
  'chart.axis.now': 'acum',
  'chart.raw.aria': 'Graficul luminozității canalului B în timp, cu zonele sigură, moderată și dăunătoare marcate',
  'chart.share.aria': 'Graficul ponderii albastrului în lumină în timp, cu zonele sigură, moderată și dăunătoare marcate',

  /* ---- tabela odczytów ---- */

  'table.show': 'Arată ca tabel',
  'table.hide': 'Ascunde tabelul',
  'table.caption': 'Ultimele citiri (cea mai nouă sus)',
  'table.col.time': 'Ora',
  'table.col.zone': 'Zonă',

  /* ---- ustawienia progów ---- */

  'settings.title': 'Setările pragurilor zonelor',
  'settings.boundary.critical': 'Limita galben / roșu:',
  'settings.boundary.warning': 'Limita verde / galben:',

  /* ---- historia i raport (features.js) ---- */

  'history.title': 'Istoric și raport',
  'history.rangeAria': 'Intervalul istoricului',
  'history.unavailable': 'Datele din istoric sunt momentan indisponibile.',
  'history.empty': 'Nicio citire salvată în acest interval. Pornește măsurarea — istoricul se adună singur.',
  'history.savedReadings': 'Citiri salvate: {count}. Împărțirea timpului pe zone:',
  'history.zoneLine': '{zone}: {percent} % ({readings})',

  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 zile',
  'range.30d': '30 de zile',

  'report.dailyTitle': 'Raport zilnic',
  'report.empty': 'Raportul va apărea când vor exista citiri salvate în intervalul ales.',
  'report.dailyCaption': 'Ponderea timpului în fiecare zonă, zi de zi',
  'report.col.day': 'Zi',
  'report.col.week': 'Săptămână',
  'report.col.readings': 'Citiri',
  'report.compare.day': 'Comparație de la o zi la alta: {day} — {percent} % din timp în zona dăunătoare, {change}',
  'report.compare.dayPending': 'Comparația de la o zi la alta va apărea după a doua zi de măsurători.',
  'report.compare.week': 'Comparație de la o săptămână la alta: {week} — {percent} % din timp în zona dăunătoare, {change}',
  'report.compare.weekPending': 'Comparația de la o săptămână la alta va apărea după a doua săptămână de măsurători.',
  'report.change.same': 'la fel ca {other}.',
  'report.change.more': 'cu {points} mai mult decât {other}.',
  'report.change.less': 'cu {points} mai puțin decât {other}.',
  'report.peak': 'Cele mai multe citiri în zona dăunătoare au fost între {from} și {to}.',
  'report.peak.none': 'În acest interval nu s-a salvat nicio citire în zona dăunătoare.',
  'report.weeklyTitle': 'Raport săptămânal',
  'report.weeklyEmpty': 'Raportul săptămânal va apărea când vor exista citiri salvate în intervalul ales.',
  'report.weeklyCaption': 'Ponderea timpului în fiecare zonă, săptămână de săptămână',
  'report.weekLabel': 'Săptămâna {week} ({year})',
  'report.footnote': 'Cifrele sunt ponderea citirilor salvate în intervalul ales, nu timpul exact de expunere.',

  /* ---- profile progów ---- */

  'profiles.title': 'Profiluri de praguri',
  'profiles.empty': 'Nu ai salvat încă niciun profil.',
  'profiles.itemActive': '{name} (activ)',
  'profiles.applyAria': 'Aplică profilul {name}',
  'profiles.deleteAria': 'Șterge profilul {name}',
  'profiles.applied': 'S-a aplicat profilul „{name}”.',
  'profiles.deleted': 'S-a șters profilul „{name}”.',
  'profiles.saved': 'S-a salvat profilul „{name}”.',
  'profiles.namePlaceholder': 'Numele profilului (de exemplu Seara)',
  'profiles.saveLabel': 'Salvează pragurile curente ca profil',
  'profiles.saveBtn': 'Salvează profilul',
  'profiles.needName': 'Introdu un nume de profil.',
  'profiles.limit': {
    one: 'Poți salva cel mult {n} profil. Șterge unul ca să adaugi altul.',
    few: 'Poți salva cel mult {n} profiluri. Șterge unul ca să adaugi altul.',
    other: 'Poți salva cel mult {n} de profiluri. Șterge unul ca să adaugi altul.'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku też — ale musi
     zostać bezpieczna dla systemu plików: bez ukośników i dwukropków. */

  'csv.header': 'ora;luminozitate_B_proc;pondere_albastru_proc;luminozitate_scena_proc;zona',
  'csv.filename': 'monitor-lumina-{stamp}.csv',
  'csv.empty': 'Nu există citiri de exportat. Pornește măsurarea și încearcă din nou.',
  'csv.done': 'S-au exportat {readings} într-un fișier CSV.',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut: po rumuńsku od dwudziestu wzwyż wchodzi
     przyimek „de” („de 20 de minute”), a w każdym z trzydziestu języków może
     wypaść to inaczej. */

  'alert.exposure': {
    one: 'Alertă de prag: de {n} minut citirea se află în zona dăunătoare. Ia în calcul o pauză sau reducerea ponderii albastrului de pe ecran.',
    few: 'Alertă de prag: de {n} minute citirea se află în zona dăunătoare. Ia în calcul o pauză sau reducerea ponderii albastrului de pe ecran.',
    other: 'Alertă de prag: de {n} de minute citirea se află în zona dăunătoare. Ia în calcul o pauză sau reducerea ponderii albastrului de pe ecran.'
  },

  'session.title': 'Rezumatul ultimei sesiuni',
  'session.line': 'Timp de măsurare: {duration}. Citiri salvate: {count}.',
  'session.zoneLine': '{zone}: {percent} % din sesiune.',
  'session.endedAt': 'Rezumatul se referă la sesiunea încheiată la {time}.',
  'session.toast': 'Sesiune încheiată: {duration}, {readings}, {percent} % din timp în zona dăunătoare.',

  'duration.seconds': '{n} s',
  'duration.minutesSeconds': '{minutes} min {seconds} s',

  /* ---- liczebniki ----
     Rumuński ma trzy kategorie CLDR: one (1), few (0, 2–19 oraz liczby, których
     dwie ostatnie cyfry mieszczą się w 01–19) i other — reszta, czyli liczby
     wymagające przyimka „de”: „20 de citiri”. Formę wybiera
     Intl.PluralRules('ro'), nie nasza reguła. */

  'count.readings': { one: '{n} citire', few: '{n} citiri', other: '{n} de citiri' },
  'count.points': {
    one: '{n} punct procentual',
    few: '{n} puncte procentuale',
    other: '{n} de puncte procentuale'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': 'Mai multe',
  'more.section.settings': 'SETĂRI',
  'more.section.help': 'AJUTOR',
  'more.thresholds.title': 'Praguri de avertizare',
  'more.thresholds.sub': 'Stabilește limitele zonelor sigură, moderată și dăunătoare.',
  'more.docs.title': 'Documentație',
  'more.docs.sub': 'Cum funcționează măsurarea, unități, standarde și zone.',
  'more.about.title': 'Despre și contact',
  'more.about.sub': 'Versiune, confidențialitate și contact.',
  'more.free': 'Aplicația este gratuită în întregime.',
  'more.supportLink': 'O poți sprijini în mod voluntar.',
  'more.version': 'Versiunea {version} · Toate funcțiile sunt disponibile fără cont și fără plată',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': 'Despre și contact',
  'about.version': 'Versiunea {version}',
  'about.what.title': 'Ce este această aplicație',
  'about.what.p1': '{app} măsoară cu camera telefonului câtă lumină albastră înregistrează senzorul și arată asta pe două cadrane și pe grafice cu zone. Toate funcțiile — măsurarea, istoricul, rapoartele, profilurile de praguri, alerta de prag, exportul CSV și documentația — sunt disponibile pentru oricine, fără cont și fără plată.',
  'about.what.p2': 'Aplicația este pusă la dispoziție „ca atare”, pentru uz informativ. Rezultatul măsurătorii are caracter orientativ și nu este o bază pentru decizii privind sănătatea.',
  'about.privacy.title': 'Confidențialitate și date',
  'about.privacy.p1': 'Imaginea de la cameră este analizată exclusiv pe dispozitivul tău și nu este trimisă niciodată către vreun server. Nu creăm conturi și nu colectăm datele tale. Setările pragurilor, profilurile și istoricul măsurătorilor sunt salvate numai în memoria acestui dispozitiv și a acestui browser.',
  'about.privacy.p2': 'Aplicația nu afișează reclame și nu vorbește cu rețeaua. Singura excepție este butonul de pe ecranul „Sprijin”: când îl apeși, browserul deschide o pagină externă într-o filă nouă. Nu se întâmplă nimic până nu faci tu asta.',
  'about.contact.title': 'Contact',
  'about.contact.p1': 'Observații, erori și propuneri: [E-MAIL]. Răspundem ori de câte ori putem — acesta este un proiect întreținut după program.',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': 'Sprijin',
  'support.free.title': 'Totul este disponibil',
  'support.free.text': 'Toată aplicația este gratuită: măsurarea, istoricul și rapoartele, profilurile de praguri, alerta, exportul CSV și documentația. Totul funcționează de la bun început, fără cont, fără limite și fără internet.',
  'support.why': '{app} se face după program. Dacă îți este de folos, poți să-mi cumperi o cafea. Asta ajută la menținerea aplicației și la dezvoltarea ei mai departe — la îmbunătățirea măsurării, la scrierea documentației și la verificarea ei pe și mai multe telefoane.',
  'support.nothing': 'O donație nu deblochează nimic. Nu există o versiune mai bună și una mai slabă — după ce sprijini aplicația, ea funcționează exact la fel. Singura diferență este că autorul știe că i-a folosit cuiva.',
  'support.button': 'Cumpără-mi o cafea',
  'support.button.aria': 'Cumpără-mi o cafea — deschide profilul de donații într-o filă nouă',
  'support.pending': 'Profilul de donații nu este încă legat. Imediat ce va apărea, în locul acesta va sta butonul. Până atunci nu trebuie făcut nimic — aplicația este oricum gratuită în întregime.',
  'support.privacy': 'Butonul deschide o pagină externă (de exemplu Buy Me a Coffee) într-o filă nouă a browserului. Acesta este singurul moment în care ceva părăsește acest dispozitiv. Imaginea de la cameră și toate măsurătorile tale rămân aici — nu sunt trimise nicăieri, nici înainte de apăsare, nici după.',
  'support.privacyPending': 'Când adresa va apărea, apăsarea butonului va deschide o pagină externă (de exemplu Buy Me a Coffee) într-o filă nouă a browserului. Acela va fi singurul moment în care ceva părăsește acest dispozitiv. Imaginea de la cameră și toate măsurătorile tale rămân aici — nu sunt trimise nicăieri.',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': 'Documentație',

  'disclaimer.title': 'Acesta nu este un dispozitiv medical',
  'disclaimer.body.docs': 'Această aplicație nu este un dispozitiv medical. Nu servește la diagnosticarea, tratarea sau prevenirea vreunei boli. Rezultatele măsurării cu camera unui telefon au caracter orientativ și nu înlocuiesc o examinare sau sfatul unui medic. În chestiuni privind sănătatea ochilor, consultă un medic sau un optometrist. Pragurile zonelor din această aplicație nu reproduc niciun standard de siguranță — detalii în capitolul 3.',
  'disclaimer.body.about': 'Această aplicație nu este un dispozitiv medical. Nu servește la diagnosticarea, tratarea sau prevenirea vreunei boli. Rezultatele măsurării cu camera unui telefon au caracter orientativ și nu înlocuiesc o examinare sau sfatul unui medic. În chestiuni privind sănătatea ochilor, consultă un medic sau un optometrist. Pragurile zonelor din această aplicație nu reproduc niciun standard de siguranță — detalii în documentație, capitolul 3.',

  'doc.toc.aria': 'Cuprinsul documentației',
  'doc.toc.title': 'Cuprins',

  'doc.ch1.title': 'Pornire rapidă',
  'doc.ch2.title': 'Cum funcționează măsurarea',
  'doc.ch3.title': 'Unități și standarde',
  'doc.ch4.title': 'Zone și praguri',
  'doc.ch5.title': 'Diferențe între dispozitive',

  'doc.ch1.heading': '1. Pornire rapidă',
  'doc.ch2.heading': '2. Cum funcționează măsurarea',
  'doc.ch3.heading': '3. Unități și standarde',
  'doc.ch4.heading': '4. Zone și praguri',
  'doc.ch5.heading': '5. Diferențe între dispozitive',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': 'Cum să măsori mai exact',
  'doc.ch1.tips.li1': 'Pe ecranul „Cameră” (primul buton de pe bara de jos) apasă „Start” și îndreaptă camera din spate spre ecranul sau sursa de lumină pe care vrei să o verifici.',
  'doc.ch1.tips.li2': 'Treci pe ecranul „Monitorizare” (al doilea buton de pe bara de jos) — sus vezi ambele cadrane deodată, iar mai jos (derulează) graficele schimbărilor în timp. Măsurarea merge în fundal indiferent de ecranul pe care îl privești.',
  'doc.ch1.tips.li3': 'Ține telefonul la o distanță constantă de ecran (de exemplu 15–20 cm), fără să schimbi iluminatul din jur în timpul măsurării.',
  'doc.ch1.tips.li4': 'Folosește camera din spate — are corecții automate mai puțin agresive decât cea din față.',
  'doc.ch1.tips.li5': 'Tratează rezultatele ca indicatori relativi (%), nu ca unități fizice absolute — compară-le între ele (de exemplu modul de noapte pornit sau oprit).',
  'doc.ch1.tips.li6': 'Potrivește pragurile zonelor din setări la luminozitatea propriului ecran (capitolul 4).',

  'doc.ch1.fonts.title': 'Litere mari și cadrane — întotdeauna',
  'doc.ch1.fonts.p1': 'Toată aplicația folosește litere mari, lizibile, și cadrane de dimensiune întreagă, astfel încât persoanele care văd slab (și toți ceilalți) să poată citi datele fără setări suplimentare. Pe ecranul „Monitorizare” ambele cadrane încap împreună pe un singur ecran, fără derulare — graficele schimbărilor în timp sunt chiar dedesubt, la o derulare distanță.',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': 'Camera unui telefon față de un spectrometru',
  'doc.ch2.spectro.p1.html': 'O măsurare adevărată a „cât de multă lumină albastră dăunătoare există” cere descompunerea luminii pe lungimi de undă — asta face un <b>spectrometru</b>: o prismă sau o rețea de difracție desface lumina în zeci sau sute de benzi înguste (de exemplu din 1–5 nm) și măsoară puterea optică în fiecare dintre ele separat. Abia dintr-o astfel de distribuție spectrală completă se calculează unități precum luxul, lumenul sau iradianța ponderată cu funcția de risc al luminii albastre.',
  'doc.ch2.spectro.p2.html': '<b>Camera unui telefon nu face nimic din toate acestea.</b> Are trei filtre largi (Bayer: R/G/B), fiecare adunând lumină dintr-un domeniu larg de lungimi de undă, care se suprapun — „canalul albastru” nu este o bandă îngustă în jur de 435–440 nm (vârful riscului pentru retină), ci aproximativ 400–570 nm amestecate cu verdele. Pe drum se mai adaugă demozaicarea, expunerea automată, balansul de alb automat și compresia gama sRGB — niciunul dintre acești pași nu poate fi oprit complet din browser. În consecință, valoarea pixelului pe care o vede JavaScript nu este legată liniar de puterea optică reală care cade pe senzor. Aceasta este o limitare fundamentală a echipamentului, nu o eroare a acestei aplicații.',

  'doc.ch2.raw.title': 'Graficul 1 — Luminozitatea canalului B',
  'doc.ch2.raw.what.html': '<b>Ce arată:</b> luminozitatea medie a canalului albastru (B) singur, din fragmentul eșantionat al imaginii, pe o scală 0–255 transformată în %.',
  'doc.ch2.raw.algo.html': '<b>Algoritmul:</b>',
  'doc.ch2.raw.step1': 'De 5 ori pe secundă luăm un cadru de la cameră.',
  'doc.ch2.raw.step2': 'Decupăm partea centrală, 60 % din cadru (astfel evităm marginile imaginii și strălucirea din lateral).',
  'doc.ch2.raw.step3': 'Scalăm fragmentul decupat la o grilă de 32×32 pixeli (suficient de exact și mult mai rapid decât calculul la rezoluție completă — important pe echipamente mai slabe, precum telefoanele Xiaomi sau Ulefone de buget).',
  'doc.ch2.raw.step4': 'Facem media valorii B a tuturor celor 1024 de pixeli ai acestei grile.',
  'doc.ch2.raw.step5.html': '<code>rezultat = medie_B ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>De ce l-am păstrat:</b> este cea mai simplă citire directă a „cât semnal albastru înregistrează senzorul în general”. Neajunsul lui este că amestecă luminozitatea cu culoarea — o scenă foarte luminoasă, dar neutru albă, va da tot un rezultat mare, deși nu este deosebit de „albastră”. De aceea, alături de el, arătăm graficul 2.',

  'doc.ch2.share.title': 'Graficul 2 — Ponderea albastrului în lumină',
  'doc.ch2.share.what.html': '<b>Ce arată:</b> ce procent din toată lumina înregistrată (R+G+B) revine componentei albastre — adică deplasarea culorii spre rece, indiferent cât de luminoasă este scena.',
  'doc.ch2.share.algo.html': '<b>Algoritmul:</b> aceiași pași 1–4 ca mai sus, dar în loc de B singur calculăm:',
  'doc.ch2.share.formula.html': '<code>rezultat = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': 'Albul neutru (R≈G≈B) dă aproximativ <b>33 %</b>. Lumina mai caldă, mai roșie — mai puțin. Lumina puternic albastră — mai mult, până la limita de ~100 % pentru o lumină aproape pur albastră.',
  'doc.ch2.share.why.html': '<b>De ce aceasta este o măsură mai exactă a „albastrului dăunător”:</b> este același principiu pe care funcționează filtrele de tip mod de noapte / Night Shift — contează <b>culoarea</b>, nu luminozitatea. Un ecran foarte luminos, dar neutru, nu va fi marcat pe nedrept ca dăunător; unul estompat, dar puternic albastru — da. De aceea această mărime conduce culoarea zonei din tabelul citirilor.',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': 'De ce nu lucși și nu lumeni',
  'doc.ch3.units.p1.html': '<b>Lumenul (lm)</b> descrie fluxul luminos total emis de o sursă — este o proprietate a sursei înseși, nu a ceea ce cade într-un anumit punct. <b>Luxul (lx)</b> este deja iluminarea într-un punct (lm/m²) — mai aproape de ce ne interesează, dar tot o unitate <b>fotometrică</b>: ponderează spectrul cu curba de sensibilitate a ochiului uman la luminozitate (V(λ)), nu cu curba de risc al luminii albastre. Pentru o măsurare adevărată a riscului este nevoie de o a treia unitate, mai îngustă: iradianța ponderată spectral, în <b>W/m²</b> (standardul IEC 62471, vârful sensibilității în jur de 435–440 nm), iar asta cere un spectrometru — vezi secțiunea de mai sus.',
  'doc.ch3.units.p2.html': 'Chiar dacă ne-am mulțumi cu lucșii: un telefon fără un senzor de lumină extern, calibrat, nu îi poate determina în mod credibil. Senzorul de lumină încorporat în telefon (acolo unde există) măsoară de altfel lumina de pe <b>partea opusă</b> a carcasei față de cea cu care țintești ecranul cu camera din spate — ar măsura deci lumina din spatele tău, nu pe cea de la ecran. De aceea, în loc să ghicim un număr într-o unitate care oricum ar fi necredibilă, arătăm un <b>indicator relativ (%)</b> descris cinstit — util pentru comparații pe același telefon, în aceleași condiții (de exemplu modul de noapte pornit sau oprit), nu ca valoare absolută.',

  'doc.ch3.norms.title': 'Există standarde globale pentru pragurile de siguranță?',
  'doc.ch3.norms.p1.html': 'Pe scurt: <b>nu există un standard exprimat în procente dintr-un canal al camerei</b> — aceasta nu este nicidecum o unitate în care să se reglementeze ceva. Standarde reale privind lumina albastră există, dar măsoară alte mărimi, în alte unități, și privesc alt fenomen decât cel la care ne gândim de obicei când spunem „lumina albastră obosește ochii”.',
  'doc.ch3.norms.p2.html': '<b>Vătămarea fotochimică acută a retinei — IEC 62471 / ICNIRP.</b> Singura „nocivitate a luminii albastre” reglementată cu adevărat — un standard pentru lămpi și sisteme de iluminat, susținut de recomandările ICNIRP (International Commission on Non-Ionizing Radiation Protection). Clasifică sursele în grupele de risc RG0–RG3 pe baza radianței ponderate cu funcția de risc B(λ), în <b>W·m⁻²·sr⁻¹</b>, cu o limită a timpului de expunere (<code>t_max = 100 / L_B</code> secunde). Ecranele telefoanelor și ale monitoarelor — chiar și la luminozitate maximă — se încadrează practic întotdeauna în <b>RG0 (exceptat, fără restricții)</b>. Acest standard privește surse mult mai intense (arcuri de sudură, unele videoproiectoare, LED-uri industriale), nu ecrane de larg consum.',
  'doc.ch3.norms.p3.html': '<b>Influența asupra ritmului circadian și a somnului — CIE S 026.</b> Acesta este fenomenul la care se referă de obicei discuția (ecranul „trezește” seara) — dar nu este o vătămare a ochiului, ci o influență asupra ceasului biologic prin celulele ganglionare ale retinei (ipRGC), cele mai sensibile în jur de 480 nm. Standardul CIE S 026:2018 definește unitatea <b>lux melanopic (melanopic EDI)</b>. Cel mai apropiat consens științific „oficial” este lucrarea lui Brown și a coautorilor (<i>PLOS Biology</i>, 2022), care recomandă orientativ: seara &lt; 10 lucși melanopici, ziua &gt; 250. Acestea sunt recomandări ale cercetătorilor somnului, nu o prevedere legală.',
  'doc.ch3.norms.p4.html': '<b>OMS.</b> Organizația Mondială a Sănătății nu publică limite proprii, independente, de expunere la lumina albastră — pentru siguranța radiației optice trimite la ICNIRP (mai sus). Singurul document propriu și concret al OMS despre ecrane este <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i> (2019) — el privește însă <b>timpul</b> petrecut în fața ecranului, nu culoarea sau intensitatea luminii: niciun ecran sub vârsta de 1 an, cel mult 1 oră pentru 2–4 ani. Pentru adulți, OMS nu are îndrumări numerice la fel de concrete.',
  'doc.ch3.norms.p5.html': '<b>De ce nici asta nu ajută la calibrarea aplicației:</b> ambele standarde (IEC/ICNIRP și CIE) cer o distribuție spectrală completă și o radianță calibrată, într-o geometrie de măsurare cunoscută — exact ceea ce un telefon nu poate oferi prin browser (vezi secțiunea „Camera unui telefon față de un spectrometru”, mai sus). Nu există o conversie de tipul „33 % pondere a albastrului = X lucși melanopici”, așa că pragurile din această aplicație <b>nu reproduc niciun standard de siguranță</b> (OMS, IEC, ICNIRP sau CIE — pentru acest indicator pur și simplu nu există niciunul). Valorile implicite ale pragului de pondere a albastrului sunt în schimb deduse din temperaturi de culoare reale ale luminii și din recomandarea practică, larg repetată, a luminii calde seara — o bază mai solidă decât o simplă rotunjire, dar tot nu un standard formal (deducerea completă: capitolul 4). Le poți schimba oricând cu ale tale, în setări.',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': 'Zonele de culoare și de unde vin pragurile',
  'doc.ch4.zones.p1.html': 'Ambele mărimi au praguri proprii, reglabile independent (ecranul „Monitorizare” → „Setările pragurilor zonelor”, în josul paginii) — 33 %/66 % la una nu înseamnă același lucru ca la cealaltă (vezi capitolul 2, mai sus). <b>Ponderea albastrului</b> este cea care decide culoarea din legenda de sub grafice și din tabelul citirilor:',
  'doc.ch4.zones.li1.html': '<b>Verde — sigură:</b> lumină caldă sau neutră, ochii se odihnesc.',
  'doc.ch4.zones.li2.html': '<b>Galbenă — moderată:</b> deplasare vizibilă spre albastru, merită să faci pauze.',
  'doc.ch4.zones.li3.html': '<b>Roșie — dăunătoare:</b> lumină puternic albastră, obosește mult ochii la o expunere mai lungă (mai ales seara).',
  'doc.ch4.zones.p2.html': '<b>De unde vin exact aceste numere.</b> <b>Luminozitatea canalului B</b> nu are un punct de referință natural — o valoare de prag rezonabilă depinde exclusiv de cât de luminoasă este scena pe care o filmezi (este o măsură a luminozității, nu a culorii). Valorile implicite de 33 %/66 % rămân aici un punct de plecare convențional — potrivește-le prin încercări la luminozitatea obișnuită a ecranului și a mediului tău.',
  'doc.ch4.zones.p3.html': '<b>Ponderea albastrului</b> are praguri implicite deduse din temperaturi de culoare reale ale luminii (fizică, nu rotunjire), nu dintr-un standard de siguranță — un asemenea standard pentru această mărime nu există (capitolul 3). Punctele de referință:',
  'doc.ch4.zones.li4.html': '<b>~4000K</b> („alb cald”, un bec LED tipic) → aproximativ <b>26 %</b> pondere a albastrului. Lumina mai caldă decât atât (o temperatură de culoare mai joasă) este domeniul recomandat pe larg pentru seară de instrumente precum f.lux sau Night Shift — de aici pragul de jos.',
  'doc.ch4.zones.li5.html': '<b>6500K (D65)</b>, punctul de alb standard al majorității ecranelor de telefon și de monitor din fabrică — aproximativ <b>33 %</b>. De la această valoare în sus începe domeniul în care se aplică de regulă recomandările de limitare a luminii albastre — de aici pragul de sus.',
  'doc.ch4.zones.p4.html': '<b>O rezervă importantă:</b> cât de „albastră” este lumina nu depinde de ora din zi, dar recomandările de limitare a luminii albastre privesc de fapt numai <b>seara și noaptea</b> — ziua, expunerea la lumină rece, albastră (inclusiv la cea solară) este normală și chiar benefică pentru ritmul circadian. Zona roșie în mijlocul zilei, privind un ecran obișnuit, nemodificat, nu înseamnă un pericol real — aceeași lumină, seara, merită deja limitată.',
  'doc.ch4.zones.p5.html': 'Pragurile celor două mărimi sunt complet independente — schimbarea unuia nu îl influențează pe celălalt. Pragurile schimbate sunt <b>reținute pe acest dispozitiv și în acest browser</b> între deschiderile aplicației (local, nu se trimite nimic nicăieri) — butonul „Start” nu le readuce la valorile implicite.',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': 'De ce previzualizarea arată diferit pe dispozitive diferite',
  'doc.ch5.devices.p1.html': '<b>Browserul față de aplicația nativă a camerei.</b> Când deschizi aplicația de cameră instalată din fabrică pe telefon, producătorul (de exemplu Xiaomi) adaugă la previzualizarea în timp real algoritmi proprii, protejați — HDR în timp real, amplificarea digitală a luminozității în lumină slabă, netezire. O pagină web primește prin browser un flux mult mai „brut” de la cameră (funcția <code>getUserMedia</code>), fără niciuna dintre aceste îmbunătățiri — deci, din principiu, va arăta mai plat și mai întunecat decât camera nativă, indiferent de telefon.',
  'doc.ch5.devices.p2.html': '<b>Posibilități diferite de control al camerei.</b> Cât control asupra expunerii și a balansului de alb primește browserul de la sistem depinde de telefonul concret, de driverul camerei și de versiunea de Chrome sau WebView — unele dispozitive (de obicei calculatoarele cu o cameră USB) raportează numai automatizare completă, altele (o parte dintre telefoanele cu Android) raportează moduri suplimentare, mai avansate. O versiune anterioară a acestei aplicații încerca să treacă la modul de expunere manuală acolo unde telefonul permitea, fără să stabilească o valoare concretă — ceea ce, pe o parte dintre telefoane, îngheța imaginea la o expunere întâmplătoare, întunecată, din clipa pornirii camerei. Aceea a fost o eroare în cod (deja corectată), nu o diferență de unități — dar arată bine cât de ușor poate diferi comportamentul între dispozitive, dacă până și aceeași linie de cod se activează numai pe o parte dintre ele.',
  'doc.ch5.devices.p3.html': '<b>Senzori și procesare a imaginii (ISP) diferite.</b> Chiar și cu un cod identic și aceeași scenă, modele diferite de telefoane au senzori de calitate diferită și o automatizare a producătorului reglată diferit — unul va alege expunerea în lumină slabă mai repede și mai exact decât altul. Asta, împreună cu faptul că indicatorii din această aplicație sunt <b>relativi</b> (vezi capitolul 3), înseamnă: compară rezultatele (și aspectul previzualizării) pe același telefon în timp, nu între modele sau dispozitive diferite.'
});
