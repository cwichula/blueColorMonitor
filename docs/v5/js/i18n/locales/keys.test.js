/* Monitor Światła v5 — sprawdzian kompletności słowników.
 *
 * Uruchamiany z tego katalogu: `node --test`.
 *
 * PO CO TO JEST: brakujący klucz nie wywraca aplikacji — silnik i18n po cichu
 * bierze wtedy napis z angielskiego zapasu, a gdy i tam go nie ma, pokazuje
 * gołe 'measure.start' na przycisku. Takiej dziury nie widać w kodzie ani
 * w polskiej wersji; widać ją dopiero komuś, kto ustawił swój język. Ten test
 * jest jedynym miejscem, w którym da się ją złapać przed wydaniem.
 *
 * ŹRÓDŁEM PRAWDY JEST pl.js: to w nim powstają nowe klucze i to jego zestaw
 * muszą mieć wszystkie pozostałe słowniki, bez braków i bez nadmiaru.
 *
 * PLIKI BIERZEMY Z KATALOGU, nie z listy w kodzie — dopisanie locales/de.js ma
 * od razu podlegać tym samym regułom, bez dotykania testu. Dlatego kolejne 28
 * języków nie wymaga tu ani jednej zmiany.
 *
 * Sprawdzamy cztery rzeczy:
 *   1. zestaw kluczy identyczny z pl.js,
 *   2. te same NAZWY wstawek {…} w każdej parze klucz→wartość (kolejność wolno
 *      zmieniać — angielski pisze „Aug 30” tam, gdzie polski „30 sie”),
 *   3. klucz z formami mnogimi ma formy po obu stronach, a formy pokrywają
 *      kategorie CLDR wymagane dla tego języka,
 *   4. żadna wartość nie jest pusta.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));

/** Słownik źródłowy: w nim powstaje każdy nowy klucz. */
const REFERENCE = 'pl';

/** Zapas dla wszystkich pozostałych języków — musi istnieć zawsze. */
const FALLBACK = 'en';

/* Komplet kategorii liczebnika z CLDR. Konkretny język używa podzbioru (polski
   one/few/many/other, angielski one/other) — ta lista mówi tylko, co w ogóle
   wolno nazwać formą. */
const PLURAL_FORMS = ['zero', 'one', 'two', 'few', 'many', 'other'];

/* Ta sama składnia wstawki co w silniku (js/i18n/index.js). Gdyby tam się
   zmieniła, musi się zmienić i tutaj — inaczej test przestałby widzieć to,
   co naprawdę podstawia t(). */
const PLACEHOLDER = /\{([A-Za-z0-9_]+)\}/g;

function localeFiles() {
  return readdirSync(HERE)
    .filter((name) => name.endsWith('.js') && !name.endsWith('.test.js'))
    .sort();
}

async function loadDictionary(file) {
  const module = await import(pathToFileURL(path.join(HERE, file)).href);
  return module.default;
}

const dictionaries = new Map();
for (const file of localeFiles()) {
  dictionaries.set(path.basename(file, '.js'), await loadDictionary(file));
}

const codes = [...dictionaries.keys()];
const reference = dictionaries.get(REFERENCE);

function isForms(value) {
  return value !== null && typeof value === 'object';
}

/* Nazwy wstawek z całej wartości: dla form mnogich bierzemy sumę ze wszystkich
   form, bo każda z nich trafia w to samo miejsce w kodzie i dostaje ten sam
   komplet parametrów. */
function placeholders(value) {
  const found = new Set();
  const scan = (text) => {
    PLACEHOLDER.lastIndex = 0;
    let match = PLACEHOLDER.exec(String(text));
    while (match) {
      found.add(match[1]);
      match = PLACEHOLDER.exec(String(text));
    }
  };
  if (isForms(value)) Object.values(value).forEach(scan);
  else scan(value);
  return found;
}

/* Kategorie, których dany język naprawdę potrzebuje. Pyta o nie ICU, a nie my:
   pisanie własnych reguł odmiany dla trzydziestu języków byłoby dokładnie tym
   błędem, którego cała ta architektura unika. */
function requiredForms(code) {
  try {
    const options = new Intl.PluralRules(code).resolvedOptions();
    return Array.isArray(options.pluralCategories) ? options.pluralCategories : null;
  } catch (err) {
    return null;                  // środowisko bez danych dla tego języka
  }
}

/* Do komunikatu wchodzi kilka pierwszych nazw, nie wszystkie: przy świeżym
   tłumaczeniu braków bywa dwieście i lista przykryłaby resztę wyniku. */
function sample(list, limit = 8) {
  const shown = list.slice(0, limit).join(', ');
  return list.length > limit ? shown + ` … (+${list.length - limit})` : shown;
}

function emptyValues(dict) {
  const bad = [];
  Object.keys(dict).forEach((key) => {
    const value = dict[key];
    if (isForms(value)) {
      Object.keys(value).forEach((form) => {
        if (String(value[form]).trim() === '') bad.push(key + '.' + form);
      });
      if (Object.keys(value).length === 0) bad.push(key);
      return;
    }
    if (String(value).trim() === '') bad.push(key);
  });
  return bad;
}

test('katalog locales ma słownik źródłowy i angielski zapas', () => {
  assert.ok(reference, 'brak locales/' + REFERENCE + '.js — nie ma z czym porównywać');
  assert.ok(dictionaries.get(FALLBACK),
    'brak locales/' + FALLBACK + '.js — bez niego brakujące klucze pokażą się jako gołe identyfikatory');
  codes.forEach((code) => {
    const dict = dictionaries.get(code);
    assert.ok(dict && typeof dict === 'object',
      'locales/' + code + '.js nie ma domyślnego eksportu z obiektem');
  });
});

test('słownik źródłowy nie ma pustych wartości', () => {
  const bad = emptyValues(reference);
  assert.deepEqual(bad, [], 'puste wartości w ' + REFERENCE + '.js: ' + sample(bad));
});

/* Każdy język dostaje własny blok testów — po nazwie w wyniku od razu widać,
   który słownik odstaje, bez czytania treści błędu. */
for (const code of codes) {
  if (code === REFERENCE) continue;
  const dict = dictionaries.get(code);

  test(code + ': ten sam zestaw kluczy co ' + REFERENCE, () => {
    const expected = Object.keys(reference);
    const actual = new Set(Object.keys(dict));
    const missing = expected.filter((key) => !actual.has(key));
    const extra = Object.keys(dict).filter((key) => !Object.prototype.hasOwnProperty.call(reference, key));

    assert.deepEqual(missing, [], 'brakuje kluczy: ' + sample(missing));
    // Nadmiar jest błędem tak samo jak brak: klucz, którego nie ma w źródle,
    // jest albo literówką, albo napisem, którego nikt nigdy nie wyświetli.
    assert.deepEqual(extra, [], 'klucze spoza ' + REFERENCE + '.js: ' + sample(extra));
  });

  test(code + ': te same nazwy wstawek', () => {
    const mismatched = [];
    Object.keys(reference).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(dict, key)) return;   // zgłosi to test wyżej
      const want = [...placeholders(reference[key])].sort();
      const have = [...placeholders(dict[key])].sort();
      if (want.join('|') !== have.join('|')) {
        mismatched.push(key + ' (oczekiwane: ' + (want.join(', ') || '—')
          + '; jest: ' + (have.join(', ') || '—') + ')');
      }
    });
    assert.deepEqual(mismatched, [], 'niezgodne wstawki:\n  ' + mismatched.join('\n  '));
  });

  test(code + ': formy mnogie po obu stronach i zgodne z CLDR', () => {
    const problems = [];
    const needed = requiredForms(code);

    Object.keys(reference).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(dict, key)) return;
      const wantForms = isForms(reference[key]);
      const haveForms = isForms(dict[key]);

      if (wantForms && !haveForms) {
        problems.push(key + ': ma być obiekt form, jest napis');
        return;
      }
      if (!wantForms && haveForms) {
        problems.push(key + ': ma być napis, jest obiekt form');
        return;
      }
      if (!wantForms) return;

      const forms = Object.keys(dict[key]);
      const unknown = forms.filter((form) => !PLURAL_FORMS.includes(form));
      if (unknown.length) problems.push(key + ': nieznane formy: ' + unknown.join(', '));

      // Brak kategorii, której język wymaga, to napis w złej odmianie —
      // silnik podstawi wtedy formę najbliższą, a nie właściwą.
      if (needed) {
        const absent = needed.filter((form) => !Object.prototype.hasOwnProperty.call(dict[key], form));
        if (absent.length) problems.push(key + ': brakuje form CLDR: ' + absent.join(', '));
      }
    });

    assert.deepEqual(problems, [], 'formy mnogie:\n  ' + problems.join('\n  '));
  });

  test(code + ': żadna wartość nie jest pusta', () => {
    const bad = emptyValues(dict);
    assert.deepEqual(bad, [], 'puste wartości: ' + sample(bad));
  });
}
