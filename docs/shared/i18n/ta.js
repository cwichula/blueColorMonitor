/* docs/shared/i18n/ta.js — słownik WSPÓLNY, tamilski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest tamilski.
 *
 * SKĄD TE ZDANIA: przekład z polskiej redakcji pierwotnej (pl.js), z angielskim
 * (en.js) jako wzorcem terminologii i rejestru. Nazwy siedmiu wielkości oddano
 * przyjętymi terminami naukowymi tamilskimi — நிற வெப்பநிலை (temperatura
 * barwowa), மினுமினுப்பு (migotanie), மெலனோப்பிக் விகிதம் (współczynnik
 * melanopiczny), நாள் தாளம் (rytm dobowy), உயிரியல் கடிகாரம் (zegar
 * biologiczny) — po jednym odpowiedniku na pojęcie w całym pliku.
 * Zdanie o rozporządzeniu (UE) 2017/745 i zdania o prywatności przetłumaczono
 * wiernie: bez skracania i bez zmiany mocy sformułowań.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — i tak ma zostać
 * w każdym z trzydziestu języków (patrz docs/shared/README.md, rozdział
 * „Warstwa językowa”). Klucza, którego nie ma w angielskim, nie wolno tu
 * dopisać: angielski jest wartością zapasową, więc to on wyznacza zestaw.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ta'] = Object.assign(window.I18nData['ta'] || {}, {

  /* Nazwa własna — nie tłumaczy się jej, ale wchodzi jako wstawka w zdanie
     o rozporządzeniu (UE) 2017/745, gdzie stoi w mianowniku. */
  'app.name': 'ஒளி கண்காணி',

  /* ---- wybór języka ---- */

  'language.label': 'மொழி',
  'language.help': 'முழு செயலியின் மொழி. அனைத்து மொழிகளும் ஏற்கெனவே இந்தச் சாதனத்தில் உள்ளன — எதுவும் பதிவிறக்கப்படுவதில்லை, எதுவும் எங்கும் அனுப்பப்படுவதில்லை.',
  'language.auto': 'சாதனத்தின்படி',
  'language.autoHint': 'தொலைபேசியிலோ உலாவியிலோ அமைக்கப்பட்ட மொழியின்படி.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'நீல விகிதம்',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'சதவீதம்',
  'metric.share.short': 'தெரியும் ஒளியில் எவ்வளவு பகுதி நீலச் சேனலில் விழுகிறது.',
  'metric.share.help': 'இது நிறத்தை ஒளிர்விலிருந்து பிரித்துக் காட்டுகிறது — இரவு பயன்முறையை இயக்கும்போது மாறுவது இந்த மதிப்புதான்.',

  'metric.brightness.name': 'காட்சி ஒளிர்வு',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'சதவீதம்',
  'metric.brightness.short': 'கேமரா படத்தின் சராசரி ஒளிர்வு.',
  'metric.brightness.help': 'இது ஒப்பீட்டு மதிப்பு, லக்ஸ் அல்ல — கேமராவின் தானியங்கி வெளிப்பாடு இதை அடியில் நகர்த்திக்கொண்டே இருக்கிறது.',

  'metric.kelvin.name': 'நிற வெப்பநிலை',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'கெல்வின்',
  'metric.kelvin.short': 'ஒளி வெதுவெதுப்பானதா, குளிர்ச்சியானதா.',
  'metric.kelvin.help': '3000 K-க்குக் கீழே ஒளி வெதுவெதுப்பானது, மாலையில் மென்மையானது. பெரும்பாலான திரைகளின் இயல்பான வெண்மை 6500 K.',

  'metric.melanopic.name': 'நாள் தாளத் தாக்கம்',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'மடங்கு',
  'metric.melanopic.short': 'இந்த ஒளி உயிரியல் கடிகாரத்தில் எவ்வளவு வலுவாகச் செயல்படுகிறது.',
  'metric.melanopic.help': 'மெலனோப்பிக் விகிதத்தின் தோராயம். 1.00 என்பது நடுநிலைப் பகல் வெண்மை; மாலையில் 0.50-க்குக் கீழே இறங்குவது நல்லது.',

  'metric.flicker.name': 'மினுமினுப்பு',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'சதவீதம்',
  'metric.flicker.short': 'ஒளி மூலத்தின் கண்ணுக்குத் தெரியாத துடிப்பு.',
  'metric.flicker.help': 'மலிவான மங்கலாக்கிகளும் பின்னொளிகளும் துடிக்கின்றன. கண்ணுக்கு அது தெரிவதில்லை, ஆனால் அது சோர்வுக்கும் தலைவலிக்கும் அறியப்பட்ட காரணம்.',

  'metric.uniformity.name': 'ஒருசீர்மை',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'சதவீதம்',
  'metric.uniformity.short': 'சட்டகம் முழுவதும் ஒளி சமமாகப் பரவியுள்ளதா.',
  'metric.uniformity.help': 'திரையில் குறைந்த மதிப்பு பின்னொளிக் கசிவையோ பிரதிபலிப்பையோ குறிக்கிறது; மேசையில் அது தவறாக வைக்கப்பட்ட விளக்கைக் குறிக்கிறது.',

  'metric.comfort.name': 'கண் சௌகரியம்',
  'metric.comfort.unit': 'புள்',
  'metric.comfort.unitSpoken': 'புள்ளிகள்',
  'metric.comfort.short': 'ஆறு எண்களுக்குப் பதிலாக ஒரே மதிப்பீடு.',
  'metric.comfort.help': 'மற்ற அளவீடுகளை 0–100 மதிப்பெண்ணாகச் சேர்த்து, அதை மிகவும் தாழ்த்துவது எது என்பதைக் காட்டுகிறது. எடைகள் எங்கள் தலையங்கத் தீர்ப்பு, தரநிலை அல்ல.',

  'comfort.penalty.melanopic': 'நாள் தாளத் தாக்கம்',
  'comfort.penalty.kelvin': 'குளிர்ந்த ஒளி நிறம்',
  'comfort.penalty.flicker': 'மினுமினுப்பு',
  'comfort.penalty.uniformity': 'சீரற்ற ஒளியமைப்பு',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': 'கேமராவை இயக்க “தொடங்கு” என்பதை அழுத்தவும்.',
  'engine.starting': 'கேமராவைத் தொடங்குகிறது…',

  'engine.error.permission': 'கேமராவைப் பயன்படுத்த அனுமதி இல்லை. உலாவி அமைப்புகளில் கேமராவை அனுமதித்துவிட்டு, மீண்டும் “தொடங்கு” என்பதை அழுத்தவும்.',
  'engine.error.notFound': 'கேமரா எதுவும் கிடைக்கவில்லை. சாதனத்தில் கேமரா உள்ளதா, அது கணினியில் அணைக்கப்படவில்லையா என்பதைச் சரிபார்க்கவும்.',
  'engine.error.busy': 'கேமரா வேறொரு செயலியில் பயன்பாட்டில் உள்ளது. அதை மூடிவிட்டு மீண்டும் முயற்சிக்கவும்.',
  'engine.error.unknown': 'கேமராவைத் தொடங்க முடியவில்லை.',
  'engine.error.unsupported': 'இந்தப் பக்கத்திற்கு இந்த உலாவி கேமராவை அணுக அனுமதிப்பதில்லை. செயலியை HTTPS வழியாகத் திறக்கவும் அல்லது வேறு உலாவியைப் பயன்படுத்தவும்.',

  /* ---- strefy ---- */

  'zone.good': 'வரம்புக்குள்',
  'zone.warning': 'எச்சரிக்கை',
  'zone.critical': 'தீவிரம்',
  'zone.none': 'தரவு இல்லை',
  'zone.settling': 'நிலைப்படுகிறது',

  'zone.spoken.good': 'வரம்புக்குள்',
  'zone.spoken.warning': 'எச்சரிக்கை',
  'zone.spoken.critical': 'தீவிரம்',
  'zone.spoken.none': 'தரவு இல்லை',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'புள்',
  'unit.hertz': 'Hz',
  'unit.second': 'வி.',
  'unit.minute': 'நி.',
  'unit.hour': 'ம.',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'இந்த ஒளி சரியாக உள்ளது — நீங்கள் அமைத்த வரம்புகளை எதுவும் தாண்டவில்லை.',
  'verdict.noValue': 'இந்த அளவை இப்போது அளக்க முடியவில்லை. லென்ஸை எதுவும் மறைக்கவில்லை என்பதைச் சரிபார்க்கவும்.',
  'verdict.warmup': 'மதிப்பீட்டைத் தீர்மானிக்கிறது — தொலைபேசியை இன்னும் சிறிது நேரம் அசையாமல் பிடித்திருங்கள்.',

  'verdict.warning.share': 'இந்த ஒளியில் நல்ல பகுதி நீலச் சேனலில் விழுகிறது. மாலையில் அதை மங்கச் செய்வது நல்லது.',
  'verdict.warning.brightness': 'காட்சி பிரகாசமாக உள்ளது — கேமரா தன் அளவீட்டு எல்லையின் மேல் விளிம்பில் வேலை செய்கிறது.',
  'verdict.warning.kelvin': 'ஒளி ஓரளவு குளிர்ச்சியாக உள்ளது. மாலையில் சுமார் 2700 K விளக்கு மென்மையானது.',
  'verdict.warning.melanopic': 'இந்த ஒளி உயிரியல் கடிகாரத்தில் ஓரளவு வலுவாகச் செயல்படுகிறது.',
  'verdict.warning.flicker': 'ஒளி மூலம் தெளிவாகத் துடிக்கிறது.',
  'verdict.warning.uniformity': 'சட்டகத்தில் ஒளி சீரற்ற முறையில் பரவியுள்ளது.',
  'verdict.warning.comfort': 'கண் சௌகரியம் குறைந்துள்ளது — பல காரணங்கள் ஒன்றுசேர்ந்து இதற்கு வழிவகுத்துள்ளன.',

  'verdict.critical.share': 'நீலம் மிக அதிகம். மாலையில் இரவு பயன்முறையை இயக்கவும் அல்லது ஒளி மூலத்தை மாற்றவும்.',
  'verdict.critical.brightness': 'காட்சி மிகவும் பிரகாசமாக உள்ளது. ஒளி மூலத்தை நேராகப் பார்த்து அளக்க வேண்டாம்.',
  'verdict.critical.kelvin': 'ஒளி குளிர்ந்ததாக உள்ளது. மாலையில் இதுவே கண்களுக்கு மிகுந்த சோர்வைத் தருகிறது — வெதுவெதுப்பான விளக்கோ இரவு பயன்முறையோ உதவும்.',
  'verdict.critical.melanopic': 'இந்த ஒளி உயிரியல் கடிகாரத்தில் வலுவாகச் செயல்படுகிறது. மாலையில் 0.50-க்குக் கீழே இறங்குவது நல்லது.',
  'verdict.critical.flicker': 'ஒளி மூலம் கடுமையாகத் துடிக்கிறது. இது கண் சோர்வுக்கும் தலைவலிக்கும் அறியப்பட்ட காரணம்.',
  'verdict.critical.uniformity': 'ஒளி மிகவும் சீரற்ற முறையில் பரவியுள்ளது. விளக்கின் இடத்தையோ திரையில் விழும் பிரதிபலிப்புகளையோ சரிபார்க்கவும்.',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'கண் சௌகரியம் குறைவாக உள்ளது. மதிப்பெண் எவற்றால் ஆனது என்பதைப் பார்த்து, அதைத் தாழ்த்துவது எது என்பதை அறியவும்.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'இந்த எண் சொல்லாதது என்ன',
  'note.warningTitle': 'எச்சரிக்கை',
  'note.dashTitle': 'இந்த அளவீடு எது அல்ல',
  'note.dashText': 'தொலைபேசிக் கேமராவில் மூன்று அகன்ற நிறச் சேனல்களும் தானியங்கி வெண்மைச் சமநிலையும் உள்ளன — அது நிறமாலையை அளப்பதில்லை. நிற வெப்பநிலையும் நாள் தாளத் தாக்கமும் sRGB நிறங்களிலிருந்து கணக்கிடப்பட்ட தோராயங்கள். வேறுபாடுகளையும் காலப்போக்கில் ஏற்படும் மாற்றங்களையும் இந்தச் செயலி நன்றாகக் காட்டுகிறது; அது அளவைக் கருவிக்குப் பதிலாகாது, எந்த நோயறிதலையும் தருவதில்லை.',
  'note.approxLegend': '≈ தோராய மதிப்பு — நிறமாலை அளவீட்டிலிருந்து அல்ல, sRGB நிறங்களிலிருந்து கணக்கிடப்பட்டது.',
  'note.kelvinOutOfRange': 'முறையின் எல்லைக்கு வெளியே — இந்த நிறத்தில் நிற வெப்பநிலைச் சூத்திரம் நம்பகமானதாக இருப்பதில்லை.',
  'note.flickerOutOfRange': 'முறையின் எல்லைக்கு வெளியே — {rate} Hz மாதிரியெடுப்பு {limit} Hz-க்குக் கீழே உள்ள துடிப்பை மட்டுமே காண்கிறது. மின்வழங்கலின் 100 Hz எட்டாத தொலைவில் உள்ளது, அதை இந்தச் செயலி ஒருபோதும் முடிவாகத் தராது.',
  'note.helpTitle': 'இந்த எண் சொல்லாதது என்ன',
  'note.helpText': 'தொலைபேசிக் கேமராவில் மூன்று அகன்ற சேனல்கள் உள்ளன, அது நிறமாலையை அளப்பதில்லை. இந்த மதிப்பு ஒப்பீட்டுக் குறிகாட்டி — ஒளிகளுக்கிடையேயான வேறுபாடுகளையும் காலப்போக்கில் ஏற்படும் மாற்றங்களையும் நன்றாகக் காட்டுகிறது; இது ஆய்வக அளவீடும் அல்ல, மருத்துவத் தகவலும் அல்ல.',
  'note.calibration': 'அளவுத்திருத்தம் இல்லாத அளவீடு — மதிப்புகளை ஒப்பீட்டளவில் எடுத்துக்கொள்ளுங்கள்.',

  'note.howToTitle': 'அர்த்தமுள்ள முறையில் எப்படி அளப்பது',
  'note.howTo.hold.title': 'தொலைபேசியை அசையாமல் பிடியுங்கள்',
  'note.howTo.hold.text': 'தானியங்கி வெளிப்பாடு நிலைப்பட 2–3 வினாடிகள் தேவை.',
  'note.howTo.aim.title': 'ஒளியூட்டப்பட்ட மேற்பரப்பை நோக்கிப் பிடியுங்கள்',
  'note.howTo.aim.text': 'வெள்ளைத் தாள் அல்லது வெளிர் நிறச் சுவர். ஒளி மூலத்தை நேராகப் பார்த்து அளக்க வேண்டாம்.',
  'note.howTo.compare.title': 'ஒப்பிடுங்கள், தனித்து மதிப்பிட வேண்டாம்',
  'note.howTo.compare.text': 'ஒளியமைப்பை மாற்றுவதற்கு முன்பும் பின்பும் அதே காட்சி, ஒரே ஓர் எண்ணைவிட அதிகம் சொல்கிறது.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest przepisane co do słowa z dotychczasowej redakcji. To
     sformułowanie, przy którym rozporządzenie (UE) 2017/745 uznaje
     przeznaczenie medyczne za wykluczone — nie skraca się go dla stylu. */

  'legal.noDiagnosis': 'எந்த அளவீடும் நோயறிதலோ சுகாதார ஆலோசனையோ அல்ல.',
  'legal.mdr': '{app} என்பது (EU) 2017/745 ஒழுங்குமுறையின் பொருளில் மருத்துவச் சாதனம் அல்ல; எந்த ஒரு மருத்துவ நிலையையும் கண்டறியவோ, தடுக்கவோ, கண்காணிக்கவோ, சிகிச்சையளிக்கவோ இது நோக்கமாகக் கொண்டதல்ல; மேலும் இது மருத்துவரின் அல்லது கண்பார்வை நிபுணரின் பரிசோதனைக்குப் பதிலாகாது.',

  /* ---- prywatność ---- */

  'privacy.title': 'இந்தச் சாதனத்திலிருந்து வெளியே செல்வது என்ன',
  'privacy.short': 'இந்தச் செயலியில் எதுவும் வலையமைப்புக்கு எதையும் அனுப்புவதில்லை. ஒவ்வொரு எண்ணும் இந்தச் சாதனத்தில் உருவாகி இங்கேயே இருக்கிறது.',
  'privacy.onDevice': 'நீங்கள் பொத்தானை அழுத்திய பிறகுதான் கேமரா தொடங்குகிறது, படம் ஒருபோதும் இந்தச் சாதனத்தைவிட்டு வெளியே செல்வதில்லை.',
  'privacy.external': 'முழுச் செயலியிலும் ஏதேனும் இந்தச் சாதனத்தைவிட்டு வெளியே செல்லும் ஒரே இடம் இதுதான்: பொத்தான் ஒரு வெளிப் பக்கத்தைப் புதிய தாவலில் திறக்கிறது, அதுவும் நீங்கள் அதை அழுத்திய பிறகுதான். அளவீடுகள், வரலாறு, அமைப்புகள் இங்கேயே இருக்கின்றன.',
  'privacy.externalPending': 'முகவரி கிடைத்ததும், பொத்தான் ஒரு வெளிப் பக்கத்தைப் புதிய தாவலில் திறக்கும். ஏதேனும் இந்தச் சாதனத்தைவிட்டு வெளியே செல்லும் ஒரே தருணம் அதுவாகவே இருக்கும். அளவீடுகள், வரலாறு, அமைப்புகள் இங்கேயே இருக்கின்றன.',
  'privacy.storageBlocked': 'இந்த உலாவி எதையும் சேமிக்க அனுமதிப்பதில்லை (தனிப்பட்ட பயன்முறை அல்லது தள தரவு தடுக்கப்பட்டுள்ளது). அளவீடு வேலை செய்கிறது, ஆனால் தாவலை மூடியதும் வரலாறு மறைந்துவிடும்.',

  /* ---- liczebniki ----
     Tamilski ma dwie kategorie CLDR: one (1) i other (cała reszta, w tym 0
     i ułamki). Liczba mnoga tworzy się przyrostkiem -கள், ale przy rzeczowniku
     policzonym często zostaje forma podstawowa. Formę wybiera
     Intl.PluralRules('ta'), nie nasza reguła. */

  'count.readings': { one: '{n} அளவீடு', other: '{n} அளவீடுகள்' },
  'count.sessions': { one: '{n} அமர்வு', other: '{n} அமர்வுகள்' },
  'count.seconds': { one: '{n} வினாடி', other: '{n} வினாடிகள்' },
  'count.minutes': { one: '{n} நிமிடம்', other: '{n} நிமிடங்கள்' },
  'count.hours': { one: '{n} மணி நேரம்', other: '{n} மணி நேரம்' },
  'count.days': { one: '{n} நாள்', other: '{n} நாட்கள்' }
});
