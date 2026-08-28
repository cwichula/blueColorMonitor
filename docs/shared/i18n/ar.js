/* docs/shared/i18n/ar.js — słownik WSPÓLNY, arabski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest arabski.
 *
 * PISMO OD PRAWEJ DO LEWEJ: w napisach NIE MA znaków sterujących kierunkiem
 * (U+200E, U+200F, U+202A…U+202E). Kierunkiem zarządza atrybut dir na
 * dokumencie; wstawianie ich do słownika psułoby wyszukiwanie i porównania.
 * Symbole jednostek (%, K, ×, Hz) i identyfikatory (sRGB, HTTPS) zostają
 * łacińskie — algorytm dwukierunkowy ustawia je sam.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — ani jednego
 * klucza mniej, ani jednego więcej (patrz docs/shared/README.md, rozdział
 * „Warstwa językowa”, i sprawdzian docs/shared/i18n/keys.test.js).
 *
 * LICZEBNIKI: arabski ma SZEŚĆ kategorii CLDR — zero, one, two, few, many,
 * other. Formę wybiera Intl.PluralRules('ar'), nie nasza reguła. W formach
 * one i two liczby się nie pisze („قراءة واحدة”, „قراءتان”), bo tak brzmi to
 * po arabsku; wstawka {n} stoi w pozostałych czterech formach.
 *
 * TERMINOLOGIA (jeden odpowiednik na pojęcie w całym pliku):
 *   temperatura barwowa       → درجة حرارة اللون
 *   wpływ na rytm dobowy      → التأثير على الإيقاع اليومي
 *   współczynnik melanopiczny → المعامل الميلانوبي
 *   migotanie                 → الوميض
 *   równomierność             → الانتظام
 *   komfort wzrokowy          → الراحة البصرية
 */
window.I18nData = window.I18nData || {};
window.I18nData['ar'] = Object.assign(window.I18nData['ar'] || {}, {

  /* Nazwa własna — nie tłumaczy się jej, ale wchodzi jako wstawka w zdanie
     o rozporządzeniu (UE) 2017/745, gdzie stoi jako podmiot. */
  'app.name': 'مراقب الضوء',

  /* ---- wybór języka ---- */

  'language.label': 'اللغة',
  'language.help': 'لغة التطبيق بأكمله. جميع اللغات موجودة بالفعل على هذا الجهاز — لا يجري تنزيل أي شيء ولا إرسال أي شيء إلى أي مكان.',
  'language.auto': 'حسب إعدادات الجهاز',
  'language.autoHint': 'يتبع اللغة المضبوطة في الهاتف أو في المتصفح.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'نسبة الأزرق',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'بالمئة',
  'metric.share.short': 'كم من الضوء المرئي يقع في القناة الزرقاء.',
  'metric.share.help': 'تفصل اللون عن السطوع — وهذه هي القيمة التي تتغير عند تشغيل الوضع الليلي.',

  'metric.brightness.name': 'سطوع المشهد',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'بالمئة',
  'metric.brightness.short': 'متوسط سطوع الصورة الواردة من الكاميرا.',
  'metric.brightness.help': 'قيمة نسبية لا تُقاس باللوكس — فضبط التعريض التلقائي في الكاميرا يزيحها من تحتها.',

  'metric.kelvin.name': 'درجة حرارة اللون',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'كلفن',
  'metric.kelvin.short': 'هل الضوء دافئ أم بارد.',
  'metric.kelvin.help': 'دون 3000 K يكون الضوء دافئًا وألطف في المساء. و6500 K هو الأبيض الافتراضي لمعظم الشاشات.',

  'metric.melanopic.name': 'التأثير على الإيقاع اليومي',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'ضعف',
  'metric.melanopic.short': 'مدى قوة تأثير هذا الضوء في الساعة البيولوجية.',
  'metric.melanopic.help': 'تقدير تقريبي للمعامل الميلانوبي. القيمة 1.00 هي بياض النهار المحايد؛ ويُستحسن في المساء النزول دون 0.50.',

  'metric.flicker.name': 'الوميض',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'بالمئة',
  'metric.flicker.short': 'نبض غير مرئي في مصدر الضوء.',
  'metric.flicker.help': 'أجهزة التعتيم والإضاءة الخلفية الرخيصة تنبض. والعين لا ترى ذلك، لكنه سبب معروف للإرهاق ولصداع الرأس.',

  'metric.uniformity.name': 'الانتظام',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'بالمئة',
  'metric.uniformity.short': 'هل يتوزع الضوء بالتساوي في الإطار.',
  'metric.uniformity.help': 'القيمة المنخفضة على الشاشة تعني تسرّب الإضاءة الخلفية أو انعكاسًا؛ وعلى المكتب تعني مصباحًا موضوعًا في مكان سيئ.',

  'metric.comfort.name': 'الراحة البصرية',
  'metric.comfort.unit': 'نقطة',
  'metric.comfort.unitSpoken': 'نقطة',
  'metric.comfort.short': 'تقييم واحد بدل ستة أرقام.',
  'metric.comfort.help': 'يجمع القياسات الأخرى في نتيجة من 0 إلى 100 ويبيّن ما يخفضها أكثر من غيره. والأوزان اجتهاد تحريري منّا، وليست معيارًا.',

  'comfort.penalty.melanopic': 'التأثير على الإيقاع اليومي',
  'comfort.penalty.kelvin': 'لون ضوء بارد',
  'comfort.penalty.flicker': 'الوميض',
  'comfort.penalty.uniformity': 'إضاءة غير منتظمة',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': 'اضغط “ابدأ” لتشغيل الكاميرا.',
  'engine.starting': 'جارٍ تشغيل الكاميرا…',

  'engine.error.permission': 'لا يوجد إذن باستخدام الكاميرا. اسمح باستخدام الكاميرا في إعدادات المتصفح واضغط “ابدأ” مرة أخرى.',
  'engine.error.notFound': 'لم يُعثر على كاميرا. تحقق من أن الجهاز فيه كاميرا وأنها ليست معطلة في النظام.',
  'engine.error.busy': 'الكاميرا مشغولة بتطبيق آخر. أغلقه ثم حاول مرة أخرى.',
  'engine.error.unknown': 'تعذّر تشغيل الكاميرا.',
  'engine.error.unsupported': 'هذا المتصفح لا يمنح هذه الصفحة إذن الوصول إلى الكاميرا. افتح التطبيق عبر HTTPS أو استخدم متصفحًا آخر.',

  /* ---- strefy ---- */

  'zone.good': 'ضمن النطاق',
  'zone.warning': 'تنبيه',
  'zone.critical': 'حرج',
  'zone.none': 'لا توجد بيانات',
  'zone.settling': 'جارٍ الاستقرار',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania, więc bez kropki.
     Arabskie pismo nie zna wielkich liter, więc od plakietki różni ją tylko to. */
  'zone.spoken.good': 'ضمن النطاق',
  'zone.spoken.warning': 'تنبيه',
  'zone.spoken.critical': 'حرج',
  'zone.spoken.none': 'لا توجد بيانات',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'نقطة',
  'unit.hertz': 'Hz',
  'unit.second': 'ث',
  'unit.minute': 'د',
  'unit.hour': 'س',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'هذا الضوء لا بأس به — لا شيء يتجاوز العتبات التي ضبطتها.',
  'verdict.noValue': 'لا يمكن قياس هذه الكمية الآن. تحقق من أن شيئًا لا يغطي العدسة.',
  'verdict.warmup': 'جارٍ تحديد التقييم — أبقِ الهاتف ثابتًا لحظة أخرى.',

  'verdict.warning.share': 'قدر لا بأس به من هذا الضوء يقع في القناة الزرقاء. ويُستحسن في المساء خفض شدته.',
  'verdict.warning.brightness': 'المشهد ساطع — الكاميرا تعمل قرب الحد الأعلى لنطاق قياسها.',
  'verdict.warning.kelvin': 'الضوء بارد إلى حدٍّ ما. وفي المساء يكون مصباح بنحو 2700 K ألطف.',
  'verdict.warning.melanopic': 'هذا الضوء يؤثر بقوة لا بأس بها في الساعة البيولوجية.',
  'verdict.warning.flicker': 'مصدر الضوء ينبض بوضوح.',
  'verdict.warning.uniformity': 'الضوء يتوزع بغير انتظام في الإطار.',
  'verdict.warning.comfort': 'الراحة البصرية منخفضة — اجتمعت على ذلك عدة أمور معًا.',

  'verdict.critical.share': 'كمية كبيرة جدًا من الأزرق. في المساء شغّل الوضع الليلي أو غيّر مصدر الضوء.',
  'verdict.critical.brightness': 'المشهد ساطع جدًا. لا تقِس بتوجيه الكاميرا مباشرة إلى مصدر الضوء.',
  'verdict.critical.kelvin': 'الضوء بارد. وفي المساء يكون هذا أكثر ما يُتعب العينين — مصباح أدفأ أو الوضع الليلي يساعد.',
  'verdict.critical.melanopic': 'هذا الضوء يؤثر بقوة في الساعة البيولوجية. ويُستحسن في المساء النزول دون 0.50.',
  'verdict.critical.flicker': 'مصدر الضوء ينبض بشدة. وهذا سبب معروف لإجهاد العينين ولصداع الرأس.',
  'verdict.critical.uniformity': 'الضوء يتوزع بغير انتظام إلى حد بعيد. تحقق من موضع المصباح أو من الانعكاسات على الشاشة.',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'الراحة البصرية منخفضة. اطّلع على تفصيل التقييم لترى ما الذي يخفضها.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'ما لا يقوله هذا الرقم',
  'note.warningTitle': 'تنبيه',
  'note.dashTitle': 'ما لا يمثّله هذا القياس',
  'note.dashText': 'كاميرا الهاتف لها ثلاث قنوات لونية عريضة وموازنة بيضاء تلقائية — وهي لا تقيس الطيف. ودرجة حرارة اللون والتأثير على الإيقاع اليومي تقديران تقريبيان محسوبان من ألوان sRGB الأساسية. يُظهر التطبيق الفروق والتغيرات عبر الزمن إظهارًا جيدًا، لكنه لا يحل محل جهاز القياس ولا يضع أي تشخيص.',
  'note.approxLegend': '≈ قيمة تقريبية — محسوبة من ألوان sRGB الأساسية، لا من قياس طيفي.',
  'note.kelvinOutOfRange': 'خارج نطاق الطريقة — عند هذا اللون تكفّ معادلة درجة حرارة اللون عن كونها جديرة بالثقة.',
  'note.flickerOutOfRange': 'خارج نطاق الطريقة — أخذ العينات بمعدل {rate} Hz لا يرى من النبض إلا ما كان دون {limit} Hz. ووميض شبكة الكهرباء عند 100 Hz خارج المتناول، ولن يعرضه التطبيق أبدًا كنتيجة.',
  'note.helpTitle': 'ما لا يقوله هذا الرقم',
  'note.helpText': 'كاميرا الهاتف لها ثلاث قنوات عريضة وهي لا تقيس الطيف. وهذه القيمة مؤشر للمقارنة — تُظهر جيدًا الفروق بين مصادر الضوء والتغيرات عبر الزمن، وهي ليست قياسًا مخبريًا ولا معلومة طبية.',
  'note.calibration': 'قياس دون معايرة — تعامل مع القيم على أنها للمقارنة.',

  'note.howToTitle': 'كيف تقيس بطريقة سليمة',
  'note.howTo.hold.title': 'أبقِ الهاتف ثابتًا',
  'note.howTo.hold.text': 'يحتاج التعريض التلقائي إلى 2–3 ثوانٍ كي يستقر.',
  'note.howTo.aim.title': 'وجّه الكاميرا إلى سطح مُضاء',
  'note.howTo.aim.text': 'ورقة بيضاء أو جدار فاتح. لا تقِس بالنظر مباشرة إلى مصدر الضوء.',
  'note.howTo.compare.title': 'قارِن، ولا تحكم بالمطلق',
  'note.howTo.compare.text': 'المشهد نفسه قبل تغيير الإضاءة وبعده يقول أكثر مما يقوله رقم واحد.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Skracanie go w tłumaczeniu nie jest kwestią stylu. */

  'legal.noDiagnosis': 'لا تُعدّ أي نتيجة تشخيصًا ولا نصيحة صحية.',
  'legal.mdr': '{app} ليس جهازًا طبيًا بالمعنى المقصود في اللائحة (الاتحاد الأوروبي) 2017/745، وهو غير مخصص لتشخيص أي حالة مرضية أو الوقاية منها أو مراقبتها أو علاجها، ولا يحل محل الفحص لدى طبيب أو اختصاصي بصريات.',

  /* ---- prywatność ---- */

  'privacy.title': 'ما الذي يغادر هذا الجهاز',
  'privacy.short': 'لا شيء في هذا التطبيق يرسل أي شيء إلى الشبكة. وكل رقم يُنتَج على هذا الجهاز ويبقى هنا.',
  'privacy.onDevice': 'لا تعمل الكاميرا إلا بعد ضغطك على الزر، والصورة لا تغادر هذا الجهاز أبدًا.',
  'privacy.external': 'هذا هو المكان الوحيد في التطبيق كله الذي يغادر فيه أي شيء هذا الجهاز: فالزر يفتح صفحة خارجية في علامة تبويب جديدة، ولا يحدث ذلك إلا بعد ضغطك عليه. أما القياس والسجل والإعدادات فتبقى هنا.',
  'privacy.externalPending': 'حين يتوفر العنوان، سيفتح الزر صفحة خارجية في علامة تبويب جديدة. وستكون تلك هي اللحظة الوحيدة التي يغادر فيها أي شيء هذا الجهاز. أما القياس والسجل والإعدادات فتبقى هنا.',
  'privacy.storageBlocked': 'هذا المتصفح لا يسمح بحفظ أي شيء (وضع التصفح الخاص أو حظر بيانات المواقع). القياس يعمل، لكن السجل سيختفي عند إغلاق علامة التبويب.',

  /* ---- liczebniki ----
     Sześć kategorii CLDR: zero (0), one (1), two (2), few (3–10), many (11–99)
     i other (setki oraz ułamki). Formę wybiera Intl.PluralRules('ar'). */

  'count.readings': { zero: '{n} قراءة', one: 'قراءة واحدة', two: 'قراءتان', few: '{n} قراءات', many: '{n} قراءة', other: '{n} قراءة' },
  'count.sessions': { zero: '{n} قياس', one: 'قياس واحد', two: 'قياسان', few: '{n} قياسات', many: '{n} قياسًا', other: '{n} قياس' },
  'count.seconds': { zero: '{n} ثانية', one: 'ثانية واحدة', two: 'ثانيتان', few: '{n} ثوانٍ', many: '{n} ثانية', other: '{n} ثانية' },
  'count.minutes': { zero: '{n} دقيقة', one: 'دقيقة واحدة', two: 'دقيقتان', few: '{n} دقائق', many: '{n} دقيقة', other: '{n} دقيقة' },
  'count.hours': { zero: '{n} ساعة', one: 'ساعة واحدة', two: 'ساعتان', few: '{n} ساعات', many: '{n} ساعة', other: '{n} ساعة' },
  'count.days': { zero: '{n} يوم', one: 'يوم واحد', two: 'يومان', few: '{n} أيام', many: '{n} يومًا', other: '{n} يوم' }
});
