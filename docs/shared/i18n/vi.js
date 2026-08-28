/* docs/shared/i18n/vi.js — słownik WSPÓLNY, wietnamski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest wietnamski.
 *
 * SKĄD TE ZDANIA: tłumaczenie z polskiego (pl.js — redakcja pierwotna),
 * z angielskim (en.js) jako wzorcem terminologii i rejestru. ZESTAW KLUCZY
 * jest dokładnie taki sam jak w pl.js i en.js. Klucza, którego nie ma
 * w angielskim, nie wolno tu dopisać: angielski jest wartością zapasową,
 * więc to on wyznacza zestaw.
 *
 * TERMINOLOGIA (jeden odpowiednik na pojęcie w całym pliku):
 *   udział niebieskiego      → tỷ lệ ánh sáng xanh (kanał: kênh lam)
 *   jasność sceny            → độ sáng khung hình
 *   temperatura barwowa      → nhiệt độ màu
 *   wpływ na rytm dobowy     → ảnh hưởng nhịp sinh học
 *     (współczynnik melanopiczny → hệ số melanopic; zegar biologiczny → đồng hồ sinh học)
 *   migotanie                → nhấp nháy
 *   równomierność            → độ đồng đều
 *   komfort wzrokowy         → tiện nghi thị giác (termin z norm oświetleniowych)
 *
 * LICZBY: wietnamski zapisuje ułamek przecinkiem — „1,00”, „0,50” — tak samo
 * jak polski. Symbole jednostek (%, K, ×, Hz) zostają bez zmian.
 *
 * LICZEBNIKI: Intl.PluralRules('vi') zwraca JEDNĄ kategorię — 'other'.
 * Wietnamski nie odmienia rzeczownika przez liczbę, więc obiekt form ma
 * dokładnie jeden klucz i to nie jest niedoróbka.
 */
window.I18nData = window.I18nData || {};
window.I18nData['vi'] = Object.assign(window.I18nData['vi'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu (UE) 2017/745. */
  'app.name': 'Giám sát Ánh sáng',

  /* ---- wybór języka ---- */

  'language.label': 'Ngôn ngữ',
  'language.help': 'Ngôn ngữ của toàn bộ ứng dụng. Mọi ngôn ngữ đều đã có sẵn trên thiết bị này — không tải về thứ gì và không gửi thứ gì đi đâu cả.',
  'language.auto': 'Theo thiết bị',
  'language.autoHint': 'Theo ngôn ngữ đã đặt trong điện thoại hoặc trình duyệt.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Tỷ lệ ánh sáng xanh',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'phần trăm',
  'metric.share.short': 'Bao nhiêu phần ánh sáng nhìn thấy rơi vào kênh lam.',
  'metric.share.help': 'Tách màu sắc ra khỏi độ sáng — đây là giá trị thay đổi khi bạn bật chế độ ban đêm.',

  'metric.brightness.name': 'Độ sáng khung hình',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'phần trăm',
  'metric.brightness.short': 'Độ sáng trung bình của hình ảnh từ camera.',
  'metric.brightness.help': 'Giá trị tương đối, không phải lux — cơ chế phơi sáng tự động của camera vẫn dịch chuyển nó ở bên dưới.',

  'metric.kelvin.name': 'Nhiệt độ màu',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'kelvin',
  'metric.kelvin.short': 'Ánh sáng ấm hay lạnh.',
  'metric.kelvin.help': 'Dưới 3000 K ánh sáng ấm và dịu hơn vào buổi tối. 6500 K là màu trắng mặc định của phần lớn màn hình.',

  'metric.melanopic.name': 'Ảnh hưởng nhịp sinh học',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'lần',
  'metric.melanopic.short': 'Ánh sáng này tác động mạnh đến mức nào lên đồng hồ sinh học.',
  'metric.melanopic.help': 'Giá trị gần đúng của hệ số melanopic. 1,00 là ánh sáng trắng ban ngày trung tính; buổi tối nên hạ xuống dưới 0,50.',

  'metric.flicker.name': 'Nhấp nháy',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'phần trăm',
  'metric.flicker.short': 'Nhịp đập không nhìn thấy được của nguồn sáng.',
  'metric.flicker.help': 'Bộ điều sáng và đèn nền rẻ tiền đều đập nhịp. Mắt không nhìn thấy, nhưng đó vẫn là nguyên nhân gây mỏi mắt và đau đầu.',

  'metric.uniformity.name': 'Độ đồng đều',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'phần trăm',
  'metric.uniformity.short': 'Ánh sáng có phân bố đều trong khung hình hay không.',
  'metric.uniformity.help': 'Giá trị thấp trên màn hình nghĩa là hở sáng đèn nền hoặc có phản chiếu; trên bàn làm việc nghĩa là đèn đặt sai chỗ.',

  'metric.comfort.name': 'Tiện nghi thị giác',
  'metric.comfort.unit': 'điểm',
  'metric.comfort.unitSpoken': 'điểm',
  'metric.comfort.short': 'Một đánh giá thay cho sáu con số.',
  'metric.comfort.help': 'Gộp các phép đo còn lại thành điểm 0–100 và cho thấy điều gì kéo nó xuống nhiều nhất. Trọng số là đánh giá biên tập của chúng tôi, không phải tiêu chuẩn.',

  /* Etykiety składników oceny komfortu — nazwa klucza idzie za `penalties[].id`. */
  'comfort.penalty.melanopic': 'Ảnh hưởng nhịp sinh học',
  'comfort.penalty.kelvin': 'Màu ánh sáng lạnh',
  'comfort.penalty.flicker': 'Nhấp nháy',
  'comfort.penalty.uniformity': 'Chiếu sáng không đều',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     „Start” zostaje po angielsku, bo tak brzmi etykieta przycisku
     (action.start) także w pl.js i en.js wersji aplikacji. */

  'engine.idle': 'Nhấn “Start” để bật camera.',
  'engine.starting': 'Đang khởi động camera…',

  'engine.error.permission': 'Không có quyền dùng camera. Hãy cho phép dùng camera trong cài đặt trình duyệt rồi nhấn “Start” lần nữa.',
  'engine.error.notFound': 'Không tìm thấy camera. Hãy kiểm tra xem thiết bị có camera không và camera có bị tắt trong hệ thống không.',
  'engine.error.busy': 'Camera đang được một ứng dụng khác sử dụng. Hãy đóng ứng dụng đó rồi thử lại.',
  'engine.error.unknown': 'Không khởi động được camera.',
  'engine.error.unsupported': 'Trình duyệt này không cho trang này dùng camera. Hãy mở ứng dụng qua HTTPS hoặc dùng trình duyệt khác.',

  /* ---- strefy ---- */

  'zone.good': 'Trong ngưỡng',
  'zone.warning': 'Lưu ý',
  'zone.critical': 'Nghiêm trọng',
  'zone.none': 'Không có dữ liệu',
  'zone.settling': 'Đang ổn định',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania, więc małą literą
     i bez kropki. */
  'zone.spoken.good': 'trong ngưỡng',
  'zone.spoken.warning': 'lưu ý',
  'zone.spoken.critical': 'nghiêm trọng',
  'zone.spoken.none': 'không có dữ liệu',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'điểm',
  'unit.hertz': 'Hz',
  'unit.second': 'giây',
  'unit.minute': 'phút',
  'unit.hour': 'giờ',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'Ánh sáng này ổn — không có giá trị nào vượt ngưỡng bạn đã đặt.',
  'verdict.noValue': 'Hiện không đo được đại lượng này. Hãy kiểm tra xem ống kính có bị che không.',
  'verdict.warmup': 'Đang xác định đánh giá — hãy giữ yên điện thoại thêm một lát.',

  'verdict.warning.share': 'Khá nhiều ánh sáng ở đây rơi vào kênh lam. Buổi tối nên giảm bớt độ sáng.',
  'verdict.warning.brightness': 'Khung hình sáng — camera đang làm việc sát giới hạn trên của dải đo.',
  'verdict.warning.kelvin': 'Ánh sáng khá lạnh. Buổi tối, bóng đèn khoảng 2700 K sẽ dịu hơn.',
  'verdict.warning.melanopic': 'Ánh sáng này tác động khá mạnh lên đồng hồ sinh học.',
  'verdict.warning.flicker': 'Nguồn sáng đập nhịp thấy rõ.',
  'verdict.warning.uniformity': 'Ánh sáng phân bố không đều trong khung hình.',
  'verdict.warning.comfort': 'Tiện nghi thị giác bị giảm — có vài yếu tố cộng lại cùng lúc.',

  'verdict.critical.share': 'Rất nhiều ánh sáng xanh. Buổi tối hãy bật chế độ ban đêm hoặc đổi nguồn sáng.',
  'verdict.critical.brightness': 'Khung hình rất sáng. Đừng đo bằng cách hướng thẳng vào nguồn sáng.',
  'verdict.critical.kelvin': 'Ánh sáng lạnh. Buổi tối, đây là thứ gây mỏi mắt nhất — bóng đèn ấm hơn hoặc chế độ ban đêm sẽ giúp ích.',
  'verdict.critical.melanopic': 'Ánh sáng này tác động mạnh lên đồng hồ sinh học. Buổi tối nên hạ xuống dưới 0,50.',
  'verdict.critical.flicker': 'Nguồn sáng đập nhịp mạnh. Đó là nguyên nhân gây mỏi mắt và đau đầu.',
  'verdict.critical.uniformity': 'Ánh sáng phân bố rất không đều. Hãy kiểm tra vị trí đèn hoặc phản chiếu trên màn hình.',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru. */
  'verdict.critical.comfort': 'Tiện nghi thị giác thấp. Hãy xem phần phân tích điểm để biết điều gì kéo nó xuống.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'Con số này không cho biết điều gì',
  'note.warningTitle': 'Lưu ý',
  'note.dashTitle': 'Phép đo này không phải là gì',
  'note.dashText': 'Camera điện thoại có ba kênh màu rộng và cân bằng trắng tự động — nó không đo quang phổ. Nhiệt độ màu và ảnh hưởng nhịp sinh học là những giá trị gần đúng tính từ màu cơ bản sRGB. Ứng dụng cho thấy rõ khác biệt và thay đổi theo thời gian, nhưng không thay thế máy đo và không đưa ra bất kỳ chẩn đoán nào.',
  'note.approxLegend': '≈ giá trị gần đúng — tính từ màu cơ bản sRGB, không phải từ phép đo quang phổ.',
  'note.kelvinOutOfRange': 'Ngoài phạm vi của phương pháp — ở màu này, công thức tính nhiệt độ màu không còn đáng tin.',
  /* {rate} i {limit} podaje wywołanie: to liczby z silnika, a ich zapis zależy
     od języka (2.5 po angielsku, 2,5 po wietnamsku i po polsku). */
  'note.flickerOutOfRange': 'Ngoài phạm vi của phương pháp — lấy mẫu ở {rate} Hz chỉ thấy được nhịp đập dưới {limit} Hz. Nhấp nháy điện lưới 100 Hz nằm ngoài tầm với và ứng dụng sẽ không bao giờ báo nó như một kết quả đo.',
  'note.helpTitle': 'Con số này không cho biết điều gì',
  'note.helpText': 'Camera điện thoại có ba kênh rộng và không đo quang phổ. Giá trị này là một chỉ báo để so sánh — nó cho thấy rõ khác biệt giữa các nguồn sáng và thay đổi theo thời gian, chứ không phải kết quả đo trong phòng thí nghiệm hay thông tin y tế.',
  'note.calibration': 'Phép đo không hiệu chuẩn — hãy coi các giá trị là để so sánh.',

  'note.howToTitle': 'Đo thế nào cho hợp lý',
  'note.howTo.hold.title': 'Giữ yên điện thoại',
  'note.howTo.hold.text': 'Cơ chế phơi sáng tự động cần 2–3 giây để ổn định.',
  'note.howTo.aim.title': 'Hướng vào bề mặt được chiếu sáng',
  'note.howTo.aim.text': 'Một tờ giấy trắng hoặc bức tường sáng màu. Đừng đo bằng cách nhìn thẳng vào nguồn sáng.',
  'note.howTo.compare.title': 'Hãy so sánh, đừng đánh giá tuyệt đối',
  'note.howTo.compare.text': 'Cùng một khung cảnh trước và sau khi thay đổi chiếu sáng nói lên nhiều điều hơn một con số đơn lẻ.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone — nie skraca się go dla stylu. */

  'legal.noDiagnosis': 'Không kết quả đo nào là chẩn đoán hay lời khuyên y tế.',
  'legal.mdr': '{app} không phải là thiết bị y tế theo nghĩa của Quy định (EU) 2017/745, không dùng để chẩn đoán, phòng ngừa, theo dõi hay điều trị bất kỳ tình trạng bệnh lý nào và không thay thế việc khám bác sĩ hay chuyên viên đo thị lực.',

  /* ---- prywatność ---- */

  'privacy.title': 'Những gì rời khỏi thiết bị này',
  'privacy.short': 'Không có gì trong ứng dụng này gửi bất cứ thứ gì lên mạng. Mọi con số đều được tạo ra trên thiết bị này và ở lại đây.',
  'privacy.onDevice': 'Camera chỉ bật sau khi bạn nhấn nút, và hình ảnh không bao giờ rời khỏi thiết bị này.',
  'privacy.external': 'Đây là nơi duy nhất trong toàn bộ ứng dụng có thứ gì đó rời khỏi thiết bị này: nút này mở một trang bên ngoài trong tab mới, và chỉ khi bạn đã nhấn nó. Kết quả đo, lịch sử và cài đặt vẫn ở lại đây.',
  'privacy.externalPending': 'Khi đã có địa chỉ, nút này sẽ mở một trang bên ngoài trong tab mới. Đó sẽ là lúc duy nhất có thứ gì đó rời khỏi thiết bị này. Kết quả đo, lịch sử và cài đặt vẫn ở lại đây.',
  'privacy.storageBlocked': 'Trình duyệt này không cho lưu bất cứ thứ gì (chế độ riêng tư hoặc dữ liệu trang web bị chặn). Việc đo vẫn chạy, nhưng lịch sử sẽ biến mất khi bạn đóng tab.',

  /* ---- liczebniki ----
     Wietnamski ma jedną kategorię CLDR: 'other'. Rzeczownik nie zmienia formy
     przy żadnej liczbie, więc każdy obiekt ma dokładnie tę jedną formę.
     Formę wybiera Intl.PluralRules('vi'), nie nasza reguła. */

  'count.readings': { other: '{n} lần đọc' },
  'count.sessions': { other: '{n} lượt đo' },
  'count.seconds': { other: '{n} giây' },
  'count.minutes': { other: '{n} phút' },
  'count.hours': { other: '{n} giờ' },
  'count.days': { other: '{n} ngày' }
});
