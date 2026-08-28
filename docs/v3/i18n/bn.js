/* docs/v3/i18n/bn.js — słownik WŁASNY wersji v3, bengalski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/bn.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * SKĄD TE ZDANIA: przekład z polskiego (pl.js tego katalogu), z angielskim
 * (en.js) jako wzorcem terminologii i rejestru. Zdania, które v3 dzieli
 * z v4 co do znaku, mają tu DOKŁADNIE to samo brzmienie co w
 * docs/v4/i18n/bn.js — ta sama aplikacja nie może mówić dwa razy inaczej
 * o tej samej rzeczy.
 *
 * CZEGO TU NIE MA — i dlaczego: kluczy, które stoją już w słowniku wspólnym
 * (docs/shared/i18n/bn.js). Nazwy stref, zdania oceniające, noty o granicach
 * metody, nazwy i opisy siedmiu wielkości oraz zastrzeżenie z rozporządzenia
 * (UE) 2017/745 są wspólne dla wersji i tłumaczy się je RAZ. Terminologia
 * stamtąd obowiązuje i tutaj: বর্ণ তাপমাত্রা, দেহঘড়িতে প্রভাব
 * (মেলানোপিক অনুপাত), মিটমিটানি (স্পন্দন), সমরূপতা, চোখের আরাম,
 * নীল আলোর অংশ, দৃশ্যের উজ্জ্বলতা; strefy সীমার মধ্যে / সতর্কতা / গুরুতর.
 *
 * REJESTR: standardowy bengalski, uprzejmy tryb -উন („চাপুন”, „দেখুন”).
 * Klawisze, kafelki i nagłówki kolumn krótkie; teksty pomocy — pełnymi
 * zdaniami zakończonymi dandą (।).
 *
 * ZAPIS LICZB: cyframi bengalskimi (৩০ দিন, ০.৫০, ৬৫০০ K), bo tak samo
 * formatuje wskazania Intl.NumberFormat('bn') — liczba pisana cyframi
 * arabskimi stałaby obok bengalskiej i wyglądałaby jak usterka. Dotyczy to
 * także liczb we wzorach: wzór czyta człowiek, nie parser. Cyframi arabskimi
 * zostają wyłącznie identyfikatory techniczne i symbole: %, K, ×, Hz, ms, nm,
 * CSV, JSON, sRGB, HTTPS, UTF-8, BOM, CIE XYZ, D65, IES, R, G, B, x, y, n,
 * CCT, Y, mel oraz nazwy własne (Excel, Escape, Buy Me a Coffee).
 *
 * ZESTAW KLUCZY wyznacza pl.js tego katalogu — pilnuje tego
 * docs/shared/i18n/keys.test.js. Klucza, którego tam nie ma, nie wolno tu
 * dopisywać.
 */
window.I18nData = window.I18nData || {};
window.I18nData['bn'] = Object.assign(window.I18nData['bn'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. Pismo bengalskie
     nie zna wersalików, więc znak firmowy brzmi tu tak jak nazwa aplikacji. */
  'app.wordmark': 'আলোর মনিটর',

  'state.idle': 'প্রস্তুত',
  'state.starting': 'চালু হচ্ছে',
  'state.running': 'পরিমাপ চলছে',
  'state.runningTpl': 'পরিমাপ {time}',
  'state.stopped': 'বন্ধ',
  'state.error': 'ক্যামেরায় সমস্যা',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (৫.০ po bengalsku, 5,0 po polsku, 5.0 po angielsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'পরিমাপ শুরু',
  'keys.starting': 'চালু হচ্ছে…',
  'keys.stop': 'থামান',
  'keys.flip': 'ঘোরান',
  'keys.flipAria': 'সামনের ও পিছনের ক্যামেরা বদলান',
  'keys.menu': 'মেনু',
  'keys.menuAria': 'মডিউলের তালিকা',
  'keys.back': '‹ ফিরে যান',
  'keys.backAria': 'ড্যাশবোর্ডে ফিরে যান',
  'keys.dash': 'ড্যাশবোর্ড',
  'keys.zoom': 'প্রিভিউ বড় করুন',
  'keys.retry': 'আবার চেষ্টা করুন',
  'keys.refresh': 'রিফ্রেশ',
  'keys.close': 'বন্ধ করুন',
  'keys.show': 'দেখান',
  'keys.apply': 'প্রয়োগ করুন',
  'keys.remove': 'মুছুন',

  'monitor.legend': 'নিয়ন্ত্রণ প্রিভিউ',
  'monitor.badge': 'সরাসরি',

  'aim.title': 'তাক করা',
  'aim.hint': 'ফ্রেমটি ছবির ঠিক সেই অংশ দেখায় যা অ্যাপ মাপে।',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'প্রধান চ্যানেল',
  'readout.thresholdTpl': '(সীমা {value})',
  'readout.contextTpl': 'সর্বনিম্ন {min} · গড় {avg} · সর্বোচ্চ {max} — শেষ ৬০ সে.',
  'readout.contextEmpty': 'শেষ ৬০ সেকেন্ডের কোনো তথ্য নেই',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'এর মানে কী: {name}',
  'aria.channel': '{name}, {value}, {zone}। বড় ডিসপ্লেতে দেখান।',
  'aria.channelStale': '{name}, তথ্য নেই। বড় ডিসপ্লেতে দেখান।',
  'aria.scale': 'স্কেল: {name}, {min} থেকে {max}। এখন {value}, {zone}। সতর্কতার সীমা {warn}, গুরুতরের সীমা {crit}।',
  'aria.readout': '{name}: {value}, {zone}।',
  'aria.readoutApprox': '{name}: প্রায় {value}, {zone}। আনুমানিক মান।',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'প্রধান চ্যানেলের স্কেল। তথ্য নেই',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': '“পরিমাপ শুরু” চাপুন, ফোনটি কোনো আলোকিত পৃষ্ঠের দিকে তাক করুন এবং কয়েক সেকেন্ড স্থির রাখুন।',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'চোখের আরাম কম। কী একে নামাচ্ছে তা দেখতে ০১ মডিউলটি দেখুন।',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'পর্দার নিচে থাকা “পরিমাপ শুরু” বোতাম দিয়ে শুরু করুন। বোতামটি চাপার পরেই কেবল ক্যামেরা চালু হবে।',
  'transient.measureStopped': 'পরিমাপ শেষ · {time} · ইতিহাসে সংরক্ষিত হয়েছে।',
  'transient.newVersion': 'অ্যাপের নতুন একটি সংস্করণ এসেছে।',
  'transient.thresholdsSaved': 'সীমা সংরক্ষিত হয়েছে।',
  'transient.thresholdsRejected': 'সংরক্ষণ হয়নি — সতর্কতার সীমা আর গুরুতরের সীমা একে অপরকে ছাড়িয়ে যেতে পারে না।',
  'transient.historyCleared': 'ইতিহাস মুছে ফেলা হয়েছে।',

  'live.lead': 'প্রধান চ্যানেল: {name}, {value}, {zone}।',
  'live.ready': 'মূল্যায়ন প্রস্তুত। {name} {value}, {zone}।',
  'live.started': 'পরিমাপ শুরু হয়েছে।',
  'livebar.stopped': 'পরিমাপ থেমেছে',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'এখনও কোনো রেকর্ড নেই। পরিমাপ চলার সময়েই ইতিহাস লেখা হয় — এক মিনিট পরিমাপ চালিয়ে এখানে ফিরে আসুন।',
  'empty.recorderNoRange': 'এই পরিসরে কোনো পরিমাপ হয়নি।',
  'empty.coverageTpl': 'পরিমাপ {total} ঘণ্টার মধ্যে {done} ঘণ্টা ঢেকেছে।',
  'empty.reportsNoData': 'পরিমাপসহ প্রথম পূর্ণ দিনের পরে দৈনিক প্রতিবেদন তৈরি হবে।',
  'empty.compareOneSession': 'তুলনার জন্য শেষ হওয়া দুটি সেশন দরকার। আপাতত আপনার একটি আছে।',
  'empty.exportNoData': 'এক্সপোর্ট করার মতো কিছু নেই। ইতিহাসে কিছু জমা করতে পরিমাপ চালু করুন।',
  'empty.alertsOff': 'সতর্কবার্তা বন্ধ আছে। চালু করলেও সেগুলো কেবল অ্যাপ খোলা থাকলেই কাজ করবে।',
  'empty.scheduleEmpty': 'কোনো সময় ঠিক করা হয়নি। সময়সূচি কেবল অ্যাপ খোলা থাকলেই কাজ করে।',
  'empty.historyEmpty': 'ইতিহাস খালি।',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'মডিউলের তালিকা',

  'modules.01.title': 'রেকর্ডার',
  'modules.01.desc': 'সময়ের সঙ্গে পরিমাপের গতিপথ, এক মিনিট থেকে ত্রিশ দিন।',
  'modules.02.title': 'সীমা',
  'modules.02.desc': 'প্রতিটি পরিমাপের জন্য সতর্কতা ও গুরুতরের সীমা নিজে ঠিক করুন।',
  'modules.03.title': 'ক্যালিব্রেশন',
  'modules.03.desc': 'জানা আলোর উৎসের সঙ্গে মিলিয়ে নেওয়া, আর ক্যালিব্রেশন যা ঠিক করবে না।',
  'modules.04.title': 'প্রতিবেদন',
  'modules.04.desc': 'ছাপার মতো সাজানো দৈনিক ও সাপ্তাহিক সারসংক্ষেপ।',
  'modules.05.title': 'এক্সপোর্ট',
  'modules.05.desc': 'কলামের বিবরণসহ পাঠগুলো CSV অথবা JSON ফাইলে সংরক্ষণ।',
  'modules.06.title': 'তুলনা',
  'modules.06.desc': 'পাশাপাশি দুটি সেশন, পার্থক্য সংখ্যায় দেওয়া।',
  'modules.07.title': 'পর্দার পরীক্ষা',
  'modules.07.desc': 'নিজের মনিটর দেখে নেওয়ার প্যাটার্ন, ধাপে ধাপে।',
  'modules.08.title': 'সময়সূচি',
  'modules.08.desc': 'ঠিক করা সময়ে স্বয়ংক্রিয় পরিমাপ।',
  'modules.09.title': 'সতর্কবার্তা',
  'modules.09.desc': 'সীমা পেরোলে একটি বার্তা — আর কখন সেটি কাজ করবে না।',
  'modules.10.title': 'সহায়তা',
  'modules.10.desc': 'অ্যাপটি সম্পূর্ণ বিনামূল্যের। এখানে লেখককে এক কাপ কফি খাওয়াতে পারেন।',
  'modules.11.title': 'ডকুমেন্টেশন',
  'modules.11.desc': 'এই পরিমাপ কী, আর নিশ্চিতভাবেই কী নয়।',
  'modules.12.title': 'সেটিংস',
  'modules.12.desc': 'থিম, লেখার আকার, নড়াচড়া কমানো, ইতিহাস মোছা।',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'পরিমাপের চ্যানেল',
  'channels.pick': 'বড় ডিসপ্লেতে দেখান',
  'channels.stale': 'তথ্য নেই',
  'channels.approx': 'আনুমানিক মান',

  'help.unit': 'একক',
  'help.range': 'পরিসর',
  'help.thresholds': 'সীমা',
  'help.warn': 'সতর্কতার সীমা',
  'help.crit': 'গুরুতরের সীমা',
  'help.now': 'এখন',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „পরিমাপ” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'পরিমাপ',
  'col.unit': 'একক',
  'col.range': 'পরিসর',
  'col.direction': 'দিক',
  'col.time': 'সময়',
  'col.date': 'তারিখ',
  'col.zone': 'জোন',
  'col.avg': 'গড়',
  'col.min': 'সর্বনিম্ন',
  'col.max': 'সর্বোচ্চ',
  'col.name': 'কলাম',
  'col.meaning': 'কী থাকে',
  'col.channel': 'চ্যানেল',
  'col.gain': 'গেইন',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'সময়ের পরিসর',
  'recorder.range.60s': '৬০ সে.',
  'recorder.range.15min': '১৫ মিন.',
  'recorder.range.1h': '১ ঘ.',
  'recorder.range.24h': '২৪ ঘ.',
  'recorder.range.30d': '৩০ দিন',
  'recorder.gap': 'পরিমাপ নেই',
  'recorder.sessionTitle': 'সেশনের পরিসংখ্যান',
  'recorder.zonesCaption': 'নীল আলোর অংশের জোন বণ্টন',
  'recorder.tableCaption': 'বেছে নেওয়া পরিসরের পাঠ',
  'recorder.crosshair': 'পাঠের ক্রসহেয়ার',
  'recorder.prevAria': 'আগের বিন্দু',
  'recorder.nextAria': 'পরের বিন্দু',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'চেহারা',
  'settings.themeLabel': 'থিম',
  'settings.themeSystem': 'সিস্টেম অনুযায়ী',
  'settings.themeLight': 'উজ্জ্বল',
  'settings.themeDark': 'গাঢ়',
  'settings.themeHint': '“সিস্টেম অনুযায়ী” থিমটি ফোনের সেটিংসের সঙ্গেই বদলে যায়।',
  'settings.textLabel': 'লেখার আকার',
  /* Mnożnik jako LICZBA we wstawce — ১.১৫ po bengalsku, 1,15 po polsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'কেবল অক্ষর নয়, পুরো ইন্টারফেস বড় করে — বোতাম আর সারিগুলোও লেখার সঙ্গে বড় হয়।',
  'settings.motionGroup': 'নড়াচড়া',
  'settings.motionLabel': 'নড়াচড়া কমান',
  'settings.motionHint': 'সব ট্রানজিশন বন্ধ করে দেয়। স্কেলের কাঁটা তখন মসৃণভাবে না চলে সেকেন্ডে একবার লাফিয়ে সরে।',
  'settings.dataTitle': 'তথ্য',
  'settings.clearLabel': 'ইতিহাস মুছুন',
  'settings.clearHintTpl': 'ইতিহাসে এখন {count}টি সংরক্ষিত বিন্দু আছে।',
  'settings.clearHintEmpty': 'ইতিহাস খালি।',
  'settings.clearTitle': 'ইতিহাস মুছে ফেলবেন?',
  'settings.clearConfirm': 'পরিমাপের পুরো ইতিহাস মুছে ফেলবেন? এটি আর ফেরানো যাবে না।',
  'settings.clearKey': 'মুছুন',
  'settings.aboutTitle': 'অ্যাপ সম্পর্কে',
  'settings.versionTpl': '{app}, সংস্করণ {version}।',
  'settings.offlineText': 'অ্যাপটি নেটওয়ার্ক ছাড়াই চলে। প্রথমবার খোলার পর এর সব ফাইল ব্রাউজারের মেমোরিতে থাকে, তাই এয়ারপ্লেন মোডে কিছুই বদলায় না। কোনো সার্ভারে কিছুই পাঠানো হয় না, কারণ অ্যাপটি কোনো নেটওয়ার্ক অনুরোধ করে না।',
  'settings.docsKey': 'ডকুমেন্টেশন খুলুন',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'বাতিল',
  'common.save': 'সংরক্ষণ',
  'common.reset': 'ডিফল্টে ফেরান',
  'common.yes': 'হ্যাঁ',
  'common.no': 'না',
  'common.on': 'চালু',
  'common.off': 'বন্ধ',
  'common.sep': ' · ',
  'common.stepsTitle': 'ধাপে ধাপে',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'নিজের সীমা কেন দরকার',
  'modules.02.intro': 'সীমাই ঠিক করে কখন অ্যাপ “সতর্কতা” বলবে আর কখন “গুরুতর”। ডিফল্ট মানগুলো আমাদের সম্পাদকীয় বিচার, কোনো মান নয় — অন্য পরিস্থিতিতে মাপলে সেগুলো নিজের মতো সরিয়ে নিন। মূল্যায়ন আর ড্যাশবোর্ডের বাক্যটি সঙ্গে সঙ্গেই নতুন সীমা থেকে হিসাব হয়।',
  'modules.02.orderNormal': 'সতর্কতার সীমা গুরুতরের সীমার নিচে থাকতে হবে।',
  'modules.02.orderInvert': 'এখানে বেশি মানই ভালো, তাই সতর্কতার সীমা গুরুতরের সীমার উপরে থাকে।',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'স্কেলের প্রিভিউ: {name}',
  'modules.02.nowTpl': 'এখন {value}',
  'modules.02.resetDone': 'ডিফল্ট সীমা ফিরিয়ে আনা হয়েছে।',
  'modules.02.profilesTitle': 'প্রোফাইল',
  'modules.02.profilesHint': 'প্রোফাইল হলো সাতটি পরিমাপের সীমার একটি সংরক্ষিত সেট। প্রোফাইল প্রয়োগ করলে সব সীমা একসঙ্গে বদলে যায়।',
  'modules.02.profileSaveKey': 'এখনকার সীমা সংরক্ষণ করুন',
  'modules.02.profileNameLabel': 'নতুন প্রোফাইলের নাম',
  'modules.02.profileNameHint': 'নামটি এই ডিভাইসেই থাকে। সর্বোচ্চ ৪০টি অক্ষর।',
  'modules.02.profileNameEmpty': 'প্রোফাইলের নাম লিখুন।',
  'modules.02.profileSavedTpl': '“{name}” প্রোফাইল সংরক্ষিত হয়েছে।',
  'modules.02.profileAppliedTpl': '“{name}” প্রোফাইল প্রয়োগ করা হয়েছে।',
  'modules.02.profileRemovedTpl': '“{name}” প্রোফাইল মুছে ফেলা হয়েছে।',
  'modules.02.profileFailed': 'এই প্রোফাইলটি প্রয়োগ করা যায়নি।',
  'modules.02.profileCustomTpl': 'নিজের প্রোফাইল, {date} তারিখে সংরক্ষিত।',
  'modules.02.builtin.default.name': 'ডিফল্ট',
  'modules.02.builtin.default.desc': 'পরিমাপের তালিকা থেকে নেওয়া সীমা — সব পরিমাপের শুরুর বিন্দু।',
  'modules.02.builtin.evening.name': 'সন্ধ্যা — নরম',
  'modules.02.builtin.evening.desc': 'ঠান্ডা আলোর রং আর দেহঘড়িতে প্রভাব নিয়ে আগেই সতর্ক করে।',
  'modules.02.builtin.work.name': 'ডেস্কে কাজ',
  'modules.02.builtin.work.desc': 'উজ্জ্বল, ঠান্ডা দিনের আলো মেনে নেয়; মিটমিটানি আর সমরূপতার দিকে নজর রাখে।',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'এটি কেন কাজ করে',
  'modules.03.why': 'ক্যামেরার সেন্সরে চ্যানেলগুলোর মধ্যে একটি স্থির বিচ্যুতি থাকে। সাদা কাগজ মেপে দেখা যায় সেটি কত বড়, আর তা বাদ দেওয়া যায়। এই অ্যাপে এটিই একমাত্র সুবিধা যা সত্যিই নির্ভুলতা বাড়ায় — আর তবুও এটি ক্যামেরাকে স্পেকট্রোমিটারে বদলে দেয় না।',
  'modules.03.steps.1': 'যে আলো মাপছেন তার নিচে একটি সাদা কাগজ রাখুন।',
  'modules.03.steps.2': 'ড্যাশবোর্ডে “পরিমাপ শুরু” চাপুন এবং কাগজ দিয়ে ফ্রেম ভরে ফেলুন।',
  'modules.03.steps.3': 'এখানে ফিরে এসে “ক্যালিব্রেট করুন” চাপুন এবং তিন সেকেন্ড ফোন নাড়াবেন না।',
  'modules.03.runKey': 'ক্যালিব্রেট করুন (৩ সে.)',
  'modules.03.clearKey': 'ক্যালিব্রেশন মুছুন',
  'modules.03.busyTpl': 'কাগজ মাপছি… আর {sec} সে. বাকি',
  'modules.03.statusNone': 'ক্যালিব্রেশন নেই। পরিমাপ কাজ করে, মানগুলোকে তুলনামূলক হিসেবেই দেখুন।',
  'modules.03.statusOnTpl': '{date} তারিখে {time}-এ ক্যালিব্রেট করা হয়েছে।',
  'modules.03.gainsTitle': 'চ্যানেলের গেইন',
  'modules.03.gainR': 'লাল',
  'modules.03.gainG': 'সবুজ',
  'modules.03.gainB': 'নীল',
  'modules.03.gainsNone': 'ঠিক করা নেই',
  'modules.03.needRunning': 'আগে পরিমাপ চালু করুন এবং ক্যামেরা সাদা কাগজের দিকে তাক করুন।',
  'modules.03.tooFew': 'নমুনা খুব কম। পরিমাপ সত্যিই চলছে কি না দেখে নিন।',
  'modules.03.tooDark': 'ক্যালিব্রেশনের জন্য ছবিটি খুব অন্ধকার। কাগজে আরও আলো দিন এবং আবার চেষ্টা করুন।',
  'modules.03.refused': 'চ্যানেলের বিচ্যুতি এত বড় যে একে ক্যালিব্রেশন হিসেবে মেনে নেওয়া যায় না। সমান আলোয় সাদা কাগজ ব্যবহার করুন।',
  'modules.03.done': 'ক্যালিব্রেট করা হয়েছে। বর্ণ তাপমাত্রা আর দেহঘড়িতে প্রভাব এখন আরও নির্ভুল হবে।',
  'modules.03.cleared': 'ক্যালিব্রেশন মুছে ফেলা হয়েছে।',
  'modules.03.limitsTitle': 'ক্যালিব্রেশন যা ঠিক করে না',
  'modules.03.limits.1': 'ক্যালিব্রেশন ক্যামেরার তিনটি চ্যানেল সমান করে, তার বেশি কিছু নয়। এটি ক্যামেরাকে বর্ণালি দেয় না, তাই বর্ণ তাপমাত্রা আর দেহঘড়িতে প্রভাব sRGB রং থেকে হিসাব করা আনুমানিক মানই থেকে যায়।',
  'modules.03.limits.2': 'এটি দৃশ্যের উজ্জ্বলতাকে পরম মানে বদলায় না — সেই সংখ্যাটি আপেক্ষিকই থাকে। এটি স্বয়ংক্রিয় এক্সপোজার বা হোয়াইট ব্যালেন্স বন্ধ করে না, যেগুলো ভিতর থেকে পাঠকে সরিয়ে দেয়।',
  'modules.03.limits.3': 'এটি অন্য আলোয় বয়ে যায় না: এক বাতির নিচে করা ক্যালিব্রেশন সেই বাতিকেই বর্ণনা করে। অন্য উৎসের বেলায় আবার করুন। আর এই পরিমাপ যা নয়, তার কিছুই এটি বদলায় না — এটি এখনও কোনো পরীক্ষা নয় এবং রোগনির্ণয়ের ভিত্তিও নয়।',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'প্রতিবেদনের সময়কাল',
  'modules.04.rangeDay': 'দিন',
  'modules.04.rangeWeek': 'সপ্তাহ',
  'modules.04.headTpl': '{from} থেকে {to} পর্যন্ত · ইতিহাসের {count}টি বিন্দু।',
  'modules.04.tableTitle': 'সারসংক্ষেপ',
  'modules.04.tableCaption': 'বেছে নেওয়া সময়কালের গড়, সর্বনিম্ন ও সর্বোচ্চ',
  'modules.04.panoramaTitle': 'প্যানোরামা',
  'modules.04.panoramaAriaTpl': 'প্যানোরামা: {name}, {span}।',
  'modules.04.panoramaSpanDay': 'শেষ ২৪ ঘণ্টা, ঘণ্টা ধরে ভাগ করা',
  'modules.04.panoramaSpanWeek': 'শেষ সপ্তাহ, দিন ধরে ভাগ করা',
  'modules.04.panoramaHint': 'দণ্ডের উচ্চতা আর রং একই কথা বলে: সীমার মধ্যে — নিচু, সতর্কতা — মাঝারি, গুরুতর — পুরো। গোড়ার দাগ মানে সেই ঘণ্টায় কোনো পরিমাপ হয়নি।',
  'modules.04.coverageDayTpl': 'পরিমাপ {total} ঘণ্টার মধ্যে {done} ঘণ্টা ঢেকেছে।',
  'modules.04.coverageWeekTpl': 'পরিমাপ {total} দিনের মধ্যে {done} দিন ঢেকেছে।',
  'modules.04.zonesTitle': 'জোনের বণ্টন',
  'modules.04.zonesCaptionTpl': 'প্রধান চ্যানেলের জন্য হিসাব করা: {name}।',
  'modules.04.worstTpl': 'সবচেয়ে কঠিন সময়: {value}।',
  'modules.04.worstNone': 'স্পষ্ট কিছু নেই',
  'modules.04.worstHourTpl': '{hour}টা',
  'modules.04.adviceTitle': 'এ নিয়ে কী করবেন',
  'modules.04.adviceMelanopicTpl': 'দেহঘড়িতে গড় প্রভাব ছিল {value}×। সন্ধ্যায় ০.৫০-এর নিচে নামা ভালো — সবচেয়ে সহজে উষ্ণতর বাতি অথবা নাইট মোড দিয়ে।',
  'modules.04.adviceKelvinTpl': 'আলো ঠান্ডা ছিল (গড়ে {value} K)। কাজের জন্য এতে কোনো দোষ নেই; ঘুমের দুই ঘণ্টা আগে ৩০০০ K-এর নিচে নরম লাগে।',
  'modules.04.adviceFlickerTpl': 'লক্ষ করার মতো মিটমিটানি আছে (গড়ে {value}%)। সাধারণত এর পিছনে থাকে সস্তা ডিমার অথবা ব্যাকলাইটের বিদ্যুৎ সরবরাহ।',
  'modules.04.adviceUniformityTpl': 'আলো অসমভাবে ছড়িয়ে আছে ({value}%)। বাতি সরানো অথবা তার কোণ বদলানো সাধারণত বাতি বদলানোর চেয়ে বেশি কাজে দেয়।',
  'modules.04.adviceWorstTpl': 'সীমার বাইরে থাকা সবচেয়ে বেশি পাঠ জমা হয় {hour}টার দিকে।',
  'modules.04.adviceNone': 'এই সময়কালে আপনার ঠিক করা সীমা ছাড়িয়ে কিছুই আলাদা করে চোখে পড়ে না।',
  'modules.04.limitsTitle': 'এটি স্বাস্থ্য পরামর্শ নয়',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'এই সিদ্ধান্তগুলো কেবল এই ফোনের ক্যামেরা যা দেখেছে তা থেকেই আসে। অ্যাপটি বর্ণালি মাপে না এবং কোনো রোগনির্ণয় করে না।',
  'modules.04.printHint': 'এই পাতাটি ছাপার কথা ভেবে সাজানো: টেবিল আর শিরোনামগুলো কাগজে, সিস্টেমের ম্যাগনিফায়ারে আর স্ক্রিন রিডারে একইভাবে পড়া যায়।',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'তথ্যের পরিসর',
  'modules.05.range1h': 'এক ঘণ্টা',
  'modules.05.range24h': 'এক দিন',
  'modules.05.range7d': '৭ দিন',
  'modules.05.range30d': '৩০ দিন',
  'modules.05.csvKey': 'CSV ফাইল সংরক্ষণ করুন',
  'modules.05.jsonKey': 'JSON ফাইল সংরক্ষণ করুন',
  'modules.05.formatTitle': 'ফাইলের ফরম্যাট',
  'modules.05.formatCsv': 'CSV: কলাম আলাদা করে সেমিকোলন, দশমিকের চিহ্ন কমা, এনকোডিং BOM চিহ্নসহ UTF-8। দশমিকে কমা ব্যবহার করে এমন লোকেলে বসানো Excel এমন ফাইল কিছু না বদলেই খোলে।',
  'modules.05.formatJson': 'JSON: একই তথ্য “points” ফিল্ডে, দশমিক বিন্দু আর মিলিসেকেন্ডে সময়ের চিহ্নসহ — ফরম্যাটটি এটাই চায়।',
  'modules.05.resolution': 'ইতিহাস প্রতি ৫ সেকেন্ডে একটি বিন্দু সংরক্ষণ করে এবং ৩০ দিন পিছন পর্যন্ত পৌঁছয়। সেকেন্ডে পাঁচটি নমুনার পূর্ণ রেজোলিউশন ফাইলে থাকে না — ইঞ্জিন সেটি কেবল এক মিনিট ধরে রাখে।',
  'modules.05.offline': 'ফাইলটি ডিভাইসেই তৈরি হয় এবং ডিভাইসেই থাকে। এক্সপোর্ট কোনো নেটওয়ার্কের সঙ্গে যুক্ত হয় না।',
  'modules.05.columnsTitle': 'কলামের বিবরণ',
  'modules.05.columnsCaption': 'ফাইলের কলাম আর তাদের মানে',
  'modules.05.descDate': 'ডিভাইসের ঘড়ি থেকে নেওয়া বিন্দুর তারিখ, দিন-মাস-বছর ক্রমে লেখা।',
  'modules.05.descTime': 'বিন্দুর সময়, সেকেন্ড পর্যন্ত।',
  'modules.05.descZone': 'সংরক্ষণের মুহূর্তে নীল আলোর অংশের জোন। ইঞ্জিন কেবল এই একটি পরিমাপেরই জোন সংরক্ষণ করে — বাকিগুলোর জোন সীমা থেকে হিসাব করে নিন।',
  'modules.05.descMetricTpl': '{short} একক: {unit}। পরিসর {min}–{max}।',
  'modules.05.previewTitle': 'প্রিভিউ',
  'modules.05.previewHint': 'ফাইলের প্রথম পাঁচটি সারি, ঠিক যেভাবে সেগুলো সংরক্ষিত হবে।',
  'modules.05.savedTpl': '{name} ফাইল সংরক্ষিত হয়েছে — {rows}টি সারি।',
  'modules.05.failed': 'এই ব্রাউজার ফাইলটি সংরক্ষণ করতে দেয়নি।',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'অ্যাপটি শেষ হওয়া প্রতিটি পরিমাপ সেশন এই ডিভাইসে সংরক্ষণ করে। দুটি বেছে নিন — একই ফিতেয় সেগুলো দেখতে আর পার্থক্যটি সংখ্যায় পড়তে।',
  'modules.06.noSessions': 'এখনও শেষ হওয়া কোনো সেশন নেই। পরিমাপ চালু করুন, থামান আর এখানে ফিরে আসুন।',
  'modules.06.slotA': 'সেশন A',
  'modules.06.slotB': 'সেশন B',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'ফিতে',
  'modules.06.tapeAriaTpl': '{slot} সেশনের গতিপথ, পরিমাপ {name}।',
  'modules.06.tapeHint': 'দুটি সেশনই একই চওড়ায় টেনে দেখানো: একটি দণ্ড সময়কালের একই অংশ, একই ঘড়ির সময় নয়। উচ্চতা আর রং ড্যাশবোর্ডের মতোই একই কথা বলে।',
  'modules.06.tapeChannelTpl': 'ফিতে প্রধান চ্যানেল দেখাচ্ছে: {name}।',
  'modules.06.diffTitle': 'পার্থক্য',
  'modules.06.diffCaption': 'দুই সেশনের গড় আর তাদের মধ্যেকার পার্থক্য',
  'modules.06.clearKey': 'সংরক্ষিত সেশনগুলো মুছুন',
  'modules.06.cleared': 'সংরক্ষিত সেশনগুলো মুছে ফেলা হয়েছে।',
  'modules.06.savedTpl': 'সেশন সংরক্ষিত হয়েছে: {dur}।',
  'modules.06.limitsTitle': 'এই তুলনা যা বলে না',
  'modules.06.limits': 'আপনি দুটি পরিমাপ তুলনা করছেন, দুটি আলোর উৎস নয়। সেশন দুটির মাঝে ফ্রেম, দূরত্ব, দিনের সময় অথবা ফোনের অবস্থান বদলে থাকলে পার্থক্যটি তা নিয়েও কথা বলে। সবচেয়ে সৎ তুলনা হলো আলো বদলানোর আগের আর পরের একই দৃশ্য।',
  'modules.06.keepTpl': 'সবচেয়ে সাম্প্রতিক {count}টি সেশন পর্যন্তই মনে রাখা হয়।',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'পরীক্ষার প্যাটার্নগুলো এই ডিভাইসের পুরো পর্দায় দেখানো হয়। এগুলো নিজের চোখে পর্দা দেখার জন্য: সাদা সমান কি না, ধূসর কোনো রঙে হেলে যাচ্ছে কি না আর কোণে ব্যাকলাইট চুইয়ে পড়ছে কি না।',
  'modules.07.steps.1': 'পর্দার উজ্জ্বলতা সেই মাত্রায় রাখুন যেখানে আপনি সাধারণত কাজ করেন, আর সিস্টেমের নাইট মোড বন্ধ করুন।',
  'modules.07.steps.2': 'নিচের তালিকা থেকে একটি প্যাটার্ন বেছে নিন। সেটি পুরো পর্দা ভরে ফেলবে।',
  'modules.07.steps.3': 'প্রায় ষাট সেন্টিমিটার দূর থেকে, পর্দার সোজাসুজি তাকান। তারপর একই প্যাটার্ন কোণাকুণি দেখুন।',
  'modules.07.steps.4': '“প্যাটার্ন বন্ধ করুন” বোতাম অথবা Escape কী দিয়ে বেরিয়ে পরেরটিতে যান।',
  'modules.07.planesTitle': 'প্যাটার্ন',
  'modules.07.exitKey': 'প্যাটার্ন বন্ধ করুন',
  'modules.07.showAriaTpl': 'প্যাটার্ন দেখান: {name}',
  'modules.07.planeAriaTpl': 'পরীক্ষার প্যাটার্ন: {name}। বন্ধ করার বোতাম পর্দার নিচে।',
  'modules.07.plane.white.name': 'সাদা',
  'modules.07.plane.white.hint': 'দাগ, রঙের ছোপ আর কিনারার কাছে উজ্জ্বল জায়গা খুঁজুন। পুরো পৃষ্ঠায় সাদা এক রঙেরই হওয়া উচিত।',
  'modules.07.plane.gray75.name': 'ধূসর ৭৫%',
  'modules.07.plane.gray75.hint': 'ধূসর ধূসরই থাকা উচিত। সবুজাভ অথবা গোলাপি আভা মানে পর্দার হোয়াইট ব্যালেন্স সরে গেছে।',
  'modules.07.plane.gray50.name': 'ধূসর ৫০%',
  'modules.07.plane.gray50.hint': 'রঙের আভা বিচার করার সবচেয়ে ভালো প্যাটার্ন। মাঝখানের সঙ্গে কোণগুলো মিলিয়ে দেখুন।',
  'modules.07.plane.gray25.name': 'ধূসর ২৫%',
  'modules.07.plane.gray25.hint': 'গাঢ় ধূসরে ব্যাকলাইট চুইয়ে পড়া আর সস্তা প্যানেলের ব্যান্ডিং ধরা পড়ে।',
  'modules.07.plane.black.name': 'কালো',
  'modules.07.plane.black.hint': 'অন্ধকার ঘরে এখানে ব্যাকলাইটের প্রতিটি ফাঁক আর উজ্জ্বল হয়ে থাকা কোণ দেখা যায়।',
  'modules.07.plane.red.name': 'বিশুদ্ধ লাল',
  'modules.07.plane.red.hint': 'সমান লাল রঙে মরা সাবপিক্সেল আর প্যানেলের অসমতা ধরা পড়ে।',
  'modules.07.plane.green.name': 'বিশুদ্ধ সবুজ',
  'modules.07.plane.green.hint': 'সবুজ সবচেয়ে বেশি উজ্জ্বলতা বহন করে — নষ্ট পিক্সেল এতেই সবচেয়ে সহজে চোখে পড়ে।',
  'modules.07.plane.blue.name': 'বিশুদ্ধ নীল',
  'modules.07.plane.blue.hint': 'পর্দার উপরের ময়লা আর দাগ সাদার চেয়ে নীলে ভালো দেখা যায়।',
  'modules.07.plane.grid.name': 'গ্রিড',
  'modules.07.plane.grid.hint': 'রেখাগুলো কোণে যেমন ধারালো, মাঝখানেও তেমনই হওয়া উচিত। কিনারায় ঝাপসা হওয়া ছবির স্কেলিংয়ের ব্যাপার।',
  'modules.07.warn': 'প্যাটার্ন পুরো পর্দা ঢেকে ফেলে, পরিমাপের বোতামসহ নিয়ন্ত্রণ ড্যাশবোর্ডও। অ্যাপে এটিই একমাত্র জায়গা যেখানে এমন হয়, আর তাই বেরোনোর বোতামটি বড় এবং সবসময় দেখা যায়। প্যাটার্ন পর্দায় থাকা পর্যন্ত পরিমাপ চলতেই থাকে এবং থামানো যায় না — বোতামগুলোয় ফিরতে প্যাটার্নটি বন্ধ করুন।',
  'modules.07.cameraTitle': 'এখানে যা করা যাবে না',
  'modules.07.camera': 'ফোন নিজের পর্দা দেখে না, তাই একই ডিভাইস দিয়ে এই প্যাটার্নগুলো মাপা যাবে না। মনিটর মাপতে হলে প্যাটার্নটি মনিটরে দেখান আর পরিমাপ করুন ফোন দিয়ে — এ দুটি আলাদা ডিভাইস আর দুটি আলাদা ভূমিকা।',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'সময়সূচি ঠিক করা সময়ে পরিমাপের কথা মনে করিয়ে দেয়। ক্যামেরা নিজে চালু করে না: নির্ধারিত সময়ে এটি একটি স্মরণ দেখায়, আর পরিমাপ শুরু করেন আপনি ড্যাশবোর্ডের “পরিমাপ শুরু” বোতাম দিয়ে। প্রথমবারের মতোই।',
  'modules.08.onlyOpenTitle': 'কখন এটি কাজ করবে না',
  'modules.08.onlyOpen': 'সময়সূচি কেবল অ্যাপ খোলা থাকলেই কাজ করে। বন্ধ ব্রাউজার ট্যাব সময় গোনে না এবং কিছুই মনে করিয়ে দেবে না। সিস্টেমের নোটিফিকেশনের অনুমতি আমরা চাই না এবং নেটওয়ার্কে কিছুই পাঠাই না।',
  'modules.08.enableLabel': 'স্মরণ চালু করুন',
  'modules.08.timesTitle': 'সময়',
  'modules.08.timeAriaTpl': 'সময় {n}: স্মরণের ঘণ্টা',
  'modules.08.addKey': 'সময় যোগ করুন',
  'modules.08.removeAriaTpl': '{time} সময়টি মুছুন',
  'modules.08.addedTpl': '{time} সময়টি যোগ করা হয়েছে।',
  'modules.08.removedTpl': '{time} সময়টি মুছে ফেলা হয়েছে।',
  'modules.08.badTime': '২২:০০ ফরম্যাটে সময় লিখুন।',
  'modules.08.nextTpl': 'পরবর্তী স্মরণ: {time}।',
  'modules.08.nextNone': 'স্মরণ বন্ধ আছে।',
  'modules.08.dueTpl': 'পরিমাপের নির্ধারিত সময়: {time}।',
  'modules.08.dueKey': 'ড্যাশবোর্ড দেখান',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'সতর্কবার্তা একটি পরিমাপের উপর নজর রাখে এবং তখনই কথা বলে যখন সেটি বেছে নেওয়া জোনে আপনার ঠিক করা সময় ধরে একটানা থাকে। এটি কখনও পরিমাপ থামায় না এবং কখনও বোতামগুলো ঢেকে দেয় না।',
  'modules.09.enableLabel': 'সতর্কবার্তা চালু করুন',
  'modules.09.metricLabel': 'যে পরিমাপে নজর',
  'modules.09.levelLabel': 'কোন জোন থেকে',
  'modules.09.levelWarning': 'সতর্কতা থেকে উপরে',
  'modules.09.levelCritical': 'কেবল গুরুতর',
  'modules.09.sustainLabel': 'কত সেকেন্ড একটানা থাকার পর',
  'modules.09.sustainHint': 'সময় ছোট হলে ফোন নাড়ানোর সময় বেশি ভুল সংকেত আসে। পাঁচ সেকেন্ডের নিচে আমরা নামি না।',
  'modules.09.soundLabel': 'ছোট একটি শব্দ-সংকেত',
  'modules.09.soundHint': 'শব্দটি ডিভাইসেই তৈরি হয়। নেটওয়ার্ক থেকে কিছুই নামানো হয় না।',
  'modules.09.cooldownHint': 'দুই মিনিটে সর্বোচ্চ একটি সতর্কবার্তা। প্রতিটি নমুনায় বেজে ওঠা সংকেত এমন সংকেত যা চিরতরে বন্ধ করে দেওয়া হয়।',
  'modules.09.whenNotTitle': 'কখন সতর্কবার্তা কাজ করবে না',
  'modules.09.whenNot': 'বার্তাটি অ্যাপের ভিতরে, সিস্টেমে নয়। অ্যাপ বন্ধ থাকলে বা পিছনে লুকানো থাকলে, পরিমাপ না চললে এবং নজরে থাকা পরিমাপটি সেই মুহূর্তে মাপা না গেলে এটি কাজ করবে না। সিস্টেমের নোটিফিকেশনের অনুমতি আমরা চাই না।',
  'modules.09.firedTpl': '{name}: {sec} সে. ধরে {zone} — এখন {value}।',
  'modules.09.saved': 'সতর্কবার্তার সেটিংস সংরক্ষিত হয়েছে।',
  'modules.09.statusOnTpl': 'নজরে: {name}, {level}, {sec} সে. পর।',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'এই অ্যাপটি বিনামূল্যের',
  'support.freeText': 'সাতটি পরিমাপই প্রথমবার চালু করার মুহূর্ত থেকে সংখ্যা দেখায়। রেকর্ডার, সীমা, ক্যালিব্রেশন, প্রতিবেদন, এক্সপোর্ট, সেশনের তুলনা আর ত্রিশ দিনের পুরো ইতিহাস অ্যাকাউন্ট ছাড়া, ফি ছাড়া আর সীমা ছাড়াই কাজ করে — অফলাইনেও ঠিক একইভাবে। এখানে কিছুই টাকার বিনিময়ে পরে দেওয়ার জন্য সরিয়ে রাখা নেই।',
  'support.whyTitle': 'কেন আমি এটা চাইছি',
  'support.whyText': 'আলোর মনিটর আমি একাই বানাই আর চালাই, কাজের পরের সময়ে। সহায়তা যায় ত্রুটি সারানোর সময়ে, আরও ফোনে পরীক্ষা করায় আর মডিউলের তালিকার পরের সরঞ্জামগুলোয়। কেউ কিছু না দিলেও কোনো কিছুই কাজ করা বন্ধ করবে না।',
  'support.nothingTitle': 'দান কী দেয়',
  'support.nothingText': 'কিছুই না। দানের পর কোনো সংখ্যা, কোনো মডিউল বা কোনো সেটিং খুলে যায় না, কারণ সবকিছু শুরু থেকেই খোলা। থেকে যায় কেবল এটুকু যে আমি জানি, এটি কারও কাজে লেগেছে।',
  'support.keyTitle': 'সাহায্য করতে চাইলে',
  'support.keyLabel': 'আমাকে এক কাপ কফি খাওয়ান',
  'support.keyAria': 'আমাকে এক কাপ কফি খাওয়ান — নতুন ট্যাবে একটি বাইরের পাতা খোলে',
  'support.serviceText': 'দানের প্রোফাইল চালায় একটি বাইরের সেবা, যেমন Buy Me a Coffee। অ্যাপটি সেখান থেকে কোনো স্ক্রিপ্ট, উইজেট বা ছবি নামায় না — এখানে কেবল একটি সাধারণ লিংক দাঁড়িয়ে আছে, তার বেশি কিছুই নয়।',
  'support.privacyText': 'এই বোতামটি চাপলে নতুন ট্যাবে একটি বাইরের পাতা খোলে, আর এটিই একমাত্র মুহূর্ত যখন কিছু এই ডিভাইস ছেড়ে যায়। পরিমাপ, ইতিহাস আর সেটিংস যেখানে ছিল সেখানেই থাকে — এই ব্রাউজারের মেমোরিতে।',
  'support.privacyPendingText': 'ঠিকানাটি পাওয়া গেলে বোতামটি চাপলে নতুন ট্যাবে একটি বাইরের পাতা খুলবে এবং সেটিই হবে একমাত্র মুহূর্ত যখন কিছু এই ডিভাইস ছেড়ে যায়। পরিমাপ, ইতিহাস আর সেটিংস যেখানে ছিল সেখানেই থাকে — এই ব্রাউজারের মেমোরিতে।',
  'support.emptyTitle': 'প্রোফাইল এখনও যুক্ত করা হয়নি',
  'support.emptyText': 'দানের প্রোফাইলের ঠিকানা এখনও লেখা হয়নি, তাই এখানে এমন কোনো বোতাম নেই যা কোথাও নিয়ে যাবে না। অ্যাপের বাকি সবকিছু আগের মতোই কাজ করে — কোনো কিছুই এই দানের অপেক্ষায় নেই।',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'এই অ্যাপ যা মাপে না',
  'docs.notList.1': 'এটি বর্ণালি মাপে না। ক্যামেরায় তিনটি চওড়া বর্ণ-চ্যানেল, স্বয়ংক্রিয় এক্সপোজার আর স্বয়ংক্রিয় হোয়াইট ব্যালেন্স থাকে।',
  'docs.notList.2': 'এটি পরম মান মাপে না। দৃশ্যের উজ্জ্বলতা একটি আপেক্ষিক নির্দেশক, আলোকমিতিক পরিমাপের ফল নয়।',
  'docs.notList.3': 'এটি বর্ণ তাপমাত্রা সরাসরি মাপে না। বর্ণ তাপমাত্রা আর দেহঘড়িতে প্রভাব sRGB রং থেকে হিসাব করা আনুমানিক মান।',
  'docs.notList.4': 'এটি বিদ্যুতের লাইনের মিটমিটানি দেখে না। ৫ Hz-এ নমুনা নিলে কেবল ২.৫ Hz-এর নিচের স্পন্দন দেখা যায় — লাইনের ১০০ Hz নাগালের বাইরে এবং অ্যাপ কখনোই একে ফল হিসেবে দেখাবে না।',
  'docs.notList.5': 'এটি কোনো রোগনির্ণয় করে না এবং স্বাস্থ্য পরামর্শ দেয় না। কোনো ফলই এর একটিও নয়।',
  'docs.notList.6': 'এটি আপনার আলোকে কোনো সরকারি মানদণ্ডের সঙ্গে তুলনা করে না। সীমাগুলো সেটিংস মাত্র, ০২ মডিউলে সেগুলো বদলাতে পারেন।',
  'docs.whatTitle': 'এটি কী মাপে আর কীভাবে',
  'docs.whatLead': 'ফোনের ক্যামেরা একটি আলোকিত পৃষ্ঠের দিকে তাকিয়ে থাকে, আর অ্যাপ সেকেন্ডে পাঁচবার ফ্রেমের মাঝের অংশ থেকে R, G ও B চ্যানেলের গড় হিসাব করে। এই তিনটি সংখ্যা থেকেই সাতটি নির্দেশক বের করা হয়।',
  'docs.whatCrop': 'অংশটি হলো ফ্রেমের প্রস্থের মাঝের ৬০% আর উচ্চতার মাঝের ৬০% — ঠিক সেই চতুর্ভুজ যা “তাক করা” পর্দায় নিশানা এঁকে দেখায়। তার বাইরের কিছুই হিসাবে আসে না।',
  'docs.whatRate': 'প্রতি ২০০ ms-এ একটি নমুনা, অর্থাৎ সেকেন্ডে ৫ বার। শেষ মিনিটটি পূর্ণ রেজোলিউশনে মেমোরিতে থাকে; তার চেয়ে পুরনো সবকিছু প্রতি ৫ সেকেন্ডে সংরক্ষিত হয় এবং ত্রিশ দিন পিছন পর্যন্ত পৌঁছয়।',
  'docs.metricsTitle': 'সাতটি পরিমাপ',
  'docs.formulasTitle': 'সূত্র',
  'docs.formula.share.formula': 'নীল আলোর অংশ = B / (R + G + B) × ১০০%',
  'docs.formula.share.text': 'গামা না উল্টেই sRGB মানের উপর হিসাব করা — ইচ্ছে করেই, কারণ এটি অ্যাপের আগের সংস্করণের সেই একই সংজ্ঞা, তাই তখন ঠিক করা সীমাগুলো এখনও একই কথা বলে। এটি রংকে উজ্জ্বলতা থেকে আলাদা করে।',
  'docs.formula.brightness.formula': 'উজ্জ্বলতা = (R + G + B) / ৩ / ২৫৫ × ১০০%',
  'docs.formula.brightness.text': 'পরিসরের শতাংশ হিসেবে চ্যানেলগুলোর গড় মান। স্বয়ংক্রিয় এক্সপোজার একে ভিতর থেকে সরিয়ে দেয়, তাই এটি একটি আপেক্ষিক নির্দেশক — দুটি দৃশ্য তুলনা করুন, একটিমাত্র সংখ্যাকে পরিমাপ হিসেবে পড়বেন না।',
  'docs.formula.kelvin.title': 'বর্ণ তাপমাত্রা — ম্যাককেমির আনুমানিক সূত্র',
  'docs.formula.kelvin.formula': 'n = (x − ০.৩৩২০) / (y − ০.১৮৫৮)\nCCT = −৪৪৯ n³ + ৩৫২৫ n² − ৬৮২৩.৩ n + ৫৫২০.৩৩',
  'docs.formula.kelvin.text': 'প্রথমে আমরা sRGB গামা উল্টে দিই, তারপর D65 সাদার জন্য ম্যাট্রিক্স দিয়ে CIE XYZ-তে যাই এবং ক্রোম্যাটিসিটি x, y হিসাব করি। ম্যাককেমির সূত্র মোটামুটি ২০০০ K থেকে ১২৫০০ K পর্যন্ত বিশ্বাসযোগ্য। এর বাইরে ত্রিঘাত রাশিটি বিগড়ে যায়, তাই ফলটি কেটে দেওয়া হয় এবং অবিশ্বাসযোগ্য বলে চিহ্নিত হয় — তখন স্কেলের ভিত্তিরেখা ড্যাশ-ড্যাশ হয়ে যায় আর “পদ্ধতির সীমার বাইরে” বাক্যটি দেখা দেয়।',
  'docs.formula.melanopic.title': 'দেহঘড়িতে প্রভাব — মেলানোপিক অনুপাত',
  'docs.formula.melanopic.formula': 'mel = ০.০০১৬ R + ০.৩১১০ G + ০.৮৪৬০ B\nY = ০.২১২৭ R + ০.৭১৫২ G + ০.০৭২২ B\nফল = (mel / Y) × নিরপেক্ষ সাদার জন্য ১.০০-তে স্বাভাবিকীকরণ',
  'docs.formula.melanopic.text': 'তিনটি চ্যানেলই রৈখিক মানে। প্রকৃত রাশিটি হলো মেলানোপসিনের সংবেদনশীলতা বক্ররেখার সঙ্গে বর্ণালির সমাকলন (শীর্ষ প্রায় ৪৯০ nm); ক্যামেরার আছে তিনটি চওড়া চ্যানেল, তাই আমরা sRGB প্রাথমিক রংগুলোকে তাদের আনুমানিক তরঙ্গদৈর্ঘ্যে (R ৬১২ nm, G ৫৪৯ nm, B ৪৬৫ nm) মেলানোপিক সংবেদনশীলতা দিয়ে ভার দিই। বদলের দিকটি বিশ্বাসযোগ্য, পরম মানটি নয় — সেজন্যই এই সংখ্যার পাশে “≈” চিহ্নটি দাঁড়ায়।',
  'docs.formula.flicker.formula': 'মিটমিটানি = (max − min) / (max + min) × ১০০%',
  'docs.formula.flicker.text': 'IES-এর সংজ্ঞা, উজ্জ্বলতার নমুনার একটি জানালা থেকে হিসাব করা। কম্পাঙ্ক আমরা আন্দাজ করি সংকেতটি গড় মান কতবার পেরোয় তা গুনে। ৫ Hz-এ নমুনা নিলে কেবল ২.৫ Hz-এর নিচের মড্যুলেশন দেখা যায় (নাইকুইস্ট সীমা), আর বিশ্বাসযোগ্য বলে আমরা কেবল ০.২ থেকে ২ Hz-এর মধ্যেকার কম্পাঙ্ককেই মানি, তা-ও ০.৫% থেকে ওঠা বিস্তারে — এই সীমার নিচে গড় পেরোনো মানে সেন্সরের গোলমাল, উৎসের স্পন্দন নয়।',
  'docs.formula.uniformity.formula': 'সমরূপতা = সবচেয়ে গাঢ় ঘর / সবচেয়ে উজ্জ্বল ঘর × ১০০%',
  'docs.formula.uniformity.text': 'অংশটিকে আমরা ৩×৩ গ্রিডে নয়টি ঘরে ভাগ করি এবং দুই প্রান্ত মিলিয়ে দেখি। ১০০% মানে আলো নিখুঁতভাবে সমানে ছড়ানো। পর্দায় কম মান মানে ব্যাকলাইট চুইয়ে পড়া বা প্রতিফলন, ডেস্কে — ভুলভাবে বসানো বাতি। আরামের সঙ্গে এটিই একমাত্র পরিমাপ, যেখানে বেশি মানে ভালো।',
  'docs.formula.comfort.formula': '১০০ পয়েন্ট থেকে শাস্তি বাদ:\nদেহঘড়িতে প্রভাব ০.৭৫-এর উপরে — ৩৫ পয়েন্ট পর্যন্ত\nরং ৪০০০ K-এর উপরে — ২৫ পয়েন্ট পর্যন্ত\nমিটমিটানি ৫%-এর উপরে — ২৫ পয়েন্ট পর্যন্ত\nসমরূপতা ৬০%-এর নিচে — ১৫ পয়েন্ট পর্যন্ত',
  'docs.formula.comfort.text': 'ছয়টি সংখ্যার বদলে একটিমাত্র মূল্যায়ন। যে পরিমাপ করা যায়নি তার কোনো শাস্তি নেই — তথ্যের অভাব কখনোই ভালো ফলের ভান করে না। ওজনগুলো আমাদের সম্পাদকীয় বিচার, কোনো মান নয়; সেজন্যই ০১ মডিউল উপাদানগুলোর বিভাজন দেখায়, যাতে এই মূল্যায়নের সঙ্গে দ্বিমত করা যায়।',
  'docs.rangesTitle': 'পরিসর ও সীমা',
  'docs.rangesLead': 'নিচের সীমাগুলো এই মুহূর্তে যেগুলো কার্যকর সেগুলোই — ০২ মডিউলে বদলে থাকলে টেবিল আপনার মানই দেখায়, কারখানার নয়।',
  'docs.dirNormal': 'কম মানে নরম',
  'docs.dirInvert': 'বেশি মানে ভালো',
  'docs.privacyTitle': 'তথ্য ও গোপনীয়তা',
  'docs.privacyText': 'ক্যামেরার ছবি কোথাও পাঠানো বা সংরক্ষণ করা হয় না — প্রতিটি ফ্রেম থেকে থাকে কেবল তিনটি সংখ্যা। পরিমাপ, সীমা আর সেটিংস এই ডিভাইসের ব্রাউজারের মেমোরিতে থাকে। অ্যাপটি কোনো নেটওয়ার্ক অনুরোধ করে না এবং অফলাইন মোডে চলে।',
  'docs.mdrTitle': 'দাবি অস্বীকার',
  'docs.freeText': 'অ্যাপটি সম্পূর্ণ বিনামূল্যের এবং তেমনই থাকবে: সাতটি পরিমাপ, ইতিহাস, প্রতিবেদন, এক্সপোর্ট আর অফলাইন মোড অ্যাকাউন্ট ছাড়া, ফি ছাড়া আর সীমা ছাড়াই কাজ করে। কেউ ধন্যবাদ জানাতে চাইলে ১০ নম্বর “সহায়তা” মডিউলটি পাবেন।',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'অ্যাপটি অসম্পূর্ণভাবে লোড হয়েছে',
  'boot.filesTpl': 'এই ফাইলগুলো লোড হয়নি: {list}।',
  'boot.modulesTpl': 'এই মডিউলগুলো সাড়া দেয়নি: {list} — তালিকা থেকে এই পদগুলো খুলবে না।',
  'boot.modulesRangeTpl': '{from}–{to} মডিউল',
  'boot.tail': 'পৃষ্ঠাটি রিফ্রেশ করুন। তাতেও কাজ না হলে সার্ভারে থাকা ফাইলগুলো অসম্পূর্ণ।',
  'boot.loss.bus': 'মডিউলগুলো একে অপরকে আর দেখবে না এবং পরিমাপ শুরু হবে না',
  'boot.loss.metrics': 'কোনো মানই হিসাব হবে না',
  'boot.loss.scaleCore': 'স্কেলের জ্যামিতি আর সংখ্যার ফরম্যাটিং হারিয়ে যাবে',
  'boot.loss.scaleText': 'ইন্টারফেসের সব লেখা হারিয়ে যাবে',
  'boot.loss.shell': 'কোনো মডিউলই খোলা যাবে না',
  'boot.loss.engine': 'ক্যামেরা আর পরিমাপ শুরু হবে না',
  'boot.loss.dash': 'ড্যাশবোর্ড খালি থেকে যাবে'
});
