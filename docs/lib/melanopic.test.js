/* Testy współczynnika melanopicznego.
 *
 * Wskaźnik jest z definicji ILORAZEM ważenia melanopicznego do fotopowego,
 * znormalizowanym tak, by neutralna biel dawała dokładnie 1,00. Stąd własności
 * sprawdzalne bez zaglądania w kod: każda szarość daje 1,00 niezależnie od
 * jasności, światło ciepłe (mało niebieskiego) leży wyraźnie poniżej 1, światło
 * niebieskie wyraźnie powyżej, a czerń nie daje wyniku, bo iloraz jest 0/0.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { melanopicRatio, MELANOPIC_WEIGHTS } from './melanopic.js';

const close = (a, b, eps, msg) =>
  assert.ok(Math.abs(a - b) <= eps, `${msg ?? ''} — oczekiwano ${b} ±${eps}, otrzymano ${a}`);

test('biel neutralna to dokładnie 1,00 (punkt normalizacji skali)', () => {
  close(melanopicRatio(255, 255, 255), 1, 1e-9, 'biel');
});

test('każda szarość daje 1,00 — wskaźnik zależy od barwy, nie od jasności', () => {
  for (const v of [1, 20, 64, 128, 200, 255]) {
    close(melanopicRatio(v, v, v), 1, 1e-9, `szarość ${v}`);
  }
});

test('światło świecy jest wyraźnie poniżej 1', () => {
  const v = melanopicRatio(255, 147, 41);
  assert.ok(v < 0.5, `światło ciepłe powinno być znacznie poniżej 1, jest ${v}`);
  assert.ok(v > 0, 'ale nie zerowe — świeca nadal świeci');
});

test('porządek fizyczny: im cieplejsze światło, tym niższy wskaźnik', () => {
  const swieca = melanopicRatio(255, 147, 41);    // ~2000 K
  const zarowka = melanopicRatio(255, 169, 87);   // ~2700 K
  const cieple = melanopicRatio(255, 209, 163);   // ~4000 K
  const dzienne = melanopicRatio(255, 249, 253);  // ~6500 K
  assert.ok(swieca < zarowka, `${swieca} < ${zarowka}`);
  assert.ok(zarowka < cieple, `${zarowka} < ${cieple}`);
  assert.ok(cieple < dzienne, `${cieple} < ${dzienne}`);
});

test('światło dzienne ~6500 K leży w okolicy 1,00', () => {
  const v = melanopicRatio(255, 249, 253);
  assert.ok(v > 0.9 && v < 1.15, `oczekiwano ~1,0, jest ${v}`);
});

test('czyste światło niebieskie jest wielokrotnie powyżej 1', () => {
  assert.ok(melanopicRatio(0, 0, 255) > 3, 'niebieski musi mocno przekraczać biel');
});

test('czyste światło czerwone jest bliskie zeru — nie mówi do zegara biologicznego', () => {
  const v = melanopicRatio(255, 0, 0);
  assert.ok(v >= 0 && v < 0.05, `oczekiwano ~0, jest ${v}`);
});

test('czerń: iloraz 0/0 nie istnieje, więc null — nigdy 0,00', () => {
  // "0,00x" czyta się jako światło doskonale obojętne dla rytmu dobowego,
  // czyli jako wynik idealny, a to jest brak pomiaru.
  assert.equal(melanopicRatio(0, 0, 0), null);
});

test('dane, które nie są pomiarem, dają null bez dzielenia przez zero', () => {
  assert.equal(melanopicRatio(NaN, 0, 0), null);
  assert.equal(melanopicRatio(-1, 0, 0), null);
  assert.equal(melanopicRatio(0, Infinity, 0), null);
  assert.equal(melanopicRatio(), null);
});

test('MELANOPIC_WEIGHTS: szczyt melanopsyny blisko niebieskiego, daleko od czerwieni', () => {
  const w = MELANOPIC_WEIGHTS;
  assert.ok(w.b > w.g, `waga niebieskiego (${w.b}) musi przewyższać zieloną (${w.g})`);
  assert.ok(w.g > w.r, `waga zielona (${w.g}) musi przewyższać czerwoną (${w.r})`);
  assert.ok(w.r < 0.01, `waga czerwona powinna być praktycznie zerowa, jest ${w.r}`);
  for (const k of ['r', 'g', 'b']) {
    assert.ok(w[k] >= 0 && w[k] <= 1, `waga ${k} poza 0..1`);
  }
});

test('dwie ekspozycje tej samej barwy dają zbliżony wskaźnik', () => {
  // Wskaźnik jest ilorazem, więc opisuje barwę; gamma sprawia, że proporcja
  // bajtów nie jest wprost proporcją światła, ale wynik ma zostać w miejscu.
  const a = melanopicRatio(200, 160, 120);
  const b = melanopicRatio(100, 80, 60);
  assert.ok(a > 0 && b > 0);
  assert.ok(Math.abs(a - b) < 0.2, `${a} vs ${b}`);
});

test('kanał spoza bajtu daje null, a nie wynik z zaciśniętych 255', () => {
  // toLinear zaciska wejście do bajtu, więc bez sprawdzenia zakresu (300,300,300)
  // wychodziło jako pewne 1,00× — liczba wyliczona z danych, które nie są kanałem.
  assert.equal(melanopicRatio(300, 300, 300), null);
  assert.equal(melanopicRatio(0, 0, 256), null);
});
