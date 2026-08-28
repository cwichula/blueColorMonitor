/* Kompletność słowników — jeden sprawdzian dla wszystkich katalogów.
 *
 * PO CO TEN PLIK ISTNIEJE: aplikacja ma mówić w trzydziestu językach, a każdy
 * z nich to osobny plik pisany przez kogoś innego, zwykle bez dostępu do kodu.
 * Tłumacz nie ma jak zauważyć, że pominął klucz, że zmienił nazwę wstawki
 * z '{name}' na '{nazwa}' albo że napisał liczebnik jednym zdaniem zamiast
 * obiektem form. Każdy z tych trzech błędów jest CICHY: aplikacja się nie
 * wywali, tylko pokaże angielski napis w środku obcego zdania albo dosłowne
 * '{name}' na przycisku. Ten test zamienia je w czerwone światło.
 *
 * WZORCEM JEST pl.js, a nie en.js — celowo. Polszczyzna jest tu redakcją
 * pierwotną: to z niej wyprowadzono zestaw kluczy każdej wersji i to ona
 * przechodzi zmiany jako pierwsza. Angielski jest wartością ZAPASOWĄ w czasie
 * działania aplikacji (docs/shared/i18n.js, FALLBACK = 'en') i tu jest
 * sprawdzany tak samo jak każdy inny język — bo brak klucza w en.js to jedyny
 * przypadek, w którym użytkownik zobaczy goły klucz zamiast zdania.
 *
 * CZEGO TEN TEST NIE SPRAWDZA: sensu tłumaczenia. Nie ma sposobu, żeby maszyna
 * orzekła, czy 'zone.good' po grecku znaczy „w normie”. Sprawdzana jest wyłącznie
 * ta warstwa, w której błąd jest mechaniczny i policzalny.
 *
 * DLACZEGO node:vm, A NIE import: pliki słowników są KLASYCZNYMI skryptami
 * (window.I18nData[...] = Object.assign(...)), bez ani jednego `export` —
 * `import` takiego pliku nie zwróciłby niczego. Wykonujemy je więc w osobnym
 * kontekście node:vm z podstawionym globalThis i przechwytujemy to, co skrypt
 * tam zapisał. Dokładnie tak samo robi docs/lib/shared-parity.test.js
 * z docs/shared/metrics.js; ten plik trzyma się tamtej konwencji.
 *
 * JAK URUCHOMIĆ:  node --test docs/shared/i18n/keys.test.js
 * (Node sam rozpoznaje składnię modułu, więc katalog nie potrzebuje
 * package.json — repozytorium celowo nie ma go poza docs/lib.)
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const TU = path.dirname(fileURLToPath(import.meta.url));
const DOCS = path.resolve(TU, '..', '..');

/* Katalogi wypisane, a nie znalezione skanem — i to jest świadome. Skan
 * wciągnąłby kiedyś docs/v5/i18n, a v5 to moduły ES pisane przez inny zespół:
 * jej słowniki nie są klasycznymi skryptami i vm nie miałby czego z nich wziąć.
 * Lista katalogów zmienia się raz na wersję aplikacji; lista JĘZYKÓW zmienia się
 * trzydzieści razy — i to ona jest czytana z dysku. */
const KATALOGI = [
  'shared/i18n',
  'v1/i18n',
  'v2/i18n',
  'v3/i18n',
  'v4/i18n'
];

/* Nazwa pliku JEST kodem języka — tak wygląda umowa w docs/shared/i18n.js,
 * które składa adres słownika jako <katalog>/<kod>.js. Pomijamy własne testy
 * (ten plik leży w jednym z tych katalogów) i pliki ukryte. */
function jezykiW(katalog) {
  const bezwzgledny = path.join(DOCS, katalog);
  return readdirSync(bezwzgledny)
    .filter((nazwa) => nazwa.endsWith('.js') && !nazwa.endsWith('.test.js') && !nazwa.startsWith('.'))
    .map((nazwa) => nazwa.slice(0, -3))
    .sort();
}

/* Wykonanie jednego pliku słownika. Kontekst jest osobny (a nie globalThis
 * testu), żeby skrypt przeglądarkowy nie zaśmiecił przestrzeni testu — i żeby
 * było widać, że słownik nie potrzebuje z przeglądarki NICZEGO poza `window`.
 * `window` i `globalThis` wskazują na ten sam obiekt, bo plik zaczyna się od
 * `window.I18nData = window.I18nData || {}` i tylko to go z przeglądarką łączy. */
function wczytajSlownik(katalog, kod) {
  const plik = path.join(DOCS, katalog, kod + '.js');
  const zrodlo = readFileSync(plik, 'utf8');
  const kontekst = vm.createContext({});
  kontekst.window = kontekst;
  kontekst.globalThis = kontekst;
  vm.runInContext(zrodlo, kontekst, { filename: `docs/${katalog}/${kod}.js` });
  const magazyn = kontekst.I18nData;
  assert.ok(magazyn && typeof magazyn === 'object',
    `docs/${katalog}/${kod}.js nie zapisał nic w window.I18nData`);
  return magazyn;
}

/* Nazwy wstawek w jednej wartości. Dla liczebnika bierzemy sumę ze WSZYSTKICH
 * form — forma 'one' bywa jedyną, w której wstawka {n} nie występuje
 * (angielskie „a reading” zamiast „1 reading”), a to nie jest błąd. */
function wstawki(wartosc) {
  const teksty = typeof wartosc === 'string' ? [wartosc] : Object.values(wartosc);
  const zebrane = new Set();
  for (const tekst of teksty) {
    if (typeof tekst !== 'string') continue;
    for (const trafienie of tekst.matchAll(/\{([A-Za-z0-9_]+)\}/g)) zebrane.add(trafienie[1]);
  }
  return [...zebrane].sort();
}

/* Kategorie liczebnika, których wymaga CLDR dla danego języka. Nie nasza
 * reguła odmiany — dokładnie ta lista, po której Intl.PluralRules sięgnie
 * w czasie działania aplikacji: angielski dostanie one/other, polski
 * one/few/many/other, arabski zero/one/two/few/many/other, japoński samo other. */
function kategorieLiczebnika(kod) {
  return new Intl.PluralRules(kod).resolvedOptions().pluralCategories.slice().sort();
}

const jestLiczebnikiem = (wartosc) => wartosc !== null && typeof wartosc === 'object';

/* Pusta wartość to najczęstszy ślad po niedokończonym tłumaczeniu: klucz jest,
 * więc warstwa zapasowa się nie włączy, a użytkownik zobaczy pusty przycisk. */
function pusta(tekst) {
  return typeof tekst !== 'string' || tekst.trim() === '';
}

/* Wypisujemy najwyżej kilkanaście nazw kluczy — przy świeżym, pustym języku
 * różnica ma pięćset pozycji i komunikat na pięćset linii niczego nie ułatwia. */
function lista(klucze, ile = 12) {
  const widoczne = klucze.slice(0, ile).join(', ');
  return klucze.length > ile ? `${widoczne} … (+${klucze.length - ile})` : widoczne;
}

/* ================================================================
   Jeden zestaw testów na katalog; wewnątrz jeden test na język.
   ================================================================ */

for (const katalog of KATALOGI) {

  test(`${katalog}: katalog ma wzorzec pl.js i przynajmniej jeden inny język`, () => {
    assert.ok(existsSync(path.join(DOCS, katalog, 'pl.js')),
      `docs/${katalog}/pl.js nie istnieje, a to on wyznacza zestaw kluczy`);
    const jezyki = jezykiW(katalog);
    assert.ok(jezyki.includes('en'),
      `docs/${katalog}/en.js nie istnieje — angielski jest warstwą zapasową i musi być kompletny`);
  });

  const wzorzec = wczytajSlownik(katalog, 'pl')['pl'];
  const klucze = Object.keys(wzorzec);

  test(`${katalog}: wzorzec pl.js jest niepusty i nie ma pustych wartości`, () => {
    assert.ok(klucze.length > 0, `docs/${katalog}/pl.js nie ma ani jednego klucza`);
    const puste = klucze.filter((k) => (jestLiczebnikiem(wzorzec[k])
      ? Object.values(wzorzec[k]).some(pusta)
      : pusta(wzorzec[k])));
    assert.deepEqual(puste, [], `puste wartości w docs/${katalog}/pl.js: ${lista(puste)}`);
  });

  for (const kod of jezykiW(katalog)) {
    if (kod === 'pl') continue;

    const magazyn = wczytajSlownik(katalog, kod);
    const slownik = magazyn[kod];
    const gdzie = `docs/${katalog}/${kod}.js`;

    test(`${katalog}/${kod}: plik zapisuje się pod własnym kodem języka`, () => {
      /* Najczęstszy błąd przy kopiowaniu poprzedniego języka: treść nowa,
         a nagłówek dalej mówi window.I18nData['pl']. Skutek jest paskudny —
         nowy język nadpisuje cudzy słownik i nigdy się nie pokazuje. */
      assert.deepEqual(Object.keys(magazyn), [kod],
        `${gdzie} zapisał się pod ${JSON.stringify(Object.keys(magazyn))} zamiast pod '${kod}'`);
    });

    test(`${katalog}/${kod}: ten sam zestaw kluczy co pl.js`, () => {
      const nasze = new Set(Object.keys(slownik));
      const brakujace = klucze.filter((k) => !nasze.has(k));
      const nadmiarowe = [...nasze].filter((k) => !(k in wzorzec));
      assert.deepEqual(brakujace, [],
        `${gdzie} nie ma kluczy obecnych w pl.js: ${lista(brakujace)}`);
      assert.deepEqual(nadmiarowe, [],
        `${gdzie} ma klucze, których nie ma w pl.js: ${lista(nadmiarowe)}`);
    });

    test(`${katalog}/${kod}: nazwy wstawek {…} zgadzają się klucz w klucz`, () => {
      const rozjazdy = [];
      for (const k of klucze) {
        if (!(k in slownik)) continue; // meldunek należy do testu wyżej
        const oczekiwane = wstawki(wzorzec[k]);
        const podane = wstawki(slownik[k]);
        if (oczekiwane.join('|') !== podane.join('|')) {
          rozjazdy.push(`${k}: pl {${oczekiwane.join(', ')}} vs ${kod} {${podane.join(', ')}}`);
        }
      }
      assert.deepEqual(rozjazdy, [],
        `${gdzie} — inne nazwy wstawek niż w pl.js:\n  ${rozjazdy.join('\n  ')}`);
    });

    test(`${katalog}/${kod}: liczebniki mają komplet form CLDR tego języka`, () => {
      const wymagane = kategorieLiczebnika(kod);
      const bledy = [];
      for (const k of klucze) {
        if (!jestLiczebnikiem(wzorzec[k]) || !(k in slownik)) continue;
        const wartosc = slownik[k];
        if (!jestLiczebnikiem(wartosc)) {
          bledy.push(`${k}: napis zamiast obiektu form {${wymagane.join(', ')}}`);
          continue;
        }
        const podane = Object.keys(wartosc).sort();
        if (podane.join('|') !== wymagane.join('|')) {
          bledy.push(`${k}: formy {${podane.join(', ')}}, a CLDR wymaga dla '${kod}' {${wymagane.join(', ')}}`);
        }
      }
      assert.deepEqual(bledy, [],
        `${gdzie} — liczebniki niezgodne z Intl.PluralRules('${kod}'):\n  ${bledy.join('\n  ')}`);
    });

    test(`${katalog}/${kod}: żadna wartość nie jest pusta`, () => {
      const puste = [];
      for (const [k, wartosc] of Object.entries(slownik)) {
        if (jestLiczebnikiem(wartosc)) {
          for (const [forma, tekst] of Object.entries(wartosc)) {
            if (pusta(tekst)) puste.push(`${k}.${forma}`);
          }
        } else if (pusta(wartosc)) {
          puste.push(k);
        }
      }
      assert.deepEqual(puste, [], `${gdzie} — puste wartości: ${lista(puste)}`);
    });
  }
}
