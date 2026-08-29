/* docs/v2/i18n/ta.js — słownik WERSJI 2, tamilski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/ta.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej. Zestaw kluczy jest identyczny
 * z pl.js — pilnuje tego docs/shared/i18n/keys.test.js.
 *
 * TREŚĆ wzięta z pl.js, TERMINOLOGIA — z docs/shared/i18n/ta.js, bo to ona
 * jedzie w tej samej aplikacji i ta sama wielkość nie może nazywać się na
 * kafelku inaczej niż w opisie. Siedem nazw trzymanych bez wyjątku: நீல
 * விகிதம், காட்சி ஒளிர்வு, நிற வெப்பநிலை, நாள் தாளத் தாக்கம், மினுமினுப்பு,
 * ஒருசீர்மை, கண் சௌகரியம். Strefy: வரம்புக்குள் / எச்சரிக்கை / தீவிரம்.
 * Dalej za warstwą wspólną: aplikacja to செயலி, pomiar i odczyt to அளவீடு,
 * wielkość to அளவை, kalibracja to அளவுத்திருத்தம், skróty jednostek czasu
 * to ம. / நி. / வி. Terminy dokładane tutaj, bo warstwa wspólna ich nie ma:
 * próg — வரம்பு, profil — சுயவிவரம், strefa — மண்டலம், próbka — மாதிரி,
 * kreator — வழிகாட்டி, harmonogram — நேர அட்டவணை, alert — விழிப்பூட்டல்
 * (osobne słowo niż எச்சரிக்கை, żeby alert nie mylił się ze strefą).
 *
 * REJESTR: standardowy pisany tamilski. Zdania pomocy zwracają się do
 * użytkownika grzecznym trybem na -உங்கள்; napisy przycisków i kafelków stoją
 * w krótkim temacie rozkazującym (தொடங்கு, நிறுத்து, மூடு), bo muszą się
 * zmieścić w jednym wierszu na telefonie. Cudzysłów jak w warstwie wspólnej:
 * “ ”. Cyfry łacińskie, bo takie daje Intl.NumberFormat('ta'). Symbole
 * jednostek (%, K, ×, Hz) i identyfikatory (CSV, sRGB, PWM, index.html,
 * Buy Me a Coffee) zostają bez zmian.
 *
 * ZASTRZEŻENIA MEDYCZNE i akapity o prywatności przełożone co do treści, bez
 * osłabiania i bez dodawania obietnic — to zdania o skutkach prawnych.
 *
 * LICZEBNIKI: tamilski ma w CLDR dwie kategorie, 'one' i 'other', i tylko one
 * mają tu prawo wystąpić. Formę wybiera Intl.PluralRules('ta'), nie my.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (te same co w pl.js i z tego samego powodu):
 *   'zone.warning'        — po tamilsku „Uwaga” i „Ostrzeżenie” to jedno słowo
 *                           எச்சரிக்கை, więc nadpisanie powtarza wartość
 *                           wspólną; klucz zostaje, bo zestaw kluczy jest
 *                           wspólny dla wszystkich języków;
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules. Patrz nagłówek docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ta'] = Object.assign(window.I18nData['ta'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'ஒளி கண்காணி — நீல ஒளியின் அளவீடு',
  'app.description': 'ஒளி கண்காணி — தொலைபேசிக் கேமராவால் ஒளியின் நீல விகிதத்தை அளக்கிறது. ஏழு அளவைகள், வரைபடம், வரலாறு. அனைத்தும் அனைவருக்கும் கிடைக்கின்றன — கணக்கும் இல்லை, கட்டணமும் இல்லை.',
  'app.skipToContent': 'உள்ளடக்கத்திற்குச் செல்',
  'app.measuring': 'அளவீடு நடக்கிறது',
  'app.docsButton': 'ஆவணங்களும் விளக்கங்களும்',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — பதிப்பு 2',

  'nav.aria': 'முதன்மை வழிசெலுத்தல்',
  'nav.tablistAria': 'செயலியின் திரைகள்',
  'nav.measure': 'அளவீடு',
  'nav.history': 'வரலாறு',
  'nav.tools': 'கருவிகள்',
  'nav.support': 'ஆதரவு',
  'nav.more': 'மேலும்',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'ஆவணங்கள்',
  'panel.thresholds': 'வரம்புகளும் சுயவிவரங்களும்',
  'panel.reports': 'அறிக்கைகள்',
  'panel.export': 'தரவு ஏற்றுமதி',
  'panel.compare': 'A/B ஒப்பீடு',
  'panel.calibration': 'வெள்ளைத் தாள் அளவுத்திருத்தம்',
  'panel.screenCheck': 'என் திரையைச் சரிபார்',
  'panel.schedule': 'நேர அட்டவணை',
  'panel.alerts': 'வெளிப்பாட்டு விழிப்பூட்டல்கள்',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'திரும்பு',
  'action.close': 'மூடு',
  'action.refresh': 'புதுப்பி',
  'action.apply': 'செயல்படுத்து',
  'action.delete': 'நீக்கு',
  'action.hide': 'மறை',
  'action.start': 'தொடங்கு',
  'action.stop': 'நிறுத்து',
  'action.switch': 'மாற்று',
  'action.switchAria': 'கேமராவை மாற்று: முன் அல்லது பின்',
  'action.resetDefaults': 'இயல்புநிலையை மீட்டமை',
  'action.reports': 'அறிக்கைகள்',
  'action.exportCsv': 'CSV ஏற்றுமதி',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'திரை: {name}',
  'a11y.measureStarted': 'அளவீடு தொடங்கியது.',
  'a11y.measureStopped': 'அளவீடு நிறுத்தப்பட்டது.',
  'a11y.measureStoppedSummary': 'அளவீடு நிறுத்தப்பட்டது. நேரம்: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'வரம்புச் சுயவிவரம் செயல்படுத்தப்பட்டது.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'உறுதிப்படுத்தல்',
  'dialog.confirm': 'உறுதிசெய்',
  'dialog.cancel': 'ரத்துசெய்',
  'dialog.infoTitle': 'தகவல்',
  'dialog.ok': 'புரிந்தது',

  'help.sheetTitle': 'அளவையின் விளக்கம்',
  'help.unit': 'அலகு',
  'help.scaleRange': 'அளவுகோலின் வீச்சு',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'எச்சரிக்கை',
  'threshold.crit': 'தீவிரம்',
  'threshold.warnLabel': 'எச்சரிக்கை வரம்பு',
  'threshold.critLabel': 'தீவிர வரம்பு',
  'threshold.warnAria': '{name} — வரம்பு: எச்சரிக்கை',
  'threshold.critAria': '{name} — வரம்பு: தீவிரம்',

  /* ==================================================================
     Drobne złożenia liczby, jednostki i nazwy
     ==================================================================
     Wyglądają na zbędne, ale to właśnie one usuwają z kodu sklejanie
     napisów: szyk „wartość jednostka” i nawias po nazwie nie w każdym
     języku wyglądają tak samo. */

  'value.withUnit': '{value} {unit}',
  'metric.withUnit': '{name} ({unit})',
  'range.dash': '{min} – {max}',

  /* ==================================================================
     Ekran Pomiar
     ================================================================== */

  'firstRun.title': 'எப்படி அளப்பது',
  'firstRun.text': '“தொடங்கு” என்பதை அழுத்தி, தொலைபேசியை ஒளியூட்டப்பட்ட மேற்பரப்பை நோக்கித் திருப்பி, சில வினாடிகள் அசையாமல் பிடியுங்கள். முன்னோட்டத்தில் உள்ள சட்டகம், செயலி உண்மையில் படிக்கும் பகுதியைக் காட்டுகிறது.',
  'firstRun.close': 'குறிப்பை மூடு',

  'camera.live': 'நேரலை',
  'camera.idle': 'கேமரா அணைந்துள்ளது. “தொடங்கு” என்பதை அழுத்தி, தொலைபேசியை ஒளியூட்டப்பட்ட மேற்பரப்பை நோக்கித் திருப்பி, சில வினாடிகள் அசையாமல் பிடியுங்கள்.',
  'camera.stopped': 'அளவீடு நிறுத்தப்பட்டது. மீண்டும் அளக்க “தொடங்கு” என்பதை அழுத்தவும்.',

  'error.cameraStart': 'கேமராவைத் தொடங்க முடியவில்லை.',
  'error.engineMissing': 'அளவீட்டுத் தொகுதி ஏற்றப்படவில்லை.',

  'metrics.sevenTitle': 'ஏழு அளவைகள்',
  'measure.tilesSub': 'வினாடிக்கு 5 முறை புதுப்பிக்கப்படுகிறது',

  'session.title': 'இந்த அமர்வு',
  'session.duration': 'அளவீட்டு நேரம்',
  'session.samples': 'மாதிரிகள்',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     „எச்சரிக்கைகள்” to nie to samo słowo co „எச்சரிக்கை” pod suwakiem. */
  'zone.count.good': 'வரம்புக்குள்',
  'zone.count.warning': 'எச்சரிக்கைகள்',
  'zone.count.critical': 'தீவிரம்',

  'note.calibrated': 'வெள்ளைத் தாளால் அளவுத்திருத்தம் செய்யப்பட்ட அளவீடு — சேனல்கள் சமன்படுத்தப்பட்டுள்ளன.',

  'tile.helpAria': 'இதன் பொருள் என்ன: {name}',
  'tile.noMeasurement': 'அளவீடு இல்லை',
  'tile.outOfScale': 'அளவுகோலுக்கு வெளியே',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'எச்சரிக்கை',
  'zone.spoken.warning': 'எச்சரிக்கை',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'காலப்போக்கில் மாற்றம்',
  'history.pickHint': 'அளவையையும் காலகட்டத்தையும் தேர்ந்தெடுங்கள்',
  'history.metricLabel': 'அளவை',
  'history.rangeAria': 'வரைபடத்தின் காலகட்டம்',
  'history.emptyTitle': 'இந்தக் காலகட்டத்தில் தரவு இல்லை',
  'history.emptyText': 'அளவீட்டுத் திரையில் அளவீட்டைத் தொடங்குங்கள் — சில வினாடிகளில் வரைபடம் நிரம்பும்.',
  'history.tableTitle': 'சமீபத்திய அளவீடுகள்',
  'history.tableHide': 'அட்டவணையை மறை',
  'history.tableShow': 'அட்டவணையைக் காட்டு',
  'history.tableCaption': 'சமீபத்திய அளவீடுகள், புதியது மேலே.',
  'history.tableEmpty': 'அளவீடுகள் இல்லை. அளவீட்டுத் திரையில் அளவீட்டைத் தொடங்குங்கள்.',

  'table.time': 'நேரம்',
  'table.metric': 'அளவை',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     dłuższy zapis łamał się na dwie linie. */
  'range.1m': '1 நிமி',
  'range.1h': '1 மணி',
  'range.24h': '24 மணி',
  'range.7d': '7 நாள்',
  'range.30d': '30 நாள்',

  'chart.now': 'இப்போது',
  'chart.countSub': {
    one: 'தேர்ந்த காலகட்டத்தில் {n} அளவீடு',
    other: 'தேர்ந்த காலகட்டத்தில் {n} அளவீடுகள்'
  },
  'chart.aria': '{name}, காலகட்டம் {range}, {count}, கடைசி மதிப்பு {value} {unit}.',
  'chart.ariaZone': '{name}, காலகட்டம் {range}, {count}, கடைசி மதிப்பு {value} {unit}, மண்டலம்: {zone}.',
  'chart.ariaEmpty': '{name} — {range} காலகட்டத்தில் தரவு இல்லை.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'வழிகாட்டிகளும் துணைச் செயல்பாடுகளும்',
  'tools.note': 'அளவீட்டை விளங்கிக்கொள்ளக் கருவிகள் உதவுகின்றன. அனைத்தும் உடனடியாகக் கிடைக்கின்றன, அளவீடு அவற்றைச் சாராமல் தனியாக வேலை செய்கிறது.',

  'tool.thresholds.sub': 'எந்த மதிப்பில் எச்சரிக்கை தோன்ற வேண்டும்',
  'tool.compare.sub': 'இரண்டு ஒளிகளில் எது மென்மையானது',
  'tool.calibration.sub': 'துல்லியத்தை உண்மையிலேயே உயர்த்தும் ஒரே செயல்பாடு',
  'tool.screenCheck.sub': 'ஐந்து படிகள், திரையைப் பற்றி ஒரு முடிவு',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „வரம்பு நேர அட்டவணை”
     kontra „நேர அட்டவணை”. Tak było i tak zostaje. */
  'tool.schedule.title': 'வரம்பு நேர அட்டவணை',
  'tool.schedule.sub': 'மாலையில் வேறு வரம்புகள், நினைவில் வைக்காமலேயே',
  'tool.alerts.sub': 'தீவிர மண்டலம் நீண்ட நேரம் நீடித்தால் ஒரு சமிக்ஞை',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'அமைப்புகள்',
  'more.thresholdsSub': 'எந்த மதிப்பில் எச்சரிக்கை தோன்ற வேண்டும்',
  'more.docsSub': 'எப்படி அளப்பது, இந்த அளவீடு எதைச் சொல்வதில்லை',
  'more.appearanceTitle': 'தோற்றமும் அணுகல்தன்மையும்',

  'settings.theme': 'தீம்',
  'theme.auto': 'சாதனத்தின்படி',
  'theme.light': 'வெளிர்',
  'theme.dark': 'இருள்',

  'settings.textScale': 'உரை அளவு',
  'textScale.100': 'நிலையானது',
  'textScale.115': 'பெரியது (115%)',
  'textScale.130': 'மிகப் பெரியது (130%)',

  'settings.contrast': 'அதிக மாறுபாடு',
  'settings.contrastSub': 'வலுவான விளிம்புகளும் கருமையான துணை உரையும்.',
  'settings.sound': 'விழிப்பூட்டல் ஒலி',
  'settings.soundSub': 'வெளிப்பாட்டு விழிப்பூட்டல் இயங்கும்போது ஒரு குறுகிய சமிக்ஞை.',
  'settings.vibrate': 'விழிப்பூட்டல்களில் அதிர்வு',
  'settings.vibrateSub': 'அதை ஆதரிக்கும் சாதனங்களில் மட்டுமே வேலை செய்யும்.',

  'more.dataTitle': 'தரவு',
  'more.clearHistory': 'அளவீட்டு வரலாற்றை அழி',
  'more.clearHistorySub': 'இந்தச் சாதனத்தில் சேமித்த அளவீடுகளை நீக்குகிறது. வரம்புகள், சுயவிவரங்கள், அமைப்புகள் அப்படியே இருக்கும்.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'இந்தச் செயலி முழுவதும் இலவசம். ',
  'more.supportLink': 'விரும்பினால் தன்னார்வமாக இதை ஆதரிக்கலாம்.',

  'dialog.clearHistory.title': 'சேமித்த வரலாற்றை நீக்கவா?',
  'dialog.clearHistory.body': {
    one: 'இந்தச் சாதனத்திலிருந்து சேமித்த {n} அளவீட்டுப் புள்ளியை நீக்குவோம். இதைத் திரும்பப் பெற முடியாது. வரம்புகள், சுயவிவரங்கள், அமைப்புகள் தொடப்படாமல் இருக்கும்.',
    other: 'இந்தச் சாதனத்திலிருந்து சேமித்த {n} அளவீட்டுப் புள்ளிகளை நீக்குவோம். இதைத் திரும்பப் பெற முடியாது. வரம்புகள், சுயவிவரங்கள், அமைப்புகள் தொடப்படாமல் இருக்கும்.'
  },
  'dialog.clearHistory.confirm': 'வரலாற்றை நீக்கு',
  'dialog.clearHistory.cancel': 'இருக்கட்டும்',

  'toast.historyCleared': 'அளவீட்டு வரலாறு நீக்கப்பட்டது.',
  'toast.screenUnavailable': 'இந்தப் பதிப்பில் இந்தத் திரை இன்னும் கிடைக்கவில்லை.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'இந்தச் செயலி எதை அளக்கிறது',
  'docs.leadText': 'தொலைபேசிக் கேமரா ஒளியூட்டப்பட்ட மேற்பரப்பைப் பார்க்கிறது; சட்டகத்தின் நடுப்பகுதியிலிருந்து R, G, B சேனல்களின் சராசரியை வினாடிக்கு ஐந்து முறை செயலி கணக்கிடுகிறது. அந்த மூன்று எண்களிலிருந்து ஏழு அளவைகளைப் பெறுகிறது.',
  'docs.limitsTitle': 'முறையின் எல்லைகள்',
  'docs.limitsText': 'கேமராவில் மூன்று அகன்ற நிறச் சேனல்களும், தானியங்கி வெளிப்பாடும், தானியங்கி வெண்மைச் சமநிலையும் உள்ளன. அது நிறமாலையை அளப்பதில்லை, தனிச்சார்பு மதிப்புகளையும் அறியாது; எனவே ஒளிர்வு ஒப்பீட்டுக் குறிகாட்டி, லக்ஸ் அல்ல. நிற வெப்பநிலையும் நாள் தாளத் தாக்கமும் sRGB நிறங்களிலிருந்து கணக்கிடப்பட்ட தோராயங்கள். {rate} Hz மாதிரியெடுப்பு {limit} Hz-க்குக் கீழே உள்ள மினுமினுப்பை மட்டுமே காண்கிறது — மின்வழங்கலின் 100 Hz எட்டாத தொலைவில் உள்ளது, அதை இந்தச் செயலி ஒருபோதும் முடிவாகத் தராது.',

  'note.howTo.repeat.title': 'அளவீட்டை மீண்டும் செய்யுங்கள்',
  'note.howTo.repeat.text': 'ஒற்றை அளவீடு ஒரு கணப்பொழுதின் படம். பத்துப் பதினைந்து வினாடிகள் அளப்பது மிகவும் நம்பகமான படத்தைத் தருகிறது.',

  'docs.scale': 'அளவுகோல்',
  'docs.direction': 'திசை',
  'docs.directionHigher': 'அதிகம் என்றால் சிறந்தது',
  'docs.directionLower': 'குறைவு என்றால் மென்மையானது',
  'docs.privacyTitle': 'தரவும் தனியுரிமையும்',
  'docs.privacyText': 'கேமராவின் படம் எங்கும் அனுப்பப்படுவதும் இல்லை, சேமிக்கப்படுவதும் இல்லை — ஒவ்வொரு சட்டகத்திலிருந்தும் மூன்று எண்கள் மட்டுமே தங்குகின்றன. அளவீடுகள், வரம்புகள், அமைப்புகள் இந்தச் சாதனத்தில் உலாவியின் சேமிப்பில் இருக்கின்றன. செயலி எந்த வலையமைப்பு வேண்டுகோளையும் அனுப்புவதில்லை, இணையம் இல்லாமலும் வேலை செய்கிறது.',
  'docs.freeLine': 'ஏழு அளவைகளும், வரலாறும், வரைபடமும், கருவிகளும், இணையமில்லாப் பயன்முறையும் அனைவருக்கும் வேலை செய்கின்றன — கணக்கும் இல்லை, கட்டணமும் இல்லை.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'எல்லாம் கிடைக்கிறது',
  'support.heroText': 'ஏழு அளவைகளும், அளவீட்டு வரலாறும், வரைபடமும், எல்லாக் கருவிகளும், இணையமில்லாப் பயன்முறையும் அனைவருக்கும் உடனடியாக வேலை செய்கின்றன. கணக்கு இல்லை, கட்டுப்பாடுகள் இல்லை, கட்டணம் இல்லை.',
  'support.whyTitle': 'நான் ஏன் இதைக் கேட்கிறேன்',
  'support.whyText': '{app} வேலை நேரத்திற்குப் பிறகு உருவாகிறது, யாரிடமிருந்தும் சம்பாதிப்பதில்லை: விளம்பரம் இல்லை, தரவு சேகரிப்பு இல்லை, விற்பதற்கு எதுவும் இல்லை. இதைப் பராமரிப்பதும் மேலும் வளர்ப்பதும் — புதிய அளவைகள், திருத்தங்கள், இன்னும் பல தொலைபேசிகளில் சோதனைகள் — நேரத்தைச் செலவழிக்கின்றன. செயலி உங்களுக்குப் பயன்பட்டிருந்தால், நீங்கள் பங்களிக்கலாம். கட்டாயம் இல்லை.',
  'support.whatTitle': 'நன்கொடையால் என்ன கிடைக்கும்',
  'support.whatText': 'எதுவும் இல்லை. அது உண்மையிலேயே எதையும் திறந்துவிடுவதில்லை, எதையும் விரைவுபடுத்துவதில்லை — அதற்கு முன்பும் பின்பும் செயலி அப்படியே தோன்றுகிறது, அப்படியே வேலை செய்கிறது. இந்த வேலை யாருக்கோ பயன்பட்டது என்பது ஆசிரியருக்குத் தெரியும் — அது தருவது அவ்வளவுதான்.',
  'support.button': 'எனக்கு ஒரு காபி வாங்குங்கள்',
  'support.pendingTitle': 'சுயவிவரம் இன்னும் இணைக்கப்படவில்லை',
  'support.pendingText': 'ஆதரவை அனுப்புவதற்கான முகவரி இங்கே இன்னும் இல்லை. அது தயாரானதும் இந்த இடத்தில் தோன்றும் — அதுவரை செயலியில் எல்லாம் அப்படியே வேலை செய்கிறது.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'பொத்தான் Buy Me a Coffee இன் வெளிப் பக்கத்தை புதிய தாவலில் திறக்கிறது. இந்தச் சாதனத்தைவிட்டு ஏதேனும் வெளியே செல்லும் ஒரே தருணம் அதுதான் — அதுவும் நீங்கள் அழுத்திய பிறகுதான் நடக்கிறது. அளவீடுகள், வரலாறு, அமைப்புகள் இங்கேயே இருக்கின்றன.',
  'privacy.externalPending': 'முகவரி கிடைத்ததும், பொத்தானை அழுத்தினால் ஒரு வெளிப் பக்கம் புதிய தாவலில் திறக்கும். இந்தச் சாதனத்தைவிட்டு ஏதேனும் வெளியே செல்லும் ஒரே தருணம் அதுவாகவே இருக்கும். அளவீடுகள், வரலாறு, அமைப்புகள் இங்கேயே இருக்கின்றன.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (ui-core.js இல் மாற்று)',
  'boot.need.metrics': 'எந்த மதிப்பும் கணக்கிடப்படாது',
  'boot.need.bus': 'தொகுதிகள் ஒன்றையொன்று காணாமல் போகும்',
  'boot.need.ui': 'திரைகளை மாற்ற முடியாது',
  'boot.need.engine': 'கேமராவும் அளவீடும் தொடங்காது',
  'boot.need.support': 'ஆதரவுத் திரை காலியாக இருக்கும்',
  'boot.need.tools': 'கருவிகள் தாவல் காலியாக இருக்கும்',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'இந்தத் தொகுதிகள் ஏற்றப்படவில்லை: {list}.',
  'boot.consoleHint': 'index.html இல் <script> குறிச்சொற்களின் வரிசையையும் பாதைகளையும் சரிபார்க்கவும்.',
  'boot.incompleteTitle': 'செயலி முழுமையாக ஏற்றப்படவில்லை',
  'boot.incompleteText': '{missing} பக்கத்தை மீண்டும் ஏற்றுங்கள்; அது உதவவில்லை என்றால், சேவையகத்தில் கோப்புகள் முழுமையற்றவை.',
  'boot.newVersion': 'செயலியின் புதிய பதிப்பு உள்ளது.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'வரம்புகள் என்ன செய்கின்றன. ',
  'thresholds.noteText': 'எச்சரிக்கை வரம்பு மஞ்சள் நிலையையும், தீவிர வரம்பு சிவப்பு நிலையையும் ஏற்றுகிறது. மாற்றம் உடனடியாகச் செயல்படுகிறது — ஏற்கெனவே திரையில் உள்ள அளவீட்டிலும். உங்கள் சொந்த வரம்புத் தொகுப்பைப் பெயரிட்டுச் சேமித்து, விரும்பும்போதெல்லாம் அதற்குத் திரும்பலாம்.',
  'thresholds.profilesTitle': 'வரம்புச் சுயவிவரங்கள்',
  'thresholds.profilesSub': 'உள்ளமைந்த மூன்றும் உங்கள் சொந்தமும்',
  'thresholds.customName': 'உங்கள் சொந்தச் சுயவிவரத்தின் பெயர்',
  'thresholds.customPlaceholder': 'எ.கா. மாலையில் படுக்கையறை',
  'thresholds.save': 'இப்போதைய வரம்புகளைச் சேமி',
  'thresholds.saveHelp': 'மேலே அமைத்த வரம்புகளை அப்படியே சேமிக்கிறது.',

  'profile.builtin.default.name': 'இயல்பு',
  'profile.builtin.default.desc': 'அளவைப் பட்டியலின் வரம்புகள் — எல்லா அளவீடுகளுக்கும் தொடக்கப் புள்ளி.',
  'profile.builtin.evening.name': 'மாலை — மென்மையானது',
  'profile.builtin.evening.desc': 'குளிர்ந்த ஒளி நிறத்தையும் நாள் தாளத் தாக்கத்தையும் முன்கூட்டியே எச்சரிக்கிறது.',
  'profile.builtin.work.name': 'மேசை வேலை',
  'profile.builtin.work.desc': 'பிரகாசமான, குளிர்ந்த பகல் ஒளியை அனுமதிக்கிறது; மினுமினுப்பையும் ஒருசீர்மையையும் கவனிக்கிறது.',
  'profile.custom.desc': '{date} அன்று சேமித்த சொந்தச் சுயவிவரம்.',

  'toast.thresholdsReset': 'இயல்பு வரம்புகள் மீட்டமைக்கப்பட்டன.',
  'toast.thresholdOrder': 'எச்சரிக்கை வரம்பு தீவிர வரம்பைவிடக் குறைவாக இருக்க வேண்டும்.',
  'toast.thresholdOrderInverted': 'இந்த அளவைக்கு எச்சரிக்கை வரம்பு தீவிர வரம்பைவிட அதிகமாக இருக்க வேண்டும்.',
  'toast.profileNameMissing': 'சுயவிவரத்தின் பெயரைத் தாருங்கள்.',
  'toast.profileSaved': '“{name}” சுயவிவரம் சேமிக்கப்பட்டது.',
  'toast.profileApplied': '“{name}” சுயவிவரம் செயல்படுத்தப்பட்டது.',
  'toast.profileApplyFailed': 'இந்தச் சுயவிவரத்தைச் செயல்படுத்த முடியவில்லை.',
  'toast.profileRemoved': 'சுயவிவரம் நீக்கப்பட்டது.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'நேர அட்டவணை எதற்கு. ',
  'schedule.noteText': 'மாலையில் பொருத்தமான வரம்புகள் நண்பகலில் பொருத்தமானவை அல்ல. “எப்போதிலிருந்து–எப்போதுவரை” விதி சுயவிவரத்தைத் தானே மாற்றிக்கொள்கிறது, அதனால் அதை நினைவில் வைக்க வேண்டியதில்லை. நேர அட்டவணை ஒருபோதும் அளவீட்டைத் தொடங்குவதும் இல்லை, நிறுத்துவதும் இல்லை.',
  'schedule.toggle': 'தானியங்கி மாற்றத்தை இயக்கு',
  'schedule.toggleSub': 'சாதனத்தின் கடிகாரப்படி ஒவ்வொரு நிமிடமும் சரிபார்க்கப்படுகிறது.',
  'schedule.emptyTitle': 'விதிகள் இல்லை',
  'schedule.emptyText': 'கீழே உள்ள பொத்தானால் முதல் விதியைச் சேருங்கள்.',
  'schedule.add': 'விதியைச் சேர்',
  'schedule.to': 'முதல்',
  'schedule.profile': 'சுயவிவரம்',
  'schedule.fromAria': 'விதி {n}: தொடக்க நேரம்',
  'schedule.toAria': 'விதி {n}: முடிவு நேரம்',
  'toast.scheduleTimeFormat': 'நேரங்களை 22:00 வடிவத்தில் தாருங்கள்.',
  'toast.scheduleEnded': 'நேர அட்டவணை முடிந்தது — முந்தைய வரம்புகள் திரும்பின.',
  'toast.scheduleApplied': 'நேர அட்டவணை “{name}” சுயவிவரத்தை இயக்கியது.',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'விழிப்பூட்டல் என்ன செய்கிறது. ',
  'alerts.noteText': 'அது ஒரே ஒரு அளவையைக் கவனிக்கிறது; நீங்கள் அமைத்த நேரம் முழுவதும் அந்த அளவை தேர்ந்த மண்டலத்தில் இடைவிடாமல் நின்றால் மட்டுமே குரல் கொடுக்கிறது. அளவீட்டை ஒருபோதும் நிறுத்துவதில்லை, பொத்தான்களை மறைப்பதுமில்லை.',
  'alerts.toggle': 'வெளிப்பாட்டு விழிப்பூட்டல்களை இயக்கு',
  'alerts.toggleSub': 'அளவீடு நடக்கும்போது மட்டுமே வேலை செய்கின்றன.',
  'alerts.metric': 'கவனிக்கப்படும் அளவை',
  'alerts.level': 'எந்த மண்டலத்திலிருந்து',
  'alerts.level.warning': 'எச்சரிக்கையும் அதற்கு மேலும்',
  'alerts.level.critical': 'தீவிரம் மட்டும்',
  'alerts.sustain': 'எத்தனை வினாடிகள் இடைவிடாமல்',
  'alerts.sustainHelp': 'குறுகிய நேரங்கள், தொலைபேசியை நகர்த்தும்போது அதிக தவறான அலாரங்களைத் தரும்.',
  'alerts.sound': 'குறுகிய ஒலிச் சமிக்ஞை',
  'alerts.soundSub': 'ஒலி இந்தச் சாதனத்திலேயே உருவாக்கப்படுகிறது. மேலும் திரையில் அதை முழுவதுமாக அணைக்கவும் முடியும்.',
  'alerts.barTitle': 'வெளிப்பாட்டு விழிப்பூட்டல்',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} {seconds} வினாடிகளாக எச்சரிக்கை மண்டலத்தில் நிற்கிறது — இப்போது {value} {unit}.',
  'alerts.message.critical': '{name} {seconds} வினாடிகளாகத் தீவிர மண்டலத்தில் நிற்கிறது — இப்போது {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'எப்படி ஒப்பிடுவது. ',
  'compare.noteText': 'அளவீட்டைத் தொடங்கி, கேமராவை முதல் ஒளி மூலத்தை நோக்கித் திருப்பி, அதை A ஆகச் சேமியுங்கள். தூரத்தையோ கோணத்தையோ மாற்றாமல் ஒளியை மாற்றி B ஐச் சேமியுங்கள். காட்சி ஒன்றாக இருந்தால் மட்டுமே ஒப்பீட்டுக்குப் பொருள் உண்டு.',
  'compare.slotA': 'ஒளி A',
  'compare.slotB': 'ஒளி B',
  'compare.save': 'இப்போதைய அளவீட்டைச் சேமி',
  'compare.savedAt': '{date}, {time} அன்று சேமிக்கப்பட்டது',
  'compare.empty': 'இதுவரை எதுவும் சேமிக்கப்படவில்லை.',
  'compare.verdictTitle': 'ஒப்பீட்டின் முடிவு',
  'compare.verdictEmpty': 'எது மென்மையானது என்று பார்க்க இரு ஒளிகளையும் சேமியுங்கள்.',
  'compare.notEnough': 'இந்த இரு அளவீடுகளை ஒப்பிடப் போதுமான தரவு இல்லை.',
  'compare.tie': 'இரு ஒளி மூலங்களும் கிட்டத்தட்ட ஒரே மாதிரி வருகின்றன ({metric}: {a}, {b} {unit}). வேறுபாடு அளவீட்டின் இரைச்சலுக்குள்ளேயே உள்ளது.',
  'compare.betterA': 'மென்மையானது ஒளி A — அதன் {metric} {better} {unit}, மற்றதில் {worse} {unit}.',
  'compare.betterB': 'மென்மையானது ஒளி B — அதன் {metric} {better} {unit}, மற்றதில் {worse} {unit}.',
  'compare.clear': 'ஒப்பீட்டை அழி',
  'toast.compareSavedA': 'ஒளி A சேமிக்கப்பட்டது.',
  'toast.compareSavedB': 'ஒளி B சேமிக்கப்பட்டது.',
  'toast.compareCleared': 'ஒப்பீடு அழிக்கப்பட்டது.',
  'toast.measureFirst': 'முதலில் அளவீட்டுத் திரையில் அளவீட்டைத் தொடங்குங்கள்.',

  /* Nazwa wielkości w środku zdania. Po polsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. Tamilski
     nie zna wielkiej litery, więc te siedem wartości jest co do znaku takie
     samo jak nazwy w warstwie wspólnej — i takie ma zostać. */
  'metric.share.nameLower': 'நீல விகிதம்',
  'metric.brightness.nameLower': 'காட்சி ஒளிர்வு',
  'metric.kelvin.nameLower': 'நிற வெப்பநிலை',
  'metric.melanopic.nameLower': 'நாள் தாளத் தாக்கம்',
  'metric.flicker.nameLower': 'மினுமினுப்பு',
  'metric.uniformity.nameLower': 'ஒருசீர்மை',
  'metric.comfort.nameLower': 'கண் சௌகரியம்',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'இது ஏன் வேலை செய்கிறது. ',
  'calib.noteText': 'கேமராவின் உணரிக்குச் சேனல்களுக்கிடையே ஒரு நிலையான சாய்வு உண்டு. வெள்ளைத் தாளை அளப்பது அது எவ்வளவு பெரியது என்பதைக் காட்டி, அதைக் கழிக்க வழிசெய்கிறது. இந்தச் செயலியில் துல்லியத்தை உண்மையிலேயே உயர்த்தும் ஒரே செயல்பாடு இதுதான் — இருந்தாலும் இது கேமராவை நிறமாலைமானியாக மாற்றிவிடுவதில்லை.',
  'calib.step1': 'அளக்கும் ஒளியின் கீழ் வெள்ளைத் தாளை வையுங்கள்',
  'calib.step2': 'அளவீட்டைத் தொடங்கி, சட்டகத்தைத் தாளால் நிரப்புங்கள்',
  'calib.step3': '“அளவுத்திருத்தம்” என்பதை அழுத்தி, 3 வினாடிகள் தொலைபேசியை அசைக்காதீர்கள்',
  'calib.done': '{date}, {time} அன்று அளவுத்திருத்தம் செய்யப்பட்டது.',
  'calib.none': 'அளவுத்திருத்தம் இல்லை. அளவீடு வேலை செய்கிறது; மதிப்புகளை ஒப்பீட்டளவில் எடுத்துக்கொள்ளுங்கள்.',
  'calib.gain': '{channel} பெருக்கி',
  'calib.gainsLabel': 'சேனல் பெருக்கிகள்',
  'calib.gainsUnset': 'அமைக்கப்படவில்லை',
  'calib.start': 'அளவுத்திருத்தம் (3 வி.)',
  'calib.clear': 'அளவுத்திருத்தத்தை நீக்கு',
  'toast.calibCleared': 'அளவுத்திருத்தம் நீக்கப்பட்டது.',
  'calib.error.noEngine': 'அளவீட்டுத் தொகுதி கிடைக்கவில்லை.',
  'calib.error.notRunning': 'முதலில் அளவீட்டைத் தொடங்கி, கேமராவை வெள்ளைத் தாளை நோக்கித் திருப்புங்கள்.',
  'calib.error.busy': 'அளவுத்திருத்தம் ஏற்கெனவே நடக்கிறது.',
  'calib.error.tooFewSamples': 'மாதிரிகள் மிகக் குறைவு. அளவீடு உண்மையில் நடக்கிறதா என்று சரிபாருங்கள்.',
  'calib.error.tooDark': 'அளவுத்திருத்தம் செய்யப் படம் மிகவும் இருட்டாக உள்ளது. தாளுக்கு மேலும் ஒளியூட்டி மீண்டும் முயற்சியுங்கள்.',
  'calib.error.tooSkewed': 'சேனல்களின் சாய்வு மிகப் பெரியது, அதை அளவுத்திருத்தமாக ஏற்க முடியாது. சீரான ஒளியில் வெள்ளைத் தாளைப் பயன்படுத்துங்கள்.',
  'calib.ok': 'அளவுத்திருத்தம் முடிந்தது. நிற வெப்பநிலையும் நாள் தாளத் தாக்கமும் இனி மேலும் துல்லியமாக இருக்கும்.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'இது எதற்குப் பயன்படுகிறது. ',
  'screencheck.noteText': 'விமர்சனத்தில் திரையைச் சோதிப்பதுபோல ஐந்து படிகள் அதைச் சோதிக்கின்றன: இரு ஒளிர்வுகளில் வெண்மை, பின்னொளியின் ஒருசீர்மை, கணினியின் இரவு பயன்முறை உண்மையில் ஏதேனும் மாற்றுகிறதா என்பது. வழிகாட்டி நடந்துகொண்டிருக்கும் அளவீட்டைப் படிக்கிறது; அதைத் தானே தொடங்குவதில்லை.',
  'screencheck.step.white100.title': 'முழு ஒளிர்வில் வெண்மை',
  'screencheck.step.white100.hint': 'திரையில் ஒரு வெள்ளைப் பக்கத்தைத் திறந்து, ஒளிர்வை அதிகபட்சமாக அமைத்து, சட்டகத்தைத் திரையால் நிரப்புங்கள்.',
  'screencheck.step.white20.title': 'குறைந்த ஒளிர்வில் வெண்மை',
  'screencheck.step.white20.hint': 'திரையின் ஒளிர்வை ஏறத்தாழ ஐந்தில் ஒரு பங்காகக் குறைத்து, சட்டகத்தை மாற்றாதீர்கள்.',
  'screencheck.step.corners.title': 'திரையின் மூலைகள்',
  'screencheck.step.corners.hint': 'முழு ஒளிர்வுக்குத் திரும்பி, முழுத் திரையையும் கேமராவுக்குக் காட்டுங்கள் — பின்னொளியின் ஒருசீர்மையைச் சரிபார்க்கிறோம்.',
  'screencheck.step.nightOff.title': 'இரவு பயன்முறை அணைக்கப்பட்டது',
  'screencheck.step.nightOff.hint': 'நீல ஒளி வடிகட்டி அணைக்கப்பட்டுள்ளதா என்பதை உறுதிசெய்யுங்கள்.',
  'screencheck.step.nightOn.title': 'இரவு பயன்முறை இயக்கப்பட்டது',
  'screencheck.step.nightOn.hint': 'கணினியில் நீல ஒளி வடிகட்டியை இயக்கி, அதே சட்டகத்தை மீண்டும் காட்டுங்கள்.',
  'screencheck.stepHeading': 'படி {n} / {total}: {title}',
  'screencheck.idleTitle': 'வழிகாட்டி இயங்கவில்லை',
  'screencheck.idleHint': 'அளவீட்டுத் திரையில் அளவீட்டைத் தொடங்கி, இங்கே திரும்பி “தொடங்கு” என்பதை அழுத்துங்கள்.',
  'screencheck.next': 'படியைச் சேமித்து அடுத்ததற்குச் செல்',
  'screencheck.cancel': 'கைவிடு',
  'screencheck.start': 'வழிகாட்டியைத் தொடங்கு',
  'screencheck.clearResult': 'முடிவை அழி',
  'screencheck.resultTitle': 'முடிவு',
  'screencheck.resultEmpty': 'இதுவரை எந்தப் படியும் சேமிக்கப்படவில்லை.',
  'screencheck.resultPartial': '{total} படிகளில் {done} சேமிக்கப்பட்டது. ஒப்பிட ஏதேனும் இருக்கும்போது முடிவுகள் தோன்றும்.',
  'screencheck.note.uniformityLow': 'பின்னொளியின் ஒருசீர்மை {value}% — சட்டகத்தில் ஒளிர்வு வேறுபாடுகள் தெளிவாகத் தெரிகின்றன.',
  'screencheck.note.uniformityOk': 'பின்னொளி சீராக உள்ளது ({value}%).',
  'screencheck.note.nightWorks': 'இரவு பயன்முறை நீல விகிதத்தை {value} சதவீதப் புள்ளிகள் குறைக்கிறது — அது வேலை செய்கிறது.',
  'screencheck.note.nightWeak': 'இரவு பயன்முறை நீல விகிதத்தை {value} சதவீதப் புள்ளிகள் மட்டுமே மாற்றுகிறது. கணினியின் வடிகட்டி வழக்கமாகத் தருவதைவிட இது குறைவு.',
  'screencheck.note.pwm': 'குறைந்த ஒளிர்வில் மினுமினுப்பு {from}% லிருந்து {to}% ஆக உயர்கிறது — இது துடிப்பு அகல மங்கலாக்கத்தின் (PWM) வழக்கமான அறிகுறி.',
  'toast.screencheckDone': 'வழிகாட்டி நிறைவடைந்தது. முடிவு கீழே உள்ளது.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'இந்த எண்கள் எங்கிருந்து வருகின்றன. ',
  'reports.noteText': 'அறிக்கை இந்தச் சாதனத்தில் சேமித்த வரலாற்றிலிருந்து கணக்கிடப்படுகிறது — ஐந்து வினாடிகளுக்கு ஒரு புள்ளி. முதல் அளவீட்டிலிருந்தே இயந்திரம் அதைச் சேகரிக்கிறது, எனவே அறிக்கை உடனடியாகவே தயார்.',
  'reports.rangeAria': 'அறிக்கையின் காலகட்டம்',
  'reports.day': 'கடைசி 24 மணி நேரம்',
  'reports.week': 'கடைசி 7 நாட்கள்',
  'reports.date': '{date} அன்றைய அறிக்கை.',
  'report.headerDay': '{from} முதல் {to} வரையிலான நாள் — {count}.',
  'report.headerWeek': '{from} முதல் {to} வரையிலான வாரம் — {count}.',
  'count.points': { one: '{n} புள்ளி', other: '{n} புள்ளிகள்' },
  'count.samples': { one: '{n} மாதிரி', other: '{n} மாதிரிகள்' },
  'report.emptyTitle': 'இந்தக் காலகட்டத்தில் தரவு இல்லை',
  'report.emptyText': 'அளவீட்டுத் திரையில் அளவீட்டைத் தொடங்குங்கள் — வரலாறு தானாகவே சேமிக்கப்படுகிறது.',
  'report.colAvg': 'சராசரி',
  'report.colMin': 'குறைந்தபட்சம்',
  'report.colMax': 'அதிகபட்சம்',
  'report.zonesTitle': 'மண்டலப் பரவல்',
  'report.worstHour': 'நாளின் மோசமான நேரம்',
  'report.worstHourNone': 'தனித்துத் தெரிவது இல்லை',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'இதற்கு என்ன செய்யலாம்',
  'report.disclaimerTitle': 'இது சுகாதார ஆலோசனை அல்ல. ',
  'report.disclaimerText': 'இந்தத் தொலைபேசியின் கேமரா பார்த்ததிலிருந்து மட்டுமே இந்த முடிவுகள் வருகின்றன. செயலி நிறமாலையை அளப்பதில்லை, லக்ஸ் அறியாது, எந்த நோயறிதலையும் தருவதில்லை.',

  'advice.melanopic': 'சராசரி நாள் தாளத் தாக்கம் {value}× ஆக இருந்தது. மாலையில் 0.50-க்குக் கீழே இறங்குவது நல்லது — எளிதான வழி, வெதுவெதுப்பான விளக்கு அல்லது இரவு பயன்முறை.',
  'advice.kelvin': 'ஒளி குளிர்ச்சியாக இருந்தது (சராசரியாக {value} K). வேலைக்கு அது குறையற்றது; தூக்கத்திற்கு இரண்டு மணி நேரம் முன்பு 3000 K-க்குக் கீழே சிறந்தது.',
  'advice.flicker': 'கவனிக்கத்தக்க மினுமினுப்பு கண்டறியப்பட்டது (சராசரியாக {value}%). வழக்கமாக இதற்குக் காரணம் மலிவான மங்கலாக்கி அல்லது பின்னொளியின் மின்வழங்கி.',
  'advice.uniformity': 'ஒளி சீரற்ற முறையில் பரவுகிறது ({value}%). விளக்கை நகர்த்துவதோ அதன் கோணத்தை மாற்றுவதோ, விளக்கை மாற்றுவதைவிட வழக்கமாக அதிகம் உதவும்.',
  'advice.worstHour': 'நாளின் மோசமான நேரம் {hour}:00 — வரம்புக்கு வெளியே உள்ள அளவீடுகள் அங்கேயே அதிகம் குவிகின்றன.',
  'advice.none': 'இந்தக் காலகட்டத்தில் எதுவும் வரம்பைத் தாண்டித் தனித்துத் தெரியவில்லை. இப்போது A/B ஒப்பீட்டில் இரு ஒளி மூலங்களை ஒப்பிடுவதே மிகவும் பயனுள்ளதாக இருக்கும்.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'கோப்பின் வடிவம். ',
  'export.noteText': 'நெடுவரிசைப் பிரிப்பானாக அரைப்புள்ளி, தசமப் பிரிப்பானாகக் காற்புள்ளி, BOM குறியுடன் UTF-8 குறியாக்கம். தசமப் பிரிப்பானாகக் காற்புள்ளியைப் பயன்படுத்தும் வட்டார அமைப்பில் உள்ள Excel, இப்படிப்பட்ட கோப்பை எதையும் அமைக்காமலே திறக்கிறது.',
  'export.range': 'தரவின் காலகட்டம்',
  'export.columns': 'கோப்பில் உள்ள நெடுவரிசைகள்',
  'export.chipFilled': ' — நெடுவரிசை நிரப்பப்பட்டது',
  'export.help': 'கோப்பில் ஏழு நெடுவரிசைகளும் உள்ளன — முதல் அளவீட்டிலிருந்தே இயந்திரம் அவற்றைக் கணக்கிடுகிறது, அனைத்தும் கோப்புக்குச் செல்கின்றன.',
  'export.run': 'CSV கோப்பைச் சேமி',
  'export.previewEmpty': 'இந்தக் காலகட்டத்தில் அளவீடுகள் இல்லை. அளவீட்டைத் தொடங்குங்கள் — வரலாறு தானாகவே சேமிக்கப்படுகிறது.',
  'csv.range.hour': 'கடைசி ஒரு மணி நேரம்',
  'csv.range.day': 'கடைசி 24 மணி நேரம்',
  'csv.range.week': 'கடைசி 7 நாட்கள்',
  'csv.range.month': 'கடைசி 30 நாட்கள்',
  'csv.colDate': 'தேதி',
  'csv.colTime': 'நேரம்',
  'csv.colZone': 'மண்டலம்',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'தேர்ந்த காலகட்டத்தில் ஒரு அளவீடும் இல்லை.',
  'toast.exportFailed': 'கோப்பைச் சேமிக்க இந்த உலாவி அனுமதிக்கவில்லை.',
  'toast.exportSaved': {
    one: '{filename} கோப்பு சேமிக்கப்பட்டது ({n} வரிசை).',
    other: '{filename} கோப்பு சேமிக்கப்பட்டது ({n} வரிசைகள்).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} ம. {m} நி.',
  'duration.ms': '{m} நி. {s} வி.',
  'duration.s': '{s} வி.'
});
