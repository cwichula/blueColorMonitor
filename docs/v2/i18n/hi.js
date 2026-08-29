/* docs/v2/i18n/hi.js — słownik WERSJI 2, hindi.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/hi.js. Kolejność
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
 * (en.js) jako wzorcem terminologii i rejestru. Nazwy siedmiu wielkości są
 * przepisane CO DO ZNAKU z docs/shared/i18n/hi.js — नीला अंश, दृश्य की चमक,
 * वर्ण ताप, दैनिक लय पर असर, झिलमिलाहट, एकरूपता, आँखों का आराम. Klucze
 * *.nameLower to te same nazwy: hindi nie zna wielkiej litery, więc różnicy
 * między nimi a warstwą wspólną nie ma i mieć nie powinno.
 *
 * REJESTR: uprzejme „आप”, tryb rozkazujący na -एँ (करें, दबाएँ). Zdania kończy
 * danda (।); kropka zostaje w liczbach dziesiętnych (0.50) i w skrótach
 * jednostek wziętych z warstwy wspólnej (से., मि., घं.). Etykiety przycisków,
 * kafelków i zakładek są krótkie, teksty pomocy — pełnymi zdaniami. Formy
 * czasownikowe dobrane tak, by nie narzucać rodzaju użytkownikowi; rodzaj
 * męski pojawia się tylko tam, gdzie mówi autor („मैं यह क्यों माँग रहा हूँ”).
 *
 * NAPISY, KTÓRYCH NIE TŁUMACZYMY: „Start” i „Stop” na przycisku pomiaru —
 * warstwa wspólna (engine.idle) cytuje je po łacinie, więc zdanie i przycisk
 * muszą mówić tym samym słowem. Tak samo symbole jednostek (%, K, ×, Hz, s),
 * nazwy formatów (CSV, UTF-8, BOM, PWM), nazwy plików i A/B.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (te same co w pl.js i z tego samego powodu):
 *   'zone.warning'        — wspólne mówi „सावधान”, ta wersja od zawsze mówi
 *                           „चेतावनी” (i „चेतावनियाँ” w podsumowaniu);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi o pomiarach.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules — hindi ma dwie kategorie: one i other. Patrz nagłówek
 * docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['hi'] = Object.assign(window.I18nData['hi'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'प्रकाश मॉनिटर — नीली रोशनी की माप',
  'app.description': 'प्रकाश मॉनिटर — फ़ोन के कैमरे से रोशनी में नीले अंश की माप। सात मापदंड, ग्राफ़, इतिहास। सब कुछ उपलब्ध, बिना खाते और बिना शुल्क के।',
  'app.skipToContent': 'सामग्री पर जाएँ',
  'app.measuring': 'माप जारी',
  'app.docsButton': 'दस्तावेज़ और व्याख्याएँ',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — संस्करण 2',

  'nav.aria': 'मुख्य नेविगेशन',
  'nav.tablistAria': 'ऐप की स्क्रीनें',
  'nav.measure': 'माप',
  'nav.history': 'इतिहास',
  'nav.tools': 'टूल',
  'nav.support': 'सहयोग',
  'nav.more': 'अधिक',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'दस्तावेज़',
  'panel.thresholds': 'सीमाएँ और प्रोफ़ाइल',
  'panel.reports': 'रिपोर्ट',
  'panel.export': 'डेटा एक्सपोर्ट',
  'panel.compare': 'A/B तुलना',
  'panel.calibration': 'सफ़ेद काग़ज़ से कैलिब्रेशन',
  'panel.screenCheck': 'मेरा मॉनिटर जाँचें',
  'panel.schedule': 'शेड्यूल',
  'panel.alerts': 'एक्सपोज़र अलर्ट',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'वापस',
  'action.close': 'बंद करें',
  'action.refresh': 'ताज़ा करें',
  'action.apply': 'लागू करें',
  'action.delete': 'हटाएँ',
  'action.hide': 'छिपाएँ',
  'action.start': 'Start',
  'action.stop': 'Stop',
  'action.switch': 'बदलें',
  'action.switchAria': 'कैमरा बदलें: अगला या पिछला',
  'action.resetDefaults': 'डिफ़ॉल्ट लौटाएँ',
  'action.reports': 'रिपोर्ट',
  'action.exportCsv': 'CSV एक्सपोर्ट',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'स्क्रीन: {name}',
  'a11y.measureStarted': 'माप शुरू हुई।',
  'a11y.measureStopped': 'माप रुक गई।',
  'a11y.measureStoppedSummary': 'माप रुक गई। समय: {duration}, {samples}।',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'सीमाओं का प्रोफ़ाइल लागू किया गया।',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'पुष्टि',
  'dialog.confirm': 'पुष्टि करें',
  'dialog.cancel': 'रद्द करें',
  'dialog.infoTitle': 'जानकारी',
  'dialog.ok': 'ठीक है',

  'help.sheetTitle': 'मापदंड का विवरण',
  'help.unit': 'इकाई',
  'help.scaleRange': 'पैमाने का दायरा',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'चेतावनी',
  'threshold.crit': 'गंभीर',
  'threshold.warnLabel': 'चेतावनी की सीमा',
  'threshold.critLabel': 'गंभीर की सीमा',
  'threshold.warnAria': '{name} — सीमा: चेतावनी',
  'threshold.critAria': '{name} — सीमा: गंभीर',

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

  'firstRun.title': 'कैसे मापें',
  'firstRun.text': '“Start” दबाएँ, फ़ोन को किसी रोशन सतह की ओर करें और उसे कुछ सेकंड स्थिर रखें। प्रीव्यू पर बनी फ़्रेम वही हिस्सा दिखाती है जिसे ऐप सचमुच पढ़ता है।',
  'firstRun.close': 'सुझाव बंद करें',

  'camera.live': 'लाइव',
  'camera.idle': 'कैमरा बंद है। “Start” दबाएँ, फ़ोन को किसी रोशन सतह की ओर करें और उसे कुछ सेकंड स्थिर रखें।',
  'camera.stopped': 'माप रुक गई। दोबारा मापने के लिए “Start” दबाएँ।',

  'error.cameraStart': 'कैमरा चालू नहीं हो सका।',
  'error.engineMissing': 'माप का मॉड्यूल लोड नहीं हुआ।',

  'metrics.sevenTitle': 'सात मापदंड',
  'measure.tilesSub': 'हर सेकंड 5 बार ताज़ा',

  'session.title': 'यह सत्र',
  'session.duration': 'माप का समय',
  'session.samples': 'नमूनों की संख्या',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     „चेतावनियाँ” to nie to samo słowo co „चेतावनी” pod suwakiem. */
  'zone.count.good': 'सामान्य सीमा में',
  'zone.count.warning': 'चेतावनियाँ',
  'zone.count.critical': 'गंभीर',

  'note.calibrated': 'माप सफ़ेद काग़ज़ से कैलिब्रेट की गई — चैनल बराबर कर दिए गए हैं।',

  'tile.helpAria': 'इसका क्या मतलब है: {name}',
  'tile.noMeasurement': 'माप नहीं',
  'tile.outOfScale': 'पैमाने से बाहर',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'चेतावनी',
  'zone.spoken.warning': 'चेतावनी',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'समय के साथ बदलाव',
  'history.pickHint': 'मापदंड और अवधि चुनें',
  'history.metricLabel': 'मापदंड',
  'history.rangeAria': 'ग्राफ़ की समय-अवधि',
  'history.emptyTitle': 'इस अवधि में कोई डेटा नहीं',
  'history.emptyText': 'माप स्क्रीन पर माप शुरू करें — ग्राफ़ कुछ ही सेकंड में भर जाएगा।',
  'history.tableTitle': 'ताज़ा रीडिंग',
  'history.tableHide': 'तालिका छिपाएँ',
  'history.tableShow': 'तालिका दिखाएँ',
  'history.tableCaption': 'माप की ताज़ा रीडिंग, सबसे नई सबसे ऊपर।',
  'history.tableEmpty': 'कोई रीडिंग नहीं। माप स्क्रीन पर माप शुरू करें।',

  'table.time': 'समय',
  'table.metric': 'मापदंड',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Skróty są te
     z warstwy wspólnej (unit.minute, unit.hour): dłuższy zapis łamał się na
     dwie linie. */
  'range.1m': '1 मि.',
  'range.1h': '1 घं.',
  'range.24h': '24 घं.',
  'range.7d': '7 दिन',
  'range.30d': '30 दिन',

  'chart.now': 'अभी',
  'chart.countSub': {
    one: 'चुनी हुई अवधि में {n} रीडिंग',
    other: 'चुनी हुई अवधि में {n} रीडिंग'
  },
  'chart.aria': '{name}, अवधि {range}, {count}, अंतिम मान {value} {unit}।',
  'chart.ariaZone': '{name}, अवधि {range}, {count}, अंतिम मान {value} {unit}, ज़ोन: {zone}।',
  'chart.ariaEmpty': '{name} — {range} की अवधि में कोई डेटा नहीं।',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'विज़ार्ड और सहायक सुविधाएँ',
  'tools.note': 'टूल माप को समझने में मदद करते हैं। सभी तुरंत उपलब्ध हैं, और माप ख़ुद उनसे स्वतंत्र रूप से काम करती है।',

  'tool.thresholds.sub': 'किस मान पर चेतावनी जले',
  'tool.compare.sub': 'दो रोशनियों में कौन-सी नरम है',
  'tool.calibration.sub': 'एकमात्र सुविधा जो सचमुच सटीकता बढ़ाती है',
  'tool.screenCheck.sub': 'पाँच चरण और स्क्रीन के बारे में तैयार नतीजा',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „सीमाओं का शेड्यूल”
     kontra „शेड्यूल”. Tak było i tak zostaje. */
  'tool.schedule.title': 'सीमाओं का शेड्यूल',
  'tool.schedule.sub': 'शाम को अलग सीमाएँ, बिना याद रखे',
  'tool.alerts.sub': 'संकेत, जब गंभीर ज़ोन बहुत देर तक बना रहे',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'सेटिंग',
  'more.thresholdsSub': 'किस मान पर चेतावनी जले',
  'more.docsSub': 'कैसे मापें और यह माप क्या नहीं बताती',
  'more.appearanceTitle': 'रूप-रंग और सुगम्यता',

  'settings.theme': 'थीम',
  'theme.auto': 'सिस्टम के अनुसार',
  'theme.light': 'हल्की',
  'theme.dark': 'गहरी',

  'settings.textScale': 'लिखाई का आकार',
  'textScale.100': 'मानक',
  'textScale.115': 'बड़ा (115%)',
  'textScale.130': 'सबसे बड़ा (130%)',

  'settings.contrast': 'अधिक कंट्रास्ट',
  'settings.contrastSub': 'गाढ़ी किनार-रेखाएँ और गहरा सहायक टेक्स्ट।',
  'settings.sound': 'अलर्ट की आवाज़',
  'settings.soundSub': 'एक्सपोज़र अलर्ट चालू होने पर छोटा संकेत।',
  'settings.vibrate': 'अलर्ट पर कंपन',
  'settings.vibrateSub': 'केवल उन डिवाइसों पर काम करता है जो इसका समर्थन करते हैं।',

  'more.dataTitle': 'डेटा',
  'more.clearHistory': 'माप का इतिहास मिटाएँ',
  'more.clearHistorySub': 'इस डिवाइस से सहेजी हुई रीडिंग हटा देता है। सीमाएँ, प्रोफ़ाइल और सेटिंग बनी रहती हैं।',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'ऐप पूरी तरह मुफ़्त है। ',
  'more.supportLink': 'आप चाहें तो स्वेच्छा से इसका सहयोग कर सकते हैं।',

  'dialog.clearHistory.title': 'सहेजा हुआ इतिहास मिटाएँ?',
  'dialog.clearHistory.body': {
    one: 'हम इस डिवाइस से माप का {n} सहेजा हुआ बिंदु मिटा देंगे। इसे वापस नहीं लाया जा सकता। सीमाएँ, प्रोफ़ाइल और सेटिंग अछूती रहेंगी।',
    other: 'हम इस डिवाइस से माप के {n} सहेजे हुए बिंदु मिटा देंगे। इसे वापस नहीं लाया जा सकता। सीमाएँ, प्रोफ़ाइल और सेटिंग अछूती रहेंगी।'
  },
  'dialog.clearHistory.confirm': 'इतिहास मिटाएँ',
  'dialog.clearHistory.cancel': 'रहने दें',

  'toast.historyCleared': 'माप का इतिहास मिटा दिया गया।',
  'toast.screenUnavailable': 'यह स्क्रीन इस संस्करण में अभी उपलब्ध नहीं है।',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'यह ऐप क्या मापता है',
  'docs.leadText': 'फ़ोन का कैमरा किसी रोशन सतह को देखता है, और ऐप हर सेकंड पाँच बार फ़्रेम के बीच के हिस्से से R, G और B चैनलों का औसत निकालता है। इन तीन संख्याओं से वह सात मापदंड निकालता है।',
  'docs.limitsTitle': 'विधि की सीमाएँ',
  'docs.limitsText': 'कैमरे में तीन चौड़े रंग चैनल, स्वचालित एक्सपोज़र और स्वचालित श्वेत संतुलन होते हैं। वह स्पेक्ट्रम नहीं मापता और निरपेक्ष मान नहीं जानता, इसलिए चमक एक सापेक्ष संकेतक है, लक्स नहीं। वर्ण ताप और दैनिक लय पर असर sRGB प्राथमिक रंगों से निकाले गए अनुमान हैं। {rate} Hz पर नमूने लेने से झिलमिलाहट केवल {limit} Hz से नीचे दिखती है — बिजली की लाइन का 100 Hz पहुँच से बाहर है और ऐप उसे कभी परिणाम के रूप में नहीं देगा।',

  'note.howTo.repeat.title': 'माप दोहराएँ',
  'note.howTo.repeat.text': 'एक अकेली रीडिंग एक झलक है। दस-पंद्रह सेकंड की माप ज़्यादा भरोसेमंद तस्वीर देती है।',

  'docs.scale': 'पैमाना',
  'docs.direction': 'दिशा',
  'docs.directionHigher': 'ऊँचा यानी बेहतर',
  'docs.directionLower': 'नीचा यानी नरम',
  'docs.privacyTitle': 'डेटा और निजता',
  'docs.privacyText': 'कैमरे की तस्वीर न कहीं भेजी जाती है, न कहीं सहेजी जाती है — हर फ़्रेम से केवल तीन संख्याएँ बचती हैं। माप, सीमाएँ और सेटिंग इसी डिवाइस पर ब्राउज़र की मेमोरी में रहती हैं। ऐप कोई भी नेटवर्क अनुरोध नहीं करता और ऑफ़लाइन मोड में चलता है।',
  'docs.freeLine': 'सातों मापदंड, इतिहास, ग्राफ़, टूल और ऑफ़लाइन मोड सबके लिए काम करते हैं, बिना खाते और बिना शुल्क के।',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'सब कुछ उपलब्ध है',
  'support.heroText': 'सातों मापदंड, माप का इतिहास, ग्राफ़, सारे टूल और ऑफ़लाइन मोड सबके लिए तुरंत काम करते हैं। न खाता, न कोई हद, न कोई शुल्क।',
  'support.whyTitle': 'मैं यह क्यों माँग रहा हूँ',
  'support.whyText': '{app} काम के बाद बचे घंटों में बनता है और किसी से कुछ नहीं कमाता: न विज्ञापन, न डेटा इकट्ठा करना, न बेचने को कुछ। इसे चलाए रखने और आगे बढ़ाने में — नए मापदंड, सुधार, और नए फ़ोनों पर जाँच — समय लगता है। अगर ऐप आपके काम आया हो, तो आप कुछ दे सकते हैं। ज़रूरी नहीं है।',
  'support.whatTitle': 'दान से आपको क्या मिलता है',
  'support.whatText': 'कुछ नहीं। सचमुच इससे कुछ नहीं खुलता और कुछ तेज़ नहीं होता — ऐप उससे पहले और उसके बाद बिलकुल एक जैसा दिखता और चलता है। बस इतना होता है कि लेखक को पता चल जाता है कि यह काम किसी के काम आया।',
  'support.button': 'मुझे एक कॉफ़ी पिलाएँ',
  'support.pendingTitle': 'प्रोफ़ाइल अभी जुड़ा नहीं है',
  'support.pendingText': 'यहाँ अभी कोई पता नहीं है जिस पर सहयोग भेजा जा सके। तैयार होने पर वह इसी जगह दिखाई देगा — तब तक ऐप में सब कुछ बिलकुल वैसे ही काम करता है।',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'बटन Buy Me a Coffee का बाहरी पेज नए टैब में खोलता है। यही एकमात्र क्षण है जब कुछ इस डिवाइस से बाहर जाता है — और वह भी तभी जब आप उसे दबाते हैं। माप, इतिहास और सेटिंग यहीं रहते हैं।',
  'privacy.externalPending': 'जब पता उपलब्ध होगा, बटन दबाने पर एक बाहरी पेज नए टैब में खुलेगा। यही एकमात्र क्षण होगा जब कुछ इस डिवाइस से बाहर जाएगा। माप, इतिहास और सेटिंग यहीं रहते हैं।',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (ui-core.js में विकल्प)',
  'boot.need.metrics': 'कोई भी मान नहीं गिना जाएगा',
  'boot.need.bus': 'मॉड्यूल एक-दूसरे को देखना बंद कर देंगे',
  'boot.need.ui': 'स्क्रीनें बदली नहीं जा सकेंगी',
  'boot.need.engine': 'कैमरा और माप शुरू नहीं होंगे',
  'boot.need.support': 'सहयोग स्क्रीन ख़ाली रहेगी',
  'boot.need.tools': 'टूल टैब ख़ाली रहेगा',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'ये मॉड्यूल लोड नहीं हुए: {list}।',
  'boot.consoleHint': 'index.html में <script> टैग का क्रम और पथ जाँचें।',
  'boot.incompleteTitle': 'ऐप अधूरा लोड हुआ',
  'boot.incompleteText': '{missing} पेज दोबारा लोड करें; अगर इससे मदद न मिले, तो सर्वर पर फ़ाइलें अधूरी हैं।',
  'boot.newVersion': 'ऐप का नया संस्करण उपलब्ध है।',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'सीमाएँ क्या करती हैं। ',
  'thresholds.noteText': 'चेतावनी की सीमा पीली स्थिति जलाती है, गंभीर की सीमा लाल। बदलाव तुरंत असर करता है — उस रीडिंग पर भी जो पहले से स्क्रीन पर है। अपनी सीमाओं का सेट नाम देकर सहेज सकते हैं और जब चाहें उस पर लौट सकते हैं।',
  'thresholds.profilesTitle': 'सीमाओं के प्रोफ़ाइल',
  'thresholds.profilesSub': 'पहले से बने तीनों और आपके अपने',
  'thresholds.customName': 'अपने प्रोफ़ाइल का नाम',
  'thresholds.customPlaceholder': 'जैसे शाम को शयनकक्ष',
  'thresholds.save': 'मौजूदा सीमाएँ सहेजें',
  'thresholds.saveHelp': 'ठीक वही सीमाएँ सहेजता है जो ऊपर सेट हैं।',

  'profile.builtin.default.name': 'डिफ़ॉल्ट',
  'profile.builtin.default.desc': 'मापदंडों की सूची से ली गई सीमाएँ — हर माप के लिए शुरुआती बिंदु।',
  'profile.builtin.evening.name': 'शाम — नरम',
  'profile.builtin.evening.desc': 'ठंडे रंग और दैनिक लय पर असर की चेतावनी पहले देता है।',
  'profile.builtin.work.name': 'मेज़ पर काम',
  'profile.builtin.work.desc': 'चमकीली, ठंडी दिन की रोशनी की छूट देता है; झिलमिलाहट और एकरूपता पर नज़र रखता है।',
  'profile.custom.desc': 'आपका अपना प्रोफ़ाइल, {date} को सहेजा गया।',

  'toast.thresholdsReset': 'डिफ़ॉल्ट सीमाएँ लौटा दी गईं।',
  'toast.thresholdOrder': 'चेतावनी की सीमा गंभीर की सीमा से नीची होनी चाहिए।',
  'toast.thresholdOrderInverted': 'इस मापदंड के लिए चेतावनी की सीमा गंभीर की सीमा से ऊँची होनी चाहिए।',
  'toast.profileNameMissing': 'प्रोफ़ाइल का नाम दें।',
  'toast.profileSaved': '“{name}” प्रोफ़ाइल सहेजा गया।',
  'toast.profileApplied': '“{name}” प्रोफ़ाइल लागू किया गया।',
  'toast.profileApplyFailed': 'यह प्रोफ़ाइल लागू नहीं किया जा सका।',
  'toast.profileRemoved': 'प्रोफ़ाइल हटा दिया गया।',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'शेड्यूल किसलिए। ',
  'schedule.noteText': 'शाम को वे सीमाएँ समझ में आती हैं जो दोपहर की नहीं होतीं। “से–तक” वाला नियम प्रोफ़ाइल ख़ुद बदल देता है, ताकि यह याद न रखना पड़े। शेड्यूल कभी माप शुरू या बंद नहीं करता।',
  'schedule.toggle': 'अपने आप प्रोफ़ाइल बदलना चालू करें',
  'schedule.toggleSub': 'डिवाइस की घड़ी के हिसाब से हर मिनट जाँचा जाता है।',
  'schedule.emptyTitle': 'कोई नियम नहीं',
  'schedule.emptyText': 'नीचे दिए बटन से पहला नियम जोड़ें।',
  'schedule.add': 'नियम जोड़ें',
  'schedule.to': 'तक',
  'schedule.profile': 'प्रोफ़ाइल',
  'schedule.fromAria': 'नियम {n}: शुरू होने का समय',
  'schedule.toAria': 'नियम {n}: ख़त्म होने का समय',
  'toast.scheduleTimeFormat': 'समय 22:00 के प्रारूप में दें।',
  'toast.scheduleEnded': 'शेड्यूल ख़त्म हुआ — पिछली सीमाएँ लौट आईं।',
  'toast.scheduleApplied': 'शेड्यूल ने “{name}” प्रोफ़ाइल चालू किया।',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'अलर्ट क्या करता है। ',
  'alerts.noteText': 'वह एक मापदंड पर नज़र रखता है और तभी बोलता है जब वह मापदंड चुने हुए ज़ोन में तय किए गए समय तक लगातार बना रहे। वह कभी माप नहीं रोकता और बटनों को नहीं ढकता।',
  'alerts.toggle': 'एक्सपोज़र अलर्ट चालू करें',
  'alerts.toggleSub': 'ये केवल चलती हुई माप के दौरान काम करते हैं।',
  'alerts.metric': 'निगरानी वाला मापदंड',
  'alerts.level': 'किस ज़ोन से',
  'alerts.level.warning': 'चेतावनी और उससे ऊपर',
  'alerts.level.critical': 'केवल गंभीर',
  'alerts.sustain': 'कितने सेकंड लगातार के बाद',
  'alerts.sustainHelp': 'समय छोटा रखने पर फ़ोन हिलाते ही झूठे अलार्म ज़्यादा आते हैं।',
  'alerts.sound': 'छोटा ध्वनि-संकेत',
  'alerts.soundSub': 'ध्वनि इसी डिवाइस पर बनती है। इसे “अधिक” स्क्रीन पर पूरी तरह बंद भी किया जा सकता है।',
  'alerts.barTitle': 'एक्सपोज़र अलर्ट',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} {seconds} सेकंड से चेतावनी ज़ोन में बना हुआ है — अभी {value} {unit}।',
  'alerts.message.critical': '{name} {seconds} सेकंड से गंभीर ज़ोन में बना हुआ है — अभी {value} {unit}।',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'तुलना कैसे करें। ',
  'compare.noteText': 'माप शुरू करें, कैमरा पहले स्रोत की ओर करें और उसे A के रूप में सहेजें। दूरी और कोण बदले बिना रोशनी बदलें और B सहेजें। तुलना का मतलब तभी है जब दृश्य वही हो।',
  'compare.slotA': 'रोशनी A',
  'compare.slotB': 'रोशनी B',
  'compare.save': 'मौजूदा रीडिंग सहेजें',
  'compare.savedAt': '{date}, {time} को सहेजा गया',
  'compare.empty': 'अभी कुछ नहीं सहेजा गया।',
  'compare.verdictTitle': 'तुलना का नतीजा',
  'compare.verdictEmpty': 'दोनों रोशनियाँ सहेजें, तब दिखेगा कि कौन-सी नरम है।',
  'compare.notEnough': 'इन दो मापों की तुलना करने के लिए डेटा कम है।',
  'compare.tie': 'दोनों स्रोत लगभग एक जैसे निकलते हैं ({metric}: {a} और {b} {unit})। अंतर माप के शोर के भीतर है।',
  'compare.betterA': 'ज़्यादा नरम रोशनी A है — {metric} {better} {unit} है, दूसरी में {worse} {unit}।',
  'compare.betterB': 'ज़्यादा नरम रोशनी B है — {metric} {better} {unit} है, दूसरी में {worse} {unit}।',
  'compare.clear': 'तुलना मिटाएँ',
  'toast.compareSavedA': 'रोशनी A सहेजी गई।',
  'toast.compareSavedB': 'रोशनी B सहेजी गई।',
  'toast.compareCleared': 'तुलना मिटा दी गई।',
  'toast.measureFirst': 'पहले माप स्क्रीन पर माप शुरू करें।',

  /* Nazwa wielkości w środku zdania. Po polsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. Hindi nie
     zna wielkiej litery: to te same nazwy co w warstwie wspólnej. */
  'metric.share.nameLower': 'नीला अंश',
  'metric.brightness.nameLower': 'दृश्य की चमक',
  'metric.kelvin.nameLower': 'वर्ण ताप',
  'metric.melanopic.nameLower': 'दैनिक लय पर असर',
  'metric.flicker.nameLower': 'झिलमिलाहट',
  'metric.uniformity.nameLower': 'एकरूपता',
  'metric.comfort.nameLower': 'आँखों का आराम',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'यह क्यों काम करता है। ',
  'calib.noteText': 'कैमरे के सेंसर में चैनलों के बीच एक स्थिर झुकाव होता है। सफ़ेद काग़ज़ को मापने से पता चलता है कि वह कितना बड़ा है और उसे घटाया जा सकता है। इस ऐप में यही एकमात्र सुविधा है जो सचमुच सटीकता बढ़ाती है — और फिर भी वह कैमरे को स्पेक्ट्रोमीटर नहीं बना देती।',
  'calib.step1': 'मापी जा रही रोशनी के नीचे सफ़ेद काग़ज़ रखें',
  'calib.step2': 'माप शुरू करें और फ़्रेम को काग़ज़ से भर दें',
  'calib.step3': '“कैलिब्रेट करें” दबाएँ और 3 सेकंड तक फ़ोन न हिलाएँ',
  'calib.done': '{date}, {time} को कैलिब्रेट किया गया।',
  'calib.none': 'कोई कैलिब्रेशन नहीं। माप काम करती है, मानों को तुलनात्मक रूप में लें।',
  'calib.gain': '{channel} का गुणक',
  'calib.gainsLabel': 'चैनलों के गुणक',
  'calib.gainsUnset': 'सेट नहीं',
  'calib.start': 'कैलिब्रेट करें (3 s)',
  'calib.clear': 'कैलिब्रेशन हटाएँ',
  'toast.calibCleared': 'कैलिब्रेशन हटा दिया गया।',
  'calib.error.noEngine': 'माप का मॉड्यूल उपलब्ध नहीं है।',
  'calib.error.notRunning': 'पहले माप शुरू करें और कैमरा सफ़ेद काग़ज़ की ओर करें।',
  'calib.error.busy': 'कैलिब्रेशन पहले से चल रहा है।',
  'calib.error.tooFewSamples': 'नमूने बहुत कम हैं। जाँचें कि माप सचमुच चल रही है।',
  'calib.error.tooDark': 'तस्वीर कैलिब्रेशन के लिए बहुत गहरी है। काग़ज़ पर ज़्यादा रोशनी डालें और फिर कोशिश करें।',
  'calib.error.tooSkewed': 'चैनलों का झुकाव इतना बड़ा है कि उसे कैलिब्रेशन नहीं माना जा सकता। समान रोशनी में सफ़ेद काग़ज़ इस्तेमाल करें।',
  'calib.ok': 'कैलिब्रेट हो गया। वर्ण ताप और मेलेनोपिक असर अब ज़्यादा सटीक होंगे।',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'यह किसलिए है। ',
  'screencheck.noteText': 'पाँच चरण मॉनिटर को वैसे ही जाँचते हैं जैसे समीक्षा में जाँचा जाता है: दो चमक स्तरों पर सफ़ेद, बैकलाइट की एकरूपता, और यह कि सिस्टम का नाइट मोड सचमुच कुछ बदलता है या नहीं। विज़ार्ड चल रही माप को पढ़ता है; वह ख़ुद माप शुरू नहीं करता।',
  'screencheck.step.white100.title': 'पूरी चमक पर सफ़ेद',
  'screencheck.step.white100.hint': 'मॉनिटर पर कोई सफ़ेद पेज खोलें, चमक अधिकतम पर करें और फ़्रेम को स्क्रीन से भर दें।',
  'screencheck.step.white20.title': 'कम चमक पर सफ़ेद',
  'screencheck.step.white20.hint': 'मॉनिटर की चमक घटाकर लगभग एक-पाँचवीं करें और फ़्रेम न बदलें।',
  'screencheck.step.corners.title': 'स्क्रीन के कोने',
  'screencheck.step.corners.hint': 'पूरी चमक पर लौटें और कैमरे को पूरी स्क्रीन दिखाएँ — हम बैकलाइट की एकरूपता जाँच रहे हैं।',
  'screencheck.step.nightOff.title': 'नाइट मोड बंद',
  'screencheck.step.nightOff.hint': 'पक्का करें कि नीली रोशनी का फ़िल्टर बंद है।',
  'screencheck.step.nightOn.title': 'नाइट मोड चालू',
  'screencheck.step.nightOn.hint': 'सिस्टम में नीली रोशनी का फ़िल्टर चालू करें और वही फ़्रेम दोहराएँ।',
  'screencheck.stepHeading': '{total} में से चरण {n}: {title}',
  'screencheck.idleTitle': 'विज़ार्ड चालू नहीं है',
  'screencheck.idleHint': 'माप स्क्रीन पर माप शुरू करें, फिर यहाँ लौटें और “विज़ार्ड शुरू करें” दबाएँ।',
  'screencheck.next': 'चरण सहेजें और आगे बढ़ें',
  'screencheck.cancel': 'रोकें',
  'screencheck.start': 'विज़ार्ड शुरू करें',
  'screencheck.clearResult': 'नतीजा मिटाएँ',
  'screencheck.resultTitle': 'नतीजा',
  'screencheck.resultEmpty': 'अभी कोई चरण सहेजा नहीं गया।',
  'screencheck.resultPartial': '{total} में से {done} चरण सहेजे गए। तुलना के लिए कुछ होते ही निष्कर्ष दिखने लगेंगे।',
  'screencheck.note.uniformityLow': 'बैकलाइट की एकरूपता {value}% है — फ़्रेम में चमक के साफ़ अंतर दिखते हैं।',
  'screencheck.note.uniformityOk': 'बैकलाइट समान है ({value}%)।',
  'screencheck.note.nightWorks': 'नाइट मोड नीला अंश {value} प्रतिशत बिंदु घटाता है — यह काम करता है।',
  'screencheck.note.nightWeak': 'नाइट मोड नीला अंश केवल {value} प्रतिशत बिंदु बदलता है। यह उससे कम है जितना सिस्टम का फ़िल्टर आमतौर पर देता है।',
  'screencheck.note.pwm': 'कम चमक पर झिलमिलाहट {from}% से बढ़कर {to}% हो जाती है — यह स्पंदन-चौड़ाई से मद्धिम करने (PWM) का जाना-पहचाना लक्षण है।',
  'toast.screencheckDone': 'विज़ार्ड पूरा हुआ। नतीजा नीचे है।',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'ये संख्याएँ कहाँ से आती हैं। ',
  'reports.noteText': 'रिपोर्ट इसी डिवाइस पर सहेजे गए इतिहास से गिनी जाती है — हर पाँच सेकंड पर एक बिंदु। इंजन उसे पहली माप से इकट्ठा करता आ रहा है, इसलिए रिपोर्ट तुरंत तैयार रहती है।',
  'reports.rangeAria': 'रिपोर्ट की अवधि',
  'reports.day': 'पिछले 24 घंटे',
  'reports.week': 'पिछले 7 दिन',
  'reports.date': '{date} की रिपोर्ट।',
  'report.headerDay': '{from} से {to} तक का दिन — {count}।',
  'report.headerWeek': '{from} से {to} तक का सप्ताह — {count}।',
  'count.points': { one: '{n} बिंदु', other: '{n} बिंदु' },
  'count.samples': { one: '{n} नमूना', other: '{n} नमूने' },
  'report.emptyTitle': 'इस अवधि में कोई डेटा नहीं',
  'report.emptyText': 'माप स्क्रीन पर माप शुरू करें — इतिहास अपने आप सहेजा जाता है।',
  'report.colAvg': 'औसत',
  'report.colMin': 'न्यूनतम',
  'report.colMax': 'अधिकतम',
  'report.zonesTitle': 'ज़ोन का वितरण',
  'report.worstHour': 'दिन का सबसे बुरा समय',
  'report.worstHourNone': 'कोई साफ़ नहीं',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'इसका क्या करें',
  'report.disclaimerTitle': 'यह स्वास्थ्य सलाह नहीं है। ',
  'report.disclaimerText': 'निष्कर्ष केवल उसी से निकले हैं जो इस फ़ोन के कैमरे ने देखा। ऐप स्पेक्ट्रम नहीं मापता, लक्स नहीं जानता और कोई निदान नहीं करता।',

  'advice.melanopic': 'दैनिक लय पर औसत असर {value}× रहा। शाम को 0.50 से नीचे जाना बेहतर है — सबसे आसानी से गर्म बल्ब या नाइट मोड से।',
  'advice.kelvin': 'रोशनी ठंडी थी (औसतन {value} K)। काम के लिए यह ठीक है; सोने से दो घंटे पहले 3000 K से नीचे बेहतर रहता है।',
  'advice.flicker': 'ध्यान देने लायक झिलमिलाहट मिली (औसतन {value}%)। इसके पीछे आमतौर पर सस्ता डिमर या बैकलाइट का पावर सप्लाई होता है।',
  'advice.uniformity': 'रोशनी असमान रूप से फैली है ({value}%)। लैंप खिसकाने या उसका कोण बदलने से आमतौर पर बल्ब बदलने से ज़्यादा फ़र्क़ पड़ता है।',
  'advice.worstHour': 'दिन का सबसे बुरा समय {hour}:00 बजे है — सामान्य सीमा से बाहर की सबसे ज़्यादा रीडिंग वहीं जमा होती हैं।',
  'advice.none': 'इस अवधि में कुछ भी सामान्य सीमा से बाहर नहीं निकलता। अब सबसे ज़्यादा फ़ायदा A/B तुलना में दो प्रकाश स्रोतों की तुलना से होगा।',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'फ़ाइल का प्रारूप। ',
  'export.noteText': 'ख़ानों का विभाजक सेमीकोलन, दशमलव का विभाजक अल्पविराम, कोडिंग UTF-8 और शुरुआत में BOM चिह्न। ऐसी फ़ाइल को वह Excel बिना कुछ सेट किए खोल लेता है जिसकी लोकेल में दशमलव का विभाजक अल्पविराम है।',
  'export.range': 'डेटा की अवधि',
  'export.columns': 'फ़ाइल के ख़ाने',
  'export.chipFilled': ' — ख़ाना भरा हुआ',
  'export.help': 'फ़ाइल में सातों ख़ाने होते हैं — इंजन उन्हें पहली माप से गिनता है और वे सब फ़ाइल में जाते हैं।',
  'export.run': 'CSV फ़ाइल सहेजें',
  'export.previewEmpty': 'इस अवधि में कोई रीडिंग नहीं। माप शुरू करें — इतिहास अपने आप सहेजा जाता है।',
  'csv.range.hour': 'पिछला एक घंटा',
  'csv.range.day': 'पिछले 24 घंटे',
  'csv.range.week': 'पिछले 7 दिन',
  'csv.range.month': 'पिछले 30 दिन',
  'csv.colDate': 'तारीख़',
  'csv.colTime': 'समय',
  'csv.colZone': 'ज़ोन',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'चुनी हुई अवधि में एक भी रीडिंग नहीं है।',
  'toast.exportFailed': 'इस ब्राउज़र ने फ़ाइल सहेजने नहीं दी।',
  'toast.exportSaved': {
    one: '{filename} फ़ाइल सहेजी गई ({n} पंक्ति)।',
    other: '{filename} फ़ाइल सहेजी गई ({n} पंक्तियाँ)।'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} घं. {m} मि.',
  'duration.ms': '{m} मि. {s} से.',
  'duration.s': '{s} से.'
});
