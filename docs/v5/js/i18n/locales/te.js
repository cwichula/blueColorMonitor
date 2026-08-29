/* Monitor Światła v5 — słownik telugu.
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr). NIE JEST
 * KALKĄ żadnego z nich: polskie i angielskie zdania przełożono na naturalne
 * telugu, a nie słowo w słowo. Zachowane zostało to, co niesie znaczenie:
 * liczby, progi, jednostki, nazwy wstawek i — co do treści — zastrzeżenia
 * medyczne oraz zdania o prywatności. Tych ostatnich nie wolno osłabiać ani
 * wzmacniać: „nie zastępuje rozmowy z lekarzem” ma po telugu znaczyć dokładnie
 * tyle samo, a „obraz nie opuszcza urządzenia” nie może stać się obietnicą
 * szerszą niż polska.
 *
 * REJESTR: standardowe telugu pisane, tryb uprzejmy -ండి w zdaniach
 * zwracających się do użytkownika. Przyciski są krótkie i stoją w trybie
 * rozkazującym prostym (ఆపు, మూసివేయి, పునరుద్ధరించు) — tak pisze telugu
 * w systemie i w przeglądarce; teksty pomocy są pełnymi zdaniami.
 *
 * CYFRY: łacińskie (0–9), przecinek tysięcy i kropka dziesiętna. Nie jest to
 * wybór estetyczny, tylko zgodność z resztą ekranu: `Intl.NumberFormat('te')`
 * i `Intl.DateTimeFormat('te')` — czyli wszystkie wartości pomiarów, godziny
 * i lata z format.js — dają cyfry łacińskie i zegar dwunastogodzinny z AM/PM.
 * Stąd „0.50 ×”, a nie „0,50 ×”. Symbole jednostek (%, K, ×, Hz)
 * i identyfikatory techniczne (CSV, JSON, sRGB, PWM, HTTPS, localhost, Chrome,
 * Safari, Home, End, Escape, Buy Me a Coffee) zostają bez zmian.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych):
 *   నీలి కాంతి వాటా, దృశ్య ప్రకాశం, వర్ణ ఉష్ణోగ్రత, సర్కేడియన్ ప్రభావం
 *   (w opisie: మెలనోపిక్ నిష్పత్తి), ఫ్లికర్, ఏకరూపత, దృష్టి సౌకర్యం.
 *   Pojedyncza wielkość to సూచిక, pomiar to కొలత, próg to పరిమితి, odczyt to
 *   రీడింగ్, wykres to గ్రాఫ్, kalibracja to క్రమాంకనం, pamięć to నిల్వ.
 *   Słowo పరిమితి jest zarezerwowane dla progu — „bez limitów” na ekranie
 *   wsparcia mówi więc హద్దులు లేవు, żeby te dwa pojęcia się nie zlały.
 * STREFY: సురక్షితం / మధ్యస్థం / హానికరం — tak jak angielskie safe/moderate/
 * harmful mówią o świetle, a nie o stanie aplikacji, i wchodzą w zdanie
 * „జోన్: {zone}”.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Tekst ze wstawką {nazwa}'   — napis zwykły,
 *   'klucz.kropkowany': { one, other }               — forma zależna od liczby.
 * Telugu ma w CLDR dwie kategorie: `one` i `other`
 * (Intl.PluralRules('te') → ['one', 'other']) i naprawdę odmienia rzeczownik
 * w liczbie mnogiej (కొలత → కొలతలు), więc obie formy są tu różne. Nazwy
 * wstawek są identyczne jak w pl.js — pilnuje tego keys.test.js. Kolejność
 * wstawek w zdaniu wolno zmieniać, nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'కాంతి మానిటర్',
  'app.description': 'కాంతి మానిటర్ — మీ చుట్టూ ఉన్న కాంతిని కెమెరాతో ఏడు సూచికల్లో కొలుస్తుంది. అంతా ఈ పరికరంలోనే లెక్కించబడుతుంది; నెట్‌వర్క్‌కు ఏదీ వెళ్లదు.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — కాంతి మానిటర్',
  'app.skipToContent': 'ముఖ్య కంటెంట్‌కు వెళ్లు',
  'app.nav.aria': 'ప్రధాన నావిగేషన్',
  'app.noscript.title': 'ఈ యాప్‌కు JavaScript అవసరం',
  'app.noscript.text': 'కొలత మొత్తం ఈ బ్రౌజర్ ట్యాబ్‌లోనే జరుగుతుంది: కెమెరా ఫ్రేమ్‌లను చదివి, వాటి నుంచి ఏడు కాంతి సూచికలను లెక్కించేది JavaScript. అది లేకపోతే కొలిచేందుకు ఏమీ ఉండదు. ఈ పేజీకి JavaScript ఆన్ చేసి మళ్లీ తెరవండి — అప్పుడు కూడా నెట్‌వర్క్‌కు ఏదీ పంపబడదు.',

  'nav.measure': 'కొలత',
  'nav.history': 'చరిత్ర',
  'nav.tools': 'సాధనాలు',
  'nav.support': 'మద్దతు',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'కొలుస్తోంది',
  'shell.live.aria': 'కొలుస్తోంది. {metric}: {value}. కొలత స్క్రీన్‌కు తిరిగి వెళ్లండి.',
  'shell.live.metricFallback': 'ప్రధాన సూచిక',
  'shell.action.fallback': 'స్క్రీన్ చర్య',

  'shell.loadFail.title': '“{screen}” స్క్రీన్‌ను లోడ్ చేయలేకపోయాం',
  'shell.loadFail.text': 'పరికర నిల్వలో కొన్ని ఫైళ్లు లేకపోవడమే కారణం కావచ్చు. నెట్‌వర్క్‌కు కనెక్ట్ అయి పేజీని రీలోడ్ చేయండి.',
  'shell.fatal.title': 'ఏదో తప్పు జరిగింది',
  'shell.fatal.text': 'యాప్ ఈ స్క్రీన్‌ను రూపొందించలేకపోయింది. పేజీని రీలోడ్ చేస్తే సాధారణంగా సరిపోతుంది — సేవ్ చేసిన కొలతలు, సెట్టింగ్‌లు ఉన్నచోటే ఉంటాయి.',
  'shell.fatal.reload': 'పేజీని రీలోడ్ చేయి',
  'shell.boot.failTitle': 'యాప్ ప్రారంభం కాలేదు',
  'shell.boot.failText': 'షెల్ ప్రారంభం కాలేదు. పేజీని రీలోడ్ చేయండి — సేవ్ చేసిన కొలతలు, సెట్టింగ్‌లు ఉన్నచోటే ఉంటాయి.',
  'shell.background.error': 'నేపథ్యంలో ఏదో పాడైంది',
  'shell.background.action': 'రీలోడ్',
  'shell.update.title': 'కొత్త వెర్షన్ అందుబాటులో ఉంది',
  'shell.update.action': 'రీలోడ్',

  'onboarding.title': 'మొదలుపెట్టే ముందు',
  'onboarding.lead': 'కాంతి మానిటర్ మీ చుట్టూ ఉన్న కాంతిని కెమెరాతో చూసి, దాని నుంచి ఏడు సూచికలను లెక్కిస్తుంది — నీలి కాంతి వాటా నుంచి దృష్టి సౌకర్యం వరకు.',
  'onboarding.privacy': 'చిత్రం ఈ పరికరాన్ని వదిలి వెళ్లదు: సర్వర్ లేదు, ఖాతా లేదు, అప్‌లోడ్ చేసేదీ ఏమీ లేదు. ఏడు సూచికలూ వెంటనే పనిచేస్తాయి — సైన్-ఇన్ అక్కర్లేదు, రుసుము లేదు.',
  'onboarding.honesty': 'ఇది ఒక అంచనా మాత్రమే; కొలిచే పరికరమూ కాదు, వైద్య పరీక్షా కాదు. కొలవలేని దాన్ని చూపించం — సంఖ్యకు బదులు ఒక గీత కనిపిస్తుంది.',
  'onboarding.start': 'మొదలుపెడదాం',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'వర్తింపజేయి',
  'overlay.toast.close': 'సందేశాన్ని మూసివేయి',
  'overlay.sheet.label': 'డైలాగ్',
  'overlay.sheet.close': 'మూసివేయి',
  'overlay.dialog.confirm': 'నిర్ధారించు',
  'overlay.dialog.cancel': 'రద్దు',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'రద్దు',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'కొలత',

  'measure.intro.aria': 'కొలత ప్రారంభించు',
  'measure.intro.headline': 'మీపై ఎలాంటి కాంతి పడుతోందో చూడండి',
  'measure.intro.lead': 'ఇప్పుడు మీపై పడుతున్న కాంతిలో నీలం ఎంత ఉందో — ఈ పూట దాన్ని ఎక్కువ అనాలో కాదో కెమెరా చూపిస్తుంది.',
  'measure.intro.start': 'కొలత ప్రారంభించు',
  'measure.intro.hint': 'కెమెరా వాడేందుకు బ్రౌజర్ అనుమతి అడుగుతుంది. అనుమతి ఇచ్చిన క్షణమే కొలత మొదలవుతుంది.',
  'measure.intro.privacy': 'కెమెరా చిత్రం ఈ పరికరంలోనే ప్రాసెస్ అవుతుంది, ఎప్పుడూ దాన్ని వదిలి వెళ్లదు. ఒక్క ఫ్రేమ్‌ను కూడా మేం పంపం, భద్రపరచం, పంచుకోం.',

  'measure.live.aria': 'కొలత జరుగుతోంది',
  'measure.badge.starting': 'ప్రారంభమవుతోంది',
  'measure.badge.paused': 'పాజ్‌లో',
  'measure.badge.running': 'కొలుస్తోంది',
  'measure.stale': 'చిత్రం కోసం వేచి ఉన్నాం — యాప్ నేపథ్యంలో ఉన్నప్పుడు ప్రివ్యూ ఆగిపోతుంది.',
  'measure.crop': 'ఫ్రేమ్ మధ్య భాగాన్ని కొలుస్తాం — చిత్రం వెడల్పు, ఎత్తులలో గుర్తు పెట్టిన {percent} %.',
  'measure.facing.front': 'ముందు కెమెరా',
  'measure.facing.back': 'వెనుక కెమెరా',

  'measure.boot.title': 'కెమెరా ప్రారంభమవుతోంది…',
  'measure.boot.text': 'బ్రౌజర్ అనుమతి అడిగితే ఇవ్వండి — చిత్రం లేకుండా కొలిచేందుకు ఏమీ ఉండదు. ఈ అనుమతి ఈ పేజీకి మాత్రమే వర్తిస్తుంది, తర్వాత మీరు దాన్ని ఉపసంహరించుకోవచ్చు.',
  'measure.boot.cancel': 'రద్దు',

  'measure.hold': 'రీడింగ్‌లు స్తంభించాయి. కెమెరా పనిచేస్తూనే ఉంది, కానీ చరిత్రకు గానీ సగటులకు గానీ ఏదీ చేరదు.',
  'measure.gridHint': 'ఆ సూచికను పెద్ద గేజ్‌పైకి తేవడానికి ఒక టైల్‌ను ఎంచుకోండి.',

  'measure.stop': 'ఆపు',
  'measure.pause': 'పాజ్',
  'measure.resume': 'కొనసాగించు',
  'measure.flip.aria': 'కెమెరా మార్చు',
  'measure.flip.toBack': 'వెనుక కెమెరాకు మారు',
  'measure.flip.toFront': 'ముందు కెమెరాకు మారు',

  'measure.fail.aria': 'కెమెరా లోపం',
  'measure.fail.headline': 'కెమెరా ప్రారంభం కాలేదు',
  'measure.fail.retry': 'మళ్లీ ప్రయత్నించు',
  'measure.fail.back': 'వెనక్కి',
  'measure.fail.savedSession': 'అంతరాయానికి ముందటి సెషన్ ({duration}) చరిత్రలో సేవ్ అయింది.',
  'measure.error.fallback': 'కెమెరాను ప్రారంభించలేకపోయాం.',

  'measure.summary.aria': 'సెషన్ సారాంశం',
  'measure.summary.title': 'సెషన్ సారాంశం',
  'measure.summary.paused': '{duration} పాజ్‌లో',
  'measure.summary.nothingMeasured': 'ఏ సూచికా రీడింగ్ సేకరించలేదు — సెషన్ అంతటా కెమెరాకు కాంతి కనిపించలేదు.',
  'measure.summary.note': 'సగటులు పాజ్ వెలుపల తీసిన నమూనాలను మాత్రమే లెక్కలోకి తీసుకుంటాయి. ఒక్కసారీ కొలవని సూచికలను వదిలేస్తాం, సున్నాగా లెక్కించం.',
  'measure.summary.nearThreshold': 'పరిమితికి అత్యంత దగ్గరగా',
  'measure.summary.worstPoint': 'బలహీనమైన అంశం',
  'measure.summary.averageZone': 'సగటున {zone}',
  'measure.summary.tooShort': 'సెషన్ {duration} సాగింది — దానంతట అదే చరిత్రలోకి చేరేంత సేపు కాదు. మీరు దీన్ని చేతితో సేవ్ చేసుకోవచ్చు.',
  'measure.summary.again': 'మళ్లీ కొలుద్దాం',
  'measure.summary.save': 'చరిత్రలో సేవ్ చేయి',
  'measure.summary.saved': 'చరిత్రలో సేవ్ అయింది',
  'measure.summary.savedToast': 'సెషన్ చరిత్రలో సేవ్ అయింది.',
  'measure.summary.close': 'మూసివేయి',

  'measure.method.title': 'దీన్ని ఎలా కొలుస్తాం',
  'measure.method.p1': 'యాప్ కెమెరా చిత్రాన్ని సెకనుకు పది సార్లు నమూనాగా తీసుకుని, ఫ్రేమ్ మధ్యలోని {percent} % నుంచి సూచికలను లెక్కిస్తుంది — ప్రివ్యూలోని గురిగుర్తు సరిగ్గా ఆ ప్రాంతాన్నే చూపుతుంది.',
  'measure.method.p2': 'ఫోన్ కెమెరాకు మూడు వెడల్పాటి ఛానెళ్లు, దానికవే పనిచేసే ఎక్స్‌పోజర్, వైట్ బ్యాలెన్స్ సర్దుబాట్లు ఉంటాయి. అది కాంతి నిష్పత్తులను చూస్తుంది, దాని వర్ణపటాన్ని కాదు.',
  'measure.method.p3': 'నీలి కాంతి వాటా, ప్రకాశం, ఫ్లికర్, ఏకరూపత — ఇవి కెమెరా నిజంగా కొలిచేవి. వర్ణ ఉష్ణోగ్రత, సర్కేడియన్ ప్రభావం మాత్రం sRGB ప్రాథమిక రంగుల నుంచి లెక్కించిన బాహాటమైన అంచనాలు.',
  'measure.method.p4': 'ఫ్లికర్ నాలుగు హెర్ట్జ్ కంటే తక్కువ ఉన్నప్పుడే కనిపిస్తుంది. విద్యుత్ లైన్ ఇచ్చే 100 Hz ఈ నమూనా వేగానికి చాలా అందనిది, కాబట్టి అది ఎప్పుడూ రీడింగ్‌గా చూపబడదు.',
  'measure.method.p5': 'ఈ సంఖ్యల్లో ఏదీ ఫోటోమెట్రిక్ కొలత కాదు, వైద్య ఫలితమూ కాదు. కెమెరా చిత్రం ఈ పరికరాన్ని వదిలి వెళ్లదు.',
  'measure.method.ok': 'అర్థమైంది',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'కెమెరా ప్రారంభం రద్దయింది.',
  'measure.announce.stoppedNoSamples': 'కొలత ఆగింది. ఒక్క నమూనా కూడా సేకరించలేదు.',
  'measure.announce.stopped': 'కొలత ఆగింది. సెషన్ సారాంశం సిద్ధంగా ఉంది.',
  'measure.announce.interrupted': 'కొలతకు అంతరాయం కలిగింది. సెషన్ సారాంశం సిద్ధంగా ఉంది.',
  'measure.announce.paused': 'కొలత పాజ్ అయింది. రీడింగ్‌లు స్తంభించాయి.',
  'measure.announce.resumed': 'కొలత తిరిగి మొదలైంది.',
  'measure.announce.switchedFront': 'ముందు కెమెరాకు మారింది. కొత్త సెషన్ మొదలవుతోంది.',
  'measure.announce.switchedBack': 'వెనుక కెమెరాకు మారింది. కొత్త సెషన్ మొదలవుతోంది.',
  'measure.announce.lead': 'ప్రధాన సూచిక: {metric}.',
  'measure.announce.cameraError': 'కెమెరా లోపం. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'సెషన్ అంతటా కాంతి సురక్షిత పరిధిలోనే ఉంది — దీపాన్ని ఉన్నట్టే ఉంచండి, చీకటి పడ్డాక వేరే మూలం పనిచేసేటప్పుడు మళ్లీ చూడండి.',
  'measure.advice.share.evening': 'నీలి కాంతి వాటా సగటున {value} — స్క్రీన్‌లపై నైట్ మోడ్ ఆన్ చేసి, పైన ఉన్న లైట్ ఆర్పి, బల్ల ఎత్తులో ఒక వెచ్చని దీపం మాత్రం ఉంచండి.',
  'measure.advice.share.day': 'నీలి కాంతి వాటా సగటున {value} — పగటిపూట ఇది ఫర్వాలేదు, కానీ నిద్రకు రెండు గంటల ముందు స్క్రీన్ తనంతట తానే వెచ్చని మోడ్‌కు మారేలా పెట్టుకోండి.',
  'measure.advice.brightness': 'ఫ్రేమ్ మరీ ఎక్కువ వెలుగులో పడింది (సగటున {value}) — కాంతి మూలం నుంచి కాస్త దూరం జరగండి లేదా కొలుస్తున్న స్క్రీన్ ప్రకాశాన్ని తగ్గించండి; అంత ఎక్స్‌పోజర్ వద్ద మిగతా సూచికలు కూడా కచ్చితత్వం కోల్పోతాయి.',
  'measure.advice.kelvin.evening': 'కాంతి వర్ణ ఉష్ణోగ్రత సగటున {value} వద్ద నిలిచింది — చీకటి పడ్డాక 3000 K కంటే కిందికి దిగండి: దీపాన్ని వెచ్చని మోడ్‌కు మార్చండి లేదా 2700 K బల్బు వేయండి.',
  'measure.advice.kelvin.day': 'కాంతి వర్ణ ఉష్ణోగ్రత సగటున {value} వద్ద నిలిచింది — పగటికి ఇది మంచి, చురుకుదనం కలిగించే తెలుపు; కానీ సాయంత్రం అదే దీపాన్ని 2700 K కు మార్చండి.',
  'measure.advice.melanopic.evening': 'సర్కేడియన్ ప్రభావం సగటున {value} — నిద్రకు ముందున్న రెండు గంటల్లో 0.50 × కంటే కిందికి దిగండి: ప్రధాన కాంతిని మసకచేసి, పైకప్పు నుంచి కాకుండా బల్ల ఎత్తు నుంచి వెలుగు పడేలా చూడండి.',
  'measure.advice.melanopic.day': 'సర్కేడియన్ ప్రభావం సగటున {value} — ఈ వేళప్పుడు ఆ మోతాదు మేలు చేస్తుంది, కానీ సాయంత్రం ఈ మూలాన్ని బలహీనమైన, వెచ్చని దానితో మార్చండి.',
  'measure.advice.flicker': 'ఫ్లికర్ సగటున {value} వరకు చేరింది — సాధారణంగా దీనికి కారణం డిమ్మర్ లేదా మరీ తగ్గించిన బ్యాక్‌లైట్: స్క్రీన్ ప్రకాశాన్ని 40 % పైకి పెంచండి లేదా PWM వాడని డిమ్మర్‌తో మార్చండి.',
  'measure.advice.uniformity': 'కాంతి అసమానంగా పడింది (సగటున {value}) — ఒకే బలమైన మూలానికి బదులు, దీపాన్ని బల్లకు పక్కగా పెట్టి, ఎదురు వైపు నుంచి రెండో బలహీన మూలాన్ని జోడించండి.',
  'measure.advice.comfort': 'దృష్టి సౌకర్యం సగటున {value} వచ్చింది — ఒకే ఒక్క మార్పుతో మొదలుపెట్టండి: ప్రధాన మూలం ప్రకాశాన్ని సగానికి తగ్గించి, ఆ తర్వాతే కాంతి రంగు గురించి ఆలోచించండి.',
  'measure.advice.default': 'మీ వెలుతురులో ఒక్క విషయం మార్చి మళ్లీ కొలవండి — ఒక్క రీడింగ్ కంటే రెండు సెషన్ల పోలిక ఎక్కువ చెబుతుంది.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'చరిత్ర',
  'history.action.export': 'చరిత్రను ఎగుమతి చేయి',

  'history.metricGroup.aria': 'సూచిక ఎంపిక',
  'history.announce.metric': 'సూచిక: {metric}',
  'history.rangeGroup.aria': 'కాల పరిధి',
  'history.range.aria': 'గత {range}',

  'history.stats.title': 'పరిధి గణాంకాలు',
  'history.stats.head': '{metric}\u00A0—\u00A0గత {range}',
  'history.stats.note': 'గ్రాఫ్‌లో కనిపించే దాని నుంచే లెక్కించాం. కొలత లేని సమయం లెక్కలోకి రాదు — దాని స్థానంలో సున్నా పెట్టం.',
  'history.stat.min': 'కనిష్ఠం',
  'history.stat.avg': 'సగటు',
  'history.stat.max': 'గరిష్ఠం',
  'history.trend.up': 'ఈ పరిధిలో పెరుగుతోంది',
  'history.trend.flat': 'స్పష్టమైన మార్పు లేదు',
  'history.trend.down': 'ఈ పరిధిలో తగ్గుతోంది',
  'history.trend.none': 'పోల్చడానికి ఏమీ లేదు',

  'history.sessions.title': 'కొలత సెషన్లు',
  'history.sessions.count': '{sessions}, కొత్తవి ముందుగా',
  'history.sessions.empty': 'ఇంకా ఒక్క సెషన్ కూడా లేదు',
  'history.sessions.hint': 'కొలత ఆపగానే సెషన్ సేవ్ అవుతుంది.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'పరిధి: {range}',
  'history.session.noMeasure': 'కొలత లేదు',

  'history.data.title': 'డేటా',
  'history.data.subtitle': 'చరిత్ర ఈ పరికరంలో మాత్రమే భద్రపరచబడుతుంది.',
  'history.export.csv': 'CSV ఎగుమతి',
  'history.export.json': 'JSON ఎగుమతి',
  'history.export.ok': 'ఫైల్ సేవ్ చేయడానికి సిద్ధం',
  'history.export.fail': 'ఫైల్‌ను సిద్ధం చేయలేకపోయాం. ప్రైవేట్ మోడ్‌లో, అలాగే మరో యాప్‌లో పొదిగిన విండోలో బ్రౌజర్ సేవ్ చేయడాన్ని అడ్డుకుంటుంది — పేజీని సాధారణ ట్యాబ్‌లో తెరవండి.',
  'history.export.sheet.title': 'చరిత్ర ఎగుమతి',
  'history.export.sheet.text': 'CSV స్ప్రెడ్‌షీట్‌లో తెరుచుకుంటుంది (సెమికోలన్ విభాజకం, దశాంశ గుర్తుగా కామా). JSON అన్నింటినీ నిలుపుకుంటుంది — సెషన్ల జాబితా, కొలత లేని ఖాళీలతో సహా.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'చరిత్రను తుడిచివేయి',
  'history.clear.title': 'చరిత్రను తుడిచివేయాలా?',
  'history.clear.text': 'ఇది {points}, {sessions} తొలగిస్తుంది. దీన్ని వెనక్కి తీసుకోలేం — డేటా ఉంచుకోవాలనుకుంటే ముందు ఎగుమతి చేసుకోండి.',
  'history.clear.confirm': 'తుడిచివేయి',
  'history.clear.announce': 'చరిత్ర తుడిచివేయబడింది.',
  'history.clear.toast': 'చరిత్ర తుడిచివేయబడింది',

  'history.empty.title': 'ఇంకా చూపించడానికి ఏమీ లేదు',
  'history.empty.text': 'మీరు కొలుస్తున్న కొద్దీ చరిత్ర నిండుతుంది — సెకనుకు ఒక బిందువు. అంతా ఈ పరికరంలోనే ఉంటుంది.',
  'history.empty.action': 'కొలతకు వెళ్లు',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 నిమి',
  'range.5m': '5 నిమి',
  'range.1h': '1 గం',
  'range.24h': '24 గం',
  'range.7d': '7 రోజులు',
  'range.30d': '30 రోజులు',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'తేదీ, సమయం',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'పరికర నిల్వ నిండిపోయింది — కొత్త కొలతలు ఇక సేవ్ కావడం లేదు.',
  'storage.blocked': 'చరిత్రను సేవ్ చేయడానికి బ్రౌజర్ అనుమతించడం లేదు — ట్యాబ్ మూసిన వెంటనే డేటా పోతుంది.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'సాధనాలు',
  'tools.action.about': 'కొలత గురించి',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'భాష',
  'tools.language.subtitle': 'డిఫాల్ట్‌గా యాప్ మీ పరికర భాషను అనుసరిస్తుంది; ఈ జాబితా నుంచి చేసిన ఎంపిక వెంటనే అమలవుతుంది, ఈ బ్రౌజర్‌లో అలాగే ఉండిపోతుంది.',
  'tools.language.aria': 'ఇంటర్‌ఫేస్ భాష',
  'tools.language.system': 'ఆటో',
  'tools.language.announce': 'ఇంటర్‌ఫేస్ భాష: {language}.',

  'tools.appearance.title': 'రూపం',
  'tools.appearance.theme.title': 'థీమ్',
  'tools.appearance.theme.desc': '“ఆటో” మీ సిస్టమ్ సెట్టింగ్‌ను అనుసరిస్తుంది.',
  'tools.appearance.theme.aria': 'థీమ్',
  'tools.theme.system': 'ఆటో',
  'tools.theme.light': 'లేత',
  'tools.theme.dark': 'ముదురు',
  'tools.appearance.accent.title': 'యాక్సెంట్ రంగు',
  'tools.appearance.accent.desc': 'బటన్లు, ఎంపికలు, స్లయిడర్ల రంగు.',
  'tools.appearance.accent.aria': 'యాక్సెంట్ రంగు',
  'tools.appearance.textScale.title': 'అక్షరాల పరిమాణం',
  'tools.appearance.textScale.desc': 'కేవలం లేబుళ్లనే కాదు, ఇంటర్‌ఫేస్ మొత్తాన్ని పెద్దది చేస్తుంది.',
  'tools.appearance.textScale.aria': 'అక్షరాల పరిమాణం',
  'tools.appearance.density.title': 'సాంద్రత',
  'tools.appearance.density.desc': 'కాంపాక్ట్‌లో ఒకే స్క్రీన్‌పై ఎక్కువ కంటెంట్ పడుతుంది.',
  'tools.appearance.density.aria': 'లేఅవుట్ సాంద్రత',
  'tools.density.comfortable': 'సాధారణ',
  'tools.density.compact': 'కాంపాక్ట్',
  'tools.appearance.motion.title': 'కదలిక తక్కువ',
  'tools.appearance.motion.desc': 'యానిమేషన్లను, ముల్లు మృదువుగా కదలడాన్ని ఆపేస్తుంది. ఏమైనప్పటికీ మీ సిస్టమ్ సెట్టింగ్‌ను గౌరవిస్తాం.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'సముద్రం',
  'accent.violet': 'వైలెట్',
  'accent.amber': 'అంబర్',
  'accent.mint': 'పుదీనా',
  'accent.rose': 'గులాబీ',

  'tools.thresholds.title': 'పరిమితులు',
  'tools.thresholds.subtitle': 'ఏ విలువ నుంచి యాప్ “మధ్యస్థం” అనాలి, ఏ విలువ నుంచి “హానికరం” అనాలి. డిఫాల్ట్ పరిమితులు మా సూచన మాత్రమే, ప్రమాణం కాదు — మీకు తగ్గట్టు సర్దుకోండి.',
  'tools.thresholds.warn': 'హెచ్చరిక పరిమితి',
  'tools.thresholds.crit': 'అలారం పరిమితి',
  'tools.thresholds.warn.aria': 'హెచ్చరిక పరిమితి — {metric}',
  'tools.thresholds.crit.aria': 'అలారం పరిమితి — {metric}',
  'tools.thresholds.reset': 'డిఫాల్ట్‌లు',
  'tools.thresholds.reset.aria': 'డిఫాల్ట్ పరిమితులను పునరుద్ధరించు: {metric}',
  'tools.thresholds.moved': '{threshold} {value} కు జరిగింది.',
  'tools.thresholds.resetAll': 'అన్ని పరిమితులను పునరుద్ధరించు',
  'tools.thresholds.resetAll.title': 'డిఫాల్ట్ పరిమితులను పునరుద్ధరించాలా?',
  'tools.thresholds.resetAll.text': 'ఏడు సూచికలూ యాప్ సూచించిన పరిమితులకు తిరిగి వెళ్తాయి. మీ కొలత చరిత్ర మాత్రం అలాగే ఉంటుంది.',
  'tools.thresholds.resetAll.confirm': 'పునరుద్ధరించు',
  'tools.thresholds.resetAll.cancel': 'నావే ఉంచు',
  'tools.thresholds.resetAll.toast': 'పరిమితులు డిఫాల్ట్‌లకు తిరిగి వచ్చాయి',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': '{warn} కంటే ఎక్కువ',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} అంతకంటే తక్కువ',
  'tools.zoneRange.goodBelow': '{warn} కంటే తక్కువ',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} అంతకంటే ఎక్కువ',

  'tools.calibration.title': 'క్రమాంకనం',
  'tools.calibration.subtitle': 'పోల్చుకోవడానికి ఏదైనా ఉన్నవాళ్ల కోసం.',
  'tools.calibration.intro': 'ఒకే దీపం వైపు చూపిన రెండు ఫోన్లు కొద్దిగా వేర్వేరు సంఖ్యలు చూపుతాయి — ప్రతి సెన్సార్‌కూ దానిదైన రంగుజాడ ఉంటుంది. మీరు నమ్మే రీడింగ్ చేతిలో ఉంటే, ఇక్కడ చిత్రంలోని ఒక్కో ఛానెల్‌ను కాస్త పైకో కిందికో సర్దవచ్చు. ఈ గుణకాలు ఏదైనా లెక్కించడానికి ముందే పనిచేస్తాయి, కాబట్టి ఏడు సూచికలనూ ఒకేసారి మారుస్తాయి.',
  'tools.calibration.neutral': 'పోల్చుకోవడానికి ఏమీ లేదా? 1.00 వద్దే ఉంచండి — అదే ఫ్యాక్టరీ సెట్టింగ్, దానివల్ల ఏదీ చెడదు.',
  'tools.calibration.forward': 'ఈ మార్పు ఇక నుంచి వర్తిస్తుంది. చరిత్రలో ఇప్పటికే ఉన్న కొలతలు సేవ్ అయిన క్షణంలో ఎలా ఉన్నాయో అలాగే ఉంటాయి — వాటిని మళ్లీ లెక్కించం, ఎందుకంటే అది జరిగిపోయిన డేటాను తిరగరాయడమే అవుతుంది.',
  'tools.calibration.reset': 'క్రమాంకనాన్ని రీసెట్ చేయి',
  'tools.calibration.reset.toast': 'క్రమాంకనం రీసెట్ అయింది',
  'tools.calibration.channel.r': 'ఎరుపు ఛానెల్',
  'tools.calibration.channel.g': 'ఆకుపచ్చ ఛానెల్',
  'tools.calibration.channel.b': 'నీలం ఛానెల్',
  'tools.calibration.channel.aria': '{channel} — క్రమాంకన గుణకం',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'కొలత',
  'tools.measurement.wake.title': 'స్క్రీన్ ఆన్‌లోనే ఉంచు',
  'tools.measurement.wake.desc': 'కొలిచేటప్పుడు స్క్రీన్ ఆరిపోదు. అప్పుడు బ్యాటరీ వేగంగా తగ్గుతుంది.',
  'tools.measurement.wake.unsupported': 'స్క్రీన్ ఆరిపోకుండా ఉంచడానికి ఈ బ్రౌజర్ అనుమతించదు.',
  'tools.measurement.haptics.title': 'వైబ్రేషన్',
  'tools.measurement.haptics.desc': 'ప్రారంభంలో, ఆపినప్పుడు, సూచిక మారినప్పుడు చిన్న నిర్ధారణ.',
  'tools.measurement.haptics.unsupported': 'ఈ పరికరంలో వైబ్రేషన్ మోటార్ ఉన్నట్టు కనిపించడం లేదు.',

  'tools.about.title': 'కొలత గురించి',
  'tools.about.subtitle': 'ఏడు సూచికల్లో ఒక్కొక్కటి కచ్చితంగా ఏం లెక్కిస్తుంది, ఈ పద్ధతి నిజాయితీ ఎక్కడ ఆగిపోతుంది.',
  'tools.about.scale': 'స్కేల్: {min} నుంచి {max} వరకు.',
  'tools.about.threshold': '{warn} నుంచి హెచ్చరిస్తాం, {crit} నుంచి అలారం ఇస్తాం.',
  'tools.about.thresholdInvert': '{warn} కంటే కిందికి దిగితే హెచ్చరిస్తాం, {crit} కంటే కిందికి దిగితే అలారం ఇస్తాం.',
  'tools.about.limitsHead': 'ఈ కొలత ఏం చేయలేదు',
  'tools.about.limit.spectrum.title': 'కొలిచే పరికరంలా కెమెరా రంగులను చూడదు',
  'tools.about.limit.spectrum.text': 'ఫోన్ కెమెరాకు మూడే ఛానెళ్లు: ఎరుపు, ఆకుపచ్చ, నీలం. కాంతిని కొలిచే పరికరం వాటిని పదుల సంఖ్యలో సన్నని పట్టీలుగా విడదీస్తుంది. ఇక్కడ మీరు చూస్తున్నది ఆ మూడు సంఖ్యల నుంచి తీసినది — సహేతుకమైన పద్ధతిలోనే, కానీ అది ఇప్పటికీ ఒక లెక్కింపు మాత్రమే, కొలిచిన వర్ణపటం కాదు.',
  'tools.about.limit.exposure.title': 'కెమెరా తన ప్రకాశాన్ని తానే సర్దుకుంటుంది',
  'tools.about.limit.exposure.text': 'ఫోన్‌ను కిటికీ వైపు చూపితే, చిత్రం మరీ వెలిగిపోకుండా కెమెరా దాన్ని చీకటిగా చేస్తుంది. గదిలో ఏమీ మారకపోయినా అప్పుడు “దృశ్య ప్రకాశం” పడిపోతుంది. అందుకే ఈ విలువను గదుల మధ్య కాకుండా ఒకే షాట్ లోపలే పోల్చండి.',
  'tools.about.limit.flicker.title': 'నెమ్మదైన కెమెరా వేగమైన ఫ్లికర్‌ను పట్టుకోలేదు',
  'tools.about.limit.flicker.text': 'మేం చిత్రాన్ని సెకనుకు {hz} సార్లు చూస్తాం. సెకనుకు {nyquist} సార్ల కంటే వేగంగా కొట్టుకునేది ఇలాంటి కొలతలో నిజంగా ఉన్నదాని కంటే నెమ్మదిగా కనిపించవచ్చు, లేదా పూర్తిగా మాయమవ్వవచ్చు — విద్యుత్ లైన్ ఫ్లికర్ సరిగ్గా అంత వేగమైనదే. యాప్ ఏదైనా పట్టుకుంటే, దాన్ని కొలిచిన పౌనఃపున్యంగా కాక “ఇక్కడ ఏదో కొట్టుకుంటోంది” అనే సూచనగా తీసుకోండి.',
  'tools.about.limit.medical.title': 'ఇది వైద్య పరీక్షా కాదు, వైద్య సలహా కాదు',
  'tools.about.limit.medical.text': 'మీ చుట్టూ ఉన్న కాంతి చల్లగా, ప్రకాశంగా లేదా అస్థిరంగా ఉందని గమనించడంలో యాప్ సాయపడుతుంది, దాని గురించి ఏం చేయవచ్చో సూచిస్తుంది. ఇది మీ ఆరోగ్యం గురించి ఎలాంటి నిర్ధారణా ఇవ్వదు, వైద్యుడితో సంభాషణకు గానీ వృత్తిపరమైన మీటర్‌తో చేసే కొలతకు గానీ ప్రత్యామ్నాయం కాదు.',
  'tools.about.privacy': 'అంతా మీ పరికరంలోనే లెక్కించబడుతుంది. కెమెరా చిత్రం ఎక్కడికీ పంపబడదు, ఎక్కడా భద్రపరచబడదు — లెక్కించిన సంఖ్యలు మాత్రమే నిల్వకు చేరతాయి.',

  'tools.data.title': 'డేటా',
  'tools.data.subtitle': 'అంతా ఈ బ్రౌజర్ నిల్వలోనే ఉంటుంది, ఇక్కడి నుంచి ఎక్కడికీ వెళ్లదు.',
  'tools.data.summary.empty': 'ఇంకా సేవ్ చేసిన కొలతలు ఏవీ లేవు.',
  'tools.data.summary': 'నిల్వలో: {points}, {sessions}.',
  'tools.data.export.csv': 'CSV ఎగుమతి',
  'tools.data.export.json': 'JSON ఎగుమతి',
  'tools.data.clear': 'చరిత్రను తుడిచివేయి',
  'tools.data.reset': 'డిఫాల్ట్ సెట్టింగ్‌లు',
  'tools.data.reset.title': 'డిఫాల్ట్ సెట్టింగ్‌లను పునరుద్ధరించాలా?',
  'tools.data.reset.text': 'రూపం, పరిమితులు, క్రమాంకనం, కొలత సెట్టింగ్‌లు మొదటి స్థితికి తిరిగి వెళ్తాయి. మీ కొలత చరిత్ర మాత్రం అలాగే ఉంటుంది.',
  'tools.data.reset.confirm': 'పునరుద్ధరించు',
  'tools.data.reset.toast': 'డిఫాల్ట్ సెట్టింగ్‌లు పునరుద్ధరించబడ్డాయి',
  'tools.data.wipe': 'మొత్తం డేటాను తొలగించు',
  'tools.data.wipe.title': 'యాప్ డేటా మొత్తాన్ని తొలగించాలా?',
  'tools.data.wipe.text': 'పోయేవి: మొత్తం కొలత చరిత్ర, సెషన్ల జాబితా, మీ పరిమితులు, క్రమాంకనం, రూప సెట్టింగ్‌లు. యాప్ మొదటిసారి తెరిచినప్పటి స్థితికి తిరిగి వెళ్తుంది.',
  'tools.data.wipe.note': 'ఈ డేటాకు మా దగ్గర ప్రతి లేదు — అది ఎప్పుడూ ఈ పరికరాన్ని వదిలి వెళ్లలేదు, కాబట్టి తిరిగి తెచ్చుకునే చోటే లేదు.',
  'tools.data.wipe.check': 'దీన్ని వెనక్కి తీసుకోలేమని నాకు అర్థమైంది',
  'tools.data.wipe.confirm': 'అన్నీ తొలగించు',
  'tools.data.wipe.toast': 'యాప్ డేటా మొత్తం తొలగించబడింది',
  'tools.data.wipe.announce': 'యాప్ డేటా మొత్తం తొలగించబడింది. సెట్టింగ్‌లు డిఫాల్ట్‌లకు తిరిగి వచ్చాయి.',
  'tools.data.storage.blocked': 'ఈ బ్రౌజర్ దేన్నీ శాశ్వతంగా భద్రపరచనివ్వదు (ప్రైవేట్ మోడ్, లేదా సైట్ డేటా బ్లాక్ చేయబడింది). ఇక్కడ మీరు పెట్టుకున్నదంతా ట్యాబ్ మూసిన వెంటనే పోతుంది.',
  'tools.data.storage.full': 'బ్రౌజర్ నిల్వ నిండిపోయింది, కొత్త కొలతలు ఇక సేవ్ కావడం లేదు. చరిత్రను తుడిచివేస్తే చోటు ఖాళీ అవుతుంది.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'మద్దతు',
  'support.free.title': 'అంతా అందుబాటులో ఉంది',
  'support.free.lead': 'ఏడు సూచికలు, పూర్తి చరిత్ర, పరిమితులు, క్రమాంకనం, ఎగుమతి — అన్నీ మొదటిసారి తెరిచినప్పటి నుంచే పనిచేస్తాయి; ఖాతా అక్కర్లేదు, హద్దులు లేవు, రుసుము లేదు.',
  'support.free.note': 'కొలత పూర్తిగా ఈ పరికరంలోనే జరుగుతుంది, నెట్‌వర్క్ లేకుండానూ పనిచేస్తుంది. గోడ వెనుక దాచిపెట్టిన మెరుగైన వెర్షన్ ఇక్కడ లేదు.',
  'support.why.title': 'నేను ఎందుకు అడుగుతున్నాను',
  'support.why.lead': 'కాంతి మానిటర్ పని వేళల తర్వాత తయారవుతోంది; దీని వెనుక ప్రకటనలూ లేవు, స్పాన్సర్ లేడు, కంపెనీ లేదు. మీ మద్దతు లోపాల సవరణకు, కొత్త సూచికలకు, ఇప్పటికే పనిచేస్తున్నదాన్ని నిలబెట్టడానికి పట్టే సమయాన్ని భరిస్తుంది.',
  'support.what.title': 'విరాళంతో మీకు వచ్చేది',
  'support.what.lead': 'ఏమీ లేదు. విరాళం దేన్నీ తెరవదు — అదనపు ఫీచర్ లేదు, పేరు పక్కన బ్యాడ్జ్ లేదు, ప్రాధాన్యం లేదు. యాప్ చేయగలిగినదంతా ఇప్పటికే మీ దగ్గర ఉంది.',
  'support.what.note': 'మిగిలేది ఒక్కటే — ఇది ఎవరికో ఉపయోగపడిందని నాకు తెలియడం. నిజంగా అదే చాలు.',
  'support.cta.title': 'సాయం చేయాలనుకుంటే',
  'support.cta.button': 'నాకో కాఫీ కొనండి',
  'support.cta.nolink': 'విరాళాల ప్రొఫైల్ ఇంకా అనుసంధానం కాలేదు. అది వచ్చినప్పుడు ఈ చోట ఒక బటన్ నిలుస్తుంది.',
  'support.cta.privacy': 'ఈ లింక్ కొత్త ట్యాబ్‌లో బయటి Buy Me a Coffee పేజీని తెరుస్తుంది. ఈ పరికరాన్ని ఏదైనా వదిలి వెళ్లే ఏకైక క్షణం అదే — కొలత మాత్రం ఎప్పుడూ ఇక్కడే ఉంటుంది.',
  'support.cta.privacyFuture': 'చిరునామా అమరిన తర్వాత, ఆ బటన్ కొత్త ట్యాబ్‌లో బయటి Buy Me a Coffee పేజీని తెరుస్తుంది. ఈ పరికరాన్ని ఏదైనా వదిలి వెళ్లే ఏకైక క్షణం అదే అవుతుంది — కొలత మాత్రం ఎప్పుడూ ఇక్కడే ఉంటుంది.',
  'support.cta.note': 'ఇక్కడ కౌంట్‌డౌన్ లేదు, గుర్తుచేసే సందేశాలు లేవు, తనంతట తానే తెరుచుకునే విండో లేదు. ఈ అభ్యర్థన ఈ ట్యాబ్‌లో మాత్రమే వేచి ఉంటుంది.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'గత నిమిషం',
  'gauge.aria': '{metric}: {value}, జోన్: {zone}',
  'gauge.aria.note': '{metric}: {value}, జోన్: {zone}, {note}',
  'gauge.aria.initial': '{metric}: డేటా లేదు',
  'gauge.value.none': 'డేటా లేదు',
  /* Odczyt słowny z jednostką: „27 శాతం”, „1.20 రెట్లు”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'సుమారు విలువ',
  'gauge.note.offScale': 'స్కేల్ దాటి',
  'gauge.metric.unknown': 'తెలియని సూచిక',

  'chart.aria.label': 'కొలత చరిత్ర గ్రాఫ్',
  'chart.hint': 'ఇంటరాక్టివ్ గ్రాఫ్. ఎడమ, కుడి బాణాలు రీడింగ్ కర్సర్‌ను కదిలిస్తాయి; Home, End పరిధి మొదటికి, చివరికి తీసుకెళ్తాయి; Escape కర్సర్‌ను దాచిపెడుతుంది.',
  'chart.empty.title': 'డేటా లేదు',
  'chart.empty.text': 'కొలత మొదలుపెట్టండి — మొదటి రీడింగ్‌ల తర్వాత గ్రాఫ్ కనిపిస్తుంది.',
  'chart.few.title': 'డేటా సరిపోలేదు',
  'chart.few.text': 'మా దగ్గర ఒకే రీడింగ్ ఉంది: {value}. గీత గీయాలంటే రెండు కావాలి.',
  'chart.legend.line': 'కొలత',
  'chart.legend.gap': 'కొలతలో ఖాళీ',
  'chart.aria.head': 'గ్రాఫ్: {metric}, పరిధి {range}',
  'chart.aria.empty': 'ఈ పరిధిలో డేటా లేదు.',
  'chart.aria.one': 'ఒకే రీడింగ్: {value}.',
  'chart.aria.summary': '{min} నుంచి {max} వరకు, సగటు {avg}, {points}.',
  'chart.aria.gaps': 'ఈ శ్రేణిలో ఖాళీలు ఉన్నాయి — అప్పుడు మేం కొలవడం లేదు.',
  'chart.readout.empty': 'ఈ పరిధిలో డేటా లేదు.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'గ్రాఫ్ గీయడానికి డేటా సరిపోలేదు.',
  'chart.readout.hint': 'ఒక్క కొలతను చదవడానికి గ్రాఫ్‌పై లాగండి లేదా బాణం కీలను వాడండి.',
  'chart.time.now': 'ఇప్పుడు',
  'chart.time.justNow': 'ఇప్పుడే',
  'chart.time.ago': '{duration} క్రితం',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd zegar dwunastogodzinny z „AM”, bo tak
     telugu formatuje godzinę, i najdłuższy skrót miesiąca (సెప్టెం). */
  'chart.sample.ago': '\u221230\u00A0నిమి',
  'chart.sample.clock': '12:00 AM',
  'chart.sample.date': '30\u00A0సెప్టెం',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'నీలి కాంతి వాటా',
  'metric.share.short': 'మనం చూసే కాంతిలో నీలం ఛానెల్‌కు ఎంత వాటా.',
  'metric.share.help': 'ఇది రంగును ప్రకాశం నుంచి వేరు చేస్తుంది — నైట్ మోడ్ ఆన్ చేసినప్పుడు కదిలేది ఈ విలువే.',
  'metric.brightness.name': 'దృశ్య ప్రకాశం',
  'metric.brightness.short': 'కెమెరా చిత్రం సగటు ప్రకాశం.',
  'metric.brightness.help': 'ఇది సాపేక్ష విలువ, లక్స్ కాదు — కెమెరా ఆటో ఎక్స్‌పోజర్ దీన్ని లోలోపల కదిలిస్తుంది.',
  'metric.kelvin.name': 'వర్ణ ఉష్ణోగ్రత',
  'metric.kelvin.short': 'కాంతి వెచ్చగా ఉందా, చల్లగా ఉందా.',
  'metric.kelvin.help': '3000 K కంటే తక్కువైతే కాంతి వెచ్చగా, సాయంత్రం మెత్తగా ఉంటుంది. చాలా స్క్రీన్‌ల డిఫాల్ట్ తెలుపు 6500 K.',
  'metric.melanopic.name': 'సర్కేడియన్ ప్రభావం',
  'metric.melanopic.short': 'ఈ కాంతి శరీర గడియారంపై ఎంత గట్టిగా పనిచేస్తుంది.',
  'metric.melanopic.help': 'ఇది మెలనోపిక్ నిష్పత్తికి ఒక అంచనా. 1.00 అంటే తటస్థ పగటి తెలుపు; సాయంత్రం 0.50 కంటే కిందికి దిగడం మేలు.',
  'metric.flicker.name': 'ఫ్లికర్',
  'metric.flicker.short': 'కాంతి మూలం కనిపించకుండా కొట్టుకోవడం.',
  'metric.flicker.help': 'చౌక డిమ్మర్లు, బ్యాక్‌లైట్లు కొట్టుకుంటాయి. కన్ను దాన్ని చూడదు, కానీ అది అలసటకు, తలనొప్పికి తెలిసిన కారణం.',
  'metric.uniformity.name': 'ఏకరూపత',
  'metric.uniformity.short': 'ఫ్రేమ్ అంతటా కాంతి సమానంగా పరుచుకుందా.',
  'metric.uniformity.help': 'స్క్రీన్‌పై తక్కువ విలువ అంటే బ్యాక్‌లైట్ కారడం లేదా ప్రతిబింబం; బల్లపై అయితే — దీపాన్ని సరిగా పెట్టకపోవడం.',
  'metric.comfort.name': 'దృష్టి సౌకర్యం',
  'metric.comfort.short': 'ఆరు సంఖ్యలకు బదులు ఒకే స్కోరు.',
  'metric.comfort.help': 'ఇది మిగతా కొలతలను 0–100 స్కోరుగా కలిపి, దాన్ని ఎక్కువగా తగ్గించేది ఏమిటో చూపుతుంది. వెయిట్లు మా సంపాదకీయ అంచనా, ప్రమాణం కాదు.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'సురక్షితం',
  'zone.warn': 'మధ్యస్థం',
  'zone.crit': 'హానికరం',
  'zone.none': 'డేటా లేదు',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 ఆగ') — te same, które daje
     Intl.DateTimeFormat('te', { month: 'short' }). */
  'date.month.short.1': 'జన',
  'date.month.short.2': 'ఫిబ్ర',
  'date.month.short.3': 'మార్చి',
  'date.month.short.4': 'ఏప్రి',
  'date.month.short.5': 'మే',
  'date.month.short.6': 'జూన్',
  'date.month.short.7': 'జులై',
  'date.month.short.8': 'ఆగ',
  'date.month.short.9': 'సెప్టెం',
  'date.month.short.10': 'అక్టో',
  'date.month.short.11': 'నవం',
  'date.month.short.12': 'డిసెం',

  'date.clock': '{hours}:{minutes}',
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}, {year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0గం',
  'time.duration.hourMinute': '{hours}\u00A0గం {minutes}\u00A0నిమి',
  'time.duration.hour': '{hours}\u00A0గం',
  'time.duration.minuteSecond': '{minutes}\u00A0నిమి {seconds}\u00A0సె',
  'time.duration.minute': '{minutes}\u00A0నిమి',
  'time.duration.second': '{seconds}\u00A0సె',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „ఇప్పుడే”. */
  'time.justNow': 'ఇప్పుడే',
  'time.aMinuteAgo': 'నిమిషం క్రితం',
  'time.minutesAgo': '{minutes}\u00A0నిమి క్రితం',
  'time.hoursAgo': '{hours}\u00A0గం క్రితం',
  'time.yesterday': 'నిన్న',
  'time.daysAgo': '{days}\u00A0రోజుల క్రితం',

  /* Formy zależne od liczby. Telugu ma w CLDR dwie kategorie: `one` i `other`
     (Intl.PluralRules('te')), i rzeczownik naprawdę odmienia się w liczbie
     mnogiej (కొలత → కొలతలు), więc obie formy są tu różne. */
  'time.days.plural': { one: 'రోజు', other: 'రోజులు' },
  'unit.sample.plural': { one: 'నమూనా', other: 'నమూనాలు' },
  'unit.measurement.plural': { one: 'కొలత', other: 'కొలతలు' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Telugu znaczy biernik końcówką -ను, ale przy rzeczownikach nieżywotnych
     jest ona opcjonalna i w zdaniu „{points}, {sessions} తొలగిస్తుంది” brzmi
     ciężko — oba klucze zostają, a wartości są tu identyczne. */
  'unit.session.plural': { one: 'సెషన్', other: 'సెషన్లు' },
  'unit.session.accusative.plural': { one: 'సెషన్', other: 'సెషన్లు' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy — po telugu także dwa różne słowa: బిందువు i పాయింట్. */
  'unit.chartPoint.plural': { one: 'బిందువు', other: 'బిందువులు' },
  'unit.point.plural': { one: 'పాయింట్', other: 'పాయింట్లు' },
  'unit.kelvin.plural': { one: 'కెల్విన్', other: 'కెల్విన్లు' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „శాతం”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'శాతం',
  'unit.spoken.times': 'రెట్లు',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'కెమెరా వాడేందుకు అనుమతి రాలేదు. మీ బ్రౌజర్ సెట్టింగ్‌లలో ఈ పేజీకి కెమెరాను అనుమతించి మళ్లీ ప్రయత్నించండి.',
  'camera.error.notfound': 'కెమెరా కనిపించలేదు. పరికరానికి కెమెరా ఉందో లేదో, సిస్టమ్‌లో అది ఆఫ్ చేయబడిందో లేదో చూడండి.',
  'camera.error.inuse': 'కెమెరా మరో యాప్‌లో వాడుకలో ఉంది. ఆ యాప్‌ను లేదా ట్యాబ్‌ను మూసి మళ్లీ ప్రయత్నించండి.',
  'camera.error.insecure': 'కెమెరా HTTPS ద్వారా లేదా localhost లోనే పనిచేస్తుంది. ఈ పేజీని “https://” తో మొదలయ్యే చిరునామాలో తెరవండి.',
  'camera.error.unsupported': 'ఈ బ్రౌజర్ ఇక్కడ కెమెరాను అందించడం లేదు. Chrome లేదా Safari లో, సాధారణ విండోలో ప్రయత్నించండి — మరో యాప్‌లో పొదిగిన ప్రివ్యూలో కాదు.',
  'camera.error.unknown': 'కెమెరాను ప్రారంభించలేకపోయాం.'
};
