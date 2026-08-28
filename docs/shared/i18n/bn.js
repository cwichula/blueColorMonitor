/* docs/shared/i18n/bn.js — słownik WSPÓLNY, bengalski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest bengalski.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — pilnuje tego
 * docs/shared/i18n/keys.test.js. Klucza, którego nie ma w angielskim, nie wolno
 * tu dopisać: angielski jest wartością zapasową, więc to on wyznacza zestaw.
 *
 * ZAPIS LICZB: aplikacja formatuje wartości przez Intl.NumberFormat('bn'),
 * czyli cyframi bengalskimi (৬,৫০০). Liczby wpisane w zdania idą więc tym
 * samym zapisem, żeby nie kłóciły się z tym, co widać na kafelku. Wyjątkiem
 * jest numer rozporządzenia (UE) 2017/745 — to identyfikator prawny.
 *
 * TERMINOLOGIA (jeden odpowiednik na pojęcie w całym pliku):
 * temperatura barwowa — বর্ণ তাপমাত্রা; migotanie — মিটমিটানি (pulsowanie —
 * স্পন্দন); współczynnik melanopiczny — মেলানোপিক অনুপাত; zegar biologiczny —
 * দেহঘড়ি; równomierność — সমরূপতা.
 */
window.I18nData = window.I18nData || {};
window.I18nData['bn'] = Object.assign(window.I18nData['bn'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu
     (UE) 2017/745, gdzie stoi jako podmiot. */
  'app.name': 'আলোর মনিটর',

  /* ---- wybór języka ---- */

  'language.label': 'ভাষা',
  'language.help': 'পুরো অ্যাপের ভাষা। সব ভাষা আগে থেকেই এই ডিভাইসে আছে — কিছুই ডাউনলোড হয় না এবং কোথাও কিছু পাঠানো হয় না।',
  'language.auto': 'ডিভাইস অনুযায়ী',
  'language.autoHint': 'ফোনে বা ব্রাউজারে ঠিক করা ভাষা অনুসরণ করে।',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'নীল আলোর অংশ',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'শতাংশ',
  'metric.share.short': 'দেখা আলোর কতটা নীল চ্যানেলে পড়ে।',
  'metric.share.help': 'রংকে উজ্জ্বলতা থেকে আলাদা করে — নাইট মোড চালু করলে এই মানটিই বদলায়।',

  'metric.brightness.name': 'দৃশ্যের উজ্জ্বলতা',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'শতাংশ',
  'metric.brightness.short': 'ক্যামেরার ছবির গড় উজ্জ্বলতা।',
  'metric.brightness.help': 'আপেক্ষিক মান, লাক্স নয় — ক্যামেরার স্বয়ংক্রিয় এক্সপোজার একে ভিতর থেকে সরিয়ে দেয়।',

  'metric.kelvin.name': 'বর্ণ তাপমাত্রা',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'কেলভিন',
  'metric.kelvin.short': 'আলো উষ্ণ না ঠান্ডা।',
  'metric.kelvin.help': '৩০০০ K-এর নিচে আলো উষ্ণ এবং সন্ধ্যায় নরম। ৬৫০০ K বেশির ভাগ পর্দার সাধারণ সাদা।',

  'metric.melanopic.name': 'দেহঘড়িতে প্রভাব',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'গুণ',
  'metric.melanopic.short': 'এই আলো দেহঘড়ির উপর কতটা জোরে কাজ করে।',
  'metric.melanopic.help': 'মেলানোপিক অনুপাতের আনুমানিক মান। ১.০০ হলো নিরপেক্ষ দিনের সাদা; সন্ধ্যায় ০.৫০-এর নিচে নামা ভালো।',

  'metric.flicker.name': 'মিটমিটানি',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'শতাংশ',
  'metric.flicker.short': 'আলোর উৎসের অদৃশ্য স্পন্দন।',
  'metric.flicker.help': 'সস্তা ডিমার আর ব্যাকলাইট স্পন্দিত হয়। চোখ তা দেখে না, তবু এটি ক্লান্তি ও মাথাব্যথার একটি পরিচিত কারণ।',

  'metric.uniformity.name': 'সমরূপতা',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'শতাংশ',
  'metric.uniformity.short': 'আলো ফ্রেমে সমানভাবে ছড়িয়ে আছে কি না।',
  'metric.uniformity.help': 'পর্দায় কম মান মানে ব্যাকলাইট চুইয়ে পড়া বা প্রতিফলন; ডেস্কে — ভুলভাবে বসানো বাতি।',

  'metric.comfort.name': 'চোখের আরাম',
  'metric.comfort.unit': 'পয়েন্ট',
  'metric.comfort.unitSpoken': 'পয়েন্ট',
  'metric.comfort.short': 'ছয়টি সংখ্যার বদলে একটিমাত্র মূল্যায়ন।',
  'metric.comfort.help': 'বাকি পরিমাপগুলোকে ০–১০০ স্কোরে জুড়ে দেয় এবং দেখায় কোনটি একে সবচেয়ে বেশি নামায়। ওজনগুলো আমাদের সম্পাদকীয় বিচার, কোনো মান নয়।',

  'comfort.penalty.melanopic': 'দেহঘড়িতে প্রভাব',
  'comfort.penalty.kelvin': 'ঠান্ডা আলোর রং',
  'comfort.penalty.flicker': 'মিটমিটানি',
  'comfort.penalty.uniformity': 'অসম আলো',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': 'ক্যামেরা চালু করতে “শুরু” চাপুন।',
  'engine.starting': 'ক্যামেরা চালু করছি…',

  'engine.error.permission': 'ক্যামেরা ব্যবহারের অনুমতি নেই। ব্রাউজারের সেটিংসে ক্যামেরার অনুমতি দিন এবং আবার “শুরু” চাপুন।',
  'engine.error.notFound': 'কোনো ক্যামেরা পাওয়া যায়নি। দেখে নিন ডিভাইসে ক্যামেরা আছে কি না এবং সেটি সিস্টেমে বন্ধ করা আছে কি না।',
  'engine.error.busy': 'ক্যামেরা অন্য একটি অ্যাপ্লিকেশন ব্যবহার করছে। সেটি বন্ধ করে আবার চেষ্টা করুন।',
  'engine.error.unknown': 'ক্যামেরা চালু করা যায়নি।',
  'engine.error.unsupported': 'এই ব্রাউজার এই পাতাকে ক্যামেরা ব্যবহার করতে দেয় না। অ্যাপটি HTTPS দিয়ে খুলুন অথবা অন্য ব্রাউজার ব্যবহার করুন।',

  /* ---- strefy ---- */

  'zone.good': 'সীমার মধ্যে',
  'zone.warning': 'সতর্কতা',
  'zone.critical': 'গুরুতর',
  'zone.none': 'তথ্য নেই',
  'zone.settling': 'স্থির হচ্ছে',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania, więc bez kropki.
     Bengalski nie odmienia tych wyrażeń, więc brzmią tak samo jak plakietka. */
  'zone.spoken.good': 'সীমার মধ্যে',
  'zone.spoken.warning': 'সতর্কতা',
  'zone.spoken.critical': 'গুরুতর',
  'zone.spoken.none': 'তথ্য নেই',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'পয়েন্ট',
  'unit.hertz': 'Hz',
  'unit.second': 'সে.',
  'unit.minute': 'মিন.',
  'unit.hour': 'ঘ.',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'এই আলো ঠিক আছে — আপনার ঠিক করা কোনো সীমাই পেরোয়নি।',
  'verdict.noValue': 'এই মানটি এখন মাপা যাচ্ছে না। দেখে নিন লেন্স কিছু দিয়ে ঢাকা পড়েছে কি না।',
  'verdict.warmup': 'মূল্যায়ন ঠিক করছি — ফোনটি আরও কিছুক্ষণ স্থির রাখুন।',

  'verdict.warning.share': 'এই আলোর বেশ খানিকটা নীল চ্যানেলে পড়ে। সন্ধ্যায় একে কমিয়ে নেওয়া ভালো।',
  'verdict.warning.brightness': 'দৃশ্যটি উজ্জ্বল — ক্যামেরা তার পরিমাপ সীমার উপরের প্রান্তের কাছে কাজ করছে।',
  'verdict.warning.kelvin': 'আলো বেশ ঠান্ডা। সন্ধ্যায় প্রায় ২৭০০ K-এর বাতি নরম লাগে।',
  'verdict.warning.melanopic': 'এই আলো দেহঘড়ির উপর বেশ জোরে কাজ করে।',
  'verdict.warning.flicker': 'আলোর উৎস স্পষ্টভাবে স্পন্দিত হচ্ছে।',
  'verdict.warning.uniformity': 'আলো ফ্রেমে অসমভাবে ছড়িয়ে আছে।',
  'verdict.warning.comfort': 'চোখের আরাম কমেছে — একসঙ্গে কয়েকটি কারণ জমা হয়েছে।',

  'verdict.critical.share': 'খুব বেশি নীল। সন্ধ্যায় নাইট মোড চালু করুন অথবা আলোর উৎস বদলান।',
  'verdict.critical.brightness': 'দৃশ্যটি খুব উজ্জ্বল। সরাসরি আলোর উৎসের দিকে তাক করে মাপবেন না।',
  'verdict.critical.kelvin': 'আলো ঠান্ডা। সন্ধ্যায় এটিই চোখকে সবচেয়ে বেশি ক্লান্ত করে — উষ্ণতর বাতি বা নাইট মোড সাহায্য করবে।',
  'verdict.critical.melanopic': 'এই আলো দেহঘড়ির উপর জোরে কাজ করে। সন্ধ্যায় ০.৫০-এর নিচে নামা ভালো।',
  'verdict.critical.flicker': 'আলোর উৎস জোরে স্পন্দিত হচ্ছে। এটি চোখের ক্লান্তি ও মাথাব্যথার একটি পরিচিত কারণ।',
  'verdict.critical.uniformity': 'আলো খুব অসমভাবে ছড়িয়ে আছে। বাতির অবস্থান অথবা পর্দার প্রতিফলন দেখে নিন।',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'চোখের আরাম কম। কী একে নামাচ্ছে তা দেখতে স্কোরের বিশ্লেষণটি দেখুন।',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'এই সংখ্যাটি যা বলে না',
  'note.warningTitle': 'সতর্কতা',
  'note.dashTitle': 'এই পরিমাপ যা নয়',
  'note.dashText': 'ফোনের ক্যামেরায় তিনটি চওড়া বর্ণ-চ্যানেল আর স্বয়ংক্রিয় হোয়াইট ব্যালেন্স আছে — এটি বর্ণালি মাপে না। বর্ণ তাপমাত্রা এবং দেহঘড়িতে প্রভাব sRGB রং থেকে হিসাব করা আনুমানিক মান। অ্যাপটি পার্থক্য আর সময়ের সঙ্গে বদল ভালোভাবে দেখায়, মিটারের বিকল্প নয় এবং কোনো রোগনির্ণয় করে না।',
  'note.approxLegend': '≈ আনুমানিক মান — sRGB রং থেকে হিসাব করা, বর্ণালি পরিমাপ থেকে নয়।',
  'note.kelvinOutOfRange': 'পদ্ধতির সীমার বাইরে — এই রঙে বর্ণ তাপমাত্রার সূত্র আর নির্ভরযোগ্য থাকে না।',
  'note.flickerOutOfRange': 'পদ্ধতির সীমার বাইরে — {rate} Hz-এ নমুনা নিলে কেবল {limit} Hz-এর নিচের স্পন্দন দেখা যায়। বিদ্যুতের লাইনের ১০০ Hz নাগালের বাইরে এবং অ্যাপ কখনোই একে ফল হিসেবে দেখাবে না।',
  'note.helpTitle': 'এই সংখ্যাটি যা বলে না',
  'note.helpText': 'ফোনের ক্যামেরায় তিনটি চওড়া চ্যানেল আছে এবং এটি বর্ণালি মাপে না। এই মান একটি তুলনামূলক নির্দেশক — এটি আলোর মধ্যে পার্থক্য আর সময়ের সঙ্গে বদল ভালোভাবে দেখায়, কিন্তু এটি গবেষণাগারের পরিমাপও নয়, চিকিৎসাসংক্রান্ত তথ্যও নয়।',
  'note.calibration': 'ক্যালিব্রেশন ছাড়া পরিমাপ — মানগুলোকে তুলনামূলক হিসেবেই দেখুন।',

  'note.howToTitle': 'কীভাবে বুঝেশুনে মাপবেন',
  'note.howTo.hold.title': 'ফোনটি স্থির রাখুন',
  'note.howTo.hold.text': 'স্বয়ংক্রিয় এক্সপোজার স্থির হতে ২–৩ সেকেন্ড লাগে।',
  'note.howTo.aim.title': 'আলোকিত পৃষ্ঠের দিকে তাক করুন',
  'note.howTo.aim.text': 'সাদা কাগজ অথবা হালকা রঙের দেয়াল। সরাসরি আলোর উৎসের দিকে তাকিয়ে মাপবেন না।',
  'note.howTo.compare.title': 'তুলনা করুন, চূড়ান্ত বিচার নয়',
  'note.howTo.compare.text': 'আলো বদলানোর আগের আর পরের একই দৃশ্য একটিমাত্র সংখ্যার চেয়ে বেশি কিছু বলে।',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone — nie skraca się go dla stylu. */

  'legal.noDiagnosis': 'কোনো ফলই রোগনির্ণয় বা স্বাস্থ্য পরামর্শ নয়।',
  'legal.mdr': 'রেগুলেশন (EU) 2017/745-এর অর্থে {app} কোনো চিকিৎসা যন্ত্র নয়, এটি কোনো রকম রোগ বা শারীরিক অবস্থা নির্ণয়, প্রতিরোধ, পর্যবেক্ষণ বা চিকিৎসার জন্য নয় এবং এটি ডাক্তার বা অপ্টোমেট্রিস্টের পরীক্ষার বিকল্প নয়।',

  /* ---- prywatność ---- */

  'privacy.title': 'এই ডিভাইস থেকে কী বেরোয়',
  'privacy.short': 'এই অ্যাপের কোনো কিছুই নেটওয়ার্কে কিছু পাঠায় না। সব সংখ্যা এই ডিভাইসেই তৈরি হয় এবং এখানেই থাকে।',
  'privacy.onDevice': 'বোতাম চাপার পরেই কেবল ক্যামেরা চালু হয়, আর ছবি কখনোই এই ডিভাইস ছেড়ে যায় না।',
  'privacy.external': 'গোটা অ্যাপে এটিই একমাত্র জায়গা যেখানে কিছু এই ডিভাইস ছেড়ে যায়: বোতামটি নতুন ট্যাবে একটি বাইরের পাতা খোলে, আর তা ঘটে কেবল আপনি সেটি চাপার পরেই। পরিমাপ, ইতিহাস আর সেটিংস এখানেই থাকে।',
  'privacy.externalPending': 'ঠিকানাটি পাওয়া গেলে বোতামটি নতুন ট্যাবে একটি বাইরের পাতা খুলবে। সেটিই হবে একমাত্র মুহূর্ত যখন কিছু এই ডিভাইস ছেড়ে যায়। পরিমাপ, ইতিহাস আর সেটিংস এখানেই থাকে।',
  'privacy.storageBlocked': 'এই ব্রাউজার কিছুই সংরক্ষণ করতে দেয় না (প্রাইভেট মোড অথবা সাইটের ডেটা বন্ধ করা)। পরিমাপ কাজ করে, তবে ট্যাব বন্ধ করলে ইতিহাস মুছে যাবে।',

  /* ---- liczebniki ----
     Bengalski ma dwie kategorie CLDR: one i other. Rzeczownik nie zmienia
     postaci po liczebniku, więc obie formy są celowo identyczne — formę
     wybiera Intl.PluralRules('bn'), nie nasza reguła. */

  'count.readings': { one: '{n}টি পাঠ', other: '{n}টি পাঠ' },
  'count.sessions': { one: '{n}টি পরিমাপ', other: '{n}টি পরিমাপ' },
  'count.seconds': { one: '{n} সেকেন্ড', other: '{n} সেকেন্ড' },
  'count.minutes': { one: '{n} মিনিট', other: '{n} মিনিট' },
  'count.hours': { one: '{n} ঘণ্টা', other: '{n} ঘণ্টা' },
  'count.days': { one: '{n} দিন', other: '{n} দিন' }
});
