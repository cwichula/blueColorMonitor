# Monitor Światła Niebieskiego — instrukcja uruchomienia

Aplikacja jest w folderze `docs/`. To progresywna aplikacja webowa (PWA) —
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
3. Wejdź w przeglądarce (Chrome/Edge) na `http://localhost:8000/`.
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

1. Wpisz adres z kroku 2 w Chrome na Xiaomi/Ulefone.
2. Zezwól na dostęp do kamery, gdy przeglądarka o to zapyta.
3. Sprawdź, czy wszystko działa (gałka, wykres, przełączanie kamer).

### Krok 4 — „zainstaluj" jako appkę

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

1. Wejdź na pwabuilder.com, wklej adres z Kroku 2
   (`https://<twoja-nazwa>.github.io/blueColorMonitor/`) i kliknij **Start**.
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
   „Monitor Światła Niebieskiego" wyląduje na ekranie głównym.

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
| Po zmianach w kodzie telefon/przeglądarka pokazuje starą wersję | Aplikacja cache'uje pliki offline. Podnieś numer w `const CACHE_NAME` w `docs/sw.js` (np. na kolejną wersję) i odśwież stronę — wymusi to pobranie nowej wersji. Po wypchnięciu zmian przez GitHub Desktop odczekaj chwilę na przebudowanie GitHub Pages. |
| Apka .apk od PWABuilder nie chce się zainstalować | Sprawdź w ustawieniach Androida, czy dla aplikacji, przez którą wysłano plik (WhatsApp/przeglądarka), włączona jest opcja „Zainstaluj nieznane aplikacje". |

---

## Struktura projektu

```
docs/
  index.html            — struktura strony
  style.css             — wygląd, motyw jasny/ciemny, strefy kolorów
  app.js                — obsługa kamery, próbkowanie koloru, wykres, gałka
  manifest.webmanifest  — metadane instalacji PWA (nazwa, ikony, kolory)
  sw.js                 — service worker (działanie offline po instalacji)
  serve.ps1             — lokalny serwer testowy (Windows, bez instalacji)
  icons/                — ikony aplikacji (192px, 512px, wersja maskowalna)
```
