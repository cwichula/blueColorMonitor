/* Monitor Światła v5 — słownik malajski (Bahasa Melayu).
 *
 * TREŚĆ wzięta z pl.js, TERMINOLOGIA i rejestr — z en.js. Nie jest to kalka
 * żadnego z nich ani przepisany indonezyjski: malajski malezyjski ma własne
 * słownictwo interfejsu („pelayar”, „fail”, „muat semula”, „tetapan”, „lalai”),
 * własną ortografię („baharu”, „eksport”, „saiz”) i kropkę dziesiętną zamiast
 * przecinka. Bez zmian zostało to, co niesie znaczenie: liczby, progi,
 * jednostki, nazwy wstawek oraz — CO DO TREŚCI — zastrzeżenia medyczne
 * i zdania o prywatności. Tych ostatnich nie wolno osłabiać ani wzmacniać:
 * „nie zastępuje rozmowy z lekarzem” ma po malajsku znaczyć dokładnie tyle
 * samo, a „obraz nie opuszcza urządzenia” nie może stać się obietnicą szerszą
 * niż polska.
 *
 * REJESTR: forma grzecznościowa „anda”, pisana małą literą (to malezyjski uzus;
 * wielkie „Anda” jest indonezyjskie) i używana oszczędnie — malajski opuszcza
 * zaimek tam, gdzie polski go stawia.
 *
 * TERMINOLOGIA siedmiu wielkości (trzymana bez wyjątków, także w tekstach
 * pomocy i w zdaniach opisowych):
 *   Bahagian biru (udział niebieskiego), Kecerahan pemandangan (jasność sceny),
 *   Suhu warna (temperatura barwowa), Kesan sirkadian (wpływ na rytm dobowy;
 *   w opisie: nisbah melanopik — współczynnik melanopiczny), Kelipan
 *   (migotanie), Keseragaman (równomierność), Keselesaan visual (komfort
 *   wzrokowy).
 * STREFY: selamat / sederhana / memudaratkan — mówią o świetle, a nie o stanie
 * aplikacji, i wchodzą w zdanie „zon: {zone}”.
 *
 * LICZBY: kropka dziesiętna (1.00 — 0.50), tak jak formatuje `Intl` dla „ms”;
 * procent bez odstępu (40%). Zegar jest dwunastogodzinny z „PG/PTG”, bo tak ICU
 * formatuje godzinę dla tego języka — stąd napis-wzorzec 'chart.sample.clock'.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Tekst ze wstawką {nazwa}'   — napis zwykły,
 *   'klucz.kropkowany': { other }                    — forma zależna od liczby.
 * Malajski ma w CLDR JEDNĄ kategorię liczebnika: `other`. Rzeczownik nie
 * odmienia się przez liczbę, więc forma jest jedna. Nazwy wstawek są identyczne
 * jak w pl.js — pilnuje tego keys.test.js. Kolejność wstawek w zdaniu wolno
 * zmieniać, nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Monitor Cahaya',
  'app.description': 'Monitor Cahaya — kamera anda mengukur tujuh besaran cahaya di sekeliling anda. Semuanya dikira pada peranti ini; tiada apa-apa yang keluar ke rangkaian.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Monitor Cahaya',
  'app.skipToContent': 'Langkau ke kandungan',
  'app.nav.aria': 'Navigasi utama',
  'app.noscript.title': 'Aplikasi ini memerlukan JavaScript',
  'app.noscript.text': 'Seluruh pengukuran berlaku di dalam tab pelayar ini: JavaScript yang membaca bingkai daripada kamera dan mengira tujuh besaran cahaya daripadanya. Tanpanya, tiada apa-apa untuk mengukur. Hidupkan JavaScript untuk halaman ini dan bukanya semula — tetap tiada apa-apa yang dihantar ke rangkaian.',

  'nav.measure': 'Ukur',
  'nav.history': 'Sejarah',
  'nav.tools': 'Alat',
  'nav.support': 'Sokongan',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Mengukur',
  'shell.live.aria': 'Mengukur. {metric}: {value}. Kembali ke skrin pengukuran.',
  'shell.live.metricFallback': 'Besaran utama',
  'shell.action.fallback': 'Tindakan skrin',

  'shell.loadFail.title': 'Skrin “{screen}” gagal dimuatkan',
  'shell.loadFail.text': 'Sebahagian fail mungkin hilang daripada storan peranti. Sambung ke rangkaian dan muat semula halaman.',
  'shell.fatal.title': 'Ada sesuatu yang tidak kena',
  'shell.fatal.text': 'Aplikasi gagal menyusun skrin. Memuat semula halaman biasanya sudah memadai — pengukuran dan tetapan yang tersimpan kekal di tempatnya.',
  'shell.fatal.reload': 'Muat semula halaman',
  'shell.boot.failTitle': 'Aplikasi gagal dimulakan',
  'shell.boot.failText': 'Kerangka aplikasi tidak berjalan. Muat semula halaman — pengukuran dan tetapan yang tersimpan kekal di tempatnya.',
  'shell.background.error': 'Ada sesuatu yang rosak di latar belakang',
  'shell.background.action': 'Muat semula',
  'shell.update.title': 'Versi baharu tersedia',
  'shell.update.action': 'Muat semula',

  'onboarding.title': 'Sebelum anda mula',
  'onboarding.lead': 'Monitor Cahaya menggunakan kamera untuk melihat cahaya di sekeliling anda dan mengira tujuh besaran daripadanya — daripada bahagian biru hingga keselesaan visual.',
  'onboarding.privacy': 'Imej tidak pernah meninggalkan peranti ini: tiada pelayan, tiada akaun dan tiada apa-apa yang dimuat naik. Ketujuh-tujuh besaran berfungsi serta-merta, tanpa log masuk dan tanpa bayaran.',
  'onboarding.honesty': 'Ini panduan kasar, bukan alat ukur dan bukan pemeriksaan perubatan. Apa yang tidak dapat diukur tidak ditunjukkan — bukannya nombor, anda akan lihat sengkang.',
  'onboarding.start': 'Mari mula',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Gunakan',
  'overlay.toast.close': 'Tutup mesej',
  'overlay.sheet.label': 'Dialog',
  'overlay.sheet.close': 'Tutup',
  'overlay.dialog.confirm': 'Sahkan',
  'overlay.dialog.cancel': 'Batal',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'Batal',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'Ukur',

  'measure.intro.aria': 'Mulakan pengukuran',
  'measure.intro.headline': 'Lihat cahaya yang menyinari anda',
  'measure.intro.lead': 'Kamera menunjukkan berapa banyak biru dalam cahaya yang sedang jatuh pada anda — dan sama ada itu terlalu banyak untuk waktu ini.',
  'measure.intro.start': 'Mula mengukur',
  'measure.intro.hint': 'Pelayar akan meminta kebenaran menggunakan kamera. Pengukuran bermula sebaik sahaja kebenaran diberikan.',
  'measure.intro.privacy': 'Imej kamera diproses pada peranti ini dan tidak pernah meninggalkannya. Kami tidak menghantar, menyimpan atau berkongsi satu bingkai pun.',
  'measure.intro.honesty': 'Ini bukan peranti perubatan dan bukan pemeriksaan. Aplikasi menunjukkan anggaran cahaya di sekeliling anda; ia tidak menilai kesihatan anda dan tidak menggantikan perbualan dengan doktor.',

  'measure.live.aria': 'Pengukuran sedang berjalan',
  'measure.badge.starting': 'Memulakan',
  'measure.badge.paused': 'Dijeda',
  'measure.badge.running': 'Mengukur',
  'measure.stale': 'Menunggu imej — pratonton membeku semasa aplikasi berada di latar belakang.',
  'measure.crop': 'Kami mengukur bahagian tengah bingkai — {percent}% lebar dan tinggi imej yang ditanda.',
  'measure.facing.front': 'kamera depan',
  'measure.facing.back': 'kamera belakang',

  'measure.boot.title': 'Menghidupkan kamera…',
  'measure.boot.text': 'Jika pelayar meminta kebenaran, berikannya — tanpa imej tiada apa-apa untuk diukur. Kebenaran ini hanya untuk halaman ini dan boleh anda tarik balik kemudian.',
  'measure.boot.cancel': 'Batal',

  'measure.hold': 'Bacaan dibekukan. Kamera terus berjalan, tetapi tiada apa-apa yang masuk ke sejarah mahupun ke purata.',
  'measure.gridHint': 'Pilih petak untuk memindahkan besaran itu ke tolok besar.',

  'measure.stop': 'Henti',
  'measure.pause': 'Jeda',
  'measure.resume': 'Sambung',
  'measure.flip.aria': 'Tukar kamera',
  'measure.flip.toBack': 'Tukar ke kamera belakang',
  'measure.flip.toFront': 'Tukar ke kamera depan',

  'measure.fail.aria': 'Ralat kamera',
  'measure.fail.headline': 'Kamera tidak hidup',
  'measure.fail.retry': 'Cuba lagi',
  'measure.fail.back': 'Kembali',
  'measure.fail.savedSession': 'Sesi sebelum gangguan ({duration}) telah disimpan dalam sejarah.',
  'measure.error.fallback': 'Kamera tidak dapat dihidupkan.',

  'measure.summary.aria': 'Ringkasan sesi',
  'measure.summary.title': 'Ringkasan sesi',
  'measure.summary.paused': 'dijeda {duration}',
  'measure.summary.nothingMeasured': 'Tiada besaran yang mengumpul bacaan — kamera tidak melihat cahaya sepanjang sesi.',
  'measure.summary.note': 'Purata hanya mengira sampel di luar jeda. Besaran yang tidak sempat diukur ditinggalkan, bukan dikira sebagai sifar.',
  'measure.summary.nearThreshold': 'Paling hampir ambang',
  'measure.summary.worstPoint': 'Titik paling lemah',
  'measure.summary.averageZone': 'purata {zone}',
  'measure.summary.tooShort': 'Sesi berlangsung {duration} — terlalu singkat untuk masuk sejarah dengan sendirinya. Anda boleh menyimpannya secara manual.',
  'measure.summary.again': 'Ukur lagi',
  'measure.summary.save': 'Simpan ke sejarah',
  'measure.summary.saved': 'Tersimpan dalam sejarah',
  'measure.summary.savedToast': 'Sesi disimpan dalam sejarah.',
  'measure.summary.close': 'Tutup',

  'measure.method.title': 'Bagaimana kami mengukurnya',
  'measure.method.p1': 'Aplikasi mengambil sampel imej kamera sepuluh kali sesaat dan mengira besaran daripada {percent}% bahagian tengah bingkai — pembidik dalam pratonton menanda tepat kawasan itu.',
  'measure.method.p2': 'Kamera telefon mempunyai tiga saluran yang lebar serta pembetulan dedahan dan imbangan putih automatiknya sendiri. Ia melihat kadar cahaya, bukan spektrumnya.',
  'measure.method.p3': 'Bahagian biru, kecerahan, kelipan dan keseragaman ialah apa yang benar-benar diukur oleh kamera. Suhu warna dan kesan sirkadian ialah anggaran yang kami nyatakan secara terbuka, dikira daripada warna primer sRGB.',
  'measure.method.p4': 'Kelipan hanya kelihatan di bawah empat hertz. Kelipan bekalan elektrik pada 100 Hz jauh di luar jangkauan kadar pensampelan ini dan tidak akan sekali-kali dilaporkan sebagai bacaan.',
  'measure.method.p5': 'Tiada satu pun daripada nombor ini merupakan pengukuran fotometrik atau keputusan perubatan. Imej kamera tidak meninggalkan peranti.',
  'measure.method.ok': 'Faham',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'Penghidupan kamera dibatalkan.',
  'measure.announce.stoppedNoSamples': 'Pengukuran dihentikan. Tiada sampel dikumpulkan.',
  'measure.announce.stopped': 'Pengukuran dihentikan. Ringkasan sesi sudah sedia.',
  'measure.announce.interrupted': 'Pengukuran terputus. Ringkasan sesi sudah sedia.',
  'measure.announce.paused': 'Pengukuran dijeda. Bacaan dibekukan.',
  'measure.announce.resumed': 'Pengukuran disambung semula.',
  'measure.announce.switchedFront': 'Beralih ke kamera depan. Sesi baharu bermula.',
  'measure.announce.switchedBack': 'Beralih ke kamera belakang. Sesi baharu bermula.',
  'measure.announce.lead': 'Besaran utama: {metric}.',
  'measure.announce.cameraError': 'Ralat kamera. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'Cahaya kekal dalam julat selamat sepanjang sesi — biarkan lampu seperti sedia ada dan periksa semula selepas gelap, apabila sumber cahaya lain yang bekerja.',
  'measure.advice.share.evening': 'Bahagian biru purata {value} — hidupkan mod malam pada skrin anda dan padamkan lampu siling, tinggalkan satu lampu suam pada aras meja.',
  'measure.advice.share.day': 'Bahagian biru purata {value} — pada waktu siang ini masih boleh diterima, tetapi tetapkan skrin supaya beralih ke mod suam secara automatik dua jam sebelum tidur.',
  'measure.advice.brightness': 'Bingkai terlebih dedah (purata {value}) — jauhkan diri daripada sumber cahaya atau turunkan kecerahan skrin yang diukur, kerana pada dedahan sebegitu besaran lain turut kehilangan ketepatan.',
  'measure.advice.kelvin.evening': 'Suhu warna kekal purata {value} — selepas gelap, turun di bawah 3000 K: tukar lampu ke mod suam atau pasang mentol 2700 K.',
  'measure.advice.kelvin.day': 'Suhu warna kekal purata {value} — putih yang baik dan mencergaskan untuk waktu siang, tetapi pada waktu malam tetapkan lampu yang sama ke 2700 K.',
  'measure.advice.melanopic.evening': 'Kesan sirkadian purata {value} — dalam dua jam sebelum tidur, turun di bawah 0.50 ×, dengan memalapkan lampu utama dan menyinari dari aras meja dan bukan dari siling.',
  'measure.advice.melanopic.day': 'Kesan sirkadian purata {value} — pada waktu ini dos sebanyak itu membantu, tetapi pada waktu malam gantikan sumber ini dengan yang lebih lemah dan lebih suam.',
  'measure.advice.flicker': 'Kelipan mencapai purata {value} — biasanya kerana pemalap atau lampu latar yang ditetapkan rendah: naikkan kecerahan skrin melebihi 40% atau ganti pemalap dengan yang tidak menggunakan PWM.',
  'measure.advice.uniformity': 'Cahaya jatuh tidak sekata (purata {value}) — letakkan lampu di sisi meja dan tambah sumber kedua yang lebih lemah dari arah bertentangan, dan bukan satu titik yang kuat.',
  'measure.advice.comfort': 'Keselesaan visual purata {value} — mulakan dengan satu perubahan: kurangkan kecerahan sumber utama kepada separuh, barulah kemudian uruskan warna cahayanya.',
  'measure.advice.default': 'Ubah satu perkara pada pencahayaan anda dan ukur semula — membandingkan dua sesi memberitahu lebih banyak daripada satu bacaan.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'Sejarah',
  'history.action.export': 'Eksport sejarah',

  'history.metricGroup.aria': 'Pilihan besaran',
  'history.announce.metric': 'Besaran: {metric}',
  'history.rangeGroup.aria': 'Julat masa',
  'history.range.aria': '{range} terakhir',

  'history.stats.title': 'Statistik julat',
  'history.stats.head': '{metric}\u00A0—\u00A0{range} terakhir',
  'history.stats.note': 'Dikira daripada apa yang kelihatan pada carta. Masa tanpa pengukuran tidak dikira sama sekali — kami tidak meletakkan sifar sebagai gantinya.',
  'history.stat.min': 'Minimum',
  'history.stat.avg': 'Purata',
  'history.stat.max': 'Maksimum',
  'history.trend.up': 'meningkat dalam julat ini',
  'history.trend.flat': 'tiada perubahan ketara',
  'history.trend.down': 'menurun dalam julat ini',
  'history.trend.none': 'tiada bahan perbandingan',

  'history.sessions.title': 'Sesi pengukuran',
  'history.sessions.count': '{sessions}, terbaharu dahulu',
  'history.sessions.empty': 'Belum ada sesi',
  'history.sessions.hint': 'Sesi disimpan sebaik sahaja anda menghentikan pengukuran.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'julat: {range}',
  'history.session.noMeasure': 'tiada yang diukur',

  'history.data.title': 'Data',
  'history.data.subtitle': 'Sejarah disimpan pada peranti ini sahaja.',
  'history.export.csv': 'Eksport CSV',
  'history.export.json': 'Eksport JSON',
  'history.export.ok': 'Fail sedia untuk disimpan',
  'history.export.fail': 'Fail gagal disediakan. Dalam mod peribadi, dan dalam tetingkap yang terbenam dalam aplikasi lain, pelayar menyekat penyimpanan — buka halaman ini dalam tab biasa.',
  'history.export.sheet.title': 'Eksport sejarah',
  'history.export.sheet.text': 'CSV terbuka dalam hamparan (dipisahkan koma bertitik, koma sebagai tanda perpuluhan). JSON menyimpan segalanya, termasuk senarai sesi dan jurang tempat tiada apa-apa diukur.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Kosongkan sejarah',
  'history.clear.title': 'Kosongkan sejarah?',
  'history.clear.text': 'Ini akan memadam {points} dan {sessions}. Tindakan ini tidak boleh dibatalkan — jika anda mahu menyimpan datanya, eksport dahulu.',
  'history.clear.confirm': 'Kosongkan',
  'history.clear.announce': 'Sejarah dikosongkan.',
  'history.clear.toast': 'Sejarah dikosongkan',

  'history.empty.title': 'Belum ada apa-apa untuk ditunjukkan',
  'history.empty.text': 'Sejarah terisi semasa anda mengukur — satu titik sesaat. Semuanya kekal pada peranti ini.',
  'history.empty.action': 'Pergi ke pengukuran',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 min',
  'range.5m': '5 min',
  'range.1h': '1 jam',
  'range.24h': '24 jam',
  'range.7d': '7 hari',
  'range.30d': '30 hari',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Tarikh dan masa',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'Storan peranti sudah penuh — pengukuran baharu tidak lagi disimpan.',
  'storage.blocked': 'Pelayar tidak membenarkan sejarah disimpan — data akan hilang selepas tab ditutup.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Alat',
  'tools.action.about': 'Tentang pengukuran',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Bahasa',
  'tools.language.subtitle': 'Secara lalai aplikasi mengikut bahasa peranti anda; pilihan daripada senarai ini berkuat kuasa serta-merta dan kekal dalam pelayar ini.',
  'tools.language.aria': 'Bahasa antara muka',
  'tools.language.system': 'Auto',
  'tools.language.announce': 'Bahasa antara muka: {language}.',

  'tools.appearance.title': 'Penampilan',
  'tools.appearance.theme.title': 'Tema',
  'tools.appearance.theme.desc': '“Auto” mengikut tetapan sistem anda.',
  'tools.appearance.theme.aria': 'Tema',
  'tools.theme.system': 'Auto',
  'tools.theme.light': 'Terang',
  'tools.theme.dark': 'Gelap',
  'tools.appearance.accent.title': 'Warna aksen',
  'tools.appearance.accent.desc': 'Warna butang, pilihan dan peluncur.',
  'tools.appearance.accent.aria': 'Warna aksen',
  'tools.appearance.textScale.title': 'Saiz teks',
  'tools.appearance.textScale.desc': 'Membesarkan seluruh antara muka, bukan label sahaja.',
  'tools.appearance.textScale.aria': 'Saiz teks',
  'tools.appearance.density.title': 'Kepadatan',
  'tools.appearance.density.desc': 'Padat memuatkan lebih banyak kandungan dalam satu skrin.',
  'tools.appearance.density.aria': 'Kepadatan susun atur',
  'tools.density.comfortable': 'Selesa',
  'tools.density.compact': 'Padat',
  'tools.appearance.motion.title': 'Kurangkan gerakan',
  'tools.appearance.motion.desc': 'Mematikan animasi dan gerakan meluncur jarum. Tetapan sistem anda tetap kami patuhi, apa pun pilihan di sini.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Lautan',
  'accent.violet': 'Ungu',
  'accent.amber': 'Ambar',
  'accent.mint': 'Pudina',
  'accent.rose': 'Mawar',

  'tools.thresholds.title': 'Ambang',
  'tools.thresholds.subtitle': 'Mulai nilai berapa aplikasi patut berkata “sederhana”, dan mulai berapa “kritikal”. Ambang lalai ialah cadangan kami, bukan piawai — tetapkan mengikut keperluan anda.',
  'tools.thresholds.warn': 'Ambang amaran',
  'tools.thresholds.crit': 'Ambang penggera',
  'tools.thresholds.warn.aria': 'Ambang amaran — {metric}',
  'tools.thresholds.crit.aria': 'Ambang penggera — {metric}',
  'tools.thresholds.reset': 'Lalai',
  'tools.thresholds.reset.aria': 'Pulihkan ambang lalai: {metric}',
  'tools.thresholds.moved': '{threshold} dialihkan ke {value}.',
  'tools.thresholds.resetAll': 'Pulihkan semua ambang',
  'tools.thresholds.resetAll.title': 'Pulihkan ambang lalai?',
  'tools.thresholds.resetAll.text': 'Ketujuh-tujuh besaran akan kembali kepada ambang yang dicadangkan aplikasi. Sejarah pengukuran anda kekal tidak tersentuh.',
  'tools.thresholds.resetAll.confirm': 'Pulihkan',
  'tools.thresholds.resetAll.cancel': 'Biarkan',
  'tools.thresholds.resetAll.toast': 'Ambang kembali kepada lalai',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'melebihi {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} ke bawah',
  'tools.zoneRange.goodBelow': 'di bawah {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} ke atas',

  'tools.calibration.title': 'Kalibrasi',
  'tools.calibration.subtitle': 'Untuk mereka yang ada bahan perbandingan.',
  'tools.calibration.intro': 'Dua telefon yang dihalakan ke lampu yang sama akan menunjukkan angka yang sedikit berbeza — setiap penderia ada rona tersendiri. Jika anda ada bacaan yang anda percayai, di sini anda boleh menaikkan atau menurunkan sedikit setiap saluran imej. Pengganda bekerja sebelum apa-apa dikira, jadi ia mengubah ketujuh-tujuh besaran sekali gus.',
  'tools.calibration.neutral': 'Tiada bahan perbandingan? Biarkan pada 1.00 — itulah tetapan kilang dan ia tidak merosakkan apa-apa.',
  'tools.calibration.forward': 'Perubahan berkuat kuasa mulai sekarang. Pengukuran yang sudah ada dalam sejarah kekal seperti pada saat ia disimpan — kami tidak mengiranya semula, kerana itu bermakna menulis semula data selepas ia berlaku.',
  'tools.calibration.reset': 'Set semula kalibrasi',
  'tools.calibration.reset.toast': 'Kalibrasi diset semula',
  'tools.calibration.channel.r': 'Saluran merah',
  'tools.calibration.channel.g': 'Saluran hijau',
  'tools.calibration.channel.b': 'Saluran biru',
  'tools.calibration.channel.aria': '{channel} — pengganda kalibrasi',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'Pengukuran',
  'tools.measurement.wake.title': 'Biarkan skrin menyala',
  'tools.measurement.wake.desc': 'Skrin kekal menyala semasa mengukur. Bateri akan susut lebih cepat.',
  'tools.measurement.wake.unsupported': 'Pelayar ini tidak membenarkan kami menghalang skrin daripada padam.',
  'tools.measurement.haptics.title': 'Getaran',
  'tools.measurement.haptics.desc': 'Pengesahan ringkas semasa mula, semasa berhenti dan apabila besaran bertukar.',
  'tools.measurement.haptics.unsupported': 'Peranti ini tidak melaporkan sebarang motor getaran.',

  'tools.about.title': 'Tentang pengukuran',
  'tools.about.subtitle': 'Apa sebenarnya yang dikira oleh setiap satu daripada tujuh besaran, dan di mana kejujuran kaedah ini berakhir.',
  'tools.about.scale': 'Skala: daripada {min} hingga {max}.',
  'tools.about.threshold': 'Kami memberi amaran mulai {warn} dan membunyikan penggera mulai {crit}.',
  'tools.about.thresholdInvert': 'Kami memberi amaran di bawah {warn} dan membunyikan penggera di bawah {crit}.',
  'tools.about.limitsHead': 'Apa yang pengukuran ini tidak mampu lakukan',
  'tools.about.limit.spectrum.title': 'Kamera tidak melihat warna seperti alat ukur',
  'tools.about.limit.spectrum.text': 'Kamera telefon mempunyai tiga saluran: merah, hijau dan biru. Alat pengukur cahaya memecahkannya kepada berpuluh-puluh jalur sempit. Apa yang anda lihat di sini diterbitkan daripada tiga nombor itu — dengan cara yang munasabah, tetapi ia tetap satu pengiraan, bukan spektrum yang diukur.',
  'tools.about.limit.exposure.title': 'Kamera melaraskan kecerahannya sendiri',
  'tools.about.limit.exposure.text': 'Halakan telefon ke tingkap dan kamera akan menggelapkan imej supaya ia tidak terlebih dedah. “Kecerahan pemandangan” pun turun, walaupun tiada apa-apa berubah di dalam bilik. Sebab itu bandingkan nilai ini dalam satu bidikan yang sama, bukan antara bilik.',
  'tools.about.limit.flicker.title': 'Kamera yang perlahan tidak akan menangkap kelipan pantas',
  'tools.about.limit.flicker.text': 'Kami memeriksa imej {hz} kali sesaat. Denyutan yang lebih pantas daripada {nyquist} kali sesaat boleh muncul dalam pengukuran sebegini sebagai lebih perlahan daripada yang sebenar, atau hilang sama sekali — dan kelipan daripada bekalan elektrik memang sepantas itu. Jika aplikasi menangkap sesuatu, anggaplah ia tanda “ada sesuatu berdenyut di sini”, bukan frekuensi yang diukur.',
  'tools.about.limit.medical.title': 'Ini bukan pemeriksaan perubatan dan bukan nasihat perubatan',
  'tools.about.limit.medical.text': 'Aplikasi membantu anda perasan bahawa cahaya di sekeliling terasa sejuk, terang atau tidak tenang, dan mencadangkan apa yang boleh dilakukan mengenainya. Ia tidak membuat sebarang penilaian tentang kesihatan anda dan tidak menggantikan perbualan dengan doktor atau pengukuran dengan alat ukur profesional.',
  'tools.about.privacy': 'Semuanya dikira pada peranti anda. Imej kamera tidak pernah dihantar atau disimpan ke mana-mana — hanya nombor hasil pengiraan yang masuk ke storan.',
  'tools.about.privacyPolicy': 'Dasar privasi penuh',

  'tools.data.title': 'Data',
  'tools.data.subtitle': 'Semuanya berada dalam storan pelayar ini dan tidak pernah pergi ke mana-mana dari sini.',
  'tools.data.summary.empty': 'Belum ada pengukuran yang tersimpan.',
  'tools.data.summary': 'Dalam storan: {points} dan {sessions}.',
  'tools.data.export.csv': 'Eksport CSV',
  'tools.data.export.json': 'Eksport JSON',
  'tools.data.clear': 'Kosongkan sejarah',
  'tools.data.reset': 'Tetapan lalai',
  'tools.data.reset.title': 'Pulihkan tetapan lalai?',
  'tools.data.reset.text': 'Penampilan, ambang, kalibrasi dan tetapan pengukuran akan kembali kepada keadaan asal. Sejarah pengukuran anda kekal tidak tersentuh.',
  'tools.data.reset.confirm': 'Pulihkan',
  'tools.data.reset.toast': 'Tetapan lalai dipulihkan',
  'tools.data.wipe': 'Padam semua data',
  'tools.data.wipe.title': 'Padam semua data aplikasi?',
  'tools.data.wipe.text': 'Yang akan hilang: seluruh sejarah pengukuran dan senarai sesi, ambang serta kalibrasi anda, dan tetapan penampilan. Aplikasi akan kembali kepada keadaan semasa ia mula-mula dijalankan.',
  'tools.data.wipe.note': 'Kami tidak menyimpan salinan data ini — data itu tidak pernah meninggalkan peranti ini, jadi tiada tempat untuk memulihkannya.',
  'tools.data.wipe.check': 'Saya faham ini tidak boleh dibatalkan',
  'tools.data.wipe.confirm': 'Padam semuanya',
  'tools.data.wipe.toast': 'Semua data aplikasi telah dipadam',
  'tools.data.wipe.announce': 'Semua data aplikasi telah dipadam. Tetapan kembali kepada lalai.',
  'tools.data.storage.blocked': 'Pelayar ini tidak membenarkan apa-apa disimpan secara kekal (mod peribadi, atau data tapak disekat). Semua yang anda tetapkan di sini akan hilang selepas tab ditutup.',
  'tools.data.storage.full': 'Storan pelayar sudah penuh dan pengukuran baharu tidak lagi disimpan. Mengosongkan sejarah akan membebaskan ruang.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Sokongan',
  'support.free.title': 'Semuanya tersedia',
  'support.free.lead': 'Ketujuh-tujuh besaran, sejarah penuh, ambang, kalibrasi dan eksport berfungsi sejak kali pertama dijalankan — tanpa akaun, tanpa had dan tanpa bayaran.',
  'support.free.note': 'Pengukuran dikira sepenuhnya pada peranti ini dan berfungsi tanpa rangkaian. Tiada versi yang lebih baik yang kami simpan di sebalik tembok di sini.',
  'support.why.title': 'Mengapa saya meminta',
  'support.why.lead': 'Monitor Cahaya dibina di luar waktu kerja, tanpa iklan, tanpa penaja dan tanpa syarikat di belakangnya. Sokongan membayar masa untuk pembetulan, untuk besaran baharu dan untuk mengekalkan apa yang sudah berfungsi.',
  'support.what.title': 'Apa yang anda dapat daripada derma',
  'support.what.lead': 'Tiada apa-apa. Derma tidak membuka apa-apa — tiada ciri tambahan, tiada lencana di sebelah nama, tiada keutamaan. Semua yang aplikasi ini mampu lakukan sudah pun anda miliki.',
  'support.what.note': 'Yang tinggal hanyalah saya tahu ia berguna kepada seseorang. Itu benar-benar alasan yang memadai.',
  'support.cta.title': 'Jika anda mahu membantu',
  'support.cta.button': 'Belanja saya kopi',
  'support.cta.nolink': 'Profil derma belum disambungkan. Apabila ia ada, sebuah butang akan berdiri di tempat ini.',
  'support.cta.privacy': 'Pautan ini membuka halaman luaran Buy Me a Coffee dalam tab baharu. Itulah satu-satunya saat apabila ada sesuatu meninggalkan peranti ini — pengukurannya sendiri sentiasa kekal di sini.',
  'support.cta.privacyFuture': 'Apabila alamatnya sedia nanti, butang ini akan membuka halaman luaran Buy Me a Coffee dalam tab baharu. Itulah nanti satu-satunya saat apabila ada sesuatu meninggalkan peranti ini — pengukurannya sendiri sentiasa kekal di sini.',
  'support.cta.note': 'Tiada kiraan detik di sini, tiada peringatan dan tiada tetingkap yang membuka sendiri. Permintaan ini menunggu pada tab ini sahaja.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'minit terakhir',
  'gauge.aria': '{metric}: {value}, zon: {zone}',
  'gauge.aria.note': '{metric}: {value}, zon: {zone}, {note}',
  'gauge.aria.initial': '{metric}: tiada data',
  'gauge.value.none': 'tiada data',
  /* Odczyt słowny z jednostką: „27 peratus”, „1.20 kali”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'nilai anggaran',
  'gauge.note.offScale': 'di luar skala',
  'gauge.metric.unknown': 'Besaran tidak dikenali',

  'chart.aria.label': 'Carta sejarah pengukuran',
  'chart.hint': 'Carta interaktif. Anak panah kiri dan kanan menggerakkan kursor bacaan, Home dan End melompat ke awal dan akhir julat, Escape menyembunyikan kursor.',
  'chart.empty.title': 'Tiada data',
  'chart.empty.text': 'Mula mengukur — carta muncul selepas bacaan pertama.',
  'chart.few.title': 'Data belum mencukupi',
  'chart.few.text': 'Kami ada satu bacaan: {value}. Satu garis memerlukan dua.',
  'chart.legend.line': 'pengukuran',
  'chart.legend.gap': 'jurang dalam pengukuran',
  'chart.aria.head': 'Carta: {metric}, julat {range}',
  'chart.aria.empty': 'Tiada data dalam julat ini.',
  'chart.aria.one': 'Satu bacaan: {value}.',
  'chart.aria.summary': 'Daripada {min} hingga {max}, purata {avg}, {points}.',
  'chart.aria.gaps': 'Siri ini berjurang — ketika itu kami tidak mengukur.',
  'chart.readout.empty': 'Tiada data dalam julat ini.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'Data belum mencukupi untuk melukis carta.',
  'chart.readout.hint': 'Seret pada carta, atau gunakan kekunci anak panah, untuk membaca satu pengukuran.',
  'chart.time.now': 'sekarang',
  'chart.time.justNow': 'sebentar tadi',
  'chart.time.ago': '{duration} lalu',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} \u00B7 {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — malajski zegar jest dwunastogodzinny
     z „PG/PTG”, a data skrócona to „30 Ogo”. */
  'chart.sample.ago': '\u221230\u00A0min',
  'chart.sample.clock': '12:00 PTG',
  'chart.sample.date': '30\u00A0Ogo',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'Bahagian biru',
  'metric.share.short': 'Berapa banyak daripada cahaya yang dilihat jatuh pada saluran biru.',
  'metric.share.help': 'Ia memisahkan warna daripada kecerahan — inilah nilai yang bergerak apabila anda menghidupkan mod malam.',
  'metric.brightness.name': 'Kecerahan pemandangan',
  'metric.brightness.short': 'Kecerahan purata imej kamera.',
  'metric.brightness.help': 'Nilai relatif, bukan lux — dedahan automatik kamera mengalihkannya dari bawah.',
  'metric.kelvin.name': 'Suhu warna',
  'metric.kelvin.short': 'Sama ada cahayanya suam atau sejuk.',
  'metric.kelvin.help': 'Di bawah 3000 K cahaya terasa suam dan lebih lembut pada waktu malam. 6500 K ialah putih lalai kebanyakan skrin.',
  'metric.melanopic.name': 'Kesan sirkadian',
  'metric.melanopic.short': 'Sekuat mana cahaya ini bertindak pada jam biologi badan.',
  'metric.melanopic.help': 'Anggaran nisbah melanopik. 1.00 ialah putih siang yang neutral; pada waktu malam eloklah turun di bawah 0.50.',
  'metric.flicker.name': 'Kelipan',
  'metric.flicker.short': 'Denyutan sumber cahaya yang tidak kelihatan.',
  'metric.flicker.help': 'Pemalap dan lampu latar yang murah berdenyut. Mata tidak melihatnya, tetapi ia disebut sebagai salah satu kemungkinan punca keletihan dan sakit kepala.',
  'metric.uniformity.name': 'Keseragaman',
  'metric.uniformity.short': 'Sama ada cahaya tersebar sekata di seluruh bingkai.',
  'metric.uniformity.help': 'Nilai rendah pada skrin bermakna cahaya latar bocor atau ada pantulan; di atas meja — lampu yang salah letak.',
  'metric.comfort.name': 'Keselesaan visual',
  'metric.comfort.short': 'Satu skor menggantikan enam nombor.',
  'metric.comfort.help': 'Ia melipat pengukuran lain menjadi skor 0–100 dan menunjukkan apa yang paling menurunkannya. Pemberatnya ialah pertimbangan editorial kami, bukan piawai.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'baik',
  'zone.warn': 'sederhana',
  'zone.crit': 'kritikal',
  'zone.none': 'tiada data',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 Ogo'). */
  'date.month.short.1': 'Jan',
  'date.month.short.2': 'Feb',
  'date.month.short.3': 'Mac',
  'date.month.short.4': 'Apr',
  'date.month.short.5': 'Mei',
  'date.month.short.6': 'Jun',
  'date.month.short.7': 'Jul',
  'date.month.short.8': 'Ogo',
  'date.month.short.9': 'Sep',
  'date.month.short.10': 'Okt',
  'date.month.short.11': 'Nov',
  'date.month.short.12': 'Dis',

  'date.clock': '{hours}:{minutes}',
  /* Kolejność wstawek jak po polsku: malajski skrót daty to „30 Ogo”. */
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0{year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0jam',
  'time.duration.hourMinute': '{hours}\u00A0jam {minutes}\u00A0min',
  'time.duration.hour': '{hours}\u00A0jam',
  'time.duration.minuteSecond': '{minutes}\u00A0min {seconds}\u00A0saat',
  'time.duration.minute': '{minutes}\u00A0min',
  'time.duration.second': '{seconds}\u00A0saat',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „sebentar tadi”. */
  'time.justNow': 'sebentar tadi',
  'time.aMinuteAgo': 'seminit lalu',
  'time.minutesAgo': '{minutes}\u00A0min lalu',
  'time.hoursAgo': '{hours}\u00A0jam lalu',
  'time.yesterday': 'semalam',
  'time.daysAgo': '{days}\u00A0hari lalu',

  /* Formy zależne od liczby. Malajski ma w CLDR JEDNĄ kategorię: `other`.
     Rzeczownik nie odmienia się przez liczbę, więc forma jest jedna —
     format.plural() skleja „liczba + spacja + wartość formy”. */
  'time.days.plural': { other: 'hari' },
  'unit.sample.plural': { other: 'sampel' },
  'unit.measurement.plural': { other: 'pengukuran' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Malajski ma jedną — oba klucze zostają (kształt słownika jest wspólny dla
     wszystkich języków), a wartości są tu identyczne. */
  'unit.session.plural': { other: 'sesi' },
  'unit.session.accusative.plural': { other: 'sesi' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy — po malajsku także dwa różne słowa. */
  'unit.chartPoint.plural': { other: 'titik data' },
  'unit.point.plural': { other: 'mata' },
  'unit.kelvin.plural': { other: 'kelvin' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „peratus”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'peratus',
  'unit.spoken.times': 'kali',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'Kebenaran menggunakan kamera tidak diberikan. Benarkan kamera untuk halaman ini dalam tetapan pelayar atau sistem anda dan cuba lagi.',
  'camera.error.notfound': 'Kamera tidak dijumpai. Periksa sama ada peranti ini mempunyai kamera dan sama ada ia tidak dimatikan dalam sistem.',
  'camera.error.inuse': 'Kamera sedang digunakan oleh aplikasi lain. Tutup aplikasi atau tab itu dan cuba lagi.',
  'camera.error.insecure': 'Kamera hanya berfungsi melalui HTTPS atau pada localhost. Buka halaman ini pada alamat yang bermula dengan “https://”.',
  'camera.error.unsupported': 'Pelayar ini tidak menyediakan kamera di sini. Cuba Chrome atau Safari, dalam tetingkap biasa — bukan dalam pratonton yang terbenam dalam aplikasi lain.',
  'camera.error.unknown': 'Kamera tidak dapat dihidupkan.'
};
