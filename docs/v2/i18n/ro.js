/* docs/v2/i18n/ro.js — słownik WERSJI 2, rumuński.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/ro.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej.
 *
 * SKĄD TE ZDANIA: przekład z polskiej redakcji pierwotnej (pl.js), z angielskim
 * (en.js) jako wzorcem terminologii i rejestru. Zestaw kluczy jest identyczny
 * z pl.js — pilnuje tego docs/shared/i18n/keys.test.js.
 *
 * TERMINOLOGIA idzie za docs/shared/i18n/ro.js, bo to tamten plik nazywa
 * siedem wielkości w całej aplikacji: ponderea albastrului, luminozitatea
 * scenei, temperatura de culoare, impact circadian, pâlpâire, uniformitate,
 * confort vizual. Klucze *.nameLower to te same nazwy małą literą i w formie
 * z rodzajnikiem, bo stoją w środku zdania. Pozostałe stałe odpowiedniki, te
 * same co w docs/v5/js/i18n/locales/ro.js: istoric (historia), mărime
 * (metryka), citire (odczyt), eșantion (próbka), măsurătoare (pomiar), prag
 * (próg), unelte (narzędzia), sprijin (wsparcie). Rejestr bezpośredni („tu”),
 * cudzysłowy rumuńskie „ ”, przecinek dziesiętny. Zastrzeżenia medyczne
 * i akapity o prywatności przełożone WIERNIE, bez osłabiania i bez dodawania
 * obietnic — to zdania o skutkach prawnych.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (i dlaczego):
 *   'zone.warning'        — wspólne mówi „Atenție”, ta wersja od zawsze ma tu
 *                           osobne słowo: „Avertizare” (i „Avertizări”
 *                           w podsumowaniu);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi o pomiarach
 *                           w liczbie mnogiej.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules. Rumuński ma trzy kategorie: one (1), few (0, 2–19 oraz
 * liczby o dwóch ostatnich cyfrach w zakresie 01–19) i other — reszta, czyli
 * liczby wymagające przyimka „de”: „20 de citiri”. Patrz nagłówek
 * docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ro'] = Object.assign(window.I18nData['ro'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Monitor de Lumină — măsurarea luminii albastre',
  'app.description': 'Monitor de Lumină — măsurarea ponderii luminii albastre cu camera telefonului. Șapte mărimi, un grafic, istoric. Totul disponibil, fără cont și fără plată.',
  'app.skipToContent': 'Sari la conținut',
  'app.measuring': 'Măsurătoare în curs',
  'app.docsButton': 'Documentație și explicații',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — versiunea 2',

  'nav.aria': 'Navigare principală',
  'nav.tablistAria': 'Ecranele aplicației',
  'nav.measure': 'Măsurare',
  'nav.history': 'Istoric',
  'nav.tools': 'Unelte',
  'nav.support': 'Sprijin',
  'nav.more': 'Mai multe',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Documentație',
  'panel.thresholds': 'Praguri și profiluri',
  'panel.reports': 'Rapoarte',
  'panel.export': 'Export de date',
  'panel.compare': 'Comparație A/B',
  'panel.calibration': 'Calibrare cu o coală albă',
  'panel.screenCheck': 'Verifică-mi monitorul',
  'panel.schedule': 'Orar',
  'panel.alerts': 'Alerte de expunere',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Înapoi',
  'action.close': 'Închide',
  'action.refresh': 'Actualizează',
  'action.apply': 'Aplică',
  'action.delete': 'Șterge',
  'action.hide': 'Ascunde',
  'action.start': 'Start',
  'action.stop': 'Stop',
  'action.switch': 'Comută',
  'action.switchAria': 'Comută camera: frontală sau din spate',
  'action.resetDefaults': 'Restabilește implicitele',
  'action.reports': 'Rapoarte',
  'action.exportCsv': 'Exportă CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Ecran: {name}',
  'a11y.measureStarted': 'Măsurătoare începută.',
  'a11y.measureStopped': 'Măsurătoare oprită.',
  'a11y.measureStoppedSummary': 'Măsurătoare oprită. Timp: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'Profilul de praguri a fost aplicat.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Confirmare',
  'dialog.confirm': 'Confirm',
  'dialog.cancel': 'Anulează',
  'dialog.infoTitle': 'Informație',
  'dialog.ok': 'Am înțeles',

  'help.sheetTitle': 'Descrierea mărimii',
  'help.unit': 'Unitate',
  'help.scaleRange': 'Intervalul scalei',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'Avertizare',
  'threshold.crit': 'Critic',
  'threshold.warnLabel': 'Prag de avertizare',
  'threshold.critLabel': 'Prag critic',
  'threshold.warnAria': '{name} — prag: avertizare',
  'threshold.critAria': '{name} — prag: critic',

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

  'firstRun.title': 'Cum să măsori',
  'firstRun.text': 'Apasă „Start”, îndreaptă telefonul spre o suprafață luminată și ține-l nemișcat câteva secunde. Cadrul din previzualizare arată porțiunea pe care aplicația o citește cu adevărat.',
  'firstRun.close': 'Închide indicația',

  'camera.live': 'ÎN DIRECT',
  'camera.idle': 'Camera este oprită. Apasă „Start”, îndreaptă telefonul spre o suprafață luminată și ține-l nemișcat câteva secunde.',
  'camera.stopped': 'Măsurătoare oprită. Apasă „Start” ca să măsori din nou.',

  'error.cameraStart': 'Camera nu a putut fi pornită.',
  'error.engineMissing': 'Modulul de măsurare nu a fost încărcat.',

  'metrics.sevenTitle': 'Șapte mărimi',
  'measure.tilesSub': 'Actualizate de 5 ori pe secundă',

  'session.title': 'Această sesiune',
  'session.duration': 'Timp de măsurare',
  'session.samples': 'Număr de eșantioane',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     „Avertizări” to nie to samo słowo co „Avertizare” pod suwakiem. */
  'zone.count.good': 'În limite',
  'zone.count.warning': 'Avertizări',
  'zone.count.critical': 'Critice',

  'note.calibrated': 'Măsurătoare calibrată cu o coală albă — canalele sunt egalizate.',

  'tile.helpAria': 'Ce înseamnă: {name}',
  'tile.noMeasurement': 'Fără măsurătoare',
  'tile.outOfScale': 'În afara scalei',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Avertizare',
  'zone.spoken.warning': 'avertizare',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Evoluția în timp',
  'history.pickHint': 'Alege o mărime și un interval',
  'history.metricLabel': 'Mărime',
  'history.rangeAria': 'Intervalul de timp al graficului',
  'history.emptyTitle': 'Fără date pe acest interval',
  'history.emptyText': 'Pornește măsurarea pe ecranul Măsurare — graficul se umple în câteva secunde.',
  'history.tableTitle': 'Ultimele citiri',
  'history.tableHide': 'Ascunde tabelul',
  'history.tableShow': 'Arată tabelul',
  'history.tableCaption': 'Ultimele citiri ale măsurătorii, cea mai nouă sus.',
  'history.tableEmpty': 'Nicio citire. Pornește măsurarea pe ecranul Măsurare.',

  'table.time': 'Ora',
  'table.metric': 'Mărime',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     dłuższy zapis łamał się na dwie linie. */
  'range.1m': '1 min',
  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 zile',
  'range.30d': '30 de zile',

  'chart.now': 'acum',
  'chart.countSub': {
    one: '{n} citire în intervalul ales',
    few: '{n} citiri în intervalul ales',
    other: '{n} de citiri în intervalul ales'
  },
  'chart.aria': '{name}, interval {range}, {count}, ultima valoare {value} {unit}.',
  'chart.ariaZone': '{name}, interval {range}, {count}, ultima valoare {value} {unit}, zonă: {zone}.',
  'chart.ariaEmpty': '{name} — fără date pe intervalul {range}.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Asistenți și funcții auxiliare',
  'tools.note': 'Uneltele te ajută să interpretezi măsurătoarea. Toate sunt disponibile imediat, iar măsurătoarea în sine funcționează independent de ele.',

  'tool.thresholds.sub': 'Când să aprindă o valoare avertizarea',
  'tool.compare.sub': 'Care dintre două lumini este mai blândă',
  'tool.calibration.sub': 'Singura funcție care chiar crește precizia',
  'tool.screenCheck.sub': 'Cinci pași și o concluzie gata despre ecran',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Orarul pragurilor”
     kontra „Orar”. Tak było i tak zostaje. */
  'tool.schedule.title': 'Orarul pragurilor',
  'tool.schedule.sub': 'Alte praguri seara, fără să ții minte de asta',
  'tool.alerts.sub': 'Un semnal când zona critică ține prea mult',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Setări',
  'more.thresholdsSub': 'Când să aprindă o valoare avertizarea',
  'more.docsSub': 'Cum să măsori și ce nu îți spune această măsurătoare',
  'more.appearanceTitle': 'Aspect și accesibilitate',

  'settings.theme': 'Temă',
  'theme.auto': 'Ca în sistem',
  'theme.light': 'Luminoasă',
  'theme.dark': 'Întunecată',

  'settings.textScale': 'Mărimea textului',
  'textScale.100': 'Standard',
  'textScale.115': 'Mai mare (115%)',
  'textScale.130': 'Cel mai mare (130%)',

  'settings.contrast': 'Contrast mai puternic',
  'settings.contrastSub': 'Contururi mai puternice și text secundar mai închis.',
  'settings.sound': 'Sunet la alerte',
  'settings.soundSub': 'Un semnal scurt când se aprinde o alertă de expunere.',
  'settings.vibrate': 'Vibrație la alerte',
  'settings.vibrateSub': 'Funcționează numai pe dispozitivele care o acceptă.',

  'more.dataTitle': 'Date',
  'more.clearHistory': 'Golește istoricul măsurătorilor',
  'more.clearHistorySub': 'Șterge citirile salvate de pe acest dispozitiv. Pragurile, profilurile și setările rămân.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'Aplicația este gratuită în întregime. ',
  'more.supportLink': 'O poți sprijini în mod voluntar.',

  'dialog.clearHistory.title': 'Ștergi istoricul salvat?',
  'dialog.clearHistory.body': {
    one: 'Vom șterge {n} punct de măsurare salvat de pe acest dispozitiv. Această operație nu poate fi anulată. Pragurile, profilurile și setările rămân neatinse.',
    few: 'Vom șterge {n} puncte de măsurare salvate de pe acest dispozitiv. Această operație nu poate fi anulată. Pragurile, profilurile și setările rămân neatinse.',
    other: 'Vom șterge {n} de puncte de măsurare salvate de pe acest dispozitiv. Această operație nu poate fi anulată. Pragurile, profilurile și setările rămân neatinse.'
  },
  'dialog.clearHistory.confirm': 'Șterge istoricul',
  'dialog.clearHistory.cancel': 'Lasă-l',

  'toast.historyCleared': 'Istoricul măsurătorilor a fost șters.',
  'toast.screenUnavailable': 'Acest ecran nu este încă disponibil în această versiune.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'Ce măsoară această aplicație',
  'docs.leadText': 'Camera telefonului privește o suprafață luminată, iar aplicația calculează de cinci ori pe secundă mediile canalelor R, G și B din porțiunea centrală a cadrului. Din aceste trei numere derivă șapte mărimi.',
  'docs.limitsTitle': 'Limitele metodei',
  'docs.limitsText': 'Camera are trei canale de culoare largi, expunere automată și balans de alb automat. Nu măsoară un spectru și nu cunoaște valori absolute, așa că luminozitatea este un indicator relativ, nu lucși. Temperatura de culoare și impactul circadian sunt aproximări calculate din culorile sRGB. Eșantionarea la {rate} Hz vede pâlpâirea doar sub {limit} Hz — pâlpâirea rețelei, de 100 Hz, este în afara razei de acțiune și aplicația nu o va raporta niciodată ca rezultat.',

  'note.howTo.repeat.title': 'Repetă măsurătoarea',
  'note.howTo.repeat.text': 'O singură citire este un instantaneu. Zece-douăzeci de secunde de măsurare dau o imagine mai de încredere.',

  'docs.scale': 'Scală',
  'docs.direction': 'Direcție',
  'docs.directionHigher': 'Mai sus înseamnă mai bine',
  'docs.directionLower': 'Mai jos înseamnă mai blând',
  'docs.privacyTitle': 'Date și confidențialitate',
  'docs.privacyText': 'Imaginea de la cameră nu este trimisă și nu este salvată nicăieri — din fiecare cadru rămân numai trei numere. Măsurătorile, pragurile și setările stau în memoria browserului de pe acest dispozitiv. Aplicația nu face nicio cerere în rețea și funcționează offline.',
  'docs.freeLine': 'Toate cele șapte mărimi, istoricul, graficul, uneltele și modul offline funcționează pentru toată lumea, fără cont și fără plată.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Totul este disponibil',
  'support.heroText': 'Toate cele șapte mărimi, istoricul măsurătorilor, graficul, toate uneltele și modul offline funcționează pentru toată lumea, imediat. Fără cont, fără limite și fără plată.',
  'support.whyTitle': 'De ce te rog',
  'support.whyText': '{app} se face după program și nu câștigă nimic de la nimeni: nu are reclame, nu colectează date și nu are ce vinde. Întreținerea și dezvoltarea mai departe — mărimi noi, corecturi, teste pe alte telefoane — costă timp. Dacă aplicația ți-a fost de folos, poți contribui. Nu ești obligat.',
  'support.whatTitle': 'Ce îți aduce o donație',
  'support.whatText': 'Nimic. Chiar nu deblochează nimic și nu grăbește nimic — aplicația arată și funcționează exact la fel înainte și după. Îți dă doar atât: autorul știe că această muncă i-a folosit cuiva.',
  'support.button': 'Cumpără-mi o cafea',
  'support.pendingTitle': 'Profilul nu este încă legat',
  'support.pendingText': 'Aici nu există încă o adresă la care se poate trimite sprijin. Va apărea în acest loc când va fi gata — până atunci totul în aplicație funcționează exact la fel.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'Butonul deschide pagina externă Buy Me a Coffee într-o filă nouă. Este singurul moment în care ceva părăsește acest dispozitiv — și se întâmplă abia după ce apeși. Măsurătorile, istoricul și setările rămân aici.',
  'privacy.externalPending': 'Când adresa va fi disponibilă, apăsarea butonului va deschide o pagină externă într-o filă nouă. Acela va fi singurul moment în care ceva părăsește acest dispozitiv. Măsurătorile, istoricul și setările rămân aici.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (rezervă în ui-core.js)',
  'boot.need.metrics': 'nicio valoare nu va fi calculată',
  'boot.need.bus': 'modulele vor înceta să se vadă',
  'boot.need.ui': 'ecranele nu vor putea fi schimbate',
  'boot.need.engine': 'camera și măsurarea nu vor porni',
  'boot.need.support': 'ecranul Sprijin va fi gol',
  'boot.need.tools': 'fila Unelte va fi goală',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'Aceste module nu s-au încărcat: {list}.',
  'boot.consoleHint': 'Verifică ordinea și căile etichetelor <script> din index.html.',
  'boot.incompleteTitle': 'Aplicația s-a încărcat incomplet',
  'boot.incompleteText': '{missing} Reîncarcă pagina; dacă asta nu ajută, fișierele de pe server sunt incomplete.',
  'boot.newVersion': 'Există o versiune nouă a aplicației.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'Ce fac pragurile. ',
  'thresholds.noteText': 'Pragul de avertizare aprinde starea galbenă, pragul critic pe cea roșie. Modificarea are efect imediat — inclusiv asupra citirii aflate deja pe ecran. Îți poți salva propriul set de praguri sub un nume și te poți întoarce la el oricând.',
  'thresholds.profilesTitle': 'Profiluri de praguri',
  'thresholds.profilesSub': 'Cele trei încorporate și ale tale',
  'thresholds.customName': 'Numele profilului tău',
  'thresholds.customPlaceholder': 'de exemplu Dormitor seara',
  'thresholds.save': 'Salvează pragurile curente',
  'thresholds.saveHelp': 'Salvează exact pragurile setate mai sus.',

  'profile.builtin.default.name': 'Implicit',
  'profile.builtin.default.desc': 'Pragurile din catalogul mărimilor — punctul de plecare pentru toate măsurătorile.',
  'profile.builtin.evening.name': 'Seara — blând',
  'profile.builtin.evening.desc': 'Avertizează mai devreme despre culoarea rece și despre impactul circadian.',
  'profile.builtin.work.name': 'Lucru la birou',
  'profile.builtin.work.desc': 'Permite lumină de zi luminoasă și rece; urmărește pâlpâirea și uniformitatea.',
  'profile.custom.desc': 'Profil propriu salvat {date}.',

  'toast.thresholdsReset': 'Pragurile implicite au fost restabilite.',
  'toast.thresholdOrder': 'Pragul de avertizare trebuie să fie mai mic decât cel critic.',
  'toast.thresholdOrderInverted': 'Pentru această mărime pragul de avertizare trebuie să fie mai mare decât cel critic.',
  'toast.profileNameMissing': 'Introdu un nume de profil.',
  'toast.profileSaved': 'Profilul „{name}” a fost salvat.',
  'toast.profileApplied': 'Profilul „{name}” a fost aplicat.',
  'toast.profileApplyFailed': 'Acest profil nu a putut fi aplicat.',
  'toast.profileRemoved': 'Profil șters.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'La ce folosește orarul. ',
  'schedule.noteText': 'Seara au sens alte praguri decât la prânz. O regulă „de la–până la” schimbă profilul singură, ca să nu fie nevoie să ții minte. Orarul nu pornește și nu oprește niciodată măsurarea.',
  'schedule.toggle': 'Activează comutarea automată',
  'schedule.toggleSub': 'Verificat în fiecare minut după ceasul dispozitivului.',
  'schedule.emptyTitle': 'Nicio regulă',
  'schedule.emptyText': 'Adaugă prima regulă cu butonul de mai jos.',
  'schedule.add': 'Adaugă o regulă',
  'schedule.to': 'până la',
  'schedule.profile': 'Profil',
  'schedule.fromAria': 'Regula {n}: ora de început',
  'schedule.toAria': 'Regula {n}: ora de sfârșit',
  'toast.scheduleTimeFormat': 'Introdu orele în formatul 22:00.',
  'toast.scheduleEnded': 'Orarul s-a încheiat — pragurile anterioare au revenit.',
  'toast.scheduleApplied': 'Orarul a activat profilul „{name}”.',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'Ce face alerta. ',
  'alerts.noteText': 'Urmărește o singură mărime și se face auzită abia atunci când aceasta ține zona aleasă fără întrerupere timpul setat. Nu oprește niciodată măsurarea și nu acoperă butoanele.',
  'alerts.toggle': 'Activează alertele de expunere',
  'alerts.toggleSub': 'Funcționează numai în timpul unei măsurători în curs.',
  'alerts.metric': 'Mărimea urmărită',
  'alerts.level': 'De la ce zonă',
  'alerts.level.warning': 'De avertizare și mai sus',
  'alerts.level.critical': 'Numai cea critică',
  'alerts.sustain': 'După câte secunde fără întrerupere',
  'alerts.sustainHelp': 'Timpii mai scurți dau mai multe alarme false când miști telefonul.',
  'alerts.sound': 'Un semnal sonor scurt',
  'alerts.soundSub': 'Sunetul este generat local. Poate fi oprit și global, pe ecranul Mai multe.',
  'alerts.barTitle': 'Alertă de expunere',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} ține zona de avertizare de {seconds} s — acum {value} {unit}.',
  'alerts.message.critical': '{name} ține zona critică de {seconds} s — acum {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'Cum să compari. ',
  'compare.noteText': 'Pornește măsurarea, îndreaptă camera spre prima sursă și salveaz-o ca A. Fără să schimbi distanța sau unghiul, comută lumina și salvează B. Comparația are sens numai dacă scena este aceeași.',
  'compare.slotA': 'Lumina A',
  'compare.slotB': 'Lumina B',
  'compare.save': 'Salvează citirea curentă',
  'compare.savedAt': 'Salvat {date}, {time}',
  'compare.empty': 'Încă nu s-a salvat nimic.',
  'compare.verdictTitle': 'Rezultatul comparației',
  'compare.verdictEmpty': 'Salvează ambele lumini ca să vezi care este mai blândă.',
  'compare.notEnough': 'Prea puține date pentru a compara aceste două măsurători.',
  'compare.tie': 'Ambele surse ies practic la fel ({metric}: {a} și {b} {unit}). Diferența se încadrează în zgomotul măsurătorii.',
  'compare.betterA': 'Mai blândă este lumina A — {metric} este de {better} {unit} față de {worse} {unit}.',
  'compare.betterB': 'Mai blândă este lumina B — {metric} este de {better} {unit} față de {worse} {unit}.',
  'compare.clear': 'Golește comparația',
  'toast.compareSavedA': 'Lumina A a fost salvată.',
  'toast.compareSavedB': 'Lumina B a fost salvată.',
  'toast.compareCleared': 'Comparație golită.',
  'toast.measureFirst': 'Pornește mai întâi măsurarea pe ecranul Măsurare.',

  /* Nazwa wielkości w środku zdania. Po rumuńsku małą literą i z rodzajnikiem,
     po niemiecku wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. */
  'metric.share.nameLower': 'ponderea albastrului',
  'metric.brightness.nameLower': 'luminozitatea scenei',
  'metric.kelvin.nameLower': 'temperatura de culoare',
  'metric.melanopic.nameLower': 'impactul circadian',
  'metric.flicker.nameLower': 'pâlpâirea',
  'metric.uniformity.nameLower': 'uniformitatea',
  'metric.comfort.nameLower': 'confortul vizual',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'De ce funcționează. ',
  'calib.noteText': 'Senzorul camerei are o abatere constantă între canale. Măsurarea unei coli albe arată cât de mare este și permite scăderea ei. Este singura funcție din această aplicație care chiar crește precizia — și tot nu transformă camera într-un spectrometru.',
  'calib.step1': 'Pune o coală albă sub lumina măsurată',
  'calib.step2': 'Pornește măsurarea și umple cadrul cu coala',
  'calib.step3': 'Apasă „Calibrează” și nu mișca telefonul timp de 3 secunde',
  'calib.done': 'Calibrat {date}, {time}.',
  'calib.none': 'Fără calibrare. Măsurarea funcționează; tratează valorile comparativ.',
  'calib.gain': 'Amplificare {channel}',
  'calib.gainsLabel': 'Amplificările canalelor',
  'calib.gainsUnset': 'nesetate',
  'calib.start': 'Calibrează (3 s)',
  'calib.clear': 'Șterge calibrarea',
  'toast.calibCleared': 'Calibrare ștearsă.',
  'calib.error.noEngine': 'Modulul de măsurare nu este disponibil.',
  'calib.error.notRunning': 'Pornește mai întâi măsurarea și îndreaptă camera spre o coală albă.',
  'calib.error.busy': 'Calibrarea este deja în curs.',
  'calib.error.tooFewSamples': 'Prea puține eșantioane. Verifică dacă măsurarea chiar funcționează.',
  'calib.error.tooDark': 'Imaginea este prea întunecată pentru calibrare. Luminează mai bine coala și încearcă din nou.',
  'calib.error.tooSkewed': 'Abaterea canalelor este prea mare ca să fie acceptată drept calibrare. Folosește o coală albă în lumină uniformă.',
  'calib.ok': 'Calibrat. Temperatura de culoare și impactul circadian vor fi acum mai precise.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'La ce folosește. ',
  'screencheck.noteText': 'Cinci pași verifică un monitor așa cum îl verifică o recenzie: albul la două luminozități, uniformitatea iluminării de fundal și dacă modul de noapte al sistemului schimbă cu adevărat ceva. Asistentul citește o măsurătoare în curs; nu o pornește el însuși.',
  'screencheck.step.white100.title': 'Alb la luminozitate maximă',
  'screencheck.step.white100.hint': 'Deschide o pagină albă pe monitor, pune luminozitatea la maximum și umple cadrul cu ecranul.',
  'screencheck.step.white20.title': 'Alb la luminozitate scăzută',
  'screencheck.step.white20.hint': 'Scade luminozitatea monitorului la aproximativ o cincime și nu schimba cadrul.',
  'screencheck.step.corners.title': 'Colțurile ecranului',
  'screencheck.step.corners.hint': 'Revino la luminozitate maximă și arată camerei tot ecranul — verificăm uniformitatea iluminării de fundal.',
  'screencheck.step.nightOff.title': 'Mod de noapte oprit',
  'screencheck.step.nightOff.hint': 'Asigură-te că filtrul de lumină albastră este oprit.',
  'screencheck.step.nightOn.title': 'Mod de noapte pornit',
  'screencheck.step.nightOn.hint': 'Pornește filtrul de lumină albastră din sistem și repetă același cadru.',
  'screencheck.stepHeading': 'Pasul {n} din {total}: {title}',
  'screencheck.idleTitle': 'Asistentul nu este pornit',
  'screencheck.idleHint': 'Pornește măsurarea pe ecranul Măsurare, apoi revino aici și apasă „Începe”.',
  'screencheck.next': 'Salvează pasul și mergi mai departe',
  'screencheck.cancel': 'Întrerupe',
  'screencheck.start': 'Începe asistentul',
  'screencheck.clearResult': 'Golește rezultatul',
  'screencheck.resultTitle': 'Rezultat',
  'screencheck.resultEmpty': 'Încă nu s-a salvat niciun pas.',
  'screencheck.resultPartial': 'S-au salvat {done} din {total} pași. Concluziile vor apărea când va fi ce compara.',
  'screencheck.note.uniformityLow': 'Uniformitatea iluminării de fundal este de {value}% — se văd diferențe clare de luminozitate în cadru.',
  'screencheck.note.uniformityOk': 'Iluminarea de fundal este uniformă ({value}%).',
  'screencheck.note.nightWorks': 'Modul de noapte coboară ponderea albastrului cu {value} puncte procentuale — funcționează.',
  'screencheck.note.nightWeak': 'Modul de noapte schimbă ponderea albastrului cu numai {value} puncte procentuale. Este mai puțin decât dă de obicei un filtru de sistem.',
  'screencheck.note.pwm': 'La luminozitate scăzută pâlpâirea crește de la {from}% la {to}% — semnul tipic al reglării prin modulație în durată (PWM).',
  'toast.screencheckDone': 'Asistentul s-a încheiat. Rezultatul este mai jos.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'De unde vin aceste numere. ',
  'reports.noteText': 'Raportul se calculează din istoricul salvat pe acest dispozitiv — câte un punct la fiecare cinci secunde. Motorul îl adună de la prima măsurătoare, așa că raportul este gata imediat.',
  'reports.rangeAria': 'Intervalul raportului',
  'reports.day': 'Ultimele 24 de ore',
  'reports.week': 'Ultimele 7 zile',
  'reports.date': 'Raport pentru ziua {date}.',
  'report.headerDay': 'Ziua de la {from} la {to} — {count}.',
  'report.headerWeek': 'Săptămâna de la {from} la {to} — {count}.',
  'count.points': { one: '{n} punct', few: '{n} puncte', other: '{n} de puncte' },
  'count.samples': { one: '{n} eșantion', few: '{n} eșantioane', other: '{n} de eșantioane' },
  'report.emptyTitle': 'Fără date în această perioadă',
  'report.emptyText': 'Pornește măsurarea pe ecranul Măsurare — istoricul se salvează singur.',
  'report.colAvg': 'Medie',
  'report.colMin': 'Minim',
  'report.colMax': 'Maxim',
  'report.zonesTitle': 'Distribuția zonelor',
  'report.worstHour': 'Cea mai proastă oră din zi',
  'report.worstHourNone': 'niciuna clară',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'Ce poți face cu asta',
  'report.disclaimerTitle': 'Acesta nu este un sfat medical. ',
  'report.disclaimerText': 'Concluziile decurg exclusiv din ceea ce a văzut camera acestui telefon. Aplicația nu măsoară un spectru, nu cunoaște lucșii și nu pune niciun diagnostic.',

  'advice.melanopic': 'Impactul circadian mediu a fost de {value}×. Seara merită să cobori sub 0,50 — cel mai simplu cu un bec mai cald sau cu modul de noapte.',
  'advice.kelvin': 'Lumina a fost rece (în medie {value} K). Pentru lucru este fără cusur; cu două ore înainte de culcare este mai bine sub 3000 K.',
  'advice.flicker': 'S-a detectat o pâlpâire vizibilă (în medie {value}%). De obicei este de vină un variator ieftin sau sursa iluminării de fundal.',
  'advice.uniformity': 'Lumina se distribuie neuniform ({value}%). Mutarea lămpii sau schimbarea unghiului dau de obicei mai mult decât schimbarea becului.',
  'advice.worstHour': 'Cea mai proastă oră din zi este {hour}:00 — acolo se strâng cele mai multe citiri în afara normei.',
  'advice.none': 'În această perioadă nimic nu iese din normă. Cel mai mult ar da acum o comparație a două surse de lumină în comparația A/B.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'Formatul fișierului. ',
  'export.noteText': 'Punct și virgulă ca separator de coloane, virgulă ca separator zecimal, codificare UTF-8 cu marcaj BOM. Un asemenea fișier se deschide în Excel-ul românesc fără să configurezi nimic.',
  'export.range': 'Intervalul de date',
  'export.columns': 'Coloanele din fișier',
  'export.chipFilled': ' — coloană completată',
  'export.help': 'Fișierul conține toate cele șapte coloane — motorul le calculează de la prima măsurătoare și toate ajung în fișier.',
  'export.run': 'Salvează fișierul CSV',
  'export.previewEmpty': 'Nicio citire pe acest interval. Pornește măsurarea — istoricul se salvează singur.',
  'csv.range.hour': 'Ultima oră',
  'csv.range.day': 'Ultimele 24 de ore',
  'csv.range.week': 'Ultimele 7 zile',
  'csv.range.month': 'Ultimele 30 de zile',
  'csv.colDate': 'Data',
  'csv.colTime': 'Ora',
  'csv.colZone': 'Zona',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'În intervalul ales nu există nicio citire.',
  'toast.exportFailed': 'Acest browser nu a permis salvarea fișierului.',
  'toast.exportSaved': {
    one: 'Fișierul {filename} a fost salvat ({n} rând).',
    few: 'Fișierul {filename} a fost salvat ({n} rânduri).',
    other: 'Fișierul {filename} a fost salvat ({n} de rânduri).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} h {m} min',
  'duration.ms': '{m} min {s} s',
  'duration.s': '{s} s'
});
