/* docs/v1/i18n/id.js — słownik WŁASNY wersji v1, indonezyjski (Bahasa Indonesia).
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka. Kolejność jest treścią umowy: plik wersji dokłada się do tego samego
 * obiektu i może nadpisać dowolny klucz wspólny — nigdy odwrotnie.
 *
 * DLACZEGO TEN SŁOWNIK JEST SAMOWYSTARCZALNY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar w app.js, własne
 * dwie wielkości zamiast siedmiu i własne nazwy stref („Aman” zamiast
 * wspólnego „Dalam batas”). Dlatego wszystko, co v1 pokazuje, stoi TUTAJ —
 * także klucze, które przypadkiem brzmią tak samo jak wspólne. Gdyby kiedyś
 * warstwa wspólna zmieniła brzmienie stref albo nazwę aplikacji, v1 ma zostać
 * nietknięta. Zestaw kluczy jest identyczny z pl.js — pilnuje tego
 * docs/shared/i18n/keys.test.js.
 *
 * TREŚĆ wzięta z pl.js, TERMINOLOGIA — z docs/shared/i18n/id.js, żeby ta sama
 * rzecz nie nazywała się w v1 inaczej niż w pozostałych wersjach: porsi biru,
 * kecerahan pemandangan, suhu warna, pembacaan, ambang, profil ambang,
 * peramban. Nazw pięciu wielkości, których v1 nie mierzy, stamtąd nie
 * przeniesiono. Strefy zostają własne: aman / sedang / berbahaya.
 *
 * REJESTR: forma grzecznościowa „Anda”, konsekwentnie i oszczędnie —
 * indonezyjski opuszcza zaimek tam, gdzie polski go stawia. Ton jak
 * w oryginale: rzeczowy i spokojny, bez marketingu i bez straszenia.
 *
 * ZASTRZEŻENIA MEDYCZNE i akapity o prywatności przełożone co do treści, bez
 * osłabiania i bez dodawania obietnic — to zdania o skutkach prawnych.
 *
 * LICZEBNIKI: indonezyjski nie odmienia rzeczownika przez liczbę — CLDR daje
 * mu jedną kategorię, 'other', i tylko ona ma tu prawo wystąpić.
 *
 * MARKUP W WARTOŚCIACH. Część kluczy (rozdziały Dokumentacji) zawiera znaczniki
 * <b>, <i>, <code> i encje HTML. Wstawiane są przez data-i18n-html, czyli tylko
 * tam, gdzie autor tekstu świadomie tego chciał — nigdy do treści pochodzącej
 * od użytkownika.
 */
window.I18nData = window.I18nData || {};
window.I18nData['id'] = Object.assign(window.I18nData['id'] || {}, {

  /* ---- aplikacja ---- */

  'app.name': 'Monitor Cahaya Berbahaya',
  'app.description': 'Mengukur dengan kamera seberapa kuat warna biru pada layar dan menampilkannya pada grafik yang jelas dengan zona: aman, sedang, berbahaya.',

  /* ---- wybór języka ---- */

  'language.label': 'Bahasa',
  'language.help': 'Bahasa untuk seluruh aplikasi. Semua bahasa sudah ada di perangkat ini — tidak ada yang diunduh dan tidak ada yang dikirim ke mana pun.',
  'language.auto': 'Ikuti perangkat',

  /* ---- nawigacja ---- */

  'nav.aria': 'Menu utama',
  'nav.tabsAria': 'Tampilan aplikasi',
  'nav.announce': 'Layar: {screen}',
  'nav.camera': 'Kamera',
  'nav.monitoring': 'Pemantauan',
  'nav.support': 'Dukungan',
  'nav.more': 'Lainnya',
  'nav.docs': 'Dokumentasi',
  'nav.about': 'Tentang dan kontak',
  'nav.settings': 'Ambang peringatan',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← Kembali',
  'action.back.aria': 'Kembali ke layar sebelumnya',
  'action.openDocs': 'Buka dokumentasi',
  'action.exportCsv': 'Ekspor CSV',
  'action.delete': 'Hapus',
  'action.closeNotification': 'Tutup notifikasi',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref — „Aman / Sedang / Berbahaya”, a nie wspólne
     „Dalam batas / Perhatian / Kritis”. Wersja plakatowa (zone.badge.*) jest
     osobnym kluczem, a nie zapisem wielkimi literami przez CSS: tureckie „i”
     i greckie akcenty nie znoszą automatycznej zamiany. */

  'zone.good': 'Aman',
  'zone.warning': 'Sedang',
  'zone.critical': 'Berbahaya',
  'zone.none': 'Tidak ada data',

  'zone.badge.good': 'AMAN',
  'zone.badge.warning': 'SEDANG',
  'zone.badge.critical': 'BERBAHAYA',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'Kecerahan kanal B',
  'metric.raw.unitLabel': '% kecerahan kanal B',
  'metric.share.name': 'Porsi biru',
  'metric.share.longName': 'Porsi biru dalam cahaya',
  'metric.share.unitLabel': '% porsi biru',
  'stat.overallBrightness': 'Kecerahan keseluruhan pemandangan',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': 'Pratinjau kamera',
  'camera.pressStart': 'Tekan “Start”.',
  'camera.start': 'Start',
  'camera.stop': 'Stop',
  'camera.switch': 'Ganti kamera',
  'camera.error': 'Kamera tidak dapat dinyalakan. Periksa izin kamera pada peramban lalu coba lagi. ({message})',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': 'Pembacaan saat ini',
  'disclaimer.short': 'Hasil perkiraan. Ini bukan alat kesehatan.',
  'disclaimer.more': 'Selengkapnya',

  /* ---- wykresy ---- */

  'chart.aria': 'Grafik dari waktu ke waktu',
  'chart.title': 'Grafik dari waktu ke waktu ({seconds} dtk terakhir)',
  'chart.empty': 'Nyalakan kamera untuk melihat grafik',
  'chart.axis.past': '-{seconds} dtk',
  'chart.axis.now': 'sekarang',
  'chart.raw.aria': 'Grafik kecerahan kanal B dari waktu ke waktu, dengan zona aman, sedang, dan berbahaya ditandai',
  'chart.share.aria': 'Grafik porsi biru dalam cahaya dari waktu ke waktu, dengan zona aman, sedang, dan berbahaya ditandai',

  /* ---- tabela odczytów ---- */

  'table.show': 'Tampilkan sebagai tabel',
  'table.hide': 'Sembunyikan tabel',
  'table.caption': 'Pembacaan terakhir (terbaru di atas)',
  'table.col.time': 'Waktu',
  'table.col.zone': 'Zona',

  /* ---- ustawienia progów ---- */

  'settings.title': 'Pengaturan ambang zona',
  'settings.boundary.critical': 'Batas kuning / merah:',
  'settings.boundary.warning': 'Batas hijau / kuning:',

  /* ---- historia i raport (features.js) ---- */

  'history.title': 'Riwayat dan laporan',
  'history.rangeAria': 'Rentang riwayat',
  'history.unavailable': 'Data riwayat sedang tidak tersedia.',
  'history.empty': 'Tidak ada pembacaan tersimpan pada rentang ini. Mulailah mengukur — riwayat terkumpul dengan sendirinya.',
  'history.savedReadings': 'Pembacaan tersimpan: {count}. Pembagian waktu menurut zona:',
  'history.zoneLine': '{zone}: {percent}% ({readings})',

  'range.1h': '1 jam',
  'range.24h': '24 jam',
  'range.7d': '7 hari',
  'range.30d': '30 hari',

  'report.dailyTitle': 'Laporan harian',
  'report.empty': 'Laporan akan muncul begitu ada pembacaan tersimpan pada rentang yang dipilih.',
  'report.dailyCaption': 'Porsi waktu di setiap zona, hari demi hari',
  'report.col.day': 'Hari',
  'report.col.week': 'Minggu',
  'report.col.readings': 'Pembacaan',
  'report.compare.day': 'Perbandingan hari ke hari: {day} — {percent}% waktu di zona berbahaya, {change}',
  'report.compare.dayPending': 'Perbandingan hari ke hari akan muncul setelah hari kedua pengukuran.',
  'report.compare.week': 'Perbandingan minggu ke minggu: {week} — {percent}% waktu di zona berbahaya, {change}',
  'report.compare.weekPending': 'Perbandingan minggu ke minggu akan muncul setelah minggu kedua pengukuran.',
  'report.change.same': 'sama dengan {other}.',
  'report.change.more': '{points} lebih banyak daripada {other}.',
  'report.change.less': '{points} lebih sedikit daripada {other}.',
  'report.peak': 'Pembacaan di zona berbahaya paling banyak jatuh antara {from} dan {to}.',
  'report.peak.none': 'Tidak ada pembacaan di zona berbahaya yang tersimpan pada rentang ini.',
  'report.weeklyTitle': 'Laporan mingguan',
  'report.weeklyEmpty': 'Laporan mingguan akan muncul begitu ada pembacaan tersimpan pada rentang yang dipilih.',
  'report.weeklyCaption': 'Porsi waktu di setiap zona, minggu demi minggu',
  'report.weekLabel': 'Minggu {week} ({year})',
  'report.footnote': 'Angka-angka ini adalah porsi pembacaan tersimpan pada rentang yang dipilih, bukan waktu paparan yang persis.',

  /* ---- profile progów ---- */

  'profiles.title': 'Profil ambang',
  'profiles.empty': 'Anda belum menyimpan profil apa pun.',
  'profiles.itemActive': '{name} (aktif)',
  'profiles.applyAria': 'Terapkan profil {name}',
  'profiles.deleteAria': 'Hapus profil {name}',
  'profiles.applied': 'Profil “{name}” diterapkan.',
  'profiles.deleted': 'Profil “{name}” dihapus.',
  'profiles.saved': 'Profil “{name}” tersimpan.',
  'profiles.namePlaceholder': 'Nama profil (misalnya Malam)',
  'profiles.saveLabel': 'Simpan ambang saat ini sebagai profil',
  'profiles.saveBtn': 'Simpan profil',
  'profiles.needName': 'Isikan nama profil.',
  'profiles.limit': {
    other: 'Anda dapat menyimpan paling banyak {n} profil. Hapus satu untuk menambahkan yang baru.'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku też — ale musi
     zostać bezpieczna dla systemu plików: bez ukośników i dwukropków. */

  'csv.header': 'waktu;kecerahan_B_pers;porsi_biru_pers;kecerahan_pemandangan_pers;zona',
  'csv.filename': 'pemantauan-cahaya-{stamp}.csv',
  'csv.empty': 'Tidak ada pembacaan untuk diekspor. Mulailah mengukur lalu coba lagi.',
  'csv.done': 'Mengekspor {readings} ke berkas CSV.',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut. Indonezyjski ma jedną formę, ale zdanie
     i tak zostaje w całości: w innych językach przypadek minut wypada inaczej,
     a wzorzec ma pokazywać tłumaczowi całe zdanie, nie jego okrawek. */

  'alert.exposure': {
    other: 'Peringatan ambang: pembacaan sudah berada di zona berbahaya selama {n} menit. Pertimbangkan untuk beristirahat, atau kurangi porsi biru pada layar.'
  },

  'session.title': 'Ringkasan sesi terakhir',
  'session.line': 'Waktu pengukuran: {duration}. Pembacaan tersimpan: {count}.',
  'session.zoneLine': '{zone}: {percent}% dari waktu sesi.',
  'session.endedAt': 'Ringkasan ini mencakup sesi yang berakhir pukul {time}.',
  'session.toast': 'Sesi selesai: {duration}, {readings}, {percent}% waktu di zona berbahaya.',

  'duration.seconds': '{n} dtk',
  'duration.minutesSeconds': '{minutes} mnt {seconds} dtk',

  /* ---- liczebniki ----
     Indonezyjski nie odmienia rzeczownika przez liczbę: CLDR daje mu jedną
     kategorię, 'other'. Formę wybiera Intl.PluralRules('id'), nie nasza reguła
     — w innych językach kategorii jest więcej (polski cztery, arabski sześć),
     i właśnie dlatego pisze się formy, a nie regułę odmiany. */

  'count.readings': { other: '{n} pembacaan' },
  'count.points': {
    other: '{n} poin persentase'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': 'Lainnya',
  'more.section.settings': 'PENGATURAN',
  'more.section.help': 'BANTUAN',
  'more.thresholds.title': 'Ambang peringatan',
  'more.thresholds.sub': 'Setel batas zona aman, sedang, dan berbahaya.',
  'more.docs.title': 'Dokumentasi',
  'more.docs.sub': 'Cara kerja pengukuran, satuan, standar, dan zona.',
  'more.about.title': 'Tentang dan kontak',
  'more.about.sub': 'Versi, privasi, dan kontak.',
  'more.free': 'Aplikasi ini sepenuhnya bebas biaya.',
  'more.supportLink': 'Anda boleh mendukungnya secara sukarela.',
  'more.version': 'Versi {version} · Semua fitur tersedia tanpa akun dan tanpa biaya',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': 'Tentang dan kontak',
  'about.version': 'Versi {version}',
  'about.what.title': 'Apa itu aplikasi ini',
  'about.what.p1': '{app} mengukur dengan kamera ponsel seberapa banyak cahaya biru yang direkam sensor, dan menampilkannya pada dua panel penunjuk serta pada grafik dengan zona. Semua fitur — pengukuran, riwayat, laporan, profil ambang, peringatan ambang, ekspor CSV, dan Dokumentasi — tersedia untuk semua orang, tanpa akun dan tanpa biaya.',
  'about.what.p2': 'Aplikasi ini disediakan “apa adanya”, untuk penggunaan informatif. Hasil pengukuran bersifat perkiraan dan bukan dasar untuk mengambil keputusan kesehatan.',
  'about.privacy.title': 'Privasi dan data',
  'about.privacy.p1': 'Gambar dari kamera dianalisis semata-mata di perangkat Anda dan tidak pernah dikirim ke server mana pun. Kami tidak membuat akun dan tidak mengumpulkan data Anda. Pengaturan ambang, profil, dan riwayat pengukuran disimpan hanya di penyimpanan perangkat ini dan peramban ini.',
  'about.privacy.p2': 'Aplikasi tidak menampilkan iklan dan tidak berbicara dengan jaringan. Satu-satunya pengecualian adalah tombol pada layar “Dukungan”: ketika Anda menekannya, peramban membuka halaman eksternal di tab baru. Tidak ada yang terjadi sampai Anda sendiri melakukannya.',
  'about.contact.title': 'Kontak',
  'about.contact.p1': 'Komentar, kesalahan, dan usulan: [E-MAIL]. Kami membalas kapan pun bisa — proyek ini dikelola di luar jam kerja.',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': 'Dukungan',
  'support.free.title': 'Semuanya tersedia',
  'support.free.text': 'Seluruh aplikasi bebas biaya: pengukuran, riwayat dan laporan, profil ambang, peringatan, ekspor CSV, dan Dokumentasi. Semuanya bekerja seketika, tanpa akun, tanpa batasan, dan tanpa internet.',
  'support.why': '{app} dibuat di luar jam kerja. Kalau ini berguna bagi Anda, Anda bisa mentraktir saya kopi. Itu membantu menjaga aplikasi ini tetap berjalan dan mengembangkannya lebih jauh — memperbaiki pengukuran, menambah Dokumentasi, dan mengujinya di lebih banyak ponsel.',
  'support.nothing': 'Donasi tidak membuka apa pun. Tidak ada versi yang lebih baik maupun yang lebih buruk — setelah Anda memberi dukungan, aplikasi bekerja persis sama. Satu-satunya perbedaan adalah bahwa penulisnya tahu ini berguna bagi seseorang.',
  'support.button': 'Traktir saya kopi',
  'support.button.aria': 'Traktir saya kopi — membuka profil donasi di tab baru',
  'support.pending': 'Profil donasi belum tersambung. Begitu ada, sebuah tombol akan berdiri di tempat ini. Sampai saat itu tidak ada yang perlu dilakukan — aplikasi ini toh sepenuhnya bebas biaya.',
  'support.privacy': 'Tombol ini membuka halaman eksternal (Buy Me a Coffee) di tab baru peramban. Itulah satu-satunya saat ketika ada sesuatu yang meninggalkan perangkat ini. Gambar dari kamera dan semua hasil pengukuran Anda tetap di sini — tidak dikirim ke mana pun, baik sebelum Anda menekannya maupun sesudahnya.',
  'support.privacyPending': 'Begitu alamatnya tersedia, menekan tombol ini akan membuka halaman eksternal (Buy Me a Coffee) di tab baru peramban. Itu akan menjadi satu-satunya saat ketika ada sesuatu yang meninggalkan perangkat ini. Gambar dari kamera dan semua hasil pengukuran Anda tetap di sini — tidak dikirim ke mana pun.',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': 'Dokumentasi',

  'disclaimer.title': 'Ini bukan alat kesehatan',
  'disclaimer.body.docs': 'Aplikasi ini bukan alat kesehatan. Aplikasi ini tidak dimaksudkan untuk mendiagnosis, mengobati, maupun mencegah penyakit apa pun. Hasil pengukuran dengan kamera ponsel bersifat perkiraan dan tidak menggantikan pemeriksaan maupun saran dokter. Untuk urusan kesehatan mata, berkonsultasilah dengan dokter atau optometris. Ambang zona dalam aplikasi ini tidak mencerminkan standar keselamatan apa pun — rinciannya ada di bab 3.',
  'disclaimer.body.about': 'Aplikasi ini bukan alat kesehatan. Aplikasi ini tidak dimaksudkan untuk mendiagnosis, mengobati, maupun mencegah penyakit apa pun. Hasil pengukuran dengan kamera ponsel bersifat perkiraan dan tidak menggantikan pemeriksaan maupun saran dokter. Untuk urusan kesehatan mata, berkonsultasilah dengan dokter atau optometris. Ambang zona dalam aplikasi ini tidak mencerminkan standar keselamatan apa pun — rinciannya ada di Dokumentasi, bab 3.',

  'doc.toc.aria': 'Daftar isi dokumentasi',
  'doc.toc.title': 'Daftar isi',

  'doc.ch1.title': 'Mulai cepat',
  'doc.ch2.title': 'Cara kerja pengukuran',
  'doc.ch3.title': 'Satuan dan standar',
  'doc.ch4.title': 'Zona dan ambang',
  'doc.ch5.title': 'Perbedaan antarperangkat',

  'doc.ch1.heading': '1. Mulai cepat',
  'doc.ch2.heading': '2. Cara kerja pengukuran',
  'doc.ch3.heading': '3. Satuan dan standar',
  'doc.ch4.heading': '4. Zona dan ambang',
  'doc.ch5.heading': '5. Perbedaan antarperangkat',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': 'Cara mengukur dengan lebih tepat',
  'doc.ch1.tips.li1': 'Pada layar “Kamera” (tombol pertama di bilah bawah) tekan “Start” dan arahkan kamera belakang ke layar atau sumber cahaya yang ingin Anda periksa.',
  'doc.ch1.tips.li2': 'Buka layar “Pemantauan” (tombol kedua di bilah bawah) — di bagian atas Anda melihat kedua panel penunjuk sekaligus, dan di bawahnya (gulir) grafik perubahan dari waktu ke waktu. Pengukuran tetap berjalan di latar belakang, layar mana pun yang sedang Anda lihat.',
  'doc.ch1.tips.li3': 'Jaga ponsel pada jarak tetap dari layar (misalnya 15–20 cm), tanpa mengubah pencahayaan sekitar selama pengukuran.',
  'doc.ch1.tips.li4': 'Gunakan kamera belakang — koreksi otomatisnya tidak seagresif kamera depan.',
  'doc.ch1.tips.li5': 'Perlakukan hasilnya sebagai indikator relatif (%), bukan satuan fisik mutlak — bandingkan satu dengan yang lain (misalnya mode malam menyala dan mati).',
  'doc.ch1.tips.li6': 'Sesuaikan ambang zona di pengaturan dengan kecerahan layar Anda sendiri (bab 4).',

  'doc.ch1.fonts.title': 'Huruf besar dan panel penunjuk — selalu',
  'doc.ch1.fonts.p1': 'Seluruh aplikasi memakai huruf besar yang mudah dibaca dan panel penunjuk berukuran penuh, supaya orang dengan penglihatan lemah (dan semua orang lain) dapat membaca datanya tanpa pengaturan tambahan. Pada layar “Pemantauan” kedua panel penunjuk muat bersama dalam satu layar, tanpa menggulir — grafik perubahan dari waktu ke waktu ada tepat di bawahnya, satu gulir lebih jauh.',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': 'Kamera ponsel versus spektrometer',
  'doc.ch2.spectro.p1.html': 'Pengukuran yang sesungguhnya atas “berapa banyak cahaya biru berbahaya yang ada” menuntut penguraian cahaya menjadi panjang gelombang — itulah yang dilakukan <b>spektrometer</b>: prisma atau kisi difraksi memecah cahaya menjadi puluhan hingga ratusan pita sempit (misalnya setiap 1–5 nm) dan mengukur daya optik pada masing-masing pita secara terpisah. Baru dari sebaran spektral yang selengkap itu satuan seperti lux, lumen, atau iradiansi berbobot fungsi bahaya cahaya biru dapat dihitung.',
  'doc.ch2.spectro.p2.html': '<b>Kamera ponsel tidak melakukan satu pun dari itu.</b> Ia punya tiga filter lebar (Bayer: R/G/B), yang masing-masing mengumpulkan cahaya dari rentang panjang gelombang yang lebar dan saling tumpang tindih — “kanal biru” bukanlah pita sempit sekitar 435–440 nm (puncak bahaya bagi retina), melainkan kira-kira 400–570 nm yang bercampur dengan hijau. Di sepanjang jalan masih ada demosaicing, eksposur otomatis, keseimbangan putih otomatis, dan kompresi gama sRGB — tidak satu pun dari langkah itu yang diizinkan peramban untuk dimatikan sepenuhnya. Akibatnya, nilai piksel yang dilihat JavaScript tidak berhubungan secara linear dengan daya optik sebenarnya yang jatuh pada sensor. Itu keterbatasan perangkat keras yang mendasar, bukan kesalahan aplikasi ini.',

  'doc.ch2.raw.title': 'Grafik 1 — Kecerahan kanal B',
  'doc.ch2.raw.what.html': '<b>Apa yang ditampilkan:</b> kecerahan rata-rata kanal biru (B) saja dari bagian gambar yang dicuplik, pada skala 0–255 yang diubah menjadi %.',
  'doc.ch2.raw.algo.html': '<b>Algoritmenya:</b>',
  'doc.ch2.raw.step1': 'Kami mengambil satu bingkai dari kamera 5 kali per detik.',
  'doc.ch2.raw.step2': 'Kami memotong 60% bagian tengah bingkai (ini menghindari tepi gambar dan silau dari samping).',
  'doc.ch2.raw.step3': 'Kami memperkecil bagian yang dipotong itu menjadi kisi 32×32 piksel (cukup teliti, dan jauh lebih cepat daripada menghitung pada resolusi penuh — hal itu penting pada perangkat yang lebih lemah, seperti ponsel Xiaomi atau Ulefone kelas murah).',
  'doc.ch2.raw.step4': 'Kami merata-ratakan nilai B dari seluruh 1024 piksel kisi itu.',
  'doc.ch2.raw.step5.html': '<code>hasil = rata_rata_B ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>Kenapa kami mempertahankannya:</b> inilah pembacaan yang paling sederhana dan paling langsung atas “berapa banyak sinyal biru yang sama sekali ditangkap sensor”. Kelemahannya, ia mencampur kecerahan dengan warna — pemandangan yang sangat terang tetapi putih netral juga akan memberi hasil tinggi, meskipun tidak istimewa “biru”. Karena itu di sebelahnya kami menampilkan grafik 2.',

  'doc.ch2.share.title': 'Grafik 2 — Porsi biru dalam cahaya',
  'doc.ch2.share.what.html': '<b>Apa yang ditampilkan:</b> berapa persen dari seluruh cahaya yang terekam (R+G+B) yang merupakan komponen biru — yaitu pergeseran warna ke arah sejuk, terlepas dari seberapa terang pemandangannya.',
  'doc.ch2.share.algo.html': '<b>Algoritmenya:</b> langkah 1–4 yang sama seperti di atas, tetapi alih-alih B saja kami menghitung:',
  'doc.ch2.share.formula.html': '<code>hasil = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': 'Putih netral (R≈G≈B) memberi sekitar <b>33%</b>. Cahaya yang lebih hangat atau lebih merah — lebih sedikit. Cahaya yang sangat biru — lebih banyak, sampai batas ~100% untuk cahaya yang hampir murni biru.',
  'doc.ch2.share.why.html': '<b>Kenapa ini ukuran “biru berbahaya” yang lebih tepat:</b> ini asas yang sama dengan cara kerja penyaring seperti mode malam atau Night Shift — yang menentukan adalah <b>warna</b>, bukan kecerahan. Layar yang sangat terang tetapi netral tidak akan keliru ditandai sebagai berbahaya; layar yang redup tetapi sangat biru — justru iya. Karena itu besaran inilah yang mengatur warna zona pada tabel pembacaan.',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': 'Kenapa bukan lux atau lumen',
  'doc.ch3.units.p1.html': '<b>Lumen (lm)</b> menggambarkan seluruh fluks cahaya yang dipancarkan sebuah sumber — itu sifat sumbernya sendiri, bukan sifat cahaya yang jatuh pada suatu titik. <b>Lux (lx)</b> sudah merupakan iluminansi pada satu titik (lm/m²) — lebih dekat dengan yang kita maksud, tetapi tetap satuan <b>fotometrik</b>: ia membobot spektrum dengan kurva kepekaan mata manusia terhadap kecerahan (V(λ)), bukan dengan kurva bahaya cahaya biru. Untuk pengukuran bahaya yang sesungguhnya dibutuhkan satuan ketiga yang lebih sempit: iradiansi berbobot spektral dalam <b>W/m²</b> (standar IEC 62471, puncak kepekaan sekitar 435–440 nm), dan itu menuntut spektrometer — lihat bagian di atas.',
  'doc.ch3.units.p2.html': 'Bahkan seandainya kita berhenti pada lux: ponsel tanpa sensor cahaya eksternal yang terkalibrasi tidak mampu menentukannya secara tepercaya. Sensor cahaya bawaan ponsel (pada perangkat yang memilikinya) lagi pula mengukur cahaya dari <b>sisi yang berlawanan</b> dengan sisi bodi yang Anda arahkan ke layar dengan kamera belakang — jadi ia akan mengukur cahaya di belakang punggung Anda, bukan cahaya dari layar. Karena itu, alih-alih menebak angka dalam satuan yang toh tidak akan tepercaya, kami menampilkan <b>indikator relatif (%)</b> yang dinamai dengan jujur — masuk akal untuk perbandingan pada ponsel yang sama dalam kondisi yang sama (misalnya mode malam menyala dan mati), bukan sebagai nilai mutlak.',

  'doc.ch3.norms.title': 'Apakah ada standar global untuk ambang keselamatan?',
  'doc.ch3.norms.p1.html': 'Singkatnya: <b>tidak ada standar yang dinyatakan dalam persen kanal kamera</b> — itu sama sekali bukan satuan yang dipakai untuk mengatur apa pun. Standar nyata tentang cahaya biru memang ada, tetapi mengukur besaran lain, dalam satuan lain, dan menyangkut gejala yang berbeda dari yang biasanya kita maksud ketika berkata “cahaya biru melelahkan mata”.',
  'doc.ch3.norms.p2.html': '<b>Kerusakan fotokimia akut pada retina — IEC 62471 / ICNIRP.</b> Satu-satunya “bahaya cahaya biru” yang sungguh-sungguh diatur — standar untuk lampu dan sistem pencahayaan, didukung oleh pedoman ICNIRP (International Commission on Non-Ionizing Radiation Protection). Standar itu menggolongkan sumber cahaya ke dalam kelompok risiko RG0–RG3 berdasarkan radiansi yang dibobot fungsi bahaya B(λ), dalam <b>W·m⁻²·sr⁻¹</b>, dengan batas waktu paparan (<code>t_max = 100 / L_B</code> detik). Layar ponsel dan monitor — bahkan pada kecerahan maksimum — dalam praktiknya hampir selalu masuk <b>RG0 (dikecualikan, tanpa pembatasan)</b>. Standar itu menyangkut sumber yang jauh lebih kuat (busur las, sebagian proyektor, LED industri), bukan layar konsumen.',
  'doc.ch3.norms.p3.html': '<b>Dampak pada ritme sirkadian dan tidur — CIE S 026.</b> Inilah gejala yang biasanya dimaksud (layar pada malam hari “membuat terjaga”) — tetapi ini bukan kerusakan mata, melainkan pengaruh pada jam biologis tubuh melalui sel ganglion retina (ipRGC), yang paling peka sekitar 480 nm. Standar CIE S 026:2018 mendefinisikan satuan <b>lux melanopik (melanopic EDI)</b>. Yang paling mendekati konsensus ilmiah “resmi” adalah publikasi Brown dan rekan-rekannya (<i>PLOS Biology</i>, 2022), yang merekomendasikan sebagai patokan kasar: pada malam hari &lt; 10 lux melanopik, pada siang hari &gt; 250. Itu rekomendasi para peneliti tidur, bukan ketentuan hukum.',
  'doc.ch3.norms.p4.html': '<b>WHO.</b> Organisasi Kesehatan Dunia tidak menerbitkan batas paparan cahaya biru yang mandiri dan miliknya sendiri — untuk keselamatan radiasi optik ia merujuk pada ICNIRP (di atas). Satu-satunya dokumen WHO yang konkret dan ditulisnya sendiri tentang layar adalah <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i> (2019) — tetapi dokumen itu menyangkut <b>lamanya waktu</b> di depan layar, bukan warna atau intensitas cahayanya: tidak ada layar di bawah usia 1 tahun, paling lama 1 jam untuk usia 2–4 tahun. Untuk orang dewasa WHO tidak punya pedoman angka yang sama rincinya.',
  'doc.ch3.norms.p5.html': '<b>Kenapa semua itu toh tidak membantu mengkalibrasi aplikasi:</b> kedua kelompok standar (IEC/ICNIRP dan CIE) menuntut sebaran spektral yang lengkap dan radiansi terkalibrasi dalam geometri pengukuran yang diketahui — persis apa yang tidak dapat disediakan ponsel lewat peramban (lihat bagian “Kamera ponsel versus spektrometer” di atas). Tidak ada konversi “33% porsi biru = X lux melanopik”, sehingga ambang dalam aplikasi ini <b>tidak mencerminkan standar keselamatan apa pun</b> (WHO, IEC, ICNIRP, maupun CIE — untuk indikator ini standar semacam itu memang tidak ada). Sebaliknya, nilai bawaan ambang porsi biru diturunkan dari suhu warna cahaya yang nyata dan dari rekomendasi praktis yang luas diulang tentang cahaya hangat pada malam hari — dasar yang lebih kokoh daripada sekadar pembulatan, tetapi tetap bukan standar formal (penurunannya selengkapnya: bab 4). Anda selalu bisa mengubahnya menjadi milik Anda sendiri di pengaturan.',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': 'Zona warna dan dari mana ambangnya berasal',
  'doc.ch4.zones.p1.html': 'Kedua besaran punya ambangnya sendiri yang disetel secara terpisah (layar “Pemantauan” → “Pengaturan ambang zona”, di bagian bawah halaman) — 33%/66% pada yang satu tidak berarti sama dengan pada yang lain (lihat bab 2 di atas). <b>Porsi biru</b>-lah yang menentukan warna pada legenda di bawah grafik dan pada tabel pembacaan:',
  'doc.ch4.zones.li1.html': '<b>Hijau — aman:</b> cahaya hangat atau netral, mata beristirahat.',
  'doc.ch4.zones.li2.html': '<b>Kuning — sedang:</b> pergeseran ke arah biru yang sudah terasa, ada baiknya beristirahat sejenak.',
  'doc.ch4.zones.li3.html': '<b>Merah — berbahaya:</b> cahaya yang sangat biru, jelas melelahkan mata pada paparan yang lebih lama (terutama pada malam hari).',
  'doc.ch4.zones.p2.html': '<b>Dari mana angka-angka ini berasal.</b> <b>Kecerahan kanal B</b> tidak punya titik acuan alami — nilai ambang yang masuk akal sepenuhnya bergantung pada seberapa terang pemandangan yang Anda rekam (ini ukuran kecerahan, bukan warna). Nilai bawaan 33%/66% di sini masih titik awal yang bersifat kesepakatan — sesuaikan lewat percobaan dengan kecerahan khas layar dan lingkungan Anda sendiri.',
  'doc.ch4.zones.p3.html': '<b>Porsi biru</b> punya ambang bawaan yang diturunkan dari suhu warna cahaya yang nyata (fisika, bukan pembulatan), bukan dari standar keselamatan apa pun — standar semacam itu untuk besaran ini tidak ada (bab 3). Titik acuannya:',
  'doc.ch4.zones.li4.html': '<b>~4000K</b> (“putih hangat”, bohlam LED yang khas) → sekitar <b>26%</b> porsi biru. Cahaya yang lebih hangat dari itu (suhu warna yang lebih rendah) adalah rentang yang luas direkomendasikan untuk malam hari oleh perkakas seperti f.lux atau Night Shift — dari situlah ambang bawahnya.',
  'doc.ch4.zones.li5.html': '<b>6500K (D65)</b>, titik putih baku sebagian besar layar ponsel dan monitor dari pabrik — sekitar <b>33%</b>. Dari nilai itu ke atas dimulai rentang yang biasanya dikenai anjuran membatasi cahaya biru — dari situlah ambang atasnya.',
  'doc.ch4.zones.p4.html': '<b>Catatan penting:</b> seberapa “biru” sebuah cahaya tidak bergantung pada waktu dalam sehari, tetapi anjuran membatasi cahaya biru sebenarnya hanya menyangkut <b>malam hari</b> — pada siang hari paparan cahaya yang sejuk dan biru (termasuk sinar matahari) adalah hal yang normal, bahkan bermanfaat bagi ritme sirkadian. Zona merah di tengah hari sambil menatap layar biasa yang tidak diubah tidak berarti ada bahaya nyata — cahaya yang sama pada malam hari barulah patut dibatasi.',
  'doc.ch4.zones.p5.html': 'Ambang kedua besaran sepenuhnya saling bebas — mengubah yang satu tidak memengaruhi yang lain. Ambang yang diubah <b>diingat di perangkat ini dan di peramban ini</b> di antara pembukaan aplikasi berikutnya (secara lokal, tidak ada yang dikirim ke mana pun) — tombol “Start” tidak mengembalikannya ke nilai bawaan.',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': 'Kenapa pratinjau terlihat berbeda pada perangkat yang berbeda',
  'doc.ch5.devices.p1.html': '<b>Peramban versus aplikasi kamera bawaan.</b> Ketika Anda membuka aplikasi kamera yang terpasang dari pabrik pada ponsel, pabrikannya (misalnya Xiaomi) menambahkan algoritme miliknya sendiri yang tertutup ke pratinjau langsung — HDR waktu nyata, penguatan kecerahan secara digital pada cahaya lemah, penghalusan. Sebuah halaman web menerima aliran gambar yang jauh lebih “mentah” dari kamera lewat peramban (fungsi <code>getUserMedia</code>), tanpa satu pun perbaikan itu — jadi pada dasarnya ia akan terlihat lebih datar dan lebih gelap daripada kamera bawaan, apa pun ponselnya.',
  'doc.ch5.devices.p2.html': '<b>Kemampuan mengendalikan kamera yang berbeda-beda.</b> Seberapa banyak kendali atas eksposur dan keseimbangan putih yang sama sekali diberikan sistem kepada peramban bergantung pada ponselnya, pada penggerak kameranya, dan pada versi Chrome/WebView — sebagian perangkat (biasanya komputer dengan kamera USB) hanya melaporkan otomatisasi penuh, sebagian lain (sebagian ponsel Android) melaporkan mode tambahan yang lebih maju. Versi aplikasi ini yang lebih awal mencoba beralih ke mode eksposur manual di tempat yang ponselnya mengizinkan, tanpa menyetel nilai tertentu — yang pada sebagian ponsel membekukan gambar pada eksposur gelap yang acak dari saat kamera dinyalakan. Itu kesalahan dalam kode (sudah diperbaiki), bukan perbedaan satuan — tetapi ia menunjukkan dengan baik betapa mudahnya perilaku berbeda antarperangkat, kalau bahkan baris kode yang sama hanya menyala pada sebagian di antaranya.',
  'doc.ch5.devices.p3.html': '<b>Sensor dan pengolahan gambar (ISP) yang berbeda.</b> Bahkan dengan kode yang identik dan pemandangan yang sama, model ponsel yang berbeda punya sensor dengan mutu yang berbeda dan otomatisasi pabrikan yang disetel berbeda — yang satu akan memilih eksposur pada cahaya lemah lebih cepat dan lebih tepat daripada yang lain. Hal itu, digabung dengan kenyataan bahwa indikator dalam aplikasi ini bersifat <b>relatif</b> (lihat bab 3), berarti: bandingkan hasil (dan tampilan pratinjau) pada ponsel yang sama dari waktu ke waktu, bukan antarmodel atau antarperangkat.'
});
