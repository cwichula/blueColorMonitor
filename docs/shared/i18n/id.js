/* docs/shared/i18n/id.js — słownik WSPÓLNY, indonezyjski (Bahasa Indonesia).
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest indonezyjski.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — pilnuje tego
 * docs/shared/i18n/keys.test.js. Klucza, którego nie ma w angielskim, nie wolno
 * tu dopisać: angielski jest wartością zapasową, więc to on wyznacza zestaw.
 *
 * REJESTR: forma grzecznościowa „Anda”, konsekwentnie w całym pliku. Ton jak
 * w oryginale — rzeczowy i spokojny, bez marketingu i bez straszenia.
 *
 * TERMINOLOGIA (jeden odpowiednik na pojęcie): porsi biru, kecerahan
 * pemandangan, suhu warna, dampak sirkadian (rasio melanopik), kedipan,
 * kemerataan, kenyamanan mata.
 *
 * LICZEBNIKI: indonezyjski nie odmienia rzeczownika przez liczbę — CLDR daje
 * mu jedną kategorię, 'other', i tylko ona ma tu prawo wystąpić.
 *
 * ZAPIS LICZB: przecinek dziesiętny, tak jak po polsku — „1,00”, „0,50”.
 */
window.I18nData = window.I18nData || {};
window.I18nData['id'] = Object.assign(window.I18nData['id'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu
     (UE) 2017/745, gdzie stoi na początku zdania. */
  'app.name': 'Monitor Cahaya',

  /* ---- wybór języka ---- */

  'language.label': 'Bahasa',
  'language.help': 'Bahasa untuk seluruh aplikasi. Semua bahasa sudah ada di perangkat ini — tidak ada yang diunduh dan tidak ada yang dikirim ke mana pun.',
  'language.auto': 'Ikuti perangkat',
  'language.autoHint': 'Mengikuti bahasa yang disetel di ponsel atau peramban.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Porsi biru',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'persen',
  'metric.share.short': 'Berapa banyak dari cahaya yang terlihat jatuh pada kanal biru.',
  'metric.share.help': 'Memisahkan warna dari kecerahan — nilai inilah yang bergerak ketika Anda menyalakan mode malam.',

  'metric.brightness.name': 'Kecerahan pemandangan',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'persen',
  'metric.brightness.short': 'Kecerahan rata-rata gambar dari kamera.',
  'metric.brightness.help': 'Nilai relatif, bukan lux — eksposur otomatis kamera terus menggesernya dari balik layar.',

  'metric.kelvin.name': 'Suhu warna',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'kelvin',
  'metric.kelvin.short': 'Apakah cahayanya hangat atau sejuk.',
  'metric.kelvin.help': 'Di bawah 3000 K cahaya terasa hangat dan lebih lembut pada malam hari. 6500 K adalah putih bawaan sebagian besar layar.',

  'metric.melanopic.name': 'Dampak sirkadian',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'kali',
  'metric.melanopic.short': 'Seberapa kuat cahaya ini bekerja pada jam biologis tubuh.',
  'metric.melanopic.help': 'Perkiraan rasio melanopik. 1,00 adalah putih siang yang netral; pada malam hari sebaiknya turun di bawah 0,50.',

  'metric.flicker.name': 'Kedipan',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'persen',
  'metric.flicker.short': 'Denyut sumber cahaya yang tidak terlihat mata.',
  'metric.flicker.help': 'Peredup dan lampu latar yang murah berdenyut. Mata tidak melihatnya, tetapi hal itu diketahui menjadi penyebab kelelahan dan sakit kepala.',

  'metric.uniformity.name': 'Kemerataan',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'persen',
  'metric.uniformity.short': 'Apakah cahaya tersebar merata di seluruh bingkai.',
  'metric.uniformity.help': 'Nilai rendah pada layar berarti rembesan lampu latar atau pantulan; di meja kerja berarti lampu yang salah ditempatkan.',

  'metric.comfort.name': 'Kenyamanan mata',
  'metric.comfort.unit': 'poin',
  'metric.comfort.unitSpoken': 'poin',
  'metric.comfort.short': 'Satu penilaian sebagai ganti enam angka.',
  'metric.comfort.help': 'Menggabungkan hasil pengukuran lain menjadi skor 0–100 dan menunjukkan apa yang paling menurunkannya. Bobotnya adalah penilaian redaksi kami, bukan sebuah standar.',

  'comfort.penalty.melanopic': 'Dampak sirkadian',
  'comfort.penalty.kelvin': 'Warna cahaya yang sejuk',
  'comfort.penalty.flicker': 'Kedipan',
  'comfort.penalty.uniformity': 'Pencahayaan tidak merata',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. */

  'engine.idle': 'Tekan “Start” untuk menyalakan kamera.',
  'engine.starting': 'Menyalakan kamera…',

  'engine.error.permission': 'Tidak ada izin untuk menggunakan kamera. Izinkan kamera di pengaturan peramban lalu tekan “Start” lagi.',
  'engine.error.notFound': 'Kamera tidak ditemukan. Periksa apakah perangkat ini memiliki kamera dan apakah kamera tidak dimatikan di sistem.',
  'engine.error.busy': 'Kamera sedang dipakai aplikasi lain. Tutup aplikasi itu lalu coba lagi.',
  'engine.error.unknown': 'Kamera tidak dapat dinyalakan.',
  'engine.error.unsupported': 'Peramban ini tidak memberi halaman ini akses ke kamera. Buka aplikasi melalui HTTPS atau gunakan peramban lain.',

  /* ---- strefy ---- */

  'zone.good': 'Dalam batas',
  'zone.warning': 'Perhatian',
  'zone.critical': 'Kritis',
  'zone.none': 'Tidak ada data',
  'zone.settling': 'Menstabilkan',

  /* Wersja mówiona — małą literą i bez kropki, czytnik ekranu wpina ją
     w środek zdania. */
  'zone.spoken.good': 'dalam batas',
  'zone.spoken.warning': 'perhatian',
  'zone.spoken.critical': 'kritis',
  'zone.spoken.none': 'tidak ada data',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'poin',
  'unit.hertz': 'Hz',
  'unit.second': 'dtk',
  'unit.minute': 'mnt',
  'unit.hour': 'jam',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'Cahaya ini baik-baik saja — tidak ada yang melewati ambang yang Anda setel.',
  'verdict.noValue': 'Besaran ini tidak dapat diukur sekarang. Periksa apakah ada sesuatu yang menutupi lensa.',
  'verdict.warmup': 'Sedang menyusun penilaian — tahan ponsel tetap diam sebentar lagi.',

  'verdict.warning.share': 'Cukup banyak dari cahaya ini jatuh pada kanal biru. Pada malam hari sebaiknya diredupkan.',
  'verdict.warning.brightness': 'Pemandangan ini terang — kamera bekerja dekat dengan batas atas jangkauannya.',
  'verdict.warning.kelvin': 'Cahayanya cukup sejuk. Pada malam hari bohlam sekitar 2700 K terasa lebih lembut.',
  'verdict.warning.melanopic': 'Cahaya ini bekerja cukup kuat pada jam biologis tubuh.',
  'verdict.warning.flicker': 'Sumber cahaya jelas berdenyut.',
  'verdict.warning.uniformity': 'Cahaya tersebar tidak merata di dalam bingkai.',
  'verdict.warning.comfort': 'Kenyamanan mata menurun — beberapa hal sekaligus menyebabkannya.',

  'verdict.critical.share': 'Biru sangat banyak. Pada malam hari nyalakan mode malam atau ganti sumber cahayanya.',
  'verdict.critical.brightness': 'Pemandangan ini sangat terang. Jangan mengukur dengan mengarahkan kamera lurus ke sumber cahaya.',
  'verdict.critical.kelvin': 'Cahayanya dingin. Pada malam hari inilah yang paling melelahkan mata — bohlam yang lebih hangat atau mode malam akan membantu.',
  'verdict.critical.melanopic': 'Cahaya ini bekerja kuat pada jam biologis tubuh. Pada malam hari sebaiknya turun di bawah 0,50.',
  'verdict.critical.flicker': 'Sumber cahaya berdenyut kuat. Hal ini diketahui menjadi penyebab kelelahan mata dan sakit kepala.',
  'verdict.critical.uniformity': 'Cahaya tersebar sangat tidak merata. Periksa posisi lampu atau pantulan pada layar.',
  /* Zdanie bez numeru modułu — wersja nadpisze ten jeden klucz u siebie, jeśli
     chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'Kenyamanan mata rendah. Lihat rincian skornya untuk mengetahui apa yang menurunkannya.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'Apa yang tidak dikatakan angka ini',
  'note.warningTitle': 'Perhatian',
  'note.dashTitle': 'Batas dari pengukuran ini',
  'note.dashText': 'Kamera ponsel memiliki tiga kanal warna yang lebar dan keseimbangan putih otomatis — ia tidak mengukur spektrum. Suhu warna dan dampak sirkadian adalah perkiraan yang dihitung dari warna primer sRGB. Aplikasi ini menunjukkan perbedaan dan perubahan dari waktu ke waktu dengan baik; ia tidak menggantikan alat ukur dan tidak menegakkan diagnosis apa pun.',
  'note.approxLegend': '≈ nilai perkiraan — dihitung dari warna primer sRGB, bukan dari pengukuran spektrum.',
  'note.kelvinOutOfRange': 'Di luar jangkauan metode — pada warna ini rumus suhu warna tidak lagi dapat dipercaya.',
  /* {rate} i {limit} podaje wywołanie — to liczby z silnika, a ich zapis jest
     zależny od języka. Nie wpisuje się ich do zdania na sztywno. */
  'note.flickerOutOfRange': 'Di luar jangkauan metode — pencuplikan {rate} Hz hanya melihat denyut di bawah {limit} Hz. Kedipan jaringan listrik 100 Hz berada di luar jangkauan dan aplikasi tidak akan pernah melaporkannya sebagai hasil.',
  'note.helpTitle': 'Apa yang tidak dikatakan angka ini',
  'note.helpText': 'Kamera ponsel memiliki tiga kanal yang lebar dan tidak mengukur spektrum. Nilai ini adalah indikator pembanding — ia menunjukkan perbedaan antarcahaya dan perubahan dari waktu ke waktu dengan baik, dan bukan hasil pengukuran laboratorium maupun informasi medis.',
  'note.calibration': 'Pengukuran tanpa kalibrasi — perlakukan nilainya sebagai pembanding.',

  'note.howToTitle': 'Cara mengukur yang masuk akal',
  'note.howTo.hold.title': 'Tahan ponsel tetap diam',
  'note.howTo.hold.text': 'Eksposur otomatis butuh 2–3 detik untuk stabil.',
  'note.howTo.aim.title': 'Arahkan ke permukaan yang terkena cahaya',
  'note.howTo.aim.text': 'Selembar kertas putih atau dinding yang terang. Jangan mengukur dengan melihat lurus ke sumber cahaya.',
  'note.howTo.compare.title': 'Bandingkan, jangan menilai secara mutlak',
  'note.howTo.compare.text': 'Pemandangan yang sama sebelum dan sesudah perubahan pencahayaan berkata lebih banyak daripada satu angka.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Nie skraca się go dla stylu. */

  'legal.noDiagnosis': 'Tidak ada hasil pengukuran yang merupakan diagnosis atau saran kesehatan.',
  'legal.mdr': '{app} bukan alat kesehatan dalam pengertian Peraturan (UE) 2017/745, tidak dimaksudkan untuk mendiagnosis, mencegah, memantau, atau mengobati kondisi medis apa pun, dan tidak menggantikan pemeriksaan oleh dokter maupun optometris.',

  /* ---- prywatność ---- */

  'privacy.title': 'Apa yang keluar dari perangkat ini',
  'privacy.short': 'Tidak ada bagian dari aplikasi ini yang mengirim apa pun ke jaringan. Semua angka dihasilkan di perangkat ini dan tetap di sini.',
  'privacy.onDevice': 'Kamera baru menyala setelah Anda menekan tombolnya, dan gambarnya tidak pernah meninggalkan perangkat ini.',
  'privacy.external': 'Ini satu-satunya tempat di seluruh aplikasi yang membuat sesuatu meninggalkan perangkat ini: tombolnya membuka halaman eksternal di tab baru, dan hanya setelah Anda menekannya. Hasil pengukuran, riwayat, dan pengaturan tetap di sini.',
  'privacy.externalPending': 'Begitu alamatnya tersedia, tombol ini akan membuka halaman eksternal di tab baru. Itu akan menjadi satu-satunya saat ketika sesuatu meninggalkan perangkat ini. Hasil pengukuran, riwayat, dan pengaturan tetap di sini.',
  'privacy.storageBlocked': 'Peramban ini tidak mengizinkan apa pun disimpan (mode privat, atau data situs diblokir). Pengukuran tetap berjalan, tetapi riwayatnya akan hilang saat Anda menutup tab.',

  /* ---- liczebniki ----
     Indonezyjski nie odmienia rzeczownika przez liczbę: CLDR daje mu jedną
     kategorię, 'other'. Formę wybiera Intl.PluralRules('id'). */

  'count.readings': { other: '{n} pembacaan' },
  'count.sessions': { other: '{n} sesi pengukuran' },
  'count.seconds': { other: '{n} detik' },
  'count.minutes': { other: '{n} menit' },
  'count.hours': { other: '{n} jam' },
  'count.days': { other: '{n} hari' }
});
