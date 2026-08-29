/* docs/v1/i18n/ms.js — słownik WŁASNY wersji v1, malajski (Bahasa Melayu).
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka. Kolejność jest treścią umowy: plik wersji dokłada się do tego samego
 * obiektu i może nadpisać dowolny klucz wspólny — nigdy odwrotnie.
 *
 * DLACZEGO TEN SŁOWNIK JEST SAMOWYSTARCZALNY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar w app.js, własne
 * dwie wielkości zamiast siedmiu i własne nazwy stref („Selamat” zamiast
 * wspólnego „Dalam julat”). Dlatego wszystko, co v1 pokazuje, stoi TUTAJ —
 * także klucze, które przypadkiem brzmią tak samo jak wspólne. Gdyby kiedyś
 * warstwa wspólna zmieniła brzmienie stref albo nazwę aplikacji, v1 ma zostać
 * nietknięta. Zestaw kluczy jest identyczny z pl.js — pilnuje tego
 * docs/shared/i18n/keys.test.js.
 *
 * TREŚĆ wzięta z pl.js, TERMINOLOGIA — z docs/shared/i18n/ms.js i z v5, żeby ta
 * sama rzecz nie nazywała się w v1 inaczej niż w pozostałych wersjach: bahagian
 * biru, kecerahan pemandangan, suhu warna, bacaan, ambang, saluran biru,
 * peranti, pelayar, skrin, tetapan, butang. Nazw pięciu wielkości, których v1
 * nie mierzy, stamtąd nie przeniesiono. Strefy zostają własne: selamat /
 * sederhana / memudaratkan — przymiotniki wzięte z v5.
 *
 * REJESTR: malajszczyzna standardowa (Malezja), zwrot do użytkownika przez
 * „anda” pisane małą literą. Słownictwo malezyjskie, nie indonezyjskie:
 * peranti (nie „perangkat”), pelayar (nie „peramban”), skrin (nie „layar”),
 * tetapan (nie „pengaturan”), butang (nie „tombol”), jadual (nie „tabel”),
 * fail (nie „berkas”), percuma (nie „gratis”). Ton jak w oryginale: rzeczowy
 * i spokojny, bez marketingu i bez straszenia.
 *
 * ZASTRZEŻENIA MEDYCZNE i akapity o prywatności przełożone co do treści, bez
 * osłabiania i bez dodawania obietnic — to zdania o skutkach prawnych.
 *
 * LICZEBNIKI: malajski nie odmienia rzeczownika przez liczbę — CLDR daje mu
 * jedną kategorię, 'other', i tylko ona ma tu prawo wystąpić.
 *
 * MARKUP W WARTOŚCIACH. Część kluczy (rozdziały Dokumentacji) zawiera znaczniki
 * <b>, <i>, <code> i encje HTML. Wstawiane są przez data-i18n-html, czyli tylko
 * tam, gdzie autor tekstu świadomie tego chciał — nigdy do treści pochodzącej
 * od użytkownika.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ms'] = Object.assign(window.I18nData['ms'] || {}, {

  /* ---- aplikacja ---- */

  'app.name': 'Monitor Cahaya Memudaratkan',
  'app.description': 'Mengukur dengan kamera betapa kuatnya warna biru pada skrin dan menunjukkannya pada carta yang jelas dengan zon: selamat, sederhana, memudaratkan.',

  /* ---- wybór języka ---- */

  'language.label': 'Bahasa',
  'language.help': 'Bahasa untuk keseluruhan aplikasi. Semua bahasa sudah ada pada peranti ini — tiada apa-apa yang dimuat turun dan tiada apa-apa yang dihantar ke mana-mana.',
  'language.auto': 'Ikut peranti',

  /* ---- nawigacja ---- */

  'nav.aria': 'Menu utama',
  'nav.tabsAria': 'Paparan aplikasi',
  'nav.announce': 'Skrin: {screen}',
  'nav.camera': 'Kamera',
  'nav.monitoring': 'Pemantauan',
  'nav.support': 'Sokongan',
  'nav.more': 'Lagi',
  'nav.docs': 'Dokumentasi',
  'nav.about': 'Tentang dan hubungi',
  'nav.settings': 'Ambang amaran',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← Kembali',
  'action.back.aria': 'Kembali ke skrin sebelumnya',
  'action.openDocs': 'Pergi ke dokumentasi',
  'action.exportCsv': 'Eksport CSV',
  'action.delete': 'Padam',
  'action.closeNotification': 'Tutup pemberitahuan',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref — „Selamat / Sederhana / Memudaratkan”,
     a nie wspólne „Dalam julat / Awas / Kritikal”. Wersja plakatowa
     (zone.badge.*) jest osobnym kluczem, a nie zapisem wielkimi literami przez
     CSS: tureckie „i” i greckie akcenty nie znoszą automatycznej zamiany. */

  'zone.good': 'Selamat',
  'zone.warning': 'Sederhana',
  'zone.critical': 'Memudaratkan',
  'zone.none': 'Tiada data',

  'zone.badge.good': 'SELAMAT',
  'zone.badge.warning': 'SEDERHANA',
  'zone.badge.critical': 'MEMUDARATKAN',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'Kecerahan saluran B',
  'metric.raw.unitLabel': '% kecerahan saluran B',
  'metric.share.name': 'Bahagian biru',
  'metric.share.longName': 'Bahagian biru dalam cahaya',
  'metric.share.unitLabel': '% bahagian biru',
  'stat.overallBrightness': 'Kecerahan keseluruhan pemandangan',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': 'Pratonton kamera',
  'camera.pressStart': 'Tekan “Start”.',
  'camera.start': 'Start',
  'camera.stop': 'Stop',
  'camera.switch': 'Tukar kamera',
  'camera.error': 'Kamera tidak dapat dihidupkan. Periksa kebenaran kamera dalam pelayar anda dan cuba lagi. ({message})',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': 'Bacaan semasa',
  'disclaimer.short': 'Keputusan anggaran. Ini bukan peranti perubatan.',
  'disclaimer.more': 'Lebih lanjut',

  /* ---- wykresy ---- */

  'chart.aria': 'Carta dari semasa ke semasa',
  'chart.title': 'Carta dari semasa ke semasa ({seconds} s terakhir)',
  'chart.empty': 'Hidupkan kamera untuk melihat carta',
  'chart.axis.past': '-{seconds}s',
  'chart.axis.now': 'sekarang',
  'chart.raw.aria': 'Carta kecerahan saluran B dari semasa ke semasa, dengan zon selamat, sederhana dan memudaratkan ditandakan',
  'chart.share.aria': 'Carta bahagian biru dalam cahaya dari semasa ke semasa, dengan zon selamat, sederhana dan memudaratkan ditandakan',

  /* ---- tabela odczytów ---- */

  'table.show': 'Tunjukkan sebagai jadual',
  'table.hide': 'Sembunyikan jadual',
  'table.caption': 'Bacaan terkini (terbaharu di atas)',
  'table.col.time': 'Masa',
  'table.col.zone': 'Zon',

  /* ---- ustawienia progów ---- */

  'settings.title': 'Tetapan ambang zon',
  'settings.boundary.critical': 'Sempadan kuning / merah:',
  'settings.boundary.warning': 'Sempadan hijau / kuning:',

  /* ---- historia i raport (features.js) ---- */

  'history.title': 'Sejarah dan laporan',
  'history.rangeAria': 'Julat sejarah',
  'history.unavailable': 'Data sejarah tidak tersedia buat sementara waktu.',
  'history.empty': 'Tiada bacaan disimpan dalam julat ini. Mulakan pengukuran — sejarah terkumpul dengan sendirinya.',
  'history.savedReadings': 'Bacaan yang disimpan: {count}. Pembahagian masa mengikut zon:',
  'history.zoneLine': '{zone}: {percent}% ({readings})',

  'range.1h': '1 jam',
  'range.24h': '24 jam',
  'range.7d': '7 hari',
  'range.30d': '30 hari',

  'report.dailyTitle': 'Laporan harian',
  'report.empty': 'Laporan akan muncul sebaik sahaja ada bacaan disimpan dalam julat yang dipilih.',
  'report.dailyCaption': 'Bahagian masa dalam setiap zon, hari demi hari',
  'report.col.day': 'Hari',
  'report.col.week': 'Minggu',
  'report.col.readings': 'Bacaan',
  'report.compare.day': 'Perbandingan hari ke hari: {day} — {percent}% daripada masa dalam zon memudaratkan, {change}',
  'report.compare.dayPending': 'Perbandingan hari ke hari akan muncul selepas hari kedua pengukuran.',
  'report.compare.week': 'Perbandingan minggu ke minggu: {week} — {percent}% daripada masa dalam zon memudaratkan, {change}',
  'report.compare.weekPending': 'Perbandingan minggu ke minggu akan muncul selepas minggu kedua pengukuran.',
  'report.change.same': 'sama seperti {other}.',
  'report.change.more': '{points} lebih banyak daripada {other}.',
  'report.change.less': '{points} lebih sedikit daripada {other}.',
  'report.peak': 'Bacaan dalam zon memudaratkan paling banyak jatuh antara {from} dan {to}.',
  'report.peak.none': 'Tiada bacaan dalam zon memudaratkan yang disimpan dalam julat ini.',
  'report.weeklyTitle': 'Laporan mingguan',
  'report.weeklyEmpty': 'Laporan mingguan akan muncul sebaik sahaja ada bacaan disimpan dalam julat yang dipilih.',
  'report.weeklyCaption': 'Bahagian masa dalam setiap zon, minggu demi minggu',
  'report.weekLabel': 'Minggu {week} ({year})',
  'report.footnote': 'Angka ini ialah bahagian bacaan yang disimpan dalam julat yang dipilih, bukan masa pendedahan yang tepat.',

  /* ---- profile progów ---- */

  'profiles.title': 'Profil ambang',
  'profiles.empty': 'Anda belum menyimpan sebarang profil.',
  'profiles.itemActive': '{name} (aktif)',
  'profiles.applyAria': 'Gunakan profil {name}',
  'profiles.deleteAria': 'Padam profil {name}',
  'profiles.applied': 'Profil “{name}” digunakan.',
  'profiles.deleted': 'Profil “{name}” dipadam.',
  'profiles.saved': 'Profil “{name}” disimpan.',
  'profiles.namePlaceholder': 'Nama profil (contohnya Malam)',
  'profiles.saveLabel': 'Simpan ambang semasa sebagai profil',
  'profiles.saveBtn': 'Simpan profil',
  'profiles.needName': 'Masukkan nama profil.',
  'profiles.limit': {
    other: 'Anda boleh menyimpan paling banyak {n} profil. Padam satu untuk menambah yang baharu.'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku też — ale musi
     zostać bezpieczna dla systemu plików: bez ukośników i dwukropków. */

  'csv.header': 'masa;kecerahan_B_pct;bahagian_biru_pct;kecerahan_pemandangan_pct;zon',
  'csv.filename': 'pemantauan-cahaya-{stamp}.csv',
  'csv.empty': 'Tiada bacaan untuk dieksport. Mulakan pengukuran dan cuba lagi.',
  'csv.done': 'Mengeksport {readings} ke fail CSV.',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut. Malajski ma jedną formę, ale zdanie i tak
     zostaje w całości: w innych językach przypadek minut wypada inaczej,
     a wzorzec ma pokazywać tłumaczowi całe zdanie, nie jego okrawek. */

  'alert.exposure': {
    other: 'Amaran ambang: bacaan sudah berada dalam zon memudaratkan selama {n} minit. Pertimbangkan untuk berehat, atau kurangkan bahagian biru pada skrin.'
  },

  'session.title': 'Ringkasan sesi terakhir',
  'session.line': 'Masa pengukuran: {duration}. Bacaan yang disimpan: {count}.',
  'session.zoneLine': '{zone}: {percent}% daripada masa sesi.',
  'session.endedAt': 'Ringkasan ini merangkumi sesi yang berakhir pada {time}.',
  'session.toast': 'Sesi selesai: {duration}, {readings}, {percent}% daripada masa dalam zon memudaratkan.',

  'duration.seconds': '{n} s',
  'duration.minutesSeconds': '{minutes} min {seconds} s',

  /* ---- liczebniki ----
     Malajski nie odmienia rzeczownika przez liczbę: CLDR daje mu jedną
     kategorię, 'other'. Formę wybiera Intl.PluralRules('ms'), nie nasza reguła
     — w innych językach kategorii jest więcej (polski cztery, arabski sześć),
     i właśnie dlatego pisze się formy, a nie regułę odmiany. */

  'count.readings': { other: '{n} bacaan' },
  'count.points': {
    other: '{n} mata peratusan'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': 'Lagi',
  'more.section.settings': 'TETAPAN',
  'more.section.help': 'BANTUAN',
  'more.thresholds.title': 'Ambang amaran',
  'more.thresholds.sub': 'Tetapkan sempadan zon selamat, sederhana dan memudaratkan.',
  'more.docs.title': 'Dokumentasi',
  'more.docs.sub': 'Cara pengukuran berfungsi, unit, piawaian dan zon.',
  'more.about.title': 'Tentang dan hubungi',
  'more.about.sub': 'Versi, privasi dan cara menghubungi.',
  'more.free': 'Aplikasi ini percuma sepenuhnya.',
  'more.supportLink': 'Anda dialu-alukan untuk menyokongnya secara sukarela.',
  'more.version': 'Versi {version} · Semua ciri tersedia tanpa akaun dan tanpa bayaran',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': 'Tentang dan hubungi',
  'about.version': 'Versi {version}',
  'about.what.title': 'Apa itu aplikasi ini',
  'about.what.p1': '{app} mengukur dengan kamera telefon berapa banyak cahaya biru yang direkodkan oleh penderia, dan menunjukkannya pada dua tolok serta pada carta dengan zon. Semua ciri — pengukuran, sejarah, laporan, profil ambang, amaran ambang, eksport CSV dan Dokumentasi — tersedia untuk semua orang, tanpa akaun dan tanpa bayaran.',
  'about.what.p2': 'Aplikasi ini disediakan “seadanya”, untuk kegunaan maklumat. Hasil pengukuran bersifat anggaran dan bukan asas untuk membuat keputusan kesihatan.',
  'about.privacy.title': 'Privasi dan data',
  'about.privacy.p1': 'Imej daripada kamera dianalisis semata-mata pada peranti anda dan tidak pernah dihantar ke mana-mana pelayan. Kami tidak mencipta akaun dan tidak mengumpul data anda. Tetapan ambang, profil dan sejarah pengukuran disimpan hanya dalam storan peranti ini dan pelayar ini.',
  'about.privacy.p2': 'Aplikasi ini tidak memaparkan iklan dan tidak bercakap dengan rangkaian. Satu-satunya pengecualian ialah butang pada skrin “Sokongan”: apabila anda menekannya, pelayar akan membuka halaman luar dalam tab baharu. Tiada apa-apa berlaku sehingga anda sendiri melakukannya.',
  'about.contact.title': 'Hubungi kami',
  'about.contact.p1': 'Komen, pepijat dan cadangan: [E-MAIL]. Kami membalas bila-bila masa yang termampu — projek ini diselenggara di luar waktu kerja.',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': 'Sokongan',
  'support.free.title': 'Semuanya tersedia',
  'support.free.text': 'Keseluruhan aplikasi ini percuma: pengukuran, sejarah dan laporan, profil ambang, amaran, eksport CSV dan Dokumentasi. Semuanya berfungsi serta-merta, tanpa akaun, tanpa had dan tanpa internet.',
  'support.why': '{app} dibina di luar waktu kerja. Jika ia berguna kepada anda, anda boleh belanja saya kopi. Itu membantu mengekalkan aplikasi ini dan mengembangkannya lebih jauh — memperbaiki pengukuran, menambah Dokumentasi dan mengujinya pada lebih banyak telefon.',
  'support.nothing': 'Derma tidak membuka apa-apa. Tiada versi yang lebih baik mahupun yang lebih buruk — selepas anda menyokong, aplikasi berfungsi dengan cara yang sama sekali sama. Satu-satunya perbezaan ialah penulisnya tahu ia berguna kepada seseorang.',
  'support.button': 'Belanja saya kopi',
  'support.button.aria': 'Belanja saya kopi — membuka profil derma dalam tab baharu',
  'support.pending': 'Profil derma belum disambungkan. Sebaik sahaja ia ada, sebuah butang akan berdiri di tempat ini. Sehingga itu tiada apa-apa yang perlu dilakukan — aplikasi ini percuma sepenuhnya juga.',
  'support.privacy': 'Butang ini membuka halaman luar (contohnya Buy Me a Coffee) dalam tab pelayar yang baharu. Itulah satu-satunya saat apabila ada sesuatu meninggalkan peranti ini. Imej daripada kamera dan semua pengukuran anda kekal di sini — ia tidak dihantar ke mana-mana, baik sebelum anda menekannya mahupun selepasnya.',
  'support.privacyPending': 'Sebaik sahaja alamatnya tersedia, menekan butang ini akan membuka halaman luar (contohnya Buy Me a Coffee) dalam tab pelayar yang baharu. Itulah nanti satu-satunya saat apabila ada sesuatu meninggalkan peranti ini. Imej daripada kamera dan semua pengukuran anda kekal di sini — ia tidak dihantar ke mana-mana.',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': 'Dokumentasi',

  'disclaimer.title': 'Ini bukan peranti perubatan',
  'disclaimer.body.docs': 'Aplikasi ini bukan peranti perubatan. Ia tidak bertujuan untuk mendiagnosis, merawat mahupun mencegah sebarang penyakit. Hasil pengukuran dengan kamera telefon bersifat anggaran dan tidak menggantikan pemeriksaan mahupun nasihat doktor. Dalam hal kesihatan mata, rujuklah doktor atau optometris. Ambang zon dalam aplikasi ini tidak mencerminkan sebarang piawaian keselamatan — perinciannya dalam bab 3.',
  'disclaimer.body.about': 'Aplikasi ini bukan peranti perubatan. Ia tidak bertujuan untuk mendiagnosis, merawat mahupun mencegah sebarang penyakit. Hasil pengukuran dengan kamera telefon bersifat anggaran dan tidak menggantikan pemeriksaan mahupun nasihat doktor. Dalam hal kesihatan mata, rujuklah doktor atau optometris. Ambang zon dalam aplikasi ini tidak mencerminkan sebarang piawaian keselamatan — perinciannya dalam Dokumentasi, bab 3.',

  'doc.toc.aria': 'Kandungan dokumentasi',
  'doc.toc.title': 'Kandungan',

  'doc.ch1.title': 'Mula pantas',
  'doc.ch2.title': 'Cara pengukuran berfungsi',
  'doc.ch3.title': 'Unit dan piawaian',
  'doc.ch4.title': 'Zon dan ambang',
  'doc.ch5.title': 'Perbezaan antara peranti',

  'doc.ch1.heading': '1. Mula pantas',
  'doc.ch2.heading': '2. Cara pengukuran berfungsi',
  'doc.ch3.heading': '3. Unit dan piawaian',
  'doc.ch4.heading': '4. Zon dan ambang',
  'doc.ch5.heading': '5. Perbezaan antara peranti',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': 'Cara mengukur dengan lebih tepat',
  'doc.ch1.tips.li1': 'Pada skrin “Kamera” (butang pertama pada bar bawah) tekan “Start” dan halakan kamera belakang ke skrin atau sumber cahaya yang ingin anda periksa.',
  'doc.ch1.tips.li2': 'Pergi ke skrin “Pemantauan” (butang kedua pada bar bawah) — di bahagian atas anda melihat kedua-dua tolok sekali gus, dan di bawahnya (tatal) carta perubahan dari semasa ke semasa. Pengukuran terus berjalan di latar belakang, skrin mana pun yang sedang anda lihat.',
  'doc.ch1.tips.li3': 'Pegang telefon pada jarak yang tetap dari skrin (contohnya 15–20 cm), tanpa mengubah pencahayaan sekeliling semasa mengukur.',
  'doc.ch1.tips.li4': 'Gunakan kamera belakang — pembetulan automatiknya tidak seagresif kamera hadapan.',
  'doc.ch1.tips.li5': 'Anggaplah hasilnya sebagai penunjuk relatif (%), bukan unit fizikal mutlak — bandingkan satu dengan yang lain (contohnya mod malam dihidupkan dan dimatikan).',
  'doc.ch1.tips.li6': 'Laraskan ambang zon dalam tetapan mengikut kecerahan skrin anda sendiri (bab 4).',

  'doc.ch1.fonts.title': 'Tulisan besar dan tolok — sentiasa',
  'doc.ch1.fonts.p1': 'Keseluruhan aplikasi menggunakan tulisan yang besar dan mudah dibaca serta tolok bersaiz penuh, supaya orang yang kurang penglihatan (dan semua orang lain) dapat membaca datanya tanpa tetapan tambahan. Pada skrin “Pemantauan” kedua-dua tolok muat bersama dalam satu skrin, tanpa perlu menatal — carta perubahan dari semasa ke semasa berada tepat di bawahnya, satu tatalan lagi.',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': 'Kamera telefon berbanding spektrometer',
  'doc.ch2.spectro.p1.html': 'Pengukuran yang sebenar tentang “berapa banyak cahaya biru yang memudaratkan” menuntut cahaya dileraikan kepada panjang gelombang — itulah yang dilakukan oleh <b>spektrometer</b>: prisma atau parutan pembelauan memecahkan cahaya kepada berpuluh-puluh hingga beratus-ratus jalur sempit (contohnya setiap 1–5 nm) dan mengukur kuasa optik pada setiap satu secara berasingan. Hanya daripada taburan spektrum yang selengkap itu barulah unit seperti lux, lumen atau sinaran berpemberat fungsi bahaya cahaya biru boleh dikira.',
  'doc.ch2.spectro.p2.html': '<b>Kamera telefon tidak melakukan satu pun daripada itu.</b> Ia mempunyai tiga penapis yang lebar (Bayer: R/G/B), yang setiap satunya mengumpul cahaya daripada julat panjang gelombang yang lebar dan bertindih — “saluran biru” bukanlah jalur sempit sekitar 435–440 nm (puncak bahaya kepada retina), tetapi lebih kurang 400–570 nm yang bercampur dengan hijau. Sepanjang jalan masih ada penyahmozek, pendedahan automatik, imbangan putih automatik dan mampatan gama sRGB — tiada satu pun langkah itu yang dibenarkan pelayar untuk dimatikan sepenuhnya. Akibatnya, nilai piksel yang dilihat oleh JavaScript tidak berkait secara linear dengan kuasa optik sebenar yang jatuh pada penderia. Itu had perkakasan yang asasi, bukan kesilapan aplikasi ini.',

  'doc.ch2.raw.title': 'Carta 1 — Kecerahan saluran B',
  'doc.ch2.raw.what.html': '<b>Apa yang ditunjukkan:</b> kecerahan purata saluran biru (B) sahaja daripada bahagian imej yang disampel, pada skala 0–255 yang ditukar kepada %.',
  'doc.ch2.raw.algo.html': '<b>Algoritmanya:</b>',
  'doc.ch2.raw.step1': 'Kami mengambil satu bingkai daripada kamera 5 kali sesaat.',
  'doc.ch2.raw.step2': 'Kami memotong 60% bahagian tengah bingkai (ini mengelakkan tepi imej dan silau dari sisi).',
  'doc.ch2.raw.step3': 'Kami mengecilkan bahagian yang dipotong itu kepada grid 32×32 piksel (cukup tepat, dan jauh lebih pantas daripada mengira pada resolusi penuh — hal itu penting pada perkakasan yang lebih lemah, seperti telefon Xiaomi atau Ulefone kelas murah).',
  'doc.ch2.raw.step4': 'Kami mengambil purata nilai B bagi kesemua 1024 piksel grid itu.',
  'doc.ch2.raw.step5.html': '<code>hasil = purata_B ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>Mengapa kami mengekalkannya:</b> inilah bacaan yang paling mudah dan paling langsung tentang “berapa banyak isyarat biru yang langsung ditangkap oleh penderia”. Kelemahannya, ia mencampurkan kecerahan dengan warna — pemandangan yang sangat terang tetapi putih neutral juga akan memberi hasil yang tinggi, walaupun ia tidak istimewa “biru”. Sebab itulah di sebelahnya kami menunjukkan carta 2.',

  'doc.ch2.share.title': 'Carta 2 — Bahagian biru dalam cahaya',
  'doc.ch2.share.what.html': '<b>Apa yang ditunjukkan:</b> berapa peratus daripada keseluruhan cahaya yang dirakam (R+G+B) merupakan komponen biru — iaitu peralihan warna ke arah sejuk, tidak kira betapa terangnya pemandangan itu.',
  'doc.ch2.share.algo.html': '<b>Algoritmanya:</b> langkah 1–4 yang sama seperti di atas, tetapi bukannya B sahaja kami mengira:',
  'doc.ch2.share.formula.html': '<code>hasil = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': 'Putih neutral (R≈G≈B) memberi kira-kira <b>33%</b>. Cahaya yang lebih hangat atau lebih merah — kurang daripada itu. Cahaya yang sangat biru — lebih, sehingga had ~100% bagi cahaya yang hampir biru tulen.',
  'doc.ch2.share.why.html': '<b>Mengapa ini ukuran “biru yang memudaratkan” yang lebih tepat:</b> ini asas yang sama dengan cara penapis seperti mod malam atau Night Shift berfungsi — yang menentukan ialah <b>warna</b>, bukan kecerahan. Skrin yang sangat terang tetapi neutral tidak akan tersilap ditanda sebagai memudaratkan; skrin yang malap tetapi sangat biru — memang ya. Sebab itulah besaran inilah yang menentukan warna zon dalam jadual bacaan.',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': 'Mengapa bukan lux atau lumen',
  'doc.ch3.units.p1.html': '<b>Lumen (lm)</b> menggambarkan jumlah fluks cahaya yang dipancarkan oleh sesuatu sumber — itu sifat sumber itu sendiri, bukan sifat cahaya yang jatuh pada sesuatu titik. <b>Lux (lx)</b> pula sudah merupakan keamatan pencahayaan pada satu titik (lm/m²) — lebih dekat dengan apa yang kita maksudkan, tetapi masih unit <b>fotometrik</b>: ia memberatkan spektrum dengan lengkung kepekaan mata manusia terhadap kecerahan (V(λ)), bukan dengan lengkung bahaya cahaya biru. Untuk pengukuran bahaya yang sebenar diperlukan unit ketiga yang lebih sempit: sinaran berpemberat spektrum dalam <b>W/m²</b> (piawaian IEC 62471, puncak kepekaan sekitar 435–440 nm), dan itu menuntut spektrometer — lihat bahagian di atas.',
  'doc.ch3.units.p2.html': 'Walaupun kita berpada dengan lux sekalipun: telefon tanpa penderia cahaya luaran yang ditentukur tidak mampu menentukannya dengan boleh dipercayai. Penderia cahaya terbina dalam telefon (pada peranti yang memilikinya) lagipun mengukur cahaya dari <b>sisi yang bertentangan</b> dengan sisi badan yang anda halakan ke skrin dengan kamera belakang — jadi ia akan mengukur cahaya di belakang anda, bukan cahaya daripada skrin. Sebab itu, daripada meneka satu nombor dalam unit yang tetap tidak boleh dipercayai, kami menunjukkan <b>penunjuk relatif (%)</b> yang dinamakan dengan jujur — bermakna untuk perbandingan pada telefon yang sama dalam keadaan yang sama (contohnya mod malam dihidupkan dan dimatikan), bukan sebagai nilai mutlak.',

  'doc.ch3.norms.title': 'Adakah wujud piawaian global untuk ambang keselamatan?',
  'doc.ch3.norms.p1.html': 'Ringkasnya: <b>tiada piawaian yang dinyatakan dalam peratus saluran kamera</b> — itu sama sekali bukan unit yang digunakan untuk mengawal selia apa-apa pun. Piawaian sebenar tentang cahaya biru memang wujud, tetapi ia mengukur besaran lain, dalam unit lain, dan menyentuh gejala yang berbeza daripada yang biasanya kita maksudkan apabila berkata “cahaya biru memenatkan mata”.',
  'doc.ch3.norms.p2.html': '<b>Kerosakan fotokimia akut pada retina — IEC 62471 / ICNIRP.</b> Satu-satunya “bahaya cahaya biru” yang benar-benar dikawal selia — piawaian untuk lampu dan sistem pencahayaan, disokong oleh garis panduan ICNIRP (International Commission on Non-Ionizing Radiation Protection). Ia mengelaskan sumber cahaya kepada kumpulan risiko RG0–RG3 berdasarkan sinaran cahaya yang diberatkan dengan fungsi bahaya B(λ), dalam <b>W·m⁻²·sr⁻¹</b>, dengan had masa pendedahan (<code>t_max = 100 / L_B</code> saat). Skrin telefon dan monitor — walaupun pada kecerahan maksimum — pada praktiknya hampir sentiasa tergolong dalam <b>RG0 (dikecualikan, tanpa sekatan)</b>. Piawaian itu menyentuh sumber yang jauh lebih kuat (arka kimpalan, sesetengah projektor, LED perindustrian), bukan skrin pengguna.',
  'doc.ch3.norms.p3.html': '<b>Kesan pada rentak sirkadian dan tidur — CIE S 026.</b> Inilah gejala yang biasanya dimaksudkan (skrin pada waktu malam “menyegarkan”) — tetapi ini bukan kerosakan mata, sebaliknya kesan pada jam biologi badan melalui sel ganglion retina (ipRGC), yang paling peka sekitar 480 nm. Piawaian CIE S 026:2018 mentakrifkan unit <b>lux melanopik (melanopic EDI)</b>. Yang paling hampir dengan konsensus saintifik “rasmi” ialah penerbitan Brown dan rakan-rakannya (<i>PLOS Biology</i>, 2022), yang mengesyorkan sebagai panduan kasar: pada waktu malam &lt; 10 lux melanopik, pada waktu siang &gt; 250. Itu saranan penyelidik tidur, bukan peruntukan undang-undang.',
  'doc.ch3.norms.p4.html': '<b>WHO.</b> Pertubuhan Kesihatan Sedunia tidak menerbitkan had pendedahan cahaya biru yang tersendiri dan bebas — untuk keselamatan sinaran optik ia merujuk kepada ICNIRP (di atas). Satu-satunya dokumen WHO yang konkrit dan ditulisnya sendiri tentang skrin ialah <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i> (2019) — tetapi dokumen itu menyentuh <b>masa</b> yang dihabiskan di depan skrin, bukan warna atau keamatan cahayanya: tiada skrin bagi anak di bawah umur 1 tahun, paling lama 1 jam bagi umur 2–4 tahun. Bagi orang dewasa WHO tidak mempunyai garis panduan berangka yang sama terperincinya.',
  'doc.ch3.norms.p5.html': '<b>Mengapa semua itu tetap tidak membantu menentukur aplikasi:</b> kedua-dua kelompok piawaian (IEC/ICNIRP dan CIE) menuntut taburan spektrum yang lengkap dan sinaran cahaya yang ditentukur dalam geometri pengukuran yang diketahui — tepat apa yang tidak dapat disediakan oleh telefon melalui pelayar (lihat bahagian “Kamera telefon berbanding spektrometer” di atas). Tiada penukaran “33% bahagian biru = X lux melanopik”, jadi ambang dalam aplikasi ini <b>tidak mencerminkan sebarang piawaian keselamatan</b> (WHO, IEC, ICNIRP mahupun CIE — bagi penunjuk ini piawaian sebegitu memang tidak wujud). Sebaliknya, nilai lalai ambang bahagian biru diterbitkan daripada suhu warna cahaya yang sebenar dan daripada saranan praktikal yang luas diulang tentang cahaya hangat pada waktu malam — asas yang lebih kukuh daripada sekadar pembundaran, tetapi tetap bukan piawaian formal (penerbitannya selengkapnya: bab 4). Anda sentiasa boleh menukarnya kepada nilai anda sendiri dalam tetapan.',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': 'Zon warna dan dari mana ambangnya datang',
  'doc.ch4.zones.p1.html': 'Kedua-dua besaran mempunyai ambangnya sendiri yang ditetapkan secara berasingan (skrin “Pemantauan” → “Tetapan ambang zon”, di bahagian bawah halaman) — 33%/66% pada yang satu tidak bermakna sama dengan pada yang satu lagi (lihat bab 2 di atas). <b>Bahagian biru</b>-lah yang menentukan warna pada legenda di bawah carta dan dalam jadual bacaan:',
  'doc.ch4.zones.li1.html': '<b>Hijau — selamat:</b> cahaya hangat atau neutral, mata berehat.',
  'doc.ch4.zones.li2.html': '<b>Kuning — sederhana:</b> peralihan ke arah biru yang sudah ketara, eloklah berehat sekali-sekala.',
  'doc.ch4.zones.li3.html': '<b>Merah — memudaratkan:</b> cahaya yang sangat biru, jelas memenatkan mata pada pendedahan yang lebih lama (terutamanya pada waktu malam).',
  'doc.ch4.zones.p2.html': '<b>Dari mana angka-angka ini datang.</b> <b>Kecerahan saluran B</b> tidak mempunyai titik rujukan semula jadi — nilai ambang yang munasabah bergantung sepenuhnya pada betapa terangnya pemandangan yang anda rakam (ini ukuran kecerahan, bukan warna). Nilai lalai 33%/66% di sini masih titik permulaan yang bersifat kesepakatan — laraskannya secara cuba jaya mengikut kecerahan biasa skrin dan persekitaran anda sendiri.',
  'doc.ch4.zones.p3.html': '<b>Bahagian biru</b> mempunyai ambang lalai yang diterbitkan daripada suhu warna cahaya yang sebenar (fizik, bukan pembundaran), bukan daripada sebarang piawaian keselamatan — piawaian sebegitu bagi besaran ini tidak wujud (bab 3). Titik rujukannya:',
  'doc.ch4.zones.li4.html': '<b>~4000K</b> („putih hangat”, mentol LED yang biasa) → kira-kira <b>26%</b> bahagian biru. Cahaya yang lebih hangat daripada itu (suhu warna yang lebih rendah) ialah julat yang luas disyorkan untuk waktu malam oleh alat seperti f.lux atau Night Shift — dari situlah ambang bawahnya.',
  'doc.ch4.zones.li5.html': '<b>6500K (D65)</b>, titik putih piawai bagi kebanyakan skrin telefon dan monitor dari kilang — kira-kira <b>33%</b>. Dari nilai itu ke atas bermulalah julat yang biasanya dikenakan saranan menghadkan cahaya biru — dari situlah ambang atasnya.',
  'doc.ch4.zones.p4.html': '<b>Peringatan penting:</b> betapa “birunya” sesuatu cahaya tidak bergantung pada waktu dalam sehari, tetapi saranan menghadkan cahaya biru sebenarnya hanya menyentuh <b>waktu petang dan malam</b> — pada waktu siang pendedahan kepada cahaya yang sejuk dan biru (termasuk cahaya matahari) adalah perkara biasa, malah baik untuk rentak sirkadian. Zon merah di tengah hari sambil memandang skrin biasa yang tidak diubah tidak bermakna ada bahaya yang sebenar — cahaya yang sama pada waktu malam barulah patut dihadkan.',
  'doc.ch4.zones.p5.html': 'Ambang kedua-dua besaran adalah bebas sepenuhnya antara satu sama lain — mengubah yang satu tidak menjejaskan yang satu lagi. Ambang yang diubah <b>diingat pada peranti ini dan dalam pelayar ini</b> antara satu pembukaan aplikasi dengan yang berikutnya (secara setempat, tiada apa-apa dihantar ke mana-mana) — butang “Start” tidak mengembalikannya kepada nilai lalai.',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': 'Mengapa pratonton kelihatan berbeza pada peranti yang berbeza',
  'doc.ch5.devices.p1.html': '<b>Pelayar berbanding aplikasi kamera asli.</b> Apabila anda membuka aplikasi kamera yang dipasang dari kilang pada telefon, pengeluarnya (contohnya Xiaomi) menambah algoritma miliknya sendiri yang tertutup pada pratonton langsung — HDR masa nyata, penguatan kecerahan secara digital dalam cahaya lemah, pelicinan. Sebuah halaman web menerima aliran imej yang jauh lebih “mentah” daripada kamera melalui pelayar (fungsi <code>getUserMedia</code>), tanpa satu pun penambahbaikan itu — jadi pada dasarnya ia akan kelihatan lebih rata dan lebih gelap daripada kamera asli, apa pun telefonnya.',
  'doc.ch5.devices.p2.html': '<b>Keupayaan mengawal kamera yang berbeza-beza.</b> Berapa banyak kawalan ke atas pendedahan dan imbangan putih yang langsung diberikan oleh sistem kepada pelayar bergantung pada telefonnya, pada pemacu kameranya dan pada versi Chrome/WebView — sesetengah peranti (biasanya komputer dengan kamera USB) hanya melaporkan automasi penuh, sesetengah yang lain (sebahagian telefon Android) melaporkan mod tambahan yang lebih maju. Versi aplikasi ini yang terdahulu cuba beralih kepada mod pendedahan manual di tempat yang telefonnya membenarkannya, tanpa menetapkan nilai tertentu — yang pada sebahagian telefon membekukan imej pada pendedahan gelap yang rawak dari saat kamera dihidupkan. Itu pepijat dalam kod (sudah diperbaiki), bukan perbezaan unit — tetapi ia menunjukkan dengan baik betapa mudahnya kelakuan berbeza antara peranti, sedangkan baris kod yang sama pun hanya berkuat kuasa pada sebahagian daripadanya.',
  'doc.ch5.devices.p3.html': '<b>Penderia dan pemprosesan imej (ISP) yang berbeza.</b> Walaupun dengan kod yang serupa dan pemandangan yang sama, model telefon yang berbeza mempunyai penderia dengan mutu yang berbeza dan automasi pengeluar yang ditala secara berbeza — yang satu akan memilih pendedahan dalam cahaya lemah lebih pantas dan lebih tepat daripada yang lain. Hal itu, digabungkan dengan hakikat bahawa penunjuk dalam aplikasi ini bersifat <b>relatif</b> (lihat bab 3), bermakna: bandingkan hasil (dan rupa pratonton) pada telefon yang sama dari semasa ke semasa, bukan antara model atau peranti yang berbeza.'
});
