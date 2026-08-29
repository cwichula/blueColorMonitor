/* docs/v2/i18n/bn.js — słownik WERSJI 2, bengalski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/bn.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej.
 *
 * SKĄD TE ZDANIA: przekład z pl.js (treść) i z en.js (rejestr), a nie kalka
 * słowo w słowo. Terminologia jest przepisana co do znaku z warstwy wspólnej
 * docs/shared/i18n/bn.js, bo ta sama wielkość nie może nazywać się na kafelku
 * inaczej niż w zdaniu raportu:
 *   নীল আলোর অংশ, দৃশ্যের উজ্জ্বলতা, বর্ণ তাপমাত্রা, দেহঘড়িতে প্রভাব,
 *   মিটমিটানি, সমরূপতা, চোখের আরাম; strefy সীমার মধ্যে / সতর্কতা / গুরুতর.
 * Klucze '*.nameLower' to te same nazwy — bengalski nie zna wielkiej litery,
 * więc różnicy między nazwą z kafelka a nazwą w środku zdania po prostu nie ma.
 *
 * REJESTR: standardowy bengalski (চলিত ভাষা), uprzejmy tryb -উন („করুন”,
 * „দেখুন”). Etykiety przycisków, kafelków i zakładek krótkie; teksty pomocy
 * pełnymi zdaniami zakończonymi dandą (।).
 *
 * CYFRY: bengalskie (০–৯), tak jak w warstwie wspólnej i tak, jak liczby
 * podstawiane w czasie działania przez Intl.NumberFormat('bn'). Symbole
 * jednostek (%, K, ×, Hz), nazwy formatów (CSV, UTF-8, BOM, Excel),
 * identyfikatory (sRGB, PWM, index.html, ../shared/bus.js) i wzór godziny
 * „22:00” zostają bez zmian — nie są zdaniem. Godzina w 'report.hour'
 * i 'advice.worstHour' też: tam wstawka jest gołą liczbą z kodu.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (i dlaczego):
 *   'zone.warning'        — nadpisane dla zgodności z pl.js i en.js; bengalski
 *                           ma na „Uwaga” i „Ostrzeżenie” jedno słowo সতর্কতা,
 *                           więc napis wychodzi ten sam co we wspólnym;
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules. Bengalski ma dwie kategorie — 'one' i 'other'; rzeczownik
 * po liczebniku się nie odmienia, więc obie formy są celowo identyczne.
 * Patrz nagłówek docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['bn'] = Object.assign(window.I18nData['bn'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'আলোর মনিটর — নীল আলোর পরিমাপ',
  'app.description': 'আলোর মনিটর — ফোনের ক্যামেরা দিয়ে আলোর নীল অংশ মাপা। সাতটি সূচক, লেখচিত্র, ইতিহাস। সবকিছুই খোলা, কোনো অ্যাকাউন্ট ছাড়া এবং কোনো ফি ছাড়া।',
  'app.skipToContent': 'মূল বিষয়বস্তুতে যান',
  'app.measuring': 'পরিমাপ চলছে',
  'app.docsButton': 'ডকুমেন্টেশন ও ব্যাখ্যা',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — সংস্করণ ২',

  'nav.aria': 'প্রধান নেভিগেশন',
  'nav.tablistAria': 'অ্যাপের পর্দা',
  'nav.measure': 'পরিমাপ',
  'nav.history': 'ইতিহাস',
  'nav.tools': 'সরঞ্জাম',
  'nav.support': 'সহযোগিতা',
  'nav.more': 'আরও',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'ডকুমেন্টেশন',
  'panel.thresholds': 'সীমা ও প্রোফাইল',
  'panel.reports': 'রিপোর্ট',
  'panel.export': 'ডেটা এক্সপোর্ট',
  'panel.compare': 'A/B তুলনা',
  'panel.calibration': 'সাদা কাগজে ক্যালিব্রেশন',
  'panel.screenCheck': 'আমার মনিটর দেখে নিন',
  'panel.schedule': 'সময়সূচি',
  'panel.alerts': 'এক্সপোজার সতর্কবার্তা',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'ফিরে যান',
  'action.close': 'বন্ধ করুন',
  'action.refresh': 'রিফ্রেশ',
  'action.apply': 'প্রয়োগ করুন',
  'action.delete': 'মুছুন',
  'action.hide': 'লুকান',
  'action.start': 'শুরু',
  'action.stop': 'থামান',
  'action.switch': 'বদলান',
  'action.switchAria': 'ক্যামেরা বদলান: সামনের বা পিছনের',
  'action.resetDefaults': 'ডিফল্ট ফিরিয়ে আনুন',
  'action.reports': 'রিপোর্ট',
  'action.exportCsv': 'CSV এক্সপোর্ট',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'পর্দা: {name}',
  'a11y.measureStarted': 'পরিমাপ শুরু হয়েছে।',
  'a11y.measureStopped': 'পরিমাপ থামানো হয়েছে।',
  'a11y.measureStoppedSummary': 'পরিমাপ থামানো হয়েছে। সময়: {duration}, {samples}।',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'সীমার প্রোফাইল প্রয়োগ করা হয়েছে।',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'নিশ্চিতকরণ',
  'dialog.confirm': 'নিশ্চিত করুন',
  'dialog.cancel': 'বাতিল',
  'dialog.infoTitle': 'তথ্য',
  'dialog.ok': 'বুঝেছি',

  'help.sheetTitle': 'সূচকের বিবরণ',
  'help.unit': 'একক',
  'help.scaleRange': 'স্কেলের পরিসর',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'সতর্কতা',
  'threshold.crit': 'গুরুতর',
  'threshold.warnLabel': 'সতর্কতার সীমা',
  'threshold.critLabel': 'গুরুতর সীমা',
  'threshold.warnAria': '{name} — সীমা: সতর্কতা',
  'threshold.critAria': '{name} — সীমা: গুরুতর',

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

  'firstRun.title': 'কীভাবে মাপবেন',
  'firstRun.text': '“শুরু” চাপুন, ফোনটি কোনো আলোকিত পৃষ্ঠের দিকে তাক করুন এবং কয়েক সেকেন্ড স্থির ধরে রাখুন। প্রিভিউয়ের চৌকোটি দেখায়, অ্যাপ সত্যিই কোন অংশটি পড়ছে।',
  'firstRun.close': 'পরামর্শটি বন্ধ করুন',

  'camera.live': 'সরাসরি',
  'camera.idle': 'ক্যামেরা বন্ধ আছে। “শুরু” চাপুন, ফোনটি কোনো আলোকিত পৃষ্ঠের দিকে তাক করুন এবং কয়েক সেকেন্ড স্থির ধরে রাখুন।',
  'camera.stopped': 'পরিমাপ থামানো হয়েছে। আবার মাপতে “শুরু” চাপুন।',

  'error.cameraStart': 'ক্যামেরা চালু করা যায়নি।',
  'error.engineMissing': 'পরিমাপের মডিউলটি লোড হয়নি।',

  'metrics.sevenTitle': 'সাতটি সূচক',
  'measure.tilesSub': 'সেকেন্ডে ৫ বার হালনাগাদ হয়',

  'session.title': 'এই সেশন',
  'session.duration': 'পরিমাপের সময়',
  'session.samples': 'নমুনার সংখ্যা',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     Bengalski nie odmienia rzeczownika po liczbie, więc słowo jest to samo,
     co pod suwakiem; liczbę niesie sam licznik obok. */
  'zone.count.good': 'সীমার মধ্যে',
  'zone.count.warning': 'সতর্কতা',
  'zone.count.critical': 'গুরুতর',

  'note.calibrated': 'সাদা কাগজ দিয়ে পরিমাপ ক্যালিব্রেট করা — চ্যানেলগুলো সমান করা হয়েছে।',

  'tile.helpAria': 'এর মানে কী: {name}',
  'tile.noMeasurement': 'পরিমাপ নেই',
  'tile.outOfScale': 'স্কেলের বাইরে',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'সতর্কতা',
  'zone.spoken.warning': 'সতর্কতা',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'সময়ের সঙ্গে বদল',
  'history.pickHint': 'একটি সূচক আর একটি পরিসর বাছুন',
  'history.metricLabel': 'সূচক',
  'history.rangeAria': 'লেখচিত্রের সময়-পরিসর',
  'history.emptyTitle': 'এই পরিসরে কোনো তথ্য নেই',
  'history.emptyText': 'পরিমাপ পর্দায় পরিমাপ শুরু করুন — লেখচিত্র কয়েক সেকেন্ডেই ভরে যাবে।',
  'history.tableTitle': 'সাম্প্রতিক পাঠ',
  'history.tableHide': 'টেবিল লুকান',
  'history.tableShow': 'টেবিল দেখান',
  'history.tableCaption': 'পরিমাপের সাম্প্রতিক পাঠ, নতুনটি উপরে।',
  'history.tableEmpty': 'কোনো পাঠ নেই। পরিমাপ পর্দায় পরিমাপ শুরু করুন।',

  'table.time': 'সময়',
  'table.metric': 'সূচক',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     dłuższy zapis łamał się na dwie linie. */
  'range.1m': '১ মিন',
  'range.1h': '১ ঘ',
  'range.24h': '২৪ ঘ',
  'range.7d': '৭ দিন',
  'range.30d': '৩০ দিন',

  'chart.now': 'এখন',
  'chart.countSub': {
    one: 'বাছাই করা পরিসরে {n}টি পাঠ',
    other: 'বাছাই করা পরিসরে {n}টি পাঠ'
  },
  'chart.aria': '{name}, পরিসর {range}, {count}, সর্বশেষ মান {value} {unit}।',
  'chart.ariaZone': '{name}, পরিসর {range}, {count}, সর্বশেষ মান {value} {unit}, অঞ্চল: {zone}।',
  'chart.ariaEmpty': '{name} — {range} পরিসরে কোনো তথ্য নেই।',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'উইজার্ড ও সহায়ক সুবিধা',
  'tools.note': 'সরঞ্জামগুলো পরিমাপ বুঝতে সাহায্য করে। সবগুলোই সঙ্গে সঙ্গে ব্যবহার করা যায়, আর পরিমাপ নিজে এগুলো ছাড়াই চলে।',

  'tool.thresholds.sub': 'কোন মান থেকে সতর্কতা জ্বলবে',
  'tool.compare.sub': 'দুটি আলোর মধ্যে কোনটি নরম',
  'tool.calibration.sub': 'একমাত্র সুবিধা, যা সত্যিই নির্ভুলতা বাড়ায়',
  'tool.screenCheck.sub': 'পাঁচটি ধাপ আর পর্দা নিয়ে তৈরি সিদ্ধান্ত',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Harmonogram progów”
     kontra „Harmonogram”. Tak było i tak zostaje. */
  'tool.schedule.title': 'সীমার সময়সূচি',
  'tool.schedule.sub': 'সন্ধ্যায় অন্য সীমা, মনে রাখার দরকার ছাড়াই',
  'tool.alerts.sub': 'গুরুতর অঞ্চল বেশি সময় ধরে থাকলে সংকেত',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'সেটিংস',
  'more.thresholdsSub': 'কোন মান থেকে সতর্কতা জ্বলবে',
  'more.docsSub': 'কীভাবে মাপবেন, আর এই পরিমাপ যা বলে না',
  'more.appearanceTitle': 'চেহারা ও সহজলভ্যতা',

  'settings.theme': 'থিম',
  'theme.auto': 'সিস্টেম অনুযায়ী',
  'theme.light': 'হালকা',
  'theme.dark': 'গাঢ়',

  'settings.textScale': 'লেখার আকার',
  'textScale.100': 'সাধারণ',
  'textScale.115': 'বড় (১১৫%)',
  'textScale.130': 'সবচেয়ে বড় (১৩০%)',

  'settings.contrast': 'বেশি বৈসাদৃশ্য',
  'settings.contrastSub': 'আরও স্পষ্ট বর্ডার এবং গাঢ় সহায়ক লেখা।',
  'settings.sound': 'সতর্কবার্তার শব্দ',
  'settings.soundSub': 'এক্সপোজার সতর্কবার্তা চালু হলে ছোট একটি সংকেত।',
  'settings.vibrate': 'সতর্কবার্তায় কম্পন',
  'settings.vibrateSub': 'কেবল যেসব ডিভাইস এটি সমর্থন করে, সেখানেই কাজ করে।',

  'more.dataTitle': 'ডেটা',
  'more.clearHistory': 'পরিমাপের ইতিহাস মুছে ফেলুন',
  'more.clearHistorySub': 'এই ডিভাইস থেকে সংরক্ষিত পাঠ মুছে দেয়। সীমা, প্রোফাইল ও সেটিংস থেকে যায়।',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'অ্যাপটি পুরোপুরি বিনামূল্যে। ',
  'more.supportLink': 'চাইলে স্বেচ্ছায় এর পাশে দাঁড়াতে পারেন।',

  'dialog.clearHistory.title': 'সংরক্ষিত ইতিহাস মুছে ফেলবেন?',
  'dialog.clearHistory.body': {
    one: 'এই ডিভাইস থেকে {n}টি সংরক্ষিত পরিমাপ-বিন্দু মুছে ফেলা হবে। এটি আর ফেরানো যাবে না। সীমা, প্রোফাইল ও সেটিংসে হাত পড়বে না।',
    other: 'এই ডিভাইস থেকে {n}টি সংরক্ষিত পরিমাপ-বিন্দু মুছে ফেলা হবে। এটি আর ফেরানো যাবে না। সীমা, প্রোফাইল ও সেটিংসে হাত পড়বে না।'
  },
  'dialog.clearHistory.confirm': 'ইতিহাস মুছুন',
  'dialog.clearHistory.cancel': 'থাক',

  'toast.historyCleared': 'পরিমাপের ইতিহাস মুছে ফেলা হয়েছে।',
  'toast.screenUnavailable': 'এই সংস্করণে ওই পর্দাটি এখনো নেই।',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'এই অ্যাপ কী মাপে',
  'docs.leadText': 'ফোনের ক্যামেরা কোনো আলোকিত পৃষ্ঠের দিকে তাকায়, আর অ্যাপ সেকেন্ডে ৫ বার ফ্রেমের মাঝের অংশ থেকে R, G ও B চ্যানেলের গড় হিসাব করে। এই তিনটি সংখ্যা থেকেই সাতটি সূচক বেরিয়ে আসে।',
  'docs.limitsTitle': 'পদ্ধতির সীমা',
  'docs.limitsText': 'ক্যামেরায় তিনটি চওড়া বর্ণ-চ্যানেল, স্বয়ংক্রিয় এক্সপোজার আর স্বয়ংক্রিয় হোয়াইট ব্যালেন্স থাকে। এটি বর্ণালি মাপে না এবং কোনো পরম মান জানে না, তাই উজ্জ্বলতা একটি আপেক্ষিক নির্দেশক, লাক্স নয়। বর্ণ তাপমাত্রা আর দেহঘড়িতে প্রভাব sRGB রং থেকে হিসাব করা আনুমানিক মান। {rate} Hz-এ নমুনা নিলে কেবল {limit} Hz-এর নিচের মিটমিটানি দেখা যায় — বিদ্যুতের লাইনের ১০০ Hz নাগালের বাইরে এবং অ্যাপ কখনোই একে ফল হিসেবে দেখাবে না।',

  'note.howTo.repeat.title': 'পরিমাপটি আবার করুন',
  'note.howTo.repeat.text': 'একটিমাত্র পাঠ একটি স্ন্যাপশট। দশ-পনেরো সেকেন্ড ধরে মাপলে ছবিটা অনেক বেশি নির্ভরযোগ্য হয়।',

  'docs.scale': 'স্কেল',
  'docs.direction': 'দিক',
  'docs.directionHigher': 'বেশি মানে ভালো',
  'docs.directionLower': 'কম মানে নরম',
  'docs.privacyTitle': 'ডেটা ও গোপনীয়তা',
  'docs.privacyText': 'ক্যামেরার ছবি কোথাও পাঠানো হয় না, কোথাও সংরক্ষণও করা হয় না — প্রতিটি ফ্রেম থেকে কেবল তিনটি সংখ্যা থেকে যায়। পরিমাপ, সীমা ও সেটিংস এই ডিভাইসে ব্রাউজারের স্মৃতিতেই থাকে। অ্যাপটি কোনো নেটওয়ার্ক অনুরোধ করে না এবং অফলাইন মোডে চলে।',
  'docs.freeLine': 'সাতটি সূচক, ইতিহাস, লেখচিত্র, সরঞ্জাম আর অফলাইন মোড — সবই সবার জন্য কাজ করে, কোনো অ্যাকাউন্ট ছাড়া এবং কোনো ফি ছাড়া।',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'সবকিছুই খোলা',
  'support.heroText': 'সাতটি সূচক, পরিমাপের ইতিহাস, লেখচিত্র, সব সরঞ্জাম আর অফলাইন মোড — সবার জন্য, সঙ্গে সঙ্গেই কাজ করে। কোনো অ্যাকাউন্ট নেই, কোনো সীমা নেই, কোনো ফি নেই।',
  'support.whyTitle': 'কেন আমি এটা চাইছি',
  'support.whyText': '{app} তৈরি হয় কাজের বাইরের সময়ে এবং কারও কাছ থেকে কিছু আয় করে না: কোনো বিজ্ঞাপন নেই, কোনো ডেটা সংগ্রহ নেই, বিক্রি করার মতো কিছুই নেই। একে টিকিয়ে রাখা আর এগিয়ে নেওয়া — নতুন সূচক, ত্রুটি সারানো, আরও ফোনে পরীক্ষা — সময় খরচ করায়। অ্যাপটি আপনার কাজে লেগে থাকলে আপনি কিছু দিতে পারেন। দিতেই হবে, এমন নয়।',
  'support.whatTitle': 'দান করলে কী পাবেন',
  'support.whatText': 'কিছুই না। সত্যিই এটি কিছুই খুলে দেয় না এবং কিছু দ্রুততরও করে না — দানের আগে আর পরে অ্যাপ দেখতে ও চলতে ঠিক একই রকম। শুধু এটুকুই থাকে যে লেখক জানলেন, এই কাজ কারও উপকারে এসেছে।',
  'support.button': 'আমাকে এক কাপ কফি খাওয়ান',
  'support.pendingTitle': 'প্রোফাইলটি এখনো যুক্ত করা হয়নি',
  'support.pendingText': 'সহযোগিতা পাঠানোর মতো কোনো ঠিকানা এখানে এখনো নেই। তৈরি হলে সেটি ঠিক এই জায়গাতেই আসবে — ততক্ষণ অ্যাপের সবকিছু ঠিক একই রকম চলে।',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'বোতামটি নতুন ট্যাবে Buy Me a Coffee-এর বাইরের পাতা খোলে। এটিই একমাত্র মুহূর্ত যখন কিছু এই ডিভাইস ছেড়ে যায় — আর তা ঘটে কেবল আপনি সেটি চাপার পরেই। পরিমাপ, ইতিহাস আর সেটিংস এখানেই থাকে।',
  'privacy.externalPending': 'ঠিকানাটি পাওয়া গেলে বোতামটি চাপলে নতুন ট্যাবে একটি বাইরের পাতা খুলবে। সেটিই হবে একমাত্র মুহূর্ত যখন কিছু এই ডিভাইস ছেড়ে যায়। পরিমাপ, ইতিহাস আর সেটিংস এখানেই থাকে।',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (ui-core.js-এ বিকল্প)',
  'boot.need.metrics': 'কোনো মানই হিসাব হবে না',
  'boot.need.bus': 'মডিউলগুলো একে অন্যকে আর দেখতে পাবে না',
  'boot.need.ui': 'পর্দা বদলানো যাবে না',
  'boot.need.engine': 'ক্যামেরা আর পরিমাপ চালু হবে না',
  'boot.need.support': 'সহযোগিতা পর্দা ফাঁকা থাকবে',
  'boot.need.tools': 'সরঞ্জাম ট্যাব ফাঁকা থাকবে',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'এই মডিউলগুলো লোড হয়নি: {list}।',
  'boot.consoleHint': 'index.html-এ <script> ট্যাগের ক্রম আর পথ দেখে নিন।',
  'boot.incompleteTitle': 'অ্যাপটি সম্পূর্ণ লোড হয়নি',
  'boot.incompleteText': '{missing} পৃষ্ঠাটি রিফ্রেশ করুন; তাতেও কাজ না হলে সার্ভারে ফাইলগুলো অসম্পূর্ণ।',
  'boot.newVersion': 'অ্যাপের নতুন সংস্করণ এসেছে।',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'সীমা কী করে। ',
  'thresholds.noteText': 'সতর্কতার সীমা হলুদ অবস্থা জ্বালায়, গুরুতর সীমা লাল। বদল সঙ্গে সঙ্গেই কাজ করে — পর্দায় ইতিমধ্যেই থাকা পাঠেও। নিজের সীমার সেট নাম দিয়ে সংরক্ষণ করে রাখতে পারেন, আর যখন খুশি তাতে ফিরে আসতে পারেন।',
  'thresholds.profilesTitle': 'সীমার প্রোফাইল',
  'thresholds.profilesSub': 'তিনটি অন্তর্নির্মিত আর আপনার নিজের',
  'thresholds.customName': 'নিজের প্রোফাইলের নাম',
  'thresholds.customPlaceholder': 'যেমন সন্ধ্যায় শোবার ঘর',
  'thresholds.save': 'বর্তমান সীমা সংরক্ষণ করুন',
  'thresholds.saveHelp': 'ঠিক উপরে যে সীমাগুলো বসানো আছে, সেগুলোই সংরক্ষণ করে।',

  'profile.builtin.default.name': 'ডিফল্ট',
  'profile.builtin.default.desc': 'সূচকের তালিকা থেকে আসা সীমা — সব পরিমাপের শুরুর বিন্দু।',
  'profile.builtin.evening.name': 'সন্ধ্যা — নরম',
  'profile.builtin.evening.desc': 'ঠান্ডা রং আর দেহঘড়িতে প্রভাব নিয়ে আগেভাগেই সতর্ক করে।',
  'profile.builtin.work.name': 'ডেস্কের কাজ',
  'profile.builtin.work.desc': 'উজ্জ্বল, ঠান্ডা দিনের আলো চলতে দেয়; মিটমিটানি আর সমরূপতার দিকে নজর রাখে।',
  'profile.custom.desc': 'নিজের প্রোফাইল, {date} তারিখে সংরক্ষিত।',

  'toast.thresholdsReset': 'ডিফল্ট সীমা ফিরিয়ে আনা হয়েছে।',
  'toast.thresholdOrder': 'সতর্কতার সীমা গুরুতর সীমার চেয়ে কম হতে হবে।',
  'toast.thresholdOrderInverted': 'এই সূচকের জন্য সতর্কতার সীমা গুরুতর সীমার চেয়ে বেশি হতে হবে।',
  'toast.profileNameMissing': 'প্রোফাইলের একটি নাম দিন।',
  'toast.profileSaved': '“{name}” প্রোফাইল সংরক্ষণ করা হয়েছে।',
  'toast.profileApplied': '“{name}” প্রোফাইল প্রয়োগ করা হয়েছে।',
  'toast.profileApplyFailed': 'এই প্রোফাইলটি প্রয়োগ করা যায়নি।',
  'toast.profileRemoved': 'প্রোফাইল মুছে ফেলা হয়েছে।',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'সময়সূচি কেন। ',
  'schedule.noteText': 'সন্ধ্যায় যে সীমাগুলো মানানসই, দুপুরে সেগুলো নয়। “শুরু–শেষ” নিয়ম প্রোফাইলটি নিজেই বদলে দেয়, যাতে সেটি মনে রাখতে না হয়। সময়সূচি কখনোই পরিমাপ চালু বা বন্ধ করে না।',
  'schedule.toggle': 'স্বয়ংক্রিয় বদল চালু করুন',
  'schedule.toggleSub': 'ডিভাইসের ঘড়ি ধরে প্রতি মিনিটে দেখা হয়।',
  'schedule.emptyTitle': 'কোনো নিয়ম নেই',
  'schedule.emptyText': 'নিচের বোতাম দিয়ে প্রথম নিয়মটি যোগ করুন।',
  'schedule.add': 'নিয়ম যোগ করুন',
  'schedule.to': 'পর্যন্ত',
  'schedule.profile': 'প্রোফাইল',
  'schedule.fromAria': 'নিয়ম {n}: শুরুর সময়',
  'schedule.toAria': 'নিয়ম {n}: শেষের সময়',
  'toast.scheduleTimeFormat': 'সময় 22:00 ছাঁদে লিখুন।',
  'toast.scheduleEnded': 'সময়সূচি শেষ হয়েছে — আগের সীমাগুলো ফিরে এসেছে।',
  'toast.scheduleApplied': 'সময়সূচি “{name}” প্রোফাইল চালু করেছে।',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'সতর্কবার্তা কী করে। ',
  'alerts.noteText': 'এটি একটি সূচকের দিকে নজর রাখে এবং কেবল তখনই কথা বলে, যখন সেই সূচক বাছাই করা অঞ্চলটি ঠিক করা সময় ধরে একটানা ধরে রাখে। এটি কখনোই পরিমাপ থামায় না এবং বোতামও ঢাকে না।',
  'alerts.toggle': 'এক্সপোজার সতর্কবার্তা চালু করুন',
  'alerts.toggleSub': 'কেবল পরিমাপ চলার সময়েই কাজ করে।',
  'alerts.metric': 'যে সূচকে নজর',
  'alerts.level': 'কোন অঞ্চল থেকে',
  'alerts.level.warning': 'সতর্কতা ও তার উপরে',
  'alerts.level.critical': 'কেবল গুরুতর',
  'alerts.sustain': 'কত সেকেন্ড একটানা থাকার পর',
  'alerts.sustainHelp': 'সময় কম রাখলে ফোন নাড়ানোর সময় বেশি ভুল সংকেত আসে।',
  'alerts.sound': 'ছোট একটি শব্দ-সংকেত',
  'alerts.soundSub': 'শব্দটি এই ডিভাইসেই তৈরি হয়। আরও পর্দা থেকে একে পুরোপুরি বন্ধও করা যায়।',
  'alerts.barTitle': 'এক্সপোজার সতর্কবার্তা',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} {seconds} সে. ধরে সতর্কতার অঞ্চলে আছে — এখন {value} {unit}।',
  'alerts.message.critical': '{name} {seconds} সে. ধরে গুরুতর অঞ্চলে আছে — এখন {value} {unit}।',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'কীভাবে তুলনা করবেন। ',
  'compare.noteText': 'পরিমাপ শুরু করুন, ক্যামেরা প্রথম উৎসের দিকে তাক করুন এবং সেটিকে A হিসেবে সংরক্ষণ করুন। দূরত্ব বা কোণ না বদলে আলো পাল্টান এবং B সংরক্ষণ করুন। দৃশ্য এক থাকলেই কেবল তুলনার মানে হয়।',
  'compare.slotA': 'আলো A',
  'compare.slotB': 'আলো B',
  'compare.save': 'বর্তমান পাঠ সংরক্ষণ করুন',
  'compare.savedAt': '{date}, {time}-এ সংরক্ষিত',
  'compare.empty': 'এখনো কিছুই সংরক্ষণ করা হয়নি।',
  'compare.verdictTitle': 'তুলনার ফল',
  'compare.verdictEmpty': 'কোনটি নরম তা দেখতে দুটি আলোই সংরক্ষণ করুন।',
  'compare.notEnough': 'এই দুটি পরিমাপ তুলনা করার মতো যথেষ্ট তথ্য নেই।',
  'compare.tie': 'দুটি উৎসই কার্যত একই রকম আসে ({metric}: {a} আর {b} {unit})। পার্থক্যটুকু পরিমাপের গোলমালের ভিতরেই পড়ে।',
  'compare.betterA': 'নরম আলো হলো A — {metric} {better} {unit}, অন্যটিতে {worse} {unit}।',
  'compare.betterB': 'নরম আলো হলো B — {metric} {better} {unit}, অন্যটিতে {worse} {unit}।',
  'compare.clear': 'তুলনা মুছুন',
  'toast.compareSavedA': 'আলো A সংরক্ষণ করা হয়েছে।',
  'toast.compareSavedB': 'আলো B সংরক্ষণ করা হয়েছে।',
  'toast.compareCleared': 'তুলনা মুছে ফেলা হয়েছে।',
  'toast.measureFirst': 'আগে পরিমাপ পর্দায় পরিমাপ শুরু করুন।',

  /* Nazwa wielkości w środku zdania. Po polsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie.
     Bengalski nie zna wielkiej litery, więc stoją tu nazwy z warstwy wspólnej
     co do znaku. */
  'metric.share.nameLower': 'নীল আলোর অংশ',
  'metric.brightness.nameLower': 'দৃশ্যের উজ্জ্বলতা',
  'metric.kelvin.nameLower': 'বর্ণ তাপমাত্রা',
  'metric.melanopic.nameLower': 'দেহঘড়িতে প্রভাব',
  'metric.flicker.nameLower': 'মিটমিটানি',
  'metric.uniformity.nameLower': 'সমরূপতা',
  'metric.comfort.nameLower': 'চোখের আরাম',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'কেন এটি কাজ করে। ',
  'calib.noteText': 'ক্যামেরার সেন্সরে চ্যানেলগুলোর মধ্যে একটি স্থায়ী বিচ্যুতি থাকে। সাদা কাগজ মেপে দেখা যায় সেটি কত বড়, আর তা বিয়োগ করে নেওয়া যায়। এই অ্যাপে এটিই একমাত্র সুবিধা, যা সত্যিই নির্ভুলতা বাড়ায় — তবু এতে ক্যামেরা স্পেকট্রোমিটার হয়ে যায় না।',
  'calib.step1': 'যে আলো মাপছেন তার নিচে একটি সাদা কাগজ রাখুন',
  'calib.step2': 'পরিমাপ শুরু করুন এবং কাগজ দিয়ে ফ্রেম ভরে দিন',
  'calib.step3': '“ক্যালিব্রেট করুন” চাপুন এবং ৩ সেকেন্ড ফোন নাড়াবেন না',
  'calib.done': '{date}, {time}-এ ক্যালিব্রেট করা হয়েছে।',
  'calib.none': 'কোনো ক্যালিব্রেশন নেই। পরিমাপ চলে; মানগুলোকে তুলনামূলক হিসেবেই দেখুন।',
  'calib.gain': '{channel} গুণক',
  'calib.gainsLabel': 'চ্যানেলের গুণক',
  'calib.gainsUnset': 'ঠিক করা নেই',
  'calib.start': 'ক্যালিব্রেট করুন (৩ সে.)',
  'calib.clear': 'ক্যালিব্রেশন মুছুন',
  'toast.calibCleared': 'ক্যালিব্রেশন মুছে ফেলা হয়েছে।',
  'calib.error.noEngine': 'পরিমাপের মডিউলটি পাওয়া যাচ্ছে না।',
  'calib.error.notRunning': 'আগে পরিমাপ শুরু করুন এবং ক্যামেরা একটি সাদা কাগজের দিকে তাক করুন।',
  'calib.error.busy': 'ক্যালিব্রেশন ইতিমধ্যেই চলছে।',
  'calib.error.tooFewSamples': 'নমুনা খুব কম। পরিমাপ সত্যিই চলছে কি না দেখে নিন।',
  'calib.error.tooDark': 'ক্যালিব্রেশনের জন্য ছবিটি বড় বেশি অন্ধকার। কাগজে আরও আলো ফেলে আবার চেষ্টা করুন।',
  'calib.error.tooSkewed': 'চ্যানেলের বিচ্যুতি এত বড় যে একে ক্যালিব্রেশন হিসেবে মানা যায় না। সমান আলোয় সাদা কাগজ ব্যবহার করুন।',
  'calib.ok': 'ক্যালিব্রেট হয়েছে। বর্ণ তাপমাত্রা আর দেহঘড়িতে প্রভাব এখন আরও নির্ভুল হবে।',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'এটি কী কাজে লাগে। ',
  'screencheck.noteText': 'পাঁচটি ধাপ মনিটরকে ঠিক সেভাবেই দেখে, যেভাবে রিভিউতে দেখা হয়: দুই উজ্জ্বলতায় সাদা, ব্যাকলাইটের সমরূপতা, আর সিস্টেমের নাইট মোড সত্যিই কিছু বদলায় কি না। উইজার্ড চলতে থাকা পরিমাপ পড়ে; নিজে কোনো পরিমাপ চালু করে না।',
  'screencheck.step.white100.title': 'পূর্ণ উজ্জ্বলতায় সাদা',
  'screencheck.step.white100.hint': 'মনিটরে একটি সাদা পাতা খুলুন, উজ্জ্বলতা সর্বোচ্চ করুন এবং পর্দা দিয়ে ফ্রেম ভরে দিন।',
  'screencheck.step.white20.title': 'কম উজ্জ্বলতায় সাদা',
  'screencheck.step.white20.hint': 'মনিটরের উজ্জ্বলতা প্রায় এক-পঞ্চমাংশে নামান এবং ফ্রেম বদলাবেন না।',
  'screencheck.step.corners.title': 'পর্দার কোণগুলো',
  'screencheck.step.corners.hint': 'পূর্ণ উজ্জ্বলতায় ফিরে যান এবং ক্যামেরাকে গোটা পর্দা দেখান — আমরা ব্যাকলাইটের সমরূপতা দেখছি।',
  'screencheck.step.nightOff.title': 'নাইট মোড বন্ধ',
  'screencheck.step.nightOff.hint': 'নীল আলোর ফিল্টারটি বন্ধ আছে কি না নিশ্চিত করুন।',
  'screencheck.step.nightOn.title': 'নাইট মোড চালু',
  'screencheck.step.nightOn.hint': 'সিস্টেমের নীল আলোর ফিল্টার চালু করুন এবং সেই একই ফ্রেম আবার নিন।',
  'screencheck.stepHeading': '{total}টির মধ্যে ধাপ {n}: {title}',
  'screencheck.idleTitle': 'উইজার্ড চালু নেই',
  'screencheck.idleHint': 'পরিমাপ পর্দায় পরিমাপ শুরু করুন, তারপর এখানে ফিরে এসে “শুরু করুন” চাপুন।',
  'screencheck.next': 'ধাপটি সংরক্ষণ করে এগিয়ে যান',
  'screencheck.cancel': 'থামিয়ে দিন',
  'screencheck.start': 'উইজার্ড শুরু করুন',
  'screencheck.clearResult': 'ফল মুছুন',
  'screencheck.resultTitle': 'ফল',
  'screencheck.resultEmpty': 'এখনো কোনো ধাপ সংরক্ষণ করা হয়নি।',
  'screencheck.resultPartial': '{total}টির মধ্যে {done}টি ধাপ সংরক্ষিত। তুলনা করার মতো কিছু হলেই সিদ্ধান্ত দেখা যাবে।',
  'screencheck.note.uniformityLow': 'ব্যাকলাইটের সমরূপতা {value}% — ফ্রেমজুড়ে উজ্জ্বলতার স্পষ্ট তারতম্য দেখা যাচ্ছে।',
  'screencheck.note.uniformityOk': 'ব্যাকলাইট সমান ({value}%)।',
  'screencheck.note.nightWorks': 'নাইট মোড নীল আলোর অংশ {value} শতাংশ-বিন্দু কমায় — কাজ করছে।',
  'screencheck.note.nightWeak': 'নাইট মোড নীল আলোর অংশ মাত্র {value} শতাংশ-বিন্দু বদলায়। সিস্টেমের ফিল্টার সাধারণত এর চেয়ে বেশি দেয়।',
  'screencheck.note.pwm': 'কম উজ্জ্বলতায় মিটমিটানি {from}% থেকে বেড়ে {to}% হয় — এটি পালস-প্রস্থ ডিমিংয়ের (PWM) চেনা লক্ষণ।',
  'toast.screencheckDone': 'উইজার্ড শেষ। ফল নিচে আছে।',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'এই সংখ্যাগুলো কোথা থেকে আসে। ',
  'reports.noteText': 'রিপোর্ট এই ডিভাইসে সংরক্ষিত ইতিহাস থেকে হিসাব হয় — প্রতি পাঁচ সেকেন্ডে একটি বিন্দু। ইঞ্জিন প্রথম পরিমাপ থেকেই তা জমাচ্ছে, তাই রিপোর্ট সঙ্গে সঙ্গেই তৈরি।',
  'reports.rangeAria': 'রিপোর্টের পরিসর',
  'reports.day': 'শেষ ২৪ ঘণ্টা',
  'reports.week': 'শেষ ৭ দিন',
  'reports.date': '{date} তারিখের রিপোর্ট।',
  'report.headerDay': '{from} থেকে {to} পর্যন্ত দিন — {count}।',
  'report.headerWeek': '{from} থেকে {to} পর্যন্ত সপ্তাহ — {count}।',
  'count.points': { one: '{n}টি বিন্দু', other: '{n}টি বিন্দু' },
  'count.samples': { one: '{n}টি নমুনা', other: '{n}টি নমুনা' },
  'report.emptyTitle': 'এই সময়ে কোনো তথ্য নেই',
  'report.emptyText': 'পরিমাপ পর্দায় পরিমাপ শুরু করুন — ইতিহাস নিজে থেকেই সংরক্ষিত হয়।',
  'report.colAvg': 'গড়',
  'report.colMin': 'সর্বনিম্ন',
  'report.colMax': 'সর্বোচ্চ',
  'report.zonesTitle': 'অঞ্চলের বণ্টন',
  'report.worstHour': 'দিনের সবচেয়ে খারাপ সময়',
  'report.worstHourNone': 'স্পষ্ট কিছু নেই',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'এ নিয়ে কী করবেন',
  'report.disclaimerTitle': 'এটি স্বাস্থ্য পরামর্শ নয়। ',
  'report.disclaimerText': 'এই সিদ্ধান্তগুলো কেবল এই ফোনের ক্যামেরা যা দেখেছে তা থেকেই আসে। অ্যাপটি বর্ণালি মাপে না, লাক্স জানে না এবং কোনো রোগনির্ণয় করে না।',

  'advice.melanopic': 'দেহঘড়িতে প্রভাব গড়ে ছিল {value}×। সন্ধ্যায় ০.৫০-এর নিচে নামা ভালো — সবচেয়ে সহজে উষ্ণতর বাল্ব বা নাইট মোড দিয়ে।',
  'advice.kelvin': 'আলো ঠান্ডা ছিল (গড়ে {value} K)। কাজের জন্য এতে কোনো সমস্যা নেই; ঘুমাতে যাওয়ার দুই ঘণ্টা আগে ৩০০০ K-এর নিচে ভালো।',
  'advice.flicker': 'লক্ষণীয় মিটমিটানি ধরা পড়েছে (গড়ে {value}%)। সাধারণত এর পিছনে থাকে সস্তা ডিমার বা ব্যাকলাইটের ড্রাইভার।',
  'advice.uniformity': 'আলো অসমভাবে ছড়িয়ে পড়ছে ({value}%)। বাতি সরানো বা তার কোণ বদলানো সাধারণত বাল্ব বদলানোর চেয়ে বেশি কাজে দেয়।',
  'advice.worstHour': 'দিনের সবচেয়ে খারাপ সময় {hour}:00 — সীমার বাইরের সবচেয়ে বেশি পাঠ ওখানেই জমে।',
  'advice.none': 'এই সময়ে সীমার বাইরে কিছুই আলাদা করে চোখে পড়ে না। এখন সবচেয়ে বেশি কাজে দিত A/B তুলনায় দুটি আলোর উৎস মিলিয়ে দেখা।',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'ফাইলের ছাঁদ। ',
  'export.noteText': 'কলাম আলাদা করতে সেমিকোলন, দশমিক চিহ্ন হিসেবে কমা, এনকোডিং UTF-8 সঙ্গে BOM চিহ্ন। দশমিক চিহ্ন হিসেবে কমা ব্যবহার করে এমন লোকেলে বসানো Excel এই ফাইল কিছু ঠিক না করেই খোলে।',
  'export.range': 'ডেটার পরিসর',
  'export.columns': 'ফাইলের কলাম',
  'export.chipFilled': ' — কলাম ভরা',
  'export.help': 'ফাইলে সাতটি কলামই থাকে — ইঞ্জিন প্রথম পরিমাপ থেকেই সেগুলো হিসাব করে এবং সবগুলোই ফাইলে যায়।',
  'export.run': 'CSV ফাইল সংরক্ষণ করুন',
  'export.previewEmpty': 'এই পরিসরে কোনো পাঠ নেই। পরিমাপ শুরু করুন — ইতিহাস নিজে থেকেই সংরক্ষিত হয়।',
  'csv.range.hour': 'শেষ এক ঘণ্টা',
  'csv.range.day': 'শেষ ২৪ ঘণ্টা',
  'csv.range.week': 'শেষ ৭ দিন',
  'csv.range.month': 'শেষ ৩০ দিন',
  'csv.colDate': 'তারিখ',
  'csv.colTime': 'সময়',
  'csv.colZone': 'অঞ্চল',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'বাছাই করা পরিসরে একটিও পাঠ নেই।',
  'toast.exportFailed': 'এই ব্রাউজার ফাইলটি সংরক্ষণ করতে দেয়নি।',
  'toast.exportSaved': {
    one: '{filename} ফাইলটি সংরক্ষণ করা হয়েছে ({n}টি সারি)।',
    other: '{filename} ফাইলটি সংরক্ষণ করা হয়েছে ({n}টি সারি)।'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} ঘ. {m} মিন.',
  'duration.ms': '{m} মিন. {s} সে.',
  'duration.s': '{s} সে.'
});
