/* Współczynnik melanopiczny — przybliżenie stosunku melanopicznego do fotopicznego.
 *
 * Źródło wzoru: docs/v5/js/metrics.js (wcześniejsza, identyczna co do stałej
 * redakcja: docs/shared/metrics.js, dawniej docs/v4/metrics.js). Wagi
 * i normalizacja przeniesione bez zmian.
 * docs/v5/js/metrics.js nie jest już źródłem tych wzorów — wyprowadziły się
 * TUTAJ, a tamten plik jest dziś cienką warstwą adaptacyjną nad docs/lib
 * (reeksport + trzy adaptery, które zostawiają v5 zero tam, gdzie biblioteka
 * woli pauzę).
 * Ograniczenie należy do definicji, nie do przypisu: kamera ma trzy szerokie
 * kanały i NIE mierzy widma — to nie jest pomiar fotometryczny ani wynik
 * medyczny. Kierunek zmian wskaźnik oddaje pewnie, wartość bezwzględną nie
 * oddaje wcale.
 */

import { toLinear, LUMA } from './color.js';

/* Skuteczność melanopiczna prymarnych sRGB przy ich PRZYBLIŻONYCH długościach
 * dominujących: R ~612 nm, G ~549 nm, B ~465 nm. Szczyt melanopsyny leży przy
 * ~490 nm, czyli między prymarną zieloną a niebieską — stąd tak duża waga
 * niebieskiego i praktycznie zerowa czerwonego.
 *
 * To są trzy punkty odczytane z krzywej działania melanopsyny, a nie całka po
 * widmie. Prawdziwy współczynnik melanopiczny wymaga spektrometru; tu mamy trzy
 * szerokie, nakładające się kanały kamery, więc wagi są ZAŁOŻENIEM o kształcie
 * widma, którego nie widzimy. Dlatego są wypisane jawnie: żeby dało się je
 * podważyć, a nie żeby wyglądały na stałą fizyczną. */
export const MELANOPIC_WEIGHTS = { r: 0.0016, g: 0.3110, b: 0.8460 };

/* Suma melanopiczna przy RGB = 1,1,1 (biel o równej energii kanałów) — 1,1586. */
const MEL_WHITE = MELANOPIC_WEIGHTS.r + MELANOPIC_WEIGHTS.g + MELANOPIC_WEIGHTS.b;

/* Suma fotopowa przy RGB = 1,1,1 — z definicji luminancji względnej równa 1.
 * Liczona z LUMA, a nie wpisana, żeby jedna zmiana macierzy w color.js nie
 * rozjechała się po cichu z normalizacją tutaj. */
const LUM_WHITE = LUMA.r + LUMA.g + LUMA.b;

/* Stosunek melanopiczny do fotopicznego: „jak mocno to światło mówi do zegara
 * biologicznego na jednostkę widzianej jasności”.
 *
 * Argumenty to wartości 8-bitowe prosto z kamery (0..255) — gamma zdejmowana
 * jest w środku, bo ważenie energii ma sens wyłącznie na świetle liniowym.
 * Wynik jest znormalizowany tak, że neutralna biel daje 1,00 (bez tej
 * normalizacji wychodziłoby 1,16 i skala stałaby się nieczytelna). Uwaga dla
 * testów: w arytmetyce zmiennoprzecinkowej biel wychodzi 0,999999999999999 9,
 * więc porównuj z tolerancją, a nie przez ===.
 * Odniesienie: 1,00 to neutralna biel dzienna, wieczorem warto schodzić poniżej
 * 0,50; wartości powyżej 1 dają światła zimne i mocno niebieskie.
 *
 * Zwraca null, gdy nie ma czego mierzyć — czarny kadr albo wejście, które nie
 * jest kanałem. Zero byłoby tu najgorszą możliwą odpowiedzią: „0,00×” czyta się
 * jako światło całkowicie obojętne dla rytmu dobowego, czyli jako wynik
 * doskonały, podczas gdy naprawdę oznacza brak pomiaru. v5 zwracało w tym
 * miejscu 0 i musiało to potem naprawiać poza wzorem (camera.js sprawdza
 * osobno, czy klatka nie jest za ciemna); tutaj brak pomiaru jest brakiem
 * pomiaru już na poziomie funkcji. Sam wzór i wszystkie stałe — bez zmian. */
export function melanopicRatio(r, g, b) {
  if (!isChannel(r) || !isChannel(g) || !isChannel(b)) return null;

  const rl = toLinear(r), gl = toLinear(g), bl = toLinear(b);

  const lum = LUMA.r * rl + LUMA.g * gl + LUMA.b * bl;
  // Mianownik to jasność widziana. Przy zerowej jasności stosunek jest 0/0 —
  // nieoznaczony, a nie zerowy.
  if (lum <= 1e-9) return null;

  const mel = MELANOPIC_WEIGHTS.r * rl + MELANOPIC_WEIGHTS.g * gl + MELANOPIC_WEIGHTS.b * bl;

  return (mel / lum) * (LUM_WHITE / MEL_WHITE);
}

/* Kanał musi być liczbą z zakresu bajtu 0..255 — tyle i tylko tyle oddaje
 * kamera. Cokolwiek innego znaczy, że wywołujący nie ma pomiaru, a nie że
 * pomiar wyszedł zero.
 * Górna granica jest tu istotna z innego powodu niż zakres: toLinear zaciska
 * wejście do bajtu, więc bez tego warunku kanał 1000 wyszedłby po cichu jako
 * 255 i funkcja zwróciłaby pewny siebie współczynnik dla danych, które nie są
 * kanałem kamery. Zaciśnięcie jest przybliżeniem, a przybliżać wolno pomiar,
 * nie brak pomiaru. */
function isChannel(v) {
  // Porównania odrzucają NaN i obie nieskończoności same z siebie, więc jeden
  // warunek zamyka wszystkie „to nie jest pomiar” naraz.
  return typeof v === 'number' && v >= 0 && v <= 255;
}
