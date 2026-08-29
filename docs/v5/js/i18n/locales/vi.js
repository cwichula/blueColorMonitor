/* Monitor Światła v5 — słownik wietnamski (Tiếng Việt).
 *
 * TREŚĆ wzięta z pl.js, TERMINOLOGIA i rejestr — z en.js. Nie jest to kalka
 * żadnego z nich: wietnamskie zdanie buduje się inaczej (określenie stoi za
 * rzeczownikiem, czasownik nie ma czasu gramatycznego), więc przekładany był
 * sens, a nie szyk. Bez zmian zostało to, co niesie znaczenie: liczby, progi,
 * jednostki, nazwy wstawek oraz — CO DO TREŚCI — zastrzeżenia medyczne
 * i zdania o prywatności. Tych ostatnich nie wolno osłabiać ani wzmacniać:
 * „nie zastępuje rozmowy z lekarzem” ma po wietnamsku znaczyć dokładnie tyle
 * samo, a „obraz nie opuszcza urządzenia” nie może stać się obietnicą szerszą
 * niż polska.
 *
 * TERMINOLOGIA siedmiu wielkości (trzymana bez wyjątków, także w tekstach
 * pomocy i w zdaniach opisowych):
 *   tỷ lệ ánh sáng xanh (udział niebieskiego), độ sáng khung cảnh (jasność
 *   sceny), nhiệt độ màu (temperatura barwowa), ảnh hưởng nhịp sinh học (wpływ
 *   na rytm dobowy; w opisie: tỷ lệ melanopic — współczynnik melanopiczny),
 *   nhấp nháy (migotanie), độ đồng đều (równomierność), tiện nghi thị giác
 *   (komfort wzrokowy — przyjęty termin oświetleniowy).
 * KANAŁY OBRAZU: đỏ / lục / lam — tak wietnamski nazywa składowe RGB. Dlatego
 * „kanał niebieski” to kênh lam, a nazwa wielkości mówi o ánh sáng xanh, czyli
 * o świetle niebieskim w znaczeniu potocznym; oba wyrażenia trzymają się
 * swoich miejsc konsekwentnie.
 * STREFY: an toàn / vừa phải / có hại — mówią o świetle, a nie o stanie
 * aplikacji, i wchodzą w zdanie „vùng: {zone}”.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Tekst ze wstawką {nazwa}'   — napis zwykły,
 *   'klucz.kropkowany': { other }                    — forma zależna od liczby.
 * Wietnamski ma w CLDR JEDNĄ kategorię liczebnika: `other`
 * (new Intl.PluralRules('vi').resolvedOptions().pluralCategories). Rzeczownik
 * się nie odmienia; formą jest samo słowo, bo format.plural() skleja „liczba
 * + spacja + wartość formy”, więc wychodzi „3 phiên đo” i „12 mẫu”.
 * Nazwy wstawek są identyczne jak w pl.js — pilnuje tego keys.test.js.
 * Kolejność wstawek w zdaniu wolno zmieniać, nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Giám sát Ánh sáng',
  'app.description': 'Giám sát Ánh sáng — dùng camera đo bảy đại lượng của ánh sáng quanh bạn. Mọi thứ được tính ngay trên thiết bị này, không có gì gửi lên mạng.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Giám sát Ánh sáng',
  'app.skipToContent': 'Chuyển đến nội dung',
  'app.nav.aria': 'Điều hướng chính',
  'app.noscript.title': 'Ứng dụng này cần JavaScript',
  'app.noscript.text': 'Toàn bộ phép đo diễn ra ngay trong thẻ trình duyệt này: JavaScript đọc từng khung hình từ camera và tính ra bảy đại lượng ánh sáng. Không có nó thì không có gì để đo. Hãy bật JavaScript cho trang này rồi mở lại — vẫn sẽ không có gì được gửi lên mạng.',

  'nav.measure': 'Đo',
  'nav.history': 'Lịch sử',
  'nav.tools': 'Công cụ',
  'nav.support': 'Ủng hộ',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Đang đo',
  'shell.live.aria': 'Đang đo. {metric}: {value}. Quay lại màn hình đo.',
  'shell.live.metricFallback': 'Đại lượng chính',
  'shell.action.fallback': 'Thao tác màn hình',

  'shell.loadFail.title': 'Không tải được màn hình “{screen}”',
  'shell.loadFail.text': 'Có lẽ bộ nhớ thiết bị thiếu một phần tệp. Hãy kết nối mạng rồi tải lại trang.',
  'shell.fatal.title': 'Có gì đó không ổn',
  'shell.fatal.text': 'Ứng dụng không dựng được màn hình. Tải lại trang thường là đủ — các phép đo đã lưu và các thiết lập vẫn còn nguyên.',
  'shell.fatal.reload': 'Tải lại trang',
  'shell.boot.failTitle': 'Không khởi động được ứng dụng',
  'shell.boot.failText': 'Khung ứng dụng không khởi động. Hãy tải lại trang — các phép đo đã lưu và các thiết lập vẫn còn nguyên.',
  'shell.background.error': 'Có gì đó hỏng ở chế độ nền',
  'shell.background.action': 'Tải lại',
  'shell.update.title': 'Đã có phiên bản mới',
  'shell.update.action': 'Tải lại',

  'onboarding.title': 'Trước khi bắt đầu',
  'onboarding.lead': 'Giám sát Ánh sáng dùng camera nhìn vào ánh sáng quanh bạn và tính ra bảy đại lượng — từ tỷ lệ ánh sáng xanh đến tiện nghi thị giác.',
  'onboarding.privacy': 'Hình ảnh không rời khỏi thiết bị này: không có máy chủ, không có tài khoản và không có gì để tải lên. Cả bảy đại lượng đều dùng được ngay, không cần đăng nhập và không mất phí.',
  'onboarding.honesty': 'Đây là chỉ dẫn sơ bộ, không phải thiết bị đo và cũng không phải xét nghiệm y tế. Cái gì không đo được thì không hiển thị — thay cho con số bạn sẽ thấy một dấu gạch.',
  'onboarding.start': 'Bắt đầu thôi',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Áp dụng',
  'overlay.toast.close': 'Đóng thông báo',
  'overlay.sheet.label': 'Hộp thoại',
  'overlay.sheet.close': 'Đóng',
  'overlay.dialog.confirm': 'Xác nhận',
  'overlay.dialog.cancel': 'Hủy',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'Hủy',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'Đo',

  'measure.intro.aria': 'Bắt đầu một phép đo',
  'measure.intro.headline': 'Xem thứ ánh sáng đang chiếu vào bạn',
  'measure.intro.lead': 'Camera cho biết trong thứ ánh sáng đang chiếu vào bạn có bao nhiêu màu xanh — và vào giờ này trong ngày thì như vậy có nhiều quá hay không.',
  'measure.intro.start': 'Bắt đầu đo',
  'measure.intro.hint': 'Trình duyệt sẽ hỏi quyền dùng camera. Phép đo chạy ngay khi bạn cấp quyền.',
  'measure.intro.privacy': 'Hình ảnh từ camera được xử lý ngay trên thiết bị này và không bao giờ rời khỏi nó. Chúng tôi không gửi, không lưu và không chia sẻ bất kỳ khung hình nào.',
  'measure.intro.honesty': 'Đây không phải thiết bị y tế và cũng không phải một xét nghiệm. Ứng dụng chỉ đưa ra ước lượng về ánh sáng quanh bạn; nó không phán xét sức khỏe và không thay thế cuộc trò chuyện với bác sĩ.',

  'measure.live.aria': 'Phép đo đang diễn ra',
  'measure.badge.starting': 'Đang khởi động',
  'measure.badge.paused': 'Đã tạm dừng',
  'measure.badge.running': 'Đang đo',
  'measure.stale': 'Đang chờ hình ảnh — bản xem trước đứng yên khi ứng dụng chạy ở chế độ nền.',
  'measure.crop': 'Chúng tôi đo phần giữa khung hình — {percent}% chiều rộng và chiều cao đã được đánh dấu.',
  'measure.facing.front': 'camera trước',
  'measure.facing.back': 'camera sau',

  'measure.boot.title': 'Đang khởi động camera…',
  'measure.boot.text': 'Nếu trình duyệt hỏi quyền, hãy cấp — không có hình ảnh thì không có gì để đo. Quyền này chỉ áp dụng cho trang này và bạn có thể thu hồi sau.',
  'measure.boot.cancel': 'Hủy',

  'measure.hold': 'Số đo đang bị đóng băng. Camera vẫn chạy, nhưng không có gì vào lịch sử hay vào giá trị trung bình.',
  'measure.gridHint': 'Chọn một ô để đưa đại lượng đó lên đồng hồ lớn.',

  'measure.stop': 'Dừng',
  'measure.pause': 'Tạm dừng',
  'measure.resume': 'Tiếp tục',
  'measure.flip.aria': 'Đổi camera',
  'measure.flip.toBack': 'Chuyển sang camera sau',
  'measure.flip.toFront': 'Chuyển sang camera trước',

  'measure.fail.aria': 'Lỗi camera',
  'measure.fail.headline': 'Camera không khởi động được',
  'measure.fail.retry': 'Thử lại',
  'measure.fail.back': 'Quay lại',
  'measure.fail.savedSession': 'Phiên đo trước lúc bị gián đoạn ({duration}) đã được lưu vào lịch sử.',
  'measure.error.fallback': 'Không khởi động được camera.',

  'measure.summary.aria': 'Tóm tắt phiên đo',
  'measure.summary.title': 'Tóm tắt phiên đo',
  'measure.summary.paused': 'tạm dừng {duration}',
  'measure.summary.nothingMeasured': 'Không đại lượng nào thu được số đo — suốt phiên camera không nhìn thấy ánh sáng.',
  'measure.summary.note': 'Giá trị trung bình chỉ tính những mẫu nằm ngoài lúc tạm dừng. Đại lượng không đo được thì bị bỏ qua, chứ không tính bằng 0.',
  'measure.summary.nearThreshold': 'Gần ngưỡng nhất',
  'measure.summary.worstPoint': 'Điểm yếu nhất',
  'measure.summary.averageZone': 'trung bình ở mức {zone}',
  'measure.summary.tooShort': 'Phiên đo kéo dài {duration} — quá ngắn để tự vào lịch sử. Bạn có thể lưu bằng tay.',
  'measure.summary.again': 'Đo lại',
  'measure.summary.save': 'Lưu vào lịch sử',
  'measure.summary.saved': 'Đã lưu vào lịch sử',
  'measure.summary.savedToast': 'Đã lưu phiên đo vào lịch sử.',
  'measure.summary.close': 'Đóng',

  'measure.method.title': 'Chúng tôi đo thế nào',
  'measure.method.p1': 'Ứng dụng lấy mẫu hình ảnh từ camera mười lần mỗi giây và tính các đại lượng từ {percent}% ở giữa khung hình — khung ngắm trong bản xem trước đánh dấu đúng vùng đó.',
  'measure.method.p2': 'Camera điện thoại có ba kênh màu rộng cùng cơ chế tự động chỉnh phơi sáng và cân bằng trắng của riêng nó. Nó thấy tỷ lệ giữa các thành phần của ánh sáng, chứ không thấy quang phổ.',
  'measure.method.p3': 'Tỷ lệ ánh sáng xanh, độ sáng, nhấp nháy và độ đồng đều là những gì camera thực sự đo được. Nhiệt độ màu và ảnh hưởng nhịp sinh học là các phép xấp xỉ được nói rõ, tính từ các màu cơ bản sRGB.',
  'measure.method.p4': 'Chỉ nhìn thấy được nhấp nháy dưới bốn hertz. Nhấp nháy 100 Hz của điện lưới nằm xa ngoài tầm với của tốc độ lấy mẫu này và sẽ không bao giờ được báo là một số đo.',
  'measure.method.p5': 'Không con số nào trong đây là phép đo trắc quang hay một kết quả y tế. Hình ảnh từ camera không rời khỏi thiết bị.',
  'measure.method.ok': 'Đã hiểu',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'Đã hủy việc khởi động camera.',
  'measure.announce.stoppedNoSamples': 'Đã dừng đo. Không thu được mẫu nào.',
  'measure.announce.stopped': 'Đã dừng đo. Bản tóm tắt phiên đo đã sẵn sàng.',
  'measure.announce.interrupted': 'Phép đo bị gián đoạn. Bản tóm tắt phiên đo đã sẵn sàng.',
  'measure.announce.paused': 'Đã tạm dừng đo. Số đo bị đóng băng.',
  'measure.announce.resumed': 'Đã tiếp tục đo.',
  'measure.announce.switchedFront': 'Đã chuyển sang camera trước. Một phiên đo mới bắt đầu.',
  'measure.announce.switchedBack': 'Đã chuyển sang camera sau. Một phiên đo mới bắt đầu.',
  'measure.announce.lead': 'Đại lượng chính: {metric}.',
  'measure.announce.cameraError': 'Lỗi camera. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'Ánh sáng nằm trong khoảng an toàn suốt cả phiên — cứ để đèn như vậy và kiểm tra lại sau khi trời tối, khi một nguồn sáng khác hoạt động.',
  'measure.advice.share.evening': 'Tỷ lệ ánh sáng xanh trung bình là {value} — hãy bật chế độ ban đêm trên màn hình và tắt đèn trần, chỉ để lại một đèn ấm ngang tầm bàn.',
  'measure.advice.share.day': 'Tỷ lệ ánh sáng xanh trung bình là {value} — ban ngày thì chấp nhận được, nhưng hãy đặt màn hình tự chuyển sang tông ấm hai giờ trước khi ngủ.',
  'measure.advice.brightness': 'Khung hình bị dư sáng (trung bình {value}) — hãy tránh xa nguồn sáng hoặc giảm độ sáng của màn hình đang đo, vì ở mức phơi sáng đó các đại lượng còn lại cũng mất độ chính xác.',
  'measure.advice.kelvin.evening': 'Nhiệt độ màu giữ ở mức trung bình {value} — sau khi trời tối hãy xuống dưới 3000 K: chuyển đèn sang chế độ ấm hoặc lắp bóng 2700 K.',
  'measure.advice.kelvin.day': 'Nhiệt độ màu giữ ở mức trung bình {value} — ban ngày đây là ánh trắng tốt, giúp tỉnh táo, nhưng buổi tối hãy chỉnh chính chiếc đèn đó về 2700 K.',
  'measure.advice.melanopic.evening': 'Ảnh hưởng nhịp sinh học trung bình là {value} — trong hai giờ trước khi ngủ hãy xuống dưới 0,50 ×, bằng cách giảm sáng đèn chính và chiếu từ tầm bàn thay vì từ trần.',
  'measure.advice.melanopic.day': 'Ảnh hưởng nhịp sinh học trung bình là {value} — vào giờ này liều lượng đó có ích, nhưng buổi tối hãy đổi nguồn sáng này sang loại yếu hơn và ấm hơn.',
  'measure.advice.flicker': 'Nhấp nháy trung bình lên tới {value} — thường là do bộ điều chỉnh độ sáng hoặc đèn nền để quá thấp: hãy nâng độ sáng màn hình lên trên 40% hoặc thay bộ điều chỉnh bằng loại không dùng điều chế PWM.',
  'measure.advice.uniformity': 'Ánh sáng phân bố không đều (trung bình {value}) — hãy đặt đèn ở bên cạnh mặt bàn và thêm một nguồn thứ hai yếu hơn từ phía đối diện, thay vì một điểm sáng mạnh duy nhất.',
  'measure.advice.comfort': 'Tiện nghi thị giác trung bình đạt {value} — hãy bắt đầu bằng một thay đổi duy nhất: giảm một nửa độ sáng của nguồn chính, rồi mới lo đến màu của ánh sáng.',
  'measure.advice.default': 'Hãy thay đổi một thứ trong ánh sáng của bạn rồi đo lại — so sánh hai phiên đo nói lên nhiều điều hơn một số đo đơn lẻ.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'Lịch sử',
  'history.action.export': 'Xuất lịch sử',

  'history.metricGroup.aria': 'Chọn đại lượng',
  'history.announce.metric': 'Đại lượng: {metric}',
  'history.rangeGroup.aria': 'Khoảng thời gian',
  'history.range.aria': '{range} gần nhất',

  'history.stats.title': 'Thống kê của khoảng',
  'history.stats.head': '{metric}\u00A0—\u00A0{range} gần nhất',
  'history.stats.note': 'Tính từ những gì biểu đồ hiển thị. Thời gian không đo thì không được tính vào — chúng tôi không đặt số 0 vào chỗ của nó.',
  'history.stat.min': 'Nhỏ nhất',
  'history.stat.avg': 'Trung bình',
  'history.stat.max': 'Lớn nhất',
  'history.trend.up': 'tăng trong khoảng này',
  'history.trend.flat': 'không thay đổi rõ rệt',
  'history.trend.down': 'giảm trong khoảng này',
  'history.trend.none': 'không có gì để so sánh',

  'history.sessions.title': 'Các phiên đo',
  'history.sessions.count': '{sessions}, mới nhất trước',
  'history.sessions.empty': 'Chưa có phiên đo nào',
  'history.sessions.hint': 'Phiên đo được lưu sau khi bạn dừng đo.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'khoảng: {range}',
  'history.session.noMeasure': 'không đo được gì',

  'history.data.title': 'Dữ liệu',
  'history.data.subtitle': 'Lịch sử chỉ được lưu trên thiết bị này.',
  'history.export.csv': 'Xuất CSV',
  'history.export.json': 'Xuất JSON',
  'history.export.ok': 'Tệp đã sẵn sàng để lưu',
  'history.export.fail': 'Không chuẩn bị được tệp. Ở chế độ riêng tư và trong cửa sổ nhúng bên trong ứng dụng khác, trình duyệt chặn việc lưu — hãy mở trang trong một thẻ thông thường.',
  'history.export.sheet.title': 'Xuất lịch sử',
  'history.export.sheet.text': 'CSV mở được bằng bảng tính (ngăn cách bằng dấu chấm phẩy, dấu phẩy làm dấu thập phân). JSON giữ lại mọi thứ, kể cả danh sách phiên đo và những quãng không đo được.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Xóa lịch sử',
  'history.clear.title': 'Xóa lịch sử?',
  'history.clear.text': 'Sẽ xóa {points} và {sessions}. Việc này không thể hoàn tác — nếu muốn giữ dữ liệu, hãy xuất ra trước.',
  'history.clear.confirm': 'Xóa',
  'history.clear.announce': 'Đã xóa lịch sử.',
  'history.clear.toast': 'Đã xóa lịch sử',

  'history.empty.title': 'Chưa có gì để hiển thị',
  'history.empty.text': 'Lịch sử đầy dần trong lúc bạn đo — mỗi giây một điểm. Mọi thứ đều ở lại trên thiết bị này.',
  'history.empty.action': 'Đến màn hình đo',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 phút',
  'range.5m': '5 phút',
  'range.1h': '1 giờ',
  'range.24h': '24 giờ',
  'range.7d': '7 ngày',
  'range.30d': '30 ngày',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Ngày và giờ',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'Bộ nhớ thiết bị đã đầy — các phép đo mới không còn được lưu nữa.',
  'storage.blocked': 'Trình duyệt không cho lưu lịch sử — dữ liệu sẽ mất khi bạn đóng thẻ.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Công cụ',
  'tools.action.about': 'Về phép đo',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Ngôn ngữ',
  'tools.language.subtitle': 'Mặc định ứng dụng đi theo ngôn ngữ của thiết bị; lựa chọn trong danh sách này có hiệu lực ngay và được giữ lại trong trình duyệt này.',
  'tools.language.aria': 'Ngôn ngữ giao diện',
  'tools.language.system': 'Tự động',
  'tools.language.announce': 'Ngôn ngữ giao diện: {language}.',

  'tools.appearance.title': 'Giao diện',
  'tools.appearance.theme.title': 'Chủ đề',
  'tools.appearance.theme.desc': '“Tự động” đi theo thiết lập của hệ thống.',
  'tools.appearance.theme.aria': 'Chủ đề',
  'tools.theme.system': 'Tự động',
  'tools.theme.light': 'Sáng',
  'tools.theme.dark': 'Tối',
  'tools.appearance.accent.title': 'Màu nhấn',
  'tools.appearance.accent.desc': 'Màu của nút, vùng chọn và thanh trượt.',
  'tools.appearance.accent.aria': 'Màu nhấn',
  'tools.appearance.textScale.title': 'Cỡ chữ',
  'tools.appearance.textScale.desc': 'Phóng to toàn bộ giao diện, không chỉ các nhãn.',
  'tools.appearance.textScale.aria': 'Cỡ chữ',
  'tools.appearance.density.title': 'Mật độ',
  'tools.appearance.density.desc': 'Chế độ gọn xếp được nhiều nội dung hơn trên một màn hình.',
  'tools.appearance.density.aria': 'Mật độ bố cục',
  'tools.density.comfortable': 'Thoáng',
  'tools.density.compact': 'Gọn',
  'tools.appearance.motion.title': 'Bớt chuyển động',
  'tools.appearance.motion.desc': 'Tắt hiệu ứng động và chuyển động mượt của kim. Dù thế nào chúng tôi vẫn tôn trọng thiết lập của hệ thống.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Đại dương',
  'accent.violet': 'Tím',
  'accent.amber': 'Hổ phách',
  'accent.mint': 'Bạc hà',
  'accent.rose': 'Hồng',

  'tools.thresholds.title': 'Ngưỡng',
  'tools.thresholds.subtitle': 'Từ giá trị nào thì ứng dụng nói “vừa phải”, và từ giá trị nào thì nói “kém”. Các ngưỡng mặc định là đề xuất của chúng tôi, không phải tiêu chuẩn — hãy đặt cho hợp với bạn.',
  'tools.thresholds.warn': 'Ngưỡng cảnh báo',
  'tools.thresholds.crit': 'Ngưỡng báo động',
  'tools.thresholds.warn.aria': 'Ngưỡng cảnh báo — {metric}',
  'tools.thresholds.crit.aria': 'Ngưỡng báo động — {metric}',
  'tools.thresholds.reset': 'Mặc định',
  'tools.thresholds.reset.aria': 'Khôi phục ngưỡng mặc định: {metric}',
  'tools.thresholds.moved': 'Đã chuyển {threshold} đến {value}.',
  'tools.thresholds.resetAll': 'Khôi phục mọi ngưỡng',
  'tools.thresholds.resetAll.title': 'Khôi phục các ngưỡng mặc định?',
  'tools.thresholds.resetAll.text': 'Cả bảy đại lượng sẽ trở về những ngưỡng do ứng dụng đề xuất. Lịch sử đo vẫn còn nguyên.',
  'tools.thresholds.resetAll.confirm': 'Khôi phục',
  'tools.thresholds.resetAll.cancel': 'Giữ nguyên',
  'tools.thresholds.resetAll.toast': 'Các ngưỡng đã trở về mặc định',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'trên {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} trở xuống',
  'tools.zoneRange.goodBelow': 'dưới {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} trở lên',

  'tools.calibration.title': 'Hiệu chuẩn',
  'tools.calibration.subtitle': 'Dành cho những ai có thứ để đối chiếu.',
  'tools.calibration.intro': 'Hai chiếc điện thoại cùng hướng vào một bóng đèn sẽ cho ra những con số hơi khác nhau — mỗi cảm biến có sắc thái riêng. Nếu bạn có sẵn một số đo mà bạn tin, ở đây bạn có thể nâng hoặc hạ nhẹ từng kênh màu của hình ảnh. Các hệ số nhân tác động trước khi mọi thứ được tính, nên chúng thay đổi cả bảy đại lượng cùng một lúc.',
  'tools.calibration.neutral': 'Không có gì để đối chiếu? Cứ để 1,00 — đó là thiết lập gốc và nó không làm hỏng thứ gì.',
  'tools.calibration.forward': 'Thay đổi có hiệu lực từ bây giờ. Các phép đo đã nằm trong lịch sử vẫn giữ đúng như lúc được lưu — chúng tôi không tính lại chúng, vì như vậy là sửa dữ liệu sau khi sự việc đã xảy ra.',
  'tools.calibration.reset': 'Đặt lại hiệu chuẩn',
  'tools.calibration.reset.toast': 'Đã đặt lại hiệu chuẩn',
  'tools.calibration.channel.r': 'Kênh đỏ',
  'tools.calibration.channel.g': 'Kênh lục',
  'tools.calibration.channel.b': 'Kênh lam',
  'tools.calibration.channel.aria': '{channel} — hệ số nhân hiệu chuẩn',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'Phép đo',
  'tools.measurement.wake.title': 'Giữ màn hình luôn sáng',
  'tools.measurement.wake.desc': 'Màn hình không tắt trong lúc đo. Khi đó pin tụt nhanh hơn.',
  'tools.measurement.wake.unsupported': 'Trình duyệt này không cho phép giữ màn hình luôn sáng.',
  'tools.measurement.haptics.title': 'Rung',
  'tools.measurement.haptics.desc': 'Một rung ngắn xác nhận khi bắt đầu, khi dừng và khi đổi đại lượng.',
  'tools.measurement.haptics.unsupported': 'Thiết bị này không báo là có mô-tơ rung.',

  'tools.about.title': 'Về phép đo',
  'tools.about.subtitle': 'Chính xác thì mỗi đại lượng trong bảy đại lượng tính cái gì, và sự trung thực của phương pháp này dừng lại ở đâu.',
  'tools.about.scale': 'Thang đo: từ {min} đến {max}.',
  'tools.about.threshold': 'Chúng tôi cảnh báo từ {warn} và báo động từ {crit}.',
  'tools.about.thresholdInvert': 'Chúng tôi cảnh báo dưới {warn} và báo động dưới {crit}.',
  'tools.about.limitsHead': 'Phép đo này không làm được gì',
  'tools.about.limit.spectrum.title': 'Camera không nhìn màu như một thiết bị đo',
  'tools.about.limit.spectrum.text': 'Camera điện thoại có ba kênh: đỏ, lục và lam. Thiết bị đo ánh sáng tách chúng thành hàng chục dải hẹp. Những gì bạn thấy ở đây được suy ra từ ba con số đó — theo một cách hợp lý, nhưng vẫn là một phép tính, chứ không phải quang phổ đo được.',
  'tools.about.limit.exposure.title': 'Camera tự chỉnh độ sáng của chính nó',
  'tools.about.limit.exposure.text': 'Khi bạn hướng điện thoại vào cửa sổ, camera làm tối hình lại để không bị dư sáng. “Độ sáng khung cảnh” khi đó tụt xuống, dù trong phòng chẳng có gì thay đổi. Vì vậy hãy so sánh giá trị này trong cùng một khung ngắm, chứ đừng so giữa các phòng.',
  'tools.about.limit.flicker.title': 'Camera chậm sẽ không bắt được nhấp nháy nhanh',
  'tools.about.limit.flicker.text': 'Chúng tôi kiểm tra hình ảnh {hz} lần mỗi giây. Nhịp đập nhanh hơn {nyquist} lần mỗi giây có thể hiện ra trong phép đo như chậm hơn thực tế, hoặc biến mất hoàn toàn — và nhấp nháy của điện lưới đúng là nhanh như vậy. Nếu ứng dụng bắt được điều gì đó, hãy coi đó là dấu hiệu “ở đây có cái gì đang đập nhịp”, chứ không phải một tần số đo được.',
  'tools.about.limit.medical.title': 'Đây không phải xét nghiệm y tế, cũng không phải lời khuyên y tế',
  'tools.about.limit.medical.text': 'Ứng dụng giúp bạn nhận ra rằng ánh sáng quanh mình lạnh, chói hay chập chờn, và gợi ý có thể làm gì với điều đó. Ứng dụng không đưa ra phán xét nào về sức khỏe của bạn và không thay thế cuộc trò chuyện với bác sĩ hay phép đo bằng máy đo chuyên nghiệp.',
  'tools.about.privacy': 'Mọi thứ được tính trên thiết bị của bạn. Hình ảnh từ camera không bao giờ được gửi hay lưu đi đâu cả — chỉ những con số đã tính mới vào bộ nhớ.',
  'tools.about.privacyPolicy': 'Chính sách quyền riêng tư đầy đủ',

  'tools.data.title': 'Dữ liệu',
  'tools.data.subtitle': 'Mọi thứ nằm trong bộ nhớ của trình duyệt này và không đi đâu khỏi đây.',
  'tools.data.summary.empty': 'Chưa có phép đo nào được lưu.',
  'tools.data.summary': 'Trong bộ nhớ: {points} và {sessions}.',
  'tools.data.export.csv': 'Xuất CSV',
  'tools.data.export.json': 'Xuất JSON',
  'tools.data.clear': 'Xóa lịch sử',
  'tools.data.reset': 'Thiết lập mặc định',
  'tools.data.reset.title': 'Khôi phục các thiết lập mặc định?',
  'tools.data.reset.text': 'Giao diện, ngưỡng, hiệu chuẩn và các thiết lập đo sẽ trở về trạng thái ban đầu. Lịch sử đo vẫn còn nguyên.',
  'tools.data.reset.confirm': 'Khôi phục',
  'tools.data.reset.toast': 'Đã khôi phục các thiết lập mặc định',
  'tools.data.wipe': 'Xóa toàn bộ dữ liệu',
  'tools.data.wipe.title': 'Xóa toàn bộ dữ liệu của ứng dụng?',
  'tools.data.wipe.text': 'Sẽ mất: toàn bộ lịch sử đo và danh sách phiên đo, các ngưỡng và hiệu chuẩn của bạn cùng các thiết lập giao diện. Ứng dụng sẽ trở về trạng thái như lần chạy đầu tiên.',
  'tools.data.wipe.note': 'Chúng tôi không giữ bản sao nào của dữ liệu này — nó chưa bao giờ rời khỏi thiết bị này, nên không có chỗ nào để khôi phục lại.',
  'tools.data.wipe.check': 'Tôi hiểu rằng việc này không thể hoàn tác',
  'tools.data.wipe.confirm': 'Xóa tất cả',
  'tools.data.wipe.toast': 'Đã xóa toàn bộ dữ liệu của ứng dụng',
  'tools.data.wipe.announce': 'Đã xóa toàn bộ dữ liệu của ứng dụng. Các thiết lập đã trở về mặc định.',
  'tools.data.storage.blocked': 'Trình duyệt này không cho lưu thứ gì lâu dài (chế độ riêng tư, hoặc dữ liệu trang web bị chặn). Mọi thứ bạn đặt ở đây sẽ mất khi bạn đóng thẻ.',
  'tools.data.storage.full': 'Bộ nhớ của trình duyệt đã đầy và các phép đo mới không còn được lưu nữa. Xóa lịch sử sẽ giải phóng chỗ.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Ủng hộ',
  'support.free.title': 'Mọi thứ đều dùng được',
  'support.free.lead': 'Cả bảy đại lượng, toàn bộ lịch sử, ngưỡng, hiệu chuẩn và xuất dữ liệu đều hoạt động ngay từ lần chạy đầu tiên — không tài khoản, không giới hạn và không mất phí.',
  'support.free.note': 'Phép đo được tính hoàn toàn trên thiết bị này và chạy được cả khi không có mạng. Ở đây không có bản nào tốt hơn bị giữ sau một bức tường.',
  'support.why.title': 'Vì sao tôi ngỏ lời',
  'support.why.lead': 'Giám sát Ánh sáng được làm ngoài giờ, không quảng cáo, không nhà tài trợ và không có công ty nào đứng sau. Ủng hộ trả cho thời gian sửa lỗi, làm thêm đại lượng mới và giữ cho những gì đang chạy vẫn chạy.',
  'support.what.title': 'Quyên góp thì được gì',
  'support.what.lead': 'Không gì cả. Quyên góp không mở khóa thứ gì — không tính năng thêm, không huy hiệu bên cạnh tên bạn, không quyền ưu tiên. Mọi thứ ứng dụng làm được thì bạn đã có rồi.',
  'support.what.note': 'Chỉ còn lại chừng này: tôi biết nó đã có ích cho ai đó. Thật sự đó là lý do đủ rồi.',
  'support.cta.title': 'Nếu bạn muốn giúp',
  'support.cta.button': 'Mời tôi một ly cà phê',
  'support.cta.nolink': 'Hồ sơ quyên góp chưa được kết nối. Khi nào có, một cái nút sẽ đứng ở chỗ này.',
  'support.cta.privacy': 'Liên kết này mở trang Buy Me a Coffee bên ngoài trong thẻ mới. Đó là lúc duy nhất có thứ gì đó rời khỏi thiết bị này — bản thân phép đo thì luôn ở lại đây.',
  'support.cta.privacyFuture': 'Khi nào có địa chỉ, cái nút sẽ mở trang Buy Me a Coffee bên ngoài trong thẻ mới. Đó sẽ là lúc duy nhất có thứ gì đó rời khỏi thiết bị này — bản thân phép đo thì luôn ở lại đây.',
  'support.cta.note': 'Ở đây không có đồng hồ đếm ngược, không có lời nhắc và không có cửa sổ nào tự bật lên. Lời đề nghị này chỉ chờ ở thẻ này mà thôi.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'phút vừa qua',
  'gauge.aria': '{metric}: {value}, vùng: {zone}',
  'gauge.aria.note': '{metric}: {value}, vùng: {zone}, {note}',
  'gauge.aria.initial': '{metric}: không có dữ liệu',
  'gauge.value.none': 'không có dữ liệu',
  /* Odczyt słowny z jednostką: „27 phần trăm”, „1,20 lần”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'giá trị gần đúng',
  'gauge.note.offScale': 'ngoài thang đo',
  'gauge.metric.unknown': 'Đại lượng không rõ',

  'chart.aria.label': 'Biểu đồ lịch sử đo',
  'chart.hint': 'Biểu đồ tương tác. Mũi tên trái và phải di chuyển con trỏ đọc, Home và End nhảy về đầu và cuối khoảng, Escape ẩn con trỏ.',
  'chart.empty.title': 'Không có dữ liệu',
  'chart.empty.text': 'Hãy bắt đầu đo — biểu đồ xuất hiện sau những số đo đầu tiên.',
  'chart.few.title': 'Chưa đủ dữ liệu',
  'chart.few.text': 'Mới có một số đo: {value}. Phải có hai điểm mới vẽ được đường.',
  'chart.legend.line': 'phép đo',
  'chart.legend.gap': 'quãng không đo',
  'chart.aria.head': 'Biểu đồ: {metric}, khoảng {range}',
  'chart.aria.empty': 'Không có dữ liệu trong khoảng này.',
  'chart.aria.one': 'Một số đo: {value}.',
  'chart.aria.summary': 'Từ {min} đến {max}, trung bình {avg}, {points}.',
  'chart.aria.gaps': 'Chuỗi có những quãng trống — khi đó chúng tôi không đo.',
  'chart.readout.empty': 'Không có dữ liệu trong khoảng này.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'Chưa đủ dữ liệu để vẽ biểu đồ.',
  'chart.readout.hint': 'Hãy kéo dọc biểu đồ hoặc dùng phím mũi tên để đọc một số đo đơn lẻ.',
  'chart.time.now': 'bây giờ',
  'chart.time.justNow': 'vừa xong',
  'chart.time.ago': '{duration} trước',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd zegar dwudziestoczterogodzinny i skrót
     miesiąca dwucyfrowego ('thg 12'), bo tak wietnamskie ustawienia regionalne
     formatują godzinę i datę. */
  'chart.sample.ago': '\u221230\u00A0phút',
  'chart.sample.clock': '00:00',
  'chart.sample.date': '30\u00A0thg 12',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'Tỷ lệ ánh sáng xanh',
  'metric.share.short': 'Bao nhiêu phần của ánh sáng nhìn thấy rơi vào kênh lam.',
  'metric.share.help': 'Nó tách màu ra khỏi độ sáng — đây chính là giá trị thay đổi khi bạn bật chế độ ban đêm.',
  'metric.brightness.name': 'Độ sáng khung cảnh',
  'metric.brightness.short': 'Độ sáng trung bình của hình ảnh từ camera.',
  'metric.brightness.help': 'Là giá trị tương đối, không phải lux — cơ chế tự động phơi sáng của camera dịch chuyển nó ở bên dưới.',
  'metric.kelvin.name': 'Nhiệt độ màu',
  'metric.kelvin.short': 'Ánh sáng ấm hay lạnh.',
  'metric.kelvin.help': 'Dưới 3000 K ánh sáng ấm và dịu hơn vào buổi tối. 6500 K là màu trắng mặc định của phần lớn màn hình.',
  'metric.melanopic.name': 'Ảnh hưởng nhịp sinh học',
  'metric.melanopic.short': 'Ánh sáng này tác động mạnh đến mức nào lên đồng hồ sinh học.',
  'metric.melanopic.help': 'Một phép xấp xỉ của tỷ lệ melanopic. 1,00 là ánh trắng ban ngày trung tính; buổi tối nên xuống dưới 0,50.',
  'metric.flicker.name': 'Nhấp nháy',
  'metric.flicker.short': 'Nhịp đập không nhìn thấy được của nguồn sáng.',
  'metric.flicker.help': 'Bộ điều chỉnh độ sáng và đèn nền rẻ tiền thường đập nhịp. Mắt không thấy, nhưng nó được xem là một nguyên nhân có thể gây mỏi mắt và đau đầu.',
  'metric.uniformity.name': 'Độ đồng đều',
  'metric.uniformity.short': 'Ánh sáng có trải đều khắp khung hình hay không.',
  'metric.uniformity.help': 'Giá trị thấp trên màn hình nghĩa là hở sáng đèn nền hoặc có phản chiếu; trên mặt bàn — là đèn đặt sai chỗ.',
  'metric.comfort.name': 'Tiện nghi thị giác',
  'metric.comfort.short': 'Một điểm số thay cho sáu con số.',
  'metric.comfort.help': 'Nó gộp các phép đo còn lại thành điểm số từ 0 đến 100 và cho thấy cái gì kéo nó xuống nhiều nhất. Các trọng số là đánh giá biên tập của chúng tôi, không phải tiêu chuẩn.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'tốt',
  'zone.warn': 'vừa phải',
  'zone.crit': 'kém',
  'zone.none': 'không có dữ liệu',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 thg 8'). Wietnamski skrót miesiąca to
     'thg' z numerem — pełna nazwa brzmi 'tháng 8'. */
  'date.month.short.1': 'thg 1',
  'date.month.short.2': 'thg 2',
  'date.month.short.3': 'thg 3',
  'date.month.short.4': 'thg 4',
  'date.month.short.5': 'thg 5',
  'date.month.short.6': 'thg 6',
  'date.month.short.7': 'thg 7',
  'date.month.short.8': 'thg 8',
  'date.month.short.9': 'thg 9',
  'date.month.short.10': 'thg 10',
  'date.month.short.11': 'thg 11',
  'date.month.short.12': 'thg 12',

  'date.clock': '{hours}:{minutes}',
  /* Kolejność wstawek jest tu taka jak po polsku: wietnamska data skrócona to
     '30 thg 8', a rok dopisuje się po przecinku — '30 thg 8, 2026'. */
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}, {year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0giờ',
  'time.duration.hourMinute': '{hours}\u00A0giờ {minutes}\u00A0phút',
  'time.duration.hour': '{hours}\u00A0giờ',
  'time.duration.minuteSecond': '{minutes}\u00A0phút {seconds}\u00A0giây',
  'time.duration.minute': '{minutes}\u00A0phút',
  'time.duration.second': '{seconds}\u00A0giây',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „vừa xong”. */
  'time.justNow': 'vừa xong',
  'time.aMinuteAgo': 'một phút trước',
  'time.minutesAgo': '{minutes}\u00A0phút trước',
  'time.hoursAgo': '{hours}\u00A0giờ trước',
  'time.yesterday': 'hôm qua',
  'time.daysAgo': '{days}\u00A0ngày trước',

  /* Formy zależne od liczby. Wietnamski ma w CLDR jedną kategorię: `other`.
     Rzeczownik się nie odmienia, więc formą jest samo słowo — format.plural()
     skleja „liczba + spacja + forma”, więc wychodzi '3 phép đo' i '12 phiên đo'. */
  'time.days.plural': { other: 'ngày' },
  'unit.sample.plural': { other: 'mẫu' },
  'unit.measurement.plural': { other: 'phép đo' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Wietnamski nie odmienia rzeczownika — oba klucze zostają (kształt słownika
     jest wspólny dla wszystkich języków), a wartości są tu identyczne. */
  'unit.session.plural': { other: 'phiên đo' },
  'unit.session.accusative.plural': { other: 'phiên đo' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to po wietnamsku
     dwie różne rzeczy: 'điểm dữ liệu' to punkt danych, 'điểm' to punkt oceny. */
  'unit.chartPoint.plural': { other: 'điểm dữ liệu' },
  'unit.point.plural': { other: 'điểm' },
  'unit.kelvin.plural': { other: 'kelvin' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „phần trăm”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'phần trăm',
  'unit.spoken.times': 'lần',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'Chưa được cấp quyền dùng camera. Hãy cho phép camera cho trang này trong thiết lập trình duyệt hoặc hệ thống rồi thử lại.',
  'camera.error.notfound': 'Không tìm thấy camera. Hãy kiểm tra xem thiết bị có camera không và nó có bị tắt trong hệ thống không.',
  'camera.error.inuse': 'Camera đang bị một ứng dụng khác chiếm. Hãy đóng ứng dụng hoặc thẻ đó rồi thử lại.',
  'camera.error.insecure': 'Camera chỉ hoạt động qua HTTPS hoặc trên localhost. Hãy mở trang này ở địa chỉ bắt đầu bằng “https://”.',
  'camera.error.unsupported': 'Trình duyệt này không cung cấp camera ở đây. Hãy thử Chrome hoặc Safari, trong một cửa sổ thông thường — không phải trong bản xem trước nhúng bên trong ứng dụng khác.',
  'camera.error.unknown': 'Không khởi động được camera.'
};
