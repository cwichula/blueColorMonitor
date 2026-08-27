/* Monitor Światła v5 — wskaźniki pomiaru: wskaźnik-bohater, kafelek wielkości,
 * mikro-sparkline i pasek strefowy. Wszystko rysowane w SVG, bo skaluje się bez
 * rozmycia i daje się opisać dla czytnika ekranu; canvas zostaje wykresowi.
 *
 * Dwie zasady rządzą tym plikiem. Wydajność: drzewo DOM powstaje raz, przy
 * tworzeniu komponentu, a update() zmienia wyłącznie textContent, atrybuty
 * geometrii i data-zone — przy dziesięciu próbkach na sekundę przebudowa węzłów
 * byłaby czystym marnotrawstwem. Uczciwość: wartość niezmierzona to pauza,
 * nigdy zero i nigdy dobry wynik.
 */

import { h, icon } from './dom.js';
import { byId, zoneFor } from '../metrics.js';
import { metricValue, plural, ZONE_LABEL } from '../format.js';
import { thresholdsFor } from '../store.js';

/* ─────────────────────────────  Wspólne stałe  ───────────────────────────── */

const SVG_NS = 'http://www.w3.org/2000/svg';
const DASH = '—';

/* Kolory bierzemy wyłącznie z tokenów. Aktywna barwa strefy wędruje po drzewie
 * jako dziedziczona własna właściwość --m5-zone, więc jedno przypisanie na
 * korzeniu komponentu przemalowuje łuk, pasek i sparkline naraz. */
const ZONE_COLOR = {
  good: 'var(--zone-good)',
  warn: 'var(--zone-warn)',
  crit: 'var(--zone-crit)',
  none: 'var(--zone-none)'
};

/* Jednostki zapisane słowem — czytnik ekranu przeczyta „%” jako „procent”
 * tylko czasem, a „×” najczęściej pominie zupełnie. */
const SPOKEN_UNIT = {
  share: 'procent', brightness: 'procent', flicker: 'procent', uniformity: 'procent',
  melanopic: 'razy'
};

/* Wielkość nieznana katalogowi nie może wywrócić ekranu ani — co gorsza —
 * podstawić cudzych progów. Zastępczy opis jest jawnie pusty. */
const FALLBACK_METRIC = {
  id: '', namePL: 'Nieznana wielkość', unit: '',
  decimals: 0, min: 0, max: 100, warn: 70, crit: 90, invert: false, icon: 'gauge'
};

function metricOf(metricId) {
  const found = byId(metricId);
  if (found) return found;
  console.warn('[gauge] nieznana wielkość: ' + metricId);
  return Object.assign({}, FALLBACK_METRIC, { id: String(metricId ?? '') });
}

/* ────────────────────────────  Style komponentów  ────────────────────────── */

/* Wszystkie reguły są owinięte w :where(), więc mają zerową specyficzność:
 * components.css nadpisze każdą z nich jednym zwykłym selektorem, niezależnie
 * od kolejności wczytania. Dzięki temu wskaźnik wygląda poprawnie także
 * w izolacji (podgląd modułu, test), a nie odbiera stylowania warstwie CSS. */
const STYLE_ID = 'm5-gauge-styles';
const STYLE = `
:where(.m5-gauge){display:block;position:relative;width:100%}
/* Tarcza jest kontenerem zapytań: napisy w środku dostają rozmiar liczony z jej
   szerokości, ograniczony z góry tokenem. Dzięki temu ten sam wskaźnik czyta się
   i w wąskiej kolumnie, i na całą szerokość — nazwa nigdy nie wchodzi na wartość,
   a wartość nie wylewa się poza łuk. Druga deklaracja font-size jest odrzucana
   w silnikach bez jednostek cq*, więc zostaje sam token. */
:where(.m5-gauge__dial){position:relative;width:100%;container-type:inline-size}
:where(.m5-gauge__svg){display:block;width:100%;height:auto}
:where(.m5-gauge__readout){position:absolute;inset:25% 16% 18%;display:flex;
  flex-direction:column;align-items:center;justify-content:center;
  gap:var(--sp-1);text-align:center;pointer-events:none}
:where(.m5-gauge__readout){gap:1.2cqw}
:where(.m5-gauge__reading){display:flex;align-items:baseline;justify-content:center;
  gap:var(--sp-1);max-width:100%}
:where(.m5-gauge__value){font-family:var(--ff-num);font-variant-numeric:tabular-nums;
  letter-spacing:-.02em;font-size:var(--fs-display);line-height:var(--lh-tight);
  font-weight:600;color:var(--text-1)}
:where(.m5-gauge__value){font-size:min(var(--fs-display),19cqw)}
:where(.m5-gauge__unit){font-family:var(--ff-num);font-size:var(--fs-h3);color:var(--text-2)}
:where(.m5-gauge__unit){font-size:min(var(--fs-h3),7cqw)}
:where(.m5-gauge__name){font-size:var(--fs-sm);color:var(--text-2);line-height:var(--lh-tight)}
:where(.m5-gauge__name){font-size:min(var(--fs-sm),5.4cqw)}
:where(.m5-gauge__zone){font-size:var(--fs-sm);font-weight:650;line-height:var(--lh-tight);
  color:var(--m5-zone,var(--zone-none))}
:where(.m5-gauge__zone){font-size:min(var(--fs-sm),5.6cqw)}
:where(.m5-gauge__note){font-size:var(--fs-xs);color:var(--text-3);max-width:22ch;
  line-height:var(--lh-tight)}
:where(.m5-gauge__note){font-size:min(var(--fs-xs),4.6cqw)}
/* Sparkline jest przypisem, nie drugim wykresem: jeden wiersz, stała mała
   wysokość, podpis obok zamiast pod spodem. */
:where(.m5-gauge__spark){display:flex;align-items:center;justify-content:center;
  gap:var(--sp-2);margin-top:var(--sp-2)}
:where(.m5-gauge__sparkLabel){flex:0 0 auto;font-size:var(--fs-xs);color:var(--text-3);
  white-space:nowrap}
:where(.m5-sparkline){display:block;width:100%}
:where(.m5-gauge__spark>.m5-sparkline){flex:0 1 10rem;width:10rem;max-width:50%;opacity:.9}
:where(.m5-zonebar){display:block;width:100%;height:8px;border-radius:var(--r-pill);
  background:var(--surface-sunken);overflow:hidden}
:where(.m5-zonebar__svg){display:block;width:100%;height:100%}
:where(.m5-tile){display:flex;flex-direction:column;align-items:stretch;
  gap:var(--sp-2);width:100%;min-height:var(--tap);margin:0;padding:var(--sp-4);
  border:0;border-radius:var(--r-lg);background:var(--surface-1);
  box-shadow:var(--shadow-1);color:var(--text-1);font:inherit;text-align:left;
  cursor:pointer;-webkit-appearance:none;appearance:none;
  transition:transform var(--dur-1) var(--ease-out)}
:where(.m5-tile:active){transform:scale(.985)}
:where(.m5-tile:focus-visible){outline:3px solid var(--accent-ring);outline-offset:2px}
:where(.m5-tile[data-selected="true"]){box-shadow:var(--shadow-2),inset 0 0 0 2px var(--accent)}
:where(.m5-tile__head){display:flex;align-items:center;gap:var(--sp-2);
  min-height:20px;color:var(--text-2);font-size:var(--fs-sm)}
:where(.m5-tile__name){flex:1 1 auto;min-width:0;overflow-wrap:anywhere;
  -webkit-hyphens:auto;hyphens:auto}
:where(.m5-tile__reading){display:flex;align-items:baseline;gap:var(--sp-1);min-width:0}
:where(.m5-tile__value){font-family:var(--ff-num);font-variant-numeric:tabular-nums;
  letter-spacing:-.02em;font-size:var(--fs-h1);font-weight:600;color:var(--text-1)}
:where(.m5-tile__unit){font-family:var(--ff-num);font-size:var(--fs-sm);color:var(--text-2)}
`;

function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const tag = document.createElement('style');
  tag.id = STYLE_ID;
  tag.textContent = STYLE;
  document.head.appendChild(tag);
}

/* ───────────────────────────  Drobne narzędzia  ──────────────────────────── */

/* h() z dom.js tworzy elementy HTML; SVG wymaga przestrzeni nazw, więc ma tu
 * własną, minimalną fabrykę. */
function s(tag, attrs = {}, children = []) {
  const el = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    el.setAttribute(key, String(value));
  });
  children.forEach((child) => { if (child) el.appendChild(child); });
  return el;
}

function num(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function round2(value) {
  return Math.round(value * 100) / 100;
}

/* Ustawia atrybut tylko wtedy, gdy naprawdę się zmienił — zapis identycznej
 * wartości i tak unieważnia rysowanie w części silników. */
function setAttr(el, name, value) {
  const next = String(value);
  if (el.getAttribute(name) !== next) el.setAttribute(name, next);
}

function setText(el, value) {
  if (el.textContent !== value) el.textContent = value;
}

/* Pozycja wartości na skali wielkości, przycięta do zakresu katalogowego.
 * Skala zawsze biegnie od min do max — także dla wielkości odwróconych, gdzie
 * większa liczba znaczy lepiej; kierunek „lepiej” niesie kolor i słowo. */
function fractionOf(metric, value) {
  if (!num(value)) return 0;
  const span = metric.max - metric.min;
  if (!(span > 0)) return 0;
  return Math.min(1, Math.max(0, (value - metric.min) / span));
}

function valueFrom(reading, metricId) {
  if (reading === null || reading === undefined) return null;
  if (typeof reading === 'number') return Number.isFinite(reading) ? reading : null;
  const raw = reading[metricId];
  return num(raw) ? raw : null;
}

function limitsOf(metric) {
  return thresholdsFor(metric.id) || { warn: metric.warn, crit: metric.crit };
}

/* Strefa: najpierw ta policzona przy pomiarze (kamera zna kalibrację i progi
 * z chwili próbki), a w jej braku liczona z bieżących progów użytkownika. */
function zoneOf(metric, value, reading) {
  const zones = reading && typeof reading === 'object' ? reading.zones : null;
  if (zones && Object.prototype.hasOwnProperty.call(zones, metric.id)) {
    return zones[metric.id] || 'none';
  }
  const limits = limitsOf(metric);
  return zoneFor(value, limits.warn, limits.crit, metric.invert) || 'none';
}

/* Odczyt słowny do aria-label: „27 procent”, „5200 kelwinów”, „84 punkty”. */
function spokenValue(metric, value) {
  if (!num(value)) return 'brak danych';
  if (metric.id === 'kelvin') return plural(value, 'kelwin', 'kelwiny', 'kelwinów');
  if (metric.id === 'comfort') return plural(value, 'punkt', 'punkty', 'punktów');
  const unit = SPOKEN_UNIT[metric.id];
  const text = metricValue(metric.id, value);
  return unit ? text + ' ' + unit : text;
}

/* Jednostka pokazuje się tylko przy zmierzonej liczbie: „— %” sugerowałoby,
 * że coś zmierzyliśmy i wyszło nieokreślone. */
function unitText(metric, value) {
  return num(value) && metric.unit ? metric.unit : '';
}

/* Mniej ruchu: atrybut z ustawień ma pierwszeństwo, bo użytkownik mógł go
 * wybrać wbrew systemowi; poza tym pytamy system. Sprawdzamy przy każdej
 * próbce, żeby zmiana ustawienia działała natychmiast, bez nasłuchu na szynie
 * (ui/gauge.js nie importuje bus.js). */
function reducedMotion() {
  if (typeof document === 'undefined') return true;
  const attr = document.documentElement.getAttribute('data-motion');
  if (attr === 'reduced') return true;
  if (attr === null || attr === 'system') {
    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
  }
  return false;
}

/* ─────────────────────────────  sparkline  ───────────────────────────────── */

/**
 * sparkline({points, min, max, width, height}) -> SVGElement
 *
 * `points` to tablica liczb albo obiektów {v} / {t, v}; `null` znaczy „nie
 * zmierzono” i przerywa linię. Zwrócony element ma dołożoną metodę
 * `update(points, {min, max})`, która przerysowuje przebieg bez wymiany węzła —
 * dzięki temu wskaźnik-bohater odświeża sparkline, nie ruszając DOM.
 */
export function sparkline({ points = [], min = null, max = null, width = 120, height = 32,
  strokeWidth = 2 } = {}) {
  ensureStyles();

  // Ścieżka, nie <polyline>, z jednego powodu: polilinia nie umie przerwy,
  // a połączenie kreską dwóch próbek przez lukę bez pomiaru byłoby kłamstwem.
  const path = s('path', {
    fill: 'none',
    stroke: 'var(--m5-zone, var(--zone-none))',
    'stroke-width': String(strokeWidth),
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    // Bez tego niejednorodne skalowanie viewBoxa rozciągnęłoby kreskę w plamę.
    'vector-effect': 'non-scaling-stroke'
  });

  const svg = s('svg', {
    class: 'm5-sparkline',
    viewBox: '0 0 ' + width + ' ' + height,
    // Sparkline ma wypełnić szerokość rodzica; proporcje pudełka nic tu nie
    // znaczą, bo o kształcie decyduje przebieg wartości.
    preserveAspectRatio: 'none',
    width: String(width),
    height: String(height),
    focusable: 'false',
    'aria-hidden': 'true',
    style: 'height:' + height + 'px'
  }, [path]);

  function apply(nextPoints, bounds) {
    const opts = bounds || {};
    const values = (nextPoints || []).map((p) => {
      if (num(p)) return p;
      if (p && typeof p === 'object' && num(p.v)) return p.v;
      return null;
    });

    let lo = num(opts.min) ? opts.min : Infinity;
    let hi = num(opts.max) ? opts.max : -Infinity;
    let measured = 0;
    values.forEach((v) => {
      if (v === null) return;
      measured += 1;
      if (!num(opts.min) && v < lo) lo = v;
      if (!num(opts.max) && v > hi) hi = v;
    });

    // Same pauzy albo pusta tablica: nie ma czego rysować i nie wolno niczego
    // udawać — zostaje puste pole.
    if (!measured || !num(lo) || !num(hi)) { setAttr(path, 'd', ''); return; }

    // Płaski przebieg dostaje sztuczny margines, żeby linia legła w połowie
    // wysokości, zamiast przykleić się do krawędzi.
    if (hi - lo < 1e-9) {
      const pad = Math.max(Math.abs(hi) * 0.05, 0.5);
      lo -= pad;
      hi += pad;
    }

    const padY = 3;
    const usable = Math.max(1, height - padY * 2);
    const step = values.length > 1 ? width / (values.length - 1) : 0;
    let d = '';
    let penDown = false;

    values.forEach((v, i) => {
      if (v === null) { penDown = false; return; }
      const x = values.length > 1 ? i * step : width / 2;
      const y = padY + (1 - Math.min(1, Math.max(0, (v - lo) / (hi - lo)))) * usable;
      const point = round2(x) + ' ' + round2(y);
      // Każdy nowy odcinek zaczyna się od kreski zerowej długości: przy
      // zaokrąglonym końcu pojedyncza próbka między pauzami rysuje się jako
      // kropka, zamiast zniknąć.
      d += penDown ? 'L' + point : 'M' + point + 'L' + point;
      penDown = true;
    });

    setAttr(path, 'd', d);
  }

  apply(points, { min, max });
  svg.update = (nextPoints, bounds) => apply(nextPoints, bounds);
  return svg;
}

/* ──────────────────────────────  zoneBar  ────────────────────────────────── */

/**
 * zoneBar({metricId, value, decorative}) -> {el, update(value, zone?), destroy()}
 *
 * Poziomy pasek z pasmami stref i znacznikiem bieżącej wartości. Pasmo strefy,
 * w której właśnie jesteśmy, dostaje pełne krycie — to drugi, niebarwny sygnał
 * obok koloru. `decorative: true` zdejmuje rolę i etykietę (kafelek opisuje się
 * sam, a druga etykieta tylko dublowałaby odczyt). `update` zwraca nazwę
 * strefy, żeby wołający nie liczył jej po raz drugi.
 */
export function zoneBar({ metricId, value = null, decorative = false } = {}) {
  ensureStyles();
  const metric = metricOf(metricId);

  const bands = {
    good: s('rect', { x: '0', y: '0', width: '0', height: '10', fill: ZONE_COLOR.good, 'fill-opacity': '.4' }),
    warn: s('rect', { x: '0', y: '0', width: '0', height: '10', fill: ZONE_COLOR.warn, 'fill-opacity': '.4' }),
    crit: s('rect', { x: '0', y: '0', width: '0', height: '10', fill: ZONE_COLOR.crit, 'fill-opacity': '.4' })
  };

  // Znacznik to dwie kreski: szersza w kolorze karty odcina go od pasma,
  // węższa niesie właściwy kolor. Bez podkładu ginie na ciemnym paśmie.
  const markerBack = s('line', {
    x1: '0', y1: '0', x2: '0', y2: '10', stroke: 'var(--surface-1)',
    'stroke-width': '5', 'vector-effect': 'non-scaling-stroke'
  });
  const markerLine = s('line', {
    x1: '0', y1: '0', x2: '0', y2: '10', stroke: 'var(--text-1)',
    'stroke-width': '2', 'vector-effect': 'non-scaling-stroke'
  });

  const svg = s('svg', {
    class: 'm5-zonebar__svg',
    viewBox: '0 0 100 10',
    preserveAspectRatio: 'none',
    focusable: 'false',
    'aria-hidden': 'true'
  }, [bands.good, bands.warn, bands.crit, markerBack, markerLine]);

  const el = h('div.m5-zonebar', { dataset: { metric: metric.id, zone: 'none' } }, svg);
  if (!decorative) el.setAttribute('role', 'img');

  let limits = { warn: NaN, crit: NaN };

  // Progi zmienia użytkownik w Narzędziach, więc czytamy je przy każdej
  // aktualizacji — ale pasma przestawiamy dopiero, gdy liczby się różnią.
  function layout() {
    const next = limitsOf(metric);
    if (next.warn === limits.warn && next.crit === limits.crit) return;
    limits = next;
    const fWarn = fractionOf(metric, limits.warn) * 100;
    const fCrit = fractionOf(metric, limits.crit) * 100;
    // Przy `invert` porządek pasm jest odwrotny: najgorzej jest przy dolnym końcu.
    const spans = metric.invert
      ? { crit: [0, fCrit], warn: [fCrit, fWarn], good: [fWarn, 100] }
      : { good: [0, fWarn], warn: [fWarn, fCrit], crit: [fCrit, 100] };
    Object.keys(spans).forEach((zone) => {
      const from = spans[zone][0];
      const to = spans[zone][1];
      setAttr(bands[zone], 'x', round2(Math.min(from, to)));
      setAttr(bands[zone], 'width', round2(Math.max(0, to - from)));
    });
  }

  function update(nextValue, forcedZone) {
    layout();
    const v = num(nextValue) ? nextValue : null;
    const zone = forcedZone || zoneOf(metric, v, null);
    el.dataset.zone = zone;
    el.style.setProperty('--m5-zone', ZONE_COLOR[zone] || ZONE_COLOR.none);
    ['good', 'warn', 'crit'].forEach((id) => {
      setAttr(bands[id], 'fill-opacity', id === zone ? '1' : '.4');
    });
    const show = v !== null;
    markerBack.style.display = show ? '' : 'none';
    markerLine.style.display = show ? '' : 'none';
    if (show) {
      const x = round2(fractionOf(metric, v) * 100);
      setAttr(markerBack, 'x1', x); setAttr(markerBack, 'x2', x);
      setAttr(markerLine, 'x1', x); setAttr(markerLine, 'x2', x);
    }
    if (!decorative) {
      el.setAttribute('aria-label', metric.namePL + ': ' + spokenValue(metric, v) +
        ', strefa: ' + (ZONE_LABEL[zone] || ZONE_LABEL.none));
    }
    return zone;
  }

  update(value);
  return { el, update, destroy() { el.remove(); } };
}

/* ─────────────────────────────  heroGauge  ───────────────────────────────── */

/* Geometria tarczy w jednostkach viewBoxa. Łuk 240° z przerwą u dołu: to
 * kształt przyrządu, a nie pełne koło, więc od razu widać, gdzie skala się
 * zaczyna i gdzie kończy. */
const DIAL = { w: 200, h: 148, cx: 100, cy: 88, r: 77, band: 10 };
const ARC_START = 150;
const ARC_SWEEP = 240;
/* Znacznik progu przecina cały tor i wystaje po jednostce z każdej strony —
 * dzięki temu leży na łuku, a nie wisi obok niego. */
const TICK_IN = DIAL.r - DIAL.band / 2 - 1;
const TICK_OUT = DIAL.r + DIAL.band / 2 + 1;
/* Etykiety krańców stoją POD końcami łuku i odsunięte na zewnątrz: wypełnienie
 * kończy się kilkanaście jednostek wyżej, więc nie ma ich czym przykryć. */
const LABEL_Y = 143;
const LABEL_X = 22;
/* Długość łuku liczymy wzorem, a nie przez getTotalLength(): element bywa
 * jeszcze poza dokumentem, a wtedy część silników zwraca zero. */
const ARC_LEN = DIAL.r * ARC_SWEEP * Math.PI / 180;
const HISTORY_MS = 60000;
/* Tyle punktów ma mikro-wykres — mniej więcej jeden na półtorej sekundy. */
const SPARK_BUCKETS = 40;
/* Najwęższe okno pionowe mikro-wykresu, w ułamku zakresu wielkości. */
const SPARK_FLOOR = 0.08;

function polar(cx, cy, r, deg) {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function arcPathD(r) {
  const a = polar(DIAL.cx, DIAL.cy, r, ARC_START);
  const b = polar(DIAL.cx, DIAL.cy, r, ARC_START + ARC_SWEEP);
  // large-arc-flag = 1, bo 240° > 180°; sweep-flag = 1, bo kąt rośnie zgodnie
  // z ruchem wskazówek zegara w układzie SVG (oś Y skierowana w dół).
  return 'M' + round2(a.x) + ' ' + round2(a.y) +
    'A' + r + ' ' + r + ' 0 1 1 ' + round2(b.x) + ' ' + round2(b.y);
}

/**
 * heroGauge({metricId}) -> {el, update(reading), setMetric(id), destroy()}
 *
 * Duży wskaźnik: tor łuku w --line-2, wypełnienie w barwie strefy biegnące od
 * początku skali, znaczniki progów warn i crit przecinające tor, w środku wielki
 * odczyt tabularnymi cyframi z jednostką, nazwą wielkości i słowną nazwą strefy,
 * pod spodem dyskretny sparkline z ostatniej minuty. Wartość dobiega do próbki
 * płynnie (wygładzanie wykładnicze na rAF), a przy „mniej ruchu” skacze. Pętla rAF chodzi tylko
 * wtedy, gdy jest co dogonić, i gaśnie w destroy().
 *
 * `update` przyjmuje `reading` z camera.js albo samą liczbę (wygodne przy
 * podglądzie historii), a `null` znaczy „nie zmierzono”.
 */
export function heroGauge({ metricId } = {}) {
  ensureStyles();
  let metric = metricOf(metricId);

  /* ---- statyczna część rysunku ---- */
  // Tor w --line-2, nie w --surface-sunken: wgłębienie ginęło w ciemnym motywie
  // i czytało się jako gruby czarny pierścień zamiast jako szyna skali.
  const track = s('path', {
    d: arcPathD(DIAL.r), fill: 'none', stroke: 'var(--line-2)',
    'stroke-width': String(DIAL.band), 'stroke-linecap': 'butt'
  });

  // Zakończenia ścięte (butt), bo zaokrąglone dokładały pół szerokości toru na
  // każdym końcu: przy odczycie kilku procent sama końcówka bywała dłuższa od
  // wypełnienia i odklejała się od początku skali w oderwaną „pigułkę”.
  const fill = s('path', {
    d: arcPathD(DIAL.r), fill: 'none', stroke: 'var(--m5-zone, var(--zone-none))',
    'stroke-width': String(DIAL.band), 'stroke-linecap': 'butt',
    'stroke-dasharray': round2(ARC_LEN), 'stroke-dashoffset': round2(ARC_LEN)
  });

  // Każdy próg to para kresek: szersza w barwie karty wycina w torze przerwę
  // (widoczną także wtedy, gdy wypełnienie ma barwę tej samej strefy), węższa
  // niesie kolor progu. Ten sam zabieg co znacznik w pasku strefowym.
  function thresholdMark(color) {
    const zero = { x1: '0', y1: '0', x2: '0', y2: '0' };
    return {
      back: s('line', Object.assign({
        stroke: 'var(--surface-1)', 'stroke-width': '4.4', 'stroke-linecap': 'butt'
      }, zero)),
      line: s('line', Object.assign({
        stroke: color, 'stroke-width': '2.6', 'stroke-linecap': 'butt'
      }, zero))
    };
  }
  const markWarn = thresholdMark(ZONE_COLOR.warn);
  const markCrit = thresholdMark(ZONE_COLOR.crit);

  const scaleMin = s('text', {
    x: String(LABEL_X), y: String(LABEL_Y), 'text-anchor': 'middle', fill: 'var(--text-3)',
    'font-size': '9', 'font-family': 'var(--ff-num)'
  });
  const scaleMax = s('text', {
    x: String(DIAL.w - LABEL_X), y: String(LABEL_Y), 'text-anchor': 'middle',
    fill: 'var(--text-3)', 'font-size': '9', 'font-family': 'var(--ff-num)'
  });
  scaleMin.textContent = metricValue(metric.id, metric.min);
  scaleMax.textContent = metricValue(metric.id, metric.max);

  const svg = s('svg', {
    class: 'm5-gauge__svg',
    viewBox: '0 0 ' + DIAL.w + ' ' + DIAL.h,
    focusable: 'false',
    'aria-hidden': 'true'
  }, [track, fill, markWarn.back, markWarn.line, markCrit.back, markCrit.line,
    scaleMin, scaleMax]);

  /* ---- odczyt w środku tarczy ---- */
  const valueEl = h('span.m5-gauge__value.m5-num', { text: DASH });
  const unitEl = h('span.m5-gauge__unit', { text: '' });
  const nameEl = h('div.m5-gauge__name', { text: metric.namePL });
  const zoneEl = h('div.m5-gauge__zone', { text: ZONE_LABEL.none });
  const noteEl = h('div.m5-gauge__note', { hidden: true });

  const readout = h('div.m5-gauge__readout', [
    h('div.m5-gauge__reading', [valueEl, unitEl]),
    nameEl, zoneEl, noteEl
  ]);

  const spark = sparkline({ points: [], width: 160, height: 22, strokeWidth: 1.6 });
  const sparkWrap = h('div.m5-gauge__spark', [
    spark,
    h('div.m5-gauge__sparkLabel', { text: 'ostatnia minuta' })
  ]);

  const el = h('div.m5-gauge', {
    dataset: { metric: metric.id, zone: 'none' },
    // role="img" czyni ze wskaźnika jeden obiekt dla czytnika ekranu: liczba
    // w środku nie jest czytana osobno, a aria-label niesie pełny odczyt.
    // Świadomie BEZ aria-live — dziesięć komunikatów na sekundę zalałoby czytnik.
    aria: { role: 'img', label: metric.namePL + ': brak danych' }
  }, [
    h('div.m5-gauge__dial', [svg, readout]),
    sparkWrap
  ]);

  /* ---- stan ---- */
  let target = null;    // ostatnia próbka
  let display = null;   // wartość rysowana, dobiegająca do target
  let zone = 'none';
  let note = '';
  let raf = 0;
  let lastFrame = 0;
  let lastSpark = 0;
  let limits = { warn: NaN, crit: NaN };
  let history = [];
  let destroyed = false;

  // Poniżej dziesięciotysięcznej części zakresu ruch jest niewidoczny —
  // wtedy przyklejamy wskazanie do próbki i wygaszamy pętlę.
  const epsilon = () => Math.max(1e-6, (metric.max - metric.min) * 1e-4);

  function placeTick(mark, value) {
    const show = num(value);
    mark.back.style.display = show ? '' : 'none';
    mark.line.style.display = show ? '' : 'none';
    if (!show) return;
    const deg = ARC_START + fractionOf(metric, value) * ARC_SWEEP;
    const inner = polar(DIAL.cx, DIAL.cy, TICK_IN, deg);
    const outer = polar(DIAL.cx, DIAL.cy, TICK_OUT, deg);
    [mark.back, mark.line].forEach((line) => {
      setAttr(line, 'x1', round2(inner.x)); setAttr(line, 'y1', round2(inner.y));
      setAttr(line, 'x2', round2(outer.x)); setAttr(line, 'y2', round2(outer.y));
    });
  }

  function syncThresholds() {
    const next = limitsOf(metric);
    if (next.warn === limits.warn && next.crit === limits.crit) return;
    limits = next;
    placeTick(markWarn, limits.warn);
    placeTick(markCrit, limits.crit);
  }

  function ariaLabel() {
    const words = metric.namePL + ': ' + spokenValue(metric, target) +
      ', strefa: ' + (ZONE_LABEL[zone] || ZONE_LABEL.none);
    return note ? words + ', ' + note : words;
  }

  // Jedyne miejsce dotykające DOM w pętli: dwa teksty i dwie liczby geometrii.
  // Żadnych tworzonych ani usuwanych węzłów.
  function paint() {
    const frac = display === null ? 0 : fractionOf(metric, display);
    setAttr(fill, 'stroke-dashoffset', round2(ARC_LEN * (1 - frac)));
    // Przy wskazaniu równym początkowi skali nie ma czego pokazać, a przy braku
    // pomiaru nie wolno pokazać nic. Ścięta końcówka nie rysuje już nadmiarowej
    // kropki, więc próg może być znacznie niższy niż przy zaokrąglonej.
    fill.style.display = display === null || frac < 0.0005 ? 'none' : '';
    setText(valueEl, display === null ? DASH : metricValue(metric.id, display));
    setText(unitEl, unitText(metric, display));
  }

  function stopLoop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    lastFrame = 0;
  }

  function frame(now) {
    if (destroyed) return;
    const dt = lastFrame ? Math.min(64, now - lastFrame) : 16;
    lastFrame = now;
    if (target === null || display === null) { display = target; paint(); stopLoop(); return; }
    const diff = target - display;
    if (Math.abs(diff) <= epsilon()) { display = target; paint(); stopLoop(); return; }
    // Wygładzanie wykładnicze zamiast stałego kroku: nie zależy od liczby
    // klatek, więc na 60 Hz i na 120 Hz wskazanie dobiega tak samo szybko.
    display += diff * (1 - Math.exp(-dt / 90));
    paint();
    raf = requestAnimationFrame(frame);
  }

  function startLoop() {
    if (raf || destroyed) return;
    lastFrame = 0;
    raf = requestAnimationFrame(frame);
  }

  function pushHistory(t, v) {
    history.push({ t, v });
    const cutoff = t - HISTORY_MS;
    let drop = 0;
    while (drop < history.length && history[drop].t < cutoff) drop += 1;
    if (drop) history = history.slice(drop);
  }

  // Sparkline odświeżamy cztery razy na sekundę: częściej i tak nie da się
  // zobaczyć, a przy 10 Hz to o połowę mniej pracy na próbkę.
  //
  // Minuta pomiaru to ~600 próbek. Wybieranie co piątej robiło z szumu gęstą
  // piłę na całą wysokość pola — obraz efektowny, ale nieczytelny. Dlatego
  // minuta idzie na SPARK_BUCKETS koszyków i rysujemy ŚREDNIĄ z każdego: to
  // nadal uczciwa liczba, tylko o przebiegu, a nie o pojedynczej klatce.
  // Koszyk bez ani jednego pomiaru zostaje pauzą (null).
  function refreshSpark(now) {
    if (now - lastSpark < 250) return;
    lastSpark = now;
    const n = history.length;
    if (!n) { spark.update([]); return; }
    const buckets = Math.min(SPARK_BUCKETS, n);
    const values = [];
    for (let i = 0; i < buckets; i += 1) {
      const from = Math.floor((i * n) / buckets);
      const to = Math.max(from + 1, Math.floor(((i + 1) * n) / buckets));
      let sum = 0;
      let count = 0;
      for (let j = from; j < to && j < n; j += 1) {
        const v = history[j].v;
        if (num(v)) { sum += v; count += 1; }
      }
      values.push(count ? sum / count : null);
    }

    // Skala pionowa mikro-wykresu ma dolną granicę. Bez niej przebieg jest
    // zawsze rozciągany od minimum do maksimum minuty, więc wahnięcie o ułamek
    // zakresu rysowało się jak górski łańcuch — obraz mówiący o skali szumu,
    // a nie o pomiarze. SPARK_FLOOR zakresu wielkości to najmniejsze okno.
    let lo = Infinity;
    let hi = -Infinity;
    values.forEach((v) => {
      if (v === null) return;
      if (v < lo) lo = v;
      if (v > hi) hi = v;
    });
    if (!Number.isFinite(lo)) { spark.update(values); return; }
    const floor = (metric.max - metric.min) * SPARK_FLOOR;
    if (hi - lo < floor) {
      const mid = (lo + hi) / 2;
      lo = mid - floor / 2;
      hi = mid + floor / 2;
    }
    spark.update(values, { min: lo, max: hi });
  }

  function update(reading) {
    if (destroyed) return;
    syncThresholds();

    const value = valueFrom(reading, metric.id);
    target = value;

    const nextZone = zoneOf(metric, value, reading);
    if (nextZone !== zone) {
      zone = nextZone;
      el.dataset.zone = zone;
      el.style.setProperty('--m5-zone', ZONE_COLOR[zone] || ZONE_COLOR.none);
      setText(zoneEl, ZONE_LABEL[zone] || ZONE_LABEL.none);
    }

    // Uczciwość wobec metody: temperaturę barwową liczy wielomian ważny mniej
    // więcej między 2000 a 12500 K. Poza tym zakresem wynik jest szacunkiem
    // i musi być podpisany, a nie podany jako fakt.
    const notes = [];
    if (metric.id === 'kelvin' && value !== null &&
      reading && typeof reading === 'object' && reading.kelvinReliable === false) {
      notes.push('wartość przybliżona');
    }
    // Łuk kończy się na katalogowym max, a liczba rośnie dalej (współczynnik
    // melanopiczny dochodzi do ~10 ×). Zamiast cicho zacisnąć wskazanie na
    // krawędzi, mówimy wprost, że skala się skończyła.
    if (value !== null && (value > metric.max || value < metric.min)) notes.push('poza skalą');
    const nextNote = notes.join(', ');
    if (nextNote !== note) {
      note = nextNote;
      setText(noteEl, note);
      noteEl.hidden = !note;
    }

    const stamp = reading && typeof reading === 'object' && num(reading.t) ? reading.t : Date.now();
    pushHistory(stamp, value);
    refreshSpark(typeof performance !== 'undefined' ? performance.now() : Date.now());

    el.setAttribute('aria-label', ariaLabel());

    // Pierwsza wartość, brak pomiaru i tryb „mniej ruchu” trafiają na tarczę
    // od razu — nie ma czego wygładzać, a animowanie z pauzy byłoby fikcją.
    if (value === null || display === null || reducedMotion()) {
      stopLoop();
      display = value;
      paint();
      return;
    }
    startLoop();
  }

  function setMetric(id) {
    if (destroyed) return;
    const next = metricOf(id);
    if (next.id === metric.id) return;
    metric = next;
    // Historia poprzedniej wielkości jest w innych jednostkach; przeniesiona
    // do nowej skali kłamałaby, więc znika razem z odczytem.
    history = [];
    target = null;
    display = null;
    zone = 'none';
    note = '';
    limits = { warn: NaN, crit: NaN };
    stopLoop();
    syncThresholds();
    el.dataset.metric = metric.id;
    el.dataset.zone = 'none';
    el.style.setProperty('--m5-zone', ZONE_COLOR.none);
    setText(nameEl, metric.namePL);
    setText(zoneEl, ZONE_LABEL.none);
    setText(noteEl, '');
    noteEl.hidden = true;
    scaleMin.textContent = metricValue(metric.id, metric.min);
    scaleMax.textContent = metricValue(metric.id, metric.max);
    spark.update([]);
    paint();
    el.setAttribute('aria-label', ariaLabel());
  }

  function destroy() {
    destroyed = true;
    stopLoop();
    history = [];
    el.remove();
  }

  syncThresholds();
  el.style.setProperty('--m5-zone', ZONE_COLOR.none);
  paint();

  return { el, update, setMetric, destroy };
}

/* ────────────────────────────  metricTile  ───────────────────────────────── */

/**
 * metricTile({metricId, selected, onSelect}) ->
 *   {el, update(reading), setSelected(b), destroy()}
 *
 * Kafelek jest zawsze <button type="button"> — dzięki temu klawiatura, Enter
 * i spacja działają bez jednej linii obsługi klawiszy.
 *
 * Kafelek woła `onSelect(metricId)` i wypuszcza bąbelkujące zdarzenie
 * 'm5:metric' ze szczegółem {metricId} — ekran pomiaru robi z tego zmianę
 * wielkości wiodącej. Wariantu zablokowanego nie ma: każda z siedmiu wielkości
 * pokazuje swoją liczbę każdemu, bez warunków.
 */
export function metricTile({ metricId, selected = false, onSelect } = {}) {
  ensureStyles();
  const metric = metricOf(metricId);

  const valueEl = h('span.m5-tile__value.m5-num', { text: DASH });
  const unitEl = h('span.m5-tile__unit', { text: '' });
  const bar = zoneBar({ metricId: metric.id, value: null, decorative: true });

  const el = h('button.m5-tile', {
    type: 'button',
    dataset: { metric: metric.id, zone: 'none', selected: String(!!selected) }
  }, [
    h('div.m5-tile__head', [
      icon(metric.icon || 'gauge', { size: 16 }),
      h('span.m5-tile__name', { text: metric.namePL })
    ]),
    h('div.m5-tile__reading', [valueEl, unitEl]),
    bar.el
  ]);

  let value = null;
  let zone = 'none';

  function label() {
    return metric.namePL + ': ' + spokenValue(metric, value) +
      ', strefa: ' + (ZONE_LABEL[zone] || ZONE_LABEL.none);
  }

  /* Zmiana dostępnej nazwy SKUPIONEGO przycisku jest przez NVDA i JAWS
   * odczytywana od nowa — przy dziesięciu próbkach na sekundę użytkownik
   * czytnika słyszałby nieprzerwany strumień liczb. Dopóki fokus stoi na
   * kafelku, zapamiętujemy tylko, że etykieta się zdezaktualizowała. */
  let labelDirty = false;

  function syncLabel() {
    if (typeof document !== 'undefined' && document.activeElement === el) {
      labelDirty = true;
      return;
    }
    el.setAttribute('aria-label', label());
    labelDirty = false;
  }

  function paint() {
    setText(valueEl, value === null ? DASH : metricValue(metric.id, value));
    setText(unitEl, unitText(metric, value));
    bar.update(value, zone);
    el.dataset.zone = zone;
    el.style.setProperty('--m5-zone', ZONE_COLOR[zone] || ZONE_COLOR.none);
    syncLabel();
  }

  el.addEventListener('blur', () => { if (labelDirty) syncLabel(); });

  el.addEventListener('click', () => {
    const detail = { metricId: metric.id };
    if (typeof onSelect === 'function') onSelect(metric.id);
    el.dispatchEvent(new CustomEvent('m5:metric', { detail, bubbles: true }));
  });

  function update(reading) {
    value = valueFrom(reading, metric.id);
    zone = zoneOf(metric, value, reading);
    paint();
  }

  function setSelected(next) {
    const flag = !!next;
    el.dataset.selected = String(flag);
    el.setAttribute('aria-pressed', String(flag));
  }

  setSelected(selected);
  paint();

  return {
    el,
    update,
    setSelected,
    destroy() { bar.destroy(); el.remove(); }
  };
}
