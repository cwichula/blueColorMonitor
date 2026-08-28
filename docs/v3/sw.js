/* Monitor Światła v3 — service worker.
 *
 * The application has nothing to fetch from a network in the first place:
 * every screen, every icon and every number is produced on the device. Offline
 * is therefore not a fallback mode here, it is the normal one, and this worker
 * exists so that a closed tab and a lost connection behave identically.
 *
 * Two strategies, on purpose:
 *   - assets (CSS, JS, icons, manifest): cache-first, refreshed in the
 *     background. They are versioned by CACHE, so a stale stylesheet cannot
 *     outlive the markup it styles.
 *   - the document (index.html and every navigation): network-first with a
 *     cache fallback. The shell is the one file whose staleness is visible
 *     immediately, and a user on a working connection should never have to
 *     reload twice to get a fix.
 *
 * The only requests this file makes are for its own files, listed below. There
 * is no external host anywhere in this application, and adding one here would
 * silently break rule 16 of chapter 10 for the whole app at once.
 *
 * Bump CACHE when ANY file below changes. The old cache is deleted on activate.
 */
var CACHE = 'blue-monitor-v3-7';

/* Relative paths on purpose: the app must work from /v3/, from a project page
   under /<repo>/docs/v3/ and from a copied directory, without editing a line.
   The icons live one level up and are shared with the earlier versions — this
   version does not duplicate binary files. */
var APP_SHELL = [
  './index.html',
  './manifest.webmanifest',
  './tokens.css',
  './base.css',
  './components.css',
  '../shared/bus.js',
  '../shared/metrics.js',
  '../shared/scale-core.js',
  './scale.js',
  './shell.js',
  '../shared/engine.js',
  './dash.js',
  './recorder.js',
  './modules.js',
  './support.js',
  './docs.js',
  './boot.js',
  '../icons/icon-192.png',
  '../icons/icon-512.png',
  '../icons/icon-maskable-512.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      // Deliberately NOT cache.addAll: it rejects as a whole, so one missing
      // icon would leave the app half-cached and half-live, which is the worst
      // of the three outcomes. Each entry is fetched and put on its own, and a
      // failure is logged instead of aborting the install.
      var jobs = APP_SHELL.map(function (url) {
        return fetch(url, { cache: 'reload' }).then(function (response) {
          if (!response || !response.ok) return null;
          return cache.put(url, response);
        }).catch(function () {
          if (self.console && console.warn) console.warn('sw.js: nie udało się zapisać w pamięci podręcznej: ' + url);
          return null;
        });
      });
      // The directory URL is what a home-screen icon opens, but not every
      // server answers it — the local test server returns 404 for './'. So the
      // shell is fetched once by its file name and stored under BOTH keys,
      // instead of being requested twice and failing once.
      jobs.push(fetch('./index.html', { cache: 'reload' }).then(function (response) {
        if (!response || !response.ok) return null;
        return cache.put('./', response);
      }).catch(function () { return null; }));
      return Promise.all(jobs);
    })
    // No self.skipWaiting() here. Replacing the worker replaces the page, and
    // reloading in the middle of a measurement would throw the session away.
    // boot.js shows „Jest nowa wersja aplikacji.” with an „Odśwież” key and
    // sends SKIP_WAITING only when the user presses it.
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
        // Only this version's caches. Versions 1 and 2 are published from other
        // directories with their own cache names and must not be touched.
        if (name !== CACHE && name.indexOf('blue-monitor-v3-') === 0) return caches.delete(name);
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
  // Anything not served from this origin is none of this worker's business —
  // and there is nothing of the sort in the app, so this is a guard against a
  // future mistake rather than a case that happens today.
  if (url.origin !== self.location.origin) return;

  if (isDocument(request, url)) {
    event.respondWith(documentFirstFromNetwork(event, request));
    return;
  }
  event.respondWith(assetFirstFromCache(event, request));
});

/* A navigation, or a direct hit on the shell file. Both must answer with the
   markup, and both must prefer a fresh copy. */
function isDocument(request, url) {
  if (request.mode === 'navigate') return true;
  return /\/index\.html$/.test(url.pathname) || /\/v3\/?$/.test(url.pathname);
}

function documentFirstFromNetwork(event, request) {
  return fetch(request).then(function (response) {
    if (response && response.ok && response.type === 'basic') {
      var copy = response.clone();
      event.waitUntil(caches.open(CACHE).then(function (cache) {
        // Stored under both keys for the same reason as during install.
        return cache.put('./index.html', copy.clone()).then(function () { return cache.put('./', copy); });
      }).catch(function () { return null; }));
    }
    return response;
  }).catch(function () {
    // Offline, which is the normal mode for this application.
    // Tylko własna pamięć: wspólne adresy leżą w kilku pamięciach naraz (każda
    // wersja zapisuje je u siebie), a globalne caches.match iteruje pamięci
    // w kolejności powstania i oddaje pierwsze trafienie — czyli kopię cudzej,
    // starszej wersji.
    return caches.match(request, { cacheName: CACHE }).then(function (cached) {
      return cached || caches.match('./index.html', { cacheName: CACHE });
    }).then(function (cached) {
      if (cached) return cached;
      return new Response('<!doctype html><html lang="pl"><meta charset="utf-8"><title>Monitor Światła</title>' +
        '<p>Monitor Światła nie jest jeszcze zapisany w pamięci urządzenia. Połącz się z siecią i otwórz go raz.</p>',
        { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    });
  });
}

function assetFirstFromCache(event, request) {
  // Zawężone do własnej pamięci z tego samego powodu co wyżej: globalne
  // caches.match przeszukuje pamięci wszystkich wersji, a pierwsze trafienie
  // pod wspólnym adresem bywa starszą kopią.
  return caches.match(request, { cacheName: CACHE }).then(function (cached) {
    if (cached) {
      // Refresh in the background so the next launch is current, while this
      // one stays instant.
      event.waitUntil(refresh(request));
      return cached;
    }
    return fetch(request).then(function (response) {
      if (response && response.ok && response.type === 'basic') {
        var copy = response.clone();
        event.waitUntil(caches.open(CACHE).then(function (cache) { return cache.put(request, copy); }));
      }
      return response;
    }).catch(function () {
      // Offline and never cached. There is nothing honest to return.
      return new Response('', { status: 504, statusText: 'Offline' });
    });
  });
}

function refresh(request) {
  return fetch(request).then(function (response) {
    if (!response || !response.ok || response.type !== 'basic') return null;
    return caches.open(CACHE).then(function (cache) { return cache.put(request, response); });
  }).catch(function () { return null; });
}
