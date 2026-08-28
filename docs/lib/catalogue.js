/* Katalog wielkości — jedyne źródło prawdy o tym, co ta biblioteka mierzy.
 *
 * Źródło: docs/v5/js/metrics.js (tablica CATALOGUE wraz z byId), przeniesione
 * bez zmiany ani jednej liczby i ani jednego identyfikatora — progi stąd muszą
 * zgadzać się z progami, pod które użytkownicy v5 przywykli, inaczej ta sama
 * scena zmieniłaby kolor strefy.
 * docs/v5/js/metrics.js nie jest już źródłem tych wzorów — wyprowadziły się
 * TUTAJ, a tamten plik jest dziś cienką warstwą adaptacyjną nad docs/lib
 * (reeksport + trzy adaptery, które zostawiają v5 zero tam, gdzie biblioteka
 * woli pauzę).
 * To warstwa OPISOWA: nazwy, jednostki, zakresy
 * wskaźników. Nic tu nie liczy i nic tu nie jest pomiarem; progi są oceną
 * redakcyjną projektu, nie normą.
 *
 * DECYZJA (przejście na model dobrowolnego wsparcia): pole `premium` oraz
 * eksporty `FREE_IDS` i `PREMIUM_IDS` zostały USUNIĘTE CAŁKOWICIE, a nie
 * zostawione z wartościami neutralnymi. Powody, w kolejności wagi:
 *   1. Wszystkie siedem wielkości jest dostępnych dla każdego bez warunków,
 *      więc podział nie ma już czego opisywać. Zostawione `premium: false`
 *      w każdej pozycji to nie neutralna wartość, tylko martwe pole, które
 *      podpowiada, że kiedyś bywa `true` — czyli że gdzieś istnieje wariant
 *      płatny. Katalog jest źródłem prawdy; nie wolno mu kłamać kształtem.
 *   2. `PREMIUM_IDS` równe `[]` jest gorsze niż brak eksportu: kod, który je
 *      importuje, przechodzi cicho i zaczyna zachowywać się inaczej, zamiast
 *      wywalić się na imporcie w miejscu, które trzeba poprawić.
 *   3. Nic w tym repozytorium tego nie importowało. Wersje v1…v5 mają własne
 *      kopie wzorów i katalogu (patrz README, sekcja „Stosunek do wersji
 *      aplikacji”), więc usunięcie nie psuje żadnego wywołania.
 * Jeżeli ktoś z zewnątrz importował `FREE_IDS`, poprawka po jego stronie jest
 * jednolinijkowa: wszystkie wielkości to teraz po prostu `CATALOGUE.map(m => m.id)`.
 */

/* Pola pozycji: id (klucz używany wszędzie), namePL/unit/shortPL/helpPL (opis
 * dla interfejsu), decimals/min/max (kształt wskaźnika), warn/crit/invert
 * (progi stref — patrz zones.js), icon (podpowiedź dla warstwy widoku,
 * biblioteka jej nie używa). */
export const CATALOGUE = [
  {
    id: 'share',
    namePL: 'Udział niebieskiego',
    unit: '%',
    shortPL: 'Ile z widzianego światła przypada na kanał niebieski.',
    helpPL: 'Izoluje barwę od jasności — to ta wartość zmienia się, gdy włączysz tryb nocny.',
    decimals: 0, min: 0, max: 60,
    warn: 26, crit: 33, invert: false, icon: 'droplet'
  },
  {
    id: 'brightness',
    namePL: 'Jasność sceny',
    unit: '%',
    shortPL: 'Średnia jasność obrazu z kamery.',
    helpPL: 'Wartość względna, nie luksy — automatyka ekspozycji kamery przesuwa ją pod spodem.',
    decimals: 0, min: 0, max: 100,
    warn: 70, crit: 88, invert: false, icon: 'sun'
  },
  {
    id: 'kelvin',
    namePL: 'Temperatura barwowa',
    unit: 'K',
    shortPL: 'Czy światło jest ciepłe, czy chłodne.',
    helpPL: 'Poniżej 3000 K światło jest ciepłe i wieczorem łagodniejsze. 6500 K to domyślna biel większości ekranów.',
    decimals: 0, min: 1500, max: 9000,
    warn: 4600, crit: 6000, invert: false, icon: 'thermometer'
  },
  {
    id: 'melanopic',
    namePL: 'Wpływ na rytm dobowy',
    unit: '×',
    shortPL: 'Jak mocno to światło działa na zegar biologiczny.',
    helpPL: 'Przybliżenie współczynnika melanopicznego. 1,00 to neutralna biel dzienna; wieczorem warto schodzić poniżej 0,50.',
    decimals: 2, min: 0, max: 1.6,
    warn: 0.75, crit: 1.0, invert: false, icon: 'moon'
  },
  {
    id: 'flicker',
    namePL: 'Migotanie',
    unit: '%',
    shortPL: 'Niewidoczne pulsowanie źródła światła.',
    helpPL: 'Tanie ściemniacze i podświetlenia pulsują. Oko tego nie widzi, ale bywa to przyczyną zmęczenia i bólu głowy.',
    decimals: 1, min: 0, max: 60,
    warn: 8, crit: 20, invert: false, icon: 'wave'
  },
  {
    id: 'uniformity',
    namePL: 'Równomierność',
    unit: '%',
    shortPL: 'Czy światło rozkłada się równo w kadrze.',
    helpPL: 'Niska wartość na ekranie oznacza przeświecanie podświetlenia lub odbicie; na biurku — źle ustawioną lampę.',
    decimals: 0, min: 0, max: 100,
    warn: 60, crit: 35, invert: true, icon: 'grid'
  },
  {
    id: 'comfort',
    namePL: 'Komfort wzrokowy',
    unit: 'pkt',
    shortPL: 'Jedna ocena zamiast sześciu liczb.',
    helpPL: 'Składa pozostałe pomiary w wynik 0–100 i pokazuje, co najbardziej go obniża. Wagi są naszą oceną redakcyjną, nie normą.',
    decimals: 0, min: 0, max: 100,
    warn: 70, crit: 45, invert: true, icon: 'heart'
  }
];

export function byId(id) {
  for (let i = 0; i < CATALOGUE.length; i += 1) {
    if (CATALOGUE[i].id === id) return CATALOGUE[i];
  }
  return null;
}
