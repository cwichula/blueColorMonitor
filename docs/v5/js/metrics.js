/* Monitor Światła v5 — matematyka pomiaru (bez DOM).
 *
 * Każda funkcja jest czysta i operuje wyłącznie na liczbach, żeby dało się ją
 * sprawdzić w Node, bez kamery i bez przeglądarki. Warstwa interfejsu nie liczy
 * niczego na pikselach — pyta ten moduł.
 *
 * Uczciwość, która należy do kodu, a nie tylko do dokumentacji: kamera telefonu
 * to urządzenie trójkanałowe z nieznanym, samoczynnie korygowanym balansem
 * bieli. Nie mierzy widma. Każda wielkość poniżej jest albo proporcją, którą
 * kamera naprawdę widzi (udział niebieskiego, jasność, migotanie,
 * równomierność), albo jawnie oznaczonym przybliżeniem wyliczonym z podstaw
 * sRGB (temperatura barwowa, współczynnik melanopiczny). Żadna z nich nie jest
 * pomiarem fotometrycznym ani wynikiem medycznym.
 */

/* ------------------------------------------------------------------
   Przestrzeń barw
   ------------------------------------------------------------------ */

/* sRGB przechowuje wartości zakodowane gamma. Wszystkie obliczenia fizyczne
 * poniżej potrzebują światła liniowego, więc najpierw odwracamy funkcję
 * przejścia. Pominięcie tego kroku to najczęstszy błąd w kodzie liczącym
 * „temperaturę barwową ze zdjęcia” — ściąga każdy wynik ku środkowi skali. */
export function toLinear(c8) {
  const c = Math.min(1, Math.max(0, c8 / 255));
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/* sRGB (liniowe) -> CIE XYZ, biel odniesienia D65. */
export function toXYZ(rLin, gLin, bLin) {
  return {
    X: 0.4124564 * rLin + 0.3575761 * gLin + 0.1804375 * bLin,
    Y: 0.2126729 * rLin + 0.7151522 * gLin + 0.0721750 * bLin,
    Z: 0.0193339 * rLin + 0.1191920 * gLin + 0.9503041 * bLin
  };
}

/* ------------------------------------------------------------------
   Wielkość 1 — udział niebieskiego
   ------------------------------------------------------------------ */

/* Udział niebieskiego w sumie energii kanałów. Celowo liczony na wartościach
 * gamma, a nie liniowych: to ta sama liczba, którą raportowały poprzednie
 * wersje aplikacji, a zmiana definicji po cichu unieważniłaby każdy próg, który
 * użytkownik już sobie dostroił. */
export function blueShare(r, g, b) {
  const sum = r + g + b;
  if (sum <= 0) return 0;
  return (b / sum) * 100;
}

/* ------------------------------------------------------------------
   Wielkość 2 — jasność sceny
   ------------------------------------------------------------------ */

/* Średnia wartość kanałów w procentach. Względny wskaźnik ekspozycji, nie
 * luksy: automatyka ekspozycji kamery przesuwa się pod spodem i nie ma
 * punktu odniesienia. */
export function brightness(r, g, b) {
  return ((r + g + b) / 3 / 255) * 100;
}

/* ------------------------------------------------------------------
   Wielkość 3 — temperatura barwowa (CCT)
   ------------------------------------------------------------------ */

/* Odległość chromatyczności od krzywej Plancka (Duv, przybliżenie Ohno 2011
 * w przestrzeni CIE 1960 UCS). Temperatura barwowa ma sens tylko dla światła
 * leżącego blisko tej krzywej — dla nasyconej barwy (ekran w kolorze, dioda
 * RGB) wielomian McCamy'ego zwraca liczbę, która nic nie znaczy. */
const MAX_DUV = 0.05;

function duvFromXy(x, y) {
  const d = -2 * x + 12 * y + 3;
  if (Math.abs(d) < 1e-9) return Infinity;
  const u = (4 * x) / d;
  const v = (6 * y) / d;
  const lfp = Math.hypot(u - 0.292, v - 0.24);
  if (lfp < 1e-9) return 0;
  const a = Math.acos(Math.min(1, Math.max(-1, (u - 0.292) / lfp)));
  const k = [-0.471106, 1.925865, -2.4243787, 1.5317403, -0.5179722, 0.0893944, -0.00616793];
  let lbb = 0;
  for (let i = k.length - 1; i >= 0; i -= 1) lbb = lbb * a + k[i];
  return lfp - lbb;
}

/* Sześcienne przybliżenie McCamy'ego, liczące CCT z chromatyczności CIE 1931.
 * Ważne mniej więcej między 2000 K a 12500 K i tylko blisko krzywej Plancka;
 * poza tym wielomian rozbiega się (dla czystego niebieskiego schodzi do minus
 * dziesiątków milionów kelwinów). Obcięcie takiego wyniku do 1500 K zamieniało
 * najgorsze możliwe światło w wyglądającą wiarygodnie liczbę, którą strefy
 * malowały na zielono — dlatego zamiast liczby zwracamy tu pauzę. */
export function colourTemperature(r, g, b) {
  const XYZ = toXYZ(toLinear(r), toLinear(g), toLinear(b));
  const sum = XYZ.X + XYZ.Y + XYZ.Z;
  if (sum <= 1e-9) return { kelvin: null, reliable: false };
  const x = XYZ.X / sum;
  const y = XYZ.Y / sum;
  // Epicentrum chromatyczności krzywej Plancka, którego używa McCamy.
  const denom = y - 0.1858;
  if (Math.abs(denom) < 1e-6) return { kelvin: null, reliable: false };
  const n = (x - 0.3320) / denom;
  const cct = -449 * n * n * n + 3525 * n * n - 6823.3 * n + 5520.33;
  const reliable = cct >= 2000 && cct <= 12500 && Math.abs(duvFromXy(x, y)) <= MAX_DUV;
  return {
    kelvin: reliable ? Math.round(cct) : null,
    reliable
  };
}

/* ------------------------------------------------------------------
   Wielkość 4 — współczynnik melanopiczny
   ------------------------------------------------------------------ */

/* Przybliżony stosunek melanopiczny do fotopowego („jak mocno to światło mówi
 * do zegara biologicznego na jednostkę widzianej jasności”).
 *
 * Prawdziwa wielkość to całka widma ze spektrum działania melanopsyny
 * (szczyt ~490 nm). Kamera ma trzy szerokie kanały, więc ważymy podstawy sRGB
 * skutecznością melanopiczną przy ich przybliżonych długościach dominujących
 * (R 612 nm, G 549 nm, B 465 nm) i normalizujemy tak, by biel D65 o równej
 * energii dawała 1,00. Kierunek zmian ten wskaźnik oddaje z pełną pewnością,
 * wartość bezwzględną — z żadną, i dokładnie tak opisuje go interfejs. */
const MEL_R = 0.0016, MEL_G = 0.3110, MEL_B = 0.8460;
const MEL_WHITE = MEL_R + MEL_G + MEL_B;              // suma melanopiczna przy RGB = 1,1,1
const LUM_WHITE = 0.2126729 + 0.7151522 + 0.0721750;  // suma fotopowa, = 1

export function melanopicRatio(r, g, b) {
  const rl = toLinear(r), gl = toLinear(g), bl = toLinear(b);
  const lum = 0.2126729 * rl + 0.7151522 * gl + 0.0721750 * bl;
  if (lum <= 1e-9) return 0;
  const mel = MEL_R * rl + MEL_G * gl + MEL_B * bl;
  // Normalizacja tak, by neutralna biel dawała 1,00, a nie 1,16.
  return (mel / lum) * (LUM_WHITE / MEL_WHITE);
}

/* ------------------------------------------------------------------
   Wielkość 5 — migotanie
   ------------------------------------------------------------------ */

/* Procent migotania w oknie próbek jasności:
 *     (max - min) / (max + min) * 100
 * standardowa definicja IES. Ekrany i tanie sterowniki LED ściemniają
 * pulsowaniem; to pulsowanie jest niewidoczne, ale udokumentowano je jako
 * przyczynę zmęczenia oczu i bólów głowy — i jest jedyną tutejszą własnością,
 * którą kamera wykrywa naprawdę dobrze.
 *
 * Twarde ograniczenie, które trzeba powiedzieć wprost: próbkowanie z
 * częstotliwością S Hz pozwala zobaczyć modulację tylko poniżej S/2 Hz
 * (Nyquist). Migotanie sieciowe 100/120 Hz leży daleko powyżej i ulegnie
 * aliasingowi. `withinRange` mówi, czy oszacowaniu częstotliwości można w ogóle
 * ufać, żeby interfejs nigdy nie przedstawił aliasu jako odczytu. */
export function flicker(samples, sampleHz) {
  if (!samples || samples.length < 8) return { percent: null, hz: null, withinRange: false };
  let min = Infinity, max = -Infinity, sum = 0;
  for (let i = 0; i < samples.length; i += 1) {
    const v = samples[i];
    if (v < min) min = v;
    if (v > max) max = v;
    sum += v;
  }
  const span = max + min;
  const percent = span <= 1e-9 ? 0 : ((max - min) / span) * 100;

  // Zliczanie przejść przez średnią daje zgrubną częstotliwość dominującą.
  const mean = sum / samples.length;
  let crossings = 0;
  for (let j = 1; j < samples.length; j += 1) {
    const a = samples[j - 1] - mean, c = samples[j] - mean;
    if ((a < 0 && c >= 0) || (a >= 0 && c < 0)) crossings += 1;
  }
  const seconds = samples.length / (sampleHz || 1);
  const hz = seconds > 0 ? (crossings / 2) / seconds : null;
  const nyquist = (sampleHz || 0) / 2;

  // Sygnał płaski nie ma częstotliwości: przejścia przez średnią są wtedy tylko
  // szumem czujnika, a podanie ich w hercach przebrałoby szum za pomiar.
  const hasSignal = percent >= 0.5;
  return {
    percent,
    hz: hasSignal ? hz : null,
    // Ufamy częstotliwości tylko wtedy, gdy leży wygodnie poniżej granicy
    // próbkowania. Cokolwiek blisko Nyquista jest nieodróżnialne od aliasu
    // czegoś szybszego.
    withinRange: hasSignal && hz !== null && hz > 0.2 && hz < nyquist * 0.8
  };
}

/* ------------------------------------------------------------------
   Wielkość 6 — równomierność
   ------------------------------------------------------------------ */

/* Stosunek najciemniejszej do najjaśniejszej komórki siatki w kadrze, w
 * procentach. Niska równomierność na ekranie oznacza przeświecanie
 * podświetlenia albo odblask; na biurku — źle ustawione światło. 100 % to
 * idealnie równo. */
export function uniformity(cellLuminances) {
  if (!cellLuminances || cellLuminances.length < 2) return null;
  let min = Infinity, max = -Infinity;
  for (let i = 0; i < cellLuminances.length; i += 1) {
    const v = cellLuminances[i];
    if (v < min) min = v;
    if (v > max) max = v;
  }
  if (max <= 1e-9) return null;
  return (min / max) * 100;
}

/* ------------------------------------------------------------------
   Wielkość 7 — indeks komfortu wzrokowego
   ------------------------------------------------------------------ */

/* Jedna ocena 0–100, bo „sześć liczb” nie jest odpowiedzią na pytanie „czy to
 * światło jest teraz dla mnie złe”. Każdy składnik to kara w punktach; wagi są
 * jawnie deklarowaną oceną redakcyjną, a nie normą — interfejs to mówi i
 * pokazuje rozbicie, żeby użytkownik mógł się z nim nie zgodzić.
 *
 * Cokolwiek, czego czujnik nie zmierzył, nie wnosi żadnej kary, więc
 * niedostępna wielkość nigdy nie może udawać dobrego wyniku. */
export function comfortIndex(input) {
  const penalties = [];
  let score = 100;
  // Liczymy WEJŚCIA, nie kary: brak pomiaru i pomiar bez kar to dwie różne
  // rzeczy. Bez tego rozróżnienia comfortIndex({}) zwracałby 100/100 za nic,
  // a idealne światło (kara ułamkowa) udawałoby brak pomiaru.
  let inputs = 0;

  // Kara mniejsza niż pół punktu nie trafia na listę — i dlatego nie schodzi
  // też z wyniku. Inaczej rozbicie pokazane w interfejsie nie sumowałoby się
  // do liczby obok niego.
  const apply = (points, id, labelPL) => {
    if (points > 0.5) {
      penalties.push({ id, labelPL, points });
      score -= points;
    }
  };

  if (typeof input.melanopic === 'number' && isFinite(input.melanopic)) {
    inputs += 1;
    // 1,0 to neutralna biel dzienna. Wieczorna ekspozycja powyżej tej wartości
    // to tutaj czynnik najlepiej udokumentowany, więc waży najwięcej.
    const over = Math.max(0, input.melanopic - 0.75);
    apply(Math.min(35, over * 55), 'melanopic', 'Wpływ na rytm dobowy');
  }

  if (typeof input.kelvin === 'number' && isFinite(input.kelvin)) {
    inputs += 1;
    // Chłodne światło późną porą to klasyczna skarga; ciepłego nigdy nie karzemy.
    const overK = Math.max(0, input.kelvin - 4000);
    apply(Math.min(25, (overK / 3000) * 25), 'kelvin', 'Chłodna barwa światła');
  }

  if (typeof input.flickerPercent === 'number' && isFinite(input.flickerPercent)) {
    inputs += 1;
    // Poniżej ~5 % uznaje się powszechnie za niezauważalne; powyżej 30 % jest źle.
    const overF = Math.max(0, input.flickerPercent - 5);
    apply(Math.min(25, (overF / 25) * 25), 'flicker', 'Migotanie');
  }

  if (typeof input.uniformity === 'number' && isFinite(input.uniformity)) {
    inputs += 1;
    const underU = Math.max(0, 60 - input.uniformity);
    apply(Math.min(15, (underU / 60) * 15), 'uniformity', 'Nierównomierne oświetlenie');
  }

  penalties.sort((a, b) => b.points - a.points);
  return {
    score: Math.round(Math.min(100, Math.max(0, score))),
    penalties,
    measured: inputs > 0
  };
}

/* ------------------------------------------------------------------
   Strefy
   ------------------------------------------------------------------ */

/* Każda wielkość trafia w te same trzy strefy, dzięki czemu jeden język koloru
 * obsługuje cały interfejs. `invert` jest dla wielkości, w których WIĘCEJ
 * znaczy lepiej. Nazwy stref są kanoniczne: pasują do tokenów `--zone-good/
 * -warn/-crit` i do atrybutu `data-zone`. */
export function zoneFor(value, warn, crit, invert) {
  if (value === null || value === undefined || !isFinite(value)) return null;
  if (invert) {
    if (value <= crit) return 'crit';
    if (value <= warn) return 'warn';
    return 'good';
  }
  if (value >= crit) return 'crit';
  if (value >= warn) return 'warn';
  return 'good';
}

/* ------------------------------------------------------------------
   Katalog wielkości — jedyne źródło prawdy dla całej aplikacji
   ------------------------------------------------------------------ */

/* Z tej jednej tablicy interfejs buduje wskaźniki, paywall — listę korzyści,
 * a eksport — kolumny. Wielkość dopisana tutaj pojawia się wszędzie; nie ma
 * drugiej listy, którą trzeba trzymać w zgodzie. */
export const CATALOGUE = [
  {
    id: 'share',
    namePL: 'Udział niebieskiego',
    unit: '%',
    shortPL: 'Ile z widzianego światła przypada na kanał niebieski.',
    helpPL: 'Izoluje barwę od jasności — to ta wartość zmienia się, gdy włączysz tryb nocny.',
    premium: false, decimals: 0, min: 0, max: 60,
    warn: 26, crit: 33, invert: false, icon: 'droplet'
  },
  {
    id: 'brightness',
    namePL: 'Jasność sceny',
    unit: '%',
    shortPL: 'Średnia jasność obrazu z kamery.',
    helpPL: 'Wartość względna, nie luksy — automatyka ekspozycji kamery przesuwa ją pod spodem.',
    premium: false, decimals: 0, min: 0, max: 100,
    warn: 70, crit: 88, invert: false, icon: 'sun'
  },
  {
    id: 'kelvin',
    namePL: 'Temperatura barwowa',
    unit: 'K',
    shortPL: 'Czy światło jest ciepłe, czy chłodne.',
    helpPL: 'Poniżej 3000 K światło jest ciepłe i wieczorem łagodniejsze. 6500 K to domyślna biel większości ekranów.',
    premium: false, decimals: 0, min: 1500, max: 9000,
    warn: 4600, crit: 6000, invert: false, icon: 'thermometer'
  },
  {
    id: 'melanopic',
    namePL: 'Wpływ na rytm dobowy',
    unit: '×',
    shortPL: 'Jak mocno to światło działa na zegar biologiczny.',
    helpPL: 'Przybliżenie współczynnika melanopicznego. 1,00 to neutralna biel dzienna; wieczorem warto schodzić poniżej 0,50.',
    premium: false, decimals: 2, min: 0, max: 1.6,
    warn: 0.75, crit: 1.0, invert: false, icon: 'moon'
  },
  {
    id: 'flicker',
    namePL: 'Migotanie',
    unit: '%',
    shortPL: 'Niewidoczne pulsowanie źródła światła.',
    helpPL: 'Tanie ściemniacze i podświetlenia pulsują. Oko tego nie widzi, ale bywa to przyczyną zmęczenia i bólu głowy.',
    premium: true, decimals: 1, min: 0, max: 60,
    warn: 8, crit: 20, invert: false, icon: 'wave'
  },
  {
    id: 'uniformity',
    namePL: 'Równomierność',
    unit: '%',
    shortPL: 'Czy światło rozkłada się równo w kadrze.',
    helpPL: 'Niska wartość na ekranie oznacza przeświecanie podświetlenia lub odbicie; na biurku — źle ustawioną lampę.',
    premium: true, decimals: 0, min: 0, max: 100,
    warn: 60, crit: 35, invert: true, icon: 'grid'
  },
  {
    id: 'comfort',
    namePL: 'Komfort wzrokowy',
    unit: 'pkt',
    shortPL: 'Jedna ocena zamiast sześciu liczb.',
    helpPL: 'Składa pozostałe pomiary w wynik 0–100 i pokazuje, co najbardziej go obniża. Wagi są naszą oceną redakcyjną, nie normą.',
    premium: true, decimals: 0, min: 0, max: 100,
    warn: 70, crit: 45, invert: true, icon: 'heart'
  }
];

export function byId(id) {
  for (let i = 0; i < CATALOGUE.length; i += 1) {
    if (CATALOGUE[i].id === id) return CATALOGUE[i];
  }
  return null;
}

/* Wyliczane z katalogu, a nie wpisane ręcznie — inaczej dopisanie wielkości
 * wymagałoby pamiętania o drugiej liście. */
export const FREE_IDS = CATALOGUE.filter((m) => !m.premium).map((m) => m.id);
export const PREMIUM_IDS = CATALOGUE.filter((m) => m.premium).map((m) => m.id);
