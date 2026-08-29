/* docs/v3/i18n/ur.js — słownik WŁASNY wersji v3, urdu.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/ur.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * PISMO OD PRAWEJ DO LEWEJ: urdu zapisuje się od prawej do lewej. W napisach
 * NIE MA ani jednego znaku sterującego kierunkiem (U+200E, U+200F,
 * U+202A…U+202E) — kierunkiem zarządza atrybut `dir` ustawiany na dokumencie
 * przez warstwę językową, a nie treść słownika. Liczby, symbole jednostek
 * (%, K, ×, Hz, s, min, ms, nm) i identyfikatory (sRGB, CSV, JSON, UTF-8,
 * BOM, IES, CIE XYZ, D65, McCamy, Escape, Buy Me a Coffee) zostają zapisem
 * łacińskim — przeglądarka ustawi je sama algorytmem dwukierunkowym Unicode.
 * Cudzysłów ”…“ jak w docs/shared/i18n/ur.js; kropka zdaniowa to ۔ (U+06D4),
 * przecinek ، (U+060C), pytajnik ؟ (U+061F).
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js tego katalogu — pilnuje
 * tego docs/shared/i18n/keys.test.js. Kluczy, które stoją w słowniku wspólnym
 * (nazwy stref, zdania oceniające, noty o granicach metody, nazwy i opisy
 * siedmiu wielkości, zastrzeżenie z rozporządzenia (UE) 2017/745), tu NIE MA —
 * poza jednym świadomym nadpisaniem przy 'verdict.critical.comfort'.
 *
 * TERMINOLOGIA jest przepisana ze słownika wspólnego docs/shared/i18n/ur.js
 * i nie wolno jej tu zmieniać: نیلے کا حصہ (udział niebieskiego), منظر کی چمک
 * (jasność sceny), رنگی درجۂ حرارت (temperatura barwowa), یومیہ تال پر اثر
 * (wpływ na rytm dobowy; میلانوپک تناسب — współczynnik melanopiczny),
 * ٹمٹماہٹ (migotanie), یکسانیت (równomierność), بصری آرام (komfort wzrokowy).
 * Strefy: حد کے اندر / احتیاط / تشویشناک / معلومات نہیں. Dalej: مقدار
 * (mierzona wielkość), پیمائش (pomiar), ریکارڈ (historia), حد (próg),
 * اسکیل (skala), ڈیش بورڈ (pulpit), ماڈیول (moduł).
 *
 * ZAPIS LICZB WE WZORACH: separatorem dziesiętnym jest kropka, bo
 * Intl.NumberFormat('ur') domyślnie używa cyfr łacińskich i kropki — stąd
 * „0.50”, „2.5 Hz”, „5520.33”. Liczby wstawiane przez '{…}' formatuje warstwa
 * językowa, nie ten plik.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ur'] = Object.assign(window.I18nData['ur'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. Pismo urdu nie
     odróżnia wielkości liter, więc brzmi tak samo jak 'app.name'. */
  'app.wordmark': 'روشنی مانیٹر',

  'state.idle': 'تیار',
  'state.starting': 'شروع ہو رہا ہے',
  'state.running': 'پیمائش',
  'state.runningTpl': 'پیمائش {time}',
  'state.stopped': 'رکا ہوا',
  'state.error': 'کیمرے کی خرابی',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5.0 po urdusku, 5,0 po polsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'پیمائش شروع کریں',
  'keys.starting': 'شروع ہو رہا ہے…',
  'keys.stop': 'روکیں',
  'keys.flip': 'بدلیں',
  'keys.flipAria': 'کیمرہ بدلیں: سامنے والا یا پچھلا',
  'keys.menu': 'مینو',
  'keys.menuAria': 'ماڈیولوں کی فہرست',
  'keys.back': '‹ واپس',
  'keys.backAria': 'ڈیش بورڈ پر واپس',
  'keys.dash': 'ڈیش بورڈ',
  'keys.zoom': 'پیش نظارہ بڑا کریں',
  'keys.retry': 'دوبارہ کوشش کریں',
  'keys.refresh': 'ریفریش کریں',
  'keys.close': 'بند کریں',
  'keys.show': 'دکھائیں',
  'keys.apply': 'لاگو کریں',
  'keys.remove': 'حذف کریں',

  'monitor.legend': 'کنٹرول پیش نظارہ',
  'monitor.badge': 'براہِ راست',

  'aim.title': 'نشانہ بندی',
  'aim.hint': 'فریم بالکل وہی حصہ دکھاتا ہے جو ایپ ناپتی ہے۔',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'مرکزی چینل',
  'readout.thresholdTpl': '(حد {value})',
  'readout.contextTpl': 'کم سے کم {min} · اوسط {avg} · زیادہ سے زیادہ {max} — گزشتہ 60 سیکنڈ',
  'readout.contextEmpty': 'گزشتہ 60 سیکنڈ کی کوئی معلومات نہیں',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'اس کا مطلب: {name}',
  'aria.channel': '{name}، {value}، {zone}۔ بڑے ڈسپلے پر دکھائیں۔',
  'aria.channelStale': '{name}، معلومات نہیں۔ بڑے ڈسپلے پر دکھائیں۔',
  'aria.scale': 'اسکیل: {name}، {min} سے {max} تک۔ اِس وقت {value}، {zone}۔ احتیاط کی حد {warn}، تشویش کی حد {crit}۔',
  'aria.readout': '{name}: {value}، {zone}۔',
  'aria.readoutApprox': '{name}: تقریباً {value}، {zone}۔ یہ تخمینی قدر ہے۔',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'مرکزی چینل کا اسکیل۔ معلومات نہیں',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': '”پیمائش شروع کریں“ دبائیں، فون کا رخ کسی روشن سطح کی طرف کریں اور چند سیکنڈ بغیر ہلائے پکڑے رکھیں۔',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'بصری آرام کم ہے۔ ماڈیول 01 میں دیکھیں کہ اسے کیا گھٹا رہا ہے۔',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'اسکرین کے نیچے ”پیمائش شروع کریں“ کے بٹن سے آغاز کریں۔ کیمرہ دبانے کے بعد ہی چالو ہوتا ہے۔',
  'transient.measureStopped': 'پیمائش مکمل · {time} · ریکارڈ میں محفوظ ہو گئی۔',
  'transient.newVersion': 'ایپ کا نیا ورژن موجود ہے۔',
  'transient.thresholdsSaved': 'حدیں محفوظ ہو گئیں۔',
  'transient.thresholdsRejected': 'محفوظ نہیں ہوا — احتیاط کی حد اور تشویش کی حد ایک دوسری کو عبور نہیں کر سکتیں۔',
  'transient.historyCleared': 'ریکارڈ صاف ہو گیا۔',

  'live.lead': 'مرکزی چینل: {name}، {value}، {zone}۔',
  'live.ready': 'فیصلہ تیار ہے۔ {name} {value}، {zone}۔',
  'live.started': 'پیمائش شروع ہو گئی۔',
  'livebar.stopped': 'پیمائش رک گئی',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'ابھی کوئی ریکارڈ نہیں ہے۔ ریکارڈ پیمائش کے دوران لکھا جاتا ہے — ایک منٹ کی پیمائش چلائیں اور یہاں واپس آئیں۔',
  'empty.recorderNoRange': 'اس دورانیے میں کوئی پیمائش نہیں ہوئی۔',
  'empty.coverageTpl': 'پیمائش {total} میں سے {done} گھنٹوں پر محیط رہی۔',
  'empty.reportsNoData': 'روزانہ کی رپورٹ پہلے پورے دن کی پیمائش کے بعد بنے گی۔',
  'empty.compareOneSession': 'موازنے کے لیے دو مکمل شدہ سیشن درکار ہیں۔ ابھی آپ کے پاس ایک ہے۔',
  'empty.exportNoData': 'ایکسپورٹ کرنے کو کچھ نہیں ہے۔ پیمائش شروع کریں تاکہ ریکارڈ میں کچھ آ جائے۔',
  'empty.alertsOff': 'الرٹ بند ہیں۔ چالو کرنے کے بعد بھی وہ صرف اُس وقت کام کریں گے جب ایپ کھلی ہو۔',
  'empty.scheduleEmpty': 'کوئی وقت مقرر نہیں کیا گیا۔ شیڈول صرف اُس وقت چلتا ہے جب ایپ کھلی ہو۔',
  'empty.historyEmpty': 'ریکارڈ خالی ہے۔',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'ماڈیولوں کی فہرست',

  'modules.01.title': 'ریکارڈر',
  'modules.01.desc': 'وقت کے ساتھ پیمائش کا سفر، ایک منٹ سے تیس دن تک۔',
  'modules.02.title': 'حدیں',
  'modules.02.desc': 'ہر مقدار کے لیے احتیاط اور خطرے کی اپنی حدیں مقرر کریں۔',
  'modules.03.title': 'کیلبریشن',
  'modules.03.desc': 'کسی معلوم روشنی کے منبع سے موازنہ، اور وہ جو کیلبریشن ٹھیک نہیں کرتی۔',
  'modules.04.title': 'رپورٹیں',
  'modules.04.desc': 'روزانہ اور ہفتہ وار خلاصے، چھپائی کی صورت میں۔',
  'modules.05.title': 'ایکسپورٹ',
  'modules.05.desc': 'ریڈنگ CSV یا JSON فائل میں محفوظ کرنا، کالموں کی وضاحت کے ساتھ۔',
  'modules.06.title': 'موازنہ',
  'modules.06.desc': 'دو سیشن ساتھ ساتھ، فرق عدد میں لکھا ہوا۔',
  'modules.07.title': 'اسکرین کی جانچ',
  'modules.07.desc': 'اپنے مانیٹر کو پرکھنے کے پیٹرن، قدم بہ قدم۔',
  'modules.08.title': 'شیڈول',
  'modules.08.desc': 'آپ کے مقرر کردہ اوقات پر پیمائش۔',
  'modules.09.title': 'الرٹ',
  'modules.09.desc': 'حد عبور ہونے پر اطلاع — اور وہ کب کام نہیں کرے گی۔',
  'modules.10.title': 'تعاون',
  'modules.10.desc': 'ایپ پوری کی پوری مفت ہے۔ یہاں مصنف کو ایک کافی پلائی جا سکتی ہے۔',
  'modules.11.title': 'دستاویزات',
  'modules.11.desc': 'یہ پیمائش کیا ہے، اور یقیناً کیا نہیں ہے۔',
  'modules.12.title': 'ترتیبات',
  'modules.12.desc': 'تھیم، متن کا سائز، کم حرکت، ریکارڈ صاف کرنا۔',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'پیمائش کے چینل',
  'channels.pick': 'بڑے ڈسپلے پر دکھائیں',
  'channels.stale': 'معلومات نہیں',
  'channels.approx': 'تخمینی قدر',

  'help.unit': 'اکائی',
  'help.range': 'رینج',
  'help.thresholds': 'حدیں',
  'help.warn': 'احتیاط کی حد',
  'help.crit': 'تشویش کی حد',
  'help.now': 'اِس وقت',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „مقدار” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'مقدار',
  'col.unit': 'اکائی',
  'col.range': 'رینج',
  'col.direction': 'رخ',
  'col.time': 'وقت',
  'col.date': 'تاریخ',
  'col.zone': 'زون',
  'col.avg': 'اوسط',
  'col.min': 'کم سے کم',
  'col.max': 'زیادہ سے زیادہ',
  'col.name': 'کالم',
  'col.meaning': 'اس میں کیا ہے',
  'col.channel': 'چینل',
  'col.gain': 'ضارب',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'وقت کا دورانیہ',
  'recorder.range.60s': '60 s',
  'recorder.range.15min': '15 min',
  'recorder.range.1h': '1 گھنٹہ',
  'recorder.range.24h': '24 گھنٹے',
  'recorder.range.30d': '30 دن',
  'recorder.gap': 'پیمائش نہیں',
  'recorder.sessionTitle': 'سیشن کے اعداد و شمار',
  'recorder.zonesCaption': 'نیلے کے حصے کے لیے زونوں کی تقسیم',
  'recorder.tableCaption': 'منتخب دورانیے کی ریڈنگ',
  'recorder.crosshair': 'ریڈنگ کا کرسر',
  'recorder.prevAria': 'پچھلا نقطہ',
  'recorder.nextAria': 'اگلا نقطہ',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'ظاہری شکل',
  'settings.themeLabel': 'تھیم',
  'settings.themeSystem': 'نظام کے مطابق',
  'settings.themeLight': 'روشن',
  'settings.themeDark': 'گہرا',
  'settings.themeHint': '”نظام کے مطابق“ تھیم آپ کے فون کی ترتیب کے ساتھ بدلتی ہے۔',
  'settings.textLabel': 'متن کا سائز',
  /* Mnożnik jako LICZBA we wstawce — 1.15 po urdusku, 1,15 po polsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'پورے انٹرفیس کو بڑا کرتا ہے، صرف حروف کو نہیں — بٹن اور سطریں بھی متن کے ساتھ بڑھتی ہیں۔',
  'settings.motionGroup': 'حرکت',
  'settings.motionLabel': 'کم حرکت',
  'settings.motionHint': 'تمام تبدیلیاں بند کر دیتا ہے۔ اسکیل کی سوئی تب بہنے کے بجائے سیکنڈ میں ایک بار چھلانگ لگاتی ہے۔',
  'settings.dataTitle': 'ڈیٹا',
  'settings.clearLabel': 'ریکارڈ صاف کریں',
  'settings.clearHintTpl': 'ریکارڈ میں اِس وقت {count} محفوظ نقطے ہیں۔',
  'settings.clearHintEmpty': 'ریکارڈ خالی ہے۔',
  'settings.clearTitle': 'ریکارڈ صاف کریں؟',
  'settings.clearConfirm': 'پیمائش کا سارا ریکارڈ صاف کر دیں؟ اسے واپس نہیں لایا جا سکتا۔',
  'settings.clearKey': 'صاف کریں',
  'settings.aboutTitle': 'ایپ کے بارے میں',
  'settings.versionTpl': '{app}، ورژن {version}۔',
  'settings.offlineText': 'ایپ نیٹ ورک کے بغیر چلتی ہے۔ پہلی بار کھلنے کے بعد اس کی تمام فائلیں براؤزر کی میموری میں پڑی رہتی ہیں، اس لیے ہوائی جہاز موڈ سے کچھ نہیں بدلتا۔ کسی سرور کو کچھ نہیں بھیجا جاتا، کیونکہ ایپ کوئی نیٹ ورک درخواست نہیں کرتی۔',
  'settings.docsKey': 'دستاویزات کھولیں',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'منسوخ',
  'common.save': 'محفوظ کریں',
  'common.reset': 'طے شدہ بحال کریں',
  'common.yes': 'ہاں',
  'common.no': 'نہیں',
  'common.on': 'چالو',
  'common.off': 'بند',
  'common.sep': ' · ',
  'common.stepsTitle': 'قدم بہ قدم',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'اپنی حدیں کس لیے',
  'modules.02.intro': 'حد طے کرتی ہے کہ ایپ کب ”احتیاط“ کہے اور کب ”تشویشناک“۔ طے شدہ قدریں ہماری ادارتی رائے ہیں، کوئی معیار نہیں — اگر آپ مختلف حالات میں ناپتے ہیں تو انہیں اپنے مطابق کھسکا لیں۔ ڈیش بورڈ کا فیصلہ اور جملہ فوراً نئی حدوں سے بنتے ہیں۔',
  'modules.02.orderNormal': 'احتیاط کی حد تشویش کی حد سے نیچے ہونی چاہیے۔',
  'modules.02.orderInvert': 'یہاں زیادہ قدر بہتر ہے، اس لیے احتیاط کی حد تشویش کی حد سے اوپر رہتی ہے۔',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'اسکیل کا پیش نظارہ: {name}',
  'modules.02.nowTpl': 'اِس وقت {value}',
  'modules.02.resetDone': 'طے شدہ حدیں بحال ہو گئیں۔',
  'modules.02.profilesTitle': 'پروفائل',
  'modules.02.profilesHint': 'پروفائل ساتوں مقداروں کی حدوں کا محفوظ مجموعہ ہے۔ پروفائل لاگو کرنے پر وہ سب ایک ساتھ بدل جاتی ہیں۔',
  'modules.02.profileSaveKey': 'موجودہ حدیں محفوظ کریں',
  'modules.02.profileNameLabel': 'نئے پروفائل کا نام',
  'modules.02.profileNameHint': 'نام اسی آلے پر رہتا ہے۔ زیادہ سے زیادہ 40 حروف۔',
  'modules.02.profileNameEmpty': 'پروفائل کا نام لکھیں۔',
  'modules.02.profileSavedTpl': '”{name}“ پروفائل محفوظ ہو گیا۔',
  'modules.02.profileAppliedTpl': '”{name}“ پروفائل لاگو ہو گیا۔',
  'modules.02.profileRemovedTpl': '”{name}“ پروفائل حذف ہو گیا۔',
  'modules.02.profileFailed': 'یہ پروفائل لاگو نہیں کیا جا سکا۔',
  'modules.02.profileCustomTpl': 'اپنا پروفائل، {date} کو محفوظ کیا گیا۔',
  'modules.02.builtin.default.name': 'طے شدہ',
  'modules.02.builtin.default.desc': 'مقداروں کے کیٹلاگ کی حدیں — ہر پیمائش کا نقطۂ آغاز۔',
  'modules.02.builtin.evening.name': 'شام — نرم',
  'modules.02.builtin.evening.desc': 'ٹھنڈے رنگ اور یومیہ تال پر اثر کے بارے میں پہلے خبردار کرتا ہے۔',
  'modules.02.builtin.work.name': 'میز پر کام',
  'modules.02.builtin.work.desc': 'روشن، ٹھنڈی دن کی روشنی کی اجازت دیتا ہے؛ ٹمٹماہٹ اور یکسانیت پر نظر رکھتا ہے۔',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'یہ کیوں کام کرتا ہے',
  'modules.03.why': 'کیمرے کے سینسر میں چینلوں کے درمیان ایک مستقل جھکاؤ ہوتا ہے۔ سفید کاغذ ناپنے سے پتا چل جاتا ہے کہ وہ کتنا بڑا ہے، اور اسے گھٹایا جا سکتا ہے۔ اس ایپ میں یہی واحد سہولت ہے جو واقعی درستی بڑھاتی ہے — اور پھر بھی کیمرے کو اسپیکٹرومیٹر نہیں بنا دیتی۔',
  'modules.03.steps.1': 'ناپی جانے والی روشنی کے نیچے سفید کاغذ رکھیں۔',
  'modules.03.steps.2': 'ڈیش بورڈ پر ”پیمائش شروع کریں“ دبائیں اور فریم کو کاغذ سے بھر دیں۔',
  'modules.03.steps.3': 'یہاں واپس آئیں، ”کیلبریٹ کریں“ دبائیں اور تین سیکنڈ فون کو بغیر ہلائے پکڑے رکھیں۔',
  'modules.03.runKey': 'کیلبریٹ کریں (3 s)',
  'modules.03.clearKey': 'کیلبریشن حذف کریں',
  'modules.03.busyTpl': 'کاغذ ناپا جا رہا ہے… {sec} s باقی',
  'modules.03.statusNone': 'کوئی کیلبریشن نہیں۔ پیمائش چلتی ہے؛ قدروں کو تقابلی طور پر لیں۔',
  'modules.03.statusOnTpl': '{date} کو {time} پر کیلبریٹ کیا گیا۔',
  'modules.03.gainsTitle': 'چینلوں کے ضارب',
  'modules.03.gainR': 'سرخ',
  'modules.03.gainG': 'سبز',
  'modules.03.gainB': 'نیلا',
  'modules.03.gainsNone': 'مقرر نہیں',
  'modules.03.needRunning': 'پہلے پیمائش شروع کریں اور کیمرے کا رخ سفید کاغذ کی طرف کریں۔',
  'modules.03.tooFew': 'نمونے بہت کم ہیں۔ دیکھیں کہ پیمائش واقعی چل رہی ہے۔',
  'modules.03.tooDark': 'تصویر کیلبریشن کے لیے بہت تاریک ہے۔ کاغذ پر زیادہ روشنی ڈالیں اور دوبارہ کوشش کریں۔',
  'modules.03.refused': 'چینلوں کا جھکاؤ اتنا بڑا ہے کہ اسے کیلبریشن نہیں مانا جا سکتا۔ یکساں روشنی میں سفید کاغذ استعمال کریں۔',
  'modules.03.done': 'کیلبریٹ ہو گیا۔ رنگی درجۂ حرارت اور یومیہ تال پر اثر اب زیادہ درست ہوں گے۔',
  'modules.03.cleared': 'کیلبریشن حذف ہو گئی۔',
  'modules.03.limitsTitle': 'کیلبریشن کیا ٹھیک نہیں کرتی',
  'modules.03.limits.1': 'کیلبریشن کیمرے کے تین چینل برابر کرتی ہے، اس سے آگے کچھ نہیں۔ یہ کیمرے کو طیف نہیں دیتی، اس لیے رنگی درجۂ حرارت اور یومیہ تال پر اثر sRGB بنیادی رنگوں سے نکالے گئے تخمینے ہی رہتے ہیں۔',
  'modules.03.limits.2': 'یہ منظر کی چمک کو مطلق مقدار میں نہیں بدلتی — وہ عدد نسبتی ہی رہتا ہے۔ یہ خودکار نمائش یا وائٹ بیلنس بھی بند نہیں کرتی، جو نیچے سے ریڈنگ کھسکاتے رہتے ہیں۔',
  'modules.03.limits.3': 'یہ کسی دوسری روشنی پر منتقل نہیں ہوتی: ایک بلب کے نیچے کی گئی کیلبریشن اُسی بلب کو بیان کرتی ہے۔ منبع بدلے تو اسے دہرائیں۔ اور یہ اس بارے میں کچھ نہیں بدلتی کہ یہ پیمائش کیا نہیں ہے — یہ اب بھی نہ معائنہ ہے اور نہ کسی بیماری کی تشخیص کی بنیاد۔',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'رپورٹ کا دورانیہ',
  'modules.04.rangeDay': 'دن',
  'modules.04.rangeWeek': 'ہفتہ',
  'modules.04.headTpl': '{from} سے {to} تک · ریکارڈ کے {count} نقطے۔',
  'modules.04.tableTitle': 'خلاصہ',
  'modules.04.tableCaption': 'منتخب دورانیے میں اوسط، کم سے کم اور زیادہ سے زیادہ',
  'modules.04.panoramaTitle': 'پینوراما',
  'modules.04.panoramaAriaTpl': 'پینوراما: {name}، {span}۔',
  'modules.04.panoramaSpanDay': 'گزشتہ 24 گھنٹے، گھنٹوں میں تقسیم',
  'modules.04.panoramaSpanWeek': 'گزشتہ ہفتہ، دنوں میں تقسیم',
  'modules.04.panoramaHint': 'ستون کی اونچائی اور رنگ ایک ہی بات کہتے ہیں: حد کے اندر — نیچا، احتیاط — درمیانہ، تشویشناک — پورا۔ بنیاد پر لکیر اُس گھنٹے کو ظاہر کرتی ہے جس میں پیمائش نہیں ہوئی۔',
  'modules.04.coverageDayTpl': 'پیمائش {total} میں سے {done} گھنٹوں پر محیط رہی۔',
  'modules.04.coverageWeekTpl': 'پیمائش {total} میں سے {done} دنوں پر محیط رہی۔',
  'modules.04.zonesTitle': 'زونوں کی تقسیم',
  'modules.04.zonesCaptionTpl': 'مرکزی چینل کے لیے شمار کیا گیا: {name}۔',
  'modules.04.worstTpl': 'سب سے مشکل وقت: {value}۔',
  'modules.04.worstNone': 'کوئی نمایاں نہیں',
  'modules.04.worstHourTpl': '{hour} بجے',
  'modules.04.adviceTitle': 'اس کا کیا کریں',
  'modules.04.adviceMelanopicTpl': 'یومیہ تال پر اوسط اثر {value}× رہا۔ شام کو 0.50 سے نیچے آنا بہتر ہے — سب سے آسان طریقہ زیادہ گرم بلب یا نائٹ موڈ ہے۔',
  'modules.04.adviceKelvinTpl': 'روشنی ٹھنڈی تھی (اوسطاً {value} K)۔ کام کے لیے یہ بےعیب ہے؛ سونے سے دو گھنٹے پہلے 3000 K سے نیچے زیادہ نرم رہتا ہے۔',
  'modules.04.adviceFlickerTpl': 'نمایاں ٹمٹماہٹ نظر آ رہی ہے (اوسطاً {value}%)۔ اس کے پیچھے عموماً سستا ڈمر یا بیک لائٹ کا بجلی گھر ہوتا ہے۔',
  'modules.04.adviceUniformityTpl': 'روشنی غیر یکساں پھیل رہی ہے ({value}%)۔ لیمپ کھسکانا یا اس کا زاویہ بدلنا عموماً بلب بدلنے سے زیادہ کام دیتا ہے۔',
  'modules.04.adviceWorstTpl': 'حدوں سے باہر کی سب سے زیادہ ریڈنگ {hour} بجے جمع ہوتی ہیں۔',
  'modules.04.adviceNone': 'اس دورانیے میں کوئی چیز آپ کی مقرر کردہ حدوں سے آگے نہیں نکلی۔',
  'modules.04.limitsTitle': 'یہ صحت کا مشورہ نہیں ہے',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'نتائج صرف اُسی سے نکلتے ہیں جو اِس فون کے کیمرے نے دیکھا۔ ایپ طیف نہیں ناپتی اور کوئی تشخیص نہیں کرتی۔',
  'modules.04.printHint': 'یہ صفحہ چھپائی کی طرح ترتیب دیا گیا ہے: جدول اور عبارتیں کاغذ پر، نظام کے مکبّر میں اور اسکرین ریڈر میں ایک جیسی پڑھی جاتی ہیں۔',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'ڈیٹا کا دورانیہ',
  'modules.05.range1h': 'گھنٹہ',
  'modules.05.range24h': 'دن',
  'modules.05.range7d': '7 دن',
  'modules.05.range30d': '30 دن',
  'modules.05.csvKey': 'CSV فائل محفوظ کریں',
  'modules.05.jsonKey': 'JSON فائل محفوظ کریں',
  'modules.05.formatTitle': 'فائل کی شکل',
  'modules.05.formatCsv': 'CSV: کالم سیمی کولن سے الگ ہوتے ہیں، اعشاریے کا نشان کاما ہے، اور کوڈنگ UTF-8 ہے، BOM نشان کے ساتھ۔ جس Excel میں اعشاریے کا نشان کاما ہو، وہ ایسی فائل کچھ ترتیب دیے بغیر کھول لیتا ہے۔',
  'modules.05.formatJson': 'JSON: وہی ڈیٹا ”points“ خانے میں، اعشاریے کے نقطے اور ملی سیکنڈ میں وقت کے نشان کے ساتھ — یہ اس فارمیٹ کا تقاضا ہے۔',
  'modules.05.resolution': 'ریکارڈ ہر 5 سیکنڈ میں ایک نقطہ محفوظ کرتا ہے اور 30 دن پیچھے تک جاتا ہے۔ فی سیکنڈ پانچ نمونوں والی پوری تفصیل فائل میں نہیں ہوتی — انجن اسے صرف ایک منٹ تک رکھتا ہے۔',
  'modules.05.offline': 'فائل آلے میں بنتی ہے اور آلے میں ہی رہتی ہے۔ ایکسپورٹ کسی نیٹ ورک سے نہیں جڑتا۔',
  'modules.05.columnsTitle': 'کالموں کی وضاحت',
  'modules.05.columnsCaption': 'فائل کے کالم اور اُن کا مطلب',
  'modules.05.descDate': 'آلے کی گھڑی سے نقطے کی تاریخ، دن-مہینہ-سال کی ترتیب میں۔',
  'modules.05.descTime': 'نقطے کا وقت، سیکنڈ کی درستی تک۔',
  'modules.05.descZone': 'محفوظ کرتے وقت نیلے کے حصے کا زون۔ انجن زون صرف اسی ایک مقدار کے لیے لکھتا ہے — باقی کے لیے اسے حدوں سے خود نکالیں۔',
  'modules.05.descMetricTpl': '{short} اکائی: {unit}۔ رینج {min}–{max}۔',
  'modules.05.previewTitle': 'پیش نظارہ',
  'modules.05.previewHint': 'فائل کی پہلی پانچ سطریں، بالکل ویسے جیسے وہ محفوظ ہوں گی۔',
  'modules.05.savedTpl': 'فائل {name} محفوظ ہو گئی — {rows} سطریں۔',
  'modules.05.failed': 'اس براؤزر نے فائل محفوظ نہیں کرنے دی۔',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'ایپ ہر مکمل شدہ پیمائشی سیشن اسی آلے پر محفوظ کرتی ہے۔ دو چنیں تاکہ انہیں ایک ہی فیتے پر دیکھ سکیں اور فرق عدد میں پڑھ سکیں۔',
  'modules.06.noSessions': 'ابھی کوئی مکمل شدہ سیشن نہیں ہے۔ پیمائش شروع کریں، اسے روکیں اور یہاں واپس آئیں۔',
  'modules.06.slotA': 'سیشن A',
  'modules.06.slotB': 'سیشن B',
  'modules.06.sessionTpl': '{date}، {time} · {dur}',
  'modules.06.tapeTitle': 'فیتہ',
  'modules.06.tapeAriaTpl': 'سیشن {slot} کا سفر، مقدار {name}۔',
  'modules.06.tapeHint': 'دونوں سیشن ایک ہی چوڑائی پر پھیلائے گئے ہیں: ستون دورانیے کا وہی حصہ ہے، گھڑی کا وہی وقت نہیں۔ اونچائی اور رنگ وہی کہتے ہیں جو ڈیش بورڈ پر۔',
  'modules.06.tapeChannelTpl': 'فیتہ مرکزی چینل دکھاتا ہے: {name}۔',
  'modules.06.diffTitle': 'فرق',
  'modules.06.diffCaption': 'دونوں سیشن کی اوسط اور اُن کے درمیان فرق',
  'modules.06.clearKey': 'محفوظ سیشن حذف کریں',
  'modules.06.cleared': 'محفوظ سیشن حذف ہو گئے۔',
  'modules.06.savedTpl': 'سیشن محفوظ ہو گیا: {dur}۔',
  'modules.06.limitsTitle': 'یہ موازنہ کیا نہیں بتاتا',
  'modules.06.limits': 'آپ دو پیمائشوں کا موازنہ کر رہے ہیں، روشنی کے دو منبعوں کا نہیں۔ اگر سیشنوں کے درمیان فریم، فاصلہ، دن کا وقت یا فون کی جگہ بدلی ہے تو فرق اس کے بارے میں بھی ہے۔ سب سے دیانت دار موازنہ وہی منظر ہے، روشنی بدلنے سے پہلے اور بعد میں۔',
  'modules.06.keepTpl': 'زیادہ سے زیادہ {count} تازہ ترین سیشن یاد رکھے جاتے ہیں۔',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'جانچ کے پیٹرن اسی آلے کی پوری اسکرین پر دکھائے جاتے ہیں۔ یہ اسکرین کو آنکھ سے دیکھنے کے لیے ہیں: سفیدی یکساں ہے یا نہیں، خاکستری رنگ میں تو نہیں ڈھل رہی، اور بیک لائٹ کونوں سے رِس تو نہیں رہی۔',
  'modules.07.steps.1': 'اسکرین کی چمک وہی رکھیں جس پر آپ عام طور پر کام کرتے ہیں، اور نظام کا نائٹ موڈ بند کریں۔',
  'modules.07.steps.2': 'نیچے کی فہرست سے کوئی پیٹرن چنیں۔ وہ پوری اسکرین بھر دے گا۔',
  'modules.07.steps.3': 'تقریباً ساٹھ سینٹی میٹر کے فاصلے سے، اسکرین کے سامنے سیدھے دیکھیں۔ پھر وہی پیٹرن کسی زاویے سے دیکھیں۔',
  'modules.07.steps.4': '”پیٹرن بند کریں“ کے بٹن یا Escape کلید سے باہر نکلیں اور اگلے پر جائیں۔',
  'modules.07.planesTitle': 'پیٹرن',
  'modules.07.exitKey': 'پیٹرن بند کریں',
  'modules.07.showAriaTpl': 'پیٹرن دکھائیں: {name}',
  'modules.07.planeAriaTpl': 'جانچ کا پیٹرن: {name}۔ بند کرنے کا بٹن اسکرین کے نیچے ہے۔',
  'modules.07.plane.white.name': 'سفید',
  'modules.07.plane.white.hint': 'کناروں کے پاس دھبے، رنگت اور زیادہ روشن حصے تلاش کریں۔ سفیدی پوری سطح پر ایک ہی رنگ ہونی چاہیے۔',
  'modules.07.plane.gray75.name': 'خاکستری 75%',
  'modules.07.plane.gray75.hint': 'خاکستری کو خاکستری ہونا چاہیے۔ سبزی یا گلابی جھلک کا مطلب ہے کہ اسکرین کا وائٹ بیلنس بگڑا ہوا ہے۔',
  'modules.07.plane.gray50.name': 'خاکستری 50%',
  'modules.07.plane.gray50.hint': 'رنگت پرکھنے کے لیے بہترین پیٹرن۔ درمیان کا کونوں سے موازنہ کریں۔',
  'modules.07.plane.gray25.name': 'خاکستری 25%',
  'modules.07.plane.gray25.hint': 'گہری خاکستری بیک لائٹ کا رِساؤ اور سستی اسکرینوں کی پٹیاں ظاہر کرتی ہے۔',
  'modules.07.plane.black.name': 'سیاہ',
  'modules.07.plane.black.hint': 'تاریک کمرے میں یہاں بیک لائٹ کا ہر رِساؤ اور ہر روشن ہوا کونا نظر آتا ہے۔',
  'modules.07.plane.red.name': 'خالص سرخ',
  'modules.07.plane.red.hint': 'یکساں سرخ مردہ سب پکسل اور اسکرین کی ناہمواری ظاہر کرتی ہے۔',
  'modules.07.plane.green.name': 'خالص سبز',
  'modules.07.plane.green.hint': 'سبز سب سے زیادہ چمک لے کر آتا ہے — خراب پکسل اسی پر سب سے آسانی سے نظر آتا ہے۔',
  'modules.07.plane.blue.name': 'خالص نیلا',
  'modules.07.plane.blue.hint': 'نیلا اسکرین کی سطح پر میل اور دھبے سفید سے بہتر دکھاتا ہے۔',
  'modules.07.plane.grid.name': 'جالی',
  'modules.07.plane.grid.hint': 'لکیریں کونوں میں اتنی ہی تیز ہونی چاہئیں جتنی درمیان میں۔ کناروں پر دھندلاہٹ تصویر کے اسکیلنگ کا معاملہ ہے۔',
  'modules.07.warn': 'پیٹرن پوری اسکرین ڈھانپ لیتا ہے، پیمائش کے بٹن والا کنٹرول ڈیش بورڈ بھی۔ ایپ میں یہی واحد جگہ ہے جہاں ایسا ہوتا ہے، اسی لیے باہر نکلنے کا بٹن بڑا اور ہمیشہ نظر آنے والا ہے۔ جب تک پیٹرن اسکرین پر ہے، پیمائش چلتی رہتی ہے اور اسے روکا نہیں جا سکتا — بٹنوں پر واپس آنے کے لیے پیٹرن بند کریں۔',
  'modules.07.cameraTitle': 'یہاں آپ کیا نہیں کر سکتے',
  'modules.07.camera': 'فون اپنی ہی اسکرین نہیں دیکھتا، اس لیے اِن پیٹرن کو اُسی آلے سے نہیں ناپا جا سکتا۔ مانیٹر ناپنا ہو تو پیٹرن مانیٹر پر دکھائیں اور پیمائش فون سے کریں — یہ دو الگ آلے اور دو الگ کردار ہیں۔',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'شیڈول مقررہ وقت پر پیمائش کی یاد دلاتا ہے۔ کیمرہ خود نہیں چلاتا: مقررہ گھنٹے پر یاد دہانی دکھاتا ہے، اور پیمائش آپ ڈیش بورڈ پر ”پیمائش شروع کریں“ کے بٹن سے شروع کرتے ہیں۔ بالکل ویسے جیسے پہلی بار۔',
  'modules.08.onlyOpenTitle': 'یہ کب کام نہیں کرے گا',
  'modules.08.onlyOpen': 'شیڈول صرف اُس وقت چلتا ہے جب ایپ کھلی ہو۔ بند کیا ہوا براؤزر ٹیب وقت نہیں گنتا اور کسی چیز کی یاد نہیں دلائے گا۔ ہم نظام کی اطلاعات کی اجازت نہیں مانگتے اور نیٹ ورک پر کچھ نہیں بھیجتے۔',
  'modules.08.enableLabel': 'یاد دہانیاں چالو کریں',
  'modules.08.timesTitle': 'اوقات',
  'modules.08.timeAriaTpl': 'وقت {n}: یاد دہانی کا گھنٹہ',
  'modules.08.addKey': 'وقت شامل کریں',
  'modules.08.removeAriaTpl': '{time} کا وقت حذف کریں',
  'modules.08.addedTpl': '{time} کا وقت شامل ہو گیا۔',
  'modules.08.removedTpl': '{time} کا وقت حذف ہو گیا۔',
  'modules.08.badTime': 'وقت 22:00 کی شکل میں لکھیں۔',
  'modules.08.nextTpl': 'اگلی یاد دہانی: {time}۔',
  'modules.08.nextNone': 'یاد دہانیاں بند ہیں۔',
  'modules.08.dueTpl': 'پیمائش کا طے شدہ وقت: {time}۔',
  'modules.08.dueKey': 'ڈیش بورڈ دکھائیں',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'الرٹ ایک مقدار پر نظر رکھتا ہے اور تبھی بولتا ہے جب وہ مقرر کردہ وقت تک بغیر رکے منتخب زون میں رہے۔ یہ نہ کبھی پیمائش روکتا ہے اور نہ کبھی بٹن ڈھانپتا ہے۔',
  'modules.09.enableLabel': 'الرٹ چالو کریں',
  'modules.09.metricLabel': 'نگرانی میں مقدار',
  'modules.09.levelLabel': 'کس زون سے',
  'modules.09.levelWarning': 'احتیاط سے اوپر',
  'modules.09.levelCritical': 'صرف تشویشناک',
  'modules.09.sustainLabel': 'کتنے سیکنڈ بغیر رکے',
  'modules.09.sustainHint': 'کم وقت رکھنے سے فون ہلانے پر جھوٹے الارم بڑھ جاتے ہیں۔ ہم پانچ سیکنڈ سے نیچے نہیں جاتے۔',
  'modules.09.soundLabel': 'مختصر آواز کا اشارہ',
  'modules.09.soundHint': 'آواز آلے میں ہی بنتی ہے۔ نیٹ ورک سے کچھ نہیں اترتا۔',
  'modules.09.cooldownHint': 'دو منٹ میں زیادہ سے زیادہ ایک الرٹ۔ ہر نمونے پر دہرایا جانے والا الارم وہ الارم ہے جسے ہمیشہ کے لیے بند کر دیا جاتا ہے۔',
  'modules.09.whenNotTitle': 'الرٹ کب کام نہیں کرے گا',
  'modules.09.whenNot': 'اطلاع ایپ کے اندر ہے، نظام میں نہیں۔ یہ اُس وقت کام نہیں کرے گی جب ایپ بند ہو یا پس منظر میں چھپی ہو، جب پیمائش نہ چل رہی ہو، اور جب نگرانی میں رکھی مقدار اُس لمحے ناپی نہ جا سکتی ہو۔ ہم نظام کی اطلاعات کی اجازت نہیں مانگتے۔',
  'modules.09.firedTpl': '{name}: {sec} s سے {zone} — اِس وقت {value}۔',
  'modules.09.saved': 'الرٹ کی ترتیبات محفوظ ہو گئیں۔',
  'modules.09.statusOnTpl': 'نگرانی میں: {name}، {level}، {sec} s کے بعد۔',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'یہ ایپ مفت ہے',
  'support.freeText': 'ساتوں مقداریں پہلی بار چلانے سے ہی اعداد دکھاتی ہیں۔ ریکارڈر، حدیں، کیلبریشن، رپورٹیں، ایکسپورٹ، سیشنوں کا موازنہ اور تیس دن کا پورا ریکارڈ بغیر اکاؤنٹ، بغیر فیس اور بغیر کسی حد کے چلتے ہیں — آف لائن بھی ویسے ہی۔ یہاں کچھ بھی ادائیگی کے پیچھے بعد کے لیے نہیں رکھا گیا۔',
  'support.whyTitle': 'میں یہ کیوں مانگ رہا ہوں',
  'support.whyText': 'روشنی مانیٹر میں خود بناتا اور سنبھالتا ہوں، فارغ وقت میں۔ تعاون اُس وقت پر خرچ ہوتا ہے جو درستیوں، مزید فونوں پر جانچ اور ماڈیولوں کی فہرست میں اگلے اوزاروں پر لگتا ہے۔ اگر کوئی کچھ نہ دے تو بھی کچھ کام کرنا بند نہیں کرے گا۔',
  'support.nothingTitle': 'عطیے سے کیا ملتا ہے',
  'support.nothingText': 'کچھ نہیں۔ عطیے کے بعد نہ کوئی عدد، نہ کوئی ماڈیول اور نہ کوئی ترتیب کھلتی ہے، کیونکہ سب کچھ شروع سے کھلا ہوا ہے۔ بس اتنا رہ جاتا ہے کہ مجھے معلوم ہو جاتا ہے کہ یہ کسی کے کام آئی۔',
  'support.keyTitle': 'اگر آپ مدد کرنا چاہیں',
  'support.keyLabel': 'مجھے ایک کافی پلائیں',
  'support.keyAria': 'مجھے ایک کافی پلائیں — بیرونی صفحہ نئے ٹیب میں کھولتا ہے',
  'support.serviceText': 'عطیات کا پروفائل Buy Me a Coffee چلاتا ہے، اور اس ایپ میں تعاون کی یہی واحد صورت ہے۔ ایپ اس سے نہ کوئی اسکرپٹ لیتی ہے، نہ ویجٹ اور نہ تصویر — یہاں صرف ایک سادہ لنک کھڑا ہے، اس کے سوا کچھ نہیں۔',
  'support.privacyText': 'اس بٹن کو دبانے سے بیرونی صفحہ نئے ٹیب میں کھلتا ہے، اور یہی واحد لمحہ ہے جب کوئی چیز اس آلے سے باہر جاتی ہے۔ پیمائشیں، ریکارڈ اور ترتیبات وہیں رہتی ہیں جہاں تھیں — اسی براؤزر کی میموری میں۔',
  'support.privacyPendingText': 'جب پتہ دستیاب ہو گا، بٹن دبانے سے بیرونی صفحہ نئے ٹیب میں کھلے گا اور یہی واحد لمحہ ہو گا جب کوئی چیز اس آلے سے باہر جائے گی۔ پیمائشیں، ریکارڈ اور ترتیبات وہیں رہتی ہیں جہاں تھیں — اسی براؤزر کی میموری میں۔',
  'support.emptyTitle': 'پروفائل ابھی جڑا نہیں ہے',
  'support.emptyText': 'عطیات کے پروفائل کا پتہ ابھی درج نہیں ہوا، اس لیے یہاں کوئی ایسا بٹن نہیں جو کہیں نہ لے جائے۔ باقی ایپ بغیر کسی تبدیلی کے چلتی ہے — اس عطیے کے انتظار میں کچھ نہیں رکا۔',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'یہ ایپ کیا نہیں ناپتی',
  'docs.notList.1': 'یہ طیف نہیں ناپتی۔ کیمرے میں تین چوڑے رنگی چینل، خودکار نمائش اور خودکار وائٹ بیلنس ہوتا ہے۔',
  'docs.notList.2': 'یہ مطلق قدریں نہیں ناپتی۔ منظر کی چمک ایک نسبتی اشاریہ ہے، فوٹومیٹرک پیمائش کا نتیجہ نہیں۔',
  'docs.notList.3': 'یہ رنگی درجۂ حرارت براہِ راست نہیں ناپتی۔ رنگی درجۂ حرارت اور یومیہ تال پر اثر sRGB بنیادی رنگوں سے نکالے گئے تخمینے ہیں۔',
  'docs.notList.4': 'یہ بجلی کی ٹمٹماہٹ نہیں دیکھتی۔ 5 Hz پر نمونہ گیری صرف 2.5 Hz سے نیچے کی دھڑکن دیکھتی ہے — بجلی کی 100 Hz ٹمٹماہٹ پہنچ سے باہر ہے اور ایپ اسے کبھی نتیجے کے طور پر نہیں دکھائے گی۔',
  'docs.notList.5': 'یہ نہ تشخیص کرتی ہے اور نہ صحت کا مشورہ دیتی ہے۔ کوئی بھی نتیجہ اِن میں سے کچھ نہیں ہے۔',
  'docs.notList.6': 'یہ آپ کی روشنی کا کسی سرکاری معیار سے موازنہ نہیں کرتی۔ حدیں ترتیبات ہیں جنہیں آپ ماڈیول 02 میں بدل سکتے ہیں۔',
  'docs.whatTitle': 'یہ کیا ناپتی ہے اور کیسے',
  'docs.whatLead': 'فون کا کیمرہ روشن سطح کو دیکھتا ہے، اور ایپ سیکنڈ میں پانچ بار فریم کے درمیانی حصے سے R، G اور B چینلوں کی اوسط نکالتی ہے۔ اِن تین اعداد سے وہ سات اشاریے اخذ کرتی ہے۔',
  'docs.whatCrop': 'یہ حصہ فریم کی چوڑائی کا درمیانی 60% اور اونچائی کا 60% ہے — بالکل وہی مستطیل جسے نشانہ بندی کی اسکرین پر نشان گھیرتا ہے۔ اس سے باہر کچھ شمار نہیں ہوتا۔',
  'docs.whatRate': 'ہر 200 ms میں ایک نمونہ، یعنی سیکنڈ میں 5 بار۔ گزشتہ منٹ پوری تفصیل کے ساتھ میموری میں پڑا رہتا ہے؛ اس سے پرانا سب کچھ ہر 5 سیکنڈ میں محفوظ ہوتا ہے اور تیس دن پیچھے تک جاتا ہے۔',
  'docs.metricsTitle': 'سات مقداریں',
  'docs.formulasTitle': 'فارمولے',
  'docs.formula.share.formula': 'نیلے کا حصہ = B / (R + G + B) × 100%',
  'docs.formula.share.text': 'گاما اُلٹے بغیر sRGB قدروں پر شمار کیا جاتا ہے — جان بوجھ کر، کیونکہ یہ وہی تعریف ہے جو ایپ کے پچھلے ورژن میں تھی، اور تب مقرر کی گئی حدیں آج بھی وہی معنی رکھتی ہیں۔ یہ رنگ کو چمک سے الگ کرتا ہے۔',
  'docs.formula.brightness.formula': 'چمک = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': 'چینلوں کی اوسط قدر، رینج کے فیصد میں۔ خودکار نمائش اسے نیچے سے کھسکاتی ہے، اس لیے یہ نسبتی اشاریہ ہے — دو مناظر کا موازنہ کریں، ایک عدد کو پیمائش کی طرح نہ پڑھیں۔',
  'docs.formula.kelvin.title': 'رنگی درجۂ حرارت — McCamy کا تخمینہ',
  'docs.formula.kelvin.formula': 'n = (x − 0.3320) / (y − 0.1858)\nCCT = −449 n³ + 3525 n² − 6823.3 n + 5520.33',
  'docs.formula.kelvin.text': 'پہلے ہم sRGB گاما اُلٹتے ہیں، پھر D65 سفیدی کے لیے میٹرکس سے CIE XYZ پر جاتے ہیں اور رنگیت x، y نکالتے ہیں۔ McCamy کا فارمولا تقریباً 2000 K اور 12500 K کے درمیان قابلِ اعتماد ہے۔ اس رینج سے باہر مکعبی منحنی بگڑ جاتا ہے، اس لیے نتیجہ کاٹ دیا جاتا ہے اور غیر معتبر کے طور پر نشان زد ہوتا ہے — تب اسکیل کی بنیادی لکیر ٹوٹی ہوئی ہو جاتی ہے اور یہ جملہ آتا ہے: ”طریقے کی حد سے باہر“۔',
  'docs.formula.melanopic.title': 'یومیہ تال پر اثر — میلانوپک تناسب',
  'docs.formula.melanopic.formula': 'mel = 0.0016 R + 0.3110 G + 0.8460 B\nY = 0.2127 R + 0.7152 G + 0.0722 B\nنتیجہ = (mel / Y) × غیر جانبدار سفیدی کے لیے 1.00 پر معیار بندی',
  'docs.formula.melanopic.text': 'تینوں چینل خطی قدروں میں۔ اصل مقدار طیف کا میلانوپسن کی حساسیت کے منحنی کے ساتھ تکامل ہے (چوٹی تقریباً 490 nm پر)؛ کیمرے میں تین چوڑے چینل ہوتے ہیں، اس لیے ہم sRGB کے بنیادی رنگوں کو اُن کی تخمینی طولِ موج پر میلانوپک حساسیت سے وزن دیتے ہیں (R 612 nm، G 549 nm، B 465 nm)۔ تبدیلی کا رخ قابلِ اعتماد ہے، مطلق قدر نہیں — اسی لیے اس عدد کے ساتھ ”≈“ کا نشان کھڑا ہے۔',
  'docs.formula.flicker.formula': 'ٹمٹماہٹ = (max − min) / (max + min) × 100%',
  'docs.formula.flicker.text': 'IES کی تعریف، چمک کے نمونوں کی ایک کھڑکی سے شمار کی گئی۔ فریکوئنسی کا اندازہ ہم اس سے لگاتے ہیں کہ سگنل کتنی بار اپنی اوسط قدر عبور کرتا ہے۔ 5 Hz پر نمونہ گیری صرف 2.5 Hz سے نیچے کا اتار چڑھاؤ دیکھتی ہے (نائیکوئسٹ کی حد)، اور ہم فریکوئنسی کو تبھی معتبر مانتے ہیں جب وہ 0.2 اور 2 Hz کے درمیان ہو اور اتار چڑھاؤ 0.5% سے شروع ہو — اس حد سے نیچے اوسط کے یہ عبور سینسر کا شور ہیں، منبع کی دھڑکن نہیں۔',
  'docs.formula.uniformity.formula': 'یکسانیت = سب سے تاریک خانہ / سب سے روشن خانہ × 100%',
  'docs.formula.uniformity.text': 'ہم اس حصے کو 3×3 کی جالی میں نو خانوں میں بانٹتے ہیں اور انتہاؤں کا موازنہ کرتے ہیں۔ 100% کا مطلب بالکل یکساں پھیلی ہوئی روشنی ہے۔ اسکرین پر کم قدر کا مطلب بیک لائٹ کا رِساؤ یا عکس ہے، میز پر — غلط جگہ رکھا ہوا لیمپ۔ بصری آرام کے ساتھ یہی واحد مقدار ہے جس میں زیادہ کا مطلب بہتر ہے۔',
  'docs.formula.comfort.formula': '100 پوائنٹ منہا جرمانے:\nیومیہ تال پر اثر 0.75 سے اوپر — 35 پوائنٹ تک\nرنگ 4000 K سے اوپر — 25 پوائنٹ تک\nٹمٹماہٹ 5% سے اوپر — 25 پوائنٹ تک\nیکسانیت 60% سے نیچے — 15 پوائنٹ تک',
  'docs.formula.comfort.text': 'چھ اعداد کی جگہ ایک فیصلہ۔ جو مقدار ناپی نہ جا سکی وہ کوئی جرمانہ نہیں دیتی — معلومات کی کمی کبھی اچھے نتیجے کا بھیس نہیں بدلتی۔ وزن ہماری ادارتی رائے ہیں، کوئی معیار نہیں؛ اسی لیے ماڈیول 01 اجزا کی تقسیم دکھاتا ہے، تاکہ اس فیصلے سے اختلاف بھی کیا جا سکے۔',
  'docs.rangesTitle': 'رینج اور حدیں',
  'docs.rangesLead': 'نیچے دی گئی حدیں وہی ہیں جو اِس وقت نافذ ہیں — اگر آپ نے انہیں ماڈیول 02 میں بدلا ہے تو جدول آپ کی قدریں دکھاتا ہے، فیکٹری کی نہیں۔',
  'docs.dirNormal': 'کم کا مطلب نرم',
  'docs.dirInvert': 'زیادہ کا مطلب بہتر',
  'docs.privacyTitle': 'ڈیٹا اور رازداری',
  'docs.privacyText': 'کیمرے کی تصویر نہ کہیں بھیجی جاتی ہے اور نہ محفوظ کی جاتی ہے — ہر فریم سے صرف تین اعداد رہ جاتے ہیں۔ پیمائشیں، حدیں اور ترتیبات اِسی آلے پر براؤزر کی میموری میں پڑی رہتی ہیں۔ ایپ کوئی نیٹ ورک درخواست نہیں کرتی اور آف لائن چلتی ہے۔',
  'docs.mdrTitle': 'دستبرداری',
  'docs.freeText': 'ایپ پوری کی پوری مفت ہے اور ایسی ہی رہے گی: ساتوں مقداریں، ریکارڈ، رپورٹیں، ایکسپورٹ اور آف لائن حالت بغیر اکاؤنٹ، بغیر فیس اور بغیر کسی حد کے چلتے ہیں۔ جو شکریہ ادا کرنا چاہے، اسے ماڈیول 10 ”تعاون“ مل جائے گا۔',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'ایپ ادھوری لوڈ ہوئی',
  'boot.filesTpl': 'یہ فائلیں لوڈ نہیں ہوئیں: {list}۔',
  'boot.modulesTpl': 'یہ ماڈیول حاضر نہیں ہوئے: {list} — یہ اندراج فہرست سے نہیں کھلیں گے۔',
  'boot.modulesRangeTpl': 'ماڈیول {from}–{to}',
  'boot.tail': 'صفحہ ریفریش کریں۔ اگر اس سے فائدہ نہ ہو تو سرور پر فائلیں ادھوری ہیں۔',
  'boot.loss.bus': 'ماڈیول ایک دوسرے کو دیکھنا چھوڑ دیں گے اور پیمائش شروع نہیں ہو گی',
  'boot.loss.metrics': 'کوئی قدر شمار نہیں ہو گی',
  'boot.loss.scaleCore': 'اسکیل کی ساخت اور اعداد کی ترتیب غائب ہو جائے گی',
  'boot.loss.scaleText': 'انٹرفیس کی تمام عبارتیں غائب ہو جائیں گی',
  'boot.loss.shell': 'کوئی ماڈیول نہیں کھولا جا سکے گا',
  'boot.loss.engine': 'کیمرہ اور پیمائش شروع نہیں ہوں گے',
  'boot.loss.dash': 'ڈیش بورڈ خالی رہے گا'
});
