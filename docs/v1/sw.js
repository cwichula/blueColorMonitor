// Cache name follows the same convention as the other versions - 'v1-' with a
// dash, so the version is part of the namespace and not just of the counter.
// This matters: the root of the site cleans up after the old root-scoped worker
// by deleting every cache called 'blue-monitor-v<digits>', which is what v1's
// cache used to be called back when it lived there. Anything named that way is
// now, by definition, a leftover of that old root - never a live cache.
const CACHE_NAME = 'blue-monitor-v1-30';

// Every version of the app now lives in its own directory (/v1/, /v2/, /v3/,
// /v4/) and ships its own service worker, registered from that directory and
// therefore scoped to it. This one only ever sees requests for /v1/, so it can
// no longer answer - or break - anything belonging to the other versions.
// Cache Storage is the one thing still shared across the whole origin, which is
// why the cleanup in 'activate' has to be filtered by cache name.
// Both patterns match v1 caches ONLY: the current 'blue-monitor-v1-N' naming
// and the bare 'blue-monitor-v24' naming v1 used before the move. v2 uses
// 'blue-monitor-v2-N', v3 'blue-monitor-v3-N' and v4 'ms4-N', and neither
// pattern can reach any of those.
const V1_CACHE_PATTERN = /^blue-monitor-v1-\d+$/;
const V1_LEGACY_CACHE_PATTERN = /^blue-monitor-v\d+$/;
const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './ui.css',
  './features.js',
  './menu.js',
  './support.js',
  './app.js',
  './manifest.webmanifest',
  '../icons/icon-192.png',
  '../icons/icon-512.png',
  '../icons/icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      // Delete only OUR OWN superseded caches - the current naming and the
      // pre-move one, both of which belong to v1 alone. Cache Storage is shared
      // by the whole origin - the directory scope does not fence it off - so
      // without this filter v1 would delete the other versions' caches. It used
      // to do exactly that, which wiped v2's cache on each activation and left
      // v2 re-downloading its whole shell after every visit to v1.
      .then((keys) => Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME &&
            (V1_CACHE_PATTERN.test(k) || V1_LEGACY_CACHE_PATTERN.test(k)))
          .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => cached);
    })
  );
});
