/* docs/v3/i18n/ar.js — słownik WŁASNY wersji v3, arabski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/ar.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * PISMO OD PRAWEJ DO LEWEJ: w napisach NIE MA znaków sterujących kierunkiem
 * (U+200E, U+200F, U+202A…U+202E). Kierunkiem zarządza atrybut dir na
 * dokumencie. Symbole jednostek (%, K, ×, Hz, nm, ms), identyfikatory (sRGB,
 * CIE XYZ, D65, IES, HTTPS, CSV, JSON, Escape, UTF-8, BOM, Excel), litery
 * kanałów R/G/B, nazwy kolumn A/B oraz same wzory zostają łacińskie —
 * algorytm dwukierunkowy ustawia je sam.
 *
 * ZAPIS LICZB WE WZORACH: kropka dziesiętna („0.3320”, „1.00”), bo tak
 * Intl.NumberFormat('ar') zapisuje liczby przy domyślnym systemie cyfr
 * (numberingSystem: 'latn'), a wzory czyta człowiek, nie parser.
 *
 * CZEGO TU NIE MA — i dlaczego: kluczy, które stoją już w słowniku wspólnym
 * (docs/shared/i18n/ar.js). Nazwy stref, zdania oceniające, noty o granicach
 * metody, nazwy i opisy siedmiu wielkości oraz zastrzeżenie medyczne są
 * wspólne dla wersji i tłumaczy się je RAZ.
 *
 * TERMINOLOGIA WZIĘTA ZE SŁOWNIKA WSPÓLNEGO (jeden odpowiednik na pojęcie):
 *   udział niebieskiego  → نسبة الأزرق         migotanie      → الوميض
 *   jasność sceny        → سطوع المشهد         równomierność  → الانتظام
 *   temperatura barwowa  → درجة حرارة اللون    komfort wzrok. → الراحة البصرية
 *   wpływ na rytm dobowy → التأثير على الإيقاع اليومي
 *   współczynnik melanopiczny → المعامل الميلانوبي
 *   w normie / uwaga / krytycznie → ضمن النطاق / تنبيه / حرج
 *   wielkość → كمية · próg → عتبة · kalibracja → معايرة · historia → السجل
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js tego katalogu —
 * pilnuje tego docs/shared/i18n/keys.test.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ar'] = Object.assign(window.I18nData['ar'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. Pismo arabskie
     nie zna wielkich liter, więc napis jest taki sam jak nazwa aplikacji. */
  'app.wordmark': 'مراقب الضوء',

  'state.idle': 'جاهز',
  'state.starting': 'جارٍ التشغيل',
  'state.running': 'جارٍ القياس',
  'state.runningTpl': 'جارٍ القياس {time}',
  'state.stopped': 'متوقف',
  'state.error': 'خطأ في الكاميرا',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5,0 po polsku, 5.0 po angielsku i po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'ابدأ القياس',
  'keys.starting': 'جارٍ التشغيل…',
  'keys.stop': 'إيقاف',
  'keys.flip': 'تبديل',
  'keys.flipAria': 'تبديل الكاميرا الأمامية والخلفية',
  'keys.menu': 'القائمة',
  'keys.menuAria': 'قائمة الوحدات',
  'keys.back': '‹ رجوع',
  'keys.backAria': 'العودة إلى لوحة التحكم',
  'keys.dash': 'لوحة التحكم',
  'keys.zoom': 'تكبير المعاينة',
  'keys.retry': 'حاول مرة أخرى',
  'keys.refresh': 'تحديث',
  'keys.close': 'إغلاق',
  'keys.show': 'اعرض',
  'keys.apply': 'تطبيق',
  'keys.remove': 'حذف',

  'monitor.legend': 'معاينة المراقبة',
  'monitor.badge': 'مباشر',

  'aim.title': 'التصويب',
  'aim.hint': 'يبيّن الإطار بالضبط ذلك الجزء من الصورة الذي يقيسه التطبيق.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'القناة الرئيسية',
  'readout.thresholdTpl': '(العتبة {value})',
  'readout.contextTpl': 'الأدنى {min} · المتوسط {avg} · الأعلى {max} — آخر 60 ث',
  'readout.contextEmpty': 'لا بيانات من آخر 60 ث',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'ما معنى: {name}',
  'aria.channel': '{name}، {value}، {zone}. اعرض على الشاشة الكبيرة.',
  'aria.channelStale': '{name}، لا توجد بيانات. اعرض على الشاشة الكبيرة.',
  'aria.scale': 'المقياس: {name}، من {min} إلى {max}. الآن {value}، {zone}. عتبة التنبيه {warn}، العتبة الحرجة {crit}.',
  'aria.readout': '{name}: {value}، {zone}.',
  'aria.readoutApprox': '{name}: نحو {value}، {zone}. قيمة تقريبية.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'مقياس القناة الرئيسية. لا توجد بيانات',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': 'اضغط “ابدأ القياس”، ووجّه الهاتف إلى سطح مُضاء، وأبقِه ثابتًا بضع ثوانٍ.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'الراحة البصرية منخفضة. اطّلع على الوحدة 01 لترى ما الذي يخفضها.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'ابدأ بمفتاح “ابدأ القياس” في أسفل الشاشة. ولا تعمل الكاميرا إلا بعد ضغطك عليه.',
  'transient.measureStopped': 'انتهى القياس · {time} · حُفظ في السجل.',
  'transient.newVersion': 'يوجد إصدار جديد من التطبيق.',
  'transient.thresholdsSaved': 'حُفظت العتبات.',
  'transient.thresholdsRejected': 'لم تُحفظ — لا يجوز أن تتقاطع عتبة التنبيه والعتبة الحرجة.',
  'transient.historyCleared': 'مُسح السجل.',

  'live.lead': 'القناة الرئيسية: {name}، {value}، {zone}.',
  'live.ready': 'التقييم جاهز. {name} {value}، {zone}.',
  'live.started': 'بدأ القياس.',
  'livebar.stopped': 'القياس متوقف',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'لا توجد أي تسجيلات بعد. يُكتب السجل أثناء القياس — شغّل القياس دقيقة واحدة ثم عُد إلى هنا.',
  'empty.recorderNoRange': 'لم يجرِ أي قياس في هذا النطاق.',
  'empty.coverageTpl': 'غطّى القياس {done} من {total} ساعة.',
  'empty.reportsNoData': 'يظهر التقرير اليومي بعد أول يوم كامل فيه قياسات.',
  'empty.compareOneSession': 'تحتاج المقارنة إلى جلستين منتهيتين. ولديك حتى الآن واحدة.',
  'empty.exportNoData': 'لا شيء لتصديره. شغّل القياس كي يصبح في السجل محتوى.',
  'empty.alertsOff': 'الإنذارات مُطفأة. وهي بعد تشغيلها لا تعمل إلا والتطبيق مفتوح.',
  'empty.scheduleEmpty': 'لم يُضبط أي وقت. ولا يعمل الجدول إلا والتطبيق مفتوح.',
  'empty.historyEmpty': 'السجل فارغ.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'قائمة الوحدات',

  'modules.01.title': 'المُسجّل',
  'modules.01.desc': 'مسار القياس عبر الزمن، من دقيقة إلى ثلاثين يومًا.',
  'modules.02.title': 'العتبات',
  'modules.02.desc': 'اضبط حدود التنبيه والإنذار الخاصة بك لكل كمية.',
  'modules.03.title': 'المعايرة',
  'modules.03.desc': 'الإسناد إلى مصدر ضوء معروف، وما لا تصلحه المعايرة.',
  'modules.04.title': 'التقارير',
  'modules.04.desc': 'ملخصات يومية وأسبوعية مهيّأة كمطبوعة.',
  'modules.05.title': 'التصدير',
  'modules.05.desc': 'حفظ القراءات في ملف CSV أو JSON مع وصف الأعمدة.',
  'modules.06.title': 'المقارنة',
  'modules.06.desc': 'جلستان جنبًا إلى جنب، والفرق بينهما بالأرقام.',
  'modules.07.title': 'اختبار الشاشة',
  'modules.07.desc': 'لوحات لفحص شاشتك أنت، خطوة بخطوة.',
  'modules.08.title': 'الجدول',
  'modules.08.desc': 'قياسات تلقائية في أوقات تحددها أنت.',
  'modules.09.title': 'الإنذارات',
  'modules.09.desc': 'إشعار عند تجاوز العتبة — ومتى لا يعمل.',
  'modules.10.title': 'الدعم',
  'modules.10.desc': 'التطبيق مجاني بالكامل. وهنا يمكنك أن تشتري لصاحبه قهوة.',
  'modules.11.title': 'التوثيق',
  'modules.11.desc': 'ما هذا القياس، وما ليس هو قطعًا.',
  'modules.12.title': 'الإعدادات',
  'modules.12.desc': 'السمة، وحجم النص، وتقليل الحركة، ومسح السجل.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'قنوات القياس',
  'channels.pick': 'اعرض على الشاشة الكبيرة',
  'channels.stale': 'لا توجد بيانات',
  'channels.approx': 'قيمة تقريبية',

  'help.unit': 'الوحدة',
  'help.range': 'النطاق',
  'help.thresholds': 'العتبات',
  'help.warn': 'عتبة التنبيه',
  'help.crit': 'العتبة الحرجة',
  'help.now': 'الآن',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „الكمية” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'الكمية',
  'col.unit': 'الوحدة',
  'col.range': 'النطاق',
  'col.direction': 'الاتجاه',
  'col.time': 'الساعة',
  'col.date': 'التاريخ',
  'col.zone': 'المنطقة',
  'col.avg': 'المتوسط',
  'col.min': 'الأدنى',
  'col.max': 'الأعلى',
  'col.name': 'العمود',
  'col.meaning': 'ما يحتويه',
  'col.channel': 'القناة',
  'col.gain': 'الكسب',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'النطاق الزمني',
  'recorder.range.60s': '60 ث',
  'recorder.range.15min': '15 د',
  'recorder.range.1h': '1 س',
  'recorder.range.24h': '24 س',
  'recorder.range.30d': '30 يومًا',
  'recorder.gap': 'لا قياس',
  'recorder.sessionTitle': 'إحصاء الجلسة',
  'recorder.zonesCaption': 'توزّع المناطق لنسبة الأزرق',
  'recorder.tableCaption': 'القراءات من النطاق المحدد',
  'recorder.crosshair': 'مؤشر القراءة',
  'recorder.prevAria': 'النقطة السابقة',
  'recorder.nextAria': 'النقطة التالية',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'المظهر',
  'settings.themeLabel': 'السمة',
  'settings.themeSystem': 'حسب النظام',
  'settings.themeLight': 'فاتحة',
  'settings.themeDark': 'داكنة',
  'settings.themeHint': 'سمة “حسب النظام” تتغير مع الإعداد المضبوط في الهاتف.',
  'settings.textLabel': 'حجم النص',
  /* Mnożnik jako LICZBA we wstawce — 1,15 po polsku, 1.15 po angielsku
     i po arabsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'يكبّر الواجهة كلها، لا الحروف وحدها — فالمفاتيح والصفوف تكبر مع النص.',
  'settings.motionGroup': 'الحركة',
  'settings.motionLabel': 'قلّل الحركة',
  'settings.motionHint': 'يوقف كل الانتقالات. وعندها يقفز مؤشر المقياس مرة في الثانية بدل أن ينساب.',
  'settings.dataTitle': 'البيانات',
  'settings.clearLabel': 'امسح السجل',
  'settings.clearHintTpl': 'في السجل الآن {count} نقطة محفوظة.',
  'settings.clearHintEmpty': 'السجل فارغ.',
  'settings.clearTitle': 'هل تمسح السجل؟',
  'settings.clearConfirm': 'هل تمسح سجل القياسات كله؟ لا يمكن التراجع عن ذلك.',
  'settings.clearKey': 'امسح',
  'settings.aboutTitle': 'عن التطبيق',
  'settings.versionTpl': '{app}، الإصدار {version}.',
  'settings.offlineText': 'يعمل التطبيق دون شبكة. فبعد فتحه أول مرة تكون ملفاته كلها في ذاكرة المتصفح، ولذلك لا يغيّر وضع الطيران شيئًا. ولا يُرسل أي شيء إلى أي خادم، لأن التطبيق لا يجري أي طلب شبكي.',
  'settings.docsKey': 'افتح التوثيق',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'إلغاء',
  'common.save': 'حفظ',
  'common.reset': 'استعادة الافتراضي',
  'common.yes': 'نعم',
  'common.no': 'لا',
  'common.on': 'مشغّل',
  'common.off': 'مطفأ',
  'common.sep': ' · ',
  'common.stepsTitle': 'خطوة بخطوة',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'لماذا عتبات خاصة بك',
  'modules.02.intro': 'العتبة تقرر متى يقول التطبيق “تنبيه” ومتى يقول “حرج”. والقيم الافتراضية اجتهاد تحريري منّا، وليست معيارًا — فإن كنت تقيس في ظروف أخرى فحرّكها بما يناسبك. ويُحسب التقييم والجملة المعروضة في لوحة التحكم من العتبات الجديدة فورًا.',
  'modules.02.orderNormal': 'يجب أن تقع عتبة التنبيه دون العتبة الحرجة.',
  'modules.02.orderInvert': 'هنا تكون القيمة الأعلى أفضل، فتقع عتبة التنبيه فوق العتبة الحرجة.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'معاينة المقياس: {name}',
  'modules.02.nowTpl': 'الآن {value}',
  'modules.02.resetDone': 'أُعيدت العتبات الافتراضية.',
  'modules.02.profilesTitle': 'ملفات التعريف',
  'modules.02.profilesHint': 'ملف التعريف مجموعة محفوظة من عتبات الكميات السبع كلها. وتطبيقه يبدّلها جميعًا دفعة واحدة.',
  'modules.02.profileSaveKey': 'احفظ العتبات الحالية',
  'modules.02.profileNameLabel': 'اسم ملف التعريف الجديد',
  'modules.02.profileNameHint': 'يبقى الاسم على هذا الجهاز. 40 حرفًا على الأكثر.',
  'modules.02.profileNameEmpty': 'أدخل اسم ملف التعريف.',
  'modules.02.profileSavedTpl': 'حُفظ ملف التعريف “{name}”.',
  'modules.02.profileAppliedTpl': 'طُبّق ملف التعريف “{name}”.',
  'modules.02.profileRemovedTpl': 'حُذف ملف التعريف “{name}”.',
  'modules.02.profileFailed': 'تعذّر تطبيق ملف التعريف هذا.',
  'modules.02.profileCustomTpl': 'ملف تعريف خاص بك، محفوظ في {date}.',
  'modules.02.builtin.default.name': 'الافتراضي',
  'modules.02.builtin.default.desc': 'العتبات المأخوذة من فهرس الكميات — نقطة البداية لكل قياس.',
  'modules.02.builtin.evening.name': 'المساء — لطيف',
  'modules.02.builtin.evening.desc': 'ينبّه مبكرًا إلى لون الضوء البارد وإلى التأثير على الإيقاع اليومي.',
  'modules.02.builtin.work.name': 'العمل على المكتب',
  'modules.02.builtin.work.desc': 'يسمح بضوء نهار ساطع وبارد؛ ويراقب الوميض والانتظام.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'لماذا ينجح هذا',
  'modules.03.why': 'لمستشعر الكاميرا انحراف ثابت بين قنواته. وقياس ورقة بيضاء يبيّن مقدار هذا الانحراف ويتيح طرحه. وهي الميزة الوحيدة في هذا التطبيق التي ترفع الدقة فعلًا — ومع ذلك لا تحوّل الكاميرا إلى مطياف.',
  'modules.03.steps.1': 'ضع ورقة بيضاء تحت الضوء الذي تقيسه.',
  'modules.03.steps.2': 'اضغط “ابدأ القياس” في لوحة التحكم واملأ الإطار بالورقة.',
  'modules.03.steps.3': 'عُد إلى هنا، واضغط “عايِر”، ولا تحرّك الهاتف ثلاث ثوانٍ.',
  'modules.03.runKey': 'عايِر (3 ث)',
  'modules.03.clearKey': 'احذف المعايرة',
  'modules.03.busyTpl': 'جارٍ قياس الورقة… بقي {sec} ث',
  'modules.03.statusNone': 'لا توجد معايرة. القياس يعمل، وتعامل مع القيم على أنها للمقارنة.',
  'modules.03.statusOnTpl': 'جرت المعايرة في {date} الساعة {time}.',
  'modules.03.gainsTitle': 'كسب القنوات',
  'modules.03.gainR': 'الأحمر',
  'modules.03.gainG': 'الأخضر',
  'modules.03.gainB': 'الأزرق',
  'modules.03.gainsNone': 'غير مضبوط',
  'modules.03.needRunning': 'شغّل القياس أولًا ووجّه الكاميرا إلى ورقة بيضاء.',
  'modules.03.tooFew': 'العينات قليلة جدًا. تحقق من أن القياس يعمل فعلًا.',
  'modules.03.tooDark': 'الصورة معتمة أكثر من أن تصلح للمعايرة. أضئ الورقة وحاول مرة أخرى.',
  'modules.03.refused': 'انحراف القنوات أكبر من أن يُقبل معايرةً. استخدم ورقة بيضاء في ضوء منتظم.',
  'modules.03.done': 'تمت المعايرة. ستصبح درجة حرارة اللون والتأثير على الإيقاع اليومي أدق الآن.',
  'modules.03.cleared': 'حُذفت المعايرة.',
  'modules.03.limitsTitle': 'ما لا تصلحه المعايرة',
  'modules.03.limits.1': 'تسوّي المعايرة قنوات الكاميرا الثلاث ولا شيء غير ذلك. وهي لا تمنح الكاميرا طيفًا، فتبقى درجة حرارة اللون والتأثير على الإيقاع اليومي تقديرين تقريبيين محسوبين من ألوان sRGB الأساسية.',
  'modules.03.limits.2': 'وهي لا تحوّل سطوع المشهد إلى كمية مطلقة — فهذا الرقم يبقى نسبيًا. ولا تُوقف التعريض التلقائي ولا موازنة البياض، وهما يزيحان القراءة من تحتها.',
  'modules.03.limits.3': 'وهي لا تنتقل إلى ضوء آخر: فالمعايرة التي تجري تحت مصباح معيّن تصف ذلك المصباح. وعند مصدر آخر أعِدها. وهي لا تغيّر شيئًا مما ليس هذا القياس به — فهو ما زال ليس فحصًا وليس أساسًا لتشخيص مرض.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'فترة التقرير',
  'modules.04.rangeDay': 'يوم',
  'modules.04.rangeWeek': 'أسبوع',
  'modules.04.headTpl': 'من {from} إلى {to} · {count} نقطة من السجل.',
  'modules.04.tableTitle': 'الملخص',
  'modules.04.tableCaption': 'المتوسط والحد الأدنى والحد الأعلى في الفترة المحددة',
  'modules.04.panoramaTitle': 'البانوراما',
  'modules.04.panoramaAriaTpl': 'بانوراما: {name}، {span}.',
  'modules.04.panoramaSpanDay': 'آخر يوم موزعًا على الساعات',
  'modules.04.panoramaSpanWeek': 'آخر أسبوع موزعًا على الأيام',
  'modules.04.panoramaHint': 'ارتفاع العمود ولونه يقولان الشيء نفسه: ضمن النطاق — منخفض، تنبيه — متوسط، حرج — كامل. والشرطة عند القاعدة تعني ساعة بلا قياس.',
  'modules.04.coverageDayTpl': 'غطّى القياس {done} من {total} ساعة.',
  'modules.04.coverageWeekTpl': 'غطّى القياس {done} من {total} يوم.',
  'modules.04.zonesTitle': 'توزّع المناطق',
  'modules.04.zonesCaptionTpl': 'محسوبة للقناة الرئيسية: {name}.',
  'modules.04.worstTpl': 'أصعب وقت: {value}.',
  'modules.04.worstNone': 'لا شيء بارز',
  'modules.04.worstHourTpl': 'الساعة {hour}',
  'modules.04.adviceTitle': 'ما العمل حيال ذلك',
  'modules.04.adviceMelanopicTpl': 'بلغ متوسط التأثير على الإيقاع اليومي {value}×. ويُستحسن في المساء النزول دون 0.50 — وأسهل ذلك بمصباح أدفأ أو بالوضع الليلي.',
  'modules.04.adviceKelvinTpl': 'كان الضوء باردًا (بمتوسط {value} K). وهذا لا غبار عليه في العمل؛ أما في الساعتين قبل النوم فالألطف هو دون 3000 K.',
  'modules.04.adviceFlickerTpl': 'يظهر وميض ملحوظ (بمتوسط {value}%). وسببه عادةً جهاز تعتيم رخيص أو مغذّي الإضاءة الخلفية.',
  'modules.04.adviceUniformityTpl': 'يتوزع الضوء بغير انتظام ({value}%). وتحريك المصباح أو تغيير زاويته يفيد عادةً أكثر من تبديل اللمبة.',
  'modules.04.adviceWorstTpl': 'تتجمع أكثر القراءات الخارجة عن العتبات عند الساعة {hour}.',
  'modules.04.adviceNone': 'لا شيء في هذه الفترة يتجاوز العتبات التي ضبطتها.',
  'modules.04.limitsTitle': 'هذه ليست نصيحة صحية',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'تنبع الخلاصات مما رأته كاميرا هذا الهاتف وحده. والتطبيق لا يقيس الطيف ولا يضع أي تشخيص.',
  'modules.04.printHint': 'هذه الصفحة مهيّأة كمطبوعة: فالجدول والتعليقات تُقرأ على الورق كما تُقرأ في مكبّر النظام وفي قارئ الشاشة.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'نطاق البيانات',
  'modules.05.range1h': 'ساعة',
  'modules.05.range24h': 'يوم',
  'modules.05.range7d': '7 أيام',
  'modules.05.range30d': '30 يومًا',
  'modules.05.csvKey': 'احفظ ملف CSV',
  'modules.05.jsonKey': 'احفظ ملف JSON',
  'modules.05.formatTitle': 'صيغة الملف',
  'modules.05.formatCsv': 'CSV: الفاصلة المنقوطة تفصل الأعمدة، والفاصلة هي الفاصل العشري، والترميز UTF-8 مع علامة ترتيب البايت BOM. وبرنامج Excel المضبوط على لغة تستخدم الفاصلة فاصلًا عشريًا يفتح مثل هذا الملف دون ضبط أي شيء.',
  'modules.05.formatJson': 'JSON: البيانات نفسها في حقل “points”، بنقطة عشرية وبطابع زمني بالميلي ثانية — فهذا ما تقتضيه الصيغة.',
  'modules.05.resolution': 'يحفظ السجل نقطة واحدة كل 5 ثوانٍ ويعود إلى 30 يومًا إلى الوراء. ولا يتضمن الملف الدقة الكاملة البالغة خمس عينات في الثانية — فالمحرك يحتفظ بها دقيقة واحدة فقط.',
  'modules.05.offline': 'يُنشأ الملف في الجهاز ويبقى في الجهاز. والتصدير لا يتصل بالشبكة.',
  'modules.05.columnsTitle': 'وصف الأعمدة',
  'modules.05.columnsCaption': 'أعمدة الملف ومعناها',
  'modules.05.descDate': 'تاريخ النقطة من ساعة الجهاز، مكتوبًا يوم-شهر-سنة.',
  'modules.05.descTime': 'ساعة النقطة بدقة الثانية.',
  'modules.05.descZone': 'منطقة نسبة الأزرق لحظة الحفظ. ولا يحفظ المحرك المنطقة إلا لهذه الكمية وحدها — أما البقية فاحسبها من العتبات.',
  'modules.05.descMetricTpl': '{short} الوحدة: {unit}. النطاق {min}–{max}.',
  'modules.05.previewTitle': 'معاينة',
  'modules.05.previewHint': 'أول خمسة صفوف من الملف، تمامًا كما ستُحفظ.',
  'modules.05.savedTpl': 'حُفظ الملف {name} — {rows} صفًا.',
  'modules.05.failed': 'لم يسمح هذا المتصفح بحفظ الملف.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'يحفظ التطبيق كل جلسة قياس منتهية على هذا الجهاز. اختر جلستين لتراهما على شريط واحد ولتقرأ الفرق بينهما بالأرقام.',
  'modules.06.noSessions': 'لا توجد أي جلسة منتهية بعد. شغّل القياس، ثم أوقفه، ثم عُد إلى هنا.',
  'modules.06.slotA': 'الجلسة A',
  'modules.06.slotB': 'الجلسة B',
  'modules.06.sessionTpl': '{date}، {time} · {dur}',
  'modules.06.tapeTitle': 'الشريط',
  'modules.06.tapeAriaTpl': 'مسار الجلسة {slot}، الكمية {name}.',
  'modules.06.tapeHint': 'الجلستان ممدودتان على العرض نفسه: فالعمود يمثل الجزء نفسه من المدة، لا الساعة نفسها. والارتفاع واللون يقولان ما يقولانه في لوحة التحكم.',
  'modules.06.tapeChannelTpl': 'يعرض الشريط القناة الرئيسية: {name}.',
  'modules.06.diffTitle': 'الفرق',
  'modules.06.diffCaption': 'متوسطا الجلستين والفرق بينهما',
  'modules.06.clearKey': 'احذف الجلسات المحفوظة',
  'modules.06.cleared': 'حُذفت الجلسات المحفوظة.',
  'modules.06.savedTpl': 'حُفظت الجلسة: {dur}.',
  'modules.06.limitsTitle': 'ما لا تقوله هذه المقارنة',
  'modules.06.limits': 'أنت تقارن قياسين، لا مصدري ضوء. فإن تغيّر بين الجلستين الإطار أو المسافة أو وقت اليوم أو وضع الهاتف، فالفرق عن ذلك أيضًا. وأنزه مقارنة هي المشهد نفسه قبل تغيير الإضاءة وبعده.',
  'modules.06.keepTpl': 'يُحتفظ بـ {count} جلسة أخيرة على الأكثر.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'تُعرض لوحات الفحص على كامل شاشة هذا الجهاز. وهي لمعاينة الشاشة بالعين: هل البياض منتظم، وهل تميل الرماديات إلى لون، وهل تتسرب الإضاءة الخلفية عند الزوايا.',
  'modules.07.steps.1': 'اضبط سطوع الشاشة على المستوى الذي تعمل عليه عادةً، وأطفئ الوضع الليلي في النظام.',
  'modules.07.steps.2': 'اختر لوحة من القائمة أدناه. ستملأ الشاشة كلها.',
  'modules.07.steps.3': 'انظر من مسافة ستين سنتيمترًا تقريبًا، عموديًا على الشاشة. ثم انظر إلى اللوحة نفسها من زاوية مائلة.',
  'modules.07.steps.4': 'اخرج بمفتاح “أغلق اللوحة” أو بمفتاح Escape وانتقل إلى التالية.',
  'modules.07.planesTitle': 'اللوحات',
  'modules.07.exitKey': 'أغلق اللوحة',
  'modules.07.showAriaTpl': 'اعرض اللوحة: {name}',
  'modules.07.planeAriaTpl': 'لوحة فحص: {name}. ومفتاح الإغلاق في أسفل الشاشة.',
  'modules.07.plane.white.name': 'الأبيض',
  'modules.07.plane.white.hint': 'ابحث عن البقع والانحرافات اللونية والمواضع الأفتح قرب الحواف. ويجب أن يكون البياض لونًا واحدًا على السطح كله.',
  'modules.07.plane.gray75.name': 'رمادي 75%',
  'modules.07.plane.gray75.hint': 'الرمادي يجب أن يكون رماديًا. والميل إلى الأخضر أو الوردي يعني أن موازنة بياض الشاشة انحرفت.',
  'modules.07.plane.gray50.name': 'رمادي 50%',
  'modules.07.plane.gray50.hint': 'أفضل لوحة للحكم على الانحراف اللوني. قارن الوسط بالزوايا.',
  'modules.07.plane.gray25.name': 'رمادي 25%',
  'modules.07.plane.gray25.hint': 'الرمادي الداكن يكشف تسرّب الإضاءة الخلفية والتشريط في الشاشات الرخيصة.',
  'modules.07.plane.black.name': 'الأسود',
  'modules.07.plane.black.hint': 'في غرفة مظلمة يظهر هنا كل تسرّب للإضاءة الخلفية وكل زاوية فاتحة.',
  'modules.07.plane.red.name': 'أحمر خالص',
  'modules.07.plane.red.hint': 'الأحمر المتجانس يكشف البكسلات الفرعية الميتة وعدم انتظام الشاشة.',
  'modules.07.plane.green.name': 'أخضر خالص',
  'modules.07.plane.green.hint': 'الأخضر يحمل أكبر قدر من السطوع — وعليه يسهل أكثر ما يكون تمييز بكسل تالف.',
  'modules.07.plane.blue.name': 'أزرق خالص',
  'modules.07.plane.blue.hint': 'الأزرق يُظهر الغبار واللطخات على سطح الشاشة أفضل من الأبيض.',
  'modules.07.plane.grid.name': 'الشبكة',
  'modules.07.plane.grid.hint': 'يجب أن تكون الخطوط في الزوايا حادة كحدتها في الوسط. أما التموّه عند الأطراف فمسألة تحجيم الصورة.',
  'modules.07.warn': 'تغطي اللوحة الشاشة كلها، بما فيها لوحة التحكم بمفتاح القياس. وهذا هو الموضع الوحيد في التطبيق الذي يحدث فيه ذلك، ولهذا كان مفتاح الخروج كبيرًا وظاهرًا دائمًا. وما دامت اللوحة على الشاشة فالقياس مستمر ولا يمكن إيقافه — أغلق اللوحة للعودة إلى المفاتيح.',
  'modules.07.cameraTitle': 'ما لا تفعله هنا',
  'modules.07.camera': 'الهاتف لا يرى شاشته هو، فلا يمكنك قياس هذه اللوحات بالجهاز نفسه. ولقياس شاشة، اعرض اللوحة على الشاشة وقِس بالهاتف — جهازان مختلفان ودوران مختلفان.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'يذكّرك الجدول بالقياس في وقت محدد. وهو لا يشغّل الكاميرا من تلقاء نفسه: ففي الساعة المعيّنة يعرض تذكيرًا، وتشغّل أنت القياس بمفتاح “ابدأ القياس” في لوحة التحكم. تمامًا كما في المرة الأولى.',
  'modules.08.onlyOpenTitle': 'متى لا يعمل هذا',
  'modules.08.onlyOpen': 'لا يعمل الجدول إلا والتطبيق مفتوح. وعلامة تبويب مغلقة لا تعدّ الوقت ولن تذكّر بشيء. ونحن لا نطلب إذنًا بإشعارات النظام ولا نرسل أي شيء إلى الشبكة.',
  'modules.08.enableLabel': 'شغّل التذكيرات',
  'modules.08.timesTitle': 'الأوقات',
  'modules.08.timeAriaTpl': 'الوقت {n}: ساعة التذكير',
  'modules.08.addKey': 'أضف وقتًا',
  'modules.08.removeAriaTpl': 'احذف الوقت {time}',
  'modules.08.addedTpl': 'أُضيف الوقت {time}.',
  'modules.08.removedTpl': 'حُذف الوقت {time}.',
  'modules.08.badTime': 'أدخل الساعة بصيغة 22:00.',
  'modules.08.nextTpl': 'أقرب تذكير: {time}.',
  'modules.08.nextNone': 'التذكيرات مُطفأة.',
  'modules.08.dueTpl': 'الوقت المجدول للقياس: {time}.',
  'modules.08.dueKey': 'اعرض لوحة التحكم',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'يراقب الإنذار كمية واحدة، ولا ينطق إلا حين تبقى تلك الكمية في المنطقة المختارة دون انقطاع طوال المدة التي ضبطتها. وهو لا يوقف القياس أبدًا ولا يحجب المفاتيح أبدًا.',
  'modules.09.enableLabel': 'شغّل الإنذارات',
  'modules.09.metricLabel': 'الكمية المراقَبة',
  'modules.09.levelLabel': 'من أي منطقة',
  'modules.09.levelWarning': 'من التنبيه فما فوق',
  'modules.09.levelCritical': 'الحرجة فقط',
  'modules.09.sustainLabel': 'بعد كم ثانية دون انقطاع',
  'modules.09.sustainHint': 'المدد الأقصر تعطي إنذارات كاذبة أكثر حين تحرّك الهاتف. ونحن لا ننزل دون خمس ثوانٍ.',
  'modules.09.soundLabel': 'إشارة صوتية قصيرة',
  'modules.09.soundHint': 'يُنتَج الصوت في الجهاز. ولا يُنزَّل أي شيء من الشبكة.',
  'modules.09.cooldownHint': 'إنذار واحد كل دقيقتين على الأكثر. فالإنذار المتكرر عند كل عينة إنذار يُطفأ نهائيًا.',
  'modules.09.whenNotTitle': 'متى لا يعمل الإنذار',
  'modules.09.whenNot': 'الإشعار داخل التطبيق، لا في النظام. وهو لا يعمل حين يكون التطبيق مغلقًا أو مخفيًا في الخلفية، ولا حين يكون القياس متوقفًا، ولا حين يتعذر قياس الكمية المراقَبة في تلك اللحظة. ونحن لا نطلب إذنًا بإشعارات النظام.',
  'modules.09.firedTpl': '{name}: {zone} منذ {sec} ث — الآن {value}.',
  'modules.09.saved': 'حُفظت إعدادات الإنذار.',
  'modules.09.statusOnTpl': 'أراقب: {name}، {level}، بعد {sec} ث.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'هذا التطبيق مجاني',
  'support.freeText': 'تعرض الكميات السبع كلها أرقامها منذ أول تشغيل. والمُسجّل والعتبات والمعايرة والتقارير والتصدير ومقارنة الجلسات والسجل كله على مدى ثلاثين يومًا تعمل بلا حساب وبلا رسوم وبلا حدود — وكذلك دون اتصال. ولا شيء هنا مؤجَّل خلف مقابل.',
  'support.whyTitle': 'لماذا أطلب ذلك',
  'support.whyText': 'أصنع مراقب الضوء وأتعهده بنفسي، خارج ساعات العمل. والدعم يذهب إلى الوقت اللازم للإصلاحات، وللاختبار على هواتف أخرى، وللأدوات التالية في قائمة الوحدات. ولن يتوقف أي شيء عن العمل إن لم يدفع أحد شيئًا.',
  'support.nothingTitle': 'ماذا يمنح التبرع',
  'support.nothingText': 'لا شيء. لا رقم ولا وحدة ولا إعداد يُفتح بعد التبرع، لأن كل شيء مفتوح منذ البداية. ولا يبقى إلا أنني أعرف أن هذا نفع أحدًا.',
  'support.keyTitle': 'إن أردت المساعدة',
  'support.keyLabel': 'اشترِ لي قهوة',
  'support.keyAria': 'اشترِ لي قهوة — يفتح صفحة خارجية في علامة تبويب جديدة',
  'support.serviceText': 'يدير ملف التبرعات موقع Buy Me a Coffee، وهو الشكل الوحيد للدعم في هذا التطبيق. ولا يحمّل التطبيق منه أي سكربت ولا أداة ولا صورة — فما يقف هنا رابط عادي ولا شيء غيره.',
  'support.privacyText': 'ضغط هذا المفتاح يفتح صفحة خارجية في علامة تبويب جديدة، وهذه هي اللحظة الوحيدة التي يغادر فيها أي شيء هذا الجهاز. أما القياسات والسجل والإعدادات فتبقى حيث كانت — في ذاكرة هذا المتصفح.',
  'support.privacyPendingText': 'حين يظهر العنوان، سيفتح ضغط المفتاح صفحة خارجية في علامة تبويب جديدة، وستكون تلك هي اللحظة الوحيدة التي يغادر فيها أي شيء هذا الجهاز. أما القياسات والسجل والإعدادات فتبقى حيث كانت — في ذاكرة هذا المتصفح.',
  'support.emptyTitle': 'ملف التبرعات غير موصول بعد',
  'support.emptyText': 'لم يُكتب بعد عنوان ملف التبرعات، فلا يوجد هنا مفتاح يقود إلى لا مكان. وبقية التطبيق تعمل دون تغيير — ولا شيء ينتظر ذلك التبرع.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'ما لا يقيسه هذا التطبيق',
  'docs.notList.1': 'لا يقيس الطيف. فللكاميرا ثلاث قنوات لونية عريضة، وتعريض تلقائي، وموازنة بياض تلقائية.',
  'docs.notList.2': 'لا يقيس القيم المطلقة. فسطوع المشهد مؤشر نسبي، لا نتيجة قياس ضوئي.',
  'docs.notList.3': 'لا يقيس درجة حرارة اللون مباشرة. فدرجة حرارة اللون والتأثير على الإيقاع اليومي تقديران تقريبيان محسوبان من ألوان sRGB الأساسية.',
  'docs.notList.4': 'لا يرى وميض شبكة الكهرباء. فأخذ العينات بمعدل 5 Hz لا يرى من النبض إلا ما كان دون 2.5 Hz — ووميض الشبكة عند 100 Hz خارج المتناول، ولن يعرضه التطبيق أبدًا كنتيجة.',
  'docs.notList.5': 'لا يضع تشخيصًا ولا يقدّم نصيحة صحية. فلا تُعدّ أي نتيجة واحدًا منهما.',
  'docs.notList.6': 'لا يقارن ضوءك بأي مرجع رسمي. فالعتبات إعدادات يمكنك تغييرها في الوحدة 02.',
  'docs.whatTitle': 'ماذا يقيس وكيف',
  'docs.whatLead': 'تنظر كاميرا الهاتف إلى سطح مُضاء، ويحسب التطبيق خمس مرات في الثانية متوسطات القنوات R وG وB من الجزء الأوسط من الإطار. ومن هذه الأرقام الثلاثة يستخرج الكميات السبع.',
  'docs.whatCrop': 'الجزء المقتطع هو 60% الوسطى من عرض اللقطة و60% من ارتفاعها — وهو بالضبط المستطيل الذي يرسمه المصوّب على شاشة التصويب. ولا يُحسب أي شيء خارجه.',
  'docs.whatRate': 'عيّنة واحدة كل 200 ms، أي 5 مرات في الثانية. والدقيقة الأخيرة تبقى في الذاكرة بدقتها الكاملة؛ وكل ما هو أقدم يُحفظ كل 5 ثوانٍ ويعود إلى ثلاثين يومًا إلى الوراء.',
  'docs.metricsTitle': 'الكميات السبع',
  'docs.formulasTitle': 'المعادلات',
  'docs.formula.share.formula': 'نسبة الأزرق = B / (R + G + B) × 100%',
  'docs.formula.share.text': 'تُحسب على قيم sRGB دون عكس غاما — عن قصد، لأن هذا هو التعريف نفسه المستخدم في الإصدار السابق من التطبيق، فتبقى العتبات المضبوطة حينها تعني الشيء نفسه. وهي تفصل اللون عن السطوع.',
  'docs.formula.brightness.formula': 'السطوع = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': 'متوسط قيمة القنوات كنسبة مئوية من النطاق. والتعريض التلقائي يزيحه من تحته، فهو مؤشر نسبي — قارن مشهدين بدل أن تقرأ رقمًا واحدًا على أنه قياس.',
  'docs.formula.kelvin.title': 'درجة حرارة اللون — تقريب مكّامي',
  'docs.formula.kelvin.formula': 'n = (x − 0.3320) / (y − 0.1858)\nCCT = −449 n³ + 3525 n² − 6823.3 n + 5520.33',
  'docs.formula.kelvin.text': 'نعكس أولًا غاما sRGB، ثم ننتقل بالمصفوفة إلى CIE XYZ عند بياض D65 ونحسب الإحداثيين اللونيين x وy. ومعادلة مكّامي جديرة بالثقة بين 2000 K و12500 K تقريبًا. وخارج هذا النطاق تنحرف المعادلة التكعيبية، فتُقتطع النتيجة وتُعلَّم بأنها غير جديرة بالثقة — وعندها يصير خط أساس المقياس متقطعًا وتظهر عبارة “خارج نطاق الطريقة”.',
  'docs.formula.melanopic.title': 'التأثير على الإيقاع اليومي — المعامل الميلانوبي',
  'docs.formula.melanopic.formula': 'mel = 0.0016 R + 0.3110 G + 0.8460 B\nY = 0.2127 R + 0.7152 G + 0.0722 B\nالنتيجة = (mel / Y) × تسوية إلى 1.00 للبياض المحايد',
  'docs.formula.melanopic.text': 'القنوات الثلاث كلها بقيم خطية. والكمية الحقيقية هي تكامل الطيف مع منحنى حساسية الميلانوبسين (بذروة عند 490 nm تقريبًا)؛ وللكاميرا ثلاث قنوات عريضة، فنرجّح ألوان sRGB الأساسية بالحساسية الميلانوبية عند أطوالها الموجية التقريبية (R 612 nm، G 549 nm، B 465 nm). واتجاه التغيّر جدير بالثقة، أما القيمة المطلقة فلا — ولهذا تقف علامة “≈” عند هذا الرقم.',
  'docs.formula.flicker.formula': 'الوميض = (max − min) / (max + min) × 100%',
  'docs.formula.flicker.text': 'تعريف IES، محسوبًا من نافذة من عينات السطوع. ونقدّر التردد من عدد مرات عبور الإشارة قيمتها المتوسطة. وأخذ العينات بمعدل 5 Hz لا يرى من التضمين إلا ما كان دون 2.5 Hz (حد نايكويست)، ولا نعدّ التردد جديرًا بالثقة إلا بين 0.2 و2 Hz عند سعة تبدأ من 0.5% — ودون هذه العتبة تكون عبورات المتوسط ضجيج مستشعر لا نبض مصدر.',
  'docs.formula.uniformity.formula': 'الانتظام = أعتم حقل / أسطع حقل × 100%',
  'docs.formula.uniformity.text': 'نقسم الجزء المقتطع إلى تسعة حقول في شبكة 3×3 ونقارن الطرفين. و100% ضوء موزّع بانتظام تام. والقيمة المنخفضة على الشاشة تعني تسرّب الإضاءة الخلفية أو انعكاسًا، وعلى المكتب تعني مصباحًا موضوعًا في مكان سيئ. وهي الكمية الوحيدة، مع الراحة البصرية، التي يعني فيها الأعلى أفضل.',
  'docs.formula.comfort.formula': '100 نقطة ناقص العقوبات:\nالإيقاع اليومي فوق 0.75 — حتى 35 نقطة\nلون الضوء فوق 4000 K — حتى 25 نقطة\nالوميض فوق 5% — حتى 25 نقطة\nالانتظام دون 60% — حتى 15 نقطة',
  'docs.formula.comfort.text': 'تقييم واحد بدل ستة أرقام. والكمية التي تعذّر قياسها لا تعطي أي عقوبة — فانعدام البيانات لا يتظاهر أبدًا بنتيجة جيدة. والأوزان اجتهاد تحريري منّا، وليست معيارًا؛ ولهذا تعرض الوحدة 01 تفصيل المكوّنات، كي يمكن الاختلاف مع هذا التقييم.',
  'docs.rangesTitle': 'النطاقات والعتبات',
  'docs.rangesLead': 'العتبات أدناه هي السارية في هذه اللحظة — فإن غيّرتها في الوحدة 02، فالجدول يعرض قيمك أنت لا قيم المصنع.',
  'docs.dirNormal': 'الأدنى ألطف',
  'docs.dirInvert': 'الأعلى أفضل',
  'docs.privacyTitle': 'البيانات والخصوصية',
  'docs.privacyText': 'صورة الكاميرا لا تُرسل ولا تُحفظ في أي مكان — ولا يبقى من كل إطار سوى ثلاثة أرقام. والقياسات والعتبات والإعدادات تقع في ذاكرة المتصفح على هذا الجهاز. والتطبيق لا يجري أي طلب شبكي ويعمل دون اتصال.',
  'docs.mdrTitle': 'إخلاء مسؤولية',
  'docs.freeText': 'التطبيق مجاني بالكامل وسيبقى كذلك: الكميات السبع كلها، والسجل، والتقارير، والتصدير، والعمل دون اتصال تعمل بلا حساب وبلا رسوم وبلا حدود. ومن أراد أن يشكر فسيجد الوحدة 10 “الدعم”.',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'حُمّل التطبيق ناقصًا',
  'boot.filesTpl': 'لم تُحمَّل هذه الملفات: {list}.',
  'boot.modulesTpl': 'لم تُبلّغ هذه الوحدات عن نفسها: {list} — ولن تُفتح هذه المداخل من القائمة.',
  'boot.modulesRangeTpl': 'الوحدات {from}–{to}',
  'boot.tail': 'أعد تحميل الصفحة. فإن لم يساعد ذلك، فالملفات على الخادم ناقصة.',
  'boot.loss.bus': 'ستكفّ الوحدات عن رؤية بعضها ولن يبدأ القياس',
  'boot.loss.metrics': 'لن تُحسب أي قيمة',
  'boot.loss.scaleCore': 'ستختفي هندسة المقياس وتنسيق الأرقام',
  'boot.loss.scaleText': 'ستختفي كل نصوص الواجهة',
  'boot.loss.shell': 'لن يمكن فتح أي وحدة',
  'boot.loss.engine': 'لن تعمل الكاميرا ولن يبدأ القياس',
  'boot.loss.dash': 'ستبقى لوحة التحكم فارغة'
});
