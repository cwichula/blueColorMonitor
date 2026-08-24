/* Testy indeksu komfortu.
 *
 * Wagi są jawną oceną redakcyjną projektu, więc testy nie sprawdzają, czy 35
 * punktów za rytm dobowy to słuszna liczba. Sprawdzają UMOWĘ, którą ta ocena
 * musi spełniać, żeby dała się uczciwie pokazać:
 *   - brak wejść to measured:false, a nie ocena 100 z niczego,
 *   - rozbicie na kary MUSI sumować się do 100 minus wynik, inaczej użytkownik
 *     widzi liczby, które się nie zgadzają,
 *   - wielkość niezmierzona nie daje kary (i dlatego samo score nie wystarcza),
 *   - światło ciepłe nigdy nie jest karane za barwę.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { comfortIndex } from './comfort.js';

const suma = (p) => p.reduce((a, x) => a + x.points, 0);

test('brak wejść: measured false', () => {
  const r = comfortIndex({});
  assert.equal(r.measured, false, 'nie było czego zmierzyć');
  assert.deepEqual(r.penalties, []);
});

test('wywołanie bez argumentu jest legalne i nie rzuca wyjątkiem', () => {
  const r = comfortIndex();
  assert.equal(r.measured, false);
  assert.equal(typeof r.score, 'number');
});

test('same null-e to dalej brak pomiaru', () => {
  const r = comfortIndex({ melanopic: null, kelvin: null, flickerPercent: null, uniformity: null });
  assert.equal(r.measured, false);
  assert.deepEqual(r.penalties, []);
});

test('NaN i wartości nieliczbowe nie są pomiarem', () => {
  const r = comfortIndex({ melanopic: NaN, kelvin: Infinity, flickerPercent: '10', uniformity: undefined });
  assert.equal(r.measured, false);
});

test('komplet idealnych pomiarów: 100 punktów i measured true', () => {
  // Ciepłe, stabilne, równe światło o niskim wpływie na rytm dobowy.
  const r = comfortIndex({ melanopic: 0.4, kelvin: 2700, flickerPercent: 1, uniformity: 95 });
  assert.equal(r.score, 100, 'idealne światło musi dostać pełną ocenę');
  assert.equal(r.measured, true, 'komplet pomiarów to measured true, choćby bez kar');
  assert.deepEqual(r.penalties, [], 'nie ma za co karać');
});

test('komplet pomiarów bez kar NIE może być mylony z brakiem pomiaru', () => {
  const zmierzone = comfortIndex({ melanopic: 0.4, kelvin: 2700, flickerPercent: 1, uniformity: 95 });
  const puste = comfortIndex({});
  assert.equal(zmierzone.score, puste.score, 'obie sytuacje dają tę samą liczbę...');
  assert.notEqual(zmierzone.measured, puste.measured, '...więc różnić je musi measured');
});

test('światło złe pod każdym względem schodzi do zera', () => {
  const r = comfortIndex({ melanopic: 1.6, kelvin: 8000, flickerPercent: 40, uniformity: 0 });
  assert.equal(r.score, 0);
  assert.equal(r.measured, true);
  assert.equal(r.penalties.length, 4, 'każda wielkość ma wnieść swoją karę');
});

test('suma kar równa się 100 minus wynik', () => {
  const przypadki = [
    { melanopic: 1.4, kelvin: 7000, flickerPercent: 30, uniformity: 10 },
    { kelvin: 5500, flickerPercent: 12 },
    { melanopic: 1.0 },
    { uniformity: 30 },
    { melanopic: 0.9, kelvin: 4500, flickerPercent: 8, uniformity: 55 }
  ];
  for (const wejscie of przypadki) {
    const r = comfortIndex(wejscie);
    const roznica = Math.abs((100 - r.score) - suma(r.penalties));
    // Tolerancja 0,5 to samo zaokrąglenie score do liczby całkowitej.
    assert.ok(roznica <= 0.5,
      `rozbicie nie zgadza się z oceną dla ${JSON.stringify(wejscie)}: ` +
      `score=${r.score}, suma kar=${suma(r.penalties)}`);
  }
});

test('wielkość niezmierzona nie daje żadnej kary', () => {
  const pelne = comfortIndex({ melanopic: 1.4, kelvin: 7000, flickerPercent: 30, uniformity: 10 });
  const czesciowe = comfortIndex({ melanopic: 1.4 });
  assert.ok(czesciowe.score > pelne.score, 'mniej pomiarów to mniej kar');
  assert.equal(czesciowe.penalties.length, 1, 'kara tylko za to, co zmierzono');
  assert.equal(czesciowe.measured, true);
});

test('BRAK DANYCH DAJE 100 PUNKTÓW — dlatego measured musi być sprawdzone osobno', () => {
  // To nie jest błąd, tylko udokumentowana pułapka wzoru; test pilnuje,
  // żeby measured pozostało jedynym zabezpieczeniem przed jej pokazaniem.
  const r = comfortIndex({});
  assert.equal(r.score, 100);
  assert.equal(r.measured, false);
});

test('światło ciepłe nigdy nie jest karane za barwę', () => {
  for (const k of [1800, 2200, 2700, 3000, 4000]) {
    const r = comfortIndex({ kelvin: k });
    assert.equal(r.score, 100, `${k} K nie powinno być karane`);
    assert.deepEqual(r.penalties, []);
  }
});

test('światło chłodne jest karane tym mocniej, im wyższa temperatura', () => {
  const a = comfortIndex({ kelvin: 5000 }).score;
  const b = comfortIndex({ kelvin: 6500 }).score;
  const c = comfortIndex({ kelvin: 9000 }).score;
  assert.ok(a > b && b > c, `oczekiwano malejącej oceny, jest ${a}, ${b}, ${c}`);
});

test('kara za barwę nasyca się i nie rośnie w nieskończoność', () => {
  assert.equal(comfortIndex({ kelvin: 10000 }).score, comfortIndex({ kelvin: 40000 }).score);
});

test('migotanie: poniżej progu odczuwalności bez kary, powyżej z karą', () => {
  assert.equal(comfortIndex({ flickerPercent: 3 }).score, 100, '3 % jest niezauważalne');
  assert.ok(comfortIndex({ flickerPercent: 30 }).score < 80, '30 % to poważna wada');
});

test('równomierność jest wielkością odwróconą: karzemy spadek, nie wzrost', () => {
  assert.equal(comfortIndex({ uniformity: 100 }).score, 100, 'równe światło bez kary');
  assert.ok(comfortIndex({ uniformity: 5 }).score < 100, 'nierówne światło z karą');
});

test('rytm dobowy waży najwięcej ze wszystkich składników', () => {
  const mel = 100 - comfortIndex({ melanopic: 5 }).score;
  const kel = 100 - comfortIndex({ kelvin: 40000 }).score;
  const fli = 100 - comfortIndex({ flickerPercent: 100 }).score;
  const uni = 100 - comfortIndex({ uniformity: 0 }).score;
  assert.ok(mel > kel && mel > fli && mel > uni, `${mel} vs ${kel}, ${fli}, ${uni}`);
  assert.equal(mel + kel + fli + uni, 100, 'wagi mają sumować się do pełnej skali');
});

test('kary są posortowane malejąco', () => {
  const r = comfortIndex({ melanopic: 1.5, kelvin: 4500, flickerPercent: 25, uniformity: 20 });
  for (let i = 1; i < r.penalties.length; i += 1) {
    assert.ok(r.penalties[i - 1].points >= r.penalties[i].points, 'lista nieposortowana');
  }
});

test('każda kara ma identyfikator i polską etykietę', () => {
  const r = comfortIndex({ melanopic: 1.5, kelvin: 7000, flickerPercent: 25, uniformity: 20 });
  const ids = r.penalties.map((p) => p.id).sort();
  assert.deepEqual(ids, ['flicker', 'kelvin', 'melanopic', 'uniformity'],
    'identyfikatory muszą pasować do katalogu wielkości');
  for (const p of r.penalties) {
    assert.equal(typeof p.labelPL, 'string');
    assert.ok(p.labelPL.length > 0);
    assert.ok(p.points > 0);
  }
});

test('ocena zawsze mieści się w 0..100 i jest liczbą całkowitą', () => {
  const przypadki = [{}, { melanopic: 99 }, { uniformity: -50 }, { kelvin: -1000 },
    { melanopic: 3, kelvin: 20000, flickerPercent: 100, uniformity: 0 }];
  for (const w of przypadki) {
    const r = comfortIndex(w);
    assert.ok(Number.isInteger(r.score), `score nie jest całkowite: ${r.score}`);
    assert.ok(r.score >= 0 && r.score <= 100, `score poza zakresem: ${r.score}`);
  }
});

test('kształt odpowiedzi jest zawsze ten sam', () => {
  for (const w of [{}, { kelvin: 7000 }, null, undefined]) {
    const r = comfortIndex(w);
    assert.deepEqual(Object.keys(r).sort(), ['measured', 'penalties', 'score']);
    assert.ok(Array.isArray(r.penalties));
    assert.equal(typeof r.measured, 'boolean');
  }
});
