/* Monitor Światła v5 — słownik polski.
 *
 * TO JEST ŹRÓDŁO PRAWDY DLA TREŚCI. Każdy napis, który widzi człowiek, ma tu
 * swój klucz, a teksty przepisano CO DO ZNAKU z kodu sprzed wprowadzenia
 * tłumaczeń — razem z półpauzami (—), cudzysłowami („ ”) i spacjami
 * nierozdzielającymi (zapisanymi jako \u00A0, bo w źródle nie da się ich
 * odróżnić od zwykłych). To był refaktor bez zmiany treści; poprawki stylu
 * należą do osobnej decyzji, a nie do przeprowadzki napisów.
 *
 * ANGIELSKI (en.js) JEST ZAPASEM dla kluczy, których w danym języku brakuje —
 * nie polski. Silnik i18n sięga po klucz najpierw do języka aktywnego, potem
 * do angielskiego, a dopiero na końcu oddaje sam klucz.
 *
 * KAŻDY NOWY KLUCZ dopisujemy NAJPIERW tutaj i w en.js, i dopiero potem
 * używamy go w kodzie. Klucz bez wpisu w en.js to napis, który w 28 pozostałych
 * językach zamieni się w polskie zdanie albo w gołą nazwę klucza.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Tekst ze wstawką {nazwa}'   — napis zwykły,
 *   'klucz.kropkowany': { one, few, many, other }    — forma zależna od liczby.
 * Nazwy wstawek są takie same we wszystkich językach. Formę mnogą rozstrzyga
 * Intl.PluralRules dla języka aktywnego — nie piszemy własnych reguł odmiany.
 *
 * UWAGA o polskich formach mnogich: `other` jest tu celowo równy `many`.
 * Dotychczasowa funkcja format.plural() klasyfikowała ułamki jako `many`
 * ('2,5 pomiarów'), a CLDR daje im `other`; zrównanie obu form zachowuje
 * dotychczasowe napisy co do znaku.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Monitor Światła',
  'app.description': 'Monitor Światła — mierzy kamerą siedem wielkości światła wokół Ciebie. Wszystko liczy się na tym urządzeniu, nic nie wychodzi do sieci.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Monitor Światła',
  'app.skipToContent': 'Przejdź do treści',
  'app.nav.aria': 'Nawigacja główna',
  'app.noscript.title': 'Ta aplikacja potrzebuje JavaScriptu',
  'app.noscript.text': 'Cały pomiar odbywa się w tej karcie przeglądarki: to JavaScript odczytuje klatki z kamery i liczy z nich siedem wielkości światła. Bez niego nie ma czym mierzyć. Włącz obsługę JavaScriptu dla tej strony i otwórz ją ponownie — nadal nic nie zostanie wysłane do sieci.',

  'nav.measure': 'Pomiar',
  'nav.history': 'Historia',
  'nav.tools': 'Narzędzia',
  'nav.support': 'Wsparcie',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Pomiar trwa',
  'shell.live.aria': 'Pomiar trwa. {metric}: {value}. Wróć do ekranu pomiaru.',
  'shell.live.metricFallback': 'Wielkość wiodąca',
  'shell.action.fallback': 'Akcja ekranu',

  'shell.loadFail.title': 'Nie udało się wczytać ekranu „{screen}”',
  'shell.loadFail.text': 'Prawdopodobnie zabrakło części plików w pamięci urządzenia. Połącz się z siecią i odśwież stronę.',
  'shell.fatal.title': 'Coś poszło nie tak',
  'shell.fatal.text': 'Aplikacja nie zdołała złożyć ekranu. Odświeżenie strony zwykle wystarcza — zapisane pomiary i ustawienia zostają na miejscu.',
  'shell.fatal.reload': 'Odśwież stronę',
  'shell.boot.failTitle': 'Nie udało się uruchomić aplikacji',
  'shell.boot.failText': 'Powłoka nie wystartowała. Odśwież stronę — zapisane pomiary i ustawienia zostają na miejscu.',
  'shell.background.error': 'Coś się popsuło w tle',
  'shell.background.action': 'Odśwież',
  'shell.update.title': 'Dostępna nowa wersja',
  'shell.update.action': 'Odśwież',

  'onboarding.title': 'Zanim zaczniesz',
  'onboarding.lead': 'Monitor Światła patrzy kamerą na światło wokół Ciebie i liczy z niego siedem wielkości — od udziału niebieskiego po komfort wzrokowy.',
  'onboarding.privacy': 'Obraz nie opuszcza tego urządzenia: nie ma serwera, nie ma konta i nie ma wysyłki. Wszystkie siedem wielkości działa od razu, bez logowania i bez opłat.',
  'onboarding.honesty': 'To orientacja, a nie przyrząd pomiarowy ani badanie lekarskie. Czego nie da się zmierzyć, tego nie pokazujemy — zamiast liczby zobaczysz pauzę.',
  'onboarding.start': 'Zaczynamy',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Wykonaj',
  'overlay.toast.close': 'Zamknij komunikat',
  'overlay.sheet.label': 'Okno',
  'overlay.sheet.close': 'Zamknij',
  'overlay.dialog.confirm': 'Potwierdź',
  'overlay.dialog.cancel': 'Anuluj',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'Anuluj',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'Pomiar',

  'measure.intro.aria': 'Zacznij pomiar',
  'measure.intro.headline': 'Zobacz, czym świecisz',
  'measure.intro.lead': 'Kamera pokazuje, ile niebieskiego jest w świetle, które właśnie na ciebie pada — i czy o tej porze dnia jest go za dużo.',
  'measure.intro.start': 'Rozpocznij pomiar',
  'measure.intro.hint': 'Przeglądarka poprosi o zgodę na kamerę. Pomiar rusza od razu po jej udzieleniu.',
  'measure.intro.privacy': 'Obraz z kamery jest przetwarzany w tym urządzeniu i nigdy go nie opuszcza. Nie wysyłamy, nie zapisujemy i nie udostępniamy żadnej klatki.',

  'measure.live.aria': 'Pomiar w toku',
  'measure.badge.starting': 'Uruchamiam',
  'measure.badge.paused': 'Wstrzymano',
  'measure.badge.running': 'Pomiar trwa',
  'measure.stale': 'Czekam na obraz — podgląd zamiera, gdy aplikacja jest w tle.',
  'measure.crop': 'Mierzymy środek kadru — zaznaczone {percent} % szerokości i wysokości obrazu.',
  'measure.facing.front': 'przedni obiektyw',
  'measure.facing.back': 'tylny obiektyw',

  'measure.boot.title': 'Uruchamiam kamerę…',
  'measure.boot.text': 'Jeśli przeglądarka pyta o zgodę, potwierdź ją — bez obrazu nie ma czego zmierzyć. Zgoda dotyczy wyłącznie tej strony i możesz ją później cofnąć.',
  'measure.boot.cancel': 'Anuluj',

  'measure.hold': 'Wskazania zamrożone. Kamera pracuje dalej, ale nic nie trafia do historii ani do średnich.',
  'measure.gridHint': 'Wybierz kafelek, aby przenieść tę wielkość na duży wskaźnik.',

  'measure.stop': 'Zatrzymaj',
  'measure.pause': 'Wstrzymaj',
  'measure.resume': 'Wznów',
  'measure.flip.aria': 'Przełącz kamerę',
  'measure.flip.toBack': 'Przełącz na tylny obiektyw',
  'measure.flip.toFront': 'Przełącz na przedni obiektyw',

  'measure.fail.aria': 'Błąd kamery',
  'measure.fail.headline': 'Kamera nie ruszyła',
  'measure.fail.retry': 'Spróbuj ponownie',
  'measure.fail.back': 'Wróć',
  'measure.fail.savedSession': 'Sesja sprzed przerwania ({duration}) została zapisana w historii.',
  'measure.error.fallback': 'Nie udało się uruchomić kamery.',

  'measure.summary.aria': 'Podsumowanie sesji',
  'measure.summary.title': 'Podsumowanie sesji',
  'measure.summary.paused': 'wstrzymane {duration}',
  'measure.summary.nothingMeasured': 'Żadna wielkość nie zebrała pomiaru — kamera nie widziała światła przez całą sesję.',
  'measure.summary.note': 'Średnie liczą wyłącznie próbki spoza wstrzymania. Wielkości, których nie zmierzono, są pominięte, a nie liczone jako zero.',
  'measure.summary.nearThreshold': 'Najbliżej progu',
  'measure.summary.worstPoint': 'Najsłabszy punkt',
  'measure.summary.averageZone': 'średnio {zone}',
  'measure.summary.tooShort': 'Sesja trwała {duration} — za krótko, by trafić do historii sama. Możesz ją zapisać ręcznie.',
  'measure.summary.again': 'Mierz ponownie',
  'measure.summary.save': 'Zapisz do historii',
  'measure.summary.saved': 'Zapisano w historii',
  'measure.summary.savedToast': 'Sesja zapisana w historii.',
  'measure.summary.close': 'Zamknij',

  'measure.method.title': 'Jak to mierzymy',
  'measure.method.p1': 'Aplikacja próbkuje obraz z kamery dziesięć razy na sekundę i liczy wielkości ze środkowych {percent} % kadru — celownik w podglądzie zaznacza dokładnie ten obszar.',
  'measure.method.p2': 'Kamera telefonu ma trzy szerokie kanały oraz własną, samoczynną korektę ekspozycji i balansu bieli. Widzi proporcje światła, nie jego widmo.',
  'measure.method.p3': 'Udział niebieskiego, jasność, migotanie i równomierność są tym, co kamera naprawdę mierzy. Temperatura barwowa i wpływ na rytm dobowy to jawne przybliżenia policzone z podstaw sRGB.',
  'measure.method.p4': 'Migotanie widać tylko poniżej czterech herców. Sieciowe 100 Hz leży daleko poza zasięgiem próbkowania i nigdy nie zostanie podane jako odczyt.',
  'measure.method.p5': 'Żadna z tych liczb nie jest pomiarem fotometrycznym ani wynikiem medycznym. Obraz z kamery nie opuszcza urządzenia.',
  'measure.method.ok': 'Rozumiem',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'Uruchamianie kamery przerwane.',
  'measure.announce.stoppedNoSamples': 'Pomiar zatrzymany. Nie zebrano żadnej próbki.',
  'measure.announce.stopped': 'Pomiar zatrzymany. Podsumowanie sesji jest gotowe.',
  'measure.announce.interrupted': 'Pomiar przerwany. Podsumowanie sesji jest gotowe.',
  'measure.announce.paused': 'Pomiar wstrzymany. Wskazania zamrożone.',
  'measure.announce.resumed': 'Pomiar wznowiony.',
  'measure.announce.switchedFront': 'Przełączono na przedni obiektyw. Zaczyna się nowa sesja.',
  'measure.announce.switchedBack': 'Przełączono na tylny obiektyw. Zaczyna się nowa sesja.',
  'measure.announce.lead': 'Wielkość wiodąca: {metric}.',
  'measure.announce.cameraError': 'Błąd kamery. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'Światło trzymało się bezpiecznego zakresu przez całą sesję — zostaw ustawienie lampy tak, jak jest, i sprawdź je ponownie po zmroku, gdy pracuje inne źródło.',
  'measure.advice.share.evening': 'Udział niebieskiego wyniósł średnio {value} — włącz na ekranach tryb nocny i zgaś górne światło, zostawiając jedną ciepłą lampkę na wysokości biurka.',
  'measure.advice.share.day': 'Udział niebieskiego wyniósł średnio {value} — w ciągu dnia to do przyjęcia, ale ustaw automatyczne przejście ekranu w tryb ciepły na dwie godziny przed snem.',
  'measure.advice.brightness': 'Kadr był prześwietlony (średnio {value}) — odsuń się od źródła światła albo zmniejsz jasność mierzonego ekranu, bo przy takiej ekspozycji pozostałe wielkości też tracą dokładność.',
  'measure.advice.kelvin.evening': 'Barwa światła trzymała się średnio {value} — po zmroku zejdź poniżej 3000 K: przełącz lampę na tryb ciepły albo wkręć żarówkę 2700 K.',
  'measure.advice.kelvin.day': 'Barwa światła trzymała się średnio {value} — na dzień to dobra, pobudzająca biel, ale wieczorem przestaw tę samą lampę na 2700 K.',
  'measure.advice.melanopic.evening': 'Wpływ na rytm dobowy wyniósł średnio {value} — na dwie godziny przed snem zejdź poniżej 0,50 ×, przygaszając główne światło i świecąc z wysokości biurka zamiast z sufitu.',
  'measure.advice.melanopic.day': 'Wpływ na rytm dobowy wyniósł średnio {value} — o tej porze taka dawka pomaga, ale wieczorem zamień to źródło na słabsze i cieplejsze.',
  'measure.advice.flicker': 'Migotanie sięgało średnio {value} — to zwykle ściemniacz albo nisko ustawione podświetlenie: podnieś jasność ekranu powyżej 40 % lub wymień ściemniacz na taki bez modulacji PWM.',
  'measure.advice.uniformity': 'Światło padało nierówno (średnio {value}) — ustaw lampę bokiem do blatu i dodaj drugie, słabsze źródło z przeciwnej strony, zamiast jednego mocnego punktu.',
  'measure.advice.comfort': 'Komfort wzrokowy wyszedł średnio {value} — zacznij od jednej zmiany: przygaś główne źródło o połowę i dopiero potem zajmij się barwą światła.',
  'measure.advice.default': 'Zmień jedną rzecz w oświetleniu i zmierz je ponownie — porównanie dwóch sesji mówi więcej niż pojedynczy odczyt.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'Historia',
  'history.action.export': 'Eksportuj historię',

  'history.metricGroup.aria': 'Wybór mierzonej wielkości',
  'history.announce.metric': 'Wielkość: {metric}',
  'history.rangeGroup.aria': 'Zakres czasu',
  'history.range.aria': 'Ostatnie {range}',

  'history.stats.title': 'Statystyki zakresu',
  'history.stats.head': '{metric}\u00A0—\u00A0ostatnie {range}',
  'history.stats.note': 'Liczone z tego, co widać na wykresie. Czas bez pomiaru nie jest wliczany — nie zastępujemy go zerem.',
  'history.stat.min': 'Minimum',
  'history.stat.avg': 'Średnia',
  'history.stat.max': 'Maksimum',
  'history.trend.up': 'rośnie w tym zakresie',
  'history.trend.flat': 'bez wyraźnej zmiany',
  'history.trend.down': 'spada w tym zakresie',
  'history.trend.none': 'brak danych do porównania',

  'history.sessions.title': 'Sesje pomiarowe',
  'history.sessions.count': '{sessions}, od najnowszej',
  'history.sessions.empty': 'Jeszcze żadnej sesji',
  'history.sessions.hint': 'Sesja zapisuje się po zatrzymaniu pomiaru.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'zakres: {range}',
  'history.session.noMeasure': 'brak pomiaru',

  'history.data.title': 'Dane',
  'history.data.subtitle': 'Historia jest zapisana wyłącznie na tym urządzeniu.',
  'history.export.csv': 'Eksportuj CSV',
  'history.export.json': 'Eksportuj JSON',
  'history.export.ok': 'Plik przygotowany do zapisu',
  'history.export.fail': 'Nie udało się przygotować pliku. W trybie prywatnym i w oknie osadzonym w innej aplikacji przeglądarka blokuje zapis — otwórz stronę w zwykłej karcie.',
  'history.export.sheet.title': 'Eksport historii',
  'history.export.sheet.text': 'CSV otwiera się w arkuszu kalkulacyjnym (średnik, przecinek dziesiętny). JSON zachowuje wszystko, łącznie z listą sesji i brakami pomiaru.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Wyczyść historię',
  'history.clear.title': 'Wyczyścić historię?',
  'history.clear.text': 'Usuniemy {points} i {sessions}. Tego nie da się cofnąć — jeśli chcesz zachować dane, najpierw je wyeksportuj.',
  'history.clear.confirm': 'Wyczyść',
  'history.clear.announce': 'Historia wyczyszczona.',
  'history.clear.toast': 'Historia wyczyszczona',

  'history.empty.title': 'Nie ma jeszcze czego pokazać',
  'history.empty.text': 'Historia zapełnia się w trakcie pomiaru — jeden punkt na sekundę. Wszystko zostaje na tym urządzeniu.',
  'history.empty.action': 'Przejdź do pomiaru',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 min',
  'range.5m': '5 min',
  'range.1h': '1 godz.',
  'range.24h': '24 godz.',
  'range.7d': '7 dni',
  'range.30d': '30 dni',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Data i godzina',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'Pamięć urządzenia jest pełna — nowe pomiary nie są już zapisywane.',
  'storage.blocked': 'Przeglądarka nie pozwala zapisać historii — dane znikną po zamknięciu karty.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Narzędzia',
  'tools.action.about': 'O pomiarze',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Język',
  'tools.language.subtitle': 'Domyślnie aplikacja idzie za językiem urządzenia; wybór z tej listy działa od razu i zostaje w tej przeglądarce.',
  'tools.language.aria': 'Język interfejsu',
  'tools.language.system': 'Auto',
  'tools.language.announce': 'Język interfejsu: {language}.',

  'tools.appearance.title': 'Wygląd',
  'tools.appearance.theme.title': 'Motyw',
  'tools.appearance.theme.desc': '„Auto” idzie za ustawieniem systemu.',
  'tools.appearance.theme.aria': 'Motyw',
  'tools.theme.system': 'Auto',
  'tools.theme.light': 'Jasny',
  'tools.theme.dark': 'Ciemny',
  'tools.appearance.accent.title': 'Kolor akcentu',
  'tools.appearance.accent.desc': 'Barwa przycisków, zaznaczeń i suwaków.',
  'tools.appearance.accent.aria': 'Kolor akcentu',
  'tools.appearance.textScale.title': 'Wielkość tekstu',
  'tools.appearance.textScale.desc': 'Powiększa cały interfejs, nie tylko opisy.',
  'tools.appearance.textScale.aria': 'Wielkość tekstu',
  'tools.appearance.density.title': 'Gęstość',
  'tools.appearance.density.desc': 'Zwarta mieści więcej treści na jednym ekranie.',
  'tools.appearance.density.aria': 'Gęstość układu',
  'tools.density.comfortable': 'Zwykła',
  'tools.density.compact': 'Zwarta',
  'tools.appearance.motion.title': 'Mniej ruchu',
  'tools.appearance.motion.desc': 'Wyłącza animacje i płynne dobieganie wskazówki. Niezależnie od tego respektujemy ustawienie systemowe.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Ocean',
  'accent.violet': 'Fiolet',
  'accent.amber': 'Bursztyn',
  'accent.mint': 'Mięta',
  'accent.rose': 'Róża',

  'tools.thresholds.title': 'Progi',
  'tools.thresholds.subtitle': 'Od jakiej wartości aplikacja ma mówić „umiarkowanie”, a od jakiej „szkodliwie”. Progi domyślne są naszą propozycją, nie normą — ustaw je pod siebie.',
  'tools.thresholds.warn': 'Próg ostrzeżenia',
  'tools.thresholds.crit': 'Próg alarmu',
  'tools.thresholds.warn.aria': 'Próg ostrzeżenia — {metric}',
  'tools.thresholds.crit.aria': 'Próg alarmu — {metric}',
  'tools.thresholds.reset': 'Domyślne',
  'tools.thresholds.reset.aria': 'Przywróć domyślne progi: {metric}',
  'tools.thresholds.moved': '{threshold} przesunięty na {value}.',
  'tools.thresholds.resetAll': 'Przywróć wszystkie progi',
  'tools.thresholds.resetAll.title': 'Przywrócić domyślne progi?',
  'tools.thresholds.resetAll.text': 'Wszystkie siedem wielkości wróci do progów zaproponowanych w aplikacji. Historia pomiarów zostaje nietknięta.',
  'tools.thresholds.resetAll.confirm': 'Przywróć',
  'tools.thresholds.resetAll.cancel': 'Zostaw',
  'tools.thresholds.resetAll.toast': 'Progi wróciły do domyślnych',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'powyżej {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} i mniej',
  'tools.zoneRange.goodBelow': 'poniżej {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} i więcej',

  'tools.calibration.title': 'Kalibracja',
  'tools.calibration.subtitle': 'Dla tych, którzy mają z czym porównać.',
  'tools.calibration.intro': 'Dwa telefony skierowane na tę samą lampę pokażą trochę inne liczby — każdy czujnik ma własne zabarwienie. Jeśli masz pod ręką pomiar, któremu ufasz, możesz tu delikatnie podbić albo przyciszyć poszczególne kanały obrazu. Mnożniki działają zanim policzymy cokolwiek, więc zmieniają wszystkie siedem wielkości naraz.',
  'tools.calibration.neutral': 'Nie masz z czym porównać? Zostaw 1,00 — to ustawienie fabryczne i niczego nie psuje.',
  'tools.calibration.forward': 'Zmiana działa od teraz. Pomiary zapisane wcześniej w historii zostają takie, jakie były w chwili zapisu — nie przeliczamy ich wstecz, bo to podmieniałoby dane po fakcie.',
  'tools.calibration.reset': 'Wyzeruj kalibrację',
  'tools.calibration.reset.toast': 'Kalibracja wyzerowana',
  'tools.calibration.channel.r': 'Kanał czerwony',
  'tools.calibration.channel.g': 'Kanał zielony',
  'tools.calibration.channel.b': 'Kanał niebieski',
  'tools.calibration.channel.aria': '{channel} — mnożnik kalibracji',
  'tools.calibration.gain': '{value} ×',

  'tools.measurement.title': 'Pomiar',
  'tools.measurement.wake.title': 'Nie wygaszaj ekranu',
  'tools.measurement.wake.desc': 'Podczas pomiaru ekran zostaje włączony. Bateria schodzi wtedy szybciej.',
  'tools.measurement.wake.unsupported': 'Ta przeglądarka nie pozwala zatrzymać wygaszania ekranu.',
  'tools.measurement.haptics.title': 'Wibracja',
  'tools.measurement.haptics.desc': 'Krótkie potwierdzenie przy starcie, zatrzymaniu i zmianie wielkości.',
  'tools.measurement.haptics.unsupported': 'To urządzenie nie zgłasza silniczka wibracji.',

  'tools.about.title': 'O pomiarze',
  'tools.about.subtitle': 'Co dokładnie liczy każda z siedmiu wielkości i gdzie kończy się rzetelność tej metody.',
  'tools.about.scale': 'Skala: od {min} do {max}.',
  'tools.about.threshold': 'Ostrzegamy od {warn}, alarmujemy od {crit}.',
  'tools.about.thresholdInvert': 'Ostrzegamy poniżej {warn}, alarmujemy poniżej {crit}.',
  'tools.about.limitsHead': 'Czego ten pomiar nie potrafi',
  'tools.about.limit.spectrum.title': 'Kamera nie widzi barw tak jak przyrząd pomiarowy',
  'tools.about.limit.spectrum.text': 'Aparat w telefonie ma trzy kanały: czerwony, zielony i niebieski. Przyrząd do pomiaru światła rozkłada je na dziesiątki wąskich pasm. To, co tu widzisz, jest wyliczone z tych trzech liczb — rozsądnym sposobem, ale to nadal przeliczenie, a nie zmierzone widmo.',
  'tools.about.limit.exposure.title': 'Aparat sam sobie reguluje jasność',
  'tools.about.limit.exposure.text': 'Kiedy skierujesz telefon na okno, kamera przyciemnia obraz, żeby go nie prześwietlić. „Jasność sceny” wtedy spada, choć w pokoju nic się nie zmieniło. Dlatego porównuj tę wartość w obrębie jednego ujęcia, a nie między pomieszczeniami.',
  'tools.about.limit.flicker.title': 'Szybkiego migotania wolna kamera nie złapie',
  'tools.about.limit.flicker.text': 'Sprawdzamy obraz {hz} razy na sekundę. Pulsowanie szybsze niż {nyquist} razy na sekundę potrafi się w takim pomiarze pokazać jako wolniejsze, niż jest naprawdę, albo zniknąć zupełnie — a migotanie z sieci elektrycznej jest właśnie takie. Jeśli aplikacja coś wyłapie, traktuj to jako sygnał „tu coś pulsuje”, a nie jako zmierzoną częstotliwość.',
  'tools.about.limit.medical.title': 'To nie jest badanie ani porada lekarska',
  'tools.about.limit.medical.text': 'Aplikacja pomaga zauważyć, że światło wokół jest chłodne, jasne albo niespokojne, i podpowiada, co da się z tym zrobić. Nie orzeka o zdrowiu i nie zastępuje rozmowy z lekarzem ani pomiaru profesjonalnym miernikiem.',
  'tools.about.privacy': 'Wszystko liczy się na Twoim urządzeniu. Obraz z kamery nigdzie nie jest wysyłany ani zapisywany — do pamięci trafiają wyłącznie policzone liczby.',

  'tools.data.title': 'Dane',
  'tools.data.subtitle': 'Wszystko leży w pamięci tej przeglądarki i nigdzie stąd nie wychodzi.',
  'tools.data.summary.empty': 'Nie ma jeszcze żadnych zapisanych pomiarów.',
  'tools.data.summary': 'W pamięci: {points} i {sessions}.',
  'tools.data.export.csv': 'Eksportuj CSV',
  'tools.data.export.json': 'Eksportuj JSON',
  'tools.data.clear': 'Wyczyść historię',
  'tools.data.reset': 'Ustawienia domyślne',
  'tools.data.reset.title': 'Przywrócić ustawienia domyślne?',
  'tools.data.reset.text': 'Wygląd, progi, kalibracja i ustawienia pomiaru wrócą do stanu początkowego. Historia pomiarów zostaje nietknięta.',
  'tools.data.reset.confirm': 'Przywróć',
  'tools.data.reset.toast': 'Przywrócono ustawienia domyślne',
  'tools.data.wipe': 'Usuń wszystkie dane',
  'tools.data.wipe.title': 'Usunąć wszystkie dane aplikacji?',
  'tools.data.wipe.text': 'Znikną: cała historia pomiarów i lista sesji, Twoje progi i kalibracja oraz ustawienia wyglądu. Aplikacja wróci do stanu z pierwszego uruchomienia.',
  'tools.data.wipe.note': 'Nie mamy kopii tych danych — nigdy nie opuściły tego urządzenia, więc nie ma ich skąd przywrócić.',
  'tools.data.wipe.check': 'Rozumiem, że tego nie da się cofnąć',
  'tools.data.wipe.confirm': 'Usuń wszystko',
  'tools.data.wipe.toast': 'Usunięto wszystkie dane aplikacji',
  'tools.data.wipe.announce': 'Usunięto wszystkie dane aplikacji. Ustawienia wróciły do domyślnych.',
  'tools.data.storage.blocked': 'Ta przeglądarka nie pozwala nic zapisać na stałe (tryb prywatny albo zablokowane dane witryn). Wszystko, co tu ustawisz, zniknie po zamknięciu karty.',
  'tools.data.storage.full': 'Pamięć przeglądarki się zapełniła i nowe pomiary nie są już zapisywane. Wyczyszczenie historii zwolni miejsce.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Wsparcie',
  'support.free.title': 'Wszystko jest dostępne',
  'support.free.lead': 'Wszystkie siedem wielkości, pełna historia, progi, kalibracja i eksport działają od pierwszego uruchomienia — bez konta, bez limitów i bez opłat.',
  'support.free.note': 'Pomiar liczy się w całości na tym urządzeniu i działa bez sieci. Nie ma tu wersji lepszej, którą trzymalibyśmy za ścianą.',
  'support.why.title': 'Dlaczego o to proszę',
  'support.why.lead': 'Monitor Światła powstaje po godzinach i nie ma za sobą ani reklam, ani sponsora, ani firmy. Wsparcie pokrywa czas na poprawki, nowe wielkości i utrzymanie tego, co już działa.',
  'support.what.title': 'Co daje darowizna',
  'support.what.lead': 'Nic. Darowizna niczego nie odblokowuje — żadnej dodatkowej funkcji, żadnego znaczka przy nazwie, żadnego pierwszeństwa. Wszystko, co aplikacja potrafi, masz już teraz.',
  'support.what.note': 'Zostaje tylko tyle, że wiem, że to komuś się przydało. To naprawdę wystarczający powód.',
  'support.cta.title': 'Jeśli chcesz pomóc',
  'support.cta.button': 'Postaw mi kawę',
  'support.cta.nolink': 'Profil darowizn nie jest jeszcze podłączony. Gdy się pojawi, stanie w tym miejscu przycisk.',
  'support.cta.privacy': 'Ten odnośnik otwiera w nowej karcie zewnętrzną stronę Buy Me a Coffee. To jedyny moment, w którym cokolwiek opuszcza to urządzenie — sam pomiar zostaje tutaj zawsze.',
  'support.cta.privacyFuture': 'Kiedy adres się pojawi, przycisk otworzy w nowej karcie zewnętrzną stronę Buy Me a Coffee. Będzie to jedyny moment, w którym cokolwiek opuszcza to urządzenie — sam pomiar zostaje tutaj zawsze.',
  'support.cta.note': 'Nie ma tu ani odliczania, ani przypomnień, ani okna, które samo się otworzy. Ta prośba czeka wyłącznie na tej zakładce.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'ostatnia minuta',
  'gauge.aria': '{metric}: {value}, strefa: {zone}',
  'gauge.aria.note': '{metric}: {value}, strefa: {zone}, {note}',
  'gauge.aria.initial': '{metric}: brak danych',
  'gauge.value.none': 'brak danych',
  /* Odczyt słowny z jednostką: „27 procent”, „1,20 razy”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'wartość przybliżona',
  'gauge.note.offScale': 'poza skalą',
  'gauge.metric.unknown': 'Nieznana wielkość',

  'chart.aria.label': 'Wykres historii pomiarów',
  'chart.hint': 'Wykres interaktywny. Strzałki w lewo i w prawo przesuwają kursor odczytu, Home i End przechodzą na początek i koniec zakresu, Escape ukrywa kursor.',
  'chart.empty.title': 'Brak danych',
  'chart.empty.text': 'Uruchom pomiar — wykres pojawi się po pierwszych odczytach.',
  'chart.few.title': 'Za mało danych',
  'chart.few.text': 'Mamy jeden odczyt: {value}. Linię rysujemy od dwóch.',
  'chart.legend.line': 'pomiar',
  'chart.legend.gap': 'przerwa w pomiarze',
  'chart.aria.head': 'Wykres: {metric}, zakres {range}',
  'chart.aria.empty': 'Brak danych w tym zakresie.',
  'chart.aria.one': 'Jeden odczyt: {value}.',
  'chart.aria.summary': 'Od {min} do {max}, średnia {avg}, {points}.',
  'chart.aria.gaps': 'W szeregu są przerwy — wtedy nie mierzyliśmy.',
  'chart.readout.empty': 'Brak danych w tym zakresie.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'Za mało danych, aby narysować wykres.',
  'chart.readout.hint': 'Przeciągnij po wykresie albo użyj strzałek, aby odczytać pojedynczy pomiar.',
  'chart.time.now': 'teraz',
  'chart.time.justNow': 'przed chwilą',
  'chart.time.ago': '{duration} temu',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} \u00B7 {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku. */
  'chart.sample.ago': '−30\u00A0min',
  'chart.sample.clock': '00:00',
  'chart.sample.date': '30\u00A0sie',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Teksty przeniesione co do znaku z docs/lib/catalogue.js (namePL, shortPL,
     helpPL). Biblioteki nie ruszamy — v5 czyta te opisy stąd, a z katalogu
     bierze już tylko liczby: jednostkę, zakres, progi i miejsca po przecinku. */
  'metric.share.name': 'Udział niebieskiego',
  'metric.share.short': 'Ile z widzianego światła przypada na kanał niebieski.',
  'metric.share.help': 'Izoluje barwę od jasności — to ta wartość zmienia się, gdy włączysz tryb nocny.',
  'metric.brightness.name': 'Jasność sceny',
  'metric.brightness.short': 'Średnia jasność obrazu z kamery.',
  'metric.brightness.help': 'Wartość względna, nie luksy — automatyka ekspozycji kamery przesuwa ją pod spodem.',
  'metric.kelvin.name': 'Temperatura barwowa',
  'metric.kelvin.short': 'Czy światło jest ciepłe, czy chłodne.',
  'metric.kelvin.help': 'Poniżej 3000 K światło jest ciepłe i wieczorem łagodniejsze. 6500 K to domyślna biel większości ekranów.',
  'metric.melanopic.name': 'Wpływ na rytm dobowy',
  'metric.melanopic.short': 'Jak mocno to światło działa na zegar biologiczny.',
  'metric.melanopic.help': 'Przybliżenie współczynnika melanopicznego. 1,00 to neutralna biel dzienna; wieczorem warto schodzić poniżej 0,50.',
  'metric.flicker.name': 'Migotanie',
  'metric.flicker.short': 'Niewidoczne pulsowanie źródła światła.',
  'metric.flicker.help': 'Tanie ściemniacze i podświetlenia pulsują. Oko tego nie widzi, ale bywa to przyczyną zmęczenia i bólu głowy.',
  'metric.uniformity.name': 'Równomierność',
  'metric.uniformity.short': 'Czy światło rozkłada się równo w kadrze.',
  'metric.uniformity.help': 'Niska wartość na ekranie oznacza przeświecanie podświetlenia lub odbicie; na biurku — źle ustawioną lampę.',
  'metric.comfort.name': 'Komfort wzrokowy',
  'metric.comfort.short': 'Jedna ocena zamiast sześciu liczb.',
  'metric.comfort.help': 'Składa pozostałe pomiary w wynik 0–100 i pokazuje, co najbardziej go obniża. Wagi są naszą oceną redakcyjną, nie normą.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'bezpiecznie',
  'zone.warn': 'umiarkowanie',
  'zone.crit': 'szkodliwie',
  'zone.none': 'brak danych',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 sie'). */
  'date.month.short.1': 'sty',
  'date.month.short.2': 'lut',
  'date.month.short.3': 'mar',
  'date.month.short.4': 'kwi',
  'date.month.short.5': 'maj',
  'date.month.short.6': 'cze',
  'date.month.short.7': 'lip',
  'date.month.short.8': 'sie',
  'date.month.short.9': 'wrz',
  'date.month.short.10': 'paź',
  'date.month.short.11': 'lis',
  'date.month.short.12': 'gru',

  'date.clock': '{hours}:{minutes}',
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0{year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0godz.',
  'time.duration.hourMinute': '{hours}\u00A0godz. {minutes}\u00A0min',
  'time.duration.hour': '{hours}\u00A0godz.',
  'time.duration.minuteSecond': '{minutes}\u00A0min {seconds}\u00A0s',
  'time.duration.minute': '{minutes}\u00A0min',
  'time.duration.second': '{seconds}\u00A0s',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „przed chwilą”. */
  'time.justNow': 'przed chwilą',
  'time.aMinuteAgo': 'minutę temu',
  'time.minutesAgo': '{minutes}\u00A0min temu',
  'time.hoursAgo': '{hours}\u00A0godz. temu',
  'time.yesterday': 'wczoraj',
  'time.daysAgo': '{days}\u00A0dni temu',

  /* Formy zależne od liczby. Rozstrzyga je Intl.PluralRules dla języka
     aktywnego; `other` jest tu równy `many`, bo tak klasyfikowała ułamki
     dotychczasowa funkcja format.plural(). */
  'time.days.plural': { one: 'dzień', few: 'dni', many: 'dni', other: 'dni' },
  'unit.sample.plural': { one: 'próbka', few: 'próbki', many: 'próbek', other: 'próbek' },
  'unit.measurement.plural': { one: 'pomiar', few: 'pomiary', many: 'pomiarów', other: 'pomiarów' },
  /* Mianownik („3 sesje, od najnowszej”) i biernik („Usuniemy 3 sesje”) mają
     w polskim inną formę pojedynczą — stąd dwa klucze, a nie jeden. */
  'unit.session.plural': { one: 'sesja', few: 'sesje', many: 'sesji', other: 'sesji' },
  'unit.session.accusative.plural': { one: 'sesję', few: 'sesje', many: 'sesji', other: 'sesji' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy, choć po polsku brzmią tak samo — w innych językach już nie. */
  'unit.chartPoint.plural': { one: 'punkt', few: 'punkty', many: 'punktów', other: 'punktów' },
  'unit.point.plural': { one: 'punkt', few: 'punkty', many: 'punktów', other: 'punktów' },
  'unit.kelvin.plural': { one: 'kelwin', few: 'kelwiny', many: 'kelwinów', other: 'kelwinów' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „procent”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'procent',
  'unit.spoken.times': 'razy',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'Brak zgody na dostęp do kamery. Zezwól na kamerę w ustawieniach przeglądarki dla tej strony i spróbuj ponownie.',
  'camera.error.notfound': 'Nie znaleziono kamery. Sprawdź, czy urządzenie ma aparat i czy nie jest wyłączony w systemie.',
  'camera.error.inuse': 'Kamera jest zajęta przez inną aplikację. Zamknij tamtą aplikację lub zakładkę i spróbuj ponownie.',
  'camera.error.insecure': 'Kamera działa tylko przez HTTPS albo na localhost. Otwórz tę stronę pod adresem zaczynającym się od „https://”.',
  'camera.error.unsupported': 'Ta przeglądarka nie udostępnia tutaj kamery. Spróbuj w Chrome albo w Safari, w zwykłym oknie — nie w podglądzie wbudowanym w inną aplikację.',
  'camera.error.unknown': 'Nie udało się uruchomić kamery.'
};
