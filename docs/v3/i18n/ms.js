/* docs/v3/i18n/ms.js — słownik WŁASNY wersji v3, malajski (Bahasa Melayu).
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/ms.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js tego katalogu —
 * pilnuje tego docs/shared/i18n/keys.test.js. Kluczy, które stoją w słowniku
 * wspólnym (nazwy stref, zdania oceniające, noty o granicach metody, nazwy
 * i opisy siedmiu wielkości, zastrzeżenie z rozporządzenia (UE) 2017/745), tu
 * NIE MA — poza jednym świadomym nadpisaniem, opisanym przy
 * 'verdict.critical.comfort'.
 *
 * TERMINOLOGIA jest przepisana ze słownika wspólnego docs/shared/i18n/ms.js
 * i nie wolno jej tu zmieniać: bahagian biru, kecerahan pemandangan, suhu
 * warna, kesan sirkadian (nisbah melanopik), kelipan, kesekataan, keselesaan
 * mata; strefy Dalam julat / Awas / Kritikal / Tiada data. Dalej: „wielkość” to
 * kuantiti (jak w 'verdict.noValue'), „próg” to ambang, „kalibracja” to
 * penentukuran (jak w 'note.calibration'), „ciepłe światło” to cahaya hangat
 * (jak w 'metric.kelvin.short').
 *
 * REJESTR: malajszczyzna standardowa (Malezja), zwrot do użytkownika przez
 * „anda” pisane małą literą. Słownictwo malezyjskie, nie indonezyjskie:
 * peranti, pelayar, skrin, tetapan, butang, fail, lalai, baharu, memuat turun.
 *
 * ZAPIS LICZB WE WZORACH. Polska redakcja pisze przecinek dziesiętny
 * („0,3320”), malajska kropkę („0.3320”) — zgodnie z Intl dla „ms”. Liczby
 * wstawiane przez '{…}' są osobną sprawą: te formatuje warstwa językowa.
 *
 * NAZWY KLAWISZY W CUDZYSŁOWIE mają się zgadzać z etykietami tych klawiszy:
 * „Mula mengukur” to 'keys.start', „Tentukur” to 'modules.03.runKey',
 * „Tutup corak” to 'modules.07.exitKey'.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ms'] = Object.assign(window.I18nData['ms'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. */
  'app.wordmark': 'MONITOR CAHAYA',

  'state.idle': 'Sedia',
  'state.starting': 'Memulakan',
  'state.running': 'Mengukur',
  'state.runningTpl': 'Mengukur {time}',
  'state.stopped': 'Dihentikan',
  'state.error': 'Ralat kamera',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5.0 po malajsku, 5,0 po polsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'Mula mengukur',
  'keys.starting': 'Memulakan…',
  'keys.stop': 'Henti',
  'keys.flip': 'Tukar',
  'keys.flipAria': 'Tukar kamera, depan atau belakang',
  'keys.menu': 'Menu',
  'keys.menuAria': 'Senarai modul',
  'keys.back': '‹ Kembali',
  'keys.backAria': 'Kembali ke papan pemuka',
  'keys.dash': 'Papan pemuka',
  'keys.zoom': 'Besarkan pratonton',
  'keys.retry': 'Cuba lagi',
  'keys.refresh': 'Muat semula',
  'keys.close': 'Tutup',
  'keys.show': 'Tunjuk',
  'keys.apply': 'Gunakan',
  'keys.remove': 'Padam',

  'monitor.legend': 'Pratonton kawalan',
  'monitor.badge': 'Langsung',

  'aim.title': 'Membidik',
  'aim.hint': 'Bingkai itu menunjukkan tepat bahagian imej yang diukur oleh aplikasi.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'Saluran utama',
  'readout.thresholdTpl': '(ambang {value})',
  'readout.contextTpl': 'min {min} · purata {avg} · maks {max} — 60 s terakhir',
  'readout.contextEmpty': 'tiada data daripada 60 s terakhir',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'Apa maksudnya: {name}',
  'aria.channel': '{name}, {value}, {zone}. Tunjukkan pada paparan besar.',
  'aria.channelStale': '{name}, tiada data. Tunjukkan pada paparan besar.',
  'aria.scale': 'Skala: {name}, daripada {min} hingga {max}. Sekarang {value}, {zone}. Ambang awas {warn}, ambang kritikal {crit}.',
  'aria.readout': '{name}: {value}, {zone}.',
  'aria.readoutApprox': '{name}: kira-kira {value}, {zone}. Nilai anggaran.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'Skala saluran utama. Tiada data',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': 'Tekan “Mula mengukur”, halakan telefon ke permukaan yang bercahaya dan pegang tanpa bergerak selama beberapa saat.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'Keselesaan mata rendah. Lihat modul 01 untuk mengetahui apa yang menurunkannya.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'Mulakan dengan butang “Mula mengukur” di bahagian bawah skrin. Kamera hanya hidup selepas anda menekannya.',
  'transient.measureStopped': 'Pengukuran selesai · {time} · disimpan dalam sejarah.',
  'transient.newVersion': 'Ada versi baharu aplikasi ini.',
  'transient.thresholdsSaved': 'Ambang disimpan.',
  'transient.thresholdsRejected': 'Tidak disimpan — ambang awas dan ambang kritikal tidak boleh bersilang.',
  'transient.historyCleared': 'Sejarah dikosongkan.',

  'live.lead': 'Saluran utama: {name}, {value}, {zone}.',
  'live.ready': 'Penilaian sedia. {name} {value}, {zone}.',
  'live.started': 'Pengukuran bermula.',
  'livebar.stopped': 'Pengukuran dihentikan',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'Belum ada sebarang rakaman. Sejarah ditulis semasa pengukuran berjalan — jalankan pengukuran selama seminit dan kembali ke sini.',
  'empty.recorderNoRange': 'Tiada pengukuran dalam julat ini.',
  'empty.coverageTpl': 'Pengukuran meliputi {done} daripada {total} jam.',
  'empty.reportsNoData': 'Laporan harian akan muncul selepas hari penuh pertama dengan pengukuran.',
  'empty.compareOneSession': 'Perbandingan memerlukan dua sesi yang selesai. Setakat ini anda ada satu.',
  'empty.exportNoData': 'Tiada apa-apa untuk dieksport. Mulakan pengukuran supaya sejarah ada isinya.',
  'empty.alertsOff': 'Amaran dimatikan. Selepas dihidupkan, ia hanya berfungsi semasa aplikasi terbuka.',
  'empty.scheduleEmpty': 'Tiada waktu yang ditetapkan. Jadual hanya berfungsi semasa aplikasi terbuka.',
  'empty.historyEmpty': 'Sejarah kosong.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'Senarai modul',

  'modules.01.title': 'Perakam',
  'modules.01.desc': 'Perjalanan pengukuran dari semasa ke semasa, daripada seminit hingga tiga puluh hari.',
  'modules.02.title': 'Ambang',
  'modules.02.desc': 'Tetapkan had awas dan had penggera anda sendiri bagi setiap kuantiti.',
  'modules.03.title': 'Penentukuran',
  'modules.03.desc': 'Rujukan kepada sumber cahaya yang diketahui, dan apa yang tidak dibetulkan oleh penentukuran.',
  'modules.04.title': 'Laporan',
  'modules.04.desc': 'Ringkasan harian dan mingguan yang disusun seperti cetakan.',
  'modules.05.title': 'Eksport',
  'modules.05.desc': 'Menyimpan bacaan ke fail CSV atau JSON, dengan lajurnya diterangkan.',
  'modules.06.title': 'Perbandingan',
  'modules.06.desc': 'Dua sesi bersebelahan, dengan perbezaannya diberi sebagai nombor.',
  'modules.07.title': 'Ujian skrin',
  'modules.07.desc': 'Corak ujian untuk memeriksa monitor anda sendiri, langkah demi langkah.',
  'modules.08.title': 'Jadual',
  'modules.08.desc': 'Pengukuran pada waktu yang anda pilih.',
  'modules.09.title': 'Amaran',
  'modules.09.desc': 'Pemberitahuan apabila ambang dilepasi — dan bila ia tidak berfungsi.',
  'modules.10.title': 'Sokongan',
  'modules.10.desc': 'Aplikasi ini percuma sepenuhnya. Di sini anda boleh belanja penulisnya kopi.',
  'modules.11.title': 'Dokumentasi',
  'modules.11.desc': 'Apa pengukuran ini, dan apa yang pastinya bukan.',
  'modules.12.title': 'Tetapan',
  'modules.12.desc': 'Tema, saiz teks, kurangkan gerakan, mengosongkan sejarah.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'Saluran pengukuran',
  'channels.pick': 'Tunjukkan pada paparan besar',
  'channels.stale': 'tiada data',
  'channels.approx': 'nilai anggaran',

  'help.unit': 'Unit',
  'help.range': 'Julat',
  'help.thresholds': 'Ambang',
  'help.warn': 'Ambang awas',
  'help.crit': 'Ambang kritikal',
  'help.now': 'sekarang',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „Kuantiti” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'Kuantiti',
  'col.unit': 'Unit',
  'col.range': 'Julat',
  'col.direction': 'Arah',
  'col.time': 'Masa',
  'col.date': 'Tarikh',
  'col.zone': 'Zon',
  'col.avg': 'Purata',
  'col.min': 'Minimum',
  'col.max': 'Maksimum',
  'col.name': 'Lajur',
  'col.meaning': 'Apa isinya',
  'col.channel': 'Saluran',
  'col.gain': 'Gandaan',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'Julat masa',
  'recorder.range.60s': '60 s',
  'recorder.range.15min': '15 min',
  'recorder.range.1h': '1 jam',
  'recorder.range.24h': '24 jam',
  'recorder.range.30d': '30 hari',
  'recorder.gap': 'tiada pengukuran',
  'recorder.sessionTitle': 'Statistik sesi',
  'recorder.zonesCaption': 'Taburan zon bagi bahagian biru',
  'recorder.tableCaption': 'Bacaan daripada julat yang dipilih',
  'recorder.crosshair': 'Kursor bacaan',
  'recorder.prevAria': 'Titik lebih awal',
  'recorder.nextAria': 'Titik lebih lewat',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'Penampilan',
  'settings.themeLabel': 'Tema',
  'settings.themeSystem': 'Ikut sistem',
  'settings.themeLight': 'Terang',
  'settings.themeDark': 'Gelap',
  'settings.themeHint': 'Tema “ikut sistem” berubah bersama-sama tetapan pada telefon anda.',
  'settings.textLabel': 'Saiz teks',
  /* Mnożnik jako LICZBA we wstawce — 1.15 po malajsku, 1,15 po polsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'Membesarkan keseluruhan antara muka, bukan hurufnya sahaja — butang dan baris membesar bersama teks.',
  'settings.motionGroup': 'Gerakan',
  'settings.motionLabel': 'Kurangkan gerakan',
  'settings.motionHint': 'Mematikan semua peralihan. Jarum skala kemudiannya melompat sekali sesaat dan bukan meluncur.',
  'settings.dataTitle': 'Data',
  'settings.clearLabel': 'Kosongkan sejarah',
  'settings.clearHintTpl': 'Dalam sejarah kini ada {count} titik yang tersimpan.',
  'settings.clearHintEmpty': 'Sejarah kosong.',
  'settings.clearTitle': 'Kosongkan sejarah?',
  'settings.clearConfirm': 'Kosongkan seluruh sejarah pengukuran? Tindakan ini tidak boleh dibatalkan.',
  'settings.clearKey': 'Kosongkan',
  'settings.aboutTitle': 'Tentang aplikasi',
  'settings.versionTpl': '{app}, versi {version}.',
  'settings.offlineText': 'Aplikasi ini berfungsi tanpa rangkaian. Selepas dibuka kali pertama, semua failnya berada dalam storan pelayar, jadi mod pesawat tidak mengubah apa-apa. Tiada apa-apa yang dihantar ke mana-mana pelayan, kerana aplikasi ini tidak membuat sebarang permintaan rangkaian.',
  'settings.docsKey': 'Buka dokumentasi',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'Batal',
  'common.save': 'Simpan',
  'common.reset': 'Pulihkan lalai',
  'common.yes': 'Ya',
  'common.no': 'Tidak',
  'common.on': 'Hidup',
  'common.off': 'Mati',
  'common.sep': ' · ',
  'common.stepsTitle': 'Langkah demi langkah',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'Untuk apa ambang anda sendiri',
  'modules.02.intro': 'Ambang menentukan bila aplikasi berkata “Awas” dan bila ia berkata “Kritikal”. Nilai lalai ialah pertimbangan editorial kami, bukan sesuatu piawaian — jika anda mengukur dalam keadaan yang lain, alihkannya mengikut keperluan anda. Penilaian dan ayat pada papan pemuka dikira daripada ambang baharu itu serta-merta.',
  'modules.02.orderNormal': 'Ambang awas mesti berada di bawah ambang kritikal.',
  'modules.02.orderInvert': 'Di sini nilai yang lebih tinggi lebih baik, jadi ambang awas berada di atas ambang kritikal.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'Pratonton skala: {name}',
  'modules.02.nowTpl': 'sekarang {value}',
  'modules.02.resetDone': 'Ambang lalai dipulihkan.',
  'modules.02.profilesTitle': 'Profil',
  'modules.02.profilesHint': 'Profil ialah set ambang yang tersimpan bagi ketujuh-tujuh kuantiti. Menggunakan sesuatu profil menukar kesemuanya sekali gus.',
  'modules.02.profileSaveKey': 'Simpan ambang semasa',
  'modules.02.profileNameLabel': 'Nama profil baharu',
  'modules.02.profileNameHint': 'Nama itu kekal pada peranti ini. Paling banyak 40 aksara.',
  'modules.02.profileNameEmpty': 'Masukkan nama profil.',
  'modules.02.profileSavedTpl': 'Profil “{name}” disimpan.',
  'modules.02.profileAppliedTpl': 'Profil “{name}” digunakan.',
  'modules.02.profileRemovedTpl': 'Profil “{name}” dipadam.',
  'modules.02.profileFailed': 'Profil itu tidak dapat digunakan.',
  'modules.02.profileCustomTpl': 'Profil anda sendiri, disimpan {date}.',
  'modules.02.builtin.default.name': 'Lalai',
  'modules.02.builtin.default.desc': 'Ambang daripada katalog kuantiti — titik permulaan bagi semua pengukuran.',
  'modules.02.builtin.evening.name': 'Malam — lembut',
  'modules.02.builtin.evening.desc': 'Memberi amaran lebih awal tentang warna yang sejuk dan kesan sirkadian.',
  'modules.02.builtin.work.name': 'Kerja di meja',
  'modules.02.builtin.work.desc': 'Membenarkan cahaya siang yang terang dan sejuk; menjaga kelipan dan kesekataan.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'Mengapa ini berkesan',
  'modules.03.why': 'Penderia kamera mempunyai pesongan tetap antara salurannya. Mengukur sekeping kertas putih menunjukkan sebesar mana pesongan itu dan membolehkannya ditolak. Inilah satu-satunya fungsi dalam aplikasi ini yang benar-benar meningkatkan ketepatan — dan ia tetap tidak menjadikan kamera sebuah spektrometer.',
  'modules.03.steps.1': 'Letakkan sekeping kertas putih di bawah cahaya yang anda ukur.',
  'modules.03.steps.2': 'Tekan “Mula mengukur” pada papan pemuka dan penuhkan bingkai dengan kertas itu.',
  'modules.03.steps.3': 'Kembali ke sini, tekan “Tentukur” dan jangan gerakkan telefon selama tiga saat.',
  'modules.03.runKey': 'Tentukur (3 s)',
  'modules.03.clearKey': 'Padam penentukuran',
  'modules.03.busyTpl': 'Mengukur kertas… tinggal {sec} s',
  'modules.03.statusNone': 'Tiada penentukuran. Pengukuran berjalan; anggap nilainya sebagai perbandingan.',
  'modules.03.statusOnTpl': 'Ditentukur {date} pada {time}.',
  'modules.03.gainsTitle': 'Gandaan saluran',
  'modules.03.gainR': 'Merah',
  'modules.03.gainG': 'Hijau',
  'modules.03.gainB': 'Biru',
  'modules.03.gainsNone': 'tidak ditetapkan',
  'modules.03.needRunning': 'Mulakan pengukuran dahulu dan halakan kamera ke sekeping kertas putih.',
  'modules.03.tooFew': 'Terlalu sedikit sampel. Periksa sama ada pengukuran benar-benar berjalan.',
  'modules.03.tooDark': 'Imej terlalu gelap untuk ditentukur. Terangkan kertas itu dan cuba lagi.',
  'modules.03.refused': 'Pesongan saluran terlalu besar untuk diterima sebagai penentukuran. Gunakan kertas putih dalam cahaya yang sekata.',
  'modules.03.done': 'Ditentukur. Suhu warna dan kesan sirkadian akan lebih tepat sekarang.',
  'modules.03.cleared': 'Penentukuran dipadam.',
  'modules.03.limitsTitle': 'Apa yang tidak dibetulkan oleh penentukuran',
  'modules.03.limits.1': 'Penentukuran meratakan tiga saluran kamera dan tidak lebih daripada itu. Ia tidak memberi kamera sesuatu spektrum, jadi suhu warna dan kesan sirkadian kekal sebagai anggaran yang dikira daripada warna asas sRGB.',
  'modules.03.limits.2': 'Ia tidak menjadikan kecerahan pemandangan sesuatu kuantiti mutlak — nombor itu kekal relatif. Ia tidak mematikan pendedahan automatik mahupun imbangan putih, yang mengalihkan bacaan di sebalik tabir.',
  'modules.03.limits.3': 'Ia tidak berpindah kepada cahaya yang lain: penentukuran yang dibuat di bawah satu mentol menerangkan mentol itu. Dengan sumber yang lain, ulanginya. Dan ia tidak mengubah apa-apa tentang apa yang bukan pengukuran ini — ia tetap bukan pemeriksaan dan tetap bukan asas untuk mendiagnosis sesuatu penyakit.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'Tempoh laporan',
  'modules.04.rangeDay': 'Hari',
  'modules.04.rangeWeek': 'Minggu',
  'modules.04.headTpl': 'Daripada {from} hingga {to} · {count} titik sejarah.',
  'modules.04.tableTitle': 'Ringkasan',
  'modules.04.tableCaption': 'Purata, minimum dan maksimum sepanjang tempoh yang dipilih',
  'modules.04.panoramaTitle': 'Panorama',
  'modules.04.panoramaAriaTpl': 'Panorama: {name}, {span}.',
  'modules.04.panoramaSpanDay': '24 jam terakhir dipecahkan mengikut jam',
  'modules.04.panoramaSpanWeek': 'minggu terakhir dipecahkan mengikut hari',
  'modules.04.panoramaHint': 'Tinggi dan warna palang mengatakan perkara yang sama: dalam julat — rendah, awas — sederhana, kritikal — penuh. Sengkang pada dasarnya menandakan jam tanpa pengukuran.',
  'modules.04.coverageDayTpl': 'Pengukuran meliputi {done} daripada {total} jam.',
  'modules.04.coverageWeekTpl': 'Pengukuran meliputi {done} daripada {total} hari.',
  'modules.04.zonesTitle': 'Taburan zon',
  'modules.04.zonesCaptionTpl': 'Dikira bagi saluran utama: {name}.',
  'modules.04.worstTpl': 'Waktu paling sukar: {value}.',
  'modules.04.worstNone': 'tiada yang menonjol',
  'modules.04.worstHourTpl': 'pukul {hour}',
  'modules.04.adviceTitle': 'Apa yang boleh dibuat mengenainya',
  'modules.04.adviceMelanopicTpl': 'Purata kesan sirkadian ialah {value}×. Pada waktu malam eloklah turun di bawah 0.50 — paling mudah dengan mentol yang lebih hangat atau mod malam.',
  'modules.04.adviceKelvinTpl': 'Cahayanya sejuk (purata {value} K). Untuk bekerja itu tiada masalah; untuk dua jam sebelum tidur, di bawah 3000 K lebih lembut.',
  'modules.04.adviceFlickerTpl': 'Ada kelipan yang ketara (purata {value}%). Biasanya ia berpunca daripada peredup yang murah atau pemacu lampu latar.',
  'modules.04.adviceUniformityTpl': 'Cahaya tersebar tidak sekata ({value}%). Mengalihkan lampu atau menukar sudutnya biasanya memberi lebih banyak kesan daripada menukar mentol.',
  'modules.04.adviceWorstTpl': 'Kebanyakan bacaan di luar ambang berkumpul pada pukul {hour}.',
  'modules.04.adviceNone': 'Dalam tempoh ini tiada apa-apa yang menonjol melepasi ambang yang anda tetapkan.',
  'modules.04.limitsTitle': 'Ini bukan nasihat kesihatan',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'Kesimpulan ini terhasil semata-mata daripada apa yang dilihat oleh kamera telefon ini. Aplikasi tidak mengukur spektrum dan tidak membuat sebarang diagnosis.',
  'modules.04.printHint': 'Halaman ini disusun seperti cetakan: jadual dan kapsyennya terbaca sama pada kertas, di bawah kanta pembesar sistem dan dalam pembaca skrin.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'Julat data',
  'modules.05.range1h': 'Jam',
  'modules.05.range24h': 'Hari',
  'modules.05.range7d': '7 hari',
  'modules.05.range30d': '30 hari',
  'modules.05.csvKey': 'Simpan fail CSV',
  'modules.05.jsonKey': 'Simpan fail JSON',
  'modules.05.formatTitle': 'Format fail',
  'modules.05.formatCsv': 'CSV: koma bertitik memisahkan lajur, koma ialah tanda perpuluhan, pengekodannya UTF-8 dengan tanda susunan bait. Excel yang ditetapkan pada tempat yang menggunakan koma sebagai tanda perpuluhannya membuka fail sebegini tanpa perlu menetapkan apa-apa.',
  'modules.05.formatJson': 'JSON: data yang sama dalam medan “points”, dengan titik perpuluhan dan cap masa dalam milisaat — itulah yang dikehendaki oleh format ini.',
  'modules.05.resolution': 'Sejarah menyimpan satu titik setiap 5 saat dan mencapai 30 hari ke belakang. Fail itu tidak mengandungi resolusi penuh lima sampel sesaat — enjin menyimpannya selama seminit sahaja.',
  'modules.05.offline': 'Fail itu terhasil pada peranti dan kekal pada peranti. Eksport tidak menyambung ke mana-mana rangkaian.',
  'modules.05.columnsTitle': 'Keterangan lajur',
  'modules.05.columnsCaption': 'Lajur fail dan maksudnya',
  'modules.05.descDate': 'Tarikh titik itu daripada jam peranti, ditulis hari-bulan-tahun.',
  'modules.05.descTime': 'Masa titik itu, tepat kepada saat.',
  'modules.05.descZone': 'Zon bahagian biru pada saat ia disimpan. Enjin menyimpan zon bagi satu kuantiti itu sahaja — bagi yang lain, kiranya daripada ambang.',
  'modules.05.descMetricTpl': '{short} Unit: {unit}. Julat {min}–{max}.',
  'modules.05.previewTitle': 'Pratonton',
  'modules.05.previewHint': 'Lima baris pertama fail itu, tepat seperti yang akan disimpan.',
  'modules.05.savedTpl': 'Fail {name} disimpan — {rows} baris.',
  'modules.05.failed': 'Pelayar ini tidak membenarkan fail itu disimpan.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'Aplikasi menyimpan setiap sesi pengukuran yang selesai pada peranti ini. Pilih dua untuk melihatnya pada satu pita dan membaca perbezaannya sebagai nombor.',
  'modules.06.noSessions': 'Belum ada sesi yang selesai. Mulakan pengukuran, hentikannya dan kembali ke sini.',
  'modules.06.slotA': 'Sesi A',
  'modules.06.slotB': 'Sesi B',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'Pita',
  'modules.06.tapeAriaTpl': 'Perjalanan sesi {slot}, kuantiti {name}.',
  'modules.06.tapeHint': 'Kedua-dua sesi diregangkan kepada lebar yang sama: satu palang ialah pecahan tempoh yang sama, bukan waktu jam yang sama. Tinggi dan warnanya mengatakan perkara yang sama seperti pada papan pemuka.',
  'modules.06.tapeChannelTpl': 'Pita ini menunjukkan saluran utama: {name}.',
  'modules.06.diffTitle': 'Perbezaan',
  'modules.06.diffCaption': 'Purata kedua-dua sesi dan perbezaan antaranya',
  'modules.06.clearKey': 'Padam sesi yang tersimpan',
  'modules.06.cleared': 'Sesi yang tersimpan telah dipadam.',
  'modules.06.savedTpl': 'Sesi disimpan: {dur}.',
  'modules.06.limitsTitle': 'Apa yang tidak diberitahu oleh perbandingan ini',
  'modules.06.limits': 'Anda membandingkan dua pengukuran, bukan dua sumber cahaya. Jika bidikan, jarak, waktu hari atau kedudukan telefon berubah antara kedua-dua sesi itu, perbezaannya juga tentang perkara itu. Perbandingan yang paling jujur ialah pemandangan yang sama sebelum dan selepas perubahan pencahayaan.',
  'modules.06.keepTpl': 'Paling banyak {count} sesi terbaharu yang diingat.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'Corak ujian dipaparkan pada seluruh skrin peranti ini. Ia untuk melihat skrin dengan mata anda sendiri: sama ada putihnya sekata, sama ada kelabunya hanyut ke sesuatu warna dan sama ada lampu latar bocor di penjuru.',
  'modules.07.steps.1': 'Tetapkan kecerahan skrin pada aras yang biasa anda gunakan dan matikan mod malam sistem.',
  'modules.07.steps.2': 'Pilih satu corak daripada senarai di bawah. Ia akan memenuhi seluruh skrin.',
  'modules.07.steps.3': 'Lihat dari jarak kira-kira enam puluh sentimeter, tegak lurus dengan skrin. Kemudian lihat corak yang sama dari sudut.',
  'modules.07.steps.4': 'Keluar dengan butang “Tutup corak” atau kekunci Escape dan teruskan ke corak seterusnya.',
  'modules.07.planesTitle': 'Corak',
  'modules.07.exitKey': 'Tutup corak',
  'modules.07.showAriaTpl': 'Tunjukkan corak: {name}',
  'modules.07.planeAriaTpl': 'Corak ujian: {name}. Butang tutup ada di bahagian bawah skrin.',
  'modules.07.plane.white.name': 'Putih',
  'modules.07.plane.white.hint': 'Cari tompokan, rona warna dan kawasan yang lebih cerah berhampiran tepi. Putih sepatutnya satu warna di seluruh permukaan.',
  'modules.07.plane.gray75.name': 'Kelabu 75%',
  'modules.07.plane.gray75.hint': 'Kelabu sepatutnya kelabu. Rona kehijauan atau kemerahjambuan bermakna imbangan putih skrin sudah terpesong.',
  'modules.07.plane.gray50.name': 'Kelabu 50%',
  'modules.07.plane.gray50.hint': 'Corak terbaik untuk menilai rona warna. Bandingkan bahagian tengah dengan penjurunya.',
  'modules.07.plane.gray25.name': 'Kelabu 25%',
  'modules.07.plane.gray25.hint': 'Kelabu gelap mendedahkan lelehan lampu latar dan jalur pada panel yang murah.',
  'modules.07.plane.black.name': 'Hitam',
  'modules.07.plane.black.hint': 'Dalam bilik yang gelap, ini menunjukkan setiap lelehan lampu latar dan setiap penjuru yang mencerah.',
  'modules.07.plane.red.name': 'Merah tulen',
  'modules.07.plane.red.hint': 'Merah yang sekata mendedahkan subpiksel mati dan ketidaksekataan panel.',
  'modules.07.plane.green.name': 'Hijau tulen',
  'modules.07.plane.green.hint': 'Hijau membawa kecerahan paling banyak — piksel yang rosak paling mudah dikesan padanya.',
  'modules.07.plane.blue.name': 'Biru tulen',
  'modules.07.plane.blue.hint': 'Biru menunjukkan kotoran dan calitan pada permukaan skrin lebih baik daripada putih.',
  'modules.07.plane.grid.name': 'Grid',
  'modules.07.plane.grid.hint': 'Garisnya sepatutnya setajam di penjuru sebagaimana di tengah. Kabur di tepi ialah soal penskalaan imej.',
  'modules.07.warn': 'Corak menutup seluruh skrin, termasuk papan pemuka kawalan dengan butang pengukurannya. Inilah satu-satunya tempat dalam aplikasi yang berlaku begitu, dan sebab itulah butang keluar dibuat besar dan sentiasa kelihatan. Selagi corak berada pada skrin, pengukuran terus berjalan dan tidak dapat dihentikan — tutup corak itu untuk kembali kepada butangnya.',
  'modules.07.cameraTitle': 'Apa yang tidak boleh anda buat di sini',
  'modules.07.camera': 'Telefon tidak melihat skrinnya sendiri, jadi corak ini tidak boleh anda ukur dengan peranti yang sama. Untuk mengukur sebuah monitor, paparkan corak itu pada monitor dan buat pengukuran dengan telefon — dua peranti yang berbeza dan dua peranan yang berbeza.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'Jadual mengingatkan anda untuk mengukur pada waktu yang ditetapkan. Ia tidak menghidupkan kamera dengan sendirinya: pada waktu yang ditentukan ia menunjukkan peringatan, dan anda memulakan pengukuran dengan butang “Mula mengukur” pada papan pemuka. Sama seperti kali pertama.',
  'modules.08.onlyOpenTitle': 'Bila ini tidak berfungsi',
  'modules.08.onlyOpen': 'Jadual hanya berfungsi semasa aplikasi terbuka. Tab pelayar yang tertutup tidak mengira masa dan tidak akan mengingatkan apa-apa. Kami tidak meminta kebenaran untuk menghantar pemberitahuan sistem dan kami tidak menghantar apa-apa ke rangkaian.',
  'modules.08.enableLabel': 'Hidupkan peringatan',
  'modules.08.timesTitle': 'Waktu',
  'modules.08.timeAriaTpl': 'Waktu {n}: jam peringatan',
  'modules.08.addKey': 'Tambah waktu',
  'modules.08.removeAriaTpl': 'Padam waktu {time}',
  'modules.08.addedTpl': 'Waktu {time} ditambah.',
  'modules.08.removedTpl': 'Waktu {time} dipadam.',
  'modules.08.badTime': 'Masukkan waktu dalam format 22:00.',
  'modules.08.nextTpl': 'Peringatan seterusnya: {time}.',
  'modules.08.nextNone': 'Peringatan dimatikan.',
  'modules.08.dueTpl': 'Waktu pengukuran yang dijadualkan: {time}.',
  'modules.08.dueKey': 'Tunjukkan papan pemuka',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'Amaran menjaga satu kuantiti dan bersuara hanya apabila kuantiti itu kekal dalam zon yang dipilih tanpa putus selama tempoh yang anda tetapkan. Ia tidak pernah menghentikan pengukuran dan tidak pernah menutup butang.',
  'modules.09.enableLabel': 'Hidupkan amaran',
  'modules.09.metricLabel': 'Kuantiti yang dijaga',
  'modules.09.levelLabel': 'Daripada zon yang mana',
  'modules.09.levelWarning': 'Daripada awas ke atas',
  'modules.09.levelCritical': 'Kritikal sahaja',
  'modules.09.sustainLabel': 'Selepas berapa saat tanpa putus',
  'modules.09.sustainHint': 'Tempoh yang lebih singkat memberi lebih banyak penggera palsu apabila anda menggerakkan telefon. Kami tidak turun di bawah lima saat.',
  'modules.09.soundLabel': 'Bunyi bip yang ringkas',
  'modules.09.soundHint': 'Bunyi itu terhasil pada peranti. Tiada apa-apa yang dimuat turun daripada rangkaian.',
  'modules.09.cooldownHint': 'Paling banyak satu amaran setiap dua minit. Penggera yang berulang pada setiap sampel ialah penggera yang akan dimatikan untuk selamanya.',
  'modules.09.whenNotTitle': 'Bila amaran tidak berfungsi',
  'modules.09.whenNot': 'Pemberitahuan itu berada di dalam aplikasi, bukan dalam sistem. Ia tidak berfungsi apabila aplikasi ditutup atau tersembunyi di latar belakang, apabila pengukuran tidak berjalan, dan apabila kuantiti yang dijaga tidak dapat diukur pada saat itu. Kami tidak meminta kebenaran untuk menghantar pemberitahuan sistem.',
  'modules.09.firedTpl': '{name}: {zone} selama {sec} s — sekarang {value}.',
  'modules.09.saved': 'Tetapan amaran disimpan.',
  'modules.09.statusOnTpl': 'Sedang menjaga: {name}, {level}, selepas {sec} s.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'Aplikasi ini percuma',
  'support.freeText': 'Ketujuh-tujuh kuantiti menunjukkan nombor sejak kali pertama dijalankan. Perakam, ambang, penentukuran, laporan, eksport, perbandingan sesi dan keseluruhan sejarah tiga puluh hari berfungsi tanpa akaun, tanpa bayaran dan tanpa had — begitu juga di luar talian. Tiada apa-apa di sini yang ditahan di sebalik bayaran untuk kemudian.',
  'support.whyTitle': 'Mengapa saya meminta',
  'support.whyText': 'Monitor Cahaya saya buat dan selenggara sendiri, di luar waktu kerja. Sokongan itu pergi kepada masa yang diperlukan untuk pembetulan, untuk ujian pada lebih banyak telefon dan untuk alat seterusnya dalam senarai modul. Tiada apa-apa yang akan berhenti berfungsi jika tiada sesiapa membayar apa-apa.',
  'support.nothingTitle': 'Apa yang anda dapat daripada derma',
  'support.nothingText': 'Tiada apa-apa. Tiada nombor, tiada modul dan tiada tetapan yang terbuka selepas derma, kerana semuanya sudah terbuka sejak awal. Yang tinggal hanyalah saya tahu ia berguna kepada seseorang.',
  'support.keyTitle': 'Jika anda mahu membantu',
  'support.keyLabel': 'Belanja saya kopi',
  'support.keyAria': 'Belanja saya kopi — membuka halaman luar dalam tab baharu',
  'support.serviceText': 'Profil derma itu dikendalikan oleh perkhidmatan luar, contohnya Buy Me a Coffee. Aplikasi tidak memuatkan sebarang skrip, widget atau imej daripadanya — yang berdiri di sini hanyalah pautan biasa dan tiada apa-apa selain itu.',
  'support.privacyText': 'Menekan butang ini membuka halaman luar dalam tab baharu, dan itulah satu-satunya saat apabila ada sesuatu meninggalkan peranti ini. Pengukuran, sejarah dan tetapan kekal di tempatnya — dalam storan pelayar ini.',
  'support.privacyPendingText': 'Apabila alamatnya tersedia nanti, menekan butang itu akan membuka halaman luar dalam tab baharu dan itulah nanti satu-satunya saat apabila ada sesuatu meninggalkan peranti ini. Pengukuran, sejarah dan tetapan kekal di tempatnya — dalam storan pelayar ini.',
  'support.emptyTitle': 'Profil belum disambungkan',
  'support.emptyText': 'Alamat profil derma belum dimasukkan, jadi tiada butang di sini yang akan membawa ke mana-mana. Aplikasi selebihnya berfungsi seperti biasa — tiada apa-apa yang menunggu derma itu.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'Apa yang TIDAK diukur oleh aplikasi ini',
  'docs.notList.1': 'Ia tidak mengukur spektrum. Kamera mempunyai tiga saluran warna yang lebar, pendedahan automatik dan imbangan putih automatik.',
  'docs.notList.2': 'Ia tidak mengukur nilai mutlak. Kecerahan pemandangan ialah penunjuk relatif, bukan hasil pengukuran fotometrik.',
  'docs.notList.3': 'Ia tidak mengukur suhu warna secara langsung. Suhu warna dan kesan sirkadian ialah anggaran yang dikira daripada warna asas sRGB.',
  'docs.notList.4': 'Ia tidak melihat kelipan sesalur elektrik. Pensampelan 5 Hz hanya melihat denyutan di bawah 2.5 Hz — kelipan sesalur 100 Hz berada di luar jangkauan dan aplikasi tidak akan sekali-kali melaporkannya sebagai bacaan.',
  'docs.notList.5': 'Ia tidak membuat diagnosis dan tidak memberi nasihat kesihatan. Tiada satu pun bacaan yang merupakan salah satu daripadanya.',
  'docs.notList.6': 'Ia tidak membandingkan cahaya anda dengan sebarang rujukan rasmi. Ambang ialah tetapan yang boleh anda ubah dalam modul 02.',
  'docs.whatTitle': 'Apa yang diukurnya, dan bagaimana',
  'docs.whatLead': 'Kamera telefon memandang permukaan yang bercahaya, dan lima kali sesaat aplikasi mengira purata saluran R, G dan B daripada bahagian tengah bingkai. Daripada tiga nombor itu ia menerbitkan tujuh bacaan.',
  'docs.whatCrop': 'Bahagian itu ialah 60% lebar dan 60% tinggi bingkai di tengah — tepat segi empat tepat yang dibingkai oleh pembidik pada skrin MEMBIDIK. Tiada apa-apa di luarnya dikira.',
  'docs.whatRate': 'Satu sampel setiap 200 ms, iaitu 5 kali sesaat. Minit terakhir berada dalam ingatan pada resolusi penuh; semua yang lebih lama disimpan setiap 5 saat dan mencapai tiga puluh hari ke belakang.',
  'docs.metricsTitle': 'Tujuh kuantiti',
  'docs.formulasTitle': 'Formula',
  'docs.formula.share.formula': 'bahagian biru = B / (R + G + B) × 100%',
  'docs.formula.share.text': 'Dikira pada nilai sRGB tanpa membalikkan gamma — dengan sengaja, kerana itulah takrif yang sama seperti dalam versi aplikasi sebelum ini, jadi ambang yang ditetapkan dahulu masih bermaksud perkara yang sama. Ia mengasingkan warna daripada kecerahan.',
  'docs.formula.brightness.formula': 'kecerahan = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': 'Nilai purata saluran sebagai peratusan julat. Pendedahan automatik mengalihkannya di sebalik tabir, jadi ia penunjuk relatif — bandingkan dua pemandangan dan jangan membaca satu nombor sebagai hasil pengukuran.',
  'docs.formula.kelvin.title': 'Suhu warna — anggaran McCamy',
  'docs.formula.kelvin.formula': 'n = (x − 0.3320) / (y − 0.1858)\nCCT = −449 n³ + 3525 n² − 6823.3 n + 5520.33',
  'docs.formula.kelvin.text': 'Mula-mula kami membalikkan gamma sRGB, kemudian melalui matriks ke CIE XYZ bagi titik putih D65 dan mengira kromatisiti x, y. Formula McCamy boleh dipercayai lebih kurang antara 2000 K hingga 12500 K. Di luar julat itu kubiknya terpesong, jadi hasilnya dipangkas dan ditandakan sebagai tidak boleh dipercayai — garis dasar skala kemudiannya menjadi putus-putus dan ayat “di luar julat kaedah ini” muncul.',
  'docs.formula.melanopic.title': 'Kesan sirkadian — nisbah melanopik',
  'docs.formula.melanopic.formula': 'mel = 0.0016 R + 0.3110 G + 0.8460 B\nY = 0.2127 R + 0.7152 G + 0.0722 B\nhasil = (mel / Y) × penormalan kepada 1.00 bagi putih neutral',
  'docs.formula.melanopic.text': 'Ketiga-tiga saluran dalam nilai linear. Kuantiti yang sebenar ialah kamiran spektrum dengan lengkung kepekaan melanopsin (puncaknya sekitar 490 nm); kamera mempunyai tiga saluran yang lebar, jadi kami memberati warna asas sRGB dengan kepekaan melanopik pada panjang gelombang anggarannya (R 612 nm, G 549 nm, B 465 nm). Arah perubahannya boleh dipercayai, nilai mutlaknya tidak — sebab itulah nombor ini membawa tanda “≈”.',
  'docs.formula.flicker.formula': 'kelipan = (maks − min) / (maks + min) × 100%',
  'docs.formula.flicker.text': 'Takrif IES, dikira daripada tetingkap sampel kecerahan. Kami menganggarkan frekuensinya daripada bilangan kali isyarat itu melintasi nilai puratanya. Pensampelan 5 Hz hanya melihat modulasi di bawah 2.5 Hz (had Nyquist), dan kami menerima sesuatu frekuensi sebagai boleh dipercayai hanya antara 0.2 hingga 2 Hz pada amplitud daripada 0.5% ke atas — di bawah ambang itu, lintasan pada purata ialah hingar penderia, bukan sumber yang berdenyut.',
  'docs.formula.uniformity.formula': 'kesekataan = petak paling gelap / petak paling cerah × 100%',
  'docs.formula.uniformity.text': 'Kami membahagikan bahagian itu kepada sembilan petak dalam grid 3×3 dan membandingkan yang melampau. 100% ialah cahaya yang tersebar dengan sekata sempurna. Nilai rendah pada skrin bermakna lelehan lampu latar atau pantulan; di atas meja ia bermakna lampu yang salah letak. Inilah satu-satunya kuantiti, bersama keselesaan, yang lebih tinggi bermakna lebih baik.',
  'docs.formula.comfort.formula': '100 markah tolak penalti:\nkesan sirkadian melebihi 0.75 — sehingga 35 markah\nwarna melebihi 4000 K — sehingga 25 markah\nkelipan melebihi 5% — sehingga 25 markah\nkesekataan di bawah 60% — sehingga 15 markah',
  'docs.formula.comfort.text': 'Satu penilaian menggantikan enam nombor. Kuantiti yang tidak dapat diukur tidak membawa sebarang penalti — data yang tiada tidak pernah menyamar sebagai hasil yang baik. Pemberatnya ialah pertimbangan editorial kami, bukan sesuatu piawaian; sebab itulah modul 01 menunjukkan pecahannya kepada komponen, supaya penilaian itu boleh dipertikaikan.',
  'docs.rangesTitle': 'Julat dan ambang',
  'docs.rangesLead': 'Ambang di bawah ialah ambang yang berkuat kuasa sekarang — jika anda mengubahnya dalam modul 02, jadual ini menunjukkan nilai anda, bukan nilai kilang.',
  'docs.dirNormal': 'lebih rendah bermakna lebih lembut',
  'docs.dirInvert': 'lebih tinggi bermakna lebih baik',
  'docs.privacyTitle': 'Data dan privasi',
  'docs.privacyText': 'Imej daripada kamera tidak dihantar mahupun disimpan ke mana-mana — daripada setiap bingkai hanya tiga nombor yang tinggal. Pengukuran, ambang dan tetapan berada dalam storan pelayar pada peranti ini. Aplikasi tidak membuat sebarang permintaan rangkaian dan berfungsi di luar talian.',
  'docs.mdrTitle': 'Penafian',
  'docs.freeText': 'Aplikasi ini percuma sepenuhnya dan akan kekal begitu: ketujuh-tujuh kuantiti, sejarah, laporan, eksport dan mod luar talian berfungsi tanpa akaun, tanpa bayaran dan tanpa had. Sesiapa yang mahu mengucapkan terima kasih akan menemui modul 10, “Sokongan”.',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'Aplikasi dimuatkan secara tidak lengkap',
  'boot.filesTpl': 'Fail ini tidak dimuatkan: {list}.',
  'boot.modulesTpl': 'Modul ini tidak melapor diri: {list} — entri itu tidak akan terbuka daripada senarai.',
  'boot.modulesRangeTpl': 'modul {from}–{to}',
  'boot.tail': 'Muat semula halaman. Jika itu tidak membantu, fail pada pelayan tidak lengkap.',
  'boot.loss.bus': 'modul tidak lagi saling melihat dan pengukuran tidak akan bermula',
  'boot.loss.metrics': 'tiada satu nilai pun akan dikira',
  'boot.loss.scaleCore': 'geometri skala dan pemformatan nombor akan hilang',
  'boot.loss.scaleText': 'semua label antara muka akan hilang',
  'boot.loss.shell': 'tiada modul yang boleh dibuka',
  'boot.loss.engine': 'kamera dan pengukuran tidak akan bermula',
  'boot.loss.dash': 'papan pemuka akan kekal kosong'
});
