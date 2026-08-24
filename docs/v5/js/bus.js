/* Monitor Światła v5 — szyna zdarzeń.
 *
 * Jedyny sposób, w jaki moduły rozmawiają ze sobą „w poprzek” drzewa importów:
 * kamera nie wie nic o ekranach, ustawienia nie wiedzą nic o wykresie. Bez
 * zależności, bez DOM, bez CustomEvent — działa też w Node.
 *
 * Lista dozwolonych nazw zdarzeń jest w CONTRACT.md, sekcja 4. Szyna ich nie
 * waliduje: literówka w nazwie ma się objawić brakiem reakcji, a nie wyjątkiem
 * w środku pętli pomiarowej idącej 10 razy na sekundę.
 */

const listeners = new Map(); // nazwa -> Set(fn)

function setFor(name) {
  let set = listeners.get(name);
  if (!set) {
    set = new Set();
    listeners.set(name, set);
  }
  return set;
}

export const bus = {
  /* Zwraca funkcję odsubskrybowania — ekrany trzymają ją w `unmount()`
   * i nie muszą pamiętać ani nazwy zdarzenia, ani referencji do funkcji. */
  on(name, fn) {
    if (typeof fn !== 'function') return () => {};
    setFor(name).add(fn);
    let active = true;
    return () => {
      // Idempotentne: podwójne wywołanie nie usunie cudzej subskrypcji, gdyby
      // ten sam `fn` zapisał się drugi raz w międzyczasie.
      if (!active) return;
      active = false;
      const set = listeners.get(name);
      if (!set) return;
      set.delete(fn);
      if (set.size === 0) listeners.delete(name);
    };
  },

  once(name, fn) {
    if (typeof fn !== 'function') return () => {};
    const off = bus.on(name, (payload) => {
      // Wypisujemy się PRZED wywołaniem, żeby wyjątek w `fn` nie zostawił
      // subskrypcji „na raz”, która odpali się po raz drugi.
      off();
      fn(payload);
    });
    return off;
  },

  off(name, fn) {
    const set = listeners.get(name);
    if (!set) return;
    set.delete(fn);
    if (set.size === 0) listeners.delete(name);
  },

  /* Iterujemy po kopii: słuchacz może w trakcie obsługi dopisać się lub
   * wypisać (typowo `once`, albo ekran, który sam siebie odmontowuje), a to
   * nie może popsuć bieżącej pętli. Wyjątek jednego słuchacza nie zabiera
   * zdarzenia pozostałym — logujemy go i lecimy dalej. */
  emit(name, payload) {
    const set = listeners.get(name);
    if (!set || set.size === 0) return;
    const snapshot = Array.from(set);
    for (let i = 0; i < snapshot.length; i += 1) {
      const fn = snapshot[i];
      // Pomijamy tych, którzy wypisali się już w trakcie tej samej emisji.
      if (!set.has(fn)) continue;
      try {
        fn(payload);
      } catch (err) {
        console.error('[bus] słuchacz "' + name + '" rzucił wyjątkiem:', err);
      }
    }
  }
};
