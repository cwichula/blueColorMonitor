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
 * NAJWAŻNIEJSZE: ten worker obsługuje WYŁĄCZNIE katalog /v5/ (ikony aplikacji
 * leżą w /v5/icons/, właśnie po to, żeby mieściły się w zasięgu rejestracji).
 * Wersje 1–4 są publikowane z własnych katalogów, mają własne workery i własne
 * nazwy pamięci. Dlatego:
 *   - żądania spoza tego katalogu przepuszczamy nietknięte,
 *   - przy sprzątaniu kasujemy wyłącznie własne pamięci, po wzorcu /^ms5-/.
 * Złamanie któregokolwiek z tych punktów psuje cztery działające wersje naraz.
 *
 * Numer w nazwie pamięci podbijamy przy KAŻDEJ zmianie któregokolwiek pliku
 * z listy poniżej.
 */

var CACHE = 'ms5-5';
var CACHE_PREFIX = 'ms5-';

/* Ścieżki względne celowo: aplikacja ma działać spod /v5/, spod
   /<repozytorium>/docs/v5/ i ze skopiowanego katalogu, bez zmiany ani jednej
   linii. Lista jest pełnym drzewem plików wykonywalnych v5 — brak choćby
   jednego modułu znaczy biały ekran po utracie sieci, bo importy ES nie mają
   żadnego zapasowego źródła. */
var APP_SHELL = [
  './index.html',
  './manifest.webmanifest',

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

  './js/ui/dom.js',
  './js/ui/overlays.js',
  './js/ui/gauge.js',
  './js/ui/chart.js',

  './js/screens/measure.js',
  './js/screens/history.js',
  './js/screens/tools.js',
  './js/screens/support.js',

  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

/* Granica, w której ten worker w ogóle się odzywa. Ikony leżą WEWNĄTRZ /v5/,
   a nie w katalogu nadrzędnym: rejestracja ma zasięg './', więc żądania spoza
   niego nigdy nie docierają do tego pliku — ikona z katalogu nadrzędnego nie
   dałaby się ani przechwycić, ani podać z pamięci po utracie sieci. */
var BASE = new URL('./', self.location.href).pathname;          // …/v5/

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
  return pathname.indexOf(BASE) === 0;
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
   czekamy na sieć — to jedyny przypadek, w którym ten worker cokolwiek
   opóźnia. */
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
