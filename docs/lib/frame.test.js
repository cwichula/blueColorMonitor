/* Testy obróbki klatki.
 *
 * Klatki są tu budowane ręcznie, więc odpowiedź znana jest z góry: kadr
 * jednolity musi dać średnią równą swojej barwie i komórki co do jednej równe,
 * kadr z jasną połową musi zostać wykryty jako nierówny, kadrowanie środka musi
 * naprawdę pominąć brzegi, a kalibracja musi mnożyć i zaciąć się na 255.
 * Osobno sprawdzana jest rzecz, której nie widać z sygnatury: luminancja komórki
 * ma być średnią światła LINIOWEGO, a nie średnią bajtów przepuszczoną przez
 * gammę — inaczej każdy nierówny kadr wychodziłby równiejszy, niż jest.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cropRect, sampleGrid, applyCalibration, createFlickerWindow } from './frame.js';
import { uniformity } from './uniformity.js';

const close = (a, b, eps, msg) =>
  assert.ok(Math.abs(a - b) <= eps, `${msg ?? ''} — oczekiwano ${b} ±${eps}, otrzymano ${a}`);

/* Tolerancja dla wielkości, które z definicji równają się 1 dla bieli.
 * Nie jest dobrana pod wynik: wagi fotopowe sRGB są opublikowane z dokładnością
 * do siedmiu miejsc i sumują się do 1,0000001, więc luminancja bieli wychodzi
 * o 1e-7 za dużo. Zaciskanie tego do 1e-9 sprawdzałoby precyzję zapisu stałych,
 * a nie fizykę. */
const EPS_MACIERZ = 1e-6;

/* Klatka zgodna z ImageData; `paint(x, y)` zwraca [r, g, b] danego piksela. */
function obraz(width, height, paint) {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const [r, g, b] = paint(x, y);
      const p = (y * width + x) * 4;
      data[p] = r; data[p + 1] = g; data[p + 2] = b; data[p + 3] = 255;
    }
  }
  return { data, width, height };
}

const jednolita = (w, h, rgb) => obraz(w, h, () => rgb);

/* ---------------- cropRect ---------------- */

test('cropRect: środkowe 60 % kwadratowej klatki', () => {
  assert.deepEqual(cropRect(100, 100, 0.6), { x: 20, y: 20, w: 60, h: 60 });
});

test('cropRect: brak wartości znaczy domyślne 60 %', () => {
  assert.deepEqual(cropRect(100, 100), cropRect(100, 100, 0.6));
  assert.deepEqual(cropRect(100, 100, null), cropRect(100, 100, 0.6));
});

test('cropRect: udział 1 to cała klatka', () => {
  assert.deepEqual(cropRect(64, 48, 1), { x: 0, y: 0, w: 64, h: 48 });
});

test('cropRect: klatka prostokątna kadrowana jest w obu osiach', () => {
  assert.deepEqual(cropRect(200, 100, 0.5), { x: 50, y: 25, w: 100, h: 50 });
});

test('cropRect: wycinek naprawdę leży w środku', () => {
  for (const [w, h, f] of [[100, 100, 0.6], [200, 100, 0.5], [33, 77, 0.4]]) {
    const r = cropRect(w, h, f);
    close(r.x + r.w / 2, w / 2, 1, `środek w poziomie dla ${w}x${h}`);
    close(r.y + r.h / 2, h / 2, 1, `środek w pionie dla ${w}x${h}`);
  }
});

test('cropRect: wycinek nigdy nie wystaje poza klatkę', () => {
  for (const f of [0.001, 0.3, 0.6, 1, 5]) {
    const r = cropRect(50, 30, f);
    assert.ok(r.x >= 0 && r.y >= 0, `ujemny początek dla ${f}`);
    assert.ok(r.x + r.w <= 50 && r.y + r.h <= 30, `wystaje poza klatkę dla ${f}`);
    assert.ok(r.w >= 1 && r.h >= 1, `pusty wycinek dla ${f}`);
  }
});

test('cropRect: klatka o zerowych wymiarach nie ma czego kadrować', () => {
  assert.equal(cropRect(0, 0, 0.6), null);
  assert.equal(cropRect(100, 0, 0.6), null);
  assert.equal(cropRect(-5, 10, 0.6), null);
  assert.equal(cropRect(NaN, 10, 0.6), null);
  assert.equal(cropRect(), null);
});

/* ---------------- sampleGrid: klatka jednolita ---------------- */

test('klatka jednolita: średnia równa się barwie klatki', () => {
  const r = sampleGrid(jednolita(12, 12, [100, 150, 200]), { crop: 1, grid: 3 });
  close(r.mean.r, 100, 1e-9, 'kanał R');
  close(r.mean.g, 150, 1e-9, 'kanał G');
  close(r.mean.b, 200, 1e-9, 'kanał B');
});

test('klatka jednolita: wszystkie komórki są równe', () => {
  const r = sampleGrid(jednolita(12, 12, [100, 150, 200]), { crop: 1, grid: 3 });
  assert.equal(r.cells.length, 9, 'siatka 3x3 to dziewięć komórek');
  for (const c of r.cells) {
    close(c.r, 100, 1e-9, 'R komórki');
    close(c.g, 150, 1e-9, 'G komórki');
    close(c.b, 200, 1e-9, 'B komórki');
  }
});

test('klatka jednolita: równomierność wynosi 100 %', () => {
  const r = sampleGrid(jednolita(12, 12, [100, 150, 200]), { crop: 1, grid: 3 });
  close(uniformity(r.cells.map((c) => c.luminance)), 100, 1e-9, 'równomierność');
});

test('klatka biała: luminancja komórek równa 1', () => {
  const r = sampleGrid(jednolita(12, 12, [255, 255, 255]), { crop: 1, grid: 3 });
  for (const c of r.cells) close(c.luminance, 1, EPS_MACIERZ, 'luminancja bieli');
});

test('liczba komórek to zawsze grid x grid', () => {
  for (const g of [1, 2, 3, 4, 6]) {
    const r = sampleGrid(jednolita(12, 12, [10, 10, 10]), { crop: 1, grid: g });
    assert.equal(r.cells.length, g * g, `siatka ${g}x${g}`);
  }
});

test('siatka 1x1: jedyna komórka to średnia całego kadru', () => {
  const r = sampleGrid(obraz(8, 8, (x) => (x < 4 ? [0, 0, 0] : [200, 200, 200])), { crop: 1, grid: 1 });
  close(r.cells[0].r, r.mean.r, 1e-9, 'komórka równa średniej');
  close(r.mean.r, 100, 1e-9, 'połowa czarna, połowa 200');
});

/* ---------------- sampleGrid: klatka niejednorodna ---------------- */

test('jasna połowa kadru: równomierność wykrywa różnicę', () => {
  // Lewa połowa czarna, prawa biała: skrajne komórki to 0 i 1.
  const img = obraz(12, 12, (x) => (x < 6 ? [0, 0, 0] : [255, 255, 255]));
  const r = sampleGrid(img, { crop: 1, grid: 3 });
  const u = uniformity(r.cells.map((c) => c.luminance));
  assert.ok(u !== null, 'jest co porównywać');
  close(u, 0, 1e-9, 'czarna komórka obok białej to 0 %');
  close(r.mean.r, 127.5, 1e-9, 'średnia całego kadru');
});

test('jasna połowa kadru: równomierność jest wyraźnie niższa niż w kadrze równym', () => {
  const rowny = sampleGrid(jednolita(12, 12, [128, 128, 128]), { crop: 1, grid: 3 });
  const nierowny = sampleGrid(obraz(12, 12, (x) => (x < 6 ? [40, 40, 40] : [220, 220, 220])), { crop: 1, grid: 3 });
  const uR = uniformity(rowny.cells.map((c) => c.luminance));
  const uN = uniformity(nierowny.cells.map((c) => c.luminance));
  assert.ok(uN < uR, `nierówny kadr (${uN} %) musi wypaść gorzej niż równy (${uR} %)`);
});

test('luminancja komórki to średnia światła liniowego, nie średnia bajtów', () => {
  // Komórka z jednego piksela białego i jednego czarnego niesie połowę światła.
  // Średnia bajtów (127,5) przepuszczona przez gammę dałaby ~0,216 — czyli
  // pochlebiłaby każdej nierównomiernej scenie.
  const img = obraz(2, 1, (x) => (x === 0 ? [255, 255, 255] : [0, 0, 0]));
  const r = sampleGrid(img, { crop: 1, grid: 1 });
  close(r.cells[0].luminance, 0.5, EPS_MACIERZ, 'średnia w świetle liniowym');
});

test('komórki idą wierszami: pierwsza opisuje lewy górny róg', () => {
  const img = obraz(9, 9, (x, y) => ((x < 3 && y < 3) ? [255, 255, 255] : [0, 0, 0]));
  const r = sampleGrid(img, { crop: 1, grid: 3 });
  close(r.cells[0].luminance, 1, EPS_MACIERZ, 'lewa górna komórka jest biała');
  for (let i = 1; i < 9; i += 1) close(r.cells[i].luminance, 0, 1e-9, `komórka ${i} jest czarna`);
});

/* ---------------- sampleGrid: kadrowanie ---------------- */

test('kadrowanie środka faktycznie pomija brzegi klatki', () => {
  // Klatka 10x10: środkowe 60 % to piksele od 2 do 7 włącznie. Pomalowane na
  // zielono, brzegi na czerwono — jeżeli kadrowanie działa, czerwieni nie widać.
  const img = obraz(10, 10, (x, y) =>
    (x >= 2 && x <= 7 && y >= 2 && y <= 7) ? [0, 255, 0] : [255, 0, 0]);
  const r = sampleGrid(img, { crop: 0.6, grid: 3 });
  close(r.mean.r, 0, 1e-9, 'ani śladu czerwieni z brzegów');
  close(r.mean.g, 255, 1e-9, 'sam środek');
  close(r.mean.b, 0, 1e-9, 'kanał B');
});

test('bez kadrowania te same brzegi już widać', () => {
  const img = obraz(10, 10, (x, y) =>
    (x >= 2 && x <= 7 && y >= 2 && y <= 7) ? [0, 255, 0] : [255, 0, 0]);
  const r = sampleGrid(img, { crop: 1, grid: 3 });
  assert.ok(r.mean.r > 0, 'przy pełnym kadrze czerwień musi wejść do średniej');
});

test('kadrowanie domyślne to te same 60 %', () => {
  const img = obraz(10, 10, (x, y) =>
    (x >= 2 && x <= 7 && y >= 2 && y <= 7) ? [0, 255, 0] : [255, 0, 0]);
  const domyslne = sampleGrid(img, { grid: 3 });
  const jawne = sampleGrid(img, { crop: 0.6, grid: 3 });
  assert.deepEqual(domyslne.mean, jawne.mean);
});

test('prostokąt kadru podany wprost jest respektowany', () => {
  const img = obraz(8, 8, (x) => (x < 4 ? [10, 10, 10] : [250, 250, 250]));
  const lewa = sampleGrid(img, { crop: { x: 0, y: 0, w: 4, h: 8 }, grid: 1 });
  close(lewa.mean.r, 10, 1e-9, 'sama lewa połowa');
  const prawa = sampleGrid(img, { crop: { x: 4, y: 0, w: 4, h: 8 }, grid: 1 });
  close(prawa.mean.r, 250, 1e-9, 'sama prawa połowa');
});

test('prostokąt wystający poza klatkę jest przycinany, nie czyta obcych bajtów', () => {
  const r = sampleGrid(jednolita(8, 8, [120, 120, 120]), { crop: { x: 4, y: 4, w: 100, h: 100 }, grid: 1 });
  close(r.mean.r, 120, 1e-9, 'średnia z tego, co naprawdę jest');
  assert.ok(Number.isFinite(r.mean.r), 'brak NaN spoza bufora');
});

/* ---------------- sampleGrid: brak pomiaru ---------------- */

test('klatka czarna to pomiar zera, nie brak pomiaru', () => {
  const r = sampleGrid(jednolita(12, 12, [0, 0, 0]), { crop: 1, grid: 3 });
  assert.equal(r.mean.r, 0);
  assert.equal(r.mean.g, 0);
  assert.equal(r.mean.b, 0);
  assert.equal(r.cells.length, 9);
  for (const c of r.cells) close(c.luminance, 0, 1e-12, 'luminancja czerni');
  assert.equal(uniformity(r.cells.map((c) => c.luminance)), null,
    'ale równomierności z samych zer już policzyć się nie da');
});

test('brak obrazu: średnia z null-ami i pusta lista komórek, bez wyjątku', () => {
  for (const zle of [null, undefined, 42, 'obraz', {}, { data: null, width: 4, height: 4 }]) {
    const r = sampleGrid(zle, { crop: 1, grid: 3 });
    assert.deepEqual(r.mean, { r: null, g: null, b: null }, `dla ${JSON.stringify(zle)}`);
    assert.deepEqual(r.cells, []);
  }
});

test('zerowe wymiary klatki to brak pomiaru', () => {
  const r = sampleGrid({ data: new Uint8ClampedArray(0), width: 0, height: 0 }, { crop: 1 });
  assert.deepEqual(r.mean, { r: null, g: null, b: null });
  assert.deepEqual(r.cells, []);
});

test('bufor krótszy niż jeden wiersz to brak pomiaru', () => {
  const r = sampleGrid({ data: new Uint8ClampedArray(8), width: 10, height: 10 }, { crop: 1 });
  assert.deepEqual(r.mean, { r: null, g: null, b: null });
  assert.deepEqual(r.cells, []);
});

test('bufor obcięty w połowie: liczymy z wierszy, które naprawdę są', () => {
  // Osiem wierszy zapowiedzianych, cztery dostarczone — wynik ma być średnią
  // z czterech, a nie średnią z czterech i czterech wierszy zer.
  const pelny = obraz(4, 4, () => [200, 200, 200]);
  const obciety = { data: pelny.data, width: 4, height: 8 };
  const r = sampleGrid(obciety, { crop: 1, grid: 1 });
  close(r.mean.r, 200, 1e-9, 'brakujące wiersze nie mogą udawać czerni');
});

test('zwykła tablica działa tak samo jak Uint8ClampedArray (Node bez canvasu)', () => {
  const img = jednolita(8, 8, [30, 60, 90]);
  const zwykla = { data: Array.from(img.data), width: 8, height: 8 };
  assert.deepEqual(sampleGrid(zwykla, { crop: 1, grid: 3 }).mean,
    sampleGrid(img, { crop: 1, grid: 3 }).mean);
});

test('siatka gęstsza niż kadr nie tworzy komórek bez pikseli', () => {
  const r = sampleGrid(jednolita(4, 4, [80, 80, 80]), { crop: 1, grid: 10 });
  assert.ok(r.cells.length > 0);
  for (const c of r.cells) {
    assert.equal(typeof c.luminance, 'number', 'komórka bez pikseli w wyniku');
    assert.ok(Number.isFinite(c.luminance));
  }
});

test('kolejne wywołania nie zostawiają po sobie stanu', () => {
  const jasna = sampleGrid(jednolita(12, 12, [250, 250, 250]), { crop: 1, grid: 3 });
  const ciemna = sampleGrid(jednolita(12, 12, [10, 10, 10]), { crop: 1, grid: 3 });
  close(ciemna.mean.r, 10, 1e-9, 'ciemna klatka po jasnej');
  for (const c of ciemna.cells) close(c.r, 10, 1e-9, 'komórka ciemnej klatki');
  // I jeszcze raz jasna, po zmianie rozmiaru siatki.
  sampleGrid(jednolita(12, 12, [5, 5, 5]), { crop: 1, grid: 6 });
  const znow = sampleGrid(jednolita(12, 12, [250, 250, 250]), { crop: 1, grid: 3 });
  assert.deepEqual(znow.mean, jasna.mean);
});

/* ---------------- kalibracja ---------------- */

test('kalibracja mnoży każdy kanał przez swoje wzmocnienie', () => {
  const c = applyCalibration({ r: 100, g: 100, b: 100 }, { r: 2, g: 1, b: 0.5 });
  close(c.r, 200, 1e-9, 'R x2');
  close(c.g, 100, 1e-9, 'G x1');
  close(c.b, 50, 1e-9, 'B x0,5');
});

test('kalibracja zacina się na 255 — bajt nie ma więcej', () => {
  const c = applyCalibration({ r: 200, g: 250, b: 10 }, { r: 2, g: 4, b: 1 });
  assert.equal(c.r, 255);
  assert.equal(c.g, 255);
  close(c.b, 10, 1e-9, 'kanał bez wzmocnienia zostaje');
});

test('kalibracja nie schodzi poniżej zera', () => {
  const c = applyCalibration({ r: 100, g: 0, b: 0 }, { r: 0.001, g: 1, b: 1 });
  assert.ok(c.r >= 0 && c.r <= 255);
  assert.equal(c.g, 0);
});

test('brak wzmocnień to brak zmiany', () => {
  assert.deepEqual(applyCalibration({ r: 12, g: 34, b: 56 }, {}), { r: 12, g: 34, b: 56 });
  assert.deepEqual(applyCalibration({ r: 12, g: 34, b: 56 }, null), { r: 12, g: 34, b: 56 });
  assert.deepEqual(applyCalibration({ r: 12, g: 34, b: 56 }), { r: 12, g: 34, b: 56 });
});

test('wzmocnienie bezsensowne znaczy brak kalibracji, nie zero', () => {
  for (const zle of [{ r: 0 }, { r: -2 }, { r: NaN }, { r: 'dwa' }, { r: null }]) {
    close(applyCalibration({ r: 100, g: 100, b: 100 }, zle).r, 100, 1e-9,
      `wzmocnienie ${JSON.stringify(zle)}`);
  }
});

test('kanał nieznany zostaje nieznany — wzmocnienie nie tworzy pomiaru', () => {
  const c = applyCalibration({ r: null, g: 100, b: undefined }, { r: 2, g: 2, b: 2 });
  assert.equal(c.r, null);
  assert.equal(c.b, null);
  close(c.g, 200, 1e-9, 'zmierzony kanał liczy się normalnie');
});

test('kalibracja nie zmienia obiektu wejściowego', () => {
  const wejscie = { r: 100, g: 100, b: 100 };
  applyCalibration(wejscie, { r: 2, g: 2, b: 2 });
  assert.deepEqual(wejscie, { r: 100, g: 100, b: 100 });
});

/* ---------------- okno migotania ---------------- */

test('okno migotania zaczyna puste', () => {
  const w = createFlickerWindow(4);
  assert.deepEqual(w.values(), []);
  assert.equal(w.full(), false);
});

test('okno migotania oddaje próbki od najstarszej do najnowszej', () => {
  const w = createFlickerWindow(4);
  w.push(1); w.push(2); w.push(3);
  assert.deepEqual(w.values(), [1, 2, 3]);
  assert.equal(w.full(), false, 'trzy z czterech to jeszcze nie komplet');
  w.push(4);
  assert.deepEqual(w.values(), [1, 2, 3, 4]);
  assert.equal(w.full(), true);
});

test('okno migotania jest buforem cyklicznym: najstarsza próbka wypada', () => {
  const w = createFlickerWindow(4);
  for (const v of [1, 2, 3, 4, 5]) w.push(v);
  assert.deepEqual(w.values(), [2, 3, 4, 5]);
  for (const v of [6, 7, 8, 9]) w.push(v);
  assert.deepEqual(w.values(), [6, 7, 8, 9]);
  assert.equal(w.full(), true);
});

test('okno migotania nigdy nie przekracza swojego rozmiaru', () => {
  const w = createFlickerWindow(8);
  for (let i = 0; i < 100; i += 1) w.push(i);
  assert.equal(w.values().length, 8);
  assert.deepEqual(w.values(), [92, 93, 94, 95, 96, 97, 98, 99]);
});

test('próbka, która nie jest pomiarem, jest odrzucana, a nie zapisywana jako zero', () => {
  const w = createFlickerWindow(4);
  w.push(10); w.push(20);
  for (const zle of [NaN, Infinity, null, undefined, '30', {}]) {
    assert.equal(w.push(zle), false, `przyjęto ${String(zle)}`);
  }
  assert.deepEqual(w.values(), [10, 20], 'okno nie może zostać zaniżone brakiem pomiaru');
});

test('push zwraca true dla poprawnej próbki, w tym dla zera', () => {
  const w = createFlickerWindow(4);
  assert.equal(w.push(0), true, 'zero to poprawna jasność');
  assert.equal(w.push(-3), true, 'ujemna liczba to nadal skończona liczba');
  assert.equal(w.values().length, 2);
});

test('clear kasuje okno — próbki sprzed przerwy nie sąsiadują z próbkami po niej', () => {
  const w = createFlickerWindow(4);
  for (const v of [1, 2, 3, 4]) w.push(v);
  assert.equal(w.full(), true);
  w.clear();
  assert.deepEqual(w.values(), []);
  assert.equal(w.full(), false);
  w.push(9);
  assert.deepEqual(w.values(), [9], 'po skasowaniu okno zaczyna od nowa');
});

test('values() oddaje nową tablicę, nie wnętrze bufora', () => {
  const w = createFlickerWindow(4);
  w.push(1); w.push(2);
  const a = w.values();
  a[0] = 999;
  assert.deepEqual(w.values(), [1, 2], 'zmiana wyniku nie może psuć okna');
});

test('rozmiar domyślny to 32 próbki', () => {
  const w = createFlickerWindow();
  for (let i = 0; i < 40; i += 1) w.push(i);
  assert.equal(w.values().length, 32);
});

test('rozmiar bezsensowny znaczy rozmiar domyślny', () => {
  for (const zly of [0, -5, NaN, null, 'osiem']) {
    const w = createFlickerWindow(zly);
    for (let i = 0; i < 40; i += 1) w.push(i);
    assert.equal(w.values().length, 32, `rozmiar ${String(zly)}`);
  }
});

test('okno migotania karmi flicker() tablicą właściwego kształtu', () => {
  const w = createFlickerWindow(16);
  for (let i = 0; i < 16; i += 1) w.push(2 + Math.sin(2 * Math.PI * 2 * (i / 16)));
  const v = w.values();
  assert.equal(v.length, 16);
  for (const x of v) assert.equal(typeof x, 'number');
});

test('absurdalnie duży rozmiar okna nie wywraca się, tylko wraca do domyślnego', () => {
  // new Array(n) rzucało RangeError powyżej 2^32-1, a rozmiary rzędu miliardów
  // alokowały bufor, którego nikt nie zapełni. Funkcja ma nie rzucać wyjątkiem.
  for (const zly of [4294967296, 1e10, Number.MAX_SAFE_INTEGER, 1e308]) {
    const w = createFlickerWindow(zly);
    for (let i = 0; i < 40; i += 1) w.push(i);
    assert.equal(w.values().length, 32, `rozmiar ${String(zly)}`);
  }
});
