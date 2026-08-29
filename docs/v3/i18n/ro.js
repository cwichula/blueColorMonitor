/* docs/v3/i18n/ro.js — słownik WŁASNY wersji v3, rumuński.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/ro.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * SKĄD TE ZDANIA: przekład z polskiej redakcji pierwotnej (pl.js), z angielskim
 * (en.js) jako wzorcem terminologii i rejestru. Rejestr bezpośredni („tu”),
 * jak w docs/v5/js/i18n/locales/ro.js — „dumneavoastră” brzmiałoby jak pismo
 * z urzędu.
 *
 * TERMINOLOGIA JEST WZIĘTA ZE SŁOWNIKA WSPÓLNEGO docs/shared/i18n/ro.js
 * i trzymana bez wyjątku, także w zdaniach opisowych: ponderea albastrului,
 * luminozitatea scenei, temperatura de culoare, impact circadian (w opisie:
 * raportul melanopic), pâlpâire, uniformitate, confort vizual; strefy
 * „În limite / Atenție / Critic”; nazwa własna „Monitor de Lumină”.
 * Pozostałe stałe odpowiedniki: mărime (wielkość), prag (próg), istoric
 * (historia), sesiune (sesja), citire (odczyt), eșantion (próbka), cadru
 * (kadr), măsurătoare (pomiar), planșă (plansza), buton (klawisz), încăpere
 * (pomieszczenie — nigdy „cameră”, bo tym słowem nazywa się po rumuńsku
 * kamerę).
 *
 * CZEGO TU NIE MA — i dlaczego: kluczy, które stoją już w słowniku wspólnym
 * (docs/shared/i18n/ro.js) z DOKŁADNIE tym samym zdaniem. Nazwy stref, zdania
 * oceniające, noty o granicach metody, nazwy i opisy siedmiu wielkości oraz
 * zastrzeżenie medyczne są wspólne dla wersji i tłumaczy się je RAZ — poza
 * jednym świadomym nadpisaniem, opisanym przy 'verdict.critical.comfort'.
 *
 * ZAPIS: rumuński przecinek dziesiętny („0,3320”) także we wzorach, bo wzory
 * czyta człowiek, a nie parser. Przed znakiem % stoi spacja nierozdzielająca
 * (100 %), jak w rumuńskiej typografii i jak w v5. Diakrytyki
 * z przecinkiem pod spodem (ș, ț), nie z cedyllą. Cudzysłowy „ … ” są takie
 * same jak polskie. Liczby wstawiane przez '{…}' formatuje warstwa językowa.
 *
 * ZESTAW KLUCZY wyznacza docs/v3/i18n/en.js: angielski jest wartością
 * zapasową, więc to on jest miarą kompletności. Klucza, którego tam nie ma,
 * nie wolno tu dopisywać.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ro'] = Object.assign(window.I18nData['ro'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. */
  'app.wordmark': 'MONITOR DE LUMINĂ',

  'state.idle': 'Gata',
  'state.starting': 'Pornesc',
  'state.running': 'Se măsoară',
  'state.runningTpl': 'Se măsoară {time}',
  'state.stopped': 'Oprit',
  'state.error': 'Eroare de cameră',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5,0 po rumuńsku, 5.0 po angielsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'Începe măsurarea',
  'keys.starting': 'Pornesc…',
  'keys.stop': 'Stop',
  'keys.flip': 'Comută',
  'keys.flipAria': 'Comută camera, frontală sau din spate',
  'keys.menu': 'Meniu',
  'keys.menuAria': 'Lista modulelor',
  'keys.back': '‹ Înapoi',
  'keys.backAria': 'Înapoi la panou',
  'keys.dash': 'Panou',
  'keys.zoom': 'Mărește previzualizarea',
  'keys.retry': 'Încearcă din nou',
  'keys.refresh': 'Reîncarcă',
  'keys.close': 'Închide',
  'keys.show': 'Arată',
  'keys.apply': 'Aplică',
  'keys.remove': 'Șterge',

  'monitor.legend': 'Previzualizare de control',
  'monitor.badge': 'În direct',

  'aim.title': 'Vizare',
  'aim.hint': 'Cadrul arată exact porțiunea de imagine pe care o măsoară aplicația.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'Canal principal',
  'readout.thresholdTpl': '(prag {value})',
  'readout.contextTpl': 'min {min} · med. {avg} · max {max} — ultimele 60 s',
  'readout.contextEmpty': 'fără date din ultimele 60 s',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'Ce înseamnă: {name}',
  'aria.channel': '{name}, {value}, {zone}. Arată pe afișajul mare.',
  'aria.channelStale': '{name}, fără date. Arată pe afișajul mare.',
  'aria.scale': 'Scală: {name}, de la {min} la {max}. Acum {value}, {zone}. Prag de atenție {warn}, prag critic {crit}.',
  'aria.readout': '{name}: {value}, {zone}.',
  'aria.readoutApprox': '{name}: aproximativ {value}, {zone}. Valoare aproximativă.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'Scala canalului principal. Fără date',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': 'Apasă „Începe măsurarea”, îndreaptă telefonul spre o suprafață luminată și ține-l nemișcat câteva secunde.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'Confortul vizual este scăzut. Uită-te în modulul 01 ca să vezi ce îl scade.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'Începe cu butonul „Începe măsurarea” din partea de jos a ecranului. Camera pornește abia după ce îl apeși.',
  'transient.measureStopped': 'Măsurătoare încheiată · {time} · salvată în istoric.',
  'transient.newVersion': 'Există o versiune nouă a aplicației.',
  'transient.thresholdsSaved': 'Praguri salvate.',
  'transient.thresholdsRejected': 'Nu s-a salvat — pragul de atenție și pragul critic nu se pot încrucișa.',
  'transient.historyCleared': 'Istoric golit.',

  'live.lead': 'Canal principal: {name}, {value}, {zone}.',
  'live.ready': 'Evaluare gata. {name} {value}, {zone}.',
  'live.started': 'Măsurătoare pornită.',
  'livebar.stopped': 'Măsurătoare oprită',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'Încă nu există nicio înregistrare. Istoricul se scrie în timpul măsurării — pornește o măsurătoare pentru un minut și revino aici.',
  'empty.recorderNoRange': 'În acest interval nu s-a măsurat nimic.',
  'empty.coverageTpl': 'Măsurarea a acoperit {done} din {total} ore.',
  'empty.reportsNoData': 'Raportul zilnic va apărea după prima zi întreagă cu măsurători.',
  'empty.compareOneSession': 'Pentru comparație sunt necesare două sesiuni încheiate. Deocamdată ai una.',
  'empty.exportNoData': 'Nu este nimic de exportat. Pornește o măsurătoare, ca istoricul să aibă conținut.',
  'empty.alertsOff': 'Alertele sunt oprite. După ce le pornești, funcționează doar cât timp aplicația este deschisă.',
  'empty.scheduleEmpty': 'Nu a fost setată nicio oră. Programul funcționează doar cât timp aplicația este deschisă.',
  'empty.historyEmpty': 'Istoricul este gol.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'Lista modulelor',

  'modules.01.title': 'Înregistrator',
  'modules.01.desc': 'Desfășurarea măsurătorii în timp, de la un minut la treizeci de zile.',
  'modules.02.title': 'Praguri',
  'modules.02.desc': 'Setează-ți propriile limite de atenție și de alarmă pentru fiecare mărime.',
  'modules.03.title': 'Calibrare',
  'modules.03.desc': 'Raportarea la o sursă de lumină cunoscută și ce nu repară calibrarea.',
  'modules.04.title': 'Rapoarte',
  'modules.04.desc': 'Sinteze zilnice și săptămânale, așezate ca un material tipărit.',
  'modules.05.title': 'Export',
  'modules.05.desc': 'Salvarea citirilor într-un fișier CSV sau JSON, cu descrierea coloanelor.',
  'modules.06.title': 'Comparație',
  'modules.06.desc': 'Două sesiuni una lângă alta, cu diferența dată în cifre.',
  'modules.07.title': 'Test de ecran',
  'modules.07.desc': 'Planșe pentru verificarea propriului monitor, pas cu pas.',
  'modules.08.title': 'Program',
  'modules.08.desc': 'Măsurători la orele alese de tine.',
  'modules.09.title': 'Alerte',
  'modules.09.desc': 'O notificare după depășirea unui prag — și când nu va funcționa.',
  'modules.10.title': 'Sprijin',
  'modules.10.desc': 'Aplicația este gratuită în întregime. Aici îi poți cumpăra autorului o cafea.',
  'modules.11.title': 'Documentație',
  'modules.11.desc': 'Ce este această măsurătoare și ce sigur nu este.',
  'modules.12.title': 'Setări',
  'modules.12.desc': 'Temă, dimensiunea textului, reducerea mișcării, golirea istoricului.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'Canale de măsurare',
  'channels.pick': 'Arată pe afișajul mare',
  'channels.stale': 'fără date',
  'channels.approx': 'valoare aproximativă',

  'help.unit': 'Unitate',
  'help.range': 'Interval',
  'help.thresholds': 'Praguri',
  'help.warn': 'Prag de atenție',
  'help.crit': 'Prag critic',
  'help.now': 'acum',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „Mărime” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'Mărime',
  'col.unit': 'Unitate',
  'col.range': 'Interval',
  'col.direction': 'Direcție',
  'col.time': 'Ora',
  'col.date': 'Data',
  'col.zone': 'Zonă',
  'col.avg': 'Medie',
  'col.min': 'Minim',
  'col.max': 'Maxim',
  'col.name': 'Coloană',
  'col.meaning': 'Ce conține',
  'col.channel': 'Canal',
  'col.gain': 'Amplificare',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'Interval de timp',
  'recorder.range.60s': '60 s',
  'recorder.range.15min': '15 min',
  'recorder.range.1h': '1 h',
  'recorder.range.24h': '24 h',
  'recorder.range.30d': '30 de zile',
  'recorder.gap': 'fără măsurătoare',
  'recorder.sessionTitle': 'Statistica sesiunii',
  'recorder.zonesCaption': 'Distribuția zonelor pentru ponderea albastrului',
  'recorder.tableCaption': 'Citirile din intervalul ales',
  'recorder.crosshair': 'Reticul de citire',
  'recorder.prevAria': 'Punctul anterior',
  'recorder.nextAria': 'Punctul următor',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'Aspect',
  'settings.themeLabel': 'Temă',
  'settings.themeSystem': 'Ca în sistem',
  'settings.themeLight': 'Deschisă',
  'settings.themeDark': 'Închisă',
  'settings.themeHint': 'Tema „ca în sistem” se schimbă odată cu setarea din telefon.',
  'settings.textLabel': 'Dimensiunea textului',
  /* Mnożnik jako LICZBA we wstawce — 1,15 po rumuńsku, 1.15 po angielsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'Mărește toată interfața, nu doar literele — butoanele și rândurile cresc odată cu textul.',
  'settings.motionGroup': 'Mișcare',
  'settings.motionLabel': 'Redu mișcarea',
  'settings.motionHint': 'Oprește toate tranzițiile. Indicatorul scalei sare atunci o dată pe secundă, în loc să alunece.',
  'settings.dataTitle': 'Date',
  'settings.clearLabel': 'Golește istoricul',
  'settings.clearHintTpl': 'Istoricul conține acum {count} puncte salvate.',
  'settings.clearHintEmpty': 'Istoricul este gol.',
  'settings.clearTitle': 'Golești istoricul?',
  'settings.clearConfirm': 'Golești tot istoricul măsurătorilor? Asta nu se poate anula.',
  'settings.clearKey': 'Golește',
  'settings.aboutTitle': 'Despre aplicație',
  'settings.versionTpl': '{app}, versiunea {version}.',
  'settings.offlineText': 'Aplicația funcționează fără rețea. După prima deschidere, toate fișierele ei stau în memoria browserului, așa că modul avion nu schimbă nimic. Nimic nu este trimis către niciun server, fiindcă aplicația nu face cereri de rețea.',
  'settings.docsKey': 'Deschide documentația',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'Anulează',
  'common.save': 'Salvează',
  'common.reset': 'Restabilește valorile implicite',
  'common.yes': 'Da',
  'common.no': 'Nu',
  'common.on': 'Pornit',
  'common.off': 'Oprit',
  'common.sep': ' · ',
  'common.stepsTitle': 'Pas cu pas',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'La ce sunt bune pragurile proprii',
  'modules.02.intro': 'Pragul decide când spune aplicația „Atenție” și când „Critic”. Valorile implicite sunt aprecierea noastră redacțională, nu un standard — dacă măsori în alte condiții, mută-le după tine. Evaluarea și propoziția de pe panou se calculează imediat din pragurile noi.',
  'modules.02.orderNormal': 'Pragul de atenție trebuie să stea sub cel critic.',
  'modules.02.orderInvert': 'Aici o valoare mai mare este mai bună, așa că pragul de atenție stă deasupra celui critic.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'Previzualizarea scalei: {name}',
  'modules.02.nowTpl': 'acum {value}',
  'modules.02.resetDone': 'Pragurile implicite au fost restabilite.',
  'modules.02.profilesTitle': 'Profiluri',
  'modules.02.profilesHint': 'Un profil este un set salvat de praguri pentru toate cele șapte mărimi. Aplicarea unui profil le schimbă pe toate deodată.',
  'modules.02.profileSaveKey': 'Salvează pragurile curente',
  'modules.02.profileNameLabel': 'Numele noului profil',
  'modules.02.profileNameHint': 'Numele rămâne pe acest dispozitiv. Cel mult 40 de caractere.',
  'modules.02.profileNameEmpty': 'Dă un nume profilului.',
  'modules.02.profileSavedTpl': 'Profilul „{name}” a fost salvat.',
  'modules.02.profileAppliedTpl': 'Profilul „{name}” a fost aplicat.',
  'modules.02.profileRemovedTpl': 'Profilul „{name}” a fost șters.',
  'modules.02.profileFailed': 'Acest profil nu a putut fi aplicat.',
  'modules.02.profileCustomTpl': 'Profil propriu, salvat {date}.',
  'modules.02.builtin.default.name': 'Implicit',
  'modules.02.builtin.default.desc': 'Pragurile din catalogul mărimilor — punctul de plecare pentru toate măsurătorile.',
  'modules.02.builtin.evening.name': 'Seara — blând',
  'modules.02.builtin.evening.desc': 'Avertizează mai devreme despre culoarea rece și impactul circadian.',
  'modules.02.builtin.work.name': 'Lucru la birou',
  'modules.02.builtin.work.desc': 'Permite lumină de zi luminoasă și rece; urmărește pâlpâirea și uniformitatea.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'De ce funcționează',
  'modules.03.why': 'Senzorul camerei are o abatere constantă între canale. Măsurarea unei coli albe arată cât de mare este și permite scăderea ei. Este singura funcție din această aplicație care ridică într-adevăr precizia — și tot nu transformă camera într-un spectrometru.',
  'modules.03.steps.1': 'Pune o coală albă de hârtie sub lumina pe care o măsori.',
  'modules.03.steps.2': 'Apasă „Începe măsurarea” pe panou și umple cadrul cu coala.',
  'modules.03.steps.3': 'Revino aici, apasă „Calibrează” și nu mișca telefonul timp de trei secunde.',
  'modules.03.runKey': 'Calibrează (3 s)',
  'modules.03.clearKey': 'Șterge calibrarea',
  'modules.03.busyTpl': 'Măsor coala… au mai rămas {sec} s',
  'modules.03.statusNone': 'Fără calibrare. Măsurarea funcționează, tratează valorile comparativ.',
  'modules.03.statusOnTpl': 'Calibrat pe {date}, la {time}.',
  'modules.03.gainsTitle': 'Amplificările canalelor',
  'modules.03.gainR': 'Roșu',
  'modules.03.gainG': 'Verde',
  'modules.03.gainB': 'Albastru',
  'modules.03.gainsNone': 'nesetate',
  'modules.03.needRunning': 'Pornește mai întâi măsurarea și îndreaptă camera spre o coală albă.',
  'modules.03.tooFew': 'Prea puține eșantioane. Verifică dacă măsurarea chiar funcționează.',
  'modules.03.tooDark': 'Imaginea este prea întunecată pentru calibrare. Luminează mai bine coala și încearcă din nou.',
  'modules.03.refused': 'Abaterea dintre canale este prea mare ca să fie considerată o calibrare. Folosește o coală albă în lumină uniformă.',
  'modules.03.done': 'Calibrat. Temperatura de culoare și impactul circadian vor fi acum mai exacte.',
  'modules.03.cleared': 'Calibrare ștearsă.',
  'modules.03.limitsTitle': 'Ce nu repară calibrarea',
  'modules.03.limits.1': 'Calibrarea egalizează cele trei canale ale camerei și nimic mai mult. Nu îi dă camerei un spectru, așa că temperatura de culoare și impactul circadian rămân aproximări calculate din culorile sRGB.',
  'modules.03.limits.2': 'Nu transformă luminozitatea scenei într-o mărime absolută — numărul acela rămâne relativ. Nu oprește expunerea automată și nici balansul de alb, care deplasează citirea pe dedesubt.',
  'modules.03.limits.3': 'Nu se transferă la altă lumină: o calibrare făcută sub un bec descrie acel bec. La altă sursă, repet-o. Și nu schimbă nimic din ceea ce această măsurătoare nu este — tot nu este o examinare și tot nu este o bază pentru diagnosticarea unei boli.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'Perioada raportului',
  'modules.04.rangeDay': 'Zi',
  'modules.04.rangeWeek': 'Săptămână',
  'modules.04.headTpl': 'De la {from} la {to} · {count} puncte de istoric.',
  'modules.04.tableTitle': 'Sinteză',
  'modules.04.tableCaption': 'Media, minimul și maximul în perioada aleasă',
  'modules.04.panoramaTitle': 'Panoramă',
  'modules.04.panoramaAriaTpl': 'Panoramă: {name}, {span}.',
  'modules.04.panoramaSpanDay': 'ultimele 24 de ore, împărțite pe ore',
  'modules.04.panoramaSpanWeek': 'ultima săptămână, împărțită pe zile',
  'modules.04.panoramaHint': 'Înălțimea și culoarea barei spun același lucru: în limite — joasă, atenție — la mijloc, critic — plină. O liniuță la bază marchează o oră fără măsurătoare.',
  'modules.04.coverageDayTpl': 'Măsurarea a acoperit {done} din {total} ore.',
  'modules.04.coverageWeekTpl': 'Măsurarea a acoperit {done} din {total} zile.',
  'modules.04.zonesTitle': 'Distribuția zonelor',
  'modules.04.zonesCaptionTpl': 'Calculată pentru canalul principal: {name}.',
  'modules.04.worstTpl': 'Cea mai grea perioadă: {value}.',
  'modules.04.worstNone': 'niciuna nu iese în evidență',
  'modules.04.worstHourTpl': 'ora {hour}',
  'modules.04.adviceTitle': 'Ce poți face',
  'modules.04.adviceMelanopicTpl': 'Impactul circadian mediu a fost {value} ×. Seara merită să cobori sub 0,50 — cel mai simplu cu un bec mai cald sau cu modul de noapte.',
  'modules.04.adviceKelvinTpl': 'Lumina a fost rece (în medie {value} K). Pentru lucru este fără cusur; cu două ore înainte de culcare, sub 3000 K este mai blând.',
  'modules.04.adviceFlickerTpl': 'Există o pâlpâire vizibilă (în medie {value} %). De obicei este de vină un variator ieftin sau sursa retroiluminării.',
  'modules.04.adviceUniformityTpl': 'Lumina este distribuită neuniform ({value} %). Mutarea lămpii sau schimbarea unghiului dă de obicei mai mult decât schimbarea becului.',
  'modules.04.adviceWorstTpl': 'Cele mai multe citiri din afara pragurilor se adună la ora {hour}.',
  'modules.04.adviceNone': 'În această perioadă nimic nu iese peste pragurile setate.',
  'modules.04.limitsTitle': 'Acesta nu este un sfat medical',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'Concluziile rezultă exclusiv din ceea ce a văzut camera acestui telefon. Aplicația nu măsoară un spectru și nu pune niciun diagnostic.',
  'modules.04.printHint': 'Această pagină este gândită ca un material tipărit: tabelul și legendele se citesc la fel pe hârtie, în lupa sistemului și într-un cititor de ecran.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'Intervalul de date',
  'modules.05.range1h': 'Oră',
  'modules.05.range24h': 'Zi',
  'modules.05.range7d': '7 zile',
  'modules.05.range30d': '30 de zile',
  'modules.05.csvKey': 'Salvează fișierul CSV',
  'modules.05.jsonKey': 'Salvează fișierul JSON',
  'modules.05.formatTitle': 'Formatul fișierului',
  'modules.05.formatCsv': 'CSV: punctul și virgula desparte coloanele, virgula este separatorul zecimal, codarea este UTF-8 cu marcaj BOM. Un Excel pus pe o limbă care folosește virgula ca separator zecimal deschide un astfel de fișier fără nicio setare.',
  'modules.05.formatJson': 'JSON: aceleași date în câmpul „points”, cu punct zecimal și marcaj de timp în milisecunde — asta cere formatul.',
  'modules.05.resolution': 'Istoricul salvează un punct la fiecare 5 secunde și ajunge 30 de zile în urmă. Fișierul nu conține rezoluția completă de cinci eșantioane pe secundă — motorul o ține doar timp de un minut.',
  'modules.05.offline': 'Fișierul se creează pe dispozitiv și rămâne pe dispozitiv. Exportul nu se conectează la nicio rețea.',
  'modules.05.columnsTitle': 'Descrierea coloanelor',
  'modules.05.columnsCaption': 'Coloanele fișierului și înțelesul lor',
  'modules.05.descDate': 'Data punctului, de la ceasul dispozitivului, scrisă zi-lună-an.',
  'modules.05.descTime': 'Ora punctului, cu precizie de o secundă.',
  'modules.05.descZone': 'Zona ponderii albastrului în momentul salvării. Motorul salvează zona doar pentru această singură mărime — pentru celelalte, calculeaz-o din praguri.',
  'modules.05.descMetricTpl': '{short} Unitate: {unit}. Interval {min}–{max}.',
  'modules.05.previewTitle': 'Previzualizare',
  'modules.05.previewHint': 'Primele cinci rânduri ale fișierului, exact așa cum vor fi salvate.',
  'modules.05.savedTpl': 'Fișierul {name} a fost salvat — {rows} rânduri.',
  'modules.05.failed': 'Acest browser nu a permis salvarea fișierului.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'Aplicația salvează pe acest dispozitiv fiecare sesiune de măsurare încheiată. Alege două, ca să le vezi pe aceeași bandă și să citești diferența în cifre.',
  'modules.06.noSessions': 'Încă nu există nicio sesiune încheiată. Pornește o măsurătoare, oprește-o și revino aici.',
  'modules.06.slotA': 'Sesiunea A',
  'modules.06.slotB': 'Sesiunea B',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'Bandă',
  'modules.06.tapeAriaTpl': 'Desfășurarea sesiunii {slot}, mărimea {name}.',
  'modules.06.tapeHint': 'Ambele sesiuni sunt întinse pe aceeași lățime: o bară înseamnă aceeași parte din durată, nu aceeași oră. Înălțimea și culoarea spun același lucru ca pe panou.',
  'modules.06.tapeChannelTpl': 'Banda arată canalul principal: {name}.',
  'modules.06.diffTitle': 'Diferență',
  'modules.06.diffCaption': 'Mediile ambelor sesiuni și diferența dintre ele',
  'modules.06.clearKey': 'Șterge sesiunile salvate',
  'modules.06.cleared': 'Sesiunile salvate au fost șterse.',
  'modules.06.savedTpl': 'Sesiune salvată: {dur}.',
  'modules.06.limitsTitle': 'Ce nu îți spune această comparație',
  'modules.06.limits': 'Compari două măsurători, nu două surse de lumină. Dacă între sesiuni s-au schimbat cadrul, distanța, ora din zi sau poziția telefonului, diferența este și despre asta. Cea mai cinstită comparație este aceeași scenă înainte și după schimbarea iluminatului.',
  'modules.06.keepTpl': 'Sunt reținute cel mult {count} dintre cele mai recente sesiuni.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'Planșele de control se afișează pe tot ecranul acestui dispozitiv. Servesc la privirea ecranului cu ochiul liber: dacă albul este uniform, dacă griurile nu bat într-o culoare și dacă retroiluminarea nu se scurge pe la colțuri.',
  'modules.07.steps.1': 'Pune luminozitatea ecranului la nivelul la care lucrezi de obicei și oprește modul de noapte al sistemului.',
  'modules.07.steps.2': 'Alege o planșă din lista de mai jos. Va umple tot ecranul.',
  'modules.07.steps.3': 'Privește de la aproximativ șaizeci de centimetri, perpendicular pe ecran. Apoi uită-te la aceeași planșă dintr-un unghi.',
  'modules.07.steps.4': 'Ieși cu butonul „Închide planșa” sau cu tasta Escape și treci la următoarea.',
  'modules.07.planesTitle': 'Planșe',
  'modules.07.exitKey': 'Închide planșa',
  'modules.07.showAriaTpl': 'Arată planșa: {name}',
  'modules.07.planeAriaTpl': 'Planșă de control: {name}. Butonul de închidere este în partea de jos a ecranului.',
  'modules.07.plane.white.name': 'Alb',
  'modules.07.plane.white.hint': 'Caută pete, dominante de culoare și zone mai luminoase lângă margini. Albul ar trebui să fie o singură culoare pe toată suprafața.',
  'modules.07.plane.gray75.name': 'Gri 75 %',
  'modules.07.plane.gray75.hint': 'Griul trebuie să fie gri. O nuanță verzuie sau roz înseamnă că balansul de alb al ecranului a derapat.',
  'modules.07.plane.gray50.name': 'Gri 50 %',
  'modules.07.plane.gray50.hint': 'Cea mai bună planșă pentru aprecierea nuanței. Compară centrul cu colțurile.',
  'modules.07.plane.gray25.name': 'Gri 25 %',
  'modules.07.plane.gray25.hint': 'Griul închis arată scurgerile de retroiluminare și benzile de pe matricele ieftine.',
  'modules.07.plane.black.name': 'Negru',
  'modules.07.plane.black.hint': 'Într-o încăpere întunecată se vede aici fiecare scurgere de retroiluminare și fiecare colț luminat.',
  'modules.07.plane.red.name': 'Roșu pur',
  'modules.07.plane.red.hint': 'Roșul uniform scoate la iveală subpixelii morți și neuniformitățile matricei.',
  'modules.07.plane.green.name': 'Verde pur',
  'modules.07.plane.green.hint': 'Verdele poartă cea mai multă luminozitate — pe el se observă cel mai ușor un pixel defect.',
  'modules.07.plane.blue.name': 'Albastru pur',
  'modules.07.plane.blue.hint': 'Albastrul arată murdăria și urmele de pe suprafața ecranului mai bine decât albul.',
  'modules.07.plane.grid.name': 'Grilă',
  'modules.07.plane.grid.hint': 'Liniile trebuie să fie la fel de clare în colțuri ca în mijloc. Neclaritatea de pe margini ține de scalarea imaginii.',
  'modules.07.warn': 'Planșa acoperă tot ecranul, inclusiv panoul de comandă cu butonul de măsurare. Este singurul loc din aplicație unde se întâmplă asta și de aceea butonul de ieșire este mare și mereu vizibil. Cât timp planșa este pe ecran, măsurarea merge mai departe și nu poate fi oprită — închide planșa ca să te întorci la butoane.',
  'modules.07.cameraTitle': 'Ce nu poți face aici',
  'modules.07.camera': 'Telefonul nu își vede propriul ecran, așa că aceste planșe nu se pot măsura cu același dispozitiv. Ca să măsori un monitor, afișează planșa pe monitor și măsoară cu telefonul — sunt două dispozitive diferite și două roluri diferite.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'Programul îți amintește de măsurătoare la o oră stabilită. Nu pornește camera singur: la ora stabilită afișează o reamintire, iar măsurarea o pornești cu butonul „Începe măsurarea” de pe panou. La fel ca prima dată.',
  'modules.08.onlyOpenTitle': 'Când nu va funcționa',
  'modules.08.onlyOpen': 'Programul funcționează doar cât timp aplicația este deschisă. O filă de browser închisă nu numără timpul și nu îți amintește nimic. Nu cerem permisiunea pentru notificări de sistem și nu trimitem nimic în rețea.',
  'modules.08.enableLabel': 'Pornește reamintirile',
  'modules.08.timesTitle': 'Ore',
  'modules.08.timeAriaTpl': 'Ora {n}: momentul reamintirii',
  'modules.08.addKey': 'Adaugă o oră',
  'modules.08.removeAriaTpl': 'Șterge ora {time}',
  'modules.08.addedTpl': 'Ora {time} a fost adăugată.',
  'modules.08.removedTpl': 'Ora {time} a fost ștearsă.',
  'modules.08.badTime': 'Scrie ora în formatul 22:00.',
  'modules.08.nextTpl': 'Următoarea reamintire: {time}.',
  'modules.08.nextNone': 'Reamintirile sunt oprite.',
  'modules.08.dueTpl': 'Ora programată pentru măsurătoare: {time}.',
  'modules.08.dueKey': 'Arată panoul',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'O alertă urmărește o singură mărime și se face auzită abia atunci când aceasta ține zona aleasă neîntrerupt pe durata setată. Nu oprește niciodată măsurarea și nu acoperă niciodată butoanele.',
  'modules.09.enableLabel': 'Pornește alertele',
  'modules.09.metricLabel': 'Mărimea urmărită',
  'modules.09.levelLabel': 'De la care zonă',
  'modules.09.levelWarning': 'De la atenție în sus',
  'modules.09.levelCritical': 'Doar critic',
  'modules.09.sustainLabel': 'După câte secunde neîntrerupt',
  'modules.09.sustainHint': 'Duratele mai scurte dau mai multe alarme false când miști telefonul. Sub cinci secunde nu coborâm.',
  'modules.09.soundLabel': 'Un semnal sonor scurt',
  'modules.09.soundHint': 'Sunetul se produce pe dispozitiv. Nu se descarcă nimic din rețea.',
  'modules.09.cooldownHint': 'Cel mult o alertă la două minute. O alarmă repetată la fiecare eșantion este o alarmă care se oprește definitiv.',
  'modules.09.whenNotTitle': 'Când nu va funcționa alerta',
  'modules.09.whenNot': 'Notificarea este în interiorul aplicației, nu în sistem. Nu va funcționa când aplicația este închisă sau ascunsă în fundal, când măsurarea nu merge și când mărimea urmărită nu se poate măsura în acel moment. Nu cerem permisiunea pentru notificări de sistem.',
  'modules.09.firedTpl': '{name}: {zone} timp de {sec} s — acum {value}.',
  'modules.09.saved': 'Setările alertei au fost salvate.',
  'modules.09.statusOnTpl': 'Urmăresc: {name}, {level}, după {sec} s.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'Această aplicație este gratuită',
  'support.freeText': 'Toate cele șapte mărimi arată numere de la prima pornire. Înregistratorul, pragurile, calibrarea, rapoartele, exportul, comparația sesiunilor și tot istoricul de treizeci de zile funcționează fără cont, fără plată și fără limite — la fel și în modul offline. Nimic de aici nu este pus deoparte contra cost pentru mai târziu.',
  'support.whyTitle': 'De ce cer asta',
  'support.whyText': 'Monitor de Lumină îl fac și îl întrețin singur, după program. Sprijinul se duce în timpul necesar pentru corecturi, pentru teste pe alte telefoane și pentru următoarele unelte din lista modulelor. Nimic nu va înceta să funcționeze dacă nimeni nu plătește nimic.',
  'support.nothingTitle': 'Ce îți aduce o donație',
  'support.nothingText': 'Nimic. Niciun număr, niciun modul și nicio setare nu se deblochează după o donație, fiindcă totul este deblocat de la bun început. Rămâne doar atât: că știu că i-a folosit cuiva.',
  'support.keyTitle': 'Dacă vrei să ajuți',
  'support.keyLabel': 'Cumpără-mi o cafea',
  'support.keyAria': 'Cumpără-mi o cafea — deschide o pagină externă într-o filă nouă',
  'support.serviceText': 'Profilul de donații este ținut de Buy Me a Coffee și este singura formă de sprijin din această aplicație. Aplicația nu încarcă de acolo niciun script, widget sau imagine — aici stă o legătură obișnuită și nimic mai mult.',
  'support.privacyText': 'Apăsarea acestui buton deschide o pagină externă într-o filă nouă și acesta este singurul moment în care ceva părăsește acest dispozitiv. Măsurătorile, istoricul și setările rămân unde au fost — în memoria acestui browser.',
  'support.privacyPendingText': 'Când adresa va apărea, apăsarea butonului va deschide o pagină externă într-o filă nouă și acela va fi singurul moment în care ceva părăsește acest dispozitiv. Măsurătorile, istoricul și setările rămân unde au fost — în memoria acestui browser.',
  'support.emptyTitle': 'Profilul nu este încă legat',
  'support.emptyText': 'Adresa profilului de donații nu a fost încă introdusă, așa că nu există aici un buton care să nu ducă nicăieri. Restul aplicației funcționează neschimbat — nimic nu așteaptă această donație.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'Ce NU măsoară această aplicație',
  'docs.notList.1': 'Nu măsoară un spectru. Camera are trei canale de culoare largi, expunere automată și balans de alb automat.',
  'docs.notList.2': 'Nu măsoară valori absolute. Luminozitatea scenei este un indicator relativ, nu rezultatul unei măsurători fotometrice.',
  'docs.notList.3': 'Nu măsoară direct temperatura de culoare. Temperatura de culoare și impactul circadian sunt aproximări calculate din culorile sRGB.',
  'docs.notList.4': 'Nu vede pâlpâirea rețelei. Eșantionarea la 5 Hz vede pulsația doar sub 2,5 Hz — cei 100 Hz ai rețelei sunt în afara razei de acțiune și aplicația nu îi va da niciodată ca rezultat.',
  'docs.notList.5': 'Nu pune un diagnostic și nu dă sfaturi medicale. Niciun rezultat nu este nici una, nici alta.',
  'docs.notList.6': 'Nu compară lumina ta cu niciun etalon oficial. Pragurile sunt setări pe care le poți schimba în modulul 02.',
  'docs.whatTitle': 'Ce măsoară și cum',
  'docs.whatLead': 'Camera telefonului se uită la o suprafață luminată, iar aplicația calculează de cinci ori pe secundă mediile canalelor R, G și B din porțiunea centrală a cadrului. Din aceste trei numere scoate șapte indicatori.',
  'docs.whatCrop': 'Porțiunea este centrul cadrului: 60 % din lățime și 60 % din înălțime — exact dreptunghiul pe care îl trasează reticulul de pe ecranul VIZARE. În afara lui nu se calculează nimic.',
  'docs.whatRate': 'Un eșantion la fiecare 200 ms, adică de 5 ori pe secundă. Ultimul minut stă în memorie la rezoluție completă; tot ce este mai vechi se salvează la fiecare 5 secunde și ajunge treizeci de zile în urmă.',
  'docs.metricsTitle': 'Cele șapte mărimi',
  'docs.formulasTitle': 'Formule',
  'docs.formula.share.formula': 'pondere = B / (R + G + B) × 100 %',
  'docs.formula.share.text': 'Calculată pe valorile sRGB fără inversarea gamei — intenționat, fiindcă este aceeași definiție ca în versiunea anterioară a aplicației, iar pragurile setate atunci înseamnă mai departe același lucru. Separă culoarea de luminozitate.',
  'docs.formula.brightness.formula': 'luminozitate = (R + G + B) / 3 / 255 × 100 %',
  'docs.formula.brightness.text': 'Valoarea medie a canalelor, ca procent din interval. Expunerea automată o deplasează pe dedesubt, așa că este un indicator relativ — compară două scene, nu citi un singur număr ca pe o măsurătoare.',
  'docs.formula.kelvin.title': 'Temperatura de culoare — aproximarea lui McCamy',
  'docs.formula.kelvin.formula': 'n = (x − 0,3320) / (y − 0,1858)\nCCT = −449 n³ + 3525 n² − 6823,3 n + 5520,33',
  'docs.formula.kelvin.text': 'Întâi inversăm gama sRGB, apoi trecem cu matricea la CIE XYZ pentru albul D65 și calculăm cromaticitatea x, y. Formula lui McCamy este de încredere aproximativ între 2000 K și 12500 K. În afara acestui interval polinomul de gradul al treilea o ia razna, așa că rezultatul este retezat și marcat ca nesigur — atunci linia de bază a scalei devine întreruptă și apare propoziția „în afara domeniului metodei”.',
  'docs.formula.melanopic.title': 'Impact circadian — raportul melanopic',
  'docs.formula.melanopic.formula': 'mel = 0,0016 R + 0,3110 G + 0,8460 B\nY = 0,2127 R + 0,7152 G + 0,0722 B\nrezultat = (mel / Y) × normalizare la 1,00 pentru albul neutru',
  'docs.formula.melanopic.text': 'Toate cele trei canale în valori liniare. Mărimea adevărată este integrala spectrului cu curba de sensibilitate a melanopsinei (vârf în jur de 490 nm); camera are trei canale largi, așa că ponderăm culorile primare sRGB cu sensibilitatea melanopică la lungimile lor de undă aproximative (R 612 nm, G 549 nm, B 465 nm). Direcția schimbărilor este de încredere, valoarea absolută nu este — de aceea lângă acest număr stă semnul „≈”.',
  'docs.formula.flicker.formula': 'pâlpâire = (max − min) / (max + min) × 100 %',
  'docs.formula.flicker.text': 'Definiția IES, calculată dintr-o fereastră de eșantioane de luminozitate. Frecvența o estimăm din numărul de treceri ale semnalului prin valoarea medie. Eșantionarea la 5 Hz vede modulația doar sub 2,5 Hz (limita Nyquist), iar de încredere considerăm abia o frecvență între 0,2 și 2 Hz, la o amplitudine de la 0,5 % în sus — sub acest prag, trecerile prin medie sunt zgomot de senzor, nu pulsația sursei.',
  'docs.formula.uniformity.formula': 'uniformitate = celula cea mai întunecată / celula cea mai luminoasă × 100 %',
  'docs.formula.uniformity.text': 'Împărțim porțiunea în nouă celule, într-o grilă 3×3, și comparăm extremele. 100 % înseamnă lumină distribuită perfect uniform. O valoare mică pe un ecran înseamnă scurgeri de retroiluminare sau o reflexie; pe birou — o lampă prost așezată. Este singura mărime la care, împreună cu confortul, mai sus înseamnă mai bine.',
  'docs.formula.comfort.formula': '100 de puncte minus penalizări:\nimpact circadian peste 0,75 — până la 35 pct\nculoare peste 4000 K — până la 25 pct\npâlpâire peste 5 % — până la 25 pct\nuniformitate sub 60 % — până la 15 pct',
  'docs.formula.comfort.text': 'O singură evaluare în loc de șase numere. O mărime care nu a putut fi măsurată nu aduce nicio penalizare — lipsa datelor nu se dă niciodată drept rezultat bun. Ponderile sunt aprecierea noastră redacțională, nu un standard; de aceea modulul 01 arată defalcarea pe componente, ca să poți să nu fii de acord cu evaluarea.',
  'docs.rangesTitle': 'Intervale și praguri',
  'docs.rangesLead': 'Pragurile de mai jos sunt cele în vigoare chiar acum — dacă le-ai schimbat în modulul 02, tabelul arată valorile tale, nu pe cele din fabrică.',
  'docs.dirNormal': 'mai jos înseamnă mai blând',
  'docs.dirInvert': 'mai sus înseamnă mai bine',
  'docs.privacyTitle': 'Date și confidențialitate',
  'docs.privacyText': 'Imaginea de la cameră nu este trimisă și nici salvată nicăieri — din fiecare cadru rămân doar trei numere. Măsurătorile, pragurile și setările stau în memoria browserului de pe acest dispozitiv. Aplicația nu face nicio cerere de rețea și funcționează în modul offline.',
  'docs.mdrTitle': 'Precizare',
  'docs.freeText': 'Aplicația este gratuită în întregime și așa rămâne: toate cele șapte mărimi, istoricul, rapoartele, exportul și modul offline funcționează fără cont, fără plată și fără limite. Cine vrea să mulțumească va găsi modulul 10, „Sprijin”.',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'Aplicația s-a încărcat incomplet',
  'boot.filesTpl': 'Nu s-au încărcat fișierele: {list}.',
  'boot.modulesTpl': 'Nu s-au anunțat modulele: {list} — aceste poziții nu se vor deschide din listă.',
  'boot.modulesRangeTpl': 'modulele {from}–{to}',
  'boot.tail': 'Reîncarcă pagina. Dacă asta nu ajută, fișierele de pe server sunt incomplete.',
  'boot.loss.bus': 'modulele nu se vor mai vedea între ele și măsurarea nu va porni',
  'boot.loss.metrics': 'nicio valoare nu va fi calculată',
  'boot.loss.scaleCore': 'vor dispărea geometria scalei și formatarea numerelor',
  'boot.loss.scaleText': 'vor dispărea toate textele interfeței',
  'boot.loss.shell': 'nu se va putea deschide niciun modul',
  'boot.loss.engine': 'camera și măsurarea nu vor porni',
  'boot.loss.dash': 'panoul va rămâne gol'
});
