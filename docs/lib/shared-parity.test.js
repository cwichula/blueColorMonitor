/* Zgodność DWÓCH redakcji tej samej matematyki pomiaru.
 *
 * PO CO TEN PLIK ISTNIEJE: po refaktorze wzory żyją w repozytorium podwójnie —
 * jako moduły ES w docs/lib (używa ich v5) i jako klasyczny skrypt
 * docs/shared/metrics.js wystawiający window.Metrics (używają go v2, v3 i v4).
 * Scalić się ich nie da: v2–v4 ładują skrypty w synchronicznej kolejności tagów
 * <script>, a ich warstwa startu (spisy globali w boot.js, kolejka
 * window.__ms4PendingViews w v4) rozsypałaby się przy module ES. Skoro obie
 * redakcje muszą istnieć, pilnuje ich test, a nie pamięć człowieka: poprawienie
 * wzoru w jednej warstwie i zapomnienie o drugiej ma WYWALIĆ testy, zamiast po
 * cichu rozjechać wyniki między wersjami aplikacji — ta sama scena pokazywałaby
 * wtedy inną liczbę w v3 i w v5, a nikt by nie wiedział, która kłamie.
 *
 * CZEGO TEN PLIK NIE ROBI: nie zrównuje obu redakcji. Różnią się ŚWIADOMIE
 * i te różnice są tu wypisane jako osobne testy z prefiksem „RÓŻNICA POKOLEŃ”.
 * Sedno różnicy jest jedno: starsza redakcja w miejscach nieoznaczonych
 * (czerń, zerowe okno, brak częstotliwości próbkowania) podaje 0 albo wartość
 * zastępczą, nowsza mówi null. Gdyby któraś z tych różnic zniknęła, test też
 * zapali się na czerwono — i dobrze, bo to zmiana zachowania aplikacji, a nie
 * kosmetyka. Tam, gdzie obie redakcje coś liczą, wynik ma być równy CO DO BITU
 * (Object.is), bez tolerancji: to ten sam wzór, w tej samej kolejności działań,
 * na tych samych stałych.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

import * as lib from './index.js';

/* Dlaczego nie ma tu importu docs/shared/metrics.js: to nie jest moduł.
 * To klasyczny skrypt w kopercie
 *   (function (global) { … }(typeof window !== 'undefined' ? window : globalThis))
 * — nie ma w nim ani jednego `export`, a jedynym wyjściem jest przypisanie do
 * globala. `import` takiego pliku nie zwróciłby niczego. Wykonujemy go więc raz,
 * w JEDNYM miejscu, w osobnym kontekście node:vm z podstawionym globalThis, i
 * przechwytujemy to, co skrypt tam zapisał. Kontekst jest osobny (a nie
 * globalThis testu) po to, żeby skrypt v2–v4 nie zaśmiecił przestrzeni testu —
 * i żeby było widać, że nie potrzebuje niczego z przeglądarki. */
function wczytajMetrics() {
  const zrodlo = readFileSync(new URL('../shared/metrics.js', import.meta.url), 'utf8');
  const kontekst = vm.createContext({});
  // Skrypt sam sprawdza `typeof window`; w tym kontekście window nie istnieje,
  // więc trafia w gałąź globalThis — czyli w obiekt kontekstu poniżej.
  kontekst.globalThis = kontekst;
  vm.runInContext(zrodlo, kontekst, { filename: 'docs/shared/metrics.js' });
  if (!kontekst.Metrics) throw new Error('docs/shared/metrics.js nie wystawił globalnego Metrics');
  return kontekst.Metrics;
}

const Metrics = wczytajMetrics();

/* Tablice i wyjątki z kontekstu vm mają PROTOTYPY tamtego kontekstu, więc
 * assert.deepEqual odrzuciłby je jako "same structure, not reference-equal",
 * a instanceof TypeError byłby fałszem — mimo że treść jest identyczna. Te dwa
 * pomocniki przenoszą wartość do realmu testu, żeby porównanie mówiło o danych,
 * a nie o granicy kontekstów. */
const nasza = (tablica) => Array.from(tablica);
const toTypeError = (err) => err !== null && typeof err === 'object' && err.name === 'TypeError';

/* Siatka wejść. Osiem wartości kanału: oba końce zakresu, sąsiedzi końców
 * (1 i 254 — tam gdzie „prawie czerń” musi zachować się inaczej niż czerń),
 * 17 z odcinka liniowego gammy sRGB oraz punkty rozrzucone po odcinku
 * potęgowym. 8³ = 512 kombinacji, czyli komplet krawędzi bez rozdymania testu. */
const KANALY = [0, 1, 17, 64, 128, 200, 254, 255];

function* siatkaRGB() {
  for (const r of KANALY) for (const g of KANALY) for (const b of KANALY) yield [r, g, b];
}

/* Object.is, a nie ==: rozróżnia null od 0 (o to w całym pliku chodzi)
 * i nie uznaje NaN za różne od NaN. */
const identyczne = (a, b, opis) => assert.ok(Object.is(a, b),
  `${opis}: shared=${JSON.stringify(a)} lib=${JSON.stringify(b)}`);

/* Okna próbek migotania — nazwy mówią, co okno przedstawia. */
const OKNA = {
  stale: [50, 50, 50, 50, 50, 50, 50, 50],
  trend: [10, 20, 30, 40, 50, 60, 70, 80],
  puls: [10, 90, 10, 90, 10, 90, 10, 90],
  drobne: [50, 50.1, 50, 50.1, 50, 50.1, 50, 50.1],
  jednaProbka: [42],
  puste: [],
  zaKrotkie: [1, 2, 3, 4, 5, 6, 7],
  zera: [0, 0, 0, 0, 0, 0, 0, 0]
};

/* ================================================================
   1. Most do klasycznego skryptu
   ================================================================ */

test('most: klasyczny skrypt wystawia Metrics z kompletem funkcji', () => {
  for (const nazwa of ['toLinear', 'toXYZ', 'blueShare', 'brightness', 'colourTemperature',
    'melanopicRatio', 'flicker', 'uniformity', 'comfortIndex', 'zoneFor', 'byId']) {
    assert.equal(typeof Metrics[nazwa], 'function', `shared nie wystawia ${nazwa}`);
  }
  assert.ok(Array.isArray(Metrics.CATALOGUE), 'shared nie wystawia katalogu');
});

test('most: powierzchnie obu redakcji pokrywają się — poza formatValue', () => {
  // formatValue jest warstwą PREZENTACJI (przecinek dziesiętny, myślnik dla
  // braku pomiaru). docs/lib świadomie nie formatuje niczego dla oka, więc
  // odpowiednika nie ma i mieć nie musi. Każda inna nazwa dodana po jednej
  // stronie ma tu zapalić czerwone światło.
  const brakujace = Object.keys(Metrics).filter((k) => !(k in lib));
  assert.deepEqual(brakujace, ['formatValue'],
    `shared wystawia coś, czego lib nie ma: ${brakujace.join(', ')}`);
});

/* ================================================================
   2. Barwa i wielkości z jednej klatki — wartości równe co do bitu
   ================================================================ */

test('toLinear: identyczne co do bitu na wszystkich 256 wartościach kanału', () => {
  for (let i = 0; i <= 255; i += 1) {
    identyczne(Metrics.toLinear(i), lib.toLinear(i), `toLinear(${i})`);
  }
});

test('toXYZ: identyczne co do bitu na całej siatce kanałów', () => {
  for (const [r, g, b] of siatkaRGB()) {
    const s = Metrics.toXYZ(Metrics.toLinear(r), Metrics.toLinear(g), Metrics.toLinear(b));
    const l = lib.toXYZ(lib.toLinear(r), lib.toLinear(g), lib.toLinear(b));
    for (const os of ['X', 'Y', 'Z']) identyczne(s[os], l[os], `toXYZ(${r},${g},${b}).${os}`);
  }
});

test('blueShare: identyczny co do bitu na całej siatce poza czernią', () => {
  let policzone = 0;
  for (const [r, g, b] of siatkaRGB()) {
    if (r + g + b === 0) continue; // czerń ma osobny test różnicy polityki
    identyczne(Metrics.blueShare(r, g, b), lib.blueShare(r, g, b), `blueShare(${r},${g},${b})`);
    policzone += 1;
  }
  assert.equal(policzone, KANALY.length ** 3 - 1, 'siatka się skurczyła');
});

test('brightness: identyczny co do bitu na całej siatce, z czernią włącznie', () => {
  // Jasność sceny jest zwykłą średnią kanałów — dla czerni 0 % jest wynikiem
  // POMIARU, a nie brakiem pomiaru, więc tu obie redakcje zgadzają się wszędzie.
  for (const [r, g, b] of siatkaRGB()) {
    identyczne(Metrics.brightness(r, g, b), lib.brightness(r, g, b), `brightness(${r},${g},${b})`);
  }
});

test('melanopicRatio: identyczny co do bitu na całej siatce poza czernią', () => {
  for (const [r, g, b] of siatkaRGB()) {
    if (r + g + b === 0) continue; // czerń ma osobny test różnicy polityki
    identyczne(Metrics.melanopicRatio(r, g, b), lib.melanopicRatio(r, g, b),
      `melanopicRatio(${r},${g},${b})`);
  }
});

test('colourTemperature: gdy lib podaje kelwiny, są to CO DO BITU kelwiny shared', () => {
  // lib odmawia częściej (patrz różnice polityki niżej), ale nigdy nie liczy
  // inaczej: wielomian McCamy'ego, epicentrum i zaokrąglenie są te same.
  let zgodnych = 0;
  for (const [r, g, b] of siatkaRGB()) {
    const s = Metrics.colourTemperature(r, g, b);
    const l = lib.colourTemperature(r, g, b);
    if (l.kelvin === null) continue;
    identyczne(s.kelvin, l.kelvin, `colourTemperature(${r},${g},${b}).kelvin`);
    assert.equal(s.reliable, l.reliable, `wiarygodność dla (${r},${g},${b}) się rozjechała`);
    zgodnych += 1;
  }
  assert.ok(zgodnych > 100, `za mało wspólnych pomiarów w siatce: ${zgodnych}`);
});

test('colourTemperature: biel ekranu to w obu redakcjach te same 6503 K', () => {
  // Jeden zakotwiczony punkt odniesienia, żeby test nie sprowadzał się do
  // porównania dwóch implementacji tego samego błędu: D65 ma ~6500 K.
  assert.equal(Metrics.colourTemperature(255, 255, 255).kelvin, 6503);
  assert.equal(lib.colourTemperature(255, 255, 255).kelvin, 6503);
});

/* ================================================================
   3. Migotanie
   ================================================================ */

test('flicker: okno stałe, rosnące, pulsujące i ledwo drgające — identycznie', () => {
  for (const nazwa of ['stale', 'trend', 'puls', 'drobne']) {
    const s = Metrics.flicker(OKNA[nazwa], 30);
    const l = lib.flicker(OKNA[nazwa], 30);
    identyczne(s.percent, l.percent, `flicker(${nazwa}).percent`);
    identyczne(s.hz, l.hz, `flicker(${nazwa}).hz`);
    assert.equal(s.withinRange, l.withinRange, `flicker(${nazwa}).withinRange`);
  }
});

test('flicker: okno puste, jednopróbkowe i krótsze niż osiem próbek — obie odmawiają', () => {
  for (const nazwa of ['puste', 'jednaProbka', 'zaKrotkie']) {
    const s = Metrics.flicker(OKNA[nazwa], 30);
    const l = lib.flicker(OKNA[nazwa], 30);
    identyczne(s.percent, l.percent, `flicker(${nazwa}).percent`);
    identyczne(s.hz, l.hz, `flicker(${nazwa}).hz`);
    assert.equal(s.withinRange, false);
    assert.equal(l.withinRange, false);
  }
});

test('flicker: sygnał płaski nie dostaje herców w żadnej z redakcji', () => {
  // Poniżej 0,5 % przejścia przez średnią to szum czujnika, nie częstotliwość.
  for (const nazwa of ['stale', 'drobne']) {
    assert.equal(Metrics.flicker(OKNA[nazwa], 30).hz, null, nazwa);
    assert.equal(lib.flicker(OKNA[nazwa], 30).hz, null, nazwa);
  }
});

/* ================================================================
   4. Równomierność
   ================================================================ */

test('uniformity: komórki równe, jedna zerowa, wszystkie zerowe — identycznie', () => {
  const siatki = {
    rowne: [10, 10, 10, 10],
    jednaZerowa: [0, 10, 10, 10],
    wszystkieZerowe: [0, 0, 0, 0],
    nierowne: [3, 7, 11, 29]
  };
  for (const [nazwa, komorki] of Object.entries(siatki)) {
    identyczne(Metrics.uniformity(komorki), lib.uniformity(komorki), `uniformity(${nazwa})`);
  }
  // Zakotwiczenie znaczeń, żeby zgodność nie była zgodnością dwóch pomyłek.
  assert.equal(lib.uniformity([10, 10, 10, 10]), 100, 'idealnie równe światło to 100 %');
  assert.equal(lib.uniformity([0, 10, 10, 10]), 0, 'martwa komórka to 0 % równomierności');
  assert.equal(lib.uniformity([0, 0, 0, 0]), null, 'ciemność nie ma równomierności');
});

test('uniformity: mniej niż dwie komórki to w obu redakcjach brak pomiaru', () => {
  for (const komorki of [[], [5]]) {
    identyczne(Metrics.uniformity(komorki), lib.uniformity(komorki),
      `uniformity(${JSON.stringify(komorki)})`);
  }
});

/* ================================================================
   5. Komfort
   ================================================================ */

const WEJSCIA_KOMFORTU = {
  dobreWieczorne: { melanopic: 0.4, kelvin: 2700, flickerPercent: 2, uniformity: 90 },
  zleBiurowe: { melanopic: 1.4, kelvin: 7000, flickerPercent: 35, uniformity: 10 },
  posrednie: { melanopic: 0.9, kelvin: 5000, flickerPercent: 12, uniformity: 45 },
  tuzNadProgami: { melanopic: 0.76, kelvin: 4001, flickerPercent: 5.1, uniformity: 59.9 },
  samMelanopic: { melanopic: 0.4 },
  samKelvin: { kelvin: 6500 },
  brakujaceJakoNull: { melanopic: null, kelvin: null, flickerPercent: null, uniformity: 40 }
};

test('comfortIndex: ocena i rozbicie kar identyczne co do bitu', () => {
  for (const [nazwa, wejscie] of Object.entries(WEJSCIA_KOMFORTU)) {
    const s = Metrics.comfortIndex(wejscie);
    const l = lib.comfortIndex(wejscie);
    identyczne(s.score, l.score, `comfortIndex(${nazwa}).score`);
    assert.equal(s.penalties.length, l.penalties.length, `liczba kar dla ${nazwa}`);
    for (let i = 0; i < s.penalties.length; i += 1) {
      assert.equal(s.penalties[i].id, l.penalties[i].id, `${nazwa}: id kary ${i}`);
      assert.equal(s.penalties[i].labelPL, l.penalties[i].labelPL, `${nazwa}: etykieta kary ${i}`);
      identyczne(s.penalties[i].points, l.penalties[i].points, `${nazwa}: punkty kary ${i}`);
    }
  }
});

test('comfortIndex: brakująca wielkość nie karze w żadnej z redakcji', () => {
  // Wielkość niezmierzona nie może udawać dobrego wyniku ANI złego. Kolejność
  // kar też musi się zgadzać, bo interfejs podświetla pierwszą z listy.
  const bezMigotania = { melanopic: 1.4, kelvin: 7000, uniformity: 10 };
  const zMigotaniem = { ...bezMigotania, flickerPercent: 35 };
  const s = Metrics.comfortIndex(bezMigotania);
  const l = lib.comfortIndex(bezMigotania);
  identyczne(s.score, l.score, 'score bez migotania');
  assert.deepEqual(nasza(s.penalties).map((p) => p.id), l.penalties.map((p) => p.id));
  assert.ok(Metrics.comfortIndex(zMigotaniem).score < s.score,
    'dołożenie zmierzonego migotania musi obniżyć ocenę');
});

test('comfortIndex: próg istotności kary (0,5 pkt) leży tam samo w obu redakcjach', () => {
  // Kara poniżej progu ma zniknąć i z listy, i z oceny — w obu redakcjach
  // razem, inaczej rozbicie przestaje sumować się do wyniku.
  const podProgiem = { melanopic: 0.755 };   // 0,005 × 55 = 0,275 pkt
  const nadProgiem = { melanopic: 0.76 };    // 0,010 × 55 = 0,550 pkt
  for (const wejscie of [podProgiem, nadProgiem]) {
    const s = Metrics.comfortIndex(wejscie);
    const l = lib.comfortIndex(wejscie);
    identyczne(s.score, l.score, `score dla ${JSON.stringify(wejscie)}`);
    assert.equal(s.penalties.length, l.penalties.length, `kary dla ${JSON.stringify(wejscie)}`);
  }
  assert.equal(lib.comfortIndex(podProgiem).penalties.length, 0, 'kara 0,275 pkt nie istnieje');
  assert.equal(lib.comfortIndex(nadProgiem).penalties.length, 1, 'kara 0,55 pkt już istnieje');
});

/* ================================================================
   6. Strefy
   ================================================================ */

/* Nazwy stref różnią się zapisem (patrz test różnicy polityki niżej), więc
 * porównanie idzie po ZNACZENIU, nie po napisie. */
const TLUMACZENIE_STREF = { critical: 'crit', warning: 'warn', good: 'good' };
const przetlumacz = (strefa) => (strefa === null ? null : TLUMACZENIE_STREF[strefa]);

test('zoneFor: ten sam podział na strefy dla wielkości rosnącej', () => {
  // Progi udziału niebieskiego: 26 % ostrzega, 33 % jest krytyczne.
  for (const v of [0, 10, 25.9, 26, 26.1, 30, 32.9, 33, 33.1, 100]) {
    const s = przetlumacz(Metrics.zoneFor(v, 26, 33, false));
    const l = lib.zoneFor(v, 26, 33, false);
    assert.equal(s, l, `strefa dla ${v} (rosnąca)`);
  }
});

test('zoneFor: ten sam podział na strefy dla wielkości odwróconych', () => {
  // Równomierność (60/35) i komfort (70/45) — tu MNIEJ znaczy gorzej.
  for (const [warn, crit] of [[60, 35], [70, 45]]) {
    for (const v of [0, 34.9, 35, 35.1, 44.9, 45, 45.1, 59.9, 60, 60.1, 69.9, 70, 70.1, 100]) {
      const s = przetlumacz(Metrics.zoneFor(v, warn, crit, true));
      const l = lib.zoneFor(v, warn, crit, true);
      assert.equal(s, l, `strefa dla ${v} (odwrócona, ${warn}/${crit})`);
    }
  }
});

test('zoneFor: wartość dokładnie na progu należy w obu redakcjach do gorszej strefy', () => {
  assert.equal(przetlumacz(Metrics.zoneFor(26, 26, 33, false)), 'warn');
  assert.equal(lib.zoneFor(26, 26, 33, false), 'warn');
  assert.equal(przetlumacz(Metrics.zoneFor(33, 26, 33, false)), 'crit');
  assert.equal(lib.zoneFor(33, 26, 33, false), 'crit');
  assert.equal(przetlumacz(Metrics.zoneFor(60, 60, 35, true)), 'warn');
  assert.equal(lib.zoneFor(60, 60, 35, true), 'warn');
});

test('zoneFor: brak pomiaru to null w obu redakcjach, nigdy strefa dobra', () => {
  for (const v of [null, undefined, NaN, Infinity, -Infinity]) {
    identyczne(Metrics.zoneFor(v, 26, 33, false), lib.zoneFor(v, 26, 33, false),
      `zoneFor(${String(v)})`);
  }
});

test('zoneFor: progi z obu katalogów dzielą te same wartości tak samo', () => {
  // Sprzęgnięcie stref z katalogiem: gdyby próg rozjechał się między
  // redakcjami, ta sama scena zmieniłaby kolor w v3 i w v5.
  for (const m of Metrics.CATALOGUE) {
    const l = lib.byId(m.id);
    for (const v of [m.min, m.warn, m.crit, (m.min + m.max) / 2, m.max]) {
      assert.equal(przetlumacz(Metrics.zoneFor(v, m.warn, m.crit, m.invert)),
        lib.zoneFor(v, l.warn, l.crit, l.invert), `${m.id} przy ${v}`);
    }
  }
});

/* ================================================================
   7. RÓŻNICE POLITYKI — świadome, opisane, przetestowane
   ================================================================ */

test('RÓŻNICA POKOLEŃ: czarny kadr — shared podaje 0 % udziału niebieskiego, lib null', () => {
  // Czerń nie ma barwy: iloraz b/(r+g+b) jest przy zerowym mianowniku
  // nieoznaczony. Starsza redakcja zwraca 0, co strefy czytają jako wynik
  // WZOROWY („zero niebieskiego”), choć nic nie zmierzono. Nowsza mówi null.
  assert.equal(Metrics.blueShare(0, 0, 0), 0);
  assert.equal(lib.blueShare(0, 0, 0), null);
  // Skutek dla interfejsu, czyli dlaczego to nie jest kosmetyka:
  assert.equal(Metrics.zoneFor(Metrics.blueShare(0, 0, 0), 26, 33, false), 'good');
  assert.equal(lib.zoneFor(lib.blueShare(0, 0, 0), 26, 33, false), null);
});

test('RÓŻNICA POKOLEŃ: czarny kadr — shared podaje melanopic 0, lib null', () => {
  // Ten sam powód: stosunek melanopiczny przy zerowej jasności to 0/0.
  assert.equal(Metrics.melanopicRatio(0, 0, 0), 0);
  assert.equal(lib.melanopicRatio(0, 0, 0), null);
});

test('RÓŻNICA POKOLEŃ: okno samych zer — shared podaje 0 % migotania, lib null', () => {
  // (max − min) / (max + min) przy samych zerach to znów 0/0. Starsza redakcja
  // domyka to zerem, czyli „światło idealnie stabilne”, choć światła nie było.
  assert.equal(Metrics.flicker(OKNA.zera, 30).percent, 0);
  assert.equal(lib.flicker(OKNA.zera, 30).percent, null);
  // Herców nie podaje żadna z redakcji — tu różnicy nie ma.
  assert.equal(Metrics.flicker(OKNA.zera, 30).hz, null);
  assert.equal(lib.flicker(OKNA.zera, 30).hz, null);
});

test('RÓŻNICA POKOLEŃ: bez częstotliwości próbkowania shared podstawia 1 Hz, lib zwraca null', () => {
  // `sampleHz || 1` w starszej redakcji zamienia brak osi czasu w oś czasu
  // zastępczą i zwraca liczbę herców, której nikt nie zmierzył. Procent
  // migotania jest w obu przypadkach ten sam — okno go zna bez zegara.
  for (const brakZegara of [undefined, 0, null]) {
    const s = Metrics.flicker(OKNA.puls, brakZegara);
    const l = lib.flicker(OKNA.puls, brakZegara);
    identyczne(s.percent, l.percent, 'procent migotania nie zależy od zegara');
    assert.equal(typeof s.hz, 'number', `shared podstawia herce przy sampleHz=${String(brakZegara)}`);
    assert.equal(l.hz, null, `lib odmawia herców przy sampleHz=${String(brakZegara)}`);
    // Obie redakcje przynajmniej nie UFAJĄ tej liczbie.
    assert.equal(s.withinRange, false);
    assert.equal(l.withinRange, false);
  }
});

test('RÓŻNICA POKOLEŃ: shared zawsze podaje kelwiny (zaciśnięte 1500–12500), lib tylko wiarygodne', () => {
  // Starsza redakcja zwraca liczbę nawet wtedy, gdy wielomian McCamy'ego
  // wyszedł poza swój zakres ważności — zaciska ją do końców skali i dokłada
  // flagę `reliable: false`. Nowsza w takim wypadku nie podaje liczby wcale,
  // bo zaciśnięta wartość wygląda w interfejsie jak pomiar.
  const glebokiNiebieski = [0, 0, 255];
  const s = Metrics.colourTemperature(...glebokiNiebieski);
  const l = lib.colourTemperature(...glebokiNiebieski);
  assert.equal(typeof s.kelvin, 'number');
  assert.equal(s.reliable, false, 'shared przynajmniej oznacza to jako niewiarygodne');
  assert.equal(l.kelvin, null, 'lib nie podaje kelwinów, którym nie ufa');
  assert.equal(l.reliable, false);
  // Zaciśnięcie shared trzyma się deklarowanych końców na całej siatce.
  for (const [r, g, b] of siatkaRGB()) {
    const k = Metrics.colourTemperature(r, g, b).kelvin;
    if (k === null) continue;
    assert.ok(k >= 1500 && k <= 12500, `shared wypuścił ${k} K poza zacisk`);
  }
});

test('RÓŻNICA POKOLEŃ: lib odrzuca barwy daleko od krzywej Plancka (Duv), shared o Duv nie wie', () => {
  // Wielomian McCamy'ego zwraca kelwiny dla KAŻDEJ chromatyczności, także dla
  // czystej zieleni, która nie jest światłem białym w żadnym stopniu. Nowsza
  // redakcja liczy odległość od krzywej Plancka (Duv) i powyżej 0,05 odmawia;
  // starsza takiej bramki nie ma i melduje 6069 K jako WIARYGODNE.
  const czystaZielen = [0, 255, 0];
  const s = Metrics.colourTemperature(...czystaZielen);
  const l = lib.colourTemperature(...czystaZielen);
  assert.equal(s.kelvin, 6069);
  assert.equal(s.reliable, true, 'starsza redakcja uważa zieleń za wiarygodną biel');
  assert.equal(l.kelvin, null);
  assert.ok(Math.abs(l.duv) > 0.05, `Duv zieleni ma być poza bramką, jest ${l.duv}`);
  // Pole `duv` istnieje tylko w nowszej redakcji — to nadwyżka, nie rozbieżność.
  assert.equal(s.duv, undefined);
});

test('RÓŻNICA POKOLEŃ: nazwy stref — shared mówi warning/critical, lib warn/crit', () => {
  // Różnica jest wyłącznie w napisie; podział wartości jest identyczny
  // (pilnują tego testy stref wyżej). Warstwy widoku v2–v4 i v5 mają własne
  // mapy klas CSS, więc napisu nie wolno „ujednolicić” w jednej z nich bez
  // poprawienia drugiej — stąd ten test.
  assert.equal(Metrics.zoneFor(40, 26, 33, false), 'critical');
  assert.equal(lib.zoneFor(40, 26, 33, false), 'crit');
  assert.equal(Metrics.zoneFor(30, 26, 33, false), 'warning');
  assert.equal(lib.zoneFor(30, 26, 33, false), 'warn');
  assert.equal(Metrics.zoneFor(10, 26, 33, false), 'good');
  assert.equal(lib.zoneFor(10, 26, 33, false), 'good', 'strefa dobra nazywa się tak samo');
});

test('RÓŻNICA POKOLEŃ: comfortIndex bez ani jednego wejścia — shared measured=true, lib false', () => {
  // Pole `measured` odpowiada na pytanie „czy tę ocenę w ogóle było z czego
  // policzyć”. Starsza redakcja wnioskuje je z wyniku (score === 100), więc
  // pusty pomiar jest nieodróżnialny od pomiaru wzorowego. Nowsza liczy
  // faktyczne wejścia. Sama ocena 100/100 jest w obu ta sama.
  for (const puste of [{}, { melanopic: null, kelvin: null, flickerPercent: null, uniformity: null }]) {
    const s = Metrics.comfortIndex(puste);
    const l = lib.comfortIndex(puste);
    identyczne(s.score, l.score, 'ocena bez wejść');
    assert.equal(s.measured, true, 'shared uznaje brak pomiaru za pomiar');
    assert.equal(l.measured, false, 'lib odróżnia brak pomiaru od wyniku wzorowego');
  }
});

test('RÓŻNICA POKOLEŃ: comfortIndex na null — shared rzuca TypeError, lib zwraca pusty wynik', () => {
  assert.throws(() => Metrics.comfortIndex(null), toTypeError);
  const l = lib.comfortIndex(null);
  assert.equal(l.score, 100);
  assert.equal(l.measured, false);
});

test('RÓŻNICA POKOLEŃ: NaN jako wielkość — shared zatruwa ocenę, lib pomija wejście', () => {
  // `typeof NaN === 'number'` przechodzi przez bramkę starszej redakcji, więc
  // NaN wchodzi do arytmetyki i wychodzi jako ocena NaN — dopiero na wskaźniku,
  // daleko od przyczyny. Nowsza wymaga wartości skończonej.
  const wejscie = { melanopic: NaN, kelvin: 5000 };
  assert.ok(Number.isNaN(Metrics.comfortIndex(wejscie).score), 'shared przepuszcza NaN do oceny');
  assert.equal(lib.comfortIndex(wejscie).score, 92, 'lib liczy z samych zmierzonych wielkości');
});

test('RÓŻNICA POKOLEŃ: wejście spoza zakresu kanału — shared liczy dalej, lib zwraca null', () => {
  // Kanał 8-bitowy ma 0..255. Poza tym zakresem funkcja przejścia sRGB nie jest
  // zdefiniowana, a null w miejscu kanału starsza redakcja po cichu zamienia
  // w zero (null * liczba === 0), czyli w czerń, której nikt nie zmierzył.
  assert.equal(typeof Metrics.brightness(300, 0, 0), 'number');
  assert.equal(lib.brightness(300, 0, 0), null);
  assert.equal(typeof Metrics.brightness(-5, 0, 0), 'number');
  assert.equal(lib.brightness(-5, 0, 0), null);
  assert.equal(Metrics.blueShare(null, 10, 10), 50, 'null w kanale udaje w shared czerń');
  assert.equal(lib.blueShare(null, 10, 10), null);
});

test('RÓŻNICA POKOLEŃ: uszkodzona próbka lub komórka — shared liczy dalej, lib odmawia', () => {
  // Dziura w równomiernym próbkowaniu przesuwa oś czasu, więc okno z jedną
  // zepsutą próbką nie jest pomiarem; pominięcie martwej komórki zawyżyłoby
  // równomierność. Starsza redakcja nie sprawdza wejścia w ogóle.
  const zNaN = [50, 50, NaN, 50, 50, 50, 50, 50];
  const zUjemna = [50, 50, -1, 50, 50, 50, 50, 50];
  assert.equal(Metrics.flicker(zNaN, 30).percent, 0, 'porównania z NaN cicho zawodzą');
  assert.equal(lib.flicker(zNaN, 30).percent, null);
  assert.ok(Metrics.flicker(zUjemna, 30).percent > 100, 'shared wypuszcza nawet ponad 100 %');
  assert.equal(lib.flicker(zUjemna, 30).percent, null);
  assert.equal(Metrics.uniformity([10, NaN, 10]), 100, 'shared melduje idealną równomierność');
  assert.equal(lib.uniformity([10, NaN, 10]), null);
});

/* ================================================================
   8. Katalog wielkości
   ================================================================ */

/* Pola porównywane pozycja po pozycji. `icon` NIE jest tu wymieniony — patrz
 * osobny test nadwyżki niżej. */
const POLA_KATALOGU = ['id', 'namePL', 'shortPL', 'helpPL', 'unit',
  'min', 'max', 'decimals', 'warn', 'crit', 'invert'];

test('katalog: te same wielkości w tej samej kolejności', () => {
  assert.deepEqual(nasza(Metrics.CATALOGUE).map((m) => m.id), lib.CATALOGUE.map((m) => m.id));
  assert.equal(lib.CATALOGUE.length, 7, 'katalog ma siedem wielkości');
});

test('katalog: wszystkie jedenaście pól zgadza się pozycja po pozycji', () => {
  // Nazwy, jednostki i opisy też, nie tylko liczby: katalog jest jedynym domem
  // napisów widocznych dla użytkownika, a v2–v4 i v5 mówią do tego samego
  // człowieka. Progi (warn/crit/invert) porównywane są tu razem z opisami,
  // bo rozjazd progu jest zmianą pomiaru, a rozjazd opisu — zmianą znaczenia.
  for (let i = 0; i < lib.CATALOGUE.length; i += 1) {
    const s = Metrics.CATALOGUE[i];
    const l = lib.CATALOGUE[i];
    for (const pole of POLA_KATALOGU) {
      identyczne(s[pole], l[pole], `CATALOGUE[${i}] (${l.id}).${pole}`);
    }
  }
});

test('katalog: icon występuje tylko w lib — dopuszczalna nadwyżka warstwy widoku', () => {
  // `icon` to podpowiedź dla warstwy widoku v5; biblioteka jej nie używa,
  // a v2–v4 mają własne ikony w szablonach. To jedyne pole, które wolno mieć
  // po jednej stronie — każde inne dołożone tu czy tam ma wywalić ten test.
  const nadwyzkaLib = new Set(lib.CATALOGUE.flatMap((m) => Object.keys(m))
    .filter((k) => !POLA_KATALOGU.includes(k)));
  const nadwyzkaShared = new Set(nasza(Metrics.CATALOGUE).flatMap((m) => Object.keys(m))
    .filter((k) => !POLA_KATALOGU.includes(k)));
  assert.deepEqual([...nadwyzkaLib], ['icon']);
  assert.deepEqual([...nadwyzkaShared], []);
  for (const m of lib.CATALOGUE) {
    assert.equal(typeof m.icon, 'string', `${m.id}: icon ma być napisem`);
  }
});

test('katalog: byId znajduje tę samą pozycję i tak samo mówi „nie ma”', () => {
  for (const m of lib.CATALOGUE) {
    const s = Metrics.byId(m.id);
    const l = lib.byId(m.id);
    assert.ok(s && l, `byId(${m.id}) nic nie znalazło`);
    for (const pole of POLA_KATALOGU) identyczne(s[pole], l[pole], `byId(${m.id}).${pole}`);
  }
  identyczne(Metrics.byId('nieistniejaca'), lib.byId('nieistniejaca'), 'byId dla obcego id');
});
