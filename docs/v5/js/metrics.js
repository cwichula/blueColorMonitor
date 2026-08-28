/* Monitor Światła v5 — adapter do biblioteki pomiarowej.
 *
 * MATEMATYKA POMIARU NIE MIESZKA JUŻ W TYM PLIKU. Wszystkie wzory, stałe
 * i katalog wielkości są w docs/lib (moduły ES, 210 testów w node --test).
 * Tutaj zostaje wyłącznie ADAPTACJA do zastanego zachowania v5 — nic poza tym
 * nie wolno tu dopisywać: nowa wielkość i każda poprawka wzoru idą do biblioteki,
 * a nie obok niej.
 *
 * Powód istnienia tej warstwy: biblioteka trzyma doktrynę „wartość niezmierzona
 * to null, nigdy 0”, a v5 od pierwszego dnia pokazuje w kilku miejscach zero.
 * Zamiana zera na pauzę zmieniłaby liczby na ekranie i w zapisanej historii,
 * więc jest osobną decyzją produktową, a nie skutkiem ubocznym refaktoru.
 * Trzy adaptery poniżej przywracają stare zachowanie JAWNIE, żeby ten dług był
 * widoczny w kodzie, a nie ukryty w jego braku.
 *
 * Uwaga o comforcie i strefach: camera.js karmi comfortIndex polami `melanopic`
 * i `flickerPercent` prosto z tych funkcji, a comfortIndex LICZY WEJŚCIA (pole
 * będące liczbą to wejście, null to jego brak). Gdyby adaptery przestały
 * zwracać 0, przy czarnym kadrze zmieniłoby się `measured`, a więc i to, czy
 * komfort w ogóle jest publikowany — dlatego adaptery są warunkiem zachowania
 * identycznych liczb, a nie ozdobą.
 *
 * Ograniczenia samych wielkości (trzy szerokie kanały kamery, brak widma, brak
 * fotometrii) opisują pliki źródłowe w docs/lib i README tamże.
 */

/* Zgodne co do znaku — przechodzą wprost, bez ani jednej linii kodu pośredniego.
 *
 * Różnice, które biblioteka DOKŁADA i które są nieszkodliwe dla v5:
 *  - toLinear / toXYZ zwracają null zamiast NaN dla wejścia, które nie jest
 *    liczbą (v5 podaje im wyłącznie liczby: camera.js buduje tablicę LIN
 *    z całkowitych 0..255, a kanały zaciska przez clamp255);
 *  - brightness / colourTemperature odrzucają kanał spoza 0..255 (v5 zacisnął
 *    go wcześniej, więc taki kanał tu nie dociera);
 *  - colourTemperature dokłada do wyniku pole `duv` obok { kelvin, reliable };
 *    v5 czyta tylko dwa pierwsze, a reading z camera.js składany jest polami,
 *    więc dodatkowe pole nigdzie nie wycieka;
 *  - zoneFor odmawia strefy (null), gdy próg nie jest liczbą — w v5 progi
 *    pochodzą wyłącznie ze store.validThreshold (Number + isFinite) albo
 *    z katalogu, więc ten strażnik nie ma jak się odezwać;
 *  - comfortIndex znosi wywołanie bez argumentu (v5 rzucało wtedy wyjątkiem).
 * Żadna z nich nie zmienia liczby dla danych, które v5 naprawdę produkuje. */
export {
  toLinear,
  toXYZ,
  brightness,
  colourTemperature,
  uniformity,
  comfortIndex,
  zoneFor,
  CATALOGUE,
  byId
} from '../../lib/index.js';

import {
  blueShare as libBlueShare,
  melanopicRatio as libMelanopicRatio,
  flicker as libFlicker
} from '../../lib/index.js';

/* ------------------------------------------------------------------
   Adaptery — świadomy dług, nie przeoczenie
   ------------------------------------------------------------------ */

/* v5 zostaje przy zerze, bo „0 %” dla czarnego kadru jest w tej aplikacji od
 * v1 i siedzi w zapisanej historii, więc pauza zrobiłaby dziurę wstecz we
 * wszystkich wykresach; przejście na pauzę wymaga tylko usunięcia tej linii
 * (format.js drukuje wtedy myślnik, a zoneFor zwraca 'none') i decyzji
 * właściciela projektu, jak potraktować już zapisane zera. */
export function blueShare(r, g, b) {
  const value = libBlueShare(r, g, b);
  return value === null ? 0 : value;
}

/* v5 zostaje przy zerze, bo ta liczba wchodzi do comfortIndex jako WEJŚCIE:
 * zamiana jej na pauzę przy zgaszonym kadrze zmieniłaby `measured`, a więc
 * i to, czy komfort się w ogóle pokazuje; przejście na pauzę wymaga przejrzenia
 * camera.js (comfortUsable i pole `comfort` w reading), bo to tam, a nie tutaj,
 * mieszka reguła „za ciemno, żeby cokolwiek twierdzić”. */
export function melanopicRatio(r, g, b) {
  const value = libMelanopicRatio(r, g, b);
  return value === null ? 0 : value;
}

/* v5 zostaje przy zerze z tego samego powodu co melanopic — `percent` jest
 * wejściem comfortIndex, a dodatkowo camera.js pyta wprost `fl.percent !== null`
 * przy decyzji o publikacji komfortu; przejście na pauzę wymaga zmiany tamtego
 * warunku razem z tą linią, inaczej komfort zniknąłby w ciemnym kadrze dwa razy
 * z dwóch różnych powodów. */
export function flicker(samples, sampleHz) {
  // v5 podstawiało brak częstotliwości jedynką (sampleHz || 1) i liczyło herce
  // od tej wartości zastępczej, ale granicę Nyquista brało z (sampleHz || 0),
  // czyli z zera — herce wychodziły liczbą, która nigdy nie była wiarygodna.
  // Biblioteka po prostu odmawia podania herców bez częstotliwości; żeby liczby
  // się nie zmieniły, podajemy jej tę samą wartość zastępczą i sami gasimy
  // wiarygodność. Ujemna częstotliwość dawała w v5 hz = null — stąd zero niżej,
  // które biblioteka czyta jako „brak osi czasu”.
  const known = typeof sampleHz === 'number' && isFinite(sampleHz) && sampleHz > 0;
  const substitute = sampleHz || 1;
  const result = libFlicker(samples, known ? sampleHz : (substitute > 0 ? substitute : 0));

  return {
    percent: result.percent === null && isFlatWindow(samples) ? 0 : result.percent,
    hz: result.hz,
    withinRange: known ? result.withinRange : false
  };
}

/* Czy biblioteka odmówiła wyniku WYŁĄCZNIE dlatego, że okno jest płaskie przy
 * zerze (max + min <= 1e-9), a nie dlatego, że próbek jest za mało albo są
 * uszkodzone. Powtórzony jest tu tylko strażnik poprawności próbek — żadnego
 * wzoru; po odjęciu jego przyczyn zostaje już tylko rozpiętość. */
function isFlatWindow(samples) {
  if (!samples || typeof samples.length !== 'number' || samples.length < 8) return false;
  for (let i = 0; i < samples.length; i += 1) {
    const v = samples[i];
    if (typeof v !== 'number' || !isFinite(v) || v < 0) return false;
  }
  return true;
}
