/* docs/v1/i18n/ko.js — słownik WŁASNY wersji v1, koreański.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka. Kolejność jest treścią umowy: plik wersji dokłada się do tego samego
 * obiektu i może nadpisać dowolny klucz wspólny — nigdy odwrotnie.
 *
 * DLACZEGO TEN SŁOWNIK JEST SAMOWYSTARCZALNY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar w app.js, własne
 * dwie wielkości zamiast siedmiu i własne nazwy stref („안전” zamiast
 * wspólnego „정상 범위”). Dlatego wszystko, co v1 pokazuje, stoi TUTAJ — także
 * klucze, które przypadkiem brzmią tak samo jak wspólne. Zestaw kluczy jest
 * dokładnie taki sam jak w pl.js tego katalogu — pilnuje tego
 * docs/shared/i18n/keys.test.js.
 *
 * TERMINOLOGIA — jeden odpowiednik na pojęcie, wzięty ze słownika wspólnego
 * docs/shared/i18n/ko.js i z docs/v5/js/i18n/locales/ko.js, żeby ta sama rzecz
 * nie nazywała się w v1 inaczej niż w pozostałych wersjach:
 *   udział niebieskiego   청색광 비율
 *   jasność sceny         장면 밝기
 *   temperatura barwowa   색온도
 *   próg                  임계값
 *   strefa                구역
 *   odczyt / pomiar       측정값 / 측정
 * Wielkości spoza v1 (migotanie, równomierność, komfort) nie mają tu kluczy
 * i nie wolno ich dopisywać. Strefy idą za v5 — 안전 / 중간 / 유해 — bo to ta
 * wersja przełożyła na koreański dokładnie te trzy słowa: safe / moderate /
 * harmful, mówiące o świetle, a nie o stanie aplikacji.
 *
 * REJESTR: uprzejmy 합니다체, bez wykrzykników i bez wyższych stopni 높임말.
 * Przyciski i etykiety kafelków są rzeczownikami (시작 / 중지 / 기록), teksty
 * pomocy — pełnymi zdaniami. Znakiem dziesiętnym jest kropka.
 *
 * PARTYKUŁY: koreańska partykuła zależy od tego, czy słowo przed nią kończy
 * się spółgłoską. Formy liczebnika dobrano tak, by wstawka wchodziła w zdanie
 * bez wahania ('count.readings' kończy się na 개, więc po nim stoi 를). Tam,
 * gdzie treścią wstawki jest cudza nazwa dnia albo tygodnia, zostaje bezpieczne
 * 과(와) — tak samo jak (으)로 w słowniku v5.
 *
 * LICZEBNIKI: koreański ma w CLDR jedną kategorię — samo `other`. Nie ma tu
 * czego odmieniać, ale wartość musi zostać obiektem form, bo Intl.PluralRules
 * ('ko') sięgnie w czasie działania aplikacji po klucz 'other'.
 *
 * MARKUP W WARTOŚCIACH. Część kluczy (rozdziały Dokumentacji) zawiera znaczniki
 * <b>, <i>, <code> i encje HTML. Wstawiane są przez data-i18n-html, czyli tylko
 * tam, gdzie autor tekstu świadomie tego chciał — nigdy do treści pochodzącej
 * od użytkownika.
 *
 * Zastrzeżenia medyczne (disclaimer.*) i akapity o prywatności przełożono
 * wiernie, zdanie w zdanie — to oświadczenia o skutkach prawnych, nie
 * copywriting: nie osłabiono ich i nie dodano obietnic.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ko'] = Object.assign(window.I18nData['ko'] || {}, {

  /* ---- aplikacja ---- */

  'app.name': '유해광 모니터',
  'app.description': '카메라로 화면의 청색광 세기를 측정해, 안전·중간·유해 구역이 표시된 알아보기 쉬운 그래프로 보여 줍니다.',

  /* ---- wybór języka ---- */

  'language.label': '언어',
  'language.help': '앱 전체에 쓰이는 언어입니다. 모든 언어가 이미 이 기기 안에 있으므로 내려받는 것도, 어디로 보내는 것도 없습니다.',
  'language.auto': '기기 설정에 따름',

  /* ---- nawigacja ---- */

  'nav.aria': '기본 메뉴',
  'nav.tabsAria': '앱 화면',
  'nav.announce': '화면: {screen}',
  'nav.camera': '카메라',
  'nav.monitoring': '모니터링',
  'nav.support': '후원',
  'nav.more': '더 보기',
  'nav.docs': '문서',
  'nav.about': '앱 정보 및 연락처',
  'nav.settings': '경고 임계값',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← 뒤로',
  'action.back.aria': '이전 화면으로 돌아갑니다',
  'action.openDocs': '문서로 이동',
  'action.exportCsv': 'CSV 내보내기',
  'action.delete': '삭제',
  'action.closeNotification': '알림 닫기',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref — „안전 / 중간 / 유해”, a nie wspólne
     „정상 범위 / 주의 / 심각”. Wersja plakatowa (zone.badge.*) jest osobnym
     kluczem, a nie zapisem wielkimi literami przez CSS; koreański nie zna
     wielkiej litery, więc brzmi tak samo jak napis zwykły. */

  'zone.good': '안전',
  'zone.warning': '중간',
  'zone.critical': '유해',
  'zone.none': '데이터 없음',

  'zone.badge.good': '안전',
  'zone.badge.warning': '중간',
  'zone.badge.critical': '유해',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'B 채널 밝기',
  'metric.raw.unitLabel': 'B 채널 밝기 %',
  'metric.share.name': '청색광 비율',
  'metric.share.longName': '빛의 청색광 비율',
  'metric.share.unitLabel': '청색광 비율 %',
  'stat.overallBrightness': '전체 장면 밝기',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': '카메라 미리보기',
  'camera.pressStart': '“시작”을 누르세요.',
  'camera.start': '시작',
  'camera.stop': '중지',
  'camera.switch': '카메라 전환',
  'camera.error': '카메라를 시작하지 못했습니다. 브라우저의 카메라 권한을 확인한 뒤 다시 시도하세요. ({message})',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': '현재 측정값',
  'disclaimer.short': '대략적인 결과입니다. 이것은 의료기기가 아닙니다.',
  'disclaimer.more': '더 보기',

  /* ---- wykresy ---- */

  'chart.aria': '시간에 따른 그래프',
  'chart.title': '시간에 따른 그래프 (최근 {seconds}초)',
  'chart.empty': '그래프를 보려면 카메라를 시작하세요',
  'chart.axis.past': '-{seconds}초',
  'chart.axis.now': '지금',
  'chart.raw.aria': 'B 채널 밝기의 시간 변화 그래프, 안전·중간·유해 구역이 표시되어 있습니다',
  'chart.share.aria': '빛의 청색광 비율의 시간 변화 그래프, 안전·중간·유해 구역이 표시되어 있습니다',

  /* ---- tabela odczytów ---- */

  'table.show': '표로 보기',
  'table.hide': '표 숨기기',
  'table.caption': '최근 측정값 (최신순)',
  'table.col.time': '시각',
  'table.col.zone': '구역',

  /* ---- ustawienia progów ---- */

  'settings.title': '구역 임계값 설정',
  'settings.boundary.critical': '노랑 / 빨강 경계:',
  'settings.boundary.warning': '초록 / 노랑 경계:',

  /* ---- historia i raport (features.js) ---- */

  'history.title': '기록과 보고서',
  'history.rangeAria': '기록 범위',
  'history.unavailable': '기록 데이터를 지금은 사용할 수 없습니다.',
  'history.empty': '이 범위에 저장된 측정값이 없습니다. 측정을 시작하세요 — 기록은 저절로 쌓입니다.',
  'history.savedReadings': '저장된 측정값: {count}. 구역별 시간 배분:',
  'history.zoneLine': '{zone}: {percent}% ({readings})',

  'range.1h': '1시간',
  'range.24h': '24시간',
  'range.7d': '7일',
  'range.30d': '30일',

  'report.dailyTitle': '일간 보고서',
  'report.empty': '선택한 범위에 저장된 측정값이 있으면 보고서가 나타납니다.',
  'report.dailyCaption': '날짜별 구역 시간 비율',
  'report.col.day': '날짜',
  'report.col.week': '주',
  'report.col.readings': '측정값',
  'report.compare.day': '전일 대비 비교: {day} — 유해 구역에서 보낸 시간 {percent}%, {change}',
  'report.compare.dayPending': '전일 대비 비교는 이틀째 측정이 쌓이면 나타납니다.',
  'report.compare.week': '전주 대비 비교: {week} — 유해 구역에서 보낸 시간 {percent}%, {change}',
  'report.compare.weekPending': '전주 대비 비교는 두 번째 주 측정이 쌓이면 나타납니다.',
  'report.change.same': '{other}과(와) 같습니다.',
  'report.change.more': '{other}보다 {points} 많습니다.',
  'report.change.less': '{other}보다 {points} 적습니다.',
  'report.peak': '유해 구역 측정값이 가장 많았던 시간대는 {from}부터 {to} 사이입니다.',
  'report.peak.none': '이 범위에는 유해 구역에 저장된 측정값이 없습니다.',
  'report.weeklyTitle': '주간 보고서',
  'report.weeklyEmpty': '선택한 범위에 저장된 측정값이 있으면 주간 보고서가 나타납니다.',
  'report.weeklyCaption': '주별 구역 시간 비율',
  'report.weekLabel': '{year}년 {week}주차',
  'report.footnote': '이 수치는 선택한 범위에 저장된 측정값의 비율이며, 정확한 노출 시간이 아닙니다.',

  /* ---- profile progów ---- */

  'profiles.title': '임계값 프로필',
  'profiles.empty': '아직 저장한 프로필이 없습니다.',
  'profiles.itemActive': '{name} (사용 중)',
  'profiles.applyAria': '{name} 프로필 적용',
  'profiles.deleteAria': '{name} 프로필 삭제',
  'profiles.applied': '“{name}” 프로필을 적용했습니다.',
  'profiles.deleted': '“{name}” 프로필을 삭제했습니다.',
  'profiles.saved': '“{name}” 프로필을 저장했습니다.',
  'profiles.namePlaceholder': '프로필 이름 (예: 저녁)',
  'profiles.saveLabel': '현재 임계값을 프로필로 저장',
  'profiles.saveBtn': '프로필 저장',
  'profiles.needName': '프로필 이름을 입력하세요.',
  'profiles.limit': {
    other: '프로필은 최대 {n}개까지 저장할 수 있습니다. 하나를 삭제하면 새로 추가할 수 있습니다.'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku zostaje
     w ASCII: musi być bezpieczna dla systemu plików i dla adresu pobrania. */

  'csv.header': '시각;B채널_퍼센트;청색광비율_퍼센트;장면밝기_퍼센트;구역',
  'csv.filename': 'light-monitoring-{stamp}.csv',
  'csv.empty': '내보낼 측정값이 없습니다. 측정을 시작한 뒤 다시 시도하세요.',
  'csv.done': 'CSV 파일로 {readings}를 내보냈습니다.',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut: koreański stawia przy liczbie
     klasyfikator (분), a zdanie mówi „od {n} minuty” przyrostkiem 째 — całość
     musi zostać w jednym napisie, żeby dało się ją napisać naturalnie. */

  'alert.exposure': {
    other: '임계값 경고: {n}분째 측정값이 유해 구역에 있습니다. 잠시 쉬거나 화면의 청색광 비율을 낮추는 것을 고려하세요.'
  },

  'session.title': '마지막 세션 요약',
  'session.line': '측정 시간: {duration}. 저장된 측정값: {count}.',
  'session.zoneLine': '{zone}: 세션 시간의 {percent}%.',
  'session.endedAt': '{time}에 끝난 세션에 대한 요약입니다.',
  'session.toast': '세션 종료: {duration}, {readings}, 유해 구역에서 보낸 시간 {percent}%.',

  'duration.seconds': '{n}초',
  'duration.minutesSeconds': '{minutes}분 {seconds}초',

  /* ---- liczebniki ----
     Koreański ma w CLDR jedną kategorię: other. Rzeczownik nie zmienia formy,
     a liczba stoi przy klasyfikatorze (개), więc wstawka {n} wędruje w tych
     zdaniach do środka. Formę wybiera Intl.PluralRules('ko'), nie nasza
     reguła — w innych językach kategorii jest więcej i właśnie dlatego pisze
     się formy, a nie regułę odmiany. */

  'count.readings': { other: '측정값 {n}개' },
  'count.points': {
    other: '{n}퍼센트포인트'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': '더 보기',
  'more.section.settings': '설정',
  'more.section.help': '도움말',
  'more.thresholds.title': '경고 임계값',
  'more.thresholds.sub': '안전·중간·유해 구역의 경계를 설정합니다.',
  'more.docs.title': '문서',
  'more.docs.sub': '측정 방식, 단위, 규격과 구역.',
  'more.about.title': '앱 정보 및 연락처',
  'more.about.sub': '버전, 개인정보, 연락처.',
  'more.free': '이 앱은 전부 무료입니다.',
  'more.supportLink': '원하시면 자발적으로 후원할 수 있습니다.',
  'more.version': '버전 {version} · 계정 없이, 요금 없이 모든 기능 사용 가능',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': '앱 정보 및 연락처',
  'about.version': '버전 {version}',
  'about.what.title': '이 앱은 무엇인가',
  'about.what.p1': '{app}는 휴대폰 카메라로 센서가 기록하는 청색광의 양을 측정해, 두 개의 계기판과 구역이 표시된 그래프로 보여 줍니다. 측정, 기록, 보고서, 임계값 프로필, 임계값 경고, CSV 내보내기와 문서까지 모든 기능을 누구나 계정 없이, 요금 없이 사용할 수 있습니다.',
  'about.what.p2': '이 앱은 정보 제공 목적으로 “있는 그대로” 제공됩니다. 측정 결과는 대략적인 값이며 건강에 관한 결정의 근거가 되지 않습니다.',
  'about.privacy.title': '개인정보와 데이터',
  'about.privacy.p1': '카메라 영상은 오직 사용자의 기기에서만 분석되며 어떤 서버로도 전송되지 않습니다. 저희는 계정을 만들지 않고 사용자의 데이터를 수집하지 않습니다. 임계값 설정, 프로필, 측정 기록은 이 기기와 이 브라우저의 저장 공간에만 저장됩니다.',
  'about.privacy.p2': '이 앱은 광고를 표시하지 않으며 네트워크와 통신하지 않습니다. 유일한 예외는 “후원” 화면의 버튼입니다. 버튼을 누르면 브라우저가 새 탭에서 외부 페이지를 엽니다. 직접 누르기 전에는 아무 일도 일어나지 않습니다.',
  'about.contact.title': '연락처',
  'about.contact.p1': '의견, 오류, 제안: [E-MAIL]. 가능한 한 답장드립니다 — 일과가 끝난 뒤의 시간에 유지하는 프로젝트입니다.',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': '후원',
  'support.free.title': '모든 것이 열려 있습니다',
  'support.free.text': '앱 전체가 무료입니다: 측정, 기록과 보고서, 임계값 프로필, 경고, CSV 내보내기와 문서. 모두 계정 없이, 제한 없이, 인터넷 연결 없이 바로 동작합니다.',
  'support.why': '{app}는 일과가 끝난 뒤의 시간에 만들고 있습니다. 쓸모가 있다면 커피 한 잔 사 주셔도 됩니다. 그 도움으로 앱을 유지하고 더 발전시킵니다 — 측정을 개선하고, 문서를 더 쓰고, 새로운 휴대폰에서 확인합니다.',
  'support.nothing': '후원은 아무것도 열어 주지 않습니다. 더 나은 버전도, 더 못한 버전도 없습니다 — 후원한 뒤에도 앱은 똑같이 동작합니다. 달라지는 것은 누군가에게 쓸모가 있었다는 사실을 만든 사람이 알게 된다는 것뿐입니다.',
  'support.button': '커피 한 잔 사주기',
  'support.button.aria': '커피 한 잔 사주기 — 새 탭에서 후원 페이지를 엽니다',
  'support.pending': '후원 페이지는 아직 연결되지 않았습니다. 준비되는 대로 이 자리에 버튼이 생깁니다. 그때까지 하실 일은 없습니다 — 어차피 앱은 전부 무료입니다.',
  'support.privacy': '이 버튼은 새 브라우저 탭에서 외부 페이지(Buy Me a Coffee)를 엽니다. 이 기기에서 무언가가 나가는 유일한 순간입니다. 카메라 영상과 사용자의 모든 측정값은 이곳에 남습니다 — 누르기 전에도, 누른 뒤에도 어디로도 전송되지 않습니다.',
  'support.privacyPending': '주소가 준비되면 버튼을 눌렀을 때 새 브라우저 탭에서 외부 페이지(Buy Me a Coffee)가 열립니다. 그것이 이 기기에서 무언가가 나가는 유일한 순간이 될 것입니다. 카메라 영상과 사용자의 모든 측정값은 이곳에 남습니다 — 어디로도 전송되지 않습니다.',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem .html, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': '문서',

  'disclaimer.title': '이것은 의료기기가 아닙니다',
  'disclaimer.body.docs': '이 앱은 의료기기가 아닙니다. 어떠한 질병도 진단, 치료 또는 예방하기 위한 것이 아닙니다. 휴대폰 카메라로 측정한 결과는 대략적인 값이며 진찰이나 의사의 조언을 대신하지 않습니다. 눈 건강에 관한 문제는 의사나 검안사와 상담하세요. 이 앱의 구역 임계값은 어떠한 안전 규격도 재현하지 않습니다 — 자세한 내용은 3장에 있습니다.',
  'disclaimer.body.about': '이 앱은 의료기기가 아닙니다. 어떠한 질병도 진단, 치료 또는 예방하기 위한 것이 아닙니다. 휴대폰 카메라로 측정한 결과는 대략적인 값이며 진찰이나 의사의 조언을 대신하지 않습니다. 눈 건강에 관한 문제는 의사나 검안사와 상담하세요. 이 앱의 구역 임계값은 어떠한 안전 규격도 재현하지 않습니다 — 자세한 내용은 문서 3장에 있습니다.',

  'doc.toc.aria': '문서 목차',
  'doc.toc.title': '목차',

  'doc.ch1.title': '빠른 시작',
  'doc.ch2.title': '측정 방식',
  'doc.ch3.title': '단위와 규격',
  'doc.ch4.title': '구역과 임계값',
  'doc.ch5.title': '기기별 차이',

  'doc.ch1.heading': '1. 빠른 시작',
  'doc.ch2.heading': '2. 측정 방식',
  'doc.ch3.heading': '3. 단위와 규격',
  'doc.ch4.heading': '4. 구역과 임계값',
  'doc.ch5.heading': '5. 기기별 차이',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': '더 정확하게 측정하는 방법',
  'doc.ch1.tips.li1': '“카메라” 화면(하단 바의 첫 번째 버튼)에서 “시작”을 누르고, 확인하려는 화면이나 광원에 후면 카메라를 향하게 하세요.',
  'doc.ch1.tips.li2': '“모니터링” 화면(하단 바의 두 번째 버튼)으로 이동하세요 — 위쪽에 두 계기판이 함께 보이고, 그 아래(스크롤)에 시간에 따른 변화 그래프가 있습니다. 어느 화면을 보고 있든 측정은 백그라운드에서 계속됩니다.',
  'doc.ch1.tips.li3': '휴대폰을 화면에서 일정한 거리(예: 15–20 cm)에 두고, 측정하는 동안 주변 조명을 바꾸지 마세요.',
  'doc.ch1.tips.li4': '후면 카메라를 사용하세요 — 전면 카메라보다 자동 보정이 덜 공격적입니다.',
  'doc.ch1.tips.li5': '결과는 절대적인 물리 단위가 아니라 상대적인 지표(%)로 받아들이고 서로 비교하세요(예: 야간 모드 켬/끔).',
  'doc.ch1.tips.li6': '설정에서 구역 임계값을 자기 화면의 밝기에 맞게 조정하세요(4장).',

  'doc.ch1.fonts.title': '큰 글자와 계기판 — 언제나',
  'doc.ch1.fonts.p1': '앱 전체가 크고 읽기 쉬운 글자와 실물 크기의 계기판을 사용합니다. 저시력인 분들도(그리고 다른 모든 분들도) 별도 설정 없이 데이터를 읽을 수 있게 하기 위해서입니다. “모니터링” 화면에서는 두 계기판이 스크롤 없이 한 화면에 함께 들어갑니다 — 시간에 따른 변화 그래프는 바로 그 아래, 한 번 더 스크롤하면 나옵니다.',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': '휴대폰 카메라와 분광기',
  'doc.ch2.spectro.p1.html': '“유해한 청색광이 얼마나 있는가”를 제대로 측정하려면 빛을 파장별로 나누어야 합니다 — 그 일을 하는 것이 <b>분광기</b>입니다: 프리즘이나 회절격자가 빛을 수십에서 수백 개의 좁은 대역(예: 1–5 nm 간격)으로 쪼개고, 각 대역의 광출력을 따로 측정합니다. 럭스, 루멘, 청색광 위해 함수로 가중한 복사조도 같은 단위는 그런 완전한 분광 분포가 있어야 비로소 계산할 수 있습니다.',
  'doc.ch2.spectro.p2.html': '<b>휴대폰 카메라는 그중 아무것도 하지 않습니다.</b> 넓은 필터 세 개(베이어: R/G/B)가 있을 뿐이고, 각 필터는 넓고 서로 겹치는 파장 범위의 빛을 모읍니다 — “청색 채널”은 435–440 nm 부근(망막 위해가 가장 큰 지점)의 좁은 대역이 아니라 대략 400–570 nm가 초록과 뒤섞인 것입니다. 게다가 디모자이킹, 자동 노출, 자동 화이트 밸런스, sRGB 감마 압축이 차례로 더해지는데, 브라우저는 이 단계 가운데 어느 하나도 완전히 끄게 해 주지 않습니다. 그 결과 JavaScript가 보는 픽셀 값은 센서에 실제로 닿는 광출력과 선형 관계에 있지 않습니다. 이것은 이 앱의 결함이 아니라 근본적인 하드웨어의 한계입니다.',

  'doc.ch2.raw.title': '그래프 1 — B 채널 밝기',
  'doc.ch2.raw.what.html': '<b>무엇을 보여 주는가:</b> 표본으로 읽은 영상 영역에서 청색(B) 채널만의 평균 밝기를 0–255 척도로 구해 %로 환산한 값입니다.',
  'doc.ch2.raw.algo.html': '<b>알고리즘:</b>',
  'doc.ch2.raw.step1': '1초에 5번 카메라에서 프레임을 가져옵니다.',
  'doc.ch2.raw.step2': '프레임의 가운데 60%를 잘라 냅니다(영상 가장자리와 옆에서 들어오는 빛번짐을 피합니다).',
  'doc.ch2.raw.step3': '잘라 낸 영역을 32×32 픽셀 격자로 축소합니다(충분히 정확하면서 전체 해상도로 계산하는 것보다 훨씬 빠릅니다 — 보급형 Xiaomi나 Ulefone 같은 저사양 기기에서 중요합니다).',
  'doc.ch2.raw.step4': '그 격자의 픽셀 1024개의 B 값을 평균합니다.',
  'doc.ch2.raw.step5.html': '<code>결과 = 평균_B ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>이 값을 남겨 둔 이유:</b> “센서가 도대체 얼마나 많은 청색 신호를 받고 있는가”를 가장 단순하고 직접적으로 읽어 주기 때문입니다. 단점은 밝기와 색을 뒤섞는다는 것입니다 — 매우 밝지만 중성적인 흰 장면도, 특별히 “파랗지” 않은데 높은 값이 나옵니다. 그래서 그 옆에 그래프 2를 함께 보여 줍니다.',

  'doc.ch2.share.title': '그래프 2 — 빛의 청색광 비율',
  'doc.ch2.share.what.html': '<b>무엇을 보여 주는가:</b> 기록된 전체 빛(R+G+B) 가운데 청색 성분이 차지하는 백분율 — 즉 장면이 얼마나 밝은지와 무관한, 차가운 쪽으로의 색 치우침입니다.',
  'doc.ch2.share.algo.html': '<b>알고리즘:</b> 위의 1–4단계는 같고, B만 쓰는 대신 다음을 계산합니다:',
  'doc.ch2.share.formula.html': '<code>결과 = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': '중성적인 흰색(R≈G≈B)은 약 <b>33%</b>가 나옵니다. 더 따뜻하고 붉은 빛은 그보다 낮고, 강한 청색광은 더 높아 거의 순수한 청색광에서는 ~100%에 가까워집니다.',
  'doc.ch2.share.why.html': '<b>이것이 “유해한 청색광”을 더 정확히 재는 이유:</b> 야간 모드나 Night Shift 같은 필터가 작동하는 원리와 같습니다 — 중요한 것은 밝기가 아니라 <b>색</b>입니다. 매우 밝지만 중성적인 화면은 유해하다고 잘못 표시되지 않고, 어둡지만 강하게 파란 화면은 그렇게 표시됩니다. 그래서 측정값 표의 구역 색을 정하는 것이 바로 이 지표입니다.',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': '왜 럭스나 루멘이 아닌가',
  'doc.ch3.units.p1.html': '<b>루멘(lm)</b>은 광원이 내보내는 전체 광속을 나타냅니다 — 어느 한 지점에 닿는 빛이 아니라 광원 자체의 성질입니다. <b>럭스(lx)</b>는 이미 한 지점의 조도(lm/m²)로 우리가 알고 싶은 것에 더 가깝지만, 여전히 <b>측광</b> 단위입니다: 청색광 위해 곡선이 아니라 사람 눈의 밝기 감도 곡선(V(λ))으로 스펙트럼에 가중치를 줍니다. 위해를 제대로 측정하려면 더 좁은 세 번째 단위가 필요합니다: <b>W/m²</b> 단위의 분광 가중 복사조도(IEC 62471 규격, 감도 최고점은 435–440 nm 부근)이며, 그러려면 분광기가 있어야 합니다 — 위 절을 보세요.',
  'doc.ch3.units.p2.html': '럭스로 만족한다 해도, 외부의 보정된 광 센서가 없는 휴대폰은 럭스를 신뢰할 만하게 구할 수 없습니다. 게다가 휴대폰에 내장된 조도 센서는(있는 경우에도) 후면 카메라로 화면을 향하는 면의 <b>반대쪽</b>에 있는 빛을 측정합니다 — 즉 화면의 빛이 아니라 등 뒤의 빛을 재게 됩니다. 그래서 어차피 믿을 수 없는 단위의 숫자를 짐작하는 대신, 정직하게 이름 붙인 <b>상대 지표(%)</b>를 보여 줍니다 — 절대적인 값이 아니라, 같은 휴대폰에서 같은 조건일 때의 비교(예: 야간 모드 켬/끔)에 의미가 있습니다.',

  'doc.ch3.norms.title': '안전 임계값에 대한 국제 규격이 있는가?',
  'doc.ch3.norms.p1.html': '짧게 말하면 <b>카메라 채널의 백분율로 표현된 규격은 없습니다</b> — 애초에 무엇도 그 단위로 규제되지 않습니다. 청색광에 관한 실제 규격은 존재하지만, 다른 양을 다른 단위로 측정하며, 흔히 “청색광이 눈을 피로하게 한다”고 말할 때의 현상과는 다른 현상을 다룹니다.',
  'doc.ch3.norms.p2.html': '<b>망막의 급성 광화학적 손상 — IEC 62471 / ICNIRP.</b> 실제로 규제되는 유일한 “청색광 위해”입니다 — 램프와 조명 시스템에 대한 규격이며, ICNIRP(국제비전리방사선방호위원회)의 지침이 이를 뒷받침합니다. 위해 함수 B(λ)로 가중한 <b>W·m⁻²·sr⁻¹</b> 단위의 복사휘도를 근거로 광원을 위험군 RG0–RG3으로 분류하고, 노출 시간의 한도(<code>t_max = 100 / L_B</code>초)를 둡니다. 휴대폰과 모니터 화면은 — 최대 밝기에서도 — 사실상 언제나 <b>RG0(면제, 제한 없음)</b>에 들어갑니다. 이 규격은 소비자용 화면이 아니라 훨씬 강한 광원(용접 아크, 일부 프로젝터, 산업용 LED)을 대상으로 합니다.',
  'doc.ch3.norms.p3.html': '<b>일주기 리듬과 수면에 대한 영향 — CIE S 026.</b> 보통 문제 삼는 현상이 바로 이것입니다(저녁의 화면이 “잠을 깨운다”) — 그러나 이것은 눈의 손상이 아니라, 480 nm 부근에 가장 민감한 망막 신경절 세포(ipRGC)를 통해 생체시계에 미치는 영향입니다. CIE S 026:2018 규격은 <b>멜라노픽 럭스(melanopic EDI)</b>라는 단위를 정의합니다. “공식적인” 과학적 합의에 가장 가까운 것은 Brown과 공저자들의 논문(<i>PLOS Biology</i>, 2022)으로, 대략적인 기준으로 저녁에는 멜라노픽 럭스 &lt; 10, 낮에는 &gt; 250을 권고합니다. 이는 수면 연구자들의 권고이지 법 규정이 아닙니다.',
  'doc.ch3.norms.p4.html': '<b>WHO.</b> 세계보건기구는 청색광 노출에 대한 독자적인 한도를 발표하지 않으며, 광방사 안전에 관해서는 위의 ICNIRP를 참조하도록 안내합니다. 화면에 관한 WHO 고유의 구체적인 문서는 <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i>(2019)뿐인데, 이 문서는 빛의 색이나 세기가 아니라 화면 앞에서 보내는 <b>시간</b>을 다룹니다: 만 1세 미만은 화면 금지, 2–4세는 최대 1시간. 성인에 대해서는 WHO도 그만큼 구체적인 수치 지침을 두고 있지 않습니다.',
  'doc.ch3.norms.p5.html': '<b>그래도 앱을 보정하는 데는 도움이 되지 않는 이유:</b> 두 규격 계열(IEC/ICNIRP와 CIE) 모두 완전한 분광 분포와, 알려진 측정 기하에서의 보정된 복사휘도를 요구합니다 — 휴대폰이 브라우저를 통해서는 내놓을 수 없는 바로 그것입니다(위의 “휴대폰 카메라와 분광기” 절을 보세요). “청색광 비율 33% = 멜라노픽 럭스 X”라는 환산식은 존재하지 않으므로, 이 앱의 임계값은 <b>어떠한 안전 규격도 재현하지 않습니다</b>(WHO, IEC, ICNIRP, CIE 어느 것도 — 이 지표에 대해서는 애초에 존재하지 않습니다). 다만 청색광 비율의 기본 임계값은 실제 빛의 색온도와, 저녁에는 따뜻한 빛을 쓰라는 널리 되풀이되는 실용적 권고에서 이끌어 냈습니다 — 단순한 반올림보다는 단단한 근거이지만 여전히 공식 규격은 아닙니다(전체 유도 과정은 4장). 설정에서 언제든 자신에게 맞는 값으로 바꿀 수 있습니다.',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': '색 구역과 임계값의 근거',
  'doc.ch4.zones.p1.html': '두 지표는 각각 독립적으로 설정하는 임계값을 가집니다(“모니터링” 화면 → “구역 임계값 설정”, 페이지 아래쪽) — 한쪽의 33%/66%가 다른 쪽에서 같은 뜻은 아닙니다(위의 2장 참고). 그래프 아래 범례와 측정값 표의 색을 정하는 것은 <b>청색광 비율</b>입니다:',
  'doc.ch4.zones.li1.html': '<b>초록 — 안전:</b> 따뜻하거나 중성적인 빛이며, 눈이 쉽니다.',
  'doc.ch4.zones.li2.html': '<b>노랑 — 중간:</b> 청색 쪽으로 뚜렷하게 치우쳐 있어, 틈틈이 쉬는 것이 좋습니다.',
  'doc.ch4.zones.li3.html': '<b>빨강 — 유해:</b> 강한 청색광이며, 오래 노출되면 눈이 몹시 피로합니다(특히 저녁에).',
  'doc.ch4.zones.p2.html': '<b>이 숫자들이 어디서 왔는가.</b> <b>B 채널 밝기</b>에는 자연스러운 기준점이 없습니다 — 합리적인 임계값은 촬영하는 장면이 얼마나 밝은지에만 달려 있습니다(색이 아니라 밝기의 척도이기 때문입니다). 여기서 기본값 33%/66%는 여전히 임의의 출발점입니다 — 자기 화면과 주변의 일반적인 밝기에 맞추어 시험해 보며 조정하세요.',
  'doc.ch4.zones.p3.html': '<b>청색광 비율</b>의 기본 임계값은 어떤 안전 규격이 아니라 실제 빛의 색온도에서 이끌어 낸 값입니다(반올림이 아니라 물리입니다) — 이 양에 대한 규격은 존재하지 않습니다(3장). 기준점은 다음과 같습니다:',
  'doc.ch4.zones.li4.html': '<b>~4000K</b>(“따뜻한 백색”, 흔한 LED 전구) → 청색광 비율 약 <b>26%</b>. 그보다 따뜻한 빛(더 낮은 색온도)은 f.lux나 Night Shift 같은 도구가 저녁에 널리 권하는 범위입니다 — 아래쪽 임계값이 여기서 나옵니다.',
  'doc.ch4.zones.li5.html': '<b>6500K (D65)</b>, 대부분의 휴대폰과 모니터 화면의 공장 출하 기준 백색점 — 약 <b>33%</b>. 이 값부터 위로는 청색광을 줄이라는 권고가 통상 적용되는 범위가 시작됩니다 — 위쪽 임계값이 여기서 나옵니다.',
  'doc.ch4.zones.p4.html': '<b>중요한 단서:</b> 빛이 얼마나 “파란”지는 하루 중 시간과 무관하지만, 청색광을 줄이라는 권고는 사실상 <b>저녁과 밤</b>에만 해당합니다 — 낮에 차갑고 푸른 빛(햇빛 포함)에 노출되는 것은 정상이며 일주기 리듬에는 오히려 이롭습니다. 한낮에 평범한, 손대지 않은 화면을 보다가 빨강 구역이 나온다고 해서 실제 위험을 뜻하지는 않습니다 — 같은 빛이라도 저녁이라면 줄일 만합니다.',
  'doc.ch4.zones.p5.html': '두 지표의 임계값은 완전히 독립적이어서 한쪽을 바꾸어도 다른 쪽에는 영향이 없습니다. 바꾼 임계값은 앱을 다시 열어도 <b>이 기기와 이 브라우저에 기억됩니다</b>(로컬에 저장되며 어디로도 전송되지 않습니다) — “시작” 버튼을 눌러도 기본값으로 되돌아가지 않습니다.',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': '미리보기가 기기마다 다르게 보이는 이유',
  'doc.ch5.devices.p1.html': '<b>브라우저와 기본 카메라 앱.</b> 휴대폰에 기본으로 설치된 카메라를 열면 제조사(예: Xiaomi)가 실시간 미리보기에 자체 독점 알고리즘을 얹습니다 — 실시간 HDR, 어두운 곳에서의 디지털 밝기 증폭, 노이즈 완화 같은 것들입니다. 웹 페이지는 브라우저를 통해(<code>getUserMedia</code> 함수) 훨씬 더 “날것”에 가까운 카메라 스트림을 받습니다. 그런 보정이 하나도 없으므로, 어떤 휴대폰이든 원칙적으로 기본 카메라보다 평평하고 어둡게 보입니다.',
  'doc.ch5.devices.p2.html': '<b>카메라 제어 범위의 차이.</b> 브라우저가 노출과 화이트 밸런스를 시스템에서 얼마나 넘겨받는지는 휴대폰, 카메라 드라이버, Chrome이나 WebView의 버전에 따라 다릅니다 — 어떤 기기(보통 USB 카메라를 단 컴퓨터)는 완전 자동만 알리고, 어떤 기기(일부 안드로이드 휴대폰)는 더 진보된 추가 모드를 알립니다. 이 앱의 이전 버전은 휴대폰이 허용하는 곳에서 수동 노출 모드로 전환하되 구체적인 값을 지정하지 않았는데, 그 때문에 일부 휴대폰에서 카메라가 켜진 순간의 임의의 어두운 노출로 영상이 얼어붙었습니다. 그것은 단위의 차이가 아니라 코드의 버그였고(이미 고쳤습니다), 같은 한 줄의 코드조차 일부 기기에서만 작동한다는 점에서 기기 사이의 동작이 얼마나 쉽게 달라지는지를 잘 보여 줍니다.',
  'doc.ch5.devices.p3.html': '<b>센서와 이미지 처리(ISP)의 차이.</b> 코드가 같고 장면이 같아도 휴대폰 모델마다 센서의 품질이 다르고 제조사의 자동 처리가 다르게 조정되어 있습니다 — 어떤 기기는 어두운 곳에서 다른 기기보다 더 빠르고 정확하게 노출을 맞춥니다. 이 앱의 지표가 <b>상대적</b>이라는 사실(3장 참고)과 합쳐 보면 이런 뜻이 됩니다: 결과(그리고 미리보기의 모습)는 서로 다른 모델이나 기기 사이가 아니라, 같은 휴대폰에서 시간을 두고 비교하세요.'
});
