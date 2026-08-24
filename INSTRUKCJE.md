# Monitoring Światła Szkodliwego — instrukcja uruchomienia

Witryna jest w folderze `docs/`, a poszczególne wersje interfejsu w jego
podkatalogach `docs/v1` … `docs/v5`. To progresywna aplikacja webowa (PWA) —
zwykła strona, którą Chrome na Androidzie potrafi „zainstalować" jak normalną
appkę (ikona na ekranie głównym, pełny ekran, działa offline). Dzięki temu:

- **na komputerze** testujesz ją od razu w przeglądarce, bez Android Studio i bez emulatora,
- **na telefonie** (Xiaomi, Ulefone i podobne) instalujesz ją przez Chrome, bez Sklepu Play i bez pliku APK.

Kamera w przeglądarce (funkcja `getUserMedia`) działa tylko w tzw. bezpiecznym
kontekście: na `localhost` (bez certyfikatu) albo na dowolnym adresie **HTTPS**.
Zwykłe `http://` na innym adresie niż localhost nie uruchomi kamery — to
ograniczenie przeglądarki, nie tej aplikacji. Stąd dwa różne sposoby
uruchomienia poniżej.

---

## 1. Test na komputerze (Windows)

Nie trzeba niczego instalować — w repozytorium jest gotowy skrypt
`docs/serve.ps1`, który uruchamia lokalny serwer przez wbudowane w Windows .NET.

1. Otwórz PowerShell w folderze `docs`.
2. Uruchom:
   ```powershell
   powershell -ExecutionPolicy Bypass -File serve.ps1
   ```
3. Wejdź w przeglądarce (Chrome/Edge) na `http://localhost:8000/`. Ten adres
   otwiera stronę rozgałęzienia z listą wersji — wersja 1 jest pod
   `http://localhost:8000/v1/`.
4. Kliknij „Start" i zezwól na dostęp do kamery.

Zatrzymanie serwera: `Ctrl+C` w tym oknie PowerShell.

Jeśli masz zainstalowany Python albo Node.js, działa to tak samo dobrze —
wybierz cokolwiek Ci wygodniej:
```powershell
# Python
python -m http.server 8000
# Node.js
npx serve -l 8000
```

**Uwaga o kamerze na laptopie:** kamerka w laptopie/monitorze pokazuje to samo,
co widzi obiektyw — więc żeby zmierzyć np. jasność ekranu, skieruj kamerę
zewnętrzną (jeśli masz) albo telefon na sam ekran. Wbudowana kamera laptopa
zwykle nie da się fizycznie skierować na własny ekran — ta ścieżka służy
głównie do sprawdzenia, czy interfejs działa, zanim przetestujesz na telefonie.

---

## 2. Instalacja na telefonie (Xiaomi, Ulefone, każdy Android z Chrome)

Telefon musi otworzyć aplikację przez **HTTPS** (patrz wyżej). Najprostszy,
trwały sposób to darmowy hosting statyczny. Poniżej instrukcja dla **GitHub
Pages** — nie wymaga żadnej płatnej usługi, adres zostaje na stałe.

### Krok 1 — wypchnij repozytorium na GitHub (przez GitHub Desktop)

1. Zainstaluj i zaloguj się w [GitHub Desktop](https://desktop.github.com/).
2. **File → Add Local Repository** i wskaż ten folder projektu
   (`...\blueColorMonitor`).
3. Kliknij **Publish repository** (prawy górny róg). Zostaw zaznaczenie
   „Keep this code private" odznaczone — GitHub Pages w darmowym planie
   wymaga **publicznego** repozytorium.
4. Po chwili repo pojawi się na `github.com/<twoja-nazwa>/blueColorMonitor`.

### Krok 2 — włącz GitHub Pages

1. Na stronie repozytorium na GitHubie: **Settings → Pages**.
2. Source: „Deploy from a branch".
3. Branch: `main` (lub `master`), folder: **`/docs`**.
4. Zapisz. Po chwili (1–2 minuty) GitHub poda adres w stylu:
   `https://<twoja-nazwa-uzytkownika>.github.io/blueColorMonitor/`

### Krok 3 — otwórz ten adres w Chrome na telefonie

1. Wpisz adres z kroku 2 w Chrome na Xiaomi/Ulefone. Sam adres otwiera stronę
   rozgałęzienia z listą wersji — dopisz katalog wersji, żeby wejść do
   aplikacji: `…/blueColorMonitor/v1/` (wersja 1) albo `…/blueColorMonitor/v5/`
   (najnowsza). Dalsze kroki dotyczą adresu **z katalogiem wersji**.
2. Zezwól na dostęp do kamery, gdy przeglądarka o to zapyta.
3. Sprawdź, czy wszystko działa (gałka, wykres, przełączanie kamer).

### Krok 4 — „zainstaluj" jako appkę

Instalować trzeba **z adresu konkretnej wersji** (`…/v1/`, `…/v5/`) — tylko
katalogi wersji mają własny `manifest.webmanifest` i service workera. Strona
rozgałęzienia pod adresem głównym nie ma ani jednego, ani drugiego, więc się
nie zainstaluje.

1. W Chrome dotknij menu (⋮) w prawym górnym rogu.
2. Wybierz **„Dodaj do ekranu głównego"** (może się też pojawić jako baner
   „Zainstaluj aplikację" na dole ekranu — wtedy po prostu go dotknij).
3. Potwierdź. Na ekranie głównym pojawi się ikona „Monitor Światła
   Niebieskiego", która otwiera aplikację na pełnym ekranie, bez paska adresu,
   jak zwykła appka.

Aplikacja po pierwszym otwarciu działa też **offline** (dzięki
`service worker`) — nie potrzebuje internetu przy kolejnych uruchomieniach,
poza samą kamerą, która działa lokalnie na telefonie.

### Krok 5 — (opcjonalnie) plik .apk do wysłania na WhatsApp

Jeśli zamiast linku chcesz wysłać znajomemu gotowy plik do kliknięcia, z
ikoną lądującą prosto na ekranie głównym — spakuj apkę w .apk przez darmowe
narzędzie **[PWABuilder](https://www.pwabuilder.com/)**:

1. Wejdź na pwabuilder.com, wklej adres **wybranej wersji** — czyli adres z
   Kroku 2 z dopisanym katalogiem, np.
   `https://<twoja-nazwa>.github.io/blueColorMonitor/v1/` — i kliknij **Start**.
   Pod samym adresem głównym stoi strona rozgałęzienia, w której PWABuilder nie
   znajdzie ani manifestu, ani service workera.
2. Poczekaj, aż PWABuilder przeanalizuje stronę (sprawdzi manifest i service
   worker — oba już mamy gotowe).
3. W sekcji **Android** kliknij **Generate Package**. Zostaw domyślne
   ustawienia (Trusted Web Activity), ewentualnie zmień nazwę pakietu.
4. Pobierz wygenerowane archiwum .zip — w środku jest plik **.apk**
   (i klucz podpisujący — zachowaj go, przyda się przy przyszłych aktualizacjach).
5. Wyślij ten plik .apk znajomemu na WhatsApp jak zwykły plik/dokument.
6. Znajomy klika plik → Android poprosi o zgodę na „instalację z nieznanego
   źródła" (normalne dla plików spoza Sklepu Play, nie oznacza niczego
   niebezpiecznego — to Twoja własna apka) → **Zainstaluj**. Ikona
   „Monitoring Światła Szkodliwego" wyląduje na ekranie głównym.

Uwaga: przy pierwszym uruchomieniu telefon znajomego musi na chwilę połączyć
się z internetem, żeby pobrać i zapisać aplikację offline (ten sam mechanizm
co w Kroku 4) — w praktyce nieodczuwalne, bo żeby odebrać plik na WhatsAppie,
i tak trzeba mieć w tym momencie internet.

### Alternatywa bez GitHuba — szybki, tymczasowy test

Jeśli chcesz tylko szybko sprawdzić działanie na telefonie bez zakładania
repo na GitHubie, uruchom lokalny serwer na komputerze (`serve.ps1`, krok 1)
i udostępnij go w internecie przez darmowy tunel HTTPS, np.
[ngrok](https://ngrok.com/download) lub [Cloudflare Tunnel]:
```powershell
ngrok http 8000
```
Ngrok wypisze publiczny adres `https://...ngrok-free.app` — otwórz go w Chrome
na telefonie. Działa tylko dopóki masz uruchomiony `serve.ps1` i `ngrok` na
komputerze (dobre do szybkich testów, nie do stałego użytku).

---

## 3. Co właściwie pokazuje wynik i jak mierzyć, żeby miał sens

Naukowa jednostka „zagrożenia niebieskim światłem" (IEC 62471) to napromienienie
w **W/m²** ważone widmowo — wymaga spektrometru, nie da się jej uzyskać z
kamery telefonu. Luks i lumen to też nie to — opisują ogólną jasność, nie
kolor światła, i również wymagają skalibrowanego czujnika.

Aplikacja pokazuje dwie metryki obok siebie, każda ma własną gałkę i wykres:

- **Jasność kanału B** (stara metryka) — surowa jasność samego kanału niebieskiego, 0–100%.
- **Udział niebieskiego w świetle** (nowa metryka) — B ÷ (R+G+B), też 0–100%.
  Neutralna biel wypada koło 33%, cieplejsze światło — mniej, mocno niebieskie
  — więcej. To ta sama zasada co w filtrach „tryb nocny": liczy się
  przesunięcie koloru, nie surowa jasność, więc lepiej odpowiada na pytanie
  o światło szkodliwe dla oczu — i to ona decyduje o kolorze strefy w tabeli
  odczytów.

Pełne wyjaśnienie algorytmów, uzasadnienie jednostek i różnica między kamerą
a spektrometrem są w aplikacji w zakładce **„Jak to działa"** (u góry ekranu).

- Ustaw telefon w stałej odległości od ekranu (np. 15–20 cm) i staraj się nie
  zmieniać oświetlenia otoczenia w trakcie pomiaru.
- Użyj **tylnego aparatu** (przycisk „Zmień kamerę") — ma mniej agresywne
  automatyczne korekcje niż przedni.
- Traktuj wynik jako **wskaźnik względny (0–100%)**, nie fizyczną jednostkę.
  Najlepiej porównywać wartości względem siebie (np. tryb nocny
  włączony/wyłączony), a nie jako liczby bezwzględne.
- Progi stref (domyślnie 33% / 66%) dostosuj w aplikacji w sekcji „Ustawienia
  progów stref" do jasności własnego ekranu.

Pełne wyjaśnienie jest też w aplikacji pod ikoną „i" w nagłówku.

---

## 4. Rozwiązywanie problemów

| Problem | Rozwiązanie |
|---|---|
| „Nie udało się uruchomić kamery" na telefonie | Sprawdź, czy adres zaczyna się od `https://` (nie `http://`). Sprawdź uprawnienia kamery dla Chrome w ustawieniach systemowych Androida. |
| Kamera nie działa na PC pod `http://localhost:8000` | To nie powinno się zdarzyć — `localhost` jest zawsze bezpiecznym kontekstem. Sprawdź, czy inna aplikacja (Zoom, Teams) nie trzyma kamery zajętej. |
| Po zmianach w kodzie telefon/przeglądarka pokazuje starą wersję | Aplikacja cache'uje pliki offline. Podnieś numer w `const CACHE_NAME` w `docs/v1/sw.js` (np. na kolejną wersję) i odśwież stronę — wymusi to pobranie nowej wersji. Po wypchnięciu zmian przez GitHub Desktop odczekaj chwilę na przebudowanie GitHub Pages. |
| Apka .apk od PWABuilder nie chce się zainstalować | Sprawdź w ustawieniach Androida, czy dla aplikacji, przez którą wysłano plik (WhatsApp/przeglądarka), włączona jest opcja „Zainstaluj nieznane aplikacje". |

---

## 5. Monetyzacja (WERSJA DEMONSTRACYJNA — wszystko jest fikcyjne)

> **Uwaga, najważniejsze zdanie w tym rozdziale:** w aplikacji nie ma ani jednej
> prawdziwej płatności. Nie ma Google Play Billing, nie ma Google Pay, nie ma
> Google Sign-In, nie ma AdMob, nie ma Firebase i nie ma **żadnego** połączenia
> z siecią. Wszystkie ceny, produkty, konta, subskrypcje i reklamy są atrapami
> zapisywanymi wyłącznie w `localStorage` przeglądarki. Każdy ekran, który dotyczy
> pieniędzy, konta albo reklamy, ma trwałą, niezamykalną plakietkę **DEMO**.
> To prototyp interfejsu (UX), a nie sklep.

### 5.1. Model — dlaczego hybrydowy, a nie subskrypcja

Aplikacja jest **narzędziem pomiarowym** uruchamianym na krótko, a nie aplikacją
treściową, więc czysta subskrypcja byłaby trudna do obronienia. Przyjęty model to
wzorzec kategorii pomiarowej (jak Sleep as Android, Twilight, Decibel X):

- darmowy rdzeń **bez limitu czasu**,
- trzy produkty premium: miesięczny, roczny (z 7-dniowym lokalnym okresem próbnym)
  i dożywotni,
- osobny tani produkt jednorazowy „usunięcie reklam",
- reklamy tylko w wersji darmowej: stały baner + reklama nagradzana na życzenie.
  Reklamy pełnoekranowe (interstitial) są **domyślnie wyłączone**, a jedyny
  wyzwalacz, jaki `maybeShowInterstitial()` w ogóle przyjmuje, to `'neutral_return'`.
  Wyzwalacz `'session_end'` (reklama po naciśnięciu „Stop") został **usunięty** —
  Better Ads i polityka Play wprost zakazują reklamy przypiętej do „Start"/„Stop".

Granica płatna leży dokładnie tam, gdzie stawia ją rynek: **darmowy jest sam pomiar,
płatne jest zamienianie pomiaru w dane.**

Cennik (fikcyjny): 149,99 zł dożywotnio (plan domyślnie zaznaczony), 79,99 zł rocznie
z 7-dniowym okresem próbnym, 19,99 zł miesięcznie, 12,99 zł za samo usunięcie reklam.

Cennik jest zapisany **wyłącznie** w katalogu w `docs/v1/billing.js`. Karty planów, blok
warunków, etykieta przycisku zakupu i podsumowanie w arkuszu płatności biorą kwoty
z `Billing.formatPrice()`, `Billing.formatTerms()` i `Billing.formatCta()`, więc kod
promocyjny zmienia je wszystkie naraz i nigdzie nie zostaje kwota, której silnik nie
naliczy. Warstwa UI nie ma własnej listy cen.

### 5.2. Co jest darmowe na zawsze, a co jest w Premium

| Funkcja | Darmowy | Premium |
|---|---|---|
| Kamera: Start / Stop / Zmień kamerę | tak | tak |
| Obie gałki (Jasność kanału B, Udział niebieskiego) | tak | tak |
| Oba wykresy 60 s | tak | tak |
| Tabela odczytów bieżącej sesji | tak | tak |
| Ręczne ustawianie obu par progów | tak | tak |
| Cała Dokumentacja i disclaimer medyczny | tak | tak |
| Tryb jasny / ciemny | tak | tak |
| Historia dłuższa niż 60 s (1 h / 24 h / 7 dni / 30 dni) | nie | tak |
| Eksport odczytów do CSV | nie | tak |
| Raport dzienny i tygodniowy | nie | tak |
| Zapisane profile progów | 1 zestaw | do 5 profili |
| Alerty progowe (po 5 min nieprzerwanej ekspozycji w strefie szkodliwej) | nie | tak |
| Podsumowanie sesji po naciśnięciu „Stop" | nie | tak |
| Reklamy | tak | nie |

Zasady, których nie wolno złamać przy dalszym rozwoju:

1. **Pomiar nigdy nie jest blokowany, opóźniany ani ograniczany czasowo.** To
   aplikacja o charakterze zdrowotnym dla osób niedowidzących — blokowanie pomiaru
   byłoby nieetyczne i zabójcze dla ocen w sklepie.
2. **Funkcji płatnej nigdy nie ukrywamy.** Przycisk zostaje widoczny, dostaje kłódkę
   i `aria-label` z dopiskiem „funkcja Premium", i **nigdy** nie dostaje atrybutu
   `disabled`. Element, który znika, jest dla czytnika ekranu gorszy niż element
   widoczny i opisany jako niedostępny.
3. **Nie monetyzujemy strachu.** Paywall nie może być wyzwalany wejściem odczytu
   w strefę „szkodliwa", a żaden tekst sprzedażowy nie może obiecywać efektu
   zdrowotnego („chroni wzrok", „zmniejsza ryzyko").
4. **Paywall jest miękki.** Zamykalny od pierwszej sekundy, przycisk „Nie teraz —
   korzystaj bezpłatnie" ma dokładnie ten sam rozmiar co przycisk zakupu. Zero
   liczników odliczających i zero „oferta wygasa za…".
5. Paywall automatyczny wolno pokazać **raz na 24 godziny**, dopiero po 45 sekundach
   nieprzerwanego pomiaru — nigdy przy starcie aplikacji, nigdy przed zgodą na kamerę
   i nigdy przy przełączeniu ekranu.
6. Dane zebrane w wersji darmowej **nie są kasowane** po wygaśnięciu okresu próbnego.
   Bufor długiej historii (1 punkt na 5 s, okno 30 dni) zbiera się u wszystkich;
   płatny jest wyłącznie jego odczyt, więc po zakupie użytkownik widzi swoją historię
   wstecz, a nie pustą tabelę. Bufor jest zapisywany w `localStorage`
   (`blueMonitor.history.v1`) wsadowo — co 64 punkty długiej historii, przy „Stop",
   przy ukryciu karty i przy `pagehide` — więc obietnica „historia 30 dni" ma
   pokrycie także po zamknięciu aplikacji.
7. Żadna reklama nie pojawia się w panelu Kamery, przy gałkach, w Dokumentacji ani
   w dialogach płatności — i żadna nie pojawi się, dopóki użytkownik nie odpowie na
   pytanie o zgodę, które zadajemy dopiero przy pierwszym realnym wyświetleniu slotu.

Co dokładnie dostaje osoba z wersją Premium (stan faktyczny w kodzie, nie plan):

| Uprawnienie | Gdzie to widać | Co robi |
|---|---|---|
| `historyLong` | `#historyUpsell` pod wykresami | Przeglądarka historii z zakresami 1 h / 24 h / 7 dni / 30 dni i podziałem czasu na strefy. Bufor jest **trwały** — leży w `blueMonitor.history.v1` i przeżywa przeładowanie strony oraz restart PWA. |
| `csvExport` | `#exportCsvBtn` w nagłówku wykresów | Zapis odczytów do pliku CSV. |
| `reports` | ta sama karta co historia, sekcje „Raport dzienny" i „Raport tygodniowy" | Raport dzienny: tabela „dzień → udział stref", porównanie z dniem poprzednim w punktach procentowych i godzina z największą liczbą odczytów w strefie szkodliwej. Raport tygodniowy: osobna tabela grupowana po numerze tygodnia ISO (tydzień zaczyna się w poniedziałek) plus porównanie tydzień do tygodnia; pojawia się przy zakresie 7 dni i 30 dni. |
| `profiles` | `#profilesUpsell` w karcie ustawień progów | Do 5 nazwanych zestawów progów, przełączanych jednym dotknięciem. |
| `alerts` | toast + wibracja w trakcie pomiaru | Po **5 minutach** nieprzerwanego pobytu w strefie szkodliwej: jeden komunikat, potem co najwyżej raz na 15 minut. Bez ani jednego słowa sprzedażowego — to reguła etyczna, nie stylistyczna. |
| `background` | toast po „Stop" + karta „Podsumowanie ostatniej sesji" | Czas sesji, liczba odczytów i udział każdej strefy. |
| `noAds` | oba sloty reklamowe | Znikają natychmiast po zdarzeniu `change` z uprawnieniem `noAds`. |

Nic poza tą tabelą nie jest sprzedawane: lista na ekranie Konta, korzyści na paywallu
i tabela porównania wymieniają dokładnie te uprawnienia i nic ponadto.

### 5.3. Nawigacja i ekrany

Górny pasek zakładek został zastąpiony **dolnym paskiem nawigacji** (`#appNav`):
Kamera · Monitoring · Premium · Więcej. Stary pasek `.tabs` (`#legacyTabs`) pozostaje
w kodzie jako ukryty sterownik zgodności — dzięki temu `selectTab` z `app.js` działa
dalej bez zmian i nie ma dwóch źródeł prawdy o widocznym ekranie. Przycisk „i"
w nagłówku nadal otwiera Dokumentację.

| Ekran | Element | Do czego służy |
|---|---|---|
| Premium | `#panelPremium` | Jedyny ekran oferty: trzy plany, tabela porównania, oś czasu okresu próbnego, kody promocyjne, warunki i oświadczenie konsumenckie. Ekran ma trzy tryby: **oferta** (wersja darmowa i okres próbny), **zmiana planu** (aktywna subskrypcja — plan już posiadany znika z listy, a przycisk woła `Billing.changePlan()`, nie `startPurchase()`) i **posiadanie** (plan dożywotni — plany, cena, zgoda i przycisk zakupu są ukryte, zostaje podsumowanie i przejście do ekranu Konta). Nigdy nie oferujemy produktu, który użytkownik już ma. |
| Konto i subskrypcja | `#panelAccount` | Sześć stanów subskrypcji (brak / próba / aktywna / anulowana / wstrzymana / zaległość), „Przywróć zakupy", „Anuluj subskrypcję". |
| Więcej | `#panelMore` | Lista wszystkich pozycji drugorzędnych — każdy ekran w maks. 2 dotknięciach. |
| O aplikacji i kontakt | `#panelAbout` | Disclaimer medyczny w pełnym brzmieniu, regulamin (DEMO), prywatność, dane sprzedawcy, zwroty, przycisk „Zresetuj stan demonstracyjny". To cel linku „Regulamin i prywatność" ze stopki paywalla i linku „Więcej" przy disclaimerze na ekranie głównym. |
| Symulacja płatności | `#mzPurchaseSheet` | Zastępuje natywny arkusz Google Play. Pozwala wybrać wynik: sukces, anulowanie, błąd. |
| Zgoda na reklamy | `#mzConsentDialog` | Atrapa CMP. Oba przyciski mają identyczną wagę wizualną. |
| Reklama nagradzana | `#mzRewardedDialog` | Wyłącznie na świadome kliknięcie. Nagroda: eksport CSV albo dostęp do historii — w obu przypadkach **na 24 h**, maks. 5 razy na dobę, min. 60 s przerwy. Trzy punkty wejścia: baner pod wykresami, dialog blokady przy eksporcie CSV i przycisk `#moreRewardedBtn` na ekranie „Więcej". |

Dostępność: cele dotykowe min. 48 px (przyciski akcji 56 px), `aria-current="page"`
na aktywnej pozycji paska, roving tabindex i strzałki ←/→, Escape wychodzi z ekranu
nakładkowego, fokus po zmianie ekranu ląduje na nagłówku `<h2>`, a zmiana jest
ogłaszana w regionie `aria-live`. Cena, warunki, disclaimer i etykieta „Reklama"
nigdy nie schodzą poniżej 16 px i nigdy nie używają koloru `--text-muted`.

### 5.4. Gdzie dokładnie podmienić atrapę na prawdziwy Google Play Billing

**Plik: `docs/v1/billing.js`. Obiekt: `MockBillingBackend`.**

Cała fikcja jest zamknięta w jednym obiekcie, otoczonym w pliku komentarzami
`FICTIONAL LAYER` i `END OF FICTIONAL LAYER`. Zawiera on katalog produktów,
symulowane opóźnienia, wyniki zakupu, kody promocyjne, fikcyjne konto i generowanie
dat. Wszystko poza nim to cienki adapter, który tylko deleguje do backendu, przelicza
`state.features`, zapisuje stan w `localStorage` i emituje zdarzenia — i który
**nie wie**, że backend jest udawany.

Żeby wejść na realne płatności:

1. Zbuduj aplikację jako TWA (np. Bubblewrap / PWABuilder) — Digital Goods API działa
   tylko w aplikacji zainstalowanej ze sklepu, nie w zwykłej karcie przeglądarki.
2. Załóż produkty w Google Play Console o **tych samych identyfikatorach**, których
   używa kod: `premium_lifetime`, `premium_yearly`, `premium_monthly`, `remove_ads`.
3. Podmień `MockBillingBackend` na implementację opartą o
   `window.getDigitalGoodsService('https://play.google.com/billing')` +
   `PaymentRequest`. Zachowaj kształt zwracanych obiektów: `BillingState`, `Product`
   i `Result` (`{ ok, code, messagePL, state }`).
4. W nowym backendzie ustaw `SOURCE: 'PLAY'` zamiast `'MOCK'` i `IS_MOCK = false`.
   To jest sygnał dla całego UI: znikają plakietki DEMO, a stary stan demonstracyjny
   zapisany pod `blueMonitor.billing.v1` można wtedy rozpoznać po polu
   `source: 'MOCK'` i wyczyścić.
5. `isAvailable()` ma zwracać `false`, gdy `!('getDigitalGoodsService' in window)` —
   UI pokaże wtedy komunikat `UNAVAILABLE_IN_BROWSER` zamiast przycisku zakupu, a
   wszystkie funkcje pomiarowe i tak działają dalej bezpłatnie.

**Żaden inny plik nie wymaga zmian.** `monetization-ui.js` i `menu.js` nigdy nie
czytają stanu płatności z `localStorage` i nigdy nie liczą uprawnień same — pytają
wyłącznie `Billing.hasFeature(...)`, `Billing.isPremium()` i słuchają zdarzenia
`Billing.on('change', …)`.

Uwaga na dwie rzeczy przy podmianie:

- `startPurchase()` **musi** dostać `consumerConsent: true` (oświadczenie o rezygnacji
  z prawa odstąpienia), inaczej zwraca `ok:false` z kodem `CONSENT_REQUIRED`. To wymóg
  prawa konsumenckiego, nie ozdobnik.
- Metody backendu nigdy nie rzucają wyjątkami i nigdy nie odrzucają `Promise` — każdy
  błąd wraca jako `Result` z `ok:false` i gotowym polskim komunikatem w `messagePL`.
  Realny adapter musi zachować tę własność, inaczej UI będzie się zawieszać na
  odrzuconych obietnicach.

### 5.5. Klucze w localStorage

| Klucz | Właściciel | Zawartość |
|---|---|---|
| `blueMonitor.thresholds.v1` | `app.js` | **ISTNIEJĄCY** klucz z progami stref. Nie wolno zmieniać jego formatu i **nie jest kasowany** przy resecie demonstracyjnym. |
| `blueMonitor.history.v1` | `app.js` | Trwały bufor długiej historii: `{ v: 1, points: [[t, raw, share, brightness, zoneRaw, zoneShare], …] }`, strefy zakodowane jako 0/1/2, wartości zaokrąglone do 0,1. Przycinany do okna 30 dni i do 15 000 najnowszych punktów (budżet `localStorage`); przy przepełnieniu quoty odrzuca starszą połowę i zapisuje ponownie. To **dane pomiarowe użytkownika**, a nie stan symulacji, więc — tak samo jak progi — **nie jest kasowany** przy resecie demonstracyjnym; czyści go dopiero `AppData.clearHistoryLong()`. |
| `blueMonitor.billing.v1` | `billing.js` | Pełny stan uprawnień (tier, status, daty, kod promocyjny, uprawnienia tymczasowe, `source: 'MOCK'`). |
| `blueMonitor.account.v1` | `billing.js` | Fikcyjne konto demonstracyjne. |
| `blueMonitor.promo.v1` | `billing.js` | Wykorzystane kody, okno oferty powitalnej, data ostatniego zamknięcia paywalla. |
| `blueMonitor.ads.v1` | `monetization-ui.js` | Zgoda reklamowa (lustro stanu z `billing.js`), licznik reklam nagradzanych na dobę, flaga interstitiala. |
| `blueMonitor.onboarding.v1` | `monetization-ui.js` | Data pierwszego uruchomienia, moment „aha", znacznik pokazanego przypomnienia o końcu okresu próbnego. |
| `blueMonitor.profiles.v1` | `monetization-ui.js` | Profile progów (funkcja Premium). |
| `blueMonitor.nav.v1` | `menu.js` | Ostatni ekran. Ekran „Premium" nigdy nie jest przywracany przy starcie. |

Każdy odczyt i zapis jest w `try/catch` — w trybie prywatnym przeglądarki
`localStorage` rzuca wyjątkiem, a aplikacja ma wtedy działać dalej, tylko bez
zapamiętywania.

### 5.6. Kody promocyjne w wersji demonstracyjnej

| Kod | Efekt |
|---|---|
| `WZROK30` | −30% na pierwszy rok planu rocznego (55,99 zł zamiast 79,99 zł) |
| `DEMO7` | 7 dni Premium |
| `PREMIUMDEMO` | dożywotnie odblokowanie DEMO |
| `BEZREKLAM` | usunięcie reklam |

Wielkość liter nie ma znaczenia, spacje są obcinane, każdy kod działa tylko raz.

### 5.7. Checklista QA warstwy monetyzacji

1. Przejście całego paywalla **wyłącznie klawiaturą**: Tab / Shift+Tab / Enter /
   Escape. Nic nie może być nieosiągalne ani nie może „uciekać" z pułapki fokusu.
2. TalkBack / VoiceOver czyta pasek **DEMO bezpośrednio po pasku powrotu** — przed
   tytułem, przed listą planów i przed jakąkolwiek ceną. Fokus przy otwarciu
   każdego ekranu i **każdego dialogu** ląduje na jego tytule (`.mz-dialog-title`
   / `.mz-screen-title`), a `aria-describedby` tego tytułu wskazuje pasek DEMO —
   dzięki temu informacja o symulacji i podsumowanie zamówienia nie są pomijane.
   Ekran „Więcej" ma własny pasek `#moreDemoBanner`, a ekran „O aplikacji i kontakt"
   — `#aboutDemoBanner` (fikcyjny regulamin i dane sprzedawcy) — oba na samej górze.
3. Kontrast ceny, warunków i disclaimera ≥ 4.5:1 w motywie jasnym **i** ciemnym
   (dla tych treści używać `--text-primary`, nigdy `--text-muted`).
4. Test przy 200% powiększeniu czcionki systemowej — nic się nie ucina i nie nachodzi.
5. Przycisk zamknięcia paywalla działa **od pierwszej sekundy**.
6. Po zamknięciu ekranu monetyzacji pomiar dalej działa, a wykresy są przerysowane
   (`AppTabs.redraw()` po każdym odsłonięciu panelu).
7. Tryb prywatny przeglądarki (rzucający `localStorage`) nie wywala aplikacji.
8. Po wyczyszczeniu pamięci i przeładowaniu offline aplikacja startuje na nowym
   cache — pamiętaj o podniesieniu `CACHE_NAME` w `docs/v1/sw.js` (obecnie
   `blue-monitor-v24`) przy każdej zmianie plików z `APP_SHELL`.
9. Escape przy otwartym dialogu zamyka **tylko dialog** i zostawia użytkownika na
   tym samym ekranie; dopiero drugie Escape opuszcza ekran nakładkowy.
10. Wejście na ekran Premium przyciskiem Wstecz przeglądarki zeruje oświadczenie
    konsumenckie — pole wyboru **nigdy** nie jest wstępnie zaznaczone.
11. Plan roczny reklamuje okres próbny wyłącznie wtedy, gdy użytkownik faktycznie
    ma do niego prawo (`trialUsed === false`).
12. Po użyciu kodu rabatowego karta planu podaje kwotę pierwszego okresu
    („za pierwszy rok") i osobno kwotę odnowienia („potem 79,99 zł rocznie"),
    a ekran Konto pokazuje **cenę odnowienia**, nie cenę po rabacie.
13. Ekran Konto nie wymyśla płatności, której nie było: w okresie próbnym **nie**
    pojawia się wiersz „Zapłacono…" (nic jeszcze nie obciążono), a po anulowaniu
    subskrypcji zamiast ceny z dopiskiem „odnawia się automatycznie" widnieje
    „Subskrypcja nie odnowi się — nie pobierzemy kolejnej opłaty."
14. Liczebniki po polsku odmieniają się w każdym komunikacie czytanym przez
    czytnik ekranu: „1 dzień / 2 dni", „1 odczyt / 2 odczyty / 5 odczytów",
    „Zamknij za 1 sekundę / 2 sekundy / 5 sekund", „od 1 minuty / od 2 minut"
    (helper `pluralPL` w `monetization-ui.js`).

Scenariusz przejścia całości (od pustego `localStorage`):

- start → ekran **Kamera**, bez paywalla i bez ekranu zgody;
- „Start", 45 sekund → paywall pojawia się **raz**, jest zamykalny, po zamknięciu
  nie wraca; gałki i wykresy działają przez cały czas jego otwarcia;
- Więcej → Konto i subskrypcja → „Przywróć zakupy" → komunikat w `aria-live`;
- zakup planu dożywotniego przez „Symuluj udany zakup" → oba sloty reklamowe znikają,
  pigułka w nagłówku zmienia się w „PRO ✓", a „Eksport CSV" traci kłódkę;
- „Usuń reklamy" obok slotu reklamowego → paywall z **dostępną do kupienia** kartą
  „Usunięcie reklam — 12,99 zł jednorazowo" (ten sam produkt ma też wiersz na
  ekranie Konto, dopóki użytkownik go nie ma);
- „Zresetuj stan demonstracyjny" → wraca wersja darmowa, ale progi w
  `blueMonitor.thresholds.v1` i historia w `blueMonitor.history.v1`
  **zostają nietknięte**.

---

## Struktura projektu

```
docs/
  index.html            — strona rozgałęzienia: lista wersji interfejsu (v1 … v5)
  sw.js                 — service worker w korzeniu; sprząta po starej rejestracji
                          z czasów, gdy wersja 1 leżała bezpośrednio w docs/
  serve.ps1             — lokalny serwer testowy (Windows, bez instalacji)
  icons/                — ikony aplikacji (192px, 512px, wersja maskowalna),
                          wspólne dla wszystkich wersji
  v1/
    index.html            — struktura strony (panele: Kamera, Monitoring, Dokumentacja,
                            Premium, Konto, Więcej, O aplikacji)
    style.css             — wygląd, motyw jasny/ciemny, strefy kolorów
    monetization.css      — style warstwy monetyzacji i dolnego menu; korzysta wyłącznie
                            z tokenów kolorów zdefiniowanych w style.css
    app.js                — obsługa kamery, próbkowanie koloru, wykres, gałka;
                            publikuje window.AppTabs i window.AppData
    billing.js            — silnik uprawnień i ATRAPA sklepu (window.Billing).
                            TO JEST PLIK DO PODMIANY NA PRAWDZIWY GOOGLE PLAY BILLING
    monetization-ui.js    — ekrany Premium/Konto, dialogi płatności, zgody i reklam,
                            atrapy banerów, upselle (window.MonetizationUI)
    menu.js               — dolny pasek nawigacji, ekrany „Więcej" i „O aplikacji",
                            routing, obsługa klawiatury (window.AppNav)
    manifest.webmanifest  — metadane instalacji PWA (nazwa, ikony, kolory)
    sw.js                 — service worker (działanie offline po instalacji)
  v2/                   — kolejna, niezależna wersja interfejsu
  v3/                   — j.w.
  v4/                   — j.w.
  v5/                   — najnowsza wersja; moduły ES, katalogi css/ i js/,
                          kontrakt implementacyjny w CONTRACT.md
```

Każda wersja (`v1` … `v5`) jest samodzielna: ma własny `index.html`, własny
`manifest.webmanifest` i własnego service workera o zasięgu swojego katalogu,
a ikony bierze ze wspólnego `../icons/`.

Kolejność wczytywania skryptów w `index.html` jest ISTOTNA i nie wolno jej zmieniać:

```html
<script src="billing.js"></script>
<script src="monetization-ui.js"></script>
<script src="menu.js"></script>
<script src="app.js"></script>
```

`app.js` jako ostatni publikuje `window.AppTabs` / `window.AppData` i wysyła zdarzenie
`app:ready`, na które czekają trzy pozostałe moduły. Każde wywołanie cudzego API jest
osłonięte sprawdzeniem (`if (window.Billing && window.Billing.hasFeature) …`), więc brak
któregokolwiek pliku (np. stary cache service workera) nie wywala reszty aplikacji.
