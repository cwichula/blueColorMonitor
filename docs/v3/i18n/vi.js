/* docs/v3/i18n/vi.js — słownik WŁASNY wersji v3, wietnamski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/vi.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * SKĄD TE ZDANIA: tłumaczenie z polskiego (pl.js — redakcja pierwotna),
 * z angielskim (en.js) jako wzorcem terminologii i rejestru. ZESTAW KLUCZY
 * jest dokładnie taki sam jak w pl.js i en.js tego katalogu — pilnuje tego
 * docs/shared/i18n/keys.test.js.
 *
 * CZEGO TU NIE MA — i dlaczego: kluczy, które stoją już w słowniku wspólnym
 * (docs/shared/i18n/vi.js). Nazwy stref, zdania oceniające, noty o granicach
 * metody, nazwy i opisy siedmiu wielkości oraz zastrzeżenie medyczne są wspólne
 * dla wersji i tłumaczy się je RAZ — poza jednym świadomym nadpisaniem,
 * opisanym przy 'verdict.critical.comfort'.
 *
 * TERMINOLOGIA idzie CO DO SŁOWA za docs/shared/i18n/vi.js:
 *   tỷ lệ ánh sáng xanh (udział niebieskiego; kanał: kênh lam), độ sáng khung
 *   hình (jasność sceny), nhiệt độ màu (temperatura barwowa), ảnh hưởng nhịp
 *   sinh học (wpływ na rytm dobowy; hệ số melanopic), nhấp nháy (migotanie),
 *   độ đồng đều (równomierność), tiện nghi thị giác (komfort wzrokowy).
 * STREFY: trong ngưỡng / lưu ý / nghiêm trọng — stąd próg uwagi to „ngưỡng lưu
 * ý”, a próg krytyczny „ngưỡng nghiêm trọng”. Kanały obrazu: đỏ / lục / lam.
 *
 * ZAPIS LICZB WE WZORACH. Polska redakcja pisze przecinek dziesiętny
 * („0,3320”), angielska kropkę („0.3320”); wietnamski pisze przecinek, tak samo
 * jak polski, i tak jest tutaj. Liczby wstawiane przez '{…}' formatuje warstwa
 * językowa według aktywnego języka.
 */
window.I18nData = window.I18nData || {};
window.I18nData['vi'] = Object.assign(window.I18nData['vi'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. */
  'app.wordmark': 'GIÁM SÁT ÁNH SÁNG',

  'state.idle': 'Sẵn sàng',
  'state.starting': 'Đang khởi động',
  'state.running': 'Đang đo',
  'state.runningTpl': 'Đang đo {time}',
  'state.stopped': 'Đã dừng',
  'state.error': 'Lỗi camera',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5,0 po wietnamsku i po polsku, 5.0 po angielsku,
     ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'Bắt đầu đo',
  'keys.starting': 'Đang khởi động…',
  'keys.stop': 'Dừng',
  'keys.flip': 'Đổi camera',
  'keys.flipAria': 'Chuyển camera trước/sau',
  'keys.menu': 'Menu',
  'keys.menuAria': 'Danh sách mô-đun',
  'keys.back': '‹ Quay lại',
  'keys.backAria': 'Quay lại bảng điều khiển',
  'keys.dash': 'Bảng điều khiển',
  'keys.zoom': 'Phóng to xem trước',
  'keys.retry': 'Thử lại',
  'keys.refresh': 'Tải lại',
  'keys.close': 'Đóng',
  'keys.show': 'Hiện',
  'keys.apply': 'Áp dụng',
  'keys.remove': 'Xóa',

  'monitor.legend': 'Xem trước kiểm tra',
  'monitor.badge': 'Trực tiếp',

  'aim.title': 'Ngắm khung',
  'aim.hint': 'Khung viền cho thấy đúng phần hình ảnh mà ứng dụng đo.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'Kênh chính',
  'readout.thresholdTpl': '(ngưỡng {value})',
  'readout.contextTpl': 'min {min} · TB {avg} · max {max} — 60 s gần nhất',
  'readout.contextEmpty': 'không có dữ liệu trong 60 s gần nhất',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'Ý nghĩa: {name}',
  'aria.channel': '{name}, {value}, {zone}. Hiện trên màn hình lớn.',
  'aria.channelStale': '{name}, không có dữ liệu. Hiện trên màn hình lớn.',
  'aria.scale': 'Thang đo: {name}, từ {min} đến {max}. Hiện tại {value}, {zone}. Ngưỡng lưu ý {warn}, ngưỡng nghiêm trọng {crit}.',
  'aria.readout': '{name}: {value}, {zone}.',
  'aria.readoutApprox': '{name}: khoảng {value}, {zone}. Giá trị gần đúng.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'Thang đo kênh chính. Không có dữ liệu',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': 'Nhấn “Bắt đầu đo”, hướng điện thoại vào một bề mặt được chiếu sáng và giữ yên vài giây.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'Tiện nghi thị giác thấp. Hãy mở mô-đun 01 để xem điều gì kéo nó xuống.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'Hãy bắt đầu bằng nút “Bắt đầu đo” ở cuối màn hình. Camera chỉ bật sau khi bạn nhấn.',
  'transient.measureStopped': 'Đã kết thúc phép đo · {time} · đã lưu vào lịch sử.',
  'transient.newVersion': 'Đã có phiên bản mới của ứng dụng.',
  'transient.thresholdsSaved': 'Đã lưu các ngưỡng.',
  'transient.thresholdsRejected': 'Không lưu — ngưỡng lưu ý và ngưỡng nghiêm trọng không được vượt qua nhau.',
  'transient.historyCleared': 'Đã xóa lịch sử.',

  'live.lead': 'Kênh chính: {name}, {value}, {zone}.',
  'live.ready': 'Đã có đánh giá. {name} {value}, {zone}.',
  'live.started': 'Đã bắt đầu đo.',
  'livebar.stopped': 'Đã dừng đo',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'Chưa có bản ghi nào. Lịch sử được ghi trong lúc đo — hãy chạy phép đo một phút rồi quay lại đây.',
  'empty.recorderNoRange': 'Không có phép đo nào trong khoảng này.',
  'empty.coverageTpl': 'Phép đo bao phủ {done} trong {total} giờ.',
  'empty.reportsNoData': 'Báo cáo ngày sẽ xuất hiện sau ngày trọn vẹn đầu tiên có phép đo.',
  'empty.compareOneSession': 'Để so sánh cần hai lượt đo đã kết thúc. Hiện bạn mới có một.',
  'empty.exportNoData': 'Không có gì để xuất. Hãy chạy phép đo để lịch sử có nội dung.',
  'empty.alertsOff': 'Cảnh báo đang tắt. Sau khi bật, chúng chỉ hoạt động khi ứng dụng đang mở.',
  'empty.scheduleEmpty': 'Chưa đặt giờ nào. Lịch đo chỉ chạy khi ứng dụng đang mở.',
  'empty.historyEmpty': 'Lịch sử trống.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'Danh sách mô-đun',

  'modules.01.title': 'Bộ ghi',
  'modules.01.desc': 'Diễn biến của phép đo theo thời gian, từ một phút đến ba mươi ngày.',
  'modules.02.title': 'Ngưỡng',
  'modules.02.desc': 'Đặt ranh giới lưu ý và nghiêm trọng của riêng bạn cho từng đại lượng.',
  'modules.03.title': 'Hiệu chuẩn',
  'modules.03.desc': 'Đối chiếu với một nguồn sáng đã biết, và những gì hiệu chuẩn không sửa được.',
  'modules.04.title': 'Báo cáo',
  'modules.04.desc': 'Tổng hợp theo ngày và theo tuần, trình bày như một bản in.',
  'modules.05.title': 'Xuất dữ liệu',
  'modules.05.desc': 'Lưu các số đo ra tệp CSV hoặc JSON, kèm mô tả các cột.',
  'modules.06.title': 'So sánh',
  'modules.06.desc': 'Hai lượt đo cạnh nhau, với chênh lệch cho bằng con số.',
  'modules.07.title': 'Kiểm tra màn hình',
  'modules.07.desc': 'Các ảnh mẫu để tự kiểm tra màn hình của bạn, từng bước một.',
  'modules.08.title': 'Lịch đo',
  'modules.08.desc': 'Đo tự động vào những giờ đã đặt.',
  'modules.09.title': 'Cảnh báo',
  'modules.09.desc': 'Thông báo khi vượt ngưỡng — và khi nào nó sẽ không hoạt động.',
  'modules.10.title': 'Ủng hộ',
  'modules.10.desc': 'Ứng dụng hoàn toàn miễn phí. Ở đây bạn có thể mời tác giả một ly cà phê.',
  'modules.11.title': 'Tài liệu',
  'modules.11.desc': 'Phép đo này là gì, và chắc chắn không phải là gì.',
  'modules.12.title': 'Cài đặt',
  'modules.12.desc': 'Chủ đề, cỡ chữ, giảm chuyển động, xóa lịch sử.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'Các kênh đo',
  'channels.pick': 'Hiện trên màn hình lớn',
  'channels.stale': 'không có dữ liệu',
  'channels.approx': 'giá trị gần đúng',

  'help.unit': 'Đơn vị',
  'help.range': 'Dải đo',
  'help.thresholds': 'Ngưỡng',
  'help.warn': 'Ngưỡng lưu ý',
  'help.crit': 'Ngưỡng nghiêm trọng',
  'help.now': 'hiện tại',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „Đại lượng” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'Đại lượng',
  'col.unit': 'Đơn vị',
  'col.range': 'Dải đo',
  'col.direction': 'Chiều',
  'col.time': 'Giờ',
  'col.date': 'Ngày',
  'col.zone': 'Vùng',
  'col.avg': 'Trung bình',
  'col.min': 'Nhỏ nhất',
  'col.max': 'Lớn nhất',
  'col.name': 'Cột',
  'col.meaning': 'Nội dung',
  'col.channel': 'Kênh',
  'col.gain': 'Hệ số',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'Khoảng thời gian',
  'recorder.range.60s': '60 s',
  'recorder.range.15min': '15 phút',
  'recorder.range.1h': '1 giờ',
  'recorder.range.24h': '24 giờ',
  'recorder.range.30d': '30 ngày',
  'recorder.gap': 'không đo',
  'recorder.sessionTitle': 'Thống kê lượt đo',
  'recorder.zonesCaption': 'Phân bố vùng cho tỷ lệ ánh sáng xanh',
  'recorder.tableCaption': 'Các số đo trong khoảng đã chọn',
  'recorder.crosshair': 'Vạch đọc',
  'recorder.prevAria': 'Điểm trước',
  'recorder.nextAria': 'Điểm sau',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'Giao diện',
  'settings.themeLabel': 'Chủ đề',
  'settings.themeSystem': 'Theo hệ thống',
  'settings.themeLight': 'Sáng',
  'settings.themeDark': 'Tối',
  'settings.themeHint': 'Chủ đề “theo hệ thống” thay đổi cùng với thiết lập của điện thoại.',
  'settings.textLabel': 'Cỡ chữ',
  /* Mnożnik jako LICZBA we wstawce — 1,15 po wietnamsku, 1.15 po angielsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'Phóng to toàn bộ giao diện, không chỉ chữ — các nút và các dòng lớn lên cùng với chữ.',
  'settings.motionGroup': 'Chuyển động',
  'settings.motionLabel': 'Giảm chuyển động',
  'settings.motionHint': 'Tắt mọi hiệu ứng chuyển. Khi đó kim của thang đo nhảy mỗi giây một lần thay vì trôi mượt.',
  'settings.dataTitle': 'Dữ liệu',
  'settings.clearLabel': 'Xóa lịch sử',
  'settings.clearHintTpl': 'Lịch sử hiện có {count} điểm đã lưu.',
  'settings.clearHintEmpty': 'Lịch sử trống.',
  'settings.clearTitle': 'Xóa lịch sử?',
  'settings.clearConfirm': 'Xóa toàn bộ lịch sử đo? Việc này không thể hoàn tác.',
  'settings.clearKey': 'Xóa',
  'settings.aboutTitle': 'Về ứng dụng',
  'settings.versionTpl': '{app}, phiên bản {version}.',
  'settings.offlineText': 'Ứng dụng chạy được mà không cần mạng. Sau lần mở đầu tiên, mọi tệp của nó nằm trong bộ nhớ trình duyệt, nên chế độ máy bay không thay đổi điều gì. Không có gì được gửi lên bất kỳ máy chủ nào, vì ứng dụng không thực hiện yêu cầu mạng nào cả.',
  'settings.docsKey': 'Mở tài liệu',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'Hủy',
  'common.save': 'Lưu',
  'common.reset': 'Khôi phục mặc định',
  'common.yes': 'Có',
  'common.no': 'Không',
  'common.on': 'Bật',
  'common.off': 'Tắt',
  'common.sep': ' · ',
  'common.stepsTitle': 'Từng bước',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'Ngưỡng riêng để làm gì',
  'modules.02.intro': 'Ngưỡng quyết định khi nào ứng dụng nói “Lưu ý” và khi nào nói “Nghiêm trọng”. Các giá trị mặc định là đánh giá biên tập của chúng tôi, không phải tiêu chuẩn — nếu bạn đo trong điều kiện khác, hãy dịch chúng cho hợp với mình. Đánh giá và câu nhận xét trên bảng điều khiển được tính ngay từ các ngưỡng mới.',
  'modules.02.orderNormal': 'Ngưỡng lưu ý phải nằm dưới ngưỡng nghiêm trọng.',
  'modules.02.orderInvert': 'Ở đây giá trị cao hơn là tốt hơn, nên ngưỡng lưu ý nằm trên ngưỡng nghiêm trọng.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'Xem trước thang đo: {name}',
  'modules.02.nowTpl': 'hiện tại {value}',
  'modules.02.resetDone': 'Đã khôi phục các ngưỡng mặc định.',
  'modules.02.profilesTitle': 'Hồ sơ',
  'modules.02.profilesHint': 'Hồ sơ là một bộ ngưỡng đã lưu cho cả bảy đại lượng. Áp dụng hồ sơ sẽ thay tất cả cùng một lúc.',
  'modules.02.profileSaveKey': 'Lưu các ngưỡng hiện tại',
  'modules.02.profileNameLabel': 'Tên hồ sơ mới',
  'modules.02.profileNameHint': 'Tên này ở lại trên thiết bị này. Tối đa 40 ký tự.',
  'modules.02.profileNameEmpty': 'Hãy nhập tên hồ sơ.',
  'modules.02.profileSavedTpl': 'Đã lưu hồ sơ “{name}”.',
  'modules.02.profileAppliedTpl': 'Đã áp dụng hồ sơ “{name}”.',
  'modules.02.profileRemovedTpl': 'Đã xóa hồ sơ “{name}”.',
  'modules.02.profileFailed': 'Không áp dụng được hồ sơ này.',
  'modules.02.profileCustomTpl': 'Hồ sơ riêng, lưu ngày {date}.',
  'modules.02.builtin.default.name': 'Mặc định',
  'modules.02.builtin.default.desc': 'Các ngưỡng từ danh mục đại lượng — điểm xuất phát cho mọi phép đo.',
  'modules.02.builtin.evening.name': 'Buổi tối — dịu',
  'modules.02.builtin.evening.desc': 'Cảnh báo sớm hơn về màu lạnh và ảnh hưởng nhịp sinh học.',
  'modules.02.builtin.work.name': 'Làm việc bàn giấy',
  'modules.02.builtin.work.desc': 'Cho phép ánh sáng ban ngày sáng và lạnh; theo dõi nhấp nháy và độ đồng đều.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'Vì sao cách này có tác dụng',
  'modules.03.why': 'Cảm biến máy ảnh có một độ lệch cố định giữa các kênh. Đo một tờ giấy trắng cho thấy độ lệch đó lớn đến đâu và cho phép trừ nó đi. Đây là tính năng duy nhất trong ứng dụng thực sự nâng được độ chính xác — và nó vẫn không biến máy ảnh thành máy quang phổ.',
  'modules.03.steps.1': 'Đặt một tờ giấy trắng dưới nguồn sáng cần đo.',
  'modules.03.steps.2': 'Nhấn “Bắt đầu đo” trên bảng điều khiển và lấp đầy khung hình bằng tờ giấy.',
  'modules.03.steps.3': 'Quay lại đây, nhấn “Hiệu chuẩn” và giữ yên điện thoại trong ba giây.',
  'modules.03.runKey': 'Hiệu chuẩn (3 s)',
  'modules.03.clearKey': 'Xóa hiệu chuẩn',
  'modules.03.busyTpl': 'Đang đo tờ giấy… còn {sec} s',
  'modules.03.statusNone': 'Chưa hiệu chuẩn. Phép đo vẫn chạy, hãy coi các giá trị là để so sánh.',
  'modules.03.statusOnTpl': 'Đã hiệu chuẩn ngày {date} lúc {time}.',
  'modules.03.gainsTitle': 'Hệ số các kênh',
  'modules.03.gainR': 'Đỏ',
  'modules.03.gainG': 'Lục',
  'modules.03.gainB': 'Lam',
  'modules.03.gainsNone': 'chưa đặt',
  'modules.03.needRunning': 'Trước hết hãy chạy phép đo và hướng camera vào tờ giấy trắng.',
  'modules.03.tooFew': 'Quá ít mẫu. Hãy kiểm tra xem phép đo có thực sự chạy không.',
  'modules.03.tooDark': 'Hình ảnh quá tối để hiệu chuẩn. Hãy chiếu sáng tờ giấy rõ hơn rồi thử lại.',
  'modules.03.refused': 'Độ lệch giữa các kênh quá lớn để coi là một lần hiệu chuẩn. Hãy dùng giấy trắng trong ánh sáng đều.',
  'modules.03.done': 'Đã hiệu chuẩn. Nhiệt độ màu và ảnh hưởng nhịp sinh học từ giờ sẽ chính xác hơn.',
  'modules.03.cleared': 'Đã xóa hiệu chuẩn.',
  'modules.03.limitsTitle': 'Hiệu chuẩn không sửa được những gì',
  'modules.03.limits.1': 'Hiệu chuẩn chỉ cân bằng ba kênh của máy ảnh, không hơn. Nó không cho máy ảnh một quang phổ, nên nhiệt độ màu và ảnh hưởng nhịp sinh học vẫn là những giá trị gần đúng tính từ màu cơ bản sRGB.',
  'modules.03.limits.2': 'Nó không biến độ sáng khung hình thành một đại lượng tuyệt đối — con số đó vẫn là tương đối. Nó cũng không tắt cơ chế phơi sáng tự động hay cân bằng trắng, những thứ vẫn dịch chuyển số đo ở bên dưới.',
  'modules.03.limits.3': 'Nó không mang sang được nguồn sáng khác: một lần hiệu chuẩn làm dưới bóng đèn nào thì mô tả chính bóng đèn ấy. Với nguồn sáng khác, hãy làm lại. Và nó không thay đổi điều gì về việc phép đo này không phải là gì — nó vẫn không phải là một xét nghiệm và vẫn không phải là cơ sở để chẩn đoán bệnh.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'Kỳ báo cáo',
  'modules.04.rangeDay': 'Ngày',
  'modules.04.rangeWeek': 'Tuần',
  'modules.04.headTpl': 'Từ {from} đến {to} · {count} điểm lịch sử.',
  'modules.04.tableTitle': 'Tổng hợp',
  'modules.04.tableCaption': 'Trung bình, nhỏ nhất và lớn nhất trong kỳ đã chọn',
  'modules.04.panoramaTitle': 'Toàn cảnh',
  'modules.04.panoramaAriaTpl': 'Toàn cảnh: {name}, {span}.',
  'modules.04.panoramaSpanDay': 'ngày gần nhất chia theo giờ',
  'modules.04.panoramaSpanWeek': 'tuần gần nhất chia theo ngày',
  'modules.04.panoramaHint': 'Chiều cao và màu của cột nói cùng một điều: trong ngưỡng — thấp, lưu ý — vừa, nghiêm trọng — đầy. Vạch ở chân cột đánh dấu giờ không có phép đo.',
  'modules.04.coverageDayTpl': 'Phép đo bao phủ {done} trong {total} giờ.',
  'modules.04.coverageWeekTpl': 'Phép đo bao phủ {done} trong {total} ngày.',
  'modules.04.zonesTitle': 'Phân bố vùng',
  'modules.04.zonesCaptionTpl': 'Tính cho kênh chính: {name}.',
  'modules.04.worstTpl': 'Thời điểm khó nhất: {value}.',
  'modules.04.worstNone': 'không có gì nổi bật',
  'modules.04.worstHourTpl': '{hour} giờ',
  'modules.04.adviceTitle': 'Có thể làm gì với chuyện này',
  'modules.04.adviceMelanopicTpl': 'Ảnh hưởng nhịp sinh học trung bình là {value}×. Buổi tối nên xuống dưới 0,50 — dễ nhất là dùng bóng đèn ấm hơn hoặc bật chế độ ban đêm.',
  'modules.04.adviceKelvinTpl': 'Ánh sáng lạnh (trung bình {value} K). Để làm việc thì không có gì phải chê; trong hai giờ trước khi ngủ, dưới 3000 K sẽ dịu hơn.',
  'modules.04.adviceFlickerTpl': 'Có nhấp nháy thấy rõ (trung bình {value}%). Thủ phạm thường là bộ điều sáng rẻ tiền hoặc bộ nguồn của đèn nền.',
  'modules.04.adviceUniformityTpl': 'Ánh sáng phân bố không đều ({value}%). Dịch đèn hoặc đổi góc chiếu thường có tác dụng hơn là thay bóng.',
  'modules.04.adviceWorstTpl': 'Nhiều số đo ngoài ngưỡng nhất tập trung vào lúc {hour} giờ.',
  'modules.04.adviceNone': 'Trong kỳ này không có gì vượt lên trên các ngưỡng bạn đã đặt.',
  'modules.04.limitsTitle': 'Đây không phải là lời khuyên y tế',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'Các kết luận chỉ rút ra từ những gì camera của chiếc điện thoại này nhìn thấy. Ứng dụng không đo quang phổ và không đưa ra bất kỳ chẩn đoán nào.',
  'modules.04.printHint': 'Trang này được bố trí như một bản in: bảng và các chú thích đọc lên giống nhau trên giấy, trong kính lúp của hệ thống và trong trình đọc màn hình.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'Khoảng dữ liệu',
  'modules.05.range1h': 'Một giờ',
  'modules.05.range24h': 'Một ngày',
  'modules.05.range7d': '7 ngày',
  'modules.05.range30d': '30 ngày',
  'modules.05.csvKey': 'Lưu tệp CSV',
  'modules.05.jsonKey': 'Lưu tệp JSON',
  'modules.05.formatTitle': 'Định dạng tệp',
  'modules.05.formatCsv': 'CSV: dấu chấm phẩy ngăn cách các cột, dấu phẩy là dấu thập phân, mã hóa UTF-8 kèm dấu BOM. Excel đặt theo ngôn ngữ dùng dấu phẩy làm dấu thập phân sẽ mở tệp như vậy mà không cần chỉnh gì.',
  'modules.05.formatJson': 'JSON: cùng dữ liệu đó nằm trong trường “points”, với dấu chấm thập phân và dấu thời gian tính bằng mili giây — định dạng này đòi hỏi như vậy.',
  'modules.05.resolution': 'Lịch sử lưu một điểm mỗi 5 giây và lùi được 30 ngày. Tệp không chứa độ phân giải đầy đủ năm mẫu mỗi giây — bộ máy chỉ giữ mức đó trong một phút.',
  'modules.05.offline': 'Tệp được tạo ra trên thiết bị và ở lại trên thiết bị. Việc xuất dữ liệu không kết nối mạng.',
  'modules.05.columnsTitle': 'Mô tả các cột',
  'modules.05.columnsCaption': 'Các cột của tệp và ý nghĩa của chúng',
  'modules.05.descDate': 'Ngày của điểm đo lấy từ đồng hồ thiết bị, ghi theo dạng ngày-tháng-năm.',
  'modules.05.descTime': 'Giờ của điểm đo, chính xác đến giây.',
  'modules.05.descZone': 'Vùng của tỷ lệ ánh sáng xanh tại thời điểm lưu. Bộ máy chỉ lưu vùng cho riêng đại lượng này — với các đại lượng còn lại, hãy tự tính từ các ngưỡng.',
  'modules.05.descMetricTpl': '{short} Đơn vị: {unit}. Dải đo {min}–{max}.',
  'modules.05.previewTitle': 'Xem trước',
  'modules.05.previewHint': 'Năm dòng đầu của tệp, đúng như khi chúng được lưu.',
  'modules.05.savedTpl': 'Đã lưu tệp {name} — {rows} dòng.',
  'modules.05.failed': 'Trình duyệt này không cho lưu tệp.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'Ứng dụng lưu mọi lượt đo đã kết thúc trên thiết bị này. Hãy chọn hai lượt để xem chúng trên cùng một dải và đọc chênh lệch bằng con số.',
  'modules.06.noSessions': 'Chưa có lượt đo nào kết thúc. Hãy chạy một phép đo, dừng lại rồi quay lại đây.',
  'modules.06.slotA': 'Lượt đo A',
  'modules.06.slotB': 'Lượt đo B',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'Dải',
  'modules.06.tapeAriaTpl': 'Diễn biến lượt đo {slot}, đại lượng {name}.',
  'modules.06.tapeHint': 'Cả hai lượt đo được kéo giãn về cùng một bề rộng: một cột là cùng một phần của thời lượng, chứ không phải cùng một giờ đồng hồ. Chiều cao và màu nói lên cùng điều như trên bảng điều khiển.',
  'modules.06.tapeChannelTpl': 'Dải cho thấy kênh chính: {name}.',
  'modules.06.diffTitle': 'Chênh lệch',
  'modules.06.diffCaption': 'Trung bình của hai lượt đo và chênh lệch giữa chúng',
  'modules.06.clearKey': 'Xóa các lượt đo đã lưu',
  'modules.06.cleared': 'Đã xóa các lượt đo đã lưu.',
  'modules.06.savedTpl': 'Đã lưu lượt đo: {dur}.',
  'modules.06.limitsTitle': 'So sánh này không cho biết điều gì',
  'modules.06.limits': 'Bạn đang so sánh hai phép đo, không phải hai nguồn sáng. Nếu giữa hai lượt đo mà khung hình, khoảng cách, thời điểm trong ngày hoặc tư thế điện thoại đã thay đổi, thì chênh lệch cũng nói về những thứ đó nữa. So sánh trung thực nhất là cùng một khung cảnh trước và sau khi thay đổi chiếu sáng.',
  'modules.06.keepTpl': 'Ứng dụng chỉ nhớ nhiều nhất {count} lượt đo gần nhất.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'Các ảnh mẫu kiểm tra hiển thị toàn màn hình trên chính thiết bị này. Chúng dùng để nhìn màn hình bằng mắt: màu trắng có đều không, các mức xám có ngả màu không và đèn nền có hở sáng ở các góc không.',
  'modules.07.steps.1': 'Đặt độ sáng màn hình về mức bạn vẫn thường làm việc và tắt chế độ ban đêm của hệ thống.',
  'modules.07.steps.2': 'Chọn một ảnh mẫu trong danh sách bên dưới. Nó sẽ phủ kín màn hình.',
  'modules.07.steps.3': 'Nhìn từ khoảng sáu mươi xăng-ti-mét, vuông góc với màn hình. Sau đó xem chính ảnh mẫu đó từ một góc nghiêng.',
  'modules.07.steps.4': 'Thoát bằng nút “Đóng ảnh mẫu” hoặc phím Escape rồi chuyển sang ảnh tiếp theo.',
  'modules.07.planesTitle': 'Ảnh mẫu',
  'modules.07.exitKey': 'Đóng ảnh mẫu',
  'modules.07.showAriaTpl': 'Hiện ảnh mẫu: {name}',
  'modules.07.planeAriaTpl': 'Ảnh mẫu kiểm tra: {name}. Nút đóng nằm ở cuối màn hình.',
  'modules.07.plane.white.name': 'Trắng',
  'modules.07.plane.white.hint': 'Hãy tìm vết loang, chỗ ngả màu và những vùng sáng hơn gần mép. Màu trắng phải là một màu duy nhất trên toàn bộ bề mặt.',
  'modules.07.plane.gray75.name': 'Xám 75%',
  'modules.07.plane.gray75.hint': 'Xám phải ra xám. Sắc hơi lục hoặc hơi hồng nghĩa là cân bằng trắng của màn hình đã lệch.',
  'modules.07.plane.gray50.name': 'Xám 50%',
  'modules.07.plane.gray50.hint': 'Ảnh mẫu tốt nhất để đánh giá chỗ ngả màu. Hãy so phần giữa với các góc.',
  'modules.07.plane.gray25.name': 'Xám 25%',
  'modules.07.plane.gray25.hint': 'Xám tối cho thấy chỗ hở sáng của đèn nền và các vệt sọc trên tấm nền rẻ tiền.',
  'modules.07.plane.black.name': 'Đen',
  'modules.07.plane.black.hint': 'Trong phòng tối, ở đây thấy rõ mọi chỗ hở sáng của đèn nền và mọi góc bị sáng lên.',
  'modules.07.plane.red.name': 'Đỏ thuần',
  'modules.07.plane.red.hint': 'Màu đỏ đồng nhất làm lộ ra những điểm ảnh phụ đã chết và chỗ không đều của tấm nền.',
  'modules.07.plane.green.name': 'Lục thuần',
  'modules.07.plane.green.hint': 'Màu lục mang nhiều độ sáng nhất — trên nền này dễ phát hiện điểm ảnh hỏng nhất.',
  'modules.07.plane.blue.name': 'Lam thuần',
  'modules.07.plane.blue.hint': 'Màu lam cho thấy bụi bẩn và vệt mờ trên bề mặt màn hình rõ hơn màu trắng.',
  'modules.07.plane.grid.name': 'Lưới',
  'modules.07.plane.grid.hint': 'Các đường kẻ phải sắc nét ở góc như ở giữa. Nhòe ở rìa là chuyện của việc co giãn hình ảnh.',
  'modules.07.warn': 'Ảnh mẫu che kín toàn màn hình, kể cả bảng điều khiển với nút đo. Đây là chỗ duy nhất trong ứng dụng xảy ra chuyện đó, và vì vậy nút thoát to và luôn nhìn thấy được. Chừng nào ảnh mẫu còn trên màn hình thì phép đo vẫn chạy tiếp và không dừng được — hãy đóng ảnh mẫu để quay lại các nút.',
  'modules.07.cameraTitle': 'Điều bạn không làm được ở đây',
  'modules.07.camera': 'Điện thoại không nhìn thấy màn hình của chính nó, nên bạn không đo được các ảnh mẫu này bằng cùng một thiết bị. Muốn đo một màn hình, hãy hiển thị ảnh mẫu trên màn hình đó và đo bằng điện thoại — hai thiết bị khác nhau và hai vai trò khác nhau.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'Lịch đo nhắc bạn đo vào giờ đã định. Nó không tự bật camera: đến giờ đã đặt, nó hiện một lời nhắc, còn phép đo thì bạn khởi động bằng nút “Bắt đầu đo” trên bảng điều khiển. Y như lần đầu tiên.',
  'modules.08.onlyOpenTitle': 'Khi nào việc này không chạy',
  'modules.08.onlyOpen': 'Lịch đo chỉ chạy khi ứng dụng đang mở. Thẻ trình duyệt đã đóng thì không đếm thời gian và sẽ không nhắc gì cả. Chúng tôi không xin quyền gửi thông báo hệ thống và không gửi gì lên mạng.',
  'modules.08.enableLabel': 'Bật lời nhắc',
  'modules.08.timesTitle': 'Các giờ',
  'modules.08.timeAriaTpl': 'Giờ {n}: giờ của lời nhắc',
  'modules.08.addKey': 'Thêm giờ',
  'modules.08.removeAriaTpl': 'Xóa giờ {time}',
  'modules.08.addedTpl': 'Đã thêm giờ {time}.',
  'modules.08.removedTpl': 'Đã xóa giờ {time}.',
  'modules.08.badTime': 'Hãy nhập giờ theo dạng 22:00.',
  'modules.08.nextTpl': 'Lời nhắc gần nhất: {time}.',
  'modules.08.nextNone': 'Lời nhắc đang tắt.',
  'modules.08.dueTpl': 'Giờ đo theo lịch: {time}.',
  'modules.08.dueKey': 'Mở bảng điều khiển',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'Cảnh báo theo dõi một đại lượng và chỉ lên tiếng khi đại lượng đó giữ nguyên vùng đã chọn liên tục trong khoảng thời gian bạn đặt. Nó không bao giờ dừng phép đo và không bao giờ che các nút.',
  'modules.09.enableLabel': 'Bật cảnh báo',
  'modules.09.metricLabel': 'Đại lượng được theo dõi',
  'modules.09.levelLabel': 'Từ vùng nào',
  'modules.09.levelWarning': 'Từ mức lưu ý trở lên',
  'modules.09.levelCritical': 'Chỉ mức nghiêm trọng',
  'modules.09.sustainLabel': 'Sau bao nhiêu giây liên tục',
  'modules.09.sustainHint': 'Thời gian ngắn hơn sẽ cho nhiều báo động giả hơn khi bạn di chuyển điện thoại. Chúng tôi không xuống dưới năm giây.',
  'modules.09.soundLabel': 'Tiếng bíp ngắn',
  'modules.09.soundHint': 'Âm thanh được tạo ra trên thiết bị. Không có gì được tải về từ mạng.',
  'modules.09.cooldownHint': 'Nhiều nhất một cảnh báo trong hai phút. Báo động lặp lại ở mỗi mẫu là báo động rồi sẽ bị tắt hẳn.',
  'modules.09.whenNotTitle': 'Khi nào cảnh báo không hoạt động',
  'modules.09.whenNot': 'Thông báo nằm bên trong ứng dụng, không phải trong hệ thống. Nó sẽ không hoạt động khi ứng dụng đã đóng hoặc bị ẩn ở nền, khi phép đo không chạy, và khi đại lượng được theo dõi không đo được vào lúc đó. Chúng tôi không xin quyền gửi thông báo hệ thống.',
  'modules.09.firedTpl': '{name}: {zone} đã {sec} s — hiện tại {value}.',
  'modules.09.saved': 'Đã lưu thiết lập cảnh báo.',
  'modules.09.statusOnTpl': 'Đang theo dõi: {name}, {level}, sau {sec} s.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'Ứng dụng này miễn phí',
  'support.freeText': 'Cả bảy đại lượng đều hiện số ngay từ lần chạy đầu tiên. Bộ ghi, ngưỡng, hiệu chuẩn, báo cáo, xuất dữ liệu, so sánh lượt đo và toàn bộ ba mươi ngày lịch sử đều hoạt động không cần tài khoản, không mất phí và không giới hạn — ở chế độ ngoại tuyến cũng vậy. Ở đây không có gì bị để dành lại chờ một khoản thanh toán.',
  'support.whyTitle': 'Vì sao tôi xin điều đó',
  'support.whyText': 'Tôi làm và duy trì Giám sát Ánh sáng một mình, ngoài giờ làm. Sự ủng hộ dành cho thời gian sửa lỗi, cho việc thử nghiệm trên thêm nhiều điện thoại và cho những công cụ tiếp theo trong danh sách mô-đun. Sẽ không có gì ngừng hoạt động nếu không ai đóng góp gì cả.',
  'support.nothingTitle': 'Đóng góp thì được gì',
  'support.nothingText': 'Không gì cả. Không con số nào, không mô-đun nào và không thiết lập nào được mở khóa sau khi đóng góp, vì mọi thứ đã mở khóa từ đầu. Chỉ còn lại chừng này: tôi biết là nó có ích cho ai đó.',
  'support.keyTitle': 'Nếu bạn muốn giúp',
  'support.keyLabel': 'Mời tôi một ly cà phê',
  'support.keyAria': 'Mời tôi một ly cà phê — mở một trang bên ngoài trong tab mới',
  'support.serviceText': 'Hồ sơ đóng góp do Buy Me a Coffee quản lý, và đó là hình thức ủng hộ duy nhất trong ứng dụng này. Ứng dụng không tải từ đó bất kỳ tập lệnh, tiện ích hay hình ảnh nào — ở đây chỉ có một liên kết thông thường và không gì khác.',
  'support.privacyText': 'Nhấn nút này sẽ mở một trang bên ngoài trong tab mới, và đó là lúc duy nhất có thứ gì đó rời khỏi thiết bị này. Kết quả đo, lịch sử và cài đặt vẫn ở nguyên chỗ cũ — trong bộ nhớ của trình duyệt này.',
  'support.privacyPendingText': 'Khi đã có địa chỉ, nhấn nút sẽ mở một trang bên ngoài trong tab mới và đó sẽ là lúc duy nhất có thứ gì đó rời khỏi thiết bị này. Kết quả đo, lịch sử và cài đặt vẫn ở nguyên chỗ cũ — trong bộ nhớ của trình duyệt này.',
  'support.emptyTitle': 'Hồ sơ chưa được kết nối',
  'support.emptyText': 'Địa chỉ của hồ sơ đóng góp chưa được nhập, nên ở đây không có nút nào dẫn đi đâu cả. Phần còn lại của ứng dụng vẫn hoạt động như thường — không có gì phải chờ khoản đóng góp đó.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'Ứng dụng này KHÔNG đo những gì',
  'docs.notList.1': 'Nó không đo quang phổ. Máy ảnh có ba kênh màu rộng, phơi sáng tự động và cân bằng trắng tự động.',
  'docs.notList.2': 'Nó không đo giá trị tuyệt đối. Độ sáng khung hình là một chỉ báo tương đối, không phải kết quả của phép đo quang.',
  'docs.notList.3': 'Nó không đo nhiệt độ màu một cách trực tiếp. Nhiệt độ màu và ảnh hưởng nhịp sinh học là những giá trị gần đúng tính từ màu cơ bản sRGB.',
  'docs.notList.4': 'Nó không thấy nhấp nháy điện lưới. Lấy mẫu 5 Hz chỉ thấy được nhịp đập dưới 2,5 Hz — nhấp nháy điện lưới 100 Hz nằm ngoài tầm với và ứng dụng sẽ không bao giờ báo nó như một kết quả.',
  'docs.notList.5': 'Nó không chẩn đoán và không đưa ra lời khuyên y tế. Không kết quả nào là một trong hai thứ đó.',
  'docs.notList.6': 'Nó không so ánh sáng của bạn với bất kỳ chuẩn chính thức nào. Các ngưỡng là thiết lập mà bạn có thể đổi trong mô-đun 02.',
  'docs.whatTitle': 'Nó đo gì và đo thế nào',
  'docs.whatLead': 'Camera điện thoại nhìn vào một bề mặt được chiếu sáng, và mỗi giây năm lần ứng dụng tính trung bình các kênh R, G và B của phần giữa khung hình. Từ ba con số đó nó suy ra bảy chỉ số.',
  'docs.whatCrop': 'Phần đó là 60% chiều rộng và 60% chiều cao ở giữa khung hình — đúng hình chữ nhật mà khung ngắm vẽ ra trên màn hình NGẮM KHUNG. Ngoài nó ra không có gì được tính.',
  'docs.whatRate': 'Một mẫu mỗi 200 ms, tức 5 lần mỗi giây. Một phút gần nhất nằm trong bộ nhớ ở độ phân giải đầy đủ; mọi thứ cũ hơn được lưu mỗi 5 giây và lùi được ba mươi ngày.',
  'docs.metricsTitle': 'Bảy đại lượng',
  'docs.formulasTitle': 'Công thức',
  'docs.formula.share.formula': 'tỷ lệ = B / (R + G + B) × 100%',
  'docs.formula.share.text': 'Tính trên các giá trị sRGB mà không đảo gamma — cố ý như vậy, vì đây đúng là định nghĩa đã dùng trong phiên bản trước của ứng dụng, nên những ngưỡng đặt hồi đó vẫn có nghĩa như cũ. Nó tách màu sắc ra khỏi độ sáng.',
  'docs.formula.brightness.formula': 'độ sáng = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': 'Giá trị trung bình của các kênh tính theo phần trăm của dải. Cơ chế phơi sáng tự động dịch chuyển nó ở bên dưới, nên đây là một chỉ báo tương đối — hãy so sánh hai khung cảnh, đừng đọc một con số đơn lẻ như một phép đo.',
  'docs.formula.kelvin.title': 'Nhiệt độ màu — phép xấp xỉ của McCamy',
  'docs.formula.kelvin.formula': 'n = (x − 0,3320) / (y − 0,1858)\nCCT = −449 n³ + 3525 n² − 6823,3 n + 5520,33',
  'docs.formula.kelvin.text': 'Trước hết chúng tôi đảo gamma sRGB, sau đó dùng ma trận chuyển sang CIE XYZ cho điểm trắng D65 và tính tọa độ màu x, y. Công thức của McCamy đáng tin trong khoảng chừng 2000 K đến 12500 K. Ngoài khoảng đó, đa thức bậc ba lệch đi, nên kết quả bị cắt và bị đánh dấu là không đáng tin — khi ấy đường nền của thang đo chuyển thành nét đứt và xuất hiện câu “ngoài phạm vi của phương pháp”.',
  'docs.formula.melanopic.title': 'Ảnh hưởng nhịp sinh học — hệ số melanopic',
  'docs.formula.melanopic.formula': 'mel = 0,0016 R + 0,3110 G + 0,8460 B\nY = 0,2127 R + 0,7152 G + 0,0722 B\nkết quả = (mel / Y) × chuẩn hóa về 1,00 cho ánh trắng trung tính',
  'docs.formula.melanopic.text': 'Cả ba kênh ở giá trị tuyến tính. Đại lượng thật là tích phân của quang phổ với đường cong độ nhạy của melanopsin (đỉnh vào khoảng 490 nm); máy ảnh chỉ có ba kênh rộng, nên chúng tôi lấy trọng số các màu cơ bản sRGB theo độ nhạy melanopic ở những bước sóng gần đúng của chúng (R 612 nm, G 549 nm, B 465 nm). Chiều thay đổi thì đáng tin, còn giá trị tuyệt đối thì không — vì vậy bên cạnh con số này có dấu “≈”.',
  'docs.formula.flicker.formula': 'nhấp nháy = (max − min) / (max + min) × 100%',
  'docs.formula.flicker.text': 'Định nghĩa của IES, tính từ một cửa sổ mẫu độ sáng. Tần số được ước lượng từ số lần tín hiệu cắt qua giá trị trung bình. Lấy mẫu 5 Hz chỉ thấy được điều biến dưới 2,5 Hz (giới hạn Nyquist), và chúng tôi chỉ coi tần số là đáng tin khi nó nằm giữa 0,2 và 2 Hz với biên độ từ 0,5% trở lên — dưới ngưỡng đó, những lần cắt qua giá trị trung bình là nhiễu của cảm biến, chứ không phải nhịp đập của nguồn sáng.',
  'docs.formula.uniformity.formula': 'độ đồng đều = ô tối nhất / ô sáng nhất × 100%',
  'docs.formula.uniformity.text': 'Chúng tôi chia phần khung hình đó thành chín ô trong lưới 3×3 rồi so hai ô cực trị. 100% là ánh sáng phân bố hoàn toàn đều. Giá trị thấp trên màn hình nghĩa là hở sáng đèn nền hoặc có phản chiếu, còn trên bàn làm việc nghĩa là đèn đặt sai chỗ. Đây là đại lượng duy nhất, cùng với tiện nghi thị giác, mà cao hơn nghĩa là tốt hơn.',
  'docs.formula.comfort.formula': '100 điểm trừ đi các mức phạt:\nnhịp sinh học trên 0,75 — tối đa 35 điểm\nmàu trên 4000 K — tối đa 25 điểm\nnhấp nháy trên 5% — tối đa 25 điểm\nđộ đồng đều dưới 60% — tối đa 15 điểm',
  'docs.formula.comfort.text': 'Một đánh giá thay cho sáu con số. Đại lượng không đo được thì không bị phạt gì — thiếu dữ liệu không bao giờ giả làm một kết quả tốt. Các trọng số là đánh giá biên tập của chúng tôi, không phải tiêu chuẩn; vì vậy mô-đun 01 cho thấy phần chia nhỏ theo từng thành phần, để có thể không đồng ý với đánh giá đó.',
  'docs.rangesTitle': 'Dải đo và ngưỡng',
  'docs.rangesLead': 'Các ngưỡng bên dưới là những ngưỡng đang có hiệu lực lúc này — nếu bạn đã đổi chúng trong mô-đun 02, bảng sẽ hiện giá trị của bạn, không phải giá trị gốc.',
  'docs.dirNormal': 'thấp hơn nghĩa là dịu hơn',
  'docs.dirInvert': 'cao hơn nghĩa là tốt hơn',
  'docs.privacyTitle': 'Dữ liệu và quyền riêng tư',
  'docs.privacyText': 'Hình ảnh từ camera không được gửi đi hay lưu lại ở bất cứ đâu — từ mỗi khung hình chỉ giữ lại ba con số. Kết quả đo, các ngưỡng và cài đặt nằm trong bộ nhớ trình duyệt trên thiết bị này. Ứng dụng không thực hiện bất kỳ yêu cầu mạng nào và chạy được ở chế độ ngoại tuyến.',
  'docs.mdrTitle': 'Miễn trừ trách nhiệm',
  'docs.freeText': 'Ứng dụng hoàn toàn miễn phí và sẽ giữ nguyên như vậy: cả bảy đại lượng, lịch sử, báo cáo, xuất dữ liệu và chế độ ngoại tuyến đều hoạt động không cần tài khoản, không mất phí và không giới hạn. Ai muốn nói lời cảm ơn sẽ tìm thấy mô-đun 10 “Ủng hộ”.',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'Ứng dụng đã tải không đầy đủ',
  'boot.filesTpl': 'Những tệp sau không tải được: {list}.',
  'boot.modulesTpl': 'Những mô-đun sau không báo danh: {list} — các mục đó sẽ không mở được từ danh sách.',
  'boot.modulesRangeTpl': 'mô-đun {from}–{to}',
  'boot.tail': 'Hãy tải lại trang. Nếu vẫn không được thì các tệp trên máy chủ là không đầy đủ.',
  'boot.loss.bus': 'các mô-đun sẽ không thấy nhau và phép đo sẽ không chạy',
  'boot.loss.metrics': 'sẽ không có giá trị nào được tính',
  'boot.loss.scaleCore': 'hình học của thang đo và cách định dạng số sẽ biến mất',
  'boot.loss.scaleText': 'mọi dòng chữ của giao diện sẽ biến mất',
  'boot.loss.shell': 'sẽ không mở được mô-đun nào',
  'boot.loss.engine': 'camera và phép đo sẽ không chạy',
  'boot.loss.dash': 'bảng điều khiển sẽ trống'
});
