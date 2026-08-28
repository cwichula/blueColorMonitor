/* docs/shared/i18n/ur.js — słownik WSPÓLNY, urdu.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest urdu.
 *
 * PISMO OD PRAWEJ DO LEWEJ: urdu zapisuje się od prawej do lewej. W napisach
 * NIE MA ani jednego znaku sterującego kierunkiem (U+200E, U+200F,
 * U+202A…U+202E) — kierunkiem tekstu zarządza atrybut `dir` ustawiany na
 * dokumencie przez warstwę językową, a nie treść słownika. Liczby, symbole
 * jednostek (%, K, ×, Hz) i identyfikatory (sRGB, HTTPS, (EU) 2017/745)
 * zostają zapisem łacińskim — przeglądarka ustawi je sama zgodnie
 * z algorytmem dwukierunkowym Unicode.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js — pilnuje tego
 * keys.test.js w tym katalogu. Klucza, którego nie ma w pl.js, nie wolno tu
 * dopisać, żadnego nie wolno pominąć.
 *
 * LICZEBNIKI: urdu ma dwie kategorie CLDR — one i other. Formę wybiera
 * Intl.PluralRules('ur'), nie nasza reguła.
 *
 * WSTAWKI: '{app}' w legal.mdr, '{rate}' i '{limit}' w note.flickerOutOfRange,
 * '{n}' w liczebnikach. Nazwy identyczne jak w pozostałych językach.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ur'] = Object.assign(window.I18nData['ur'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu
     (UE) 2017/745, gdzie stoi na początku zdania jako podmiot. */
  'app.name': 'روشنی مانیٹر',

  /* ---- wybór języka ---- */

  'language.label': 'زبان',
  'language.help': 'پوری ایپ کی زبان۔ تمام زبانیں پہلے ہی اس آلے پر موجود ہیں — کچھ ڈاؤن لوڈ نہیں ہوتا اور کچھ کہیں نہیں بھیجا جاتا۔',
  'language.auto': 'آلے کے مطابق',
  'language.autoHint': 'آپ کے فون یا براؤزر میں مقرر کردہ زبان کے مطابق۔',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'نیلے کا حصہ',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'فیصد',
  'metric.share.short': 'نظر آنے والی روشنی کا کتنا حصہ نیلے چینل پر آتا ہے۔',
  'metric.share.help': 'یہ رنگ کو چمک سے الگ کرتا ہے — نائٹ موڈ آن کرنے پر یہی قدر بدلتی ہے۔',

  'metric.brightness.name': 'منظر کی چمک',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'فیصد',
  'metric.brightness.short': 'کیمرے کی تصویر کی اوسط چمک۔',
  'metric.brightness.help': 'یہ نسبتی قدر ہے، لکس نہیں — کیمرے کی خودکار نمائش اسے نیچے سے بدلتی رہتی ہے۔',

  'metric.kelvin.name': 'رنگی درجۂ حرارت',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'کیلون',
  'metric.kelvin.short': 'روشنی گرم ہے یا ٹھنڈی۔',
  'metric.kelvin.help': '3000 K سے نیچے روشنی گرم ہوتی ہے اور شام کو نرم لگتی ہے۔ 6500 K زیادہ تر اسکرینوں کی طے شدہ سفیدی ہے۔',

  'metric.melanopic.name': 'یومیہ تال پر اثر',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'گنا',
  'metric.melanopic.short': 'یہ روشنی حیاتیاتی گھڑی پر کتنی شدت سے اثر کرتی ہے۔',
  'metric.melanopic.help': 'میلانوپک تناسب کا تخمینہ۔ 1.00 غیر جانبدار دن کی سفید روشنی ہے؛ شام کو 0.50 سے نیچے رہنا بہتر ہے۔',

  'metric.flicker.name': 'ٹمٹماہٹ',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'فیصد',
  'metric.flicker.short': 'روشنی کے منبع کی غیر مرئی دھڑکن۔',
  'metric.flicker.help': 'سستے ڈمر اور بیک لائٹ دھڑکتے ہیں۔ آنکھ اسے نہیں دیکھتی، مگر یہ تھکن اور سر درد کی معلوم وجہ ہے۔',

  'metric.uniformity.name': 'یکسانیت',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'فیصد',
  'metric.uniformity.short': 'روشنی فریم میں یکساں پھیلی ہوئی ہے یا نہیں۔',
  'metric.uniformity.help': 'اسکرین پر کم قدر کا مطلب بیک لائٹ کا رسنا یا عکس ہے؛ میز پر اس کا مطلب غلط جگہ رکھا لیمپ ہے۔',

  'metric.comfort.name': 'بصری آرام',
  'metric.comfort.unit': 'پوائنٹ',
  'metric.comfort.unitSpoken': 'پوائنٹ',
  'metric.comfort.short': 'چھ اعداد کی جگہ ایک فیصلہ۔',
  'metric.comfort.help': 'یہ باقی پیمائشیں ملا کر 0–100 کا اسکور بناتا ہے اور دکھاتا ہے کہ اسے سب سے زیادہ کیا گھٹا رہا ہے۔ وزن ہماری ادارتی رائے ہیں، کوئی معیار نہیں۔',

  'comfort.penalty.melanopic': 'یومیہ تال پر اثر',
  'comfort.penalty.kelvin': 'روشنی کا ٹھنڈا رنگ',
  'comfort.penalty.flicker': 'ٹمٹماہٹ',
  'comfort.penalty.uniformity': 'غیر یکساں روشنی',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Nazwa przycisku
     „Start” stoi tu w cudzysłowie urdu i musi brzmieć tak samo jak w słowniku
     wersji, bo użytkownik szuka jej wzrokiem na ekranie. */

  'engine.idle': 'کیمرہ چالو کرنے کے لیے ”شروع“ دبائیں۔',
  'engine.starting': 'کیمرہ شروع کیا جا رہا ہے…',

  'engine.error.permission': 'کیمرے تک رسائی کی اجازت نہیں ہے۔ اپنے براؤزر کی ترتیبات میں کیمرے کی اجازت دیں اور دوبارہ ”شروع“ دبائیں۔',
  'engine.error.notFound': 'کوئی کیمرہ نہیں ملا۔ دیکھیں کہ آلے میں کیمرہ موجود ہے اور سسٹم میں بند تو نہیں۔',
  'engine.error.busy': 'کیمرہ کسی دوسری ایپ کے زیرِ استعمال ہے۔ اسے بند کریں اور دوبارہ کوشش کریں۔',
  'engine.error.unknown': 'کیمرہ شروع نہیں کیا جا سکا۔',
  'engine.error.unsupported': 'یہ براؤزر اس صفحے کو کیمرے تک رسائی نہیں دیتا۔ ایپ کو HTTPS کے ذریعے کھولیں یا کوئی دوسرا براؤزر استعمال کریں۔',

  /* ---- strefy ---- */

  'zone.good': 'حد کے اندر',
  'zone.warning': 'احتیاط',
  'zone.critical': 'تشویشناک',
  'zone.none': 'معلومات نہیں',
  'zone.settling': 'طے ہو رہا ہے',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania, więc bez kropki.
     Urdu nie odróżnia wielkości liter, więc brzmienie jest to samo co na
     plakietce; osobne klucze zostają, bo zestaw kluczy jest wspólny. */
  'zone.spoken.good': 'حد کے اندر',
  'zone.spoken.warning': 'احتیاط',
  'zone.spoken.critical': 'تشویشناک',
  'zone.spoken.none': 'معلومات نہیں',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'پوائنٹ',
  'unit.hertz': 'Hz',
  'unit.second': 'سیکنڈ',
  'unit.minute': 'منٹ',
  'unit.hour': 'گھنٹہ',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'یہ روشنی ٹھیک ہے — آپ کی مقرر کردہ کوئی حد عبور نہیں ہو رہی۔',
  'verdict.noValue': 'یہ مقدار اس وقت ناپی نہیں جا سکتی۔ دیکھیں کہ لینس پر کچھ ڈھکا تو نہیں۔',
  'verdict.warmup': 'فیصلہ طے کیا جا رہا ہے — فون کو تھوڑی دیر اور بغیر ہلائے پکڑے رکھیں۔',

  'verdict.warning.share': 'اس روشنی کا خاصا حصہ نیلے چینل پر آتا ہے۔ شام کو اسے مدھم کرنا بہتر ہے۔',
  'verdict.warning.brightness': 'منظر روشن ہے — کیمرہ اپنی پیمائش کی بالائی حد کے قریب کام کر رہا ہے۔',
  'verdict.warning.kelvin': 'روشنی خاصی ٹھنڈی ہے۔ شام کو تقریباً 2700 K کا بلب زیادہ نرم رہتا ہے۔',
  'verdict.warning.melanopic': 'یہ روشنی حیاتیاتی گھڑی پر خاصا اثر کرتی ہے۔',
  'verdict.warning.flicker': 'روشنی کا منبع نمایاں طور پر دھڑک رہا ہے۔',
  'verdict.warning.uniformity': 'روشنی فریم میں غیر یکساں پھیلی ہوئی ہے۔',
  'verdict.warning.comfort': 'بصری آرام گھٹا ہوا ہے — اس میں کئی باتیں مل کر شامل ہوئی ہیں۔',

  'verdict.critical.share': 'نیلا رنگ بہت زیادہ ہے۔ شام کو نائٹ موڈ آن کریں یا روشنی کا منبع بدلیں۔',
  'verdict.critical.brightness': 'منظر بہت روشن ہے۔ سیدھا روشنی کے منبع کی طرف رخ کر کے نہ ناپیں۔',
  'verdict.critical.kelvin': 'روشنی ٹھنڈی ہے۔ شام کو یہ آنکھوں کے لیے سب سے زیادہ تھکا دینے والی ہوتی ہے — زیادہ گرم بلب یا نائٹ موڈ مدد دے گا۔',
  'verdict.critical.melanopic': 'یہ روشنی حیاتیاتی گھڑی پر شدت سے اثر کرتی ہے۔ شام کو 0.50 سے نیچے رہنا بہتر ہے۔',
  'verdict.critical.flicker': 'روشنی کا منبع شدت سے دھڑک رہا ہے۔ یہ آنکھوں کی تھکن اور سر درد کی معلوم وجہ ہے۔',
  'verdict.critical.uniformity': 'روشنی بہت غیر یکساں پھیلی ہوئی ہے۔ لیمپ کی جگہ یا اسکرین پر پڑنے والے عکس دیکھیں۔',
  /* Zdanie bez numeru modułu — patrz komentarz w pl.js przy tym samym kluczu. */
  'verdict.critical.comfort': 'بصری آرام کم ہے۔ دیکھیں کہ اسکور کن حصوں سے بنا ہے تاکہ پتا چلے کہ اسے کیا گھٹا رہا ہے۔',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'یہ عدد کیا نہیں بتاتا',
  'note.warningTitle': 'احتیاط',
  'note.dashTitle': 'یہ پیمائش کیا نہیں ہے',
  'note.dashText': 'فون کے کیمرے میں تین چوڑے رنگی چینل اور خودکار وائٹ بیلنس ہوتا ہے — یہ طیف نہیں ناپتا۔ رنگی درجۂ حرارت اور یومیہ تال پر اثر sRGB رنگوں سے نکالے گئے تخمینے ہیں۔ ایپ فرق اور وقت کے ساتھ آنے والی تبدیلیاں اچھی طرح دکھاتی ہے؛ یہ کسی میٹر کا بدل نہیں اور کوئی تشخیص نہیں کرتی۔',
  'note.approxLegend': '≈ تخمینی قدر — sRGB رنگوں سے نکالی گئی، طیفی پیمائش سے نہیں۔',
  'note.kelvinOutOfRange': 'طریقے کی حد سے باہر — اس رنگ پر رنگی درجۂ حرارت کا فارمولا قابلِ اعتماد نہیں رہتا۔',
  /* {rate} i {limit} podaje wywołanie — zapisu liczby nie wolno wpisywać
     do zdania na sztywno. */
  'note.flickerOutOfRange': 'طریقے کی حد سے باہر — {rate} Hz پر نمونہ گیری صرف {limit} Hz سے نیچے کی دھڑکن دیکھتی ہے۔ بجلی کی 100 Hz ٹمٹماہٹ پہنچ سے باہر ہے اور ایپ اسے کبھی نتیجے کے طور پر نہیں دکھائے گی۔',
  'note.helpTitle': 'یہ عدد کیا نہیں بتاتا',
  'note.helpText': 'فون کے کیمرے میں تین چوڑے چینل ہوتے ہیں اور یہ طیف نہیں ناپتا۔ یہ قدر ایک تقابلی اشاریہ ہے — یہ روشنیوں کے درمیان فرق اور وقت کے ساتھ تبدیلیاں اچھی طرح دکھاتی ہے، اور یہ نہ تجربہ گاہ کی پیمائش ہے نہ طبی معلومات۔',
  'note.calibration': 'پیمائش بغیر کیلبریشن کے — قدروں کو تقابلی طور پر لیں۔',

  'note.howToTitle': 'ٹھیک طرح کیسے ناپیں',
  'note.howTo.hold.title': 'فون کو بغیر ہلائے پکڑیں',
  'note.howTo.hold.text': 'خودکار نمائش کو جمنے میں 2–3 سیکنڈ لگتے ہیں۔',
  'note.howTo.aim.title': 'روشن سطح کی طرف رخ کریں',
  'note.howTo.aim.text': 'سفید کاغذ یا ہلکے رنگ کی دیوار۔ سیدھا روشنی کے منبع کو دیکھتے ہوئے نہ ناپیں۔',
  'note.howTo.compare.title': 'موازنہ کریں، مطلق فیصلہ نہ کریں',
  'note.howTo.compare.text': 'روشنی بدلنے سے پہلے اور بعد کا وہی منظر ایک عدد سے زیادہ بتاتا ہے۔',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Nie skraca się go dla stylu. */

  'legal.noDiagnosis': 'کوئی بھی نتیجہ تشخیص یا صحت کا مشورہ نہیں ہے۔',
  'legal.mdr': '{app} ضابطہ (EU) 2017/745 کے مفہوم میں طبی آلہ نہیں ہے، یہ کسی بھی طبی حالت کی تشخیص، روک تھام، نگرانی یا علاج کے لیے نہیں ہے، اور یہ ڈاکٹر یا ماہرِ بصریات کے معائنے کا بدل نہیں ہے۔',

  /* ---- prywatność ---- */

  'privacy.title': 'اس آلے سے کیا باہر جاتا ہے',
  'privacy.short': 'اس ایپ میں کوئی چیز نیٹ ورک پر کچھ نہیں بھیجتی۔ ہر عدد اسی آلے پر بنتا ہے اور یہیں رہتا ہے۔',
  'privacy.onDevice': 'کیمرہ بٹن دبانے کے بعد ہی چالو ہوتا ہے، اور تصویر کبھی اس آلے سے باہر نہیں جاتی۔',
  'privacy.external': 'پوری ایپ میں یہی واحد جگہ ہے جہاں کوئی چیز اس آلے سے باہر جاتی ہے: بٹن ایک بیرونی صفحہ نئے ٹیب میں کھولتا ہے، اور صرف تب جب آپ اسے دبائیں۔ پیمائش، ریکارڈ اور ترتیبات یہیں رہتی ہیں۔',
  'privacy.externalPending': 'جب پتہ دستیاب ہو گا، بٹن ایک بیرونی صفحہ نئے ٹیب میں کھولے گا۔ یہی واحد لمحہ ہو گا جب کوئی چیز اس آلے سے باہر جائے گی۔ پیمائش، ریکارڈ اور ترتیبات یہیں رہتی ہیں۔',
  'privacy.storageBlocked': 'یہ براؤزر کچھ محفوظ نہیں کرنے دیتا (نجی موڈ، یا سائٹ کا ڈیٹا بند ہے)۔ پیمائش کام کرتی ہے، مگر ٹیب بند کرنے پر ریکارڈ ختم ہو جائے گا۔',

  /* ---- liczebniki ----
     Urdu ma dwie kategorie CLDR: one (1) i other (cała reszta, także ułamki).
     Formę wybiera Intl.PluralRules('ur'), nie nasza reguła. */

  'count.readings': { one: '{n} پیمائش', other: '{n} پیمائشیں' },
  'count.sessions': { one: '{n} نشست', other: '{n} نشستیں' },
  'count.seconds': { one: '{n} سیکنڈ', other: '{n} سیکنڈ' },
  'count.minutes': { one: '{n} منٹ', other: '{n} منٹ' },
  'count.hours': { one: '{n} گھنٹہ', other: '{n} گھنٹے' },
  'count.days': { one: '{n} دن', other: '{n} دن' }
});
