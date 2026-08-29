/* Monitor Światła v5 — słownik perski (فارسی).
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr). NIE JEST
 * kalką żadnego z nich: polskie i angielskie zdania przełożono na naturalną
 * perszczyznę literacką, a nie słowo w słowo. Zachowane zostało to, co niesie
 * znaczenie: liczby, progi, jednostki, nazwy wstawek i — co do treści —
 * zastrzeżenia medyczne oraz zdania o prywatności. Tych ostatnich nie wolno
 * osłabiać ani wzmacniać: „nie zastępuje rozmowy z lekarzem” ma po persku
 * znaczyć dokładnie tyle samo, a „obraz nie opuszcza urządzenia” nie może stać
 * się obietnicą szerszą niż polska.
 *
 * PISMO OD PRAWEJ DO LEWEJ. W napisach NIE MA znaków sterujących kierunkiem
 * (U+200E, U+200F, U+202A…U+202E): kierunkiem zarządza atrybut `dir` na
 * dokumencie (js/i18n/index.js zna perski jako 'rtl'). Znak minus przy
 * etykiecie osi (U+2212) i mnożenie (×) zostają tam, gdzie stoją w pozostałych
 * słownikach — algorytm dwukierunkowy sam przestawia je na właściwą stronę.
 * Jest za to ZWNJ (U+200C) w wyrazach złożonych: می‌شود, اندازه‌گیری,
 * شبانه‌روزی — to zwykła ortografia perska, nie znak sterujący.
 *
 * CYFRY SĄ PERSKIE (۰۱۲۳۴۵۶۷۸۹), bo `Intl.NumberFormat('fa')` domyślnie takich
 * używa (numberingSystem: 'arabext'), a separatorem dziesiętnym jest U+066B —
 * stąd „۰٫۵۰” i „۱٫۰۰” w zdaniach, nie „0,50”. Liczba wpisana w słowniku
 * cyframi łacińskimi stałaby obok liczby sformatowanej przez ICU i wyglądałaby
 * jak zlepek dwóch systemów.
 *
 * MIESIĄCE SĄ GREGORIAŃSKIE, nie z kalendarza perskiego: format.js woła
 * 'date.month.short.N' numerem z Date.getMonth(). Perski nie skraca nazw
 * miesięcy gregoriańskich, więc stoją tu w pełnym brzmieniu.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych):
 *   سهم آبی (udział niebieskiego), روشنایی صحنه (jasność sceny),
 *   دمای رنگ (temperatura barwowa), اثر بر ریتم شبانه‌روزی (wpływ na rytm
 *   dobowy; w opisie: نسبت ملانوپیک — współczynnik melanopiczny),
 *   سوسوزدن (migotanie), یکنواختی (równomierność),
 *   آسایش بصری (komfort wzrokowy).
 * Osobno rozdzielone: اندازه‌گیری (pomiar, czynność) i شاخص (mierzona
 * wielkość); نشانگر to duży wskaźnik, تاریخچه to historia, جلسه to sesja.
 * „Powłoka” aplikacji to چارچوب برنامه, bo پوسته zajęte jest przez motyw.
 * STREFY: ایمن / متوسط / مضر — tak samo jak angielskie safe / moderate /
 * harmful mówią o świetle, a nie o stanie aplikacji, i wchodzą w zdanie
 * „منطقه: {zone}”.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Tekst ze wstawką {nazwa}'   — napis zwykły,
 *   'klucz.kropkowany': { one, other }               — forma zależna od liczby.
 * Perski ma w CLDR dwie formy: `one` i `other`, i obie muszą tu być — sprawdza
 * to keys.test.js przez Intl.PluralRules('fa'). Rzeczownik po liczebniku się
 * w perskim nie odmienia, więc obie formy są tym samym słowem; kategorii mimo
 * to nie wolno pominąć. Nazwy wstawek są identyczne jak w pl.js; kolejność
 * wstawek w zdaniu wolno zmieniać, nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'پایشگر نور',
  'app.description': 'پایشگر نور — دوربین شما هفت شاخص از نور پیرامونتان را اندازه می‌گیرد. همه‌چیز روی همین دستگاه محاسبه می‌شود و چیزی به شبکه نمی‌رود.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — پایشگر نور',
  'app.skipToContent': 'رفتن به محتوا',
  'app.nav.aria': 'ناوبری اصلی',
  'app.noscript.title': 'این برنامه به JavaScript نیاز دارد',
  'app.noscript.text': 'تمام اندازه‌گیری داخل همین زبانهٔ مرورگر انجام می‌شود: این JavaScript است که فریم‌های دوربین را می‌خواند و هفت شاخص نور را از آن‌ها محاسبه می‌کند. بدون آن ابزاری برای اندازه‌گیری نمی‌ماند. JavaScript را برای این صفحه فعال کنید و دوباره بازش کنید — باز هم چیزی به شبکه فرستاده نمی‌شود.',

  'nav.measure': 'اندازه‌گیری',
  'nav.history': 'تاریخچه',
  'nav.tools': 'ابزارها',
  'nav.support': 'حمایت',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'در حال اندازه‌گیری',
  'shell.live.aria': 'در حال اندازه‌گیری. {metric}: {value}. بازگشت به صفحهٔ اندازه‌گیری.',
  'shell.live.metricFallback': 'شاخص اصلی',
  'shell.action.fallback': 'کنش صفحه',

  'shell.loadFail.title': 'صفحهٔ «{screen}» بارگذاری نشد',
  'shell.loadFail.text': 'احتمالاً بخشی از فایل‌ها در حافظهٔ دستگاه نیست. به شبکه وصل شوید و صفحه را دوباره بارگذاری کنید.',
  'shell.fatal.title': 'چیزی درست پیش نرفت',
  'shell.fatal.text': 'برنامه نتوانست صفحه را بسازد. معمولاً بارگذاری دوبارهٔ صفحه کافی است — اندازه‌گیری‌ها و تنظیمات ذخیره‌شده سر جای خود می‌مانند.',
  'shell.fatal.reload': 'بارگذاری دوبارهٔ صفحه',
  'shell.boot.failTitle': 'برنامه اجرا نشد',
  'shell.boot.failText': 'چارچوب برنامه راه نیفتاد. صفحه را دوباره بارگذاری کنید — اندازه‌گیری‌ها و تنظیمات ذخیره‌شده سر جای خود می‌مانند.',
  'shell.background.error': 'چیزی در پس‌زمینه خراب شد',
  'shell.background.action': 'بارگذاری دوباره',
  'shell.update.title': 'نسخهٔ تازه‌ای در دسترس است',
  'shell.update.action': 'بارگذاری دوباره',

  'onboarding.title': 'پیش از شروع',
  'onboarding.lead': 'پایشگر نور با دوربین به نور پیرامون شما نگاه می‌کند و هفت شاخص از آن به دست می‌آورد — از سهم آبی تا آسایش بصری.',
  'onboarding.privacy': 'تصویر هرگز از این دستگاه بیرون نمی‌رود: نه سروری هست، نه حسابی، و نه چیزی برای فرستادن. هر هفت شاخص از همان ابتدا کار می‌کنند، بدون ورود به حساب و بدون هزینه.',
  'onboarding.honesty': 'این یک راهنمای تقریبی است، نه ابزار اندازه‌گیری و نه آزمایش پزشکی. آنچه اندازه‌گیری‌پذیر نیست نشان داده نمی‌شود — به‌جای عدد، خط تیره می‌بینید.',
  'onboarding.start': 'شروع کنیم',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'اعمال کن',
  'overlay.toast.close': 'بستن پیام',
  'overlay.sheet.label': 'پنجره',
  'overlay.sheet.close': 'بستن',
  'overlay.dialog.confirm': 'تأیید',
  'overlay.dialog.cancel': 'انصراف',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'انصراف',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': '، ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'اندازه‌گیری',

  'measure.intro.aria': 'شروع اندازه‌گیری',
  'measure.intro.headline': 'ببینید چه نوری بر شما می‌تابد',
  'measure.intro.lead': 'دوربین نشان می‌دهد در نوری که همین حالا بر شما می‌تابد چقدر آبی هست — و آیا برای این ساعت از شبانه‌روز زیاد است یا نه.',
  'measure.intro.start': 'شروع اندازه‌گیری',
  'measure.intro.hint': 'مرورگر برای دسترسی به دوربین اجازه می‌خواهد. اندازه‌گیری همان لحظه که اجازه دادید آغاز می‌شود.',
  'measure.intro.privacy': 'تصویر دوربین روی همین دستگاه پردازش می‌شود و هرگز از آن بیرون نمی‌رود. حتی یک فریم را هم نمی‌فرستیم، ذخیره نمی‌کنیم و به اشتراک نمی‌گذاریم.',

  'measure.live.aria': 'اندازه‌گیری در جریان است',
  'measure.badge.starting': 'در حال راه‌اندازی',
  'measure.badge.paused': 'مکث',
  'measure.badge.running': 'در حال اندازه‌گیری',
  'measure.stale': 'در انتظار تصویر — وقتی برنامه در پس‌زمینه است، پیش‌نمایش می‌ایستد.',
  'measure.crop': 'مرکز کادر را اندازه می‌گیریم — {percent}% مشخص‌شده از عرض و ارتفاع تصویر.',
  'measure.facing.front': 'دوربین جلو',
  'measure.facing.back': 'دوربین پشت',

  'measure.boot.title': 'در حال راه‌اندازی دوربین…',
  'measure.boot.text': 'اگر مرورگر اجازه خواست، آن را بدهید — بدون تصویر چیزی برای اندازه‌گیری نیست. این اجازه فقط به همین صفحه مربوط است و بعداً می‌توانید پسش بگیرید.',
  'measure.boot.cancel': 'انصراف',

  'measure.hold': 'نشانه‌ها ثابت شدند. دوربین کار می‌کند، اما چیزی به تاریخچه و میانگین‌ها نمی‌رسد.',
  'measure.gridHint': 'یک کاشی را انتخاب کنید تا آن شاخص روی نشانگر بزرگ بیاید.',

  'measure.stop': 'توقف',
  'measure.pause': 'مکث',
  'measure.resume': 'ادامه',
  'measure.flip.aria': 'تعویض دوربین',
  'measure.flip.toBack': 'تعویض به دوربین پشت',
  'measure.flip.toFront': 'تعویض به دوربین جلو',

  'measure.fail.aria': 'خطای دوربین',
  'measure.fail.headline': 'دوربین راه نیفتاد',
  'measure.fail.retry': 'تلاش دوباره',
  'measure.fail.back': 'بازگشت',
  'measure.fail.savedSession': 'جلسهٔ پیش از قطع شدن ({duration}) در تاریخچه ذخیره شد.',
  'measure.error.fallback': 'دوربین راه‌اندازی نشد.',

  'measure.summary.aria': 'خلاصهٔ جلسه',
  'measure.summary.title': 'خلاصهٔ جلسه',
  'measure.summary.paused': '{duration} مکث',
  'measure.summary.nothingMeasured': 'هیچ شاخصی خوانشی جمع نکرد — دوربین در تمام جلسه نوری ندید.',
  'measure.summary.note': 'میانگین‌ها فقط نمونه‌های بیرون از مکث را می‌شمارند. شاخص‌هایی که اصلاً اندازه‌گیری نشدند کنار گذاشته می‌شوند، نه اینکه صفر به حساب بیایند.',
  'measure.summary.nearThreshold': 'نزدیک‌ترین به آستانه',
  'measure.summary.worstPoint': 'ضعیف‌ترین نقطه',
  'measure.summary.averageZone': 'به‌طور میانگین {zone}',
  'measure.summary.tooShort': 'جلسه {duration} طول کشید — کوتاه‌تر از آنکه خودش به تاریخچه برسد. می‌توانید دستی ذخیره‌اش کنید.',
  'measure.summary.again': 'اندازه‌گیری دوباره',
  'measure.summary.save': 'ذخیره در تاریخچه',
  'measure.summary.saved': 'در تاریخچه ذخیره شد',
  'measure.summary.savedToast': 'جلسه در تاریخچه ذخیره شد.',
  'measure.summary.close': 'بستن',

  'measure.method.title': 'چطور این را اندازه می‌گیریم',
  'measure.method.p1': 'برنامه ده بار در ثانیه از تصویر دوربین نمونه می‌گیرد و شاخص‌ها را از {percent}% میانی کادر محاسبه می‌کند — نشانه‌گر روی پیش‌نمایش دقیقاً همان ناحیه را مشخص می‌کند.',
  'measure.method.p2': 'دوربین گوشی سه کانال پهن دارد، به‌همراه نوردهی و تعادل سفیدی خودکار خودش. نسبت‌های نور را می‌بیند، نه طیف آن را.',
  'measure.method.p3': 'سهم آبی، روشنایی، سوسوزدن و یکنواختی همان چیزی است که دوربین واقعاً اندازه می‌گیرد. دمای رنگ و اثر بر ریتم شبانه‌روزی تقریب‌هایی آشکارند که از مؤلفه‌های اصلی sRGB محاسبه می‌شوند.',
  'measure.method.p4': 'سوسوزدن فقط زیر چهار هرتز دیده می‌شود. سوسوی ۱۰۰ Hz برق شهری بسیار دورتر از دسترس این نرخ نمونه‌برداری است و هرگز به‌عنوان خوانش گزارش نمی‌شود.',
  'measure.method.p5': 'هیچ‌کدام از این عددها اندازه‌گیری فوتومتری یا نتیجهٔ پزشکی نیست. تصویر دوربین از دستگاه بیرون نمی‌رود.',
  'measure.method.ok': 'متوجه شدم',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'راه‌اندازی دوربین لغو شد.',
  'measure.announce.stoppedNoSamples': 'اندازه‌گیری متوقف شد. هیچ نمونه‌ای جمع نشد.',
  'measure.announce.stopped': 'اندازه‌گیری متوقف شد. خلاصهٔ جلسه آماده است.',
  'measure.announce.interrupted': 'اندازه‌گیری قطع شد. خلاصهٔ جلسه آماده است.',
  'measure.announce.paused': 'اندازه‌گیری مکث کرد. نشانه‌ها ثابت شدند.',
  'measure.announce.resumed': 'اندازه‌گیری از سر گرفته شد.',
  'measure.announce.switchedFront': 'به دوربین جلو تعویض شد. جلسهٔ تازه‌ای آغاز می‌شود.',
  'measure.announce.switchedBack': 'به دوربین پشت تعویض شد. جلسهٔ تازه‌ای آغاز می‌شود.',
  'measure.announce.lead': 'شاخص اصلی: {metric}.',
  'measure.announce.cameraError': 'خطای دوربین. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'نور در تمام جلسه در محدودهٔ ایمن ماند — چراغ را همان‌طور که هست بگذارید و پس از تاریکی هوا، وقتی منبع دیگری روشن است، دوباره بررسی کنید.',
  'measure.advice.share.evening': 'سهم آبی به‌طور میانگین {value} بود — نمایشگرها را روی حالت شب بگذارید و چراغ سقفی را خاموش کنید و یک چراغ گرم در ارتفاع میز نگه دارید.',
  'measure.advice.share.day': 'سهم آبی به‌طور میانگین {value} بود — در طول روز پذیرفتنی است، اما نمایشگر را طوری تنظیم کنید که دو ساعت پیش از خواب خودکار به حالت گرم برود.',
  'measure.advice.brightness': 'کادر بیش‌ازحد نوردهی شده بود (به‌طور میانگین {value}) — از منبع نور فاصله بگیرید یا روشنایی نمایشگری را که اندازه می‌گیرید کم کنید، چون در این نوردهی دقت بقیهٔ شاخص‌ها هم پایین می‌آید.',
  'measure.advice.kelvin.evening': 'دمای رنگ به‌طور میانگین روی {value} ماند — پس از تاریکی هوا زیر ۳۰۰۰ K بروید: چراغ را روی حالت گرم بگذارید یا لامپ ۲۷۰۰ K بیندازید.',
  'measure.advice.kelvin.day': 'دمای رنگ به‌طور میانگین روی {value} ماند — برای روز سفیدِ خوب و هوشیارکننده‌ای است، اما شب همان چراغ را روی ۲۷۰۰ K بگذارید.',
  'measure.advice.melanopic.evening': 'اثر بر ریتم شبانه‌روزی به‌طور میانگین {value} بود — در دو ساعت پیش از خواب زیر ۰٫۵۰ × بروید: نور اصلی را کم کنید و به‌جای سقف، از ارتفاع میز نور بتابانید.',
  'measure.advice.melanopic.day': 'اثر بر ریتم شبانه‌روزی به‌طور میانگین {value} بود — در این ساعت این مقدار کمک می‌کند، اما شب این منبع را با منبعی ضعیف‌تر و گرم‌تر عوض کنید.',
  'measure.advice.flicker': 'سوسوزدن به‌طور میانگین به {value} رسید — معمولاً کار دیمر است یا نور پس‌زمینه‌ای که خیلی پایین تنظیم شده: روشنایی نمایشگر را بالای ۴۰% ببرید یا دیمر را با نمونه‌ای بدون PWM عوض کنید.',
  'measure.advice.uniformity': 'نور ناهموار می‌تابید (به‌طور میانگین {value}) — چراغ را از کنار به میز بتابانید و به‌جای یک نقطهٔ پرقدرت، منبع دوم و ضعیف‌تری از سمت مقابل اضافه کنید.',
  'measure.advice.comfort': 'آسایش بصری به‌طور میانگین {value} درآمد — با یک تغییر شروع کنید: روشنایی منبع اصلی را نصف کنید و تازه بعد سراغ رنگ نور بروید.',
  'measure.advice.default': 'یک چیز را در نورپردازی‌تان عوض کنید و دوباره اندازه بگیرید — مقایسهٔ دو جلسه بیش از یک خوانش تنها می‌گوید.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'تاریخچه',
  'history.action.export': 'خروجی گرفتن از تاریخچه',

  'history.metricGroup.aria': 'انتخاب شاخص',
  'history.announce.metric': 'شاخص: {metric}',
  'history.rangeGroup.aria': 'بازهٔ زمانی',
  'history.range.aria': '{range} گذشته',

  'history.stats.title': 'آمار بازه',
  'history.stats.head': '{metric}\u00A0—\u00A0{range} گذشته',
  'history.stats.note': 'از روی همان چیزی که نمودار نشان می‌دهد محاسبه می‌شود. زمانی که اندازه‌گیری نبوده به حساب نمی‌آید — به‌جای آن صفر نمی‌گذاریم.',
  'history.stat.min': 'کمینه',
  'history.stat.avg': 'میانگین',
  'history.stat.max': 'بیشینه',
  'history.trend.up': 'در این بازه بالا می‌رود',
  'history.trend.flat': 'بدون تغییر روشن',
  'history.trend.down': 'در این بازه پایین می‌آید',
  'history.trend.none': 'چیزی برای مقایسه نیست',

  'history.sessions.title': 'جلسه‌های اندازه‌گیری',
  'history.sessions.count': '{sessions}، از تازه‌ترین',
  'history.sessions.empty': 'هنوز هیچ جلسه‌ای نیست',
  'history.sessions.hint': 'جلسه پس از توقف اندازه‌گیری ذخیره می‌شود.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'بازه: {range}',
  'history.session.noMeasure': 'چیزی اندازه‌گیری نشد',

  'history.data.title': 'داده‌ها',
  'history.data.subtitle': 'تاریخچه فقط روی همین دستگاه ذخیره می‌شود.',
  'history.export.csv': 'خروجی CSV',
  'history.export.json': 'خروجی JSON',
  'history.export.ok': 'فایل برای ذخیره آماده است',
  'history.export.fail': 'فایل آماده نشد. در حالت ناشناس و در پنجره‌ای که داخل برنامهٔ دیگری جاسازی شده، مرورگر جلوی ذخیره را می‌گیرد — صفحه را در یک زبانهٔ معمولی باز کنید.',
  'history.export.sheet.title': 'خروجی تاریخچه',
  'history.export.sheet.text': 'CSV در صفحه‌گسترده باز می‌شود (جداکننده نقطه‌ویرگول، اعشار با ویرگول). JSON همه‌چیز را نگه می‌دارد، از جمله فهرست جلسه‌ها و جاهایی که اندازه‌گیری نشده است.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'پاک کردن تاریخچه',
  'history.clear.title': 'تاریخچه پاک شود؟',
  'history.clear.text': '{points} و {sessions} حذف می‌شود. این کار برگشت‌پذیر نیست — اگر می‌خواهید داده‌ها بماند، اول از آن‌ها خروجی بگیرید.',
  'history.clear.confirm': 'پاک کن',
  'history.clear.announce': 'تاریخچه پاک شد.',
  'history.clear.toast': 'تاریخچه پاک شد',

  'history.empty.title': 'هنوز چیزی برای نشان دادن نیست',
  'history.empty.text': 'تاریخچه در حین اندازه‌گیری پر می‌شود — ثانیه‌ای یک نقطه. همه‌چیز روی همین دستگاه می‌ماند.',
  'history.empty.action': 'رفتن به اندازه‌گیری',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '۱ دقیقه',
  'range.5m': '۵ دقیقه',
  'range.1h': '۱ ساعت',
  'range.24h': '۲۴ ساعت',
  'range.7d': '۷ روز',
  'range.30d': '۳۰ روز',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'تاریخ و ساعت',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'حافظهٔ دستگاه پر است — اندازه‌گیری‌های تازه دیگر ذخیره نمی‌شوند.',
  'storage.blocked': 'مرورگر اجازه نمی‌دهد تاریخچه ذخیره شود — داده‌ها با بستن زبانه از بین می‌روند.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'ابزارها',
  'tools.action.about': 'دربارهٔ اندازه‌گیری',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'زبان',
  'tools.language.subtitle': 'برنامه به‌طور پیش‌فرض از زبان دستگاه پیروی می‌کند؛ انتخاب از این فهرست بی‌درنگ اثر می‌کند و در همین مرورگر می‌ماند.',
  'tools.language.aria': 'زبان رابط',
  'tools.language.system': 'خودکار',
  'tools.language.announce': 'زبان رابط: {language}.',

  'tools.appearance.title': 'ظاهر',
  'tools.appearance.theme.title': 'پوسته',
  'tools.appearance.theme.desc': '«خودکار» از تنظیم سیستم پیروی می‌کند.',
  'tools.appearance.theme.aria': 'پوسته',
  'tools.theme.system': 'خودکار',
  'tools.theme.light': 'روشن',
  'tools.theme.dark': 'تیره',
  'tools.appearance.accent.title': 'رنگ تأکید',
  'tools.appearance.accent.desc': 'رنگ دکمه‌ها، انتخاب‌ها و لغزنده‌ها.',
  'tools.appearance.accent.aria': 'رنگ تأکید',
  'tools.appearance.textScale.title': 'اندازهٔ متن',
  'tools.appearance.textScale.desc': 'کل رابط را بزرگ می‌کند، نه فقط برچسب‌ها را.',
  'tools.appearance.textScale.aria': 'اندازهٔ متن',
  'tools.appearance.density.title': 'تراکم',
  'tools.appearance.density.desc': 'حالت فشرده محتوای بیشتری در یک صفحه جا می‌دهد.',
  'tools.appearance.density.aria': 'تراکم چیدمان',
  'tools.density.comfortable': 'معمولی',
  'tools.density.compact': 'فشرده',
  'tools.appearance.motion.title': 'حرکت کمتر',
  'tools.appearance.motion.desc': 'انیمیشن‌ها و حرکت نرم عقربه را خاموش می‌کند. تنظیم سیستم شما در هر حال رعایت می‌شود.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'اقیانوس',
  'accent.violet': 'بنفش',
  'accent.amber': 'کهربا',
  'accent.mint': 'نعنا',
  'accent.rose': 'گل‌سرخ',

  'tools.thresholds.title': 'آستانه‌ها',
  'tools.thresholds.subtitle': 'از چه مقداری برنامه بگوید «متوسط» و از چه مقداری بگوید «مضر». آستانه‌های پیش‌فرض پیشنهاد ما هستند، نه استاندارد — آن‌ها را به‌اندازهٔ خودتان تنظیم کنید.',
  'tools.thresholds.warn': 'آستانهٔ هشدار',
  'tools.thresholds.crit': 'آستانهٔ خطر',
  'tools.thresholds.warn.aria': 'آستانهٔ هشدار — {metric}',
  'tools.thresholds.crit.aria': 'آستانهٔ خطر — {metric}',
  'tools.thresholds.reset': 'پیش‌فرض',
  'tools.thresholds.reset.aria': 'بازگرداندن آستانه‌های پیش‌فرض: {metric}',
  'tools.thresholds.moved': '{threshold} به {value} منتقل شد.',
  'tools.thresholds.resetAll': 'بازگرداندن همهٔ آستانه‌ها',
  'tools.thresholds.resetAll.title': 'آستانه‌های پیش‌فرض بازگردانده شود؟',
  'tools.thresholds.resetAll.text': 'هر هفت شاخص به آستانه‌هایی که برنامه پیشنهاد می‌کند برمی‌گردند. تاریخچهٔ اندازه‌گیری دست‌نخورده می‌ماند.',
  'tools.thresholds.resetAll.confirm': 'بازگردان',
  'tools.thresholds.resetAll.cancel': 'بماند',
  'tools.thresholds.resetAll.toast': 'آستانه‌ها به پیش‌فرض بازگشتند',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'بالای {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} و پایین‌تر',
  'tools.zoneRange.goodBelow': 'زیر {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} و بالاتر',

  'tools.calibration.title': 'کالیبراسیون',
  'tools.calibration.subtitle': 'برای کسانی که چیزی برای مقایسه دارند.',
  'tools.calibration.intro': 'دو گوشی که به یک چراغ نشانه رفته‌اند عددهای کمی متفاوت نشان می‌دهند — هر حسگر ته‌رنگ خودش را دارد. اگر خوانشی در دسترس دارید که به آن اعتماد می‌کنید، می‌توانید اینجا هر کانال تصویر را کمی بالا یا پایین ببرید. ضریب‌ها پیش از هر محاسبه‌ای اعمال می‌شوند، پس هر هفت شاخص را یک‌جا تغییر می‌دهند.',
  'tools.calibration.neutral': 'چیزی برای مقایسه ندارید؟ روی ۱٫۰۰ بگذارید — این تنظیم کارخانه است و چیزی را خراب نمی‌کند.',
  'tools.calibration.forward': 'این تغییر از همین حالا اثر می‌کند. اندازه‌گیری‌هایی که پیش‌تر در تاریخچه ذخیره شده‌اند همان‌طور می‌مانند که در لحظهٔ ذخیره بودند — دوباره محاسبه‌شان نمی‌کنیم، چون این یعنی بازنویسی داده پس از وقوع.',
  'tools.calibration.reset': 'صفر کردن کالیبراسیون',
  'tools.calibration.reset.toast': 'کالیبراسیون صفر شد',
  'tools.calibration.channel.r': 'کانال قرمز',
  'tools.calibration.channel.g': 'کانال سبز',
  'tools.calibration.channel.b': 'کانال آبی',
  'tools.calibration.channel.aria': '{channel} — ضریب کالیبراسیون',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'اندازه‌گیری',
  'tools.measurement.wake.title': 'صفحه روشن بماند',
  'tools.measurement.wake.desc': 'در حین اندازه‌گیری صفحه بیدار می‌ماند. باتری آن‌وقت زودتر تمام می‌شود.',
  'tools.measurement.wake.unsupported': 'این مرورگر اجازه نمی‌دهد صفحه را بیدار نگه داریم.',
  'tools.measurement.haptics.title': 'لرزش',
  'tools.measurement.haptics.desc': 'تأیید کوتاه هنگام شروع، توقف و تغییر شاخص.',
  'tools.measurement.haptics.unsupported': 'این دستگاه موتور لرزش گزارش نمی‌کند.',

  'tools.about.title': 'دربارهٔ اندازه‌گیری',
  'tools.about.subtitle': 'هر یک از هفت شاخص دقیقاً چه چیزی را محاسبه می‌کند و صداقت این روش تا کجاست.',
  'tools.about.scale': 'مقیاس: از {min} تا {max}.',
  'tools.about.threshold': 'از {warn} هشدار می‌دهیم و از {crit} اعلام خطر می‌کنیم.',
  'tools.about.thresholdInvert': 'زیر {warn} هشدار می‌دهیم و زیر {crit} اعلام خطر می‌کنیم.',
  'tools.about.limitsHead': 'این اندازه‌گیری چه کارهایی نمی‌تواند بکند',
  'tools.about.limit.spectrum.title': 'دوربین رنگ را آن‌طور که یک دستگاه اندازه‌گیری می‌بیند نمی‌بیند',
  'tools.about.limit.spectrum.text': 'دوربین گوشی سه کانال دارد: قرمز، سبز و آبی. دستگاه اندازه‌گیری نور همان‌ها را به ده‌ها باند باریک تجزیه می‌کند. آنچه اینجا می‌بینید از همین سه عدد به دست آمده — به روشی معقول، اما باز هم یک محاسبه است، نه طیفی اندازه‌گیری‌شده.',
  'tools.about.limit.exposure.title': 'دوربین خودش روشنایی را تنظیم می‌کند',
  'tools.about.limit.exposure.text': 'گوشی را به سمت پنجره بگیرید و دوربین تصویر را تیره می‌کند تا بیش‌ازحد نوردهی نشود. آن‌وقت «روشنایی صحنه» پایین می‌آید، هرچند در اتاق چیزی تغییر نکرده است. پس این مقدار را در محدودهٔ یک نما مقایسه کنید، نه میان اتاق‌ها.',
  'tools.about.limit.flicker.title': 'دوربین کند سوسوی سریع را نمی‌گیرد',
  'tools.about.limit.flicker.text': 'تصویر را {hz} بار در ثانیه بررسی می‌کنیم. تپشی سریع‌تر از {nyquist} بار در ثانیه می‌تواند در چنین اندازه‌گیری‌ای کندتر از آنچه واقعاً هست به نظر برسد یا یکسره ناپدید شود — و سوسوی برق شهری دقیقاً همین‌قدر سریع است. اگر برنامه چیزی گرفت، آن را نشانهٔ «اینجا چیزی تپش دارد» بدانید، نه فرکانسی اندازه‌گیری‌شده.',
  'tools.about.limit.medical.title': 'این نه آزمایش پزشکی است و نه توصیهٔ پزشکی',
  'tools.about.limit.medical.text': 'برنامه کمک می‌کند متوجه شوید نور پیرامونتان سرد، پرنور یا ناآرام است و پیشنهاد می‌دهد چه می‌شود کرد. دربارهٔ سلامت شما داوری نمی‌کند و جای گفت‌وگو با پزشک یا اندازه‌گیری با دستگاه حرفه‌ای را نمی‌گیرد.',
  'tools.about.privacy': 'همه‌چیز روی دستگاه شما محاسبه می‌شود. تصویر دوربین هرگز جایی فرستاده یا ذخیره نمی‌شود — تنها عددهای محاسبه‌شده به حافظه می‌رسند.',

  'tools.data.title': 'داده‌ها',
  'tools.data.subtitle': 'همه‌چیز در حافظهٔ همین مرورگر می‌ماند و هرگز از اینجا جایی نمی‌رود.',
  'tools.data.summary.empty': 'هنوز هیچ اندازه‌گیری ذخیره‌شده‌ای نیست.',
  'tools.data.summary': 'در حافظه: {points} و {sessions}.',
  'tools.data.export.csv': 'خروجی CSV',
  'tools.data.export.json': 'خروجی JSON',
  'tools.data.clear': 'پاک کردن تاریخچه',
  'tools.data.reset': 'تنظیمات پیش‌فرض',
  'tools.data.reset.title': 'تنظیمات پیش‌فرض بازگردانده شود؟',
  'tools.data.reset.text': 'ظاهر، آستانه‌ها، کالیبراسیون و تنظیمات اندازه‌گیری به حالت اولیه برمی‌گردند. تاریخچهٔ اندازه‌گیری دست‌نخورده می‌ماند.',
  'tools.data.reset.confirm': 'بازگردان',
  'tools.data.reset.toast': 'تنظیمات پیش‌فرض بازگردانده شد',
  'tools.data.wipe': 'حذف همهٔ داده‌ها',
  'tools.data.wipe.title': 'همهٔ داده‌های برنامه حذف شود؟',
  'tools.data.wipe.text': 'اینها از بین می‌روند: کل تاریخچهٔ اندازه‌گیری و فهرست جلسه‌ها، آستانه‌ها و کالیبراسیون شما، و تنظیمات ظاهر. برنامه به حالت نخستین اجرا برمی‌گردد.',
  'tools.data.wipe.note': 'ما هیچ نسخه‌ای از این داده‌ها نداریم — هرگز از این دستگاه بیرون نرفته‌اند، پس جایی برای بازگرداندنشان نیست.',
  'tools.data.wipe.check': 'می‌دانم که این کار برگشت‌پذیر نیست',
  'tools.data.wipe.confirm': 'حذف همه‌چیز',
  'tools.data.wipe.toast': 'همهٔ داده‌های برنامه حذف شد',
  'tools.data.wipe.announce': 'همهٔ داده‌های برنامه حذف شد. تنظیمات به پیش‌فرض بازگشت.',
  'tools.data.storage.blocked': 'این مرورگر اجازه نمی‌دهد چیزی به‌طور دائم ذخیره شود (حالت ناشناس، یا مسدود بودن دادهٔ سایت‌ها). هرچه اینجا تنظیم کنید با بستن زبانه از بین می‌رود.',
  'tools.data.storage.full': 'حافظهٔ مرورگر پر شده و اندازه‌گیری‌های تازه دیگر ذخیره نمی‌شوند. پاک کردن تاریخچه جا باز می‌کند.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'حمایت',
  'support.free.title': 'همه‌چیز در دسترس است',
  'support.free.lead': 'هر هفت شاخص، تاریخچهٔ کامل، آستانه‌ها، کالیبراسیون و خروجی گرفتن از نخستین اجرا کار می‌کنند — بدون حساب، بدون محدودیت و بدون هزینه.',
  'support.free.note': 'اندازه‌گیری یکسره روی همین دستگاه انجام می‌شود و بدون شبکه کار می‌کند. اینجا نسخهٔ بهتری پشت دیوار نگه داشته نشده است.',
  'support.why.title': 'چرا این را می‌خواهم',
  'support.why.lead': 'پایشگر نور بعد از ساعت کاری ساخته می‌شود، بدون تبلیغات، بدون حامی مالی و بدون هیچ شرکتی پشت آن. حمایت هزینهٔ وقتی را می‌دهد که صرف رفع اشکال‌ها، شاخص‌های تازه و زنده نگه داشتن آنچه هست می‌شود.',
  'support.what.title': 'کمک مالی چه چیزی به شما می‌دهد',
  'support.what.lead': 'هیچ. کمک مالی چیزی را باز نمی‌کند — نه قابلیتی اضافه، نه نشانی کنار نامتان، نه اولویتی. هر کاری که برنامه می‌تواند بکند همین حالا در اختیار شماست.',
  'support.what.note': 'تنها چیزی که می‌ماند این است که می‌دانم به کار کسی آمده. این واقعاً دلیل کافی است.',
  'support.cta.title': 'اگر دوست دارید کمک کنید',
  'support.cta.button': 'یک قهوه مهمانم کنید',
  'support.cta.nolink': 'صفحهٔ کمک مالی هنوز وصل نشده است. وقتی وصل شود، دکمه‌ای همین‌جا خواهد بود.',
  'support.cta.privacy': 'این پیوند صفحهٔ بیرونی Buy Me a Coffee را در زبانهٔ تازه‌ای باز می‌کند. این تنها لحظه‌ای است که چیزی از این دستگاه بیرون می‌رود — خودِ اندازه‌گیری همیشه همین‌جا می‌ماند.',
  'support.cta.privacyFuture': 'وقتی نشانی گذاشته شود، دکمه صفحهٔ بیرونی Buy Me a Coffee را در زبانهٔ تازه‌ای باز می‌کند. آن تنها لحظه‌ای خواهد بود که چیزی از این دستگاه بیرون می‌رود — خودِ اندازه‌گیری همیشه همین‌جا می‌ماند.',
  'support.cta.note': 'اینجا نه شمارش معکوسی هست، نه یادآوری، و نه پنجره‌ای که خودش باز شود. این درخواست فقط در همین زبانه منتظر می‌ماند.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'دقیقهٔ اخیر',
  'gauge.aria': '{metric}: {value}، منطقه: {zone}',
  'gauge.aria.note': '{metric}: {value}، منطقه: {zone}، {note}',
  'gauge.aria.initial': '{metric}: داده‌ای نیست',
  'gauge.value.none': 'داده‌ای نیست',
  /* Odczyt słowny z jednostką: „۲۷ درصد”, „۱٫۲۰ برابر”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'مقدار تقریبی',
  'gauge.note.offScale': 'بیرون از مقیاس',
  'gauge.metric.unknown': 'شاخص ناشناخته',

  'chart.aria.label': 'نمودار تاریخچهٔ اندازه‌گیری',
  'chart.hint': 'نمودار تعاملی. کلیدهای چپ و راست مکان‌نمای خوانش را جابه‌جا می‌کنند، Home و End به ابتدا و انتهای بازه می‌روند، Escape مکان‌نما را پنهان می‌کند.',
  'chart.empty.title': 'داده‌ای نیست',
  'chart.empty.text': 'اندازه‌گیری را شروع کنید — نمودار پس از نخستین خوانش‌ها ظاهر می‌شود.',
  'chart.few.title': 'داده کافی نیست',
  'chart.few.text': 'یک خوانش داریم: {value}. برای کشیدن خط دو تا لازم است.',
  'chart.legend.line': 'اندازه‌گیری',
  'chart.legend.gap': 'وقفه در اندازه‌گیری',
  'chart.aria.head': 'نمودار: {metric}، بازهٔ {range}',
  'chart.aria.empty': 'در این بازه داده‌ای نیست.',
  'chart.aria.one': 'یک خوانش: {value}.',
  'chart.aria.summary': 'از {min} تا {max}، میانگین {avg}، {points}.',
  'chart.aria.gaps': 'در این رشته وقفه هست — آن‌وقت‌ها اندازه‌گیری نمی‌کردیم.',
  'chart.readout.empty': 'در این بازه داده‌ای نیست.',
  'chart.readout.point': '{metric}: {value}، {time}',
  'chart.readout.pointZone': '{metric}: {value}، {zone}، {time}',
  'chart.readout.few': 'داده برای رسم نمودار کافی نیست.',
  'chart.readout.hint': 'روی نمودار بکشید یا از کلیدهای جهت‌دار استفاده کنید تا یک اندازه‌گیری را بخوانید.',
  'chart.time.now': 'اکنون',
  'chart.time.justNow': 'همین الان',
  'chart.time.ago': '{duration} پیش',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd pełna nazwa miesiąca i cyfry perskie,
     bo tak formatuje je ICU dla tego języka. */
  'chart.sample.ago': '\u2212۳۰\u00A0دقیقه',
  'chart.sample.clock': '۰۰:۰۰',
  'chart.sample.date': '۳۰\u00A0سپتامبر',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'سهم آبی',
  'metric.share.short': 'چه بخشی از نوری که می‌بینیم به کانال آبی می‌رسد.',
  'metric.share.help': 'رنگ را از روشنایی جدا می‌کند — همین مقدار است که با روشن کردن حالت شب تغییر می‌کند.',
  'metric.brightness.name': 'روشنایی صحنه',
  'metric.brightness.short': 'روشنایی میانگین تصویر دوربین.',
  'metric.brightness.help': 'مقداری نسبی است، نه لوکس — نوردهی خودکار دوربین آن را از زیر جابه‌جا می‌کند.',
  'metric.kelvin.name': 'دمای رنگ',
  'metric.kelvin.short': 'اینکه نور گرم است یا سرد.',
  'metric.kelvin.help': 'زیر ۳۰۰۰ K نور گرم است و شب‌ها ملایم‌تر. ۶۵۰۰ K سفید پیش‌فرض بیشتر نمایشگرهاست.',
  'metric.melanopic.name': 'اثر بر ریتم شبانه‌روزی',
  'metric.melanopic.short': 'این نور چقدر بر ساعت زیستی بدن اثر می‌گذارد.',
  'metric.melanopic.help': 'تقریبی از نسبت ملانوپیک. ۱٫۰۰ سفید خنثای روز است؛ شب‌ها بهتر است زیر ۰٫۵۰ بروید.',
  'metric.flicker.name': 'سوسوزدن',
  'metric.flicker.short': 'تپش نامرئی منبع نور.',
  'metric.flicker.help': 'دیمرها و نورهای پس‌زمینهٔ ارزان تپش دارند. چشم آن را نمی‌بیند، اما از علت‌های شناخته‌شدهٔ خستگی و سردرد است.',
  'metric.uniformity.name': 'یکنواختی',
  'metric.uniformity.short': 'اینکه نور در کادر یکنواخت پخش می‌شود یا نه.',
  'metric.uniformity.help': 'مقدار پایین روی نمایشگر یعنی نشت نور پس‌زمینه یا بازتاب؛ روی میز — چراغی که بد گذاشته شده.',
  'metric.comfort.name': 'آسایش بصری',
  'metric.comfort.short': 'یک نمره به‌جای شش عدد.',
  'metric.comfort.help': 'بقیهٔ اندازه‌گیری‌ها را در نمره‌ای از ۰ تا ۱۰۰ جمع می‌کند و نشان می‌دهد چه چیزی بیش از همه آن را پایین می‌آورد. وزن‌ها داوری تحریری ماست، نه استاندارد.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'ایمن',
  'zone.warn': 'متوسط',
  'zone.crit': 'مضر',
  'zone.none': 'داده‌ای نیست',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Miesiące gregoriańskie (format.js podaje numer z Date.getMonth), nie
     perskie: perski nie skraca ich nazw, więc stoją w pełnym brzmieniu. */
  'date.month.short.1': 'ژانویه',
  'date.month.short.2': 'فوریه',
  'date.month.short.3': 'مارس',
  'date.month.short.4': 'آوریل',
  'date.month.short.5': 'مه',
  'date.month.short.6': 'ژوئن',
  'date.month.short.7': 'ژوئیه',
  'date.month.short.8': 'اوت',
  'date.month.short.9': 'سپتامبر',
  'date.month.short.10': 'اکتبر',
  'date.month.short.11': 'نوامبر',
  'date.month.short.12': 'دسامبر',

  'date.clock': '{hours}:{minutes}',
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0{year}',
  'date.dateTime': '{date}، {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. Perski nie ma utartych skrótów
     jednostek czasu, więc stoją tu słowem. */
  'time.duration.dayHour': '{days} {hours}\u00A0ساعت',
  'time.duration.hourMinute': '{hours}\u00A0ساعت {minutes}\u00A0دقیقه',
  'time.duration.hour': '{hours}\u00A0ساعت',
  'time.duration.minuteSecond': '{minutes}\u00A0دقیقه {seconds}\u00A0ثانیه',
  'time.duration.minute': '{minutes}\u00A0دقیقه',
  'time.duration.second': '{seconds}\u00A0ثانیه',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „همین الان”. */
  'time.justNow': 'همین الان',
  'time.aMinuteAgo': 'یک دقیقه پیش',
  'time.minutesAgo': '{minutes}\u00A0دقیقه پیش',
  'time.hoursAgo': '{hours}\u00A0ساعت پیش',
  'time.yesterday': 'دیروز',
  'time.daysAgo': '{days}\u00A0روز پیش',

  /* Formy zależne od liczby. Perski ma w CLDR dwie: `one` i `other`.
     Rzeczownik po liczebniku się nie odmienia, więc obie formy są tym samym
     słowem — ale obie muszą tu stać, bo o wybór pyta Intl.PluralRules. */
  'time.days.plural': { one: 'روز', other: 'روز' },
  'unit.sample.plural': { one: 'نمونه', other: 'نمونه' },
  'unit.measurement.plural': { one: 'اندازه‌گیری', other: 'اندازه‌گیری' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Perski ma jedną — oba klucze zostają (kształt słownika jest wspólny dla
     wszystkich języków), a wartości są tu identyczne. */
  'unit.session.plural': { one: 'جلسه', other: 'جلسه' },
  'unit.session.accusative.plural': { one: 'جلسه', other: 'جلسه' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy — po persku także dwa różne słowa: نقطه i امتیاز. */
  'unit.chartPoint.plural': { one: 'نقطه', other: 'نقطه' },
  'unit.point.plural': { one: 'امتیاز', other: 'امتیاز' },
  'unit.kelvin.plural': { one: 'کلوین', other: 'کلوین' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „درصد”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'درصد',
  'unit.spoken.times': 'برابر',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'اجازهٔ دسترسی به دوربین داده نشد. در تنظیمات مرورگر، دوربین را برای این صفحه مجاز کنید و دوباره تلاش کنید.',
  'camera.error.notfound': 'دوربینی پیدا نشد. بررسی کنید که دستگاه دوربین داشته باشد و در سیستم خاموش نشده باشد.',
  'camera.error.inuse': 'دوربین در برنامهٔ دیگری مشغول است. آن برنامه یا زبانه را ببندید و دوباره تلاش کنید.',
  'camera.error.insecure': 'دوربین فقط روی HTTPS یا localhost کار می‌کند. این صفحه را با نشانی‌ای که با «https://» شروع می‌شود باز کنید.',
  'camera.error.unsupported': 'این مرورگر اینجا دوربین را در اختیار نمی‌گذارد. Chrome یا Safari را امتحان کنید، در یک پنجرهٔ معمولی — نه در پیش‌نمایشی که داخل برنامهٔ دیگری جاسازی شده است.',
  'camera.error.unknown': 'دوربین راه‌اندازی نشد.'
};
