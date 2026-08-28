# Kod wspólny wersji v2–v4 (`docs/shared`)

## Czym jest ten katalog

Cztery pliki, które wersje v2, v3 i v4 miały do tej pory u siebie w trzech niemal
identycznych kopiach. Są to **klasyczne skrypty**, nie moduły: każdy z nich jest
opakowany w IIFE i wystawia jedną globalną nazwę na `window`.

| plik | co wystawia | które wersje go ładują | skąd został przeniesiony (tam już go nie ma) |
| --- | --- | --- | --- |
| `bus.js` | `window.Bus` — `on`, `once`, `emit` | v2, v3, v4 | `docs/v3/bus.js` (v4 był bajtowo identyczny) |
| `metrics.js` | `window.Metrics` — matematyka pomiaru i `Metrics.CATALOGUE` | v2, v3, v4 | `docs/v4/metrics.js` (v2 i v3 różniły się tylko komentarzami) |
| `engine.js` | `window.Engine` — kamera, próbkowanie 5 Hz, bufory, progi, kalibracja | v2, v3, v4 | `docs/v3/engine.js` (v4 identyczny, v2 różnił się trzema blokami komentarza) |
| `scale-core.js` | `window.Scale` — geometria skali i formatowanie liczb | v3, v4 | `docs/v4/scale.js`, linie 22–341 (bez słownika `Scale.TEXT`) |

Kolumna „które wersje go ładują” opisuje stan faktyczny: pliki są wpięte
w `index.html` i wymienione w `APP_SHELL` każdej z tych wersji, a w katalogach
`docs/v2`, `docs/v3` i `docs/v4` nie ma już ich kopii.

`v2` nie ładuje `scale-core.js` — nie ma warstwy skali. Ładuje natomiast
`bus.js`; własna, zapasowa magistrala w `ui-core.js` została na miejscu i zakłada
się tylko wtedy, gdy `window.Bus` nie istnieje, czyli gdyby plik wspólny się nie
wczytał.

## Kolejność ładowania

Dwie zależności trzeba uszanować w tagach `<script>`:

1. `metrics.js` i `bus.js` przed `engine.js` — silnik oddaje im całą arytmetykę
   i całą komunikację.
2. `scale-core.js` **przed** lokalnym `scale.js` danej wersji. `scale-core.js`
   tworzy obiekt `window.Scale`, a lokalny `scale.js` dokłada do tego samego
   obiektu słownik `Scale.TEXT` — napisy opisujące ekrany konkretnej wersji, więc
   z natury nie do współdzielenia. Funkcje z `scale-core.js` sięgają po
   `Scale.TEXT` dopiero w chwili wywołania, a nie w chwili definicji, więc taka
   kolejność w zupełności wystarcza.

## Dlaczego to istnieje oddzielnie od `docs/lib`

`docs/lib` to **moduły ES** z nazwanymi eksportami i zestawem testów
(`node --test`), z których korzysta v5. Wersje v2–v4 ładują **klasyczne skrypty**
w synchronicznej kolejności tagów `<script>` i cała ich warstwa startu jest na tym
zbudowana:

* **v2** — `boot.js` sprawdza listę `REQUIRED` obecnych globali (`Metrics`,
  `Engine`, …) i na tej podstawie mówi użytkownikowi, którego pliku brakuje;
* **v3** — `boot.js` diagnozuje brakujące moduły przez `global.UI3` i mapę
  `MODULE_FILES`, która wiąże numer modułu z nazwą pliku;
* **v4** — ekrany rejestrują się w kolejce `window.__ms4PendingViews`, którą
  `app.js` rozwija po swoim starcie.

Moduł ES ładuje się odroczony i asynchroniczny, więc żadnej z tych trzech
warstw startu nie da się obsłużyć modułem bez przepisania jej od nowa. To jest
cała przyczyna istnienia tego katalogu.

Skutek uboczny, o którym trzeba wiedzieć: **matematyka pomiaru istnieje w dwóch
redakcjach** — modułowej w `docs/lib` i klasycznej tutaj. Ich zgodności pilnuje
test `docs/lib/shared-parity.test.js` — uruchamiany razem z resztą przez
`node --test` w `docs/lib`. Jeśli poprawiasz wzór, poprawiasz go w obu miejscach
albo test to wyłapie.

## Zasada: jedna zmiana, trzy wersje

Zmiana pliku w tym katalogu dotyka **trzech wersji naraz**. Dlatego po każdej
takiej zmianie trzeba podbić numer pamięci `CACHE` w:

* `docs/v2/sw.js`
* `docs/v3/sw.js`
* `docs/v4/sw.js`

Bez tego service worker poda użytkownikowi starą kopię pliku z pamięci i zmiany
po prostu nie zobaczysz — ani ty w przeglądarce, ani on na telefonie.

Osobno: w plikach z tego katalogu nie wolno umieszczać odwołań do układu ekranu
konkretnej wersji ani napisów widocznych dla użytkownika ponad te, które już tam
są. Napisy mieszkają w `Scale.TEXT` lokalnego `scale.js` oraz w
`Metrics.CATALOGUE`.
