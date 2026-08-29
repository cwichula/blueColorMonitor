/* docs/v2/i18n/ur.js — słownik WERSJI 2, urdu.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/ur.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej.
 *
 * PISMO OD PRAWEJ DO LEWEJ: urdu zapisuje się od prawej do lewej. W napisach
 * NIE MA ani jednego znaku sterującego kierunkiem (U+200E, U+200F,
 * U+202A…U+202E) — kierunkiem zarządza atrybut `dir` ustawiany na dokumencie
 * przez warstwę językową, a nie treść słownika. Liczby, symbole jednostek
 * (%, K, ×, Hz), nazwy formatów (CSV, UTF-8, BOM) i identyfikatory (sRGB, PWM,
 * R, G, B, Excel, Buy Me a Coffee, ścieżki plików, <script>, index.html)
 * zostają zapisem łacińskim — przeglądarka ustawi je sama zgodnie z algorytmem
 * dwukierunkowym Unicode. Kropkę zdaniową zapisuje się znakiem ۔ (U+06D4),
 * przecinek znakiem ، (U+060C), pytajnik znakiem ؟ (U+061F). Cudzysłów ”…“ —
 * dokładnie ten sam, którego używa docs/shared/i18n/ur.js, bo w cudzysłowie
 * stoją nazwy przycisków i muszą wyglądać tak samo w obu warstwach.
 *
 * TERMINOLOGIA JEST WZIĘTA Z docs/shared/i18n/ur.js i nie wolno jej tu
 * zmieniać: نیلے کا حصہ, منظر کی چمک, رنگی درجۂ حرارت, یومیہ تال پر اثر,
 * ٹمٹماہٹ, یکسانیت, بصری آرام; strefy حد کے اندر / احتیاط / تشویشناک;
 * پیمائش to zarówno odczyt, jak i czynność mierzenia, ریکارڈ to historia,
 * کیلبریشن to kalibracja, نشست to sesja. Klucze *.nameLower powtarzają nazwy
 * warstwy wspólnej co do znaku — urdu nie odróżnia wielkości liter, więc
 * nazwa w środku zdania brzmi tak samo jak na kafelku.
 *
 * LICZEBNIKI: urdu ma dwie kategorie CLDR — one i other. Formę wybiera
 * Intl.PluralRules('ur'), nie nasza reguła.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (i dlaczego):
 *   'zone.warning'        — wspólne mówi „احتیاط” (Uwaga), ta wersja od zawsze
 *                           mówi „تنبیہ” (Ostrzeżenie), a w podsumowaniu
 *                           „تنبیہات”;
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi „Pomiary”,
 *                           a nie „Pomiar”.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules. Patrz nagłówek docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ur'] = Object.assign(window.I18nData['ur'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'روشنی مانیٹر — نیلی روشنی کی پیمائش',
  'app.description': 'روشنی مانیٹر — فون کے کیمرے سے روشنی میں نیلے کے حصے کی پیمائش۔ سات پیمانے، گراف، ریکارڈ۔ سب کچھ دستیاب ہے، بغیر اکاؤنٹ اور بغیر فیس کے۔',
  'app.skipToContent': 'مواد پر جائیں',
  'app.measuring': 'پیمائش جاری',
  'app.docsButton': 'دستاویزات اور وضاحتیں',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — ورژن 2',

  'nav.aria': 'مرکزی نیویگیشن',
  'nav.tablistAria': 'ایپ کی اسکرینیں',
  'nav.measure': 'پیمائش',
  'nav.history': 'ریکارڈ',
  'nav.tools': 'اوزار',
  'nav.support': 'تعاون',
  'nav.more': 'مزید',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'دستاویزات',
  'panel.thresholds': 'حدیں اور پروفائل',
  'panel.reports': 'رپورٹیں',
  'panel.export': 'ڈیٹا کی ایکسپورٹ',
  'panel.compare': 'A/B موازنہ',
  'panel.calibration': 'سفید کاغذ سے کیلبریشن',
  'panel.screenCheck': 'میرا مانیٹر جانچیں',
  'panel.schedule': 'شیڈول',
  'panel.alerts': 'نمائش کے الرٹ',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'واپس',
  'action.close': 'بند کریں',
  'action.refresh': 'ریفریش',
  'action.apply': 'لاگو کریں',
  'action.delete': 'حذف کریں',
  'action.hide': 'چھپائیں',
  'action.start': 'شروع',
  'action.stop': 'روکیں',
  'action.switch': 'بدلیں',
  'action.switchAria': 'کیمرہ بدلیں: سامنے والا یا پچھلا',
  'action.resetDefaults': 'طے شدہ بحال کریں',
  'action.reports': 'رپورٹیں',
  'action.exportCsv': 'CSV ایکسپورٹ',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'اسکرین: {name}',
  'a11y.measureStarted': 'پیمائش شروع ہو گئی۔',
  'a11y.measureStopped': 'پیمائش رک گئی۔',
  'a11y.measureStoppedSummary': 'پیمائش رک گئی۔ وقت: {duration}، {samples}۔',
  'a11y.zoneAnnounce': '{name}: {zone}، {value} {unit}',
  'a11y.profileApplied': 'حدوں کا پروفائل لاگو ہو گیا۔',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'تصدیق',
  'dialog.confirm': 'تصدیق کریں',
  'dialog.cancel': 'منسوخ',
  'dialog.infoTitle': 'معلومات',
  'dialog.ok': 'سمجھ گیا',

  'help.sheetTitle': 'پیمانے کی تفصیل',
  'help.unit': 'اکائی',
  'help.scaleRange': 'اسکیل کا دائرہ',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę.
     Urdu wielkości liter nie zna, ale kształt słownika jest wspólny. */

  'threshold.warn': 'تنبیہ',
  'threshold.crit': 'تشویشناک',
  'threshold.warnLabel': 'تنبیہ کی حد',
  'threshold.critLabel': 'تشویشناک حد',
  'threshold.warnAria': '{name} — حد: تنبیہ',
  'threshold.critAria': '{name} — حد: تشویشناک',

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

  'firstRun.title': 'کیسے ناپیں',
  'firstRun.text': '”شروع“ دبائیں، فون کا رخ کسی روشن سطح کی طرف کریں اور اسے چند سیکنڈ بغیر ہلائے پکڑے رکھیں۔ پیش نظارے کا نشان وہ حصہ دکھاتا ہے جو ایپ واقعی پڑھتی ہے۔',
  'firstRun.close': 'اشارہ بند کریں',

  'camera.live': 'لائیو',
  'camera.idle': 'کیمرہ بند ہے۔ ”شروع“ دبائیں، فون کا رخ کسی روشن سطح کی طرف کریں اور اسے چند سیکنڈ بغیر ہلائے پکڑے رکھیں۔',
  'camera.stopped': 'پیمائش رک گئی۔ دوبارہ ناپنے کے لیے ”شروع“ دبائیں۔',

  'error.cameraStart': 'کیمرہ شروع نہیں کیا جا سکا۔',
  'error.engineMissing': 'پیمائش کا ماڈیول لوڈ نہیں ہوا۔',

  'metrics.sevenTitle': 'سات پیمانے',
  'measure.tilesSub': 'ہر سیکنڈ میں 5 بار تازہ',

  'session.title': 'یہ نشست',
  'session.duration': 'پیمائش کا وقت',
  'session.samples': 'نمونوں کی تعداد',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     „تنبیہات” to nie to samo słowo co „تنبیہ” pod suwakiem. */
  'zone.count.good': 'حد کے اندر',
  'zone.count.warning': 'تنبیہات',
  'zone.count.critical': 'تشویشناک',

  'note.calibrated': 'پیمائش سفید کاغذ سے کیلبریٹ شدہ — چینل برابر کر دیے گئے۔',

  'tile.helpAria': 'اس کا کیا مطلب ہے: {name}',
  'tile.noMeasurement': 'کوئی پیمائش نہیں',
  'tile.outOfScale': 'اسکیل سے باہر',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'تنبیہ',
  'zone.spoken.warning': 'تنبیہ',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'وقت کے ساتھ تبدیلی',
  'history.pickHint': 'پیمانہ اور دورانیہ چنیں',
  'history.metricLabel': 'پیمانہ',
  'history.rangeAria': 'گراف کے وقت کا دورانیہ',
  'history.emptyTitle': 'اس دورانیے میں کوئی ڈیٹا نہیں',
  'history.emptyText': 'پیمائش کی اسکرین پر ناپنا شروع کریں — گراف چند سیکنڈ میں بھر جائے گا۔',
  'history.tableTitle': 'تازہ ترین پیمائشیں',
  'history.tableHide': 'ٹیبل چھپائیں',
  'history.tableShow': 'ٹیبل دکھائیں',
  'history.tableCaption': 'پیمائش کی تازہ ترین قدریں، سب سے نئی سب سے اوپر۔',
  'history.tableEmpty': 'کوئی پیمائش نہیں۔ پیمائش کی اسکرین پر ناپنا شروع کریں۔',

  'table.time': 'وقت',
  'table.metric': 'پیمانہ',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Urdu nazw
     jednostek czasu nie skraca — stoją tu pełnym słowem, tak samo jak
     w słowniku wersji 5. */
  'range.1m': '1 منٹ',
  'range.1h': '1 گھنٹہ',
  'range.24h': '24 گھنٹے',
  'range.7d': '7 دن',
  'range.30d': '30 دن',

  'chart.now': 'ابھی',
  'chart.countSub': {
    one: 'چنے ہوئے دورانیے میں {n} پیمائش',
    other: 'چنے ہوئے دورانیے میں {n} پیمائشیں'
  },
  'chart.aria': '{name}، دورانیہ {range}، {count}، آخری قدر {value} {unit}۔',
  'chart.ariaZone': '{name}، دورانیہ {range}، {count}، آخری قدر {value} {unit}، زون: {zone}۔',
  'chart.ariaEmpty': '{name} — {range} کے دورانیے میں کوئی ڈیٹا نہیں۔',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'وزرڈ اور معاون سہولتیں',
  'tools.note': 'اوزار پیمائش کو سمجھنے میں مدد دیتے ہیں۔ سب کے سب فوراً دستیاب ہیں، اور پیمائش خود اِن سے آزاد چلتی ہے۔',

  'tool.thresholds.sub': 'قدر کس مقام پر تنبیہ جگائے',
  'tool.compare.sub': 'دو روشنیوں میں سے کون سی نرم ہے',
  'tool.calibration.sub': 'واحد سہولت جو واقعی درستی بڑھاتی ہے',
  'tool.screenCheck.sub': 'پانچ قدم اور اسکرین کے بارے میں تیار نتیجہ',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „حدوں کا شیڈول”
     kontra „شیڈول”. Tak było i tak zostaje. */
  'tool.schedule.title': 'حدوں کا شیڈول',
  'tool.schedule.sub': 'شام کو دوسری حدیں، یاد رکھے بغیر',
  'tool.alerts.sub': 'اشارہ جب تشویشناک زون بہت دیر تک رہے',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'ترتیبات',
  'more.thresholdsSub': 'قدر کس مقام پر تنبیہ جگائے',
  'more.docsSub': 'کیسے ناپیں اور یہ پیمائش کیا نہیں بتاتی',
  'more.appearanceTitle': 'ظاہری شکل اور رسائی',

  'settings.theme': 'تھیم',
  'theme.auto': 'نظام کے مطابق',
  'theme.light': 'روشن',
  'theme.dark': 'گہرا',

  'settings.textScale': 'متن کا سائز',
  'textScale.100': 'معیاری',
  'textScale.115': 'بڑا (115%)',
  'textScale.130': 'سب سے بڑا (130%)',

  'settings.contrast': 'زیادہ کنٹراسٹ',
  'settings.contrastSub': 'گہرے کنارے اور زیادہ گہرا معاون متن۔',
  'settings.sound': 'الرٹ کی آواز',
  'settings.soundSub': 'نمائش کا الرٹ چالو ہونے پر مختصر اشارہ۔',
  'settings.vibrate': 'الرٹ پر وائبریشن',
  'settings.vibrateSub': 'صرف اُن آلات پر چلتی ہے جو اسے سہارا دیتے ہیں۔',

  'more.dataTitle': 'ڈیٹا',
  'more.clearHistory': 'پیمائش کا ریکارڈ صاف کریں',
  'more.clearHistorySub': 'اس آلے سے محفوظ پیمائشیں مٹا دیتا ہے۔ حدیں، پروفائل اور ترتیبات رہ جاتی ہیں۔',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'ایپ پوری کی پوری مفت ہے۔ ',
  'more.supportLink': 'آپ چاہیں تو رضاکارانہ تعاون کر سکتے ہیں۔',

  'dialog.clearHistory.title': 'محفوظ ریکارڈ حذف کریں؟',
  'dialog.clearHistory.body': {
    one: 'ہم اس آلے سے پیمائش کا {n} محفوظ نقطہ حذف کر دیں گے۔ اس کارروائی کو واپس نہیں لیا جا سکتا۔ حدیں، پروفائل اور ترتیبات جوں کی توں رہیں گی۔',
    other: 'ہم اس آلے سے پیمائش کے {n} محفوظ نقطے حذف کر دیں گے۔ اس کارروائی کو واپس نہیں لیا جا سکتا۔ حدیں، پروفائل اور ترتیبات جوں کی توں رہیں گی۔'
  },
  'dialog.clearHistory.confirm': 'ریکارڈ حذف کریں',
  'dialog.clearHistory.cancel': 'رہنے دیں',

  'toast.historyCleared': 'پیمائش کا ریکارڈ حذف ہو گیا۔',
  'toast.screenUnavailable': 'یہ اسکرین اس ورژن میں ابھی دستیاب نہیں ہے۔',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'یہ ایپ کیا ناپتی ہے',
  'docs.leadText': 'فون کا کیمرہ کسی روشن سطح کو دیکھتا ہے، اور ایپ ہر سیکنڈ میں پانچ بار فریم کے درمیانی حصے سے R، G اور B چینلوں کی اوسط نکالتی ہے۔ اِنہی تین اعداد سے وہ سات پیمانے اخذ کرتی ہے۔',
  'docs.limitsTitle': 'طریقے کی حدود',
  'docs.limitsText': 'کیمرے میں تین چوڑے رنگی چینل، خودکار نمائش اور خودکار وائٹ بیلنس ہوتے ہیں۔ یہ طیف نہیں ناپتا اور مطلق قدروں کو نہیں جانتا، اس لیے چمک ایک نسبتی اشاریہ ہے، لکس نہیں۔ رنگی درجۂ حرارت اور یومیہ تال پر اثر sRGB رنگوں سے نکالے گئے تخمینے ہیں۔ {rate} Hz پر نمونہ گیری ٹمٹماہٹ صرف {limit} Hz سے نیچے دیکھتی ہے — بجلی کی 100 Hz پہنچ سے باہر ہے اور ایپ اسے کبھی نتیجے کے طور پر نہیں دکھائے گی۔',

  'note.howTo.repeat.title': 'پیمائش دہرائیں',
  'note.howTo.repeat.text': 'اکیلی پیمائش ایک جھلک ہوتی ہے۔ دس پندرہ سیکنڈ ناپنے سے زیادہ قابلِ اعتماد تصویر بنتی ہے۔',

  'docs.scale': 'اسکیل',
  'docs.direction': 'سمت',
  'docs.directionHigher': 'زیادہ یعنی بہتر',
  'docs.directionLower': 'کم یعنی نرم',
  'docs.privacyTitle': 'ڈیٹا اور رازداری',
  'docs.privacyText': 'کیمرے کی تصویر نہ کہیں بھیجی جاتی ہے اور نہ محفوظ کی جاتی ہے — ہر فریم سے صرف تین اعداد رہ جاتے ہیں۔ پیمائشیں، حدیں اور ترتیبات اسی آلے پر براؤزر کی میموری میں رہتی ہیں۔ ایپ کوئی نیٹ ورک درخواست نہیں کرتی اور آف لائن چلتی ہے۔',
  'docs.freeLine': 'ساتوں پیمانے، ریکارڈ، گراف، اوزار اور آف لائن موڈ ہر کسی کے لیے چلتے ہیں، بغیر اکاؤنٹ اور بغیر فیس کے۔',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'سب کچھ دستیاب ہے',
  'support.heroText': 'ساتوں پیمانے، پیمائش کا ریکارڈ، گراف، سارے اوزار اور آف لائن موڈ ہر کسی کے لیے فوراً چلتے ہیں۔ نہ اکاؤنٹ، نہ کوئی حد، نہ فیس۔',
  'support.whyTitle': 'میں یہ کیوں مانگ رہا ہوں',
  'support.whyText': '{app} فارغ وقت میں بنتا ہے اور کسی سے کچھ نہیں کماتا: نہ اشتہار ہیں، نہ ڈیٹا جمع ہوتا ہے، نہ بیچنے کو کچھ ہے۔ اسے چلاتے رہنا اور آگے بڑھانا — نئے پیمانے، درستیاں، مزید فونوں پر جانچ — وقت مانگتا ہے۔ اگر ایپ آپ کے کام آئی ہو تو آپ حصہ ڈال سکتے ہیں۔ ضروری نہیں۔',
  'support.whatTitle': 'عطیے سے کیا ملتا ہے',
  'support.whatText': 'کچھ نہیں۔ واقعی یہ کچھ نہیں کھولتا اور کسی چیز کو تیز نہیں کرتا — ایپ اس سے پہلے اور اس کے بعد بالکل ویسی ہی دکھتی اور چلتی ہے۔ بس اتنا ہوتا ہے کہ بنانے والے کو معلوم ہو جاتا ہے کہ یہ محنت کسی کے کام آئی۔',
  'support.button': 'مجھے ایک کافی پلائیں',
  'support.pendingTitle': 'پروفائل ابھی جڑا نہیں ہے',
  'support.pendingText': 'یہاں ابھی کوئی پتہ نہیں ہے جس پر تعاون بھیجا جا سکے۔ تیار ہوتے ہی وہ اسی جگہ آ جائے گا — تب تک ایپ میں سب کچھ بالکل اسی طرح چلتا ہے۔',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'بٹن Buy Me a Coffee کا بیرونی صفحہ نئے ٹیب میں کھولتا ہے۔ یہی واحد لمحہ ہے جب کوئی چیز اس آلے سے باہر جاتی ہے — اور یہ آپ کے دبانے کے بعد ہی ہوتا ہے۔ پیمائشیں، ریکارڈ اور ترتیبات یہیں رہتی ہیں۔',
  'privacy.externalPending': 'جب پتہ دستیاب ہو گا، بٹن دبانے پر ایک بیرونی صفحہ نئے ٹیب میں کھلے گا۔ یہی واحد لمحہ ہو گا جب کوئی چیز اس آلے سے باہر جائے گی۔ پیمائشیں، ریکارڈ اور ترتیبات یہیں رہتی ہیں۔',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (ui-core.js میں متبادل)',
  'boot.need.metrics': 'کوئی قدر حساب نہیں ہو گی',
  'boot.need.bus': 'ماڈیول ایک دوسرے کو دیکھنا بند کر دیں گے',
  'boot.need.ui': 'اسکرینیں بدلی نہیں جا سکیں گی',
  'boot.need.engine': 'کیمرہ اور پیمائش شروع نہیں ہوں گے',
  'boot.need.support': 'تعاون کی اسکرین خالی رہے گی',
  'boot.need.tools': 'اوزار کی ٹیب خالی رہے گی',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'یہ ماڈیول لوڈ نہیں ہوئے: {list}۔',
  'boot.consoleHint': 'index.html میں <script> کی ترتیب اور راستے جانچیں۔',
  'boot.incompleteTitle': 'ایپ نامکمل لوڈ ہوئی',
  'boot.incompleteText': '{missing} صفحہ ریفریش کریں؛ اگر اس سے بھی بات نہ بنے تو سرور پر فائلیں نامکمل ہیں۔',
  'boot.newVersion': 'ایپ کا نیا ورژن موجود ہے۔',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'حدیں کیا کرتی ہیں۔ ',
  'thresholds.noteText': 'تنبیہ کی حد پیلی حالت جگاتی ہے، تشویشناک حد سرخ۔ تبدیلی فوراً اثر کرتی ہے — اُس پیمائش پر بھی جو پہلے سے اسکرین پر ہے۔ اپنی حدوں کا سیٹ نام دے کر محفوظ کر سکتے ہیں اور جب چاہیں اُس پر واپس آ سکتے ہیں۔',
  'thresholds.profilesTitle': 'حدوں کے پروفائل',
  'thresholds.profilesSub': 'تینوں بلٹ اِن اور آپ کے اپنے',
  'thresholds.customName': 'اپنے پروفائل کا نام',
  'thresholds.customPlaceholder': 'مثلاً شام کو خواب گاہ',
  'thresholds.save': 'موجودہ حدیں محفوظ کریں',
  'thresholds.saveHelp': 'بالکل وہی حدیں محفوظ کرتا ہے جو اوپر مقرر ہیں۔',

  'profile.builtin.default.name': 'طے شدہ',
  'profile.builtin.default.desc': 'پیمانوں کی فہرست سے لی گئی حدیں — ہر پیمائش کا نقطۂ آغاز۔',
  'profile.builtin.evening.name': 'شام — نرم',
  'profile.builtin.evening.desc': 'ٹھنڈے رنگ اور یومیہ تال پر اثر کی تنبیہ پہلے کر دیتا ہے۔',
  'profile.builtin.work.name': 'میز پر کام',
  'profile.builtin.work.desc': 'روشن، ٹھنڈی دن کی روشنی کی اجازت دیتا ہے؛ ٹمٹماہٹ اور یکسانیت پر نظر رکھتا ہے۔',
  'profile.custom.desc': 'اپنا پروفائل، {date} کو محفوظ ہوا۔',

  'toast.thresholdsReset': 'طے شدہ حدیں بحال ہو گئیں۔',
  'toast.thresholdOrder': 'تنبیہ کی حد تشویشناک حد سے کم ہونی چاہیے۔',
  'toast.thresholdOrderInverted': 'اس پیمانے کے لیے تنبیہ کی حد تشویشناک حد سے زیادہ ہونی چاہیے۔',
  'toast.profileNameMissing': 'پروفائل کا نام لکھیں۔',
  'toast.profileSaved': '”{name}“ پروفائل محفوظ ہو گیا۔',
  'toast.profileApplied': '”{name}“ پروفائل لاگو ہو گیا۔',
  'toast.profileApplyFailed': 'یہ پروفائل لاگو نہیں کیا جا سکا۔',
  'toast.profileRemoved': 'پروفائل حذف ہو گیا۔',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'شیڈول کس لیے ہے۔ ',
  'schedule.noteText': 'شام کو جو حدیں معقول ہیں، وہ دوپہر والی نہیں ہوتیں۔ ”سے–تک“ کا اصول پروفائل خود بدل دیتا ہے، تاکہ آپ کو یاد نہ رکھنا پڑے۔ شیڈول کبھی پیمائش شروع یا بند نہیں کرتا۔',
  'schedule.toggle': 'خودکار تبدیلی چالو کریں',
  'schedule.toggleSub': 'آلے کی گھڑی کے مطابق ہر منٹ جانچا جاتا ہے۔',
  'schedule.emptyTitle': 'کوئی اصول نہیں',
  'schedule.emptyText': 'نیچے دیے بٹن سے پہلا اصول شامل کریں۔',
  'schedule.add': 'اصول شامل کریں',
  'schedule.to': 'تک',
  'schedule.profile': 'پروفائل',
  'schedule.fromAria': 'اصول {n}: آغاز کا وقت',
  'schedule.toAria': 'اصول {n}: اختتام کا وقت',
  'toast.scheduleTimeFormat': 'وقت 22:00 کی صورت میں لکھیں۔',
  'toast.scheduleEnded': 'شیڈول ختم ہو گیا — پچھلی حدیں واپس آ گئیں۔',
  'toast.scheduleApplied': 'شیڈول نے ”{name}“ پروفائل چالو کر دیا۔',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'الرٹ کیا کرتا ہے۔ ',
  'alerts.noteText': 'یہ ایک پیمانے پر نظر رکھتا ہے اور تبھی بولتا ہے جب وہ چنے ہوئے زون میں مقررہ وقت تک بلا تعطل رہے۔ یہ کبھی پیمائش نہیں روکتا اور بٹنوں کو نہیں ڈھانپتا۔',
  'alerts.toggle': 'نمائش کے الرٹ چالو کریں',
  'alerts.toggleSub': 'صرف جاری پیمائش کے دوران کام کرتے ہیں۔',
  'alerts.metric': 'جس پیمانے پر نظر رکھنی ہے',
  'alerts.level': 'کس زون سے',
  'alerts.level.warning': 'تنبیہ اور اس سے اوپر',
  'alerts.level.critical': 'صرف تشویشناک',
  'alerts.sustain': 'کتنے سیکنڈ بلا تعطل کے بعد',
  'alerts.sustainHelp': 'کم وقت رکھنے سے، فون ہلانے پر، جھوٹے الارم زیادہ آتے ہیں۔',
  'alerts.sound': 'مختصر آواز کا اشارہ',
  'alerts.soundSub': 'آواز اسی آلے پر بنتی ہے۔ اسے مزید کی اسکرین پر پوری طرح بند بھی کیا جا سکتا ہے۔',
  'alerts.barTitle': 'نمائش کا الرٹ',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} {seconds} سیکنڈ سے تنبیہ کے زون میں ہے — اِس وقت {value} {unit}۔',
  'alerts.message.critical': '{name} {seconds} سیکنڈ سے تشویشناک زون میں ہے — اِس وقت {value} {unit}۔',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'موازنہ کیسے کریں۔ ',
  'compare.noteText': 'پیمائش شروع کریں، کیمرے کا رخ پہلے ذریعے کی طرف کریں اور اسے A کے طور پر محفوظ کریں۔ فاصلہ اور زاویہ بدلے بغیر روشنی بدلیں اور B محفوظ کریں۔ موازنہ تبھی معنی رکھتا ہے جب منظر وہی ہو۔',
  'compare.slotA': 'روشنی A',
  'compare.slotB': 'روشنی B',
  'compare.save': 'موجودہ پیمائش محفوظ کریں',
  'compare.savedAt': '{date}، {time} کو محفوظ ہوا',
  'compare.empty': 'ابھی کچھ محفوظ نہیں ہوا۔',
  'compare.verdictTitle': 'موازنے کا نتیجہ',
  'compare.verdictEmpty': 'دونوں روشنیاں محفوظ کریں تاکہ پتا چلے کون سی نرم ہے۔',
  'compare.notEnough': 'اِن دو پیمائشوں کا موازنہ کرنے کے لیے ڈیٹا کم ہے۔',
  'compare.tie': 'دونوں ذرائع تقریباً ایک جیسے نکلتے ہیں ({metric}: {a} اور {b} {unit})۔ فرق پیمائش کے شور کے اندر ہے۔',
  'compare.betterA': 'نرم تر روشنی A ہے — {metric} {better} {unit} ہے، جبکہ دوسری میں {worse} {unit}۔',
  'compare.betterB': 'نرم تر روشنی B ہے — {metric} {better} {unit} ہے، جبکہ دوسری میں {worse} {unit}۔',
  'compare.clear': 'موازنہ صاف کریں',
  'toast.compareSavedA': 'روشنی A محفوظ ہو گئی۔',
  'toast.compareSavedB': 'روشنی B محفوظ ہو گئی۔',
  'toast.compareCleared': 'موازنہ صاف ہو گیا۔',
  'toast.measureFirst': 'پہلے پیمائش کی اسکرین پر ناپنا شروع کریں۔',

  /* Nazwa wielkości w środku zdania. Po polsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. Urdu
     wielkości liter nie zna, więc stoją tu nazwy warstwy wspólnej co do znaku. */
  'metric.share.nameLower': 'نیلے کا حصہ',
  'metric.brightness.nameLower': 'منظر کی چمک',
  'metric.kelvin.nameLower': 'رنگی درجۂ حرارت',
  'metric.melanopic.nameLower': 'یومیہ تال پر اثر',
  'metric.flicker.nameLower': 'ٹمٹماہٹ',
  'metric.uniformity.nameLower': 'یکسانیت',
  'metric.comfort.nameLower': 'بصری آرام',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'یہ کیوں کام کرتا ہے۔ ',
  'calib.noteText': 'کیمرے کے سینسر میں چینلوں کے درمیان ایک مستقل جھکاؤ ہوتا ہے۔ سفید کاغذ ناپنے سے پتا چلتا ہے کہ وہ کتنا بڑا ہے، اور اسے گھٹایا جا سکتا ہے۔ اس ایپ میں یہی واحد سہولت ہے جو واقعی درستی بڑھاتی ہے — اور پھر بھی یہ کیمرے کو اسپیکٹرومیٹر نہیں بنا دیتی۔',
  'calib.step1': 'جس روشنی کو ناپ رہے ہیں اس کے نیچے سفید کاغذ رکھیں',
  'calib.step2': 'پیمائش شروع کریں اور کاغذ سے پورا فریم بھر دیں',
  'calib.step3': '”کیلبریٹ کریں“ دبائیں اور 3 سیکنڈ فون کو نہ ہلائیں',
  'calib.done': '{date}، {time} کو کیلبریٹ ہوا۔',
  'calib.none': 'کوئی کیلبریشن نہیں۔ پیمائش چلتی ہے، قدروں کو تقابلی طور پر لیں۔',
  'calib.gain': '{channel} چینل کا گین',
  'calib.gainsLabel': 'چینلوں کے گین',
  'calib.gainsUnset': 'مقرر نہیں',
  'calib.start': 'کیلبریٹ کریں (3 سیکنڈ)',
  'calib.clear': 'کیلبریشن حذف کریں',
  'toast.calibCleared': 'کیلبریشن حذف ہو گئی۔',
  'calib.error.noEngine': 'پیمائش کا ماڈیول دستیاب نہیں ہے۔',
  'calib.error.notRunning': 'پہلے پیمائش شروع کریں اور کیمرے کا رخ سفید کاغذ کی طرف کریں۔',
  'calib.error.busy': 'کیلبریشن پہلے سے جاری ہے۔',
  'calib.error.tooFewSamples': 'نمونے بہت کم ہیں۔ جانچیں کہ پیمائش واقعی چل رہی ہے۔',
  'calib.error.tooDark': 'تصویر کیلبریشن کے لیے بہت تاریک ہے۔ کاغذ پر زیادہ روشنی ڈالیں اور دوبارہ کوشش کریں۔',
  'calib.error.tooSkewed': 'چینلوں کا جھکاؤ اتنا بڑا ہے کہ اسے کیلبریشن نہیں مانا جا سکتا۔ یکساں روشنی میں سفید کاغذ استعمال کریں۔',
  'calib.ok': 'کیلبریٹ ہو گیا۔ رنگی درجۂ حرارت اور میلانوپک اثر اب زیادہ درست ہوں گے۔',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'یہ کس کام آتا ہے۔ ',
  'screencheck.noteText': 'پانچ قدم مانیٹر کو ویسے ہی جانچتے ہیں جیسے کوئی جائزہ جانچتا ہے: دو چمکوں پر سفیدی، بیک لائٹ کی یکسانیت، اور یہ کہ نظام کا نائٹ موڈ واقعی کچھ بدلتا ہے یا نہیں۔ وزرڈ پہلے سے جاری پیمائش پڑھتا ہے؛ خود اسے شروع نہیں کرتا۔',
  'screencheck.step.white100.title': 'پوری چمک پر سفیدی',
  'screencheck.step.white100.hint': 'مانیٹر پر کوئی سفید صفحہ کھولیں، چمک زیادہ سے زیادہ کر دیں اور اسکرین سے فریم بھر دیں۔',
  'screencheck.step.white20.title': 'کم چمک پر سفیدی',
  'screencheck.step.white20.hint': 'مانیٹر کی چمک تقریباً پانچویں حصے تک گھٹائیں اور فریم نہ بدلیں۔',
  'screencheck.step.corners.title': 'اسکرین کے کونے',
  'screencheck.step.corners.hint': 'پوری چمک پر واپس آئیں اور کیمرے کو پوری اسکرین دکھائیں — ہم بیک لائٹ کی یکسانیت جانچ رہے ہیں۔',
  'screencheck.step.nightOff.title': 'نائٹ موڈ بند',
  'screencheck.step.nightOff.hint': 'یقینی بنائیں کہ نیلی روشنی کا فلٹر بند ہے۔',
  'screencheck.step.nightOn.title': 'نائٹ موڈ چالو',
  'screencheck.step.nightOn.hint': 'نظام میں نیلی روشنی کا فلٹر چالو کریں اور وہی فریم دہرائیں۔',
  'screencheck.stepHeading': '{total} میں سے قدم {n}: {title}',
  'screencheck.idleTitle': 'وزرڈ نہیں چل رہا',
  'screencheck.idleHint': 'پیمائش کی اسکرین پر ناپنا شروع کریں، پھر یہاں واپس آ کر ”وزرڈ شروع کریں“ دبائیں۔',
  'screencheck.next': 'قدم محفوظ کر کے آگے بڑھیں',
  'screencheck.cancel': 'روک دیں',
  'screencheck.start': 'وزرڈ شروع کریں',
  'screencheck.clearResult': 'نتیجہ صاف کریں',
  'screencheck.resultTitle': 'نتیجہ',
  'screencheck.resultEmpty': 'ابھی کوئی قدم محفوظ نہیں ہوا۔',
  'screencheck.resultPartial': '{total} میں سے {done} قدم محفوظ ہوئے۔ جب موازنے کو کچھ ہو گا تو نتائج سامنے آ جائیں گے۔',
  'screencheck.note.uniformityLow': 'بیک لائٹ کی یکسانیت {value}% ہے — فریم میں چمک کے واضح فرق نظر آتے ہیں۔',
  'screencheck.note.uniformityOk': 'بیک لائٹ یکساں ہے ({value}%)۔',
  'screencheck.note.nightWorks': 'نائٹ موڈ نیلے کا حصہ {value} فیصدی پوائنٹ گھٹاتا ہے — یہ کام کرتا ہے۔',
  'screencheck.note.nightWeak': 'نائٹ موڈ نیلے کا حصہ صرف {value} فیصدی پوائنٹ بدلتا ہے۔ یہ اُس سے کم ہے جو نظام کا فلٹر عموماً دیتا ہے۔',
  'screencheck.note.pwm': 'کم چمک پر ٹمٹماہٹ {from}% سے بڑھ کر {to}% ہو جاتی ہے — یہ نبض کی چوڑائی سے مدھم کرنے (PWM) کی معروف علامت ہے۔',
  'toast.screencheckDone': 'وزرڈ مکمل ہو گیا۔ نتیجہ نیچے ہے۔',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'یہ اعداد کہاں سے آتے ہیں۔ ',
  'reports.noteText': 'رپورٹ اس آلے پر محفوظ ریکارڈ سے بنتی ہے — ہر پانچ سیکنڈ پر ایک نقطہ۔ انجن اسے پہلی پیمائش سے جمع کرتا آ رہا ہے، اس لیے رپورٹ فوراً تیار ہوتی ہے۔',
  'reports.rangeAria': 'رپورٹ کا دورانیہ',
  'reports.day': 'گزشتہ 24 گھنٹے',
  'reports.week': 'گزشتہ 7 دن',
  'reports.date': '{date} کی رپورٹ۔',
  'report.headerDay': '{from} سے {to} تک کا دن — {count}۔',
  'report.headerWeek': '{from} سے {to} تک کا ہفتہ — {count}۔',
  'count.points': { one: '{n} نقطہ', other: '{n} نقطے' },
  'count.samples': { one: '{n} نمونہ', other: '{n} نمونے' },
  'report.emptyTitle': 'اس مدت میں کوئی ڈیٹا نہیں',
  'report.emptyText': 'پیمائش کی اسکرین پر ناپنا شروع کریں — ریکارڈ خود محفوظ ہوتا رہتا ہے۔',
  'report.colAvg': 'اوسط',
  'report.colMin': 'کم سے کم',
  'report.colMax': 'زیادہ سے زیادہ',
  'report.zonesTitle': 'زونوں کی تقسیم',
  'report.worstHour': 'دن کا بدترین وقت',
  'report.worstHourNone': 'کوئی نمایاں نہیں',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'اس کا کیا کریں',
  'report.disclaimerTitle': 'یہ صحت کا مشورہ نہیں ہے۔ ',
  'report.disclaimerText': 'نتائج صرف اُسی سے نکلتے ہیں جو اِس فون کے کیمرے نے دیکھا۔ ایپ طیف نہیں ناپتی، لکس نہیں جانتی اور کوئی تشخیص نہیں کرتی۔',

  'advice.melanopic': 'یومیہ تال پر اوسط اثر {value}× رہا۔ شام کو 0.50 سے نیچے آنا بہتر ہے — سب سے آسان طریقہ زیادہ گرم بلب یا نائٹ موڈ ہے۔',
  'advice.kelvin': 'روشنی ٹھنڈی تھی (اوسطاً {value} K)۔ کام کے لیے یہ بےعیب ہے؛ سونے سے دو گھنٹے پہلے 3000 K سے نیچے بہتر رہتا ہے۔',
  'advice.flicker': 'قابلِ ذکر ٹمٹماہٹ ملی (اوسطاً {value}%)۔ اس کے پیچھے عموماً سستا ڈمر یا بیک لائٹ کا ڈرائیور ہوتا ہے۔',
  'advice.uniformity': 'روشنی غیر یکساں پھیلتی ہے ({value}%)۔ لیمپ کھسکانا یا اس کا زاویہ بدلنا عموماً بلب بدلنے سے زیادہ کام آتا ہے۔',
  'advice.worstHour': 'دن کا بدترین وقت {hour}:00 ہے — حد سے باہر سب سے زیادہ پیمائشیں وہیں جمع ہوتی ہیں۔',
  'advice.none': 'اس مدت میں کچھ بھی حد سے باہر نمایاں نہیں۔ اب سب سے زیادہ فائدہ A/B موازنے میں دو ذرائع کا موازنہ کرنے سے ہو گا۔',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'فائل کی شکل۔ ',
  'export.noteText': 'کالم الگ کرنے کے لیے سیمی کولن، اعشاریے کے لیے کاما، اور BOM نشان کے ساتھ UTF-8 انکوڈنگ۔ ایسی فائل وہ Excel بغیر کچھ ترتیب دیے کھول لیتا ہے جس میں اعشاریے کا نشان کاما ہو۔',
  'export.range': 'ڈیٹا کا دورانیہ',
  'export.columns': 'فائل کے کالم',
  'export.chipFilled': ' — کالم بھرا ہوا',
  'export.help': 'فائل میں ساتوں کالم ہوتے ہیں — انجن انہیں پہلی پیمائش سے حساب کرتا ہے اور سب کے سب فائل میں جاتے ہیں۔',
  'export.run': 'CSV فائل محفوظ کریں',
  'export.previewEmpty': 'اس دورانیے میں کوئی پیمائش نہیں۔ ناپنا شروع کریں — ریکارڈ خود محفوظ ہوتا رہتا ہے۔',
  'csv.range.hour': 'گزشتہ گھنٹہ',
  'csv.range.day': 'گزشتہ 24 گھنٹے',
  'csv.range.week': 'گزشتہ 7 دن',
  'csv.range.month': 'گزشتہ 30 دن',
  'csv.colDate': 'تاریخ',
  'csv.colTime': 'وقت',
  'csv.colZone': 'زون',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'چنے ہوئے دورانیے میں ایک بھی پیمائش نہیں ہے۔',
  'toast.exportFailed': 'اس براؤزر نے فائل محفوظ نہیں کرنے دی۔',
  'toast.exportSaved': {
    one: '{filename} فائل محفوظ ہو گئی ({n} سطر)۔',
    other: '{filename} فائل محفوظ ہو گئی ({n} سطریں)۔'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą.
     Urdu nazw jednostek czasu nie skraca, więc stoją tu pełnym słowem. */

  'duration.hm': '{h} گھنٹے {m} منٹ',
  'duration.ms': '{m} منٹ {s} سیکنڈ',
  'duration.s': '{s} سیکنڈ'
});
