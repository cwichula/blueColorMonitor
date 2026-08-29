/* docs/v2/i18n/fa.js — słownik WERSJI 2, perski (farsi).
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/fa.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej.
 *
 * KIERUNEK PISMA: perski pisze się od prawej do lewej, ale w napisach NIE MA
 * ani jednego znaku sterującego kierunkiem (U+200E, U+200F, U+202A–U+202E).
 * Kierunkiem zarządza atrybut dir na dokumencie. Występuje natomiast ZWNJ
 * (U+200C) — to zwykły znak ortografii perskiej („اندازه‌گیری”), nie sterowanie.
 * Cudzysłów jest perski («…»), a półpauza i myślnik zostają takie jak
 * w pozostałych słownikach: algorytm dwukierunkowy sam ustawia je po właściwej
 * stronie.
 *
 * CYFRY: arabskie zachodnie (0.50, 3000 K, 22:00, 115%), dokładnie tak jak
 * w docs/shared/i18n/fa.js. Ta wersja nie formatuje liczb przez ICU, więc
 * liczba wpisana cyframi perskimi stanęłaby obok liczby wstawionej przez kod
 * i wyszedłby z tego zlepek dwóch systemów.
 *
 * TERMINOLOGIA idzie z docs/shared/i18n/fa.js, bez ani jednego wyjątku:
 *   سهم آبی (udział niebieskiego), روشنایی صحنه (jasność sceny), دمای رنگ
 *   (temperatura barwowa), اثر شبانه‌روزی (wpływ na rytm dobowy), سوسو زدن
 *   (migotanie), یکنواختی (równomierność), آسایش چشم (komfort wzrokowy).
 *   Dalej: اندازه‌گیری to pomiar, شاخص to mierzona wielkość, قرائت to
 *   pojedynczy odczyt, منطقه to strefa w zdaniu, نمایه to profil progów,
 *   آستانه to próg. Podpisy «Start» i «Stop» zostają po angielsku — tak są
 *   podpisane w silniku i tak mówi o nich warstwa wspólna (engine.idle).
 *   Symbole jednostek (%, K, ×, Hz), nazwy plików oraz formatów i skrótów
 *   technicznych (CSV, JSON, BOM, sRGB, PWM) zostają bez zmian.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (i dlaczego):
 *   'zone.warning'        — wspólne mówi احتیاط („uwaga”), ta wersja od zawsze
 *                           mówi mocniejsze هشدار (i tym samym słowem, w liczbie
 *                           mnogiej, liczy strefy);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi o pomiarach
 *                           w liczbie mnogiej.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules — perski ma dwie kategorie, 'one' i 'other', a rzeczownik po
 * liczebniku zostaje w liczbie pojedynczej, więc obie formy brzmią tak samo.
 * To nie jest niedopatrzenie. Patrz nagłówek docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['fa'] = Object.assign(window.I18nData['fa'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'پایشگر نور — اندازه‌گیری نور آبی',
  'app.description': 'پایشگر نور — اندازه‌گیری سهم نور آبی با دوربین گوشی. هفت شاخص، نمودار و تاریخچه. همه‌چیز در دسترس است، بدون حساب و بدون هزینه.',
  'app.skipToContent': 'رفتن به محتوا',
  'app.measuring': 'در حال اندازه‌گیری',
  'app.docsButton': 'مستندات و توضیح‌ها',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — نسخهٔ 2',

  'nav.aria': 'ناوبری اصلی',
  'nav.tablistAria': 'صفحه‌های برنامه',
  'nav.measure': 'اندازه‌گیری',
  'nav.history': 'تاریخچه',
  'nav.tools': 'ابزارها',
  'nav.support': 'حمایت',
  'nav.more': 'بیشتر',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'مستندات',
  'panel.thresholds': 'آستانه‌ها و نمایه‌ها',
  'panel.reports': 'گزارش‌ها',
  'panel.export': 'خروجی داده‌ها',
  'panel.compare': 'مقایسهٔ A/B',
  'panel.calibration': 'کالیبراسیون با کاغذ سفید',
  'panel.screenCheck': 'بررسی نمایشگر من',
  'panel.schedule': 'زمان‌بندی',
  'panel.alerts': 'هشدارهای مواجهه',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'بازگشت',
  'action.close': 'بستن',
  'action.refresh': 'تازه‌سازی',
  'action.apply': 'اعمال',
  'action.delete': 'حذف',
  'action.hide': 'پنهان کردن',
  /* Podpisy silnika — zostają po angielsku, patrz nagłówek pliku. */
  'action.start': 'Start',
  'action.stop': 'Stop',
  'action.switch': 'تعویض',
  'action.switchAria': 'تعویض دوربین: جلو یا پشت',
  'action.resetDefaults': 'بازگرداندن پیش‌فرض‌ها',
  'action.reports': 'گزارش‌ها',
  'action.exportCsv': 'خروجی CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'صفحه: {name}',
  'a11y.measureStarted': 'اندازه‌گیری آغاز شد.',
  'a11y.measureStopped': 'اندازه‌گیری متوقف شد.',
  'a11y.measureStoppedSummary': 'اندازه‌گیری متوقف شد. زمان: {duration}، {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}، {value} {unit}',
  'a11y.profileApplied': 'نمایهٔ آستانه‌ها اعمال شد.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'تأیید',
  'dialog.confirm': 'تأیید می‌کنم',
  'dialog.cancel': 'انصراف',
  'dialog.infoTitle': 'اطلاعات',
  'dialog.ok': 'متوجه شدم',

  'help.sheetTitle': 'شرح این شاخص',
  'help.unit': 'واحد',
  'help.scaleRange': 'بازهٔ مقیاس',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'هشدار',
  'threshold.crit': 'بحرانی',
  'threshold.warnLabel': 'آستانهٔ هشدار',
  'threshold.critLabel': 'آستانهٔ بحرانی',
  'threshold.warnAria': '{name} — آستانه: هشدار',
  'threshold.critAria': '{name} — آستانه: بحرانی',

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

  'firstRun.title': 'چگونه اندازه بگیریم',
  'firstRun.text': '«Start» را بزنید، گوشی را رو به سطحی نورخورده بگیرید و چند ثانیه بی‌حرکت نگه دارید. کادر روی پیش‌نمایش همان بخشی را نشان می‌دهد که برنامه واقعاً می‌خواند.',
  'firstRun.close': 'بستن راهنما',

  'camera.live': 'زنده',
  'camera.idle': 'دوربین خاموش است. «Start» را بزنید، گوشی را رو به سطحی نورخورده بگیرید و چند ثانیه بی‌حرکت نگه دارید.',
  'camera.stopped': 'اندازه‌گیری متوقف شد. برای اندازه‌گیری دوباره «Start» را بزنید.',

  'error.cameraStart': 'روشن‌کردن دوربین ممکن نشد.',
  'error.engineMissing': 'ماژول اندازه‌گیری بارگذاری نشد.',

  'metrics.sevenTitle': 'هفت شاخص',
  'measure.tilesSub': '5 بار در ثانیه تازه می‌شود',

  'session.title': 'این جلسه',
  'session.duration': 'زمان اندازه‌گیری',
  'session.samples': 'شمار نمونه‌ها',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     „هشدارها” to nie to samo słowo co „هشدار” pod suwakiem. */
  'zone.count.good': 'در محدوده',
  'zone.count.warning': 'هشدارها',
  'zone.count.critical': 'بحرانی',

  'note.calibrated': 'اندازه‌گیری با کاغذ سفید کالیبره شده — کانال‌ها هم‌تراز شده‌اند.',

  'tile.helpAria': 'معنی این شاخص: {name}',
  'tile.noMeasurement': 'بدون اندازه‌گیری',
  'tile.outOfScale': 'بیرون از مقیاس',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'هشدار',
  'zone.spoken.warning': 'هشدار',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'روند در طول زمان',
  'history.pickHint': 'شاخص و بازه را انتخاب کنید',
  'history.metricLabel': 'شاخص',
  'history.rangeAria': 'بازهٔ زمانی نمودار',
  'history.emptyTitle': 'در این بازه داده‌ای نیست',
  'history.emptyText': 'در صفحهٔ اندازه‌گیری کار را آغاز کنید — نمودار در چند ثانیه پر می‌شود.',
  'history.tableTitle': 'آخرین قرائت‌ها',
  'history.tableHide': 'پنهان کردن جدول',
  'history.tableShow': 'نمایش جدول',
  'history.tableCaption': 'آخرین قرائت‌های اندازه‌گیری، تازه‌ترین در بالا.',
  'history.tableEmpty': 'قرائتی نیست. در صفحهٔ اندازه‌گیری کار را آغاز کنید.',

  'table.time': 'ساعت',
  'table.metric': 'شاخص',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Perski nie ma
     utartych skrótów jednostek czasu, więc stoją tu słowem — i tak są krótkie. */
  'range.1m': '1 دقیقه',
  'range.1h': '1 ساعت',
  'range.24h': '24 ساعت',
  'range.7d': '7 روز',
  'range.30d': '30 روز',

  'chart.now': 'اکنون',
  'chart.countSub': {
    one: '{n} قرائت در بازهٔ انتخاب‌شده',
    other: '{n} قرائت در بازهٔ انتخاب‌شده'
  },
  'chart.aria': '{name}، بازهٔ {range}، {count}، آخرین مقدار {value} {unit}.',
  'chart.ariaZone': '{name}، بازهٔ {range}، {count}، آخرین مقدار {value} {unit}، منطقه: {zone}.',
  'chart.ariaEmpty': '{name} — در بازهٔ {range} داده‌ای نیست.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'دستیارها و امکانات کمکی',
  'tools.note': 'ابزارها کمک می‌کنند اندازه‌گیری را بفهمید. همه از همان ابتدا در دسترس‌اند و خودِ اندازه‌گیری مستقل از آن‌ها کار می‌کند.',

  'tool.thresholds.sub': 'از چه مقداری هشدار روشن شود',
  'tool.compare.sub': 'کدام‌یک از دو نور ملایم‌تر است',
  'tool.calibration.sub': 'تنها قابلیتی که واقعاً دقت را بالا می‌برد',
  'tool.screenCheck.sub': 'پنج گام و یک نتیجهٔ آماده دربارهٔ نمایشگر',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „زمان‌بندی آستانه‌ها”
     kontra „زمان‌بندی”. Tak było i tak zostaje. */
  'tool.schedule.title': 'زمان‌بندی آستانه‌ها',
  'tool.schedule.sub': 'آستانه‌های دیگر برای شب، بدون آنکه یادتان بماند',
  'tool.alerts.sub': 'نشانه‌ای وقتی منطقهٔ بحرانی بیش از حد طول بکشد',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'تنظیمات',
  'more.thresholdsSub': 'از چه مقداری هشدار روشن شود',
  'more.docsSub': 'چگونه اندازه بگیریم و این اندازه‌گیری چه چیزی را نمی‌گوید',
  'more.appearanceTitle': 'ظاهر و دسترس‌پذیری',

  'settings.theme': 'پوسته',
  'theme.auto': 'مطابق سیستم',
  'theme.light': 'روشن',
  'theme.dark': 'تیره',

  'settings.textScale': 'اندازهٔ متن',
  'textScale.100': 'استاندارد',
  'textScale.115': 'بزرگ‌تر (115%)',
  'textScale.130': 'بزرگ‌ترین (130%)',

  'settings.contrast': 'کنتراست بیشتر',
  'settings.contrastSub': 'کادرها پررنگ‌تر و متن کمکی تیره‌تر می‌شود.',
  'settings.sound': 'صدای هشدارها',
  'settings.soundSub': 'یک نشانهٔ کوتاه وقتی هشدار مواجهه روشن می‌شود.',
  'settings.vibrate': 'لرزش هنگام هشدار',
  'settings.vibrateSub': 'فقط روی دستگاه‌هایی کار می‌کند که از آن پشتیبانی می‌کنند.',

  'more.dataTitle': 'داده‌ها',
  'more.clearHistory': 'پاک کردن تاریخچهٔ اندازه‌گیری',
  'more.clearHistorySub': 'قرائت‌های ذخیره‌شده را از این دستگاه حذف می‌کند. آستانه‌ها، نمایه‌ها و تنظیمات می‌مانند.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'این برنامه به‌تمامی رایگان است. ',
  'more.supportLink': 'می‌توانید داوطلبانه از آن حمایت کنید.',

  'dialog.clearHistory.title': 'تاریخچهٔ ذخیره‌شده حذف شود؟',
  'dialog.clearHistory.body': {
    one: '{n} نقطهٔ اندازه‌گیری ذخیره‌شده را از این دستگاه حذف می‌کنیم. این کار برگشت‌پذیر نیست. آستانه‌ها، نمایه‌ها و تنظیمات دست‌نخورده می‌مانند.',
    other: '{n} نقطهٔ اندازه‌گیری ذخیره‌شده را از این دستگاه حذف می‌کنیم. این کار برگشت‌پذیر نیست. آستانه‌ها، نمایه‌ها و تنظیمات دست‌نخورده می‌مانند.'
  },
  'dialog.clearHistory.confirm': 'حذف تاریخچه',
  'dialog.clearHistory.cancel': 'بماند',

  'toast.historyCleared': 'تاریخچهٔ اندازه‌گیری حذف شد.',
  'toast.screenUnavailable': 'این صفحه هنوز در این نسخه در دسترس نیست.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'این برنامه چه چیزی را اندازه می‌گیرد',
  'docs.leadText': 'دوربین گوشی به سطحی نورخورده نگاه می‌کند و برنامه پنج بار در ثانیه میانگین کانال‌های R، G و B را از بخش میانی کادر حساب می‌کند. از همین سه عدد هفت شاخص به دست می‌آید.',
  'docs.limitsTitle': 'مرزهای این روش',
  'docs.limitsText': 'دوربین سه کانال رنگی پهن، نوردهی خودکار و توازن سفیدی خودکار دارد. طیف را اندازه نمی‌گیرد و مقدار مطلق نمی‌شناسد، پس روشنایی شاخصی نسبی است، نه لوکس. دمای رنگ و اثر شبانه‌روزی تقریب‌هایی هستند که از رنگ‌های پایهٔ sRGB محاسبه می‌شوند. نمونه‌برداری {rate} Hz فقط سوسوی زیر {limit} Hz را می‌بیند — سوسوی 100 Hz برق شهری خارج از دسترس است و برنامه هرگز آن را به‌عنوان نتیجه گزارش نمی‌کند.',

  'note.howTo.repeat.title': 'اندازه‌گیری را تکرار کنید',
  'note.howTo.repeat.text': 'یک قرائت تنها یک لحظه است. ده‌پانزده ثانیه اندازه‌گیری تصویر قابل‌اعتمادتری می‌دهد.',

  'docs.scale': 'مقیاس',
  'docs.direction': 'جهت',
  'docs.directionHigher': 'بالاتر یعنی بهتر',
  'docs.directionLower': 'پایین‌تر یعنی ملایم‌تر',
  'docs.privacyTitle': 'داده‌ها و حریم خصوصی',
  'docs.privacyText': 'تصویر دوربین به هیچ‌جا فرستاده و در هیچ‌جا ذخیره نمی‌شود — از هر فریم تنها سه عدد می‌ماند. اندازه‌گیری‌ها، آستانه‌ها و تنظیمات در حافظهٔ مرورگر روی همین دستگاه می‌مانند. برنامه هیچ درخواست شبکه‌ای نمی‌فرستد و آفلاین کار می‌کند.',
  'docs.freeLine': 'هر هفت شاخص، تاریخچه، نمودار، ابزارها و حالت آفلاین برای همه کار می‌کنند، بدون حساب و بدون هزینه.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'همه‌چیز در دسترس است',
  'support.heroText': 'هر هفت شاخص، تاریخچهٔ اندازه‌گیری، نمودار، همهٔ ابزارها و حالت آفلاین از همان ابتدا برای همه کار می‌کنند. بدون حساب، بدون محدودیت و بدون هزینه.',
  'support.whyTitle': 'چرا این را می‌خواهم',
  'support.whyText': '{app} بعد از ساعت کاری ساخته می‌شود و از هیچ‌کس درآمدی ندارد: نه تبلیغی هست، نه داده‌ای جمع می‌شود، نه چیزی برای فروش. نگهداری و ادامهٔ کار — شاخص‌های تازه، رفع اشکال‌ها، آزمودن روی گوشی‌های دیگر — وقت می‌برد. اگر این برنامه به کارتان آمده، می‌توانید کمک کنید. مجبور نیستید.',
  'support.whatTitle': 'کمک مالی چه چیزی می‌دهد',
  'support.whatText': 'هیچ. واقعاً چیزی را باز نمی‌کند و چیزی را سریع‌تر نمی‌کند — برنامه پیش و پس از آن دقیقاً همان‌طور به نظر می‌رسد و همان‌طور کار می‌کند. تنها همین را می‌دهد که نویسنده بداند این کار به کار کسی آمده است.',
  'support.button': 'یک قهوه مهمانم کنید',
  'support.pendingTitle': 'صفحهٔ کمک مالی هنوز وصل نشده است',
  'support.pendingText': 'هنوز نشانی‌ای اینجا نیست که بشود حمایت را به آن فرستاد. وقتی آماده شود، همین‌جا ظاهر می‌شود — تا آن‌وقت همه‌چیز در برنامه دقیقاً همان‌طور کار می‌کند.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'دکمه صفحهٔ بیرونی Buy Me a Coffee را در زبانه‌ای تازه باز می‌کند. این تنها لحظه‌ای است که چیزی این دستگاه را ترک می‌کند — و تنها پس از آنکه شما آن را بفشارید رخ می‌دهد. اندازه‌گیری‌ها، تاریخچه و تنظیمات همین‌جا می‌مانند.',
  'privacy.externalPending': 'وقتی نشانی آماده شد، فشردن دکمه صفحه‌ای بیرونی را در زبانه‌ای تازه باز می‌کند. آن تنها لحظه‌ای خواهد بود که چیزی این دستگاه را ترک می‌کند. اندازه‌گیری‌ها، تاریخچه و تنظیمات همین‌جا می‌مانند.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (جایگزین در ui-core.js)',
  'boot.need.metrics': 'هیچ مقداری محاسبه نمی‌شود',
  'boot.need.bus': 'ماژول‌ها دیگر یکدیگر را نمی‌بینند',
  'boot.need.ui': 'نمی‌شود میان صفحه‌ها جابه‌جا شد',
  'boot.need.engine': 'دوربین و اندازه‌گیری راه نمی‌افتند',
  'boot.need.support': 'صفحهٔ حمایت خالی می‌ماند',
  'boot.need.tools': 'زبانهٔ ابزارها خالی می‌ماند',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'این ماژول‌ها بارگذاری نشدند: {list}.',
  'boot.consoleHint': 'ترتیب و مسیر برچسب‌های <script> را در index.html بررسی کنید.',
  'boot.incompleteTitle': 'برنامه ناقص بارگذاری شد',
  'boot.incompleteText': '{missing} صفحه را دوباره بارگذاری کنید؛ اگر کمکی نکرد، فایل‌ها روی سرور ناقص‌اند.',
  'boot.newVersion': 'نسخهٔ تازه‌ای از برنامه هست.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'آستانه‌ها چه می‌کنند. ',
  'thresholds.noteText': 'آستانهٔ هشدار حالت زرد را روشن می‌کند و آستانهٔ بحرانی حالت قرمز را. تغییر بی‌درنگ اثر می‌کند — حتی روی قرائتی که همین حالا روی صفحه است. می‌توانید مجموعهٔ آستانه‌های خودتان را با یک نام ذخیره کنید و هر وقت خواستید به آن برگردید.',
  'thresholds.profilesTitle': 'نمایه‌های آستانه',
  'thresholds.profilesSub': 'سه نمایهٔ درون‌ساخته و نمایه‌های خودتان',
  'thresholds.customName': 'نام نمایهٔ خودتان',
  'thresholds.customPlaceholder': 'برای مثال اتاق خواب در شب',
  'thresholds.save': 'ذخیرهٔ آستانه‌های کنونی',
  'thresholds.saveHelp': 'دقیقاً همان آستانه‌هایی را ذخیره می‌کند که بالا تنظیم شده‌اند.',

  'profile.builtin.default.name': 'پیش‌فرض',
  'profile.builtin.default.desc': 'آستانه‌های فهرست شاخص‌ها — نقطهٔ شروع همهٔ اندازه‌گیری‌ها.',
  'profile.builtin.evening.name': 'شب — ملایم',
  'profile.builtin.evening.desc': 'دربارهٔ رنگ سرد و اثر شبانه‌روزی زودتر هشدار می‌دهد.',
  'profile.builtin.work.name': 'کار پشت میز',
  'profile.builtin.work.desc': 'نور روزِ روشن و سرد را می‌پذیرد؛ مراقب سوسو زدن و یکنواختی است.',
  'profile.custom.desc': 'نمایهٔ خودتان، ذخیره‌شده در {date}.',

  'toast.thresholdsReset': 'آستانه‌های پیش‌فرض بازگردانده شد.',
  'toast.thresholdOrder': 'آستانهٔ هشدار باید پایین‌تر از آستانهٔ بحرانی باشد.',
  'toast.thresholdOrderInverted': 'برای این شاخص آستانهٔ هشدار باید بالاتر از آستانهٔ بحرانی باشد.',
  'toast.profileNameMissing': 'نام نمایه را وارد کنید.',
  'toast.profileSaved': 'نمایهٔ «{name}» ذخیره شد.',
  'toast.profileApplied': 'نمایهٔ «{name}» اعمال شد.',
  'toast.profileApplyFailed': 'اعمال این نمایه ممکن نشد.',
  'toast.profileRemoved': 'نمایه حذف شد.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'زمان‌بندی برای چیست. ',
  'schedule.noteText': 'شب آستانه‌هایی معنا دارند که ظهر معنا ندارند. قاعدهٔ «از–تا» نمایه را خودش عوض می‌کند تا لازم نباشد یادتان بماند. زمان‌بندی هرگز اندازه‌گیری را آغاز یا متوقف نمی‌کند.',
  'schedule.toggle': 'روشن کردن تعویض خودکار',
  'schedule.toggleSub': 'هر دقیقه با ساعت دستگاه بررسی می‌شود.',
  'schedule.emptyTitle': 'قاعده‌ای نیست',
  'schedule.emptyText': 'نخستین قاعده را با دکمهٔ پایین بیفزایید.',
  'schedule.add': 'افزودن قاعده',
  'schedule.to': 'تا',
  'schedule.profile': 'نمایه',
  'schedule.fromAria': 'قاعدهٔ {n}: ساعت شروع',
  'schedule.toAria': 'قاعدهٔ {n}: ساعت پایان',
  'toast.scheduleTimeFormat': 'ساعت‌ها را در قالب 22:00 وارد کنید.',
  'toast.scheduleEnded': 'زمان‌بندی به پایان رسید — آستانه‌های پیشین بازگشتند.',
  'toast.scheduleApplied': 'زمان‌بندی نمایهٔ «{name}» را روشن کرد.',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'هشدار چه می‌کند. ',
  'alerts.noteText': 'یک شاخص را می‌پاید و تنها وقتی به صدا درمی‌آید که آن شاخص منطقهٔ انتخاب‌شده را بی‌وقفه به‌اندازهٔ زمانی که تعیین کرده‌اید نگه دارد. هرگز اندازه‌گیری را متوقف نمی‌کند و جلوی دکمه‌ها را نمی‌گیرد.',
  'alerts.toggle': 'روشن کردن هشدارهای مواجهه',
  'alerts.toggleSub': 'فقط در حین اندازه‌گیری کار می‌کنند.',
  'alerts.metric': 'شاخصی که پاییده می‌شود',
  'alerts.level': 'از کدام منطقه',
  'alerts.level.warning': 'هشدار و بالاتر',
  'alerts.level.critical': 'فقط بحرانی',
  'alerts.sustain': 'پس از چند ثانیه بی‌وقفه',
  'alerts.sustainHelp': 'زمان‌های کوتاه‌تر، وقتی گوشی را جابه‌جا می‌کنید، هشدارهای نادرست بیشتری می‌دهند.',
  'alerts.sound': 'یک نشانهٔ صوتی کوتاه',
  'alerts.soundSub': 'صدا روی همین دستگاه ساخته می‌شود. در صفحهٔ بیشتر می‌شود آن را یکجا هم خاموش کرد.',
  'alerts.barTitle': 'هشدار مواجهه',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} از {seconds} ثانیه پیش منطقهٔ هشدار را نگه داشته است — اکنون {value} {unit}.',
  'alerts.message.critical': '{name} از {seconds} ثانیه پیش منطقهٔ بحرانی را نگه داشته است — اکنون {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'چگونه مقایسه کنیم. ',
  'compare.noteText': 'اندازه‌گیری را آغاز کنید، دوربین را رو به منبع نخست بگیرید و آن را به‌عنوان A ذخیره کنید. بدون تغییر فاصله و زاویه، نور را عوض کنید و B را ذخیره کنید. مقایسه تنها وقتی معنا دارد که صحنه همان باشد.',
  'compare.slotA': 'نور A',
  'compare.slotB': 'نور B',
  'compare.save': 'ذخیرهٔ قرائت کنونی',
  'compare.savedAt': 'ذخیره‌شده در {date}، {time}',
  'compare.empty': 'هنوز چیزی ذخیره نشده است.',
  'compare.verdictTitle': 'نتیجهٔ مقایسه',
  'compare.verdictEmpty': 'هر دو نور را ذخیره کنید تا ببینید کدام ملایم‌تر است.',
  'compare.notEnough': 'داده برای مقایسهٔ این دو اندازه‌گیری کافی نیست.',
  'compare.tie': 'دو منبع عملاً یکسان درمی‌آیند ({metric}: {a} و {b} {unit}). تفاوت در حد نوفهٔ اندازه‌گیری است.',
  'compare.betterA': 'نور A ملایم‌تر است — {metric} آن {better} {unit} است در برابر {worse} {unit}.',
  'compare.betterB': 'نور B ملایم‌تر است — {metric} آن {better} {unit} است در برابر {worse} {unit}.',
  'compare.clear': 'پاک کردن مقایسه',
  'toast.compareSavedA': 'نور A ذخیره شد.',
  'toast.compareSavedB': 'نور B ذخیره شد.',
  'toast.compareCleared': 'مقایسه پاک شد.',
  'toast.measureFirst': 'اول در صفحهٔ اندازه‌گیری کار را آغاز کنید.',

  /* Nazwa wielkości w środku zdania. Po polsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. Perski nie
     zna wielkiej litery, więc brzmią dokładnie tak jak nazwy w warstwie
     wspólnej — i muszą, bo to ta sama wielkość. */
  'metric.share.nameLower': 'سهم آبی',
  'metric.brightness.nameLower': 'روشنایی صحنه',
  'metric.kelvin.nameLower': 'دمای رنگ',
  'metric.melanopic.nameLower': 'اثر شبانه‌روزی',
  'metric.flicker.nameLower': 'سوسو زدن',
  'metric.uniformity.nameLower': 'یکنواختی',
  'metric.comfort.nameLower': 'آسایش چشم',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'چرا این کار جواب می‌دهد. ',
  'calib.noteText': 'حسگر دوربین میان کانال‌هایش انحرافی ثابت دارد. اندازه‌گیری یک برگ کاغذ سفید نشان می‌دهد این انحراف چقدر است و اجازه می‌دهد کم شود. این تنها قابلیت این برنامه است که واقعاً دقت را بالا می‌برد — و باز هم دوربین را به طیف‌سنج تبدیل نمی‌کند.',
  'calib.step1': 'یک برگ کاغذ سفید را زیر نوری که اندازه می‌گیرید بگذارید',
  'calib.step2': 'اندازه‌گیری را آغاز کنید و کادر را با کاغذ پر کنید',
  'calib.step3': '«کالیبره کن» را بزنید و 3 ثانیه گوشی را تکان ندهید',
  'calib.done': 'کالیبره‌شده در {date}، {time}.',
  'calib.none': 'کالیبراسیونی نیست. اندازه‌گیری کار می‌کند؛ مقدارها را مقایسه‌ای در نظر بگیرید.',
  'calib.gain': 'بهرهٔ {channel}',
  'calib.gainsLabel': 'بهرهٔ کانال‌ها',
  'calib.gainsUnset': 'تنظیم‌نشده',
  'calib.start': 'کالیبره کن (3 ثانیه)',
  'calib.clear': 'حذف کالیبراسیون',
  'toast.calibCleared': 'کالیبراسیون حذف شد.',
  'calib.error.noEngine': 'ماژول اندازه‌گیری در دسترس نیست.',
  'calib.error.notRunning': 'اول اندازه‌گیری را آغاز کنید و دوربین را رو به یک برگ کاغذ سفید بگیرید.',
  'calib.error.busy': 'کالیبراسیون هم‌اکنون در جریان است.',
  'calib.error.tooFewSamples': 'نمونه‌ها کم‌اند. بررسی کنید که اندازه‌گیری واقعاً کار می‌کند.',
  'calib.error.tooDark': 'تصویر برای کالیبراسیون بیش‌ازحد تاریک است. کاغذ را بیشتر روشن کنید و دوباره تلاش کنید.',
  'calib.error.tooSkewed': 'انحراف کانال‌ها بزرگ‌تر از آن است که کالیبراسیون به شمار بیاید. از کاغذ سفید در نوری یکنواخت استفاده کنید.',
  'calib.ok': 'کالیبره شد. دمای رنگ و اثر شبانه‌روزی از این پس دقیق‌تر خواهند بود.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'این به چه کار می‌آید. ',
  'screencheck.noteText': 'پنج گام نمایشگر را همان‌طور بررسی می‌کنند که در یک نقد بررسی می‌شود: سفید در دو روشنایی، یکنواختی نور پس‌زمینه، و اینکه حالت شبِ سیستم واقعاً چیزی را عوض می‌کند یا نه. دستیار اندازه‌گیری در جریان را می‌خواند؛ خودش آن را آغاز نمی‌کند.',
  'screencheck.step.white100.title': 'سفید در روشنایی کامل',
  'screencheck.step.white100.hint': 'صفحه‌ای سفید روی نمایشگر باز کنید، روشنایی را روی بیشینه بگذارید و کادر را با نمایشگر پر کنید.',
  'screencheck.step.white20.title': 'سفید در روشنایی کم',
  'screencheck.step.white20.hint': 'روشنایی نمایشگر را تا حدود یک‌پنجم کم کنید و کادر را تغییر ندهید.',
  'screencheck.step.corners.title': 'گوشه‌های نمایشگر',
  'screencheck.step.corners.hint': 'به روشنایی کامل برگردید و کل نمایشگر را به دوربین نشان دهید — یکنواختی نور پس‌زمینه را بررسی می‌کنیم.',
  'screencheck.step.nightOff.title': 'حالت شب خاموش',
  'screencheck.step.nightOff.hint': 'مطمئن شوید فیلتر نور آبی خاموش است.',
  'screencheck.step.nightOn.title': 'حالت شب روشن',
  'screencheck.step.nightOn.hint': 'فیلتر نور آبی سیستم را روشن کنید و همان کادر را تکرار کنید.',
  'screencheck.stepHeading': 'گام {n} از {total}: {title}',
  'screencheck.idleTitle': 'دستیار در حال اجرا نیست',
  'screencheck.idleHint': 'در صفحهٔ اندازه‌گیری کار را آغاز کنید، بعد به اینجا برگردید و «شروع دستیار» را بزنید.',
  'screencheck.next': 'ذخیرهٔ گام و رفتن به بعدی',
  'screencheck.cancel': 'لغو',
  'screencheck.start': 'شروع دستیار',
  'screencheck.clearResult': 'پاک کردن نتیجه',
  'screencheck.resultTitle': 'نتیجه',
  'screencheck.resultEmpty': 'هنوز هیچ گامی ذخیره نشده است.',
  'screencheck.resultPartial': '{done} گام از {total} ذخیره شد. نتیجه‌گیری‌ها وقتی می‌آیند که چیزی برای مقایسه باشد.',
  'screencheck.note.uniformityLow': 'یکنواختی نور پس‌زمینه {value}% است — تفاوت‌های آشکاری در روشنایی کادر دیده می‌شود.',
  'screencheck.note.uniformityOk': 'نور پس‌زمینه یکنواخت است ({value}%).',
  'screencheck.note.nightWorks': 'حالت شب سهم آبی را {value} واحد درصد پایین می‌آورد — کار می‌کند.',
  'screencheck.note.nightWeak': 'حالت شب سهم آبی را تنها {value} واحد درصد تغییر می‌دهد. این کمتر از چیزی است که فیلتر سیستمی معمولاً می‌دهد.',
  'screencheck.note.pwm': 'در روشنایی کم سوسو زدن از {from}% به {to}% می‌رسد — نشانهٔ معمول کم‌نورکردن پالسی (PWM).',
  'toast.screencheckDone': 'دستیار به پایان رسید. نتیجه در پایین است.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'این عددها از کجا می‌آیند. ',
  'reports.noteText': 'گزارش از تاریخچهٔ ذخیره‌شده روی همین دستگاه محاسبه می‌شود — هر پنج ثانیه یک نقطه. موتور از نخستین اندازه‌گیری آن را جمع می‌کند، پس گزارش از همان ابتدا آماده است.',
  'reports.rangeAria': 'بازهٔ گزارش',
  'reports.day': '24 ساعت گذشته',
  'reports.week': '7 روز گذشته',
  'reports.date': 'گزارش برای {date}.',
  'report.headerDay': 'روز از {from} تا {to} — {count}.',
  'report.headerWeek': 'هفته از {from} تا {to} — {count}.',
  'count.points': { one: '{n} نقطه', other: '{n} نقطه' },
  'count.samples': { one: '{n} نمونه', other: '{n} نمونه' },
  'report.emptyTitle': 'در این دوره داده‌ای نیست',
  'report.emptyText': 'در صفحهٔ اندازه‌گیری کار را آغاز کنید — تاریخچه خودش ذخیره می‌شود.',
  'report.colAvg': 'میانگین',
  'report.colMin': 'کمینه',
  'report.colMax': 'بیشینه',
  'report.zonesTitle': 'توزیع منطقه‌ها',
  'report.worstHour': 'بدترین ساعت روز',
  'report.worstHourNone': 'ساعت مشخصی نیست',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'با این چه می‌شود کرد',
  'report.disclaimerTitle': 'این توصیهٔ سلامت نیست. ',
  'report.disclaimerText': 'نتیجه‌گیری‌ها تنها از آنچه دوربین همین گوشی دیده است برمی‌آیند. برنامه طیف را اندازه نمی‌گیرد، لوکس نمی‌شناسد و هیچ تشخیصی نمی‌گذارد.',

  'advice.melanopic': 'اثر شبانه‌روزی به‌طور میانگین {value}× بود. شب‌ها بهتر است زیر 0.50 بروید — ساده‌ترین راه لامپ گرم‌تر یا حالت شب است.',
  'advice.kelvin': 'نور سرد بود (به‌طور میانگین {value} K). برای کار بی‌عیب است؛ دو ساعت پیش از خواب زیر 3000 K بهتر است.',
  'advice.flicker': 'سوسوی محسوسی دیده شد (به‌طور میانگین {value}%). معمولاً کار یک دیمر ارزان یا مبدل نور پس‌زمینه است.',
  'advice.uniformity': 'نور ناهموار پخش می‌شود ({value}%). جابه‌جا کردن چراغ یا تغییر زاویهٔ آن معمولاً بیش از عوض کردن لامپ اثر دارد.',
  'advice.worstHour': 'بدترین ساعت روز {hour}:00 است — بیشترین قرائت‌های بیرون از محدوده آنجا جمع شده‌اند.',
  'advice.none': 'در این دوره چیزی بیرون از محدوده نمی‌زند. بیشترین فایده را اکنون مقایسهٔ دو منبع نور در مقایسهٔ A/B دارد.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'قالب فایل. ',
  'export.noteText': 'نقطه‌ویرگول جداکنندهٔ ستون‌ها، ویرگول جداکنندهٔ اعشار، کدگذاری UTF-8 با نشانهٔ BOM. اکسلی که روی زبانی با ویرگول اعشاری تنظیم شده باشد چنین فایلی را بدون هیچ تنظیمی باز می‌کند.',
  'export.range': 'بازهٔ داده‌ها',
  'export.columns': 'ستون‌های فایل',
  'export.chipFilled': ' — ستون پرشده',
  'export.help': 'فایل هر هفت ستون را دارد — موتور آن‌ها را از نخستین اندازه‌گیری محاسبه می‌کند و همه به فایل می‌روند.',
  'export.run': 'ذخیرهٔ فایل CSV',
  'export.previewEmpty': 'در این بازه قرائتی نیست. اندازه‌گیری را آغاز کنید — تاریخچه خودش ذخیره می‌شود.',
  'csv.range.hour': 'یک ساعت گذشته',
  'csv.range.day': '24 ساعت گذشته',
  'csv.range.week': '7 روز گذشته',
  'csv.range.month': '30 روز گذشته',
  'csv.colDate': 'تاریخ',
  'csv.colTime': 'ساعت',
  'csv.colZone': 'منطقه',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'در بازهٔ انتخاب‌شده هیچ قرائتی نیست.',
  'toast.exportFailed': 'این مرورگر اجازه نداد فایل ذخیره شود.',
  'toast.exportSaved': {
    one: 'فایل {filename} ذخیره شد ({n} ردیف).',
    other: 'فایل {filename} ذخیره شد ({n} ردیف).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} ساعت {m} دقیقه',
  'duration.ms': '{m} دقیقه {s} ثانیه',
  'duration.s': '{s} ثانیه'
});
