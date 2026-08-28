/* docs/v3/i18n/fa.js — słownik WŁASNY wersji v3, perski (farsi).
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/fa.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * PISMO OD PRAWEJ DO LEWEJ: w napisach NIE MA znaków sterujących kierunkiem
 * (U+200E, U+200F, U+202A…U+202E). Kierunkiem zarządza atrybut dir na
 * dokumencie. Występuje natomiast ZWNJ (U+200C) — to zwykła ortografia perska
 * („اندازه‌گیری”, „شبانه‌روزی”), a nie sterowanie kierunkiem. Symbole jednostek
 * (%, K, ×, Hz, nm, ms), identyfikatory (sRGB, CIE XYZ, D65, IES, CSV, JSON,
 * Escape, UTF-8, BOM), litery kanałów R/G/B, nazwy kolumn A/B oraz same wzory
 * zostają łacińskie — algorytm dwukierunkowy ustawia je sam.
 *
 * CYFRY I ZAPIS LICZB: cyfry arabskie zachodnie i kropka dziesiętna („0.3320”,
 * „1.00”, „3000 K”) — dokładnie tak, jak w docs/shared/i18n/fa.js, żeby liczba
 * ze słownika wersji nie stała obok liczby z warstwy wspólnej zapisanej innym
 * systemem cyfr. Liczby wstawiane przez '{…}' formatuje warstwa językowa i to
 * jest osobna sprawa.
 *
 * CZEGO TU NIE MA — i dlaczego: kluczy, które stoją już w słowniku wspólnym
 * (docs/shared/i18n/fa.js). Nazwy stref, zdania oceniające, noty o granicach
 * metody, nazwy i opisy siedmiu wielkości oraz zastrzeżenie medyczne są
 * wspólne dla wersji i tłumaczy się je RAZ.
 *
 * TERMINOLOGIA WZIĘTA ZE SŁOWNIKA WSPÓLNEGO (jeden odpowiednik na pojęcie):
 *   udział niebieskiego  → سهم آبی            migotanie      → سوسو زدن
 *   jasność sceny        → روشنایی صحنه       równomierność  → یکنواختی
 *   temperatura barwowa  → دمای رنگ           komfort wzrok. → آسایش چشم
 *   wpływ na rytm dobowy → اثر شبانه‌روزی
 *   współczynnik melanopiczny → نسبت ملانوپیک · zegar biologiczny → ساعت زیستی
 *   w normie / uwaga / krytycznie → در محدوده / احتیاط / بحرانی
 *   wielkość → کمیت · próg → آستانه · kalibracja → کالیبراسیون
 *   historia → تاریخچه · sesja → جلسه · strefa → منطقه
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js tego katalogu —
 * pilnuje tego docs/shared/i18n/keys.test.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['fa'] = Object.assign(window.I18nData['fa'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. Pismo perskie
     nie zna wielkich liter, więc brzmi tak samo jak nazwa własna. */
  'app.wordmark': 'پایشگر نور',

  'state.idle': 'آماده',
  'state.starting': 'در حال راه‌اندازی',
  'state.running': 'اندازه‌گیری',
  'state.runningTpl': 'اندازه‌گیری {time}',
  'state.stopped': 'متوقف',
  'state.error': 'خطای دوربین',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5,0 po polsku, 5.0 po angielsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'شروع اندازه‌گیری',
  'keys.starting': 'در حال راه‌اندازی…',
  'keys.stop': 'توقف',
  'keys.flip': 'تعویض',
  'keys.flipAria': 'تعویض دوربین جلو و پشت',
  'keys.menu': 'منو',
  'keys.menuAria': 'فهرست ماژول‌ها',
  'keys.back': '‹ بازگشت',
  'keys.backAria': 'بازگشت به داشبورد',
  'keys.dash': 'داشبورد',
  'keys.zoom': 'بزرگ‌نمایی پیش‌نمایش',
  'keys.retry': 'تلاش دوباره',
  'keys.refresh': 'تازه‌سازی',
  'keys.close': 'بستن',
  'keys.show': 'نمایش',
  'keys.apply': 'اعمال',
  'keys.remove': 'حذف',

  'monitor.legend': 'پیش‌نمایش کنترلی',
  'monitor.badge': 'زنده',

  'aim.title': 'نشانه‌گیری',
  'aim.hint': 'کادر دقیقاً همان بخشی از تصویر را نشان می‌دهد که برنامه اندازه می‌گیرد.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'کانال اصلی',
  'readout.thresholdTpl': '(آستانه {value})',
  'readout.contextTpl': 'کمینه {min} · میانگین {avg} · بیشینه {max} — 60 ثانیهٔ اخیر',
  'readout.contextEmpty': 'بدون داده از 60 ثانیهٔ اخیر',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'این یعنی چه: {name}',
  'aria.channel': '{name}، {value}، {zone}. نمایش روی نشانگر بزرگ.',
  'aria.channelStale': '{name}، بدون داده. نمایش روی نشانگر بزرگ.',
  'aria.scale': 'مقیاس: {name}، از {min} تا {max}. اکنون {value}، {zone}. آستانهٔ احتیاط {warn}، آستانهٔ بحرانی {crit}.',
  'aria.readout': '{name}: {value}، {zone}.',
  'aria.readoutApprox': '{name}: حدود {value}، {zone}. مقدار تقریبی.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'مقیاس کانال اصلی. بدون داده',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': '«شروع اندازه‌گیری» را بزنید، گوشی را رو به سطحی نورخورده بگیرید و چند ثانیه بی‌حرکت نگه دارید.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'آسایش چشم پایین است. به ماژول 01 سر بزنید تا ببینید چه چیزی آن را پایین می‌آورد.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'با کلید «شروع اندازه‌گیری» در پایین صفحه آغاز کنید. دوربین تنها پس از فشردن آن روشن می‌شود.',
  'transient.measureStopped': 'اندازه‌گیری پایان یافت · {time} · در تاریخچه ذخیره شد.',
  'transient.newVersion': 'نسخهٔ تازه‌ای از برنامه هست.',
  'transient.thresholdsSaved': 'آستانه‌ها ذخیره شد.',
  'transient.thresholdsRejected': 'ذخیره نشد — آستانهٔ احتیاط و آستانهٔ بحرانی نمی‌توانند از هم بگذرند.',
  'transient.historyCleared': 'تاریخچه پاک شد.',

  'live.lead': 'کانال اصلی: {name}، {value}، {zone}.',
  'live.ready': 'داوری آماده است. {name} {value}، {zone}.',
  'live.started': 'اندازه‌گیری آغاز شد.',
  'livebar.stopped': 'اندازه‌گیری متوقف شد',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'هنوز هیچ ثبتی نیست. تاریخچه در حین اندازه‌گیری نوشته می‌شود — یک دقیقه اندازه‌گیری کنید و به اینجا برگردید.',
  'empty.recorderNoRange': 'در این بازه اندازه‌گیری‌ای نبوده است.',
  'empty.coverageTpl': 'اندازه‌گیری {done} ساعت از {total} ساعت را پوشش داد.',
  'empty.reportsNoData': 'گزارش روزانه پس از نخستین روز کامل با اندازه‌گیری ساخته می‌شود.',
  'empty.compareOneSession': 'برای مقایسه دو جلسهٔ پایان‌یافته لازم است. فعلاً یکی دارید.',
  'empty.exportNoData': 'چیزی برای خروجی گرفتن نیست. اندازه‌گیری را شروع کنید تا تاریخچه محتوایی داشته باشد.',
  'empty.alertsOff': 'هشدارها خاموش‌اند. پس از روشن‌کردن، تنها زمانی کار می‌کنند که برنامه باز باشد.',
  'empty.scheduleEmpty': 'هیچ ساعتی تعیین نشده است. زمان‌بندی تنها با برنامهٔ باز کار می‌کند.',
  'empty.historyEmpty': 'تاریخچه خالی است.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'فهرست ماژول‌ها',

  'modules.01.title': 'ضبط‌کننده',
  'modules.01.desc': 'روند اندازه‌گیری در طول زمان، از یک دقیقه تا سی روز.',
  'modules.02.title': 'آستانه‌ها',
  'modules.02.desc': 'آستانه‌های احتیاط و بحرانی خودتان را برای هر کمیت تعیین کنید.',
  'modules.03.title': 'کالیبراسیون',
  'modules.03.desc': 'مرجع‌گرفتن از منبع نور شناخته‌شده، و آنچه کالیبراسیون درست نمی‌کند.',
  'modules.04.title': 'گزارش‌ها',
  'modules.04.desc': 'جمع‌بندی روزانه و هفتگی به شکل یک برگهٔ چاپی.',
  'modules.05.title': 'خروجی',
  'modules.05.desc': 'ذخیرهٔ خوانش‌ها در فایل CSV یا JSON، با شرح ستون‌ها.',
  'modules.06.title': 'مقایسه',
  'modules.06.desc': 'دو جلسه کنار هم، با تفاوتی که عددی گفته می‌شود.',
  'modules.07.title': 'آزمون نمایشگر',
  'modules.07.desc': 'تصویرهای آزمون برای بررسی نمایشگر خودتان، گام‌به‌گام.',
  'modules.08.title': 'زمان‌بندی',
  'modules.08.desc': 'اندازه‌گیری در ساعت‌هایی که خودتان تعیین می‌کنید.',
  'modules.09.title': 'هشدارها',
  'modules.09.desc': 'اعلان پس از گذشتن از آستانه — و اینکه کِی کار نمی‌کند.',
  'modules.10.title': 'حمایت',
  'modules.10.desc': 'برنامه به‌تمامی رایگان است. اینجا می‌شود نویسنده را به قهوه مهمان کرد.',
  'modules.11.title': 'مستندات',
  'modules.11.desc': 'این اندازه‌گیری چه هست و به‌یقین چه نیست.',
  'modules.12.title': 'تنظیمات',
  'modules.12.desc': 'پوسته، اندازهٔ متن، کاهش حرکت، پاک‌کردن تاریخچه.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'کانال‌های اندازه‌گیری',
  'channels.pick': 'نمایش روی نشانگر بزرگ',
  'channels.stale': 'بدون داده',
  'channels.approx': 'مقدار تقریبی',

  'help.unit': 'واحد',
  'help.range': 'محدوده',
  'help.thresholds': 'آستانه‌ها',
  'help.warn': 'آستانهٔ احتیاط',
  'help.crit': 'آستانهٔ بحرانی',
  'help.now': 'اکنون',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „کمیت” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'کمیت',
  'col.unit': 'واحد',
  'col.range': 'محدوده',
  'col.direction': 'جهت',
  'col.time': 'ساعت',
  'col.date': 'تاریخ',
  'col.zone': 'منطقه',
  'col.avg': 'میانگین',
  'col.min': 'کمینه',
  'col.max': 'بیشینه',
  'col.name': 'ستون',
  'col.meaning': 'محتوا',
  'col.channel': 'کانال',
  'col.gain': 'بهره',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'بازهٔ زمانی',
  'recorder.range.60s': '60 ثانیه',
  'recorder.range.15min': '15 دقیقه',
  'recorder.range.1h': '1 ساعت',
  'recorder.range.24h': '24 ساعت',
  'recorder.range.30d': '30 روز',
  'recorder.gap': 'بدون اندازه‌گیری',
  'recorder.sessionTitle': 'آمار جلسه',
  'recorder.zonesCaption': 'توزیع منطقه‌ها برای سهم آبی',
  'recorder.tableCaption': 'خوانش‌های بازهٔ انتخاب‌شده',
  'recorder.crosshair': 'مکان‌نمای خوانش',
  'recorder.prevAria': 'نقطهٔ پیشین',
  'recorder.nextAria': 'نقطهٔ پسین',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'ظاهر',
  'settings.themeLabel': 'پوسته',
  'settings.themeSystem': 'مطابق سیستم',
  'settings.themeLight': 'روشن',
  'settings.themeDark': 'تیره',
  'settings.themeHint': 'پوستهٔ «مطابق سیستم» همراه با تنظیم گوشی تغییر می‌کند.',
  'settings.textLabel': 'اندازهٔ متن',
  /* Mnożnik jako LICZBA we wstawce — 1,15 po polsku, 1.15 po angielsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'کل رابط را بزرگ می‌کند، نه فقط حروف را — کلیدها و سطرها همراه با متن بزرگ می‌شوند.',
  'settings.motionGroup': 'حرکت',
  'settings.motionLabel': 'کاهش حرکت',
  'settings.motionHint': 'همهٔ گذارها را خاموش می‌کند. عقربهٔ مقیاس آن‌وقت به‌جای حرکت نرم، ثانیه‌ای یک بار می‌پرد.',
  'settings.dataTitle': 'داده‌ها',
  'settings.clearLabel': 'پاک‌کردن تاریخچه',
  'settings.clearHintTpl': 'اکنون {count} نقطهٔ ذخیره‌شده در تاریخچه هست.',
  'settings.clearHintEmpty': 'تاریخچه خالی است.',
  'settings.clearTitle': 'تاریخچه پاک شود؟',
  'settings.clearConfirm': 'کل تاریخچهٔ اندازه‌گیری پاک شود؟ این کار برگشت‌پذیر نیست.',
  'settings.clearKey': 'پاک کن',
  'settings.aboutTitle': 'دربارهٔ برنامه',
  'settings.versionTpl': '{app}، نسخهٔ {version}.',
  'settings.offlineText': 'برنامه بدون شبکه کار می‌کند. پس از نخستین باز شدن، همهٔ فایل‌هایش در حافظهٔ مرورگر می‌مانند، پس حالت پرواز چیزی را تغییر نمی‌دهد. چیزی به هیچ سروری فرستاده نمی‌شود، چون برنامه هیچ درخواست شبکه‌ای انجام نمی‌دهد.',
  'settings.docsKey': 'گشودن مستندات',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'انصراف',
  'common.save': 'ذخیره',
  'common.reset': 'بازگرداندن پیش‌فرض‌ها',
  'common.yes': 'بله',
  'common.no': 'خیر',
  'common.on': 'روشن',
  'common.off': 'خاموش',
  'common.sep': ' · ',
  'common.stepsTitle': 'گام‌به‌گام',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'آستانه‌های خودتان به چه کار می‌آید',
  'modules.02.intro': 'آستانه تعیین می‌کند برنامه کِی بگوید «احتیاط» و کِی بگوید «بحرانی». مقدارهای پیش‌فرض داوری تحریری ماست، نه یک استاندارد — اگر در شرایط دیگری اندازه می‌گیرید، آن‌ها را به‌اندازهٔ خودتان جابه‌جا کنید. داوری و جملهٔ روی داشبورد بی‌درنگ از آستانه‌های تازه محاسبه می‌شوند.',
  'modules.02.orderNormal': 'آستانهٔ احتیاط باید پایین‌تر از آستانهٔ بحرانی باشد.',
  'modules.02.orderInvert': 'اینجا مقدار بالاتر بهتر است، پس آستانهٔ احتیاط بالاتر از آستانهٔ بحرانی می‌ایستد.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'پیش‌نمایش مقیاس: {name}',
  'modules.02.nowTpl': 'اکنون {value}',
  'modules.02.resetDone': 'آستانه‌های پیش‌فرض بازگردانده شد.',
  'modules.02.profilesTitle': 'نمایه‌ها',
  'modules.02.profilesHint': 'نمایه مجموعه‌ای ذخیره‌شده از آستانه‌های هر هفت کمیت است. اعمال یک نمایه همه را یک‌جا جایگزین می‌کند.',
  'modules.02.profileSaveKey': 'ذخیرهٔ آستانه‌های کنونی',
  'modules.02.profileNameLabel': 'نام نمایهٔ تازه',
  'modules.02.profileNameHint': 'نام روی همین دستگاه می‌ماند. حداکثر 40 نویسه.',
  'modules.02.profileNameEmpty': 'نام نمایه را بنویسید.',
  'modules.02.profileSavedTpl': 'نمایهٔ «{name}» ذخیره شد.',
  'modules.02.profileAppliedTpl': 'نمایهٔ «{name}» اعمال شد.',
  'modules.02.profileRemovedTpl': 'نمایهٔ «{name}» حذف شد.',
  'modules.02.profileFailed': 'اعمال این نمایه ممکن نشد.',
  'modules.02.profileCustomTpl': 'نمایهٔ خودتان، ذخیره‌شده در {date}.',
  'modules.02.builtin.default.name': 'پیش‌فرض',
  'modules.02.builtin.default.desc': 'آستانه‌های فهرست کمیت‌ها — نقطهٔ آغاز همهٔ اندازه‌گیری‌ها.',
  'modules.02.builtin.evening.name': 'شب — ملایم',
  'modules.02.builtin.evening.desc': 'دربارهٔ رنگ سرد و اثر شبانه‌روزی زودتر هشدار می‌دهد.',
  'modules.02.builtin.work.name': 'کار پشت میز',
  'modules.02.builtin.work.desc': 'نور روزِ روشن و سرد را می‌پذیرد؛ سوسو زدن و یکنواختی را می‌پاید.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'چرا این کار می‌کند',
  'modules.03.why': 'حسگر دوربین میان کانال‌هایش انحرافی ثابت دارد. اندازه‌گرفتن یک برگ کاغذ سفید نشان می‌دهد این انحراف چقدر است و امکان کم‌کردن آن را می‌دهد. این تنها قابلیت این برنامه است که واقعاً دقت را بالا می‌برد — و باز هم دوربین را به طیف‌سنج تبدیل نمی‌کند.',
  'modules.03.steps.1': 'یک برگ کاغذ سفید زیر نوری که اندازه می‌گیرید بگذارید.',
  'modules.03.steps.2': 'روی داشبورد «شروع اندازه‌گیری» را بزنید و کادر را با کاغذ پر کنید.',
  'modules.03.steps.3': 'به اینجا برگردید، «کالیبره کن» را بزنید و سه ثانیه گوشی را تکان ندهید.',
  'modules.03.runKey': 'کالیبره کن (3 ثانیه)',
  'modules.03.clearKey': 'حذف کالیبراسیون',
  'modules.03.busyTpl': 'در حال اندازه‌گرفتن کاغذ… {sec} ثانیه مانده',
  'modules.03.statusNone': 'بدون کالیبراسیون. اندازه‌گیری کار می‌کند؛ مقدارها را مقایسه‌ای در نظر بگیرید.',
  'modules.03.statusOnTpl': 'کالیبره‌شده در {date} ساعت {time}.',
  'modules.03.gainsTitle': 'بهرهٔ کانال‌ها',
  'modules.03.gainR': 'قرمز',
  'modules.03.gainG': 'سبز',
  'modules.03.gainB': 'آبی',
  'modules.03.gainsNone': 'تنظیم‌نشده',
  'modules.03.needRunning': 'نخست اندازه‌گیری را شروع کنید و دوربین را رو به یک برگ کاغذ سفید بگیرید.',
  'modules.03.tooFew': 'نمونه‌ها کم است. بررسی کنید که اندازه‌گیری واقعاً در جریان باشد.',
  'modules.03.tooDark': 'تصویر برای کالیبراسیون بیش‌ازحد تاریک است. کاغذ را بهتر روشن کنید و دوباره تلاش کنید.',
  'modules.03.refused': 'انحراف کانال‌ها بزرگ‌تر از آن است که کالیبراسیون به شمار آید. از کاغذ سفید در نوری یکنواخت استفاده کنید.',
  'modules.03.done': 'کالیبره شد. دمای رنگ و اثر شبانه‌روزی از این پس دقیق‌تر خواهند بود.',
  'modules.03.cleared': 'کالیبراسیون حذف شد.',
  'modules.03.limitsTitle': 'کالیبراسیون چه چیزی را درست نمی‌کند',
  'modules.03.limits.1': 'کالیبراسیون سه کانال دوربین را هم‌تراز می‌کند و بیش از این کاری نمی‌کند. به دوربین طیف نمی‌دهد، پس دمای رنگ و اثر شبانه‌روزی تقریب‌هایی می‌مانند که از رنگ‌های پایهٔ sRGB محاسبه می‌شوند.',
  'modules.03.limits.2': 'روشنایی صحنه را به کمیتی مطلق تبدیل نمی‌کند — آن عدد نسبی می‌ماند. نوردهی خودکار و توازن سفیدی خودکار را هم خاموش نمی‌کند، و همان‌ها خوانش را از زیر جابه‌جا می‌کنند.',
  'modules.03.limits.3': 'به نور دیگری منتقل نمی‌شود: کالیبراسیونی که زیر یک لامپ انجام شده همان لامپ را توصیف می‌کند. با منبعی دیگر آن را تکرار کنید. و چیزی را در اینکه این اندازه‌گیری چه نیست تغییر نمی‌دهد — باز هم معاینه نیست و باز هم مبنای تشخیص بیماری نیست.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'دورهٔ گزارش',
  'modules.04.rangeDay': 'شبانه‌روز',
  'modules.04.rangeWeek': 'هفته',
  'modules.04.headTpl': 'از {from} تا {to} · {count} نقطهٔ تاریخچه.',
  'modules.04.tableTitle': 'جمع‌بندی',
  'modules.04.tableCaption': 'میانگین، کمینه و بیشینه در دورهٔ انتخاب‌شده',
  'modules.04.panoramaTitle': 'پانوراما',
  'modules.04.panoramaAriaTpl': 'پانوراما: {name}، {span}.',
  'modules.04.panoramaSpanDay': 'شبانه‌روز اخیر به تفکیک ساعت',
  'modules.04.panoramaSpanWeek': 'هفتهٔ اخیر به تفکیک روز',
  'modules.04.panoramaHint': 'بلندی و رنگ ستون یک چیز می‌گویند: در محدوده — کوتاه، احتیاط — میانه، بحرانی — پر. خط کوچک کنار پایه یعنی ساعتی بدون اندازه‌گیری.',
  'modules.04.coverageDayTpl': 'اندازه‌گیری {done} ساعت از {total} ساعت را پوشش داد.',
  'modules.04.coverageWeekTpl': 'اندازه‌گیری {done} روز از {total} روز را پوشش داد.',
  'modules.04.zonesTitle': 'توزیع منطقه‌ها',
  'modules.04.zonesCaptionTpl': 'محاسبه‌شده برای کانال اصلی: {name}.',
  'modules.04.worstTpl': 'دشوارترین زمان: {value}.',
  'modules.04.worstNone': 'چیزی برجسته نیست',
  'modules.04.worstHourTpl': 'ساعت {hour}',
  'modules.04.adviceTitle': 'با این چه کنیم',
  'modules.04.adviceMelanopicTpl': 'میانگین اثر شبانه‌روزی {value}× بود. شب‌ها بهتر است زیر 0.50 بروید — ساده‌ترین راه، لامپ گرم‌تر یا حالت شب است.',
  'modules.04.adviceKelvinTpl': 'نور سرد بود (به‌طور میانگین {value} K). برای کار بی‌عیب است؛ دو ساعت پیش از خواب، زیر 3000 K ملایم‌تر است.',
  'modules.04.adviceFlickerTpl': 'سوسو زدن محسوسی دیده می‌شود (به‌طور میانگین {value}%). معمولاً کار دیمر ارزان یا مبدل نور پس‌زمینه است.',
  'modules.04.adviceUniformityTpl': 'نور ناهموار پخش شده است ({value}%). جابه‌جاکردن چراغ یا تغییر زاویهٔ آن معمولاً بیش از عوض‌کردن لامپ اثر دارد.',
  'modules.04.adviceWorstTpl': 'بیشتر خوانش‌های بیرون از آستانه‌ها در ساعت {hour} جمع شده‌اند.',
  'modules.04.adviceNone': 'در این دوره چیزی از آستانه‌هایی که تعیین کرده‌اید فراتر نمی‌رود.',
  'modules.04.limitsTitle': 'این توصیهٔ سلامت نیست',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'نتیجه‌گیری‌ها تنها از آنچه دوربین این گوشی دیده است برمی‌آید. برنامه طیف را اندازه نمی‌گیرد و هیچ تشخیصی نمی‌دهد.',
  'modules.04.printHint': 'این صفحه مانند یک برگهٔ چاپی چیده شده است: جدول و زیرنویس‌ها روی کاغذ، زیر ذره‌بین سیستم و در صفحه‌خوان یکسان خوانده می‌شوند.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'بازهٔ داده‌ها',
  'modules.05.range1h': 'ساعت',
  'modules.05.range24h': 'شبانه‌روز',
  'modules.05.range7d': '7 روز',
  'modules.05.range30d': '30 روز',
  'modules.05.csvKey': 'ذخیرهٔ فایل CSV',
  'modules.05.jsonKey': 'ذخیرهٔ فایل JSON',
  'modules.05.formatTitle': 'قالب فایل',
  'modules.05.formatCsv': 'CSV: نقطه‌ویرگول ستون‌ها را جدا می‌کند، ویرگول جداکنندهٔ اعشار است و رمزگذاری UTF-8 با نشانهٔ BOM. اکسلی که زبانش ویرگول را جداکنندهٔ اعشار می‌داند چنین فایلی را بدون هیچ تنظیمی باز می‌کند.',
  'modules.05.formatJson': 'JSON: همان داده‌ها در فیلد «points»، با نقطهٔ اعشار و مُهر زمانی برحسب میلی‌ثانیه — قالب همین را می‌خواهد.',
  'modules.05.resolution': 'تاریخچه هر 5 ثانیه یک نقطه ذخیره می‌کند و تا 30 روز عقب می‌رود. تفکیک کامل پنج نمونه در ثانیه در فایل نیست — موتور آن را تنها یک دقیقه نگه می‌دارد.',
  'modules.05.offline': 'فایل در دستگاه ساخته می‌شود و در دستگاه می‌ماند. خروجی گرفتن به هیچ شبکه‌ای وصل نمی‌شود.',
  'modules.05.columnsTitle': 'شرح ستون‌ها',
  'modules.05.columnsCaption': 'ستون‌های فایل و معنای آن‌ها',
  'modules.05.descDate': 'تاریخ نقطه از ساعت دستگاه، به شکل روز-ماه-سال.',
  'modules.05.descTime': 'ساعت نقطه با دقت ثانیه.',
  'modules.05.descZone': 'منطقهٔ سهم آبی در لحظهٔ ذخیره. موتور منطقه را تنها برای همین یک کمیت ذخیره می‌کند — برای بقیه آن را از آستانه‌ها حساب کنید.',
  'modules.05.descMetricTpl': '{short} واحد: {unit}. محدوده {min}–{max}.',
  'modules.05.previewTitle': 'پیش‌نمایش',
  'modules.05.previewHint': 'پنج سطر نخست فایل، دقیقاً همان‌طور که ذخیره خواهند شد.',
  'modules.05.savedTpl': 'فایل {name} ذخیره شد — {rows} سطر.',
  'modules.05.failed': 'این مرورگر اجازهٔ ذخیرهٔ فایل را نداد.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'برنامه هر جلسهٔ اندازه‌گیری پایان‌یافته را روی همین دستگاه ذخیره می‌کند. دو تا را انتخاب کنید تا آن‌ها را روی یک نوار ببینید و تفاوت را عددی بخوانید.',
  'modules.06.noSessions': 'هنوز هیچ جلسهٔ پایان‌یافته‌ای نیست. اندازه‌گیری را شروع کنید، متوقفش کنید و به اینجا برگردید.',
  'modules.06.slotA': 'جلسهٔ A',
  'modules.06.slotB': 'جلسهٔ B',
  'modules.06.sessionTpl': '{date}، {time} · {dur}',
  'modules.06.tapeTitle': 'نوار',
  'modules.06.tapeAriaTpl': 'روند جلسهٔ {slot}، کمیت {name}.',
  'modules.06.tapeHint': 'هر دو جلسه روی یک عرض کشیده شده‌اند: هر ستون همان کسر از مدت است، نه همان ساعت. بلندی و رنگ همان چیزی را می‌گویند که روی داشبورد.',
  'modules.06.tapeChannelTpl': 'نوار کانال اصلی را نشان می‌دهد: {name}.',
  'modules.06.diffTitle': 'تفاوت',
  'modules.06.diffCaption': 'میانگین هر دو جلسه و تفاوت میان آن‌ها',
  'modules.06.clearKey': 'حذف جلسه‌های ذخیره‌شده',
  'modules.06.cleared': 'جلسه‌های ذخیره‌شده حذف شد.',
  'modules.06.savedTpl': 'جلسه ذخیره شد: {dur}.',
  'modules.06.limitsTitle': 'این مقایسه چه چیزی نمی‌گوید',
  'modules.06.limits': 'شما دو اندازه‌گیری را مقایسه می‌کنید، نه دو منبع نور. اگر میان دو جلسه کادر، فاصله، ساعت روز یا وضعیت گوشی عوض شده باشد، تفاوت دربارهٔ آن هم هست. صادقانه‌ترین مقایسه، همان صحنه پیش و پس از تغییر روشنایی است.',
  'modules.06.keepTpl': 'حداکثر {count} جلسهٔ اخیر به یاد می‌ماند.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'تصویرهای آزمون تمام‌صفحهٔ همین دستگاه نمایش داده می‌شوند. برای نگاه‌کردن به نمایشگر با چشم خودتان‌اند: اینکه سفید یکنواخت است یا نه، اینکه خاکستری‌ها به رنگی نمی‌زنند و اینکه نور پس‌زمینه از گوشه‌ها نشت نمی‌کند.',
  'modules.07.steps.1': 'روشنایی نمایشگر را روی همان مقداری بگذارید که معمولاً با آن کار می‌کنید و حالت شب سیستم را خاموش کنید.',
  'modules.07.steps.2': 'یک تصویر را از فهرست پایین انتخاب کنید. تمام صفحه را پر می‌کند.',
  'modules.07.steps.3': 'از حدود شصت سانتی‌متری و عمود بر نمایشگر نگاه کنید. سپس همان تصویر را از زاویه ببینید.',
  'modules.07.steps.4': 'با کلید «بستن تصویر» یا کلید Escape بیرون بیایید و به تصویر بعدی بروید.',
  'modules.07.planesTitle': 'تصویرهای آزمون',
  'modules.07.exitKey': 'بستن تصویر',
  'modules.07.showAriaTpl': 'نمایش تصویر آزمون: {name}',
  'modules.07.planeAriaTpl': 'تصویر آزمون: {name}. کلید بستن در پایین صفحه است.',
  'modules.07.plane.white.name': 'سفید',
  'modules.07.plane.white.hint': 'دنبال لکه‌ها، ته‌رنگ‌ها و روشن‌تر شدن‌ها نزدیک لبه‌ها بگردید. سفید باید در تمام سطح یک رنگ باشد.',
  'modules.07.plane.gray75.name': 'خاکستری 75%',
  'modules.07.plane.gray75.hint': 'خاکستری باید خاکستری باشد. ته‌رنگ سبز یا صورتی یعنی توازن سفیدی نمایشگر جابه‌جا شده است.',
  'modules.07.plane.gray50.name': 'خاکستری 50%',
  'modules.07.plane.gray50.hint': 'بهترین تصویر برای داوری دربارهٔ ته‌رنگ. میانه را با گوشه‌ها مقایسه کنید.',
  'modules.07.plane.gray25.name': 'خاکستری 25%',
  'modules.07.plane.gray25.hint': 'خاکستری تیره نشت نور پس‌زمینه و نوارهای پنل‌های ارزان را آشکار می‌کند.',
  'modules.07.plane.black.name': 'سیاه',
  'modules.07.plane.black.hint': 'در اتاق تاریک اینجا هر نشت نور پس‌زمینه و هر گوشهٔ روشن‌شده دیده می‌شود.',
  'modules.07.plane.red.name': 'قرمز خالص',
  'modules.07.plane.red.hint': 'قرمز یکدست، زیرپیکسل‌های مرده و ناهمواری پنل را آشکار می‌کند.',
  'modules.07.plane.green.name': 'سبز خالص',
  'modules.07.plane.green.hint': 'سبز بیشترین روشنایی را می‌برد — پیکسل معیوب را روی آن ساده‌تر از همه می‌شود دید.',
  'modules.07.plane.blue.name': 'آبی خالص',
  'modules.07.plane.blue.hint': 'آبی گردوغبار و رد و لکه روی سطح نمایشگر را بهتر از سفید نشان می‌دهد.',
  'modules.07.plane.grid.name': 'شبکه',
  'modules.07.plane.grid.hint': 'خط‌ها باید در گوشه‌ها به‌اندازهٔ میانه تیز باشند. تاری در لبه‌ها به مقیاس‌گذاری تصویر مربوط است.',
  'modules.07.warn': 'تصویر آزمون تمام صفحه را می‌پوشاند، از جمله داشبورد کنترل را با کلید اندازه‌گیری. این تنها جای برنامه است که چنین می‌شود، و به همین دلیل کلید خروج بزرگ و همیشه دیدنی است. تا وقتی تصویر روی صفحه است اندازه‌گیری ادامه دارد و نمی‌شود متوقفش کرد — برای بازگشت به کلیدها تصویر را ببندید.',
  'modules.07.cameraTitle': 'اینجا چه کاری نمی‌شود کرد',
  'modules.07.camera': 'گوشی نمایشگر خودش را نمی‌بیند، پس این تصویرها را با همین دستگاه نمی‌توانید اندازه بگیرید. برای اندازه‌گرفتن یک نمایشگر، تصویر را روی نمایشگر نشان دهید و اندازه‌گیری را با گوشی انجام دهید — دو دستگاه متفاوت و دو نقش متفاوت.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'زمان‌بندی در ساعتی که تعیین کرده‌اید اندازه‌گیری را یادآوری می‌کند. دوربین را خودش روشن نمی‌کند: در ساعت مقرر یادآوری نشان می‌دهد و اندازه‌گیری را شما با کلید «شروع اندازه‌گیری» روی داشبورد آغاز می‌کنید. درست مانند بار نخست.',
  'modules.08.onlyOpenTitle': 'کِی این کار نمی‌کند',
  'modules.08.onlyOpen': 'زمان‌بندی تنها با برنامهٔ باز کار می‌کند. زبانهٔ بستهٔ مرورگر زمان نمی‌شمارد و چیزی را یادآوری نمی‌کند. ما اجازهٔ اعلان‌های سیستمی نمی‌خواهیم و چیزی به شبکه نمی‌فرستیم.',
  'modules.08.enableLabel': 'روشن‌کردن یادآوری‌ها',
  'modules.08.timesTitle': 'ساعت‌ها',
  'modules.08.timeAriaTpl': 'ساعت {n}: زمان یادآوری',
  'modules.08.addKey': 'افزودن ساعت',
  'modules.08.removeAriaTpl': 'حذف ساعت {time}',
  'modules.08.addedTpl': 'ساعت {time} افزوده شد.',
  'modules.08.removedTpl': 'ساعت {time} حذف شد.',
  'modules.08.badTime': 'ساعت را به قالب 22:00 بنویسید.',
  'modules.08.nextTpl': 'نزدیک‌ترین یادآوری: {time}.',
  'modules.08.nextNone': 'یادآوری‌ها خاموش‌اند.',
  'modules.08.dueTpl': 'زمان زمان‌بندی‌شدهٔ اندازه‌گیری: {time}.',
  'modules.08.dueKey': 'نمایش داشبورد',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'هشدار یک کمیت را می‌پاید و تنها وقتی صدا می‌کند که آن کمیت منطقهٔ انتخاب‌شده را بی‌وقفه به‌اندازهٔ زمانی که تعیین کرده‌اید نگه دارد. هرگز اندازه‌گیری را متوقف نمی‌کند و هرگز جلوی کلیدها را نمی‌گیرد.',
  'modules.09.enableLabel': 'روشن‌کردن هشدارها',
  'modules.09.metricLabel': 'کمیت زیر نظر',
  'modules.09.levelLabel': 'از کدام منطقه',
  'modules.09.levelWarning': 'از احتیاط به بالا',
  'modules.09.levelCritical': 'فقط بحرانی',
  'modules.09.sustainLabel': 'پس از چند ثانیه بی‌وقفه',
  'modules.09.sustainHint': 'زمان‌های کوتاه‌تر هنگام جابه‌جاکردن گوشی هشدارهای نادرست بیشتری می‌دهند. از پنج ثانیه پایین‌تر نمی‌رویم.',
  'modules.09.soundLabel': 'بوق کوتاه',
  'modules.09.soundHint': 'صدا در دستگاه ساخته می‌شود. چیزی از شبکه دانلود نمی‌شود.',
  'modules.09.cooldownHint': 'حداکثر یک هشدار در هر دو دقیقه. هشداری که در هر نمونه تکرار شود، هشداری است که برای همیشه خاموش می‌شود.',
  'modules.09.whenNotTitle': 'کِی هشدار کار نمی‌کند',
  'modules.09.whenNot': 'اعلان درون برنامه است، نه در سیستم. وقتی برنامه بسته یا در پس‌زمینه پنهان باشد کار نمی‌کند، وقتی اندازه‌گیری در جریان نباشد کار نمی‌کند، و وقتی کمیت زیر نظر در آن لحظه اندازه‌گیری‌پذیر نباشد هم کار نمی‌کند. ما اجازهٔ اعلان‌های سیستمی نمی‌خواهیم.',
  'modules.09.firedTpl': '{name}: {zone} از {sec} ثانیه — اکنون {value}.',
  'modules.09.saved': 'تنظیمات هشدار ذخیره شد.',
  'modules.09.statusOnTpl': 'زیر نظر: {name}، {level}، پس از {sec} ثانیه.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'این برنامه رایگان است',
  'support.freeText': 'هر هفت کمیت از نخستین اجرا عدد نشان می‌دهند. ضبط‌کننده، آستانه‌ها، کالیبراسیون، گزارش‌ها، خروجی، مقایسهٔ جلسه‌ها و کل تاریخچهٔ سی‌روزه بدون حساب، بدون هزینه و بدون محدودیت کار می‌کنند — بدون شبکه هم همین‌طور. چیزی اینجا برای بعد و در برابر پرداخت کنار گذاشته نشده است.',
  'support.whyTitle': 'چرا این را می‌خواهم',
  'support.whyText': 'پایشگر نور را خودم و بعد از ساعت کاری می‌سازم و نگه می‌دارم. حمایت صرف وقتی می‌شود که رفع اشکال‌ها، آزمودن روی گوشی‌های بیشتر و ابزارهای بعدی در فهرست ماژول‌ها لازم دارند. اگر کسی چیزی نپردازد، هیچ‌چیز از کار نمی‌افتد.',
  'support.nothingTitle': 'کمک مالی چه چیزی می‌دهد',
  'support.nothingText': 'هیچ. هیچ عدد، هیچ ماژول و هیچ تنظیمی پس از کمک مالی باز نمی‌شود، چون همه‌چیز از همان ابتدا باز است. تنها همین می‌ماند که بدانم به کار کسی آمده است.',
  'support.keyTitle': 'اگر دوست دارید کمک کنید',
  'support.keyLabel': 'یک قهوه مهمانم کنید',
  'support.keyAria': 'یک قهوه مهمانم کنید — صفحه‌ای بیرونی را در زبانه‌ای تازه باز می‌کند',
  'support.serviceText': 'نمایهٔ کمک مالی را سرویسی بیرونی اداره می‌کند، برای نمونه Buy Me a Coffee. برنامه هیچ اسکریپت، ابزارک یا تصویری از آن بارگذاری نمی‌کند — اینجا فقط یک پیوند ساده ایستاده است و بس.',
  'support.privacyText': 'فشردن این کلید صفحه‌ای بیرونی را در زبانه‌ای تازه باز می‌کند و این تنها لحظه‌ای است که چیزی این دستگاه را ترک می‌کند. اندازه‌گیری‌ها، تاریخچه و تنظیمات همان‌جا می‌مانند که بودند — در حافظهٔ همین مرورگر.',
  'support.privacyPendingText': 'وقتی نشانی آماده شد، فشردن کلید صفحه‌ای بیرونی را در زبانه‌ای تازه باز می‌کند و آن تنها لحظه‌ای خواهد بود که چیزی این دستگاه را ترک می‌کند. اندازه‌گیری‌ها، تاریخچه و تنظیمات همان‌جا می‌مانند که بودند — در حافظهٔ همین مرورگر.',
  'support.emptyTitle': 'نمایه هنوز وصل نشده است',
  'support.emptyText': 'نشانی نمایهٔ کمک مالی هنوز نوشته نشده است، پس اینجا کلیدی نیست که به جایی نرساند. بقیهٔ برنامه بدون تغییر کار می‌کند — چیزی چشم‌به‌راه این کمک مالی نیست.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'این برنامه چه چیزی را اندازه نمی‌گیرد',
  'docs.notList.1': 'طیف را اندازه نمی‌گیرد. دوربین سه کانال رنگی پهن، نوردهی خودکار و توازن سفیدی خودکار دارد.',
  'docs.notList.2': 'مقدارهای مطلق را اندازه نمی‌گیرد. روشنایی صحنه شاخصی نسبی است، نه نتیجهٔ اندازه‌گیری فوتومتری.',
  'docs.notList.3': 'دمای رنگ را مستقیم اندازه نمی‌گیرد. دمای رنگ و اثر شبانه‌روزی تقریب‌هایی هستند که از رنگ‌های پایهٔ sRGB محاسبه می‌شوند.',
  'docs.notList.4': 'سوسوی برق شهری را نمی‌بیند. نمونه‌برداری 5 Hz تپش را تنها زیر 2.5 Hz می‌بیند — سوسوی 100 Hz برق شهری خارج از دسترس است و برنامه هرگز آن را به‌عنوان نتیجه گزارش نمی‌کند.',
  'docs.notList.5': 'تشخیص نمی‌دهد و توصیهٔ سلامت نمی‌کند. هیچ نتیجه‌ای هیچ‌کدام از این دو نیست.',
  'docs.notList.6': 'نور شما را با هیچ مرجع رسمی‌ای مقایسه نمی‌کند. آستانه‌ها تنظیم‌هایی هستند که می‌توانید در ماژول 02 عوضشان کنید.',
  'docs.whatTitle': 'چه چیزی را و چگونه اندازه می‌گیرد',
  'docs.whatLead': 'دوربین گوشی به سطحی نورخورده نگاه می‌کند و برنامه پنج بار در ثانیه میانگین کانال‌های R، G و B را از بخش میانی کادر می‌گیرد. از این سه عدد هفت شاخص به دست می‌آورد.',
  'docs.whatCrop': 'این بخش، 60% میانی عرض و 60% میانی ارتفاع فریم است — دقیقاً همان مستطیلی که نشانه‌گر روی صفحهٔ «نشانه‌گیری» دورش را می‌کشد. بیرون از آن چیزی شمرده نمی‌شود.',
  'docs.whatRate': 'یک نمونه هر 200 ms، یعنی 5 بار در ثانیه. دقیقهٔ اخیر با تفکیک کامل در حافظه می‌ماند؛ هرچه قدیمی‌تر است هر 5 ثانیه ذخیره می‌شود و تا سی روز عقب می‌رود.',
  'docs.metricsTitle': 'هفت کمیت',
  'docs.formulasTitle': 'فرمول‌ها',
  'docs.formula.share.formula': 'سهم آبی = B / (R + G + B) × 100%',
  'docs.formula.share.text': 'روی مقدارهای sRGB و بدون معکوس‌کردن گاما محاسبه می‌شود — عمداً، چون همان تعریفی است که در نسخهٔ پیشین برنامه بود و آستانه‌هایی که آن‌وقت تعیین شده‌اند هنوز همان معنا را دارند. رنگ را از روشنایی جدا می‌کند.',
  'docs.formula.brightness.formula': 'روشنایی = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': 'میانگین مقدار کانال‌ها به‌صورت درصدی از محدوده. نوردهی خودکار آن را از زیر جابه‌جا می‌کند، پس شاخصی نسبی است — دو صحنه را با هم مقایسه کنید و یک عدد تنها را نتیجهٔ اندازه‌گیری نخوانید.',
  'docs.formula.kelvin.title': 'دمای رنگ — تقریب مک‌کامی',
  'docs.formula.kelvin.formula': 'n = (x − 0.3320) / (y − 0.1858)\nCCT = −449 n³ + 3525 n² − 6823.3 n + 5520.33',
  'docs.formula.kelvin.text': 'نخست گامای sRGB را معکوس می‌کنیم، سپس با ماتریس به CIE XYZ برای سفید D65 می‌رویم و رنگ‌مایهٔ x و y را حساب می‌کنیم. فرمول مک‌کامی تقریباً میان 2000 K و 12500 K قابل اعتماد است. بیرون از این محدوده، چندجمله‌ای درجه‌سه از مسیر خارج می‌شود، پس نتیجه بریده و به‌عنوان غیرقابل‌اعتماد نشانه‌گذاری می‌شود — آن‌وقت خط پایهٔ مقیاس خط‌چین می‌شود و جملهٔ «خارج از محدودهٔ روش» می‌آید.',
  'docs.formula.melanopic.title': 'اثر شبانه‌روزی — نسبت ملانوپیک',
  'docs.formula.melanopic.formula': 'mel = 0.0016 R + 0.3110 G + 0.8460 B\nY = 0.2127 R + 0.7152 G + 0.0722 B\nنتیجه = (mel / Y) × بهنجارش به 1.00 برای سفید خنثی',
  'docs.formula.melanopic.text': 'هر سه کانال با مقدارهای خطی. کمیت واقعی، انتگرال طیف با منحنی حساسیت ملانوپسین است (اوج نزدیک 490 nm)؛ دوربین سه کانال پهن دارد، پس رنگ‌های پایهٔ sRGB را با حساسیت ملانوپیک در طول‌موج‌های تقریبی‌شان وزن می‌دهیم (R 612 nm، G 549 nm، B 465 nm). جهت تغییرها قابل اعتماد است، مقدار مطلق نه — به همین دلیل کنار این عدد نشانهٔ «≈» می‌ایستد.',
  'docs.formula.flicker.formula': 'سوسو زدن = (max − min) / (max + min) × 100%',
  'docs.formula.flicker.text': 'تعریف IES، محاسبه‌شده از پنجره‌ای از نمونه‌های روشنایی. بسامد را از شمار گذرهای سیگنال از مقدار میانگین تخمین می‌زنیم. نمونه‌برداری 5 Hz تنها مدولاسیون زیر 2.5 Hz را می‌بیند (حد نایکوئیست)، و بسامد را تنها میان 0.2 تا 2 Hz و با دامنهٔ 0.5% به بالا قابل اعتماد می‌دانیم — زیر این آستانه، گذرها از میانگین نوفهٔ حسگر است، نه تپش منبع.',
  'docs.formula.uniformity.formula': 'یکنواختی = تاریک‌ترین خانه / روشن‌ترین خانه × 100%',
  'docs.formula.uniformity.text': 'این بخش را به نُه خانه در شبکه‌ای 3×3 تقسیم می‌کنیم و دو سر آن را مقایسه می‌کنیم. 100% یعنی نوری که کاملاً یکنواخت پخش شده است. مقدار پایین روی نمایشگر یعنی نشت نور پس‌زمینه یا بازتاب، و روی میز یعنی چراغی که بد گذاشته شده است. این تنها کمیتی است که همراه با آسایش چشم، بالاتر در آن یعنی بهتر.',
  'docs.formula.comfort.formula': '100 امتیاز منهای جریمه‌ها:\nاثر شبانه‌روزی بالای 0.75 — تا 35 امتیاز\nرنگ بالای 4000 K — تا 25 امتیاز\nسوسو زدن بالای 5% — تا 25 امتیاز\nیکنواختی زیر 60% — تا 15 امتیاز',
  'docs.formula.comfort.text': 'یک داوری به جای شش عدد. کمیتی که نشد اندازه‌اش گرفت هیچ جریمه‌ای نمی‌دهد — نبود داده هرگز خود را نتیجهٔ خوب جا نمی‌زند. وزن‌ها داوری تحریری ماست، نه یک استاندارد؛ به همین دلیل ماژول 01 تفکیک به مؤلفه‌ها را نشان می‌دهد تا بشود با این داوری موافق نبود.',
  'docs.rangesTitle': 'محدوده‌ها و آستانه‌ها',
  'docs.rangesLead': 'آستانه‌های زیر همان‌هایی هستند که همین حالا برقرارند — اگر آن‌ها را در ماژول 02 عوض کرده‌اید، جدول مقدارهای شما را نشان می‌دهد، نه مقدارهای کارخانه را.',
  'docs.dirNormal': 'پایین‌تر یعنی ملایم‌تر',
  'docs.dirInvert': 'بالاتر یعنی بهتر',
  'docs.privacyTitle': 'داده‌ها و حریم خصوصی',
  'docs.privacyText': 'تصویر دوربین نه به جایی فرستاده می‌شود و نه جایی ذخیره — از هر فریم تنها سه عدد می‌ماند. اندازه‌گیری‌ها، آستانه‌ها و تنظیمات در حافظهٔ مرورگر روی همین دستگاه می‌مانند. برنامه هیچ درخواست شبکه‌ای انجام نمی‌دهد و بدون شبکه کار می‌کند.',
  'docs.mdrTitle': 'سلب مسئولیت',
  'docs.freeText': 'برنامه به‌تمامی رایگان است و همین‌طور می‌ماند: هر هفت کمیت، تاریخچه، گزارش‌ها، خروجی و کار بدون شبکه، بدون حساب، بدون هزینه و بدون محدودیت کار می‌کنند. هر که بخواهد تشکر کند، ماژول 10 «حمایت» را می‌یابد.',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'برنامه ناقص بارگذاری شد',
  'boot.filesTpl': 'این فایل‌ها بارگذاری نشدند: {list}.',
  'boot.modulesTpl': 'این ماژول‌ها اعلام حضور نکردند: {list} — این مدخل‌ها از فهرست باز نمی‌شوند.',
  'boot.modulesRangeTpl': 'ماژول‌های {from}–{to}',
  'boot.tail': 'صفحه را دوباره بارگذاری کنید. اگر کمک نکرد، فایل‌های روی سرور ناقص‌اند.',
  'boot.loss.bus': 'ماژول‌ها دیگر همدیگر را نمی‌بینند و اندازه‌گیری راه نمی‌افتد',
  'boot.loss.metrics': 'هیچ مقداری محاسبه نمی‌شود',
  'boot.loss.scaleCore': 'هندسهٔ مقیاس و قالب‌بندی عددها از بین می‌رود',
  'boot.loss.scaleText': 'همهٔ نوشته‌های رابط از بین می‌رود',
  'boot.loss.shell': 'هیچ ماژولی باز نمی‌شود',
  'boot.loss.engine': 'دوربین و اندازه‌گیری راه نمی‌افتند',
  'boot.loss.dash': 'داشبورد خالی می‌ماند'
});
