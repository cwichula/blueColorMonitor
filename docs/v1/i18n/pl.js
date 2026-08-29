/* docs/v1/i18n/pl.js — słownik WŁASNY wersji v1, polski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka. Kolejność jest treścią umowy: plik wersji dokłada się do tego samego
 * obiektu i może nadpisać dowolny klucz wspólny — nigdy odwrotnie.
 *
 * DLACZEGO TEN SŁOWNIK JEST SAMOWYSTARCZALNY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar w app.js, własne
 * dwie wielkości zamiast siedmiu i własne nazwy stref („Bezpieczna” zamiast
 * „W normie”). Dlatego wszystko, co v1 pokazuje, stoi TUTAJ — także klucze,
 * które przypadkiem brzmią tak samo jak wspólne. Gdyby kiedyś warstwa wspólna
 * zmieniła brzmienie stref albo nazwę aplikacji, v1 ma zostać nietknięta.
 *
 * SKĄD TE ZDANIA: to nie są nowe tłumaczenia. Każde zdanie przepisano co do
 * znaku z miejsca, w którym stało do tej pory — z index.html, app.js,
 * features.js, menu.js i support.js tej wersji. Polszczyzna tej aplikacji była
 * pisana z rozmysłem; zmiana jej brzmienia przy okazji wprowadzania trzydziestu
 * języków byłaby zmianą przemyconą.
 *
 * MARKUP W WARTOŚCIACH. Część kluczy (rozdziały Dokumentacji) zawiera znaczniki
 * <b>, <i>, <code> i encje HTML. Wstawiane są przez data-i18n-html, czyli tylko
 * tam, gdzie autor tekstu świadomie tego chciał — nigdy do treści pochodzącej
 * od użytkownika. Bez tego wyróżnienia w akapitach Dokumentacji trzeba by było
 * rozbić każde zdanie na kilkanaście kluczy po jednym słowie.
 */
window.I18nData = window.I18nData || {};
window.I18nData['pl'] = Object.assign(window.I18nData['pl'] || {}, {

  /* ---- aplikacja ---- */

  'app.name': 'Monitoring Światła Szkodliwego',
  'app.description': 'Mierzy kamerą natężenie koloru niebieskiego na ekranie i pokazuje je na czytelnym wykresie ze strefami: bezpieczna, umiarkowana, szkodliwa.',

  /* ---- wybór języka ---- */

  'language.label': 'Język',
  'language.help': 'Język całej aplikacji. Wszystkie języki są już na tym urządzeniu — nic się nie pobiera i nic nie jest nigdzie wysyłane.',
  'language.auto': 'Zgodnie z urządzeniem',

  /* ---- nawigacja ---- */

  'nav.aria': 'Menu główne',
  'nav.tabsAria': 'Widoki aplikacji',
  'nav.announce': 'Ekran: {screen}',
  'nav.camera': 'Kamera',
  'nav.monitoring': 'Monitoring',
  'nav.support': 'Wsparcie',
  'nav.more': 'Więcej',
  'nav.docs': 'Dokumentacja',
  'nav.about': 'O aplikacji i kontakt',
  'nav.settings': 'Progi ostrzegania',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← Wróć',
  'action.back.aria': 'Wróć do poprzedniego ekranu',
  'action.openDocs': 'Przejdź do dokumentacji',
  'action.exportCsv': 'Eksport CSV',
  'action.delete': 'Usuń',
  'action.closeNotification': 'Zamknij powiadomienie',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref: przymiotnik odmieniony do rodzaju żeńskiego
     („strefa bezpieczna”), a nie wspólne „W normie”. Wersja plakatowa
     (zone.badge.*) jest osobnym kluczem, a nie zapisem wielkimi literami przez
     CSS: tureckie „i” i greckie akcenty nie znoszą automatycznej zamiany. */

  'zone.good': 'Bezpieczna',
  'zone.warning': 'Umiarkowana',
  'zone.critical': 'Szkodliwa',
  'zone.none': 'Brak danych',

  'zone.badge.good': 'BEZPIECZNA',
  'zone.badge.warning': 'UMIARKOWANA',
  'zone.badge.critical': 'SZKODLIWA',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'Jasność kanału B',
  'metric.raw.unitLabel': '% jasności kanału B',
  'metric.share.name': 'Udział niebieskiego',
  'metric.share.longName': 'Udział niebieskiego w świetle',
  'metric.share.unitLabel': '% udziału niebieskiego',
  'stat.overallBrightness': 'Jasność ogólna sceny',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': 'Podgląd kamery',
  'camera.pressStart': 'Naciśnij „Start”.',
  'camera.start': 'Start',
  'camera.stop': 'Stop',
  'camera.switch': 'Zmień kamerę',
  'camera.error': 'Nie udało się uruchomić kamery. Sprawdź uprawnienia przeglądarki do kamery i spróbuj ponownie. ({message})',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': 'Aktualne odczyty',
  'disclaimer.short': 'Wynik orientacyjny. To nie jest wyrób medyczny.',
  'disclaimer.more': 'Więcej',

  /* ---- wykresy ---- */

  'chart.aria': 'Wykresy w czasie',
  'chart.title': 'Wykresy w czasie (ostatnie {seconds} s)',
  'chart.empty': 'Uruchom kamerę, aby zobaczyć wykres',
  'chart.axis.past': '-{seconds}s',
  'chart.axis.now': 'teraz',
  'chart.raw.aria': 'Wykres jasności kanału B w czasie, z oznaczonymi strefami bezpieczną, umiarkowaną i szkodliwą',
  'chart.share.aria': 'Wykres udziału niebieskiego w świetle w czasie, z oznaczonymi strefami bezpieczną, umiarkowaną i szkodliwą',

  /* ---- tabela odczytów ---- */

  'table.show': 'Pokaż jako tabelę',
  'table.hide': 'Ukryj tabelę',
  'table.caption': 'Ostatnie odczyty (najnowszy na górze)',
  'table.col.time': 'Czas',
  'table.col.zone': 'Strefa',

  /* ---- ustawienia progów ---- */

  'settings.title': 'Ustawienia progów stref',
  'settings.boundary.critical': 'Granica żółty / czerwony:',
  'settings.boundary.warning': 'Granica zielony / żółty:',

  /* ---- historia i raport (features.js) ---- */

  'history.title': 'Historia i raport',
  'history.rangeAria': 'Zakres historii',
  'history.unavailable': 'Dane historii są chwilowo niedostępne.',
  'history.empty': 'Brak zapisanych odczytów w tym zakresie. Uruchom pomiar — historia zbiera się automatycznie.',
  'history.savedReadings': 'Zapisane odczyty: {count}. Podział czasu według stref:',
  'history.zoneLine': '{zone}: {percent}% ({readings})',

  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 dni',
  'range.30d': '30 dni',

  'report.dailyTitle': 'Raport dzienny',
  'report.empty': 'Raport pojawi się, gdy w wybranym zakresie będą zapisane odczyty.',
  'report.dailyCaption': 'Udział czasu w strefach, dzień po dniu',
  'report.col.day': 'Dzień',
  'report.col.week': 'Tydzień',
  'report.col.readings': 'Odczyty',
  'report.compare.day': 'Porównanie dzień do dnia: {day} — {percent}% czasu w strefie szkodliwej, {change}',
  'report.compare.dayPending': 'Porównanie dzień do dnia pojawi się po drugim dniu pomiarów.',
  'report.compare.week': 'Porównanie tydzień do tygodnia: {week} — {percent}% czasu w strefie szkodliwej, {change}',
  'report.compare.weekPending': 'Porównanie tydzień do tygodnia pojawi się po drugim tygodniu pomiarów.',
  'report.change.same': 'tyle samo co {other}.',
  'report.change.more': 'o {points} więcej niż {other}.',
  'report.change.less': 'o {points} mniej niż {other}.',
  'report.peak': 'Najwięcej odczytów w strefie szkodliwej między {from} a {to}.',
  'report.peak.none': 'W tym zakresie nie zapisano odczytów w strefie szkodliwej.',
  'report.weeklyTitle': 'Raport tygodniowy',
  'report.weeklyEmpty': 'Raport tygodniowy pojawi się, gdy w wybranym zakresie będą zapisane odczyty.',
  'report.weeklyCaption': 'Udział czasu w strefach, tydzień po tygodniu',
  'report.weekLabel': 'Tydzień {week} ({year})',
  'report.footnote': 'Liczby to udział zapisanych odczytów w wybranym zakresie, nie dokładny czas ekspozycji.',

  /* ---- profile progów ---- */

  'profiles.title': 'Profile progów',
  'profiles.empty': 'Nie masz jeszcze zapisanych profili.',
  'profiles.itemActive': '{name} (aktywny)',
  'profiles.applyAria': 'Zastosuj profil {name}',
  'profiles.deleteAria': 'Usuń profil {name}',
  'profiles.applied': 'Zastosowano profil „{name}”.',
  'profiles.deleted': 'Usunięto profil „{name}”.',
  'profiles.saved': 'Zapisano profil „{name}”.',
  'profiles.namePlaceholder': 'Nazwa profilu (np. Wieczór)',
  'profiles.saveLabel': 'Zapisz bieżące progi jako profil',
  'profiles.saveBtn': 'Zapisz profil',
  'profiles.needName': 'Podaj nazwę profilu.',
  'profiles.limit': {
    one: 'Możesz zapisać maksymalnie {n} profil. Usuń jeden, aby dodać nowy.',
    few: 'Możesz zapisać maksymalnie {n} profile. Usuń jeden, aby dodać nowy.',
    many: 'Możesz zapisać maksymalnie {n} profili. Usuń jeden, aby dodać nowy.',
    other: 'Możesz zapisać maksymalnie {n} profilu. Usuń jeden, aby dodać nowy.'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku też — ale musi
     zostać bezpieczna dla systemu plików: bez ukośników i dwukropków. */

  'csv.header': 'czas;jasnosc_B_proc;udzial_niebieskiego_proc;jasnosc_sceny_proc;strefa',
  'csv.filename': 'monitoring-swiatla-{stamp}.csv',
  'csv.empty': 'Brak odczytów do wyeksportowania. Uruchom pomiar i spróbuj ponownie.',
  'csv.done': 'Wyeksportowano {readings} do pliku CSV.',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut. Powód: „od 1 minuty”, „od 2 minut”,
     „od 5 minut” to dopełniacz, a nie mianownik z count.minutes — i w każdym
     z trzydziestu języków przypadek może wypaść inaczej. */

  'alert.exposure': {
    one: 'Alert progowy: od {n} minuty odczyt jest w strefie szkodliwej. Rozważ przerwę albo zmniejszenie udziału niebieskiego na ekranie.',
    few: 'Alert progowy: od {n} minut odczyt jest w strefie szkodliwej. Rozważ przerwę albo zmniejszenie udziału niebieskiego na ekranie.',
    many: 'Alert progowy: od {n} minut odczyt jest w strefie szkodliwej. Rozważ przerwę albo zmniejszenie udziału niebieskiego na ekranie.',
    other: 'Alert progowy: od {n} minuty odczyt jest w strefie szkodliwej. Rozważ przerwę albo zmniejszenie udziału niebieskiego na ekranie.'
  },

  'session.title': 'Podsumowanie ostatniej sesji',
  'session.line': 'Czas pomiaru: {duration}. Zapisane odczyty: {count}.',
  'session.zoneLine': '{zone}: {percent}% czasu sesji.',
  'session.endedAt': 'Podsumowanie dotyczy sesji zakończonej {time}.',
  'session.toast': 'Sesja zakończona: {duration}, {readings}, {percent}% czasu w strefie szkodliwej.',

  'duration.seconds': '{n} s',
  'duration.minutesSeconds': '{minutes} min {seconds} s',

  /* ---- liczebniki ----
     Polski ma cztery kategorie CLDR: one (1), few (2–4, ale nie 12–14),
     many (0, 5–21, …) i other — ta ostatnia dotyczy ułamków. Formę wybiera
     Intl.PluralRules('pl'), nie nasza reguła. */

  'count.readings': { one: '{n} odczyt', few: '{n} odczyty', many: '{n} odczytów', other: '{n} odczytu' },
  'count.points': {
    one: '{n} punkt procentowy',
    few: '{n} punkty procentowe',
    many: '{n} punktów procentowych',
    other: '{n} punktu procentowego'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': 'Więcej',
  'more.section.settings': 'USTAWIENIA',
  'more.section.help': 'POMOC',
  'more.thresholds.title': 'Progi ostrzegania',
  'more.thresholds.sub': 'Ustaw granice stref bezpiecznej, umiarkowanej i szkodliwej.',
  'more.docs.title': 'Dokumentacja',
  'more.docs.sub': 'Jak działa pomiar, jednostki, normy i strefy.',
  'more.about.title': 'O aplikacji i kontakt',
  'more.about.sub': 'Wersja, prywatność i kontakt.',
  'more.free': 'Aplikacja jest w całości bezpłatna.',
  'more.supportLink': 'Możesz ją dobrowolnie wesprzeć.',
  'more.version': 'Wersja {version} · Wszystkie funkcje dostępne bez konta i bez opłat',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': 'O aplikacji i kontakt',
  'about.version': 'Wersja {version}',
  'about.what.title': 'Czym jest ta aplikacja',
  'about.what.p1': '{app} mierzy kamerą telefonu, ile niebieskiego światła rejestruje sensor, i pokazuje to na dwóch gałkach oraz wykresach ze strefami. Wszystkie funkcje — pomiar, historia, raporty, profile progów, alert progowy, eksport CSV i Dokumentacja — są dostępne dla każdego, bez konta i bez opłat.',
  'about.what.p2': 'Aplikacja jest udostępniana „tak jak jest”, do użytku informacyjnego. Wynik pomiaru ma charakter orientacyjny i nie jest podstawą do decyzji zdrowotnych.',
  'about.privacy.title': 'Prywatność i dane',
  'about.privacy.p1': 'Obraz z kamery jest analizowany wyłącznie na Twoim urządzeniu i nigdy nie jest wysyłany na żaden serwer. Nie tworzymy kont i nie zbieramy Twoich danych. Ustawienia progów, profile i historia pomiarów są zapisywane tylko w pamięci tego urządzenia i tej przeglądarki.',
  'about.privacy.p2': 'Aplikacja nie wyświetla reklam i nie odzywa się do sieci. Jedyny wyjątek to przycisk na ekranie „Wsparcie”: gdy go klikniesz, przeglądarka otworzy stronę zewnętrzną w nowej karcie. Nic się nie dzieje, dopóki sam tego nie zrobisz.',
  'about.contact.title': 'Kontakt',
  'about.contact.p1': 'Uwagi, błędy i propozycje: [E-MAIL]. Odpowiadamy, gdy tylko się da — to projekt utrzymywany po godzinach.',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': 'Wsparcie',
  'support.free.title': 'Wszystko jest dostępne',
  'support.free.text': 'Cała aplikacja jest bezpłatna: pomiar, historia i raporty, profile progów, alert, eksport CSV i Dokumentacja. Wszystko działa od razu, bez konta, bez limitów i bez internetu.',
  'support.why': '{app} powstaje po godzinach. Jeśli Ci się przydaje, możesz postawić mi kawę. To pomaga utrzymać aplikację i rozwijać ją dalej — poprawiać pomiar, dopisywać Dokumentację i sprawdzać ją na kolejnych telefonach.',
  'support.nothing': 'Darowizna niczego nie odblokowuje. Nie ma wersji lepszej ani gorszej — po wsparciu aplikacja działa dokładnie tak samo. Jedyna różnica jest taka, że autor wie, że komuś to się przydało.',
  'support.button': 'Postaw mi kawę',
  'support.button.aria': 'Postaw mi kawę — otwiera profil darowizn w nowej karcie',
  'support.pending': 'Profil darowizn nie jest jeszcze podłączony. Gdy tylko się pojawi, przycisk stanie w tym miejscu. Do tego czasu nic nie trzeba robić — aplikacja i tak jest w całości bezpłatna.',
  'support.privacy': 'Przycisk otwiera stronę zewnętrzną (Buy Me a Coffee) w nowej karcie przeglądarki. To jedyny moment, w którym cokolwiek opuszcza to urządzenie. Obraz z kamery i wszystkie Twoje pomiary zostają tutaj — nie są nigdzie wysyłane, ani przed kliknięciem, ani po nim.',
  'support.privacyPending': 'Kiedy adres się pojawi, kliknięcie przycisku otworzy stronę zewnętrzną (Buy Me a Coffee) w nowej karcie przeglądarki. Będzie to jedyny moment, w którym cokolwiek opuszcza to urządzenie. Obraz z kamery i wszystkie Twoje pomiary zostają tutaj — nie są nigdzie wysyłane.',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': 'Dokumentacja',

  'disclaimer.title': 'To nie jest wyrób medyczny',
  'disclaimer.body.docs': 'Ta aplikacja nie jest wyrobem medycznym. Nie służy do diagnozowania, leczenia ani zapobiegania jakimkolwiek chorobom. Wyniki pomiaru kamerą telefonu mają charakter orientacyjny i nie zastępują badania ani porady lekarza. W sprawach zdrowia wzroku skonsultuj się z lekarzem lub optometrystą. Progi stref w tej aplikacji nie odwzorowują żadnej normy bezpieczeństwa — szczegóły w rozdziale 3.',
  'disclaimer.body.about': 'Ta aplikacja nie jest wyrobem medycznym. Nie służy do diagnozowania, leczenia ani zapobiegania jakimkolwiek chorobom. Wyniki pomiaru kamerą telefonu mają charakter orientacyjny i nie zastępują badania ani porady lekarza. W sprawach zdrowia wzroku skonsultuj się z lekarzem lub optometrystą. Progi stref w tej aplikacji nie odwzorowują żadnej normy bezpieczeństwa — szczegóły w Dokumentacji, rozdział 3.',

  'doc.toc.aria': 'Spis treści dokumentacji',
  'doc.toc.title': 'Spis treści',

  'doc.ch1.title': 'Szybki start',
  'doc.ch2.title': 'Jak działa pomiar',
  'doc.ch3.title': 'Jednostki i normy',
  'doc.ch4.title': 'Strefy i progi',
  'doc.ch5.title': 'Różnice między urządzeniami',

  'doc.ch1.heading': '1. Szybki start',
  'doc.ch2.heading': '2. Jak działa pomiar',
  'doc.ch3.heading': '3. Jednostki i normy',
  'doc.ch4.heading': '4. Strefy i progi',
  'doc.ch5.heading': '5. Różnice między urządzeniami',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': 'Jak mierzyć trafniej',
  'doc.ch1.tips.li1': 'Na ekranie „Kamera” (pierwszy przycisk na dolnym pasku) naciśnij „Start” i skieruj tylny aparat na ekran lub źródło światła, które chcesz sprawdzić.',
  'doc.ch1.tips.li2': 'Przejdź na ekran „Monitoring” (drugi przycisk dolnego paska) — u góry zobaczysz obie gałki naraz, a niżej (przewiń) wykresy zmian w czasie. Pomiar działa w tle niezależnie od tego, który ekran akurat oglądasz.',
  'doc.ch1.tips.li3': 'Ustaw telefon w stałej odległości od ekranu (np. 15–20 cm), bez zmiany oświetlenia otoczenia w trakcie pomiaru.',
  'doc.ch1.tips.li4': 'Użyj tylnego aparatu — ma mniej agresywne korekcje automatyczne niż przedni.',
  'doc.ch1.tips.li5': 'Traktuj wyniki jako wskaźniki względne (%), nie bezwzględne jednostki fizyczne — porównuj je względem siebie (np. tryb nocny włączony/wyłączony).',
  'doc.ch1.tips.li6': 'Dostosuj progi stref w ustawieniach do jasności własnego ekranu (rozdział 4).',

  'doc.ch1.fonts.title': 'Duże czcionki i gałki — zawsze',
  'doc.ch1.fonts.p1': 'Cała aplikacja używa dużych, czytelnych czcionek i pełnowymiarowych gałek, tak żeby osoby niedowidzące (i wszyscy inni) mogli odczytać dane bez dodatkowych ustawień. Na ekranie „Monitoring” obie gałki mieszczą się razem na jednym ekranie, bez przewijania — wykresy zmian w czasie są zaraz pod nimi, o przewinięcie dalej.',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': 'Kamera telefonu a spektrometr',
  'doc.ch2.spectro.p1.html': 'Prawdziwy pomiar „ile jest szkodliwego niebieskiego światła” wymaga rozłożenia światła na długości fal — to robi <b>spektrometr</b>: pryzmat lub siatka dyfrakcyjna rozszczepia światło na dziesiątki/setki wąskich pasm (np. co 1–5 nm) i mierzy moc optyczną w każdym z osobna. Dopiero z takiego pełnego rozkładu widmowego liczy się jednostki takie jak luks, lumen czy napromienienie ważone funkcją zagrożenia niebieskim światłem.',
  'doc.ch2.spectro.p2.html': '<b>Kamera telefonu nie robi nic z tego.</b> Ma trzy szerokie filtry (Bayer: R/G/B), z których każdy zbiera światło z szerokiego, nakładającego się zakresu długości fal — „kanał niebieski” to nie wąskie pasmo ok. 435–440 nm (szczyt zagrożenia dla siatkówki), tylko z grubsza 400–570 nm zmieszane z zielenią. Po drodze dochodzi demozaikowanie, automatyczna ekspozycja, automatyczny balans bieli i kompresja gamma sRGB — żadnego z tych kroków przeglądarka nie pozwala w pełni wyłączyć. W efekcie wartość piksela, którą widzi JavaScript, nie jest liniowo związana z rzeczywistą mocą optyczną padającą na sensor. To fundamentalne ograniczenie sprzętowe, nie błąd tej aplikacji.',

  'doc.ch2.raw.title': 'Wykres 1 — Jasność kanału B',
  'doc.ch2.raw.what.html': '<b>Co pokazuje:</b> średnią jasność samego kanału niebieskiego (B) z próbkowanego fragmentu obrazu, w skali 0–255 przeliczonej na %.',
  'doc.ch2.raw.algo.html': '<b>Algorytm:</b>',
  'doc.ch2.raw.step1': '5 razy na sekundę pobieramy klatkę z kamery.',
  'doc.ch2.raw.step2': 'Wycinamy środkowe 60% kadru (unika krawędzi obrazu i poświaty z boków).',
  'doc.ch2.raw.step3': 'Skalujemy wycięty fragment do siatki 32×32 piksele (wystarczająco dokładnie, dużo szybciej niż liczenie pełnej rozdzielczości — ważne na słabszym sprzęcie jak Xiaomi/Ulefone budżetowej klasy).',
  'doc.ch2.raw.step4': 'Uśredniamy wartość B wszystkich 1024 pikseli tej siatki.',
  'doc.ch2.raw.step5.html': '<code>wynik = średnia_B ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>Po co ją zostawiliśmy:</b> to najprostszy, bezpośredni odczyt „ile sygnału niebieskiego w ogóle rejestruje sensor”. Wadą jest to, że miesza jasność z barwą — bardzo jasna, ale neutralnie biała scena też da wysoki wynik, mimo że nie jest szczególnie „niebieska”. Dlatego obok niej pokazujemy wykres 2.',

  'doc.ch2.share.title': 'Wykres 2 — Udział niebieskiego w świetle',
  'doc.ch2.share.what.html': '<b>Co pokazuje:</b> jaki procent całego zarejestrowanego światła (R+G+B) stanowi składowa niebieska — czyli przesunięcie koloru w stronę zimnego, niezależnie od tego, jak jasna jest scena.',
  'doc.ch2.share.algo.html': '<b>Algorytm:</b> te same kroki 1–4 co wyżej, ale zamiast samego B liczymy:',
  'doc.ch2.share.formula.html': '<code>wynik = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': 'Neutralna biel (R≈G≈B) daje ok. <b>33%</b>. Światło cieplejsze/bardziej czerwone — mniej. Mocno niebieskie — więcej, aż do granicy ~100% dla światła niemal czysto niebieskiego.',
  'doc.ch2.share.why.html': '<b>Dlaczego to dokładniejsza miara „szkodliwego niebieskiego”:</b> to ta sama zasada, na której działają filtry typu tryb nocny / Night Shift — liczy się <b>barwa</b>, nie jasność. Bardzo jasny, ale neutralny ekran nie zostanie fałszywie oznaczony jako szkodliwy; przygaszony, ale mocno niebieski — owszem. Dlatego to ta metryka steruje kolorem strefy w tabeli odczytów.',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': 'Dlaczego nie luksy ani lumeny',
  'doc.ch3.units.p1.html': '<b>Lumen (lm)</b> opisuje całkowity strumień światła emitowany przez źródło — to właściwość samego źródła, nie tego, co pada na dany punkt. <b>Luks (lx)</b> to już natężenie oświetlenia w punkcie (lm/m²) — bliższe temu, o co chodzi, ale nadal jednostka <b>fotometryczna</b>: waży widmo krzywą czułości ludzkiego oka na jasność (V(λ)), nie krzywą zagrożenia niebieskim światłem. Do prawdziwego pomiaru zagrożenia potrzebna jest trzecia, węższa jednostka: napromienienie ważone widmowo w <b>W/m²</b> (norma IEC 62471, szczyt czułości ok. 435–440 nm), a to wymaga spektrometru — patrz sekcja wyżej.',
  'doc.ch3.units.p2.html': 'Nawet gdyby poprzestać na luksach: telefon bez zewnętrznego, skalibrowanego czujnika światła nie jest w stanie ich wiarygodnie wyznaczyć. Wbudowany czujnik światła telefonu (tam gdzie istnieje) mierzy zresztą światło z <b>przeciwnej strony</b> obudowy niż ta, którą celujesz w ekran tylnym aparatem — mierzyłby więc światło za Twoimi plecami, nie to z ekranu. Dlatego zamiast zgadywać liczbę w jednostce, która i tak byłaby niewiarygodna, pokazujemy uczciwie opisany <b>wskaźnik względny (%)</b> — sensowny do porównań na tym samym telefonie w tych samych warunkach (np. tryb nocny włączony/wyłączony), nie jako wartość bezwzględna.',

  'doc.ch3.norms.title': 'Czy istnieją globalne normy dla progów bezpieczeństwa?',
  'doc.ch3.norms.p1.html': 'Krótko: <b>nie ma normy wyrażonej w procentach kanału kamery</b> — to w ogóle nie jest jednostka, w której cokolwiek się reguluje. Realne normy dotyczące niebieskiego światła istnieją, ale mierzą inne wielkości, w innych jednostkach, i dotyczą innego zjawiska niż zwykle mamy na myśli, mówiąc „niebieskie światło męczy oczy”.',
  'doc.ch3.norms.p2.html': '<b>Ostre uszkodzenie fotochemiczne siatkówki — IEC 62471 / ICNIRP.</b> Jedyna faktycznie regulowana „szkodliwość niebieskiego światła” — norma dla lamp i systemów oświetleniowych, wspierana wytycznymi ICNIRP (International Commission on Non-Ionizing Radiation Protection). Klasyfikuje źródła do grup ryzyka RG0–RG3 na podstawie radiancji ważonej funkcją zagrożenia B(λ), w <b>W·m⁻²·sr⁻¹</b>, z limitem czasu ekspozycji (<code>t_max = 100 / L_B</code> sekund). Ekrany telefonów i monitorów — nawet przy maksymalnej jasności — praktycznie zawsze mieszczą się w <b>RG0 (zwolnione, bez ograniczeń)</b>. Ta norma dotyczy źródeł dużo intensywniejszych (łuki spawalnicze, niektóre projektory, przemysłowe LED-y), nie ekranów konsumenckich.',
  'doc.ch3.norms.p3.html': '<b>Wpływ na rytm dobowy / sen — CIE S 026.</b> To zjawisko, o które zwykle chodzi (ekran wieczorem „rozbudza”) — ale to nie uszkodzenie oka, tylko wpływ na zegar biologiczny przez komórki zwojowe siatkówki (ipRGC), najczulsze ok. 480 nm. Norma CIE S 026:2018 definiuje jednostkę <b>luks melanopiczny (melanopic EDI)</b>. Najbliższy „oficjalny” konsensus naukowy to publikacja Browna i współautorów (<i>PLOS Biology</i>, 2022), rekomendująca orientacyjnie: wieczorem &lt; 10 luksów melanopicznych, w dzień &gt; 250. To rekomendacje badaczy snu, nie przepis prawny.',
  'doc.ch3.norms.p4.html': '<b>WHO.</b> Światowa Organizacja Zdrowia nie publikuje własnych, niezależnych limitów ekspozycji na niebieskie światło — dla bezpieczeństwa promieniowania optycznego odsyła do ICNIRP (wyżej). Jedyny konkretny, autorski dokument WHO w temacie ekranów to <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i> (2019) — dotyczy jednak <b>czasu</b> spędzanego przy ekranie, nie koloru czy natężenia światła: brak ekranu poniżej 1. roku życia, maks. do 1 godziny dla 2–4 lat. Dla dorosłych WHO nie ma równie skonkretyzowanych wytycznych liczbowych.',
  'doc.ch3.norms.p5.html': '<b>Dlaczego to i tak nie pomaga skalibrować aplikacji:</b> obie normy (IEC/ICNIRP i CIE) wymagają pełnego rozkładu widmowego i skalibrowanej radiancji w znanej geometrii pomiaru — dokładnie tego, czego telefon przez przeglądarkę nie potrafi dostarczyć (patrz sekcja „Kamera telefonu a spektrometr” wyżej). Nie istnieje przelicznik „33% udziału niebieskiego = X luksów melanopicznych”, więc progi w tej aplikacji <b>nie odwzorowują żadnej normy bezpieczeństwa</b> (WHO, IEC, ICNIRP czy CIE — dla tego wskaźnika po prostu nie istnieje). Domyślne wartości progu udziału niebieskiego są za to wyprowadzone z realnych temperatur barwowych światła i powszechnie powtarzanej, praktycznej rekomendacji ciepłego światła wieczorem — solidniejsza podstawa niż zwykłe zaokrąglenie, ale wciąż nie formalna norma (pełne wyprowadzenie: rozdział 4). Zawsze możesz je zmienić na własne w ustawieniach.',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': 'Strefy kolorów i skąd biorą się progi',
  'doc.ch4.zones.p1.html': 'Obie metryki mają własne, niezależnie ustawiane progi (ekran „Monitoring” → „Ustawienia progów stref”, na dole strony) — 33%/66% na jednej nie znaczy tego samego, co na drugiej (patrz rozdział 2 wyżej). To <b>udział niebieskiego</b> decyduje o kolorze w legendzie pod wykresami i w tabeli odczytów:',
  'doc.ch4.zones.li1.html': '<b>Zielona — bezpieczna:</b> światło ciepłe lub neutralne, oczy odpoczywają.',
  'doc.ch4.zones.li2.html': '<b>Żółta — umiarkowana:</b> zauważalne przesunięcie w stronę niebieskiego, warto robić przerwy.',
  'doc.ch4.zones.li3.html': '<b>Czerwona — szkodliwa:</b> silnie niebieskie światło, mocno męczy oczy przy dłuższej ekspozycji (zwłaszcza wieczorem).',
  'doc.ch4.zones.p2.html': '<b>Skąd te konkretne liczby.</b> <b>Jasność kanału B</b> nie ma naturalnego punktu odniesienia — sensowna wartość progu zależy wyłącznie od tego, jak jasna jest scena, którą filmujesz (to miara jasności, nie koloru). Domyślne 33%/66% to tu wciąż umowny punkt wyjścia — dostosuj go metodą prób do typowej jasności swojego ekranu/otoczenia.',
  'doc.ch4.zones.p3.html': '<b>Udział niebieskiego</b> ma domyślne progi wyprowadzone z realnych temperatur barwowych światła (fizyka, nie zaokrąglenie), nie z żadnej normy bezpieczeństwa — takiej normy dla tej wielkości nie ma (rozdział 3). Punkty odniesienia:',
  'doc.ch4.zones.li4.html': '<b>~4000K</b> („ciepła biel", typowa żarówka LED) → ok. <b>26%</b> udziału niebieskiego. Światło cieplejsze od tego (niższa temperatura barwowa) to zakres szeroko rekomendowany wieczorem przez narzędzia typu f.lux czy Night Shift — stąd dolny próg.',
  'doc.ch4.zones.li5.html': '<b>6500K (D65)</b>, standardowy punkt bieli dla większości ekranów telefonów i monitorów fabrycznie — ok. <b>33%</b>. Od tej wartości w górę zaczyna się zakres, w którym typowo stosuje się zalecenia ograniczenia niebieskiego światła — stąd górny próg.',
  'doc.ch4.zones.p4.html': '<b>Ważne zastrzeżenie:</b> to, jak bardzo „niebieskie" jest światło, nie zależy od pory dnia, ale zalecenia ograniczania niebieskiego światła dotyczą właściwie tylko <b>wieczora/nocy</b> — w dzień ekspozycja na chłodne, niebieskie światło (także słoneczne) jest normalna, a nawet korzystna dla rytmu dobowego. Czerwona strefa w środku dnia patrząc w zwykły, niezmieniony ekran nie oznacza realnego zagrożenia — to samo światło wieczorem jest już warte ograniczenia.',
  'doc.ch4.zones.p5.html': 'Progi obu metryk są całkowicie niezależne — zmiana jednej nie wpływa na drugą. Zmienione progi są <b>zapamiętywane w tym urządzeniu i przeglądarce</b> między kolejnymi otwarciami aplikacji (lokalnie, nic nigdzie nie jest wysyłane) — przycisk „Start" nie resetuje ich do domyślnych.',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': 'Dlaczego podgląd wygląda inaczej na różnych urządzeniach',
  'doc.ch5.devices.p1.html': '<b>Przeglądarka vs natywna aplikacja aparatu.</b> Gdy otwierasz aparat fabrycznie zainstalowany na telefonie, producent (np. Xiaomi) dokłada do podglądu na żywo własne, zastrzeżone algorytmy — HDR w czasie rzeczywistym, cyfrowe wzmacnianie jasności w słabym świetle, wygładzanie. Strona internetowa dostaje przez przeglądarkę dużo bardziej „surowy” strumień z kamery (funkcja <code>getUserMedia</code>), bez żadnego z tych ulepszeń — więc z zasady będzie wyglądać płasko/ciemniej niż natywny aparat, niezależnie od telefonu.',
  'doc.ch5.devices.p2.html': '<b>Różne możliwości sterowania kamerą.</b> To, jak dużo kontroli nad ekspozycją i balansem bieli przeglądarka w ogóle dostaje od systemu, zależy od konkretnego telefonu, sterownika kamery i wersji Chrome/WebView — jedne urządzenia (typowo komputery z kamerą USB) zgłaszają tylko pełną automatykę, inne (część telefonów z Androidem) zgłaszają dodatkowe, bardziej zaawansowane tryby. Wcześniejsza wersja tej aplikacji próbowała przełączać się na tryb ręcznej ekspozycji tam, gdzie telefon na to pozwalał, bez ustawienia konkretnej wartości — co na części telefonów zamrażało obraz na przypadkowej, ciemnej ekspozycji z chwili startu kamery. To był błąd w kodzie (już poprawiony), nie różnica jednostek — ale dobrze pokazuje, jak łatwo zachowanie potrafi się różnić między urządzeniami, skoro nawet ta sama linijka kodu włącza się tylko na części z nich.',
  'doc.ch5.devices.p3.html': '<b>Różne sensory i przetwarzanie obrazu (ISP).</b> Nawet przy identycznym kodzie i tej samej scenie różne modele telefonów mają różnej jakości sensory i różnie strojoną automatykę producenta — jeden szybciej i celniej dobierze ekspozycję w słabym świetle niż drugi. To, w połączeniu z faktem, że wskaźniki w tej aplikacji są <b>względne</b> (patrz rozdział 3), oznacza: wyniki (i wygląd podglądu) sensownie porównuj na tym samym telefonie w czasie, nie między różnymi modelami/urządzeniami.'
});
