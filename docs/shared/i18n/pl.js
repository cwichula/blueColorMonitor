/* docs/shared/i18n/pl.js — słownik WSPÓLNY, polski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest polski.
 *
 * SKĄD TE ZDANIA: to nie są nowe tłumaczenia. Napisy przepisano bez zmian
 * z miejsc, w których stały do tej pory — Metrics.CATALOGUE (nazwy, opisy
 * i pomoc siedmiu wielkości), Scale.TEXT wersji v3 i v4 (strefy, zdania
 * oceniające, granice metody) oraz UI.T wersji v4 (prywatność). Polszczyzna
 * tej aplikacji była pisana z rozmysłem i zmiana jej brzmienia przy okazji
 * wprowadzania trzydziestu języków byłaby zmianą przemyconą.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w en.js — i tak ma zostać
 * w każdym z trzydziestu języków (patrz docs/shared/README.md, rozdział
 * „Warstwa językowa”). Klucza, którego nie ma w angielskim, nie wolno tu
 * dopisać: angielski jest wartością zapasową, więc to on wyznacza zestaw.
 */
window.I18nData = window.I18nData || {};
window.I18nData['pl'] = Object.assign(window.I18nData['pl'] || {}, {

  /* Nazwa własna — nie tłumaczy się jej, ale wchodzi jako wstawka w zdanie
     o rozporządzeniu (UE) 2017/745, gdzie stoi w mianowniku. */
  'app.name': 'Monitor Światła',

  /* ---- wybór języka ---- */

  'language.label': 'Język',
  'language.help': 'Język całej aplikacji. Wszystkie języki są już na tym urządzeniu — nic się nie pobiera i nic nie jest nigdzie wysyłane.',
  'language.auto': 'Zgodnie z urządzeniem',
  'language.autoHint': 'Zgodnie z językiem ustawionym w telefonie albo w przeglądarce.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Udział niebieskiego',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'procent',
  'metric.share.short': 'Ile z widzianego światła przypada na kanał niebieski.',
  'metric.share.help': 'Izoluje barwę od jasności — to ta wartość zmienia się, gdy włączysz tryb nocny.',

  'metric.brightness.name': 'Jasność sceny',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'procent',
  'metric.brightness.short': 'Średnia jasność obrazu z kamery.',
  'metric.brightness.help': 'Wartość względna, nie luksy — automatyka ekspozycji kamery przesuwa ją pod spodem.',

  'metric.kelvin.name': 'Temperatura barwowa',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'kelwinów',
  'metric.kelvin.short': 'Czy światło jest ciepłe, czy chłodne.',
  'metric.kelvin.help': 'Poniżej 3000 K światło jest ciepłe i wieczorem łagodniejsze. 6500 K to domyślna biel większości ekranów.',

  'metric.melanopic.name': 'Wpływ na rytm dobowy',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'razy',
  'metric.melanopic.short': 'Jak mocno to światło działa na zegar biologiczny.',
  'metric.melanopic.help': 'Przybliżenie współczynnika melanopicznego. 1,00 to neutralna biel dzienna; wieczorem warto schodzić poniżej 0,50.',

  'metric.flicker.name': 'Migotanie',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'procent',
  'metric.flicker.short': 'Niewidoczne pulsowanie źródła światła.',
  'metric.flicker.help': 'Tanie ściemniacze i podświetlenia pulsują. Oko tego nie widzi, ale bywa to przyczyną zmęczenia i bólu głowy.',

  'metric.uniformity.name': 'Równomierność',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'procent',
  'metric.uniformity.short': 'Czy światło rozkłada się równo w kadrze.',
  'metric.uniformity.help': 'Niska wartość na ekranie oznacza przeświecanie podświetlenia lub odbicie; na biurku — źle ustawioną lampę.',

  'metric.comfort.name': 'Komfort wzrokowy',
  'metric.comfort.unit': 'pkt',
  'metric.comfort.unitSpoken': 'punktów',
  'metric.comfort.short': 'Jedna ocena zamiast sześciu liczb.',
  'metric.comfort.help': 'Składa pozostałe pomiary w wynik 0–100 i pokazuje, co najbardziej go obniża. Wagi są naszą oceną redakcyjną, nie normą.',

  'comfort.penalty.melanopic': 'Wpływ na rytm dobowy',
  'comfort.penalty.kelvin': 'Chłodna barwa światła',
  'comfort.penalty.flicker': 'Migotanie',
  'comfort.penalty.uniformity': 'Nierównomierne oświetlenie',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': 'Naciśnij „Start”, aby uruchomić kamerę.',
  'engine.starting': 'Uruchamiam kamerę…',

  'engine.error.permission': 'Brak zgody na dostęp do kamery. Zezwól na kamerę w ustawieniach przeglądarki i naciśnij „Start” ponownie.',
  'engine.error.notFound': 'Nie znaleziono kamery. Sprawdź, czy urządzenie ma aparat i czy nie jest wyłączony w systemie.',
  'engine.error.busy': 'Kamera jest zajęta przez inną aplikację. Zamknij ją i spróbuj ponownie.',
  'engine.error.unknown': 'Nie udało się uruchomić kamery.',
  'engine.error.unsupported': 'Ta przeglądarka nie udostępnia kamery na tej stronie. Otwórz aplikację przez HTTPS albo użyj innej przeglądarki.',

  /* ---- strefy ---- */

  'zone.good': 'W normie',
  'zone.warning': 'Uwaga',
  'zone.critical': 'Krytycznie',
  'zone.none': 'Brak danych',
  'zone.settling': 'Ustalam',

  'zone.spoken.good': 'w normie',
  'zone.spoken.warning': 'uwaga',
  'zone.spoken.critical': 'krytycznie',
  'zone.spoken.none': 'brak danych',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'pkt',
  'unit.hertz': 'Hz',
  'unit.second': 's',
  'unit.minute': 'min',
  'unit.hour': 'godz.',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'To światło jest w porządku — nic nie przekracza ustawionych progów.',
  'verdict.noValue': 'Ta wielkość nie daje się teraz zmierzyć. Sprawdź, czy obiektyw nie jest zasłonięty.',
  'verdict.warmup': 'Ustalam ocenę — trzymaj telefon nieruchomo jeszcze chwilę.',

  'verdict.warning.share': 'Sporo tego światła przypada na kanał niebieski. Wieczorem warto je przyciemnić.',
  'verdict.warning.brightness': 'Scena jest jasna — kamera pracuje blisko górnej granicy pomiaru.',
  'verdict.warning.kelvin': 'Światło jest dość chłodne. Wieczorem łagodniejsza bywa żarówka około 2700 K.',
  'verdict.warning.melanopic': 'To światło dość mocno działa na zegar biologiczny.',
  'verdict.warning.flicker': 'Źródło światła wyraźnie pulsuje.',
  'verdict.warning.uniformity': 'Światło rozkłada się nierówno w kadrze.',
  'verdict.warning.comfort': 'Komfort wzrokowy jest obniżony — złożyło się na to kilka rzeczy naraz.',

  'verdict.critical.share': 'Bardzo dużo niebieskiego. Wieczorem włącz tryb nocny albo zmień źródło światła.',
  'verdict.critical.brightness': 'Scena jest bardzo jasna. Nie mierz, patrząc prosto w źródło światła.',
  'verdict.critical.kelvin': 'Światło jest zimne. Wieczorem to najbardziej męczy oczy — cieplejsza żarówka albo tryb nocny pomogą.',
  'verdict.critical.melanopic': 'To światło mocno działa na zegar biologiczny. Wieczorem warto zejść poniżej 0,50.',
  'verdict.critical.flicker': 'Źródło światła mocno pulsuje. To bywa przyczyną zmęczenia oczu i bólu głowy.',
  'verdict.critical.uniformity': 'Światło rozkłada się bardzo nierówno. Sprawdź ustawienie lampy albo odbicia na ekranie.',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'Komfort wzrokowy jest niski. Zajrzyj do rozpisania oceny, żeby zobaczyć, co ją obniża.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'Czego ta liczba nie mówi',
  'note.warningTitle': 'Uwaga',
  'note.dashTitle': 'Czym ten pomiar nie jest',
  'note.dashText': 'Aparat telefonu ma trzy szerokie kanały barwne i automatyczny balans bieli — nie mierzy widma. Temperatura barwowa i wpływ na rytm dobowy są przybliżeniami wyliczonymi z barw sRGB. Aplikacja dobrze pokazuje różnice i zmiany w czasie, nie zastępuje miernika i nie stawia żadnej diagnozy.',
  'note.approxLegend': '≈ wartość przybliżona — wyliczona z barw sRGB, nie z pomiaru widma.',
  'note.kelvinOutOfRange': 'Poza zakresem metody — przy tej barwie wzór na temperaturę barwową przestaje być wiarygodny.',
  'note.flickerOutOfRange': 'Poza zakresem metody — próbkowanie {rate} Hz widzi pulsowanie tylko poniżej {limit} Hz. Sieciowe 100 Hz jest poza zasięgiem i aplikacja nigdy nie poda go jako wyniku.',
  'note.helpTitle': 'Czego ta liczba nie mówi',
  'note.helpText': 'Aparat telefonu ma trzy szerokie kanały i nie mierzy widma. Ta wartość jest wskaźnikiem porównawczym — dobrze pokazuje różnice między światłami i zmiany w czasie, a nie wynikiem pomiaru laboratoryjnego ani informacją medyczną.',
  'note.calibration': 'Pomiar bez kalibracji — wartości traktuj porównawczo.',

  'note.howToTitle': 'Jak mierzyć sensownie',
  'note.howTo.hold.title': 'Trzymaj telefon nieruchomo',
  'note.howTo.hold.text': 'Automatyka ekspozycji potrzebuje 2–3 sekund, żeby się ustabilizować.',
  'note.howTo.aim.title': 'Kieruj na oświetloną powierzchnię',
  'note.howTo.aim.text': 'Biała kartka albo jasna ściana. Nie mierz, patrząc prosto w źródło światła.',
  'note.howTo.compare.title': 'Porównuj, nie oceniaj bezwzględnie',
  'note.howTo.compare.text': 'Ta sama scena przed zmianą i po zmianie oświetlenia mówi więcej niż jedna liczba.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest przepisane co do słowa z dotychczasowej redakcji. To
     sformułowanie, przy którym rozporządzenie (UE) 2017/745 uznaje
     przeznaczenie medyczne za wykluczone — nie skraca się go dla stylu. */

  'legal.noDiagnosis': 'Żaden wynik nie jest diagnozą ani poradą zdrowotną.',
  'legal.mdr': '{app} nie jest wyrobem medycznym w rozumieniu rozporządzenia (UE) 2017/745, nie służy do diagnozowania, zapobiegania, monitorowania ani leczenia jakiegokolwiek stanu chorobowego i nie zastępuje badania u lekarza ani optometrysty.',

  /* ---- prywatność ---- */

  'privacy.title': 'Co opuszcza to urządzenie',
  'privacy.short': 'Nic w tej aplikacji nie wysyła niczego do sieci. Wszystkie liczby powstają na tym urządzeniu i tu zostają.',
  'privacy.onDevice': 'Kamera włączy się dopiero po naciśnięciu przycisku, a obraz nigdy nie opuszcza tego urządzenia.',
  'privacy.external': 'To jedyne miejsce w całej aplikacji, w którym cokolwiek opuszcza to urządzenie: przycisk otwiera stronę zewnętrzną w nowej karcie i dzieje się to dopiero po jego naciśnięciu. Pomiar, historia i ustawienia zostają tutaj.',
  'privacy.externalPending': 'Kiedy adres się pojawi, przycisk otworzy stronę zewnętrzną w nowej karcie. Będzie to jedyny moment, w którym cokolwiek opuszcza to urządzenie. Pomiar, historia i ustawienia zostają tutaj.',
  'privacy.storageBlocked': 'Ta przeglądarka nie pozwala nic zapisać (tryb prywatny albo zablokowane dane witryn). Pomiar działa, ale historia zniknie po zamknięciu karty.',

  /* ---- liczebniki ----
     Polski ma cztery kategorie CLDR: one (1), few (2–4, ale nie 12–14),
     many (0, 5–21, …) i other — ta ostatnia dotyczy ułamków: „1,5 odczytu”.
     Formę wybiera Intl.PluralRules('pl'), nie nasza reguła. */

  'count.readings': { one: '{n} odczyt', few: '{n} odczyty', many: '{n} odczytów', other: '{n} odczytu' },
  'count.sessions': { one: '{n} pomiar', few: '{n} pomiary', many: '{n} pomiarów', other: '{n} pomiaru' },
  'count.seconds': { one: '{n} sekunda', few: '{n} sekundy', many: '{n} sekund', other: '{n} sekundy' },
  'count.minutes': { one: '{n} minuta', few: '{n} minuty', many: '{n} minut', other: '{n} minuty' },
  'count.hours': { one: '{n} godzina', few: '{n} godziny', many: '{n} godzin', other: '{n} godziny' },
  'count.days': { one: '{n} dzień', few: '{n} dni', many: '{n} dni', other: '{n} dnia' }
});
