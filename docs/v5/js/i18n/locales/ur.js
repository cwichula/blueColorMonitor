/* Monitor Światła v5 — słownik urdu.
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr). NIE JEST
 * kalką żadnego z nich: polskie i angielskie zdania przełożono na naturalne
 * urdu, a nie słowo w słowo. Zachowane zostało to, co niesie znaczenie:
 * liczby, progi, jednostki, nazwy wstawek i — co do treści — zastrzeżenia
 * medyczne oraz zdania o prywatności. Tych ostatnich nie wolno osłabiać ani
 * wzmacniać: „nie zastępuje rozmowy z lekarzem” ma po urdu znaczyć dokładnie
 * tyle samo, a „obraz nie opuszcza urządzenia” nie może stać się obietnicą
 * szerszą niż polska.
 *
 * PISMO OD PRAWEJ DO LEWEJ. W napisach NIE MA znaków sterujących kierunkiem
 * (U+200E, U+200F, U+202A…U+202E): kierunkiem zarządza atrybut `dir` na
 * dokumencie (js/i18n/index.js zna urdu jako 'rtl'). Znak minus przy etykiecie
 * osi (U+2212) i mnożenie (×) zostają tam, gdzie stoją w pozostałych
 * słownikach — algorytm dwukierunkowy sam przestawia je na właściwą stronę.
 * Cyfry są łacińskie, bo `Intl.NumberFormat('ur')` domyślnie takich używa
 * (numberingSystem: 'latn'), a separatorem dziesiętnym jest kropka — stąd
 * „0.50” i „1.00” w zdaniach, nie „0,50”.
 *
 * INTERPUNKCJA: kropkę zdaniową zapisuje się znakiem ۔ (U+06D4), przecinek
 * znakiem ، (U+060C), pytajnik znakiem ؟ (U+061F). Cudzysłów « » — jak
 * w słowniku arabskim, bo algorytm dwukierunkowy odbija go na właściwą
 * stronę. Nazwy własne i identyfikatory (HTTPS, localhost, CSV, JSON, PWM,
 * sRGB, Chrome, Safari, Buy Me a Coffee, JavaScript, Home, End, Escape)
 * zostają pismem łacińskim.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych):
 *   نیلے کا تناسب (udział niebieskiego), منظر کی چمک (jasność sceny),
 *   رنگ کا درجہ حرارت (temperatura barwowa), یومیہ تال پر اثر (wpływ na rytm
 *   dobowy; w opisie: میلانوپک تناسب — współczynnik melanopiczny),
 *   جھلملاہٹ (migotanie), یکسانیت (równomierność), بصری آرام (komfort
 *   wzrokowy).
 * Osobno rozdzielone: پیمائش (pomiar, czynność) i پیمانہ (mierzona wielkość);
 * ڈائل to tarcza dużego wskaźnika, ریکارڈ to historia, اسکیل to skala
 * wielkości — żeby nie zderzała się z پیمانہ.
 * STREFY: محفوظ / معتدل / نقصان دہ — tak samo jak angielskie safe / moderate /
 * harmful mówią o świetle, a nie o stanie aplikacji, i wchodzą w zdanie
 * „زون: {zone}”.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Tekst ze wstawką {nazwa}'   — napis zwykły,
 *   'klucz.kropkowany': { one, other }               — forma zależna od liczby.
 * Urdu ma w CLDR dwie formy: `one` i `other` — sprawdza to keys.test.js przez
 * Intl.PluralRules('ur'). Nazwy wstawek są identyczne jak w pl.js; kolejność
 * wstawek w zdaniu wolno zmieniać, nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'روشنی مانیٹر',
  'app.description': 'روشنی مانیٹر — کیمرا آپ کے ارد گرد کی روشنی کے سات پیمانے ناپتا ہے۔ سارا حساب اسی ڈیوائس پر ہوتا ہے، کچھ بھی نیٹ ورک پر نہیں جاتا۔',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — روشنی مانیٹر',
  'app.skipToContent': 'مواد پر جائیں',
  'app.nav.aria': 'مرکزی نیویگیشن',
  'app.noscript.title': 'اس ایپ کو JavaScript درکار ہے',
  'app.noscript.text': 'ساری پیمائش براؤزر کے اسی ٹیب کے اندر ہوتی ہے: JavaScript ہی کیمرے کے فریم پڑھتا ہے اور اُن سے روشنی کے سات پیمانے نکالتا ہے۔ اس کے بغیر ناپنے کو کچھ نہیں رہتا۔ اس صفحے کے لیے JavaScript فعال کریں اور اسے دوبارہ کھولیں — پھر بھی نیٹ ورک پر کچھ نہیں بھیجا جائے گا۔',

  'nav.measure': 'پیمائش',
  'nav.history': 'ریکارڈ',
  'nav.tools': 'اوزار',
  'nav.support': 'تعاون',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'پیمائش جاری',
  'shell.live.aria': 'پیمائش جاری ہے۔ {metric}: {value}۔ پیمائش کی اسکرین پر واپس جائیں۔',
  'shell.live.metricFallback': 'نمایاں پیمانہ',
  'shell.action.fallback': 'اسکرین کی کارروائی',

  'shell.loadFail.title': '«{screen}» اسکرین لوڈ نہیں ہو سکی',
  'shell.loadFail.text': 'غالباً ڈیوائس کی میموری میں کچھ فائلیں موجود نہیں۔ نیٹ ورک سے جڑیں اور صفحہ ریفریش کریں۔',
  'shell.fatal.title': 'کچھ غلط ہو گیا',
  'shell.fatal.text': 'ایپ اسکرین ترتیب نہیں دے سکی۔ صفحہ ریفریش کرنا عموماً کافی ہوتا ہے — محفوظ پیمائشیں اور ترتیبات اپنی جگہ رہتی ہیں۔',
  'shell.fatal.reload': 'صفحہ ریفریش کریں',
  'shell.boot.failTitle': 'ایپ چل نہیں سکی',
  'shell.boot.failText': 'شیل شروع نہیں ہوا۔ صفحہ ریفریش کریں — محفوظ پیمائشیں اور ترتیبات اپنی جگہ رہتی ہیں۔',
  'shell.background.error': 'پس منظر میں کچھ خراب ہو گیا',
  'shell.background.action': 'ریفریش',
  'shell.update.title': 'نیا ورژن دستیاب ہے',
  'shell.update.action': 'ریفریش',

  'onboarding.title': 'شروع کرنے سے پہلے',
  'onboarding.lead': 'روشنی مانیٹر کیمرے سے آپ کے ارد گرد کی روشنی دیکھتا ہے اور اُس سے سات پیمانے نکالتا ہے — نیلے کے تناسب سے لے کر بصری آرام تک۔',
  'onboarding.privacy': 'تصویر اس ڈیوائس سے باہر نہیں جاتی: نہ کوئی سرور ہے، نہ اکاؤنٹ، نہ کچھ اپ لوڈ کرنے کو۔ ساتوں پیمانے فوراً کام کرتے ہیں، بغیر سائن اِن اور بغیر فیس کے۔',
  'onboarding.honesty': 'یہ ایک موٹا اندازہ ہے، نہ ناپنے کا آلہ اور نہ طبی معائنہ۔ جو ناپا نہ جا سکے وہ دکھایا نہیں جاتا — عدد کی جگہ آپ کو ڈیش نظر آئے گا۔',
  'onboarding.start': 'چلیے شروع کریں',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'لاگو کریں',
  'overlay.toast.close': 'پیغام بند کریں',
  'overlay.sheet.label': 'ڈائیلاگ',
  'overlay.sheet.close': 'بند کریں',
  'overlay.dialog.confirm': 'تصدیق کریں',
  'overlay.dialog.cancel': 'منسوخ',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'منسوخ',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': '، ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'پیمائش',

  'measure.intro.aria': 'پیمائش شروع کریں',
  'measure.intro.headline': 'دیکھیے آپ پر کیسی روشنی پڑ رہی ہے',
  'measure.intro.lead': 'کیمرا دکھاتا ہے کہ اِس وقت آپ پر پڑنے والی روشنی میں نیلا کتنا ہے — اور کیا دن کے اِس پہر وہ ضرورت سے زیادہ ہے۔',
  'measure.intro.start': 'پیمائش شروع کریں',
  'measure.intro.hint': 'براؤزر کیمرے کی اجازت مانگے گا۔ اجازت دیتے ہی پیمائش شروع ہو جاتی ہے۔',
  'measure.intro.privacy': 'کیمرے کی تصویر اسی ڈیوائس پر پروسیس ہوتی ہے اور کبھی اس سے باہر نہیں جاتی۔ ہم ایک فریم بھی نہ بھیجتے ہیں، نہ محفوظ کرتے ہیں، نہ کسی کو دیتے ہیں۔',

  'measure.live.aria': 'پیمائش جاری ہے',
  'measure.badge.starting': 'شروع ہو رہا ہے',
  'measure.badge.paused': 'وقفہ',
  'measure.badge.running': 'پیمائش جاری',
  'measure.stale': 'تصویر کا انتظار ہے — ایپ پس منظر میں ہو تو پیش نظارہ جم جاتا ہے۔',
  'measure.crop': 'ہم فریم کا وسط ناپتے ہیں — تصویر کی چوڑائی اور اونچائی کا نشان زدہ {percent}%۔',
  'measure.facing.front': 'سامنے والا کیمرا',
  'measure.facing.back': 'پچھلا کیمرا',

  'measure.boot.title': 'کیمرا شروع ہو رہا ہے…',
  'measure.boot.text': 'اگر براؤزر اجازت مانگے تو دے دیں — تصویر کے بغیر ناپنے کو کچھ نہیں۔ یہ اجازت صرف اسی صفحے کے لیے ہے اور آپ اسے بعد میں واپس لے سکتے ہیں۔',
  'measure.boot.cancel': 'منسوخ',

  'measure.hold': 'ریڈنگ منجمد ہیں۔ کیمرا چلتا رہتا ہے، مگر کچھ بھی ریکارڈ یا اوسط تک نہیں پہنچتا۔',
  'measure.gridHint': 'کوئی ٹائل چنیں تاکہ وہ پیمانہ بڑے ڈائل پر آ جائے۔',

  'measure.stop': 'روکیں',
  'measure.pause': 'وقفہ',
  'measure.resume': 'جاری رکھیں',
  'measure.flip.aria': 'کیمرا بدلیں',
  'measure.flip.toBack': 'پچھلے کیمرے پر جائیں',
  'measure.flip.toFront': 'سامنے والے کیمرے پر جائیں',

  'measure.fail.aria': 'کیمرے کی خرابی',
  'measure.fail.headline': 'کیمرا شروع نہیں ہوا',
  'measure.fail.retry': 'دوبارہ کوشش کریں',
  'measure.fail.back': 'واپس',
  'measure.fail.savedSession': 'رکاوٹ سے پہلے کا سیشن ({duration}) ریکارڈ میں محفوظ ہو گیا۔',
  'measure.error.fallback': 'کیمرا شروع نہیں کیا جا سکا۔',

  'measure.summary.aria': 'سیشن کا خلاصہ',
  'measure.summary.title': 'سیشن کا خلاصہ',
  'measure.summary.paused': '{duration} کا وقفہ',
  'measure.summary.nothingMeasured': 'کسی پیمانے نے ریڈنگ جمع نہیں کی — پورے سیشن میں کیمرے کو روشنی نظر نہیں آئی۔',
  'measure.summary.note': 'اوسط صرف اُن نمونوں سے بنتی ہے جو وقفے سے باہر لیے گئے۔ جو پیمانے کبھی ناپے ہی نہ گئے وہ چھوڑ دیے جاتے ہیں، صفر شمار نہیں ہوتے۔',
  'measure.summary.nearThreshold': 'حد کے سب سے قریب',
  'measure.summary.worstPoint': 'سب سے کمزور نقطہ',
  'measure.summary.averageZone': 'اوسطاً {zone}',
  'measure.summary.tooShort': 'سیشن {duration} چلا — اتنا مختصر کہ خود بخود ریکارڈ میں نہ جائے۔ آپ اسے ہاتھ سے محفوظ کر سکتے ہیں۔',
  'measure.summary.again': 'دوبارہ ناپیں',
  'measure.summary.save': 'ریکارڈ میں محفوظ کریں',
  'measure.summary.saved': 'ریکارڈ میں محفوظ ہو گیا',
  'measure.summary.savedToast': 'سیشن ریکارڈ میں محفوظ ہو گیا۔',
  'measure.summary.close': 'بند کریں',

  'measure.method.title': 'ہم یہ کیسے ناپتے ہیں',
  'measure.method.p1': 'ایپ کیمرے کی تصویر سیکنڈ میں دس بار لیتی ہے اور فریم کے درمیانی {percent}% حصے سے پیمانے نکالتی ہے — پیش نظارے کا نشان بالکل یہی حصہ دکھاتا ہے۔',
  'measure.method.p2': 'فون کے کیمرے میں تین چوڑے چینل ہوتے ہیں، اور اس کا اپنا خودکار ایکسپوژر اور وائٹ بیلنس بھی۔ وہ روشنی کے تناسب دیکھتا ہے، اس کا طیف نہیں۔',
  'measure.method.p3': 'نیلے کا تناسب، چمک، جھلملاہٹ اور یکسانیت وہی ہیں جو کیمرا واقعی ناپتا ہے۔ رنگ کا درجہ حرارت اور یومیہ تال پر اثر کھلے عام تخمینے ہیں، جو sRGB کے بنیادی رنگوں سے نکالے جاتے ہیں۔',
  'measure.method.p4': 'جھلملاہٹ صرف چار ہرٹز سے نیچے نظر آتی ہے۔ بجلی کی 100 Hz والی جھلملاہٹ اس نمونہ گیری کی پہنچ سے بہت دور ہے اور اسے کبھی ریڈنگ کے طور پر نہیں دکھایا جائے گا۔',
  'measure.method.p5': 'اِن میں سے کوئی عدد فوٹومیٹرک پیمائش یا طبی نتیجہ نہیں ہے۔ کیمرے کی تصویر ڈیوائس سے باہر نہیں جاتی۔',
  'measure.method.ok': 'سمجھ گیا',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'کیمرے کا آغاز منسوخ کر دیا گیا۔',
  'measure.announce.stoppedNoSamples': 'پیمائش رک گئی۔ کوئی نمونہ جمع نہیں ہوا۔',
  'measure.announce.stopped': 'پیمائش رک گئی۔ سیشن کا خلاصہ تیار ہے۔',
  'measure.announce.interrupted': 'پیمائش میں رکاوٹ آ گئی۔ سیشن کا خلاصہ تیار ہے۔',
  'measure.announce.paused': 'پیمائش روک دی گئی۔ ریڈنگ منجمد ہیں۔',
  'measure.announce.resumed': 'پیمائش دوبارہ شروع ہو گئی۔',
  'measure.announce.switchedFront': 'سامنے والے کیمرے پر منتقل ہو گئے۔ نیا سیشن شروع ہوتا ہے۔',
  'measure.announce.switchedBack': 'پچھلے کیمرے پر منتقل ہو گئے۔ نیا سیشن شروع ہوتا ہے۔',
  'measure.announce.lead': 'نمایاں پیمانہ: {metric}۔',
  'measure.announce.cameraError': 'کیمرے کی خرابی۔ {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'روشنی پورے سیشن میں محفوظ حد کے اندر رہی — لیمپ کو ویسے ہی رہنے دیں اور اندھیرا ہونے کے بعد دوبارہ جانچیں، جب کوئی دوسرا ذریعہ روشن ہو۔',
  'measure.advice.share.evening': 'نیلے کا تناسب اوسطاً {value} رہا — اسکرینوں پر نائٹ موڈ چلائیں اور چھت کی بتی بجھا کر میز کی اونچائی پر ایک گرم لیمپ رہنے دیں۔',
  'measure.advice.share.day': 'نیلے کا تناسب اوسطاً {value} رہا — دن میں یہ قابلِ قبول ہے، مگر اسکرین کو سونے سے دو گھنٹے پہلے خودکار طور پر گرم موڈ میں جانے کے لیے سیٹ کریں۔',
  'measure.advice.brightness': 'فریم حد سے زیادہ روشن تھا (اوسطاً {value}) — روشنی کے ذریعے سے ہٹ جائیں یا جس اسکرین کو ناپ رہے ہیں اس کی چمک کم کریں، کیونکہ اتنے ایکسپوژر پر باقی پیمانوں کی درستی بھی گر جاتی ہے۔',
  'measure.advice.kelvin.evening': 'رنگ کا درجہ حرارت اوسطاً {value} رہا — اندھیرے کے بعد 3000 K سے نیچے آئیں: لیمپ کو گرم موڈ پر کریں یا 2700 K کا بلب لگائیں۔',
  'measure.advice.kelvin.day': 'رنگ کا درجہ حرارت اوسطاً {value} رہا — دن کے لیے یہ اچھی، چوکنا رکھنے والی سفیدی ہے، مگر شام کو اسی لیمپ کو 2700 K پر کر دیں۔',
  'measure.advice.melanopic.evening': 'یومیہ تال پر اثر اوسطاً {value} رہا — سونے سے دو گھنٹے پہلے 0.50 × سے نیچے آئیں: مرکزی روشنی مدھم کریں اور چھت کے بجائے میز کی اونچائی سے روشنی لیں۔',
  'measure.advice.melanopic.day': 'یومیہ تال پر اثر اوسطاً {value} رہا — دن کے اِس پہر یہ مقدار مددگار ہے، مگر شام کو اس ذریعے کی جگہ کوئی کمزور اور گرم ذریعہ رکھ لیں۔',
  'measure.advice.flicker': 'جھلملاہٹ اوسطاً {value} تک پہنچی — اس کے پیچھے عموماً ڈِمر ہوتا ہے یا بہت نیچے رکھی ہوئی بیک لائٹ: اسکرین کی چمک 40% سے اوپر کریں یا ڈِمر بدل کر ایسا لگائیں جو PWM استعمال نہ کرے۔',
  'measure.advice.uniformity': 'روشنی ناہموار پڑ رہی تھی (اوسطاً {value}) — ایک تیز نقطے کے بجائے لیمپ کو میز کے پہلو میں رکھیں اور مخالف سمت سے ایک دوسرا، کمزور ذریعہ شامل کریں۔',
  'measure.advice.comfort': 'بصری آرام اوسطاً {value} رہا — ایک ہی تبدیلی سے شروع کریں: مرکزی ذریعے کی چمک آدھی کریں، اور اس کے بعد ہی روشنی کے رنگ کی طرف آئیں۔',
  'measure.advice.default': 'اپنی روشنی میں ایک چیز بدلیں اور اسے دوبارہ ناپیں — دو سیشن کا موازنہ اکیلی ریڈنگ سے زیادہ بتاتا ہے۔',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'ریکارڈ',
  'history.action.export': 'ریکارڈ ایکسپورٹ کریں',

  'history.metricGroup.aria': 'پیمانے کا انتخاب',
  'history.announce.metric': 'پیمانہ: {metric}',
  'history.rangeGroup.aria': 'وقت کا دورانیہ',
  'history.range.aria': 'گزشتہ {range}',

  'history.stats.title': 'دورانیے کے اعداد و شمار',
  'history.stats.head': '{metric}\u00A0—\u00A0گزشتہ {range}',
  'history.stats.note': 'حساب اسی سے جو گراف پر نظر آتا ہے۔ جس وقت پیمائش نہیں ہوئی وہ شمار نہیں ہوتا — ہم اس کی جگہ صفر نہیں رکھتے۔',
  'history.stat.min': 'کم سے کم',
  'history.stat.avg': 'اوسط',
  'history.stat.max': 'زیادہ سے زیادہ',
  'history.trend.up': 'اس دورانیے میں بڑھ رہا ہے',
  'history.trend.flat': 'کوئی واضح تبدیلی نہیں',
  'history.trend.down': 'اس دورانیے میں گر رہا ہے',
  'history.trend.none': 'موازنے کے لیے کچھ نہیں',

  'history.sessions.title': 'پیمائش کے سیشن',
  'history.sessions.count': '{sessions}، نئے سے پرانے',
  'history.sessions.empty': 'ابھی کوئی سیشن نہیں',
  'history.sessions.hint': 'پیمائش روکتے ہی سیشن محفوظ ہو جاتا ہے۔',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'پھیلاؤ: {range}',
  'history.session.noMeasure': 'کچھ نہیں ناپا گیا',

  'history.data.title': 'ڈیٹا',
  'history.data.subtitle': 'ریکارڈ صرف اسی ڈیوائس پر محفوظ ہے۔',
  'history.export.csv': 'CSV ایکسپورٹ کریں',
  'history.export.json': 'JSON ایکسپورٹ کریں',
  'history.export.ok': 'فائل محفوظ کرنے کے لیے تیار ہے',
  'history.export.fail': 'فائل تیار نہیں ہو سکی۔ پرائیویٹ موڈ میں، اور کسی دوسری ایپ کے اندر کھلی ونڈو میں، براؤزر محفوظ کرنے سے روک دیتا ہے — صفحہ عام ٹیب میں کھولیں۔',
  'history.export.sheet.title': 'ریکارڈ کی ایکسپورٹ',
  'history.export.sheet.text': 'CSV اسپریڈشیٹ میں کھلتی ہے (سیمی کولن سے الگ، اعشاریے کے لیے کاما)۔ JSON سب کچھ رکھتی ہے، سیشن کی فہرست اور وہ خلا بھی جہاں کچھ نہیں ناپا گیا۔',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'ریکارڈ صاف کریں',
  'history.clear.title': 'ریکارڈ صاف کریں؟',
  'history.clear.text': 'اس سے {points} اور {sessions} حذف ہو جائیں گے۔ اسے واپس نہیں لایا جا سکتا — ڈیٹا رکھنا ہو تو پہلے ایکسپورٹ کر لیں۔',
  'history.clear.confirm': 'صاف کریں',
  'history.clear.announce': 'ریکارڈ صاف ہو گیا۔',
  'history.clear.toast': 'ریکارڈ صاف ہو گیا',

  'history.empty.title': 'ابھی دکھانے کو کچھ نہیں',
  'history.empty.text': 'پیمائش کے ساتھ ساتھ ریکارڈ بھرتا جاتا ہے — فی سیکنڈ ایک نقطہ۔ سب کچھ اسی ڈیوائس پر رہتا ہے۔',
  'history.empty.action': 'پیمائش پر جائیں',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 منٹ',
  'range.5m': '5 منٹ',
  'range.1h': '1 گھنٹہ',
  'range.24h': '24 گھنٹے',
  'range.7d': '7 دن',
  'range.30d': '30 دن',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'تاریخ اور وقت',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'ڈیوائس کی میموری بھر گئی ہے — نئی پیمائشیں اب محفوظ نہیں ہو رہیں۔',
  'storage.blocked': 'براؤزر ریکارڈ محفوظ نہیں ہونے دیتا — ٹیب بند کرتے ہی ڈیٹا ختم ہو جائے گا۔',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'اوزار',
  'tools.action.about': 'پیمائش کے بارے میں',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'زبان',
  'tools.language.subtitle': 'ایپ بطورِ طے شدہ آپ کی ڈیوائس کی زبان کے پیچھے چلتی ہے؛ اس فہرست سے کیا گیا انتخاب فوراً لاگو ہوتا ہے اور اسی براؤزر میں رہتا ہے۔',
  'tools.language.aria': 'انٹرفیس کی زبان',
  'tools.language.system': 'خودکار',
  'tools.language.announce': 'انٹرفیس کی زبان: {language}۔',

  'tools.appearance.title': 'ظاہری شکل',
  'tools.appearance.theme.title': 'تھیم',
  'tools.appearance.theme.desc': '«خودکار» نظام کی ترتیب کے پیچھے چلتا ہے۔',
  'tools.appearance.theme.aria': 'تھیم',
  'tools.theme.system': 'خودکار',
  'tools.theme.light': 'روشن',
  'tools.theme.dark': 'گہرا',
  'tools.appearance.accent.title': 'نمایاں رنگ',
  'tools.appearance.accent.desc': 'بٹنوں، انتخاب اور سلائیڈروں کا رنگ۔',
  'tools.appearance.accent.aria': 'نمایاں رنگ',
  'tools.appearance.textScale.title': 'متن کا سائز',
  'tools.appearance.textScale.desc': 'پورے انٹرفیس کو بڑا کرتا ہے، صرف عبارتوں کو نہیں۔',
  'tools.appearance.textScale.aria': 'متن کا سائز',
  'tools.appearance.density.title': 'کثافت',
  'tools.appearance.density.desc': 'گنجان ترتیب ایک ہی اسکرین پر زیادہ مواد سماتی ہے۔',
  'tools.appearance.density.aria': 'ترتیب کی کثافت',
  'tools.density.comfortable': 'کشادہ',
  'tools.density.compact': 'گنجان',
  'tools.appearance.motion.title': 'کم حرکت',
  'tools.appearance.motion.desc': 'اینیمیشن اور سوئی کی نرم روانی بند کر دیتا ہے۔ اس سے قطع نظر ہم نظام کی ترتیب کا لحاظ رکھتے ہیں۔',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'سمندر',
  'accent.violet': 'بنفشی',
  'accent.amber': 'کہربائی',
  'accent.mint': 'پودینہ',
  'accent.rose': 'گلابی',

  'tools.thresholds.title': 'حدیں',
  'tools.thresholds.subtitle': 'کس قدر سے ایپ «معتدل» کہے اور کس سے «نقصان دہ»۔ طے شدہ حدیں ہماری تجویز ہیں، کوئی معیار نہیں — انہیں اپنی ضرورت کے مطابق سیٹ کریں۔',
  'tools.thresholds.warn': 'تنبیہ کی حد',
  'tools.thresholds.crit': 'خطرے کی حد',
  'tools.thresholds.warn.aria': 'تنبیہ کی حد — {metric}',
  'tools.thresholds.crit.aria': 'خطرے کی حد — {metric}',
  'tools.thresholds.reset': 'طے شدہ',
  'tools.thresholds.reset.aria': 'طے شدہ حدیں بحال کریں: {metric}',
  'tools.thresholds.moved': '{threshold} {value} پر منتقل ہو گئی۔',
  'tools.thresholds.resetAll': 'تمام حدیں بحال کریں',
  'tools.thresholds.resetAll.title': 'طے شدہ حدیں بحال کریں؟',
  'tools.thresholds.resetAll.text': 'ساتوں پیمانے ایپ کی تجویز کردہ حدوں پر واپس چلے جائیں گے۔ پیمائش کا ریکارڈ جوں کا توں رہے گا۔',
  'tools.thresholds.resetAll.confirm': 'بحال کریں',
  'tools.thresholds.resetAll.cancel': 'رہنے دیں',
  'tools.thresholds.resetAll.toast': 'حدیں طے شدہ پر واپس آ گئیں',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': '{warn} سے اوپر',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} اور اس سے کم',
  'tools.zoneRange.goodBelow': '{warn} سے نیچے',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} اور اس سے زیادہ',

  'tools.calibration.title': 'کیلیبریشن',
  'tools.calibration.subtitle': 'اُن کے لیے جن کے پاس موازنے کو کچھ ہے۔',
  'tools.calibration.intro': 'ایک ہی لیمپ کی طرف تانے گئے دو فون قدرے مختلف اعداد دکھائیں گے — ہر سینسر کی اپنی رنگت ہوتی ہے۔ اگر آپ کے پاس کوئی ایسی ریڈنگ ہے جس پر بھروسا ہے تو یہاں تصویر کے الگ الگ چینل ہلکے سے اوپر یا نیچے کر سکتے ہیں۔ یہ ضارب کچھ بھی حساب ہونے سے پہلے لگتے ہیں، اس لیے ساتوں پیمانے ایک ساتھ بدل دیتے ہیں۔',
  'tools.calibration.neutral': 'موازنے کو کچھ نہیں؟ اسے 1.00 پر رہنے دیں — یہی فیکٹری ترتیب ہے اور اس سے کچھ خراب نہیں ہوتا۔',
  'tools.calibration.forward': 'تبدیلی اب سے لاگو ہوتی ہے۔ جو پیمائشیں پہلے ہی ریکارڈ میں ہیں وہ ویسی ہی رہتی ہیں جیسی محفوظ ہوتے وقت تھیں — ہم انہیں دوبارہ حساب نہیں کرتے، کیونکہ یہ ڈیٹا کو بعد میں بدلنے کے برابر ہوتا۔',
  'tools.calibration.reset': 'کیلیبریشن ری سیٹ کریں',
  'tools.calibration.reset.toast': 'کیلیبریشن ری سیٹ ہو گئی',
  'tools.calibration.channel.r': 'سرخ چینل',
  'tools.calibration.channel.g': 'سبز چینل',
  'tools.calibration.channel.b': 'نیلا چینل',
  'tools.calibration.channel.aria': '{channel} — کیلیبریشن کا ضارب',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'پیمائش',
  'tools.measurement.wake.title': 'اسکرین جاگتی رکھیں',
  'tools.measurement.wake.desc': 'پیمائش کے دوران اسکرین جاگتی رہتی ہے۔ بیٹری تب تیزی سے خرچ ہوتی ہے۔',
  'tools.measurement.wake.unsupported': 'یہ براؤزر ہمیں اسکرین جاگتی رکھنے نہیں دیتا۔',
  'tools.measurement.haptics.title': 'وائبریشن',
  'tools.measurement.haptics.desc': 'شروع کرنے، روکنے اور پیمانہ بدلنے پر مختصر تصدیق۔',
  'tools.measurement.haptics.unsupported': 'یہ ڈیوائس وائبریشن موٹر کی اطلاع نہیں دیتی۔',

  'tools.about.title': 'پیمائش کے بارے میں',
  'tools.about.subtitle': 'ساتوں پیمانوں میں سے ہر ایک دراصل کیا حساب کرتا ہے، اور اس طریقے کی دیانت کہاں ختم ہوتی ہے۔',
  'tools.about.scale': 'اسکیل: {min} سے {max} تک۔',
  'tools.about.threshold': 'ہم {warn} سے تنبیہ کرتے ہیں اور {crit} سے خطرے کی گھنٹی بجاتے ہیں۔',
  'tools.about.thresholdInvert': 'ہم {warn} سے نیچے تنبیہ کرتے ہیں اور {crit} سے نیچے خطرے کی گھنٹی بجاتے ہیں۔',
  'tools.about.limitsHead': 'یہ پیمائش کیا نہیں کر سکتی',
  'tools.about.limit.spectrum.title': 'کیمرا رنگ اُس طرح نہیں دیکھتا جیسے ناپنے کا آلہ دیکھتا ہے',
  'tools.about.limit.spectrum.text': 'فون کے کیمرے میں تین چینل ہوتے ہیں: سرخ، سبز اور نیلا۔ روشنی ناپنے والا آلہ انہیں درجنوں تنگ پٹیوں میں بانٹتا ہے۔ جو کچھ آپ یہاں دیکھتے ہیں وہ انہی تین اعداد سے نکالا گیا ہے — معقول طریقے سے، مگر پھر بھی یہ حساب ہے، ناپا ہوا طیف نہیں۔',
  'tools.about.limit.exposure.title': 'کیمرا اپنی چمک خود سیٹ کرتا ہے',
  'tools.about.limit.exposure.text': 'فون کو کھڑکی کی طرف کریں تو کیمرا تصویر کو تاریک کر دیتا ہے تاکہ وہ حد سے زیادہ روشن نہ ہو جائے۔ «منظر کی چمک» تب گر جاتی ہے، حالانکہ کمرے میں کچھ نہیں بدلا۔ اس لیے اس قدر کا موازنہ ایک ہی منظر کے اندر کریں، کمروں کے درمیان نہیں۔',
  'tools.about.limit.flicker.title': 'سست کیمرا تیز جھلملاہٹ نہیں پکڑ سکتا',
  'tools.about.limit.flicker.text': 'ہم تصویر کو سیکنڈ میں {hz} بار جانچتے ہیں۔ سیکنڈ میں {nyquist} بار سے تیز دھڑکن ایسی پیمائش میں اپنی اصل رفتار سے سست دکھائی دے سکتی ہے، یا بالکل غائب ہو سکتی ہے — اور بجلی کی جھلملاہٹ بالکل اتنی ہی تیز ہوتی ہے۔ اگر ایپ کچھ پکڑ لے تو اسے «یہاں کچھ دھڑک رہا ہے» کا اشارہ سمجھیں، ناپی ہوئی فریکوئنسی نہیں۔',
  'tools.about.limit.medical.title': 'یہ نہ طبی معائنہ ہے اور نہ طبی مشورہ',
  'tools.about.limit.medical.text': 'ایپ آپ کو یہ محسوس کرنے میں مدد دیتی ہے کہ ارد گرد کی روشنی ٹھنڈی، تیز یا بےچین ہے، اور تجویز دیتی ہے کہ اس کا کیا کیا جا سکتا ہے۔ یہ آپ کی صحت کے بارے میں کوئی فیصلہ نہیں دیتی اور نہ ڈاکٹر سے بات چیت یا پیشہ ورانہ میٹر سے پیمائش کا متبادل ہے۔',
  'tools.about.privacy': 'سارا حساب آپ کی ڈیوائس پر ہوتا ہے۔ کیمرے کی تصویر کہیں نہیں بھیجی جاتی اور نہ کہیں محفوظ کی جاتی ہے — میموری میں صرف حساب کیے ہوئے اعداد جاتے ہیں۔',

  'tools.data.title': 'ڈیٹا',
  'tools.data.subtitle': 'سب کچھ اسی براؤزر کی میموری میں پڑا ہے اور یہاں سے کہیں نہیں جاتا۔',
  'tools.data.summary.empty': 'ابھی کوئی محفوظ پیمائش نہیں ہے۔',
  'tools.data.summary': 'میموری میں: {points} اور {sessions}۔',
  'tools.data.export.csv': 'CSV ایکسپورٹ کریں',
  'tools.data.export.json': 'JSON ایکسپورٹ کریں',
  'tools.data.clear': 'ریکارڈ صاف کریں',
  'tools.data.reset': 'طے شدہ ترتیبات',
  'tools.data.reset.title': 'طے شدہ ترتیبات بحال کریں؟',
  'tools.data.reset.text': 'ظاہری شکل، حدیں، کیلیبریشن اور پیمائش کی ترتیبات اپنی ابتدائی حالت پر واپس چلی جائیں گی۔ پیمائش کا ریکارڈ جوں کا توں رہے گا۔',
  'tools.data.reset.confirm': 'بحال کریں',
  'tools.data.reset.toast': 'طے شدہ ترتیبات بحال ہو گئیں',
  'tools.data.wipe': 'سارا ڈیٹا حذف کریں',
  'tools.data.wipe.title': 'ایپ کا سارا ڈیٹا حذف کریں؟',
  'tools.data.wipe.text': 'یہ سب چلا جائے گا: پیمائش کا پورا ریکارڈ اور سیشن کی فہرست، آپ کی حدیں اور کیلیبریشن، اور ظاہری شکل کی ترتیبات۔ ایپ پہلی بار چلانے والی حالت پر لوٹ آئے گی۔',
  'tools.data.wipe.note': 'اس ڈیٹا کی ہمارے پاس کوئی نقل نہیں — یہ کبھی اس ڈیوائس سے باہر نہیں گیا، اس لیے اسے بحال کرنے کی کوئی جگہ نہیں۔',
  'tools.data.wipe.check': 'میں سمجھتا ہوں کہ اسے واپس نہیں لیا جا سکتا',
  'tools.data.wipe.confirm': 'سب کچھ حذف کریں',
  'tools.data.wipe.toast': 'ایپ کا سارا ڈیٹا حذف ہو گیا',
  'tools.data.wipe.announce': 'ایپ کا سارا ڈیٹا حذف ہو گیا۔ ترتیبات طے شدہ حالت پر واپس آ گئیں۔',
  'tools.data.storage.blocked': 'یہ براؤزر کچھ بھی مستقل محفوظ نہیں ہونے دیتا (پرائیویٹ موڈ، یا سائٹ ڈیٹا بند ہے)۔ آپ یہاں جو کچھ سیٹ کریں گے، ٹیب بند کرتے ہی ختم ہو جائے گا۔',
  'tools.data.storage.full': 'براؤزر کی میموری بھر گئی ہے اور نئی پیمائشیں اب محفوظ نہیں ہو رہیں۔ ریکارڈ صاف کرنے سے جگہ خالی ہو جائے گی۔',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'تعاون',
  'support.free.title': 'سب کچھ دستیاب ہے',
  'support.free.lead': 'ساتوں پیمانے، پورا ریکارڈ، حدیں، کیلیبریشن اور ایکسپورٹ پہلی بار چلانے سے کام کرتے ہیں — نہ اکاؤنٹ، نہ کوئی حد، نہ فیس۔',
  'support.free.note': 'پیمائش پوری کی پوری اسی ڈیوائس پر ہوتی ہے اور نیٹ ورک کے بغیر چلتی ہے۔ یہاں کوئی بہتر نسخہ دیوار کے پیچھے نہیں رکھا گیا۔',
  'support.why.title': 'میں یہ کیوں مانگ رہا ہوں',
  'support.why.lead': 'روشنی مانیٹر فارغ وقت میں بنتا ہے، اس کے پیچھے نہ اشتہار ہیں، نہ کوئی اسپانسر، نہ کوئی کمپنی۔ تعاون سے وہ وقت پورا ہوتا ہے جو درستیوں، نئے پیمانوں اور جو پہلے سے چل رہا ہے اسے زندہ رکھنے میں لگتا ہے۔',
  'support.what.title': 'عطیے سے آپ کو کیا ملتا ہے',
  'support.what.lead': 'کچھ نہیں۔ عطیہ کچھ نہیں کھولتا — نہ کوئی اضافی سہولت، نہ نام کے ساتھ کوئی نشان، نہ کوئی ترجیح۔ ایپ جو کچھ کر سکتی ہے، وہ آپ کے پاس پہلے سے ہے۔',
  'support.what.note': 'بس اتنا رہ جاتا ہے کہ مجھے معلوم ہو کہ یہ کسی کے کام آئی۔ یہ واقعی کافی وجہ ہے۔',
  'support.cta.title': 'اگر آپ مدد کرنا چاہیں',
  'support.cta.button': 'مجھے ایک کافی پلائیں',
  'support.cta.nolink': 'عطیات کا پروفائل ابھی جڑا نہیں ہے۔ جب جڑ جائے گا تو اسی جگہ ایک بٹن آ جائے گا۔',
  'support.cta.privacy': 'یہ لنک Buy Me a Coffee کا بیرونی صفحہ نئے ٹیب میں کھولتا ہے۔ یہی وہ واحد لمحہ ہے جب کوئی چیز اس ڈیوائس سے باہر جاتی ہے — پیمائش خود ہمیشہ یہیں رہتی ہے۔',
  'support.cta.privacyFuture': 'جب پتہ لگ جائے گا تو بٹن Buy Me a Coffee کا بیرونی صفحہ نئے ٹیب میں کھولے گا۔ یہی وہ واحد لمحہ ہوگا جب کوئی چیز اس ڈیوائس سے باہر جائے گی — پیمائش خود ہمیشہ یہیں رہتی ہے۔',
  'support.cta.note': 'یہاں نہ کوئی الٹی گنتی ہے، نہ یاد دہانیاں، نہ کوئی ونڈو جو خود کھل جائے۔ یہ درخواست صرف اسی ٹیب پر انتظار کرتی ہے۔',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'گزشتہ منٹ',
  'gauge.aria': '{metric}: {value}، زون: {zone}',
  'gauge.aria.note': '{metric}: {value}، زون: {zone}، {note}',
  'gauge.aria.initial': '{metric}: کوئی ڈیٹا نہیں',
  'gauge.value.none': 'کوئی ڈیٹا نہیں',
  /* Odczyt słowny z jednostką: „27 فیصد”, „1.20 گنا”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'تخمینی قدر',
  'gauge.note.offScale': 'اسکیل سے باہر',
  'gauge.metric.unknown': 'نامعلوم پیمانہ',

  'chart.aria.label': 'پیمائش کے ریکارڈ کا گراف',
  'chart.hint': 'انٹرایکٹو گراف۔ بائیں اور دائیں تیر ریڈنگ کا کرسر سرکاتے ہیں، Home اور End دورانیے کے آغاز اور اختتام پر لے جاتے ہیں، Escape کرسر چھپا دیتا ہے۔',
  'chart.empty.title': 'کوئی ڈیٹا نہیں',
  'chart.empty.text': 'پیمائش شروع کریں — پہلی ریڈنگ کے بعد گراف نمودار ہو جائے گا۔',
  'chart.few.title': 'ڈیٹا کم ہے',
  'chart.few.text': 'ہمارے پاس ایک ریڈنگ ہے: {value}۔ لکیر کے لیے دو چاہئیں۔',
  'chart.legend.line': 'پیمائش',
  'chart.legend.gap': 'پیمائش میں خلا',
  'chart.aria.head': 'گراف: {metric}، دورانیہ {range}',
  'chart.aria.empty': 'اس دورانیے میں کوئی ڈیٹا نہیں۔',
  'chart.aria.one': 'ایک ریڈنگ: {value}۔',
  'chart.aria.summary': '{min} سے {max} تک، اوسط {avg}، {points}۔',
  'chart.aria.gaps': 'سلسلے میں خلا ہیں — تب ہم ناپ نہیں رہے تھے۔',
  'chart.readout.empty': 'اس دورانیے میں کوئی ڈیٹا نہیں۔',
  'chart.readout.point': '{metric}: {value}، {time}',
  'chart.readout.pointZone': '{metric}: {value}، {zone}، {time}',
  'chart.readout.few': 'گراف بنانے کے لیے ڈیٹا کم ہے۔',
  'chart.readout.hint': 'کوئی ایک پیمائش پڑھنے کے لیے گراف پر انگلی پھیریں یا تیر کی کلیدیں استعمال کریں۔',
  'chart.time.now': 'ابھی',
  'chart.time.justNow': 'ابھی ابھی',
  'chart.time.ago': '{duration} پہلے',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd zegar dwunastogodzinny z „AM”, bo tak
     `Intl.DateTimeFormat('ur')` formatuje godzinę, i najdłuższy skrót
     miesiąca (جولائی). */
  'chart.sample.ago': '\u221230\u00A0منٹ',
  'chart.sample.clock': '12:00 AM',
  'chart.sample.date': '30\u00A0جولائی',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'نیلے کا تناسب',
  'metric.share.short': 'ہمیں نظر آنے والی روشنی کا کتنا حصہ نیلے چینل پر پڑتا ہے۔',
  'metric.share.help': 'یہ رنگ کو چمک سے الگ کرتا ہے — نائٹ موڈ چلانے پر یہی قدر حرکت کرتی ہے۔',
  'metric.brightness.name': 'منظر کی چمک',
  'metric.brightness.short': 'کیمرے کی تصویر کی اوسط چمک۔',
  'metric.brightness.help': 'یہ نسبتی قدر ہے، لکس نہیں — کیمرے کا خودکار ایکسپوژر اسے نیچے سے کھسکاتا رہتا ہے۔',
  'metric.kelvin.name': 'رنگ کا درجہ حرارت',
  'metric.kelvin.short': 'روشنی گرم ہے یا ٹھنڈی۔',
  'metric.kelvin.help': '3000 K سے نیچے روشنی گرم اور شام کے لیے نرم ہوتی ہے۔ 6500 K اکثر اسکرینوں کی طے شدہ سفیدی ہے۔',
  'metric.melanopic.name': 'یومیہ تال پر اثر',
  'metric.melanopic.short': 'یہ روشنی حیاتیاتی گھڑی پر کتنے زور سے اثر ڈالتی ہے۔',
  'metric.melanopic.help': 'میلانوپک تناسب کا تخمینہ۔ 1.00 غیر جانبدار دن کی سفیدی ہے؛ شام کو 0.50 سے نیچے آنا بہتر رہتا ہے۔',
  'metric.flicker.name': 'جھلملاہٹ',
  'metric.flicker.short': 'روشنی کے ذریعے کی غیر مرئی دھڑکن۔',
  'metric.flicker.help': 'سستے ڈِمر اور بیک لائٹیں دھڑکتی ہیں۔ آنکھ اسے نہیں دیکھتی، مگر یہ تھکن اور سر درد کی معروف وجہ ہے۔',
  'metric.uniformity.name': 'یکسانیت',
  'metric.uniformity.short': 'روشنی فریم میں یکساں پھیلتی ہے یا نہیں۔',
  'metric.uniformity.help': 'اسکرین پر کم قدر کا مطلب بیک لائٹ کا رِساؤ یا انعکاس ہے؛ میز پر — غلط رکھا ہوا لیمپ۔',
  'metric.comfort.name': 'بصری آرام',
  'metric.comfort.short': 'چھ اعداد کی جگہ ایک درجہ۔',
  'metric.comfort.help': 'یہ باقی پیمائشوں کو 0 سے 100 تک کے ایک درجے میں سمیٹتا ہے اور دکھاتا ہے کہ اسے سب سے زیادہ کیا گراتا ہے۔ وزن ہماری ادارتی رائے ہیں، کوئی معیار نہیں۔',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'محفوظ',
  'zone.warn': 'معتدل',
  'zone.crit': 'نقصان دہ',
  'zone.none': 'کوئی ڈیٹا نہیں',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 اگست'). Urdu nie skraca nazw
     miesięcy — ICU podaje dla 'ur' te same formy w wersji krótkiej i pełnej. */
  'date.month.short.1': 'جنوری',
  'date.month.short.2': 'فروری',
  'date.month.short.3': 'مارچ',
  'date.month.short.4': 'اپریل',
  'date.month.short.5': 'مئی',
  'date.month.short.6': 'جون',
  'date.month.short.7': 'جولائی',
  'date.month.short.8': 'اگست',
  'date.month.short.9': 'ستمبر',
  'date.month.short.10': 'اکتوبر',
  'date.month.short.11': 'نومبر',
  'date.month.short.12': 'دسمبر',

  'date.clock': '{hours}:{minutes}',
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0{year}',
  'date.dateTime': '{date}، {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0گھنٹے',
  'time.duration.hourMinute': '{hours}\u00A0گھنٹے {minutes}\u00A0منٹ',
  'time.duration.hour': '{hours}\u00A0گھنٹے',
  'time.duration.minuteSecond': '{minutes}\u00A0منٹ {seconds}\u00A0سیکنڈ',
  'time.duration.minute': '{minutes}\u00A0منٹ',
  'time.duration.second': '{seconds}\u00A0سیکنڈ',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „ابھی ابھی”. */
  'time.justNow': 'ابھی ابھی',
  'time.aMinuteAgo': 'ایک منٹ پہلے',
  'time.minutesAgo': '{minutes}\u00A0منٹ پہلے',
  'time.hoursAgo': '{hours}\u00A0گھنٹے پہلے',
  'time.yesterday': 'کل',
  'time.daysAgo': '{days}\u00A0دن پہلے',

  /* Formy zależne od liczby. Urdu ma w CLDR dwie: `one` i `other`.
     Rozstrzyga je Intl.PluralRules dla języka aktywnego. */
  'time.days.plural': { one: 'دن', other: 'دن' },
  'unit.sample.plural': { one: 'نمونہ', other: 'نمونے' },
  'unit.measurement.plural': { one: 'پیمائش', other: 'پیمائشیں' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Urdu odmienia rzeczownik przez przypadek dopiero po przyimku, a w obu tych
     zdaniach stoi on bez przyimka — oba klucze zostają (kształt słownika jest
     wspólny dla wszystkich języków), a wartości są tu identyczne. */
  'unit.session.plural': { one: 'سیشن', other: 'سیشن' },
  'unit.session.accusative.plural': { one: 'سیشن', other: 'سیشن' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy — po urdu też: نقطہ na wykresie, پوائنٹ w wyniku komfortu. */
  'unit.chartPoint.plural': { one: 'نقطہ', other: 'نقطے' },
  'unit.point.plural': { one: 'پوائنٹ', other: 'پوائنٹ' },
  'unit.kelvin.plural': { one: 'کیلون', other: 'کیلون' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „فیصد”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'فیصد',
  'unit.spoken.times': 'گنا',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'کیمرے کے استعمال کی اجازت نہیں دی گئی۔ براؤزر کی ترتیبات میں اس صفحے کے لیے کیمرے کی اجازت دیں اور دوبارہ کوشش کریں۔',
  'camera.error.notfound': 'کوئی کیمرا نہیں ملا۔ دیکھیں کہ ڈیوائس میں کیمرا موجود ہے اور نظام میں بند تو نہیں۔',
  'camera.error.inuse': 'کیمرا کسی دوسری ایپ کے زیرِ استعمال ہے۔ وہ ایپ یا ٹیب بند کریں اور دوبارہ کوشش کریں۔',
  'camera.error.insecure': 'کیمرا صرف HTTPS پر یا localhost پر کام کرتا ہے۔ یہ صفحہ ایسے پتے پر کھولیں جو «https://» سے شروع ہوتا ہو۔',
  'camera.error.unsupported': 'یہ براؤزر یہاں کیمرا فراہم نہیں کرتا۔ Chrome یا Safari میں، عام ونڈو میں آزمائیں — کسی دوسری ایپ کے اندر کھلے پیش نظارے میں نہیں۔',
  'camera.error.unknown': 'کیمرا شروع نہیں کیا جا سکا۔'
};
