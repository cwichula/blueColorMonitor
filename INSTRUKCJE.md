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

## 5. Wsparcie (dobrowolne darowizny)

Aplikacja nie sprzedaje niczego. **Wszystko, co dana wersja potrafi, działa dla
każdego, od razu, bez konta, bez limitów i bez opłat** — w v2…v5 to wszystkie
siedem wielkości, w v1 obie gałki i cała reszta narzędzi. Nie ma planów, subskrypcji, cen,
okresu próbnego, paywalla, reklam ani logowania — dawna warstwa monetyzacji
została usunięta z wszystkich pięciu wersji, a nie tylko wyłączona.

W jej miejsce w każdej wersji stoi jeden ekran (albo sekcja) **„Wsparcie”**,
dostępny tam, gdzie wcześniej była zakładka „Konto”. Jest na nim krótkie
wyjaśnienie i jeden przycisk prowadzący na zewnętrzny profil darowizn.
**Darowizna niczego nie odblokowuje** — to jest napisane wprost na ekranie
i tak ma zostać. Prośba pojawia się wyłącznie wtedy, gdy użytkownik sam tam
wejdzie: nie ma wyskakujących okien, odliczania ani proszenia w trakcie pomiaru.

### 5.1. Gdzie wpisać adres profilu darowizn (SUPPORT_URL)

**To jest jedyne miejsce do zmiany.** W każdej wersji jest jeden plik warstwy
wsparcia, a w nim, na samej górze pod nagłówkiem komentarza, jedna stała
`SUPPORT_URL`. Fabrycznie jest **pusta** — dopóki jej nie wypełnisz, aplikacja
działa normalnie, tylko na ekranie Wsparcie zamiast przycisku stoi spokojna
informacja, że profil nie jest jeszcze podłączony.

| Wersja | Plik ze stałą `SUPPORT_URL` |
|---|---|
| v1 | `docs/v1/support.js` |
| v2 | `docs/v2/support.js` |
| v3 | `docs/v3/support.js` |
| v4 | `docs/v4/screen-support.js` |
| v5 | `docs/v5/js/support.js` |

W v5 uwaga na dwa podobne pliki: **stała jest w `docs/v5/js/support.js`**.
Plik `docs/v5/js/screens/support.js` to sam ekran, który tę stałą tylko czyta —
wpisanie adresu tam nie zadziała.

**Co zrobić, żeby podłączyć prawdziwy profil:**

1. Załóż profil w dowolnym serwisie darowizn — Buy Me a Coffee, Ko-fi, PayPal.me
   albo innym. Skopiuj adres swojego profilu.
2. W każdej z pięciu wersji otwórz plik z tabeli powyżej i wklej adres między
   apostrofy:

   ```js
   const SUPPORT_URL = 'https://buymeacoffee.com/twojanazwa';
   ```

   Adres **musi zaczynać się od `https://`**. Cokolwiek innego (`http://`, sam
   `buymeacoffee.com/…`, literówka w schemacie) aplikacja celowo traktuje jak
   brak adresu i nie pokaże przycisku — to zabezpieczenie, nie awaria.
3. Podnieś numer pamięci podręcznej w service workerze tej wersji, inaczej
   telefony z już zainstalowaną aplikacją dalej dostaną starą kopię:

   | Wersja | Plik | Stała do podniesienia |
   |---|---|---|
   | v1 | `docs/v1/sw.js` | `CACHE_NAME` |
   | v2 | `docs/v2/sw.js` | `CACHE` |
   | v3 | `docs/v3/sw.js` | `CACHE` |
   | v4 | `docs/v4/sw.js` | `CACHE` |
   | v5 | `docs/v5/sw.js` | `CACHE` |

   Wystarczy zwiększyć końcową liczbę, np. `'blue-monitor-v1-28'` → `'blue-monitor-v1-29'`.
4. Wypchnij zmiany przez GitHub Desktop i odczekaj chwilę na przebudowanie
   GitHub Pages.
5. Sprawdź na telefonie: wejdź na ekran „Wsparcie”. Zamiast informacji
   o niepodłączonym profilu ma się pojawić przycisk, a kliknięcie ma otworzyć
   Twój profil w nowej karcie.

Nie chcesz zbierać darowizn? **Nie rób nic.** Pusta stała to poprawny,
docelowy stan — aplikacja jest wtedy po prostu w pełni darmowa i o nic nie prosi.

### 5.2. Czego świadomie NIE ma i nie należy dodawać

- **Żadnego gotowego widżetu Buy Me a Coffee, Ko-fi ani PayPala.** Takie widżety
  ładują kod z cudzego serwera przy każdym otwarciu strony. Złamałoby to
  obietnicę, na której stoi cała aplikacja („pomiar zostaje na urządzeniu”),
  i zepsuło tryb offline. Ikonka kubka jest narysowana na miejscu.
- **Żadnego połączenia z siecią poza kliknięciem użytkownika.** Otwarcie profilu
  darowizn to jedyny moment, w którym cokolwiek opuszcza urządzenie — i jest to
  napisane wprost przy przycisku, na każdym ekranie Wsparcia.
- **Żadnych kwot zapisywanych w aplikacji.** Nic nie zapamiętuje, czy ktoś
  wsparł; nie ma „planu”, uprawnień ani stanu zakupu.
- Jeśli kiedyś miałaby wrócić prawdziwa sprzedaż, jest to zmiana modelu
  produktu, a nie podmiana pliku — teksty w całej aplikacji obiecują teraz
  pełną dostępność bez opłat wszystkiego, co dana wersja potrafi (w v2…v5
  wszystkich siedmiu wielkości, w v1 obu gałek).

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
                            Wsparcie, Więcej, O aplikacji)
    style.css             — wygląd, motyw jasny/ciemny, strefy kolorów
    ui.css                — style dolnego menu i ekranu wsparcia; korzysta wyłącznie
                            z tokenów kolorów zdefiniowanych w style.css
    app.js                — obsługa kamery, próbkowanie koloru, wykres, gałka;
                            publikuje window.AppTabs i window.AppData
    features.js           — wspólne funkcje aplikacji, dostępne bezwarunkowo
    support.js            — ekran „Wsparcie”; TU NA GÓRZE STOI STAŁA SUPPORT_URL
                            (patrz rozdział 5.1)
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
<script src="features.js"></script>
<script src="menu.js"></script>
<script src="support.js"></script>
<script src="app.js"></script>
```

`app.js` jako ostatni publikuje `window.AppTabs` / `window.AppData` i wysyła zdarzenie
`app:ready`, na które czekają pozostałe moduły. Każde wywołanie cudzego API jest
osłonięte sprawdzeniem obecności, więc brak któregokolwiek pliku (np. stary cache
service workera) nie wywala reszty aplikacji.
