/* docs/shared/i18n/fa.js — słownik WSPÓLNY, perski (farsi).
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest perski.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — pilnuje tego
 * keys.test.js. Klucza, którego nie ma w angielskim, nie wolno tu dopisać:
 * angielski jest wartością zapasową, więc to on wyznacza zestaw.
 *
 * KIERUNEK PISMA: perski pisze się od prawej do lewej, ale w napisach NIE MA
 * ani jednego znaku sterującego kierunkiem (U+200E, U+200F, U+202A–U+202E).
 * Kierunkiem zarządza atrybut dir na dokumencie; wstawianie znaków sterujących
 * do słownika psułoby kopiowanie tekstu i czytniki ekranu. Występuje natomiast
 * ZWNJ (U+200C) — to zwykły znak ortografii perskiej („شبانه‌روزی”), a nie
 * sterowanie kierunkiem.
 *
 * CYFRY: pozostawione arabskie zachodnie (3000 K, 0.50, 2017/745), bo stoją
 * przy symbolach jednostek i przy numerze rozporządzenia. Przeglądarka ustawi
 * je we właściwym miejscu zdania sama.
 *
 * LICZEBNIKI: perski ma dwie kategorie CLDR (one, other), a rzeczownik po
 * liczebniku zostaje w liczbie pojedynczej („5 ثانیه”) — dlatego obie formy
 * brzmią tak samo. To nie jest niedopatrzenie.
 *
 * TERMINOLOGIA: دمای رنگ (temperatura barwowa), سوسو زدن (migotanie), نسبت
 * ملانوپیک (współczynnik melanopiczny), اثر شبانه‌روزی (wpływ na rytm dobowy),
 * یکنواختی (równomierność), آسایش چشم (komfort wzrokowy), ساعت زیستی (zegar
 * biologiczny) — po jednym odpowiedniku na pojęcie w całym pliku.
 */
window.I18nData = window.I18nData || {};
window.I18nData['fa'] = Object.assign(window.I18nData['fa'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu (UE)
     2017/745, gdzie stoi na początku zdania jako podmiot. */
  'app.name': 'پایشگر نور',

  /* ---- wybór języka ---- */

  'language.label': 'زبان',
  'language.help': 'زبان کل برنامه. همهٔ زبان‌ها از پیش روی همین دستگاه هستند — چیزی دانلود نمی‌شود و چیزی به جایی فرستاده نمی‌شود.',
  'language.auto': 'مطابق دستگاه',
  'language.autoHint': 'از زبانی که در گوشی یا مرورگر تنظیم شده پیروی می‌کند.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'سهم آبی',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'درصد',
  'metric.share.short': 'چه اندازه از نور دیده‌شده به کانال آبی می‌رسد.',
  'metric.share.help': 'رنگ را از روشنایی جدا می‌کند — وقتی حالت شب را روشن می‌کنید، همین مقدار جابه‌جا می‌شود.',

  'metric.brightness.name': 'روشنایی صحنه',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'درصد',
  'metric.brightness.short': 'روشنایی میانگین تصویر دوربین.',
  'metric.brightness.help': 'مقداری نسبی است، نه لوکس — نوردهی خودکار دوربین آن را از زیر جابه‌جا می‌کند.',

  'metric.kelvin.name': 'دمای رنگ',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'کلوین',
  'metric.kelvin.short': 'اینکه نور گرم است یا سرد.',
  'metric.kelvin.help': 'زیر 3000 K نور گرم است و شب‌ها ملایم‌تر. 6500 K سفید پیش‌فرض بیشتر نمایشگرهاست.',

  'metric.melanopic.name': 'اثر شبانه‌روزی',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'برابر',
  'metric.melanopic.short': 'اینکه این نور چه اندازه بر ساعت زیستی بدن اثر می‌گذارد.',
  'metric.melanopic.help': 'تقریبی از نسبت ملانوپیک. 1.00 سفید خنثای روز است؛ شب‌ها بهتر است زیر 0.50 بروید.',

  'metric.flicker.name': 'سوسو زدن',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'درصد',
  'metric.flicker.short': 'تپش نامرئی منبع نور.',
  'metric.flicker.help': 'دیمرها و نور پس‌زمینهٔ ارزان تپش دارند. چشم آن را نمی‌بیند، اما از علت‌های شناخته‌شدهٔ خستگی و سردرد است.',

  'metric.uniformity.name': 'یکنواختی',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'درصد',
  'metric.uniformity.short': 'اینکه نور در کادر یکنواخت پخش شده است یا نه.',
  'metric.uniformity.help': 'مقدار پایین روی نمایشگر یعنی نشت نور پس‌زمینه یا بازتاب؛ روی میز یعنی چراغی که بد گذاشته شده است.',

  'metric.comfort.name': 'آسایش چشم',
  'metric.comfort.unit': 'امتیاز',
  'metric.comfort.unitSpoken': 'امتیاز',
  'metric.comfort.short': 'یک داوری به جای شش عدد.',
  'metric.comfort.help': 'بقیهٔ اندازه‌گیری‌ها را در امتیازی 0–100 جمع می‌کند و نشان می‌دهد چه چیزی بیش از همه آن را پایین می‌آورد. وزن‌ها داوری تحریری ماست، نه یک استاندارد.',

  /* Etykiety składników oceny komfortu — Metrics.comfortIndex zwraca je jako
     `penalties[].id`, więc nazwa klucza idzie za tym identyfikatorem. */
  'comfort.penalty.melanopic': 'اثر شبانه‌روزی',
  'comfort.penalty.kelvin': 'رنگ سرد نور',
  'comfort.penalty.flicker': 'سوسو زدن',
  'comfort.penalty.uniformity': 'روشنایی ناهموار',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Nazwa przycisku „Start” zostaje po angielsku, bo tak jest podpisany
     w silniku; użytkownik ma znaleźć na ekranie dokładnie to słowo. */

  'engine.idle': 'برای روشن‌کردن دوربین «Start» را بزنید.',
  'engine.starting': 'در حال روشن‌کردن دوربین…',

  'engine.error.permission': 'اجازهٔ دسترسی به دوربین داده نشده است. در تنظیمات مرورگر دوربین را مجاز کنید و دوباره «Start» را بزنید.',
  'engine.error.notFound': 'دوربینی پیدا نشد. بررسی کنید که دستگاه دوربین دارد و در سیستم خاموش نشده است.',
  'engine.error.busy': 'دوربین در برنامهٔ دیگری مشغول است. آن را ببندید و دوباره تلاش کنید.',
  'engine.error.unknown': 'روشن‌کردن دوربین ممکن نشد.',
  'engine.error.unsupported': 'این مرورگر دوربین را در اختیار این صفحه نمی‌گذارد. برنامه را با HTTPS باز کنید یا از مرورگر دیگری استفاده کنید.',

  /* ---- strefy ---- */

  'zone.good': 'در محدوده',
  'zone.warning': 'احتیاط',
  'zone.critical': 'بحرانی',
  'zone.none': 'بدون داده',
  'zone.settling': 'در حال تثبیت',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania, więc bez kropki.
     Perski nie zna wielkiej litery, więc brzmi tak samo jak napis plakietki. */
  'zone.spoken.good': 'در محدوده',
  'zone.spoken.warning': 'احتیاط',
  'zone.spoken.critical': 'بحرانی',
  'zone.spoken.none': 'بدون داده',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'امتیاز',
  'unit.hertz': 'Hz',
  'unit.second': 'ثانیه',
  'unit.minute': 'دقیقه',
  'unit.hour': 'ساعت',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'این نور خوب است — چیزی از آستانه‌هایی که تعیین کرده‌اید فراتر نمی‌رود.',
  'verdict.noValue': 'این کمیت را اکنون نمی‌شود اندازه گرفت. بررسی کنید که چیزی جلوی لنز را نگرفته باشد.',
  'verdict.warmup': 'در حال تعیین داوری — گوشی را لحظه‌ای دیگر بی‌حرکت نگه دارید.',

  'verdict.warning.share': 'بخش قابل‌توجهی از این نور به کانال آبی می‌رسد. شب‌ها بهتر است کم‌نورش کنید.',
  'verdict.warning.brightness': 'صحنه روشن است — دوربین نزدیک به سقف محدودهٔ اندازه‌گیری کار می‌کند.',
  'verdict.warning.kelvin': 'نور نسبتاً سرد است. شب‌ها لامپی حدود 2700 K ملایم‌تر است.',
  'verdict.warning.melanopic': 'این نور نسبتاً قوی بر ساعت زیستی بدن اثر می‌گذارد.',
  'verdict.warning.flicker': 'منبع نور آشکارا سوسو می‌زند.',
  'verdict.warning.uniformity': 'نور در کادر ناهموار پخش شده است.',
  'verdict.warning.comfort': 'آسایش چشم کاهش یافته است — چند عامل با هم در آن نقش داشته‌اند.',

  'verdict.critical.share': 'آبی بسیار زیاد است. شب‌ها حالت شب را روشن کنید یا منبع نور را عوض کنید.',
  'verdict.critical.brightness': 'صحنه بسیار روشن است. مستقیم رو به منبع نور اندازه نگیرید.',
  'verdict.critical.kelvin': 'نور سرد است. شب‌ها همین بیش از همه چشم را خسته می‌کند — لامپ گرم‌تر یا حالت شب کمک می‌کند.',
  'verdict.critical.melanopic': 'این نور قوی بر ساعت زیستی بدن اثر می‌گذارد. شب‌ها بهتر است زیر 0.50 بروید.',
  'verdict.critical.flicker': 'منبع نور شدید سوسو می‌زند. این از علت‌های شناخته‌شدهٔ خستگی چشم و سردرد است.',
  'verdict.critical.uniformity': 'نور بسیار ناهموار پخش شده است. جای چراغ یا بازتاب‌ها روی نمایشگر را بررسی کنید.',
  /* Zdanie bez numeru modułu — wersja, która chce odesłać do swojego ekranu,
     nadpisuje ten jeden klucz u siebie. */
  'verdict.critical.comfort': 'آسایش چشم پایین است. به تفکیک امتیاز نگاه کنید تا ببینید چه چیزی آن را پایین می‌آورد.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'این عدد چه چیزی را نمی‌گوید',
  'note.warningTitle': 'احتیاط',
  'note.dashTitle': 'این اندازه‌گیری چه نیست',
  'note.dashText': 'دوربین گوشی سه کانال رنگی پهن و توازن سفیدی خودکار دارد — طیف را اندازه نمی‌گیرد. دمای رنگ و اثر شبانه‌روزی تقریب‌هایی هستند که از رنگ‌های پایهٔ sRGB محاسبه می‌شوند. برنامه تفاوت‌ها و تغییرات در طول زمان را خوب نشان می‌دهد، جای نورسنج را نمی‌گیرد و هیچ تشخیصی نمی‌دهد.',
  'note.approxLegend': '≈ مقدار تقریبی — محاسبه‌شده از رنگ‌های پایهٔ sRGB، نه از اندازه‌گیری طیف.',
  'note.kelvinOutOfRange': 'خارج از محدودهٔ روش — در این رنگ، فرمول دمای رنگ دیگر قابل اعتماد نیست.',
  /* {rate} i {limit} podaje wywołanie: to liczby z silnika, a ich zapis jest
     różny w różnych językach. Nie wolno ich wpisać do zdania na sztywno. */
  'note.flickerOutOfRange': 'خارج از محدودهٔ روش — نمونه‌برداری {rate} Hz فقط تپش زیر {limit} Hz را می‌بیند. سوسوی 100 Hz برق شهری خارج از دسترس است و برنامه هرگز آن را به‌عنوان نتیجه گزارش نمی‌کند.',
  'note.helpTitle': 'این عدد چه چیزی را نمی‌گوید',
  'note.helpText': 'دوربین گوشی سه کانال پهن دارد و طیف را اندازه نمی‌گیرد. این مقدار یک شاخص مقایسه‌ای است — تفاوت میان نورها و تغییرات در طول زمان را خوب نشان می‌دهد، و نه نتیجهٔ اندازه‌گیری آزمایشگاهی است و نه اطلاعات پزشکی.',
  'note.calibration': 'اندازه‌گیری بدون کالیبراسیون — مقدارها را مقایسه‌ای در نظر بگیرید.',

  'note.howToTitle': 'چگونه درست اندازه بگیریم',
  'note.howTo.hold.title': 'گوشی را بی‌حرکت نگه دارید',
  'note.howTo.hold.text': 'نوردهی خودکار 2–3 ثانیه وقت لازم دارد تا تثبیت شود.',
  'note.howTo.aim.title': 'به سطحی نورخورده نشانه بروید',
  'note.howTo.aim.text': 'یک برگ کاغذ سفید یا دیواری روشن. مستقیم رو به منبع نور اندازه نگیرید.',
  'note.howTo.compare.title': 'مقایسه کنید، مطلق داوری نکنید',
  'note.howTo.compare.text': 'همان صحنه پیش و پس از تغییر روشنایی، بیش از یک عدد تنها می‌گوید.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Skracanie go w tłumaczeniu nie jest kwestią stylu. */

  'legal.noDiagnosis': 'هیچ نتیجه‌ای تشخیص پزشکی یا توصیهٔ سلامت نیست.',
  'legal.mdr': '{app} به مفهوم مقررات (EU) 2017/745 وسیلهٔ پزشکی نیست، برای تشخیص، پیشگیری، پایش یا درمان هیچ بیماری‌ای در نظر گرفته نشده است و جایگزین معاینه نزد پزشک یا اپتومتریست نمی‌شود.',

  /* ---- prywatność ---- */

  'privacy.title': 'چه چیزی این دستگاه را ترک می‌کند',
  'privacy.short': 'هیچ بخشی از این برنامه چیزی به شبکه نمی‌فرستد. همهٔ عددها روی همین دستگاه ساخته می‌شوند و همین‌جا می‌مانند.',
  'privacy.onDevice': 'دوربین تنها پس از فشردن دکمه روشن می‌شود و تصویر هرگز این دستگاه را ترک نمی‌کند.',
  'privacy.external': 'این تنها جای کل برنامه است که چیزی این دستگاه را ترک می‌کند: دکمه صفحه‌ای بیرونی را در زبانه‌ای تازه باز می‌کند، و تنها پس از آنکه آن را بفشارید. اندازه‌گیری، تاریخچه و تنظیمات همین‌جا می‌مانند.',
  'privacy.externalPending': 'وقتی نشانی آماده شد، دکمه صفحه‌ای بیرونی را در زبانه‌ای تازه باز می‌کند. این تنها لحظه‌ای خواهد بود که چیزی این دستگاه را ترک می‌کند. اندازه‌گیری، تاریخچه و تنظیمات همین‌جا می‌مانند.',
  'privacy.storageBlocked': 'این مرورگر اجازه نمی‌دهد چیزی ذخیره شود (حالت ناشناس یا دادهٔ سایت‌ها مسدود شده است). اندازه‌گیری کار می‌کند، اما با بستن زبانه تاریخچه از بین می‌رود.',

  /* ---- liczebniki ----
     Perski ma dwie kategorie CLDR: one (0 i 1) oraz other. Rzeczownik po
     liczebniku zostaje w liczbie pojedynczej, więc obie formy są takie same —
     formę wybiera Intl.PluralRules('fa'), nie nasza reguła. */

  'count.readings': { one: '{n} قرائت', other: '{n} قرائت' },
  'count.sessions': { one: '{n} اندازه‌گیری', other: '{n} اندازه‌گیری' },
  'count.seconds': { one: '{n} ثانیه', other: '{n} ثانیه' },
  'count.minutes': { one: '{n} دقیقه', other: '{n} دقیقه' },
  'count.hours': { one: '{n} ساعت', other: '{n} ساعت' },
  'count.days': { one: '{n} روز', other: '{n} روز' }
});
