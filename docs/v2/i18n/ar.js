/* docs/v2/i18n/ar.js — słownik WERSJI 2, arabski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/ar.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej.
 *
 * PISMO OD PRAWEJ DO LEWEJ: w napisach NIE MA znaków sterujących kierunkiem
 * (U+200E, U+200F, U+202A…U+202E). Kierunkiem zarządza atrybut dir na
 * dokumencie. Symbole jednostek (%, K, ×, Hz), identyfikatory (sRGB, PWM,
 * BOM), nazwy formatów (CSV), litery gniazd porównywarki (A, B), nazwy
 * kanałów (R, G, B) i nazwy plików zostają łacińskie — algorytm dwukierunkowy
 * ustawia je sam.
 *
 * TERMINOLOGIA ZE SŁOWNIKA WSPÓLNEGO (docs/shared/i18n/ar.js), trzymana bez
 * wyjątków: نسبة الأزرق, سطوع المشهد, درجة حرارة اللون,
 * التأثير على الإيقاع اليومي, الوميض, الانتظام, الراحة البصرية; strefy
 * ضمن النطاق i حرج; skróty czasu س, د, ث. Poza tym w tej wersji: المؤشر to
 * mierzona wielkość, القياس to pomiar, السجل to historia, العتبات to progi,
 * الملف to profil progów, المعايرة to kalibracja.
 *
 * LICZEBNIKI: arabski ma SZEŚĆ kategorii CLDR — zero, one, two, few, many,
 * other. Formę wybiera Intl.PluralRules('ar'), nie nasza reguła. W formach
 * one i two liczby się nie pisze („قراءة واحدة”, „قراءتان”), bo tak brzmi to
 * po arabsku; wstawka {n} stoi w pozostałych czterech formach.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (i dlaczego):
 *   'zone.warning'        — wspólne mówi „تنبيه” (Uwaga), ta wersja od zawsze
 *                           mówi „تحذير” (Ostrzeżenie), a w podsumowaniu
 *                           „تحذيرات”;
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu; pismo arabskie
 *                           nie zna wielkich liter, więc brzmi identycznie;
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
window.I18nData['ar'] = Object.assign(window.I18nData['ar'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'مراقب الضوء — قياس الضوء الأزرق',
  'app.description': 'مراقب الضوء — قياس نسبة الضوء الأزرق بكاميرا الهاتف. سبعة مؤشرات، ورسم بياني، وسجل. كل شيء متاح، بلا حساب وبلا رسوم.',
  'app.skipToContent': 'انتقل إلى المحتوى',
  'app.measuring': 'القياس جارٍ',
  'app.docsButton': 'التوثيق والشروح',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — الإصدار 2',

  'nav.aria': 'التنقّل الرئيسي',
  'nav.tablistAria': 'شاشات التطبيق',
  'nav.measure': 'القياس',
  'nav.history': 'السجل',
  'nav.tools': 'الأدوات',
  'nav.support': 'الدعم',
  'nav.more': 'المزيد',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'التوثيق',
  'panel.thresholds': 'العتبات والملفات',
  'panel.reports': 'التقارير',
  'panel.export': 'تصدير البيانات',
  'panel.compare': 'المقارنة A/B',
  'panel.calibration': 'المعايرة بورقة بيضاء',
  'panel.screenCheck': 'افحص شاشتي',
  'panel.schedule': 'الجدول الزمني',
  'panel.alerts': 'إنذارات التعرّض',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'رجوع',
  'action.close': 'إغلاق',
  'action.refresh': 'تحديث',
  'action.apply': 'تطبيق',
  'action.delete': 'حذف',
  'action.hide': 'إخفاء',
  'action.start': 'ابدأ',
  'action.stop': 'أوقف',
  'action.switch': 'تبديل',
  'action.switchAria': 'تبديل الكاميرا: الأمامية أو الخلفية',
  'action.resetDefaults': 'استعادة الافتراضية',
  'action.reports': 'التقارير',
  'action.exportCsv': 'تصدير CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'الشاشة: {name}',
  'a11y.measureStarted': 'بدأ القياس.',
  'a11y.measureStopped': 'توقّف القياس.',
  'a11y.measureStoppedSummary': 'توقّف القياس. المدة: {duration}، {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}، {value} {unit}',
  'a11y.profileApplied': 'طُبّق ملف العتبات.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'تأكيد',
  'dialog.confirm': 'أؤكّد',
  'dialog.cancel': 'إلغاء',
  'dialog.infoTitle': 'معلومة',
  'dialog.ok': 'فهمت',

  'help.sheetTitle': 'وصف المؤشر',
  'help.unit': 'الوحدة',
  'help.scaleRange': 'نطاق المقياس',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które po polsku brzmią podobnie i dlatego mają osobne
     klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą przepuszczoną
     przez toLowerCase() — po niemiecku rzeczownik w środku zdania zostaje
     wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'تحذير',
  'threshold.crit': 'حرج',
  'threshold.warnLabel': 'عتبة التحذير',
  'threshold.critLabel': 'العتبة الحرجة',
  'threshold.warnAria': '{name} — العتبة: تحذير',
  'threshold.critAria': '{name} — العتبة: حرج',

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

  'firstRun.title': 'كيف تقيس',
  'firstRun.text': 'اضغط “ابدأ”، ووجّه الهاتف إلى سطح مُضاء وأبقِه ثابتًا بضع ثوانٍ. والإطار في المعاينة يبيّن الجزء الذي يقرأه التطبيق فعلًا.',
  'firstRun.close': 'إغلاق التلميح',

  'camera.live': 'مباشر',
  'camera.idle': 'الكاميرا متوقفة. اضغط “ابدأ”، ووجّه الهاتف إلى سطح مُضاء وأبقِه ثابتًا بضع ثوانٍ.',
  'camera.stopped': 'توقّف القياس. اضغط “ابدأ” للقياس من جديد.',

  'error.cameraStart': 'تعذّر تشغيل الكاميرا.',
  'error.engineMissing': 'لم تُحمَّل وحدة القياس.',

  'metrics.sevenTitle': 'المؤشرات السبعة',
  'measure.tilesSub': 'تُحدَّث 5 مرات في الثانية',

  'session.title': 'هذه الجلسة',
  'session.duration': 'مدة القياس',
  'session.samples': 'عدد العيّنات',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     „تحذيرات” to nie to samo słowo co „تحذير” pod suwakiem. */
  'zone.count.good': 'ضمن النطاق',
  'zone.count.warning': 'تحذيرات',
  'zone.count.critical': 'حرجة',

  'note.calibrated': 'القياس معايَر بورقة بيضاء — القنوات متساوية.',

  'tile.helpAria': 'ماذا يعني: {name}',
  'tile.noMeasurement': 'لا يوجد قياس',
  'tile.outOfScale': 'خارج المقياس',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'تحذير',
  'zone.spoken.warning': 'تحذير',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'التغيّر عبر الزمن',
  'history.pickHint': 'اختر مؤشرًا ومدى زمنيًا',
  'history.metricLabel': 'المؤشر',
  'history.rangeAria': 'المدى الزمني للرسم البياني',
  'history.emptyTitle': 'لا بيانات في هذا المدى',
  'history.emptyText': 'شغّل القياس في شاشة القياس — يمتلئ الرسم البياني خلال ثوانٍ.',
  'history.tableTitle': 'آخر القراءات',
  'history.tableHide': 'إخفاء الجدول',
  'history.tableShow': 'إظهار الجدول',
  'history.tableCaption': 'آخر قراءات القياس، والأحدث في الأعلى.',
  'history.tableEmpty': 'لا قراءات. شغّل القياس في شاشة القياس.',

  'table.time': 'الوقت',
  'table.metric': 'المؤشر',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     dłuższy zapis łamał się na dwie linie. */
  'range.1m': '1 دقيقة',
  'range.1h': '1 ساعة',
  'range.24h': '24 ساعة',
  'range.7d': '7 أيام',
  'range.30d': '30 يومًا',

  'chart.now': 'الآن',
  'chart.countSub': {
    zero: '{n} قراءة في المدى المختار',
    one: 'قراءة واحدة في المدى المختار',
    two: 'قراءتان في المدى المختار',
    few: '{n} قراءات في المدى المختار',
    many: '{n} قراءة في المدى المختار',
    other: '{n} قراءة في المدى المختار'
  },
  'chart.aria': '{name}، المدى {range}، {count}، آخر قيمة {value} {unit}.',
  'chart.ariaZone': '{name}، المدى {range}، {count}، آخر قيمة {value} {unit}، المنطقة: {zone}.',
  'chart.ariaEmpty': '{name} — لا بيانات في المدى {range}.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'معالجات ووظائف مساعدة',
  'tools.note': 'تساعدك الأدوات على تفسير القياس. وكلها متاحة فورًا، والقياس نفسه يعمل مستقلًا عنها.',

  'tool.thresholds.sub': 'متى ينبغي أن تُشعل القيمة تحذيرًا',
  'tool.compare.sub': 'أيّ الضوءين ألطف',
  'tool.calibration.sub': 'الوظيفة الوحيدة التي ترفع الدقة فعلًا',
  'tool.screenCheck.sub': 'خمس خطوات ونتيجة جاهزة عن الشاشة',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „جدول العتبات”
     kontra „الجدول الزمني”. Tak było i tak zostaje. */
  'tool.schedule.title': 'جدول العتبات',
  'tool.schedule.sub': 'عتبات أخرى في المساء، بلا حاجة إلى تذكّر ذلك',
  'tool.alerts.sub': 'إشارة حين تطول المنطقة الحرجة أكثر من اللازم',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'الإعدادات',
  'more.thresholdsSub': 'متى ينبغي أن تُشعل القيمة تحذيرًا',
  'more.docsSub': 'كيف تقيس، وما الذي لا يقوله هذا القياس',
  'more.appearanceTitle': 'المظهر وسهولة الوصول',

  'settings.theme': 'السمة',
  'theme.auto': 'حسب النظام',
  'theme.light': 'فاتحة',
  'theme.dark': 'داكنة',

  'settings.textScale': 'حجم النص',
  'textScale.100': 'قياسي',
  'textScale.115': 'أكبر (115%)',
  'textScale.130': 'الأكبر (130%)',

  'settings.contrast': 'تباين أعلى',
  'settings.contrastSub': 'حدود أقوى ونص مساعد أغمق.',
  'settings.sound': 'صوت الإنذارات',
  'settings.soundSub': 'إشارة قصيرة حين يعمل إنذار التعرّض.',
  'settings.vibrate': 'الاهتزاز عند الإنذارات',
  'settings.vibrateSub': 'يعمل على الأجهزة التي تدعمه فقط.',

  'more.dataTitle': 'البيانات',
  'more.clearHistory': 'مسح سجل القياسات',
  'more.clearHistorySub': 'يحذف القراءات المحفوظة من هذا الجهاز. وتبقى العتبات والملفات والإعدادات.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'التطبيق مجاني بالكامل. ',
  'more.supportLink': 'ويمكنك دعمه تطوّعًا.',

  'dialog.clearHistory.title': 'هل تريد حذف السجل المحفوظ؟',
  'dialog.clearHistory.body': {
    zero: 'سنحذف {n} نقطة قياس محفوظة من هذا الجهاز. ولا يمكن التراجع عن هذه العملية. وتبقى العتبات والملفات والإعدادات دون مساس.',
    one: 'سنحذف نقطة قياس واحدة محفوظة من هذا الجهاز. ولا يمكن التراجع عن هذه العملية. وتبقى العتبات والملفات والإعدادات دون مساس.',
    two: 'سنحذف نقطتَي قياس محفوظتين من هذا الجهاز. ولا يمكن التراجع عن هذه العملية. وتبقى العتبات والملفات والإعدادات دون مساس.',
    few: 'سنحذف {n} نقاط قياس محفوظة من هذا الجهاز. ولا يمكن التراجع عن هذه العملية. وتبقى العتبات والملفات والإعدادات دون مساس.',
    many: 'سنحذف {n} نقطة قياس محفوظة من هذا الجهاز. ولا يمكن التراجع عن هذه العملية. وتبقى العتبات والملفات والإعدادات دون مساس.',
    other: 'سنحذف {n} نقطة قياس محفوظة من هذا الجهاز. ولا يمكن التراجع عن هذه العملية. وتبقى العتبات والملفات والإعدادات دون مساس.'
  },
  'dialog.clearHistory.confirm': 'احذف السجل',
  'dialog.clearHistory.cancel': 'الإبقاء عليه',

  'toast.historyCleared': 'حُذف سجل القياسات.',
  'toast.screenUnavailable': 'هذه الشاشة غير متاحة بعد في هذا الإصدار.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'ما الذي يقيسه هذا التطبيق',
  'docs.leadText': 'تنظر كاميرا الهاتف إلى سطح مُضاء، ويحسب التطبيق خمس مرات في الثانية متوسطات القنوات R وG وB من الجزء الأوسط من الإطار. ومن هذه الأرقام الثلاثة يشتقّ المؤشرات السبعة.',
  'docs.limitsTitle': 'حدود الطريقة',
  'docs.limitsText': 'للكاميرا ثلاث قنوات لونية عريضة، وتعريض تلقائي وموازنة بيضاء تلقائية. وهي لا تقيس الطيف ولا تعرف القيم المطلقة، فالسطوع مؤشر نسبي لا لوكسات. ودرجة حرارة اللون والتأثير على الإيقاع اليومي تقديران تقريبيان محسوبان من ألوان sRGB. وأخذ العينات بمعدل {rate} Hz لا يرى من الوميض إلا ما كان دون {limit} Hz — ووميض شبكة الكهرباء عند 100 Hz خارج المتناول، ولن يعرضه التطبيق أبدًا كنتيجة.',

  'note.howTo.repeat.title': 'كرّر القياس',
  'note.howTo.repeat.text': 'القراءة الواحدة لقطة عابرة. وبضع عشرة ثانية من القياس تعطي صورة أجدر بالثقة.',

  'docs.scale': 'المقياس',
  'docs.direction': 'الاتجاه',
  'docs.directionHigher': 'الأعلى أفضل',
  'docs.directionLower': 'الأدنى ألطف',
  'docs.privacyTitle': 'البيانات والخصوصية',
  'docs.privacyText': 'صورة الكاميرا لا تُرسل ولا تُحفظ في أي مكان — ولا يبقى من كل إطار سوى ثلاثة أرقام. والقياسات والعتبات والإعدادات موجودة في ذاكرة المتصفح على هذا الجهاز. ولا يجري التطبيق أي طلبات شبكية، وهو يعمل دون اتصال.',
  'docs.freeLine': 'المؤشرات السبعة كلها، والسجل، والرسم البياني، والأدوات، والعمل دون اتصال تعمل للجميع، بلا حساب وبلا رسوم.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'كل شيء متاح',
  'support.heroText': 'المؤشرات السبعة كلها، وسجل القياسات، والرسم البياني، والأدوات كلها، والعمل دون اتصال تعمل للجميع، فورًا. بلا حساب وبلا حدود وبلا رسوم.',
  'support.whyTitle': 'لماذا أطلب ذلك',
  'support.whyText': 'يُبنى {app} خارج ساعات العمل ولا يكسب من أحد: لا إعلانات فيه، ولا يجمع بيانات، وليس لديه ما يبيعه. أما الحفاظ عليه ومواصلة تطويره — مؤشرات جديدة، وإصلاحات، واختبارات على هواتف أخرى — فتكلّف وقتًا. فإن كان التطبيق قد نفعك، يمكنك المساهمة. ولست مضطرًا.',
  'support.whatTitle': 'ماذا يمنحك التبرّع',
  'support.whatText': 'لا شيء. حقًا لا يفتح شيئًا ولا يسرّع شيئًا — فالتطبيق يبدو ويعمل قبله وبعده على النحو نفسه بالضبط. وكل ما يمنحه هو أن يعرف المؤلف أن هذا العمل نفع أحدًا.',
  'support.button': 'ادعمني بفنجان قهوة',
  'support.pendingTitle': 'لم يُربط ملف التبرّعات بعد',
  'support.pendingText': 'لا يوجد هنا بعد عنوان يمكن إرسال الدعم إليه. وسيظهر في هذا المكان حين يصبح جاهزًا — وحتى ذلك الحين يعمل كل شيء في التطبيق على النحو نفسه بالضبط.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'يفتح الزر صفحة Buy Me a Coffee الخارجية في علامة تبويب جديدة. وهذه هي اللحظة الوحيدة التي يغادر فيها أي شيء هذا الجهاز — ولا يحدث ذلك إلا بعد ضغطك عليه. أما القياسات والسجل والإعدادات فتبقى هنا.',
  'privacy.externalPending': 'حين يظهر العنوان، سيفتح الضغط صفحة خارجية في علامة تبويب جديدة. وستكون تلك هي اللحظة الوحيدة التي يغادر فيها أي شيء هذا الجهاز. أما القياسات والسجل والإعدادات فتبقى هنا.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (احتياطي في ui-core.js)',
  'boot.need.metrics': 'لن تُحسب أي قيمة',
  'boot.need.bus': 'ستتوقف الوحدات عن رؤية بعضها',
  'boot.need.ui': 'لن يمكن تبديل الشاشات',
  'boot.need.engine': 'لن تعمل الكاميرا ولن يبدأ القياس',
  'boot.need.support': 'ستكون شاشة الدعم فارغة',
  'boot.need.tools': 'ستكون علامة تبويب الأدوات فارغة',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'لم تُحمَّل هذه الوحدات: {list}.',
  'boot.consoleHint': 'تحقّق من ترتيب وسوم <script> ومساراتها في index.html.',
  'boot.incompleteTitle': 'حُمّل التطبيق تحميلًا ناقصًا',
  'boot.incompleteText': '{missing} أعد تحميل الصفحة؛ فإن لم ينفع ذلك، فالملفات ناقصة على الخادم.',
  'boot.newVersion': 'يوجد إصدار جديد من التطبيق.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'ما الذي تفعله العتبات. ',
  'thresholds.noteText': 'عتبة التحذير تُشعل الحالة الصفراء، والعتبة الحرجة تُشعل الحمراء. ويسري التغيير فورًا — حتى على القراءة الظاهرة على الشاشة الآن. ويمكنك حفظ مجموعة عتباتك الخاصة باسم تختاره والعودة إليها متى شئت.',
  'thresholds.profilesTitle': 'ملفات العتبات',
  'thresholds.profilesSub': 'الثلاثة المدمجة ومجموعاتك الخاصة',
  'thresholds.customName': 'اسم ملفك الخاص',
  'thresholds.customPlaceholder': 'مثلًا غرفة النوم مساءً',
  'thresholds.save': 'احفظ العتبات الحالية',
  'thresholds.saveHelp': 'يحفظ العتبات المضبوطة أعلاه بالضبط.',

  'profile.builtin.default.name': 'الافتراضي',
  'profile.builtin.default.desc': 'العتبات من كتالوج المؤشرات — نقطة البدء لكل القياسات.',
  'profile.builtin.evening.name': 'المساء — لطيف',
  'profile.builtin.evening.desc': 'يحذّر مبكرًا من اللون البارد ومن التأثير على الإيقاع اليومي.',
  'profile.builtin.work.name': 'العمل على المكتب',
  'profile.builtin.work.desc': 'يسمح بضوء نهار ساطع وبارد؛ ويراقب الوميض والانتظام.',
  'profile.custom.desc': 'ملف خاص محفوظ في {date}.',

  'toast.thresholdsReset': 'استُعيدت العتبات الافتراضية.',
  'toast.thresholdOrder': 'يجب أن تكون عتبة التحذير أدنى من العتبة الحرجة.',
  'toast.thresholdOrderInverted': 'في هذا المؤشر يجب أن تكون عتبة التحذير أعلى من العتبة الحرجة.',
  'toast.profileNameMissing': 'أدخل اسم الملف.',
  'toast.profileSaved': 'حُفظ الملف “{name}”.',
  'toast.profileApplied': 'طُبّق الملف “{name}”.',
  'toast.profileApplyFailed': 'تعذّر تطبيق هذا الملف.',
  'toast.profileRemoved': 'حُذف الملف.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'ما فائدة الجدول الزمني. ',
  'schedule.noteText': 'في المساء تكون العتبات المعقولة غير عتبات الظهيرة. وقاعدة «من–إلى» تبدّل الملف من تلقاء نفسها، كي لا تحتاج إلى تذكّر ذلك. والجدول الزمني لا يشغّل القياس ولا يوقفه أبدًا.',
  'schedule.toggle': 'فعّل التبديل التلقائي',
  'schedule.toggleSub': 'يُفحص كل دقيقة على ساعة الجهاز.',
  'schedule.emptyTitle': 'لا توجد قواعد',
  'schedule.emptyText': 'أضف أول قاعدة بالزر أدناه.',
  'schedule.add': 'أضف قاعدة',
  'schedule.to': 'إلى',
  'schedule.profile': 'الملف',
  'schedule.fromAria': 'القاعدة {n}: وقت البدء',
  'schedule.toAria': 'القاعدة {n}: وقت الانتهاء',
  'toast.scheduleTimeFormat': 'أدخل الأوقات بصيغة 22:00.',
  'toast.scheduleEnded': 'انتهى الجدول الزمني — وعادت العتبات السابقة.',
  'toast.scheduleApplied': 'شغّل الجدول الزمني الملف “{name}”.',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'ما الذي يفعله الإنذار. ',
  'alerts.noteText': 'يراقب مؤشرًا واحدًا ولا يتكلم إلا حين يبقى ذلك المؤشر في المنطقة المختارة دون انقطاع طوال المدة التي ضبطتها. وهو لا يوقف القياس أبدًا ولا يحجب الأزرار.',
  'alerts.toggle': 'فعّل إنذارات التعرّض',
  'alerts.toggleSub': 'تعمل أثناء القياس الجاري فقط.',
  'alerts.metric': 'المؤشر المراقَب',
  'alerts.level': 'من أي منطقة',
  'alerts.level.warning': 'التحذيرية وما فوقها',
  'alerts.level.critical': 'الحرجة فقط',
  'alerts.sustain': 'بعد كم ثانية دون انقطاع',
  'alerts.sustainHelp': 'المدد الأقصر تعطي إنذارات كاذبة أكثر حين تحرّك الهاتف.',
  'alerts.sound': 'إشارة صوتية قصيرة',
  'alerts.soundSub': 'الصوت يُولَّد محليًا. ويمكن إيقافه كليًا أيضًا في شاشة المزيد.',
  'alerts.barTitle': 'إنذار التعرّض',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} في المنطقة التحذيرية منذ {seconds} ث — الآن {value} {unit}.',
  'alerts.message.critical': '{name} في المنطقة الحرجة منذ {seconds} ث — الآن {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'كيف تقارن. ',
  'compare.noteText': 'شغّل القياس، ووجّه الكاميرا إلى المصدر الأول واحفظه بوصفه A. ثم بدّل الضوء دون تغيير المسافة ولا الزاوية واحفظ B. والمقارنة لا معنى لها إلا إذا كان المشهد هو نفسه.',
  'compare.slotA': 'الضوء A',
  'compare.slotB': 'الضوء B',
  'compare.save': 'احفظ القراءة الحالية',
  'compare.savedAt': 'حُفظ في {date}، {time}',
  'compare.empty': 'لم يُحفظ شيء بعد.',
  'compare.verdictTitle': 'نتيجة المقارنة',
  'compare.verdictEmpty': 'احفظ الضوءين لترى أيهما ألطف.',
  'compare.notEnough': 'البيانات لا تكفي لمقارنة هذين القياسين.',
  'compare.tie': 'يخرج المصدران متساويين عمليًا ({metric}: {a} و{b} {unit}). والفرق يقع داخل ضوضاء القياس.',
  'compare.betterA': 'الألطف هو الضوء A — {metric} يبلغ {better} {unit} مقابل {worse} {unit}.',
  'compare.betterB': 'الألطف هو الضوء B — {metric} يبلغ {better} {unit} مقابل {worse} {unit}.',
  'compare.clear': 'امسح المقارنة',
  'toast.compareSavedA': 'حُفظ الضوء A.',
  'toast.compareSavedB': 'حُفظ الضوء B.',
  'toast.compareCleared': 'مُسحت المقارنة.',
  'toast.measureFirst': 'شغّل القياس أولًا في شاشة القياس.',

  /* Nazwa wielkości w środku zdania. Po polsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. Pismo
     arabskie nie zna wielkich liter, więc te nazwy brzmią dokładnie tak, jak
     w warstwie wspólnej. */
  'metric.share.nameLower': 'نسبة الأزرق',
  'metric.brightness.nameLower': 'سطوع المشهد',
  'metric.kelvin.nameLower': 'درجة حرارة اللون',
  'metric.melanopic.nameLower': 'التأثير على الإيقاع اليومي',
  'metric.flicker.nameLower': 'الوميض',
  'metric.uniformity.nameLower': 'الانتظام',
  'metric.comfort.nameLower': 'الراحة البصرية',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'لماذا ينجح هذا. ',
  'calib.noteText': 'لمستشعر الكاميرا انحراف ثابت بين القنوات. وقياس ورقة بيضاء يبيّن مقداره ويتيح طرحه. وهذه هي الوظيفة الوحيدة في هذا التطبيق التي ترفع الدقة فعلًا — وهي مع ذلك لا تحوّل الكاميرا إلى مطياف.',
  'calib.step1': 'ضع ورقة بيضاء تحت الضوء المقيس',
  'calib.step2': 'شغّل القياس واملأ الإطار بالورقة',
  'calib.step3': 'اضغط “عايِر” ولا تحرّك الهاتف مدة 3 ثوانٍ',
  'calib.done': 'جرت المعايرة في {date}، {time}.',
  'calib.none': 'لا توجد معايرة. القياس يعمل، وتعامل مع القيم على أنها للمقارنة.',
  'calib.gain': 'كسب {channel}',
  'calib.gainsLabel': 'كسب القنوات',
  'calib.gainsUnset': 'غير مضبوط',
  'calib.start': 'عايِر (3 ث)',
  'calib.clear': 'احذف المعايرة',
  'toast.calibCleared': 'حُذفت المعايرة.',
  'calib.error.noEngine': 'وحدة القياس غير متاحة.',
  'calib.error.notRunning': 'شغّل القياس أولًا ووجّه الكاميرا إلى ورقة بيضاء.',
  'calib.error.busy': 'المعايرة جارية بالفعل.',
  'calib.error.tooFewSamples': 'العيّنات قليلة جدًا. تحقّق من أن القياس يعمل فعلًا.',
  'calib.error.tooDark': 'الصورة أشدّ عتمة من أن تُعايَر. أضئ الورقة أكثر وحاول مرة أخرى.',
  'calib.error.tooSkewed': 'انحراف القنوات أكبر من أن يُقبل معايرةً. استخدم ورقة بيضاء في ضوء منتظم.',
  'calib.ok': 'جرت المعايرة. وستصبح درجة حرارة اللون والتأثير الميلانوبي أدقّ الآن.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'ما فائدة هذا. ',
  'screencheck.noteText': 'خمس خطوات تفحص الشاشة كما تُفحص في المراجعات: البياض عند مستويَي سطوع، وانتظام الإضاءة الخلفية، وهل يغيّر الوضع الليلي في النظام شيئًا فعلًا. والمعالج يقرأ قياسًا جاريًا؛ وهو لا يشغّله بنفسه.',
  'screencheck.step.white100.title': 'البياض عند السطوع الكامل',
  'screencheck.step.white100.hint': 'افتح صفحة بيضاء على الشاشة، واضبط السطوع على أقصاه واملأ الإطار بالشاشة.',
  'screencheck.step.white20.title': 'البياض عند سطوع منخفض',
  'screencheck.step.white20.hint': 'اخفض سطوع الشاشة إلى نحو الخُمس ولا تغيّر الإطار.',
  'screencheck.step.corners.title': 'زوايا الشاشة',
  'screencheck.step.corners.hint': 'عُد إلى السطوع الكامل وأظهر للكاميرا الشاشة كلها — نحن نفحص انتظام الإضاءة الخلفية.',
  'screencheck.step.nightOff.title': 'الوضع الليلي مُطفأ',
  'screencheck.step.nightOff.hint': 'تأكّد من أن مرشّح الضوء الأزرق مُطفأ.',
  'screencheck.step.nightOn.title': 'الوضع الليلي مُشغّل',
  'screencheck.step.nightOn.hint': 'شغّل مرشّح الضوء الأزرق في النظام وكرّر الإطار نفسه.',
  'screencheck.stepHeading': 'الخطوة {n} من {total}: {title}',
  'screencheck.idleTitle': 'المعالج غير مشغّل',
  'screencheck.idleHint': 'شغّل القياس في شاشة القياس، ثم عُد إلى هنا واضغط “ابدأ”.',
  'screencheck.next': 'احفظ الخطوة وتابع',
  'screencheck.cancel': 'إيقاف',
  'screencheck.start': 'ابدأ المعالج',
  'screencheck.clearResult': 'امسح النتيجة',
  'screencheck.resultTitle': 'النتيجة',
  'screencheck.resultEmpty': 'لم تُحفظ أي خطوة بعد.',
  'screencheck.resultPartial': 'حُفظت {done} من {total} خطوات. وستظهر الاستنتاجات حين يوجد ما يُقارن.',
  'screencheck.note.uniformityLow': 'انتظام الإضاءة الخلفية {value}% — تظهر في الإطار فروق سطوع واضحة.',
  'screencheck.note.uniformityOk': 'الإضاءة الخلفية منتظمة ({value}%).',
  'screencheck.note.nightWorks': 'يخفض الوضع الليلي نسبة الأزرق بمقدار {value} نقطة مئوية — إنه يعمل.',
  'screencheck.note.nightWeak': 'يغيّر الوضع الليلي نسبة الأزرق بمقدار {value} نقطة مئوية فقط. وهذا أقل مما يعطيه مرشّح النظام عادةً.',
  'screencheck.note.pwm': 'عند السطوع المنخفض يرتفع الوميض من {from}% إلى {to}% — وهذا عرض نموذجي للتعتيم النبضي (PWM).',
  'toast.screencheckDone': 'انتهى المعالج. والنتيجة أدناه.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'من أين تأتي هذه الأرقام. ',
  'reports.noteText': 'يُحسب التقرير من السجل المحفوظ على هذا الجهاز — نقطة واحدة كل خمس ثوانٍ. والمحرّك يجمعه منذ أول قياس، فالتقرير جاهز فورًا.',
  'reports.rangeAria': 'مدى التقرير',
  'reports.day': 'آخر 24 ساعة',
  'reports.week': 'آخر 7 أيام',
  'reports.date': 'تقرير ليوم {date}.',
  'report.headerDay': 'يوم من {from} إلى {to} — {count}.',
  'report.headerWeek': 'أسبوع من {from} إلى {to} — {count}.',
  'count.points': { zero: '{n} نقطة', one: 'نقطة واحدة', two: 'نقطتان', few: '{n} نقاط', many: '{n} نقطة', other: '{n} نقطة' },
  'count.samples': { zero: '{n} عيّنة', one: 'عيّنة واحدة', two: 'عيّنتان', few: '{n} عيّنات', many: '{n} عيّنة', other: '{n} عيّنة' },
  'report.emptyTitle': 'لا بيانات في هذه المدة',
  'report.emptyText': 'شغّل القياس في شاشة القياس — والسجل يحفظ نفسه.',
  'report.colAvg': 'المتوسط',
  'report.colMin': 'الأدنى',
  'report.colMax': 'الأعلى',
  'report.zonesTitle': 'توزيع المناطق',
  'report.worstHour': 'أسوأ وقت في اليوم',
  'report.worstHourNone': 'لا وقت بارز',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'ماذا تفعل حيال ذلك',
  'report.disclaimerTitle': 'هذه ليست نصيحة صحية. ',
  'report.disclaimerText': 'الاستنتاجات تنبع حصرًا مما رأته كاميرا هذا الهاتف. والتطبيق لا يقيس الطيف، ولا يعرف اللوكسات، ولا يضع أي تشخيص.',

  'advice.melanopic': 'بلغ متوسط التأثير على الإيقاع اليومي {value}×. ويُستحسن في المساء النزول دون 0.50 — وأبسط طريقة مصباح أدفأ أو الوضع الليلي.',
  'advice.kelvin': 'كان الضوء باردًا (بمتوسط {value} K). وهذا لا غبار عليه في العمل؛ أما قبل النوم بساعتين فالأفضل ما دون 3000 K.',
  'advice.flicker': 'رُصد وميض ملحوظ (بمتوسط {value}%). والمسؤول عنه عادةً مُعتِّم رخيص أو مغذّي الإضاءة الخلفية.',
  'advice.uniformity': 'الضوء يتوزع بغير انتظام ({value}%). ونقل المصباح أو تغيير زاويته يعطي عادةً أكثر مما يعطيه تبديل اللمبة.',
  'advice.worstHour': 'أسوأ وقت في اليوم هو الساعة {hour}:00 — فهناك يتجمع أكبر عدد من القراءات خارج النطاق.',
  'advice.none': 'لا شيء في هذه المدة يخرج عن النطاق. وأكثر ما ينفع الآن هو مقارنة مصدري ضوء في المقارنة A/B.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'صيغة الملف. ',
  'export.noteText': 'فاصلة منقوطة فاصلًا للأعمدة، وفاصلة علامةً عشرية، وترميز UTF-8 مع علامة BOM. ومثل هذا الملف يفتحه إكسل المضبوط على لغة تستعمل الفاصلة علامةً عشرية بلا ضبط أي شيء.',
  'export.range': 'مدى البيانات',
  'export.columns': 'الأعمدة في الملف',
  'export.chipFilled': ' — العمود مملوء',
  'export.help': 'يحتوي الملف على الأعمدة السبعة كلها — فالمحرّك يحسبها منذ أول قياس وكلها تدخل في الملف.',
  'export.run': 'احفظ ملف CSV',
  'export.previewEmpty': 'لا قراءات في هذا المدى. شغّل القياس — والسجل يحفظ نفسه.',
  'csv.range.hour': 'آخر ساعة',
  'csv.range.day': 'آخر 24 ساعة',
  'csv.range.week': 'آخر 7 أيام',
  'csv.range.month': 'آخر 30 يومًا',
  'csv.colDate': 'التاريخ',
  'csv.colTime': 'الوقت',
  'csv.colZone': 'المنطقة',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'لا توجد أي قراءات في المدى المختار.',
  'toast.exportFailed': 'لم يسمح هذا المتصفح بحفظ الملف.',
  'toast.exportSaved': {
    zero: 'حُفظ الملف {filename} ({n} سطر).',
    one: 'حُفظ الملف {filename} (سطر واحد).',
    two: 'حُفظ الملف {filename} (سطران).',
    few: 'حُفظ الملف {filename} ({n} أسطر).',
    many: 'حُفظ الملف {filename} ({n} سطرًا).',
    other: 'حُفظ الملف {filename} ({n} سطر).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} س {m} د',
  'duration.ms': '{m} د {s} ث',
  'duration.s': '{s} ث'
});
