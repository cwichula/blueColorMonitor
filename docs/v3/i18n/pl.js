/* docs/v3/i18n/pl.js — słownik WŁASNY wersji v3, polski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/pl.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * SKĄD TE ZDANIA: to nie są nowe tłumaczenia. Cała zawartość jest przepisana
 * CO DO ZNAKU z miejsc, w których polszczyzna v3 stała do tej pory:
 * Scale.TEXT w docs/v3/scale.js (rozdział 8 DESIGN.md), S.TEXT.docs
 * i dopiski do S.TEXT.settings z docs/v3/docs.js, S.TEXT.support
 * z docs/v3/support.js oraz literały zapasowe z docs/v3/boot.js.
 *
 * CZEGO TU NIE MA — i dlaczego: kluczy, które stoją już w słowniku wspólnym
 * (docs/shared/i18n/pl.js) z DOKŁADNIE tym samym zdaniem. Nazwy stref, zdania
 * oceniające, noty o granicach metody, nazwy i opisy siedmiu wielkości oraz
 * zastrzeżenie medyczne są wspólne dla wersji i tłumaczy się je RAZ. Kształt
 * obiektu Scale.TEXT wskazuje na nie wprost — mapa „gałąź Scale.TEXT → klucz”
 * leży w docs/v3/scale.js i to ona jest miejscem, w którym widać oba źródła
 * naraz.
 *
 * ZESTAW KLUCZY wyznaczy docs/v3/i18n/en.js (etap 4): angielski jest wartością
 * zapasową, więc to on jest miarą kompletności. Klucza, którego tam nie będzie,
 * nie wolno tu dopisywać.
 */
window.I18nData = window.I18nData || {};
window.I18nData['pl'] = Object.assign(window.I18nData['pl'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. */
  'app.wordmark': 'MONITOR ŚWIATŁA',

  'state.idle': 'Gotowy',
  'state.starting': 'Uruchamiam',
  'state.running': 'Pomiar',
  'state.runningTpl': 'Pomiar {time}',
  'state.stopped': 'Zatrzymany',
  'state.error': 'Błąd kamery',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5,0 po polsku, 5.0 po angielsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'Start pomiaru',
  'keys.starting': 'Uruchamiam…',
  'keys.stop': 'Stop',
  'keys.flip': 'Obróć',
  'keys.flipAria': 'Przełącz kamerę przód/tył',
  'keys.menu': 'Menu',
  'keys.menuAria': 'Spis modułów',
  'keys.back': '‹ Wróć',
  'keys.backAria': 'Wróć do pulpitu',
  'keys.dash': 'Pulpit',
  'keys.zoom': 'Powiększ podgląd',
  'keys.retry': 'Spróbuj ponownie',
  'keys.refresh': 'Odśwież',
  'keys.close': 'Zamknij',
  'keys.show': 'Pokaż',
  'keys.apply': 'Zastosuj',
  'keys.remove': 'Usuń',

  'monitor.legend': 'Podgląd kontrolny',
  'monitor.badge': 'Na żywo',

  'aim.title': 'Celowanie',
  'aim.hint': 'Ramka pokazuje dokładnie ten wycinek obrazu, który mierzy aplikacja.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'Kanał główny',
  'readout.thresholdTpl': '(próg {value})',
  'readout.contextTpl': 'min {min} · śr. {avg} · maks {max} — ostatnie 60 s',
  'readout.contextEmpty': 'brak danych z ostatnich 60 s',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'Co oznacza: {name}',
  'aria.channel': '{name}, {value}, {zone}. Pokaż na dużym wyświetlaczu.',
  'aria.channelStale': '{name}, brak danych. Pokaż na dużym wyświetlaczu.',
  'aria.scale': 'Skala: {name}, od {min} do {max}. Teraz {value}, {zone}. Próg uwagi {warn}, próg krytyczny {crit}.',
  'aria.readout': '{name}: {value}, {zone}.',
  'aria.readoutApprox': '{name}: około {value}, {zone}. Wartość przybliżona.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'Skala kanału głównego. Brak danych',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': 'Naciśnij „Start pomiaru”, skieruj telefon na oświetloną powierzchnię i trzymaj nieruchomo kilka sekund.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'Komfort wzrokowy jest niski. Zajrzyj do modułu 01, żeby zobaczyć, co go obniża.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'Zacznij od klawisza „Start pomiaru” na dole ekranu. Kamera włączy się dopiero po naciśnięciu.',
  'transient.measureStopped': 'Pomiar zakończony · {time} · zapisano w historii.',
  'transient.newVersion': 'Jest nowa wersja aplikacji.',
  'transient.thresholdsSaved': 'Zapisano progi.',
  'transient.thresholdsRejected': 'Nie zapisano — próg uwagi i próg krytyczny nie mogą się mijać.',
  'transient.historyCleared': 'Wyczyszczono historię.',

  'live.lead': 'Kanał główny: {name}, {value}, {zone}.',
  'live.ready': 'Ocena gotowa. {name} {value}, {zone}.',
  'live.started': 'Pomiar rozpoczęty.',
  'livebar.stopped': 'Pomiar zatrzymany',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'Nie ma jeszcze żadnych zapisów. Historia zapisuje się w trakcie pomiaru — uruchom pomiar na minutę i wróć tutaj.',
  'empty.recorderNoRange': 'W tym zakresie nie było pomiaru.',
  'empty.coverageTpl': 'Pomiar objął {done} z {total} godzin.',
  'empty.reportsNoData': 'Raport dobowy powstanie po pierwszym pełnym dniu z pomiarami.',
  'empty.compareOneSession': 'Do porównania potrzebne są dwie zakończone sesje. Masz na razie jedną.',
  'empty.exportNoData': 'Nie ma czego wyeksportować. Uruchom pomiar, żeby historia miała treść.',
  'empty.alertsOff': 'Alerty są wyłączone. Po włączeniu zadziałają tylko wtedy, gdy aplikacja jest otwarta.',
  'empty.scheduleEmpty': 'Nie ustawiono żadnej pory. Harmonogram działa tylko przy otwartej aplikacji.',
  'empty.historyEmpty': 'Historia jest pusta.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'Spis modułów',

  'modules.01.title': 'Rejestrator',
  'modules.01.desc': 'Przebieg pomiaru w czasie, od minuty do trzydziestu dni.',
  'modules.02.title': 'Progi',
  'modules.02.desc': 'Ustaw własne granice ostrzeżenia i alarmu dla każdej wielkości.',
  'modules.03.title': 'Kalibracja',
  'modules.03.desc': 'Odniesienie do znanego źródła światła i to, czego kalibracja nie naprawi.',
  'modules.04.title': 'Raporty',
  'modules.04.desc': 'Zestawienia dobowe i tygodniowe w formie wydruku.',
  'modules.05.title': 'Eksport',
  'modules.05.desc': 'Zapis odczytów do pliku CSV lub JSON z opisem kolumn.',
  'modules.06.title': 'Porównanie',
  'modules.06.desc': 'Dwie sesje obok siebie, z różnicą podaną liczbowo.',
  'modules.07.title': 'Test ekranu',
  'modules.07.desc': 'Plansze do sprawdzenia własnego monitora, krok po kroku.',
  'modules.08.title': 'Harmonogram',
  'modules.08.desc': 'Automatyczne pomiary o zadanych porach.',
  'modules.09.title': 'Alerty',
  'modules.09.desc': 'Powiadomienie po przekroczeniu progu — i kiedy ono nie zadziała.',
  'modules.10.title': 'Wsparcie',
  'modules.10.desc': 'Aplikacja jest w całości darmowa. Tu można postawić kawę autorowi.',
  'modules.11.title': 'Dokumentacja',
  'modules.11.desc': 'Czym ten pomiar jest, a czym na pewno nie jest.',
  'modules.12.title': 'Ustawienia',
  'modules.12.desc': 'Motyw, rozmiar tekstu, ograniczenie ruchu, czyszczenie historii.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'Kanały pomiarowe',
  'channels.pick': 'Pokaż na dużym wyświetlaczu',
  'channels.stale': 'brak danych',
  'channels.approx': 'wartość przybliżona',

  'help.unit': 'Jednostka',
  'help.range': 'Zakres',
  'help.thresholds': 'Progi',
  'help.warn': 'Próg uwagi',
  'help.crit': 'Próg krytyczny',
  'help.now': 'teraz',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „Wielkość” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'Wielkość',
  'col.unit': 'Jednostka',
  'col.range': 'Zakres',
  'col.direction': 'Kierunek',
  'col.time': 'Godzina',
  'col.date': 'Data',
  'col.zone': 'Strefa',
  'col.avg': 'Średnia',
  'col.min': 'Minimum',
  'col.max': 'Maksimum',
  'col.name': 'Kolumna',
  'col.meaning': 'Co zawiera',
  'col.channel': 'Kanał',
  'col.gain': 'Wzmocnienie',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'Zakres czasu',
  'recorder.range.60s': '60 s',
  'recorder.range.15min': '15 min',
  'recorder.range.1h': '1 godz',
  'recorder.range.24h': '24 godz',
  'recorder.range.30d': '30 dni',
  'recorder.gap': 'brak pomiaru',
  'recorder.sessionTitle': 'Statystyka sesji',
  'recorder.zonesCaption': 'Rozkład stref dla udziału niebieskiego',
  'recorder.tableCaption': 'Odczyty z wybranego zakresu',
  'recorder.crosshair': 'Krzyż odczytu',
  'recorder.prevAria': 'Wcześniejszy punkt',
  'recorder.nextAria': 'Późniejszy punkt',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'Wygląd',
  'settings.themeLabel': 'Motyw',
  'settings.themeSystem': 'Jak w systemie',
  'settings.themeLight': 'Jasny',
  'settings.themeDark': 'Ciemny',
  'settings.themeHint': 'Motyw „jak w systemie” zmienia się razem z ustawieniem telefonu.',
  'settings.textLabel': 'Rozmiar tekstu',
  /* Mnożnik jako LICZBA we wstawce — 1,15 po polsku, 1.15 po angielsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'Powiększa cały interfejs, nie tylko litery — klawisze i wiersze rosną razem z tekstem.',
  'settings.motionGroup': 'Ruch',
  'settings.motionLabel': 'Ogranicz ruch',
  'settings.motionHint': 'Wyłącza wszystkie przejścia. Wskazówka skali przeskakuje wtedy raz na sekundę zamiast płynąć.',
  'settings.dataTitle': 'Dane',
  'settings.clearLabel': 'Wyczyść historię',
  'settings.clearHintTpl': 'W historii jest teraz {count} zapisanych punktów.',
  'settings.clearHintEmpty': 'Historia jest pusta.',
  'settings.clearTitle': 'Wyczyścić historię?',
  'settings.clearConfirm': 'Wyczyścić całą historię pomiarów? Tego nie da się cofnąć.',
  'settings.clearKey': 'Wyczyść',
  'settings.aboutTitle': 'O aplikacji',
  'settings.versionTpl': '{app}, wersja {version}.',
  'settings.offlineText': 'Aplikacja działa bez sieci. Po pierwszym otwarciu wszystkie jej pliki leżą w pamięci przeglądarki, więc tryb samolotowy niczego nie zmienia. Nic nie jest wysyłane na żaden serwer, bo aplikacja nie wykonuje zapytań sieciowych.',
  'settings.docsKey': 'Otwórz dokumentację',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'Anuluj',
  'common.save': 'Zapisz',
  'common.reset': 'Przywróć domyślne',
  'common.yes': 'Tak',
  'common.no': 'Nie',
  'common.on': 'Włączone',
  'common.off': 'Wyłączone',
  'common.sep': ' · ',
  'common.stepsTitle': 'Krok po kroku',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'Po co własne progi',
  'modules.02.intro': 'Próg decyduje, kiedy aplikacja mówi „Uwaga”, a kiedy „Krytycznie”. Wartości domyślne są naszą oceną redakcyjną, nie normą — jeśli mierzysz w innych warunkach, przesuń je pod siebie. Ocena i zdanie na pulpicie liczą się od razu z nowych progów.',
  'modules.02.orderNormal': 'Próg uwagi musi leżeć poniżej krytycznego.',
  'modules.02.orderInvert': 'Tu wyższa wartość jest lepsza, więc próg uwagi leży powyżej krytycznego.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'Podgląd skali: {name}',
  'modules.02.nowTpl': 'teraz {value}',
  'modules.02.resetDone': 'Przywrócono progi domyślne.',
  'modules.02.profilesTitle': 'Profile',
  'modules.02.profilesHint': 'Profil to zapisany komplet progów wszystkich siedmiu wielkości. Zastosowanie profilu podmienia je naraz.',
  'modules.02.profileSaveKey': 'Zapisz bieżące progi',
  'modules.02.profileNameLabel': 'Nazwa nowego profilu',
  'modules.02.profileNameHint': 'Nazwa zostaje na tym urządzeniu. Maksymalnie 40 znaków.',
  'modules.02.profileNameEmpty': 'Podaj nazwę profilu.',
  'modules.02.profileSavedTpl': 'Zapisano profil „{name}”.',
  'modules.02.profileAppliedTpl': 'Zastosowano profil „{name}”.',
  'modules.02.profileRemovedTpl': 'Usunięto profil „{name}”.',
  'modules.02.profileFailed': 'Nie udało się zastosować tego profilu.',
  'modules.02.profileCustomTpl': 'Własny profil zapisany {date}.',
  'modules.02.builtin.default.name': 'Domyślny',
  'modules.02.builtin.default.desc': 'Progi z katalogu wielkości — punkt wyjścia dla wszystkich pomiarów.',
  'modules.02.builtin.evening.name': 'Wieczór — łagodny',
  'modules.02.builtin.evening.desc': 'Ostrzega wcześniej o chłodnej barwie i wpływie na rytm dobowy.',
  'modules.02.builtin.work.name': 'Praca przy biurku',
  'modules.02.builtin.work.desc': 'Dopuszcza jasne, chłodne światło dzienne; pilnuje migotania i równomierności.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'Dlaczego to działa',
  'modules.03.why': 'Matryca aparatu ma stały odchył między kanałami. Zmierzenie białej kartki pokazuje, jak duży on jest, i pozwala go odjąć. To jedyna funkcja w tej aplikacji, która realnie podnosi dokładność — i nadal nie zamienia aparatu w spektrometr.',
  'modules.03.steps.1': 'Połóż białą kartkę pod mierzonym światłem.',
  'modules.03.steps.2': 'Naciśnij „Start pomiaru” na pulpicie i wypełnij kadr kartką.',
  'modules.03.steps.3': 'Wróć tutaj, naciśnij „Kalibruj” i nie ruszaj telefonem przez trzy sekundy.',
  'modules.03.runKey': 'Kalibruj (3 s)',
  'modules.03.clearKey': 'Usuń kalibrację',
  'modules.03.busyTpl': 'Mierzę kartkę… zostało {sec} s',
  'modules.03.statusNone': 'Brak kalibracji. Pomiar działa, wartości traktuj porównawczo.',
  'modules.03.statusOnTpl': 'Skalibrowano {date} o {time}.',
  'modules.03.gainsTitle': 'Wzmocnienia kanałów',
  'modules.03.gainR': 'Czerwony',
  'modules.03.gainG': 'Zielony',
  'modules.03.gainB': 'Niebieski',
  'modules.03.gainsNone': 'nie ustawione',
  'modules.03.needRunning': 'Najpierw uruchom pomiar i skieruj kamerę na białą kartkę.',
  'modules.03.tooFew': 'Za mało próbek. Sprawdź, czy pomiar naprawdę działa.',
  'modules.03.tooDark': 'Obraz jest za ciemny do kalibracji. Doświetl kartkę i spróbuj ponownie.',
  'modules.03.refused': 'Odchył kanałów jest za duży, żeby uznać go za kalibrację. Użyj białej kartki w równym świetle.',
  'modules.03.done': 'Skalibrowano. Temperatura barwowa i wpływ na rytm dobowy będą teraz dokładniejsze.',
  'modules.03.cleared': 'Kalibracja usunięta.',
  'modules.03.limitsTitle': 'Czego kalibracja nie naprawia',
  'modules.03.limits.1': 'Kalibracja wyrównuje trzy kanały aparatu i nic poza tym. Nie daje aparatowi widma, więc temperatura barwowa i wpływ na rytm dobowy zostają przybliżeniami wyliczonymi z barw sRGB.',
  'modules.03.limits.2': 'Nie zamienia jasności sceny w wielkość bezwzględną — ta liczba pozostaje względna. Nie wyłącza automatyki ekspozycji ani balansu bieli, które przesuwają odczyt pod spodem.',
  'modules.03.limits.3': 'Nie przenosi się na inne światło: kalibracja zrobiona pod żarówką opisuje tę żarówkę. Przy innym źródle powtórz ją. I nie zmienia niczego w tym, czym ten pomiar nie jest — nadal nie jest badaniem ani podstawą do rozpoznania choroby.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'Okres raportu',
  'modules.04.rangeDay': 'Doba',
  'modules.04.rangeWeek': 'Tydzień',
  'modules.04.headTpl': 'Od {from} do {to} · {count} punktów historii.',
  'modules.04.tableTitle': 'Zestawienie',
  'modules.04.tableCaption': 'Średnia, minimum i maksimum w wybranym okresie',
  'modules.04.panoramaTitle': 'Panorama',
  'modules.04.panoramaAriaTpl': 'Panorama: {name}, {span}.',
  'modules.04.panoramaSpanDay': 'ostatnia doba w podziale na godziny',
  'modules.04.panoramaSpanWeek': 'ostatni tydzień w podziale na dni',
  'modules.04.panoramaHint': 'Wysokość i barwa słupka mówią to samo: w normie — niski, uwaga — średni, krytycznie — pełny. Kreska przy podstawie oznacza godzinę bez pomiaru.',
  'modules.04.coverageDayTpl': 'Pomiar objął {done} z {total} godzin.',
  'modules.04.coverageWeekTpl': 'Pomiar objął {done} z {total} dni.',
  'modules.04.zonesTitle': 'Rozkład stref',
  'modules.04.zonesCaptionTpl': 'Liczone dla kanału głównego: {name}.',
  'modules.04.worstTpl': 'Najtrudniejsza pora: {value}.',
  'modules.04.worstNone': 'brak wyraźnej',
  'modules.04.worstHourTpl': 'godzina {hour}',
  'modules.04.adviceTitle': 'Co z tym zrobić',
  'modules.04.adviceMelanopicTpl': 'Średni wpływ na rytm dobowy wyniósł {value}×. Wieczorem warto zejść poniżej 0,50 — najprościej przez cieplejszą żarówkę albo tryb nocny.',
  'modules.04.adviceKelvinTpl': 'Światło było chłodne (średnio {value} K). Do pracy to bez zarzutu; na dwie godziny przed snem łagodniejsze jest poniżej 3000 K.',
  'modules.04.adviceFlickerTpl': 'Widać zauważalne migotanie (średnio {value}%). Zwykle odpowiada za nie tani ściemniacz albo zasilacz podświetlenia.',
  'modules.04.adviceUniformityTpl': 'Światło rozkłada się nierówno ({value}%). Przesunięcie lampy albo zmiana kąta zwykle daje więcej niż wymiana żarówki.',
  'modules.04.adviceWorstTpl': 'Najwięcej odczytów poza progami skupia się o godzinie {hour}.',
  'modules.04.adviceNone': 'W tym okresie nic nie wybija się ponad ustawione progi.',
  'modules.04.limitsTitle': 'To nie jest porada zdrowotna',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'Wnioski wynikają wyłącznie z tego, co zobaczyła kamera tego telefonu. Aplikacja nie mierzy widma i nie stawia żadnego rozpoznania.',
  'modules.04.printHint': 'Ta strona jest pomyślana jak wydruk: tabela i podpisy czytają się tak samo na papierze, w lupie systemowej i w czytniku ekranu.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'Zakres danych',
  'modules.05.range1h': 'Godzina',
  'modules.05.range24h': 'Doba',
  'modules.05.range7d': '7 dni',
  'modules.05.range30d': '30 dni',
  'modules.05.csvKey': 'Zapisz plik CSV',
  'modules.05.jsonKey': 'Zapisz plik JSON',
  'modules.05.formatTitle': 'Format pliku',
  'modules.05.formatCsv': 'CSV: średnik rozdziela kolumny, przecinek jest separatorem dziesiętnym, kodowanie UTF-8 ze znacznikiem BOM. Taki plik polski Excel otwiera bez ustawiania czegokolwiek.',
  'modules.05.formatJson': 'JSON: te same dane w polu „points”, z kropką dziesiętną i znacznikiem czasu w milisekundach — tego wymaga format.',
  'modules.05.resolution': 'Historia zapisuje jeden punkt co 5 sekund i sięga 30 dni wstecz. Pełnej rozdzielczości pięciu próbek na sekundę plik nie zawiera — silnik trzyma ją tylko przez minutę.',
  'modules.05.offline': 'Plik powstaje w urządzeniu i zostaje w urządzeniu. Eksport nie łączy się z siecią.',
  'modules.05.columnsTitle': 'Opis kolumn',
  'modules.05.columnsCaption': 'Kolumny pliku i ich znaczenie',
  'modules.05.descDate': 'Data punktu z zegara urządzenia, w zapisie dzień-miesiąc-rok.',
  'modules.05.descTime': 'Godzina punktu z dokładnością do sekundy.',
  'modules.05.descZone': 'Strefa udziału niebieskiego w chwili zapisu. Silnik zapisuje strefę tylko dla tej jednej wielkości — dla pozostałych policz ją z progów.',
  'modules.05.descMetricTpl': '{short} Jednostka: {unit}. Zakres {min}–{max}.',
  'modules.05.previewTitle': 'Podgląd',
  'modules.05.previewHint': 'Pierwsze pięć wierszy pliku, dokładnie tak, jak zostaną zapisane.',
  'modules.05.savedTpl': 'Zapisano plik {name} — {rows} wierszy.',
  'modules.05.failed': 'Ta przeglądarka nie pozwoliła zapisać pliku.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'Aplikacja zapisuje każdą zakończoną sesję pomiaru na tym urządzeniu. Wybierz dwie, żeby zobaczyć je na jednej taśmie i przeczytać różnicę liczbowo.',
  'modules.06.noSessions': 'Nie ma jeszcze żadnej zakończonej sesji. Uruchom pomiar, zatrzymaj go i wróć tutaj.',
  'modules.06.slotA': 'Sesja A',
  'modules.06.slotB': 'Sesja B',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'Taśma',
  'modules.06.tapeAriaTpl': 'Przebieg sesji {slot}, wielkość {name}.',
  'modules.06.tapeHint': 'Obie sesje rozciągnięte na tę samą szerokość: słupek to ta sama część czasu trwania, nie ta sama godzina. Wysokość i barwa mówią to samo co na pulpicie.',
  'modules.06.tapeChannelTpl': 'Taśma pokazuje kanał główny: {name}.',
  'modules.06.diffTitle': 'Różnica',
  'modules.06.diffCaption': 'Średnie obu sesji i różnica między nimi',
  'modules.06.clearKey': 'Usuń zapisane sesje',
  'modules.06.cleared': 'Usunięto zapisane sesje.',
  'modules.06.savedTpl': 'Zapisano sesję: {dur}.',
  'modules.06.limitsTitle': 'Czego to porównanie nie mówi',
  'modules.06.limits': 'Porównujesz dwa pomiary, nie dwa źródła światła. Jeżeli między sesjami zmienił się kadr, odległość, pora dnia albo ustawienie telefonu, różnica jest także o tym. Najuczciwsze porównanie to ta sama scena przed zmianą i po zmianie oświetlenia.',
  'modules.06.keepTpl': 'Pamiętanych jest najwyżej {count} ostatnich sesji.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'Plansze kontrolne wyświetlają się na całym ekranie tego urządzenia. Służą do obejrzenia ekranu okiem: czy biel jest równa, czy szarości nie wpadają w kolor i czy podświetlenie nie przecieka po rogach.',
  'modules.07.steps.1': 'Ustaw jasność ekranu na taką, przy której zwykle pracujesz, i wyłącz systemowy tryb nocny.',
  'modules.07.steps.2': 'Wybierz planszę z listy poniżej. Wypełni cały ekran.',
  'modules.07.steps.3': 'Patrz z odległości mniej więcej sześćdziesięciu centymetrów, prostopadle do ekranu. Potem obejrzyj tę samą planszę pod kątem.',
  'modules.07.steps.4': 'Wyjdź klawiszem „Zamknij planszę” albo klawiszem Escape i przejdź do następnej.',
  'modules.07.planesTitle': 'Plansze',
  'modules.07.exitKey': 'Zamknij planszę',
  'modules.07.showAriaTpl': 'Pokaż planszę: {name}',
  'modules.07.planeAriaTpl': 'Plansza kontrolna: {name}. Klawisz zamknięcia na dole ekranu.',
  'modules.07.plane.white.name': 'Biel',
  'modules.07.plane.white.hint': 'Szukaj plam, przebarwień i pojaśnień przy krawędziach. Biel powinna być jednym kolorem na całej powierzchni.',
  'modules.07.plane.gray75.name': 'Szarość 75%',
  'modules.07.plane.gray75.hint': 'Szarość ma być szara. Zielonkawy albo różowy odcień oznacza rozjechany balans bieli ekranu.',
  'modules.07.plane.gray50.name': 'Szarość 50%',
  'modules.07.plane.gray50.hint': 'Najlepsza plansza do oceny odcienia. Porównaj środek z rogami.',
  'modules.07.plane.gray25.name': 'Szarość 25%',
  'modules.07.plane.gray25.hint': 'Ciemna szarość pokazuje przecieki podświetlenia i pasy na tanich matrycach.',
  'modules.07.plane.black.name': 'Czerń',
  'modules.07.plane.black.hint': 'W ciemnym pokoju widać tu każdą nieszczelność podświetlenia i rozjaśnione rogi.',
  'modules.07.plane.red.name': 'Czysta czerwień',
  'modules.07.plane.red.hint': 'Jednolita czerwień ujawnia martwe subpiksele i nierówności matrycy.',
  'modules.07.plane.green.name': 'Czysta zieleń',
  'modules.07.plane.green.hint': 'Zieleń niesie najwięcej jasności — na niej najłatwiej wypatrzyć uszkodzony piksel.',
  'modules.07.plane.blue.name': 'Czysty błękit',
  'modules.07.plane.blue.hint': 'Błękit pokazuje brud i smugi na powierzchni ekranu lepiej niż biel.',
  'modules.07.plane.grid.name': 'Siatka',
  'modules.07.plane.grid.hint': 'Linie mają być równie ostre w rogach jak w środku. Rozmycie na brzegach to sprawa skalowania obrazu.',
  'modules.07.warn': 'Plansza zasłania cały ekran, także pulpit sterowania z klawiszem pomiaru. To jedyne miejsce w aplikacji, gdzie tak się dzieje, i dlatego klawisz wyjścia jest duży i zawsze widoczny. Dopóki plansza jest na ekranie, pomiar biegnie dalej i nie da się go zatrzymać — zamknij planszę, żeby wrócić do klawiszy.',
  'modules.07.cameraTitle': 'Czego tu nie zrobisz',
  'modules.07.camera': 'Telefon nie widzi własnego ekranu, więc tych plansz nie zmierzysz tym samym urządzeniem. Żeby zmierzyć monitor, wyświetl planszę na monitorze, a pomiar prowadź telefonem — to dwa różne urządzenia i dwie różne role.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'Harmonogram przypomina o pomiarze o ustalonej porze. Kamery nie włącza sam: o wyznaczonej godzinie pokazuje przypomnienie, a pomiar uruchamiasz klawiszem „Start pomiaru” na pulpicie. Tak samo jak za pierwszym razem.',
  'modules.08.onlyOpenTitle': 'Kiedy to nie zadziała',
  'modules.08.onlyOpen': 'Harmonogram działa tylko przy otwartej aplikacji. Zamknięta karta przeglądarki nie liczy czasu i o niczym nie przypomni. Nie prosimy o zgodę na powiadomienia systemowe i niczego nie wysyłamy do sieci.',
  'modules.08.enableLabel': 'Włącz przypomnienia',
  'modules.08.timesTitle': 'Pory',
  'modules.08.timeAriaTpl': 'Pora {n}: godzina przypomnienia',
  'modules.08.addKey': 'Dodaj porę',
  'modules.08.removeAriaTpl': 'Usuń porę {time}',
  'modules.08.addedTpl': 'Dodano porę {time}.',
  'modules.08.removedTpl': 'Usunięto porę {time}.',
  'modules.08.badTime': 'Podaj godzinę w formacie 22:00.',
  'modules.08.nextTpl': 'Najbliższe przypomnienie: {time}.',
  'modules.08.nextNone': 'Przypomnienia są wyłączone.',
  'modules.08.dueTpl': 'Zaplanowana pora pomiaru: {time}.',
  'modules.08.dueKey': 'Pokaż pulpit',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'Alert pilnuje jednej wielkości i odzywa się dopiero wtedy, gdy trzyma ona wybraną strefę nieprzerwanie przez ustawiony czas. Nigdy nie zatrzymuje pomiaru i nigdy nie zasłania klawiszy.',
  'modules.09.enableLabel': 'Włącz alerty',
  'modules.09.metricLabel': 'Pilnowana wielkość',
  'modules.09.levelLabel': 'Od której strefy',
  'modules.09.levelWarning': 'Od uwagi w górę',
  'modules.09.levelCritical': 'Tylko krytyczna',
  'modules.09.sustainLabel': 'Po ilu sekundach nieprzerwanie',
  'modules.09.sustainHint': 'Krótsze czasy dają więcej fałszywych alarmów, gdy przesuwasz telefon. Poniżej pięciu sekund nie schodzimy.',
  'modules.09.soundLabel': 'Krótki sygnał dźwiękowy',
  'modules.09.soundHint': 'Dźwięk powstaje w urządzeniu. Nic nie jest pobierane z sieci.',
  'modules.09.cooldownHint': 'Najwyżej jeden alert na dwie minuty. Alarm powtarzany co próbkę to alarm, który się wyłącza na stałe.',
  'modules.09.whenNotTitle': 'Kiedy alert nie zadziała',
  'modules.09.whenNot': 'Powiadomienie jest wewnątrz aplikacji, nie w systemie. Nie zadziała, gdy aplikacja jest zamknięta albo schowana w tle, gdy pomiar nie działa oraz gdy pilnowana wielkość nie daje się w danej chwili zmierzyć. Nie prosimy o zgodę na powiadomienia systemowe.',
  'modules.09.firedTpl': '{name}: {zone} od {sec} s — teraz {value}.',
  'modules.09.saved': 'Zapisano ustawienia alertu.',
  'modules.09.statusOnTpl': 'Pilnuję: {name}, {level}, po {sec} s.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'Ta aplikacja jest darmowa',
  'support.freeText': 'Wszystkie siedem wielkości pokazuje liczby od pierwszego uruchomienia. Rejestrator, progi, kalibracja, raporty, eksport, porównanie sesji i cała historia z trzydziestu dni działają bez konta, bez opłat i bez limitów — tak samo w trybie offline. Nic tu nie jest odłożone za opłatę na później.',
  'support.whyTitle': 'Dlaczego o to proszę',
  'support.whyText': 'Monitor Światła robię i utrzymuję sam, po godzinach. Wsparcie idzie na czas potrzebny na poprawki, na testy na kolejnych telefonach i na następne narzędzia w spisie modułów. Nic nie przestanie działać, jeśli nikt nic nie wpłaci.',
  'support.nothingTitle': 'Co daje darowizna',
  'support.nothingText': 'Nic. Żadna liczba, żaden moduł i żadne ustawienie nie odblokowują się po darowiźnie, bo wszystko jest odblokowane od początku. Zostaje tylko tyle, że wiem, że to komuś się przydało.',
  'support.keyTitle': 'Jeśli chcesz pomóc',
  'support.keyLabel': 'Postaw mi kawę',
  'support.keyAria': 'Postaw mi kawę — otwiera stronę zewnętrzną w nowej karcie',
  'support.serviceText': 'Profil darowizn prowadzi Buy Me a Coffee i jest to jedyna forma wsparcia w tej aplikacji. Aplikacja nie ładuje z niego żadnego skryptu, widżetu ani obrazka — tutaj stoi zwykły odnośnik i nic poza nim.',
  'support.privacyText': 'Naciśnięcie tego klawisza otwiera stronę zewnętrzną w nowej karcie i jest to jedyny moment, w którym cokolwiek opuszcza to urządzenie. Pomiary, historia i ustawienia zostają tam, gdzie były — w pamięci tej przeglądarki.',
  'support.privacyPendingText': 'Kiedy adres się pojawi, naciśnięcie klawisza otworzy stronę zewnętrzną w nowej karcie i będzie to jedyny moment, w którym cokolwiek opuszcza to urządzenie. Pomiary, historia i ustawienia zostają tam, gdzie były — w pamięci tej przeglądarki.',
  'support.emptyTitle': 'Profil nie jest jeszcze podłączony',
  'support.emptyText': 'Adres profilu darowizn nie został jeszcze wpisany, więc nie ma tu klawisza, który prowadziłby donikąd. Reszta aplikacji działa bez zmian — nic nie czeka na tę darowiznę.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'Czego ta aplikacja NIE mierzy',
  'docs.notList.1': 'Nie mierzy widma. Aparat ma trzy szerokie kanały barwne, automatyczną ekspozycję i automatyczny balans bieli.',
  'docs.notList.2': 'Nie mierzy wartości bezwzględnych. Jasność sceny jest wskaźnikiem względnym, a nie wynikiem pomiaru fotometrycznego.',
  'docs.notList.3': 'Nie mierzy temperatury barwowej wprost. Temperatura barwowa i wpływ na rytm dobowy to przybliżenia liczone z barw sRGB.',
  'docs.notList.4': 'Nie widzi migotania sieciowego. Próbkowanie 5 Hz widzi pulsowanie tylko poniżej 2,5 Hz — sieciowe 100 Hz jest poza zasięgiem i aplikacja nigdy nie poda go jako wyniku.',
  'docs.notList.5': 'Nie stawia diagnozy i nie daje porady zdrowotnej. Żaden wynik nie jest ani jednym, ani drugim.',
  'docs.notList.6': 'Nie porównuje twojego światła z żadnym urzędowym wzorcem. Progi to ustawienia, które możesz zmienić w module 02.',
  'docs.whatTitle': 'Co mierzy i jak',
  'docs.whatLead': 'Kamera telefonu patrzy na oświetloną powierzchnię, a aplikacja pięć razy na sekundę liczy średnie kanałów R, G i B ze środkowego wycinka kadru. Z tych trzech liczb wyprowadza siedem wskaźników.',
  'docs.whatCrop': 'Wycinek to środkowe 60% szerokości i 60% wysokości klatki — dokładnie ten prostokąt, który obrysowuje celownik na ekranie CELOWANIE. Poza nim nic nie jest liczone.',
  'docs.whatRate': 'Jedna próbka co 200 ms, czyli 5 razy na sekundę. Ostatnia minuta leży w pamięci w pełnej rozdzielczości; wszystko starsze jest zapisywane co 5 sekund i sięga trzydziestu dni wstecz.',
  'docs.metricsTitle': 'Siedem wielkości',
  'docs.formulasTitle': 'Wzory',
  'docs.formula.share.formula': 'udział = B / (R + G + B) × 100%',
  'docs.formula.share.text': 'Liczony na wartościach sRGB bez odwracania gamma — celowo, bo to ta sama definicja co w poprzedniej wersji aplikacji i progi ustawione kiedyś dalej znaczą to samo. Izoluje barwę od jasności.',
  'docs.formula.brightness.formula': 'jasność = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': 'Średnia wartość kanałów w procentach zakresu. Automatyka ekspozycji przesuwa ją pod spodem, więc to wskaźnik względny — porównuj dwie sceny, nie odczytuj jednej liczby jako pomiaru.',
  'docs.formula.kelvin.title': 'Temperatura barwowa — przybliżenie McCamy’ego',
  'docs.formula.kelvin.formula': 'n = (x − 0,3320) / (y − 0,1858)\nCCT = −449 n³ + 3525 n² − 6823,3 n + 5520,33',
  'docs.formula.kelvin.text': 'Najpierw odwracamy gamma sRGB, potem przechodzimy macierzą na CIE XYZ dla bieli D65 i liczymy chromatyczność x, y. Wzór McCamy’ego jest wiarygodny mniej więcej między 2000 K a 12500 K. Poza tym zakresem sześcian rozjeżdża się, więc wynik jest ucinany i oznaczany jako niewiarygodny — wtedy linia bazowa skali robi się kreskowana i pada zdanie „poza zakresem metody”.',
  'docs.formula.melanopic.title': 'Wpływ na rytm dobowy — współczynnik melanopiczny',
  'docs.formula.melanopic.formula': 'mel = 0,0016 R + 0,3110 G + 0,8460 B\nY = 0,2127 R + 0,7152 G + 0,0722 B\nwynik = (mel / Y) × normalizacja do 1,00 dla neutralnej bieli',
  'docs.formula.melanopic.text': 'Wszystkie trzy kanały w wartościach liniowych. Prawdziwa wielkość to całka widma z krzywą czułości melanopsyny (szczyt około 490 nm); aparat ma trzy szerokie kanały, więc ważymy prymarne barwy sRGB czułością melanopiczną przy ich przybliżonych długościach fali (R 612 nm, G 549 nm, B 465 nm). Kierunek zmian jest wiarygodny, wartość bezwzględna nie jest — dlatego przy tej liczbie stoi znak „≈”.',
  'docs.formula.flicker.formula': 'migotanie = (max − min) / (max + min) × 100%',
  'docs.formula.flicker.text': 'Definicja IES, liczona z okna próbek jasności. Częstotliwość szacujemy z liczby przejść sygnału przez wartość średnią. Próbkowanie 5 Hz widzi modulację tylko poniżej 2,5 Hz (granica Nyquista), a za wiarygodną uznajemy dopiero częstotliwość między 0,2 a 2 Hz przy amplitudzie od 0,5% — poniżej tego progu przejścia przez średnią to szum czujnika, nie pulsowanie źródła.',
  'docs.formula.uniformity.formula': 'równomierność = najciemniejsze pole / najjaśniejsze pole × 100%',
  'docs.formula.uniformity.text': 'Wycinek dzielimy na dziewięć pól w siatce 3×3 i porównujemy skrajne. 100% to światło rozłożone idealnie równo. Niska wartość na ekranie oznacza przeświecanie podświetlenia albo odbicie, na biurku — źle ustawioną lampę. To jedyna wielkość, przy której wyżej znaczy lepiej razem z komfortem.',
  'docs.formula.comfort.formula': '100 punktów minus kary:\nrytm dobowy powyżej 0,75 — do 35 pkt\nbarwa powyżej 4000 K — do 25 pkt\nmigotanie powyżej 5% — do 25 pkt\nrównomierność poniżej 60% — do 15 pkt',
  'docs.formula.comfort.text': 'Jedna ocena zamiast sześciu liczb. Wielkość, której nie dało się zmierzyć, nie daje żadnej kary — brak danych nigdy nie udaje dobrego wyniku. Wagi są naszą oceną redakcyjną, nie normą; dlatego moduł 01 pokazuje rozbicie na składniki, żeby dało się z tą oceną nie zgodzić.',
  'docs.rangesTitle': 'Zakresy i progi',
  'docs.rangesLead': 'Progi poniżej są tymi, które obowiązują w tej chwili — jeśli zmieniłeś je w module 02, tabela pokazuje twoje wartości, nie fabryczne.',
  'docs.dirNormal': 'niżej znaczy łagodniej',
  'docs.dirInvert': 'wyżej znaczy lepiej',
  'docs.privacyTitle': 'Dane i prywatność',
  'docs.privacyText': 'Obraz z kamery nigdzie nie jest wysyłany ani zapisywany — z każdej klatki zostają tylko trzy liczby. Pomiary, progi i ustawienia leżą w pamięci przeglądarki na tym urządzeniu. Aplikacja nie wykonuje żadnych zapytań sieciowych i działa w trybie offline.',
  'docs.mdrTitle': 'Zastrzeżenie',
  'docs.freeText': 'Aplikacja jest w całości darmowa i taka zostaje: wszystkie siedem wielkości, historia, raporty, eksport i tryb offline działają bez konta, bez opłat i bez limitów. Kto chce podziękować, znajdzie moduł 10 „Wsparcie”.',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'Aplikacja wczytała się niekompletnie',
  'boot.filesTpl': 'Nie wczytały się pliki: {list}.',
  'boot.modulesTpl': 'Nie zgłosiły się moduły: {list} — te pozycje nie otworzą się ze spisu.',
  'boot.modulesRangeTpl': 'moduły {from}–{to}',
  'boot.tail': 'Odśwież stronę. Jeżeli to nie pomoże, pliki na serwerze są niekompletne.',
  'boot.loss.bus': 'moduły przestaną się widzieć i pomiar nie ruszy',
  'boot.loss.metrics': 'żadna wartość nie zostanie policzona',
  'boot.loss.scaleCore': 'zniknie geometria skali i formatowanie liczb',
  'boot.loss.scaleText': 'znikną wszystkie napisy interfejsu',
  'boot.loss.shell': 'nie da się otworzyć żadnego modułu',
  'boot.loss.engine': 'kamera i pomiar nie ruszą',
  'boot.loss.dash': 'pulpit zostanie pusty'
});
