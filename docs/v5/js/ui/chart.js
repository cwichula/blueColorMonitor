/**
 * ui/chart.js — wykres historii pomiarów na canvasie (Monitor Światła v5).
 *
 * Rysuje jedną wielkość w wybranym zakresie czasu: pasma stref w tle, linię
 * wartości przerwaną tam, gdzie pomiaru nie było, osie z „ładnymi” podziałkami
 * oraz kursor odczytu obsługiwany dotykiem, myszą i klawiaturą.
 * Kolory czyta z tokenów CSS przez getComputedStyle, więc motyw i akcent nie
 * mają drugiej palety w JS. Przerysowanie jest zdarzeniowe: refresh(),
 * 'settings:changed', zmiana motywu systemu i ResizeObserver — nigdy pętla.
 *
 * Kontrakt nie wymienia history.js wśród importów wykresu, ale refresh() nie
 * dostaje danych argumentem, więc po serię sięgamy sami; history stoi w drzewie
 * importów przed ui/chart, więc kierunek zależności zostaje zachowany.
 */

import { h, clear, rafThrottle } from './dom.js';
import { byId, zoneFor } from '../metrics.js';
import { nf, metricValueUnit, clock, dateShort, dateTime, duration, plural, ZONE_LABEL } from '../format.js';
import { thresholdsFor } from '../store.js';
import { series, RANGES } from '../history.js';
import { bus } from '../bus.js';

/* Znaki pisane kodem, bo w źródle nie odróżniłbyś ich od zwykłego minusa,
   kropki i spacji. */
const MINUS = '\u2212';
const NBSP = '\u00A0';
const DOT = '\u00B7';

const SECOND = 1000;
const MINUTE = 60000;
const HOUR = 3600000;
const DAY = 86400000;

/* Drabina „ładnych” kroków czasu. Wybieramy z niej najmniejszy krok, przy
   którym etykiety jeszcze się nie zderzają — dzięki temu podziałka wypada
   zawsze na okrągłej sekundzie, minucie, godzinie albo dobie. */
const TIME_STEPS = [
  SECOND, 2 * SECOND, 5 * SECOND, 10 * SECOND, 15 * SECOND, 30 * SECOND,
  MINUTE, 2 * MINUTE, 5 * MINUTE, 10 * MINUTE, 15 * MINUTE, 30 * MINUTE,
  HOUR, 2 * HOUR, 3 * HOUR, 6 * HOUR, 12 * HOUR,
  DAY, 2 * DAY, 7 * DAY, 14 * DAY
];

/* Przerwa w danych: kubełki serii idą co bucketMs, więc odstęp większy niż
   dwa i pół kubełka oznacza, że pomiaru wtedy nie było — kubełek złożony
   z samych null nie tworzy punktu, więc luka i null wychodzą tu na jedno.
   Prosta poprowadzona przez taką dziurę byłaby kłamstwem o danych. */
const GAP_FACTOR = 2.5;

/* Bufor canvasu przy dpr 4 na szerokim ekranie to dziesiątki megabajtów bez
   widocznego zysku — trzy piksele na piksel wystarczą oku. */
const MAX_DPR = 3;

const COLOR_TOKENS = {
  surface1: '--surface-1',
  surface3: '--surface-3',
  sunken: '--surface-sunken',
  line1: '--line-1',
  line2: '--line-2',
  lineStrong: '--line-strong',
  text1: '--text-1',
  text2: '--text-2',
  text3: '--text-3',
  accent: '--accent',
  good: '--zone-good',
  goodSoft: '--zone-good-soft',
  warn: '--zone-warn',
  warnSoft: '--zone-warn-soft',
  crit: '--zone-crit',
  critSoft: '--zone-crit-soft',
  none: '--zone-none',
  noneSoft: '--zone-none-soft'
};

/* Awaryjne barwy na wypadek, gdyby arkusz tokenów jeszcze nie doszedł (pierwsza
   klatka po starcie, podgląd modułu w izolacji). Odpowiadają palecie jasnej. */
const COLOR_FALLBACK = {
  surface1: '#ffffff', surface3: '#ffffff', sunken: '#e4e9f1',
  line1: '#e6eaf1', line2: '#d3dae5', lineStrong: '#7e8ca2',
  text1: '#111a2b', text2: '#48566d', text3: '#616e85',
  accent: '#0b5fd0',
  good: '#0e7355', goodSoft: 'rgba(14,115,85,.13)',
  warn: '#8f5d00', warnSoft: 'rgba(143,93,0,.14)',
  crit: '#c02640', critSoft: 'rgba(192,38,64,.13)',
  none: '#5f6b84', noneSoft: 'rgba(95,107,132,.13)'
};

let seq = 0;

/* ─────────────────────────────  Matematyka osi  ───────────────────────── */

function rangeById(id) {
  for (let i = 0; i < RANGES.length; i += 1) {
    if (RANGES[i].id === id) return RANGES[i];
  }
  return null;
}

/* Klasyczne „nice numbers”: 1, 2, 5 albo 10 razy potęga dziesiątki. */
function niceNum(span, round) {
  const exp = Math.floor(Math.log10(span));
  const f = span / Math.pow(10, exp);
  let nice;
  if (round) nice = f < 1.5 ? 1 : (f < 3 ? 2 : (f < 7 ? 5 : 10));
  else nice = f <= 1 ? 1 : (f <= 2 ? 2 : (f <= 5 ? 5 : 10));
  return nice * Math.pow(10, exp);
}

/* Sąsiedni krok w drabinie 1–2–5: potrzebny, gdy pierwsze przybliżenie daje
   za dużo (albo za mało) podziałek. */
function stepNeighbour(step, up) {
  const exp = Math.floor(Math.log10(step));
  const f = Math.round(step / Math.pow(10, exp));
  const ladder = [1, 2, 5, 10];
  const at = ladder.indexOf(f < 1 ? 1 : (f > 5 ? 10 : f));
  const next = ladder[Math.max(0, Math.min(ladder.length - 1, at + (up ? 1 : -1)))];
  return next * Math.pow(10, exp);
}

/* Skala wartości: 3–5 podziałek na okrągłych liczbach. Zwraca też liczbę
   miejsc po przecinku wynikającą z kroku — inaczej przy kroku 0,25 dwie
   sąsiednie etykiety wyszłyby jako to samo „1”. */
function niceScale(lo, hi, count) {
  const wanted = Math.max(3, Math.min(5, count));
  const span = hi > lo ? hi - lo : Math.abs(hi) || 1;
  let step = niceNum(niceNum(span, false) / (wanted - 1), true);
  let min = 0;
  let max = 0;
  let n = 0;

  // Zaokrąglenie kroku w górę potrafi dołożyć dwie podziałki ponad zamówione,
  // a zaokrąglenie w dół zostawić dwie na cały wykres — poprawiamy krok po
  // drabinie 1–2–5, aż liczba podziałek wpadnie w widełki 3–5.
  for (let guard = 0; guard < 8; guard += 1) {
    min = Math.floor(lo / step) * step;
    max = Math.ceil(hi / step) * step;
    n = Math.max(1, Math.round((max - min) / step));
    if (n > wanted - 1) { step = stepNeighbour(step, true); continue; }
    if (n < 2) { step = stepNeighbour(step, false); continue; }
    break;
  }

  const decimals = step < 1 ? Math.min(4, Math.ceil(-Math.log10(step))) : 0;
  const out = [];
  for (let i = 0; i <= n; i += 1) {
    // Wartość liczona z indeksu, nie akumulowana — dodawanie 0,1 w pętli
    // rozjeżdża się na czwartym kroku i etykieta pokazuje 0,30000000000000004.
    out.push(min + i * step);
  }
  return { min: min, max: max, step: step, ticks: out, decimals: decimals };
}

/* Najmniejszy krok z drabiny, przy którym mieści się nie więcej etykiet, niż
   pozwala szerokość. */
function pickTimeStep(span, maxLabels) {
  const target = span / Math.max(1, maxLabels);
  for (let i = 0; i < TIME_STEPS.length; i += 1) {
    if (TIME_STEPS[i] >= target) return TIME_STEPS[i];
  }
  return TIME_STEPS[TIME_STEPS.length - 1];
}

/* Podziałki czasu. Dla krótkich zakresów odmierzamy je wstecz od „teraz”, bo
   punktem odniesienia jest bieżąca chwila; dla dłuższych równamy do pełnych
   godzin i lokalnej północy, żeby na osi stały czytelne godziny i daty. */
function timeTicks(tMin, tMax, step, mode) {
  const out = [];
  if (mode === 'ago') {
    for (let t = tMax; t >= tMin; t -= step) out.push(t);
    return out.reverse();
  }
  // Równanie liczymy w czasie lokalnym: wielokrotność doby w czasie lokalnym
  // to północ u użytkownika, a nie północ UTC.
  const offset = new Date(tMax).getTimezoneOffset() * MINUTE;
  let t = Math.ceil((tMin - offset) / step) * step + offset;
  while (t <= tMax) { out.push(t); t += step; }
  return out;
}

/* Tryb etykiet osi czasu dobrany do zakresu — sekundy i minuty mają sens tylko
   jako „ile temu”, bo zegar 14:07 powtarzałby się na całej osi. */
function timeMode(rangeMs) {
  if (rangeMs <= 5 * MINUTE) return 'ago';
  if (rangeMs <= DAY) return 'clock';
  return 'date';
}

function axisTimeLabel(t, tMax, mode) {
  if (mode === 'ago') {
    const delta = Math.max(0, tMax - t);
    return delta < SECOND ? 'teraz' : MINUS + duration(delta);
  }
  return mode === 'clock' ? clock(t) : dateShort(t);
}

/* Etykieta czasu przy kursorze — tu odwrotnie niż na osi: dla krótkich zakresów
   „12 s temu” niesie więcej niż zegar, dla długich potrzebna jest data. */
function cursorTimeLabel(t, mode) {
  if (mode === 'ago') {
    const delta = Math.max(0, Date.now() - t);
    return delta < 2 * SECOND ? 'przed chwilą' : duration(delta) + ' temu';
  }
  return mode === 'clock' ? clock(t) : dateTime(t);
}

/* Najszersza etykieta danego trybu — po niej liczymy, ile podziałek się mieści,
   zanim je narysujemy. */
function sampleTimeLabel(mode) {
  if (mode === 'ago') return MINUS + '30' + NBSP + 'min';
  return mode === 'clock' ? '00:00' : '30' + NBSP + 'sie';
}

/* ─────────────────────────────  Rysowanie  ────────────────────────────── */

function roundRectPath(ctx, x, y, w, hgt, r) {
  const rr = Math.max(0, Math.min(r, w / 2, hgt / 2));
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') { ctx.roundRect(x, y, w, hgt, rr); return; }
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + hgt, rr);
  ctx.arcTo(x + w, y + hgt, x, y + hgt, rr);
  ctx.arcTo(x, y + hgt, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

/* Pół piksela w prawo/w dół: kreska o grubości 1 px narysowana na całkowitej
   współrzędnej rozmywa się na dwa rzędy pikseli i traci kontrast. */
function crisp(v) {
  return Math.round(v) + 0.5;
}

/* Wygładzenie przez punkty środkowe: krzywa nigdy nie wychodzi poza otoczkę
   wypukłą danych, więc nie dorysowuje maksimum, którego nie zmierzono. */
function pathSegment(ctx, pts) {
  ctx.moveTo(pts[0].x, pts[0].y);
  if (pts.length === 2) { ctx.lineTo(pts[1].x, pts[1].y); return; }
  for (let i = 1; i < pts.length - 1; i += 1) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
  }
  const last = pts[pts.length - 1];
  ctx.lineTo(last.x, last.y);
}

function wrapText(ctx, text, maxWidth) {
  const words = String(text).split(' ');
  const lines = [];
  let line = '';
  for (let i = 0; i < words.length; i += 1) {
    const next = line ? line + ' ' + words[i] : words[i];
    if (line && ctx.measureText(next).width > maxWidth) { lines.push(line); line = words[i]; }
    else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

/* ────────────────────────────────  Wykres  ────────────────────────────── */

/**
 * chart({metricId, rangeId, height}) -> {el, refresh, setMetric, setRange, destroy}
 * Zwraca gotowy element; dane pobiera sam przy każdym refresh().
 */
export function chart({ metricId = 'share', rangeId = '1h', height = 220 } = {}) {
  let metric = byId(metricId) || byId('share');
  let range = rangeById(rangeId) || rangeById('1h') || RANGES[0];
  const boxHeight = Math.max(140, Math.round(height));

  const uid = 'm5chart' + (seq += 1);
  const readoutId = uid + '-readout';
  const hintId = uid + '-hint';

  let data = { points: [], min: null, max: null, avg: null, count: 0 };
  let tMin = 0;
  let tMax = 0;
  let mode = timeMode(range.ms);
  let hasGaps = false;
  let style = null;        // barwy i metryki tekstu z tokenów; null = do odczytania
  let geo = null;          // ostatnia geometria — po niej trafiamy palcem w punkt
  let cursor = -1;         // indeks punktu pod kursorem odczytu
  let cursorT = null;      // czas kursora; przeżywa refresh(), indeks nie
  let scrubbing = false;
  let lastReadout = '';
  let alive = true;

  /* Canvas dostaje font-size i font-family z tokenów po to, żeby odczytać je
     z getComputedStyle już rozwinięte do pikseli — wartość samego tokenu to
     nierozwinięty calc(), którego ctx.font nie zrozumie. */
  const canvas = h('canvas.m5-chart__canvas', {
    tabindex: '0',
    // role="img" czyniło z wykresu liść: czytnik mówił „grafika” i nie zapowiadał
    // niczego, co da się z nią zrobić — a element jest skupialny i obsługuje
    // strzałki. role="slider" opisuje dokładnie to zachowanie, a aria-valuetext
    // niesie odczyt spod kursora (aria-live w #readout byłoby wtedy echem).
    aria: {
      role: 'slider', label: 'Wykres historii pomiarów', orientation: 'horizontal',
      valuemin: '0', valuemax: '0', valuenow: '0', describedby: hintId
    },
    // Wygląd kadru stoi w .m5-chart__canvas; stąd idzie tylko wysokość,
    // bo jest argumentem wywołania, a nie stałą wyglądu.
    style: '--m5-chart-h:' + boxHeight + 'px'
  });
  const ctx = canvas.getContext ? canvas.getContext('2d') : null;

  const wrap = h('div.m5-chart__plot', null, canvas);

  const readout = h('p.m5-chart__readout', { id: readoutId });

  const legend = h('ul.m5-chart__legend');

  const hint = h('span.m5-sronly', {
    id: hintId,
    text: 'Wykres interaktywny. Strzałki w lewo i w prawo przesuwają kursor odczytu, '
      + 'Home i End przechodzą na początek i koniec zakresu, Escape ukrywa kursor.'
  });

  const el = h('figure.m5-chart', {
    dataset: { metric: metric.id, range: range.id }
  }, wrap, readout, legend, hint);

  /* ── odczyt tokenów ── */

  function readStyle() {
    const cs = getComputedStyle(el);
    const colors = {};
    Object.keys(COLOR_TOKENS).forEach((key) => {
      const value = cs.getPropertyValue(COLOR_TOKENS[key]).trim();
      colors[key] = value || COLOR_FALLBACK[key];
    });
    const cc = getComputedStyle(canvas);
    return {
      colors: colors,
      fontSize: Math.max(9, Math.round(parseFloat(cc.fontSize) || 12)),
      fontFamily: cc.fontFamily || 'monospace',
      radius: parseFloat(cs.getPropertyValue('--r-md')) || 14
    };
  }

  function zoneColor(zone, soft) {
    const c = style.colors;
    if (zone === 'good') return soft ? c.goodSoft : c.good;
    if (zone === 'warn') return soft ? c.warnSoft : c.warn;
    if (zone === 'crit') return soft ? c.critSoft : c.crit;
    return soft ? c.noneSoft : c.none;
  }

  function zoneOf(value) {
    const th = thresholdsFor(metric.id);
    if (!th) return null;
    return zoneFor(value, th.warn, th.crit, metric.invert);
  }

  /* ── dziedzina wartości ── */

  /* Zakres osi wartości bierzemy z danych, nie z katalogu: przy pomiarach
     2700–2900 K oś rozciągnięta do 9000 K pokazywałaby płaską kreskę. Progi
     stref świadomie nie rozciągają osi — pasmo po prostu wypełnia całe tło,
     gdy wszystkie pomiary leżą w jednej strefie. */
  function computeDomain(plotH) {
    let lo = data.min;
    let hi = data.max;
    if (hi - lo < 1e-9) {
      const full = (isFinite(metric.max) && isFinite(metric.min)) ? metric.max - metric.min : 0;
      const pad = (full || Math.abs(hi) || 1) * 0.03;
      lo -= pad; hi += pad;
    } else {
      const pad = (hi - lo) * 0.12;   // oddech, żeby skrajny punkt nie dotykał krawędzi
      lo -= pad; hi += pad;
    }
    const wanted = plotH < 110 ? 3 : (plotH < 190 ? 4 : 5);
    const scale = niceScale(lo, hi, wanted);
    let min = scale.min;
    let max = scale.max;
    // Podziałka może wyjść poza fizyczny zakres wielkości (ujemne procenty);
    // ucinamy to tylko wtedy, gdy same dane tam nie sięgają.
    if (isFinite(metric.min) && data.min >= metric.min && min < metric.min) min = metric.min;
    if (isFinite(metric.max) && data.max <= metric.max && max > metric.max) max = metric.max;
    if (!(max > min)) max = min + (scale.step || 1);
    const eps = scale.step * 1e-6;
    return {
      min: min,
      max: max,
      step: scale.step,
      decimals: scale.decimals,   // sam krok decyduje o precyzji — bez zbędnych zer
      ticks: scale.ticks.filter((v) => v >= min - eps && v <= max + eps)
    };
  }

  function bandsFor(dMin, dMax) {
    const th = thresholdsFor(metric.id);
    if (!th || !isFinite(th.warn) || !isFinite(th.crit)) return [];
    const out = [];
    const add = (zone, from, to) => {
      const a = Math.max(dMin, Math.min(from, to));
      const b = Math.min(dMax, Math.max(from, to));
      if (b > a) out.push({ zone: zone, from: a, to: b });
    };
    if (metric.invert) {
      add('crit', dMin, th.crit);
      add('warn', th.crit, th.warn);
      add('good', th.warn, dMax);
    } else {
      add('good', dMin, th.warn);
      add('warn', th.warn, th.crit);
      add('crit', th.crit, dMax);
    }
    return out;
  }

  function gapMs() {
    return Math.max(range.bucketMs * GAP_FACTOR, 1500);
  }

  function detectGaps() {
    const limit = gapMs();
    for (let i = 1; i < data.points.length; i += 1) {
      if (data.points[i].t - data.points[i - 1].t > limit) return true;
    }
    return false;
  }

  /* ── rysowanie ── */

  function drawMessage(w, hgt, title, note) {
    const fs = style.fontSize;
    roundRectPath(ctx, 0.5, 0.5, w - 1, hgt - 1, style.radius);
    ctx.fillStyle = style.colors.sunken;
    ctx.fill();
    ctx.strokeStyle = style.colors.line1;
    ctx.lineWidth = 1;
    ctx.stroke();

    const maxW = Math.max(60, w - 40);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';

    ctx.font = '600 ' + (fs + 3) + 'px ' + style.fontFamily;
    const titleLines = wrapText(ctx, title, maxW);
    ctx.font = fs + 'px ' + style.fontFamily;
    const noteLines = wrapText(ctx, note, maxW);

    const lh = Math.round((fs + 3) * 1.4);
    const total = titleLines.length * lh + noteLines.length * lh;
    let y = Math.round((hgt - total) / 2) + fs;

    ctx.font = '600 ' + (fs + 3) + 'px ' + style.fontFamily;
    ctx.fillStyle = style.colors.text2;
    titleLines.forEach((line) => { ctx.fillText(line, w / 2, y); y += lh; });

    ctx.font = fs + 'px ' + style.fontFamily;
    ctx.fillStyle = style.colors.text3;
    noteLines.forEach((line) => { ctx.fillText(line, w / 2, y); y += lh; });
  }

  function draw() {
    if (!alive || !ctx) return;
    const cssW = Math.round(wrap.clientWidth || el.clientWidth || 0);
    const cssH = boxHeight;
    if (cssW < 24) return;               // element jeszcze nie ma miejsca w układzie

    if (!style) style = readStyle();

    // Bufor liczony w pikselach urządzenia; skalę bierzemy ilorazem, a nie samym
    // dpr, bo zaokrąglenie bufora do pełnego piksela przesuwałoby prawą krawędź.
    const dpr = Math.min(MAX_DPR, Math.max(1, window.devicePixelRatio || 1));
    const bw = Math.max(1, Math.round(cssW * dpr));
    const bh = Math.max(1, Math.round(cssH * dpr));
    if (canvas.width !== bw || canvas.height !== bh) { canvas.width = bw; canvas.height = bh; }
    ctx.setTransform(bw / cssW, 0, 0, bh / cssH, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const c = style.colors;
    const fs = style.fontSize;
    ctx.font = fs + 'px ' + style.fontFamily;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    if (!data.count) {
      geo = null;
      drawMessage(cssW, cssH, 'Brak danych', 'Uruchom pomiar — wykres pojawi się po pierwszych odczytach.');
      return;
    }
    if (data.count < 2) {
      geo = null;
      drawMessage(cssW, cssH, 'Za mało danych',
        'Mamy jeden odczyt: ' + metricValueUnit(metric.id, data.points[0].v) + '. Linię rysujemy od dwóch.');
      return;
    }

    const domain = computeDomain(cssH);
    const valueLabels = domain.ticks.map((v) => nf(v, domain.decimals));
    let labelW = 0;
    valueLabels.forEach((t) => { labelW = Math.max(labelW, ctx.measureText(t).width); });
    labelW = Math.max(labelW, ctx.measureText(metric.unit).width);

    const padLeft = Math.min(Math.round(cssW * 0.36), Math.round(labelW) + 10);
    const plot = {
      x: padLeft,
      y: fs + 10,
      w: cssW - padLeft - 10,
      h: cssH - (fs + 10) - (fs + 14)
    };
    if (plot.w < 40 || plot.h < 30) { geo = null; return; }

    const tSpan = Math.max(1, tMax - tMin);
    const vSpan = domain.max - domain.min;
    const xFor = (t) => plot.x + ((t - tMin) / tSpan) * plot.w;
    const yFor = (v) => plot.y + plot.h - ((v - domain.min) / vSpan) * plot.h;

    const pts = data.points.map((p) => ({ t: p.t, v: p.v, x: xFor(p.t), y: yFor(p.v) }));

    // Podziałki czasu dobieramy do zmierzonej szerokości najdłuższej etykiety,
    // więc na 320 px po prostu wypada ich mniej — nigdy nie zachodzą na siebie.
    const sampleW = ctx.measureText(sampleTimeLabel(mode)).width;
    const maxLabels = Math.max(2, Math.min(6, Math.floor(plot.w / (sampleW + 18))));
    const tStep = pickTimeStep(tSpan, maxLabels);
    const tTicks = timeTicks(tMin, tMax, tStep, mode);

    /* — tło, pasma, siatka (wszystko przycięte do zaokrąglonego prostokąta) — */
    ctx.save();
    roundRectPath(ctx, plot.x, plot.y, plot.w, plot.h, Math.min(style.radius, plot.h / 2, plot.w / 2));
    ctx.fillStyle = c.sunken;
    ctx.fill();
    ctx.clip();

    bandsFor(domain.min, domain.max).forEach((band) => {
      const top = yFor(band.to);
      ctx.fillStyle = zoneColor(band.zone, true);
      ctx.fillRect(plot.x, top, plot.w, yFor(band.from) - top);
    });

    ctx.lineWidth = 1;
    ctx.strokeStyle = c.line1;
    ctx.beginPath();
    domain.ticks.forEach((v) => {
      const y = crisp(yFor(v));
      ctx.moveTo(plot.x, y);
      ctx.lineTo(plot.x + plot.w, y);
    });
    tTicks.forEach((t) => {
      const x = crisp(xFor(t));
      ctx.moveTo(x, plot.y);
      ctx.lineTo(x, plot.y + plot.h);
    });
    ctx.stroke();

    // Progi stref: kreskowana linia w barwie strefy, którą otwiera — pasmo mówi
    // „gdzie”, linia mówi „od ilu”.
    const th = thresholdsFor(metric.id);
    if (th) {
      ctx.save();
      ctx.setLineDash([5, 4]);
      ctx.globalAlpha = 0.65;
      [['warn', th.warn], ['crit', th.crit]].forEach((pair) => {
        const value = pair[1];
        if (!isFinite(value) || value <= domain.min || value >= domain.max) return;
        ctx.strokeStyle = zoneColor(pair[0], false);
        ctx.beginPath();
        const y = crisp(yFor(value));
        ctx.moveTo(plot.x, y);
        ctx.lineTo(plot.x + plot.w, y);
        ctx.stroke();
      });
      ctx.restore();
    }

    /* — linia wartości, cięta na przerwach — */
    const limit = gapMs();
    const segments = [];
    let segment = [pts[0]];
    for (let i = 1; i < pts.length; i += 1) {
      if (pts[i].t - pts[i - 1].t > limit) { segments.push(segment); segment = []; }
      segment.push(pts[i]);
    }
    segments.push(segment);

    ctx.strokeStyle = c.accent;
    ctx.fillStyle = c.accent;
    ctx.lineWidth = 2;
    segments.forEach((seg) => {
      if (seg.length === 1) {
        // Odcięty pojedynczy pomiar: kropka, bo linia z jednego punktu nie
        // istnieje, a bez niej odczyt zniknąłby z wykresu bez śladu.
        ctx.beginPath();
        ctx.arc(seg[0].x, seg[0].y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        return;
      }
      ctx.beginPath();
      pathSegment(ctx, seg);
      ctx.stroke();
    });

    // Przy rzadkich danych zaznaczamy same pomiary — inaczej nie widać, że
    // wygładzona linia opiera się na kilkunastu punktach.
    if (pts.length <= 40 && plot.w / pts.length > 12) {
      segments.forEach((seg) => {
        if (seg.length < 2) return;
        seg.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      });
    }

    /* — kursor odczytu — */
    const active = cursor >= 0 && cursor < pts.length ? pts[cursor] : null;
    if (active) {
      ctx.save();
      ctx.strokeStyle = c.lineStrong;
      ctx.lineWidth = 1;
      ctx.beginPath();
      const cx = crisp(active.x);
      ctx.moveTo(cx, plot.y);
      ctx.lineTo(cx, plot.y + plot.h);
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(active.x, active.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = zoneColor(zoneOf(active.v), false);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = c.surface1;   // pierścień odcina kropkę od pasma pod nią
      ctx.stroke();
    }

    ctx.restore();

    /* — opisy osi (poza obszarem przycięcia) — */
    ctx.fillStyle = c.text3;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    domain.ticks.forEach((v, i) => { ctx.fillText(valueLabels[i], plot.x - 6, yFor(v)); });
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(metric.unit, plot.x - 6, plot.y - 6);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    let occupied = -Infinity;
    tTicks.forEach((t) => {
      const label = axisTimeLabel(t, tMax, mode);
      const w = ctx.measureText(label).width;
      // Skrajne etykiety dociskamy do wnętrza wykresu, a te, które po dociśnięciu
      // wchodziłyby na poprzednią, po prostu pomijamy.
      const x = Math.min(plot.x + plot.w - w / 2, Math.max(plot.x + w / 2, xFor(t)));
      if (x - w / 2 < occupied + 8) return;
      occupied = x + w / 2;
      ctx.fillText(label, x, plot.y + plot.h + 7);
    });

    /* — plakietka z odczytem, na końcu, żeby nic jej nie zasłoniło — */
    if (active) {
      const zone = zoneOf(active.v);
      const label = metricValueUnit(metric.id, active.v) + ' ' + DOT + ' ' + cursorTimeLabel(active.t, mode);
      ctx.font = fs + 'px ' + style.fontFamily;
      const w = Math.min(plot.w - 8, ctx.measureText(label).width + 16);
      const bh2 = fs + 12;
      const bx = Math.min(plot.x + plot.w - w - 4, Math.max(plot.x + 4, active.x - w / 2));
      // Punkt wysoko w kadrze — plakietkę schodzimy pod spód, żeby go nie zakryć.
      const by = active.y < plot.y + plot.h / 2 ? plot.y + plot.h - bh2 - 6 : plot.y + 6;

      roundRectPath(ctx, bx, by, w, bh2, Math.min(10, bh2 / 2));
      ctx.fillStyle = c.surface3;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = zone ? zoneColor(zone, false) : c.line2;
      ctx.stroke();

      ctx.fillStyle = c.text1;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, bx + w / 2, by + bh2 / 2 + 0.5);
    }

    geo = { plot: plot, pts: pts };
  }

  const scheduleDraw = rafThrottle(draw);

  /* ── legenda, opis i odczyt ── */

  // Klucz legendy: strefa to kwadracik w pełnej barwie (mgiełka pasma była
  // w motywie ciemnym nie do odróżnienia od czerni), pomiar i przerwa to kreski.
  function legendItem(swatchClass, label, zone) {
    return h('li.m5-chart__legend-item', null,
      h('span.m5-chart__swatch' + (swatchClass ? '.' + swatchClass : ''), {
        aria: { hidden: true },
        dataset: zone ? { zone: zone } : null
      }),
      h('span', { text: label }));
  }

  /* Legenda nie jest ozdobą: przy deuteranopii pasma same z siebie nie mówią,
     które jest które, więc każde ma tu nazwę słowną. */
  function renderLegend() {
    clear(legend);
    legend.appendChild(legendItem('m5-chart__swatch--line', 'pomiar'));
    if (thresholdsFor(metric.id)) {
      ['good', 'warn', 'crit'].forEach((zone) => {
        legend.appendChild(legendItem('', ZONE_LABEL[zone], zone));
      });
    }
    if (hasGaps) {
      legend.appendChild(legendItem('m5-chart__swatch--gap', 'przerwa w pomiarze'));
    }
  }

  function updateAria() {
    // Etykiety zakresów bywają zakończone kropką ('1 godz.') — druga kropka
    // z rzędu brzmi w czytniku ekranu jak usterka.
    const head = 'Wykres: ' + metric.namePL + ', zakres ' + range.labelPL;
    const parts = [head.endsWith('.') ? head : head + '.'];
    if (!data.count) {
      parts.push('Brak danych w tym zakresie.');
    } else if (data.count === 1) {
      parts.push('Jeden odczyt: ' + metricValueUnit(metric.id, data.points[0].v) + '.');
    } else {
      parts.push('Od ' + metricValueUnit(metric.id, data.min)
        + ' do ' + metricValueUnit(metric.id, data.max)
        + ', średnia ' + metricValueUnit(metric.id, data.avg)
        + ', ' + plural(data.count, 'punkt', 'punkty', 'punktów') + '.');
      if (hasGaps) parts.push('W szeregu są przerwy — wtedy nie mierzyliśmy.');
    }
    canvas.setAttribute('aria-label', parts.join(' '));
  }

  /* Jedyne miejsce, w którym mówimy o bieżącym odczycie — jest jednocześnie
     opisem canvasu (aria-describedby) i regionem live dla czytnika ekranu. */
  function updateReadout() {
    let text;
    if (!data.count) {
      text = 'Brak danych w tym zakresie.';
    } else if (cursor >= 0 && data.points[cursor]) {
      const p = data.points[cursor];
      const zone = zoneOf(p.v);
      text = metric.namePL + ': ' + metricValueUnit(metric.id, p.v)
        + (zone ? ', ' + ZONE_LABEL[zone] : '')
        + ', ' + cursorTimeLabel(p.t, mode);
    } else if (data.count < 2) {
      text = 'Za mało danych, aby narysować wykres.';
    } else {
      text = 'Przeciągnij po wykresie albo użyj strzałek, aby odczytać pojedynczy pomiar.';
    }
    // Ten sam tekst niesie aria-valuetext: skupiony suwak ogłasza go sam,
    // bez drugiego regionu live.
    const last = Math.max(0, data.points.length - 1);
    canvas.setAttribute('aria-valuemin', '0');
    canvas.setAttribute('aria-valuemax', String(last));
    canvas.setAttribute('aria-valuenow', String(cursor >= 0 ? cursor : 0));
    canvas.setAttribute('aria-valuetext', text);

    // Straż na powtórzeniu: bez niej ten sam tekst byłby zapisywany po każdym
    // ruchu palca, a zapis unieważnia rysowanie w części silników.
    if (text === lastReadout) return;
    lastReadout = text;
    readout.textContent = text;
  }

  function setCursor(index) {
    const next = data.points.length ? Math.max(-1, Math.min(data.points.length - 1, index)) : -1;
    if (next === cursor) return;
    cursor = next;
    cursorT = next >= 0 ? data.points[next].t : null;
    updateReadout();
    scheduleDraw();
  }

  function nearestIndexByTime(t) {
    let best = -1;
    let bestDelta = Infinity;
    for (let i = 0; i < data.points.length; i += 1) {
      const delta = Math.abs(data.points[i].t - t);
      if (delta < bestDelta) { bestDelta = delta; best = i; }
    }
    return best;
  }

  function indexAtX(px) {
    if (!geo || !geo.pts.length) return -1;
    let best = -1;
    let bestDelta = Infinity;
    for (let i = 0; i < geo.pts.length; i += 1) {
      const delta = Math.abs(geo.pts[i].x - px);
      if (delta < bestDelta) { bestDelta = delta; best = i; }
    }
    return best;
  }

  /* ── wskaźnik i klawiatura ── */

  function localX(event) {
    const rect = canvas.getBoundingClientRect();
    return event.clientX - rect.left;
  }

  function onPointerDown(event) {
    if (!data.count || (event.pointerType === 'mouse' && event.button !== 0)) return;
    scrubbing = true;
    // Fokus po dotknięciu sprawia, że po przeciągnięciu palcem strzałki od razu
    // przesuwają kursor; :focus-visible pilnuje, by myszy nie rysować obwódki.
    try { canvas.focus({ preventScroll: true }); } catch (err) { canvas.focus(); }
    try { canvas.setPointerCapture(event.pointerId); } catch (err) { /* bez przechwycenia też działa */ }
    setCursor(indexAtX(localX(event)));
  }

  function onPointerMove(event) {
    if (!scrubbing) return;
    // touch-action: pan-y zostawia przeglądarce pionowe przewijanie, a nam
    // poziome przeciąganie; preventDefault blokuje jeszcze zaznaczanie tekstu.
    event.preventDefault();
    setCursor(indexAtX(localX(event)));
  }

  function onPointerEnd(event) {
    if (!scrubbing) return;
    scrubbing = false;
    try { canvas.releasePointerCapture(event.pointerId); } catch (err) { /* mogło nie zostać przechwycone */ }
    // Kursor zostaje po puszczeniu palca — odczyt ma być czytelny wtedy, gdy
    // palec przestaje go zasłaniać.
  }

  function onKeyDown(event) {
    if (!data.count) return;
    const last = data.points.length - 1;
    const jump = Math.max(1, Math.round(data.points.length / 10));
    let next = cursor;

    switch (event.key) {
      case 'ArrowRight': next = cursor < 0 ? 0 : Math.min(last, cursor + 1); break;
      case 'ArrowLeft': next = cursor < 0 ? last : Math.max(0, cursor - 1); break;
      case 'PageUp': next = cursor < 0 ? last : Math.min(last, cursor + jump); break;
      case 'PageDown': next = cursor < 0 ? last : Math.max(0, cursor - jump); break;
      case 'Home': next = 0; break;
      case 'End': next = last; break;
      case 'Escape':
        if (cursor < 0) return;
        event.preventDefault();
        setCursor(-1);
        return;
      default: return;
    }
    event.preventDefault();   // strzałki nie mają przewijać strony pod wykresem
    setCursor(next);
  }

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerEnd);
  canvas.addEventListener('pointercancel', onPointerEnd);
  canvas.addEventListener('keydown', onKeyDown);

  /* ── przerysowania z zewnątrz ── */

  // Zmiana ustawień może znaczyć nowy motyw, akcent, skalę tekstu albo nowe
  // progi stref — wszystko to zmienia obraz, więc tokeny czytamy od nowa.
  const offSettings = bus.on('settings:changed', () => {
    style = null;
    refresh();
  });

  let media = null;
  let onMedia = null;
  try {
    media = window.matchMedia('(prefers-color-scheme: dark)');
    // Przy theme='system' zmiana motywu systemu nie przechodzi przez store,
    // a wykres ma wtedy inne barwy tła i stref.
    onMedia = () => { style = null; scheduleDraw(); };
    if (typeof media.addEventListener === 'function') media.addEventListener('change', onMedia);
    else if (typeof media.addListener === 'function') media.addListener(onMedia);
  } catch (err) { media = null; }

  let observer = null;
  let onWindowResize = null;
  if (typeof ResizeObserver === 'function') {
    observer = new ResizeObserver(() => scheduleDraw());
    observer.observe(wrap);
  } else {
    onWindowResize = () => scheduleDraw();
    window.addEventListener('resize', onWindowResize);
  }

  /* ── publiczne API ── */

  function refresh() {
    if (!alive) return;
    const s = series(metric.id, range.id);
    data = s && s.points ? s : { points: [], min: null, max: null, avg: null, count: 0 };
    tMax = Date.now();
    tMin = tMax - range.ms;
    mode = timeMode(range.ms);
    hasGaps = detectGaps();

    // Kursor trzymamy w czasie, nie w indeksie: po dopisaniu świeżych pomiarów
    // ten sam indeks wskazywałby inny moment.
    cursor = cursorT === null ? -1 : nearestIndexByTime(cursorT);
    cursorT = cursor >= 0 ? data.points[cursor].t : null;

    renderLegend();
    updateAria();
    updateReadout();
    scheduleDraw();
  }

  function setMetric(id) {
    const next = byId(id);
    if (!next || next.id === metric.id) return;
    metric = next;
    el.dataset.metric = metric.id;
    cursor = -1;            // inna wielkość to inny odczyt — stary kursor traci sens
    cursorT = null;
    refresh();
  }

  function setRange(id) {
    const next = rangeById(id);
    if (!next || next.id === range.id) return;
    range = next;
    el.dataset.range = range.id;
    refresh();
  }

  function destroy() {
    alive = false;
    scheduleDraw.cancel();
    offSettings();
    if (observer) observer.disconnect();
    if (onWindowResize) window.removeEventListener('resize', onWindowResize);
    if (media && onMedia) {
      if (typeof media.removeEventListener === 'function') media.removeEventListener('change', onMedia);
      else if (typeof media.removeListener === 'function') media.removeListener(onMedia);
    }
    canvas.removeEventListener('pointerdown', onPointerDown);
    canvas.removeEventListener('pointermove', onPointerMove);
    canvas.removeEventListener('pointerup', onPointerEnd);
    canvas.removeEventListener('pointercancel', onPointerEnd);
    canvas.removeEventListener('keydown', onKeyDown);
    el.remove();
  }

  refresh();

  return { el: el, refresh: refresh, setMetric: setMetric, setRange: setRange, destroy: destroy };
}
