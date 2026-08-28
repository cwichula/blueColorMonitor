# `assetlinks.json` — po co ten plik i dlaczego w tym miejscu NIE WYSTARCZY

Ten katalog zawiera **wzorzec** pliku Digital Asset Links (`assetlinks.json`).
Plik jest potrzebny, żeby aplikacja spakowana jako **TWA** (Trusted Web Activity,
np. przez PWABuilder albo Bubblewrap) otwierała witrynę **bez paska adresu**.
Bez zweryfikowanego powiązania Android traktuje TWA jak zwykłą kartę Chrome
Custom Tab: nad treścią zostaje pasek z adresem i kłódką, a recenzent Google Play
widzi „przeglądarkę z jedną stroną", nie aplikację.

---

## 1. NAJWAŻNIEJSZE: tutaj ten plik NIE ZADZIAŁA

Android pobiera plik **wyłącznie z korzenia domeny (origin)**, pod stałą ścieżką:

```
https://<domena>/.well-known/assetlinks.json
```

Witryna projektu jest publikowana przez GitHub Pages z **repozytorium projektowego**
(`blueColorMonitor`, gałąź `master`, katalog `docs`), więc stoi **pod ścieżką**:

```
https://cwichula.github.io/blueColorMonitor/
```

Czyli plik z tego katalogu będzie dostępny jako:

```
https://cwichula.github.io/blueColorMonitor/.well-known/assetlinks.json   ← Android tego NIE czyta
```

a Android będzie szukał:

```
https://cwichula.github.io/.well-known/assetlinks.json                    ← tego Android szuka
```

To **inne repozytorium** — GitHub Pages serwuje korzeń `cwichula.github.io`
tylko z repozytorium o nazwie **`cwichula.github.io`** (tzw. strona użytkownika).
Takiego repozytorium ten projekt nie ma i nie może go „udawać" z podkatalogu.

**Wniosek: plik leżący tutaj jest wzorcem i dokumentacją. Nie zamyka tematu.**
Nie należy raportować, że „assetlinks jest zrobiony", dopóki nie odpowiada
poprawnie adres z korzenia domeny.

### Dwie drogi wyjścia (do decyzji właściciela)

**A. Repozytorium strony użytkownika.**
Załóż publiczne repozytorium o nazwie dokładnie `cwichula.github.io`, włącz w nim
GitHub Pages i umieść w nim `.well-known/assetlinks.json` (treść jak tutaj, po
uzupełnieniu wartości). Skutek uboczny, o którym trzeba wiedzieć: weryfikacja
Digital Asset Links działa **na całą domenę (origin), nie na ścieżkę** — plik
w korzeniu `cwichula.github.io` powiąże aplikację z **całym** kontem GitHub Pages,
czyli także z każdą inną witryną projektową pod tym adresem. Dopóki wszystkie
witryny pod tym kontem są Twoje, to nie jest problem, ale warto to wiedzieć,
zanim się to zrobi.

**B. Własna domena (zalecane, jeśli aplikacja ma iść do sklepu na dłużej).**
Kup domenę, wskaż ją na GitHub Pages (plik `CNAME` w `docs/`, wpis DNS),
i wtedy korzeń domeny jest Twój — `https://twojadomena.pl/.well-known/assetlinks.json`
serwuje się z tego samego repozytorium co aplikacja. Odpada problem z punktu A
i odpada dzielenie origin z innymi projektami. Uwaga: zmiana domeny zmienia
`start_url` i `scope` PWA, więc trzeba wtedy zaktualizować odsyłacze i pamiętać,
że użytkownicy z zainstalowaną wersją spod `github.io` mają ją przypiętą do
starego adresu.

---

## 2. Co uzupełnić w `assetlinks.json`

W pliku obok są dwa wypełniacze. Oba są **celowo nieprawidłowe**, żeby nikt nie
wysłał ich do sklepu przez pomyłkę:

| Pole | Wypełniacz w pliku | Skąd wziąć prawdziwą wartość |
|---|---|---|
| `package_name` | `DO.UZUPELNIENIA.package.name` | Identyfikator aplikacji nadany przy tworzeniu paczki TWA (PWABuilder/Bubblewrap pytają o niego; w Play Console jest **nieodwracalny** — raz opublikowanego nie da się zmienić). Konwencja: odwrócona domena, np. `io.github.cwichula.lightmonitor`. |
| `sha256_cert_fingerprints` | `DO:UZ:UP:EL:NI:EN:IA:00:…` (32 grupy) | Odcisk SHA-256 certyfikatu, którym podpisany jest plik AAB/APK. |

Format odcisku: **32 grupy po dwa znaki szesnastkowe, wielkimi literami,
rozdzielone dwukropkami**, np. `A1:B2:C3:…:9F`.

### Skąd wziąć odcisk — i który to ma być

To najczęstszy błąd przy TWA: **liczy się odcisk klucza, którym Google Play
podpisuje aplikację dla użytkowników, a nie tego, którym Ty podpisałeś wysyłkę.**
Jeśli korzystasz z **Play App Signing** (domyślnie włączone), Google podpisuje
paczkę własnym kluczem. Wtedy poprawną wartość znajdziesz w:

```
Play Console → (aplikacja) → Test and release → Setup → App integrity
  → App signing key certificate → SHA-256 certificate fingerprint
```

Skopiuj wartość **App signing key**, nie **Upload key**. (Można wpisać w tablicę
oba odciski — to legalne i bywa wygodne, bo wtedy działa też wersja instalowana
lokalnie z pliku podpisanego kluczem wysyłkowym.)

Z lokalnego magazynu kluczy odcisk odczytuje się tak:

```
keytool -list -v -keystore <plik.keystore> -alias <alias>
```

---

## 3. Jak sprawdzić, że działa

1. Plik musi się serwować **z korzenia domeny**, po HTTPS, jako
   `application/json`, ze statusem 200 (żadnych przekierowań).
2. Sprawdzenie oficjalnym narzędziem Google (podstaw swoje wartości):

   ```
   https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://cwichula.github.io&relation=delegate_permission/common.handle_all_urls
   ```

   W odpowiedzi ma się pojawić Twój `package_name` i odcisk, a lista `errorCode`
   ma być pusta.
3. Na telefonie: zainstaluj podpisaną paczkę i uruchom. **Jeśli po uruchomieniu
   widać pasek adresu, weryfikacja nie przeszła.** Android sprawdza powiązanie
   przy pierwszym uruchomieniu i wynik cache'uje — po poprawieniu pliku
   odinstaluj i zainstaluj aplikację ponownie.

---

## 4. `docs/.nojekyll`

GitHub Pages domyślnie przepuszcza witrynę przez Jekylla, a Jekyll pomija pliki
i katalogi zaczynające się od kropki — czyli mógłby pominąć `.well-known/`.
Dlatego w `docs/` leży pusty plik `.nojekyll`, który wyłącza to przetwarzanie
i każe serwować katalog dosłownie. Witryna nie korzysta z żadnej funkcji Jekylla,
więc nic przez to nie traci. **Ten sam pusty plik `.nojekyll` trzeba położyć
w repozytorium, które ostatecznie będzie serwować korzeń domeny.**
