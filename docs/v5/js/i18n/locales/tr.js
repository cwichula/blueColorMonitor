/* Monitor Światła v5 — słownik turecki.
 *
 * Powstał z pl.js (źródło TREŚCI) i z en.js (wzorzec TERMINOLOGII i rejestru).
 * Nie jest kalką żadnego z nich: zdania przełożono na naturalną turecczyznę,
 * a nie słowo w słowo. Zachowane zostało to, co niesie znaczenie: liczby,
 * progi, jednostki, nazwy wstawek i — co do treści — zastrzeżenia medyczne
 * oraz zdania o prywatności. Tych ostatnich nie wolno osłabiać ani wzmacniać:
 * „nie zastępuje rozmowy z lekarzem” ma po turecku znaczyć dokładnie tyle
 * samo, a „obraz nie opuszcza urządzenia” nie może stać się obietnicą szerszą
 * niż polska.
 *
 * REJESTR: grzeczna druga osoba liczby mnogiej („ölçün”, „ayarlayın”) bez
 * zaimka — tak mówią tureckie aplikacje użytkowe: ciepło i wprost, bez
 * urzędowego dystansu i bez poufałego „sen”.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych):
 *   mavi oranı, sahne parlaklığı, renk sıcaklığı, sirkadiyen etki
 *   (w opisie: melanopik oran), kırpışma, düzgünlük, görsel konfor.
 * MIGOTANIE to „kırpışma”, a NIE „titreşim”: „titreşim” jest w tym słowniku
 * zajęte przez wibrację silniczka (tools.measurement.haptics.title) i użycie
 * tego samego słowa w obu miejscach mieszałoby dwie różne rzeczy.
 * STREFY: güvenli / orta düzey / zararlı — mówią o świetle, a nie o stanie
 * aplikacji, i wchodzą w zdanie „bölge: {zone}” oraz „ortalamada {zone}”.
 * POZOSTAŁE STAŁE ODPOWIEDNIKI: geçmiş (historia), oturum (sesja),
 * örnek (próbka), ölçüm (pomiar), büyüklük (wielkość), eşik (próg).
 *
 * ZAPIS: cudzysłowy “ ”, apostrof ’, przecinek dziesiętny (1,00 / 0,50),
 * spacje nierozdzielające jako \u00A0, minus jako \u2212. Znak % stoi po
 * turecku PRZED liczbą („%40”), więc wstawka {percent} przesuwa się za
 * symbol — nazwa wstawki zostaje ta sama. Symbole jednostek (%, K, ×, Hz)
 * i nazwy formatów (CSV, JSON) bez zmian.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': '{name} ile bir metin'   — napis zwykły,
 *   'klucz.kropkowany': { one, other }           — forma zależna od liczby.
 * Turecki ma w CLDR dwie formy: `one` i `other`. Po liczebniku rzeczownik
 * turecki NIE przyjmuje końcówki mnogiej („3 oturum”, nie „3 oturumlar”),
 * więc obie formy są tu celowo identyczne: kategoria `other` musi istnieć,
 * bo wymaga jej Intl.PluralRules, ale treść zostaje w liczbie pojedynczej.
 * Nazwy wstawek są identyczne jak w pl.js — pilnuje tego keys.test.js.
 * Kolejność wstawek w zdaniu wolno zmieniać, nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Işık Monitörü',
  'app.description': 'Işık Monitörü — kamerayla çevrenizdeki ışığın yedi büyüklüğünü ölçer. Her şey bu cihazda hesaplanır, hiçbir şey ağa çıkmaz.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Işık Monitörü',
  'app.skipToContent': 'İçeriğe geç',
  'app.nav.aria': 'Ana gezinme',
  'app.noscript.title': 'Bu uygulama JavaScript gerektirir',
  'app.noscript.text': 'Ölçümün tamamı bu tarayıcı sekmesinde yapılır: kameradan gelen kareleri JavaScript okur ve yedi ışık büyüklüğünü onlardan hesaplar. JavaScript olmadan ölçecek bir şey kalmaz. Bu sayfa için JavaScript’i etkinleştirin ve sayfayı yeniden açın — yine de ağa hiçbir şey gönderilmeyecek.',

  'nav.measure': 'Ölçüm',
  'nav.history': 'Geçmiş',
  'nav.tools': 'Araçlar',
  'nav.support': 'Destek',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Ölçülüyor',
  'shell.live.aria': 'Ölçüm sürüyor. {metric}: {value}. Ölçüm ekranına dönün.',
  'shell.live.metricFallback': 'Öne çıkan büyüklük',
  'shell.action.fallback': 'Ekran eylemi',

  'shell.loadFail.title': '“{screen}” ekranı yüklenemedi',
  'shell.loadFail.text': 'Büyük olasılıkla cihazın belleğinde dosyaların bir kısmı eksik. Ağa bağlanın ve sayfayı yenileyin.',
  'shell.fatal.title': 'Bir şeyler ters gitti',
  'shell.fatal.text': 'Uygulama ekranı oluşturamadı. Sayfayı yenilemek genellikle yeterlidir — kayıtlı ölçümleriniz ve ayarlarınız yerinde kalır.',
  'shell.fatal.reload': 'Sayfayı yenile',
  'shell.boot.failTitle': 'Uygulama başlatılamadı',
  'shell.boot.failText': 'Kabuk başlamadı. Sayfayı yenileyin — kayıtlı ölçümleriniz ve ayarlarınız yerinde kalır.',
  'shell.background.error': 'Arka planda bir şey bozuldu',
  'shell.background.action': 'Yenile',
  'shell.update.title': 'Yeni sürüm hazır',
  'shell.update.action': 'Yenile',

  'onboarding.title': 'Başlamadan önce',
  'onboarding.lead': 'Işık Monitörü kamerayla çevrenizdeki ışığa bakar ve ondan yedi büyüklük hesaplar — mavi oranından görsel konfora kadar.',
  'onboarding.privacy': 'Görüntü bu cihazdan çıkmaz: sunucu yok, hesap yok, gönderim yok. Yedi büyüklüğün tamamı, oturum açmadan ve ücret ödemeden hemen çalışır.',
  'onboarding.honesty': 'Bu bir fikir verir; ölçüm cihazı da tıbbi bir tetkik de değildir. Ölçülemeyen şeyi göstermiyoruz — sayı yerine bir tire görürsünüz.',
  'onboarding.start': 'Başlayalım',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Uygula',
  'overlay.toast.close': 'Bildirimi kapat',
  'overlay.sheet.label': 'Pencere',
  'overlay.sheet.close': 'Kapat',
  'overlay.dialog.confirm': 'Onayla',
  'overlay.dialog.cancel': 'Vazgeç',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'Vazgeç',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'Ölçüm',

  'measure.intro.aria': 'Ölçümü başlat',
  'measure.intro.headline': 'Nasıl bir ışıktasınız, görün',
  'measure.intro.lead': 'Kamera, şu anda üzerinize düşen ışıkta ne kadar mavi olduğunu — ve günün bu saatinde bunun fazla olup olmadığını gösterir.',
  'measure.intro.start': 'Ölçümü başlat',
  'measure.intro.hint': 'Tarayıcı kamera izni isteyecek. İzni verdiğiniz anda ölçüm başlar.',
  'measure.intro.privacy': 'Kamera görüntüsü bu cihazda işlenir ve cihazdan hiç çıkmaz. Hiçbir kareyi göndermiyor, kaydetmiyor ve paylaşmıyoruz.',

  'measure.live.aria': 'Ölçüm sürüyor',
  'measure.badge.starting': 'Başlatılıyor',
  'measure.badge.paused': 'Duraklatıldı',
  'measure.badge.running': 'Ölçülüyor',
  'measure.stale': 'Görüntü bekleniyor — uygulama arka plandayken önizleme donar.',
  'measure.crop': 'Karenin ortasını ölçüyoruz — işaretli alan, görüntü genişliğinin ve yüksekliğinin %{percent} kadarı.',
  'measure.facing.front': 'ön kamera',
  'measure.facing.back': 'arka kamera',

  'measure.boot.title': 'Kamera başlatılıyor…',
  'measure.boot.text': 'Tarayıcı izin isterse verin — görüntü olmadan ölçülecek bir şey yok. İzin yalnızca bu sayfa için geçerlidir ve daha sonra geri alabilirsiniz.',
  'measure.boot.cancel': 'Vazgeç',

  'measure.hold': 'Göstergeler donduruldu. Kamera çalışmayı sürdürür ama geçmişe de ortalamalara da hiçbir şey gitmez.',
  'measure.gridHint': 'Bir büyüklüğü büyük göstergeye taşımak için kutucuğunu seçin.',

  'measure.stop': 'Durdur',
  'measure.pause': 'Duraklat',
  'measure.resume': 'Sürdür',
  'measure.flip.aria': 'Kamerayı değiştir',
  'measure.flip.toBack': 'Arka kameraya geç',
  'measure.flip.toFront': 'Ön kameraya geç',

  'measure.fail.aria': 'Kamera hatası',
  'measure.fail.headline': 'Kamera başlamadı',
  'measure.fail.retry': 'Yeniden deneyin',
  'measure.fail.back': 'Geri',
  'measure.fail.savedSession': 'Kesintiden önceki oturum ({duration}) geçmişe kaydedildi.',
  'measure.error.fallback': 'Kamera başlatılamadı.',

  'measure.summary.aria': 'Oturum özeti',
  'measure.summary.title': 'Oturum özeti',
  'measure.summary.paused': '{duration} duraklatıldı',
  'measure.summary.nothingMeasured': 'Hiçbir büyüklük okuma toplayamadı — kamera oturum boyunca ışık görmedi.',
  'measure.summary.note': 'Ortalamalar yalnızca duraklatma dışında alınan örnekleri sayar. Hiç ölçülemeyen büyüklükler sıfır sayılmaz, hesabın dışında bırakılır.',
  'measure.summary.nearThreshold': 'Eşiğe en yakın',
  'measure.summary.worstPoint': 'En zayıf nokta',
  'measure.summary.averageZone': 'ortalamada {zone}',
  'measure.summary.tooShort': 'Oturum {duration} sürdü — geçmişe kendiliğinden geçmek için fazla kısa. İsterseniz elle kaydedebilirsiniz.',
  'measure.summary.again': 'Yeniden ölç',
  'measure.summary.save': 'Geçmişe kaydet',
  'measure.summary.saved': 'Geçmişe kaydedildi',
  'measure.summary.savedToast': 'Oturum geçmişe kaydedildi.',
  'measure.summary.close': 'Kapat',

  'measure.method.title': 'Bunu nasıl ölçüyoruz',
  'measure.method.p1': 'Uygulama kamera görüntüsünü saniyede on kez örnekler ve büyüklükleri karenin ortadaki %{percent} alanından hesaplar — önizlemedeki nişan çerçevesi tam olarak bu bölgeyi gösterir.',
  'measure.method.p2': 'Telefon kamerasının üç geniş kanalı, bir de kendi otomatik pozlaması ile beyaz dengesi vardır. Işığın tayfını değil, oranlarını görür.',
  'measure.method.p3': 'Mavi oranı, parlaklık, kırpışma ve düzgünlük kameranın gerçekten ölçtüğü büyüklüklerdir. Renk sıcaklığı ile sirkadiyen etki ise sRGB ana renklerinden hesaplanan, açıkça belirtilmiş yaklaşık değerlerdir.',
  'measure.method.p4': 'Kırpışma yalnızca dört hertzin altında görülebilir. Şebekenin 100 Hz kırpışması bu örnekleme hızının çok ötesinde kalır ve hiçbir zaman okuma olarak verilmez.',
  'measure.method.p5': 'Bu sayıların hiçbiri fotometrik bir ölçüm ya da tıbbi bir sonuç değildir. Kamera görüntüsü cihazdan çıkmaz.',
  'measure.method.ok': 'Anladım',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'Kamera başlatma iptal edildi.',
  'measure.announce.stoppedNoSamples': 'Ölçüm durduruldu. Hiç örnek toplanmadı.',
  'measure.announce.stopped': 'Ölçüm durduruldu. Oturum özeti hazır.',
  'measure.announce.interrupted': 'Ölçüm kesildi. Oturum özeti hazır.',
  'measure.announce.paused': 'Ölçüm duraklatıldı. Göstergeler donduruldu.',
  'measure.announce.resumed': 'Ölçüm sürdürüldü.',
  'measure.announce.switchedFront': 'Ön kameraya geçildi. Yeni bir oturum başlıyor.',
  'measure.announce.switchedBack': 'Arka kameraya geçildi. Yeni bir oturum başlıyor.',
  'measure.announce.lead': 'Öne çıkan büyüklük: {metric}.',
  'measure.announce.cameraError': 'Kamera hatası. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'Işık oturum boyunca güvenli aralıkta kaldı — lambanın ayarını olduğu gibi bırakın ve hava karardıktan sonra, başka bir kaynak yanarken yeniden bakın.',
  'measure.advice.share.evening': 'Mavi oranı ortalama {value} çıktı — ekranlarda gece modunu açın, tavan ışığını söndürüp masa yüksekliğinde tek bir sıcak lamba bırakın.',
  'measure.advice.share.day': 'Mavi oranı ortalama {value} çıktı — gündüz için kabul edilebilir, ama ekranın yatmadan iki saat önce kendiliğinden sıcak moda geçmesini ayarlayın.',
  'measure.advice.brightness': 'Kare aşırı pozlanmıştı (ortalama {value}) — ışık kaynağından uzaklaşın ya da ölçtüğünüz ekranın parlaklığını düşürün; bu pozlamada diğer büyüklükler de doğruluk kaybeder.',
  'measure.advice.kelvin.evening': 'Renk sıcaklığı ortalama {value} düzeyinde kaldı — hava karardıktan sonra 3000 K altına inin: lambayı sıcak moda alın ya da 2700 K bir ampul takın.',
  'measure.advice.kelvin.day': 'Renk sıcaklığı ortalama {value} düzeyinde kaldı — gündüz için iyi, canlandırıcı bir beyaz, ama akşam aynı lambayı 2700 K değerine getirin.',
  'measure.advice.melanopic.evening': 'Sirkadiyen etki ortalama {value} çıktı — yatmadan önceki iki saatte 0,50 × altına inin: ana ışığı kısın ve tavandan değil, masa yüksekliğinden aydınlatın.',
  'measure.advice.melanopic.day': 'Sirkadiyen etki ortalama {value} çıktı — günün bu saatinde bu doz işe yarar, ama akşam bu kaynağı daha zayıf ve daha sıcak bir kaynakla değiştirin.',
  'measure.advice.flicker': 'Kırpışma ortalama {value} düzeyine ulaştı — bunun ardında genellikle bir karartıcı ya da çok kısılmış bir arka aydınlatma vardır: ekran parlaklığını %40 üzerine çıkarın ya da karartıcıyı PWM kullanmayan biriyle değiştirin.',
  'measure.advice.uniformity': 'Işık düzensiz düşüyordu (ortalama {value}) — tek güçlü nokta yerine lambayı masanın yan tarafına alın ve karşı taraftan ikinci, daha zayıf bir kaynak ekleyin.',
  'measure.advice.comfort': 'Görsel konfor ortalama {value} çıktı — tek bir değişiklikle başlayın: ana kaynağın parlaklığını yarıya indirin, ışığın rengiyle ancak ondan sonra ilgilenin.',
  'measure.advice.default': 'Aydınlatmanızda tek bir şeyi değiştirip yeniden ölçün — iki oturumu karşılaştırmak tek bir okumadan daha çok şey söyler.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'Geçmiş',
  'history.action.export': 'Geçmişi dışa aktar',

  'history.metricGroup.aria': 'Ölçülen büyüklüğün seçimi',
  'history.announce.metric': 'Büyüklük: {metric}',
  'history.rangeGroup.aria': 'Zaman aralığı',
  'history.range.aria': 'Son {range}',

  'history.stats.title': 'Aralık istatistikleri',
  'history.stats.head': '{metric}\u00A0—\u00A0son {range}',
  'history.stats.note': 'Grafikte görünenden hesaplanır. Ölçüm yapılmayan süre hesaba katılmaz — yerine sıfır koymuyoruz.',
  'history.stat.min': 'En düşük',
  'history.stat.avg': 'Ortalama',
  'history.stat.max': 'En yüksek',
  'history.trend.up': 'bu aralıkta yükseliyor',
  'history.trend.flat': 'belirgin bir değişim yok',
  'history.trend.down': 'bu aralıkta düşüyor',
  'history.trend.none': 'karşılaştıracak veri yok',

  'history.sessions.title': 'Ölçüm oturumları',
  'history.sessions.count': '{sessions}, en yenisi başta',
  'history.sessions.empty': 'Henüz oturum yok',
  'history.sessions.hint': 'Ölçümü durdurduğunuzda oturum kaydedilir.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'aralık: {range}',
  'history.session.noMeasure': 'ölçüm yok',

  'history.data.title': 'Veriler',
  'history.data.subtitle': 'Geçmiş yalnızca bu cihazda saklanır.',
  'history.export.csv': 'CSV dışa aktar',
  'history.export.json': 'JSON dışa aktar',
  'history.export.ok': 'Dosya kaydedilmeye hazır',
  'history.export.fail': 'Dosya hazırlanamadı. Gizli modda ve başka bir uygulamanın içine gömülü pencerede tarayıcı kaydetmeyi engeller — sayfayı normal bir sekmede açın.',
  'history.export.sheet.title': 'Geçmişi dışa aktarma',
  'history.export.sheet.text': 'CSV, hesap tablosunda açılır (noktalı virgülle ayrılmış, ondalık ayırıcı virgül). JSON her şeyi korur: oturum listesini ve ölçümün olmadığı boşlukları da.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Geçmişi temizle',
  'history.clear.title': 'Geçmiş temizlensin mi?',
  'history.clear.text': '{points} ve {sessions} silinecek. Bu geri alınamaz — verileri saklamak istiyorsanız önce dışa aktarın.',
  'history.clear.confirm': 'Temizle',
  'history.clear.announce': 'Geçmiş temizlendi.',
  'history.clear.toast': 'Geçmiş temizlendi',

  'history.empty.title': 'Henüz gösterilecek bir şey yok',
  'history.empty.text': 'Geçmiş ölçüm sırasında dolar — saniyede bir nokta. Her şey bu cihazda kalır.',
  'history.empty.action': 'Ölçüme git',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 dk',
  'range.5m': '5 dk',
  'range.1h': '1 sa',
  'range.24h': '24 sa',
  'range.7d': '7 gün',
  'range.30d': '30 gün',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Tarih ve saat',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'Cihazın belleği dolu — yeni ölçümler artık kaydedilmiyor.',
  'storage.blocked': 'Tarayıcı geçmişin kaydedilmesine izin vermiyor — sekmeyi kapattığınızda veriler kaybolacak.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Araçlar',
  'tools.action.about': 'Ölçüm hakkında',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Dil',
  'tools.language.subtitle': 'Uygulama varsayılan olarak cihazın dilini izler; bu listeden yapılan seçim hemen geçerli olur ve bu tarayıcıda kalır.',
  'tools.language.aria': 'Arayüz dili',
  'tools.language.system': 'Otomatik',
  'tools.language.announce': 'Arayüz dili: {language}.',

  'tools.appearance.title': 'Görünüm',
  'tools.appearance.theme.title': 'Tema',
  'tools.appearance.theme.desc': '“Otomatik”, sistem ayarını izler.',
  'tools.appearance.theme.aria': 'Tema',
  'tools.theme.system': 'Otomatik',
  'tools.theme.light': 'Açık',
  'tools.theme.dark': 'Koyu',
  'tools.appearance.accent.title': 'Vurgu rengi',
  'tools.appearance.accent.desc': 'Düğmelerin, seçimlerin ve kaydırıcıların rengi.',
  'tools.appearance.accent.aria': 'Vurgu rengi',
  'tools.appearance.textScale.title': 'Yazı boyutu',
  'tools.appearance.textScale.desc': 'Yalnızca yazıları değil, arayüzün tamamını büyütür.',
  'tools.appearance.textScale.aria': 'Yazı boyutu',
  'tools.appearance.density.title': 'Yoğunluk',
  'tools.appearance.density.desc': 'Sıkışık düzen tek ekrana daha çok içerik sığdırır.',
  'tools.appearance.density.aria': 'Düzen yoğunluğu',
  'tools.density.comfortable': 'Normal',
  'tools.density.compact': 'Sıkışık',
  'tools.appearance.motion.title': 'Daha az hareket',
  'tools.appearance.motion.desc': 'Animasyonları ve ibrenin yumuşak hareketini kapatır. Sistem ayarınıza her durumda uyulur.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Okyanus',
  'accent.violet': 'Mor',
  'accent.amber': 'Kehribar',
  'accent.mint': 'Nane',
  'accent.rose': 'Gül',

  'tools.thresholds.title': 'Eşikler',
  'tools.thresholds.subtitle': 'Uygulamanın hangi değerden sonra “orta düzey”, hangi değerden sonra “zararlı” diyeceği. Varsayılan eşikler bizim önerimizdir, bir standart değil — kendinize göre ayarlayın.',
  'tools.thresholds.warn': 'Uyarı eşiği',
  'tools.thresholds.crit': 'Alarm eşiği',
  'tools.thresholds.warn.aria': 'Uyarı eşiği — {metric}',
  'tools.thresholds.crit.aria': 'Alarm eşiği — {metric}',
  'tools.thresholds.reset': 'Varsayılan',
  'tools.thresholds.reset.aria': 'Varsayılan eşikleri geri yükle: {metric}',
  'tools.thresholds.moved': '{threshold} {value} değerine taşındı.',
  'tools.thresholds.resetAll': 'Tüm eşikleri geri yükle',
  'tools.thresholds.resetAll.title': 'Varsayılan eşikler geri yüklensin mi?',
  'tools.thresholds.resetAll.text': 'Yedi büyüklüğün tamamı uygulamanın önerdiği eşiklere döner. Ölçüm geçmişiniz olduğu gibi kalır.',
  'tools.thresholds.resetAll.confirm': 'Geri yükle',
  'tools.thresholds.resetAll.cancel': 'Kalsın',
  'tools.thresholds.resetAll.toast': 'Eşikler varsayılana döndü',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': '{warn} üzeri',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} ve altı',
  'tools.zoneRange.goodBelow': '{warn} altı',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} ve üzeri',

  'tools.calibration.title': 'Kalibrasyon',
  'tools.calibration.subtitle': 'Karşılaştıracak bir ölçümü olanlar için.',
  'tools.calibration.intro': 'Aynı lambaya çevrilen iki telefon birbirinden biraz farklı sayılar gösterir — her algılayıcının kendine özgü bir rengi vardır. Elinizde güvendiğiniz bir ölçüm varsa, görüntü kanallarını burada tek tek biraz yükseltebilir ya da kısabilirsiniz. Çarpanlar her hesaptan önce devreye girer, yani yedi büyüklüğü birden değiştirir.',
  'tools.calibration.neutral': 'Karşılaştıracak bir şeyiniz yok mu? 1,00 değerinde bırakın — fabrika ayarı budur ve hiçbir şeyi bozmaz.',
  'tools.calibration.forward': 'Değişiklik bundan sonrası için geçerlidir. Geçmişe daha önce kaydedilmiş ölçümler, kaydedildikleri andaki hâlleriyle kalır — onları geriye dönük yeniden hesaplamıyoruz, çünkü bu, verileri olan bittikten sonra değiştirmek olurdu.',
  'tools.calibration.reset': 'Kalibrasyonu sıfırla',
  'tools.calibration.reset.toast': 'Kalibrasyon sıfırlandı',
  'tools.calibration.channel.r': 'Kırmızı kanal',
  'tools.calibration.channel.g': 'Yeşil kanal',
  'tools.calibration.channel.b': 'Mavi kanal',
  'tools.calibration.channel.aria': '{channel} — kalibrasyon çarpanı',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'Ölçüm',
  'tools.measurement.wake.title': 'Ekran açık kalsın',
  'tools.measurement.wake.desc': 'Ölçüm sırasında ekran açık kalır. Pil o sırada daha hızlı biter.',
  'tools.measurement.wake.unsupported': 'Bu tarayıcı ekranın açık tutulmasına izin vermiyor.',
  'tools.measurement.haptics.title': 'Titreşim',
  'tools.measurement.haptics.desc': 'Başlatırken, durdururken ve büyüklük değişince kısa bir geri bildirim.',
  'tools.measurement.haptics.unsupported': 'Bu cihaz titreşim motoru bildirmiyor.',

  'tools.about.title': 'Ölçüm hakkında',
  'tools.about.subtitle': 'Yedi büyüklüğün her birinin tam olarak neyi hesapladığı ve bu yöntemin güvenilirliğinin nerede bittiği.',
  'tools.about.scale': 'Ölçek: {min} ile {max} arası.',
  'tools.about.threshold': '{warn} değerinden itibaren uyarır, {crit} değerinden itibaren alarm veririz.',
  'tools.about.thresholdInvert': '{warn} altında uyarır, {crit} altında alarm veririz.',
  'tools.about.limitsHead': 'Bu ölçümün yapamadıkları',
  'tools.about.limit.spectrum.title': 'Kamera renkleri bir ölçüm cihazı gibi görmez',
  'tools.about.limit.spectrum.text': 'Telefon kamerasının üç kanalı vardır: kırmızı, yeşil ve mavi. Işık ölçüm cihazı ise bunları onlarca dar banda ayırır. Burada gördükleriniz bu üç sayıdan türetilmiştir — makul bir yolla, ama yine de bir hesaptır, ölçülmüş bir tayf değil.',
  'tools.about.limit.exposure.title': 'Kamera parlaklığını kendi ayarlar',
  'tools.about.limit.exposure.text': 'Telefonu pencereye çevirdiğinizde kamera, görüntüyü aşırı pozlamamak için karartır. “Sahne parlaklığı” o zaman düşer, oysa odada hiçbir şey değişmemiştir. Bu yüzden bu değeri odalar arasında değil, tek bir çekim içinde karşılaştırın.',
  'tools.about.limit.flicker.title': 'Yavaş bir kamera hızlı kırpışmayı yakalayamaz',
  'tools.about.limit.flicker.text': 'Görüntüyü saniyede {hz} kez inceliyoruz. Saniyede {nyquist} kezden hızlı bir yanıp sönme, böyle bir ölçümde olduğundan yavaş görünebilir ya da tamamen kaybolabilir — şebeke elektriğinden gelen kırpışma tam olarak böyledir. Uygulama bir şey yakalarsa bunu ölçülmüş bir frekans olarak değil, “burada bir şey kırpışıyor” işareti olarak alın.',
  'tools.about.limit.medical.title': 'Bu bir tıbbi tetkik ya da tıbbi tavsiye değildir',
  'tools.about.limit.medical.text': 'Uygulama, çevrenizdeki ışığın soğuk, parlak ya da huzursuz olduğunu fark etmenize yardım eder ve bu konuda neler yapılabileceğini önerir. Sağlığınız hakkında hüküm vermez; doktorla yapılacak bir görüşmenin ya da profesyonel bir ölçüm cihazıyla yapılan ölçümün yerini tutmaz.',
  'tools.about.privacy': 'Her şey cihazınızda hesaplanır. Kamera görüntüsü hiçbir yere gönderilmez ve kaydedilmez — belleğe yalnızca hesaplanan sayılar gider.',

  'tools.data.title': 'Veriler',
  'tools.data.subtitle': 'Her şey bu tarayıcının belleğinde durur ve buradan hiçbir yere gitmez.',
  'tools.data.summary.empty': 'Henüz kaydedilmiş bir ölçüm yok.',
  'tools.data.summary': 'Bellekte: {points} ve {sessions}.',
  'tools.data.export.csv': 'CSV dışa aktar',
  'tools.data.export.json': 'JSON dışa aktar',
  'tools.data.clear': 'Geçmişi temizle',
  'tools.data.reset': 'Varsayılan ayarlar',
  'tools.data.reset.title': 'Varsayılan ayarlar geri yüklensin mi?',
  'tools.data.reset.text': 'Görünüm, eşikler, kalibrasyon ve ölçüm ayarları başlangıç durumuna döner. Ölçüm geçmişiniz olduğu gibi kalır.',
  'tools.data.reset.confirm': 'Geri yükle',
  'tools.data.reset.toast': 'Varsayılan ayarlar geri yüklendi',
  'tools.data.wipe': 'Tüm verileri sil',
  'tools.data.wipe.title': 'Uygulamanın tüm verileri silinsin mi?',
  'tools.data.wipe.text': 'Şunlar gidecek: ölçüm geçmişinin tamamı ve oturum listesi, eşikleriniz ve kalibrasyonunuz, bir de görünüm ayarlarınız. Uygulama ilk açılıştaki durumuna döner.',
  'tools.data.wipe.note': 'Bu verilerin bizde bir kopyası yok — hiçbir zaman bu cihazdan çıkmadılar, dolayısıyla geri getirilecek bir yer de yok.',
  'tools.data.wipe.check': 'Bunun geri alınamayacağını anlıyorum',
  'tools.data.wipe.confirm': 'Hepsini sil',
  'tools.data.wipe.toast': 'Uygulamanın tüm verileri silindi',
  'tools.data.wipe.announce': 'Uygulamanın tüm verileri silindi. Ayarlar varsayılana döndü.',
  'tools.data.storage.blocked': 'Bu tarayıcı kalıcı olarak hiçbir şeyin kaydedilmesine izin vermiyor (gizli mod ya da engellenmiş site verileri). Burada yaptığınız her ayar, sekmeyi kapattığınızda kaybolacak.',
  'tools.data.storage.full': 'Tarayıcının belleği doldu ve yeni ölçümler artık kaydedilmiyor. Geçmişi temizlemek yer açar.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Destek',
  'support.free.title': 'Her şey açık',
  'support.free.lead': 'Yedi büyüklüğün tamamı, eksiksiz geçmiş, eşikler, kalibrasyon ve dışa aktarma ilk açılıştan itibaren çalışır — hesap yok, sınır yok, ücret yok.',
  'support.free.note': 'Ölçüm baştan sona bu cihazda hesaplanır ve ağ olmadan çalışır. Burada duvarın arkasında tuttuğumuz daha iyi bir sürüm yok.',
  'support.why.title': 'Neden rica ediyorum',
  'support.why.lead': 'Işık Monitörü mesai dışında yapılıyor; arkasında ne reklam, ne sponsor, ne de bir şirket var. Destek, düzeltmelere, yeni büyüklüklere ve hâlihazırda çalışanı ayakta tutmaya harcanan zamanı karşılıyor.',
  'support.what.title': 'Bağış ne kazandırır',
  'support.what.lead': 'Hiçbir şey. Bağış hiçbir şeyin kilidini açmaz — ne ek bir özellik, ne adınızın yanında bir rozet, ne de öncelik. Uygulamanın yapabildiği her şey zaten elinizde.',
  'support.what.note': 'Geriye yalnızca şu kalıyor: bunun birine yaradığını biliyorum. Bu gerçekten yeterli bir sebep.',
  'support.cta.title': 'Yardım etmek isterseniz',
  'support.cta.button': 'Bana bir kahve ısmarlayın',
  'support.cta.nolink': 'Bağış profili henüz bağlanmadı. Bağlandığında bu noktada bir düğme duracak.',
  'support.cta.privacy': 'Bu bağlantı, yeni bir sekmede dış bir siteyi (örneğin Buy Me a Coffee) açar. Bu cihazdan bir şeyin çıktığı tek an budur — ölçümün kendisi her zaman burada kalır.',
  'support.cta.privacyFuture': 'Adres yerine konduğunda düğme, yeni bir sekmede dış bir siteyi (örneğin Buy Me a Coffee) açacak. Bu cihazdan bir şeyin çıkacağı tek an o olacak — ölçümün kendisi her zaman burada kalır.',
  'support.cta.note': 'Burada ne geri sayım, ne hatırlatma, ne de kendiliğinden açılan bir pencere var. Bu rica yalnızca bu sekmede bekler.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'son bir dakika',
  'gauge.aria': '{metric}: {value}, bölge: {zone}',
  'gauge.aria.note': '{metric}: {value}, bölge: {zone}, {note}',
  'gauge.aria.initial': '{metric}: veri yok',
  'gauge.value.none': 'veri yok',
  /* Odczyt słowny z jednostką: „27 yüzde”, „1,20 kat”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'yaklaşık değer',
  'gauge.note.offScale': 'ölçek dışı',
  'gauge.metric.unknown': 'Bilinmeyen büyüklük',

  'chart.aria.label': 'Ölçüm geçmişi grafiği',
  'chart.hint': 'Etkileşimli grafik. Sol ve sağ oklar okuma imlecini kaydırır, Home ve End aralığın başına ve sonuna gider, Escape imleci gizler.',
  'chart.empty.title': 'Veri yok',
  'chart.empty.text': 'Ölçümü başlatın — grafik ilk okumalardan sonra belirir.',
  'chart.few.title': 'Veri yetersiz',
  'chart.few.text': 'Elimizde tek bir okuma var: {value}. Çizgi için iki gerekir.',
  'chart.legend.line': 'ölçüm',
  'chart.legend.gap': 'ölçümde boşluk',
  'chart.aria.head': 'Grafik: {metric}, aralık {range}',
  'chart.aria.empty': 'Bu aralıkta veri yok.',
  'chart.aria.one': 'Tek okuma: {value}.',
  'chart.aria.summary': '{min} ile {max} arası, ortalama {avg}, {points}.',
  'chart.aria.gaps': 'Dizide boşluklar var — o sırada ölçüm yapmıyorduk.',
  'chart.readout.empty': 'Bu aralıkta veri yok.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'Grafik çizmek için veri yetersiz.',
  'chart.readout.hint': 'Tek bir ölçümü okumak için grafiğin üzerinde sürükleyin ya da ok tuşlarını kullanın.',
  'chart.time.now': 'şimdi',
  'chart.time.justNow': 'az önce',
  'chart.time.ago': '{duration} önce',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} \u00B7 {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — turecki zegar jest dwudziestoczterogodzinny,
     a data pisze się „30 Ağu”. */
  'chart.sample.ago': '\u221230\u00A0dk',
  'chart.sample.clock': '00:00',
  'chart.sample.date': '30\u00A0Ağu',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'Mavi oranı',
  'metric.share.short': 'Görülen ışığın ne kadarı mavi kanala düşüyor.',
  'metric.share.help': 'Rengi parlaklıktan ayırır — gece modunu açtığınızda değişen değer budur.',
  'metric.brightness.name': 'Sahne parlaklığı',
  'metric.brightness.short': 'Kamera görüntüsünün ortalama parlaklığı.',
  'metric.brightness.help': 'Lüks değil, göreli bir değer — kameranın otomatik pozlaması onu alttan kaydırır.',
  'metric.kelvin.name': 'Renk sıcaklığı',
  'metric.kelvin.short': 'Işık sıcak mı, soğuk mu.',
  'metric.kelvin.help': '3000 K altında ışık sıcaktır ve akşamları daha yumuşaktır. 6500 K, çoğu ekranın varsayılan beyazıdır.',
  'metric.melanopic.name': 'Sirkadiyen etki',
  'metric.melanopic.short': 'Bu ışık biyolojik saate ne kadar güçlü etki ediyor.',
  'metric.melanopic.help': 'Melanopik oranın yaklaşık değeri. 1,00 nötr gün ışığı beyazıdır; akşamları 0,50 altına inmekte yarar var.',
  'metric.flicker.name': 'Kırpışma',
  'metric.flicker.short': 'Işık kaynağının gözle görülmeyen yanıp sönmesi.',
  'metric.flicker.help': 'Ucuz karartıcılar ve arka aydınlatmalar yanıp söner. Göz bunu fark etmez ama yorgunluğun ve baş ağrısının bilinen bir nedenidir.',
  'metric.uniformity.name': 'Düzgünlük',
  'metric.uniformity.short': 'Işık karede eşit dağılıyor mu.',
  'metric.uniformity.help': 'Ekranda düşük bir değer arka aydınlatma sızması ya da yansıma demektir; masada ise kötü yerleştirilmiş bir lamba.',
  'metric.comfort.name': 'Görsel konfor',
  'metric.comfort.short': 'Altı sayı yerine tek bir puan.',
  'metric.comfort.help': 'Diğer ölçümleri 0–100 arası bir puana toplar ve onu en çok neyin düşürdüğünü gösterir. Ağırlıklar bir standart değil, bizim editoryal değerlendirmemizdir.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'güvenli',
  'zone.warn': 'orta düzey',
  'zone.crit': 'zararlı',
  'zone.none': 'veri yok',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 Ağu'). */
  'date.month.short.1': 'Oca',
  'date.month.short.2': 'Şub',
  'date.month.short.3': 'Mar',
  'date.month.short.4': 'Nis',
  'date.month.short.5': 'May',
  'date.month.short.6': 'Haz',
  'date.month.short.7': 'Tem',
  'date.month.short.8': 'Ağu',
  'date.month.short.9': 'Eyl',
  'date.month.short.10': 'Eki',
  'date.month.short.11': 'Kas',
  'date.month.short.12': 'Ara',

  'date.clock': '{hours}:{minutes}',
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0{year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0sa',
  'time.duration.hourMinute': '{hours}\u00A0sa {minutes}\u00A0dk',
  'time.duration.hour': '{hours}\u00A0sa',
  'time.duration.minuteSecond': '{minutes}\u00A0dk {seconds}\u00A0sn',
  'time.duration.minute': '{minutes}\u00A0dk',
  'time.duration.second': '{seconds}\u00A0sn',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „az önce”. */
  'time.justNow': 'az önce',
  'time.aMinuteAgo': 'bir dakika önce',
  'time.minutesAgo': '{minutes}\u00A0dk önce',
  'time.hoursAgo': '{hours}\u00A0sa önce',
  'time.yesterday': 'dün',
  'time.daysAgo': '{days}\u00A0gün önce',

  /* Formy zależne od liczby. Turecki ma w CLDR dwie: `one` i `other`.
     Po liczebniku rzeczownik nie przyjmuje końcówki mnogiej („3 oturum”),
     więc obie formy są celowo takie same — kategoria `other` musi jednak
     istnieć, bo wymaga jej Intl.PluralRules. */
  'time.days.plural': { one: 'gün', other: 'gün' },
  'unit.sample.plural': { one: 'örnek', other: 'örnek' },
  'unit.measurement.plural': { one: 'ölçüm', other: 'ölçüm' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Turecki po liczebniku zostawia rzeczownik bez końcówki w obu zdaniach
     („3 oturum, en yenisi başta”, „3 oturum silinecek”) — oba klucze zostają,
     bo kształt słownika jest wspólny, a wartości są tu identyczne. */
  'unit.session.plural': { one: 'oturum', other: 'oturum' },
  'unit.session.accusative.plural': { one: 'oturum', other: 'oturum' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy — po turecku także dwa różne słowa: „nokta” i „puan”. */
  'unit.chartPoint.plural': { one: 'nokta', other: 'nokta' },
  'unit.point.plural': { one: 'puan', other: 'puan' },
  'unit.kelvin.plural': { one: 'kelvin', other: 'kelvin' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „yüzde”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'yüzde',
  'unit.spoken.times': 'kat',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'Kamera erişimi için izin verilmedi. Tarayıcı ayarlarında bu sayfa için kameraya izin verin ve yeniden deneyin.',
  'camera.error.notfound': 'Kamera bulunamadı. Cihazda kamera olup olmadığını ve sistemde kapatılmadığını kontrol edin.',
  'camera.error.inuse': 'Kamera başka bir uygulama tarafından kullanılıyor. O uygulamayı ya da sekmeyi kapatıp yeniden deneyin.',
  'camera.error.insecure': 'Kamera yalnızca HTTPS üzerinden ya da localhost’ta çalışır. Bu sayfayı “https://” ile başlayan bir adreste açın.',
  'camera.error.unsupported': 'Bu tarayıcı burada kamerayı kullandırmıyor. Chrome ya da Safari’de, başka bir uygulamanın içine gömülü önizlemede değil, normal bir pencerede deneyin.',
  'camera.error.unknown': 'Kamera başlatılamadı.'
};
