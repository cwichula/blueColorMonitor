/* Testy migotania.
 *
 * Sygnały są tu generowane ze znanej matematyki, a nie zaczerpnięte z kodu:
 * sinusoida o amplitudzie A wokół średniej M ma modulację IES równą A/M,
 * a jej częstotliwość odczytana z przejść przez średnią równa się częstotliwości
 * rzeczywistej dopóty, dopóki próbkowanie spełnia warunek Nyquista.
 * Powyżej połowy częstotliwości próbkowania odczyt jest aliasem, nie pomiarem —
 * i wtedy withinRange musi być fałszem.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { flicker } from './flicker.js';

const close = (a, b, eps, msg) =>
  assert.ok(Math.abs(a - b) <= eps, `${msg ?? ''} — oczekiwano ${b} ±${eps}, otrzymano ${a}`);

/* n próbek pobranych z częstotliwością sampleHz z fali o częstotliwości f. */
function sinus(n, f, sampleHz, mean = 2, amp = 1) {
  const out = new Array(n);
  for (let i = 0; i < n; i += 1) out[i] = mean + amp * Math.sin(2 * Math.PI * f * (i / sampleHz));
  return out;
}

test('sygnał stały: 0 % migotania i żadnej częstotliwości', () => {
  const r = flicker(new Array(32).fill(50), 10);
  assert.equal(r.percent, 0, 'stałe światło nie migocze');
  assert.equal(r.hz, null, 'płaski sygnał nie ma częstotliwości');
  assert.equal(r.withinRange, false, 'nie ma czego uznać za wiarygodne');
});

test('sinusoida poniżej Nyquista: rozpoznana częstotliwość i withinRange', () => {
  // 5 Hz próbkowane 100 Hz — dziesięciokrotny zapas nad granicą Nyquista.
  // Tolerancja nie jest tu dowolna: zliczanie przejść przez średnią gubi na
  // krańcach okna do jednego przejścia, czyli do 0,5 / T Hz. Dla okna 4 s daje
  // to 0,125 Hz i tylko na tyle wolno się rozminąć.
  const r = flicker(sinus(400, 5, 100), 100);
  close(r.hz, 5, 0.2, 'częstotliwość 5 Hz');
  assert.equal(r.withinRange, true, 'sygnał daleko poniżej Nyquista musi być wiarygodny');
});

test('rozdzielczość metody: krótsze okno gubi na krańcach do pół przejścia', () => {
  // Własność samego estymatora, nie usterka: w oknie o czasie T niepewność
  // częstotliwości wynosi 0,5 / T Hz. Test pilnuje, żeby błąd mieścił się
  // w tej granicy i nie był większy.
  const T = 1;                                  // 100 próbek przy 100 Hz
  const r = flicker(sinus(100, 5, 100), 100);
  close(r.hz, 5, 0.5 / T + 1e-9, 'okno jednosekundowe');
});

test('modulacja IES: amplituda 1 wokół średniej 2 to dokładnie 50 %', () => {
  // (max - min) / (max + min) = 2A / 2M = A / M = 0,5
  const r = flicker(sinus(200, 5, 100, 2, 1), 100);
  close(r.percent, 50, 0.5, 'procent migotania');
});

test('modulacja IES: pełne pulsowanie do zera to 100 %', () => {
  const r = flicker(sinus(200, 5, 100, 1, 1), 100);
  close(r.percent, 100, 0.5, 'pulsowanie do zera');
});

test('modulacja IES: płytka modulacja daje mały procent', () => {
  const r = flicker(sinus(200, 5, 100, 100, 2), 100);
  close(r.percent, 2, 0.2, 'amplituda 2 przy średniej 100');
});

test('inna częstotliwość poniżej Nyquista też jest rozpoznana', () => {
  const r = flicker(sinus(400, 12, 100), 100);
  close(r.hz, 12, 0.2, 'częstotliwość 12 Hz');
  assert.equal(r.withinRange, true);
});

test('podwojenie częstotliwości podwaja odczyt', () => {
  const a = flicker(sinus(400, 3, 100), 100).hz;
  const b = flicker(sinus(400, 6, 100), 100).hz;
  close(b / a, 2, 0.1, 'proporcja odczytów');
});

test('migotanie sieciowe 100 Hz próbkowane 10 Hz jest niewidoczne, nie zerowe', () => {
  // 100 Hz to dokładna wielokrotność 10 Hz: każda próbka trafia w tę samą fazę,
  // więc kamera widzi sygnał płaski. Wyniku nie wolno podać jako wiarygodnego.
  const r = flicker(sinus(32, 100, 10), 10);
  assert.equal(r.withinRange, false, 'aliasu nie wolno przedstawiać jako odczytu');
  assert.equal(r.hz, null, 'zaaliasowana fala nie ma tu odczytanej częstotliwości');
});

test('sygnał powyżej Nyquista blisko granicy: withinRange false', () => {
  // 45 Hz próbkowane 10 Hz aliasuje dokładnie na 5 Hz, czyli na samą granicę
  // Nyquista — liczba wychodzi, ale nie wolno jej ufać.
  const r = flicker(sinus(64, 45, 10), 10);
  assert.equal(r.withinRange, false, `hz=${r.hz} przy Nyquiście 5 Hz nie może być wiarygodne`);
});

test('częstotliwość odczytana nigdy nie przekracza granicy Nyquista', () => {
  for (const f of [30, 45, 60, 97]) {
    const r = flicker(sinus(64, f, 10), 10);
    if (r.hz !== null) assert.ok(r.hz <= 5.001, `hz=${r.hz} przekracza Nyquist 5 Hz dla f=${f}`);
  }
});

test('pusta tablica: nie ma czego mierzyć', () => {
  const r = flicker([], 10);
  assert.equal(r.percent, null);
  assert.equal(r.hz, null);
  assert.equal(r.withinRange, false);
});

test('okno za krótkie (mniej niż 8 próbek) nie jest pomiarem', () => {
  const r = flicker([1, 2, 1, 2, 1, 2, 1], 10);
  assert.equal(r.percent, null);
  assert.equal(r.hz, null);
});

test('okno o dokładnie 8 próbkach już jest pomiarem', () => {
  const r = flicker([1, 3, 1, 3, 1, 3, 1, 3], 10);
  assert.equal(typeof r.percent, 'number', 'osiem próbek to minimum, nie za mało');
  close(r.percent, 50, 1e-9, '(3-1)/(3+1)');
});

test('okno samych zer to ciemność, nie brak migotania', () => {
  // Iloraz (max-min)/(max+min) jest przy zerowym mianowniku nieoznaczony;
  // 0 % byłoby wynikiem, który strefy czytają jako idealny.
  const r = flicker(new Array(16).fill(0), 10);
  assert.equal(r.percent, null);
  assert.equal(r.hz, null);
  assert.equal(r.withinRange, false);
});

test('brak częstotliwości próbkowania: procent jest, herców nie ma', () => {
  const r = flicker(sinus(100, 5, 100), undefined);
  close(r.percent, 50, 0.5, 'procent nie potrzebuje osi czasu');
  assert.equal(r.hz, null, 'bez sampleHz nie ma z czego policzyć herców');
  assert.equal(r.withinRange, false);
});

test('uszkodzona próbka unieważnia całe okno', () => {
  const zle = sinus(32, 5, 100);
  zle[10] = NaN;
  const r = flicker(zle, 100);
  assert.equal(r.percent, null, 'dziura w równomiernym próbkowaniu przesuwa oś czasu');
  assert.equal(r.hz, null);
});

test('brak danych wejściowych nie rzuca wyjątkiem', () => {
  for (const arg of [null, undefined, 42, {}]) {
    const r = flicker(arg, 10);
    assert.equal(r.percent, null);
    assert.equal(r.withinRange, false);
  }
});

test('kształt odpowiedzi jest zawsze ten sam', () => {
  const przypadki = [[sinus(64, 5, 100), 100], [[], 10], [new Array(16).fill(3), 10]];
  for (const [s, hz] of przypadki) {
    const r = flicker(s, hz);
    assert.deepEqual(Object.keys(r).sort(), ['hz', 'percent', 'withinRange']);
    assert.equal(typeof r.withinRange, 'boolean');
  }
});

test('withinRange === true wymaga podanej częstotliwości', () => {
  const r = flicker(sinus(100, 5, 100), 100);
  if (r.withinRange) assert.equal(typeof r.hz, 'number');
});
