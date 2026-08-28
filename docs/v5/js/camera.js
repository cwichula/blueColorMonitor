/* Monitor Światła v5 — kamera, próbkowanie klatek i stan sesji.
 *
 * Uruchamia getUserMedia, rysuje kadr na małym canvasie 64×64, uśrednia go
 * w siatce 3×3 i zamienia piksele w `reading` z siedmioma wielkościami.
 * Fizyka jest przeniesiona z docs/shared/engine.js (dawniej docs/v4/engine.js,
 * przeniesionego przy wyprowadzaniu kodu wspólnego v2–v4): środkowe 60 % kadru,
 * okno migotania, uśrednianie luminancji w świetle liniowym, twardy guard na
 * getUserMedia rozwiązujące się już po stop(). Nowe jest API — i to, że ten
 * moduł nie dotyka historii: emituje 'camera:reading', a zapis należy do
 * screens/measure.js, żeby historia nie rosła przy odmontowanym ekranie.
 */

import { bus } from './bus.js';
import {
  toLinear,
  blueShare,
  brightness as brightnessOf,
  colourTemperature,
  melanopicRatio,
  flicker as flickerOf,
  uniformity as uniformityOf,
  comfortIndex,
  zoneFor,
  byId,
  CATALOGUE
} from './metrics.js';
import { get as getSettings, thresholdsFor } from './store.js';

/* ------------------------------------------------------------------
   Stałe — kontrakt próbkowania
   ------------------------------------------------------------------ */

export const SAMPLE_HZ = 10;

const SAMPLE_MS = 1000 / SAMPLE_HZ;
const SAMPLE_SIZE = 64;          // bok canvasu próbkującego, px
const CROP_FRACTION = 0.6;       // mierzymy środkowe 60 % kadru, bez winiety i ramek
const GRID = 3;                  // siatka 3×3 karmi metrics.uniformity
const CELLS = GRID * GRID;

/* Migotanie potrzebuje okna, nie próbki. 32 próbki przy 10 Hz to 3,2 s — dość,
 * by min/max się ustabilizowały, i wciąż na tyle krótko, że wynik opisuje
 * „teraz”, a nie minutę temu. */
const FLICKER_WINDOW = 32;

/* Poniżej tej jasności czujnik zwraca szum, a komfort policzony z szumu nie jest
 * dowodem, że cokolwiek zmierzono. Próg redakcyjny, nie norma. */
const COMFORT_MIN_BRIGHTNESS = 2;

/* Identyfikatory wielkości w kolejności katalogu — wyliczone, nigdy przepisane
 * ręcznie: wielkość dopisana w metrics.js jest tu mierzona bez zmiany tego pliku. */
const IDS = CATALOGUE.map((m) => m.id);

/* Tablica linearizacji. metrics.toLinear robi pow() na kanał, a luminancja
 * komórek potrzebuje jej dla 4096 pikseli × 3 kanały dziesięć razy na sekundę;
 * 256 wpisów zamienia to w odczyt z tablicy. To pamięć podręczna jedynego
 * źródła prawdy, a nie druga implementacja wzoru. */
const LIN = new Array(256);
for (let i = 0; i < 256; i += 1) LIN[i] = toLinear(i);

/* ------------------------------------------------------------------
   Błędy — kod i gotowy polski komunikat
   ------------------------------------------------------------------ */

/* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po angielsku
 * i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie diagnozy i jedno
 * zdanie rady. */
const ERROR_TEXT = {
  denied: 'Brak zgody na dostęp do kamery. Zezwól na kamerę w ustawieniach przeglądarki dla tej strony i spróbuj ponownie.',
  notfound: 'Nie znaleziono kamery. Sprawdź, czy urządzenie ma aparat i czy nie jest wyłączony w systemie.',
  inuse: 'Kamera jest zajęta przez inną aplikację. Zamknij tamtą aplikację lub zakładkę i spróbuj ponownie.',
  insecure: 'Kamera działa tylko przez HTTPS albo na localhost. Otwórz tę stronę pod adresem zaczynającym się od „https://”.',
  unsupported: 'Ta przeglądarka nie udostępnia tutaj kamery. Spróbuj w Chrome albo w Safari, w zwykłym oknie — nie w podglądzie wbudowanym w inną aplikację.',
  unknown: 'Nie udało się uruchomić kamery.'
};

/* Czy strona działa w kontekście, w którym getUserMedia w ogóle wolno pytać.
 * Ma znaczenie, bo iOS na http:// rzuca NotAllowedError — tym samym błędem, co
 * zwykła odmowa użytkownika. Rada „zezwól w ustawieniach” byłaby wtedy fałszywa:
 * pozwolić nie ma czego, trzeba zmienić adres. */
function insecurePage() {
  if (typeof window === 'undefined' || typeof location === 'undefined') return false;
  if (window.isSecureContext === true) return false;
  const host = location.hostname || '';
  const local = host === 'localhost' || host === '127.0.0.1' || host === '::1'
    || host === '[::1]' || host.endsWith('.localhost');
  if (local) return false;
  // file:// bywa kontekstem bezpiecznym, ale i tak nie ma tam nic do naprawienia
  // poza podaniem innego adresu — traktujemy jak brak HTTPS.
  return location.protocol !== 'https:';
}

function mapError(err) {
  const name = err && err.name ? err.name : '';
  if (name === 'NotAllowedError' || name === 'SecurityError' || name === 'PermissionDeniedError') {
    return insecurePage() ? 'insecure' : 'denied';
  }
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError' || name === 'OverconstrainedError') return 'notfound';
  if (name === 'NotReadableError' || name === 'TrackStartError' || name === 'AbortError') return 'inuse';
  if (name === 'TypeError') return 'unsupported';
  return 'unknown';
}

/* ------------------------------------------------------------------
   Stan modułu
   ------------------------------------------------------------------ */

let mode = 'idle';               // 'idle' | 'starting' | 'running' | 'error'
let facingMode = 'environment';
let lastError = null;

let stream = null;
let videoEl = null;
let canvasEl = null;
let ctx = null;

let startToken = 0;              // każdy start i każdy stop podbija licznik
let startPromise = null;

let timerId = null;
let rafId = null;
let nextAt = 0;
let paused = false;              // karta w tle: pętla żyje, ale nie próbkuje

let wakeLock = null;

let lastReading = null;
let flickerBuf = [];
let sessionState = null;
let lastSession = null;

/* Kalibracja i progi czytane raz i odświeżane na 'settings:changed'. Pytanie
 * store.js dziesięć razy na sekundę kopiowałoby cały obiekt ustawień na darmo. */
let gains = readGains();
let zoneRules = readZoneRules();

bus.on('settings:changed', () => {
  gains = readGains();
  zoneRules = readZoneRules();
  // Przesunięty próg musi przemalować to, co JUŻ jest na ekranie; inaczej ostatni
  // odczyt trzyma starą strefę aż do następnej próbki — kłamstwo na dziesiątą
  // część sekundy, ale widoczne.
  if (lastReading) {
    lastReading.zones = zonesFor(lastReading);
    bus.emit('camera:reading', { reading: lastReading });
  }
});

function readGains() {
  const cal = getSettings().calibration || { r: 1, g: 1, b: 1 };
  return { r: cal.r, g: cal.g, b: cal.b };
}

function readZoneRules() {
  const out = {};
  for (const id of IDS) {
    const metric = byId(id);
    const t = thresholdsFor(id) || { warn: metric.warn, crit: metric.crit };
    out[id] = { warn: t.warn, crit: t.crit, invert: !!metric.invert };
  }
  return out;
}

function clockNow() {
  return (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
}

function clamp255(v) {
  return v < 0 ? 0 : (v > 255 ? 255 : v);
}

function num(v) {
  return typeof v === 'number' && isFinite(v) ? v : null;
}

function setMode(next, error) {
  if (mode === next && !error && !lastError) return;
  mode = next;
  lastError = error || null;
  const payload = { state: mode, facing: facingMode };
  if (lastError) payload.error = lastError;
  bus.emit('camera:state', payload);
}

function fail(code) {
  const messagePL = ERROR_TEXT[code] || ERROR_TEXT.unknown;
  const error = { code, messagePL };
  setMode('error', error);
  bus.emit('camera:error', error);
  return { ok: false, code, messagePL };
}

/* ------------------------------------------------------------------
   Elementy DOM
   ------------------------------------------------------------------ */

export function attach(elements) {
  const el = elements || {};
  if (el.video) videoEl = el.video;
  // Kontekst zerujemy wyłącznie przy PODMIANIE płótna — ponowne attach() tym
  // samym elementem w trakcie pomiaru odcinałoby próbkowanie po cichu.
  if (el.canvas && el.canvas !== canvasEl) {
    canvasEl = el.canvas;
    ctx = null;                  // nowy canvas to nowy kontekst
  }
  prepareVideo();
  return true;
}

function prepareVideo() {
  if (!videoEl) return;
  // Bez playsinline iOS otwiera podgląd na pełnym ekranie i przejmuje stronę;
  // bez muted autoodtwarzanie jest blokowane w każdej przeglądarce mobilnej.
  videoEl.muted = true;
  videoEl.defaultMuted = true;
  videoEl.setAttribute('muted', '');
  videoEl.setAttribute('playsinline', '');
  videoEl.setAttribute('autoplay', '');
}

function ensureElements() {
  if (typeof document === 'undefined') return false;
  // Zastępniki, gdy attach() nie dostał elementów: pomiar ma działać nawet bez
  // podglądu. Brak obrazu jest gorszy niż podgląd, ale cichy brak liczb jest
  // gorszy od obu.
  if (!videoEl) {
    videoEl = document.createElement('video');
    prepareVideo();
  }
  if (!canvasEl) canvasEl = document.createElement('canvas');
  if (!ctx) {
    canvasEl.width = SAMPLE_SIZE;
    canvasEl.height = SAMPLE_SIZE;
    try {
      // willReadFrequently: każdą klatkę i tak odczytujemy z powrotem, czyli
      // dokładnie przypadek, dla którego ta podpowiedź istnieje.
      ctx = canvasEl.getContext('2d', { willReadFrequently: true }) || canvasEl.getContext('2d');
    } catch (_) {
      ctx = null;
    }
  }
  return !!ctx;
}

/* ------------------------------------------------------------------
   Sesja
   ------------------------------------------------------------------ */

function newSession(startedAt) {
  const acc = {};
  for (const id of IDS) acc[id] = { sum: 0, n: 0, min: Infinity, max: -Infinity };
  return { startedAt, samples: 0, acc };
}

function accumulate(reading) {
  if (!sessionState) return;
  sessionState.samples += 1;
  for (const id of IDS) {
    const v = num(reading[id]);
    if (v === null) continue;    // wielkość niezmierzona nie psuje żadnej średniej
    const a = sessionState.acc[id];
    a.sum += v;
    a.n += 1;
    if (v < a.min) a.min = v;
    if (v > a.max) a.max = v;
  }
}

function buildSession(endedAt) {
  if (!sessionState) return null;
  const avg = {}, min = {}, max = {};
  for (const id of IDS) {
    const a = sessionState.acc[id];
    avg[id] = a.n ? a.sum / a.n : null;
    min[id] = a.n ? a.min : null;
    max[id] = a.n ? a.max : null;
  }
  return {
    startedAt: sessionState.startedAt,
    endedAt: endedAt === undefined ? null : endedAt,
    samples: sessionState.samples,
    avg,
    min,
    max
  };
}

/* ------------------------------------------------------------------
   Cykl życia kamery
   ------------------------------------------------------------------ */

/* Świadomie NIE ustawiamy ekspozycji ani balansu bieli na 'manual'. v4 tego
 * próbowało, żeby zmniejszyć drgania odczytu: przełączenie ścieżki w tryb ręczny
 * bez podania konkretnej wartości zamraża kamerę na tym, co akurat miała —
 * zwykle na ciemnej, jeszcze niezbieżnej klatce — i podgląd zostaje ciemny przez
 * całą sesję. Pełna automatyka daje poprawnie naświetlony obraz; cenę w postaci
 * szumu pomiaru interfejs opisuje wprost. Nie „naprawiać”. */
function constraintsFor(facingWanted) {
  return {
    video: {
      facingMode: { ideal: facingWanted },
      width: { ideal: 640 },
      height: { ideal: 480 }
    },
    audio: false
  };
}

function killTracks(s) {
  if (!s) return;
  try {
    for (const track of s.getTracks()) track.stop();
  } catch (_) { /* ścieżka już martwa */ }
}

function releaseStream() {
  killTracks(stream);
  stream = null;
  if (videoEl) {
    try { videoEl.pause(); } catch (_) { /* bez znaczenia */ }
    try { videoEl.srcObject = null; } catch (_) { /* bez znaczenia */ }
  }
}

export async function start(facingWanted = 'environment') {
  if (facingWanted === 'user' || facingWanted === 'environment') facingMode = facingWanted;

  if (mode === 'running') return { ok: true, code: null, messagePL: null };
  // Drugie dotknięcie „Start”, gdy pytanie o zgodę jeszcze wisi, dołącza do
  // pierwszej próby zamiast otwierać drugą — inaczej zostałyby dwa strumienie
  // i dwie zapalone diody kamery.
  if (mode === 'starting' && startPromise) return startPromise;

  if (!ensureElements()) return fail('unsupported');

  const media = (typeof navigator !== 'undefined') ? navigator.mediaDevices : null;
  if (!media || typeof media.getUserMedia !== 'function') {
    // Brak samego API pod http:// to nie „stara przeglądarka”, tylko brak
    // bezpiecznego kontekstu — i rada musi być inna.
    return fail(insecurePage() ? 'insecure' : 'unsupported');
  }

  setMode('starting');
  startToken += 1;
  const token = startToken;
  const wanted = facingMode;

  startPromise = (async () => {
    let fresh = null;
    try {
      fresh = await media.getUserMedia(constraintsFor(wanted));
    } catch (err) {
      if (token !== startToken) return { ok: false, code: 'unknown', messagePL: ERROR_TEXT.unknown };
      releaseStream();
      return fail(mapError(err));
    }

    // stop() mógł paść, gdy okno zgody było otwarte. Przyjęcie strumienia teraz
    // zostawiłoby zapaloną kamerę, której nikt nie czyta — dlatego strumień jest
    // osierocony i natychmiast zamykany.
    if (token !== startToken) {
      killTracks(fresh);
      return { ok: false, code: 'unknown', messagePL: ERROR_TEXT.unknown };
    }

    // Gdyby mimo tokenu został stary strumień, ginie tutaj: dwie żywe ścieżki
    // wideo naraz to stan, którego nie chcemy nigdy.
    if (stream && stream !== fresh) killTracks(stream);

    stream = fresh;
    try {
      videoEl.srcObject = stream;
    } catch (_) {
      killTracks(stream);
      stream = null;
      return fail('unknown');
    }
    prepareVideo();

    try {
      await videoEl.play();
    } catch (_) {
      // Część przeglądarek odrzuca play() i mimo to renderuje strumień. Zgłoszenie
      // błędu zatrzymałoby pomiar, który naprawdę działa.
    }

    if (token !== startToken) {
      killTracks(fresh);
      return { ok: false, code: 'unknown', messagePL: ERROR_TEXT.unknown };
    }

    // Kamera odebrana przez inną aplikację kończy ścieżkę bez żadnego wyjątku;
    // bez tego pomiar udawałby, że trwa, na zamrożonej klatce.
    for (const track of stream.getTracks()) {
      track.addEventListener('ended', () => {
        if (token !== startToken || mode !== 'running') return;
        stopInternal();
        sessionState = null;
        fail('inuse');
      });
    }

    lastReading = null;
    flickerBuf = [];
    paused = (typeof document !== 'undefined' && document.visibilityState === 'hidden');
    sessionState = newSession(Date.now());

    startLoop();
    requestWakeLock();

    setMode('running');
    return { ok: true, code: null, messagePL: null };
  })();

  const result = await startPromise;
  if (token === startToken) startPromise = null;
  return result;
}

/* Wspólna część stop() i awaryjnego zatrzymania: gasi pętlę i strumień, ale nie
 * ogłasza stanu — dzięki temu ścieżka błędu nie miga przez 'idle'. */
function stopInternal() {
  startToken += 1;               // osierocenie getUserMedia będącego w locie
  startPromise = null;
  stopLoop();
  releaseWakeLock();
  releaseStream();
  lastReading = null;
  flickerBuf = [];
  paused = false;
}

export function stop() {
  const wasMeasuring = !!sessionState;
  let finished = null;

  stopInternal();

  if (wasMeasuring) {
    finished = buildSession(Date.now());
    lastSession = finished;
    sessionState = null;
  }

  setMode('idle');
  return finished;
}

export function toggle() {
  if (mode === 'running' || mode === 'starting') {
    stop();
    return Promise.resolve({ ok: true, code: null, messagePL: null });
  }
  return start(facingMode);
}

export async function switchCamera() {
  const next = facingMode === 'environment' ? 'user' : 'environment';
  if (mode !== 'running' && mode !== 'starting') {
    // Nie ma czego restartować — zapamiętujemy wybór na następny start i mówimy
    // o tym, bo przycisk kamery pokazuje bieżącą stronę obiektywu.
    facingMode = next;
    bus.emit('camera:state', { state: mode, facing: facingMode });
    return { ok: true, code: null, messagePL: null };
  }
  // Inny obiektyw to inna optyka i inna krzywa ekspozycji, więc jest to nowa
  // sesja, a nie ciąg dalszy starej: jedna średnia z obu opisywałaby scenę,
  // której nikt nie widział.
  stop();
  return start(next);
}

export function state() { return mode; }

export function facing() { return facingMode; }

export function last() { return lastReading; }

export function session() {
  // W trakcie pomiaru — sesja bieżąca (endedAt null), po zatrzymaniu — ostatnia
  // zamknięta, żeby podsumowanie przetrwało zejście z ekranu pomiaru.
  return sessionState ? buildSession(null) : (lastSession || null);
}

/* ------------------------------------------------------------------
   Pętla ~10 Hz
   ------------------------------------------------------------------ */

/* setInterval przy zdławionej karcie kumuluje zaległości i po powrocie wypuszcza
 * serię próbek naraz — próbek, których nikt nie zmierzył. Zegar prowadzony
 * ręcznie po prostu przeskakuje do teraz. rAF pod spodem trzyma odczyt pikseli
 * przy klatce kompozytora; kiedy rAF nie odpala (karta w tle), pętli i tak
 * pilnuje setTimeout. */
function startLoop() {
  stopLoop();
  nextAt = clockNow() + SAMPLE_MS;
  timerId = setTimeout(tick, SAMPLE_MS);
}

function stopLoop() {
  if (timerId !== null) { clearTimeout(timerId); timerId = null; }
  if (rafId !== null && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(rafId);
  rafId = null;
}

function tick() {
  timerId = null;
  if (mode !== 'running') return;

  const now = clockNow();
  nextAt += SAMPLE_MS;
  if (nextAt <= now) nextAt = now + SAMPLE_MS;   // spóźnienie odpuszczamy, nie odrabiamy
  // Kolejkujemy PRZED próbkowaniem: wyjątek w odczycie klatki nie może zabić pętli.
  timerId = setTimeout(tick, Math.max(0, nextAt - clockNow()));

  if (paused) return;

  if (typeof requestAnimationFrame === 'function') {
    rafId = requestAnimationFrame(() => {
      rafId = null;
      if (mode === 'running' && !paused) sampleFrame();
    });
  } else {
    sampleFrame();
  }
}

const cellSum = new Array(CELLS);
const cellCount = new Array(CELLS);

function sampleFrame() {
  // ensureElements() jest idempotentne i samo odtwarza kontekst — strażnik na
  // samym `ctx` zostawiłby pętlę kręcącą się bez jednego odczytu.
  if (!ensureElements()) return;
  const vw = videoEl.videoWidth, vh = videoEl.videoHeight;
  // Pierwsze klatki po play() nie mają jeszcze wymiarów. Pominięcie jest
  // właściwe: czarna klatka czytałaby się jako 0 % niebieskiego, czyli jako
  // zmyślony punkt pomiarowy.
  if (!vw || !vh) return;

  const sw = vw * CROP_FRACTION, sh = vh * CROP_FRACTION;
  const sx = (vw - sw) / 2, sy = (vh - sh) / 2;

  let data;
  try {
    ctx.drawImage(videoEl, sx, sy, sw, sh, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
    data = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE).data;
  } catch (_) {
    // Jedna nieczytelna klatka nie jest powodem do zwijania sesji.
    return;
  }

  for (let i = 0; i < CELLS; i += 1) { cellSum[i] = 0; cellCount[i] = 0; }

  let sumR = 0, sumG = 0, sumB = 0;
  const pixels = SAMPLE_SIZE * SAMPLE_SIZE;

  for (let y = 0; y < SAMPLE_SIZE; y += 1) {
    const rowCell = (((y * GRID) / SAMPLE_SIZE) | 0) * GRID;
    for (let x = 0; x < SAMPLE_SIZE; x += 1) {
      const p = (y * SAMPLE_SIZE + x) * 4;
      const r = data[p], g = data[p + 1], b = data[p + 2];
      sumR += r; sumG += g; sumB += b;
      const c = rowCell + (((x * GRID) / SAMPLE_SIZE) | 0);
      // Luminancję komórek uśredniamy w świetle LINIOWYM. Uśrednienie wartości
      // gammowanych pochlebiałoby każdej nierównomiernej scenie.
      cellSum[c] += 0.2126729 * LIN[r] + 0.7151522 * LIN[g] + 0.0721750 * LIN[b];
      cellCount[c] += 1;
    }
  }

  let meanR = sumR / pixels, meanG = sumG / pixels, meanB = sumB / pixels;
  const cells = new Array(CELLS);
  for (let i = 0; i < CELLS; i += 1) cells[i] = cellCount[i] ? cellSum[i] / cellCount[i] : 0;

  // Kalibracja mnoży kanały PRZED metrykami i jest zaciskana do 0–255:
  // wzmocnienie wypuszczone poza zakres bajtu produkowałoby pewne siebie bzdury.
  // Luminancje komórek zostają surowe — równomierność jest ilorazem dwóch z nich,
  // więc stałe wzmocnienie kanału i tak by się skróciło.
  meanR = clamp255(meanR * gains.r);
  meanG = clamp255(meanG * gains.g);
  meanB = clamp255(meanB * gains.b);

  const reading = buildReading(Date.now(), meanR, meanG, meanB, cells);
  lastReading = reading;
  accumulate(reading);
  bus.emit('camera:reading', { reading });
}

/* Komfort liczymy zawsze, ale publikujemy tylko wtedy, gdy cokolwiek naprawdę do
 * niego weszło. `measured` z metrics.js mówi jedynie, że któreś wejście było
 * liczbą — a przy zasłoniętym obiektywie liczbą jest melanopic 0 i migotanie 0.
 * v4 pokazywało wtedy „Komfort: 100 pkt”. Pauza jest odpowiedzią prawdziwą
 * i to ją drukujemy. */
function comfortUsable(cct, uni, fl, bright) {
  // Przy zasłoniętym obiektywie sam szum czujnika ma neutralną chromatyczność,
  // więc kelvin bez sprawdzenia jasności i flagi wiarygodności przepuszczałby
  // szum jako pomiar.
  if (bright <= COMFORT_MIN_BRIGHTNESS) return false;
  if (cct.reliable && cct.kelvin !== null) return true;
  if (uni !== null) return true;
  return fl.percent !== null;
}

function zonesFor(values) {
  const zones = {};
  for (const id of IDS) {
    const rule = zoneRules[id];
    zones[id] = rule ? zoneFor(values[id], rule.warn, rule.crit, rule.invert) : null;
  }
  return zones;
}

function buildReading(t, r, g, b, cells) {
  const bright = brightnessOf(r, g, b);

  // Migotanie to jedyna wielkość, która potrzebuje historii, a nie klatki.
  flickerBuf.push(bright);
  if (flickerBuf.length > FLICKER_WINDOW) flickerBuf.shift();
  const fl = flickerOf(flickerBuf, SAMPLE_HZ);

  const cct = colourTemperature(r, g, b);
  const melanopic = melanopicRatio(r, g, b);
  const uni = uniformityOf(cells);
  const comfort = comfortIndex({
    melanopic,
    kelvin: cct.kelvin,
    flickerPercent: fl.percent,
    uniformity: uni
  });

  const reading = {
    t,
    r, g, b,
    share: blueShare(r, g, b),
    brightness: bright,
    kelvin: cct.kelvin,
    kelvinReliable: cct.reliable,
    melanopic,
    flicker: fl.percent,
    // Powyżej Nyquista oszacowanie częstotliwości jest aliasem, a nie odczytem —
    // podajemy je jako nieobecne, nie jako liczbę, której nikt nie może ufać.
    flickerHz: fl.withinRange ? fl.hz : null,
    flickerInRange: fl.withinRange,
    uniformity: uni,
    comfort: (comfort.measured && comfortUsable(cct, uni, fl, bright)) ? comfort.score : null,
    comfortPenalties: comfort.penalties,
    zones: null
  };
  reading.zones = zonesFor(reading);
  return reading;
}

/* ------------------------------------------------------------------
   Karta w tle i blokada wygaszania
   ------------------------------------------------------------------ */

/* Ukrytej karcie przeglądarka i tak wstrzymuje klatki wideo, więc próbkowanie
 * czytałoby zamrożony obraz jako świeży pomiar. Ścieżka wideo zostaje żywa —
 * jej zamknięcie zakończyłoby sesję, a ta ma przetrwać przełączenie aplikacji. */
function onVisibility() {
  if (typeof document === 'undefined') return;
  const hidden = document.visibilityState === 'hidden';
  if (hidden === paused) return;
  paused = hidden;
  if (hidden || mode !== 'running') return;

  // Okno migotania zszyte przez przerwę udawałoby, że próbki sprzed pauzy i po
  // niej sąsiadują ze sobą — a to zmyśliłoby amplitudę i częstotliwość.
  flickerBuf = [];
  nextAt = clockNow() + SAMPLE_MS;
  requestWakeLock();             // blokada gaśnie sama, gdy karta znika
  try {
    const played = videoEl && videoEl.play ? videoEl.play() : null;
    if (played && typeof played.catch === 'function') played.catch(() => {});
  } catch (_) { /* bez znaczenia */ }
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', onVisibility);
  // Zamknięcie karty w trakcie pomiaru musi zgasić diodę kamery.
  window.addEventListener('pagehide', () => {
    if (mode === 'running' || mode === 'starting') stop();
  });
}

/* Screen Wake Lock jest wsparciem, nie warunkiem pomiaru: brak API, odmowa
 * i wyjątek znaczą tu dokładnie to samo co „nie udało się” — i nic więcej. */
function requestWakeLock() {
  if (wakeLock) return;
  if (typeof navigator === 'undefined' || !navigator.wakeLock
    || typeof navigator.wakeLock.request !== 'function') return;
  if (!getSettings().keepAwake) return;
  navigator.wakeLock.request('screen').then((lock) => {
    // Pomiar mógł się skończyć, zanim obietnica wróciła — wtedy blokada jest
    // zwalniana od razu, bo nie ma już czego pilnować.
    if (mode !== 'running') {
      try { lock.release(); } catch (_) { /* nic */ }
      return;
    }
    wakeLock = lock;
    try {
      lock.addEventListener('release', () => { if (wakeLock === lock) wakeLock = null; });
    } catch (_) { /* nic */ }
  }).catch(() => { /* brak blokady nie jest błędem pomiaru */ });
}

function releaseWakeLock() {
  if (!wakeLock) return;
  const lock = wakeLock;
  wakeLock = null;
  try { lock.release(); } catch (_) { /* już zwolniona */ }
}
