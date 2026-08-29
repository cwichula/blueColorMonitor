/* docs/v2/i18n/ms.js — słownik WERSJI 2, malajski (Bahasa Melayu).
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/ms.js. Kolejność
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
 * TREŚĆ wzięta z pl.js, TERMINOLOGIA — z docs/shared/i18n/ms.js, bo to ona
 * jedzie w tej samej aplikacji i ta sama wielkość nie może nazywać się na
 * kafelku inaczej niż w opisie. Siedem nazw trzymanych bez wyjątku: bahagian
 * biru, kecerahan pemandangan, suhu warna, kesan sirkadian, kelipan,
 * kesekataan, keselesaan mata. Strefy: dalam julat / amaran / kritikal.
 *
 * REJESTR: malajszczyzna standardowa (Malezja), zwrot przez „anda” pisane małą
 * literą. Słownictwo malezyjskie, nie indonezyjskie: peranti, pelayar, skrin,
 * tetapan, butang, fail, muat semula, lalai, baharu, saiz. Ton jak w oryginale:
 * rzeczowy, bez marketingu i bez straszenia.
 *
 * SŁOWA, KTÓRE MUSIAŁY SIĘ ROZEJŚĆ: „bacaan” to pojedynczy odczyt — tak mówi
 * warstwa wspólna w 'count.readings' — więc na wielkość, czyli polską
 * „metrykę” i „wskaźnik”, idzie „besaran”, tak jak w v5. Strefa ostrzegawcza
 * to „amaran”, a alert ekspozycji „penggera”: gdyby oba były „amaran”,
 * komunikat alertu mówiłby o sobie tym samym słowem co o strefie, którą
 * pilnuje. „Start” i „Stop” zostają nietłumaczone tak samo jak w pl.js —
 * i dlatego, że warstwa wspólna w 'engine.idle' odsyła wprost do przycisku
 * „Start”.
 *
 * ZASTRZEŻENIA MEDYCZNE i akapity o prywatności przełożone co do treści, bez
 * osłabiania i bez dodawania obietnic — to zdania o skutkach prawnych.
 *
 * LICZEBNIKI: malajski nie odmienia rzeczownika przez liczbę — CLDR daje mu
 * jedną kategorię, 'other', i tylko ona ma tu prawo wystąpić.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (te same co w pl.js i z tego samego powodu):
 *   'zone.warning'        — wspólne mówi „Awas”, ta wersja mówi „Amaran”
 *                           i tym samym słowem podsumowuje;
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
window.I18nData['ms'] = Object.assign(window.I18nData['ms'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Monitor Cahaya — mengukur cahaya biru',
  'app.description': 'Monitor Cahaya — mengukur bahagian cahaya biru dengan kamera telefon. Tujuh besaran, carta, sejarah. Semuanya tersedia, tanpa akaun dan tanpa bayaran.',
  'app.skipToContent': 'Langkau ke kandungan',
  'app.measuring': 'Mengukur',
  'app.docsButton': 'Dokumentasi dan penjelasan',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — versi 2',

  'nav.aria': 'Navigasi utama',
  'nav.tablistAria': 'Skrin aplikasi',
  'nav.measure': 'Ukur',
  'nav.history': 'Sejarah',
  'nav.tools': 'Alat',
  'nav.support': 'Sokongan',
  'nav.more': 'Lagi',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Dokumentasi',
  'panel.thresholds': 'Ambang dan profil',
  'panel.reports': 'Laporan',
  'panel.export': 'Eksport data',
  'panel.compare': 'Perbandingan A/B',
  'panel.calibration': 'Penentukuran kertas putih',
  'panel.screenCheck': 'Periksa monitor saya',
  'panel.schedule': 'Jadual',
  'panel.alerts': 'Penggera pendedahan',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Kembali',
  'action.close': 'Tutup',
  'action.refresh': 'Segarkan',
  'action.apply': 'Guna',
  'action.delete': 'Padam',
  'action.hide': 'Sembunyikan',
  'action.start': 'Start',
  'action.stop': 'Stop',
  'action.switch': 'Tukar',
  'action.switchAria': 'Tukar kamera: depan atau belakang',
  'action.resetDefaults': 'Pulihkan lalai',
  'action.reports': 'Laporan',
  'action.exportCsv': 'Eksport CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Skrin: {name}',
  'a11y.measureStarted': 'Pengukuran bermula.',
  'a11y.measureStopped': 'Pengukuran dihentikan.',
  'a11y.measureStoppedSummary': 'Pengukuran dihentikan. Masa: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'Profil ambang telah digunakan.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Pengesahan',
  'dialog.confirm': 'Sahkan',
  'dialog.cancel': 'Batal',
  'dialog.infoTitle': 'Maklumat',
  'dialog.ok': 'Faham',

  'help.sheetTitle': 'Perihal besaran ini',
  'help.unit': 'Unit',
  'help.scaleRange': 'Julat skala',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'Amaran',
  'threshold.crit': 'Kritikal',
  'threshold.warnLabel': 'Ambang amaran',
  'threshold.critLabel': 'Ambang kritikal',
  'threshold.warnAria': '{name} — ambang: amaran',
  'threshold.critAria': '{name} — ambang: kritikal',

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
  'firstRun.text': 'Tekan “Start”, halakan telefon ke permukaan yang bercahaya dan pegang tanpa bergerak selama beberapa saat. Bingkai pada pratonton menunjukkan bahagian yang benar-benar dibaca oleh aplikasi.',
  'firstRun.close': 'Tutup petua',

  'camera.live': 'LANGSUNG',
  'camera.idle': 'Kamera dimatikan. Tekan “Start”, halakan telefon ke permukaan yang bercahaya dan pegang tanpa bergerak selama beberapa saat.',
  'camera.stopped': 'Pengukuran dihentikan. Tekan “Start” untuk mengukur sekali lagi.',

  'error.cameraStart': 'Kamera tidak dapat dihidupkan.',
  'error.engineMissing': 'Modul pengukuran tidak dimuatkan.',

  'metrics.sevenTitle': 'Tujuh besaran',
  'measure.tilesSub': 'Disegarkan 5 kali sesaat',

  'session.title': 'Sesi ini',
  'session.duration': 'Masa pengukuran',
  'session.samples': 'Bilangan sampel',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     Malajski ma jedną formę, więc „Amaran” stoi tu i pod suwakiem tak samo. */
  'zone.count.good': 'Dalam julat',
  'zone.count.warning': 'Amaran',
  'zone.count.critical': 'Kritikal',

  'note.calibrated': 'Pengukuran ditentukur dengan kertas putih — saluran telah diseimbangkan.',

  'tile.helpAria': 'Apa maksudnya: {name}',
  'tile.noMeasurement': 'Tiada pengukuran',
  'tile.outOfScale': 'Di luar skala',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Amaran',
  'zone.spoken.warning': 'amaran',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Dari semasa ke semasa',
  'history.pickHint': 'Pilih besaran dan julat',
  'history.metricLabel': 'Besaran',
  'history.rangeAria': 'Julat masa carta',
  'history.emptyTitle': 'Tiada data dalam julat ini',
  'history.emptyText': 'Mulakan pengukuran pada skrin Ukur — carta akan terisi dalam beberapa saat.',
  'history.tableTitle': 'Bacaan terkini',
  'history.tableHide': 'Sembunyikan jadual',
  'history.tableShow': 'Tunjukkan jadual',
  'history.tableCaption': 'Bacaan pengukuran terkini, yang terbaharu di atas.',
  'history.tableEmpty': 'Tiada bacaan. Mulakan pengukuran pada skrin Ukur.',

  'table.time': 'Masa',
  'table.metric': 'Besaran',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     dłuższy zapis łamał się na dwie linie. */
  'range.1m': '1 min',
  'range.1h': '1 jam',
  'range.24h': '24 jam',
  'range.7d': '7 hari',
  'range.30d': '30 hari',

  'chart.now': 'sekarang',
  'chart.countSub': {
    other: '{n} bacaan dalam julat yang dipilih'
  },
  'chart.aria': '{name}, julat {range}, {count}, nilai terakhir {value} {unit}.',
  'chart.ariaZone': '{name}, julat {range}, {count}, nilai terakhir {value} {unit}, zon: {zone}.',
  'chart.ariaEmpty': '{name} — tiada data dalam julat {range}.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Bestari dan fungsi pembantu',
  'tools.note': 'Alat membantu anda mentafsir pengukuran. Semuanya tersedia serta-merta, dan pengukuran itu sendiri berfungsi tanpa bergantung padanya.',

  'tool.thresholds.sub': 'Bila sesuatu nilai patut menyalakan amaran',
  'tool.compare.sub': 'Yang mana antara dua cahaya lebih lembut',
  'tool.calibration.sub': 'Satu-satunya fungsi yang benar-benar menaikkan ketepatan',
  'tool.screenCheck.sub': 'Lima langkah dan satu kesimpulan siap tentang skrin',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Jadual ambang”
     kontra „Jadual”. Tak było i tak zostaje. */
  'tool.schedule.title': 'Jadual ambang',
  'tool.schedule.sub': 'Ambang berlainan pada waktu malam, tanpa perlu diingat',
  'tool.alerts.sub': 'Isyarat apabila zon kritikal berlarutan terlalu lama',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Tetapan',
  'more.thresholdsSub': 'Bila sesuatu nilai patut menyalakan amaran',
  'more.docsSub': 'Cara mengukur dan apa yang tidak diberitahu oleh pengukuran ini',
  'more.appearanceTitle': 'Penampilan dan kebolehcapaian',

  'settings.theme': 'Tema',
  'theme.auto': 'Ikut sistem',
  'theme.light': 'Terang',
  'theme.dark': 'Gelap',

  'settings.textScale': 'Saiz teks',
  'textScale.100': 'Standard',
  'textScale.115': 'Lebih besar (115%)',
  'textScale.130': 'Paling besar (130%)',

  'settings.contrast': 'Kontras lebih tinggi',
  'settings.contrastSub': 'Sempadan lebih tebal dan teks sampingan lebih gelap.',
  'settings.sound': 'Bunyi penggera',
  'settings.soundSub': 'Isyarat ringkas apabila penggera pendedahan berbunyi.',
  'settings.vibrate': 'Getaran semasa penggera',
  'settings.vibrateSub': 'Berfungsi hanya pada peranti yang menyokongnya.',

  'more.dataTitle': 'Data',
  'more.clearHistory': 'Kosongkan sejarah pengukuran',
  'more.clearHistorySub': 'Memadamkan bacaan tersimpan daripada peranti ini. Ambang, profil dan tetapan kekal.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'Aplikasi ini percuma sepenuhnya. ',
  'more.supportLink': 'Anda boleh menyokongnya secara sukarela.',

  'dialog.clearHistory.title': 'Padam sejarah yang tersimpan?',
  'dialog.clearHistory.body': {
    other: 'Kami akan memadamkan {n} titik pengukuran yang tersimpan daripada peranti ini. Tindakan ini tidak boleh dibatalkan. Ambang, profil dan tetapan kekal tidak tersentuh.'
  },
  'dialog.clearHistory.confirm': 'Padam sejarah',
  'dialog.clearHistory.cancel': 'Biarkan',

  'toast.historyCleared': 'Sejarah pengukuran telah dipadamkan.',
  'toast.screenUnavailable': 'Skrin itu belum tersedia dalam versi ini.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'Apa yang diukur oleh aplikasi ini',
  'docs.leadText': 'Kamera telefon memandang permukaan yang bercahaya, dan lima kali sesaat aplikasi mengira purata saluran R, G dan B daripada bahagian tengah bingkai. Daripada tiga nombor itu ia menerbitkan tujuh besaran.',
  'docs.limitsTitle': 'Had kaedah ini',
  'docs.limitsText': 'Kamera mempunyai tiga saluran warna yang lebar, pendedahan automatik dan imbangan putih automatik. Ia tidak mengukur spektrum dan tidak mengenali nilai mutlak, jadi kecerahan ialah penunjuk relatif, bukan lux. Suhu warna dan kesan sirkadian ialah anggaran yang dikira daripada warna asas sRGB. Pensampelan {rate} Hz hanya melihat kelipan di bawah {limit} Hz — kelipan sesalur elektrik 100 Hz berada di luar jangkauan dan aplikasi tidak akan sekali-kali melaporkannya sebagai bacaan.',

  'note.howTo.repeat.title': 'Ulang pengukuran',
  'note.howTo.repeat.text': 'Satu bacaan tunggal hanyalah satu petikan seketika. Pengukuran selama belasan saat memberikan gambaran yang lebih boleh dipercayai.',

  'docs.scale': 'Skala',
  'docs.direction': 'Arah',
  'docs.directionHigher': 'Lebih tinggi lebih baik',
  'docs.directionLower': 'Lebih rendah lebih lembut',
  'docs.privacyTitle': 'Data dan privasi',
  'docs.privacyText': 'Imej daripada kamera tidak dihantar mahupun disimpan ke mana-mana — daripada setiap bingkai hanya tiga nombor yang tinggal. Pengukuran, ambang dan tetapan berada dalam storan pelayar pada peranti ini. Aplikasi tidak membuat sebarang permintaan rangkaian dan berfungsi dalam mod luar talian.',
  'docs.freeLine': 'Ketujuh-tujuh besaran, sejarah, carta, alat dan mod luar talian berfungsi untuk semua orang, tanpa akaun dan tanpa bayaran.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Semuanya tersedia',
  'support.heroText': 'Ketujuh-tujuh besaran, sejarah pengukuran, carta, semua alat dan mod luar talian berfungsi untuk semua orang, serta-merta. Tanpa akaun, tanpa had dan tanpa bayaran.',
  'support.whyTitle': 'Mengapa saya meminta',
  'support.whyText': '{app} dibina di luar waktu kerja dan tidak mengaut keuntungan daripada sesiapa: tiada iklan, tiada pengumpulan data dan tiada apa-apa untuk dijual. Mengekalkannya dan membangunkannya lebih jauh — besaran baharu, pembetulan, ujian pada lebih banyak telefon — memakan masa. Jika aplikasi ini berguna kepada anda, anda boleh menyumbang. Anda tidak wajib.',
  'support.whatTitle': 'Apa yang diberikan oleh derma',
  'support.whatText': 'Tiada apa-apa. Ia benar-benar tidak membuka apa-apa dan tidak mempercepatkan apa-apa — aplikasi kelihatan dan berfungsi sama sahaja sebelum dan selepasnya. Yang tinggal hanyalah penulisnya tahu bahawa kerja ini berguna kepada seseorang.',
  'support.button': 'Belanja saya kopi',
  'support.pendingTitle': 'Profil belum disambungkan',
  'support.pendingText': 'Belum ada alamat di sini untuk menghantar sokongan. Ia akan muncul di tempat ini apabila sudah sedia — sehingga itu semua yang ada dalam aplikasi berfungsi sama sahaja.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'Butang itu membuka halaman luar Buy Me a Coffee dalam tab baharu. Itulah satu-satunya saat apabila apa-apa meninggalkan peranti ini — dan ia berlaku hanya selepas anda menekannya. Pengukuran, sejarah dan tetapan kekal di sini.',
  'privacy.externalPending': 'Sebaik sahaja alamatnya tersedia, menekan butang itu akan membuka halaman luar dalam tab baharu. Itulah nanti satu-satunya saat apabila apa-apa meninggalkan peranti ini. Pengukuran, sejarah dan tetapan kekal di sini.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (sandaran dalam ui-core.js)',
  'boot.need.metrics': 'tiada satu nilai pun akan dikira',
  'boot.need.bus': 'modul akan berhenti melihat satu sama lain',
  'boot.need.ui': 'skrin tidak boleh ditukar',
  'boot.need.engine': 'kamera dan pengukuran tidak akan bermula',
  'boot.need.support': 'skrin Sokongan akan kosong',
  'boot.need.tools': 'tab Alat akan kosong',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'Modul ini tidak dimuatkan: {list}.',
  'boot.consoleHint': 'Periksa susunan dan laluan teg <script> dalam index.html.',
  'boot.incompleteTitle': 'Aplikasi dimuatkan secara tidak lengkap',
  'boot.incompleteText': '{missing} Muat semula halaman; jika itu tidak membantu, fail pada pelayan memang tidak lengkap.',
  'boot.newVersion': 'Ada versi baharu aplikasi ini.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'Apa yang dilakukan oleh ambang. ',
  'thresholds.noteText': 'Ambang amaran menyalakan keadaan kuning, ambang kritikal menyalakan yang merah. Perubahan berkuat kuasa serta-merta — termasuk pada bacaan yang sudah ada pada skrin. Set ambang anda sendiri boleh disimpan di bawah satu nama dan dibuka semula bila-bila masa.',
  'thresholds.profilesTitle': 'Profil ambang',
  'thresholds.profilesSub': 'Tiga yang terbina dalam dan milik anda sendiri',
  'thresholds.customName': 'Nama profil anda sendiri',
  'thresholds.customPlaceholder': 'contohnya Bilik tidur pada waktu malam',
  'thresholds.save': 'Simpan ambang semasa',
  'thresholds.saveHelp': 'Menyimpan tepat ambang yang ditetapkan di atas.',

  'profile.builtin.default.name': 'Lalai',
  'profile.builtin.default.desc': 'Ambang daripada katalog besaran — titik permulaan untuk setiap pengukuran.',
  'profile.builtin.evening.name': 'Malam — lembut',
  'profile.builtin.evening.desc': 'Memberi amaran lebih awal tentang warna sejuk dan kesan sirkadian.',
  'profile.builtin.work.name': 'Kerja di meja',
  'profile.builtin.work.desc': 'Membenarkan cahaya siang yang terang dan sejuk; memantau kelipan dan kesekataan.',
  'profile.custom.desc': 'Profil anda sendiri, disimpan {date}.',

  'toast.thresholdsReset': 'Ambang lalai telah dipulihkan.',
  'toast.thresholdOrder': 'Ambang amaran mesti lebih rendah daripada ambang kritikal.',
  'toast.thresholdOrderInverted': 'Bagi besaran ini, ambang amaran mesti lebih tinggi daripada ambang kritikal.',
  'toast.profileNameMissing': 'Masukkan nama profil.',
  'toast.profileSaved': 'Profil “{name}” telah disimpan.',
  'toast.profileApplied': 'Profil “{name}” telah digunakan.',
  'toast.profileApplyFailed': 'Profil itu tidak dapat digunakan.',
  'toast.profileRemoved': 'Profil telah dipadamkan.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'Untuk apa jadual ini. ',
  'schedule.noteText': 'Ambang yang munasabah pada waktu malam bukan ambang yang munasabah pada tengah hari. Peraturan “dari–hingga” menukar profil dengan sendirinya, supaya anda tidak perlu mengingatnya. Jadual tidak pernah memulakan mahupun menghentikan pengukuran.',
  'schedule.toggle': 'Hidupkan penukaran automatik',
  'schedule.toggleSub': 'Diperiksa setiap minit mengikut jam peranti.',
  'schedule.emptyTitle': 'Tiada peraturan',
  'schedule.emptyText': 'Tambah peraturan pertama anda dengan butang di bawah.',
  'schedule.add': 'Tambah peraturan',
  'schedule.to': 'hingga',
  'schedule.profile': 'Profil',
  'schedule.fromAria': 'Peraturan {n}: waktu mula',
  'schedule.toAria': 'Peraturan {n}: waktu tamat',
  'toast.scheduleTimeFormat': 'Masukkan waktu dalam format 22:00.',
  'toast.scheduleEnded': 'Jadual telah tamat — ambang sebelumnya kembali.',
  'toast.scheduleApplied': 'Jadual menghidupkan profil “{name}”.',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'Apa yang dilakukan oleh penggera. ',
  'alerts.noteText': 'Ia memantau satu besaran dan hanya bersuara apabila besaran itu bertahan dalam zon yang dipilih tanpa putus selama tempoh yang anda tetapkan. Ia tidak pernah menghentikan pengukuran dan tidak pernah menutupi butang.',
  'alerts.toggle': 'Hidupkan penggera pendedahan',
  'alerts.toggleSub': 'Ia berfungsi hanya semasa pengukuran sedang berjalan.',
  'alerts.metric': 'Besaran yang dipantau',
  'alerts.level': 'Mulai zon yang mana',
  'alerts.level.warning': 'Amaran dan ke atas',
  'alerts.level.critical': 'Kritikal sahaja',
  'alerts.sustain': 'Selepas berapa saat tanpa putus',
  'alerts.sustainHelp': 'Tempoh yang lebih singkat memberi lebih banyak penggera palsu apabila anda menggerakkan telefon.',
  'alerts.sound': 'Bunyi bip ringkas',
  'alerts.soundSub': 'Bunyi dijana secara setempat. Ia juga boleh dimatikan secara menyeluruh pada skrin Lagi.',
  'alerts.barTitle': 'Penggera pendedahan',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} bertahan dalam zon amaran selama {seconds} s — kini {value} {unit}.',
  'alerts.message.critical': '{name} bertahan dalam zon kritikal selama {seconds} s — kini {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'Cara membandingkan. ',
  'compare.noteText': 'Mulakan pengukuran, halakan kamera ke sumber pertama dan simpan sebagai A. Tanpa mengubah jarak mahupun sudut, tukar cahaya dan simpan B. Perbandingan hanya bermakna jika pemandangannya sama.',
  'compare.slotA': 'Cahaya A',
  'compare.slotB': 'Cahaya B',
  'compare.save': 'Simpan bacaan semasa',
  'compare.savedAt': 'Disimpan {date}, {time}',
  'compare.empty': 'Belum ada apa-apa yang disimpan.',
  'compare.verdictTitle': 'Hasil perbandingan',
  'compare.verdictEmpty': 'Simpan kedua-dua cahaya untuk melihat yang mana lebih lembut.',
  'compare.notEnough': 'Data tidak mencukupi untuk membandingkan dua pengukuran ini.',
  'compare.tie': 'Kedua-dua sumber keluar hampir sama ({metric}: {a} dan {b} {unit}). Perbezaannya masih dalam hingar pengukuran.',
  'compare.betterA': 'Cahaya A yang lebih lembut — {metric} ialah {better} {unit} berbanding {worse} {unit}.',
  'compare.betterB': 'Cahaya B yang lebih lembut — {metric} ialah {better} {unit} berbanding {worse} {unit}.',
  'compare.clear': 'Kosongkan perbandingan',
  'toast.compareSavedA': 'Cahaya A telah disimpan.',
  'toast.compareSavedB': 'Cahaya B telah disimpan.',
  'toast.compareCleared': 'Perbandingan telah dikosongkan.',
  'toast.measureFirst': 'Mulakan pengukuran pada skrin Ukur dahulu.',

  /* Nazwa wielkości w środku zdania. Po malajsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. */
  'metric.share.nameLower': 'bahagian biru',
  'metric.brightness.nameLower': 'kecerahan pemandangan',
  'metric.kelvin.nameLower': 'suhu warna',
  'metric.melanopic.nameLower': 'kesan sirkadian',
  'metric.flicker.nameLower': 'kelipan',
  'metric.uniformity.nameLower': 'kesekataan',
  'metric.comfort.nameLower': 'keselesaan mata',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'Mengapa ini berkesan. ',
  'calib.noteText': 'Penderia kamera mempunyai pesongan tetap antara salurannya. Mengukur sekeping kertas putih menunjukkan sebesar mana pesongan itu dan membolehkannya ditolak. Inilah satu-satunya fungsi dalam aplikasi ini yang benar-benar menaikkan ketepatan — dan ia tetap tidak menjadikan kamera sebuah spektrometer.',
  'calib.step1': 'Letakkan sekeping kertas putih di bawah cahaya yang diukur',
  'calib.step2': 'Mulakan pengukuran dan penuhkan bingkai dengan kertas itu',
  'calib.step3': 'Tekan “Tentukur” dan jangan gerakkan telefon selama 3 saat',
  'calib.done': 'Ditentukur {date}, {time}.',
  'calib.none': 'Tiada penentukuran. Pengukuran tetap berjalan; anggap nilainya sebagai perbandingan.',
  'calib.gain': 'Gandaan {channel}',
  'calib.gainsLabel': 'Gandaan saluran',
  'calib.gainsUnset': 'tidak ditetapkan',
  'calib.start': 'Tentukur (3 s)',
  'calib.clear': 'Padam penentukuran',
  'toast.calibCleared': 'Penentukuran telah dipadamkan.',
  'calib.error.noEngine': 'Modul pengukuran tidak tersedia.',
  'calib.error.notRunning': 'Mulakan pengukuran dahulu dan halakan kamera ke sekeping kertas putih.',
  'calib.error.busy': 'Penentukuran sedang berjalan.',
  'calib.error.tooFewSamples': 'Sampel terlalu sedikit. Periksa sama ada pengukuran benar-benar berjalan.',
  'calib.error.tooDark': 'Imej terlalu gelap untuk ditentukur. Terangkan kertas itu dan cuba lagi.',
  'calib.error.tooSkewed': 'Pesongan saluran terlalu besar untuk diterima sebagai penentukuran. Gunakan kertas putih dalam cahaya yang sekata.',
  'calib.ok': 'Telah ditentukur. Suhu warna dan kesan sirkadian akan lebih tepat sekarang.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'Untuk apa ini. ',
  'screencheck.noteText': 'Lima langkah memeriksa monitor sebagaimana ia diperiksa dalam sesebuah ulasan: putih pada dua aras kecerahan, kesekataan lampu latar, dan sama ada mod malam sistem benar-benar mengubah sesuatu. Bestari ini membaca pengukuran yang sedang berjalan; ia tidak memulakannya sendiri.',
  'screencheck.step.white100.title': 'Putih pada kecerahan penuh',
  'screencheck.step.white100.hint': 'Buka halaman putih pada monitor, tetapkan kecerahan ke maksimum dan penuhkan bingkai dengan skrin itu.',
  'screencheck.step.white20.title': 'Putih pada kecerahan rendah',
  'screencheck.step.white20.hint': 'Turunkan kecerahan monitor kepada kira-kira satu perlima dan jangan ubah bidikan.',
  'screencheck.step.corners.title': 'Sudut skrin',
  'screencheck.step.corners.hint': 'Kembali ke kecerahan penuh dan tunjukkan seluruh skrin kepada kamera — kami memeriksa kesekataan lampu latar.',
  'screencheck.step.nightOff.title': 'Mod malam dimatikan',
  'screencheck.step.nightOff.hint': 'Pastikan penapis cahaya biru dimatikan.',
  'screencheck.step.nightOn.title': 'Mod malam dihidupkan',
  'screencheck.step.nightOn.hint': 'Hidupkan penapis cahaya biru sistem dan ulangi bidikan yang sama.',
  'screencheck.stepHeading': 'Langkah {n} daripada {total}: {title}',
  'screencheck.idleTitle': 'Bestari tidak sedang berjalan',
  'screencheck.idleHint': 'Mulakan pengukuran pada skrin Ukur, kemudian kembali ke sini dan tekan “Mulakan bestari”.',
  'screencheck.next': 'Simpan langkah dan teruskan',
  'screencheck.cancel': 'Batalkan',
  'screencheck.start': 'Mulakan bestari',
  'screencheck.clearResult': 'Kosongkan hasil',
  'screencheck.resultTitle': 'Hasil',
  'screencheck.resultEmpty': 'Belum ada langkah yang disimpan.',
  'screencheck.resultPartial': '{done} daripada {total} langkah telah disimpan. Kesimpulan akan muncul apabila ada sesuatu untuk dibandingkan.',
  'screencheck.note.uniformityLow': 'Kesekataan lampu latar ialah {value}% — ada perbezaan kecerahan yang ketara di dalam bingkai.',
  'screencheck.note.uniformityOk': 'Lampu latar adalah sekata ({value}%).',
  'screencheck.note.nightWorks': 'Mod malam menurunkan bahagian biru sebanyak {value} mata peratus — ia berfungsi.',
  'screencheck.note.nightWeak': 'Mod malam mengubah bahagian biru hanya sebanyak {value} mata peratus. Itu kurang daripada apa yang biasanya diberikan oleh penapis sistem.',
  'screencheck.note.pwm': 'Pada kecerahan rendah kelipan meningkat daripada {from}% kepada {to}% — itu tanda lazim pemalapan denyut (PWM).',
  'toast.screencheckDone': 'Bestari telah selesai. Hasilnya ada di bawah.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'Dari mana nombor ini datang. ',
  'reports.noteText': 'Laporan dikira daripada sejarah yang tersimpan pada peranti ini — satu titik setiap lima saat. Enjin mengumpulnya sejak pengukuran pertama anda, jadi laporan sudah sedia serta-merta.',
  'reports.rangeAria': 'Julat laporan',
  'reports.day': '24 jam terakhir',
  'reports.week': '7 hari terakhir',
  'reports.date': 'Laporan bagi {date}.',
  'report.headerDay': 'Hari dari {from} hingga {to} — {count}.',
  'report.headerWeek': 'Minggu dari {from} hingga {to} — {count}.',
  'count.points': { other: '{n} titik' },
  'count.samples': { other: '{n} sampel' },
  'report.emptyTitle': 'Tiada data dalam tempoh ini',
  'report.emptyText': 'Mulakan pengukuran pada skrin Ukur — sejarah menyimpan dirinya sendiri.',
  'report.colAvg': 'Purata',
  'report.colMin': 'Minimum',
  'report.colMax': 'Maksimum',
  'report.zonesTitle': 'Taburan zon',
  'report.worstHour': 'Waktu paling teruk dalam sehari',
  'report.worstHourNone': 'tiada yang menonjol',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'Apa yang boleh dilakukan',
  'report.disclaimerTitle': 'Ini bukan nasihat kesihatan. ',
  'report.disclaimerText': 'Kesimpulan ini terbit semata-mata daripada apa yang dilihat oleh kamera telefon ini. Aplikasi tidak mengukur spektrum, tidak mengenali lux dan tidak membuat sebarang diagnosis.',

  'advice.melanopic': 'Purata kesan sirkadian ialah {value}×. Pada waktu malam eloklah turun di bawah 0.50 — paling mudah dengan mentol yang lebih hangat atau mod malam.',
  'advice.kelvin': 'Cahayanya sejuk (purata {value} K). Untuk bekerja itu tiada masalah; untuk dua jam sebelum tidur, di bawah 3000 K lebih baik.',
  'advice.flicker': 'Kelipan yang ketara telah dikesan (purata {value}%). Puncanya biasanya pemalap murah atau pemacu lampu latar.',
  'advice.uniformity': 'Cahaya tersebar tidak sekata ({value}%). Mengalihkan lampu atau mengubah sudutnya biasanya lebih berkesan daripada menukar mentol.',
  'advice.worstHour': 'Waktu paling teruk dalam sehari ialah pukul {hour}:00 — di situlah paling banyak bacaan di luar julat berkumpul.',
  'advice.none': 'Dalam tempoh ini tiada apa-apa yang menonjol melebihi julat biasa. Langkah paling berguna sekarang ialah membandingkan dua sumber cahaya dalam perbandingan A/B.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'Format fail. ',
  'export.noteText': 'Koma bertitik sebagai pemisah lajur, koma sebagai tanda perpuluhan, pengekodan UTF-8 dengan tanda susunan bait. Excel yang ditetapkan pada tempat setempat yang menggunakan koma sebagai tanda perpuluhan membuka fail sebegini tanpa perlu menetapkan apa-apa.',
  'export.range': 'Julat data',
  'export.columns': 'Lajur dalam fail',
  'export.chipFilled': ' — lajur terisi',
  'export.help': 'Fail mengandungi kesemua tujuh lajur — enjin mengiranya sejak pengukuran pertama dan kesemuanya masuk ke dalam fail.',
  'export.run': 'Simpan fail CSV',
  'export.previewEmpty': 'Tiada bacaan dalam julat ini. Mulakan pengukuran — sejarah menyimpan dirinya sendiri.',
  'csv.range.hour': 'Sejam terakhir',
  'csv.range.day': '24 jam terakhir',
  'csv.range.week': '7 hari terakhir',
  'csv.range.month': '30 hari terakhir',
  'csv.colDate': 'Tarikh',
  'csv.colTime': 'Masa',
  'csv.colZone': 'Zon',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'Tiada sebarang bacaan langsung dalam julat yang dipilih.',
  'toast.exportFailed': 'Pelayar ini tidak membenarkan fail itu disimpan.',
  'toast.exportSaved': {
    other: 'Fail {filename} telah disimpan ({n} baris).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} jam {m} min',
  'duration.ms': '{m} min {s} s',
  'duration.s': '{s} s'
});
