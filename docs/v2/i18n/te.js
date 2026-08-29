/* docs/v2/i18n/te.js — słownik WERSJI 2, telugu.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/te.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej.
 *
 * TERMINOLOGIA: wzięta co do znaku z docs/shared/i18n/te.js i nigdzie nie
 * ruszona — నీలి వాటా, దృశ్య ప్రకాశం, వర్ణ ఉష్ణోగ్రత, దైనందిన లయ ప్రభావం,
 * మిణుకు, ఏకరూపత, కంటి సౌకర్యం; strefy పరిధిలో / క్లిష్టం, jednostki czasu
 * గం. / ని. / సె. Wersja v5 tej aplikacji nazywa te same wielkości inaczej
 * (ఫ్లికర్, సర్కేడియన్ ప్రభావం, దృష్టి సౌకర్యం) — tutaj rozstrzyga warstwa
 * wspólna, bo to ona wchodzi na TEN ekran razem z tym plikiem.
 * Poza słownikiem wspólnym ustalono po jednym odpowiedniku na pojęcie:
 * wielkość సూచిక, pomiar కొలత, pojedynczy odczyt రీడింగ్, próg పరిమితి,
 * profil ప్రొఫైల్, kalibracja క్రమాంకనం, harmonogram షెడ్యూల్, alert అలర్ట్,
 * kreator విజార్డ్, wykres గ్రాఫ్, raport నివేదిక, strefa జోన్, kadr ఫ్రేమ్.
 *
 * REJESTR: standardowe telugu pisane, tryb uprzejmy -ండి tam, gdzie aplikacja
 * zwraca się do użytkownika; przyciski krótkie, w trybie rozkazującym prostym
 * (మూసివేయి, తొలగించు, వర్తింపజేయి) — tak pisze telugu w systemie
 * i w przeglądarce. Teksty pomocy są pełnymi zdaniami.
 *
 * „Start” i „Stop” zostają w alfabecie łacińskim, bo tak nazywa ten przycisk
 * warstwa wspólna: 'engine.idle' w docs/shared/i18n/te.js mówi wprost
 * „కెమెరాను ఆన్ చేయడానికి “Start” నొక్కండి”. Przetłumaczenie podpisu tutaj
 * rozjechałoby zasłonę podglądu z przyciskiem, który ma być naciśnięty.
 *
 * LICZEBNIKI: telugu ma w CLDR dwie kategorie — `one` i `other`
 * (Intl.PluralRules('te')). Rzeczownik naprawdę się odmienia (బిందువు →
 * బిందువులు, నమూనా → నమూనాలు), więc obie formy są różne. Cyfry łacińskie
 * i kropka dziesiętna, jak w warstwie wspólnej.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (i dlaczego):
 *   'zone.warning'        — wspólne mówi „జాగ్రత్త”, ta wersja od zawsze mówi
 *                           mocniej: „హెచ్చరిక” (i „హెచ్చరికలు” w podsumowaniu);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu (telugu nie zna
 *                           wielkiej litery, więc brzmi identycznie);
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi „కొలతలు”,
 *                           a nie „కొలత”.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules. Patrz nagłówek docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['te'] = Object.assign(window.I18nData['te'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'కాంతి మానిటర్ — నీలి కాంతి కొలత',
  'app.description': 'కాంతి మానిటర్ — ఫోన్ కెమెరాతో కాంతిలోని నీలి వాటాను కొలుస్తుంది. ఏడు సూచికలు, గ్రాఫ్, చరిత్ర. అంతా అందుబాటులో ఉంది — ఖాతా అక్కర్లేదు, రుసుము లేదు.',
  'app.skipToContent': 'ముఖ్య కంటెంట్‌కు వెళ్ళు',
  'app.measuring': 'కొలుస్తోంది',
  'app.docsButton': 'డాక్యుమెంటేషన్, వివరణలు',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — వెర్షన్ 2',

  'nav.aria': 'ప్రధాన నావిగేషన్',
  'nav.tablistAria': 'యాప్ స్క్రీన్‌లు',
  'nav.measure': 'కొలత',
  'nav.history': 'చరిత్ర',
  'nav.tools': 'సాధనాలు',
  'nav.support': 'మద్దతు',
  'nav.more': 'మరిన్ని',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'డాక్యుమెంటేషన్',
  'panel.thresholds': 'పరిమితులు, ప్రొఫైల్‌లు',
  'panel.reports': 'నివేదికలు',
  'panel.export': 'డేటా ఎగుమతి',
  'panel.compare': 'A/B పోలిక',
  'panel.calibration': 'తెల్ల కాగితంతో క్రమాంకనం',
  'panel.screenCheck': 'నా మానిటర్‌ను పరీక్షించు',
  'panel.schedule': 'షెడ్యూల్',
  'panel.alerts': 'ఎక్స్‌పోజర్ అలర్ట్‌లు',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'వెనక్కి',
  'action.close': 'మూసివేయి',
  'action.refresh': 'రిఫ్రెష్',
  'action.apply': 'వర్తింపజేయి',
  'action.delete': 'తొలగించు',
  'action.hide': 'దాచు',
  /* Podpisy dwuprzyciskowego sterowania kamerą — patrz nagłówek pliku. */
  'action.start': 'Start',
  'action.stop': 'Stop',
  'action.switch': 'మార్చు',
  'action.switchAria': 'కెమెరా మార్చు: ముందుది లేదా వెనుకది',
  'action.resetDefaults': 'డిఫాల్ట్‌లను పునరుద్ధరించు',
  'action.reports': 'నివేదికలు',
  'action.exportCsv': 'CSV ఎగుమతి',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'స్క్రీన్: {name}',
  'a11y.measureStarted': 'కొలత ప్రారంభమైంది.',
  'a11y.measureStopped': 'కొలత ఆగింది.',
  'a11y.measureStoppedSummary': 'కొలత ఆగింది. సమయం: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'పరిమితుల ప్రొఫైల్ వర్తింపజేయబడింది.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'నిర్ధారణ',
  'dialog.confirm': 'నిర్ధారించు',
  'dialog.cancel': 'రద్దు',
  'dialog.infoTitle': 'సమాచారం',
  'dialog.ok': 'అర్థమైంది',

  'help.sheetTitle': 'ఈ సూచిక గురించి',
  'help.unit': 'యూనిట్',
  'help.scaleRange': 'స్కేల్ పరిధి',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'హెచ్చరిక',
  'threshold.crit': 'క్లిష్టం',
  'threshold.warnLabel': 'హెచ్చరిక పరిమితి',
  'threshold.critLabel': 'క్లిష్ట పరిమితి',
  'threshold.warnAria': '{name} — పరిమితి: హెచ్చరిక',
  'threshold.critAria': '{name} — పరిమితి: క్లిష్టం',

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

  'firstRun.title': 'ఎలా కొలవాలి',
  'firstRun.text': '“Start” నొక్కి, వెలుతురు పడిన ఉపరితలం వైపు ఫోన్‌ను గురిపెట్టి, కొన్ని సెకన్ల పాటు కదపకుండా పట్టుకోండి. యాప్ నిజంగా చదివే భాగాన్ని ప్రివ్యూలోని ఫ్రేమ్ చూపుతుంది.',
  'firstRun.close': 'సూచనను మూసివేయి',

  'camera.live': 'లైవ్',
  'camera.idle': 'కెమెరా ఆఫ్‌లో ఉంది. “Start” నొక్కి, వెలుతురు పడిన ఉపరితలం వైపు ఫోన్‌ను గురిపెట్టి, కొన్ని సెకన్ల పాటు కదపకుండా పట్టుకోండి.',
  'camera.stopped': 'కొలత ఆగింది. మళ్ళీ కొలవడానికి “Start” నొక్కండి.',

  'error.cameraStart': 'కెమెరాను ప్రారంభించడం సాధ్యం కాలేదు.',
  'error.engineMissing': 'కొలత మాడ్యూల్ లోడ్ కాలేదు.',

  'metrics.sevenTitle': 'ఏడు సూచికలు',
  'measure.tilesSub': 'సెకనుకు 5 సార్లు తాజా అవుతాయి',

  'session.title': 'ఈ సెషన్',
  'session.duration': 'కొలత సమయం',
  'session.samples': 'నమూనాల సంఖ్య',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     „హెచ్చరికలు” to nie to samo słowo co „హెచ్చరిక” pod suwakiem. */
  'zone.count.good': 'పరిధిలో',
  'zone.count.warning': 'హెచ్చరికలు',
  'zone.count.critical': 'క్లిష్టం',

  'note.calibrated': 'తెల్ల కాగితంతో క్రమాంకనం చేసిన కొలత — ఛానెళ్ళు సరిచేయబడ్డాయి.',

  'tile.helpAria': 'దీని అర్థం: {name}',
  'tile.noMeasurement': 'కొలత లేదు',
  'tile.outOfScale': 'స్కేల్ దాటి',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'హెచ్చరిక',
  'zone.spoken.warning': 'హెచ్చరిక',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'కాలక్రమంలో మార్పు',
  'history.pickHint': 'సూచికను, పరిధిని ఎంచుకోండి',
  'history.metricLabel': 'సూచిక',
  'history.rangeAria': 'గ్రాఫ్ కాల పరిధి',
  'history.emptyTitle': 'ఈ పరిధిలో డేటా లేదు',
  'history.emptyText': 'కొలత స్క్రీన్‌లో కొలత ప్రారంభించండి — కొన్ని సెకన్లలో గ్రాఫ్ నిండుతుంది.',
  'history.tableTitle': 'తాజా రీడింగ్‌లు',
  'history.tableHide': 'పట్టికను దాచు',
  'history.tableShow': 'పట్టికను చూపు',
  'history.tableCaption': 'తాజా కొలత రీడింగ్‌లు, కొత్తవి పైన.',
  'history.tableEmpty': 'రీడింగ్‌లు లేవు. కొలత స్క్రీన్‌లో కొలత ప్రారంభించండి.',

  'table.time': 'సమయం',
  'table.metric': 'సూచిక',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     dłuższy zapis łamał się na dwie linie. */
  'range.1m': '1 నిమి',
  'range.1h': '1 గం',
  'range.24h': '24 గం',
  'range.7d': '7 రోజులు',
  'range.30d': '30 రోజులు',

  'chart.now': 'ఇప్పుడు',
  'chart.countSub': {
    one: 'ఎంచుకున్న పరిధిలో {n} రీడింగ్',
    other: 'ఎంచుకున్న పరిధిలో {n} రీడింగ్‌లు'
  },
  'chart.aria': '{name}, పరిధి {range}, {count}, చివరి విలువ {value} {unit}.',
  'chart.ariaZone': '{name}, పరిధి {range}, {count}, చివరి విలువ {value} {unit}, జోన్: {zone}.',
  'chart.ariaEmpty': '{name} — {range} పరిధిలో డేటా లేదు.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'విజార్డ్‌లు, సహాయక ఫీచర్లు',
  'tools.note': 'కొలతను అర్థం చేసుకోవడానికి సాధనాలు సాయపడతాయి. అన్నీ వెంటనే అందుబాటులో ఉంటాయి, కొలత మాత్రం వాటితో సంబంధం లేకుండా పనిచేస్తుంది.',

  'tool.thresholds.sub': 'ఏ విలువ వద్ద హెచ్చరిక వెలగాలి',
  'tool.compare.sub': 'రెండు కాంతుల్లో ఏది మృదువైనది',
  'tool.calibration.sub': 'కచ్చితత్వాన్ని నిజంగా పెంచే ఒకే ఒక్క ఫీచర్',
  'tool.screenCheck.sub': 'ఐదు దశలు, స్క్రీన్ గురించి సిద్ధమైన తీర్పు',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „పరిమితుల షెడ్యూల్”
     kontra „షెడ్యూల్”. Tak było i tak zostaje. */
  'tool.schedule.title': 'పరిమితుల షెడ్యూల్',
  'tool.schedule.sub': 'సాయంత్రం వేరే పరిమితులు, గుర్తుపెట్టుకోవాల్సిన పని లేకుండా',
  'tool.alerts.sub': 'క్లిష్ట జోన్ మరీ ఎక్కువసేపు నిలిస్తే ఒక సంకేతం',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'సెట్టింగ్‌లు',
  'more.thresholdsSub': 'ఏ విలువ వద్ద హెచ్చరిక వెలగాలి',
  'more.docsSub': 'ఎలా కొలవాలి, ఈ కొలత ఏమి చెప్పదు',
  'more.appearanceTitle': 'రూపం, ప్రాప్యత',

  'settings.theme': 'థీమ్',
  'theme.auto': 'సిస్టమ్ ప్రకారం',
  'theme.light': 'లేత',
  'theme.dark': 'ముదురు',

  'settings.textScale': 'అక్షరాల పరిమాణం',
  'textScale.100': 'సాధారణం',
  'textScale.115': 'పెద్దది (115%)',
  'textScale.130': 'అతి పెద్దది (130%)',

  'settings.contrast': 'ఎక్కువ కాంట్రాస్ట్',
  'settings.contrastSub': 'బలమైన అంచులు, ముదురు సహాయక అక్షరాలు.',
  'settings.sound': 'అలర్ట్ శబ్దం',
  'settings.soundSub': 'ఎక్స్‌పోజర్ అలర్ట్ వెలిగినప్పుడు ఒక చిన్న సంకేతం.',
  'settings.vibrate': 'అలర్ట్‌ల వద్ద వైబ్రేషన్',
  'settings.vibrateSub': 'దాన్ని సమర్థించే పరికరాల్లో మాత్రమే పనిచేస్తుంది.',

  'more.dataTitle': 'డేటా',
  'more.clearHistory': 'కొలత చరిత్రను తుడిచివేయి',
  'more.clearHistorySub': 'ఈ పరికరంలో సేవ్ చేసిన రీడింగ్‌లను తొలగిస్తుంది. పరిమితులు, ప్రొఫైల్‌లు, సెట్టింగ్‌లు అలాగే ఉంటాయి.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'యాప్ మొత్తం ఉచితం. ',
  'more.supportLink': 'మీరు స్వచ్ఛందంగా దీనికి మద్దతు ఇవ్వవచ్చు.',

  'dialog.clearHistory.title': 'సేవ్ చేసిన చరిత్రను తొలగించాలా?',
  'dialog.clearHistory.body': {
    one: 'ఈ పరికరం నుండి సేవ్ చేసిన {n} కొలత బిందువును తొలగిస్తాం. దీన్ని వెనక్కి తీసుకోలేం. పరిమితులు, ప్రొఫైల్‌లు, సెట్టింగ్‌లు మాత్రం చెక్కుచెదరకుండా ఉంటాయి.',
    other: 'ఈ పరికరం నుండి సేవ్ చేసిన {n} కొలత బిందువులను తొలగిస్తాం. దీన్ని వెనక్కి తీసుకోలేం. పరిమితులు, ప్రొఫైల్‌లు, సెట్టింగ్‌లు మాత్రం చెక్కుచెదరకుండా ఉంటాయి.'
  },
  'dialog.clearHistory.confirm': 'చరిత్రను తొలగించు',
  'dialog.clearHistory.cancel': 'ఉంచు',

  'toast.historyCleared': 'కొలత చరిత్ర తొలగించబడింది.',
  'toast.screenUnavailable': 'ఈ వెర్షన్‌లో ఆ స్క్రీన్ ఇంకా అందుబాటులో లేదు.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'ఈ యాప్ ఏమి కొలుస్తుంది',
  'docs.leadText': 'ఫోన్ కెమెరా వెలుతురు పడిన ఉపరితలం వైపు చూస్తుంది, యాప్ సెకనుకు ఐదు సార్లు ఫ్రేమ్ మధ్య భాగంలోని R, G, B ఛానెళ్ళ సగటులను లెక్కిస్తుంది. ఆ మూడు సంఖ్యల నుండే ఏడు సూచికలను తీస్తుంది.',
  'docs.limitsTitle': 'పద్ధతి హద్దులు',
  'docs.limitsText': 'కెమెరాకు మూడు వెడల్పాటి వర్ణ ఛానెళ్ళు, ఆటోమేటిక్ ఎక్స్‌పోజర్, ఆటోమేటిక్ వైట్ బ్యాలెన్స్ ఉంటాయి. అది వర్ణపటాన్ని కొలవదు, సంపూర్ణ విలువలు దానికి తెలియవు — అందుకే ప్రకాశం అనేది సాపేక్ష సూచిక, లక్స్ కాదు. వర్ణ ఉష్ణోగ్రతా, దైనందిన లయ ప్రభావమూ sRGB రంగుల నుండి లెక్కించిన అంచనాలు. {rate} Hz నమూనా సేకరణ {limit} Hz కంటే తక్కువ మిణుకును మాత్రమే చూడగలదు — విద్యుత్ సరఫరాలోని 100 Hz దీని అందుబాటులో లేదు, యాప్ దాన్ని ఎప్పుడూ ఫలితంగా చూపదు.',

  'note.howTo.repeat.title': 'కొలతను మళ్ళీ చేయండి',
  'note.howTo.repeat.text': 'ఒక్క రీడింగ్ ఒక క్షణం చిత్రం మాత్రమే. పది-పదిహేను సెకన్ల కొలత మరింత నమ్మదగిన చిత్రాన్ని ఇస్తుంది.',

  'docs.scale': 'స్కేల్',
  'docs.direction': 'దిశ',
  'docs.directionHigher': 'ఎక్కువైతే మేలు',
  'docs.directionLower': 'తక్కువైతే మృదువు',
  'docs.privacyTitle': 'డేటా, గోప్యత',
  'docs.privacyText': 'కెమెరా చిత్రం ఎక్కడికీ పంపబడదు, ఎక్కడా భద్రపరచబడదు — ప్రతి ఫ్రేమ్ నుండి మూడు సంఖ్యలు మాత్రమే మిగులుతాయి. కొలతలు, పరిమితులు, సెట్టింగ్‌లు ఈ పరికరంలోని బ్రౌజర్ నిల్వలో ఉంటాయి. యాప్ ఏ నెట్‌వర్క్ అభ్యర్థనా చేయదు, ఆఫ్‌లైన్‌లో పనిచేస్తుంది.',
  'docs.freeLine': 'ఏడు సూచికలూ, చరిత్ర, గ్రాఫ్, సాధనాలు, ఆఫ్‌లైన్ మోడ్ — అన్నీ అందరికీ పనిచేస్తాయి; ఖాతా అక్కర్లేదు, రుసుము లేదు.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'అంతా అందుబాటులో ఉంది',
  'support.heroText': 'ఏడు సూచికలూ, కొలత చరిత్ర, గ్రాఫ్, అన్ని సాధనాలూ, ఆఫ్‌లైన్ మోడ్ — అన్నీ అందరికీ వెంటనే పనిచేస్తాయి. ఖాతా లేదు, హద్దులు లేవు, రుసుము లేదు.',
  'support.whyTitle': 'నేను ఎందుకు అడుగుతున్నాను',
  'support.whyText': '{app} పని వేళల తర్వాత తయారవుతోంది, ఎవరిపైనా సంపాదించడం లేదు: ప్రకటనలు లేవు, డేటా సేకరణ లేదు, అమ్మడానికి ఏమీ లేదు. దీన్ని నిలబెట్టడానికీ ముందుకు తీసుకెళ్ళడానికీ — కొత్త సూచికలు, సవరణలు, మరిన్ని ఫోన్లలో పరీక్షలు — సమయం పడుతుంది. యాప్ మీకు ఉపయోగపడితే, మీరు కొంత దోహదం చేయవచ్చు. చేయాల్సిన అవసరం లేదు.',
  'support.whatTitle': 'విరాళంతో వచ్చేది',
  'support.whatText': 'ఏమీ లేదు. నిజంగానే అది దేన్నీ తెరవదు, దేన్నీ వేగవంతం చేయదు — దానికి ముందూ తర్వాతా యాప్ సరిగ్గా ఒకేలా కనిపిస్తుంది, ఒకేలా పనిచేస్తుంది. అది ఇచ్చేది ఒక్కటే: ఈ పని ఎవరికో ఉపయోగపడిందని రచయితకు తెలియడం.',
  'support.button': 'నాకో కాఫీ కొనండి',
  'support.pendingTitle': 'ప్రొఫైల్ ఇంకా అనుసంధానం కాలేదు',
  'support.pendingText': 'మద్దతు పంపడానికి ఇక్కడ ఇంకా చిరునామా లేదు. అది సిద్ధమైనప్పుడు ఈ చోటే కనిపిస్తుంది — అప్పటి వరకూ యాప్‌లో అంతా సరిగ్గా ఇలాగే పనిచేస్తుంది.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'బటన్ Buy Me a Coffee అనే బయటి పేజీని కొత్త ట్యాబ్‌లో తెరుస్తుంది. ఈ పరికరం నుండి ఏదైనా బయటకు వెళ్ళే ఏకైక క్షణం అదే — అదీ మీరు దాన్ని నొక్కిన తర్వాతే. కొలతలు, చరిత్ర, సెట్టింగ్‌లు ఇక్కడే ఉంటాయి.',
  'privacy.externalPending': 'చిరునామా అందుబాటులోకి వచ్చాక, బటన్ నొక్కితే ఒక బయటి పేజీ కొత్త ట్యాబ్‌లో తెరుచుకుంటుంది. ఈ పరికరం నుండి ఏదైనా బయటకు వెళ్ళే ఏకైక క్షణం అదే అవుతుంది. కొలతలు, చరిత్ర, సెట్టింగ్‌లు ఇక్కడే ఉంటాయి.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (ui-core.js లో ప్రత్యామ్నాయం)',
  'boot.need.metrics': 'ఏ విలువా లెక్కించబడదు',
  'boot.need.bus': 'మాడ్యూళ్ళు ఒకదాన్నొకటి చూడలేవు',
  'boot.need.ui': 'స్క్రీన్‌లు మార్చడం కుదరదు',
  'boot.need.engine': 'కెమెరా, కొలత మొదలవ్వవు',
  'boot.need.support': 'మద్దతు స్క్రీన్ ఖాళీగా ఉంటుంది',
  'boot.need.tools': 'సాధనాలు ట్యాబ్ ఖాళీగా ఉంటుంది',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'ఈ మాడ్యూళ్ళు లోడ్ కాలేదు: {list}.',
  'boot.consoleHint': 'index.html లో <script> ట్యాగ్‌ల క్రమాన్నీ మార్గాలనూ చూడండి.',
  'boot.incompleteTitle': 'యాప్ అసంపూర్ణంగా లోడ్ అయింది',
  'boot.incompleteText': '{missing} పేజీని రీలోడ్ చేయండి; అది సాయపడకపోతే సర్వర్‌లోని ఫైళ్ళు అసంపూర్ణంగా ఉన్నాయి.',
  'boot.newVersion': 'యాప్ కొత్త వెర్షన్ వచ్చింది.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'పరిమితులు ఏం చేస్తాయి. ',
  'thresholds.noteText': 'హెచ్చరిక పరిమితి పసుపు స్థితిని వెలిగిస్తుంది, క్లిష్ట పరిమితి ఎరుపును. మార్పు వెంటనే అమలవుతుంది — ఇప్పటికే స్క్రీన్‌పై ఉన్న రీడింగ్‌పై కూడా. మీ సొంత పరిమితుల సెట్‌ను పేరు పెట్టి సేవ్ చేసుకోవచ్చు, ఎప్పుడు కావాలంటే అప్పుడు దానికి తిరిగి రావచ్చు.',
  'thresholds.profilesTitle': 'పరిమితుల ప్రొఫైల్‌లు',
  'thresholds.profilesSub': 'అంతర్నిర్మితమైన మూడూ, మీ సొంతవీ',
  'thresholds.customName': 'మీ సొంత ప్రొఫైల్ పేరు',
  'thresholds.customPlaceholder': 'ఉదా. సాయంత్రం పడకగది',
  'thresholds.save': 'ప్రస్తుత పరిమితులను సేవ్ చేయి',
  'thresholds.saveHelp': 'పైన పెట్టిన పరిమితులనే సరిగ్గా సేవ్ చేస్తుంది.',

  'profile.builtin.default.name': 'డిఫాల్ట్',
  'profile.builtin.default.desc': 'సూచికల కేటలాగ్ నుండి వచ్చిన పరిమితులు — అన్ని కొలతలకూ మొదటి మెట్టు.',
  'profile.builtin.evening.name': 'సాయంత్రం — మృదువు',
  'profile.builtin.evening.desc': 'చల్లని రంగు గురించీ దైనందిన లయ ప్రభావం గురించీ ముందుగానే హెచ్చరిస్తుంది.',
  'profile.builtin.work.name': 'బల్ల వద్ద పని',
  'profile.builtin.work.desc': 'ప్రకాశవంతమైన, చల్లని పగటి కాంతిని అనుమతిస్తుంది; మిణుకునూ ఏకరూపతనూ కనిపెడుతుంది.',
  'profile.custom.desc': '{date} న సేవ్ చేసిన మీ సొంత ప్రొఫైల్.',

  'toast.thresholdsReset': 'డిఫాల్ట్ పరిమితులు పునరుద్ధరించబడ్డాయి.',
  'toast.thresholdOrder': 'హెచ్చరిక పరిమితి క్లిష్ట పరిమితి కంటే తక్కువగా ఉండాలి.',
  'toast.thresholdOrderInverted': 'ఈ సూచికకు హెచ్చరిక పరిమితి క్లిష్ట పరిమితి కంటే ఎక్కువగా ఉండాలి.',
  'toast.profileNameMissing': 'ప్రొఫైల్ పేరు ఇవ్వండి.',
  'toast.profileSaved': '“{name}” ప్రొఫైల్ సేవ్ అయింది.',
  'toast.profileApplied': '“{name}” ప్రొఫైల్ వర్తింపజేయబడింది.',
  'toast.profileApplyFailed': 'ఈ ప్రొఫైల్‌ను వర్తింపజేయడం సాధ్యం కాలేదు.',
  'toast.profileRemoved': 'ప్రొఫైల్ తొలగించబడింది.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'షెడ్యూల్ దేనికి. ',
  'schedule.noteText': 'సాయంత్రం సరిపోయే పరిమితులు మధ్యాహ్నం సరిపోవు. “నుండి–వరకు” నియమం ప్రొఫైల్‌ను తనంతట తానే మార్చేస్తుంది, దాని గురించి మీరు గుర్తుపెట్టుకోనక్కర్లేదు. షెడ్యూల్ కొలతను ఎప్పుడూ ప్రారంభించదు, ఆపదు.',
  'schedule.toggle': 'ఆటోమేటిక్ మార్పును ఆన్ చేయి',
  'schedule.toggleSub': 'పరికర గడియారం ప్రకారం ప్రతి నిమిషం తనిఖీ.',
  'schedule.emptyTitle': 'నియమాలు లేవు',
  'schedule.emptyText': 'కింది బటన్‌తో మొదటి నియమాన్ని జోడించండి.',
  'schedule.add': 'నియమాన్ని జోడించు',
  'schedule.to': 'వరకు',
  'schedule.profile': 'ప్రొఫైల్',
  'schedule.fromAria': 'నియమం {n}: ప్రారంభ సమయం',
  'schedule.toAria': 'నియమం {n}: ముగింపు సమయం',
  'toast.scheduleTimeFormat': 'సమయాలను 22:00 ఫార్మాట్‌లో ఇవ్వండి.',
  'toast.scheduleEnded': 'షెడ్యూల్ ముగిసింది — పాత పరిమితులు తిరిగి వచ్చాయి.',
  'toast.scheduleApplied': 'షెడ్యూల్ “{name}” ప్రొఫైల్‌ను ఆన్ చేసింది.',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'అలర్ట్ ఏం చేస్తుంది. ',
  'alerts.noteText': 'అది ఒక సూచికను కనిపెడుతుంది, ఆ సూచిక మీరు ఎంచుకున్న జోన్‌లో మీరు పెట్టిన సమయమంతా ఆగకుండా నిలిచినప్పుడే మాట్లాడుతుంది. కొలతను ఎప్పుడూ ఆపదు, బటన్లను కప్పదు.',
  'alerts.toggle': 'ఎక్స్‌పోజర్ అలర్ట్‌లను ఆన్ చేయి',
  'alerts.toggleSub': 'కొలత జరుగుతున్నప్పుడు మాత్రమే పనిచేస్తాయి.',
  'alerts.metric': 'కనిపెట్టవలసిన సూచిక',
  'alerts.level': 'ఏ జోన్ నుండి',
  'alerts.level.warning': 'హెచ్చరిక, ఆపైన',
  'alerts.level.critical': 'క్లిష్టం మాత్రమే',
  'alerts.sustain': 'ఎన్ని సెకన్లు ఆగకుండా నిలిస్తే',
  'alerts.sustainHelp': 'సమయం తక్కువ పెడితే, ఫోన్‌ను కదిలించినప్పుడు తప్పుడు అలారాలు ఎక్కువవుతాయి.',
  'alerts.sound': 'చిన్న శబ్ద సంకేతం',
  'alerts.soundSub': 'శబ్దం ఈ పరికరంలోనే తయారవుతుంది. మరిన్ని స్క్రీన్‌లో దాన్ని పూర్తిగా ఆఫ్ కూడా చేయవచ్చు.',
  'alerts.barTitle': 'ఎక్స్‌పోజర్ అలర్ట్',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} {seconds} సెకన్ల నుండి హెచ్చరిక జోన్‌లో నిలిచింది — ఇప్పుడు {value} {unit}.',
  'alerts.message.critical': '{name} {seconds} సెకన్ల నుండి క్లిష్ట జోన్‌లో నిలిచింది — ఇప్పుడు {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'ఎలా పోల్చాలి. ',
  'compare.noteText': 'కొలత ప్రారంభించి, మొదటి మూలం వైపు కెమెరాను గురిపెట్టి దాన్ని A గా సేవ్ చేయండి. దూరాన్నీ కోణాన్నీ మార్చకుండా కాంతిని మార్చి B ని సేవ్ చేయండి. దృశ్యం ఒక్కటే అయినప్పుడే పోలికకు అర్థం ఉంటుంది.',
  'compare.slotA': 'కాంతి A',
  'compare.slotB': 'కాంతి B',
  'compare.save': 'ప్రస్తుత రీడింగ్‌ను సేవ్ చేయి',
  'compare.savedAt': '{date}, {time} న సేవ్ అయింది',
  'compare.empty': 'ఇంకా ఏదీ సేవ్ కాలేదు.',
  'compare.verdictTitle': 'పోలిక ఫలితం',
  'compare.verdictEmpty': 'ఏది మృదువైనదో చూడటానికి రెండు కాంతులనూ సేవ్ చేయండి.',
  'compare.notEnough': 'ఈ రెండు కొలతలను పోల్చడానికి డేటా సరిపోలేదు.',
  'compare.tie': 'రెండు మూలాలూ దాదాపు ఒకేలా వచ్చాయి ({metric}: {a}, {b} {unit}). తేడా కొలత శబ్దం లోపలే ఉంది.',
  'compare.betterA': 'మృదువైనది కాంతి A — దాని {metric} {better} {unit}, రెండో దానిది {worse} {unit}.',
  'compare.betterB': 'మృదువైనది కాంతి B — దాని {metric} {better} {unit}, రెండో దానిది {worse} {unit}.',
  'compare.clear': 'పోలికను తుడిచివేయి',
  'toast.compareSavedA': 'కాంతి A సేవ్ అయింది.',
  'toast.compareSavedB': 'కాంతి B సేవ్ అయింది.',
  'toast.compareCleared': 'పోలిక తుడిచివేయబడింది.',
  'toast.measureFirst': 'ముందు కొలత స్క్రీన్‌లో కొలత ప్రారంభించండి.',

  /* Nazwa wielkości w środku zdania. Po polsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. Telugu nie
     zna wielkiej litery, więc brzmią tak samo jak nazwy w warstwie wspólnej. */
  'metric.share.nameLower': 'నీలి వాటా',
  'metric.brightness.nameLower': 'దృశ్య ప్రకాశం',
  'metric.kelvin.nameLower': 'వర్ణ ఉష్ణోగ్రత',
  'metric.melanopic.nameLower': 'దైనందిన లయ ప్రభావం',
  'metric.flicker.nameLower': 'మిణుకు',
  'metric.uniformity.nameLower': 'ఏకరూపత',
  'metric.comfort.nameLower': 'కంటి సౌకర్యం',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'ఇది ఎందుకు పనిచేస్తుంది. ',
  'calib.noteText': 'కెమెరా సెన్సార్‌కు ఛానెళ్ళ మధ్య ఒక స్థిరమైన వ్యత్యాసం ఉంటుంది. తెల్ల కాగితాన్ని కొలిస్తే అది ఎంతో తెలుస్తుంది, దాన్ని తీసివేయడం సాధ్యమవుతుంది. ఈ యాప్‌లో కచ్చితత్వాన్ని నిజంగా పెంచే ఒకే ఒక్క ఫీచర్ ఇదే — అయినా ఇది కెమెరాను స్పెక్ట్రోమీటర్‌గా మార్చదు.',
  'calib.step1': 'కొలుస్తున్న కాంతి కింద తెల్ల కాగితాన్ని పెట్టండి',
  'calib.step2': 'కొలత ప్రారంభించి ఫ్రేమ్ నిండా కాగితాన్ని ఉంచండి',
  'calib.step3': '“క్రమాంకనం” నొక్కి 3 సెకన్ల పాటు ఫోన్‌ను కదపకండి',
  'calib.done': '{date}, {time} న క్రమాంకనం జరిగింది.',
  'calib.none': 'క్రమాంకనం లేదు. కొలత పనిచేస్తుంది; విలువలను పోలిక కోసమే తీసుకోండి.',
  'calib.gain': '{channel} గెయిన్',
  'calib.gainsLabel': 'ఛానెళ్ళ గెయిన్‌లు',
  'calib.gainsUnset': 'సెట్ చేయలేదు',
  'calib.start': 'క్రమాంకనం (3 సె.)',
  'calib.clear': 'క్రమాంకనాన్ని తొలగించు',
  'toast.calibCleared': 'క్రమాంకనం తొలగించబడింది.',
  'calib.error.noEngine': 'కొలత మాడ్యూల్ అందుబాటులో లేదు.',
  'calib.error.notRunning': 'ముందు కొలత ప్రారంభించి, తెల్ల కాగితం వైపు కెమెరాను గురిపెట్టండి.',
  'calib.error.busy': 'క్రమాంకనం ఇప్పటికే జరుగుతోంది.',
  'calib.error.tooFewSamples': 'నమూనాలు సరిపోలేదు. కొలత నిజంగా జరుగుతోందో లేదో చూడండి.',
  'calib.error.tooDark': 'క్రమాంకనానికి చిత్రం మరీ చీకటిగా ఉంది. కాగితంపై వెలుతురు పెంచి మళ్ళీ ప్రయత్నించండి.',
  'calib.error.tooSkewed': 'ఛానెళ్ళ వ్యత్యాసం క్రమాంకనంగా అంగీకరించలేనంత ఎక్కువ. సమానమైన వెలుతురులో తెల్ల కాగితాన్ని వాడండి.',
  'calib.ok': 'క్రమాంకనం పూర్తయింది. వర్ణ ఉష్ణోగ్రతా దైనందిన లయ ప్రభావమూ ఇప్పుడు మరింత కచ్చితంగా ఉంటాయి.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'ఇది దేనికి. ',
  'screencheck.noteText': 'సమీక్షలో మానిటర్‌ను పరీక్షించినట్టుగానే ఐదు దశలు దాన్ని పరీక్షిస్తాయి: రెండు ప్రకాశాల వద్ద తెలుపు, బ్యాక్‌లైట్ ఏకరూపత, సిస్టమ్ నైట్ మోడ్ నిజంగా ఏదైనా మారుస్తోందా. విజార్డ్ ఇప్పటికే జరుగుతున్న కొలతను చదువుతుంది; తనంతట తానే కొలత ప్రారంభించదు.',
  'screencheck.step.white100.title': 'పూర్తి ప్రకాశం వద్ద తెలుపు',
  'screencheck.step.white100.hint': 'మానిటర్‌లో తెల్లని పేజీని తెరిచి, ప్రకాశాన్ని గరిష్ఠానికి పెట్టి, ఫ్రేమ్ నిండా స్క్రీన్ కనిపించేలా ఉంచండి.',
  'screencheck.step.white20.title': 'తక్కువ ప్రకాశం వద్ద తెలుపు',
  'screencheck.step.white20.hint': 'మానిటర్ ప్రకాశాన్ని దాదాపు అయిదో వంతుకు తగ్గించి, ఫ్రేమ్‌ను మార్చకండి.',
  'screencheck.step.corners.title': 'స్క్రీన్ మూలలు',
  'screencheck.step.corners.hint': 'పూర్తి ప్రకాశానికి తిరిగి వెళ్ళి, స్క్రీన్ మొత్తాన్ని కెమెరాకు చూపండి — బ్యాక్‌లైట్ ఏకరూపతను చూస్తున్నాం.',
  'screencheck.step.nightOff.title': 'నైట్ మోడ్ ఆఫ్',
  'screencheck.step.nightOff.hint': 'నీలి కాంతి ఫిల్టర్ ఆఫ్‌లో ఉందని నిర్ధారించుకోండి.',
  'screencheck.step.nightOn.title': 'నైట్ మోడ్ ఆన్',
  'screencheck.step.nightOn.hint': 'సిస్టమ్‌లో నీలి కాంతి ఫిల్టర్‌ను ఆన్ చేసి, అదే ఫ్రేమ్‌ను మళ్ళీ చూపండి.',
  'screencheck.stepHeading': '{total} దశల్లో {n} వ దశ: {title}',
  'screencheck.idleTitle': 'విజార్డ్ నడవడం లేదు',
  'screencheck.idleHint': 'కొలత స్క్రీన్‌లో కొలత ప్రారంభించి, తిరిగి ఇక్కడికి వచ్చి “ప్రారంభించు” నొక్కండి.',
  'screencheck.next': 'దశను సేవ్ చేసి ముందుకు వెళ్ళు',
  'screencheck.cancel': 'ఆపివేయి',
  'screencheck.start': 'విజార్డ్‌ను ప్రారంభించు',
  'screencheck.clearResult': 'ఫలితాన్ని తుడిచివేయి',
  'screencheck.resultTitle': 'ఫలితం',
  'screencheck.resultEmpty': 'ఇంకా ఒక్క దశా సేవ్ కాలేదు.',
  'screencheck.resultPartial': '{total} దశల్లో {done} సేవ్ అయ్యాయి. పోల్చడానికి ఏదైనా ఉన్నప్పుడు నిర్ధారణలు కనిపిస్తాయి.',
  'screencheck.note.uniformityLow': 'బ్యాక్‌లైట్ ఏకరూపత {value}% — ఫ్రేమ్‌లో ప్రకాశ తేడాలు స్పష్టంగా కనిపిస్తున్నాయి.',
  'screencheck.note.uniformityOk': 'బ్యాక్‌లైట్ సమానంగా ఉంది ({value}%).',
  'screencheck.note.nightWorks': 'నైట్ మోడ్ నీలి వాటాను {value} శాతం బిందువుల మేర తగ్గిస్తుంది — పనిచేస్తోంది.',
  'screencheck.note.nightWeak': 'నైట్ మోడ్ నీలి వాటాను {value} శాతం బిందువుల మేర మాత్రమే మారుస్తుంది. సిస్టమ్ ఫిల్టర్ సాధారణంగా ఇచ్చే దాని కంటే ఇది తక్కువ.',
  'screencheck.note.pwm': 'తక్కువ ప్రకాశం వద్ద మిణుకు {from}% నుండి {to}% కు పెరుగుతుంది — ఇది పల్స్ వెడల్పుతో మసకపరచడానికి (PWM) విలక్షణమైన లక్షణం.',
  'toast.screencheckDone': 'విజార్డ్ పూర్తయింది. ఫలితం కింద ఉంది.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'ఈ సంఖ్యలు ఎక్కడి నుండి. ',
  'reports.noteText': 'ఈ పరికరంలో సేవ్ అయిన చరిత్ర నుండే నివేదిక లెక్కించబడుతుంది — ప్రతి ఐదు సెకన్లకు ఒక బిందువు. మీ మొదటి కొలత నుండే ఇంజిన్ దాన్ని సేకరిస్తోంది, కాబట్టి నివేదిక వెంటనే సిద్ధంగా ఉంటుంది.',
  'reports.rangeAria': 'నివేదిక పరిధి',
  'reports.day': 'గత 24 గంటలు',
  'reports.week': 'గత 7 రోజులు',
  'reports.date': '{date} నాటి నివేదిక.',
  'report.headerDay': '{from} నుండి {to} వరకు రోజు — {count}.',
  'report.headerWeek': '{from} నుండి {to} వరకు వారం — {count}.',
  'count.points': { one: '{n} బిందువు', other: '{n} బిందువులు' },
  'count.samples': { one: '{n} నమూనా', other: '{n} నమూనాలు' },
  'report.emptyTitle': 'ఈ కాలంలో డేటా లేదు',
  'report.emptyText': 'కొలత స్క్రీన్‌లో కొలత ప్రారంభించండి — చరిత్ర తనంతట తానే సేవ్ అవుతుంది.',
  'report.colAvg': 'సగటు',
  'report.colMin': 'కనిష్ఠం',
  'report.colMax': 'గరిష్ఠం',
  'report.zonesTitle': 'జోన్ల విభజన',
  'report.worstHour': 'రోజులో అత్యంత చెడ్డ వేళ',
  'report.worstHourNone': 'స్పష్టమైనది లేదు',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'దీనితో ఏం చేయాలి',
  'report.disclaimerTitle': 'ఇది ఆరోగ్య సలహా కాదు. ',
  'report.disclaimerText': 'ఈ ఫోన్ కెమెరా చూసిన దాని నుండి మాత్రమే ఈ నిర్ధారణలు వచ్చాయి. యాప్ వర్ణపటాన్ని కొలవదు, లక్స్ దానికి తెలియదు, అది ఏ రోగ నిర్ధారణా చేయదు.',

  'advice.melanopic': 'సగటు దైనందిన లయ ప్రభావం {value}× వచ్చింది. సాయంత్రం 0.50 కంటే కిందికి దిగడం మేలు — వెచ్చని బల్బు లేదా నైట్ మోడ్ అన్నిటికంటే సులభమైన దారి.',
  'advice.kelvin': 'కాంతి చల్లగా ఉంది (సగటున {value} K). పనికి ఇది ఫర్వాలేదు; నిద్రకు ముందున్న రెండు గంటలకు 3000 K కంటే తక్కువ మేలు.',
  'advice.flicker': 'గమనించదగిన మిణుకు కనిపించింది (సగటున {value}%). సాధారణంగా దీనికి కారణం చౌక డిమ్మర్ లేదా బ్యాక్‌లైట్ డ్రైవర్.',
  'advice.uniformity': 'కాంతి అసమానంగా పరుచుకుంది ({value}%). బల్బు మార్చడం కంటే దీపాన్ని జరపడం లేదా దాని కోణాన్ని మార్చడం సాధారణంగా ఎక్కువ ఫలితమిస్తుంది.',
  'advice.worstHour': 'రోజులో అత్యంత చెడ్డ వేళ {hour}:00 — పరిధి దాటిన రీడింగ్‌లు ఎక్కువగా అక్కడే గుమిగూడుతున్నాయి.',
  'advice.none': 'ఈ కాలంలో పరిధి దాటి ఏదీ ప్రత్యేకంగా కనిపించలేదు. ఇప్పుడు A/B పోలికలో రెండు కాంతి మూలాలను పోల్చడం అన్నిటికంటే ఎక్కువ ఉపయోగపడుతుంది.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'ఫైల్ ఫార్మాట్. ',
  'export.noteText': 'కాలమ్ విభాజకంగా సెమికోలన్, దశాంశ విభాజకంగా కామా, BOM గుర్తుతో UTF-8 ఎన్‌కోడింగ్. దశాంశ విభాజకంగా కామాను వాడే లొకేల్‌లో ఉన్న Excel ఇలాంటి ఫైల్‌ను ఏదీ సెట్ చేయకుండానే తెరుస్తుంది.',
  'export.range': 'డేటా పరిధి',
  'export.columns': 'ఫైల్‌లోని కాలమ్‌లు',
  'export.chipFilled': ' — కాలమ్ నిండింది',
  'export.help': 'ఫైల్‌లో ఏడు కాలమ్‌లూ ఉంటాయి — మీ మొదటి కొలత నుండే ఇంజిన్ వాటిని లెక్కిస్తుంది, అన్నీ ఫైల్‌లోకి చేరతాయి.',
  'export.run': 'CSV ఫైల్‌ను సేవ్ చేయి',
  'export.previewEmpty': 'ఈ పరిధిలో రీడింగ్‌లు లేవు. కొలత ప్రారంభించండి — చరిత్ర తనంతట తానే సేవ్ అవుతుంది.',
  'csv.range.hour': 'గత గంట',
  'csv.range.day': 'గత 24 గంటలు',
  'csv.range.week': 'గత 7 రోజులు',
  'csv.range.month': 'గత 30 రోజులు',
  'csv.colDate': 'తేదీ',
  'csv.colTime': 'సమయం',
  'csv.colZone': 'జోన్',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'ఎంచుకున్న పరిధిలో అసలు రీడింగ్‌లే లేవు.',
  'toast.exportFailed': 'ఈ బ్రౌజర్ ఫైల్‌ను సేవ్ చేయనివ్వలేదు.',
  'toast.exportSaved': {
    one: '{filename} ఫైల్ సేవ్ అయింది ({n} వరుస).',
    other: '{filename} ఫైల్ సేవ్ అయింది ({n} వరుసలు).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} గం. {m} ని.',
  'duration.ms': '{m} ని. {s} సె.',
  'duration.s': '{s} సె.'
});
