/* docs/v1/i18n/vi.js — słownik WŁASNY wersji v1, wietnamski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka. Kolejność jest treścią umowy: plik wersji dokłada się do tego samego
 * obiektu i może nadpisać dowolny klucz wspólny — nigdy odwrotnie.
 *
 * DLACZEGO TEN SŁOWNIK JEST SAMOWYSTARCZALNY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar w app.js, własne
 * dwie wielkości zamiast siedmiu i własne nazwy stref („An toàn” zamiast
 * wspólnego „Trong ngưỡng”). Dlatego wszystko, co v1 pokazuje, stoi TUTAJ —
 * także klucze, które przypadkiem brzmią tak samo jak wspólne. Zestaw kluczy
 * jest dokładnie taki sam jak w pl.js tego katalogu — pilnuje tego
 * docs/shared/i18n/keys.test.js.
 *
 * TERMINOLOGIA (jeden odpowiednik na pojęcie, zgodnie z docs/shared/i18n/vi.js):
 *   udział niebieskiego  → tỷ lệ ánh sáng xanh   (kanał niebieski: kênh lam)
 *   jasność sceny        → độ sáng khung hình
 *   temperatura barwowa  → nhiệt độ màu
 *   zegar biologiczny    → đồng hồ sinh học
 *   odczyt               → lần đọc
 * Nazw pozostałych pięciu wielkości warstwy wspólnej v1 nie zna i nie używa.
 * Strefy mają WŁASNE brzmienie tej wersji: an toàn / vừa phải / có hại.
 *
 * LICZEBNIKI: Intl.PluralRules('vi') zwraca JEDNĄ kategorię — 'other'.
 * Wietnamski nie odmienia rzeczownika przez liczbę, więc obiekt form ma
 * dokładnie jeden klucz i to nie jest niedoróbka.
 *
 * JEDNOSTKI I NAZWY WŁASNE: symbole (%, K, ×, nm, s, min, h, W/m²) oraz
 * „Start”, „Stop”, CSV, D65, IEC 62471, CIE S 026, getUserMedia zostają bez
 * zmian. Nagłówek CSV zapisano bez znaków diakrytycznych — trafia do pliku,
 * który bywa otwierany w arkuszu o nieznanym kodowaniu.
 *
 * MARKUP W WARTOŚCIACH. Klucze z sufiksem .html zawierają <b>, <i>, <code>
 * i encje HTML; wstawia je data-i18n-html, czyli tylko tam, gdzie autor tekstu
 * świadomie tego chciał — nigdy do treści pochodzącej od użytkownika.
 */
window.I18nData = window.I18nData || {};
window.I18nData['vi'] = Object.assign(window.I18nData['vi'] || {}, {

  /* ---- aplikacja ---- */

  'app.name': 'Giám sát Ánh sáng Có hại',
  'app.description': 'Dùng camera đo cường độ màu xanh lam trên màn hình và vẽ nó lên một biểu đồ dễ đọc với các vùng: an toàn, vừa phải, có hại.',

  /* ---- wybór języka ---- */

  'language.label': 'Ngôn ngữ',
  'language.help': 'Ngôn ngữ của toàn bộ ứng dụng. Mọi ngôn ngữ đều đã có sẵn trên thiết bị này — không tải về thứ gì và không gửi thứ gì đi đâu cả.',
  'language.auto': 'Theo thiết bị',

  /* ---- nawigacja ---- */

  'nav.aria': 'Menu chính',
  'nav.tabsAria': 'Các màn hình của ứng dụng',
  'nav.announce': 'Màn hình: {screen}',
  'nav.camera': 'Camera',
  'nav.monitoring': 'Giám sát',
  'nav.support': 'Ủng hộ',
  'nav.more': 'Thêm',
  'nav.docs': 'Tài liệu',
  'nav.about': 'Giới thiệu và liên hệ',
  'nav.settings': 'Ngưỡng cảnh báo',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← Quay lại',
  'action.back.aria': 'Quay lại màn hình trước',
  'action.openDocs': 'Mở tài liệu',
  'action.exportCsv': 'Xuất CSV',
  'action.delete': 'Xóa',
  'action.closeNotification': 'Đóng thông báo',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref — „An toàn / Vừa phải / Có hại”, a nie
     wspólne „Trong ngưỡng / Lưu ý / Nghiêm trọng”. Wersja plakatowa
     (zone.badge.*) jest osobnym kluczem, a nie zapisem wielkimi literami przez
     CSS: wietnamskie samogłoski z dwoma znakami diakrytycznymi bywają
     kaleczone przez automatyczną zamianę. */

  'zone.good': 'An toàn',
  'zone.warning': 'Vừa phải',
  'zone.critical': 'Có hại',
  'zone.none': 'Không có dữ liệu',

  'zone.badge.good': 'AN TOÀN',
  'zone.badge.warning': 'VỪA PHẢI',
  'zone.badge.critical': 'CÓ HẠI',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'Độ sáng kênh B',
  'metric.raw.unitLabel': '% độ sáng kênh B',
  'metric.share.name': 'Tỷ lệ ánh sáng xanh',
  'metric.share.longName': 'Tỷ lệ ánh sáng xanh trong tổng ánh sáng',
  'metric.share.unitLabel': '% tỷ lệ ánh sáng xanh',
  'stat.overallBrightness': 'Độ sáng chung của khung hình',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': 'Xem trước camera',
  'camera.pressStart': 'Nhấn “Start”.',
  'camera.start': 'Start',
  'camera.stop': 'Stop',
  'camera.switch': 'Đổi camera',
  'camera.error': 'Không khởi động được camera. Hãy kiểm tra quyền dùng camera của trình duyệt rồi thử lại. ({message})',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': 'Kết quả đo hiện tại',
  'disclaimer.short': 'Kết quả gần đúng. Đây không phải là thiết bị y tế.',
  'disclaimer.more': 'Thêm',

  /* ---- wykresy ---- */

  'chart.aria': 'Biểu đồ theo thời gian',
  'chart.title': 'Biểu đồ theo thời gian ({seconds} s gần nhất)',
  'chart.empty': 'Hãy bật camera để thấy biểu đồ',
  'chart.axis.past': '-{seconds}s',
  'chart.axis.now': 'bây giờ',
  'chart.raw.aria': 'Biểu đồ độ sáng kênh B theo thời gian, có đánh dấu các vùng an toàn, vừa phải và có hại',
  'chart.share.aria': 'Biểu đồ tỷ lệ ánh sáng xanh trong tổng ánh sáng theo thời gian, có đánh dấu các vùng an toàn, vừa phải và có hại',

  /* ---- tabela odczytów ---- */

  'table.show': 'Hiện dạng bảng',
  'table.hide': 'Ẩn bảng',
  'table.caption': 'Các lần đọc gần nhất (mới nhất ở trên cùng)',
  'table.col.time': 'Thời gian',
  'table.col.zone': 'Vùng',

  /* ---- ustawienia progów ---- */

  'settings.title': 'Cài đặt ngưỡng vùng',
  'settings.boundary.critical': 'Ranh giới vàng / đỏ:',
  'settings.boundary.warning': 'Ranh giới xanh lá / vàng:',

  /* ---- historia i raport (features.js) ---- */

  'history.title': 'Lịch sử và báo cáo',
  'history.rangeAria': 'Khoảng thời gian của lịch sử',
  'history.unavailable': 'Dữ liệu lịch sử tạm thời không dùng được.',
  'history.empty': 'Không có lần đọc nào được lưu trong khoảng này. Hãy bắt đầu đo — lịch sử tự tích lũy.',
  'history.savedReadings': 'Các lần đọc đã lưu: {count}. Phân bổ thời gian theo vùng:',
  'history.zoneLine': '{zone}: {percent}% ({readings})',

  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 ngày',
  'range.30d': '30 ngày',

  'report.dailyTitle': 'Báo cáo theo ngày',
  'report.empty': 'Báo cáo sẽ xuất hiện khi có lần đọc được lưu trong khoảng đã chọn.',
  'report.dailyCaption': 'Tỷ lệ thời gian ở từng vùng, theo từng ngày',
  'report.col.day': 'Ngày',
  'report.col.week': 'Tuần',
  'report.col.readings': 'Lần đọc',
  'report.compare.day': 'So sánh ngày với ngày: {day} — {percent}% thời gian ở vùng có hại, {change}',
  'report.compare.dayPending': 'So sánh ngày với ngày sẽ xuất hiện sau ngày đo thứ hai.',
  'report.compare.week': 'So sánh tuần với tuần: {week} — {percent}% thời gian ở vùng có hại, {change}',
  'report.compare.weekPending': 'So sánh tuần với tuần sẽ xuất hiện sau tuần đo thứ hai.',
  'report.change.same': 'bằng đúng {other}.',
  'report.change.more': 'nhiều hơn {other} {points}.',
  'report.change.less': 'ít hơn {other} {points}.',
  'report.peak': 'Nhiều lần đọc ở vùng có hại nhất rơi vào khoảng từ {from} đến {to}.',
  'report.peak.none': 'Không có lần đọc nào ở vùng có hại được lưu trong khoảng này.',
  'report.weeklyTitle': 'Báo cáo theo tuần',
  'report.weeklyEmpty': 'Báo cáo theo tuần sẽ xuất hiện khi có lần đọc được lưu trong khoảng đã chọn.',
  'report.weeklyCaption': 'Tỷ lệ thời gian ở từng vùng, theo từng tuần',
  'report.weekLabel': 'Tuần {week} ({year})',
  'report.footnote': 'Các con số là tỷ lệ các lần đọc đã lưu trong khoảng đã chọn, không phải thời gian phơi sáng chính xác.',

  /* ---- profile progów ---- */

  'profiles.title': 'Hồ sơ ngưỡng',
  'profiles.empty': 'Bạn chưa lưu hồ sơ nào.',
  'profiles.itemActive': '{name} (đang dùng)',
  'profiles.applyAria': 'Áp dụng hồ sơ {name}',
  'profiles.deleteAria': 'Xóa hồ sơ {name}',
  'profiles.applied': 'Đã áp dụng hồ sơ “{name}”.',
  'profiles.deleted': 'Đã xóa hồ sơ “{name}”.',
  'profiles.saved': 'Đã lưu hồ sơ “{name}”.',
  'profiles.namePlaceholder': 'Tên hồ sơ (ví dụ Buổi tối)',
  'profiles.saveLabel': 'Lưu các ngưỡng hiện tại thành một hồ sơ',
  'profiles.saveBtn': 'Lưu hồ sơ',
  'profiles.needName': 'Hãy nhập tên hồ sơ.',
  'profiles.limit': {
    other: 'Bạn chỉ có thể lưu tối đa {n} hồ sơ. Hãy xóa một hồ sơ để thêm hồ sơ mới.'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku też — ale musi
     zostać bezpieczna dla systemu plików: bez ukośników i dwukropków. */

  'csv.header': 'thoi_gian;do_sang_B_pct;ty_le_xanh_pct;do_sang_khung_hinh_pct;vung',
  'csv.filename': 'giam-sat-anh-sang-{stamp}.csv',
  'csv.empty': 'Không có lần đọc nào để xuất. Hãy bắt đầu đo rồi thử lại.',
  'csv.done': 'Đã xuất {readings} ra tệp CSV.',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut. Wietnamski ma tu jedną formę, ale klucz
     zostaje obiektem — tego wymaga silnik i test kluczy. */

  'alert.exposure': {
    other: 'Cảnh báo ngưỡng: kết quả đo đã ở vùng có hại được {n} phút. Hãy cân nhắc nghỉ một lát hoặc giảm tỷ lệ ánh sáng xanh trên màn hình.'
  },

  'session.title': 'Tóm tắt lượt đo gần nhất',
  'session.line': 'Thời gian đo: {duration}. Các lần đọc đã lưu: {count}.',
  'session.zoneLine': '{zone}: {percent}% thời gian của lượt đo.',
  'session.endedAt': 'Tóm tắt này dành cho lượt đo kết thúc lúc {time}.',
  'session.toast': 'Lượt đo kết thúc: {duration}, {readings}, {percent}% thời gian ở vùng có hại.',

  'duration.seconds': '{n} s',
  'duration.minutesSeconds': '{minutes} min {seconds} s',

  /* ---- liczebniki ----
     Wietnamski ma jedną kategorię CLDR: 'other'. Rzeczownik nie zmienia formy
     przy żadnej liczbie, więc każdy obiekt ma dokładnie tę jedną formę.
     Formę wybiera Intl.PluralRules('vi'), nie nasza reguła. */

  'count.readings': { other: '{n} lần đọc' },
  'count.points': {
    other: '{n} điểm phần trăm'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': 'Thêm',
  'more.section.settings': 'CÀI ĐẶT',
  'more.section.help': 'TRỢ GIÚP',
  'more.thresholds.title': 'Ngưỡng cảnh báo',
  'more.thresholds.sub': 'Đặt ranh giới của các vùng an toàn, vừa phải và có hại.',
  'more.docs.title': 'Tài liệu',
  'more.docs.sub': 'Phép đo hoạt động thế nào, đơn vị, tiêu chuẩn và các vùng.',
  'more.about.title': 'Giới thiệu và liên hệ',
  'more.about.sub': 'Phiên bản, quyền riêng tư và liên hệ.',
  'more.free': 'Ứng dụng hoàn toàn miễn phí.',
  'more.supportLink': 'Bạn có thể tự nguyện ủng hộ ứng dụng.',
  'more.version': 'Phiên bản {version} · Mọi tính năng đều dùng được, không cần tài khoản và không mất phí',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': 'Giới thiệu và liên hệ',
  'about.version': 'Phiên bản {version}',
  'about.what.title': 'Ứng dụng này là gì',
  'about.what.p1': '{app} dùng camera điện thoại để đo lượng ánh sáng xanh mà cảm biến ghi nhận, rồi hiển thị nó trên hai đồng hồ đo và trên các biểu đồ có phân vùng. Mọi tính năng — đo, lịch sử, báo cáo, hồ sơ ngưỡng, cảnh báo ngưỡng, xuất CSV và Tài liệu — đều dành cho tất cả mọi người, không cần tài khoản và không mất phí.',
  'about.what.p2': 'Ứng dụng được cung cấp “nguyên trạng”, để dùng cho mục đích thông tin. Kết quả đo chỉ mang tính gần đúng và không phải là cơ sở để đưa ra quyết định về sức khỏe.',
  'about.privacy.title': 'Quyền riêng tư và dữ liệu',
  'about.privacy.p1': 'Hình ảnh từ camera chỉ được phân tích trên thiết bị của bạn và không bao giờ được gửi tới bất kỳ máy chủ nào. Chúng tôi không tạo tài khoản và không thu thập dữ liệu của bạn. Cài đặt ngưỡng, hồ sơ và lịch sử đo chỉ được lưu trong bộ nhớ của thiết bị này và trình duyệt này.',
  'about.privacy.p2': 'Ứng dụng không hiển thị quảng cáo và không kết nối ra mạng. Ngoại lệ duy nhất là nút trên màn hình “Ủng hộ”: khi bạn nhấn nó, trình duyệt sẽ mở một trang bên ngoài trong tab mới. Không có gì xảy ra cho đến khi chính bạn làm điều đó.',
  'about.contact.title': 'Liên hệ',
  'about.contact.p1': 'Góp ý, lỗi và đề xuất: [E-MAIL]. Chúng tôi trả lời ngay khi có thể — đây là một dự án được duy trì ngoài giờ làm việc.',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': 'Ủng hộ',
  'support.free.title': 'Mọi thứ đều dùng được',
  'support.free.text': 'Toàn bộ ứng dụng đều miễn phí: đo, lịch sử và báo cáo, hồ sơ ngưỡng, cảnh báo, xuất CSV và Tài liệu. Tất cả chạy được ngay, không cần tài khoản, không giới hạn và không cần internet.',
  'support.why': '{app} được làm ngoài giờ. Nếu thấy hữu ích, bạn có thể mời tôi một ly cà phê. Điều đó giúp duy trì ứng dụng và phát triển nó tiếp — cải thiện phép đo, viết thêm Tài liệu và kiểm tra trên nhiều điện thoại khác.',
  'support.nothing': 'Việc quyên góp không mở khóa bất cứ thứ gì. Không có bản tốt hơn hay kém hơn — sau khi ủng hộ, ứng dụng vẫn hoạt động y hệt. Khác biệt duy nhất là tác giả biết rằng nó đã hữu ích với ai đó.',
  'support.button': 'Mời tôi một ly cà phê',
  'support.button.aria': 'Mời tôi một ly cà phê — mở trang quyên góp trong tab mới',
  'support.pending': 'Trang quyên góp chưa được kết nối. Nút sẽ nằm ngay ở đây khi có. Đến lúc đó thì không cần làm gì cả — dù sao ứng dụng cũng hoàn toàn miễn phí.',
  'support.privacy': 'Nút này mở một trang bên ngoài (Buy Me a Coffee) trong tab trình duyệt mới. Đó là lúc duy nhất có thứ gì đó rời khỏi thiết bị này. Hình ảnh từ camera và mọi kết quả đo của bạn vẫn ở lại đây — chúng không được gửi đi đâu cả, dù trước hay sau khi bạn nhấn.',
  'support.privacyPending': 'Khi đã có địa chỉ, việc nhấn nút sẽ mở một trang bên ngoài (Buy Me a Coffee) trong tab trình duyệt mới. Đó sẽ là lúc duy nhất có thứ gì đó rời khỏi thiết bị này. Hình ảnh từ camera và mọi kết quả đo của bạn vẫn ở lại đây — chúng không được gửi đi đâu cả.',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem .html, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': 'Tài liệu',

  'disclaimer.title': 'Đây không phải là thiết bị y tế',
  'disclaimer.body.docs': 'Ứng dụng này không phải là thiết bị y tế. Nó không dùng để chẩn đoán, điều trị hay phòng ngừa bất kỳ bệnh nào. Kết quả đo bằng camera điện thoại chỉ mang tính gần đúng và không thay thế việc khám hay lời khuyên của bác sĩ. Về các vấn đề sức khỏe của mắt, hãy hỏi ý kiến bác sĩ hoặc chuyên viên đo thị lực. Ngưỡng của các vùng trong ứng dụng này không tái hiện bất kỳ tiêu chuẩn an toàn nào — chi tiết ở chương 3.',
  'disclaimer.body.about': 'Ứng dụng này không phải là thiết bị y tế. Nó không dùng để chẩn đoán, điều trị hay phòng ngừa bất kỳ bệnh nào. Kết quả đo bằng camera điện thoại chỉ mang tính gần đúng và không thay thế việc khám hay lời khuyên của bác sĩ. Về các vấn đề sức khỏe của mắt, hãy hỏi ý kiến bác sĩ hoặc chuyên viên đo thị lực. Ngưỡng của các vùng trong ứng dụng này không tái hiện bất kỳ tiêu chuẩn an toàn nào — chi tiết trong Tài liệu, chương 3.',

  'doc.toc.aria': 'Mục lục tài liệu',
  'doc.toc.title': 'Mục lục',

  'doc.ch1.title': 'Bắt đầu nhanh',
  'doc.ch2.title': 'Phép đo hoạt động thế nào',
  'doc.ch3.title': 'Đơn vị và tiêu chuẩn',
  'doc.ch4.title': 'Vùng và ngưỡng',
  'doc.ch5.title': 'Khác biệt giữa các thiết bị',

  'doc.ch1.heading': '1. Bắt đầu nhanh',
  'doc.ch2.heading': '2. Phép đo hoạt động thế nào',
  'doc.ch3.heading': '3. Đơn vị và tiêu chuẩn',
  'doc.ch4.heading': '4. Vùng và ngưỡng',
  'doc.ch5.heading': '5. Khác biệt giữa các thiết bị',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': 'Đo thế nào cho chính xác hơn',
  'doc.ch1.tips.li1': 'Trên màn hình “Camera” (nút đầu tiên ở thanh dưới) hãy nhấn “Start” và hướng camera sau vào màn hình hoặc nguồn sáng bạn muốn kiểm tra.',
  'doc.ch1.tips.li2': 'Chuyển sang màn hình “Giám sát” (nút thứ hai ở thanh dưới) — phía trên bạn sẽ thấy cả hai đồng hồ đo cùng lúc, còn bên dưới (cuộn xuống) là các biểu đồ thay đổi theo thời gian. Phép đo vẫn chạy nền bất kể bạn đang xem màn hình nào.',
  'doc.ch1.tips.li3': 'Hãy giữ điện thoại ở khoảng cách cố định với màn hình (ví dụ 15–20 cm), không thay đổi ánh sáng xung quanh trong lúc đo.',
  'doc.ch1.tips.li4': 'Hãy dùng camera sau — cơ chế hiệu chỉnh tự động của nó ít can thiệp hơn camera trước.',
  'doc.ch1.tips.li5': 'Hãy coi kết quả là chỉ báo tương đối (%), không phải đơn vị vật lý tuyệt đối — hãy so sánh chúng với nhau (ví dụ bật và tắt chế độ ban đêm).',
  'doc.ch1.tips.li6': 'Hãy chỉnh ngưỡng của các vùng trong cài đặt cho hợp với độ sáng màn hình của chính bạn (chương 4).',

  'doc.ch1.fonts.title': 'Chữ lớn và đồng hồ đo — luôn luôn',
  'doc.ch1.fonts.p1': 'Toàn bộ ứng dụng dùng phông chữ lớn, dễ đọc và đồng hồ đo cỡ đầy đủ, để người kém thị lực (và tất cả những người khác) đọc được số liệu mà không cần cài đặt thêm. Trên màn hình “Giám sát”, cả hai đồng hồ đo nằm gọn cùng nhau trên một màn hình, không phải cuộn — các biểu đồ thay đổi theo thời gian nằm ngay bên dưới, cách một lần cuộn.',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': 'Camera điện thoại so với máy quang phổ',
  'doc.ch2.spectro.p1.html': 'Việc đo thật sự “có bao nhiêu ánh sáng xanh có hại” đòi hỏi phải tách ánh sáng theo bước sóng — đó là việc của <b>máy quang phổ</b>: một lăng kính hoặc cách tử nhiễu xạ tán sắc ánh sáng thành hàng chục/hàng trăm dải hẹp (ví dụ mỗi 1–5 nm) và đo công suất quang trong từng dải riêng. Chỉ từ một phân bố phổ đầy đủ như vậy mới tính được những đơn vị như lux, lumen hay bức xạ chiếu có trọng số theo hàm nguy hại của ánh sáng xanh.',
  'doc.ch2.spectro.p2.html': '<b>Camera điện thoại không làm bất kỳ điều nào trong số đó.</b> Nó có ba bộ lọc rộng (Bayer: R/G/B), mỗi bộ thu ánh sáng từ một dải bước sóng rộng và chồng lấn nhau — “kênh lam” không phải là dải hẹp quanh 435–440 nm (đỉnh nguy hại đối với võng mạc), mà đại khái là 400–570 nm trộn lẫn với màu lục. Trên đường đi còn có khử khảm, phơi sáng tự động, cân bằng trắng tự động và nén gamma sRGB — trình duyệt không cho tắt hoàn toàn bước nào trong số đó. Kết quả là giá trị điểm ảnh mà JavaScript nhìn thấy không liên hệ tuyến tính với công suất quang thực sự chiếu lên cảm biến. Đó là giới hạn cơ bản của phần cứng, không phải lỗi của ứng dụng này.',

  'doc.ch2.raw.title': 'Biểu đồ 1 — Độ sáng kênh B',
  'doc.ch2.raw.what.html': '<b>Nó cho thấy gì:</b> độ sáng trung bình của riêng kênh lam (B) trên phần hình ảnh được lấy mẫu, theo thang 0–255 quy đổi ra %.',
  'doc.ch2.raw.algo.html': '<b>Thuật toán:</b>',
  'doc.ch2.raw.step1': 'Mỗi giây chúng tôi lấy 5 khung hình từ camera.',
  'doc.ch2.raw.step2': 'Chúng tôi cắt lấy 60% ở giữa khung hình (tránh được mép ảnh và ánh sáng lóa từ hai bên).',
  'doc.ch2.raw.step3': 'Chúng tôi thu nhỏ phần đã cắt về lưới 32×32 điểm ảnh (đủ chính xác và nhanh hơn nhiều so với tính ở độ phân giải đầy đủ — điều này quan trọng trên phần cứng yếu như Xiaomi hay Ulefone hạng phổ thông).',
  'doc.ch2.raw.step4': 'Chúng tôi lấy trung bình giá trị B của cả 1024 điểm ảnh trên lưới đó.',
  'doc.ch2.raw.step5.html': '<code>kết_quả = trung_bình_B ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>Vì sao chúng tôi giữ lại nó:</b> đây là cách đọc đơn giản và trực tiếp nhất về “cảm biến ghi nhận được bao nhiêu tín hiệu xanh nói chung”. Nhược điểm là nó trộn lẫn độ sáng với màu sắc — một khung cảnh rất sáng nhưng trắng trung tính cũng cho kết quả cao, dù nó không đặc biệt “xanh”. Vì thế bên cạnh nó chúng tôi hiển thị biểu đồ 2.',

  'doc.ch2.share.title': 'Biểu đồ 2 — Tỷ lệ ánh sáng xanh trong tổng ánh sáng',
  'doc.ch2.share.what.html': '<b>Nó cho thấy gì:</b> thành phần xanh lam chiếm bao nhiêu phần trăm toàn bộ ánh sáng ghi nhận được (R+G+B) — tức là mức dịch chuyển màu về phía lạnh, bất kể khung cảnh sáng đến đâu.',
  'doc.ch2.share.algo.html': '<b>Thuật toán:</b> vẫn là các bước 1–4 như trên, nhưng thay vì riêng B, chúng tôi tính:',
  'doc.ch2.share.formula.html': '<code>kết_quả = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': 'Trắng trung tính (R≈G≈B) cho khoảng <b>33%</b>. Ánh sáng ấm hơn/đỏ hơn — ít hơn. Ánh sáng xanh đậm — nhiều hơn, tới giới hạn ~100% với ánh sáng gần như thuần xanh lam.',
  'doc.ch2.share.why.html': '<b>Vì sao đây là thước đo chính xác hơn về “ánh sáng xanh có hại”:</b> đó cũng chính là nguyên tắc mà các bộ lọc kiểu chế độ ban đêm / Night Shift hoạt động — điều quan trọng là <b>màu sắc</b>, không phải độ sáng. Một màn hình rất sáng nhưng trung tính sẽ không bị đánh dấu nhầm là có hại; còn màn hình mờ nhưng xanh đậm thì có. Vì thế đây chính là đại lượng quyết định màu của vùng trong bảng các lần đọc.',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': 'Vì sao không dùng lux hay lumen',
  'doc.ch3.units.p1.html': '<b>Lumen (lm)</b> mô tả tổng quang thông phát ra từ một nguồn — đó là tính chất của bản thân nguồn sáng, không phải của thứ chiếu tới một điểm nhất định. <b>Lux (lx)</b> thì đã là độ rọi tại một điểm (lm/m²) — gần hơn với điều chúng ta quan tâm, nhưng vẫn là đơn vị <b>trắc quang</b>: nó lấy trọng số phổ theo đường cong độ nhạy sáng của mắt người (V(λ)), chứ không theo đường cong nguy hại của ánh sáng xanh. Muốn đo thật sự mức nguy hại thì cần một đơn vị thứ ba, hẹp hơn: bức xạ chiếu có trọng số phổ tính bằng <b>W/m²</b> (tiêu chuẩn IEC 62471, đỉnh độ nhạy khoảng 435–440 nm), và điều đó đòi hỏi máy quang phổ — xem mục ở trên.',
  'doc.ch3.units.p2.html': 'Ngay cả khi chỉ dừng ở lux: một chiếc điện thoại không có cảm biến ánh sáng ngoài đã hiệu chuẩn thì không thể xác định chúng một cách đáng tin cậy. Cảm biến ánh sáng tích hợp của điện thoại (ở nơi có nó) dù sao cũng đo ánh sáng ở <b>phía đối diện</b> của thân máy so với phía bạn hướng camera sau vào màn hình — nghĩa là nó sẽ đo ánh sáng sau lưng bạn, chứ không phải ánh sáng từ màn hình. Vì thế, thay vì đoán một con số theo đơn vị mà dù sao cũng không đáng tin, chúng tôi hiển thị một <b>chỉ báo tương đối (%)</b> được ghi rõ một cách trung thực — có ý nghĩa để so sánh trên cùng một điện thoại trong cùng điều kiện (ví dụ bật và tắt chế độ ban đêm), chứ không phải như một giá trị tuyệt đối.',

  'doc.ch3.norms.title': 'Có tiêu chuẩn toàn cầu nào cho ngưỡng an toàn không?',
  'doc.ch3.norms.p1.html': 'Ngắn gọn: <b>không có tiêu chuẩn nào diễn đạt bằng phần trăm của một kênh camera</b> — đó hoàn toàn không phải là đơn vị mà người ta dùng để quy định bất cứ điều gì. Các tiêu chuẩn thật sự về ánh sáng xanh thì có tồn tại, nhưng chúng đo những đại lượng khác, bằng những đơn vị khác, và liên quan tới một hiện tượng khác với điều người ta thường nghĩ tới khi nói “ánh sáng xanh làm mỏi mắt”.',
  'doc.ch3.norms.p2.html': '<b>Tổn thương quang hóa cấp tính ở võng mạc — IEC 62471 / ICNIRP.</b> Đây là “mức nguy hại của ánh sáng xanh” duy nhất thật sự được quy định — một tiêu chuẩn cho đèn và hệ thống chiếu sáng, được hậu thuẫn bởi hướng dẫn của ICNIRP (Ủy ban Quốc tế về Bảo vệ khỏi Bức xạ Không Ion hóa). Nó xếp các nguồn sáng vào những nhóm rủi ro RG0–RG3 dựa trên độ chói có trọng số theo hàm nguy hại B(λ), tính bằng <b>W·m⁻²·sr⁻¹</b>, kèm giới hạn thời gian phơi sáng (<code>t_max = 100 / L_B</code> giây). Màn hình điện thoại và màn hình máy tính — kể cả ở độ sáng tối đa — trên thực tế hầu như luôn nằm trong <b>RG0 (được miễn, không có hạn chế)</b>. Tiêu chuẩn đó áp dụng cho những nguồn sáng mạnh hơn nhiều (hồ quang hàn, một số máy chiếu, đèn LED công nghiệp), không phải cho màn hình tiêu dùng.',
  'doc.ch3.norms.p3.html': '<b>Ảnh hưởng đến nhịp sinh học và giấc ngủ — CIE S 026.</b> Đây mới là hiện tượng người ta thường muốn nói đến (màn hình buổi tối làm “tỉnh ngủ”) — nhưng đó không phải là tổn thương mắt, mà là tác động lên đồng hồ sinh học thông qua các tế bào hạch võng mạc (ipRGC), nhạy nhất ở khoảng 480 nm. Tiêu chuẩn CIE S 026:2018 định nghĩa đơn vị <b>lux melanopic (melanopic EDI)</b>. Thứ gần nhất với đồng thuận khoa học “chính thức” là bài báo của Brown và cộng sự (<i>PLOS Biology</i>, 2022), khuyến nghị một cách định hướng: buổi tối &lt; 10 lux melanopic, ban ngày &gt; 250. Đó là khuyến nghị của các nhà nghiên cứu giấc ngủ, không phải quy định pháp luật.',
  'doc.ch3.norms.p4.html': '<b>WHO.</b> Tổ chức Y tế Thế giới không công bố những giới hạn phơi nhiễm ánh sáng xanh riêng, độc lập của mình — về an toàn bức xạ quang học, tổ chức này dẫn chiếu tới ICNIRP (ở trên). Văn bản cụ thể duy nhất do chính WHO soạn về màn hình là <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i> (2019) — nhưng nó nói về <b>thời gian</b> ngồi trước màn hình, chứ không về màu hay cường độ ánh sáng: không màn hình với trẻ dưới 1 tuổi, tối đa 1 giờ với trẻ 2–4 tuổi. Với người lớn, WHO không có hướng dẫn bằng con số cụ thể tương đương.',
  'doc.ch3.norms.p5.html': '<b>Vì sao điều đó vẫn không giúp hiệu chuẩn ứng dụng:</b> cả hai nhóm tiêu chuẩn (IEC/ICNIRP và CIE) đều đòi hỏi phân bố phổ đầy đủ và độ chói đã hiệu chuẩn trong một hình học đo đã biết — đúng thứ mà điện thoại qua trình duyệt không thể cung cấp (xem mục “Camera điện thoại so với máy quang phổ” ở trên). Không tồn tại phép quy đổi “tỷ lệ ánh sáng xanh 33% = X lux melanopic”, nên các ngưỡng trong ứng dụng này <b>không tái hiện bất kỳ tiêu chuẩn an toàn nào</b> (WHO, IEC, ICNIRP hay CIE — với chỉ báo này thì đơn giản là không có). Bù lại, các giá trị ngưỡng mặc định của tỷ lệ ánh sáng xanh được suy ra từ nhiệt độ màu thực tế của ánh sáng và từ khuyến nghị thực dụng, được nhắc lại rộng rãi, về ánh sáng ấm vào buổi tối — một cơ sở vững hơn so với việc làm tròn thông thường, nhưng vẫn chưa phải tiêu chuẩn chính thức (suy luận đầy đủ: chương 4). Bạn luôn có thể đổi chúng thành ngưỡng của riêng mình trong cài đặt.',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': 'Các vùng màu và ngưỡng đến từ đâu',
  'doc.ch4.zones.p1.html': 'Cả hai đại lượng đều có ngưỡng riêng, đặt độc lập với nhau (màn hình “Giám sát” → “Cài đặt ngưỡng vùng”, ở cuối trang) — 33%/66% ở đại lượng này không có nghĩa như ở đại lượng kia (xem chương 2 ở trên). Chính <b>tỷ lệ ánh sáng xanh</b> quyết định màu trong chú giải dưới các biểu đồ và trong bảng các lần đọc:',
  'doc.ch4.zones.li1.html': '<b>Xanh lá — an toàn:</b> ánh sáng ấm hoặc trung tính, mắt được nghỉ ngơi.',
  'doc.ch4.zones.li2.html': '<b>Vàng — vừa phải:</b> màu đã dịch chuyển thấy rõ về phía xanh lam, nên nghỉ giải lao.',
  'doc.ch4.zones.li3.html': '<b>Đỏ — có hại:</b> ánh sáng xanh mạnh, gây mỏi mắt rõ rệt khi phơi sáng lâu (nhất là vào buổi tối).',
  'doc.ch4.zones.p2.html': '<b>Những con số cụ thể này đến từ đâu.</b> <b>Độ sáng kênh B</b> không có điểm quy chiếu tự nhiên — giá trị ngưỡng hợp lý phụ thuộc hoàn toàn vào việc khung cảnh bạn đang quay sáng đến mức nào (đây là thước đo độ sáng, không phải màu sắc). Mức mặc định 33%/66% ở đây vẫn chỉ là điểm xuất phát quy ước — hãy thử dần để chỉnh nó cho hợp với độ sáng thường thấy của màn hình và môi trường quanh bạn.',
  'doc.ch4.zones.p3.html': '<b>Tỷ lệ ánh sáng xanh</b> có các ngưỡng mặc định suy ra từ nhiệt độ màu thực tế của ánh sáng (vật lý, không phải làm tròn), chứ không từ tiêu chuẩn an toàn nào — với đại lượng này không có tiêu chuẩn như vậy (chương 3). Các điểm quy chiếu:',
  'doc.ch4.zones.li4.html': '<b>~4000K</b> (“trắng ấm”, bóng đèn LED thông dụng) → khoảng <b>26%</b> tỷ lệ ánh sáng xanh. Ánh sáng ấm hơn mức đó (nhiệt độ màu thấp hơn) là dải được các công cụ như f.lux hay Night Shift khuyến nghị rộng rãi cho buổi tối — vì thế mới có ngưỡng dưới.',
  'doc.ch4.zones.li5.html': '<b>6500K (D65)</b>, điểm trắng chuẩn của phần lớn màn hình điện thoại và màn hình máy tính khi xuất xưởng — khoảng <b>33%</b>. Từ giá trị đó trở lên bắt đầu dải mà người ta thường đưa ra khuyến nghị hạn chế ánh sáng xanh — vì thế mới có ngưỡng trên.',
  'doc.ch4.zones.p4.html': '<b>Một lưu ý quan trọng:</b> ánh sáng “xanh” đến mức nào thì không phụ thuộc vào thời điểm trong ngày, nhưng các khuyến nghị hạn chế ánh sáng xanh thật ra chỉ liên quan tới <b>buổi tối và ban đêm</b> — ban ngày, việc tiếp xúc với ánh sáng lạnh, xanh (kể cả ánh nắng) là bình thường, thậm chí còn có lợi cho nhịp sinh học. Vùng đỏ vào giữa ban ngày khi nhìn một màn hình thông thường, không chỉnh sửa gì không có nghĩa là có nguy hại thật sự — cũng ánh sáng đó vào buổi tối thì đã đáng hạn chế.',
  'doc.ch4.zones.p5.html': 'Ngưỡng của hai đại lượng hoàn toàn độc lập — thay đổi cái này không ảnh hưởng tới cái kia. Ngưỡng đã thay đổi được <b>ghi nhớ trên thiết bị này và trong trình duyệt này</b> giữa các lần mở ứng dụng (cục bộ, không có gì được gửi đi đâu cả) — nút “Start” không đặt lại chúng về mặc định.',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': 'Vì sao phần xem trước trông khác nhau trên các thiết bị khác nhau',
  'doc.ch5.devices.p1.html': '<b>Trình duyệt so với ứng dụng camera gốc.</b> Khi bạn mở ứng dụng camera cài sẵn trên điện thoại, nhà sản xuất (ví dụ Xiaomi) bổ sung vào phần xem trước trực tiếp những thuật toán riêng của họ — HDR thời gian thực, tăng cường độ sáng bằng kỹ thuật số trong điều kiện thiếu sáng, làm mịn. Một trang web nhận được qua trình duyệt luồng hình “thô” hơn nhiều từ camera (hàm <code>getUserMedia</code>), không có bất kỳ cải thiện nào trong số đó — nên về nguyên tắc nó sẽ trông phẳng và tối hơn so với ứng dụng camera gốc, bất kể là điện thoại nào.',
  'doc.ch5.devices.p2.html': '<b>Khả năng điều khiển camera khác nhau.</b> Việc trình duyệt được hệ thống trao bao nhiêu quyền kiểm soát phơi sáng và cân bằng trắng phụ thuộc vào từng điện thoại cụ thể, vào trình điều khiển camera và vào phiên bản Chrome/WebView — một số thiết bị (thường là máy tính có camera USB) chỉ báo có chế độ tự động hoàn toàn, số khác (một phần điện thoại Android) báo thêm những chế độ nâng cao hơn. Phiên bản trước của ứng dụng này từng cố chuyển sang chế độ phơi sáng thủ công ở nơi điện thoại cho phép, mà không đặt một giá trị cụ thể — điều đó trên một số điện thoại đã đóng băng hình ảnh ở mức phơi sáng tối, ngẫu nhiên tại thời điểm khởi động camera. Đó là lỗi trong mã nguồn (đã sửa), không phải khác biệt về đơn vị — nhưng nó cho thấy rõ hành vi có thể khác nhau giữa các thiết bị dễ đến mức nào, khi mà ngay cả cùng một dòng mã cũng chỉ có tác dụng trên một phần trong số chúng.',
  'doc.ch5.devices.p3.html': '<b>Cảm biến và xử lý ảnh (ISP) khác nhau.</b> Ngay cả với mã nguồn giống hệt và cùng một khung cảnh, các mẫu điện thoại khác nhau có cảm biến chất lượng khác nhau và cơ chế tự động của nhà sản xuất được tinh chỉnh khác nhau — máy này sẽ chọn được mức phơi sáng trong điều kiện thiếu sáng nhanh và chuẩn hơn máy kia. Điều đó, cộng với việc các chỉ báo trong ứng dụng này là <b>tương đối</b> (xem chương 3), có nghĩa là: hãy so sánh kết quả (và cả vẻ ngoài của phần xem trước) trên cùng một điện thoại theo thời gian, chứ không phải giữa các mẫu máy hay thiết bị khác nhau.'
});
