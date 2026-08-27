# Monitor Światła v2 — specyfikacja architektury

Dokument wiążący. Wszystko, co tu zapisano — nazwy obiektów, sygnatury metod,
nazwy zdarzeń, identyfikatory DOM, klucze localStorage — jest **kontraktem**.
Nie wolno ich zmieniać jednostronnie. Jeżeli czegoś brakuje, brak zgłasza się
integratorowi, a nie improwizuje.

> **Zmiana modelu (obowiązuje od tej wersji dokumentu).** Wersja 2 nie ma już
> konta, sklepu, opłat cyklicznych ani reklam. Wszystkie siedem wielkości, cała
> historia, wszystkie narzędzia i tryb offline działają dla każdego, od razu,
> bez żadnego warunku. W miejsce całej dawnej monetyzacji weszła jedna,
> nieinwazyjna warstwa wsparcia: ekran **Wsparcie** z jednym odnośnikiem na
> zewnętrzny profil darowizn. Rozdziały o produktach, cenach, logowaniu,
> bramkowaniu i reklamach zostały usunięte, a nie zarchiwizowane — nie ma już
> kodu, który by je realizował. Darowizna niczego nie odblokowuje, bo nie ma
> czego odblokowywać.

Katalog: `docs/v2/`. Katalog `docs/` (wersja 1) jest **nietykalny** — wolno go
tylko czytać. Jedyny wyjątek: `docs/v2/*` odwołuje się do ikon w
`../icons/*.png` (odczyt przez manifest, bez modyfikacji pliku).

---

## 0. Zasady nadrzędne (obowiązują każdy moduł)

1. **Pomiar jest święty.** Nic w aplikacji nie może zablokować, opóźnić,
   przerwać ani przyciemnić pomiaru. Kamera, wszystkie siedem wielkości,
   wszystkie zakresy wykresu, tabela i progi działają zawsze.
2. **Nic nie jest bramkowane.** `Engine` wylicza i zapisuje wszystkie 7
   wielkości, a interfejs rysuje wszystkie 7. Nie istnieje stan aplikacji,
   w którym którakolwiek z nich jest zasłonięta, rozmyta albo opatrzona
   kłódką — i nie wolno takiego stanu wprowadzić z powrotem.
3. **Jeden adres, jedno miejsce.** Cała warstwa wsparcia to `support.js`,
   a w nim jedna stała `SUPPORT_URL` na samej górze pliku. Pusta stała jest
   stanem normalnym, nie błędem: ekran Wsparcie wygląda wtedy tak samo, tyle
   że zamiast przycisku stoi spokojne zdanie, iż profil nie jest jeszcze
   podłączony. Żaden martwy odnośnik nie jest renderowany. Przyjmowane są
   wyłącznie adresy `https://`.
4. **Prośba nie zaczepia.** Prośba o wsparcie pojawia się wtedy, gdy
   użytkownik sam wejdzie na zakładkę Wsparcie. Poza nią wolno umieścić
   **najwyżej jeden** dyskretny odnośnik (jedno zdanie w stopce ustawień,
   bez grafiki i bez ramki). Zakazane: odliczanie, sztuczna pilność, okna po
   N uruchomieniach, prośby w trakcie pomiaru albo na ekranie wyniku,
   sugerowanie, że bez wsparcia coś przestanie działać.
5. **Zero zależności.** Czysty JS/CSS/HTML, styl zgodny z `metrics.js`
   (IIFE, `var`, bez modułów ES). Zero `fetch`/XHR/WebSocket poza `sw.js`
   cache'ującym własne pliki. Zero czcionek z sieci — systemowy stos.
6. **Język.** Interfejs w 100 % po polsku z diakrytykami. Komentarze w kodzie
   po angielsku. Nigdy odwrotnie, nigdy mieszanie w jednym zdaniu.
7. **Dostępność jest funkcją główną.** Cel dotykowy ≥ 48×48 px. Każdy element
   interaktywny osiągalny klawiaturą, z widocznym `:focus-visible`. Poprawne
   role ARIA. Kontrast ≥ 4.5:1 dla tekstu i ≥ 3:1 dla elementów graficznych w
   obu motywach. Pełne wsparcie `prefers-reduced-motion: reduce`.
8. **Samokrytycyzm.** Aparat telefonu nie mierzy widma. Ekran Pomiar zawsze
   pokazuje zdanie o ograniczeniach, a temperatura barwowa i wpływ melanopiczny
   są opisane jako przybliżenia. Nigdzie nie pada słowo „diagnoza” ani żadna
   obietnica zdrowotna.

---

## 1. Podział pracy i pliki

Każdy plik ma **jednego** właściciela. Nikt nie edytuje cudzego pliku.

| Zakres | Pliki (właściciel) |
|---|---|
| Powłoka: HTML, style, nawigacja, dostępność, PWA, wizualizacja | `index.html`, `styles.css`, `ui-core.js`, `manifest.webmanifest`, `sw.js` |
| Pomiar: kamera, próbkowanie, historia, progi | `engine.js` |
| Warstwa wsparcia: ekran Wsparcie, `SUPPORT_URL` | `support.js` |
| Narzędzia: siedem ekranów narzędziowych | `tools.js` |
| Start: przegląd modułów, rejestracja workera | `boot.js` |
| Pomiar matematyczny | `metrics.js` |

`window.Bus`, `window.UI` i `window.Viz` publikuje `ui-core.js` — dawne
`bus.js`, `ui.js` i `viz.js` zostały scalone w jeden plik powłoki, bo trzy
osobne pliki dzieliły jeden stan widoczności. Kontrakty tych trzech obiektów
(rozdziały 3, 4 i 5) obowiązują bez zmian.

Kolejność ładowania skryptów w `index.html` (na końcu `<body>`, bez `defer`,
synchronicznie — kolejność jest częścią kontraktu):

```
metrics.js
ui-core.js
engine.js
support.js
tools.js
boot.js
```

W `<head>` jest jeden arkusz: `styles.css`. Definiuje wszystkie tokeny
i wszystkie komponenty; nie ma drugiego arkusza, który mógłby je nadpisać.

### Reguła startu

Żaden moduł nie dotyka DOM przy parsowaniu. Każdy tylko rejestruje się na
magistrali. `ui-core.js` po `DOMContentLoaded` i po `setTimeout(..., 0)` emituje
`app:ready`; dopiero wtedy moduły budują swoje ekrany. Wyjątek: wywołania
`UI.registerPanel()` wykonuje się na poziomie modułu (od razu), bo tylko
rejestrują metadane.

---

## 2. Ekrany

Każdy ekran osiągalny w **maksymalnie 2 dotknięciach**: 1 dotknięcie = pozycja
dolnego paska, 2 dotknięcie = wiersz na tym ekranie. Dokumentacja jest
osiągalna w 1 dotknięciu przyciskiem „i” w nagłówku.

### 2.1 Ekrany zakładkowe (dolny pasek, 5 pozycji)

| # | `panelId` | Tytuł PL | Przycisk nawigacji | Zawartość |
|---|---|---|---|---|
| 1 | `panelMeasure` | **Pomiar** | `navMeasure` | podgląd kamery, Start/Stop/Przełącz, siatka 7 kafelków metryk, podsumowanie sesji, nota o ograniczeniach |
| 2 | `panelHistory` | **Historia** | `navHistory` | wykres z wyborem wielkości i zakresu, tabela odczytów, wejścia do Raportów i Eksportu |
| 3 | `panelTools` | **Narzędzia** | `navTools` | lista narzędzi: Porównywarka A/B, Kalibracja, Sprawdź mój monitor, Harmonogram, Alerty, Profile progów |
| 4 | `panelSupport` | **Wsparcie** | `navSupport` | co aplikacja daje za darmo, dlaczego pada prośba, co daje darowizna (nic), przycisk albo informacja o braku adresu, zdanie o prywatności |
| 5 | `panelMore` | **Więcej** | `navMore` | Progi i profile, Dokumentacja, ustawienia wyglądu i dostępności, czyszczenie historii |

### 2.2 Ekrany nakładkowe (overlay — pełnoekranowe, z przyciskiem powrotu)

| `panelId` | Tytuł PL | Ścieżka dojścia (2 dotknięcia) | Właściciel |
|---|---|---|---|
| `panelDocs` | Dokumentacja | nagłówek → „i” (1 dotknięcie); Więcej → „Dokumentacja” | `ui-core.js` |
| `panelThresholds` | Progi i profile | Więcej → „Progi i profile”; Narzędzia → „Profile progów” | `engine.js` (progi) + `tools.js` (profile) |
| `panelReports` | Raporty | Historia → „Raporty” | `tools.js` |
| `panelExport` | Eksport danych | Historia → „Eksport CSV” | `tools.js` |
| `panelCompare` | Porównywarka A/B | Narzędzia → „Porównywarka A/B” | `tools.js` |
| `panelCalibration` | Kalibracja białą kartką | Narzędzia → „Kalibracja” | `tools.js` |
| `panelScreenCheck` | Sprawdź mój monitor | Narzędzia → „Sprawdź mój monitor” | `tools.js` |
| `panelSchedule` | Harmonogram | Narzędzia → „Harmonogram” | `tools.js` |
| `panelAlerts` | Alerty ekspozycji | Narzędzia → „Alerty ekspozycji” | `tools.js` |

**Konwencja nazewnicza nakładek (obowiązkowa).** Panel `panelXxx` zawiera
nagłówek z przyciskiem powrotu `backXxx` i tytułem `titleXxx`.
Przykład: `panelReports` → `backReports`, `titleReports`.

### 2.3 Arkusze modalne (`role="dialog"`, w `sheetLayer`)

Arkusze nie są panelami. Nakładają się na bieżący panel, mają pułapkę fokusa,
zamknięcie klawiszem `Escape` i przyciskiem.

| `sheetId` | Cel | Właściciel |
|---|---|---|
| `sheetDialog` | uniwersalne potwierdzenie / komunikat (`UI.confirm`, `UI.alert`) | `ui-core.js` |
| `sheetHelp` | opis wielkości (`helpPL` z katalogu) | `ui-core.js` |

Dwa arkusze i tyle. Wsparcie **nie** jest arkuszem: nic tu nie wyskakuje przed
użytkownika, ekran otwiera się wyłącznie z paska nawigacji.

---

## 3. Nawigacja i własność widoczności

**Jedynym właścicielem widoczności paneli, arkuszy i stanu zakładek jest
`window.UI` (`ui-core.js`).** To była przyczyna błędu w v1, gdzie dwa moduły
ustawiały `hidden`. W v2:

* Żaden inny moduł nie ustawia `hidden`, `display`, `aria-selected` ani klas
  stanu na elementach `panel*`, `nav*`, `sheet*`. Nigdy. Bez wyjątków.
* Przejście na ekran wykonuje się wyłącznie przez `UI.showTab()` /
  `UI.showPanel()` / `UI.openSheet()`.
* Moduł, który chce coś narysować przy pokazaniu panelu, rejestruje `onShow`
  przez `UI.registerPanel()` albo słucha `ui:viewchange` na magistrali.
* Płótna (`<canvas>`) mierzone w ukrytym panelu mają rozmiar 0. Dlatego `UI`
  **zawsze** wywołuje `onShow` w `requestAnimationFrame` po odsłonięciu panelu,
  a `Viz` przerysowuje w reakcji na `ui:viewchange` i `ui:resize`.

Zasady zachowania:

* Pokazanie nakładki **nie** kasuje `aria-selected` na zakładkach — pusty
  `tablist` czyta się jako „nic nie wybrano”. Ostatnia zakładka zostaje
  oznaczona i to do niej wraca `UI.back()`.
* `UI.back()` zamyka najpierw arkusz, potem nakładkę, potem nic nie robi.
* Sprzętowy „wstecz” (`popstate`) i `Escape` wywołują `UI.back()`.
  `UI.showPanel()` i `UI.openSheet()` dopisują wpis przez `history.pushState`.
  To jedyne miejsce w aplikacji dotykające `history`.
* Przełączenie zakładki **nie** zatrzymuje pomiaru. Kamera pracuje dalej;
  na innych zakładkach nagłówek pokazuje wskaźnik `measureStatus` „Pomiar trwa”.
* Głęboki link: `?ekran=<panelId>` otwiera panel po `app:ready`.

---

## 4. Magistrala zdarzeń — `window.Bus` (`ui-core.js`)

Jedyny mechanizm komunikacji między modułami. Nikt nie tworzy własnych
`on`/`off`. Nikt nie woła cudzych metod w reakcji na coś — słucha zdarzenia.

```js
Bus.on(name, cb)      // -> cb; rejestruje słuchacza
Bus.once(name, cb)    // -> cb
Bus.off(name, cb)     // -> void
Bus.emit(name, data)  // -> void; wyjątek w jednym słuchaczu nie przerywa reszty
Bus.names()           // -> string[]; wyłącznie do diagnostyki
```

`emit` łapie wyjątek każdego słuchacza osobno (`try/catch`) i idzie dalej —
zepsuty moduł poboczny nie może zabić pętli pomiarowej.

### Pełny rejestr zdarzeń

| Nazwa | Emituje | Ładunek |
|---|---|---|
| `app:ready` | UI | `{}` |
| `ui:viewchange` | UI | `{kind:'tab'\|'overlay', id, panelId, previousPanelId}` |
| `ui:sheetopen` | UI | `{sheetId}` |
| `ui:sheetclose` | UI | `{sheetId, result}` |
| `ui:themechange` | UI | `{theme:'auto'\|'light'\|'dark', effective:'light'\|'dark'}` |
| `ui:textscale` | UI | `{scale:1\|1.15\|1.3}` |
| `ui:resize` | UI | `{width, height}` (dławione do 100 ms) |
| `engine:state` | Engine | `{state:'idle'\|'starting'\|'running'\|'error'}` |
| `engine:started` | Engine | `{startedAt, facingMode}` |
| `engine:sample` | Engine | `{reading}` — 5 Hz |
| `engine:stopped` | Engine | `{session}` |
| `engine:error` | Engine | `{code:'PERMISSION'\|'NOTFOUND'\|'BUSY'\|'UNKNOWN', messagePL}` |
| `engine:thresholds` | Engine | `{thresholds, source:'user'\|'profile'\|'schedule'\|'reset'}` |
| `engine:history` | Engine | `{reason:'flushed'\|'cleared'}` |
| `engine:calibration` | Engine | `{calibration}` (`null` = wyłączona) |
| `tools:profileapplied` | Tools | `{profileId, namePL}` |
| `tools:alert` | Tools | `{level:'warning'\|'critical', metricId, messagePL}` |
| `tools:compare` | Tools | `{slot:'A'\|'B', reading}` |

---

## 5. Kontrakty modułów

Wszystkie obiekty globalne. Wszystkie metody synchroniczne, chyba że opisano
`Promise`. Metody zwracające `Promise` **nigdy nie odrzucają** — błąd wraca
w polu wyniku. To wymóg: zgubiony `catch` w module pobocznym nie może zawiesić
przycisku Start.

### 5.1 `window.Engine` (`engine.js`)

Stałe: `SAMPLE_MS = 200` (5 Hz), płótno próbkujące 64×64, `CROP_FRACTION = 0.6`,
siatka 3×3 komórek dla równomierności.
Kamera: `getUserMedia({video:{facingMode:{ideal:...}, width:{ideal:640},
height:{ideal:480}}})`. **Bez ręcznego balansu bieli i bez trybu manual** —
próba w v1 dawała ciemny, zamrożony obraz; ten komentarz musi trafić do kodu.

```js
Engine.SAMPLE_MS            // 200
Engine.sampleHz()           // -> 5
Engine.start(opts)          // opts: {facingMode?:'environment'|'user'}
                            // -> Promise<{ok:boolean, code?:string, messagePL?:string}>
Engine.stop()               // -> void
Engine.toggle()             // -> Promise<{ok, ...}>
Engine.switchCamera()       // -> Promise<{ok, code?, messagePL?}>
Engine.state()              // -> 'idle'|'starting'|'running'|'error'
Engine.isRunning()          // -> boolean
Engine.facingMode()         // -> 'environment'|'user'

Engine.latest()             // -> Reading|null
Engine.buffer(ms)           // -> Reading[] z bufora żywego (domyślnie 60000)
Engine.session()            // -> Session|null  (bieżąca lub ostatnia)

Engine.history(opts)        // opts: {sinceMs?, untilMs?, maxPoints?}
                            // -> Point[] (posortowane rosnąco po t)
Engine.historyRangeMs()     // -> 30*24*3600*1000
Engine.historyCount()       // -> number
Engine.clearHistory()       // -> void   (osobne potwierdzenie w UI)
Engine.flush()              // -> void   (wymuszony zapis do localStorage)

Engine.getThresholds()      // -> {<metricId>:{warn:number, crit:number}}
Engine.setThresholds(map)   // częściowa mapa jw.; -> boolean (false = odrzucone)
Engine.resetThresholds()    // -> void
Engine.defaultThresholds()  // -> mapa z Metrics.CATALOGUE (warn/crit)

Engine.getCalibration()     // -> {gainR,gainG,gainB, at:number}|null
Engine.setCalibration(cal)  // cal lub null; -> boolean
Engine.snapshot(labelPL)    // -> Reading + {labelPL, at} — kopia dla porównywarki
```

**`Reading` — kształt obowiązkowy:**

```js
{
  t: 1755900000000,                 // ms epoch
  r: 118.4, g: 122.9, b: 97.2,      // średnie kanałów wycinka, PO kalibracji, 0..255
  values: {                          // klucze == Metrics.CATALOGUE[].id; null gdy brak
    share: 28.7, brightness: 44.1, kelvin: 5230, melanopic: 0.82,
    flicker: 3.4, uniformity: 71, comfort: 78
  },
  zones: {                           // 'good'|'warning'|'critical'|null, z Metrics.zoneFor
    share: 'warning', brightness: 'good', kelvin: 'warning', melanopic: 'warning',
    flicker: 'good', uniformity: 'good', comfort: 'good'
  },
  extra: {
    kelvinReliable: true,            // z Metrics.colourTemperature().reliable
    flickerHz: 2.1,                  // null gdy niewiarygodne
    flickerWithinRange: false,
    comfortPenalties: [{id, labelPL, points}],
    cells: [ /* 9 luminancji komórek 3x3 */ ]
  }
}
```

**`Point` — rekord historii długiej** (1 punkt / 5 s, ta sama semantyka pól):

```js
{ t, share, brightness, kelvin, melanopic, flicker, uniformity, comfort, zone }
```

gdzie `zone` to strefa metryki `share` (metryka wiodąca, zgodnie z v1).
Zapis do localStorage w postaci tablic (`[t, share, brightness, ...]`),
maks. 15 000 rekordów, zapis wsadowy co 64 punkty.

**`Session`:**

```js
{ startedAt, endedAt|null, durationMs, samples,
  zones: {good:int, warning:int, critical:int},
  avg: {share, brightness, kelvin, melanopic, flicker, uniformity, comfort},
  max: { ...to samo... }, min: { ...to samo... },
  facingMode, calibrated: boolean }
```

**Reguły twarde dla P2:**

* Wszystkie 7 metryk liczone zawsze, bez pytania `Store`. `Engine` **nie
  odwołuje się** do `Store` ani `Account`.
* `flicker` liczony z okna 40 ostatnich próbek jasności (8 s przy 5 Hz),
  `Metrics.flicker(samples, 5)`. Gdy `withinRange === false`, `flickerHz` = `null`.
* `uniformity` z 9 komórek 3×3 wycinka, luminancja liniowa
  (`0.2126*R + 0.7152*G + 0.0722*B` po `Metrics.toLinear`).
* `comfort` z `Metrics.comfortIndex({melanopic, kelvin, flickerPercent, uniformity})`.
* Błąd `getUserMedia` mapowany: `NotAllowedError`→`PERMISSION`,
  `NotFoundError`/`OverconstrainedError`→`NOTFOUND`, `NotReadableError`→`BUSY`,
  reszta→`UNKNOWN`. Każdy z własnym polskim komunikatem w `cameraPlaceholderText`.

### 5.2 `window.Viz` (`ui-core.js`)

Buduje i rysuje. Nie zmienia widoczności paneli.

```js
Viz.buildTiles()                  // generuje kafelki w #tileGrid z Metrics.CATALOGUE
Viz.drawTiles(reading)            // reading lub null (stan spoczynku: '—')
Viz.drawCharts(opts)              // opts: {metricId?, rangeMs?} — domyślnie ze stanu UI
Viz.drawTable(limit)              // limit domyślnie 60
Viz.drawOverlay()                 // ramka wycinka na #cameraOverlay
Viz.redraw()                      // wszystko widoczne; wołane na ui:viewchange i ui:resize
Viz.setChartMetric(metricId)      // -> boolean
Viz.setChartRange(rangeMs)        // -> boolean
Viz.chartState()                  // -> {metricId, rangeMs}
Viz.zoneColor(zone)               // -> 'var(--zone-good)' itd.
```

Wszystkie siedem kafelków rysuje się identycznie i zawsze. Kafelek bez danych
pokazuje `—`, nigdy wartości zmyślonej ani rozmytej — i nigdy powodu, dla
którego wartości „nie wolno” pokazać, bo taki powód nie istnieje.

### 5.3 `window.Support` (`support.js`)

Najmniejszy moduł w aplikacji i jedyny, który wie cokolwiek o pieniądzach.

```js
Support.url()             // -> string; '' gdy SUPPORT_URL pusty lub nie jest https://
Support.isConfigured()    // -> boolean
Support.render()          // przebudowuje #panelSupport
```

`SUPPORT_URL` jest **pierwszą rzeczą w pliku po nagłówku**, żeby dało się ją
znaleźć bez czytania kodu. Walidacja: wyłącznie `https://`; cokolwiek innego
(w tym `http:` i `javascript:`) jest traktowane jak brak adresu. Odnośnik
renderuje się wyłącznie wtedy, gdy adres przeszedł walidację, i zawsze jako
`<a target="_blank" rel="noopener noreferrer">`. Żadnego skryptu, widżetu ani
obrazka z serwera serwisu darowizn — ikona kubka jest rysowana lokalnie
w `styles.css`, tak jak każda inna ikona w tej aplikacji.

Moduł kasuje przy starcie martwe klucze po usuniętej monetyzacji
(`ms2.billing.v1`, `ms2.account.v1`, `ms2.cloud.v1`, `ms2.ads.v1`,
`ms2.tour.v1`). Lista jest wypisana wprost — bez zamiatania po prefiksie,
bo `ms2.history`, `ms2.settings`, `ms2.thresholds` i `ms2.profiles` mają ten
sam prefiks i muszą przetrwać.

### 5.4 `window.Tools` (`tools.js`)

Metody płaskie, bez zagnieżdżeń — mniej pomyłek przy pracy równoległej.

```js
// Porównywarka A/B
Tools.captureCompareSlot(slot)      // 'A'|'B'; -> {ok, reading?, messagePL}
Tools.getCompare()                  // -> {A:Reading|null, B:Reading|null, diff:Diff|null}
Tools.clearCompare()                // -> void

// Kalibracja białą kartką
Tools.startCalibration()            // -> Promise<{ok, calibration?, messagePL}> (3 s próbek)
Tools.clearCalibration()            // -> void
Tools.calibrationInfo()             // -> {active:boolean, at:number|null, gains|null, deltaPL:string}

// Raporty
Tools.report(kind, atMs)            // kind:'day'|'week'; -> Report
Tools.renderReport(containerId, report) // -> void

// Eksport
Tools.buildCsv(opts)                // opts:{sinceMs, untilMs, metricIds?, separator?}
                                    // -> {filename, text, rows}
Tools.exportCsv(opts)               // -> Promise<{ok, messagePL}> (Blob + <a download>)

// Profile progów
Tools.listProfiles()                // -> Profile[]
Tools.saveProfile(namePL)           // -> {ok, profile?, messagePL}
Tools.applyProfile(profileId)       // -> boolean (woła Engine.setThresholds)
Tools.removeProfile(profileId)      // -> boolean

// Harmonogram
Tools.getSchedule()                 // -> {enabled:boolean, rules:Rule[]}
Tools.setSchedule(obj)              // -> boolean
Tools.activeRule()                  // -> Rule|null

// Alerty ekspozycji
Tools.getAlerts()                   // -> {enabled, metricId, level, sustainSec, sound, vibrate}
Tools.setAlerts(cfg)                // -> boolean

// Kreator „Sprawdź mój monitor”
Tools.startScreenCheck()            // -> {ok, step}
Tools.screenCheckNext()             // -> {done:boolean, step?, result?}
Tools.screenCheckResult()           // -> {score, verdictPL, itemsPL:string[]}|null
Tools.cancelScreenCheck()           // -> void
```

`Rule`: `{id, fromHHMM:'22:00', toHHMM:'06:00', profileId, namePL}`.
`Profile`: `{id, namePL, thresholds, createdAt, builtIn:boolean}`.
Profile wbudowane (zawsze obecne, `builtIn:true`, nieusuwalne):
`profile-day` „Dzień – biuro”, `profile-evening` „Wieczór – łagodny”,
`profile-screen` „Praca przy ekranie”.

### 5.5 `window.UI` (`ui-core.js`)

```js
UI.isReady()                        // -> boolean
UI.showTab(tabId)                   // 'measure'|'history'|'tools'|'support'|'more'; -> boolean
UI.showPanel(panelId, opts)         // opts:{focusId?, from?}; -> boolean
UI.back()                           // -> boolean (true = coś zamknięto)
UI.current()                        // -> {kind:'tab'|'overlay', id, panelId}
UI.registerPanel(spec)              // spec:{panelId, tabId?, titlePL, onShow?, onHide?}
UI.openSheet(sheetId, opts)         // opts:{focusId?, dismissible?:boolean}; -> boolean
UI.closeSheet(sheetId, result)      // -> void
UI.confirm(o)                       // o:{titlePL, bodyPL, confirmPL, cancelPL, danger?}
                                    // -> Promise<boolean>
UI.alert(o)                         // o:{titlePL, bodyPL, okPL}; -> Promise<void>
UI.toast(messagePL, o)              // o:{kind:'info'|'success'|'error', durationMs, actionPL, onAction}
UI.announce(textPL, assertive)      // aria-live
UI.setBusy(elOrId, isBusy)          // aria-busy + wskaźnik + blokada
UI.icon(name, size)                 // -> HTMLElement (maska CSS; lista nazw niżej)
UI.getTheme() / UI.setTheme(v)      // 'auto'|'light'|'dark'
UI.getTextScale() / UI.setTextScale(v) // 1 | 1.15 | 1.3
UI.getSetting(key) / UI.setSetting(key, value)  // klucze z ms2.settings.v1
UI.formatDate(ms) / UI.formatTime(ms) / UI.formatDuration(ms)  // pl-PL
```

Nazwy ikon dostępne w `UI.icon` (zamknięta lista, maski CSS, `currentColor`):
`measure, history, tools, support, more, play, stop, switch, back, close,
info, check, warning, critical, chevron, export, calendar, bell, compare,
target, screen, star, cup, trash, help`.

---

## 6. Kompletna lista identyfikatorów DOM

`index.html` jest właścicielem powłoki; pozostałe moduły tylko czytają te
identyfikatory. Ta lista jest kontraktem. Identyfikatory **nie zawierają
kropek**.

### 6.1 Powłoka

`appRoot`, `appHeader`, `appTitle`, `btnInfo`, `measureStatus`, `appMain`,
`navBar`, `liveRegion`, `liveRegionAlert`, `sheetLayer`, `toastLayer`,
`skipLink`

### 6.2 Nawigacja (`role="tab"`, w `navBar` z `role="tablist"`)

`navMeasure`, `navHistory`, `navTools`, `navSupport`, `navMore`

### 6.3 Panele

`panelMeasure`, `panelHistory`, `panelTools`, `panelSupport`, `panelMore`,
`panelDocs`, `panelThresholds`, `panelReports`, `panelExport`, `panelCompare`,
`panelCalibration`, `panelScreenCheck`, `panelSchedule`, `panelAlerts`

Powroty i tytuły nakładek: `backDocs`/`titleDocs`,
`backThresholds`/`titleThresholds`, `backReports`/`titleReports`,
`backExport`/`titleExport`, `backCompare`/`titleCompare`,
`backCalibration`/`titleCalibration`, `backScreenCheck`/`titleScreenCheck`,
`backSchedule`/`titleSchedule`, `backAlerts`/`titleAlerts`

### 6.4 Pomiar

`cameraStage`, `cameraVideo`, `cameraOverlay`, `cameraPlaceholder`,
`cameraPlaceholderText`, `btnStart`, `btnStop`, `btnSwitchCamera`,
`measureControls`, `tileGrid`, `sessionSummary`, `sessionDuration`,
`sessionSamples`, `sessionZoneGood`, `sessionZoneWarning`,
`sessionZoneCritical`, `calibrationNotice`, `disclaimerMeasure`

Kafelki generuje `Viz.buildTiles()` w `tileGrid`, schemat identyfikatorów
(`<id>` = `share|brightness|kelvin|melanopic|flicker|uniformity|comfort`):
`tile-<id>`, `tileName-<id>`, `tileValue-<id>`, `tileUnit-<id>`,
`tileZone-<id>`, `tileGauge-<id>`, `tileHelp-<id>`, `tileHint-<id>`

### 6.5 Historia

`chartMain`, `chartLegend`, `chartMetricSelect`, `chartRangeGroup`,
`range1m`, `range1h`, `range24h`, `range7d`, `range30d`, `chartEmpty`,
`btnOpenReports`, `btnOpenExport`, `tableToggle`, `tableWrap`,
`readingsTable`, `readingsBody`

### 6.6 Narzędzia

`toolsList`, `btnToolCompare`, `btnToolCalibration`, `btnToolScreenCheck`,
`btnToolSchedule`, `btnToolAlerts`, `btnToolProfiles`

### 6.7 Wsparcie

`supportBody`, `supportLink` (renderowany **tylko** przy poprawnym
`SUPPORT_URL`), `supportPending` (renderowany **tylko** przy pustym adresie —
nigdy oba naraz), `supportPrivacy`

### 6.8 Więcej

`btnOpenThresholds`, `btnOpenDocs`, `themeSelect`, `textScaleSelect`,
`contrastToggle`, `soundToggle`, `vibrateToggle`, `btnClearHistory`,
`moreSupportLine`, `btnOpenSupport`, `appVersion`

### 6.9 Progi i profile

`thresholdList`, `btnThresholdsReset`, `profileList`, `profileNameInput`,
`btnProfileSave`

Suwaki generowane per metryka: `thWarn-<id>`, `thCrit-<id>`,
`thWarnLabel-<id>`, `thCritLabel-<id>`, `thRow-<id>`

### 6.10 Ekrany narzędzi

* Raporty: `reportKindDay`, `reportKindWeek`, `reportDate`, `reportBody`
* Eksport: `exportRangeSelect`, `exportMetricList`, `exportPreview`,
  `btnExportRun`
* Porównywarka: `compareSlotA`, `compareSlotB`, `btnCaptureA`, `btnCaptureB`,
  `compareTable`, `compareVerdict`, `btnCompareClear`
* Kalibracja: `calibStatus`, `calibProgress`, `btnCalibStart`, `btnCalibClear`,
  `calibResult`
* Sprawdź mój monitor: `screenCheckStep`, `screenCheckHint`, `btnScreenNext`,
  `btnScreenCancel`, `screenCheckResult`
* Harmonogram: `scheduleToggle`, `scheduleRules`, `btnScheduleAdd`
* Alerty: `alertsToggle`, `alertsMetricSelect`, `alertsLevelSelect`,
  `alertsSustainInput`, `alertsSoundToggle`, `alertBar`

### 6.11 Arkusze

* `sheetDialog`: `dialogTitle`, `dialogBody`, `dialogConfirm`, `dialogCancel`
* `sheetHelp`: `helpTitle`, `helpBody`, `helpClose`

### 6.12 Klasy CSS współdzielone (definiuje wyłącznie `styles.css`)

`.panel`, `.panel--overlay`, `.panel-header`, `.card`, `.card--flat`,
`.list`, `.list-row`, `.list-row__icon`, `.list-row__text`,
`.btn`, `.btn--primary`, `.btn--tonal`, `.btn--text`, `.btn--danger`,
`.btn--support`, `.btn--icon`, `.chip`, `.chip--selected`, `.chip--filled`,
`.tile`, `.tile__value`, `.tile__gauge`, `.zone-dot`, `.zone--good`,
`.zone--warning`, `.zone--critical`, `.linkbtn`, `.sheet`, `.sheet__scrim`,
`.toast`, `.switch`, `.slider`, `.field`, `.notice`, `.notice--warning`,
`.notice--info`, `.sr-only`, `.spinner`, `.empty-state`

Tokeny (`:root` w `styles.css`, przedefiniowane w
`@media (prefers-color-scheme: dark)` oraz w `[data-theme="dark"]` /
`[data-theme="light"]`):
`--bg`, `--surface`, `--surface-2`, `--surface-3`, `--on-bg`, `--on-surface`,
`--on-surface-muted`, `--outline`, `--accent`, `--on-accent`,
`--accent-container`, `--on-accent-container`, `--zone-good`, `--zone-warning`,
`--zone-critical`, `--on-zone`, `--support`, `--support-soft`, `--danger`,
`--focus-ring`, `--radius-card`, `--radius-pill`, `--gap`, `--tap-min` (48px),
`--font-stack`, `--text-scale`.

`--font-stack` = `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.
Żadnych czcionek z sieci.

---

## 7. Klucze localStorage

Prefiks `ms2.` (Monitor Światła v2). Każdy zapis w `try/catch` — tryb prywatny
i wyczerpany limit nie mogą wywrócić aplikacji.

| Klucz | Właściciel | Zawartość |
|---|---|---|
| `ms2.settings.v1` | `ui-core.js` | motyw, skala tekstu, kontrast, dźwięk, wibracja, `firstRunDone` |
| `ms2.thresholds.v1` | `engine.js` | progi `{<metricId>:{warn,crit}}` |
| `ms2.history.v1` | `engine.js` | historia długa, forma tablicowa, ≤ 15 000 rekordów |
| `ms2.session.v1` | `engine.js` | podsumowanie ostatniej sesji |
| `ms2.calibration.v1` | `engine.js` | `{gainR,gainG,gainB,at}` |
| `ms2.profiles.v1` | `tools.js` | profile progów użytkownika |
| `ms2.schedule.v1` | `tools.js` | reguły harmonogramu |
| `ms2.alerts.v1` | `tools.js` | konfiguracja alertów |
| `ms2.compare.v1` | `tools.js` | zapisane sloty A/B |

Warstwa wsparcia **nie ma własnego klucza** i niczego nie zapamiętuje: nie
liczy wyświetleń, nie pamięta „już wsparłem”, nie odkłada daty ostatniej
prośby. Nie ma czego zapisać.

**Klucze usunięte.** `ms2.billing.v1`, `ms2.account.v1`, `ms2.cloud.v1`,
`ms2.ads.v1` i `ms2.tour.v1` należały do modułów, których już nie ma.
`support.js` kasuje je przy pierwszym starcie tej wersji — po nazwie, nigdy po
prefiksie.

**Zasada własności danych.** Pomiary, progi, profile, kalibracja, harmonogram,
alerty i porównania to własność użytkownika i nic w aplikacji nie kasuje ich
mimochodem. Kasowanie pomiarów jest osobną, wyraźnie opisaną akcją
`btnClearHistory` z własnym potwierdzeniem („Tej operacji nie da się cofnąć”).

---

## 8. Zachowania międzymodułowe (rozstrzygnięcia, nie sugestie)

1. **Nikt nikogo nie pyta o pozwolenie.** W aplikacji nie ma funkcji
   sprawdzającej uprawnienie, nie ma zdarzenia proszącego o pokazanie oferty
   i nie ma ekranu, który mógłby odmówić otwarcia. Wprowadzenie takiej ścieżki
   z powrotem jest zmianą modelu, a nie poprawką.
2. **Ekran Wsparcie sam z siebie nigdy się nie otwiera.** Otwiera go wyłącznie
   `navSupport` albo jeden dyskretny odnośnik `btnOpenSupport` w stopce
   ustawień. Nic nie wyzwala go z timera, z licznika uruchomień ani ze
   zdarzenia pomiarowego.
3. **Pusty `SUPPORT_URL`.** Ekran wygląda normalnie, nie pokazuje błędu i nie
   renderuje żadnego odnośnika. Zamiast przycisku stoi `supportPending`.
   Zdanie o prywatności jest w obu przypadkach, w czasie odpowiednim do stanu.
4. **Zdanie o prywatności jest obowiązkowe** i stoi przy przycisku, nie
   w stopce: kliknięcie otwiera stronę zewnętrzną i jest to jedyny moment,
   w którym cokolwiek opuszcza to urządzenie. W aplikacji, która na każdym
   ekranie obiecuje, że pomiar zostaje lokalnie, przemilczenie tego byłoby
   niespójnością.
5. **Nikt nie czyta cudzego klucza localStorage.** Dane bierze się przez API
   modułu-właściciela.
6. **`prefers-reduced-motion`.** Przy `reduce`: brak animacji wejścia arkuszy
   i brak przejść kafelków. Wskaźniki postępu zostają (są informacją, nie
   ozdobą).
7. **Serwis worker.** `sw.js` cache'uje wyłącznie własne pliki v2 z listy
   `APP_SHELL`, strategia cache-first z odświeżaniem w tle. Nie dotyka zakresu
   wersji 1 — rejestracja z `docs/v2/` daje `scope: './'`. **Każda zmiana
   listy plików wymaga podniesienia numeru w `CACHE`**, inaczej użytkownik
   z zainstalowaną wersją dostanie starą kopię.

---

## 9. Kroki integracji (dla agenta integrującego, po kolei)

1. Sprawdź, że `docs/` poza `docs/v2/` nie ma żadnych zmian (`git status`).
   Jakakolwiek modyfikacja poza `v2/` to błąd blokujący.
2. Zbierz pliki: `index.html`, `styles.css`, `metrics.js`, `ui-core.js`,
   `engine.js`, `support.js`, `tools.js`, `boot.js`, `manifest.webmanifest`,
   `sw.js`.
3. Zweryfikuj kolejność skryptów w `index.html` zgodnie z rozdz. 1.
4. Zestaw listę wszystkich `getElementById` z `engine.js`, `support.js`
   i `tools.js` i porównaj z rozdziałem 6. Każde odwołanie do identyfikatora
   spoza listy albo nieobecnego w `index.html` — błąd blokujący.
5. Zestaw listę wszystkich `Bus.emit` i `Bus.on` i porównaj z rozdziałem 4.
   Nazwa spoza rejestru — błąd blokujący. Zdarzenie emitowane, którego nikt nie
   słucha — ostrzeżenie do zgłoszenia.
6. Sprawdź, że poza `ui-core.js` żaden plik nie ustawia `.hidden`,
   `style.display` ani `aria-selected` na elementach `panel*`, `nav*`, `sheet*`.
7. **Grep kontrolny po całym katalogu.** Słownictwo dawnego modelu — nazwy
   pakietów płatnych, opłat cyklicznych, ekranu sprzedażowego i ekranu
   wejścia do konta — nie może wystąpić nigdzie: ani w kodzie, ani w tekstach
   interfejsu, ani w tym dokumencie. Lista słów do sprawdzenia jest w sekcji 6
   wspólnej specyfikacji przejścia na model darowiznowy. Trafienie oznacza, że
   gdzieś został kawałek starego modelu.
8. Sprawdź brak `fetch`, `XMLHttpRequest`, `WebSocket`, `import(`, `<script src>`
   i `@import`/`url()` wskazujących poza `docs/v2/` i `../icons/`, we wszystkich
   plikach poza `sw.js`. Odnośnik z `SUPPORT_URL` jest jedynym wyjątkiem i jest
   otwierany dopiero po kliknięciu użytkownika.
9. Uzupełnij `APP_SHELL` w `sw.js` o pełną listę plików z kroku 2 i podnieś
   numer w `CACHE`.
10. Smoke test pomiaru: Start → 60 s pomiaru → **wszystkie siedem** kafelków
    pokazuje wartości i żaden nie ma kłódki, wszystkie pięć zakresów wykresu
    działa, tabela rośnie, Stop działa.
11. Smoke test Wsparcia przy pustym `SUPPORT_URL`: ekran się otwiera, wygląda
    normalnie, **nie ma żadnego `<a>`**, jest `supportPending` i zdanie
    o prywatności, konsola czysta.
12. Smoke test Wsparcia z adresem: wpisz tymczasowo poprawny adres `https://`,
    sprawdź, że przycisk ma `target="_blank"` i `rel="noopener noreferrer"`,
    po czym **przywróć pustą stałą**. Sprawdź też adres `http://` i
    `javascript:` — oba muszą zachować się jak brak adresu.
13. Smoke test narzędzi: każdy z siedmiu ekranów otwiera się i działa
    w całości, bez żadnego komunikatu o niedostępności.
14. Test dostępności: przejście całej aplikacji samym `Tab`/`Enter`/`Escape`;
    każdy cel ≥ 48 px; `prefers-reduced-motion: reduce` wyłącza animacje;
    kontrast sprawdzony w obu motywach; czytnik ekranu ogłasza zmianę ekranu
    i strefę wielkości.
15. Test offline: wyłącz sieć, przeładuj — aplikacja wstaje z cache.

---

## 10. Kryteria odbioru (definicja ukończenia)

* Aplikacja startuje z `docs/v2/index.html` bez ani jednego błędu w konsoli.
* Wersja 1 w `docs/` działa dalej bez zmian.
* Pomiar działa w pełni bez konta i bez połączenia z siecią.
* **Wszystkie siedem wielkości jest widocznych dla każdego; żadna nie ma
  kłódki, rozmycia ani plakietki.**
* Każdy z 14 paneli jest osiągalny w ≤ 2 dotknięciach, a Dokumentacja w 1.
* Ekran Wsparcie wygląda poprawnie w obu stanach `SUPPORT_URL` — pustym
  i wypełnionym — i przy pustym nie renderuje żadnego odnośnika.
* Zdanie o prywatności stoi przy przycisku wsparcia.
* Zero zapytań sieciowych poza `sw.js` i poza odnośnikiem, który klika
  użytkownik.
* Interfejs w całości po polsku z diakrytykami; komentarze w kodzie po
  angielsku.
