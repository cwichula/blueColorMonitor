/* Katalog wielkości — jedyne źródło prawdy o tym, co ta biblioteka mierzy.
 *
 * Źródło: docs/v5/js/metrics.js (tablica CATALOGUE wraz z byId, FREE_IDS
 * i PREMIUM_IDS), przeniesione bez zmiany ani jednej liczby i ani jednego
 * identyfikatora — progi stąd muszą zgadzać się z progami, pod które
 * użytkownicy v5 przywykli, inaczej ta sama scena zmieniłaby kolor strefy.
 * To warstwa OPISOWA: nazwy, jednostki, zakresy wskaźników i podział na
 * darmowe i płatne. Nic tu nie liczy i nic tu nie jest pomiarem; progi są
 * oceną redakcyjną projektu, nie normą.
 */

/* Pola pozycji: id (klucz używany wszędzie), namePL/unit/shortPL/helpPL (opis
 * dla interfejsu), premium (podział płatny), decimals/min/max (kształt
 * wskaźnika), warn/crit/invert (progi stref — patrz zones.js), icon (podpowiedź
 * dla warstwy widoku, biblioteka jej nie używa). */
export const CATALOGUE = [
  {
    id: 'share',
    namePL: 'Udział niebieskiego',
    unit: '%',
    shortPL: 'Ile z widzianego światła przypada na kanał niebieski.',
    helpPL: 'Izoluje barwę od jasności — to ta wartość zmienia się, gdy włączysz tryb nocny.',
    premium: false, decimals: 0, min: 0, max: 60,
    warn: 26, crit: 33, invert: false, icon: 'droplet'
  },
  {
    id: 'brightness',
    namePL: 'Jasność sceny',
    unit: '%',
    shortPL: 'Średnia jasność obrazu z kamery.',
    helpPL: 'Wartość względna, nie luksy — automatyka ekspozycji kamery przesuwa ją pod spodem.',
    premium: false, decimals: 0, min: 0, max: 100,
    warn: 70, crit: 88, invert: false, icon: 'sun'
  },
  {
    id: 'kelvin',
    namePL: 'Temperatura barwowa',
    unit: 'K',
    shortPL: 'Czy światło jest ciepłe, czy chłodne.',
    helpPL: 'Poniżej 3000 K światło jest ciepłe i wieczorem łagodniejsze. 6500 K to domyślna biel większości ekranów.',
    premium: false, decimals: 0, min: 1500, max: 9000,
    warn: 4600, crit: 6000, invert: false, icon: 'thermometer'
  },
  {
    id: 'melanopic',
    namePL: 'Wpływ na rytm dobowy',
    unit: '×',
    shortPL: 'Jak mocno to światło działa na zegar biologiczny.',
    helpPL: 'Przybliżenie współczynnika melanopicznego. 1,00 to neutralna biel dzienna; wieczorem warto schodzić poniżej 0,50.',
    premium: false, decimals: 2, min: 0, max: 1.6,
    warn: 0.75, crit: 1.0, invert: false, icon: 'moon'
  },
  {
    id: 'flicker',
    namePL: 'Migotanie',
    unit: '%',
    shortPL: 'Niewidoczne pulsowanie źródła światła.',
    helpPL: 'Tanie ściemniacze i podświetlenia pulsują. Oko tego nie widzi, ale bywa to przyczyną zmęczenia i bólu głowy.',
    premium: true, decimals: 1, min: 0, max: 60,
    warn: 8, crit: 20, invert: false, icon: 'wave'
  },
  {
    id: 'uniformity',
    namePL: 'Równomierność',
    unit: '%',
    shortPL: 'Czy światło rozkłada się równo w kadrze.',
    helpPL: 'Niska wartość na ekranie oznacza przeświecanie podświetlenia lub odbicie; na biurku — źle ustawioną lampę.',
    premium: true, decimals: 0, min: 0, max: 100,
    warn: 60, crit: 35, invert: true, icon: 'grid'
  },
  {
    id: 'comfort',
    namePL: 'Komfort wzrokowy',
    unit: 'pkt',
    shortPL: 'Jedna ocena zamiast sześciu liczb.',
    helpPL: 'Składa pozostałe pomiary w wynik 0–100 i pokazuje, co najbardziej go obniża. Wagi są naszą oceną redakcyjną, nie normą.',
    premium: true, decimals: 0, min: 0, max: 100,
    warn: 70, crit: 45, invert: true, icon: 'heart'
  }
];

export function byId(id) {
  for (let i = 0; i < CATALOGUE.length; i += 1) {
    if (CATALOGUE[i].id === id) return CATALOGUE[i];
  }
  return null;
}

/* Wyliczane z katalogu, a nie wpisane ręcznie — inaczej dopisanie wielkości
 * wymagałoby pamiętania o drugiej liście. */
export const FREE_IDS = CATALOGUE.filter((m) => !m.premium).map((m) => m.id);
export const PREMIUM_IDS = CATALOGUE.filter((m) => m.premium).map((m) => m.id);
