/* Testy udziału niebieskiego.
 *
 * Wielkość jest z definicji proporcją b / (r + g + b), więc jej własności
 * wynikają z arytmetyki, a nie z implementacji: biel neutralna daje dokładnie
 * jedną trzecią, światło czysto niebieskie 100 %, a kadr o zerowej sumie
 * kanałów nie ma udziału, którego dałoby się dowiedzieć.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { blueShare } from './blue-share.js';

const close = (a, b, eps, msg) =>
  assert.ok(Math.abs(a - b) <= eps, `${msg ?? ''} — oczekiwano ${b} ±${eps}, otrzymano ${a}`);

test('biel neutralna to dokładnie jedna trzecia', () => {
  close(blueShare(255, 255, 255), 100 / 3, 1e-9, 'biel');
});

test('każda szarość daje tę samą jedną trzecią — wielkość nie zależy od jasności', () => {
  for (const v of [1, 16, 64, 128, 200, 255]) {
    close(blueShare(v, v, v), 100 / 3, 1e-9, `szarość ${v}`);
  }
});

test('czyste światło niebieskie to 100 %', () => {
  assert.equal(blueShare(0, 0, 255), 100);
  assert.equal(blueShare(0, 0, 1), 100);
});

test('światło bez składowej niebieskiej to 0 % — zmierzone zero, nie brak pomiaru', () => {
  assert.equal(blueShare(255, 0, 0), 0);
  assert.equal(blueShare(255, 255, 0), 0);
});

test('czerń: suma kanałów zero, więc udziału nie da się policzyć (null, nie 0)', () => {
  // 0 % byłoby wartością zastępczą, którą strefy pomalowałyby na zielono jako
  // światło idealne — a to po prostu brak światła.
  assert.equal(blueShare(0, 0, 0), null);
});

test('wynik zawsze mieści się w 0..100', () => {
  for (const [r, g, b] of [[10, 20, 30], [255, 1, 1], [1, 1, 255], [90, 90, 90]]) {
    const v = blueShare(r, g, b);
    assert.ok(v >= 0 && v <= 100, `poza zakresem: ${v}`);
  }
});

test('proporcja jest niezmiennicza względem skalowania wszystkich kanałów', () => {
  close(blueShare(20, 40, 60), blueShare(40, 80, 120), 1e-9, 'skalowanie x2');
});

test('znana proporcja: 25 % dla (30, 30, 20)', () => {
  close(blueShare(30, 30, 20), 25, 1e-9, '20 / 80');
});

test('dane, które nie są pomiarem, dają null zamiast wyjątku', () => {
  assert.equal(blueShare(NaN, 1, 1), null);
  assert.equal(blueShare(1, Infinity, 1), null);
  assert.equal(blueShare(-1, 1, 1), null);
  assert.equal(blueShare(undefined, 1, 1), null);
  assert.equal(blueShare('120', 1, 1), null);
  assert.equal(blueShare(), null);
});

test('kanał spoza bajtu to nie pomiar — suma nie ma prawa się przepełnić', () => {
  // 1e308 + 1e308 + 1e308 to nieskończoność, więc b/suma wychodziło 0. Zero jest
  // tu najgorszą możliwą odpowiedzią: „0 %” strefy malują na zielono jako
  // światło idealne, a to były dane, które nie są klatką.
  assert.equal(blueShare(1e308, 1e308, 1e308), null);
  assert.equal(blueShare(1e308, 1e308, 1e307), null);
  // Kanał kamery jest ośmiobitowy; liczba spoza bajtu nie jest kanałem.
  assert.equal(blueShare(300, 300, 300), null);
  assert.equal(blueShare(0, 0, 256), null);
});
