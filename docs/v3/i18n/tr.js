/* docs/v3/i18n/tr.js — słownik WŁASNY wersji v3, turecki.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/tr.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js tego katalogu — pilnuje
 * tego docs/shared/i18n/keys.test.js. Kluczy, które stoją w słowniku wspólnym
 * (nazwy stref, zdania oceniające, noty o granicach metody, nazwy i opisy
 * siedmiu wielkości, zastrzeżenie z rozporządzenia (UE) 2017/745), tu NIE MA —
 * poza jednym świadomym nadpisaniem, opisanym przy 'verdict.critical.comfort'.
 *
 * TERMINOLOGIA idzie ZA docs/shared/i18n/tr.js, nie za v5. Nazwy siedmiu
 * wielkości: mavi oranı, sahne parlaklığı, renk sıcaklığı, sirkadiyen etki
 * (melanopik oran), titreşim, düzgünlük, göz konforu. Strefy: normal aralıkta /
 * dikkat / kritik — stąd „dikkat eşiği” i „kritik eşik”, a nie „uyarı/alarm”.
 * UWAGA: v5 tłumaczy migotanie jako „kırpışma”, bo ma tam „titreşim” zajęte
 * przez wibrację silniczka. v3 nie ma wibracji i idzie za warstwą wspólną,
 * czyli „titreşim” — inaczej ta sama wielkość nazywałaby się w listwie kanałów
 * inaczej niż w dokumentacji.
 * POZOSTAŁE STAŁE ODPOWIEDNIKI: panel (pulpit), modül (moduł), büyüklük
 * (wielkość), eşik (próg), oturum (sesja), geçmiş (historia), okuma (odczyt),
 * örnek (próbka), desen (plansza), kaydedici (rejestrator).
 *
 * ZAPIS: cudzysłowy “ ”, apostrof ’ (U+2019) — ASCII-owy ' rozerwałby napis
 * w pojedynczych cudzysłowach, a turecki stawia go przy końcówkach po liczbach
 * i skrótach („%60’ı”, „UTF-8’dir”). Znak % stoi po turecku PRZED liczbą
 * („%75”), więc wstawka przesuwa się za symbol — nazwa wstawki zostaje ta sama.
 * Sekundy, minuty i godziny skracamy jak w warstwie wspólnej: sn, dk, sa.
 *
 * ZAPIS LICZB WE WZORACH. Polska redakcja pisze przecinek dziesiętny
 * („0,3320”), angielska kropkę — turecki, jak polski, pisze przecinek. Liczby
 * wstawiane przez '{…}' są osobną sprawą: te formatuje warstwa językowa.
 */
window.I18nData = window.I18nData || {};
window.I18nData['tr'] = Object.assign(window.I18nData['tr'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. Po turecku
     dochodzi jeszcze i bez kropki: „Işık” daje „IŞIK”, a „Monitörü” — „MONİTÖRÜ”. */
  'app.wordmark': 'IŞIK MONİTÖRÜ',

  'state.idle': 'Hazır',
  'state.starting': 'Başlatılıyor',
  'state.running': 'Ölçülüyor',
  'state.runningTpl': 'Ölçülüyor {time}',
  'state.stopped': 'Durduruldu',
  'state.error': 'Kamera hatası',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5,0 po turecku, 5.0 po angielsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'Ölçümü başlat',
  'keys.starting': 'Başlatılıyor…',
  'keys.stop': 'Durdur',
  'keys.flip': 'Çevir',
  'keys.flipAria': 'Kamerayı değiştir: ön ya da arka',
  'keys.menu': 'Menü',
  'keys.menuAria': 'Modül listesi',
  'keys.back': '‹ Geri',
  'keys.backAria': 'Panele dön',
  'keys.dash': 'Panel',
  'keys.zoom': 'Önizlemeyi büyüt',
  'keys.retry': 'Yeniden deneyin',
  'keys.refresh': 'Yenile',
  'keys.close': 'Kapat',
  'keys.show': 'Göster',
  'keys.apply': 'Uygula',
  'keys.remove': 'Sil',

  'monitor.legend': 'Kontrol önizlemesi',
  'monitor.badge': 'Canlı',

  'aim.title': 'Nişan alma',
  'aim.hint': 'Çerçeve, uygulamanın ölçtüğü görüntü bölgesini tam olarak gösterir.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'Ana kanal',
  'readout.thresholdTpl': '(eşik {value})',
  'readout.contextTpl': 'en az {min} · ort. {avg} · en çok {max} — son 60 sn',
  'readout.contextEmpty': 'son 60 sn içinde veri yok',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'Ne anlama geliyor: {name}',
  'aria.channel': '{name}, {value}, {zone}. Büyük göstergede göster.',
  'aria.channelStale': '{name}, veri yok. Büyük göstergede göster.',
  'aria.scale': 'Ölçek: {name}, {min} ile {max} arası. Şimdi {value}, {zone}. Dikkat eşiği {warn}, kritik eşik {crit}.',
  'aria.readout': '{name}: {value}, {zone}.',
  'aria.readoutApprox': '{name}: yaklaşık {value}, {zone}. Yaklaşık bir değer.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'Ana kanal ölçeği. Veri yok',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': '“Ölçümü başlat” düğmesine basın, telefonu aydınlatılmış bir yüzeye doğrultun ve birkaç saniye hareketsiz tutun.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'Göz konforu düşük. Puanı neyin düşürdüğünü görmek için 01 numaralı modüle bakın.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'Ekranın altındaki “Ölçümü başlat” düğmesiyle başlayın. Kamera ancak siz bastıktan sonra açılır.',
  'transient.measureStopped': 'Ölçüm tamamlandı · {time} · geçmişe kaydedildi.',
  'transient.newVersion': 'Uygulamanın yeni bir sürümü var.',
  'transient.thresholdsSaved': 'Eşikler kaydedildi.',
  'transient.thresholdsRejected': 'Kaydedilmedi — dikkat eşiği ile kritik eşik birbirini geçemez.',
  'transient.historyCleared': 'Geçmiş temizlendi.',

  'live.lead': 'Ana kanal: {name}, {value}, {zone}.',
  'live.ready': 'Değerlendirme hazır. {name} {value}, {zone}.',
  'live.started': 'Ölçüm başladı.',
  'livebar.stopped': 'Ölçüm durduruldu',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'Henüz hiç kayıt yok. Geçmiş ölçüm sırasında yazılır — bir dakika boyunca ölçüm yapın ve buraya dönün.',
  'empty.recorderNoRange': 'Bu aralıkta ölçüm yapılmamış.',
  'empty.coverageTpl': 'Ölçüm {total} saatin {done} saatini kapsadı.',
  'empty.reportsNoData': 'Günlük rapor, ölçüm yapılan ilk tam günden sonra oluşur.',
  'empty.compareOneSession': 'Karşılaştırma için tamamlanmış iki oturum gerekir. Şimdilik bir taneniz var.',
  'empty.exportNoData': 'Dışa aktarılacak bir şey yok. Geçmişin dolması için ölçümü başlatın.',
  'empty.alertsOff': 'Uyarılar kapalı. Açtığınızda yalnızca uygulama açıkken çalışırlar.',
  'empty.scheduleEmpty': 'Hiçbir saat ayarlanmadı. Zamanlama yalnızca uygulama açıkken çalışır.',
  'empty.historyEmpty': 'Geçmiş boş.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'Modül listesi',

  'modules.01.title': 'Kaydedici',
  'modules.01.desc': 'Ölçümün zaman içindeki seyri, bir dakikadan otuz güne kadar.',
  'modules.02.title': 'Eşikler',
  'modules.02.desc': 'Her büyüklük için kendi dikkat ve kritik sınırlarınızı belirleyin.',
  'modules.03.title': 'Kalibrasyon',
  'modules.03.desc': 'Bilinen bir ışık kaynağına göre ayar ve kalibrasyonun düzeltmedikleri.',
  'modules.04.title': 'Raporlar',
  'modules.04.desc': 'Günlük ve haftalık özetler, çıktı düzeninde.',
  'modules.05.title': 'Dışa aktarma',
  'modules.05.desc': 'Okumaların, sütun açıklamalarıyla birlikte CSV ya da JSON dosyasına kaydı.',
  'modules.06.title': 'Karşılaştırma',
  'modules.06.desc': 'İki oturum yan yana, farkı sayıyla verilmiş.',
  'modules.07.title': 'Ekran testi',
  'modules.07.desc': 'Kendi monitörünüzü adım adım kontrol etmeye yarayan desenler.',
  'modules.08.title': 'Zamanlama',
  'modules.08.desc': 'Belirlediğiniz saatlerde kendiliğinden ölçüm.',
  'modules.09.title': 'Uyarılar',
  'modules.09.desc': 'Eşik aşıldığında bildirim — ve bunun ne zaman çalışmayacağı.',
  'modules.10.title': 'Destek',
  'modules.10.desc': 'Uygulamanın tamamı ücretsizdir. Buradan yazarına bir kahve ısmarlayabilirsiniz.',
  'modules.11.title': 'Belgeler',
  'modules.11.desc': 'Bu ölçüm nedir ve kesinlikle ne değildir.',
  'modules.12.title': 'Ayarlar',
  'modules.12.desc': 'Tema, yazı boyutu, hareketi azaltma, geçmişi temizleme.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'Ölçüm kanalları',
  'channels.pick': 'Büyük göstergede göster',
  'channels.stale': 'veri yok',
  'channels.approx': 'yaklaşık değer',

  'help.unit': 'Birim',
  'help.range': 'Aralık',
  'help.thresholds': 'Eşikler',
  'help.warn': 'Dikkat eşiği',
  'help.crit': 'Kritik eşik',
  'help.now': 'şimdi',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „Büyüklük” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'Büyüklük',
  'col.unit': 'Birim',
  'col.range': 'Aralık',
  'col.direction': 'Yön',
  'col.time': 'Saat',
  'col.date': 'Tarih',
  'col.zone': 'Bölge',
  'col.avg': 'Ortalama',
  'col.min': 'En düşük',
  'col.max': 'En yüksek',
  'col.name': 'Sütun',
  'col.meaning': 'İçeriği',
  'col.channel': 'Kanal',
  'col.gain': 'Kazanç',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'Zaman aralığı',
  'recorder.range.60s': '60 sn',
  'recorder.range.15min': '15 dk',
  'recorder.range.1h': '1 sa',
  'recorder.range.24h': '24 sa',
  'recorder.range.30d': '30 gün',
  'recorder.gap': 'ölçüm yok',
  'recorder.sessionTitle': 'Oturum istatistiği',
  'recorder.zonesCaption': 'Mavi oranı için bölge dağılımı',
  'recorder.tableCaption': 'Seçilen aralıktaki okumalar',
  'recorder.crosshair': 'Okuma imleci',
  'recorder.prevAria': 'Önceki nokta',
  'recorder.nextAria': 'Sonraki nokta',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'Görünüm',
  'settings.themeLabel': 'Tema',
  'settings.themeSystem': 'Sistemdeki gibi',
  'settings.themeLight': 'Açık',
  'settings.themeDark': 'Koyu',
  'settings.themeHint': '“Sistemdeki gibi” teması, telefonunuzun ayarıyla birlikte değişir.',
  'settings.textLabel': 'Yazı boyutu',
  /* Mnożnik jako LICZBA we wstawce — 1,15 po turecku, 1.15 po angielsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'Yalnızca harfleri değil, arayüzün tamamını büyütür — düğmeler ve satırlar da yazıyla birlikte büyür.',
  'settings.motionGroup': 'Hareket',
  'settings.motionLabel': 'Hareketi azalt',
  'settings.motionHint': 'Bütün geçişleri kapatır. Ölçek ibresi o zaman akmak yerine saniyede bir sıçrar.',
  'settings.dataTitle': 'Veriler',
  'settings.clearLabel': 'Geçmişi temizle',
  'settings.clearHintTpl': 'Geçmişte şu anda {count} kayıtlı nokta var.',
  'settings.clearHintEmpty': 'Geçmiş boş.',
  'settings.clearTitle': 'Geçmiş temizlensin mi?',
  'settings.clearConfirm': 'Ölçüm geçmişinin tamamı temizlensin mi? Bu geri alınamaz.',
  'settings.clearKey': 'Temizle',
  'settings.aboutTitle': 'Uygulama hakkında',
  'settings.versionTpl': '{app}, sürüm {version}.',
  'settings.offlineText': 'Uygulama ağ olmadan çalışır. İlk açılıştan sonra bütün dosyaları tarayıcının belleğinde durur, bu yüzden uçak modu hiçbir şeyi değiştirmez. Hiçbir sunucuya hiçbir şey gönderilmez, çünkü uygulama ağ isteği yapmaz.',
  'settings.docsKey': 'Belgeleri aç',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'Vazgeç',
  'common.save': 'Kaydet',
  'common.reset': 'Varsayılana döndür',
  'common.yes': 'Evet',
  'common.no': 'Hayır',
  'common.on': 'Açık',
  'common.off': 'Kapalı',
  'common.sep': ' · ',
  'common.stepsTitle': 'Adım adım',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'Kendi eşikleriniz ne işe yarar',
  'modules.02.intro': 'Eşik, uygulamanın ne zaman “Dikkat”, ne zaman “Kritik” diyeceğini belirler. Varsayılan değerler bir standart değil, bizim editoryal değerlendirmemizdir — farklı koşullarda ölçüyorsanız onları kendinize göre kaydırın. Değerlendirme de paneldeki cümle de hemen yeni eşiklere göre hesaplanır.',
  'modules.02.orderNormal': 'Dikkat eşiği kritik eşiğin altında kalmalıdır.',
  'modules.02.orderInvert': 'Burada yüksek değer daha iyidir, bu yüzden dikkat eşiği kritik eşiğin üstünde kalır.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'Ölçek önizlemesi: {name}',
  'modules.02.nowTpl': 'şimdi {value}',
  'modules.02.resetDone': 'Varsayılan eşikler geri yüklendi.',
  'modules.02.profilesTitle': 'Profiller',
  'modules.02.profilesHint': 'Profil, yedi büyüklüğün tamamı için kaydedilmiş bir eşik takımıdır. Bir profili uygulamak hepsini birden değiştirir.',
  'modules.02.profileSaveKey': 'Şimdiki eşikleri kaydet',
  'modules.02.profileNameLabel': 'Yeni profilin adı',
  'modules.02.profileNameHint': 'Ad bu cihazda kalır. En çok 40 karakter.',
  'modules.02.profileNameEmpty': 'Bir profil adı girin.',
  'modules.02.profileSavedTpl': '“{name}” profili kaydedildi.',
  'modules.02.profileAppliedTpl': '“{name}” profili uygulandı.',
  'modules.02.profileRemovedTpl': '“{name}” profili silindi.',
  'modules.02.profileFailed': 'Bu profil uygulanamadı.',
  'modules.02.profileCustomTpl': '{date} tarihinde kaydedilmiş kendi profiliniz.',
  'modules.02.builtin.default.name': 'Varsayılan',
  'modules.02.builtin.default.desc': 'Büyüklük kataloğundaki eşikler — bütün ölçümler için çıkış noktası.',
  'modules.02.builtin.evening.name': 'Akşam — yumuşak',
  'modules.02.builtin.evening.desc': 'Soğuk renk ve sirkadiyen etki konusunda daha erken uyarır.',
  'modules.02.builtin.work.name': 'Masa başı çalışma',
  'modules.02.builtin.work.desc': 'Parlak, soğuk gün ışığına izin verir; titreşimi ve düzgünlüğü kollar.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'Bu neden işe yarar',
  'modules.03.why': 'Kamera algılayıcısının kanalları arasında sabit bir sapma vardır. Beyaz bir kâğıdı ölçmek bu sapmanın ne kadar büyük olduğunu gösterir ve onu çıkarmaya olanak verir. Bu, uygulamada doğruluğu gerçekten artıran tek işlevdir — ve yine de kamerayı bir spektrometreye dönüştürmez.',
  'modules.03.steps.1': 'Beyaz bir kâğıdı ölçtüğünüz ışığın altına koyun.',
  'modules.03.steps.2': 'Panelde “Ölçümü başlat” düğmesine basın ve kareyi kâğıtla doldurun.',
  'modules.03.steps.3': 'Buraya dönün, “Kalibre et” düğmesine basın ve telefonu üç saniye boyunca oynatmayın.',
  'modules.03.runKey': 'Kalibre et (3 sn)',
  'modules.03.clearKey': 'Kalibrasyonu sil',
  'modules.03.busyTpl': 'Kâğıt ölçülüyor… {sec} sn kaldı',
  'modules.03.statusNone': 'Kalibrasyon yok. Ölçüm çalışır, değerleri karşılaştırmalı olarak ele alın.',
  'modules.03.statusOnTpl': '{date} tarihinde saat {time} itibarıyla kalibre edildi.',
  'modules.03.gainsTitle': 'Kanal kazançları',
  'modules.03.gainR': 'Kırmızı',
  'modules.03.gainG': 'Yeşil',
  'modules.03.gainB': 'Mavi',
  'modules.03.gainsNone': 'ayarlanmadı',
  'modules.03.needRunning': 'Önce ölçümü başlatın ve kamerayı beyaz bir kâğıda doğrultun.',
  'modules.03.tooFew': 'Örnek sayısı çok az. Ölçümün gerçekten çalıştığını kontrol edin.',
  'modules.03.tooDark': 'Görüntü kalibrasyon için fazla karanlık. Kâğıdı daha iyi aydınlatın ve yeniden deneyin.',
  'modules.03.refused': 'Kanal sapması kalibrasyon sayılamayacak kadar büyük. Eşit ışık altında beyaz kâğıt kullanın.',
  'modules.03.done': 'Kalibre edildi. Renk sıcaklığı ve sirkadiyen etki artık daha doğru olacak.',
  'modules.03.cleared': 'Kalibrasyon silindi.',
  'modules.03.limitsTitle': 'Kalibrasyonun düzeltmedikleri',
  'modules.03.limits.1': 'Kalibrasyon kameranın üç kanalını eşitler, bundan fazlasını değil. Kameraya tayf kazandırmaz, bu yüzden renk sıcaklığı ile sirkadiyen etki sRGB renklerinden hesaplanmış yaklaşık değerler olarak kalır.',
  'modules.03.limits.2': 'Sahne parlaklığını mutlak bir büyüklüğe çevirmez — o sayı göreli kalır. Okumayı alttan kaydıran otomatik pozlamayı ve beyaz dengesini de kapatmaz.',
  'modules.03.limits.3': 'Başka bir ışığa taşınmaz: bir ampulün altında yapılan kalibrasyon o ampulü anlatır. Başka bir kaynakta yeniden yapın. Ve bu ölçümün ne olmadığı konusunda hiçbir şeyi değiştirmez — hâlâ bir tetkik değildir ve hâlâ bir hastalığın teşhisine dayanak değildir.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'Rapor dönemi',
  'modules.04.rangeDay': 'Gün',
  'modules.04.rangeWeek': 'Hafta',
  'modules.04.headTpl': '{from} – {to} arası · {count} geçmiş noktası.',
  'modules.04.tableTitle': 'Özet',
  'modules.04.tableCaption': 'Seçilen dönemde ortalama, en düşük ve en yüksek',
  'modules.04.panoramaTitle': 'Panorama',
  'modules.04.panoramaAriaTpl': 'Panorama: {name}, {span}.',
  'modules.04.panoramaSpanDay': 'son gün, saatlere bölünmüş',
  'modules.04.panoramaSpanWeek': 'son hafta, günlere bölünmüş',
  'modules.04.panoramaHint': 'Çubuğun yüksekliği ve rengi aynı şeyi söyler: normal aralıkta — alçak, dikkat — orta, kritik — tam. Tabandaki çizgi, ölçüm yapılmayan saati gösterir.',
  'modules.04.coverageDayTpl': 'Ölçüm {total} saatin {done} saatini kapsadı.',
  'modules.04.coverageWeekTpl': 'Ölçüm {total} günün {done} gününü kapsadı.',
  'modules.04.zonesTitle': 'Bölge dağılımı',
  'modules.04.zonesCaptionTpl': 'Ana kanal için hesaplandı: {name}.',
  'modules.04.worstTpl': 'En zorlu zaman: {value}.',
  'modules.04.worstNone': 'belirgin bir zaman yok',
  'modules.04.worstHourTpl': 'saat {hour}',
  'modules.04.adviceTitle': 'Bununla ne yapmalı',
  'modules.04.adviceMelanopicTpl': 'Ortalama sirkadiyen etki {value}× çıktı. Akşamları 0,50 altına inmekte yarar var — en kolayı daha sıcak bir ampul ya da gece modu.',
  'modules.04.adviceKelvinTpl': 'Işık soğuktu (ortalama {value} K). Çalışmak için kusursuz; uyumadan iki saat önce 3000 K altı daha yumuşaktır.',
  'modules.04.adviceFlickerTpl': 'Belirgin bir titreşim görülüyor (ortalama %{value}). Bunun sorumlusu genellikle ucuz bir ışık kısıcı ya da arka aydınlatma sürücüsüdür.',
  'modules.04.adviceUniformityTpl': 'Işık dengesiz dağılıyor (%{value}). Lambayı kaydırmak ya da açısını değiştirmek genellikle ampul değiştirmekten daha çok işe yarar.',
  'modules.04.adviceWorstTpl': 'Eşiklerin dışındaki okumaların çoğu saat {hour} civarında toplanıyor.',
  'modules.04.adviceNone': 'Bu dönemde belirlediğiniz eşiklerin dışına çıkan bir şey yok.',
  'modules.04.limitsTitle': 'Bu bir sağlık tavsiyesi değildir',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'Sonuçlar yalnızca bu telefonun kamerasının gördüklerinden çıkarılmıştır. Uygulama tayf ölçmez ve hiçbir teşhis koymaz.',
  'modules.04.printHint': 'Bu sayfa bir çıktı gibi tasarlandı: tablo ve alt yazılar kâğıtta, sistem büyütecinde ve ekran okuyucuda aynı okunur.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'Veri aralığı',
  'modules.05.range1h': 'Saat',
  'modules.05.range24h': 'Gün',
  'modules.05.range7d': '7 gün',
  'modules.05.range30d': '30 gün',
  'modules.05.csvKey': 'CSV dosyasını kaydet',
  'modules.05.jsonKey': 'JSON dosyasını kaydet',
  'modules.05.formatTitle': 'Dosya biçimi',
  'modules.05.formatCsv': 'CSV: sütunları noktalı virgül ayırır, ondalık ayırıcı virgüldür, kodlama BOM işaretli UTF-8’dir. Türkçeye ayarlı Excel böyle bir dosyayı hiçbir ayar yapmadan açar.',
  'modules.05.formatJson': 'JSON: aynı veriler “points” alanında, ondalık nokta ve milisaniye cinsinden zaman damgasıyla — biçimin gerektirdiği budur.',
  'modules.05.resolution': 'Geçmiş 5 saniyede bir nokta kaydeder ve 30 gün geriye gider. Saniyede beş örneklik tam çözünürlük dosyada yoktur — motor onu yalnızca bir dakika tutar.',
  'modules.05.offline': 'Dosya cihazda oluşur ve cihazda kalır. Dışa aktarma ağa bağlanmaz.',
  'modules.05.columnsTitle': 'Sütunların açıklaması',
  'modules.05.columnsCaption': 'Dosyanın sütunları ve anlamları',
  'modules.05.descDate': 'Noktanın cihaz saatinden alınan tarihi, gün-ay-yıl yazımıyla.',
  'modules.05.descTime': 'Noktanın saati, saniye duyarlığında.',
  'modules.05.descZone': 'Kayıt anındaki mavi oranı bölgesi. Motor bölgeyi yalnızca bu tek büyüklük için kaydeder — diğerleri için onu eşiklerden hesaplayın.',
  'modules.05.descMetricTpl': '{short} Birim: {unit}. Aralık {min}–{max}.',
  'modules.05.previewTitle': 'Önizleme',
  'modules.05.previewHint': 'Dosyanın ilk beş satırı, tam olarak kaydedilecekleri biçimde.',
  'modules.05.savedTpl': '{name} dosyası kaydedildi — {rows} satır.',
  'modules.05.failed': 'Bu tarayıcı dosyanın kaydedilmesine izin vermedi.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'Uygulama tamamlanan her ölçüm oturumunu bu cihaza kaydeder. İki oturumu tek bir şerit üzerinde görmek ve farkı sayıyla okumak için ikisini seçin.',
  'modules.06.noSessions': 'Henüz tamamlanmış bir oturum yok. Ölçümü başlatın, durdurun ve buraya dönün.',
  'modules.06.slotA': 'A oturumu',
  'modules.06.slotB': 'B oturumu',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'Şerit',
  'modules.06.tapeAriaTpl': '{slot} oturumunun seyri, büyüklük {name}.',
  'modules.06.tapeHint': 'İki oturum da aynı genişliğe yayılmıştır: bir çubuk aynı saat değil, sürenin aynı bölümüdür. Yükseklik ve renk paneldekiyle aynı şeyi söyler.',
  'modules.06.tapeChannelTpl': 'Şerit ana kanalı gösterir: {name}.',
  'modules.06.diffTitle': 'Fark',
  'modules.06.diffCaption': 'İki oturumun ortalamaları ve aralarındaki fark',
  'modules.06.clearKey': 'Kayıtlı oturumları sil',
  'modules.06.cleared': 'Kayıtlı oturumlar silindi.',
  'modules.06.savedTpl': 'Oturum kaydedildi: {dur}.',
  'modules.06.limitsTitle': 'Bu karşılaştırmanın söylemedikleri',
  'modules.06.limits': 'İki ışık kaynağını değil, iki ölçümü karşılaştırıyorsunuz. Oturumlar arasında kadraj, uzaklık, günün saati ya da telefonun konumu değiştiyse fark bunları da içerir. En dürüst karşılaştırma, aydınlatma değişmeden önceki ve sonraki aynı sahnedir.',
  'modules.06.keepTpl': 'En çok, en son {count} oturum hatırlanır.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'Kontrol desenleri bu cihazın ekranını tamamen kaplar. Ekranı gözle incelemeye yararlar: beyaz eşit mi, griler bir renge kayıyor mu ve arka aydınlatma köşelerden sızıyor mu.',
  'modules.07.steps.1': 'Ekran parlaklığını genellikle çalıştığınız düzeye getirin ve sistemin gece modunu kapatın.',
  'modules.07.steps.2': 'Aşağıdaki listeden bir desen seçin. Ekranın tamamını kaplayacak.',
  'modules.07.steps.3': 'Yaklaşık altmış santimetre uzaklıktan, ekrana dik bakın. Sonra aynı desene açıyla bakın.',
  'modules.07.steps.4': '“Deseni kapat” düğmesiyle ya da Escape tuşuyla çıkın ve bir sonrakine geçin.',
  'modules.07.planesTitle': 'Desenler',
  'modules.07.exitKey': 'Deseni kapat',
  'modules.07.showAriaTpl': 'Deseni göster: {name}',
  'modules.07.planeAriaTpl': 'Kontrol deseni: {name}. Kapatma düğmesi ekranın altındadır.',
  'modules.07.plane.white.name': 'Beyaz',
  'modules.07.plane.white.hint': 'Lekeleri, renk kaymalarını ve kenarlara yakın açılmaları arayın. Beyaz, yüzeyin tamamında tek bir renk olmalıdır.',
  'modules.07.plane.gray75.name': '%75 gri',
  'modules.07.plane.gray75.hint': 'Gri, gri olmalıdır. Yeşilimsi ya da pembemsi bir ton, ekranın beyaz dengesinin kaydığı anlamına gelir.',
  'modules.07.plane.gray50.name': '%50 gri',
  'modules.07.plane.gray50.hint': 'Renk tonunu değerlendirmek için en iyi desen. Ortayı köşelerle karşılaştırın.',
  'modules.07.plane.gray25.name': '%25 gri',
  'modules.07.plane.gray25.hint': 'Koyu gri, arka aydınlatma sızıntılarını ve ucuz panellerdeki bantlaşmayı gösterir.',
  'modules.07.plane.black.name': 'Siyah',
  'modules.07.plane.black.hint': 'Karanlık bir odada burada her arka aydınlatma sızıntısı ve açılmış her köşe görünür.',
  'modules.07.plane.red.name': 'Saf kırmızı',
  'modules.07.plane.red.hint': 'Tekdüze kırmızı, ölü alt pikselleri ve paneldeki düzensizlikleri ortaya çıkarır.',
  'modules.07.plane.green.name': 'Saf yeşil',
  'modules.07.plane.green.hint': 'Parlaklığın en büyük bölümünü yeşil taşır — bozuk bir pikseli en kolay onun üzerinde fark edersiniz.',
  'modules.07.plane.blue.name': 'Saf mavi',
  'modules.07.plane.blue.hint': 'Mavi, ekran yüzeyindeki kiri ve lekeleri beyazdan daha iyi gösterir.',
  'modules.07.plane.grid.name': 'Izgara',
  'modules.07.plane.grid.hint': 'Çizgiler köşelerde de ortadaki kadar keskin olmalıdır. Kenarlardaki bulanıklık görüntü ölçeklemesiyle ilgilidir.',
  'modules.07.warn': 'Desen, ölçüm düğmesinin durduğu kontrol paneli dahil ekranın tamamını kapatır. Uygulamada bunun olduğu tek yer burasıdır; çıkış düğmesi bu yüzden büyük ve her zaman görünürdür. Desen ekrandayken ölçüm sürer ve durdurulamaz — düğmelere dönmek için deseni kapatın.',
  'modules.07.cameraTitle': 'Burada yapamayacağınız şey',
  'modules.07.camera': 'Telefon kendi ekranını görmez, bu yüzden bu desenleri aynı cihazla ölçemezsiniz. Bir monitörü ölçmek için deseni monitörde gösterin, ölçümü telefonla yapın — bunlar iki ayrı cihaz ve iki ayrı roldür.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'Zamanlama, belirlenen saatte ölçümü hatırlatır. Kamerayı kendi başına açmaz: belirlenen saatte bir hatırlatma gösterir, ölçümü ise paneldeki “Ölçümü başlat” düğmesiyle siz başlatırsınız. Tıpkı ilk seferdeki gibi.',
  'modules.08.onlyOpenTitle': 'Bu ne zaman çalışmaz',
  'modules.08.onlyOpen': 'Zamanlama yalnızca uygulama açıkken çalışır. Kapalı bir tarayıcı sekmesi zamanı saymaz ve hiçbir şey hatırlatmaz. Sistem bildirimleri için izin istemiyoruz ve ağa hiçbir şey göndermiyoruz.',
  'modules.08.enableLabel': 'Hatırlatmaları aç',
  'modules.08.timesTitle': 'Saatler',
  'modules.08.timeAriaTpl': '{n}. saat: hatırlatma saati',
  'modules.08.addKey': 'Saat ekle',
  'modules.08.removeAriaTpl': '{time} saatini sil',
  'modules.08.addedTpl': '{time} saati eklendi.',
  'modules.08.removedTpl': '{time} saati silindi.',
  'modules.08.badTime': 'Saati 22:00 biçiminde girin.',
  'modules.08.nextTpl': 'En yakın hatırlatma: {time}.',
  'modules.08.nextNone': 'Hatırlatmalar kapalı.',
  'modules.08.dueTpl': 'Planlanan ölçüm saati: {time}.',
  'modules.08.dueKey': 'Paneli göster',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'Uyarı tek bir büyüklüğü kollar ve ancak o büyüklük seçilen bölgede belirlediğiniz süre boyunca kesintisiz kaldığında ses verir. Ölçümü hiçbir zaman durdurmaz ve düğmelerin önünü hiçbir zaman kapatmaz.',
  'modules.09.enableLabel': 'Uyarıları aç',
  'modules.09.metricLabel': 'Kollanan büyüklük',
  'modules.09.levelLabel': 'Hangi bölgeden itibaren',
  'modules.09.levelWarning': 'Dikkatten itibaren',
  'modules.09.levelCritical': 'Yalnızca kritik',
  'modules.09.sustainLabel': 'Kaç saniye kesintisiz sonra',
  'modules.09.sustainHint': 'Kısa süreler, telefonu oynattığınızda daha çok yanlış alarma yol açar. Beş saniyenin altına inmiyoruz.',
  'modules.09.soundLabel': 'Kısa bir sesli uyarı',
  'modules.09.soundHint': 'Ses cihazda üretilir. Ağdan hiçbir şey indirilmez.',
  'modules.09.cooldownHint': 'İki dakikada en çok bir uyarı. Her örnekte yinelenen bir alarm, sonunda büsbütün kapatılan bir alarmdır.',
  'modules.09.whenNotTitle': 'Uyarı ne zaman çalışmaz',
  'modules.09.whenNot': 'Bildirim sistemde değil, uygulamanın içindedir. Uygulama kapalıyken ya da arka planda gizliyken, ölçüm çalışmıyorken ve kollanan büyüklük o anda ölçülemiyorken çalışmaz. Sistem bildirimleri için izin istemiyoruz.',
  'modules.09.firedTpl': '{name}: {sec} sn boyunca {zone} — şimdi {value}.',
  'modules.09.saved': 'Uyarı ayarları kaydedildi.',
  'modules.09.statusOnTpl': 'Kollanıyor: {name}, {level}, {sec} sn sonra.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'Bu uygulama ücretsizdir',
  'support.freeText': 'Yedi büyüklüğün tamamı ilk açılıştan itibaren sayı gösterir. Kaydedici, eşikler, kalibrasyon, raporlar, dışa aktarma, oturum karşılaştırması ve otuz günlük geçmişin tamamı hesapsız, ücretsiz ve sınırsız çalışır — çevrimdışında da aynı. Burada hiçbir şey ücret karşılığında sonraya bırakılmamıştır.',
  'support.whyTitle': 'Bunu neden rica ediyorum',
  'support.whyText': 'Işık Monitörü’nü mesai dışında tek başıma yapıyor ve sürdürüyorum. Destek, düzeltmelere, yeni telefonlarda yapılan testlere ve modül listesindeki sonraki araçlara harcanan zamanı karşılıyor. Kimse hiçbir şey ödemezse de hiçbir şey çalışmayı bırakmaz.',
  'support.nothingTitle': 'Bağış ne kazandırır',
  'support.nothingText': 'Hiçbir şey. Bağıştan sonra hiçbir sayı, hiçbir modül ve hiçbir ayar açılmaz, çünkü her şey en baştan açıktır. Geriye yalnızca şu kalır: bunun birine yaradığını biliyorum.',
  'support.keyTitle': 'Yardım etmek isterseniz',
  'support.keyLabel': 'Bana bir kahve ısmarlayın',
  'support.keyAria': 'Bana bir kahve ısmarlayın — yeni bir sekmede dış bir sayfa açar',
  'support.serviceText': 'Bağış profilini dış bir servis yürütür, örneğin Buy Me a Coffee. Uygulama oradan hiçbir betik, araç ya da görsel yüklemez — burada duran yalnızca sıradan bir bağlantıdır, başka bir şey değil.',
  'support.privacyText': 'Bu düğmeye basmak yeni bir sekmede dış bir sayfa açar ve bu cihazdan bir şeyin çıktığı tek an budur. Ölçümler, geçmiş ve ayarlar oldukları yerde kalır — bu tarayıcının belleğinde.',
  'support.privacyPendingText': 'Adres hazır olduğunda düğmeye basmak yeni bir sekmede dış bir sayfa açacak ve bu cihazdan bir şeyin çıkacağı tek an o olacak. Ölçümler, geçmiş ve ayarlar oldukları yerde kalır — bu tarayıcının belleğinde.',
  'support.emptyTitle': 'Profil henüz bağlanmadı',
  'support.emptyText': 'Bağış profilinin adresi henüz girilmedi, bu yüzden burada hiçbir yere götürmeyecek bir düğme yok. Uygulamanın geri kalanı olduğu gibi çalışır — hiçbir şey bu bağışı beklemiyor.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'Bu uygulamanın ÖLÇMEDİKLERİ',
  'docs.notList.1': 'Tayf ölçmez. Kameranın üç geniş renk kanalı, otomatik pozlaması ve otomatik beyaz dengesi vardır.',
  'docs.notList.2': 'Mutlak değer ölçmez. Sahne parlaklığı, fotometrik bir ölçümün sonucu değil, göreli bir göstergedir.',
  'docs.notList.3': 'Renk sıcaklığını doğrudan ölçmez. Renk sıcaklığı ve sirkadiyen etki, sRGB renklerinden hesaplanmış yaklaşık değerlerdir.',
  'docs.notList.4': 'Şebeke titreşimini görmez. 5 Hz örnekleme yalnızca 2,5 Hz altındaki yanıp sönmeyi görür — şebekenin 100 Hz’i erişim dışıdır ve uygulama bunu hiçbir zaman sonuç olarak vermez.',
  'docs.notList.5': 'Teşhis koymaz ve sağlık tavsiyesi vermez. Hiçbir sonuç ne biridir ne de öteki.',
  'docs.notList.6': 'Işığınızı resmî hiçbir ölçütle karşılaştırmaz. Eşikler, 02 numaralı modülde değiştirebileceğiniz ayarlardır.',
  'docs.whatTitle': 'Neyi ve nasıl ölçer',
  'docs.whatLead': 'Telefonun kamerası aydınlatılmış bir yüzeye bakar, uygulama da saniyede beş kez karenin ortadaki bölgesinden R, G ve B kanallarının ortalamasını alır. Bu üç sayıdan yedi gösterge türetir.',
  'docs.whatCrop': 'Bu bölge, karenin genişliğinin %60’ı ile yüksekliğinin %60’ıdır — NİŞAN ALMA ekranında nişangâhın çizdiği dikdörtgenin tam olarak kendisi. Dışında kalan hiçbir şey hesaba katılmaz.',
  'docs.whatRate': '200 ms’de bir örnek, yani saniyede 5 kez. Son bir dakika bellekte tam çözünürlükte durur; daha eski her şey 5 saniyede bir kaydedilir ve otuz gün geriye gider.',
  'docs.metricsTitle': 'Yedi büyüklük',
  'docs.formulasTitle': 'Formüller',
  'docs.formula.share.formula': 'mavi oranı = B / (R + G + B) × 100%',
  'docs.formula.share.text': 'Gama tersine çevrilmeden sRGB değerleri üzerinden hesaplanır — bilerek, çünkü bu, uygulamanın önceki sürümündeki tanımın aynısıdır ve o zaman ayarlanmış eşikler bugün de aynı şeyi ifade eder. Rengi parlaklıktan ayırır.',
  'docs.formula.brightness.formula': 'parlaklık = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': 'Kanalların ortalama değeri, aralığın yüzdesi olarak. Otomatik pozlama onu alttan kaydırır, bu yüzden göreli bir göstergedir — iki sahneyi karşılaştırın, tek bir sayıyı ölçüm gibi okumayın.',
  'docs.formula.kelvin.title': 'Renk sıcaklığı — McCamy yaklaşımı',
  'docs.formula.kelvin.formula': 'n = (x − 0,3320) / (y − 0,1858)\nCCT = −449 n³ + 3525 n² − 6823,3 n + 5520,33',
  'docs.formula.kelvin.text': 'Önce sRGB gamasını tersine çeviririz, sonra D65 beyazı için matrisle CIE XYZ’ye geçer ve x, y renklilik değerlerini hesaplarız. McCamy formülü aşağı yukarı 2000 K ile 12500 K arasında güvenilirdir. Bu aralığın dışında kübik denklem dağılır, bu yüzden sonuç kırpılır ve güvenilmez olarak işaretlenir — o zaman ölçeğin taban çizgisi kesikli olur ve “yöntemin kapsamı dışında” cümlesi belirir.',
  'docs.formula.melanopic.title': 'Sirkadiyen etki — melanopik oran',
  'docs.formula.melanopic.formula': 'mel = 0,0016 R + 0,3110 G + 0,8460 B\nY = 0,2127 R + 0,7152 G + 0,0722 B\nsonuç = (mel / Y) × nötr beyaz için 1,00’e normalizasyon',
  'docs.formula.melanopic.text': 'Üç kanal da doğrusal değerlerde. Gerçek büyüklük, tayfın melanopsin duyarlılık eğrisiyle integralidir (tepe noktası 490 nm dolayında); kameranın üç geniş kanalı olduğu için sRGB renklerini yaklaşık dalga boylarındaki melanopik duyarlılıkla ağırlıklandırırız (R 612 nm, G 549 nm, B 465 nm). Değişimin yönü güvenilirdir, mutlak değer değil — bu sayının yanında “≈” işareti bu yüzden durur.',
  'docs.formula.flicker.formula': 'titreşim = (max − min) / (max + min) × 100%',
  'docs.formula.flicker.text': 'IES tanımı, parlaklık örneklerinden oluşan bir pencereden hesaplanır. Frekansı, sinyalin ortalama değeri kaç kez geçtiğinden kestiririz. 5 Hz örnekleme yalnızca 2,5 Hz altındaki modülasyonu görür (Nyquist sınırı) ve bir frekansı ancak 0,2 ile 2 Hz arasında, %0,5’ten başlayan genlikte güvenilir sayarız — bu eşiğin altında ortalamayı geçişler kaynağın yanıp sönmesi değil, algılayıcı gürültüsüdür.',
  'docs.formula.uniformity.formula': 'düzgünlük = en karanlık hücre / en parlak hücre × 100%',
  'docs.formula.uniformity.text': 'Bölgeyi 3×3 ızgarada dokuz hücreye böler ve uçları karşılaştırırız. %100, kusursuz eşit dağılmış ışıktır. Ekranda düşük değer arka aydınlatma sızmasına ya da bir yansımaya işaret eder; masada ise kötü yerleştirilmiş bir lambaya. Konforla birlikte, yüksek olmasının daha iyi anlamına geldiği tek büyüklük budur.',
  'docs.formula.comfort.formula': '100 puandan cezalar düşülür:\n0,75 üzerinde sirkadiyen etki — 35 puana kadar\n4000 K üzerinde renk — 25 puana kadar\n%5 üzerinde titreşim — 25 puana kadar\n%60 altında düzgünlük — 15 puana kadar',
  'docs.formula.comfort.text': 'Altı sayı yerine tek bir değerlendirme. Ölçülemeyen bir büyüklük hiçbir ceza getirmez — eksik veri hiçbir zaman iyi sonuç gibi görünmez. Ağırlıklar bir standart değil, bizim editoryal değerlendirmemizdir; 01 numaralı modül bileşenlerin dökümünü bu yüzden gösterir: bu değerlendirmeye katılmamak mümkün olsun diye.',
  'docs.rangesTitle': 'Aralıklar ve eşikler',
  'docs.rangesLead': 'Aşağıdaki eşikler şu anda geçerli olanlardır — 02 numaralı modülde değiştirdiyseniz tablo fabrika değerlerini değil, sizin değerlerinizi gösterir.',
  'docs.dirNormal': 'düşük olması daha yumuşak demektir',
  'docs.dirInvert': 'yüksek olması daha iyi demektir',
  'docs.privacyTitle': 'Veriler ve gizlilik',
  'docs.privacyText': 'Kamera görüntüsü hiçbir yere gönderilmez ve kaydedilmez — her kareden geriye yalnızca üç sayı kalır. Ölçümler, eşikler ve ayarlar bu cihazdaki tarayıcı belleğinde durur. Uygulama hiçbir ağ isteği yapmaz ve çevrimdışı çalışır.',
  'docs.mdrTitle': 'Yasal uyarı',
  'docs.freeText': 'Uygulamanın tamamı ücretsizdir ve öyle kalır: yedi büyüklüğün tamamı, geçmiş, raporlar, dışa aktarma ve çevrimdışı kip hesapsız, ücretsiz ve sınırsız çalışır. Teşekkür etmek isteyen, 10 numaralı “Destek” modülünü bulur.',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'Uygulama eksik yüklendi',
  'boot.filesTpl': 'Şu dosyalar yüklenmedi: {list}.',
  'boot.modulesTpl': 'Şu modüller kendini bildirmedi: {list} — bu kayıtlar listeden açılmayacak.',
  'boot.modulesRangeTpl': '{from}–{to} modülleri',
  'boot.tail': 'Sayfayı yenileyin. Bu yardımcı olmazsa sunucudaki dosyalar eksiktir.',
  'boot.loss.bus': 'modüller birbirini görmeyi bırakır ve ölçüm başlamaz',
  'boot.loss.metrics': 'hiçbir değer hesaplanmaz',
  'boot.loss.scaleCore': 'ölçek geometrisi ve sayı biçimlendirmesi kaybolur',
  'boot.loss.scaleText': 'bütün arayüz yazıları kaybolur',
  'boot.loss.shell': 'hiçbir modül açılamaz',
  'boot.loss.engine': 'kamera ve ölçüm başlamaz',
  'boot.loss.dash': 'panel boş kalır'
});
