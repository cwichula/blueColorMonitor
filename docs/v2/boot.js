/* Monitor Światła v2 — boot.
 *
 * The last script in index.html, and deliberately the smallest one. Its whole
 * job is to answer three questions and then get out of the way:
 *
 *   1. Did every module actually load? Four files were written in parallel by
 *      four people. If one of them is missing the app must say so in Polish, on
 *      screen, instead of failing with a blank tab and a console nobody opens.
 *   2. Is the offline worker registered? Once, from here — no other file talks
 *      to navigator.serviceWorker.
 *   3. Is this the first run? If so, one sentence pointing at the Start button,
 *      shown once and never again.
 *
 * What boot.js deliberately does NOT do:
 *
 *   - It does not adapt one module's API to another's. Every mismatch found
 *     during integration was fixed in the module that had it; a shim here would
 *     have hidden the bug and doubled the number of places to read.
 *   - It does not build, show or hide any screen. That belongs to window.UI.
 *   - It does not start a measurement, and nothing in this file can delay one.
 *   - It defines no global of its own.
 *
 * Loading order is the contract (see the comment in index.html): every module
 * has already registered its bus listeners by the time this file parses, and
 * ui-core.js emits `app:ready` one macrotask after DOMContentLoaded — which is
 * after this file, whichever way the browser schedules it.
 */
(function (global) {
  'use strict';

  var doc = global.document;

  /* ------------------------------------------------------------------
     1. Module census
     ------------------------------------------------------------------ */

  // name -> [globalName, whatPL (what stops working without it)]
  var REQUIRED = [
    ['Metrics', 'metrics.js', 'żadna wartość nie zostanie policzona'],
    ['Bus', 'bus (w ui-core.js)', 'moduły przestaną się widzieć'],
    ['UI', 'ui-core.js', 'nie da się przełączać ekranów'],
    ['Engine', 'engine.js', 'kamera i pomiar nie ruszą'],
    ['Store', 'account.js', 'ekran Premium będzie pusty'],
    ['Account', 'account.js', 'ekran Konto będzie pusty'],
    ['Ads', 'account.js', 'sloty reklamowe zostaną puste'],
    ['Tools', 'tools.js', 'zakładka Narzędzia będzie pusta']
  ];

  function census() {
    var missing = [];
    for (var i = 0; i < REQUIRED.length; i += 1) {
      if (!global[REQUIRED[i][0]]) missing.push(REQUIRED[i]);
    }
    return missing;
  }

  /* A missing module is a broken build, not a user error — but the user is the
     one looking at the screen, so the message is in Polish, names the file, and
     says what still works. Measurement usually still does. */
  function reportMissing(missing) {
    var lines = [];
    for (var i = 0; i < missing.length; i += 1) {
      lines.push(missing[i][1] + ' — ' + missing[i][2]);
    }
    var textPL = 'Nie wczytały się moduły: ' + lines.join('; ') + '.';

    if (global.console && console.error) {
      console.error('boot.js: ' + textPL + ' Sprawdź kolejność i ścieżki <script> w index.html.');
    }

    var panel = doc.getElementById('panelMeasure');
    var U = global.UI;
    var box = doc.createElement('div');
    box.className = 'ms-note ms-note--critical';
    box.id = 'bootError';
    box.setAttribute('role', 'alert');
    var body = doc.createElement('div');
    body.className = 'ms-note__text';
    var title = doc.createElement('span');
    title.className = 'ms-note__title';
    title.textContent = 'Aplikacja wczytała się niekompletnie';
    body.appendChild(title);
    var line = doc.createElement('span');
    line.textContent = textPL + ' Odśwież stronę; jeżeli to nie pomoże, pliki są niekompletne na serwerze.';
    body.appendChild(line);
    box.appendChild(body);

    if (U && typeof U.mount === 'function' && panel) U.mount('panelMeasure', box);
    else if (panel) panel.appendChild(box);
    else if (doc.body) doc.body.appendChild(box);
  }

  /* ------------------------------------------------------------------
     2. Service worker
     ------------------------------------------------------------------ */

  /* The only place in the application that touches navigator.serviceWorker.
     Registered with a relative path so the app works from any sub-directory,
     and skipped entirely on file://, where registration always fails and the
     resulting console error looks like a bug in the app. */
  function registerWorker() {
    if (!('serviceWorker' in global.navigator)) return;
    var proto = global.location && global.location.protocol;
    if (proto !== 'https:' && proto !== 'http:') return;

    global.navigator.serviceWorker.register('sw.js', { scope: './' }).then(function (reg) {
      // A new version that is already waiting means the user is looking at the
      // old one. Offer the reload; never force it — a reload during a
      // measurement would throw away the session.
      if (reg.waiting) offerUpdate();
      reg.addEventListener('updatefound', function () {
        var installing = reg.installing;
        if (!installing) return;
        installing.addEventListener('statechange', function () {
          if (installing.state === 'installed' && global.navigator.serviceWorker.controller) offerUpdate();
        });
      });
    }).catch(function () {
      // Offline mode simply will not be available. Nothing else changes, so
      // this is not worth a message on screen.
    });
  }

  function offerUpdate() {
    var U = global.UI;
    if (!U || typeof U.toast !== 'function') return;
    var E = global.Engine;
    if (E && typeof E.isRunning === 'function' && E.isRunning()) return;   // never mid-measurement
    U.toast('Jest nowa wersja aplikacji.', {
      durationMs: 12000,
      actionPL: 'Odśwież',
      onAction: function () { global.location.reload(); }
    });
  }

  /* ------------------------------------------------------------------
     3. First run
     ------------------------------------------------------------------ */

  /* The first-run instruction is content, not an event. As a nine-second toast
     it sat over the bottom metric tile on Pomiar and over the table and the ad
     slot on Historia, and once it faded there was no way back to it — a toast
     is Material's pattern for something that just HAPPENED, and this is a thing
     the user is being asked to DO. It is now a note above the camera, closed
     with a cross, remembered in ms2.settings.v1. Toasts stay for events:
     "Zapisano profil", "Wyczyszczono historię". */
  function firstRunHint() {
    var U = global.UI;
    if (!U || typeof U.getSetting !== 'function') return;
    if (U.getSetting('firstRunDone')) return;
    if (typeof U.showFirstRunNote === 'function') U.showFirstRunNote();
  }

  /* ------------------------------------------------------------------
     4. Go
     ------------------------------------------------------------------ */

  function start() {
    var missing = census();
    if (missing.length) reportMissing(missing);
    firstRunHint();
    registerWorker();
  }

  if (global.Bus && typeof global.Bus.once === 'function') {
    // app:ready is emitted by ui-core one macrotask after DOMContentLoaded, so
    // by the time this runs every screen exists and every module has booted.
    global.Bus.once('app:ready', start);
  } else if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', function () { global.setTimeout(start, 0); });
  } else {
    global.setTimeout(start, 0);
  }

}(typeof window !== 'undefined' ? window : globalThis));
