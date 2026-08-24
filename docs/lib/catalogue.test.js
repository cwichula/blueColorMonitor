/* Testy katalogu wielkości.
 *
 * Katalog jest jedynym źródłem prawdy o wielkościach: z niego bierze się nazwy,
 * jednostki, zakresy suwaków, progi stref i podział na darmowe i płatne.
 * Testy sprawdzają spójność wewnętrzną (nie ma drugiej listy, która mogłaby się
 * rozjechać) oraz to, że opisane kierunki zgadzają się z fizyką wielkości:
 * równomierność i komfort są odwrócone, bo w nich WIĘCEJ znaczy lepiej.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CATALOGUE, byId, FREE_IDS, PREMIUM_IDS } from './catalogue.js';

test('katalog ma dokładnie siedem pozycji', () => {
  assert.ok(Array.isArray(CATALOGUE));
  assert.equal(CATALOGUE.length, 7);
});

test('identyfikatory są niepuste i niepowtarzalne', () => {
  const ids = CATALOGUE.map((m) => m.id);
  for (const id of ids) {
    assert.equal(typeof id, 'string');
    assert.ok(id.length > 0);
  }
  assert.equal(new Set(ids).size, ids.length, 'identyfikatory się powtarzają');
});

test('katalog obejmuje wszystkie siedem wielkości aplikacji', () => {
  const ids = CATALOGUE.map((m) => m.id).sort();
  assert.deepEqual(ids,
    ['brightness', 'comfort', 'flicker', 'kelvin', 'melanopic', 'share', 'uniformity'].sort());
});

test('każda pozycja ma komplet pól opisowych po polsku', () => {
  for (const m of CATALOGUE) {
    assert.equal(typeof m.namePL, 'string', `${m.id}: brak nazwy`);
    assert.ok(m.namePL.length > 0, `${m.id}: pusta nazwa`);
    assert.equal(typeof m.unit, 'string', `${m.id}: brak jednostki`);
    assert.equal(typeof m.shortPL, 'string', `${m.id}: brak krótkiego opisu`);
    assert.ok(m.shortPL.length > 0, `${m.id}: pusty opis`);
    assert.equal(typeof m.helpPL, 'string', `${m.id}: brak opisu rozszerzonego`);
    assert.equal(typeof m.premium, 'boolean', `${m.id}: brak podziału darmowe/płatne`);
    assert.equal(typeof m.invert, 'boolean', `${m.id}: brak kierunku wielkości`);
  }
});

test('zakresy suwaków są sensowne: min < max, a progi leżą wewnątrz', () => {
  for (const m of CATALOGUE) {
    assert.equal(typeof m.min, 'number', `${m.id}: min`);
    assert.equal(typeof m.max, 'number', `${m.id}: max`);
    assert.ok(m.min < m.max, `${m.id}: min (${m.min}) musi być poniżej max (${m.max})`);
    assert.ok(m.warn >= m.min && m.warn <= m.max, `${m.id}: próg warn poza zakresem`);
    assert.ok(m.crit >= m.min && m.crit <= m.max, `${m.id}: próg crit poza zakresem`);
  }
});

test('kierunek progów zgadza się z polem invert', () => {
  for (const m of CATALOGUE) {
    if (m.invert) {
      assert.ok(m.crit < m.warn,
        `${m.id}: wielkość odwrócona ma mieć crit poniżej warn (${m.crit} vs ${m.warn})`);
    } else {
      assert.ok(m.crit > m.warn,
        `${m.id}: wielkość rosnąca ma mieć crit powyżej warn (${m.crit} vs ${m.warn})`);
    }
  }
});

test('odwrócone są dokładnie te wielkości, w których więcej znaczy lepiej', () => {
  const odwrocone = CATALOGUE.filter((m) => m.invert).map((m) => m.id).sort();
  assert.deepEqual(odwrocone, ['comfort', 'uniformity']);
});

test('liczba miejsc po przecinku pasuje do skali wielkości', () => {
  for (const m of CATALOGUE) {
    assert.ok(Number.isInteger(m.decimals) && m.decimals >= 0 && m.decimals <= 3,
      `${m.id}: dziwna liczba miejsc po przecinku (${m.decimals})`);
  }
  // Współczynnik melanopiczny zmienia się w setnych — bez miejsc po przecinku
  // wskaźnik pokazywałby stale "1".
  assert.ok(byId('melanopic').decimals >= 2, 'melanopic potrzebuje setnych');
});

test('byId znajduje każdą pozycję katalogu', () => {
  for (const m of CATALOGUE) {
    const znaleziona = byId(m.id);
    assert.ok(znaleziona, `byId(${m.id}) nic nie znalazło`);
    assert.deepEqual(znaleziona, m, `byId(${m.id}) zwraca coś innego niż katalog`);
  }
});

test('byId dla nieznanego identyfikatora zwraca null, a nie wyjątek', () => {
  assert.equal(byId('nie-ma-takiej'), null);
  assert.equal(byId(''), null);
  assert.equal(byId(null), null);
  assert.equal(byId(), null);
});

test('FREE_IDS i PREMIUM_IDS razem dają cały katalog i nie zachodzą na siebie', () => {
  const wszystkie = CATALOGUE.map((m) => m.id).sort();
  assert.deepEqual([...FREE_IDS, ...PREMIUM_IDS].sort(), wszystkie);
  const wspolne = FREE_IDS.filter((id) => PREMIUM_IDS.includes(id));
  assert.deepEqual(wspolne, [], 'wielkość nie może być naraz darmowa i płatna');
});

test('podział darmowe/płatne zgadza się z polem premium', () => {
  for (const m of CATALOGUE) {
    if (m.premium) assert.ok(PREMIUM_IDS.includes(m.id), `${m.id} oznaczone premium, ale brak w PREMIUM_IDS`);
    else assert.ok(FREE_IDS.includes(m.id), `${m.id} darmowe, ale brak w FREE_IDS`);
  }
});

test('udział niebieskiego jest darmowy — to pierwotna wielkość aplikacji', () => {
  assert.ok(FREE_IDS.includes('share'));
  assert.equal(byId('share').premium, false);
});

test('obie listy identyfikatorów są niepuste', () => {
  assert.ok(FREE_IDS.length > 0, 'coś musi być dostępne bez opłaty');
  assert.ok(PREMIUM_IDS.length > 0, 'inaczej podział nie miałby sensu');
});
