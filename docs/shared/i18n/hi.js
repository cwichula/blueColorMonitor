/* docs/shared/i18n/hi.js — słownik WSPÓLNY, hindi.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest hindi.
 *
 * SKĄD TE ZDANIA: przekład z polskiej redakcji pierwotnej (pl.js), z angielskim
 * (en.js) jako wzorcem terminologii i rejestru. Nazwy siedmiu wielkości oddano
 * przyjętymi terminami naukowymi hindi — वर्ण ताप (temperatura barwowa),
 * झिलमिलाहट (migotanie), मेलेनोपिक अनुपात (współczynnik melanopiczny),
 * दैनिक लय (rytm dobowy) — po jednym odpowiedniku na pojęcie w całym pliku.
 * Zdanie o rozporządzeniu (UE) 2017/745 i zdania o prywatności przetłumaczono
 * wiernie: bez skracania i bez zmiany mocy sformułowań.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — i tak ma zostać
 * w każdym z trzydziestu języków (patrz docs/shared/README.md, rozdział
 * „Warstwa językowa”). Klucza, którego nie ma w angielskim, nie wolno tu
 * dopisać: angielski jest wartością zapasową, więc to on wyznacza zestaw.
 */
window.I18nData = window.I18nData || {};
window.I18nData['hi'] = Object.assign(window.I18nData['hi'] || {}, {

  /* Nazwa własna — nie tłumaczy się jej, ale wchodzi jako wstawka w zdanie
     o rozporządzeniu (UE) 2017/745, gdzie stoi w mianowniku. */
  'app.name': 'प्रकाश मॉनिटर',

  /* ---- wybór języka ---- */

  'language.label': 'भाषा',
  'language.help': 'पूरे ऐप की भाषा। सभी भाषाएँ पहले से इसी डिवाइस पर हैं — कुछ भी डाउनलोड नहीं होता और कहीं कुछ नहीं भेजा जाता।',
  'language.auto': 'डिवाइस के अनुसार',
  'language.autoHint': 'फ़ोन या ब्राउज़र में सेट की गई भाषा के अनुसार।',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'नीला अंश',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'प्रतिशत',
  'metric.share.short': 'दिख रही रोशनी का कितना हिस्सा नीले चैनल पर पड़ता है।',
  'metric.share.help': 'यह रंग को चमक से अलग करता है — नाइट मोड चालू करने पर यही मान बदलता है।',

  'metric.brightness.name': 'दृश्य की चमक',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'प्रतिशत',
  'metric.brightness.short': 'कैमरे की तस्वीर की औसत चमक।',
  'metric.brightness.help': 'यह सापेक्ष मान है, लक्स नहीं — कैमरा नीचे से अपना एक्सपोज़र खुद बदलता रहता है।',

  'metric.kelvin.name': 'वर्ण ताप',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'केल्विन',
  'metric.kelvin.short': 'रोशनी गर्म है या ठंडी।',
  'metric.kelvin.help': '3000 K से नीचे रोशनी गर्म होती है और शाम को नरम लगती है। 6500 K अधिकतर स्क्रीनों का डिफ़ॉल्ट सफ़ेद है।',

  'metric.melanopic.name': 'दैनिक लय पर असर',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'गुना',
  'metric.melanopic.short': 'यह रोशनी जैविक घड़ी पर कितना ज़ोर से असर करती है।',
  'metric.melanopic.help': 'मेलेनोपिक अनुपात का अनुमान। 1.00 तटस्थ दिन का सफ़ेद है; शाम को 0.50 से नीचे जाना बेहतर है।',

  'metric.flicker.name': 'झिलमिलाहट',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'प्रतिशत',
  'metric.flicker.short': 'प्रकाश स्रोत का न दिखने वाला स्पंदन।',
  'metric.flicker.help': 'सस्ते डिमर और बैकलाइट स्पंदित होते हैं। आँख इसे नहीं देखती, पर यह थकान और सिरदर्द का जाना-माना कारण है।',

  'metric.uniformity.name': 'एकरूपता',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'प्रतिशत',
  'metric.uniformity.short': 'रोशनी फ़्रेम में समान रूप से फैली है या नहीं।',
  'metric.uniformity.help': 'स्क्रीन पर कम मान बैकलाइट के रिसाव या परावर्तन का संकेत है; मेज़ पर — ग़लत जगह रखे लैंप का।',

  'metric.comfort.name': 'आँखों का आराम',
  'metric.comfort.unit': 'अंक',
  'metric.comfort.unitSpoken': 'अंक',
  'metric.comfort.short': 'छह संख्याओं की जगह एक आकलन।',
  'metric.comfort.help': 'यह बाकी मापों को 0–100 के स्कोर में जोड़ता है और दिखाता है कि उसे सबसे ज़्यादा क्या घटाता है। भार हमारा संपादकीय आकलन है, कोई मानक नहीं।',

  'comfort.penalty.melanopic': 'दैनिक लय पर असर',
  'comfort.penalty.kelvin': 'रोशनी का ठंडा रंग',
  'comfort.penalty.flicker': 'झिलमिलाहट',
  'comfort.penalty.uniformity': 'असमान रोशनी',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': 'कैमरा चालू करने के लिए “Start” दबाएँ।',
  'engine.starting': 'कैमरा चालू कर रहे हैं…',

  'engine.error.permission': 'कैमरे के इस्तेमाल की अनुमति नहीं है। ब्राउज़र की सेटिंग में कैमरे की अनुमति दें और फिर से “Start” दबाएँ।',
  'engine.error.notFound': 'कोई कैमरा नहीं मिला। जाँचें कि डिवाइस में कैमरा है और वह सिस्टम में बंद तो नहीं है।',
  'engine.error.busy': 'कैमरा किसी दूसरे ऐप्लिकेशन में व्यस्त है। उसे बंद करें और फिर कोशिश करें।',
  'engine.error.unknown': 'कैमरा चालू नहीं हो सका।',
  'engine.error.unsupported': 'यह ब्राउज़र इस पेज को कैमरे तक पहुँच नहीं देता। ऐप को HTTPS पर खोलें या कोई दूसरा ब्राउज़र इस्तेमाल करें।',

  /* ---- strefy ---- */

  'zone.good': 'सामान्य सीमा में',
  'zone.warning': 'सावधान',
  'zone.critical': 'गंभीर',
  'zone.none': 'डेटा नहीं',
  'zone.settling': 'स्थिर हो रहा है',

  'zone.spoken.good': 'सामान्य सीमा में',
  'zone.spoken.warning': 'सावधान',
  'zone.spoken.critical': 'गंभीर',
  'zone.spoken.none': 'डेटा नहीं',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'अंक',
  'unit.hertz': 'Hz',
  'unit.second': 'से.',
  'unit.minute': 'मि.',
  'unit.hour': 'घं.',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'यह रोशनी ठीक है — आपकी तय की गई किसी भी सीमा को कुछ भी पार नहीं करता।',
  'verdict.noValue': 'यह राशि अभी मापी नहीं जा सकती। जाँचें कि लेंस पर कुछ ढका तो नहीं है।',
  'verdict.warmup': 'आकलन तय कर रहे हैं — फ़ोन को थोड़ी देर और स्थिर रखें।',

  'verdict.warning.share': 'इस रोशनी का काफ़ी हिस्सा नीले चैनल पर पड़ता है। शाम को इसे मद्धिम कर लेना बेहतर है।',
  'verdict.warning.brightness': 'दृश्य चमकीला है — कैमरा अपनी माप सीमा के ऊपरी छोर के पास काम कर रहा है।',
  'verdict.warning.kelvin': 'रोशनी काफ़ी ठंडी है। शाम को लगभग 2700 K का बल्ब नरम लगता है।',
  'verdict.warning.melanopic': 'यह रोशनी जैविक घड़ी पर काफ़ी ज़ोर से असर करती है।',
  'verdict.warning.flicker': 'प्रकाश स्रोत स्पष्ट रूप से स्पंदित हो रहा है।',
  'verdict.warning.uniformity': 'रोशनी फ़्रेम में असमान रूप से फैली है।',
  'verdict.warning.comfort': 'आँखों का आराम कम हुआ है — इसमें कई बातें एक साथ जुड़ी हैं।',

  'verdict.critical.share': 'नीले रंग की बहुत अधिक मात्रा। शाम को नाइट मोड चालू करें या प्रकाश स्रोत बदलें।',
  'verdict.critical.brightness': 'दृश्य बहुत चमकीला है। सीधे प्रकाश स्रोत की ओर देखते हुए माप न लें।',
  'verdict.critical.kelvin': 'रोशनी ठंडी है। शाम को यही आँखों को सबसे ज़्यादा थकाती है — गर्म बल्ब या नाइट मोड मदद करेगा।',
  'verdict.critical.melanopic': 'यह रोशनी जैविक घड़ी पर ज़ोरदार असर करती है। शाम को 0.50 से नीचे जाना बेहतर है।',
  'verdict.critical.flicker': 'प्रकाश स्रोत तेज़ी से स्पंदित हो रहा है। यह आँखों की थकान और सिरदर्द का जाना-माना कारण है।',
  'verdict.critical.uniformity': 'रोशनी बहुत असमान रूप से फैली है। लैंप की जगह या स्क्रीन पर पड़ने वाले परावर्तन जाँचें।',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'आँखों का आराम कम है। देखें कि यह स्कोर किन हिस्सों से बना है, ताकि पता चले कि उसे क्या घटाता है।',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'यह संख्या क्या नहीं बताती',
  'note.warningTitle': 'सावधान',
  'note.dashTitle': 'यह माप क्या नहीं है',
  'note.dashText': 'फ़ोन के कैमरे में तीन चौड़े रंग चैनल और स्वचालित श्वेत संतुलन होता है — वह स्पेक्ट्रम नहीं मापता। वर्ण ताप और दैनिक लय पर असर sRGB प्राथमिक रंगों से निकाले गए अनुमान हैं। ऐप अंतर और समय के साथ आने वाले बदलाव अच्छी तरह दिखाता है; वह मीटर की जगह नहीं लेता और कोई निदान नहीं करता।',
  'note.approxLegend': '≈ अनुमानित मान — sRGB प्राथमिक रंगों से निकाला गया, स्पेक्ट्रम की माप से नहीं।',
  'note.kelvinOutOfRange': 'विधि की सीमा से बाहर — इस रंग पर वर्ण ताप का सूत्र भरोसेमंद नहीं रह जाता।',
  'note.flickerOutOfRange': 'विधि की सीमा से बाहर — {rate} Hz पर नमूने लेने से केवल {limit} Hz से नीचे का स्पंदन दिखता है। बिजली की लाइन का 100 Hz पहुँच से बाहर है और ऐप उसे कभी परिणाम के रूप में नहीं देगा।',
  'note.helpTitle': 'यह संख्या क्या नहीं बताती',
  'note.helpText': 'फ़ोन के कैमरे में तीन चौड़े चैनल होते हैं और वह स्पेक्ट्रम नहीं मापता। यह मान एक तुलनात्मक संकेतक है — यह अलग-अलग रोशनियों के बीच का अंतर और समय के साथ आने वाले बदलाव अच्छी तरह दिखाता है, और यह न तो प्रयोगशाला की माप है और न चिकित्सीय जानकारी।',
  'note.calibration': 'माप बिना अंशांकन के — मानों को तुलनात्मक रूप में लें।',

  'note.howToTitle': 'समझदारी से कैसे मापें',
  'note.howTo.hold.title': 'फ़ोन को स्थिर रखें',
  'note.howTo.hold.text': 'स्वचालित एक्सपोज़र को स्थिर होने में 2–3 सेकंड लगते हैं।',
  'note.howTo.aim.title': 'रोशन सतह की ओर करें',
  'note.howTo.aim.text': 'सफ़ेद काग़ज़ या हल्की दीवार। सीधे प्रकाश स्रोत में देखते हुए माप न लें।',
  'note.howTo.compare.title': 'तुलना करें, निरपेक्ष आकलन न करें',
  'note.howTo.compare.text': 'रोशनी बदलने से पहले और बाद का वही दृश्य किसी एक संख्या से ज़्यादा बताता है।',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest przepisane co do słowa z dotychczasowej redakcji. To
     sformułowanie, przy którym rozporządzenie (UE) 2017/745 uznaje
     przeznaczenie medyczne za wykluczone — nie skraca się go dla stylu. */

  'legal.noDiagnosis': 'कोई भी परिणाम निदान या स्वास्थ्य सलाह नहीं है।',
  'legal.mdr': '{app} विनियम (EU) 2017/745 के अर्थ में चिकित्सा उपकरण नहीं है, यह किसी भी रोग-स्थिति के निदान, रोकथाम, निगरानी या उपचार के लिए नहीं है, और यह डॉक्टर या ऑप्टोमेट्रिस्ट की जाँच का स्थान नहीं लेता।',

  /* ---- prywatność ---- */

  'privacy.title': 'इस डिवाइस से क्या बाहर जाता है',
  'privacy.short': 'इस ऐप में कुछ भी नेटवर्क पर नहीं भेजा जाता। हर संख्या इसी डिवाइस पर बनती है और यहीं रहती है।',
  'privacy.onDevice': 'कैमरा तभी चालू होता है जब आप बटन दबाते हैं, और तस्वीर कभी इस डिवाइस से बाहर नहीं जाती।',
  'privacy.external': 'पूरे ऐप में यही एकमात्र जगह है जहाँ कुछ इस डिवाइस से बाहर जाता है: बटन एक बाहरी पेज नए टैब में खोलता है, और वह भी तभी जब आप उसे दबाते हैं। माप, इतिहास और सेटिंग यहीं रहते हैं।',
  'privacy.externalPending': 'जब पता उपलब्ध होगा, बटन एक बाहरी पेज नए टैब में खोलेगा। यही एकमात्र क्षण होगा जब कुछ इस डिवाइस से बाहर जाएगा। माप, इतिहास और सेटिंग यहीं रहते हैं।',
  'privacy.storageBlocked': 'यह ब्राउज़र कुछ भी सहेजने नहीं देता (निजी मोड, या साइट डेटा अवरुद्ध)। मापना काम करता है, पर टैब बंद करते ही इतिहास ग़ायब हो जाएगा।',

  /* ---- liczebniki ----
     Hindi ma dwie kategorie CLDR: one (1) i other (cała reszta, w tym 0
     i ułamki). Rzeczownik policzalny w hindi w liczbie mnogiej często nie
     zmienia formy — różnicę widać przy „घंटा / घंटे”. Formę wybiera
     Intl.PluralRules('hi'), nie nasza reguła. */

  'count.readings': { one: '{n} रीडिंग', other: '{n} रीडिंग' },
  'count.sessions': { one: '{n} माप', other: '{n} माप' },
  'count.seconds': { one: '{n} सेकंड', other: '{n} सेकंड' },
  'count.minutes': { one: '{n} मिनट', other: '{n} मिनट' },
  'count.hours': { one: '{n} घंटा', other: '{n} घंटे' },
  'count.days': { one: '{n} दिन', other: '{n} दिन' }
});
