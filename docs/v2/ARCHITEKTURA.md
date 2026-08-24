# Monitor Światła v2 — specyfikacja architektury

Dokument wiążący. Czterech programistów realizuje go równolegle, nie widząc
nawzajem swojego kodu. Wszystko, co tu zapisano — nazwy obiektów, sygnatury
metod, nazwy zdarzeń, identyfikatory DOM, klucze localStorage — jest
**kontraktem**. Nie wolno ich zmieniać jednostronnie. Jeżeli czegoś brakuje,
brak zgłasza się integratorowi, a nie improwizuje.

Katalog: `docs/v2/`. Katalog `docs/` (wersja 1) jest **nietykalny** — wolno go
tylko czytać. Jedyny wyjątek: `docs/v2/*` odwołuje się do ikon w
`../icons/*.png` (odczyt przez manifest, bez modyfikacji pliku).

---

## 0. Zasady nadrzędne (obowiązują każdy moduł)

1. **Pomiar jest święty.** Żadna ścieżka kodu związana z logowaniem,
   płatnością ani reklamą nie może zablokować, opóźnić, przerwać ani
   przyciemnić pomiaru. Kamera, cztery darmowe metryki, wykres 1 min / 1 h,
   tabela i progi działają bez konta i bez zakupu. Reklama nigdy nie znajduje
   się na ekranie Pomiar i nigdy nie jest pozycjonowana `fixed`/`absolute` nad
   przyciskami Start/Stop.
2. **Silnik liczy wszystko, zawsze.** `Engine` wylicza i zapisuje wszystkie 7
   metryk niezależnie od uprawnień. Bramkowanie jest wyłącznie warstwą
   prezentacji. Dzięki temu po zakupie użytkownik widzi swoją prawdziwą
   historię, a nie pustą tabelę.
3. **Cała fikcja za granicą adaptera.** Każdy z modułów `Account`, `Store`,
   `Ads` ma dokładnie jedno pole `adapter` — obiekt z metodami zwracającymi
   `Promise`. Cała symulacja (opóźnienia, sukcesy, błędy) mieszka wewnątrz
   `adapter`. Warstwa nad nim nie wie, że jest fałszywa. Podmiana `adapter`
   na prawdziwe API to jedyna zmiana potrzebna do produkcji.
4. **Oznaczenie DEMO.** Każdy ekran, arkusz i baner dotyczący konta, płatności
   lub reklamy zawiera widoczny znacznik `DEMO` (klasa `.demo-badge`,
   tekst `DEMO`) oraz zdanie wyjaśniające. Znacznik nie może być ukryty,
   przezroczysty ani mniejszy niż 12 px. Zakaz użycia prawdziwych logotypów
   Google i Facebooka — używamy neutralnego symbolu i słowa „Google (DEMO)” /
   „Facebook (DEMO)”. Podszywanie się pod cudzą markę jest tu zakazane.
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

| Programista | Zakres | Pliki (właściciel) |
|---|---|---|
| **P1 — Powłoka** | HTML, style, nawigacja, dostępność, PWA | `index.html`, `styles.css`, `bus.js`, `ui.js`, `manifest.webmanifest`, `sw.js` |
| **P2 — Pomiar** | kamera, próbkowanie, historia, progi, wizualizacja | `engine.js`, `viz.js` |
| **P3 — Konto i sklep** | logowanie, uprawnienia, zakupy, paywall | `account.js`, `store.js`, `store.css` |
| **P4 — Reklamy i narzędzia** | sloty reklamowe, nagrody, funkcje premium | `ads.js`, `tools.js`, `tools.css` |
| — | pomiar matematyczny | `metrics.js` — **GOTOWY, NIKT NIE DOTYKA** |

Kolejność ładowania skryptów w `index.html` (na końcu `<body>`, bez `defer`,
synchronicznie — kolejność jest częścią kontraktu):

```
metrics.js
bus.js
ui.js
engine.js
viz.js
account.js
store.js
ads.js
tools.js
```

Kolejność arkuszy w `<head>`: `styles.css`, `store.css`, `tools.css`.
`styles.css` definiuje wszystkie tokeny i komponenty współdzielone; `store.css`
i `tools.css` mogą wyłącznie dokładać reguły dla własnych ekranów i **nie mogą**
nadpisywać tokenów ani komponentów z `styles.css`.

### Reguła startu

Żaden moduł nie dotyka DOM przy parsowaniu. Każdy tylko rejestruje się na
magistrali. `ui.js` po `DOMContentLoaded` i po `setTimeout(..., 0)` emituje
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
| 2 | `panelHistory` | **Historia** | `navHistory` | wykres z wyborem metryki i zakresu, tabela odczytów, wejścia do Raportów i Eksportu, baner |
| 3 | `panelTools` | **Narzędzia** | `navTools` | lista narzędzi: Porównywarka A/B, Kalibracja, Sprawdź mój monitor, Harmonogram, Alerty, Profile progów; baner |
| 4 | `panelPremium` | **Premium** | `navPremium` | plany, tabela funkcji, przywracanie zakupów, stan subskrypcji; **bez reklam** |
| 5 | `panelMore` | **Więcej** | `navMore` | Konto, Progi i profile, Dokumentacja, ustawienia wyglądu i dostępności, reset demonstracyjny, baner |

### 2.2 Ekrany nakładkowe (overlay — pełnoekranowe, z przyciskiem powrotu)

| `panelId` | Tytuł PL | Ścieżka dojścia (2 dotknięcia) | Właściciel |
|---|---|---|---|
| `panelAccount` | Konto | Więcej → „Konto”; skrót w nagłówku `btnAccountShortcut`; Premium → „Zarządzaj kontem” | P3 |
| `panelDocs` | Dokumentacja | nagłówek → „i” (1 dotknięcie); Więcej → „Dokumentacja” | P1 |
| `panelThresholds` | Progi i profile | Więcej → „Progi i profile”; Narzędzia → „Profile progów” | P2 (progi) + P4 (profile) |
| `panelReports` | Raporty | Historia → „Raporty” | P4 |
| `panelExport` | Eksport danych | Historia → „Eksport CSV” | P4 |
| `panelCompare` | Porównywarka A/B | Narzędzia → „Porównywarka A/B” | P4 |
| `panelCalibration` | Kalibracja białą kartką | Narzędzia → „Kalibracja” | P4 |
| `panelScreenCheck` | Sprawdź mój monitor | Narzędzia → „Sprawdź mój monitor” | P4 |
| `panelSchedule` | Harmonogram | Narzędzia → „Harmonogram” | P4 |
| `panelAlerts` | Alerty ekspozycji | Narzędzia → „Alerty ekspozycji” | P4 |

**Konwencja nazewnicza nakładek (obowiązkowa).** Panel `panelXxx` zawiera
nagłówek z przyciskiem powrotu `backXxx` i tytułem `titleXxx`.
Przykład: `panelReports` → `backReports`, `titleReports`.

### 2.3 Arkusze modalne (`role="dialog"`, w `sheetLayer`)

Arkusze nie są panelami. Nakładają się na bieżący panel, mają pułapkę fokusa,
zamknięcie klawiszem `Escape` i przyciskiem.

| `sheetId` | Cel | Właściciel |
|---|---|---|
| `sheetPaywall` | oferta odblokowania konkretnej funkcji | P3 |
| `sheetPurchase` | potwierdzenie zakupu z ceną odnowienia i warunkami | P3 |
| `sheetLogin` | symulacja logowania Google / Facebook | P3 |
| `sheetRewarded` | reklama nagradzana (odliczanie) | P4 |
| `sheetDialog` | uniwersalne potwierdzenie / komunikat (`UI.confirm`, `UI.alert`) | P1 |
| `sheetHelp` | opis metryki (`helpPL` z katalogu) | P1 |

---

## 3. Nawigacja i własność widoczności

**Jedynym właścicielem widoczności paneli, arkuszy i stanu zakładek jest
`window.UI` (`ui.js`).** To była przyczyna błędu w v1, gdzie dwa moduły
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

## 4. Magistrala zdarzeń — `window.Bus` (P1, `bus.js`)

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
zepsuty moduł reklam nie może zabić pętli pomiarowej.

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
| `account:state` | Account | `{state, user}` |
| `account:signedin` | Account | `{user}` |
| `account:signedout` | Account | `{}` |
| `account:error` | Account | `{messagePL}` |
| `account:sync` | Account | `{ok, at, messagePL}` |
| `store:entitlements` | Store | `{entitlements, tier}` |
| `store:purchase` | Store | `{productId, ok, cancelled, messagePL}` |
| `store:trial` | Store | `{productId, endsAt}` |
| `store:paywall` | Store | `{featureId, context}` — prośba o pokazanie oferty |
| `store:reset` | Store | `{}` |
| `ads:shown` | Ads | `{slot}` |
| `ads:hidden` | Ads | `{slot}` |
| `ads:reward` | Ads | `{featureId, ms}` |
| `ads:blocked` | Ads | `{reasonPL}` |
| `tools:profileapplied` | Tools | `{profileId, namePL}` |
| `tools:alert` | Tools | `{level:'warning'\|'critical', metricId, messagePL}` |
| `tools:compare` | Tools | `{slot:'A'\|'B', reading}` |

---

## 5. Kontrakty modułów

Wszystkie obiekty globalne. Wszystkie metody synchroniczne, chyba że opisano
`Promise`. Metody zwracające `Promise` **nigdy nie odrzucają** — błąd wraca
w polu wyniku. To wymóg: zgubiony `catch` w module reklam nie może zawiesić
przycisku Start.

### 5.1 `window.Engine` (P2, `engine.js`)

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

### 5.2 `window.Viz` (P2, `viz.js`)

Buduje i rysuje. Nie zmienia widoczności paneli.

```js
Viz.buildTiles()                  // generuje kafelki w #tileGrid z Metrics.CATALOGUE
Viz.drawTiles(reading)            // reading lub null (stan spoczynku: '—')
Viz.drawCharts(opts)              // opts: {metricId?, rangeMs?} — domyślnie ze stanu UI
Viz.drawTable(limit)              // limit domyślnie 60
Viz.drawOverlay()                 // ramka wycinka na #cameraOverlay
Viz.redraw()                      // wszystko widoczne; wołane na ui:viewchange i ui:resize
Viz.setChartMetric(metricId)      // -> boolean
Viz.setChartRange(rangeMs)        // -> boolean (odmawia zakresu bez uprawnienia)
Viz.chartState()                  // -> {metricId, rangeMs}
Viz.zoneColor(zone)               // -> 'var(--zone-good)' itd.
```

Kafelek metryki premium bez uprawnienia: pokazuje nazwę, jednostkę, ikonę
kłódki, tekst `Funkcja Premium` i przycisk `Odblokuj` (wywołuje
`Store.requireFeature('metric.<id>', 'tile')`). **Nie pokazuje zmyślonej
wartości ani rozmytej liczby.**

### 5.3 `window.Account` (P3, `account.js`)

```js
Account.DEMO                    // true — stała, znacznik granicy adaptera
Account.PROVIDERS               // [{id:'google', namePL:'Google'}, {id:'facebook', namePL:'Facebook'}]
Account.state()                 // -> 'signedOut'|'signingIn'|'signedIn'|'error'
Account.user()                  // -> User|null
Account.signIn(providerId)      // -> Promise<{ok, user?, cancelled?, code?, messagePL?}>
Account.cancelSignIn()          // -> void  (przerywa trwającą symulację)
Account.signOut()               // -> Promise<{ok, messagePL}>
Account.deleteAccount()         // -> Promise<{ok, messagePL}>  usuwa profil demo, ZOSTAWIA pomiary
Account.sync()                  // -> Promise<{ok, at, messagePL, appliedPL:string[]}>
Account.isSyncEnabled()         // -> boolean
Account.setSyncEnabled(bool)    // -> void
Account.lastSyncAt()            // -> number|null
Account.snapshot()              // -> {thresholds, profiles, schedule, alerts, settings}
Account.adapter                 // {signIn(p), signOut(), fetchProfile(), pushProfile(obj)}
```

**`User`:**

```js
{ id:'demo-google-1', provider:'google', displayName:'Konto demonstracyjne Google',
  email:'demo-google@przyklad.invalid', initials:'KD', avatarColor:'#3f6ad8',
  createdAt:1755900000000, lastSyncAt:null, demo:true }
```

Facebook: `id:'demo-facebook-1'`, `displayName:'Konto demonstracyjne Facebook'`,
`email:'demo-facebook@przyklad.invalid'`, `initials:'KD'`, `avatarColor:'#3b5998'`.

Domeny `.invalid` i `przyklad` są zarezerwowane i nie mogą istnieć naprawdę —
to celowe, żeby nikt nie wziął ich za prawdziwy adres.

### 5.4 `window.Store` (P3, `store.js`)

```js
Store.DEMO                          // true
Store.CATALOGUE                     // Product[]  (rozdział 6)
Store.FEATURES                      // Feature[]  (rozdział 8)
Store.feature(featureId)            // -> Feature|null
Store.product(productId)            // -> Product|null

Store.tier()                        // -> 'free'|'premium'
Store.has(featureId)                // -> boolean — JEDYNE pytanie o uprawnienie
Store.entitlements()                // -> {<featureId>:boolean}
Store.entitlement(featureId)        // -> {granted, source:'free'|'purchase'|'trial'|'reward'|null,
                                    //     expiresAt:number|null}
Store.requireFeature(featureId, ctx) // -> boolean; gdy false, emituje store:paywall
                                     // ctx: 'tile'|'chart'|'tool'|'export'|'report'|'menu'
Store.purchase(productId, opts)     // opts:{withTrial?:boolean, promoCode?:string}
                                    // -> Promise<{ok, cancelled, code?, messagePL, receipt?}>
Store.restore()                     // -> Promise<{ok, restored:number, messagePL}>
Store.subscription()                // -> {productId, plan, startedAt, renewsAt, trialEndsAt|null,
                                    //     cancelled:boolean, activeUntil, priceText}|null
Store.cancelSubscription()          // -> Promise<{ok, messagePL, activeUntil}>
Store.grantTemporary(featureId, ms, source) // -> boolean; source:'reward'
Store.resetDemo()                   // -> void  (rozdział 11)
Store.formatPrice(minor)            // -> '19,99 zł'
Store.renewalTextPL(product)        // -> pełne zdanie o odnowieniu (rozdział 6)
Store.adapter                       // {list(), purchase(id, opts), restore(), cancel()}
```

Uprawnienia liczone w **jednym** miejscu (`recompute()`): produkt → zbiór
`featureId`. Nigdzie indziej nie wolno pytać „czy kupił roczny”. Pyta się
`Store.has('export.csv')`.

`Store` nasłuchuje `account:signedin` → próbuje `restore()` (symulacja
„zakupy przypisane do konta”), i `store:paywall` → otwiera `sheetPaywall`.

### 5.5 `window.Ads` (P4, `ads.js`)

```js
Ads.DEMO                        // true
Ads.SLOTS                       // ['history','tools','more'] — zamknięta lista
Ads.MAX_REWARDS_PER_DAY         // 3
Ads.REWARD_MS                   // 24*3600*1000
Ads.isEnabled()                 // -> boolean; false gdy Store.has('noAds')
Ads.showBanner(slot)            // -> boolean
Ads.hideBanner(slot)            // -> void
Ads.hideAll()                   // -> void
Ads.refresh()                   // -> void (po zmianie uprawnień lub widoku)
Ads.canShowRewarded(featureId)  // -> {ok:boolean, reasonPL:string, remainingToday:number}
Ads.showRewarded(featureId)     // -> Promise<{ok, cancelled, grantedMs, messagePL}>
Ads.rewardsRemainingToday()     // -> number
Ads.isPersonalised()            // -> boolean
Ads.setPersonalised(bool)       // -> void
Ads.adapter                     // {loadBanner(slot), loadRewarded(), destroy(slot)}
```

### 5.6 `window.Tools` (P4, `tools.js`)

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

### 5.7 `window.UI` (P1, `ui.js`)

```js
UI.isReady()                        // -> boolean
UI.showTab(tabId)                   // 'measure'|'history'|'tools'|'premium'|'more'; -> boolean
UI.showPanel(panelId, opts)         // opts:{focusId?, from?}; -> boolean
UI.back()                           // -> boolean (true = coś zamknięto)
UI.current()                        // -> {kind:'tab'|'overlay', id, panelId}
UI.registerPanel(spec)              // spec:{panelId, tabId?, titlePL, onShow?, onHide?}
UI.openSheet(sheetId, opts)         // opts:{focusId?, dismissible?:boolean}; -> boolean
UI.closeSheet(sheetId, result)      // -> void
UI.confirm(o)                       // o:{titlePL, bodyPL, confirmPL, cancelPL, danger?, demo?}
                                    // -> Promise<boolean>
UI.alert(o)                         // o:{titlePL, bodyPL, okPL, demo?}; -> Promise<void>
UI.toast(messagePL, o)              // o:{kind:'info'|'success'|'error', durationMs, actionPL, onAction}
UI.announce(textPL, assertive)      // aria-live
UI.setBusy(elOrId, isBusy)          // aria-busy + wskaźnik + blokada
UI.icon(name, size)                 // -> SVGElement (lista nazw niżej)
UI.demoBadge(textPL)                // -> HTMLElement span.demo-badge (domyślnie 'DEMO')
UI.lockBadge()                      // -> HTMLElement span.lock-badge
UI.getTheme() / UI.setTheme(v)      // 'auto'|'light'|'dark'
UI.getTextScale() / UI.setTextScale(v) // 1 | 1.15 | 1.3
UI.getSetting(key) / UI.setSetting(key, value)  // klucze z ms2.settings.v1
UI.formatDate(ms) / UI.formatTime(ms) / UI.formatDuration(ms)  // pl-PL
```

Nazwy ikon dostępne w `UI.icon` (zamknięta lista, inline SVG, `currentColor`):
`measure, history, tools, premium, more, play, stop, switch, back, close,
info, lock, unlock, check, warning, critical, chevron, account, sync, export,
calendar, bell, compare, target, screen, star, ad, trash, help`.

---

## 6. Produkty i ceny (katalog fikcyjny, PLN)

Identyfikatory produktów **bez kropek** (trafiają do `id` elementów DOM).

| `id` | `namePL` | `plan` | `priceMinor` | `priceText` | okres | próba |
|---|---|---|---|---|---|---|
| `premium_monthly` | Premium — miesięcznie | `month` | `1999` | `19,99 zł` | co miesiąc | brak |
| `premium_yearly` | Premium — rocznie | `year` | `7999` | `79,99 zł` | co rok | **7 dni bezpłatnie** |
| `premium_lifetime` | Premium — na zawsze | `lifetime` | `14999` | `149,99 zł` | jednorazowo | brak |
| `noads_lifetime` | Usunięcie reklam | `lifetime` | `1299` | `12,99 zł` | jednorazowo | brak |

Pola obiektu `Product`:
`{id, namePL, subPL, plan, priceMinor, priceText, currency:'PLN', periodPL,
perMonthPL|null, trialDays:0|7, badgePL|null, features:[featureId],
termsPL, termsTrialPL|null, ctaPL, ctaTrialPL|null, recommended:boolean}`

`premium_yearly.recommended = true`, `badgePL = 'Najczęściej wybierane'`.
`premium_lifetime.badgePL = 'Bez odnawiania'`.

### 6.1 Wymóg przejrzystości ceny — obowiązkowy

Kwota odnowienia, jej okres i sposób rezygnacji muszą być widoczne **przed**
naciśnięciem przycisku zakupu, w tym samym kadrze co przycisk, bez rozwijania.
Kwota musi znaleźć się **także na samym przycisku**. Dla planu z okresem
próbnym trzeba podać datę końca próby wyliczoną z `Date.now()`.

Teksty obowiązkowe (dokładnie te):

* `premium_monthly.termsPL`
  „19,99 zł miesięcznie. Subskrypcja odnawia się automatycznie co miesiąc za
  19,99 zł, aż do rezygnacji. Możesz zrezygnować w każdej chwili na ekranie
  Konto → Subskrypcja. Pomiar, cztery darmowe metryki, wykres i tabela
  pozostają bezpłatne. To wersja demonstracyjna — żadna opłata nie zostanie
  pobrana.”
* `premium_monthly.ctaPL` — „Kupuję — 19,99 zł / miesiąc”
* `premium_yearly.termsPL`
  „79,99 zł rocznie (około 6,67 zł miesięcznie, pobierane jednorazowo raz w
  roku). Subskrypcja odnawia się automatycznie co rok za 79,99 zł, aż do
  rezygnacji. Możesz zrezygnować w każdej chwili na ekranie Konto →
  Subskrypcja. To wersja demonstracyjna — żadna opłata nie zostanie pobrana.”
* `premium_yearly.termsTrialPL`
  „7 dni bezpłatnie, potem 79,99 zł rocznie. Okres próbny kończy się
  {DATA_KONCA_PROBY}. Jeżeli nie zrezygnujesz najpóźniej dzień wcześniej,
  subskrypcja odnowi się automatycznie za 79,99 zł i będzie odnawiać się co
  rok. Rezygnacja: Konto → Subskrypcja. To wersja demonstracyjna — żadna
  opłata nie zostanie pobrana.”
* `premium_yearly.ctaPL` — „Kupuję — 79,99 zł / rok”
* `premium_yearly.ctaTrialPL` — „Zaczynam 7 dni bezpłatnie, potem 79,99 zł / rok”
* `premium_lifetime.termsPL`
  „149,99 zł, płatność jednorazowa. To nie jest subskrypcja — nic się nie
  odnawia i nie pobierzemy kolejnej opłaty. To wersja demonstracyjna — żadna
  opłata nie zostanie pobrana.”
* `premium_lifetime.ctaPL` — „Kupuję — 149,99 zł jednorazowo”
* `noads_lifetime.termsPL`
  „12,99 zł, płatność jednorazowa. Kupujesz wyłącznie usunięcie reklam.
  Metryki Premium, historia 30 dni, raporty, eksport i narzędzia pozostają
  częścią wersji Premium. To wersja demonstracyjna — żadna opłata nie zostanie
  pobrana.”
* `noads_lifetime.ctaPL` — „Kupuję — 12,99 zł jednorazowo”

Wszystkie kwoty formatuje `Store.formatPrice()` z jednego miejsca — żadnego
wpisywania „19,99 zł” na sztywno w `index.html`.

### 6.2 Przebieg zakupu (symulacja)

1. Użytkownik dotyka `buy-<productId>` na `panelPremium` albo w `sheetPaywall`.
2. Otwiera się `sheetPurchase`: nazwa, cena, **zdanie o odnowieniu**, pełne
   `termsPL`/`termsTrialPL`, znacznik `DEMO`, przyciski `purchaseConfirm`
   (tekst = `ctaPL`) i `purchaseCancel`.
3. Potwierdzenie → `Store.purchase()` → `adapter.purchase()` czeka 1200 ms
   (`purchaseSpinner`, `aria-busy`), po czym zwraca sukces.
4. Sukces: zapis paragonu, `recompute()`, `Bus.emit('store:entitlements')`,
   `Bus.emit('store:purchase')`, zamknięcie arkusza, `UI.toast('Symulacja
   zakończona — wersja Premium (DEMO) włączona. Nie pobrano żadnej opłaty.',
   {kind:'success'})`.
5. Anulowanie na dowolnym etapie zwraca `{ok:false, cancelled:true}` i nie
   zmienia niczego.
6. Symulacja błędu wyłącznie przy włączonym przełączniku `simulateFailures`
   w Ustawieniach — nigdy losowo.

---

## 7. Logowanie (symulacja Google / Facebook)

**Logowanie i zakup to dwie różne rzeczy.** Napis o tym stoi na stałe na
`panelAccount` i w `sheetLogin`:
„Zalogowanie nie odblokowuje funkcji płatnych. Służy do synchronizacji profilu
między urządzeniami i do przypisania zakupów do konta.”

### 7.1 Co daje samo logowanie (bez zakupu)

* Synchronizacja profilu (symulowana): progi, profile progów, harmonogram,
  alerty, ustawienia wyglądu. Zapis do `ms2.cloud.v1`, odczyt z opóźnieniem
  600 ms. **Pomiary nie są synchronizowane** — to duże dane i zostają na
  urządzeniu; ekran mówi o tym wprost.
* Przypisanie zakupów do konta: po zalogowaniu `Store.restore()` odtwarza
  paragony (w symulacji: te z `ms2.billing.v1`).
* Nic więcej. Zero metryk, zero narzędzi, zero usunięcia reklam.

### 7.2 Stany

| Stan | Co widać |
|---|---|
| `signedOut` | `panelAccount`: tekst zachęty, dwa przyciski `btnSignInGoogle` / `btnSignInFacebook` (48 px, ikony neutralne, podpisy „Google (DEMO)”, „Facebook (DEMO)”), zdanie o rozdziale logowania i zakupu |
| `signingIn` | `sheetLogin`: nazwa dostawcy, wskaźnik postępu, tekst „To symulacja. Nie łączymy się z serwerami Google ani Facebooka i nie prosimy o hasło.”, przycisk `loginCancel` aktywny |
| `signedIn` | `panelAccount`: awatar z inicjałami (kolorowe koło, bez zdjęcia), nazwa, e-mail, dostawca, data ostatniej synchronizacji, `syncToggle`, `btnSyncNow`, `btnSignOut`, `btnDeleteAccount` |
| `error` | `accountError` (`role="alert"`) z polskim komunikatem i przyciskiem „Spróbuj ponownie”; stan wraca do `signedOut` |
| anulowane | arkusz zamknięty, `UI.toast('Logowanie anulowane.')`, stan `signedOut`, nic nie zapisane |

Czas symulacji: 1400 ms. Anulowanie działa w każdej chwili i przerywa timer.

### 7.3 Oznaczenie DEMO w logowaniu

`sheetLogin` ma pasek u góry: `DEMO — symulacja logowania`, kolory
`--demo-bg`/`--demo-fg`, kontrast ≥ 4.5:1. Pod przyciskami dostawców zdanie:
„Ta aplikacja nie ma integracji z Google ani z Facebookiem. Przyciski tworzą
lokalne konto demonstracyjne zapisane wyłącznie na tym urządzeniu.”
Zakaz logotypów firmowych.

---

## 8. Bramkowanie — dokładny podział funkcji

`featureId` to **stringi z kropkami** (nie trafiają do DOM).
Jedyny sposób sprawdzenia: `Store.has(id)`. Jedyny sposób zaproszenia do
zakupu: `Store.requireFeature(id, ctx)`.

### 8.1 Darmowe na zawsze (nigdy nie bramkowane)

Kamera i Start/Stop, przełączanie kamer, metryki `share`, `brightness`,
`kelvin`, `melanopic`, wykres 1 min i 1 h, tabela ostatnich 60 odczytów,
ręczne progi wszystkich metryk, podsumowanie sesji, Dokumentacja, motyw i
skala tekstu, wszystkie ustawienia dostępności.

### 8.2 Funkcje płatne

| `featureId` | Nazwa PL | Co dokładnie robi | Co widzi użytkownik darmowy |
|---|---|---|---|
| `metric.flicker` | Migotanie | pokazuje procent migotania i częstotliwość (gdy wiarygodna) na kafelku, wykresie i w eksporcie | kafelek z nazwą, opisem `shortPL`, kłódką i przyciskiem „Odblokuj”; bez wartości |
| `metric.uniformity` | Równomierność | rozkład światła w siatce 3×3, mapa komórek pod kafelkiem | jak wyżej |
| `metric.comfort` | Komfort wzrokowy | wynik 0–100 plus rozbicie na kary z `comfortPenalties` | jak wyżej |
| `history.long` | Historia 30 dni | zakresy wykresu 24 h / 7 dni / 30 dni oraz pełna tabela | przyciski zakresów widoczne, oznaczone kłódką; dotknięcie otwiera paywall. Pod wykresem zdanie: „Dane z ostatnich 30 dni są już zapisane na Twoim urządzeniu — odblokowanie pokazuje je natychmiast, nic nie zaczyna się liczyć od nowa.” |
| `reports` | Raporty dzienne i tygodniowe | `panelReports`: średnie, minima i maksima dobowe, rozkład stref w godzinach, najgorsza pora dnia, porównanie tydzień do tygodnia, 3 konkretne zalecenia | ekran z przykładowym raportem **wyraźnie oznaczonym „PRZYKŁAD”** na danych syntetycznych + przycisk „Odblokuj” |
| `export.csv` | Eksport CSV | `panelExport`: wybór zakresu i metryk, plik `monitor-swiatla-RRRR-MM-DD.csv` przez `Blob` i `<a download>`, separator `;` i przecinek dziesiętny (zgodność z polskim Excelem) | ekran z opisem formatu, podglądem 5 wierszy nagłówka i przyciskiem „Odblokuj” |
| `compare.ab` | Porównywarka A/B | `panelCompare`: zapamiętuje odczyt A (np. lampa biurkowa) i B (np. sufitowa), tabela różnic po każdej metryce, wskazuje łagodniejsze źródło i **uzasadnia którą metryką**; wynik w `ms2.compare.v1` | ekran z opisem działania i przyciskiem „Odblokuj”; slot A można zapisać, slot B nie |
| `calibration` | Kalibracja białą kartką | kreator: skieruj kamerę na białą kartkę pod badanym światłem, 3 s zbierania, wyliczenie `gainR/G/B` normalizujących biel; realnie poprawia `kelvin` i `melanopic`, bo usuwa stały odchył kanałów danego czujnika | ekran z wyjaśnieniem, dlaczego to podnosi dokładność, i przyciskiem „Odblokuj”; pomiar działa bez kalibracji z notką „bez kalibracji” |
| `schedule` | Harmonogram progów | reguły „od–do” automatycznie podmieniające profil progów (np. 22:00–06:00 → „Wieczór – łagodny”); sprawdzane co minutę i przy `engine:started` | ekran z opisem i wbudowanymi profilami do **ręcznego** przełączenia; automat wyłączony |
| `alerts` | Alerty ekspozycji | gdy wybrana metryka trzyma strefę krytyczną dłużej niż `sustainSec`, aplikacja pokazuje pasek `role="alert"`, opcjonalnie dźwięk i wibrację; alert nigdy nie zatrzymuje pomiaru i nigdy nie zasłania Start/Stop | tylko kolor strefy na kafelku, bez powiadomienia |
| `profiles` | Profile progów | zapis własnych zestawów progów pod nazwą, szybkie przełączanie | trzy profile wbudowane do wglądu i zastosowania; zapis własnych zablokowany |
| `screencheck` | Sprawdź mój monitor | kreator 5 kroków: 1) ustaw telefon 30 cm od ekranu, 2) pomiar bieli przy pełnej jasności, 3) pomiar przy minimalnej jasności (test migotania sterownika), 4) cztery rogi (równomierność), 5) tryb nocny włączony i wyłączony; na końcu ocena 0–100 i lista zaleceń | podgląd listy kroków i wykonanie **wyłącznie kroku 1** z komunikatem „Dalsze kroki wymagają wersji Premium” |
| `noAds` | Brak reklam | usuwa wszystkie banery i całą sekcję reklam | banery statyczne w trzech slotach |

**Uzasadnienie doboru (ocena redakcyjna, nie norma).** Wybrano funkcje, które
faktycznie usprawniają działanie projektu, a nie tylko dokładają ekrany:
kalibracja podnosi dokładność dwóch najbardziej przybliżonych metryk;
porównywarka zamienia liczbę w decyzję zakupową o lampie; harmonogram i alerty
zdejmują z użytkownika obowiązek pilnowania; raporty i eksport zamieniają
strumień próbek we wniosek; „Sprawdź mój monitor” prowadzi za rękę przez
pomiar, którego nikt nie wykona poprawnie bez instrukcji. Odrzucono funkcje
czysto kosmetyczne (motywy premium, dodatkowe ikony) — nie usprawniają pomiaru.

**Priorytet realizacji** dla P4, gdyby zabrakło czasu: najpierw `export.csv`,
`reports`, `compare.ab`, `calibration`, `profiles`; na końcu `schedule`,
`alerts`, `screencheck`.

### 8.3 Mapowanie produkt → uprawnienia

* `premium_monthly`, `premium_yearly`, `premium_lifetime` → **wszystkie**
  `featureId` z tabeli 8.2, łącznie z `noAds`.
* `noads_lifetime` → wyłącznie `noAds`.
* Nagroda z reklamy → jeden wybrany `featureId` na 24 h, `source:'reward'`,
  **nigdy** `noAds`.

---

## 9. Reklamy

### 9.1 Sloty

| slot | `elementId` | Ekran | Postać |
|---|---|---|---|
| `history` | `adSlotHistory` | Historia — **pod** tabelą, na końcu treści | baner statyczny w normalnym przepływie |
| `tools` | `adSlotTools` | Narzędzia — pod listą narzędzi | jak wyżej |
| `more` | `adSlotMore` | Więcej — pod listą ustawień, nad przyciskami niszczącymi | jak wyżej |
| — | `sheetRewarded` | arkusz | reklama nagradzana, wyłącznie po dotknięciu przycisku |

**Zakazane bezwzględnie:** reklama na `panelMeasure`, `panelPremium`,
`panelAccount`, `panelDocs` i w każdym arkuszu zakupowym. Zero reklam
pełnoekranowych typu interstitial. Zero automatycznych odtworzeń.

### 9.2 Twarde zasady

1. Baner jest elementem w normalnym przepływie (`position: static`),
   `max-height: 64px`, i znajduje się **za** całą treścią sterującą w
   kolejności DOM. Nie może być `fixed`, `sticky` ani `absolute`. Przyciski
   Start/Stop są na innym ekranie, więc fizycznie nie da się ich zasłonić.
2. `Ads` nasłuchuje `engine:started` i wtedy: nie ładuje nic nowego, nie
   odświeża banerów, a `showRewarded()` zwraca
   `{ok:false, messagePL:'Reklama nagradzana nie uruchamia się podczas pomiaru.'}`.
3. Reklama nagradzana startuje **tylko** po jawnym dotknięciu przycisku
   „Obejrzyj reklamę i odblokuj na 24 godziny” w `sheetPaywall`.
   Odliczanie 15 s, przycisk `rewardedSkip` aktywny po 5 s, `rewardedClose`
   zawsze dostępny (zamknięcie = brak nagrody, bez kary).
4. Limit `MAX_REWARDS_PER_DAY = 3`, licznik dobowy w `ms2.ads.v1`, reset o
   północy czasu lokalnego. Po wyczerpaniu przycisk jest wyłączony z
   komunikatem „Dzisiejszy limit nagród wyczerpany. Wróć jutro.”.
5. Każdy baner ma widoczną etykietę `REKLAMA (DEMO)` (`.ad-label`) oraz
   `aria-label="Miejsce na reklamę, wersja demonstracyjna"`. Baner to statyczna
   grafika CSS — żadnych obrazków z sieci, żadnych klików donikąd. Dotknięcie
   banera otwiera `UI.alert` z wyjaśnieniem, że to atrapa.
6. `Ads.refresh()` po `store:entitlements` — kupienie `noAds` usuwa banery
   natychmiast, bez przeładowania.
7. Przełącznik „Reklamy dopasowane” (`adsPersonalisedToggle`) w Więcej jest
   pozorny i podpisany jako element demonstracyjny; nie zbieramy żadnych
   danych i mówi o tym wprost.

---

## 10. Kompletna lista identyfikatorów DOM

`index.html` pisze P1; czytają je P2, P3 i P4. Ta lista jest kontraktem.
Identyfikatory **nie zawierają kropek**.

### 10.1 Powłoka

`appRoot`, `appHeader`, `appTitle`, `btnInfo`, `btnAccountShortcut`,
`measureStatus`, `appMain`, `navBar`, `liveRegion`, `liveRegionAlert`,
`sheetLayer`, `toastLayer`, `skipLink`

### 10.2 Nawigacja (`role="tab"`, w `navBar` z `role="tablist"`)

`navMeasure`, `navHistory`, `navTools`, `navPremium`, `navMore`

### 10.3 Panele

`panelMeasure`, `panelHistory`, `panelTools`, `panelPremium`, `panelMore`,
`panelAccount`, `panelDocs`, `panelThresholds`, `panelReports`, `panelExport`,
`panelCompare`, `panelCalibration`, `panelScreenCheck`, `panelSchedule`,
`panelAlerts`

Powroty i tytuły nakładek: `backAccount`/`titleAccount`, `backDocs`/`titleDocs`,
`backThresholds`/`titleThresholds`, `backReports`/`titleReports`,
`backExport`/`titleExport`, `backCompare`/`titleCompare`,
`backCalibration`/`titleCalibration`, `backScreenCheck`/`titleScreenCheck`,
`backSchedule`/`titleSchedule`, `backAlerts`/`titleAlerts`

### 10.4 Pomiar

`cameraStage`, `cameraVideo`, `cameraOverlay`, `cameraPlaceholder`,
`cameraPlaceholderText`, `btnStart`, `btnStop`, `btnSwitchCamera`,
`measureControls`, `tileGrid`, `sessionSummary`, `sessionDuration`,
`sessionSamples`, `sessionZoneGood`, `sessionZoneWarning`,
`sessionZoneCritical`, `calibrationNotice`, `disclaimerMeasure`,
`teaserBanner`, `teaserClose`

Kafelki generuje `Viz.buildTiles()` w `tileGrid`, schemat identyfikatorów
(`<id>` = `share|brightness|kelvin|melanopic|flicker|uniformity|comfort`):
`tile-<id>`, `tileName-<id>`, `tileValue-<id>`, `tileUnit-<id>`,
`tileZone-<id>`, `tileGauge-<id>`, `tileHelp-<id>`, `tileLock-<id>`,
`tileUnlock-<id>`

### 10.5 Historia

`chartMain`, `chartLegend`, `chartMetricSelect`, `chartRangeGroup`,
`range1m`, `range1h`, `range24h`, `range7d`, `range30d`, `chartEmpty`,
`historyLockNotice`, `btnOpenReports`, `btnOpenExport`, `tableToggle`,
`tableWrap`, `readingsTable`, `readingsBody`, `adSlotHistory`

### 10.6 Narzędzia

`toolsList`, `btnToolCompare`, `btnToolCalibration`, `btnToolScreenCheck`,
`btnToolSchedule`, `btnToolAlerts`, `btnToolProfiles`, `adSlotTools`

### 10.7 Premium

`premiumHero`, `premiumDemoBadge`, `premiumStatus`, `planList`,
`featureMatrix`, `btnRestorePurchases`, `btnManageSubscription`,
`promoInput`, `btnPromoApply`, `premiumFootnote`

Karty planów (`<productId>` = `premium_monthly|premium_yearly|premium_lifetime|noads_lifetime`):
`plan-<productId>`, `price-<productId>`, `renew-<productId>`,
`terms-<productId>`, `buy-<productId>`, `badge-<productId>`

### 10.8 Konto

`accountDemoBadge`, `accountStatus`, `accountAvatar`, `accountName`,
`accountEmail`, `accountProvider`, `accountSignedOutBox`, `accountSignedInBox`,
`btnSignInGoogle`, `btnSignInFacebook`, `btnSignOut`, `btnDeleteAccount`,
`btnSyncNow`, `syncToggle`, `syncStatus`, `accountError`,
`accountSubscriptionBox`, `btnCancelSubscription`, `accountLoginNote`

### 10.9 Więcej

`btnOpenAccount`, `btnOpenThresholds`, `btnOpenDocs`, `themeSelect`,
`textScaleSelect`, `contrastToggle`, `soundToggle`, `vibrateToggle`,
`adsPersonalisedToggle`, `simulateFailuresToggle`, `btnClearHistory`,
`btnResetDemo`, `appVersion`, `adSlotMore`

### 10.10 Progi i profile

`thresholdList`, `btnThresholdsReset`, `profileList`, `profileNameInput`,
`btnProfileSave`, `profilesLockNotice`

Suwaki generowane per metryka: `thWarn-<id>`, `thCrit-<id>`,
`thWarnLabel-<id>`, `thCritLabel-<id>`, `thRow-<id>`

### 10.11 Ekrany narzędzi

* Raporty: `reportKindDay`, `reportKindWeek`, `reportDate`, `reportBody`,
  `reportLockNotice`, `reportSample`
* Eksport: `exportRangeSelect`, `exportMetricList`, `exportPreview`,
  `btnExportRun`, `exportLockNotice`
* Porównywarka: `compareSlotA`, `compareSlotB`, `btnCaptureA`, `btnCaptureB`,
  `compareTable`, `compareVerdict`, `btnCompareClear`, `compareLockNotice`
* Kalibracja: `calibStatus`, `calibProgress`, `btnCalibStart`, `btnCalibClear`,
  `calibResult`, `calibLockNotice`
* Sprawdź mój monitor: `screenCheckStep`, `screenCheckHint`, `btnScreenNext`,
  `btnScreenCancel`, `screenCheckResult`, `screenCheckLockNotice`
* Harmonogram: `scheduleToggle`, `scheduleRules`, `btnScheduleAdd`,
  `scheduleLockNotice`
* Alerty: `alertsToggle`, `alertsMetricSelect`, `alertsLevelSelect`,
  `alertsSustainInput`, `alertsSoundToggle`, `alertsLockNotice`, `alertBar`

### 10.12 Arkusze

* `sheetPaywall`: `paywallDemoBadge`, `paywallTitle`, `paywallBody`,
  `paywallFeature`, `paywallPlans`, `paywallWatchAd`, `paywallClose`
* `sheetPurchase`: `purchaseDemoBadge`, `purchaseTitle`, `purchaseProduct`,
  `purchasePrice`, `purchaseRenew`, `purchaseTerms`, `purchaseSpinner`,
  `purchaseConfirm`, `purchaseCancel`
* `sheetLogin`: `loginDemoBadge`, `loginTitle`, `loginProviderName`,
  `loginSpinner`, `loginNote`, `loginError`, `loginCancel`
* `sheetRewarded`: `rewardedDemoBadge`, `rewardedTitle`, `rewardedTimer`,
  `rewardedReward`, `rewardedSkip`, `rewardedClose`
* `sheetDialog`: `dialogTitle`, `dialogBody`, `dialogConfirm`, `dialogCancel`
* `sheetHelp`: `helpTitle`, `helpBody`, `helpClose`

### 10.13 Klasy CSS współdzielone (definiuje wyłącznie `styles.css`)

`.panel`, `.panel--overlay`, `.panel-header`, `.card`, `.card--flat`,
`.list`, `.list-row`, `.list-row__icon`, `.list-row__text`,
`.btn`, `.btn--primary`, `.btn--tonal`, `.btn--text`, `.btn--danger`,
`.btn--icon`, `.chip`, `.chip--selected`, `.tile`, `.tile--locked`,
`.tile__value`, `.tile__gauge`, `.zone-dot`, `.zone--good`, `.zone--warning`,
`.zone--critical`, `.demo-badge`, `.lock-badge`, `.ad-slot`, `.ad-label`,
`.sheet`, `.sheet__scrim`, `.toast`, `.switch`, `.slider`, `.field`,
`.notice`, `.notice--warning`, `.notice--info`, `.sr-only`, `.spinner`,
`.plan-card`, `.plan-card--recommended`, `.empty-state`

Tokeny (`:root` w `styles.css`, przedefiniowane w
`@media (prefers-color-scheme: dark)` oraz w `[data-theme="dark"]` /
`[data-theme="light"]`):
`--bg`, `--surface`, `--surface-2`, `--surface-3`, `--on-bg`, `--on-surface`,
`--on-surface-muted`, `--outline`, `--accent`, `--on-accent`,
`--accent-container`, `--on-accent-container`, `--zone-good`, `--zone-warning`,
`--zone-critical`, `--on-zone`, `--demo-bg`, `--demo-fg`, `--danger`,
`--focus-ring`, `--radius-card`, `--radius-pill`, `--gap`, `--tap-min` (48px),
`--font-stack`, `--text-scale`.

`--font-stack` = `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.
Żadnych czcionek z sieci.

---

## 11. Klucze localStorage

Prefiks `ms2.` (Monitor Światła v2). Każdy zapis w `try/catch` — tryb prywatny
i wyczerpany limit nie mogą wywrócić aplikacji.

| Klucz | Właściciel | Zawartość | Reset demonstracyjny |
|---|---|---|---|
| `ms2.settings.v1` | P1 | motyw, skala tekstu, kontrast, dźwięk, wibracja, `simulateFailures`, `firstRunDone` | **zachowany** |
| `ms2.thresholds.v1` | P2 | progi `{<metricId>:{warn,crit}}` | **zachowany** |
| `ms2.history.v1` | P2 | historia długa, forma tablicowa, ≤ 15 000 rekordów | **zachowany** |
| `ms2.session.v1` | P2 | podsumowanie ostatniej sesji | **zachowany** |
| `ms2.calibration.v1` | P2 | `{gainR,gainG,gainB,at}` | **zachowany** |
| `ms2.profiles.v1` | P4 | profile progów użytkownika | **zachowany** |
| `ms2.schedule.v1` | P4 | reguły harmonogramu | **zachowany** |
| `ms2.alerts.v1` | P4 | konfiguracja alertów | **zachowany** |
| `ms2.compare.v1` | P4 | zapisane sloty A/B | **zachowany** |
| `ms2.billing.v1` | P3 | paragony, uprawnienia, subskrypcja, kody promocyjne | **kasowany** |
| `ms2.account.v1` | P3 | konto demonstracyjne, stan synchronizacji | **kasowany** |
| `ms2.cloud.v1` | P3 | atrapa „chmury” dla synchronizacji profilu | **kasowany** |
| `ms2.ads.v1` | P4 | licznik nagród dobowy, wybór dopasowania reklam | **kasowany** |
| `ms2.tour.v1` | P1 | odhaczone podpowiedzi pierwszego uruchomienia | **kasowany** |

**Zasada własności danych.** `Store.resetDemo()` kasuje wyłącznie fikcję
(`billing`, `account`, `cloud`, `ads`, `tour`). Pomiary, progi, profile,
kalibracja, harmonogram, alerty i porównania to własność użytkownika i zostają.
Kasowanie pomiarów jest osobną, wyraźnie opisaną akcją `btnClearHistory`
z własnym potwierdzeniem („Tej operacji nie da się cofnąć”).
Przycisk `btnResetDemo` ma podpis: „Kasuje wyłącznie stan demonstracyjny:
konto, zakupy i licznik reklam. Twoje pomiary, progi i profile zostają.”

---

## 12. Zachowania międzymodułowe (rozstrzygnięcia, nie sugestie)

1. **Kto pokazuje paywall.** Wyłącznie `Store`, po zdarzeniu `store:paywall`,
   przez `UI.openSheet('sheetPaywall')`. `Viz` i `Tools` nigdy nie otwierają
   arkusza samodzielnie — wołają `Store.requireFeature()` i przerywają, gdy
   dostaną `false`.
2. **Moment wartości.** Zaproszenie do Premium na ekranie Pomiar może pojawić
   się dopiero po **45 s nieprzerwanego pomiaru**, maksymalnie **raz na sesję**,
   jako pasek `teaserBanner` **pod** kafelkami (nigdy nad przyciskami), z
   przyciskiem zamknięcia `teaserClose`. Wyzwala je `Store` po `engine:started`
   plus własny timer, kasowany przy `engine:stopped`.
3. **Nagroda z reklamy.** `Ads.showRewarded(featureId)` po sukcesie woła
   `Store.grantTemporary(featureId, Ads.REWARD_MS, 'reward')` i emituje
   `ads:reward`. `Store` przelicza uprawnienia i emituje `store:entitlements`.
4. **Odświeżanie po zmianie uprawnień.** Na `store:entitlements` reagują:
   `Viz` (kafelki, zakresy wykresu), `Ads` (`refresh`), `Tools` (blokady
   ekranów), `UI` (odznaka Premium w nagłówku i na `navPremium`).
5. **Synchronizacja profilu.** `Account.snapshot()` zbiera dane, wołając
   `Engine.getThresholds()`, `Tools.listProfiles()`, `Tools.getSchedule()`,
   `Tools.getAlerts()`, `UI.getSetting()`. Zastosowanie danych z „chmury” idzie
   przez `Engine.setThresholds()`, `Tools.setSchedule()` itd. — nigdy przez
   bezpośredni zapis do localStorage cudzego modułu.
6. **Nikt nie czyta cudzego klucza localStorage.** Dane bierze się przez API
   modułu-właściciela.
7. **`prefers-reduced-motion`.** Przy `reduce`: brak animacji wejścia arkuszy,
   brak przejść kafelków, licznik reklamy nagradzanej bez pulsowania.
   Wskaźniki postępu zostają (są informacją, nie ozdobą).
8. **Serwis worker.** `sw.js` cache'uje wyłącznie własne pliki v2 z listy
   `APP_SHELL` (nazwa cache `monitor-swiatla-v2-1`, strategia cache-first
   z zapisem odpowiedzi). Nie dotyka zakresu wersji 1 — rejestracja z
   `docs/v2/` daje `scope: './'`.

---

## 13. Kroki integracji (dla agenta integrującego, po kolei)

1. Sprawdź, że `docs/` poza `docs/v2/` nie ma żadnych zmian (`git status`).
   Jakakolwiek modyfikacja poza `v2/` to błąd blokujący.
2. Zbierz pliki: `index.html`, `styles.css`, `bus.js`, `ui.js`, `engine.js`,
   `viz.js`, `account.js`, `store.js`, `store.css`, `ads.js`, `tools.js`,
   `tools.css`, `manifest.webmanifest`, `sw.js`. Potwierdź, że `metrics.js`
   jest bajt w bajt taki, jak przed pracami.
3. Zweryfikuj kolejność skryptów i arkuszy w `index.html` zgodnie z rozdz. 1.
4. Zestaw listę wszystkich `getElementById` z `engine.js`, `viz.js`,
   `account.js`, `store.js`, `ads.js`, `tools.js` i porównaj z rozdziałem 10.
   Każde odwołanie do identyfikatora spoza listy albo nieobecnego w
   `index.html` — błąd blokujący.
5. Zestaw listę wszystkich `Bus.emit` i `Bus.on` i porównaj z rozdziałem 4.
   Nazwa spoza rejestru — błąd blokujący. Zdarzenie emitowane, którego nikt nie
   słucha — ostrzeżenie do zgłoszenia.
6. Sprawdź, że poza `ui.js` żaden plik nie ustawia `.hidden`, `style.display`
   ani `aria-selected` na elementach `panel*`, `nav*`, `sheet*`.
7. Sprawdź, że poza `store.js` żaden plik nie decyduje o uprawnieniach — jedyne
   dozwolone wywołania to `Store.has()` i `Store.requireFeature()`.
8. Sprawdź brak `fetch`, `XMLHttpRequest`, `WebSocket`, `import(`, `<script src>`
   i `@import`/`url()` wskazujących poza `docs/v2/` i `../icons/`, we wszystkich
   plikach poza `sw.js`.
9. Sprawdź, że każdy ekran i arkusz z rozdziałów 2.2 i 2.3 dotyczący konta,
   płatności lub reklamy zawiera element `.demo-badge`.
10. Uzupełnij `APP_SHELL` w `sw.js` o pełną listę plików z kroku 2 i podnieś
    numer cache.
11. Smoke test bez konta i bez zakupu: Start → 60 s pomiaru → 4 darmowe kafelki
    pokazują wartości, 3 premium pokazują kłódkę, wykres 1 min i 1 h działa,
    tabela rośnie, Stop działa, żaden baner nie pojawił się na ekranie Pomiar.
12. Smoke test zakupu: Premium → `premium_yearly` → arkusz pokazuje „7 dni
    bezpłatnie, potem 79,99 zł rocznie” **z datą końca próby** i kwotą na
    przycisku → potwierdź → wszystkie kafelki i zakresy odblokowane
    natychmiast, historia z ostatnich minut widoczna wstecz.
13. Smoke test logowania: Konto → Google (DEMO) → arkusz z paskiem DEMO →
    anuluj → stan `signedOut`, nic nie zapisane; powtórz z dokończeniem →
    `signedIn`, synchronizacja działa, żadna funkcja płatna **nie** została
    odblokowana.
14. Smoke test resetu: `btnResetDemo` → konto i zakupy znikają, historia
    pomiarów, progi i profile zostają.
15. Test dostępności: przejście całej aplikacji samym `Tab`/`Enter`/`Escape`;
    każdy cel ≥ 48 px; `prefers-reduced-motion: reduce` wyłącza animacje;
    kontrast sprawdzony w obu motywach; czytnik ekranu ogłasza zmianę ekranu
    i strefę metryki.
16. Test offline: wyłącz sieć, przeładuj — aplikacja wstaje z cache.

---

## 14. Kryteria odbioru (definicja ukończenia)

* Aplikacja startuje z `docs/v2/index.html` bez ani jednego błędu w konsoli.
* Wersja 1 w `docs/` działa dalej bez zmian.
* Pomiar działa w pełni bez konta, bez zakupu i bez połączenia z siecią.
* Każdy z 15 paneli jest osiągalny w ≤ 2 dotknięciach, a Dokumentacja w 1.
* Każdy ekran monetyzacji i konta ma widoczny znacznik DEMO.
* Kwota odnowienia i sposób rezygnacji widoczne przed zakupem, kwota także
  na przycisku.
* Zero zapytań sieciowych poza `sw.js`.
* Interfejs w całości po polsku z diakrytykami; komentarze w kodzie po
  angielsku.
