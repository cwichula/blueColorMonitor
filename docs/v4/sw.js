/* Monitor Światła v4 — sw.js
 *
 * ROLA PLIKU: sprawić, żeby zamknięta karta i brak sieci znaczyły to samo.
 * Aplikacja i tak niczego z sieci nie potrzebuje — każdy ekran, każda ikona
 * i każda liczba powstają na urządzeniu — więc tryb offline jest tu normalny,
 * a nie awaryjny.
 *
 * Dwie strategie, świadomie różne:
 *   - nawigacja (dokument): najpierw sieć, w razie jej braku pamięć podręczna.
 *     Powłoka jest jedynym plikiem, którego nieświeżość widać natychmiast,
 *     a ktoś z działającą siecią nie powinien odświeżać dwa razy, żeby dostać poprawkę.
 *   - reszta (CSS, JS, ikony, manifest): stale-while-revalidate — z pamięci
 *     natychmiast, a w tle świeża kopia na następne uruchomienie.
 *
 * NAJWAŻNIEJSZE: ten worker obsługuje WYŁĄCZNIE katalog /v4/ oraz wspólny
 * katalog /icons/. Wersje 1, 2 i 3 są publikowane z własnych katalogów, mają
 * własne workery i własne nazwy pamięci podręcznej. Dlatego:
 *   - fetch spoza tych dwóch katalogów przepuszczamy bez dotykania,
 *   - przy sprzątaniu kasujemy wyłącznie własne pamięci, po wzorcu /^ms4-/.
 * Naruszenie któregokolwiek z tych dwóch punktów psuje trzy działające wersje naraz.
 *
 * Numer w nazwie pamięci podbijamy przy KAŻDEJ zmianie któregokolwiek pliku z listy.
 */

var CACHE = 'ms4-7';
var CACHE_PREFIX = 'ms4-';

/* Ścieżki względne celowo: aplikacja ma działać spod /v4/, spod
   /<repozytorium>/docs/v4/ i ze skopiowanego katalogu, bez zmiany ani jednej linii. */
var APP_SHELL = [
  './index.html',
  './manifest.webmanifest',
  './tokens.css',
  './base.css',
  './components.css',
  './screens.css',
  './metrics.js',
  './bus.js',
  './engine.js',
  './scale.js',
  './store.js',
  './ui.js',
  './gauge.js',
  './screen-measure.js',
  './screen-history.js',
  './screen-tools.js',
  './screen-support.js',
  './app.js',
  '../icons/icon-192.png',
  '../icons/icon-512.png',
  '../icons/icon-maskable-512.png'
];

/* Granice, w których ten worker w ogóle się odzywa. */
var BASE = new URL('./', self.location.href).pathname;        // …/v4/
var ICONS = new URL('../icons/', self.location.href).pathname; // …/icons/

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
    /* Bez self.skipWaiting(): podmiana workera podmienia stronę, a przeładowanie
       w trakcie pomiaru wyrzuciłoby sesję. app.js pyta o zgodę i dopiero wtedy
       przysyła SKIP_WAITING. */
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
        // Tylko własne pamięci. 'blue-monitor-v3-*' i pamięci wersji 1 i 2
        // należą do innych workerów i skasowanie ich zepsułoby tamte aplikacje.
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

  // Nie nasz katalog — cicho przepuszczamy do sieci. Tu przechodzą żądania
  // wersji 1, 2 i 3, gdyby kiedykolwiek trafiły w ten worker.
  if (!inScope(url.pathname)) return;

  if (isDocument(request, url)) {
    event.respondWith(documentFirstFromNetwork(event, request));
    return;
  }
  event.respondWith(staleWhileRevalidate(event, request));
});

function inScope(pathname) {
  return pathname.indexOf(BASE) === 0 || pathname.indexOf(ICONS) === 0;
}

/* Nawigacja albo bezpośrednie trafienie w plik powłoki. Jedno i drugie musi
   odpowiedzieć znacznikami i jedno i drugie woli kopię świeżą. */
function isDocument(request, url) {
  if (request.mode === 'navigate') return true;
  if (/\/index\.html$/.test(url.pathname)) return true;
  return url.pathname === BASE || url.pathname + '/' === BASE;
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
    return caches.match(request).then(function (cached) {
      return cached || caches.match('./index.html');
    }).then(function (cached) {
      if (cached) return cached;
      return new Response(
        '<!doctype html><html lang="pl"><meta charset="utf-8"><title>Monitor Światła</title>' +
        '<p>Monitor Światła nie jest jeszcze zapisany w pamięci urządzenia. Połącz się z siecią i otwórz go raz.</p>',
        { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    });
  });
}

/* Z pamięci natychmiast, świeża kopia w tle. Gdy w pamięci nic nie ma,
   czekamy na sieć — to jedyny przypadek, w którym ten worker cokolwiek opóźnia. */
function staleWhileRevalidate(event, request) {
  return caches.match(request).then(function (cached) {
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
