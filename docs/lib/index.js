/* Jeden punkt wejścia biblioteki — re-eksport wszystkich wielkości i narzędzi.
 *
 * Plik nie liczy niczego sam: importuje nazwane eksporty z plików tematycznych
 * i wypuszcza je dalej, żeby aplikacja pisała `import { blueShare } from
 * './lib/index.js'` zamiast pamiętać, w którym pliku co leży. Lista jest
 * wypisana jawnie, a nie przez `export *`: dzięki temu widać tu całą powierzchnię
 * API, a literówka albo zniknięcie funkcji w pliku źródłowym wywala import od razu,
 * a nie dopiero przy wywołaniu.
 * Ograniczenie jest wspólne dla całej biblioteki: to arytmetyka na trzech szerokich
 * kanałach zwykłej kamery, a nie fotometria, kolorymetria ani badanie medyczne.
 * Kolejność sekcji idzie od podstaw (barwa) przez wielkości do warstwy opisowej.
 */

/* Podstawy barwy: gamma sRGB, przejście do CIE XYZ, chromatyczność, luminancja.
 * Na tym stoją colour-temperature.js, melanopic.js i frame.js. */
export {
  toLinear,
  toSRGB8,
  toXYZ,
  chromaticityXY,
  chromaticityUV1960,
  relativeLuminance,
  LUMA,
  SRGB_TO_XYZ
} from './color.js';

/* Wielkości liczone z jednej klatki. Każda zwraca null, gdy nie ma czego policzyć. */
export { blueShare } from './blue-share.js';
export { brightness } from './brightness.js';
export { colourTemperature } from './colour-temperature.js';
export { melanopicRatio, MELANOPIC_WEIGHTS } from './melanopic.js';

/* Wielkości potrzebujące więcej niż jednej klatki albo więcej niż jednego punktu:
 * migotanie liczy się z okna próbek w czasie, równomierność z komórek siatki. */
export { flicker } from './flicker.js';
export { uniformity } from './uniformity.js';

/* Warstwa oceny: jedna liczba złożona z pozostałych oraz podział na strefy.
 * Wagi w comfort.js i progi w zones.js są oceną redakcyjną projektu, nie normą. */
export { comfortIndex } from './comfort.js';
export { zoneFor, zonesFor, DEFAULT_THRESHOLDS } from './zones.js';

/* Katalog wielkości — nazwy, jednostki, zakresy, podział na darmowe i płatne. */
export { CATALOGUE, byId, FREE_IDS, PREMIUM_IDS } from './catalogue.js';

/* Obróbka klatki bez canvasu i bez DOM: kadrowanie, siatka, kalibracja,
 * okno próbek dla migotania. */
export {
  cropRect,
  sampleGrid,
  applyCalibration,
  createFlickerWindow
} from './frame.js';
