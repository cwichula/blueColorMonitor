# Monitor Światła v5 — kontrakt implementacyjny

Ten plik jest **jedynym źródłem prawdy** dla wszystkich modułów v5. Każdy plik
powstaje niezależnie, więc nazwy eksportów, nazwy tokenów CSS i nazwy klas
poniżej są **wiążące co do znaku**. Jeśli czegoś tu nie ma — dopisz to w swoim
pliku, ale nie zmieniaj tego, co jest.

## 0. Zasady globalne

- **Zero zależności zewnętrznych. Zero kroku budowania.** Pliki lądują na GitHub
  Pages i mają działać po skopiowaniu katalogu.
- **ES modules** (`<script type="module">`), składnia ES2020+ (`const`, `let`,
  klasy, `?.`, `??`). Bez transpilacji.
- **Ścieżki względne** wszędzie (`./`, `../`) — aplikacja musi działać spod
  `/v5/`, spod `/blueColorMonitor/docs/v5/` i z lokalnego katalogu.
- **Język interfejsu: trzydzieści języków**, przełączane w ustawieniach,
  domyślnie językiem urządzenia. **Zapasem jest ANGIELSKI, nie polski**: język
  spoza listy i klucz brakujący w słowniku schodzą na angielski, a dopiero
  potem na samą nazwę klucza. Polski jest jednym z trzydziestu — jest za to
  źródłem treści (`js/i18n/locales/pl.js`).
  **W kodzie nie ma napisów dla człowieka** — jest klucz i `t('klucz')`.
  Liczby, daty i odmianę liczebnika formatuje wyłącznie `js/format.js`, wedle
  aktywnego języka (`Intl` + wzorce ze słownika).
- **Komentarze w kodzie: po polsku**, zwięzłe, tłumaczą *dlaczego*, nie *co*.
  Bez komentarzy-oczywistości. Nagłówek pliku: 3–8 linii o roli pliku.
- **Prywatność**: pomiar w całości lokalny. Nic nie wychodzi do sieci. Żadnych
  fontów z CDN, żadnych analityk, żadnego `fetch` poza własnymi plikami.
- **Uczciwość pomiaru**: żadna liczba nie jest przedstawiana jako pomiar
  fotometryczny ani wynik medyczny. Wartość niezmierzona to `null` i wyświetla
  się jako `—`, nigdy jako 0 ani jako dobry wynik.
- **Model: dobrowolne wsparcie.** Wszystkie siedem wielkości, historia,
  narzędzia i tryb offline działają dla każdego, od razu, bez konta i bez
  opłat. Nie ma uprawnień, kłódek ani rozmytych wartości — jeżeli coś
  takiego znajdzie się w kodzie, jest to błąd, nie funkcja. Jedyna warstwa
  pieniędzy to `js/support.js`: jeden adres profilu Buy Me a Coffee, który
  użytkownik może kliknąć na ekranie „Wsparcie”. Darowizna **niczego nie
  odblokowuje** i ekran mówi to wprost.
- Dostępność jest wymogiem, nie dodatkiem: kontrast tekstu ≥ 4.5:1, cel dotyku
  ≥ 44 px, pełna obsługa klawiaturą, widoczny `:focus-visible`, poprawne role
  ARIA, `prefers-reduced-motion`.

## 1. Drzewo plików i właściciele

```
docs/v5/
  index.html                 powłoka + skrypt anty-FOUC (rejestracja SW: js/app.js)
  manifest.webmanifest
  sw.js
  css/tokens.css             tokeny, motywy, akcenty, skala tekstu
  css/base.css               reset, typografia, layout powłoki, utils a11y
  css/components.css         przyciski, karty, kafelki, arkusze, dialogi, toasty…
  css/screens.css            układy czterech ekranów
  icons/                     ikony PWA (192, 512, maskable 512)
  js/format.js               formatowanie liczb, jednostek, dat, czasu
  js/bus.js                  szyna zdarzeń
  js/i18n/index.js           silnik językowy: lista 30 języków, wykrycie, t(), dir
  js/i18n/locales/pl.js      słownik polski — ŹRÓDŁO TREŚCI
  js/i18n/locales/en.js      słownik angielski — ZAPAS dla brakujących kluczy
  js/i18n/locales/<kod>.js   pozostałe 28 języków
  js/metrics.js              adapter do ../lib: re-eksport + trzy zgodności z v5
  js/store.js                ustawienia (localStorage) + atrybuty na <html>
  js/history.js              bufor i trwałość historii pomiarów
  js/camera.js               getUserMedia, próbkowanie klatek, stan sesji
  js/support.js              warstwa wsparcia: SUPPORT_URL + walidacja adresu
  js/router.js               router po hashu
  js/ui/dom.js               h(), utils DOM, focus trap, ikony SVG
  js/ui/overlays.js          arkusz, dialog, toast, scrim
  js/ui/gauge.js             wskaźnik-bohater, kafelek-wskaźnik, sparkline
  js/ui/chart.js             wykres historii (canvas)
  js/screens/measure.js
  js/screens/history.js
  js/screens/tools.js
  js/screens/support.js
  js/app.js                  powłoka: topbar, tabbar/sidenav, montaż ekranów
```

Kolejność importów jest drzewem — moduł niższy nigdy nie importuje wyższego:

```
bus, metrics                (liść, bez importów)
store        -> bus, metrics
i18n         -> bus, store          (słowniki dociągane dynamicznie)
format       -> i18n, bus           (+ ../lib/catalogue.js)
history      -> bus, metrics, format
camera       -> bus, metrics, store
support      -> (liść, bez importów)
ui/dom       -> store (dynamicznie, wyłącznie settings.haptics; import w dół drzewa, więc bez cyklu)
ui/overlays  -> ui/dom
ui/gauge     -> ui/dom, metrics, format, store
ui/chart     -> ui/dom, metrics, format, store
screens/*    -> wszystko powyżej
router       -> bus
app          -> wszystko
```

## 2. Nazewnictwo CSS

Prefiks **`m5-`**, konwencja BEM: `m5-card`, `m5-card__title`,
`m5-card--flat`. Stan przez atrybuty danych, nie klasy: `[data-zone="warn"]`,
`[data-state="active"]`, `[hidden]`, `aria-*`.

Nigdy nie stylujemy po ID. Nigdy `!important` (jedyny wyjątek: `.m5-sronly`).

## 3. Tokeny CSS (`css/tokens.css`) — nazwy wiążące

Motyw ustawiany atrybutami na `<html>`:
`data-theme="light|dark"` (brak atrybutu = automatyczny wg systemu),
`data-accent="ocean|violet|amber|mint|rose"`,
`data-text-scale="1.15|1.3"` (brak = 1),
`data-density="compact"` (brak = comfortable),
`data-motion="reduced"` (brak = wg systemu).

Struktura pliku — **jasna paleta w gołym `:root`**, ciemna redefiniowana
dwukrotnie: w `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { … } }`
oraz w `:root[data-theme="dark"] { … }`. Żaden kolor nie ma jedynej definicji
wewnątrz media query.

### Powierzchnie i tekst
```
--surface-0   tło strony
--surface-1   karta
--surface-2   karta uniesiona / arkusz / topbar
--surface-3   popover, menu
--surface-sunken  wgłębienie (tor slidera, tło wykresu)
--surface-scrim   półprzezroczysta zasłona pod modalem
--text-1  główny   --text-2  drugorzędny   --text-3  wygaszony
--line-1  włos     --line-2  wyraźna       --line-strong  obwódka kontrolki
```
### Akcent (zmienia go `data-accent`)
```
--accent  --accent-hover  --accent-press  --accent-soft  --accent-on  --accent-ring
```
### Strefy pomiaru (jeden język koloru w całej aplikacji)
```
--zone-good --zone-good-soft --zone-good-on
--zone-warn --zone-warn-soft --zone-warn-on
--zone-crit --zone-crit-soft --zone-crit-on
--zone-none --zone-none-soft            (brak danych / wielkość zablokowana)
```
Barwy stref muszą być rozróżnialne przy deuteranopii — nie polegamy wyłącznie
na barwie: każdy element strefowy ma też etykietę słowną albo kształt.

### Rytm, promienie, typografia, cień, ruch
```
--sp-1:4px --sp-2:8px --sp-3:12px --sp-4:16px --sp-5:20px --sp-6:24px --sp-7:32px --sp-8:48px
--r-sm:10px --r-md:14px --r-lg:20px --r-xl:28px --r-pill:999px
--ff-sans  (system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif)
--ff-num   (ui-monospace, "SF Mono", "Segoe UI Mono", Menlo, monospace) + font-variant-numeric: tabular-nums
--fs-display --fs-h1 --fs-h2 --fs-h3 --fs-body --fs-sm --fs-xs
   (skalowane przez clamp(); data-text-scale mnoży rozmiar bazowy na :root)
--lh-tight --lh-normal
--shadow-1 --shadow-2 --shadow-3        (w motywie ciemnym słabsze + subtelna obwódka)
--dur-1:120ms --dur-2:200ms --dur-3:320ms
--ease-out: cubic-bezier(.2,.8,.3,1)   --ease-in-out
--tap:44px  --content-max:min(760px,100%)  --safe-b: env(safe-area-inset-bottom,0px)  --safe-t: env(safe-area-inset-top,0px)
```
Przy `data-motion="reduced"` i przy `@media (prefers-reduced-motion: reduce)`
wszystkie `--dur-*` schodzą do `1ms`.

## 4. Kontrakty modułów JS

Wszystkie moduły eksportują **nazwane** eksporty (bez `export default`).

### js/i18n/index.js
Jedyne miejsce, które wie cokolwiek o językach. Żaden inny moduł nie zagląda do
`locales/` i nie zna kodów języków.
```js
export const LANGUAGES = [{code, name, dir}, …]   // 30 pozycji, `name` to ENDONIM ('Deutsch', '日本語'), dir 'ltr'|'rtl' (rtl: ar, ur, fa)
export const DEFAULT_LANGUAGE = 'en'
export function init() -> Promise<code>        // raz, PRZED pierwszym rysowaniem; nigdy nie odrzuca
export function ready() -> Promise<code>       // ta sama obietnica dla spóźnionych modułów
export function t(key, params) -> string       // wstawki {nazwa}; wartość-obiekt = formy CLDR wybierane przez Intl.PluralRules po params.n (albo params.count)
export function has(key) -> boolean
export function locale() -> 'pl'               // znacznik dla Intl (liczby, daty, odmiana)
export function dir() -> 'ltr'|'rtl'
export function setLanguage(code) -> Promise<code>   // null albo 'system' = wg urządzenia
export function detect() -> code               // wybór użytkownika -> navigator.languages -> 'en'
export function isSupported(code) -> boolean
export function languageInfo(code) -> {code, name, dir}|null
```
Wykrycie: zapis w `store` → `navigator.languages` po kolei, z dopasowaniem po
samym kodzie języka (`de-AT` → `de`, `zh-TW` → `zh`) → **angielski**.
Szukanie klucza: aktywny język → angielski → sam klucz (+ `console.warn` na
localhost). `setLanguage` ustawia `lang` i `dir` na `<html>`, zapisuje wybór
przez `store.set({language})` i emituje `'i18n:changed'`.
Słowniki: `export default { … }` — **płaska** mapa kluczy kropkowanych na
napisy albo na obiekty form CLDR (`{one, few, many, other}`). Nazwy wstawek są
takie same we wszystkich językach.

### js/format.js
```js
export function nf(value, decimals = 0) -> string   // wg aktywnego języka, '—' dla null/NaN
export function metricValue(metricId, value) -> string      // używa decimals z katalogu
export function metricValueUnit(metricId, value) -> string  // '27 %', '5200 K', '0,84 ×'
export function clock(ts) -> '14:07' / '2:07 PM'
export function dateShort(ts) -> '24 sie' / 'Aug 24'
export function dateTime(ts) -> '24 sie, 14:07'
export function duration(ms) -> '1 godz. 12 min' / '45 s'
export function relative(ts, now = Date.now()) -> 'przed chwilą' / '3 min temu' / 'wczoraj'
export function plural(n, key) -> string   // klucz form CLDR: '1 pomiar' / '2 pomiary' / '5 pomiarów'
export function zoneLabel(zone) -> 'dobrze' | 'umiarkowanie' | 'krytycznie' | 'brak danych'
export const ZONE_LABEL = {good, warn, crit, none}   // PRZEJŚCIOWE: gettery na zoneLabel(), znika w etapie 3
```
Ani jednego napisu w tym pliku: wzorce (`'{day} {month}'`, `'{minutes} min
temu'`, formy mnogie) siedzą w słownikach, a moduł wstawia w nie liczby.
Skróty miesięcy bierze ze słownika (`date.month.short.1…12`), a nie z
`Intl.DateTimeFormat`, bo ICU zwraca dla polskiego raz „sie”, raz „sie.”
zależnie od przeglądarki. Zegar odwrotnie — bierze z `Intl`, bo wzorzec
`{hours}:{minutes}` nie umie powiedzieć „2:07 PM”. Pamięć podręczna instancji
`Intl` jest kluczowana **językiem** i czyszczona na `'i18n:changed'`.

`plural(n, one, few, many)` z trzema polskimi słowami jest **przejściowy**
(czternaście wywołań w ekranach, znikają w etapie 3) i odmienia po polsku.

`format.js` nie importuje `metrics.js` — mapy `DECIMALS` i `UNITS` buduje
pętlą z katalogu wielkości, importowanego wprost z `../../lib/catalogue.js`,
więc liczby miejsc po przecinku i jednostki nie są przepisane drugi raz z ręki.
Liściem drzewa importów przestał być z chwilą wprowadzenia tłumaczeń: doszedł
`i18n/index.js`, bo bez znajomości języka nie da się sformatować liczby.

### js/bus.js
```js
export const bus = { on(name, fn) -> unsubscribeFn, once(name, fn), off(name, fn), emit(name, payload) }
```
Zdarzenia (pełna lista, nikt nie wymyśla nowych bez dopisania tutaj):
```
'camera:state'    {state:'idle'|'starting'|'running'|'error', facing, error?}
'camera:reading'  {reading}          ~10 Hz
'camera:error'    {code, messagePL}
'history:changed' {count}
'history:session' {session}
'settings:changed'{settings}
'route:changed'   {route, previous}
'i18n:changed'    {lang, dir, previous}   // język przełączony; ekrany rysują się od nowa
```

### js/metrics.js
Wzory nie mieszkają w tym pliku. Wszystkie liczy `docs/lib` (moduły ES, testy
w `node --test`), a ten plik jest wyłącznie warstwą adaptacyjną: re-eksportuje
funkcje wprost i tylko w trzech miejscach (`blueShare`, `melanopicRatio`,
`flicker`) zamienia `null` biblioteki na `0`, które v5 pokazuje od pierwszego
dnia. Klasyczną redakcją tych samych wzorów jest `docs/shared/metrics.js`
(używają jej v2–v4); zgodności obu pilnuje `docs/lib/shared-parity.test.js`.
Pliki z `docs/lib` wchodzą do grafu importów v5, więc muszą stać na liście
`APP_SHELL` w `sw.js` — inaczej po utracie sieci będzie biały ekran.
Poniższe sygnatury obowiązują bez zmian:
```js
export function toLinear(c8)              // sRGB gamma -> linear
export function toXYZ(rLin, gLin, bLin)
export function blueShare(r, g, b) -> %
export function brightness(r, g, b) -> %
export function colourTemperature(r, g, b) -> {kelvin|null, reliable, duv}
export function melanopicRatio(r, g, b) -> number
export function flicker(samples, sampleHz) -> {percent|null, hz|null, withinRange}
export function uniformity(cellLuminances) -> %|null
export function comfortIndex({melanopic, kelvin, flickerPercent, uniformity}) -> {score, penalties[], measured}
export function zoneFor(value, warn, crit, invert) -> 'good'|'warn'|'crit'|null
export const CATALOGUE = [...]   // 7 pozycji, id i kolejność jak w ../shared/metrics.js
export function byId(id)
```
Katalog opisuje wyłącznie wielkości i ich progi — nie ma w nim żadnego pola
sterującego dostępem, bo wszystkie siedem jest dostępnych zawsze.
**Uczciwość zwracanych wartości:** `colourTemperature` zwraca `kelvin: null`,
gdy `reliable` jest fałszem (wielomian poza zakresem ważności albo chromatyczność
daleko od krzywej Plancka) — obcięta do granicy liczba wyglądałaby jak pomiar.
`comfortIndex().measured` mówi, czy KTÓREKOLWIEK wejście było liczbą, a nie ile
było kar; kara ≤ 0,5 pkt nie trafia na listę i nie schodzi z wyniku, więc
rozbicie sumuje się do oceny.

**Uwaga na nazwę strefy:** v4 zwracało `'critical'`. W v5 kanoniczna nazwa to
**`'crit'`** — spójna z tokenami `--zone-crit-*` i z `data-zone="crit"`.
Etykiety kar w `comfortIndex` zostają po polsku, jak w v4.

Pola pozycji katalogu (jak w v4, plus `icon`):
`{id, namePL, unit, shortPL, helpPL, decimals, min, max, warn, crit, invert, icon}`
gdzie `icon` to nazwa ikony z `ui/dom.js`:
share→`droplet`, brightness→`sun`, kelvin→`thermometer`, melanopic→`moon`,
flicker→`wave`, uniformity→`grid`, comfort→`heart`.

### js/store.js
Klucz `ms5.settings.v1`. Zapisuje wyłącznie ten moduł. Odporny na tryb
prywatny (każdy dostęp do `localStorage` w `try/catch`).
```js
export const DEFAULTS = {
  language:null,          // null = wg urządzenia; kod języka = wybór użytkownika
  theme:'system', accent:'ocean', textScale:1, density:'comfortable', motion:'system',
  leadMetric:'share', historyRange:'1h', keepAwake:true, haptics:true,
  thresholds:{},          // { [metricId]: {warn, crit} } — nadpisania użytkownika
  calibration:{r:1, g:1, b:1},
  onboarded:false
}
export function get() -> settings (kopia)
export function set(patch)            // waliduje, zapisuje, stosuje na <html>, emituje 'settings:changed'
export function reset()
export function thresholdsFor(metricId) -> {warn, crit}   // nadpisanie albo katalog
export function applyToRoot()          // data-theme/-accent/-text-scale/-density/-motion + meta theme-color
export const ACCENTS = [{id, namePL, swatchLight, swatchDark}, …]  // 5 pozycji
export const THEMES = ['system','light','dark']
```
`store.js` importuje `metrics.js` wyłącznie po to, by `thresholdsFor` mogło
sięgnąć do katalogu; to jedyny wyjątek od drzewa z sekcji 1.
Pole `language` sprawdza wyłącznie co do KSZTAŁTU (dwie–trzy małe litery albo
`null`), a nie wobec listy trzydziestu języków: lista mieszka w
`js/i18n/index.js`, który importuje `store` — import w drugą stronę zrobiłby
cykl. Kod spoza listy rozstrzyga i18n, schodząc na zapas.

### js/history.js
```js
export function push(reading)                    // wywołuje camera.js
export function all() -> Point[]
export function range(rangeId) -> Point[]        // '1m'|'5m'|'1h'|'24h'|'7d'|'30d'
export const RANGES = [{id, labelPL, ms, bucketMs}, …]
export function series(metricId, rangeId) -> {points:[{t, v}], min, max, avg, count}
export function stats(metricId, rangeId) -> {min, max, avg, last, trend}   // trend: -1|0|1
export function sessions() -> Session[]
export function noteSession(session)             // wywołuje camera.js po stop()
export function clear()
export function exportCSV() -> string            // nagłówki po polsku, separator ';', przecinek dziesiętny
export function exportJSON() -> string
```
`Point = {t:number, share, brightness, kelvin, melanopic, flicker, uniformity, comfort}`
(wartości niezmierzone: `null`). Trwałość: `localStorage`, klucze
`ms5.history.v1` i `ms5.sessions.v1`, kompaktowy zapis (tablica tablic, nie
obiekty), limit ~30 dni / ~20 000 punktów, starsze próbki agregowane do
minutowych średnich. Przy `QuotaExceededError` przycina najstarsze i próbuje
raz jeszcze, nigdy nie rzuca wyżej. Zapis do `localStorage` jest dławiony
(nie częściej niż raz na ~5 s), bo `push` przychodzi 10 razy na sekundę.

### js/camera.js
Odpowiada za `getUserMedia`, rysowanie klatki na ukrytym canvasie, uśrednianie
kadru w siatce 3×3 i zamianę na `reading`. Wzoruj się na `docs/shared/engine.js`
(ta sama fizyka: crop ~60 % kadru, ~10 Hz, okno migotania 32 próbek), ale API
jest nowe:
```js
export const SAMPLE_HZ = 10
export function attach({video, canvas})   // elementy z index.html
export async function start(facing = 'environment')
export function stop()
export function toggle()
export async function switchCamera()
export function state() -> 'idle'|'starting'|'running'|'error'
export function facing() -> 'environment'|'user'
export function last() -> reading|null
export function session() -> {startedAt, endedAt, samples, avg:{…}, min:{…}, max:{…}}|null
```
`reading = {t, r, g, b, share, brightness, kelvin, kelvinReliable, melanopic,
flicker, flickerHz, flickerInRange, uniformity, comfort, comfortPenalties,
zones:{[id]: 'good'|'warn'|'crit'|null}}`

Obsługa błędów — kod + gotowy polski komunikat, bez surowego `err.message`:
`'denied'` (odmowa dostępu), `'notfound'` (brak kamery), `'inuse'` (kamera
zajęta), `'insecure'` (potrzebny HTTPS lub localhost), `'unsupported'`,
`'unknown'`. Kalibracja ze `store.js` mnoży kanały przed liczeniem metryk.
Przy `visibilitychange` na ukrytą kartę pomiar się pauzuje, przy powrocie
wznawia. `keepAwake` → Screen Wake Lock API, opcjonalnie i defensywnie.
`camera.js` sam wywołuje `history.push()`? **Nie** — to robi `screens/measure.js`,
żeby historia nie rosła, gdy ekran pomiaru nie jest zamontowany. Zamiast tego
`camera.js` emituje `'camera:reading'`.

### js/support.js
Cała warstwa wsparcia. Zero sieci, zero pamięci, zero stanu — moduł tylko
podaje adres i pilnuje, żeby nie był śmieciem.
```js
export function supportUrl() -> string      // '' == profil niepodłączony
export function hasSupportUrl() -> boolean
```
Na samej górze pliku, zaraz za nagłówkiem i **przed jakimkolwiek kodem**, stoi
dokładnie jedna stała do wypełnienia przez właściciela:
```js
const SUPPORT_URL = '';
```
Wymagania, od których nie ma odstępstwa:
- przyjmujemy **wyłącznie `https://` i wyłącznie host `buymeacoffee.com`
  (albo `www.buymeacoffee.com`)** — lista `SUPPORT_HOSTS` zawęża walidację do
  jedynej dopuszczalnej monetyzacji; cokolwiek innego (`javascript:`, literówka
  w schemacie, cudzy serwis, adres nie do rozebrania) `supportUrl()` zwraca
  jako `''` — adres trafia prosto do atrybutu `href`,
- gdy adres jest pusty, ekran „Wsparcie” istnieje i wygląda normalnie, ale
  **nie renderuje żadnego odnośnika** — ani martwego, ani prowadzącego donikąd,
- **żadnego skryptu, widżetu ani obrazka z serwera Buy Me a Coffee.** Ikonę
  kubka (`ICONS.coffee`) rysujemy sami, tą samą kreską co resztę zestawu.

### js/router.js
```js
export const ROUTES = [
  {id:'measure', path:'/measure', labelPL:'Pomiar',    icon:'gauge'},
  {id:'history', path:'/history', labelPL:'Historia',  icon:'chart'},
  {id:'tools',   path:'/tools',   labelPL:'Narzędzia', icon:'sliders'},
  {id:'support', path:'/support', labelPL:'Wsparcie',  icon:'coffee'}
]
export function start()      // czyta hash, ustawia trasę domyślną '/measure'
export function go(path)
export function current() -> route
```
Zmiana trasy emituje `'route:changed'`. Nawigacja **nie przeładowuje strony**.

### js/ui/dom.js
```js
export function h(tag, props, ...children) -> Element
   // tag: 'div.m5-card' / 'button.m5-btn.m5-btn--primary' (skrót klasowy dozwolony)
   // props: {class, text, html?, dataset:{}, aria:{}, on:{click(){}}, …atrybuty}
export function frag(...children)
export function clear(el)
export function mount(parent, ...children)
export function qs(sel, root = document)
export function qsa(sel, root = document) -> Element[]
export function icon(name, {size = 20} = {}) -> SVGElement   // inline SVG, currentColor, aria-hidden
export const ICONS = {…}
export function trapFocus(el) -> releaseFn
export function announce(text)          // do #live, dla czytnika ekranu
export function onLongPress(el, fn)
export function rafThrottle(fn) -> throttledFn
export function download(filename, text, mime)   // Blob + revokeObjectURL
export function haptic(pattern = 10)             // navigator.vibrate, respektuje settings.haptics
export function reducedMotion() -> boolean       // data-motion na <html> ma pierwszeństwo nad systemem
```
Wymagany komplet ikon (`ICONS`): `gauge, chart, sliders, user, droplet, sun,
thermometer, moon, wave, grid, heart, play, stop, cameraFlip, info, close,
check, lock, chevronRight, chevronDown, download, trash, share, plus, minus,
settings, sparkle, alert, coffee`.
Jeden styl: obrys 1.75 px, `stroke="currentColor"`, `fill="none"`, zaokrąglone
końce, `viewBox="0 0 24 24"`. Bez emoji w interfejsie.

### js/ui/overlays.js
```js
export function toast(text, {tone='neutral', action, duration=3200} = {})
export function sheet({title, body, actions, dismissible = true}) -> {close}
   // arkusz od dołu na telefonie, wyśrodkowany dialog od 720 px
export function dialog({title, text, confirmPL, cancelPL, tone}) -> Promise<boolean>
```
Wszystkie warstwy: `role="dialog"` + `aria-modal="true"`, pułapka fokusa, `Esc`
zamyka, po zamknięciu fokus wraca do elementu, który je otworzył, tło się nie
przewija: klasa `.m5-noscroll` na `<html>` (blokuje dokument i `.m5-main`,
jedyny obszar przewijania w tej powłoce) z zachowaniem i odtworzeniem
`scrollTop` elementu `.m5-main`.

### js/ui/gauge.js
```js
export function heroGauge({metricId}) -> {el, update(reading), setMetric(id), destroy()}
   // duży wskaźnik: łuk, wartość, jednostka, słowna nazwa strefy, mikro-sparkline
export function metricTile({metricId, selected = false, onSelect}) -> {el, update(reading), setSelected(b), destroy()}
   // kafelek: nazwa, wartość, jednostka, pasek strefowy — bez wariantu zablokowanego
export function sparkline({points, min, max, width = 120, height = 32}) -> SVGElement
export function zoneBar({metricId, value}) -> {el, update(value)}
```
Rysowanie: **SVG** dla wskaźnika i pasków (skaluje się, dostępne), **canvas**
tylko dla wykresu historii. Aktualizacja wartości nie przebudowuje DOM —
zmieniamy `textContent`, `style` i `data-zone`. Płynność: interpolacja wartości
między próbkami; przy `reduced motion` skok bez animacji. Każdy wskaźnik ma
`role="img"` i `aria-label` z pełnym odczytem słownym („Udział niebieskiego:
27 procent, strefa bezpieczna”).

### js/ui/chart.js
```js
export function chart({metricId, rangeId, height = 220}) -> {el, refresh(), setMetric(id), setRange(id), destroy()}
```
Canvas z `devicePixelRatio`, pasma stref w tle, linia wartości, oś czasu i oś
wartości z „ładnymi” podziałkami, pusty stan („za mało danych”), przeciągnięcie
pokazuje krzyżyk i wartość w punkcie (scrubbing), obsługa klawiaturą (strzałki
przesuwają kursor). Przerysowanie tylko na `refresh()` i na zmianę rozmiaru
(`ResizeObserver`). Kolory czyta z tokenów przez `getComputedStyle`, żeby
zmiana motywu nie wymagała drugiej palety w JS — i przerysowuje się na
`settings:changed`.

## 5. Ekrany

Każdy ekran eksportuje ten sam kształt:
```js
export function create() -> {
  el,              // korzeń ekranu (element)
  titlePL,         // tytuł do topbara
  actions(),       // [{icon, labelPL, onClick}] do prawej strony topbara
  mount(),         // po wejściu na ekran
  unmount(),       // przy wyjściu — sprzątanie nasłuchów i pętli
}
```

### screens/measure.js — serce aplikacji
Stan pusty (przed startem): jedno zdanie, co aplikacja robi, wielki przycisk
„Rozpocznij pomiar”, dyskretna informacja o prywatności. Stan błędu kamery:
komunikat + konkretna rada + przycisk „Spróbuj ponownie”.
Stan pracy: podgląd z kamery jako mały, zaokrąglony kafelek (nie tło —
migający obraz pod tekstem to zła praktyka), wskaźnik-bohater z wielkością
wiodącą (`store.leadMetric`, zmiana przez dotknięcie kafelka), pod nim siatka
kafelków pozostałych wielkości (2 kolumny na telefonie, 3–4 na szerokim
ekranie), na dole pasek akcji: Stop, przełącz kamerę. Wszystkie siedem
kafelków pokazuje swoją liczbę — nie ma kafelka zablokowanego ani zamazanego.
Ten ekran wywołuje `history.push(reading)`
(dławione do ~1 Hz) i `history.noteSession()` po zatrzymaniu. Po zatrzymaniu:
podsumowanie sesji (czas, średnie, najgorsza wielkość, jedno zdanie zalecenia).

### screens/history.js
Wybór wielkości (chipy) + wybór zakresu (segmentowany przełącznik z
`history.RANGES`), wykres, trzy statystyki (min / średnia / maks) jako karty,
lista sesji z możliwością rozwinięcia, pusty stan, przyciski eksportu
(CSV/JSON przez `dom.download`) i „Wyczyść historię” z potwierdzeniem w
dialogu.

### screens/tools.js
Sekcje w kartach: **Wygląd** (motyw: auto/jasny/ciemny jako segmentowany
przełącznik, akcent: 5 próbek koloru, skala tekstu, gęstość, mniej ruchu),
**Progi** (dla każdej wielkości dwa suwaki warn/crit z podglądem paska
strefowego i przyciskiem „Przywróć domyślne”; walidacja: warn < crit dla
zwykłych, warn > crit dla `invert`), **Kalibracja** (trzy suwaki R/G/B,
wyjaśnienie po co to i przycisk „Wyzeruj”), **Pomiar** (blokada wygaszania
ekranu, wibracja), **O pomiarze** (rozwijane wyjaśnienie każdej z 7 wielkości
z `helpPL` + uczciwe ograniczenia metody), **Dane** (eksport, wyczyść
wszystko). Każda zmiana zapisuje się natychmiast, bez przycisku „Zapisz”, i
potwierdza toastem tylko wtedy, gdy efekt nie jest widoczny od razu.

### screens/support.js
Ekran niczego nie zapisuje i nasłuchuje jednego zdarzenia — `'i18n:changed'`,
po którym stawia swoje karty od nowa. Cztery karty, w tej kolejności i nie
w innej:

1. **Co aplikacja daje** — siedem wielkości, historia, narzędzia,
   tryb offline; bez konta i bez limitów. Jedno–dwa zdania.
2. **Dlaczego pada prośba** — utrzymanie i rozwój, uczciwie i bez dramatyzowania.
3. **Co daje darowizna** — nic poza tym, że autor wie, że to się komuś przydało.
   **To musi być napisane wprost.**
4. **Przycisk** (`<a href target="_blank" rel="noopener noreferrer">` z ikoną
   `coffee`, wygląd obrysowego `m5-btn--ghost`, bez cudzego brandingu)
   **plus zdanie o prywatności** stojące tuż przy nim: kliknięcie otwiera
   zewnętrzną stronę Buy Me a Coffee i jest to jedyny moment, w którym
   cokolwiek opuszcza to urządzenie. Przy pustym `SUPPORT_URL` w miejscu
   przycisku stoi spokojna informacja dla użytkownika, a odnośnika nie ma
   w ogóle.

Czego na tym ekranie (i w całej wersji) **nie wolno**: odliczania, sztucznej
pilności, wyskakujących próśb, przerywników, okien po N uruchomieniach,
proszenia w trakcie pomiaru albo na ekranie wyniku, straszenia, że bez wsparcia
coś przestanie działać, oraz jakiegokolwiek sugerowania, że istnieje wersja
lepsza od tej, którą użytkownik już ma.
Prośba pojawia się **wyłącznie wtedy, gdy użytkownik sam wejdzie na ten ekran**;
dyskretnym punktem wejścia jest zakładka w nawigacji i nic ponadto.

## 6. Powłoka (`js/app.js`, `index.html`)

- **Telefon**: górny pasek (tytuł + akcje ekranu) i dolny pasek zakładek
  (4 pozycje, ikona + etykieta, `aria-current="page"`), obie strefy
  respektują `env(safe-area-inset-*)`.
- **≥ 900 px**: zakładki zamieniają się w lewy pasek boczny (ikona + etykieta),
  treść w kolumnie `--content-max`, dolny pasek znika.
- Przełączenie ekranu: fokus wędruje na `<main>`, `announce()` mówi nazwę
  ekranu, pozycja przewijania poprzedniego ekranu zostaje zapamiętana.
- Onboarding przy pierwszym uruchomieniu (`settings.onboarded === false`):
  jeden arkusz, trzy zdania, przycisk „Zaczynamy”.
- `index.html` zawiera: `<video>` + ukryty `<canvas>` dla kamery, hosty warstw
  (`#scrim`, `#sheetHost`, `#dialogHost`, `#toasts`), `#live`, `<noscript>`,
  link „Przejdź do treści” i **wbudowany skrypt anty-FOUC**, który wyłącznie
  *czyta* `ms5.settings.v1` i ustawia atrybuty na `<html>`.
- Rejestracja service workera: w `js/app.js` (a nie we wbudowanym skrypcie
  `index.html` — powłoka i tak ładuje `app.js` jako moduł), po `load`,
  defensywnie, z obsługą aktualizacji (gdy nowy worker czeka — toast
  „Dostępna nowa wersja” z akcją „Odśwież”).

## 7. `sw.js`

Wzoruj się na `docs/v4/sw.js`, ale:
- prefiks pamięci `ms5-`, numer podbijany przy KAŻDEJ zmianie któregokolwiek
  pliku z `APP_SHELL` (bez tego użytkownik z zainstalowaną wersją dostanie starą
  kopię); dziś `ms5-4`. Kasujemy wyłącznie własne pamięci,
- worker obsługuje **wyłącznie** katalog `/v5/`; wszystko spoza tej ścieżki
  przepuszcza nietknięte (v1–v4 muszą dalej działać). Ikony aplikacji leżą
  w `/v5/icons/`, bo rejestracja ma zasięg `./` — żądanie do katalogu
  nadrzędnego nigdy nie trafiłoby do tego workera i nie dałoby się podać
  z pamięci po utracie sieci,
- nawigacja: sieć-najpierw z odwrotem do pamięci; reszta:
  stale-while-revalidate,
- lista `APP_SHELL` musi zawierać **każdy** plik z sekcji 1 — sprawdź plik po
  pliku, pominięcie modułu psuje tryb offline,
- obsługa `message` typu `{type:'SKIP_WAITING'}`.

## 8. `manifest.webmanifest`

Jak v4, ale `name: "Monitor Światła"`, `id: "./"`, `start_url: "./index.html"`,
ikony z `./icons/` (kopia wspólnych ikon wewnątrz zasięgu workera — patrz §7),
`theme_color` zgodny z `--surface-0` motywu jasnego,
skróty do `#/measure`, `#/history`, `#/tools`.

## 9. Czego robić nie wolno

- Nie kopiować plików v1–v4 do v5 „jak leci” — wzory matematyczne tak, kod UI nie.
- Nie zmieniać niczego poza `docs/v5/` (i tylko wskazany plik `docs/index.html`).
- Nie używać `innerHTML` z danymi pochodzącymi od użytkownika.
- Nie blokować głównego wątku: wykres przelicza się na `refresh()`, nie na
  `camera:reading`.
- Nie pokazywać liczb, których nie zmierzono. `null` to `—`.
- Nie wpisywać napisów dla człowieka do kodu — ani polskich, ani angielskich.
  Napis ma klucz w `js/i18n/locales/pl.js` **i** w `en.js`, a kod woła `t()`.
- Nie zaszywać w kodzie niczego, co zależy od języka: kolejności dnia i
  miesiąca, zegara 24-godzinnego, własnych reguł odmiany liczebnika ani
  znacznika `'pl-PL'` w `Intl`. Od tego jest `format.js` i `locale()`.
