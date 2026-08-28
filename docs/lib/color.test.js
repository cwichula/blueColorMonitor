/* Testy przestrzeni barw — sprawdzają FIZYKĘ, nie zapis implementacji.
 *
 * Wartości odniesienia pochodzą z definicji sRGB (IEC 61966-2-1) i z tablic
 * CIE: biel D65 leży w (0,3127; 0,3290) w CIE 1931 i w (0,1978; 0,3122)
 * w CIE 1960 UCS, a jej luminancja względna z definicji równa się 1.
 * Żadna z tych liczb nie została odczytana z color.js.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  toLinear, toSRGB8, toXYZ, chromaticityXY, chromaticityUV1960,
  relativeLuminance, LUMA, SRGB_TO_XYZ
} from './color.js';

const close = (a, b, eps, msg) =>
  assert.ok(Math.abs(a - b) <= eps, `${msg ?? ''} — oczekiwano ${b} ±${eps}, otrzymano ${a}`);

/* Tolerancja dla wielkości, które z definicji równają się 1 dla bieli.
 * Nie jest dobrana pod wynik: wagi fotopowe sRGB są opublikowane z dokładnością
 * do siedmiu miejsc i sumują się do 1,0000001, więc luminancja bieli wychodzi
 * o 1e-7 za dużo. Zaciskanie tego do 1e-9 sprawdzałoby precyzję zapisu stałych,
 * a nie fizykę. */
const EPS_MACIERZ = 1e-6;

/* ---------------- toLinear ---------------- */

test('toLinear: czerń i biel to dokładne końce zakresu 0..1', () => {
  assert.equal(toLinear(0), 0);
  assert.equal(toLinear(255), 1);
});

test('toLinear: odcinek liniowy sRGB poniżej progu 0,04045', () => {
  // Dla c <= 0,04045 sRGB jest liniowe: L = c / 12,92.
  close(toLinear(10), (10 / 255) / 12.92, 1e-12, 'toLinear(10)');
});

test('toLinear: środek skali daje ~0,2158 (znana własność gammy sRGB)', () => {
  // Połowa wartości 8-bitowej to ~21,6 % światła — dlatego pomijanie gammy
  // ściąga każdą metrykę fotometryczną ku środkowi skali.
  close(toLinear(128), 0.2158, 5e-4, 'toLinear(128)');
});

test('toLinear: kanał poza zakresem jest zaciśnięty, nie ekstrapolowany', () => {
  assert.equal(toLinear(-50), 0);
  assert.equal(toLinear(300), 1);
  assert.equal(toLinear(1e9), 1);
});

test('toLinear: funkcja jest ściśle rosnąca', () => {
  for (let i = 1; i < 256; i += 1) {
    assert.ok(toLinear(i) > toLinear(i - 1), `nie rośnie przy ${i}`);
  }
});

/* ---------------- toSRGB8 ---------------- */

test('toSRGB8: końce zakresu', () => {
  assert.equal(toSRGB8(0), 0);
  assert.equal(toSRGB8(1), 255);
});

test('toSRGB8 jest odwrotnością toLinear dla wszystkich 256 wartości', () => {
  for (let i = 0; i < 256; i += 1) {
    assert.equal(toSRGB8(toLinear(i)), i, `obieg nie domyka się przy ${i}`);
  }
});

test('toSRGB8: wartość poza 0..1 zaciska się do bajtu', () => {
  assert.equal(toSRGB8(-1), 0);
  assert.equal(toSRGB8(5), 255);
});

/* ---------------- toXYZ ---------------- */

test('toXYZ: biel sRGB to punkt bieli D65 (0,9505; 1,0000; 1,0890)', () => {
  const w = toXYZ(1, 1, 1);
  close(w.X, 0.9505, 1e-3, 'X bieli');
  close(w.Y, 1.0000, 1e-6, 'Y bieli');
  close(w.Z, 1.0890, 1e-3, 'Z bieli');
});

test('toXYZ: czerń to zero we wszystkich składowych', () => {
  const k = toXYZ(0, 0, 0);
  assert.equal(k.X, 0);
  assert.equal(k.Y, 0);
  assert.equal(k.Z, 0);
});

test('toXYZ: przekształcenie jest liniowe (addytywne i jednorodne)', () => {
  const a = toXYZ(0.3, 0.0, 0.0);
  const b = toXYZ(0.0, 0.4, 0.0);
  const ab = toXYZ(0.3, 0.4, 0.0);
  close(a.X + b.X, ab.X, 1e-12, 'addytywność X');
  close(a.Y + b.Y, ab.Y, 1e-12, 'addytywność Y');
  close(a.Z + b.Z, ab.Z, 1e-12, 'addytywność Z');
  const half = toXYZ(0.15, 0, 0);
  close(half.X * 2, a.X, 1e-12, 'jednorodność');
});

/* Macierz może być zapisana jako trzy wiersze albo jako dziewięć liczb pod rząd
 * — test sprawdza jej ZAWARTOŚĆ, nie sposób zagnieżdżenia. */
function wiersze(m) {
  assert.ok(Array.isArray(m), 'SRGB_TO_XYZ ma być tablicą');
  if (m.length === 9) return [m.slice(0, 3), m.slice(3, 6), m.slice(6, 9)];
  assert.equal(m.length, 3, 'macierz ma mieć trzy wiersze (albo dziewięć liczb)');
  for (const row of m) assert.equal(row.length, 3, 'każdy wiersz ma trzy kolumny');
  return m;
}

test('SRGB_TO_XYZ: macierz 3x3 zgodna z toXYZ', () => {
  const m = wiersze(SRGB_TO_XYZ);
  const r = 0.2, g = 0.5, b = 0.7;
  const xyz = toXYZ(r, g, b);
  close(m[0][0] * r + m[0][1] * g + m[0][2] * b, xyz.X, 1e-12, 'wiersz X');
  close(m[1][0] * r + m[1][1] * g + m[1][2] * b, xyz.Y, 1e-12, 'wiersz Y');
  close(m[2][0] * r + m[2][1] * g + m[2][2] * b, xyz.Z, 1e-12, 'wiersz Z');
});

test('SRGB_TO_XYZ: wiersz Y sumuje się do 1 (definicja luminancji względnej)', () => {
  const row = wiersze(SRGB_TO_XYZ)[1];
  close(row[0] + row[1] + row[2], 1, 1e-6, 'suma wiersza Y');
});

test('SRGB_TO_XYZ: wiersz Y to te same wagi co LUMA', () => {
  const row = wiersze(SRGB_TO_XYZ)[1];
  close(row[0], LUMA.r, 1e-12, 'waga R');
  close(row[1], LUMA.g, 1e-12, 'waga G');
  close(row[2], LUMA.b, 1e-12, 'waga B');
});

/* ---------------- chromatyczność ---------------- */

test('chromaticityXY: biel D65 leży w (0,3127; 0,3290)', () => {
  const xy = chromaticityXY(toXYZ(1, 1, 1));
  close(xy.x, 0.3127, 1e-3, 'x bieli D65');
  close(xy.y, 0.3290, 1e-3, 'y bieli D65');
});

test('chromaticityXY: chromatyczność nie zależy od jasności', () => {
  const jasna = chromaticityXY(toXYZ(1, 1, 1));
  const ciemna = chromaticityXY(toXYZ(0.01, 0.01, 0.01));
  close(ciemna.x, jasna.x, 1e-9, 'x niezależne od skali');
  close(ciemna.y, jasna.y, 1e-9, 'y niezależne od skali');
});

test('chromaticityXY: czerń nie ma chromatyczności (null, nie 0)', () => {
  assert.equal(chromaticityXY(toXYZ(0, 0, 0)), null);
  assert.equal(chromaticityXY({ X: 0, Y: 0, Z: 0 }), null);
});

test('chromaticityXY: brak danych zwraca null, a nie wyjątek', () => {
  assert.equal(chromaticityXY(null), null);
  assert.equal(chromaticityXY({ X: NaN, Y: 1, Z: 1 }), null);
});

test('chromaticityUV1960: biel D65 leży w (0,1978; 0,3122)', () => {
  const uv = chromaticityUV1960(toXYZ(1, 1, 1));
  close(uv.u, 0.1978, 1e-3, 'u bieli D65');
  close(uv.v, 0.3122, 1e-3, 'v bieli D65');
});

test('chromaticityUV1960 zgadza się z przeliczeniem z x, y', () => {
  // u = 4x / (-2x + 12y + 3), v = 6y / (-2x + 12y + 3) — ta sama przestrzeń,
  // liczona inną drogą, więc musi dać tę samą liczbę.
  const XYZ = toXYZ(toLinear(200), toLinear(160), toLinear(90));
  const { x, y } = chromaticityXY(XYZ);
  const d = -2 * x + 12 * y + 3;
  const uv = chromaticityUV1960(XYZ);
  close(uv.u, (4 * x) / d, 1e-12, 'u');
  close(uv.v, (6 * y) / d, 1e-12, 'v');
});

test('chromaticityUV1960: czerń i śmieci dają null', () => {
  assert.equal(chromaticityUV1960(toXYZ(0, 0, 0)), null);
  assert.equal(chromaticityUV1960(null), null);
});

/* ---------------- luminancja względna ---------------- */

test('relativeLuminance: biel = 1, czerń = 0', () => {
  close(relativeLuminance(255, 255, 255), 1, EPS_MACIERZ, 'luminancja bieli');
  assert.equal(relativeLuminance(0, 0, 0), 0);
});

test('relativeLuminance: zieleń jest najjaśniejsza, niebieski najciemniejszy', () => {
  // Krzywa czułości oka V(λ) ma szczyt przy ~555 nm — stąd kolejność.
  const r = relativeLuminance(255, 0, 0);
  const g = relativeLuminance(0, 255, 0);
  const b = relativeLuminance(0, 0, 255);
  assert.ok(g > r && r > b, `oczekiwano G > R > B, jest G=${g} R=${r} B=${b}`);
  close(g, 0.7152, 1e-3, 'luminancja czystej zieleni');
  close(r, 0.2127, 1e-3, 'luminancja czystej czerwieni');
  close(b, 0.0722, 1e-3, 'luminancja czystego niebieskiego');
});

test('relativeLuminance: prymarne sumują się do bieli (addytywność)', () => {
  const suma = relativeLuminance(255, 0, 0) + relativeLuminance(0, 255, 0) + relativeLuminance(0, 0, 255);
  close(suma, 1, EPS_MACIERZ, 'suma luminancji prymarnych');
});

test('relativeLuminance: 50 % w bajtach to ~21,6 % światła, nie 50 %', () => {
  close(relativeLuminance(128, 128, 128), 0.2158, 5e-4, 'szarość 128');
});

test('relativeLuminance: kanał poza zakresem jest zaciśnięty', () => {
  close(relativeLuminance(300, 300, 300), 1, EPS_MACIERZ, 'przesterowanie');
  assert.equal(relativeLuminance(-5, -5, -5), 0);
});

test('LUMA: wagi fotopowe sumują się do 1 i mają kolejność G > R > B', () => {
  close(LUMA.r + LUMA.g + LUMA.b, 1, 1e-6, 'suma wag');
  assert.ok(LUMA.g > LUMA.r && LUMA.r > LUMA.b, 'kolejność wag fotopowych');
});

/* ---------------- ciągłość stałych ---------------- */

test('stałe macierzy są dokładnie tymi, których używa v5', () => {
  // To NIE jest test fizyki: obie używane w praktyce macierze sRGB przechodzą
  // wszystkie testy powyżej, bo ich tolerancje opisują własności, a nie zapis.
  // Chodzi o ciągłość liczb pokazywanych użytkownikowi — macierz wysokiej
  // precyzji (Lindbloom) przesuwa raportowaną temperaturę bieli o 2 K
  // (6503 -> 6505). Wzory przeniesiono z docs/v5/js/metrics.js, ale tamten plik
  // jest dziś tylko cienką warstwą adaptacyjną nad docs/lib i nie trzyma już
  // żadnej z tych stałych — jedyny ich egzemplarz jest w color.js i to ten test
  // go pilnuje.
  const m = wiersze(SRGB_TO_XYZ);
  const v5 = [
    [0.4124564, 0.3575761, 0.1804375],
    [0.2126729, 0.7151522, 0.0721750],
    [0.0193339, 0.1191920, 0.9503041]
  ];
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) close(m[i][j], v5[i][j], 1e-12, `wyraz [${i}][${j}]`);
  }
  close(LUMA.r, 0.2126729, 1e-12, 'LUMA.r');
  close(LUMA.g, 0.7151522, 1e-12, 'LUMA.g');
  close(LUMA.b, 0.0721750, 1e-12, 'LUMA.b');
});

/* Prymitywy barwy też podlegają zasadzie „brak pomiaru to null, nigdy NaN”.
   Wcześniej toLinear() i toXYZ() były jedynymi eksportami, które wypuszczały
   NaN i Infinity na zewnątrz — a taka wartość przechodzi przez całą dalszą
   arytmetykę i ujawnia się dopiero na wskaźniku, daleko od przyczyny. */
test('toLinear zwraca null dla wejścia, które nie jest skończoną liczbą', () => {
  for (const junk of [undefined, null, NaN, Infinity, -Infinity, '128', {}, []]) {
    assert.equal(toLinear(junk), null, `toLinear(${String(junk)})`);
  }
  // Poprawne kanały działają bez zmian — łącznie z krańcami zakresu.
  assert.equal(toLinear(0), 0);
  close(toLinear(255), 1, 1e-12, 'toLinear(255)');
});

test('toXYZ zwraca null zamiast zamieniać uszkodzony kanał w czerń', () => {
  for (const junk of [undefined, null, NaN, Infinity, '0.5', {}]) {
    assert.equal(toXYZ(junk, 0.5, 0.5), null, `toXYZ(${String(junk)}, …)`);
    assert.equal(toXYZ(0.5, junk, 0.5), null, `toXYZ(…, ${String(junk)}, …)`);
    assert.equal(toXYZ(0.5, 0.5, junk), null, `toXYZ(…, ${String(junk)})`);
  }
  // Null z toXYZ() musi przejść przez chromatyczność jako null, a nie wyjątek.
  assert.equal(chromaticityXY(toXYZ(NaN, 1, 1)), null);
  assert.equal(chromaticityUV1960(toXYZ(NaN, 1, 1)), null);
});
