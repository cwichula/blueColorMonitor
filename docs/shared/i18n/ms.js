/* docs/shared/i18n/ms.js — słownik WSPÓLNY, malajski (Bahasa Melayu).
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest malajski.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — pilnuje tego
 * docs/shared/i18n/keys.test.js. Klucza, którego nie ma w angielskim, nie wolno
 * tu dopisać: angielski jest wartością zapasową, więc to on wyznacza zestaw.
 *
 * REJESTR: malajszczyzna standardowa (Malezja), zwrot do użytkownika przez
 * „anda” — w malajskim pisane małą literą, inaczej niż indonezyjskie „Anda”.
 * Słownictwo malezyjskie, nie indonezyjskie: peranti (nie „perangkat”), pelayar
 * (nie „peramban”), skrin (nie „layar”), tetapan (nie „pengaturan”), butang
 * (nie „tombol”), memuat turun (nie „mengunduh”), nisbah (nie „rasio”).
 * Ton jak w oryginale — rzeczowy i spokojny, bez marketingu i bez straszenia.
 *
 * TERMINOLOGIA (jeden odpowiednik na pojęcie, w całym pliku): bahagian biru,
 * kecerahan pemandangan, suhu warna, kesan sirkadian (nisbah melanopik),
 * kelipan, kesekataan, keselesaan mata.
 *
 * LICZEBNIKI: malajski nie odmienia rzeczownika przez liczbę — CLDR daje mu
 * jedną kategorię, 'other', i tylko ona ma tu prawo wystąpić.
 *
 * ZAPIS LICZB: kropka dziesiętna, zgodnie z Intl.NumberFormat('ms') —
 * „1.00”, „0.50”.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ms'] = Object.assign(window.I18nData['ms'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu
     (UE) 2017/745, gdzie stoi na początku zdania. */
  'app.name': 'Monitor Cahaya',

  /* ---- wybór języka ---- */

  'language.label': 'Bahasa',
  'language.help': 'Bahasa untuk keseluruhan aplikasi. Semua bahasa sudah ada pada peranti ini — tiada apa-apa yang dimuat turun dan tiada apa-apa yang dihantar ke mana-mana.',
  'language.auto': 'Ikut peranti',
  'language.autoHint': 'Mengikut bahasa yang ditetapkan pada telefon atau pelayar.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Bahagian biru',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'peratus',
  'metric.share.short': 'Berapa banyak daripada cahaya yang kelihatan jatuh pada saluran biru.',
  'metric.share.help': 'Ia mengasingkan warna daripada kecerahan — nilai inilah yang berubah apabila anda menghidupkan mod malam.',

  'metric.brightness.name': 'Kecerahan pemandangan',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'peratus',
  'metric.brightness.short': 'Kecerahan purata imej daripada kamera.',
  'metric.brightness.help': 'Nilai relatif, bukan lux — pendedahan automatik kamera mengalihkannya di sebalik tabir.',

  'metric.kelvin.name': 'Suhu warna',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'kelvin',
  'metric.kelvin.short': 'Sama ada cahayanya hangat atau sejuk.',
  'metric.kelvin.help': 'Di bawah 3000 K cahaya terasa hangat dan lebih lembut pada waktu malam. 6500 K ialah putih lalai kebanyakan skrin.',

  'metric.melanopic.name': 'Kesan sirkadian',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'kali',
  'metric.melanopic.short': 'Sekuat mana cahaya ini bertindak pada jam biologi badan.',
  'metric.melanopic.help': 'Anggaran nisbah melanopik. 1.00 ialah putih siang yang neutral; pada waktu malam eloklah turun di bawah 0.50.',

  'metric.flicker.name': 'Kelipan',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'peratus',
  'metric.flicker.short': 'Denyutan sumber cahaya yang tidak dilihat mata.',
  'metric.flicker.help': 'Peredup dan lampu latar yang murah berdenyut. Mata tidak melihatnya, tetapi ia diketahui menjadi punca keletihan dan sakit kepala.',

  'metric.uniformity.name': 'Kesekataan',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'peratus',
  'metric.uniformity.short': 'Sama ada cahaya tersebar sekata di seluruh bingkai.',
  'metric.uniformity.help': 'Nilai rendah pada skrin bermakna lelehan lampu latar atau pantulan; di atas meja pula bermakna lampu yang salah letak.',

  'metric.comfort.name': 'Keselesaan mata',
  'metric.comfort.unit': 'markah',
  'metric.comfort.unitSpoken': 'markah',
  'metric.comfort.short': 'Satu penilaian menggantikan enam nombor.',
  'metric.comfort.help': 'Ia menggabungkan bacaan yang lain menjadi skor 0–100 dan menunjukkan apa yang paling menurunkannya. Pemberatnya ialah pertimbangan editorial kami, bukan sesuatu piawaian.',

  /* Etykiety składników oceny komfortu — Metrics.comfortIndex zwraca je jako
     `penalties[].id`, więc nazwa klucza idzie za tym identyfikatorem. */
  'comfort.penalty.melanopic': 'Kesan sirkadian',
  'comfort.penalty.kelvin': 'Warna cahaya yang sejuk',
  'comfort.penalty.flicker': 'Kelipan',
  'comfort.penalty.uniformity': 'Pencahayaan tidak sekata',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. */

  'engine.idle': 'Tekan “Start” untuk menghidupkan kamera.',
  'engine.starting': 'Menghidupkan kamera…',

  'engine.error.permission': 'Tiada kebenaran untuk menggunakan kamera. Benarkan kamera dalam tetapan pelayar anda dan tekan “Start” sekali lagi.',
  'engine.error.notFound': 'Kamera tidak ditemui. Periksa sama ada peranti ini mempunyai kamera dan sama ada ia tidak dimatikan dalam sistem.',
  'engine.error.busy': 'Kamera sedang digunakan oleh aplikasi lain. Tutup aplikasi itu dan cuba lagi.',
  'engine.error.unknown': 'Kamera tidak dapat dihidupkan.',
  'engine.error.unsupported': 'Pelayar ini tidak memberi halaman ini akses kepada kamera. Buka aplikasi melalui HTTPS atau gunakan pelayar lain.',

  /* ---- strefy ---- */

  'zone.good': 'Dalam julat',
  'zone.warning': 'Awas',
  'zone.critical': 'Kritikal',
  'zone.none': 'Tiada data',
  'zone.settling': 'Menetapkan',

  /* Wersja mówiona — małą literą i bez kropki, czytnik ekranu wpina ją
     w środek zdania. */
  'zone.spoken.good': 'dalam julat',
  'zone.spoken.warning': 'awas',
  'zone.spoken.critical': 'kritikal',
  'zone.spoken.none': 'tiada data',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'markah',
  'unit.hertz': 'Hz',
  'unit.second': 's',
  'unit.minute': 'min',
  'unit.hour': 'jam',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'Cahaya ini baik — tiada apa-apa yang melepasi ambang yang anda tetapkan.',
  'verdict.noValue': 'Kuantiti ini tidak dapat diukur sekarang. Periksa sama ada ada sesuatu yang menutupi kanta.',
  'verdict.warmup': 'Sedang menetapkan penilaian — pegang telefon tanpa bergerak sebentar lagi.',

  'verdict.warning.share': 'Agak banyak daripada cahaya ini jatuh pada saluran biru. Pada waktu malam eloklah ia diredupkan.',
  'verdict.warning.brightness': 'Pemandangan ini terang — kamera bekerja hampir dengan had atas julatnya.',
  'verdict.warning.kelvin': 'Cahayanya agak sejuk. Pada waktu malam mentol sekitar 2700 K terasa lebih lembut.',
  'verdict.warning.melanopic': 'Cahaya ini bertindak agak kuat pada jam biologi badan.',
  'verdict.warning.flicker': 'Sumber cahaya jelas berdenyut.',
  'verdict.warning.uniformity': 'Cahaya tersebar tidak sekata di dalam bingkai.',
  'verdict.warning.comfort': 'Keselesaan mata menurun — beberapa perkara sekali gus menyumbang kepadanya.',

  'verdict.critical.share': 'Biru yang sangat banyak. Pada waktu malam hidupkan mod malam atau tukar sumber cahayanya.',
  'verdict.critical.brightness': 'Pemandangan ini sangat terang. Jangan mengukur dengan menghala terus ke sumber cahaya.',
  'verdict.critical.kelvin': 'Cahayanya dingin. Pada waktu malam inilah yang paling memenatkan mata — mentol yang lebih hangat atau mod malam akan membantu.',
  'verdict.critical.melanopic': 'Cahaya ini bertindak kuat pada jam biologi badan. Pada waktu malam eloklah turun di bawah 0.50.',
  'verdict.critical.flicker': 'Sumber cahaya berdenyut dengan kuat. Ia diketahui menjadi punca keletihan mata dan sakit kepala.',
  'verdict.critical.uniformity': 'Cahaya tersebar dengan sangat tidak sekata. Periksa kedudukan lampu atau pantulan pada skrin.',
  /* Zdanie bez numeru modułu — wersja nadpisze ten jeden klucz u siebie, jeśli
     chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'Keselesaan mata rendah. Lihat perincian skor itu untuk mengetahui apa yang menurunkannya.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'Apa yang tidak diberitahu oleh nombor ini',
  'note.warningTitle': 'Awas',
  'note.dashTitle': 'Had pengukuran ini',
  'note.dashText': 'Kamera telefon mempunyai tiga saluran warna yang lebar dan imbangan putih automatik — ia tidak mengukur spektrum. Suhu warna dan kesan sirkadian ialah anggaran yang dikira daripada warna asas sRGB. Aplikasi ini menunjukkan perbezaan dan perubahan dari semasa ke semasa dengan baik; ia tidak menggantikan alat ukur dan tidak membuat sebarang diagnosis.',
  'note.approxLegend': '≈ nilai anggaran — dikira daripada warna asas sRGB, bukan daripada pengukuran spektrum.',
  'note.kelvinOutOfRange': 'Di luar julat kaedah ini — pada warna ini formula suhu warna tidak lagi boleh dipercayai.',
  /* {rate} i {limit} podaje wywołanie — to liczby z silnika, a ich zapis jest
     zależny od języka. Nie wpisuje się ich do zdania na sztywno. */
  'note.flickerOutOfRange': 'Di luar julat kaedah ini — pensampelan {rate} Hz hanya melihat denyutan di bawah {limit} Hz. Kelipan sesalur elektrik 100 Hz berada di luar jangkauan dan aplikasi tidak akan sekali-kali melaporkannya sebagai bacaan.',
  'note.helpTitle': 'Apa yang tidak diberitahu oleh nombor ini',
  'note.helpText': 'Kamera telefon mempunyai tiga saluran yang lebar dan tidak mengukur spektrum. Nilai ini ialah penunjuk perbandingan — ia menunjukkan perbezaan antara cahaya dan perubahan dari semasa ke semasa dengan baik, dan ia bukan hasil pengukuran makmal mahupun maklumat perubatan.',
  'note.calibration': 'Pengukuran tanpa penentukuran — anggap nilainya sebagai perbandingan.',

  'note.howToTitle': 'Cara mengukur dengan betul',
  'note.howTo.hold.title': 'Pegang telefon tanpa bergerak',
  'note.howTo.hold.text': 'Pendedahan automatik memerlukan 2–3 saat untuk stabil.',
  'note.howTo.aim.title': 'Halakan ke permukaan yang bercahaya',
  'note.howTo.aim.text': 'Sekeping kertas putih atau dinding yang cerah. Jangan mengukur dengan memandang terus ke sumber cahaya.',
  'note.howTo.compare.title': 'Bandingkan, jangan nilai secara mutlak',
  'note.howTo.compare.text': 'Pemandangan yang sama sebelum dan selepas perubahan pencahayaan memberitahu lebih banyak daripada satu nombor.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Nie skraca się go dla stylu. */

  'legal.noDiagnosis': 'Tiada satu pun bacaan yang merupakan diagnosis atau nasihat kesihatan.',
  'legal.mdr': '{app} bukan peranti perubatan dalam pengertian Peraturan (EU) 2017/745, tidak bertujuan untuk mendiagnosis, mencegah, memantau atau merawat sebarang keadaan perubatan, dan tidak menggantikan pemeriksaan oleh doktor mahupun optometris.',

  /* ---- prywatność ---- */

  'privacy.title': 'Apa yang meninggalkan peranti ini',
  'privacy.short': 'Tiada apa-apa dalam aplikasi ini yang menghantar apa-apa ke rangkaian. Semua nombor terhasil pada peranti ini dan kekal di sini.',
  'privacy.onDevice': 'Kamera hanya hidup selepas anda menekan butangnya, dan imejnya tidak pernah meninggalkan peranti ini.',
  'privacy.external': 'Inilah satu-satunya tempat dalam keseluruhan aplikasi yang membuat sesuatu meninggalkan peranti ini: butang itu membuka halaman luar dalam tab baharu, dan hanya selepas anda menekannya. Pengukuran, sejarah dan tetapan kekal di sini.',
  'privacy.externalPending': 'Sebaik sahaja alamatnya tersedia, butang itu akan membuka halaman luar dalam tab baharu. Itulah satu-satunya saat apabila sesuatu meninggalkan peranti ini. Pengukuran, sejarah dan tetapan kekal di sini.',
  'privacy.storageBlocked': 'Pelayar ini tidak membenarkan apa-apa disimpan (mod peribadi, atau data tapak disekat). Pengukuran tetap berjalan, tetapi sejarahnya akan hilang apabila anda menutup tab itu.',

  /* ---- liczebniki ----
     Malajski nie odmienia rzeczownika przez liczbę: CLDR daje mu jedną
     kategorię, 'other'. Formę wybiera Intl.PluralRules('ms'). */

  'count.readings': { other: '{n} bacaan' },
  'count.sessions': { other: '{n} sesi pengukuran' },
  'count.seconds': { other: '{n} saat' },
  'count.minutes': { other: '{n} minit' },
  'count.hours': { other: '{n} jam' },
  'count.days': { other: '{n} hari' }
});
