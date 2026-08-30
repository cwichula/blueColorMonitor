/* Monitor Światła v5 — słownik bengalski.
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr). NIE JEST
 * KALKĄ żadnego z nich: polskie i angielskie zdania przełożono na naturalną
 * bengalszczyznę, a nie słowo w słowo. Zachowane zostało to, co niesie
 * znaczenie: liczby, progi, jednostki, nazwy wstawek i — co do treści —
 * zastrzeżenia medyczne oraz zdania o prywatności. Tych ostatnich nie wolno
 * osłabiać ani wzmacniać: „nie zastępuje rozmowy z lekarzem” ma po bengalsku
 * znaczyć dokładnie tyle samo, a „obraz nie opuszcza urządzenia” nie może stać
 * się obietnicą szerszą niż polska.
 *
 * REJESTR: standardowy bengalski (শুদ্ধ চলিত ভাষা), uprzejmy tryb -উন
 * („করুন”, „দেখুন”), bez form poufałych. Przyciski i etykiety kafelków są
 * krótkie, teksty pomocy — pełnymi zdaniami zakończonymi dandą (।).
 *
 * CYFRY: bengalskie (০–৯). Nie jest to ozdobnik, tylko zgodność z resztą
 * ekranu: `Intl.NumberFormat('bn')` i `Intl.DateTimeFormat('bn')` — czyli
 * wszystkie wartości pomiarów, godziny i lata z format.js — dają cyfry
 * bengalskie. Liczba wpisana w zdanie łacińskimi cyframi stałaby obok
 * wskazania pisanego bengalskimi i wyglądałaby jak usterka. Symbole jednostek
 * (%, K, ×, Hz) i identyfikatory techniczne (CSV, JSON, sRGB, PWM, HTTPS,
 * localhost) zostają bez zmian.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych):
 *   নীল আলোর অংশ, দৃশ্যের উজ্জ্বলতা, বর্ণ তাপমাত্রা, সার্কাডিয়ান প্রভাব
 *   (w opisie: মেলানোপিক অনুপাত), ফ্লিকার, সমরূপতা, চোখের আরাম.
 *   Pojedyncza wielkość to সূচক, pomiar to পরিমাপ, próg to সীমা,
 *   odczyt to পাঠ, wykres to লেখচিত্র.
 * STREFY: নিরাপদ / মাঝারি / ক্ষতিকর — tak jak angielskie safe/moderate/harmful
 * mówią o świetle, a nie o stanie aplikacji, i wchodzą w zdanie
 * „অঞ্চল: {zone}”.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Tekst ze wstawką {nazwa}'   — napis zwykły,
 *   'klucz.kropkowany': { one, other }               — forma zależna od liczby.
 * Bengalski ma w CLDR dwie kategorie: `one` i `other`
 * (Intl.PluralRules('bn') → ['one', 'other']). Rzeczownik po liczebniku się
 * w bengalskim nie odmienia, więc obie formy są tu tym samym słowem — obiekt
 * zostaje, bo kategorii wymaga keys.test.js i silnik. Nazwy wstawek są
 * identyczne jak w pl.js. Kolejność wstawek w zdaniu wolno zmieniać, nazwy —
 * nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'আলোর মনিটর',
  'app.description': 'আলোর মনিটর — ক্যামেরা দিয়ে আপনার চারপাশের আলোর সাতটি সূচক মাপে। সবকিছু এই ডিভাইসেই হিসাব হয়, কিছুই নেটওয়ার্কে যায় না।',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — আলোর মনিটর',
  'app.skipToContent': 'মূল বিষয়বস্তুতে যান',
  'app.nav.aria': 'প্রধান নেভিগেশন',
  'app.noscript.title': 'এই অ্যাপের জন্য JavaScript দরকার',
  'app.noscript.text': 'পুরো পরিমাপ এই ব্রাউজার ট্যাবের ভিতরেই হয়: JavaScript ক্যামেরার ফ্রেম পড়ে এবং তা থেকে আলোর সাতটি সূচক হিসাব করে। এটি ছাড়া মাপার কিছুই থাকে না। এই পৃষ্ঠার জন্য JavaScript চালু করে আবার খুলুন — তাতেও কিছুই নেটওয়ার্কে পাঠানো হবে না।',

  'nav.measure': 'পরিমাপ',
  'nav.history': 'ইতিহাস',
  'nav.tools': 'সরঞ্জাম',
  'nav.support': 'সহযোগিতা',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'পরিমাপ চলছে',
  'shell.live.aria': 'পরিমাপ চলছে। {metric}: {value}। পরিমাপের পর্দায় ফিরে যান।',
  'shell.live.metricFallback': 'প্রধান সূচক',
  'shell.action.fallback': 'পর্দার ক্রিয়া',

  'shell.loadFail.title': '“{screen}” পর্দাটি লোড করা যায়নি',
  'shell.loadFail.text': 'সম্ভবত ডিভাইসের মেমরিতে কিছু ফাইল নেই। নেটওয়ার্কে যুক্ত হয়ে পৃষ্ঠাটি আবার লোড করুন।',
  'shell.fatal.title': 'কিছু একটা ভুল হয়েছে',
  'shell.fatal.text': 'অ্যাপ পর্দাটি সাজাতে পারেনি। পৃষ্ঠা রিফ্রেশ করলেই সাধারণত হয়ে যায় — আপনার সংরক্ষিত পরিমাপ ও সেটিংস যেমন আছে তেমনই থাকে।',
  'shell.fatal.reload': 'পৃষ্ঠা রিফ্রেশ করুন',
  'shell.boot.failTitle': 'অ্যাপটি চালু করা যায়নি',
  'shell.boot.failText': 'শেল চালু হয়নি। পৃষ্ঠা রিফ্রেশ করুন — আপনার সংরক্ষিত পরিমাপ ও সেটিংস যেমন আছে তেমনই থাকে।',
  'shell.background.error': 'পটভূমিতে কিছু একটা ভেঙে গেছে',
  'shell.background.action': 'রিফ্রেশ',
  'shell.update.title': 'নতুন সংস্করণ এসেছে',
  'shell.update.action': 'রিফ্রেশ',

  'onboarding.title': 'শুরু করার আগে',
  'onboarding.lead': 'আলোর মনিটর ক্যামেরা দিয়ে আপনার চারপাশের আলো দেখে এবং তা থেকে সাতটি সূচক হিসাব করে — নীল আলোর অংশ থেকে চোখের আরাম পর্যন্ত।',
  'onboarding.privacy': 'ছবি এই ডিভাইস ছেড়ে কোথাও যায় না: কোনো সার্ভার নেই, কোনো অ্যাকাউন্ট নেই, আপলোড করার কিছু নেই। সাতটি সূচকই সঙ্গে সঙ্গে কাজ করে, সাইন-ইন ছাড়া এবং কোনো ফি ছাড়া।',
  'onboarding.honesty': 'এটি মোটামুটি একটি ধারণা দেয়, মাপার যন্ত্র নয় এবং চিকিৎসা পরীক্ষাও নয়। যা মাপা যায় না, তা দেখানো হয় না — সংখ্যার বদলে একটি ড্যাশ দেখবেন।',
  'onboarding.start': 'শুরু করা যাক',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'প্রয়োগ করুন',
  'overlay.toast.close': 'বার্তা সরান',
  'overlay.sheet.label': 'ডায়ালগ',
  'overlay.sheet.close': 'বন্ধ করুন',
  'overlay.dialog.confirm': 'নিশ্চিত করুন',
  'overlay.dialog.cancel': 'বাতিল',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'বাতিল',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'পরিমাপ',

  'measure.intro.aria': 'পরিমাপ শুরু করুন',
  'measure.intro.headline': 'কোন আলোয় আছেন, দেখে নিন',
  'measure.intro.lead': 'এই মুহূর্তে আপনার উপর যে আলো পড়ছে তাতে কতটা নীল আছে — আর দিনের এই সময়ের জন্য তা বেশি কি না, ক্যামেরা তা দেখিয়ে দেয়।',
  'measure.intro.start': 'পরিমাপ শুরু করুন',
  'measure.intro.hint': 'ব্রাউজার ক্যামেরা ব্যবহারের অনুমতি চাইবে। অনুমতি দেওয়ার সঙ্গে সঙ্গেই পরিমাপ শুরু হয়।',
  'measure.intro.privacy': 'ক্যামেরার ছবি এই ডিভাইসেই প্রক্রিয়া করা হয় এবং কখনো এটি ছেড়ে যায় না। আমরা একটি ফ্রেমও পাঠাই না, জমা রাখি না বা কারও সঙ্গে ভাগ করি না।',
  'measure.intro.honesty': 'এটি কোনও চিকিৎসা যন্ত্র নয়, পরীক্ষাও নয়। অ্যাপ চারপাশের আলোর একটি আনুমানিক চিত্র দেখায়; এটি স্বাস্থ্য সম্পর্কে রায় দেয় না এবং ডাক্তারের সঙ্গে কথা বলার বিকল্প নয়।',

  'measure.live.aria': 'পরিমাপ চলছে',
  'measure.badge.starting': 'চালু হচ্ছে',
  'measure.badge.paused': 'বিরতি',
  'measure.badge.running': 'পরিমাপ চলছে',
  'measure.stale': 'ছবির অপেক্ষায় — অ্যাপ পটভূমিতে থাকলে প্রিভিউ থেমে যায়।',
  'measure.crop': 'আমরা ফ্রেমের মাঝখানটা মাপি — ছবির প্রস্থ ও উচ্চতার চিহ্নিত {percent} % অংশ।',
  'measure.facing.front': 'সামনের ক্যামেরা',
  'measure.facing.back': 'পিছনের ক্যামেরা',

  'measure.boot.title': 'ক্যামেরা চালু হচ্ছে…',
  'measure.boot.text': 'ব্রাউজার অনুমতি চাইলে দিয়ে দিন — ছবি ছাড়া মাপার কিছু নেই। অনুমতিটি কেবল এই পৃষ্ঠার জন্য, এবং পরে আপনি তা তুলে নিতে পারেন।',
  'measure.boot.cancel': 'বাতিল',

  'measure.hold': 'পাঠ স্থির করে রাখা হয়েছে। ক্যামেরা চলতে থাকে, কিন্তু কিছুই ইতিহাসে বা গড়ে যায় না।',
  'measure.gridHint': 'কোনো টাইল বেছে নিলে সেই সূচকটি বড় ডায়ালে চলে আসে।',

  'measure.stop': 'থামান',
  'measure.pause': 'বিরতি',
  'measure.resume': 'চালিয়ে যান',
  'measure.flip.aria': 'ক্যামেরা বদলান',
  'measure.flip.toBack': 'পিছনের ক্যামেরায় বদলান',
  'measure.flip.toFront': 'সামনের ক্যামেরায় বদলান',

  'measure.fail.aria': 'ক্যামেরা ত্রুটি',
  'measure.fail.headline': 'ক্যামেরা চালু হয়নি',
  'measure.fail.retry': 'আবার চেষ্টা করুন',
  'measure.fail.back': 'ফিরে যান',
  'measure.fail.savedSession': 'বাধা পড়ার আগের সেশনটি ({duration}) ইতিহাসে সংরক্ষণ করা হয়েছে।',
  'measure.error.fallback': 'ক্যামেরা চালু করা যায়নি।',

  'measure.summary.aria': 'সেশনের সারসংক্ষেপ',
  'measure.summary.title': 'সেশনের সারসংক্ষেপ',
  'measure.summary.paused': '{duration} বিরতি',
  'measure.summary.nothingMeasured': 'কোনো সূচকই কোনো পাঠ জোগাড় করতে পারেনি — পুরো সেশনে ক্যামেরা কোনো আলো দেখেনি।',
  'measure.summary.note': 'গড়ে কেবল বিরতির বাইরে নেওয়া নমুনাই গোনা হয়। যেসব সূচক কখনো মাপা হয়নি সেগুলো বাদ যায়, শূন্য ধরা হয় না।',
  'measure.summary.nearThreshold': 'সীমার সবচেয়ে কাছে',
  'measure.summary.worstPoint': 'সবচেয়ে দুর্বল দিক',
  'measure.summary.averageZone': 'গড়ে {zone}',
  'measure.summary.tooShort': 'সেশনটি চলেছে {duration} — নিজে থেকে ইতিহাসে যাওয়ার পক্ষে খুবই ছোট। চাইলে নিজে হাতে সংরক্ষণ করতে পারেন।',
  'measure.summary.again': 'আবার মাপুন',
  'measure.summary.save': 'ইতিহাসে সংরক্ষণ করুন',
  'measure.summary.saved': 'ইতিহাসে সংরক্ষিত',
  'measure.summary.savedToast': 'সেশন ইতিহাসে সংরক্ষণ করা হয়েছে।',
  'measure.summary.close': 'বন্ধ করুন',

  'measure.method.title': 'আমরা কীভাবে মাপি',
  'measure.method.p1': 'অ্যাপ সেকেন্ডে দশবার ক্যামেরার ছবি থেকে নমুনা নেয় এবং ফ্রেমের মাঝের {percent} % অংশ থেকে সূচকগুলো হিসাব করে — প্রিভিউয়ের চৌকো ঠিক ওই জায়গাটিই চিহ্নিত করে।',
  'measure.method.p2': 'ফোনের ক্যামেরায় তিনটি চওড়া চ্যানেল থাকে, সঙ্গে থাকে নিজস্ব স্বয়ংক্রিয় এক্সপোজার ও হোয়াইট ব্যালান্স। এটি আলোর অনুপাত দেখে, আলোর বর্ণালি নয়।',
  'measure.method.p3': 'নীল আলোর অংশ, উজ্জ্বলতা, ফ্লিকার ও সমরূপতা — এগুলোই ক্যামেরা সত্যিকার অর্থে মাপে। বর্ণ তাপমাত্রা ও সার্কাডিয়ান প্রভাব খোলাখুলিভাবে আনুমানিক হিসাব, sRGB প্রাথমিক বর্ণ থেকে গণনা করা।',
  'measure.method.p4': 'ফ্লিকার কেবল চার হার্টজের নিচে ধরা পড়ে। বিদ্যুৎ সরবরাহের ১০০ Hz ফ্লিকার এই নমুনা-হারের নাগালের অনেক বাইরে এবং তা কখনোই পাঠ হিসেবে দেখানো হবে না।',
  'measure.method.p5': 'এই সংখ্যাগুলোর কোনোটিই আলোকমিতিক পরিমাপ নয়, চিকিৎসাগত ফলাফলও নয়। ক্যামেরার ছবি ডিভাইস ছেড়ে যায় না।',
  'measure.method.ok': 'বুঝেছি',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'ক্যামেরা চালু করা বাতিল করা হয়েছে।',
  'measure.announce.stoppedNoSamples': 'পরিমাপ থামানো হয়েছে। কোনো নমুনা জোগাড় হয়নি।',
  'measure.announce.stopped': 'পরিমাপ থামানো হয়েছে। সেশনের সারসংক্ষেপ তৈরি।',
  'measure.announce.interrupted': 'পরিমাপে বাধা পড়েছে। সেশনের সারসংক্ষেপ তৈরি।',
  'measure.announce.paused': 'পরিমাপে বিরতি। পাঠ স্থির করে রাখা হয়েছে।',
  'measure.announce.resumed': 'পরিমাপ আবার চলছে।',
  'measure.announce.switchedFront': 'সামনের ক্যামেরায় বদলানো হয়েছে। নতুন সেশন শুরু হচ্ছে।',
  'measure.announce.switchedBack': 'পিছনের ক্যামেরায় বদলানো হয়েছে। নতুন সেশন শুরু হচ্ছে।',
  'measure.announce.lead': 'প্রধান সূচক: {metric}।',
  'measure.announce.cameraError': 'ক্যামেরা ত্রুটি। {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'পুরো সেশনজুড়ে আলো নিরাপদ সীমার মধ্যেই ছিল — বাতির সেটিং যেমন আছে তেমনই থাকতে দিন, আর অন্ধকার নামার পর আবার দেখে নিন, তখন অন্য উৎস কাজ করে।',
  'measure.advice.share.evening': 'নীল আলোর অংশ গড়ে ছিল {value} — পর্দাগুলোতে নাইট মোড চালু করুন এবং উপরের বাতি নিভিয়ে ডেস্কের উচ্চতায় একটিমাত্র উষ্ণ বাতি রাখুন।',
  'measure.advice.share.day': 'নীল আলোর অংশ গড়ে ছিল {value} — দিনের বেলায় এটি চলে, তবে ঘুমাতে যাওয়ার দুই ঘণ্টা আগে পর্দা যেন নিজে থেকেই উষ্ণ মোডে চলে যায়, তা ঠিক করে রাখুন।',
  'measure.advice.brightness': 'ফ্রেমটি অতিরিক্ত উজ্জ্বল ছিল (গড়ে {value}) — আলোর উৎস থেকে সরে যান বা যে পর্দা মাপছেন তার উজ্জ্বলতা কমান, কারণ এমন এক্সপোজারে বাকি সূচকগুলোও নির্ভুলতা হারায়।',
  'measure.advice.kelvin.evening': 'বর্ণ তাপমাত্রা গড়ে {value}-এ ছিল — অন্ধকার নামার পর ৩০০০ K-এর নিচে নামুন: বাতিটি উষ্ণ মোডে দিন বা ২৭০০ K-এর একটি বাল্ব লাগান।',
  'measure.advice.kelvin.day': 'বর্ণ তাপমাত্রা গড়ে {value}-এ ছিল — দিনের বেলার জন্য এটি ভালো, চনমনে সাদা আলো, তবে সন্ধ্যায় সেই একই বাতি ২৭০০ K-এ নামিয়ে দিন।',
  'measure.advice.melanopic.evening': 'সার্কাডিয়ান প্রভাব গড়ে ছিল {value} — ঘুমানোর আগের দুই ঘণ্টায় ০.৫০ ×-এর নিচে নামুন: প্রধান আলো কমিয়ে দিন এবং ছাদের বদলে ডেস্কের উচ্চতা থেকে আলো ফেলুন।',
  'measure.advice.melanopic.day': 'সার্কাডিয়ান প্রভাব গড়ে ছিল {value} — দিনের এই সময়ে এই মাত্রা কাজে লাগে, তবে সন্ধ্যায় এই উৎসের বদলে দুর্বল ও উষ্ণ কোনো উৎস নিন।',
  'measure.advice.flicker': 'ফ্লিকার গড়ে {value} পর্যন্ত উঠেছে — এর কারণ সাধারণত ডিমার বা খুব কমিয়ে রাখা ব্যাকলাইট: পর্দার উজ্জ্বলতা ৪০ %-এর উপরে তুলুন, বা PWM ব্যবহার করে না এমন ডিমার লাগান।',
  'measure.advice.uniformity': 'আলো অসমভাবে পড়েছে (গড়ে {value}) — একটিমাত্র জোরালো উৎসের বদলে বাতিটি টেবিলের পাশে রাখুন এবং উল্টো দিক থেকে দ্বিতীয় একটি দুর্বল উৎস যোগ করুন।',
  'measure.advice.comfort': 'চোখের আরাম গড়ে {value} হয়েছে — একটিমাত্র পরিবর্তন দিয়ে শুরু করুন: প্রধান উৎসের উজ্জ্বলতা অর্ধেক করুন, তারপরই আলোর রঙ নিয়ে ভাবুন।',
  'measure.advice.default': 'আলোর ব্যবস্থায় একটি জিনিস বদলে আবার মেপে দেখুন — একটিমাত্র পাঠের চেয়ে দুটি সেশনের তুলনা অনেক বেশি কিছু বলে।',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'ইতিহাস',
  'history.action.export': 'ইতিহাস এক্সপোর্ট করুন',

  'history.metricGroup.aria': 'সূচক নির্বাচন',
  'history.announce.metric': 'সূচক: {metric}',
  'history.rangeGroup.aria': 'সময়ের পরিসর',
  'history.range.aria': 'শেষ {range}',

  'history.stats.title': 'পরিসরের পরিসংখ্যান',
  'history.stats.head': '{metric}\u00A0—\u00A0শেষ {range}',
  'history.stats.note': 'লেখচিত্রে যা দেখা যাচ্ছে তা থেকেই হিসাব করা। পরিমাপবিহীন সময় হিসাবে ধরা হয় না — তার জায়গায় আমরা শূন্য বসাই না।',
  'history.stat.min': 'সর্বনিম্ন',
  'history.stat.avg': 'গড়',
  'history.stat.max': 'সর্বোচ্চ',
  'history.trend.up': 'এই পরিসরে বাড়ছে',
  'history.trend.flat': 'স্পষ্ট কোনো বদল নেই',
  'history.trend.down': 'এই পরিসরে কমছে',
  'history.trend.none': 'তুলনা করার মতো কিছু নেই',

  'history.sessions.title': 'পরিমাপের সেশন',
  'history.sessions.count': '{sessions}, নতুনগুলো আগে',
  'history.sessions.empty': 'এখনো কোনো সেশন নেই',
  'history.sessions.hint': 'পরিমাপ থামালেই সেশনটি সংরক্ষিত হয়।',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'পরিসর: {range}',
  'history.session.noMeasure': 'কিছুই মাপা হয়নি',

  'history.data.title': 'ডেটা',
  'history.data.subtitle': 'ইতিহাস কেবল এই ডিভাইসেই জমা থাকে।',
  'history.export.csv': 'CSV এক্সপোর্ট করুন',
  'history.export.json': 'JSON এক্সপোর্ট করুন',
  'history.export.ok': 'ফাইল সংরক্ষণের জন্য তৈরি',
  'history.export.fail': 'ফাইলটি তৈরি করা যায়নি। প্রাইভেট মোডে এবং অন্য অ্যাপের ভিতরে বসানো উইন্ডোতে ব্রাউজার সংরক্ষণ আটকে দেয় — পৃষ্ঠাটি সাধারণ ট্যাবে খুলুন।',
  'history.export.sheet.title': 'ইতিহাস এক্সপোর্ট',
  'history.export.sheet.text': 'CSV স্প্রেডশিটে খোলে (সেমিকোলন দিয়ে আলাদা, দশমিক চিহ্ন হিসেবে কমা)। JSON সবকিছু রাখে, সেশনের তালিকা এবং যেখানে কিছুই মাপা হয়নি সেই ফাঁকগুলোসহ।',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'ইতিহাস মুছে ফেলুন',
  'history.clear.title': 'ইতিহাস মুছে ফেলবেন?',
  'history.clear.text': 'এতে {points} এবং {sessions} মুছে যাবে। এটি আর ফেরানো যায় না — ডেটা রাখতে চাইলে আগে এক্সপোর্ট করে নিন।',
  'history.clear.confirm': 'মুছে ফেলুন',
  'history.clear.announce': 'ইতিহাস মুছে ফেলা হয়েছে।',
  'history.clear.toast': 'ইতিহাস মুছে ফেলা হয়েছে',

  'history.empty.title': 'এখনো দেখানোর কিছু নেই',
  'history.empty.text': 'মাপার সঙ্গে সঙ্গে ইতিহাস ভরতে থাকে — প্রতি সেকেন্ডে একটি বিন্দু। সবকিছু এই ডিভাইসেই থাকে।',
  'history.empty.action': 'পরিমাপে যান',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '১ মিনিট',
  'range.5m': '৫ মিনিট',
  'range.1h': '১ ঘণ্টা',
  'range.24h': '২৪ ঘণ্টা',
  'range.7d': '৭ দিন',
  'range.30d': '৩০ দিন',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'তারিখ ও সময়',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'ডিভাইসের মেমরি ভরে গেছে — নতুন পরিমাপ আর সংরক্ষণ করা হচ্ছে না।',
  'storage.blocked': 'ব্রাউজার ইতিহাস সংরক্ষণ করতে দিচ্ছে না — ট্যাব বন্ধ করলেই ডেটা হারিয়ে যাবে।',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'সরঞ্জাম',
  'tools.action.about': 'পরিমাপ সম্পর্কে',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'ভাষা',
  'tools.language.subtitle': 'ডিফল্টভাবে অ্যাপ আপনার ডিভাইসের ভাষা অনুসরণ করে; এই তালিকা থেকে বেছে নিলে তা সঙ্গে সঙ্গে কাজ করে এবং এই ব্রাউজারে থেকে যায়।',
  'tools.language.aria': 'ইন্টারফেসের ভাষা',
  'tools.language.system': 'স্বয়ংক্রিয়',
  'tools.language.announce': 'ইন্টারফেসের ভাষা: {language}।',

  'tools.appearance.title': 'চেহারা',
  'tools.appearance.theme.title': 'থিম',
  'tools.appearance.theme.desc': '“স্বয়ংক্রিয়” আপনার সিস্টেমের সেটিং অনুসরণ করে।',
  'tools.appearance.theme.aria': 'থিম',
  'tools.theme.system': 'স্বয়ংক্রিয়',
  'tools.theme.light': 'হালকা',
  'tools.theme.dark': 'গাঢ়',
  'tools.appearance.accent.title': 'অ্যাকসেন্ট রঙ',
  'tools.appearance.accent.desc': 'বোতাম, নির্বাচন ও স্লাইডারের রঙ।',
  'tools.appearance.accent.aria': 'অ্যাকসেন্ট রঙ',
  'tools.appearance.textScale.title': 'লেখার আকার',
  'tools.appearance.textScale.desc': 'কেবল লেবেল নয়, পুরো ইন্টারফেস বড় করে।',
  'tools.appearance.textScale.aria': 'লেখার আকার',
  'tools.appearance.density.title': 'ঘনত্ব',
  'tools.appearance.density.desc': 'ঘন বিন্যাসে এক পর্দায় বেশি কিছু আঁটে।',
  'tools.appearance.density.aria': 'বিন্যাসের ঘনত্ব',
  'tools.density.comfortable': 'স্বচ্ছন্দ',
  'tools.density.compact': 'ঘন',
  'tools.appearance.motion.title': 'কম নড়াচড়া',
  'tools.appearance.motion.desc': 'অ্যানিমেশন ও কাঁটার মসৃণ চলা বন্ধ করে। যাই হোক না কেন, আপনার সিস্টেমের সেটিং আমরা মেনে চলি।',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'সাগর',
  'accent.violet': 'বেগুনি',
  'accent.amber': 'অ্যাম্বার',
  'accent.mint': 'পুদিনা',
  'accent.rose': 'গোলাপ',

  'tools.thresholds.title': 'সীমা',
  'tools.thresholds.subtitle': 'কোন মান থেকে অ্যাপ “মাঝারি” বলবে, আর কোনটি থেকে “সংকটজনক”। ডিফল্ট সীমাগুলো আমাদের প্রস্তাব, কোনো মানদণ্ড নয় — নিজের মতো করে ঠিক করে নিন।',
  'tools.thresholds.warn': 'সতর্কতার সীমা',
  'tools.thresholds.crit': 'বিপদের সীমা',
  'tools.thresholds.warn.aria': 'সতর্কতার সীমা — {metric}',
  'tools.thresholds.crit.aria': 'বিপদের সীমা — {metric}',
  'tools.thresholds.reset': 'ডিফল্ট',
  'tools.thresholds.reset.aria': 'ডিফল্ট সীমা ফিরিয়ে আনুন: {metric}',
  'tools.thresholds.moved': '{threshold} সরিয়ে {value}-এ নেওয়া হয়েছে।',
  'tools.thresholds.resetAll': 'সব সীমা ফিরিয়ে আনুন',
  'tools.thresholds.resetAll.title': 'ডিফল্ট সীমা ফিরিয়ে আনবেন?',
  'tools.thresholds.resetAll.text': 'সাতটি সূচকই অ্যাপের প্রস্তাব করা সীমায় ফিরে যাবে। আপনার পরিমাপের ইতিহাসে হাত পড়বে না।',
  'tools.thresholds.resetAll.confirm': 'ফিরিয়ে আনুন',
  'tools.thresholds.resetAll.cancel': 'থাক',
  'tools.thresholds.resetAll.toast': 'সীমা ডিফল্টে ফিরে এসেছে',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': '{warn}-এর উপরে',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} ও তার নিচে',
  'tools.zoneRange.goodBelow': '{warn}-এর নিচে',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} ও তার উপরে',

  'tools.calibration.title': 'ক্যালিব্রেশন',
  'tools.calibration.subtitle': 'যাঁদের হাতে তুলনা করার মতো কিছু আছে, তাঁদের জন্য।',
  'tools.calibration.intro': 'একই বাতির দিকে তাক করা দুটি ফোন সামান্য আলাদা সংখ্যা দেখাবে — প্রতিটি সেন্সরের নিজস্ব একটা আভা থাকে। বিশ্বাসযোগ্য কোনো পাঠ হাতের কাছে থাকলে এখানে ছবির আলাদা আলাদা চ্যানেল একটু বাড়িয়ে বা কমিয়ে নিতে পারেন। গুণকগুলো কিছু হিসাব করার আগেই কাজ করে, তাই একসঙ্গে সাতটি সূচকই বদলে যায়।',
  'tools.calibration.neutral': 'তুলনা করার কিছু নেই? ১.০০-তেই থাকতে দিন — এটাই কারখানার সেটিং এবং এতে কিছুই নষ্ট হয় না।',
  'tools.calibration.forward': 'পরিবর্তন এখন থেকে কাজ করবে। ইতিহাসে আগে থেকে থাকা পরিমাপ সংরক্ষণের মুহূর্তে যেমন ছিল তেমনই থাকে — আমরা সেগুলো নতুন করে হিসাব করি না, কারণ তাতে পরে গিয়ে ডেটা বদলে দেওয়া হতো।',
  'tools.calibration.reset': 'ক্যালিব্রেশন রিসেট করুন',
  'tools.calibration.reset.toast': 'ক্যালিব্রেশন রিসেট হয়েছে',
  'tools.calibration.channel.r': 'লাল চ্যানেল',
  'tools.calibration.channel.g': 'সবুজ চ্যানেল',
  'tools.calibration.channel.b': 'নীল চ্যানেল',
  'tools.calibration.channel.aria': '{channel} — ক্যালিব্রেশন গুণক',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'পরিমাপ',
  'tools.measurement.wake.title': 'পর্দা জাগিয়ে রাখুন',
  'tools.measurement.wake.desc': 'পরিমাপের সময় পর্দা জেগে থাকে। তখন ব্যাটারি দ্রুত ফুরায়।',
  'tools.measurement.wake.unsupported': 'এই ব্রাউজার পর্দা জাগিয়ে রাখতে দেয় না।',
  'tools.measurement.haptics.title': 'কম্পন',
  'tools.measurement.haptics.desc': 'শুরুতে, থামানোর সময় এবং সূচক বদলালে ছোট একটি কম্পন।',
  'tools.measurement.haptics.unsupported': 'এই ডিভাইস কোনো কম্পন মোটরের খবর দেয় না।',

  'tools.about.title': 'পরিমাপ সম্পর্কে',
  'tools.about.subtitle': 'সাতটি সূচকের প্রতিটি ঠিক কী হিসাব করে, আর এই পদ্ধতির সততা কোথায় গিয়ে শেষ হয়।',
  'tools.about.scale': 'স্কেল: {min} থেকে {max} পর্যন্ত।',
  'tools.about.threshold': '{warn} থেকে সতর্ক করি, {crit} থেকে বিপদসংকেত দিই।',
  'tools.about.thresholdInvert': '{warn}-এর নিচে সতর্ক করি, {crit}-এর নিচে বিপদসংকেত দিই।',
  'tools.about.limitsHead': 'এই পরিমাপ যা পারে না',
  'tools.about.limit.spectrum.title': 'ক্যামেরা যন্ত্রের মতো করে রঙ দেখে না',
  'tools.about.limit.spectrum.text': 'ফোনের ক্যামেরায় তিনটি চ্যানেল থাকে: লাল, সবুজ ও নীল। আলো মাপার যন্ত্র সেগুলোকে কয়েক ডজন সরু ব্যান্ডে ভাগ করে। এখানে যা দেখছেন তা ওই তিনটি সংখ্যা থেকেই বের করা — যুক্তিসঙ্গত উপায়ে, তবু তা একটি হিসাব, মেপে পাওয়া বর্ণালি নয়।',
  'tools.about.limit.exposure.title': 'ক্যামেরা নিজেই নিজের উজ্জ্বলতা ঠিক করে নেয়',
  'tools.about.limit.exposure.text': 'জানালার দিকে ফোন তাক করলে ক্যামেরা ছবিটি গাঢ় করে ফেলে, যাতে তা অতিরিক্ত উজ্জ্বল না হয়। তখন “দৃশ্যের উজ্জ্বলতা” কমে যায়, যদিও ঘরে কিছুই বদলায়নি। তাই এই মানটি একটি শটের মধ্যেই তুলনা করুন, ঘরে ঘরে নয়।',
  'tools.about.limit.flicker.title': 'ধীর ক্যামেরা দ্রুত ফ্লিকার ধরতে পারে না',
  'tools.about.limit.flicker.text': 'আমরা সেকেন্ডে {hz} বার ছবি দেখি। সেকেন্ডে {nyquist} বারের চেয়ে দ্রুত স্পন্দন এমন পরিমাপে আসলের চেয়ে ধীর মনে হতে পারে, বা একেবারেই হারিয়ে যেতে পারে — আর বিদ্যুৎ সরবরাহের ফ্লিকার ঠিক ততটাই দ্রুত। অ্যাপ কিছু ধরতে পারলে তাকে “এখানে কিছু একটা স্পন্দিত হচ্ছে” — এই সংকেত হিসেবে নিন, মেপে পাওয়া কম্পাঙ্ক হিসেবে নয়।',
  'tools.about.limit.medical.title': 'এটি চিকিৎসা পরীক্ষাও নয়, চিকিৎসকের পরামর্শও নয়',
  'tools.about.limit.medical.text': 'চারপাশের আলো ঠান্ডা, উজ্জ্বল বা অস্থির — এটি লক্ষ করতে অ্যাপ সাহায্য করে এবং কী করা যায় তার পরামর্শ দেয়। এটি আপনার স্বাস্থ্য নিয়ে কোনো সিদ্ধান্ত দেয় না এবং চিকিৎসকের সঙ্গে কথা বলার বা পেশাদার মিটার দিয়ে মাপার বিকল্প নয়।',
  'tools.about.privacy': 'সবকিছু আপনার ডিভাইসেই হিসাব হয়। ক্যামেরার ছবি কোথাও পাঠানো বা জমা করা হয় না — কেবল হিসাব করা সংখ্যাগুলোই মেমরিতে যায়।',
  'tools.about.privacyPolicy': 'সম্পূর্ণ গোপনীয়তা নীতি',

  'tools.data.title': 'ডেটা',
  'tools.data.subtitle': 'সবকিছু এই ব্রাউজারের মেমরিতেই থাকে এবং এখান থেকে কোথাও যায় না।',
  'tools.data.summary.empty': 'এখনো কোনো সংরক্ষিত পরিমাপ নেই।',
  'tools.data.summary': 'মেমরিতে: {points} এবং {sessions}।',
  'tools.data.export.csv': 'CSV এক্সপোর্ট করুন',
  'tools.data.export.json': 'JSON এক্সপোর্ট করুন',
  'tools.data.clear': 'ইতিহাস মুছে ফেলুন',
  'tools.data.reset': 'ডিফল্ট সেটিংস',
  'tools.data.reset.title': 'ডিফল্ট সেটিংস ফিরিয়ে আনবেন?',
  'tools.data.reset.text': 'চেহারা, সীমা, ক্যালিব্রেশন ও পরিমাপের সেটিংস প্রাথমিক অবস্থায় ফিরে যাবে। আপনার পরিমাপের ইতিহাসে হাত পড়বে না।',
  'tools.data.reset.confirm': 'ফিরিয়ে আনুন',
  'tools.data.reset.toast': 'ডিফল্ট সেটিংস ফিরিয়ে আনা হয়েছে',
  'tools.data.wipe': 'সব ডেটা মুছে ফেলুন',
  'tools.data.wipe.title': 'অ্যাপের সব ডেটা মুছে ফেলবেন?',
  'tools.data.wipe.text': 'মুছে যাবে: পরিমাপের পুরো ইতিহাস ও সেশনের তালিকা, আপনার সীমা ও ক্যালিব্রেশন, এবং চেহারার সেটিংস। অ্যাপ প্রথমবার চালু করার সময়ের অবস্থায় ফিরে যাবে।',
  'tools.data.wipe.note': 'এই ডেটার কোনো কপি আমাদের কাছে নেই — এটি কখনো এই ডিভাইস ছেড়ে যায়নি, তাই ফিরিয়ে আনার মতো কোনো জায়গা নেই।',
  'tools.data.wipe.check': 'আমি বুঝেছি, এটি আর ফেরানো যাবে না',
  'tools.data.wipe.confirm': 'সব মুছে ফেলুন',
  'tools.data.wipe.toast': 'অ্যাপের সব ডেটা মুছে ফেলা হয়েছে',
  'tools.data.wipe.announce': 'অ্যাপের সব ডেটা মুছে ফেলা হয়েছে। সেটিংস ডিফল্টে ফিরে এসেছে।',
  'tools.data.storage.blocked': 'এই ব্রাউজার স্থায়ীভাবে কিছু জমা রাখতে দেয় না (প্রাইভেট মোড, বা সাইটের ডেটা বন্ধ করা)। এখানে যা কিছু ঠিক করবেন, ট্যাব বন্ধ করলেই তা হারিয়ে যাবে।',
  'tools.data.storage.full': 'ব্রাউজারের মেমরি ভরে গেছে এবং নতুন পরিমাপ আর সংরক্ষণ করা হচ্ছে না। ইতিহাস মুছে ফেললে জায়গা খালি হবে।',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'সহযোগিতা',
  'support.free.title': 'সবকিছুই খোলা',
  'support.free.lead': 'সাতটি সূচক, পুরো ইতিহাস, সীমা, ক্যালিব্রেশন ও এক্সপোর্ট — সবই প্রথমবার চালু করার সময় থেকেই কাজ করে; কোনো অ্যাকাউন্ট নেই, কোনো সীমা নেই, কোনো ফি নেই।',
  'support.free.note': 'পরিমাপ পুরোটাই এই ডিভাইসে হিসাব হয় এবং নেটওয়ার্ক ছাড়াই চলে। দেয়ালের আড়ালে রাখা কোনো উন্নততর সংস্করণ এখানে নেই।',
  'support.why.title': 'কেন আমি এটা চাইছি',
  'support.why.lead': 'আলোর মনিটর তৈরি হয় কাজের বাইরের সময়ে — কোনো বিজ্ঞাপন নেই, কোনো পৃষ্ঠপোষক নেই, পিছনে কোনো কোম্পানি নেই। আপনার সহযোগিতা ত্রুটি সারানো, নতুন সূচক যোগ করা এবং যা চলছে তা টিকিয়ে রাখার সময়টুকুর খরচ মেটায়।',
  'support.what.title': 'দান করলে কী পাবেন',
  'support.what.lead': 'কিছুই না। দান কিছুই খুলে দেয় না — কোনো বাড়তি সুবিধা নয়, নামের পাশে কোনো ব্যাজ নয়, কোনো অগ্রাধিকার নয়। অ্যাপ যা কিছু পারে, তা এখনই আপনার হাতে আছে।',
  'support.what.note': 'শুধু এটুকুই থাকে যে আমি জানলাম, কারও কাজে লেগেছে। সত্যিই এটাই যথেষ্ট কারণ।',
  'support.cta.title': 'সাহায্য করতে চাইলে',
  'support.cta.button': 'আমাকে এক কাপ কফি খাওয়ান',
  'support.cta.nolink': 'দানের প্রোফাইল এখনো যুক্ত করা হয়নি। যুক্ত হলে এই জায়গায় একটি বোতাম দাঁড়াবে।',
  'support.cta.privacy': 'এই লিংক নতুন ট্যাবে বাইরের Buy Me a Coffee পাতাটি খোলে। এই ডিভাইস থেকে কিছু বেরোয় কেবল ওই মুহূর্তেই — পরিমাপ নিজে সব সময় এখানেই থাকে।',
  'support.cta.privacyFuture': 'ঠিকানাটি যুক্ত হলে বোতামটি নতুন ট্যাবে বাইরের Buy Me a Coffee পাতাটি খুলবে। এই ডিভাইস থেকে কিছু বেরোনোর সেটিই হবে একমাত্র মুহূর্ত — পরিমাপ নিজে সব সময় এখানেই থাকে।',
  'support.cta.note': 'এখানে কোনো কাউন্টডাউন নেই, কোনো মনে করিয়ে দেওয়া নেই, নিজে থেকে খুলে যাওয়া কোনো উইন্ডোও নেই। এই অনুরোধ কেবল এই ট্যাবেই অপেক্ষা করে, আর কোথাও নয়।',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'শেষ এক মিনিট',
  'gauge.aria': '{metric}: {value}, অঞ্চল: {zone}',
  'gauge.aria.note': '{metric}: {value}, অঞ্চল: {zone}, {note}',
  'gauge.aria.initial': '{metric}: কোনো ডেটা নেই',
  'gauge.value.none': 'কোনো ডেটা নেই',
  /* Odczyt słowny z jednostką: „২৭ শতাংশ”, „১.২০ গুণ”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'আনুমানিক মান',
  'gauge.note.offScale': 'স্কেলের বাইরে',
  'gauge.metric.unknown': 'অজানা সূচক',

  'chart.aria.label': 'পরিমাপের ইতিহাসের লেখচিত্র',
  'chart.hint': 'ইন্টারঅ্যাকটিভ লেখচিত্র। বাঁ ও ডান তিরচিহ্ন পাঠের কার্সার সরায়, Home ও End পরিসরের শুরু ও শেষে নিয়ে যায়, Escape কার্সার লুকিয়ে ফেলে।',
  'chart.empty.title': 'কোনো ডেটা নেই',
  'chart.empty.text': 'পরিমাপ শুরু করুন — প্রথম কয়েকটি পাঠের পরেই লেখচিত্র দেখা যাবে।',
  'chart.few.title': 'যথেষ্ট ডেটা নেই',
  'chart.few.text': 'একটিমাত্র পাঠ আছে: {value}। রেখা আঁকতে দুটি লাগে।',
  'chart.legend.line': 'পরিমাপ',
  'chart.legend.gap': 'পরিমাপে ফাঁক',
  'chart.aria.head': 'লেখচিত্র: {metric}, পরিসর {range}',
  'chart.aria.empty': 'এই পরিসরে কোনো ডেটা নেই।',
  'chart.aria.one': 'একটি পাঠ: {value}।',
  'chart.aria.summary': '{min} থেকে {max}, গড় {avg}, {points}।',
  'chart.aria.gaps': 'ধারাটিতে ফাঁক আছে — তখন আমরা মাপিনি।',
  'chart.readout.empty': 'এই পরিসরে কোনো ডেটা নেই।',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'লেখচিত্র আঁকার মতো যথেষ্ট ডেটা নেই।',
  'chart.readout.hint': 'একটি একটি করে পরিমাপ পড়তে লেখচিত্রের উপর দিয়ে টেনে নিন, বা তিরচিহ্ন ব্যবহার করুন।',
  'chart.time.now': 'এখন',
  'chart.time.justNow': 'একটু আগে',
  'chart.time.ago': '{duration} আগে',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd cyfry bengalskie i zegar
     dwunastogodzinny z „AM”, bo tak `Intl.DateTimeFormat('bn')` formatuje
     godzinę. */
  'chart.sample.ago': '\u2212৩০\u00A0মিনিট',
  'chart.sample.clock': '১২:০০ AM',
  'chart.sample.date': '৩০\u00A0আগস্ট',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'নীল আলোর অংশ',
  'metric.share.short': 'আমরা যে আলো দেখি তার কতটা নীল চ্যানেলে পড়ে।',
  'metric.share.help': 'এটি উজ্জ্বলতা থেকে রঙকে আলাদা করে — নাইট মোড চালু করলে এই মানটিই নড়ে।',
  'metric.brightness.name': 'দৃশ্যের উজ্জ্বলতা',
  'metric.brightness.short': 'ক্যামেরার ছবির গড় উজ্জ্বলতা।',
  'metric.brightness.help': 'এটি আপেক্ষিক মান, লাক্স নয় — ক্যামেরার স্বয়ংক্রিয় এক্সপোজার ভিতরে ভিতরে একে সরিয়ে দেয়।',
  'metric.kelvin.name': 'বর্ণ তাপমাত্রা',
  'metric.kelvin.short': 'আলোটি উষ্ণ না ঠান্ডা।',
  'metric.kelvin.help': '৩০০০ K-এর নিচে আলো উষ্ণ এবং সন্ধ্যায় নরম। বেশির ভাগ পর্দার ডিফল্ট সাদা ৬৫০০ K।',
  'metric.melanopic.name': 'সার্কাডিয়ান প্রভাব',
  'metric.melanopic.short': 'এই আলো দেহঘড়ির উপর কতটা জোরে কাজ করে।',
  'metric.melanopic.help': 'মেলানোপিক অনুপাতের একটি আনুমানিক হিসাব। ১.০০ মানে নিরপেক্ষ দিনের আলোর সাদা; সন্ধ্যায় ০.৫০-এর নিচে নামা ভালো।',
  'metric.flicker.name': 'ফ্লিকার',
  'metric.flicker.short': 'আলোর উৎসের অদৃশ্য স্পন্দন।',
  'metric.flicker.help': 'সস্তা ডিমার ও ব্যাকলাইট স্পন্দিত হয়। চোখ তা দেখে না, তবু একে ক্লান্তি ও মাথাব্যথার একটি সম্ভাব্য কারণ হিসেবে ধরা হয়।',
  'metric.uniformity.name': 'সমরূপতা',
  'metric.uniformity.short': 'আলো ফ্রেমজুড়ে সমানভাবে ছড়ায় কি না।',
  'metric.uniformity.help': 'পর্দায় কম মান মানে ব্যাকলাইট চুইয়ে পড়া বা প্রতিফলন; টেবিলে — বাতির ভুল অবস্থান।',
  'metric.comfort.name': 'চোখের আরাম',
  'metric.comfort.short': 'ছয়টি সংখ্যার বদলে একটিমাত্র স্কোর।',
  'metric.comfort.help': 'এটি বাকি পরিমাপগুলোকে ০–১০০ স্কোরে মিলিয়ে দেয় এবং দেখায় কোনটি একে সবচেয়ে বেশি নামাচ্ছে। ওজনগুলো আমাদের সম্পাদকীয় বিচার, কোনো মানদণ্ড নয়।',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'ভালো',
  'zone.warn': 'মাঝারি',
  'zone.crit': 'সংকটজনক',
  'zone.none': 'কোনো ডেটা নেই',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('২৪ আগস্ট'). */
  'date.month.short.1': 'জানু',
  'date.month.short.2': 'ফেব',
  'date.month.short.3': 'মার্চ',
  'date.month.short.4': 'এপ্রিল',
  'date.month.short.5': 'মে',
  'date.month.short.6': 'জুন',
  'date.month.short.7': 'জুলাই',
  'date.month.short.8': 'আগস্ট',
  'date.month.short.9': 'সেপ্ট',
  'date.month.short.10': 'অক্টো',
  'date.month.short.11': 'নভে',
  'date.month.short.12': 'ডিসে',

  'date.clock': '{hours}:{minutes}',
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}, {year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0ঘণ্টা',
  'time.duration.hourMinute': '{hours}\u00A0ঘণ্টা {minutes}\u00A0মিনিট',
  'time.duration.hour': '{hours}\u00A0ঘণ্টা',
  'time.duration.minuteSecond': '{minutes}\u00A0মিনিট {seconds}\u00A0সেকেন্ড',
  'time.duration.minute': '{minutes}\u00A0মিনিট',
  'time.duration.second': '{seconds}\u00A0সেকেন্ড',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „একটু আগে”. */
  'time.justNow': 'একটু আগে',
  'time.aMinuteAgo': 'এক মিনিট আগে',
  'time.minutesAgo': '{minutes}\u00A0মিনিট আগে',
  'time.hoursAgo': '{hours}\u00A0ঘণ্টা আগে',
  'time.yesterday': 'গতকাল',
  'time.daysAgo': '{days}\u00A0দিন আগে',

  /* Formy zależne od liczby. Bengalski ma w CLDR dwie kategorie: `one`
     i `other`. Rzeczownik po liczebniku się nie odmienia („১ নমুনা”,
     „৫ নমুনা”), więc obie formy są tym samym słowem — obiekt zostaje, bo
     kategorii wymaga silnik i keys.test.js. */
  'time.days.plural': { one: 'দিন', other: 'দিন' },
  'unit.sample.plural': { one: 'নমুনা', other: 'নমুনা' },
  'unit.measurement.plural': { one: 'পরিমাপ', other: 'পরিমাপ' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Bengalski ma jedną — oba klucze zostają (kształt słownika jest wspólny dla
     wszystkich języków), a wartości są tu identyczne. */
  'unit.session.plural': { one: 'সেশন', other: 'সেশন' },
  'unit.session.accusative.plural': { one: 'সেশন', other: 'সেশন' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy — po bengalsku także dwa różne słowa: বিন্দু i পয়েন্ট. */
  'unit.chartPoint.plural': { one: 'বিন্দু', other: 'বিন্দু' },
  'unit.point.plural': { one: 'পয়েন্ট', other: 'পয়েন্ট' },
  'unit.kelvin.plural': { one: 'কেলভিন', other: 'কেলভিন' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „শতাংশ”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'শতাংশ',
  'unit.spoken.times': 'গুণ',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'ক্যামেরা ব্যবহারের অনুমতি দেওয়া হয়নি। ব্রাউজার বা সিস্টেমের সেটিংসে এই পৃষ্ঠার জন্য ক্যামেরা চালু করে আবার চেষ্টা করুন।',
  'camera.error.notfound': 'কোনো ক্যামেরা পাওয়া যায়নি। দেখে নিন ডিভাইসে ক্যামেরা আছে কি না এবং সিস্টেমে তা বন্ধ করা আছে কি না।',
  'camera.error.inuse': 'ক্যামেরা অন্য একটি অ্যাপে ব্যস্ত। সেই অ্যাপ বা ট্যাব বন্ধ করে আবার চেষ্টা করুন।',
  'camera.error.insecure': 'ক্যামেরা কেবল HTTPS-এ বা localhost-এ কাজ করে। এই পৃষ্ঠাটি “https://” দিয়ে শুরু হওয়া ঠিকানায় খুলুন।',
  'camera.error.unsupported': 'এই ব্রাউজার এখানে ক্যামেরা ব্যবহার করতে দেয় না। Chrome বা Safari-তে, সাধারণ উইন্ডোতে চেষ্টা করুন — অন্য অ্যাপের ভিতরে বসানো প্রিভিউতে নয়।',
  'camera.error.unknown': 'ক্যামেরা চালু করা যায়নি।'
};
