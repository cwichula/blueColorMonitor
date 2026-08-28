# Zrzuty ekranu — co zrobić i jak

**Stan na dziś: w repozytorium NIE MA ani jednego zrzutu ekranu.**
Sprawdzone: jedyne pliki graficzne w `docs/` to trzy ikony (`docs/icons/`
i `docs/v5/icons/`). Dlatego pole `"screenshots"` w `docs/v5/manifest.webmanifest`
**celowo pozostaje niewpisane**. Wpis wskazujący na nieistniejący plik jest
gorszy niż brak pola: przeglądarka nie może pobrać obrazka, bogatszy dialog
instalacji się nie pokazuje, a audyty (Lighthouse, PWABuilder) zgłaszają błąd
zamiast braku. Pole dopisujemy **dopiero wtedy, gdy pliki leżą w tym katalogu.**

Ten plik mówi dokładnie: ile zrzutów, jakich rozmiarów, w jakim języku
i jakim poleceniem je zrobić.

---

## 1. Trzy różne zestawy — bo wymagania są różne

Zrzuty przydają się w trzech miejscach i **nie są wymienne**:

| Zestaw | Gdzie trafia | Rozmiar | Format | Ile |
|---|---|---|---|---|
| A. telefon | Play Console → listing **oraz** `"screenshots"` z `form_factor: "narrow"` | **1080 × 1920 px** (9:16) | PNG do manifestu, JPEG do Play | 4 (min. 2 dla Play, min. 1 dla manifestu) |
| B. szeroki | tylko `"screenshots"` z `form_factor: "wide"` | **1280 × 800 px** | PNG | 2 |
| C. tablet | Play Console → listing tabletów (tylko jeśli deklarujesz obsługę tabletów) | **1080 × 1920 px** (9:16) albo **1920 × 1080 px** (16:9) | JPEG | 4 na każdy rozmiar (7" i 10") |

### Skąd te liczby

**Google Play** (dokumentacja „Graphic assets, screenshots, and video”):

* telefon: **minimum 2** zrzuty, **maksimum 8** na typ urządzenia; każdy bok
  **minimum 320 px, maksimum 3840 px**; **dłuższy bok nie może być więcej niż
  dwa razy dłuższy od krótszego**; format **JPEG albo 24-bitowy PNG bez kanału alfa**;
* tablet (7" i 10"): **minimum 4** zrzuty, boki **od 1080 do 7680 px**,
  proporcje **16:9** (poziomo) albo **9:16** (pionowo);
* przy tym samym formularzu Play wymaga jeszcze dwóch grafik, których nie da się
  zrobić zrzutem ekranu:
  * **ikona aplikacji 512 × 512 px**, 32-bitowy PNG z kanałem alfa, do 1024 KB —
    ten warunek jest **spełniony**: `docs/v5/icons/icon-512.png` to 512 × 512 px,
    8 bitów na kanał, typ koloru 6 (RGBA), 11,9 KB. Można go wgrać bez zmian;
  * **grafika promocyjna (feature graphic) 1024 × 500 px**, JPEG albo
    24-bitowy PNG bez alfy — **tego nie ma i trzeba ją zaprojektować.**

**Manifest PWA** (`"screenshots"`, bogatszy dialog instalacji w Chrome — od
Chrome 94 na Androidzie, od Chrome 108 na komputerze):

* każdy bok **minimum 320 px, maksimum 3840 px**;
* **dłuższy bok nie więcej niż 2,3 × krótszy**;
* **wszystkie zrzuty o tym samym `form_factor` muszą mieć identyczne proporcje**;
* tylko **PNG i JPEG**; Chrome pokazuje **do ośmiu**;
* `form_factor: "wide"` — pokazywane **tylko na komputerze**, na Androidzie
  **ignorowane** (od Chrome 109); `form_factor: "narrow"` — telefon.
  Żeby dialog był bogatszy w obu miejscach, potrzebne są **oba** rodzaje.

Rozmiar **1080 × 1920** jest wybrany celowo: proporcja 1,78 mieści się i w limicie
Play (≤ 2,0), i w limicie manifestu (≤ 2,3). Jeden zestaw obsługuje oba miejsca.
Zrzut 824 × 1800 (czyli 412 × 900 przy DPR 2, jak w skryptach testowych z katalogu
roboczego) **w Play nie przejdzie** — 1800 / 824 = 2,18, czyli ponad dwa razy.

### Co ma być na zrzutach

Cztery ekrany, w tej kolejności — to jest cała aplikacja:

1. **Pomiar** z działającym odczytem (wskaźnik + kafelki), a nie stan pusty;
2. **Historia** z wykresem, na którym coś widać;
3. **Narzędzia** (wygląd, progi stref, kalibracja, eksport);
4. **Pomiar w motywie ciemnym** albo ekran wsparcia — cokolwiek pokazuje,
   że aplikacja ma więcej niż jeden ekran.

Bez ramek telefonu, bez tekstów doklejanych w grafice, bez obietnic medycznych
i bez słowa „diagnoza”. Play odrzuca zrzuty, które nie pokazują rzeczywistego
interfejsu, a treści sugerujące zastosowanie medyczne ściągają dodatkową kontrolę.

### W jakim języku

* **Manifest** ma `"lang": "en"` i jeden zestaw zrzutów dla wszystkich —
  robimy je **po angielsku**.
* **Play Console** trzyma zrzuty **osobno dla każdego języka listingu**.
  Minimum: język domyślny listingu (**angielski**). Jeśli listing będzie też
  po polsku — drugi komplet **po polsku**. Zrzutów w pozostałych 28 językach
  robić nie trzeba; Play pokaże wtedy zestaw z języka domyślnego.

---

## 2. Jak je zrobić — gotowy przepis

Sposób jest w tym projekcie sprawdzony: **Chrome headless sterowany po CDP,
z syntetyczną kamerą**, dzięki czemu pomiar naprawdę rusza i na zrzucie widać
odczyty, a nie pusty ekran startowy. Nie trzeba niczego instalować — na tej
maszynie jest Chrome, Node 24 (ma wbudowany globalny `WebSocket`, więc CDP działa
bez `puppeteer`) i Python.

### Krok 1 — serwer statyczny w `docs/`

```
cd C:\Users\TADEUSZ\IdeaProjects\blueColorMonitor\docs
python -m http.server 8000 --bind 127.0.0.1
```

(albo `powershell -ExecutionPolicy Bypass -File serve.ps1` z tego samego katalogu)

### Krok 2 — Chrome headless z udawaną kamerą, w osobnym oknie

```
"C:\Program Files\Google\Chrome\Application\chrome.exe" ^
  --headless=new --remote-debugging-port=9341 --user-data-dir=C:\swp1 ^
  --use-fake-device-for-media-stream --use-fake-ui-for-media-stream ^
  --hide-scrollbars about:blank
```

Dwie rzeczy, na których łatwo się przejechać:

* `--use-fake-device-for-media-stream --use-fake-ui-for-media-stream` dają
  syntetyczną kamerę 640 × 480 — **bez nich pomiar w headless nie ruszy**
  i zrzuci się pusty ekran startowy;
* `--user-data-dir` musi być w **krótkiej ścieżce** (`C:\swp1`). Profil w głębokiej
  ścieżce (np. w `AppData\Local\Temp\…`) psuje `CacheStorage`: service worker się
  rejestruje, ale nie aktywuje, więc strona zachowuje się inaczej niż na telefonie.

### Krok 3 — skrypt zrzucający

Zapisz poniższy plik **poza repozytorium** (np. `%TEMP%\shot-store.mjs`) — to
narzędzie jednorazowe, nie część aplikacji. Bierze język, ekran i geometrię
z argumentów, więc jednym plikiem robisz cały zestaw.

```js
/* node shot-store.mjs <lang> <#trasa> <szer> <wys> <dpr> <out.png|.jpg> [port-http] [port-cdp] */
import { writeFileSync } from 'node:fs';
const [lang, route, W, H, DPR, out, HTTP = '8000', CDP = '9341'] = process.argv.slice(2);
const wait = ms => new Promise(r => setTimeout(r, ms));
const tab = await (await fetch(`http://127.0.0.1:${CDP}/json/new?about:blank`, { method: 'PUT' })).json();
const ws = new WebSocket(tab.webSocketDebuggerUrl);
let id = 0; const pend = new Map();
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } };
const send = (me, p = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: me, params: p })); });
await new Promise(r => ws.onopen = r);
await send('Runtime.enable'); await send('Page.enable');
await send('Emulation.setUserAgentOverride', { userAgent: 'Mozilla/5.0 (Linux; Android 13) Chrome/151 Mobile', acceptLanguage: lang, platform: 'Linux armv8l' });
await send('Browser.grantPermissions', { origin: `http://localhost:${HTTP}`, permissions: ['videoCapture'] });
await send('Emulation.setDeviceMetricsOverride', { width: +W, height: +H, deviceScaleFactor: +DPR, mobile: +W < 900 });
await send('Page.navigate', { url: `http://localhost:${HTTP}/v5/${route || ''}` });
await wait(4000);
// pierwszy widoczny przycisk zamyka onboarding, drugi uruchamia pomiar
const click = re => send('Runtime.evaluate', { returnByValue: true, expression:
  '(function(){var b=[].slice.call(document.querySelectorAll("button,[role=button]")).filter(function(e){return ' + re + '.test(e.textContent||"")&&e.offsetParent!==null;});if(b[0]){b[0].click();return b[0].textContent.trim();}return null;})()' });
await click('/./'); await wait(1200);
await click('/start|measure|mierz|rozpocznij/i'); await wait(6000);   // niech wskaźnik zbierze dane
const jpeg = /\.jpe?g$/i.test(out);
const shot = await send('Page.captureScreenshot', jpeg
  ? { format: 'jpeg', quality: 92, captureBeyondViewport: false }
  : { format: 'png', captureBeyondViewport: false });
writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
console.log(out, 'gotowe');
process.exit(0);
```

**`captureBeyondViewport: false` jest tu kluczowe.** Skrypty testowe używane
wcześniej w tym projekcie mają `true`, bo chodziło w nich o całą stronę — ale
wtedy wysokość zrzutu to wysokość dokumentu, a nie 1920 px, i Play odrzuci plik
za proporcje.

### Krok 4 — komplet poleceń

```
:: A. telefon, angielski, do manifestu (PNG)
node %TEMP%\shot-store.mjs en "#/measure" 540 960 2 docs\v5\screenshots\narrow-1-measure.png
node %TEMP%\shot-store.mjs en "#/history" 540 960 2 docs\v5\screenshots\narrow-2-history.png
node %TEMP%\shot-store.mjs en "#/tools"   540 960 2 docs\v5\screenshots\narrow-3-tools.png
node %TEMP%\shot-store.mjs en "#/measure" 540 960 2 docs\v5\screenshots\narrow-4-dark.png

:: B. szeroki, do manifestu
node %TEMP%\shot-store.mjs en "#/measure" 1280 800 1 docs\v5\screenshots\wide-1-measure.png
node %TEMP%\shot-store.mjs en "#/history" 1280 800 1 docs\v5\screenshots\wide-2-history.png

:: C. do Play Console, JPEG bez alfy — te NIE idą do repozytorium
node %TEMP%\shot-store.mjs en "#/measure" 540 960 2 %TEMP%\play-en-1.jpg
node %TEMP%\shot-store.mjs pl "#/measure" 540 960 2 %TEMP%\play-pl-1.jpg
```

540 × 960 przy DPR 2 daje dokładnie **1080 × 1920 px**; 1280 × 800 przy DPR 1 daje
**1280 × 800 px**. Motyw ciemny do zrzutu nr 4 włącza się dodatkowym wywołaniem
`Emulation.setEmulatedMedia` z `prefers-color-scheme: dark` (albo ręcznie
w ekranie Narzędzia, przed zrzutem).

### Krok 5 — sprawdź rozmiary, zanim wgrasz

```
node -e "const b=require('fs').readFileSync(process.argv[1]);console.log(process.argv[1], b.readUInt32BE(16)+'x'+b.readUInt32BE(20));" docs\v5\screenshots\narrow-1-measure.png
```

(w PNG szerokość i wysokość leżą w nagłówku IHDR, w bajtach 16–23)

---

## 3. Dopiero teraz: wpis w manifeście

Gdy pliki leżą w tym katalogu, dopisz do `docs/v5/manifest.webmanifest`
(po `"icons"`, przed `"shortcuts"`) blok w tej postaci — **ze ścieżkami do plików,
które naprawdę istnieją**:

```json
"screenshots": [
  { "src": "./screenshots/narrow-1-measure.png", "sizes": "1080x1920", "type": "image/png", "form_factor": "narrow", "label": "Live measurement: the lead metric and six tiles" },
  { "src": "./screenshots/narrow-2-history.png", "sizes": "1080x1920", "type": "image/png", "form_factor": "narrow", "label": "History from one minute to thirty days" },
  { "src": "./screenshots/narrow-3-tools.png",   "sizes": "1080x1920", "type": "image/png", "form_factor": "narrow", "label": "Appearance, thresholds, calibration and export" },
  { "src": "./screenshots/wide-1-measure.png",   "sizes": "1280x800",  "type": "image/png", "form_factor": "wide",   "label": "Live measurement on a wide screen" }
]
```

Po dopisaniu, **koniecznie**:

1. podnieś numer pamięci podręcznej w `docs/v5/sw.js` — stała `CACHE`
   (dziś `'ms5-10'`), bo `docs/v5/manifest.webmanifest` jest na liście plików
   zapisywanych z góry; bez tego telefony z zainstalowaną aplikacją dostaną
   stary manifest i nowego dialogu instalacji nie zobaczą;
2. dopisz pliki zrzutów do listy zasobów w `docs/v5/sw.js`, **jeśli** mają być
   dostępne offline — nie jest to konieczne, bo przeglądarka czyta je tylko przy
   instalacji, ale wtedy bogatszy dialog działa też przy słabej sieci;
3. sprawdź, że manifest nadal jest poprawnym JSON-em:
   `node -e "JSON.parse(require('fs').readFileSync('docs/v5/manifest.webmanifest','utf8'));console.log('ok')"`.
