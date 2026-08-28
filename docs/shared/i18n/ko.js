/* docs/shared/i18n/ko.js — słownik WSPÓLNY, koreański.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest koreański.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — pilnuje tego
 * docs/shared/i18n/keys.test.js. Klucza, którego nie ma w angielskim, nie
 * wolno tu dopisać: angielski jest wartością zapasową, więc to on wyznacza
 * zestaw (patrz docs/shared/README.md, rozdział „Warstwa językowa”).
 *
 * TERMINOLOGIA — jeden odpowiednik na pojęcie w całym pliku:
 *   udział niebieskiego       청색광 비율
 *   jasność sceny             장면 밝기
 *   temperatura barwowa       색온도
 *   wpływ na rytm dobowy      일주기 리듬 영향   (zegar biologiczny → 생체시계)
 *   współczynnik melanopiczny 멜라노픽 비율
 *   migotanie                 깜박임             (pulsowanie → 맥동)
 *   równomierność             균일도             (kadr → 프레임)
 *   komfort wzrokowy          눈 편안함
 *
 * LICZEBNIKI: koreański ma w CLDR jedną kategorię — samo `other`. Nie ma tu
 * czego odmieniać, ale wartość musi zostać obiektem form, bo Intl.PluralRules
 * ('ko') sięgnie w czasie działania aplikacji po klucz 'other'.
 *
 * REJESTR: zdania w formie grzecznościowej 합니다체, bez wykrzykników.
 * Zastrzeżenie medyczne (legal.mdr) i zdania o prywatności przetłumaczono
 * wiernie, zdanie w zdanie — to oświadczenia o skutkach prawnych, nie
 * copywriting.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ko'] = Object.assign(window.I18nData['ko'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka {app} w zdanie o rozporządzeniu
     (UE) 2017/745. Kończy się sylabą otwartą (터), więc partykuła stojąca
     tam po wstawce brzmi „는”. */
  'app.name': '빛 모니터',

  /* ---- wybór języka ---- */

  'language.label': '언어',
  'language.help': '앱 전체에 쓰이는 언어입니다. 모든 언어가 이미 이 기기 안에 있으므로 내려받는 것도, 어디로 보내는 것도 없습니다.',
  'language.auto': '기기 설정에 따름',
  'language.autoHint': '휴대폰이나 브라우저에 설정된 언어를 따릅니다.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': '청색광 비율',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': '퍼센트',
  'metric.share.short': '보이는 빛 가운데 청색 채널이 차지하는 몫입니다.',
  'metric.share.help': '밝기와 색을 따로 떼어 봅니다 — 야간 모드를 켜면 움직이는 값이 바로 이것입니다.',

  'metric.brightness.name': '장면 밝기',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': '퍼센트',
  'metric.brightness.short': '카메라 영상의 평균 밝기입니다.',
  'metric.brightness.help': '럭스가 아니라 상대적인 값입니다 — 그 아래에서 카메라의 자동 노출이 값을 움직입니다.',

  'metric.kelvin.name': '색온도',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': '켈빈',
  'metric.kelvin.short': '빛이 따뜻한지 차가운지 알려 줍니다.',
  'metric.kelvin.help': '3000 K 아래의 빛은 따뜻해서 저녁에 더 부드럽습니다. 6500 K는 대부분 화면의 기본 흰색입니다.',

  'metric.melanopic.name': '일주기 리듬 영향',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': '배',
  'metric.melanopic.short': '이 빛이 생체시계에 얼마나 강하게 작용하는지 나타냅니다.',
  'metric.melanopic.help': '멜라노픽 비율의 근삿값입니다. 1.00은 중성 주광색 흰색이고, 저녁에는 0.50 아래로 내려가는 편이 좋습니다.',

  'metric.flicker.name': '깜박임',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': '퍼센트',
  'metric.flicker.short': '눈에 보이지 않는 광원의 맥동입니다.',
  'metric.flicker.help': '값싼 조광기와 백라이트는 맥동합니다. 눈에는 보이지 않지만 피로와 두통의 원인이 되기도 합니다.',

  'metric.uniformity.name': '균일도',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': '퍼센트',
  'metric.uniformity.short': '빛이 프레임 안에 고르게 퍼져 있는지 봅니다.',
  'metric.uniformity.help': '화면에서 값이 낮으면 백라이트가 새어 나오거나 무언가 비친다는 뜻이고, 책상에서는 조명을 잘못 놓았다는 뜻입니다.',

  'metric.comfort.name': '눈 편안함',
  'metric.comfort.unit': '점',
  'metric.comfort.unitSpoken': '점',
  'metric.comfort.short': '여섯 개의 숫자 대신 하나의 평가입니다.',
  'metric.comfort.help': '나머지 측정값을 0–100점으로 묶고, 무엇이 점수를 가장 많이 깎는지 보여 줍니다. 가중치는 규격이 아니라 저희의 편집상 판단입니다.',

  'comfort.penalty.melanopic': '일주기 리듬 영향',
  'comfort.penalty.kelvin': '차가운 빛 색',
  'comfort.penalty.flicker': '깜박임',
  'comfort.penalty.uniformity': '고르지 않은 조명',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': '카메라를 켜려면 ‘시작’을 누르세요.',
  'engine.starting': '카메라를 켜는 중…',

  'engine.error.permission': '카메라 사용 권한이 없습니다. 브라우저 설정에서 카메라를 허용한 뒤 ‘시작’을 다시 누르세요.',
  'engine.error.notFound': '카메라를 찾을 수 없습니다. 기기에 카메라가 있는지, 시스템에서 꺼져 있지는 않은지 확인하세요.',
  'engine.error.busy': '다른 앱이 카메라를 사용하고 있습니다. 그 앱을 닫고 다시 시도하세요.',
  'engine.error.unknown': '카메라를 켜지 못했습니다.',
  'engine.error.unsupported': '이 브라우저는 이 페이지에 카메라를 열어 주지 않습니다. 앱을 HTTPS로 열거나 다른 브라우저를 사용하세요.',

  /* ---- strefy ---- */

  'zone.good': '정상 범위',
  'zone.warning': '주의',
  'zone.critical': '심각',
  'zone.none': '데이터 없음',
  'zone.settling': '안정화 중',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania, więc bez kropki.
     Koreański nie zna wielkiej litery, więc brzmi tak samo jak napis na
     plakietce. */
  'zone.spoken.good': '정상 범위',
  'zone.spoken.warning': '주의',
  'zone.spoken.critical': '심각',
  'zone.spoken.none': '데이터 없음',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': '점',
  'unit.hertz': 'Hz',
  'unit.second': '초',
  'unit.minute': '분',
  'unit.hour': '시간',

  /* ---- zdania oceniające ---- */

  'verdict.good': '이 빛은 괜찮습니다 — 설정한 기준값을 넘는 항목이 없습니다.',
  'verdict.noValue': '이 값은 지금 측정할 수 없습니다. 렌즈가 가려져 있지 않은지 확인하세요.',
  'verdict.warmup': '평가를 정하는 중입니다 — 휴대폰을 잠시만 더 가만히 들고 계세요.',

  'verdict.warning.share': '이 빛 가운데 상당 부분이 청색 채널에 실려 있습니다. 저녁에는 조금 어둡게 하는 편이 좋습니다.',
  'verdict.warning.brightness': '장면이 밝습니다 — 카메라가 측정 범위의 위쪽 끝에 가깝게 작동하고 있습니다.',
  'verdict.warning.kelvin': '빛이 꽤 차갑습니다. 저녁에는 2700 K 안팎의 전구가 더 부드럽습니다.',
  'verdict.warning.melanopic': '이 빛은 생체시계에 꽤 강하게 작용합니다.',
  'verdict.warning.flicker': '광원이 눈에 띄게 맥동합니다.',
  'verdict.warning.uniformity': '빛이 프레임 안에 고르지 않게 퍼져 있습니다.',
  'verdict.warning.comfort': '눈 편안함이 떨어져 있습니다 — 여러 가지가 한꺼번에 겹쳤습니다.',

  'verdict.critical.share': '청색광이 매우 많습니다. 저녁에는 야간 모드를 켜거나 광원을 바꾸세요.',
  'verdict.critical.brightness': '장면이 매우 밝습니다. 광원을 정면으로 바라보며 측정하지 마세요.',
  'verdict.critical.kelvin': '빛이 차갑습니다. 저녁에 눈을 가장 피로하게 하는 빛입니다 — 더 따뜻한 전구나 야간 모드가 도움이 됩니다.',
  'verdict.critical.melanopic': '이 빛은 생체시계에 강하게 작용합니다. 저녁에는 0.50 아래로 내려가는 편이 좋습니다.',
  'verdict.critical.flicker': '광원이 심하게 맥동합니다. 눈의 피로와 두통의 원인이 되기도 합니다.',
  'verdict.critical.uniformity': '빛이 매우 고르지 않게 퍼져 있습니다. 조명의 위치나 화면에 비치는 반사를 확인하세요.',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': '눈 편안함이 낮습니다. 무엇이 점수를 깎는지 보려면 점수 구성을 살펴보세요.',

  /* ---- granice metody ---- */

  'note.limitsTitle': '이 숫자가 말해 주지 않는 것',
  'note.warningTitle': '주의',
  'note.dashTitle': '이 측정이 아닌 것',
  'note.dashText': '휴대폰 카메라에는 넓은 색 채널 세 개와 자동 화이트 밸런스가 있을 뿐, 스펙트럼을 측정하지는 않습니다. 색온도와 일주기 리듬 영향은 sRGB 색에서 계산한 근삿값입니다. 이 앱은 차이와 시간에 따른 변화를 잘 보여 주지만, 측정기를 대신하지 않으며 어떤 진단도 내리지 않습니다.',
  'note.approxLegend': '≈ 근삿값 — 스펙트럼 측정이 아니라 sRGB 색에서 계산한 값입니다.',
  'note.kelvinOutOfRange': '방법의 범위를 벗어났습니다 — 이 색에서는 색온도 공식을 더 이상 믿을 수 없습니다.',
  /* {rate} i {limit} podaje wywołanie, bo to liczby z silnika (5 Hz, 2,5 Hz),
     a ich zapis jest różny w różnych językach — po koreańsku 2.5, z kropką. */
  'note.flickerOutOfRange': '방법의 범위를 벗어났습니다 — {rate} Hz 표본추출은 {limit} Hz 아래의 맥동만 봅니다. 전원의 100 Hz는 닿지 않는 범위이며, 앱은 이를 결코 결과로 내놓지 않습니다.',
  'note.helpTitle': '이 숫자가 말해 주지 않는 것',
  'note.helpText': '휴대폰 카메라에는 넓은 채널 세 개가 있을 뿐, 스펙트럼을 측정하지 않습니다. 이 값은 비교를 위한 지표입니다 — 빛 사이의 차이와 시간에 따른 변화는 잘 보여 주지만, 실험실 측정 결과도 아니고 의학 정보도 아닙니다.',
  'note.calibration': '보정 없이 이루어진 측정입니다 — 값은 비교용으로 받아들이세요.',

  'note.howToTitle': '제대로 측정하는 방법',
  'note.howTo.hold.title': '휴대폰을 가만히 드세요',
  'note.howTo.hold.text': '자동 노출이 안정되려면 2–3초가 필요합니다.',
  'note.howTo.aim.title': '빛이 닿는 면을 향하세요',
  'note.howTo.aim.text': '흰 종이나 밝은 벽이면 됩니다. 광원을 정면으로 바라보며 측정하지 마세요.',
  'note.howTo.compare.title': '절대적으로 판단하지 말고 비교하세요',
  'note.howTo.compare.text': '조명을 바꾸기 전과 후의 같은 장면이 숫자 하나보다 더 많은 것을 말해 줍니다.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Skracanie go w tłumaczeniu nie jest kwestią stylu. */

  'legal.noDiagnosis': '어떤 측정값도 진단이나 건강 조언이 아닙니다.',
  'legal.mdr': '{app}는 (EU) 2017/745 규정에서 말하는 의료기기가 아니며, 어떠한 질병 상태를 진단, 예방, 모니터링 또는 치료하기 위한 것이 아니고, 의사나 검안사의 진찰을 대신하지 않습니다.',

  /* ---- prywatność ---- */

  'privacy.title': '이 기기를 떠나는 것',
  'privacy.short': '이 앱의 어느 부분도 네트워크로 아무것도 보내지 않습니다. 모든 숫자는 이 기기에서 만들어지고 이곳에 남습니다.',
  'privacy.onDevice': '카메라는 버튼을 누른 뒤에야 켜지며, 영상은 이 기기를 결코 떠나지 않습니다.',
  'privacy.external': '앱 전체에서 무언가가 이 기기를 떠나는 곳은 여기뿐입니다: 버튼이 새 탭에서 외부 페이지를 열며, 그 일은 버튼을 누른 뒤에야 일어납니다. 측정값과 기록, 설정은 이곳에 남습니다.',
  'privacy.externalPending': '주소가 마련되면 버튼이 새 탭에서 외부 페이지를 엽니다. 무언가가 이 기기를 떠나는 유일한 순간이 될 것입니다. 측정값과 기록, 설정은 이곳에 남습니다.',
  'privacy.storageBlocked': '이 브라우저는 아무것도 저장하지 못하게 합니다(비공개 모드이거나 사이트 데이터가 차단됨). 측정은 되지만 기록은 탭을 닫으면 사라집니다.',

  /* ---- liczebniki ----
     Koreański ma w CLDR jedną kategorię: other. Rzeczownik nie zmienia formy,
     a liczba stoi przy klasyfikatorze (개, 회), więc wstawka {n} wędruje
     w tych dwóch zdaniach na koniec. */

  'count.readings': { other: '측정값 {n}개' },
  'count.sessions': { other: '측정 {n}회' },
  'count.seconds': { other: '{n}초' },
  'count.minutes': { other: '{n}분' },
  'count.hours': { other: '{n}시간' },
  'count.days': { other: '{n}일' }
});
