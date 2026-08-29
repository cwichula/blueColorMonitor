/* Monitor Światła v5 — słownik indonezyjski (Bahasa Indonesia).
 *
 * TREŚĆ wzięta z pl.js, TERMINOLOGIA i rejestr — z en.js. Nie jest to kalka
 * żadnego z nich: zdanie indonezyjskie buduje się inaczej (brak odmiany, szyk
 * określnika po rzeczowniku), więc przekładany był sens, a nie szyk. Bez zmian
 * zostało to, co niesie znaczenie: liczby, progi, jednostki, nazwy wstawek
 * oraz — CO DO TREŚCI — zastrzeżenia medyczne i zdania o prywatności. Tych
 * ostatnich nie wolno osłabiać ani wzmacniać: „nie zastępuje rozmowy
 * z lekarzem” ma po indonezyjsku znaczyć dokładnie tyle samo, a „obraz nie
 * opuszcza urządzenia” nie może stać się obietnicą szerszą niż polska.
 *
 * REJESTR: forma grzecznościowa „Anda”, konsekwentnie i oszczędnie — indonezyjski
 * zwykle opuszcza zaimek tam, gdzie polski go stawia. Terminologia interfejsu
 * przyjęta za lokalizacjami przeglądarek: „peramban”, „tab”, „muat ulang”.
 *
 * TERMINOLOGIA siedmiu wielkości (trzymana bez wyjątków, także w tekstach
 * pomocy i w zdaniach opisowych):
 *   Porsi biru (udział niebieskiego), Kecerahan pemandangan (jasność sceny),
 *   Suhu warna (temperatura barwowa), Dampak sirkadian (wpływ na rytm dobowy;
 *   w opisie: rasio melanopik — współczynnik melanopiczny), Kedipan
 *   (migotanie), Keseragaman (równomierność), Kenyamanan visual (komfort
 *   wzrokowy). Wszystkie siedem to terminy przyjęte, nie kalki.
 * STREFY: aman / sedang / berbahaya — mówią o świetle, a nie o stanie
 * aplikacji, i wchodzą w zdanie „zona: {zone}”.
 *
 * LICZBY: przecinek dziesiętny (1,00 — 0,50), tak jak po polsku; procent bez
 * odstępu (40%), zgodnie z uzusem indonezyjskim. Skróty czasu „mnt” i „dtk”
 * przyjęte za lokalizacjami aplikacji mobilnych.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Tekst ze wstawką {nazwa}'   — napis zwykły,
 *   'klucz.kropkowany': { other }                    — forma zależna od liczby.
 * Indonezyjski ma w CLDR JEDNĄ kategorię liczebnika: `other`
 * (new Intl.PluralRules('id').resolvedOptions().pluralCategories). Rzeczownik
 * się nie odmienia, więc forma jest jedna — za to bywa złożona ze
 * słowa-klasyfikatora („titik data”), bo format.plural() skleja
 * „liczba + spacja + wartość formy”.
 * Nazwy wstawek są identyczne jak w pl.js — pilnuje tego keys.test.js.
 * Kolejność wstawek w zdaniu wolno zmieniać, nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Monitor Cahaya',
  'app.description': 'Monitor Cahaya — kamera Anda mengukur tujuh besaran cahaya di sekitar Anda. Semuanya dihitung di perangkat ini; tidak ada yang keluar ke jaringan.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Monitor Cahaya',
  'app.skipToContent': 'Lompat ke konten',
  'app.nav.aria': 'Navigasi utama',
  'app.noscript.title': 'Aplikasi ini membutuhkan JavaScript',
  'app.noscript.text': 'Seluruh pengukuran berlangsung di dalam tab peramban ini: JavaScript-lah yang membaca bingkai dari kamera dan menghitung tujuh besaran cahaya darinya. Tanpa itu, tidak ada yang bisa dipakai untuk mengukur. Aktifkan JavaScript untuk halaman ini lalu buka lagi — tetap tidak ada yang dikirim ke jaringan.',

  'nav.measure': 'Ukur',
  'nav.history': 'Riwayat',
  'nav.tools': 'Alat',
  'nav.support': 'Dukungan',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Mengukur',
  'shell.live.aria': 'Mengukur. {metric}: {value}. Kembali ke layar pengukuran.',
  'shell.live.metricFallback': 'Besaran utama',
  'shell.action.fallback': 'Tindakan layar',

  'shell.loadFail.title': 'Layar “{screen}” gagal dimuat',
  'shell.loadFail.text': 'Sebagian berkas mungkin hilang dari penyimpanan perangkat. Sambungkan ke jaringan lalu muat ulang halaman.',
  'shell.fatal.title': 'Ada yang tidak beres',
  'shell.fatal.text': 'Aplikasi tidak berhasil menyusun layar. Memuat ulang halaman biasanya sudah cukup — pengukuran dan pengaturan yang tersimpan tetap di tempatnya.',
  'shell.fatal.reload': 'Muat ulang halaman',
  'shell.boot.failTitle': 'Aplikasi gagal dijalankan',
  'shell.boot.failText': 'Kerangka aplikasi tidak berjalan. Muat ulang halaman — pengukuran dan pengaturan yang tersimpan tetap di tempatnya.',
  'shell.background.error': 'Ada yang rusak di latar belakang',
  'shell.background.action': 'Muat ulang',
  'shell.update.title': 'Versi baru tersedia',
  'shell.update.action': 'Muat ulang',

  'onboarding.title': 'Sebelum mulai',
  'onboarding.lead': 'Monitor Cahaya memakai kamera untuk melihat cahaya di sekitar Anda dan menghitung tujuh besaran darinya — dari porsi biru sampai kenyamanan visual.',
  'onboarding.privacy': 'Gambar tidak pernah meninggalkan perangkat ini: tidak ada server, tidak ada akun, dan tidak ada yang diunggah. Ketujuh besaran langsung bekerja, tanpa masuk akun dan tanpa biaya.',
  'onboarding.honesty': 'Ini panduan kasar, bukan alat ukur dan bukan pemeriksaan medis. Yang tidak bisa diukur tidak ditampilkan — alih-alih angka, akan muncul tanda pisah.',
  'onboarding.start': 'Mari mulai',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Terapkan',
  'overlay.toast.close': 'Tutup pesan',
  'overlay.sheet.label': 'Dialog',
  'overlay.sheet.close': 'Tutup',
  'overlay.dialog.confirm': 'Konfirmasi',
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

  'measure.intro.aria': 'Mulai pengukuran',
  'measure.intro.headline': 'Lihat cahaya yang menyinari Anda',
  'measure.intro.lead': 'Kamera menunjukkan seberapa banyak biru dalam cahaya yang sedang jatuh pada Anda — dan apakah itu terlalu banyak untuk jam segini.',
  'measure.intro.start': 'Mulai mengukur',
  'measure.intro.hint': 'Peramban akan meminta izin memakai kamera. Pengukuran mulai begitu izin diberikan.',
  'measure.intro.privacy': 'Gambar kamera diproses di perangkat ini dan tidak pernah meninggalkannya. Kami tidak mengirim, menyimpan, atau membagikan satu bingkai pun.',
  'measure.intro.honesty': 'Ini bukan alat kesehatan dan bukan pemeriksaan. Aplikasi menampilkan perkiraan cahaya di sekitar Anda; ia tidak menilai kesehatan Anda dan tidak menggantikan percakapan dengan dokter.',

  'measure.live.aria': 'Pengukuran sedang berjalan',
  'measure.badge.starting': 'Menyalakan',
  'measure.badge.paused': 'Dijeda',
  'measure.badge.running': 'Mengukur',
  'measure.stale': 'Menunggu gambar — pratinjau membeku saat aplikasi berada di latar belakang.',
  'measure.crop': 'Kami mengukur bagian tengah bingkai — {percent}% lebar dan tinggi gambar yang ditandai.',
  'measure.facing.front': 'kamera depan',
  'measure.facing.back': 'kamera belakang',

  'measure.boot.title': 'Menyalakan kamera…',
  'measure.boot.text': 'Jika peramban meminta izin, berikanlah — tanpa gambar tidak ada yang bisa diukur. Izin ini hanya berlaku untuk halaman ini dan bisa Anda cabut nanti.',
  'measure.boot.cancel': 'Batal',

  'measure.hold': 'Pembacaan dibekukan. Kamera tetap berjalan, tetapi tidak ada yang masuk ke riwayat maupun ke rata-rata.',
  'measure.gridHint': 'Pilih kartu untuk memindahkan besaran itu ke pengukur besar.',

  'measure.stop': 'Berhenti',
  'measure.pause': 'Jeda',
  'measure.resume': 'Lanjutkan',
  'measure.flip.aria': 'Ganti kamera',
  'measure.flip.toBack': 'Ganti ke kamera belakang',
  'measure.flip.toFront': 'Ganti ke kamera depan',

  'measure.fail.aria': 'Kesalahan kamera',
  'measure.fail.headline': 'Kamera tidak menyala',
  'measure.fail.retry': 'Coba lagi',
  'measure.fail.back': 'Kembali',
  'measure.fail.savedSession': 'Sesi sebelum gangguan ({duration}) sudah tersimpan di riwayat.',
  'measure.error.fallback': 'Kamera tidak bisa dinyalakan.',

  'measure.summary.aria': 'Ringkasan sesi',
  'measure.summary.title': 'Ringkasan sesi',
  'measure.summary.paused': 'dijeda {duration}',
  'measure.summary.nothingMeasured': 'Tidak ada besaran yang mengumpulkan pembacaan — kamera tidak melihat cahaya sepanjang sesi.',
  'measure.summary.note': 'Rata-rata hanya menghitung sampel di luar jeda. Besaran yang tidak sempat diukur ditinggalkan, bukan dihitung sebagai nol.',
  'measure.summary.nearThreshold': 'Paling dekat ambang',
  'measure.summary.worstPoint': 'Titik terlemah',
  'measure.summary.averageZone': 'rata-rata {zone}',
  'measure.summary.tooShort': 'Sesi berlangsung {duration} — terlalu singkat untuk masuk riwayat dengan sendirinya. Anda bisa menyimpannya secara manual.',
  'measure.summary.again': 'Ukur lagi',
  'measure.summary.save': 'Simpan ke riwayat',
  'measure.summary.saved': 'Tersimpan di riwayat',
  'measure.summary.savedToast': 'Sesi tersimpan di riwayat.',
  'measure.summary.close': 'Tutup',

  'measure.method.title': 'Bagaimana kami mengukurnya',
  'measure.method.p1': 'Aplikasi mengambil sampel gambar kamera sepuluh kali per detik dan menghitung besaran dari {percent}% bagian tengah bingkai — bidikan di pratinjau menandai persis area itu.',
  'measure.method.p2': 'Kamera ponsel punya tiga kanal lebar serta koreksi pencahayaan dan keseimbangan putih otomatisnya sendiri. Ia melihat proporsi cahaya, bukan spektrumnya.',
  'measure.method.p3': 'Porsi biru, kecerahan, kedipan, dan keseragaman adalah yang benar-benar diukur kamera. Suhu warna dan dampak sirkadian adalah pendekatan yang kami nyatakan terbuka, dihitung dari primer sRGB.',
  'measure.method.p4': 'Kedipan hanya terlihat di bawah empat hertz. Kedipan jaringan listrik pada 100 Hz jauh di luar jangkauan laju pencuplikan ini dan tidak akan pernah dilaporkan sebagai pembacaan.',
  'measure.method.p5': 'Tidak satu pun angka ini merupakan pengukuran fotometrik atau hasil medis. Gambar kamera tidak meninggalkan perangkat.',
  'measure.method.ok': 'Mengerti',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'Penyalaan kamera dibatalkan.',
  'measure.announce.stoppedNoSamples': 'Pengukuran dihentikan. Tidak ada sampel yang terkumpul.',
  'measure.announce.stopped': 'Pengukuran dihentikan. Ringkasan sesi sudah siap.',
  'measure.announce.interrupted': 'Pengukuran terputus. Ringkasan sesi sudah siap.',
  'measure.announce.paused': 'Pengukuran dijeda. Pembacaan dibekukan.',
  'measure.announce.resumed': 'Pengukuran dilanjutkan.',
  'measure.announce.switchedFront': 'Beralih ke kamera depan. Sesi baru dimulai.',
  'measure.announce.switchedBack': 'Beralih ke kamera belakang. Sesi baru dimulai.',
  'measure.announce.lead': 'Besaran utama: {metric}.',
  'measure.announce.cameraError': 'Kesalahan kamera. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'Cahaya bertahan di rentang aman sepanjang sesi — biarkan lampu apa adanya dan periksa lagi setelah gelap, saat sumber cahaya lain yang bekerja.',
  'measure.advice.share.evening': 'Porsi biru rata-rata {value} — nyalakan mode malam di layar Anda dan matikan lampu plafon, sisakan satu lampu hangat setinggi meja.',
  'measure.advice.share.day': 'Porsi biru rata-rata {value} — pada siang hari ini masih bisa diterima, tetapi atur layar agar otomatis beralih ke mode hangat dua jam sebelum tidur.',
  'measure.advice.brightness': 'Bingkai kelebihan cahaya (rata-rata {value}) — menjauhlah dari sumber cahaya atau turunkan kecerahan layar yang diukur, karena pada pencahayaan seperti itu besaran lain ikut kehilangan ketelitian.',
  'measure.advice.kelvin.evening': 'Suhu warna bertahan rata-rata {value} — setelah gelap, turunlah di bawah 3000 K: alihkan lampu ke mode hangat atau pasang bohlam 2700 K.',
  'measure.advice.kelvin.day': 'Suhu warna bertahan rata-rata {value} — putih yang baik dan menyegarkan untuk siang hari, tetapi pada malam hari atur lampu yang sama ke 2700 K.',
  'measure.advice.melanopic.evening': 'Dampak sirkadian rata-rata {value} — pada dua jam sebelum tidur turunlah di bawah 0,50 ×, dengan meredupkan lampu utama dan menyinari dari ketinggian meja alih-alih dari plafon.',
  'measure.advice.melanopic.day': 'Dampak sirkadian rata-rata {value} — pada jam ini dosis sebesar itu membantu, tetapi pada malam hari gantilah sumber ini dengan yang lebih lemah dan lebih hangat.',
  'measure.advice.flicker': 'Kedipan mencapai rata-rata {value} — biasanya karena peredup atau lampu latar yang disetel rendah: naikkan kecerahan layar di atas 40% atau ganti peredup dengan yang tidak memakai PWM.',
  'measure.advice.uniformity': 'Cahaya jatuh tidak merata (rata-rata {value}) — letakkan lampu di sisi meja dan tambahkan sumber kedua yang lebih lemah dari sisi berlawanan, alih-alih satu titik yang kuat.',
  'measure.advice.comfort': 'Kenyamanan visual keluar rata-rata {value} — mulailah dengan satu perubahan: turunkan kecerahan sumber utama menjadi separuh, baru setelah itu urus warna cahayanya.',
  'measure.advice.default': 'Ubah satu hal pada pencahayaan Anda lalu ukur lagi — membandingkan dua sesi lebih banyak bercerita daripada satu pembacaan.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'Riwayat',
  'history.action.export': 'Ekspor riwayat',

  'history.metricGroup.aria': 'Pilihan besaran',
  'history.announce.metric': 'Besaran: {metric}',
  'history.rangeGroup.aria': 'Rentang waktu',
  'history.range.aria': '{range} terakhir',

  'history.stats.title': 'Statistik rentang',
  'history.stats.head': '{metric}\u00A0—\u00A0{range} terakhir',
  'history.stats.note': 'Dihitung dari yang tampak di grafik. Waktu tanpa pengukuran tidak ikut dihitung — kami tidak menaruh nol sebagai gantinya.',
  'history.stat.min': 'Minimum',
  'history.stat.avg': 'Rata-rata',
  'history.stat.max': 'Maksimum',
  'history.trend.up': 'naik pada rentang ini',
  'history.trend.flat': 'tanpa perubahan berarti',
  'history.trend.down': 'turun pada rentang ini',
  'history.trend.none': 'tidak ada pembanding',

  'history.sessions.title': 'Sesi pengukuran',
  'history.sessions.count': '{sessions}, mulai dari yang terbaru',
  'history.sessions.empty': 'Belum ada sesi',
  'history.sessions.hint': 'Sesi tersimpan setelah Anda menghentikan pengukuran.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'rentang: {range}',
  'history.session.noMeasure': 'tidak ada yang terukur',

  'history.data.title': 'Data',
  'history.data.subtitle': 'Riwayat disimpan hanya di perangkat ini.',
  'history.export.csv': 'Ekspor CSV',
  'history.export.json': 'Ekspor JSON',
  'history.export.ok': 'Berkas siap disimpan',
  'history.export.fail': 'Berkas gagal disiapkan. Dalam mode pribadi, dan di jendela yang tertanam pada aplikasi lain, peramban memblokir penyimpanan — buka halaman ini di tab biasa.',
  'history.export.sheet.title': 'Ekspor riwayat',
  'history.export.sheet.text': 'CSV terbuka di lembar kerja (pemisah titik koma, koma sebagai tanda desimal). JSON menyimpan semuanya, termasuk daftar sesi dan jeda saat tidak ada yang terukur.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Hapus riwayat',
  'history.clear.title': 'Hapus riwayat?',
  'history.clear.text': 'Ini akan menghapus {points} dan {sessions}. Tindakan ini tidak bisa dibatalkan — jika Anda ingin menyimpan datanya, ekspor dulu.',
  'history.clear.confirm': 'Hapus',
  'history.clear.announce': 'Riwayat dihapus.',
  'history.clear.toast': 'Riwayat dihapus',

  'history.empty.title': 'Belum ada yang bisa ditampilkan',
  'history.empty.text': 'Riwayat terisi selama Anda mengukur — satu titik per detik. Semuanya tetap di perangkat ini.',
  'history.empty.action': 'Buka pengukuran',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 mnt',
  'range.5m': '5 mnt',
  'range.1h': '1 jam',
  'range.24h': '24 jam',
  'range.7d': '7 hari',
  'range.30d': '30 hari',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Tanggal dan waktu',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'Penyimpanan perangkat penuh — pengukuran baru tidak lagi disimpan.',
  'storage.blocked': 'Peramban tidak mengizinkan riwayat disimpan — data akan hilang setelah tab ditutup.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Alat',
  'tools.action.about': 'Tentang pengukuran',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Bahasa',
  'tools.language.subtitle': 'Secara bawaan aplikasi mengikuti bahasa perangkat Anda; pilihan dari daftar ini berlaku seketika dan tersimpan di peramban ini.',
  'tools.language.aria': 'Bahasa antarmuka',
  'tools.language.system': 'Otomatis',
  'tools.language.announce': 'Bahasa antarmuka: {language}.',

  'tools.appearance.title': 'Tampilan',
  'tools.appearance.theme.title': 'Tema',
  'tools.appearance.theme.desc': '“Otomatis” mengikuti pengaturan sistem Anda.',
  'tools.appearance.theme.aria': 'Tema',
  'tools.theme.system': 'Otomatis',
  'tools.theme.light': 'Terang',
  'tools.theme.dark': 'Gelap',
  'tools.appearance.accent.title': 'Warna aksen',
  'tools.appearance.accent.desc': 'Warna tombol, pilihan, dan penggeser.',
  'tools.appearance.accent.aria': 'Warna aksen',
  'tools.appearance.textScale.title': 'Ukuran teks',
  'tools.appearance.textScale.desc': 'Memperbesar seluruh antarmuka, bukan hanya labelnya.',
  'tools.appearance.textScale.aria': 'Ukuran teks',
  'tools.appearance.density.title': 'Kerapatan',
  'tools.appearance.density.desc': 'Padat memuat lebih banyak isi dalam satu layar.',
  'tools.appearance.density.aria': 'Kerapatan tata letak',
  'tools.density.comfortable': 'Nyaman',
  'tools.density.compact': 'Padat',
  'tools.appearance.motion.title': 'Kurangi gerak',
  'tools.appearance.motion.desc': 'Mematikan animasi dan gerak meluncur jarum. Pengaturan sistem Anda tetap kami hormati, apa pun pilihan di sini.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Samudra',
  'accent.violet': 'Ungu',
  'accent.amber': 'Ambar',
  'accent.mint': 'Mint',
  'accent.rose': 'Mawar',

  'tools.thresholds.title': 'Ambang',
  'tools.thresholds.subtitle': 'Mulai nilai berapa aplikasi menyebut “sedang”, dan mulai berapa menyebut “buruk”. Ambang bawaan adalah usulan kami, bukan standar — aturlah sesuai kebutuhan Anda.',
  'tools.thresholds.warn': 'Ambang peringatan',
  'tools.thresholds.crit': 'Ambang alarm',
  'tools.thresholds.warn.aria': 'Ambang peringatan — {metric}',
  'tools.thresholds.crit.aria': 'Ambang alarm — {metric}',
  'tools.thresholds.reset': 'Bawaan',
  'tools.thresholds.reset.aria': 'Pulihkan ambang bawaan: {metric}',
  'tools.thresholds.moved': '{threshold} dipindah ke {value}.',
  'tools.thresholds.resetAll': 'Pulihkan semua ambang',
  'tools.thresholds.resetAll.title': 'Pulihkan ambang bawaan?',
  'tools.thresholds.resetAll.text': 'Ketujuh besaran akan kembali ke ambang yang diusulkan aplikasi. Riwayat pengukuran Anda tidak tersentuh.',
  'tools.thresholds.resetAll.confirm': 'Pulihkan',
  'tools.thresholds.resetAll.cancel': 'Biarkan',
  'tools.thresholds.resetAll.toast': 'Ambang kembali ke bawaan',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'di atas {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} ke bawah',
  'tools.zoneRange.goodBelow': 'di bawah {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} ke atas',

  'tools.calibration.title': 'Kalibrasi',
  'tools.calibration.subtitle': 'Untuk yang punya pembanding.',
  'tools.calibration.intro': 'Dua ponsel yang diarahkan ke lampu yang sama akan menunjukkan angka yang sedikit berbeda — setiap sensor punya rona sendiri. Kalau Anda punya pembacaan yang Anda percayai, di sini Anda bisa menaikkan atau menurunkan sedikit masing-masing kanal gambar. Pengali bekerja sebelum apa pun dihitung, jadi ia mengubah ketujuh besaran sekaligus.',
  'tools.calibration.neutral': 'Tidak punya pembanding? Biarkan di 1,00 — itu setelan pabrik dan tidak merusak apa pun.',
  'tools.calibration.forward': 'Perubahan berlaku mulai sekarang. Pengukuran yang sudah ada di riwayat tetap seperti saat disimpan — kami tidak menghitungnya ulang, karena itu sama dengan menulis ulang data setelah kejadian.',
  'tools.calibration.reset': 'Setel ulang kalibrasi',
  'tools.calibration.reset.toast': 'Kalibrasi disetel ulang',
  'tools.calibration.channel.r': 'Kanal merah',
  'tools.calibration.channel.g': 'Kanal hijau',
  'tools.calibration.channel.b': 'Kanal biru',
  'tools.calibration.channel.aria': '{channel} — pengali kalibrasi',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'Pengukuran',
  'tools.measurement.wake.title': 'Biarkan layar menyala',
  'tools.measurement.wake.desc': 'Layar tetap menyala selama mengukur. Baterai jadi lebih cepat habis.',
  'tools.measurement.wake.unsupported': 'Peramban ini tidak mengizinkan kami menjaga layar tetap menyala.',
  'tools.measurement.haptics.title': 'Getaran',
  'tools.measurement.haptics.desc': 'Konfirmasi singkat saat mulai, saat berhenti, dan saat besaran berganti.',
  'tools.measurement.haptics.unsupported': 'Perangkat ini tidak melaporkan adanya motor getar.',

  'tools.about.title': 'Tentang pengukuran',
  'tools.about.subtitle': 'Apa persisnya yang dihitung masing-masing dari tujuh besaran, dan di mana kejujuran metode ini berakhir.',
  'tools.about.scale': 'Skala: dari {min} sampai {max}.',
  'tools.about.threshold': 'Kami memperingatkan mulai {warn} dan membunyikan alarm mulai {crit}.',
  'tools.about.thresholdInvert': 'Kami memperingatkan di bawah {warn} dan membunyikan alarm di bawah {crit}.',
  'tools.about.limitsHead': 'Apa yang tidak bisa dilakukan pengukuran ini',
  'tools.about.limit.spectrum.title': 'Kamera tidak melihat warna seperti alat ukur',
  'tools.about.limit.spectrum.text': 'Kamera ponsel punya tiga kanal: merah, hijau, dan biru. Alat ukur cahaya memecahnya menjadi puluhan pita sempit. Yang Anda lihat di sini diturunkan dari tiga angka itu — dengan cara yang masuk akal, tetapi tetap sebuah perhitungan, bukan spektrum yang terukur.',
  'tools.about.limit.exposure.title': 'Kamera mengatur sendiri kecerahannya',
  'tools.about.limit.exposure.text': 'Arahkan ponsel ke jendela dan kamera akan menggelapkan gambar agar tidak kelebihan cahaya. “Kecerahan pemandangan” lalu turun, padahal tidak ada yang berubah di dalam ruangan. Karena itu bandingkan nilai ini dalam satu bidikan yang sama, bukan antar ruangan.',
  'tools.about.limit.flicker.title': 'Kamera yang lambat tidak akan menangkap kedipan cepat',
  'tools.about.limit.flicker.text': 'Kami memeriksa gambar {hz} kali per detik. Denyut yang lebih cepat dari {nyquist} kali per detik bisa muncul dalam pengukuran seperti ini sebagai lebih lambat daripada aslinya, atau hilang sama sekali — dan kedipan dari jaringan listrik persis secepat itu. Kalau aplikasi menangkap sesuatu, anggaplah itu tanda “ada yang berdenyut di sini”, bukan frekuensi yang terukur.',
  'tools.about.limit.medical.title': 'Ini bukan pemeriksaan medis dan bukan saran medis',
  'tools.about.limit.medical.text': 'Aplikasi membantu Anda menyadari bahwa cahaya di sekitar terasa dingin, terang, atau gelisah, dan menyarankan apa yang bisa dilakukan. Aplikasi tidak memberi penilaian tentang kesehatan Anda dan tidak menggantikan percakapan dengan dokter atau pengukuran dengan alat ukur profesional.',
  'tools.about.privacy': 'Semuanya dihitung di perangkat Anda. Gambar kamera tidak pernah dikirim atau disimpan ke mana pun — hanya angka hasil perhitungan yang masuk ke penyimpanan.',
  'tools.about.privacyPolicy': 'Kebijakan privasi lengkap',

  'tools.data.title': 'Data',
  'tools.data.subtitle': 'Semuanya berada di penyimpanan peramban ini dan tidak pernah pergi dari sini.',
  'tools.data.summary.empty': 'Belum ada pengukuran yang tersimpan.',
  'tools.data.summary': 'Di penyimpanan: {points} dan {sessions}.',
  'tools.data.export.csv': 'Ekspor CSV',
  'tools.data.export.json': 'Ekspor JSON',
  'tools.data.clear': 'Hapus riwayat',
  'tools.data.reset': 'Pengaturan bawaan',
  'tools.data.reset.title': 'Pulihkan pengaturan bawaan?',
  'tools.data.reset.text': 'Tampilan, ambang, kalibrasi, dan pengaturan pengukuran akan kembali ke keadaan awal. Riwayat pengukuran Anda tidak tersentuh.',
  'tools.data.reset.confirm': 'Pulihkan',
  'tools.data.reset.toast': 'Pengaturan bawaan dipulihkan',
  'tools.data.wipe': 'Hapus semua data',
  'tools.data.wipe.title': 'Hapus semua data aplikasi?',
  'tools.data.wipe.text': 'Yang akan hilang: seluruh riwayat pengukuran dan daftar sesi, ambang serta kalibrasi Anda, dan pengaturan tampilan. Aplikasi akan kembali ke keadaan saat pertama kali dijalankan.',
  'tools.data.wipe.note': 'Kami tidak memegang salinan data ini — data itu tidak pernah meninggalkan perangkat ini, jadi tidak ada tempat untuk memulihkannya.',
  'tools.data.wipe.check': 'Saya paham ini tidak bisa dibatalkan',
  'tools.data.wipe.confirm': 'Hapus semuanya',
  'tools.data.wipe.toast': 'Semua data aplikasi telah dihapus',
  'tools.data.wipe.announce': 'Semua data aplikasi telah dihapus. Pengaturan kembali ke bawaan.',
  'tools.data.storage.blocked': 'Peramban ini tidak mengizinkan apa pun disimpan secara permanen (mode pribadi, atau data situs diblokir). Semua yang Anda atur di sini akan hilang setelah tab ditutup.',
  'tools.data.storage.full': 'Penyimpanan peramban sudah penuh dan pengukuran baru tidak lagi disimpan. Menghapus riwayat akan membebaskan ruang.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Dukungan',
  'support.free.title': 'Semuanya tersedia',
  'support.free.lead': 'Ketujuh besaran, riwayat lengkap, ambang, kalibrasi, dan ekspor bekerja sejak pertama kali dijalankan — tanpa akun, tanpa batasan, dan tanpa biaya.',
  'support.free.note': 'Pengukuran dihitung sepenuhnya di perangkat ini dan bekerja tanpa jaringan. Tidak ada versi yang lebih baik yang kami simpan di balik tembok.',
  'support.why.title': 'Kenapa saya meminta ini',
  'support.why.lead': 'Monitor Cahaya dibuat di luar jam kerja, tanpa iklan, tanpa sponsor, dan tanpa perusahaan di belakangnya. Dukungan membayar waktu untuk perbaikan, untuk besaran baru, dan untuk menjaga apa yang sudah berjalan tetap hidup.',
  'support.what.title': 'Apa yang Anda dapat dari donasi',
  'support.what.lead': 'Tidak ada. Donasi tidak membuka apa pun — tidak ada fitur tambahan, tidak ada lencana di samping nama, tidak ada prioritas. Semua yang bisa dilakukan aplikasi ini sudah Anda miliki.',
  'support.what.note': 'Yang tersisa hanyalah bahwa saya tahu ini berguna bagi seseorang. Itu sungguh alasan yang cukup.',
  'support.cta.title': 'Kalau Anda ingin membantu',
  'support.cta.button': 'Traktir saya kopi',
  'support.cta.nolink': 'Profil donasi belum tersambung. Begitu ada, sebuah tombol akan berdiri di tempat ini.',
  'support.cta.privacy': 'Tautan ini membuka halaman eksternal Buy Me a Coffee di tab baru. Itulah satu-satunya saat ketika ada sesuatu yang meninggalkan perangkat ini — pengukurannya sendiri selalu tinggal di sini.',
  'support.cta.privacyFuture': 'Begitu alamatnya tersedia, tombol ini akan membuka halaman eksternal Buy Me a Coffee di tab baru. Itulah nanti satu-satunya saat ketika ada sesuatu yang meninggalkan perangkat ini — pengukurannya sendiri selalu tinggal di sini.',
  'support.cta.note': 'Tidak ada hitung mundur di sini, tidak ada pengingat, dan tidak ada jendela yang membuka sendiri. Permintaan ini menunggu di tab ini saja.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'menit terakhir',
  'gauge.aria': '{metric}: {value}, zona: {zone}',
  'gauge.aria.note': '{metric}: {value}, zona: {zone}, {note}',
  'gauge.aria.initial': '{metric}: tidak ada data',
  'gauge.value.none': 'tidak ada data',
  /* Odczyt słowny z jednostką: „27 persen”, „1,20 kali”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'nilai perkiraan',
  'gauge.note.offScale': 'di luar skala',
  'gauge.metric.unknown': 'Besaran tidak dikenal',

  'chart.aria.label': 'Grafik riwayat pengukuran',
  'chart.hint': 'Grafik interaktif. Panah kiri dan kanan menggeser kursor pembacaan, Home dan End melompat ke awal dan akhir rentang, Escape menyembunyikan kursor.',
  'chart.empty.title': 'Tidak ada data',
  'chart.empty.text': 'Mulailah mengukur — grafik muncul setelah pembacaan pertama.',
  'chart.few.title': 'Data belum cukup',
  'chart.few.text': 'Kami punya satu pembacaan: {value}. Sebuah garis butuh dua.',
  'chart.legend.line': 'pengukuran',
  'chart.legend.gap': 'jeda dalam pengukuran',
  'chart.aria.head': 'Grafik: {metric}, rentang {range}',
  'chart.aria.empty': 'Tidak ada data pada rentang ini.',
  'chart.aria.one': 'Satu pembacaan: {value}.',
  'chart.aria.summary': 'Dari {min} sampai {max}, rata-rata {avg}, {points}.',
  'chart.aria.gaps': 'Deretnya berjeda — saat itu kami tidak mengukur.',
  'chart.readout.empty': 'Tidak ada data pada rentang ini.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'Data belum cukup untuk menggambar grafik.',
  'chart.readout.hint': 'Seret pada grafik, atau pakai tombol panah, untuk membaca satu pengukuran.',
  'chart.time.now': 'sekarang',
  'chart.time.justNow': 'baru saja',
  'chart.time.ago': '{duration} lalu',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '−{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — indonezyjski zegar jest dwudziestoczterogodzinny,
     a data skrócona to „30 Agu”. */
  'chart.sample.ago': '\u221230\u00A0mnt',
  'chart.sample.clock': '00:00',
  'chart.sample.date': '30\u00A0Agu',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'Porsi biru',
  'metric.share.short': 'Berapa bagian dari cahaya yang terlihat jatuh pada kanal biru.',
  'metric.share.help': 'Memisahkan warna dari kecerahan — inilah nilai yang bergerak saat Anda menyalakan mode malam.',
  'metric.brightness.name': 'Kecerahan pemandangan',
  'metric.brightness.short': 'Kecerahan rata-rata gambar kamera.',
  'metric.brightness.help': 'Nilai relatif, bukan lux — pencahayaan otomatis kamera menggesernya dari bawah.',
  'metric.kelvin.name': 'Suhu warna',
  'metric.kelvin.short': 'Apakah cahayanya hangat atau dingin.',
  'metric.kelvin.help': 'Di bawah 3000 K cahaya terasa hangat dan lebih lembut pada malam hari. 6500 K adalah putih bawaan kebanyakan layar.',
  'metric.melanopic.name': 'Dampak sirkadian',
  'metric.melanopic.short': 'Seberapa kuat cahaya ini bekerja pada jam biologis tubuh.',
  'metric.melanopic.help': 'Pendekatan dari rasio melanopik. 1,00 adalah putih siang yang netral; pada malam hari sebaiknya turun di bawah 0,50.',
  'metric.flicker.name': 'Kedipan',
  'metric.flicker.short': 'Denyut sumber cahaya yang tidak terlihat.',
  'metric.flicker.help': 'Peredup dan lampu latar murah berdenyut. Mata tidak melihatnya, tetapi hal itu disebut sebagai salah satu kemungkinan penyebab kelelahan dan sakit kepala.',
  'metric.uniformity.name': 'Keseragaman',
  'metric.uniformity.short': 'Apakah cahaya tersebar merata di seluruh bingkai.',
  'metric.uniformity.help': 'Nilai rendah pada layar berarti rembesan lampu latar atau pantulan; di meja — lampu yang salah letak.',
  'metric.comfort.name': 'Kenyamanan visual',
  'metric.comfort.short': 'Satu nilai sebagai ganti enam angka.',
  'metric.comfort.help': 'Melipat pengukuran lain menjadi nilai 0–100 dan menunjukkan apa yang paling menurunkannya. Bobotnya adalah penilaian redaksi kami, bukan standar.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'baik',
  'zone.warn': 'sedang',
  'zone.crit': 'buruk',
  'zone.none': 'tidak ada data',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 Agu'). */
  'date.month.short.1': 'Jan',
  'date.month.short.2': 'Feb',
  'date.month.short.3': 'Mar',
  'date.month.short.4': 'Apr',
  'date.month.short.5': 'Mei',
  'date.month.short.6': 'Jun',
  'date.month.short.7': 'Jul',
  'date.month.short.8': 'Agu',
  'date.month.short.9': 'Sep',
  'date.month.short.10': 'Okt',
  'date.month.short.11': 'Nov',
  'date.month.short.12': 'Des',

  'date.clock': '{hours}:{minutes}',
  /* Kolejność wstawek jak po polsku: indonezyjski skrót daty to „30 Agu”. */
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0{year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0jam',
  'time.duration.hourMinute': '{hours}\u00A0jam {minutes}\u00A0mnt',
  'time.duration.hour': '{hours}\u00A0jam',
  'time.duration.minuteSecond': '{minutes}\u00A0mnt {seconds}\u00A0dtk',
  'time.duration.minute': '{minutes}\u00A0mnt',
  'time.duration.second': '{seconds}\u00A0dtk',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „baru saja”. */
  'time.justNow': 'baru saja',
  'time.aMinuteAgo': 'semenit lalu',
  'time.minutesAgo': '{minutes}\u00A0mnt lalu',
  'time.hoursAgo': '{hours}\u00A0jam lalu',
  'time.yesterday': 'kemarin',
  'time.daysAgo': '{days}\u00A0hari lalu',

  /* Formy zależne od liczby. Indonezyjski ma w CLDR JEDNĄ kategorię: `other`.
     Rzeczownik się nie odmienia, więc forma jest jedna — bywa za to złożona
     ze słowa-klasyfikatora, bo format.plural() skleja „liczba + spacja +
     wartość formy”. */
  'time.days.plural': { other: 'hari' },
  'unit.sample.plural': { other: 'sampel' },
  'unit.measurement.plural': { other: 'pengukuran' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Indonezyjski ma jedną — oba klucze zostają (kształt słownika jest wspólny
     dla wszystkich języków), a wartości są tu identyczne. */
  'unit.session.plural': { other: 'sesi' },
  'unit.session.accusative.plural': { other: 'sesi' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy — po indonezyjsku także dwa różne słowa. */
  'unit.chartPoint.plural': { other: 'titik data' },
  'unit.point.plural': { other: 'poin' },
  'unit.kelvin.plural': { other: 'kelvin' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „persen”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'persen',
  'unit.spoken.times': 'kali',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'Izin memakai kamera tidak diberikan. Izinkan kamera untuk halaman ini di pengaturan peramban atau sistem Anda lalu coba lagi.',
  'camera.error.notfound': 'Kamera tidak ditemukan. Periksa apakah perangkat ini punya kamera dan apakah kamera tidak dimatikan di sistem.',
  'camera.error.inuse': 'Kamera sedang dipakai aplikasi lain. Tutup aplikasi atau tab itu lalu coba lagi.',
  'camera.error.insecure': 'Kamera hanya bekerja lewat HTTPS atau di localhost. Buka halaman ini pada alamat yang diawali “https://”.',
  'camera.error.unsupported': 'Peramban ini tidak menyediakan kamera di sini. Coba Chrome atau Safari, di jendela biasa — bukan di pratinjau yang tertanam dalam aplikasi lain.',
  'camera.error.unknown': 'Kamera tidak bisa dinyalakan.'
};
