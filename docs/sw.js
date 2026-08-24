/* Samolikwidujący się service worker ("kill switch") w korzeniu witryny.
 *
 * Do czasu przeniesienia aplikacji do docs/v1/ jej service worker był serwowany
 * spod /sw.js i rejestrowany z zasięgiem całego korzenia. U każdego, kto
 * odwiedził stronę wcześniej, ta rejestracja nadal istnieje i nadal serwuje
 * starą stronę główną z cache. Samo usunięcie /sw.js nic by nie dało:
 * przeglądarka potraktowałaby brak pliku jako nieudaną próbę aktualizacji i
 * ZOSTAWIŁA starą rejestrację w mocy — stara aplikacja zostałaby w cache na
 * zawsze. Dlatego pod tym samym adresem stoi ten plik: różni się bajtowo od
 * poprzednika, więc instaluje się na jego miejsce, po czym sprząta po nim
 * i sam się wyrejestrowuje.
 *
 * Nie serwuje niczego — nie ma tu handlera fetch, wszystkie żądania idą prosto
 * do sieci. Plik można usunąć, gdy uznamy, że wszyscy użytkownicy zdążyli go
 * już pobrać.
 */

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        // Wzorzec trafia WYŁĄCZNIE w nazwy pozostałe po workerze z korzenia
        // ('blue-monitor-v27'). Wszystkie cztery żywe wersje mają w nazwie
        // przedrostek z myślnikiem — 'blue-monitor-v1-N', 'blue-monitor-v2-N',
        // 'blue-monitor-v3-N', 'ms4-N' — a końcowe \d+ nie przechodzi przez
        // myślnik, więc żadnej z nich ten wzorzec nie obejmuje.
        names.filter((name) => /^blue-monitor-v\d+$/.test(name))
             .map((name) => caches.delete(name))
      ))
      // Wyrejestrowanie musi nastąpić nawet wtedy, gdy czyszczenie cache zawiedzie.
      .catch(() => {})
      .then(() => self.registration.unregister())
      .catch(() => {})
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => {
        // Przeładowanie otwartych okien, żeby użytkownik od razu zobaczył
        // stronę z sieci, a nie ostatnią wersję z cache.
        clients.forEach((client) => client.navigate(client.url));
      })
      .catch(() => {})
  );
});
