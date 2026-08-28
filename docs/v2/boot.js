/* Monitor Światła v2 — boot.
 *
 * The last script in index.html, and deliberately the smallest one. Its whole
 * job is to answer three questions and then get out of the way:
 *
 *   1. Did every module actually load? The files were written in parallel by
 *      several people. If one is missing the app must say so in the user's own
 *      language, on screen, instead of failing with a blank tab and a console
 *      nobody opens.
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
 *
 * WARSTWA JĘZYKOWA. Ten plik ma jedno zadanie na wypadek, gdy coś się nie
 * wczytało — a tym „czymś” może być także ../shared/i18n.js. Dlatego zamiast
 * wołać I18n.t() wprost, przechodzi przez T(): gdy silnika językowego nie ma,
 * T() oddaje sam klucz. Klucz jest brzydki, ale jest prawdą; wpisanie tu
 * polskiego zdania „na zapas” oznaczałoby, że komunikat o zepsutej instalacji
 * jest jedynym miejscem aplikacji, które nie mówi w języku użytkownika.
 */
(function (global) {
  'use strict';

  var doc = global.document;

  function T(key, params) {
    var I = global.I18n;
    if (I && typeof I.t === 'function') return I.t(key, params);
    return key;
  }

  /* ------------------------------------------------------------------
     1. Module census
     ------------------------------------------------------------------ */

  /* [globalName, fileName, effectKey] — fileName jest ścieżką, czyli daną,
     a nie napisem do przetłumaczenia. Jedyny wyjątek to bus.js, którego opis
     zawiera nawias będący zdaniem; ten idzie przez słownik. */
  var REQUIRED = [
    ['Metrics', '../shared/metrics.js', 'boot.need.metrics'],
    ['Bus', null, 'boot.need.bus'],
    ['UI', 'ui-core.js', 'boot.need.ui'],
    ['Engine', '../shared/engine.js', 'boot.need.engine'],
    ['Support', 'support.js', 'boot.need.support'],
    ['Tools', 'tools.js', 'boot.need.tools']
  ];

  function fileOf(entry) {
    return entry[1] === null ? T('boot.file.bus') : entry[1];
  }

  function census() {
    var missing = [];
    for (var i = 0; i < REQUIRED.length; i += 1) {
      if (!global[REQUIRED[i][0]]) missing.push(REQUIRED[i]);
    }
    return missing;
  }

  /* A missing module is a broken build, not a user error — but the user is the
     one looking at the screen, so the message is on screen, names the file, and
     says what still works. Measurement usually still does. */
  function reportMissing(missing) {
    var lines = [];
    for (var i = 0; i < missing.length; i += 1) {
      lines.push(T('boot.missingItem', { file: fileOf(missing[i]), effect: T(missing[i][2]) }));
    }
    var listText = T('boot.missing', { list: lines.join('; ') });

    if (global.console && console.error) {
      console.error('boot.js: ' + listText + ' ' + T('boot.consoleHint'));
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
    title.textContent = T('boot.incompleteTitle');
    body.appendChild(title);
    var line = doc.createElement('span');
    // Jedna wstawka zamiast sklejania: zdanie „co zrobić” stoi po liście
    // braków po polsku, ale w innym języku może stać przed nią.
    line.textContent = T('boot.incompleteText', { missing: listText });
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
    U.toast(T('boot.newVersion'), {
      durationMs: 12000,
      actionPL: T('action.refresh'),
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
