/* Testy temperatury barwowej.
 *
 * Punkty odniesienia są znane z fizyki, nie z kodu: biel sRGB jest z definicji
 * bielą D65, czyli ~6500 K blisko krzywej Plancka; barwa świecy (#FF9329,
 * powszechnie podawana jako ~1900–2100 K) leży na krzywej i jest wiarygodna;
 * barwa czysto niebieska i czysto zielona leżą od krzywej Plancka tak daleko,
 * że żadne ciało doskonale czarne ich nie przypomina — i wtedy kelwinów nie
 * wolno podać. To ostatnie jest sednem poprawki, którą wprowadziło v5.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { colourTemperature } from './colour-temperature.js';

test('biel sRGB to biel D65: ~6500 K i wynik wiarygodny', () => {
  const t = colourTemperature(255, 255, 255);
  assert.equal(t.reliable, true, 'biel D65 musi być wiarygodna');
  assert.ok(t.kelvin >= 6300 && t.kelvin <= 6700, `oczekiwano ~6500 K, jest ${t.kelvin}`);
});

test('biel sRGB leży praktycznie na krzywej Plancka (|Duv| < 0,006)', () => {
  const t = colourTemperature(255, 255, 255);
  assert.equal(typeof t.duv, 'number');
  assert.ok(Math.abs(t.duv) < 0.006, `Duv bieli D65 = ${t.duv}`);
});

test('temperatura nie zależy od jasności, tylko od barwy', () => {
  const jasna = colourTemperature(255, 255, 255);
  const ciemna = colourTemperature(60, 60, 60);
  assert.equal(ciemna.reliable, true, 'przyciemniona biel dalej jest bielą');
  assert.ok(Math.abs(jasna.kelvin - ciemna.kelvin) <= 2,
    `ta sama barwa, inna jasność: ${jasna.kelvin} vs ${ciemna.kelvin}`);
});

test('światło świecy jest ciepłe: w okolicy 2000 K i wiarygodne', () => {
  // #FF9329 — barwa świecy podawana w tablicach ciała doskonale czarnego.
  const t = colourTemperature(255, 147, 41);
  assert.equal(t.reliable, true, 'światło świecy leży na krzywej Plancka');
  assert.ok(t.kelvin >= 1800 && t.kelvin <= 2600, `oczekiwano ~2000 K, jest ${t.kelvin}`);
});

test('żarówka jest cieplejsza od bieli dziennej (porządek jest zachowany)', () => {
  const zarowka = colourTemperature(255, 169, 87);   // ~2700 K
  const dzienna = colourTemperature(255, 249, 253);  // ~6500 K
  assert.ok(zarowka.kelvin < dzienna.kelvin,
    `żarówka ${zarowka.kelvin} K powinna być chłodniejsza liczbowo niż ${dzienna.kelvin} K`);
});

test('czyste światło niebieskie jest NIEWIARYGODNE — kelvin null', () => {
  // Żadne ciało doskonale czarne nie świeci na czysto niebiesko; wielomian
  // McCamy'ego zwraca dla tej barwy liczbę, która nic nie znaczy.
  const t = colourTemperature(0, 0, 255);
  assert.equal(t.kelvin, null, 'czysty niebieski nie ma temperatury barwowej');
  assert.equal(t.reliable, false);
});

test('czyste światło zielone jest NIEWIARYGODNE — kelvin null', () => {
  // Tu wielomian daje wartość Z ZAKRESU (~6000 K) i tylko odległość od krzywej
  // Plancka (Duv ~0,10) zdradza, że to nie jest biel. Dokładnie ten przypadek
  // v4 pokazywało jako wiarygodną liczbę.
  const t = colourTemperature(0, 255, 0);
  assert.equal(t.kelvin, null, 'czysty zielony nie ma temperatury barwowej');
  assert.equal(t.reliable, false);
  assert.ok(Math.abs(t.duv) > 0.05, `Duv czystej zieleni = ${t.duv}`);
});

test('czyste światło czerwone też jest niewiarygodne', () => {
  const t = colourTemperature(255, 0, 0);
  assert.equal(t.kelvin, null);
  assert.equal(t.reliable, false);
});

test('światło jawnie zielonkawe ma Duv dodatni, różowawe ujemny', () => {
  const zielonkawe = colourTemperature(200, 255, 200);
  const rozowawe = colourTemperature(255, 200, 255);
  assert.ok(zielonkawe.duv > 0, `zielonkawe powinno mieć Duv > 0, jest ${zielonkawe.duv}`);
  assert.ok(rozowawe.duv < 0, `różowawe powinno mieć Duv < 0, jest ${rozowawe.duv}`);
});

test('czerń: nie ma chromatyczności, więc nie ma temperatury', () => {
  const t = colourTemperature(0, 0, 0);
  assert.equal(t.kelvin, null);
  assert.equal(t.reliable, false);
  assert.equal(t.duv, null, 'bez chromatyczności Duv też nie istnieje');
});

test('dane, które nie są pomiarem, dają komplet null bez wyjątku', () => {
  for (const args of [[NaN, 0, 0], [-1, 0, 0], [undefined, 0, 0], []]) {
    const t = colourTemperature(...args);
    assert.equal(t.kelvin, null);
    assert.equal(t.reliable, false);
    assert.equal(t.duv, null);
  }
});

test('kształt odpowiedzi jest zawsze ten sam', () => {
  for (const args of [[255, 255, 255], [0, 0, 0], [0, 255, 0]]) {
    const t = colourTemperature(...args);
    assert.deepEqual(Object.keys(t).sort(), ['duv', 'kelvin', 'reliable']);
    assert.equal(typeof t.reliable, 'boolean');
  }
});

test('kelvin jest liczbą całkowitą, gdy w ogóle jest podany', () => {
  const t = colourTemperature(255, 255, 255);
  assert.equal(Number.isInteger(t.kelvin), true, `kelvin = ${t.kelvin}`);
});

test('reliable === false zawsze idzie w parze z kelvin === null', () => {
  const próbki = [[255, 255, 255], [0, 0, 255], [0, 255, 0], [255, 0, 0], [0, 0, 0], [255, 147, 41]];
  for (const p of próbki) {
    const t = colourTemperature(...p);
    if (!t.reliable) assert.equal(t.kelvin, null, `niewiarygodny wynik podał liczbę dla ${p}`);
    else assert.equal(typeof t.kelvin, 'number', `wiarygodny wynik bez liczby dla ${p}`);
  }
});

test('kanał spoza bajtu nie może dać wiarygodnych kelwinów', () => {
  // Zaciśnięcie w toLinear zamieniało (300, 300, 300) w biel i zwracało pewne
  // 6503 K. Przybliżać wolno pomiar, nie brak pomiaru.
  const t = colourTemperature(300, 300, 300);
  assert.equal(t.kelvin, null);
  assert.equal(t.reliable, false);
});

test('biel sRGB daje dokładnie tę samą liczbę co v5 — 6503 K', () => {
  // To nie jest test fizyki, tylko ciągłości: użytkownik v5 widzi na wskaźniku
  // 6503 K i ta sama scena nie może po przeniesieniu wzoru pokazać innej liczby.
  assert.equal(colourTemperature(255, 255, 255).kelvin, 6503);
});
