/* Strefy — jeden wspólny język koloru dla wszystkich wielkości.
 *
 * Źródło wzoru: zoneFor z docs/v5/js/metrics.js, przeniesione co do znaku
 * nierówności. zonesFor i DEFAULT_THRESHOLDS są NOWE: v5 miało prywatną pętlę
 * po progach w camera.js, więc nie ma tu czego kopiować — jest za to reguła,
 * którą trzeba było wypowiedzieć wprost.
 * Reguła brzmi: wartość dokładnie na progu należy do strefy GORSZEJ. Próg ma
 * ostrzegać, a nie uspokajać, więc 26 % udziału niebieskiego to już 'warn'.
 * Progi są oceną redakcyjną projektu (te same liczby co w katalogu), nie normą.
 */

import { CATALOGUE, byId } from './catalogue.js';

/* Strefa dla jednej wartości. `invert` jest dla wielkości, w których WIĘCEJ
 * znaczy lepiej (równomierność, komfort) — wtedy progi czyta się w dół.
 * Nazwy stref są kanoniczne: pasują do tokenów --zone-good/-warn/-crit i do
 * atrybutu data-zone w interfejsie.
 *
 * Brak pomiaru to null, nigdy 'good': gdyby niezmierzona wielkość dostawała
 * strefę dobrą, wskaźnik świeciłby na zielono dokładnie wtedy, gdy nie wie nic. */
export function zoneFor(value, warn, crit, invert) {
  if (typeof value !== 'number' || !isFinite(value)) return null;
  if (typeof warn !== 'number' || typeof crit !== 'number') return null;
  if (invert) {
    if (value <= crit) return 'crit';
    if (value <= warn) return 'warn';
    return 'good';
  }
  if (value >= crit) return 'crit';
  if (value >= warn) return 'warn';
  return 'good';
}

/* Domyślne progi wszystkich siedmiu wielkości. Wyprowadzone z CATALOGUE, a nie
 * przepisane obok niego: druga lista tych samych liczb rozjechałaby się przy
 * pierwszej zmianie progu. `invert` jedzie razem z progami, bo bez kierunku
 * para (warn, crit) nic nie znaczy — 60/35 czyta się w dół, 26/33 w górę. */
export const DEFAULT_THRESHOLDS = {};
for (const m of CATALOGUE) {
  DEFAULT_THRESHOLDS[m.id] = { warn: m.warn, crit: m.crit, invert: m.invert };
}

/* Strefy dla całego zestawu odczytów naraz: {share: 20, kelvin: 2700, ...}
 * -> {share: 'good', kelvin: 'good', ...}.
 *
 * `thresholds` pozwala podstawić własne progi zamiast naszych — to jedyny
 * sposób, żeby nie zgodzić się z oceną redakcyjną tego projektu bez edytowania
 * biblioteki. Podana tablica progów jest brana dosłownie: wielkość, której
 * w niej nie ma, nie dostaje strefy (null), zamiast po cichu wrócić do
 * domyślnych. Kierunek bierzemy z progów, jeśli go deklarują, a w drugiej
 * kolejności z katalogu.
 *
 * Wielkość bez progów i wartość, która nie jest liczbą, dają null — brak
 * strefy, nie strefa dobra. Brak wejścia daje pusty obiekt, nigdy wyjątek. */
export function zonesFor(values, thresholds) {
  const out = {};
  if (!values || typeof values !== 'object') return out;
  const table = thresholds && typeof thresholds === 'object' ? thresholds : DEFAULT_THRESHOLDS;

  for (const id of Object.keys(values)) {
    const t = table[id];
    if (!t || typeof t !== 'object') { out[id] = null; continue; }
    const entry = byId(id);
    const invert = typeof t.invert === 'boolean' ? t.invert : (entry ? entry.invert : false);
    out[id] = zoneFor(values[id], t.warn, t.crit, invert);
  }
  return out;
}
