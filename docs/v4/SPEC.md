# Monitor Światła v4 — SPECYFIKACJA WIĄŻĄCA

Wersja dokumentu: 2.0 · 2026-08-27 · autor: projektant v4

**Co zmieniło się w wersji 2.0 dokumentu.** Aplikacja przeszła z modelu płatnego na model
DOBROWOLNEGO WSPARCIA. Zniknęły bez śladu: pakiety i ich ceny, okres bezpłatny na próbę,
ekran oferty i każdy jego wariant, podział wielkości na dostępne i zamknięte wraz
z kłódkami i plakietkami dostępu, a także symulowane konto z całą obsługą dostawców.
Wszystkie siedem wielkości działa dla każdego, od razu i bez warunków. Zakładka, która
nazywała się „Konto”, nazywa się teraz „Wsparcie” i mieści jedną dobrowolną prośbę
o darowiznę obok całych ustawień aplikacji.
Zakres: wszystko w `docs/v4/`. Nic poza tym katalogiem nie jest zmieniane.

Ten plik jest jedynym źródłem prawdy dla ośmiu autorów piszących równolegle, którzy
nie widzą nawzajem swoich plików. Jeśli kod i ten dokument się różnią — błąd jest w kodzie.
Jeśli czegoś tu nie ma, a jest potrzebne — dopisz to w rozdziale 9 („Dopisane klasy”),
nie wymyślaj po cichu własnej konwencji.

---

## 0. Jak czytać ten dokument i kto co pisze

### 0.1 Pliki i właściciele (jeden plik = jeden autor, zero kolizji)

| plik | właściciel | rola |
|---|---|---|
| `../shared/metrics.js` | GOTOWE, NIETYKALNE | matematyka pomiaru, katalog 7 wielkości. **Plik wspólny z v2 i v3** |
| `../shared/bus.js` | GOTOWE, NIETYKALNE | magistrala zdarzeń. **Plik wspólny z v2 i v3** |
| `../shared/engine.js` | GOTOWE, NIETYKALNE | kamera, próbkowanie 5 Hz, historia, progi, kalibracja. **Plik wspólny z v2 i v3** |
| `../shared/scale-core.js` | GOTOWE, NIETYKALNE | geometria skal (`pos`, `bands`, `zone`, `severity`, `verdict`, `formatFor`). **Plik wspólny z v3** |
| `scale.js` | GOTOWE, NIETYKALNE | dokłada do tego samego `window.Scale` słownik `Scale.TEXT` (polszczyzna v3) — napisy tej wersji, lokalne |
| `tokens.css` | autor 1 | WYŁĄCZNIE `:root` i selektory motywu/palety. Rozdział 2 |
| `base.css` | autor 1 | reset, typografia, powłoka, nawigacja, siatka. Rozdziały 3 i 5.A–5.C |
| `components.css` | autor 2 | wszystkie komponenty z rozdziałów 5.D–5.M |
| `screens.css` | autor 2 | układy czterech ekranów i arkusze narzędziowe. 5.N–5.R |
| `store.js` | autor 3 | ustawienia, trwałość, zastosowanie motywu |
| `ui.js` | autor 3 | prymitywy interfejsu, ikony, arkusze, okna, toasty |
| `gauge.js` | autor 4 | cała wizualizacja danych (SVG) |
| `app.js` | autor 6 | powłoka, router, rejestr widoków |
| `index.html` | autor 6 | szkielet z rozdziału 4.3, przepisany dosłownie |
| `manifest.webmanifest`, `sw.js` | autor 6 | offline; wzorowane na v3, z zakresem na `/v4/`. `APP_SHELL` wymienia też cztery pliki z `../shared/` i trzy ikony z `../icons/` |
| `screen-measure.js` | autor 7 | ekran POMIAR |
| `screen-history.js` | autor 7 | ekran HISTORIA |
| `screen-tools.js` | autor 8 | ekran NARZĘDZIA + dziewięć arkuszy narzędziowych |
| `screen-support.js` | autor 8 | ekran WSPARCIE (prośba o darowiznę) + ustawienia |

### 0.2 Kolejność ładowania (wiążąca — `engine.js` odmawia startu bez `metrics.js`)

```
tokens.css → base.css → components.css → screens.css
../shared/metrics.js → ../shared/bus.js → ../shared/engine.js → ../shared/scale-core.js → scale.js
store.js → ui.js → gauge.js
screen-measure.js → screen-history.js → screen-tools.js → screen-support.js
app.js                     (ostatni: buduje powłokę z rejestru i emituje app:ready)
```

Cztery pliki z `../shared/` są **wspólne z v2 i v3** (opis w `docs/shared/README.md`).
Zmiana w którymkolwiek z nich dotyka trzech wersji naraz, więc trzeba wtedy podbić
`CACHE` w `docs/v2/sw.js`, `docs/v3/sw.js` i `docs/v4/sw.js`. Lokalny `scale.js` idzie
**po** `scale-core.js`: rdzeń tworzy `window.Scale`, lokalny plik dokłada do tego samego
obiektu `Scale.TEXT`. Rdzeń sięga po `Scale.TEXT` dopiero w chwili wywołania, więc taka
kolejność wystarcza.

Każdy `screen-*.js` w czasie ładowania wywołuje `App.registerView({...})` i nic więcej.
Budowa DOM widoku dzieje się dopiero w `build(root)`, które `app.js` woła po `DOMContentLoaded`.

### 0.3 Trzy zakazy, które unieważniają kod

1. **Zero sieci.** Żadnego `fetch`, `XMLHttpRequest`, `<link>` do CDN, webfontów, plików
   graficznych. Wszystkie ikony to inline SVG rysowane w `ui.js`. Poza własnym katalogiem
   v4 sięga wyłącznie po `../icons/` i po cztery pliki kodu wspólnego z `../shared/` —
   oba katalogi leżą w tym samym repozytorium i stoją na liście `APP_SHELL` w `sw.js`,
   więc aplikacja nadal działa w trybie samolotowym po pierwszym uruchomieniu.
2. **Zero polszczyzny poza słownikami.** `Scale.TEXT` (istniejący) oraz `UI.T` (nowy, rozdział 7).
   Żaden `screen-*.js` nie zawiera literału polskiego. Autor ekranu, któremu brakuje zdania,
   dopisuje je do rozdziału 7 tego dokumentu, a nie do swojego pliku.
3. **Zero kolorów spoza tokenów.** Ani jeden `#hex`, `rgb()` czy `hsl()` poza `tokens.css`.
   `gauge.js` używa `currentColor` i `var(--c-*)` — nic więcej. Wyjątek jest dokładnie jeden
   i jest opisany w rozdziale 5: miniatura motywu (`ms4-themepick__preview`) musi pokazać
   motyw, którego akurat nie ma na ekranie. Drugiego wyjątku nie ma.

### 0.4 Kontrakt z `engine.js`, którego nie wolno naruszyć

`engine.js` szuka po identyfikatorach `#cameraVideo`, `#cameraPlaceholder`,
`#cameraPlaceholderText`. Muszą istnieć w `index.html` już w chwili `DOMContentLoaded`
— nie wolno ich tworzyć w JS przy budowie widoku. Ekran POMIAR **przenosi** istniejący
węzeł `#cameraVideo` do swojej karty podglądu (`appendChild`), nigdy go nie klonuje
i nigdy nie usuwa. Tekst w `#cameraPlaceholderText` pisze wyłącznie `engine.js`.

---

## 1. Wizja i dziesięć zasad naczelnych

v3 była **przyrządem**: płaska stalowa płyta, grawerunek zamiast cienia, brak animacji,
brak zaokrągleń, wszystko widoczne naraz. Była uczciwa i brzydka.

v4 jest **aplikacją**: miękka, warstwowa, przyjazna, z jasną hierarchią i jedną rzeczą
w centrum uwagi. Ta sama uczciwość, inny język wizualny. Przejmujemy z v3 **treść**
— werdykty, noty o granicach pomiaru, opisy modułów, zasady języka — i **nic z estetyki**.

1. **Jedna liczba jest bohaterem.** Ekran pomiaru ma jeden duży wskaźnik i jedno zdanie.
   Reszta to kafelki poniżej. Nigdy siedem równorzędnych liczb naraz.
2. **Zdanie ważniejsze niż liczba.** Werdykt (`Scale.verdict`) liczy się ze wszystkich
   siedmiu wielkości i stoi bezpośrednio pod wskaźnikiem, w tej samej wadze wizualnej.
3. **Nic nie jest zamknięte.** Wszystkie siedem wielkości ma liczby dla każdego, od pierwszego
   uruchomienia. Nie ma kłódek, rozmytych wartości ani plakietek dostępu — a wsparcie autora
   jest dobrowolne i niczego nie zmienia w aplikacji.
4. **Głębia zamiast grawerunku.** Karty wyniesione nad tło (`--e-1`/`--e-2`), promienie 16–28 px,
   hojne odstępy. Zero ramek wokół wszystkiego; krawędź tylko tam, gdzie niesie znaczenie.
5. **Kolor akcentu to marka, kolor strefy to znaczenie.** Sześć palet zmienia wyłącznie akcent
   i jego pochodne. Zielony, bursztynowy i czerwony strefy są w każdej palecie identyczne.
6. **Ruch tłumaczy, nie zdobi.** 120–320 ms, `cubic-bezier(.2,0,0,1)`, wyłącznie na przejściach
   stanu i wejściach arkuszy. `data-motion="reduced"` zeruje wszystko poza zmianą krycia.
7. **Kolor nigdy sam.** Każda strefa niesie też słowo (`Scale.stamp().wordPL`) i kształt:
   kropka pełna dla „W normie”, kropka z obwódką dla „Uwaga”, trójkąt dla „Krytycznie”.
8. **Dotyk 44 px, kontrast 4,5:1, tekst do 200%.** Bez wyjątków — także w kafelku wielkości
   i w próbce palety.
9. **Prośba tylko tam, gdzie użytkownik po nią przyszedł.** Cała warstwa wsparcia mieści się
   na ekranie WSPARCIE. Żadnych okien po N uruchomieniach, żadnego odliczania, żadnej prośby
   w trakcie pomiaru. Jedyny odnośnik wychodzący poza urządzenie klika sam użytkownik,
   a stoi przy nim zdanie o tym, co się wtedy dzieje.
10. **5 Hz to budżet, nie zaproszenie.** W pętli próbek wolno zmieniać wyłącznie `textContent`
    istniejącego węzła i atrybuty `transform` / `d` / `stroke` istniejących elementów SVG.
    Zero `innerHTML`, zero `createElement`, zero `getBoundingClientRect`, zero `localStorage`.

---

## 2. Tokeny — kompletny `tokens.css`

Reguły pliku: tylko `:root`, `:root[data-theme=...]`, `@media (prefers-color-scheme: dark)`
i `:root[data-accent=...]`. Ani jednego selektora elementu. Żadna z poniższych nazw nie może
być przedefiniowana w innym pliku.

### 2.1 Powierzchnie, tekst, krawędzie — motyw JASNY

Kolumna „kontrast” podaje kolejno tła: `--c-surface`, `--c-bg`, `--c-surface-2`, `--c-surface-3`.

| token | hex | rola | kontrast |
|---|---|---|---|
| `--c-bg` | `#F4F6F9` | tło strony pod kartami | — |
| `--c-surface` | `#FFFFFF` | karta, arkusz, górna belka | — |
| `--c-surface-2` | `#F0F3F7` | wgłębienie w karcie, pole wykresu, wiersz po najechaniu | — |
| `--c-surface-3` | `#E4E9F0` | tor suwaka, tło segmentów, szkielet ładowania | — |
| `--c-scrim` | `rgba(11,16,24,.48)` | przyciemnienie pod arkuszem | — |
| `--c-border` | `#DCE2EA` | krawędź dekoracyjna — NIGDY nie niesie znaczenia | 1,30 |
| `--c-border-strong` | `#8A93A0` | krawędź znacząca: obrys pola, oś tabeli | 3,11 |
| `--c-text` | `#0C1116` | tekst główny, duże liczby | 18,96 / 17,52 / 17,04 / 15,54 |
| `--c-text-2` | `#48525F` | tekst pomocniczy, podtytuły | 7,93 / 7,33 / 7,13 / 6,50 |
| `--c-text-3` | `#5C6673` | etykiety, jednostki, podpisy osi (podłoga) | 5,83 / 5,38 / 5,24 / 4,78 |

### 2.2 Powierzchnie, tekst, krawędzie — motyw CIEMNY

Kolumna „kontrast” podaje kolejno tła: `--c-bg`, `--c-surface`, `--c-surface-2`, `--c-surface-3`.

| token | hex | rola | kontrast |
|---|---|---|---|
| `--c-bg` | `#0E1116` | tło strony | — |
| `--c-surface` | `#171B22` | karta, arkusz, belka | — |
| `--c-surface-2` | `#1E232B` | wgłębienie, pole wykresu | — |
| `--c-surface-3` | `#262C35` | tor suwaka, tło segmentów | — |
| `--c-scrim` | `rgba(0,0,0,.62)` | przyciemnienie pod arkuszem | — |
| `--c-border` | `#2C333D` | krawędź dekoracyjna | 1,35 |
| `--c-border-strong` | `#646E7B` | krawędź znacząca | 3,34 na `--c-surface` |
| `--c-text` | `#F2F5F9` | tekst główny | 17,29 / 15,79 / 14,43 / 12,85 |
| `--c-text-2` | `#B4BDC8` | tekst pomocniczy | 9,95 / 9,09 / 8,31 / 7,40 |
| `--c-text-3` | `#8E98A5` | etykiety, jednostki (podłoga) | 6,47 / 5,91 / 5,40 / 4,81 |

### 2.3 Strefy, info, demo, fokus — NIE zmieniają się z paletą

Motyw JASNY:

| token | hex | kontrast |
|---|---|---|
| `--c-good` | `#0F7A3D` | 5,42 na `--c-surface`; 5,01 na `--c-bg` |
| `--c-warn` | `#8A4B00` | 6,80 / 6,28 |
| `--c-crit` | `#B3261E` | 6,54 / 6,04 |
| `--c-good-soft` | `#E3F3E9` | `--c-good` na nim: 4,72 |
| `--c-warn-soft` | `#FCEEDD` | `--c-warn` na nim: 5,96 |
| `--c-crit-soft` | `#FCE8E6` | `--c-crit` na nim: 5,55 |
| `--c-on-good` | `#FFFFFF` | 5,42 na `--c-good` |
| `--c-on-warn` | `#FFFFFF` | 6,80 na `--c-warn` |
| `--c-on-crit` | `#FFFFFF` | 6,54 na `--c-crit` |
| `--c-info` | `#0B63C5` | 5,82 / 5,38 |
| `--c-info-soft` | `#E4EEFB` | `--c-info` na nim: 4,97 |
| `--c-demo` | `#A5117E` | 7,04 / 6,51 |
| `--c-demo-soft` | `#FBE6F4` | `--c-demo` na nim: 5,95 |
| `--c-focus` | `#0B3FA8` | 9,17 na białym |

Motyw CIEMNY:

| token | hex | kontrast |
|---|---|---|
| `--c-good` | `#4ED384` | 9,02 na `--c-surface`; 9,88 na `--c-bg` |
| `--c-warn` | `#F0B45F` | 9,37 / 10,27 |
| `--c-crit` | `#FF7B72` | 6,85 / 7,50 |
| `--c-good-soft` | `#12291C` | `--c-good` na nim: 8,07 |
| `--c-warn-soft` | `#2E2211` | `--c-warn` na nim: 8,42 |
| `--c-crit-soft` | `#3A1A18` | `--c-crit` na nim: 6,21 |
| `--c-on-good` | `#08150D` | 12,3 na `--c-good` |
| `--c-on-warn` | `#1B1206` | 12,9 na `--c-warn` |
| `--c-on-crit` | `#2A0B09` | 8,4 na `--c-crit` |
| `--c-info` | `#7FB6FF` | 8,25 / 9,04 |
| `--c-info-soft` | `#122438` | `--c-info` na nim: 7,52 |
| `--c-demo` | `#FF86D2` | 7,89 / 8,64 |
| `--c-demo-soft` | `#331333` | `--c-demo` na nim: 7,48 |
| `--c-focus` | `#8AB4FF` | 8,5 na `--c-surface` |

### 2.4 Sześć palet akcentu

Każda paleta definiuje pięć tokenów, osobno dla motywu jasnego i ciemnego:
`--c-accent` (wypełnienie i tekst akcentowy), `--c-accent-2` (drugi kolor gradientu),
`--c-accent-ink` (tekst na `--c-accent-soft`), `--c-accent-soft` (tło pigułki, chipa, ikony),
`--c-on-accent` (tekst na wypełnieniu akcentem). `--c-text-on-accent` jest aliasem
`var(--c-on-accent)` — istnieje, bo tak nazywa go kontrakt, i nie ma własnej wartości.

Charaktery są celowo różne: **ocean** jest chłodny i morski, **violet** elektryczny,
**sunset** gorący, **forest** naturalny i stonowany, **graphite** bezbarwny i biurowy,
**rose** intensywny i ciepło-różowy. To sześć różnych aplikacji, nie sześć odcieni jednej.

#### ocean (domyślna) — morska zieleń przechodząca w lazur

| token | jasny | kontrast | ciemny | kontrast |
|---|---|---|---|---|
| `--c-accent` | `#0F6E86` | 5,84 na `--c-surface` | `#35C0DA` | 7,98 na `--c-surface` |
| `--c-accent-2` | `#175E9E` | 6,71 (biały tekst na gradiencie) | `#6BE3D2` | 12,32 na `#0B1015` |
| `--c-accent-ink` | `#0A5265` | 7,49 na `--c-accent-soft` | `#35C0DA` | 6,65 na `--c-accent-soft` |
| `--c-accent-soft` | `#DFF1F5` | — | `#0C2E36` | — |
| `--c-on-accent` | `#FFFFFF` | 5,84 na `--c-accent` | `#0B1015` | 8,83 na `--c-accent` |

#### violet — elektryczny fiolet przechodzący w magentę

| token | jasny | kontrast | ciemny | kontrast |
|---|---|---|---|---|
| `--c-accent` | `#6A35D9` | 6,72 | `#A98BFF` | 6,43 |
| `--c-accent-2` | `#A32BB0` | 5,95 | `#D69BFF` | 9,09 na `#0B1015` |
| `--c-accent-ink` | `#55279E` | 7,94 na `--c-accent-soft` | `#A98BFF` | 5,94 na `--c-accent-soft` |
| `--c-accent-soft` | `#EDE5FD` | — | `#241B45` | — |
| `--c-on-accent` | `#FFFFFF` | 6,72 na `--c-accent` | `#0B1015` | 7,12 na `--c-accent` |

#### sunset — przypalona pomarańcz przechodząca w karmazyn

| token | jasny | kontrast | ciemny | kontrast |
|---|---|---|---|---|
| `--c-accent` | `#C2410C` | 5,18 | `#FF9457` | 7,91 |
| `--c-accent-2` | `#C21E63` | 5,74 | `#FFC46B` | 12,15 na `#0B1015` |
| `--c-accent-ink` | `#8F300A` | 6,94 na `--c-accent-soft` | `#FF9457` | 7,33 na `--c-accent-soft` |
| `--c-accent-soft` | `#FDEAE0` | — | `#331C0F` | — |
| `--c-on-accent` | `#FFFFFF` | 5,18 na `--c-accent` | `#0B1015` | 8,76 na `--c-accent` |

#### forest — głęboka zieleń przechodząca w zieleń morską

| token | jasny | kontrast | ciemny | kontrast |
|---|---|---|---|---|
| `--c-accent` | `#146B3A` | 6,57 | `#4FC97A` | 8,20 |
| `--c-accent-2` | `#0D6E63` | 6,13 | `#9BE07A` | 12,13 na `#0B1015` |
| `--c-accent-ink` | `#0F5230` | 7,97 na `--c-accent-soft` | `#4FC97A` | 6,81 na `--c-accent-soft` |
| `--c-accent-soft` | `#E2F2E7` | — | `#10301E` | — |
| `--c-on-accent` | `#FFFFFF` | 6,57 na `--c-accent` | `#0B1015` | 9,07 na `--c-accent` |

UWAGA dla wszystkich autorów: `forest` jest jedyną paletą, w której akcent leży blisko
`--c-good`. Dlatego plakietka strefy nigdy nie używa `--c-accent`, a przycisk główny
nigdy nie stoi bezpośrednio obok znacznika „W normie”. Układ z rozdziału 5 to zapewnia
i nie wolno go w tym miejscu upraszczać.

#### graphite — stal, bez barwy; dla tych, którzy nie chcą koloru

| token | jasny | kontrast | ciemny | kontrast |
|---|---|---|---|---|
| `--c-accent` | `#3E4956` | 9,16 | `#A7B4C4` | 8,20 |
| `--c-accent-2` | `#2B3A4A` | 11,62 | `#CBD5E1` | 12,87 na `#0B1015` |
| `--c-accent-ink` | `#2C3542` | 10,44 na `--c-accent-soft` | `#A7B4C4` | 6,87 na `--c-accent-soft` |
| `--c-accent-soft` | `#E8ECF1` | — | `#232A33` | — |
| `--c-on-accent` | `#FFFFFF` | 9,16 na `--c-accent` | `#0B1015` | 9,07 na `--c-accent` |

#### rose — malina przechodząca w purpurę

| token | jasny | kontrast | ciemny | kontrast |
|---|---|---|---|---|
| `--c-accent` | `#BE1F62` | 5,90 | `#FF7AAE` | 7,11 |
| `--c-accent-2` | `#8E2AA8` | 6,89 | `#FFA9C6` | 10,68 na `#0B1015` |
| `--c-accent-ink` | `#911048` | 7,37 na `--c-accent-soft` | `#FF7AAE` | 6,68 na `--c-accent-soft` |
| `--c-accent-soft` | `#FCE4EE` | — | `#34162A` | — |
| `--c-on-accent` | `#FFFFFF` | 5,90 na `--c-accent` | `#0B1015` | 7,87 na `--c-accent` |

`Store.ACCENTS` zwraca dokładnie te sześć wpisów, w tej kolejności, z próbką
`swatch: [hexJasny, hexCiemny]` równą wartościom `--c-accent` z tabel powyżej:

```
ocean    ['#0F6E86', '#35C0DA']   namePL: 'Ocean'
violet   ['#6A35D9', '#A98BFF']   namePL: 'Fiolet'
sunset   ['#C2410C', '#FF9457']   namePL: 'Zachód słońca'
forest   ['#146B3A', '#4FC97A']   namePL: 'Las'
graphite ['#3E4956', '#A7B4C4']   namePL: 'Grafit'
rose     ['#BE1F62', '#FF7AAE']   namePL: 'Róża'
```

### 2.5 Cienie

Motyw jasny — cień w kolorze `rgba(13,20,32, α)`, nigdy czysta czerń, bo czerń brudzi barwę:

```
--e-0: none;
--e-1: 0 1px 2px rgba(13,20,32,.06), 0 2px 6px rgba(13,20,32,.05);
--e-2: 0 2px 4px rgba(13,20,32,.06), 0 8px 20px rgba(13,20,32,.08);
--e-3: 0 8px 16px rgba(13,20,32,.10), 0 24px 48px rgba(13,20,32,.14);
```

Motyw ciemny — cień słabszy, bo nie ma czego przyciemniać; głębię niesie jaśniejsza krawędź:

```
--e-0: none;
--e-1: 0 1px 2px rgba(0,0,0,.40), inset 0 1px 0 rgba(255,255,255,.04);
--e-2: 0 4px 12px rgba(0,0,0,.48), inset 0 1px 0 rgba(255,255,255,.05);
--e-3: 0 12px 32px rgba(0,0,0,.60), inset 0 1px 0 rgba(255,255,255,.06);
```

### 2.6 Promienie, odstępy, typografia, ruch, warstwy, wymiary

```
--r-xs: 8px;  --r-sm: 12px; --r-md: 16px; --r-lg: 22px; --r-xl: 28px; --r-pill: 999px;

--s-1: 4px;  --s-2: 8px;  --s-3: 12px; --s-4: 16px; --s-5: 20px;
--s-6: 24px; --s-7: 32px; --s-8: 40px; --s-9: 56px;

--font: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--font-num: ui-rounded, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
/* każda zmieniająca się liczba dostaje dodatkowo font-variant-numeric: tabular-nums,
   inaczej wskaźnik drga w rytm cyfr przy 5 Hz */

--text-scale: 1;                               /* 1 | 1.15 | 1.3 */
--t-display: calc(64px * var(--text-scale));   /* wielka liczba, waga 700, lh 1.0 */
--t-h1:      calc(28px * var(--text-scale));   /* tytuł ekranu, waga 700 */
--t-h2:      calc(22px * var(--text-scale));   /* tytuł karty, waga 600 */
--t-h3:      calc(18px * var(--text-scale));   /* tytuł wiersza, waga 600 */
--t-body:    calc(16px * var(--text-scale));   /* tekst czytany, waga 400, lh 1.55 */
--t-body-sm: calc(15px * var(--text-scale));   /* tekst drugorzędny */
--t-label:   calc(13px * var(--text-scale));   /* etykieta nawigacji, chip, jednostka; waga 500 */
--t-caption: calc(12px * var(--text-scale));   /* podpis osi, drobny druk; waga 400 */
/* 12 px to podłoga. Poniżej niej w tej aplikacji nie ma tekstu. */

--lh-tight: 1.1;  --lh-body: 1.55;
--fw-med: 500;    --fw-bold: 600;   --fw-black: 700;

--dur-fast: 120ms; --dur: 200ms; --dur-slow: 320ms; --ease: cubic-bezier(.2,0,0,1);

--z-nav: 30; --z-sheet: 60; --z-dialog: 70; --z-toast: 80;

--h-topbar: 56px; --h-tabbar: 64px; --w-sidenav: 260px; --w-content: 1180px; --tap: 44px;
```

`html[data-motion="reduced"]` oraz `@media (prefers-reduced-motion: reduce)` ustawiają
`--dur-fast: 1ms; --dur: 1ms; --dur-slow: 1ms;` i nic poza tym — reszta reguł ruchu
jest w rozdziale 8.

`html[data-text-scale="1.15"]` → `--text-scale: 1.15`; `="1.3"` → `--text-scale: 1.3`.
Brak atrybutu = 1.

### 2.7 Selektory motywu — wiążący szkielet pliku

```css
:root { color-scheme: light dark; /* pełna paleta JASNA + akcent ocean */ }
:root[data-accent="violet"]   { /* pięć tokenów akcentu, wartości jasne */ }
:root[data-accent="sunset"]   { }
:root[data-accent="forest"]   { }
:root[data-accent="graphite"] { }
:root[data-accent="rose"]     { }

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { color-scheme: dark; /* pełna paleta CIEMNA + ocean */ }
  :root:not([data-theme="light"])[data-accent="violet"] { /* … i pozostałe pięć … */ }
}

:root[data-theme="dark"] { color-scheme: dark; /* to samo, wymuszone */ }
:root[data-theme="dark"][data-accent="violet"] { /* … i pozostałe pięć … */ }
```

Kolejność ma znaczenie: blok `[data-theme="dark"]` stoi w pliku PO bloku `@media`,
żeby ręczny wybór wygrywał z ustawieniem systemu w obie strony.
---

## 3. Siatka i punkty łamania

Cztery progi. Nic pomiędzy nimi nie jest osobnym przypadkiem — jeśli coś wygląda źle
przy 720 px, poprawia się warunki progu 600, a nie dokłada piąty breakpoint.

```css
/* telefon  */  domyślnie, bez media query
/* tablet   */  @media (min-width: 600px)
/* desktop  */  @media (min-width: 1024px)
/* szeroki  */  @media (min-width: 1440px)
```

### 3.1 < 600 px — TELEFON (układ referencyjny; projektujemy tutaj najpierw)

| cecha | wartość |
|---|---|
| nawigacja | dolna: `ms4-tabbar`, wysokość `--h-tabbar` + `env(safe-area-inset-bottom)`, cztery pozycje ikona nad etykietą |
| górna belka | `ms4-topbar` 56 px, przyklejona, tytuł ekranu po lewej, maks. 2 przyciski ikonowe po prawej |
| szerokość treści | 100% minus `--s-4` z każdej strony |
| odstęp między kartami | `--s-4` (16 px) |
| kafelki metryk | 2 kolumny, `gap: var(--s-3)` |
| kafelki narzędzi | 2 kolumny |
| hero | wskaźnik `Gauge.arc` 260 px średnicy, wyśrodkowany; werdykt pod nim; pasek akcji jeszcze niżej |
| podgląd kamery | karta składana, domyślnie ROZWINIĘTA przy pierwszym uruchomieniu, proporcja 4:3 |
| arkusze | dolny arkusz: przyklejony do dołu, `--r-xl` na górnych rogach, uchwyt 36×4 px, `max-height: 92dvh`, wjeżdża `translateY(100%) → 0` |
| okno dialogowe | wyśrodkowane, `width: calc(100vw - var(--s-8))`, `max-width: 400px` |
| toast | nad dolną nawigacją, `bottom: calc(var(--h-tabbar) + var(--s-4) + env(safe-area-inset-bottom))` |
| kolejność ekranu POMIAR | hero → pasek akcji → kamera → kafelki → nota o granicach |

### 3.2 600–1023 px — TABLET

| cecha | wartość |
|---|---|
| nawigacja | nadal dolna `ms4-tabbar`, ale pozycje mają maks. 160 px szerokości i cały pasek jest wyśrodkowany |
| szerokość treści | `min(100% - var(--s-7), 720px)`, wyśrodkowana |
| kafelki metryk | 3 kolumny |
| kafelki narzędzi | 3 kolumny |
| hero | wskaźnik 300 px, werdykt obok wskaźnika w układzie dwukolumnowym `1fr 1.1fr`, pasek akcji pod obojgiem |
| podgląd kamery | karta pełnej szerokości treści, proporcja 16:9 |
| arkusze | nadal dolny arkusz, ale `max-width: 640px`, wyśrodkowany poziomo, dolne rogi też zaokrąglone `--r-xl`, odsunięty od dołu o `--s-4` |
| statystyka sesji | 4 kolumny zamiast 2 |

### 3.3 ≥ 1024 px — DESKTOP

| cecha | wartość |
|---|---|
| nawigacja | boczna `ms4-sidenav`, `--w-sidenav` = 260 px, przyklejona do lewej, pełna wysokość, tło `--c-surface`, prawa krawędź `--c-border`; `ms4-tabbar` znika (`display: none`) |
| górna belka | zostaje, ale zaczyna się za nawigacją: `margin-left: var(--w-sidenav)` |
| szerokość treści | `min(100% - var(--s-8), var(--w-content))` czyli maks. 1180 px, wyśrodkowana w obszarze po prawej od nawigacji |
| kafelki metryk | 4 kolumny |
| kafelki narzędzi | 3 kolumny (kafelek narzędzia jest szerszy niż kafelek metryki i ma opis) |
| hero | dwie kolumny `minmax(320px, 420px) 1fr`: po lewej wskaźnik 340 px, po prawej werdykt + plakietka + statystyka sesji + pasek akcji |
| podgląd kamery | w prawej kolumnie hero jako karta 16:9, nie osobny blok pod spodem |
| ekran HISTORIA | dwie kolumny `1fr 320px`: wykres po lewej, panel wyboru wielkości i statystyk po prawej |
| arkusze | wyśrodkowane okno: `--r-xl` na wszystkich rogach, `max-width: 720px` (pełnoekranowe: 880 px), `max-height: 88vh`, wjeżdża `opacity 0→1` + `scale(.96)→1`; uchwyt (`ms4-sheet__grip`) ukryty, przycisk zamknięcia w prawym górnym rogu |
| toast | prawy dolny róg, `right: var(--s-6); bottom: var(--s-6)` |
| kursor | `ms4-card--interactive`, `ms4-tile`, `ms4-row[onClick]` dostają `cursor: pointer` i stan `:hover` — na telefonie stanu `:hover` nie ma |

### 3.4 ≥ 1440 px — SZEROKI

| cecha | wartość |
|---|---|
| nawigacja | boczna, bez zmian, ale zyskuje sekcję stopki (`ms4-sidenav__foot`) z numerem wersji aplikacji |
| szerokość treści | nadal maks. `--w-content` (1180 px) — treść NIE rozlewa się dalej, rośnie margines |
| kafelki metryk | 4 kolumny, ale kafelek dostaje `min-height: 168px` i większy mikrowykres |
| hero | `minmax(380px, 460px) 1fr`, wskaźnik 380 px |
| ekran HISTORIA | trzy kolumny `220px 1fr 320px`: lista sesji, wykres, statystyka |

### 3.5 Reguły wspólne

* Wszystko liczy się w `dvh`, nie `vh` — pasek adresu na telefonie inaczej zjada ekran.
* `env(safe-area-inset-*)` dodawane w czterech miejscach: górna belka (top), dolna nawigacja
  (bottom), dolny arkusz (bottom), toast (bottom).
* Elementy przewijane mają `overscroll-behavior: contain`, żeby przewijanie arkusza
  nie ciągnęło strony pod spodem.
* Żaden układ nie używa `position: fixed` poza: `ms4-topbar`, `ms4-tabbar`, `ms4-sidenav`,
  `ms4-scrim`, `ms4-sheet`, `ms4-dialog`, `ms4-toasts`. Nic innego.
* Przy `--text-scale: 1.3` siatki spadają o jedną kolumnę (`@container` nie używamy —
  wystarczy `grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))` na kafelkach metryk
  i `minmax(240px, 1fr)` na narzędziach; podane wyżej liczby kolumn to wynik tych minimów).

---

## 4. Mapa ekranów i szkielet `index.html`

### 4.1 Cztery widoki i nic więcej

| id | hash | etykieta | ikona | plik |
|---|---|---|---|---|
| `measure` | `#/measure` | Pomiar | `measure` | `screen-measure.js` |
| `history` | `#/history` | Historia | `history` | `screen-history.js` |
| `tools` | `#/tools` | Narzędzia | `tools` | `screen-tools.js` |
| `support` | `#/support` | Wsparcie | `cup` | `screen-support.js` |

Widok startowy: `measure`. Nieznany hash → `measure` z podmianą hasha (`location.replace`).
`App.back()` wraca do widoku poprzedniego, a jeśli go nie ma — do `measure`.

Wszystko, co nie jest jednym z tych czterech widoków, jest **arkuszem** otwieranym
nad widokiem: dziewięć narzędzi, pomoc wielkości, wybór wielkości na wskaźniku, celowanie.
Arkusz nie ma własnego hasha i nie przeżywa odświeżenia strony.

### 4.2 Struktura ekranu POMIAR (blok po bloku, kolejność w DOM = kolejność czytania)

1. `ms4-hero` — wskaźnik, plakietka strefy, werdykt, zegar sesji
2. `ms4-actions` — [Start pomiaru] (duży, akcent) · [Obróć kamerę] · [Kanał]
3. `ms4-camera` — karta podglądu, składana
4. `ms4-tiles` — siedem kafelków wielkości
5. `ms4-note--limits` — nota „Czym ten pomiar nie jest”, ZAWSZE widoczna, nigdy zwinięta

### 4.3 Szkielet `index.html` — do przepisania dosłownie

Wszystko poniżej `#appRoot` buduje `app.js`. Blok kamery, `#live`, `#toasts` i warstwy
modalne stoją w statycznym HTML, bo `engine.js` i `ui.js` szukają ich po ID przy starcie.

```html
<!doctype html>
<html lang="pl" data-accent="ocean">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#F4F6F9" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#0E1116" media="(prefers-color-scheme: dark)">
  <meta name="description" content="Monitor Światła — pomiar światła kamerą telefonu.">
  <title>Monitor Światła</title>
  <link rel="manifest" href="manifest.webmanifest">
  <link rel="stylesheet" href="tokens.css">
  <link rel="stylesheet" href="base.css">
  <link rel="stylesheet" href="components.css">
  <link rel="stylesheet" href="screens.css">
</head>
<body>
  <!-- 1. Skok do treści: pierwszy element w kolejności tabulacji -->
  <a class="ms4-skip" href="#viewRoot">Przejdź do treści</a>

  <!-- 2. Powłoka. app.js wypełnia topbar, sidenav, tabbar i viewRoot. -->
  <div class="ms4-app" id="appRoot">

    <aside class="ms4-sidenav" id="sideNav" aria-label="Nawigacja główna" hidden></aside>

    <header class="ms4-topbar" id="topBar">
      <div class="ms4-topbar__inner">
        <h1 class="ms4-topbar__title" id="topBarTitle">Pomiar</h1>
        <div class="ms4-topbar__status" id="topBarStatus" aria-live="off"></div>
        <div class="ms4-topbar__actions" id="topBarActions"></div>
      </div>
    </header>

    <main class="ms4-app__main" id="viewRoot" tabindex="-1"></main>

    <nav class="ms4-tabbar" id="tabBar" aria-label="Nawigacja główna"></nav>
  </div>

  <!-- 3. Kamera. MUSI istnieć przed DOMContentLoaded — engine.js szuka tych trzech ID.
          screen-measure.js przenosi #cameraStage do swojej karty przez appendChild. -->
  <div class="ms4-camera__stage" id="cameraStage" hidden>
    <video class="ms4-camera__video" id="cameraVideo" playsinline muted
           aria-label="Podgląd z kamery"></video>
    <div class="ms4-camera__placeholder" id="cameraPlaceholder">
      <p class="ms4-camera__placeholder-text" id="cameraPlaceholderText"></p>
    </div>
    <div class="ms4-camera__reticle" aria-hidden="true"></div>
  </div>

  <!-- 4. Warstwy modalne. ui.js wstawia do nich i tylko do nich. -->
  <div class="ms4-scrim" id="scrim" hidden></div>
  <div class="ms4-sheet-host" id="sheetHost"></div>
  <div class="ms4-dialog-host" id="dialogHost"></div>
  <div class="ms4-toasts" id="toasts" aria-live="polite" aria-atomic="false"></div>

  <!-- 5. Komunikat dla czytnika ekranu. Jedyny element o tej roli w aplikacji. -->
  <p class="ms4-sronly" id="live" role="status" aria-live="polite"></p>

  <script src="../shared/metrics.js"></script>
  <script src="../shared/bus.js"></script>
  <script src="../shared/engine.js"></script>
  <script src="../shared/scale-core.js"></script>
  <script src="scale.js"></script>
  <script src="store.js"></script>
  <script src="ui.js"></script>
  <script src="gauge.js"></script>
  <script src="screen-measure.js"></script>
  <script src="screen-history.js"></script>
  <script src="screen-tools.js"></script>
  <script src="screen-support.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

Uwaga do `<html lang="pl" data-accent="ocean">`: `Store.apply()` nadpisuje `data-accent`,
`data-theme`, `data-text-scale` i `data-motion` natychmiast po załadowaniu `store.js`,
czyli PRZED pierwszym malowaniem treści. Dzięki temu nie ma mignięcia jasnym motywem
u kogoś, kto wybrał ciemny. `store.js` ładuje się wcześniej niż `ui.js` właśnie po to.

### 4.4 Szkielet widoku budowany przez `app.js`

```html
<section class="ms4-view is-active" id="view-measure" data-view="measure"
         role="tabpanel" aria-labelledby="tab-measure">
  <div class="ms4-view__inner">
    <!-- tu build(root) danego screen-*.js -->
  </div>
</section>
```

`App.registerView` przyjmuje: `{ id, labelPL, icon, build(root), enter(params), leave(), desktopOnly }`.
`build` wywoływane raz, `enter`/`leave` przy każdym wejściu i wyjściu.
`desktopOnly: true` nie jest używane przez żaden z czterech widoków — pole istnieje,
bo tak mówi kontrakt, i ma być obsłużone (widok znika z nawigacji poniżej 1024 px).

### 4.5 Górna belka — zawartość per ekran

| ekran | tytuł | prawa strona |
|---|---|---|
| Pomiar | „Pomiar” | wskaźnik stanu (`ms4-topbar__status`) + przycisk ikonowy `help` |
| Historia | „Historia” | przycisk ikonowy `export` |
| Narzędzia | „Narzędzia” | — |
| Wsparcie | „Wsparcie” | przycisk ikonowy `settings` (przewija do sekcji Ustawienia) |

`ms4-topbar__status` pokazuje kropkę + tekst: `Gotowy` / `Uruchamiam` / `Pomiar 00:04:12`
/ `Błąd kamery`. Tekst pochodzi ze `Scale.TEXT.state`; zegar odświeża się raz na sekundę,
nie 5 razy — to osobny `setInterval`, nie `engine:sample`.
---

## 5. INWENTARZ KLAS — najważniejszy rozdział tego dokumentu

Konwencja: prefiks `ms4-`, `blok__element--modyfikator`. Klasy stanu bez prefiksu bloku:
`is-active`, `is-open`, `is-hidden`, `is-loading`, `is-selected`, `is-disabled`,
`is-collapsed`, `is-checked`. Warianty tonu: `--good`, `--warn`, `--crit`, `--demo`, `--info`.

Autor JS wolno mu używać WYŁĄCZNIE klas z tego rozdziału. Autor CSS musi narysować
WSZYSTKIE klasy z tego rozdziału, także te, których na razie nikt nie woła.

Wszędzie, gdzie niżej pada „krawędź”, chodzi o `1px solid var(--c-border)`, chyba że
napisano `--c-border-strong`. Wszędzie, gdzie pada „fokus”, chodzi o
`outline: 2px solid var(--c-focus); outline-offset: 2px;` na `:focus-visible` i o nic
na `:focus` bez klawiatury.

### 5.A Powłoka i pomijalne

| klasa | do czego | jak wygląda |
|---|---|---|
| `ms4-app` | korzeń powłoki | `min-height: 100dvh`, tło `--c-bg`, `display: block`; od 1024 px `padding-left: var(--w-sidenav)` |
| `ms4-app__main` | obszar widoków | `padding: var(--s-4) var(--s-4) calc(var(--h-tabbar) + var(--s-8) + env(safe-area-inset-bottom))`; od 1024 px dolny padding spada do `var(--s-8)` |
| `ms4-view` | jeden widok | `display: none`; z `is-active` → `display: block` i wejście `opacity 0→1` + `translateY(8px)→0` przez `--dur` |
| `ms4-view__inner` | ograniczenie szerokości treści | `width: min(100%, var(--w-content)); margin-inline: auto; display: flex; flex-direction: column; gap: var(--s-4)`; od 600 px `gap: var(--s-5)` |
| `ms4-skip` | skok do treści | pozycja absolutna nad ekranem (`top: -100px`), po `:focus` zjeżdża na `top: var(--s-2)`, pigułka `--c-accent` / `--c-on-accent`, padding `10px 16px`, `--r-pill`, cień `--e-2` |
| `ms4-sronly` | tekst tylko dla czytnika | klasyczny 1×1 px clip, `position: absolute; overflow: hidden; white-space: nowrap` |
| `is-hidden` | ukrycie z JS | `display: none !important` — jedyne `!important` w całej aplikacji |
| `ms4-scroll-x` | poziome przewijanie tabeli/wykresu | `overflow-x: auto; overscroll-behavior-x: contain; scrollbar-width: thin` |

### 5.B Górna belka

| klasa | do czego | jak wygląda |
|---|---|---|
| `ms4-topbar` | belka | `position: sticky; top: 0; z-index: var(--z-nav)`, wysokość `--h-topbar` + `env(safe-area-inset-top)` jako padding górny, tło `--c-surface` z `backdrop-filter: saturate(1.4) blur(12px)`, dolna krawędź `--c-border`; po przewinięciu >8 px JS dodaje `is-scrolled` → cień `--e-1` |
| `ms4-topbar__inner` | wiersz belki | `display: flex; align-items: center; gap: var(--s-3)`, szerokość jak `ms4-view__inner`, `padding-inline: var(--s-4)` |
| `ms4-topbar__title` | tytuł ekranu | `--t-h2`, waga `--fw-bold`, kolor `--c-text`, `margin-right: auto` |
| `ms4-topbar__sub` | drugi wiersz tytułu (np. nazwa narzędzia) | `--t-caption`, `--c-text-3`, w tej samej kolumnie pod tytułem |
| `ms4-topbar__status` | stan silnika | pigułka: tło `--c-surface-2`, `--r-pill`, `padding: 4px 10px 4px 6px`, `--t-label`, `--c-text-2`, kropka 8 px po lewej |
| `ms4-topbar__dot` | kropka stanu | 8×8 px koło; `--idle` → `--c-text-3`, `--good/--warn/--crit` → kolor strefy, `--run` → `--c-accent` z pulsem 2 s (wyłączanym przy ograniczonym ruchu) |
| `ms4-topbar__actions` | przyciski po prawej | `display: flex; gap: var(--s-1)` |
| `ms4-topbar__btn` | przycisk ikonowy w belce | 44×44 px, `--r-pill`, tło przezroczyste, ikona 24 px w `--c-text-2`; `:hover` → tło `--c-surface-2`; `:active` → `scale(.94)` |

### 5.C Nawigacja dolna i boczna

| klasa | do czego | jak wygląda |
|---|---|---|
| `ms4-tabbar` | dolna nawigacja (telefon, tablet) | `position: fixed; inset: auto 0 0 0; z-index: var(--z-nav)`, tło `--c-surface`, górna krawędź `--c-border`, `padding-bottom: env(safe-area-inset-bottom)`, `display: grid; grid-template-columns: repeat(4, 1fr)`; od 1024 px `display: none` |
| `ms4-tabbar__item` | jedna pozycja | `min-height: var(--h-tabbar)`, kolumna: ikona nad etykietą, `gap: 2px`, kolor `--c-text-3`, tło przezroczyste, `--r-md`; `:active` → `scale(.95)` |
| `ms4-tabbar__item.is-active` | pozycja bieżąca | ikona i etykieta w `--c-accent`, etykieta waga `--fw-bold` |
| `ms4-tabbar__icon` | ikona pozycji | 24×24 px; w stanie aktywnym siedzi na pigułce `ms4-tabbar__indicator` |
| `ms4-tabbar__indicator` | pigułka pod ikoną aktywnej pozycji | 56×32 px, `--r-pill`, tło `--c-accent-soft`, pojawia się przez `opacity` i `scaleX(.6)→1` w `--dur-fast` |
| `ms4-tabbar__label` | etykieta | `--t-label`, `--fw-med`, jedna linia, `text-overflow: ellipsis` |
| `ms4-sidenav` | boczna nawigacja (≥1024 px) | `position: fixed; inset: 0 auto 0 0; width: var(--w-sidenav)`, tło `--c-surface`, prawa krawędź `--c-border`, `padding: var(--s-5) var(--s-3)`, kolumna; poniżej 1024 px `hidden` |
| `ms4-sidenav__brand` | nazwa aplikacji na górze | ikona `logo` 28 px + tekst „Monitor Światła”, `--t-h3`, `--fw-bold`, `padding: var(--s-3)`, `margin-bottom: var(--s-5)` |
| `ms4-sidenav__list` | lista pozycji | `display: flex; flex-direction: column; gap: var(--s-1)` |
| `ms4-sidenav__item` | pozycja | wiersz `gap: var(--s-3)`, wysokość 48 px, `padding-inline: var(--s-3)`, `--r-md`, `--t-body`, `--c-text-2`; `:hover` → tło `--c-surface-2` |
| `ms4-sidenav__item.is-active` | pozycja bieżąca | tło `--c-accent-soft`, tekst i ikona `--c-accent-ink`, waga `--fw-bold` |
| `ms4-sidenav__icon` | ikona pozycji | 24×24 px, `currentColor` |
| `ms4-sidenav__label` | etykieta pozycji | `--t-body`, `--fw-med` |
| `ms4-sidenav__foot` | stopka nawigacji (≥1440 px) | `margin-top: auto`, `--t-caption`, `--c-text-3`, jedna linia: numer wersji |

### 5.D Sekcje, karty, siatki

| klasa | do czego | jak wygląda |
|---|---|---|
| `ms4-section` | nagłówek grupy treści | `display: flex; align-items: baseline; gap: var(--s-3)`, `margin: var(--s-5) 0 var(--s-2)` |
| `ms4-section__title` | tytuł grupy | `--t-h3`, `--fw-bold`, `--c-text` |
| `ms4-section__sub` | podtytuł grupy | `--t-body-sm`, `--c-text-3`, `margin-right: auto` |
| `ms4-section__action` | odnośnik po prawej („Zobacz wszystko”) | `--t-label`, `--fw-med`, `--c-accent`, bez podkreślenia; `:hover` → podkreślenie 2 px |
| `ms4-card` | podstawowa karta | tło `--c-surface`, `--r-lg` (22 px), cień `--e-1`, `padding: var(--s-4)`; od 600 px `padding: var(--s-5)`; brak widocznej krawędzi w motywie jasnym, w ciemnym `1px solid var(--c-border)` |
| `ms4-card--flat` | karta bez wyniesienia | cień `--e-0`, tło `--c-surface-2`, krawędź `--c-border` |
| `ms4-card--accent` | karta wyróżniona akcentem | tło `--c-accent-soft`, tekst `--c-accent-ink`, cień `--e-0`, lewa krawędź 3 px `--c-accent` |
| `ms4-card--interactive` | karta klikalna | `cursor: pointer`, przejście `transform`/`box-shadow` `--dur-fast`; `:hover` (≥1024) → `--e-2` i `translateY(-2px)`; `:active` → `scale(.99)`; `:focus-visible` → obrys fokusu |
| `ms4-card__header` | nagłówek karty | wiersz `gap: var(--s-3)`, `align-items: flex-start`, `margin-bottom: var(--s-3)` |
| `ms4-card__title` | tytuł karty | `--t-h2`, `--fw-bold`, `--c-text` |
| `ms4-card__subtitle` | podtytuł karty | `--t-body-sm`, `--c-text-2`, `line-height: --lh-body`, `margin-top: 2px` |
| `ms4-card__actions` | przyciski w nagłówku | `margin-left: auto`, wiersz `gap: var(--s-2)` |
| `ms4-card__body` | treść karty | `display: flex; flex-direction: column; gap: var(--s-3)` |
| `ms4-card__footer` | stopka karty | górna krawędź `--c-border`, `padding-top: var(--s-3)`, `margin-top: var(--s-3)`, `--t-body-sm`, `--c-text-3` |
| `ms4-grid` | siatka ogólna | `display: grid; gap: var(--s-3)` |
| `ms4-grid--metrics` | siatka kafelków wielkości | `grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))` |
| `ms4-grid--tools` | siatka kafelków narzędzi | `grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))` |
| `ms4-grid--stats` | siatka statystyk sesji | `repeat(2, 1fr)`; od 600 px `repeat(4, 1fr)` |
| `ms4-divider` | linia rozdzielająca | `height: 1px`, tło `--c-border`, `margin: var(--s-3) 0`, `border: 0` |

### 5.E Przyciski — 5 wariantów × 3 rozmiary

Baza `ms4-btn`: `display: inline-flex; align-items: center; justify-content: center;
gap: var(--s-2)`, `--r-pill`, `font-family: var(--font)`, waga `--fw-bold`,
`white-space: nowrap`, `border: 0`, `cursor: pointer`, przejście `transform`,
`background-color`, `box-shadow` przez `--dur-fast`. `:active` → `transform: scale(.96)`.
`:focus-visible` → obrys fokusu. `[disabled]`, `.is-disabled` → `opacity: .45; cursor: not-allowed;`
i żadnych efektów `:hover`.

| klasa | do czego | jak wygląda |
|---|---|---|
| `ms4-btn--primary` | akcja główna (Start pomiaru, Zapisz) | tło `--c-accent`, tekst `--c-on-accent`, cień `--e-1`; `:hover` → cień `--e-2` i jaśniej o 6% (`filter: brightness(1.06)`) |
| `ms4-btn--tonal` | akcja drugorzędna (Obróć kamerę, Kanał) | tło `--c-accent-soft`, tekst `--c-accent-ink`, cień `--e-0`; `:hover` → tło ciemniejsze o 4% |
| `ms4-btn--ghost` | akcja trzeciorzędna (Anuluj, Zamknij) | tło przezroczyste, tekst `--c-text-2`, krawędź `1px solid var(--c-border)`; `:hover` → tło `--c-surface-2`, tekst `--c-text` |
| `ms4-btn--danger` | akcja niszcząca (Wyczyść historię, Przywróć ustawienia domyślne) | tło przezroczyste, tekst `--c-crit`, krawędź `1px solid var(--c-crit)`; `:hover` → tło `--c-crit-soft`; w oknie potwierdzenia wariant pełny: tło `--c-crit`, tekst `--c-on-crit` |
| `ms4-btn--sm` | mały | wysokość 36 px, `padding-inline: var(--s-4)`, `--t-label` |
| `ms4-btn--md` | domyślny (można pominąć) | wysokość `--tap` (44 px), `padding-inline: var(--s-5)`, `--t-body-sm` |
| `ms4-btn--lg` | duży (Start pomiaru) | wysokość 56 px, `padding-inline: var(--s-7)`, `--t-body`, `--fw-black` |
| `ms4-btn--full` | na całą szerokość | `width: 100%` |
| `ms4-btn--icon` | tylko ikona | kwadrat: 36 / 44 / 56 px zależnie od rozmiaru, `padding: 0`, `--r-pill` |
| `ms4-btn__icon` | ikona w przycisku | 20 px przy `--sm`, 24 px przy `--md` i `--lg`, `flex: 0 0 auto` |
| `ms4-btn__label` | tekst przycisku | `overflow: hidden; text-overflow: ellipsis` |
| `ms4-btn.is-loading` | trwa akcja | etykieta `opacity: 0`, na środku wiruje `ms4-spinner`; przycisk zablokowany dla wskaźnika (`pointer-events: none`) |
| `ms4-spinner` | kółko ładowania | 20×20 px, `border: 2px solid currentColor`, `border-top-color: transparent`, `--r-pill`, obrót 700 ms liniowo; przy ograniczonym ruchu zamiast obrotu pulsuje krycie 0,3↔1 |

### 5.F Chipy, plakietki, znaczniki stref

| klasa | do czego | jak wygląda |
|---|---|---|
| `ms4-chip` | filtr, etykieta wyboru, mała informacja | wysokość 32 px (dotykowy: `min-height: var(--tap)` w obszarach klikalnych), `--r-pill`, tło `--c-surface-2`, tekst `--c-text-2`, `--t-label`, `padding-inline: var(--s-3)`, wiersz `gap: 6px` |
| `ms4-chip--selectable` | chip jako przełącznik | `cursor: pointer`; `:hover` → tło `--c-surface-3` |
| `ms4-chip.is-selected` | chip wybrany | tło `--c-accent-soft`, tekst `--c-accent-ink`, krawędź `1px solid var(--c-accent)` |
| `ms4-chip--good/--warn/--crit` | chip strefy | tło `--c-*-soft`, tekst kolor strefy, bez krawędzi |
| `ms4-chip--demo` | chip symulacji | tło `--c-demo-soft`, tekst `--c-demo`, ikona `flask` 16 px |
| `ms4-chip--info` | chip informacyjny | tło `--c-info-soft`, tekst `--c-info` |
| `ms4-chip__icon` | ikona w chipie | 16×16 px |
| `ms4-chip__label` | tekst chipa | `--t-label`, `--fw-med` |
| `ms4-badge` | plakietka nieklikalna („Na żywo”) | wysokość 24 px, `--r-pill`, `--t-caption`, `--fw-bold`, `letter-spacing: .02em`, `padding-inline: 10px`, wersalikowo tylko w wariancie `--demo` (ton not o prywatności — po przejściu na model darowiznowy nie oznacza już żadnej symulacji) |
| `ms4-badge--good/--warn/--crit/--demo/--info` | tony plakietki | tło pełne w kolorze tonu, tekst `--c-on-*`; wariant `--demo` zawsze pełny `--c-demo` + `--c-surface` jako tekst |
| `ms4-badge--dot` | plakietka z kropką zamiast tła | tło przezroczyste, kropka 8 px w kolorze tonu + tekst `--c-text-2` |
| `ms4-stamp` | znacznik strefy przy wskaźniku | pigułka 32 px: kształt + słowo (`Scale.stamp().wordPL`), tło `--c-*-soft`, tekst koloru strefy, `--t-label`, `--fw-bold` |
| `ms4-stamp__shape` | kształt znacznika | 12×12 px: `--good` koło pełne, `--warn` koło z obwódką 2 px i pustym środkiem, `--crit` trójkąt równoboczny, `--none` kwadrat z przekreśleniem |

### 5.G Wskaźnik i wykresy (rysuje `gauge.js`, maluje `components.css`)

| klasa | do czego | jak wygląda |
|---|---|---|
| `ms4-gauge` | kontener wskaźnika | kwadrat o boku ustalonym przez ekran (260/300/340/380 px), `position: relative`, `margin-inline: auto` |
| `ms4-gauge__svg` | rysunek | `width: 100%; height: 100%; overflow: visible`; łuk 270°, początek na godzinie 7:30 |
| `ms4-gauge__track` | tor pod strefami | `stroke: var(--c-surface-3)`, `stroke-width: 14`, `stroke-linecap: round`, `fill: none` |
| `ms4-gauge__band` | łuk jednej strefy | `stroke-width: 14`, `fill: none`, `stroke-linecap: butt`; `--good/--warn/--crit` → `var(--c-good)` itd. z kryciem 0,9 |
| `ms4-gauge__needle` | igła | linia od 34% do 88% promienia, `stroke: var(--c-text)`, `stroke-width: 4`, `stroke-linecap: round`; obracana WYŁĄCZNIE przez `transform: rotate()` na grupie |
| `ms4-gauge__cap` | oś igły | koło r=7, `fill: var(--c-surface)`, `stroke: var(--c-text)`, `stroke-width: 3` |
| `ms4-gauge__value` | wielka liczba w środku | `--t-display`, `--fw-black`, `--font-num`, `tabular-nums`, `--c-text`, `text-anchor: middle` |
| `ms4-gauge__unit` | jednostka pod liczbą | `--t-label`, `--fw-med`, `--c-text-3` |
| `ms4-gauge__name` | nazwa wielkości nad liczbą | `--t-label`, `--fw-med`, `--c-text-2`, wersaliki, `letter-spacing: .06em` |
| `ms4-gauge__ticks` | grupa kresek | `stroke: var(--c-border-strong)`, `stroke-width: 1.5` |
| `ms4-gauge__tick` | kreska większa | długość 10 px, `stroke-width: 2` |
| `ms4-gauge__ticklabel` | liczba przy kresce | `--t-caption`, `--c-text-3`, `--font-num` |
| `ms4-gauge.is-stale` | brak pomiaru | strefy `opacity: .35`, igła ukryta, w środku `—` w `--c-text-3` |
| `ms4-spark` | mikrowykres w kafelku | wysokość 28 px, `width: 100%`, `overflow: hidden` |
| `ms4-spark__area` | wypełnienie pod linią | `fill: currentColor`, `opacity: .14` |
| `ms4-spark__line` | linia | `fill: none; stroke: currentColor; stroke-width: 2; stroke-linejoin: round; stroke-linecap: round` |
| `ms4-spark__dot` | punkt ostatni | r=2.5, `fill: currentColor` |
| `ms4-tape` | wykres liniowy historii | wysokość 220 px (telefon) / 300 px (≥1024), tło `--c-surface-2`, `--r-md`, `padding: var(--s-3)` |
| `ms4-tape__zone` | poziomy pas strefy w tle | `fill: var(--c-*-soft)`, krycie 0,7; nigdy pod tekstem osi |
| `ms4-tape__grid` | siatka | `stroke: var(--c-border)`, `stroke-width: 1`, `stroke-dasharray: 2 4` |
| `ms4-tape__line` | przebieg | `stroke: var(--c-accent)`, `stroke-width: 2.5`, `fill: none`, `stroke-linejoin: round` |
| `ms4-tape__gap` | przerwa w pomiarze | ten sam przebieg z `stroke-dasharray: 3 5` i kryciem 0,45 |
| `ms4-tape__cursor` | pionowy krzyż odczytu | linia `stroke: var(--c-text)`, `stroke-width: 1.5`, plus koło r=4 wypełnione `--c-accent` |
| `ms4-tape__axis` | oś | `--t-caption`, `--c-text-3` |
| `ms4-tape__axislabel` | podpis na osi | `--t-caption`, `--font-num`, `--c-text-3` |
| `ms4-bars` | panorama słupków (24 godz / 30 dni) | wysokość 180 px, tło `--c-surface-2`, `--r-md`, `padding: var(--s-3)` |
| `ms4-bars__bar` | jeden słupek średniej | szerokość `calc(100% / n - 2px)`, `--r-xs` na górze, kolor strefy słupka |
| `ms4-bars__range` | zakres min–maks nad słupkiem | linia 2 px w kolorze strefy z kryciem 0,35 |
| `ms4-bars__axis` | oś czasu pod słupkami | `--t-caption`, `--c-text-3`, co czwarta etykieta |
| `ms4-ring` | mały pierścień postępu (komfort) | 64×64 px |
| `ms4-ring__track` | tor pierścienia | `stroke: var(--c-surface-3)`, `stroke-width: 8`, `fill: none` |
| `ms4-ring__fill` | wypełnienie | `stroke: currentColor`, `stroke-width: 8`, `stroke-linecap: round`, sterowane `stroke-dashoffset` |
| `ms4-ring__label` | liczba w środku | `--t-h3`, `--fw-bold`, `--font-num` |

### 5.H Karta podglądu kamery

| klasa | do czego | jak wygląda |
|---|---|---|
| `ms4-camera` | karta podglądu | jak `ms4-card`, ale `padding: 0` i `overflow: hidden` |
| `ms4-camera__bar` | pasek nad podglądem | wiersz 48 px, `padding-inline: var(--s-4)`, tytuł „Podgląd kontrolny” + plakietka „Na żywo” + przycisk zwijania |
| `ms4-camera__toggle` | przycisk zwijania | `ms4-btn--icon --ghost --sm` z ikoną `chevron-down`, obracaną o 180° w stanie zwiniętym |
| `ms4-camera__stage` | ramka obrazu (element z `index.html`) | `position: relative`, `aspect-ratio: 4/3` (od 600 px `16/9`), tło `--c-surface-3`, `overflow: hidden` |
| `ms4-camera__video` | element `<video>` | `width: 100%; height: 100%; object-fit: cover; display: block`; przy kamerze przedniej JS dokłada `is-mirrored` → `transform: scaleX(-1)` |
| `ms4-camera__placeholder` | warstwa komunikatu | pełne pokrycie ramki, `display: grid; place-items: center`, tło `--c-surface-3`, `padding: var(--s-5)` |
| `ms4-camera__placeholder-text` | tekst komunikatu (pisze go WYŁĄCZNIE `engine.js`) | `--t-body-sm`, `--c-text-2`, `text-align: center`, `max-width: 34ch` |
| `ms4-camera__reticle` | celownik | ramka w 60% szerokości i wysokości (dokładnie tyle, ile mierzy `engine.js`), narożniki 24 px z `2px solid var(--c-on-accent)` i cieniem `0 0 0 1px rgba(0,0,0,.35)`, środek pusty |
| `ms4-camera__badge` | plakietka „Na żywo” | `ms4-badge--crit` z pulsującą kropką, lewy górny róg ramki, `--s-3` od krawędzi |
| `ms4-camera.is-collapsed` | karta zwinięta | `ms4-camera__stage` dostaje `height: 0` i `opacity: 0`, przejście `--dur` |

### 5.I Kafelki wielkości

| klasa | do czego | jak wygląda |
|---|---|---|
| `ms4-tile` | kafelek jednej wielkości | jak `ms4-card` z `--r-md`, `padding: var(--s-3)`, `min-height: 140px`, kolumna `gap: var(--s-2)`, `cursor: pointer`; `:hover` (≥1024) → `--e-2`, `translateY(-2px)`; `:active` → `scale(.98)` |
| `ms4-tile__head` | wiersz nagłówka kafelka | `display: flex; align-items: center; gap: 6px; min-height: 20px` |
| `ms4-tile__name` | nazwa wielkości | `--t-label`, `--fw-med`, `--c-text-2`, dwie linie maks., `overflow: hidden` |
| `ms4-tile__badge` | znak `≈` w rogu przy wartości przybliżonej | `margin-left: auto`, 20 px, `--t-caption` |
| `ms4-tile__value` | liczba | `--t-h1`, `--fw-black`, `--font-num`, `tabular-nums`, `--c-text`, `line-height: 1` |
| `ms4-tile__unit` | jednostka przy liczbie | `--t-body-sm`, `--fw-med`, `--c-text-3`, `margin-left: 4px` |
| `ms4-tile__approx` | znak `≈` przed liczbą | `--c-text-3`, `margin-right: 2px`, z `title` i `aria-label` „wartość przybliżona” |
| `ms4-tile__spark` | mikrowykres | `ms4-spark` w kolorze strefy (`color: var(--c-good)` itd.), `margin-top: auto` |
| `ms4-tile__bar` | pasek strefy pod wykresem | wysokość 4 px, `--r-pill`, tło `--c-surface-3` |
| `ms4-tile__bar-fill` | wypełnienie paska | szerokość = `Scale.pos()`, tło koloru strefy, przejście `width --dur-fast linear` |
| `ms4-tile.is-selected` | kafelek kanału wiodącego | krawędź `2px solid var(--c-accent)`, tło `--c-accent-soft` w 40% krycia, w rogu ikona `target` 16 px |
| `ms4-tile__zone` | słowo strefy dla czytnika i przy 1,3× | `ms4-sronly` domyślnie; przy `--text-scale: 1.3` staje się widoczne jako `--t-caption` |

### 5.J Noty

| klasa | do czego | jak wygląda |
|---|---|---|
| `ms4-note` | blok wyjaśnienia | wiersz: ikona 20 px + treść, `--r-md`, `padding: var(--s-3) var(--s-4)`, `--t-body-sm`, `line-height: --lh-body` |
| `ms4-note--limits` | nota o granicach pomiaru | tło `--c-surface-2`, lewa krawędź 3 px `--c-border-strong`, tekst `--c-text-2`, ikona `info` |
| `ms4-note--warning` | ostrzeżenie metodyczne | tło `--c-warn-soft`, tekst `--c-warn`, ikona `warning` |
| `ms4-note--info` | podpowiedź | tło `--c-info-soft`, tekst `--c-info`, ikona `bulb` |
| `ms4-note--demo` | informacja o symulacji | tło `--c-demo-soft`, tekst `--c-demo`, ikona `flask` |
| `ms4-note__title` | tytuł noty | `--t-body-sm`, `--fw-bold`, `margin-bottom: 2px`, kolor jak tekst noty |
| `ms4-note__text` | treść noty | `--t-body-sm`, kolor jak wyżej z kryciem 0,92 |
| `ms4-note__icon` | ikona noty | 20×20 px, `flex: 0 0 auto`, `margin-top: 2px` |

### 5.K Listy ustawień i formanty

| klasa | do czego | jak wygląda |
|---|---|---|
| `ms4-list` | lista wierszy | tło `--c-surface`, `--r-lg`, cień `--e-1`, `overflow: hidden`; wiersze rozdzielone linią `--c-border` wstawianą przez `:not(:last-child)` |
| `ms4-list--inset` | lista wewnątrz karty | tło przezroczyste, cień `--e-0`, `--r-md` |
| `ms4-row` | wiersz listy | `min-height: 56px`, wiersz `gap: var(--s-3)`, `padding: var(--s-3) var(--s-4)`, `align-items: center`, tło przezroczyste; `:hover` → `--c-surface-2`; `:active` → `--c-surface-3` |
| `ms4-row__icon` | ikona wiersza | 24 px w kole 36 px, tło `--c-surface-2`, kolor `--c-text-2`; w wariancie `--danger` tło `--c-crit-soft`, ikona `--c-crit` |
| `ms4-row__text` | kolumna tekstu | `min-width: 0`, `flex: 1 1 auto` |
| `ms4-row__title` | tytuł wiersza | `--t-h3` przy 18 px staje się za duży w liście — używamy `--t-body`, `--fw-med`, `--c-text` |
| `ms4-row__subtitle` | opis wiersza | `--t-body-sm`, `--c-text-3`, maks. dwie linie |
| `ms4-row__value` | wartość po prawej | `--t-body-sm`, `--c-text-2`, `--font-num`, `text-align: right`, `white-space: nowrap` |
| `ms4-row__control` | formant po prawej (przełącznik, segmenty) | `flex: 0 0 auto` |
| `ms4-row__chevron` | strzałka wejścia | ikona `chevron-right` 20 px, `--c-text-3`; `:hover` wiersza → przesuwa się o 2 px w prawo |
| `ms4-row--danger` | wiersz niszczący | tytuł w `--c-crit` |
| `ms4-row.is-disabled` | wiersz nieaktywny | `opacity: .45`, `pointer-events: none` |
| `ms4-switch` | przełącznik dwustanowy | tor 52×32 px, `--r-pill`, tło `--c-surface-3`, wewnątrz kciuk 26 px `--c-surface` z cieniem `--e-1`; `is-checked` → tor `--c-accent`, kciuk przesunięty o 20 px; przejście `--dur-fast` |
| `ms4-switch__track` | tor | jw.; `:focus-visible` na kontrolce → obrys fokusu wokół toru |
| `ms4-switch__thumb` | kciuk | koło 26 px; przy ograniczonym ruchu przeskakuje bez animacji |
| `ms4-switch__label` | etykieta przy przełączniku | `--t-body`, `--c-text` |
| `ms4-segmented` | przełącznik segmentowy (zakres, motyw) | `display: inline-flex`, `padding: 3px`, tło `--c-surface-3`, `--r-pill`, `position: relative` |
| `ms4-segmented__option` | jeden segment | `min-height: 38px`, `padding-inline: var(--s-4)`, `--t-label`, `--fw-med`, `--c-text-2`, `--r-pill`, `z-index: 1`, tło przezroczyste |
| `ms4-segmented__option.is-active` | segment wybrany | tekst `--c-text`, waga `--fw-bold` |
| `ms4-segmented__thumb` | biała pigułka pod wybranym segmentem | `position: absolute`, tło `--c-surface`, cień `--e-1`, `--r-pill`, przesuwana przez `transform: translateX()` i `width` w `--dur-fast` |
| `ms4-segmented--full` | segmenty na całą szerokość | `display: flex; width: 100%`, każdy segment `flex: 1` |
| `ms4-slider` | suwak z etykietą | kolumna `gap: var(--s-2)` |
| `ms4-slider__head` | wiersz etykiety i wartości | `display: flex; justify-content: space-between; align-items: baseline` |
| `ms4-slider__label` | etykieta | `--t-body-sm`, `--c-text-2` |
| `ms4-slider__value` | bieżąca wartość | `--t-body`, `--fw-bold`, `--font-num`, `--c-text` |
| `ms4-slider__input` | `<input type="range">` | `appearance: none`, wysokość 32 px (obszar dotyku), tor 6 px `--c-surface-3` z `--r-pill`, kciuk 24 px `--c-accent` z białą obwódką 3 px i cieniem `--e-1`; `:focus-visible` → obrys wokół kciuka |
| `ms4-slider__track` | tor rysowany dodatkowo (progi na tle stref) | wysokość 6 px, gradient z pasów stref (`Scale.bands`) |
| `ms4-slider__fill` | wypełnienie do wartości | wysokość 6 px, tło `--c-accent`, `--r-pill` |
| `ms4-swatches` | rząd próbek palety | `display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-3)`; od 600 px `repeat(6, 1fr)` |
| `ms4-swatch` | jedna próbka palety | kolumna: dysk + nazwa, `min-height: var(--tap)`, `padding: var(--s-2)`, `--r-md`, tło przezroczyste; `:hover` → `--c-surface-2` |
| `ms4-swatch__disc` | kółko z kolorem palety | 44×44 px, `--r-pill`, tło: gradient 135° z `--c-accent` do `--c-accent-2` DANEJ palety (wartości z `Store.ACCENTS`, wstawiane inline jako `background-image`), krawędź `1px solid rgba(0,0,0,.12)` |
| `ms4-swatch.is-selected` | próbka wybrana | dysk dostaje obwódkę `3px solid var(--c-text)` z `outline-offset: 2px`, w środku ikona `check` 20 px w `--c-on-accent` |
| `ms4-swatch__check` | znacznik wyboru | ikona `check` 20 px, wyśrodkowana na dysku |
| `ms4-swatch__label` | nazwa palety | `--t-caption`, `--c-text-2`, `text-align: center` |
| `ms4-themepick` | wybór motywu z podglądem | `display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-3)` |
| `ms4-themepick__option` | jedna opcja motywu | kolumna: podgląd + etykieta, `--r-md`, `padding: var(--s-2)`, krawędź `1px solid var(--c-border)`; `is-selected` → krawędź `2px solid var(--c-accent)`, tło `--c-accent-soft` |
| `ms4-themepick__preview` | miniatura motywu | 100% × 64 px, `--r-sm`, rysowana z dwóch prostokątów: „tło” i „karta”; wariant jasny — `#F4F6F9`/`#FFFFFF`, ciemny — `#0E1116`/`#171B22`, systemowy — przekątny podział obu (to jedyne miejsce, gdzie `components.css` może użyć hexów wprost, bo podgląd musi pokazać motyw, którego akurat nie ma) |
### 5.L Arkusze, okna dialogowe, toasty

| klasa | do czego | jak wygląda |
|---|---|---|
| `ms4-scrim` | przyciemnienie pod warstwą modalną | `position: fixed; inset: 0`, tło `--c-scrim`, `z-index: calc(var(--z-sheet) - 1)`, `opacity: 0`; `is-open` → `opacity: 1` w `--dur` |
| `ms4-sheet-host` | pojemnik arkuszy w `index.html` | `position: fixed; inset: 0; z-index: var(--z-sheet); pointer-events: none`; dzieci mają `pointer-events: auto` |
| `ms4-sheet` | arkusz | tło `--c-surface`, `--r-xl` na górnych rogach, cień `--e-3`, kolumna, `max-height: 92dvh`, przyklejony do dołu; od 1024 px: wyśrodkowany, `--r-xl` na wszystkich rogach, `max-width: 720px`, `max-height: 88vh` |
| `ms4-sheet--auto` | arkusz na wysokość treści | `height: auto` |
| `ms4-sheet--full` | arkusz pełnoekranowy (narzędzia) | `height: 100dvh`, `--r-0` na telefonie (rogi proste), od 1024 px `max-width: 880px`, `--r-xl`, `max-height: 88vh` |
| `ms4-sheet.is-open` | arkusz otwarty | telefon: `translateY(100%) → 0`; desktop: `opacity 0→1` + `scale(.96)→1`; `--dur-slow` z `--ease` |
| `ms4-sheet__grip` | uchwyt do przeciągania | 36×4 px, `--r-pill`, tło `--c-border-strong`, wyśrodkowany, `margin: var(--s-2) auto`; od 1024 px `display: none` |
| `ms4-sheet__header` | nagłówek arkusza | `position: sticky; top: 0`, tło `--c-surface`, dolna krawędź `--c-border`, `padding: var(--s-3) var(--s-4)`, wiersz `gap: var(--s-3)` |
| `ms4-sheet__title` | tytuł arkusza | `--t-h2`, `--fw-bold`, `--c-text`, `margin-right: auto` |
| `ms4-sheet__subtitle` | podtytuł arkusza | `--t-body-sm`, `--c-text-3`, pod tytułem |
| `ms4-sheet__close` | przycisk zamknięcia | `ms4-btn--icon --ghost --md` z ikoną `close`, 44×44 px |
| `ms4-sheet__body` | przewijana treść | `overflow-y: auto; overscroll-behavior: contain`, `padding: var(--s-4)`, kolumna `gap: var(--s-4)`, `-webkit-overflow-scrolling: touch` |
| `ms4-sheet__actions` | pasek akcji na dole arkusza | `position: sticky; bottom: 0`, tło `--c-surface`, górna krawędź `--c-border`, `padding: var(--s-3) var(--s-4) calc(var(--s-3) + env(safe-area-inset-bottom))`, przyciski w rzędzie, główny po prawej (na telefonie oba `--full` jeden pod drugim) |
| `ms4-dialog-host` | pojemnik okien | jak `ms4-sheet-host`, ale `z-index: var(--z-dialog)` |
| `ms4-dialog` | okno potwierdzenia | tło `--c-surface`, `--r-lg`, cień `--e-3`, `padding: var(--s-5)`, `width: calc(100vw - var(--s-8))`, `max-width: 400px`, wyśrodkowane; wejście `opacity 0→1` + `scale(.94)→1` w `--dur` |
| `ms4-dialog__title` | tytuł okna | `--t-h2`, `--fw-bold`, `margin-bottom: var(--s-2)` |
| `ms4-dialog__text` | treść okna | `--t-body`, `--c-text-2`, `line-height: --lh-body` |
| `ms4-dialog__actions` | przyciski okna | `margin-top: var(--s-5)`, wiersz `gap: var(--s-2)`, `justify-content: flex-end`; na telefonie kolumna, przycisk potwierdzenia na górze |
| `ms4-dialog--danger` | okno akcji niszczącej | tytuł w `--c-crit`, przycisk potwierdzenia `ms4-btn--danger` w wersji pełnej |
| `ms4-toasts` | pojemnik toastów | `position: fixed`, `z-index: var(--z-toast)`, kolumna `gap: var(--s-2)`, telefon: nad dolną nawigacją i wyśrodkowany; desktop: prawy dolny róg |
| `ms4-toast` | jeden toast | tło `--c-text` (czyli odwrócone!), tekst `--c-bg`, `--r-pill`, `padding: 12px 18px`, cień `--e-3`, `--t-body-sm`, `max-width: 92vw`; wejście `translateY(12px)→0` + `opacity`, wyjście lustrzane po 4 s (7 s dla tonu `--crit`) |
| `ms4-toast--good/--warn/--crit/--info` | ton toastu | lewa krawędź 4 px w kolorze tonu i ikona tonu; tło pozostaje odwrócone |
| `ms4-toast__icon` | ikona toastu | 20 px w kolorze tonu |
| `ms4-toast__text` | tekst toastu | `--t-body-sm`, maks. trzy linie |
| `ms4-toast__action` | przycisk w toaście („Odśwież”, „Cofnij”) | `--t-label`, `--fw-bold`, kolor `--c-bg`, podkreślenie, `margin-left: var(--s-3)`, cel dotyku 44 px przez `padding` |

### 5.M Stany puste i ładowanie

| klasa | do czego | jak wygląda |
|---|---|---|
| `ms4-empty` | stan pusty | kolumna wyśrodkowana, `padding: var(--s-8) var(--s-5)`, `gap: var(--s-3)`, `text-align: center` |
| `ms4-empty__icon` | ikona stanu pustego | 56×56 px w kole 96 px, tło `--c-surface-2`, ikona `--c-text-3`, `stroke-width: 1.5` |
| `ms4-empty__title` | tytuł | `--t-h3`, `--fw-bold`, `--c-text` |
| `ms4-empty__text` | wyjaśnienie | `--t-body-sm`, `--c-text-2`, `max-width: 40ch`, `line-height: --lh-body` |
| `ms4-empty__action` | przycisk wyjścia ze stanu pustego | `ms4-btn--tonal --md`, `margin-top: var(--s-2)` |
| `ms4-skeleton` | miejsce ładowanej treści | tło `--c-surface-3`, `--r-sm`, animacja przesuwającego się rozjaśnienia 1,4 s; przy ograniczonym ruchu statyczny prostokąt bez animacji |

### 5.N Ekran POMIAR

| klasa | do czego | jak wygląda |
|---|---|---|
| `ms4-hero` | blok bohatera | `ms4-card` z `padding: var(--s-5) var(--s-4) var(--s-4)`, tło `--c-surface`; od 1024 px `display: grid; grid-template-columns: minmax(320px,420px) 1fr; gap: var(--s-6); align-items: center` |
| `ms4-hero__gauge` | miejsce wskaźnika | wyśrodkowane, `--c-accent` jako `color` (mikrowykresy dziedziczą) |
| `ms4-hero__side` | prawa kolumna hero (desktop) | kolumna `gap: var(--s-4)`; na telefonie ten sam element, tylko pod wskaźnikiem |
| `ms4-hero__stamp` | znacznik strefy | `ms4-stamp`, wyśrodkowany na telefonie, do lewej na desktopie |
| `ms4-hero__verdict` | zdanie werdyktu | `--t-h3` (18 px), `--fw-med`, `--c-text`, `line-height: --lh-body`, `max-width: 46ch`, `min-height: 3 wiersze` żeby zmiana zdania nie skakała układem |
| `ms4-hero__meta` | wiersz metadanych pod werdyktem | `--t-caption`, `--c-text-3`, elementy rozdzielone `·`: zegar sesji, częstotliwość „5,0 Hz”, informacja o kalibracji |
| `ms4-hero__clock` | zegar sesji | `--font-num`, `tabular-nums`, `--t-caption`, aktualizowany raz na sekundę |
| `ms4-actions` | pasek akcji pomiaru | `display: flex; gap: var(--s-3); align-items: center`; na telefonie pierwszy przycisk `flex: 1`, pozostałe `--icon` |
| `ms4-actions__start` | przycisk startu | `ms4-btn--primary --lg --full` na telefonie, `--lg` bez `--full` od 600 px; w trakcie pomiaru zmienia wariant na `--danger` z etykietą „Zatrzymaj” i ikoną `stop` |
| `ms4-actions__flip` | obrót kamery | `ms4-btn--tonal --icon --lg` z ikoną `camera-flip`; `is-disabled`, gdy silnik nie działa |
| `ms4-actions__lead` | wybór kanału wiodącego | `ms4-btn--tonal --icon --lg` z ikoną `target`; otwiera arkusz wyboru wielkości |
| `ms4-tiles` | siatka kafelków | `ms4-grid ms4-grid--metrics` |
| `ms4-leadsheet` | arkusz wyboru kanału wiodącego | `ms4-sheet--auto` z listą `ms4-row`, każdy wiersz: ikona wielkości, nazwa, bieżąca wartość, znacznik wyboru |

### 5.O Ekran HISTORIA

| klasa | do czego | jak wygląda |
|---|---|---|
| `ms4-history` | korzeń ekranu | kolumna `gap: var(--s-4)`; od 1024 px `display: grid; grid-template-columns: 1fr 320px; gap: var(--s-5); align-items: start` |
| `ms4-history__main` | kolumna wykresu | `min-width: 0` (bez tego wykres rozpycha siatkę) |
| `ms4-history__side` | kolumna panelu | kolumna `gap: var(--s-4)`; na telefonie idzie pod wykresem |
| `ms4-ranges` | wybór zakresu | `ms4-segmented--full` z pięcioma opcjami: 1 min / 1 godz / 24 godz / 7 dni / 30 dni |
| `ms4-stats` | statystyka sesji | `ms4-grid--stats` |
| `ms4-stat` | jedna statystyka | `ms4-card--flat` z `padding: var(--s-3)`, kolumna `gap: 2px` |
| `ms4-stat__label` | podpis | `--t-caption`, `--c-text-3`, wersaliki, `letter-spacing: .05em` |
| `ms4-stat__value` | liczba | `--t-h2`, `--fw-bold`, `--font-num`, `tabular-nums`, `--c-text` |
| `ms4-zonebar` | rozkład czasu w strefach | pasek 12 px, `--r-pill`, `overflow: hidden`, `display: flex` |
| `ms4-zonebar__seg` | odcinek strefy | szerokość = udział procentowy, tło koloru strefy; minimalna szerokość 2 px, żeby niezerowy udział nigdy nie zniknął |
| `ms4-zonebar__legend` | legenda pod paskiem | wiersz `gap: var(--s-3)`, każdy wpis: kropka + słowo strefy + procent, `--t-caption`, `--c-text-2` |
| `ms4-sessions` | lista sesji | `ms4-list` |
| `ms4-session` | jedna sesja | `ms4-row`: po lewej kropka strefy dominującej, tytuł = data i godzina, podtytuł = czas trwania i liczba próbek, po prawej średnia kanału wiodącego + `chevron-right` |
| `ms4-session__when` | data i godzina | `--t-body`, `--fw-med` |
| `ms4-session__dur` | czas trwania | `--t-body-sm`, `--c-text-3`, `--font-num` |
| `ms4-session__avg` | średnia | `--t-body`, `--fw-bold`, `--font-num`, kolor strefy |
| `ms4-coverage` | pasek pokrycia doby | wysokość 8 px, tło `--c-surface-3`, wypełnienie `--c-accent` w miejscach z pomiarem; pod nim podpis `--t-caption` |

### 5.P Ekran NARZĘDZIA

| klasa | do czego | jak wygląda |
|---|---|---|
| `ms4-tools` | siatka narzędzi | `ms4-grid ms4-grid--tools` |
| `ms4-tool` | kafelek narzędzia | `ms4-card ms4-card--interactive` z `--r-lg`, `padding: var(--s-4)`, kolumna `gap: var(--s-2)`, `min-height: 132px` |
| `ms4-tool__icon` | ikona narzędzia | 24 px w kwadracie 44 px z `--r-md`, tło `--c-accent-soft`, ikona `--c-accent-ink` |
| `ms4-tool__title` | nazwa narzędzia | `--t-h3`, `--fw-bold`, `--c-text` |
| `ms4-tool__desc` | opis jednym zdaniem | `--t-body-sm`, `--c-text-2`, maks. dwie linie, `line-height: --lh-body` |

### 5.Q Ekran WSPARCIE

Zakładka, która przed przejściem na model darowiznowy nazywała się KONTO. Nie ma tu
profilu, konta ani żadnej karty dostępu — zostały dwa bloki: jedna prośba
o dobrowolne wsparcie i całe ustawienia aplikacji.

| klasa | do czego | jak wygląda |
|---|---|---|
| `ms4-support__ask` | kolumna z prośbą o wsparcie | `ms4-stack`; od 1024 px wąska kolumna siatki (`grid-area: ask`), przyklejona pod górną belką |
| `ms4-support__settings` | kolumna ustawień | `ms4-stack`; od 1024 px szeroka kolumna siatki (`grid-area: settings`) |
| `ms4-support__action` | karta z przyciskiem darowizny | `ms4-card`, `text-align: left`; mieści przycisk **albo** notę o braku adresu, zawsze notę o prywatności |
| `a.ms4-btn` | odnośnik udający przycisk | `text-decoration: none`; poza tym geometria zwykłego `ms4-btn` |

Przycisk darowizny jest zwykłym `ms4-btn--tonal --md --full` z ikoną `cup` — **nie** ma
własnego wariantu, gradientu ani cudzego brandingu. Ma wyglądać jak każdy inny przycisk
drugorzędny tej wersji.

**Adres profilu darowizn.** W `screen-support.js`, jako pierwsza rzecz po nagłówku pliku,
stoi jedna stała:

```js
var SUPPORT_URL = '';
```

Walidacja jest jednolinijkowa: przyjmujemy **wyłącznie** adres zaczynający się od
`https://`; cokolwiek innego (w tym `javascript:`) traktujemy jak brak adresu.

Zachowanie przy pustej stałej jest częścią specyfikacji, nie przypadkiem brzegowym:

* ekran istnieje i wygląda normalnie — nie znika i nie pokazuje błędu,
* w miejscu przycisku stoi spokojna informacja dla użytkownika (`support.noUrlTitle`,
  `support.noUrlText`), nie komunikat dla programisty,
* **nie renderuje się żaden element `<a>`** — ani martwy, ani prowadzący donikąd.

Gdy adres jest ustawiony, odnośnik ma dokładnie taką postać:

```html
<a href="…" target="_blank" rel="noopener noreferrer">
```

`rel="noopener noreferrer"` jest obowiązkowe. Nie ładujemy żadnego skryptu, widgetu ani
obrazka z serwera zewnętrznego — złamałoby to obietnicę trybu offline i „nic nie wychodzi
do sieci”. Ikonę kubka rysujemy sami (rozdział 6.4, nazwa `cup`).

**Zdanie o prywatności** (`support.privacyNote`) stoi przy przycisku i pokazuje się także
wtedy, gdy przycisku nie ma: kliknięcie otwiera stronę zewnętrzną i jest to jedyny moment,
w którym cokolwiek opuszcza to urządzenie.

**Układ desktopowy (≥1024 px).** `.ms4-view[data-view="support"] > .ms4-view__inner` to
siatka `minmax(0, 1fr) minmax(320px, 380px)` z obszarami `"settings ask"`. Od 1440 px
wąska kolumna rośnie do `minmax(360px, 420px)`.

Ustawienia (motyw, paleta, tekst i ruch, pomiar, dane, o aplikacji) zostały na tym ekranie
bez zmian; ich klasy — `ms4-themepick*`, `ms4-swatch*`, `ms4-switch`, `ms4-segmented*`,
`ms4-row*`, `ms4-field*` — opisują rozdziały 5.E–5.M.


### 5.S Klasy pomocnicze

| klasa | do czego | jak wygląda |
|---|---|---|
| `ms4-stack` | pionowa kolumna z odstępem | `display: flex; flex-direction: column; gap: var(--s-3)` |
| `ms4-row-inline` | poziomy rząd z odstępem | `display: flex; align-items: center; gap: var(--s-2); flex-wrap: wrap` |
| `ms4-clamp2` | tekst do dwóch linii | `-webkit-line-clamp: 2; -webkit-box-orient: vertical; display: -webkit-box; overflow: hidden` |
| `ms4-num` | liczba w tekście | `font-family: var(--font-num); font-variant-numeric: tabular-nums` |
| `ms4-muted` | tekst wyciszony | `color: var(--c-text-3)` |
| `ms4-center` | wyśrodkowanie tekstu | `text-align: center` |
---

## 6. Kontrakt ikon — `UI.icon(name, size)`

Reguły rysunku, wspólne dla wszystkich ikon. Po przejściu na model darowiznowy nie ma
wśród nich ani jednej kolorowej: ikony dostawców logowania zniknęły razem z logowaniem,
a razem z nimi ostatnie wartości barwne w `ui.js`.

* `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="1.75"`,
  `stroke-linecap="round"`, `stroke-linejoin="round"`, `aria-hidden="true"`, `focusable="false"`.
* Domyślny rozmiar 24 px; `UI.icon(name, 20)` ustawia `width`/`height`, nie skaluje grubości.
* Siatka rysunku: margines 2 px z każdej strony, czyli rysunek mieści się w polu 20×20.
* Nieznana nazwa zwraca pusty `<svg>` z klasą `is-hidden` — nigdy nie rzuca wyjątku.
* `UI.ICONS` zwraca tablicę nazw, dokładnie tę poniżej i w tej kolejności.

### 6.1 Nawigacja i powłoka

| nazwa | rysunek |
|---|---|
| `measure` | Półokrągła podziałka (łuk 200°) z krótką igłą wychodzącą ze środka ku górze i w prawo. |
| `history` | Zegar: koło o promieniu 9 ze wskazówkami na godzinie 10 i 2, plus strzałka cofania na lewym łuku. |
| `tools` | Skrzyżowany klucz płaski i śrubokręt, oba pod kątem 45°. |
| `cup` | Kubek: zaokrąglona obudowa, uszko po prawej i dwie smugi pary nad krawędzią — przycisk darowizny i zakładka WSPARCIE. |
| `heart` | Serce z dwóch łuków, obrys bez wypełnienia — wdzięczność, nie „polubienie”. |
| `logo` | Koło z ośmioma promieniami o różnej długości i wypełnionym środkiem — znak aplikacji. |
| `menu` | Trzy poziome linie o równej długości, odstęp 5 px. |
| `close` | Krzyż z dwóch linii przekątnych od 6,6 do 18,18. |
| `chevron-right` | Pojedynczy daszek zwrócony w prawo, rozpiętość 8 px. |
| `chevron-left` | To samo lustrzanie, zwrócone w lewo. |
| `chevron-down` | Daszek zwrócony w dół; obracany o 180° klasą, nie osobną ikoną. |
| `chevron-up` | Daszek zwrócony w górę. |
| `arrow-right` | Linia pozioma zakończona grotem po prawej. |
| `arrow-up` | Linia pionowa z grotem u góry — wzrost wartości. |
| `arrow-down` | Linia pionowa z grotem u dołu — spadek wartości. |
| `plus` | Krzyż prosty, ramiona po 12 px. |
| `minus` | Pojedyncza linia pozioma 12 px. |
| `check` | Ptaszek: krótkie ramię w dół-prawo, długie w górę-prawo. |
| `check-circle` | Ptaszek wpisany w koło o promieniu 9. |
| `more` | Trzy kropki w poziomie, promień 1,2. |

### 6.2 Pomiar i kamera

| nazwa | rysunek |
|---|---|
| `play` | Trójkąt równoramienny zwrócony w prawo, wierzchołki lekko zaokrąglone. |
| `stop` | Kwadrat 10×10 z promieniem 2, wyśrodkowany. |
| `camera` | Prostokąt korpusu z zaokrąglonymi rogami, garb wizjera u góry i koło obiektywu w środku. |
| `camera-flip` | Ten sam korpus aparatu z dwoma strzałkami tworzącymi pętlę obrotu wokół obiektywu. |
| `target` | Dwa współśrodkowe koła (promień 9 i 3,5) i cztery kreski celownika wychodzące na zewnątrz. |
| `expand` | Cztery narożniki ramki, każdy z krótką strzałką skierowaną na zewnątrz. |
| `bulb` | Żarówka: koło bańki z dwiema kreskami gwintu pod spodem i trzema promieniami po bokach. |
| `sun` | Koło z ośmioma równymi promieniami — jasność sceny. |
| `moon` | Sierp księżyca zbudowany z jednego łuku — wpływ na rytm dobowy, motyw ciemny. |
| `thermometer` | Pionowa rurka z bańką u dołu i trzema kreskami skali po prawej — temperatura barwowa. |
| `droplet` | Kropla zwężająca się ku górze — udział niebieskiego. |
| `waveform` | Trzy pełne okresy fali sinusoidalnej o malejącej amplitudzie — migotanie. |
| `grid` | Siatka 3×3 z dziewięciu małych kwadratów — równomierność (dokładnie tyle komórek, ile mierzy silnik). |
| `eye` | Migdał oka z okrągłą źrenicą w środku — komfort wzrokowy. |

### 6.3 Narzędzia

| nazwa | rysunek |
|---|---|
| `sliders` | Trzy poziome tory z suwakami na różnych pozycjach — progi. |
| `calibrate` | Prostokąt kartki pod ukośnym stożkiem światła padającym z lewego górnego rogu. |
| `report` | Kartka z zagiętym rogiem i trzema słupkami wykresu w środku. |
| `export` | Strzałka w dół wchodząca do otwartej tacki — zapis pliku. |
| `compare` | Dwa pionowe słupki różnej wysokości połączone poziomą klamrą u dołu. |
| `screen` | Monitor: prostokąt ekranu na krótkiej nóżce z podstawką. |
| `schedule` | Kartka kalendarza z dwoma kółkami zawieszek i kropką w polu dnia. |
| `bell` | Dzwonek z języczkiem u dołu — alerty. |
| `book` | Otwarta książka z grzbietem w środku — dokumentacja. |
| `info` | Litera „i” (kropka i kreska) wpisana w koło o promieniu 9. |
| `warning` | Trójkąt równoboczny z zaokrąglonymi rogami, wykrzyknik w środku. |
| `help` | Znak zapytania wpisany w koło o promieniu 9. |
| `flask` | Kolba stożkowa z wąską szyjką i poziomą kreską poziomu cieczy — oznaczenie symulacji. |
| `refresh` | Okrąg przerwany u góry z grotem strzałki na jednym z końców. |
| `trash` | Kosz: pokrywa, uchwyt i korpus z dwiema pionowymi kreskami. |
| `share` | Trzy węzły połączone dwiema liniami — udostępnianie raportu. |

### 6.4 Ustawienia i wsparcie

| nazwa | rysunek |
|---|---|
| `settings` | Koło zębate o sześciu zębach z otworem w środku. |
| `palette` | Paleta malarska z czterema kropkami farby i otworem na kciuk. |
| `contrast` | Koło, którego lewa połowa jest wypełniona — motyw jasny/ciemny. |
| `text-size` | Dwie litery „A”, mniejsza obok większej. |
| `motion` | Strzałka w prawo z trzema liniami prędkości i ukośnym przekreśleniem — ograniczenie ruchu. |
| `vibration` | Prostokąt telefonu z dwiema kreskami drgania po obu stronach. |
| `star` | Pięcioramienna gwiazda o zaokrąglonych wierzchołkach. |
| `shield` | Tarcza herbowa — prywatność i brak połączenia z siecią. |
| `sparkle` | Czteroramienna iskra z mniejszą iskrą w prawym górnym rogu — nowość. |
| `mail` | Koperta: prostokąt z trójkątnym zagięciem klapy. |
| `clock` | Koło ze wskazówkami na 12 i 4 — czas trwania. |
| `calendar` | Siatka miesiąca: prostokąt z górnym pasem i czterema kropkami dni. |

Razem: 20 + 14 + 16 + 12 = **62 nazwy**. `UI.ICONS.length === 62`.

---

## 7. Teksty polskie v4 — słownik `UI.T`

Zasady języka (przejęte z v3, rozdział 8.9, obowiązują bez zmian):

* zwracamy się przez „ty”, bez form grzecznościowych i bez wykrzykników;
* przecinek dziesiętny — daje go `Metrics.formatValue`, nigdy nie sklejamy liczb ręcznie;
* cudzysłowy polskie „ ”, myślnik długi — w roli pauzy, `·` jako separator w metadanych;
* zdania skończone, w mianowniku, bez wstawiania odmienionych nazw wielkości w środek zdania;
* zakazane słowa: „diagnoza”, „zdrowe/niezdrowe światło”, „bezpieczny poziom”,
  „norma medyczna”, „luksy”. Nie obiecujemy skutku i nie mówimy, co komu dolega.

Wszystko poniżej trafia do `UI.T` w `ui.js` jako zagnieżdżony obiekt. To, co już istnieje
w `Scale.TEXT` (werdykty, noty o granicach, komunikaty przejściowe, opisy modułów, stany
puste rejestratora, teksty stref), **nie jest tu powtarzane** — autor woła `Scale.TEXT`.
Kolizja treści między `UI.T` a `Scale.TEXT` jest błędem: wygrywa `Scale.TEXT`.

### 7.1 Nawigacja i powłoka — `UI.T.nav`

```
nav.measure          = 'Pomiar'
nav.history          = 'Historia'
nav.tools            = 'Narzędzia'
nav.support          = 'Wsparcie'
nav.aria             = 'Nawigacja główna'
nav.skip             = 'Przejdź do treści'
nav.brand            = 'Monitor Światła'
nav.version          = 'Wersja 4.0'
```

### 7.2 Ekran POMIAR — `UI.T.measure`

```
measure.title            = 'Pomiar'
measure.start            = 'Start pomiaru'
measure.starting         = 'Uruchamiam…'
measure.stop             = 'Zatrzymaj'
measure.flip             = 'Obróć kamerę'
measure.flipAria         = 'Przełącz kamerę przednią i tylną'
measure.lead             = 'Kanał'
measure.leadAria         = 'Wybierz wielkość na dużym wskaźniku'
measure.leadSheetTitle   = 'Co pokazać na wskaźniku'
measure.leadSheetSub     = 'Wskaźnik pokazuje jedną wielkość naraz. Pozostałe sześć widać w kafelkach niżej.'
measure.preview          = 'Podgląd kontrolny'
measure.previewLive      = 'Na żywo'
measure.previewHide      = 'Zwiń podgląd'
measure.previewShow      = 'Rozwiń podgląd'
measure.previewHint      = 'Ramka pokazuje dokładnie ten wycinek obrazu, który mierzy aplikacja.'
measure.tilesTitle       = 'Wszystkie wielkości'
measure.tilesSub         = 'Dotknij kafelka, żeby przenieść wielkość na duży wskaźnik.'
measure.hz               = '5,0 Hz'
measure.calibrated       = 'Skalibrowano'
measure.notCalibrated    = 'Bez kalibracji'
measure.sessionIdle      = 'Pomiar nie trwa'
measure.firstRun         = 'Zacznij od przycisku „Start pomiaru”. Kamera włączy się dopiero po jego naciśnięciu i nic nie opuszcza tego urządzenia.'
measure.helpAria         = 'Czym jest ten pomiar'
```

Werdykt, plakietka strefy, zdanie „Czym ten pomiar nie jest” i wszystkie noty o granicach
pochodzą ze `Scale.TEXT.verdict`, `Scale.TEXT.stamp` i `Scale.TEXT.note`. Nota
`Scale.TEXT.note.dashTitle` + `Scale.TEXT.note.dashText` stoi na dole ekranu POMIAR
w `ms4-note--limits` i **nigdy nie jest zwijana ani skracana**.

### 7.3 Ekran HISTORIA — `UI.T.history`

```
history.title          = 'Historia'
history.rangeAria      = 'Zakres czasu'
history.r1min          = '1 min'
history.r1h            = '1 godz'
history.r24h           = '24 godz'
history.r7d            = '7 dni'
history.r30d           = '30 dni'
history.metricAria     = 'Wielkość na wykresie'
history.chartTitle     = 'Przebieg w czasie'
history.chartSub       = 'Tło pokazuje strefy wyliczone z twoich progów.'
history.statsTitle     = 'Statystyka zakresu'
history.statMin        = 'Najmniej'
history.statAvg        = 'Średnio'
history.statMax        = 'Najwięcej'
history.statTime       = 'Czas pomiaru'
history.statSamples    = 'Próbek'
history.zonesTitle     = 'Rozkład stref'
history.zoneGood       = 'W normie'
history.zoneWarn       = 'Uwaga'
history.zoneCrit       = 'Krytycznie'
history.sessionsTitle  = 'Sesje pomiarowe'
history.sessionsSub    = 'Każde uruchomienie i zatrzymanie pomiaru to jedna sesja.'
history.sessionOpen    = 'Pokaż szczegóły sesji'
history.sessionRunning = 'Trwa teraz'
history.coverageTitle  = 'Pokrycie doby'
history.exportShort    = 'Eksportuj'
history.exportAria     = 'Zapisz historię do pliku'
history.clear          = 'Wyczyść historię'
history.pointAt        = 'Odczyt z {time}'
```

Stany puste tego ekranu: `Scale.TEXT.empty.recorderNoHistory`, `.recorderNoRange`,
`.historyEmpty`, `.coverageTpl`. Nie piszemy nowych.

### 7.4 Ekran NARZĘDZIA — `UI.T.tools`

Nazwy i jednozdaniowe opisy narzędzi biorą się ze `Scale.TEXT.modules` (numery 02–09, 12).
Poniżej wyłącznie to, czego tam nie ma.

```
tools.title        = 'Narzędzia'
tools.sub          = 'Dziewięć rzeczy, które możesz zrobić z tym, co już zmierzyłeś.'
tools.openAria     = 'Otwórz narzędzie: {name}'
tools.thresholds   = 'Progi'                    /* moduł 02 */
tools.calibration  = 'Kalibracja'               /* moduł 03 */
tools.reports      = 'Raporty'                  /* moduł 04 */
tools.export       = 'Eksport'                  /* moduł 05 */
tools.compare      = 'Porównanie sesji'         /* moduł 06 */
tools.screentest   = 'Test ekranu'              /* moduł 07 */
tools.schedule     = 'Harmonogram'              /* moduł 08 */
tools.alerts       = 'Alerty'                   /* moduł 09 */
tools.docs         = 'O pomiarze'               /* moduł 12 */
tools.docsDesc     = 'Czym ten pomiar jest, a czym na pewno nie jest.'
tools.exportCsv    = 'Zapisz plik CSV'
tools.exportJson   = 'Zapisz plik JSON'
tools.exportHint   = 'Plik powstaje w pamięci przeglądarki i zapisuje się na tym urządzeniu. Nic nie jest wysyłane.'
tools.exportRange  = 'Zakres eksportu'
tools.exportCols   = 'Opis kolumn'
tools.screenTestHint = 'Ustaw telefon naprzeciw monitora, w odległości około 30 cm, i przechodź kolejne plansze.'
tools.scheduleHint = 'Harmonogram działa wyłącznie przy otwartej aplikacji. Zamknięcie karty przerywa go.'
tools.alertsHint   = 'Alert pokazuje się w aplikacji. Nie wysyłamy powiadomień systemowych i nie prosimy o zgodę na nie.'
```

Dopisane przez autora `screen-tools.js` (nagłówki grup na ekranie NARZĘDZIA, sterowanie
planszami testu ekranu i te zdania dokumentacji, których nie ma ani w `Scale.TEXT.note`,
ani w `Metrics.CATALOGUE`):

```
tools.groupMeasure        = 'Pomiar'
tools.groupData           = 'Dane'
tools.groupAuto           = 'Automatyzacja'
tools.groupKnow           = 'Wiedza'
tools.copyKey             = 'Kopiuj do schowka'
tools.clearSessionsConfirm= 'Usunąć zapisane sesje? Historia pomiarów zostanie nietknięta — znikną tylko podsumowania sesji, z których korzysta porównanie.'
tools.planePrev           = 'Poprzednia plansza'
tools.planeNext           = 'Następna plansza'
tools.planeCountTpl       = 'Plansza {n} z {total}'
tools.docsMetricsTitle    = 'Siedem wielkości'
tools.docsMetricsSub      = 'Co mierzy każda z nich i skąd bierze się liczba.'
tools.docsColProperty     = 'Cecha'
tools.docsColValue        = 'Wartość'
tools.docsGlossaryTitle   = 'Słowniczek'
tools.docsGlossary        = [
  { termPL: 'Kanał barwny',
    textPL: 'Aparat rozkłada obraz na trzy kanały: czerwony, zielony i niebieski. Wszystkie wielkości w tej aplikacji są policzone z tych trzech liczb.' },
  { termPL: 'Próg',
    textPL: 'Granica między strefami. Progi domyślne są naszą oceną redakcyjną, a nie normą — możesz je przesunąć w narzędziu „Progi”.' },
  { termPL: 'Strefa',
    textPL: 'Jeden z trzech przedziałów wyznaczonych przez progi: w normie, uwaga, krytycznie. Po zmianie progów ta sama liczba trafia do innej strefy.' },
  { termPL: 'Próbka',
    textPL: 'Jeden odczyt z kamery. Aplikacja bierze pięć próbek na sekundę, a do historii zapisuje jeden punkt co pięć sekund.' },
  { termPL: 'Sesja',
    textPL: 'Wszystko między naciśnięciem „Start pomiaru” a „Zatrzymaj”. Sesja ma czas trwania, liczbę próbek i średnią każdej wielkości.' },
  { termPL: 'Wartość przybliżona',
    textPL: 'Liczba wyliczona z barw sRGB, a nie zmierzona. Temperatura barwowa i wpływ na rytm dobowy są takimi wartościami i noszą znak ≈.' },
  { termPL: 'Kalibracja',
    textPL: 'Wyrównanie trzech kanałów aparatu na białej kartce. Podnosi dokładność i nie daje aparatowi widma.' }
]
```

### 7.5 Ekran WSPARCIE — `UI.T.support`

Gałąź, która przed przejściem na model darowiznowy nazywała się `UI.T.account`.
Klucze konta i dostępu płatnego zniknęły; klucze ustawień zostały bez zmian,
tylko pod nową nazwą gałęzi.

Cztery rzeczy, krótko i w tej kolejności: co aplikacja daje za darmo, dlaczego jest
prośba, co daje darowizna (nic — i to musi być napisane wprost) oraz przycisk ze zdaniem
o prywatności.

```
support.title        = 'Wsparcie'
support.freeTitle    = 'Wszystko działa bez opłat'
support.freeText     = 'Wszystkie siedem wielkości z liczbami, cała historia, dziewięć narzędzi i tryb offline są dostępne od razu — bez konta, bez limitów i bez ani jednego żądania do sieci.'
support.whyTitle     = 'Dlaczego jest ta prośba'
support.whyText      = 'Monitor Światła utrzymuje i rozwija jedna osoba po godzinach. Dobrowolne wsparcie pokrywa ten czas i pozwala dokładać kolejne rzeczy — nic więcej za tym nie stoi.'
support.nothingTitle = 'Co daje darowizna'
support.nothingText  = 'Nic w aplikacji. Darowizna niczego nie odblokowuje i niczego nie zmienia — przed nią i po niej wszystko wygląda tak samo. Jedyne, co się dzieje, to że autor wie, że to się komuś przydało.'
support.donate       = 'Postaw mi kawę'
support.donateAria   = 'Otwórz profil darowizn w nowej karcie'
support.donateVia    = 'Odnośnik prowadzi na zewnętrzny profil darowizn (np. Buy Me a Coffee).'
support.privacyNote  = 'To jedyne miejsce w całej aplikacji, w którym cokolwiek opuszcza to urządzenie: przycisk otwiera stronę zewnętrzną w nowej karcie i dzieje się to dopiero po jego naciśnięciu. Pomiar, historia i ustawienia zostają tutaj.'
support.noUrlTitle   = 'Profil nie jest jeszcze podłączony'
support.noUrlText    = 'Adres profilu darowizn nie został jeszcze ustawiony, więc nie ma dokąd prowadzić — i dlatego nie ma tu przycisku. Cała reszta aplikacji działa bez zmian.'
support.thanks       = 'Dziękuję za każde wsparcie — także za samo korzystanie z aplikacji.'
```

Czego w tej gałęzi **nie wolno** zapisać: odliczania, „zostało X dni”, „tylko dziś”,
groźby, że coś przestanie działać bez wsparcia, ani słowa opisującego pakiet płatny
w jakimkolwiek kontekście.

### 7.6 Ustawienia — dalszy ciąg `UI.T.support`

Ustawienia mieszkają na tym samym ekranie, więc i w tej samej gałęzi słownika.

```
support.settingsTitle     = 'Ustawienia'
support.textMotion        = 'Tekst i ruch'
support.measureGroup      = 'Pomiar'
support.theme             = 'Motyw'
support.themeSystem       = 'Jak w systemie'
support.themeLight        = 'Jasny'
support.themeDark         = 'Ciemny'
support.accent            = 'Kolor aplikacji'
support.accentSub         = 'Zmienia wyłącznie kolor marki. Zielony, bursztynowy i czerwony stref zostają takie same, bo niosą znaczenie.'
support.textScale         = 'Rozmiar tekstu'
support.textScale1        = 'Zwykły'
support.textScale115      = 'Większy'
support.textScale13       = 'Największy'
support.textScalePreview  = 'Tak będzie wyglądał tekst w całej aplikacji.'
support.motion            = 'Ogranicz ruch'
support.motionSub         = 'Wyłącza przesunięcia i animacje. Zostaje tylko zmiana przezroczystości.'
support.haptics           = 'Wibracje'
support.hapticsSub        = 'Krótkie drgnięcie przy starcie i zatrzymaniu pomiaru. Działa tylko na urządzeniach, które to potrafią.'
support.leadMetric        = 'Wielkość na wskaźniku'
support.camera            = 'Kamera'
support.cameraBack        = 'Tylna'
support.cameraFront       = 'Przednia'
support.dataTitle         = 'Dane'
support.historySize       = 'Zebrana historia'
support.historySizeTpl    = '{count} odczytów · {span}'
support.clearHistory      = 'Wyczyść historię pomiarów'
support.clearSettings     = 'Przywróć ustawienia domyślne'
support.clearSettingsOk   = 'Przywrócono ustawienia domyślne.'
support.aboutTitle        = 'O aplikacji'
support.version           = 'Wersja'
support.versionValue      = '4.0'
support.versionSub        = 'Wszystkie pomiary i ustawienia zostają na tym urządzeniu.'
support.privacy           = 'Prywatność'
support.privacyText       = 'Aplikacja nie wykonuje żadnych żądań sieciowych. Obraz z kamery jest przetwarzany w tej karcie przeglądarki i nigdzie nie trafia. Historia i ustawienia leżą w pamięci tej przeglądarki i znikają razem z jej danymi.'
support.licenses          = 'Składniki aplikacji'
support.licensesText      = 'Aplikacja nie korzysta z żadnej zewnętrznej biblioteki, kroju pisma ani pliku graficznego. Wszystkie ikony są rysowane w kodzie, cały pomiar liczy własny kod w tej karcie przeglądarki, a strona nie pobiera niczego z sieci — dlatego działa też bez połączenia.'
```

### 7.7 Gałęzie usunięte

Ze słownika `UI.T` zniknęły w całości dwie gałęzie: ta od konta i ta od ekranu oferty.
Wraz z nimi zniknęły pojedyncze klucze, które opisywały płatny dostęp: dwa w `nav`
(stan dostępu w stopce nawigacji), dwa w `measure` (napis i zachęta na zamkniętym
kafelku), jeden w `tools` i dwa w `aria` (nazwa zamkniętego kafelka i nazwa karty
pakietu).

Ze `Scale.TEXT` zniknęły w ten sam sposób: wartość `stamp` i wartość `verdict` opisujące
liczbę za opłatą, dwa klucze `channels` od zamkniętego kanału, klucz `help` od płatnego
dostępu oraz `demo.fairness`. `help.free` brzmi teraz „Dla wszystkich, bez opłat”,
a moduł `10` w `Scale.TEXT.modules` opisuje wsparcie zamiast płatnego pakietu.


### 7.8 Błędy — `UI.T.error`

Komunikaty kamery przychodzą z `engine.js` jako `messagePL` i wyświetlamy je bez zmian.
Poniżej wyłącznie te, których silnik nie zna.

```
error.title          = 'Coś poszło nie tak'
error.retry          = 'Spróbuj ponownie'
error.storageFull    = 'Pamięć przeglądarki jest pełna. Najstarsze punkty historii zostały usunięte, żeby pomiar mógł trwać dalej.'
error.storageBlocked = 'Ta przeglądarka nie pozwala nic zapisać (tryb prywatny albo zablokowane dane witryn). Pomiar działa, ale historia zniknie po zamknięciu karty.'
error.noSecure       = 'Kamera działa tylko na połączeniu HTTPS. Otwórz aplikację przez adres zaczynający się od „https://”.'
error.exportEmpty    = 'Nie ma czego zapisać — historia jest pusta.'
error.unknown        = 'Nie udało się wykonać tej czynności. Spróbuj jeszcze raz.'
```

### 7.9 Stany puste — `UI.T.empty`

Rejestrator, raporty, porównanie, eksport, alerty i harmonogram mają gotowe zdania
w `Scale.TEXT.empty`. Nowe są tylko te:

```
empty.measureTitle   = 'Kamera jeszcze nie pracuje'
empty.measureText    = 'Naciśnij „Start pomiaru”, skieruj telefon na oświetloną powierzchnię i przytrzymaj go nieruchomo przez kilka sekund.'
empty.measureKey     = 'Start pomiaru'
empty.historyTitle   = 'Historia jest pusta'
empty.historyText    = 'Historia zapisuje się w trakcie pomiaru. Uruchom pomiar na minutę i wróć tutaj.'
empty.historyKey     = 'Przejdź do pomiaru'
empty.sessionsTitle  = 'Nie ma jeszcze żadnej sesji'
empty.sessionsText   = 'Sesja powstaje między naciśnięciem „Start pomiaru” a „Zatrzymaj”.'
empty.searchTitle    = 'Nic tu nie ma'
empty.searchText     = 'W wybranym zakresie nie było pomiaru. Wybierz szerszy zakres.'
```

### 7.10 Potwierdzenia i drobne komunikaty — `UI.T.confirm` i `UI.T.toast`

```
confirm.yes            = 'Tak'
confirm.no             = 'Nie'
confirm.cancel         = 'Anuluj'
confirm.close          = 'Zamknij'
confirm.save           = 'Zapisz'
confirm.reset          = 'Przywróć domyślne'
confirm.delete         = 'Usuń'
confirm.clearHistory   = 'Wyczyścić całą historię pomiarów? Tego nie da się cofnąć.'
confirm.clearHistoryKey= 'Wyczyść'
confirm.resetSettings  = 'Przywrócić wszystkie ustawienia do stanu początkowego? Historia pomiarów zostanie nietknięta.'
confirm.leaveSheet     = 'Zamknąć bez zapisania zmian?'

toast.saved            = 'Zapisano.'
toast.copied           = 'Skopiowano do schowka.'
toast.exported         = 'Zapisano plik {name}.'
toast.themeChanged     = 'Zmieniono motyw.'
toast.accentChangedTpl = 'Kolor aplikacji: {name}.'
toast.leadChangedTpl   = 'Na wskaźniku: {name}.'
toast.offline          = 'Brak sieci nic tu nie zmienia — aplikacja i tak z niej nie korzysta.'
toast.undo             = 'Cofnij'
```

Komunikaty o zapisaniu progów, wyczyszczeniu historii, zakończeniu pomiaru i nowej wersji
aplikacji bierzemy ze `Scale.TEXT.transient` — nie dublujemy ich tutaj.

### 7.11 Dostępne nazwy dla czytnika ekranu — `UI.T.aria`

```
aria.tabbar          = 'Nawigacja główna'
aria.viewTpl         = 'Ekran: {name}'
aria.sheetTpl        = 'Okno: {name}'
aria.closeSheet      = 'Zamknij okno'
aria.gaugeTpl        = '{name}: {value}, {zone}.'
aria.tileTpl         = '{name}, {value}, {zone}. Dotknij, aby pokazać na wskaźniku.'
aria.swatchTpl       = 'Kolor aplikacji: {name}'
aria.themeTpl        = 'Motyw: {name}'
aria.rangeTpl        = 'Zakres: {name}'
aria.expandPreview   = 'Rozwiń podgląd kamery'
aria.collapsePreview = 'Zwiń podgląd kamery'
```

Zdania mówione o wartościach i strefach buduje `Scale.spoken`, `Scale.spokenZone`,
`Scale.announceLead`, `Scale.announceReady` i `Scale.announceStopped`. Nie piszemy własnych.
### 7.12 Teksty dopisane przez autorów ekranów

Dopisał: autor `screen-support.js`. Klucze wchodzą do `UI.T` w istniejącą gałąź
`support` (rozdziały 7.5–7.6) — to jej dalszy ciąg, nie nowa gałąź.

Po przejściu na model darowiznowy nie ma tu już nic do dopisania: wszystkie klucze,
które ten ekran woła, stoją w rozdziałach 7.5 i 7.6, a dwie dawne gałęzie od konta
i od ekranu oferty przestały istnieć (rozdział 7.7).

---


## 8. Ruch, dostępność, wydajność

### 8.1 Ruch

Trzy czasy i jedna krzywa. Nic poza tym nie istnieje.

| co | czas | co się zmienia |
|---|---|---|
| stan przycisku, chipa, przełącznika, kciuka segmentów | `--dur-fast` (120 ms) | `transform`, `background-color`, `box-shadow`, `opacity` |
| wejście widoku, zmiana karty, rozwinięcie podglądu kamery, toast | `--dur` (200 ms) | `opacity`, `transform: translateY()` |
| arkusz, okno dialogowe, ekran sukcesu | `--dur-slow` (320 ms) | `transform: translateY()` / `scale()`, `opacity` |

Reguły twarde:

* Animujemy WYŁĄCZNIE `transform` i `opacity` — plus `background-color`, `border-color`
  i `box-shadow` w stanach interaktywnych. Nigdy `width`, `height`, `top`, `left`, `margin`.
  Jedyny wyjątek: `ms4-tile__bar-fill` animuje `width` liniowo przez `--dur-fast`,
  bo pasek 4 px nie ma jak zrobić tego przez `transform` bez rozmycia krawędzi.
* Igła wskaźnika obraca się przez `transform: rotate()` na grupie SVG, z przejściem
  `--dur-fast linear`. Przy 5 Hz kolejna próbka nadchodzi co 200 ms, więc przejście
  120 ms daje płynność bez opóźnienia widocznego jako „ociąganie się”.
* Wielka liczba we wskaźniku NIE ma przejścia. Animowana cyfra jest nieczytelna.
* Nic nie miga, nic nie pulsuje częściej niż raz na 2 s (kropka „Na żywo” i kropka stanu
  silnika — jedyne dwa pulsujące elementy w aplikacji).
* `data-motion="reduced"` oraz `prefers-reduced-motion: reduce`:
  wszystkie czasy → 1 ms, znika `transform` z wejść (zostaje samo `opacity`),
  znika obrót spinnera (zostaje pulsowanie krycia), znika animacja szkieletu ładowania,
  znika puls kropek. Igła nadal się obraca — to nie ozdoba, to odczyt.
* Arkusz na telefonie wjeżdża od dołu, na desktopie pojawia się skalowaniem od 0,96.
  To jedyna różnica w ruchu między układami.

### 8.2 Dostępność

* **Cel dotyku ≥ 44×44 px.** Dotyczy też kafelka wielkości, próbki palety, przycisku
  darowizny i przycisku zamykania arkusza. Jeśli element wizualnie jest mniejszy, powiększa go
  przezroczysty `padding` albo `::after` z `position: absolute; inset: -Xpx`.
* **Kontrast ≥ 4,5:1** dla tekstu, **≥ 3:1** dla dużego tekstu (≥ 24 px lub ≥ 19 px pogrubiony)
  i dla krawędzi niosących znaczenie. Wszystkie wartości policzone w rozdziale 2.
  `--c-border` (1,30:1 / 1,35:1) jest dekoracją i nie wolno nim oznaczać stanu.
* **Kolor nigdy sam.** Strefa = kolor + słowo + kształt (`ms4-stamp__shape`).
  Stan wybrania = kolor + krawędź + ikona `check`.
* **Fokus.** `:focus-visible` → `outline: 2px solid var(--c-focus); outline-offset: 2px`.
  Nigdy `outline: none` bez zamiennika. Kolejność tabulacji zgodna z kolejnością w DOM.
* **Arkusze i okna.** `role="dialog"`, `aria-modal="true"`, `aria-labelledby` wskazujące
  tytuł. Pułapka fokusu wewnątrz (Tab i Shift+Tab krążą po elementach arkusza).
  `Escape` zamyka. Po zamknięciu fokus wraca na element, który arkusz otworzył.
  `UI.lockScroll(true)` przy otwarciu, `false` przy zamknięciu ostatniej warstwy.
* **Nawigacja.** `ms4-tabbar` i `ms4-sidenav` to `role="tablist"` z `role="tab"`
  i `aria-selected` na pozycjach; widok to `role="tabpanel"` z `aria-labelledby`.
  Strzałki lewo/prawo (dolna) i góra/dół (boczna) przechodzą między zakładkami.
* **Klawiatura.** Segmenty: strzałki zmieniają wybór, Home/End skaczą na skraje.
  Suwak: strzałki ±krok, PageUp/PageDown ±10 kroków, Home/End skraje.
  Przełącznik: Spacja i Enter. Kafelek: Enter i Spacja (to `<button>`, nie `<div>`).
* **Żywy komunikat.** Jeden `#live` (`role="status"`, `aria-live="polite"`) na całą aplikację.
  `UI.announce(text)` pisze do niego, z dławieniem: nie częściej niż raz na 2 s.
  Nigdy nie ogłaszamy każdej próbki — tylko: start, koniec pomiaru, zmiana kanału wiodącego,
  gotowość oceny po rozgrzewce, przekroczenie progu i wynik akcji użytkownika.
* **Tekst do 200%.** Przy `--text-scale: 1.3` plus powiększeniu przeglądarki układ ma
  się zwijać do jednej kolumny i nic nie może zostać przycięte. Zakaz `height` na czymkolwiek,
  co zawiera tekst — wyłącznie `min-height`.
* **Ruch i migotanie.** Nic nie miga w zakresie 3–55 Hz. Puls kropki to 0,5 Hz.
* **Język.** `<html lang="pl">`. Każdy `<svg>` ozdobny ma `aria-hidden="true"`;
  każdy niosący znaczenie ma `role="img"` i `<title>`.

### 8.3 Wydajność — co wolno w pętli 5 Hz

`engine:sample` przychodzi co 200 ms. Handler ma **budżet 4 ms**. W handlerze WOLNO:

* przypisać `node.textContent = '...'` istniejącemu węzłowi;
* ustawić atrybut `transform`, `d`, `stroke`, `x`/`y`, `stroke-dashoffset`
  na istniejącym elemencie SVG;
* zmienić `style.width` / `style.transform` istniejącego elementu;
* dodać lub zdjąć klasę z listy: `is-good`, `is-warn`, `is-crit`, `is-stale`
  (i tylko wtedy, gdy strefa faktycznie się zmieniła — porównaj z zapamiętaną wartością).

W handlerze **NIE WOLNO**:

* `innerHTML`, `createElement`, `appendChild`, `removeChild`, `insertAdjacentHTML`;
* `getBoundingClientRect`, `offsetWidth`, `getComputedStyle` — każde z nich wymusza
  przeliczenie układu i zabija budżet;
* `localStorage`, `JSON.parse`, `JSON.stringify`;
* `Scale.bands()`, `Scale.ticks()` — to funkcje budowy, nie odczytu; wołane przy zmianie
  kanału wiodącego i na `engine:thresholds`, nigdy przy próbce;
* `UI.announce()`, `UI.toast()`;
* budowania nowych zdań przez konkatenację w pętli po siedmiu wielkościach — tekst werdyktu
  bierzemy z `Scale.verdict()` raz, i tylko jeśli zdanie się zmieniło.

Dodatkowo:

* **Jedna klatka na próbkę.** Każdy moduł rysujący gromadzi ostatnią próbkę w zmiennej
  i przerysowuje w jednym `requestAnimationFrame`. Dwie próbki, które trafiły w tę samą
  klatkę, dają jedno rysowanie.
* **Histereza werdyktu: 4 s.** Zdanie pod wskaźnikiem zmienia się dopiero wtedy, gdy nowa
  strefa utrzymała się przez 4 sekundy (20 próbek). Bez tego zdanie skacze przy każdym
  drgnięciu ekspozycji i wygląda na zepsute. Kolor i liczba zmieniają się od razu.
* **Rozgrzewka: 3 s.** Przez pierwsze 3 sekundy po starcie zamiast werdyktu stoi
  `Scale.TEXT.verdict.warmup`, a plakietka pokazuje `Scale.TEXT.stamp.settling`.
* **Zegar sesji** to osobny `setInterval(1000)`, nie `engine:sample`.
* **Wykresy historii** rysują się na wejście w widok, na `engine:history` i na zmianę
  zakresu — nigdy przy próbce. Wyjątek: zakres „1 min” dorysowuje ostatni punkt co 1 s.
* **Widok nieaktywny nic nie robi.** `leave()` odpina KAŻDY nasłuch magistrali
  (funkcje `off` zwrócone przez `Bus.on`) i kasuje timery. Czterech widoków słuchających
  próbek naraz nie ma prawa być.
* **Kafelki** aktualizują się wszystkie siedem przy każdej próbce, ale jeden kafelek
  to trzy zapisy: liczba, szerokość paska i ewentualna klasa strefy. Mikrowykres
  przerysowuje się co piątą próbkę (raz na sekundę) — tyle wystarczy przy 28 px wysokości.

### 8.4 Trwałość

| klucz | właściciel | zawartość |
|---|---|---|
| `ms4.settings.v1` | `store.js` | `{theme, accent, textScale, motion, haptics, leadMetric, onboarded, cameraFacing}` |
| `ms4.account.v1`, `ms4.entitlement.v1` | — | klucze po dawnym koncie i dawnym uprawnieniu. Nikt ich już nie zapisuje; `app.js` kasuje je raz, przy starcie (`dropStaleKeys`), żeby nie zostawały w niczyjej przeglądarce |
| `ms2.history.v1`, `ms2.thresholds.v1`, `ms2.session.v1`, `ms2.calibration.v1` | `engine.js` | NIE DOTYKAĆ — klucze z wersji 2, celowo wspólne, żeby historia przeżyła przejście na v4 |

Każdy zapis w `try/catch`. Brak pamięci (tryb prywatny) nie może wywrócić aplikacji:
ustawienia działają wtedy z pamięci procesu i znikają po zamknięciu karty, a użytkownik
dostaje `UI.T.error.storageBlocked` raz na sesję, nie przy każdym zapisie.

### 8.5 Odbiór — lista kontrolna

1. `node --check` przechodzi na każdym pliku `.js`.
2. Wyłączona sieć: aplikacja startuje, mierzy i rysuje wszystko.
3. `grep -n "#[0-9A-Fa-f]\{6\}" *.css` daje trafienia tylko w `tokens.css`
   oraz w jednym udokumentowanym miejscu (`ms4-themepick__preview`).
3a. Grep po całym katalogu wersji za słowami dawnego modelu płatnego (nazwa pakietu,
   nazwa cyklicznej opłaty, ścianka oferty, wezwanie do logowania) daje zero trafień —
   także w tym dokumencie.
4. `grep` po polskich znakach w `screen-*.js`, `app.js`, `ui.js` (poza `UI.T`) — zero trafień.
5. Każda z sześciu palet w obu motywach: tekst czytelny, przycisk główny czytelny,
   strefy odróżnialne od akcentu.
6. Tekst 200% + `--text-scale: 1.3`: nic nie ucięte, nic nie nachodzi.
7. Tabulacja przez cały ekran pomiaru: każdy element ma widoczny fokus, kolejność logiczna.
8. Arkusz: Escape zamyka, fokus wraca, tło się nie przewija.
9. Pomiar 10 minut: brak wzrostu zużycia pamięci, brak spadku płynności.
10. Nigdzie nie ma pola na numer karty i nigdzie nie ma cudzego pliku logo.
11. Nota „Czym ten pomiar nie jest” jest widoczna na ekranie POMIAR bez rozwijania czegokolwiek.

---

## 9. Dopisane klasy

Ta sekcja jest pusta z założenia i wypełniają ją autorzy w trakcie pisania kodu.

**Instrukcja.** Jeśli podczas pisania swojego pliku potrzebujesz klasy CSS, której nie ma
w rozdziale 5 — NIE wymyślaj jej po cichu i NIE używaj klasy z sąsiedniego bloku „bo pasuje”.
Dopisz do tabeli poniżej jeden wiersz:

`| nazwa klasy | twój plik | do czego | jak ma wyglądać (jedno zdanie: tło, promień, odstępy, typografia) |`

Nazwa musi trzymać konwencję `ms4-blok__element--modyfikator`. Stan zapisuj przez
`is-*`, nie przez nowy modyfikator. Jeśli twoja klasa jest wariantem czegoś, co już
istnieje, dopisz modyfikator do istniejącego bloku, a nie nowy blok.

Autorzy `components.css` i `screens.css` czytają tę tabelę przed każdym zapisaniem
swojego pliku i rysują wszystko, co w niej stoi. Wiersz bez opisu wyglądu jest wierszem
nieważnym — zostanie narysowany jako nic.

| klasa | plik | do czego | jak wygląda |
|---|---|---|---|
| `ms4-support__ask` | `screen-support.js` | kolumna z prośbą o wsparcie | `ms4-stack`; od 1024 px `grid-area: ask`, `position: sticky` pod górną belką |
| `ms4-support__settings` | `screen-support.js` | kolumna ustawień | `ms4-stack`; od 1024 px `grid-area: settings` |
| `ms4-support__action` | `screen-support.js` | karta z przyciskiem darowizny | `ms4-card`, `text-align: left`; wewnątrz `.ms4-row-inline` łamie się (`flex-wrap: wrap`, `gap: var(--s-2)`) |
| `a.ms4-btn` | `screen-support.js` | odnośnik udający przycisk | `text-decoration: none`; geometria zwykłego `ms4-btn` |
| `ms4-themepick__label` | `screen-support.js` | nazwa motywu pod miniaturą | `--t-caption`, `--c-text-2`, `text-align: center`, `margin-top: var(--s-1)` |
| `ms4-themepick__preview--light` | `screen-support.js` | miniatura motywu jasnego | prostokąt `#F4F6F9` z mniejszym prostokątem `#FFFFFF` w środku (jedyny dopuszczony wyjątek od zakazu hexów poza `tokens.css` i planszami testu ekranu) |
| `ms4-themepick__preview--dark` | `screen-support.js` | miniatura motywu ciemnego | to samo w `#0E1116` i `#171B22` |
| `ms4-themepick__preview--system` | `screen-support.js` | miniatura motywu systemowego | przekątny podział obu miniatur, granica pod kątem 45° |
| `ms4-measure__error` | `screen-measure.js` | blok błędu kamery wsuwany nad treść ekranu POMIAR (nie okno modalne) | `ms4-note--warning` na całą szerokość treści, `--r-md`, `margin-bottom: var(--s-1)`; wjeżdża `translateY(-8px)→0` + `opacity 0→1` przez `--dur`, znika przez `is-hidden` |
| `ms4-note__body` | `screen-measure.js` | kolumna treści noty obok ikony | `display: flex; flex-direction: column; gap: var(--s-1); min-width: 0; flex: 1 1 auto` |
| `ms4-note__action` | `screen-measure.js` | pasek przycisku wewnątrz noty | `display: flex; gap: var(--s-2); margin-top: var(--s-2); flex-wrap: wrap` |
| `ms4-hero__warmup` | `screen-measure.js` | pasek rozgrzewania przez pierwsze 3 s pomiaru | tor wysokości 4 px, `--r-pill`, tło `--c-surface-3`, `overflow: hidden`, `max-width: 220px`; na telefonie `margin-inline: auto`, od 1024 px do lewej |
| `ms4-hero__warmup-fill` | `screen-measure.js` | wypełnienie paska rozgrzewania | wysokość 4 px, `--r-pill`, tło `--c-accent`, szerokość ustawiana z JS przez `style.width`, przejście `width var(--dur-fast) linear` |
| `ms4-stamp__word` | `screen-measure.js` | słowo strefy w plakietce (`Scale.stamp().wordPL`) | `--t-label`, `--fw-bold`, kolor dziedziczony z `ms4-stamp`, `white-space: nowrap` |
| `ms4-camera__title` | `screen-measure.js` | tytuł „Podgląd kontrolny” w pasku karty kamery | `--t-body-sm`, `--fw-bold`, `--c-text`, `margin-right: auto` |
| `ms4-camera__expand` | `screen-measure.js` | przycisk pełnoekranowego powiększenia podglądu | `ms4-btn--icon --ghost --sm` z ikoną `expand`, stoi po lewej od `ms4-camera__toggle` |
| `ms4-camera__hint` | `screen-measure.js` | zdanie o tym, co pokazuje celownik | `--t-caption`, `--c-text-3`, `padding: var(--s-2) var(--s-4) var(--s-3)`, `line-height: var(--lh-body)`; przy `ms4-camera.is-collapsed` znika razem z ramką |
| `ms4-tile__icon` | `screen-measure.js` | ikona wielkości w nagłówku kafelka | 18×18 px, `--c-text-3`, `flex: 0 0 auto` |
| `ms4-tile__valuerow` | `screen-measure.js` | wiersz liczby kafelka (`≈` + liczba + jednostka) | `display: flex; align-items: baseline; gap: 0; min-width: 0` |
| `ms4-tile.is-good` `.is-warn` `.is-crit` | `screen-measure.js` | strefa kafelka; jedyna klasa zmieniana w pętli 5 Hz (SPEC 8.3) | steruje kolorem potomków: `.ms4-tile__spark { color: var(--c-good) / var(--c-warn) / var(--c-crit) }` i `.ms4-tile__bar-fill { background: ten sam kolor }`; tło samego kafelka zostaje `--c-surface` |
| `ms4-measure__aim` | `screen-measure.js` | wnętrze pełnoekranowego powiększenia podglądu | kolumna `gap: var(--s-3)`; `ms4-camera__stage` w środku dostaje `aspect-ratio: auto`, `max-height: 62dvh`, `--r-lg`, `overflow: hidden` |
| `ms4-measure__aimsheet` | `screen-measure.js` | arkusz `ms4-sheet--full` z powiększonym podglądem | tło `--c-surface`, treść wyśrodkowana w pionie, `padding-bottom: calc(var(--s-5) + env(safe-area-inset-bottom))` |
| `ms4-card__titles` | `screen-history.js` | kolumna tytułu i podtytułu w nagłówku karty | `display: flex; flex-direction: column; gap: 2px; min-width: 0; margin-right: auto`, bez tła i krawędzi — istnieje tylko po to, żeby `ms4-card__title` i `ms4-card__subtitle` stały jeden pod drugim, gdy `ms4-card__header` jest wierszem z przyciskami po prawej |
| `ms4-zonebar__seg--good` `--warn` `--crit` | `screen-history.js` | ton odcinka paska rozkładu stref | tło `--c-good` / `--c-warn` / `--c-crit`, bez krawędzi i bez własnego promienia (promień daje `ms4-zonebar`); szerokość w procentach ustawia JS |
| `ms4-session__avg--good` `--warn` `--crit` | `screen-history.js` | kolor średniej w wierszu sesji | `color: var(--c-good)` / `var(--c-warn)` / `var(--c-crit)`; reszta wyglądu jak `ms4-session__avg`; bez modyfikatora zostaje `--c-text-2` |
| `ms4-coverage__seg` | `screen-history.js` | jedna godzinna kratka paska „Pokrycie doby” | `flex: 1 1 0; height: 8px`, tło `--c-surface-3`, `--r-xs` na skrajnych, 2 px odstępu między kratkami; ze stanem `is-active` (godzina z pomiarem) tło `--c-accent` |
| `ms4-coverage__caption` | `screen-history.js` | podpis pod paskiem pokrycia doby | `--t-caption`, `--c-text-3`, `margin-top: var(--s-2)`, `line-height: var(--lh-body)` |
| `ms4-topbar__dot--run` | `app.js` | kropka stanu „uruchamiam” i „trwa pomiar” w pigułce `ms4-topbar__status` | 8×8 px koło w `--c-accent` z pulsem krycia 0,45 ↔ 1 co 2 s; przy `data-motion="reduced"` puls znika, kolor zostaje (wariant zapowiedziany w 5.B, tu nazwany wprost obok `--idle`, `--good`, `--warn`, `--crit`) |
| `ms4-noscript` | `index.html` | komunikat dla przeglądarki z wyłączonym JavaScriptem | jak `ms4-note--warning`: tło `--c-warn-soft`, tekst `--c-warn`, `--r-md`, `padding: var(--s-4)`, `margin: var(--s-4) auto`, `max-width: 46ch`; w środku `ms4-note__title` i `ms4-note__text`; widoczny wyłącznie wewnątrz `<noscript>`, więc nigdy nie zderza się z powłoką |
| `ms4-gauge--linear` | `gauge.js` | degradacja wskaźnika w bardzo niskim albo bardzo szerokim kontenerze (`height < 150px` lub `width/height > 2,1`): zamiast koła 270° rysuje się poziomy pasek z tą samą liczbą | modyfikator na `ms4-gauge`: bez `aspect-ratio`, `width: 100%`, `min-height: 72px`, `margin-inline: 0`; w środku `ms4-gauge__value` schodzi do `--t-h1`, a `ms4-gauge__name` i `ms4-gauge__unit` są ukrywane z JS (jednostka dokleja się wtedy do liczby) |
| `ms4-gauge.is-good` `.is-warn` `.is-crit` | `gauge.js` | strefa bieżącego odczytu na korzeniu wskaźnika; zdejmowana i zakładana wyłącznie przy faktycznej zmianie strefy (SPEC 8.3) | NIE zmienia koloru wielkiej liczby — ta zostaje `--c-text`; wolno jej najwyżej dać `ms4-gauge__cap` obwódkę `stroke: var(--c-good)` / `--c-warn` / `--c-crit`; brak reguły też jest poprawny, bo strefę niesie już plakietka `ms4-stamp` |
| `ms4-tape__svg` | `gauge.js` | rysunek wewnątrz kontenera `ms4-tape` | `display: block; width: 100%; height: 100%; overflow: visible`; dodatkowo `touch-action: none`, żeby przeciąganie krzyża odczytu palcem nie przewijało strony |
| `ms4-tape__band` | `gauge.js` | obwiednia min–maks tam, gdzie jedna kolumna wykresu to wiele próbek (24 godz, 7 i 30 dni) | `fill: var(--c-accent); opacity: .16; stroke: none` — pokazuje rozrzut, którego zagregowana linia średniej już nie niesie |
| `ms4-tape__readout` | `gauge.js` | pigułka odczytu nad krzyżem: godzina i wartość punktu pod wskaźnikiem | grupa SVG: `rect` z `fill: var(--c-surface)`, `stroke: var(--c-border)`, `rx: 8`, cień `--e-1`; `text` w `--t-caption`, `--font-num`, `--c-text`; wysokość ok. dwóch rozmiarów tekstu |
| `ms4-tape__empty` | `gauge.js` | stan pusty wykresu historii (treść: `Scale.TEXT.empty.recorderNoRange`) | `position: absolute; inset: 0; display: grid; place-items: center; padding: var(--s-4)`; `--t-body-sm`, `--c-text-2`, `text-align: center`, `max-width: 34ch`, `margin-inline: auto`; wymaga `position: relative` na `ms4-tape` |
| `ms4-bars__svg` | `gauge.js` | rysunek wewnątrz kontenera `ms4-bars` | `display: block; width: 100%; height: 100%; overflow: visible` |
| `ms4-bars__empty` | `gauge.js` | stan pusty panoramy słupków (treść: `Scale.TEXT.empty.recorderNoRange`) | identycznie jak `ms4-tape__empty`; wymaga `position: relative` na `ms4-bars` |
| `ms4-note__body` | `screen-tools.js` | kolumna tekstu noty obok ikony | `min-width: 0; flex: 1 1 auto`, kolumna z `gap: 2px`; nie maluje własnego tła ani koloru — dziedziczy je z `ms4-note--*` |
| `ms4-table` | `screen-tools.js` | tabela w arkuszu narzędzia (wzmocnienia kalibracji, zestawienie raportu, opis kolumn eksportu, różnice sesji, dane wielkości w dokumentacji) | `width: 100%; border-collapse: collapse`, `--t-body-sm`; `th` w wersalikach `--t-caption` `--c-text-3` z dolną krawędzią `--c-border-strong`; `td` `padding: 10px var(--s-3)` z dolną krawędzią `--c-border`; `th[scope=row]` do lewej, `--fw-med`, `--c-text`; komórka z `ms4-num` do prawej; ostatni wiersz bez krawędzi; zawsze stoi wewnątrz `ms4-scroll-x` |
| `ms4-steps` | `screen-tools.js` | lista „krok po kroku” (kalibracja, test ekranu) | `list-style: none; margin: 0; padding: 0`, kolumna `gap: var(--s-3)`, `counter-reset` licznika kroków |
| `ms4-steps__item` | `screen-tools.js` | jeden krok | `position: relative; padding-left: var(--s-7)`, `--t-body`, `line-height: var(--lh-body)`; przed treścią numer z licznika w kole 28 px, tło `--c-accent-soft`, tekst `--c-accent-ink`, `--t-label`, `--fw-bold` |
| `ms4-select` | `screen-tools.js` | natywne `<select>` (wybór sesji A i B w porównaniu) | wygląd jak `ms4-field`: wysokość `--tap`, `--r-md`, tło `--c-surface-2`, krawędź `1px solid var(--c-border-strong)`, `padding-inline: var(--s-3)`, `--t-body`, `--c-text`, `width: 100%`; `:focus-visible` → obrys fokusu; strzałkę zostaw natywną, nie doklejaj obrazka |
| `ms4-tool__chevron` | `screen-tools.js` | strzałka wejścia na kafelku narzędzia | ikona 20 px w `--c-text-3`, `position: absolute; top: var(--s-4); right: var(--s-4)`; przy `:hover` kafelka przesuwa się o 2 px w prawo (wymaga `position: relative` na `ms4-tool`) |
| `ms4-miniscale` | `screen-tools.js` | podgląd skali pod parą suwaków progu | `position: relative; height: 44px; width: 100%`, `--r-sm`, tło `--c-surface-2`, `overflow: hidden` |
| `ms4-miniscale__bands` | `screen-tools.js` | warstwa pasów stref | `position: absolute; left: 0; right: 0; top: 0; height: 14px` |
| `ms4-miniscale__band` | `screen-tools.js` | jeden pas strefy; `left` i `width` w procentach ustawia JS | `position: absolute; top: 0; bottom: 0`, tło koloru strefy z kryciem 0,9; warianty `--good`, `--warn`, `--crit` |
| `ms4-miniscale__ticks` | `screen-tools.js` | warstwa kresek podziałki | `position: absolute; left: 0; right: 0; top: 14px; height: 8px` |
| `ms4-miniscale__tick` | `screen-tools.js` | jedna kreska podziałki | `position: absolute; top: 0; bottom: 0; width: 1px`, tło `--c-border-strong`, `transform: translateX(-0.5px)` |
| `ms4-miniscale__labels` | `screen-tools.js` | warstwa podpisów podziałki | `position: absolute; left: 0; right: 0; bottom: 2px; height: 16px` |
| `ms4-miniscale__label` | `screen-tools.js` | liczba przy kresce | `position: absolute; transform: translateX(-50%)`, `--t-caption`, `--font-num`, `--c-text-3`, `white-space: nowrap` |
| `ms4-miniscale__needle` | `screen-tools.js` | igła bieżącego odczytu; `left` w procentach ustawia JS raz na sekundę | `position: absolute; top: 0; height: 22px; width: 2px`, tło `--c-text`, `--r-pill`, `transform: translateX(-1px)`; z atrybutem `hidden` znika |
| `ms4-plate` | `screen-tools.js` | pełnoekranowa plansza testu ekranu | `position: fixed; inset: 0; z-index: calc(var(--z-dialog) + 1)`, bez promieni i marginesów; jedyne miejsce w aplikacji z barwą bezwzględną — plansza sprawdza monitor, więc nie może zależeć od motywu ani palety |
| `ms4-plate--white` `--gray75` `--gray50` `--gray25` `--black` `--red` `--green` `--blue` | `screen-tools.js` | wypełnienie planszy | dokładnie te barwy i żadne inne: `#FFFFFF`, `#BFBFBF`, `#808080`, `#404040`, `#000000`, `#FF0000`, `#00FF00`, `#0000FF` — udokumentowany trzeci wyjątek od zakazu barw spoza `tokens.css`; bez niego test ekranu niczego nie testuje |
| `ms4-plate--grid` | `screen-tools.js` | plansza z siatką | tło `#000000`, na nim biała siatka `#FFFFFF`: linie 1 px co 32 px w obu osiach (`repeating-linear-gradient`) |
| `ms4-plate__bar` | `screen-tools.js` | pasek sterowania planszą | `position: absolute; left: 0; right: 0; bottom: 0`, wiersz `gap: var(--s-2)`, `flex-wrap: wrap`, `align-items: center`, `padding: var(--s-3) var(--s-4) calc(var(--s-3) + env(safe-area-inset-bottom))`, tło `--c-surface`, górna krawędź `--c-border`, cień `--e-3`; zawsze nieprzezroczysty i zawsze widoczny — to jedyne wyjście z planszy |
| `ms4-plate__count` | `screen-tools.js` | numer planszy („Plansza 3 z 9”) | `--t-label`, `--fw-bold`, `--font-num`, `--c-text-2`, `white-space: nowrap` |
| `ms4-plate__hint` | `screen-tools.js` | nazwa planszy i zdanie „czego szukać” | `--t-body-sm`, `--c-text-2`, `line-height: var(--lh-body)`, `flex: 1 1 100%`; od 600 px w tym samym wierszu co przyciski (`flex: 1 1 auto`) |
| `ms4-sheet__titles` | `ui.js` | kolumna tytułu i podtytułu w nagłówku arkusza | `display: flex; flex-direction: column; gap: 2px; min-width: 0; margin-right: auto`, bez tła i krawędzi — trzyma `ms4-sheet__title` nad `ms4-sheet__subtitle`, gdy `ms4-sheet__header` jest wierszem z przyciskiem zamknięcia po prawej |
| `ms4-row__check` | `ui.js` | znacznik wyboru po prawej stronie wiersza listy (arkusz kanału wiodącego, wybór wielkości, wybór zakresu) | ikona `check` 20 px w `--c-accent`, `flex: 0 0 auto`, `margin-left: var(--s-1)`; stoi w tym samym miejscu co `ms4-row__chevron` i nigdy z nim naraz |
| `ms4-badge__icon` | `ui.js` | ikona wewnątrz plakietki | 16×16 px, `flex: 0 0 auto`, `margin-right: 4px`, `currentColor` — dziedziczy kolor tonu plakietki i nie ma własnego tła |
| `ms4-segmented__icon` | `ui.js` | ikona wewnątrz segmentu | 20×20 px, `flex: 0 0 auto`, `margin-right: 6px`, `currentColor`; w segmencie bez etykiety marginesu nie ma |
---

## Załącznik A — kontrakty modułów w skrócie

Autor pisze SWÓJ plik pod ten podpis i woła CUDZE pliki wyłącznie przez te nazwy.
Nic więcej nie jest publiczne.

```
window.Store
  DEFAULTS, get() -> kopia, set(patch), reset(), apply(),
  ACCENTS -> [{id, namePL, swatch:[hexJasny, hexCiemny]}]   (6 wpisów, rozdział 2.4)
  THEMES  -> [{id:'system'|'light'|'dark', namePL}]
  emituje 'settings:changed' {settings};  klucz 'ms4.settings.v1'
  kształt: {theme, accent, textScale, motion, haptics, leadMetric, onboarded, cameraFacing}
  wartości domyślne: theme 'system', accent 'ocean', textScale 1, motion 'auto',
                     haptics true, leadMetric 'share', onboarded false, cameraFacing 'environment'

window.UI
  el(tag, className, text), frag(), clear(node), on(node, ev, fn)
  icon(name, size) -> <svg>,  ICONS -> [62 nazwy]
  card({title, subtitle, actions, className}) -> {root, body, header}
  button({label, variant, icon, onClick, size, full}) variant: primary|tonal|ghost|danger
  chip({label, icon, tone}), badge({label, tone})
  sheet({title, subtitle, size:'auto'|'full', body, actions, onClose}) -> {root, body, close()}
  dialog({title, text, confirm, cancel, tone}) -> Promise<boolean>
  toast(text, tone), announce(text)
  empty({icon, title, text, action}), section(titlePL, subtitle)
  row({icon, title, subtitle, value, onClick, chevron, control})
  segmented({options, value, onChange}), switch({label, checked, onChange})
  slider({label, min, max, step, value, onChange, format})
  lockScroll(bool), fmtDate(ts), fmtTime(ts), fmtDuration(ms)
  zoneTone(zone) -> 'good'|'warn'|'crit',  zoneLabel(zone)
  T -> słownik z rozdziału 7

window.Gauge
  arc(container, {metricId, thresholds})  -> {update(value, zone), setMetric(id, thr), destroy()}
  spark(container, {metricId})            -> {update(points), destroy()}      points=[{t, v}]
  tape(container, {metricId, thresholds}) -> {update(points), setRange(ms), destroy()}
  bars(container, {metricId, thresholds}) -> {update(buckets), destroy()}      buckets=[{t,avg,min,max,zone}]
  ring(container, {value, max})           -> {update(v), destroy()}

(Dwa dawne moduły — od konta i od płatności — nie istnieją: usunięto je razem z modelem
 płatnym. Ich zdarzenia magistrali nie są już ani emitowane, ani nasłuchiwane.)

window.App
  registerView({id, labelPL, icon, build(root), enter(params), leave(), desktopOnly})
  go(viewId, {params}), current(), back(), ready()
  emituje 'view:changed' {id};  na końcu startu Bus.emit('app:ready')
```

Zdarzenia magistrali, na których stoi cała aplikacja (emituje je `engine.js`):

```
engine:state       {state}                 idle | starting | running | error
engine:started     {startedAt, facingMode}
engine:stopped     {session}
engine:sample      {reading}               5 Hz — gorąca ścieżka, rozdział 8.3
engine:error       {code, messagePL}       PERMISSION | NOTFOUND | BUSY | UNKNOWN | UNSUPPORTED
engine:thresholds  {thresholds, source}
engine:calibration {calibration}
engine:history     {reason}
app:ready          {}                      lepki — Bus.once złapie go także po fakcie
settings:changed   {settings}              store.js
view:changed       {id}                    app.js
```

Kształt jednej próbki (`reading`), do którego odwołują się wszystkie ekrany:

```
{ t, r, g, b,
  values: {share, brightness, kelvin, melanopic, flicker, uniformity, comfort},
  zones:  { <id>: 'good' | 'warning' | 'critical' },
  extra:  { kelvinReliable, flickerHz, flickerWithinRange, comfortPenalties[], cells[] } }
```

Wszystkie siedem wielkości jest dostępnych dla każdego, bez warunków.
`Metrics.CATALOGUE` nie ma i nie ma mieć pola dzielącego je na dostępne i niedostępne —
kod ekranu nie ma czego sprawdzać przed pokazaniem liczby.

## Załącznik B — mapa ikon dla siedmiu wielkości

| wielkość | ikona | uwaga |
|---|---|---|
| `share` | `droplet` | wielkość wiodąca domyślnie |
| `brightness` | `sun` | |
| `kelvin` | `thermometer` | wartość przybliżona → kafelek pokazuje `≈` |
| `melanopic` | `moon` | wartość przybliżona → kafelek pokazuje `≈` |
| `flicker` | `waveform` | |
| `uniformity` | `grid` | |
| `comfort` | `eye` | w karcie sesji rysowany przez `Gauge.ring` |

Znak `≈` stawiamy przy `kelvin` i `melanopic` zawsze, a przy `kelvin` dodatkowo pokazujemy
`Scale.TEXT.note.kelvinOutOfRange`, gdy `reading.extra.kelvinReliable === false`.
Przy `flicker` pokazujemy `Scale.TEXT.note.flickerOutOfRange`, gdy
`reading.extra.flickerWithinRange === false`. To nie jest opcja — bez tych dwóch zdań
aplikacja podaje alias jako wynik.
