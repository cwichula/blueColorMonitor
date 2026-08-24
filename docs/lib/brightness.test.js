/* Testy jasności sceny.
 *
 * Jasność to średnia trzech kanałów w procentach zakresu bajtu. Czarny kadr
 * jest tu wynikiem ZMIERZONYM (0 %), w odróżnieniu od udziału niebieskiego,
 * gdzie zerowa suma znaczy brak pomiaru — ta różnica jest sednem testów niżej.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { brightness } from './brightness.js';

const close = (a, b, eps, msg) =>
  assert.ok(Math.abs(a - b) <= eps, `${msg ?? ''} — oczekiwano ${b} ±${eps}, otrzymano ${a}`);

test('czerń to 0 % — pomiar, nie brak pomiaru', () => {
  assert.equal(brightness(0, 0, 0), 0);
});

test('biel to 100 %', () => {
  close(brightness(255, 255, 255), 100, 1e-9, 'biel');
});

test('połowa zakresu bajtu to ~50 %', () => {
  close(brightness(128, 128, 128), (128 / 255) * 100, 1e-9, 'szarość 128');
});

test('to średnia kanałów: jedna pełna prymarna daje jedną trzecią skali', () => {
  close(brightness(255, 0, 0), 100 / 3, 1e-9, 'czysta czerwień');
  close(brightness(0, 255, 0), 100 / 3, 1e-9, 'czysta zieleń');
  close(brightness(0, 0, 255), 100 / 3, 1e-9, 'czysty niebieski');
});

test('kolejność kanałów nie ma znaczenia', () => {
  close(brightness(10, 20, 30), brightness(30, 10, 20), 1e-12, 'przestawienie');
});

test('funkcja jest rosnąca względem każdego kanału', () => {
  assert.ok(brightness(100, 100, 100) > brightness(99, 100, 100));
  assert.ok(brightness(100, 100, 100) < brightness(100, 101, 100));
});

test('wynik mieści się w 0..100 dla całego zakresu bajtu', () => {
  for (const v of [0, 1, 127, 254, 255]) {
    const b = brightness(v, v, v);
    assert.ok(b >= 0 && b <= 100, `poza zakresem: ${b}`);
  }
});

test('dane, które nie są pomiarem, dają null', () => {
  assert.equal(brightness(NaN, 0, 0), null);
  assert.equal(brightness(0, Infinity, 0), null);
  assert.equal(brightness(-1, 0, 0), null);
  assert.equal(brightness(null, 0, 0), null);
  assert.equal(brightness(), null);
});

test('kanał spoza bajtu daje null, a nie 392 % ani Infinity', () => {
  // Przepełnienie sumy zwracało Infinity, czyli „∞ %” na wskaźniku; kanał 1000
  // dawał 392 %, wartość spoza skali, którą katalog deklaruje jako 0..100.
  assert.equal(brightness(1e308, 1e308, 1e308), null, 'przepełnienie sumy');
  assert.equal(brightness(1000, 1000, 1000), null, 'wynik powyżej 100 %');
  assert.equal(brightness(256, 0, 0), null, 'tuż za końcem bajtu');
});
