/* Monitor Światła v5 — słownik arabski.
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr). NIE JEST
 * kalką żadnego z nich: polskie i angielskie zdania przełożono na naturalną
 * arabszczyznę literacką (MSA), a nie słowo w słowo. Zachowane zostało to, co
 * niesie znaczenie: liczby, progi, jednostki, nazwy wstawek i — co do treści —
 * zastrzeżenia medyczne oraz zdania o prywatności. Tych ostatnich nie wolno
 * osłabiać ani wzmacniać: „nie zastępuje rozmowy z lekarzem” ma po arabsku
 * znaczyć dokładnie tyle samo, a „obraz nie opuszcza urządzenia” nie może stać
 * się obietnicą szerszą niż polska.
 *
 * PISMO OD PRAWEJ DO LEWEJ. W napisach NIE MA znaków sterujących kierunkiem
 * (U+200E, U+200F, U+202A…U+202E): kierunkiem zarządza atrybut `dir` na
 * dokumencie (js/i18n/index.js zna arabski jako 'rtl'). Znak minus przy
 * etykiecie osi (U+2212) i mnożenie (×) zostają tam, gdzie stoją w pozostałych
 * słownikach — algorytm dwukierunkowy sam przestawia je na właściwą stronę.
 * Cyfry są łacińskie, bo `Intl.NumberFormat('ar')` domyślnie takich używa
 * (numberingSystem: 'latn'), a separatorem dziesiętnym jest kropka — stąd
 * „0.50” i „1.00” w zdaniach, nie „0,50”.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych):
 *   نسبة الأزرق (udział niebieskiego), سطوع المشهد (jasność sceny),
 *   درجة حرارة اللون (temperatura barwowa), الأثر على الإيقاع اليومي
 *   (wpływ na rytm dobowy; w opisie: النسبة الميلانوبية — współczynnik
 *   melanopiczny), الوميض (migotanie), الانتظام (równomierność),
 *   الراحة البصرية (komfort wzrokowy).
 * Osobno rozdzielone: القياس (pomiar, czynność) i المؤشر (mierzona wielkość);
 * القرص to tarcza dużego wskaźnika, السجل to historia.
 * STREFY: آمن / معتدل / ضار — tak samo jak angielskie safe / moderate /
 * harmful mówią o świetle, a nie o stanie aplikacji, i wchodzą w zdanie
 * „المنطقة: {zone}”.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Tekst ze wstawką {nazwa}'          — napis zwykły,
 *   'klucz.kropkowany': { zero, one, two, few, many, other } — forma zależna
 *                                                             od liczby.
 * Arabski ma w CLDR SZEŚĆ form i wszystkie muszą tu być — sprawdza to
 * keys.test.js przez Intl.PluralRules('ar'). Nazwy wstawek są identyczne jak
 * w pl.js; kolejność wstawek w zdaniu wolno zmieniać, nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'مراقب الضوء',
  'app.description': 'مراقب الضوء — تقيس الكاميرا سبعة مؤشرات للضوء من حولك. كل الحساب يجري على هذا الجهاز، ولا شيء يخرج إلى الشبكة.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — مراقب الضوء',
  'app.skipToContent': 'انتقل إلى المحتوى',
  'app.nav.aria': 'التنقّل الرئيسي',
  'app.noscript.title': 'هذا التطبيق يحتاج إلى JavaScript',
  'app.noscript.text': 'يجري القياس كله داخل علامة تبويب المتصفح هذه: JavaScript هو ما يقرأ إطارات الكاميرا ويحسب منها مؤشرات الضوء السبعة. ومن دونه لا توجد أداة للقياس. فعّل JavaScript لهذه الصفحة ثم افتحها من جديد — ومع ذلك لن يُرسل أي شيء إلى الشبكة.',

  'nav.measure': 'القياس',
  'nav.history': 'السجل',
  'nav.tools': 'الأدوات',
  'nav.support': 'الدعم',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'القياس جارٍ',
  'shell.live.aria': 'القياس جارٍ. {metric}: {value}. عد إلى شاشة القياس.',
  'shell.live.metricFallback': 'المؤشر الرئيسي',
  'shell.action.fallback': 'إجراء الشاشة',

  'shell.loadFail.title': 'تعذّر تحميل شاشة «{screen}»',
  'shell.loadFail.text': 'الأرجح أن بعض الملفات ناقصة في ذاكرة الجهاز. اتصل بالشبكة وأعد تحميل الصفحة.',
  'shell.fatal.title': 'حدث خطأ ما',
  'shell.fatal.text': 'لم يتمكّن التطبيق من تركيب الشاشة. وإعادة تحميل الصفحة تكفي عادةً — تبقى قياساتك وإعداداتك المحفوظة في مكانها.',
  'shell.fatal.reload': 'أعد تحميل الصفحة',
  'shell.boot.failTitle': 'تعذّر تشغيل التطبيق',
  'shell.boot.failText': 'لم تبدأ الواجهة. أعد تحميل الصفحة — تبقى قياساتك وإعداداتك المحفوظة في مكانها.',
  'shell.background.error': 'حدث عطل في الخلفية',
  'shell.background.action': 'إعادة التحميل',
  'shell.update.title': 'تتوفّر نسخة جديدة',
  'shell.update.action': 'إعادة التحميل',

  'onboarding.title': 'قبل أن تبدأ',
  'onboarding.lead': 'ينظر مراقب الضوء بالكاميرا إلى الضوء من حولك ويحسب منه سبعة مؤشرات — من نسبة الأزرق إلى الراحة البصرية.',
  'onboarding.privacy': 'الصورة لا تغادر هذا الجهاز: لا خادم ولا حساب ولا إرسال. والمؤشرات السبعة كلها تعمل فورًا، بلا تسجيل دخول وبلا رسوم.',
  'onboarding.honesty': 'هذا استدلال تقريبي، لا جهاز قياس ولا فحص طبي. وما لا يمكن قياسه لا نعرضه — سترى شَرطة بدل الرقم.',
  'onboarding.start': 'لنبدأ',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'تنفيذ',
  'overlay.toast.close': 'إغلاق الرسالة',
  'overlay.sheet.label': 'نافذة',
  'overlay.sheet.close': 'إغلاق',
  'overlay.dialog.confirm': 'تأكيد',
  'overlay.dialog.cancel': 'إلغاء',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'إلغاء',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: arabski pisze tu przecinek „،” (U+060C),
     a nie przecinek łaciński. */
  'common.listSeparator': '، ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'القياس',

  'measure.intro.aria': 'ابدأ القياس',
  'measure.intro.headline': 'انظر ما الذي يضيئك',
  'measure.intro.lead': 'تُظهر الكاميرا مقدار الأزرق في الضوء الساقط عليك الآن — وما إذا كان كثيرًا على هذه الساعة من اليوم.',
  'measure.intro.start': 'ابدأ القياس',
  'measure.intro.hint': 'سيطلب المتصفح الإذن باستخدام الكاميرا. ويبدأ القياس فور منحه.',
  'measure.intro.privacy': 'تُعالَج صورة الكاميرا في هذا الجهاز ولا تغادره أبدًا. لا نرسل أي إطار ولا نحفظه ولا نشاركه.',

  'measure.live.aria': 'القياس جارٍ',
  'measure.badge.starting': 'جارٍ التشغيل',
  'measure.badge.paused': 'موقوف مؤقتًا',
  'measure.badge.running': 'القياس جارٍ',
  'measure.stale': 'في انتظار الصورة — تتجمّد المعاينة عندما يكون التطبيق في الخلفية.',
  'measure.crop': 'نقيس وسط الإطار — أي {percent}% المحدَّدة من عرض الصورة وارتفاعها.',
  'measure.facing.front': 'الكاميرا الأمامية',
  'measure.facing.back': 'الكاميرا الخلفية',

  'measure.boot.title': 'جارٍ تشغيل الكاميرا…',
  'measure.boot.text': 'إن طلب المتصفح الإذن فامنحه — فبلا صورة لا يوجد ما يُقاس. والإذن يخصّ هذه الصفحة وحدها، ويمكنك سحبه لاحقًا.',
  'measure.boot.cancel': 'إلغاء',

  'measure.hold': 'القراءات مجمّدة. الكاميرا تعمل، لكن لا شيء يصل إلى السجل ولا إلى المتوسطات.',
  'measure.gridHint': 'اختر بطاقة لنقل هذا المؤشر إلى القرص الكبير.',

  'measure.stop': 'إيقاف',
  'measure.pause': 'إيقاف مؤقت',
  'measure.resume': 'استئناف',
  'measure.flip.aria': 'تبديل الكاميرا',
  'measure.flip.toBack': 'التبديل إلى الكاميرا الخلفية',
  'measure.flip.toFront': 'التبديل إلى الكاميرا الأمامية',

  'measure.fail.aria': 'خطأ في الكاميرا',
  'measure.fail.headline': 'لم تبدأ الكاميرا',
  'measure.fail.retry': 'حاول مرة أخرى',
  'measure.fail.back': 'رجوع',
  'measure.fail.savedSession': 'حُفظت في السجل الجلسة السابقة للانقطاع ({duration}).',
  'measure.error.fallback': 'تعذّر تشغيل الكاميرا.',

  'measure.summary.aria': 'ملخّص الجلسة',
  'measure.summary.title': 'ملخّص الجلسة',
  'measure.summary.paused': 'إيقاف مؤقت {duration}',
  'measure.summary.nothingMeasured': 'لم يجمع أي مؤشر قراءة — لم ترَ الكاميرا ضوءًا طوال الجلسة.',
  'measure.summary.note': 'تحسب المتوسطات العيّنات المأخوذة خارج الإيقاف المؤقت فقط. والمؤشرات التي لم تُقَس تُستبعد ولا تُحسب أصفارًا.',
  'measure.summary.nearThreshold': 'الأقرب إلى العتبة',
  'measure.summary.worstPoint': 'أضعف نقطة',
  'measure.summary.averageZone': '{zone} في المتوسط',
  'measure.summary.tooShort': 'استمرّت الجلسة {duration} — أقصر من أن تدخل السجل وحدها. ويمكنك حفظها يدويًا.',
  'measure.summary.again': 'قِس مرة أخرى',
  'measure.summary.save': 'حفظ في السجل',
  'measure.summary.saved': 'حُفظت في السجل',
  'measure.summary.savedToast': 'حُفظت الجلسة في السجل.',
  'measure.summary.close': 'إغلاق',

  'measure.method.title': 'كيف نقيس هذا',
  'measure.method.p1': 'يأخذ التطبيق عيّنة من صورة الكاميرا عشر مرات في الثانية ويحسب المؤشرات من {percent}% الوسطى من الإطار — ومربّع التحديد في المعاينة يعلّم هذه المساحة بالضبط.',
  'measure.method.p2': 'لكاميرا الهاتف ثلاث قنوات عريضة، ولها تعريض وتوازن أبيض تلقائيان خاصان بها. فهي ترى نسب الضوء لا طيفه.',
  'measure.method.p3': 'نسبة الأزرق والسطوع والوميض والانتظام هي ما تقيسه الكاميرا فعلًا. أما درجة حرارة اللون والأثر على الإيقاع اليومي فتقريبان معلنان محسوبان من ألوان sRGB الأساسية.',
  'measure.method.p4': 'لا يظهر الوميض إلا دون أربعة هرتز. ووميض شبكة الكهرباء عند 100 Hz يقع بعيدًا خارج مدى هذا التردّد ولن يُعرَض أبدًا كقراءة.',
  'measure.method.p5': 'لا شيء من هذه الأرقام قياس ضوئي ولا نتيجة طبية. وصورة الكاميرا لا تغادر الجهاز.',
  'measure.method.ok': 'فهمت',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'أُلغي تشغيل الكاميرا.',
  'measure.announce.stoppedNoSamples': 'توقّف القياس. لم تُجمع أي عيّنة.',
  'measure.announce.stopped': 'توقّف القياس. ملخّص الجلسة جاهز.',
  'measure.announce.interrupted': 'انقطع القياس. ملخّص الجلسة جاهز.',
  'measure.announce.paused': 'أُوقف القياس مؤقتًا. القراءات مجمّدة.',
  'measure.announce.resumed': 'استُؤنف القياس.',
  'measure.announce.switchedFront': 'تم التبديل إلى الكاميرا الأمامية. تبدأ جلسة جديدة.',
  'measure.announce.switchedBack': 'تم التبديل إلى الكاميرا الخلفية. تبدأ جلسة جديدة.',
  'measure.announce.lead': 'المؤشر الرئيسي: {metric}.',
  'measure.announce.cameraError': 'خطأ في الكاميرا. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'بقي الضوء في النطاق الآمن طوال الجلسة — اترك ضبط المصباح كما هو وتحقّق منه بعد حلول الظلام، حين يعمل مصدر آخر.',
  'measure.advice.share.evening': 'بلغ متوسط نسبة الأزرق {value} — فعّل الوضع الليلي في الشاشات وأطفئ الإضاءة العلوية، وأبقِ مصباحًا دافئًا واحدًا على ارتفاع المكتب.',
  'measure.advice.share.day': 'بلغ متوسط نسبة الأزرق {value} — وهذا مقبول في النهار، لكن اضبط الشاشة لتنتقل تلقائيًا إلى الوضع الدافئ قبل النوم بساعتين.',
  'measure.advice.brightness': 'كان الإطار مفرط التعريض (بمتوسط {value}) — ابتعد عن مصدر الضوء أو اخفض سطوع الشاشة التي تقيسها، فعند هذا التعريض تفقد بقية المؤشرات دقتها أيضًا.',
  'measure.advice.kelvin.evening': 'ثبتت درجة حرارة اللون عند {value} في المتوسط — بعد حلول الظلام انزل دون 3000 K: حوّل المصباح إلى الوضع الدافئ أو ركّب مصباحًا بـ 2700 K.',
  'measure.advice.kelvin.day': 'ثبتت درجة حرارة اللون عند {value} في المتوسط — وهذا بياض جيد ومنشّط في النهار، لكن اضبط المصباح نفسه على 2700 K في المساء.',
  'measure.advice.melanopic.evening': 'بلغ متوسط الأثر على الإيقاع اليومي {value} — في الساعتين السابقتين للنوم انزل دون 0.50 ×، بخفض الضوء الرئيسي والإضاءة من ارتفاع المكتب بدل السقف.',
  'measure.advice.melanopic.day': 'بلغ متوسط الأثر على الإيقاع اليومي {value} — في هذه الساعة تفيد هذه الجرعة، لكن استبدل بهذا المصدر في المساء مصدرًا أضعف وأدفأ.',
  'measure.advice.flicker': 'بلغ الوميض {value} في المتوسط — وسببه عادةً مخفّت إضاءة أو إضاءة خلفية مخفوضة: ارفع سطوع الشاشة فوق 40% أو استبدل بالمخفّت مخفّتًا لا يستخدم PWM.',
  'measure.advice.uniformity': 'سقط الضوء بغير انتظام (بمتوسط {value}) — ضع المصباح إلى جانب سطح المكتب وأضف مصدرًا ثانيًا أضعف من الجهة المقابلة، بدل نقطة واحدة قوية.',
  'measure.advice.comfort': 'جاءت الراحة البصرية عند {value} في المتوسط — ابدأ بتغيير واحد: اخفض الضوء الرئيسي إلى النصف، ثم عالج لون الضوء بعد ذلك.',
  'measure.advice.default': 'غيّر شيئًا واحدًا في إضاءتك ثم قِسها من جديد — فمقارنة جلستين تقول أكثر من قراءة واحدة.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'السجل',
  'history.action.export': 'تصدير السجل',

  'history.metricGroup.aria': 'اختيار المؤشر',
  'history.announce.metric': 'المؤشر: {metric}',
  'history.rangeGroup.aria': 'المدى الزمني',
  'history.range.aria': 'آخر {range}',

  'history.stats.title': 'إحصاءات المدى',
  'history.stats.head': '{metric}\u00A0—\u00A0آخر {range}',
  'history.stats.note': 'محسوبة مما يظهر في الرسم البياني. والوقت بلا قياس لا يُحتسب — ولا نضع صفرًا مكانه.',
  'history.stat.min': 'الأدنى',
  'history.stat.avg': 'المتوسط',
  'history.stat.max': 'الأعلى',
  'history.trend.up': 'يرتفع في هذا المدى',
  'history.trend.flat': 'بلا تغيّر واضح',
  'history.trend.down': 'ينخفض في هذا المدى',
  'history.trend.none': 'لا بيانات للمقارنة',

  'history.sessions.title': 'جلسات القياس',
  'history.sessions.count': '{sessions}، من الأحدث',
  'history.sessions.empty': 'لا جلسات بعد',
  'history.sessions.hint': 'تُحفظ الجلسة بعد إيقاف القياس.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'المدى: {range}',
  'history.session.noMeasure': 'بلا قياس',

  'history.data.title': 'البيانات',
  'history.data.subtitle': 'السجل محفوظ على هذا الجهاز وحده.',
  'history.export.csv': 'تصدير CSV',
  'history.export.json': 'تصدير JSON',
  'history.export.ok': 'الملف جاهز للحفظ',
  'history.export.fail': 'تعذّر تجهيز الملف. ففي الوضع الخاص وفي نافذة مضمّنة داخل تطبيق آخر يمنع المتصفح الحفظ — افتح الصفحة في علامة تبويب عادية.',
  'history.export.sheet.title': 'تصدير السجل',
  'history.export.sheet.text': 'يفتح CSV في برنامج الجداول (الفاصل فاصلة منقوطة، والعلامة العشرية فاصلة). ويحفظ JSON كل شيء، بما في ذلك قائمة الجلسات وفجوات انعدام القياس.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'مسح السجل',
  'history.clear.title': 'هل تريد مسح السجل؟',
  'history.clear.text': 'سنحذف {points} و{sessions}. ولا يمكن التراجع عن ذلك — إن أردت الاحتفاظ بالبيانات فصدّرها أولًا.',
  'history.clear.confirm': 'مسح',
  'history.clear.announce': 'مُسح السجل.',
  'history.clear.toast': 'مُسح السجل',

  'history.empty.title': 'لا شيء لعرضه بعد',
  'history.empty.text': 'يمتلئ السجل أثناء القياس — نقطة في الثانية. وكل شيء يبقى على هذا الجهاز.',
  'history.empty.action': 'انتقل إلى القياس',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. Napisy
     są stałe, więc liczebnik odmienia się tu poprawnie ręcznie: „5 دقائق”
     (3–10) obok „24 ساعة” i „30 يومًا” (11–99). */
  'range.1m': '1 دقيقة',
  'range.5m': '5 دقائق',
  'range.1h': '1 ساعة',
  'range.24h': '24 ساعة',
  'range.7d': '7 أيام',
  'range.30d': '30 يومًا',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'التاريخ والوقت',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'ذاكرة الجهاز ممتلئة — لم تعد القياسات الجديدة تُحفظ.',
  'storage.blocked': 'لا يسمح المتصفح بحفظ السجل — ستختفي البيانات بعد إغلاق علامة التبويب.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'الأدوات',
  'tools.action.about': 'عن القياس',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'اللغة',
  'tools.language.subtitle': 'يتبع التطبيق افتراضيًا لغة الجهاز؛ والاختيار من هذه القائمة يسري فورًا ويبقى في هذا المتصفح.',
  'tools.language.aria': 'لغة الواجهة',
  'tools.language.system': 'تلقائي',
  'tools.language.announce': 'لغة الواجهة: {language}.',

  'tools.appearance.title': 'المظهر',
  'tools.appearance.theme.title': 'السمة',
  'tools.appearance.theme.desc': '«تلقائي» يتبع إعداد النظام.',
  'tools.appearance.theme.aria': 'السمة',
  'tools.theme.system': 'تلقائي',
  'tools.theme.light': 'فاتحة',
  'tools.theme.dark': 'داكنة',
  'tools.appearance.accent.title': 'لون التمييز',
  'tools.appearance.accent.desc': 'لون الأزرار والتحديدات وأشرطة التمرير.',
  'tools.appearance.accent.aria': 'لون التمييز',
  'tools.appearance.textScale.title': 'حجم النص',
  'tools.appearance.textScale.desc': 'يكبّر الواجهة كلها، لا الشروح وحدها.',
  'tools.appearance.textScale.aria': 'حجم النص',
  'tools.appearance.density.title': 'الكثافة',
  'tools.appearance.density.desc': 'المتراصّة تعرض محتوى أكثر في الشاشة الواحدة.',
  'tools.appearance.density.aria': 'كثافة التخطيط',
  'tools.density.comfortable': 'عادية',
  'tools.density.compact': 'متراصّة',
  'tools.appearance.motion.title': 'حركة أقل',
  'tools.appearance.motion.desc': 'يوقف الحركات وانسياب عقرب المؤشر. ونحترم إعداد النظام في كل الأحوال.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'محيط',
  'accent.violet': 'بنفسجي',
  'accent.amber': 'كهرماني',
  'accent.mint': 'نعناعي',
  'accent.rose': 'وردي',

  'tools.thresholds.title': 'العتبات',
  'tools.thresholds.subtitle': 'القيمة التي يبدأ التطبيق عندها بقول «معتدل»، والقيمة التي يقول عندها «ضار». والعتبات الافتراضية اقتراح منّا لا معيار — اضبطها على ما يناسبك.',
  'tools.thresholds.warn': 'عتبة التحذير',
  'tools.thresholds.crit': 'عتبة الإنذار',
  'tools.thresholds.warn.aria': 'عتبة التحذير — {metric}',
  'tools.thresholds.crit.aria': 'عتبة الإنذار — {metric}',
  'tools.thresholds.reset': 'الافتراضية',
  'tools.thresholds.reset.aria': 'استعادة العتبات الافتراضية: {metric}',
  'tools.thresholds.moved': 'نُقلت {threshold} إلى {value}.',
  'tools.thresholds.resetAll': 'استعادة كل العتبات',
  'tools.thresholds.resetAll.title': 'هل تريد استعادة العتبات الافتراضية؟',
  'tools.thresholds.resetAll.text': 'ستعود المؤشرات السبعة كلها إلى العتبات التي يقترحها التطبيق. ويبقى سجل القياسات دون مساس.',
  'tools.thresholds.resetAll.confirm': 'استعادة',
  'tools.thresholds.resetAll.cancel': 'الإبقاء عليها',
  'tools.thresholds.resetAll.toast': 'عادت العتبات إلى الافتراضية',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'فوق {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} فما دون',
  'tools.zoneRange.goodBelow': 'دون {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} فما فوق',

  'tools.calibration.title': 'المعايرة',
  'tools.calibration.subtitle': 'لمن لديه ما يقارن به.',
  'tools.calibration.intro': 'هاتفان موجَّهان إلى المصباح نفسه سيُظهران أرقامًا مختلفة قليلًا — فلكل مستشعر لونه الخاص. وإن كان بين يديك قياس تثق به، فيمكنك هنا رفع قنوات الصورة أو خفضها قليلًا. وتعمل المعاملات قبل أن نحسب أي شيء، فهي تغيّر المؤشرات السبعة دفعة واحدة.',
  'tools.calibration.neutral': 'ليس لديك ما تقارن به؟ اترك القيمة 1.00 — فهي ضبط المصنع ولا تفسد شيئًا.',
  'tools.calibration.forward': 'يسري التغيير من الآن. والقياسات المحفوظة في السجل تبقى كما كانت لحظة الحفظ — لا نعيد حسابها، لأن ذلك يبدّل البيانات بعد وقوعها.',
  'tools.calibration.reset': 'تصفير المعايرة',
  'tools.calibration.reset.toast': 'صُفّرت المعايرة',
  'tools.calibration.channel.r': 'القناة الحمراء',
  'tools.calibration.channel.g': 'القناة الخضراء',
  'tools.calibration.channel.b': 'القناة الزرقاء',
  'tools.calibration.channel.aria': '{channel} — معامل المعايرة',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'القياس',
  'tools.measurement.wake.title': 'إبقاء الشاشة مضاءة',
  'tools.measurement.wake.desc': 'تبقى الشاشة مضاءة أثناء القياس. وتنفد البطارية أسرع حينها.',
  'tools.measurement.wake.unsupported': 'لا يسمح هذا المتصفح بمنع إطفاء الشاشة.',
  'tools.measurement.haptics.title': 'الاهتزاز',
  'tools.measurement.haptics.desc': 'تأكيد قصير عند البدء والإيقاف وتغيير المؤشر.',
  'tools.measurement.haptics.unsupported': 'لا يبلّغ هذا الجهاز عن وجود محرّك اهتزاز.',

  'tools.about.title': 'عن القياس',
  'tools.about.subtitle': 'ما الذي يحسبه كل مؤشر من المؤشرات السبعة بالضبط، وأين تنتهي مصداقية هذه الطريقة.',
  'tools.about.scale': 'المقياس: من {min} إلى {max}.',
  'tools.about.threshold': 'نحذّر ابتداءً من {warn}، وننذر ابتداءً من {crit}.',
  'tools.about.thresholdInvert': 'نحذّر دون {warn}، وننذر دون {crit}.',
  'tools.about.limitsHead': 'ما لا يستطيعه هذا القياس',
  'tools.about.limit.spectrum.title': 'الكاميرا لا ترى الألوان كما يراها جهاز القياس',
  'tools.about.limit.spectrum.text': 'لكاميرا الهاتف ثلاث قنوات: حمراء وخضراء وزرقاء. أما جهاز قياس الضوء فيفصلها إلى عشرات النطاقات الضيقة. وما تراه هنا مشتقّ من هذه الأرقام الثلاثة — بطريقة معقولة، لكنه يبقى حسابًا لا طيفًا مقيسًا.',
  'tools.about.limit.exposure.title': 'الكاميرا تضبط سطوعها بنفسها',
  'tools.about.limit.exposure.text': 'إذا وجّهت الهاتف نحو النافذة أعتمت الكاميرا الصورة كي لا تفرط في تعريضها. فينخفض حينها «سطوع المشهد» رغم أن شيئًا في الغرفة لم يتغيّر. لذلك قارن هذه القيمة داخل اللقطة الواحدة، لا بين الغرف.',
  'tools.about.limit.flicker.title': 'الكاميرا البطيئة لن تلتقط الوميض السريع',
  'tools.about.limit.flicker.text': 'نفحص الصورة {hz} مرة في الثانية. والنبض الأسرع من {nyquist} مرة في الثانية قد يظهر في مثل هذا القياس أبطأ مما هو عليه حقًا، أو يختفي تمامًا — ووميض شبكة الكهرباء بهذه السرعة تحديدًا. فإن التقط التطبيق شيئًا فاعتبره إشارة إلى أن «هنا شيئًا ينبض»، لا ترددًا مقيسًا.',
  'tools.about.limit.medical.title': 'هذا ليس فحصًا طبيًا ولا استشارة طبية',
  'tools.about.limit.medical.text': 'يساعدك التطبيق على ملاحظة أن الضوء من حولك بارد أو ساطع أو مضطرب، ويقترح ما يمكن فعله حيال ذلك. وهو لا يحكم في أمر صحتك ولا يحلّ محلّ الحديث مع طبيب ولا محلّ القياس بجهاز احترافي.',
  'tools.about.privacy': 'كل الحساب يجري على جهازك. وصورة الكاميرا لا تُرسل ولا تُحفظ في أي مكان — ولا يصل إلى الذاكرة سوى الأرقام المحسوبة.',

  'tools.data.title': 'البيانات',
  'tools.data.subtitle': 'كل شيء موجود في ذاكرة هذا المتصفح ولا يخرج من هنا إلى أي مكان.',
  'tools.data.summary.empty': 'لا توجد قياسات محفوظة بعد.',
  'tools.data.summary': 'في الذاكرة: {points} و{sessions}.',
  'tools.data.export.csv': 'تصدير CSV',
  'tools.data.export.json': 'تصدير JSON',
  'tools.data.clear': 'مسح السجل',
  'tools.data.reset': 'الإعدادات الافتراضية',
  'tools.data.reset.title': 'هل تريد استعادة الإعدادات الافتراضية؟',
  'tools.data.reset.text': 'سيعود المظهر والعتبات والمعايرة وإعدادات القياس إلى حالتها الأولى. ويبقى سجل القياسات دون مساس.',
  'tools.data.reset.confirm': 'استعادة',
  'tools.data.reset.toast': 'استُعيدت الإعدادات الافتراضية',
  'tools.data.wipe': 'حذف كل البيانات',
  'tools.data.wipe.title': 'هل تريد حذف كل بيانات التطبيق؟',
  'tools.data.wipe.text': 'سيختفي سجل القياسات كله وقائمة الجلسات، وعتباتك ومعايرتك، وإعدادات المظهر. وسيعود التطبيق إلى حالته عند التشغيل الأول.',
  'tools.data.wipe.note': 'ليست لدينا نسخة من هذه البيانات — فهي لم تغادر هذا الجهاز قط، ولا مكان تُستعاد منه.',
  'tools.data.wipe.check': 'أفهم أنه لا يمكن التراجع عن ذلك',
  'tools.data.wipe.confirm': 'حذف كل شيء',
  'tools.data.wipe.toast': 'حُذفت كل بيانات التطبيق',
  'tools.data.wipe.announce': 'حُذفت كل بيانات التطبيق. وعادت الإعدادات إلى الافتراضية.',
  'tools.data.storage.blocked': 'لا يسمح هذا المتصفح بحفظ أي شيء بشكل دائم (الوضع الخاص، أو بيانات المواقع محظورة). وكل ما تضبطه هنا سيختفي بعد إغلاق علامة التبويب.',
  'tools.data.storage.full': 'امتلأت ذاكرة المتصفح ولم تعد القياسات الجديدة تُحفظ. ومسح السجل سيحرّر مساحة.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'الدعم',
  'support.free.title': 'كل شيء متاح',
  'support.free.lead': 'المؤشرات السبعة كلها، والسجل الكامل، والعتبات، والمعايرة، والتصدير تعمل منذ التشغيل الأول — بلا حساب وبلا حدود وبلا رسوم.',
  'support.free.note': 'يُحسب القياس بالكامل على هذا الجهاز ويعمل بلا شبكة. ولا توجد هنا نسخة أفضل نخبّئها خلف جدار.',
  'support.why.title': 'لماذا أطلب ذلك',
  'support.why.lead': 'يُبنى مراقب الضوء خارج ساعات العمل، بلا إعلانات ولا راعٍ ولا شركة خلفه. والدعم يغطّي وقت الإصلاحات والمؤشرات الجديدة والحفاظ على ما يعمل أصلًا.',
  'support.what.title': 'ماذا يمنحك التبرّع',
  'support.what.lead': 'لا شيء. التبرّع لا يفتح شيئًا — لا ميزة إضافية ولا شارة بجانب الاسم ولا أولوية. فكل ما يستطيعه التطبيق بين يديك الآن.',
  'support.what.note': 'يبقى فقط أنني أعرف أنه نفع أحدًا. وهذا سبب كافٍ حقًا.',
  'support.cta.title': 'إن أردت المساعدة',
  'support.cta.button': 'ادعمني بفنجان قهوة',
  'support.cta.nolink': 'لم يُربط ملف التبرّعات بعد. وحين يظهر، سيقف في هذا المكان زر.',
  'support.cta.privacy': 'يفتح هذا الرابط صفحة Buy Me a Coffee الخارجية في علامة تبويب جديدة. وهذه هي اللحظة الوحيدة التي يغادر فيها شيء هذا الجهاز — أما القياس نفسه فيبقى هنا دائمًا.',
  'support.cta.privacyFuture': 'حين يتوفّر العنوان، سيفتح الزر صفحة Buy Me a Coffee الخارجية في علامة تبويب جديدة. وستكون تلك هي اللحظة الوحيدة التي يغادر فيها شيء هذا الجهاز — أما القياس نفسه فيبقى هنا دائمًا.',
  'support.cta.note': 'لا يوجد هنا عدّ تنازلي ولا تذكيرات ولا نافذة تفتح من تلقاء نفسها. وهذا الطلب ينتظر في هذه الصفحة وحدها.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'الدقيقة الأخيرة',
  'gauge.aria': '{metric}: {value}، المنطقة: {zone}',
  'gauge.aria.note': '{metric}: {value}، المنطقة: {zone}، {note}',
  'gauge.aria.initial': '{metric}: لا بيانات',
  'gauge.value.none': 'لا بيانات',
  /* Odczyt słowny z jednostką: „27 بالمئة”, „1.20 مرة”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'قيمة تقريبية',
  'gauge.note.offScale': 'خارج المقياس',
  'gauge.metric.unknown': 'مؤشر غير معروف',

  'chart.aria.label': 'رسم بياني لسجل القياسات',
  'chart.hint': 'رسم بياني تفاعلي. السهمان الأيمن والأيسر ينقلان مؤشر القراءة، وHome وEnd ينتقلان إلى بداية المدى ونهايته، وEscape يخفي المؤشر.',
  'chart.empty.title': 'لا بيانات',
  'chart.empty.text': 'ابدأ القياس — يظهر الرسم البياني بعد القراءات الأولى.',
  'chart.few.title': 'البيانات غير كافية',
  'chart.few.text': 'لدينا قراءة واحدة: {value}. والخط يحتاج إلى قراءتين.',
  'chart.legend.line': 'قياس',
  'chart.legend.gap': 'فجوة في القياس',
  'chart.aria.head': 'الرسم البياني: {metric}، المدى {range}',
  'chart.aria.empty': 'لا بيانات في هذا المدى.',
  'chart.aria.one': 'قراءة واحدة: {value}.',
  'chart.aria.summary': 'من {min} إلى {max}، المتوسط {avg}، {points}.',
  'chart.aria.gaps': 'في السلسلة فجوات — لم نكن نقيس حينها.',
  'chart.readout.empty': 'لا بيانات في هذا المدى.',
  'chart.readout.point': '{metric}: {value}، {time}',
  'chart.readout.pointZone': '{metric}: {value}، {zone}، {time}',
  'chart.readout.few': 'البيانات لا تكفي لرسم المنحنى.',
  'chart.readout.hint': 'اسحب على الرسم البياني أو استخدم الأسهم لقراءة قياس واحد.',
  'chart.time.now': 'الآن',
  'chart.time.justNow': 'قبل قليل',
  'chart.time.ago': 'قبل {duration}',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd zegar dwunastogodzinny z „ص”, bo tak
     arabskie ustawienia regionalne formatują godzinę, i najdłuższy skrót
     miesiąca (سبتمبر). */
  'chart.sample.ago': '\u221230\u00A0د',
  'chart.sample.clock': '12:00 ص',
  'chart.sample.date': '30\u00A0سبتمبر',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'نسبة الأزرق',
  'metric.share.short': 'كم من الضوء الذي نراه يقع على القناة الزرقاء.',
  'metric.share.help': 'تفصل اللون عن السطوع — وهذه هي القيمة التي تتحرّك حين تشغّل الوضع الليلي.',
  'metric.brightness.name': 'سطوع المشهد',
  'metric.brightness.short': 'متوسط سطوع صورة الكاميرا.',
  'metric.brightness.help': 'قيمة نسبية لا لوكس — فالتعريض التلقائي للكاميرا يزيحها من تحت.',
  'metric.kelvin.name': 'درجة حرارة اللون',
  'metric.kelvin.short': 'هل الضوء دافئ أم بارد.',
  'metric.kelvin.help': 'دون 3000 K يكون الضوء دافئًا وألطف في المساء. و6500 K هو البياض الافتراضي لأغلب الشاشات.',
  'metric.melanopic.name': 'الأثر على الإيقاع اليومي',
  'metric.melanopic.short': 'مدى قوة تأثير هذا الضوء في الساعة البيولوجية.',
  'metric.melanopic.help': 'تقريب للنسبة الميلانوبية. القيمة 1.00 بياض نهاري محايد؛ ويحسن النزول دون 0.50 في المساء.',
  'metric.flicker.name': 'الوميض',
  'metric.flicker.short': 'نبض غير مرئي في مصدر الضوء.',
  'metric.flicker.help': 'مخفّتات الإضاءة والإضاءات الخلفية الرخيصة تنبض. لا تراه العين، لكنه سبب معروف للإرهاق والصداع.',
  'metric.uniformity.name': 'الانتظام',
  'metric.uniformity.short': 'هل يتوزّع الضوء بانتظام في الإطار.',
  'metric.uniformity.help': 'القيمة المنخفضة على الشاشة تعني تسرّب الإضاءة الخلفية أو انعكاسًا؛ وعلى المكتب — مصباحًا سيّئ الوضع.',
  'metric.comfort.name': 'الراحة البصرية',
  'metric.comfort.short': 'تقييم واحد بدل ستة أرقام.',
  'metric.comfort.help': 'يجمع بقية القياسات في نتيجة من 0 إلى 100 ويبيّن ما يخفضها أكثر. والأوزان تقديرنا التحريري لا معيار.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'آمن',
  'zone.warn': 'معتدل',
  'zone.crit': 'ضار',
  'zone.none': 'لا بيانات',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 أغسطس'). Arabski nie skraca nazw
     miesięcy — ICU podaje dla 'ar' te same formy w wersji krótkiej i pełnej. */
  'date.month.short.1': 'يناير',
  'date.month.short.2': 'فبراير',
  'date.month.short.3': 'مارس',
  'date.month.short.4': 'أبريل',
  'date.month.short.5': 'مايو',
  'date.month.short.6': 'يونيو',
  'date.month.short.7': 'يوليو',
  'date.month.short.8': 'أغسطس',
  'date.month.short.9': 'سبتمبر',
  'date.month.short.10': 'أكتوبر',
  'date.month.short.11': 'نوفمبر',
  'date.month.short.12': 'ديسمبر',

  'date.clock': '{hours}:{minutes}',
  /* Kolejność wstawek jak w polskim: arabski skrót daty to „30 أغسطس”. */
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0{year}',
  'date.dateTime': '{date}، {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. Jednostki idą skrótem (س، د، ث),
     bo pełne słowo wymagałoby odmiany liczebnika, a liczba jest tu zmienna:
     „3 ساعات”, ale „24 ساعة”. Skrót jest niezmienny i zawsze poprawny. */
  'time.duration.dayHour': '{days} {hours}\u00A0س',
  'time.duration.hourMinute': '{hours}\u00A0س {minutes}\u00A0د',
  'time.duration.hour': '{hours}\u00A0س',
  'time.duration.minuteSecond': '{minutes}\u00A0د {seconds}\u00A0ث',
  'time.duration.minute': '{minutes}\u00A0د',
  'time.duration.second': '{seconds}\u00A0ث',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „قبل قليل”. Klucz
     'time.daysAgo' dostaje tylko wartości 2–6, dlatego stoi w nim forma mnoga
     أيام — właściwa dla 3–10. */
  'time.justNow': 'قبل قليل',
  'time.aMinuteAgo': 'قبل دقيقة',
  'time.minutesAgo': 'قبل {minutes}\u00A0د',
  'time.hoursAgo': 'قبل {hours}\u00A0س',
  'time.yesterday': 'أمس',
  'time.daysAgo': 'قبل {days}\u00A0أيام',

  /* Formy zależne od liczby. Arabski ma w CLDR sześć: `zero` (0), `one` (1),
     `two` (2), `few` (reszta z dzielenia przez 100 w zakresie 3–10), `many`
     (11–99) i `other` (100, 101… oraz ułamki). Silnik skleja „liczba + spacja
     + forma”, więc formy są samymi rzeczownikami w odmianie wymaganej po
     liczebniku: liczba mnoga po 3–10 (عينات), biernik z tanwinem po 11–99
     (عينةً), a dopełniacz liczby pojedynczej przy 0, 1 i 100 (عينة). Dla „2”
     stoi liczba podwójna (عينتان). */
  'time.days.plural': { zero: 'يوم', one: 'يوم', two: 'يومان', few: 'أيام', many: 'يومًا', other: 'يوم' },
  'unit.sample.plural': { zero: 'عيّنة', one: 'عيّنة', two: 'عيّنتان', few: 'عيّنات', many: 'عيّنةً', other: 'عيّنة' },
  'unit.measurement.plural': { zero: 'قياس', one: 'قياس', two: 'قياسان', few: 'قياسات', many: 'قياسًا', other: 'قياس' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Arabski różni je tylko w liczbie podwójnej: mianownik جلستان, biernik
     جلستين — i po to te dwa klucze tutaj zostają. */
  'unit.session.plural': { zero: 'جلسة', one: 'جلسة', two: 'جلستان', few: 'جلسات', many: 'جلسةً', other: 'جلسة' },
  'unit.session.accusative.plural': { zero: 'جلسة', one: 'جلسة', two: 'جلستين', few: 'جلسات', many: 'جلسةً', other: 'جلسة' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy, choć po arabsku brzmią tak samo — jak po polsku i po angielsku. */
  'unit.chartPoint.plural': { zero: 'نقطة', one: 'نقطة', two: 'نقطتان', few: 'نقاط', many: 'نقطةً', other: 'نقطة' },
  'unit.point.plural': { zero: 'نقطة', one: 'نقطة', two: 'نقطتان', few: 'نقاط', many: 'نقطةً', other: 'نقطة' },
  /* Kelwin jest nazwą jednostki i po arabsku się nie odmienia — wszystkie
     sześć form jest tu celowo takich samych. */
  'unit.kelvin.plural': { zero: 'كلفن', one: 'كلفن', two: 'كلفن', few: 'كلفن', many: 'كلفن', other: 'كلفن' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „بالمئة”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'بالمئة',
  'unit.spoken.times': 'مرة',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'لم يُمنح الإذن باستخدام الكاميرا. اسمح بالكاميرا لهذه الصفحة في إعدادات المتصفح وحاول مرة أخرى.',
  'camera.error.notfound': 'لم يُعثر على كاميرا. تحقّق من أن الجهاز فيه كاميرا وأنها ليست معطّلة في النظام.',
  'camera.error.inuse': 'الكاميرا مشغولة بتطبيق آخر. أغلق ذلك التطبيق أو علامة التبويب وحاول مرة أخرى.',
  'camera.error.insecure': 'لا تعمل الكاميرا إلا عبر HTTPS أو على localhost. افتح هذه الصفحة على عنوان يبدأ بـ «https://».',
  'camera.error.unsupported': 'لا يتيح هذا المتصفح الكاميرا هنا. جرّب Chrome أو Safari، في نافذة عادية — لا في معاينة مضمّنة داخل تطبيق آخر.',
  'camera.error.unknown': 'تعذّر تشغيل الكاميرا.'
};
