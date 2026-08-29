/* docs/v2/i18n/ko.js — słownik WERSJI 2, koreański.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/ko.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej.
 *
 * TERMINOLOGIA: wzięta co do znaku z docs/shared/i18n/ko.js i nigdzie nie
 * ruszona — 청색광 비율, 장면 밝기, 색온도, 일주기 리듬 영향, 깜박임,
 * 균일도, 눈 편안함; kadr to 프레임, strefa to 구역. Poza słownikiem wspólnym
 * ustalono w tym pliku po jednym odpowiedniku na pojęcie: wielkość 지표,
 * pomiar 측정, pojedynczy odczyt 측정값, próg 임계값, profil 프로필,
 * kalibracja 보정, harmonogram 일정, alert 경보, kreator 마법사.
 *
 * REJESTR: 합니다체, jak w warstwie wspólnej, bez wykrzykników. Zakładki
 * i przyciski są rzeczownikami (측정 / 중지 / 기록), teksty pomocy — pełnymi
 * zdaniami.
 *
 * LICZEBNIKI: koreański ma w CLDR jedną kategorię — samo `other`. Nie ma tu
 * czego odmieniać, ale wartość musi zostać obiektem form, bo Intl.PluralRules
 * ('ko') sięgnie w czasie działania aplikacji po klucz 'other'. Liczba stoi
 * przy klasyfikatorze (개, 줄), więc wstawka {n} wędruje w tych zdaniach
 * bliżej końca.
 *
 * PARTYKUŁY: tam, gdzie polskie zdanie stawiało nazwę wielkości w przypadku
 * zależnym, koreańskie musiałoby postawić po wstawce partykułę zależną od
 * ostatniej głoski nazwy (비율 → 이, 색온도 → 가). Zamiast pisać „이(가)”
 * przebudowano te zdania tak, żeby po wstawce stała pauza albo dwukropek —
 * patrz 'alerts.message.*' i 'compare.*'.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (i dlaczego):
 *   'zone.warning'        — wspólne mówi „주의”, ta wersja od zawsze mówi
 *                           mocniej: „경고”;
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu (koreański nie
 *                           zna wielkiej litery, więc brzmi identycznie jak
 *                           napis na plakietce);
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules. Patrz nagłówek docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ko'] = Object.assign(window.I18nData['ko'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': '빛 모니터 — 청색광 측정',
  'app.description': '빛 모니터 — 휴대폰 카메라로 빛의 청색광 비율을 측정합니다. 일곱 가지 지표, 그래프, 기록. 계정도 요금도 없이 누구나 전부 쓸 수 있습니다.',
  'app.skipToContent': '본문으로 건너뛰기',
  'app.measuring': '측정 중',
  'app.docsButton': '설명서와 해설',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — 버전 2',

  'nav.aria': '기본 내비게이션',
  'nav.tablistAria': '앱 화면',
  'nav.measure': '측정',
  'nav.history': '기록',
  'nav.tools': '도구',
  'nav.support': '후원',
  'nav.more': '더보기',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': '설명서',
  'panel.thresholds': '임계값과 프로필',
  'panel.reports': '보고서',
  'panel.export': '데이터 내보내기',
  'panel.compare': 'A/B 비교',
  'panel.calibration': '흰 종이 보정',
  'panel.screenCheck': '내 모니터 점검',
  'panel.schedule': '일정',
  'panel.alerts': '노출 경보',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': '뒤로',
  'action.close': '닫기',
  'action.refresh': '새로 고침',
  'action.apply': '적용',
  'action.delete': '삭제',
  'action.hide': '숨기기',
  'action.start': '시작',
  'action.stop': '중지',
  'action.switch': '전환',
  'action.switchAria': '카메라 전환: 전면 또는 후면',
  'action.resetDefaults': '기본값 복원',
  'action.reports': '보고서',
  'action.exportCsv': 'CSV 내보내기',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': '화면: {name}',
  'a11y.measureStarted': '측정을 시작했습니다.',
  'a11y.measureStopped': '측정을 중지했습니다.',
  'a11y.measureStoppedSummary': '측정을 중지했습니다. 시간: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': '임계값 프로필을 적용했습니다.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': '확인',
  'dialog.confirm': '확인합니다',
  'dialog.cancel': '취소',
  'dialog.infoTitle': '안내',
  'dialog.ok': '알겠습니다',

  'help.sheetTitle': '지표 설명',
  'help.unit': '단위',
  'help.scaleRange': '척도 범위',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': '경고',
  'threshold.crit': '심각',
  'threshold.warnLabel': '경고 임계값',
  'threshold.critLabel': '심각 임계값',
  'threshold.warnAria': '{name} — 임계값: 경고',
  'threshold.critAria': '{name} — 임계값: 심각',

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

  'firstRun.title': '측정하는 방법',
  'firstRun.text': '‘시작’을 누르고 빛이 닿는 면으로 휴대폰을 향한 채 몇 초 동안 가만히 들고 계세요. 미리보기의 사각형이 앱이 실제로 읽는 프레임입니다.',
  'firstRun.close': '안내 닫기',

  'camera.live': '실시간',
  'camera.idle': '카메라가 꺼져 있습니다. ‘시작’을 누르고 빛이 닿는 면으로 휴대폰을 향한 채 몇 초 동안 가만히 들고 계세요.',
  'camera.stopped': '측정을 중지했습니다. 다시 측정하려면 ‘시작’을 누르세요.',

  'error.cameraStart': '카메라를 켜지 못했습니다.',
  'error.engineMissing': '측정 모듈을 불러오지 못했습니다.',

  'metrics.sevenTitle': '일곱 가지 지표',
  'measure.tilesSub': '1초에 5번 갱신',

  'session.title': '이번 세션',
  'session.duration': '측정 시간',
  'session.samples': '표본 수',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     Koreański nie odmienia rzeczownika przez liczbę, więc te trzy napisy
     brzmią tak samo jak plakietki; osobne klucze zostają, bo w innych
     językach to dwa różne słowa. */
  'zone.count.good': '정상 범위',
  'zone.count.warning': '경고',
  'zone.count.critical': '심각',

  'note.calibrated': '흰 종이로 보정한 측정입니다 — 채널이 맞춰져 있습니다.',

  'tile.helpAria': '{name}의 뜻',
  'tile.noMeasurement': '측정 없음',
  'tile.outOfScale': '척도 밖',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': '경고',
  'zone.spoken.warning': '경고',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': '시간에 따른 변화',
  'history.pickHint': '지표와 범위를 고르세요',
  'history.metricLabel': '지표',
  'history.rangeAria': '그래프 시간 범위',
  'history.emptyTitle': '이 범위에는 데이터가 없습니다',
  'history.emptyText': '측정 화면에서 측정을 시작하세요 — 그래프는 몇 초 만에 채워집니다.',
  'history.tableTitle': '최근 측정값',
  'history.tableHide': '표 숨기기',
  'history.tableShow': '표 보기',
  'history.tableCaption': '최근 측정값이며, 최신 것이 위에 있습니다.',
  'history.tableEmpty': '측정값이 없습니다. 측정 화면에서 측정을 시작하세요.',

  'table.time': '시각',
  'table.metric': '지표',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Po koreańsku
     jednostka jest sylabą (분, 시간, 일) i skleja się z liczbą bez spacji —
     dzięki temu żaden z pięciu napisów nie łamie się na dwie linie. */
  'range.1m': '1분',
  'range.1h': '1시간',
  'range.24h': '24시간',
  'range.7d': '7일',
  'range.30d': '30일',

  'chart.now': '지금',
  'chart.countSub': {
    other: '선택한 범위에서 측정값 {n}개'
  },
  'chart.aria': '{name}, 범위 {range}, {count}, 마지막 값 {value} {unit}.',
  'chart.ariaZone': '{name}, 범위 {range}, {count}, 마지막 값 {value} {unit}, 구역: {zone}.',
  'chart.ariaEmpty': '{name} — {range} 범위에 데이터가 없습니다.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': '마법사와 보조 기능',
  'tools.note': '도구는 측정 결과를 해석하는 데 도움을 줍니다. 모두 곧바로 쓸 수 있고, 측정 자체는 도구와 무관하게 동작합니다.',

  'tool.thresholds.sub': '어느 값부터 경고를 띄울지',
  'tool.compare.sub': '두 빛 가운데 어느 쪽이 더 부드러운지',
  'tool.calibration.sub': '정확도를 실제로 높여 주는 유일한 기능',
  'tool.screenCheck.sub': '다섯 단계와 화면에 대한 완성된 결론',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „임계값 일정”
     kontra „일정”. Tak było i tak zostaje. */
  'tool.schedule.title': '임계값 일정',
  'tool.schedule.sub': '저녁에는 다른 임계값으로, 기억하지 않아도 되게',
  'tool.alerts.sub': '심각 구역이 너무 오래 이어질 때 알리는 신호',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': '설정',
  'more.thresholdsSub': '어느 값부터 경고를 띄울지',
  'more.docsSub': '측정하는 방법과 이 측정이 말해 주지 않는 것',
  'more.appearanceTitle': '모양과 접근성',

  'settings.theme': '테마',
  'theme.auto': '시스템 설정에 따름',
  'theme.light': '밝게',
  'theme.dark': '어둡게',

  'settings.textScale': '글자 크기',
  'textScale.100': '표준',
  'textScale.115': '크게 (115%)',
  'textScale.130': '가장 크게 (130%)',

  'settings.contrast': '높은 대비',
  'settings.contrastSub': '테두리를 진하게, 보조 텍스트를 더 어둡게 합니다.',
  'settings.sound': '경보 소리',
  'settings.soundSub': '노출 경보가 켜질 때 나는 짧은 신호음입니다.',
  'settings.vibrate': '경보 시 진동',
  'settings.vibrateSub': '진동을 지원하는 기기에서만 동작합니다.',

  'more.dataTitle': '데이터',
  'more.clearHistory': '측정 기록 지우기',
  'more.clearHistorySub': '이 기기에 저장된 측정값을 삭제합니다. 임계값과 프로필, 설정은 그대로 남습니다.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': '이 앱은 전부 무료입니다. ',
  'more.supportLink': '원하시면 자발적으로 후원할 수 있습니다.',

  'dialog.clearHistory.title': '저장된 기록을 삭제할까요?',
  'dialog.clearHistory.body': {
    other: '이 기기에서 저장된 측정 지점 {n}개를 삭제합니다. 이 작업은 되돌릴 수 없습니다. 임계값과 프로필, 설정은 그대로 남습니다.'
  },
  'dialog.clearHistory.confirm': '기록 삭제',
  'dialog.clearHistory.cancel': '그대로 두기',

  'toast.historyCleared': '측정 기록을 삭제했습니다.',
  'toast.screenUnavailable': '이 화면은 이 버전에서 아직 제공되지 않습니다.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': '이 앱이 측정하는 것',
  'docs.leadText': '휴대폰 카메라가 빛이 닿는 면을 바라보고, 앱은 1초에 다섯 번 프레임 가운데 조각에서 R, G, B 채널의 평균을 계산합니다. 이 세 숫자에서 일곱 가지 지표를 이끌어 냅니다.',
  'docs.limitsTitle': '방법의 한계',
  'docs.limitsText': '카메라에는 넓은 색 채널 세 개와 자동 노출, 자동 화이트 밸런스가 있습니다. 스펙트럼을 측정하지 않고 절대값을 알지 못하므로, 밝기는 럭스가 아니라 상대적인 지표입니다. 색온도와 일주기 리듬 영향은 sRGB 색에서 계산한 근삿값입니다. {rate} Hz 표본추출은 {limit} Hz 아래의 깜박임만 봅니다 — 전원의 100 Hz는 닿지 않는 범위이며, 앱은 이를 결코 결과로 내놓지 않습니다.',

  'note.howTo.repeat.title': '측정을 반복하세요',
  'note.howTo.repeat.text': '한 번의 측정값은 스냅숏입니다. 십수 초 동안 측정하면 더 믿을 만한 그림이 나옵니다.',

  'docs.scale': '척도',
  'docs.direction': '방향',
  'docs.directionHigher': '높을수록 좋습니다',
  'docs.directionLower': '낮을수록 부드럽습니다',
  'docs.privacyTitle': '데이터와 개인정보',
  'docs.privacyText': '카메라 영상은 어디로도 전송되지 않고 저장되지도 않습니다 — 각 프레임에서 남는 것은 숫자 세 개뿐입니다. 측정값과 임계값, 설정은 이 기기의 브라우저 저장 공간에 있습니다. 앱은 어떤 네트워크 요청도 하지 않으며 오프라인으로 동작합니다.',
  'docs.freeLine': '일곱 가지 지표 전부와 기록, 그래프, 도구, 오프라인 모드가 계정 없이 요금 없이 누구에게나 동작합니다.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': '모든 것이 열려 있습니다',
  'support.heroText': '일곱 가지 지표 전부와 측정 기록, 그래프, 모든 도구, 오프라인 모드가 누구에게나 곧바로 동작합니다. 계정도, 제한도, 요금도 없습니다.',
  'support.whyTitle': '왜 부탁드리는가',
  'support.whyText': '{app}는 일과가 끝난 뒤의 시간에 만들고 있으며 누구에게서도 돈을 벌지 않습니다: 광고도 없고, 데이터를 모으지도 않으며, 팔 것도 없습니다. 유지와 앞으로의 개발 — 새 지표, 수정, 다른 휴대폰에서의 시험 — 에는 시간이 듭니다. 이 앱이 쓸모가 있었다면 조금 보태 주셔도 됩니다. 그러지 않으셔도 됩니다.',
  'support.whatTitle': '후원하면 무엇이 생기나',
  'support.whatText': '아무것도 없습니다. 정말로 아무것도 열어 주지 않고 무엇을 빠르게 해 주지도 않습니다 — 앱은 후원 전과 후에 똑같이 보이고 똑같이 동작합니다. 남는 것은 이 작업이 누군가에게 쓸모가 있었다는 사실을 만든 사람이 알게 된다는 것뿐입니다.',
  'support.button': '커피 한 잔 사주기',
  'support.pendingTitle': '후원 계정이 아직 연결되지 않았습니다',
  'support.pendingText': '아직 후원을 보낼 수 있는 주소가 여기에 없습니다. 준비되면 이 자리에 나타납니다 — 그때까지 앱의 모든 것은 똑같이 동작합니다.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': '버튼은 새 탭에서 외부의 Buy Me a Coffee 페이지를 엽니다. 무언가가 이 기기를 떠나는 순간은 그때뿐이며, 그 일은 버튼을 누른 뒤에야 일어납니다. 측정값과 기록, 설정은 이곳에 남습니다.',
  'privacy.externalPending': '주소가 마련되면 버튼을 누를 때 새 탭에서 외부 페이지가 열립니다. 무언가가 이 기기를 떠나는 유일한 순간이 될 것입니다. 측정값과 기록, 설정은 이곳에 남습니다.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (ui-core.js의 예비 구현)',
  'boot.need.metrics': '어떤 값도 계산되지 않습니다',
  'boot.need.bus': '모듈끼리 서로를 보지 못합니다',
  'boot.need.ui': '화면을 전환할 수 없습니다',
  'boot.need.engine': '카메라와 측정이 시작되지 않습니다',
  'boot.need.support': '후원 화면이 비어 있습니다',
  'boot.need.tools': '도구 탭이 비어 있습니다',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': '다음 모듈을 불러오지 못했습니다: {list}.',
  'boot.consoleHint': 'index.html의 <script> 순서와 경로를 확인하세요.',
  'boot.incompleteTitle': '앱이 온전히 불러와지지 않았습니다',
  'boot.incompleteText': '{missing} 페이지를 새로 고치세요. 그래도 해결되지 않으면 서버의 파일이 불완전한 것입니다.',
  'boot.newVersion': '앱의 새 버전이 있습니다.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': '임계값이 하는 일. ',
  'thresholds.noteText': '경고 임계값은 노란 상태를, 심각 임계값은 빨간 상태를 켭니다. 변경은 즉시 반영됩니다 — 이미 화면에 떠 있는 측정값에도 적용됩니다. 자신만의 임계값 묶음에 이름을 붙여 저장해 두고 언제든 다시 불러올 수 있습니다.',
  'thresholds.profilesTitle': '임계값 프로필',
  'thresholds.profilesSub': '기본 제공 세 가지와 직접 만든 것',
  'thresholds.customName': '내 프로필 이름',
  'thresholds.customPlaceholder': '예: 저녁 침실',
  'thresholds.save': '현재 임계값 저장',
  'thresholds.saveHelp': '위에 설정된 임계값을 그대로 저장합니다.',

  'profile.builtin.default.name': '기본',
  'profile.builtin.default.desc': '지표 목록에 적힌 임계값 — 모든 측정의 출발점입니다.',
  'profile.builtin.evening.name': '저녁 — 부드럽게',
  'profile.builtin.evening.desc': '차가운 빛 색과 일주기 리듬 영향을 더 일찍 경고합니다.',
  'profile.builtin.work.name': '책상 작업',
  'profile.builtin.work.desc': '밝고 차가운 주광은 허용하고, 깜박임과 균일도를 지켜봅니다.',
  'profile.custom.desc': '{date}에 저장한 내 프로필입니다.',

  'toast.thresholdsReset': '기본 임계값을 복원했습니다.',
  'toast.thresholdOrder': '경고 임계값은 심각 임계값보다 낮아야 합니다.',
  'toast.thresholdOrderInverted': '이 지표에서는 경고 임계값이 심각 임계값보다 높아야 합니다.',
  'toast.profileNameMissing': '프로필 이름을 입력하세요.',
  'toast.profileSaved': '‘{name}’ 프로필을 저장했습니다.',
  'toast.profileApplied': '‘{name}’ 프로필을 적용했습니다.',
  'toast.profileApplyFailed': '이 프로필을 적용하지 못했습니다.',
  'toast.profileRemoved': '프로필을 삭제했습니다.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': '일정이 필요한 이유. ',
  'schedule.noteText': '저녁에는 한낮과 다른 임계값이 알맞습니다. ‘부터–까지’ 규칙이 프로필을 알아서 바꿔 주므로 그것을 기억하지 않아도 됩니다. 일정은 결코 측정을 시작하거나 중지하지 않습니다.',
  'schedule.toggle': '자동 전환 켜기',
  'schedule.toggleSub': '기기 시계를 기준으로 1분마다 확인합니다.',
  'schedule.emptyTitle': '규칙 없음',
  'schedule.emptyText': '아래 버튼으로 첫 규칙을 추가하세요.',
  'schedule.add': '규칙 추가',
  'schedule.to': '까지',
  'schedule.profile': '프로필',
  'schedule.fromAria': '규칙 {n}: 시작 시각',
  'schedule.toAria': '규칙 {n}: 종료 시각',
  'toast.scheduleTimeFormat': '시각을 22:00 형식으로 입력하세요.',
  'toast.scheduleEnded': '일정이 끝났습니다 — 이전 임계값으로 돌아갔습니다.',
  'toast.scheduleApplied': '일정이 ‘{name}’ 프로필을 켰습니다.',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': '경보가 하는 일. ',
  'alerts.noteText': '지표 하나를 지켜보다가, 그 지표가 선택한 구역을 설정한 시간 동안 끊김 없이 유지할 때에만 알립니다. 결코 측정을 멈추지 않고 버튼을 가리지도 않습니다.',
  'alerts.toggle': '노출 경보 켜기',
  'alerts.toggleSub': '측정이 진행되는 동안에만 동작합니다.',
  'alerts.metric': '지켜볼 지표',
  'alerts.level': '어느 구역부터',
  'alerts.level.warning': '경고 구역 이상',
  'alerts.level.critical': '심각 구역만',
  'alerts.sustain': '몇 초 동안 끊김 없이',
  'alerts.sustainHelp': '시간을 짧게 잡으면 휴대폰을 움직일 때 잘못된 경보가 늘어납니다.',
  'alerts.sound': '짧은 신호음',
  'alerts.soundSub': '소리는 기기 안에서 만들어집니다. 더보기 화면에서 전체를 끌 수도 있습니다.',
  'alerts.barTitle': '노출 경보',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny.
     Po koreańsku po wstawce {name} stoi pauza, a nie partykuła — patrz
     nagłówek pliku. */
  'alerts.message.warning': '{name} — {seconds}초 동안 경고 구역을 유지하고 있습니다. 현재 {value} {unit}.',
  'alerts.message.critical': '{name} — {seconds}초 동안 심각 구역을 유지하고 있습니다. 현재 {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': '비교하는 방법. ',
  'compare.noteText': '측정을 시작하고 첫 번째 광원으로 카메라를 향한 뒤 A로 저장하세요. 거리와 각도를 바꾸지 않은 채 빛을 바꾸고 B를 저장하세요. 장면이 같을 때에만 비교가 의미를 가집니다.',
  'compare.slotA': '빛 A',
  'compare.slotB': '빛 B',
  'compare.save': '현재 측정값 저장',
  'compare.savedAt': '{date} {time}에 저장',
  'compare.empty': '아직 저장한 것이 없습니다.',
  'compare.verdictTitle': '비교 결과',
  'compare.verdictEmpty': '어느 쪽이 더 부드러운지 보려면 두 빛을 모두 저장하세요.',
  'compare.notEnough': '이 두 측정을 비교하기에는 데이터가 부족합니다.',
  'compare.tie': '두 광원이 사실상 같게 나옵니다({metric}: {a}, {b} {unit}). 차이는 측정 잡음 안에 있습니다.',
  'compare.betterA': '더 부드러운 쪽은 빛 A입니다 — {metric}: {better} {unit} 대 {worse} {unit}.',
  'compare.betterB': '더 부드러운 쪽은 빛 B입니다 — {metric}: {better} {unit} 대 {worse} {unit}.',
  'compare.clear': '비교 지우기',
  'toast.compareSavedA': '빛 A를 저장했습니다.',
  'toast.compareSavedB': '빛 B를 저장했습니다.',
  'toast.compareCleared': '비교를 지웠습니다.',
  'toast.measureFirst': '먼저 측정 화면에서 측정을 시작하세요.',

  /* Nazwa wielkości w środku zdania. Po polsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. Koreański
     nie zna wielkiej litery, więc te siedem napisów jest co do znaku takie
     samo jak nazwy w warstwie wspólnej. */
  'metric.share.nameLower': '청색광 비율',
  'metric.brightness.nameLower': '장면 밝기',
  'metric.kelvin.nameLower': '색온도',
  'metric.melanopic.nameLower': '일주기 리듬 영향',
  'metric.flicker.nameLower': '깜박임',
  'metric.uniformity.nameLower': '균일도',
  'metric.comfort.nameLower': '눈 편안함',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': '이것이 통하는 이유. ',
  'calib.noteText': '카메라 센서에는 채널 사이의 고정된 치우침이 있습니다. 흰 종이를 측정하면 그 치우침이 얼마나 큰지 드러나고, 그만큼을 덜어 낼 수 있습니다. 이 앱에서 정확도를 실제로 높여 주는 유일한 기능이지만, 그래도 카메라가 분광기가 되지는 않습니다.',
  'calib.step1': '측정할 빛 아래에 흰 종이를 놓으세요',
  'calib.step2': '측정을 시작하고 종이로 프레임을 가득 채우세요',
  'calib.step3': '‘보정’을 누르고 3초 동안 휴대폰을 움직이지 마세요',
  'calib.done': '{date} {time}에 보정했습니다.',
  'calib.none': '보정하지 않았습니다. 측정은 동작하며, 값은 비교용으로 받아들이세요.',
  'calib.gain': '{channel} 배율',
  'calib.gainsLabel': '채널 배율',
  'calib.gainsUnset': '설정되지 않음',
  'calib.start': '보정 (3초)',
  'calib.clear': '보정 삭제',
  'toast.calibCleared': '보정을 삭제했습니다.',
  'calib.error.noEngine': '측정 모듈을 사용할 수 없습니다.',
  'calib.error.notRunning': '먼저 측정을 시작하고 카메라를 흰 종이로 향하세요.',
  'calib.error.busy': '보정이 이미 진행 중입니다.',
  'calib.error.tooFewSamples': '표본이 너무 적습니다. 측정이 정말로 동작하는지 확인하세요.',
  'calib.error.tooDark': '영상이 너무 어두워 보정할 수 없습니다. 종이를 더 밝게 비추고 다시 시도하세요.',
  'calib.error.tooSkewed': '채널의 치우침이 너무 커서 보정으로 받아들일 수 없습니다. 고른 빛 아래에서 흰 종이를 쓰세요.',
  'calib.ok': '보정했습니다. 이제 색온도와 일주기 리듬 영향이 더 정확해집니다.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': '이 기능의 쓰임. ',
  'screencheck.noteText': '다섯 단계가 리뷰에서 하듯 모니터를 점검합니다: 두 가지 밝기에서의 흰색, 백라이트 균일도, 그리고 시스템 야간 모드가 정말로 무언가를 바꾸는지. 마법사는 이미 진행 중인 측정을 읽을 뿐, 스스로 측정을 시작하지는 않습니다.',
  'screencheck.step.white100.title': '최대 밝기의 흰색',
  'screencheck.step.white100.hint': '모니터에 흰 페이지를 열고 밝기를 최대로 올린 뒤 화면으로 프레임을 가득 채우세요.',
  'screencheck.step.white20.title': '낮은 밝기의 흰색',
  'screencheck.step.white20.hint': '모니터 밝기를 5분의 1 정도로 낮추고 프레임은 바꾸지 마세요.',
  'screencheck.step.corners.title': '화면의 모서리',
  'screencheck.step.corners.hint': '밝기를 최대로 되돌리고 화면 전체를 카메라에 보여 주세요 — 백라이트 균일도를 확인합니다.',
  'screencheck.step.nightOff.title': '야간 모드 끔',
  'screencheck.step.nightOff.hint': '청색광 필터가 꺼져 있는지 확인하세요.',
  'screencheck.step.nightOn.title': '야간 모드 켬',
  'screencheck.step.nightOn.hint': '시스템의 청색광 필터를 켜고 같은 프레임으로 다시 측정하세요.',
  'screencheck.stepHeading': '{total}단계 중 {n}단계: {title}',
  'screencheck.idleTitle': '마법사가 실행되고 있지 않습니다',
  'screencheck.idleHint': '측정 화면에서 측정을 시작한 뒤 여기로 돌아와 ‘시작’을 누르세요.',
  'screencheck.next': '단계 저장하고 계속',
  'screencheck.cancel': '중단',
  'screencheck.start': '마법사 시작',
  'screencheck.clearResult': '결과 지우기',
  'screencheck.resultTitle': '결과',
  'screencheck.resultEmpty': '아직 저장한 단계가 없습니다.',
  'screencheck.resultPartial': '{total}단계 가운데 {done}단계를 저장했습니다. 비교할 것이 생기면 결론이 나타납니다.',
  'screencheck.note.uniformityLow': '백라이트 균일도가 {value}%입니다 — 프레임 안에서 밝기 차이가 뚜렷합니다.',
  'screencheck.note.uniformityOk': '백라이트가 고릅니다({value}%).',
  'screencheck.note.nightWorks': '야간 모드가 청색광 비율을 {value} 퍼센트포인트 낮춥니다 — 제대로 동작합니다.',
  'screencheck.note.nightWeak': '야간 모드가 청색광 비율을 {value} 퍼센트포인트밖에 바꾸지 않습니다. 시스템 필터가 보통 내는 효과보다 적습니다.',
  'screencheck.note.pwm': '낮은 밝기에서 깜박임이 {from}%에서 {to}%로 올라갑니다 — 펄스 폭 조광(PWM)의 전형적인 징후입니다.',
  'toast.screencheckDone': '마법사가 끝났습니다. 결과는 아래에 있습니다.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': '이 숫자의 출처. ',
  'reports.noteText': '보고서는 이 기기에 저장된 기록에서 계산합니다 — 5초에 한 지점씩입니다. 엔진은 첫 측정부터 기록을 모으므로 보고서는 곧바로 준비됩니다.',
  'reports.rangeAria': '보고서 범위',
  'reports.day': '최근 24시간',
  'reports.week': '최근 7일',
  'reports.date': '{date} 보고서입니다.',
  'report.headerDay': '{from}부터 {to}까지의 하루 — {count}.',
  'report.headerWeek': '{from}부터 {to}까지의 한 주 — {count}.',
  'count.points': { other: '지점 {n}개' },
  'count.samples': { other: '표본 {n}개' },
  'report.emptyTitle': '이 기간에는 데이터가 없습니다',
  'report.emptyText': '측정 화면에서 측정을 시작하세요 — 기록은 저절로 저장됩니다.',
  'report.colAvg': '평균',
  'report.colMin': '최소',
  'report.colMax': '최대',
  'report.zonesTitle': '구역 분포',
  'report.worstHour': '하루 중 가장 나쁜 때',
  'report.worstHourNone': '뚜렷한 때 없음',
  'report.hour': '{hour}:00',
  'report.adviceTitle': '무엇을 하면 좋은가',
  'report.disclaimerTitle': '이것은 건강 조언이 아닙니다. ',
  'report.disclaimerText': '결론은 오직 이 휴대폰의 카메라가 본 것에서만 나옵니다. 앱은 스펙트럼을 측정하지 않고, 럭스를 알지 못하며, 어떤 진단도 내리지 않습니다.',

  'advice.melanopic': '평균 일주기 리듬 영향은 {value}×였습니다. 저녁에는 0.50 아래로 내려가는 편이 좋으며, 더 따뜻한 전구나 야간 모드가 가장 손쉬운 방법입니다.',
  'advice.kelvin': '빛이 차가웠습니다(평균 {value} K). 작업에는 나무랄 데 없지만, 잠들기 두 시간 전에는 3000 K 아래가 낫습니다.',
  'advice.flicker': '눈에 띄는 깜박임이 감지되었습니다(평균 {value}%). 보통은 값싼 조광기나 백라이트 전원이 원인입니다.',
  'advice.uniformity': '빛이 고르지 않게 퍼집니다({value}%). 조명을 옮기거나 각도를 바꾸는 편이 전구를 바꾸는 것보다 대개 낫습니다.',
  'advice.worstHour': '하루 중 가장 나쁜 때는 {hour}:00입니다 — 정상 범위를 벗어난 측정값이 그 시각에 가장 많이 모입니다.',
  'advice.none': '이 기간에는 정상 범위를 벗어나는 것이 없습니다. 지금은 A/B 비교에서 두 광원을 비교해 보는 것이 가장 도움이 됩니다.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': '파일 형식. ',
  'export.noteText': '열 구분자는 세미콜론, 소수점 구분자는 쉼표, 인코딩은 BOM이 붙은 UTF-8입니다. 쉼표를 소수점으로 쓰는 지역 설정의 Excel은 이런 파일을 아무것도 설정하지 않고 엽니다.',
  'export.range': '데이터 범위',
  'export.columns': '파일의 열',
  'export.chipFilled': ' — 채워진 열',
  'export.help': '파일에는 일곱 개 열이 모두 들어갑니다 — 엔진이 첫 측정부터 계산하며 전부 파일에 담깁니다.',
  'export.run': 'CSV 파일 저장',
  'export.previewEmpty': '이 범위에는 측정값이 없습니다. 측정을 시작하세요 — 기록은 저절로 저장됩니다.',
  'csv.range.hour': '최근 1시간',
  'csv.range.day': '최근 24시간',
  'csv.range.week': '최근 7일',
  'csv.range.month': '최근 30일',
  'csv.colDate': '날짜',
  'csv.colTime': '시각',
  'csv.colZone': '구역',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': '선택한 범위에는 측정값이 전혀 없습니다.',
  'toast.exportFailed': '이 브라우저가 파일 저장을 허용하지 않았습니다.',
  'toast.exportSaved': {
    other: '{filename} 파일을 저장했습니다({n}줄).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h}시간 {m}분',
  'duration.ms': '{m}분 {s}초',
  'duration.s': '{s}초'
});
