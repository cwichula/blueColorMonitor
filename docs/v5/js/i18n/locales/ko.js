/* Monitor Światła v5 — słownik koreański.
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr). NIE JEST
 * KALKĄ żadnego z nich: polskie i angielskie zdania przełożono na naturalną
 * koreańszczyznę, a nie słowo w słowo. Zachowane zostało to, co niesie
 * znaczenie: liczby, progi, jednostki, nazwy wstawek i — co do treści —
 * zastrzeżenia medyczne oraz zdania o prywatności. Tych ostatnich nie wolno
 * osłabiać ani wzmacniać: „nie zastępuje rozmowy z lekarzem” ma po koreańsku
 * znaczyć dokładnie tyle samo, a „obraz nie opuszcza urządzenia” nie może stać
 * się obietnicą szerszą niż polska.
 *
 * REJESTR: uprzejmy 합니다체 — zwięzły, bez wyższych stopni 높임말 i bez
 * zwrotów grzecznościowych, których polski i angielski nie mają. Przyciski
 * i etykiety kafelków są rzeczownikami (측정 / 중지 / 기록), teksty pomocy —
 * pełnymi zdaniami.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych):
 *   청색광 비율, 장면 밝기, 색온도, 일주기 영향 (w opisie: 멜라노픽 비율),
 *   깜빡임, 균일도, 시각 쾌적도.
 *   Pojedyncza wielkość to 지표, pomiar to 측정, próg to 임계값.
 * STREFY: 안전 / 중간 / 유해 — tak jak angielskie safe/moderate/harmful mówią
 * o świetle, a nie o stanie aplikacji, i wchodzą w zdanie „구역: {zone}”.
 *
 * ODSTĘPY: liczba i jednostka są sklejone spacją nierozdzielającą (\u00A0)
 * tak samo jak w pozostałych słownikach — robi to też sam kod (format.js),
 * więc „27 %” i „3 시간” wyglądają w aplikacji jednakowo. Znakiem dziesiętnym
 * jest kropka (0.50 ×, 1.00), bo tak zapisuje liczby koreański.
 *
 * PARTYKUŁY: koreańska partykuła zależy od tego, czy słowo przed nią kończy
 * się spółgłoską. Tam, gdzie przed partykułą stoi wstawka, dobrano formy
 * mnogie tak, by zawsze kończyły się na 받침 („…측정값”, „…세션”) — dlatego
 * 'history.clear.text' i 'tools.data.summary' mogą pisać 과/을 bez nawiasu.
 * Gdzie treścią wstawki jest liczba, zostaje bezpieczne (으)로.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Tekst ze wstawką {nazwa}'   — napis zwykły,
 *   'klucz.kropkowany': { other }                    — forma zależna od liczby.
 * Koreański ma w CLDR JEDNĄ kategorię liczebnika: `other`
 * (Intl.PluralRules('ko') → ['other']), więc obiekty form mają tu jeden klucz.
 * Formą mnogą jest w praktyce klasyfikator (개의 …, 건의 …), bo silnik skleja
 * „liczba + spacja + słowo”. Nazwy wstawek są identyczne jak w pl.js —
 * pilnuje tego keys.test.js. Kolejność wstawek w zdaniu wolno zmieniać
 * (i tak robimy w datach: 8월 30일, nie „30 sie”), nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': '빛 모니터',
  'app.description': '빛 모니터 — 카메라로 주변의 빛을 일곱 가지 지표로 측정합니다. 모든 계산은 이 기기 안에서 이루어지며, 네트워크로 나가는 것은 없습니다.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — 빛 모니터',
  'app.skipToContent': '본문으로 건너뛰기',
  'app.nav.aria': '기본 내비게이션',
  'app.noscript.title': '이 앱에는 JavaScript가 필요합니다',
  'app.noscript.text': '측정은 모두 이 브라우저 탭 안에서 이루어집니다. 카메라의 영상을 읽어 일곱 가지 빛 지표를 계산하는 것이 바로 JavaScript입니다. 그것이 없으면 측정할 수단이 없습니다. 이 페이지에서 JavaScript를 켜고 다시 열어 주세요 — 그래도 네트워크로 전송되는 것은 없습니다.',

  'nav.measure': '측정',
  'nav.history': '기록',
  'nav.tools': '도구',
  'nav.support': '후원',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': '측정 중',
  'shell.live.aria': '측정 중입니다. {metric}: {value}. 측정 화면으로 돌아갑니다.',
  'shell.live.metricFallback': '주요 지표',
  'shell.action.fallback': '화면 동작',

  'shell.loadFail.title': '“{screen}” 화면을 불러오지 못했습니다',
  'shell.loadFail.text': '기기 저장 공간에 일부 파일이 없는 것으로 보입니다. 네트워크에 연결한 뒤 페이지를 새로 고쳐 주세요.',
  'shell.fatal.title': '문제가 발생했습니다',
  'shell.fatal.text': '앱이 화면을 구성하지 못했습니다. 대개 페이지를 새로 고치면 충분합니다 — 저장된 측정값과 설정은 그대로 남습니다.',
  'shell.fatal.reload': '페이지 새로 고침',
  'shell.boot.failTitle': '앱을 시작하지 못했습니다',
  'shell.boot.failText': '셸이 시작되지 않았습니다. 페이지를 새로 고쳐 주세요 — 저장된 측정값과 설정은 그대로 남습니다.',
  'shell.background.error': '백그라운드에서 문제가 생겼습니다',
  'shell.background.action': '새로 고침',
  'shell.update.title': '새 버전이 있습니다',
  'shell.update.action': '새로 고침',

  'onboarding.title': '시작하기 전에',
  'onboarding.lead': '빛 모니터는 카메라로 주변의 빛을 살펴 일곱 가지 지표를 계산합니다 — 청색광 비율부터 시각 쾌적도까지.',
  'onboarding.privacy': '영상은 이 기기를 벗어나지 않습니다. 서버도, 계정도, 업로드도 없습니다. 일곱 가지 지표 모두 로그인 없이, 요금 없이 바로 사용할 수 있습니다.',
  'onboarding.honesty': '이것은 대략적인 안내일 뿐, 측정 기기도 의학적 검사도 아닙니다. 측정할 수 없는 것은 보여 주지 않습니다 — 숫자 대신 줄표가 나타납니다.',
  'onboarding.start': '시작합니다',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': '실행',
  'overlay.toast.close': '알림 닫기',
  'overlay.sheet.label': '창',
  'overlay.sheet.close': '닫기',
  'overlay.dialog.confirm': '확인',
  'overlay.dialog.cancel': '취소',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': '취소',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': '측정',

  'measure.intro.aria': '측정 시작',
  'measure.intro.headline': '지금 어떤 빛을 쬐고 있는지 보세요',
  'measure.intro.lead': '지금 몸에 닿는 빛에 파랑이 얼마나 들어 있는지, 그리고 이 시간대에 그것이 지나친지 카메라가 보여 줍니다.',
  'measure.intro.start': '측정 시작',
  'measure.intro.hint': '브라우저가 카메라 사용 권한을 묻습니다. 허용하는 즉시 측정이 시작됩니다.',
  'measure.intro.privacy': '카메라 영상은 이 기기 안에서 처리되며 결코 기기를 벗어나지 않습니다. 어떤 프레임도 전송하거나 저장하거나 공유하지 않습니다.',
  'measure.intro.honesty': '이 앱은 의료기기도 검사도 아닙니다. 주변 빛의 대략적인 상태를 보여줄 뿐, 건강을 판정하지 않으며 의사와의 상담을 대신하지 않습니다.',

  'measure.live.aria': '측정 진행 중',
  'measure.badge.starting': '시작 중',
  'measure.badge.paused': '일시정지',
  'measure.badge.running': '측정 중',
  'measure.stale': '영상을 기다리는 중 — 앱이 백그라운드에 있으면 미리보기가 멈춥니다.',
  'measure.crop': '화면 가운데를 측정합니다 — 영상의 너비와 높이에서 표시된 {percent} % 영역입니다.',
  'measure.facing.front': '전면 카메라',
  'measure.facing.back': '후면 카메라',

  'measure.boot.title': '카메라를 시작하는 중…',
  'measure.boot.text': '브라우저가 권한을 물으면 허용해 주세요 — 영상이 없으면 측정할 것이 없습니다. 이 권한은 이 페이지에만 해당하며, 나중에 취소할 수 있습니다.',
  'measure.boot.cancel': '취소',

  'measure.hold': '표시가 멈췄습니다. 카메라는 계속 동작하지만, 기록에도 평균에도 아무것도 들어가지 않습니다.',
  'measure.gridHint': '타일을 선택하면 그 지표가 큰 계기판으로 옮겨집니다.',

  'measure.stop': '중지',
  'measure.pause': '일시정지',
  'measure.resume': '계속',
  'measure.flip.aria': '카메라 전환',
  'measure.flip.toBack': '후면 카메라로 전환',
  'measure.flip.toFront': '전면 카메라로 전환',

  'measure.fail.aria': '카메라 오류',
  'measure.fail.headline': '카메라가 시작되지 않았습니다',
  'measure.fail.retry': '다시 시도',
  'measure.fail.back': '뒤로',
  'measure.fail.savedSession': '중단되기 전의 세션({duration})은 기록에 저장되었습니다.',
  'measure.error.fallback': '카메라를 시작하지 못했습니다.',

  'measure.summary.aria': '세션 요약',
  'measure.summary.title': '세션 요약',
  'measure.summary.paused': '{duration} 일시정지',
  'measure.summary.nothingMeasured': '어떤 지표도 측정값을 얻지 못했습니다 — 세션 내내 카메라가 빛을 보지 못했습니다.',
  'measure.summary.note': '평균은 일시정지 밖에서 얻은 표본만으로 계산합니다. 측정되지 않은 지표는 0으로 세지 않고 빼 둡니다.',
  'measure.summary.nearThreshold': '임계값에 가장 가까움',
  'measure.summary.worstPoint': '가장 약한 지점',
  'measure.summary.averageZone': '평균 {zone}',
  'measure.summary.tooShort': '세션이 {duration} 이어졌습니다 — 저절로 기록에 남기에는 너무 짧습니다. 직접 저장할 수 있습니다.',
  'measure.summary.again': '다시 측정',
  'measure.summary.save': '기록에 저장',
  'measure.summary.saved': '기록에 저장됨',
  'measure.summary.savedToast': '세션을 기록에 저장했습니다.',
  'measure.summary.close': '닫기',

  'measure.method.title': '측정 방식',
  'measure.method.p1': '앱은 카메라 영상을 1초에 열 번 표본으로 읽어, 화면 가운데 {percent} % 영역에서 지표를 계산합니다 — 미리보기의 조준 틀이 바로 그 영역을 표시합니다.',
  'measure.method.p2': '휴대폰 카메라에는 넓은 채널 세 개와 자체 자동 노출·화이트밸런스가 있습니다. 빛의 스펙트럼이 아니라 빛의 비율을 봅니다.',
  'measure.method.p3': '청색광 비율, 밝기, 깜빡임, 균일도는 카메라가 실제로 측정하는 값입니다. 색온도와 일주기 영향은 sRGB 원색에서 계산한, 드러내 놓은 근사값입니다.',
  'measure.method.p4': '깜빡임은 4 헤르츠 아래에서만 보입니다. 전원에서 오는 100 Hz는 이 표본 속도가 닿는 범위를 한참 벗어나므로 측정값으로 제시되는 일은 없습니다.',
  'measure.method.p5': '이 숫자들 가운데 어느 것도 측광 측정값이나 의학적 결과가 아닙니다. 카메라 영상은 기기를 벗어나지 않습니다.',
  'measure.method.ok': '알겠습니다',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': '카메라 시작을 취소했습니다.',
  'measure.announce.stoppedNoSamples': '측정을 중지했습니다. 수집된 표본이 없습니다.',
  'measure.announce.stopped': '측정을 중지했습니다. 세션 요약이 준비되었습니다.',
  'measure.announce.interrupted': '측정이 중단되었습니다. 세션 요약이 준비되었습니다.',
  'measure.announce.paused': '측정을 일시정지했습니다. 표시가 멈췄습니다.',
  'measure.announce.resumed': '측정을 다시 시작했습니다.',
  'measure.announce.switchedFront': '전면 카메라로 전환했습니다. 새 세션이 시작됩니다.',
  'measure.announce.switchedBack': '후면 카메라로 전환했습니다. 새 세션이 시작됩니다.',
  'measure.announce.lead': '주요 지표: {metric}.',
  'measure.announce.cameraError': '카메라 오류. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': '세션 내내 빛이 안전한 범위에 머물렀습니다 — 조명은 지금 그대로 두고, 다른 광원이 켜지는 해가 진 뒤에 다시 확인해 보세요.',
  'measure.advice.share.evening': '청색광 비율이 평균 {value}였습니다 — 화면은 야간 모드로 바꾸고 천장 조명은 끈 뒤, 책상 높이의 따뜻한 조명 하나만 남겨 두세요.',
  'measure.advice.share.day': '청색광 비율이 평균 {value}였습니다 — 낮에는 받아들일 만하지만, 잠들기 두 시간 전에 화면이 자동으로 따뜻한 모드로 바뀌도록 설정해 두세요.',
  'measure.advice.brightness': '화면이 과다 노출되었습니다(평균 {value}) — 광원에서 떨어지거나 측정 중인 화면의 밝기를 낮추세요. 이 정도 노출에서는 나머지 지표의 정확도도 떨어집니다.',
  'measure.advice.kelvin.evening': '빛의 색이 평균 {value}에 머물렀습니다 — 해가 진 뒤에는 3000 K 아래로 내려가세요. 조명을 따뜻한 모드로 바꾸거나 2700 K 전구를 끼우면 됩니다.',
  'measure.advice.kelvin.day': '빛의 색이 평균 {value}에 머물렀습니다 — 낮에는 각성을 돕는 좋은 백색이지만, 저녁에는 같은 조명을 2700 K로 바꾸세요.',
  'measure.advice.melanopic.evening': '일주기 영향이 평균 {value}였습니다 — 잠들기 두 시간 전에는 주 조명을 낮추고 천장 대신 책상 높이에서 비추어 0.50 × 아래로 내려가세요.',
  'measure.advice.melanopic.day': '일주기 영향이 평균 {value}였습니다 — 이 시간대에는 그 정도가 도움이 되지만, 저녁에는 더 약하고 따뜻한 광원으로 바꾸세요.',
  'measure.advice.flicker': '깜빡임이 평균 {value}까지 올라갔습니다 — 보통은 조광기이거나 낮게 맞춘 백라이트입니다. 화면 밝기를 40 % 위로 올리거나, PWM 변조를 쓰지 않는 조광기로 바꾸세요.',
  'measure.advice.uniformity': '빛이 고르지 않게 닿았습니다(평균 {value}) — 강한 광원 하나 대신, 조명을 책상 옆쪽에 두고 반대편에 더 약한 두 번째 광원을 더하세요.',
  'measure.advice.comfort': '시각 쾌적도가 평균 {value}로 나왔습니다 — 한 가지부터 바꿔 보세요. 주 광원을 절반으로 낮추고, 빛의 색은 그다음에 손보면 됩니다.',
  'measure.advice.default': '조명에서 한 가지를 바꾸고 다시 측정해 보세요 — 한 번의 측정값보다 두 세션을 비교하는 편이 더 많은 것을 알려 줍니다.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': '기록',
  'history.action.export': '기록 내보내기',

  'history.metricGroup.aria': '지표 선택',
  'history.announce.metric': '지표: {metric}',
  'history.rangeGroup.aria': '시간 범위',
  'history.range.aria': '최근 {range}',

  'history.stats.title': '범위 통계',
  'history.stats.head': '{metric}\u00A0—\u00A0최근 {range}',
  'history.stats.note': '그래프에 보이는 값으로 계산합니다. 측정하지 않은 시간은 넣지 않습니다 — 그 자리를 0으로 채우지 않습니다.',
  'history.stat.min': '최소',
  'history.stat.avg': '평균',
  'history.stat.max': '최대',
  'history.trend.up': '이 범위에서 상승',
  'history.trend.flat': '뚜렷한 변화 없음',
  'history.trend.down': '이 범위에서 하강',
  'history.trend.none': '비교할 데이터 없음',

  'history.sessions.title': '측정 세션',
  'history.sessions.count': '{sessions}, 최신순',
  'history.sessions.empty': '아직 세션이 없습니다',
  'history.sessions.hint': '측정을 중지하면 세션이 저장됩니다.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': '범위: {range}',
  'history.session.noMeasure': '측정값 없음',

  'history.data.title': '데이터',
  'history.data.subtitle': '기록은 이 기기에만 저장됩니다.',
  'history.export.csv': 'CSV 내보내기',
  'history.export.json': 'JSON 내보내기',
  'history.export.ok': '저장할 파일이 준비되었습니다',
  'history.export.fail': '파일을 준비하지 못했습니다. 시크릿 모드나 다른 앱에 내장된 창에서는 브라우저가 저장을 막습니다 — 일반 탭에서 페이지를 열어 주세요.',
  'history.export.sheet.title': '기록 내보내기',
  'history.export.sheet.text': 'CSV는 스프레드시트에서 열립니다(구분자는 세미콜론, 소수점은 쉼표). JSON은 세션 목록과 측정이 없던 구간까지 모두 그대로 보존합니다.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': '기록 지우기',
  'history.clear.title': '기록을 지울까요?',
  'history.clear.text': '{points}과 {sessions}을 삭제합니다. 되돌릴 수 없습니다 — 데이터를 남기고 싶다면 먼저 내보내세요.',
  'history.clear.confirm': '지우기',
  'history.clear.announce': '기록을 지웠습니다.',
  'history.clear.toast': '기록을 지웠습니다',

  'history.empty.title': '아직 보여 줄 것이 없습니다',
  'history.empty.text': '기록은 측정하는 동안 1초에 한 점씩 쌓입니다. 모든 것은 이 기기에 남습니다.',
  'history.empty.action': '측정으로 이동',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1분',
  'range.5m': '5분',
  'range.1h': '1시간',
  'range.24h': '24시간',
  'range.7d': '7일',
  'range.30d': '30일',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': '날짜 및 시간',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': '기기의 저장 공간이 가득 찼습니다 — 새 측정값은 더 이상 저장되지 않습니다.',
  'storage.blocked': '브라우저가 기록을 저장하도록 허용하지 않습니다 — 탭을 닫으면 데이터가 사라집니다.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': '도구',
  'tools.action.about': '측정에 관하여',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': '언어',
  'tools.language.subtitle': '기본적으로 앱은 기기의 언어를 따릅니다. 이 목록에서 고른 언어는 바로 적용되고 이 브라우저에 남습니다.',
  'tools.language.aria': '인터페이스 언어',
  'tools.language.system': '자동',
  'tools.language.announce': '인터페이스 언어: {language}.',

  'tools.appearance.title': '모양',
  'tools.appearance.theme.title': '테마',
  'tools.appearance.theme.desc': '“자동”은 시스템 설정을 따릅니다.',
  'tools.appearance.theme.aria': '테마',
  'tools.theme.system': '자동',
  'tools.theme.light': '밝게',
  'tools.theme.dark': '어둡게',
  'tools.appearance.accent.title': '강조 색',
  'tools.appearance.accent.desc': '버튼, 선택 항목, 슬라이더의 색입니다.',
  'tools.appearance.accent.aria': '강조 색',
  'tools.appearance.textScale.title': '글자 크기',
  'tools.appearance.textScale.desc': '설명만이 아니라 인터페이스 전체를 키웁니다.',
  'tools.appearance.textScale.aria': '글자 크기',
  'tools.appearance.density.title': '밀도',
  'tools.appearance.density.desc': '조밀하게 두면 한 화면에 더 많은 내용이 들어갑니다.',
  'tools.appearance.density.aria': '레이아웃 밀도',
  'tools.density.comfortable': '보통',
  'tools.density.compact': '조밀',
  'tools.appearance.motion.title': '움직임 줄이기',
  'tools.appearance.motion.desc': '애니메이션과 바늘이 부드럽게 움직이는 효과를 끕니다. 이와 별개로 시스템 설정도 따릅니다.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': '오션',
  'accent.violet': '바이올렛',
  'accent.amber': '앰버',
  'accent.mint': '민트',
  'accent.rose': '로즈',

  'tools.thresholds.title': '임계값',
  'tools.thresholds.subtitle': '앱이 어느 값부터 “중간”이라고, 어느 값부터 “심각”라고 말할지 정합니다. 기본 임계값은 규격이 아니라 저희의 제안이니, 자신에게 맞게 맞추세요.',
  'tools.thresholds.warn': '경고 임계값',
  'tools.thresholds.crit': '경보 임계값',
  'tools.thresholds.warn.aria': '경고 임계값 — {metric}',
  'tools.thresholds.crit.aria': '경보 임계값 — {metric}',
  'tools.thresholds.reset': '기본값',
  'tools.thresholds.reset.aria': '기본 임계값 복원: {metric}',
  'tools.thresholds.moved': '{threshold}을 {value}(으)로 옮겼습니다.',
  'tools.thresholds.resetAll': '모든 임계값 복원',
  'tools.thresholds.resetAll.title': '기본 임계값으로 되돌릴까요?',
  'tools.thresholds.resetAll.text': '일곱 가지 지표 모두 앱이 제안하는 임계값으로 돌아갑니다. 측정 기록은 그대로 유지됩니다.',
  'tools.thresholds.resetAll.confirm': '복원',
  'tools.thresholds.resetAll.cancel': '그대로 두기',
  'tools.thresholds.resetAll.toast': '임계값을 기본값으로 되돌렸습니다',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': '{warn} 초과',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} 이하',
  'tools.zoneRange.goodBelow': '{warn} 미만',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} 이상',

  'tools.calibration.title': '보정',
  'tools.calibration.subtitle': '비교할 기준이 있는 분들을 위한 기능입니다.',
  'tools.calibration.intro': '같은 조명을 향한 두 대의 휴대폰은 조금씩 다른 숫자를 보여 줍니다 — 센서마다 고유한 색조가 있기 때문입니다. 믿을 만한 측정값이 곁에 있다면, 여기서 영상의 채널을 하나씩 조금 올리거나 내릴 수 있습니다. 이 배율은 무엇을 계산하기도 전에 적용되므로, 일곱 가지 지표가 한꺼번에 달라집니다.',
  'tools.calibration.neutral': '비교할 기준이 없나요? 1.00으로 두세요 — 공장 설정이며 아무것도 망가뜨리지 않습니다.',
  'tools.calibration.forward': '변경은 지금부터 적용됩니다. 이미 기록에 저장된 측정값은 저장 당시 그대로 남습니다 — 지난 값을 다시 계산하지 않습니다. 그렇게 하면 사후에 데이터를 바꿔치기하는 셈이기 때문입니다.',
  'tools.calibration.reset': '보정 초기화',
  'tools.calibration.reset.toast': '보정을 초기화했습니다',
  'tools.calibration.channel.r': '빨강 채널',
  'tools.calibration.channel.g': '초록 채널',
  'tools.calibration.channel.b': '파랑 채널',
  'tools.calibration.channel.aria': '{channel} — 보정 배율',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': '측정',
  'tools.measurement.wake.title': '화면 꺼짐 방지',
  'tools.measurement.wake.desc': '측정하는 동안 화면이 켜져 있습니다. 그만큼 배터리가 빨리 닳습니다.',
  'tools.measurement.wake.unsupported': '이 브라우저에서는 화면 꺼짐을 막을 수 없습니다.',
  'tools.measurement.haptics.title': '진동',
  'tools.measurement.haptics.desc': '시작할 때, 멈출 때, 지표를 바꿀 때 짧게 알려 줍니다.',
  'tools.measurement.haptics.unsupported': '이 기기는 진동 모터를 알리지 않습니다.',

  'tools.about.title': '측정에 관하여',
  'tools.about.subtitle': '일곱 가지 지표가 각각 무엇을 계산하는지, 그리고 이 방법의 신뢰가 어디에서 끝나는지.',
  'tools.about.scale': '척도: {min}부터 {max}까지.',
  'tools.about.threshold': '{warn}부터 경고하고, {crit}부터 경보합니다.',
  'tools.about.thresholdInvert': '{warn} 아래에서 경고하고, {crit} 아래에서 경보합니다.',
  'tools.about.limitsHead': '이 측정이 할 수 없는 것',
  'tools.about.limit.spectrum.title': '카메라는 계측기처럼 색을 보지 못합니다',
  'tools.about.limit.spectrum.text': '휴대폰 카메라에는 빨강, 초록, 파랑 세 개의 채널이 있습니다. 빛을 재는 계측기는 이를 수십 개의 좁은 대역으로 나눕니다. 여기 보이는 값은 그 세 숫자에서 이끌어 낸 것입니다 — 합리적인 방식이지만, 측정된 스펙트럼이 아니라 여전히 계산 결과입니다.',
  'tools.about.limit.exposure.title': '카메라는 스스로 밝기를 조절합니다',
  'tools.about.limit.exposure.text': '휴대폰을 창 쪽으로 향하면 카메라는 과다 노출을 피하려고 영상을 어둡게 만듭니다. 방 안에서는 아무것도 달라지지 않았는데도 “장면 밝기”가 그때 내려갑니다. 그러니 이 값은 방과 방 사이가 아니라 한 장면 안에서 비교하세요.',
  'tools.about.limit.flicker.title': '느린 카메라는 빠른 깜빡임을 잡지 못합니다',
  'tools.about.limit.flicker.text': '영상을 1초에 {hz}번 확인합니다. 1초에 {nyquist}번보다 빠른 맥동은 이런 측정에서 실제보다 느리게 나타나거나 아예 사라질 수 있습니다 — 전원에서 오는 깜빡임이 바로 그렇게 빠릅니다. 앱이 무언가를 잡아낸다면, 측정된 주파수가 아니라 “여기서 무언가 맥동한다”는 신호로 받아들이세요.',
  'tools.about.limit.medical.title': '이것은 의학적 검사도, 의학적 조언도 아닙니다',
  'tools.about.limit.medical.text': '이 앱은 주변의 빛이 차갑거나 밝거나 불안정하다는 것을 알아차리도록 돕고, 그에 대해 무엇을 할 수 있는지 알려 줍니다. 건강에 관해 판단하지 않으며, 의사와의 상담이나 전문 계측기를 통한 측정을 대신하지 않습니다.',
  'tools.about.privacy': '모든 계산은 사용자의 기기에서 이루어집니다. 카메라 영상은 어디로도 전송되거나 저장되지 않으며, 저장 공간에는 계산된 숫자만 들어갑니다.',
  'tools.about.privacyPolicy': '개인정보 처리방침 전문',

  'tools.data.title': '데이터',
  'tools.data.subtitle': '모든 것은 이 브라우저의 저장 공간에 있으며, 여기서 어디로도 나가지 않습니다.',
  'tools.data.summary.empty': '아직 저장된 측정값이 없습니다.',
  'tools.data.summary': '저장됨: {points}과 {sessions}.',
  'tools.data.export.csv': 'CSV 내보내기',
  'tools.data.export.json': 'JSON 내보내기',
  'tools.data.clear': '기록 지우기',
  'tools.data.reset': '기본 설정',
  'tools.data.reset.title': '기본 설정으로 되돌릴까요?',
  'tools.data.reset.text': '모양, 임계값, 보정, 측정 설정이 처음 상태로 돌아갑니다. 측정 기록은 그대로 유지됩니다.',
  'tools.data.reset.confirm': '복원',
  'tools.data.reset.toast': '기본 설정으로 되돌렸습니다',
  'tools.data.wipe': '모든 데이터 삭제',
  'tools.data.wipe.title': '앱의 모든 데이터를 삭제할까요?',
  'tools.data.wipe.text': '측정 기록 전체와 세션 목록, 사용자의 임계값과 보정, 모양 설정이 사라집니다. 앱은 처음 실행했을 때의 상태로 돌아갑니다.',
  'tools.data.wipe.note': '저희에게는 이 데이터의 사본이 없습니다 — 데이터가 이 기기를 벗어난 적이 없으므로, 되돌릴 곳도 없습니다.',
  'tools.data.wipe.check': '되돌릴 수 없다는 것을 이해합니다',
  'tools.data.wipe.confirm': '전부 삭제',
  'tools.data.wipe.toast': '앱의 모든 데이터를 삭제했습니다',
  'tools.data.wipe.announce': '앱의 모든 데이터를 삭제했습니다. 설정이 기본값으로 돌아갔습니다.',
  'tools.data.storage.blocked': '이 브라우저는 무엇도 영구히 저장하도록 허용하지 않습니다(시크릿 모드이거나 사이트 데이터가 차단됨). 여기서 설정한 것은 탭을 닫으면 사라집니다.',
  'tools.data.storage.full': '브라우저의 저장 공간이 가득 차서 새 측정값이 더 이상 저장되지 않습니다. 기록을 지우면 공간이 생깁니다.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': '후원',
  'support.free.title': '모든 것이 열려 있습니다',
  'support.free.lead': '일곱 가지 지표 전부, 전체 기록, 임계값, 보정, 내보내기가 첫 실행부터 동작합니다 — 계정도, 제한도, 요금도 없습니다.',
  'support.free.note': '측정은 전부 이 기기에서 이루어지며 네트워크가 없어도 동작합니다. 벽 뒤에 감춰 둔 더 나은 버전 같은 것은 여기에 없습니다.',
  'support.why.title': '왜 부탁드리는가',
  'support.why.lead': '빛 모니터는 일과가 끝난 뒤의 시간에 만들고 있으며, 광고도 후원사도 뒤를 받치는 회사도 없습니다. 후원은 고치는 데 드는 시간, 새 지표를 만드는 시간, 그리고 이미 동작하는 것을 계속 살려 두는 시간에 쓰입니다.',
  'support.what.title': '후원하면 무엇이 생기나',
  'support.what.lead': '아무것도 생기지 않습니다. 후원은 아무것도 열어 주지 않습니다 — 추가 기능도, 이름 옆의 배지도, 우선권도 없습니다. 앱이 할 수 있는 것은 이미 전부 쓰고 계십니다.',
  'support.what.note': '남는 것은 누군가에게 쓸모가 있었다는 사실을 제가 알게 된다는 것뿐입니다. 그것으로 충분한 이유가 됩니다.',
  'support.cta.title': '손을 보태고 싶다면',
  'support.cta.button': '커피 한 잔 사주기',
  'support.cta.nolink': '후원 페이지는 아직 연결되지 않았습니다. 준비되면 이 자리에 버튼이 생깁니다.',
  'support.cta.privacy': '이 링크는 외부 Buy Me a Coffee 페이지를 새 탭에서 엽니다. 이 기기에서 무언가가 나가는 것은 그때뿐이며, 측정 자체는 언제나 여기에 남습니다.',
  'support.cta.privacyFuture': '주소가 준비되면 버튼이 외부 Buy Me a Coffee 페이지를 새 탭에서 엽니다. 이 기기에서 무언가가 나가는 것은 그때뿐이며, 측정 자체는 언제나 여기에 남습니다.',
  'support.cta.note': '여기에는 카운트다운도, 재촉도, 저절로 열리는 창도 없습니다. 이 부탁은 오직 이 탭에서만 기다립니다.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': '최근 1분',
  'gauge.aria': '{metric}: {value}, 구역: {zone}',
  'gauge.aria.note': '{metric}: {value}, 구역: {zone}, {note}',
  'gauge.aria.initial': '{metric}: 데이터 없음',
  'gauge.value.none': '데이터 없음',
  /* Odczyt słowny z jednostką: „27 퍼센트”, „1.20 배”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': '근사값',
  'gauge.note.offScale': '척도 밖',
  'gauge.metric.unknown': '알 수 없는 지표',

  'chart.aria.label': '측정 기록 그래프',
  'chart.hint': '조작할 수 있는 그래프입니다. 왼쪽·오른쪽 화살표로 판독 커서를 옮기고, Home과 End로 범위의 처음과 끝으로 이동하며, Escape로 커서를 숨깁니다.',
  'chart.empty.title': '데이터 없음',
  'chart.empty.text': '측정을 시작하세요 — 첫 측정값이 나오면 그래프가 나타납니다.',
  'chart.few.title': '데이터가 부족합니다',
  'chart.few.text': '측정값이 하나뿐입니다: {value}. 선을 그리려면 두 개가 필요합니다.',
  'chart.legend.line': '측정',
  'chart.legend.gap': '측정이 끊긴 구간',
  'chart.aria.head': '그래프: {metric}, 범위 {range}',
  'chart.aria.empty': '이 범위에는 데이터가 없습니다.',
  'chart.aria.one': '측정값 하나: {value}.',
  'chart.aria.summary': '{min}부터 {max}까지, 평균 {avg}, {points}.',
  'chart.aria.gaps': '이 계열에는 끊긴 구간이 있습니다 — 그때는 측정하지 않았습니다.',
  'chart.readout.empty': '이 범위에는 데이터가 없습니다.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': '그래프를 그리기에는 데이터가 부족합니다.',
  'chart.readout.hint': '그래프 위를 끌거나 화살표 키를 쓰면 측정값을 하나씩 읽을 수 있습니다.',
  'chart.time.now': '지금',
  'chart.time.justNow': '방금 전',
  'chart.time.ago': '{duration} 전',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} \u00B7 {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd zegar z „오전”, bo tak koreańskie
     ustawienia regionalne formatują godzinę, i data złożona z miesiąca
     i dnia (12월 30일). */
  'chart.sample.ago': '\u221230\u00A0분',
  'chart.sample.clock': '오전 12:00',
  'chart.sample.date': '12월\u00A030일',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': '청색광 비율',
  'metric.share.short': '보이는 빛 가운데 파랑 채널이 차지하는 몫.',
  'metric.share.help': '색을 밝기에서 떼어 낸 값입니다 — 야간 모드를 켰을 때 움직이는 값이 바로 이것입니다.',
  'metric.brightness.name': '장면 밝기',
  'metric.brightness.short': '카메라 영상의 평균 밝기.',
  'metric.brightness.help': '럭스가 아니라 상대값입니다 — 카메라의 자동 노출이 그 아래에서 값을 움직입니다.',
  'metric.kelvin.name': '색온도',
  'metric.kelvin.short': '빛이 따뜻한지 차가운지.',
  'metric.kelvin.help': '3000 K 아래면 빛이 따뜻하고 저녁에는 더 부드럽습니다. 6500 K는 대부분 화면의 기본 백색입니다.',
  'metric.melanopic.name': '일주기 영향',
  'metric.melanopic.short': '이 빛이 생체 시계에 얼마나 강하게 작용하는지.',
  'metric.melanopic.help': '멜라노픽 비율의 근사값입니다. 1.00은 중성적인 주광 백색이며, 저녁에는 0.50 아래로 내려가는 것이 좋습니다.',
  'metric.flicker.name': '깜빡임',
  'metric.flicker.short': '눈에 보이지 않는 광원의 맥동.',
  'metric.flicker.help': '값싼 조광기와 백라이트는 맥동합니다. 눈으로는 보이지 않지만 피로와 두통의 원인이 되기도 합니다.',
  'metric.uniformity.name': '균일도',
  'metric.uniformity.short': '빛이 화면 안에 고르게 퍼지는지.',
  'metric.uniformity.help': '화면에서 값이 낮으면 백라이트 빛샘이나 반사이고, 책상에서라면 조명을 잘못 놓은 것입니다.',
  'metric.comfort.name': '시각 쾌적도',
  'metric.comfort.short': '여섯 개의 숫자 대신 하나의 점수.',
  'metric.comfort.help': '나머지 측정값을 0–100 점수로 묶고, 무엇이 점수를 가장 많이 깎는지 보여 줍니다. 가중치는 규격이 아니라 저희의 편집 판단입니다.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': '양호',
  'zone.warn': '중간',
  'zone.crit': '심각',
  'zone.none': '데이터 없음',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('8월 24일'). */
  'date.month.short.1': '1월',
  'date.month.short.2': '2월',
  'date.month.short.3': '3월',
  'date.month.short.4': '4월',
  'date.month.short.5': '5월',
  'date.month.short.6': '6월',
  'date.month.short.7': '7월',
  'date.month.short.8': '8월',
  'date.month.short.9': '9월',
  'date.month.short.10': '10월',
  'date.month.short.11': '11월',
  'date.month.short.12': '12월',

  'date.clock': '{hours}:{minutes}',
  /* Kolejność wstawek jest tu odwrotna niż po polsku: koreański skrót daty to
     „8월 30일”, nie „30 sie”, a rok stoi przed datą. Nazwy wstawek zostają te
     same — zmienia się wyłącznie ich miejsce w zdaniu. */
  'date.short': '{month}\u00A0{day}일',
  'date.shortWithYear': '{year}년\u00A0{date}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0시간',
  'time.duration.hourMinute': '{hours}\u00A0시간 {minutes}\u00A0분',
  'time.duration.hour': '{hours}\u00A0시간',
  'time.duration.minuteSecond': '{minutes}\u00A0분 {seconds}\u00A0초',
  'time.duration.minute': '{minutes}\u00A0분',
  'time.duration.second': '{seconds}\u00A0초',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „방금 전”. */
  'time.justNow': '방금 전',
  'time.aMinuteAgo': '1분 전',
  'time.minutesAgo': '{minutes}\u00A0분 전',
  'time.hoursAgo': '{hours}\u00A0시간 전',
  'time.yesterday': '어제',
  'time.daysAgo': '{days}\u00A0일 전',

  /* Formy zależne od liczby. Koreański ma w CLDR JEDNĄ kategorię: `other`
     (Intl.PluralRules('ko') → ['other']). Klasyfikator (개의, 건의) wchodzi
     w skład formy — format.plural() skleja „liczba + spacja + forma”, więc
     wychodzi „3 개의 세션”, „1,234 건의 측정값”. */
  'time.days.plural': { other: '일' },
  'unit.sample.plural': { other: '개 샘플' },
  'unit.measurement.plural': { other: '건의 측정값' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Koreański rozstrzyga przypadek partykułą stojącą w zdaniu, a nie odmianą
     rzeczownika — oba klucze zostają, a wartości są tu identyczne. */
  'unit.session.plural': { other: '개의 세션' },
  'unit.session.accusative.plural': { other: '개의 세션' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy — po koreańsku mają osobne słowa. */
  'unit.chartPoint.plural': { other: '개의 데이터 점' },
  'unit.point.plural': { other: '점' },
  'unit.kelvin.plural': { other: '켈빈' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „퍼센트”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': '퍼센트',
  'unit.spoken.times': '배',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': '카메라 사용 권한이 허용되지 않았습니다. 브라우저 또는 시스템 설정에서 이 페이지에 카메라를 허용한 뒤 다시 시도하세요.',
  'camera.error.notfound': '카메라를 찾지 못했습니다. 기기에 카메라가 있는지, 시스템에서 꺼져 있지는 않은지 확인하세요.',
  'camera.error.inuse': '다른 앱이 카메라를 사용하고 있습니다. 그 앱이나 탭을 닫고 다시 시도하세요.',
  'camera.error.insecure': '카메라는 HTTPS 또는 localhost에서만 동작합니다. “https://”로 시작하는 주소에서 이 페이지를 열어 주세요.',
  'camera.error.unsupported': '이 브라우저는 여기서 카메라를 제공하지 않습니다. 다른 앱에 내장된 미리보기가 아니라 일반 창의 Chrome이나 Safari에서 시도해 보세요.',
  'camera.error.unknown': '카메라를 시작하지 못했습니다.'
};
