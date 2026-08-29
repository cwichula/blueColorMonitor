# Biblioteka algorytmów pomiaru światła (`docs/lib`)

## Czym to jest

Zbiór czystych funkcji, które zamieniają wartości RGB z kamery na wielkości opisujące
światło: udział niebieskiego, jasność sceny, temperaturę barwową, współczynnik
melanopiczny, migotanie, równomierność i złożony z nich indeks komfortu. Jeden plik na
temat, moduły ES, nazwane eksporty, zero zależności zewnętrznych. Żadna funkcja nie
dotyka DOM, canvasu, `window` ani `localStorage`, więc wszystko uruchamia się tak samo
w przeglądarce i w Node.

Wzory pochodzą z aplikacji: `docs/v5/js/camera.js` (redakcja najnowsza),
`docs/shared/metrics.js` i `docs/shared/engine.js` (redakcja klasyczna, dziś wspólna dla
v2–v4, wcześniej trzymana osobno w każdej z nich) oraz `docs/v1/app.js` (pierwotna
definicja udziału niebieskiego). Tam, gdzie wersje się różnią, przeniesiona jest wersja
z v5, a różnica opisana w komentarzu przy wzorze.

## Czym to nie jest

**To nie jest przyrząd pomiarowy i nie jest badanie medyczne.** Kamera telefonu nie mierzy
widma, nie ma kalibracji fotometrycznej i sama, bez pytania, zmienia ekspozycję oraz
balans bieli. Żadna liczba z tej biblioteki nie jest luksami, kandelami ani wynikiem
diagnostycznym. Wielkości są porównywalne **ze sobą w jednej sesji na jednym urządzeniu** —
pokazują kierunek zmiany („po włączeniu trybu nocnego udział niebieskiego spadł o 8 punktów”),
a nie wartość bezwzględną, którą wolno zestawiać z miernikiem albo z cudzym telefonem.

Zasada, która obowiązuje w całej bibliotece: **wartość niezmierzona to `null`, nigdy `0`**.
Funkcja, która nie ma czego policzyć, zwraca `null` albo obiekt z `null` — nie rzuca
wyjątkiem i nie podstawia wartości zastępczej. Zero jest tu wynikiem pomiaru, nie jego
brakiem: „0,00×” dla współczynnika melanopicznego czytałoby się jako światło doskonałe,
podczas gdy naprawdę znaczyłoby, że kadr jest czarny.

## Spis plików

| Plik | Co robi |
| --- | --- |
| `index.js` | Jeden punkt wejścia — re-eksportuje wszystko, sam nic nie liczy. |
| `color.js` | Podstawy barwy: zdjęcie gammy sRGB i powrót do 8 bitów, macierz sRGB → CIE XYZ (biel D65), chromatyczność `x, y` oraz `u, v` w CIE 1960 UCS i luminancja względna. |
| `blue-share.js` | Udział kanału niebieskiego w sumie kanałów, w procentach — pierwotna wielkość tej aplikacji, celowo liczona na wartościach z gammą (powód w komentarzu w pliku). |
| `brightness.js` | Średnia jasność kadru w procentach zakresu 0–255; wielkość względna, nie luksy. |
| `colour-temperature.js` | Temperatura barwowa wielomianem McCamy'ego wraz z Duv i flagą `reliable`, która odmawia podania kelwinów dla barwy leżącej za daleko od krzywej Plancka. |
| `melanopic.js` | Przybliżony stosunek melanopiczny do fotopicznego, znormalizowany tak, że neutralna biel daje 1,00; wagi kanałów wypisane jawnie jako `MELANOPIC_WEIGHTS`. |
| `flicker.js` | Procent migotania wg definicji IES z okna próbek jasności plus zgrubna częstotliwość i flaga `withinRange`, która mówi, czy tę częstotliwość w ogóle wolno pokazać. |
| `uniformity.js` | Równomierność jako iloraz najciemniejszej i najjaśniejszej komórki siatki, w procentach; jedyna wielkość, w której więcej znaczy lepiej. |
| `comfort.js` | Indeks komfortu 0–100 składany z pozostałych wielkości wraz z rozbiciem na kary; wagi są jawną oceną redakcyjną projektu. |
| `zones.js` | Podział wartości na strefy `good` / `warn` / `crit` (z obsługą wielkości odwróconych) oraz domyślne progi wszystkich wielkości. |
| `catalogue.js` | Katalog siedmiu wielkości: identyfikator, nazwa i opis po polsku, jednostka, zakres, liczba miejsc po przecinku i progi. Wszystkie siedem wielkości jest dostępnych bez warunków. |
| `frame.js` | Obróbka klatki bez canvasu: kadrowanie środka, uśrednianie w siatce N×N, kalibracja wzmocnieniami kanałów i bufor okna próbek dla migotania. |
| `package.json` | Sam znacznik `{"type":"module", "private":true}` — żeby Node traktował te pliki `.js` jak moduły ES i żeby nikt nie opublikował katalogu jako paczki. |
| `*.test.js` | Testy leżące obok sprawdzanego pliku; sprawdzają fizykę i wartości odniesienia, nie zapis implementacji. |
| `shared-parity.test.js` | Jedyny test bez własnego pliku źródłowego: porównuje tę bibliotekę z klasyczną redakcją `docs/shared/metrics.js`. Skrypt klasyczny nie ma żadnego `export`, więc test wczytuje go z dysku i wykonuje przez `node:vm` w osobnym kontekście, a `window.Metrics` odczytuje z podstawionego globala. |

## Wszystkie wielkości są dostępne bez warunków

Katalog nie niesie pola ani listy, którą dałoby się warunkować dostęp do wskaźnika:
siedem wielkości liczy się dla każdego, od razu. Listę identyfikatorów daje po prostu
`CATALOGUE.map((m) => m.id)`, a `catalogue.test.js` pilnuje, żeby żadne takie pole nie
wróciło bokiem.

## Użycie w przeglądarce

Pliki są modułami ES i importuje się je wprost, bez budowania i bez bundlera:

```html
<script type="module">
  import { blueShare, zoneFor, DEFAULT_THRESHOLDS } from './lib/index.js';

  const share = blueShare(120, 130, 190);          // 43.18… %
  const t = DEFAULT_THRESHOLDS.share;              // { warn: 26, crit: 33 }
  console.log(share, zoneFor(share, t.warn, t.crit, false));   // 43.18… "crit"
</script>
```

Czwarty argument `zoneFor` to `invert` — tutaj `false`, bo przy udziale niebieskiego więcej
znaczy gorzej. Dla wielkości odwróconych (równomierność, komfort) jest `true`; flagę dla
każdej wielkości niesie jej wpis w katalogu: `byId('uniformity').invert`.

Import musi iść przez serwer HTTP, a nie przez `file://` — przeglądarki blokują moduły
otwierane prosto z dysku. W tym repozytorium wystarczy `docs/serve.ps1`.

## Użycie w Node i uruchomienie testów

Node widzi te same pliki bez żadnej przeróbki — to jest sens zakazu DOM-u i canvasu:

```js
import { melanopicRatio, comfortIndex } from './docs/lib/index.js';

const mel = melanopicRatio(255, 244, 229);        // ciepła biel
console.log(comfortIndex({ melanopic: mel, kelvin: 2900, flickerPercent: 3 }));
```

Testy uruchamia wbudowany runner Node — nie trzeba instalować niczego:

```
cd docs/lib
node --test
```

Testy leżą obok kodu, który sprawdzają, i nazywają się `<temat>.test.js` (na przykład
`color.test.js` obok `color.js`); runner bez argumentów odnajduje je w katalogu bieżącym.
Z korzenia repozytorium to samo robi `node --test "docs/lib/*.test.js"` (wzorzec w
cudzysłowie, żeby rozwinął go Node, a nie powłoka). Pojedynczy plik uruchamia się tak:
`node --test docs/lib/color.test.js`.

Czego NIE używać: `node --test docs/lib` ze ścieżką katalogu. Na Node 24 (Windows) katalog
nie jest przeszukiwany — jest ROZWIĄZYWANY jak moduł, więc runner uruchamia sam
`index.js`, nie znajduje w nim ani jednego testu i melduje „tests 1 / pass 1”. Zielony
wynik bez jednej wykonanej asercji jest gorszy niż czerwony, dlatego ta forma nie jest
tu poleceniem, tylko pułapką. Wymagany jest Node 18 lub nowszy; sprawdzane na Node 24.

## OGRANICZENIA

Napisane prostym językiem, bo to nie jest przypis — to jest instrukcja obsługi wyników.

- **Kamera nie mierzy widma.** Ma trzy szerokie, nakładające się kanały i tyle. Dwa źródła
  światła o zupełnie różnym widmie mogą dać identyczne RGB, a różnić się tym, jak działają
  na oko i na rytm dobowy. Wszystko, co niżej, wynika z tego jednego faktu.
- **Automatyka ekspozycji przesuwa jasność pod spodem.** Kamera sama rozjaśnia ciemną scenę
  i przyciemnia jasną, żeby obraz „wyglądał dobrze”. Dlatego jasność sceny jest liczbą
  względną, a nie luksami: ta sama lampa da inny odczyt w innym kadrze, a przejście
  z ciemnego pokoju do jasnego zobaczysz z opóźnieniem i w spłaszczonej skali.
- **Migotanie powyżej połowy częstotliwości próbkowania aliasuje.** Próbkując 10 razy na
  sekundę widzisz pulsowanie tylko poniżej 5 Hz. Migotanie sieciowe (100 Hz w Europie,
  120 Hz w USA) jest o rząd wielkości szybsze i pokaże się jako fałszywa, wolna fala.
  Właśnie po to jest pole `withinRange`: gdy ma wartość `false`, częstotliwości nie wolno
  pokazywać, choćby liczba wyglądała rozsądnie. Sam procent migotania bywa wtedy zaniżony,
  więc niska wartość nie jest dowodem, że światło nie migocze.
- **Temperatura barwowa i współczynnik melanopiczny to przybliżenia z trzech kanałów.**
  Kelwiny mają sens wyłącznie dla światła leżącego blisko krzywej Plancka — dla barwy
  nasyconej (kolorowy ekran, dioda RGB) wielomian nadal zwróci liczbę, tyle że nic nie
  znaczącą; dlatego biblioteka woli zwrócić `null` niż ładnie wyglądający wynik.
  Współczynnik melanopiczny opiera się na trzech punktach odczytanych z krzywej działania
  melanopsyny zamiast na całce po widmie: kierunek zmian oddaje pewnie, wartości
  bezwzględnej nie oddaje wcale.
- **Indeks komfortu ma wagi będące oceną redakcyjną.** Żadna instytucja nie ogłosiła, że
  chłodna barwa jest warta 25 punktów kary — to jest osąd tego projektu, wypisany jawnie
  w `comfort.js` po to, żeby dało się z nim nie zgodzić. Indeks zwraca też rozbicie na kary
  i flagę `measured`; bez sprawdzenia `measured` nie wolno pokazać wyniku, bo wielkość
  niezmierzona nie daje żadnej kary, czyli **brak danych daje 100 punktów**.
- **Kalibracja białą kartką pomaga, ale nie zamienia kamery w spektrometr.** Zdejmuje stałe
  przekłamanie kanałów czujnika i poprawia dwie najbardziej przybliżone liczby (kelwiny
  i melanopic). Nie usuwa żadnego z ograniczeń wymienionych wyżej.

## Stosunek do wersji aplikacji

**Z tej biblioteki korzysta `docs/v5`** — to nie jest kod odłożony na bok. Wchodzi do
aplikacji przez `docs/v5/js/metrics.js`, który po refaktorze jest wyłącznie cienką
warstwą adaptacyjną: re-eksportuje funkcje wprost, a w trzech miejscach (`blueShare`,
`melanopicRatio`, `flicker`) zamienia `null` na `0`, bo v5 od pierwszego dnia pokazuje
tam zero i zmiana tej liczby na ekranie oraz w zapisanej historii byłaby osobną decyzją
produktową, a nie skutkiem ubocznym przenosin. Adaptery są w kodzie opisane po to, żeby
ten dług był widoczny. Ponieważ moduły biblioteki wchodzą do grafu importów v5, muszą
też stać na liście `APP_SHELL` w `docs/v5/sw.js` — inaczej po utracie sieci aplikacja
pokaże biały ekran. Zmiana pliku tutaj wymaga podniesienia `CACHE` w tamtym workerze.

Wersje `v2`, `v3` i `v4` biblioteki **nie** importują — ładują klasyczne skrypty
w synchronicznej kolejności tagów `<script>` i cała ich warstwa startu jest na tym
zbudowana. Ich wspólna matematyka mieszka w `docs/shared/metrics.js` (`window.Metrics`),
opisanym w `docs/shared/README.md`. Wersja `v1` ma własną, najstarszą redakcję wewnątrz
`docs/v1/app.js`.

Doktryny obu redakcji różnią się świadomie i to jest jedyna prawdziwa różnica między
nimi. Tutaj **wartość niezmierzona to `null`**: czarny kadr nie ma udziału niebieskiego,
zerowe okno nie ma migotania, barwa daleka od krzywej Plancka nie ma kelwinów.
W `docs/shared/metrics.js` brak pomiaru bywa `0` albo wartością zastępczą: czerń daje
0 % udziału (i zieloną strefę), zerowe okno daje `percent: 0`, kelwiny są zawsze liczbą
zaciśniętą do 1500–12500 z osobną flagą `reliable`, a `comfortIndex` bez ani jednego
wejścia melduje `measured: true`. Nazwy stref też się różnią: `warn`/`crit` tutaj,
`warning`/`critical` tam — przy identycznym podziale wartości.

**Wszędzie tam, gdzie obie redakcje coś liczą, wyniki są równe co do bitu** — i tego
pilnuje `shared-parity.test.js`, a nie pamięć człowieka. Test wypisuje każdą różnicę
doktryn jako osobny przypadek z prefiksem „RÓŻNICA POKOLEŃ”, więc zapali się na czerwono
zarówno wtedy, gdy rozjedzie się wzór, jak i wtedy, gdy któraś z opisanych różnic
zniknie — bo to też jest zmiana zachowania aplikacji, a nie kosmetyka.

Praktyczny wniosek: poprawka wzoru tutaj zmienia zachowanie **v5**, ale nie dotyka v2–v4.
Jeśli wzór ma się zmienić wszędzie, trzeba go poprawić także w `docs/shared/metrics.js`
i podnieść `CACHE` w service workerach wszystkich wersji, których to dotyczy.
