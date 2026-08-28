/* Obróbka pojedynczej klatki — bez canvasu, bez DOM, bez kamery.
 *
 * Matematyka przeniesiona z docs/v5/js/camera.js (sampleFrame) i docs/shared/engine.js
 * (takeSample; dawniej docs/v4/engine.js): kadrowanie środkowych 60 % obrazu,
 * uśrednianie kanałów w siatce N x N, luminancja komórek liczona w świetle
 * LINIOWYM, kalibracja nakładana na średnią przed metrykami oraz okno próbek
 * jasności dla migotania.
 * Wejściem jest obiekt zgodny z ImageData ({data, width, height}, RGBA po cztery
 * bajty na piksel), więc w Node wystarczy zwykła tablica — te same wzory da się
 * przetestować bez przeglądarki.
 * Ograniczenie: to jest arytmetyka na pikselach zwykłej kamery, po nieznanej
 * korekcie ekspozycji i balansu bieli. Nie jest to fotometria ani miara luksów.
 */

import { toLinear, LUMA } from './color.js';

/* Stałe kontraktu próbkowania — wartości z v5. */
const DEFAULT_FRACTION = 0.6;   // środkowe 60 % kadru: bez winiety, ramek i palców
const DEFAULT_GRID = 3;         // 3 x 3 karmi uniformity(); to samo, co v4 i v5
const MIN_FRACTION = 0.01;      // niżej kadr bywa pusty, a pusty kadr to brak pomiaru

/* Okno migotania: 32 próbki przy 10 Hz to 3,2 s — dość, by min/max się ustabilizowały,
 * i wciąż na tyle krótko, że wynik opisuje „teraz”. v4 trzymało 40 próbek przy 5 Hz
 * (8 s); przenosimy redakcję v5, bo krótsze okno wierniej opisuje bieżące światło. */
const DEFAULT_WINDOW = 32;

/* Górny kres okna. 4096 próbek to przy 10 Hz prawie siedem minut — dużo powyżej
 * czegokolwiek, co opisuje „teraz”. Kres nie jest ostrożnością na zapas: bez
 * niego createFlickerWindow(1e10) rzucało RangeError z new Array(), a rozmiar
 * rzędu miliardów alokował pamięć pod bufor, którego nikt nie zapełni. Funkcja
 * ma nie rzucać wyjątkiem — brak sensownego rozmiaru to rozmiar domyślny. */
const MAX_WINDOW = 4096;

/* toLinear() to pow() na kanał, a luminancja komórek potrzebuje jej dla każdego
 * piksela dziesięć razy na sekundę. 256 wpisów zamienia to w odczyt z tablicy.
 * To pamięć podręczna jedynego źródła prawdy z color.js, nie druga implementacja. */
const LIN = new Array(256);
for (let i = 0; i < 256; i += 1) LIN[i] = toLinear(i);

const LR = LUMA.r, LG = LUMA.g, LB = LUMA.b;

/* Bufory robocze sum komórek. Alokacja w pętli po pikselach jest tu zakazana,
 * a i tablice komórek nie mają powstawać dziesięć razy na sekundę: rosną tylko
 * wtedy, gdy urośnie siatka. Wnętrze jest niewidoczne z zewnątrz — sampleGrid
 * zeruje je na wejściu i nie zostawia w nich stanu między wywołaniami. */
let capacity = 0;
let sumR = null, sumG = null, sumB = null, sumL = null, count = null;

function ensureCapacity(cells) {
  if (cells <= capacity) return;
  sumR = new Float64Array(cells);
  sumG = new Float64Array(cells);
  sumB = new Float64Array(cells);
  sumL = new Float64Array(cells);
  count = new Int32Array(cells);
  capacity = cells;
}

function num(v) {
  return typeof v === 'number' && isFinite(v) ? v : null;
}

function clamp255(v) {
  return v < 0 ? 0 : (v > 255 ? 255 : v);
}

/* --------------------------------------------------------------------------
   Kadrowanie
   -------------------------------------------------------------------------- */

/* Prostokąt środkowej części klatki — dokładnie to, co v5 podaje do drawImage:
 * bok = wymiar * fraction, początek = (wymiar - bok) / 2. Różnica jest jedna:
 * tu wynik jest zaokrąglony do pełnych pikseli, bo indeksujemy tablicę bajtów,
 * a nie rysujemy na canvasie.
 *
 * fraction poza zakresem nie jest błędem: brak wartości i wartość niebędąca
 * liczbą znaczą „domyślne 60 %”, powyżej 1 bierzemy cały kadr, poniżej progu —
 * najmniejszy sensowny wycinek. Klatka o zerowych wymiarach nie ma czego
 * kadrować, więc zwracamy null. */
export function cropRect(width, height, fraction) {
  const w0 = num(width), h0 = num(height);
  if (w0 === null || h0 === null) return null;
  const iw = Math.floor(w0), ih = Math.floor(h0);
  if (iw < 1 || ih < 1) return null;

  let f = num(fraction);
  if (f === null) f = DEFAULT_FRACTION;
  if (f > 1) f = 1;
  if (f < MIN_FRACTION) f = MIN_FRACTION;

  // Co najmniej jeden piksel na bok: kadr o zerowej powierzchni dawałby dzielenie
  // przez zero, czyli NaN zamiast pomiaru.
  const w = Math.min(iw, Math.max(1, Math.round(iw * f)));
  const h = Math.min(ih, Math.max(1, Math.round(ih * f)));
  return { x: Math.floor((iw - w) / 2), y: Math.floor((ih - h) / 2), w, h };
}

/* Prostokąt podany z zewnątrz przycinamy do klatki. Kadr wystający poza obraz
 * czytałby bajty sąsiedniego wiersza albo koniec tablicy. */
function clampRect(rect, width, height) {
  const rx = num(rect.x), ry = num(rect.y), rw = num(rect.w), rh = num(rect.h);
  if (rx === null || ry === null || rw === null || rh === null) return null;
  const x = Math.min(Math.max(0, Math.round(rx)), width - 1);
  const y = Math.min(Math.max(0, Math.round(ry)), height - 1);
  const w = Math.min(Math.round(rw), width - x);
  const h = Math.min(Math.round(rh), height - y);
  if (w < 1 || h < 1) return null;
  return { x, y, w, h };
}

/* Brak pomiaru ma jeden kształt: średnia z null-ami i pusta lista komórek.
 * Świeży obiekt za każdym razem, bo wywołujący ma prawo dopisać sobie pole
 * i nie popsuć tym następnego wyniku. */
function noResult() {
  return { mean: { r: null, g: null, b: null }, cells: [] };
}

/* --------------------------------------------------------------------------
   Próbkowanie siatki
   -------------------------------------------------------------------------- */

/* Uśrednia kadrowany fragment klatki: średnie R, G, B całego wycinka oraz komórki
 * siatki N x N ze średnimi kanałów i luminancją.
 *
 * `image` jest zgodny z ImageData: {data, width, height}, RGBA po cztery bajty.
 * `crop` to liczba (udział boku klatki, domyślnie 0,6) albo gotowy prostokąt
 * {x, y, w, h}; `grid` to bok siatki (domyślnie 3).
 *
 * Różnica wobec v5: tam klatka trafiała najpierw na canvas 64 x 64 i dopiero
 * z niego szły piksele. Tutaj liczymy wprost z pikseli źródła — ta sama średnia,
 * bez pośrednictwa skalowania sprzętowego, więc bez canvasu i bez przeglądarki.
 *
 * Luminancję komórek uśredniamy w świetle LINIOWYM (LUMA z color.js po
 * linearizacji), bo średnia z wartości gammowanych pochlebiałaby każdej
 * nierównomiernej scenie. Kanały R, G, B zostają 8-bitowe i gammowane — takich
 * oczekują metryki.
 *
 * Czego to nie mierzy: nic tu nie jest luksami ani kandelami. To średnia jasność
 * pikseli po automatyce kamery — porównywalna sama ze sobą, nie z miernikiem.
 *
 * Gdy nie ma czego zmierzyć (brak obrazu, zerowe wymiary, dane krótsze niż jeden
 * wiersz), wynikiem jest mean z null-ami i pusta lista komórek — nigdy wyjątek,
 * nigdy zero udające pomiar. */
export function sampleGrid(image, options) {
  if (!image || typeof image !== 'object') return noResult();
  const data = image.data;
  if (!data || typeof data.length !== 'number') return noResult();

  const iw = num(image.width), ih = num(image.height);
  if (iw === null || ih === null) return noResult();
  const width = Math.floor(iw);
  let height = Math.floor(ih);
  if (width < 1 || height < 1) return noResult();

  // Bufor krótszy, niż zapowiadają wymiary, obcinamy do pełnych wierszy, które
  // naprawdę są. Ostatni, niepełny wiersz odpada: pół wiersza to nie pomiar.
  const rows = Math.floor(data.length / (4 * width));
  if (rows < 1) return noResult();
  if (rows < height) height = rows;

  const opts = options || {};
  const rect = (opts.crop && typeof opts.crop === 'object')
    ? clampRect(opts.crop, width, height)
    : cropRect(width, height, opts.crop);
  if (!rect) return noResult();

  const rw = rect.w, rh = rect.h;

  // Siatka gęstsza niż kadr dałaby komórki bez ani jednego piksela, czyli puste
  // miejsca w tablicy, którą uniformity() czyta jako liczby. Zamiast tego
  // zagęszczamy tylko do tylu komórek, ile jest pikseli na bok.
  let g = num(opts.grid);
  g = g === null ? DEFAULT_GRID : Math.floor(g);
  if (g < 1) g = 1;
  if (g > rw) g = rw;
  if (g > rh) g = rh;

  const cells = g * g;
  ensureCapacity(cells);
  for (let i = 0; i < cells; i += 1) {
    sumR[i] = 0; sumG[i] = 0; sumB[i] = 0; sumL[i] = 0; count[i] = 0;
  }

  let totR = 0, totG = 0, totB = 0;
  const pixels = rw * rh;
  const stride = width * 4;

  // Jedno przejście po pikselach kadru: sumy globalne i sumy komórek naraz, bez
  // alokacji w środku. Podział na komórki jest ten sam co w v5 — proporcja
  // pozycji w kadrze, obcięta do liczby całkowitej.
  for (let yy = 0; yy < rh; yy += 1) {
    const rowBase = (rect.y + yy) * stride + rect.x * 4;
    const rowCell = (((yy * g) / rh) | 0) * g;
    for (let xx = 0; xx < rw; xx += 1) {
      const p = rowBase + xx * 4;
      // `| 0` obcina do liczby całkowitej i zamienia undefined oraz NaN w zero;
      // zaciśnięcie pilnuje, żeby indeks tablicy LIN nigdy nie wypadł poza 0..255.
      let r = data[p] | 0; if (r < 0) r = 0; else if (r > 255) r = 255;
      let gc = data[p + 1] | 0; if (gc < 0) gc = 0; else if (gc > 255) gc = 255;
      let b = data[p + 2] | 0; if (b < 0) b = 0; else if (b > 255) b = 255;

      totR += r; totG += gc; totB += b;

      const c = rowCell + (((xx * g) / rw) | 0);
      sumR[c] += r; sumG[c] += gc; sumB[c] += b;
      sumL[c] += LR * LIN[r] + LG * LIN[gc] + LB * LIN[b];
      count[c] += 1;
    }
  }

  const out = new Array(cells);
  for (let i = 0; i < cells; i += 1) {
    const n = count[i];
    // Po zagęszczeniu siatki do rozmiaru kadru każda komórka ma piksele; gdyby
    // mimo to trafiła się pusta, jest nieznana, a nie czarna.
    out[i] = n
      ? { r: sumR[i] / n, g: sumG[i] / n, b: sumB[i] / n, luminance: sumL[i] / n }
      : { r: null, g: null, b: null, luminance: null };
  }

  return {
    mean: { r: totR / pixels, g: totG / pixels, b: totB / pixels },
    cells: out
  };
}

/* --------------------------------------------------------------------------
   Kalibracja
   -------------------------------------------------------------------------- */

/* Kalibracja białą kartką zdejmuje stałe przekłamanie kanałów czujnika. Poprawia
 * kelwiny i melanopic — dwie najbardziej przybliżone liczby w tym projekcie —
 * ale nie zamienia kamery w spektrometr.
 *
 * Mnożymy PRZED metrykami i zaciskamy do 0..255, bo wzmocnienie wypuszczone poza
 * zakres bajtu produkowałoby pewne siebie bzdury (shared/engine.js, takeSample —
 * dawniej v4/engine.js).
 * Sensowność samych wzmocnień (v4 przyjmowało tylko 0,25–4) jest sprawą warstwy
 * ustawień; tutaj wzmocnienie niebędące dodatnią liczbą znaczy po prostu brak
 * kalibracji, czyli 1.
 *
 * Luminancji komórek się NIE kalibruje: równomierność jest ilorazem dwóch z nich,
 * więc stałe wzmocnienie kanału i tak by się skróciło.
 *
 * Kanał nieznany (null) zostaje nieznany — wzmocnienie nie tworzy pomiaru. */
export function applyCalibration(colour, gains) {
  const c = colour || {};
  const k = gains || {};
  return {
    r: gainOne(c.r, k.r),
    g: gainOne(c.g, k.g),
    b: gainOne(c.b, k.b)
  };
}

function gainOne(value, gain) {
  const v = num(value);
  if (v === null) return null;
  const k = num(gain);
  return clamp255(v * (k !== null && k > 0 ? k : 1));
}

/* --------------------------------------------------------------------------
   Okno próbek migotania
   -------------------------------------------------------------------------- */

/* Migotanie to jedyna wielkość, która potrzebuje historii, a nie klatki: flicker()
 * liczy (max - min) / (max + min) z okna kolejnych próbek jasności.
 *
 * Bufor pierścieniowy zamiast push/shift, bo v5 przesuwa całą tablicę dziesięć
 * razy na sekundę; tutaj zapis to podmiana jednego pola.
 *
 * push(v)   — dopisuje próbkę; wartość niebędąca skończoną liczbą jest pomijana
 *             (zwraca false), bo brak pomiaru nie jest jasnością zero i zaniżałby
 *             minimum całego okna.
 * values()  — nowa tablica od najstarszej do najnowszej próbki, taka, jakiej
 *             oczekuje flicker().
 * full()    — czy okno zebrało już komplet próbek.
 * clear()   — kasuje okno; wołane po przerwie w próbkowaniu, bo próbki sprzed
 *             przerwy i po niej nie sąsiadują ze sobą, a zszyte razem zmyśliłyby
 *             amplitudę i częstotliwość (v5, onVisibility).
 *
 * Rozmiar spoza sensownego zakresu — brak, zero, ujemny, ale też absurdalnie
 * wielki (powyżej MAX_WINDOW) — znaczy domyślne 32. */
export function createFlickerWindow(size) {
  let n = num(size);
  n = n === null ? DEFAULT_WINDOW : Math.floor(n);
  if (n < 1 || n > MAX_WINDOW) n = DEFAULT_WINDOW;

  const buf = new Array(n);
  let head = 0;      // miejsce następnego zapisu
  let filled = 0;    // ile pól ma prawdziwą próbkę

  return {
    push(v) {
      const x = num(v);
      if (x === null) return false;
      buf[head] = x;
      head = (head + 1) % n;
      if (filled < n) filled += 1;
      return true;
    },
    values() {
      const out = new Array(filled);
      // Najstarsza próbka leży tuż za głową, gdy okno jest pełne; zanim się
      // zapełni — po prostu na początku bufora.
      const start = filled < n ? 0 : head;
      for (let i = 0; i < filled; i += 1) out[i] = buf[(start + i) % n];
      return out;
    },
    full() {
      return filled >= n;
    },
    clear() {
      head = 0;
      filled = 0;
    }
  };
}
