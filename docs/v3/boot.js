/* Monitor Światła v3 — boot.js — the last script, and deliberately the smallest.
 *
 * It answers three questions and then gets out of the way:
 *
 *   1. Did every file actually load, and did every module register? Eleven
 *      files were written in parallel. If one of them is missing, the app must
 *      say so IN POLISH, ON SCREEN — not in a console nobody opens — and say
 *      what stops working. Measurement usually still does.
 *   2. Is the offline worker registered? Once, from here. No other file in the
 *      application touches navigator.serviceWorker.
 *   3. Is this the first run? If so, one sentence pointing at the START key,
 *      as a note that can be closed, never as a toast that fades away.
 *
 * What boot.js deliberately does NOT do: it does not adapt one module's API to
 * another's (a shim here would hide the bug and double the number of places to
 * read), it does not build or hide any screen, it never calls Engine.start(),
 * and it never reloads the page on its own — a reload during a measurement
 * would throw the session away.
 *
 * The one place in v3 that carries Polish literals rather than reading
 * Scale.TEXT: the census message. Its whole purpose is to work on the run
 * where scale.js is the file that failed to load, so it prefers Scale.TEXT
 * when that exists and falls back to the sentences below when it does not.
 */
(function (global) {
  'use strict';

  var doc = global.document;

  /* ------------------------------------------------------------------
     Wording
     ------------------------------------------------------------------ */

  var TEXT = {
    title: 'Aplikacja wczytała się niekompletnie',
    filesTpl: 'Nie wczytały się pliki: {list}.',
    modulesTpl: 'Nie zgłosiły się moduły: {list} — te pozycje nie otworzą się ze spisu.',
    modulesRangeTpl: 'moduły {from}–{to}',
    tail: 'Odśwież stronę. Jeżeli to nie pomoże, pliki na serwerze są niekompletne.',
    newVersion: 'Jest nowa wersja aplikacji.',
    refresh: 'Odśwież',
    firstRun: 'Zacznij od klawisza „Start pomiaru” na dole ekranu. Kamera włączy się dopiero po naciśnięciu.',
    close: 'Zamknij'
  };

  // Prefer chapter 8 where it is available; fall back to the literal above.
  function T(path, fallback) {
    var table = global.Scale && global.Scale.TEXT;
    if (table) {
      var parts = path.split('.');
      var node = table;
      for (var i = 0; i < parts.length; i += 1) {
        if (node === null || typeof node !== 'object') { node = null; break; }
        node = node[parts[i]];
      }
      if (typeof node === 'string' && node) return node;
    }
    return fallback;
  }

  function fill(tpl, vars) {
    return tpl.replace(/\{(\w+)\}/g, function (whole, key) {
      return Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : whole;
    });
  }

  /* ------------------------------------------------------------------
     1. Census

     Two lists, because two different things can go wrong. A missing GLOBAL
     means a file did not parse at all; a missing MODULE means the file
     loaded but never reached UI3.registerModule.
     ------------------------------------------------------------------ */

  // [global name | probe, file, what stops working]
  var REQUIRED = [
    { name: 'Bus', filePL: 'bus.js', lossPL: 'moduły przestaną się widzieć i pomiar nie ruszy' },
    { name: 'Metrics', filePL: 'metrics.js', lossPL: 'żadna wartość nie zostanie policzona' },
    { name: 'Scale', filePL: 'scale.js', lossPL: 'zniknie skala i wszystkie napisy' },
    { name: 'UI3', filePL: 'shell.js', lossPL: 'nie da się otworzyć żadnego modułu' },
    { name: 'Engine', filePL: 'engine.js', lossPL: 'kamera i pomiar nie ruszą' },
    { probe: dashPresent, filePL: 'dash.js', lossPL: 'pulpit zostanie pusty' }
  ];

  /* dash.js exports no global — by design, nothing calls into it. Its proof of
     life is the channel strip, which it fills synchronously while handling
     `app:ready`, one bus handler before this file. */
  function dashPresent() {
    var strip = doc && doc.getElementById('ms3Channels');
    return !!(strip && strip.firstChild);
  }

  // module number -> the file that was supposed to register it
  var MODULE_FILES = {
    '01': 'recorder.js',
    '02': 'modules.js', '03': 'modules.js', '04': 'modules.js', '05': 'modules.js',
    '06': 'modules.js', '07': 'modules.js', '08': 'modules.js', '09': 'modules.js',
    '10': 'support.js',
    '11': 'docs.js', '12': 'docs.js'
  };

  function missingFiles() {
    var out = [];
    for (var i = 0; i < REQUIRED.length; i += 1) {
      var row = REQUIRED[i];
      var present;
      if (row.probe) {
        try { present = !!row.probe(); } catch (_) { present = false; }
      } else {
        present = !!global[row.name];
      }
      if (!present) out.push(row.filePL + ' — ' + row.lossPL);
    }
    return out;
  }

  function missingModules() {
    if (!global.UI3 || typeof global.UI3.modules !== 'function') return [];
    var have = {};
    var list;
    try { list = global.UI3.modules(); } catch (_) { return []; }
    for (var i = 0; i < list.length; i += 1) have[list[i].no] = true;

    var meta = (global.Scale && global.Scale.TEXT && global.Scale.TEXT.modules) || {};

    // One entry per FILE, not per module: "modules.js — moduły 02-09" is one
    // line a user can act on; eight lines saying the same thing are noise.
    var byFile = {};
    var order = [];
    var no;
    for (no in MODULE_FILES) {
      if (!Object.prototype.hasOwnProperty.call(MODULE_FILES, no)) continue;
      if (have[no]) continue;
      var file = MODULE_FILES[no];
      if (!byFile[file]) { byFile[file] = []; order.push(file); }
      byFile[file].push(no);
    }

    var out = [];
    for (var i = 0; i < order.length; i += 1) {
      var nos = byFile[order[i]].sort();
      var labelPL;
      if (nos.length === 1) {
        labelPL = (meta[nos[0]] && meta[nos[0]].titlePL) ? meta[nos[0]].titlePL : nos[0];
      } else {
        labelPL = fill(TEXT.modulesRangeTpl, { from: nos[0], to: nos[nos.length - 1] });
      }
      out.push(order[i] + ' — ' + labelPL);
    }
    return out;
  }

  /* A missing file is a broken build, not a user error — but the user is the
     one looking at the screen, so the message is Polish, names the file and
     says what still works. It goes into the standing notes column of the
     dashboard, never into a modal: a modal would cover the measurement. */
  function reportMissing(files, modules) {
    var lines = [];
    if (files.length) lines.push(fill(TEXT.filesTpl, { list: files.join('; ') }));
    if (modules.length) lines.push(fill(TEXT.modulesTpl, { list: modules.join('; ') }));
    if (!lines.length) return;
    lines.push(TEXT.tail);

    if (global.console && global.console.error) {
      global.console.error('boot.js: ' + lines.join(' ') + ' Sprawdź kolejność i ścieżki <script> w index.html.');
    }
    if (!doc) return;

    var box = doc.getElementById('ms3BootError');
    if (!box) {
      box = doc.createElement('aside');
      box.id = 'ms3BootError';
      box.className = 'ms3-note ms3-note--warning';
      box.setAttribute('role', 'alert');
      var title = doc.createElement('span');
      title.className = 'ms3-note__title';
      title.textContent = T('note.titleWarning', 'Uwaga');
      box.appendChild(title);
      var head = doc.createElement('p');
      head.className = 'ms3-note__text';
      head.textContent = TEXT.title;
      box.appendChild(head);

      var host = doc.getElementById('ms3Notes') || doc.getElementById('ms3Scroll') ||
                 doc.getElementById('ms3Dash') || doc.body;
      // First in the notes column: it is the most important thing on the page.
      if (host && host.firstChild) host.insertBefore(box, host.firstChild);
      else if (host) host.appendChild(box);
    }

    for (var i = 0; i < lines.length; i += 1) {
      var p = doc.createElement('p');
      p.className = 'ms3-note__text';
      p.textContent = lines[i];
      box.appendChild(p);
    }
  }

  /* ------------------------------------------------------------------
     2. Service worker

     Registered with a relative path so the app works from any sub-directory,
     and skipped entirely on file://, where registration always fails and the
     resulting console error looks like a bug in the application.
     ------------------------------------------------------------------ */

  function registerWorker() {
    var nav = global.navigator;
    if (!nav || !('serviceWorker' in nav)) return;
    var proto = global.location && global.location.protocol;
    if (proto !== 'https:' && proto !== 'http:') return;

    nav.serviceWorker.register('sw.js', { scope: './' }).then(function (reg) {
      if (!reg) return;
      // A worker already waiting means the user is looking at the old version.
      if (reg.waiting) offerUpdate(reg);
      reg.addEventListener('updatefound', function () {
        var installing = reg.installing;
        if (!installing) return;
        installing.addEventListener('statechange', function () {
          // `controller` present means this is an update, not the first install:
          // on a first install there is no old version to replace.
          if (installing.state === 'installed' && nav.serviceWorker.controller) offerUpdate(reg);
        });
      });
    }).catch(function () {
      // Offline mode simply will not be available. Nothing else changes, so
      // this is not worth a message on screen.
    });
  }

  var updateOffered = false;

  function offerUpdate(reg) {
    if (updateOffered) return;

    // Never during a measurement: the reload the toast leads to would throw the
    // session away. The offer waits for the engine to stop and comes back then.
    var E = global.Engine;
    if (E && typeof E.isRunning === 'function' && E.isRunning()) {
      if (global.Bus && typeof global.Bus.once === 'function') {
        global.Bus.once('engine:stopped', function () { offerUpdate(reg); });
      }
      return;
    }

    var U = global.UI3;
    if (!U || typeof U.toast !== 'function') return;
    updateOffered = true;

    // No durationMs: a toast with a key waits for a person (WCAG 2.2.1), and
    // news about a new version must not expire unread.
    U.toast(T('transient.newVersion', TEXT.newVersion), {
      actionPL: T('transient.newVersionKey', TEXT.refresh),
      onAction: function () { applyUpdate(reg); }
    });
  }

  /* The reload happens here and only here, after a human pressed "Odśwież".
     The waiting worker is told to take over first; the page then reloads on
     `controllerchange`, with a timer as the fallback for the case where no
     worker was waiting after all. */
  function applyUpdate(reg) {
    var nav = global.navigator;
    var reloaded = false;

    function reloadOnce() {
      if (reloaded) return;
      reloaded = true;
      try { global.location.reload(); } catch (_) { /* nothing else to try */ }
    }

    if (nav && nav.serviceWorker) {
      nav.serviceWorker.addEventListener('controllerchange', reloadOnce);
    }
    if (reg && reg.waiting) {
      try { reg.waiting.postMessage({ type: 'SKIP_WAITING' }); } catch (_) {}
    }
    global.setTimeout(reloadOnce, 1500);
  }

  /* ------------------------------------------------------------------
     3. First run

     A note, not a toast (8.5). As a nine-second toast in v2 it covered the
     bottom of the screen and, once it faded, there was no way back to it —
     a toast is the pattern for something that just HAPPENED, and this is a
     thing the user is being asked to DO. It closes with a cross and is
     remembered in `firstRunDone`.
     ------------------------------------------------------------------ */

  function firstRunNote() {
    var U = global.UI3;
    if (!U || typeof U.getSetting !== 'function' || !doc) return;
    if (U.getSetting('firstRunDone')) return;

    var box = doc.getElementById('ms3FirstRun');
    if (!box) return;

    // The sentence is already in the static skeleton, where index.html owns it.
    // It is only written from here when the markup left it empty, so this file
    // never overwrites a proof-read literal with a copy of the same sentence.
    var text = box.querySelector('.ms3-note__text');
    if (text && !text.textContent) text.textContent = T('transient.firstRun', TEXT.firstRun);

    if (!box.querySelector('.ms3-note__close')) {
      var close = doc.createElement('button');
      close.type = 'button';
      close.className = 'ms3-key ms3-key--ghost ms3-note__close';
      close.setAttribute('aria-label', T('keys.close', TEXT.close));
      var icon = doc.createElement('span');
      icon.className = 'ms3-key__icon ms3-key__icon--close';
      close.appendChild(icon);
      close.addEventListener('click', function () {
        box.hidden = true;
        if (typeof U.setSetting === 'function') U.setSetting('firstRunDone', true);
      });
      box.appendChild(close);
      box.className = box.className + ' ms3-note--closable';
    }

    box.hidden = false;
  }

  /* ------------------------------------------------------------------
     4. Go
     ------------------------------------------------------------------ */

  var started = false;

  function start() {
    if (started) return;
    started = true;

    reportMissing(missingFiles(), missingModules());
    firstRunNote();
    registerWorker();
  }

  if (global.Bus && typeof global.Bus.once === 'function') {
    // app:ready is emitted by shell.js one macrotask after DOMContentLoaded, so
    // by then every module has registered and dash.js has drawn the strip.
    global.Bus.once('app:ready', start);
  }

  /* Safety net for the worst case in the census: if shell.js is the file that
     failed to load, `app:ready` is never emitted and without this the census
     would never run — the one moment the user needs it most. */
  function safetyNet() {
    global.setTimeout(start, 1500);
  }

  if (doc && doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', safetyNet);
  else safetyNet();

}(window));
