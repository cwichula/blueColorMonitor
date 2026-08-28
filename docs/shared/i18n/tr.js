/* docs/shared/i18n/tr.js — słownik WSPÓLNY, turecki.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest turecki.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — pilnuje tego
 * keys.test.js. Klucza, którego nie ma w angielskim, nie wolno tu dopisać:
 * angielski jest wartością zapasową, więc to on wyznacza zestaw.
 *
 * LICZEBNIKI: turecki ma dwie kategorie CLDR (one, other), ale rzeczownik po
 * liczebniku zostaje w liczbie pojedynczej („5 okuma”, nie „5 okumalar”) —
 * dlatego obie formy brzmią tak samo. To nie jest niedopatrzenie.
 *
 * TERMINOLOGIA: renk sıcaklığı (temperatura barwowa), titreşim (migotanie),
 * melanopik oran (współczynnik melanopiczny), sirkadiyen etki (wpływ na rytm
 * dobowy), düzgünlük (równomierność) — po jednym odpowiedniku na pojęcie.
 *
 * APOSTROF: w napisach stoi ’ (U+2019), a nie ASCII-owy ' — ten drugi rozerwałby
 * napis w pojedynczych cudzysłowach.
 */
window.I18nData = window.I18nData || {};
window.I18nData['tr'] = Object.assign(window.I18nData['tr'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu (UE)
     2017/745, gdzie stoi na początku zdania jako podmiot. */
  'app.name': 'Işık Monitörü',

  /* ---- wybór języka ---- */

  'language.label': 'Dil',
  'language.help': 'Uygulamanın tamamının dili. Bütün diller zaten bu cihazda — hiçbir şey indirilmez ve hiçbir yere hiçbir şey gönderilmez.',
  'language.auto': 'Cihaza göre',
  'language.autoHint': 'Telefonunuzda ya da tarayıcınızda ayarlanmış dile uyar.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Mavi oranı',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'yüzde',
  'metric.share.short': 'Görülen ışığın ne kadarı mavi kanala düşüyor.',
  'metric.share.help': 'Rengi parlaklıktan ayırır — gece modunu açtığınızda değişen değer budur.',

  'metric.brightness.name': 'Sahne parlaklığı',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'yüzde',
  'metric.brightness.short': 'Kamera görüntüsünün ortalama parlaklığı.',
  'metric.brightness.help': 'Lüks değil, göreli bir değer — kamera pozlamayı arka planda kendisi kaydırır.',

  'metric.kelvin.name': 'Renk sıcaklığı',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'kelvin',
  'metric.kelvin.short': 'Işık sıcak mı, soğuk mu.',
  'metric.kelvin.help': '3000 K altında ışık sıcaktır ve akşamları daha yumuşaktır. 6500 K çoğu ekranın varsayılan beyazıdır.',

  'metric.melanopic.name': 'Sirkadiyen etki',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'kat',
  'metric.melanopic.short': 'Bu ışık biyolojik saat üzerinde ne kadar güçlü etki yapıyor.',
  'metric.melanopic.help': 'Melanopik oranın bir yaklaşımı. 1,00 nötr gün ışığı beyazıdır; akşamları 0,50 altına inmekte yarar var.',

  'metric.flicker.name': 'Titreşim',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'yüzde',
  'metric.flicker.short': 'Işık kaynağının gözle görünmeyen yanıp sönmesi.',
  'metric.flicker.help': 'Ucuz ışık kısıcılar ve arka aydınlatmalar yanıp söner. Göz bunu görmez ama bu, yorgunluğun ve baş ağrısının bilinen bir nedenidir.',

  'metric.uniformity.name': 'Düzgünlük',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'yüzde',
  'metric.uniformity.short': 'Işığın karede eşit dağılıp dağılmadığı.',
  'metric.uniformity.help': 'Ekranda düşük değer arka ışık sızmasına ya da bir yansımaya işaret eder; masada ise kötü yerleştirilmiş bir lambaya.',

  'metric.comfort.name': 'Göz konforu',
  'metric.comfort.unit': 'puan',
  'metric.comfort.unitSpoken': 'puan',
  'metric.comfort.short': 'Altı sayı yerine tek bir değerlendirme.',
  'metric.comfort.help': 'Diğer ölçümleri 0–100 arası bir puanda toplar ve puanı en çok neyin düşürdüğünü gösterir. Ağırlıklar bir standart değil, bizim editoryal değerlendirmemizdir.',

  'comfort.penalty.melanopic': 'Sirkadiyen etki',
  'comfort.penalty.kelvin': 'Soğuk ışık rengi',
  'comfort.penalty.flicker': 'Titreşim',
  'comfort.penalty.uniformity': 'Dengesiz aydınlatma',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': 'Kamerayı açmak için “Başlat” düğmesine basın.',
  'engine.starting': 'Kamera başlatılıyor…',

  'engine.error.permission': 'Kameraya erişim izni yok. Tarayıcı ayarlarınızdan kameraya izin verin ve yeniden “Başlat” düğmesine basın.',
  'engine.error.notFound': 'Kamera bulunamadı. Cihazda bir kamera olduğunu ve sistemde kapatılmamış olduğunu kontrol edin.',
  'engine.error.busy': 'Kamera başka bir uygulama tarafından kullanılıyor. O uygulamayı kapatıp yeniden deneyin.',
  'engine.error.unknown': 'Kamera başlatılamadı.',
  'engine.error.unsupported': 'Bu tarayıcı bu sayfaya kamera erişimi vermiyor. Uygulamayı HTTPS üzerinden açın ya da başka bir tarayıcı kullanın.',

  /* ---- strefy ---- */

  'zone.good': 'Normal aralıkta',
  'zone.warning': 'Dikkat',
  'zone.critical': 'Kritik',
  'zone.none': 'Veri yok',
  'zone.settling': 'Belirleniyor',

  'zone.spoken.good': 'normal aralıkta',
  'zone.spoken.warning': 'dikkat',
  'zone.spoken.critical': 'kritik',
  'zone.spoken.none': 'veri yok',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'puan',
  'unit.hertz': 'Hz',
  'unit.second': 'sn',
  'unit.minute': 'dk',
  'unit.hour': 'sa',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'Bu ışık iyi durumda — belirlediğiniz eşiklerin hiçbiri aşılmıyor.',
  'verdict.noValue': 'Bu büyüklük şu anda ölçülemiyor. Objektifin önünün kapalı olmadığını kontrol edin.',
  'verdict.warmup': 'Değerlendirme belirleniyor — telefonu bir süre daha hareketsiz tutun.',

  'verdict.warning.share': 'Bu ışığın hatırı sayılır bir bölümü mavi kanala düşüyor. Akşamları kısmakta yarar var.',
  'verdict.warning.brightness': 'Sahne parlak — kamera ölçüm aralığının üst sınırına yakın çalışıyor.',
  'verdict.warning.kelvin': 'Işık oldukça soğuk. Akşamları 2700 K civarında bir ampul daha yumuşak olur.',
  'verdict.warning.melanopic': 'Bu ışık biyolojik saat üzerinde oldukça güçlü etki yapıyor.',
  'verdict.warning.flicker': 'Işık kaynağı belirgin biçimde yanıp sönüyor.',
  'verdict.warning.uniformity': 'Işık karede dengesiz dağılıyor.',
  'verdict.warning.comfort': 'Göz konforu düşmüş — buna aynı anda birkaç etken yol açıyor.',

  'verdict.critical.share': 'Çok fazla mavi var. Akşamları gece modunu açın ya da ışık kaynağını değiştirin.',
  'verdict.critical.brightness': 'Sahne çok parlak. Doğrudan ışık kaynağına bakarak ölçüm yapmayın.',
  'verdict.critical.kelvin': 'Işık soğuk. Akşamları gözü en çok yoran budur — daha sıcak bir ampul ya da gece modu yardımcı olur.',
  'verdict.critical.melanopic': 'Bu ışık biyolojik saat üzerinde güçlü etki yapıyor. Akşamları 0,50 altına inmekte yarar var.',
  'verdict.critical.flicker': 'Işık kaynağı güçlü biçimde yanıp sönüyor. Bu, göz yorgunluğunun ve baş ağrısının bilinen bir nedenidir.',
  'verdict.critical.uniformity': 'Işık çok dengesiz dağılıyor. Lambanın konumunu ya da ekrandaki yansımaları kontrol edin.',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'Göz konforu düşük. Puanı neyin düşürdüğünü görmek için puanın dökümüne bakın.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'Bu sayının söylemedikleri',
  'note.warningTitle': 'Dikkat',
  'note.dashTitle': 'Bu ölçüm ne değildir',
  'note.dashText': 'Telefon kamerasının üç geniş renk kanalı ve otomatik beyaz dengesi vardır — spektrum ölçmez. Renk sıcaklığı ve sirkadiyen etki, sRGB renklerinden hesaplanmış yaklaşık değerlerdir. Uygulama farkları ve zaman içindeki değişimleri iyi gösterir; bir ölçüm cihazının yerini tutmaz ve hiçbir tanı koymaz.',
  'note.approxLegend': '≈ yaklaşık değer — spektrum ölçümünden değil, sRGB renklerinden hesaplanmıştır.',
  'note.kelvinOutOfRange': 'Yöntemin kapsamı dışında — bu renkte renk sıcaklığı formülü güvenilir olmaktan çıkar.',
  'note.flickerOutOfRange': 'Yöntemin kapsamı dışında — {rate} Hz örnekleme yalnızca {limit} Hz altındaki yanıp sönmeleri görür. Şebekenin 100 Hz’i erişim dışıdır ve uygulama bunu hiçbir zaman sonuç olarak vermez.',
  'note.helpTitle': 'Bu sayının söylemedikleri',
  'note.helpText': 'Telefon kamerasının üç geniş kanalı vardır ve spektrum ölçmez. Bu değer karşılaştırmalı bir göstergedir — ışıklar arasındaki farkları ve zaman içindeki değişimleri iyi gösterir; ne laboratuvar ölçümüdür ne de tıbbi bilgidir.',
  'note.calibration': 'Kalibrasyonsuz ölçüm — değerleri karşılaştırmalı olarak ele alın.',

  'note.howToTitle': 'Nasıl anlamlı ölçüm yapılır',
  'note.howTo.hold.title': 'Telefonu hareketsiz tutun',
  'note.howTo.hold.text': 'Otomatik pozlamanın oturması için 2–3 saniye gerekir.',
  'note.howTo.aim.title': 'Aydınlatılmış bir yüzeye doğrultun',
  'note.howTo.aim.text': 'Beyaz bir kâğıt ya da açık renkli bir duvar. Doğrudan ışık kaynağına bakarak ölçüm yapmayın.',
  'note.howTo.compare.title': 'Karşılaştırın, mutlak yargıda bulunmayın',
  'note.howTo.compare.text': 'Aydınlatma değişmeden önceki ve sonraki aynı sahne, tek bir sayıdan daha çok şey söyler.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone — nie skraca się go dla stylu. */

  'legal.noDiagnosis': 'Hiçbir sonuç tanı ya da sağlık tavsiyesi değildir.',
  'legal.mdr': '{app}, (AB) 2017/745 sayılı Tüzük anlamında bir tıbbi cihaz değildir; herhangi bir hastalık durumunun teşhisine, önlenmesine, izlenmesine veya tedavisine hizmet etmez ve doktor ya da optometrist muayenesinin yerini tutmaz.',

  /* ---- prywatność ---- */

  'privacy.title': 'Bu cihazdan ne çıkıyor',
  'privacy.short': 'Bu uygulamada hiçbir şey ağa bir şey göndermez. Bütün sayılar bu cihazda üretilir ve burada kalır.',
  'privacy.onDevice': 'Kamera ancak siz düğmeye bastıktan sonra açılır ve görüntü bu cihazdan hiçbir zaman çıkmaz.',
  'privacy.external': 'Uygulamanın tamamında bu cihazdan bir şeyin çıktığı tek yer burasıdır: düğme yeni bir sekmede dış bir sayfa açar ve bu ancak siz bastıktan sonra olur. Ölçüm, geçmiş ve ayarlar burada kalır.',
  'privacy.externalPending': 'Adres hazır olduğunda düğme yeni bir sekmede dış bir sayfa açacak. Bu cihazdan bir şeyin çıktığı tek an bu olacak. Ölçüm, geçmiş ve ayarlar burada kalır.',
  'privacy.storageBlocked': 'Bu tarayıcı hiçbir şeyin kaydedilmesine izin vermiyor (gizli mod ya da engellenmiş site verileri). Ölçüm çalışır ama sekmeyi kapattığınızda geçmiş kaybolur.',

  /* ---- liczebniki ----
     Turecki ma dwie kategorie CLDR: one i other. Rzeczownik po liczebniku
     zostaje w liczbie pojedynczej, więc obie formy są takie same — formę
     wybiera Intl.PluralRules('tr'), nie nasza reguła. */

  'count.readings': { one: '{n} okuma', other: '{n} okuma' },
  'count.sessions': { one: '{n} ölçüm', other: '{n} ölçüm' },
  'count.seconds': { one: '{n} saniye', other: '{n} saniye' },
  'count.minutes': { one: '{n} dakika', other: '{n} dakika' },
  'count.hours': { one: '{n} saat', other: '{n} saat' },
  'count.days': { one: '{n} gün', other: '{n} gün' }
});
