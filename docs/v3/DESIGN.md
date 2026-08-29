# Monitor Światła v3 — SPECYFIKACJA DESIGNU

**Kierunek: „PULPIT" — płyta czołowa przyrządu, która mówi po polsku.**

Status: wiążąca. Ten dokument rozstrzyga spory. Jeśli czegoś tu nie ma, obowiązują zasady
naczelne z rozdziału 1, a nie własne wyczucie.
Wersja 1.0 · katalog `docs/v3/` · odbiorca: osoba 65+ z osłabionym wzrokiem, telefon w ręce.

Komentarze w kodzie i nazwy zmiennych po angielsku. Cały interfejs po polsku, z diakrytykami.

---

## 0. Co jest nienaruszalne

v3 dzieli z v2 **dokładnie dwa pliki matematyki i obsługi kamery, ani linijki więcej**:

* `../shared/metrics.js` — cała matematyka. **NIE ZMIENIAMY.**
* `../shared/engine.js` — kamera, próbkowanie 5 Hz, bufor, historia, progi, kalibracja. **NIE ZMIENIAMY.**

Nie są to już kopie: to **jeden plik na trzy wersje**, leżący w `docs/shared/`
i wczytywany przez v2, v3 i v4 (opis w `docs/shared/README.md`). Service worker
v3 ma nadal zamknięty zestaw plików — po prostu jego `APP_SHELL` wymienia te
dwa adresy z `../shared/`, tak samo jak ikony z `../icons/`. „NIE ZMIENIAMY”
jest przez to twardsze niż wcześniej: jedna zmiana psuje albo naprawia trzy
wersje naraz.

Kontrakt, który v3 musi spełnić co do joty — sprawdzony w kodzie silnika:

| Rzecz | Wartość | Gdzie w `../shared/engine.js` |
|---|---|---|
| Wymagane węzły DOM | `#cameraVideo` (`<video>`), `#cameraPlaceholder`, `#cameraPlaceholderText` | `grabDom()` |
| Zdarzenia na `window.Bus` | `engine:sample {reading}`, `engine:state {state}`, `engine:started {startedAt,facingMode}`, `engine:stopped {session}`, `engine:error {code,messagePL}`, `engine:thresholds {thresholds,source}`, `engine:history {reason}`, `engine:calibration {calibration}` | `emit()` |
| Stany | `idle`, `starting`, `running`, `error` | `setState()` |
| Częstotliwość | `SAMPLE_MS = 200` → 5 Hz | stała |
| Bufor żywy | `LIVE_WINDOW_MS = 60000` — `Engine.buffer(ms)` nie sięgnie dalej niż 60 s | stała |
| Historia długa | `LONG_STEP_MS = 5000` (1 punkt / 5 s), `HISTORY_MAX = 15000`, okno 30 dni | stałe |
| Wycinek próbkowany | `CROP_FRACTION = 0.6` — środkowe **60% szerokości ORAZ 60% wysokości** klatki (prostokąt o proporcji klatki, nie kwadrat) | `takeSample()` |
| Wiarygodność migotania | `reading.extra.flickerWithinRange` | `buildReading()` |
| Wiarygodność kelwinów | `reading.extra.kelvinReliable` | `buildReading()` |
| Metryka wiodąca historii | `LEAD_ID = 'share'` — `point.zone` to **zawsze** strefa udziału niebieskiego | `pushLongPoint()` |

Cztery pułapki, na których wywróciły się koncepcje z panelu. Każdy z czterech programistów
ma je przeczytać, zanim napisze pierwszą linijkę:

1. Pole nazywa się `extra.flickerWithinRange`, a **nie** `flicker.withinRange`.
2. `Engine.history()` zwraca `zone`, ale to zawsze strefa `share`. Kolorując oś czasu innej
   metryki, liczymy strefę sami: `Metrics.zoneFor(p[id], t.warn, t.crit, m.invert)`.
3. `Engine.buffer()` nigdy nie sięgnie dalej niż 60 s. Zakresy powyżej minuty mają **jedyne**
   źródło: `Engine.history()` w rozdzielczości 5 s. Nie obiecujemy 200 ms poza minutą.
4. Kamera z `object-fit: cover` w kontenerze o innej proporcji niż strumień pokazuje inny wycinek,
   niż mierzy silnik. Rozwiązanie w 5.7: proporcję kontenera ustawiamy z `videoWidth/videoHeight`,
   wtedy celownik to dokładnie `inset: 20%`.

### 0.1 Katalog metryk (z `../shared/metrics.js` — nie przepisujemy go nigdzie w kodzie)

| # | id | namePL | unit | min | max | warn | crit | invert | decimals |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `share` | Udział niebieskiego | % | 0 | 60 | 26 | 33 | nie | 0 |
| 2 | `brightness` | Jasność sceny | % | 0 | 100 | 70 | 88 | nie | 0 |
| 3 | `kelvin` | Temperatura barwowa | K | 1500 | 9000 | 4600 | 6000 | nie | 0 |
| 4 | `melanopic` | Wpływ na rytm dobowy | × | 0 | 1,6 | 0,75 | 1,00 | nie | 2 |
| 5 | `flicker` | Migotanie | % | 0 | 60 | 8 | 20 | nie | 1 |
| 6 | `uniformity` | Równomierność | % | 0 | 100 | 60 | 35 | **tak** | 0 |
| 7 | `comfort` | Komfort wzrokowy | pkt | 0 | 100 | 70 | 45 | **tak** | 0 |

**Wszystkie siedem wielkości pokazuje liczby każdemu, od pierwszego uruchomienia.** Katalog nie ma
pola dzielącego je na dostępne i niedostępne i nigdy nie będzie go miał.

Kolejność w listwie kanałów = kolejność katalogu. Domyślny kanał główny = `share`.
Progi bierzemy **zawsze** z `Engine.getThresholds()`, nigdy z `Metrics.CATALOGUE` — użytkownik mógł
je przestawić. `min`, `max`, `invert`, `decimals`, `unit`, `namePL`, `shortPL`, `helpPL`
— z katalogu. Formatowanie liczby — **zawsze** `Metrics.formatValue(id, v)` (daje polski przecinek).

---

## 1. Zasady naczelne

1. **To jest przyrząd, który mówi po polsku.** Płyta czołowa daje liczbę i skalę; jedno zdanie
   zwykłą polszczyzną mówi, co ta liczba znaczy. Nigdy sama liczba (to onieśmiela osobę, dla której
   robimy tę aplikację) i nigdy samo zdanie (to udaje autorytet, którego kamera nie ma).
2. **Jedna liczba jest duża, sześć pozostałych jest obok.** Kanał główny ma odczyt 56–96 px i pełną
   skalę z podziałką. Sześć pozostałych to wiersze listwy z tą samą mikroskalą. Dotknięcie wiersza
   przerzuca kanał na wielki wyświetlacz — to nie jest nawigacja, ekran się nie zmienia.
3. **Jeden przyrząd w trzech rozmiarach.** Skala główna, mikroskala w wierszu i taśma rejestratora
   to ta sama konstrukcja: ta sama linia bazowa, te same pasma stref, ten sam trójkąt. Użytkownik
   uczy się czytać raz. Drugiego języka wykresu nie wprowadzamy pod żadnym pozorem.
4. **Nic nie skacze.** Cyfry nigdy nie animują wartości, pole liczby ma stałą szerokość znaków,
   werdykt zmienia się dopiero po 4 sekundach w nowej strefie, nic nie miga i nic nie pulsuje.
   Odświeżanie 5 razy na sekundę nie może zmuszać oka do gonienia liczby.
5. **Status nigdy samym kolorem.** Zawsze co najmniej barwa + kształt (● ▲ ■) + słowo. Na skali
   dochodzi czwarty nośnik: faktura pasma (gładkie / ukośne 6 px / krzyżowe 5 px). Wydruk
   czarno-biały i pełna deuteranopia nie odbierają ani jednej informacji.
6. **Każda granica jest realną linią.** Głębia bierze się z trzech poziomów tła (płyta → panel →
   studnia) i z linii o kontraście ≥3:1, nigdy z cienia. `box-shadow` z rozmyciem nie występuje
   w arkuszach stylów ani razu — przy powiększeniu 300% rozmyty cień czyta się jak brud.
7. **Pomiar jest ostatnim elementem układu.** Pulpit sterowania z klawiszem START/STOP jest ostatnim
   dzieckiem powłoki, `position: fixed`, z warstwą wyższą niż wszystko poza blokiem błędu. Żaden
   arkusz i żaden moduł nie może się nad nim wyrenderować — to właściwość układu
   wymuszona kolejnością w DOM, nie obietnica. Na dole każdego innego ekranu siedzi żywy pasek
   z bieżącym odczytem i klawiszem powrotu.
8. **Aplikacja mówi, czego nie wie.** Przy temperaturze barwowej i wpływie na rytm dobowy stoi znak
   „≈" — w pikselach i w nazwie dostępnej. Gdy `kelvinReliable` albo `flickerWithinRange` jest
   fałszywe, linia bazowa skali robi się kreskowana i pada słowo. Wielkość, której nie dało się
   zmierzyć, pokazuje „———", nigdy liczby zmyślonej ani rozmytej. Nigdzie nie pada słowo
   „diagnoza" inaczej niż w zdaniu, że jej nie stawiamy.

**Czego ten design nigdy nie robi:** nie rysuje pierścienia ani tarczy zegarowej; nie używa cienia
rzuconego; nie zaokrągla niczego powyżej 3 px; nie animuje cyfr; nie stawia dolnego paska zakładek;
nie schodzi z tekstem poniżej 15 px; nie zasłania klawisza STOP; nie ładuje niczego z sieci.

---

## 2. Tokeny — gotowe do wklejenia

Plik `tokens.css`. Pełny zestaw stoi na gołym `:root` (motyw jasny). Motyw ciemny nadpisuje
**wyłącznie barwy**, dwa razy: w media query i w `[data-theme="dark"]`. Żaden kolor nie istnieje
tylko wewnątrz media query. Oba motywy są pierwszorzędne — motyw jasny to nie „odwrócenie ciemnego",
tylko biała płyta czołowa z własnym grawerunkiem.

Kontrasty policzone algorytmem WCAG 2.x, nie oszacowane. Zapis „panel / płyta / studnia" =
kontrast na kolejnych trzech poziomach tła.

```css
/* tokens.css — the whole design system. Nothing below may be redefined elsewhere. */
:root {
  color-scheme: light dark;

  /* ---- surfaces (light theme = "white instrument faceplate") ---- */
  --ms3-plate:      #DCE0E6;   /* page background: the metal around the panel */
  --ms3-panel:      #FFFFFF;   /* raised panel */
  --ms3-well:       #F1F3F7;   /* recessed well: the readout lives here */
  --ms3-hairline:   #C7CDD5;   /* DECORATION ONLY, 1,60:1 — never carries meaning */
  --ms3-rule:       #6A7480;   /* every meaningful border: 4,75 / 3,58 / 4,27 */

  /* ---- ink ---- */
  --ms3-ink:        #0B0E13;   /* 19,33 / 14,59 / 17,40 */
  --ms3-ink-2:      #454E5A;   /*  8,43 /  6,36 /  7,59 */
  --ms3-ink-3:      #565F6B;   /*  6,47 /  4,88 /  5,83  — floor, only at 15 px and up */

  /* ---- signal ---- */
  --ms3-accent:     #0A6A85;   /*  6,15 /  4,64 /  5,54 */
  --ms3-on-accent:  #FFFFFF;   /*  6,15 on accent */
  --ms3-good:       #0A6B2E;   /*  6,66 /  5,02 /  5,99 */
  --ms3-warn:       #85480A;   /*  7,17 /  5,41 /  6,45 */
  --ms3-crit:       #B01F19;   /*  6,87 /  5,19 /  6,19 */
  --ms3-on-crit:    #FFFFFF;   /*  6,87 on crit */
  --ms3-focus:      #0B3FA8;   /*  9,17 /  6,92 /  8,25 */

  /* ---- zone band fills (behind the scale, never behind text) ---- */
  --ms3-fill-good:  rgba(10,107,46,.20);
  --ms3-fill-warn:  rgba(133,72,10,.20);
  --ms3-fill-crit:  rgba(176,31,25,.22);
  --ms3-hatch-a:    rgba(133,72,10,.55);   /* 45 deg stripes in the warning band */
  --ms3-hatch-b:    rgba(176,31,25,.55);   /* crossed stripes in the critical band */

  /* ---- engraving: the ONLY depth effect. Inset, never a drop shadow. ---- */
  --ms3-engrave-panel: inset 0 1px 0 rgba(255,255,255,.90), inset 0 -1px 0 rgba(11,14,19,.10);
  --ms3-engrave-well:  inset 0 1px 0 rgba(11,14,19,.10),  inset 0 -1px 0 rgba(255,255,255,.85);
  --ms3-shadow: none;          /* there is no drop shadow in this application */

  /* ---- type: system stack only. No web font. No monospace. ---- */
  --ms3-font: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  --ms3-t-readout:  clamp(56px, 17vw, 96px); /* the big number */
  --ms3-t-counter:  40px;   /* session clock 00:04:12 */
  --ms3-t-h1:       24px;   /* module title */
  --ms3-t-h2:       20px;   /* section title */
  --ms3-t-channel:  24px;   /* value in a channel row */
  --ms3-t-verdict:  20px;   /* the plain-Polish sentence */
  --ms3-t-body:     18px;   /* body text, line-height 1.55 */
  --ms3-t-name:     17px;   /* channel name, button labels */
  --ms3-t-legend:   15px;   /* engraved uppercase legends, tick numbers, units */
  /* 15 px is the absolute floor. Nothing smaller exists in this application. */
  --ms3-tracking-legend: .06em;   /* uppercase only; drops to 0 when "Duży tekst" is on */
  --ms3-lh-tight: 1.05;
  --ms3-lh-body:  1.55;

  /* ---- text-size setting (module 12) multiplies the whole scale ---- */
  --ms3-scale: 1;            /* 1 | 1.15 | 1.3 */

  /* ---- spacing: 4 px rhythm ---- */
  --ms3-s-1: 4px;  --ms3-s-2: 8px;  --ms3-s-3: 12px; --ms3-s-4: 16px;
  --ms3-s-5: 20px; --ms3-s-6: 24px; --ms3-s-7: 32px; --ms3-s-8: 40px;

  /* ---- fixed heights (chapter 4 does the budget arithmetic) ---- */
  --ms3-h-rail:    40px;   /* status rail */
  --ms3-h-desk:    80px;   /* control desk, plus safe area */
  --ms3-h-row:     56px;   /* channel row */
  --ms3-h-live:    56px;   /* live bar at the bottom of every module */
  --ms3-h-hero:    clamp(216px, 30vh, 268px);
  --ms3-h-monitor: 96px;   /* collapsed camera monitor, square */
  --ms3-tap:       48px;   /* absolute minimum touch target */

  /* ---- radii: flat instrument. Nothing is a pill. ---- */
  --ms3-r-panel: 2px;  --ms3-r-key: 3px;  --ms3-r-badge: 2px;

  /* ---- motion ---- */
  --ms3-dur-needle: 120ms;  /* linear, never springy: an instrument does not bounce */
  --ms3-dur-press:   90ms;
  --ms3-dur-camera: 200ms;
  --ms3-dur-screen: 160ms;
  --ms3-ease: linear;
  --ms3-ease-screen: cubic-bezier(.2,0,0,1);

  --ms3-z-sheet: 40; --ms3-z-desk: 50; --ms3-z-alert: 60;
}

/* ---- dark theme ("dark faceplate"). Colours only. Geometry never changes. ---- */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --ms3-plate: #0B0E13; --ms3-panel: #141922; --ms3-well: #0F141C;
    --ms3-hairline: #2C3542;                    /* 1,42:1, decoration */
    --ms3-rule: #606C7A;                        /* 3,29 / 3,61 / 3,45 */
    --ms3-ink: #EDF1F6;                         /* 15,53 / 17,04 / 16,28 */
    --ms3-ink-2: #A9B4C2;                       /*  8,39 /  9,20 /  8,79 */
    --ms3-ink-3: #7E8A98;                       /*  5,01 /  5,50 /  5,26 */
    --ms3-accent: #5CC8E8;                      /*  9,13 / 10,02 /  9,57 */
    --ms3-on-accent: #04222E;                   /*  8,55 on accent */
    --ms3-good: #4BD684;                        /*  9,44 / 10,36 /  9,89 */
    --ms3-warn: #F5B740;                        /*  9,84 / 10,80 / 10,32 */
    --ms3-crit: #FF7060;                        /*  6,49 /  7,12 /  6,81 */
    --ms3-on-crit: #330B07;                     /*  6,49 on crit */
    --ms3-focus: #86DFF5;                       /* 11,65 / 12,78 / 12,21 */
    --ms3-fill-good: rgba(75,214,132,.22);
    --ms3-fill-warn: rgba(245,183,64,.22);
    --ms3-fill-crit: rgba(255,112,96,.24);
    --ms3-hatch-a: rgba(245,183,64,.55);
    --ms3-hatch-b: rgba(255,112,96,.55);
    --ms3-engrave-panel: inset 0 1px 0 rgba(255,255,255,.05), inset 0 -1px 0 rgba(0,0,0,.35);
    --ms3-engrave-well:  inset 0 1px 0 rgba(0,0,0,.35),  inset 0 -1px 0 rgba(255,255,255,.05);
  }
}
/* The same block, repeated verbatim for the explicit toggle. Copy-paste on purpose:
   a shared @media/[data-theme] selector list is not supported everywhere we ship. */
:root[data-theme="dark"] { /* ...identical declarations as above... */ }

/* ---- high contrast: the pattern becomes a solid fill with a thicker edge ---- */
@media (prefers-contrast: more) {
  :root {
    --ms3-fill-good: rgba(10,107,46,.38);
    --ms3-fill-warn: rgba(133,72,10,.38);
    --ms3-fill-crit: rgba(176,31,25,.40);
    --ms3-hatch-a: transparent; --ms3-hatch-b: transparent;  /* hatching off, see 6.4 */
  }
}

/* ---- reduced motion: 1 ms, not 0 — transitionend must still fire ---- */
@media (prefers-reduced-motion: reduce) {
  :root {
    --ms3-dur-needle: 1ms; --ms3-dur-press: 1ms;
    --ms3-dur-camera: 1ms; --ms3-dur-screen: 1ms;
  }
}
```

Reguły użycia tokenów, których nie da się zapisać w CSS:

* `--ms3-hairline` **nigdy** nie rozdziela dwóch rzeczy, które trzeba rozróżnić. Do tego jest
  `--ms3-rule`. Linia między wierszami listwy kanałów niesie znaczenie → `--ms3-rule`. Linia
  wewnątrz noty jest ozdobą → `--ms3-hairline`.
* `--ms3-ink-3` wolno użyć wyłącznie przy 15 px i większym.
* `--ms3-accent` nie jest kolorem dekoracyjnym. Występuje w trzech miejscach: klawisz START,
  obramowanie wybranego kanału głównego, aktywny segment przełącznika zakresu. Nigdzie indziej.
* Wersaliki: maksymalnie **dwa słowa**, minimum 15 px, tracking z tokena, i nigdy jedyny opis
  elementu. Przy ustawieniu „Duży tekst" `--ms3-tracking-legend` schodzi do `0`.
* `--ms3-scale` mnoży skalę typograficzną w `base.css`:
  `font-size: calc(var(--ms3-t-body) * var(--ms3-scale))` itd. Wysokości bloków (`--ms3-h-row`,
  `--ms3-h-desk`) **też** rosną z tym mnożnikiem — inaczej tekst wyleje się z wiersza.

---

## 3. Inwentarz ekranów

Model ma **dwa poziomy i ani jednego więcej**. Poziom 1 to Pulpit. Poziom 2 to moduł. Arkusze
(pomoc do metryki, potwierdzenia) to warstwa modalna i nie liczą się do głębokości. Klawisz sprzętowy
„wstecz", `Escape` i klawisz powrotu robią dokładnie to samo.

### Poziom 1

| Ekran | Zawartość | Jak wejść |
|---|---|---|
| **PULPIT** | listwa stanu, studnia odczytu (wielka liczba + werdykt + skala), listwa 6 kanałów, monitor kamery, noty, pulpit sterowania | ekran startowy; klawisz „PULPIT" z żywego paska; `Escape` z modułu |

### Warstwa pełnoekranowa nad Pulpitem (bez żywego paska — pomiar jest tu widoczny sam z siebie)

| Ekran | Zawartość | Jak wejść |
|---|---|---|
| **CELOWANIE** | pełnoekranowy podgląd kamery, celownik = dokładny wycinek próbkowany, jedna linia instrukcji, klawisze „Zamknij" i „Obróć" po 48 px | dotknięcie monitora kamery |
| **SPIS MODUŁÓW** | lista 12 wierszy po 72 px: numer 01–12, nazwa 18 px, jedno zdanie opisu 15 px, szewron | klawisz „MENU" w pulpicie sterowania |

### Poziom 2 — moduły. Każdy ma listwę modułu u góry i żywy pasek u dołu.

| Nr | Moduł | Zawartość | Uwagi |
|---|---|---|---|
| **01** | **Rejestrator** | taśma przebiegu (canvas), przełącznik zakresu 60 s / 15 min / 1 godz / 24 godz / 30 dni, krzyż odczytu, statystyka sesji, wydruk tabelaryczny | zakresy ≥ 24 godz rysowane jako panorama słupków dobowych, nie jako linia |
| **02** | **Progi** | warn/crit dla każdej z 7 metryk, podgląd na tej samej skali co pulpit, profile, reset | `Engine.setThresholds` waliduje; odrzucenie komunikujemy słowem |
| **03** | **Kalibracja** | odniesienie do znanego źródła, jawne „czego kalibracja nie naprawia" | `Engine.setCalibration` |
| **04** | **Raporty** | zestawienia dobowe i tygodniowe w formie wydruku | pusty stan w 8.6 |
| **05** | **Eksport** | CSV / JSON, opis każdej kolumny | `Blob` + `a[download]`, bez sieci |
| **06** | **Porównanie** | dwie sesje na jednej taśmie, różnica podana liczbowo | wymaga 2 sesji — pusty stan |
| **07** | **Test ekranu** | plansze kontrolne, instrukcja krok po kroku | jedyny ekran wychodzący z motywu: pełne plansze |
| **08** | **Harmonogram** | automatyczne pomiary o zadanych porach | jawnie: „działa tylko przy otwartej aplikacji" |
| **09** | **Alerty** | powiadomienie po przekroczeniu progu | jawnie: kiedy zadziała, a kiedy nie |
| **10** | **Wsparcie** | aplikacja jest darmowa; jeden odnośnik na profil Buy Me a Coffee | bez licznika, bez pilności; klawisz tylko przy wypełnionym `SUPPORT_URL` |
| **11** | **Dokumentacja** | co to mierzy, czego nie mierzy, wzory, zakresy, pełne zastrzeżenie MDR | otwiera się sekcją „Czego ta aplikacja NIE mierzy" |
| **12** | **Ustawienia** | motyw, rozmiar tekstu ×1 / ×1,15 / ×1,3, „Ogranicz ruch", czyszczenie historii | motyw ustawia `data-theme` na `<html>` |

### Arkusze (modal nad wszystkim poza pulpitem sterowania)

| Arkusz | Zawartość | Jak wejść |
|---|---|---|
| **Pomoc do metryki** | `namePL`, `shortPL`, `helpPL`, jednostka, zakres, aktualne progi, dostępność, mini-przebieg 240×48, nota „Czego ta liczba nie mówi" | klawisz „?" w studni odczytu; długie naciśnięcie wiersza kanału |

### Blok wsuwany (nie ekran)

| **ERRATA** | komunikat `engine:error.messagePL` + klawisz „Spróbuj ponownie" | wsuwa się na górę Pulpitu przy `engine:error`. **Nigdy jako modal** — modal zasłoniłby pomiar |

---

## 4. Ekran główny, blok po bloku

### 4.1 Reguła układu, której nie wolno złamać

Pulpit to **kolumna flex o wysokości `100dvh`** z trzema strefami przypiętymi i jedną przewijaną:

```
[ listwa stanu       ]  flex: 0 0 40px                — przypięta
[ studnia odczytu    ]  flex: 0 0 var(--ms3-h-hero)   — przypięta, NIGDY nie przewija
[ listwa kanałów     ]  flex: 1 1 auto; overflow-y: auto;
[ + monitor + noty   ]  overscroll-behavior: contain  — jedyny obszar przewijany
[ pulpit sterowania  ]  flex: 0 0 80px + safe-area    — przypięty, OSTATNI w DOM
```

To jest odpowiedź na wadę, którą policzyli wszyscy trzej sędziowie: w zwycięskiej koncepcji suma
bloków przekraczała ekran o 105–240 px. Tutaj **wielka liczba i klawisz START są zawsze widoczne**,
a przewija się wyłącznie to, co wolno przewinąć.

Budżet pionowy, policzony:

| Ekran | rail | hero | desk | safe | zostaje na listwę | widocznych wierszy (56 px) |
|---|---|---|---|---|---|---|
| 360×640, przeglądarka | 40 | 216 | 80 | 0 | **304 px** | 5,4 |
| 390×844, PWA (safe 47+34) | 40 | 253 | 80 | 81 | **390 px** | 6 + monitor |
| 360×640, tekst ×1,3 | 40 | 216 | 88 | 0 | **296 px** | 4 (wiersz rośnie do 72 px) |

Kolejność ustępowania — wolno tylko w tej kolejności:

1. Monitor kamery zwija się do 96×96 px w pulpicie sterowania (dzieje się już przy starcie pomiaru).
2. `--ms3-h-hero` schodzi przez `clamp()` do 216 px, liczba do 56 px.
3. Listwa kanałów przewija się — to jest przewidziane, nie awaria.
4. **Nigdy nie ustępuje:** klawisz START/STOP, wielka liczba, stempel statusu, werdykt.

Przy `height < 480px` **albo** orientacji poziomej układ przechodzi w dwie kolumny (4.8).

### 4.2 Blok A — LISTWA STANU (40 px + `env(safe-area-inset-top)`)

```
┌───────────────────────────────────────────────────┐
│ MONITOR ŚWIATŁA           ▪ POMIAR 00:04:12  5,0 Hz│
└───────────────────────────────────────────────────┘
```

* Tło `--ms3-plate`, dolna linia 1 px `--ms3-rule`.
* Lewo: `MONITOR ŚWIATŁA`, 15 px, waga 700, wersaliki, tracking z tokena, `--ms3-ink-2`.
  Dwa słowa — mieści się w limicie z rozdziału 2.
* Prawo: **kwadratowa** dioda 10×10 px (kwadrat, nie koło — kształt też niesie znaczenie), tekst
  stanu 15 px waga 700, oraz `5,0 Hz` w `--ms3-ink-3`.
* Dioda **nie miga w żadnym stanie**. Wygląd: bezczynny → obrys 2 px `--ms3-ink-3`, pusty;
  uruchamianie → obrys 2 px `--ms3-accent`, pusty; pomiar → pełny `--ms3-good`;
  błąd → pełny `--ms3-crit`.
* Licznik `00:04:12`, `tabular-nums`, aktualizowany **raz na sekundę**, nie pięć razy.
* Pod listwą, **wyłącznie przez pierwsze 3 s pomiaru**, linia postępu 3 px w `--ms3-accent` rosnąca
  od lewej. Przy `prefers-reduced-motion` skacze co 1 s zamiast płynąć.

### 4.3 Blok B — STUDNIA ODCZYTU (`--ms3-h-hero`, 216–268 px)

Wcięty panel: tło `--ms3-well`, obrys 1 px `--ms3-rule`, promień 2 px,
`box-shadow: var(--ms3-engrave-well)`, marginesy boczne 12 px, wewnętrzny 16 px.

```
┌─ KANAŁ GŁÓWNY ──────────────────────────────  [?] ┐
│ UDZIAŁ NIEBIESKIEGO                               │
│                                                   │
│  2 7 %                                            │  ← 56–96 px, tabular, pole 4 znaki
│                                                   │
│ ▲ UWAGA (próg 26%)                                │  ← kształt + słowo + próg
│ Światło jest chłodniejsze, niż zalecamy wieczorem.│  ← werdykt zwykłą polszczyzną, 20 px
│                                                   │
│ ░░░░░░░▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← pasmo stref 10 px
│ ─┴────────┴──▼─────┴────────┴────────┴─────────── │  ← linia bazowa + wskazówka
│  0        15        30        45        60        │  ← podpisy 15 px
│ ├──┤ min 21 · śr. 24 · maks 29 — ostatnie 60 s    │  ← ślad min–maks + kontekst
└───────────────────────────────────────────────────┘
```

Wiersze, od góry, z wysokościami:

1. **Legenda, 34 px.** Po lewej dwie linijki: `KANAŁ GŁÓWNY` (15 px, wersaliki, `--ms3-ink-3`)
   i pod spodem nazwa metryki wersalikami (15 px, waga 700, `--ms3-ink-2`).
   Po prawej klawisz „?": wizualnie 32×32 px, **strefa dotyku 48×48 px** przez `::before`
   z `inset: -8px`; `aria-label="Co oznacza: Udział niebieskiego"`.
2. **Wielka liczba, 68–104 px** (`line-height: 1`). `font-size: var(--ms3-t-readout)`, waga 700,
   `letter-spacing: -.02em`, `font-variant-numeric: tabular-nums lining-nums`, kolor `--ms3-ink`.
   **Pole zablokowane na 4 znaki:** `min-width: 4ch; display: inline-block; text-align: left`.
   Przejście 9 → 10 nie może przesunąć niczego.
   Jednostka zaraz za liczbą: 0,36 × rozmiar liczby, waga 600, `--ms3-ink-2`, do linii bazowej.
   Przy `kelvin` i `melanopic` **przed** liczbą stoi `≈` w `--ms3-ink-3`, wielkości 0,45 × liczby.
3. **Stempel statusu, 26 px.** Kształt 18 px (● / ▲ / ■) + słowo wersalikami 17 px + próg
   w nawiasie. Barwa `--ms3-good` / `--ms3-warn` / `--ms3-crit`.
4. **Werdykt, `min-height: 56px`** (dwa wiersze po 28 px; trzeci wiersz wolno mu wziąć z zapasu
   `clamp()`). 20 px, waga 500, `--ms3-ink`, `line-height: 1.35`. Treści w rozdziale 8.
   To jest element, którego nie miała żadna z ocenionych koncepcji przyrządowych i którego brak
   sędzia nr 2 nazwał wadą śmiertelną: „68-latka nie ma pytania »ile procent niebieskiego«".
5. **Skala, 56 px.** Konstrukcja w 6.1.
6. **Wiersz kontekstu, 20 px.** 15 px, `tabular-nums`, `--ms3-ink-3`:
   `min 21 · śr. 24 · maks 29 — ostatnie 60 s`. Liczone z `Engine.buffer(60000)`, raz na sekundę.

Studnia ma **stałą wysokość** — zmiana kanału głównego nie może jej przeskalować.

### 4.4 Blok C — LISTWA KANAŁÓW (6 × 56 px, w obszarze przewijanym)

Sześć wierszy: wszystkie metryki poza aktualnym kanałem głównym, w kolejności katalogu. Bez
zaokrągleń, na całą szerokość, rozdzielone linią 1 px `--ms3-rule`.

```
[■ 24] Jasność sceny         [mikroskala 88×18]  [   63] [%  ]
[● 24] Temperatura barwowa   [mikroskala 88×18]  [≈4200] [K  ]
[▲ 24] Migotanie             [mikroskala 88×18]  [ 12,4] [%  ]
```

Siatka wiersza (CSS Grid): `24px 1fr 88px 5ch 3ch`, `gap: 12px`, `padding-inline: 16px`.

* kolumna 1 — znacznik stanu, kształt 24 px;
* kolumna 2 — nazwa 17 px waga 600, `--ms3-ink`, jedna linia, `text-overflow: ellipsis`;
* kolumna 3 — mikroskala 88×18 px (6.2);
* kolumna 4 — wartość 24 px waga 700, `tabular-nums`, do prawej, **pole 5 znaków**;
* kolumna 5 — jednostka 15 px, `--ms3-ink-2`, pole 3 znaki.

Cały wiersz jest `<button>` — cel dotykowy ok. 328×56 px na telefonie 360 px (w v2 kafelek miał
ok. 170×64 px).

Wszystkie wiersze są takie same i wszystkie pokazują liczbę: nie ma wiersza zamkniętego, kłódki
ani plakietki mówiącej, że za tę liczbę trzeba zapłacić. Wiersz bez świeżego odczytu w trakcie
pomiaru różni się tylko znacznikiem `—`, wartością `———` i przygaszoną barwą liczby.

### 4.5 Blok D — MONITOR KAMERY

Dwustanowy:

* **Pomiar nie trwa:** panel na całą szerokość obszaru przewijanego, tuż pod listwą kanałów.
  Proporcja z metadanych strumienia (przed `loadedmetadata` domyślnie 4:3), maksymalna wysokość
  168 px, legenda `PODGLĄD KONTROLNY`, wewnątrz `#cameraVideo`, a nad nim `#cameraPlaceholder`
  z `#cameraPlaceholderText` (tekst pisze silnik, my go nie nadpisujemy).
* **Pomiar trwa:** panel zwija się w 200 ms do kwadratu **96×96 px** dokowanego w pulpicie
  sterowania (4.6 rezerwuje na to miejsce — klawisze nie są przykryte), ramka 1 px `--ms3-rule`,
  plakietka `NA ŻYWO` 15 px.
* Zwijanie robimy przez `width`/`height` kontenera i `transform`, **nigdy przez `display: none`**
  ani `visibility: hidden` na `#cameraVideo` — to zabiłoby strumień.
* Dotknięcie monitora otwiera ekran CELOWANIE.

### 4.6 Blok E — PULPIT STEROWANIA (80 px + `env(safe-area-inset-bottom)`)

**Ostatni element w DOM powłoki.** `position: fixed; inset-inline: 0; bottom: 0;
z-index: var(--ms3-z-desk)`. Tło `--ms3-panel`, górna linia 1 px `--ms3-rule`,
`box-shadow: var(--ms3-engrave-panel)`.

Rząd na telefonie 360 px, marginesy 12 px, odstępy 8 px:

```
│12│ [  ▶ START POMIARU  ] 8 [OBRÓĆ] 8 [MENU] │12│      ← spoczynek
       elastyczny, 192 px      64×64    64×64

│12│ [ ■ STOP ] 8 [OBRÓĆ] 8 [MENU] 8 [96×96] │12│      ← pomiar
       88×64        64×64     64×64   monitor
```

Arytmetyka: spoczynek `12+192+8+64+8+64+12 = 360`; pomiar `12+88+8+64+8+64+8+96+12 = 360`.
Klawisz główny nigdy nie schodzi poniżej 88×64 px i nigdy nie jest przykryty. (To była druga
policzona wada zwycięskiej koncepcji: monitor 104×78 px nie miał gdzie stanąć i lądował na
klawiszach.)

* **Klawisz główny**, wysokość 64 px, promień 3 px.
  Spoczynek: tło `--ms3-accent`, tekst `--ms3-on-accent`, trójkąt ▶ 20 px, napis `START POMIARU`
  18 px waga 700.
  Pomiar: tło `--ms3-crit`, tekst `--ms3-on-crit`, kwadrat ■ 18 px, napis `STOP`.
  Zmienia się barwa **i** kształt ikony **i** słowo. Lewa krawędź nie zmienia pozycji nigdy.
* **OBRÓĆ** i **MENU**: 64×64 px, ikona 24 px + podpis 15 px. Żaden klawisz nie jest samą ikoną
  (w v2 podpis „Przełącz" znikał na wąskim ekranie).
* Podczas `state === 'starting'` klawisz główny ma `aria-busy="true"`, napis `URUCHAMIAM…`,
  `aria-disabled="true"` i nieaktywny wygląd, ale **nie znika i nie zmienia rozmiaru**.

### 4.7 Kolejność w DOM (wiążąca)

```html
<body>
  <div id="ms3App">
    <header id="ms3Rail">…</header>
    <main id="ms3Dash">
      <div id="ms3Errata" role="alert" hidden>…</div>
      <section id="ms3Readout">…</section>
      <div id="ms3Scroll">
        <div id="ms3Channels" role="group" aria-label="Kanały pomiarowe">…</div>
        <div id="ms3CameraPanel">
          <video id="cameraVideo" playsinline muted></video>
          <div id="cameraPlaceholder"><p id="cameraPlaceholderText"></p></div>
        </div>
        <div id="ms3Notes">…</div>
      </div>
    </main>
    <div id="ms3Screens"></div>   <!-- moduły i ekrany pełnoekranowe -->
    <div id="ms3Sheets"></div>    <!-- arkusze -->
    <p id="ms3Live" class="ms3-sr" aria-live="polite" aria-atomic="true"></p>
    <footer id="ms3Desk">…</footer>   <!-- OSTATNI. Zawsze. -->
  </div>
</body>
```

`#cameraVideo`, `#cameraPlaceholder` i `#cameraPlaceholderText` mają te identyfikatory i to
zagnieżdżenie na stałe. Przy przejściu do CELOWANIA **przenosimy `#ms3CameraPanel` w całości**
(`appendChild`) i oddajemy z powrotem przy zamknięciu — nie tworzymy drugiego `<video>`.

### 4.8 Desktop ≥ 900 px

Bez „wersji mobilnej rozciągniętej na szerokość". Układ dwukolumnowy, wyśrodkowany,
`max-width: 1180px`:

```
┌──────────────────────────────────────────────────────────────┐
│ listwa stanu (na całą szerokość okna)                        │
├─────────────────────────────┬────────────────────────────────┤
│ STUDNIA ODCZYTU             │ LISTWA KANAŁÓW                 │
│ (liczba clamp do 112 px)    │ 6 × 64 px, wszystkie widoczne  │
│                             │                                │
│ MONITOR KAMERY 4:3          │ NOTY                           │
├─────────────────────────────┴────────────────────────────────┤
│ PULPIT STEROWANIA (na całą szerokość, klawisz główny 260 px) │
└──────────────────────────────────────────────────────────────┘
```

* `grid-template-columns: minmax(380px, 1fr) minmax(360px, 1fr)`, `gap: 24px`.
* Przy wysokości ≥ 760 px **nic się nie przewija**: 6 wierszy po 64 px = 384 px mieści się
  w prawej kolumnie obok studni.
* `--ms3-t-readout` na desktopie: `clamp(72px, 7vw, 112px)`.
* Moduły otwierają się jako pełnoekranowa nakładka z kolumną treści `max-width: 760px`,
  wyśrodkowaną; żywy pasek zostaje na całą szerokość u dołu.
* Punkt przełamania jest **jeden**: `@media (min-width: 900px)`. Nie mnożymy breakpointów.

### 4.9 Powiększenie tekstu 200%

* Listwa kanałów przechodzi na dwa wiersze na kanał (`grid-template-areas`): górny — znacznik
  i nazwa, dolny — mikroskala, wartość, jednostka. Wysokość wiersza rośnie do 88 px.
* Mikroskala schodzi do 56 px szerokości, a poniżej 320 px szerokości wiersza znika
  (`display: none`) — jej informacja jest zdublowana przez znacznik i wartość, więc jej zniknięcie
  niczego nie zabiera.
* Pulpit sterowania: OBRÓĆ i MENU schodzą pod klawisz główny w drugi rząd, wysokość pulpitu rośnie
  do 152 px, klawisz główny zostaje w górnym rzędzie i nigdy nie znika.

---
## 5. Komponenty

Prefiks klas: `ms3-`. Konwencja BEM: `ms3-blok__element--modyfikator`. Żadna klasa spoza tego
prefiksu nie istnieje w v3 (klasy `ms-*` z v2 nie są obsługiwane — patrz rozdział 10).

Reguły wspólne dla wszystkich komponentów:

* każdy element interaktywny to `<button type="button">` albo `<a>`; nigdy `<div onclick>`;
* minimalny cel dotykowy 48×48 px, mierzony razem z powiększeniem przez `::before`;
* focus: `outline: 3px solid var(--ms3-focus); outline-offset: 2px`, a na wypełnionym klawiszu
  dodatkowo `box-shadow: 0 0 0 1px var(--ms3-panel) inset` — pierścień musi być widoczny na każdym tle;
* stan wciśnięcia to zmiana tła w 90 ms, **nigdy `transform: scale()`**;
* każdy komponent ma zdefiniowany wygląd „brak danych" — nie ma sytuacji, w której puste pole
  wygląda tak samo jak zero.

---

### 5.1 `ms3-readout` — studnia odczytu

```html
<section class="ms3-readout" id="ms3Readout" aria-labelledby="ms3ReadoutName">
  <div class="ms3-readout__head">
    <div class="ms3-readout__legend">
      <span class="ms3-legend">Kanał główny</span>
      <span class="ms3-legend ms3-legend--strong" id="ms3ReadoutName">Udział niebieskiego</span>
    </div>
    <button class="ms3-help" type="button" aria-label="Co oznacza: Udział niebieskiego">?</button>
  </div>

  <p class="ms3-readout__value" id="ms3ReadoutValue">
    <span class="ms3-readout__approx" aria-hidden="true">≈</span><!--
 --><span class="ms3-readout__num">27</span><!--
 --><span class="ms3-readout__unit">%</span>
  </p>

  <p class="ms3-stamp ms3-stamp--warning">
    <span class="ms3-shape ms3-shape--warning" aria-hidden="true"></span>
    <span class="ms3-stamp__word">Uwaga</span>
    <span class="ms3-stamp__threshold">(próg 26%)</span>
  </p>

  <p class="ms3-verdict" id="ms3Verdict">Światło jest chłodniejsze, niż zalecamy wieczorem.</p>

  <div class="ms3-scale" id="ms3Scale"><!-- 5.3 --></div>

  <p class="ms3-context" id="ms3Context">min 21 · śr. 24 · maks 29 — ostatnie 60 s</p>
</section>
```

* `.ms3-readout__num` — `min-width: 4ch; display: inline-block; text-align: left;
  font-variant-numeric: tabular-nums lining-nums`. **Bez tego nie wolno oddać zadania.**
* `.ms3-readout__approx` jest `aria-hidden`, bo znak `≈` czytnik przeczytałby jako „w przybliżeniu
  równe" w środku zdania. Informacja o przybliżeniu wchodzi do nazwy dostępnej całego bloku:
  `aria-label="Udział niebieskiego: wartość przybliżona 4200 kelwinów, uwaga"`.
* Brak wartości (`null`, przed pierwszą próbką, wielkość niemierzalna w tej scenie):
  `.ms3-readout__num` pokazuje `———`,
  stempel `— BRAK DANYCH`, werdykt z 8.2, skala bez wskazówki.

---

### 5.2 `ms3-channel` — wiersz kanału

```html
<div class="ms3-channels" id="ms3Channels" role="group" aria-label="Kanały pomiarowe">
  <button class="ms3-channel" type="button"
          data-metric="brightness" tabindex="0"
          aria-label="Jasność sceny, 63 procent, w normie. Pokaż na dużym wyświetlaczu">
    <span class="ms3-shape ms3-shape--good" aria-hidden="true"></span>
    <span class="ms3-channel__name">Jasność sceny</span>
    <span class="ms3-micro" aria-hidden="true"><!-- 6.2 --></span>
    <span class="ms3-channel__value">63</span>
    <span class="ms3-channel__unit">%</span>
  </button>

  <button class="ms3-channel ms3-channel--stale" type="button"
          data-metric="flicker" tabindex="-1"
          aria-label="Migotanie, brak danych. Pokaż na dużym wyświetlaczu">
    <span class="ms3-shape ms3-shape--none" aria-hidden="true"></span>
    <span class="ms3-channel__name">Migotanie</span>
    <span class="ms3-micro" aria-hidden="true"><!-- 6.2 --></span>
    <span class="ms3-channel__value">———</span>
    <span class="ms3-channel__unit">%</span>
  </button>
</div>
```

* **Roving tabindex.** Dokładnie jeden wiersz ma `tabindex="0"`, reszta `-1`. Strzałki góra/dół
  przesuwają fokus i `tabindex`, `Home`/`End` skaczą na koniec, `Enter`/`Spacja` aktywują.
  Strzałki **nie** zmieniają kanału głównego same z siebie (to byłby wybór przez przypadek).
* Wiersz aktualnego kanału głównego nie występuje w listwie (jest w studni). Po przełączeniu
  poprzedni kanał wraca na swoje miejsce w kolejności katalogu, a fokus zostaje na wierszu, który
  właśnie wszedł na jego miejsce.
* Kanał główny jest dodatkowo oznaczony w studni: `aria-current` nie jest tu potrzebny, bo
  wybrany kanał fizycznie zmienia miejsce. Komunikat idzie do `#ms3Live`: „Kanał główny:
  Temperatura barwowa".
* `.ms3-channel--stale` (wartość `null` mimo trwającego pomiaru): wartość `———`,
  znacznik ○ (koło puste, obrys 2 px, `--ms3-ink-3`), nazwa dostępna kończy się „brak danych".

---

### 5.3 `ms3-scale` — skala główna (56 px)

Czysty DOM + CSS. Zero canvasu, zero SVG. Konstrukcja: cztery warstwy w kontenerze
`position: relative`.

```html
<div class="ms3-scale" role="img"
     aria-label="Skala udziału niebieskiego od 0 do 60 procent. Wartość 27 procent, strefa uwagi, próg uwagi 26, próg krytyczny 33">
  <div class="ms3-scale__bands">
    <span class="ms3-band ms3-band--good"     style="left:0%;    width:43.3%"></span>
    <span class="ms3-band ms3-band--warning"  style="left:43.3%; width:11.7%"></span>
    <span class="ms3-band ms3-band--critical" style="left:55%;   width:45%"></span>
  </div>
  <div class="ms3-scale__base"></div>
  <div class="ms3-scale__ticks">
    <span class="ms3-tick ms3-tick--major" style="left:0%"></span>
    <span class="ms3-tick ms3-tick--major" style="left:25%"></span>
    …
  </div>
  <div class="ms3-scale__trace" style="left:35%; width:13.3%"></div>
  <div class="ms3-needle" style="transform: translateX(45%)"></div>
  <div class="ms3-scale__labels">
    <span style="left:0%">0</span><span style="left:25%">15</span>…
  </div>
</div>
```

Warstwy, od dołu:

1. **Pasma stref** (`.ms3-scale__bands`), wysokość 10 px, tuż nad linią bazową. Trzy `<span>`
   pozycjonowane absolutnie w procentach. Wypełnienie:
   * `--good`: `background: var(--ms3-fill-good)` — gładkie;
   * `--warning`: `var(--ms3-fill-warn)` + `repeating-linear-gradient(45deg,
     var(--ms3-hatch-a) 0 1px, transparent 1px 6px)` — ukośne, skok 6 px;
   * `--critical`: `var(--ms3-fill-crit)` + dwa `repeating-linear-gradient` (45° i −45°),
     skok 5 px — krzyżowe.
   Skok wzoru jest podany w **px i nie skaluje się z tekstem** (mora przy DPR 2 i 3).
2. **Linia bazowa** (`.ms3-scale__base`), 2 px, `--ms3-rule`, na całą szerokość.
   Gdy dane są niewiarygodne (`kelvinReliable === false` dla kanału `kelvin`,
   `flickerWithinRange === false` dla `flicker`) linia bazowa staje się **kreskowana**:
   `background: repeating-linear-gradient(90deg, var(--ms3-rule) 0 6px, transparent 6px 12px)`.
   Epistemologia narysowana w samym znaku — kradzież z kierunku „Strumień czasu".
3. **Kreski** (`.ms3-scale__ticks`): główne co 1/4 zakresu — 12 px wysokości, 2 px grubości,
   `--ms3-rule`; pomocnicze co 1/20 zakresu — 6 px, 1 px, `--ms3-hairline`.
   Przy szerokości skali < 240 px kreski pomocnicze znikają (zlewałyby się).
4. **Ślad min–maks z 60 s** (`.ms3-scale__trace`): pasek 4 px pod linią bazową w `--ms3-ink-3`,
   z dwiema zaślepkami 10 px na końcach. `left` i `width` liczone tą samą funkcją co wskazówka.
5. **Wskazówka** (`.ms3-needle`): trójkąt ostrzem w dół 20×16 px, `clip-path:
   polygon(50% 100%, 0 0, 100% 0)`, kolor `--ms3-ink`, plus pionowa kreska 2 px spadająca przez
   pasmo do linii bazowej. Ruch **wyłącznie** przez `transform: translateX(…)`,
   `transition: transform var(--ms3-dur-needle) var(--ms3-ease)`.
   **Nigdy** nie przemalowujemy tła w pętli 5 Hz.
6. **Podpisy** (`.ms3-scale__labels`): 15 px, `tabular-nums`, `--ms3-ink-3`, pod kreskami głównymi.
   Skrajne podpisy wyrównane do wewnątrz (`transform: translateX(0)` / `translateX(-100%)`), żeby
   nie wychodziły poza studnię.

Metryki `invert` (równomierność, komfort): kolejność pasm jest lustrzana — krytyczne od lewej,
dobre po prawej. Faktura zostaje przypisana do **stanu**, nie do strony, więc krzyżowa szrafura
zawsze oznacza „krytycznie".

---

### 5.4 `ms3-micro` — mikroskala (88×18 px)

Ta sama konstrukcja, mniej elementów: pasma 6 px, linia bazowa 2 px, trójkąt 10 px.
**Bez kresek, bez podpisów i BEZ SZRAFURY** — na paśmie 6 px skok wzoru 5–6 px daje dwa–trzy
przejścia, ukośna i krzyżowa zlewają się w szarą papkę, a przy DPR 2,75 dochodzi mora.
Sędzia nr 3 wytknął to wprost: udawanie, że wzór tam działa, jest gorsze niż jego brak.
Nośnikiem statusu w wierszu jest znacznik kształtu 24 px w kolumnie 1 — i to wystarcza.

`aria-hidden="true"` na całej mikroskali: jej treść jest w nazwie dostępnej wiersza.

---

### 5.5 `ms3-shape` — znacznik stanu

Jeden komponent, cztery warianty, trzy rozmiary (18 / 20 / 24 px sterowane
`--ms3-shape-size`). Kształt rysowany `clip-path`, nie znakiem Unicode (glify różnią się
między systemami i nie da się ich wyrównać).

| Wariant | Kształt | Kolor | Słowo |
|---|---|---|---|
| `--good` | koło (`border-radius: 50%`) | `--ms3-good` | „W normie" |
| `--warning` | trójkąt ostrzem w górę | `--ms3-warn` | „Uwaga" |
| `--critical` | kwadrat | `--ms3-crit` | „Krytycznie" |
| `--none` | koło puste, obrys 2 px | `--ms3-ink-3` | „Brak danych" |

Znacznik nigdy nie występuje bez słowa w tym samym bloku. `aria-hidden="true"` zawsze — słowo
niesie treść.

---

### 5.6 `ms3-key` — klawisz

```html
<button class="ms3-key ms3-key--primary" type="button" id="ms3KeyMain">
  <span class="ms3-key__icon" aria-hidden="true"></span>
  <span class="ms3-key__label">Start pomiaru</span>
</button>
```

| Wariant | Zastosowanie | Wygląd |
|---|---|---|
| `--primary` | START | tło `--ms3-accent`, tekst `--ms3-on-accent`, 64 px wysokości |
| `--stop` | STOP | tło `--ms3-crit`, tekst `--ms3-on-crit`, ikona kwadrat |
| `--square` | OBRÓĆ, MENU | 64×64 px, tło `--ms3-panel`, obrys 1 px `--ms3-rule` |
| `--ghost` | powrót, zamknij, odnośnik wsparcia | przezroczyste, obrys 1 px `--ms3-rule`, min. 48 px |

Promień 3 px. Bez cienia. Wciśnięcie: przyciemnienie/rozjaśnienie tła o jeden krok w 90 ms.
Każdy klawisz ma `.ms3-key__label` z widocznym tekstem — **nie ma klawisza będącego samą ikoną**.

---

### 5.7 `ms3-monitor` — monitor kamery i celownik

```html
<div class="ms3-monitor" id="ms3CameraPanel" data-state="expanded">
  <span class="ms3-legend">Podgląd kontrolny</span>
  <div class="ms3-monitor__frame" style="aspect-ratio: 4 / 3">
    <video id="cameraVideo" playsinline muted></video>
    <div class="ms3-reticle" aria-hidden="true"></div>
    <div id="cameraPlaceholder"><p id="cameraPlaceholderText"></p></div>
  </div>
  <button class="ms3-monitor__open ms3-key ms3-key--ghost" type="button">Powiększ podgląd</button>
</div>
```

**Uczciwość celownika (pułapka nr 4 z rozdziału 0).** Silnik próbkuje prostokąt o rozmiarze
`0,6·vw × 0,6·vh` wycentrowany w klatce. Żeby celownik pokazywał dokładnie to:

1. Na `loadedmetadata` ustawiamy `frame.style.aspectRatio = video.videoWidth + ' / ' + video.videoHeight`.
2. `#cameraVideo` ma `object-fit: cover` — przy zgodnej proporcji to operacja tożsamościowa,
   nic nie jest obcinane.
3. Celownik to wtedy dokładnie `inset: 20%` (bo `(1 − 0,6)/2 = 0,2`), obrys 2 px `--ms3-accent`,
   naroża 12 px grubsze (3 px).

Stan zwinięty (`data-state="collapsed"`): kontener 96×96 px, `aspect-ratio` zostaje, `object-fit:
cover` przycina do kwadratu — i **wtedy celownik jest ukryty**, bo przestałby być prawdą.
Zamiast niego plakietka `NA ŻYWO`. Pełną prawdę o kadrze pokazuje ekran CELOWANIE.

Nigdy `display: none` ani `visibility: hidden` na `#cameraVideo`.

---

### 5.8 `ms3-livebar` — żywy pasek (56 px)

Przypięty u dołu **każdego modułu** (poziom 2). Rozwiązuje twardy wymóg nr 6 mechanicznie:
wejście w Ustawienia nie zrywa kontaktu z pomiarem, powrót to jedno dotknięcie w tym samym punkcie.

```html
<div class="ms3-livebar">
  <span class="ms3-shape ms3-shape--warning" aria-hidden="true"></span>
  <span class="ms3-livebar__name">Udział niebieskiego</span>
  <span class="ms3-livebar__value">27</span><span class="ms3-livebar__unit">%</span>
  <button class="ms3-key ms3-key--ghost" type="button">Pulpit</button>
</div>
```

* Wysokość 56 px + safe-area, tło `--ms3-panel`, górna linia 1 px `--ms3-rule`.
* Wartość 22 px, waga 700, `tabular-nums`, **pole 5 znaków** — ten sam patent co w studni.
* Klawisz „Pulpit" 48 px wysokości, zawsze po prawej, zawsze w tym samym miejscu.
* Gdy pomiar nie trwa: znacznik `--none`, nazwa kanału, wartość `———`, tekst „Pomiar zatrzymany".
* Żywy pasek **nie występuje** na Pulpicie (byłby duplikatem) ani na ekranie CELOWANIE.

---

### 5.9 `ms3-screen` — moduł (poziom 2)

```html
<section class="ms3-screen" id="ms3Screen01" role="dialog" aria-modal="true"
         aria-labelledby="ms3Screen01Title" hidden>
  <header class="ms3-screen__head">
    <button class="ms3-key ms3-key--ghost ms3-screen__back" type="button"
            aria-label="Wróć do pulpitu">‹ Wróć</button>
    <span class="ms3-screen__no">01</span>
    <h1 class="ms3-screen__title" id="ms3Screen01Title">Rejestrator</h1>
  </header>
  <div class="ms3-screen__body"><!-- treść modułu --></div>
  <div class="ms3-livebar"><!-- 5.8 --></div>
</section>
```

* Listwa modułu 56 px: klawisz powrotu 48×48 px **zawsze w lewym górnym rogu**, numer modułu
  15 px wersalikami w `--ms3-ink-3`, tytuł 24 px waga 700.
* Wejście: `translateY(8px) + opacity` w 160 ms. Przy `reduced-motion` natychmiast.
* Pułapka fokusu: `Tab` krąży wewnątrz modułu; `Escape` zamyka; po zamknięciu fokus wraca na
  element, który moduł otworzył.
* Treść modułu przewija się (`overflow-y: auto`); listwa i żywy pasek nie.
* Kolumna treści: `padding-inline: 16px`, na desktopie `max-width: 760px; margin-inline: auto`.

---

### 5.10 `ms3-sheet` — arkusz modalny

```html
<div class="ms3-sheet" role="dialog" aria-modal="true" aria-labelledby="ms3SheetTitle" hidden>
  <div class="ms3-sheet__panel">
    <header class="ms3-sheet__head">
      <h2 id="ms3SheetTitle">Udział niebieskiego</h2>
      <button class="ms3-key ms3-key--ghost" type="button">Zamknij</button>
    </header>
    <div class="ms3-sheet__body">…</div>
  </div>
</div>
```

* Wjeżdża od dołu, wysokość maks. `85dvh`, promień **2 px** (nie 28 px jak w v2), górna linia 3 px
  `--ms3-rule`, tło `--ms3-panel`. Podkład: `--ms3-plate` przy 72% krycia, bez rozmycia
  (`backdrop-filter` nie występuje w v3).
* `z-index: var(--ms3-z-sheet)` — **niżej niż pulpit sterowania**. Arkusz fizycznie nie może
  zasłonić klawisza STOP; dolny margines arkusza to `calc(var(--ms3-h-desk) + safe-area)`.
* Zamknięcie: klawisz „Zamknij", `Escape`, dotknięcie podkładu.

---

### 5.11 `ms3-note` — nota

```html
<aside class="ms3-note ms3-note--limits">
  <span class="ms3-note__title">Czego ta liczba nie mówi</span>
  <p class="ms3-note__text">…</p>
</aside>
```

Dwa warianty, różniące się **lewym pasem 4 px** i nadtytułem, nigdy samym tłem:

| Wariant | Pas | Nadtytuł | Kiedy |
|---|---|---|---|
| `--limits` | `--ms3-ink-3` | „Czego ta liczba nie mówi" | granice metody, przybliżenia |
| `--warning` | `--ms3-warn` | „Uwaga" | rzecz, którą użytkownik może zrobić źle |

Tło noty: `--ms3-panel` (nie kolorowy tint — kolorowe tło pod tekstem obniża kontrast).
Nota o granicach pomiaru na Pulpicie **nigdy nie jest zwijana ani ukrywana**.

---

### 5.12 `ms3-table` — wydruk tabelaryczny

Zostaje z v2 celowo: to jedyna forma, w której czytnik ekranu i lupa systemowa radzą sobie
z danymi w stu procentach.

```html
<div class="ms3-tablewrap"><!-- overflow-x: auto; the page body never scrolls sideways -->
  <table class="ms3-table">
    <caption class="ms3-sr">Odczyty z ostatniej godziny</caption>
    <thead><tr><th scope="col">Godzina</th><th scope="col">Udział</th>…</tr></thead>
    <tbody><tr><td>21:14:05</td><td class="ms3-num">27</td>…</tr></tbody>
  </table>
</div>
```

* Nagłówek: 15 px wersaliki, waga 700, dolna linia 2 px `--ms3-rule`.
* Wiersze rozdzielone linią 1 px `--ms3-hairline`, **bez pasków w tle**.
* `.ms3-num`: `text-align: right; font-variant-numeric: tabular-nums`.
* Brak wartości: `———` w `--ms3-ink-3`, nigdy pusta komórka.
* Tabela zawsze siedzi w `.ms3-tablewrap` z `overflow-x: auto`.

---

### 5.13 `ms3-segments` — przełącznik zakresu

```html
<div class="ms3-segments" role="group" aria-label="Zakres czasu">
  <button class="ms3-segments__item" type="button" aria-pressed="true">60 s</button>
  <button class="ms3-segments__item" type="button" aria-pressed="false">15 min</button>
  …
</div>
```

Klawisze po 48 px wysokości, minimum 64 px szerokości, rozdzielone linią 1 px `--ms3-rule`,
promień 3 px tylko na skrajnych. Aktywny: tło `--ms3-accent`, tekst `--ms3-on-accent`,
plus dolna kreska 3 px — **stan nie jest niesiony samym kolorem**. `aria-pressed`, nie `aria-selected`.
Przy szerokości < 340 px przełącznik przewija się poziomo (`overflow-x: auto`), a aktywny segment
jest przewijany do widoku.

---

### 5.14 `ms3-badge` — plakietka

15 px, wersaliki, waga 700, `padding: 2px 6px`, promień 2 px, obrys 1 px w barwie wariantu.
Warianty: `--live` (`--ms3-good`, napis „Na żywo") i `--approx` (`--ms3-ink-3`,
napis „Przybliżenie").
Plakietka nigdy nie jest jedynym nośnikiem informacji.

---

### 5.15 `ms3-errata` — blok błędu

```html
<div class="ms3-errata" id="ms3Errata" role="alert" hidden>
  <span class="ms3-errata__title">Błąd kamery</span>
  <p class="ms3-errata__text" id="ms3ErrataText"><!-- engine:error.messagePL --></p>
  <button class="ms3-key ms3-key--ghost" type="button">Spróbuj ponownie</button>
</div>
```

Wsuwa się na **górę Pulpitu**, nad studnię odczytu, w 140 ms. Górna linia 3 px `--ms3-crit`,
tło `--ms3-panel`. **Nigdy modal** — modal zasłoniłby pomiar i wymagałby zamknięcia, zanim
użytkownik zdąży przeczytać. Treść bierzemy dosłownie z `engine:error.messagePL`; nie piszemy
własnych komunikatów o kamerze (silnik ma pięć gotowych, po polsku).

---

## 6. Wizualizacja danych

Jeden język graficzny w trzech rozmiarach plus jedna panorama historii. Nic więcej.

### 6.0 Jedna funkcja geometrii — `scale.js`

Cały rysunek w aplikacji bierze pozycję z **jednej** funkcji. Dwie implementacje tego samego
wzoru w dwóch plikach rozjadą się w tydzień.

```js
/* scale.js — pure geometry. No DOM, no engine, no bus. */

/** Position of a value on its metric scale, as a percentage 0..100. */
Scale.pos = function (metricId, value) {
  var m = Metrics.byId(metricId);
  if (!m || value === null || value === undefined || !isFinite(value)) return null;
  var pct = ((value - m.min) / (m.max - m.min)) * 100;
  return pct < 0 ? 0 : (pct > 100 ? 100 : pct);
};

/** The three band widths, already ordered left to right for THIS metric.
 *  Thresholds come from Engine.getThresholds(), never from the catalogue:
 *  the user may have moved them. */
Scale.bands = function (metricId, thresholds) {
  var m = Metrics.byId(metricId);
  var t = thresholds[metricId];
  var w = Scale.pos(metricId, t.warn), c = Scale.pos(metricId, t.crit);
  // invert === true means higher is better, so warn sits ABOVE crit and the
  // bad end of the ruler is on the LEFT.
  return m.invert
    ? [{ zone: 'critical', from: 0, to: c }, { zone: 'warning', from: c, to: w },
       { zone: 'good',     from: w, to: 100 }]
    : [{ zone: 'good',     from: 0, to: w }, { zone: 'warning', from: w, to: c },
       { zone: 'critical', from: c, to: 100 }];
};

/** Zone of a value. Delegates the arithmetic to metrics.js — never re-implemented. */
Scale.zone = function (metricId, value, thresholds) {
  var m = Metrics.byId(metricId), t = thresholds[metricId];
  return Metrics.zoneFor(value, t.warn, t.crit, m.invert);
};
```

`Scale.bands()` woła się **tylko** przy zmianie kanału głównego, przy `engine:thresholds`
i przy budowie wiersza. Nigdy w pętli 5 Hz.

### 6.1 Skala główna — jak i czym

* **Technika: DOM + CSS.** Nie canvas, nie SVG. Powód wydajnościowy: pasma, kreski i podpisy są
  statyczne i malują się raz; w pętli 5 Hz zmienia się **wyłącznie** `style.transform` wskazówki
  i `textContent` liczby. To praca kompozytora, bez repaintu i bez layoutu.
  Dla porównania: v2 przeliczała `conic-gradient` siedem razy na próbkę, a to pełny repaint
  warstwy, nieakcelerowany.
* Zakres: `metric.min … metric.max` z katalogu. Progi: z `Engine.getThresholds()`.
* Kreski główne co 1/4 zakresu — dla `share` daje 0 · 15 · 30 · 45 · 60; dla `kelvin`
  1500 · 3375 · 5250 · 7125 · 9000, zaokrąglane do 50 K przy wyświetlaniu.
* Wskazówka: `el.style.transform = 'translateX(' + pct + '%)'` na elemencie o `left: 0` i szerokości
  równej szerokości skali — czyli `translateX` w procentach **własnej** szerokości nie zadziała.
  Poprawnie: wskazówka ma `position: absolute; left: 0; width: 20px; margin-left: -10px`,
  a przesuwamy ją przez `transform: translateX(calc(var(--ms3-pos) * 1%))` na kontenerze o
  `width: 100%`. Implementacyjnie najprościej: kontener wskazówki `.ms3-needle-track` ma
  `width: 100%`, a wewnętrzny trójkąt `left: var(--ms3-pos)%` z `transform: translateX(-50%)`.
  **Ustalone: przesuwamy przez `style.setProperty('--ms3-pos', pct)`, a CSS robi resztę.**
  Jedna właściwość na próbkę, jeden odczyt zmiennej.
* Budżet zapisów do DOM na jedną próbkę (co 200 ms): 1 zmienna wskazówki głównej + 6 zmiennych
  mikroskal + 1 duży `textContent` + 6 małych + 1 stempel + 1 pasek śladu ≈ **16 zapisów**,
  czyli 80 operacji na sekundę. Na tanim Androidzie to nic.

### 6.2 Mikroskala

Jak 5.4. Pozycja z tej samej `Scale.pos`. Pasma generowane raz przy budowie wiersza
i przy `engine:thresholds`.

### 6.3 Rejestrator (moduł 01) — taśma

* **Technika: `<canvas>` 2D.** Jedyne miejsce w aplikacji z canvasem.
* `devicePixelRatio` **ograniczony do 2** (`Math.min(2, dpr)`); szerokość i wysokość ustawiane
  z `getBoundingClientRect()`, kontekst skalowany `ctx.scale(dpr, dpr)`.
* Przerysowanie: przy `engine:history`, przy zmianie zakresu, przy zmianie kanału, przy
  `resize`/`orientationchange` (z `debounce` 150 ms) oraz **maksymalnie raz na sekundę** podczas
  pomiaru. **Żadnego `requestAnimationFrame` w pętli.**
* Zatrzymanie rysowania przy `document.visibilityState === 'hidden'`; przerysowanie po powrocie.
* Znana pułapka z v2 (komentarz `ui-core.js:22-25`): canvas w ukrytym panelu ma szerokość 0.
  Rysujemy **dopiero** po pokazaniu modułu i sprawdzamy `if (w < 2) return;`.

Źródła danych według zakresu:

| Zakres | Źródło | Punktów | Forma |
|---|---|---|---|
| 60 s | `Engine.buffer(60000)` | ~300 (5 Hz) | łamana 2 px |
| 15 min | `Engine.history({sinceMs: 900000, maxPoints: szerokość})` | ≤ szer. w px | łamana 2 px |
| 1 godz | `Engine.history({sinceMs: 3600000, maxPoints: szerokość})` | ≤ szer. w px | łamana 2 px |
| 24 godz | `Engine.history({sinceMs: 86400000})` → agregacja do 72 kubełków po 20 min | 72 | **panorama słupków** |
| 30 dni | `Engine.history({sinceMs: 2592000000})` → agregacja do 30 kubełków dobowych | 30 | **panorama słupków** |

Rysunek taśmy (zakresy ≤ 1 godz):

1. Studnia: prostokąt `--ms3-well`, obrys 1 px `--ms3-rule`.
2. Poziome pasy stref przez całą szerokość, tą samą fakturą co skala (gładko / ukośnie 6 px /
   krzyżowo 5 px), rysowane pętlą `lineTo`, nie obrazkiem.
3. Siatka 1 px `--ms3-hairline` co 1/4 wysokości.
4. Obwiednia min–maks jako wypełnienie 12% krycia (gdy punkty są agregowane).
5. Przebieg: łamana 2 px w kolorze **tuszu** (`--ms3-ink`), **nigdy w kolorze stanu** — barwa ma
   zawsze znaczyć to samo, a tu znaczą ją pasma tła.
6. **Przerwa w danych.** Historia zapisuje się tylko podczas pomiaru, więc taśma bywa dziurawa.
   Odstęp między sąsiednimi punktami większy niż `3 × LONG_STEP_MS` (15 s) **przerywa** łamaną —
   `ctx.moveTo`, nie `lineTo`. Łączenie przez trzydniową dziurę byłoby złamaniem zasady nr 8.
   Nad przerwą podpis 15 px „brak pomiaru".
7. Oś czasu: 4 podpisy 15 px pod studnią. Oś wartości: 3 podpisy 15 px po lewej, **poza polem
   danych**. Podpisy rysowane `ctx.fillText` fontem `15px` z tego samego stosu systemowego.
   Przy `--ms3-scale > 1` rozmiar fontu w canvasie mnożymy tym samym mnożnikiem — inaczej opisy
   osi nie urosną razem z resztą aplikacji (to była wytknięta wada zwycięskiej koncepcji).
8. Alternatywa tekstowa: `canvas` ma `role="img"` i `aria-label` z zakresem, minimum, średnią
   i maksimum, a **pod nim zawsze stoi tabela** (5.12) z tymi samymi danymi.

**Krzyż odczytu** (kradzież z kierunku „Strumień czasu"): pionowa linia 2 px w `--ms3-ink` przez
taśmę, przesuwana przeciąganiem palca **lub** klawiszami ←/→. Chip z godziną nad linią, a pod
taśmą siedem wartości z **tego samego momentu** — `Engine.history()` zwraca komplet siedmiu metryk
w każdym punkcie, więc to jest jeden indeks w tablicy i zero nowej matematyki.
Gest przeciągania: `touch-action: pan-y` na taśmie, martwa strefa 24 px przy lewej krawędzi
(systemowy gest „wstecz"), oraz **dublujące klawisze ‹ › po 48 px** — gest nigdy nie jest jedyną
drogą. Krzyż ma `role="slider"`, `aria-valuetext` z godziną i wartością, aktualizowany
nie częściej niż raz na sekundę.

### 6.4 Panorama słupków (24 godz / 30 dni)

Kradzież z kierunku „Jedna Odpowiedź", w wersji, którą sędziowie kazali przenieść.
**Z `<div>`, nie z canvasu** — dzięki temu działa czytnik ekranu, `forced-colors` i lupa systemowa,
a koszt rysowania jest zerowy.

* Jeden słupek na kubełek: 72 kubełki po 20 min (24 godz) albo 30 kubełków dobowych (30 dni).
* Szerokość słupka `flex: 1`, odstęp 1 px, wyrównanie do dołu, pas wysokości 72 px.
* Strefa kubełka: **liczona z metryki kanału głównego**, nie z `point.zone`
  (`point.zone` to zawsze `share` — pułapka nr 2).
  Kubełek dostaje najgorszą strefę spośród swoich punktów.
* Status kodowany **podwójnie**: barwą **oraz wysokością** — w normie 40%, uwaga 70%,
  krytycznie 100%. Czyta się w skali szarości i na wydruku.
* Kubełek bez danych: kreska 2 px w `--ms3-ink-3` przy linii bazowej, nie pusty słupek.
  Pod panoramą licznik: „Pomiar objął 3 z 24 godzin".
* `role="img"` + `aria-label` typu „Ostatnie 24 godziny: w normie do 20:10, potem ostrzeżenia;
  brak pomiaru przez 19 godzin".
* Ta sama panorama w wersji 12 słupków jest kafelkiem dnia w widoku 30-dniowym.

### 6.5 Mini-przebieg w arkuszu pomocy

240×48 px, `<canvas>`, ta sama rodzina: bez osi, bez siatki, łamana 2 px w `--ms3-ink`,
pasma stref jako tło. Jedna liczba „teraz" obok. Rysowany **raz** przy otwarciu arkusza,
odświeżany co 2 s, nie 5 razy na sekundę.

### 6.6 Statystyka sesji (moduł 01)

* Licznik `00:04:12`, 40 px, `tabular-nums`, z `Engine.session().durationMs`.
* Trzy wiersze rozkładu stref z `session.zones`: nazwa, kształt, procent i poziomy pasek 12 px
  z tą samą fakturą co pasma skali.
* **Uwaga na uczciwość:** `session.zones` liczy strefy metryki wiodącej (`share`), nie tej, którą
  użytkownik ogląda. Podpis mówi to wprost: „Rozkład stref dla udziału niebieskiego".

### 6.7 Budżet rysowania — reguły twarde

1. Zero `requestAnimationFrame` w pętli. Wszystko wisi na `engine:sample` (5 Hz) albo na timerze 1 Hz.
2. Zero `conic-gradient`, zero `box-shadow` z rozmyciem, zero `backdrop-filter`, zero `filter: blur`.
3. W pętli 5 Hz wolno zmieniać wyłącznie: `textContent`, `style.setProperty('--ms3-pos', …)`
   i klasę stanu. Nigdy `background`, `width`, `left` ani `innerHTML`.
4. `canvas` tylko w module 01 i w arkuszu pomocy, DPR ≤ 2, rysowanie wstrzymane przy ukrytej karcie.
5. Pasma i kreski przemalowujemy **wyłącznie** przy zmianie kanału głównego, progów albo motywu.

---
## 7. Zachowania

### 7.1 Stany aplikacji

Stan bierze się **wyłącznie** ze zdarzenia `engine:state`. UI nie zgaduje i nie trzyma własnej
kopii prawdy o kamerze.

| Stan silnika | Dioda | Klawisz główny | Studnia | Monitor | Listwa kanałów |
|---|---|---|---|---|---|
| `idle` przed pierwszym pomiarem | pusty kwadrat `--ms3-ink-3`, „Gotowy" | `▶ Start pomiaru` | `———`, stempel „Brak danych", werdykt 8.2 | rozwinięty, `#cameraPlaceholder` widoczny | nazwy + `———`, znaczniki `--none` |
| `starting` | pusty kwadrat `--ms3-accent`, „Uruchamiam" | `Uruchamiam…`, `aria-busy` | bez zmian | rozwinięty, tekst z silnika | bez zmian |
| `running`, pierwsze 3 s | pełny `--ms3-good`, „Pomiar 00:00:02" | `■ Stop` | **liczby idą od pierwszej próbki**, werdykt „Ustalam ocenę…" | zwija się do 96×96 | wartości idą |
| `running` po 3 s | jw. | jw. | pełny odczyt + werdykt | zwinięty | pełne |
| `idle` po zatrzymaniu | pusty kwadrat, „Zatrzymany" | `▶ Start pomiaru` | ostatnia wartość **zamrożona**, stempel bez zmian, pod werdyktem linijka podsumowania 8.5 | rozwija się | wartości zamrożone, przygaszone (`opacity: .72`) |
| `error` | pełny `--ms3-crit`, „Błąd kamery" | `▶ Start pomiaru` | `———` | rozwinięty, komunikat silnika | `———` |

Rozgrzewka 3 s: **liczby lecą od pierwszej próbki** (to prawdziwy pomiar i przyrząd nie ma prawa
go ukrywać), ale **werdykt czeka**. Migotanie i tak potrzebuje 8 próbek (`Metrics.flicker` zwraca
`null` poniżej ośmiu), czyli 1,6 s; 3 s daje zapas i automatyce ekspozycji czas na zbieżność.
Pod listwą stanu przez te 3 s biegnie linia postępu.

### 7.2 Werdykt — reguła, która go produkuje

To jest jedyne miejsce w v3 z własną logiką redakcyjną. Musi być opisane, bo inaczej czterech
programistów napisze cztery różne aplikacje.

**Werdykt bierze pod uwagę wszystkie siedem metryk**, bo wszystkie siedem jest mierzone
i pokazywane każdemu. Nic w tej aplikacji nie zależy od wpłaty.

```js
/* verdict.js (part of scale.js). Pure: takes a reading, returns a sentence id. */

// 1. Severity of one metric. 0 = fine, 1..2 = warning band, 2..3 = past critical.
function severity(id, value, t, m) {
  if (value === null || !isFinite(value)) return null;      // unmeasured: no opinion
  var zone = Metrics.zoneFor(value, t.warn, t.crit, m.invert);
  if (zone === 'good') return 0;
  var spanW = Math.abs(t.crit - t.warn) || 1;
  var over = m.invert ? (t.warn - value) : (value - t.warn);
  return Math.min(3, 1 + over / spanW);
}

// 2. Worst zone across every measured metric; culprit = highest severity,
//    ties resolved by catalogue order (share first).
// 3. HYSTERESIS: the displayed zone changes only after the candidate zone has
//    held for 20 consecutive samples (4 s at 5 Hz). The culprit inside one zone
//    may change, but at most once per 2 s.
// 4. For the first 3 s of a session the verdict is "Ustalam ocenę…".
```

Zdanie składamy z tabeli 8.3, **kluczem `[strefa][id winowajcy]`**. Żadnej odmiany przez przypadki,
żadnego sklejania nazw z katalogu w środku zdania — polska fleksja bez słownika daje błędy, a błąd
gramatyczny w tej aplikacji kosztuje zaufanie. Zdania są napisane ręcznie i skończone.

Werdykt **nigdy nie zawiera liczby** — zdania z 8.3 nie zawierają liczb w ogóle, bo werdykt jest
zdaniem, a nie odczytem. Jest to celowe i nie wolno tego „ulepszyć".

### 7.3 Przełączanie kanału głównego

1. Dotknięcie wiersza (wolnego) → kanał wchodzi do studni, poprzedni wraca do listwy na swoje
   miejsce w kolejności katalogu.
2. Ekran się **nie zmienia**. Nie ma przejścia, nie ma nawigacji, nie ma wpisu w historii wstecz.
3. Studnia przemalowuje pasma, podpisy i legendę raz; wskazówka przechodzi na nową pozycję
   w 120 ms liniowo.
4. `#ms3Live` dostaje: „Kanał główny: Temperatura barwowa, 4200 kelwinów, uwaga".
5. Wybór zapamiętujemy w `localStorage` pod `ms3.settings.v1` → `leadChannel`.

### 7.4 Ruch

| Co | Czas | Krzywa |
|---|---|---|
| wskazówka skali i mikroskali | 120 ms | `linear` — przyrząd nie podskakuje |
| wciśnięcie klawisza (tło) | 90 ms | `linear` |
| zwijanie/rozwijanie monitora kamery | 200 ms | `cubic-bezier(.2,0,0,1)` |
| wejście modułu (`translateY(8px)` + `opacity`) | 160 ms | `cubic-bezier(.2,0,0,1)` |
| wsunięcie bloku Errata | 140 ms | `cubic-bezier(.2,0,0,1)` |
| arkusz od dołu | 200 ms | `cubic-bezier(.2,0,0,1)` |

**Cyfry nie animują wartości nigdy.** Nie ma „naliczania", nie ma `count-up`, nie ma przenikania
liczby. Wartość się podmienia.

`prefers-reduced-motion: reduce` → wszystkie czasy schodzą do 1 ms (nie 0 — `transitionend` musi
nadal zadziałać), wskazówka skacze, moduły pojawiają się natychmiast, linia postępu rozgrzewki
skacze co 1 s. Ustawienie „Ogranicz ruch" w module 12 robi to samo niezależnie od systemu
(ustawia `data-motion="reduced"` na `<html>`).

Nic nie miga i nic nie pulsuje w żadnym trybie — w aplikacji o zmęczeniu wzroku to byłoby
niesmaczne. Dioda stanu jest statyczna.

### 7.5 Fokus i klawiatura

* Kolejność `Tab`: listwa stanu → studnia (klawisz „?") → listwa kanałów (jeden przystanek,
  roving tabindex) → monitor kamery → pulpit sterowania (Start → Obróć → Menu).
  **Pulpit sterowania jest w DOM ostatni, więc jest ostatni w kolejności czytania** — to celowe:
  najczęściej używany klawisz osiąga się `Shift+Tab` z dowolnego miejsca jednym ruchem.
* Wewnątrz listwy kanałów: ↑/↓ przesuwają fokus, `Home`/`End` na skraje, `Enter`/`Spacja` wybierają.
* Wewnątrz taśmy rejestratora: ←/→ przesuwają krzyż o punkt, `Shift+←/→` o ekran, `Home` = najstarszy,
  `End` = teraz.
* **Nie ma skrótów jednoliterowych.** Aplikacja dla osoby starszej nie zakłada znajomości skrótów,
  a przypadkowe „s" nie może zatrzymać pomiaru.
* Pierścień fokusu: 3 px `--ms3-focus`, odstęp 2 px, plus 1 px wewnętrzna linia w kolorze panelu
  na klawiszach wypełnionych. Zawsze `:focus-visible`, nigdy `outline: none` bez zamiennika.
* Moduł i arkusz łapią fokus (`aria-modal="true"`), `Tab` krąży w środku, `Escape` zamyka, fokus
  wraca na element otwierający.

### 7.6 ARIA i czytnik ekranu

* `#ms3Live` — `aria-live="polite"`, `aria-atomic="true"`, klasa `.ms3-sr` (poza ekranem, ale nie
  `display:none`). Aktualizowany **najwyżej raz na 2 sekundy** i tylko przy:
  zmianie strefy werdyktu, zmianie kanału głównego, starcie i zatrzymaniu pomiaru,
  zakończeniu rozgrzewki. **Nigdy strumieniem liczb** — czytnik zostałby zalany.
* `engine:error` → `#ms3Errata` z `role="alert"` (assertive). To jedyne miejsce z `assertive`.
* Wielka liczba **nie** jest w regionie live. Osoba korzystająca z czytnika dostaje zdanie
  z `#ms3Live` oraz pełne dane z tabeli w module 01.
* Każdy wykres ma `role="img"` i `aria-label` ze streszczeniem liczbowym, a pod nim tabelaryczny
  odpowiednik.
* Nazwy dostępne wierszy kanałów mówią, **co się stanie**: „…Pokaż na dużym wyświetlaczu".
* Znak `≈` jest `aria-hidden`; przybliżenie wchodzi do nazwy dostępnej słowem „wartość przybliżona".
* `lang="pl"` na `<html>`. `<title>` = „Monitor Światła".

### 7.7 Trwałość i ustawienia

Klucz `ms3.settings.v1` w `localStorage`, jeden obiekt:
`{ theme: 'system'|'light'|'dark', textScale: 1|1.15|1.3, motion: 'system'|'reduced',
leadChannel: 'share', firstRunDone: false, lastRange: '60s' }`.
Każdy dostęp w `try/catch` — tryb prywatny rzuca wyjątkiem także przy odczycie.
Klucze silnika (`ms2.history.v1`, `ms2.thresholds.v1`, `ms2.session.v1`, `ms2.calibration.v1`)
zostają **bez zmian nazw** — historia i progi użytkownika przechodzą z v2 do v3 same z siebie.
Klucz `ms3.entitlement.v1` po symulowanych uprawnieniach i symulowanym koncie już nie istnieje;
`support.js` kasuje go przy starcie i nie zapisuje w to miejsce niczego.

### 7.8 Reguły, których nie wolno złamać w kodzie

1. Nic nie zapisuje do `#cameraPlaceholderText` poza silnikiem.
2. Nic nie ustawia `disabled` na klawiszach pomiaru poza `dash.js`.
3. Nic nie woła `Engine.start()` automatycznie. Pomiar zaczyna wyłącznie człowiek.
4. Zatrzymanie pomiaru nie otwiera żadnego okna ani prośby o wsparcie. Pomiar kończy się cicho.
5. Żaden moduł nie renderuje się nad pulpitem sterowania.

---

## 8. Teksty polskie — gotowe brzmienia

Wszystkie napisy są tutaj. Nie wymyślamy własnych w kodzie. Teksty przeniesione z v2 są oznaczone
„(z v2)" i mają zostać dosłownie — były już czytane i sprawdzane.

### 8.1 Listwa stanu i klawisze

| Element | Tekst |
|---|---|
| Nazwa aplikacji | `MONITOR ŚWIATŁA` |
| Stan: bezczynny, przed pomiarem | `Gotowy` |
| Stan: uruchamianie | `Uruchamiam` |
| Stan: pomiar | `Pomiar 00:04:12` |
| Stan: zatrzymany | `Zatrzymany` |
| Stan: błąd | `Błąd kamery` |
| Częstotliwość | `5,0 Hz` |
| Klawisz główny, spoczynek | `Start pomiaru` |
| Klawisz główny, uruchamianie | `Uruchamiam…` |
| Klawisz główny, pomiar | `Stop` |
| Klawisz kamery | `Obróć` (aria: „Przełącz kamerę przód/tył") |
| Klawisz menu | `Menu` (aria: „Spis modułów") |
| Klawisz powrotu | `‹ Wróć` (aria: „Wróć do pulpitu") |
| Klawisz w żywym pasku | `Pulpit` |
| Monitor kamery, legenda | `Podgląd kontrolny` |
| Monitor kamery, plakietka | `Na żywo` |
| Klawisz powiększenia | `Powiększ podgląd` |

### 8.2 Studnia odczytu

| Sytuacja | Stempel | Werdykt |
|---|---|---|
| przed pierwszym pomiarem | `— Brak danych` | `Naciśnij „Start pomiaru", skieruj telefon na oświetloną powierzchnię i trzymaj nieruchomo kilka sekund.` |
| pierwsze 3 s pomiaru | `— Ustalam` | `Ustalam ocenę — trzymaj telefon nieruchomo jeszcze chwilę.` |
| kanał główny bez wartości mimo pomiaru | `— Brak danych` | `Ta wielkość nie daje się teraz zmierzyć. Sprawdź, czy obiektyw nie jest zasłonięty.` |
| pomiar zatrzymany | bez zmian | `Pomiar zakończony · 4 min 12 s · zapisano w historii.` |

Stemple stanu: `W normie` / `Uwaga` / `Krytycznie`, zawsze z progiem w nawiasie,
np. `Uwaga (próg 26%)`.

Legendy: `Kanał główny`, nazwa metryki z katalogu.
Wiersz kontekstu: `min 21 · śr. 24 · maks 29 — ostatnie 60 s`.
Przy braku danych: `brak danych z ostatnich 60 s`.

### 8.3 Werdykty — pełna tabela zdań

Klucz: `[strefa][id winowajcy]`. Zdania są skończone, w mianowniku, bez wstawianych liczb.

**Strefa `good`** (bez winowajcy) — jedno zdanie, wybierane po kanale głównym:

| Kanał główny | Zdanie |
|---|---|
| dowolny | `To światło jest w porządku — nic nie przekracza ustawionych progów.` |

**Strefa `warning`:**

| Winowajca | Zdanie |
|---|---|
| `share` | `Sporo tego światła przypada na kanał niebieski. Wieczorem warto je przyciemnić.` |
| `brightness` | `Scena jest jasna — kamera pracuje blisko górnej granicy pomiaru.` |
| `kelvin` | `Światło jest dość chłodne. Wieczorem łagodniejsza bywa żarówka około 2700 K.` |
| `melanopic` | `To światło dość mocno działa na zegar biologiczny.` |
| `flicker` | `Źródło światła wyraźnie pulsuje.` |
| `uniformity` | `Światło rozkłada się nierówno w kadrze.` |
| `comfort` | `Komfort wzrokowy jest obniżony — złożyło się na to kilka rzeczy naraz.` |

**Strefa `critical`:**

| Winowajca | Zdanie |
|---|---|
| `share` | `Bardzo dużo niebieskiego. Wieczorem włącz tryb nocny albo zmień źródło światła.` |
| `brightness` | `Scena jest bardzo jasna. Nie mierz, patrząc prosto w źródło światła.` |
| `kelvin` | `Światło jest zimne. Wieczorem to najbardziej męczy oczy — cieplejsza żarówka albo tryb nocny pomogą.` |
| `melanopic` | `To światło mocno działa na zegar biologiczny. Wieczorem warto zejść poniżej 0,50.` |
| `flicker` | `Źródło światła mocno pulsuje. To bywa przyczyną zmęczenia oczu i bólu głowy.` |
| `uniformity` | `Światło rozkłada się bardzo nierówno. Sprawdź ustawienie lampy albo odbicia na ekranie.` |
| `comfort` | `Komfort wzrokowy jest niski. Zajrzyj do modułu 01, żeby zobaczyć, co go obniża.` |

### 8.4 Noty o granicach pomiaru

**Nota stała na Pulpicie** (nigdy nie znika, nie zwija się) — nadtytuł `Czym ten pomiar nie jest`,
treść **(z v2, dosłownie)**:

> Aparat telefonu ma trzy szerokie kanały barwne i automatyczny balans bieli — nie mierzy widma.
> Temperatura barwowa i wpływ na rytm dobowy są przybliżeniami wyliczonymi z barw sRGB. Aplikacja
> dobrze pokazuje różnice i zmiany w czasie, nie zastępuje miernika i nie stawia żadnej diagnozy.
> Monitor Światła nie jest wyrobem medycznym w rozumieniu rozporządzenia (UE) 2017/745, nie służy
> do diagnozowania, zapobiegania, monitorowania ani leczenia jakiegokolwiek stanu chorobowego
> i nie zastępuje badania u lekarza ani optometrysty.

**Legenda przybliżenia** (pod studnią, gdy kanał główny to `kelvin` albo `melanopic`):

> ≈ wartość przybliżona — wyliczona z barw sRGB, nie z pomiaru widma.

**Poza zakresem metody** (gdy `kelvinReliable === false`):

> Poza zakresem metody — przy tej barwie wzór na temperaturę barwową przestaje być wiarygodny.

**Poza zakresem metody** (gdy `flickerWithinRange === false`):

> Poza zakresem metody — próbkowanie 5 Hz widzi pulsowanie tylko poniżej 2,5 Hz. Sieciowe 100 Hz
> jest poza zasięgiem i aplikacja nigdy nie poda go jako wyniku.

**Nota w arkuszu pomocy** — nadtytuł `Czego ta liczba nie mówi`, treść **(z v2, dosłownie)**:

> Aparat telefonu ma trzy szerokie kanały i nie mierzy widma. Ta wartość jest wskaźnikiem
> porównawczym — dobrze pokazuje różnice między światłami i zmiany w czasie, a nie wynikiem
> pomiaru laboratoryjnego ani informacją medyczną.

**Nota o kalibracji** (z v2): `Pomiar bez kalibracji — wartości traktuj porównawczo.`

**Jak mierzyć sensownie** (moduł 11, z v2, dosłownie):

1. `Trzymaj telefon nieruchomo` — Automatyka ekspozycji potrzebuje 2–3 sekund, żeby się ustabilizować.
2. `Kieruj na oświetloną powierzchnię` — Biała kartka albo jasna ściana. Nie mierz, patrząc prosto
   w źródło światła.
3. `Porównuj, nie oceniaj bezwzględnie` — Ta sama scena przed zmianą i po zmianie oświetlenia mówi
   więcej niż jedna liczba.

### 8.5 Komunikaty przejściowe

| Sytuacja | Tekst |
|---|---|
| pierwsze uruchomienie (nota, nie toast) | `Zacznij od klawisza „Start pomiaru" na dole ekranu. Kamera włączy się dopiero po naciśnięciu.` |
| zatrzymanie pomiaru | `Pomiar zakończony · 4 min 12 s · zapisano w historii.` |
| zmiana kanału (region live) | `Kanał główny: Temperatura barwowa, 4200 kelwinów, uwaga.` |
| koniec rozgrzewki (region live) | `Ocena gotowa. Udział niebieskiego 27 procent, uwaga.` |
| nowa wersja aplikacji | `Jest nowa wersja aplikacji.` + klawisz `Odśwież` (z v2) |
| zapisano progi | `Zapisano progi.` |
| odrzucono progi | `Nie zapisano — próg uwagi i próg krytyczny nie mogą się mijać.` |
| wyczyszczono historię | `Wyczyszczono historię.` |

Błędy kamery: **bierzemy dosłownie `engine:error.messagePL`.** Silnik ma pięć gotowych tekstów
(brak zgody, brak kamery, kamera zajęta, nieznany błąd, brak wsparcia w przeglądarce).
Nie piszemy własnych.

### 8.6 Puste ekrany

| Ekran | Tekst |
|---|---|
| Rejestrator, brak historii | `Nie ma jeszcze żadnych zapisów. Historia zapisuje się w trakcie pomiaru — uruchom pomiar na minutę i wróć tutaj.` |
| Rejestrator, zakres bez danych | `W tym zakresie nie było pomiaru.` |
| Panorama z dziurami (podpis) | `Pomiar objął 3 z 24 godzin.` |
| Raporty, brak danych | `Raport dobowy powstanie po pierwszym pełnym dniu z pomiarami.` |
| Porównanie, jedna sesja | `Do porównania potrzebne są dwie zakończone sesje. Masz na razie jedną.` |
| Eksport, brak danych | `Nie ma czego wyeksportować. Uruchom pomiar, żeby historia miała treść.` |
| Alerty, wyłączone | `Alerty są wyłączone. Po włączeniu zadziałają tylko wtedy, gdy aplikacja jest otwarta.` |
| Harmonogram, pusty | `Nie ustawiono żadnej pory. Harmonogram działa tylko przy otwartej aplikacji.` |
| Historia wyczyszczona | `Historia jest pusta.` |

### 8.7 Ekran „Wsparcie" (moduł 10)

Cztery rzeczy, krótko, w tej kolejności — i ani jednej więcej:

1. **Co aplikacja daje za darmo.** Wszystkie siedem wielkości, historia, rejestrator, progi,
   raporty, eksport i tryb offline — bez konta, bez opłat i bez limitów.
2. **Dlaczego pada prośba.** Utrzymanie i rozwój, bez dramatyzowania i bez straszenia, że coś
   przestanie działać.
3. **Co darowizna daje.** Zdanie obowiązkowe, wprost:

   > Nic. Żadna liczba, żaden moduł i żadne ustawienie nie odblokowują się po darowiźnie,
   > bo wszystko jest odblokowane od początku.

4. **Klawisz** i przy nim zdanie obowiązkowe o prywatności:

   > Naciśnięcie tego klawisza otwiera stronę zewnętrzną w nowej karcie i jest to jedyny moment,
   > w którym cokolwiek opuszcza to urządzenie.

Adres profilu to jedna stała `SUPPORT_URL` na górze `support.js`. Buy Me a Coffee jest jedyną
formą wsparcia w tej aplikacji, więc walidacja jest zawężona do tego serwisu: przyjmujemy wyłącznie
adres ze schematem `https://` na hoście `buymeacoffee.com` albo `www.buymeacoffee.com`, a każdy
inny liczy się jak brak adresu. **Przy pustej stałej ekran istnieje i wygląda normalnie**,
w miejscu klawisza stoi spokojne zdanie, że profil nie jest jeszcze podłączony, i **nie renderuje
się żaden odnośnik**. Odnośnik jest zwykłym `<a target="_blank" rel="noopener noreferrer">`
z klawiszem `--ghost`; kubek rysujemy kształtami CSS jak każdą inną ikonę. Żadnego widżetu,
skryptu ani obrazka z serwera Buy Me a Coffee — złamałoby to zasadę 16 z rozdziału 10
i tryb offline.

Czego na tym ekranie nie ma: odliczania, „zostało X dni", kwot udających koszyk, licznika wpłat,
wyskakujących próśb, przerywników i ani jednego słowa sugerującego, że coś w tej aplikacji jest
płatne albo zamknięte. Prośba pojawia się wyłącznie wtedy, gdy użytkownik sam otworzy ten moduł
ze spisu.

### 8.8 Spis modułów — opisy jednym zdaniem

| Nr | Nazwa | Opis |
|---|---|---|
| 01 | Rejestrator | Przebieg pomiaru w czasie, od minuty do trzydziestu dni. |
| 02 | Progi | Ustaw własne granice ostrzeżenia i alarmu dla każdej wielkości. |
| 03 | Kalibracja | Odniesienie do znanego źródła światła i to, czego kalibracja nie naprawi. |
| 04 | Raporty | Zestawienia dobowe i tygodniowe w formie wydruku. |
| 05 | Eksport | Zapis odczytów do pliku CSV lub JSON z opisem kolumn. |
| 06 | Porównanie | Dwie sesje obok siebie, z różnicą podaną liczbowo. |
| 07 | Test ekranu | Plansze do sprawdzenia własnego monitora, krok po kroku. |
| 08 | Harmonogram | Automatyczne pomiary o zadanych porach. |
| 09 | Alerty | Powiadomienie po przekroczeniu progu — i kiedy ono nie zadziała. |
| 10 | Wsparcie | Aplikacja jest w całości darmowa. Tu można postawić kawę autorowi. |
| 11 | Dokumentacja | Czym ten pomiar jest, a czym na pewno nie jest. |
| 12 | Ustawienia | Motyw, rozmiar tekstu, ograniczenie ruchu, czyszczenie historii. |

### 8.9 Zasady języka

* Zwracamy się przez „ty" i tryb rozkazujący („Naciśnij", „Trzymaj", „Sprawdź").
* Nie używamy słów: „diagnoza", „zdrowe/niezdrowe światło", „bezpieczny poziom", „norma medyczna",
  „ekspert", „profesjonalny pomiar", „luksy".
* Nie obiecujemy skutku („poprawi sen"), opisujemy obserwację („to światło mocno działa na
  zegar biologiczny").
* Jednostki po polsku: `%`, `K`, `×`, `pkt`. Przecinek dziesiętny — daje go `Metrics.formatValue`.
* Cudzysłowy polskie: „ ".
* Wersaliki: maksymalnie dwa słowa i nigdy jedyny opis elementu.

---

## 9. Pliki v3 i kontrakt między nimi

### 9.1 Lista plików

| Plik | Właściciel | Rządzi |
|---|---|---|
| `docs/v3/index.html` | integrator | powłoka DOM z 4.7, kolejność `<script>`, `lang="pl"`, meta viewport z `viewport-fit=cover` |
| `docs/v3/tokens.css` | P1 | **wyłącznie** `:root` i motywy z rozdziału 2. Ani jednego selektora elementu |
| `docs/v3/base.css` | P1 | reset, `body`, siatka powłoki, fokus, `prefers-reduced-motion`, klasa `.ms3-sr`, mnożnik `--ms3-scale` |
| `docs/v3/components.css` | P1 | wszystkie klasy `ms3-*` z rozdziału 5 |
| `docs/shared/bus.js` | P1 | `window.Bus` (`on`/`once`/`emit` — świadomie bez `off` i `names`; wypisuje się funkcją zwróconą przez `on`/`once`). Musi istnieć **przed** `engine.js`. **Plik wspólny z v4** |
| `docs/shared/metrics.js` | — | **plik wspólny z v2 i v4** — jedna kopia dla trzech wersji, nie trzy identyczne |
| `docs/shared/engine.js` | — | **plik wspólny z v2 i v4** — j.w. |
| `docs/shared/scale-core.js` | P2 | `window.Scale`: `pos`, `bands`, `zone`, `severity`, `verdict`, `formatFor`. Czysta matematyka, zero DOM; teksty czyta z `Scale.TEXT` dopiero w chwili wywołania. **Plik wspólny z v4** |
| `docs/v3/scale.js` | P2 | dokłada do tego samego `window.Scale` słownik `Scale.TEXT` — napisy tej wersji, z natury nie do współdzielenia |
| `docs/v3/shell.js` | P2 | `window.UI3`: powłoka, ekrany, arkusze, żywy pasek, fokus, region live, ustawienia, motyw |
| `docs/v3/dash.js` | P3 | Pulpit: studnia, listwa kanałów, pulpit sterowania, monitor kamery, Errata. Jedyny plik, który słucha `engine:sample` |
| `docs/v3/recorder.js` | P3 | moduł 01: taśma, panorama, krzyż odczytu, statystyka sesji, tabela |
| `docs/v3/modules.js` | P4 | moduły 02–09 |
| `docs/v3/support.js` | P4 | moduł 10 (Wsparcie) — stała `SUPPORT_URL` i jeden odnośnik |
| `docs/v3/docs.js` | P4 | moduły 12–13 |
| `docs/v3/boot.js` | integrator | spis modułów, rejestracja SW, pierwsze uruchomienie |
| `docs/v3/sw.js` | integrator | cache pełnej listy plików, `CACHE_NAME` **podbijany przy każdej zmianie** |
| `docs/v3/manifest.webmanifest` | integrator | `start_url: "./"`, `scope: "./"`, nazwa „Monitor Światła" |

### 9.2 Kolejność ładowania (wiążąca)

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="base.css">
<link rel="stylesheet" href="components.css">
…
<script src="../shared/bus.js"></script>         <!-- Bus must exist before engine.js binds -->
<script src="../shared/metrics.js"></script>     <!-- window.Metrics -->
<script src="../shared/scale-core.js"></script>  <!-- window.Scale, needs Metrics -->
<script src="scale.js"></script>                 <!-- Scale.TEXT, dokłada do window.Scale -->
<script src="shell.js"></script>                 <!-- window.UI3, builds the DOM shell -->
<script src="../shared/engine.js"></script>      <!-- window.Engine, needs Bus + Metrics + #cameraVideo -->
<script src="dash.js"></script>
<script src="recorder.js"></script>
<script src="modules.js"></script>
<script src="support.js"></script>               <!-- moduł 10: Wsparcie -->
<script src="docs.js"></script>
<script src="boot.js"></script>     <!-- last, always -->
```

Cztery pliki z `../shared/` są **wspólne z v2 i v4** (opis w `docs/shared/README.md`).
Zmiana w którymkolwiek z nich dotyka trzech wersji naraz, więc trzeba wtedy podbić
`CACHE` w `docs/v2/sw.js`, `docs/v3/sw.js` i `docs/v4/sw.js`. Lokalny `scale.js` idzie
**po** `scale-core.js`: rdzeń tworzy `window.Scale`, lokalny plik dokłada do tego samego
obiektu `Scale.TEXT`. Funkcje rdzenia sięgają po `Scale.TEXT` dopiero w chwili wywołania,
więc taka kolejność wystarcza.

`shell.js` idzie **przed** `engine.js`, bo silnik szuka `#cameraVideo` już przy
`DOMContentLoaded`. Powłokę budujemy w `shell.js` synchronicznie przy parsowaniu (nie czekamy na
`DOMContentLoaded`) albo — prościej i pewniej — **`#cameraVideo`, `#cameraPlaceholder`
i `#cameraPlaceholderText` piszemy wprost w `index.html`**, a `shell.js` tylko je odnajduje.
**Ustalone: piszemy je w `index.html`.** To usuwa całą klasę błędów kolejności.

### 9.3 Kontrakt między plikami

* **Jedno źródło prawdy o kamerze:** `Engine`. Nikt nie trzyma własnego `isRunning`.
* **Jedno źródło prawdy o geometrii:** `Scale`. Nikt nie liczy procentów samodzielnie.
* **Jedno źródło prawdy o tekstach:** rozdział 8, zaimplementowany jako tablica w `scale.js`
  (`Scale.TEXT`). `dash.js` i moduły biorą stamtąd, nie wpisują literałów.
  Wyjątek dopuszczony świadomie: teksty, których rozdział 8 nie opisuje, bo dotyczą ekranów
  spoza tabeli 8.1–8.8 (moduły 10–13), wolno **zarejestrować** do `Scale.TEXT` z pliku modułu —
  jednym blokiem `installText()` na górze pliku, pod własnym kluczem (`Scale.TEXT.offer`,
  `Scale.TEXT.docs`), bez nadpisywania istniejących kluczy. Czytane są tak samo, przez `T()`.
  Zasada „zero literałów rozsianych po kodzie" zostaje w mocy: blok rejestrujący jest jeden
  i jest pierwszą rzeczą w pliku.
* **Kto słucha `engine:sample`:** wyłącznie `dash.js`. Moduły dostają dane przez
  `UI3.onLive(cb)` — jedno wpięcie, jeden throttling. Żywy pasek aktualizuje `shell.js`
  z tego samego kanału, co 200 ms, ale renderuje **tylko jeśli jest widoczny**.
* **Kto woła `Engine.start/stop`:** wyłącznie `dash.js`, w reakcji na klawisz. Nikt inny.
* **Kto pisze do `#cameraPlaceholderText`:** wyłącznie `engine.js`.
* **Rejestracja modułu:** `UI3.registerModule({ no: '01', titlePL: 'Rejestrator', descPL: '…',
  build: function (root) { … } })`. Spis modułów buduje się z rejestru, nie z listy wpisanej ręcznie.
  `build` woła się **raz**, przy pierwszym otwarciu (leniwie); moduł dostaje `root` już widoczny,
  więc `canvas` ma niezerową szerokość.
* **`UI3.openScreen(no)` / `UI3.closeScreen()` / `UI3.openSheet(id, opts)`** — jedyne wejścia
  do nawigacji. Nikt nie manipuluje `hidden` cudzych ekranów.
* **Motyw i rozmiar tekstu:** `UI3.setTheme()` / `UI3.setTextScale()` piszą atrybuty na `<html>`
  i emitują `ui3:theme`. `recorder.js` przerysowuje canvas na to zdarzenie (kolory z canvasu nie
  zmienią się same).
* **Spis modułów** (`boot.js`) sprawdza obecność: `Bus`, `Metrics`, `Scale`, `UI3`, `Engine`.
  Brak któregokolwiek → komunikat po polsku **na ekranie**, nie w konsoli, i informacja, co
  przestaje działać (wzorzec z `boot.js` v2).

### 9.4 Service worker

`sw.js` cachuje dokładnie listę z 9.1 plus ikony. `CACHE_NAME` zawiera datę i numer —
**podbijany przy każdej zmianie dowolnego pliku**. Strategia: cache-first dla zasobów,
network-first dla `index.html`. Po instalacji nowej wersji `boot.js` pokazuje toast
„Jest nowa wersja aplikacji." z klawiszem „Odśwież" i **nigdy nie przeładowuje sam** — przeładowanie
w trakcie pomiaru wyrzuciłoby sesję.

Uwaga z pamięci projektu: stary service worker potrafi serwować poprzednią wersję mimo poprawnych
plików na dysku. Przy testach v3 najpierw wyrejestruj SW v2 albo otwórz w oknie prywatnym.

---

## 10. Czego NIE robimy w v3 — świadomie odrzucone

1. **Nie ma pierścieni ani tarcz zegarowych.** `conic-gradient` nie występuje w arkuszach. Położenie
   na prostej czyta się bezwzględnie; kąt na łuku trzeba szacować, co przy zaćmie i AMD jest
   praktycznie niewykonalne.
2. **Nie ma siatki kafelków.** Skanowanie 2D zamieniamy na 1D. Cel dotykowy rośnie z ok. 170×64 px
   do ok. 328×56 px na całą szerokość.
3. **Nie ma dolnego paska pięciu zakładek.** Zamiast tego jeden ekran roboczy i numerowane moduły.
4. **Nie ma cieni rzuconych.** `box-shadow` występuje wyłącznie jako `inset` grawerunku.
   Przy 300% powiększenia rozmyty cień czyta się jak brud.
5. **Nie ma promieni powyżej 3 px, pigułek i okręgów** poza kropką znacznika stanu.
6. **Nie ma animacji wartości.** Żadnego naliczania, przenikania cyfr ani „licznika".
7. **Nie ma szrafury w mikroskali.** Na paśmie 6 px wzór o skoku 5–6 px zlewa się w szarą papkę
   i daje morę przy DPR 2,75. Udawanie, że działa, byłoby gorsze niż jego brak.
8. **Nie ma szeryfów.** Rozważany kierunek „Jasny Raport" miał je jako sygnaturę; odrzucamy, bo na
   tanim ekranie o niskiej gęstości i przy dużym powiększeniu rozmywają się dokładnie u tego
   odbiorcy, dla którego to robimy. Stos wyłącznie systemowy, bezszeryfowy.
9. **Nie ma monospace.** Przecinek dziesiętny w monospace dostaje pełną kratkę i „1,18" czyta się
   jak „1, 18". Zamiast tego `font-variant-numeric: tabular-nums`.
10. **Nie ma pełnoekranowej płyty w barwie werdyktu** (kierunek „Jedna Odpowiedź"). Czerwony ekran
    utrzymujący się kilka minut jest emocjonalnie męczący i uczy ignorowania ostrzeżeń — zwykła
    lampa 6000 K wpadałaby w czerwień prawie zawsze. Werdykt jest zdaniem, nie tłem.
11. **Nie ma taśmy sejsmografu jako ekranu głównego** (kierunek „Strumień czasu"). Wykres liniowy
    jest jednym z najtrudniejszych typów grafiki dla osób o niskiej biegłości wykresowej, a pytanie
    użytkownika brzmi „jak jest teraz", nie „jak było przez minutę". Przebieg mieszka w module 01.
12. **Nie ma gestu jako jedynej drogi.** Każde przeciągnięcie ma dublujący klawisz ≥48 px.
13. **Nie ma warstwy zgodności `ms-*`.** `ui-core.js` i `tools.js` z v2 **nie są
    ładowane**. Jedna nieprzestylowana klasa `ms-*` pokazałaby zaokrąglony róg i cień, czyli złamała
    dwie zasady naczelne naraz. Moduły 02–13 piszemy w `ms3-*` od nowa, korzystając z tekstów v2.
14. **Nie ma trzeciego poziomu nawigacji.** Moduł nie otwiera modułu.
15. **Nie ma reklamy, prośby o wpłatę ani konta nad pulpitem sterowania.** Prośba o wsparcie
    mieszka w module 10 i nigdzie indziej; wymuszone kolejnością w DOM.
16. **Nie ma czcionek z sieci, bibliotek zewnętrznych ani build-stepu.** Poza własnym
    katalogiem v3 sięga wyłącznie po `../icons/` i po cztery pliki kodu wspólnego
    z `../shared/` — nic więcej.
17. **Nie ma tekstu poniżej 15 px.** Stopień 13 px (`--ms-t-cap` z v2) nie istnieje.
18. **Nie ma migania i pulsowania** w żadnym trybie, także dioda stanu i plakietka „Na żywo".

---

## Załącznik A — lista kontrolna odbioru

Programista nie oddaje zadania, dopóki wszystkie punkty nie są prawdziwe:

- [ ] `index.html` wczytuje `metrics.js`, `engine.js`, `bus.js` i `scale-core.js`
      z `../shared/`, a nie z własnego katalogu — w `docs/v3/` nie ma ich kopii.
- [ ] Na 360×640 widać jednocześnie: wielką liczbę, stempel, werdykt i klawisz START.
- [ ] Klawisza START nie da się zasłonić żadnym arkuszem ani modułem.
- [ ] Wielka liczba nie przesuwa się przy przejściu 9 → 10 ani 99 → 100.
- [ ] W pętli 5 Hz nie zmienia się żadne tło, `width` ani `innerHTML`.
- [ ] `conic-gradient`, `box-shadow` z rozmyciem, `backdrop-filter` i `filter: blur`
      nie występują w żadnym pliku CSS (`grep` pusty).
- [ ] Każdy status ma barwę, kształt i słowo naraz.
- [ ] Oba motywy przechodzą kontrast ≥4,5:1 dla tekstu i ≥3:1 dla linii niosących znaczenie.
- [ ] `prefers-reduced-motion` wyłącza wszystkie przejścia; nic nie miga.
- [ ] Cała aplikacja daje się obsłużyć klawiaturą, a fokus jest zawsze widoczny.
- [ ] Wyłączenie sieci nie zmienia niczego (test w trybie samolotowym).
- [ ] Żadne zdanie w interfejsie nie obiecuje diagnozy ani nie nazywa światła „zdrowym".
