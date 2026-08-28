/* Monitor Światła v5 — słownik hindi.
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr). NIE JEST
 * KALKĄ żadnego z nich: polskie i angielskie zdania przełożono na naturalny
 * hindi, a nie słowo w słowo. Zachowane zostało to, co niesie znaczenie:
 * liczby, progi, jednostki, nazwy wstawek i — co do treści — zastrzeżenia
 * medyczne oraz zdania o prywatności. Tych ostatnich nie wolno osłabiać ani
 * wzmacniać: „nie zastępuje rozmowy z lekarzem” ma po hindi znaczyć dokładnie
 * tyle samo, a „obraz nie opuszcza urządzenia” nie może stać się obietnicą
 * szerszą niż polska.
 *
 * REJESTR: uprzejme „आप” w całym pliku, tryb rozkazujący na -एँ (करें, जाएँ).
 * Zdania kończy danda (।) — kropka zostaje wyłącznie w liczbach dziesiętnych
 * (0.50, 1.00) i w adresach. Przyciski oraz etykiety kafelków są krótkie,
 * teksty pomocy — pełnymi zdaniami. Formy czasownikowe dobrane tak, by nie
 * narzucać rodzaju użytkownikowi; rodzaj męski pojawia się tylko tam, gdzie
 * mówi autor („मैं यह क्यों माँग रहा हूँ”).
 *
 * CYFRY I SEPARATORY: łacińskie, bo `Intl.NumberFormat('hi')` domyślnie takich
 * używa (numberingSystem: 'latn'), a separatorem dziesiętnym jest kropka —
 * stąd „0.50” i „1.00” w zdaniach, nie „0,50”. Zegar jest dwunastogodzinny
 * z „am/pm” (tak formatuje ICU dla hi), więc napis-wzorzec 'chart.sample.clock'
 * ma taką właśnie postać. Skróty miesięcy są te z CLDR, razem ze znakiem
 * skrócenia „॰” — telefon pokazuje je tak samo poza aplikacją.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych):
 *   नीले का हिस्सा (udział niebieskiego), दृश्य की चमक (jasność sceny),
 *   रंग तापमान (temperatura barwowa), सर्कैडियन असर (wpływ na rytm dobowy;
 *   w opisie: मेलानोपिक अनुपात — współczynnik melanopiczny),
 *   झिलमिलाहट (migotanie), एकरूपता (równomierność),
 *   आँखों का आराम (komfort wzrokowy).
 * Osobno rozdzielone: माप (pomiar — czynność i wynik) oraz मापदंड (mierzona
 * wielkość); मीटर to tarcza dużego wskaźnika, ग्राफ़ to wykres, इतिहास to
 * historia, सत्र to sesja, सीमा to próg, रीडिंग to pojedynczy odczyt.
 * STREFY: सुरक्षित / मध्यम / हानिकारक — tak samo jak angielskie safe /
 * moderate / harmful mówią o świetle, a nie o stanie aplikacji, i wchodzą
 * w zdanie „ज़ोन: {zone}”.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Tekst ze wstawką {nazwa}'   — napis zwykły,
 *   'klucz.kropkowany': { one, other }               — forma zależna od liczby.
 * Hindi ma w CLDR dwie kategorie liczebnika: `one` i `other`
 * (Intl.PluralRules('hi') → ['one', 'other']). Nazwy wstawek są identyczne jak
 * w pl.js — pilnuje tego keys.test.js. Kolejność wstawek w zdaniu wolno
 * zmieniać, nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'प्रकाश मॉनिटर',
  'app.description': 'प्रकाश मॉनिटर — आपका कैमरा आपके आसपास की रोशनी के सात मापदंड मापता है। सब कुछ इसी डिवाइस पर गिना जाता है, कुछ भी नेटवर्क पर नहीं जाता।',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — प्रकाश मॉनिटर',
  'app.skipToContent': 'सामग्री पर जाएँ',
  'app.nav.aria': 'मुख्य नेविगेशन',
  'app.noscript.title': 'इस ऐप को JavaScript चाहिए',
  'app.noscript.text': 'पूरी माप इसी ब्राउज़र टैब में होती है: JavaScript ही कैमरे से फ़्रेम पढ़ता है और उनसे रोशनी के सातों मापदंड गिनता है। उसके बिना मापने को कुछ बचता ही नहीं। इस पेज के लिए JavaScript चालू करें और इसे दोबारा खोलें — तब भी नेटवर्क पर कुछ नहीं भेजा जाएगा।',

  'nav.measure': 'माप',
  'nav.history': 'इतिहास',
  'nav.tools': 'टूल',
  'nav.support': 'सहयोग',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'माप जारी',
  'shell.live.aria': 'माप जारी है। {metric}: {value}। माप स्क्रीन पर लौटें।',
  'shell.live.metricFallback': 'मुख्य मापदंड',
  'shell.action.fallback': 'स्क्रीन की क्रिया',

  'shell.loadFail.title': '“{screen}” स्क्रीन लोड नहीं हो सकी',
  'shell.loadFail.text': 'शायद डिवाइस के स्टोरेज में कुछ फ़ाइलें नहीं बचीं। नेटवर्क से जुड़ें और पेज फिर से लोड करें।',
  'shell.fatal.title': 'कुछ गड़बड़ हो गई',
  'shell.fatal.text': 'ऐप स्क्रीन नहीं बना सका। पेज फिर से लोड करना आम तौर पर काफ़ी होता है — आपकी सहेजी हुई माप और सेटिंग अपनी जगह बनी रहती हैं।',
  'shell.fatal.reload': 'पेज फिर से लोड करें',
  'shell.boot.failTitle': 'ऐप शुरू नहीं हो सका',
  'shell.boot.failText': 'शेल शुरू नहीं हुआ। पेज फिर से लोड करें — आपकी सहेजी हुई माप और सेटिंग अपनी जगह बनी रहती हैं।',
  'shell.background.error': 'पीछे कुछ टूट गया',
  'shell.background.action': 'फिर लोड करें',
  'shell.update.title': 'नया संस्करण उपलब्ध है',
  'shell.update.action': 'फिर लोड करें',

  'onboarding.title': 'शुरू करने से पहले',
  'onboarding.lead': 'प्रकाश मॉनिटर कैमरे से आपके आसपास की रोशनी को देखता है और उससे सात मापदंड गिनता है — नीले के हिस्से से लेकर आँखों के आराम तक।',
  'onboarding.privacy': 'तस्वीर कभी इस डिवाइस से बाहर नहीं जाती: न कोई सर्वर है, न खाता, न कुछ अपलोड करने को। सातों मापदंड तुरंत काम करते हैं, बिना साइन-इन और बिना किसी शुल्क के।',
  'onboarding.honesty': 'यह एक मोटा अंदाज़ा है, न मापक यंत्र और न चिकित्सा जाँच। जो मापा नहीं जा सकता, उसे हम दिखाते नहीं — संख्या की जगह आपको एक डैश दिखेगा।',
  'onboarding.start': 'चलिए शुरू करें',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'लागू करें',
  'overlay.toast.close': 'संदेश हटाएँ',
  'overlay.sheet.label': 'डायलॉग',
  'overlay.sheet.close': 'बंद करें',
  'overlay.dialog.confirm': 'पुष्टि करें',
  'overlay.dialog.cancel': 'रद्द करें',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'रद्द करें',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'माप',

  'measure.intro.aria': 'माप शुरू करें',
  'measure.intro.headline': 'देखिए, आप किस रोशनी में हैं',
  'measure.intro.lead': 'कैमरा दिखाता है कि इस समय आप पर पड़ रही रोशनी में कितना नीला है — और दिन के इस पहर के लिए वह कहीं ज़्यादा तो नहीं।',
  'measure.intro.start': 'माप शुरू करें',
  'measure.intro.hint': 'ब्राउज़र कैमरे की अनुमति माँगेगा। अनुमति देते ही माप शुरू हो जाती है।',
  'measure.intro.privacy': 'कैमरे की तस्वीर इसी डिवाइस पर संसाधित होती है और कभी इससे बाहर नहीं जाती। हम एक भी फ़्रेम न भेजते हैं, न सहेजते हैं, न साझा करते हैं।',

  'measure.live.aria': 'माप चल रही है',
  'measure.badge.starting': 'शुरू हो रहा है',
  'measure.badge.paused': 'रुकी हुई',
  'measure.badge.running': 'माप जारी',
  'measure.stale': 'तस्वीर का इंतज़ार — ऐप के पीछे चले जाने पर प्रीव्यू थम जाता है।',
  'measure.crop': 'हम फ़्रेम का बीच का हिस्सा मापते हैं — तस्वीर की चौड़ाई और ऊँचाई का चिह्नित {percent}%।',
  'measure.facing.front': 'अगला कैमरा',
  'measure.facing.back': 'पिछला कैमरा',

  'measure.boot.title': 'कैमरा शुरू हो रहा है…',
  'measure.boot.text': 'अगर ब्राउज़र अनुमति माँगे तो दे दीजिए — तस्वीर के बिना मापने को कुछ नहीं है। यह अनुमति सिर्फ़ इसी पेज के लिए है और आप इसे बाद में वापस ले सकते हैं।',
  'measure.boot.cancel': 'रद्द करें',

  'measure.hold': 'रीडिंग जमी हुई हैं। कैमरा चलता रहता है, पर कुछ भी इतिहास या औसत तक नहीं पहुँचता।',
  'measure.gridHint': 'किसी मापदंड को बड़े मीटर पर लाने के लिए उसकी टाइल चुनें।',

  'measure.stop': 'बंद करें',
  'measure.pause': 'रोकें',
  'measure.resume': 'जारी रखें',
  'measure.flip.aria': 'कैमरा बदलें',
  'measure.flip.toBack': 'पिछले कैमरे पर जाएँ',
  'measure.flip.toFront': 'अगले कैमरे पर जाएँ',

  'measure.fail.aria': 'कैमरा त्रुटि',
  'measure.fail.headline': 'कैमरा शुरू नहीं हुआ',
  'measure.fail.retry': 'फिर कोशिश करें',
  'measure.fail.back': 'वापस',
  'measure.fail.savedSession': 'रुकावट से पहले का सत्र ({duration}) इतिहास में सहेज लिया गया।',
  'measure.error.fallback': 'कैमरा शुरू नहीं किया जा सका।',

  'measure.summary.aria': 'सत्र का सारांश',
  'measure.summary.title': 'सत्र का सारांश',
  'measure.summary.paused': '{duration} तक रुकी रही',
  'measure.summary.nothingMeasured': 'किसी भी मापदंड की रीडिंग नहीं मिली — पूरे सत्र में कैमरे को रोशनी दिखी ही नहीं।',
  'measure.summary.note': 'औसत सिर्फ़ उन नमूनों से बनते हैं जो ठहराव के बाहर लिए गए। जो मापदंड कभी मापे ही नहीं गए, उन्हें छोड़ दिया जाता है, शून्य नहीं गिना जाता।',
  'measure.summary.nearThreshold': 'सीमा के सबसे पास',
  'measure.summary.worstPoint': 'सबसे कमज़ोर जगह',
  'measure.summary.averageZone': 'औसतन {zone}',
  'measure.summary.tooShort': 'सत्र {duration} चला — इतिहास में अपने आप पहुँचने के लिए बहुत छोटा। आप इसे ख़ुद सहेज सकते हैं।',
  'measure.summary.again': 'फिर से मापें',
  'measure.summary.save': 'इतिहास में सहेजें',
  'measure.summary.saved': 'इतिहास में सहेजा गया',
  'measure.summary.savedToast': 'सत्र इतिहास में सहेज लिया गया।',
  'measure.summary.close': 'बंद करें',

  'measure.method.title': 'हम यह कैसे मापते हैं',
  'measure.method.p1': 'ऐप कैमरे की तस्वीर को सेकंड में दस बार पढ़ता है और फ़्रेम के बीच के {percent}% से मापदंड गिनता है — प्रीव्यू में दिखता निशाना ठीक उसी हिस्से को चिह्नित करता है।',
  'measure.method.p2': 'फ़ोन के कैमरे में तीन चौड़े चैनल होते हैं और अपने आप चलने वाला अपना एक्सपोज़र तथा व्हाइट बैलेंस। वह रोशनी के अनुपात देखता है, उसका स्पेक्ट्रम नहीं।',
  'measure.method.p3': 'नीले का हिस्सा, चमक, झिलमिलाहट और एकरूपता वही हैं जो कैमरा सचमुच मापता है। रंग तापमान और सर्कैडियन असर खुले तौर पर अनुमान हैं, जो sRGB प्राथमिक रंगों से गिने जाते हैं।',
  'measure.method.p4': 'झिलमिलाहट सिर्फ़ चार हर्ट्ज़ से नीचे दिखती है। बिजली की लाइन का 100 Hz का झिलमिलाना इस नमूना-दर की पहुँच से कहीं दूर है और उसे कभी रीडिंग के रूप में नहीं बताया जाएगा।',
  'measure.method.p5': 'इनमें से कोई भी संख्या फ़ोटोमेट्रिक माप या चिकित्सीय परिणाम नहीं है। कैमरे की तस्वीर डिवाइस से बाहर नहीं जाती।',
  'measure.method.ok': 'ठीक है',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'कैमरा शुरू करना रद्द किया गया।',
  'measure.announce.stoppedNoSamples': 'माप बंद। एक भी नमूना नहीं लिया गया।',
  'measure.announce.stopped': 'माप बंद। सत्र का सारांश तैयार है।',
  'measure.announce.interrupted': 'माप में रुकावट आई। सत्र का सारांश तैयार है।',
  'measure.announce.paused': 'माप रुकी हुई है। रीडिंग जमी हुई हैं।',
  'measure.announce.resumed': 'माप फिर से चालू।',
  'measure.announce.switchedFront': 'अगले कैमरे पर चले गए। नया सत्र शुरू होता है।',
  'measure.announce.switchedBack': 'पिछले कैमरे पर चले गए। नया सत्र शुरू होता है।',
  'measure.announce.lead': 'मुख्य मापदंड: {metric}।',
  'measure.announce.cameraError': 'कैमरा त्रुटि। {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'पूरे सत्र में रोशनी सुरक्षित दायरे में रही — लैंप को जैसा है वैसा ही रहने दें और अँधेरा होने के बाद फिर जाँचें, जब कोई दूसरा स्रोत जल रहा हो।',
  'measure.advice.share.evening': 'नीले का हिस्सा औसतन {value} रहा — स्क्रीन पर नाइट मोड चालू करें और छत की बत्ती बुझा दें, मेज़ की ऊँचाई पर एक गर्म लैंप रहने दें।',
  'measure.advice.share.day': 'नीले का हिस्सा औसतन {value} रहा — दिन में यह चल जाता है, पर स्क्रीन को सोने से दो घंटे पहले अपने आप गर्म मोड में जाने के लिए सेट कर दें।',
  'measure.advice.brightness': 'फ़्रेम ज़रूरत से ज़्यादा चमकीला था (औसतन {value}) — रोशनी के स्रोत से हटकर बैठें या जिस स्क्रीन को माप रहे हैं उसकी चमक कम करें, क्योंकि इतने एक्सपोज़र पर बाक़ी मापदंड भी सटीक नहीं रहते।',
  'measure.advice.kelvin.evening': 'रंग तापमान औसतन {value} पर टिका रहा — अँधेरा होने के बाद 3000 K से नीचे जाएँ: लैंप को गर्म मोड पर कर दें या 2700 K का बल्ब लगाएँ।',
  'measure.advice.kelvin.day': 'रंग तापमान औसतन {value} पर टिका रहा — दिन के लिए यह अच्छी, चौकन्ना रखने वाली सफ़ेदी है, पर शाम को इसी लैंप को 2700 K पर कर दें।',
  'measure.advice.melanopic.evening': 'सर्कैडियन असर औसतन {value} रहा — सोने से पहले के दो घंटों में 0.50 × से नीचे जाएँ: मुख्य रोशनी मद्धिम करें और छत के बजाय मेज़ की ऊँचाई से रोशनी लें।',
  'measure.advice.melanopic.day': 'सर्कैडियन असर औसतन {value} रहा — दिन के इस समय यह मात्रा मदद करती है, पर शाम को इस स्रोत की जगह कोई कमज़ोर और गर्म स्रोत रखें।',
  'measure.advice.flicker': 'झिलमिलाहट औसतन {value} तक पहुँची — इसके पीछे आम तौर पर कोई डिमर होता है या बहुत नीचे कर दी गई बैकलाइट: स्क्रीन की चमक 40% से ऊपर करें या डिमर बदलकर ऐसा लगाएँ जो PWM का इस्तेमाल न करता हो।',
  'measure.advice.uniformity': 'रोशनी असमान पड़ रही थी (औसतन {value}) — एक तेज़ बिंदु के बजाय लैंप को मेज़ के बग़ल में रखें और सामने की ओर से एक दूसरा, कमज़ोर स्रोत जोड़ें।',
  'measure.advice.comfort': 'आँखों का आराम औसतन {value} निकला — एक ही बदलाव से शुरू करें: मुख्य स्रोत की चमक आधी कर दें और उसके बाद ही रोशनी के रंग पर ध्यान दें।',
  'measure.advice.default': 'अपनी रोशनी में एक चीज़ बदलें और उसे फिर से मापें — दो सत्रों की तुलना अकेली रीडिंग से ज़्यादा बताती है।',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'इतिहास',
  'history.action.export': 'इतिहास एक्सपोर्ट करें',

  'history.metricGroup.aria': 'मापदंड का चुनाव',
  'history.announce.metric': 'मापदंड: {metric}',
  'history.rangeGroup.aria': 'समय की अवधि',
  'history.range.aria': 'पिछले {range}',

  'history.stats.title': 'अवधि के आँकड़े',
  'history.stats.head': '{metric}\u00A0—\u00A0पिछले {range}',
  'history.stats.note': 'ग्राफ़ में जो दिख रहा है, उसी से गिना गया। जिस समय माप नहीं हुई, वह गिनती में नहीं आता — हम उसकी जगह शून्य नहीं रखते।',
  'history.stat.min': 'न्यूनतम',
  'history.stat.avg': 'औसत',
  'history.stat.max': 'अधिकतम',
  'history.trend.up': 'इस अवधि में बढ़ रहा है',
  'history.trend.flat': 'कोई साफ़ बदलाव नहीं',
  'history.trend.down': 'इस अवधि में घट रहा है',
  'history.trend.none': 'तुलना के लिए कुछ नहीं',

  'history.sessions.title': 'माप के सत्र',
  'history.sessions.count': '{sessions}, नए से पुराने',
  'history.sessions.empty': 'अभी कोई सत्र नहीं',
  'history.sessions.hint': 'माप बंद करते ही सत्र सहेज लिया जाता है।',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'दायरा: {range}',
  'history.session.noMeasure': 'कुछ नहीं मापा गया',

  'history.data.title': 'डेटा',
  'history.data.subtitle': 'इतिहास सिर्फ़ इसी डिवाइस पर रखा जाता है।',
  'history.export.csv': 'CSV एक्सपोर्ट करें',
  'history.export.json': 'JSON एक्सपोर्ट करें',
  'history.export.ok': 'फ़ाइल सहेजने के लिए तैयार',
  'history.export.fail': 'फ़ाइल तैयार नहीं की जा सकी। निजी मोड में और किसी दूसरे ऐप के अंदर खुली विंडो में ब्राउज़र सहेजना रोक देता है — पेज को सामान्य टैब में खोलें।',
  'history.export.sheet.title': 'इतिहास का एक्सपोर्ट',
  'history.export.sheet.text': 'CSV स्प्रेडशीट में खुलती है (सेमीकोलन से अलग किए गए ख़ाने, दशमलव में अल्पविराम)। JSON सब कुछ रखता है, सत्रों की सूची और वे अंतराल भी जहाँ कुछ नहीं मापा गया।',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'इतिहास मिटाएँ',
  'history.clear.title': 'इतिहास मिटाएँ?',
  'history.clear.text': 'इससे {points} और {sessions} मिट जाएँगे। इसे वापस नहीं लाया जा सकता — डेटा रखना है तो पहले उसे एक्सपोर्ट कर लें।',
  'history.clear.confirm': 'मिटाएँ',
  'history.clear.announce': 'इतिहास मिटा दिया गया।',
  'history.clear.toast': 'इतिहास मिटा दिया गया',

  'history.empty.title': 'अभी दिखाने को कुछ नहीं',
  'history.empty.text': 'माप के साथ-साथ इतिहास भरता जाता है — हर सेकंड एक बिंदु। सब कुछ इसी डिवाइस पर रहता है।',
  'history.empty.action': 'माप पर जाएँ',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 मिनट',
  'range.5m': '5 मिनट',
  'range.1h': '1 घंटा',
  'range.24h': '24 घंटे',
  'range.7d': '7 दिन',
  'range.30d': '30 दिन',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'तारीख़ और समय',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'डिवाइस का स्टोरेज भर गया है — नई माप अब सहेजी नहीं जा रही।',
  'storage.blocked': 'ब्राउज़र इतिहास सहेजने नहीं देता — टैब बंद करते ही डेटा चला जाएगा।',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'टूल',
  'tools.action.about': 'माप के बारे में',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'भाषा',
  'tools.language.subtitle': 'डिफ़ॉल्ट रूप से ऐप आपके डिवाइस की भाषा के साथ चलता है; इस सूची से किया गया चुनाव तुरंत लागू होता है और इसी ब्राउज़र में बना रहता है।',
  'tools.language.aria': 'इंटरफ़ेस की भाषा',
  'tools.language.system': 'ऑटो',
  'tools.language.announce': 'इंटरफ़ेस की भाषा: {language}।',

  'tools.appearance.title': 'रूप-रंग',
  'tools.appearance.theme.title': 'थीम',
  'tools.appearance.theme.desc': '“ऑटो” आपके सिस्टम की सेटिंग के साथ चलती है।',
  'tools.appearance.theme.aria': 'थीम',
  'tools.theme.system': 'ऑटो',
  'tools.theme.light': 'हल्की',
  'tools.theme.dark': 'गहरी',
  'tools.appearance.accent.title': 'एक्सेंट रंग',
  'tools.appearance.accent.desc': 'बटन, चयन और स्लाइडर का रंग।',
  'tools.appearance.accent.aria': 'एक्सेंट रंग',
  'tools.appearance.textScale.title': 'टेक्स्ट का आकार',
  'tools.appearance.textScale.desc': 'पूरा इंटरफ़ेस बड़ा करता है, सिर्फ़ लेबल नहीं।',
  'tools.appearance.textScale.aria': 'टेक्स्ट का आकार',
  'tools.appearance.density.title': 'सघनता',
  'tools.appearance.density.desc': 'सघन में एक ही स्क्रीन पर ज़्यादा सामग्री आती है।',
  'tools.appearance.density.aria': 'लेआउट की सघनता',
  'tools.density.comfortable': 'आरामदेह',
  'tools.density.compact': 'सघन',
  'tools.appearance.motion.title': 'कम हलचल',
  'tools.appearance.motion.desc': 'एनिमेशन और सुई का सरकना बंद कर देता है। आपके सिस्टम की सेटिंग का पालन वैसे भी होता है।',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'समुद्र',
  'accent.violet': 'बैंगनी',
  'accent.amber': 'अंबर',
  'accent.mint': 'पुदीना',
  'accent.rose': 'गुलाब',

  'tools.thresholds.title': 'सीमाएँ',
  'tools.thresholds.subtitle': 'किस मान से ऐप “मध्यम” कहे और किससे “हानिकारक”। डिफ़ॉल्ट सीमाएँ हमारा सुझाव हैं, कोई मानक नहीं — इन्हें अपने हिसाब से सेट करें।',
  'tools.thresholds.warn': 'चेतावनी की सीमा',
  'tools.thresholds.crit': 'अलार्म की सीमा',
  'tools.thresholds.warn.aria': 'चेतावनी की सीमा — {metric}',
  'tools.thresholds.crit.aria': 'अलार्म की सीमा — {metric}',
  'tools.thresholds.reset': 'डिफ़ॉल्ट',
  'tools.thresholds.reset.aria': 'डिफ़ॉल्ट सीमाएँ लौटाएँ: {metric}',
  'tools.thresholds.moved': '{threshold} {value} पर ले जाई गई।',
  'tools.thresholds.resetAll': 'सभी सीमाएँ लौटाएँ',
  'tools.thresholds.resetAll.title': 'डिफ़ॉल्ट सीमाएँ लौटाएँ?',
  'tools.thresholds.resetAll.text': 'सातों मापदंड ऐप की सुझाई हुई सीमाओं पर लौट जाएँगे। आपकी माप का इतिहास अछूता रहता है।',
  'tools.thresholds.resetAll.confirm': 'लौटाएँ',
  'tools.thresholds.resetAll.cancel': 'रहने दें',
  'tools.thresholds.resetAll.toast': 'सीमाएँ डिफ़ॉल्ट पर लौट आईं',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': '{warn} से ऊपर',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} और उससे कम',
  'tools.zoneRange.goodBelow': '{warn} से नीचे',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} और उससे ज़्यादा',

  'tools.calibration.title': 'कैलिब्रेशन',
  'tools.calibration.subtitle': 'उनके लिए जिनके पास तुलना करने को कुछ है।',
  'tools.calibration.intro': 'एक ही लैंप की तरफ़ किए गए दो फ़ोन थोड़ी अलग संख्याएँ दिखाएँगे — हर सेंसर का अपना रंग-झुकाव होता है। अगर आपके पास कोई भरोसेमंद रीडिंग है, तो यहाँ आप तस्वीर के अलग-अलग चैनलों को हल्का ऊपर या नीचे कर सकते हैं। ये गुणक कुछ भी गिनने से पहले लगते हैं, इसलिए सातों मापदंड एक साथ बदल जाते हैं।',
  'tools.calibration.neutral': 'तुलना करने को कुछ नहीं है? इसे 1.00 पर ही रहने दें — यही फ़ैक्टरी सेटिंग है और इससे कुछ नहीं बिगड़ता।',
  'tools.calibration.forward': 'बदलाव अभी से लागू होता है। इतिहास में पहले से पड़ी माप वैसी ही रहती हैं जैसी सहेजे जाने के समय थीं — हम उन्हें दोबारा नहीं गिनते, क्योंकि इससे डेटा बाद में बदल जाता।',
  'tools.calibration.reset': 'कैलिब्रेशन रीसेट करें',
  'tools.calibration.reset.toast': 'कैलिब्रेशन रीसेट हो गया',
  'tools.calibration.channel.r': 'लाल चैनल',
  'tools.calibration.channel.g': 'हरा चैनल',
  'tools.calibration.channel.b': 'नीला चैनल',
  'tools.calibration.channel.aria': '{channel} — कैलिब्रेशन का गुणक',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'माप',
  'tools.measurement.wake.title': 'स्क्रीन चालू रखें',
  'tools.measurement.wake.desc': 'माप के दौरान स्क्रीन जगी रहती है। बैटरी तब तेज़ी से घटती है।',
  'tools.measurement.wake.unsupported': 'यह ब्राउज़र स्क्रीन को जगाए रखने नहीं देता।',
  'tools.measurement.haptics.title': 'कंपन',
  'tools.measurement.haptics.desc': 'शुरू करने, बंद करने और मापदंड बदलने पर एक छोटी-सी पुष्टि।',
  'tools.measurement.haptics.unsupported': 'यह डिवाइस किसी कंपन मोटर की जानकारी नहीं देता।',

  'tools.about.title': 'माप के बारे में',
  'tools.about.subtitle': 'सातों मापदंडों में से हर एक ठीक-ठीक क्या गिनता है, और इस तरीक़े की ईमानदारी कहाँ जाकर ख़त्म होती है।',
  'tools.about.scale': 'पैमाना: {min} से {max} तक।',
  'tools.about.threshold': 'हम {warn} से चेतावनी देते हैं और {crit} से अलार्म।',
  'tools.about.thresholdInvert': 'हम {warn} से नीचे चेतावनी देते हैं और {crit} से नीचे अलार्म।',
  'tools.about.limitsHead': 'यह माप क्या नहीं कर सकती',
  'tools.about.limit.spectrum.title': 'कैमरा रंगों को वैसे नहीं देखता जैसे कोई यंत्र देखता है',
  'tools.about.limit.spectrum.text': 'फ़ोन के कैमरे में तीन चैनल होते हैं: लाल, हरा और नीला। रोशनी मापने वाला यंत्र इन्हें दर्जनों सँकरे बैंड में बाँट देता है। यहाँ आप जो देखते हैं, वह उन्हीं तीन संख्याओं से निकाला गया है — एक समझदार तरीक़े से, पर वह फिर भी गणना है, मापा हुआ स्पेक्ट्रम नहीं।',
  'tools.about.limit.exposure.title': 'कैमरा अपनी चमक ख़ुद तय कर लेता है',
  'tools.about.limit.exposure.text': 'फ़ोन को खिड़की की तरफ़ करते ही कैमरा तस्वीर को गहरा कर देता है, ताकि वह ज़्यादा चमकीली न पड़े। तब “दृश्य की चमक” गिर जाती है, हालाँकि कमरे में कुछ नहीं बदला। इसीलिए इस मान की तुलना एक ही दृश्य के भीतर करें, कमरों के बीच नहीं।',
  'tools.about.limit.flicker.title': 'धीमा कैमरा तेज़ झिलमिलाहट नहीं पकड़ेगा',
  'tools.about.limit.flicker.text': 'हम तस्वीर को सेकंड में {hz} बार जाँचते हैं। सेकंड में {nyquist} बार से तेज़ धड़कन ऐसी माप में असल से धीमी दिख सकती है या पूरी तरह ग़ायब हो सकती है — और बिजली की लाइन की झिलमिलाहट ठीक इतनी ही तेज़ होती है। अगर ऐप कुछ पकड़ ले, तो उसे “यहाँ कुछ धड़क रहा है” का संकेत मानें, मापी हुई आवृत्ति नहीं।',
  'tools.about.limit.medical.title': 'यह न चिकित्सा जाँच है, न चिकित्सकीय सलाह',
  'tools.about.limit.medical.text': 'ऐप आपको यह देखने में मदद करता है कि आसपास की रोशनी ठंडी, तेज़ या बेचैन है, और सुझाता है कि इसके बारे में क्या किया जा सकता है। यह आपके स्वास्थ्य के बारे में कोई निर्णय नहीं देता और न ही डॉक्टर से बातचीत या पेशेवर मीटर से की गई माप की जगह लेता है।',
  'tools.about.privacy': 'सब कुछ आपके डिवाइस पर गिना जाता है। कैमरे की तस्वीर कहीं भी न भेजी जाती है, न सहेजी जाती है — स्टोरेज तक सिर्फ़ गिनी हुई संख्याएँ पहुँचती हैं।',

  'tools.data.title': 'डेटा',
  'tools.data.subtitle': 'सब कुछ इसी ब्राउज़र के स्टोरेज में पड़ा है और यहाँ से कहीं नहीं जाता।',
  'tools.data.summary.empty': 'अभी कोई सहेजी हुई माप नहीं है।',
  'tools.data.summary': 'स्टोरेज में: {points} और {sessions}।',
  'tools.data.export.csv': 'CSV एक्सपोर्ट करें',
  'tools.data.export.json': 'JSON एक्सपोर्ट करें',
  'tools.data.clear': 'इतिहास मिटाएँ',
  'tools.data.reset': 'डिफ़ॉल्ट सेटिंग',
  'tools.data.reset.title': 'डिफ़ॉल्ट सेटिंग लौटाएँ?',
  'tools.data.reset.text': 'रूप-रंग, सीमाएँ, कैलिब्रेशन और माप की सेटिंग अपनी शुरुआती हालत में लौट जाएँगी। आपकी माप का इतिहास अछूता रहता है।',
  'tools.data.reset.confirm': 'लौटाएँ',
  'tools.data.reset.toast': 'डिफ़ॉल्ट सेटिंग लौटा दी गईं',
  'tools.data.wipe': 'सारा डेटा हटाएँ',
  'tools.data.wipe.title': 'ऐप का सारा डेटा हटाएँ?',
  'tools.data.wipe.text': 'ये चले जाएँगे: माप का पूरा इतिहास और सत्रों की सूची, आपकी सीमाएँ और कैलिब्रेशन, तथा रूप-रंग की सेटिंग। ऐप उसी हालत में लौट जाएगा जिसमें वह पहली बार खुलने पर था।',
  'tools.data.wipe.note': 'इस डेटा की हमारे पास कोई प्रति नहीं है — यह कभी इस डिवाइस से बाहर गया ही नहीं, इसलिए इसे कहीं से लौटाया नहीं जा सकता।',
  'tools.data.wipe.check': 'मुझे पता है कि इसे वापस नहीं लाया जा सकता',
  'tools.data.wipe.confirm': 'सब कुछ हटाएँ',
  'tools.data.wipe.toast': 'ऐप का सारा डेटा हटा दिया गया',
  'tools.data.wipe.announce': 'ऐप का सारा डेटा हटा दिया गया। सेटिंग डिफ़ॉल्ट पर लौट आई हैं।',
  'tools.data.storage.blocked': 'यह ब्राउज़र कुछ भी स्थायी रूप से सहेजने नहीं देता (निजी मोड, या साइट का डेटा बंद)। यहाँ आप जो भी सेट करेंगे, टैब बंद करते ही चला जाएगा।',
  'tools.data.storage.full': 'ब्राउज़र का स्टोरेज भर गया है और नई माप अब सहेजी नहीं जा रही। इतिहास मिटाने से जगह ख़ाली हो जाएगी।',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'सहयोग',
  'support.free.title': 'सब कुछ उपलब्ध है',
  'support.free.lead': 'सातों मापदंड, पूरा इतिहास, सीमाएँ, कैलिब्रेशन और एक्सपोर्ट पहली बार खोलने से ही काम करते हैं — न खाता, न कोई हद, न कोई शुल्क।',
  'support.free.note': 'माप पूरी तरह इसी डिवाइस पर होती है और बिना नेटवर्क के चलती है। यहाँ कोई बेहतर संस्करण दीवार के पीछे नहीं रखा गया है।',
  'support.why.title': 'मैं यह क्यों माँग रहा हूँ',
  'support.why.lead': 'प्रकाश मॉनिटर काम के बाद बचे घंटों में बनता है, इसके पीछे न कोई विज्ञापन है, न प्रायोजक, न कोई कंपनी। सहयोग से वह समय निकलता है जो सुधारों में, नए मापदंडों में और जो पहले से चल रहा है उसे चलाए रखने में लगता है।',
  'support.what.title': 'दान से आपको क्या मिलता है',
  'support.what.lead': 'कुछ नहीं। दान से कुछ नहीं खुलता — न कोई अतिरिक्त सुविधा, न नाम के आगे कोई बिल्ला, न कोई प्राथमिकता। ऐप जो कुछ कर सकता है, वह आपके पास पहले से है।',
  'support.what.note': 'बस इतना बचता है कि मुझे पता चल जाता है कि यह किसी के काम आया। यही सचमुच काफ़ी बड़ी वजह है।',
  'support.cta.title': 'अगर आप मदद करना चाहें',
  'support.cta.button': 'मुझे एक कॉफ़ी पिलाएँ',
  'support.cta.nolink': 'दान का प्रोफ़ाइल अभी जुड़ा नहीं है। जब जुड़ेगा, तब इसी जगह एक बटन खड़ा होगा।',
  'support.cta.privacy': 'यह लिंक एक बाहरी साइट (उदाहरण के लिए Buy Me a Coffee) नए टैब में खोलता है। यही एकमात्र क्षण है जब कुछ भी इस डिवाइस से बाहर जाता है — माप ख़ुद हमेशा यहीं रहती है।',
  'support.cta.privacyFuture': 'जैसे ही पता जुड़ेगा, बटन एक बाहरी साइट (उदाहरण के लिए Buy Me a Coffee) नए टैब में खोलेगा। यही एकमात्र क्षण होगा जब कुछ भी इस डिवाइस से बाहर जाएगा — माप ख़ुद हमेशा यहीं रहती है।',
  'support.cta.note': 'यहाँ न कोई उलटी गिनती है, न याद दिलाने वाले संदेश, न कोई विंडो जो अपने आप खुल जाए। यह गुज़ारिश सिर्फ़ इसी टैब पर इंतज़ार करती है।',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'पिछला मिनट',
  'gauge.aria': '{metric}: {value}, ज़ोन: {zone}',
  'gauge.aria.note': '{metric}: {value}, ज़ोन: {zone}, {note}',
  'gauge.aria.initial': '{metric}: कोई डेटा नहीं',
  'gauge.value.none': 'कोई डेटा नहीं',
  /* Odczyt słowny z jednostką: „27 प्रतिशत”, „1.20 गुना”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'अनुमानित मान',
  'gauge.note.offScale': 'पैमाने से बाहर',
  'gauge.metric.unknown': 'अज्ञात मापदंड',

  'chart.aria.label': 'माप के इतिहास का ग्राफ़',
  'chart.hint': 'इंटरैक्टिव ग्राफ़। बाएँ और दाएँ तीर रीडिंग कर्सर को सरकाते हैं, Home और End अवधि के आरंभ और अंत पर ले जाते हैं, Escape कर्सर छिपा देता है।',
  'chart.empty.title': 'कोई डेटा नहीं',
  'chart.empty.text': 'माप शुरू करें — पहली रीडिंग के बाद ग्राफ़ दिखने लगेगा।',
  'chart.few.title': 'डेटा बहुत कम है',
  'chart.few.text': 'हमारे पास एक रीडिंग है: {value}। रेखा खींचने के लिए दो चाहिए।',
  'chart.legend.line': 'माप',
  'chart.legend.gap': 'माप में अंतराल',
  'chart.aria.head': 'ग्राफ़: {metric}, अवधि {range}',
  'chart.aria.empty': 'इस अवधि में कोई डेटा नहीं।',
  'chart.aria.one': 'एक रीडिंग: {value}।',
  'chart.aria.summary': '{min} से {max} तक, औसत {avg}, {points}।',
  'chart.aria.gaps': 'शृंखला में अंतराल हैं — तब हम माप नहीं रहे थे।',
  'chart.readout.empty': 'इस अवधि में कोई डेटा नहीं।',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'ग्राफ़ खींचने के लिए डेटा बहुत कम है।',
  'chart.readout.hint': 'किसी एक माप को पढ़ने के लिए ग्राफ़ पर उँगली सरकाएँ या तीर बटनों का इस्तेमाल करें।',
  'chart.time.now': 'अभी',
  'chart.time.justNow': 'अभी-अभी',
  'chart.time.ago': '{duration} पहले',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} \u00B7 {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd zegar dwunastogodzinny z „am”, bo tak
     hinduskie ustawienia regionalne formatują godzinę. */
  'chart.sample.ago': '\u221230\u00A0मिनट',
  'chart.sample.clock': '12:00 am',
  'chart.sample.date': '30\u00A0अप्रैल',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'नीले का हिस्सा',
  'metric.share.short': 'हम जो रोशनी देखते हैं, उसका कितना भाग नीले चैनल पर पड़ता है।',
  'metric.share.help': 'यह रंग को चमक से अलग करता है — नाइट मोड चालू करने पर यही मान बदलता है।',
  'metric.brightness.name': 'दृश्य की चमक',
  'metric.brightness.short': 'कैमरे की तस्वीर की औसत चमक।',
  'metric.brightness.help': 'यह सापेक्ष मान है, लक्स नहीं — कैमरे का अपने आप चलने वाला एक्सपोज़र इसे नीचे से खिसकाता रहता है।',
  'metric.kelvin.name': 'रंग तापमान',
  'metric.kelvin.short': 'रोशनी गर्म है या ठंडी।',
  'metric.kelvin.help': '3000 K से नीचे रोशनी गर्म होती है और शाम को नरम पड़ती है। 6500 K ज़्यादातर स्क्रीनों की डिफ़ॉल्ट सफ़ेदी है।',
  'metric.melanopic.name': 'सर्कैडियन असर',
  'metric.melanopic.short': 'यह रोशनी शरीर की जैविक घड़ी पर कितनी ज़ोर से असर डालती है।',
  'metric.melanopic.help': 'मेलानोपिक अनुपात का एक अनुमान। 1.00 तटस्थ दिन की सफ़ेदी है; शाम को 0.50 से नीचे जाना ठीक रहता है।',
  'metric.flicker.name': 'झिलमिलाहट',
  'metric.flicker.short': 'रोशनी के स्रोत की न दिखने वाली धड़कन।',
  'metric.flicker.help': 'सस्ते डिमर और बैकलाइट धड़कते हैं। आँख इसे देख नहीं पाती, पर यह थकान और सिरदर्द की जानी-मानी वजह है।',
  'metric.uniformity.name': 'एकरूपता',
  'metric.uniformity.short': 'रोशनी फ़्रेम में एक-सी फैली है या नहीं।',
  'metric.uniformity.help': 'स्क्रीन पर कम मान का मतलब बैकलाइट का रिसना या कोई परावर्तन है; मेज़ पर — ग़लत जगह रखा हुआ लैंप।',
  'metric.comfort.name': 'आँखों का आराम',
  'metric.comfort.short': 'छह संख्याओं की जगह एक अंक।',
  'metric.comfort.help': 'यह बाक़ी मापों को 0 से 100 तक के अंक में समेटता है और दिखाता है कि उसे सबसे ज़्यादा कौन गिराता है। भार हमारा संपादकीय आकलन हैं, कोई मानक नहीं।',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'सुरक्षित',
  'zone.warn': 'मध्यम',
  'zone.crit': 'हानिकारक',
  'zone.none': 'कोई डेटा नहीं',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 अग॰'). Postać z CLDR, razem ze
     znakiem skrócenia „॰” — cztery miesiące o krótkich nazwach zapisuje się
     w całości. */
  'date.month.short.1': 'जन॰',
  'date.month.short.2': 'फ़र॰',
  'date.month.short.3': 'मार्च',
  'date.month.short.4': 'अप्रैल',
  'date.month.short.5': 'मई',
  'date.month.short.6': 'जून',
  'date.month.short.7': 'जुल॰',
  'date.month.short.8': 'अग॰',
  'date.month.short.9': 'सित॰',
  'date.month.short.10': 'अक्टू॰',
  'date.month.short.11': 'नव॰',
  'date.month.short.12': 'दिस॰',

  'date.clock': '{hours}:{minutes}',
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0{year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0घंटे',
  'time.duration.hourMinute': '{hours}\u00A0घंटे {minutes}\u00A0मिनट',
  'time.duration.hour': '{hours}\u00A0घंटे',
  'time.duration.minuteSecond': '{minutes}\u00A0मिनट {seconds}\u00A0सेकंड',
  'time.duration.minute': '{minutes}\u00A0मिनट',
  'time.duration.second': '{seconds}\u00A0सेकंड',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „अभी-अभी”. */
  'time.justNow': 'अभी-अभी',
  'time.aMinuteAgo': 'एक मिनट पहले',
  'time.minutesAgo': '{minutes}\u00A0मिनट पहले',
  'time.hoursAgo': '{hours}\u00A0घंटे पहले',
  'time.yesterday': 'कल',
  'time.daysAgo': '{days}\u00A0दिन पहले',

  /* Formy zależne od liczby. Hindi ma w CLDR dwie: `one` i `other`.
     Rozstrzyga je Intl.PluralRules dla języka aktywnego. */
  'time.days.plural': { one: 'दिन', other: 'दिन' },
  'unit.sample.plural': { one: 'नमूना', other: 'नमूने' },
  'unit.measurement.plural': { one: 'माप', other: 'माप' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Hindi w obu zdaniach stawia tę samą formę — oba klucze zostają (kształt
     słownika jest wspólny dla wszystkich języków), a wartości są tu
     identyczne. */
  'unit.session.plural': { one: 'सत्र', other: 'सत्र' },
  'unit.session.accusative.plural': { one: 'सत्र', other: 'सत्र' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy — po hindi także dwa różne słowa: बिंदु na wykresie, अंक w wyniku. */
  'unit.chartPoint.plural': { one: 'बिंदु', other: 'बिंदु' },
  'unit.point.plural': { one: 'अंक', other: 'अंक' },
  'unit.kelvin.plural': { one: 'केल्विन', other: 'केल्विन' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „प्रतिशत”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'प्रतिशत',
  'unit.spoken.times': 'गुना',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'कैमरे के इस्तेमाल की अनुमति नहीं मिली। अपने ब्राउज़र की सेटिंग में इस पेज के लिए कैमरे की अनुमति दें और फिर कोशिश करें।',
  'camera.error.notfound': 'कोई कैमरा नहीं मिला। जाँचें कि डिवाइस में कैमरा है और वह सिस्टम में बंद तो नहीं है।',
  'camera.error.inuse': 'कैमरा किसी दूसरे ऐप में व्यस्त है। उस ऐप या टैब को बंद करें और फिर कोशिश करें।',
  'camera.error.insecure': 'कैमरा सिर्फ़ HTTPS पर या localhost पर चलता है। इस पेज को “https://” से शुरू होने वाले पते पर खोलें।',
  'camera.error.unsupported': 'यह ब्राउज़र यहाँ कैमरा उपलब्ध नहीं कराता। Chrome या Safari में, सामान्य विंडो में कोशिश करें — किसी दूसरे ऐप के अंदर लगे प्रीव्यू में नहीं।',
  'camera.error.unknown': 'कैमरा शुरू नहीं किया जा सका।'
};
