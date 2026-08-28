/* docs/v2/i18n/pl.js — słownik WERSJI 2, polski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/pl.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej.
 *
 * SKĄD TE ZDANIA: to nie są nowe tłumaczenia. Każdy napis przepisano co do
 * znaku z miejsca, w którym stał do tej pory — z ui-core.js, tools.js,
 * support.js, boot.js i index.html wersji 2. Polszczyzna tej aplikacji była
 * pisana z rozmysłem i zmiana jej brzmienia przy okazji wprowadzania
 * trzydziestu języków byłaby zmianą przemyconą.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (i dlaczego):
 *   'zone.warning'        — wspólne mówi „Uwaga”, ta wersja od zawsze mówi
 *                           „Ostrzeżenie” (i „Ostrzeżenia” w podsumowaniu);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja wymienia
 *                           z nazwy przykładowy serwis i mówi „Pomiary”,
 *                           a nie „Pomiar”.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules. Patrz nagłówek docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['pl'] = Object.assign(window.I18nData['pl'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Monitor Światła — pomiar światła niebieskiego',
  'app.description': 'Monitor Światła — pomiar udziału światła niebieskiego kamerą telefonu. Siedem wskaźników, wykres, historia. Wszystko dostępne, bez konta i bez opłat.',
  'app.skipToContent': 'Przejdź do treści',
  'app.measuring': 'Pomiar trwa',
  'app.docsButton': 'Dokumentacja i wyjaśnienia',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — wersja 2',

  'nav.aria': 'Główna nawigacja',
  'nav.tablistAria': 'Ekrany aplikacji',
  'nav.measure': 'Pomiar',
  'nav.history': 'Historia',
  'nav.tools': 'Narzędzia',
  'nav.support': 'Wsparcie',
  'nav.more': 'Więcej',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Dokumentacja',
  'panel.thresholds': 'Progi i profile',
  'panel.reports': 'Raporty',
  'panel.export': 'Eksport danych',
  'panel.compare': 'Porównywarka A/B',
  'panel.calibration': 'Kalibracja białą kartką',
  'panel.screenCheck': 'Sprawdź mój monitor',
  'panel.schedule': 'Harmonogram',
  'panel.alerts': 'Alerty ekspozycji',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Wróć',
  'action.close': 'Zamknij',
  'action.refresh': 'Odśwież',
  'action.apply': 'Zastosuj',
  'action.delete': 'Usuń',
  'action.hide': 'Ukryj',
  'action.start': 'Start',
  'action.stop': 'Stop',
  'action.switch': 'Przełącz',
  'action.switchAria': 'Przełącz kamerę: przednia lub tylna',
  'action.resetDefaults': 'Przywróć domyślne',
  'action.reports': 'Raporty',
  'action.exportCsv': 'Eksport CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Ekran: {name}',
  'a11y.measureStarted': 'Pomiar rozpoczęty.',
  'a11y.measureStopped': 'Pomiar zatrzymany.',
  'a11y.measureStoppedSummary': 'Pomiar zatrzymany. Czas: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'Zastosowano profil progów.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Potwierdzenie',
  'dialog.confirm': 'Potwierdzam',
  'dialog.cancel': 'Anuluj',
  'dialog.infoTitle': 'Informacja',
  'dialog.ok': 'Rozumiem',

  'help.sheetTitle': 'Opis metryki',
  'help.unit': 'Jednostka',
  'help.scaleRange': 'Zakres skali',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które po polsku brzmią podobnie i dlatego mają osobne
     klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą przepuszczoną
     przez toLowerCase() — po niemiecku rzeczownik w środku zdania zostaje
     wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'Ostrzeżenie',
  'threshold.crit': 'Krytyczne',
  'threshold.warnLabel': 'Próg ostrzegawczy',
  'threshold.critLabel': 'Próg krytyczny',
  'threshold.warnAria': '{name} — próg: ostrzeżenie',
  'threshold.critAria': '{name} — próg: krytyczne',

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

  'firstRun.title': 'Jak zmierzyć',
  'firstRun.text': 'Naciśnij „Start”, skieruj telefon na oświetloną powierzchnię i trzymaj go nieruchomo przez kilka sekund. Ramka na podglądzie pokazuje wycinek, który aplikacja naprawdę czyta.',
  'firstRun.close': 'Zamknij podpowiedź',

  'camera.live': 'NA ŻYWO',
  'camera.idle': 'Kamera jest wyłączona. Naciśnij „Start”, skieruj telefon na oświetloną powierzchnię i trzymaj go nieruchomo przez kilka sekund.',
  'camera.stopped': 'Pomiar zatrzymany. Naciśnij „Start”, aby zmierzyć ponownie.',

  'error.cameraStart': 'Nie udało się uruchomić kamery.',
  'error.engineMissing': 'Moduł pomiaru nie został wczytany.',

  'metrics.sevenTitle': 'Siedem wskaźników',
  'measure.tilesSub': 'Odświeżane 5 razy na sekundę',

  'session.title': 'Ta sesja',
  'session.duration': 'Czas pomiaru',
  'session.samples': 'Liczba próbek',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     „Ostrzeżenia” to nie to samo słowo co „Ostrzeżenie” pod suwakiem. */
  'zone.count.good': 'W normie',
  'zone.count.warning': 'Ostrzeżenia',
  'zone.count.critical': 'Krytyczne',

  'note.calibrated': 'Pomiar skalibrowany białą kartką — kanały wyrównane.',

  'tile.helpAria': 'Co oznacza: {name}',
  'tile.noMeasurement': 'Brak pomiaru',
  'tile.outOfScale': 'Poza skalą',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Ostrzeżenie',
  'zone.spoken.warning': 'ostrzeżenie',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Przebieg w czasie',
  'history.pickHint': 'Wybierz metrykę i zakres',
  'history.metricLabel': 'Metryka',
  'history.rangeAria': 'Zakres czasu wykresu',
  'history.emptyTitle': 'Brak danych w tym zakresie',
  'history.emptyText': 'Uruchom pomiar na ekranie Pomiar — wykres zapełni się w kilka sekund.',
  'history.tableTitle': 'Ostatnie odczyty',
  'history.tableHide': 'Ukryj tabelę',
  'history.tableShow': 'Pokaż tabelę',
  'history.tableCaption': 'Ostatnie odczyty pomiaru, najnowszy na górze.',
  'history.tableEmpty': 'Brak odczytów. Uruchom pomiar na ekranie Pomiar.',

  'table.time': 'Godzina',
  'table.metric': 'Metryka',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     „1 godz.” łamało się na dwie linie. */
  'range.1m': '1 min',
  'range.1h': '1 godz',
  'range.24h': '24 godz',
  'range.7d': '7 dni',
  'range.30d': '30 dni',

  'chart.now': 'teraz',
  'chart.countSub': {
    one: '{n} odczyt w wybranym zakresie',
    few: '{n} odczyty w wybranym zakresie',
    many: '{n} odczytów w wybranym zakresie',
    other: '{n} odczytu w wybranym zakresie'
  },
  'chart.aria': '{name}, zakres {range}, {count}, ostatnia wartość {value} {unit}.',
  'chart.ariaZone': '{name}, zakres {range}, {count}, ostatnia wartość {value} {unit}, strefa: {zone}.',
  'chart.ariaEmpty': '{name} — brak danych w zakresie {range}.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Kreatory i funkcje pomocnicze',
  'tools.note': 'Narzędzia pomagają zinterpretować pomiar. Wszystkie są dostępne od razu, a sam pomiar działa niezależnie od nich.',

  'tool.thresholds.sub': 'Kiedy wartość ma zapalać ostrzeżenie',
  'tool.compare.sub': 'Które z dwóch świateł jest łagodniejsze',
  'tool.calibration.sub': 'Jedyna funkcja, która realnie podnosi dokładność',
  'tool.screenCheck.sub': 'Pięć kroków i gotowy wniosek o ekranie',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Harmonogram progów”
     kontra „Harmonogram”. Tak było i tak zostaje. */
  'tool.schedule.title': 'Harmonogram progów',
  'tool.schedule.sub': 'Inne progi wieczorem, bez pamiętania o tym',
  'tool.alerts.sub': 'Sygnał, gdy strefa krytyczna trwa zbyt długo',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Ustawienia',
  'more.thresholdsSub': 'Kiedy wartość ma zapalać ostrzeżenie',
  'more.docsSub': 'Jak mierzyć i czego ten pomiar nie mówi',
  'more.appearanceTitle': 'Wygląd i dostępność',

  'settings.theme': 'Motyw',
  'theme.auto': 'Jak w systemie',
  'theme.light': 'Jasny',
  'theme.dark': 'Ciemny',

  'settings.textScale': 'Rozmiar tekstu',
  'textScale.100': 'Standardowy',
  'textScale.115': 'Większy (115%)',
  'textScale.130': 'Największy (130%)',

  'settings.contrast': 'Wyższy kontrast',
  'settings.contrastSub': 'Mocniejsze obramowania i ciemniejszy tekst pomocniczy.',
  'settings.sound': 'Dźwięk alertów',
  'settings.soundSub': 'Krótki sygnał, gdy alert ekspozycji się włączy.',
  'settings.vibrate': 'Wibracja przy alertach',
  'settings.vibrateSub': 'Działa tylko na urządzeniach, które ją obsługują.',

  'more.dataTitle': 'Dane',
  'more.clearHistory': 'Wyczyść historię pomiarów',
  'more.clearHistorySub': 'Kasuje zapisane odczyty z tego urządzenia. Progi, profile i ustawienia zostają.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'Aplikacja jest bezpłatna w całości. ',
  'more.supportLink': 'Możesz ją wesprzeć dobrowolnie.',

  'dialog.clearHistory.title': 'Usunąć zapisaną historię?',
  'dialog.clearHistory.body': {
    one: 'Skasujemy {n} zapisany punkt pomiaru z tego urządzenia. Tej operacji nie da się cofnąć. Progi, profile i ustawienia zostaną nietknięte.',
    few: 'Skasujemy {n} zapisane punkty pomiaru z tego urządzenia. Tej operacji nie da się cofnąć. Progi, profile i ustawienia zostaną nietknięte.',
    many: 'Skasujemy {n} zapisanych punktów pomiaru z tego urządzenia. Tej operacji nie da się cofnąć. Progi, profile i ustawienia zostaną nietknięte.',
    other: 'Skasujemy {n} zapisanego punktu pomiaru z tego urządzenia. Tej operacji nie da się cofnąć. Progi, profile i ustawienia zostaną nietknięte.'
  },
  'dialog.clearHistory.confirm': 'Usuń historię',
  'dialog.clearHistory.cancel': 'Zostaw',

  'toast.historyCleared': 'Historia pomiarów usunięta.',
  'toast.screenUnavailable': 'Ten ekran nie jest jeszcze dostępny w tej wersji.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'Co ta aplikacja mierzy',
  'docs.leadText': 'Kamera telefonu patrzy na oświetloną powierzchnię, a aplikacja pięć razy na sekundę liczy średnie kanałów R, G i B ze środkowego wycinka kadru. Z tych trzech liczb wyprowadza siedem wskaźników.',
  'docs.limitsTitle': 'Granice metody',
  'docs.limitsText': 'Aparat ma trzy szerokie kanały barwne, automatyczną ekspozycję i automatyczny balans bieli. Nie mierzy widma i nie zna wartości bezwzględnych, więc jasność jest wskaźnikiem względnym, a nie luksami. Temperatura barwowa i wpływ na rytm dobowy to przybliżenia liczone z barw sRGB. Próbkowanie {rate} Hz widzi migotanie tylko poniżej {limit} Hz — sieciowe 100 Hz jest poza zasięgiem i aplikacja nigdy nie poda go jako wyniku.',

  'note.howTo.repeat.title': 'Powtórz pomiar',
  'note.howTo.repeat.text': 'Pojedynczy odczyt to migawka. Kilkanaście sekund pomiaru daje wiarygodniejszy obraz.',

  'docs.scale': 'Skala',
  'docs.direction': 'Kierunek',
  'docs.directionHigher': 'Wyżej znaczy lepiej',
  'docs.directionLower': 'Niżej znaczy łagodniej',
  'docs.privacyTitle': 'Dane i prywatność',
  'docs.privacyText': 'Obraz z kamery nigdzie nie jest wysyłany ani zapisywany — z każdej klatki zostają tylko trzy liczby. Pomiary, progi i ustawienia leżą w pamięci przeglądarki na tym urządzeniu. Aplikacja nie wykonuje żadnych zapytań sieciowych i działa w trybie offline.',
  'docs.freeLine': 'Wszystkie siedem wskaźników, historia, wykres, narzędzia i tryb offline działają dla każdego, bez konta i bez opłat.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Wszystko jest dostępne',
  'support.heroText': 'Wszystkie siedem wskaźników, historia pomiarów, wykres, wszystkie narzędzia i tryb offline działają dla każdego, od razu. Bez konta, bez limitów i bez opłat.',
  'support.whyTitle': 'Dlaczego o to proszę',
  'support.whyText': '{app} powstaje po godzinach i nie zarabia na nikim: nie ma reklam, nie zbiera danych i nie ma czego sprzedać. Utrzymanie i dalszy rozwój — nowe wskaźniki, poprawki, testy na kolejnych telefonach — kosztują czas. Jeżeli aplikacja Ci się przydała, możesz się dorzucić. Nie musisz.',
  'support.whatTitle': 'Co daje darowizna',
  'support.whatText': 'Nic. Naprawdę nic nie odblokowuje i niczego nie przyspiesza — aplikacja wygląda i działa dokładnie tak samo przed nią i po niej. Daje tylko tyle, że autor wie, że ta praca komuś się przydała.',
  'support.button': 'Postaw mi kawę',
  'support.pendingTitle': 'Profil nie jest jeszcze podłączony',
  'support.pendingText': 'Nie ma tu jeszcze adresu, pod który można przesłać wsparcie. Pojawi się w tym miejscu, kiedy będzie gotowy — do tego czasu wszystko w aplikacji działa dokładnie tak samo.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'Przycisk otwiera zewnętrzną stronę (na przykład Buy Me a Coffee) w nowej karcie. To jedyny moment, w którym cokolwiek opuszcza to urządzenie — i dzieje się dopiero po Twoim kliknięciu. Pomiary, historia i ustawienia zostają tutaj.',
  'privacy.externalPending': 'Kiedy adres się pojawi, kliknięcie otworzy zewnętrzną stronę w nowej karcie. Będzie to jedyny moment, w którym cokolwiek opuszcza to urządzenie. Pomiary, historia i ustawienia zostają tutaj.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (zapas w ui-core.js)',
  'boot.need.metrics': 'żadna wartość nie zostanie policzona',
  'boot.need.bus': 'moduły przestaną się widzieć',
  'boot.need.ui': 'nie da się przełączać ekranów',
  'boot.need.engine': 'kamera i pomiar nie ruszą',
  'boot.need.support': 'ekran Wsparcie będzie pusty',
  'boot.need.tools': 'zakładka Narzędzia będzie pusta',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'Nie wczytały się moduły: {list}.',
  'boot.consoleHint': 'Sprawdź kolejność i ścieżki <script> w index.html.',
  'boot.incompleteTitle': 'Aplikacja wczytała się niekompletnie',
  'boot.incompleteText': '{missing} Odśwież stronę; jeżeli to nie pomoże, pliki są niekompletne na serwerze.',
  'boot.newVersion': 'Jest nowa wersja aplikacji.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'Co robią progi. ',
  'thresholds.noteText': 'Próg ostrzegawczy zapala żółty stan, próg krytyczny czerwony. Zmiana działa natychmiast — także na odczycie, który już jest na ekranie. Progi są bezpłatne; płatne jest wyłącznie zapisywanie własnych zestawów pod nazwą.',
  'thresholds.profilesTitle': 'Profile progów',
  'thresholds.profilesSub': 'Trzy wbudowane są bezpłatne',
  'thresholds.customName': 'Nazwa własnego profilu',
  'thresholds.customPlaceholder': 'np. Sypialnia wieczorem',
  'thresholds.save': 'Zapisz bieżące progi',
  'thresholds.saveHelp': 'Zapisuje dokładnie te progi, które są ustawione powyżej.',

  'profile.builtin.default.name': 'Domyślny',
  'profile.builtin.default.desc': 'Progi z katalogu metryk — punkt wyjścia dla wszystkich pomiarów.',
  'profile.builtin.evening.name': 'Wieczór — łagodny',
  'profile.builtin.evening.desc': 'Ostrzega wcześniej o chłodnej barwie i wpływie na rytm dobowy.',
  'profile.builtin.work.name': 'Praca przy biurku',
  'profile.builtin.work.desc': 'Dopuszcza jasne, chłodne światło dzienne; pilnuje migotania i równomierności.',
  'profile.custom.desc': 'Własny profil zapisany {date}.',

  'toast.thresholdsReset': 'Przywrócono progi domyślne.',
  'toast.thresholdOrder': 'Próg ostrzegawczy musi być niższy niż krytyczny.',
  'toast.thresholdOrderInverted': 'Dla tej metryki próg ostrzegawczy musi być wyższy niż krytyczny.',
  'toast.profileNameMissing': 'Podaj nazwę profilu.',
  'toast.profileSaved': 'Zapisano profil „{name}”.',
  'toast.profileApplied': 'Zastosowano profil „{name}”.',
  'toast.profileApplyFailed': 'Nie udało się zastosować tego profilu.',
  'toast.profileRemoved': 'Profil usunięty.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'Po co harmonogram. ',
  'schedule.noteText': 'Wieczorem sensowne są inne progi niż w południe. Reguła „od–do” podmienia profil sama, żeby nie trzeba było o tym pamiętać. Harmonogram nigdy nie uruchamia ani nie zatrzymuje pomiaru.',
  'schedule.toggle': 'Włącz automatyczne przełączanie',
  'schedule.toggleSub': 'Sprawdzane co minutę na zegarze urządzenia.',
  'schedule.emptyTitle': 'Brak reguł',
  'schedule.emptyText': 'Dodaj pierwszą regułę przyciskiem poniżej.',
  'schedule.add': 'Dodaj regułę',
  'schedule.to': 'do',
  'schedule.profile': 'Profil',
  'schedule.fromAria': 'Reguła {n}: godzina początku',
  'schedule.toAria': 'Reguła {n}: godzina końca',
  'toast.scheduleTimeFormat': 'Podaj godziny w formacie 22:00.',
  'toast.scheduleEnded': 'Harmonogram skończył się — wróciły poprzednie progi.',
  'toast.scheduleApplied': 'Harmonogram włączył profil „{name}”.',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'Co robi alert. ',
  'alerts.noteText': 'Pilnuje jednej metryki i odzywa się dopiero wtedy, gdy trzyma ona wybraną strefę nieprzerwanie przez ustawiony czas. Nigdy nie zatrzymuje pomiaru i nie zasłania przycisków.',
  'alerts.toggle': 'Włącz alerty ekspozycji',
  'alerts.toggleSub': 'Działają tylko podczas trwającego pomiaru.',
  'alerts.metric': 'Pilnowana metryka',
  'alerts.level': 'Od której strefy',
  'alerts.level.warning': 'Ostrzegawczej i wyższej',
  'alerts.level.critical': 'Tylko krytycznej',
  'alerts.sustain': 'Po ilu sekundach nieprzerwanie',
  'alerts.sustainHelp': 'Krótsze czasy dają więcej fałszywych alarmów, gdy przesuwasz telefon.',
  'alerts.sound': 'Krótki sygnał dźwiękowy',
  'alerts.soundSub': 'Dźwięk generowany lokalnie. Można go też wyłączyć globalnie na ekranie Więcej.',
  'alerts.barTitle': 'Alert ekspozycji',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} trzyma strefę ostrzegawczą od {seconds} s — teraz {value} {unit}.',
  'alerts.message.critical': '{name} trzyma strefę krytyczną od {seconds} s — teraz {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'Jak porównywać. ',
  'compare.noteText': 'Uruchom pomiar, skieruj kamerę na pierwsze źródło i zapisz je jako A. Nie zmieniając odległości ani kąta, przełącz światło i zapisz B. Porównanie ma sens tylko wtedy, gdy scena jest ta sama.',
  'compare.slotA': 'Światło A',
  'compare.slotB': 'Światło B',
  'compare.save': 'Zapisz bieżący odczyt',
  'compare.savedAt': 'Zapisano {date}, {time}',
  'compare.empty': 'Jeszcze nic nie zapisano.',
  'compare.verdictTitle': 'Wynik porównania',
  'compare.verdictEmpty': 'Zapisz oba światła, żeby zobaczyć, które jest łagodniejsze.',
  'compare.notEnough': 'Za mało danych, żeby porównać te dwa pomiary.',
  'compare.tie': 'Oba źródła wychodzą praktycznie tak samo ({metric}: {a} i {b} {unit}). Różnica mieści się w szumie pomiaru.',
  'compare.betterA': 'Łagodniejsze jest światło A — {metric} wynosi {better} {unit} wobec {worse} {unit}.',
  'compare.betterB': 'Łagodniejsze jest światło B — {metric} wynosi {better} {unit} wobec {worse} {unit}.',
  'compare.clear': 'Wyczyść porównanie',
  'toast.compareSavedA': 'Zapisano światło A.',
  'toast.compareSavedB': 'Zapisano światło B.',
  'toast.compareCleared': 'Porównanie wyczyszczone.',
  'toast.measureFirst': 'Najpierw uruchom pomiar na ekranie Pomiar.',

  /* Nazwa wielkości w środku zdania. Po polsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. */
  'metric.share.nameLower': 'udział niebieskiego',
  'metric.brightness.nameLower': 'jasność sceny',
  'metric.kelvin.nameLower': 'temperatura barwowa',
  'metric.melanopic.nameLower': 'wpływ na rytm dobowy',
  'metric.flicker.nameLower': 'migotanie',
  'metric.uniformity.nameLower': 'równomierność',
  'metric.comfort.nameLower': 'komfort wzrokowy',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'Dlaczego to działa. ',
  'calib.noteText': 'Matryca aparatu ma stały odchył między kanałami. Zmierzenie białej kartki pokazuje, jak duży, i pozwala go odjąć. To jedyna funkcja w tej aplikacji, która realnie podnosi dokładność — i nadal nie zamienia aparatu w spektrometr.',
  'calib.step1': 'Połóż białą kartkę pod mierzonym światłem',
  'calib.step2': 'Uruchom pomiar i wypełnij kadr kartką',
  'calib.step3': 'Naciśnij „Kalibruj” i nie ruszaj telefonem przez 3 sekundy',
  'calib.done': 'Skalibrowano {date}, {time}.',
  'calib.none': 'Brak kalibracji. Pomiar działa, wartości traktuj porównawczo.',
  'calib.gain': 'Wzmocnienie {channel}',
  'calib.gainsLabel': 'Wzmocnienia kanałów',
  'calib.gainsUnset': 'nie ustawione',
  'calib.start': 'Kalibruj (3 s)',
  'calib.clear': 'Usuń kalibrację',
  'toast.calibCleared': 'Kalibracja usunięta.',
  'calib.error.noEngine': 'Moduł pomiaru nie jest dostępny.',
  'calib.error.notRunning': 'Najpierw uruchom pomiar i skieruj kamerę na białą kartkę.',
  'calib.error.busy': 'Kalibracja już trwa.',
  'calib.error.tooFewSamples': 'Za mało próbek. Sprawdź, czy pomiar naprawdę działa.',
  'calib.error.tooDark': 'Obraz jest za ciemny do kalibracji. Doświetl kartkę i spróbuj ponownie.',
  'calib.error.tooSkewed': 'Odchył kanałów jest za duży, żeby uznać go za kalibrację. Użyj białej kartki w równym świetle.',
  'calib.ok': 'Skalibrowano. Temperatura barwowa i wpływ melanopiczny będą teraz dokładniejsze.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'Do czego to służy. ',
  'screencheck.noteText': 'Pięć kroków sprawdza monitor tak, jak sprawdza się go w recenzji: biel przy dwóch jasnościach, równomierność podświetlenia i to, czy systemowy tryb nocny naprawdę coś zmienia. Kreator czyta trwający pomiar; sam go nie uruchamia.',
  'screencheck.step.white100.title': 'Biel przy pełnej jasności',
  'screencheck.step.white100.hint': 'Otwórz białą stronę na monitorze, ustaw jasność na maksimum i wypełnij kadr ekranem.',
  'screencheck.step.white20.title': 'Biel przy niskiej jasności',
  'screencheck.step.white20.hint': 'Zmniejsz jasność monitora do około jednej piątej i nie zmieniaj kadru.',
  'screencheck.step.corners.title': 'Rogi ekranu',
  'screencheck.step.corners.hint': 'Wróć do pełnej jasności i pokaż kamerze cały ekran — sprawdzamy równomierność podświetlenia.',
  'screencheck.step.nightOff.title': 'Tryb nocny wyłączony',
  'screencheck.step.nightOff.hint': 'Upewnij się, że filtr światła niebieskiego jest wyłączony.',
  'screencheck.step.nightOn.title': 'Tryb nocny włączony',
  'screencheck.step.nightOn.hint': 'Włącz filtr światła niebieskiego w systemie i powtórz ten sam kadr.',
  'screencheck.stepHeading': 'Krok {n} z {total}: {title}',
  'screencheck.idleTitle': 'Kreator nie jest uruchomiony',
  'screencheck.idleHint': 'Uruchom pomiar na ekranie Pomiar, potem wróć tutaj i naciśnij „Rozpocznij”.',
  'screencheck.next': 'Zapisz krok i przejdź dalej',
  'screencheck.cancel': 'Przerwij',
  'screencheck.start': 'Rozpocznij kreator',
  'screencheck.clearResult': 'Wyczyść wynik',
  'screencheck.resultTitle': 'Wynik',
  'screencheck.resultEmpty': 'Jeszcze nie zapisano żadnego kroku.',
  'screencheck.resultPartial': 'Zapisano {done} z {total} kroków. Wnioski pojawią się, gdy będzie co porównać.',
  'screencheck.note.uniformityLow': 'Równomierność podświetlenia wynosi {value}% — widać wyraźne różnice jasności w kadrze.',
  'screencheck.note.uniformityOk': 'Podświetlenie jest równe ({value}%).',
  'screencheck.note.nightWorks': 'Tryb nocny obniża udział niebieskiego o {value} punktu procentowego — działa.',
  'screencheck.note.nightWeak': 'Tryb nocny zmienia udział niebieskiego tylko o {value} punktu procentowego. To mniej, niż zwykle daje systemowy filtr.',
  'screencheck.note.pwm': 'Przy niskiej jasności migotanie rośnie z {from}% do {to}% — to typowy objaw ściemniania impulsowego (PWM).',
  'toast.screencheckDone': 'Kreator zakończony. Wynik jest poniżej.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'Skąd te liczby. ',
  'reports.noteText': 'Raport liczy się z historii zapisanej na tym urządzeniu — po jednym punkcie na pięć sekund. Silnik zbiera ją od pierwszego pomiaru, więc raport jest gotowy od razu.',
  'reports.rangeAria': 'Zakres raportu',
  'reports.day': 'Ostatnia doba',
  'reports.week': 'Ostatnie 7 dni',
  'reports.date': 'Raport na dzień {date}.',
  'report.headerDay': 'Dzień od {from} do {to} — {count}.',
  'report.headerWeek': 'Tydzień od {from} do {to} — {count}.',
  'count.points': { one: '{n} punkt', few: '{n} punkty', many: '{n} punktów', other: '{n} punktu' },
  'count.samples': { one: '{n} próbka', few: '{n} próbki', many: '{n} próbek', other: '{n} próbki' },
  'report.emptyTitle': 'Brak danych w tym okresie',
  'report.emptyText': 'Uruchom pomiar na ekranie Pomiar — historia zapisuje się sama.',
  'report.colAvg': 'Średnia',
  'report.colMin': 'Minimum',
  'report.colMax': 'Maksimum',
  'report.zonesTitle': 'Rozkład stref',
  'report.worstHour': 'Najgorsza pora dnia',
  'report.worstHourNone': 'brak wyraźnej',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'Co z tym zrobić',
  'report.disclaimerTitle': 'To nie jest porada zdrowotna. ',
  'report.disclaimerText': 'Wnioski wynikają wyłącznie z tego, co zobaczyła kamera tego telefonu. Aplikacja nie mierzy widma, nie zna luksów i nie stawia żadnej diagnozy.',

  'advice.melanopic': 'Średni wpływ na rytm dobowy wyniósł {value}×. Wieczorem warto zejść poniżej 0,50 — najprościej przez cieplejszą żarówkę lub tryb nocny.',
  'advice.kelvin': 'Światło było chłodne (średnio {value} K). Do pracy to bez zarzutu; na dwie godziny przed snem lepsze jest poniżej 3000 K.',
  'advice.flicker': 'Wykryto zauważalne migotanie (średnio {value}%). Zwykle odpowiada za nie tani ściemniacz albo zasilacz podświetlenia.',
  'advice.uniformity': 'Światło rozkłada się nierówno ({value}%). Przesunięcie lampy albo zmiana kąta zwykle daje więcej niż wymiana żarówki.',
  'advice.worstHour': 'Najgorsza pora dnia to godzina {hour}:00 — tam skupia się najwięcej odczytów poza normą.',
  'advice.none': 'W tym okresie nic nie wybija się ponad normę. Najwięcej dałoby teraz porównanie dwóch źródeł światła w porównywarce A/B.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'Format pliku. ',
  'export.noteText': 'Średnik jako separator kolumn, przecinek jako separator dziesiętny, kodowanie UTF-8 ze znacznikiem BOM. Taki plik polski Excel otwiera bez ustawiania czegokolwiek.',
  'export.range': 'Zakres danych',
  'export.columns': 'Kolumny w pliku',
  'export.chipFilled': ' — kolumna wypełniona',
  'export.help': 'Plik zawiera wszystkie siedem kolumn — silnik liczy je od pierwszego pomiaru i wszystkie trafiają do pliku.',
  'export.run': 'Zapisz plik CSV',
  'export.previewEmpty': 'Brak odczytów w tym zakresie. Uruchom pomiar — historia zapisuje się sama.',
  'csv.range.hour': 'Ostatnia godzina',
  'csv.range.day': 'Ostatnia doba',
  'csv.range.week': 'Ostatnie 7 dni',
  'csv.range.month': 'Ostatnie 30 dni',
  'csv.colDate': 'Data',
  'csv.colTime': 'Godzina',
  'csv.colZone': 'Strefa',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'W wybranym zakresie nie ma żadnych odczytów.',
  'toast.exportFailed': 'Ta przeglądarka nie pozwoliła zapisać pliku.',
  'toast.exportSaved': {
    one: 'Zapisano plik {filename} ({n} wiersz).',
    few: 'Zapisano plik {filename} ({n} wiersze).',
    many: 'Zapisano plik {filename} ({n} wierszy).',
    other: 'Zapisano plik {filename} ({n} wiersza).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} godz. {m} min',
  'duration.ms': '{m} min {s} s',
  'duration.s': '{s} s'
});
