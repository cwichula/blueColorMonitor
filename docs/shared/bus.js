/* docs/shared/bus.js — kod wspólny wersji v2–v4.
 *
 * SKĄD: przeniesione BEZ ZMIAN z docs/v3/bus.js; docs/v4/bus.js był bajtowo
 * identyczny, więc v3 i v4 dostają dokładnie to, co miały do tej pory. v2
 * własnego bus.js nigdy nie miała.
 *
 * KTO ŁADUJE: v2, v3 i v4 — plik jest wpięty w index.html i wymieniony
 * w APP_SHELL każdej z tych trzech wersji; w v2 jest wręcz pierwszym skryptem
 * strony. Własna, zapasowa magistrala w v2/ui-core.js została na miejscu, ale
 * zakłada się tylko wtedy, gdy `window.Bus` nie istnieje — od teraz jest więc
 * wyłącznie siatką bezpieczeństwa na wypadek, gdyby ten plik się nie wczytał.
 *
 * CO WYSTAWIA: globalne `window.Bus` z metodami `on`, `once` i `emit` — to
 * cały kontrakt, jakiego engine.js wymaga od otoczenia. Świadomie nie ma tu
 * `Bus.off` ani `Bus.names`: sprawdzone, że w v2–v4 nie ma ani jednego
 * konsumenta tych metod.
 *
 * CZEGO TU NIE WOLNO: sięgać do DOM, do storage i do układu ekranu
 * konkretnej wersji, ani dopisywać napisów widocznych dla użytkownika.
 * Zmiana w tym pliku dotyka wszystkich wersji, które go ładują, naraz.
 */
/* Monitor Światła v3 — magistrala zdarzeń.
 *
 * The smallest file in the app and deliberately loaded early: first of all in
 * v2 and v3, right after metrics.js in v4 — always before engine.js, the only
 * file that needs it. engine.js was written for version 2 and is reused here
 * byte for byte; the only thing it asks of the surrounding application is a
 * global `Bus` with `on`, `once` and `emit`. This file is that contract and
 * nothing more — no DOM, no storage, no knowledge of any screen.
 *
 * Events flowing through it (all emitted by engine.js, all consumed by ui.js):
 *   engine:state        { state }            idle | starting | running | error
 *   engine:started      { startedAt, facingMode }
 *   engine:stopped      { session }
 *   engine:sample       { reading }          5 Hz — the hot path
 *   engine:error        { code, messagePL }
 *   engine:thresholds   { thresholds, source }
 *   engine:calibration  { calibration }
 *   engine:history      { reason }
 *   app:ready           {}                   emitted once by ui.js
 *
 * A listener that throws must not stop the other listeners: at 5 Hz a single
 * bad handler would otherwise silence the whole interface within a second, and
 * the user would see a frozen screen with no error anywhere.
 */
(function (global) {
  'use strict';

  var handlers = Object.create(null);
  var fired = Object.create(null);   // sticky events, see `once` below

  function list(name) {
    if (!handlers[name]) handlers[name] = [];
    return handlers[name];
  }

  var Bus = {
    on: function (name, fn) {
      if (typeof fn !== 'function') return function () {};
      list(name).push(fn);
      // The unsubscribe function is the only way to detach: removing by
      // identity would misbehave with the same function registered twice.
      var detached = false;
      return function off() {
        if (detached) return;
        detached = true;
        var arr = handlers[name];
        if (!arr) return;
        var i = arr.indexOf(fn);
        if (i !== -1) arr.splice(i, 1);
      };
    },

    /* Sticky for `app:ready` and for the one-shot engine events: a module that
       registers after the event has already fired still runs. Without this the
       whole application depends on script order in a way that breaks silently
       the moment a file is moved in index.html. */
    once: function (name, fn) {
      if (typeof fn !== 'function') return function () {};
      if (fired[name]) {
        var payload = fired[name];
        global.setTimeout(function () { call(fn, payload, name); }, 0);
        return function () {};
      }
      var off = Bus.on(name, function wrapped(data) {
        off();
        fn(data);
      });
      return off;
    },

    emit: function (name, data) {
      if (STICKY[name]) fired[name] = data || {};
      var arr = handlers[name];
      if (!arr || !arr.length) return;
      // Copy first: a handler is allowed to unsubscribe itself, or another,
      // while the loop is running.
      var snapshot = arr.slice();
      for (var i = 0; i < snapshot.length; i += 1) call(snapshot[i], data, name);
    }
  };

  // Only events that describe a state reached once are remembered. Remembering
  // `engine:sample` would hand a stale reading to every late subscriber.
  var STICKY = { 'app:ready': true };

  function call(fn, data, name) {
    try {
      fn(data);
    } catch (err) {
      if (global.console && console.error) {
        console.error('Bus: handler for "' + name + '" threw', err);
      }
    }
  }

  global.Bus = Bus;

}(typeof window !== 'undefined' ? window : globalThis));
