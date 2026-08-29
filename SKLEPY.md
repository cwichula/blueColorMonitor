# Publikacja w sklepach — lista rzeczy do zrobienia

Dokument roboczy. Każdy punkt jest albo odhaczony, albo do zrobienia przez
człowieka. Nie ma tu opisu zalet aplikacji ani tekstów marketingowych — te
powstają osobno, przy wypełnianiu listingu.

Wersja idąca do sklepów: **v5** (`docs/v5/`). Wersje 1–4 zostają w witrynie jako
archiwum i **nie** są przedmiotem publikacji.

---

## 1. Stan faktyczny — co JEST gotowe

Poniższe punkty są sprawdzone w repozytorium 29 sierpnia 2026, nie odtworzone
z pamięci. Przy każdym jest plik, w którym to widać.

* [x] **Manifest PWA dla v5** — `docs/v5/manifest.webmanifest`. Ma komplet pól,
      których wymaga instalowalność i których szuka PWABuilder: `name`,
      `short_name`, `description`, `id`, `start_url`, `scope`, `display`
      (`standalone`), `display_override`, `orientation`, `lang`, `dir`,
      `categories`, `background_color`, `theme_color`, `icons`, `shortcuts`
      (trzy skróty: Measure, History, Tools). Poprawny JSON.
      **Brakuje jednego pola: `screenshots` — patrz punkt 2.5.**
* [x] **Manifesty pozostałych czterech wersji** — `docs/v1` … `docs/v4`.
      Do sklepu nie idą, ale istnieją i nie kolidują z v5.
* [x] **Ikony** — `docs/v5/icons/`: `icon-192.png` (192 × 192),
      `icon-512.png` (512 × 512, 8 bitów na kanał, RGBA, 11,9 KB),
      `icon-maskable-512.png` (512 × 512, wersja maskowalna).
      `icon-512.png` **spełnia wprost wymóg Google Play** na ikonę aplikacji
      (512 × 512, 32-bitowy PNG z alfą, poniżej 1024 KB) — można go wgrać bez zmian.
      Ten sam komplet leży w `docs/icons/` dla strony rozgałęzienia.
* [x] **Service worker v5** — `docs/v5/sw.js`. Numer pamięci **odczytaj z `docs/v5/sw.js:31`** (stała `CACHE`) i podnieś o jeden przy każdej zmianie któregokolwiek pliku z listy `APP_SHELL` — nie przepisuj go z tego dokumentu, bo tu zdąży się zestarzeć. Nawigacja:
      najpierw sieć, w jej braku pamięć podręczna. Reszta (CSS, moduły JS, ikony,
      manifest): stale-while-revalidate. Obsługuje `/v5/` **oraz** wspólną
      bibliotekę `/lib/`, a cudze żądania przepuszcza nietknięte i kasuje wyłącznie
      własne pamięci (`/^ms5-/`), więc nie psuje wersji 1–4.
* [x] **Działanie bez internetu** — aplikacja nie potrzebuje sieci do niczego:
      wszystkie ekrany, ikony i liczby powstają na urządzeniu. Sprawdzone
      wcześniej w Chrome przez `Network.emulateNetworkConditions {offline:true}`
      + przeładowanie na świeżym profilu.
* [x] **Brak wysyłania czegokolwiek do sieci** — w całym kodzie v5 i w kodzie
      wspólnym nie ma ani jednego wywołania sieciowego poza `fetch()` w service
      workerach, a te pobierają **wyłącznie własne pliki aplikacji z tego samego
      adresu**. Nie ma `XMLHttpRequest`, `sendBeacon`, `WebSocket`, `EventSource`
      ani żadnego skryptu z obcego serwera. Jedyne obce adresy występujące
      w plikach to `http://www.w3.org/2000/svg` (przestrzeń nazw SVG — nie jest
      pobierana) i **zakomentowany przykład** adresu Buy Me a Coffee.
* [x] **Dane zostają na urządzeniu** — historia pomiarów i ustawienia leżą
      w `localStorage` (`docs/v5/js/history.js`, `docs/v5/js/store.js`).
      Eksport CSV/JSON (`docs/v5/js/screens/tools.js`) zapisuje plik lokalnie
      przez `<a download>`; nic nie jest nigdzie wysyłane.
* [x] **Polityka prywatności** — `docs/prywatnosc.html`, po polsku, ze streszczeniem
      po angielsku, podlinkowana ze strony rozgałęzienia `docs/index.html`.
      **Ma dwa braki, a poza tym nie jest jeszcze zatwierdzona w gicie (czyli
      nie ma jej na GitHub Pages) — patrz punkt 4.**
* [x] **30 języków** — `docs/v5/js/i18n/locales/`: ar, bn, cs, de, el, en, es, fa,
      fr, hi, hu, id, it, ja, ko, ms, nl, pl, pt, ro, ru, sv, ta, te, th, tr, uk,
      ur, vi, zh. Domyślnie język urządzenia, angielski jako zapas.
      **Uwaga o jakości tłumaczeń — punkt 5.**
* [x] **Zastrzeżenie „to nie jest wyrób medyczny"** — obecne w interfejsie
      (klucze `onboarding.honesty`, `measure.method.p5`, `tools.about.limit.medical.*`)
      i w polityce prywatności, po polsku i po angielsku.
* [x] **Metadane stron do linkowania** — `docs/index.html` i `docs/prywatnosc.html`
      mają tytuł, `meta description`, ikonę, `apple-touch-icon`, poprawne
      `lang="pl"` (angielska część polityki w osobnym `<div lang="en">`),
      `color-scheme` i `theme-color`. Dołożone 29 sierpnia 2026: `link rel="canonical"`,
      komplet `og:*` z bezwzględnymi adresami, `twitter:card` i drugi rozmiar ikony.
* [x] **`docs/.nojekyll`** — wyłącza przetwarzanie witryny przez Jekylla,
      dzięki czemu GitHub Pages serwuje też katalogi zaczynające się od kropki
      (czyli `.well-known/`).
* [x] **Wzorzec `assetlinks.json`** — `docs/.well-known/assetlinks.json`
      z opisem w `docs/.well-known/README.md`. **To dopiero wzorzec, nie
      działające powiązanie — patrz punkt 2.4.**
* [x] **Instrukcja robienia zrzutów** — `docs/v5/screenshots/README.md`.
      **Samych zrzutów jeszcze nie ma.**

### Czego NIE ma (skrót — szczegóły niżej)

| Brak | Gdzie opisany |
|---|---|
| Konto dewelopera Google Play i Apple | 2.1, 3.1 |
| `package_name`, klucz podpisujący, odcisk SHA-256 | 2.2, 2.4 |
| `assetlinks.json` pod korzeniem domeny | 2.4 |
| Zrzuty ekranu (telefon, szeroki, tablet) i grafika promocyjna 1024 × 500 | 2.5 |
| Pole `screenshots` w manifeście | 2.5 |
| Formularz Data safety, ankieta IARC | 2.6, 2.7 |
| Natywny kontener na iOS | 3.2 |
| Dane administratora i adres e-mail w polityce prywatności | 4 |
| Weryfikacja tłumaczeń w językach publikacji | 5 |
| Decyzja w sprawie adresu darowizn (`SUPPORT_URL` jest pusty) | 6 |

---

## 2. Google Play — przez PWABuilder / TWA

Aplikacja pójdzie jako **TWA** (Trusted Web Activity): cienka natywna paczka,
która otwiera tę samą witrynę na pełnym ekranie, bez paska adresu. Kod aplikacji
zostaje na GitHub Pages; do sklepu idzie tylko opakowanie.

### 2.1. Konto dewelopera

* [ ] Załóż konto Google Play Developer — **jednorazowa opłata 25 USD** —
      i przejdź weryfikację tożsamości (dowód, adres; Google potrafi to ciągnąć
      kilka dni).
* [ ] **Zaplanuj czas na wymuszone testy.** Konta **osobiste** założone po
      **13 listopada 2023** muszą przed wypuszczeniem na produkcję przeprowadzić
      **testy zamknięte z minimum 12 testerami zapisanymi nieprzerwanie przez
      co najmniej 14 dni**. To nie jest formalność do obejścia: bez tego przycisk
      wypuszczenia na produkcję jest nieaktywny. Konta **firmowe (organizacja)**
      tego wymogu nie mają — jeśli publikacja ma być pod firmą, warto założyć
      od razu konto firmowe.
      → **Decyzja właściciela: konto osobiste czy firmowe.**

### 2.2. Paczka

* [ ] Wybierz **`package_name`** — konwencja: odwrócona domena,
      np. `io.github.cwichula.lightmonitor`. **Raz opublikowanego nie da się
      zmienić.**
* [ ] Zbuduj paczkę: [pwabuilder.com](https://www.pwabuilder.com/) → adres
      `https://cwichula.github.io/blueColorMonitor/v5/` → Android → Google Play.
      Alternatywa dla wiersza poleceń: `bubblewrap init --manifest=…`.
      **Do Play Console idzie plik `.aab`** (Android App Bundle). Plik `.apk`
      służy wyłącznie do testu na własnym telefonie i to jego dotyczy
      `INSTRUKCJE.md` krok 5. Wymóg App Signing dla nowych aplikacji opisuje
      `developer.android.com/guide/app-bundle/faq`.
* [ ] Zapisz **klucz podpisujący** (plik `.keystore` + hasła) w miejscu, którego
      nie zgubisz. Utrata klucza przy wyłączonym Play App Signing = koniec
      możliwości aktualizowania aplikacji.
* [ ] Zostaw włączone **Play App Signing** (domyślne). Wtedy kluczem właściwym
      jest klucz Google, a Twój jest tylko kluczem wysyłkowym — to ma znaczenie
      przy odcisku w punkcie 2.4.
* [ ] Sprawdź **`targetSdkVersion`** wygenerowanej paczki. Play co roku (koniec
      sierpnia) podnosi minimalny próg dla nowych aplikacji i aktualizacji.
      **Od 31 sierpnia 2026 próg to API 36 (Android 16), a generatory paczek
      bywają o rok w tyle** — szablon Bubblewrap ustawia 35. Otwórz
      `build.gradle` modułu `app`, podnieś `targetSdkVersion` do 36
      i przebuduj. Sprawdź to **przed pierwszym uploadem, także testowym** —
      bramka działa również na torze testów zamkniętych, więc zatrzymuje
      zegar 14 dni z punktu 2.1.

### 2.3. Test na urządzeniu przed wysyłką

* [ ] Zainstaluj podpisaną paczkę na telefonie i sprawdź, czy **kamera w ogóle
      rusza** w opakowaniu TWA. Zawartość renderuje Chrome, więc uprawnienie do
      kamery należy do Chrome'a, a nie do paczki — ale **to trzeba sprawdzić
      doświadczalnie, a nie założyć.** Jeśli `getUserMedia` odmawia, dopisz
      `<uses-permission android:name="android.permission.CAMERA"/>`
      do `AndroidManifest.xml` paczki i sprawdź ponownie.
* [ ] Sprawdź, że aplikacja działa **w trybie samolotowym** po pierwszym
      uruchomieniu z siecią.
* [ ] Sprawdź, że **nie widać paska adresu** (jeśli widać — punkt 2.4 nie jest
      zrobiony).
* [ ] Sprawdź **eksport CSV i eksport JSON**. Aplikacja klika ukryty
      `<a download>` i pokazuje komunikat o powodzeniu **bezwarunkowo**, więc
      „wygląda, że działa” nie jest dowodem — sprawdź, czy plik faktycznie
      wylądował w pobranych.
* [ ] Jeśli `SUPPORT_URL` jest wypełniony: sprawdź **odsyłacz darowizn** —
      czy otwiera stronę Buy Me a Coffee w osobnej karcie i czy „Wstecz”
      wraca do aplikacji, a nie zamyka jej.

### 2.4. `assetlinks.json` — najważniejszy punkt techniczny

Wzorzec leży w `docs/.well-known/assetlinks.json`, a pełny opis w
`docs/.well-known/README.md`. **Streszczenie problemu, żeby nie umknął:**

> Android czyta ten plik **wyłącznie z korzenia domeny**:
> `https://cwichula.github.io/.well-known/assetlinks.json`.
> Witryna tego projektu stoi **pod ścieżką** `…/blueColorMonitor/`, bo jest
> publikowana z repozytorium projektowego. Plik leżący w `docs/` będzie dostępny
> pod adresem `…/blueColorMonitor/.well-known/assetlinks.json`, **którego Android
> nigdy nie odpyta**. Korzeń `cwichula.github.io` serwuje **inne repozytorium** —
> to o nazwie `cwichula.github.io`, którego dziś nie ma.
> **Plik w tym repozytorium sam z siebie nie załatwia sprawy.**

* [ ] **Decyzja właściciela:** repozytorium `cwichula.github.io` (szybciej,
      ale powiąże aplikację z całym kontem GitHub Pages, bo weryfikacja działa
      na origin, nie na ścieżkę) **albo** własna domena (czyściej, kosztuje,
      wymaga zmiany adresów i przeniesienia użytkowników).
* [ ] Wstaw prawdziwy `package_name` w miejsce `DO.UZUPELNIENIA.package.name`.
* [ ] Wstaw prawdziwy odcisk **SHA-256 klucza, którym Play podpisuje aplikację**
      (Play Console → Test and release → Setup → App integrity → **App signing key**
      certificate), w miejsce wypełniacza `DO:UZ:UP:EL:NI:EN:IA:00:…`.
      Częsty błąd: wpisanie odcisku **klucza wysyłkowego** zamiast podpisującego.
* [ ] Opublikuj plik pod korzeniem domeny, po HTTPS, ze statusem 200, bez
      przekierowań. Pamiętaj o pustym `.nojekyll` w tamtym repozytorium.
* [ ] Sprawdź narzędziem Google:
      `https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://cwichula.github.io&relation=delegate_permission/common.handle_all_urls`

### 2.5. Zrzuty ekranu i grafiki

Pełna instrukcja z gotowymi poleceniami: **`docs/v5/screenshots/README.md`**.
Zrzutów **w repozytorium nie ma**, więc pole `screenshots` w manifeście
**celowo nie zostało dopisane** — wpis wskazujący na nieistniejący plik psuje
bogatszy dialog instalacji i zapala błąd w audytach. Kolejność jest taka:
najpierw pliki, potem wpis.

* [ ] 4 zrzuty telefonu **1080 × 1920 px** (JPEG do Play, PNG do manifestu).
* [ ] 2 zrzuty szerokie **1280 × 800 px** (PNG, `form_factor: "wide"` — tylko manifest).
* [ ] Jeśli deklarujesz obsługę tabletów: po 4 zrzuty dla 7" i 10",
      1080–7680 px, proporcje 16:9 albo 9:16.
* [ ] **Grafika promocyjna 1024 × 500 px** (feature graphic) — JPEG albo
      24-bitowy PNG bez alfy. **Tej nie da się zrobić zrzutem, trzeba ją
      zaprojektować.**
* [ ] Ikona 512 × 512 — **gotowa**, `docs/v5/icons/icon-512.png`.
* [ ] Dopisz `screenshots` do `docs/v5/manifest.webmanifest`, a potem **podnieś
      `CACHE`** w `docs/v5/sw.js` (dziś `'ms5-10'`) — manifest jest zapisywany
      z góry, więc bez tego telefony dostaną starą wersję.
* [ ] Teksty listingu: krótki opis (do 80 znaków) i pełny opis (do 4000).
      **Bez słów sugerujących diagnozę, leczenie czy pomiar medyczny** — to
      najprostsza droga do dodatkowej kontroli albo odrzucenia.

### 2.6. Formularz Data safety (Bezpieczeństwo danych)

To formularz w Play Console → **App content → Data safety**. Wypełnia się go
oświadczeniem, a Google porównuje deklarację z zachowaniem aplikacji.
**Dla tej aplikacji odpowiedź jest jednoznaczna:**

* [ ] „Does your app collect or share any of the required user data types?" →
      **No / Nie.**
* [ ] Efekt na karcie sklepu: **„No data collected"** i **„No data shared with
      third parties"**.
* [ ] Pytania o szyfrowanie w tranzycie i o możliwość usunięcia danych → **nie
      dotyczy** (nie ma czego przesyłać ani czego usuwać po stronie serwera;
      historię kasuje sam użytkownik w ekranie Narzędzia).

**Dlaczego to jest prawda, a nie wygodna odpowiedź** — argumentacja na wypadek
pytania recenzenta:

1. Aplikacja **nie ma serwera i nie wykonuje żadnego wywołania sieciowego**.
   Jedyne `fetch()` w kodzie są w service workerach i pobierają wyłącznie własne
   pliki aplikacji z tego samego adresu. Nie ma `XMLHttpRequest`, `sendBeacon`,
   `WebSocket`, `EventSource` ani żadnej biblioteki z obcego serwera.
2. **Obraz z kamery nie jest zbierany.** Klatka trafia na canvas 64 × 64,
   zostaje uśredniona do kilku liczb i jest natychmiast nadpisywana. Nic nie jest
   zapisywane, nic nie jest wysyłane. W terminologii Play to **przetwarzanie
   ulotne (ephemeral) i wyłącznie na urządzeniu**, a takie nie liczy się jako
   zbieranie danych.
3. **Historia pomiarów zostaje na urządzeniu** (`localStorage`). Dane, które nie
   opuszczają urządzenia, nie są w rozumieniu formularza ani zbierane, ani
   udostępniane.
4. Nie ma konta, reklam, analityki, identyfikatorów ani żadnego SDK strony trzeciej.

* [ ] Uzasadnienie kamery w listingu i, jeśli Play o nie zapyta, w odpowiedzi
      dla recenzenta — jednym zdaniem: *„Kamera jest jedynym czujnikiem, którym
      aplikacja mierzy światło. Obraz jest analizowany w pamięci urządzenia
      i nigdy go nie opuszcza; aplikacja nie robi ani nie zapisuje zdjęć."*
* [ ] Wpisz adres polityki prywatności: `https://cwichula.github.io/blueColorMonitor/prywatnosc.html`
      (App content → Privacy policy). **Najpierw uzupełnij punkt 4.**

### 2.7. Ankieta IARC (kategoria wiekowa)

* [ ] Wypełnij ankietę w Play Console (App content → Content rating). Aplikacja
      nie ma przemocy, treści dla dorosłych, komunikacji między użytkownikami
      ani treści generowanych przez użytkowników — spodziewana kategoria to
      **3+ / Everyone**.
* [ ] Odpowiadaj zgodnie ze stanem faktycznym na pytania o **zakupy cyfrowe,
      lokalizację i udostępnianie danych** — odpowiedź na wszystkie brzmi „nie".
      Aplikacja nie ma żadnych zakupów w aplikacji; jedyne wsparcie to
      dobrowolna darowizna otwierana w przeglądarce, poza aplikacją (punkt 6).

### 2.8. Reszta formularzy

* [ ] App access — zaznacz, że **cała funkcjonalność jest dostępna bez logowania**
      (nie ma konta), więc recenzent nie potrzebuje danych dostępowych.
* [ ] Monetyzacja / ceny — **bezpłatna, bez zakupów w aplikacji**. Aplikacja nie
      ma subskrypcji, płatnych funkcji ani żadnych zakupów; jedyne wsparcie to
      dobrowolna darowizna przez zewnętrzny odsyłacz Buy Me a Coffee, otwierany
      w przeglądarce.
* [ ] Ads — **aplikacja nie zawiera reklam**.
* [ ] Target audience — **nie** jest kierowana do dzieci (to upraszcza wymogi
      Families Policy).
* [ ] **Government apps** — nie dotyczy.
* [ ] **Financial features** — nie dotyczy. Aplikacja nie prowadzi płatności,
      przelewów ani zbiórki; odsyłacz do cudzej strony nie czyni z niej funkcji
      finansowej.
* [ ] **Health apps declaration — TO NIE JEST PYTANIE „czy dotyczy”.** Formularz
      jest **obowiązkowy dla każdej aplikacji w Google Play**, łącznie z tymi na
      torze testów zamkniętych (answer/14738291). Dopóki go nie złożysz,
      **Play nie przyjmie do recenzji żadnej zmiany** — więc złóż go od razu po
      założeniu konta, zanim ruszy zegar 14 dni.
      Treść deklaracji jest osobną decyzją i nie jest darmowa w żadną stronę:
      za „brak funkcji zdrowotnych” przemawia to, że aplikacja mierzy otoczenie,
      a nie człowieka; przeciw — że wskaźnik nazywa się „Wpływ na rytm dobowy”,
      a porady mówią o godzinach przed snem. Jeśli wybierzesz kategorię
      (np. Sleep Management), formularz dopyta o status wyrobu medycznego.
      **Niczego z sekcji Medical nie deklaruj.**
* [ ] Niezależnie od powyższego wklej do **opisu w sklepie** formułę, której
      Google wymaga wprost (answer/16679511), po angielsku i po polsku:
      „Light Monitor is not a medical device and does not diagnose, treat, cure,
      or prevent any medical condition. Consult a healthcare professional for
      medical advice, diagnosis or treatment.”
* [ ] Adres e-mail kontaktowy dewelopera (widoczny publicznie na karcie sklepu)
      — **ten sam, który wpiszesz w polityce prywatności**.

---

## 3. App Store — uczciwie o ryzyku

### 3.1. Czego nie da się obejść

* **PWA nie da się wysłać do App Store wprost.** Apple przyjmuje wyłącznie
  paczki `.ipa` zbudowane z projektu Xcode. Nie istnieje odpowiednik TWA:
  Apple nie ma mechanizmu, który po weryfikacji domeny otwierałby witrynę jako
  aplikację. **Trzeba zbudować natywny kontener** — `WKWebView` w aplikacji
  Swift (PWABuilder generuje taki szkielet; można też Capacitor).
* [ ] **Apple Developer Program: 99 USD rocznie**, płatne co roku, plus
      weryfikacja tożsamości. Bez opłaty nie ma wysyłki.
* [ ] Do zbudowania i wysłania paczki potrzebny jest **Xcode na macOS** — własny
      albo wynajęty (Codemagic, Bitrise, `macos` runner w GitHub Actions; wysyłkę
      wykonuje się kluczem App Store Connect API). Własny Mac nie jest więc
      bezwzględnie konieczny, ale **fizyczny iPhone jest**: symulator nie ma
      kamery, więc główna funkcja aplikacji nie da się na nim sprawdzić.

### 3.2. Co trzeba przygotować

* [ ] Projekt Xcode z `WKWebView` ładującym v5.
* [ ] `NSCameraUsageDescription` w `Info.plist` — **tekst widoczny dla
      użytkownika**, po angielsku i w językach publikacji. Bez tego wpisu
      aplikacja przy pierwszym pytaniu o kamerę **wywala się**, a nie tylko
      dostaje odmowę.
* [ ] Konfiguracja `WKWebView`, bez której kamera nie ruszy albo obraz wyjdzie
      na pełny ekran systemowego odtwarzacza: `allowsInlineMediaPlayback = true`
      i pusty `mediaTypesRequiringUserActionForPlayback`.
* [ ] **Rozstrzygnąć, skąd kontener bierze pliki.** Dwie drogi, obie z haczykiem:
      * ładowanie z sieci (`https://cwichula.github.io/…/v5/`) — service worker
        i `localStorage` działają, ale aplikacja jest wtedy **dosłownie
        opakowaną stroną**, czyli wprost tym, co bierze na cel wytyczna 4.2;
        do działania offline potrzebna jest konfiguracja **App-Bound Domains**
        (`WKAppBoundDomains` w `Info.plist`);
      * pliki wbudowane w paczkę — aplikacja działa bez sieci od pierwszego
        uruchomienia, ale **service worker w takim trybie nie działa**, więc
        trzeba sprawdzić, czy nic w v5 na nim nie stoi (dziś stoi na nim tylko
        pamięć podręczna, a nie logika — ale to trzeba potwierdzić testem).
      → **Decyzja właściciela.**
* [ ] Zrzuty ekranu w rozmiarach wymaganych przez App Store Connect — **Apple
      zmienia je co roku wraz z nowymi urządzeniami**, więc odczytaj aktualną
      listę w App Store Connect w chwili wysyłki, zamiast robić je „na zapas".
      Wymagany jest komplet dla największego iPhone'a, a jeśli deklarujesz iPada
      — także dla iPada.
* [ ] **App Privacy** (odpowiednik Data safety): **„Data Not Collected"**.
      Uzasadnienie identyczne jak w punkcie 2.6.
* [ ] Age rating, kategoria, opis, słowa kluczowe, adres polityki prywatności,
      adres pomocy technicznej (**Apple wymaga działającego adresu URL wsparcia**).
* [ ] Export compliance: aplikacja nie zawiera własnej kryptografii —
      przy wysyłce zwykle wystarczy `ITSAppUsesNonExemptEncryption = false`.
* [ ] **Rozstrzygnij, czy odsyłacz do darowizn ma być w wersji na iOS.**
      Właściwe wytyczne to **3.1.1(a)** (zakaz przycisków i odnośników do
      mechanizmów zakupowych innych niż IAP — **z wyłączeniem storefrontu USA,
      gdzie zakaz nie obowiązuje**) oraz **3.2.2(iv)**, która zbieranie środków
      poza aplikacją wprost **dopuszcza** („may only collect funds outside of the
      app, such as via Safari or SMS”). Wcześniejsza wersja tego dokumentu
      powoływała się na 3.2.1 — to sekcja zatytułowana **„Acceptable”**, czyli
      katalog rzeczy dozwolonych, i cytowanie jej jako zakazu było błędem.
* [ ] Jeśli decyzja brzmi „zostawiamy pusty `SUPPORT_URL`”, to **nie jest to
      wariant darmowy**: ekran Wsparcie zapowiada wtedy przycisk, którego nie ma
      (`support.cta.nolink`, `support.cta.privacyFuture`), a Apple 2.1(a) każe
      usunąć treść tymczasową przed wysyłką. Trzeba zmienić te dwa klucze
      w **30 słownikach** na zdania zamknięte — kluczy nie usuwać, bo
      `keys.test.js` pilnuje parytetu.
* [ ] **Uwaga przy wariancie zdalnym:** polecenie „zostaw pusty w buildzie iOS”
      jest wtedy niewykonalne — kontener czyta ten sam `docs/v5/js/support.js`
      co witryna, więc nie ma osobnego „buildu iOS”, w którym dałoby się coś
      zostawić.

### 3.3. Ryzyko 4.2 — nazwane wprost

Wytyczna **4.2 (Minimum Functionality)** mówi, że aplikacja ma dawać coś więcej
niż przepakowana strona internetowa. Aplikacje będące opakowanym `WKWebView`
**bywają z tego powodu odrzucane**, i to jest najczęstszy powód odrzucenia
tego rodzaju wysyłek.

**Nie ma sposobu, żeby to zagwarantować z góry. Nikt nie może obiecać, że
przejdzie.** Można tylko poprawić szanse:

* aplikacja korzysta z **kamery jako czujnika** i liczy na urządzeniu — to jest
  realny argument, że nie jest to katalog treści zawinięty w ramkę;
* działa **bez internetu** — to drugi argument;
* co pomaga dodatkowo (do rozważenia, każde to praca w Swifcie):
  powiadomienia lokalne (przypomnienie o pomiarze wieczorem), widżet z ostatnim
  odczytem, zapis eksportu przez natywny arkusz udostępniania, skrót Siri.

* [ ] **Decyzja właściciela: czy w ogóle wchodzić na App Store**, czy zacząć od
      samego Google Play i wrócić do iOS, gdy aplikacja będzie miała co najmniej
      jedną funkcję natywną. Koszt wejścia to 99 USD rocznie, komputer z macOS
      i realne ryzyko odrzucenia.

---

## 4. Polityka prywatności — dwa braki do uzupełnienia PRZED wysyłką

Plik: **`docs/prywatnosc.html`**. Dokument jest kompletny merytorycznie, ale ma
**dwa miejsca oznaczone jako do uzupełnienia**:

* [ ] **Rozdział „1. Kto odpowiada za aplikację"** (część polska):
      `[dane administratora do uzupełnienia]` i `[adres e-mail do uzupełnienia]`.
      W kodzie stoi nad tym komentarz `TU WPISZ DANE ADMINISTRATORA…`.
* [ ] **Sekcja „Privacy Policy (English summary)", nagłówek „Contact"**:
      `[controller name and contact e-mail to be filled in]`.

**Dopóki te miejsca są puste, dokument jest niekompletny w rozumieniu obu
regulaminów** — i Google Play, i App Store wymagają, żeby polityka prywatności
wskazywała podmiot odpowiedzialny i **działający** kanał kontaktu. Oba sklepy
pytają dodatkowo o adres e-mail w osobnym formularzu; **musi to być ten sam
adres** co w polityce, bo rozjazd bywa wyłapywany przy weryfikacji.

* [ ] Wpisz **imię i nazwisko albo nazwę firmy** oraz **adres e-mail, który
      naprawdę odbierasz**. Adres będzie **publiczny** na karcie sklepu — jeśli
      to ma nie być adres prywatny, załóż osobny przed wysyłką.
* [ ] Po uzupełnieniu **zatwierdź i wypchnij plik**, a potem podnieś `CACHE`
      w `docs/v5/sw.js` — kopia polityki jedzie razem z aplikacją i bez podbicia
      numeru telefony zostaną przy poprzedniej wersji dokumentu.
* [ ] **Pamiętaj o bliźniaku.** Polityka istnieje w DWÓCH plikach:
      `docs/prywatnosc.html` (witryna) i `docs/v5/prywatnosc.html` (kopia wożona
      z aplikacją, bo oba sklepy wymagają polityki wewnątrz aplikacji). Każdą
      zmianę treści wprowadzaj w obu — rozjazd między nimi znaczy, że recenzent
      i użytkownik czytają różne dokumenty.
* [ ] Po uzupełnieniu i wypchnięciu sprawdź, że strona otwiera się pod adresem
      `https://cwichula.github.io/blueColorMonitor/prywatnosc.html` i **że nie
      wymaga logowania** (recenzent otwiera ją anonimowo).

---

## 5. Tłumaczenia — ostrzeżenie przed publikacją

**Wszystkie 30 języków powstało maszynowo i żadnego nie sprawdzał native speaker.**
W codziennym interfejsie błąd stylistyczny nic nie kosztuje. Ale część zdań ma
**skutki prawne** i to one bronią aplikacji przed zarzutem, że udaje przyrząd
medyczny:

* zastrzeżenie „to nie jest wyrób medyczny" — klucze `onboarding.honesty`,
  `measure.method.p5`, `tools.about.limit.medical.title`, `…limit.medical.text`;
* zdania o prywatności — wszędzie tam, gdzie pada, że obraz nie opuszcza urządzenia.

Ryzyko jest konkretne: jeśli w którymś języku maszyna przetłumaczy „to nie jest
badanie medyczne" tak, że wyjdzie z tego obietnica badania, aplikacja obiecuje
w sklepie coś, czego regulaminy zabraniają — a odpowiada za to wydawca, nie
tłumacz.

* [ ] Zrób listę języków, w których **faktycznie** publikujesz listing
      (na start zwykle: **angielski i polski** — reszta i tak dostanie listing
      w języku domyślnym).
* [ ] Dla **każdego z tych języków** daj do przejrzenia człowiekowi te dwie
      grupy zdań. To kilkanaście zdań na język, nie cały interfejs.
* [ ] Teksty listingu w sklepie (opis krótki i pełny) traktuj tak samo —
      one też są oświadczeniem wydawcy.
* [ ] Reszta języków może zostać maszynowa; warto tylko dopisać w opisie, że
      tłumaczenia są automatyczne.

---

## 6. Darowizny — decyzja przed publikacją

Jedyna monetyzacja tej aplikacji to **dobrowolna darowizna przez Buy Me
a Coffee** — zewnętrzny odsyłacz, który niczego nie odblokowuje i nie jest
zakupem w aplikacji. W `docs/v5/js/support.js` stała **`SUPPORT_URL` jest
pusta**, więc ekran wsparcia nie pokazuje żadnego adresu (w komentarzu jest
tylko przykład adresu Buy Me a Coffee). Sposób wpisania adresu opisuje
`INSTRUKCJE.md`, rozdział 5.1.

* [ ] **Decyzja: czy odsyłacz do darowizn ma być w wersjach sklepowych.**
* [ ] Jeśli **tak** — sprawdź w opisie listingu, czy zgadza się ze stanem
      faktycznym, i upewnij się, że zewnętrzny odsyłacz do darowizn mieści się
      w aktualnych zasadach Google Play.
* [ ] Na **iOS** — patrz punkt 3.2. Właściwe wytyczne to 3.1.1(a) i 3.2.2(iv),
      nie 3.2.1.
* [ ] **Warunek po stronie profilu Buy Me a Coffee.** Wyjątek płatniczy Google
      (peer-to-peer, answer/10281818) trzyma się wyłącznie dopóty, dopóki wpłata
      **nie daje dostępu do żadnej treści ani usługi cyfrowej**. Na profilu,
      którego adres trafi do `SUPPORT_URL`, muszą więc zostać **wyłączone
      Memberships i Extras** — inaczej odsyłacz prowadzi do sprzedaży treści
      cyfrowej i obrona rozsypuje się po obu stronach, u Google i u Apple.
      Walidacja w kodzie sprawdza tylko protokół i host, nie ścieżkę, więc
      tego warunku **nie da się wymusić technicznie** — trzeba go pilnować.
* [ ] `SUPPORT_URL` jest w **pięciu** plikach, nie w jednym: `docs/v1/support.js`,
      `docs/v2/support.js`, `docs/v3/support.js`, `docs/v4/screen-support.js`,
      `docs/v5/js/support.js`. Jedna czynność z `INSTRUKCJE.md` włącza pięć
      odsyłaczy płatniczych w tym samym pochodzeniu.
* [ ] Polityka prywatności ma już rozdział „7. Darowizny" — sprawdź, czy jego
      treść zgadza się z tym, co ostatecznie zrobisz.

---

## 7. Kolejność, w jakiej to robić

1. Uzupełnij politykę prywatności (punkt 4) — blokuje oba sklepy.
2. Zdecyduj o domenie / repozytorium korzenia (punkt 2.4) — blokuje TWA bez paska adresu.
3. Załóż konto Play i uruchom testy zamknięte (punkt 2.1) — to trwa najdłużej (14 dni).
4. Zrób zrzuty i grafikę promocyjną (punkt 2.5) — najwięcej pracy ręcznej.
5. Zbuduj paczkę, wstaw odcisk do `assetlinks.json`, sprawdź na urządzeniu (2.2–2.4).
6. Wypełnij Data safety i IARC (2.6, 2.7), wypuść na testy zamknięte.
7. Dopiero po opublikowaniu w Play wracaj do decyzji o App Store (punkt 3).

## 8. Rzeczy, których nikt poza właścicielem nie rozstrzygnie

| Decyzja | Punkt |
|---|---|
| Konto Play osobiste czy firmowe (wpływa na wymóg 12 testerów / 14 dni) | 2.1 |
| Ostateczny `package_name` (nieodwracalny) | 2.2 |
| Repozytorium `cwichula.github.io` czy własna domena | 2.4 |
| Dane administratora i publiczny adres e-mail | 4 |
| Języki listingu i zakres weryfikacji tłumaczeń | 5 |
| Czy i gdzie pokazywać odsyłacz do darowizn | 6 |
| Czy w ogóle wchodzić na App Store (99 USD/rok, macOS, ryzyko 4.2) | 3.3 |
