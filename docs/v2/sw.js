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
var CACHE = 'blue-monitor-v2-11';

/* Relative paths on purpose: the app must work from /v2/, from a project page
   under /<repo>/docs/v2/ and from a copied directory, without editing a line.
   The icons live one level up, next to version 1 — they are shared with it and
   this version does not duplicate binary files. */
var APP_SHELL = [
  './index.html',
  './manifest.webmanifest',
  './styles.css',
  /* Warstwa językowa. Silnik i DWA słowniki: wspólny i tej wersji. Angielski
     jest tu zawsze, bo to on jest wartością zapasową każdego brakującego
     klucza; polski dlatego, że jest na razie jedynym gotowym tłumaczeniem
     tej wersji. Pozostałe 28 języków dojdzie do tej listy razem ze swoimi
     plikami — dopóki ich nie ma, nie wpisujemy ich tutaj, żeby instalacja
     nie zgłaszała braków przy każdym uruchomieniu. Język wybrany, a jeszcze
     nie zapisany w pamięci, dociąga się przy pierwszym użyciu w sieci
     i wtedy trafia do pamięci przez zwykłą ścieżkę fetch niżej. */
  '../shared/i18n.js',
  '../shared/i18n/en.js',
  '../shared/i18n/pl.js',
  './i18n/en.js',
  './i18n/pl.js',
  '../shared/bus.js',
  '../shared/metrics.js',
  './ui-core.js',
  '../shared/engine.js',
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
      // Nie cache.add(url): ono pobiera plik przez pamięć HTTP przeglądarki,
      // więc zaraz po podbiciu numeru pamięci potrafi zapisać starą kopię —
      // na GitHub Pages wygląda to jak „nowa wersja, stare pliki”. Własny fetch
      // z { cache: 'reload' } omija pamięć HTTP, a do pamięci podręcznej trafia
      // dopiero to, co naprawdę przyszło z serwera.
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
         Dlatego powłoka musi leżeć w pamięci pod OBIEMA kluczami, a pobieramy ją
         po nazwie pliku: klucz './index.html' zapisała już pętla po APP_SHELL
         wyżej, więc tutaj dokładamy wyłącznie klucz './'.
         { cache: 'reload' } jest tu równie konieczne co tam: bez niego odpowiedź
         może przyjść z pamięci HTTP przeglądarki i pod adresem powłoki wyląduje
         STARA strona — ta, która ładuje './metrics.js' i './engine.js', czyli
         pliki przeniesione już do ../shared/. Nawigacje ta wersja serwuje
         z pamięci, więc użytkownik zobaczyłby „Aplikacja wczytała się
         niekompletnie”. */
      jobs.push(fetch('./index.html', { cache: 'reload' }).then(function (response) {
        if (!response || !response.ok) return null;
        return cache.put('./', response);
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
    // Tylko własna pamięć: wspólne adresy leżą w kilku pamięciach naraz (każda
    // wersja zapisuje je u siebie), a globalne caches.match iteruje pamięci
    // w kolejności powstania i oddaje pierwsze trafienie — czyli kopię cudzej,
    // starszej wersji.
    caches.match(request, { cacheName: CACHE }).then(function (cached) {
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
        // Też zawężone: powłoka innej wersji, leżąca w jej własnej pamięci,
        // wyglądałaby stąd jak nasza.
        if (request.mode === 'navigate') return caches.match('./index.html', { cacheName: CACHE });
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
