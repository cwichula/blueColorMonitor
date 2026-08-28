# Kod wspólny wersji v1–v4 (`docs/shared`)

## Czym jest ten katalog

Cztery pliki, które wersje v2, v3 i v4 miały do tej pory u siebie w trzech niemal
identycznych kopiach — oraz piąty, `i18n.js`, napisany od razu jako wspólny
i ładowany przez wszystkie cztery wersje, także przez v1. Są to **klasyczne
skrypty**, nie moduły: każdy z nich jest opakowany w IIFE i wystawia jedną
globalną nazwę na `window`.

| plik | co wystawia | które wersje go ładują | skąd został przeniesiony (tam już go nie ma) |
| --- | --- | --- | --- |
| `bus.js` | `window.Bus` — `on`, `once`, `emit` | v2, v3, v4 | `docs/v3/bus.js` (v4 był bajtowo identyczny) |
| `metrics.js` | `window.Metrics` — matematyka pomiaru i `Metrics.CATALOGUE` | v2, v3, v4 | `docs/v4/metrics.js` (v2 i v3 różniły się tylko komentarzami) |
| `engine.js` | `window.Engine` — kamera, próbkowanie 5 Hz, bufory, progi, kalibracja | v2, v3, v4 | `docs/v3/engine.js` (v4 identyczny, v2 różnił się trzema blokami komentarza) |
| `scale-core.js` | `window.Scale` — geometria skali i formatowanie liczb | v3, v4 | `docs/v4/scale.js`, linie 22–341 (bez słownika `Scale.TEXT`) |
| `i18n.js` | `window.I18n` — wybór języka, `t()`, doładowanie słowników z `i18n/` | v1, v2, v3, v4 | nowy plik; opis w rozdziale „Warstwa językowa” niżej |

Kolumna „które wersje go ładują” opisuje stan faktyczny: pliki są wpięte
w `index.html` i wymienione w `APP_SHELL` każdej z tych wersji, a w katalogach
`docs/v2`, `docs/v3` i `docs/v4` nie ma już ich kopii. Jedyny wyjątek to
`i18n.js`: silnik i słowniki wspólne już są, ale wpięcie ich w `index.html`
i w `APP_SHELL` poszczególnych wersji należy do etapu, w którym powstają
słowniki wersji.

`v2` nie ładuje `scale-core.js` — nie ma warstwy skali. Ładuje natomiast
`bus.js`; własna, zapasowa magistrala w `ui-core.js` została na miejscu i zakłada
się tylko wtedy, gdy `window.Bus` nie istnieje, czyli gdyby plik wspólny się nie
wczytał.

## Kolejność ładowania

Trzy zależności trzeba uszanować w tagach `<script>`:

0. `i18n.js` **przed wszystkim innym**, jako pierwszy skrypt w `<head>`.
   Dopisuje do strumienia parsera znaczniki słowników, więc musi się wykonać,
   zanim parser dojdzie do skryptów budujących ekran. Dlaczego akurat tak —
   w rozdziale „Warstwa językowa”.
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
są. Napisy mieszkają w `Scale.TEXT` lokalnego `scale.js`, w `Metrics.CATALOGUE`
i — docelowo — w słownikach `i18n/`. To ostatnie miejsce jest jedynym, które
przybywa: `i18n.js` jest silnikiem, nie słownikiem, i sam też nie ma prawa
zawierać napisów (jedyny wyjątek: nazwa własna języka w `I18n.LANGUAGES`, która
z definicji nie podlega tłumaczeniu).


## Warstwa językowa (`i18n.js` + `i18n/`)

Aplikacja mówi w trzydziestu językach. Silnik tej warstwy to `shared/i18n.js` —
piąty plik wspólny, ładowany przez **wszystkie cztery wersje**, także przez v1
(jako jedyny plik z tego katalogu; v1 poza tym jest samodzielna).

| plik / katalog | co to jest |
| --- | --- |
| `shared/i18n.js` | silnik: `window.I18n` — `LANGUAGES`, `detect`, `t`, `number`, `locale`, `dir`, `language`, `isAuto`, `has`, `missing`, `ready`, `setLanguage` |
| `shared/i18n/<kod>.js` | słownik **wspólny** danego języka |
| `docs/vN/i18n/<kod>.js` | słownik **własny** wersji |

### Co gdzie mieszka — zasada podziału

* **`shared/i18n/`** — treści wspólne dla wszystkich wersji: nazwy, opisy i pomoc
  siedmiu wielkości z `Metrics.CATALOGUE`, nazwy stref, jednostki, zdania
  oceniające, zdania o granicach metody, zastrzeżenie medyczne, teksty
  o prywatności, liczebniki. Wszystko, co mówi o **pomiarze**.
* **`docs/vN/i18n/`** — treści własne wersji: nazwy ekranów, opisy przycisków,
  etykiety dostępności, teksty modułów — wszystko, co opisuje **układ tej
  konkretnej wersji**.

Wersja ładuje najpierw słownik wspólny, potem własny, i tylko własny może
nadpisać klucz wspólny. Nigdy odwrotnie. Przykład z życia: wspólne
`verdict.critical.comfort` kończy się zdaniem bez numeru modułu, a v3 i v4
nadpisują ten jeden klucz u siebie, żeby odesłać do „modułu 01”.

### Format pliku słownika

Ten sam dla wszystkich trzydziestu języków i wszystkich wersji:

```js
window.I18nData = window.I18nData || {};
window.I18nData['de'] = Object.assign(window.I18nData['de'] || {}, {
  'metric.share.name': 'Blauanteil',
  'count.readings': { one: '{n} Messwert', other: '{n} Messwerte' }
});
```

`Object.assign`, a nie zwykłe podstawienie — inaczej plik wersji skasowałby
właśnie wczytaną warstwę wspólną. Słownik nie odwołuje się do `window.I18n`,
więc jest poprawny nawet wtedy, gdy to silnik jest tym plikiem, który się nie
wczytał.

### Zasady, od których nie ma odstępstw

Te same obowiązują v5, więc rozjazd oznaczałby dwie niezgodne rodziny słowników:

* klucze **kropkowane, po angielsku, semantyczne** — `zone.good`,
  `metric.share.help`, a nie `napis17`;
* wstawki w klamrach `{nazwa}`, **identyczne we wszystkich językach**;
* liczba mnoga: wartością klucza jest obiekt form CLDR
  `{ one, few, many, other }`, rozstrzygany przez `Intl.PluralRules` aktywnego
  języka. Własnych reguł odmiany nie piszemy — polskie „2 odczyty / 5 odczytów”,
  arabskie sześć kategorii i rosyjskie „many” już tam są;
* **zestaw kluczy wyznacza `en.js`**. Brak klucza w aktywnym języku spada na
  wartość angielską, a dopiero potem na sam klucz — angielski jest więc jedynym
  słownikiem, który musi być kompletny, i jedynym, którego nie wolno pominąć
  przy ładowaniu. Polski jest jednym z trzydziestu, nie językiem zapasowym;
* parametr będący **liczbą** jest zapisywany po myśli aktywnego języka
  (`2,5` po polsku, `2.5` po angielsku, `٢٫٥` po arabsku). Do zdania nie wpisuje
  się liczby na sztywno — podaje się ją jako wstawkę.

### Jak to się ładuje i dlaczego akurat tak

Słownik jest doładowywany **wstrzykniętym znacznikiem `<script>`**. Nie modułem
ES — v1–v4 są klasyczne i cała ich warstwa startu stoi na synchronicznej
kolejności znaczników, a moduł ładuje się zawsze odroczony i wymaga CORS (czyli
koniec z otwieraniem `index.html` z dysku). Nie przez `fetch` + `eval` — to
wymagałoby `unsafe-eval` w każdej przyszłej polityce CSP i gubiłoby nazwę pliku
w śladzie stosu. Zwykły `<script src>` jest za to najzwyklejszym plikiem
statycznym: wchodzi do `APP_SHELL` service workera tak samo jak reszta.

Problem „słowniki są asynchroniczne, a v1–v4 budują ekran synchronicznie”
rozwiązano dwiema ścieżkami, między którymi silnik wybiera sam:

1. **synchroniczna** — gdy `i18n.js` wykonuje się w trakcie parsowania strony
   i nie ma na sobie `defer` ani `async`, dopisuje znaczniki słowników przez
   `document.write`. Parser zatrzymuje się na nich tak samo jak na `metrics.js`,
   więc **zanim wykona się pierwszy skrypt aplikacji, słowniki są w pamięci**.
   Dlatego `i18n.js` musi stać w `<head>` jako pierwszy skrypt strony i dlatego
   `I18n.ready(cb)` wywołuje się wtedy natychmiast, w tym samym takcie;
2. **asynchroniczna** — każdy inny przypadek (i każda późniejsza zmiana języka
   przez `setLanguage`): znaczniki dopisywane do `<head>` z `script.async = false`,
   gotowość przez `I18n.ready()`.

`I18n.t()` nigdy nie rzuca i nigdy nie zwraca `undefined`, więc ekran zbudowany
za wcześnie będzie po angielsku, a nie pusty. Brak pliku słownika też nie jest
awarią: w konsoli zostaje 404, a napisy spadają na angielski — sprawdzone
w Chrome, na obu ścieżkach.

### Wybór języka

`I18n.detect()` pyta po kolei: zapisany wybór użytkownika (`localStorage`, klucz
`ms.lang.v1` — **wspólny dla wszystkich wersji**, bo język jest cechą człowieka,
nie wersji aplikacji), potem `navigator.languages` z dopasowaniem po samym
kodzie języka (`de-AT` → `de`), a gdy nic nie pasuje — `en`.

`I18n.setLanguage(kod)` zapisuje wybór, doładowuje słownik, ustawia `lang` i `dir`
na `<html>` i dopiero na końcu rozgłasza przez magistralę:

```
i18n:changed   { code, dir, previous }
```

`Bus` nie ma pamięci dla tego zdarzenia (sticky jest tylko `app:ready`), więc kto
potrzebuje stanu początkowego, bierze go z `I18n.ready()`, a nie z magistrali.
`setLanguage(null)` kasuje wybór i wraca do języka urządzenia.

Kierunek pisma: `ar`, `ur` i `fa` mają `dir: 'rtl'` w `I18n.LANGUAGES` i to
silnik ustawia `dir` na `<html>` — układ ekranu ma się odwrócić sam, arkuszem
stylów, a nie osobnym kodem w każdej wersji.

### Podbicie CACHE — także tutaj

Dopisanie języka to dopisanie pliku do `APP_SHELL` każdej wersji, która ma go
podawać offline, i podbicie `CACHE` w `docs/v1/sw.js`…`docs/v4/sw.js`. Bez tego
service worker poda starą listę i nowy język zadziała tylko online.
