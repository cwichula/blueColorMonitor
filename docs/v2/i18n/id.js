/* docs/v2/i18n/id.js — słownik WERSJI 2, indonezyjski (Bahasa Indonesia).
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/id.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej. Zestaw kluczy jest identyczny
 * z pl.js — pilnuje tego docs/shared/i18n/keys.test.js.
 *
 * TREŚĆ wzięta z pl.js, TERMINOLOGIA — z docs/shared/i18n/id.js, bo to ona
 * jedzie w tej samej aplikacji i ta sama wielkość nie może nazywać się na
 * kafelku inaczej niż w opisie. Siedem nazw trzymanych bez wyjątku: porsi
 * biru, kecerahan pemandangan, suhu warna, dampak sirkadian, kedipan,
 * kemerataan, kenyamanan mata. Strefy: dalam batas / peringatan / kritis.
 *
 * REJESTR: forma grzecznościowa „Anda”, konsekwentnie i oszczędnie —
 * indonezyjski opuszcza zaimek tam, gdzie polski go stawia. Nazwy elementów
 * przeglądarki za jej lokalizacjami: „peramban”, „tab”, „muat ulang”. Ton jak
 * w oryginale: rzeczowy, bez marketingu i bez straszenia.
 *
 * ZASTRZEŻENIA MEDYCZNE i akapity o prywatności przełożone co do treści, bez
 * osłabiania i bez dodawania obietnic — to zdania o skutkach prawnych.
 *
 * LICZEBNIKI: indonezyjski nie odmienia rzeczownika przez liczbę — CLDR daje
 * mu jedną kategorię, 'other', i tylko ona ma tu prawo wystąpić.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (te same co w pl.js i z tego samego powodu):
 *   'zone.warning'        — wspólne mówi „Perhatian”, ta wersja od zawsze mówi
 *                           „Peringatan” i tym samym słowem podsumowuje;
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules. Patrz nagłówek docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['id'] = Object.assign(window.I18nData['id'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Monitor Cahaya — mengukur cahaya biru',
  'app.description': 'Monitor Cahaya — mengukur porsi cahaya biru dengan kamera ponsel. Tujuh indikator, grafik, riwayat. Semuanya tersedia, tanpa akun dan tanpa biaya.',
  'app.skipToContent': 'Lompat ke konten',
  'app.measuring': 'Mengukur',
  'app.docsButton': 'Dokumentasi dan penjelasan',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — versi 2',

  'nav.aria': 'Navigasi utama',
  'nav.tablistAria': 'Layar aplikasi',
  'nav.measure': 'Ukur',
  'nav.history': 'Riwayat',
  'nav.tools': 'Alat',
  'nav.support': 'Dukungan',
  'nav.more': 'Lainnya',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Dokumentasi',
  'panel.thresholds': 'Ambang dan profil',
  'panel.reports': 'Laporan',
  'panel.export': 'Ekspor data',
  'panel.compare': 'Pembanding A/B',
  'panel.calibration': 'Kalibrasi kertas putih',
  'panel.screenCheck': 'Periksa monitor saya',
  'panel.schedule': 'Jadwal',
  'panel.alerts': 'Alarm paparan',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Kembali',
  'action.close': 'Tutup',
  'action.refresh': 'Segarkan',
  'action.apply': 'Terapkan',
  'action.delete': 'Hapus',
  'action.hide': 'Sembunyikan',
  /* „Start” i „Stop” zostają w brzmieniu angielskim: warstwa wspólna
     (engine.idle, engine.error.*) odsyła do przycisku po nazwie i musi
     wskazywać dokładnie ten napis, który stoi na ekranie. */
  'action.start': 'Start',
  'action.stop': 'Stop',
  'action.switch': 'Ganti',
  'action.switchAria': 'Ganti kamera: depan atau belakang',
  'action.resetDefaults': 'Pulihkan bawaan',
  'action.reports': 'Laporan',
  'action.exportCsv': 'Ekspor CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Layar: {name}',
  'a11y.measureStarted': 'Pengukuran dimulai.',
  'a11y.measureStopped': 'Pengukuran dihentikan.',
  'a11y.measureStoppedSummary': 'Pengukuran dihentikan. Durasi: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'Profil ambang diterapkan.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Konfirmasi',
  'dialog.confirm': 'Ya, lanjutkan',
  'dialog.cancel': 'Batal',
  'dialog.infoTitle': 'Informasi',
  'dialog.ok': 'Mengerti',

  'help.sheetTitle': 'Deskripsi besaran',
  'help.unit': 'Satuan',
  'help.scaleRange': 'Rentang skala',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które po polsku brzmią podobnie i dlatego mają osobne
     klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą przepuszczoną
     przez toLowerCase() — po niemiecku rzeczownik w środku zdania zostaje
     wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'Peringatan',
  'threshold.crit': 'Kritis',
  'threshold.warnLabel': 'Ambang peringatan',
  'threshold.critLabel': 'Ambang kritis',
  'threshold.warnAria': '{name} — ambang: peringatan',
  'threshold.critAria': '{name} — ambang: kritis',

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

  'firstRun.title': 'Cara mengukur',
  'firstRun.text': 'Tekan “Start”, arahkan ponsel ke permukaan yang terkena cahaya dan tahan tetap diam selama beberapa detik. Bingkai pada pratinjau menandai bagian yang benar-benar dibaca aplikasi.',
  'firstRun.close': 'Tutup petunjuk',

  'camera.live': 'LANGSUNG',
  'camera.idle': 'Kamera sedang mati. Tekan “Start”, arahkan ponsel ke permukaan yang terkena cahaya dan tahan tetap diam selama beberapa detik.',
  'camera.stopped': 'Pengukuran dihentikan. Tekan “Start” untuk mengukur lagi.',

  'error.cameraStart': 'Kamera tidak berhasil dinyalakan.',
  'error.engineMissing': 'Modul pengukuran tidak termuat.',

  'metrics.sevenTitle': 'Tujuh indikator',
  'measure.tilesSub': 'Diperbarui 5 kali per detik',

  'session.title': 'Sesi ini',
  'session.duration': 'Durasi pengukuran',
  'session.samples': 'Jumlah sampel',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     Indonezyjski nie odmienia rzeczownika przez liczbę, więc słowo brzmi tu
     tak samo jak pod suwakiem i to jest poprawne. */
  'zone.count.good': 'Dalam batas',
  'zone.count.warning': 'Peringatan',
  'zone.count.critical': 'Kritis',

  'note.calibrated': 'Pengukuran terkalibrasi dengan kertas putih — kanal sudah disetarakan.',

  'tile.helpAria': 'Apa artinya: {name}',
  'tile.noMeasurement': 'Tidak ada pengukuran',
  'tile.outOfScale': 'Di luar skala',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Peringatan',
  'zone.spoken.warning': 'peringatan',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Perubahan dari waktu ke waktu',
  'history.pickHint': 'Pilih besaran dan rentang',
  'history.metricLabel': 'Besaran',
  'history.rangeAria': 'Rentang waktu grafik',
  'history.emptyTitle': 'Tidak ada data pada rentang ini',
  'history.emptyText': 'Jalankan pengukuran di layar Ukur — grafik akan terisi dalam beberapa detik.',
  'history.tableTitle': 'Pembacaan terakhir',
  'history.tableHide': 'Sembunyikan tabel',
  'history.tableShow': 'Tampilkan tabel',
  'history.tableCaption': 'Pembacaan pengukuran terakhir, yang terbaru di atas.',
  'history.tableEmpty': 'Tidak ada pembacaan. Jalankan pengukuran di layar Ukur.',

  'table.time': 'Jam',
  'table.metric': 'Besaran',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     „1 godz.” łamało się na dwie linie. */
  'range.1m': '1 mnt',
  'range.1h': '1 jam',
  'range.24h': '24 jam',
  'range.7d': '7 hari',
  'range.30d': '30 hari',

  'chart.now': 'sekarang',
  'chart.countSub': {
    other: '{n} pembacaan pada rentang terpilih'
  },
  'chart.aria': '{name}, rentang {range}, {count}, nilai terakhir {value} {unit}.',
  'chart.ariaZone': '{name}, rentang {range}, {count}, nilai terakhir {value} {unit}, zona: {zone}.',
  'chart.ariaEmpty': '{name} — tidak ada data pada rentang {range}.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Panduan langkah demi langkah dan fungsi pendukung',
  'tools.note': 'Alat membantu menafsirkan hasil pengukuran. Semuanya tersedia sejak awal, dan pengukurannya sendiri bekerja tanpa bergantung padanya.',

  'tool.thresholds.sub': 'Kapan sebuah nilai harus memicu peringatan',
  'tool.compare.sub': 'Cahaya mana dari keduanya yang lebih lembut',
  'tool.calibration.sub': 'Satu-satunya fungsi yang benar-benar menaikkan ketelitian',
  'tool.screenCheck.sub': 'Lima langkah dan satu kesimpulan tentang layar',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Harmonogram progów”
     kontra „Harmonogram”. Tak było i tak zostaje. */
  'tool.schedule.title': 'Jadwal ambang',
  'tool.schedule.sub': 'Ambang lain pada malam hari, tanpa perlu diingat',
  'tool.alerts.sub': 'Sinyal saat zona kritis bertahan terlalu lama',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Pengaturan',
  'more.thresholdsSub': 'Kapan sebuah nilai harus memicu peringatan',
  'more.docsSub': 'Cara mengukur dan apa yang tidak dikatakan pengukuran ini',
  'more.appearanceTitle': 'Tampilan dan aksesibilitas',

  'settings.theme': 'Tema',
  'theme.auto': 'Ikuti sistem',
  'theme.light': 'Terang',
  'theme.dark': 'Gelap',

  'settings.textScale': 'Ukuran teks',
  'textScale.100': 'Standar',
  'textScale.115': 'Lebih besar (115%)',
  'textScale.130': 'Terbesar (130%)',

  'settings.contrast': 'Kontras lebih tinggi',
  'settings.contrastSub': 'Garis tepi lebih tegas dan teks pendukung lebih gelap.',
  'settings.sound': 'Suara alarm',
  'settings.soundSub': 'Sinyal singkat saat alarm paparan menyala.',
  'settings.vibrate': 'Getaran saat alarm',
  'settings.vibrateSub': 'Hanya bekerja pada perangkat yang mendukungnya.',

  'more.dataTitle': 'Data',
  'more.clearHistory': 'Hapus riwayat pengukuran',
  'more.clearHistorySub': 'Menghapus pembacaan tersimpan dari perangkat ini. Ambang, profil, dan pengaturan tetap ada.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'Aplikasi ini bebas biaya sepenuhnya. ',
  'more.supportLink': 'Anda boleh mendukungnya secara sukarela.',

  'dialog.clearHistory.title': 'Hapus riwayat tersimpan?',
  'dialog.clearHistory.body': {
    other: 'Kami akan menghapus {n} titik pengukuran tersimpan dari perangkat ini. Tindakan ini tidak bisa dibatalkan. Ambang, profil, dan pengaturan tetap tidak tersentuh.'
  },
  'dialog.clearHistory.confirm': 'Hapus riwayat',
  'dialog.clearHistory.cancel': 'Biarkan',

  'toast.historyCleared': 'Riwayat pengukuran dihapus.',
  'toast.screenUnavailable': 'Layar ini belum tersedia di versi ini.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'Apa yang diukur aplikasi ini',
  'docs.leadText': 'Kamera ponsel melihat permukaan yang terkena cahaya, dan lima kali per detik aplikasi menghitung rata-rata kanal R, G, dan B dari bagian tengah bingkai. Dari ketiga angka itu diturunkan tujuh indikator.',
  'docs.limitsTitle': 'Batas metode',
  'docs.limitsText': 'Kamera punya tiga kanal warna yang lebar, eksposur otomatis, dan keseimbangan putih otomatis. Ia tidak mengukur spektrum dan tidak mengenal nilai mutlak, jadi kecerahan adalah indikator relatif, bukan lux. Suhu warna dan dampak sirkadian adalah perkiraan yang dihitung dari warna primer sRGB. Pencuplikan {rate} Hz hanya melihat kedipan di bawah {limit} Hz — kedipan jaringan listrik 100 Hz berada di luar jangkauan dan aplikasi tidak akan pernah melaporkannya sebagai hasil.',

  'note.howTo.repeat.title': 'Ulangi pengukuran',
  'note.howTo.repeat.text': 'Satu pembacaan hanyalah potret sesaat. Pengukuran selama belasan detik memberi gambaran yang lebih dapat dipercaya.',

  'docs.scale': 'Skala',
  'docs.direction': 'Arah',
  'docs.directionHigher': 'Makin tinggi makin baik',
  'docs.directionLower': 'Makin rendah makin lembut',
  'docs.privacyTitle': 'Data dan privasi',
  'docs.privacyText': 'Gambar dari kamera tidak dikirim maupun disimpan ke mana pun — dari setiap bingkai hanya tersisa tiga angka. Hasil pengukuran, ambang, dan pengaturan berada di penyimpanan peramban pada perangkat ini. Aplikasi tidak melakukan permintaan jaringan apa pun dan bekerja dalam mode luring.',
  'docs.freeLine': 'Ketujuh indikator, riwayat, grafik, alat, dan mode luring bekerja untuk semua orang, tanpa akun dan tanpa biaya.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Semuanya tersedia',
  'support.heroText': 'Ketujuh indikator, riwayat pengukuran, grafik, semua alat, dan mode luring bekerja untuk semua orang, seketika. Tanpa akun, tanpa batasan, dan tanpa biaya.',
  'support.whyTitle': 'Kenapa saya meminta ini',
  'support.whyText': '{app} dibuat di luar jam kerja dan tidak menghasilkan uang dari siapa pun: tidak ada iklan, tidak ada pengumpulan data, dan tidak ada yang bisa dijual. Perawatan dan pengembangan lanjutan — indikator baru, perbaikan, pengujian pada ponsel-ponsel berikutnya — memakan waktu. Kalau aplikasi ini berguna bagi Anda, Anda boleh ikut menyumbang. Anda tidak harus.',
  'support.whatTitle': 'Apa yang diberikan donasi',
  'support.whatText': 'Tidak ada. Sungguh tidak membuka apa pun dan tidak mempercepat apa pun — aplikasi terlihat dan bekerja persis sama sebelum dan sesudahnya. Yang diberikannya hanya ini: penulisnya tahu bahwa pekerjaan ini berguna bagi seseorang.',
  'support.button': 'Traktir saya kopi',
  'support.pendingTitle': 'Profil belum tersambung',
  'support.pendingText': 'Di sini belum ada alamat untuk mengirim dukungan. Alamat itu akan muncul di tempat ini begitu siap — sampai saat itu semua yang ada di aplikasi bekerja persis sama.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'Tombol ini membuka halaman eksternal Buy Me a Coffee di tab baru. Itulah satu-satunya saat ketika ada sesuatu yang meninggalkan perangkat ini — dan itu terjadi hanya setelah Anda menekannya. Hasil pengukuran, riwayat, dan pengaturan tetap di sini.',
  'privacy.externalPending': 'Begitu alamatnya tersedia, menekan tombol itu akan membuka halaman eksternal di tab baru. Itu akan menjadi satu-satunya saat ketika ada sesuatu yang meninggalkan perangkat ini. Hasil pengukuran, riwayat, dan pengaturan tetap di sini.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (cadangan di ui-core.js)',
  'boot.need.metrics': 'tidak ada nilai yang akan dihitung',
  'boot.need.bus': 'modul-modul berhenti saling melihat',
  'boot.need.ui': 'layar tidak bisa diganti',
  'boot.need.engine': 'kamera dan pengukuran tidak akan berjalan',
  'boot.need.support': 'layar Dukungan akan kosong',
  'boot.need.tools': 'tab Alat akan kosong',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'Modul berikut tidak termuat: {list}.',
  'boot.consoleHint': 'Periksa urutan dan jalur <script> di index.html.',
  'boot.incompleteTitle': 'Aplikasi termuat tidak lengkap',
  'boot.incompleteText': '{missing} Muat ulang halaman; jika itu tidak menolong, berkasnya tidak lengkap di server.',
  'boot.newVersion': 'Ada versi baru aplikasi ini.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'Apa yang dilakukan ambang. ',
  'thresholds.noteText': 'Ambang peringatan menyalakan status kuning, ambang kritis menyalakan yang merah. Perubahan berlaku seketika — juga pada pembacaan yang sudah ada di layar. Set ambang Anda sendiri bisa disimpan dengan sebuah nama dan dibuka lagi kapan pun Anda mau.',
  'thresholds.profilesTitle': 'Profil ambang',
  'thresholds.profilesSub': 'Tiga profil bawaan dan milik Anda sendiri',
  'thresholds.customName': 'Nama profil Anda sendiri',
  'thresholds.customPlaceholder': 'misalnya Kamar tidur pada malam hari',
  'thresholds.save': 'Simpan ambang saat ini',
  'thresholds.saveHelp': 'Menyimpan persis ambang yang disetel di atas.',

  'profile.builtin.default.name': 'Bawaan',
  'profile.builtin.default.desc': 'Ambang dari katalog besaran — titik awal untuk semua pengukuran.',
  'profile.builtin.evening.name': 'Malam — lembut',
  'profile.builtin.evening.desc': 'Memperingatkan lebih awal tentang warna yang sejuk dan dampak sirkadian.',
  'profile.builtin.work.name': 'Kerja di meja',
  'profile.builtin.work.desc': 'Membolehkan cahaya siang yang terang dan sejuk; menjaga kedipan dan kemerataan.',
  'profile.custom.desc': 'Profil sendiri yang disimpan {date}.',

  'toast.thresholdsReset': 'Ambang bawaan dipulihkan.',
  'toast.thresholdOrder': 'Ambang peringatan harus lebih rendah daripada ambang kritis.',
  'toast.thresholdOrderInverted': 'Untuk besaran ini ambang peringatan harus lebih tinggi daripada ambang kritis.',
  'toast.profileNameMissing': 'Isikan nama profil.',
  'toast.profileSaved': 'Profil “{name}” tersimpan.',
  'toast.profileApplied': 'Profil “{name}” diterapkan.',
  'toast.profileApplyFailed': 'Profil itu tidak berhasil diterapkan.',
  'toast.profileRemoved': 'Profil dihapus.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'Untuk apa jadwal ini. ',
  'schedule.noteText': 'Pada malam hari yang masuk akal adalah ambang yang lain daripada pada tengah hari. Aturan “dari–sampai” mengganti profil dengan sendirinya, supaya tidak perlu diingat. Jadwal tidak pernah memulai maupun menghentikan pengukuran.',
  'schedule.toggle': 'Nyalakan penggantian otomatis',
  'schedule.toggleSub': 'Diperiksa setiap menit pada jam perangkat.',
  'schedule.emptyTitle': 'Belum ada aturan',
  'schedule.emptyText': 'Tambahkan aturan pertama dengan tombol di bawah.',
  'schedule.add': 'Tambah aturan',
  'schedule.to': 'sampai',
  'schedule.profile': 'Profil',
  'schedule.fromAria': 'Aturan {n}: jam mulai',
  'schedule.toAria': 'Aturan {n}: jam berakhir',
  'toast.scheduleTimeFormat': 'Isikan jam dalam format 22:00.',
  'toast.scheduleEnded': 'Jadwal berakhir — ambang sebelumnya kembali berlaku.',
  'toast.scheduleApplied': 'Jadwal menyalakan profil “{name}”.',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'Apa yang dilakukan alarm. ',
  'alerts.noteText': 'Ia menjaga satu besaran dan baru bersuara ketika besaran itu bertahan di zona pilihan Anda tanpa putus selama waktu yang disetel. Ia tidak pernah menghentikan pengukuran dan tidak menutupi tombol.',
  'alerts.toggle': 'Nyalakan alarm paparan',
  'alerts.toggleSub': 'Hanya bekerja selama pengukuran berjalan.',
  'alerts.metric': 'Besaran yang dijaga',
  'alerts.level': 'Mulai dari zona mana',
  'alerts.level.warning': 'Peringatan dan di atasnya',
  'alerts.level.critical': 'Kritis saja',
  'alerts.sustain': 'Setelah berapa detik tanpa putus',
  'alerts.sustainHelp': 'Waktu yang lebih pendek memberi lebih banyak alarm palsu saat Anda menggerakkan ponsel.',
  'alerts.sound': 'Bunyi singkat',
  'alerts.soundSub': 'Suara dibangkitkan di perangkat ini. Ia juga bisa dimatikan untuk seluruh aplikasi di layar Lainnya.',
  'alerts.barTitle': 'Alarm paparan',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} bertahan di zona peringatan selama {seconds} s — sekarang {value} {unit}.',
  'alerts.message.critical': '{name} bertahan di zona kritis selama {seconds} s — sekarang {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'Cara membandingkan. ',
  'compare.noteText': 'Jalankan pengukuran, arahkan kamera ke sumber pertama dan simpan sebagai A. Tanpa mengubah jarak maupun sudut, gantilah cahayanya dan simpan sebagai B. Perbandingan ini baru berarti kalau pemandangannya sama.',
  'compare.slotA': 'Cahaya A',
  'compare.slotB': 'Cahaya B',
  'compare.save': 'Simpan pembacaan saat ini',
  'compare.savedAt': 'Disimpan {date}, {time}',
  'compare.empty': 'Belum ada yang disimpan.',
  'compare.verdictTitle': 'Hasil perbandingan',
  'compare.verdictEmpty': 'Simpan kedua cahaya untuk melihat mana yang lebih lembut.',
  'compare.notEnough': 'Data belum cukup untuk membandingkan kedua pengukuran ini.',
  'compare.tie': 'Kedua sumber keluar praktis sama ({metric}: {a} dan {b} {unit}). Selisihnya masih di dalam derau pengukuran.',
  'compare.betterA': 'Yang lebih lembut adalah cahaya A — {metric} sebesar {better} {unit} berbanding {worse} {unit}.',
  'compare.betterB': 'Yang lebih lembut adalah cahaya B — {metric} sebesar {better} {unit} berbanding {worse} {unit}.',
  'compare.clear': 'Hapus perbandingan',
  'toast.compareSavedA': 'Cahaya A tersimpan.',
  'toast.compareSavedB': 'Cahaya B tersimpan.',
  'toast.compareCleared': 'Perbandingan dihapus.',
  'toast.measureFirst': 'Jalankan dulu pengukuran di layar Ukur.',

  /* Nazwa wielkości w środku zdania. Po polsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. */
  'metric.share.nameLower': 'porsi biru',
  'metric.brightness.nameLower': 'kecerahan pemandangan',
  'metric.kelvin.nameLower': 'suhu warna',
  'metric.melanopic.nameLower': 'dampak sirkadian',
  'metric.flicker.nameLower': 'kedipan',
  'metric.uniformity.nameLower': 'kemerataan',
  'metric.comfort.nameLower': 'kenyamanan mata',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'Kenapa ini bekerja. ',
  'calib.noteText': 'Sensor kamera punya simpangan tetap antarkanal. Mengukur selembar kertas putih menunjukkan seberapa besar simpangan itu dan memungkinkannya dikurangkan. Inilah satu-satunya fungsi di aplikasi ini yang benar-benar menaikkan ketelitian — dan ia tetap tidak mengubah kamera menjadi spektrometer.',
  'calib.step1': 'Letakkan selembar kertas putih di bawah cahaya yang diukur',
  'calib.step2': 'Jalankan pengukuran dan penuhi bingkai dengan kertas itu',
  'calib.step3': 'Tekan “Kalibrasi” dan jangan gerakkan ponsel selama 3 detik',
  'calib.done': 'Terkalibrasi {date}, {time}.',
  'calib.none': 'Belum ada kalibrasi. Pengukuran tetap bekerja; perlakukan nilainya sebagai pembanding.',
  'calib.gain': 'Penguatan {channel}',
  'calib.gainsLabel': 'Penguatan kanal',
  'calib.gainsUnset': 'belum disetel',
  'calib.start': 'Kalibrasi (3 dtk)',
  'calib.clear': 'Hapus kalibrasi',
  'toast.calibCleared': 'Kalibrasi dihapus.',
  'calib.error.noEngine': 'Modul pengukuran tidak tersedia.',
  'calib.error.notRunning': 'Jalankan dulu pengukuran dan arahkan kamera ke selembar kertas putih.',
  'calib.error.busy': 'Kalibrasi sedang berjalan.',
  'calib.error.tooFewSamples': 'Sampelnya terlalu sedikit. Periksa apakah pengukuran benar-benar berjalan.',
  'calib.error.tooDark': 'Gambarnya terlalu gelap untuk dikalibrasi. Terangi kertasnya lalu coba lagi.',
  'calib.error.tooSkewed': 'Simpangan antarkanal terlalu besar untuk diterima sebagai kalibrasi. Gunakan kertas putih dalam cahaya yang merata.',
  'calib.ok': 'Terkalibrasi. Suhu warna dan dampak melanopik akan lebih tepat mulai sekarang.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'Untuk apa ini. ',
  'screencheck.noteText': 'Lima langkah memeriksa monitor seperti orang memeriksanya dalam sebuah ulasan: putih pada dua tingkat kecerahan, kemerataan lampu latar, dan apakah mode malam bawaan sistem benar-benar mengubah sesuatu. Panduan ini membaca pengukuran yang sedang berjalan; ia tidak menjalankannya sendiri.',
  'screencheck.step.white100.title': 'Putih pada kecerahan penuh',
  'screencheck.step.white100.hint': 'Buka halaman putih di monitor, setel kecerahan ke maksimum dan penuhi bingkai dengan layar itu.',
  'screencheck.step.white20.title': 'Putih pada kecerahan rendah',
  'screencheck.step.white20.hint': 'Turunkan kecerahan monitor sampai sekitar seperlima dan jangan ubah bidikannya.',
  'screencheck.step.corners.title': 'Sudut-sudut layar',
  'screencheck.step.corners.hint': 'Kembalilah ke kecerahan penuh dan tunjukkan seluruh layar ke kamera — kami memeriksa kemerataan lampu latar.',
  'screencheck.step.nightOff.title': 'Mode malam mati',
  'screencheck.step.nightOff.hint': 'Pastikan penyaring cahaya biru dalam keadaan mati.',
  'screencheck.step.nightOn.title': 'Mode malam menyala',
  'screencheck.step.nightOn.hint': 'Nyalakan penyaring cahaya biru di sistem dan ulangi bidikan yang sama.',
  'screencheck.stepHeading': 'Langkah {n} dari {total}: {title}',
  'screencheck.idleTitle': 'Panduan belum berjalan',
  'screencheck.idleHint': 'Jalankan pengukuran di layar Ukur, lalu kembali ke sini dan tekan “Mulai”.',
  'screencheck.next': 'Simpan langkah ini dan lanjutkan',
  'screencheck.cancel': 'Batalkan',
  'screencheck.start': 'Mulai panduan',
  'screencheck.clearResult': 'Hapus hasil',
  'screencheck.resultTitle': 'Hasil',
  'screencheck.resultEmpty': 'Belum ada langkah yang tersimpan.',
  'screencheck.resultPartial': 'Tersimpan {done} dari {total} langkah. Kesimpulan akan muncul begitu ada yang bisa dibandingkan.',
  'screencheck.note.uniformityLow': 'Kemerataan lampu latar sebesar {value}% — terlihat jelas ada perbedaan kecerahan di dalam bingkai.',
  'screencheck.note.uniformityOk': 'Lampu latarnya merata ({value}%).',
  'screencheck.note.nightWorks': 'Mode malam menurunkan porsi biru sebesar {value} poin persentase — ia bekerja.',
  'screencheck.note.nightWeak': 'Mode malam mengubah porsi biru hanya sebesar {value} poin persentase. Itu lebih sedikit daripada yang biasanya diberikan penyaring bawaan sistem.',
  'screencheck.note.pwm': 'Pada kecerahan rendah kedipan naik dari {from}% menjadi {to}% — ini gejala khas peredupan denyut (PWM).',
  'toast.screencheckDone': 'Panduan selesai. Hasilnya ada di bawah.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'Dari mana angka-angka ini. ',
  'reports.noteText': 'Laporan dihitung dari riwayat yang tersimpan di perangkat ini — satu titik setiap lima detik. Mesin pengukur mengumpulkannya sejak pengukuran pertama, jadi laporannya siap seketika.',
  'reports.rangeAria': 'Rentang laporan',
  'reports.day': 'Sehari terakhir',
  'reports.week': '7 hari terakhir',
  'reports.date': 'Laporan untuk tanggal {date}.',
  'report.headerDay': 'Hari dari {from} sampai {to} — {count}.',
  'report.headerWeek': 'Pekan dari {from} sampai {to} — {count}.',
  'count.points': { other: '{n} titik data' },
  'count.samples': { other: '{n} sampel' },
  'report.emptyTitle': 'Tidak ada data pada periode ini',
  'report.emptyText': 'Jalankan pengukuran di layar Ukur — riwayat menyimpan dirinya sendiri.',
  'report.colAvg': 'Rata-rata',
  'report.colMin': 'Minimum',
  'report.colMax': 'Maksimum',
  'report.zonesTitle': 'Sebaran zona',
  'report.worstHour': 'Waktu terburuk dalam sehari',
  'report.worstHourNone': 'tidak ada yang menonjol',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'Apa yang bisa dilakukan',
  'report.disclaimerTitle': 'Ini bukan saran kesehatan. ',
  'report.disclaimerText': 'Kesimpulannya semata-mata berasal dari apa yang dilihat kamera ponsel ini. Aplikasi tidak mengukur spektrum, tidak mengenal lux, dan tidak menegakkan diagnosis apa pun.',

  'advice.melanopic': 'Rata-rata dampak sirkadian mencapai {value}×. Pada malam hari sebaiknya turun di bawah 0,50 — paling mudah dengan bohlam yang lebih hangat atau mode malam.',
  'advice.kelvin': 'Cahayanya sejuk (rata-rata {value} K). Untuk bekerja itu tidak masalah; untuk dua jam sebelum tidur, di bawah 3000 K lebih baik.',
  'advice.flicker': 'Terdeteksi kedipan yang cukup nyata (rata-rata {value}%). Biasanya penyebabnya peredup murah atau catu daya lampu latar.',
  'advice.uniformity': 'Cahaya tersebar tidak merata ({value}%). Menggeser lampu atau mengubah sudutnya biasanya lebih berguna daripada mengganti bohlam.',
  'advice.worstHour': 'Waktu terburuk dalam sehari adalah pukul {hour}:00 — di situlah paling banyak pembacaan di luar batas berkumpul.',
  'advice.none': 'Pada periode ini tidak ada yang keluar dari batas. Yang paling berguna sekarang adalah membandingkan dua sumber cahaya di pembanding A/B.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'Format berkas. ',
  'export.noteText': 'Titik koma sebagai pemisah kolom, koma sebagai tanda desimal, pengodean UTF-8 dengan penanda BOM. Excel yang disetel ke wilayah dengan koma sebagai tanda desimal membuka berkas seperti ini tanpa perlu mengatur apa pun.',
  'export.range': 'Rentang data',
  'export.columns': 'Kolom di dalam berkas',
  'export.chipFilled': ' — kolom terisi',
  'export.help': 'Berkas berisi ketujuh kolom — mesin pengukur menghitungnya sejak pengukuran pertama dan semuanya masuk ke berkas.',
  'export.run': 'Simpan berkas CSV',
  'export.previewEmpty': 'Tidak ada pembacaan pada rentang ini. Jalankan pengukuran — riwayat menyimpan dirinya sendiri.',
  'csv.range.hour': 'Sejam terakhir',
  'csv.range.day': 'Sehari terakhir',
  'csv.range.week': '7 hari terakhir',
  'csv.range.month': '30 hari terakhir',
  'csv.colDate': 'Tanggal',
  'csv.colTime': 'Waktu',
  'csv.colZone': 'Zona',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'Tidak ada pembacaan sama sekali pada rentang yang dipilih.',
  'toast.exportFailed': 'Peramban ini tidak mengizinkan berkas itu disimpan.',
  'toast.exportSaved': {
    other: 'Berkas {filename} tersimpan ({n} baris).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} jam {m} mnt',
  'duration.ms': '{m} mnt {s} dtk',
  'duration.s': '{s} dtk'
});
