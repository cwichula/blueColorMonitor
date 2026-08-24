/* Podstawy barwy — gamma sRGB, przejście do CIE XYZ, chromatyczność, luminancja.
 *
 * Źródło wzorów i WSZYSTKICH stałych: docs/v5/js/metrics.js (toLinear, toXYZ)
 * oraz duvFromXy z tego samego pliku, z którego pochodzi przeliczenie na CIE
 * 1960 UCS. Macierz i wagi fotopowe są przepisane co do cyfry, bo na nich stoją
 * kelwiny i melanopic — inna redakcja tych samych stałych przesuwa raportowaną
 * temperaturę bieli o ~2 K, czyli o liczbę widoczną na wskaźniku.
 * Ograniczenie: to arytmetyka trzech szerokich kanałów kamery po nieznanej
 * korekcie balansu bieli, a nie kolorymetria. Wynik wolno czytać jako
 * przybliżenie, nigdy jako pomiar.
 */

/* Macierz sRGB (liniowe, biel odniesienia D65) -> CIE XYZ. Wiersz Y to wagi
 * fotopowe: sumują się do 1,0000001, bo tyle daje opublikowany zapis do siedmiu
 * miejsc — nie zaokrąglamy tego „ładniej”, żeby liczby zgadzały się z v5. */
export const SRGB_TO_XYZ = [
  [0.4124564, 0.3575761, 0.1804375],
  [0.2126729, 0.7151522, 0.0721750],
  [0.0193339, 0.1191920, 0.9503041]
];

/* Wagi luminancji względnej — dokładnie wiersz Y macierzy powyżej, wypisany
 * osobno, bo melanopic.js i frame.js potrzebują samych wag, a nie całej
 * macierzy. Kolejność G > R > B wynika z czułości oka ze szczytem ~555 nm. */
export const LUMA = { r: SRGB_TO_XYZ[1][0], g: SRGB_TO_XYZ[1][1], b: SRGB_TO_XYZ[1][2] };

/* Próg, poniżej którego jasność jest nierozróżnialna od zera. Ta sama wartość
 * co w v5 (`sum <= 1e-9`): niżej chromatyczność to iloraz dwóch szumów. */
const EPS = 1e-9;

/* Usunięcie gammy sRGB (IEC 61966-2-1). Wszystko, co poniżej waży energię,
 * potrzebuje światła LINIOWEGO; pominięcie tego kroku to najczęstszy błąd
 * w kodzie liczącym „temperaturę barwową ze zdjęcia” — ściąga każdy wynik ku
 * środkowi skali. Kanał spoza 0..255 jest zaciskany, a nie ekstrapolowany:
 * poza bajtem funkcja przejścia sRGB nie jest zdefiniowana. Zapis wzięty
 * wprost z v5. */
export function toLinear(channel8) {
  // Wejście spoza liczb daje null, a nie NaN. Zaciśnięcie do 0..1 samo tego nie
  // załatwia: Math.max(0, NaN) to nadal NaN, a taki NaN przechodzi przez całą
  // dalszą arytmetykę i wychodzi dopiero na wskaźniku, daleko od przyczyny.
  if (typeof channel8 !== 'number' || !isFinite(channel8)) return null;
  const c = Math.min(1, Math.max(0, channel8 / 255));
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/* Odwrotność toLinear: światło liniowe -> bajt sRGB. W samych pomiarach
 * nieużywana — jest po to, żeby dało się sprawdzić, że linearyzacja domyka się
 * na wszystkich 256 wartościach, i żeby narzędzia mogły pokazać barwę wyliczoną
 * w przestrzeni liniowej. */
export function toSRGB8(linear) {
  const l = typeof linear === 'number' && isFinite(linear)
    ? Math.min(1, Math.max(0, linear))
    : 0;
  const c = l <= 0.0031308 ? l * 12.92 : 1.055 * Math.pow(l, 1 / 2.4) - 0.055;
  return Math.round(c * 255);
}

/* sRGB (liniowe) -> CIE XYZ, biel odniesienia D65. */
export function toXYZ(rLin, gLin, bLin) {
  // Null z toLinear() ma się propagować jako null, a nie zamienić w zero:
  // null * liczba to 0, więc bez tego warunku uszkodzony kanał udawałby czerń.
  if (typeof rLin !== 'number' || !isFinite(rLin)) return null;
  if (typeof gLin !== 'number' || !isFinite(gLin)) return null;
  if (typeof bLin !== 'number' || !isFinite(bLin)) return null;
  const m = SRGB_TO_XYZ;
  return {
    X: m[0][0] * rLin + m[0][1] * gLin + m[0][2] * bLin,
    Y: m[1][0] * rLin + m[1][1] * gLin + m[1][2] * bLin,
    Z: m[2][0] * rLin + m[2][1] * gLin + m[2][2] * bLin
  };
}

/* Suma składowych, albo null, gdy nie ma z czego liczyć chromatyczności.
 * Czerń nie ma barwy — i to jest brak pomiaru, a nie barwa o współrzędnych 0. */
function tristimulusSum(XYZ) {
  if (!XYZ || typeof XYZ !== 'object') return null;
  const { X, Y, Z } = XYZ;
  if (typeof X !== 'number' || typeof Y !== 'number' || typeof Z !== 'number') return null;
  const sum = X + Y + Z;
  if (!isFinite(sum) || sum <= EPS) return null;
  return sum;
}

/* Chromatyczność CIE 1931 (x, y) — barwa w oderwaniu od jasności. Na niej stoi
 * wielomian McCamy'ego w colour-temperature.js. Zwraca null dla czerni i dla
 * danych, które nie są trójchromatycznymi składowymi. */
export function chromaticityXY(XYZ) {
  const sum = tristimulusSum(XYZ);
  if (sum === null) return null;
  return { x: XYZ.X / sum, y: XYZ.Y / sum };
}

/* Chromatyczność CIE 1960 UCS (u, v) — przestrzeń, w której liczy się Duv,
 * czyli odległość od krzywej Plancka. v5 dochodziło tu okrężnie przez x, y
 * (u = 4x / (-2x + 12y + 3)); liczone wprost z XYZ jest to ta sama liczba,
 * bo mianownik X + 15Y + 3Z to po prostu ten sam wzór przemnożony przez sumę
 * składowych. Nie jest to druga definicja, tylko krótsza droga do niej. */
export function chromaticityUV1960(XYZ) {
  if (tristimulusSum(XYZ) === null) return null;
  const d = XYZ.X + 15 * XYZ.Y + 3 * XYZ.Z;
  if (!isFinite(d) || Math.abs(d) < EPS) return null;
  return { u: (4 * XYZ.X) / d, v: (6 * XYZ.Y) / d };
}

/* Luminancja względna z wartości 8-bitowych: 0 dla czerni, 1 dla bieli.
 * To wielkość fotometrycznie poprawna — w przeciwieństwie do brightness(),
 * która jest zwykłą średnią kanałów z gammą i służy tylko do porównań ze sobą.
 * Wejście niebędące kanałem daje null, a nie NaN: brak pomiaru ma być widoczny. */
export function relativeLuminance(r, g, b) {
  if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') return null;
  if (!isFinite(r) || !isFinite(g) || !isFinite(b)) return null;
  return LUMA.r * toLinear(r) + LUMA.g * toLinear(g) + LUMA.b * toLinear(b);
}
