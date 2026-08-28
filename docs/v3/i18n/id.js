/* docs/v3/i18n/id.js — słownik WŁASNY wersji v3, indonezyjski (Bahasa Indonesia).
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/id.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js tego katalogu —
 * pilnuje tego docs/shared/i18n/keys.test.js. Klucza, którego nie ma
 * w angielskim, nie wolno tu dopisywać: angielski jest wartością zapasową.
 *
 * CZEGO TU NIE MA — i dlaczego: kluczy, które stoją już w słowniku wspólnym
 * (docs/shared/i18n/id.js). Nazwy stref, zdania oceniające, noty o granicach
 * metody, nazwy i opisy siedmiu wielkości oraz zastrzeżenie z rozporządzenia
 * (UE) 2017/745 są wspólne dla wersji i tłumaczy się je RAZ — poza jednym
 * świadomym nadpisaniem, opisanym przy 'verdict.critical.comfort'.
 *
 * TERMINOLOGIA jest przejęta ze słownika wspólnego BEZ WYJĄTKÓW, także tam,
 * gdzie v5 wybrała inne słowo: porsi biru, kecerahan pemandangan, suhu warna,
 * dampak sirkadian (rasio melanopik), kedipan, kemerataan, kenyamanan mata.
 * Strefy: „Dalam batas”, „Perhatian”, „Kritis” — i stąd progi nazywają się
 * „ambang perhatian” oraz „ambang kritis”, żeby nazwa progu i nazwa strefy,
 * którą on otwiera, były tym samym słowem. Dalej: besaran (wielkość), kanal
 * (kanał), zona (strefa), dasbor (pulpit), modul (moduł), peramban
 * (przeglądarka), riwayat (historia), luring (offline).
 *
 * REJESTR: forma grzecznościowa „Anda”, konsekwentnie i oszczędnie —
 * indonezyjski opuszcza zaimek tam, gdzie polski go stawia.
 *
 * ZAPIS LICZB WE WZORACH: przecinek dziesiętny („0,3320”), tak jak po polsku,
 * bo wzory czyta człowiek, a nie parser. Liczby wstawiane przez '{…}' są
 * osobną sprawą: te formatuje warstwa językowa według aktywnego języka.
 */
window.I18nData = window.I18nData || {};
window.I18nData['id'] = Object.assign(window.I18nData['id'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. */
  'app.wordmark': 'MONITOR CAHAYA',

  'state.idle': 'Siap',
  'state.starting': 'Menyalakan',
  'state.running': 'Mengukur',
  'state.runningTpl': 'Mengukur {time}',
  'state.stopped': 'Dihentikan',
  'state.error': 'Kesalahan kamera',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5,0 po indonezyjsku, 5.0 po angielsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'Mulai mengukur',
  'keys.starting': 'Menyalakan…',
  'keys.stop': 'Berhenti',
  'keys.flip': 'Ganti',
  'keys.flipAria': 'Ganti kamera, depan atau belakang',
  'keys.menu': 'Menu',
  'keys.menuAria': 'Daftar modul',
  'keys.back': '‹ Kembali',
  'keys.backAria': 'Kembali ke dasbor',
  'keys.dash': 'Dasbor',
  'keys.zoom': 'Perbesar pratinjau',
  'keys.retry': 'Coba lagi',
  'keys.refresh': 'Muat ulang',
  'keys.close': 'Tutup',
  'keys.show': 'Tampilkan',
  'keys.apply': 'Terapkan',
  'keys.remove': 'Hapus',

  'monitor.legend': 'Pratinjau kontrol',
  'monitor.badge': 'Langsung',

  'aim.title': 'Membidik',
  'aim.hint': 'Bingkai menunjukkan persis bagian gambar yang diukur aplikasi.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'Kanal utama',
  'readout.thresholdTpl': '(ambang {value})',
  'readout.contextTpl': 'min {min} · rata-rata {avg} · maks {max} — 60 dtk terakhir',
  'readout.contextEmpty': 'tidak ada data dari 60 dtk terakhir',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'Apa artinya: {name}',
  'aria.channel': '{name}, {value}, {zone}. Tampilkan di layar besar.',
  'aria.channelStale': '{name}, tidak ada data. Tampilkan di layar besar.',
  'aria.scale': 'Skala: {name}, dari {min} sampai {max}. Sekarang {value}, {zone}. Ambang perhatian {warn}, ambang kritis {crit}.',
  'aria.readout': '{name}: {value}, {zone}.',
  'aria.readoutApprox': '{name}: sekitar {value}, {zone}. Nilai perkiraan.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'Skala kanal utama. Tidak ada data',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': 'Tekan “Mulai mengukur”, arahkan ponsel ke permukaan yang terkena cahaya dan tahan tetap diam beberapa detik.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'Kenyamanan mata rendah. Lihat modul 01 untuk mengetahui apa yang menurunkannya.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'Mulailah dari tombol “Mulai mengukur” di bagian bawah layar. Kamera baru menyala setelah Anda menekannya.',
  'transient.measureStopped': 'Pengukuran selesai · {time} · tersimpan di riwayat.',
  'transient.newVersion': 'Ada versi baru aplikasi ini.',
  'transient.thresholdsSaved': 'Ambang tersimpan.',
  'transient.thresholdsRejected': 'Tidak tersimpan — ambang perhatian dan ambang kritis tidak boleh saling melewati.',
  'transient.historyCleared': 'Riwayat dihapus.',

  'live.lead': 'Kanal utama: {name}, {value}, {zone}.',
  'live.ready': 'Penilaian siap. {name} {value}, {zone}.',
  'live.started': 'Pengukuran dimulai.',
  'livebar.stopped': 'Pengukuran dihentikan',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'Belum ada rekaman apa pun. Riwayat terisi selama pengukuran berlangsung — jalankan pengukuran selama satu menit lalu kembali ke sini.',
  'empty.recorderNoRange': 'Tidak ada pengukuran pada rentang ini.',
  'empty.coverageTpl': 'Pengukuran mencakup {done} dari {total} jam.',
  'empty.reportsNoData': 'Laporan harian akan muncul setelah satu hari penuh dengan pengukuran.',
  'empty.compareOneSession': 'Perbandingan membutuhkan dua sesi yang selesai. Sejauh ini Anda punya satu.',
  'empty.exportNoData': 'Tidak ada yang bisa diekspor. Mulailah mengukur agar riwayat ada isinya.',
  'empty.alertsOff': 'Peringatan dimatikan. Setelah dinyalakan, peringatan hanya bekerja selama aplikasi terbuka.',
  'empty.scheduleEmpty': 'Belum ada waktu yang disetel. Jadwal hanya bekerja selama aplikasi terbuka.',
  'empty.historyEmpty': 'Riwayat kosong.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'Daftar modul',

  'modules.01.title': 'Perekam',
  'modules.01.desc': 'Jalannya pengukuran dari waktu ke waktu, dari satu menit sampai tiga puluh hari.',
  'modules.02.title': 'Ambang',
  'modules.02.desc': 'Setel sendiri batas perhatian dan batas kritis untuk setiap besaran.',
  'modules.03.title': 'Kalibrasi',
  'modules.03.desc': 'Acuan pada sumber cahaya yang diketahui, dan apa yang tidak diperbaiki oleh kalibrasi.',
  'modules.04.title': 'Laporan',
  'modules.04.desc': 'Ringkasan harian dan mingguan dalam bentuk cetakan.',
  'modules.05.title': 'Ekspor',
  'modules.05.desc': 'Menyimpan pembacaan ke berkas CSV atau JSON, lengkap dengan penjelasan kolomnya.',
  'modules.06.title': 'Perbandingan',
  'modules.06.desc': 'Dua sesi berdampingan, dengan selisih yang dinyatakan sebagai angka.',
  'modules.07.title': 'Uji layar',
  'modules.07.desc': 'Pola uji untuk memeriksa monitor Anda sendiri, langkah demi langkah.',
  'modules.08.title': 'Jadwal',
  'modules.08.desc': 'Pengukuran pada waktu yang Anda tentukan.',
  'modules.09.title': 'Peringatan',
  'modules.09.desc': 'Pemberitahuan setelah ambang terlewati — dan kapan ia tidak bekerja.',
  'modules.10.title': 'Dukungan',
  'modules.10.desc': 'Aplikasi ini sepenuhnya gratis. Di sini Anda bisa mentraktir kopi penulisnya.',
  'modules.11.title': 'Dokumentasi',
  'modules.11.desc': 'Apa sebenarnya pengukuran ini, dan apa yang pasti bukan.',
  'modules.12.title': 'Pengaturan',
  'modules.12.desc': 'Tema, ukuran teks, pengurangan gerak, penghapusan riwayat.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'Kanal pengukuran',
  'channels.pick': 'Tampilkan di layar besar',
  'channels.stale': 'tidak ada data',
  'channels.approx': 'nilai perkiraan',

  'help.unit': 'Satuan',
  'help.range': 'Rentang',
  'help.thresholds': 'Ambang',
  'help.warn': 'Ambang perhatian',
  'help.crit': 'Ambang kritis',
  'help.now': 'sekarang',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „Besaran” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'Besaran',
  'col.unit': 'Satuan',
  'col.range': 'Rentang',
  'col.direction': 'Arah',
  'col.time': 'Waktu',
  'col.date': 'Tanggal',
  'col.zone': 'Zona',
  'col.avg': 'Rata-rata',
  'col.min': 'Minimum',
  'col.max': 'Maksimum',
  'col.name': 'Kolom',
  'col.meaning': 'Isinya',
  'col.channel': 'Kanal',
  'col.gain': 'Penguatan',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'Rentang waktu',
  'recorder.range.60s': '60 dtk',
  'recorder.range.15min': '15 mnt',
  'recorder.range.1h': '1 jam',
  'recorder.range.24h': '24 jam',
  'recorder.range.30d': '30 hari',
  'recorder.gap': 'tidak ada pengukuran',
  'recorder.sessionTitle': 'Statistik sesi',
  'recorder.zonesCaption': 'Sebaran zona untuk porsi biru',
  'recorder.tableCaption': 'Pembacaan dari rentang yang dipilih',
  'recorder.crosshair': 'Kursor pembacaan',
  'recorder.prevAria': 'Titik sebelumnya',
  'recorder.nextAria': 'Titik berikutnya',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'Tampilan',
  'settings.themeLabel': 'Tema',
  'settings.themeSystem': 'Ikuti sistem',
  'settings.themeLight': 'Terang',
  'settings.themeDark': 'Gelap',
  'settings.themeHint': 'Tema “ikuti sistem” berubah bersama pengaturan di ponsel Anda.',
  'settings.textLabel': 'Ukuran teks',
  /* Mnożnik jako LICZBA we wstawce — 1,15 po indonezyjsku, 1.15 po angielsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'Memperbesar seluruh antarmuka, bukan hanya hurufnya — tombol dan baris ikut membesar bersama teks.',
  'settings.motionGroup': 'Gerak',
  'settings.motionLabel': 'Kurangi gerak',
  'settings.motionHint': 'Mematikan semua transisi. Jarum skala lalu melompat sekali per detik, bukan meluncur.',
  'settings.dataTitle': 'Data',
  'settings.clearLabel': 'Hapus riwayat',
  'settings.clearHintTpl': 'Riwayat saat ini menyimpan {count} titik.',
  'settings.clearHintEmpty': 'Riwayat kosong.',
  'settings.clearTitle': 'Hapus riwayat?',
  'settings.clearConfirm': 'Hapus seluruh riwayat pengukuran? Tindakan ini tidak bisa dibatalkan.',
  'settings.clearKey': 'Hapus',
  'settings.aboutTitle': 'Tentang aplikasi',
  'settings.versionTpl': '{app}, versi {version}.',
  'settings.offlineText': 'Aplikasi bekerja tanpa jaringan. Setelah dibuka pertama kali, semua berkasnya berada di penyimpanan peramban, jadi mode pesawat tidak mengubah apa pun. Tidak ada yang dikirim ke server mana pun, karena aplikasi ini tidak melakukan permintaan jaringan.',
  'settings.docsKey': 'Buka dokumentasi',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'Batal',
  'common.save': 'Simpan',
  'common.reset': 'Pulihkan bawaan',
  'common.yes': 'Ya',
  'common.no': 'Tidak',
  'common.on': 'Nyala',
  'common.off': 'Mati',
  'common.sep': ' · ',
  'common.stepsTitle': 'Langkah demi langkah',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'Untuk apa ambang sendiri',
  'modules.02.intro': 'Ambang menentukan kapan aplikasi berkata “Perhatian” dan kapan “Kritis”. Nilai bawaan adalah penilaian redaksi kami, bukan sebuah standar — kalau Anda mengukur dalam kondisi lain, geserlah sesuai kebutuhan Anda. Penilaian dan kalimat di dasbor langsung dihitung dari ambang yang baru.',
  'modules.02.orderNormal': 'Ambang perhatian harus berada di bawah ambang kritis.',
  'modules.02.orderInvert': 'Di sini nilai yang lebih tinggi lebih baik, jadi ambang perhatian berada di atas ambang kritis.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'Pratinjau skala: {name}',
  'modules.02.nowTpl': 'sekarang {value}',
  'modules.02.resetDone': 'Ambang bawaan telah dipulihkan.',
  'modules.02.profilesTitle': 'Profil',
  'modules.02.profilesHint': 'Profil adalah satu set ambang tersimpan untuk ketujuh besaran. Menerapkan sebuah profil menukar semuanya sekaligus.',
  'modules.02.profileSaveKey': 'Simpan ambang saat ini',
  'modules.02.profileNameLabel': 'Nama profil baru',
  'modules.02.profileNameHint': 'Nama itu tetap di perangkat ini. Paling banyak 40 karakter.',
  'modules.02.profileNameEmpty': 'Masukkan nama profil.',
  'modules.02.profileSavedTpl': 'Profil “{name}” tersimpan.',
  'modules.02.profileAppliedTpl': 'Profil “{name}” diterapkan.',
  'modules.02.profileRemovedTpl': 'Profil “{name}” dihapus.',
  'modules.02.profileFailed': 'Profil itu tidak dapat diterapkan.',
  'modules.02.profileCustomTpl': 'Profil Anda sendiri, disimpan {date}.',
  'modules.02.builtin.default.name': 'Bawaan',
  'modules.02.builtin.default.desc': 'Ambang dari katalog besaran — titik awal untuk semua pengukuran.',
  'modules.02.builtin.evening.name': 'Malam — lembut',
  'modules.02.builtin.evening.desc': 'Memperingatkan lebih awal tentang warna yang sejuk dan dampak sirkadian.',
  'modules.02.builtin.work.name': 'Kerja di meja',
  'modules.02.builtin.work.desc': 'Membolehkan cahaya siang yang terang dan sejuk; menjaga kedipan dan kemerataan.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'Kenapa ini bekerja',
  'modules.03.why': 'Sensor kamera punya simpangan tetap antar kanalnya. Mengukur selembar kertas putih menunjukkan seberapa besar simpangan itu dan memungkinkannya dikurangkan. Ini satu-satunya fitur di aplikasi ini yang benar-benar menaikkan ketelitian — dan ia tetap tidak mengubah kamera menjadi spektrometer.',
  'modules.03.steps.1': 'Letakkan selembar kertas putih di bawah cahaya yang Anda ukur.',
  'modules.03.steps.2': 'Tekan “Mulai mengukur” di dasbor dan penuhi bingkai dengan kertas itu.',
  'modules.03.steps.3': 'Kembali ke sini, tekan “Kalibrasi” dan jangan gerakkan ponsel selama tiga detik.',
  'modules.03.runKey': 'Kalibrasi (3 dtk)',
  'modules.03.clearKey': 'Hapus kalibrasi',
  'modules.03.busyTpl': 'Mengukur kertas… sisa {sec} dtk',
  'modules.03.statusNone': 'Tidak ada kalibrasi. Pengukuran tetap bekerja; perlakukan nilainya sebagai pembanding.',
  'modules.03.statusOnTpl': 'Dikalibrasi {date} pukul {time}.',
  'modules.03.gainsTitle': 'Penguatan kanal',
  'modules.03.gainR': 'Merah',
  'modules.03.gainG': 'Hijau',
  'modules.03.gainB': 'Biru',
  'modules.03.gainsNone': 'tidak disetel',
  'modules.03.needRunning': 'Jalankan pengukuran dulu dan arahkan kamera ke selembar kertas putih.',
  'modules.03.tooFew': 'Sampelnya terlalu sedikit. Periksa apakah pengukuran benar-benar berjalan.',
  'modules.03.tooDark': 'Gambarnya terlalu gelap untuk dikalibrasi. Terangi kertasnya lalu coba lagi.',
  'modules.03.refused': 'Simpangan antar kanal terlalu besar untuk diterima sebagai kalibrasi. Gunakan kertas putih dalam cahaya yang merata.',
  'modules.03.done': 'Terkalibrasi. Suhu warna dan dampak sirkadian akan lebih tepat sekarang.',
  'modules.03.cleared': 'Kalibrasi dihapus.',
  'modules.03.limitsTitle': 'Apa yang tidak diperbaiki oleh kalibrasi',
  'modules.03.limits.1': 'Kalibrasi meratakan tiga kanal kamera dan tidak lebih dari itu. Ia tidak memberi kamera sebuah spektrum, jadi suhu warna dan dampak sirkadian tetap berupa perkiraan yang dihitung dari warna primer sRGB.',
  'modules.03.limits.2': 'Ia tidak mengubah kecerahan pemandangan menjadi besaran mutlak — angka itu tetap relatif. Ia juga tidak mematikan eksposur otomatis maupun keseimbangan putih, yang menggeser pembacaan dari balik layar.',
  'modules.03.limits.3': 'Ia tidak berpindah ke cahaya lain: kalibrasi yang dibuat di bawah satu bohlam menggambarkan bohlam itu. Pada sumber cahaya yang berbeda, ulangi. Dan ia tidak mengubah apa pun tentang apa yang bukan pengukuran ini — ia tetap bukan pemeriksaan dan tetap bukan dasar untuk menegakkan diagnosis penyakit.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'Periode laporan',
  'modules.04.rangeDay': 'Harian',
  'modules.04.rangeWeek': 'Mingguan',
  'modules.04.headTpl': 'Dari {from} sampai {to} · {count} titik riwayat.',
  'modules.04.tableTitle': 'Ringkasan',
  'modules.04.tableCaption': 'Rata-rata, minimum, dan maksimum pada periode yang dipilih',
  'modules.04.panoramaTitle': 'Panorama',
  'modules.04.panoramaAriaTpl': 'Panorama: {name}, {span}.',
  'modules.04.panoramaSpanDay': 'sehari terakhir dipecah per jam',
  'modules.04.panoramaSpanWeek': 'sepekan terakhir dipecah per hari',
  'modules.04.panoramaHint': 'Tinggi dan warna batang mengatakan hal yang sama: dalam batas — rendah, perhatian — sedang, kritis — penuh. Garis di dasarnya menandai jam tanpa pengukuran.',
  'modules.04.coverageDayTpl': 'Pengukuran mencakup {done} dari {total} jam.',
  'modules.04.coverageWeekTpl': 'Pengukuran mencakup {done} dari {total} hari.',
  'modules.04.zonesTitle': 'Sebaran zona',
  'modules.04.zonesCaptionTpl': 'Dihitung untuk kanal utama: {name}.',
  'modules.04.worstTpl': 'Waktu tersulit: {value}.',
  'modules.04.worstNone': 'tidak ada yang menonjol',
  'modules.04.worstHourTpl': 'pukul {hour}',
  'modules.04.adviceTitle': 'Apa yang bisa dilakukan',
  'modules.04.adviceMelanopicTpl': 'Rata-rata dampak sirkadian adalah {value}×. Pada malam hari sebaiknya turun di bawah 0,50 — paling mudah dengan bohlam yang lebih hangat atau mode malam.',
  'modules.04.adviceKelvinTpl': 'Cahayanya sejuk (rata-rata {value} K). Untuk bekerja itu tidak masalah; dua jam sebelum tidur, di bawah 3000 K terasa lebih lembut.',
  'modules.04.adviceFlickerTpl': 'Ada kedipan yang cukup terlihat (rata-rata {value}%). Biasanya penyebabnya peredup murah atau pencatu daya lampu latar.',
  'modules.04.adviceUniformityTpl': 'Cahaya tersebar tidak merata ({value}%). Menggeser lampu atau mengubah sudutnya biasanya lebih berpengaruh daripada mengganti bohlam.',
  'modules.04.adviceWorstTpl': 'Pembacaan di luar ambang paling banyak berkumpul pada pukul {hour}.',
  'modules.04.adviceNone': 'Pada periode ini tidak ada yang melewati ambang yang Anda setel.',
  'modules.04.limitsTitle': 'Ini bukan saran kesehatan',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'Kesimpulan ini semata-mata berasal dari apa yang dilihat kamera ponsel ini. Aplikasi tidak mengukur spektrum dan tidak menegakkan diagnosis apa pun.',
  'modules.04.printHint': 'Halaman ini dirancang seperti cetakan: tabel dan keterangannya terbaca sama di atas kertas, di kaca pembesar sistem, dan di pembaca layar.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'Rentang data',
  'modules.05.range1h': 'Sejam',
  'modules.05.range24h': 'Sehari',
  'modules.05.range7d': '7 hari',
  'modules.05.range30d': '30 hari',
  'modules.05.csvKey': 'Simpan berkas CSV',
  'modules.05.jsonKey': 'Simpan berkas JSON',
  'modules.05.formatTitle': 'Format berkas',
  'modules.05.formatCsv': 'CSV: titik koma memisahkan kolom, koma adalah tanda desimal, pengodeannya UTF-8 dengan penanda BOM. Excel yang disetel ke lokal dengan koma sebagai tanda desimal membuka berkas seperti itu tanpa perlu menyetel apa pun.',
  'modules.05.formatJson': 'JSON: data yang sama di dalam ruas “points”, dengan titik desimal dan penanda waktu dalam milidetik — begitulah yang dituntut format ini.',
  'modules.05.resolution': 'Riwayat menyimpan satu titik setiap 5 detik dan menjangkau 30 hari ke belakang. Berkasnya tidak memuat resolusi penuh lima sampel per detik — mesin hanya menyimpannya selama satu menit.',
  'modules.05.offline': 'Berkasnya dibuat di perangkat ini dan tetap di perangkat ini. Ekspor tidak menyambung ke jaringan.',
  'modules.05.columnsTitle': 'Penjelasan kolom',
  'modules.05.columnsCaption': 'Kolom berkas dan artinya',
  'modules.05.descDate': 'Tanggal titik itu dari jam perangkat, ditulis hari-bulan-tahun.',
  'modules.05.descTime': 'Waktu titik itu, sampai ke detiknya.',
  'modules.05.descZone': 'Zona porsi biru pada saat penyimpanan. Mesin hanya menyimpan zona untuk besaran yang satu itu — untuk sisanya, hitunglah dari ambang.',
  'modules.05.descMetricTpl': '{short} Satuan: {unit}. Rentang {min}–{max}.',
  'modules.05.previewTitle': 'Pratinjau',
  'modules.05.previewHint': 'Lima baris pertama berkas, persis seperti nanti akan disimpan.',
  'modules.05.savedTpl': 'Berkas {name} tersimpan — {rows} baris.',
  'modules.05.failed': 'Peramban ini tidak mengizinkan berkas itu disimpan.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'Aplikasi menyimpan setiap sesi pengukuran yang selesai di perangkat ini. Pilih dua untuk melihat keduanya pada satu pita dan membaca selisihnya sebagai angka.',
  'modules.06.noSessions': 'Belum ada satu pun sesi yang selesai. Jalankan pengukuran, hentikan, lalu kembali ke sini.',
  'modules.06.slotA': 'Sesi A',
  'modules.06.slotB': 'Sesi B',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'Pita',
  'modules.06.tapeAriaTpl': 'Jalannya sesi {slot}, besaran {name}.',
  'modules.06.tapeHint': 'Kedua sesi direntangkan pada lebar yang sama: satu batang adalah bagian durasi yang sama, bukan jam yang sama. Tinggi dan warnanya mengatakan hal yang sama seperti di dasbor.',
  'modules.06.tapeChannelTpl': 'Pita menampilkan kanal utama: {name}.',
  'modules.06.diffTitle': 'Selisih',
  'modules.06.diffCaption': 'Rata-rata kedua sesi dan selisih di antara keduanya',
  'modules.06.clearKey': 'Hapus sesi tersimpan',
  'modules.06.cleared': 'Sesi tersimpan telah dihapus.',
  'modules.06.savedTpl': 'Sesi tersimpan: {dur}.',
  'modules.06.limitsTitle': 'Apa yang tidak dikatakan perbandingan ini',
  'modules.06.limits': 'Anda membandingkan dua pengukuran, bukan dua sumber cahaya. Kalau di antara kedua sesi bidikan, jarak, waktu dalam sehari, atau posisi ponsel berubah, selisihnya juga bercerita tentang itu. Perbandingan yang paling jujur adalah pemandangan yang sama sebelum dan sesudah perubahan pencahayaan.',
  'modules.06.keepTpl': 'Paling banyak {count} sesi terakhir yang diingat.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'Pola uji ditampilkan memenuhi layar perangkat ini. Gunanya untuk melihat layar dengan mata sendiri: apakah putihnya rata, apakah abu-abunya melenceng ke suatu warna, dan apakah lampu latarnya merembes di sudut.',
  'modules.07.steps.1': 'Setel kecerahan layar ke tingkat yang biasa Anda pakai bekerja dan matikan mode malam sistem.',
  'modules.07.steps.2': 'Pilih satu pola dari daftar di bawah. Pola itu akan memenuhi seluruh layar.',
  'modules.07.steps.3': 'Lihatlah dari jarak kira-kira enam puluh sentimeter, tegak lurus ke layar. Lalu lihat pola yang sama dari samping.',
  'modules.07.steps.4': 'Keluar dengan tombol “Tutup pola” atau tombol Escape lalu lanjutkan ke pola berikutnya.',
  'modules.07.planesTitle': 'Pola uji',
  'modules.07.exitKey': 'Tutup pola',
  'modules.07.showAriaTpl': 'Tampilkan pola: {name}',
  'modules.07.planeAriaTpl': 'Pola uji: {name}. Tombol tutup ada di bagian bawah layar.',
  'modules.07.plane.white.name': 'Putih',
  'modules.07.plane.white.hint': 'Cari bercak, semburat warna, dan bagian yang lebih terang di dekat tepi. Putih seharusnya satu warna di seluruh permukaan.',
  'modules.07.plane.gray75.name': 'Abu-abu 75%',
  'modules.07.plane.gray75.hint': 'Abu-abu harus terlihat abu-abu. Semburat kehijauan atau kemerahmudaan berarti keseimbangan putih layar sudah melenceng.',
  'modules.07.plane.gray50.name': 'Abu-abu 50%',
  'modules.07.plane.gray50.hint': 'Pola terbaik untuk menilai semburat warna. Bandingkan bagian tengah dengan sudut-sudutnya.',
  'modules.07.plane.gray25.name': 'Abu-abu 25%',
  'modules.07.plane.gray25.hint': 'Abu-abu gelap memperlihatkan rembesan lampu latar dan pita-pita pada panel murah.',
  'modules.07.plane.black.name': 'Hitam',
  'modules.07.plane.black.hint': 'Di ruangan yang gelap, pola ini memperlihatkan setiap rembesan lampu latar dan setiap sudut yang menerang.',
  'modules.07.plane.red.name': 'Merah murni',
  'modules.07.plane.red.hint': 'Merah yang rata mengungkap subpiksel mati dan ketidakrataan panel.',
  'modules.07.plane.green.name': 'Hijau murni',
  'modules.07.plane.green.hint': 'Hijau membawa kecerahan paling banyak — pada warna inilah piksel yang rusak paling mudah terlihat.',
  'modules.07.plane.blue.name': 'Biru murni',
  'modules.07.plane.blue.hint': 'Biru memperlihatkan debu dan noda di permukaan layar lebih baik daripada putih.',
  'modules.07.plane.grid.name': 'Kisi',
  'modules.07.plane.grid.hint': 'Garisnya harus sama tajam di sudut seperti di tengah. Kabur di tepi adalah soal penskalaan gambar.',
  'modules.07.warn': 'Pola menutupi seluruh layar, termasuk dasbor kendali beserta tombol pengukuran. Ini satu-satunya tempat di aplikasi tempat hal itu terjadi, dan karena itu tombol keluarnya besar dan selalu terlihat. Selama pola ada di layar, pengukuran terus berjalan dan tidak bisa dihentikan — tutup polanya untuk kembali ke tombol-tombolnya.',
  'modules.07.cameraTitle': 'Apa yang tidak bisa Anda lakukan di sini',
  'modules.07.camera': 'Ponsel tidak melihat layarnya sendiri, jadi pola-pola ini tidak bisa Anda ukur dengan perangkat yang sama. Untuk mengukur sebuah monitor, tampilkan polanya di monitor itu dan lakukan pengukuran dengan ponsel — dua perangkat yang berbeda dengan dua peran yang berbeda.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'Jadwal mengingatkan Anda untuk mengukur pada waktu yang ditentukan. Ia tidak menyalakan kamera sendiri: pada jam yang ditetapkan ia menampilkan pengingat, dan pengukurannya Anda mulai dengan tombol “Mulai mengukur” di dasbor. Sama seperti pertama kali.',
  'modules.08.onlyOpenTitle': 'Kapan ini tidak bekerja',
  'modules.08.onlyOpen': 'Jadwal hanya bekerja selama aplikasi terbuka. Tab peramban yang tertutup tidak menghitung waktu dan tidak akan mengingatkan apa pun. Kami tidak meminta izin untuk pemberitahuan sistem dan tidak mengirim apa pun ke jaringan.',
  'modules.08.enableLabel': 'Nyalakan pengingat',
  'modules.08.timesTitle': 'Waktu',
  'modules.08.timeAriaTpl': 'Waktu {n}: jam pengingat',
  'modules.08.addKey': 'Tambah waktu',
  'modules.08.removeAriaTpl': 'Hapus waktu {time}',
  'modules.08.addedTpl': 'Waktu {time} ditambahkan.',
  'modules.08.removedTpl': 'Waktu {time} dihapus.',
  'modules.08.badTime': 'Masukkan waktu dalam format 22:00.',
  'modules.08.nextTpl': 'Pengingat berikutnya: {time}.',
  'modules.08.nextNone': 'Pengingat dimatikan.',
  'modules.08.dueTpl': 'Waktu pengukuran terjadwal: {time}.',
  'modules.08.dueKey': 'Tampilkan dasbor',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'Peringatan menjaga satu besaran dan baru bersuara ketika besaran itu bertahan di zona yang dipilih tanpa putus selama waktu yang Anda setel. Ia tidak pernah menghentikan pengukuran dan tidak pernah menutupi tombol.',
  'modules.09.enableLabel': 'Nyalakan peringatan',
  'modules.09.metricLabel': 'Besaran yang dijaga',
  'modules.09.levelLabel': 'Mulai dari zona mana',
  'modules.09.levelWarning': 'Dari perhatian ke atas',
  'modules.09.levelCritical': 'Hanya kritis',
  'modules.09.sustainLabel': 'Setelah berapa detik tanpa putus',
  'modules.09.sustainHint': 'Waktu yang lebih pendek memberi lebih banyak alarm palsu ketika Anda menggerakkan ponsel. Kami tidak turun di bawah lima detik.',
  'modules.09.soundLabel': 'Nada pendek',
  'modules.09.soundHint': 'Suaranya dihasilkan di perangkat ini. Tidak ada yang diunduh dari jaringan.',
  'modules.09.cooldownHint': 'Paling banyak satu peringatan setiap dua menit. Alarm yang diulang pada setiap sampel adalah alarm yang pada akhirnya dimatikan untuk selamanya.',
  'modules.09.whenNotTitle': 'Kapan peringatan tidak bekerja',
  'modules.09.whenNot': 'Pemberitahuannya ada di dalam aplikasi, bukan di sistem. Ia tidak bekerja ketika aplikasi tertutup atau tersembunyi di latar belakang, ketika pengukuran tidak berjalan, dan ketika besaran yang dijaga tidak dapat diukur pada saat itu. Kami tidak meminta izin untuk pemberitahuan sistem.',
  'modules.09.firedTpl': '{name}: {zone} selama {sec} dtk — sekarang {value}.',
  'modules.09.saved': 'Pengaturan peringatan tersimpan.',
  'modules.09.statusOnTpl': 'Menjaga: {name}, {level}, setelah {sec} dtk.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'Aplikasi ini gratis',
  'support.freeText': 'Ketujuh besaran menampilkan angka sejak pertama kali dijalankan. Perekam, ambang, kalibrasi, laporan, ekspor, perbandingan sesi, dan seluruh riwayat tiga puluh hari bekerja tanpa akun, tanpa biaya, dan tanpa batasan — sama saja dalam mode luring. Tidak ada apa pun di sini yang disimpan di balik pembayaran untuk nanti.',
  'support.whyTitle': 'Kenapa saya meminta ini',
  'support.whyText': 'Monitor Cahaya saya buat dan saya rawat sendiri, di luar jam kerja. Dukungan dipakai untuk waktu yang dibutuhkan bagi perbaikan, bagi pengujian pada lebih banyak ponsel, dan bagi alat berikutnya dalam daftar modul. Tidak ada yang akan berhenti bekerja kalau tidak ada yang menyumbang.',
  'support.nothingTitle': 'Apa yang diberikan donasi',
  'support.nothingText': 'Tidak ada. Tidak ada angka, tidak ada modul, dan tidak ada pengaturan yang terbuka setelah donasi, karena semuanya sudah terbuka sejak awal. Yang tersisa hanyalah bahwa saya tahu ini berguna bagi seseorang.',
  'support.keyTitle': 'Kalau Anda ingin membantu',
  'support.keyLabel': 'Traktir saya kopi',
  'support.keyAria': 'Traktir saya kopi — membuka halaman eksternal di tab baru',
  'support.serviceText': 'Profil donasi dijalankan oleh layanan eksternal, misalnya Buy Me a Coffee. Aplikasi tidak memuat skrip, widget, maupun gambar apa pun darinya — yang berdiri di sini hanyalah tautan biasa dan tidak lebih.',
  'support.privacyText': 'Menekan tombol ini membuka halaman eksternal di tab baru, dan itulah satu-satunya saat ketika ada sesuatu yang meninggalkan perangkat ini. Hasil pengukuran, riwayat, dan pengaturan tetap di tempatnya — di penyimpanan peramban ini.',
  'support.privacyPendingText': 'Begitu alamatnya tersedia, menekan tombol itu akan membuka halaman eksternal di tab baru dan itulah nanti satu-satunya saat ketika ada sesuatu yang meninggalkan perangkat ini. Hasil pengukuran, riwayat, dan pengaturan tetap di tempatnya — di penyimpanan peramban ini.',
  'support.emptyTitle': 'Profilnya belum tersambung',
  'support.emptyText': 'Alamat profil donasi belum dimasukkan, jadi di sini tidak ada tombol yang akan menuntun ke mana-mana. Sisa aplikasi bekerja tanpa perubahan — tidak ada yang menunggu donasi itu.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'Apa yang TIDAK diukur aplikasi ini',
  'docs.notList.1': 'Ia tidak mengukur spektrum. Kamera punya tiga kanal warna yang lebar, eksposur otomatis, dan keseimbangan putih otomatis.',
  'docs.notList.2': 'Ia tidak mengukur nilai mutlak. Kecerahan pemandangan adalah indikator relatif, bukan hasil pengukuran fotometrik.',
  'docs.notList.3': 'Ia tidak mengukur suhu warna secara langsung. Suhu warna dan dampak sirkadian adalah perkiraan yang dihitung dari warna primer sRGB.',
  'docs.notList.4': 'Ia tidak melihat kedipan jaringan listrik. Pencuplikan 5 Hz hanya melihat denyut di bawah 2,5 Hz — kedipan jaringan 100 Hz berada di luar jangkauan dan aplikasi tidak akan pernah melaporkannya sebagai hasil.',
  'docs.notList.5': 'Ia tidak menegakkan diagnosis dan tidak memberi saran kesehatan. Tidak ada hasil pengukuran yang merupakan salah satu dari keduanya.',
  'docs.notList.6': 'Ia tidak membandingkan cahaya Anda dengan acuan resmi mana pun. Ambang adalah pengaturan yang bisa Anda ubah di modul 02.',
  'docs.whatTitle': 'Apa yang diukur, dan bagaimana',
  'docs.whatLead': 'Kamera ponsel melihat permukaan yang terkena cahaya, dan lima kali per detik aplikasi menghitung rata-rata kanal R, G, dan B dari bagian tengah bingkai. Dari ketiga angka itu ia menurunkan tujuh indikator.',
  'docs.whatCrop': 'Bagian itu adalah 60% lebar dan 60% tinggi bingkai — persis persegi panjang yang digariskan oleh bidikan di layar MEMBIDIK. Di luarnya tidak ada yang dihitung.',
  'docs.whatRate': 'Satu sampel setiap 200 ms, yaitu 5 kali per detik. Satu menit terakhir berada di memori dengan resolusi penuh; semua yang lebih lama disimpan setiap 5 detik dan menjangkau tiga puluh hari ke belakang.',
  'docs.metricsTitle': 'Tujuh besaran',
  'docs.formulasTitle': 'Rumus',
  'docs.formula.share.formula': 'porsi biru = B / (R + G + B) × 100%',
  'docs.formula.share.text': 'Dihitung pada nilai sRGB tanpa membalik gamma — dengan sengaja, karena itu definisi yang sama seperti pada versi aplikasi sebelumnya, jadi ambang yang dulu disetel tetap berarti hal yang sama. Ia memisahkan warna dari kecerahan.',
  'docs.formula.brightness.formula': 'kecerahan = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': 'Nilai rata-rata kanal sebagai persentase dari rentangnya. Eksposur otomatis menggesernya dari balik layar, jadi ini indikator relatif — bandingkan dua pemandangan, jangan membaca satu angka sebagai hasil pengukuran.',
  'docs.formula.kelvin.title': 'Suhu warna — pendekatan McCamy',
  'docs.formula.kelvin.formula': 'n = (x − 0,3320) / (y − 0,1858)\nCCT = −449 n³ + 3525 n² − 6823,3 n + 5520,33',
  'docs.formula.kelvin.text': 'Pertama kami membalik gamma sRGB, lalu berpindah lewat matriks ke CIE XYZ untuk titik putih D65 dan menghitung kromatisitas x, y. Rumus McCamy dapat dipercaya kira-kira antara 2000 K dan 12500 K. Di luar rentang itu kurva kubiknya melenceng, jadi hasilnya dipotong dan ditandai sebagai tidak dapat dipercaya — garis dasar skala lalu menjadi putus-putus dan muncul kalimat “di luar jangkauan metode”.',
  'docs.formula.melanopic.title': 'Dampak sirkadian — rasio melanopik',
  'docs.formula.melanopic.formula': 'mel = 0,0016 R + 0,3110 G + 0,8460 B\nY = 0,2127 R + 0,7152 G + 0,0722 B\nhasil = (mel / Y) × normalisasi ke 1,00 untuk putih netral',
  'docs.formula.melanopic.text': 'Ketiga kanal dalam nilai linear. Besaran yang sebenarnya adalah integral spektrum dengan kurva kepekaan melanopsin (puncaknya sekitar 490 nm); kamera punya tiga kanal yang lebar, jadi kami memberi bobot pada warna primer sRGB dengan kepekaan melanopik pada panjang gelombang perkiraannya (R 612 nm, G 549 nm, B 465 nm). Arah perubahannya dapat dipercaya, nilai mutlaknya tidak — karena itu di sebelah angka ini berdiri tanda “≈”.',
  'docs.formula.flicker.formula': 'kedipan = (max − min) / (max + min) × 100%',
  'docs.formula.flicker.text': 'Definisi IES, dihitung dari satu jendela sampel kecerahan. Frekuensinya kami perkirakan dari berapa kali sinyal melintasi nilai rata-ratanya. Pencuplikan 5 Hz hanya melihat modulasi di bawah 2,5 Hz (batas Nyquist), dan kami baru menganggap sebuah frekuensi dapat dipercaya antara 0,2 dan 2 Hz pada amplitudo mulai 0,5% — di bawah ambang itu, perlintasan nilai rata-rata adalah derau sensor, bukan denyut sumber cahaya.',
  'docs.formula.uniformity.formula': 'kemerataan = petak tergelap / petak paling terang × 100%',
  'docs.formula.uniformity.text': 'Bagian tengah itu kami bagi menjadi sembilan petak dalam kisi 3×3 lalu membandingkan yang paling ekstrem. 100% berarti cahaya tersebar sempurna merata. Nilai rendah pada layar berarti rembesan lampu latar atau pantulan; di meja kerja berarti lampu yang salah ditempatkan. Ini satu-satunya besaran yang, bersama kenyamanan mata, semakin tinggi semakin baik.',
  'docs.formula.comfort.formula': '100 poin dikurangi penalti:\ndampak sirkadian di atas 0,75 — sampai 35 poin\nwarna di atas 4000 K — sampai 25 poin\nkedipan di atas 5% — sampai 25 poin\nkemerataan di bawah 60% — sampai 15 poin',
  'docs.formula.comfort.text': 'Satu penilaian sebagai ganti enam angka. Besaran yang tidak dapat diukur tidak memberi penalti apa pun — tidak ada data tidak pernah menyamar sebagai hasil yang baik. Bobotnya adalah penilaian redaksi kami, bukan sebuah standar; karena itu modul 01 menunjukkan rincian komponennya, supaya penilaian itu bisa dibantah.',
  'docs.rangesTitle': 'Rentang dan ambang',
  'docs.rangesLead': 'Ambang di bawah ini adalah ambang yang berlaku saat ini — kalau Anda mengubahnya di modul 02, tabel menampilkan nilai Anda, bukan nilai pabrik.',
  'docs.dirNormal': 'lebih rendah berarti lebih lembut',
  'docs.dirInvert': 'lebih tinggi berarti lebih baik',
  'docs.privacyTitle': 'Data dan privasi',
  'docs.privacyText': 'Gambar dari kamera tidak dikirim maupun disimpan ke mana pun — dari setiap bingkai hanya tersisa tiga angka. Hasil pengukuran, ambang, dan pengaturan berada di penyimpanan peramban pada perangkat ini. Aplikasi tidak melakukan permintaan jaringan apa pun dan bekerja dalam mode luring.',
  'docs.mdrTitle': 'Penafian',
  'docs.freeText': 'Aplikasi ini sepenuhnya gratis dan akan tetap begitu: ketujuh besaran, riwayat, laporan, ekspor, dan mode luring bekerja tanpa akun, tanpa biaya, dan tanpa batasan. Siapa pun yang ingin berterima kasih akan menemukan modul 10 “Dukungan”.',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'Aplikasi termuat tidak lengkap',
  'boot.filesTpl': 'Berkas berikut gagal dimuat: {list}.',
  'boot.modulesTpl': 'Modul berikut tidak melapor: {list} — entri itu tidak akan terbuka dari daftar.',
  'boot.modulesRangeTpl': 'modul {from}–{to}',
  'boot.tail': 'Muat ulang halaman. Kalau itu tidak membantu, berkas di server memang tidak lengkap.',
  'boot.loss.bus': 'modul tidak lagi saling melihat dan pengukuran tidak akan mulai',
  'boot.loss.metrics': 'tidak ada nilai yang akan dihitung',
  'boot.loss.scaleCore': 'geometri skala dan pemformatan angka akan hilang',
  'boot.loss.scaleText': 'semua label antarmuka akan hilang',
  'boot.loss.shell': 'tidak ada modul yang bisa dibuka',
  'boot.loss.engine': 'kamera dan pengukuran tidak akan mulai',
  'boot.loss.dash': 'dasbor akan tetap kosong'
});
