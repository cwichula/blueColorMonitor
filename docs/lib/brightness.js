/* Jasność sceny — względny wskaźnik ekspozycji kadru.
 *
 * Źródło wzoru: docs/v1/app.js, przeniesione bez zmian przez docs/shared/metrics.js
 * (dawniej docs/v4/metrics.js) do docs/v5/js/metrics.js — średnia trzech kanałów
 * przeskalowana na procenty.
 * docs/v5/js/metrics.js nie jest już źródłem tych wzorów — wyprowadziły się
 * TUTAJ, a tamten plik jest dziś cienką warstwą adaptacyjną nad docs/lib
 * (reeksport + trzy adaptery, które zostawiają v5 zero tam, gdzie biblioteka
 * woli pauzę).
 * Ograniczenie, które trzeba powiedzieć wprost: to NIE są luksy i nie da się
 * ich z tego wyliczyć. Automatyka ekspozycji kamery przesuwa skalę pod spodem,
 * więc liczba mówi tylko, jak jasny jest obraz, który kamera właśnie oddała.
 * Porównywać wolno ją z samą sobą w jednej sesji, nie między urządzeniami.
 */

/* Średnia wartość kanałów w procentach zakresu 0..255.
 *
 * Liczona — tak jak udział niebieskiego — na wartościach z gammą, bo służy do
 * porównań ze sobą, a nie do fizyki. Wielkość fotometrycznie poprawna
 * (luminancja względna) jest osobno w color.js jako relativeLuminance i to
 * ona, a nie ta funkcja, wchodzi do obliczeń w przestrzeni barw.
 *
 * Czarny kadr to wynik zmierzony, a nie brak pomiaru, więc dla (0, 0, 0)
 * zwracamy 0 %, a null tylko wtedy, gdy dane wejściowe w ogóle nie są
 * pomiarem (brak liczby, NaN, nieskończoność, wartość ujemna albo liczba
 * spoza bajtu — patrz isChannel niżej).
 */
export function brightness(r, g, b) {
  if (!isChannel(r) || !isChannel(g) || !isChannel(b)) return null;
  return ((r + g + b) / 3 / 255) * 100;
}

/* Kanał musi być liczbą z zakresu bajtu 0..255 — tyle i tylko tyle oddaje
 * kamera. Górna granica zamyka też przepełnienie: bez niej (r+g+b) trzech
 * ogromnych liczb daje nieskończoność, a funkcja zwracała 'Infinity %' zamiast
 * przyznać, że nie ma czego mierzyć. */
function isChannel(v) {
  // Porównania odrzucają NaN i obie nieskończoności same z siebie, więc jeden
  // warunek zamyka wszystkie „to nie jest pomiar” naraz.
  return typeof v === 'number' && v >= 0 && v <= 255;
}
