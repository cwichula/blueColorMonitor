/* Monitor Światła v5 — sw.js
 *
 * ROLA PLIKU: sprawić, żeby brak sieci i zamknięta karta znaczyły to samo.
 * Aplikacja niczego z sieci nie potrzebuje — każdy ekran, każda ikona i każda
 * liczba powstają na urządzeniu — więc offline jest tu trybem normalnym,
 * a nie awaryjnym.
 *
 * Dwie strategie, świadomie różne:
 *   - nawigacja (dokument): najpierw sieć, w jej braku pamięć podręczna.
 *     Powłoka jest jedynym plikiem, którego nieświeżość widać od razu,
 *     a kto ma sieć, nie powinien odświeżać dwa razy, żeby dostać poprawkę.
 *   - reszta (CSS, moduły JS, ikony, manifest): stale-while-revalidate —
 *     z pamięci natychmiast, świeża kopia w tle na następne uruchomienie.
 *
 * NAJWAŻNIEJSZE: ten worker obsługuje katalog /v5/ ORAZ wspólną bibliotekę
 * pomiarową /lib/, z której v5 importuje całą matematykę. Wersje 1–4 są
 * publikowane z własnych katalogów, mają własne workery i własne nazwy pamięci.
 * Dlatego:
 *   - żądania spoza tych dwóch katalogów przepuszczamy nietknięte,
 *   - przy sprzątaniu kasujemy wyłącznie własne pamięci, po wzorcu /^ms5-/.
 * Złamanie któregokolwiek z tych punktów psuje cztery działające wersje naraz.
 * (Wspólny katalog /lib/ zapisujemy u siebie i to jest w porządku: każda wersja,
 * która kiedyś po niego sięgnie, trzyma własną kopię we własnej pamięci —
 * wspólny adres w kilku pamięciach naraz jest powodem, dla którego czytamy
 * zawsze przez { cacheName: CACHE }, a nigdy globalnym caches.match.)
 *
 * Numer w nazwie pamięci podbijamy przy KAŻDEJ zmianie któregokolwiek pliku
 * z listy poniżej.
 */

var CACHE = 'ms5-13';
var CACHE_PREFIX = 'ms5-';

/* Ścieżki względne celowo: aplikacja ma działać spod /v5/, spod
   /<repozytorium>/docs/v5/ i ze skopiowanego katalogu, bez zmiany ani jednej
   linii. Lista jest pełnym drzewem plików wykonywalnych v5 — brak choćby
   jednego modułu znaczy biały ekran po utracie sieci, bo importy ES nie mają
   żadnego zapasowego źródła. */
var APP_SHELL = [
  './index.html',
  './manifest.webmanifest',
  /* Polityka prywatności jest CZĘŚCIĄ aplikacji, nie odsyłaczem na zewnątrz:
     oba sklepy wymagają jej wewnątrz aplikacji, a skoro leży w zakresie
     (scope: './'), otwiera się bez paska adresu. Wozimy ją na urządzenie,
     bo bez sieci też musi się otworzyć. */
  './prywatnosc.html',

  './css/tokens.css',
  './css/base.css',
  './css/components.css',
  './css/screens.css',

  './js/format.js',
  './js/bus.js',
  './js/metrics.js',
  './js/store.js',
  './js/history.js',
  './js/camera.js',
  './js/support.js',
  './js/router.js',
  './js/app.js',

  /* Warstwa językowa. Silnik wchodzi do grafu importów przez js/format.js,
     więc bez niego nie ma czym narysować ani jednej liczby — i dlatego stoi
     na tej liście bezwarunkowo.

     ZAPISUJEMY TU TYLKO DWA SŁOWNIKI Z TRZYDZIESTU — i to jest decyzja, nie
     przeoczenie. Angielski, bo jest wartością zapasową każdego brakującego
     klucza i wczytuje się przy każdym uruchomieniu niezależnie od wybranego
     języka. Polski, bo jest źródłem treści i pierwszym językiem tej aplikacji.

     Powód pominięcia pozostałych dwudziestu ośmiu jest policzony: trzydzieści
     słowników waży 1,4 MB, podczas gdy CAŁA reszta powłoki — znaczniki, arkusze
     stylów, moduły, biblioteka pomiarowa i ikony — mieści się w 740 kB.
     Pobieranie kompletu przy instalacji potroiłoby wagę aplikacji, żeby dać
     coś, z czego jeden człowiek korzysta w jednej trzydziestej: nikt nie czyta
     interfejsu w trzydziestu językach naraz.

     Jak w takim razie działa offline. Silnik sięga po słownik dynamicznym
     import('./locales/<kod>.js'), a ten adres leży wewnątrz /v5/, więc wpada
     w inScope i idzie przez stale-while-revalidate: przy PIERWSZYM użyciu
     zostaje zapisany w pamięci i od tej pory jest dostępny bez sieci. Język
     wykryty z ustawień urządzenia wczytuje się już przy pierwszym otwarciu
     aplikacji, czyli wtedy, gdy sieć jeszcze jest.

     Cena tej decyzji, wypowiedziana wprost: pierwsze przełączenie na język,
     którego użytkownik nigdy wcześniej nie otworzył, wymaga sieci. Bez niej
     import się nie powiedzie, a silnik zostanie przy angielskim — po cichu,
     bez komunikatu. Uznajemy to za mniejsze zło niż 1,4 MB pobierania u kogoś,
     kto nigdy nie zmieni języka. Ta sama zasada obowiązuje w v2, v3 i v4.

     Kolejność wpisów jak w katalogu locales/. */
  './js/i18n/index.js',
  './js/i18n/locales/en.js',
  './js/i18n/locales/pl.js',
  /* keys.test.js z tego katalogu NIE należy do aplikacji — to narzędzie
     deweloperskie dla `node --test` i nie ma go po co wozić na urządzenie. */

  './js/ui/dom.js',
  './js/ui/overlays.js',
  './js/ui/gauge.js',
  './js/ui/chart.js',

  './js/screens/measure.js',
  './js/screens/history.js',
  './js/screens/tools.js',
  './js/screens/support.js',

  /* Biblioteka pomiarowa. Leży POZA katalogiem v5 (docs/lib), bo dzielą ją
     wersje aplikacji, ale wchodzi w całości do grafu importów v5: js/metrics.js
     importuje ../../lib/index.js, a ten re-eksportuje wszystkie pozostałe
     moduły; js/format.js importuje ../../lib/catalogue.js wprost. Lista jest
     kompletna i musi taka zostać — brak choćby jednego pliku to biały ekran po
     utracie sieci, bo graf modułów ES nie ma źródła zapasowego. */
  '../lib/index.js',
  '../lib/color.js',
  '../lib/blue-share.js',
  '../lib/brightness.js',
  '../lib/colour-temperature.js',
  '../lib/melanopic.js',
  '../lib/flicker.js',
  '../lib/uniformity.js',
  '../lib/comfort.js',
  '../lib/zones.js',
  '../lib/catalogue.js',
  '../lib/frame.js',

  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

/* Granica, w której ten worker odzywa się Z WŁASNEJ WOLI — i tylko tyle.

   Poprzedni komentarz twierdził w tym miejscu, że „żądania spoza zasięgu
   rejestracji nigdy nie docierają do tego pliku”. To NIEPRAWDA i to ona była
   źródłem nieporozumienia. Zasięg rejestracji ( './' ) decyduje o tym, które
   STRONY worker kontroluje — a nie o tym, które adresy widzi. Gdy strona jest
   już kontrolowana, przez zdarzenie fetch przechodzi KAŻDE jej żądanie:
   z katalogu nadrzędnego, z korzenia witryny, a nawet z cudzego pochodzenia.
   Dlatego moduły z ../lib/ dają się i przechwycić, i zapisać, i podać z pamięci
   po utracie sieci, choć leżą poza zasięgiem rejestracji.

   Te dwie ścieżki to więc nie „co widzimy”, tylko „za co bierzemy
   odpowiedzialność”. Wszystko poza nimi przepuszczamy nietknięte do sieci,
   żeby nie wejść w drogę workerom wersji 1–4. */
var BASE = new URL('./', self.location.href).pathname;          // …/v5/
var LIB = new URL('../lib/', self.location.href).pathname;      // …/lib/

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      /* Celowo NIE cache.addAll: odrzuca się w całości, więc jeden brakujący
         plik zostawiłby aplikację w połowie zapisaną i w połowie żywą — z trzech
         możliwych wyników najgorszy. Każdy wpis pobieramy osobno, a porażkę
         odnotowujemy zamiast przerywać instalację. */
      var jobs = APP_SHELL.map(function (url) {
        return fetch(url, { cache: 'reload' }).then(function (response) {
          if (!response || !response.ok) return null;
          return cache.put(url, response);
        }).catch(function () {
          if (self.console && console.warn) console.warn('sw.js: nie udało się zapisać w pamięci podręcznej: ' + url);
          return null;
        });
      });
      /* Ikonę z ekranu głównego otwiera adres katalogu, ale nie każdy serwer na
         niego odpowiada — lokalny serwer testowy zwraca dla './' błąd 404.
         Dlatego powłokę pobieramy raz, po nazwie pliku, i zapisujemy pod OBIEMA
         kluczami, zamiast prosić o nią dwa razy i raz dostać odmowę. */
      jobs.push(fetch('./index.html', { cache: 'reload' }).then(function (response) {
        if (!response || !response.ok) return null;
        return cache.put('./', response);
      }).catch(function () { return null; }));
      return Promise.all(jobs);
    })
    /* Bez self.skipWaiting(): podmiana workera przeładowuje stronę, a
       przeładowanie w trakcie pomiaru wyrzuciłoby sesję. app.js pyta o zgodę
       i dopiero wtedy przysyła SKIP_WAITING. */
  );
});

self.addEventListener('message', function (event) {
  var data = event.data;
  if (data && data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(names.map(function (name) {
        // Wyłącznie własne pamięci: 'ms4-*', 'blue-monitor-v*' i reszta należą
        // do innych workerów, a ich skasowanie zepsułoby tamte aplikacje.
        if (name !== CACHE && name.indexOf(CACHE_PREFIX) === 0) return caches.delete(name);
        return null;
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;

  var url;
  try { url = new URL(request.url); } catch (e) { return; }

  // Cudze pochodzenie: w tej aplikacji nie występuje. Zabezpieczenie przed
  // przyszłą pomyłką, nie przed dzisiejszym przypadkiem.
  if (url.origin !== self.location.origin) return;

  // Nie nasz katalog — cicho przepuszczamy do sieci. Tędy przechodzą żądania
  // wersji 1–4, gdyby kiedykolwiek trafiły w ten worker.
  if (!inScope(url.pathname)) return;

  if (isDocument(request, url)) {
    event.respondWith(documentFirstFromNetwork(event, request));
    return;
  }
  event.respondWith(staleWhileRevalidate(event, request));
});

function inScope(pathname) {
  return pathname.indexOf(BASE) === 0 || pathname.indexOf(LIB) === 0;
}

/* Nawigacja albo bezpośrednie trafienie w plik powłoki. Jedno i drugie musi
   odpowiedzieć znacznikami i jedno i drugie woli kopię świeżą.

   Czego tu NIE MA i być nie może: obsługi adresu katalogu bez końcowego
   ukośnika ('…/v5'). Kuszące jest dopisanie go, bo bez sieci nie ma serwera,
   który zwykle odpowiada na taki adres przekierowaniem — ale to nie działa
   i sprawdziliśmy to na żywo. Nawigację przeglądarka przypisuje do workera po
   ZASIĘGU REJESTRACJI ('…/v5/'), zanim jakikolwiek kod stąd się wykona; adres
   bez ukośnika w ten zasięg nie wpada, więc żądanie nie dociera tutaj nawet po
   rozluźnieniu inScope. Zasięg wynika z położenia tego pliku, a przenieść go
   wyżej nie wolno: worker v5 przechwytywałby wtedy pozostałe wersje. */
function isDocument(request, url) {
  if (request.mode === 'navigate') return true;
  if (/\/index\.html$/.test(url.pathname)) return true;
  return url.pathname === BASE;
}

function documentFirstFromNetwork(event, request) {
  return fetch(request).then(function (response) {
    if (response && response.ok && response.type === 'basic') {
      var copy = response.clone();
      event.waitUntil(caches.open(CACHE).then(function (cache) {
        // Pod obiema nazwami, z tego samego powodu co przy instalacji.
        return cache.put('./index.html', copy.clone()).then(function () { return cache.put('./', copy); });
      }).catch(function () { return null; }));
    }
    return response;
  }).catch(function () {
    // Brak sieci, czyli normalny tryb pracy tej aplikacji.
    // Tylko własna pamięć: wspólne adresy leżą w kilku pamięciach naraz (każda
    // wersja zapisuje je u siebie), a globalne caches.match iteruje pamięci
    // w kolejności powstania i oddaje pierwsze trafienie — czyli kopię cudzej,
    // starszej wersji.
    return caches.match(request, { cacheName: CACHE }).then(function (cached) {
      return cached || caches.match('./index.html', { cacheName: CACHE });
    }).then(function (cached) {
      if (cached) return cached;
      /* Jedyny napis dla człowieka, jaki powstaje w tym pliku — i dlatego jest
         PO ANGIELSKU, tak samo jak zapas silnika językowego. Worker nie ma
         dostępu do słowników (są modułami ES ładowanymi przez stronę, a ta
         właśnie się nie wczytała), a w chwili, gdy ta odpowiedź jest potrzebna,
         nie wiadomo nawet, jaki język wybrał użytkownik: wybór leży w
         localStorage, którego worker nie widzi. Angielski jest wtedy jedynym
         uczciwym wyborem. */
      return new Response(
        '<!doctype html><html lang="en"><meta charset="utf-8"><title>Light Monitor</title>' +
        '<p>Light Monitor is not stored on this device yet. Connect to the network and open it once.</p>',
        { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    });
  });
}

/* Z pamięci natychmiast, świeża kopia w tle. Gdy w pamięci nic nie ma,
   czekamy na sieć — to jedyny przypadek, w którym ten worker cokolwiek
   opóźnia. */
function staleWhileRevalidate(event, request) {
  // Zawężone do własnej pamięci z tego samego powodu co wyżej: globalne
  // caches.match przeszukuje pamięci wszystkich wersji, a pierwsze trafienie
  // pod wspólnym adresem bywa starszą kopią.
  return caches.match(request, { cacheName: CACHE }).then(function (cached) {
    var network = fetch(request).then(function (response) {
      if (response && response.ok && response.type === 'basic') {
        var copy = response.clone();
        return caches.open(CACHE).then(function (cache) {
          return cache.put(request, copy);
        }).then(function () { return response; }).catch(function () { return response; });
      }
      return response;
    }).catch(function () { return null; });

    if (cached) {
      event.waitUntil(network);
      return cached;
    }
    return network.then(function (response) {
      if (response) return response;
      // Offline i nigdy nie zapisane. Nie ma czego uczciwie zwrócić.
      return new Response('', { status: 504, statusText: 'Offline' });
    });
  });
}
