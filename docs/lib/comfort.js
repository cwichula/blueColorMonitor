/* Indeks komfortu wzrokowego — jedna ocena 0–100 składana z pozostałych wielkości.
 *
 * Źródło wzoru: docs/v5/js/metrics.js; docs/v4/metrics.js miało te same wagi,
 * ale trzy błędy, które v5 świadomie naprawiło (opisane niżej przy każdym).
 * Wagi i progi są JAWNĄ OCENĄ REDAKCYJNĄ tego projektu, a nie normą — żadna
 * instytucja nie ogłosiła, że chłodna barwa jest warta 25 punktów. To nie jest
 * pomiar fotometryczny ani wynik medyczny; to skrót, który ma zwrócić uwagę na
 * właściwy czynnik, i dlatego zawsze zwraca też rozbicie na kary, żeby dało się
 * z nim nie zgodzić.
 */

/* Progi i wagi kar. Wypisane w jednym miejscu, bo to jedyne liczby w tej
 * bibliotece, które są opinią, a nie wzorem — mają być widoczne i podważalne.
 *
 * Suma wag to dokładnie 100, więc światło złe pod każdym względem schodzi do 0.
 * Kolejność wag odpowiada sile dowodów: ekspozycja melanopiczna wieczorem jest
 * udokumentowana najlepiej, więc waży najwięcej. */
const RULES = [
  {
    key: 'melanopic', id: 'melanopic',
    labelPL: 'Wpływ na rytm dobowy',
    // 1,00 to neutralna biel dzienna; kara zaczyna się dopiero powyżej 0,75.
    points: (v) => Math.min(35, Math.max(0, v - 0.75) * 55)
  },
  {
    key: 'kelvin', id: 'kelvin',
    labelPL: 'Chłodna barwa światła',
    // Chłodne światło późną porą to klasyczna skarga; ciepłego NIGDY nie karzemy
    // — kara rośnie tylko powyżej 4000 K i nasyca się przy 7000 K.
    points: (v) => Math.min(25, (Math.max(0, v - 4000) / 3000) * 25)
  },
  // Pole wejścia nazywa się flickerPercent, ale identyfikator kary to 'flicker'
  // — musi pasować do id wielkości w catalogue.js, bo interfejs po nim podświetla
  // wskaźnik, który najbardziej obniżył ocenę.
  {
    key: 'flickerPercent', id: 'flicker',
    labelPL: 'Migotanie',
    // Poniżej ~5 % uznaje się powszechnie za niezauważalne; przy 30 % jest źle.
    points: (v) => Math.min(25, (Math.max(0, v - 5) / 25) * 25)
  },
  {
    key: 'uniformity', id: 'uniformity',
    labelPL: 'Nierównomierne oświetlenie',
    // Jedyna wielkość odwrócona: karzemy SPADEK poniżej 60 %.
    points: (v) => Math.min(15, (Math.max(0, 60 - v) / 60) * 15)
  }
];

/* Kara mniejsza niż pół punktu nie jest różnicą, którą ktokolwiek odczuje. */
const MIN_PENALTY = 0.5;

/* Składa wejścia w ocenę 0–100 wraz z rozbiciem na kary.
 *
 * Wejście: { melanopic, kelvin, flickerPercent, uniformity } — każde pole
 * opcjonalne, każde może być null. Zwraca { score, penalties, measured }:
 *   score     — 0..100 po zaokrągleniu,
 *   penalties — [{ id, labelPL, points }], posortowane malejąco,
 *   measured  — czy w ogóle było co liczyć.
 *
 * Trzy rzeczy, które v5 poprawiło po v4 i które trzeba tu utrzymać:
 *
 * (1) `measured` liczy WEJŚCIA, nie kary. W v4 było to
 *     `penalties.length > 0 || score === 100`, przez co komplet pomiarów
 *     idealnego światła (same kary ułamkowe, wynik 99,7 → 100) trafiał w drugi
 *     człon przypadkiem, a komplet z jedną karą 0,3 pkt dawał measured:false,
 *     czyli „nie zmierzono” dla pełnego pomiaru. Teraz to dwie różne rzeczy:
 *     brak wejść to measured:false, a jakiekolwiek wejście to measured:true.
 *
 * (2) Kara poniżej progu istotności NIE trafia na listę i zarazem NIE schodzi
 *     z wyniku. W v4 schodziła mimo nieobecności na liście, więc rozbicie
 *     pokazane obok oceny nie sumowało się do niej — użytkownik widział 96 pkt
 *     i cztery kary po 1 pkt.
 *
 * (3) Wielkość niezmierzona nie daje żadnej kary. To wygodne i niebezpieczne
 *     zarazem: BRAK DANYCH DAJE 100 PUNKTÓW. Dlatego samo `score` nie jest
 *     odpowiedzią — wywołujący MUSI sprawdzić `measured`, zanim je pokaże,
 *     a przy pomiarze skrajnie ciemnym warto sprawdzić też, czy wejścia w ogóle
 *     mogły być wiarygodne (v5 robi to w camera.js, poza tym wzorem).
 *
 * Wywołanie bez argumentu jest legalne i zwraca measured:false — funkcja, która
 * nie ma czego policzyć, nie rzuca wyjątkiem. */
export function comfortIndex(input) {
  const src = (input && typeof input === 'object') ? input : {};

  const penalties = [];
  let score = 100;
  let inputs = 0;

  for (let i = 0; i < RULES.length; i += 1) {
    const rule = RULES[i];
    const value = src[rule.key];

    // null, undefined, NaN i cokolwiek, co nie jest liczbą, to brak pomiaru.
    if (typeof value !== 'number' || !isFinite(value)) continue;
    inputs += 1;

    const points = rule.points(value);
    // Poniżej progu istotności kara nie istnieje: ani na liście, ani w wyniku.
    // Te dwie decyzje muszą zapaść razem, inaczej rozbicie przestaje się zgadzać.
    if (points > MIN_PENALTY) {
      penalties.push({ id: rule.id, labelPL: rule.labelPL, points });
      score -= points;
    }
  }

  penalties.sort((a, b) => b.points - a.points);

  return {
    score: Math.round(Math.min(100, Math.max(0, score))),
    penalties,
    measured: inputs > 0
  };
}
