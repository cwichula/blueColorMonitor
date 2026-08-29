/* docs/v1/i18n/tr.js — słownik WŁASNY wersji v1, turecki.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka. Kolejność jest treścią umowy: plik wersji dokłada się do tego samego
 * obiektu i może nadpisać dowolny klucz wspólny — nigdy odwrotnie.
 *
 * DLACZEGO TEN SŁOWNIK JEST SAMOWYSTARCZALNY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar w app.js, własne
 * dwie wielkości zamiast siedmiu i własne nazwy stref („Güvenli” zamiast
 * wspólnego „Normal aralıkta”). Dlatego wszystko, co v1 pokazuje, stoi TUTAJ —
 * także klucze, które przypadkiem brzmią tak samo jak wspólne. Zestaw kluczy
 * jest dokładnie taki sam jak w pl.js tego katalogu — pilnuje tego
 * docs/shared/i18n/keys.test.js.
 *
 * TERMINOLOGIA jest wzięta ze słownika wspólnego docs/shared/i18n/tr.js i z v5,
 * żeby ta sama rzecz nie nazywała się w v1 inaczej niż w pozostałych wersjach:
 *   mavi oranı (udział niebieskiego), sahne parlaklığı (jasność sceny),
 *   renk sıcaklığı (temperatura barwowa), eşik (próg), bölge (strefa),
 *   okuma (odczyt), oturum (sesja), geçmiş (historia).
 * NAZWY STREF są własne dla v1 i idą za v5: güvenli / orta düzey / zararlı —
 * mówią o świetle, a nie o stanie aplikacji. Wersja plakatowa (zone.badge.*)
 * jest osobnym kluczem, a nie zapisem wielkimi literami przez CSS: tureckie
 * „i” zamienia się na „İ”, czego automat w przeglądarce nie zrobi poprawnie.
 *
 * REJESTR: grzeczna druga osoba liczby mnogiej („basın”, „ayarlayın”) bez
 * zaimka — tak mówią tureckie aplikacje użytkowe.
 *
 * ZAPIS: cudzysłowy “ ”, apostrof ’ (U+2019), a nie ASCII-owy ' — ten drugi
 * rozerwałby napis w pojedynczych cudzysłowach. Znak % stoi po turecku PRZED
 * liczbą („%33”), więc wstawka {percent} przesuwa się za symbol — nazwa
 * wstawki zostaje ta sama. Symbole jednostek (%, K, ×, Hz) i nazwy formatów
 * (CSV) bez zmian.
 *
 * MARKUP W WARTOŚCIACH. Część kluczy (rozdziały Dokumentacji) zawiera znaczniki
 * <b>, <i>, <code> i encje HTML. Wstawiane są przez data-i18n-html, czyli tylko
 * tam, gdzie autor tekstu świadomie tego chciał — nigdy do treści pochodzącej
 * od użytkownika.
 */
window.I18nData = window.I18nData || {};
window.I18nData['tr'] = Object.assign(window.I18nData['tr'] || {}, {

  /* ---- aplikacja ---- */

  'app.name': 'Zararlı Işık Monitörü',
  'app.description': 'Kamerayla ekrandaki mavi rengin şiddetini ölçer ve bunu güvenli, orta düzey ve zararlı bölgeleriyle anlaşılır bir grafikte gösterir.',

  /* ---- wybór języka ---- */

  'language.label': 'Dil',
  'language.help': 'Uygulamanın tamamının dili. Bütün diller zaten bu cihazda — hiçbir şey indirilmez ve hiçbir yere hiçbir şey gönderilmez.',
  'language.auto': 'Cihaza göre',

  /* ---- nawigacja ---- */

  'nav.aria': 'Ana menü',
  'nav.tabsAria': 'Uygulama görünümleri',
  'nav.announce': 'Ekran: {screen}',
  'nav.camera': 'Kamera',
  'nav.monitoring': 'İzleme',
  'nav.support': 'Destek',
  'nav.more': 'Diğer',
  'nav.docs': 'Belgeler',
  'nav.about': 'Hakkında ve iletişim',
  'nav.settings': 'Uyarı eşikleri',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← Geri',
  'action.back.aria': 'Önceki ekrana dön',
  'action.openDocs': 'Belgelere git',
  'action.exportCsv': 'CSV dışa aktar',
  'action.delete': 'Sil',
  'action.closeNotification': 'Bildirimi kapat',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref — „Güvenli / Orta düzey / Zararlı”, a nie
     wspólne „Normal aralıkta / Dikkat / Kritik”. Wersja plakatowa
     (zone.badge.*) jest osobnym kluczem, a nie zapisem wielkimi literami przez
     CSS: tureckie „i” przechodzi w „İ”, a tego automat nie zrobi. */

  'zone.good': 'Güvenli',
  'zone.warning': 'Orta düzey',
  'zone.critical': 'Zararlı',
  'zone.none': 'Veri yok',

  'zone.badge.good': 'GÜVENLİ',
  'zone.badge.warning': 'ORTA DÜZEY',
  'zone.badge.critical': 'ZARARLI',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'B kanalı parlaklığı',
  'metric.raw.unitLabel': 'B kanalı parlaklığı (%)',
  'metric.share.name': 'Mavi oranı',
  'metric.share.longName': 'Işıktaki mavi oranı',
  'metric.share.unitLabel': 'Mavi oranı (%)',
  'stat.overallBrightness': 'Genel sahne parlaklığı',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': 'Kamera önizlemesi',
  'camera.pressStart': '“Başlat” düğmesine basın.',
  'camera.start': 'Başlat',
  'camera.stop': 'Durdur',
  'camera.switch': 'Kamerayı değiştir',
  'camera.error': 'Kamera başlatılamadı. Tarayıcının kamera iznini kontrol edip yeniden deneyin. ({message})',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': 'Güncel okumalar',
  'disclaimer.short': 'Yaklaşık bir sonuç. Bu bir tıbbi cihaz değildir.',
  'disclaimer.more': 'Daha fazla',

  /* ---- wykresy ---- */

  'chart.aria': 'Zaman içindeki grafikler',
  'chart.title': 'Zaman içindeki grafikler (son {seconds} sn)',
  'chart.empty': 'Grafiği görmek için kamerayı başlatın',
  'chart.axis.past': '-{seconds}sn',
  'chart.axis.now': 'şimdi',
  'chart.raw.aria': 'Zaman içinde B kanalı parlaklığı grafiği; güvenli, orta düzey ve zararlı bölgeler işaretli',
  'chart.share.aria': 'Zaman içinde ışıktaki mavi oranı grafiği; güvenli, orta düzey ve zararlı bölgeler işaretli',

  /* ---- tabela odczytów ---- */

  'table.show': 'Tablo olarak göster',
  'table.hide': 'Tabloyu gizle',
  'table.caption': 'Son okumalar (en yenisi başta)',
  'table.col.time': 'Saat',
  'table.col.zone': 'Bölge',

  /* ---- ustawienia progów ---- */

  'settings.title': 'Bölge eşiği ayarları',
  'settings.boundary.critical': 'Sarı / kırmızı sınırı:',
  'settings.boundary.warning': 'Yeşil / sarı sınırı:',

  /* ---- historia i raport (features.js) ---- */

  'history.title': 'Geçmiş ve rapor',
  'history.rangeAria': 'Geçmiş aralığı',
  'history.unavailable': 'Geçmiş verileri şu anda kullanılamıyor.',
  'history.empty': 'Bu aralıkta kaydedilmiş okuma yok. Ölçüme başlayın — geçmiş kendiliğinden birikir.',
  'history.savedReadings': 'Kaydedilen okumalar: {count}. Bölgelere göre süre dağılımı:',
  'history.zoneLine': '{zone}: %{percent} ({readings})',

  'range.1h': '1 sa',
  'range.24h': '24 sa',
  'range.7d': '7 gün',
  'range.30d': '30 gün',

  'report.dailyTitle': 'Günlük rapor',
  'report.empty': 'Seçilen aralıkta kaydedilmiş okumalar olduğunda rapor görünecek.',
  'report.dailyCaption': 'Gün gün, bölgelerde geçen sürenin oranı',
  'report.col.day': 'Gün',
  'report.col.week': 'Hafta',
  'report.col.readings': 'Okumalar',
  'report.compare.day': 'Günden güne karşılaştırma: {day} — sürenin %{percent} kadarı zararlı bölgede, {change}',
  'report.compare.dayPending': 'Günden güne karşılaştırma, ikinci ölçüm gününden sonra görünecek.',
  'report.compare.week': 'Haftadan haftaya karşılaştırma: {week} — sürenin %{percent} kadarı zararlı bölgede, {change}',
  'report.compare.weekPending': 'Haftadan haftaya karşılaştırma, ikinci ölçüm haftasından sonra görünecek.',
  'report.change.same': '{other} ile aynı.',
  'report.change.more': '{other} değerinden {points} fazla.',
  'report.change.less': '{other} değerinden {points} az.',
  'report.peak': 'Zararlı bölgedeki okumalar en çok {from} ile {to} arasında toplandı.',
  'report.peak.none': 'Bu aralıkta zararlı bölgede hiç okuma kaydedilmedi.',
  'report.weeklyTitle': 'Haftalık rapor',
  'report.weeklyEmpty': 'Seçilen aralıkta kaydedilmiş okumalar olduğunda haftalık rapor görünecek.',
  'report.weeklyCaption': 'Hafta hafta, bölgelerde geçen sürenin oranı',
  'report.weekLabel': '{week}. hafta ({year})',
  'report.footnote': 'Sayılar, seçilen aralıkta kaydedilen okumaların oranıdır; tam maruz kalma süresi değildir.',

  /* ---- profile progów ---- */

  'profiles.title': 'Eşik profilleri',
  'profiles.empty': 'Henüz kaydedilmiş profiliniz yok.',
  'profiles.itemActive': '{name} (etkin)',
  'profiles.applyAria': '{name} profilini uygula',
  'profiles.deleteAria': '{name} profilini sil',
  'profiles.applied': '“{name}” profili uygulandı.',
  'profiles.deleted': '“{name}” profili silindi.',
  'profiles.saved': '“{name}” profili kaydedildi.',
  'profiles.namePlaceholder': 'Profil adı (örneğin Akşam)',
  'profiles.saveLabel': 'Geçerli eşikleri profil olarak kaydet',
  'profiles.saveBtn': 'Profili kaydet',
  'profiles.needName': 'Bir profil adı girin.',
  'profiles.limit': {
    one: 'En çok {n} profil kaydedebilirsiniz. Yenisini eklemek için birini silin.',
    other: 'En çok {n} profil kaydedebilirsiniz. Yenisini eklemek için birini silin.'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku też — ale musi
     zostać bezpieczna dla systemu plików: bez ukośników, dwukropków i bez
     tureckich znaków diakrytycznych. */

  'csv.header': 'zaman;b_kanali_yuzde;mavi_orani_yuzde;sahne_parlakligi_yuzde;bolge',
  'csv.filename': 'isik-izleme-{stamp}.csv',
  'csv.empty': 'Dışa aktarılacak okuma yok. Ölçüme başlayıp yeniden deneyin.',
  'csv.done': '{readings} CSV dosyasına aktarıldı.',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut. Po turecku rzeczownik po liczebniku nie
     przyjmuje końcówki mnogiej („5 dakika”), więc obie formy brzmią tak samo —
     ale kategoria `other` musi istnieć, bo wymaga jej Intl.PluralRules. */

  'alert.exposure': {
    one: 'Eşik uyarısı: okuma {n} dakikadır zararlı bölgede. Bir ara vermeyi ya da ekrandaki mavi oranını azaltmayı düşünün.',
    other: 'Eşik uyarısı: okuma {n} dakikadır zararlı bölgede. Bir ara vermeyi ya da ekrandaki mavi oranını azaltmayı düşünün.'
  },

  'session.title': 'Son oturumun özeti',
  'session.line': 'Ölçüm süresi: {duration}. Kaydedilen okumalar: {count}.',
  'session.zoneLine': '{zone}: oturumun %{percent} kadarı.',
  'session.endedAt': 'Özet, {time} saatinde biten oturuma aittir.',
  'session.toast': 'Oturum bitti: {duration}, {readings}, sürenin %{percent} kadarı zararlı bölgede.',

  'duration.seconds': '{n} sn',
  'duration.minutesSeconds': '{minutes} dk {seconds} sn',

  /* ---- liczebniki ----
     Turecki ma dwie kategorie CLDR: one i other. Rzeczownik po liczebniku
     zostaje w liczbie pojedynczej („5 okuma”, nie „5 okumalar”), więc obie
     formy są celowo identyczne. Formę wybiera Intl.PluralRules('tr'), nie
     nasza reguła. */

  'count.readings': { one: '{n} okuma', other: '{n} okuma' },
  'count.points': {
    one: '{n} yüzde puanı',
    other: '{n} yüzde puanı'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': 'Diğer',
  'more.section.settings': 'AYARLAR',
  'more.section.help': 'YARDIM',
  'more.thresholds.title': 'Uyarı eşikleri',
  'more.thresholds.sub': 'Güvenli, orta düzey ve zararlı bölgelerin sınırlarını belirleyin.',
  'more.docs.title': 'Belgeler',
  'more.docs.sub': 'Ölçüm nasıl çalışır, birimler, standartlar ve bölgeler.',
  'more.about.title': 'Hakkında ve iletişim',
  'more.about.sub': 'Sürüm, gizlilik ve iletişim.',
  'more.free': 'Uygulamanın tamamı ücretsizdir.',
  'more.supportLink': 'İsterseniz gönüllü olarak destekleyebilirsiniz.',
  'more.version': 'Sürüm {version} · Tüm özellikler hesap açmadan ve ücret ödemeden kullanılabilir',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': 'Hakkında ve iletişim',
  'about.version': 'Sürüm {version}',
  'about.what.title': 'Bu uygulama nedir',
  'about.what.p1': '{app}, telefon kamerasıyla algılayıcının ne kadar mavi ışık kaydettiğini ölçer ve bunu iki gösterge ile bölgeli grafiklerde gösterir. Bütün özellikler — ölçüm, geçmiş, raporlar, eşik profilleri, eşik uyarısı, CSV dışa aktarma ve Belgeler — hesap açmadan ve ücret ödemeden herkese açıktır.',
  'about.what.p2': 'Uygulama “olduğu gibi”, bilgilendirme amacıyla sunulur. Ölçüm sonucu yaklaşıktır ve sağlıkla ilgili kararlara dayanak değildir.',
  'about.privacy.title': 'Gizlilik ve veriler',
  'about.privacy.p1': 'Kamera görüntüsü yalnızca cihazınızda çözümlenir ve hiçbir zaman hiçbir sunucuya gönderilmez. Hesap oluşturmuyoruz ve verilerinizi toplamıyoruz. Eşik ayarları, profiller ve ölçüm geçmişi yalnızca bu cihazın ve bu tarayıcının belleğine kaydedilir.',
  'about.privacy.p2': 'Uygulama reklam göstermez ve ağa seslenmez. Tek istisna “Destek” ekranındaki düğmedir: ona bastığınızda tarayıcı yeni bir sekmede dış bir sayfa açar. Siz bunu kendiniz yapmadıkça hiçbir şey olmaz.',
  'about.contact.title': 'İletişim',
  'about.contact.p1': 'Görüşler, hatalar ve öneriler: [E-MAIL]. Elimizden geldiğince yanıtlıyoruz — bu proje mesai dışında sürdürülüyor.',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': 'Destek',
  'support.free.title': 'Her şey açık',
  'support.free.text': 'Uygulamanın tamamı ücretsizdir: ölçüm, geçmiş ve raporlar, eşik profilleri, uyarı, CSV dışa aktarma ve Belgeler. Hepsi hemen çalışır — hesap yok, sınır yok, internet gerekmez.',
  'support.why': '{app} mesai dışında yapılıyor. İşinize yarıyorsa bana bir kahve ısmarlayabilirsiniz. Bu, uygulamayı ayakta tutmaya ve daha ileri götürmeye yardım eder — ölçümü iyileştirmeye, Belgeleri genişletmeye ve uygulamayı yeni telefonlarda denemeye.',
  'support.nothing': 'Bağış hiçbir şeyin kilidini açmaz. Daha iyi ya da daha kötü bir sürüm yok — destekten sonra uygulama tam olarak aynı şekilde çalışır. Tek fark, yazarın bunun birine yaradığını bilmesidir.',
  'support.button': 'Bana bir kahve ısmarlayın',
  'support.button.aria': 'Bana bir kahve ısmarlayın — bağış profilini yeni bir sekmede açar',
  'support.pending': 'Bağış profili henüz bağlanmadı. Bağlandığı anda düğme bu noktada duracak. O zamana kadar yapılacak bir şey yok — uygulama zaten tamamen ücretsiz.',
  'support.privacy': 'Düğme, yeni bir tarayıcı sekmesinde dış bir sayfa (Buy Me a Coffee) açar. Bu cihazdan bir şeyin çıktığı tek an budur. Kamera görüntüsü ve bütün ölçümleriniz burada kalır — basmadan önce de, bastıktan sonra da hiçbir yere gönderilmez.',
  'support.privacyPending': 'Adres hazır olduğunda düğmeye basmak, yeni bir tarayıcı sekmesinde dış bir sayfa (Buy Me a Coffee) açacak. Bu cihazdan bir şeyin çıktığı tek an o olacak. Kamera görüntüsü ve bütün ölçümleriniz burada kalır — hiçbir yere gönderilmez.',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': 'Belgeler',

  'disclaimer.title': 'Bu bir tıbbi cihaz değildir',
  'disclaimer.body.docs': 'Bu uygulama bir tıbbi cihaz değildir. Herhangi bir hastalığın teşhisine, tedavisine ya da önlenmesine hizmet etmez. Telefon kamerasıyla yapılan ölçümlerin sonuçları yaklaşıktır ve bir muayenenin ya da doktor tavsiyesinin yerini tutmaz. Göz sağlığıyla ilgili konularda bir doktora ya da optometriste danışın. Bu uygulamadaki bölge eşikleri hiçbir güvenlik standardını yansıtmaz — ayrıntılar 3. bölümde.',
  'disclaimer.body.about': 'Bu uygulama bir tıbbi cihaz değildir. Herhangi bir hastalığın teşhisine, tedavisine ya da önlenmesine hizmet etmez. Telefon kamerasıyla yapılan ölçümlerin sonuçları yaklaşıktır ve bir muayenenin ya da doktor tavsiyesinin yerini tutmaz. Göz sağlığıyla ilgili konularda bir doktora ya da optometriste danışın. Bu uygulamadaki bölge eşikleri hiçbir güvenlik standardını yansıtmaz — ayrıntılar Belgeler’in 3. bölümünde.',

  'doc.toc.aria': 'Belgelerin içindekiler listesi',
  'doc.toc.title': 'İçindekiler',

  'doc.ch1.title': 'Hızlı başlangıç',
  'doc.ch2.title': 'Ölçüm nasıl çalışır',
  'doc.ch3.title': 'Birimler ve standartlar',
  'doc.ch4.title': 'Bölgeler ve eşikler',
  'doc.ch5.title': 'Cihazlar arasındaki farklar',

  'doc.ch1.heading': '1. Hızlı başlangıç',
  'doc.ch2.heading': '2. Ölçüm nasıl çalışır',
  'doc.ch3.heading': '3. Birimler ve standartlar',
  'doc.ch4.heading': '4. Bölgeler ve eşikler',
  'doc.ch5.heading': '5. Cihazlar arasındaki farklar',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': 'Nasıl daha isabetli ölçülür',
  'doc.ch1.tips.li1': '“Kamera” ekranında (alt çubuktaki ilk düğme) “Başlat” düğmesine basın ve arka kamerayı, kontrol etmek istediğiniz ekrana ya da ışık kaynağına doğrultun.',
  'doc.ch1.tips.li2': '“İzleme” ekranına geçin (alt çubuğun ikinci düğmesi) — üstte iki göstergeyi bir arada, aşağıda (kaydırın) zaman içindeki değişim grafiklerini görürsünüz. Hangi ekrana bakıyor olursanız olun, ölçüm arka planda sürer.',
  'doc.ch1.tips.li3': 'Telefonu ekrandan sabit bir uzaklıkta tutun (örneğin 15–20 cm) ve ölçüm sırasında ortam aydınlatmasını değiştirmeyin.',
  'doc.ch1.tips.li4': 'Arka kamerayı kullanın — otomatik düzeltmeleri ön kameranınkinden daha yumuşaktır.',
  'doc.ch1.tips.li5': 'Sonuçları mutlak fiziksel birimler olarak değil, göreli göstergeler (%) olarak ele alın — birbirleriyle karşılaştırın (örneğin gece modu açık/kapalı).',
  'doc.ch1.tips.li6': 'Ayarlardaki bölge eşiklerini kendi ekranınızın parlaklığına göre ayarlayın (4. bölüm).',

  'doc.ch1.fonts.title': 'Büyük yazılar ve göstergeler — her zaman',
  'doc.ch1.fonts.p1': 'Uygulamanın tamamı büyük, okunaklı yazılar ve tam boy göstergeler kullanır; böylece az gören kişiler (ve herkes) verileri ek ayar yapmadan okuyabilir. “İzleme” ekranında iki gösterge kaydırma yapmadan tek ekrana birlikte sığar — zaman içindeki değişim grafikleri hemen altlarında, bir kaydırma ötededir.',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': 'Telefon kamerası ile spektrometre',
  'doc.ch2.spectro.p1.html': '“Ne kadar zararlı mavi ışık var” sorusunun gerçek ölçümü, ışığı dalga boylarına ayırmayı gerektirir — bunu bir <b>spektrometre</b> yapar: prizma ya da kırınım ağı ışığı onlarca/yüzlerce dar banda (örneğin 1–5 nm aralıklarla) ayırır ve her birindeki optik gücü ayrı ayrı ölçer. Lüks, lümen ya da mavi ışık tehlikesi işleviyle ağırlıklandırılmış ışınım gibi birimler ancak böyle tam bir tayfsal dağılımdan hesaplanır.',
  'doc.ch2.spectro.p2.html': '<b>Telefon kamerası bunların hiçbirini yapmaz.</b> Üç geniş süzgeci vardır (Bayer: R/G/B) ve her biri geniş, birbiriyle örtüşen bir dalga boyu aralığından ışık toplar — “mavi kanal”, 435–440 nm civarındaki dar bir bant (retina için tehlikenin tepe noktası) değil, kabaca 400–570 nm’dir ve yeşille karışmıştır. Yolda buna renk düzlemi birleştirme, otomatik pozlama, otomatik beyaz dengesi ve sRGB gama sıkıştırması eklenir — tarayıcı bu adımların hiçbirini tümüyle kapatmaya izin vermez. Sonuçta JavaScript’in gördüğü piksel değeri, algılayıcıya düşen gerçek optik güçle doğrusal olarak bağlantılı değildir. Bu, uygulamanın hatası değil, temel bir donanım sınırıdır.',

  'doc.ch2.raw.title': 'Grafik 1 — B kanalı parlaklığı',
  'doc.ch2.raw.what.html': '<b>Ne gösterir:</b> görüntünün örneklenen bölümünde yalnızca mavi (B) kanalının ortalama parlaklığını; 0–255 ölçeğinden %’ye çevrilmiş hâlde.',
  'doc.ch2.raw.algo.html': '<b>Algoritma:</b>',
  'doc.ch2.raw.step1': 'Saniyede 5 kez kameradan bir kare alıyoruz.',
  'doc.ch2.raw.step2': 'Karenin ortadaki %60’lık bölümünü kesiyoruz (görüntünün kenarlarından ve yanlardan gelen parlamadan kaçınır).',
  'doc.ch2.raw.step3': 'Kesilen bölümü 32×32 piksellik bir ızgaraya ölçekliyoruz (yeterince doğru ve tam çözünürlükte hesaplamaktan çok daha hızlı — bütçe sınıfı Xiaomi/Ulefone gibi zayıf donanımlarda bu önemlidir).',
  'doc.ch2.raw.step4': 'Bu ızgaradaki 1024 pikselin B değerini ortalıyoruz.',
  'doc.ch2.raw.step5.html': '<code>sonuç = ortalama_B ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>Neden bıraktık:</b> bu, “algılayıcı genel olarak ne kadar mavi sinyal kaydediyor” sorusunun en yalın, en doğrudan okumasıdır. Zayıf yanı, parlaklıkla rengi karıştırmasıdır — çok parlak ama nötr beyaz bir sahne de yüksek sonuç verir, oysa özellikle “mavi” değildir. Bu yüzden yanında 2. grafiği gösteriyoruz.',

  'doc.ch2.share.title': 'Grafik 2 — Işıktaki mavi oranı',
  'doc.ch2.share.what.html': '<b>Ne gösterir:</b> kaydedilen ışığın tamamının (R+G+B) yüzde kaçını mavi bileşenin oluşturduğunu — yani sahnenin ne kadar parlak olduğundan bağımsız olarak rengin soğuğa kaymasını.',
  'doc.ch2.share.algo.html': '<b>Algoritma:</b> yukarıdakiyle aynı 1–4 adımları, ama yalnızca B yerine şunu hesaplıyoruz:',
  'doc.ch2.share.formula.html': '<code>sonuç = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': 'Nötr beyaz (R≈G≈B) yaklaşık <b>%33</b> verir. Daha sıcak/daha kırmızı ışık daha az. Güçlü biçimde mavi ışık daha çok — neredeyse saf mavi ışık için ~%100 sınırına kadar.',
  'doc.ch2.share.why.html': '<b>Neden “zararlı mavi”nin daha isabetli ölçüsü budur:</b> gece modu / Night Shift türü süzgeçlerin çalıştığı ilkenin aynısıdır — önemli olan parlaklık değil, <b>renk</b>tir. Çok parlak ama nötr bir ekran yanlışlıkla zararlı diye işaretlenmez; kısılmış ama güçlü biçimde mavi olan ise işaretlenir. Bu yüzden okuma tablosundaki bölge rengini bu büyüklük belirler.',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': 'Neden lüks ya da lümen değil',
  'doc.ch3.units.p1.html': '<b>Lümen (lm)</b>, bir kaynağın yaydığı toplam ışık akısını anlatır — bu, kaynağın kendi özelliğidir, belirli bir noktaya düşenin değil. <b>Lüks (lx)</b> ise bir noktadaki aydınlık düzeyidir (lm/m²) — aradığımıza daha yakın, ama yine de <b>fotometrik</b> bir birim: tayfı, mavi ışık tehlikesi eğrisiyle değil, insan gözünün parlaklık duyarlılığı eğrisiyle (V(λ)) ağırlıklandırır. Tehlikenin gerçek ölçümü için üçüncü, daha dar bir birim gerekir: <b>W/m²</b> cinsinden tayfsal ağırlıklı ışınım (IEC 62471 standardı, duyarlılığın tepe noktası 435–440 nm civarı) — bu da spektrometre ister; yukarıdaki bölüme bakın.',
  'doc.ch3.units.p2.html': 'Lüksle yetinmeyi kabul etsek bile: dış, kalibre edilmiş bir ışık algılayıcısı olmayan bir telefon bunu güvenilir biçimde belirleyemez. Telefonun dahili ışık algılayıcısı (bulunduğu yerlerde) zaten gövdenin, arka kamerayla ekrana doğrulttuğunuz yüzünün <b>karşı tarafındaki</b> ışığı ölçer — yani ekrandan geleni değil, sırtınızın arkasındaki ışığı ölçerdi. Bu yüzden nasılsa güvenilmez olacak bir birimde sayı tahmin etmek yerine, dürüstçe adlandırılmış bir <b>göreli gösterge (%)</b> gösteriyoruz — mutlak bir değer olarak değil, aynı telefonda aynı koşullarda yapılan karşılaştırmalar için anlamlı (örneğin gece modu açık/kapalı).',

  'doc.ch3.norms.title': 'Güvenlik eşikleri için küresel standartlar var mı?',
  'doc.ch3.norms.p1.html': 'Kısaca: <b>bir kamera kanalının yüzdesiyle ifade edilen bir standart yok</b> — bu, hiçbir şeyin düzenlendiği bir birim değil zaten. Mavi ışıkla ilgili gerçek standartlar vardır, ama başka büyüklükleri, başka birimlerde ölçerler ve “mavi ışık gözü yorar” derken genellikle kastettiğimizden başka bir olguyu ilgilendirirler.',
  'doc.ch3.norms.p2.html': '<b>Retinada akut fotokimyasal hasar — IEC 62471 / ICNIRP.</b> Gerçekten düzenlenmiş tek “mavi ışık zararlılığı” — lambalar ve aydınlatma sistemleri için bir standart olup ICNIRP (İyonlaştırıcı Olmayan Radyasyondan Korunma Uluslararası Komisyonu) kılavuzlarıyla desteklenir. Kaynakları, B(λ) tehlike işleviyle ağırlıklandırılmış <b>W·m⁻²·sr⁻¹</b> cinsinden parıltıya göre RG0–RG3 risk gruplarına ayırır ve maruz kalma süresine bir sınır koyar (<code>t_max = 100 / L_B</code> saniye). Telefon ve monitör ekranları — en yüksek parlaklıkta bile — uygulamada neredeyse her zaman <b>RG0 (muaf, sınırsız)</b> içinde kalır. Bu standart, tüketici ekranlarını değil, çok daha yoğun kaynakları (kaynak arkları, bazı projeksiyon cihazları, endüstriyel LED’ler) ilgilendirir.',
  'doc.ch3.norms.p3.html': '<b>Sirkadiyen ritim ve uyku üzerindeki etki — CIE S 026.</b> Genellikle kastedilen olgu budur (akşam ekranı “uyandırır”) — ama bu, gözde bir hasar değil, en çok 480 nm civarında duyarlı olan retina ganglion hücreleri (ipRGC) yoluyla biyolojik saat üzerindeki etkidir. CIE S 026:2018 standardı <b>melanopik lüks (melanopic EDI)</b> birimini tanımlar. “Resmî” bilimsel uzlaşıya en yakın metin, Brown ve arkadaşlarının yayınıdır (<i>PLOS Biology</i>, 2022); yaklaşık bir yol gösterici olarak akşam &lt; 10 melanopik lüks, gündüz &gt; 250 önerir. Bunlar uyku araştırmacılarının önerileridir, yasal bir kural değil.',
  'doc.ch3.norms.p4.html': '<b>DSÖ.</b> Dünya Sağlık Örgütü mavi ışığa maruz kalma için kendi bağımsız sınırlarını yayımlamaz — optik ışınım güvenliğinde yukarıdaki ICNIRP’e yönlendirir. DSÖ’nün ekranlar konusundaki tek somut, kendi belgesi <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i> (2019) belgesidir — o da ışığın rengini ya da şiddetini değil, ekran başında geçirilen <b>süreyi</b> ilgilendirir: 1 yaşın altında ekran yok, 2–4 yaş için en çok 1 saat. Yetişkinler için DSÖ’nün bu kadar somutlaşmış sayısal bir kılavuzu yok.',
  'doc.ch3.norms.p5.html': '<b>Bunun uygulamayı kalibre etmeye neden yine de yaramadığı:</b> her iki standart da (IEC/ICNIRP ve CIE) tam bir tayfsal dağılım ve bilinen bir ölçüm geometrisinde kalibre edilmiş parıltı ister — telefonun tarayıcı üzerinden veremeyeceği tam da budur (yukarıdaki “Telefon kamerası ile spektrometre” bölümüne bakın). “%33 mavi oranı = X melanopik lüks” diye bir çevrim yoktur; bu yüzden bu uygulamadaki eşikler <b>hiçbir güvenlik standardını yansıtmaz</b> (DSÖ, IEC, ICNIRP ya da CIE — bu gösterge için böyle bir standart zaten yok). Buna karşılık varsayılan mavi oranı eşikleri, ışığın gerçek renk sıcaklıklarından ve akşamları sıcak ışık için yaygın biçimde yinelenen pratik öneriden türetilmiştir — sıradan bir yuvarlamadan daha sağlam bir temel, ama yine de resmî bir standart değil (tam türetim: 4. bölüm). Ayarlardan bunları her zaman kendinize göre değiştirebilirsiniz.',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': 'Renk bölgeleri ve eşiklerin nereden geldiği',
  'doc.ch4.zones.p1.html': 'İki büyüklüğün de kendine ait, birbirinden bağımsız ayarlanan eşikleri vardır (“İzleme” ekranı → “Bölge eşiği ayarları”, sayfanın altında) — birinde %33/%66, diğerinde aynı anlama gelmez (yukarıdaki 2. bölüme bakın). Grafiklerin altındaki gösterimde ve okuma tablosundaki rengi <b>mavi oranı</b> belirler:',
  'doc.ch4.zones.li1.html': '<b>Yeşil — güvenli:</b> sıcak ya da nötr ışık, gözler dinleniyor.',
  'doc.ch4.zones.li2.html': '<b>Sarı — orta düzey:</b> maviye doğru fark edilir bir kayma, ara vermekte yarar var.',
  'doc.ch4.zones.li3.html': '<b>Kırmızı — zararlı:</b> güçlü biçimde mavi ışık; uzun süre maruz kalınca gözü belirgin biçimde yorar (özellikle akşamları).',
  'doc.ch4.zones.p2.html': '<b>Bu belirli sayılar nereden geliyor.</b> <b>B kanalı parlaklığının</b> doğal bir başvuru noktası yoktur — anlamlı bir eşik değeri yalnızca çektiğiniz sahnenin ne kadar parlak olduğuna bağlıdır (bu, renk değil parlaklık ölçüsüdür). Buradaki varsayılan %33/%66 hâlâ uzlaşımsal bir başlangıç noktasıdır — kendi ekranınızın/ortamınızın tipik parlaklığına göre deneyerek ayarlayın.',
  'doc.ch4.zones.p3.html': '<b>Mavi oranının</b> varsayılan eşikleri, hiçbir güvenlik standardından değil, ışığın gerçek renk sıcaklıklarından türetilmiştir (yuvarlama değil, fizik) — bu büyüklük için öyle bir standart yok (3. bölüm). Başvuru noktaları:',
  'doc.ch4.zones.li4.html': '<b>~4000K</b> (“sıcak beyaz”, tipik bir LED ampul) → yaklaşık <b>%26</b> mavi oranı. Bundan daha sıcak ışık (daha düşük renk sıcaklığı), f.lux ya da Night Shift gibi araçların akşamlar için yaygın biçimde önerdiği aralıktır — alt eşik buradan gelir.',
  'doc.ch4.zones.li5.html': '<b>6500K (D65)</b>, çoğu telefon ve monitör ekranının fabrika beyaz noktası — yaklaşık <b>%33</b>. Bu değerden yukarısı, mavi ışığın sınırlanmasına ilişkin önerilerin tipik olarak yapıldığı aralığın başlangıcıdır — üst eşik buradan gelir.',
  'doc.ch4.zones.p4.html': '<b>Önemli bir çekince:</b> ışığın ne kadar “mavi” olduğu günün saatine bağlı değildir, ama mavi ışığı sınırlama önerileri aslında yalnızca <b>akşamı ve geceyi</b> ilgilendirir — gündüz soğuk, mavi ışığa (güneş ışığı da dâhil) maruz kalmak normaldir, hatta sirkadiyen ritim için yararlıdır. Gün ortasında sıradan, değiştirilmemiş bir ekrana bakarken kırmızı bölge gerçek bir tehlike anlamına gelmez — aynı ışık akşam olunca sınırlamaya değer.',
  'doc.ch4.zones.p5.html': 'İki büyüklüğün eşikleri tümüyle bağımsızdır — birini değiştirmek diğerini etkilemez. Değiştirilen eşikler, uygulamanın açılışları arasında <b>bu cihazda ve bu tarayıcıda hatırlanır</b> (yerel olarak; hiçbir yere hiçbir şey gönderilmez) — “Başlat” düğmesi onları varsayılana döndürmez.',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': 'Önizleme neden farklı cihazlarda farklı görünüyor',
  'doc.ch5.devices.p1.html': '<b>Tarayıcı ile fabrika kamera uygulaması.</b> Telefonda kurulu gelen kamerayı açtığınızda üretici (örneğin Xiaomi) canlı önizlemeye kendi tescilli algoritmalarını ekler — gerçek zamanlı HDR, zayıf ışıkta dijital parlaklık artırma, yumuşatma. Bir web sayfası tarayıcı aracılığıyla kameradan çok daha “ham” bir akış alır (<code>getUserMedia</code> işlevi), bu iyileştirmelerin hiçbiri olmadan — yani telefon ne olursa olsun, doğası gereği fabrika kamerasından daha düz ve daha karanlık görünecektir.',
  'doc.ch5.devices.p2.html': '<b>Kamerayı denetleme olanaklarının farklılığı.</b> Tarayıcının pozlama ve beyaz dengesi üzerinde sistemden ne kadar denetim aldığı; somut telefona, kamera sürücüsüne ve Chrome/WebView sürümüne bağlıdır — kimi cihazlar (tipik olarak USB kameralı bilgisayarlar) yalnızca tam otomatiği bildirir, kimileri (bazı Android telefonlar) ek, daha gelişmiş kipler bildirir. Bu uygulamanın önceki bir sürümü, telefonun izin verdiği yerlerde elle pozlama kipine geçmeyi deniyordu, üstelik belirli bir değer ayarlamadan — bu da bazı telefonlarda görüntüyü, kameranın açıldığı andaki rastgele ve karanlık bir pozlamada donduruyordu. Bu, birimlerin farkı değil, koddaki bir hataydı (artık düzeltildi) — ama aynı kod satırı bile ancak cihazların bir kısmında devreye girdiğine göre, davranışın cihazdan cihaza ne kadar kolay farklılaşabildiğini iyi gösteriyor.',
  'doc.ch5.devices.p3.html': '<b>Farklı algılayıcılar ve görüntü işleme (ISP).</b> Kod aynı ve sahne aynı olsa bile farklı telefon modellerinin algılayıcıları farklı kalitededir ve üreticinin otomatiği farklı ayarlanmıştır — biri zayıf ışıkta pozlamayı diğerinden daha hızlı ve daha isabetli seçer. Bu, bu uygulamadaki göstergelerin <b>göreli</b> olması gerçeğiyle (3. bölüme bakın) birleşince şu anlama gelir: sonuçları (ve önizlemenin görünümünü) farklı modeller/cihazlar arasında değil, aynı telefonda zaman içinde karşılaştırın.'
});
