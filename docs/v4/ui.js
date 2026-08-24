/* Monitor Światła v4 — ui.js
 *
 * ROLA PLIKU: prymitywy interfejsu, z których zbudowane są wszystkie cztery ekrany.
 * Ten plik nie wie nic o pomiarze, o kamerze ani o pieniądzach. Wie tylko, jak zrobić
 * przycisk, wiersz listy, arkusz, okno i toast, i jak zrobić je dostępnie.
 *
 * Trzy rzeczy, dla których ten plik istnieje:
 *   1. Ikony. 73 rysunki inline SVG, bez jednego pliku graficznego i bez sieci
 *      (rozdział 6 SPEC.md). Każda ikona jest budowana raz i klonowana.
 *   2. Warstwy modalne. Arkusz (dolny na telefonie, okno na desktopie), okno dialogowe
 *      i toasty — razem z pułapką fokusu, Escape, przywróceniem fokusu, blokadą
 *      przewijania tła i stosem warstw (rozdział 8.2).
 *   3. Formanty. Wiersz, segmenty, przełącznik i suwak są prawdziwymi kontrolkami
 *      (<button role="switch">, <input type="range">, radiogroup ze strzałkami),
 *      a nie divami z nasłuchem na klik.
 *
 * Cała polszczyzna aplikacji poza Scale.TEXT leży w UI.T (rozdział 7 SPEC.md).
 * Żaden ekran nie ma prawa zawierać własnego literału polskiego.
 *
 * Kolory: wyłącznie tokeny przez CSS. Jedyne hexy w tym pliku to cztery ikony
 * dostawców logowania — udokumentowany wyjątek z rozdziału 0.3.
 */
(function (global) {
  'use strict';

  var doc = global.document;
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var UI = {};
  var seq = 0;

  function uid(prefix) {
    seq += 1;
    return 'ms4-' + prefix + '-' + seq;
  }

  /* ==================================================================
     1. Słownik tekstów — rozdział 7 SPEC.md
     ================================================================== */

  UI.T = {
    nav: {
      measure: 'Pomiar',
      history: 'Historia',
      tools: 'Narzędzia',
      account: 'Konto',
      aria: 'Nawigacja główna',
      skip: 'Przejdź do treści',
      brand: 'Monitor Światła',
      version: 'Wersja 4.0',
      premiumOn: 'Premium aktywne',
      premiumOff: 'Wersja bezpłatna'
    },

    measure: {
      title: 'Pomiar',
      start: 'Start pomiaru',
      starting: 'Uruchamiam…',
      stop: 'Zatrzymaj',
      flip: 'Obróć kamerę',
      flipAria: 'Przełącz kamerę przednią i tylną',
      lead: 'Kanał',
      leadAria: 'Wybierz wielkość na dużym wskaźniku',
      leadSheetTitle: 'Co pokazać na wskaźniku',
      leadSheetSub: 'Wskaźnik pokazuje jedną wielkość naraz. Pozostałe sześć widać w kafelkach niżej.',
      preview: 'Podgląd kontrolny',
      previewLive: 'Na żywo',
      previewHide: 'Zwiń podgląd',
      previewShow: 'Rozwiń podgląd',
      previewHint: 'Ramka pokazuje dokładnie ten wycinek obrazu, który mierzy aplikacja.',
      tilesTitle: 'Wszystkie wielkości',
      tilesSub: 'Dotknij kafelka, żeby przenieść wielkość na duży wskaźnik.',
      hz: '5,0 Hz',
      calibrated: 'Skalibrowano',
      notCalibrated: 'Bez kalibracji',
      sessionIdle: 'Pomiar nie trwa',
      firstRun: 'Zacznij od przycisku „Start pomiaru”. Kamera włączy się dopiero po jego naciśnięciu i nic nie opuszcza tego urządzenia.',
      helpAria: 'Czym jest ten pomiar',
      premiumTileCta: 'Zobacz, ile to kosztuje',
      premiumTileWord: 'Premium'
    },

    history: {
      title: 'Historia',
      rangeAria: 'Zakres czasu',
      r1min: '1 min',
      r1h: '1 godz',
      r24h: '24 godz',
      r7d: '7 dni',
      r30d: '30 dni',
      metricAria: 'Wielkość na wykresie',
      chartTitle: 'Przebieg w czasie',
      chartSub: 'Tło pokazuje strefy wyliczone z twoich progów.',
      statsTitle: 'Statystyka zakresu',
      statMin: 'Najmniej',
      statAvg: 'Średnio',
      statMax: 'Najwięcej',
      statTime: 'Czas pomiaru',
      statSamples: 'Próbek',
      zonesTitle: 'Rozkład stref',
      zoneGood: 'W normie',
      zoneWarn: 'Uwaga',
      zoneCrit: 'Krytycznie',
      sessionsTitle: 'Sesje pomiarowe',
      sessionsSub: 'Każde uruchomienie i zatrzymanie pomiaru to jedna sesja.',
      sessionOpen: 'Pokaż szczegóły sesji',
      sessionRunning: 'Trwa teraz',
      coverageTitle: 'Pokrycie doby',
      exportShort: 'Eksportuj',
      exportAria: 'Zapisz historię do pliku',
      clear: 'Wyczyść historię',
      pointAt: 'Odczyt z {time}'
    },

    tools: {
      title: 'Narzędzia',
      sub: 'Dziewięć rzeczy, które możesz zrobić z tym, co już zmierzyłeś.',
      openAria: 'Otwórz narzędzie: {name}',
      premiumWord: 'Premium',
      /* Nagłówki czterech grup na ekranie Narzędzia — kolejność jak w screen-tools.js. */
      groupMeasure: 'Pomiar',
      groupData: 'Dane i raporty',
      groupAuto: 'Automatyzacja',
      groupKnow: 'Wiedza',
      thresholds: 'Progi',
      calibration: 'Kalibracja',
      reports: 'Raporty',
      export: 'Eksport',
      compare: 'Porównanie sesji',
      screentest: 'Test ekranu',
      schedule: 'Harmonogram',
      alerts: 'Alerty',
      docs: 'O pomiarze',
      docsDesc: 'Czym ten pomiar jest, a czym na pewno nie jest.',
      copyKey: 'Skopiuj do schowka',
      clearSessionsConfirm: 'Usunąć zapisane sesje do porównania? Sam przebieg pomiarów w historii zostanie nietknięty.',
      /* Test ekranu — licznik plansz i przyciski nawigacji. */
      planeCountTpl: 'Plansza {n} z {total}',
      planePrev: 'Poprzednia',
      planeNext: 'Następna',
      /* Dokumentacja: nagłówki tabeli właściwości i sekcje. */
      docsColProperty: 'Właściwość',
      docsColValue: 'Wartość',
      docsMetricsTitle: 'Siedem wielkości',
      docsMetricsSub: 'Co oznacza każda liczba, w jakim zakresie się mieści i gdzie stoją twoje progi.',
      docsGlossaryTitle: 'Słowniczek',
      docsGlossary: [
        { termPL: 'Odczyt', textPL: 'Jeden komplet siedmiu liczb wyliczony z jednej klatki obrazu. Aplikacja robi pięć odczytów na sekundę.' },
        { termPL: 'Sesja', textPL: 'Wszystko między naciśnięciem „Start pomiaru” a zatrzymaniem. Historia zapamiętuje sesje osobno.' },
        { termPL: 'Próg', textPL: 'Granica, od której liczba przestaje być w normie. Masz dwa progi na wielkość: uwagi i krytyczny. Możesz je zmienić w narzędziu Progi.' },
        { termPL: 'Strefa', textPL: 'Miejsce liczby względem twoich progów: w normie, uwaga albo krytycznie. Kolory stref nie zmieniają się razem z kolorem aplikacji, bo niosą znaczenie.' },
        { termPL: 'Kalibracja', textPL: 'Poprawka mnożąca wynik, żeby dopasować go do znanego punktu odniesienia. Dotyczy tylko tego urządzenia.' },
        { termPL: 'Kadr pomiarowy', textPL: 'Środkowy wycinek obrazu, z którego liczone są wielkości. Brzegi kadru są pomijane, bo najczęściej łapią winietowanie obiektywu.' }
      ],
      exportCsv: 'Zapisz plik CSV',
      exportJson: 'Zapisz plik JSON',
      exportHint: 'Plik powstaje w pamięci przeglądarki i zapisuje się na tym urządzeniu. Nic nie jest wysyłane.',
      exportRange: 'Zakres eksportu',
      exportCols: 'Opis kolumn',
      screenTestHint: 'Ustaw telefon naprzeciw monitora, w odległości około 30 cm, i przechodź kolejne plansze.',
      scheduleHint: 'Harmonogram działa wyłącznie przy otwartej aplikacji. Zamknięcie karty przerywa go.',
      alertsHint: 'Alert pokazuje się w aplikacji. Nie wysyłamy powiadomień systemowych i nie prosimy o zgodę na nie.'
    },

    account: {
      title: 'Konto',
      signedOutName: 'Nie zalogowano',
      signedOutSub: 'Konto jest opcjonalne. Pomiar, historia i wszystkie narzędzia działają bez niego.',
      signIn: 'Zaloguj się',
      signOut: 'Wyloguj się',
      signOutConfirm: 'Wylogować się z tego urządzenia? Historia pomiarów zostanie na miejscu.',
      deleteAccount: 'Usuń konto',
      deleteConfirm: 'Usunąć konto z tej przeglądarki? Znikną dane logowania i stan subskrypcji. Historia pomiarów zostanie.',
      providerLabelTpl: 'Zalogowano przez {provider}',
      accountSheet: 'Twoje konto',
      nameSheetSub: 'Imię zostaje w pamięci tej przeglądarki i służy tylko do inicjałów w awatarze.',
      subTitle: 'Subskrypcja',
      subPlan: 'Plan',
      subSince: 'Aktywne od',
      subTrialCta: 'Zacznij 7 dni bez opłaty',
      subFree: 'Wersja bezpłatna',
      subFreeSub: 'Cztery wielkości z liczbami, ocena światła i cała historia. Bez ograniczeń czasowych.',
      subPremium: 'Premium aktywne',
      subPremiumSub: 'Wszystkie siedem wielkości, raporty i porównania. Dziękujemy.',
      subTrialTpl: 'Okres próbny — zostało {days} dni.',
      subManage: 'Zarządzaj',
      subUnlock: 'Odblokuj Premium',
      subRestore: 'Przywróć zakupy',
      subCancel: 'Zrezygnuj z subskrypcji',
      subCancelConfirm: 'Zrezygnować z Premium? W symulacji dostęp znika natychmiast, a liczby trzech wielkości wracają pod kłódkę.',
      settingsTitle: 'Ustawienia',
      /* Nagłówki dwóch grup ustawień pod kartą wyglądu. */
      textMotion: 'Tekst i ruch',
      measureGroup: 'Pomiar',
      theme: 'Motyw',
      themeSystem: 'Jak w systemie',
      themeLight: 'Jasny',
      themeDark: 'Ciemny',
      accent: 'Kolor aplikacji',
      accentSub: 'Zmienia wyłącznie kolor marki. Zielony, bursztynowy i czerwony stref zostają takie same, bo niosą znaczenie.',
      textScale: 'Rozmiar tekstu',
      textScale1: 'Zwykły',
      textScale115: 'Większy',
      textScale13: 'Największy',
      textScalePreview: 'Tak będzie wyglądał tekst w całej aplikacji.',
      motion: 'Ogranicz ruch',
      motionSub: 'Wyłącza przesunięcia i animacje. Zostaje tylko zmiana przezroczystości.',
      haptics: 'Wibracje',
      hapticsSub: 'Krótkie drgnięcie przy starcie i zatrzymaniu pomiaru. Działa tylko na urządzeniach, które to potrafią.',
      leadMetric: 'Wielkość na wskaźniku',
      camera: 'Kamera',
      cameraBack: 'Tylna',
      cameraFront: 'Przednia',
      dataTitle: 'Dane',
      historySize: 'Zebrana historia',
      /* {count} to liczba odczytów, {span} — słowny czas, który obejmują. */
      historySizeTpl: '{count} odczytów · {span}',
      clearHistory: 'Wyczyść historię pomiarów',
      clearSettings: 'Przywróć ustawienia domyślne',
      clearSettingsOk: 'Przywrócono ustawienia domyślne.',
      aboutTitle: 'O aplikacji',
      version: 'Wersja',
      versionValue: '4.0',
      versionSub: 'Wszystkie pomiary i ustawienia zostają na tym urządzeniu.',
      privacy: 'Prywatność',
      licenses: 'Składniki aplikacji',
      licensesText: 'Aplikacja nie korzysta z żadnej zewnętrznej biblioteki, kroju pisma ani pliku graficznego. Wszystkie ikony są rysowane w kodzie, cały pomiar liczy własny kod w tej karcie przeglądarki, a strona nie pobiera niczego z sieci — dlatego działa też bez połączenia.',
      privacyText: 'Aplikacja nie wykonuje żadnych żądań sieciowych. Obraz z kamery jest przetwarzany w tej karcie przeglądarki i nigdzie nie trafia. Historia, ustawienia i stan konta leżą w pamięci tej przeglądarki i znikają razem z jej danymi.'
    },

    auth: {
      title: 'Zaloguj się',
      sub: 'Konto pozwala trzymać stan subskrypcji w jednym miejscu. Pomiar działa bez niego.',
      demoBadge: 'Tryb demonstracyjny',
      demoText: 'To symulacja logowania. Nie ma połączenia z Google ani z Facebookiem, nic nie wychodzi do sieci, a wpisane dane zostają w pamięci tej przeglądarki.',
      google: 'Kontynuuj przez Google',
      facebook: 'Kontynuuj przez Facebooka',
      apple: 'Kontynuuj przez Apple',
      email: 'Kontynuuj przez e-mail',
      emailLabel: 'Adres e-mail',
      emailHint: 'Dowolny adres zostanie przyjęty. Nie sprawdzamy go i nigdzie nie wysyłamy.',
      passwordLabel: 'Hasło',
      /* Pole hasła istnieje tylko dla kompletności formularza — podpowiedź
         musi to powiedzieć wprost, bo inaczej byłoby to wyłudzanie hasła. */
      passwordHint: 'Wpisane hasło nie jest nigdzie zapisywane ani wysyłane — formularz go po prostu nie odczytuje. Możesz zostawić to pole puste.',
      nameLabel: 'Imię (opcjonalnie)',
      nameHint: 'Posłuży tylko do inicjałów w awatarze.',
      submit: 'Zaloguj się',
      back: 'Wróć do wyboru',
      emailEmpty: 'Podaj adres e-mail.',
      emailBad: 'To nie wygląda na adres e-mail. Potrzebna jest małpa i kropka.',
      busy: 'Loguję…',
      doneTpl: 'Zalogowano jako {name}.',
      signedOut: 'Wylogowano.',
      deleted: 'Konto usunięte z tej przeglądarki.',
      termsTitle: 'Regulamin',
      terms: 'Logowanie jest symulowane, więc nie ma tu żadnego regulaminu do zaakceptowania ani zgody do udzielenia.'
    },

    paywall: {
      badge: 'Tryb demonstracyjny',
      title: 'Odblokuj wszystkie siedem wielkości',
      lede: 'Migotanie, równomierność i komfort wzrokowy mają liczby dopiero w Premium. Ocena światła pod wskaźnikiem jest bezpłatna i liczy się ze wszystkich siedmiu — także tych trzech.',
      /* Wersja wstępu, gdy paywall otwiera konkretny kafelek — {name} to nazwa wielkości. */
      ledeMetricTpl: '{name} ma liczbę dopiero w Premium. Ocena światła pod wskaźnikiem jest bezpłatna i liczy się także z tej wielkości — Premium pokazuje ją wprost.',
      plansTitle: 'Wybierz plan',
      /* Tabela „co w którym pakiecie”. cmpYes/cmpNo czyta tylko czytnik ekranu. */
      compareTitle: 'Co jest w którym pakiecie',
      compareFree: 'Bezpłatnie',
      comparePremium: 'Premium',
      cmpVerdict: 'Ocena światła i zdanie pod wskaźnikiem',
      cmpFree4: 'Liczby czterech wielkości: udziału niebieskiego, jasności, temperatury barwowej i melanopiku',
      cmpHistory: 'Cała historia, wykresy i sesje',
      cmpPremium3: 'Liczby migotania, równomierności i komfortu wzrokowego',
      cmpReports: 'Raporty i porównanie sesji z kompletem siedmiu wielkości',
      cmpExport: 'Eksport CSV i JSON ze wszystkimi siedmioma kolumnami',
      cmpYes: 'jest w tym pakiecie',
      cmpNo: 'poza tym pakietem',
      manageTitle: 'Zarządzaj subskrypcją',
      trialNote: 'Roczny zaczyna się od 7 dni bez opłaty. W symulacji możesz go włączyć i wyłączyć dowolną liczbę razy.',
      ctaTpl: 'Wybierz {plan} — {price}',
      ctaTrial: 'Zacznij 7 dni bez opłaty',
      restore: 'Przywróć zakupy',
      fine: 'To jest symulacja zakupu. Nie pobieramy żadnej opłaty, nie prosimy o dane karty i nie wysyłamy niczego do sieci. Naciśnięcie przycisku zmienia tylko wpis w pamięci tej przeglądarki i możesz go w każdej chwili cofnąć w zakładce Konto.',
      benefitsTitle: 'Co dostajesz',
      fairTitle: 'Co zostaje bezpłatne',
      fairText: 'Ocena światła i zdanie pod wskaźnikiem są bezpłatne i biorą pod uwagę wszystkie siedem wielkości. Pakiet Premium odblokowuje liczby trzech z nich: migotania, równomierności i komfortu wzrokowego. Historia zbiera się od pierwszego dnia dla wszystkich, więc po zakupie zobaczysz przebieg, który naprawdę się wydarzył, a nie pustą tabelę.',
      confirmTitle: 'Potwierdzenie',
      confirmTpl: 'Wybrany plan: {plan}, {price}. To symulacja — nie zostanie pobrana żadna opłata i nie podajesz żadnych danych płatniczych.',
      confirmKey: 'Potwierdzam',
      busy: 'Przetwarzam…',
      successTitle: 'Premium aktywne',
      successText: 'Trzy zamknięte wielkości mają teraz liczby, a historia pokazuje je wstecz. Pamiętaj: to symulacja, żadna opłata nie została pobrana.',
      successKey: 'Wróć do pomiaru',
      restoredOn: 'Przywrócono zakup. Premium jest aktywne.',
      restoredOff: 'Nie znaleziono zakupu do przywrócenia w tej przeglądarce.',
      cancelled: 'Premium wyłączone. Liczby trzech wielkości wracają pod kłódkę.',
      trialStarted: 'Okres próbny włączony — 7 dni.',
      trialEnded: 'Okres próbny się skończył.'
    },

    error: {
      title: 'Coś poszło nie tak',
      retry: 'Spróbuj ponownie',
      storageFull: 'Pamięć przeglądarki jest pełna. Najstarsze punkty historii zostały usunięte, żeby pomiar mógł trwać dalej.',
      storageBlocked: 'Ta przeglądarka nie pozwala nic zapisać (tryb prywatny albo zablokowane dane witryn). Pomiar działa, ale historia zniknie po zamknięciu karty.',
      noSecure: 'Kamera działa tylko na połączeniu HTTPS. Otwórz aplikację przez adres zaczynający się od „https://”.',
      fileProtocol: 'Ta strona jest otwarta bezpośrednio z dysku (adres zaczyna się od „file://”), a wtedy przeglądarka nie udostępni kamery. Uruchom serwer testowy: w katalogu projektu wpisz powershell -ExecutionPolicy Bypass -File docs\serve.ps1 i otwórz http://localhost:8000/v4/',
      startTimeout: 'Kamera nie odpowiedziała przez 15 sekund. Najczęstsze przyczyny: pytanie o zgodę czeka niezauważone w pasku adresu, kamerę trzyma inna aplikacja (zamknij ją i spróbuj ponownie) albo strona jest otwarta pod adresem innym niż „localhost” bez HTTPS — wtedy przeglądarka w ogóle nie udostępni aparatu.',
      exportEmpty: 'Nie ma czego zapisać — historia jest pusta.',
      unknown: 'Nie udało się wykonać tej czynności. Spróbuj jeszcze raz.'
    },

    empty: {
      measureTitle: 'Kamera jeszcze nie pracuje',
      measureText: 'Naciśnij „Start pomiaru”, skieruj telefon na oświetloną powierzchnię i przytrzymaj go nieruchomo przez kilka sekund.',
      measureKey: 'Start pomiaru',
      historyTitle: 'Historia jest pusta',
      historyText: 'Historia zapisuje się w trakcie pomiaru. Uruchom pomiar na minutę i wróć tutaj.',
      historyKey: 'Przejdź do pomiaru',
      sessionsTitle: 'Nie ma jeszcze żadnej sesji',
      sessionsText: 'Sesja powstaje między naciśnięciem „Start pomiaru” a „Zatrzymaj”.',
      searchTitle: 'Nic tu nie ma',
      searchText: 'W wybranym zakresie nie było pomiaru. Wybierz szerszy zakres.'
    },

    confirm: {
      yes: 'Tak',
      no: 'Nie',
      cancel: 'Anuluj',
      close: 'Zamknij',
      save: 'Zapisz',
      reset: 'Przywróć domyślne',
      'delete': 'Usuń',
      clearHistory: 'Wyczyścić całą historię pomiarów? Tego nie da się cofnąć.',
      clearHistoryKey: 'Wyczyść',
      resetSettings: 'Przywrócić wszystkie ustawienia do stanu początkowego? Historia pomiarów zostanie nietknięta.',
      leaveSheet: 'Zamknąć bez zapisania zmian?'
    },

    toast: {
      saved: 'Zapisano.',
      copied: 'Skopiowano do schowka.',
      exported: 'Zapisano plik {name}.',
      themeChanged: 'Zmieniono motyw.',
      accentChangedTpl: 'Kolor aplikacji: {name}.',
      leadChangedTpl: 'Na wskaźniku: {name}.',
      offline: 'Brak sieci nic tu nie zmienia — aplikacja i tak z niej nie korzysta.',
      undo: 'Cofnij'
    },

    aria: {
      tabbar: 'Nawigacja główna',
      viewTpl: 'Ekran: {name}',
      sheetTpl: 'Okno: {name}',
      closeSheet: 'Zamknij okno',
      gaugeTpl: '{name}: {value}, {zone}.',
      tileTpl: '{name}, {value}, {zone}. Dotknij, aby pokazać na wskaźniku.',
      tileLockedTpl: '{name}, funkcja Premium. Dotknij, aby zobaczyć ofertę.',
      swatchTpl: 'Kolor aplikacji: {name}',
      themeTpl: 'Motyw: {name}',
      planTpl: 'Plan {name}, {price} {period}',
      rangeTpl: 'Zakres: {name}',
      expandPreview: 'Rozwiń podgląd kamery',
      collapsePreview: 'Zwiń podgląd kamery'
    }
  };

  /* ==================================================================
     2. Prymitywy DOM
     ================================================================== */

  UI.el = function (tag, className, text) {
    var node = doc.createElement(tag || 'div');
    if (className) node.className = className;
    if (text !== undefined && text !== null && text !== '') node.textContent = String(text);
    return node;
  };

  UI.frag = function () {
    return doc.createDocumentFragment();
  };

  UI.clear = function (node) {
    if (!node) return node;
    while (node.firstChild) node.removeChild(node.firstChild);
    return node;
  };

  /** Zwraca funkcję odpinającą — widok w leave() nie musi pamiętać ani typu
   *  zdarzenia, ani referencji do funkcji, tylko jedno „off”. */
  UI.on = function (node, ev, fn, opts) {
    if (!node || !node.addEventListener || typeof fn !== 'function') return function () {};
    var options = opts || false;
    node.addEventListener(ev, fn, options);
    var live = true;
    return function () {
      if (!live) return;
      live = false;
      node.removeEventListener(ev, fn, options);
    };
  };

  /** Wstawia do rodzica węzeł, tekst, tablicę albo wynik funkcji budującej. */
  function put(parent, content) {
    if (content === null || content === undefined || content === false) return parent;
    if (typeof content === 'function') {
      put(parent, content(parent));
      return parent;
    }
    if (isArrayLike(content)) {
      for (var i = 0; i < content.length; i++) put(parent, content[i]);
      return parent;
    }
    if (content.nodeType) {
      parent.appendChild(content);
      return parent;
    }
    parent.appendChild(doc.createTextNode(String(content)));
    return parent;
  }

  function isArrayLike(v) {
    return v && typeof v === 'object' && typeof v.length === 'number' && !v.nodeType;
  }

  function setClass(node, cls) {
    node.setAttribute('class', cls);
    return node;
  }

  function addClass(node, cls) {
    if (!node || !cls) return node;
    var cur = node.getAttribute('class') || '';
    if ((' ' + cur + ' ').indexOf(' ' + cls + ' ') === -1) {
      node.setAttribute('class', cur ? cur + ' ' + cls : cls);
    }
    return node;
  }

  function text(v) {
    return v === null || v === undefined ? '' : String(v);
  }

  /* ==================================================================
     3. Ikony — rozdział 6 SPEC.md
     ================================================================== */

  var FILLED = { fill: 'currentColor', stroke: 'none' };

  function shape(tag, attrs, extra) {
    if (extra) {
      for (var k in extra) {
        if (Object.prototype.hasOwnProperty.call(extra, k)) attrs[k] = extra[k];
      }
    }
    return { tag: tag, attrs: attrs };
  }

  function P(d, extra) { return shape('path', { d: d }, extra); }
  function C(cx, cy, r, extra) { return shape('circle', { cx: cx, cy: cy, r: r }, extra); }
  function L(x1, y1, x2, y2, extra) { return shape('line', { x1: x1, y1: y1, x2: x2, y2: y2 }, extra); }
  function R(x, y, w, h, rx, extra) { return shape('rect', { x: x, y: y, width: w, height: h, rx: rx }, extra); }
  function DOT(cx, cy, r) { return C(cx, cy, r, FILLED); }

  function polar(cx, cy, r, deg) {
    var a = deg * Math.PI / 180;
    return { x: round2(cx + r * Math.cos(a)), y: round2(cy + r * Math.sin(a)) };
  }

  function round2(n) {
    return Math.round(n * 100) / 100;
  }

  /** Promienie wychodzące ze środka — słońce i znak aplikacji. `lengths` podaje
   *  zewnętrzny promień każdego kolejnego ramienia, więc jedna funkcja robi
   *  i równe promienie słońca, i nierówne promienie logo. */
  function rays(cx, cy, inner, lengths, startDeg, stepDeg) {
    var out = [];
    for (var i = 0; i < lengths.length; i++) {
      var a = startDeg + i * stepDeg;
      var p1 = polar(cx, cy, inner, a);
      var p2 = polar(cx, cy, lengths[i], a);
      out.push(L(p1.x, p1.y, p2.x, p2.y));
    }
    return out;
  }

  /** Koło zębate liczone, a nie rysowane na oko: sześć zębów o równym podziale,
   *  ścianki zębów proste, dna i szczyty na łukach. */
  function gearPath(cx, cy, outer, inner, teeth) {
    var step = 360 / teeth;
    var halfTooth = 15;
    var flank = 9;
    var d = '';
    for (var i = 0; i < teeth; i++) {
      var a = i * step;
      var p1 = polar(cx, cy, outer, a - halfTooth);
      var p2 = polar(cx, cy, outer, a + halfTooth);
      var p3 = polar(cx, cy, inner, a + halfTooth + flank);
      var p4 = polar(cx, cy, inner, a + step - halfTooth - flank);
      d += (i === 0 ? 'M' : 'L') + p1.x + ' ' + p1.y;
      d += 'A' + outer + ' ' + outer + ' 0 0 1 ' + p2.x + ' ' + p2.y;
      d += 'L' + p3.x + ' ' + p3.y;
      d += 'A' + inner + ' ' + inner + ' 0 0 1 ' + p4.x + ' ' + p4.y;
    }
    return d + 'Z';
  }

  function squares3x3() {
    var out = [];
    var pos = [3.6, 9.5, 15.4];
    for (var r = 0; r < 3; r++) {
      for (var c = 0; c < 3; c++) {
        out.push(R(pos[c], pos[r], 5, 5, 1.1));
      }
    }
    return out;
  }

  /* Kolory czterech ikon dostawców. To jedyne hexy w całym JS aplikacji
     i jedyne miejsce, w którym rysunek ma własną barwę (SPEC 0.3). */
  var G_RED = '#EA4335';
  var G_YELLOW = '#FBBC05';
  var G_GREEN = '#34A853';
  var G_BLUE = '#4285F4';
  var FB_BLUE = '#1877F2';

  function googleArc(color, fromDeg, toDeg) {
    var a = polar(12, 12, 7.2, fromDeg);
    var b = polar(12, 12, 7.2, toDeg);
    var large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
    var extra = { fill: 'none', stroke: color, 'stroke-width': 3.2, 'stroke-linecap': 'butt' };
    return P('M' + a.x + ' ' + a.y + 'A7.2 7.2 0 ' + large + ' 1 ' + b.x + ' ' + b.y, extra);
  }

  var SHAPES = {
    /* --- 6.1 nawigacja i powłoka --- */
    'measure': [P('M4 17a8 8 0 1 1 16 0'), P('M12 17l4.4-5.1')],
    'history': [C(12, 12, 8.6), P('M12 12 8.4 9.4'), P('M12 12 15.6 9.4'), P('M5.6 9.2 3.2 11.8l2.7 2.2')],
    'tools': [P('M19.4 4.6A3.4 3.4 0 1 0 19.4 9.4'), L(14.9, 9.1, 5.4, 18.6),
      P('M3.4 6.2 6.2 3.4 9.2 6.4 6.4 9.2Z'), L(7.8, 7.8, 18.4, 18.4)],
    'account': [C(12, 8.4, 3.5), P('M4.6 20.2a7.4 7.4 0 0 1 14.8 0')],
    'logo': [DOT(12, 12, 3.1)].concat(rays(12, 12, 4.8, [20.4, 17.2, 20.8, 16.8, 20.2, 17.4, 20.6, 17], 0, 45)),
    'menu': [L(4, 7, 20, 7), L(4, 12, 20, 12), L(4, 17, 20, 17)],
    'close': [L(6, 6, 18, 18), L(18, 6, 6, 18)],
    'chevron-right': [P('M10 7.5 14.5 12 10 16.5')],
    'chevron-left': [P('M14 7.5 9.5 12 14 16.5')],
    'chevron-down': [P('M7.5 10 12 14.5 16.5 10')],
    'chevron-up': [P('M7.5 14 12 9.5 16.5 14')],
    'arrow-right': [L(4, 12, 19, 12), P('M13.4 6.4 19 12l-5.6 5.6')],
    'arrow-up': [L(12, 20, 12, 5), P('M6.4 10.6 12 5l5.6 5.6')],
    'arrow-down': [L(12, 4, 12, 19), P('M6.4 13.4 12 19l5.6-5.6')],
    'plus': [L(12, 6, 12, 18), L(6, 12, 18, 12)],
    'minus': [L(6, 12, 18, 12)],
    'check': [P('M5 12.4 9.6 17 19 7.4')],
    'check-circle': [C(12, 12, 9), P('M7.9 12.2 10.9 15.2 16.3 9.2')],
    'more': [DOT(5.6, 12, 1.2), DOT(12, 12, 1.2), DOT(18.4, 12, 1.2)],

    /* --- 6.2 pomiar i kamera --- */
    'play': [P('M8.6 5.6 18.4 12 8.6 18.4Z')],
    'stop': [R(7, 7, 10, 10, 2)],
    'camera': [R(3, 7, 18, 13, 3), P('M9 7 10.4 4.4h3.2L15 7'), C(12, 13.4, 3.4)],
    'camera-flip': [R(3, 7, 18, 13, 3), P('M9 7 10.4 4.4h3.2L15 7'),
      P('M9.1 13.9a2.9 2.9 0 0 1 4.9-2.1'), P('M14.3 9.6v2.5h-2.5'),
      P('M14.9 13.9a2.9 2.9 0 0 1-4.9 2.1'), P('M9.7 18.2v-2.5h2.5')],
    'target': [C(12, 12, 7.5), C(12, 12, 3), L(12, 2.5, 12, 5), L(12, 19, 12, 21.5),
      L(2.5, 12, 5, 12), L(19, 12, 21.5, 12)],
    'expand': [P('M3.6 9V3.6H9'), P('M15 3.6h5.4V9'), P('M20.4 15v5.4H15'), P('M9 20.4H3.6V15'),
      L(4.4, 4.4, 8.6, 8.6), L(19.6, 4.4, 15.4, 8.6), L(19.6, 19.6, 15.4, 15.4), L(4.4, 19.6, 8.6, 15.4)],
    'bulb': [P('M9.8 16.4a5.4 5.4 0 1 1 4.4 0'), L(9.9, 18.3, 14.1, 18.3), L(10.6, 20.5, 13.4, 20.5),
      L(12, 2, 12, 3.4), L(4.2, 6.4, 5.6, 7.2), L(19.8, 6.4, 18.4, 7.2)],
    'sun': [C(12, 12, 4.2)].concat(rays(12, 12, 6.4, [9.4, 9.4, 9.4, 9.4, 9.4, 9.4, 9.4, 9.4], 0, 45)),
    'moon': [P('M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8 8.6 8.6 0 1 0 20.2 14.6Z')],
    'thermometer': [P('M14.1 13.7V5.5a2.1 2.1 0 0 0-4.2 0v8.2a4.3 4.3 0 1 0 4.2 0Z'),
      L(15.8, 7.4, 18, 7.4), L(15.8, 10, 18, 10), L(15.8, 12.6, 18, 12.6)],
    'droplet': [P('M12 3.2c3.6 4 6.4 6.9 6.4 10.1a6.4 6.4 0 0 1-12.8 0c0-3.2 2.8-6.1 6.4-10.1Z')],
    'waveform': [P('M2.7 12q1.55-7.5 3.1 0 1.55 6.5 3.1 0 1.55-5.5 3.1 0 1.55 4.5 3.1 0 1.55-3.5 3.1 0 1.55 2.5 3.1 0')],
    'grid': squares3x3(),
    'eye': [P('M2.6 12S6.4 5.8 12 5.8 21.4 12 21.4 12 17.6 18.2 12 18.2 2.6 12 2.6 12Z'), C(12, 12, 3)],

    /* --- 6.3 narzędzia --- */
    'sliders': [L(4, 7, 20, 7), C(9, 7, 2), L(4, 12, 20, 12), C(15, 12, 2), L(4, 17, 20, 17), C(11, 17, 2)],
    'calibrate': [L(3.4, 3.4, 8.6, 12.6), L(3.4, 3.4, 15.4, 12.6), R(4.5, 13, 15, 7, 1.6)],
    'report': [P('M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z'), P('M14 3v5h5'),
      L(9, 17, 9, 13.4), L(12, 17, 12, 11), L(15, 17, 15, 14.6)],
    'export': [L(12, 3.6, 12, 14.4), P('M8 10.6 12 14.6l4-4'), P('M4.6 15.6v3a2 2 0 0 0 2 2h10.8a2 2 0 0 0 2-2v-3')],
    'compare': [R(6.5, 6, 3.6, 11, 1.2), R(13.9, 10, 3.6, 7, 1.2), P('M4.5 18.6v1.9h15v-1.9')],
    'screen': [R(3, 4.5, 18, 12, 2.2), L(12, 16.5, 12, 19.4), L(8.4, 19.4, 15.6, 19.4)],
    'schedule': [R(4, 5.5, 16, 15, 2.5), L(8.5, 3, 8.5, 7), L(15.5, 3, 15.5, 7), L(4, 10, 20, 10), DOT(12, 14.8, 1.2)],
    'bell': [P('M18 16.6V11a6 6 0 1 0-12 0v5.6L4.4 18.6h15.2Z'), P('M9.9 18.6a2.1 2.1 0 0 0 4.2 0')],
    'book': [L(12, 6.5, 12, 19.4), P('M12 6.5C10.4 5 8.4 4.4 4 4.4v12.7c4.4 0 6.4.6 8 2.1'),
      P('M12 6.5c1.6-1.5 3.6-2.1 8-2.1v12.7c-4.4 0-6.4.6-8 2.1')],
    'info': [C(12, 12, 9), L(12, 11.2, 12, 16.4), DOT(12, 7.9, 1.05)],
    'warning': [P('M12 3.6 21.3 19.4a1.6 1.6 0 0 1-1.4 2.4H4.1a1.6 1.6 0 0 1-1.4-2.4Z'),
      L(12, 9.6, 12, 14.4), DOT(12, 17.8, 1.05)],
    'help': [C(12, 12, 9), P('M9.4 9.4a2.7 2.7 0 1 1 3.6 2.6c-.8.3-1.2 1-1.2 1.8v.5'), DOT(11.8, 17.4, 1.05)],
    'flask': [P('M9.5 3.2v5.4L4.4 17.5a2 2 0 0 0 1.7 3h11.8a2 2 0 0 0 1.7-3L14.5 8.6V3.2'),
      L(8.4, 3.2, 15.6, 3.2), L(6.6, 14.4, 17.4, 14.4)],
    'refresh': [P('M20.4 4.4v5h-5'), P('M19.6 14.8A8.2 8.2 0 1 1 17.8 6.2l2.6 3.2')],
    'trash': [L(4.5, 6.5, 19.5, 6.5), P('M9.5 6.5V4.8a1.3 1.3 0 0 1 1.3-1.3h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7'),
      P('M6.5 6.5 7.4 19.7a1.7 1.7 0 0 0 1.7 1.6h5.8a1.7 1.7 0 0 0 1.7-1.6l.9-13.2'),
      L(10.3, 10.4, 10.3, 17), L(13.7, 10.4, 13.7, 17)],
    'share': [C(17.4, 6, 2.6), C(6.6, 12, 2.6), C(17.4, 18, 2.6), L(8.9, 10.7, 15.1, 7.3), L(8.9, 13.3, 15.1, 16.7)],

    /* --- 6.4 ustawienia i konto --- */
    'settings': [P(gearPath(12, 12, 8.4, 6, 6)), C(12, 12, 3)],
    'palette': [P('M12 3.2a8.8 8.8 0 0 0 0 17.6c1.2 0 2-.8 2-1.8 0-.5-.2-.9-.5-1.2-.3-.4-.5-.8-.5-1.3 0-1 .9-1.8 2-1.8h1.6c2.7 0 4.7-2 4.7-4.6 0-3.8-3.7-6.9-9.3-6.9Z'),
      DOT(7.6, 10.2, 1.1), DOT(10.5, 7, 1.1), DOT(14.6, 7.4, 1.1), DOT(17.1, 10.6, 1.1)],
    'contrast': [C(12, 12, 8.6), P('M12 3.4a8.6 8.6 0 0 0 0 17.2Z', FILLED)],
    'text-size': [P('M3.6 15.6 6.8 8.4 10 15.6'), L(4.6, 13.4, 9, 13.4),
      P('M12.6 19.2 17.2 5.6 21.8 19.2'), L(14.2, 14.8, 20.2, 14.8)],
    'motion': [L(4.6, 12, 17.4, 12), P('M13.4 8 17.4 12l-4 4'), L(3, 8, 9, 8), L(3, 16, 9, 16), L(4.5, 20, 19.5, 4)],
    'vibration': [R(8.5, 4, 7, 16, 2), L(4.6, 9.5, 4.6, 14.5), L(2.3, 10.8, 2.3, 13.2),
      L(19.4, 9.5, 19.4, 14.5), L(21.7, 10.8, 21.7, 13.2)],
    'crown': [P('M4.2 18 5.8 7.2l4.1 3.5L12 5.4l2.1 5.3 4.1-3.5L19.8 18Z'), L(4.8, 20.6, 19.2, 20.6)],
    'lock': [R(4.5, 10.5, 15, 10, 2.5), P('M8 10.5V7.6a4 4 0 0 1 8 0v2.9'), DOT(12, 15.5, 1.2)],
    'unlock': [R(4.5, 10.5, 15, 10, 2.5), P('M8 10.5V7.6a4 4 0 0 1 7.8-1.1'), DOT(12, 15.5, 1.2)],
    'star': [P('M12 3.6 14.6 9l5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.8 9.4 9Z')],
    'shield': [P('M12 3 19.5 6v6.2c0 4.3-3 7.2-7.5 8.8-4.5-1.6-7.5-4.5-7.5-8.8V6Z')],
    'sparkle': [P('M9.6 3.4 11.2 8 15.8 9.6 11.2 11.2 9.6 15.8 8 11.2 3.4 9.6 8 8Z'),
      P('M17.6 14 18.5 16.4 20.9 17.3 18.5 18.2 17.6 20.6 16.7 18.2 14.3 17.3 16.7 16.4Z')],
    'mail': [R(3, 5.5, 18, 13, 2.5), P('M3.4 7.2 12 13.2l8.6-6')],
    'user-plus': [C(10, 8.2, 3.4), P('M3.4 19.8a6.6 6.6 0 0 1 13.2 0'),
      L(19.2, 14.6, 19.2, 20.2), L(16.4, 17.4, 22, 17.4)],
    'logout': [P('M9.5 4.5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3.5'), L(10, 12, 20.4, 12), P('M17 8.5 20.4 12 17 15.5')],
    'restore': [P('M3.6 4.4v5h5'), P('M4.4 14.8A8.2 8.2 0 1 0 6.2 6.2L3.6 9.4'), P('M12 8v4.2l3 1.8')],
    'tag': [P('M11.6 3.4H5.4a2 2 0 0 0-2 2v6.2a2 2 0 0 0 .6 1.4l7 7a2 2 0 0 0 2.8 0l6.2-6.2a2 2 0 0 0 0-2.8l-7-7a2 2 0 0 0-1.4-.6Z'),
      C(7.8, 7.8, 1.4)],
    'wallet': [R(3.2, 5.4, 17.6, 13.2, 2.6), P('M3.2 9.4h13.2'),
      P('M16.6 11.4h4.2v3.6h-4.2a1.8 1.8 0 0 1 0-3.6Z'), DOT(18.2, 13.2, .9)],
    'clock': [C(12, 12, 8.6), L(12, 12, 12, 6.4), L(12, 12, 15.9, 14.3)],
    'calendar': [R(3.6, 5, 16.8, 15.4, 2.4), L(3.6, 9.6, 20.4, 9.6),
      DOT(8, 13.4, 1), DOT(12, 13.4, 1), DOT(16, 13.4, 1), DOT(8, 17.2, 1)],

    /* --- 6.5 dostawcy logowania — jedyne kolorowe, jedyne z wypełnieniem --- */
    'brand-google': [
      googleArc(G_YELLOW, 125, 200),
      googleArc(G_RED, 200, 305),
      googleArc(G_BLUE, 305, 360),
      googleArc(G_GREEN, 20, 125),
      R(12.4, 10.4, 7, 3.2, 0, { fill: G_BLUE, stroke: 'none' })
    ],
    'brand-facebook': [
      C(12, 12, 9.4, { fill: FB_BLUE, stroke: 'none' }),
      P('M13.4 20.3v-6.5h2.2l.4-2.6h-2.6V9.5c0-.8.2-1.3 1.3-1.3h1.4V5.8c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v2h-2.3v2.6h2.3v6.4Z',
        { fill: '#FFFFFF', stroke: 'none' })
    ],
    'brand-apple': [
      P('M16.3 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.2 1.3-2.5 1.3-2.5s-2.5-1-2.5-3.6Z', FILLED),
      P('M14.2 5.6c.6-.8 1-1.9.9-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.9 1 .1 2-.5 2.7-1.3Z', FILLED)
    ],
    'brand-mail': [
      R(3, 5.5, 18, 13, 2.5, { fill: 'var(--c-surface-2)' }),
      P('M3.4 7.2 12 13.2l8.6-6')
    ]
  };

  UI.ICONS = [
    'measure', 'history', 'tools', 'account', 'logo', 'menu', 'close',
    'chevron-right', 'chevron-left', 'chevron-down', 'chevron-up',
    'arrow-right', 'arrow-up', 'arrow-down', 'plus', 'minus', 'check', 'check-circle', 'more',
    'play', 'stop', 'camera', 'camera-flip', 'target', 'expand', 'bulb', 'sun', 'moon',
    'thermometer', 'droplet', 'waveform', 'grid', 'eye',
    'sliders', 'calibrate', 'report', 'export', 'compare', 'screen', 'schedule', 'bell',
    'book', 'info', 'warning', 'help', 'flask', 'refresh', 'trash', 'share',
    'settings', 'palette', 'contrast', 'text-size', 'motion', 'vibration', 'crown',
    'lock', 'unlock', 'star', 'shield', 'sparkle', 'mail', 'user-plus', 'logout',
    'restore', 'tag', 'wallet', 'clock', 'calendar',
    'brand-google', 'brand-facebook', 'brand-apple', 'brand-mail'
  ];

  var iconCache = Object.create(null);

  function buildIcon(name) {
    var svg = doc.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.75');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var parts = SHAPES[name];
    if (!parts) return svg;
    for (var i = 0; i < parts.length; i++) {
      var node = doc.createElementNS(SVG_NS, parts[i].tag);
      var attrs = parts[i].attrs;
      for (var key in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, key)) node.setAttribute(key, String(attrs[key]));
      }
      svg.appendChild(node);
    }
    return svg;
  }

  /** icon(name, size, className) — rozmiar zmienia tylko width/height, nigdy
   *  grubości kreski. Nieznana nazwa to pusty <svg class="is-hidden">, nigdy wyjątek. */
  UI.icon = function (name, size, className) {
    var known = !!SHAPES[name];
    if (!iconCache[name]) iconCache[name] = buildIcon(name);
    var svg = iconCache[name].cloneNode(true);
    var px = String(size || 24);
    svg.setAttribute('width', px);
    svg.setAttribute('height', px);
    var cls = className || '';
    if (!known) cls = cls ? cls + ' is-hidden' : 'is-hidden';
    if (cls) svg.setAttribute('class', cls);
    return svg;
  };

  /* ==================================================================
     4. Atomy: przycisk, chip, plakietka, sekcja, karta
     ================================================================== */

  var BTN_VARIANTS = { primary: 1, tonal: 1, ghost: 1, danger: 1, premium: 1 };
  var BTN_SIZES = { sm: 1, md: 1, lg: 1 };

  /** button({label, variant, icon, onClick, size, full, disabled, ariaLabel, iconRight, className})
   *  Zwraca <button> z trzema metodami: setLabel, setLoading, setDisabled. */
  UI.button = function (opts) {
    var o = opts || {};
    var variant = BTN_VARIANTS[o.variant] ? o.variant : 'tonal';
    var size = BTN_SIZES[o.size] ? o.size : 'md';
    var label = text(o.label);
    var iconName = o.icon || (variant === 'premium' && !o.noIcon ? 'crown' : '');
    var cls = 'ms4-btn ms4-btn--' + variant + ' ms4-btn--' + size;
    if (!label) cls += ' ms4-btn--icon';
    if (o.full) cls += ' ms4-btn--full';
    if (o.className) cls += ' ' + o.className;

    var btn = UI.el('button', cls);
    btn.type = o.type || 'button';

    var iconSize = size === 'sm' ? 20 : 24;
    var iconNode = null;
    if (iconName && !o.iconRight) {
      iconNode = UI.icon(iconName, iconSize, 'ms4-btn__icon');
      btn.appendChild(iconNode);
    }
    var labelNode = null;
    if (label) {
      labelNode = UI.el('span', 'ms4-btn__label', label);
      btn.appendChild(labelNode);
    }
    if (iconName && o.iconRight) {
      iconNode = UI.icon(iconName, iconSize, 'ms4-btn__icon');
      btn.appendChild(iconNode);
    }

    var aria = o.ariaLabel || (!label ? o.title : '');
    if (aria) btn.setAttribute('aria-label', aria);
    if (o.title) btn.setAttribute('title', o.title);
    if (o.disabled) {
      btn.disabled = true;
      addClass(btn, 'is-disabled');
    }
    if (typeof o.onClick === 'function') UI.on(btn, 'click', o.onClick);

    var spinner = null;
    btn.setLabel = function (t) {
      if (!labelNode) {
        labelNode = UI.el('span', 'ms4-btn__label');
        btn.appendChild(labelNode);
        /* Przycisk przestał być czysto ikonowy — zdejmujemy kwadratowy rozmiar. */
        btn.classList.remove('ms4-btn--icon');
      }
      labelNode.textContent = text(t);
    };
    btn.setDisabled = function (state) {
      btn.disabled = !!state;
      if (state) addClass(btn, 'is-disabled');
      else btn.classList.remove('is-disabled');
    };
    btn.setLoading = function (state) {
      if (state) {
        if (!spinner) {
          spinner = UI.el('span', 'ms4-spinner');
          spinner.setAttribute('aria-hidden', 'true');
          btn.appendChild(spinner);
        }
        addClass(btn, 'is-loading');
        btn.setAttribute('aria-busy', 'true');
        btn.disabled = true;
      } else {
        if (spinner && spinner.parentNode) spinner.parentNode.removeChild(spinner);
        spinner = null;
        btn.classList.remove('is-loading');
        btn.removeAttribute('aria-busy');
        btn.disabled = !!o.disabled;
      }
    };
    return btn;
  };

  var TONES = { good: 1, warn: 1, crit: 1, premium: 1, demo: 1, info: 1 };

  /** chip({label, icon, tone, selectable, selected, onClick, ariaLabel}) */
  UI.chip = function (opts) {
    var o = opts || {};
    var cls = 'ms4-chip';
    if (TONES[o.tone]) cls += ' ms4-chip--' + o.tone;
    var clickable = typeof o.onClick === 'function' || o.selectable;
    if (clickable) cls += ' ms4-chip--selectable';
    if (o.selected) cls += ' is-selected';
    if (o.className) cls += ' ' + o.className;

    var node = UI.el(clickable ? 'button' : 'span', cls);
    if (clickable) {
      node.type = 'button';
      node.setAttribute('aria-pressed', o.selected ? 'true' : 'false');
    }
    var iconName = o.icon || (o.tone === 'premium' ? 'crown' : (o.tone === 'demo' ? 'flask' : ''));
    if (iconName) node.appendChild(UI.icon(iconName, 16, 'ms4-chip__icon'));
    node.appendChild(UI.el('span', 'ms4-chip__label', text(o.label)));
    if (o.ariaLabel) node.setAttribute('aria-label', o.ariaLabel);
    if (typeof o.onClick === 'function') UI.on(node, 'click', o.onClick);

    node.setSelected = function (state) {
      if (state) addClass(node, 'is-selected');
      else node.classList.remove('is-selected');
      if (clickable) node.setAttribute('aria-pressed', state ? 'true' : 'false');
    };
    return node;
  };

  /** badge({label, tone, dot, icon}) — plakietka nieklikalna. */
  UI.badge = function (opts) {
    var o = opts || {};
    var cls = 'ms4-badge';
    if (TONES[o.tone]) cls += ' ms4-badge--' + o.tone;
    if (o.dot) cls += ' ms4-badge--dot';
    if (o.className) cls += ' ' + o.className;
    var node = UI.el('span', cls);
    if (o.icon) node.appendChild(UI.icon(o.icon, 16, 'ms4-badge__icon'));
    node.appendChild(doc.createTextNode(text(o.label)));
    return node;
  };

  /** section(titlePL, subtitle, action) — nagłówek grupy treści.
   *  action: węzeł albo {label, onClick}. */
  UI.section = function (titlePL, subtitle, action) {
    var root = UI.el('div', 'ms4-section');
    root.appendChild(UI.el('h2', 'ms4-section__title', text(titlePL)));
    if (subtitle) root.appendChild(UI.el('p', 'ms4-section__sub', text(subtitle)));
    if (action) {
      if (action.nodeType) {
        addClass(action, 'ms4-section__action');
        root.appendChild(action);
      } else {
        var btn = UI.el('button', 'ms4-section__action', text(action.label));
        btn.type = 'button';
        if (typeof action.onClick === 'function') UI.on(btn, 'click', action.onClick);
        root.appendChild(btn);
      }
    }
    return root;
  };

  /** card({title, subtitle, actions, className, body}) -> {root, header, body} */
  UI.card = function (opts) {
    var o = opts || {};
    var root = UI.el('section', 'ms4-card' + (o.className ? ' ' + o.className : ''));
    var header = null;
    if (o.title || o.subtitle || o.actions) {
      header = UI.el('div', 'ms4-card__header');
      var titles = UI.el('div', 'ms4-card__titles');
      if (o.title) {
        var h = UI.el('h2', 'ms4-card__title', text(o.title));
        h.id = uid('card-title');
        titles.appendChild(h);
        root.setAttribute('aria-labelledby', h.id);
      }
      if (o.subtitle) titles.appendChild(UI.el('p', 'ms4-card__subtitle', text(o.subtitle)));
      header.appendChild(titles);
      if (o.actions) {
        var box = UI.el('div', 'ms4-card__actions');
        put(box, o.actions);
        header.appendChild(box);
      }
      root.appendChild(header);
    }
    var body = UI.el('div', 'ms4-card__body');
    if (o.body) put(body, o.body);
    root.appendChild(body);
    return { root: root, header: header, body: body };
  };

  /* ==================================================================
     5. Formanty: wiersz, segmenty, przełącznik, suwak, stan pusty
     ================================================================== */

  /** row({icon, title, subtitle, value, onClick, chevron, control, danger, selected, disabled}) */
  UI.row = function (opts) {
    var o = opts || {};
    var clickable = typeof o.onClick === 'function';
    var cls = 'ms4-row';
    if (o.danger) cls += ' ms4-row--danger';
    if (o.selected) cls += ' is-selected';
    if (o.disabled) cls += ' is-disabled';
    if (o.className) cls += ' ' + o.className;

    var root = UI.el(clickable ? 'button' : 'div', cls);
    if (clickable) {
      root.type = 'button';
      if (o.disabled) root.disabled = true;
      UI.on(root, 'click', o.onClick);
    }

    if (o.icon) {
      var wrap = UI.el('span', 'ms4-row__icon' + (o.danger ? ' ms4-row__icon--danger' : ''));
      wrap.appendChild(UI.icon(o.icon, 24));
      root.appendChild(wrap);
    }

    var col = UI.el('span', 'ms4-row__text');
    var titleNode = UI.el('span', 'ms4-row__title', text(o.title));
    col.appendChild(titleNode);
    var subNode = null;
    if (o.subtitle) {
      subNode = UI.el('span', 'ms4-row__subtitle', text(o.subtitle));
      col.appendChild(subNode);
    }
    root.appendChild(col);

    var valueNode = null;
    if (o.value !== undefined && o.value !== null && o.value !== '') {
      valueNode = UI.el('span', 'ms4-row__value', text(o.value));
      root.appendChild(valueNode);
    }
    // Wszystko, co stoi ZA wartością: dopisana później wartość musi trafić przed to,
    // inaczej liczba wylądowałaby za strzałką albo za przełącznikiem.
    var tail = null;
    if (o.control) {
      tail = UI.el('span', 'ms4-row__control');
      put(tail, o.control);
      root.appendChild(tail);
    }
    if (o.chevron) {
      var chev = UI.icon('chevron-right', 20, 'ms4-row__chevron');
      root.appendChild(chev);
      if (!tail) tail = chev;
    }
    if (o.selected) {
      root.setAttribute('aria-current', 'true');
      var check = UI.icon('check', 20, 'ms4-row__check');
      root.appendChild(check);
      if (!tail) tail = check;
    }
    if (o.ariaLabel) root.setAttribute('aria-label', o.ariaLabel);

    root.setValue = function (v) {
      if (!valueNode) {
        valueNode = UI.el('span', 'ms4-row__value');
        if (tail) root.insertBefore(valueNode, tail);
        else root.appendChild(valueNode);
      }
      valueNode.textContent = text(v);
    };
    root.setSubtitle = function (v) {
      if (!subNode) {
        subNode = UI.el('span', 'ms4-row__subtitle');
        col.appendChild(subNode);
      }
      subNode.textContent = text(v);
    };
    return root;
  };

  function normOptions(list) {
    var out = [];
    if (!list) return out;
    for (var i = 0; i < list.length; i++) {
      var it = list[i];
      if (it === null || it === undefined) continue;
      if (typeof it === 'string' || typeof it === 'number') {
        out.push({ value: it, label: String(it) });
      } else {
        out.push({
          value: it.value !== undefined ? it.value : it.id,
          label: text(it.label !== undefined ? it.label : it.labelPL),
          icon: it.icon || '',
          ariaLabel: it.ariaLabel || '',
          disabled: !!it.disabled
        });
      }
    }
    return out;
  }

  /** segmented({options, value, onChange, full, ariaLabel})
   *  radiogroup z roving tabindex: strzałki zmieniają wybór, Home/End skaczą na skraje. */
  UI.segmented = function (opts) {
    var o = opts || {};
    var options = normOptions(o.options);
    var value = o.value;
    var cls = 'ms4-segmented' + (o.full ? ' ms4-segmented--full' : '') + (o.className ? ' ' + o.className : '');
    var root = UI.el('div', cls);
    root.setAttribute('role', 'radiogroup');
    if (o.ariaLabel) root.setAttribute('aria-label', o.ariaLabel);

    var thumb = UI.el('span', 'ms4-segmented__thumb');
    thumb.setAttribute('aria-hidden', 'true');
    root.appendChild(thumb);

    var buttons = [];

    function indexOfValue(v) {
      for (var i = 0; i < options.length; i++) {
        if (options[i].value === v) return i;
      }
      return -1;
    }

    function moveThumb() {
      var i = indexOfValue(value);
      if (i < 0 || !buttons[i]) {
        thumb.style.opacity = '0';
        return;
      }
      var b = buttons[i];
      thumb.style.opacity = '';
      thumb.style.width = b.offsetWidth + 'px';
      thumb.style.transform = 'translateX(' + b.offsetLeft + 'px)';
    }

    function paint() {
      for (var i = 0; i < buttons.length; i++) {
        var on = options[i].value === value;
        buttons[i].setAttribute('aria-checked', on ? 'true' : 'false');
        buttons[i].tabIndex = on ? 0 : -1;
        if (on) addClass(buttons[i], 'is-active');
        else buttons[i].classList.remove('is-active');
      }
      if (indexOfValue(value) < 0 && buttons.length) buttons[0].tabIndex = 0;
      if (global.requestAnimationFrame) global.requestAnimationFrame(moveThumb);
      else moveThumb();
    }

    function select(i, focus) {
      var opt = options[i];
      if (!opt || opt.disabled) return;
      var changed = opt.value !== value;
      value = opt.value;
      paint();
      if (focus && buttons[i]) buttons[i].focus();
      if (changed && typeof o.onChange === 'function') o.onChange(value, opt);
    }

    function step(from, dir) {
      var n = options.length;
      var i = from;
      for (var guard = 0; guard < n; guard++) {
        i = (i + dir + n) % n;
        if (!options[i].disabled) return i;
      }
      return from;
    }

    options.forEach(function (opt, i) {
      var b = UI.el('button', 'ms4-segmented__option');
      b.type = 'button';
      b.setAttribute('role', 'radio');
      if (opt.icon) b.appendChild(UI.icon(opt.icon, 20, 'ms4-segmented__icon'));
      b.appendChild(doc.createTextNode(opt.label));
      if (opt.ariaLabel) b.setAttribute('aria-label', opt.ariaLabel);
      if (opt.disabled) {
        b.disabled = true;
        addClass(b, 'is-disabled');
      }
      UI.on(b, 'click', function () { select(i, false); });
      UI.on(b, 'keydown', function (ev) {
        var key = ev.key;
        if (key === 'ArrowRight' || key === 'ArrowDown') { ev.preventDefault(); select(step(i, 1), true); }
        else if (key === 'ArrowLeft' || key === 'ArrowUp') { ev.preventDefault(); select(step(i, -1), true); }
        else if (key === 'Home') { ev.preventDefault(); select(step(options.length - 1, 1), true); }
        else if (key === 'End') { ev.preventDefault(); select(step(0, -1), true); }
      });
      buttons.push(b);
      root.appendChild(b);
    });

    paint();

    // Pigułka pod segmentem zależy od rzeczywistej szerokości tekstu, więc trzeba
    // ją przeliczyć po zmianie rozmiaru okna i po zmianie skali tekstu.
    var offResize = UI.on(global, 'resize', function () {
      if (global.requestAnimationFrame) global.requestAnimationFrame(moveThumb);
      else moveThumb();
    });
    var ro = null;
    if (global.ResizeObserver) {
      ro = new global.ResizeObserver(function () { moveThumb(); });
      ro.observe(root);
    }

    root.getValue = function () { return value; };
    root.setValue = function (v) {
      var i = indexOfValue(v);
      if (i < 0) return;
      value = v;
      paint();
    };
    root.refresh = moveThumb;
    root.destroy = function () {
      offResize();
      if (ro) ro.disconnect();
    };
    return root;
  };

  /** switch({label, checked, onChange, ariaLabel}) — prawdziwy role="switch". */
  UI['switch'] = function (opts) {
    var o = opts || {};
    var checked = !!o.checked;
    var root = UI.el('button', 'ms4-switch' + (checked ? ' is-checked' : '') + (o.className ? ' ' + o.className : ''));
    root.type = 'button';
    root.setAttribute('role', 'switch');
    root.setAttribute('aria-checked', checked ? 'true' : 'false');
    if (o.label) root.appendChild(UI.el('span', 'ms4-switch__label', text(o.label)));
    else if (o.ariaLabel) root.setAttribute('aria-label', o.ariaLabel);
    var track = UI.el('span', 'ms4-switch__track');
    track.setAttribute('aria-hidden', 'true');
    track.appendChild(UI.el('span', 'ms4-switch__thumb'));
    root.appendChild(track);
    if (o.disabled) {
      root.disabled = true;
      addClass(root, 'is-disabled');
    }

    function apply(state, notify) {
      checked = !!state;
      root.setAttribute('aria-checked', checked ? 'true' : 'false');
      if (checked) addClass(root, 'is-checked');
      else root.classList.remove('is-checked');
      if (notify && typeof o.onChange === 'function') o.onChange(checked);
    }

    UI.on(root, 'click', function () { apply(!checked, true); });

    root.isChecked = function () { return checked; };
    root.set = function (state) { apply(state, false); };
    return root;
  };

  /** slider({label, min, max, step, value, onChange, format, ariaLabel})
   *  Natywny <input type="range"> — strzałki, PageUp/PageDown i Home/End
   *  działają bez jednej linii naszego kodu; my dokładamy tylko aria-valuetext. */
  UI.slider = function (opts) {
    var o = opts || {};
    var min = typeof o.min === 'number' ? o.min : 0;
    var max = typeof o.max === 'number' ? o.max : 100;
    var stp = typeof o.step === 'number' ? o.step : 1;
    var value = typeof o.value === 'number' ? o.value : min;
    var format = typeof o.format === 'function' ? o.format : function (v) { return String(v); };

    var root = UI.el('div', 'ms4-slider' + (o.className ? ' ' + o.className : ''));
    var head = UI.el('div', 'ms4-slider__head');
    var labelNode = UI.el('span', 'ms4-slider__label', text(o.label));
    var valueNode = UI.el('span', 'ms4-slider__value', format(value));
    head.appendChild(labelNode);
    head.appendChild(valueNode);
    root.appendChild(head);

    var input = doc.createElement('input');
    input.type = 'range';
    input.className = 'ms4-slider__input';
    input.min = String(min);
    input.max = String(max);
    input.step = String(stp);
    input.value = String(value);
    input.id = uid('slider');
    labelNode.id = input.id + '-label';
    input.setAttribute('aria-labelledby', labelNode.id);
    if (o.ariaLabel) input.setAttribute('aria-label', o.ariaLabel);
    input.setAttribute('aria-valuetext', format(value));
    if (o.disabled) {
      input.disabled = true;
      addClass(root, 'is-disabled');
    }
    root.appendChild(input);

    function read() {
      var v = parseFloat(input.value);
      return isNaN(v) ? min : v;
    }

    function paint(v) {
      var t = format(v);
      valueNode.textContent = t;
      input.setAttribute('aria-valuetext', t);
    }

    UI.on(input, 'input', function () {
      value = read();
      paint(value);
      if (typeof o.onChange === 'function') o.onChange(value);
    });

    root.getValue = function () { return value; };
    root.setValue = function (v) {
      value = typeof v === 'number' ? v : min;
      input.value = String(value);
      paint(value);
    };
    root.input = input;
    return root;
  };

  /** empty({icon, title, text, action}) — action: węzeł albo {label, onClick}. */
  UI.empty = function (opts) {
    var o = opts || {};
    var root = UI.el('div', 'ms4-empty' + (o.className ? ' ' + o.className : ''));
    var box = UI.el('div', 'ms4-empty__icon');
    box.appendChild(UI.icon(o.icon || 'info', 56));
    root.appendChild(box);
    if (o.title) root.appendChild(UI.el('h3', 'ms4-empty__title', text(o.title)));
    if (o.text) root.appendChild(UI.el('p', 'ms4-empty__text', text(o.text)));
    if (o.action) {
      if (o.action.nodeType) {
        addClass(o.action, 'ms4-empty__action');
        root.appendChild(o.action);
      } else {
        root.appendChild(UI.button({
          label: o.action.label,
          variant: o.action.variant || 'tonal',
          icon: o.action.icon,
          onClick: o.action.onClick,
          size: 'md',
          className: 'ms4-empty__action'
        }));
      }
    }
    return root;
  };

  /* ==================================================================
     6. Warstwy modalne: blokada tła, stos, pułapka fokusu
     ================================================================== */

  var layers = [];          // stos arkuszy i okien; ostatni element jest na wierzchu
  var scrollLocks = 0;
  var lockedPadding = '';

  function host(id, className) {
    var node = doc.getElementById(id);
    if (node) return node;
    // Bezpiecznik na wypadek strony bez pełnego szkieletu z rozdziału 4.3.
    node = UI.el('div', className);
    node.id = id;
    if (doc.body) doc.body.appendChild(node);
    return node;
  }

  function applyLock(on) {
    var html = doc.documentElement;
    if (on) {
      var gap = global.innerWidth - html.clientWidth;
      lockedPadding = doc.body.style.paddingRight;
      if (gap > 0) doc.body.style.paddingRight = gap + 'px';
      html.style.overflow = 'hidden';
    } else {
      html.style.overflow = '';
      doc.body.style.paddingRight = lockedPadding;
    }
  }

  /** Licznik, nie flaga: dwa arkusze jeden na drugim zdejmują blokadę dopiero
   *  wtedy, gdy zamknie się ten drugi. */
  UI.lockScroll = function (on) {
    if (on) {
      scrollLocks += 1;
      if (scrollLocks === 1) applyLock(true);
    } else {
      scrollLocks = Math.max(0, scrollLocks - 1);
      if (scrollLocks === 0) applyLock(false);
    }
  };

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]),' +
    ' textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function focusables(root) {
    var all = root.querySelectorAll(FOCUSABLE);
    var out = [];
    for (var i = 0; i < all.length; i++) {
      var n = all[i];
      if (n.offsetWidth || n.offsetHeight || n.getClientRects().length) out.push(n);
    }
    return out;
  }

  function trapTab(ev, root) {
    var items = focusables(root);
    if (!items.length) {
      ev.preventDefault();
      root.focus();
      return;
    }
    var first = items[0];
    var last = items[items.length - 1];
    var active = doc.activeElement;
    if (ev.shiftKey && (active === first || !root.contains(active))) {
      ev.preventDefault();
      last.focus();
    } else if (!ev.shiftKey && active === last) {
      ev.preventDefault();
      first.focus();
    }
  }

  function scrimNode() {
    return host('scrim', 'ms4-scrim');
  }

  function updateScrim() {
    var scrim = scrimNode();
    if (layers.length) {
      scrim.hidden = false;
      // Krycie animuje się dopiero po wstawieniu do układu, stąd rAF.
      if (global.requestAnimationFrame) global.requestAnimationFrame(function () { addClass(scrim, 'is-open'); });
      else addClass(scrim, 'is-open');
    } else {
      scrim.classList.remove('is-open');
      scrim.hidden = true;
    }
  }

  function updateBackground() {
    var appRoot = doc.getElementById('appRoot');
    if (!appRoot) return;
    if (layers.length) appRoot.setAttribute('aria-hidden', 'true');
    else appRoot.removeAttribute('aria-hidden');
  }

  function markStack() {
    for (var i = 0; i < layers.length; i++) {
      var top = i === layers.length - 1;
      if (top) layers[i].root.removeAttribute('aria-hidden');
      else layers[i].root.setAttribute('aria-hidden', 'true');
    }
  }

  function pushLayer(entry) {
    entry.restoreFocus = doc.activeElement && doc.activeElement !== doc.body ? doc.activeElement : null;
    layers.push(entry);
    UI.lockScroll(true);
    updateScrim();
    markStack();
  }

  function popLayer(entry) {
    var i = layers.indexOf(entry);
    if (i === -1) return;
    layers.splice(i, 1);
    UI.lockScroll(false);
    updateScrim();
    markStack();
    updateBackground();
    if (entry.restoreFocus && doc.contains(entry.restoreFocus)) {
      try { entry.restoreFocus.focus(); } catch (e) { /* element mógł zniknąć razem z widokiem */ }
    }
  }

  function focusInto(entry) {
    var items = focusables(entry.root);
    var target = entry.initialFocus || (items.length ? items[0] : entry.root);
    try { target.focus(); } catch (e) { /* nic — fokus zostaje tam, gdzie był */ }
    updateBackground();
  }

  /** Jedna nasłuchiwaczka na całą aplikację obsługuje Escape i pułapkę Tab
   *  dla warstwy stojącej na wierzchu stosu. */
  doc.addEventListener('keydown', function (ev) {
    if (!layers.length) return;
    var top = layers[layers.length - 1];
    if (ev.key === 'Escape' || ev.key === 'Esc') {
      if (top.dismissible === false) return;
      ev.preventDefault();
      top.requestClose('escape');
    } else if (ev.key === 'Tab') {
      trapTab(ev, top.root);
    }
  }, true);

  UI.on(scrimNode(), 'click', function () {
    if (!layers.length) return;
    var top = layers[layers.length - 1];
    if (top.dismissible === false) return;
    top.requestClose('scrim');
  });

  /** Zamknięcie z animacją: czekamy na transitionend, a gdyby przejścia nie było
   *  (ograniczony ruch, brak CSS) — na krótki bezpiecznik czasowy. */
  function finishLater(root, done) {
    var called = false;
    function once() {
      if (called) return;
      called = true;
      root.removeEventListener('transitionend', onEnd);
      global.clearTimeout(timer);
      done();
    }
    function onEnd(ev) {
      if (ev.target === root) once();
    }
    root.addEventListener('transitionend', onEnd);
    var timer = global.setTimeout(once, 420);
  }

  /* ---------- Arkusz ---------- */

  function isPhoneLayout() {
    if (!global.matchMedia) return true;
    return global.matchMedia('(max-width: 1023.98px)').matches;
  }

  /** sheet({title, subtitle, size:'auto'|'full', body, actions, onClose, dismissible,
   *         ariaLabel, className, initialFocus}) -> {root, header, body, actions, close} */
  UI.sheet = function (opts) {
    var o = opts || {};
    var size = o.size === 'full' ? 'full' : 'auto';
    var root = UI.el('div', 'ms4-sheet ms4-sheet--' + size + (o.className ? ' ' + o.className : ''));
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.tabIndex = -1;

    var grip = UI.el('div', 'ms4-sheet__grip');
    grip.setAttribute('aria-hidden', 'true');
    root.appendChild(grip);

    var header = UI.el('div', 'ms4-sheet__header');
    var titles = UI.el('div', 'ms4-sheet__titles');
    if (o.title) {
      var h = UI.el('h2', 'ms4-sheet__title', text(o.title));
      h.id = uid('sheet-title');
      titles.appendChild(h);
      root.setAttribute('aria-labelledby', h.id);
    } else {
      root.setAttribute('aria-label', o.ariaLabel || UI.T.aria.closeSheet);
    }
    if (o.subtitle) titles.appendChild(UI.el('p', 'ms4-sheet__subtitle', text(o.subtitle)));
    header.appendChild(titles);

    var closeBtn = UI.button({
      variant: 'ghost',
      size: 'md',
      icon: 'close',
      ariaLabel: UI.T.aria.closeSheet,
      className: 'ms4-sheet__close',
      onClick: function () { entry.requestClose('button'); }
    });
    header.appendChild(closeBtn);
    root.appendChild(header);

    var body = UI.el('div', 'ms4-sheet__body');
    if (o.body) put(body, o.body);
    root.appendChild(body);

    var actionsBar = null;
    if (o.actions) {
      actionsBar = UI.el('div', 'ms4-sheet__actions');
      put(actionsBar, o.actions);
      root.appendChild(actionsBar);
    }

    var entry = {
      root: root,
      dismissible: o.dismissible !== false,
      initialFocus: o.initialFocus || null,
      closing: false,
      requestClose: function (reason) { closeSheet(reason); }
    };

    function closeSheet(reason) {
      if (entry.closing) return;
      entry.closing = true;
      stopDrag(true);
      root.classList.remove('is-open');
      root.style.transform = '';
      finishLater(root, function () {
        if (root.parentNode) root.parentNode.removeChild(root);
        popLayer(entry);
        if (typeof o.onClose === 'function') o.onClose(reason || 'close');
      });
    }

    /* --- przeciągnięcie w dół zamyka arkusz na telefonie --- */
    var dragging = false;
    var startY = 0;
    var startT = 0;
    var offset = 0;
    var pointerId = null;

    function dragTargetOk(target) {
      if (target === grip || grip.contains(target)) return true;
      if (header.contains(target)) return !closeBtn.contains(target);
      return false;
    }

    function onDown(ev) {
      if (!isPhoneLayout() || dragging || entry.closing) return;
      if (ev.button !== undefined && ev.button !== 0) return;
      if (!dragTargetOk(ev.target)) return;
      dragging = true;
      startY = ev.clientY;
      startT = Date.now();
      offset = 0;
      pointerId = ev.pointerId;
      root.style.transition = 'none';
      if (root.setPointerCapture && pointerId !== undefined) {
        try { root.setPointerCapture(pointerId); } catch (e) { /* przeglądarka bez capture */ }
      }
    }

    function onMove(ev) {
      if (!dragging) return;
      offset = Math.max(0, ev.clientY - startY);
      root.style.transform = offset ? 'translateY(' + offset + 'px)' : '';
      if (offset > 4 && ev.cancelable) ev.preventDefault();
    }

    function onUp() {
      if (!dragging) return;
      var height = root.offsetHeight || 1;
      var speed = offset / Math.max(1, Date.now() - startT);
      var far = offset > height * 0.28 || speed > 0.7;
      stopDrag(false);
      if (far && entry.dismissible) closeSheet('drag');
    }

    function stopDrag(silent) {
      if (!dragging) return;
      dragging = false;
      if (root.releasePointerCapture && pointerId !== undefined && pointerId !== null) {
        try { root.releasePointerCapture(pointerId); } catch (e) { /* jw. */ }
      }
      pointerId = null;
      root.style.transition = '';
      if (!silent) root.style.transform = '';
    }

    if (global.PointerEvent) {
      UI.on(root, 'pointerdown', onDown);
      UI.on(root, 'pointermove', onMove);
      UI.on(root, 'pointerup', onUp);
      UI.on(root, 'pointercancel', function () { stopDrag(false); });
    }

    host('sheetHost', 'ms4-sheet-host').appendChild(root);
    pushLayer(entry);
    if (global.requestAnimationFrame) {
      global.requestAnimationFrame(function () {
        addClass(root, 'is-open');
        focusInto(entry);
      });
    } else {
      addClass(root, 'is-open');
      focusInto(entry);
    }

    return {
      root: root,
      header: header,
      body: body,
      actions: actionsBar,
      close: function (reason) { closeSheet(reason || 'api'); }
    };
  };

  /* ---------- Okno dialogowe ---------- */

  /** dialog({title, text, confirm, cancel, tone}) -> Promise<boolean> */
  UI.dialog = function (opts) {
    var o = opts || {};
    return new Promise(function (resolve) {
      var danger = o.tone === 'danger' || o.tone === 'crit';
      var root = UI.el('div', 'ms4-dialog' + (danger ? ' ms4-dialog--danger' : ''));
      root.setAttribute('role', 'alertdialog');
      root.setAttribute('aria-modal', 'true');
      root.tabIndex = -1;

      if (o.title) {
        var h = UI.el('h2', 'ms4-dialog__title', text(o.title));
        h.id = uid('dialog-title');
        root.appendChild(h);
        root.setAttribute('aria-labelledby', h.id);
      }
      if (o.text) {
        var p = UI.el('p', 'ms4-dialog__text', text(o.text));
        p.id = uid('dialog-text');
        root.appendChild(p);
        root.setAttribute('aria-describedby', p.id);
        if (!o.title) root.setAttribute('aria-label', text(o.text));
      }

      var bar = UI.el('div', 'ms4-dialog__actions');
      var cancelBtn = UI.button({
        label: o.cancel || UI.T.confirm.cancel,
        variant: 'ghost',
        size: 'md',
        onClick: function () { done(false); }
      });
      var confirmBtn = UI.button({
        label: o.confirm || UI.T.confirm.yes,
        variant: danger ? 'danger' : 'primary',
        size: 'md',
        onClick: function () { done(true); }
      });
      bar.appendChild(cancelBtn);
      bar.appendChild(confirmBtn);
      root.appendChild(bar);

      var entry = {
        root: root,
        dismissible: o.dismissible !== false,
        initialFocus: danger ? cancelBtn : confirmBtn,
        requestClose: function () { done(false); }
      };

      var settled = false;
      function done(answer) {
        if (settled) return;
        settled = true;
        root.classList.remove('is-open');
        finishLater(root, function () {
          if (root.parentNode) root.parentNode.removeChild(root);
          popLayer(entry);
          resolve(!!answer);
        });
      }

      host('dialogHost', 'ms4-dialog-host').appendChild(root);
      pushLayer(entry);
      if (global.requestAnimationFrame) {
        global.requestAnimationFrame(function () {
          addClass(root, 'is-open');
          focusInto(entry);
        });
      } else {
        addClass(root, 'is-open');
        focusInto(entry);
      }
    });
  };

  /* ---------- Toasty ---------- */

  var TOAST_ICON = { good: 'check-circle', warn: 'warning', crit: 'warning', info: 'info' };
  var toastQueue = [];
  var toastLive = [];
  var TOAST_MAX = 3;

  function toastDuration(tone, given) {
    if (typeof given === 'number' && given > 0) return given;
    return tone === 'crit' ? 7000 : 4000;
  }

  function showToast(item) {
    var node = UI.el('div', 'ms4-toast' + (TONES[item.tone] ? ' ms4-toast--' + item.tone : ''));
    if (TOAST_ICON[item.tone]) node.appendChild(UI.icon(TOAST_ICON[item.tone], 20, 'ms4-toast__icon'));
    node.appendChild(UI.el('p', 'ms4-toast__text', item.text));

    if (item.action && item.action.label) {
      var btn = UI.el('button', 'ms4-toast__action', text(item.action.label));
      btn.type = 'button';
      UI.on(btn, 'click', function () {
        if (typeof item.action.onClick === 'function') item.action.onClick();
        hide();
      });
      node.appendChild(btn);
    }

    host('toasts', 'ms4-toasts').appendChild(node);
    if (global.requestAnimationFrame) global.requestAnimationFrame(function () { addClass(node, 'is-open'); });
    else addClass(node, 'is-open');

    var timer = global.setTimeout(hide, toastDuration(item.tone, item.duration));
    var gone = false;

    function hide() {
      if (gone) return;
      gone = true;
      global.clearTimeout(timer);
      node.classList.remove('is-open');
      finishLater(node, function () {
        if (node.parentNode) node.parentNode.removeChild(node);
        var i = toastLive.indexOf(entry);
        if (i > -1) toastLive.splice(i, 1);
        pump();
      });
    }

    var entry = { node: node, hide: hide };
    toastLive.push(entry);
    return entry;
  }

  function pump() {
    while (toastLive.length < TOAST_MAX && toastQueue.length) {
      var item = toastQueue.shift();
      if (item.cancelled) continue;
      item.live = showToast(item);
    }
  }

  /** toast(text, tone, {action:{label,onClick}, duration}) — kolejka, maksymalnie
   *  trzy naraz, znikanie po 4 s (7 s dla tonu krytycznego). */
  UI.toast = function (message, tone, extra) {
    var o = extra || {};
    var item = {
      text: text(typeof message === 'object' && message ? message.text : message),
      tone: (typeof message === 'object' && message ? message.tone : tone) || '',
      action: o.action || (typeof message === 'object' && message ? message.action : null),
      duration: o.duration,
      cancelled: false,
      live: null
    };
    if (!item.text) return { dismiss: function () {} };
    toastQueue.push(item);
    pump();
    return {
      dismiss: function () {
        item.cancelled = true;
        if (item.live) item.live.hide();
      }
    };
  };

  /* ---------- Komunikat dla czytnika ekranu ---------- */

  var lastAnnounce = 0;
  var pendingAnnounce = null;
  var announceTimer = null;

  function writeLive(t) {
    var node = doc.getElementById('live');
    if (!node) return;
    // Czytniki ignorują powtórzenie tego samego napisu, więc najpierw czyścimy pole.
    node.textContent = '';
    global.setTimeout(function () { node.textContent = t; }, 60);
    lastAnnounce = Date.now();
  }

  /** announce(text) — dławione do jednego komunikatu na 2 s (SPEC 8.2).
   *  Nigdy nie wołane w pętli próbek. */
  UI.announce = function (t) {
    var msg = text(t);
    if (!msg) return;
    var wait = 2000 - (Date.now() - lastAnnounce);
    if (wait <= 0) {
      writeLive(msg);
      return;
    }
    pendingAnnounce = msg;
    if (announceTimer) return;
    announceTimer = global.setTimeout(function () {
      announceTimer = null;
      if (pendingAnnounce) {
        writeLive(pendingAnnounce);
        pendingAnnounce = null;
      }
    }, wait);
  };

  /* ==================================================================
     7. Formatowanie i strefy
     ================================================================== */

  var dateFmt = null;
  var timeFmt = null;

  function intl(kind) {
    if (!global.Intl || !global.Intl.DateTimeFormat) return null;
    try {
      if (kind === 'date') {
        return new global.Intl.DateTimeFormat('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
      }
      return new global.Intl.DateTimeFormat('pl-PL', { hour: '2-digit', minute: '2-digit', hour12: false });
    } catch (e) {
      return null;
    }
  }

  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }

  UI.fmtDate = function (ts) {
    var d = new Date(ts);
    if (isNaN(d.getTime())) return '';
    if (dateFmt === null) dateFmt = intl('date');
    if (dateFmt) return dateFmt.format(d);
    return pad2(d.getDate()) + '.' + pad2(d.getMonth() + 1) + '.' + d.getFullYear();
  };

  UI.fmtTime = function (ts) {
    var d = new Date(ts);
    if (isNaN(d.getTime())) return '';
    if (timeFmt === null) timeFmt = intl('time');
    if (timeFmt) return timeFmt.format(d);
    return pad2(d.getHours()) + ':' + pad2(d.getMinutes());
  };

  /** Format zegara sesji trzyma scale.js — nie powielamy go tutaj. */
  UI.fmtDuration = function (ms) {
    if (global.Scale && typeof global.Scale.duration === 'function') return global.Scale.duration(ms);
    var total = Math.max(0, Math.round((ms || 0) / 1000));
    return pad2(Math.floor(total / 3600)) + ':' + pad2(Math.floor((total % 3600) / 60)) + ':' + pad2(total % 60);
  };

  /** zoneTone('warning') -> 'warn' — nazwa strefy z silnika na przyrostek klasy CSS.
   *  Nieznana strefa daje pusty ciąg: lepiej brak modyfikatora niż zły kolor. */
  UI.zoneTone = function (zone) {
    switch (zone) {
      case 'good': return 'good';
      case 'warning': case 'warn': return 'warn';
      case 'critical': case 'crit': return 'crit';
      default: return '';
    }
  };

  /** Słowo strefy bierzemy ze Scale.stamp — słownik stref ma jednego właściciela. */
  UI.zoneLabel = function (zone) {
    var z = zone;
    if (z === 'warn') z = 'warning';
    if (z === 'crit') z = 'critical';
    if (global.Scale && typeof global.Scale.stamp === 'function') return global.Scale.stamp(z).wordPL;
    if (z === 'good') return UI.T.history.zoneGood;
    if (z === 'warning') return UI.T.history.zoneWarn;
    if (z === 'critical') return UI.T.history.zoneCrit;
    return '';
  };

  global.UI = UI;
})(typeof window !== 'undefined' ? window : this);
