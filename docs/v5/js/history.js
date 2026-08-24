/* Monitor Światła v5 — js/history.js
 *
 * ROLA PLIKU: bufor pomiarów i ich trwałość. Przyjmuje punkty z ekranu pomiaru,
 * podaje je z powrotem w zakresach czasu (wykres, statystyki), prowadzi listę
 * sesji i eksportuje dane do CSV/JSON.
 *
 * Trzy decyzje inżynierskie, które trzymają ten moduł przy życiu na telefonie:
 * — zapis do localStorage jest dławiony (nie częściej niż raz na 5 s) i domykany
 *   przy pagehide/visibilitychange, bo push potrafi przyjść kilka razy na sekundę;
 * — format zapisu jest kompaktowy (tablica tablic, czas różnicowo, wartości
 *   zaokrąglone), bo 20 000 punktów musi zmieścić się obok innych kluczy;
 * — próbki starsze niż godzina schodzą do średnich minutowych, a całość ma
 *   twardy limit 30 dni i ~20 000 punktów.
 * Brak miejsca nigdy nie wywraca aplikacji: przycinamy, próbujemy raz jeszcze,
 * a przy drugiej porażce przestajemy zapisywać i mówimy o tym raz przez szynę.
 */

import { bus } from './bus.js';
import { CATALOGUE, byId } from './metrics.js';

const KEY_POINTS = 'ms5.history.v1';
const KEY_SESSIONS = 'ms5.sessions.v1';

/* Kolejność pól jest schematem zapisu — nie wolno jej zmieniać bez podniesienia
   numeru klucza, bo stare wiersze zostałyby odczytane jako inne wielkości.
   Katalog z metrics.js służy tu wyłącznie do nazw i jednostek w eksporcie. */
const FIELDS = ['share', 'brightness', 'kelvin', 'melanopic', 'flicker', 'uniformity', 'comfort'];

/* Precyzja zapisu — o krok dokładniejsza niż prezentacja, żeby uśrednianie nie
   traciło rozdzielczości, ale bez ogonów zmiennoprzecinkowych w JSON. */
const PRECISION = {
  share: 1, brightness: 1, kelvin: 0, melanopic: 3,
  flicker: 2, uniformity: 1, comfort: 1
};

const MINUTE = 60000;
const HOUR = 3600000;
const DAY = 86400000;

const MAX_POINTS = 20000;
const MAX_AGE_MS = 30 * DAY;
const RAW_WINDOW_MS = HOUR;      // ostatnia godzina zostaje w pełnej rozdzielczości
const SAVE_EVERY_MS = 5000;      // dławienie zapisu
const COMPACT_EVERY_MS = 60000;  // agregacja i limity — nie częściej niż raz na minutę
const EMIT_EVERY_MS = 1000;      // 'history:changed' przy szybkim push
const MAX_SESSIONS = 200;
const TRIM_RATIO = 0.25;         // ile najstarszych ucinamy po QuotaExceededError

export const RANGES = [
  { id: '1m',  labelPL: '1 min',    ms: MINUTE,      bucketMs: 1000 },
  { id: '5m',  labelPL: '5 min',    ms: 5 * MINUTE,  bucketMs: 5000 },
  { id: '1h',  labelPL: '1 godz.',  ms: HOUR,        bucketMs: MINUTE },
  { id: '24h', labelPL: '24 godz.', ms: DAY,         bucketMs: 10 * MINUTE },
  { id: '7d',  labelPL: '7 dni',    ms: 7 * DAY,     bucketMs: HOUR },
  { id: '30d', labelPL: '30 dni',   ms: 30 * DAY,    bucketMs: 6 * HOUR }
];

let points = [];                 // rosnąco po czasie
let sessionList = [];
let storageState = 'ok';         // 'ok' | 'blocked' (brak dostępu) | 'full' (poddaliśmy się)
let reportedFull = false;        // komunikat o pełnej pamięci pokazujemy raz
let saveTimer = null;
let lastSaveAt = 0;
let lastCompactAt = 0;
let lastEmitAt = 0;
let unsorted = false;            // zegar urządzenia potrafi skoczyć w tył

/* ------------------------------------------------------------------
   Pomocnicze
   ------------------------------------------------------------------ */

function num(value) {
  return typeof value === 'number' && isFinite(value) ? value : null;
}

function round(value, decimals) {
  const n = num(value);
  if (n === null) return null;
  const f = Math.pow(10, decimals);
  return Math.round(n * f) / f;
}

function emitChanged(force) {
  const now = Date.now();
  // push przychodzi seriami; bez dławienia zdarzenie budziłoby ekrany 10 razy
  // na sekundę tylko po to, by pokazać ten sam licznik.
  if (!force && now - lastEmitAt < EMIT_EVERY_MS) return;
  lastEmitAt = now;
  const payload = { count: points.length };
  if (storageState !== 'ok') {
    payload.storage = storageState;
    payload.messagePL = storageState === 'full'
      ? 'Pamięć urządzenia jest pełna — nowe pomiary nie są już zapisywane.'
      : 'Przeglądarka nie pozwala zapisać historii — dane znikną po zamknięciu karty.';
  }
  bus.emit('history:changed', payload);
}

function rangeById(rangeId) {
  for (let i = 0; i < RANGES.length; i += 1) {
    if (RANGES[i].id === rangeId) return RANGES[i];
  }
  return null;
}

/* ------------------------------------------------------------------
   Format zapisu: tablica tablic [Δt, ...7 wartości]
   ------------------------------------------------------------------ */

function encode(list) {
  const rows = new Array(list.length);
  let prev = 0;
  for (let i = 0; i < list.length; i += 1) {
    const p = list[i];
    // Czas różnicowo: pełny znacznik ma 13 cyfr, różnica zwykle trzy — przy
    // 20 000 punktów to setki kilobajtów mniej w localStorage.
    const row = [i === 0 ? p.t : p.t - prev];
    prev = p.t;
    for (let f = 0; f < FIELDS.length; f += 1) {
      row.push(round(p[FIELDS[f]], PRECISION[FIELDS[f]]));
    }
    rows[i] = row;
  }
  return rows;
}

function decode(rows) {
  if (!Array.isArray(rows)) return [];
  const out = [];
  let t = 0;
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    if (!Array.isArray(row) || row.length < 1) continue;
    const delta = num(row[0]);
    if (delta === null) continue;
    // Znacznik bezwzględny niesie pierwszy POPRAWNIE ZDEKODOWANY wiersz, a nie
    // pierwszy wiersz wejścia: gdy uszkodzony zapis odsiał wiersz zerowy, cała
    // historia liczyłaby się od zera, czyli od 1970 roku — i compact() skasowałby
    // ją przy najbliższym odświeżeniu.
    t = out.length === 0 ? delta : t + delta;
    // Bufor, którego pierwszy poprawny znacznik jest absurdalnie mały (przed
    // rokiem 2001), nie jest historią, tylko śmieciem po przerwanym zapisie.
    if (out.length === 0 && t < 1e12) return [];
    if (t <= 0) continue;
    const p = { t: t };
    for (let f = 0; f < FIELDS.length; f += 1) p[FIELDS[f]] = num(row[f + 1]);
    out.push(p);
  }
  return out;
}

/* ------------------------------------------------------------------
   Agregacja i limity
   ------------------------------------------------------------------ */

/* Średnia z pominięciem null. Brak choćby jednego pomiaru daje null — nie
   udajemy, że zmierzyliśmy zero. */
function meanOf(list, field) {
  let sum = 0;
  let n = 0;
  for (let i = 0; i < list.length; i += 1) {
    const v = list[i][field];
    if (v !== null && v !== undefined && isFinite(v)) { sum += v; n += 1; }
  }
  return n === 0 ? null : sum / n;
}

/* Próbki starsze niż godzina schodzą do średnich minutowych. Znacznik czasu to
   początek minuty, dzięki czemu powtórna agregacja niczego już nie przesuwa. */
function aggregateOld(list, now) {
  const cutoff = now - RAW_WINDOW_MS;
  const out = [];
  let bucketKey = null;
  let bucket = [];

  const flush = () => {
    if (!bucket.length) return;
    const p = { t: bucketKey * MINUTE };
    for (let f = 0; f < FIELDS.length; f += 1) {
      p[FIELDS[f]] = round(meanOf(bucket, FIELDS[f]), PRECISION[FIELDS[f]]);
    }
    out.push(p);
    bucket = [];
  };

  for (let i = 0; i < list.length; i += 1) {
    const p = list[i];
    if (p.t >= cutoff) { flush(); bucketKey = null; out.push(p); continue; }
    const key = Math.floor(p.t / MINUTE);
    if (key !== bucketKey) { flush(); bucketKey = key; }
    bucket.push(p);
  }
  flush();
  return out;
}

function compact(force) {
  const now = Date.now();
  // Poza wymuszeniem porządkujemy bufor rzadko; wyjątkiem jest przekroczony
  // limit i cofnięty zegar — na nieposortowanym buforze range() urwałby się
  // za wcześnie, bo zakłada rosnące znaczniki czasu.
  const needed = force || unsorted || points.length > MAX_POINTS;
  if (!needed && now - lastCompactAt < COMPACT_EVERY_MS) return;
  lastCompactAt = now;

  if (unsorted) {
    points.sort((a, b) => a.t - b.t);
    unsorted = false;
  }

  const minT = now - MAX_AGE_MS;
  let list = points.filter((p) => p.t >= minT);
  list = aggregateOld(list, now);
  // Twardy limit liczby punktów: po agregacji nadal może być za dużo, jeśli
  // ktoś mierzył bez przerwy — wtedy odpuszczamy najstarsze.
  if (list.length > MAX_POINTS) list = list.slice(list.length - MAX_POINTS);
  points = list;
}

/* ------------------------------------------------------------------
   Trwałość
   ------------------------------------------------------------------ */

function isQuotaError(err) {
  if (!err) return false;
  return err.name === 'QuotaExceededError'
    || err.name === 'NS_ERROR_DOM_QUOTA_REACHED'
    || err.code === 22 || err.code === 1014;
}

function writeRaw(key, text) {
  window.localStorage.setItem(key, text);
}

function persistPoints() {
  if (storageState !== 'ok') return;
  compact(false);
  lastSaveAt = Date.now();

  try {
    writeRaw(KEY_POINTS, JSON.stringify(encode(points)));
    return;
  } catch (err) {
    if (!isQuotaError(err)) { storageState = 'blocked'; emitChanged(true); return; }
  }

  // Pierwsza porażka: oddajemy najstarszą ćwiartkę historii i próbujemy raz
  // jeszcze — świeże pomiary są cenniejsze niż sprzed tygodni.
  points = points.slice(Math.floor(points.length * TRIM_RATIO));
  try {
    writeRaw(KEY_POINTS, JSON.stringify(encode(points)));
    emitChanged(true);
    return;
  } catch (err) {
    // Druga porażka: dalsze przycinanie to już kasowanie danych użytkownika po
    // omacku. Przestajemy zapisywać, mówimy o tym raz i nigdy nie rzucamy wyżej
    // — pomiar na ekranie ma działać dalej.
    storageState = 'full';
    if (!reportedFull) { reportedFull = true; emitChanged(true); }
  }
}

function persistSessions() {
  if (storageState !== 'ok') return;
  try {
    writeRaw(KEY_SESSIONS, JSON.stringify(sessionList));
  } catch (err) {
    if (isQuotaError(err)) {
      // Sesje są małe — jeśli i one się nie mieszczą, miejsce zjadła historia.
      persistPoints();
      try { writeRaw(KEY_SESSIONS, JSON.stringify(sessionList)); } catch (e) { storageState = 'full'; }
    } else {
      storageState = 'blocked';
    }
  }
}

function clearSaveTimer() {
  if (saveTimer !== null) { clearTimeout(saveTimer); saveTimer = null; }
}

/** Zapis dławiony: nie częściej niż raz na SAVE_EVERY_MS. */
function scheduleSave() {
  if (saveTimer !== null || storageState !== 'ok') return;
  const wait = Math.max(0, SAVE_EVERY_MS - (Date.now() - lastSaveAt));
  saveTimer = setTimeout(() => { saveTimer = null; persistPoints(); }, wait);
}

/** Natychmiastowe domknięcie zapisu — przy chowaniu karty i zamykaniu strony. */
function flush() {
  clearSaveTimer();
  persistPoints();
}

function loadAll() {
  let rawPoints = null;
  let rawSessions = null;
  try {
    rawPoints = window.localStorage.getItem(KEY_POINTS);
    rawSessions = window.localStorage.getItem(KEY_SESSIONS);
  } catch (err) {
    storageState = 'blocked';    // tryb prywatny — historia żyje tylko w pamięci
    return;
  }
  try {
    points = rawPoints ? decode(JSON.parse(rawPoints)) : [];
  } catch (err) {
    points = [];
  }
  try {
    const parsed = rawSessions ? JSON.parse(rawSessions) : [];
    sessionList = Array.isArray(parsed) ? parsed.filter((s) => s && num(s.startedAt) !== null) : [];
  } catch (err) {
    sessionList = [];
  }
  compact(true);
}

/* ------------------------------------------------------------------
   Publiczne API — zbieranie
   ------------------------------------------------------------------ */

/** Dopisuje odczyt do historii. Wywołuje screens/measure.js, dławiąc do ~1 Hz. */
export function push(reading) {
  if (!reading || typeof reading !== 'object') return;
  const t = num(reading.t) === null ? Date.now() : reading.t;

  const p = { t: t };
  let measured = 0;
  for (let f = 0; f < FIELDS.length; f += 1) {
    p[FIELDS[f]] = num(reading[FIELDS[f]]);
    if (p[FIELDS[f]] !== null) measured += 1;
  }
  // Odczyt bez ani jednej zmierzonej wielkości nie niesie informacji — zajmowałby
  // miejsce i robił dziurę w środku serii.
  if (measured === 0) return;

  const last = points[points.length - 1];
  if (last && t < last.t) unsorted = true;   // skok zegara — posortujemy przy agregacji
  points.push(p);

  compact(false);
  scheduleSave();
  emitChanged(false);
}

/** Wszystkie punkty, od najstarszego. Kopia — wywołujący nie rusza bufora. */
export function all() {
  return points.map((p) => Object.assign({}, p));
}

/** Punkty z ostatniego okna czasu wskazanego zakresu. */
export function range(rangeId) {
  const r = rangeById(rangeId);
  if (!r) return [];
  const from = Date.now() - r.ms;
  const out = [];
  for (let i = points.length - 1; i >= 0; i -= 1) {
    if (points[i].t < from) break;           // bufor jest posortowany
    out.push(Object.assign({}, points[i]));
  }
  return out.reverse();
}

/* ------------------------------------------------------------------
   Publiczne API — odczyt zagregowany
   ------------------------------------------------------------------ */

/**
 * Serie do wykresu: punkty kubełkowane wg bucketMs zakresu, wartość kubełka to
 * średnia zmierzonych próbek. Kubełek bez ani jednego pomiaru nie tworzy punktu
 * — na wykresie ma zostać przerwa, a nie zero.
 * min/max/avg liczone są z wartości kubełków, więc statystyka pokazuje dokładnie
 * to, co widać na wykresie.
 */
export function series(metricId, rangeId) {
  const empty = { points: [], min: null, max: null, avg: null, count: 0 };
  const r = rangeById(rangeId);
  if (!r || !byId(metricId)) return empty;

  const from = Date.now() - r.ms;
  const out = [];
  let bucketKey = null;
  let sum = 0;
  let n = 0;

  const flushBucket = () => {
    if (n === 0) return;
    out.push({ t: bucketKey * r.bucketMs, v: sum / n });
    sum = 0; n = 0;
  };

  for (let i = 0; i < points.length; i += 1) {
    const p = points[i];
    if (p.t < from) continue;
    const key = Math.floor(p.t / r.bucketMs);
    if (key !== bucketKey) { flushBucket(); bucketKey = key; }
    const v = p[metricId];
    if (v !== null && v !== undefined && isFinite(v)) { sum += v; n += 1; }
  }
  flushBucket();

  if (!out.length) return empty;

  let min = out[0].v;
  let max = out[0].v;
  let total = 0;
  for (let i = 0; i < out.length; i += 1) {
    if (out[i].v < min) min = out[i].v;
    if (out[i].v > max) max = out[i].v;
    total += out[i].v;
  }
  return { points: out, min: min, max: max, avg: total / out.length, count: out.length };
}

/**
 * Statystyki do kart: min / średnia / maks / ostatnia wartość i kierunek zmiany.
 * trend to kierunek WARTOŚCI (-1 spada, 0 bez zmian, 1 rośnie), nie ocena —
 * dla wielkości z `invert` wzrost jest poprawą, i to już sprawa ekranu.
 */
export function stats(metricId, rangeId) {
  const s = series(metricId, rangeId);
  if (!s.count) return { min: null, max: null, avg: null, last: null, trend: 0 };

  const last = s.points[s.points.length - 1].v;
  let trend = 0;
  // Przy garstce kubełków „trend" byłby szumem; porównujemy dwie połowy okna i
  // wymagamy zmiany większej niż 5 % rozpiętości, żeby nie migotał.
  if (s.count >= 4) {
    const half = Math.floor(s.count / 2);
    let a = 0;
    let b = 0;
    for (let i = 0; i < half; i += 1) a += s.points[i].v;
    for (let i = half; i < s.count; i += 1) b += s.points[i].v;
    const delta = (b / (s.count - half)) - (a / half);
    const spanEl = s.max - s.min;
    const threshold = (spanEl > 0 ? spanEl : Math.abs(s.avg)) * 0.05;
    if (delta > threshold) trend = 1;
    else if (delta < -threshold) trend = -1;
  }
  return { min: s.min, max: s.max, avg: s.avg, last: last, trend: trend };
}

/* ------------------------------------------------------------------
   Publiczne API — sesje, czyszczenie, eksport
   ------------------------------------------------------------------ */

/** Lista sesji, od najnowszej. */
export function sessions() {
  return sessionList.slice().reverse();
}

/** Zapisuje podsumowanie sesji. Wywołuje screens/measure.js po camera.stop(). */
export function noteSession(session) {
  if (!session || typeof session !== 'object') return;
  if (num(session.startedAt) === null) return;

  const entry = Object.assign({}, session);
  if (!entry.id) entry.id = 's' + entry.startedAt + '-' + Math.random().toString(36).slice(2, 7);
  if (num(entry.endedAt) === null) entry.endedAt = Date.now();
  sessionList.push(entry);
  if (sessionList.length > MAX_SESSIONS) sessionList = sessionList.slice(-MAX_SESSIONS);

  persistSessions();             // sesje są rzadkie i małe — zapisujemy od razu
  bus.emit('history:session', { session: entry });
  emitChanged(true);
}

/** Kasuje historię i sesje — także z pamięci trwałej. */
export function clear() {
  clearSaveTimer();
  points = [];
  sessionList = [];
  try {
    window.localStorage.removeItem(KEY_POINTS);
    window.localStorage.removeItem(KEY_SESSIONS);
    // Po zwolnieniu miejsca ma sens spróbować zapisu jeszcze raz.
    if (storageState === 'full') { storageState = 'ok'; reportedFull = false; }
  } catch (err) { /* nie ma czego kasować */ }
  emitChanged(true);
}

/** 'ok' | 'blocked' (brak dostępu do pamięci) | 'full' (zapis wstrzymany). */
export function storage() {
  return storageState;
}

function csvCell(text) {
  const s = String(text);
  return /[";\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

function csvNumber(value, decimals) {
  const n = num(value);
  if (n === null) return '';     // niezmierzone zostaje puste, nigdy zerem
  return n.toFixed(decimals).replace('.', ',');
}

/**
 * CSV dla polskiego Excela: separator średnik, przecinek dziesiętny, nagłówki po
 * polsku, znacznik czasu w ISO 8601 (jednoznaczny przy imporcie), końce linii
 * CRLF. Kolumny idą w kolejności katalogu wielkości.
 */
export function exportCSV() {
  const header = ['Data i godzina'];
  for (let i = 0; i < CATALOGUE.length; i += 1) {
    header.push(CATALOGUE[i].namePL + ' [' + CATALOGUE[i].unit + ']');
  }
  const lines = [header.map(csvCell).join(';')];

  for (let i = 0; i < points.length; i += 1) {
    const p = points[i];
    const row = [new Date(p.t).toISOString()];
    for (let m = 0; m < CATALOGUE.length; m += 1) {
      const metric = CATALOGUE[m];
      row.push(csvNumber(p[metric.id], metric.decimals));
    }
    lines.push(row.map(csvCell).join(';'));
  }
  return lines.join('\r\n') + '\r\n';
}

/** Pełny zrzut: punkty jako obiekty (null zachowany) plus lista sesji. */
export function exportJSON() {
  return JSON.stringify({
    app: 'Monitor Światła',
    version: 5,
    exportedAt: new Date().toISOString(),
    fields: FIELDS.slice(),
    points: all(),
    sessions: sessions()
  }, null, 2);
}

/* ------------------------------------------------------------------
   Start
   ------------------------------------------------------------------ */

loadAll();

if (typeof document !== 'undefined') {
  // Karta chowana na telefonie bywa ubijana bez ostrzeżenia — bez tego zapisu
  // przepadłoby do pięciu ostatnich sekund pomiaru.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush();
  });
  window.addEventListener('pagehide', flush);
}
