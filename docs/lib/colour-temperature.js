/* Temperatura barwowa (CCT) — przybliżenie McCamy'ego z oceną wiarygodności.
 *
 * Źródło wzoru: docs/v5/js/metrics.js (redakcja najnowsza), wcześniej
 * docs/v4/metrics.js — ten sam wielomian, ale bez warunku na Duv.
 * Ograniczenie należy do samej wielkości: „temperatura barwowa” ma sens tylko
 * dla światła leżącego blisko krzywej Plancka. Dla barwy nasyconej (kolorowy
 * ekran, dioda RGB) wielomian nadal zwraca liczbę — i ta liczba nic nie znaczy.
 * To przybliżenie z trzech szerokich kanałów kamery, nie pomiar kolorymetryczny.
 */

import { toLinear, toXYZ, chromaticityXY, chromaticityUV1960 } from './color.js';

/* Próg odległości od krzywej Plancka, powyżej którego odmawiamy podania
 * kelwinów. Wartość z v5. Rzędy wielkości: dobre światło białe mieści się
 * w |Duv| < 0.006, jawnie zielonkawa świetlówka ~0.01–0.02, a 0.05 to już
 * granica, za którą mówienie o „bieli” przestaje być uczciwe. */
const MAX_DUV = 0.05;

/* Zakres ważności wielomianu McCamy'ego. Poza nim (i tylko blisko krzywej
 * Plancka) sześcian rozbiega się — dla czystego niebieskiego schodzi do minus
 * dziesiątków milionów kelwinów. v4 obcinało taki wynik do 1500 K i zwracało
 * go razem z reliable:false; interfejs pokazywał wtedy wiarygodnie wyglądającą
 * liczbę, którą strefy malowały na zielono. Dlatego tutaj, jak w v5, zamiast
 * liczby zwracamy null. */
const MIN_KELVIN = 2000;
const MAX_KELVIN = 12500;

/* Współczynniki wielomianu Ohno (2011) opisującego krzywą Plancka w CIE 1960
 * UCS, w kolejności od wyrazu wolnego. Liczone schematem Hornera niżej. */
const OHNO_K = [
  -0.471106, 1.925865, -2.4243787, 1.5317403, -0.5179722, 0.0893944, -0.00616793
];

/* Duv — odległość chromatyczności od krzywej Plancka w przestrzeni CIE 1960
 * UCS, przybliżenie Ohno 2011. Znak dodatni znaczy „nad krzywą” (zielonkawe),
 * ujemny „pod krzywą” (różowawe).
 *
 * v5 liczyło u, v bezpośrednio z x, y wzorami u = 4x/(-2x+12y+3) i
 * v = 6y/(-2x+12y+3); chromaticityUV1960 z color.js robi to samo prosto z XYZ
 * (u = 4X/(X+15Y+3Z), v = 6Y/(X+15Y+3Z)) — to ta sama liczba, nie druga
 * definicja. Zwraca null, gdy chromatyczności nie da się wyznaczyć.
 */
function duvFrom(XYZ) {
  const uv = chromaticityUV1960(XYZ);
  if (!uv || !isFinite(uv.u) || !isFinite(uv.v)) return null;
  // Odległość od punktu (0.292, 0.24), wokół którego rozwinięty jest wielomian.
  const lfp = Math.hypot(uv.u - 0.292, uv.v - 0.24);
  if (lfp < 1e-9) return 0;
  const a = Math.acos(Math.min(1, Math.max(-1, (uv.u - 0.292) / lfp)));
  let lbb = 0;
  for (let i = OHNO_K.length - 1; i >= 0; i -= 1) lbb = lbb * a + OHNO_K[i];
  return lfp - lbb;
}

/* Temperatura barwowa z wartości 8-bitowych RGB.
 *
 * Zwraca { kelvin, reliable, duv }:
 *   kelvin   — liczba całkowita albo null, gdy wynik jest niewiarygodny;
 *              null NIGDY nie oznacza „zimno” ani „brak danych do wykresu”,
 *              tylko „tej wielkości nie da się tu uczciwie podać”,
 *   reliable — czy wynik przeszedł oba warunki (zakres i odległość od krzywej),
 *   duv      — sama odległość od krzywej Plancka albo null; podana osobno,
 *              żeby wywołujący mógł przyjąć własne kryterium zamiast naszego.
 *
 * Wiarygodność wymaga jednocześnie: CCT w zakresie 2000–12500 K (ważność
 * przybliżenia McCamy'ego) oraz |Duv| <= 0.05 (bliskość krzywej Plancka).
 * Drugi warunek doszedł w v5 i jest istotny: bez niego czyste niebieskie
 * światło ekranu dostawało sensownie wyglądającą liczbę kelwinów, która nie ma
 * fizycznego znaczenia, bo dla takiej barwy nie istnieje żadne ciało doskonale
 * czarne o podobnym wyglądzie.
 */
export function colourTemperature(r, g, b) {
  if (!isChannel(r) || !isChannel(g) || !isChannel(b)) {
    return { kelvin: null, reliable: false, duv: null };
  }

  // Fizyka wymaga światła liniowego — kelwiny liczone na wartościach z gammą
  // są ściągnięte ku środkowi skali (odwrotnie niż udział niebieskiego, który
  // gammę zachowuje celowo, bo jest tylko proporcją kanałów).
  const XYZ = toXYZ(toLinear(r), toLinear(g), toLinear(b));
  const xy = chromaticityXY(XYZ);
  if (!xy) return { kelvin: null, reliable: false, duv: null };

  const duv = duvFrom(XYZ);

  // Epicentrum chromatyczności krzywej Plancka, którego używa McCamy.
  const denom = xy.y - 0.1858;
  if (Math.abs(denom) < 1e-6) return { kelvin: null, reliable: false, duv };

  const n = (xy.x - 0.3320) / denom;
  const cct = -449 * n * n * n + 3525 * n * n - 6823.3 * n + 5520.33;

  const reliable =
    isFinite(cct) &&
    cct >= MIN_KELVIN &&
    cct <= MAX_KELVIN &&
    duv !== null &&
    Math.abs(duv) <= MAX_DUV;

  return {
    kelvin: reliable ? Math.round(cct) : null,
    reliable,
    duv
  };
}

/* Kanał musi być liczbą z zakresu bajtu 0..255. Górna granica ma znaczenie,
 * bo toLinear zaciska wejście: bez niej (300, 300, 300) dostawało wiarygodne
 * 6503 K, czyli pewną liczbę wyliczoną z danych, które nie są kanałem. */
function isChannel(v) {
  // Porównania odrzucają NaN i obie nieskończoności same z siebie, więc jeden
  // warunek zamyka wszystkie „to nie jest pomiar” naraz.
  return typeof v === 'number' && v >= 0 && v <= 255;
}
