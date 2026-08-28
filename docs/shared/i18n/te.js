/* docs/shared/i18n/te.js — słownik WSPÓLNY, telugu.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest telugu.
 *
 * SKĄD TE ZDANIA: przekład z polskiej redakcji pierwotnej (pl.js), z angielskim
 * (en.js) jako wzorcem terminologii i rejestru. Nazwy siedmiu wielkości oddano
 * przyjętymi terminami naukowymi telugu — వర్ణ ఉష్ణోగ్రత (temperatura barwowa),
 * మిణుకు (migotanie), మెలనోపిక్ నిష్పత్తి (współczynnik melanopiczny),
 * దైనందిన లయ (rytm dobowy), ఏకరూపత (równomierność) — po jednym odpowiedniku
 * na pojęcie w całym pliku. Zdanie o rozporządzeniu (UE) 2017/745 i zdania
 * o prywatności przetłumaczono wiernie: bez skracania i bez zmiany mocy
 * sformułowań. Separatorem dziesiętnym jest kropka, tak jak w telugu (0.50).
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — i tak ma zostać
 * w każdym z trzydziestu języków (patrz docs/shared/README.md, rozdział
 * „Warstwa językowa”). Klucza, którego nie ma w angielskim, nie wolno tu
 * dopisać: angielski jest wartością zapasową, więc to on wyznacza zestaw.
 */
window.I18nData = window.I18nData || {};
window.I18nData['te'] = Object.assign(window.I18nData['te'] || {}, {

  /* Nazwa własna — nie tłumaczy się jej, ale wchodzi jako wstawka w zdanie
     o rozporządzeniu (UE) 2017/745, gdzie stoi w mianowniku. */
  'app.name': 'కాంతి మానిటర్',

  /* ---- wybór języka ---- */

  'language.label': 'భాష',
  'language.help': 'యాప్ మొత్తానికి భాష. అన్ని భాషలూ ఇప్పటికే ఈ పరికరంలోనే ఉన్నాయి — ఏదీ డౌన్‌లోడ్ కాదు, ఎక్కడికీ ఏదీ పంపబడదు.',
  'language.auto': 'పరికరం ప్రకారం',
  'language.autoHint': 'ఫోన్‌లో లేదా బ్రౌజర్‌లో పెట్టిన భాష ప్రకారం.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'నీలి వాటా',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'శాతం',
  'metric.share.short': 'కనిపించే కాంతిలో ఎంత భాగం నీలి ఛానెల్‌పై పడుతుందో.',
  'metric.share.help': 'ఇది రంగును ప్రకాశం నుండి వేరు చేస్తుంది — నైట్ మోడ్ ఆన్ చేసినప్పుడు మారేది ఈ విలువే.',

  'metric.brightness.name': 'దృశ్య ప్రకాశం',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'శాతం',
  'metric.brightness.short': 'కెమెరా చిత్రం సగటు ప్రకాశం.',
  'metric.brightness.help': 'ఇది సాపేక్ష విలువ, లక్స్ కాదు — కెమెరా ఆటో ఎక్స్‌పోజర్ దీన్ని లోపల మారుస్తూ ఉంటుంది.',

  'metric.kelvin.name': 'వర్ణ ఉష్ణోగ్రత',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'కెల్విన్',
  'metric.kelvin.short': 'కాంతి వెచ్చగా ఉందా, చల్లగా ఉందా.',
  'metric.kelvin.help': '3000 K కంటే దిగువన కాంతి వెచ్చగా, సాయంత్రం వేళ మృదువుగా ఉంటుంది. చాలా స్క్రీన్‌ల డిఫాల్ట్ తెలుపు 6500 K.',

  'metric.melanopic.name': 'దైనందిన లయ ప్రభావం',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'రెట్లు',
  'metric.melanopic.short': 'ఈ కాంతి జీవ గడియారంపై ఎంత బలంగా పనిచేస్తుందో.',
  'metric.melanopic.help': 'ఇది మెలనోపిక్ నిష్పత్తికి ఒక అంచనా. 1.00 అంటే తటస్థ పగటి తెలుపు; సాయంత్రం 0.50 కంటే దిగువకు రావడం మేలు.',

  'metric.flicker.name': 'మిణుకు',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'శాతం',
  'metric.flicker.short': 'కాంతి మూలం కంటికి కనిపించకుండా మిణుకుమనడం.',
  'metric.flicker.help': 'చౌక డిమ్మర్లూ బ్యాక్‌లైట్లూ మిణుకుమంటాయి. కన్ను దాన్ని చూడదు, కానీ అది అలసటకూ తలనొప్పికీ తెలిసిన కారణం.',

  'metric.uniformity.name': 'ఏకరూపత',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'శాతం',
  'metric.uniformity.short': 'ఫ్రేమ్‌లో కాంతి సమానంగా పరుచుకుందా.',
  'metric.uniformity.help': 'స్క్రీన్‌పై తక్కువ విలువ అంటే బ్యాక్‌లైట్ కారడం లేదా ప్రతిబింబం; బల్లపై అయితే దీపాన్ని సరిగా పెట్టకపోవడం.',

  'metric.comfort.name': 'కంటి సౌకర్యం',
  'metric.comfort.unit': 'పాయింట్లు',
  'metric.comfort.unitSpoken': 'పాయింట్లు',
  'metric.comfort.short': 'ఆరు సంఖ్యల బదులు ఒకే అంచనా.',
  'metric.comfort.help': 'ఇది మిగతా కొలతలను 0–100 స్కోరుగా కలిపి, దాన్ని ఎక్కువగా తగ్గించేది ఏమిటో చూపుతుంది. బరువులు మా సంపాదకీయ అంచనా, ప్రమాణం కాదు.',

  'comfort.penalty.melanopic': 'దైనందిన లయ ప్రభావం',
  'comfort.penalty.kelvin': 'చల్లని కాంతి రంగు',
  'comfort.penalty.flicker': 'మిణుకు',
  'comfort.penalty.uniformity': 'అసమాన వెలుతురు',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': 'కెమెరాను ఆన్ చేయడానికి “Start” నొక్కండి.',
  'engine.starting': 'కెమెరాను ప్రారంభిస్తున్నాం…',

  'engine.error.permission': 'కెమెరాను వాడటానికి అనుమతి లేదు. బ్రౌజర్ సెట్టింగ్‌లలో కెమెరాకు అనుమతి ఇచ్చి, మళ్ళీ “Start” నొక్కండి.',
  'engine.error.notFound': 'కెమెరా కనబడలేదు. పరికరంలో కెమెరా ఉందో లేదో, అది సిస్టమ్‌లో ఆఫ్ చేసి లేదో చూడండి.',
  'engine.error.busy': 'కెమెరా వేరే యాప్‌లో వాడుకలో ఉంది. దాన్ని మూసి మళ్ళీ ప్రయత్నించండి.',
  'engine.error.unknown': 'కెమెరాను ప్రారంభించడం సాధ్యం కాలేదు.',
  'engine.error.unsupported': 'ఈ బ్రౌజర్ ఈ పేజీకి కెమెరాను అందుబాటులో ఉంచదు. యాప్‌ను HTTPS ద్వారా తెరవండి లేదా వేరే బ్రౌజర్ వాడండి.',

  /* ---- strefy ---- */

  'zone.good': 'పరిధిలో',
  'zone.warning': 'జాగ్రత్త',
  'zone.critical': 'క్లిష్టం',
  'zone.none': 'డేటా లేదు',
  'zone.settling': 'స్థిరపడుతోంది',

  'zone.spoken.good': 'పరిధిలో',
  'zone.spoken.warning': 'జాగ్రత్త',
  'zone.spoken.critical': 'క్లిష్టం',
  'zone.spoken.none': 'డేటా లేదు',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'పాయింట్లు',
  'unit.hertz': 'Hz',
  'unit.second': 'సె.',
  'unit.minute': 'ని.',
  'unit.hour': 'గం.',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'ఈ కాంతి బాగానే ఉంది — మీరు పెట్టిన హద్దులను ఏదీ దాటడం లేదు.',
  'verdict.noValue': 'ఈ రాశిని ఇప్పుడు కొలవడం కుదరడం లేదు. లెన్స్‌ను ఏదైనా కప్పి ఉందేమో చూడండి.',
  'verdict.warmup': 'అంచనా తేలుస్తున్నాం — ఫోన్‌ను ఇంకొంచెం సేపు కదపకుండా పట్టుకోండి.',

  'verdict.warning.share': 'ఈ కాంతిలో మంచి భాగం నీలి ఛానెల్‌పై పడుతోంది. సాయంత్రం దాన్ని మసకబార్చడం మేలు.',
  'verdict.warning.brightness': 'దృశ్యం ప్రకాశంగా ఉంది — కెమెరా తన కొలత హద్దుకు దగ్గరగా పనిచేస్తోంది.',
  'verdict.warning.kelvin': 'కాంతి కొంచెం చల్లగా ఉంది. సాయంత్రం 2700 K చుట్టుపక్కల బల్బు మృదువుగా ఉంటుంది.',
  'verdict.warning.melanopic': 'ఈ కాంతి జీవ గడియారంపై కొంచెం బలంగా పనిచేస్తుంది.',
  'verdict.warning.flicker': 'కాంతి మూలం స్పష్టంగా మిణుకుమంటోంది.',
  'verdict.warning.uniformity': 'ఫ్రేమ్‌లో కాంతి అసమానంగా పరుచుకుంది.',
  'verdict.warning.comfort': 'కంటి సౌకర్యం తగ్గింది — దీనికి కొన్ని విషయాలు కలిసి కారణమయ్యాయి.',

  'verdict.critical.share': 'నీలం చాలా ఎక్కువ. సాయంత్రం నైట్ మోడ్ ఆన్ చేయండి లేదా కాంతి మూలాన్ని మార్చండి.',
  'verdict.critical.brightness': 'దృశ్యం చాలా ప్రకాశంగా ఉంది. కాంతి మూలం వైపు నేరుగా చూస్తూ కొలవకండి.',
  'verdict.critical.kelvin': 'కాంతి చల్లగా ఉంది. సాయంత్రం ఇదే కళ్ళను ఎక్కువగా అలసిపోయేలా చేస్తుంది — వెచ్చని బల్బు లేదా నైట్ మోడ్ ఉపయోగపడతాయి.',
  'verdict.critical.melanopic': 'ఈ కాంతి జీవ గడియారంపై బలంగా పనిచేస్తుంది. సాయంత్రం 0.50 కంటే దిగువకు రావడం మేలు.',
  'verdict.critical.flicker': 'కాంతి మూలం బలంగా మిణుకుమంటోంది. ఇది కంటి అలసటకూ తలనొప్పికీ తెలిసిన కారణం.',
  'verdict.critical.uniformity': 'కాంతి చాలా అసమానంగా పరుచుకుంది. దీపం ఉంచిన తీరును లేదా స్క్రీన్‌పై ప్రతిబింబాలను చూడండి.',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'కంటి సౌకర్యం తక్కువగా ఉంది. దాన్ని ఏది తగ్గిస్తోందో చూడటానికి స్కోరు వివరణ చూడండి.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'ఈ సంఖ్య ఏమి చెప్పదు',
  'note.warningTitle': 'జాగ్రత్త',
  'note.dashTitle': 'ఈ కొలత ఏమి కాదు',
  'note.dashText': 'ఫోన్ కెమెరాకు మూడు వెడల్పాటి వర్ణ ఛానెళ్ళూ ఆటోమేటిక్ వైట్ బ్యాలెన్స్‌ ఉంటాయి — అది వర్ణపటాన్ని కొలవదు. వర్ణ ఉష్ణోగ్రతా, దైనందిన లయ ప్రభావమూ sRGB రంగుల నుండి లెక్కించిన అంచనాలు. తేడాలనూ కాలక్రమంలో వచ్చే మార్పులనూ ఈ యాప్ బాగా చూపుతుంది; ఇది మీటరుకు ప్రత్యామ్నాయం కాదు, ఏ నిర్ధారణా చేయదు.',
  'note.approxLegend': '≈ అంచనా విలువ — వర్ణపట కొలత నుండి కాక, sRGB రంగుల నుండి లెక్కించినది.',
  'note.kelvinOutOfRange': 'పద్ధతి పరిధి దాటింది — ఈ రంగు వద్ద వర్ణ ఉష్ణోగ్రత సూత్రం నమ్మదగినది కాకుండా పోతుంది.',
  'note.flickerOutOfRange': 'పద్ధతి పరిధి దాటింది — {rate} Hz నమూనా సేకరణ {limit} Hz కంటే తక్కువ మిణుకును మాత్రమే చూడగలదు. విద్యుత్ సరఫరాలోని 100 Hz మిణుకు దీని అందుబాటులో లేదు, యాప్ దాన్ని ఎప్పుడూ ఫలితంగా చూపదు.',
  'note.helpTitle': 'ఈ సంఖ్య ఏమి చెప్పదు',
  'note.helpText': 'ఫోన్ కెమెరాకు మూడు వెడల్పాటి ఛానెళ్ళు ఉంటాయి, అది వర్ణపటాన్ని కొలవదు. ఈ విలువ ఒక పోలిక సూచిక — వేర్వేరు కాంతుల మధ్య తేడాలనూ కాలక్రమంలో వచ్చే మార్పులనూ ఇది బాగా చూపుతుంది, కానీ ఇది ప్రయోగశాల కొలత కాదు, వైద్య సమాచారమూ కాదు.',
  'note.calibration': 'కాలిబ్రేషన్ లేని కొలత — విలువలను పోలిక కోసమే తీసుకోండి.',

  'note.howToTitle': 'అర్థవంతంగా ఎలా కొలవాలి',
  'note.howTo.hold.title': 'ఫోన్‌ను కదపకుండా పట్టుకోండి',
  'note.howTo.hold.text': 'ఆటోమేటిక్ ఎక్స్‌పోజర్ స్థిరపడటానికి 2–3 సెకన్లు కావాలి.',
  'note.howTo.aim.title': 'వెలుతురు పడిన ఉపరితలం వైపు గురిపెట్టండి',
  'note.howTo.aim.text': 'తెల్ల కాగితం లేదా లేత రంగు గోడ. కాంతి మూలం వైపు నేరుగా చూస్తూ కొలవకండి.',
  'note.howTo.compare.title': 'పోల్చండి, సంపూర్ణంగా తీర్పు చెప్పకండి',
  'note.howTo.compare.text': 'వెలుతురు మార్చక ముందూ మార్చిన తర్వాతా అదే దృశ్యం — ఒక్క సంఖ్య కంటే ఎక్కువ చెబుతుంది.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest przepisane co do słowa z dotychczasowej redakcji. To
     sformułowanie, przy którym rozporządzenie (UE) 2017/745 uznaje
     przeznaczenie medyczne za wykluczone — nie skraca się go dla stylu. */

  'legal.noDiagnosis': 'ఏ ఫలితమూ రోగ నిర్ధారణ కాదు, ఆరోగ్య సలహా కాదు.',
  'legal.mdr': '{app} నియంత్రణ (EU) 2017/745 అర్థంలో వైద్య పరికరం కాదు, ఏ రోగ స్థితినైనా నిర్ధారించడానికి, నివారించడానికి, పర్యవేక్షించడానికి లేదా చికిత్స చేయడానికి ఉద్దేశించినది కాదు, అలాగే అది వైద్యుని లేదా ఆప్టోమెట్రిస్టు పరీక్షకు ప్రత్యామ్నాయం కాదు.',

  /* ---- prywatność ---- */

  'privacy.title': 'ఈ పరికరం నుండి ఏమి బయటకు వెళ్తుంది',
  'privacy.short': 'ఈ యాప్‌లో ఏదీ నెట్‌వర్క్‌కు ఏమీ పంపదు. ప్రతి సంఖ్యా ఈ పరికరంలోనే తయారవుతుంది, ఇక్కడే ఉండిపోతుంది.',
  'privacy.onDevice': 'మీరు బటన్ నొక్కిన తర్వాతే కెమెరా మొదలవుతుంది, చిత్రం ఎప్పుడూ ఈ పరికరం నుండి బయటకు వెళ్ళదు.',
  'privacy.external': 'యాప్ మొత్తంలో ఏదైనా ఈ పరికరం నుండి బయటకు వెళ్ళే ఏకైక చోటు ఇదే: బటన్ ఒక బయటి పేజీని కొత్త ట్యాబ్‌లో తెరుస్తుంది, అదీ మీరు దాన్ని నొక్కిన తర్వాతే. కొలతలు, చరిత్ర, సెట్టింగ్‌లు ఇక్కడే ఉంటాయి.',
  'privacy.externalPending': 'చిరునామా అందుబాటులోకి వచ్చాక, బటన్ ఒక బయటి పేజీని కొత్త ట్యాబ్‌లో తెరుస్తుంది. ఏదైనా ఈ పరికరం నుండి బయటకు వెళ్ళే ఏకైక క్షణం అదే అవుతుంది. కొలతలు, చరిత్ర, సెట్టింగ్‌లు ఇక్కడే ఉంటాయి.',
  'privacy.storageBlocked': 'ఈ బ్రౌజర్ ఏదీ సేవ్ చేయనివ్వదు (ప్రైవేట్ మోడ్, లేదా సైట్ డేటా నిరోధించి ఉంది). కొలవడం పనిచేస్తుంది, కానీ ట్యాబ్ మూసేయగానే చరిత్ర మాయమవుతుంది.',

  /* ---- liczebniki ----
     Telugu ma dwie kategorie CLDR: one (1) i other (cała reszta, w tym 0
     i ułamki). Liczba mnoga rzeczownika jest regularna — „సెకను / సెకన్లు”.
     Formę wybiera Intl.PluralRules('te'), nie nasza reguła. */

  'count.readings': { one: '{n} రీడింగ్', other: '{n} రీడింగ్‌లు' },
  'count.sessions': { one: '{n} కొలత', other: '{n} కొలతలు' },
  'count.seconds': { one: '{n} సెకను', other: '{n} సెకన్లు' },
  'count.minutes': { one: '{n} నిమిషం', other: '{n} నిమిషాలు' },
  'count.hours': { one: '{n} గంట', other: '{n} గంటలు' },
  'count.days': { one: '{n} రోజు', other: '{n} రోజులు' }
});
