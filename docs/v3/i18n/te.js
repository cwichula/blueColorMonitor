/* docs/v3/i18n/te.js — słownik WŁASNY wersji v3, telugu.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/te.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * SKĄD TE ZDANIA: przekład z polskiego (pl.js tego katalogu), z angielskim
 * (en.js) jako wzorcem terminologii i rejestru. Nie jest to kalka żadnego
 * z nich: zdania przełożono na naturalne telugu, a wiernie — co do treści
 * i co do mocy sformułowań — oddano zastrzeżenia medyczne oraz akapity
 * o prywatności ('modules.04.limitsLead', 'modules.03.limits.3',
 * 'docs.privacyText', 'settings.offlineText', 'support.privacyText',
 * 'support.privacyPendingText', 'modules.09.whenNot').
 *
 * CZEGO TU NIE MA — i dlaczego: kluczy, które stoją już w słowniku wspólnym
 * (docs/shared/i18n/te.js). Nazwy stref, zdania oceniające, noty o granicach
 * metody, nazwy i opisy siedmiu wielkości oraz zastrzeżenie z rozporządzenia
 * (UE) 2017/745 są wspólne dla wersji i tłumaczy się je RAZ. Terminologia
 * stamtąd obowiązuje i tutaj, bez wyjątków: నీలి వాటా, దృశ్య ప్రకాశం,
 * వర్ణ ఉష్ణోగ్రత, దైనందిన లయ ప్రభావం (మెలనోపిక్ నిష్పత్తి), మిణుకు,
 * ఏకరూపత, కంటి సౌకర్యం; strefy పరిధిలో / జాగ్రత్త / క్లిష్టం; kalibracja
 * to కాలిబ్రేషన్ (jak w 'note.calibration'), a „wielkość” to రాశి (jak
 * w 'verdict.noValue'). Próg to konsekwentnie పరిమితి.
 *
 * REJESTR: standardowe telugu pisane, tryb uprzejmy -ండి w zdaniach zwróconych
 * do użytkownika. Klawisze, kafelki i nagłówki kolumn są krótkie i stoją
 * w prostym trybie rozkazującym (ఆపు, మూసివేయి, చూపించు); teksty pomocy są
 * pełnymi zdaniami.
 *
 * ZAPIS LICZB: cyfry łacińskie i kropka dziesiętna (0.50, 6500 K), bo tak
 * formatuje Intl.NumberFormat('te') — i tak samo pisze słownik wspólny.
 * Dotyczy to również liczb we wzorach: wzór czyta człowiek, nie parser.
 * Bez zmian zostają symbole i identyfikatory: %, K, ×, Hz, ms, nm, CSV, JSON,
 * sRGB, UTF-8, BOM, CIE XYZ, D65, IES, R, G, B, x, y, n, CCT, Y, mel oraz
 * nazwy własne (Excel, Escape, Buy Me a Coffee).
 *
 * ZESTAW KLUCZY wyznacza pl.js tego katalogu — pilnuje tego
 * docs/shared/i18n/keys.test.js. Klucza, którego tam nie ma, nie wolno tu
 * dopisywać.
 */
window.I18nData = window.I18nData || {};
window.I18nData['te'] = Object.assign(window.I18nData['te'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. Telugu nie zna
     wielkich liter — napis jest tu identyczny z 'app.name'. */
  'app.wordmark': 'కాంతి మానిటర్',

  'state.idle': 'సిద్ధం',
  'state.starting': 'ప్రారంభిస్తున్నాం',
  'state.running': 'కొలుస్తోంది',
  'state.runningTpl': 'కొలుస్తోంది {time}',
  'state.stopped': 'ఆగింది',
  'state.error': 'కెమెరా లోపం',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5.0 po telugu, 5,0 po polsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'కొలత ప్రారంభించు',
  'keys.starting': 'ప్రారంభిస్తున్నాం…',
  'keys.stop': 'ఆపు',
  'keys.flip': 'తిప్పు',
  'keys.flipAria': 'ముందు/వెనుక కెమెరా మార్చు',
  'keys.menu': 'మెనూ',
  'keys.menuAria': 'మాడ్యూళ్ళ జాబితా',
  'keys.back': '‹ వెనక్కి',
  'keys.backAria': 'డాష్‌బోర్డ్‌కు వెనక్కి',
  'keys.dash': 'డాష్‌బోర్డ్',
  'keys.zoom': 'ప్రివ్యూ పెద్దది చేయి',
  'keys.retry': 'మళ్ళీ ప్రయత్నించు',
  'keys.refresh': 'రిఫ్రెష్',
  'keys.close': 'మూసివేయి',
  'keys.show': 'చూపించు',
  'keys.apply': 'వర్తింపజేయి',
  'keys.remove': 'తొలగించు',

  'monitor.legend': 'నియంత్రణ ప్రివ్యూ',
  'monitor.badge': 'ప్రత్యక్షం',

  'aim.title': 'గురిపెట్టడం',
  'aim.hint': 'యాప్ కొలిచే చిత్ర భాగాన్ని ఈ ఫ్రేమ్ సరిగ్గా అలాగే చూపుతుంది.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'ప్రధాన ఛానెల్',
  'readout.thresholdTpl': '(పరిమితి {value})',
  'readout.contextTpl': 'కనిష్ఠం {min} · సగటు {avg} · గరిష్ఠం {max} — గత 60 సె.',
  'readout.contextEmpty': 'గత 60 సె. డేటా లేదు',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'దీని అర్థం: {name}',
  'aria.channel': '{name}, {value}, {zone}. పెద్ద డిస్‌ప్లేపై చూపించు.',
  'aria.channelStale': '{name}, డేటా లేదు. పెద్ద డిస్‌ప్లేపై చూపించు.',
  'aria.scale': 'స్కేల్: {name}, {min} నుండి {max} వరకు. ఇప్పుడు {value}, {zone}. జాగ్రత్త పరిమితి {warn}, క్లిష్ట పరిమితి {crit}.',
  'aria.readout': '{name}: {value}, {zone}.',
  'aria.readoutApprox': '{name}: సుమారు {value}, {zone}. అంచనా విలువ.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'ప్రధాన ఛానెల్ స్కేల్. డేటా లేదు',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': '“కొలత ప్రారంభించు” నొక్కి, వెలుతురు పడిన ఉపరితలం వైపు ఫోన్‌ను గురిపెట్టి, కొన్ని సెకన్లు కదపకుండా పట్టుకోండి.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'కంటి సౌకర్యం తక్కువగా ఉంది. దాన్ని ఏది తగ్గిస్తోందో చూడటానికి మాడ్యూల్ 01 చూడండి.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'స్క్రీన్ కింద ఉన్న “కొలత ప్రారంభించు” కీతో మొదలుపెట్టండి. మీరు నొక్కిన తర్వాతే కెమెరా ఆన్ అవుతుంది.',
  'transient.measureStopped': 'కొలత పూర్తయింది · {time} · చరిత్రలో సేవ్ అయింది.',
  'transient.newVersion': 'యాప్‌కు కొత్త వెర్షన్ వచ్చింది.',
  'transient.thresholdsSaved': 'పరిమితులు సేవ్ అయ్యాయి.',
  'transient.thresholdsRejected': 'సేవ్ కాలేదు — జాగ్రత్త పరిమితీ క్లిష్ట పరిమితీ ఒకదాన్నొకటి దాటకూడదు.',
  'transient.historyCleared': 'చరిత్ర తుడిచివేయబడింది.',

  'live.lead': 'ప్రధాన ఛానెల్: {name}, {value}, {zone}.',
  'live.ready': 'అంచనా సిద్ధం. {name} {value}, {zone}.',
  'live.started': 'కొలత మొదలైంది.',
  'livebar.stopped': 'కొలత ఆగింది',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'ఇంకా ఒక్క రికార్డు కూడా లేదు. కొలత జరుగుతున్నప్పుడే చరిత్ర రాయబడుతుంది — ఒక నిమిషం పాటు కొలిచి ఇక్కడికి తిరిగి రండి.',
  'empty.recorderNoRange': 'ఈ పరిధిలో కొలత జరగలేదు.',
  'empty.coverageTpl': '{total} గంటల్లో {done} గంటలు కొలత జరిగింది.',
  'empty.reportsNoData': 'కొలతలతో కూడిన మొదటి పూర్తి రోజు తర్వాత దైనందిన నివేదిక తయారవుతుంది.',
  'empty.compareOneSession': 'పోల్చడానికి పూర్తయిన రెండు సెషన్లు కావాలి. ప్రస్తుతానికి మీ దగ్గర ఒకటే ఉంది.',
  'empty.exportNoData': 'ఎగుమతి చేయడానికి ఏమీ లేదు. చరిత్రలో ఏదైనా చేరాలంటే కొలత ప్రారంభించండి.',
  'empty.alertsOff': 'అలర్ట్‌లు ఆఫ్‌లో ఉన్నాయి. ఆన్ చేసినా అవి యాప్ తెరిచి ఉన్నప్పుడు మాత్రమే పనిచేస్తాయి.',
  'empty.scheduleEmpty': 'ఏ వేళా పెట్టలేదు. షెడ్యూల్ యాప్ తెరిచి ఉన్నప్పుడు మాత్రమే పనిచేస్తుంది.',
  'empty.historyEmpty': 'చరిత్ర ఖాళీగా ఉంది.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'మాడ్యూళ్ళ జాబితా',

  'modules.01.title': 'రికార్డర్',
  'modules.01.desc': 'కాలక్రమంలో కొలత సాగిన తీరు — ఒక నిమిషం నుండి ముప్ఫై రోజుల వరకు.',
  'modules.02.title': 'పరిమితులు',
  'modules.02.desc': 'ప్రతి రాశికీ మీ సొంత జాగ్రత్త, అలారం హద్దులు పెట్టుకోండి.',
  'modules.03.title': 'కాలిబ్రేషన్',
  'modules.03.desc': 'తెలిసిన కాంతి మూలంతో పోలిక, అలాగే కాలిబ్రేషన్ సరిచేయలేనిది.',
  'modules.04.title': 'నివేదికలు',
  'modules.04.desc': 'ముద్రణ రూపంలో దైనందిన, వారపు సారాంశాలు.',
  'modules.05.title': 'ఎగుమతి',
  'modules.05.desc': 'రీడింగ్‌లను CSV లేదా JSON ఫైల్‌గా సేవ్ చేయడం, కాలమ్‌ల వివరణతో.',
  'modules.06.title': 'పోలిక',
  'modules.06.desc': 'రెండు సెషన్లు పక్కపక్కనే, తేడా సంఖ్యలో.',
  'modules.07.title': 'స్క్రీన్ పరీక్ష',
  'modules.07.desc': 'మీ సొంత మానిటర్‌ను దశలవారీగా పరిశీలించే ప్యాటర్న్‌లు.',
  'modules.08.title': 'షెడ్యూల్',
  'modules.08.desc': 'మీరు పెట్టిన వేళల్లో ఆటోమేటిక్ కొలతలు.',
  'modules.09.title': 'అలర్ట్‌లు',
  'modules.09.desc': 'పరిమితి దాటినప్పుడు సూచన — అది ఎప్పుడు పనిచేయదో కూడా.',
  'modules.10.title': 'మద్దతు',
  'modules.10.desc': 'యాప్ పూర్తిగా ఉచితం. ఇక్కడ రచయితకు ఒక కాఫీ కొనవచ్చు.',
  'modules.11.title': 'డాక్యుమెంటేషన్',
  'modules.11.desc': 'ఈ కొలత ఏమిటి, కచ్చితంగా ఏమి కాదు.',
  'modules.12.title': 'సెట్టింగ్‌లు',
  'modules.12.desc': 'థీమ్, అక్షరాల పరిమాణం, కదలిక తగ్గింపు, చరిత్ర తుడిచివేత.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'కొలత ఛానెళ్ళు',
  'channels.pick': 'పెద్ద డిస్‌ప్లేపై చూపించు',
  'channels.stale': 'డేటా లేదు',
  'channels.approx': 'అంచనా విలువ',

  'help.unit': 'యూనిట్',
  'help.range': 'పరిధి',
  'help.thresholds': 'పరిమితులు',
  'help.warn': 'జాగ్రత్త పరిమితి',
  'help.crit': 'క్లిష్ట పరిమితి',
  'help.now': 'ఇప్పుడు',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „రాశి” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'రాశి',
  'col.unit': 'యూనిట్',
  'col.range': 'పరిధి',
  'col.direction': 'దిశ',
  'col.time': 'సమయం',
  'col.date': 'తేదీ',
  'col.zone': 'జోన్',
  'col.avg': 'సగటు',
  'col.min': 'కనిష్ఠం',
  'col.max': 'గరిష్ఠం',
  'col.name': 'కాలమ్',
  'col.meaning': 'ఏమి ఉంటుంది',
  'col.channel': 'ఛానెల్',
  'col.gain': 'గెయిన్',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'కాల పరిధి',
  'recorder.range.60s': '60 సె.',
  'recorder.range.15min': '15 ని.',
  'recorder.range.1h': '1 గం.',
  'recorder.range.24h': '24 గం.',
  'recorder.range.30d': '30 రోజులు',
  'recorder.gap': 'కొలత లేదు',
  'recorder.sessionTitle': 'సెషన్ గణాంకాలు',
  'recorder.zonesCaption': 'నీలి వాటాకు జోన్ల విభజన',
  'recorder.tableCaption': 'ఎంచుకున్న పరిధిలోని రీడింగ్‌లు',
  'recorder.crosshair': 'రీడింగ్ క్రాస్‌హెయిర్',
  'recorder.prevAria': 'ముందటి బిందువు',
  'recorder.nextAria': 'తర్వాతి బిందువు',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'రూపం',
  'settings.themeLabel': 'థీమ్',
  'settings.themeSystem': 'సిస్టమ్ ప్రకారం',
  'settings.themeLight': 'లేత',
  'settings.themeDark': 'ముదురు',
  'settings.themeHint': '“సిస్టమ్ ప్రకారం” థీమ్ ఫోన్ సెట్టింగ్‌తో పాటే మారుతుంది.',
  'settings.textLabel': 'అక్షరాల పరిమాణం',
  /* Mnożnik jako LICZBA we wstawce — 1.15 po telugu, 1,15 po polsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'అక్షరాలనే కాదు, ఇంటర్‌ఫేస్ మొత్తాన్ని పెద్దది చేస్తుంది — కీలూ వరుసలూ అక్షరాలతో పాటే పెరుగుతాయి.',
  'settings.motionGroup': 'కదలిక',
  'settings.motionLabel': 'కదలిక తగ్గించు',
  'settings.motionHint': 'అన్ని ట్రాన్సిషన్‌లనూ ఆపేస్తుంది. అప్పుడు స్కేల్ ముల్లు మృదువుగా కదలకుండా సెకనుకు ఒకసారి గెంతుతుంది.',
  'settings.dataTitle': 'డేటా',
  'settings.clearLabel': 'చరిత్ర తుడిచివేయి',
  'settings.clearHintTpl': 'చరిత్రలో ఇప్పుడు {count} బిందువులు సేవ్ అయి ఉన్నాయి.',
  'settings.clearHintEmpty': 'చరిత్ర ఖాళీగా ఉంది.',
  'settings.clearTitle': 'చరిత్ర తుడిచివేయాలా?',
  'settings.clearConfirm': 'కొలత చరిత్ర మొత్తాన్ని తుడిచివేయాలా? దీన్ని వెనక్కి తీసుకోలేం.',
  'settings.clearKey': 'తుడిచివేయి',
  'settings.aboutTitle': 'యాప్ గురించి',
  'settings.versionTpl': '{app}, వెర్షన్ {version}.',
  'settings.offlineText': 'యాప్ నెట్‌వర్క్ లేకుండా పనిచేస్తుంది. మొదటిసారి తెరిచాక దాని ఫైళ్ళన్నీ బ్రౌజర్ నిల్వలో ఉంటాయి, కాబట్టి ఎయిర్‌ప్లేన్ మోడ్ దేన్నీ మార్చదు. యాప్ ఏ నెట్‌వర్క్ అభ్యర్థనా చేయదు, కాబట్టి ఏ సర్వర్‌కూ ఏదీ పంపబడదు.',
  'settings.docsKey': 'డాక్యుమెంటేషన్ తెరువు',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'రద్దు',
  'common.save': 'సేవ్ చేయి',
  'common.reset': 'డిఫాల్ట్‌లు పునరుద్ధరించు',
  'common.yes': 'అవును',
  'common.no': 'కాదు',
  'common.on': 'ఆన్',
  'common.off': 'ఆఫ్',
  'common.sep': ' · ',
  'common.stepsTitle': 'దశలవారీగా',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'సొంత పరిమితులు ఎందుకు',
  'modules.02.intro': 'యాప్ ఎప్పుడు “జాగ్రత్త” అనాలో, ఎప్పుడు “క్లిష్టం” అనాలో పరిమితి నిర్ణయిస్తుంది. డిఫాల్ట్ విలువలు మా సంపాదకీయ అంచనా, ప్రమాణం కాదు — మీరు వేరే పరిస్థితుల్లో కొలుస్తుంటే వాటిని మీకు తగ్గట్టు జరపండి. డాష్‌బోర్డ్‌లోని అంచనానూ వాక్యాన్నీ వెంటనే కొత్త పరిమితుల నుండే లెక్కిస్తాం.',
  'modules.02.orderNormal': 'జాగ్రత్త పరిమితి క్లిష్ట పరిమితి కంటే కింద ఉండాలి.',
  'modules.02.orderInvert': 'ఇక్కడ ఎక్కువ విలువ మేలు, కాబట్టి జాగ్రత్త పరిమితి క్లిష్ట పరిమితి కంటే పైన ఉంటుంది.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'స్కేల్ ప్రివ్యూ: {name}',
  'modules.02.nowTpl': 'ఇప్పుడు {value}',
  'modules.02.resetDone': 'డిఫాల్ట్ పరిమితులు పునరుద్ధరించబడ్డాయి.',
  'modules.02.profilesTitle': 'ప్రొఫైల్‌లు',
  'modules.02.profilesHint': 'ప్రొఫైల్ అంటే ఏడు రాశులకూ సేవ్ చేసిన పరిమితుల సమితి. ప్రొఫైల్‌ను వర్తింపజేస్తే అవన్నీ ఒకేసారి మారతాయి.',
  'modules.02.profileSaveKey': 'ప్రస్తుత పరిమితులను సేవ్ చేయి',
  'modules.02.profileNameLabel': 'కొత్త ప్రొఫైల్ పేరు',
  'modules.02.profileNameHint': 'పేరు ఈ పరికరంలోనే ఉండిపోతుంది. గరిష్ఠంగా 40 అక్షరాలు.',
  'modules.02.profileNameEmpty': 'ప్రొఫైల్ పేరు ఇవ్వండి.',
  'modules.02.profileSavedTpl': '“{name}” ప్రొఫైల్ సేవ్ అయింది.',
  'modules.02.profileAppliedTpl': '“{name}” ప్రొఫైల్ వర్తింపజేయబడింది.',
  'modules.02.profileRemovedTpl': '“{name}” ప్రొఫైల్ తొలగించబడింది.',
  'modules.02.profileFailed': 'ఆ ప్రొఫైల్‌ను వర్తింపజేయడం సాధ్యం కాలేదు.',
  'modules.02.profileCustomTpl': '{date} నాడు సేవ్ చేసిన సొంత ప్రొఫైల్.',
  'modules.02.builtin.default.name': 'డిఫాల్ట్',
  'modules.02.builtin.default.desc': 'రాశుల కేటలాగ్ నుండి వచ్చిన పరిమితులు — అన్ని కొలతలకూ మొదటి మెట్టు.',
  'modules.02.builtin.evening.name': 'సాయంత్రం — మృదువు',
  'modules.02.builtin.evening.desc': 'చల్లని రంగు గురించీ దైనందిన లయ ప్రభావం గురించీ ముందుగానే హెచ్చరిస్తుంది.',
  'modules.02.builtin.work.name': 'బల్ల వద్ద పని',
  'modules.02.builtin.work.desc': 'ప్రకాశమైన, చల్లని పగటి కాంతిని అనుమతిస్తుంది; మిణుకునూ ఏకరూపతనూ కనిపెడుతుంది.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'ఇది ఎందుకు పనిచేస్తుంది',
  'modules.03.why': 'కెమెరా సెన్సార్‌కు ఛానెళ్ళ మధ్య ఒక స్థిరమైన వ్యత్యాసం ఉంటుంది. తెల్ల కాగితాన్ని కొలిస్తే అది ఎంతో తెలుస్తుంది, దాన్ని తీసివేయవచ్చు. ఈ యాప్‌లో నిజంగా కచ్చితత్వాన్ని పెంచే ఒకే ఒక్క పని ఇదే — అయినా ఇది కెమెరాను స్పెక్ట్రోమీటర్‌గా మార్చదు.',
  'modules.03.steps.1': 'కొలుస్తున్న కాంతి కింద ఒక తెల్ల కాగితం పెట్టండి.',
  'modules.03.steps.2': 'డాష్‌బోర్డ్‌లో “కొలత ప్రారంభించు” నొక్కి, ఫ్రేమ్‌ను కాగితంతో నింపండి.',
  'modules.03.steps.3': 'ఇక్కడికి తిరిగి వచ్చి “కాలిబ్రేట్ చేయి” నొక్కి, మూడు సెకన్లు ఫోన్‌ను కదపకండి.',
  'modules.03.runKey': 'కాలిబ్రేట్ చేయి (3 సె.)',
  'modules.03.clearKey': 'కాలిబ్రేషన్ తొలగించు',
  'modules.03.busyTpl': 'కాగితాన్ని కొలుస్తున్నాం… ఇంకా {sec} సె.',
  'modules.03.statusNone': 'కాలిబ్రేషన్ లేదు. కొలత పనిచేస్తుంది, విలువలను పోలిక కోసమే తీసుకోండి.',
  'modules.03.statusOnTpl': '{date} నాడు {time} కు కాలిబ్రేట్ చేయబడింది.',
  'modules.03.gainsTitle': 'ఛానెల్ గెయిన్‌లు',
  'modules.03.gainR': 'ఎరుపు',
  'modules.03.gainG': 'ఆకుపచ్చ',
  'modules.03.gainB': 'నీలం',
  'modules.03.gainsNone': 'పెట్టలేదు',
  'modules.03.needRunning': 'ముందుగా కొలత ప్రారంభించి, కెమెరాను తెల్ల కాగితం వైపు గురిపెట్టండి.',
  'modules.03.tooFew': 'నమూనాలు చాలలేదు. కొలత నిజంగా జరుగుతోందో లేదో చూడండి.',
  'modules.03.tooDark': 'కాలిబ్రేషన్‌కు చిత్రం మరీ చీకటిగా ఉంది. కాగితంపై వెలుతురు పెంచి మళ్ళీ ప్రయత్నించండి.',
  'modules.03.refused': 'ఛానెళ్ళ వ్యత్యాసం కాలిబ్రేషన్‌గా అంగీకరించలేనంత ఎక్కువ. సమానమైన వెలుతురులో తెల్ల కాగితాన్ని వాడండి.',
  'modules.03.done': 'కాలిబ్రేట్ అయింది. వర్ణ ఉష్ణోగ్రతా దైనందిన లయ ప్రభావమూ ఇప్పుడు మరింత కచ్చితంగా ఉంటాయి.',
  'modules.03.cleared': 'కాలిబ్రేషన్ తొలగించబడింది.',
  'modules.03.limitsTitle': 'కాలిబ్రేషన్ సరిచేయనివి',
  'modules.03.limits.1': 'కాలిబ్రేషన్ కెమెరా మూడు ఛానెళ్ళను సమం చేస్తుంది, అంతకుమించి ఏమీ చేయదు. అది కెమెరాకు వర్ణపటాన్ని ఇవ్వదు, కాబట్టి వర్ణ ఉష్ణోగ్రతా దైనందిన లయ ప్రభావమూ sRGB రంగుల నుండి లెక్కించిన అంచనాలుగానే ఉండిపోతాయి.',
  'modules.03.limits.2': 'ఇది దృశ్య ప్రకాశాన్ని సంపూర్ణ రాశిగా మార్చదు — ఆ సంఖ్య సాపేక్షంగానే ఉంటుంది. లోపల రీడింగ్‌ను జరిపే ఆటోమేటిక్ ఎక్స్‌పోజర్‌నూ వైట్ బ్యాలెన్స్‌నూ ఇది ఆపదు.',
  'modules.03.limits.3': 'ఇది వేరే కాంతికి వర్తించదు: ఒక బల్బు కింద చేసిన కాలిబ్రేషన్ ఆ బల్బునే వర్ణిస్తుంది. మూలం మారితే దాన్ని మళ్ళీ చేయండి. ఈ కొలత ఏమి కాదో అందులోనూ ఇది ఏదీ మార్చదు — ఇది ఇప్పటికీ పరీక్ష కాదు, ఏ రోగాన్నైనా నిర్ధారించడానికి ఆధారమూ కాదు.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'నివేదిక కాలం',
  'modules.04.rangeDay': 'రోజు',
  'modules.04.rangeWeek': 'వారం',
  'modules.04.headTpl': '{from} నుండి {to} వరకు · చరిత్రలోని {count} బిందువులు.',
  'modules.04.tableTitle': 'సారాంశం',
  'modules.04.tableCaption': 'ఎంచుకున్న కాలంలో సగటు, కనిష్ఠం, గరిష్ఠం',
  'modules.04.panoramaTitle': 'పనోరమా',
  'modules.04.panoramaAriaTpl': 'పనోరమా: {name}, {span}.',
  'modules.04.panoramaSpanDay': 'గత రోజు గంటలవారీగా',
  'modules.04.panoramaSpanWeek': 'గత వారం రోజులవారీగా',
  'modules.04.panoramaHint': 'స్తంభం ఎత్తూ రంగూ ఒకటే చెబుతాయి: పరిధిలో — పొట్టిగా, జాగ్రత్త — మధ్యస్థంగా, క్లిష్టం — నిండుగా. అడుగున ఉన్న గీత కొలత జరగని గంటను సూచిస్తుంది.',
  'modules.04.coverageDayTpl': '{total} గంటల్లో {done} గంటలు కొలత జరిగింది.',
  'modules.04.coverageWeekTpl': '{total} రోజుల్లో {done} రోజులు కొలత జరిగింది.',
  'modules.04.zonesTitle': 'జోన్ల విభజన',
  'modules.04.zonesCaptionTpl': 'ప్రధాన ఛానెల్‌కు లెక్కించినది: {name}.',
  'modules.04.worstTpl': 'అత్యంత కష్టమైన వేళ: {value}.',
  'modules.04.worstNone': 'ప్రత్యేకంగా ఏదీ లేదు',
  'modules.04.worstHourTpl': '{hour} గంట',
  'modules.04.adviceTitle': 'దీనితో ఏం చేయాలి',
  'modules.04.adviceMelanopicTpl': 'సగటు దైనందిన లయ ప్రభావం {value}× వచ్చింది. సాయంత్రం 0.50 కంటే దిగువకు రావడం మేలు — వెచ్చని బల్బు లేదా నైట్ మోడ్ దీనికి సులభమైన దారి.',
  'modules.04.adviceKelvinTpl': 'కాంతి చల్లగా ఉంది (సగటున {value} K). పనికి ఇది ఫర్వాలేదు; నిద్రకు రెండు గంటల ముందు 3000 K కంటే తక్కువ మృదువుగా ఉంటుంది.',
  'modules.04.adviceFlickerTpl': 'గమనించదగ్గ మిణుకు కనిపిస్తోంది (సగటున {value}%). సాధారణంగా దీనికి కారణం చౌక డిమ్మర్ లేదా బ్యాక్‌లైట్ డ్రైవర్.',
  'modules.04.adviceUniformityTpl': 'కాంతి అసమానంగా పరుచుకుంది ({value}%). దీపాన్ని జరపడం లేదా దాని కోణాన్ని మార్చడం సాధారణంగా బల్బు మార్చడం కంటే ఎక్కువ ఉపయోగపడుతుంది.',
  'modules.04.adviceWorstTpl': 'పరిమితులు దాటిన రీడింగ్‌లు ఎక్కువగా {hour} గంట వద్ద గుమిగూడాయి.',
  'modules.04.adviceNone': 'ఈ కాలంలో మీరు పెట్టిన పరిమితులను దాటి ఏదీ నిలబడలేదు.',
  'modules.04.limitsTitle': 'ఇది ఆరోగ్య సలహా కాదు',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'ఈ నిర్ణయాలు ఈ ఫోన్ కెమెరా చూసినదాని నుండి మాత్రమే వచ్చాయి. యాప్ వర్ణపటాన్ని కొలవదు, ఏ రోగ నిర్ధారణా చేయదు.',
  'modules.04.printHint': 'ఈ పేజీ ఒక ముద్రణలా రూపొందించబడింది: పట్టికా శీర్షికలూ కాగితంపైనా, సిస్టమ్ మాగ్నిఫయర్‌లోనూ, స్క్రీన్ రీడర్‌లోనూ ఒకేలా చదువుతాయి.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'డేటా పరిధి',
  'modules.05.range1h': 'గంట',
  'modules.05.range24h': 'రోజు',
  'modules.05.range7d': '7 రోజులు',
  'modules.05.range30d': '30 రోజులు',
  'modules.05.csvKey': 'CSV ఫైల్ సేవ్ చేయి',
  'modules.05.jsonKey': 'JSON ఫైల్ సేవ్ చేయి',
  'modules.05.formatTitle': 'ఫైల్ ఫార్మాట్',
  'modules.05.formatCsv': 'CSV: కాలమ్‌లను సెమికోలన్ వేరు చేస్తుంది, దశాంశ విభాజకం కామా, ఎన్‌కోడింగ్ BOM గుర్తుతో UTF-8. దశాంశ విభాజకంగా కామాను వాడే లొకేల్‌లో ఉన్న Excel ఇలాంటి ఫైల్‌ను ఏమీ సెట్ చేయకుండానే తెరుస్తుంది.',
  'modules.05.formatJson': 'JSON: అదే డేటా “points” ఫీల్డ్‌లో, దశాంశ బిందువుతోనూ మిల్లీసెకన్లలోని టైమ్‌స్టాంప్‌తోనూ — ఫార్మాట్ కోరేది అదే.',
  'modules.05.resolution': 'చరిత్ర 5 సెకన్లకు ఒక బిందువును సేవ్ చేస్తుంది, 30 రోజుల వెనక్కి చేరుతుంది. సెకనుకు ఐదు నమూనాల పూర్తి రిజల్యూషన్ ఫైల్‌లో ఉండదు — దాన్ని ఇంజిన్ ఒక నిమిషం మాత్రమే ఉంచుకుంటుంది.',
  'modules.05.offline': 'ఫైల్ పరికరంలోనే తయారవుతుంది, పరికరంలోనే ఉండిపోతుంది. ఎగుమతి ఏ నెట్‌వర్క్‌కూ కనెక్ట్ కాదు.',
  'modules.05.columnsTitle': 'కాలమ్‌ల వివరణ',
  'modules.05.columnsCaption': 'ఫైల్ కాలమ్‌లూ వాటి అర్థమూ',
  'modules.05.descDate': 'పరికరం గడియారం నుండి తీసిన బిందువు తేదీ, రోజు-నెల-సంవత్సరం రూపంలో.',
  'modules.05.descTime': 'బిందువు సమయం, సెకను వరకు.',
  'modules.05.descZone': 'సేవ్ చేసిన క్షణంలో నీలి వాటా జోన్. ఇంజిన్ ఆ ఒక్క రాశికే జోన్‌ను సేవ్ చేస్తుంది — మిగతావాటికి దాన్ని పరిమితుల నుండి లెక్కించుకోండి.',
  'modules.05.descMetricTpl': '{short} యూనిట్: {unit}. పరిధి {min}–{max}.',
  'modules.05.previewTitle': 'ప్రివ్యూ',
  'modules.05.previewHint': 'ఫైల్ మొదటి ఐదు వరుసలు, సేవ్ అయ్యే తీరు సరిగ్గా అలాగే.',
  'modules.05.savedTpl': '{name} ఫైల్ సేవ్ అయింది — {rows} వరుసలు.',
  'modules.05.failed': 'ఈ బ్రౌజర్ ఫైల్‌ను సేవ్ చేయనివ్వలేదు.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'పూర్తయిన ప్రతి కొలత సెషన్‌నూ యాప్ ఈ పరికరంలో సేవ్ చేస్తుంది. రెండింటిని ఒకే టేప్‌పై చూడటానికీ తేడాను సంఖ్యలో చదవడానికీ వాటిని ఎంచుకోండి.',
  'modules.06.noSessions': 'పూర్తయిన సెషన్ ఇంకా ఒక్కటీ లేదు. కొలత ప్రారంభించి, ఆపి, ఇక్కడికి తిరిగి రండి.',
  'modules.06.slotA': 'సెషన్ A',
  'modules.06.slotB': 'సెషన్ B',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'టేప్',
  'modules.06.tapeAriaTpl': 'సెషన్ {slot} సాగిన తీరు, రాశి {name}.',
  'modules.06.tapeHint': 'రెండు సెషన్లూ ఒకే వెడల్పుకు సాగదీయబడ్డాయి: ఒక స్తంభం అంటే వ్యవధిలో అదే భాగం, అదే గడియారం వేళ కాదు. ఎత్తూ రంగూ డాష్‌బోర్డ్‌లో చెప్పేదే చెబుతాయి.',
  'modules.06.tapeChannelTpl': 'టేప్ ప్రధాన ఛానెల్‌ను చూపుతోంది: {name}.',
  'modules.06.diffTitle': 'తేడా',
  'modules.06.diffCaption': 'రెండు సెషన్ల సగటులూ వాటి మధ్య తేడా',
  'modules.06.clearKey': 'సేవ్ చేసిన సెషన్లను తొలగించు',
  'modules.06.cleared': 'సేవ్ చేసిన సెషన్లు తొలగించబడ్డాయి.',
  'modules.06.savedTpl': 'సెషన్ సేవ్ అయింది: {dur}.',
  'modules.06.limitsTitle': 'ఈ పోలిక చెప్పనివి',
  'modules.06.limits': 'మీరు పోల్చుతున్నది రెండు కొలతలను, రెండు కాంతి మూలాలను కాదు. సెషన్ల మధ్య ఫ్రేమ్, దూరం, పగటి వేళ లేదా ఫోన్ ఉంచిన తీరు మారితే, తేడా వాటి గురించి కూడా చెబుతుంది. వెలుతురు మార్చక ముందూ మార్చిన తర్వాతా అదే దృశ్యం — అదే అత్యంత నిజాయితీ అయిన పోలిక.',
  'modules.06.keepTpl': 'ఇటీవలి {count} సెషన్లు మాత్రమే గుర్తుంచుకోబడతాయి.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'పరీక్ష ప్యాటర్న్‌లు ఈ పరికరం స్క్రీన్ మొత్తంపై కనిపిస్తాయి. స్క్రీన్‌ను కంటితో చూడటానికే ఇవి: తెలుపు సమానంగా ఉందా, బూడిద రంగులు ఏదైనా రంగులోకి జారుతున్నాయా, మూలల్లో బ్యాక్‌లైట్ కారుతోందా.',
  'modules.07.steps.1': 'మీరు సాధారణంగా పనిచేసే స్క్రీన్ ప్రకాశాన్ని పెట్టి, సిస్టమ్ నైట్ మోడ్‌ను ఆఫ్ చేయండి.',
  'modules.07.steps.2': 'కింది జాబితా నుండి ఒక ప్యాటర్న్ ఎంచుకోండి. అది స్క్రీన్ మొత్తాన్ని నింపుతుంది.',
  'modules.07.steps.3': 'దాదాపు అరవై సెంటీమీటర్ల దూరం నుండి, స్క్రీన్‌కు నేరుగా ఎదురుగా చూడండి. తర్వాత అదే ప్యాటర్న్‌ను ఒక కోణం నుండి చూడండి.',
  'modules.07.steps.4': '“ప్యాటర్న్ మూసివేయి” కీతో లేదా Escape కీతో బయటికి వచ్చి తర్వాతి దానికి వెళ్ళండి.',
  'modules.07.planesTitle': 'ప్యాటర్న్‌లు',
  'modules.07.exitKey': 'ప్యాటర్న్ మూసివేయి',
  'modules.07.showAriaTpl': 'ప్యాటర్న్ చూపించు: {name}',
  'modules.07.planeAriaTpl': 'పరీక్ష ప్యాటర్న్: {name}. మూసివేసే కీ స్క్రీన్ కింద ఉంది.',
  'modules.07.plane.white.name': 'తెలుపు',
  'modules.07.plane.white.hint': 'మచ్చలూ రంగు ఛాయలూ అంచుల దగ్గర ప్రకాశమైన చోట్లూ వెతకండి. తెలుపు ఉపరితలం అంతటా ఒకే రంగుగా ఉండాలి.',
  'modules.07.plane.gray75.name': 'బూడిద 75%',
  'modules.07.plane.gray75.hint': 'బూడిద బూడిదగానే ఉండాలి. ఆకుపచ్చ లేదా గులాబీ ఛాయ అంటే స్క్రీన్ వైట్ బ్యాలెన్స్ జారిపోయిందని అర్థం.',
  'modules.07.plane.gray50.name': 'బూడిద 50%',
  'modules.07.plane.gray50.hint': 'రంగు ఛాయను అంచనా వేయడానికి ఇదే ఉత్తమమైన ప్యాటర్న్. మధ్యనూ మూలలనూ పోల్చండి.',
  'modules.07.plane.gray25.name': 'బూడిద 25%',
  'modules.07.plane.gray25.hint': 'ముదురు బూడిద బ్యాక్‌లైట్ కారడాన్నీ చౌక ప్యానెళ్ళలోని చారలనూ బయటపెడుతుంది.',
  'modules.07.plane.black.name': 'నలుపు',
  'modules.07.plane.black.hint': 'చీకటి గదిలో బ్యాక్‌లైట్ కారే ప్రతి చోటూ, ప్రకాశించే ప్రతి మూలా ఇక్కడ కనిపిస్తాయి.',
  'modules.07.plane.red.name': 'స్వచ్ఛమైన ఎరుపు',
  'modules.07.plane.red.hint': 'ఏకరూపమైన ఎరుపు చనిపోయిన సబ్‌పిక్సెళ్ళనూ ప్యానెల్ అసమానతలనూ బయటపెడుతుంది.',
  'modules.07.plane.green.name': 'స్వచ్ఛమైన ఆకుపచ్చ',
  'modules.07.plane.green.hint': 'ఆకుపచ్చ ఎక్కువ ప్రకాశాన్ని మోస్తుంది — పాడైన పిక్సెల్ దీనిపైనే సులభంగా కనిపిస్తుంది.',
  'modules.07.plane.blue.name': 'స్వచ్ఛమైన నీలం',
  'modules.07.plane.blue.hint': 'స్క్రీన్ ఉపరితలంపై మురికినీ చారలనూ నీలం తెలుపు కంటే బాగా చూపుతుంది.',
  'modules.07.plane.grid.name': 'గ్రిడ్',
  'modules.07.plane.grid.hint': 'గీతలు మధ్యలో ఎంత పదునుగా ఉన్నాయో మూలల్లోనూ అంతే ఉండాలి. అంచుల్లో మసక అనేది చిత్ర స్కేలింగ్‌కు సంబంధించిన విషయం.',
  'modules.07.warn': 'ప్యాటర్న్ స్క్రీన్ మొత్తాన్ని కప్పేస్తుంది, కొలత కీ ఉన్న నియంత్రణ డాష్‌బోర్డ్‌తో సహా. యాప్‌లో అలా జరిగే ఒకే ఒక్క చోటు ఇదే, అందుకే బయటికి వెళ్ళే కీ పెద్దదిగా, ఎప్పుడూ కనిపించేలా ఉంటుంది. ప్యాటర్న్ స్క్రీన్‌పై ఉన్నంతసేపూ కొలత సాగుతూనే ఉంటుంది, దాన్ని ఆపడం కుదరదు — కీల దగ్గరికి తిరిగి రావడానికి ప్యాటర్న్‌ను మూసివేయండి.',
  'modules.07.cameraTitle': 'ఇక్కడ చేయలేనిది',
  'modules.07.camera': 'ఫోన్ తన సొంత స్క్రీన్‌ను చూడదు, కాబట్టి ఈ ప్యాటర్న్‌లను అదే పరికరంతో కొలవలేరు. మానిటర్‌ను కొలవాలంటే ప్యాటర్న్‌ను మానిటర్‌పై చూపి, కొలతను ఫోన్‌తో చేయండి — ఇవి రెండు వేర్వేరు పరికరాలు, రెండు వేర్వేరు పాత్రలు.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'ఏర్పాటు చేసిన వేళలో కొలత గురించి షెడ్యూల్ గుర్తుచేస్తుంది. కెమెరాను అదే ఆన్ చేయదు: నిర్ణీత గంటకు అది ఒక గుర్తుచేతను చూపుతుంది, కొలతను మాత్రం మీరు డాష్‌బోర్డ్‌లోని “కొలత ప్రారంభించు” కీతో మొదలుపెడతారు. మొదటిసారి ఎలాగో అలాగే.',
  'modules.08.onlyOpenTitle': 'ఇది ఎప్పుడు పనిచేయదు',
  'modules.08.onlyOpen': 'షెడ్యూల్ యాప్ తెరిచి ఉన్నప్పుడు మాత్రమే పనిచేస్తుంది. మూసిన బ్రౌజర్ ట్యాబ్ సమయాన్ని లెక్కించదు, దేని గురించీ గుర్తుచేయదు. సిస్టమ్ నోటిఫికేషన్‌లకు మేం అనుమతి అడగం, నెట్‌వర్క్‌కు ఏదీ పంపం.',
  'modules.08.enableLabel': 'గుర్తుచేతలు ఆన్ చేయి',
  'modules.08.timesTitle': 'వేళలు',
  'modules.08.timeAriaTpl': 'వేళ {n}: గుర్తుచేత గంట',
  'modules.08.addKey': 'వేళ జోడించు',
  'modules.08.removeAriaTpl': '{time} వేళను తొలగించు',
  'modules.08.addedTpl': '{time} వేళ జోడించబడింది.',
  'modules.08.removedTpl': '{time} వేళ తొలగించబడింది.',
  'modules.08.badTime': '22:00 ఫార్మాట్‌లో గంట ఇవ్వండి.',
  'modules.08.nextTpl': 'తర్వాతి గుర్తుచేత: {time}.',
  'modules.08.nextNone': 'గుర్తుచేతలు ఆఫ్‌లో ఉన్నాయి.',
  'modules.08.dueTpl': 'షెడ్యూల్ చేసిన కొలత వేళ: {time}.',
  'modules.08.dueKey': 'డాష్‌బోర్డ్ చూపించు',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'అలర్ట్ ఒకే రాశిని కనిపెడుతుంది, మీరు పెట్టిన సమయమంతా అది ఎంచుకున్న జోన్‌లో ఆగకుండా నిలిస్తేనే మాట్లాడుతుంది. అది ఎప్పుడూ కొలతను ఆపదు, కీలను ఎప్పుడూ కప్పదు.',
  'modules.09.enableLabel': 'అలర్ట్‌లు ఆన్ చేయి',
  'modules.09.metricLabel': 'కనిపెట్టవలసిన రాశి',
  'modules.09.levelLabel': 'ఏ జోన్ నుండి',
  'modules.09.levelWarning': 'జాగ్రత్త నుండి పైకి',
  'modules.09.levelCritical': 'క్లిష్టం మాత్రమే',
  'modules.09.sustainLabel': 'ఎన్ని సెకన్లు ఆగకుండా ఉంటే',
  'modules.09.sustainHint': 'సమయం తక్కువ పెడితే, ఫోన్ కదిపినప్పుడు తప్పుడు అలారాలు ఎక్కువ వస్తాయి. ఐదు సెకన్ల కంటే కిందికి మేం దిగం.',
  'modules.09.soundLabel': 'చిన్న శబ్ద సంకేతం',
  'modules.09.soundHint': 'శబ్దం పరికరంలోనే పుడుతుంది. నెట్‌వర్క్ నుండి ఏదీ డౌన్‌లోడ్ కాదు.',
  'modules.09.cooldownHint': 'రెండు నిమిషాలకు గరిష్ఠంగా ఒక అలర్ట్. ప్రతి నమూనాకూ మోగే అలారం అంటే శాశ్వతంగా ఆఫ్ చేయబడే అలారం.',
  'modules.09.whenNotTitle': 'అలర్ట్ ఎప్పుడు పనిచేయదు',
  'modules.09.whenNot': 'ఈ సూచన యాప్ లోపల ఉంటుంది, సిస్టమ్‌లో కాదు. యాప్ మూసి ఉన్నప్పుడు లేదా నేపథ్యంలో దాగి ఉన్నప్పుడు, కొలత జరగనప్పుడు, అలాగే కనిపెడుతున్న రాశిని ఆ క్షణంలో కొలవలేనప్పుడు అది పనిచేయదు. సిస్టమ్ నోటిఫికేషన్‌లకు మేం అనుమతి అడగం.',
  'modules.09.firedTpl': '{name}: {sec} సె. నుండి {zone} — ఇప్పుడు {value}.',
  'modules.09.saved': 'అలర్ట్ సెట్టింగ్‌లు సేవ్ అయ్యాయి.',
  'modules.09.statusOnTpl': 'కనిపెడుతున్నాం: {name}, {level}, {sec} సె. తర్వాత.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'ఈ యాప్ ఉచితం',
  'support.freeText': 'మొదటిసారి తెరిచినప్పటి నుండే ఏడు రాశులూ సంఖ్యలు చూపుతాయి. రికార్డర్, పరిమితులు, కాలిబ్రేషన్, నివేదికలు, ఎగుమతి, సెషన్ల పోలిక, ముప్ఫై రోజుల చరిత్ర మొత్తం — ఖాతా లేకుండా, రుసుము లేకుండా, హద్దులు లేకుండా పనిచేస్తాయి; ఆఫ్‌లైన్‌లోనూ అలాగే. తర్వాత రుసుము కట్టాలని ఇక్కడ దేన్నీ దాచిపెట్టలేదు.',
  'support.whyTitle': 'నేను ఎందుకు అడుగుతున్నాను',
  'support.whyText': 'కాంతి మానిటర్‌ను నేనొక్కడినే, పని వేళల తర్వాత తయారుచేస్తూ నిర్వహిస్తున్నాను. మీ మద్దతు లోపాల సవరణకు, మరిన్ని ఫోన్లలో పరీక్షలకు, మాడ్యూళ్ళ జాబితాలోని తర్వాతి సాధనాలకు పట్టే సమయానికి వెళుతుంది. ఎవరూ ఏమీ చెల్లించకపోయినా ఏదీ ఆగిపోదు.',
  'support.nothingTitle': 'విరాళంతో వచ్చేది',
  'support.nothingText': 'ఏమీ లేదు. విరాళం తర్వాత ఏ సంఖ్యా, ఏ మాడ్యూలూ, ఏ సెట్టింగూ కొత్తగా తెరుచుకోదు, ఎందుకంటే అంతా మొదటి నుండే తెరిచి ఉంది. మిగిలేది ఒక్కటే — ఇది ఎవరికో ఉపయోగపడిందని నాకు తెలియడం.',
  'support.keyTitle': 'సాయం చేయాలనుకుంటే',
  'support.keyLabel': 'నాకో కాఫీ కొనండి',
  'support.keyAria': 'నాకో కాఫీ కొనండి — కొత్త ట్యాబ్‌లో బయటి పేజీని తెరుస్తుంది',
  'support.serviceText': 'విరాళాల ప్రొఫైల్‌ను ఒక బయటి సేవ నడుపుతుంది, ఉదాహరణకు Buy Me a Coffee. యాప్ దాని నుండి ఏ స్క్రిప్టూ, విడ్జెట్టూ, చిత్రమూ లోడ్ చేయదు — ఇక్కడ నిలిచేది ఒక సాధారణ లింక్, అంతకుమించి ఏమీ లేదు.',
  'support.privacyText': 'ఈ కీ నొక్కితే కొత్త ట్యాబ్‌లో బయటి పేజీ తెరుచుకుంటుంది, ఏదైనా ఈ పరికరాన్ని వదిలి వెళ్ళే ఏకైక క్షణం అదే. కొలతలూ చరిత్రా సెట్టింగ్‌లూ ఉన్నచోటే ఉంటాయి — ఈ బ్రౌజర్ నిల్వలో.',
  'support.privacyPendingText': 'చిరునామా అందుబాటులోకి వచ్చాక, ఆ కీ నొక్కితే కొత్త ట్యాబ్‌లో బయటి పేజీ తెరుచుకుంటుంది, ఏదైనా ఈ పరికరాన్ని వదిలి వెళ్ళే ఏకైక క్షణం అదే అవుతుంది. కొలతలూ చరిత్రా సెట్టింగ్‌లూ ఉన్నచోటే ఉంటాయి — ఈ బ్రౌజర్ నిల్వలో.',
  'support.emptyTitle': 'ప్రొఫైల్ ఇంకా అనుసంధానం కాలేదు',
  'support.emptyText': 'విరాళాల ప్రొఫైల్ చిరునామాను ఇంకా రాయలేదు, కాబట్టి ఎక్కడికీ తీసుకెళ్ళని కీ ఇక్కడ లేదు. మిగతా యాప్ ఏ మార్పూ లేకుండా పనిచేస్తుంది — ఆ విరాళం కోసం ఏదీ ఆగి లేదు.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'ఈ యాప్ కొలవనివి',
  'docs.notList.1': 'ఇది వర్ణపటాన్ని కొలవదు. కెమెరాకు మూడు వెడల్పాటి వర్ణ ఛానెళ్ళూ ఆటోమేటిక్ ఎక్స్‌పోజర్‌, ఆటోమేటిక్ వైట్ బ్యాలెన్స్‌ ఉంటాయి.',
  'docs.notList.2': 'ఇది సంపూర్ణ విలువలను కొలవదు. దృశ్య ప్రకాశం ఒక సాపేక్ష సూచిక, ఫోటోమెట్రిక్ కొలత ఫలితం కాదు.',
  'docs.notList.3': 'ఇది వర్ణ ఉష్ణోగ్రతను నేరుగా కొలవదు. వర్ణ ఉష్ణోగ్రతా దైనందిన లయ ప్రభావమూ sRGB రంగుల నుండి లెక్కించిన అంచనాలు.',
  'docs.notList.4': 'ఇది విద్యుత్ సరఫరా మిణుకును చూడదు. 5 Hz నమూనా సేకరణ 2.5 Hz కంటే తక్కువ మిణుకును మాత్రమే చూడగలదు — విద్యుత్ సరఫరాలోని 100 Hz దీని అందుబాటులో లేదు, యాప్ దాన్ని ఎప్పుడూ ఫలితంగా చూపదు.',
  'docs.notList.5': 'ఇది రోగ నిర్ధారణ చేయదు, ఆరోగ్య సలహా ఇవ్వదు. ఏ ఫలితమూ వాటిలో ఏదీ కాదు.',
  'docs.notList.6': 'ఇది మీ కాంతిని ఏ అధికారిక ప్రమాణంతోనూ పోల్చదు. పరిమితులు అనేవి మీరు మాడ్యూల్ 02 లో మార్చుకోగల సెట్టింగ్‌లు.',
  'docs.whatTitle': 'ఏమి కొలుస్తుంది, ఎలా',
  'docs.whatLead': 'ఫోన్ కెమెరా వెలుతురు పడిన ఉపరితలం వైపు చూస్తుంది, యాప్ సెకనుకు ఐదు సార్లు ఫ్రేమ్ మధ్య భాగం నుండి R, G, B ఛానెళ్ళ సగటులను లెక్కిస్తుంది. ఆ మూడు సంఖ్యల నుండి ఏడు సూచికలను తీస్తుంది.',
  'docs.whatCrop': 'ఆ భాగం అంటే ఫ్రేమ్ వెడల్పులో మధ్య 60%, ఎత్తులో 60% — “గురిపెట్టడం” స్క్రీన్‌పై గురిగుర్తు గీసే దీర్ఘచతురస్రం సరిగ్గా అదే. దాని బయట ఏదీ లెక్కించబడదు.',
  'docs.whatRate': '200 ms కు ఒక నమూనా, అంటే సెకనుకు 5 సార్లు. చివరి నిమిషం పూర్తి రిజల్యూషన్‌లో మెమరీలో ఉంటుంది; అంతకు పాతదంతా 5 సెకన్లకు ఒకసారి సేవ్ అవుతూ ముప్ఫై రోజుల వెనక్కి చేరుతుంది.',
  'docs.metricsTitle': 'ఏడు రాశులు',
  'docs.formulasTitle': 'సూత్రాలు',
  'docs.formula.share.formula': 'నీలి వాటా = B / (R + G + B) × 100%',
  'docs.formula.share.text': 'గామాను తిప్పకుండా sRGB విలువలపైనే లెక్కించాం — అది ఉద్దేశపూర్వకమే, ఎందుకంటే యాప్ ఇంతకుముందటి వెర్షన్‌లోని నిర్వచనం ఇదే, కాబట్టి అప్పుడు పెట్టుకున్న పరిమితులు ఇప్పటికీ అదే అర్థాన్ని ఇస్తాయి. ఇది రంగును ప్రకాశం నుండి వేరు చేస్తుంది.',
  'docs.formula.brightness.formula': 'ప్రకాశం = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': 'పరిధిలో శాతంగా చెప్పిన సగటు ఛానెల్ విలువ. ఆటోమేటిక్ ఎక్స్‌పోజర్ దాన్ని లోపల జరుపుతుంది, కాబట్టి ఇది సాపేక్ష సూచిక — ఒక్క సంఖ్యను కొలతగా చదవడం కంటే రెండు దృశ్యాలను పోల్చండి.',
  'docs.formula.kelvin.title': 'వర్ణ ఉష్ణోగ్రత — మెక్‌కేమీ అంచనా',
  'docs.formula.kelvin.formula': 'n = (x − 0.3320) / (y − 0.1858)\nCCT = −449 n³ + 3525 n² − 6823.3 n + 5520.33',
  'docs.formula.kelvin.text': 'ముందుగా sRGB గామాను తిప్పి, తర్వాత మాత్రిక ద్వారా D65 తెలుపు కోసం CIE XYZ కు వెళ్ళి, వర్ణత x, y లెక్కిస్తాం. మెక్‌కేమీ సూత్రం దాదాపు 2000 K నుండి 12500 K మధ్య నమ్మదగినది. ఆ పరిధి బయట ఘనం చెల్లాచెదురవుతుంది, కాబట్టి ఫలితాన్ని కత్తిరించి నమ్మదగనిదిగా గుర్తిస్తాం — అప్పుడు స్కేల్ ఆధార రేఖ చుక్కల గీతగా మారి “పద్ధతి పరిధి దాటింది” అనే వాక్యం కనిపిస్తుంది.',
  'docs.formula.melanopic.title': 'దైనందిన లయ ప్రభావం — మెలనోపిక్ నిష్పత్తి',
  'docs.formula.melanopic.formula': 'mel = 0.0016 R + 0.3110 G + 0.8460 B\nY = 0.2127 R + 0.7152 G + 0.0722 B\nఫలితం = (mel / Y) × తటస్థ తెలుపుకు 1.00 అయ్యేలా సాధారణీకరణ',
  'docs.formula.melanopic.text': 'మూడు ఛానెళ్ళూ రేఖీయ విలువల్లో. నిజమైన రాశి అంటే మెలనోప్సిన్ సున్నితత్వ వక్రంతో వర్ణపటం సమాకలనం (శిఖరం దాదాపు 490 nm వద్ద); కెమెరాకు మూడు వెడల్పాటి ఛానెళ్ళే ఉంటాయి, కాబట్టి sRGB ప్రాథమిక రంగులను వాటి సుమారు తరంగదైర్ఘ్యాల (R 612 nm, G 549 nm, B 465 nm) వద్దటి మెలనోపిక్ సున్నితత్వంతో తూకం వేస్తాం. మార్పు దిశ నమ్మదగినది, సంపూర్ణ విలువ కాదు — అందుకే ఈ సంఖ్య పక్కన “≈” గుర్తు ఉంటుంది.',
  'docs.formula.flicker.formula': 'మిణుకు = (max − min) / (max + min) × 100%',
  'docs.formula.flicker.text': 'IES నిర్వచనం, ప్రకాశ నమూనాల కిటికీ నుండి లెక్కించినది. సంకేతం తన సగటును ఎన్నిసార్లు దాటిందో దాని నుండి పౌనఃపున్యాన్ని అంచనా వేస్తాం. 5 Hz నమూనా సేకరణ 2.5 Hz కంటే తక్కువ మాడ్యులేషన్‌ను మాత్రమే చూస్తుంది (నైక్విస్ట్ హద్దు), అలాగే 0.5% నుండి పైబడిన వ్యాప్తి వద్ద 0.2 నుండి 2 Hz మధ్య ఉన్న పౌనఃపున్యాన్నే నమ్మదగినదిగా తీసుకుంటాం — ఆ పరిమితి కంటే కింద సగటును దాటడాలు సెన్సార్ శబ్దమే, మూలం కొట్టుకోవడం కాదు.',
  'docs.formula.uniformity.formula': 'ఏకరూపత = అత్యంత చీకటి గడి / అత్యంత ప్రకాశమైన గడి × 100%',
  'docs.formula.uniformity.text': 'ఆ భాగాన్ని 3×3 గ్రిడ్‌లో తొమ్మిది గడులుగా విభజించి, చివరి రెండింటిని పోలుస్తాం. 100% అంటే కాంతి పూర్తిగా సమానంగా పరుచుకోవడం. స్క్రీన్‌పై తక్కువ విలువ అంటే బ్యాక్‌లైట్ కారడం లేదా ప్రతిబింబం; బల్లపై అయితే దీపాన్ని సరిగా పెట్టకపోవడం. కంటి సౌకర్యంతో పాటు ఎక్కువ అంటే మేలు అనే ఒకే ఒక్క రాశి ఇదే.',
  'docs.formula.comfort.formula': '100 పాయింట్ల నుండి తీసివేతలు:\nదైనందిన లయ 0.75 పైన — 35 పాయింట్ల వరకు\nరంగు 4000 K పైన — 25 పాయింట్ల వరకు\nమిణుకు 5% పైన — 25 పాయింట్ల వరకు\nఏకరూపత 60% కంటే కింద — 15 పాయింట్ల వరకు',
  'docs.formula.comfort.text': 'ఆరు సంఖ్యల బదులు ఒకే అంచనా. కొలవలేకపోయిన రాశికి ఎలాంటి తీసివేతా ఉండదు — డేటా లేకపోవడం ఎప్పుడూ మంచి ఫలితంలా నటించదు. బరువులు మా సంపాదకీయ అంచనా, ప్రమాణం కాదు; అందుకే ఈ అంచనాతో ఏకీభవించకపోవడం సాధ్యమయ్యేలా మాడ్యూల్ 01 దాని భాగాల విడదీతను చూపుతుంది.',
  'docs.rangesTitle': 'పరిధులూ పరిమితులూ',
  'docs.rangesLead': 'కింద ఉన్న పరిమితులు ఈ క్షణంలో అమల్లో ఉన్నవే — మీరు వాటిని మాడ్యూల్ 02 లో మార్చి ఉంటే, పట్టిక ఫ్యాక్టరీ విలువలను కాక మీ విలువలను చూపుతుంది.',
  'docs.dirNormal': 'తక్కువ అంటే మృదువు',
  'docs.dirInvert': 'ఎక్కువ అంటే మేలు',
  'docs.privacyTitle': 'డేటా, గోప్యత',
  'docs.privacyText': 'కెమెరా చిత్రం ఎక్కడికీ పంపబడదు, ఎక్కడా భద్రపరచబడదు — ప్రతి ఫ్రేమ్ నుండి మూడు సంఖ్యలు మాత్రమే మిగులుతాయి. కొలతలూ పరిమితులూ సెట్టింగ్‌లూ ఈ పరికరంలోని బ్రౌజర్ నిల్వలో ఉంటాయి. యాప్ ఏ నెట్‌వర్క్ అభ్యర్థనా చేయదు, ఆఫ్‌లైన్‌లో పనిచేస్తుంది.',
  'docs.mdrTitle': 'నిరాకరణ',
  'docs.freeText': 'యాప్ పూర్తిగా ఉచితం, అలాగే ఉంటుంది: ఏడు రాశులూ, చరిత్రా, నివేదికలూ, ఎగుమతీ, ఆఫ్‌లైన్ మోడూ ఖాతా లేకుండా, రుసుము లేకుండా, హద్దులు లేకుండా పనిచేస్తాయి. కృతజ్ఞత చెప్పాలనుకునేవారికి మాడ్యూల్ 10 “మద్దతు” ఉంది.',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'యాప్ అసంపూర్ణంగా లోడ్ అయింది',
  'boot.filesTpl': 'ఈ ఫైళ్ళు లోడ్ కాలేదు: {list}.',
  'boot.modulesTpl': 'ఈ మాడ్యూళ్ళు నివేదించలేదు: {list} — ఆ అంశాలు జాబితా నుండి తెరుచుకోవు.',
  'boot.modulesRangeTpl': 'మాడ్యూళ్ళు {from}–{to}',
  'boot.tail': 'పేజీని రిఫ్రెష్ చేయండి. అది సాయపడకపోతే, సర్వర్‌లోని ఫైళ్ళు అసంపూర్ణంగా ఉన్నాయి.',
  'boot.loss.bus': 'మాడ్యూళ్ళు ఒకదాన్నొకటి చూడలేవు, కొలత మొదలవదు',
  'boot.loss.metrics': 'ఏ విలువా లెక్కించబడదు',
  'boot.loss.scaleCore': 'స్కేల్ జ్యామితీ సంఖ్యల ఫార్మాటింగూ మాయమవుతాయి',
  'boot.loss.scaleText': 'ఇంటర్‌ఫేస్ రాతలన్నీ మాయమవుతాయి',
  'boot.loss.shell': 'ఏ మాడ్యూలూ తెరవడం కుదరదు',
  'boot.loss.engine': 'కెమెరా, కొలత మొదలవవు',
  'boot.loss.dash': 'డాష్‌బోర్డ్ ఖాళీగా ఉండిపోతుంది'
});
