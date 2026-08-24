/* Testy równomierności.
 *
 * Wielkość jest ilorazem min/max luminancji komórek, więc jej własności są
 * czystą arytmetyką: komórki równe dają 100 %, stosunek 1:2 dokładnie 50 %,
 * a kadr bez światła nie daje wyniku, bo 0/0 jest nieoznaczone. Iloraz nie
 * zależy od ekspozycji — i to też da się sprawdzić bez zaglądania w kod.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { uniformity } from './uniformity.js';

const close = (a, b, eps, msg) =>
  assert.ok(Math.abs(a - b) <= eps, `${msg ?? ''} — oczekiwano ${b} ±${eps}, otrzymano ${a}`);

test('pusta tablica: nie ma czego porównywać', () => {
  assert.equal(uniformity([]), null);
});

test('jedna komórka to za mało na iloraz', () => {
  assert.equal(uniformity([0.5]), null);
});

test('komórki równe to 100 %', () => {
  close(uniformity([0.5, 0.5, 0.5, 0.5]), 100, 1e-9, 'cztery równe');
  close(uniformity(new Array(9).fill(0.123)), 100, 1e-9, 'siatka 3x3');
});

test('stosunek 1:2 to dokładnie 50 %', () => {
  close(uniformity([0.5, 1.0]), 50, 1e-9, 'dwie komórki');
  close(uniformity([1.0, 0.5, 0.75, 0.9]), 50, 1e-9, 'liczy się min do max, nie średnia');
});

test('stosunek 1:4 to 25 %', () => {
  close(uniformity([0.25, 1.0]), 25, 1e-9, '1:4');
});

test('komórka całkowicie czarna obok jasnej to 0 %', () => {
  close(uniformity([0, 1]), 0, 1e-9, 'pełny kontrast');
});

test('wynik nie zależy od ekspozycji — to iloraz', () => {
  close(uniformity([0.1, 0.2]), uniformity([0.4, 0.8]), 1e-9, 'ta sama proporcja');
});

test('kolejność komórek nie ma znaczenia', () => {
  close(uniformity([0.9, 0.3, 0.6]), uniformity([0.6, 0.9, 0.3]), 1e-12, 'przestawienie');
});

test('same zera to brak światła, a nie nierównomierność — null', () => {
  // 0 % byłoby fałszywym alarmem o nierównomierności tam, gdzie po prostu
  // nie ma czego mierzyć; iloraz 0/0 jest nieoznaczony.
  assert.equal(uniformity([0, 0, 0, 0]), null);
  assert.equal(uniformity(new Array(9).fill(0)), null);
});

test('wynik zawsze mieści się w 0..100', () => {
  for (const c of [[0.01, 1], [1, 1], [0.5, 0.5001], [0, 0.001]]) {
    const v = uniformity(c);
    assert.ok(v >= 0 && v <= 100, `poza zakresem: ${v}`);
  }
});

test('uszkodzona komórka unieważnia pomiar zamiast go zawyżać', () => {
  // Pominięcie komórki bez pomiaru po cichu podniosłoby równomierność.
  assert.equal(uniformity([0.5, NaN, 0.5]), null);
  assert.equal(uniformity([0.5, null, 0.5]), null);
  assert.equal(uniformity([0.5, -0.1]), null);
  assert.equal(uniformity([0.5, Infinity]), null);
  assert.equal(uniformity([0.5, '0.5']), null);
});

test('brak danych nie rzuca wyjątkiem', () => {
  assert.equal(uniformity(null), null);
  assert.equal(uniformity(undefined), null);
  assert.equal(uniformity(42), null);
  assert.equal(uniformity(), null);
});
