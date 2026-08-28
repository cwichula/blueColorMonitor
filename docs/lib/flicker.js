/* Migotanie — procent modulacji wg definicji IES i zgrubna częstotliwość.
 *
 * Źródło wzoru: docs/v5/js/metrics.js (wcześniejsza, identyczna co do stałej
 * redakcja: docs/shared/metrics.js, dawniej docs/v4/metrics.js).
 * docs/v5/js/metrics.js nie jest już źródłem tych wzorów — wyprowadziły się
 * TUTAJ, a tamten plik jest dziś cienką warstwą adaptacyjną nad docs/lib
 * (reeksport + trzy adaptery, które zostawiają v5 zero tam, gdzie biblioteka
 * woli pauzę).
 * Migotanie jest jedyną wielkością w tej
 * bibliotece, którą kamera wykrywa naprawdę dobrze — ale tylko poniżej połowy
 * częstotliwości próbkowania. Powyżej niej wynik jest aliasem, nie odczytem,
 * i to jest ograniczenie metody, nie szczegół implementacji. To nie jest
 * pomiar fotometryczny ani wynik medyczny.
 */

/* Procent migotania w oknie próbek jasności:
 *
 *     percent = (max - min) / (max + min) * 100
 *
 * standardowa definicja IES („percent flicker”, znana też jako modulacja).
 * Ekrany i tanie sterowniki LED ściemniają pulsowaniem; oko tego pulsowania nie
 * widzi, ale udokumentowano je jako przyczynę zmęczenia oczu i bólów głowy.
 *
 * `samples` to kolejne pomiary jasności (dowolna spójna skala — procenty,
 * luminancja względna; wzór jest ilorazem, więc jednostka się skraca) pobierane
 * ze STAŁYM krokiem `sampleHz`. Poniżej 8 próbek nie ma o czym mówić.
 *
 * GRANICA NYQUISTA — rzecz najważniejsza i nie do pominięcia. Próbkowanie
 * z częstotliwością S Hz pozwala zobaczyć modulację wyłącznie poniżej S/2 Hz.
 * Migotanie sieciowe (100 Hz w Europie, 120 Hz w USA) leży o rząd wielkości
 * powyżej typowych 10 Hz próbkowania z kamery i ZAALIASUJE: zwrócona
 * częstotliwość będzie wtedy prawdziwą liczbą policzoną z prawdziwych danych
 * i zarazem nieprawdą o świetle. Dlatego `withinRange` jest osobnym polem:
 * mówi, czy `hz` w ogóle wolno pokazać. Gdy jest false, `hz` należy traktować
 * jak nieobecne, choćby miało wartość.
 *
 * Uwaga o `percent` przy aliasingu: sama głębokość modulacji bywa zaniżona
 * (próbkujemy przypadkowe fazy szybkiej fali), więc niskie `percent` przy
 * `withinRange === false` nie jest dowodem, że światło nie migocze.
 *
 * Zwraca { percent, hz, withinRange }:
 *   percent — 0..100, albo null gdy nie ma czego mierzyć,
 *   hz      — częstotliwość dominująca, albo null gdy sygnał jest płaski,
 *   withinRange — czy `hz` leży bezpiecznie poniżej granicy próbkowania. */
export function flicker(samples, sampleHz) {
  // Jeden kształt odpowiedzi „nie zmierzono” — nigdy wyjątek, nigdy zgadywanie.
  const none = { percent: null, hz: null, withinRange: false };

  if (!samples || typeof samples.length !== 'number' || samples.length < 8) return none;

  let min = Infinity, max = -Infinity, sum = 0;
  for (let i = 0; i < samples.length; i += 1) {
    const v = samples[i];
    // Okno z choćby jedną uszkodzoną próbką nie jest pomiarem. Odsianie jej
    // byłoby gorsze niż odrzucenie całości: dziura w równomiernym próbkowaniu
    // przesuwa oś czasu, a więc i policzoną częstotliwość.
    if (typeof v !== 'number' || !isFinite(v) || v < 0) return none;
    if (v < min) min = v;
    if (v > max) max = v;
    sum += v;
  }

  const span = max + min;
  // Okno samych zer to ciemność, a nie światło bez migotania. v5 zwracało tu
  // 0 %, co strefy czytały jako wynik idealny; iloraz (max-min)/(max+min) jest
  // przy zerowym mianowniku nieoznaczony, więc uczciwą odpowiedzią jest null.
  // Sam wzór i próg 1e-9 — bez zmian.
  if (span <= 1e-9) return none;
  const percent = ((max - min) / span) * 100;

  // Zliczanie przejść przez średnią daje zgrubną częstotliwość dominującą.
  // Metoda jest tania i odporna na dryf jasności, ale widzi tylko jedną,
  // najsilniejszą składową — nie jest analizą widmową.
  const mean = sum / samples.length;
  let crossings = 0;
  for (let j = 1; j < samples.length; j += 1) {
    const a = samples[j - 1] - mean, c = samples[j] - mean;
    if ((a < 0 && c >= 0) || (a >= 0 && c < 0)) crossings += 1;
  }

  // Bez znanej częstotliwości próbkowania okno nie ma osi czasu: `percent`
  // dalej znaczy to samo, ale herców nie ma z czego policzyć. v5 podstawiało
  // tu 1 Hz i zwracało liczbę — to była wartość zastępcza, nie pomiar.
  const rate = (typeof sampleHz === 'number' && isFinite(sampleHz) && sampleHz > 0)
    ? sampleHz
    : null;

  // Sygnał płaski nie ma częstotliwości: przejścia przez średnią są wtedy tylko
  // szumem czujnika, a podanie ich w hercach przebrałoby szum za pomiar.
  const hasSignal = percent >= 0.5;

  const seconds = rate === null ? 0 : samples.length / rate;
  // Pełny okres to dwa przejścia przez średnią, stąd crossings / 2.
  const hz = (hasSignal && seconds > 0) ? (crossings / 2) / seconds : null;

  const nyquist = rate === null ? 0 : rate / 2;

  return {
    percent,
    hz,
    // Ufamy częstotliwości tylko wtedy, gdy leży wygodnie poniżej granicy
    // próbkowania. Cokolwiek blisko Nyquista jest nieodróżnialne od aliasu
    // czegoś szybszego; dolne 0,2 Hz odcina powolny dryf ekspozycji kamery,
    // który nie jest migotaniem źródła.
    withinRange: hz !== null && hz > 0.2 && hz < nyquist * 0.8
  };
}
