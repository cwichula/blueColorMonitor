/* docs/v3/i18n/hi.js — słownik WŁASNY wersji v3, hindi.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/hi.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * SKĄD TE ZDANIA: przekład z polskiej redakcji pierwotnej (pl.js), z angielskim
 * (en.js) jako wzorcem terminologii i rejestru. Nazwy siedmiu wielkości, nazwy
 * stref i zastrzeżenia stoją w słowniku wspólnym (docs/shared/i18n/hi.js) i to
 * TAMTE brzmienia obowiązują także tutaj — bez wyjątku:
 *   नीला अंश (udział niebieskiego), दृश्य की चमक (jasność sceny),
 *   वर्ण ताप (temperatura barwowa), दैनिक लय पर असर (wpływ na rytm dobowy;
 *   w opisie: मेलेनोपिक अनुपात), झिलमिलाहट (migotanie), एकरूपता
 *   (równomierność), आँखों का आराम (komfort wzrokowy).
 * Strefy: सामान्य सीमा में / सावधान / गंभीर. Dalej: राशि (mierzona wielkość),
 * माप (pomiar), सीमा (próg), इतिहास (historia), सत्र (sesja), अंशांकन
 * (kalibracja), रीडिंग (pojedynczy odczyt), डैशबोर्ड (pulpit), मॉड्यूल (moduł).
 * Zdania o prywatności i zdanie o rozporządzeniu (UE) 2017/745 przetłumaczono
 * wiernie: bez skracania i bez zmiany mocy sformułowań.
 *
 * REJESTR: uprzejme „आप”, tryb rozkazujący na -एँ (करें, दबाएँ). Zdania kończy
 * danda (।); kropka zostaje wyłącznie w liczbach dziesiętnych i w adresach.
 * Klawisze i etykiety kafelków krótkie, teksty pomocy — pełnymi zdaniami.
 *
 * ZAPIS LICZB WE WZORACH: cyfry łacińskie i kropka dziesiętna („0.3320”), bo
 * tak formatuje `Intl.NumberFormat('hi')` (numberingSystem: 'latn'). Liczby
 * wstawiane przez '{…}' formatuje warstwa językowa, nie ten plik.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js tego katalogu —
 * pilnuje tego docs/shared/i18n/keys.test.js. Klucza, którego nie ma
 * w angielskim, nie wolno tu dopisać: angielski jest wartością zapasową.
 */
window.I18nData = window.I18nData || {};
window.I18nData['hi'] = Object.assign(window.I18nData['hi'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. Dewanagari nie
     zna wielkich liter — napis jest tu taki sam jak nazwa aplikacji. */
  'app.wordmark': 'प्रकाश मॉनिटर',

  'state.idle': 'तैयार',
  'state.starting': 'शुरू हो रहा है',
  'state.running': 'माप जारी',
  'state.runningTpl': 'माप जारी {time}',
  'state.stopped': 'रुका हुआ',
  'state.error': 'कैमरा त्रुटि',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5.0 po hindi, 5,0 po polsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'माप शुरू करें',
  'keys.starting': 'शुरू हो रहा है…',
  'keys.stop': 'रोकें',
  'keys.flip': 'पलटें',
  'keys.flipAria': 'कैमरा बदलें — अगला या पिछला',
  'keys.menu': 'मेन्यू',
  'keys.menuAria': 'मॉड्यूल की सूची',
  'keys.back': '‹ वापस',
  'keys.backAria': 'डैशबोर्ड पर वापस',
  'keys.dash': 'डैशबोर्ड',
  'keys.zoom': 'प्रीव्यू बड़ा करें',
  'keys.retry': 'फिर कोशिश करें',
  'keys.refresh': 'ताज़ा करें',
  'keys.close': 'बंद करें',
  'keys.show': 'दिखाएँ',
  'keys.apply': 'लागू करें',
  'keys.remove': 'हटाएँ',

  'monitor.legend': 'नियंत्रण प्रीव्यू',
  'monitor.badge': 'लाइव',

  'aim.title': 'निशाना',
  'aim.hint': 'यह फ़्रेम ठीक तस्वीर का वही हिस्सा दिखाता है जिसे ऐप मापता है।',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'मुख्य चैनल',
  'readout.thresholdTpl': '(सीमा {value})',
  'readout.contextTpl': 'न्यूनतम {min} · औसत {avg} · अधिकतम {max} — पिछले 60 सेकंड',
  'readout.contextEmpty': 'पिछले 60 सेकंड का कोई डेटा नहीं',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'इसका क्या मतलब है: {name}',
  'aria.channel': '{name}, {value}, {zone}। बड़े डिस्प्ले पर दिखाएँ।',
  'aria.channelStale': '{name}, डेटा नहीं। बड़े डिस्प्ले पर दिखाएँ।',
  'aria.scale': 'पैमाना: {name}, {min} से {max} तक। अभी {value}, {zone}। सावधानी की सीमा {warn}, गंभीर सीमा {crit}।',
  'aria.readout': '{name}: {value}, {zone}।',
  'aria.readoutApprox': '{name}: लगभग {value}, {zone}। यह अनुमानित मान है।',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'मुख्य चैनल का पैमाना। डेटा नहीं',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': '“माप शुरू करें” दबाएँ, फ़ोन को किसी रोशन सतह की ओर करें और कुछ सेकंड स्थिर रखें।',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'आँखों का आराम कम है। मॉड्यूल 01 में देखें कि उसे क्या घटाता है।',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'स्क्रीन के नीचे लगे “माप शुरू करें” बटन से शुरुआत करें। कैमरा तभी चालू होता है जब आप उसे दबाते हैं।',
  'transient.measureStopped': 'माप पूरी हुई · {time} · इतिहास में सहेज लिया गया।',
  'transient.newVersion': 'ऐप का नया संस्करण उपलब्ध है।',
  'transient.thresholdsSaved': 'सीमाएँ सहेज ली गईं।',
  'transient.thresholdsRejected': 'सहेजा नहीं गया — सावधानी की सीमा और गंभीर सीमा एक-दूसरे को पार नहीं कर सकतीं।',
  'transient.historyCleared': 'इतिहास मिटा दिया गया।',

  'live.lead': 'मुख्य चैनल: {name}, {value}, {zone}।',
  'live.ready': 'आकलन तैयार। {name} {value}, {zone}।',
  'live.started': 'माप शुरू हुई।',
  'livebar.stopped': 'माप रुक गई',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'अभी एक भी रिकॉर्ड नहीं है। इतिहास माप के दौरान लिखा जाता है — एक मिनट माप चलाएँ और यहाँ लौटें।',
  'empty.recorderNoRange': 'इस अवधि में कोई माप नहीं हुई।',
  'empty.coverageTpl': 'माप ने {total} में से {done} घंटे कवर किए।',
  'empty.reportsNoData': 'दैनिक रिपोर्ट माप वाले पहले पूरे दिन के बाद बनेगी।',
  'empty.compareOneSession': 'तुलना के लिए दो पूरे हुए सत्र चाहिए। अभी आपके पास एक है।',
  'empty.exportNoData': 'एक्सपोर्ट करने को कुछ नहीं है। माप शुरू करें, ताकि इतिहास में कुछ आ जाए।',
  'empty.alertsOff': 'अलर्ट बंद हैं। चालू करने पर भी वे तभी काम करेंगे जब ऐप खुला हो।',
  'empty.scheduleEmpty': 'कोई समय तय नहीं किया गया। समय-सारणी सिर्फ़ खुले ऐप में चलती है।',
  'empty.historyEmpty': 'इतिहास ख़ाली है।',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'मॉड्यूल की सूची',

  'modules.01.title': 'रिकॉर्डर',
  'modules.01.desc': 'समय के साथ माप का चलन — एक मिनट से तीस दिन तक।',
  'modules.02.title': 'सीमाएँ',
  'modules.02.desc': 'हर राशि के लिए चेतावनी और अलार्म की अपनी सीमाएँ तय करें।',
  'modules.03.title': 'अंशांकन',
  'modules.03.desc': 'किसी ज्ञात प्रकाश स्रोत से मिलान — और वह जो अंशांकन ठीक नहीं करेगा।',
  'modules.04.title': 'रिपोर्ट',
  'modules.04.desc': 'दैनिक और साप्ताहिक ब्यौरा, छपाई की तरह सजाया हुआ।',
  'modules.05.title': 'एक्सपोर्ट',
  'modules.05.desc': 'रीडिंग को CSV या JSON फ़ाइल में सहेजना, कॉलमों के विवरण के साथ।',
  'modules.06.title': 'तुलना',
  'modules.06.desc': 'दो सत्र आमने-सामने, अंतर संख्या में दिया हुआ।',
  'modules.07.title': 'स्क्रीन जाँच',
  'modules.07.desc': 'अपने मॉनिटर को क़दम-दर-क़दम जाँचने के लिए परीक्षण चित्र।',
  'modules.08.title': 'समय-सारणी',
  'modules.08.desc': 'आपके तय किए समय पर माप।',
  'modules.09.title': 'अलर्ट',
  'modules.09.desc': 'सीमा पार होने पर सूचना — और वह कब काम नहीं करेगी।',
  'modules.10.title': 'सहयोग',
  'modules.10.desc': 'ऐप पूरी तरह मुफ़्त है। यहाँ आप लेखक को एक कॉफ़ी पिला सकते हैं।',
  'modules.11.title': 'दस्तावेज़ीकरण',
  'modules.11.desc': 'यह माप क्या है, और निश्चित रूप से क्या नहीं है।',
  'modules.12.title': 'सेटिंग',
  'modules.12.desc': 'थीम, टेक्स्ट का आकार, कम हलचल, इतिहास मिटाना।',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'माप के चैनल',
  'channels.pick': 'बड़े डिस्प्ले पर दिखाएँ',
  'channels.stale': 'डेटा नहीं',
  'channels.approx': 'अनुमानित मान',

  'help.unit': 'इकाई',
  'help.range': 'दायरा',
  'help.thresholds': 'सीमाएँ',
  'help.warn': 'सावधानी की सीमा',
  'help.crit': 'गंभीर सीमा',
  'help.now': 'अभी',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „राशि” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'राशि',
  'col.unit': 'इकाई',
  'col.range': 'दायरा',
  'col.direction': 'दिशा',
  'col.time': 'समय',
  'col.date': 'तारीख़',
  'col.zone': 'ज़ोन',
  'col.avg': 'औसत',
  'col.min': 'न्यूनतम',
  'col.max': 'अधिकतम',
  'col.name': 'कॉलम',
  'col.meaning': 'इसमें क्या है',
  'col.channel': 'चैनल',
  'col.gain': 'गुणक',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'समय की अवधि',
  'recorder.range.60s': '60 से.',
  'recorder.range.15min': '15 मि.',
  'recorder.range.1h': '1 घं.',
  'recorder.range.24h': '24 घं.',
  'recorder.range.30d': '30 दिन',
  'recorder.gap': 'माप नहीं',
  'recorder.sessionTitle': 'सत्र के आँकड़े',
  'recorder.zonesCaption': 'नीले अंश के लिए ज़ोन का बँटवारा',
  'recorder.tableCaption': 'चुनी हुई अवधि की रीडिंग',
  'recorder.crosshair': 'रीडिंग का क्रॉसहेयर',
  'recorder.prevAria': 'पिछला बिंदु',
  'recorder.nextAria': 'अगला बिंदु',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'रूप-रंग',
  'settings.themeLabel': 'थीम',
  'settings.themeSystem': 'सिस्टम के अनुसार',
  'settings.themeLight': 'हल्की',
  'settings.themeDark': 'गहरी',
  'settings.themeHint': '“सिस्टम के अनुसार” थीम आपके फ़ोन की सेटिंग के साथ बदलती है।',
  'settings.textLabel': 'टेक्स्ट का आकार',
  /* Mnożnik jako LICZBA we wstawce — 1.15 po hindi, 1,15 po polsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'यह पूरा इंटरफ़ेस बड़ा करता है, सिर्फ़ अक्षर नहीं — बटन और पंक्तियाँ भी टेक्स्ट के साथ बढ़ती हैं।',
  'settings.motionGroup': 'हलचल',
  'settings.motionLabel': 'कम हलचल',
  'settings.motionHint': 'यह सभी ट्रांज़िशन बंद कर देता है। पैमाने की सुई तब सरकने के बजाय सेकंड में एक बार छलाँग लगाती है।',
  'settings.dataTitle': 'डेटा',
  'settings.clearLabel': 'इतिहास मिटाएँ',
  'settings.clearHintTpl': 'इतिहास में अभी {count} सहेजे हुए बिंदु हैं।',
  'settings.clearHintEmpty': 'इतिहास ख़ाली है।',
  'settings.clearTitle': 'इतिहास मिटाएँ?',
  'settings.clearConfirm': 'माप का पूरा इतिहास मिटाएँ? इसे वापस नहीं लाया जा सकता।',
  'settings.clearKey': 'मिटाएँ',
  'settings.aboutTitle': 'ऐप के बारे में',
  'settings.versionTpl': '{app}, संस्करण {version}।',
  'settings.offlineText': 'ऐप बिना नेटवर्क के चलता है। पहली बार खोलने के बाद उसकी सारी फ़ाइलें ब्राउज़र के स्टोरेज में रहती हैं, इसलिए हवाई जहाज़ मोड से कुछ नहीं बदलता। किसी भी सर्वर पर कुछ नहीं भेजा जाता, क्योंकि ऐप कोई नेटवर्क अनुरोध करता ही नहीं।',
  'settings.docsKey': 'दस्तावेज़ीकरण खोलें',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'रद्द करें',
  'common.save': 'सहेजें',
  'common.reset': 'डिफ़ॉल्ट लौटाएँ',
  'common.yes': 'हाँ',
  'common.no': 'नहीं',
  'common.on': 'चालू',
  'common.off': 'बंद',
  'common.sep': ' · ',
  'common.stepsTitle': 'क़दम-दर-क़दम',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'अपनी सीमाएँ किसलिए',
  'modules.02.intro': 'सीमा तय करती है कि ऐप कब “सावधान” कहे और कब “गंभीर”। डिफ़ॉल्ट मान हमारा संपादकीय आकलन हैं, कोई मानक नहीं — अगर आप दूसरी परिस्थितियों में मापते हैं, तो उन्हें अपने हिसाब से खिसका लें। डैशबोर्ड पर आकलन और उसका वाक्य नई सीमाओं से तुरंत गिने जाते हैं।',
  'modules.02.orderNormal': 'सावधानी की सीमा गंभीर सीमा से नीचे होनी चाहिए।',
  'modules.02.orderInvert': 'यहाँ ऊँचा मान बेहतर है, इसलिए सावधानी की सीमा गंभीर सीमा से ऊपर रहती है।',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'पैमाने का प्रीव्यू: {name}',
  'modules.02.nowTpl': 'अभी {value}',
  'modules.02.resetDone': 'डिफ़ॉल्ट सीमाएँ लौटा दी गईं।',
  'modules.02.profilesTitle': 'प्रोफ़ाइल',
  'modules.02.profilesHint': 'प्रोफ़ाइल सातों राशियों की सीमाओं का सहेजा हुआ समूह है। प्रोफ़ाइल लागू करने पर वे सब एक साथ बदल जाती हैं।',
  'modules.02.profileSaveKey': 'मौजूदा सीमाएँ सहेजें',
  'modules.02.profileNameLabel': 'नई प्रोफ़ाइल का नाम',
  'modules.02.profileNameHint': 'नाम इसी डिवाइस पर रहता है। ज़्यादा से ज़्यादा 40 अक्षर।',
  'modules.02.profileNameEmpty': 'प्रोफ़ाइल का नाम दें।',
  'modules.02.profileSavedTpl': '“{name}” प्रोफ़ाइल सहेज ली गई।',
  'modules.02.profileAppliedTpl': '“{name}” प्रोफ़ाइल लागू कर दी गई।',
  'modules.02.profileRemovedTpl': '“{name}” प्रोफ़ाइल हटा दी गई।',
  'modules.02.profileFailed': 'यह प्रोफ़ाइल लागू नहीं की जा सकी।',
  'modules.02.profileCustomTpl': 'आपकी अपनी प्रोफ़ाइल, {date} को सहेजी गई।',
  'modules.02.builtin.default.name': 'डिफ़ॉल्ट',
  'modules.02.builtin.default.desc': 'राशियों की सूची से ली गई सीमाएँ — हर माप का शुरुआती बिंदु।',
  'modules.02.builtin.evening.name': 'शाम — नरम',
  'modules.02.builtin.evening.desc': 'ठंडे रंग और दैनिक लय पर असर की चेतावनी पहले देती है।',
  'modules.02.builtin.work.name': 'मेज़ पर काम',
  'modules.02.builtin.work.desc': 'चमकीली, ठंडी दिन की रोशनी चलने देती है; झिलमिलाहट और एकरूपता पर नज़र रखती है।',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'यह क्यों काम करता है',
  'modules.03.why': 'कैमरे के सेंसर में चैनलों के बीच एक स्थायी झुकाव होता है। सफ़ेद काग़ज़ की शीट मापने से पता चलता है कि वह झुकाव कितना बड़ा है, और उसे घटाया जा सकता है। इस ऐप में यही एक सुविधा है जो सचमुच सटीकता बढ़ाती है — और तब भी वह कैमरे को स्पेक्ट्रोमीटर नहीं बना देती।',
  'modules.03.steps.1': 'जिस रोशनी को मापना है, उसके नीचे सफ़ेद काग़ज़ की शीट रखें।',
  'modules.03.steps.2': 'डैशबोर्ड पर “माप शुरू करें” दबाएँ और पूरे फ़्रेम में काग़ज़ भर दें।',
  'modules.03.steps.3': 'यहाँ लौटें, “अंशांकन करें” दबाएँ और तीन सेकंड तक फ़ोन को हिलाएँ नहीं।',
  'modules.03.runKey': 'अंशांकन करें (3 से.)',
  'modules.03.clearKey': 'अंशांकन हटाएँ',
  'modules.03.busyTpl': 'काग़ज़ माप रहे हैं… {sec} से. बाक़ी',
  'modules.03.statusNone': 'अंशांकन नहीं हुआ। माप चलती है, मानों को तुलनात्मक रूप में लें।',
  'modules.03.statusOnTpl': '{date} को {time} बजे अंशांकित किया गया।',
  'modules.03.gainsTitle': 'चैनलों के गुणक',
  'modules.03.gainR': 'लाल',
  'modules.03.gainG': 'हरा',
  'modules.03.gainB': 'नीला',
  'modules.03.gainsNone': 'सेट नहीं',
  'modules.03.needRunning': 'पहले माप शुरू करें और कैमरा सफ़ेद काग़ज़ की ओर करें।',
  'modules.03.tooFew': 'नमूने बहुत कम हैं। जाँचें कि माप सचमुच चल रही है।',
  'modules.03.tooDark': 'तस्वीर अंशांकन के लिए बहुत गहरी है। काग़ज़ पर ज़्यादा रोशनी डालें और फिर कोशिश करें।',
  'modules.03.refused': 'चैनलों का झुकाव इतना बड़ा है कि उसे अंशांकन नहीं माना जा सकता। समान रोशनी में सफ़ेद काग़ज़ का इस्तेमाल करें।',
  'modules.03.done': 'अंशांकन हो गया। वर्ण ताप और दैनिक लय पर असर अब ज़्यादा सटीक होंगे।',
  'modules.03.cleared': 'अंशांकन हटा दिया गया।',
  'modules.03.limitsTitle': 'अंशांकन क्या ठीक नहीं करता',
  'modules.03.limits.1': 'अंशांकन कैमरे के तीन चैनलों को बराबर करता है, इससे आगे कुछ नहीं। वह कैमरे को स्पेक्ट्रम नहीं देता, इसलिए वर्ण ताप और दैनिक लय पर असर sRGB प्राथमिक रंगों से निकाले गए अनुमान ही रहते हैं।',
  'modules.03.limits.2': 'वह दृश्य की चमक को निरपेक्ष राशि नहीं बना देता — वह संख्या सापेक्ष ही रहती है। वह स्वचालित एक्सपोज़र या श्वेत संतुलन को भी बंद नहीं करता, जो नीचे से रीडिंग खिसकाते रहते हैं।',
  'modules.03.limits.3': 'वह दूसरी रोशनी पर लागू नहीं होता: एक बल्ब के नीचे किया गया अंशांकन उसी बल्ब का वर्णन करता है। स्रोत बदले तो उसे दोहराएँ। और वह इस बात में कुछ नहीं बदलता कि यह माप क्या नहीं है — यह अब भी न कोई जाँच है और न किसी रोग की पहचान का आधार।',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'रिपोर्ट की अवधि',
  'modules.04.rangeDay': 'दिन',
  'modules.04.rangeWeek': 'सप्ताह',
  'modules.04.headTpl': '{from} से {to} तक · इतिहास के {count} बिंदु।',
  'modules.04.tableTitle': 'ब्यौरा',
  'modules.04.tableCaption': 'चुनी हुई अवधि में औसत, न्यूनतम और अधिकतम',
  'modules.04.panoramaTitle': 'पैनोरमा',
  'modules.04.panoramaAriaTpl': 'पैनोरमा: {name}, {span}।',
  'modules.04.panoramaSpanDay': 'पिछले 24 घंटे, घंटे-दर-घंटे',
  'modules.04.panoramaSpanWeek': 'पिछला सप्ताह, दिन-दर-दिन',
  'modules.04.panoramaHint': 'पट्टी की ऊँचाई और रंग एक ही बात कहते हैं: सामान्य सीमा में — नीची, सावधान — बीच की, गंभीर — पूरी। तल पर खिंची लकीर बिना माप वाला घंटा दिखाती है।',
  'modules.04.coverageDayTpl': 'माप ने {total} में से {done} घंटे कवर किए।',
  'modules.04.coverageWeekTpl': 'माप ने {total} में से {done} दिन कवर किए।',
  'modules.04.zonesTitle': 'ज़ोन का बँटवारा',
  'modules.04.zonesCaptionTpl': 'मुख्य चैनल के लिए गिना गया: {name}।',
  'modules.04.worstTpl': 'सबसे कठिन समय: {value}।',
  'modules.04.worstNone': 'कोई साफ़ नहीं',
  'modules.04.worstHourTpl': '{hour} बजे',
  'modules.04.adviceTitle': 'इसका क्या करें',
  'modules.04.adviceMelanopicTpl': 'दैनिक लय पर औसत असर {value}× रहा। शाम को 0.50 से नीचे जाना बेहतर है — सबसे आसानी से गर्म बल्ब या नाइट मोड से।',
  'modules.04.adviceKelvinTpl': 'रोशनी ठंडी थी (औसतन {value} K)। काम के लिए यह ठीक है; सोने से दो घंटे पहले 3000 K से नीचे नरम रहता है।',
  'modules.04.adviceFlickerTpl': 'साफ़ दिखने लायक़ झिलमिलाहट है (औसतन {value}%)। इसके पीछे आम तौर पर सस्ता डिमर या बैकलाइट का बिजली-स्रोत होता है।',
  'modules.04.adviceUniformityTpl': 'रोशनी असमान रूप से फैली है ({value}%)। लैंप खिसकाना या उसका कोण बदलना आम तौर पर बल्ब बदलने से ज़्यादा काम आता है।',
  'modules.04.adviceWorstTpl': 'सीमाओं के बाहर की ज़्यादातर रीडिंग {hour} बजे इकट्ठी होती हैं।',
  'modules.04.adviceNone': 'इस अवधि में आपकी तय की गई सीमाओं से बाहर कुछ भी नहीं निकलता।',
  'modules.04.limitsTitle': 'यह स्वास्थ्य सलाह नहीं है',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'ये निष्कर्ष सिर्फ़ उसी से निकले हैं जो इस फ़ोन के कैमरे ने देखा। ऐप स्पेक्ट्रम नहीं मापता और कोई निदान नहीं करता।',
  'modules.04.printHint': 'यह पेज छपाई की तरह सजाया गया है: तालिका और शीर्षक काग़ज़ पर, सिस्टम के आवर्धक में और स्क्रीन रीडर में एक जैसे पढ़े जाते हैं।',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'डेटा की अवधि',
  'modules.05.range1h': 'घंटा',
  'modules.05.range24h': 'दिन',
  'modules.05.range7d': '7 दिन',
  'modules.05.range30d': '30 दिन',
  'modules.05.csvKey': 'CSV फ़ाइल सहेजें',
  'modules.05.jsonKey': 'JSON फ़ाइल सहेजें',
  'modules.05.formatTitle': 'फ़ाइल का प्रारूप',
  'modules.05.formatCsv': 'CSV: कॉलम सेमीकोलन से अलग होते हैं, दशमलव चिह्न अल्पविराम है, एन्कोडिंग BOM चिह्न के साथ UTF-8 है। जिस Excel में दशमलव चिह्न अल्पविराम है, वह ऐसी फ़ाइल बिना कुछ सेट किए खोल देता है।',
  'modules.05.formatJson': 'JSON: वही डेटा “points” फ़ील्ड में, दशमलव बिंदु और मिलीसेकंड में समय-चिह्न के साथ — प्रारूप की यही माँग है।',
  'modules.05.resolution': 'इतिहास हर 5 सेकंड में एक बिंदु सहेजता है और 30 दिन पीछे तक जाता है। सेकंड में पाँच नमूनों वाला पूरा विभेदन फ़ाइल में नहीं होता — इंजन उसे सिर्फ़ एक मिनट तक रखता है।',
  'modules.05.offline': 'फ़ाइल डिवाइस पर बनती है और डिवाइस पर ही रहती है। एक्सपोर्ट किसी नेटवर्क से नहीं जुड़ता।',
  'modules.05.columnsTitle': 'कॉलमों का विवरण',
  'modules.05.columnsCaption': 'फ़ाइल के कॉलम और उनका मतलब',
  'modules.05.descDate': 'डिवाइस की घड़ी से लिया गया बिंदु का दिनांक, दिन-महीना-वर्ष के क्रम में।',
  'modules.05.descTime': 'बिंदु का समय, सेकंड तक।',
  'modules.05.descZone': 'सहेजे जाने के समय नीले अंश का ज़ोन। इंजन ज़ोन सिर्फ़ इसी एक राशि के लिए सहेजता है — बाक़ी के लिए उसे सीमाओं से ख़ुद निकालें।',
  'modules.05.descMetricTpl': '{short} इकाई: {unit}। दायरा {min}–{max}।',
  'modules.05.previewTitle': 'प्रीव्यू',
  'modules.05.previewHint': 'फ़ाइल की पहली पाँच पंक्तियाँ, ठीक वैसी जैसी सहेजी जाएँगी।',
  'modules.05.savedTpl': '{name} फ़ाइल सहेज ली गई — {rows} पंक्तियाँ।',
  'modules.05.failed': 'इस ब्राउज़र ने फ़ाइल सहेजने नहीं दी।',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'ऐप हर पूरे हुए माप-सत्र को इसी डिवाइस पर सहेजता है। दो चुनें, ताकि उन्हें एक ही पट्टी पर देखा जा सके और अंतर संख्या में पढ़ा जा सके।',
  'modules.06.noSessions': 'अभी कोई पूरा हुआ सत्र नहीं है। माप शुरू करें, उसे रोकें और यहाँ लौटें।',
  'modules.06.slotA': 'सत्र A',
  'modules.06.slotB': 'सत्र B',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'पट्टी',
  'modules.06.tapeAriaTpl': 'सत्र {slot} का चलन, राशि {name}।',
  'modules.06.tapeHint': 'दोनों सत्र एक ही चौड़ाई तक खींचे गए हैं: एक पट्टी अवधि का एक ही हिस्सा है, घड़ी का एक ही समय नहीं। ऊँचाई और रंग वही कहते हैं जो डैशबोर्ड पर।',
  'modules.06.tapeChannelTpl': 'पट्टी मुख्य चैनल दिखाती है: {name}।',
  'modules.06.diffTitle': 'अंतर',
  'modules.06.diffCaption': 'दोनों सत्रों के औसत और उनके बीच का अंतर',
  'modules.06.clearKey': 'सहेजे हुए सत्र हटाएँ',
  'modules.06.cleared': 'सहेजे हुए सत्र हटा दिए गए।',
  'modules.06.savedTpl': 'सत्र सहेज लिया गया: {dur}।',
  'modules.06.limitsTitle': 'यह तुलना क्या नहीं बताती',
  'modules.06.limits': 'आप दो माप की तुलना कर रहे हैं, दो प्रकाश स्रोतों की नहीं। अगर सत्रों के बीच फ़्रेम, दूरी, दिन का समय या फ़ोन की स्थिति बदल गई, तो अंतर उसके बारे में भी है। सबसे ईमानदार तुलना वही दृश्य है — रोशनी बदलने से पहले और बाद में।',
  'modules.06.keepTpl': 'ज़्यादा से ज़्यादा पिछले {count} सत्र याद रखे जाते हैं।',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'परीक्षण चित्र इसी डिवाइस की पूरी स्क्रीन पर दिखते हैं। वे स्क्रीन को अपनी आँखों से देखने के लिए हैं: सफ़ेद एक-सा है या नहीं, धूसर रंगों में कोई झलक तो नहीं आ रही, और बैकलाइट कोनों से रिस तो नहीं रही।',
  'modules.07.steps.1': 'स्क्रीन की चमक उतनी रखें जितनी पर आप आम तौर पर काम करते हैं, और सिस्टम का नाइट मोड बंद कर दें।',
  'modules.07.steps.2': 'नीचे दी सूची से एक चित्र चुनें। वह पूरी स्क्रीन भर देगा।',
  'modules.07.steps.3': 'लगभग साठ सेंटीमीटर की दूरी से, स्क्रीन के ठीक सामने से देखें। फिर उसी चित्र को किसी कोण से देखें।',
  'modules.07.steps.4': '“चित्र बंद करें” बटन या Escape कुंजी से बाहर निकलें और अगले पर जाएँ।',
  'modules.07.planesTitle': 'चित्र',
  'modules.07.exitKey': 'चित्र बंद करें',
  'modules.07.showAriaTpl': 'चित्र दिखाएँ: {name}',
  'modules.07.planeAriaTpl': 'परीक्षण चित्र: {name}। बंद करने का बटन स्क्रीन के नीचे है।',
  'modules.07.plane.white.name': 'सफ़ेद',
  'modules.07.plane.white.hint': 'धब्बे, रंग की झलक और किनारों के पास ज़्यादा चमकीले हिस्से खोजें। सफ़ेद पूरी सतह पर एक ही रंग होना चाहिए।',
  'modules.07.plane.gray75.name': 'धूसर 75%',
  'modules.07.plane.gray75.hint': 'धूसर धूसर ही दिखना चाहिए। हरी या गुलाबी झलक का मतलब है कि स्क्रीन का श्वेत संतुलन खिसक गया है।',
  'modules.07.plane.gray50.name': 'धूसर 50%',
  'modules.07.plane.gray50.hint': 'रंग की झलक परखने के लिए सबसे अच्छा चित्र। बीच की तुलना कोनों से करें।',
  'modules.07.plane.gray25.name': 'धूसर 25%',
  'modules.07.plane.gray25.hint': 'गहरा धूसर बैकलाइट का रिसाव और सस्ते पैनलों की धारियाँ दिखाता है।',
  'modules.07.plane.black.name': 'काला',
  'modules.07.plane.black.hint': 'अँधेरे कमरे में यहाँ बैकलाइट का हर रिसाव और हर चमकीला कोना दिख जाता है।',
  'modules.07.plane.red.name': 'शुद्ध लाल',
  'modules.07.plane.red.hint': 'एक-सा लाल मरे हुए सबपिक्सल और पैनल की असमानता उजागर करता है।',
  'modules.07.plane.green.name': 'शुद्ध हरा',
  'modules.07.plane.green.hint': 'हरा सबसे ज़्यादा चमक लाता है — ख़राब पिक्सल उसी पर सबसे आसानी से दिखता है।',
  'modules.07.plane.blue.name': 'शुद्ध नीला',
  'modules.07.plane.blue.hint': 'स्क्रीन की सतह पर लगी धूल और धारियाँ नीला सफ़ेद से बेहतर दिखाता है।',
  'modules.07.plane.grid.name': 'जाली',
  'modules.07.plane.grid.hint': 'रेखाएँ कोनों में उतनी ही साफ़ होनी चाहिए जितनी बीच में। किनारों पर धुँधलापन तस्वीर के स्केलिंग की बात है।',
  'modules.07.warn': 'चित्र पूरी स्क्रीन ढक लेता है, माप के बटन वाला नियंत्रण डैशबोर्ड भी। ऐप में यही एक जगह है जहाँ ऐसा होता है, और इसीलिए बाहर निकलने का बटन बड़ा है और हमेशा दिखता है। जब तक चित्र स्क्रीन पर है, माप चलती रहती है और उसे रोका नहीं जा सकता — बटनों पर लौटने के लिए चित्र बंद करें।',
  'modules.07.cameraTitle': 'यहाँ आप क्या नहीं कर सकते',
  'modules.07.camera': 'फ़ोन अपनी ही स्क्रीन नहीं देखता, इसलिए इन चित्रों को उसी डिवाइस से नहीं मापा जा सकता। मॉनिटर मापने के लिए चित्र मॉनिटर पर दिखाएँ और माप फ़ोन से करें — ये दो अलग डिवाइस हैं और दो अलग भूमिकाएँ।',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'समय-सारणी तय समय पर माप की याद दिलाती है। वह कैमरा ख़ुद चालू नहीं करती: तय घंटे पर वह एक याद-दिलावा दिखाती है, और माप आप डैशबोर्ड पर “माप शुरू करें” बटन से शुरू करते हैं। ठीक वैसे ही जैसे पहली बार।',
  'modules.08.onlyOpenTitle': 'यह कब काम नहीं करेगी',
  'modules.08.onlyOpen': 'समय-सारणी सिर्फ़ खुले ऐप में चलती है। बंद ब्राउज़र टैब समय नहीं गिनता और किसी बात की याद नहीं दिलाएगा। हम सिस्टम की सूचनाओं की अनुमति नहीं माँगते और नेटवर्क पर कुछ नहीं भेजते।',
  'modules.08.enableLabel': 'याद-दिलावे चालू करें',
  'modules.08.timesTitle': 'समय',
  'modules.08.timeAriaTpl': 'समय {n}: याद-दिलावे का घंटा',
  'modules.08.addKey': 'समय जोड़ें',
  'modules.08.removeAriaTpl': '{time} का समय हटाएँ',
  'modules.08.addedTpl': '{time} का समय जोड़ा गया।',
  'modules.08.removedTpl': '{time} का समय हटाया गया।',
  'modules.08.badTime': 'समय 22:00 के प्रारूप में दें।',
  'modules.08.nextTpl': 'अगला याद-दिलावा: {time}।',
  'modules.08.nextNone': 'याद-दिलावे बंद हैं।',
  'modules.08.dueTpl': 'माप का तय समय: {time}।',
  'modules.08.dueKey': 'डैशबोर्ड दिखाएँ',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'अलर्ट एक राशि पर नज़र रखता है और तभी बोलता है जब वह राशि चुने हुए ज़ोन में बिना रुके आपके तय किए समय तक टिकी रहे। वह माप कभी नहीं रोकता और बटनों को कभी नहीं ढकता।',
  'modules.09.enableLabel': 'अलर्ट चालू करें',
  'modules.09.metricLabel': 'किस राशि पर नज़र',
  'modules.09.levelLabel': 'किस ज़ोन से',
  'modules.09.levelWarning': 'सावधान से ऊपर',
  'modules.09.levelCritical': 'सिर्फ़ गंभीर',
  'modules.09.sustainLabel': 'कितने सेकंड बिना रुके',
  'modules.09.sustainHint': 'कम समय रखने पर फ़ोन हिलाते ही झूठे अलार्म ज़्यादा आते हैं। हम पाँच सेकंड से नीचे नहीं जाते।',
  'modules.09.soundLabel': 'छोटी-सी बीप',
  'modules.09.soundHint': 'आवाज़ डिवाइस पर ही बनती है। नेटवर्क से कुछ नहीं उतारा जाता।',
  'modules.09.cooldownHint': 'दो मिनट में ज़्यादा से ज़्यादा एक अलर्ट। हर नमूने पर दोहराया जाने वाला अलार्म वह अलार्म है जिसे हमेशा के लिए बंद कर दिया जाता है।',
  'modules.09.whenNotTitle': 'अलर्ट कब काम नहीं करेगा',
  'modules.09.whenNot': 'सूचना ऐप के भीतर है, सिस्टम में नहीं। वह तब काम नहीं करेगी जब ऐप बंद हो या पीछे छिपा हो, जब कोई माप न चल रही हो, और जब जिस राशि पर नज़र है उसे उस समय मापा न जा सके। हम सिस्टम की सूचनाओं की अनुमति नहीं माँगते।',
  'modules.09.firedTpl': '{name}: {zone} {sec} से. से — अभी {value}।',
  'modules.09.saved': 'अलर्ट की सेटिंग सहेज ली गई।',
  'modules.09.statusOnTpl': 'नज़र में: {name}, {level}, {sec} से. बाद।',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'यह ऐप मुफ़्त है',
  'support.freeText': 'सातों राशियाँ पहली बार खोलने से ही संख्याएँ दिखाती हैं। रिकॉर्डर, सीमाएँ, अंशांकन, रिपोर्ट, एक्सपोर्ट, सत्रों की तुलना और तीस दिन का पूरा इतिहास बिना खाते, बिना शुल्क और बिना किसी हद के चलते हैं — ऑफ़लाइन भी वैसे ही। यहाँ कुछ भी बाद के लिए शुल्क के पीछे नहीं रखा गया।',
  'support.whyTitle': 'मैं यह क्यों माँग रहा हूँ',
  'support.whyText': 'प्रकाश मॉनिटर मैं अकेला बनाता और सँभालता हूँ, काम के बाद बचे घंटों में। सहयोग उस समय में जाता है जो सुधारों में, और फ़ोनों पर जाँच में और मॉड्यूल की सूची के अगले औज़ारों में लगता है। अगर कोई कुछ न दे, तब भी कुछ बंद नहीं होगा।',
  'support.nothingTitle': 'दान से क्या मिलता है',
  'support.nothingText': 'कुछ नहीं। दान के बाद न कोई संख्या खुलती है, न कोई मॉड्यूल और न कोई सेटिंग, क्योंकि सब कुछ शुरू से खुला हुआ है। बस इतना बचता है कि मुझे पता चल जाता है कि यह किसी के काम आया।',
  'support.keyTitle': 'अगर आप मदद करना चाहें',
  'support.keyLabel': 'मुझे एक कॉफ़ी पिलाएँ',
  'support.keyAria': 'मुझे एक कॉफ़ी पिलाएँ — बाहरी पेज नए टैब में खोलता है',
  'support.serviceText': 'दान का प्रोफ़ाइल Buy Me a Coffee चलाता है, और इस ऐप में समर्थन का यही एकमात्र रूप है। ऐप उससे न कोई स्क्रिप्ट लोड करता है, न विजेट, न तस्वीर — यहाँ एक सादा लिंक खड़ा है और उसके सिवा कुछ नहीं।',
  'support.privacyText': 'इस बटन को दबाने पर एक बाहरी पेज नए टैब में खुलता है, और यही एकमात्र क्षण है जब कुछ इस डिवाइस से बाहर जाता है। माप, इतिहास और सेटिंग वहीं रहते हैं जहाँ थे — इसी ब्राउज़र के स्टोरेज में।',
  'support.privacyPendingText': 'जब पता उपलब्ध होगा, बटन दबाने पर एक बाहरी पेज नए टैब में खुलेगा और यही एकमात्र क्षण होगा जब कुछ इस डिवाइस से बाहर जाएगा। माप, इतिहास और सेटिंग वहीं रहते हैं जहाँ थे — इसी ब्राउज़र के स्टोरेज में।',
  'support.emptyTitle': 'प्रोफ़ाइल अभी जुड़ा नहीं है',
  'support.emptyText': 'दान के प्रोफ़ाइल का पता अभी दर्ज नहीं किया गया, इसलिए यहाँ ऐसा कोई बटन नहीं है जो कहीं न ले जाए। बाक़ी ऐप बिना बदलाव के चलता है — इस दान पर कुछ नहीं रुका है।',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'यह ऐप क्या नहीं मापता',
  'docs.notList.1': 'वह स्पेक्ट्रम नहीं मापता। कैमरे में तीन चौड़े रंग चैनल, स्वचालित एक्सपोज़र और स्वचालित श्वेत संतुलन होते हैं।',
  'docs.notList.2': 'वह निरपेक्ष मान नहीं मापता। दृश्य की चमक एक सापेक्ष संकेतक है, फ़ोटोमेट्रिक माप का परिणाम नहीं।',
  'docs.notList.3': 'वह वर्ण ताप सीधे नहीं मापता। वर्ण ताप और दैनिक लय पर असर sRGB प्राथमिक रंगों से निकाले गए अनुमान हैं।',
  'docs.notList.4': 'वह बिजली की लाइन की झिलमिलाहट नहीं देखता। 5 Hz पर नमूने लेने से केवल 2.5 Hz से नीचे का स्पंदन दिखता है — बिजली की लाइन का 100 Hz पहुँच से बाहर है और ऐप उसे कभी परिणाम के रूप में नहीं देगा।',
  'docs.notList.5': 'वह न निदान करता है और न स्वास्थ्य सलाह देता है। कोई भी परिणाम इनमें से कुछ नहीं है।',
  'docs.notList.6': 'वह आपकी रोशनी की तुलना किसी सरकारी मानक से नहीं करता। सीमाएँ ऐसी सेटिंग हैं जिन्हें आप मॉड्यूल 02 में बदल सकते हैं।',
  'docs.whatTitle': 'वह क्या मापता है और कैसे',
  'docs.whatLead': 'फ़ोन का कैमरा किसी रोशन सतह को देखता है, और ऐप सेकंड में पाँच बार फ़्रेम के बीच के हिस्से से R, G और B चैनलों के औसत गिनता है। इन तीन संख्याओं से वह सात संकेतक निकालता है।',
  'docs.whatCrop': 'यह हिस्सा फ़्रेम की चौड़ाई का बीच का 60% और ऊँचाई का 60% है — ठीक वही आयत जिसे निशाना स्क्रीन का चिह्न घेरता है। उसके बाहर कुछ नहीं गिना जाता।',
  'docs.whatRate': 'हर 200 ms में एक नमूना, यानी सेकंड में 5 बार। पिछला मिनट पूरे विभेदन में मेमोरी में रहता है; उससे पुराना सब कुछ हर 5 सेकंड में सहेजा जाता है और तीस दिन पीछे तक जाता है।',
  'docs.metricsTitle': 'सात राशियाँ',
  'docs.formulasTitle': 'सूत्र',
  'docs.formula.share.formula': 'नीला अंश = B / (R + G + B) × 100%',
  'docs.formula.share.text': 'sRGB मानों पर, गामा उलटे बिना गिना जाता है — जानबूझकर, क्योंकि यह ऐप के पिछले संस्करण वाली ही परिभाषा है और तब तय की गई सीमाएँ आज भी वही मतलब रखती हैं। यह रंग को चमक से अलग करता है।',
  'docs.formula.brightness.formula': 'चमक = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': 'दायरे के प्रतिशत में चैनलों का औसत मान। स्वचालित एक्सपोज़र इसे नीचे से खिसकाता रहता है, इसलिए यह एक सापेक्ष संकेतक है — दो दृश्यों की तुलना करें, अकेली संख्या को माप की तरह न पढ़ें।',
  'docs.formula.kelvin.title': 'वर्ण ताप — McCamy का सन्निकटन',
  'docs.formula.kelvin.formula': 'n = (x − 0.3320) / (y − 0.1858)\nCCT = −449 n³ + 3525 n² − 6823.3 n + 5520.33',
  'docs.formula.kelvin.text': 'पहले हम sRGB गामा उलटते हैं, फिर मैट्रिक्स से D65 श्वेत बिंदु के लिए CIE XYZ पर जाते हैं और वर्णता x, y गिनते हैं। McCamy का सूत्र लगभग 2000 K से 12500 K के बीच भरोसेमंद है। उस दायरे के बाहर घन बिगड़ जाता है, इसलिए परिणाम काट दिया जाता है और उसे अविश्वसनीय चिह्नित किया जाता है — तब पैमाने की आधार रेखा बिंदुदार हो जाती है और “विधि की सीमा से बाहर” वाक्य दिखता है।',
  'docs.formula.melanopic.title': 'दैनिक लय पर असर — मेलेनोपिक अनुपात',
  'docs.formula.melanopic.formula': 'mel = 0.0016 R + 0.3110 G + 0.8460 B\nY = 0.2127 R + 0.7152 G + 0.0722 B\nपरिणाम = (mel / Y) × तटस्थ सफ़ेद के लिए 1.00 पर सामान्यीकरण',
  'docs.formula.melanopic.text': 'तीनों चैनल रैखिक मानों में। असली राशि मेलेनोप्सिन की संवेदनशीलता वक्र के साथ स्पेक्ट्रम का समाकल है (शिखर लगभग 490 nm पर); कैमरे में तीन चौड़े चैनल होते हैं, इसलिए हम sRGB प्राथमिक रंगों को उनकी अनुमानित तरंगदैर्ध्य पर मेलेनोपिक संवेदनशीलता से भारित करते हैं (R 612 nm, G 549 nm, B 465 nm)। बदलाव की दिशा भरोसेमंद है, निरपेक्ष मान नहीं — इसीलिए इस संख्या के साथ “≈” चिह्न खड़ा रहता है।',
  'docs.formula.flicker.formula': 'झिलमिलाहट = (max − min) / (max + min) × 100%',
  'docs.formula.flicker.text': 'IES की परिभाषा, चमक के नमूनों की एक खिड़की से गिनी जाती है। आवृत्ति का अनुमान हम इससे लगाते हैं कि संकेत कितनी बार अपने औसत को पार करता है। 5 Hz पर नमूने लेने से केवल 2.5 Hz से नीचे का मॉड्युलेशन दिखता है (न्यक्विस्ट सीमा), और आवृत्ति को हम तभी भरोसेमंद मानते हैं जब वह 0.2 से 2 Hz के बीच हो और आयाम 0.5% से ऊपर — उस सीमा से नीचे औसत के पार जाना सेंसर का शोर है, स्रोत का स्पंदन नहीं।',
  'docs.formula.uniformity.formula': 'एकरूपता = सबसे गहरा ख़ाना / सबसे चमकीला ख़ाना × 100%',
  'docs.formula.uniformity.text': 'हम इस हिस्से को 3×3 जाली के नौ ख़ानों में बाँटते हैं और दोनों छोरों की तुलना करते हैं। 100% का मतलब है बिलकुल समान रूप से फैली रोशनी। स्क्रीन पर कम मान बैकलाइट के रिसाव या परावर्तन का संकेत है; मेज़ पर — ग़लत जगह रखे लैंप का। आँखों के आराम के साथ यही एक राशि है जिसमें ऊँचा मान बेहतर होता है।',
  'docs.formula.comfort.formula': '100 अंक, इनकी कटौती के साथ:\nदैनिक लय पर असर 0.75 से ऊपर — 35 अंक तक\nरंग 4000 K से ऊपर — 25 अंक तक\nझिलमिलाहट 5% से ऊपर — 25 अंक तक\nएकरूपता 60% से नीचे — 15 अंक तक',
  'docs.formula.comfort.text': 'छह संख्याओं की जगह एक आकलन। जिस राशि को मापा न जा सका, उसकी कोई कटौती नहीं होती — डेटा का न होना कभी अच्छे परिणाम का रूप नहीं धरता। भार हमारा संपादकीय आकलन हैं, कोई मानक नहीं; इसीलिए मॉड्यूल 01 उसके हिस्सों का बँटवारा दिखाता है, ताकि इस आकलन से असहमत हुआ जा सके।',
  'docs.rangesTitle': 'दायरे और सीमाएँ',
  'docs.rangesLead': 'नीचे दी गई सीमाएँ वही हैं जो इस समय लागू हैं — अगर आपने उन्हें मॉड्यूल 02 में बदला है, तो तालिका आपके मान दिखाती है, फ़ैक्टरी वाले नहीं।',
  'docs.dirNormal': 'नीचे का मतलब नरम',
  'docs.dirInvert': 'ऊपर का मतलब बेहतर',
  'docs.privacyTitle': 'डेटा और निजता',
  'docs.privacyText': 'कैमरे की तस्वीर न कहीं भेजी जाती है और न सहेजी जाती है — हर फ़्रेम से सिर्फ़ तीन संख्याएँ बचती हैं। माप, सीमाएँ और सेटिंग इसी डिवाइस पर ब्राउज़र के स्टोरेज में रहती हैं। ऐप कोई नेटवर्क अनुरोध नहीं करता और ऑफ़लाइन चलता है।',
  'docs.mdrTitle': 'अस्वीकरण',
  'docs.freeText': 'ऐप पूरी तरह मुफ़्त है और वैसा ही रहेगा: सातों राशियाँ, इतिहास, रिपोर्ट, एक्सपोर्ट और ऑफ़लाइन मोड बिना खाते, बिना शुल्क और बिना किसी हद के चलते हैं। जो धन्यवाद कहना चाहे, उसे मॉड्यूल 10 “सहयोग” मिलेगा।',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'ऐप अधूरा लोड हुआ',
  'boot.filesTpl': 'ये फ़ाइलें लोड नहीं हुईं: {list}।',
  'boot.modulesTpl': 'इन मॉड्यूलों ने हाज़िरी नहीं दी: {list} — ये प्रविष्टियाँ सूची से नहीं खुलेंगी।',
  'boot.modulesRangeTpl': 'मॉड्यूल {from}–{to}',
  'boot.tail': 'पेज फिर से लोड करें। अगर इससे मदद न मिले, तो सर्वर पर फ़ाइलें अधूरी हैं।',
  'boot.loss.bus': 'मॉड्यूल एक-दूसरे को देखना बंद कर देंगे और माप शुरू नहीं होगी',
  'boot.loss.metrics': 'कोई मान नहीं गिना जाएगा',
  'boot.loss.scaleCore': 'पैमाने की ज्यामिति और संख्याओं का प्रारूपण ग़ायब हो जाएगा',
  'boot.loss.scaleText': 'इंटरफ़ेस के सारे नाम ग़ायब हो जाएँगे',
  'boot.loss.shell': 'कोई भी मॉड्यूल नहीं खुलेगा',
  'boot.loss.engine': 'कैमरा और माप शुरू नहीं होंगे',
  'boot.loss.dash': 'डैशबोर्ड ख़ाली रह जाएगा'
});
