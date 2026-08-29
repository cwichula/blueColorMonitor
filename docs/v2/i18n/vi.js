/* docs/v2/i18n/vi.js — słownik WERSJI 2, wietnamski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/vi.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej.
 *
 * SKĄD TE ZDANIA: treść wzięta z pl.js (redakcja pierwotna), terminologia
 * i rejestr — z en.js oraz, co ważniejsze, z docs/shared/i18n/vi.js. Nazwy
 * siedmiu wielkości brzmią DOKŁADNIE tak, jak w warstwie wspólnej: tỷ lệ ánh
 * sáng xanh, độ sáng khung hình, nhiệt độ màu, ảnh hưởng nhịp sinh học, nhấp
 * nháy, độ đồng đều, tiện nghi thị giác. Klucze *.nameLower to te same nazwy
 * małą literą — wietnamski nie odmienia rzeczownika w środku zdania, więc
 * różnica jest wyłącznie w wielkiej literze. „Metryka” i „wskaźnik” to po
 * wietnamsku jedno słowo: đại lượng.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (i dlaczego):
 *   'zone.warning'        — wspólne mówi „Lưu ý”, ta wersja od zawsze mówi
 *                           mocniej: „Cảnh báo”;
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu. Wietnamski nie ma
 *                           liczby mnogiej, więc „Pomiary” zamiast „Pomiar”
 *                           nie zmienia tu ani jednej litery.
 *
 * LICZEBNIKI: Intl.PluralRules('vi') zwraca JEDNĄ kategorię — 'other'.
 * Rzeczownik nie odmienia się przez liczbę, więc każdy obiekt form ma dokładnie
 * jeden klucz i to nie jest niedoróbka.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules. Patrz nagłówek docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['vi'] = Object.assign(window.I18nData['vi'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Giám sát Ánh sáng — đo ánh sáng xanh',
  'app.description': 'Giám sát Ánh sáng — đo tỷ lệ ánh sáng xanh bằng camera điện thoại. Bảy đại lượng, biểu đồ, lịch sử. Mọi thứ đều dùng được, không cần tài khoản và không mất phí.',
  'app.skipToContent': 'Chuyển đến nội dung',
  'app.measuring': 'Đang đo',
  'app.docsButton': 'Tài liệu và giải thích',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — phiên bản 2',

  'nav.aria': 'Điều hướng chính',
  'nav.tablistAria': 'Các màn hình của ứng dụng',
  'nav.measure': 'Đo',
  'nav.history': 'Lịch sử',
  'nav.tools': 'Công cụ',
  'nav.support': 'Ủng hộ',
  'nav.more': 'Thêm',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Tài liệu',
  'panel.thresholds': 'Ngưỡng và hồ sơ',
  'panel.reports': 'Báo cáo',
  'panel.export': 'Xuất dữ liệu',
  'panel.compare': 'So sánh A/B',
  'panel.calibration': 'Hiệu chuẩn bằng giấy trắng',
  'panel.screenCheck': 'Kiểm tra màn hình của tôi',
  'panel.schedule': 'Lịch trình',
  'panel.alerts': 'Cảnh báo phơi sáng',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Quay lại',
  'action.close': 'Đóng',
  'action.refresh': 'Làm mới',
  'action.apply': 'Áp dụng',
  'action.delete': 'Xóa',
  'action.hide': 'Ẩn',
  /* „Start” i „Stop” zostają po angielsku: tak brzmią te dwa przyciski we
     wszystkich wersjach aplikacji i tak cytuje je warstwa wspólna
     (engine.idle: „Nhấn “Start” để bật camera.”). */
  'action.start': 'Start',
  'action.stop': 'Stop',
  'action.switch': 'Đổi',
  'action.switchAria': 'Đổi camera: trước hoặc sau',
  'action.resetDefaults': 'Khôi phục mặc định',
  'action.reports': 'Báo cáo',
  'action.exportCsv': 'Xuất CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Màn hình: {name}',
  'a11y.measureStarted': 'Đã bắt đầu đo.',
  'a11y.measureStopped': 'Đã dừng đo.',
  'a11y.measureStoppedSummary': 'Đã dừng đo. Thời gian: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'Đã áp dụng hồ sơ ngưỡng.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Xác nhận',
  'dialog.confirm': 'Tôi xác nhận',
  'dialog.cancel': 'Hủy',
  'dialog.infoTitle': 'Thông tin',
  'dialog.ok': 'Đã hiểu',

  'help.sheetTitle': 'Về đại lượng này',
  'help.unit': 'Đơn vị',
  'help.scaleRange': 'Phạm vi thang đo',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'Cảnh báo',
  'threshold.crit': 'Nghiêm trọng',
  'threshold.warnLabel': 'Ngưỡng cảnh báo',
  'threshold.critLabel': 'Ngưỡng nghiêm trọng',
  'threshold.warnAria': '{name} — ngưỡng: cảnh báo',
  'threshold.critAria': '{name} — ngưỡng: nghiêm trọng',

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

  'firstRun.title': 'Đo thế nào',
  'firstRun.text': 'Nhấn “Start”, hướng điện thoại vào một bề mặt được chiếu sáng và giữ yên trong vài giây. Khung trên bản xem trước cho thấy đúng phần mà ứng dụng thực sự đọc.',
  'firstRun.close': 'Đóng gợi ý',

  'camera.live': 'TRỰC TIẾP',
  'camera.idle': 'Camera đang tắt. Nhấn “Start”, hướng điện thoại vào một bề mặt được chiếu sáng và giữ yên trong vài giây.',
  'camera.stopped': 'Đã dừng đo. Nhấn “Start” để đo lại.',

  'error.cameraStart': 'Không khởi động được camera.',
  'error.engineMissing': 'Mô-đun đo chưa được tải.',

  'metrics.sevenTitle': 'Bảy đại lượng',
  'measure.tilesSub': 'Làm mới 5 lần mỗi giây',

  'session.title': 'Phiên đo này',
  'session.duration': 'Thời gian đo',
  'session.samples': 'Số mẫu',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     Wietnamski nie odmienia rzeczownika przez liczbę, więc „Ostrzeżenia”
     brzmią tu tak samo jak „Ostrzeżenie” pod suwakiem. */
  'zone.count.good': 'Trong ngưỡng',
  'zone.count.warning': 'Cảnh báo',
  'zone.count.critical': 'Nghiêm trọng',

  'note.calibrated': 'Phép đo đã hiệu chuẩn bằng giấy trắng — các kênh đã được cân bằng.',

  'tile.helpAria': 'Điều này nghĩa là gì: {name}',
  'tile.noMeasurement': 'Không có số đo',
  'tile.outOfScale': 'Ngoài thang đo',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Cảnh báo',
  'zone.spoken.warning': 'cảnh báo',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Diễn biến theo thời gian',
  'history.pickHint': 'Chọn đại lượng và khoảng thời gian',
  'history.metricLabel': 'Đại lượng',
  'history.rangeAria': 'Khoảng thời gian của biểu đồ',
  'history.emptyTitle': 'Không có dữ liệu trong khoảng này',
  'history.emptyText': 'Hãy bắt đầu đo ở màn hình Đo — biểu đồ sẽ đầy sau vài giây.',
  'history.tableTitle': 'Các số đo gần nhất',
  'history.tableHide': 'Ẩn bảng',
  'history.tableShow': 'Hiện bảng',
  'history.tableCaption': 'Các số đo gần nhất, mới nhất ở trên cùng.',
  'history.tableEmpty': 'Chưa có số đo nào. Hãy bắt đầu đo ở màn hình Đo.',

  'table.time': 'Giờ',
  'table.metric': 'Đại lượng',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Wietnamskie
     nazwy jednostek czasu są krótkie same z siebie i nie skraca się ich
     kropką — te same napisy stoją w v5. */
  'range.1m': '1 phút',
  'range.1h': '1 giờ',
  'range.24h': '24 giờ',
  'range.7d': '7 ngày',
  'range.30d': '30 ngày',

  'chart.now': 'bây giờ',
  'chart.countSub': {
    other: '{n} lần đọc trong khoảng đã chọn'
  },
  'chart.aria': '{name}, khoảng {range}, {count}, giá trị mới nhất {value} {unit}.',
  'chart.ariaZone': '{name}, khoảng {range}, {count}, giá trị mới nhất {value} {unit}, vùng: {zone}.',
  'chart.ariaEmpty': '{name} — không có dữ liệu trong khoảng {range}.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Trình hướng dẫn và các chức năng hỗ trợ',
  'tools.note': 'Các công cụ giúp bạn hiểu kết quả đo. Tất cả đều dùng được ngay, và bản thân phép đo hoạt động độc lập với chúng.',

  'tool.thresholds.sub': 'Khi nào một giá trị phải bật cảnh báo',
  'tool.compare.sub': 'Trong hai nguồn sáng thì nguồn nào dịu hơn',
  'tool.calibration.sub': 'Chức năng duy nhất thực sự nâng độ chính xác',
  'tool.screenCheck.sub': 'Năm bước và một kết luận hoàn chỉnh về màn hình',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Lịch trình ngưỡng”
     kontra „Lịch trình”. Tak było i tak zostaje. */
  'tool.schedule.title': 'Lịch trình ngưỡng',
  'tool.schedule.sub': 'Ngưỡng khác vào buổi tối, khỏi phải nhớ',
  'tool.alerts.sub': 'Tín hiệu khi vùng nghiêm trọng kéo dài quá lâu',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Cài đặt',
  'more.thresholdsSub': 'Khi nào một giá trị phải bật cảnh báo',
  'more.docsSub': 'Đo thế nào, và phép đo này không cho biết điều gì',
  'more.appearanceTitle': 'Giao diện và khả năng tiếp cận',

  'settings.theme': 'Chủ đề',
  'theme.auto': 'Theo hệ thống',
  'theme.light': 'Sáng',
  'theme.dark': 'Tối',

  'settings.textScale': 'Cỡ chữ',
  'textScale.100': 'Tiêu chuẩn',
  'textScale.115': 'Lớn hơn (115%)',
  'textScale.130': 'Lớn nhất (130%)',

  'settings.contrast': 'Tương phản cao hơn',
  'settings.contrastSub': 'Viền đậm hơn và chữ phụ tối hơn.',
  'settings.sound': 'Âm thanh cảnh báo',
  'settings.soundSub': 'Một tín hiệu ngắn khi cảnh báo phơi sáng bật lên.',
  'settings.vibrate': 'Rung khi có cảnh báo',
  'settings.vibrateSub': 'Chỉ hoạt động trên những thiết bị có hỗ trợ.',

  'more.dataTitle': 'Dữ liệu',
  'more.clearHistory': 'Xóa lịch sử đo',
  'more.clearHistorySub': 'Xóa các số đo đã lưu khỏi thiết bị này. Ngưỡng, hồ sơ và cài đặt vẫn còn.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'Ứng dụng hoàn toàn miễn phí. ',
  'more.supportLink': 'Bạn có thể ủng hộ một cách tự nguyện.',

  'dialog.clearHistory.title': 'Xóa lịch sử đã lưu?',
  'dialog.clearHistory.body': {
    other: 'Chúng tôi sẽ xóa {n} điểm đo đã lưu khỏi thiết bị này. Việc này không thể hoàn tác. Ngưỡng, hồ sơ và cài đặt vẫn còn nguyên.'
  },
  'dialog.clearHistory.confirm': 'Xóa lịch sử',
  'dialog.clearHistory.cancel': 'Giữ lại',

  'toast.historyCleared': 'Đã xóa lịch sử đo.',
  'toast.screenUnavailable': 'Màn hình này chưa có trong phiên bản này.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'Ứng dụng này đo gì',
  'docs.leadText': 'Camera điện thoại nhìn vào một bề mặt được chiếu sáng, và năm lần mỗi giây ứng dụng tính trung bình các kênh R, G và B của phần giữa khung hình. Từ ba con số đó nó suy ra bảy đại lượng.',
  'docs.limitsTitle': 'Giới hạn của phương pháp',
  'docs.limitsText': 'Camera có ba kênh màu rộng, phơi sáng tự động và cân bằng trắng tự động. Nó không đo quang phổ và không biết giá trị tuyệt đối, nên độ sáng chỉ là một chỉ báo tương đối chứ không phải lux. Nhiệt độ màu và ảnh hưởng nhịp sinh học là những giá trị gần đúng tính từ màu cơ bản sRGB. Lấy mẫu ở {rate} Hz chỉ thấy được nhấp nháy dưới {limit} Hz — nhấp nháy điện lưới 100 Hz nằm ngoài tầm với và ứng dụng sẽ không bao giờ báo nó như một kết quả đo.',

  'note.howTo.repeat.title': 'Hãy đo lại',
  'note.howTo.repeat.text': 'Một số đo đơn lẻ chỉ là một khoảnh khắc. Hơn chục giây đo cho hình ảnh đáng tin hơn.',

  'docs.scale': 'Thang đo',
  'docs.direction': 'Chiều',
  'docs.directionHigher': 'Cao hơn thì tốt hơn',
  'docs.directionLower': 'Thấp hơn thì dịu hơn',
  'docs.privacyTitle': 'Dữ liệu và quyền riêng tư',
  'docs.privacyText': 'Hình ảnh từ camera không được gửi hay lưu đi đâu cả — từ mỗi khung hình chỉ giữ lại ba con số. Kết quả đo, ngưỡng và cài đặt nằm trong bộ nhớ trình duyệt trên thiết bị này. Ứng dụng không thực hiện bất kỳ truy vấn mạng nào và hoạt động ở chế độ ngoại tuyến.',
  'docs.freeLine': 'Cả bảy đại lượng, lịch sử, biểu đồ, các công cụ và chế độ ngoại tuyến đều hoạt động cho mọi người, không cần tài khoản và không mất phí.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Mọi thứ đều dùng được',
  'support.heroText': 'Cả bảy đại lượng, lịch sử đo, biểu đồ, mọi công cụ và chế độ ngoại tuyến đều hoạt động cho mọi người, ngay lập tức. Không tài khoản, không giới hạn và không mất phí.',
  'support.whyTitle': 'Vì sao tôi ngỏ lời',
  'support.whyText': '{app} được làm ngoài giờ và không kiếm tiền từ ai: không quảng cáo, không thu thập dữ liệu và không có gì để bán. Việc duy trì và phát triển tiếp — đại lượng mới, sửa lỗi, thử nghiệm trên thêm nhiều điện thoại — đều tốn thời gian. Nếu ứng dụng có ích cho bạn, bạn có thể góp một tay. Bạn không bắt buộc phải làm vậy.',
  'support.whatTitle': 'Quyên góp thì được gì',
  'support.whatText': 'Không gì cả. Thật sự nó không mở khóa thứ gì và không làm gì nhanh hơn — ứng dụng trông và chạy y hệt trước và sau đó. Nó chỉ cho một điều: tác giả biết rằng công việc này đã có ích cho ai đó.',
  'support.button': 'Mời tôi một ly cà phê',
  'support.pendingTitle': 'Hồ sơ chưa được kết nối',
  'support.pendingText': 'Ở đây chưa có địa chỉ để gửi ủng hộ tới. Nó sẽ xuất hiện ở chỗ này khi nào sẵn sàng — cho đến lúc đó mọi thứ trong ứng dụng vẫn hoạt động y hệt.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'Nút này mở trang Buy Me a Coffee bên ngoài trong thẻ mới. Đó là lúc duy nhất có thứ gì đó rời khỏi thiết bị này — và điều đó chỉ xảy ra sau khi bạn nhấn. Kết quả đo, lịch sử và cài đặt vẫn ở lại đây.',
  'privacy.externalPending': 'Khi đã có địa chỉ, việc nhấn nút sẽ mở một trang bên ngoài trong thẻ mới. Đó sẽ là lúc duy nhất có thứ gì đó rời khỏi thiết bị này. Kết quả đo, lịch sử và cài đặt vẫn ở lại đây.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (bản dự phòng trong ui-core.js)',
  'boot.need.metrics': 'không giá trị nào được tính',
  'boot.need.bus': 'các mô-đun sẽ không còn thấy nhau',
  'boot.need.ui': 'không chuyển được màn hình',
  'boot.need.engine': 'camera và phép đo sẽ không khởi động',
  'boot.need.support': 'màn hình Ủng hộ sẽ trống',
  'boot.need.tools': 'thẻ Công cụ sẽ trống',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'Những mô-đun này không tải được: {list}.',
  'boot.consoleHint': 'Hãy kiểm tra thứ tự và đường dẫn của các thẻ <script> trong index.html.',
  'boot.incompleteTitle': 'Ứng dụng tải không đầy đủ',
  'boot.incompleteText': '{missing} Hãy tải lại trang; nếu vẫn không được thì các tệp trên máy chủ bị thiếu.',
  'boot.newVersion': 'Đã có phiên bản mới của ứng dụng.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'Ngưỡng làm gì. ',
  'thresholds.noteText': 'Ngưỡng cảnh báo bật trạng thái vàng, ngưỡng nghiêm trọng bật trạng thái đỏ. Thay đổi có hiệu lực ngay lập tức — kể cả với số đo đang hiển thị trên màn hình. Bạn có thể lưu bộ ngưỡng của riêng mình dưới một cái tên và quay lại với nó bất cứ lúc nào.',
  'thresholds.profilesTitle': 'Hồ sơ ngưỡng',
  'thresholds.profilesSub': 'Ba hồ sơ dựng sẵn và hồ sơ của riêng bạn',
  'thresholds.customName': 'Tên hồ sơ của bạn',
  'thresholds.customPlaceholder': 'ví dụ Phòng ngủ buổi tối',
  'thresholds.save': 'Lưu các ngưỡng hiện tại',
  'thresholds.saveHelp': 'Lưu đúng những ngưỡng đã đặt ở trên.',

  'profile.builtin.default.name': 'Mặc định',
  'profile.builtin.default.desc': 'Các ngưỡng lấy từ danh mục đại lượng — điểm khởi đầu cho mọi phép đo.',
  'profile.builtin.evening.name': 'Buổi tối — dịu',
  'profile.builtin.evening.desc': 'Cảnh báo sớm hơn về màu lạnh và ảnh hưởng nhịp sinh học.',
  'profile.builtin.work.name': 'Làm việc tại bàn',
  'profile.builtin.work.desc': 'Cho phép ánh sáng ban ngày sáng và lạnh; theo dõi nhấp nháy và độ đồng đều.',
  'profile.custom.desc': 'Hồ sơ riêng của bạn, đã lưu {date}.',

  'toast.thresholdsReset': 'Đã khôi phục các ngưỡng mặc định.',
  'toast.thresholdOrder': 'Ngưỡng cảnh báo phải thấp hơn ngưỡng nghiêm trọng.',
  'toast.thresholdOrderInverted': 'Với đại lượng này, ngưỡng cảnh báo phải cao hơn ngưỡng nghiêm trọng.',
  'toast.profileNameMissing': 'Hãy nhập tên hồ sơ.',
  'toast.profileSaved': 'Đã lưu hồ sơ “{name}”.',
  'toast.profileApplied': 'Đã áp dụng hồ sơ “{name}”.',
  'toast.profileApplyFailed': 'Không áp dụng được hồ sơ này.',
  'toast.profileRemoved': 'Đã xóa hồ sơ.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'Lịch trình để làm gì. ',
  'schedule.noteText': 'Buổi tối cần những ngưỡng khác với giữa trưa. Một quy tắc “từ–đến” tự đổi hồ sơ, để bạn khỏi phải nhớ. Lịch trình không bao giờ bắt đầu hay dừng phép đo.',
  'schedule.toggle': 'Bật tự động chuyển hồ sơ',
  'schedule.toggleSub': 'Được kiểm tra mỗi phút theo đồng hồ của thiết bị.',
  'schedule.emptyTitle': 'Chưa có quy tắc nào',
  'schedule.emptyText': 'Hãy thêm quy tắc đầu tiên bằng nút bên dưới.',
  'schedule.add': 'Thêm quy tắc',
  'schedule.to': 'đến',
  'schedule.profile': 'Hồ sơ',
  'schedule.fromAria': 'Quy tắc {n}: giờ bắt đầu',
  'schedule.toAria': 'Quy tắc {n}: giờ kết thúc',
  'toast.scheduleTimeFormat': 'Hãy nhập giờ theo định dạng 22:00.',
  'toast.scheduleEnded': 'Lịch trình đã kết thúc — các ngưỡng trước đó đã trở lại.',
  'toast.scheduleApplied': 'Lịch trình đã bật hồ sơ “{name}”.',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'Cảnh báo làm gì. ',
  'alerts.noteText': 'Nó theo dõi một đại lượng và chỉ lên tiếng khi đại lượng đó giữ vùng bạn đã chọn liên tục suốt khoảng thời gian bạn đặt. Nó không bao giờ dừng phép đo và không che các nút.',
  'alerts.toggle': 'Bật cảnh báo phơi sáng',
  'alerts.toggleSub': 'Chỉ hoạt động trong lúc đang đo.',
  'alerts.metric': 'Đại lượng được theo dõi',
  'alerts.level': 'Từ vùng nào',
  'alerts.level.warning': 'Từ vùng cảnh báo trở lên',
  'alerts.level.critical': 'Chỉ vùng nghiêm trọng',
  'alerts.sustain': 'Sau bao nhiêu giây liên tục',
  'alerts.sustainHelp': 'Thời gian càng ngắn thì càng nhiều báo động giả khi bạn di chuyển điện thoại.',
  'alerts.sound': 'Một tín hiệu âm thanh ngắn',
  'alerts.soundSub': 'Âm thanh được tạo ra ngay trên thiết bị. Bạn cũng có thể tắt nó cho toàn ứng dụng ở màn hình Thêm.',
  'alerts.barTitle': 'Cảnh báo phơi sáng',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} đã giữ vùng cảnh báo suốt {seconds} giây — hiện tại {value} {unit}.',
  'alerts.message.critical': '{name} đã giữ vùng nghiêm trọng suốt {seconds} giây — hiện tại {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'So sánh thế nào. ',
  'compare.noteText': 'Hãy bắt đầu đo, hướng camera vào nguồn sáng thứ nhất và lưu nó thành A. Không đổi khoảng cách hay góc, hãy đổi nguồn sáng và lưu thành B. Việc so sánh chỉ có ý nghĩa khi khung cảnh vẫn y như cũ.',
  'compare.slotA': 'Ánh sáng A',
  'compare.slotB': 'Ánh sáng B',
  'compare.save': 'Lưu số đo hiện tại',
  'compare.savedAt': 'Đã lưu {date}, {time}',
  'compare.empty': 'Chưa lưu gì cả.',
  'compare.verdictTitle': 'Kết quả so sánh',
  'compare.verdictEmpty': 'Hãy lưu cả hai nguồn sáng để thấy nguồn nào dịu hơn.',
  'compare.notEnough': 'Không đủ dữ liệu để so sánh hai phép đo này.',
  'compare.tie': 'Hai nguồn sáng cho kết quả gần như nhau ({metric}: {a} và {b} {unit}). Khác biệt nằm trong nhiễu của phép đo.',
  'compare.betterA': 'Ánh sáng A là nguồn dịu hơn — {metric} là {better} {unit} so với {worse} {unit}.',
  'compare.betterB': 'Ánh sáng B là nguồn dịu hơn — {metric} là {better} {unit} so với {worse} {unit}.',
  'compare.clear': 'Xóa so sánh',
  'toast.compareSavedA': 'Đã lưu ánh sáng A.',
  'toast.compareSavedB': 'Đã lưu ánh sáng B.',
  'toast.compareCleared': 'Đã xóa so sánh.',
  'toast.measureFirst': 'Trước hết hãy bắt đầu đo ở màn hình Đo.',

  /* Nazwa wielkości w środku zdania. Wietnamski nie odmienia tu rzeczownika —
     różnica względem nazwy z warstwy wspólnej jest wyłącznie w wielkiej
     literze, ale klucz zostaje, bo po niemiecku różnica jest realna. */
  'metric.share.nameLower': 'tỷ lệ ánh sáng xanh',
  'metric.brightness.nameLower': 'độ sáng khung hình',
  'metric.kelvin.nameLower': 'nhiệt độ màu',
  'metric.melanopic.nameLower': 'ảnh hưởng nhịp sinh học',
  'metric.flicker.nameLower': 'nhấp nháy',
  'metric.uniformity.nameLower': 'độ đồng đều',
  'metric.comfort.nameLower': 'tiện nghi thị giác',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'Vì sao cách này có tác dụng. ',
  'calib.noteText': 'Cảm biến của camera có một độ lệch cố định giữa các kênh. Đo một tờ giấy trắng cho thấy độ lệch đó lớn đến đâu và cho phép trừ nó đi. Đây là chức năng duy nhất trong ứng dụng này thực sự nâng độ chính xác — và nó vẫn không biến camera thành máy đo quang phổ.',
  'calib.step1': 'Đặt một tờ giấy trắng dưới nguồn sáng cần đo',
  'calib.step2': 'Bắt đầu đo và để tờ giấy lấp đầy khung hình',
  'calib.step3': 'Nhấn “Hiệu chuẩn” và giữ yên điện thoại trong 3 giây',
  'calib.done': 'Đã hiệu chuẩn {date}, {time}.',
  'calib.none': 'Chưa hiệu chuẩn. Phép đo vẫn chạy, hãy coi các giá trị là để so sánh.',
  'calib.gain': 'Hệ số khuếch đại {channel}',
  'calib.gainsLabel': 'Hệ số khuếch đại của các kênh',
  'calib.gainsUnset': 'chưa đặt',
  'calib.start': 'Hiệu chuẩn (3 giây)',
  'calib.clear': 'Xóa hiệu chuẩn',
  'toast.calibCleared': 'Đã xóa hiệu chuẩn.',
  'calib.error.noEngine': 'Mô-đun đo không khả dụng.',
  'calib.error.notRunning': 'Trước hết hãy bắt đầu đo và hướng camera vào một tờ giấy trắng.',
  'calib.error.busy': 'Việc hiệu chuẩn đang chạy rồi.',
  'calib.error.tooFewSamples': 'Quá ít mẫu. Hãy kiểm tra xem phép đo có thực sự đang chạy không.',
  'calib.error.tooDark': 'Hình ảnh quá tối để hiệu chuẩn. Hãy chiếu sáng tờ giấy rõ hơn rồi thử lại.',
  'calib.error.tooSkewed': 'Độ lệch giữa các kênh quá lớn để coi là một lần hiệu chuẩn. Hãy dùng giấy trắng dưới ánh sáng đều.',
  'calib.ok': 'Đã hiệu chuẩn. Nhiệt độ màu và ảnh hưởng nhịp sinh học từ giờ sẽ chính xác hơn.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'Công cụ này dùng để làm gì. ',
  'screencheck.noteText': 'Năm bước kiểm tra màn hình theo đúng cách các bài đánh giá vẫn làm: màu trắng ở hai mức sáng, độ đồng đều của đèn nền, và liệu chế độ ban đêm của hệ thống có thực sự thay đổi điều gì không. Trình hướng dẫn đọc phép đo đang chạy; nó không tự khởi động phép đo.',
  'screencheck.step.white100.title': 'Màu trắng ở độ sáng tối đa',
  'screencheck.step.white100.hint': 'Hãy mở một trang màu trắng trên màn hình, đặt độ sáng lên mức tối đa và để màn hình lấp đầy khung hình.',
  'screencheck.step.white20.title': 'Màu trắng ở độ sáng thấp',
  'screencheck.step.white20.hint': 'Hãy giảm độ sáng màn hình xuống còn khoảng một phần năm và giữ nguyên khung hình.',
  'screencheck.step.corners.title': 'Các góc màn hình',
  'screencheck.step.corners.hint': 'Hãy trở lại độ sáng tối đa và cho camera thấy toàn bộ màn hình — chúng tôi đang kiểm tra độ đồng đều của đèn nền.',
  'screencheck.step.nightOff.title': 'Chế độ ban đêm đã tắt',
  'screencheck.step.nightOff.hint': 'Hãy chắc chắn rằng bộ lọc ánh sáng xanh đang tắt.',
  'screencheck.step.nightOn.title': 'Chế độ ban đêm đã bật',
  'screencheck.step.nightOn.hint': 'Hãy bật bộ lọc ánh sáng xanh của hệ thống và lặp lại đúng khung hình đó.',
  'screencheck.stepHeading': 'Bước {n} trên {total}: {title}',
  'screencheck.idleTitle': 'Trình hướng dẫn chưa chạy',
  'screencheck.idleHint': 'Hãy bắt đầu đo ở màn hình Đo, rồi quay lại đây và nhấn “Bắt đầu”.',
  'screencheck.next': 'Lưu bước này và đi tiếp',
  'screencheck.cancel': 'Hủy bỏ',
  'screencheck.start': 'Bắt đầu trình hướng dẫn',
  'screencheck.clearResult': 'Xóa kết quả',
  'screencheck.resultTitle': 'Kết quả',
  'screencheck.resultEmpty': 'Chưa có bước nào được lưu.',
  'screencheck.resultPartial': 'Đã lưu {done} trên {total} bước. Kết luận sẽ xuất hiện khi đã có thứ để so sánh.',
  'screencheck.note.uniformityLow': 'Độ đồng đều của đèn nền là {value}% — thấy rõ khác biệt độ sáng trong khung hình.',
  'screencheck.note.uniformityOk': 'Đèn nền đều ({value}%).',
  'screencheck.note.nightWorks': 'Chế độ ban đêm hạ tỷ lệ ánh sáng xanh xuống {value} điểm phần trăm — nó có tác dụng.',
  'screencheck.note.nightWeak': 'Chế độ ban đêm chỉ thay đổi tỷ lệ ánh sáng xanh {value} điểm phần trăm. Ít hơn mức mà bộ lọc của hệ thống thường mang lại.',
  'screencheck.note.pwm': 'Ở độ sáng thấp, nhấp nháy tăng từ {from}% lên {to}% — đó là dấu hiệu điển hình của việc giảm sáng bằng xung (PWM).',
  'toast.screencheckDone': 'Trình hướng dẫn đã xong. Kết quả ở bên dưới.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'Những con số này từ đâu ra. ',
  'reports.noteText': 'Báo cáo được tính từ lịch sử lưu trên thiết bị này — mỗi năm giây một điểm. Bộ máy đo thu thập lịch sử đó ngay từ phép đo đầu tiên, nên báo cáo sẵn sàng ngay lập tức.',
  'reports.rangeAria': 'Khoảng của báo cáo',
  'reports.day': '24 giờ qua',
  'reports.week': '7 ngày qua',
  'reports.date': 'Báo cáo cho ngày {date}.',
  'report.headerDay': 'Ngày từ {from} đến {to} — {count}.',
  'report.headerWeek': 'Tuần từ {from} đến {to} — {count}.',
  'count.points': { other: '{n} điểm dữ liệu' },
  'count.samples': { other: '{n} mẫu' },
  'report.emptyTitle': 'Không có dữ liệu trong khoảng thời gian này',
  'report.emptyText': 'Hãy bắt đầu đo ở màn hình Đo — lịch sử tự lưu lại.',
  'report.colAvg': 'Trung bình',
  'report.colMin': 'Nhỏ nhất',
  'report.colMax': 'Lớn nhất',
  'report.zonesTitle': 'Phân bố các vùng',
  'report.worstHour': 'Giờ tệ nhất trong ngày',
  'report.worstHourNone': 'không có giờ nào nổi bật',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'Nên làm gì với chuyện này',
  'report.disclaimerTitle': 'Đây không phải lời khuyên y tế. ',
  'report.disclaimerText': 'Các kết luận chỉ rút ra từ những gì camera của chiếc điện thoại này nhìn thấy. Ứng dụng không đo quang phổ, không biết lux và không đưa ra bất kỳ chẩn đoán nào.',

  'advice.melanopic': 'Ảnh hưởng nhịp sinh học trung bình là {value}×. Buổi tối nên xuống dưới 0,50 — cách đơn giản nhất là bóng đèn ấm hơn hoặc chế độ ban đêm.',
  'advice.kelvin': 'Ánh sáng lạnh (trung bình {value} K). Để làm việc thì không có gì phải chê; nhưng hai giờ trước khi ngủ thì dưới 3000 K tốt hơn.',
  'advice.flicker': 'Phát hiện nhấp nháy thấy rõ (trung bình {value}%). Thường là do bộ điều chỉnh độ sáng rẻ tiền hoặc bộ nguồn của đèn nền.',
  'advice.uniformity': 'Ánh sáng phân bố không đều ({value}%). Dịch đèn đi hoặc đổi góc chiếu thường có tác dụng hơn là thay bóng.',
  'advice.worstHour': 'Giờ tệ nhất trong ngày là {hour}:00 — đó là lúc tập trung nhiều số đo vượt ngưỡng nhất.',
  'advice.none': 'Trong khoảng thời gian này không có gì vượt ra ngoài ngưỡng. Bước hữu ích nhất bây giờ là so sánh hai nguồn sáng trong công cụ So sánh A/B.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'Định dạng tệp. ',
  'export.noteText': 'Dấu chấm phẩy ngăn cột, dấu phẩy làm dấu thập phân, mã hóa UTF-8 kèm dấu BOM. Excel đặt theo vùng dùng dấu phẩy làm dấu thập phân — như tiếng Việt — mở tệp như vậy mà không phải chỉnh gì cả.',
  'export.range': 'Khoảng dữ liệu',
  'export.columns': 'Các cột trong tệp',
  'export.chipFilled': ' — cột đã có dữ liệu',
  'export.help': 'Tệp chứa đủ bảy cột — bộ máy đo tính chúng ngay từ phép đo đầu tiên và tất cả đều vào tệp.',
  'export.run': 'Lưu tệp CSV',
  'export.previewEmpty': 'Không có số đo nào trong khoảng này. Hãy bắt đầu đo — lịch sử tự lưu lại.',
  'csv.range.hour': 'Giờ vừa qua',
  'csv.range.day': '24 giờ qua',
  'csv.range.week': '7 ngày qua',
  'csv.range.month': '30 ngày qua',
  'csv.colDate': 'Ngày',
  'csv.colTime': 'Giờ',
  'csv.colZone': 'Vùng',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'Trong khoảng đã chọn không có số đo nào cả.',
  'toast.exportFailed': 'Trình duyệt này không cho lưu tệp.',
  'toast.exportSaved': {
    other: 'Đã lưu tệp {filename} ({n} dòng).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} giờ {m} phút',
  'duration.ms': '{m} phút {s} giây',
  'duration.s': '{s} giây'
});
