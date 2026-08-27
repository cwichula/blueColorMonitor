/* Monitor Światła v2 — service worker.
 *
 * Cache-first for the whole shell, because the app has nothing to fetch from a
 * network in the first place: every screen, every icon and every number is
 * produced on the device. Offline is therefore not a fallback mode here, it is
 * the normal one, and the worker exists so a closed tab and a lost connection
 * behave identically.
 *
 * The only requests this file makes are for its own files, listed below. There
 * is no external host anywhere in this application, and adding one here would
 * silently break rule 2 of the project for the whole app at once.
 *
 * Bump CACHE when any file in APP_SHELL changes; the old cache is deleted on
 * activate, so a stale stylesheet cannot outlive the markup it styles.
 */
var CACHE = 'blue-monitor-v2-4';

/* Relative paths on purpose: the app must work from /v2/, from a project page
   under /<repo>/docs/v2/ and from a copied directory, without editing a line.
   The icons live one level up, next to version 1 — they are shared with it and
   this version does not duplicate binary files. */
var APP_SHELL = [
  './index.html',
  './manifest.webmanifest',
  './styles.css',
  './metrics.js',
  './ui-core.js',
  './engine.js',
  './support.js',
  './tools.js',
  './boot.js',
  '../icons/icon-192.png',
  '../icons/icon-512.png',
  '../icons/icon-maskable-512.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      // Deliberately NOT cache.addAll: that rejects as a whole, so one missing
      // icon would leave the app half-cached and half-live, which is the worst
      // of the three outcomes. Each entry is added on its own and a failure is
      // logged instead of aborting the install.
      var jobs = APP_SHELL.map(function (url) {
        return cache.add(url).catch(function () {
          if (self.console && console.warn) console.warn('sw.js: nie udało się zapisać w pamięci podręcznej: ' + url);
        });
      });
      // The directory URL is what a home-screen icon opens, but not every
      // server answers it — the local test server returns 404 for './'. So the
      // shell is fetched once by its file name and stored under BOTH keys,
      // instead of being requested twice and failing once.
      jobs.push(fetch('./index.html').then(function (response) {
        if (!response || !response.ok) return null;
        return cache.put('./', response.clone()).then(function () {
          return cache.put('./index.html', response);
        });
      }).catch(function () { return null; }));
      return Promise.all(jobs);
    }).then(function () {
      // The user asked for a new version by reloading; make it the one they get.
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(names.map(function (name) {
        // Only this app's caches. Version 1 is published from the parent
        // directory with its own cache name and must not be touched.
        if (name !== CACHE && name.indexOf('blue-monitor-v2-') === 0) return caches.delete(name);
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

  event.respondWith(
    caches.match(request).then(function (cached) {
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
        // Offline and never cached. For a navigation that means the shell,
        // which is always in the cache; for anything else there is nothing
        // honest to return.
        if (request.mode === 'navigate') return caches.match('./index.html');
        return new Response('', { status: 504, statusText: 'Offline' });
      });
    })
  );
});

function refresh(request) {
  return fetch(request).then(function (response) {
    if (!response || !response.ok || response.type !== 'basic') return null;
    return caches.open(CACHE).then(function (cache) { return cache.put(request, response); });
  }).catch(function () { return null; });
}
