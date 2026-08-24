/* Testy podziału na strefy.
 *
 * Strefa to jedyny wspólny język koloru w aplikacji, więc testy pilnują trzech
 * rzeczy: że próg należy do strefy GORSZEJ (wartość dokładnie na progu ostrzega,
 * a nie uspokaja), że `invert` odwraca kierunek dla wielkości, w których więcej
 * znaczy lepiej, oraz że brak pomiaru daje null — nigdy "good".
 * Nazwy stref są kanoniczne: good / warn / crit.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { zoneFor, zonesFor, DEFAULT_THRESHOLDS } from './zones.js';

/* ---------------- zoneFor ---------------- */

test('wielkość rosnąca: obie strony progów', () => {
  // Udział niebieskiego: 26 % ostrzega, 33 % jest krytyczne.
  assert.equal(zoneFor(10, 26, 33, false), 'good');
  assert.equal(zoneFor(25.9, 26, 33, false), 'good');
  assert.equal(zoneFor(30, 26, 33, false), 'warn');
  assert.equal(zoneFor(32.9, 26, 33, false), 'warn');
  assert.equal(zoneFor(40, 26, 33, false), 'crit');
});

test('wielkość rosnąca: wartość dokładnie na progu należy do gorszej strefy', () => {
  assert.equal(zoneFor(26, 26, 33, false), 'warn', 'próg ostrzeżenia już ostrzega');
  assert.equal(zoneFor(33, 26, 33, false), 'crit', 'próg krytyczny już jest krytyczny');
});

test('wielkość odwrócona: obie strony progów', () => {
  // Równomierność: 60 % ostrzega, 35 % jest krytyczne — tu MNIEJ znaczy gorzej.
  assert.equal(zoneFor(100, 60, 35, true), 'good');
  assert.equal(zoneFor(60.1, 60, 35, true), 'good');
  assert.equal(zoneFor(50, 60, 35, true), 'warn');
  assert.equal(zoneFor(35.1, 60, 35, true), 'warn');
  assert.equal(zoneFor(10, 60, 35, true), 'crit');
});

test('wielkość odwrócona: wartość dokładnie na progu należy do gorszej strefy', () => {
  assert.equal(zoneFor(60, 60, 35, true), 'warn');
  assert.equal(zoneFor(35, 60, 35, true), 'crit');
});

test('invert naprawdę odwraca ocenę tej samej liczby', () => {
  assert.equal(zoneFor(90, 60, 35, false), 'crit');
  assert.equal(zoneFor(90, 60, 35, true), 'good');
});

test('brak pomiaru to null, nigdy strefa dobra', () => {
  assert.equal(zoneFor(null, 26, 33, false), null);
  assert.equal(zoneFor(undefined, 26, 33, false), null);
  assert.equal(zoneFor(NaN, 26, 33, false), null);
  assert.equal(zoneFor(Infinity, 26, 33, false), null);
  assert.equal(zoneFor(null, 60, 35, true), null, 'także przy odwróceniu');
});

test('zwracane nazwy stref są kanoniczne', () => {
  const dozwolone = new Set(['good', 'warn', 'crit', null]);
  for (const v of [-100, 0, 26, 33, 1e6, null, NaN]) {
    assert.ok(dozwolone.has(zoneFor(v, 26, 33, false)), `nieznana strefa dla ${v}`);
    assert.ok(dozwolone.has(zoneFor(v, 60, 35, true)), `nieznana strefa dla ${v} (invert)`);
  }
});

test('pominięty argument invert znaczy kierunek rosnący', () => {
  assert.equal(zoneFor(40, 26, 33), 'crit');
  assert.equal(zoneFor(10, 26, 33), 'good');
});

/* ---------------- DEFAULT_THRESHOLDS ---------------- */

test('DEFAULT_THRESHOLDS zawiera progi wszystkich siedmiu wielkości', () => {
  const oczekiwane = ['share', 'brightness', 'kelvin', 'melanopic', 'flicker', 'uniformity', 'comfort'];
  for (const id of oczekiwane) {
    const t = DEFAULT_THRESHOLDS[id];
    assert.ok(t, `brak progów dla ${id}`);
    assert.equal(typeof t.warn, 'number', `warn dla ${id} nie jest liczbą`);
    assert.equal(typeof t.crit, 'number', `crit dla ${id} nie jest liczbą`);
  }
});

test('DEFAULT_THRESHOLDS: progi układają się w kierunku wielkości', () => {
  // Dla wielkości rosnących crit leży wyżej niż warn, dla odwróconych niżej.
  const rosnace = ['share', 'brightness', 'kelvin', 'melanopic', 'flicker'];
  const odwrocone = ['uniformity', 'comfort'];
  for (const id of rosnace) {
    const t = DEFAULT_THRESHOLDS[id];
    assert.ok(t.crit > t.warn, `${id}: crit (${t.crit}) powinno być powyżej warn (${t.warn})`);
  }
  for (const id of odwrocone) {
    const t = DEFAULT_THRESHOLDS[id];
    assert.ok(t.crit < t.warn, `${id}: crit (${t.crit}) powinno być poniżej warn (${t.warn})`);
  }
});

/* ---------------- zonesFor ---------------- */

test('zonesFor: dobre światło wieczorne jest zielone we wszystkich wielkościach', () => {
  const z = zonesFor({
    share: 20, brightness: 40, kelvin: 2700, melanopic: 0.4,
    flicker: 2, uniformity: 90, comfort: 95
  }, DEFAULT_THRESHOLDS);
  for (const [id, strefa] of Object.entries(z)) {
    assert.equal(strefa, 'good', `${id} powinno być w strefie dobrej`);
  }
});

test('zonesFor: złe światło jest czerwone we wszystkich wielkościach', () => {
  const z = zonesFor({
    share: 45, brightness: 95, kelvin: 7000, melanopic: 1.4,
    flicker: 35, uniformity: 10, comfort: 20
  }, DEFAULT_THRESHOLDS);
  for (const [id, strefa] of Object.entries(z)) {
    assert.equal(strefa, 'crit', `${id} powinno być w strefie krytycznej`);
  }
});

test('zonesFor: równomierność i komfort są odwrócone — wysoka wartość jest dobra', () => {
  // Gdyby zonesFor zgubił invert, 100 % równomierności wyszłoby krytyczne.
  const wysokie = zonesFor({ uniformity: 100, comfort: 100 }, DEFAULT_THRESHOLDS);
  assert.equal(wysokie.uniformity, 'good', 'idealnie równe światło nie jest wadą');
  assert.equal(wysokie.comfort, 'good', 'komfort 100/100 nie jest wadą');

  const niskie = zonesFor({ uniformity: 10, comfort: 10 }, DEFAULT_THRESHOLDS);
  assert.equal(niskie.uniformity, 'crit');
  assert.equal(niskie.comfort, 'crit');
});

test('zonesFor: brak pomiaru daje null dla tej wielkości', () => {
  const z = zonesFor({ share: null, brightness: 40, kelvin: NaN }, DEFAULT_THRESHOLDS);
  assert.equal(z.share, null, 'null nie może zamienić się w strefę dobrą');
  assert.equal(z.kelvin, null, 'NaN też nie');
  assert.equal(z.brightness, 'good');
});

test('zonesFor: nieznana wielkość nie wywraca wyniku', () => {
  const z = zonesFor({ share: 20, zmyslona: 123 }, DEFAULT_THRESHOLDS);
  assert.equal(z.share, 'good');
  assert.ok(z.zmyslona === undefined || z.zmyslona === null,
    `wielkość bez progów nie może dostać strefy, jest ${z.zmyslona}`);
});

test('zonesFor: brak wejścia zwraca pusty obiekt, a nie wyjątek', () => {
  for (const w of [{}, null, undefined]) {
    const z = zonesFor(w, DEFAULT_THRESHOLDS);
    assert.equal(typeof z, 'object');
    assert.notEqual(z, null);
  }
});

test('zonesFor bez podanych progów korzysta z domyślnych', () => {
  const z = zonesFor({ share: 45 });
  assert.equal(z.share, 'crit', 'domyślne progi mają być wbudowane');
});

test('zonesFor: własne progi mają pierwszeństwo przed domyślnymi', () => {
  const z = zonesFor({ share: 45 }, { share: { warn: 50, crit: 60 } });
  assert.equal(z.share, 'good', 'przy luźniejszym progu 45 % jest w normie');
});

test('zonesFor zgadza się z zoneFor wywołanym wprost', () => {
  const t = DEFAULT_THRESHOLDS.share;
  const z = zonesFor({ share: 30 }, DEFAULT_THRESHOLDS);
  assert.equal(z.share, zoneFor(30, t.warn, t.crit, false));
});
