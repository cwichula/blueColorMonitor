/* Monitor Światła v5 — słownik tamilski.
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr). NIE JEST
 * KALKĄ żadnego z nich: polskie i angielskie zdania przełożono na naturalny
 * tamilski, a nie słowo w słowo. Zachowane zostało to, co niesie znaczenie:
 * liczby, progi, jednostki, nazwy wstawek i — co do treści — zastrzeżenia
 * medyczne oraz zdania o prywatności. Tych ostatnich nie wolno osłabiać ani
 * wzmacniać: „nie zastępuje rozmowy z lekarzem” ma po tamilsku znaczyć
 * dokładnie tyle samo, a „obraz nie opuszcza urządzenia” nie może stać się
 * obietnicą szerszą niż polska.
 *
 * REJESTR: standardowy pisany tamilski (செந்தமிழ் rejestru użytkowego).
 * Zdania pomocy zwracają się do użytkownika grzecznym trybem rozkazującym
 * na -உங்கள் („திறங்கள்”, „முயற்சியுங்கள்”); napisy przycisków i etykiety
 * kafelków stoją w krótkim temacie rozkazującym („தொடங்கு”, „நிறுத்து”,
 * „மூடு”), bo muszą się zmieścić w jednym wierszu na telefonie.
 *
 * CYFRY: łacińskie (0–9) z kropką dziesiętną. To nie jest wybór estetyczny,
 * tylko zgodność z resztą ekranu: `Intl.NumberFormat('ta')` ma system
 * numeryczny `latn` i daje „1,234.5”, a `Intl.DateTimeFormat('ta')` — zegar
 * dwunastogodzinny z „AM/PM”. Liczba wpisana w zdanie innymi cyframi stałaby
 * obok wskazania i wyglądałaby jak usterka. Symbole jednostek (%, K, ×, Hz)
 * i identyfikatory techniczne (CSV, JSON, sRGB, PWM, HTTPS, localhost,
 * JavaScript, Chrome, Safari, Buy Me a Coffee) zostają bez zmian.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych):
 *   நீல ஒளிப் பங்கு, காட்சி ஒளிர்வு, வண்ண வெப்பநிலை, சர்க்காடியன் தாக்கம்
 *   (w opisie: மெலனோபிக் விகிதம்), மினுக்கம், ஒருசீர்மை, பார்வை வசதி.
 *   Pojedyncza wielkość to அளவை, pomiar to அளவீடு, próg to வரம்பு, zakres
 *   czasu to காலகட்டம், rozrzut wartości to வீச்சு, próbka to மாதிரி,
 *   sesja to அமர்வு, wykres to வரைபடம், wskaźnik to அளவுகாட்டி,
 *   kanał obrazu to சேனல், kalibracja to சீரமைப்பு.
 * STREFY: பாதுகாப்பானது / மிதமானது / தீங்கானது — tak jak angielskie
 * safe/moderate/harmful mówią o świetle, a nie o stanie aplikacji, i wchodzą
 * w zdanie „மண்டலம்: {zone}”.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Tekst ze wstawką {nazwa}'   — napis zwykły,
 *   'klucz.kropkowany': { one, other }               — forma zależna od liczby.
 * Tamilski ma w CLDR dwie kategorie: `one` i `other`
 * (Intl.PluralRules('ta') → ['one', 'other']). Liczba mnoga tworzy się
 * przyrostkiem -கள்; tam, gdzie tamilski jej po liczebniku nie używa
 * (கெல்வின்), obie formy są tym samym słowem. Nazwy wstawek są identyczne jak
 * w pl.js. Kolejność wstawek w zdaniu wolno zmieniać — tamilska data skrócona
 * to „ஆக. 30”, nie „30 ஆக.” — nazwy nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'ஒளிக் கண்காணி',
  'app.description': 'ஒளிக் கண்காணி — உங்களைச் சுற்றியுள்ள ஒளியின் ஏழு அளவைகளை உங்கள் கேமரா அளக்கிறது. அனைத்தும் இந்தச் சாதனத்திலேயே கணக்கிடப்படுகிறது; எதுவும் இணையத்திற்குச் செல்வதில்லை.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — ஒளிக் கண்காணி',
  'app.skipToContent': 'உள்ளடக்கத்திற்குச் செல்',
  'app.nav.aria': 'முதன்மை வழிசெலுத்தல்',
  'app.noscript.title': 'இந்தப் பயன்பாட்டிற்கு JavaScript தேவை',
  'app.noscript.text': 'முழு அளவீடும் இந்த உலாவித் தாவலுக்குள்ளேயே நடக்கிறது: கேமராவின் சட்டகங்களைப் படித்து, அவற்றிலிருந்து ஒளியின் ஏழு அளவைகளைக் கணக்கிடுவது JavaScript தான். அது இல்லாமல் அளப்பதற்கு எதுவும் இல்லை. இந்தப் பக்கத்திற்கு JavaScript ஐ இயக்கிவிட்டு அதை மீண்டும் திறங்கள் — அப்போதும் எதுவும் இணையத்திற்கு அனுப்பப்படாது.',

  'nav.measure': 'அளவீடு',
  'nav.history': 'வரலாறு',
  'nav.tools': 'கருவிகள்',
  'nav.support': 'ஆதரவு',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'அளக்கிறது',
  'shell.live.aria': 'அளக்கிறது. {metric}: {value}. அளவீட்டுத் திரைக்குத் திரும்பு.',
  'shell.live.metricFallback': 'முதன்மை அளவை',
  'shell.action.fallback': 'திரைச் செயல்',

  'shell.loadFail.title': '“{screen}” திரையை ஏற்ற முடியவில்லை',
  'shell.loadFail.text': 'சாதனத்தின் சேமிப்பில் சில கோப்புகள் இல்லாமல் இருக்கலாம். இணையத்துடன் இணைத்து, பக்கத்தை மீண்டும் ஏற்றுங்கள்.',
  'shell.fatal.title': 'ஏதோ தவறாகிவிட்டது',
  'shell.fatal.text': 'திரையை உருவாக்கப் பயன்பாட்டால் முடியவில்லை. பக்கத்தை மீண்டும் ஏற்றினால் பொதுவாகப் போதும் — சேமித்த அளவீடுகளும் அமைப்புகளும் அப்படியே இருக்கும்.',
  'shell.fatal.reload': 'பக்கத்தை மீண்டும் ஏற்று',
  'shell.boot.failTitle': 'பயன்பாட்டைத் தொடங்க முடியவில்லை',
  'shell.boot.failText': 'பயன்பாட்டுச் சட்டகம் தொடங்கவில்லை. பக்கத்தை மீண்டும் ஏற்றுங்கள் — சேமித்த அளவீடுகளும் அமைப்புகளும் அப்படியே இருக்கும்.',
  'shell.background.error': 'பின்னணியில் ஏதோ சிதைந்தது',
  'shell.background.action': 'மீண்டும் ஏற்று',
  'shell.update.title': 'புதிய பதிப்பு கிடைக்கிறது',
  'shell.update.action': 'மீண்டும் ஏற்று',

  'onboarding.title': 'தொடங்கும் முன்',
  'onboarding.lead': 'ஒளிக் கண்காணி உங்களைச் சுற்றியுள்ள ஒளியைக் கேமராவால் பார்த்து, அதிலிருந்து ஏழு அளவைகளைக் கணக்கிடுகிறது — நீல ஒளிப் பங்கு முதல் பார்வை வசதி வரை.',
  'onboarding.privacy': 'படம் இந்தச் சாதனத்தை விட்டு ஒருபோதும் வெளியே செல்வதில்லை: சேவையகம் இல்லை, கணக்கு இல்லை, பதிவேற்ற எதுவும் இல்லை. ஏழு அளவைகளும் உடனடியாக வேலை செய்கின்றன — உள்நுழைவும் இல்லை, கட்டணமும் இல்லை.',
  'onboarding.honesty': 'இது ஒரு தோராயமான வழிகாட்டி; அளவீட்டுக் கருவியும் அல்ல, மருத்துவப் பரிசோதனையும் அல்ல. அளக்க முடியாததைக் காட்டுவதில்லை — எண்ணுக்குப் பதிலாக ஒரு கோட்டைக் காண்பீர்கள்.',
  'onboarding.start': 'தொடங்கலாம்',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'செயல்படுத்து',
  'overlay.toast.close': 'செய்தியை மூடு',
  'overlay.sheet.label': 'உரையாடல்',
  'overlay.sheet.close': 'மூடு',
  'overlay.dialog.confirm': 'உறுதிசெய்',
  'overlay.dialog.cancel': 'ரத்துசெய்',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'ரத்துசெய்',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'அளவீடு',

  'measure.intro.aria': 'அளவீட்டைத் தொடங்கு',
  'measure.intro.headline': 'எந்த ஒளியில் இருக்கிறீர்கள் என்று பாருங்கள்',
  'measure.intro.lead': 'இப்போது உங்கள் மீது விழும் ஒளியில் எவ்வளவு நீலம் உள்ளது — இந்நேரத்திற்கு அது அதிகமா — என்பதைக் கேமரா காட்டுகிறது.',
  'measure.intro.start': 'அளவீட்டைத் தொடங்கு',
  'measure.intro.hint': 'கேமராவைப் பயன்படுத்த உலாவி அனுமதி கேட்கும். அனுமதி அளித்த தருணத்திலேயே அளவீடு தொடங்கும்.',
  'measure.intro.privacy': 'கேமராவின் படம் இந்தச் சாதனத்திலேயே செயலாக்கப்படுகிறது, அதை விட்டு ஒருபோதும் வெளியே செல்வதில்லை. ஒரு சட்டகத்தைக்கூட நாங்கள் அனுப்புவதில்லை, சேமிப்பதில்லை, பகிர்வதில்லை.',

  'measure.live.aria': 'அளவீடு நடந்துகொண்டிருக்கிறது',
  'measure.badge.starting': 'தொடங்குகிறது',
  'measure.badge.paused': 'இடைநிறுத்தம்',
  'measure.badge.running': 'அளக்கிறது',
  'measure.stale': 'படத்திற்குக் காத்திருக்கிறோம் — பயன்பாடு பின்னணியில் இருக்கும்போது முன்னோட்டம் உறைந்துவிடும்.',
  'measure.crop': 'சட்டகத்தின் நடுப்பகுதியை அளக்கிறோம் — படத்தின் அகலத்திலும் உயரத்திலும் குறிக்கப்பட்ட {percent}%.',
  'measure.facing.front': 'முன் கேமரா',
  'measure.facing.back': 'பின் கேமரா',

  'measure.boot.title': 'கேமராவைத் தொடங்குகிறோம்…',
  'measure.boot.text': 'உலாவி அனுமதி கேட்டால் அதை வழங்குங்கள் — படம் இல்லாமல் அளப்பதற்கு எதுவும் இல்லை. அந்த அனுமதி இந்தப் பக்கத்திற்கு மட்டுமே பொருந்தும், பின்னர் அதைத் திரும்பப் பெறலாம்.',
  'measure.boot.cancel': 'ரத்துசெய்',

  'measure.hold': 'அளவீடுகள் உறைந்துள்ளன. கேமரா தொடர்ந்து இயங்குகிறது, ஆனால் எதுவும் வரலாற்றுக்கோ சராசரிகளுக்கோ செல்வதில்லை.',
  'measure.gridHint': 'ஒரு அளவையைப் பெரிய அளவுகாட்டிக்கு நகர்த்த, அதன் கட்டத்தைத் தேர்ந்தெடுங்கள்.',

  'measure.stop': 'நிறுத்து',
  'measure.pause': 'இடைநிறுத்து',
  'measure.resume': 'தொடர்',
  'measure.flip.aria': 'கேமராவை மாற்று',
  'measure.flip.toBack': 'பின் கேமராவுக்கு மாற்று',
  'measure.flip.toFront': 'முன் கேமராவுக்கு மாற்று',

  'measure.fail.aria': 'கேமராப் பிழை',
  'measure.fail.headline': 'கேமரா தொடங்கவில்லை',
  'measure.fail.retry': 'மீண்டும் முயற்சி',
  'measure.fail.back': 'திரும்பு',
  'measure.fail.savedSession': 'தடைக்கு முந்தைய அமர்வு ({duration}) வரலாற்றில் சேமிக்கப்பட்டது.',
  'measure.error.fallback': 'கேமராவைத் தொடங்க முடியவில்லை.',

  'measure.summary.aria': 'அமர்வுச் சுருக்கம்',
  'measure.summary.title': 'அமர்வுச் சுருக்கம்',
  'measure.summary.paused': '{duration} இடைநிறுத்தம்',
  'measure.summary.nothingMeasured': 'எந்த அளவையும் ஒரு பதிவைக்கூடச் சேகரிக்கவில்லை — அமர்வு முழுவதும் கேமராவுக்கு ஒளி தெரியவில்லை.',
  'measure.summary.note': 'இடைநிறுத்தத்திற்கு வெளியே எடுத்த மாதிரிகளை மட்டுமே சராசரிகள் கணக்கில் கொள்கின்றன. அளக்கப்படாத அளவைகள் விடப்படுகின்றன, பூஜ்ஜியமாகக் கணக்கிடப்படுவதில்லை.',
  'measure.summary.nearThreshold': 'வரம்புக்கு மிக அருகில்',
  'measure.summary.worstPoint': 'மிகவும் பலவீனமான இடம்',
  'measure.summary.averageZone': 'சராசரியாக {zone}',
  'measure.summary.tooShort': 'அமர்வு {duration} நீடித்தது — தானாக வரலாற்றில் சேர அது மிகக் குறுகியது. நீங்களே கைமுறையாகச் சேமிக்கலாம்.',
  'measure.summary.again': 'மீண்டும் அளவிடு',
  'measure.summary.save': 'வரலாற்றில் சேமி',
  'measure.summary.saved': 'வரலாற்றில் சேமிக்கப்பட்டது',
  'measure.summary.savedToast': 'அமர்வு வரலாற்றில் சேமிக்கப்பட்டது.',
  'measure.summary.close': 'மூடு',

  'measure.method.title': 'இதை எப்படி அளக்கிறோம்',
  'measure.method.p1': 'பயன்பாடு கேமராவின் படத்தை வினாடிக்குப் பத்து முறை மாதிரி எடுத்து, சட்டகத்தின் நடுவிலுள்ள {percent}% லிருந்து அளவைகளைக் கணக்கிடுகிறது — முன்னோட்டத்தில் உள்ள குறியிடு அந்தப் பகுதியைத்தான் காட்டுகிறது.',
  'measure.method.p2': 'தொலைபேசிக் கேமராவில் மூன்று அகன்ற சேனல்கள் உள்ளன; அத்துடன் வெளிச்சக் கட்டுப்பாட்டையும் வெண்மைச் சமநிலையையும் அது தானாகவே மாற்றிக்கொள்கிறது. அது ஒளியின் விகிதங்களைப் பார்க்கிறது, அதன் நிறமாலையை அல்ல.',
  'measure.method.p3': 'நீல ஒளிப் பங்கு, ஒளிர்வு, மினுக்கம், ஒருசீர்மை — இவைதான் கேமரா உண்மையில் அளப்பவை. வண்ண வெப்பநிலையும் சர்க்காடியன் தாக்கமும் sRGB அடிப்படை வண்ணங்களிலிருந்து கணக்கிட்ட, வெளிப்படையாக அறிவிக்கப்பட்ட தோராயங்கள்.',
  'measure.method.p4': 'நான்கு ஹெர்ட்ஸுக்குக் கீழ் உள்ள மினுக்கம் மட்டுமே தெரியும். மின்சார இணைப்பின் 100 Hz துடிப்பு இந்த மாதிரி எடுப்பின் எல்லைக்கு வெகு அப்பால் உள்ளது; அது ஒருபோதும் ஒரு பதிவாகத் தெரிவிக்கப்படாது.',
  'measure.method.p5': 'இந்த எண்களில் எதுவும் ஒளியளவியல் அளவீடும் அல்ல, மருத்துவ முடிவும் அல்ல. கேமராவின் படம் இந்தச் சாதனத்தை விட்டு வெளியே செல்வதில்லை.',
  'measure.method.ok': 'புரிந்தது',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'கேமராவைத் தொடங்குவது ரத்துசெய்யப்பட்டது.',
  'measure.announce.stoppedNoSamples': 'அளவீடு நிறுத்தப்பட்டது. எந்த மாதிரியும் சேகரிக்கப்படவில்லை.',
  'measure.announce.stopped': 'அளவீடு நிறுத்தப்பட்டது. அமர்வுச் சுருக்கம் தயார்.',
  'measure.announce.interrupted': 'அளவீடு தடைபட்டது. அமர்வுச் சுருக்கம் தயார்.',
  'measure.announce.paused': 'அளவீடு இடைநிறுத்தப்பட்டது. அளவீடுகள் உறைந்துள்ளன.',
  'measure.announce.resumed': 'அளவீடு மீண்டும் தொடர்கிறது.',
  'measure.announce.switchedFront': 'முன் கேமராவுக்கு மாற்றப்பட்டது. புதிய அமர்வு தொடங்குகிறது.',
  'measure.announce.switchedBack': 'பின் கேமராவுக்கு மாற்றப்பட்டது. புதிய அமர்வு தொடங்குகிறது.',
  'measure.announce.lead': 'முதன்மை அளவை: {metric}.',
  'measure.announce.cameraError': 'கேமராப் பிழை. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'அமர்வு முழுவதும் ஒளி பாதுகாப்பான எல்லைக்குள்ளேயே இருந்தது — விளக்கை இப்படியே விட்டுவிட்டு, வேறு ஒளி மூலம் வேலை செய்யும் இருட்டிய பிறகு மீண்டும் சரிபாருங்கள்.',
  'measure.advice.share.evening': 'நீல ஒளிப் பங்கு சராசரியாக {value} — திரைகளில் இரவுப் பயன்முறையை இயக்கி, மேல் விளக்கை அணைத்து, மேசை உயரத்தில் ஒரு வெதுவெதுப்பான விளக்கை மட்டும் விட்டுவையுங்கள்.',
  'measure.advice.share.day': 'நீல ஒளிப் பங்கு சராசரியாக {value} — பகலில் இது ஏற்கத்தக்கது, ஆனால் தூங்கச் செல்வதற்கு இரண்டு மணி நேரம் முன்பே திரை தானாக வெதுவெதுப்பான பயன்முறைக்கு மாறும்படி அமைத்துக்கொள்ளுங்கள்.',
  'measure.advice.brightness': 'சட்டகம் மிகை வெளிச்சத்தில் இருந்தது (சராசரியாக {value}) — ஒளி மூலத்திலிருந்து விலகுங்கள் அல்லது அளக்கும் திரையின் ஒளிர்வைக் குறையுங்கள்; அந்த அளவு வெளிச்சத்தில் மற்ற அளவைகளும் துல்லியத்தை இழக்கின்றன.',
  'measure.advice.kelvin.evening': 'வண்ண வெப்பநிலை சராசரியாக {value} ஆக இருந்தது — இருட்டிய பிறகு 3000 K க்குக் கீழே இறங்குங்கள்: விளக்கை வெதுவெதுப்பான பயன்முறைக்கு மாற்றுங்கள் அல்லது 2700 K விளக்கைப் பொருத்துங்கள்.',
  'measure.advice.kelvin.day': 'வண்ண வெப்பநிலை சராசரியாக {value} ஆக இருந்தது — பகலுக்கு இது நல்ல, விழிப்பூட்டும் வெண்மை; ஆனால் மாலையில் அதே விளக்கை 2700 K ஆக அமைத்துக்கொள்ளுங்கள்.',
  'measure.advice.melanopic.evening': 'சர்க்காடியன் தாக்கம் சராசரியாக {value} — தூக்கத்திற்கு முந்தைய இரண்டு மணி நேரத்தில் 0.50 × க்குக் கீழே இறங்குங்கள்: முதன்மை விளக்கை மங்கச் செய்து, கூரையிலிருந்து அல்லாமல் மேசை உயரத்திலிருந்து ஒளிரச் செய்யுங்கள்.',
  'measure.advice.melanopic.day': 'சர்க்காடியன் தாக்கம் சராசரியாக {value} — இந்நேரத்தில் இந்த அளவு உதவுகிறது, ஆனால் மாலையில் இந்த ஒளி மூலத்தை மெல்லிய, வெதுவெதுப்பான ஒன்றாக மாற்றுங்கள்.',
  'measure.advice.flicker': 'மினுக்கம் சராசரியாக {value} வரை சென்றது — வழக்கமாக இதற்குக் காரணம் மங்கல் கட்டுப்படுத்தி அல்லது மிகக் குறைவாக வைத்த பின்னொளி: திரையின் ஒளிர்வை 40% க்கு மேல் உயர்த்துங்கள் அல்லது PWM பயன்படுத்தாத மங்கல் கட்டுப்படுத்திக்கு மாறுங்கள்.',
  'measure.advice.uniformity': 'ஒளி சீரற்ற முறையில் விழுந்தது (சராசரியாக {value}) — ஒரே ஒரு வலுவான புள்ளிக்குப் பதிலாக, விளக்கை மேசையின் பக்கவாட்டில் வைத்து, எதிர்ப் பக்கத்திலிருந்து இரண்டாவது, மெல்லிய ஒளி மூலத்தைச் சேருங்கள்.',
  'measure.advice.comfort': 'பார்வை வசதி சராசரியாக {value} ஆக வந்தது — ஒரே ஒரு மாற்றத்தில் தொடங்குங்கள்: முதன்மை ஒளி மூலத்தின் ஒளிர்வைப் பாதியாகக் குறையுங்கள், அதன் பிறகுதான் ஒளியின் வண்ணத்தைக் கவனியுங்கள்.',
  'measure.advice.default': 'உங்கள் விளக்குகளில் ஒன்றை மாற்றி மீண்டும் அளவிடுங்கள் — ஒரே ஒரு பதிவைவிட இரண்டு அமர்வுகளின் ஒப்பீடு அதிகம் சொல்கிறது.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'வரலாறு',
  'history.action.export': 'வரலாற்றை ஏற்றுமதி செய்',

  'history.metricGroup.aria': 'அளவையின் தேர்வு',
  'history.announce.metric': 'அளவை: {metric}',
  'history.rangeGroup.aria': 'காலகட்டம்',
  'history.range.aria': 'கடைசி {range}',

  'history.stats.title': 'காலகட்டப் புள்ளிவிவரங்கள்',
  'history.stats.head': '{metric}\u00A0—\u00A0கடைசி {range}',
  'history.stats.note': 'வரைபடத்தில் தெரிவதிலிருந்து கணக்கிடப்பட்டது. அளவீடு இல்லாத நேரம் கணக்கில் சேர்க்கப்படுவதில்லை — அதன் இடத்தில் பூஜ்ஜியத்தை வைப்பதில்லை.',
  'history.stat.min': 'குறைந்தபட்சம்',
  'history.stat.avg': 'சராசரி',
  'history.stat.max': 'அதிகபட்சம்',
  'history.trend.up': 'இந்தக் காலகட்டத்தில் உயர்கிறது',
  'history.trend.flat': 'தெளிவான மாற்றம் இல்லை',
  'history.trend.down': 'இந்தக் காலகட்டத்தில் குறைகிறது',
  'history.trend.none': 'ஒப்பிடுவதற்கு எதுவும் இல்லை',

  'history.sessions.title': 'அளவீட்டு அமர்வுகள்',
  'history.sessions.count': '{sessions}, புதியது முதலில்',
  'history.sessions.empty': 'இதுவரை அமர்வுகள் இல்லை',
  'history.sessions.hint': 'அளவீட்டை நிறுத்தியதும் அமர்வு சேமிக்கப்படும்.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'வீச்சு: {range}',
  'history.session.noMeasure': 'எதுவும் அளக்கப்படவில்லை',

  'history.data.title': 'தரவு',
  'history.data.subtitle': 'வரலாறு இந்தச் சாதனத்தில் மட்டுமே சேமிக்கப்படுகிறது.',
  'history.export.csv': 'CSV ஏற்றுமதி',
  'history.export.json': 'JSON ஏற்றுமதி',
  'history.export.ok': 'கோப்பு சேமிக்கத் தயார்',
  'history.export.fail': 'கோப்பைத் தயாரிக்க முடியவில்லை. தனிப்பட்ட பயன்முறையிலும், வேறொரு பயன்பாட்டுக்குள் பொதிந்த சாளரத்திலும் உலாவி சேமிப்பைத் தடுக்கிறது — பக்கத்தை வழக்கமான தாவலில் திறங்கள்.',
  'history.export.sheet.title': 'வரலாற்று ஏற்றுமதி',
  'history.export.sheet.text': 'CSV விரிதாள் நிரலில் திறக்கும் (அரைப்புள்ளியால் பிரிக்கப்பட்டது, தசமக் குறியாகக் காற்புள்ளி). JSON எல்லாவற்றையும் தக்கவைக்கிறது — அமர்வுகளின் பட்டியலையும், எதுவும் அளக்கப்படாத இடைவெளிகளையும் சேர்த்து.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'வரலாற்றை அழி',
  'history.clear.title': 'வரலாற்றை அழிக்கவா?',
  'history.clear.text': 'இதனால் {points} மற்றும் {sessions} நீக்கப்படும். இதைத் திரும்பப் பெற முடியாது — தரவை வைத்திருக்க விரும்பினால், முதலில் அதை ஏற்றுமதி செய்யுங்கள்.',
  'history.clear.confirm': 'அழி',
  'history.clear.announce': 'வரலாறு அழிக்கப்பட்டது.',
  'history.clear.toast': 'வரலாறு அழிக்கப்பட்டது',

  'history.empty.title': 'இதுவரை காட்ட எதுவும் இல்லை',
  'history.empty.text': 'நீங்கள் அளக்கும்போது வரலாறு நிரம்புகிறது — வினாடிக்கு ஒரு புள்ளி. எல்லாம் இந்தச் சாதனத்திலேயே தங்கும்.',
  'history.empty.action': 'அளவீட்டுக்குச் செல்',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 நிமி',
  'range.5m': '5 நிமி',
  'range.1h': '1 மணி',
  'range.24h': '24 மணி',
  'range.7d': '7 நாள்',
  'range.30d': '30 நாள்',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'தேதியும் நேரமும்',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'சாதனத்தின் சேமிப்பு நிரம்பிவிட்டது — புதிய அளவீடுகள் இனி சேமிக்கப்படுவதில்லை.',
  'storage.blocked': 'வரலாற்றைச் சேமிக்க உலாவி அனுமதிக்கவில்லை — தாவலை மூடியதும் தரவு மறைந்துவிடும்.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'கருவிகள்',
  'tools.action.about': 'அளவீடு பற்றி',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'மொழி',
  'tools.language.subtitle': 'இயல்பாகப் பயன்பாடு உங்கள் சாதனத்தின் மொழியைப் பின்பற்றும்; இந்தப் பட்டியலிலிருந்து செய்யும் தேர்வு உடனே செயல்படும், இந்த உலாவியிலேயே நிலைத்திருக்கும்.',
  'tools.language.aria': 'இடைமுக மொழி',
  'tools.language.system': 'தானியங்கி',
  'tools.language.announce': 'இடைமுக மொழி: {language}.',

  'tools.appearance.title': 'தோற்றம்',
  'tools.appearance.theme.title': 'தீம்',
  'tools.appearance.theme.desc': '“தானியங்கி” உங்கள் சாதன அமைப்பைப் பின்பற்றும்.',
  'tools.appearance.theme.aria': 'தீம்',
  'tools.theme.system': 'தானியங்கி',
  'tools.theme.light': 'வெளிர்',
  'tools.theme.dark': 'இருள்',
  'tools.appearance.accent.title': 'முன்னிலை வண்ணம்',
  'tools.appearance.accent.desc': 'பொத்தான்கள், தேர்வுகள், ஸ்லைடர்களின் வண்ணம்.',
  'tools.appearance.accent.aria': 'முன்னிலை வண்ணம்',
  'tools.appearance.textScale.title': 'உரை அளவு',
  'tools.appearance.textScale.desc': 'விளக்கங்களை மட்டுமல்ல, இடைமுகம் முழுவதையும் பெரிதாக்கும்.',
  'tools.appearance.textScale.aria': 'உரை அளவு',
  'tools.appearance.density.title': 'அடர்த்தி',
  'tools.appearance.density.desc': 'நெருக்கமானது ஒரே திரையில் அதிக உள்ளடக்கத்தைக் கொள்ளும்.',
  'tools.appearance.density.aria': 'தளவமைப்பு அடர்த்தி',
  'tools.density.comfortable': 'தளர்வானது',
  'tools.density.compact': 'நெருக்கமானது',
  'tools.appearance.motion.title': 'குறைவான அசைவு',
  'tools.appearance.motion.desc': 'அசைவூட்டங்களையும் முள் மெதுவாக நகர்வதையும் நிறுத்தும். இது எப்படியிருந்தாலும், உங்கள் சாதன அமைப்பை நாங்கள் மதிக்கிறோம்.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'கடல்',
  'accent.violet': 'ஊதா',
  'accent.amber': 'அம்பர்',
  'accent.mint': 'புதினா',
  'accent.rose': 'ரோஜா',

  'tools.thresholds.title': 'வரம்புகள்',
  'tools.thresholds.subtitle': 'எந்த மதிப்பிலிருந்து பயன்பாடு “மிதமானது” என்று சொல்ல வேண்டும், எந்த மதிப்பிலிருந்து “தீங்கானது” என்று சொல்ல வேண்டும். இயல்பு வரம்புகள் எங்கள் பரிந்துரை, தரநிலை அல்ல — உங்களுக்கு ஏற்ப அமைத்துக்கொள்ளுங்கள்.',
  'tools.thresholds.warn': 'எச்சரிக்கை வரம்பு',
  'tools.thresholds.crit': 'அபாய வரம்பு',
  'tools.thresholds.warn.aria': 'எச்சரிக்கை வரம்பு — {metric}',
  'tools.thresholds.crit.aria': 'அபாய வரம்பு — {metric}',
  'tools.thresholds.reset': 'இயல்புநிலை',
  'tools.thresholds.reset.aria': 'இயல்பு வரம்புகளை மீட்டமை: {metric}',
  'tools.thresholds.moved': '{threshold} {value} க்கு நகர்த்தப்பட்டது.',
  'tools.thresholds.resetAll': 'எல்லா வரம்புகளையும் மீட்டமை',
  'tools.thresholds.resetAll.title': 'இயல்பு வரம்புகளை மீட்டமைக்கவா?',
  'tools.thresholds.resetAll.text': 'ஏழு அளவைகளும் பயன்பாடு பரிந்துரைக்கும் வரம்புகளுக்குத் திரும்பும். உங்கள் அளவீட்டு வரலாறு தொடப்படாமல் இருக்கும்.',
  'tools.thresholds.resetAll.confirm': 'மீட்டமை',
  'tools.thresholds.resetAll.cancel': 'என்னுடையதே இருக்கட்டும்',
  'tools.thresholds.resetAll.toast': 'வரம்புகள் இயல்புநிலைக்குத் திரும்பின',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': '{warn} க்கு மேல்',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} அல்லது அதற்குக் கீழ்',
  'tools.zoneRange.goodBelow': '{warn} க்குக் கீழ்',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} அல்லது அதற்கு மேல்',

  'tools.calibration.title': 'சீரமைப்பு',
  'tools.calibration.subtitle': 'ஒப்பிடுவதற்கு ஏதாவது வைத்திருப்பவர்களுக்கு.',
  'tools.calibration.intro': 'ஒரே விளக்கை நோக்கித் திருப்பிய இரண்டு தொலைபேசிகள் சற்றே வேறுபட்ட எண்களைக் காட்டும் — ஒவ்வொரு உணரிக்கும் அதற்கே உரிய நிறச் சாய்வு உண்டு. நம்பகமான ஒரு பதிவு உங்கள் கையில் இருந்தால், தனித்தனிப் படச் சேனல்களை இங்கே சற்று உயர்த்தவோ தாழ்த்தவோ செய்யலாம். எதையும் கணக்கிடுவதற்கு முன்பே இந்தப் பெருக்கிகள் செயல்படுகின்றன, எனவே ஏழு அளவைகளையும் ஒரே நேரத்தில் மாற்றுகின்றன.',
  'tools.calibration.neutral': 'ஒப்பிட எதுவும் இல்லையா? 1.00 ஆகவே விட்டுவிடுங்கள் — அதுவே தொழிற்சாலை அமைப்பு, அது எதையும் கெடுக்காது.',
  'tools.calibration.forward': 'இந்த மாற்றம் இனிமேல் நடப்பவற்றுக்குப் பொருந்தும். வரலாற்றில் ஏற்கெனவே உள்ள அளவீடுகள் சேமித்த தருணத்தில் இருந்தபடியே இருக்கும் — அவற்றை மீண்டும் கணக்கிடுவதில்லை, ஏனெனில் அது தரவைப் பின்னால் மாற்றி எழுதுவதாகும்.',
  'tools.calibration.reset': 'சீரமைப்பை மீட்டமை',
  'tools.calibration.reset.toast': 'சீரமைப்பு மீட்டமைக்கப்பட்டது',
  'tools.calibration.channel.r': 'சிவப்பு சேனல்',
  'tools.calibration.channel.g': 'பச்சை சேனல்',
  'tools.calibration.channel.b': 'நீல சேனல்',
  'tools.calibration.channel.aria': '{channel} — சீரமைப்புப் பெருக்கி',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'அளவீடு',
  'tools.measurement.wake.title': 'திரையை அணையவிடாதே',
  'tools.measurement.wake.desc': 'அளக்கும்போது திரை அணையாமல் இருக்கும். அப்போது பேட்டரி வேகமாகக் குறையும்.',
  'tools.measurement.wake.unsupported': 'திரையை அணையாமல் வைத்திருக்க இந்த உலாவி அனுமதிக்கவில்லை.',
  'tools.measurement.haptics.title': 'அதிர்வு',
  'tools.measurement.haptics.desc': 'தொடங்கும்போது, நிறுத்தும்போது, அளவை மாறும்போது ஒரு குறுகிய உறுதிப்படுத்தல்.',
  'tools.measurement.haptics.unsupported': 'இந்தச் சாதனத்தில் அதிர்வு மோட்டார் இருப்பதாகத் தெரிவிக்கப்படவில்லை.',

  'tools.about.title': 'அளவீடு பற்றி',
  'tools.about.subtitle': 'ஏழு அளவைகளில் ஒவ்வொன்றும் சரியாக எதைக் கணக்கிடுகிறது, இந்த முறையின் நேர்மை எங்கே முடிகிறது.',
  'tools.about.scale': 'அளவுகோல்: {min} முதல் {max} வரை.',
  'tools.about.threshold': '{warn} முதல் எச்சரிக்கிறோம், {crit} முதல் அபாயம் அறிவிக்கிறோம்.',
  'tools.about.thresholdInvert': '{warn} க்குக் கீழ் எச்சரிக்கிறோம், {crit} க்குக் கீழ் அபாயம் அறிவிக்கிறோம்.',
  'tools.about.limitsHead': 'இந்த அளவீட்டால் என்ன செய்ய முடியாது',
  'tools.about.limit.spectrum.title': 'அளவீட்டுக் கருவி பார்ப்பதுபோல் கேமரா வண்ணத்தைப் பார்ப்பதில்லை',
  'tools.about.limit.spectrum.text': 'தொலைபேசிக் கேமராவில் மூன்று சேனல்கள் உள்ளன: சிவப்பு, பச்சை, நீலம். ஒளியை அளக்கும் கருவியோ அவற்றைப் பல பத்துக் குறுகிய அலைப்பட்டைகளாகப் பிரிக்கிறது. இங்கே நீங்கள் பார்ப்பது அந்த மூன்று எண்களிலிருந்து — நியாயமான ஒரு முறையில் — பெறப்பட்டது; இருந்தாலும் அது ஒரு கணக்கீடே, அளந்த நிறமாலை அல்ல.',
  'tools.about.limit.exposure.title': 'கேமரா தன் வெளிச்சத்தைத் தானே சரிசெய்கிறது',
  'tools.about.limit.exposure.text': 'தொலைபேசியை ஜன்னலை நோக்கித் திருப்பினால், படம் மிகை வெளிச்சம் ஆகாமல் இருக்கக் கேமரா அதை இருட்டாக்குகிறது. அறையில் எதுவும் மாறவில்லை என்றாலும் அப்போது “காட்சி ஒளிர்வு” குறைகிறது. எனவே இந்த மதிப்பை ஒரே காட்சிக்குள் ஒப்பிடுங்கள், அறைக்கு அறை அல்ல.',
  'tools.about.limit.flicker.title': 'வேகமான மினுக்கத்தை மெதுவான கேமரா பிடிக்காது',
  'tools.about.limit.flicker.text': 'படத்தை வினாடிக்கு {hz} முறை பரிசோதிக்கிறோம். வினாடிக்கு {nyquist} முறைக்கு மேல் துடிக்கும் ஒளி, இப்படிப்பட்ட அளவீட்டில் உண்மையை விட மெதுவாகத் தோன்றலாம் அல்லது முற்றிலும் மறையலாம் — மின்சார இணைப்பின் மினுக்கம் சரியாக அந்த வேகத்தில்தான் உள்ளது. பயன்பாடு ஏதேனும் பிடித்தால், அதை “இங்கே ஏதோ துடிக்கிறது” என்ற அறிகுறியாக எடுத்துக்கொள்ளுங்கள், அளந்த அதிர்வெண்ணாக அல்ல.',
  'tools.about.limit.medical.title': 'இது மருத்துவப் பரிசோதனையும் அல்ல, மருத்துவ ஆலோசனையும் அல்ல',
  'tools.about.limit.medical.text': 'உங்களைச் சுற்றியுள்ள ஒளி குளிர்ந்ததா, மிகப் பிரகாசமானதா, அமைதியற்றதா என்பதைக் கவனிக்க இந்தப் பயன்பாடு உதவுகிறது, அதற்கு என்ன செய்யலாம் என்றும் பரிந்துரைக்கிறது. இது உங்கள் உடல்நலம் குறித்து எந்தத் தீர்ப்பையும் அளிப்பதில்லை; மருத்துவரிடம் பேசுவதற்கோ, தொழில்முறை அளவுகருவியால் அளப்பதற்கோ இது மாற்று அல்ல.',
  'tools.about.privacy': 'அனைத்தும் உங்கள் சாதனத்திலேயே கணக்கிடப்படுகிறது. கேமராவின் படம் எங்கும் அனுப்பப்படுவதும் இல்லை, சேமிக்கப்படுவதும் இல்லை — கணக்கிட்ட எண்கள் மட்டுமே சேமிப்புக்குச் செல்கின்றன.',

  'tools.data.title': 'தரவு',
  'tools.data.subtitle': 'எல்லாம் இந்த உலாவியின் சேமிப்பில் இருக்கிறது, இங்கிருந்து எங்கும் செல்வதில்லை.',
  'tools.data.summary.empty': 'இதுவரை சேமித்த அளவீடுகள் எதுவும் இல்லை.',
  'tools.data.summary': 'சேமிப்பில்: {points} மற்றும் {sessions}.',
  'tools.data.export.csv': 'CSV ஏற்றுமதி',
  'tools.data.export.json': 'JSON ஏற்றுமதி',
  'tools.data.clear': 'வரலாற்றை அழி',
  'tools.data.reset': 'இயல்பு அமைப்புகள்',
  'tools.data.reset.title': 'இயல்பு அமைப்புகளை மீட்டமைக்கவா?',
  'tools.data.reset.text': 'தோற்றம், வரம்புகள், சீரமைப்பு, அளவீட்டு அமைப்புகள் ஆகியவை தொடக்க நிலைக்குத் திரும்பும். உங்கள் அளவீட்டு வரலாறு தொடப்படாமல் இருக்கும்.',
  'tools.data.reset.confirm': 'மீட்டமை',
  'tools.data.reset.toast': 'இயல்பு அமைப்புகள் மீட்டமைக்கப்பட்டன',
  'tools.data.wipe': 'எல்லாத் தரவையும் நீக்கு',
  'tools.data.wipe.title': 'பயன்பாட்டின் எல்லாத் தரவையும் நீக்கவா?',
  'tools.data.wipe.text': 'நீங்கிப்போவது: முழு அளவீட்டு வரலாறும் அமர்வுகளின் பட்டியலும், உங்கள் வரம்புகளும் சீரமைப்பும், தோற்ற அமைப்புகளும். பயன்பாடு முதல் முறை திறந்த நிலைக்குத் திரும்பும்.',
  'tools.data.wipe.note': 'இந்தத் தரவின் நகல் எங்களிடம் இல்லை — அது இந்தச் சாதனத்தை விட்டு ஒருபோதும் வெளியே செல்லவில்லை, எனவே அதை மீட்டெடுக்க இடமும் இல்லை.',
  'tools.data.wipe.check': 'இதைத் திரும்பப் பெற முடியாது என்பதைப் புரிந்துகொண்டேன்',
  'tools.data.wipe.confirm': 'எல்லாவற்றையும் நீக்கு',
  'tools.data.wipe.toast': 'பயன்பாட்டின் எல்லாத் தரவும் நீக்கப்பட்டது',
  'tools.data.wipe.announce': 'பயன்பாட்டின் எல்லாத் தரவும் நீக்கப்பட்டது. அமைப்புகள் இயல்புநிலைக்குத் திரும்பின.',
  'tools.data.storage.blocked': 'நிரந்தரமாக எதையும் சேமிக்க இந்த உலாவி அனுமதிக்கவில்லை (தனிப்பட்ட பயன்முறை, அல்லது தளத் தரவு தடுக்கப்பட்டுள்ளது). இங்கே நீங்கள் அமைப்பது எல்லாம் தாவலை மூடியதும் மறைந்துவிடும்.',
  'tools.data.storage.full': 'உலாவியின் சேமிப்பு நிரம்பிவிட்டது, புதிய அளவீடுகள் இனி சேமிக்கப்படுவதில்லை. வரலாற்றை அழித்தால் இடம் காலியாகும்.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'ஆதரவு',
  'support.free.title': 'எல்லாம் கிடைக்கிறது',
  'support.free.lead': 'ஏழு அளவைகளும், முழு வரலாறும், வரம்புகளும், சீரமைப்பும், ஏற்றுமதியும் முதல் முறை திறந்ததிலிருந்தே வேலை செய்கின்றன — கணக்கு இல்லை, கட்டுப்பாடுகள் இல்லை, கட்டணம் இல்லை.',
  'support.free.note': 'அளவீடு முழுவதும் இந்தச் சாதனத்திலேயே கணக்கிடப்படுகிறது, இணையம் இல்லாமலும் வேலை செய்கிறது. சுவருக்குப் பின்னால் ஒளித்து வைத்த சிறந்த பதிப்பு எதுவும் இங்கே இல்லை.',
  'support.why.title': 'நான் ஏன் கேட்கிறேன்',
  'support.why.lead': 'ஒளிக் கண்காணி வேலை நேரத்திற்குப் பிறகு உருவாகிறது; இதற்குப் பின்னால் விளம்பரமும் இல்லை, நிதியுதவியாளரும் இல்லை, நிறுவனமும் இல்லை. திருத்தங்களுக்கும், புதிய அளவைகளுக்கும், இப்போது வேலை செய்வதைத் தொடர்ந்து காப்பாற்றுவதற்கும் செலவழிக்கும் நேரத்தை உங்கள் ஆதரவு ஈடுசெய்கிறது.',
  'support.what.title': 'நன்கொடையால் உங்களுக்கு என்ன கிடைக்கும்',
  'support.what.lead': 'எதுவும் இல்லை. நன்கொடை எதையும் திறந்துவிடுவதில்லை — கூடுதல் அம்சம் இல்லை, பெயருக்குப் பக்கத்தில் அடையாளச் சின்னம் இல்லை, முன்னுரிமை இல்லை. பயன்பாட்டால் செய்ய முடிந்த எல்லாம் ஏற்கெனவே உங்களிடம் உள்ளது.',
  'support.what.note': 'மிஞ்சுவது இதுதான்: இது யாருக்கோ பயன்பட்டது என்பது எனக்குத் தெரியும். அதுவே உண்மையிலேயே போதுமான காரணம்.',
  'support.cta.title': 'உதவ விரும்பினால்',
  'support.cta.button': 'எனக்கு ஒரு காபி வாங்குங்கள்',
  'support.cta.nolink': 'நன்கொடைச் சுயவிவரம் இன்னும் இணைக்கப்படவில்லை. அது இணைந்ததும், இந்த இடத்தில் ஒரு பொத்தான் இருக்கும்.',
  'support.cta.privacy': 'இந்த இணைப்பு ஒரு வெளிப்புற தளத்தை (எடுத்துக்காட்டாக Buy Me a Coffee) புதிய தாவலில் திறக்கும். இந்தச் சாதனத்தை விட்டு ஏதேனும் வெளியே செல்லும் ஒரே தருணம் அதுதான் — அளவீடு எப்போதும் இங்கேயே தங்கும்.',
  'support.cta.privacyFuture': 'முகவரி சேர்க்கப்பட்டதும், அந்தப் பொத்தான் ஒரு வெளிப்புற தளத்தை (எடுத்துக்காட்டாக Buy Me a Coffee) புதிய தாவலில் திறக்கும். இந்தச் சாதனத்தை விட்டு ஏதேனும் வெளியே செல்லும் ஒரே தருணம் அதுவாகத்தான் இருக்கும் — அளவீடு எப்போதும் இங்கேயே தங்கும்.',
  'support.cta.note': 'இங்கே கவுண்ட்டவுன் இல்லை, நினைவூட்டல்கள் இல்லை, தானாகத் திறக்கும் சாளரமும் இல்லை. இந்தக் கோரிக்கை இந்தத் தாவலில் மட்டுமே காத்திருக்கிறது.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'கடைசி நிமிடம்',
  'gauge.aria': '{metric}: {value}, மண்டலம்: {zone}',
  'gauge.aria.note': '{metric}: {value}, மண்டலம்: {zone}, {note}',
  'gauge.aria.initial': '{metric}: தரவு இல்லை',
  'gauge.value.none': 'தரவு இல்லை',
  /* Odczyt słowny z jednostką: „27 சதவீதம்”, „1.20 மடங்கு”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'தோராய மதிப்பு',
  'gauge.note.offScale': 'அளவுகோலுக்கு வெளியே',
  'gauge.metric.unknown': 'தெரியாத அளவை',

  'chart.aria.label': 'அளவீட்டு வரலாற்று வரைபடம்',
  'chart.hint': 'ஊடாடும் வரைபடம். இடது, வலது அம்புக்குறிகள் வாசிப்புச் சுட்டியை நகர்த்தும்; Home, End காலகட்டத்தின் தொடக்கத்திற்கும் முடிவுக்கும் தாவும்; Escape சுட்டியை மறைக்கும்.',
  'chart.empty.title': 'தரவு இல்லை',
  'chart.empty.text': 'அளவீட்டைத் தொடங்குங்கள் — முதல் பதிவுகளுக்குப் பிறகு வரைபடம் தோன்றும்.',
  'chart.few.title': 'தரவு போதவில்லை',
  'chart.few.text': 'நம்மிடம் ஒரே ஒரு பதிவு உள்ளது: {value}. கோடு வரைய இரண்டு தேவை.',
  'chart.legend.line': 'அளவீடு',
  'chart.legend.gap': 'அளவீட்டில் இடைவெளி',
  'chart.aria.head': 'வரைபடம்: {metric}, காலகட்டம் {range}',
  'chart.aria.empty': 'இந்தக் காலகட்டத்தில் தரவு இல்லை.',
  'chart.aria.one': 'ஒரு பதிவு: {value}.',
  'chart.aria.summary': '{min} முதல் {max} வரை, சராசரி {avg}, {points}.',
  'chart.aria.gaps': 'தொடரில் இடைவெளிகள் உள்ளன — அப்போது நாங்கள் அளக்கவில்லை.',
  'chart.readout.empty': 'இந்தக் காலகட்டத்தில் தரவு இல்லை.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'வரைபடம் வரைவதற்குத் தரவு போதவில்லை.',
  'chart.readout.hint': 'ஒரு தனி அளவீட்டைப் படிக்க, வரைபடத்தின் மேல் இழுங்கள் அல்லது அம்புக்குறிகளைப் பயன்படுத்துங்கள்.',
  'chart.time.now': 'இப்போது',
  'chart.time.justNow': 'சற்று முன்',
  'chart.time.ago': '{duration} முன்',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd zegar dwunastogodzinny z „AM”, bo tak
     tamilskie ustawienia regionalne formatują godzinę. */
  'chart.sample.ago': '\u221230\u00A0நிமி',
  'chart.sample.clock': '12:00 AM',
  'chart.sample.date': 'ஆக.\u00A030',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'நீல ஒளிப் பங்கு',
  'metric.share.short': 'நாம் காணும் ஒளியில் எவ்வளவு நீல சேனலுக்கு வருகிறது.',
  'metric.share.help': 'வண்ணத்தை ஒளிர்விலிருந்து பிரிக்கிறது — இரவுப் பயன்முறையை இயக்கும்போது மாறுவது இந்த மதிப்புதான்.',
  'metric.brightness.name': 'காட்சி ஒளிர்வு',
  'metric.brightness.short': 'கேமராப் படத்தின் சராசரி ஒளிர்வு.',
  'metric.brightness.help': 'இது ஒப்பீட்டு மதிப்பு, லக்ஸ் அல்ல — கேமராவின் தானியங்கி வெளிச்சக் கட்டுப்பாடு இதை உள்ளுக்குள் நகர்த்துகிறது.',
  'metric.kelvin.name': 'வண்ண வெப்பநிலை',
  'metric.kelvin.short': 'ஒளி வெதுவெதுப்பானதா, குளிர்ந்ததா.',
  'metric.kelvin.help': '3000 K க்குக் கீழ் ஒளி வெதுவெதுப்பானது, மாலையில் மென்மையானது. பெரும்பாலான திரைகளின் இயல்பு வெண்மை 6500 K.',
  'metric.melanopic.name': 'சர்க்காடியன் தாக்கம்',
  'metric.melanopic.short': 'இந்த ஒளி உடல் கடிகாரத்தின் மீது எவ்வளவு வலுவாகச் செயல்படுகிறது.',
  'metric.melanopic.help': 'மெலனோபிக் விகிதத்தின் தோராயம். 1.00 என்பது நடுநிலைப் பகல் வெண்மை; மாலையில் 0.50 க்குக் கீழே இறங்குவது நல்லது.',
  'metric.flicker.name': 'மினுக்கம்',
  'metric.flicker.short': 'ஒளி மூலத்தின் கண்ணுக்குத் தெரியாத துடிப்பு.',
  'metric.flicker.help': 'மலிவான மங்கல் கட்டுப்படுத்திகளும் பின்னொளிகளும் துடிக்கின்றன. கண்ணுக்கு அது தெரிவதில்லை, ஆனால் சோர்வுக்கும் தலைவலிக்கும் அறியப்பட்ட ஒரு காரணம் அது.',
  'metric.uniformity.name': 'ஒருசீர்மை',
  'metric.uniformity.short': 'சட்டகம் முழுவதும் ஒளி சீராகப் பரவுகிறதா.',
  'metric.uniformity.help': 'திரையில் குறைந்த மதிப்பு என்றால் பின்னொளிக் கசிவு அல்லது பிரதிபலிப்பு; மேசையில் — தவறாக வைத்த விளக்கு.',
  'metric.comfort.name': 'பார்வை வசதி',
  'metric.comfort.short': 'ஆறு எண்களுக்குப் பதிலாக ஒரே மதிப்பெண்.',
  'metric.comfort.help': 'மற்ற அளவீடுகளை 0 முதல் 100 வரையிலான ஒரு மதிப்பெண்ணாகச் சேர்த்து, அதை எது மிகவும் தாழ்த்துகிறது என்பதைக் காட்டுகிறது. எடைகள் எங்கள் தலையங்க முடிவு, தரநிலை அல்ல.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'பாதுகாப்பானது',
  'zone.warn': 'மிதமானது',
  'zone.crit': 'தீங்கானது',
  'zone.none': 'தரவு இல்லை',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('ஆக. 24'). */
  'date.month.short.1': 'ஜன.',
  'date.month.short.2': 'பிப்.',
  'date.month.short.3': 'மார்.',
  'date.month.short.4': 'ஏப்.',
  'date.month.short.5': 'மே',
  'date.month.short.6': 'ஜூன்',
  'date.month.short.7': 'ஜூலை',
  'date.month.short.8': 'ஆக.',
  'date.month.short.9': 'செப்.',
  'date.month.short.10': 'அக்.',
  'date.month.short.11': 'நவ.',
  'date.month.short.12': 'டிச.',

  'date.clock': '{hours}:{minutes}',
  /* Kolejność wstawek jest tu odwrotna niż po polsku: tamilski skrót daty to
     „ஆக. 30”, nie „30 ஆக.”. Nazwy wstawek zostają te same — zmienia się
     wyłącznie ich miejsce w zdaniu. */
  'date.short': '{month}\u00A0{day}',
  'date.shortWithYear': '{date}, {year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0மணி',
  'time.duration.hourMinute': '{hours}\u00A0மணி {minutes}\u00A0நிமி',
  'time.duration.hour': '{hours}\u00A0மணி',
  'time.duration.minuteSecond': '{minutes}\u00A0நிமி {seconds}\u00A0வி',
  'time.duration.minute': '{minutes}\u00A0நிமி',
  'time.duration.second': '{seconds}\u00A0வி',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „சற்று முன்”. */
  'time.justNow': 'சற்று முன்',
  'time.aMinuteAgo': 'ஒரு நிமிடம் முன்',
  'time.minutesAgo': '{minutes}\u00A0நிமி முன்',
  'time.hoursAgo': '{hours}\u00A0மணி முன்',
  'time.yesterday': 'நேற்று',
  'time.daysAgo': '{days}\u00A0நாள் முன்',

  /* Formy zależne od liczby. Tamilski ma w CLDR dwie: `one` i `other`.
     Rozstrzyga je Intl.PluralRules dla języka aktywnego. */
  'time.days.plural': { one: 'நாள்', other: 'நாட்கள்' },
  'unit.sample.plural': { one: 'மாதிரி', other: 'மாதிரிகள்' },
  'unit.measurement.plural': { one: 'அளவீடு', other: 'அளவீடுகள்' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Tamilski wchodzi w oba zdania w tej samej postaci — oba klucze zostają
     (kształt słownika jest wspólny dla wszystkich języków), a wartości są tu
     identyczne. */
  'unit.session.plural': { one: 'அமர்வு', other: 'அமர்வுகள்' },
  'unit.session.accusative.plural': { one: 'அமர்வு', other: 'அமர்வுகள்' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy, choć po tamilsku brzmią tak samo — w innych językach już nie. */
  'unit.chartPoint.plural': { one: 'புள்ளி', other: 'புள்ளிகள்' },
  'unit.point.plural': { one: 'புள்ளி', other: 'புள்ளிகள்' },
  /* Po liczebniku tamilski zostawia jednostkę bez przyrostka liczby mnogiej. */
  'unit.kelvin.plural': { one: 'கெல்வின்', other: 'கெல்வின்' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „சதவீதம்”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'சதவீதம்',
  'unit.spoken.times': 'மடங்கு',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'கேமராவைப் பயன்படுத்த அனுமதி வழங்கப்படவில்லை. உங்கள் உலாவி அமைப்புகளில் இந்தப் பக்கத்திற்குக் கேமராவை அனுமதித்துவிட்டு மீண்டும் முயற்சியுங்கள்.',
  'camera.error.notfound': 'கேமரா எதுவும் கிடைக்கவில்லை. சாதனத்தில் கேமரா உள்ளதா, அது அமைப்பில் அணைக்கப்படவில்லையா என்று சரிபாருங்கள்.',
  'camera.error.inuse': 'கேமராவை வேறொரு பயன்பாடு பயன்படுத்திக்கொண்டிருக்கிறது. அந்தப் பயன்பாட்டையோ தாவலையோ மூடிவிட்டு மீண்டும் முயற்சியுங்கள்.',
  'camera.error.insecure': 'கேமரா HTTPS வழியாக அல்லது localhost இல் மட்டுமே வேலை செய்யும். “https://” என்று தொடங்கும் முகவரியில் இந்தப் பக்கத்தைத் திறங்கள்.',
  'camera.error.unsupported': 'இங்கே கேமராவை இந்த உலாவி வழங்குவதில்லை. Chrome அல்லது Safari இல், வேறொரு பயன்பாட்டுக்குள் பொதிந்த முன்னோட்டத்தில் அல்லாமல் வழக்கமான சாளரத்தில் முயற்சியுங்கள்.',
  'camera.error.unknown': 'கேமராவைத் தொடங்க முடியவில்லை.'
};
