/* Monitor Światła v3 — support.js — module 10 ("Wsparcie").
 *
 * The whole application is free: the seven metrics, the history, the recorder,
 * the thresholds, the reports, the export and the offline mode work for
 * everybody, right away and without an account. This file adds exactly one
 * thing on top: a screen where the author can be thanked.
 *
 * What is not here and never will be: a widget or a script from Buy Me a
 * Coffee, an image from somebody else's server, a donation counter, reminders,
 * dialogs after N launches, or any network request at all. The only outward
 * reference is a plain link the user clicks — and the screen says so out loud,
 * because every other screen promises that the measurement stays on the device.
 *
 * The request shows up only when the user opens this module from the index by
 * themselves. Nothing triggers it from the dashboard, from the measurement or
 * from the result screen.
 */
(function (global) {
  'use strict';

  /* ─────────────────────────────────────────────────────────────────────
     TU WPISZ ADRES SWOJEGO PROFILU BUY ME A COFFEE.
     Przykład: 'https://buymeacoffee.com/twojanazwa'
     Dopóki tu pusto, aplikacja nie pokazuje martwego przycisku — patrz niżej.
     ───────────────────────────────────────────────────────────────────── */
  const SUPPORT_URL = '';

  var doc = global.document;

  /* Buy Me a Coffee jest jedyną formą wsparcia w tej aplikacji, więc walidacja
     jest zawężona do tego serwisu: przyjmujemy wyłącznie adres ze schematem
     https:// na hoście buymeacoffee.com albo www.buymeacoffee.com. Cokolwiek
     innego — inny schemat, literówka, wklejone 'javascript:' — liczy się jak
     brak adresu, więc ekran zachowuje się dokładnie tak jak przy pustej
     stałej: żadnego odnośnika, jedno spokojne zdanie zamiast niego. */
  function supportHref() {
    var url = String(SUPPORT_URL || '').trim();
    return /^https:\/\/(www\.)?buymeacoffee\.com(\/|$)/.test(url) ? url : '';
  }

  /* ------------------------------------------------------------------
     Cleaning up after the previous version

     Versions up to 3.0 kept a simulated entitlement and a simulated account
     here. The key goes at startup; measurements, history and settings are
     never touched.
     ------------------------------------------------------------------ */

  function forgetOldKeys() {
    try {
      if (global.localStorage) global.localStorage.removeItem('ms3.entitlement.v1');
    } catch (_) { /* private mode throws on removal too — nothing to undo */ }
  }

  forgetOldKeys();

  /* ------------------------------------------------------------------
     Napisy — dopisywane do Scale.TEXT, jedynego domu napisów tej wersji (9.3)

     Nie literały, tylko MAPA kluczy warstwy językowej: każdy liść to klucz
     w ./i18n/<kod>.js albo — gdy zdanie mówi o pomiarze, nie o tym ekranie —
     w ../shared/i18n/<kod>.js. Scale.registerText zapamiętuje tę mapę, więc
     po zmianie języka ekran wsparcia przebuduje się razem z resztą.
     ------------------------------------------------------------------ */

  var TEXT_SHAPE = {
    support: {
      freeTitle: 'support.freeTitle',
      freeText: 'support.freeText',

      whyTitle: 'support.whyTitle',
      whyText: 'support.whyText',

      nothingTitle: 'support.nothingTitle',
      nothingText: 'support.nothingText',

      keyTitle: 'support.keyTitle',
      keyLabel: 'support.keyLabel',
      keyAria: 'support.keyAria',
      serviceText: 'support.serviceText',
      /* Nagłówek jest ten sam w każdej wersji aplikacji — klucz wspólny. */
      privacyTitle: 'privacy.title',
      privacyText: 'support.privacyText',
      privacyPendingText: 'support.privacyPendingText',

      emptyTitle: 'support.emptyTitle',
      emptyText: 'support.emptyText'
    }
  };

  function installText() {
    var S = global.Scale;
    if (!S || !S.TEXT || S.TEXT.support) return;
    if (typeof S.registerText === 'function') S.registerText(TEXT_SHAPE);
  }

  installText();

  var warned = {};

  function T(path) {
    var table = global.Scale && global.Scale.TEXT;
    var node = table;
    var parts = path.split('.');
    for (var i = 0; i < parts.length; i += 1) {
      if (node === null || typeof node !== 'object') { node = null; break; }
      node = node[parts[i]];
    }
    if (typeof node !== 'string') {
      // A missing key is a broken build, not a user error: warn once in the
      // console and draw nothing. Never make a sentence up.
      if (!warned[path]) {
        warned[path] = true;
        if (global.console && global.console.warn) {
          global.console.warn('support.js: Scale.TEXT has no "' + path + '"');
        }
      }
      return '';
    }
    return node;
  }

  /* ------------------------------------------------------------------
     DOM helpers — the same shapes docs.js uses
     ------------------------------------------------------------------ */

  function make(tag, cls, textPL) {
    var node = doc.createElement(tag);
    if (cls) node.className = cls;
    if (textPL !== undefined && textPL !== null) node.textContent = textPL;
    return node;
  }

  function put(parent, node) {
    if (parent && node) parent.appendChild(node);
    return node;
  }

  function section(titlePL) {
    var sec = make('section', 'ms3-screen__section');
    if (titlePL) put(sec, make('h2', '', titlePL));
    return sec;
  }

  function note(variant, titlePL, textPL) {
    var box = make('aside', 'ms3-note ms3-note--' + variant);
    put(box, make('span', 'ms3-note__title', titlePL));
    put(box, make('p', 'ms3-note__text', textPL));
    return box;
  }

  /* ------------------------------------------------------------------
     Module 10 — "Wsparcie"

     Four things, in this order: what is free, why the request is made, what a
     donation gives (nothing), and only then the key with the sentence about
     privacy. No countdown, no urgency, no amounts pretending to be a basket.
     ------------------------------------------------------------------ */

  function buildSupport(root) {
    var free = put(root, section(T('support.freeTitle')));
    put(free, make('p', '', T('support.freeText')));

    var why = put(root, section(T('support.whyTitle')));
    put(why, make('p', '', T('support.whyText')));

    var nothing = put(root, section(T('support.nothingTitle')));
    put(nothing, make('p', '', T('support.nothingText')));

    put(root, keySection());
  }

  function keySection() {
    var href = supportHref();
    var sec = section(href ? T('support.keyTitle') : T('support.emptyTitle'));

    // An empty address neither hides the screen nor raises an error: a calm
    // sentence for the user stands where the key would be and no link is
    // created at all. The privacy promise is repeated here as well, in the
    // future tense — this is the state every user sees until the owner fills
    // the constant in, so it must not be the one state that says nothing about
    // what leaves the device.
    if (!href) {
      put(sec, make('p', '', T('support.emptyText')));
      put(sec, note('limits', T('support.privacyTitle'), T('support.privacyPendingText')));
      return sec;
    }

    // A real <a>: this is a move to another page, not an in-app action, so it
    // has to be a link the browser can open its own way.
    var link = put(sec, make('a', 'ms3-key ms3-key--ghost ms3-support__key'));
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', T('support.keyAria'));

    // The cup is drawn with CSS shapes, like every icon in this version —
    // never a font glyph and never an image from somebody else's server.
    var icon = put(link, make('span', 'ms3-key__icon ms3-key__icon--cup'));
    icon.setAttribute('aria-hidden', 'true');
    put(link, make('span', 'ms3-key__label', T('support.keyLabel')));

    put(sec, make('p', 'ms3-field__hint', T('support.serviceText')));
    put(sec, note('limits', T('support.privacyTitle'), T('support.privacyText')));
    return sec;
  }

  /* ------------------------------------------------------------------
     Registration — at load time, so the module index already sees the entry
     on the first open (the index is built from the shell's registry).
     ------------------------------------------------------------------ */

  function register() {
    if (!global.UI3 || typeof global.UI3.registerModule !== 'function') return;
    var meta = (global.Scale && global.Scale.TEXT && global.Scale.TEXT.modules) || {};

    global.UI3.registerModule({
      no: '10',
      titlePL: (meta['10'] && meta['10'].titlePL) || '',
      descPL: (meta['10'] && meta['10'].descPL) || '',
      build: buildSupport
    });
  }

  if (global.UI3) register();
  else if (global.Bus && typeof global.Bus.once === 'function') global.Bus.once('app:ready', register);

}(window));
