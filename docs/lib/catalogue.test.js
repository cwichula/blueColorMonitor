/* Testy katalogu wielkości.
 *
 * Katalog jest jedynym źródłem prawdy o wielkościach: z niego bierze się nazwy,
 * jednostki, zakresy suwaków i progi stref. Testy sprawdzają spójność wewnętrzną
 * oraz to, że opisane kierunki zgadzają się z fizyką wielkości: równomierność
 * i komfort są odwrócone, bo w nich WIĘCEJ znaczy lepiej.
 *
 * Osobna grupa testów na końcu pilnuje, że katalog nie odzyska pola ani list,
 * którymi dałoby się warunkować dostęp do którejkolwiek wielkości.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as katalog from './catalogue.js';
import { CATALOGUE, byId } from './catalogue.js';

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

/* --- Straż nad regresją: nic tu nie warunkuje dostępu do wielkości. --- *
 *
 * Te trzy testy nie sprawdzają nowej funkcjonalności — pilnują, żeby jedno
 * pole dopisane „dla zgodności” nie dało znowu czym dzielić katalogu.
 */

test('żadna pozycja katalogu nie ma już pola premium', () => {
  for (const m of CATALOGUE) {
    assert.equal(Object.prototype.hasOwnProperty.call(m, 'premium'), false,
      `${m.id}: pole premium wróciło do katalogu — wszystkie wielkości są dostępne bez warunków`);
  }
});

test('moduł nie wystawia już list FREE_IDS ani PREMIUM_IDS', () => {
  assert.equal(katalog.FREE_IDS, undefined, 'FREE_IDS wróciło — nie ma już czego dzielić');
  assert.equal(katalog.PREMIUM_IDS, undefined, 'PREMIUM_IDS wróciło — katalog nie dzieli wielkości');
  const eksporty = Object.keys(katalog).sort();
  assert.deepEqual(eksporty, ['CATALOGUE', 'byId'],
    'katalog ma wystawiać wyłącznie sam katalog i wyszukiwarkę po identyfikatorze');
});

test('wszystkie siedem wielkości jest dostępnych dla każdego', () => {
  // Skoro katalog nie dzieli wielkości, pytanie brzmi już tylko, czy lista
  // dostępnych to po prostu cały katalog.
  const dostepne = CATALOGUE.map((m) => m.id);
  assert.equal(dostepne.length, 7);
  assert.ok(dostepne.includes('share'), 'udział niebieskiego — pierwotna wielkość aplikacji');
  assert.ok(dostepne.includes('flicker') && dostepne.includes('uniformity') && dostepne.includes('comfort'),
    'wskaźniki jakości światła mają być na tej samej liście co reszta');
});
