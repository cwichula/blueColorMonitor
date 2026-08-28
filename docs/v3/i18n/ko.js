/* docs/v3/i18n/ko.js — słownik WŁASNY wersji v3, koreański.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/ko.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * SKĄD TE ZDANIA: przekład z pl.js (treść) oraz z en.js (terminologia
 * i rejestr). To nie jest kalka żadnego z nich — zdania przełożono na naturalną
 * koreańszczyznę. Zachowane zostało to, co niesie znaczenie: liczby, progi,
 * jednostki, nazwy wstawek oraz — co do treści — zastrzeżenia medyczne
 * i zdania o prywatności. Tych ostatnich nie wolno ani osłabiać, ani wzmacniać.
 *
 * CZEGO TU NIE MA — i dlaczego: kluczy, które stoją już w słowniku wspólnym
 * (docs/shared/i18n/ko.js). Nazwy stref, zdania oceniające, noty o granicach
 * metody, nazwy i opisy siedmiu wielkości oraz zastrzeżenie z rozporządzenia
 * (UE) 2017/745 są wspólne dla wersji i tłumaczy się je RAZ. Jedyne świadome
 * nadpisanie klucza wspólnego opisano przy 'verdict.critical.comfort'.
 *
 * TERMINOLOGIA — brana WPROST z docs/shared/i18n/ko.js, bez wyjątków:
 *   청색광 비율, 장면 밝기, 색온도, 일주기 리듬 영향 (멜라노픽 비율),
 *   깜박임, 균일도, 눈 편안함; strefy 정상 범위 / 주의 / 심각.
 * Wyrazy własne v3, których warstwa wspólna nie zna:
 *   wielkość 지표 · pomiar 측정 · próg 임계값 (uwagi 주의 임계값,
 *   krytyczny 심각 임계값) · kalibracja 보정 · moduł 모듈 · pulpit 대시보드 ·
 *   kanał główny 주 채널 · historia 기록 · sesja 세션 · skala 척도 ·
 *   wycinek kadru 측정 영역 · plansza 패턴 · alert 경보 (moduł 09) wobec
 *   przypomnienia 알림 (moduł 08) — dwa pojęcia, dwa różne słowa.
 *
 * REJESTR: 합니다체, bez wykrzykników. Etykiety przycisków i kafelków są
 * rzeczownikami (측정 시작 / 중지 / 기록), teksty pomocy — pełnymi zdaniami.
 *
 * ZAPIS LICZB WE WZORACH: koreański pisze kropkę dziesiętną („0.3320”), tak
 * samo jak angielski, a inaczej niż polski („0,3320”). Liczby wstawiane przez
 * '{…}' są osobną sprawą: te formatuje warstwa językowa.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ko'] = Object.assign(window.I18nData['ko'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. Pismo koreańskie
     nie zna wielkiej litery, więc brzmi tak samo jak 'app.name'. */
  'app.wordmark': '빛 모니터',

  'state.idle': '준비됨',
  'state.starting': '시작하는 중',
  'state.running': '측정 중',
  'state.runningTpl': '측정 중 {time}',
  'state.stopped': '중지됨',
  'state.error': '카메라 오류',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5.0 po koreańsku, 5,0 po polsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': '측정 시작',
  'keys.starting': '시작하는 중…',
  'keys.stop': '중지',
  'keys.flip': '전환',
  'keys.flipAria': '전면·후면 카메라 전환',
  'keys.menu': '메뉴',
  'keys.menuAria': '모듈 목록',
  'keys.back': '‹ 뒤로',
  'keys.backAria': '대시보드로 돌아가기',
  'keys.dash': '대시보드',
  'keys.zoom': '미리보기 확대',
  'keys.retry': '다시 시도',
  'keys.refresh': '새로 고침',
  'keys.close': '닫기',
  'keys.show': '보기',
  'keys.apply': '적용',
  'keys.remove': '삭제',

  'monitor.legend': '확인용 미리보기',
  'monitor.badge': '실시간',

  'aim.title': '조준',
  'aim.hint': '테두리는 앱이 측정하는 영상 부분을 그대로 보여 줍니다.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': '주 채널',
  'readout.thresholdTpl': '(임계값 {value})',
  'readout.contextTpl': '최소 {min} · 평균 {avg} · 최대 {max} — 최근 60초',
  'readout.contextEmpty': '최근 60초 데이터 없음',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': '{name}의 뜻',
  'aria.channel': '{name}, {value}, {zone}. 큰 화면에 표시합니다.',
  'aria.channelStale': '{name}, 데이터 없음. 큰 화면에 표시합니다.',
  'aria.scale': '척도: {name}, {min}부터 {max}까지. 현재 {value}, {zone}. 주의 임계값 {warn}, 심각 임계값 {crit}.',
  'aria.readout': '{name}: {value}, {zone}.',
  'aria.readoutApprox': '{name}: 약 {value}, {zone}. 근삿값입니다.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': '주 채널 척도. 데이터 없음',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': '‘측정 시작’을 누르고 빛이 닿는 면으로 휴대폰을 향한 뒤 몇 초 동안 가만히 들고 계세요.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': '눈 편안함이 낮습니다. 무엇이 점수를 깎는지는 모듈 01에서 확인하세요.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': '화면 아래의 ‘측정 시작’ 버튼부터 누르세요. 카메라는 누른 뒤에야 켜집니다.',
  'transient.measureStopped': '측정을 마쳤습니다 · {time} · 기록에 저장했습니다.',
  'transient.newVersion': '앱의 새 버전이 있습니다.',
  'transient.thresholdsSaved': '임계값을 저장했습니다.',
  'transient.thresholdsRejected': '저장하지 않았습니다 — 주의 임계값과 심각 임계값은 서로 엇갈릴 수 없습니다.',
  'transient.historyCleared': '기록을 지웠습니다.',

  'live.lead': '주 채널: {name}, {value}, {zone}.',
  'live.ready': '평가가 나왔습니다. {name} {value}, {zone}.',
  'live.started': '측정을 시작했습니다.',
  'livebar.stopped': '측정 중지됨',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': '아직 저장된 것이 없습니다. 기록은 측정하는 동안 쌓입니다 — 1분 동안 측정한 뒤 이곳으로 돌아오세요.',
  'empty.recorderNoRange': '이 범위에는 측정이 없었습니다.',
  'empty.coverageTpl': '{total}시간 가운데 {done}시간을 측정했습니다.',
  'empty.reportsNoData': '일간 보고서는 측정이 있는 첫 하루가 지나야 만들어집니다.',
  'empty.compareOneSession': '비교하려면 끝난 세션이 두 개 필요합니다. 지금은 하나뿐입니다.',
  'empty.exportNoData': '내보낼 것이 없습니다. 기록에 내용이 쌓이도록 측정을 시작하세요.',
  'empty.alertsOff': '경보가 꺼져 있습니다. 켜더라도 앱이 열려 있을 때만 동작합니다.',
  'empty.scheduleEmpty': '설정된 시각이 없습니다. 일정은 앱이 열려 있을 때만 동작합니다.',
  'empty.historyEmpty': '기록이 비어 있습니다.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': '모듈 목록',

  'modules.01.title': '기록계',
  'modules.01.desc': '1분부터 30일까지, 시간에 따른 측정의 흐름입니다.',
  'modules.02.title': '임계값',
  'modules.02.desc': '지표마다 주의와 심각의 경계를 직접 정합니다.',
  'modules.03.title': '보정',
  'modules.03.desc': '알려진 광원을 기준으로 맞추는 일과, 보정으로 고쳐지지 않는 것.',
  'modules.04.title': '보고서',
  'modules.04.desc': '인쇄물처럼 짜인 일간·주간 집계.',
  'modules.05.title': '내보내기',
  'modules.05.desc': '측정값을 CSV나 JSON 파일로 저장하고 각 열을 설명합니다.',
  'modules.06.title': '비교',
  'modules.06.desc': '두 세션을 나란히 놓고 차이를 숫자로 보여 줍니다.',
  'modules.07.title': '화면 테스트',
  'modules.07.desc': '내 모니터를 단계별로 확인하는 테스트 패턴.',
  'modules.08.title': '일정',
  'modules.08.desc': '정해 둔 시각에 하는 측정.',
  'modules.09.title': '경보',
  'modules.09.desc': '임계값을 넘었을 때의 알림 — 그리고 그것이 동작하지 않는 경우.',
  'modules.10.title': '후원',
  'modules.10.desc': '앱은 전부 무료입니다. 여기서 만든 사람에게 커피를 사 줄 수 있습니다.',
  'modules.11.title': '문서',
  'modules.11.desc': '이 측정이 무엇이고, 무엇은 분명히 아닌지.',
  'modules.12.title': '설정',
  'modules.12.desc': '테마, 글자 크기, 동작 줄이기, 기록 지우기.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': '측정 채널',
  'channels.pick': '큰 화면에 표시',
  'channels.stale': '데이터 없음',
  'channels.approx': '근삿값',

  'help.unit': '단위',
  'help.range': '범위',
  'help.thresholds': '임계값',
  'help.warn': '주의 임계값',
  'help.crit': '심각 임계값',
  'help.now': '현재',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „지표” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': '지표',
  'col.unit': '단위',
  'col.range': '범위',
  'col.direction': '방향',
  'col.time': '시각',
  'col.date': '날짜',
  'col.zone': '구역',
  'col.avg': '평균',
  'col.min': '최소',
  'col.max': '최대',
  'col.name': '열',
  'col.meaning': '내용',
  'col.channel': '채널',
  'col.gain': '배율',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': '시간 범위',
  'recorder.range.60s': '60초',
  'recorder.range.15min': '15분',
  'recorder.range.1h': '1시간',
  'recorder.range.24h': '24시간',
  'recorder.range.30d': '30일',
  'recorder.gap': '측정 없음',
  'recorder.sessionTitle': '세션 통계',
  'recorder.zonesCaption': '청색광 비율의 구역 분포',
  'recorder.tableCaption': '선택한 범위의 측정값',
  'recorder.crosshair': '판독 십자선',
  'recorder.prevAria': '이전 지점',
  'recorder.nextAria': '다음 지점',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': '모양',
  'settings.themeLabel': '테마',
  'settings.themeSystem': '시스템 설정에 따름',
  'settings.themeLight': '밝게',
  'settings.themeDark': '어둡게',
  'settings.themeHint': '‘시스템 설정에 따름’ 테마는 휴대폰 설정에 맞추어 함께 바뀝니다.',
  'settings.textLabel': '글자 크기',
  /* Mnożnik jako LICZBA we wstawce — 1.15 po koreańsku, 1,15 po polsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': '글자만이 아니라 인터페이스 전체를 키웁니다 — 버튼과 줄도 글자와 함께 커집니다.',
  'settings.motionGroup': '동작',
  'settings.motionLabel': '동작 줄이기',
  'settings.motionHint': '모든 전환을 끕니다. 그러면 척도의 바늘이 미끄러지듯 움직이지 않고 1초에 한 번씩 건너뜁니다.',
  'settings.dataTitle': '데이터',
  'settings.clearLabel': '기록 지우기',
  'settings.clearHintTpl': '기록에는 지금 저장된 지점이 {count}개 있습니다.',
  'settings.clearHintEmpty': '기록이 비어 있습니다.',
  'settings.clearTitle': '기록을 지울까요?',
  'settings.clearConfirm': '측정 기록 전체를 지울까요? 되돌릴 수 없습니다.',
  'settings.clearKey': '지우기',
  'settings.aboutTitle': '앱 정보',
  'settings.versionTpl': '{app}, 버전 {version}.',
  'settings.offlineText': '앱은 네트워크 없이 동작합니다. 처음 연 뒤에는 모든 파일이 브라우저 저장 공간에 놓이므로 비행기 모드에서도 달라지는 것이 없습니다. 앱은 네트워크 요청을 하지 않으므로 어떤 서버로도 아무것도 전송되지 않습니다.',
  'settings.docsKey': '문서 열기',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': '취소',
  'common.save': '저장',
  'common.reset': '기본값 복원',
  'common.yes': '예',
  'common.no': '아니요',
  'common.on': '켜짐',
  'common.off': '꺼짐',
  'common.sep': ' · ',
  'common.stepsTitle': '단계별로',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': '직접 정하는 임계값은 무엇을 위한 것인가',
  'modules.02.intro': '임계값은 앱이 언제 ‘주의’라고 말하고 언제 ‘심각’이라고 말할지 정합니다. 기본값은 규격이 아니라 저희의 편집상 판단입니다 — 다른 조건에서 측정한다면 자신에게 맞게 옮기세요. 평가와 대시보드의 문장은 바뀐 임계값으로 곧바로 계산됩니다.',
  'modules.02.orderNormal': '주의 임계값은 심각 임계값보다 아래에 있어야 합니다.',
  'modules.02.orderInvert': '여기서는 값이 높을수록 좋으므로 주의 임계값이 심각 임계값보다 위에 있습니다.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': '척도 미리보기: {name}',
  'modules.02.nowTpl': '현재 {value}',
  'modules.02.resetDone': '기본 임계값을 복원했습니다.',
  'modules.02.profilesTitle': '프로필',
  'modules.02.profilesHint': '프로필은 일곱 지표 전부의 임계값을 저장해 둔 한 벌입니다. 프로필을 적용하면 한 번에 바뀝니다.',
  'modules.02.profileSaveKey': '현재 임계값 저장',
  'modules.02.profileNameLabel': '새 프로필 이름',
  'modules.02.profileNameHint': '이름은 이 기기에 남습니다. 최대 40자입니다.',
  'modules.02.profileNameEmpty': '프로필 이름을 입력하세요.',
  'modules.02.profileSavedTpl': '“{name}” 프로필을 저장했습니다.',
  'modules.02.profileAppliedTpl': '“{name}” 프로필을 적용했습니다.',
  'modules.02.profileRemovedTpl': '“{name}” 프로필을 삭제했습니다.',
  'modules.02.profileFailed': '이 프로필을 적용하지 못했습니다.',
  'modules.02.profileCustomTpl': '{date}에 저장한 나만의 프로필입니다.',
  'modules.02.builtin.default.name': '기본',
  'modules.02.builtin.default.desc': '지표 목록에 실린 임계값 — 모든 측정의 출발점입니다.',
  'modules.02.builtin.evening.name': '저녁 — 부드럽게',
  'modules.02.builtin.evening.desc': '차가운 빛 색과 일주기 리듬 영향을 더 일찍 경고합니다.',
  'modules.02.builtin.work.name': '책상 작업',
  'modules.02.builtin.work.desc': '밝고 차가운 주광은 허용하되, 깜박임과 균일도를 지켜봅니다.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': '왜 효과가 있는가',
  'modules.03.why': '카메라 센서에는 채널 사이의 고정된 치우침이 있습니다. 흰 종이를 측정하면 그 치우침이 얼마나 큰지 드러나고, 그만큼을 덜어 낼 수 있습니다. 이 앱에서 정확도를 실제로 높이는 유일한 기능이며 — 그래도 카메라가 분광계가 되지는 않습니다.',
  'modules.03.steps.1': '측정하려는 빛 아래에 흰 종이를 놓으세요.',
  'modules.03.steps.2': '대시보드에서 ‘측정 시작’을 누르고 프레임을 종이로 채우세요.',
  'modules.03.steps.3': '이곳으로 돌아와 ‘보정’을 누르고 3초 동안 휴대폰을 움직이지 마세요.',
  'modules.03.runKey': '보정 (3초)',
  'modules.03.clearKey': '보정 삭제',
  'modules.03.busyTpl': '종이를 측정하는 중… {sec}초 남음',
  'modules.03.statusNone': '보정이 없습니다. 측정은 동작하며, 값은 비교용으로 받아들이세요.',
  'modules.03.statusOnTpl': '{date} {time}에 보정했습니다.',
  'modules.03.gainsTitle': '채널 배율',
  'modules.03.gainR': '빨강',
  'modules.03.gainG': '초록',
  'modules.03.gainB': '파랑',
  'modules.03.gainsNone': '설정되지 않음',
  'modules.03.needRunning': '먼저 측정을 시작하고 카메라를 흰 종이로 향하세요.',
  'modules.03.tooFew': '표본이 너무 적습니다. 측정이 실제로 동작하는지 확인하세요.',
  'modules.03.tooDark': '영상이 보정하기에 너무 어둡습니다. 종이를 더 밝게 비추고 다시 시도하세요.',
  'modules.03.refused': '채널의 치우침이 너무 커서 보정으로 인정할 수 없습니다. 고른 빛 아래에서 흰 종이를 사용하세요.',
  'modules.03.done': '보정했습니다. 이제 색온도와 일주기 리듬 영향이 더 정확해집니다.',
  'modules.03.cleared': '보정을 삭제했습니다.',
  'modules.03.limitsTitle': '보정이 고쳐 주지 않는 것',
  'modules.03.limits.1': '보정은 카메라의 세 채널을 고르게 맞출 뿐, 그 이상은 하지 않습니다. 카메라에 스펙트럼을 주지는 못하므로 색온도와 일주기 리듬 영향은 sRGB 원색에서 계산한 근삿값으로 남습니다.',
  'modules.03.limits.2': '장면 밝기를 절대적인 값으로 바꾸어 주지도 않습니다 — 그 숫자는 상대적인 값으로 남습니다. 그 아래에서 값을 움직이는 자동 노출과 화이트 밸런스를 끄지도 않습니다.',
  'modules.03.limits.3': '다른 빛으로 옮겨 가지도 않습니다: 어떤 전구 아래에서 한 보정은 그 전구를 설명할 뿐입니다. 광원이 달라지면 다시 하세요. 그리고 이 측정이 무엇이 아닌지는 전혀 바꾸지 못합니다 — 여전히 검사가 아니며 질병을 진단하는 근거도 아닙니다.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': '보고서 기간',
  'modules.04.rangeDay': '하루',
  'modules.04.rangeWeek': '한 주',
  'modules.04.headTpl': '{from}부터 {to}까지 · 기록 {count}개 지점.',
  'modules.04.tableTitle': '집계',
  'modules.04.tableCaption': '선택한 기간의 평균, 최소, 최대',
  'modules.04.panoramaTitle': '파노라마',
  'modules.04.panoramaAriaTpl': '파노라마: {name}, {span}.',
  'modules.04.panoramaSpanDay': '최근 하루를 시간 단위로 나눈 것',
  'modules.04.panoramaSpanWeek': '최근 한 주를 날짜 단위로 나눈 것',
  'modules.04.panoramaHint': '막대의 높이와 색은 같은 것을 말합니다: 정상 범위이면 낮고, 주의이면 중간이며, 심각이면 가득 찹니다. 밑동의 짧은 선은 측정이 없던 시간을 뜻합니다.',
  'modules.04.coverageDayTpl': '{total}시간 가운데 {done}시간을 측정했습니다.',
  'modules.04.coverageWeekTpl': '{total}일 가운데 {done}일을 측정했습니다.',
  'modules.04.zonesTitle': '구역 분포',
  'modules.04.zonesCaptionTpl': '주 채널을 기준으로 계산했습니다: {name}.',
  'modules.04.worstTpl': '가장 힘든 시간대: {value}.',
  'modules.04.worstNone': '뚜렷한 때 없음',
  'modules.04.worstHourTpl': '{hour}시',
  'modules.04.adviceTitle': '무엇을 하면 되는가',
  'modules.04.adviceMelanopicTpl': '일주기 리듬 영향은 평균 {value}×였습니다. 저녁에는 0.50 아래로 내려가는 편이 좋습니다 — 더 따뜻한 전구나 야간 모드가 가장 간단합니다.',
  'modules.04.adviceKelvinTpl': '빛이 차가웠습니다(평균 {value} K). 작업에는 나무랄 데 없지만, 잠들기 두 시간 전에는 3000 K 아래가 더 부드럽습니다.',
  'modules.04.adviceFlickerTpl': '눈에 띄는 깜박임이 보입니다(평균 {value}%). 대개는 값싼 조광기나 백라이트 전원이 원인입니다.',
  'modules.04.adviceUniformityTpl': '빛이 고르지 않게 퍼져 있습니다({value}%). 조명을 옮기거나 각도를 바꾸는 편이 보통 전구를 바꾸는 것보다 낫습니다.',
  'modules.04.adviceWorstTpl': '임계값을 벗어난 측정값은 {hour}시에 가장 많이 모여 있습니다.',
  'modules.04.adviceNone': '이 기간에는 설정한 임계값을 넘어 두드러지는 것이 없습니다.',
  'modules.04.limitsTitle': '이것은 건강 조언이 아닙니다',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': '결론은 오직 이 휴대폰의 카메라가 본 것에서만 나옵니다. 앱은 스펙트럼을 측정하지 않으며 어떤 진단도 내리지 않습니다.',
  'modules.04.printHint': '이 화면은 인쇄물처럼 짜여 있습니다: 표와 설명은 종이에서도, 시스템 돋보기에서도, 화면 낭독기에서도 똑같이 읽힙니다.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': '데이터 범위',
  'modules.05.range1h': '1시간',
  'modules.05.range24h': '하루',
  'modules.05.range7d': '7일',
  'modules.05.range30d': '30일',
  'modules.05.csvKey': 'CSV 파일 저장',
  'modules.05.jsonKey': 'JSON 파일 저장',
  'modules.05.formatTitle': '파일 형식',
  'modules.05.formatCsv': 'CSV: 열은 세미콜론으로 나뉘고, 소수점 구분자는 쉼표이며, 인코딩은 BOM이 붙은 UTF-8입니다. 쉼표를 소수점 구분자로 쓰는 지역 설정의 Excel은 이런 파일을 아무것도 설정하지 않고 엽니다.',
  'modules.05.formatJson': 'JSON: 같은 데이터가 “points” 필드에 들어 있고, 소수점은 마침표, 시각은 밀리초 단위입니다 — 형식이 그렇게 요구합니다.',
  'modules.05.resolution': '기록은 5초에 한 지점씩 저장하며 30일 전까지 거슬러 올라갑니다. 1초에 다섯 표본이라는 완전한 해상도는 파일에 들어 있지 않습니다 — 엔진은 그것을 1분 동안만 보관합니다.',
  'modules.05.offline': '파일은 기기에서 만들어지고 기기에 남습니다. 내보내기는 네트워크에 연결하지 않습니다.',
  'modules.05.columnsTitle': '열 설명',
  'modules.05.columnsCaption': '파일의 열과 그 뜻',
  'modules.05.descDate': '기기 시계에서 가져온 지점의 날짜이며, 일-월-년 순서로 적습니다.',
  'modules.05.descTime': '지점의 시각이며, 초 단위까지 적습니다.',
  'modules.05.descZone': '저장하는 순간의 청색광 비율 구역입니다. 엔진은 이 지표 하나에 대해서만 구역을 저장하므로, 나머지는 임계값에서 직접 계산하세요.',
  'modules.05.descMetricTpl': '{short} 단위: {unit}. 범위 {min}–{max}.',
  'modules.05.previewTitle': '미리보기',
  'modules.05.previewHint': '파일의 첫 다섯 줄이며, 저장될 모습 그대로입니다.',
  'modules.05.savedTpl': '{name} 파일을 저장했습니다 — {rows}줄.',
  'modules.05.failed': '이 브라우저가 파일 저장을 허용하지 않았습니다.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': '앱은 끝난 측정 세션을 모두 이 기기에 저장합니다. 두 개를 골라 하나의 띠 위에서 보고 차이를 숫자로 읽어 보세요.',
  'modules.06.noSessions': '아직 끝난 세션이 없습니다. 측정을 시작하고 중지한 뒤 이곳으로 돌아오세요.',
  'modules.06.slotA': '세션 A',
  'modules.06.slotB': '세션 B',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': '띠',
  'modules.06.tapeAriaTpl': '{slot} 세션의 경과, 지표 {name}.',
  'modules.06.tapeHint': '두 세션은 같은 너비로 늘여 놓았습니다: 막대 하나는 같은 시각이 아니라 지속 시간의 같은 몫입니다. 높이와 색은 대시보드에서와 같은 것을 말합니다.',
  'modules.06.tapeChannelTpl': '띠는 주 채널을 보여 줍니다: {name}.',
  'modules.06.diffTitle': '차이',
  'modules.06.diffCaption': '두 세션의 평균과 그 사이의 차이',
  'modules.06.clearKey': '저장된 세션 삭제',
  'modules.06.cleared': '저장된 세션을 삭제했습니다.',
  'modules.06.savedTpl': '세션을 저장했습니다: {dur}.',
  'modules.06.limitsTitle': '이 비교가 말해 주지 않는 것',
  'modules.06.limits': '비교하는 것은 두 광원이 아니라 두 측정입니다. 세션 사이에 프레임, 거리, 시간대, 휴대폰의 자세가 달라졌다면 차이는 그것에 대한 이야기이기도 합니다. 가장 정직한 비교는 조명을 바꾸기 전과 후의 같은 장면입니다.',
  'modules.06.keepTpl': '가장 최근 세션이 최대 {count}개까지 기억됩니다.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': '테스트 패턴은 이 기기의 화면 전체에 표시됩니다. 화면을 눈으로 살펴보기 위한 것입니다: 흰색이 고른지, 회색이 어떤 색으로 기울지는 않는지, 백라이트가 모서리에서 새어 나오지는 않는지.',
  'modules.07.steps.1': '평소 작업하는 밝기로 화면을 맞추고 시스템 야간 모드를 끄세요.',
  'modules.07.steps.2': '아래 목록에서 패턴을 고르세요. 화면 전체를 채웁니다.',
  'modules.07.steps.3': '약 60센티미터 거리에서 화면과 마주 보고 살펴보세요. 그런 다음 같은 패턴을 비스듬한 각도에서 보세요.',
  'modules.07.steps.4': '‘패턴 닫기’ 버튼이나 Escape 키로 빠져나와 다음 패턴으로 넘어가세요.',
  'modules.07.planesTitle': '패턴',
  'modules.07.exitKey': '패턴 닫기',
  'modules.07.showAriaTpl': '패턴 보기: {name}',
  'modules.07.planeAriaTpl': '테스트 패턴: {name}. 닫기 버튼은 화면 아래에 있습니다.',
  'modules.07.plane.white.name': '흰색',
  'modules.07.plane.white.hint': '얼룩, 색이 도는 곳, 가장자리에서 밝아지는 곳을 찾아보세요. 흰색은 표면 전체에서 하나의 색이어야 합니다.',
  'modules.07.plane.gray75.name': '회색 75%',
  'modules.07.plane.gray75.hint': '회색은 회색이어야 합니다. 초록빛이나 분홍빛이 돈다면 화면의 화이트 밸런스가 틀어진 것입니다.',
  'modules.07.plane.gray50.name': '회색 50%',
  'modules.07.plane.gray50.hint': '색이 도는지 판단하기에 가장 좋은 패턴입니다. 가운데와 모서리를 비교해 보세요.',
  'modules.07.plane.gray25.name': '회색 25%',
  'modules.07.plane.gray25.hint': '어두운 회색은 백라이트가 새는 곳과 값싼 패널의 줄무늬를 드러냅니다.',
  'modules.07.plane.black.name': '검정',
  'modules.07.plane.black.hint': '어두운 방에서는 백라이트가 새는 곳과 밝아진 모서리가 모두 보입니다.',
  'modules.07.plane.red.name': '순수한 빨강',
  'modules.07.plane.red.hint': '균일한 빨강은 죽은 서브픽셀과 패널의 고르지 않은 곳을 드러냅니다.',
  'modules.07.plane.green.name': '순수한 초록',
  'modules.07.plane.green.hint': '초록은 밝기를 가장 많이 실어 나릅니다 — 망가진 픽셀을 찾기에 가장 쉽습니다.',
  'modules.07.plane.blue.name': '순수한 파랑',
  'modules.07.plane.blue.hint': '파랑은 화면 표면의 먼지와 얼룩을 흰색보다 잘 보여 줍니다.',
  'modules.07.plane.grid.name': '격자',
  'modules.07.plane.grid.hint': '선은 가운데에서만큼 모서리에서도 또렷해야 합니다. 가장자리가 흐린 것은 영상 크기 조정의 문제입니다.',
  'modules.07.warn': '패턴은 측정 버튼이 있는 조작 대시보드까지 화면 전체를 가립니다. 앱에서 그런 일이 일어나는 곳은 여기뿐이며, 그래서 나가기 버튼이 크고 항상 보입니다. 패턴이 화면에 있는 동안 측정은 계속 진행되며 멈출 수 없습니다 — 버튼으로 돌아가려면 패턴을 닫으세요.',
  'modules.07.cameraTitle': '여기서 할 수 없는 것',
  'modules.07.camera': '휴대폰은 자기 화면을 보지 못하므로 이 패턴들을 같은 기기로 측정할 수는 없습니다. 모니터를 측정하려면 패턴을 모니터에 띄우고 측정은 휴대폰으로 하세요 — 서로 다른 두 기기이고 서로 다른 두 역할입니다.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': '일정은 정해 둔 시각에 측정하도록 알려 줍니다. 카메라를 스스로 켜지는 않습니다: 정한 시각에 알림을 보여 주고, 측정은 대시보드의 ‘측정 시작’ 버튼으로 시작합니다. 처음과 똑같습니다.',
  'modules.08.onlyOpenTitle': '이것이 동작하지 않는 경우',
  'modules.08.onlyOpen': '일정은 앱이 열려 있을 때만 동작합니다. 닫힌 브라우저 탭은 시간을 세지 않으며 아무것도 알려 주지 않습니다. 시스템 알림 권한을 요청하지 않으며, 네트워크로 아무것도 보내지 않습니다.',
  'modules.08.enableLabel': '알림 켜기',
  'modules.08.timesTitle': '시각',
  'modules.08.timeAriaTpl': '{n}번째 시각: 알림 시각',
  'modules.08.addKey': '시각 추가',
  'modules.08.removeAriaTpl': '{time} 시각 삭제',
  'modules.08.addedTpl': '{time} 시각을 추가했습니다.',
  'modules.08.removedTpl': '{time} 시각을 삭제했습니다.',
  'modules.08.badTime': '시각을 22:00 형식으로 입력하세요.',
  'modules.08.nextTpl': '다음 알림: {time}.',
  'modules.08.nextNone': '알림이 꺼져 있습니다.',
  'modules.08.dueTpl': '예정된 측정 시각: {time}.',
  'modules.08.dueKey': '대시보드 보기',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': '경보는 지표 하나를 지켜보다가, 그 지표가 고른 구역을 정해 둔 시간 동안 끊김 없이 유지할 때에만 알립니다. 측정을 멈추는 일도, 버튼을 가리는 일도 결코 없습니다.',
  'modules.09.enableLabel': '경보 켜기',
  'modules.09.metricLabel': '지켜볼 지표',
  'modules.09.levelLabel': '어느 구역부터',
  'modules.09.levelWarning': '주의부터 위로',
  'modules.09.levelCritical': '심각만',
  'modules.09.sustainLabel': '몇 초 동안 끊김 없이',
  'modules.09.sustainHint': '시간이 짧으면 휴대폰을 움직일 때 잘못된 경보가 늘어납니다. 5초 아래로는 내려가지 않습니다.',
  'modules.09.soundLabel': '짧은 알림음',
  'modules.09.soundHint': '소리는 기기에서 만들어집니다. 네트워크에서 내려받는 것은 없습니다.',
  'modules.09.cooldownHint': '경보는 2분에 최대 한 번입니다. 표본마다 되풀이되는 경보는 결국 영영 꺼지고 마는 경보입니다.',
  'modules.09.whenNotTitle': '경보가 동작하지 않는 경우',
  'modules.09.whenNot': '알림은 시스템이 아니라 앱 안에 있습니다. 앱이 닫혀 있거나 뒤로 숨겨져 있을 때, 측정이 동작하지 않을 때, 지켜보는 지표를 그 순간 측정할 수 없을 때는 동작하지 않습니다. 시스템 알림 권한은 요청하지 않습니다.',
  'modules.09.firedTpl': '{name}: {sec}초째 {zone} — 현재 {value}.',
  'modules.09.saved': '경보 설정을 저장했습니다.',
  'modules.09.statusOnTpl': '지켜보는 중: {name}, {level}, {sec}초 뒤.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': '이 앱은 무료입니다',
  'support.freeText': '일곱 가지 지표 전부가 처음 실행할 때부터 숫자를 보여 줍니다. 기록계, 임계값, 보정, 보고서, 내보내기, 세션 비교, 그리고 30일치 기록 전체가 계정도, 요금도, 제한도 없이 동작합니다 — 오프라인에서도 똑같습니다. 나중을 위해 요금 뒤에 미뤄 둔 것은 여기에 없습니다.',
  'support.whyTitle': '왜 부탁드리는가',
  'support.whyText': '빛 모니터는 일과가 끝난 뒤의 시간에 혼자 만들고 유지하고 있습니다. 후원은 고치는 데 드는 시간, 더 많은 휴대폰에서 시험하는 시간, 그리고 모듈 목록에 들어갈 다음 도구에 쓰입니다. 아무도 아무것도 내지 않더라도 멈추는 것은 없습니다.',
  'support.nothingTitle': '후원하면 무엇이 생기나',
  'support.nothingText': '아무것도 생기지 않습니다. 후원한다고 열리는 숫자도, 모듈도, 설정도 없습니다 — 처음부터 전부 열려 있기 때문입니다. 남는 것은 누군가에게 쓸모가 있었다는 사실을 제가 알게 된다는 것뿐입니다.',
  'support.keyTitle': '손을 보태고 싶다면',
  'support.keyLabel': '커피 한 잔 사주기',
  'support.keyAria': '커피 한 잔 사주기 — 새 탭에서 외부 페이지를 엽니다',
  'support.serviceText': '후원 프로필은 Buy Me a Coffee 같은 외부 서비스가 운영합니다. 앱은 그곳에서 스크립트도, 위젯도, 이미지도 불러오지 않습니다 — 여기에 있는 것은 평범한 링크 하나뿐이고 그 밖에는 아무것도 없습니다.',
  'support.privacyText': '이 버튼을 누르면 새 탭에서 외부 페이지가 열리며, 이 기기에서 무언가가 나가는 것은 그때뿐입니다. 측정값과 기록, 설정은 있던 자리에 그대로 남습니다 — 이 브라우저의 저장 공간에.',
  'support.privacyPendingText': '주소가 마련되면 버튼을 눌렀을 때 새 탭에서 외부 페이지가 열리며, 이 기기에서 무언가가 나가는 것은 그때뿐일 것입니다. 측정값과 기록, 설정은 있던 자리에 그대로 남습니다 — 이 브라우저의 저장 공간에.',
  'support.emptyTitle': '프로필이 아직 연결되지 않았습니다',
  'support.emptyText': '후원 프로필의 주소를 아직 적어 넣지 않았으므로, 아무 데로도 이어지지 않을 버튼은 여기에 두지 않았습니다. 앱의 나머지는 그대로 동작합니다 — 이 후원을 기다리는 것은 없습니다.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': '이 앱이 측정하지 않는 것',
  'docs.notList.1': '스펙트럼을 측정하지 않습니다. 카메라에는 넓은 색 채널 세 개와 자동 노출, 자동 화이트 밸런스가 있을 뿐입니다.',
  'docs.notList.2': '절대적인 값을 측정하지 않습니다. 장면 밝기는 광도 측정의 결과가 아니라 상대적인 지표입니다.',
  'docs.notList.3': '색온도를 직접 측정하지 않습니다. 색온도와 일주기 리듬 영향은 sRGB 색에서 계산한 근삿값입니다.',
  'docs.notList.4': '전원에서 오는 깜박임을 보지 못합니다. 5 Hz 표본추출은 2.5 Hz 아래의 맥동만 봅니다 — 전원의 100 Hz는 닿지 않는 범위이며, 앱은 이를 결코 결과로 내놓지 않습니다.',
  'docs.notList.5': '진단을 내리지 않고 건강 조언도 하지 않습니다. 어떤 측정값도 그 둘 가운데 어느 것도 아닙니다.',
  'docs.notList.6': '당신의 빛을 어떤 공식 기준과도 비교하지 않습니다. 임계값은 모듈 02에서 바꿀 수 있는 설정입니다.',
  'docs.whatTitle': '무엇을 어떻게 측정하는가',
  'docs.whatLead': '휴대폰 카메라가 빛이 닿는 면을 바라보고, 앱은 1초에 다섯 번 프레임 가운데 영역에서 R, G, B 채널의 평균을 계산합니다. 이 세 숫자에서 일곱 가지 지표를 이끌어 냅니다.',
  'docs.whatCrop': '측정 영역은 프레임 너비의 가운데 60%와 높이의 가운데 60%입니다 — 조준 화면에서 조준선이 그리는 바로 그 사각형입니다. 그 바깥은 아무것도 계산하지 않습니다.',
  'docs.whatRate': '200 ms마다 한 표본, 즉 1초에 5번입니다. 최근 1분은 완전한 해상도로 메모리에 있고, 그보다 오래된 것은 5초마다 저장되어 30일 전까지 거슬러 올라갑니다.',
  'docs.metricsTitle': '일곱 가지 지표',
  'docs.formulasTitle': '공식',
  'docs.formula.share.formula': '청색광 비율 = B / (R + G + B) × 100%',
  'docs.formula.share.text': '감마를 되돌리지 않은 sRGB 값으로 계산합니다 — 일부러 그렇게 합니다. 앱의 이전 버전과 같은 정의이므로 예전에 정해 둔 임계값이 지금도 같은 뜻을 지닙니다. 색을 밝기에서 떼어 냅니다.',
  'docs.formula.brightness.formula': '밝기 = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': '채널의 평균값을 범위에 대한 백분율로 나타냅니다. 그 아래에서 자동 노출이 값을 움직이므로 상대적인 지표입니다 — 숫자 하나를 측정 결과로 읽지 말고 두 장면을 비교하세요.',
  'docs.formula.kelvin.title': '색온도 — McCamy 근사식',
  'docs.formula.kelvin.formula': 'n = (x − 0.3320) / (y − 0.1858)\nCCT = −449 n³ + 3525 n² − 6823.3 n + 5520.33',
  'docs.formula.kelvin.text': '먼저 sRGB 감마를 되돌리고, D65 흰색을 기준으로 행렬을 거쳐 CIE XYZ로 옮긴 다음 색도 x, y를 계산합니다. McCamy 공식은 대략 2000 K에서 12500 K 사이에서 믿을 만합니다. 그 범위 밖에서는 삼차식이 어긋나므로 결과를 잘라 내고 믿을 수 없다고 표시합니다 — 그때 척도의 기준선이 점선으로 바뀌고 “방법의 범위를 벗어났습니다”라는 문장이 나타납니다.',
  'docs.formula.melanopic.title': '일주기 리듬 영향 — 멜라노픽 비율',
  'docs.formula.melanopic.formula': 'mel = 0.0016 R + 0.3110 G + 0.8460 B\nY = 0.2127 R + 0.7152 G + 0.0722 B\n결과 = (mel / Y) × 중성 흰색에서 1.00이 되도록 정규화',
  'docs.formula.melanopic.text': '세 채널 모두 선형 값입니다. 진짜 물리량은 스펙트럼과 멜라놉신 감도 곡선(정점은 약 490 nm)의 적분입니다. 카메라에는 넓은 채널이 셋뿐이므로 sRGB 원색을 그 대략적인 파장(R 612 nm, G 549 nm, B 465 nm)에서의 멜라노픽 감도로 가중합니다. 변화의 방향은 믿을 만하지만 절댓값은 그렇지 않습니다 — 그래서 이 숫자 옆에 “≈” 기호가 붙습니다.',
  'docs.formula.flicker.formula': '깜박임 = (max − min) / (max + min) × 100%',
  'docs.formula.flicker.text': 'IES 정의이며, 밝기 표본의 창에서 계산합니다. 주파수는 신호가 평균값을 가로지르는 횟수에서 추정합니다. 5 Hz 표본추출은 2.5 Hz 아래의 변조만 보며(나이퀴스트 한계), 0.5% 이상의 진폭에서 0.2 Hz와 2 Hz 사이의 주파수만 믿을 만하다고 인정합니다 — 그 아래에서 평균을 가로지르는 것은 광원의 맥동이 아니라 센서의 잡음입니다.',
  'docs.formula.uniformity.formula': '균일도 = 가장 어두운 칸 / 가장 밝은 칸 × 100%',
  'docs.formula.uniformity.text': '측정 영역을 3×3 격자의 아홉 칸으로 나누어 양 끝을 비교합니다. 100%는 완벽하게 고르게 퍼진 빛입니다. 화면에서 값이 낮으면 백라이트가 새어 나오거나 무언가 비친다는 뜻이고, 책상에서는 조명을 잘못 놓았다는 뜻입니다. 눈 편안함과 더불어 값이 높을수록 좋은 유일한 지표입니다.',
  'docs.formula.comfort.formula': '100점에서 감점:\n일주기 리듬 영향 0.75 초과 — 최대 35점\n빛 색 4000 K 초과 — 최대 25점\n깜박임 5% 초과 — 최대 25점\n균일도 60% 미만 — 최대 15점',
  'docs.formula.comfort.text': '여섯 개의 숫자 대신 하나의 평가입니다. 측정할 수 없었던 지표는 감점을 주지 않습니다 — 데이터 없음이 좋은 결과인 척하는 일은 결코 없습니다. 가중치는 규격이 아니라 저희의 편집상 판단입니다. 그래서 모듈 01은 점수 구성을 나누어 보여 주며, 그 평가에 동의하지 않을 수 있게 합니다.',
  'docs.rangesTitle': '범위와 임계값',
  'docs.rangesLead': '아래의 임계값은 지금 적용되고 있는 값입니다 — 모듈 02에서 바꾸었다면 표에는 공장 값이 아니라 당신의 값이 나옵니다.',
  'docs.dirNormal': '낮을수록 부드럽습니다',
  'docs.dirInvert': '높을수록 좋습니다',
  'docs.privacyTitle': '데이터와 개인정보',
  'docs.privacyText': '카메라 영상은 어디로도 전송되지 않고 저장되지도 않습니다 — 각 프레임에서 남는 것은 숫자 세 개뿐입니다. 측정값과 임계값, 설정은 이 기기의 브라우저 저장 공간에 있습니다. 앱은 어떤 네트워크 요청도 하지 않으며 오프라인으로 동작합니다.',
  'docs.mdrTitle': '고지 사항',
  'docs.freeText': '앱은 전부 무료이고 앞으로도 그렇습니다: 일곱 가지 지표, 기록, 보고서, 내보내기, 오프라인 모드 모두 계정도, 요금도, 제한도 없이 동작합니다. 고맙다는 말을 전하고 싶은 분은 모듈 10 ‘후원’을 찾아 주세요.',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': '앱이 온전히 불러와지지 않았습니다',
  'boot.filesTpl': '불러오지 못한 파일: {list}.',
  'boot.modulesTpl': '보고하지 않은 모듈: {list} — 이 항목들은 목록에서 열리지 않습니다.',
  'boot.modulesRangeTpl': '모듈 {from}–{to}',
  'boot.tail': '페이지를 새로 고치세요. 그래도 해결되지 않으면 서버의 파일이 온전하지 않은 것입니다.',
  'boot.loss.bus': '모듈들이 서로 보이지 않게 되고 측정이 시작되지 않습니다',
  'boot.loss.metrics': '어떤 값도 계산되지 않습니다',
  'boot.loss.scaleCore': '척도의 기하와 숫자 서식이 사라집니다',
  'boot.loss.scaleText': '인터페이스의 모든 문구가 사라집니다',
  'boot.loss.shell': '어떤 모듈도 열 수 없습니다',
  'boot.loss.engine': '카메라와 측정이 시작되지 않습니다',
  'boot.loss.dash': '대시보드가 비어 있게 됩니다'
});
