/* docs/v2/i18n/tr.js — słownik WERSJI 2, turecki.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/tr.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: to samo, co w pl.js tego katalogu — układ TEJ wersji: pięć
 * zakładek, dziewięć ekranów nakładkowych, siedem narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej. Zestaw kluczy jest identyczny
 * z pl.js — pilnuje tego docs/shared/i18n/keys.test.js.
 *
 * TERMINOLOGIA: przepisana z docs/shared/i18n/tr.js, bez wyjątków —
 * mavi oranı, sahne parlaklığı, renk sıcaklığı, sirkadiyen etki (melanopik
 * oran w opisie), titreşim (migotanie), düzgünlük, göz konforu. Wersja 5 mówi
 * na migotanie „kırpışma”, bo zajęła „titreşim” dla wibracji silniczka. Tutaj
 * pierwszeństwo ma warstwa wspólna: migotanie to „titreşim”, a wibracja przy
 * alertach — „dokunsal geri bildirim”, żeby jedno słowo nie znaczyło w tej
 * samej aplikacji dwóch różnych rzeczy.
 *
 * REJESTR: grzeczna druga osoba liczby mnogiej („basın”, „doğrultun”) bez
 * zaimka — tak mówią tureckie aplikacje użytkowe. Znak % stoi po turecku PRZED
 * liczbą („%40”), więc wstawka przesuwa się za symbol; nazwa wstawki zostaje ta
 * sama. Apostrof to ’ (U+2019), a nie ASCII-owy — ten drugi rozerwałby napis
 * w pojedynczych cudzysłowach.
 *
 * LICZEBNIKI: turecki ma dwie kategorie CLDR (one, other), a rzeczownik po
 * liczebniku zostaje w liczbie pojedynczej („5 okuma”), więc obie formy brzmią
 * tak samo. To nie jest niedopatrzenie — kategorii `other` wymaga Intl.PluralRules.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (te same co w pl.js i z tego samego powodu):
 *   'zone.warning'        — wspólne mówi „Dikkat”, ta wersja mówi „Uyarı”
 *                           (i „Uyarılar” w podsumowaniu);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi o pomiarach
 *                           w liczbie mnogiej („Ölçümler”).
 */
window.I18nData = window.I18nData || {};
window.I18nData['tr'] = Object.assign(window.I18nData['tr'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Işık Monitörü — mavi ışık ölçümü',
  'app.description': 'Işık Monitörü — telefon kamerasıyla mavi ışık oranının ölçümü. Yedi gösterge, grafik, geçmiş. Her şey açık, hesapsız ve ücretsiz.',
  'app.skipToContent': 'İçeriğe geç',
  'app.measuring': 'Ölçüm sürüyor',
  'app.docsButton': 'Belgeler ve açıklamalar',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — sürüm 2',

  'nav.aria': 'Ana gezinme',
  'nav.tablistAria': 'Uygulama ekranları',
  'nav.measure': 'Ölçüm',
  'nav.history': 'Geçmiş',
  'nav.tools': 'Araçlar',
  'nav.support': 'Destek',
  'nav.more': 'Daha fazla',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Belgeler',
  'panel.thresholds': 'Eşikler ve profiller',
  'panel.reports': 'Raporlar',
  'panel.export': 'Veri dışa aktarma',
  'panel.compare': 'A/B karşılaştırma',
  'panel.calibration': 'Beyaz kâğıtla kalibrasyon',
  'panel.screenCheck': 'Monitörümü kontrol et',
  'panel.schedule': 'Zamanlama',
  'panel.alerts': 'Maruziyet uyarıları',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Geri',
  'action.close': 'Kapat',
  'action.refresh': 'Yenile',
  'action.apply': 'Uygula',
  'action.delete': 'Sil',
  'action.hide': 'Gizle',
  'action.start': 'Başlat',
  'action.stop': 'Durdur',
  'action.switch': 'Değiştir',
  'action.switchAria': 'Kamerayı değiştir: ön ya da arka',
  'action.resetDefaults': 'Varsayılanları geri yükle',
  'action.reports': 'Raporlar',
  'action.exportCsv': 'CSV dışa aktar',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Ekran: {name}',
  'a11y.measureStarted': 'Ölçüm başladı.',
  'a11y.measureStopped': 'Ölçüm durduruldu.',
  'a11y.measureStoppedSummary': 'Ölçüm durduruldu. Süre: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'Eşik profili uygulandı.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Onay',
  'dialog.confirm': 'Onaylıyorum',
  'dialog.cancel': 'Vazgeç',
  'dialog.infoTitle': 'Bilgi',
  'dialog.ok': 'Anladım',

  'help.sheetTitle': 'Büyüklük açıklaması',
  'help.unit': 'Birim',
  'help.scaleRange': 'Ölçek aralığı',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'Uyarı',
  'threshold.crit': 'Kritik',
  'threshold.warnLabel': 'Uyarı eşiği',
  'threshold.critLabel': 'Kritik eşik',
  'threshold.warnAria': '{name} — eşik: uyarı',
  'threshold.critAria': '{name} — eşik: kritik',

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

  'firstRun.title': 'Nasıl ölçülür',
  'firstRun.text': '“Başlat” düğmesine basın, telefonu aydınlatılmış bir yüzeye doğrultun ve birkaç saniye hareketsiz tutun. Önizlemedeki çerçeve, uygulamanın gerçekten okuduğu bölümü gösterir.',
  'firstRun.close': 'İpucunu kapat',

  'camera.live': 'CANLI',
  'camera.idle': 'Kamera kapalı. “Başlat” düğmesine basın, telefonu aydınlatılmış bir yüzeye doğrultun ve birkaç saniye hareketsiz tutun.',
  'camera.stopped': 'Ölçüm durduruldu. Yeniden ölçmek için “Başlat” düğmesine basın.',

  'error.cameraStart': 'Kamera başlatılamadı.',
  'error.engineMissing': 'Ölçüm modülü yüklenmedi.',

  'metrics.sevenTitle': 'Yedi gösterge',
  'measure.tilesSub': 'Saniyede 5 kez yenilenir',

  'session.title': 'Bu oturum',
  'session.duration': 'Ölçüm süresi',
  'session.samples': 'Örnek sayısı',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     „Uyarılar” to nie to samo słowo co „Uyarı” pod suwakiem. */
  'zone.count.good': 'Normal aralıkta',
  'zone.count.warning': 'Uyarılar',
  'zone.count.critical': 'Kritik',

  'note.calibrated': 'Ölçüm beyaz kâğıtla kalibre edildi — kanallar eşitlendi.',

  'tile.helpAria': 'Ne anlama geliyor: {name}',
  'tile.noMeasurement': 'Ölçüm yok',
  'tile.outOfScale': 'Ölçek dışı',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Uyarı',
  'zone.spoken.warning': 'uyarı',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Zaman içindeki seyir',
  'history.pickHint': 'Bir büyüklük ve bir aralık seçin',
  'history.metricLabel': 'Büyüklük',
  'history.rangeAria': 'Grafiğin zaman aralığı',
  'history.emptyTitle': 'Bu aralıkta veri yok',
  'history.emptyText': 'Ölçüm ekranında ölçümü başlatın — grafik birkaç saniyede dolar.',
  'history.tableTitle': 'Son okumalar',
  'history.tableHide': 'Tabloyu gizle',
  'history.tableShow': 'Tabloyu göster',
  'history.tableCaption': 'Son ölçüm okumaları, en yenisi başta.',
  'history.tableEmpty': 'Okuma yok. Ölçüm ekranında ölçümü başlatın.',

  'table.time': 'Saat',
  'table.metric': 'Büyüklük',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     dłuższy zapis łamał się na dwie linie. */
  'range.1m': '1 dk',
  'range.1h': '1 sa',
  'range.24h': '24 sa',
  'range.7d': '7 gün',
  'range.30d': '30 gün',

  'chart.now': 'şimdi',
  'chart.countSub': {
    one: 'seçilen aralıkta {n} okuma',
    other: 'seçilen aralıkta {n} okuma'
  },
  'chart.aria': '{name}, aralık {range}, {count}, son değer {value} {unit}.',
  'chart.ariaZone': '{name}, aralık {range}, {count}, son değer {value} {unit}, bölge: {zone}.',
  'chart.ariaEmpty': '{name} — {range} aralığında veri yok.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Sihirbazlar ve yardımcı işlevler',
  'tools.note': 'Araçlar ölçümü yorumlamanıza yardım eder. Hepsi ilk andan itibaren kullanılabilir, ölçümün kendisi ise onlardan bağımsız çalışır.',

  'tool.thresholds.sub': 'Bir değer ne zaman uyarı vermeli',
  'tool.compare.sub': 'İki ışıktan hangisi daha yumuşak',
  'tool.calibration.sub': 'Doğruluğu gerçekten artıran tek işlev',
  'tool.screenCheck.sub': 'Beş adım ve ekranınız için hazır bir sonuç',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Eşik zamanlaması”
     kontra „Zamanlama”. Tak było i tak zostaje. */
  'tool.schedule.title': 'Eşik zamanlaması',
  'tool.schedule.sub': 'Akşamları farklı eşikler, hatırlamaya gerek kalmadan',
  'tool.alerts.sub': 'Kritik bölge fazla uzun sürdüğünde bir sinyal',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Ayarlar',
  'more.thresholdsSub': 'Bir değer ne zaman uyarı vermeli',
  'more.docsSub': 'Nasıl ölçülür ve bu ölçüm neyi söylemez',
  'more.appearanceTitle': 'Görünüm ve erişilebilirlik',

  'settings.theme': 'Tema',
  'theme.auto': 'Sistemdeki gibi',
  'theme.light': 'Açık',
  'theme.dark': 'Koyu',

  'settings.textScale': 'Yazı boyutu',
  'textScale.100': 'Standart',
  'textScale.115': 'Daha büyük (%115)',
  'textScale.130': 'En büyük (%130)',

  'settings.contrast': 'Daha yüksek kontrast',
  'settings.contrastSub': 'Daha belirgin kenarlıklar ve daha koyu yardımcı yazı.',
  'settings.sound': 'Uyarı sesi',
  'settings.soundSub': 'Maruziyet uyarısı devreye girdiğinde kısa bir sinyal.',
  'settings.vibrate': 'Uyarılarda dokunsal geri bildirim',
  'settings.vibrateSub': 'Yalnızca bunu destekleyen cihazlarda çalışır.',

  'more.dataTitle': 'Veriler',
  'more.clearHistory': 'Ölçüm geçmişini temizle',
  'more.clearHistorySub': 'Bu cihazda kayıtlı okumaları siler. Eşikler, profiller ve ayarlar kalır.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'Uygulamanın tamamı ücretsizdir. ',
  'more.supportLink': 'İsterseniz gönüllü olarak destekleyebilirsiniz.',

  'dialog.clearHistory.title': 'Kayıtlı geçmiş silinsin mi?',
  'dialog.clearHistory.body': {
    one: 'Bu cihazdan {n} kayıtlı ölçüm noktası silinecek. Bu işlem geri alınamaz. Eşikler, profiller ve ayarlar olduğu gibi kalacak.',
    other: 'Bu cihazdan {n} kayıtlı ölçüm noktası silinecek. Bu işlem geri alınamaz. Eşikler, profiller ve ayarlar olduğu gibi kalacak.'
  },
  'dialog.clearHistory.confirm': 'Geçmişi sil',
  'dialog.clearHistory.cancel': 'Kalsın',

  'toast.historyCleared': 'Ölçüm geçmişi silindi.',
  'toast.screenUnavailable': 'Bu ekran bu sürümde henüz kullanılamıyor.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'Bu uygulama neyi ölçüyor',
  'docs.leadText': 'Telefon kamerası aydınlatılmış bir yüzeye bakar; uygulama saniyede beş kez, karenin ortadaki bölümünden R, G ve B kanallarının ortalamasını alır. Bu üç sayıdan yedi gösterge türetir.',
  'docs.limitsTitle': 'Yöntemin sınırları',
  'docs.limitsText': 'Kameranın üç geniş renk kanalı, otomatik pozlaması ve otomatik beyaz dengesi vardır. Tayfı ölçmez ve mutlak değerleri bilmez; bu yüzden parlaklık lüks değil, göreli bir göstergedir. Renk sıcaklığı ve sirkadiyen etki, sRGB renklerinden hesaplanmış yaklaşık değerlerdir. {rate} Hz örnekleme titreşimi yalnızca {limit} Hz altında görür — şebekenin 100 Hz’i erişim dışıdır ve uygulama bunu hiçbir zaman sonuç olarak vermez.',

  'note.howTo.repeat.title': 'Ölçümü tekrarlayın',
  'note.howTo.repeat.text': 'Tek bir okuma anlık bir görüntüdür. On saniyeyi aşan bir ölçüm daha güvenilir bir tablo verir.',

  'docs.scale': 'Ölçek',
  'docs.direction': 'Yön',
  'docs.directionHigher': 'Yüksek olması daha iyi',
  'docs.directionLower': 'Düşük olması daha yumuşak',
  'docs.privacyTitle': 'Veriler ve gizlilik',
  'docs.privacyText': 'Kamera görüntüsü hiçbir yere gönderilmez ve kaydedilmez — her kareden yalnızca üç sayı kalır. Ölçümler, eşikler ve ayarlar bu cihazdaki tarayıcı belleğinde durur. Uygulama hiçbir ağ isteği yapmaz ve çevrimdışı çalışır.',
  'docs.freeLine': 'Yedi göstergenin tamamı, geçmiş, grafik, araçlar ve çevrimdışı mod herkes için, hesapsız ve ücretsiz çalışır.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Her şey açık',
  'support.heroText': 'Yedi göstergenin tamamı, ölçüm geçmişi, grafik, bütün araçlar ve çevrimdışı mod herkes için, ilk andan itibaren çalışır. Hesap yok, sınır yok, ücret yok.',
  'support.whyTitle': 'Neden rica ediyorum',
  'support.whyText': '{app} mesai dışında yapılıyor ve kimseden kazanmıyor: reklam yok, veri toplanmıyor, satacak bir şey de yok. Uygulamayı ayakta tutmak ve geliştirmek — yeni göstergeler, düzeltmeler, yeni telefonlarda testler — zaman alıyor. Uygulama işinize yaradıysa katkıda bulunabilirsiniz. Zorunlu değil.',
  'support.whatTitle': 'Bağış ne kazandırır',
  'support.whatText': 'Hiçbir şey. Gerçekten hiçbir şeyin kilidini açmaz ve hiçbir şeyi hızlandırmaz — uygulama bağıştan önce de sonra da tıpatıp aynı görünür ve aynı çalışır. Tek verdiği şu: yazarı, bu emeğin birine yaradığını biliyor.',
  'support.button': 'Bana bir kahve ısmarlayın',
  'support.pendingTitle': 'Profil henüz bağlanmadı',
  'support.pendingText': 'Burada henüz destek gönderilebilecek bir adres yok. Hazır olduğunda tam bu noktada görünecek — o zamana kadar uygulamadaki her şey tıpatıp aynı çalışır.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'Düğme, yeni bir sekmede harici Buy Me a Coffee sayfasını açar. Bu cihazdan bir şeyin çıktığı tek an budur — ve bu ancak siz tıkladıktan sonra olur. Ölçümler, geçmiş ve ayarlar burada kalır.',
  'privacy.externalPending': 'Adres eklendiğinde, tıklamak yeni bir sekmede dış bir sayfa açacak. Bu cihazdan bir şeyin çıktığı tek an bu olacak. Ölçümler, geçmiş ve ayarlar burada kalır.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (ui-core.js içinde yedeği var)',
  'boot.need.metrics': 'hiçbir değer hesaplanmaz',
  'boot.need.bus': 'modüller birbirini görmez olur',
  'boot.need.ui': 'ekranlar arasında geçiş yapılamaz',
  'boot.need.engine': 'kamera ve ölçüm çalışmaz',
  'boot.need.support': 'Destek ekranı boş kalır',
  'boot.need.tools': 'Araçlar sekmesi boş kalır',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'Şu modüller yüklenmedi: {list}.',
  'boot.consoleHint': 'index.html içindeki <script> etiketlerinin sırasını ve yollarını kontrol edin.',
  'boot.incompleteTitle': 'Uygulama eksik yüklendi',
  'boot.incompleteText': '{missing} Sayfayı yenileyin; bu yardımcı olmazsa dosyalar sunucuda eksiktir.',
  'boot.newVersion': 'Uygulamanın yeni bir sürümü var.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'Eşikler ne yapar. ',
  'thresholds.noteText': 'Uyarı eşiği sarı durumu, kritik eşik kırmızıyı yakar. Değişiklik anında geçerli olur — ekranda duran okumada da. Kendi eşik setinizi bir adla kaydedip dilediğiniz zaman ona dönebilirsiniz.',
  'thresholds.profilesTitle': 'Eşik profilleri',
  'thresholds.profilesSub': 'Üç yerleşik profil ve kendi setleriniz',
  'thresholds.customName': 'Kendi profilinizin adı',
  'thresholds.customPlaceholder': 'örneğin Akşam yatak odası',
  'thresholds.save': 'Geçerli eşikleri kaydet',
  'thresholds.saveHelp': 'Tam olarak yukarıda ayarlanmış eşikleri kaydeder.',

  'profile.builtin.default.name': 'Varsayılan',
  'profile.builtin.default.desc': 'Büyüklük kataloğundaki eşikler — bütün ölçümler için başlangıç noktası.',
  'profile.builtin.evening.name': 'Akşam — yumuşak',
  'profile.builtin.evening.desc': 'Soğuk renk ve sirkadiyen etki konusunda daha erken uyarır.',
  'profile.builtin.work.name': 'Masa başı çalışma',
  'profile.builtin.work.desc': 'Parlak, soğuk gün ışığına izin verir; titreşimi ve düzgünlüğü gözetir.',
  'profile.custom.desc': '{date} tarihinde kaydedilmiş kendi profiliniz.',

  'toast.thresholdsReset': 'Varsayılan eşikler geri yüklendi.',
  'toast.thresholdOrder': 'Uyarı eşiği kritik eşikten düşük olmalı.',
  'toast.thresholdOrderInverted': 'Bu büyüklükte uyarı eşiği kritik eşikten yüksek olmalı.',
  'toast.profileNameMissing': 'Profil adını girin.',
  'toast.profileSaved': '“{name}” profili kaydedildi.',
  'toast.profileApplied': '“{name}” profili uygulandı.',
  'toast.profileApplyFailed': 'Bu profil uygulanamadı.',
  'toast.profileRemoved': 'Profil silindi.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'Zamanlama ne işe yarar. ',
  'schedule.noteText': 'Akşam anlamlı olan eşikler, öğlen anlamlı olanlar değildir. “Başlangıç–bitiş” kuralı profili kendisi değiştirir, siz hatırlamak zorunda kalmazsınız. Zamanlama hiçbir zaman ölçümü başlatmaz ya da durdurmaz.',
  'schedule.toggle': 'Otomatik geçişi aç',
  'schedule.toggleSub': 'Cihazın saatine göre her dakika denetlenir.',
  'schedule.emptyTitle': 'Kural yok',
  'schedule.emptyText': 'Aşağıdaki düğmeyle ilk kuralı ekleyin.',
  'schedule.add': 'Kural ekle',
  'schedule.to': 'ile',
  'schedule.profile': 'Profil',
  'schedule.fromAria': 'Kural {n}: başlangıç saati',
  'schedule.toAria': 'Kural {n}: bitiş saati',
  'toast.scheduleTimeFormat': 'Saatleri 22:00 biçiminde girin.',
  'toast.scheduleEnded': 'Zamanlama sona erdi — önceki eşikler geri geldi.',
  'toast.scheduleApplied': 'Zamanlama “{name}” profilini açtı.',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'Uyarı ne yapar. ',
  'alerts.noteText': 'Tek bir büyüklüğü gözetir ve ancak o büyüklük seçtiğiniz bölgede, ayarladığınız süre boyunca kesintisiz kaldığında ses çıkarır. Ölçümü hiçbir zaman durdurmaz ve düğmelerin önünü kapatmaz.',
  'alerts.toggle': 'Maruziyet uyarılarını aç',
  'alerts.toggleSub': 'Yalnızca ölçüm sürerken çalışır.',
  'alerts.metric': 'İzlenen büyüklük',
  'alerts.level': 'Hangi bölgeden itibaren',
  'alerts.level.warning': 'Uyarı ve üzeri',
  'alerts.level.critical': 'Yalnızca kritik',
  'alerts.sustain': 'Kaç saniye kesintisiz sürdükten sonra',
  'alerts.sustainHelp': 'Kısa süreler, telefonu hareket ettirdiğinizde daha çok yanlış alarm verir.',
  'alerts.sound': 'Kısa sesli sinyal',
  'alerts.soundSub': 'Ses cihazda üretilir. Daha fazla ekranından toptan da kapatılabilir.',
  'alerts.barTitle': 'Maruziyet uyarısı',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} {seconds} sn’dir uyarı bölgesinde — şu anda {value} {unit}.',
  'alerts.message.critical': '{name} {seconds} sn’dir kritik bölgede — şu anda {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'Nasıl karşılaştırılır. ',
  'compare.noteText': 'Ölçümü başlatın, kamerayı ilk kaynağa doğrultun ve A olarak kaydedin. Mesafeyi ve açıyı değiştirmeden ışığı değiştirin ve B’yi kaydedin. Karşılaştırma yalnızca sahne aynı kaldığında anlamlıdır.',
  'compare.slotA': 'Işık A',
  'compare.slotB': 'Işık B',
  'compare.save': 'Geçerli okumayı kaydet',
  'compare.savedAt': '{date}, {time} kaydedildi',
  'compare.empty': 'Henüz bir şey kaydedilmedi.',
  'compare.verdictTitle': 'Karşılaştırma sonucu',
  'compare.verdictEmpty': 'Hangisinin daha yumuşak olduğunu görmek için iki ışığı da kaydedin.',
  'compare.notEnough': 'Bu iki ölçümü karşılaştırmak için veri yetersiz.',
  'compare.tie': 'İki kaynak neredeyse aynı çıkıyor ({metric}: {a} ve {b} {unit}). Fark, ölçüm gürültüsünün içinde kalıyor.',
  'compare.betterA': 'Daha yumuşak olan A ışığı — {metric} {better} {unit}, ötekinde {worse} {unit}.',
  'compare.betterB': 'Daha yumuşak olan B ışığı — {metric} {better} {unit}, ötekinde {worse} {unit}.',
  'compare.clear': 'Karşılaştırmayı temizle',
  'toast.compareSavedA': 'A ışığı kaydedildi.',
  'toast.compareSavedB': 'B ışığı kaydedildi.',
  'toast.compareCleared': 'Karşılaştırma temizlendi.',
  'toast.measureFirst': 'Önce Ölçüm ekranında ölçümü başlatın.',

  /* Nazwa wielkości w środku zdania. Po turecku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. */
  'metric.share.nameLower': 'mavi oranı',
  'metric.brightness.nameLower': 'sahne parlaklığı',
  'metric.kelvin.nameLower': 'renk sıcaklığı',
  'metric.melanopic.nameLower': 'sirkadiyen etki',
  'metric.flicker.nameLower': 'titreşim',
  'metric.uniformity.nameLower': 'düzgünlük',
  'metric.comfort.nameLower': 'göz konforu',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'Bu neden işe yarar. ',
  'calib.noteText': 'Kamera algılayıcısının kanalları arasında sabit bir sapma vardır. Beyaz bir kâğıdı ölçmek bu sapmanın ne kadar olduğunu gösterir ve onu çıkarmaya olanak verir. Bu, uygulamada doğruluğu gerçekten artıran tek işlevdir — ve yine de kamerayı bir spektrometreye dönüştürmez.',
  'calib.step1': 'Ölçtüğünüz ışığın altına beyaz bir kâğıt koyun',
  'calib.step2': 'Ölçümü başlatın ve kareyi kâğıtla doldurun',
  'calib.step3': '“Kalibre et” düğmesine basın ve telefonu 3 saniye hareket ettirmeyin',
  'calib.done': '{date}, {time} kalibre edildi.',
  'calib.none': 'Kalibrasyon yok. Ölçüm çalışır, değerleri karşılaştırmalı olarak ele alın.',
  'calib.gain': '{channel} kazancı',
  'calib.gainsLabel': 'Kanal kazançları',
  'calib.gainsUnset': 'ayarlanmadı',
  'calib.start': 'Kalibre et (3 sn)',
  'calib.clear': 'Kalibrasyonu sil',
  'toast.calibCleared': 'Kalibrasyon silindi.',
  'calib.error.noEngine': 'Ölçüm modülü kullanılamıyor.',
  'calib.error.notRunning': 'Önce ölçümü başlatın ve kamerayı beyaz bir kâğıda doğrultun.',
  'calib.error.busy': 'Kalibrasyon zaten sürüyor.',
  'calib.error.tooFewSamples': 'Örnek sayısı yetersiz. Ölçümün gerçekten çalıştığını kontrol edin.',
  'calib.error.tooDark': 'Görüntü kalibrasyon için fazla karanlık. Kâğıdı daha iyi aydınlatın ve yeniden deneyin.',
  'calib.error.tooSkewed': 'Kanal sapması, kalibrasyon olarak kabul edilemeyecek kadar büyük. Eşit ışıkta beyaz bir kâğıt kullanın.',
  'calib.ok': 'Kalibre edildi. Renk sıcaklığı ve sirkadiyen etki artık daha doğru olacak.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'Bu ne işe yarar. ',
  'screencheck.noteText': 'Beş adım, monitörü bir incelemede sınandığı gibi sınar: iki parlaklık düzeyinde beyaz, arka aydınlatmanın düzgünlüğü ve sistemdeki gece modunun gerçekten bir şey değiştirip değiştirmediği. Sihirbaz süren bir ölçümü okur; ölçümü kendisi başlatmaz.',
  'screencheck.step.white100.title': 'Tam parlaklıkta beyaz',
  'screencheck.step.white100.hint': 'Monitörde beyaz bir sayfa açın, parlaklığı en yükseğe getirin ve kareyi ekranla doldurun.',
  'screencheck.step.white20.title': 'Düşük parlaklıkta beyaz',
  'screencheck.step.white20.hint': 'Monitörün parlaklığını beşte bir düzeyine indirin ve kareyi değiştirmeyin.',
  'screencheck.step.corners.title': 'Ekranın köşeleri',
  'screencheck.step.corners.hint': 'Tam parlaklığa dönün ve kameraya ekranın tamamını gösterin — arka aydınlatmanın düzgünlüğüne bakıyoruz.',
  'screencheck.step.nightOff.title': 'Gece modu kapalı',
  'screencheck.step.nightOff.hint': 'Mavi ışık filtresinin kapalı olduğundan emin olun.',
  'screencheck.step.nightOn.title': 'Gece modu açık',
  'screencheck.step.nightOn.hint': 'Sistemdeki mavi ışık filtresini açın ve aynı kareyi yineleyin.',
  'screencheck.stepHeading': 'Adım {n} / {total}: {title}',
  'screencheck.idleTitle': 'Sihirbaz çalışmıyor',
  'screencheck.idleHint': 'Ölçüm ekranında ölçümü başlatın, sonra buraya dönüp “Başlat” düğmesine basın.',
  'screencheck.next': 'Adımı kaydet ve devam et',
  'screencheck.cancel': 'Yarıda kes',
  'screencheck.start': 'Sihirbazı başlat',
  'screencheck.clearResult': 'Sonucu temizle',
  'screencheck.resultTitle': 'Sonuç',
  'screencheck.resultEmpty': 'Henüz hiçbir adım kaydedilmedi.',
  'screencheck.resultPartial': '{total} adımdan {done} tanesi kaydedildi. Karşılaştıracak bir şey olduğunda sonuçlar görünecek.',
  'screencheck.note.uniformityLow': 'Arka aydınlatmanın düzgünlüğü %{value} — karede belirgin parlaklık farkları görünüyor.',
  'screencheck.note.uniformityOk': 'Arka aydınlatma eşit (%{value}).',
  'screencheck.note.nightWorks': 'Gece modu mavi oranını {value} yüzde puanı düşürüyor — çalışıyor.',
  'screencheck.note.nightWeak': 'Gece modu mavi oranını yalnızca {value} yüzde puanı değiştiriyor. Bu, sistem filtresinin genellikle sağladığından azdır.',
  'screencheck.note.pwm': 'Düşük parlaklıkta titreşim %{from} değerinden %{to} değerine çıkıyor — bu, darbe genişliği ile karartmanın (PWM) tipik belirtisidir.',
  'toast.screencheckDone': 'Sihirbaz tamamlandı. Sonuç aşağıda.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'Bu sayılar nereden geliyor. ',
  'reports.noteText': 'Rapor, bu cihazda kayıtlı geçmişten hesaplanır — beş saniyede bir nokta. Motor bunu ilk ölçümden beri topladığı için rapor ilk andan itibaren hazırdır.',
  'reports.rangeAria': 'Rapor aralığı',
  'reports.day': 'Son 24 saat',
  'reports.week': 'Son 7 gün',
  'reports.date': '{date} günü için rapor.',
  'report.headerDay': '{from} ile {to} arası gün — {count}.',
  'report.headerWeek': '{from} ile {to} arası hafta — {count}.',
  'count.points': { one: '{n} nokta', other: '{n} nokta' },
  'count.samples': { one: '{n} örnek', other: '{n} örnek' },
  'report.emptyTitle': 'Bu dönemde veri yok',
  'report.emptyText': 'Ölçüm ekranında ölçümü başlatın — geçmiş kendiliğinden kaydedilir.',
  'report.colAvg': 'Ortalama',
  'report.colMin': 'En düşük',
  'report.colMax': 'En yüksek',
  'report.zonesTitle': 'Bölge dağılımı',
  'report.worstHour': 'Günün en kötü saati',
  'report.worstHourNone': 'belirgin bir saat yok',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'Bununla ne yapmalı',
  'report.disclaimerTitle': 'Bu bir sağlık tavsiyesi değildir. ',
  'report.disclaimerText': 'Sonuçlar yalnızca bu telefonun kamerasının gördüğünden çıkar. Uygulama tayf ölçmez, lüks bilmez ve hiçbir tanı koymaz.',

  'advice.melanopic': 'Ortalama sirkadiyen etki {value}× çıktı. Akşamları 0,50 altına inmekte yarar var — en kolayı daha sıcak bir ampul ya da gece modu.',
  'advice.kelvin': 'Işık soğuktu (ortalama {value} K). Çalışmak için kusursuz; uykudan iki saat önce 3000 K altı daha iyidir.',
  'advice.flicker': 'Belirgin titreşim saptandı (ortalama %{value}). Bunun ardında genellikle ucuz bir ışık kısıcı ya da arka aydınlatma sürücüsü vardır.',
  'advice.uniformity': 'Işık dengesiz dağılıyor (%{value}). Lambayı kaydırmak ya da açısını değiştirmek genellikle ampulü değiştirmekten daha çok işe yarar.',
  'advice.worstHour': 'Günün en kötü saati {hour}:00 — normal dışı okumaların çoğu orada toplanıyor.',
  'advice.none': 'Bu dönemde normalin dışına çıkan bir şey yok. Şimdi en çok işe yarayacak şey, A/B karşılaştırmasında iki ışık kaynağını karşılaştırmak olur.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'Dosya biçimi. ',
  'export.noteText': 'Sütun ayırıcı noktalı virgül, ondalık ayırıcı virgül, BOM işaretli UTF-8 kodlaması. Ondalık ayırıcı olarak virgülü kullanan bir yerel ayardaki Excel böyle bir dosyayı hiçbir ayar yapmadan açar.',
  'export.range': 'Veri aralığı',
  'export.columns': 'Dosyadaki sütunlar',
  'export.chipFilled': ' — sütun dolu',
  'export.help': 'Dosya yedi sütunun tamamını içerir — motor bunları ilk ölçümden itibaren hesaplar ve hepsi dosyaya girer.',
  'export.run': 'CSV dosyasını kaydet',
  'export.previewEmpty': 'Bu aralıkta okuma yok. Ölçümü başlatın — geçmiş kendiliğinden kaydedilir.',
  'csv.range.hour': 'Son bir saat',
  'csv.range.day': 'Son 24 saat',
  'csv.range.week': 'Son 7 gün',
  'csv.range.month': 'Son 30 gün',
  'csv.colDate': 'Tarih',
  'csv.colTime': 'Saat',
  'csv.colZone': 'Bölge',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'Seçilen aralıkta hiç okuma yok.',
  'toast.exportFailed': 'Bu tarayıcı dosyanın kaydedilmesine izin vermedi.',
  'toast.exportSaved': {
    one: '{filename} dosyası kaydedildi ({n} satır).',
    other: '{filename} dosyası kaydedildi ({n} satır).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} sa {m} dk',
  'duration.ms': '{m} dk {s} sn',
  'duration.s': '{s} sn'
});
