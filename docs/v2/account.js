/* Monitor Światła v2 — konto, sklep i reklamy (cała monetyzacja w jednym pliku).
 *
 * This file publishes three globals: window.Account, window.Store, window.Ads.
 * Each one is built the same way and the shape is deliberate:
 *
 *     MockXxxBackend   — the ONLY place where the fiction lives. Delays, fake
 *                        accounts, fake receipts, fake ad creatives, fake
 *                        failures. Marked by the banner comments
 *                        "FICTIONAL LAYER" / "END OF FICTIONAL LAYER".
 *     Xxx.adapter      — the seam. One object of promise-returning methods.
 *     Xxx.*            — the stable layer. It does not know it is talking to a
 *                        simulation, so replacing `adapter` with a real SDK is
 *                        the whole port.
 *
 * Rules honoured here, from the architecture document:
 *   - Measurement is sacred. Nothing in this file may block, delay, interrupt
 *     or cover the camera, Start/Stop or the four free metrics. Ads live in
 *     three static slots on three screens, none of them the measurement screen.
 *   - No network of any kind. No fetch, no XHR, no external script, no remote
 *     image, no web font. The avatar is generated locally as an inline SVG.
 *   - Every account, payment and advertising surface carries a visible DEMO
 *     marker, because a user must never believe a real charge happened.
 *   - Promises returned from here never reject. Failure comes back in the
 *     result object; a lost `catch` in the ad module must not freeze a button.
 *   - Every localStorage access is wrapped in try/catch: private mode and a
 *     full quota are normal conditions, not crashes.
 *   - No module here touches `hidden`, `display` or `aria-selected` on
 *     panel, nav and sheet elements. Screen visibility belongs to window.UI.
 *     That double ownership was the v1 bug; it is not repeated.
 *   - Interface strings are Polish with diacritics; comments are English.
 *     Never mixed inside one sentence.
 *
 * Amounts appear exactly once, as `priceMinor` in the product catalogue below.
 * Prices, terms and button captions are produced by Store.formatPrice(),
 * Store.formatTerms() and Store.formatCta(). In v1 a card said one price and
 * the terms said another; here that mismatch is not expressible, because no
 * other file — and no other function in this file — is allowed to write an
 * amount into a string.
 */
(function (global) {
  'use strict';

  var doc = global.document;

  /* ==================================================================
     Shared plumbing (private to this file)
     ================================================================== */

  var DAY_MS = 24 * 60 * 60 * 1000;
  var MINUTE_MS = 60 * 1000;

  var KEY_BILLING = 'ms2.billing.v1';
  var KEY_ACCOUNT = 'ms2.account.v1';
  var KEY_CLOUD = 'ms2.cloud.v1';
  var KEY_ADS = 'ms2.ads.v1';
  var KEY_TOUR = 'ms2.tour.v1';

  function readJson(key, fallback) {
    try {
      var raw = global.localStorage.getItem(key);
      if (!raw) return fallback;
      var value = JSON.parse(raw);
      return value && typeof value === 'object' ? value : fallback;
    } catch (e) {
      // Private mode, disabled storage, corrupted JSON — all the same answer:
      // behave like a fresh install rather than take the app down.
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      global.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function removeKey(key) {
    try { global.localStorage.removeItem(key); } catch (e) { /* ignore */ }
  }

  // Bus is a hard dependency but a missing bus must not throw at parse time;
  // a broken shell should still leave the measurement screen usable.
  function bus() {
    return global.Bus && typeof global.Bus.emit === 'function' ? global.Bus : null;
  }

  function emit(name, data) {
    var b = bus();
    if (b) b.emit(name, data || {});
  }

  function on(name, cb) {
    var b = bus();
    if (b && typeof b.on === 'function') b.on(name, cb);
  }

  /* One-shot listener. Used for sheet lifecycles, where a handler that stayed
     subscribed would fire again for the next sheet of the same kind. Falls
     back to a self-removing on() if the bus has no once(). */
  function once(name, cb) {
    var b = bus();
    if (!b) return;
    if (typeof b.once === 'function') { b.once(name, cb); return; }
    var wrapped = function (data) {
      if (typeof b.off === 'function') b.off(name, wrapped);
      cb(data);
    };
    if (typeof b.on === 'function') b.on(name, wrapped);
  }

  function ui() {
    return global.UI || null;
  }

  function toast(messagePL, opts) {
    var u = ui();
    if (u && typeof u.toast === 'function') u.toast(messagePL, opts || {});
  }

  function announce(textPL, assertive) {
    var u = ui();
    if (u && typeof u.announce === 'function') u.announce(textPL, !!assertive);
  }

  function setting(key) {
    var u = ui();
    if (u && typeof u.getSetting === 'function') {
      try { return u.getSetting(key); } catch (e) { return undefined; }
    }
    return undefined;
  }

  // Failures are never random. A demo that fails by dice teaches nothing and
  // looks broken; it fails only when the user asks for it in Ustawienia.
  function failuresSimulated() {
    return setting('simulateFailures') === true;
  }

  function reducedMotion() {
    try {
      return !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (e) {
      return false;
    }
  }

  function delay(ms, fn) {
    return global.setTimeout(fn, ms);
  }

  /* ---------- DOM helpers -------------------------------------------- */

  function el(id) {
    if (!doc) return null;
    try { return doc.getElementById(id); } catch (e) { return null; }
  }

  function mk(tag, className, text) {
    var node = doc.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  // The shell (index.html) is written by another author and may already carry
  // static markup for these ids. Fill it when it exists, build it when it does
  // not — the module works either way and never duplicates a node.
  function ensure(id, tag, parent, className) {
    var found = el(id);
    if (found) {
      if (className) found.className = className;
      return found;
    }
    if (!parent) return null;
    var node = mk(tag, className);
    node.id = id;
    parent.appendChild(node);
    return node;
  }

  // Containers this module creates for itself. They get a data attribute rather
  // than an id, because the id list in chapter 10 is a contract and inventing
  // new ids risks colliding with somebody else's file.
  function ensureOwned(key, tag, parent, className) {
    if (!parent) return null;
    var found = parent.querySelector('[data-ms-own="' + key + '"]');
    if (found) {
      found.className = className || '';
      return found;
    }
    var node = mk(tag, className);
    node.setAttribute('data-ms-own', key);
    parent.appendChild(node);
    return node;
  }

  function clear(node) {
    if (!node) return;
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function setText(node, text) {
    if (node) node.textContent = text;
  }

  function show(node, visible) {
    // Only ever called on elements this module owns (boxes, ad slots, teaser).
    // Panels, sheets and nav items belong to UI and are never touched here.
    if (node) node.hidden = !visible;
  }

  function icon(name) {
    // styles.css draws icons as CSS masks on a span; that is the contract of
    // the visual system, so no inline SVG and no icon font is needed.
    var span = mk('span', 'ms-icon ms-icon--' + name);
    span.setAttribute('aria-hidden', 'true');
    return span;
  }

  // Both class names on purpose: `ms-demo-badge` is what styles.css paints,
  // `demo-badge` is what the integration checklist greps for.
  function demoBadge(textPL) {
    return mk('span', 'ms-demo-badge demo-badge', textPL || 'DEMO');
  }

  function demoStrip(textPL) {
    var strip = mk('div', 'ms-demo-strip');
    strip.appendChild(demoBadge('DEMO'));
    strip.appendChild(mk('span', null, textPL));
    return strip;
  }

  function note(kind, titlePL, textPL) {
    var box = mk('div', 'ms-note ms-note--' + kind);
    box.appendChild(icon(kind === 'premium' ? 'crown' : kind === 'warning' ? 'warning' : 'info'));
    var body = mk('div', 'ms-note__text');
    if (titlePL) body.appendChild(mk('span', 'ms-note__title', titlePL));
    body.appendChild(doc.createTextNode(textPL));
    box.appendChild(body);
    return box;
  }

  function button(id, className, labelPL, onClick) {
    var b = mk('button', className);
    b.type = 'button';
    b.id = id;
    b.appendChild(mk('span', 'ms-btn__label', labelPL));
    if (onClick) b.addEventListener('click', onClick);
    return b;
  }

  function fmtDate(ms) {
    var u = ui();
    if (u && typeof u.formatDate === 'function') {
      try { return u.formatDate(ms); } catch (e) { /* fall through */ }
    }
    try {
      return new Date(ms).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
      return '—';
    }
  }

  function fmtDateTime(ms) {
    var u = ui();
    if (u && typeof u.formatTime === 'function') {
      try { return fmtDate(ms) + ', ' + u.formatTime(ms); } catch (e) { /* fall through */ }
    }
    try {
      return new Date(ms).toLocaleString('pl-PL');
    } catch (e) {
      return '—';
    }
  }

  function metricName(metricId) {
    // Names come from the metric catalogue, never from a second list here.
    var m = global.Metrics && typeof global.Metrics.byId === 'function' ? global.Metrics.byId(metricId) : null;
    return m ? m.namePL : metricId;
  }

  function metricShort(metricId) {
    var m = global.Metrics && typeof global.Metrics.byId === 'function' ? global.Metrics.byId(metricId) : null;
    return m ? m.shortPL : '';
  }

  function engineRunning() {
    return !!(global.Engine && typeof global.Engine.isRunning === 'function' && global.Engine.isRunning());
  }

  /* ==================================================================
     ==================================================================
     1. KONTO — window.Account
     ==================================================================
     ================================================================== */

  /* ------------------------------------------------------------------
     FICTIONAL LAYER — MockAuthBackend
     ------------------------------------------------------------------
     Everything below this banner is invented. It pretends to be an identity
     provider: it waits, it sometimes refuses, and it hands back a profile that
     was never anywhere near a server. No password is ever requested, because
     there is nothing to authenticate against — asking for one would be the
     dishonest part of a fake login, not the fake part.

     ------------------------------------------------------------------
     HOW TO REPLACE THIS WITH REAL GOOGLE IDENTITY SERVICES
     ------------------------------------------------------------------
     1. Register the app at https://console.cloud.google.com/apis/credentials
        as an "OAuth 2.0 Client ID" of type "Web application". Add the exact
        origin that serves docs/v2/ to "Authorised JavaScript origins".
        You receive a string like "123456789-abc.apps.googleusercontent.com".
     2. Put that string in ONE place — a constant next to `Account.adapter`,
        e.g. `var GOOGLE_CLIENT_ID = '...apps.googleusercontent.com';`.
        Nothing else in the app may learn it.
     3. Load the SDK once from index.html:
            <script src="https://accounts.google.com/gsi/client" async defer></script>
        (This is the one place where the "no external script" rule of this
        project would have to be relaxed, and it must be a conscious decision:
        it makes the app non-functional offline for sign-in only.)
     4. Replace `Account.adapter.signIn('google')` with:
            google.accounts.id.initialize({
              client_id: GOOGLE_CLIENT_ID,
              callback: function (response) { ... }     // response.credential = JWT ID token
            });
            google.accounts.id.prompt();                // or renderButton(el, {...})
        In the callback, send `response.credential` to your own backend and let
        the backend verify the signature against
        https://www.googleapis.com/oauth2/v3/certs (never trust a token decoded
        in the browser). The backend returns the profile.
     5. `adapter.signIn` must resolve with exactly the shape it resolves with
        today: `{ok:true, user:{id, provider:'google', displayName, email,
        initials, avatarColor, createdAt, lastSyncAt, demo:false}}`, or
        `{ok:false, cancelled:true}` when the user closes the prompt, or
        `{ok:false, code:'...', messagePL:'...'}` on error. Nothing above the
        adapter changes. Set `demo:false` and drop `Account.DEMO`, which is
        what the interface reads to decide whether to print the DEMO strip.
     6. `adapter.signOut` becomes `google.accounts.id.disableAutoSelect()` plus
        your own session teardown.
     7. If you want the real profile picture, add a `photoUrl` field — and be
        aware that fetching it is a network request to googleusercontent.com,
        which is exactly what `avatarDataUri()` below was written to avoid.

     ------------------------------------------------------------------
     HOW TO REPLACE THIS WITH REAL FACEBOOK LOGIN
     ------------------------------------------------------------------
     1. Create an app at https://developers.facebook.com/apps, add the
        "Facebook Login" product, and list the serving origin under
        "Valid OAuth Redirect URIs". You receive a numeric App ID.
     2. Store it as `var FACEBOOK_APP_ID = '000000000000000';` next to the
        adapter — again, one place only.
     3. Load the SDK in index.html:
            <script async defer crossorigin="anonymous"
                    src="https://connect.facebook.net/pl_PL/sdk.js"></script>
        then `FB.init({appId: FACEBOOK_APP_ID, version: 'v19.0', xfbml: false});`
     4. Replace `adapter.signIn('facebook')` with:
            FB.login(function (response) {
              if (response.status === 'connected') {
                FB.api('/me', {fields: 'name,email'}, function (profile) { ... });
              } else {
                // user cancelled -> resolve {ok:false, cancelled:true}
              }
            }, {scope: 'public_profile,email'});
        `response.authResponse.accessToken` goes to your backend, which
        verifies it with the Graph API `debug_token` endpoint before trusting
        anything. E-mail is optional on Facebook and may be absent — the layer
        above already treats `email` as a display string, not an identifier.
     5. `adapter.signOut` becomes `FB.logout()`.

     In both cases the only file that changes is this one, and only between the
     two banner comments plus the adapter. The state machine, the persistence,
     the sync and every screen stay exactly as they are.
     ------------------------------------------------------------------ */

  var MockAuthBackend = (function () {
    var SIGN_IN_MS = 1400;      // chapter 7.2 of the architecture document
    var timer = null;
    var pendingReject = null;

    // Reserved domains: `.invalid` can never resolve and `przyklad` is the
    // Polish "example". Nobody can mistake these for a real mailbox.
    var PROFILES = {
      google: {
        id: 'demo-google-1',
        provider: 'google',
        displayName: 'Konto demonstracyjne Google',
        email: 'demo-google@przyklad.invalid',
        initials: 'KD',
        avatarColor: '#3f6ad8'
      },
      facebook: {
        id: 'demo-facebook-1',
        provider: 'facebook',
        displayName: 'Konto demonstracyjne Facebook',
        email: 'demo-facebook@przyklad.invalid',
        initials: 'KD',
        avatarColor: '#3b5998'
      }
    };

    function cloneProfile(providerId) {
      var src = PROFILES[providerId];
      if (!src) return null;
      return {
        id: src.id,
        provider: src.provider,
        displayName: src.displayName,
        email: src.email,
        initials: src.initials,
        avatarColor: src.avatarColor,
        createdAt: Date.now(),
        lastSyncAt: null,
        demo: true
      };
    }

    return {
      PROFILES: PROFILES,
      signInMs: SIGN_IN_MS,

      signIn: function (providerId) {
        return new Promise(function (resolve) {
          if (!PROFILES[providerId]) {
            resolve({ ok: false, code: 'PROVIDER', messagePL: 'Nieznany dostawca logowania.' });
            return;
          }
          pendingReject = function () {
            timer = null;
            pendingReject = null;
            resolve({ ok: false, cancelled: true });
          };
          timer = delay(SIGN_IN_MS, function () {
            timer = null;
            pendingReject = null;
            if (failuresSimulated()) {
              resolve({
                ok: false,
                code: 'NETWORK',
                messagePL: 'Symulowany błąd logowania (włączony przełącznik „Symuluj błędy”). Spróbuj ponownie.'
              });
              return;
            }
            resolve({ ok: true, user: cloneProfile(providerId) });
          });
        });
      },

      cancel: function () {
        if (timer !== null) {
          global.clearTimeout(timer);
          timer = null;
        }
        if (pendingReject) pendingReject();
      },

      signOut: function () {
        return new Promise(function (resolve) {
          delay(200, function () { resolve({ ok: true }); });
        });
      },

      fetchProfile: function () {
        // The "cloud" is one localStorage key on this very device. Saying so in
        // the interface is the whole point of the exercise.
        return new Promise(function (resolve) {
          delay(600, function () {
            resolve({ ok: true, data: readJson(KEY_CLOUD, null) });
          });
        });
      },

      pushProfile: function (payload) {
        return new Promise(function (resolve) {
          delay(600, function () {
            var stored = {
              at: Date.now(),
              deviceId: payload && payload.deviceId ? payload.deviceId : 'demo-device',
              data: payload && payload.data ? payload.data : null
            };
            var ok = writeJson(KEY_CLOUD, stored);
            resolve({
              ok: ok,
              at: stored.at,
              messagePL: ok ? '' : 'Nie udało się zapisać danych na tym urządzeniu (brak miejsca).'
            });
          });
        });
      }
    };
  }());

  /* ---------------- END OF FICTIONAL LAYER (Account) ---------------- */

  var Account = {};

  var ACCOUNT_EVENTS = ['account:state', 'account:signedin', 'account:signedout', 'account:error', 'account:sync'];

  // Settings that travel with the profile. Measurements never do: they are
  // large, they belong to the device, and pretending to sync them would be the
  // one lie this demo cannot excuse.
  var SYNCED_SETTINGS = ['theme', 'textScale', 'contrast', 'sound', 'vibrate'];

  var accountState = {
    state: 'signedOut',
    user: null,
    syncEnabled: true,
    lastSyncAt: null,
    lastErrorPL: ''
  };

  function accountPersist() {
    writeJson(KEY_ACCOUNT, {
      version: 1,
      user: accountState.user,
      syncEnabled: accountState.syncEnabled,
      lastSyncAt: accountState.lastSyncAt
    });
  }

  function accountLoad() {
    var stored = readJson(KEY_ACCOUNT, null);
    if (!stored) return;
    if (stored.user && stored.user.id) {
      accountState.user = stored.user;
      accountState.state = 'signedIn';
    }
    accountState.syncEnabled = stored.syncEnabled !== false;
    accountState.lastSyncAt = typeof stored.lastSyncAt === 'number' ? stored.lastSyncAt : null;
  }

  function setAccountState(next, extra) {
    accountState.state = next;
    emit('account:state', { state: next, user: accountState.user });
    renderAccountPanel();
    if (extra && extra.error) emit('account:error', { messagePL: extra.error });
  }

  Account.DEMO = true;

  Account.PROVIDERS = [
    {
      id: 'google',
      namePL: 'Google',
      // Deliberately NOT the brand logo and NOT the brand colour on the button.
      // The architecture forbids passing a simulation off as someone else's
      // product; a monochrome glyph plus the words "Google (DEMO)" says what
      // this is without borrowing a trademark.
      iconName: 'google',
      // No "(DEMO)" in the label: the .ms-demo-badge sits right beside it and
      // says the same thing, and the duplication pushed the text onto a
      // second line.
      labelPL: 'Zaloguj przez Google'
    },
    {
      id: 'facebook',
      namePL: 'Facebook',
      iconName: 'facebook',
      labelPL: 'Zaloguj przez Facebook'
    }
  ];

  Account.state = function () { return accountState.state; };
  Account.user = function () { return accountState.user; };
  Account.isSignedIn = function () { return accountState.state === 'signedIn' && !!accountState.user; };
  Account.getUser = function () { return accountState.user; };
  Account.isSyncEnabled = function () { return accountState.syncEnabled; };
  Account.lastSyncAt = function () { return accountState.lastSyncAt; };

  Account.setSyncEnabled = function (value) {
    accountState.syncEnabled = !!value;
    accountPersist();
    renderAccountPanel();
  };

  // Thin, filtered facade over the one bus. This is not a second event system:
  // it forwards to window.Bus and refuses any name outside the account group,
  // so the closed event registry stays closed.
  Account.on = function (name, cb) {
    if (ACCOUNT_EVENTS.indexOf(name) < 0) return null;
    on(name, cb);
    return cb;
  };

  Account.off = function (name, cb) {
    var b = bus();
    if (b && typeof b.off === 'function' && ACCOUNT_EVENTS.indexOf(name) >= 0) b.off(name, cb);
  };

  // Locally drawn avatar: initials on a coloured disc, encoded as a data URI.
  // Never a photo, never a request. Offered as a helper for anything that needs
  // an <img>; the account screen itself uses a plain styled element.
  Account.avatarDataUri = function (user, size) {
    var u = user || accountState.user;
    var colour = u && u.avatarColor ? u.avatarColor : '#3f6ad8';
    var initials = u && u.initials ? u.initials : '?';
    var px = size || 96;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + px + '" height="' + px + '" viewBox="0 0 96 96" role="img">' +
      '<rect width="96" height="96" rx="48" fill="' + colour + '"/>' +
      '<text x="48" y="49" text-anchor="middle" dominant-baseline="central" ' +
      'font-family="system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" ' +
      'font-size="38" font-weight="700" fill="#ffffff">' + initials + '</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  };

  Account.adapter = {
    signIn: function (providerId) { return MockAuthBackend.signIn(providerId); },
    signOut: function () { return MockAuthBackend.signOut(); },
    fetchProfile: function () { return MockAuthBackend.fetchProfile(); },
    pushProfile: function (payload) { return MockAuthBackend.pushProfile(payload); }
  };

  Account.signIn = function (providerId) {
    if (accountState.state === 'signingIn') {
      return Promise.resolve({ ok: false, cancelled: true, messagePL: 'Logowanie już trwa.' });
    }
    var provider = null;
    for (var i = 0; i < Account.PROVIDERS.length; i += 1) {
      if (Account.PROVIDERS[i].id === providerId) provider = Account.PROVIDERS[i];
    }
    if (!provider) {
      return Promise.resolve({ ok: false, code: 'PROVIDER', messagePL: 'Nieznany dostawca logowania.' });
    }

    accountState.lastErrorPL = '';
    setAccountState('signingIn');
    openLoginSheet(provider);

    return Account.adapter.signIn(providerId).then(function (result) {
      closeLoginSheet();
      if (result && result.cancelled) {
        setAccountState('signedOut');
        toast('Logowanie anulowane.', { kind: 'info' });
        return { ok: false, cancelled: true };
      }
      if (!result || !result.ok) {
        accountState.lastErrorPL = (result && result.messagePL) || 'Logowanie nie powiodło się.';
        setAccountState('error', { error: accountState.lastErrorPL });
        // The error state is a message, not a dead end: chapter 7.2 says the
        // machine falls back to signedOut so the buttons work again.
        setAccountState('signedOut');
        return { ok: false, code: (result && result.code) || 'UNKNOWN', messagePL: accountState.lastErrorPL };
      }

      accountState.user = result.user;
      accountState.lastErrorPL = '';
      accountPersist();
      setAccountState('signedIn');
      emit('account:signedin', { user: accountState.user });
      toast('Zalogowano do konta demonstracyjnego. Funkcje płatne pozostają bez zmian.', { kind: 'success' });
      announce('Zalogowano do konta demonstracyjnego ' + provider.namePL + '.');
      return { ok: true, user: accountState.user };
    });
  };

  Account.cancelSignIn = function () {
    if (accountState.state !== 'signingIn') return;
    MockAuthBackend.cancel();
  };

  Account.signOut = function () {
    if (!Account.isSignedIn()) {
      return Promise.resolve({ ok: true, messagePL: 'Nie byłeś zalogowany.' });
    }
    return Account.adapter.signOut().then(function () {
      accountState.user = null;
      accountState.lastSyncAt = null;
      accountPersist();
      setAccountState('signedOut');
      emit('account:signedout', {});
      // Purchases are intentionally NOT revoked on sign-out. In the demo they
      // live on the device; signing out of a profile is not a refund.
      toast('Wylogowano. Zakupy demonstracyjne zostają na tym urządzeniu.', { kind: 'info' });
      return { ok: true, messagePL: 'Wylogowano z konta demonstracyjnego.' };
    });
  };

  Account.deleteAccount = function () {
    return Account.adapter.signOut().then(function () {
      accountState.user = null;
      accountState.lastSyncAt = null;
      removeKey(KEY_ACCOUNT);
      removeKey(KEY_CLOUD);
      setAccountState('signedOut');
      emit('account:signedout', {});
      // Measurements, thresholds and profiles belong to the user, not to the
      // demo account, so deleting the account leaves every one of them alone.
      return {
        ok: true,
        messagePL: 'Konto demonstracyjne i jego kopia ustawień zostały usunięte. Pomiary, progi i profile zostały nienaruszone.'
      };
    });
  };

  Account.snapshot = function () {
    // Data is always fetched through the owning module's API. Reading another
    // module's localStorage key directly is forbidden by the architecture and
    // would break the moment that module changed its storage format.
    var snap = { thresholds: null, profiles: null, schedule: null, alerts: null, settings: {} };
    try {
      if (global.Engine && typeof global.Engine.getThresholds === 'function') {
        snap.thresholds = global.Engine.getThresholds();
      }
    } catch (e) { /* a broken module must not break sync */ }
    try {
      if (global.Tools && typeof global.Tools.listProfiles === 'function') {
        snap.profiles = global.Tools.listProfiles();
      }
    } catch (e) { /* ignore */ }
    try {
      if (global.Tools && typeof global.Tools.getSchedule === 'function') {
        snap.schedule = global.Tools.getSchedule();
      }
    } catch (e) { /* ignore */ }
    try {
      if (global.Tools && typeof global.Tools.getAlerts === 'function') {
        snap.alerts = global.Tools.getAlerts();
      }
    } catch (e) { /* ignore */ }
    for (var i = 0; i < SYNCED_SETTINGS.length; i += 1) {
      var value = setting(SYNCED_SETTINGS[i]);
      if (value !== undefined) snap.settings[SYNCED_SETTINGS[i]] = value;
    }
    return snap;
  };

  function applyCloud(data) {
    var appliedPL = [];
    if (!data) return appliedPL;
    var u = ui();
    try {
      if (data.thresholds && global.Engine && typeof global.Engine.setThresholds === 'function') {
        if (global.Engine.setThresholds(data.thresholds)) appliedPL.push('progi metryk');
      }
    } catch (e) { /* ignore */ }
    try {
      if (data.schedule && global.Tools && typeof global.Tools.setSchedule === 'function') {
        if (global.Tools.setSchedule(data.schedule)) appliedPL.push('harmonogram');
      }
    } catch (e) { /* ignore */ }
    try {
      if (data.alerts && global.Tools && typeof global.Tools.setAlerts === 'function') {
        if (global.Tools.setAlerts(data.alerts)) appliedPL.push('alerty ekspozycji');
      }
    } catch (e) { /* ignore */ }
    if (data.settings && u && typeof u.setSetting === 'function') {
      var touched = false;
      for (var i = 0; i < SYNCED_SETTINGS.length; i += 1) {
        var key = SYNCED_SETTINGS[i];
        if (Object.prototype.hasOwnProperty.call(data.settings, key)) {
          try { u.setSetting(key, data.settings[key]); touched = true; } catch (e) { /* ignore */ }
        }
      }
      if (touched) appliedPL.push('ustawienia wyglądu i dostępności');
    }
    return appliedPL;
  }

  Account.sync = function () {
    if (!Account.isSignedIn()) {
      return Promise.resolve({
        ok: false, at: null, appliedPL: [],
        messagePL: 'Synchronizacja wymaga zalogowania do konta demonstracyjnego.'
      });
    }
    if (!accountState.syncEnabled) {
      return Promise.resolve({
        ok: false, at: null, appliedPL: [],
        messagePL: 'Synchronizacja jest wyłączona. Włącz ją przełącznikiem powyżej.'
      });
    }

    return Account.adapter.fetchProfile().then(function (pulled) {
      var appliedPL = [];
      var remote = pulled && pulled.ok && pulled.data ? pulled.data.data : null;
      var remoteOwner = pulled && pulled.ok && pulled.data ? pulled.data.deviceId : null;
      if (remote && remoteOwner && accountState.user && remoteOwner !== accountState.user.id) {
        appliedPL = applyCloud(remote);
      }
      return Account.adapter.pushProfile({
        deviceId: accountState.user ? accountState.user.id : 'demo-device',
        data: Account.snapshot()
      }).then(function (pushed) {
        var at = pushed && pushed.at ? pushed.at : Date.now();
        var ok = !!(pushed && pushed.ok);
        if (ok) {
          accountState.lastSyncAt = at;
          if (accountState.user) accountState.user.lastSyncAt = at;
          accountPersist();
        }
        var messagePL = ok
          ? (appliedPL.length
            ? 'Zsynchronizowano. Zastosowano z konta: ' + appliedPL.join(', ') + '.'
            : 'Zsynchronizowano ustawienia profilu. Pomiary zostają na urządzeniu.')
          : (pushed && pushed.messagePL) || 'Synchronizacja nie powiodła się.';
        emit('account:sync', { ok: ok, at: at, messagePL: messagePL });
        renderAccountPanel();
        return { ok: ok, at: at, messagePL: messagePL, appliedPL: appliedPL };
      });
    });
  };

  /* ---------------- Account screens ---------------- */

  function buildLoginSheet(provider) {
    var sheet = el('sheetLogin');
    if (!sheet) return;
    var body = sheet.querySelector('.ms-sheet__body') || sheet;

    var head = sheet.querySelector('.ms-sheet__head');
    var titleNode = el('loginTitle');
    if (!titleNode && head) {
      var titles = head.querySelector('.ms-sheet__titles') || head;
      titleNode = ensure('loginTitle', 'h2', titles, 'ms-sheet__title');
    }
    setText(titleNode, 'Logowanie (symulacja)');

    clear(body);

    // The strip is not decoration. It is the sentence that stops a user from
    // believing a real Google dialog just opened.
    var strip = demoStrip('DEMO — symulacja logowania. Nie łączymy się z serwerami Google ani Facebooka.');
    strip.id = 'loginDemoBadge';
    body.appendChild(strip);

    var frame = mk('div', 'ms-demo-frame');

    var providerName = mk('p', 'ms-t-h3');
    providerName.id = 'loginProviderName';
    providerName.textContent = 'Dostawca: ' + provider.namePL + ' (DEMO)';
    frame.appendChild(providerName);

    var spinnerRow = mk('div', 'ms-row');
    var spinner = mk('span', 'ms-spinner');
    spinner.id = 'loginSpinner';
    spinner.setAttribute('role', 'progressbar');
    spinner.setAttribute('aria-label', 'Trwa symulacja logowania');
    spinnerRow.appendChild(spinner);
    spinnerRow.appendChild(mk('span', 'ms-t-body', 'Trwa symulacja logowania…'));
    frame.appendChild(spinnerRow);

    var noteNode = mk('p', 'ms-demo-note');
    noteNode.id = 'loginNote';
    noteNode.textContent = 'To symulacja. Nie łączymy się z serwerami Google ani Facebooka i nie prosimy o hasło. ' +
      'Przycisk tworzy lokalne konto demonstracyjne zapisane wyłącznie na tym urządzeniu. ' +
      'Zalogowanie nie odblokowuje funkcji płatnych.';
    frame.appendChild(noteNode);

    var errorNode = mk('p', 'ms-note ms-note--critical');
    errorNode.id = 'loginError';
    errorNode.setAttribute('role', 'alert');
    errorNode.hidden = true;
    frame.appendChild(errorNode);

    body.appendChild(frame);

    var foot = sheet.querySelector('.ms-sheet__foot');
    if (!foot) {
      foot = mk('div', 'ms-sheet__foot');
      sheet.appendChild(foot);
    }
    clear(foot);
    foot.appendChild(button('loginCancel', 'ms-btn ms-btn--outline ms-btn--block', 'Anuluj logowanie', function () {
      Account.cancelSignIn();
    }));
  }

  function openLoginSheet(provider) {
    buildLoginSheet(provider);
    var u = ui();
    if (u && typeof u.openSheet === 'function') {
      /* Closing the window IS cancelling. Without this the 1400 ms simulation
         ran to completion behind a dismissed sheet and signed the user in
         after they had explicitly walked away from it. */
      once('ui:sheetclose', function (d) {
        if (d && d.sheetId === 'sheetLogin' && accountState.state === 'signingIn') {
          Account.cancelSignIn();
        }
      });
      u.openSheet('sheetLogin', { focusId: 'loginCancel', dismissible: true });
    }
  }

  function closeLoginSheet() {
    var u = ui();
    if (u && typeof u.closeSheet === 'function') u.closeSheet('sheetLogin', null);
  }

  function providerButton(provider) {
    var id = provider.id === 'google' ? 'btnSignInGoogle' : 'btnSignInFacebook';
    var b = mk('button', 'ms-provider');
    b.type = 'button';
    b.id = id;
    b.appendChild(icon(provider.iconName));
    var label = mk('span', 'ms-provider__label', provider.labelPL);
    b.appendChild(label);
    var tag = mk('span', 'ms-provider__tag');
    tag.appendChild(demoBadge('DEMO'));
    b.appendChild(tag);
    b.addEventListener('click', function () { Account.signIn(provider.id); });
    return b;
  }

  function renderAccountPanel() {
    var panel = el('panelAccount');
    if (!panel) return;
    var host = panel.querySelector('.ms-main__inner') || panel;

    var strip = el('accountDemoBadge');
    if (!strip) {
      strip = demoStrip('DEMO — konto symulowane. Żadne dane nie opuszczają tego urządzenia.');
      strip.id = 'accountDemoBadge';
      host.insertBefore(strip, host.firstChild);
    }

    var status = ensure('accountStatus', 'p', host, 'ms-t-body ms-t-muted');
    var errorBox = ensure('accountError', 'p', host, 'ms-note ms-note--critical');
    if (errorBox) errorBox.setAttribute('role', 'alert');
    var signedOut = ensure('accountSignedOutBox', 'section', host, 'ms-section');
    var signedIn = ensure('accountSignedInBox', 'section', host, 'ms-section');

    /* Roughly 450px of nothing sat under the last card — in the signed-OUT
       state, which is the one a new reader sees. A footer is the honest
       filler: it says what this build is, and repeats the one sentence the
       account screen exists to keep in front of the reader. Ensured for both
       states, not just for a signed-in one. */
    var foot = ensure('accountFooter', 'p', host, 'ms-t-cap ms-t-muted ms-t-center');
    if (foot) {
      clear(foot);
      foot.appendChild(doc.createTextNode(
        'Monitor Światła — wersja demonstracyjna interfejsu. Logowanie, subskrypcje ' +
        'i reklamy są symulowane w całości na tym urządzeniu; aplikacja nie łączy się z żadnym serwerem.'));
    }

    if (accountState.lastErrorPL) {
      setText(errorBox, accountState.lastErrorPL);
      show(errorBox, true);
    } else {
      show(errorBox, false);
    }

    if (Account.isSignedIn()) {
      setText(status, 'Zalogowano do konta demonstracyjnego.');
      show(signedOut, false);
      show(signedIn, true);
      renderSignedIn(signedIn);
    } else {
      setText(status, accountState.state === 'signingIn'
        ? 'Trwa symulacja logowania…'
        : 'Nie jesteś zalogowany. Aplikacja działa w pełni bez konta.');
      show(signedOut, true);
      show(signedIn, false);
      renderSignedOut(signedOut);
    }

    // renderSignedIn appends its cards straight onto `host`, so the footer is
    // pushed back to the end after they exist.
    if (foot) host.appendChild(foot);
  }

  function renderSignedOut(host) {
    clear(host);

    var card = mk('div', 'ms-card');
    var head = mk('div', 'ms-card__head');
    head.appendChild(mk('h2', 'ms-card__title', 'Konto (demonstracyjne)'));
    card.appendChild(head);

    var body = mk('div', 'ms-card__body');
    body.appendChild(mk('p', 'ms-t-body',
      'Aplikacja mierzy światło bez konta. Konto służy wyłącznie do synchronizacji ustawień między urządzeniami ' +
      'i do przypisania zakupów.'));

    var stack = mk('div', 'ms-stack');
    for (var i = 0; i < Account.PROVIDERS.length; i += 1) {
      stack.appendChild(providerButton(Account.PROVIDERS[i]));
    }
    body.appendChild(stack);

    var loginNote = mk('p', 'ms-demo-note');
    loginNote.id = 'accountLoginNote';
    loginNote.textContent = 'Ta aplikacja nie ma integracji z Google ani z Facebookiem. Przyciski tworzą lokalne ' +
      'konto demonstracyjne zapisane wyłącznie na tym urządzeniu. Zalogowanie nie odblokowuje funkcji płatnych — ' +
      'służy do synchronizacji profilu i do przypisania zakupów do konta.';
    body.appendChild(loginNote);

    card.appendChild(body);
    host.appendChild(card);
    host.appendChild(note('info', 'Co jest synchronizowane: ',
      'progi, profile progów, harmonogram, alerty i ustawienia wyglądu. Pomiary zostają na urządzeniu — ' +
      'to duże dane i nie wysyłamy ich nigdzie.'));
  }

  function renderSignedIn(host) {
    clear(host);
    var user = accountState.user;

    var card = mk('div', 'ms-card');
    var row = mk('div', 'ms-account');

    var avatar = mk('span', 'ms-avatar' + (Store.tier() === 'premium' ? ' ms-avatar--premium' : '') + ' ms-avatar--lg');
    avatar.id = 'accountAvatar';
    avatar.textContent = user.initials;
    avatar.setAttribute('aria-hidden', 'true');
    // Colour comes from the profile, drawn locally. No image, no request.
    avatar.style.backgroundColor = user.avatarColor;
    avatar.style.color = '#ffffff';
    row.appendChild(avatar);

    var textBox = mk('div', 'ms-account__text');
    var nameRow = mk('div', 'ms-row');
    var nameNode = mk('span', 'ms-account__name', user.displayName);
    nameNode.id = 'accountName';
    nameRow.appendChild(nameNode);
    if (Store.tier() === 'premium') nameRow.appendChild(mk('span', 'ms-pro-badge', 'PRO'));
    nameRow.appendChild(demoBadge('DEMO'));
    textBox.appendChild(nameRow);

    var emailNode = mk('span', 'ms-account__meta', user.email);
    emailNode.id = 'accountEmail';
    textBox.appendChild(emailNode);

    var providerNode = mk('span', 'ms-account__meta',
      'Dostawca: ' + (user.provider === 'google' ? 'Google (DEMO)' : 'Facebook (DEMO)'));
    providerNode.id = 'accountProvider';
    textBox.appendChild(providerNode);

    row.appendChild(textBox);
    card.appendChild(row);
    host.appendChild(card);

    // --- sync ---
    var syncCard = mk('div', 'ms-card');
    var syncHead = mk('div', 'ms-card__head');
    syncHead.appendChild(mk('h2', 'ms-card__title', 'Synchronizacja profilu'));
    syncCard.appendChild(syncHead);

    var syncBody = mk('div', 'ms-card__body');
    var label = mk('label', 'ms-switch');
    var input = mk('input', 'ms-switch__input');
    input.type = 'checkbox';
    input.id = 'syncToggle';
    input.checked = accountState.syncEnabled;
    input.addEventListener('change', function () { Account.setSyncEnabled(input.checked); });
    var track = mk('span', 'ms-switch__track');
    track.appendChild(mk('span', 'ms-switch__thumb'));
    var textWrap = mk('span', 'ms-switch__text');
    textWrap.appendChild(mk('span', 'ms-switch__label', 'Synchronizuj ustawienia (symulacja)'));
    textWrap.appendChild(mk('span', 'ms-switch__sub',
      'Progi, profile, harmonogram, alerty i wygląd. Bez pomiarów.'));
    // Required DOM order for the CSS sibling selector: input, track, text.
    label.appendChild(input);
    label.appendChild(track);
    label.appendChild(textWrap);
    syncBody.appendChild(label);

    var syncStatus = mk('p', 'ms-t-cap ms-t-muted',
      accountState.lastSyncAt
        ? 'Ostatnia synchronizacja: ' + fmtDateTime(accountState.lastSyncAt)
        : 'Jeszcze nie synchronizowano na tym urządzeniu.');
    syncStatus.id = 'syncStatus';
    syncBody.appendChild(syncStatus);

    var actions = mk('div', 'ms-card__actions');
    actions.appendChild(button('btnSyncNow', 'ms-btn ms-btn--tonal', 'Synchronizuj teraz', function () {
      var b = el('btnSyncNow');
      var u = ui();
      if (u && typeof u.setBusy === 'function') u.setBusy(b, true);
      Account.sync().then(function (res) {
        if (u && typeof u.setBusy === 'function') u.setBusy(el('btnSyncNow'), false);
        toast(res.messagePL, { kind: res.ok ? 'success' : 'error' });
      });
    }));
    syncBody.appendChild(actions);
    syncCard.appendChild(syncBody);
    host.appendChild(syncCard);

    // --- subscription ---
    var subBox = mk('div', 'ms-card');
    subBox.id = 'accountSubscriptionBox';
    var subHead = mk('div', 'ms-card__head');
    subHead.appendChild(mk('h2', 'ms-card__title', 'Subskrypcja'));
    subBox.appendChild(subHead);
    var subBody = mk('div', 'ms-card__body');
    var sub = Store.subscription();
    if (sub) {
      var kv = mk('div', 'ms-kv');
      kv.appendChild(kvRow('Plan', sub.namePL));
      kv.appendChild(kvRow('Cena', sub.priceText));
      if (sub.trialEndsAt) kv.appendChild(kvRow('Koniec okresu próbnego', fmtDate(sub.trialEndsAt)));
      kv.appendChild(kvRow(sub.cancelled ? 'Działa do' : 'Odnowienie', fmtDate(sub.cancelled ? sub.activeUntil : sub.renewsAt)));
      subBody.appendChild(kv);
      // The renewal template was printed unconditionally, so a user who had
      // just cancelled — and watched the cancel button disappear — was still
      // told the subscription renews until cancelled.
      subBody.appendChild(mk('p', 'ms-t-cap ms-t-muted', sub.cancelled
        ? ('Subskrypcja nie odnowi się. Dostęp działa do ' + fmtDate(sub.activeUntil) + '.')
        : Store.renewalTextPL(Store.product(sub.productId))));
      if (!sub.cancelled) {
        var subActions = mk('div', 'ms-card__actions');
        subActions.appendChild(button('btnCancelSubscription', 'ms-btn ms-btn--outline', 'Zrezygnuj z subskrypcji', function () {
          Store.cancelSubscription().then(function (res) {
            toast(res.messagePL, { kind: 'info' });
            renderAccountPanel();
            renderPremiumPanel();
          });
        }));
        subBody.appendChild(subActions);
      }
    } else {
      subBody.appendChild(mk('p', 'ms-t-body ms-t-muted',
        'Brak aktywnej subskrypcji demonstracyjnej. Zakupy znajdziesz na ekranie Premium.'));
    }
    subBody.appendChild(demoStrip('DEMO — żadna opłata nie została i nie zostanie pobrana.'));
    subBox.appendChild(subBody);
    host.appendChild(subBox);

    // --- destructive actions, last in DOM order ---
    var list = mk('div', 'ms-list');
    var signOutRow = listButtonRow('btnSignOut', 'person', 'Wyloguj się',
      'Zakupy demonstracyjne zostają na urządzeniu.', function () {
        Account.signOut().then(function (res) { toast(res.messagePL, { kind: 'info' }); });
      });
    list.appendChild(signOutRow);

    var deleteRow = listButtonRow('btnDeleteAccount', 'trash', 'Usuń konto demonstracyjne',
      'Usuwa profil i jego kopię ustawień. Pomiary, progi i profile zostają.', function () {
        confirmThen({
          titlePL: 'Usunąć konto demonstracyjne?',
          bodyPL: 'Usuniemy profil demonstracyjny i jego kopię ustawień. Twoje pomiary, progi i profile progów zostaną nienaruszone.',
          confirmPL: 'Usuń konto',
          cancelPL: 'Zostaw',
          danger: true,
          demo: true
        }, function () {
          Account.deleteAccount().then(function (res) { toast(res.messagePL, { kind: 'info' }); });
        });
      });
    deleteRow.classList.add('ms-list__item--danger');
    list.appendChild(deleteRow);
    host.appendChild(list);

  }

  function kvRow(keyPL, valuePL) {
    var row = mk('div', 'ms-kv__row');
    row.appendChild(mk('span', 'ms-kv__key', keyPL));
    row.appendChild(mk('span', 'ms-kv__val', valuePL));
    return row;
  }

  function listButtonRow(id, iconName, titlePL, subPL, onClick) {
    var row = mk('button', 'ms-list__item ms-list__item--button');
    row.type = 'button';
    row.id = id;
    var iconBox = mk('span', 'ms-list__icon');
    iconBox.appendChild(icon(iconName));
    row.appendChild(iconBox);
    var text = mk('span', 'ms-list__text');
    text.appendChild(mk('span', 'ms-list__title', titlePL));
    if (subPL) text.appendChild(mk('span', 'ms-list__sub', subPL));
    row.appendChild(text);
    var end = mk('span', 'ms-list__end');
    end.appendChild(icon('chevron'));
    row.appendChild(end);
    if (onClick) row.addEventListener('click', onClick);
    return row;
  }

  function confirmThen(opts, onYes) {
    var u = ui();
    if (u && typeof u.confirm === 'function') {
      u.confirm(opts).then(function (yes) { if (yes) onYes(); });
      return;
    }
    onYes();
  }

  /* ==================================================================
     ==================================================================
     2. SKLEP — window.Store
     ==================================================================
     ================================================================== */

  /* ------------------------------------------------------------------
     FICTIONAL LAYER — MockBillingBackend
     ------------------------------------------------------------------
     Prices, receipts, the promo code and the 1200 ms of "processing" are all
     invented here. Nothing above this object knows that no money moves.

     REPLACING THIS WITH REAL BILLING
     --------------------------------
     On Android inside a Trusted Web Activity, the real counterpart is the
     Digital Goods API plus Google Play Billing:

        var service = await window.getDigitalGoodsService(
            'https://play.google.com/billing');
        var details = await service.getDetails(['premium_monthly', ...]);
        // details[i].price is a {currency, value} pair FROM PLAY — from that
        // moment Play is the source of truth for the amount, and PRICES below
        // must be deleted rather than kept "for reference". Two price sources
        // is exactly the bug this file was written to prevent.
        var request = new PaymentRequest(
            [{supportedMethods: 'https://play.google.com/billing',
              data: {sku: productId}}],
            {total: {label: 'Total', amount: details[0].price}});
        var response = await request.show();
        var token = response.details.token;   // verify SERVER-SIDE
        await response.complete('success');
        await service.acknowledge(token, 'onetime' | 'repeatable');

     For the web, the counterpart is a payment provider's SDK plus a backend
     that owns entitlements; `adapter.list/purchase/restore/cancel` keep their
     signatures and every screen in this file stays untouched.

     Whatever the backend, `adapter.purchase` must resolve with
     `{ok:true, receipt:{productId, purchasedAt, token, plan, trialEndsAt}}`,
     `{ok:false, cancelled:true}` or `{ok:false, code, messagePL}`. It must
     never reject.
     ------------------------------------------------------------------ */

  var MockBillingBackend = (function () {
    var PURCHASE_MS = 1200;   // architecture, chapter 6.2 step 3

    // THE ONLY AMOUNTS IN THE APPLICATION. In grosze, so no float ever touches
    // money. Everything a user reads — card, terms, button, receipt, account
    // screen — is derived from these four integers.
    var PRICES = {
      premium_monthly: 1999,
      premium_yearly: 7999,
      premium_lifetime: 14999,
      noads_lifetime: 1299
    };

    var TRIAL_DAYS = 7;

    // One demo promo code, so the promo field on the Premium screen is not a
    // dead control. It grants a 7-day full-premium trial and nothing else.
    var PROMO = {
      'DEMO7': {
        featureAll: true,
        ms: 7 * DAY_MS,
        messagePL: 'Kod DEMO7 przyjęty: pełne Premium (DEMO) na 7 dni. Żadna opłata nie została pobrana.'
      }
    };

    return {
      PRICES: PRICES,
      TRIAL_DAYS: TRIAL_DAYS,
      PROMO: PROMO,

      list: function () {
        return new Promise(function (resolve) {
          delay(120, function () { resolve({ ok: true, products: Store.CATALOGUE }); });
        });
      },

      purchase: function (productId, opts) {
        return new Promise(function (resolve) {
          delay(PURCHASE_MS, function () {
            if (failuresSimulated()) {
              resolve({
                ok: false,
                code: 'BILLING_UNAVAILABLE',
                messagePL: 'Symulowany błąd płatności (włączony przełącznik „Symuluj błędy”). Nic nie zostało kupione.'
              });
              return;
            }
            var product = Store.product(productId);
            if (!product) {
              resolve({ ok: false, code: 'ITEM_UNAVAILABLE', messagePL: 'Nie znaleziono takiego produktu.' });
              return;
            }
            var now = Date.now();
            var withTrial = !!(opts && opts.withTrial) && product.trialDays > 0;
            resolve({
              ok: true,
              receipt: {
                productId: productId,
                purchasedAt: now,
                token: 'demo-' + productId + '-' + now,
                plan: product.plan,
                trialEndsAt: withTrial ? now + product.trialDays * DAY_MS : null
              }
            });
          });
        });
      },

      restore: function () {
        return new Promise(function (resolve) {
          delay(700, function () {
            // In the simulation "the account" is the receipt list already on
            // this device; restoring is honest about finding nothing new.
            resolve({ ok: true, receipts: billingState.receipts.slice() });
          });
        });
      },

      cancel: function (productId) {
        return new Promise(function (resolve) {
          delay(500, function () { resolve({ ok: true, productId: productId }); });
        });
      },

      redeem: function (code) {
        return new Promise(function (resolve) {
          delay(500, function () {
            var key = String(code || '').trim().toUpperCase();
            var found = PROMO[key];
            resolve(found
              ? { ok: true, code: key, grant: found }
              : { ok: false, messagePL: 'Nie znamy takiego kodu. W wersji demonstracyjnej działa kod DEMO7.' });
          });
        });
      }
    };
  }());

  /* ---------------- END OF FICTIONAL LAYER (Store) ---------------- */

  var Store = {};

  Store.DEMO = true;

  /* ---- price and copy formatting: the single source, chapter 6.1 ---- */

  Store.formatPrice = function (minor) {
    if (typeof minor !== 'number' || !isFinite(minor)) return '—';
    // Polish decimal comma, Polish currency suffix, no floating point maths.
    var whole = Math.floor(Math.abs(minor) / 100);
    var cents = Math.abs(minor) % 100;
    return whole + ',' + (cents < 10 ? '0' + cents : cents) + ' zł';
  };

  function priceOf(productId) {
    return MockBillingBackend.PRICES[productId];
  }

  function perMonthOf(productId) {
    // Yearly plans quote a per-month figure; it is rounded to grosze and always
    // presented as "about", because it is not a price anyone is ever charged.
    return Math.round(priceOf(productId) / 12);
  }

  function trialEndDate(days) {
    return fmtDate(Date.now() + days * DAY_MS);
  }

  // Template strings hold {CENA}, {CENA_MIES} and {DATA_KONCA_PROBY} instead of
  // digits. There is no path by which a card and its terms can disagree.
  var TERMS_TEMPLATES = {
    premium_monthly: {
      terms: '{CENA} miesięcznie. Subskrypcja odnawia się automatycznie co miesiąc za {CENA}, aż do rezygnacji. ' +
        'Możesz zrezygnować w każdej chwili na ekranie Konto → Subskrypcja. Pomiar, cztery darmowe metryki, ' +
        'wykres i tabela pozostają bezpłatne. To wersja demonstracyjna — żadna opłata nie zostanie pobrana.',
      trial: null,
      cta: 'Kupuję — {CENA} / miesiąc',
      ctaTrial: null,
      renew: 'Odnawia się co miesiąc za {CENA}, aż do rezygnacji. Rezygnacja: Konto → Subskrypcja.'
    },
    premium_yearly: {
      terms: '{CENA} rocznie (około {CENA_MIES} miesięcznie, pobierane jednorazowo raz w roku). ' +
        'Subskrypcja odnawia się automatycznie co rok za {CENA}, aż do rezygnacji. Możesz zrezygnować ' +
        'w każdej chwili na ekranie Konto → Subskrypcja. To wersja demonstracyjna — żadna opłata nie zostanie pobrana.',
      trial: '7 dni bezpłatnie, potem {CENA} rocznie. Okres próbny kończy się {DATA_KONCA_PROBY}. ' +
        'Jeżeli nie zrezygnujesz najpóźniej dzień wcześniej, subskrypcja odnowi się automatycznie za {CENA} ' +
        'i będzie odnawiać się co rok. Rezygnacja: Konto → Subskrypcja. To wersja demonstracyjna — ' +
        'żadna opłata nie zostanie pobrana.',
      cta: 'Kupuję — {CENA} / rok',
      ctaTrial: 'Zaczynam 7 dni bezpłatnie, potem {CENA} / rok',
      renew: 'Odnawia się co rok za {CENA}, aż do rezygnacji. Rezygnacja: Konto → Subskrypcja.'
    },
    premium_lifetime: {
      terms: '{CENA}, płatność jednorazowa. To nie jest subskrypcja — nic się nie odnawia i nie pobierzemy ' +
        'kolejnej opłaty. To wersja demonstracyjna — żadna opłata nie zostanie pobrana.',
      trial: null,
      cta: 'Kupuję — {CENA} jednorazowo',
      ctaTrial: null,
      renew: 'Płatność jednorazowa. Nic się nie odnawia i nic nie trzeba anulować.'
    },
    noads_lifetime: {
      terms: '{CENA}, płatność jednorazowa. Kupujesz wyłącznie usunięcie reklam. Metryki Premium, historia 30 dni, ' +
        'raporty, eksport i narzędzia pozostają częścią wersji Premium. To wersja demonstracyjna — ' +
        'żadna opłata nie zostanie pobrana.',
      trial: null,
      cta: 'Kupuję — {CENA} jednorazowo',
      ctaTrial: null,
      renew: 'Płatność jednorazowa. Nic się nie odnawia i nic nie trzeba anulować.'
    }
  };

  function fillTemplate(template, productId) {
    if (!template) return null;
    return template
      .replace(/\{CENA_MIES\}/g, Store.formatPrice(perMonthOf(productId)))
      .replace(/\{CENA\}/g, Store.formatPrice(priceOf(productId)))
      .replace(/\{DATA_KONCA_PROBY\}/g, trialEndDate(MockBillingBackend.TRIAL_DAYS));
  }

  /* ---- features, chapter 8.2 ---- */

  var ALL_PREMIUM_FEATURES = [
    'metric.flicker', 'metric.uniformity', 'metric.comfort',
    'history.long', 'reports', 'export.csv', 'compare.ab',
    'calibration', 'schedule', 'alerts', 'profiles', 'screencheck', 'noAds'
  ];

  Store.FEATURES = [
    {
      id: 'metric.flicker', namePL: metricName('flicker'), iconName: 'timer',
      descPL: 'Procent migotania i — gdy pomiar jest wiarygodny — jego częstotliwość.',
      freePL: 'Kafelek z nazwą, opisem i kłódką. Bez zmyślonej wartości.'
    },
    {
      id: 'metric.uniformity', namePL: metricName('uniformity'), iconName: 'grid',
      descPL: 'Rozkład światła w siatce 3×3 i mapa komórek pod kafelkiem.',
      freePL: 'Kafelek z nazwą, opisem i kłódką.'
    },
    {
      id: 'metric.comfort', namePL: metricName('comfort'), iconName: 'eye',
      descPL: 'Wynik 0–100 z rozbiciem na to, co go obniża.',
      freePL: 'Kafelek z nazwą, opisem i kłódką.'
    },
    {
      id: 'history.long', namePL: 'Historia 30 dni', iconName: 'history',
      descPL: 'Zakresy wykresu 24 h, 7 dni i 30 dni oraz pełna tabela odczytów.',
      freePL: 'Zakresy 1 min i 1 h; dłuższe oznaczone kłódką.'
    },
    {
      id: 'reports', namePL: 'Raporty dzienne i tygodniowe', iconName: 'doc',
      descPL: 'Średnie, minima, maksima, rozkład stref w godzinach, najgorsza pora dnia i trzy konkretne zalecenia.',
      freePL: 'Raport przykładowy na danych syntetycznych, wyraźnie oznaczony.'
    },
    {
      id: 'export.csv', namePL: 'Eksport CSV', iconName: 'download',
      descPL: 'Plik zgodny z polskim Excelem: średnik jako separator, przecinek dziesiętny.',
      freePL: 'Opis formatu i podgląd pięciu wierszy nagłówka.'
    },
    {
      id: 'compare.ab', namePL: 'Porównywarka A/B', iconName: 'share',
      descPL: 'Zapamiętuje dwa źródła światła i mówi, które jest łagodniejsze — podając, którą metryką.',
      freePL: 'Opis działania; slot A można zapisać, slot B nie.'
    },
    {
      id: 'calibration', namePL: 'Kalibracja białą kartką', iconName: 'refresh',
      descPL: 'Trzy sekundy pomiaru białej kartki usuwają stały odchył kanałów czujnika i realnie poprawiają temperaturę barwową oraz wpływ melanopiczny.',
      freePL: 'Wyjaśnienie, dlaczego to podnosi dokładność. Pomiar działa bez kalibracji.'
    },
    {
      id: 'schedule', namePL: 'Harmonogram progów', iconName: 'timer',
      descPL: 'Reguły „od–do” automatycznie podmieniające profil progów, np. 22:00–06:00 na „Wieczór – łagodny”.',
      freePL: 'Ręczne przełączanie wbudowanych profili; automat wyłączony.'
    },
    {
      id: 'alerts', namePL: 'Alerty ekspozycji', iconName: 'bell',
      descPL: 'Sygnał, gdy metryka trzyma strefę krytyczną dłużej niż ustawisz. Nigdy nie zatrzymuje pomiaru.',
      freePL: 'Sam kolor strefy na kafelku.'
    },
    {
      id: 'profiles', namePL: 'Własne profile progów', iconName: 'tune',
      descPL: 'Zapis własnych zestawów progów pod nazwą i szybkie przełączanie.',
      freePL: 'Trzy profile wbudowane do zastosowania; zapis własnych zablokowany.'
    },
    {
      id: 'screencheck', namePL: 'Sprawdź mój monitor', iconName: 'monitor',
      descPL: 'Kreator pięciu kroków: biel przy pełnej i minimalnej jasności, cztery rogi, tryb nocny włączony i wyłączony.',
      freePL: 'Podgląd listy kroków i wykonanie wyłącznie kroku pierwszego.'
    },
    {
      id: 'noAds', namePL: 'Brak reklam', iconName: 'close',
      descPL: 'Usuwa wszystkie banery i całą sekcję reklamową.',
      freePL: 'Trzy statyczne banery: Historia, Narzędzia, Więcej.'
    }
  ];

  Store.feature = function (featureId) {
    for (var i = 0; i < Store.FEATURES.length; i += 1) {
      if (Store.FEATURES[i].id === featureId) return Store.FEATURES[i];
    }
    return null;
  };

  /* ---- product catalogue, built from the one price table ---- */

  function makeProduct(spec) {
    var t = TERMS_TEMPLATES[spec.id];
    return {
      id: spec.id,
      namePL: spec.namePL,
      subPL: spec.subPL,
      plan: spec.plan,
      priceMinor: priceOf(spec.id),
      priceText: Store.formatPrice(priceOf(spec.id)),
      currency: 'PLN',
      periodPL: spec.periodPL,
      perMonthPL: spec.plan === 'year' ? 'około ' + Store.formatPrice(perMonthOf(spec.id)) + ' miesięcznie' : null,
      trialDays: spec.trialDays || 0,
      badgePL: spec.badgePL || null,
      features: spec.features,
      termsPL: fillTemplate(t.terms, spec.id),
      termsTrialPL: fillTemplate(t.trial, spec.id),
      ctaPL: fillTemplate(t.cta, spec.id),
      ctaTrialPL: fillTemplate(t.ctaTrial, spec.id),
      recommended: !!spec.recommended
    };
  }

  Store.CATALOGUE = [
    makeProduct({
      id: 'premium_monthly', namePL: 'Premium — miesięcznie',
      subPL: 'Wszystkie funkcje płatne, rozliczane co miesiąc.',
      plan: 'month', periodPL: 'co miesiąc', trialDays: 0,
      features: ALL_PREMIUM_FEATURES
    }),
    makeProduct({
      id: 'premium_yearly', namePL: 'Premium — rocznie',
      subPL: 'Wszystkie funkcje płatne, 7 dni bezpłatnie na start.',
      plan: 'year', periodPL: 'co rok', trialDays: 7,
      // Was "Najczęściej wybierane" — a popularity claim in an application
      // with no telemetry to support it, and deliberately none. This one the
      // reader can check against the other price on the same screen.
      badgePL: 'Najniższa cena miesięczna', recommended: true,
      features: ALL_PREMIUM_FEATURES
    }),
    makeProduct({
      id: 'premium_lifetime', namePL: 'Premium — na zawsze',
      subPL: 'Jedna płatność, bez odnawiania.',
      plan: 'lifetime', periodPL: 'jednorazowo', trialDays: 0,
      badgePL: 'Bez odnawiania',
      features: ALL_PREMIUM_FEATURES
    }),
    makeProduct({
      id: 'noads_lifetime', namePL: 'Usunięcie reklam',
      subPL: 'Tylko banery znikają — metryki Premium zostają płatne.',
      plan: 'lifetime', periodPL: 'jednorazowo', trialDays: 0,
      features: ['noAds']
    })
  ];

  Store.product = function (productId) {
    for (var i = 0; i < Store.CATALOGUE.length; i += 1) {
      if (Store.CATALOGUE[i].id === productId) return Store.CATALOGUE[i];
    }
    return null;
  };

  Store.getProducts = function () { return Store.CATALOGUE.slice(); };

  Store.formatTerms = function (productId, opts) {
    var p = typeof productId === 'string' ? Store.product(productId) : productId;
    if (!p) return '';
    var withTrial = !!(opts && opts.withTrial) && p.trialDays > 0 && p.termsTrialPL;
    // The trial variant is regenerated on read so the date is always today's
    // date plus seven days, never a date frozen at page load.
    if (withTrial) return fillTemplate(TERMS_TEMPLATES[p.id].trial, p.id);
    return p.termsPL;
  };

  Store.formatCta = function (productId, opts) {
    var p = typeof productId === 'string' ? Store.product(productId) : productId;
    if (!p) return 'Kup';
    var withTrial = !!(opts && opts.withTrial) && p.trialDays > 0 && p.ctaTrialPL;
    return withTrial ? p.ctaTrialPL : p.ctaPL;
  };

  Store.renewalTextPL = function (product) {
    var p = typeof product === 'string' ? Store.product(product) : product;
    if (!p) return '';
    return fillTemplate(TERMS_TEMPLATES[p.id].renew, p.id);
  };

  /* ---- entitlement state ---- */

  var billingState = {
    version: 1,
    receipts: [],          // {productId, purchasedAt, token, plan, trialEndsAt, cancelled, cancelledAt}
    temporary: {},         // {featureId: expiresAt} — rewarded ads and promo codes
    promoCode: null
  };

  var entitlementMap = {};   // {featureId: {granted, source, expiresAt}}

  function billingPersist() {
    writeJson(KEY_BILLING, billingState);
  }

  function billingLoad() {
    var stored = readJson(KEY_BILLING, null);
    if (!stored) return;
    billingState.receipts = Array.isArray(stored.receipts) ? stored.receipts : [];
    billingState.temporary = stored.temporary && typeof stored.temporary === 'object' ? stored.temporary : {};
    billingState.promoCode = stored.promoCode || null;
  }

  /* Calendar arithmetic, not 31 flat days: a monthly plan bought on 31 January
     used to renew on 3 March, and over a year the date drifted about a week
     later than the one shown to the user. Date handles short months and leap
     years itself. */
  function advancePeriod(fromMs, plan) {
    var d = new Date(fromMs);
    var day = d.getDate();
    if (plan === 'year') {
      d.setFullYear(d.getFullYear() + 1);
      // 29 February in a leap year has no counterpart in the next one.
      if (d.getDate() !== day) d.setDate(0);
      return d.getTime();
    }
    /* setMonth OVERFLOWS rather than clamping: 31 January plus one month is
       "31 February", which JavaScript rolls forward into March. A billing
       period does the opposite — it lands on the last day of the shorter
       month. setDate(0) steps back to it. */
    d.setMonth(d.getMonth() + 1);
    if (d.getDate() !== day) d.setDate(0);
    return d.getTime();
  }

  // End of the period the receipt is currently paid for. A live subscription
  // rolls forward from "now"; a cancelled one stops rolling at the moment it
  // was cancelled, which is exactly what "działa do" means on the account
  // screen — cancelling is not a refund of the period already paid for.
  function receiptActiveUntil(receipt) {
    if (receipt.plan === 'lifetime') return null;
    var anchor = receipt.trialEndsAt ? receipt.trialEndsAt : receipt.purchasedAt;
    var reference = receipt.cancelled && receipt.cancelledAt ? receipt.cancelledAt : Date.now();
    if (reference < anchor) return anchor;      // still inside the free trial
    var end = anchor;
    var guard = 0;
    // The guard is not decoration: advancePeriod must always move forward, but
    // a clock set backwards should not spin this loop.
    while (end <= reference && guard < 1200) { end = advancePeriod(end, receipt.plan); guard += 1; }
    return end;
  }

  function receiptActive(receipt, now) {
    if (!receipt) return false;
    if (receipt.plan === 'lifetime') return true;
    // The simulation renews silently, exactly like a real subscription would.
    if (!receipt.cancelled) return true;
    var until = receiptActiveUntil(receipt);
    return until === null || now < until;
  }

  // The one place that turns receipts into permissions. Nowhere else in the
  // application may ask "did they buy the yearly plan" — the question is
  // always Store.has('export.csv').
  function recompute(silent) {
    var now = Date.now();
    var next = {};
    var i, j;

    for (i = 0; i < billingState.receipts.length; i += 1) {
      var receipt = billingState.receipts[i];
      var product = Store.product(receipt.productId);
      if (!product || !receiptActive(receipt, now)) continue;
      for (j = 0; j < product.features.length; j += 1) {
        next[product.features[j]] = {
          granted: true,
          source: receipt.trialEndsAt && now < receipt.trialEndsAt ? 'trial' : 'purchase',
          expiresAt: receipt.plan === 'lifetime' ? null : receiptActiveUntil(receipt)
        };
      }
    }

    var temporaryChanged = false;
    for (var featureId in billingState.temporary) {
      if (!Object.prototype.hasOwnProperty.call(billingState.temporary, featureId)) continue;
      var expiresAt = billingState.temporary[featureId];
      if (typeof expiresAt !== 'number' || expiresAt <= now) {
        delete billingState.temporary[featureId];
        temporaryChanged = true;
        continue;
      }
      if (!next[featureId]) {
        next[featureId] = { granted: true, source: 'reward', expiresAt: expiresAt };
      }
    }
    if (temporaryChanged) billingPersist();

    // Integration note: recompute() also runs on a one-minute timer, to expire a
    // rewarded unlock on the clock. Announcing "entitlements changed" every
    // minute made three modules rebuild their screens for nothing — and wiped
    // whatever the user was typing into the profile-name field. The event now
    // fires only when the answer actually differs.
    var changed = false;
    for (var k = 0; k < ALL_PREMIUM_FEATURES.length; k += 1) {
      var id = ALL_PREMIUM_FEATURES[k];
      if (!!entitlementMap[id] !== !!next[id]) { changed = true; break; }
    }
    entitlementMap = next;
    if (!silent && changed) {
      emit('store:entitlements', { entitlements: Store.entitlements(), tier: Store.tier() });
    }
  }

  Store.entitlements = function () {
    var out = {};
    for (var i = 0; i < ALL_PREMIUM_FEATURES.length; i += 1) {
      out[ALL_PREMIUM_FEATURES[i]] = !!entitlementMap[ALL_PREMIUM_FEATURES[i]];
    }
    return out;
  };

  Store.entitlement = function (featureId) {
    var e = entitlementMap[featureId];
    return e ? { granted: true, source: e.source, expiresAt: e.expiresAt }
      : { granted: false, source: null, expiresAt: null };
  };

  Store.has = function (featureId) {
    // Fail open for anything not in the paid catalogue. If some future caller
    // asks about a free metric, the honest answer is "nothing to unlock" —
    // and a typo must never hide a free feature. Rule 1 of the architecture
    // wins over tidiness here.
    if (!Store.feature(featureId)) return true;
    return !!entitlementMap[featureId];
  };

  Store.hasFeature = function (featureId) { return Store.has(featureId); };

  Store.tier = function () {
    // "Premium" means the full bundle, not merely the ad-removal purchase.
    return Store.has('metric.comfort') && Store.has('reports') ? 'premium' : 'free';
  };

  Store.isPremium = function () { return Store.tier() === 'premium'; };

  Store.getState = function () {
    return {
      tier: Store.tier(),
      entitlements: Store.entitlements(),
      subscription: Store.subscription(),
      promoCode: billingState.promoCode,
      demo: true
    };
  };

  Store.requireFeature = function (featureId, ctx) {
    if (Store.has(featureId)) return true;
    emit('store:paywall', { featureId: featureId, context: ctx || 'menu' });
    return false;
  };

  Store.subscription = function () {
    var now = Date.now();
    var best = null;
    for (var i = 0; i < billingState.receipts.length; i += 1) {
      var r = billingState.receipts[i];
      if (r.plan === 'lifetime') continue;
      if (!receiptActive(r, now)) continue;
      if (!best || r.purchasedAt > best.purchasedAt) best = r;
    }
    if (!best) return null;
    var product = Store.product(best.productId);
    return {
      productId: best.productId,
      namePL: product ? product.namePL : best.productId,
      plan: best.plan,
      startedAt: best.purchasedAt,
      renewsAt: receiptActiveUntil(best),
      trialEndsAt: best.trialEndsAt || null,
      cancelled: !!best.cancelled,
      activeUntil: receiptActiveUntil(best),
      priceText: product ? product.priceText : '—'
    };
  };

  Store.adapter = {
    list: function () { return MockBillingBackend.list(); },
    purchase: function (productId, opts) { return MockBillingBackend.purchase(productId, opts); },
    restore: function () { return MockBillingBackend.restore(); },
    cancel: function (productId) { return MockBillingBackend.cancel(productId); },
    redeem: function (code) { return MockBillingBackend.redeem(code); }
  };

  Store.purchase = function (productId, opts) {
    var options = opts || {};
    var product = Store.product(productId);
    if (!product) {
      return Promise.resolve({
        ok: false, cancelled: false, code: 'ITEM_UNAVAILABLE',
        messagePL: 'Nie znaleziono takiego produktu.'
      });
    }

    // Informed consent is a precondition, not a formality. Without an explicit
    // tick the purchase does not start — and the caller is told why, so the
    // interface can point at the checkbox instead of failing silently.
    if (options.consent !== true) {
      return Promise.resolve({
        ok: false, cancelled: true, code: 'CONSENT_REQUIRED',
        messagePL: 'Zaznacz oświadczenie, że znasz kwotę, okres rozliczeniowy i sposób rezygnacji.'
      });
    }

    return Store.adapter.purchase(productId, options).then(function (result) {
      if (result && result.cancelled) {
        emit('store:purchase', { productId: productId, ok: false, cancelled: true, messagePL: 'Zakup anulowany.' });
        return { ok: false, cancelled: true, messagePL: 'Zakup anulowany. Nic nie zostało zmienione.' };
      }
      if (!result || !result.ok) {
        var messagePL = (result && result.messagePL) || 'Zakup nie powiódł się.';
        emit('store:purchase', { productId: productId, ok: false, cancelled: false, messagePL: messagePL });
        return { ok: false, cancelled: false, code: (result && result.code) || 'UNKNOWN', messagePL: messagePL };
      }

      var receipt = result.receipt;
      receipt.cancelled = false;
      billingState.receipts.push(receipt);
      billingPersist();
      recompute();

      if (receipt.trialEndsAt) {
        emit('store:trial', { productId: productId, endsAt: receipt.trialEndsAt });
      }
      var okMessage = 'Symulacja zakończona — wersja Premium (DEMO) włączona. Nie pobrano żadnej opłaty.';
      emit('store:purchase', { productId: productId, ok: true, cancelled: false, messagePL: okMessage });
      return { ok: true, cancelled: false, messagePL: okMessage, receipt: receipt };
    });
  };

  Store.buy = function (productId, opts) { return Store.purchase(productId, opts); };

  Store.restore = function () {
    return Store.adapter.restore().then(function (result) {
      var restored = result && result.ok && result.receipts ? result.receipts.length : 0;
      recompute();
      var messagePL = restored
        ? 'Przywrócono zakupy demonstracyjne: ' + restored + '.'
        : 'Nie znaleziono zakupów do przywrócenia.';
      return { ok: true, restored: restored, messagePL: messagePL };
    });
  };

  Store.cancelSubscription = function () {
    var sub = Store.subscription();
    if (!sub) {
      return Promise.resolve({ ok: false, messagePL: 'Nie masz aktywnej subskrypcji demonstracyjnej.', activeUntil: null });
    }
    return Store.adapter.cancel(sub.productId).then(function () {
      for (var i = 0; i < billingState.receipts.length; i += 1) {
        var r = billingState.receipts[i];
        if (r.productId === sub.productId && !r.cancelled) {
          r.cancelled = true;
          r.cancelledAt = Date.now();
        }
      }
      billingPersist();
      recompute();
      var until = sub.activeUntil;
      return {
        ok: true,
        activeUntil: until,
        messagePL: 'Subskrypcja demonstracyjna nie odnowi się. Funkcje działają do ' + fmtDate(until) + '.'
      };
    });
  };

  Store.cancel = function () { return Store.cancelSubscription(); };

  Store.grantTemporary = function (featureId, ms, source) {
    // Never noAds: an ad that pays for removing ads is a joke the user pays for.
    if (featureId === 'noAds') return false;
    if (!Store.feature(featureId)) return false;
    if (typeof ms !== 'number' || ms <= 0) return false;
    var until = Date.now() + ms;
    var current = billingState.temporary[featureId];
    billingState.temporary[featureId] = typeof current === 'number' && current > until ? current : until;
    billingPersist();
    recompute();
    return true;
  };

  Store.redeemPromo = function (code) {
    return Store.adapter.redeem(code).then(function (result) {
      if (!result || !result.ok) {
        return { ok: false, messagePL: (result && result.messagePL) || 'Nie znamy takiego kodu.' };
      }
      var grant = result.grant;
      var until = Date.now() + grant.ms;
      for (var i = 0; i < ALL_PREMIUM_FEATURES.length; i += 1) {
        var id = ALL_PREMIUM_FEATURES[i];
        if (id === 'noAds') continue;
        var current = billingState.temporary[id];
        billingState.temporary[id] = typeof current === 'number' && current > until ? current : until;
      }
      billingState.promoCode = result.code;
      billingPersist();
      recompute();
      return { ok: true, messagePL: grant.messagePL };
    });
  };

  Store.resetDemo = function () {
    // Chapter 11: only the fiction is erased. Measurements, thresholds,
    // profiles, calibration, schedule, alerts and comparisons are the user's
    // property and survive untouched.
    billingState.receipts = [];
    billingState.temporary = {};
    billingState.promoCode = null;
    removeKey(KEY_BILLING);
    removeKey(KEY_ACCOUNT);
    removeKey(KEY_CLOUD);
    removeKey(KEY_ADS);
    removeKey(KEY_TOUR);

    accountState.user = null;
    accountState.state = 'signedOut';
    accountState.lastSyncAt = null;
    accountState.lastErrorPL = '';
    accountState.syncEnabled = true;

    adsState.rewardsDay = todayKey();
    adsState.rewardsUsed = 0;
    adsState.lastRewardAt = 0;
    adsState.personalised = false;

    recompute();
    emit('store:reset', {});
    emit('account:state', { state: 'signedOut', user: null });
    emit('account:signedout', {});
    renderAccountPanel();
    renderPremiumPanel();
    Ads.refresh();
  };

  /* ---------------- Premium screen ---------------- */

  function renderPremiumPanel() {
    var panel = el('panelPremium');
    if (!panel) return;
    var host = panel.querySelector('.ms-main__inner') || panel;

    var hero = ensure('premiumHero', 'section', host, 'ms-card ms-card--hero ms-card--premium');
    if (hero) {
      clear(hero);
      var badge = demoBadge('DEMO');
      badge.id = 'premiumDemoBadge';
      badge.classList.add('ms-demo-badge--corner');
      hero.style.position = 'relative';
      hero.appendChild(badge);
      var title = mk('h2', 'ms-paywall__title', 'Monitor Światła Premium');
      hero.appendChild(title);
      hero.appendChild(mk('p', 'ms-paywall__lead',
        'Pomiar, cztery darmowe metryki, wykres i tabela są i zostaną bezpłatne. ' +
        'Premium dokłada trzy metryki oraz dziesięć funkcji, które zamieniają strumień próbek we wniosek.'));
      var status = mk('p', 'ms-status ms-status--premium',
        Store.tier() === 'premium' ? 'Masz wersję Premium (DEMO).' : 'Wersja bezpłatna.');
      status.id = 'premiumStatus';
      hero.appendChild(status);
    }

    /* What is being sold comes BEFORE what it costs. The list was always here,
       but underneath the three price cards: the hero promised "three metrics
       and ten features" and the next thing on screen was a price. */
    var matrixHead = ensure('featureMatrixHead', 'div', host, 'ms-section__head');
    if (matrixHead) {
      clear(matrixHead);
      matrixHead.appendChild(mk('h2', 'ms-section__title', 'Co dostajesz'));
      matrixHead.appendChild(mk('p', 'ms-section__sub', 'Trzy metryki i dziesięć funkcji'));
    }

    var matrix = ensure('featureMatrix', 'div', host, 'ms-feature-list');
    if (matrix) {
      clear(matrix);
      for (var f = 0; f < Store.FEATURES.length; f += 1) {
        matrix.appendChild(featureRow(Store.FEATURES[f]));
      }
    }

    var plansHead = ensure('planListHead', 'div', host, 'ms-section__head');
    if (plansHead) {
      clear(plansHead);
      plansHead.appendChild(mk('h2', 'ms-section__title', 'Plany'));
      plansHead.appendChild(mk('p', 'ms-section__sub', 'Ceny symulowane — nic nie zostanie pobrane'));
    }

    var plans = ensure('planList', 'div', host, 'ms-plans');
    if (plans) {
      clear(plans);
      for (var i = 0; i < Store.CATALOGUE.length; i += 1) {
        plans.appendChild(planCard(Store.CATALOGUE[i]));
      }
    }

    var actions = ensureOwned('premiumActions', 'div', host, 'ms-card__actions');
    if (actions) {
      clear(actions);
      actions.appendChild(button('btnRestorePurchases', 'ms-btn ms-btn--outline', 'Przywróć zakupy', function () {
        Store.restore().then(function (res) { toast(res.messagePL, { kind: 'info' }); renderPremiumPanel(); });
      }));
      actions.appendChild(button('btnManageSubscription', 'ms-btn ms-btn--text', 'Zarządzaj kontem', function () {
        var u = ui();
        if (u && typeof u.showPanel === 'function') u.showPanel('panelAccount', { from: 'panelPremium' });
      }));
    }

    var promoField = ensureOwned('promoField', 'div', host, 'ms-field');
    if (promoField) {
      clear(promoField);
      var label = mk('label', 'ms-field__label', 'Kod promocyjny (DEMO)');
      label.setAttribute('for', 'promoInput');
      promoField.appendChild(label);
      var row = mk('div', 'ms-row');
      var input = mk('input', 'ms-input');
      input.type = 'text';
      input.id = 'promoInput';
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('inputmode', 'text');
      row.appendChild(input);
      row.appendChild(button('btnPromoApply', 'ms-btn ms-btn--tonal', 'Zastosuj', function () {
        var value = el('promoInput') ? el('promoInput').value : '';
        Store.redeemPromo(value).then(function (res) {
          toast(res.messagePL, { kind: res.ok ? 'success' : 'error' });
          renderPremiumPanel();
        });
      }));
      promoField.appendChild(row);
      promoField.appendChild(mk('p', 'ms-help', 'W wersji demonstracyjnej działa kod DEMO7.'));
    }

    var footnote = ensure('premiumFootnote', 'p', host, 'ms-demo-note');
    setText(footnote,
      'To wersja demonstracyjna. Nie ma tu Google Play Billing, Google Pay ani żadnego operatora płatności. ' +
      'Żadna kwota nie zostanie pobrana, a „zakup” to wpis w pamięci tej przeglądarki, który kasuje przycisk ' +
      '„Wyczyść stan demonstracyjny” na ekranie Więcej.');
  }

  function planCard(product) {
    var card = mk('div', 'ms-plan' + (product.recommended ? ' ms-plan--featured' : ''));
    card.id = 'plan-' + product.id;

    if (product.badgePL) {
      var badge = mk('span', 'ms-plan__badge', product.badgePL);
      badge.id = 'badge-' + product.id;
      card.appendChild(badge);
    }

    // Before the name, the price and the button — in reading order too, not
    // just visually. Appended last, it announced "this was a simulation" only
    // after the purchase button had already been read out.
    card.appendChild(demoBadge('DEMO'));

    card.appendChild(mk('span', 'ms-plan__name', product.namePL));

    var price = mk('span', 'ms-plan__price', product.priceText);
    price.id = 'price-' + product.id;
    card.appendChild(price);

    var note2 = mk('span', 'ms-plan__note', product.perMonthPL ? product.perMonthPL : product.periodPL);
    card.appendChild(note2);

    // Renewal amount and cancellation path in the same frame as the button,
    // with no disclosure to expand. Chapter 6.1 makes this non-negotiable.
    var renew = mk('p', 'ms-t-cap', Store.renewalTextPL(product));
    renew.id = 'renew-' + product.id;
    card.appendChild(renew);

    /* The renewal line above states the amount, the period and the way out —
       chapter 6.1 requires all three in the frame, with no disclosure to open,
       and that requirement is met by 'renew-'. The full paragraph said the same
       thing again in seven more lines directly underneath, pushing each card to
       ~350px and making three plans impossible to compare without scrolling
       back and forth. It goes under a disclosure; nothing legally required is
       hidden by that. */
    var details = doc.createElement('details');
    details.className = 'ms-plan__details';
    var summary = doc.createElement('summary');
    summary.className = 'ms-plan__summary';
    summary.appendChild(doc.createTextNode('Szczegóły i warunki'));
    details.appendChild(summary);
    var terms = mk('p', 'ms-t-cap ms-t-muted', Store.formatTerms(product.id, { withTrial: product.trialDays > 0 }));
    terms.id = 'terms-' + product.id;
    details.appendChild(terms);
    card.appendChild(details);

    // Selling a second Premium plan to somebody who already has Premium would
    // be the kind of thing this application exists to criticise, so the button
    // says so instead of taking the tap.
    var owned = productOwned(product.id);
    var redundant = !owned && Store.tier() === 'premium' && product.features.length > 1;
    var labelPL = owned
      ? 'Masz już ten produkt (DEMO)'
      : (redundant
        ? 'Masz już wszystkie funkcje Premium (DEMO)'
        : Store.formatCta(product.id, { withTrial: product.trialDays > 0 }));
    var buy = button('buy-' + product.id, 'ms-btn ms-btn--demo ms-btn--block', labelPL,
      function () { openPurchaseSheet(product.id, product.trialDays > 0); });
    if (owned || redundant) buy.disabled = true;
    card.appendChild(buy);
    return card;
  }

  // Ownership is a question about receipts, not about features: a Premium
  // subscriber must still see that "Usunięcie reklam" is a separate product,
  // and a rewarded 24 h unlock must never read as a purchase.
  function productOwned(productId) {
    var now = Date.now();
    for (var i = 0; i < billingState.receipts.length; i += 1) {
      var r = billingState.receipts[i];
      if (r.productId === productId && receiptActive(r, now)) return true;
    }
    // The bundles include ad removal, so buying it separately would be waste.
    if (productId === 'noads_lifetime' && Store.tier() === 'premium') return true;
    return false;
  }

  function featureRow(feature) {
    var row = mk('div', 'ms-feature');
    var iconBox = mk('span', 'ms-feature__icon');
    iconBox.appendChild(icon(feature.iconName));
    row.appendChild(iconBox);
    var text = mk('span', 'ms-feature__text');
    var titleRow = mk('span', 'ms-feature__title', feature.namePL);
    text.appendChild(titleRow);
    text.appendChild(mk('span', 'ms-feature__desc', feature.descPL));
    text.appendChild(mk('span', 'ms-feature__desc', 'Bez Premium: ' + feature.freePL));
    row.appendChild(text);
    var end = Store.has(feature.id)
      ? mk('span', 'ms-status ms-status--good', 'Odblokowane')
      : mk('span', 'ms-lock', 'Premium');
    row.appendChild(end);
    return row;
  }

  /* ---------------- Purchase sheet ---------------- */

  var purchaseContext = { productId: null, withTrial: false, consent: false };

  /* replaceFromSheetId: when the purchase sheet is opened straight off another
     sheet, it takes over that sheet's place on the navigation stack instead of
     stacking on top of it. */
  function openPurchaseSheet(productId, withTrial, replaceFromSheetId) {
    var product = Store.product(productId);
    if (!product) return;
    purchaseContext = { productId: productId, withTrial: !!withTrial && product.trialDays > 0, consent: false };

    var sheet = el('sheetPurchase');
    var u = ui();
    if (!sheet || !u || typeof u.openSheet !== 'function') return;

    var head = sheet.querySelector('.ms-sheet__head');
    var titleNode = el('purchaseTitle');
    if (!titleNode && head) {
      titleNode = ensure('purchaseTitle', 'h2', head.querySelector('.ms-sheet__titles') || head, 'ms-sheet__title');
    }
    setText(titleNode, 'Potwierdzenie zakupu (DEMO)');

    var body = sheet.querySelector('.ms-sheet__body') || sheet;
    clear(body);

    var strip = demoStrip('DEMO — symulacja płatności. Nie pobierzemy żadnej opłaty.');
    strip.id = 'purchaseDemoBadge';
    body.appendChild(strip);

    var frame = mk('div', 'ms-demo-frame');

    var nameNode = mk('p', 'ms-t-h3', product.namePL);
    nameNode.id = 'purchaseProduct';
    frame.appendChild(nameNode);

    var priceNode = mk('p', 'ms-t-h2 ms-t-num', product.priceText + ' ' + product.periodPL);
    priceNode.id = 'purchasePrice';
    frame.appendChild(priceNode);

    var renewNode = mk('p', 'ms-t-body', Store.renewalTextPL(product));
    renewNode.id = 'purchaseRenew';
    frame.appendChild(renewNode);

    var termsNode = mk('p', 'ms-t-cap', Store.formatTerms(productId, { withTrial: purchaseContext.withTrial }));
    termsNode.id = 'purchaseTerms';
    frame.appendChild(termsNode);

    // Consent checkbox. Not in chapter 10's id list; reported to the integrator
    // as an addition, because "conscious confirmation" needs a control the user
    // actually operates, not a sentence they scroll past.
    var consentLabel = mk('label', 'ms-switch');
    var consentInput = mk('input', 'ms-switch__input');
    consentInput.type = 'checkbox';
    consentInput.id = 'purchaseConsent';
    var consentTrack = mk('span', 'ms-switch__track');
    consentTrack.appendChild(mk('span', 'ms-switch__thumb'));
    var consentText = mk('span', 'ms-switch__text');
    consentText.appendChild(mk('span', 'ms-switch__label',
      'Znam kwotę, okres rozliczeniowy i sposób rezygnacji.'));
    consentText.appendChild(mk('span', 'ms-switch__sub',
      'Przyjmuję do wiadomości, że to symulacja i żadna opłata nie zostanie pobrana.'));
    consentLabel.appendChild(consentInput);
    consentLabel.appendChild(consentTrack);
    consentLabel.appendChild(consentText);
    frame.appendChild(consentLabel);

    var spinner = mk('span', 'ms-spinner');
    spinner.id = 'purchaseSpinner';
    spinner.hidden = true;
    spinner.setAttribute('role', 'progressbar');
    spinner.setAttribute('aria-label', 'Trwa symulacja płatności');
    frame.appendChild(spinner);

    body.appendChild(frame);

    var foot = sheet.querySelector('.ms-sheet__foot');
    if (!foot) {
      foot = mk('div', 'ms-sheet__foot');
      sheet.appendChild(foot);
    }
    clear(foot);

    // The amount is on the button itself, as chapter 6.1 requires.
    var confirm = button('purchaseConfirm', 'ms-btn ms-btn--demo ms-btn--lg ms-btn--block',
      Store.formatCta(productId, { withTrial: purchaseContext.withTrial }), function () {
        runPurchase(consentInput.checked);
      });
    foot.appendChild(confirm);
    foot.appendChild(button('purchaseCancel', 'ms-btn ms-btn--text ms-btn--block', 'Anuluj', function () {
      var uu = ui();
      if (uu && typeof uu.closeSheet === 'function') uu.closeSheet('sheetPurchase', { cancelled: true });
    }));

    /* No focusId: openSheet then focuses the sheet itself, so a screen reader
       starts at the dialog title and reads the price, the renewal amount and
       the terms on its way down. Landing on "Znam kwotę i okres rozliczeniowy"
       asked the user to confirm figures the reader had not read out yet, and
       none of those paragraphs is focusable, so Tab could never reach them.
       The consent control is described by them regardless. */
    if (replaceFromSheetId && typeof u.replaceSheet === 'function') {
      u.replaceSheet(replaceFromSheetId, 'sheetPurchase', { dismissible: true });
    } else {
      u.openSheet('sheetPurchase', { dismissible: true });
    }
  }

  function runPurchase(consent) {
    var spinner = el('purchaseSpinner');
    var confirm = el('purchaseConfirm');
    var u = ui();

    if (!consent) {
      toast('Zaznacz oświadczenie, żeby kontynuować.', { kind: 'error' });
      var box = el('purchaseConsent');
      if (box && typeof box.focus === 'function') box.focus();
      return;
    }

    if (spinner) spinner.hidden = false;
    if (u && typeof u.setBusy === 'function') u.setBusy(confirm, true);

    Store.purchase(purchaseContext.productId, {
      withTrial: purchaseContext.withTrial,
      consent: true
    }).then(function (res) {
      if (spinner) spinner.hidden = true;
      if (u && typeof u.setBusy === 'function') u.setBusy(el('purchaseConfirm'), false);
      if (res.ok) {
        if (u && typeof u.closeSheet === 'function') u.closeSheet('sheetPurchase', { ok: true });
        toast(res.messagePL, { kind: 'success' });
        announce('Wersja Premium demonstracyjna włączona.');
      } else if (!res.cancelled) {
        toast(res.messagePL, { kind: 'error' });
      } else {
        toast(res.messagePL, { kind: 'info' });
      }
      renderPremiumPanel();
      renderAccountPanel();
    });
  }

  /* ---------------- Paywall sheet ---------------- */

  function openPaywall(featureId, context) {
    var feature = Store.feature(featureId);
    var sheet = el('sheetPaywall');
    var u = ui();
    if (!feature || !sheet || !u || typeof u.openSheet !== 'function') return;

    var head = sheet.querySelector('.ms-sheet__head');
    var titleNode = el('paywallTitle');
    if (!titleNode && head) {
      titleNode = ensure('paywallTitle', 'h2', head.querySelector('.ms-sheet__titles') || head, 'ms-sheet__title');
    }
    setText(titleNode, feature.namePL);

    var body = sheet.querySelector('.ms-sheet__body') || sheet;
    clear(body);

    var badge = demoBadge('DEMO');
    badge.id = 'paywallDemoBadge';
    body.appendChild(badge);

    var wrap = mk('div', 'ms-stack');
    wrap.id = 'paywallBody';

    var featureBox = mk('div', 'ms-card ms-card--premium');
    featureBox.id = 'paywallFeature';
    featureBox.appendChild(mk('h3', 'ms-card__title', feature.namePL));
    featureBox.appendChild(mk('p', 'ms-card__sub', feature.descPL));
    featureBox.appendChild(mk('p', 'ms-t-cap ms-t-muted', 'Teraz widzisz: ' + feature.freePL));
    if (featureId.indexOf('metric.') === 0) {
      featureBox.appendChild(mk('p', 'ms-t-cap ms-t-muted', metricShort(featureId.slice(7))));
    }
    wrap.appendChild(featureBox);

    // The sentence that makes gating honest: the data already exists, because
    // the engine computes all seven metrics regardless of entitlements.
    wrap.appendChild(note('info', 'Nic nie zaczyna się od nowa. ',
      'Aplikacja liczy i zapisuje wszystkie siedem metryk od pierwszego pomiaru, niezależnie od zakupu. ' +
      'Odblokowanie pokazuje dane, które już masz na urządzeniu.'));

    var plansBox = mk('div', 'ms-stack');
    plansBox.id = 'paywallPlans';
    var recommended = Store.product('premium_yearly');
    var alternative = Store.product('premium_monthly');
    plansBox.appendChild(paywallPlanButton(recommended));
    plansBox.appendChild(paywallPlanButton(alternative));
    if (featureId === 'noAds') plansBox.appendChild(paywallPlanButton(Store.product('noads_lifetime')));
    wrap.appendChild(plansBox);

    var rewardCheck = global.Ads && typeof global.Ads.canShowRewarded === 'function'
      ? global.Ads.canShowRewarded(featureId)
      : { ok: false, reasonPL: '', remainingToday: 0 };

    if (featureId !== 'noAds') {
      var watch = button('paywallWatchAd', 'ms-btn ms-btn--tonal ms-btn--block',
        'Obejrzyj reklamę i odblokuj na 24 godziny', function () {
          global.Ads.showRewarded(featureId).then(function (res) {
            toast(res.messagePL, { kind: res.ok ? 'success' : 'info' });
          });
        });
      if (!rewardCheck.ok) {
        watch.disabled = true;
      }
      wrap.appendChild(watch);
      wrap.appendChild(mk('p', 'ms-t-cap ms-t-muted', rewardCheck.ok
        ? 'Pozostało dzisiaj nagród: ' + rewardCheck.remainingToday + '. Reklama startuje dopiero po dotknięciu przycisku.'
        : rewardCheck.reasonPL));
    }

    wrap.appendChild(mk('p', 'ms-demo-note',
      'To wersja demonstracyjna. Nie pobierzemy żadnej opłaty, a pomiar i cztery darmowe metryki działają dalej bez zmian.'));

    body.appendChild(wrap);

    var foot = sheet.querySelector('.ms-sheet__foot');
    if (!foot) {
      foot = mk('div', 'ms-sheet__foot');
      sheet.appendChild(foot);
    }
    clear(foot);
    foot.appendChild(button('paywallClose', 'ms-btn ms-btn--text ms-btn--block', 'Nie teraz', function () {
      var uu = ui();
      if (uu && typeof uu.closeSheet === 'function') uu.closeSheet('sheetPaywall', null);
    }));

    u.openSheet('sheetPaywall', { focusId: 'paywallClose', dismissible: true });
  }

  /* Set between closing the paywall and opening the purchase sheet, for the
     fallback path where UI has no replaceSheet. */
  var pendingPurchase = null;

  function paywallPlanButton(product) {
    if (!product) return mk('span');
    var wrap = mk('div', 'ms-card ms-card--flat');
    wrap.appendChild(mk('p', 'ms-card__title', product.namePL));
    wrap.appendChild(mk('p', 'ms-t-cap', Store.renewalTextPL(product)));
    var buy = mk('button', 'ms-btn ms-btn--demo ms-btn--block');
    buy.type = 'button';
    buy.appendChild(mk('span', 'ms-btn__label', Store.formatCta(product.id, { withTrial: product.trialDays > 0 })));
    buy.addEventListener('click', function () {
      /* Closing and opening in the same tick queued a history.back() that
         landed after the new pushState, and popstate then closed the sheet
         that had just opened — the purchase sheet flashed and vanished.
         replaceSheet swaps the top entry without touching history. */
      var u = ui();
      if (u && typeof u.replaceSheet === 'function') {
        openPurchaseSheet(product.id, product.trialDays > 0, 'sheetPaywall');
      } else if (u && typeof u.closeSheet === 'function') {
        pendingPurchase = { productId: product.id, withTrial: product.trialDays > 0 };
        once('ui:sheetclose', function (d) {
          if (!d || d.sheetId !== 'sheetPaywall' || !pendingPurchase) return;
          var job = pendingPurchase;
          pendingPurchase = null;
          openPurchaseSheet(job.productId, job.withTrial);
        });
        u.closeSheet('sheetPaywall', null);
      } else {
        openPurchaseSheet(product.id, product.trialDays > 0);
      }
    });
    wrap.appendChild(buy);
    return wrap;
  }

  /* ---------------- Value moment teaser (chapter 12.2) ---------------- */

  var teaserTimer = null;
  var teaserShownThisSession = false;

  function scheduleTeaser() {
    clearTeaser();
    teaserShownThisSession = false;
    // 45 seconds of uninterrupted measurement, once per session, below the
    // tiles. An offer before the app has been useful is just an interruption.
    teaserTimer = delay(45000, function () {
      teaserTimer = null;
      if (!engineRunning() || teaserShownThisSession) return;
      if (Store.tier() === 'premium') return;
      var banner = el('teaserBanner');
      if (!banner) return;
      clear(banner);
      banner.className = 'ms-card ms-card--premium';
      banner.appendChild(mk('p', 'ms-card__title', 'Mierzysz już 45 sekund'));
      banner.appendChild(mk('p', 'ms-card__sub',
        'Migotanie, równomierność i komfort wzrokowy są liczone w tle od początku tego pomiaru. ' +
        'Premium pokazuje je razem z historią, której nie musisz zbierać od nowa.'));
      var actions = mk('div', 'ms-card__actions');
      var openBtn = mk('button', 'ms-btn ms-btn--premium');
      openBtn.type = 'button';
      openBtn.appendChild(mk('span', 'ms-btn__label', 'Zobacz, co daje Premium'));
      openBtn.addEventListener('click', function () {
        var u = ui();
        if (u && typeof u.showTab === 'function') u.showTab('premium');
        show(el('teaserBanner'), false);
      });
      actions.appendChild(openBtn);
      actions.appendChild(button('teaserClose', 'ms-btn ms-btn--text', 'Nie teraz', function () {
        show(el('teaserBanner'), false);
      }));
      banner.appendChild(actions);
      banner.appendChild(demoBadge('DEMO'));
      show(banner, true);
      teaserShownThisSession = true;
    });
  }

  function clearTeaser() {
    if (teaserTimer !== null) {
      global.clearTimeout(teaserTimer);
      teaserTimer = null;
    }
    show(el('teaserBanner'), false);
  }

  /* ==================================================================
     ==================================================================
     3. REKLAMY — window.Ads
     ==================================================================
     ================================================================== */

  /* ------------------------------------------------------------------
     FICTIONAL LAYER — MockAdBackend
     ------------------------------------------------------------------
     The "creatives" are three sentences written here and drawn with the
     application's own CSS. Nothing is fetched, nothing is tracked, no click
     goes anywhere. Tapping a banner opens a dialog explaining that it is a
     prop — which is the opposite of what a real ad does, and deliberately so.

     REPLACING THIS WITH A REAL AD SDK (AdMob / Ad Manager)
     -----------------------------------------------------
     `adapter.loadBanner(slot)` would create the SDK's ad view and resolve when
     it fills; `adapter.loadRewarded()` would resolve with a loaded rewarded
     object; `adapter.destroy(slot)` would release it. The layer above keeps
     the three hard rules that no SDK enforces for you:
       - a banner is a static element in normal flow, max 64 px, placed AFTER
         all controls in DOM order;
       - never on panelMeasure, panelPremium, panelAccount or panelDocs;
       - no interstitials, no autoplay, and nothing loads while the camera runs.
     Those rules are checked in code below, not merely written down, because a
     rule that only exists in a document is a rule that gets broken during
     integration.
     ------------------------------------------------------------------ */

  var MockAdBackend = (function () {
    var CREATIVES = [
      {
        titlePL: 'Miejsce na reklamę',
        textPL: 'Tu byłaby reklama. Nie zbieramy danych.',
        ctaPL: 'Co to jest?'
      },
      {
        titlePL: 'Reklama (DEMO)',
        textPL: 'Rysowany lokalnie, bez sieci.',
        ctaPL: 'Co to jest?'
      },
      {
        titlePL: 'Atrapa reklamy',
        textPL: 'Premium usuwa to miejsce.',
        ctaPL: 'Co to jest?'
      }
    ];

    var index = 0;

    return {
      loadBanner: function (slot) {
        return new Promise(function (resolve) {
          delay(80, function () {
            var creative = CREATIVES[index % CREATIVES.length];
            index += 1;
            resolve({ ok: true, slot: slot, creative: creative });
          });
        });
      },

      loadRewarded: function () {
        return new Promise(function (resolve) {
          delay(150, function () {
            resolve({
              ok: true,
              durationMs: 15000,       // chapter 9.2: 15 s countdown
              skipAfterMs: 5000        // chapter 9.2: skip becomes active at 5 s
            });
          });
        });
      },

      destroy: function () { /* nothing to release in a simulation */ }
    };
  }());

  /* ---------------- END OF FICTIONAL LAYER (Ads) ---------------- */

  var Ads = {};

  Ads.DEMO = true;
  Ads.SLOTS = ['history', 'tools', 'more'];
  Ads.MAX_REWARDS_PER_DAY = 3;
  Ads.REWARD_MS = DAY_MS;

  var REWARD_MIN_GAP_MS = 2 * MINUTE_MS;   // editorial judgement, not a standard

  var SLOT_ELEMENT = {
    history: 'adSlotHistory',
    tools: 'adSlotTools',
    more: 'adSlotMore'
  };

  // Screens where an ad may never appear. The check is by ancestor panel id, so
  // even a misplaced slot element in index.html cannot put an ad next to the
  // Start button.
  var FORBIDDEN_PANELS = ['panelMeasure', 'panelPremium', 'panelAccount', 'panelDocs'];

  var adsState = {
    rewardsDay: null,
    rewardsUsed: 0,
    lastRewardAt: 0,
    personalised: false,
    visible: {}
  };

  function todayKey() {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  function adsPersist() {
    writeJson(KEY_ADS, {
      version: 1,
      rewardsDay: adsState.rewardsDay,
      rewardsUsed: adsState.rewardsUsed,
      lastRewardAt: adsState.lastRewardAt,
      personalised: adsState.personalised
    });
  }

  function adsLoad() {
    var stored = readJson(KEY_ADS, null);
    adsState.rewardsDay = todayKey();
    if (!stored) return;
    // Counter resets at local midnight simply by not matching yesterday's key.
    if (stored.rewardsDay === adsState.rewardsDay) {
      adsState.rewardsUsed = typeof stored.rewardsUsed === 'number' ? stored.rewardsUsed : 0;
      adsState.lastRewardAt = typeof stored.lastRewardAt === 'number' ? stored.lastRewardAt : 0;
    }
    adsState.personalised = stored.personalised === true;
  }

  function slotAllowed(node) {
    if (!node) return false;
    var cursor = node;
    while (cursor && cursor !== doc.body) {
      if (cursor.id && FORBIDDEN_PANELS.indexOf(cursor.id) >= 0) return false;
      cursor = cursor.parentNode;
    }
    return true;
  }

  Ads.isEnabled = function () {
    // One question, one owner. Ads never inspect receipts themselves.
    return !Store.has('noAds');
  };

  Ads.isPersonalised = function () { return adsState.personalised; };

  Ads.setPersonalised = function (value) {
    adsState.personalised = !!value;
    adsPersist();
  };

  Ads.rewardsRemainingToday = function () {
    if (adsState.rewardsDay !== todayKey()) {
      adsState.rewardsDay = todayKey();
      adsState.rewardsUsed = 0;
      adsPersist();
    }
    return Math.max(0, Ads.MAX_REWARDS_PER_DAY - adsState.rewardsUsed);
  };

  Ads.adapter = {
    loadBanner: function (slot) { return MockAdBackend.loadBanner(slot); },
    loadRewarded: function () { return MockAdBackend.loadRewarded(); },
    destroy: function (slot) { return MockAdBackend.destroy(slot); }
  };

  Ads.showBanner = function (slot) {
    if (Ads.SLOTS.indexOf(slot) < 0) return false;
    if (!Ads.isEnabled()) return false;
    // HARD RULE: nothing is loaded while the camera runs. Not a preference —
    // a running measurement must never share the main thread with ad work,
    // and the measurement screen has no slot to begin with.
    if (engineRunning()) return false;

    var node = el(SLOT_ELEMENT[slot]);
    if (!node || !slotAllowed(node)) return false;

    Ads.adapter.loadBanner(slot).then(function (result) {
      if (!result || !result.ok) return;
      if (!Ads.isEnabled()) return;
      renderBanner(node, result.creative, slot);
      adsState.visible[slot] = true;
      show(node, true);
      emit('ads:shown', { slot: slot });
    });
    return true;
  };

  function renderBanner(node, creative, slot) {
    clear(node);
    node.className = 'ms-ad ms-ad--inline';
    node.setAttribute('aria-label', 'Miejsce na reklamę, wersja demonstracyjna');
    node.setAttribute('role', 'complementary');

    /* --corner, not an inline child. As an ordinary flex item this pill took
       153 of the 380 available pixels and left the copy a 42px column that
       wrapped one word per line and slid out from under the button beside it.
       The variant exists for precisely this, and .ms-ad is already
       position: relative. */
    var label = mk('span', 'ms-demo-badge ms-demo-badge--corner demo-badge ad-label', 'REKLAMA (DEMO)');
    node.appendChild(label);

    var body = mk('div', 'ms-ad__body');
    // Blocks, not spans: styles.css gives the title and the text two different
    // sizes and expects them on two lines. As spans they ran into one sentence.
    body.appendChild(mk('div', 'ms-ad__title', creative.titlePL));
    body.appendChild(mk('div', 'ms-ad__text', creative.textPL));
    node.appendChild(body);

    // .ms-ad__cta only positions the button; the look comes from .ms-btn, the
    // same as every other button in the application.
    var cta = mk('button', 'ms-btn ms-btn--outline ms-ad__cta');
    cta.type = 'button';
    cta.appendChild(mk('span', 'ms-btn__label', creative.ctaPL));
    cta.addEventListener('click', function () {
      var u = ui();
      if (u && typeof u.alert === 'function') {
        u.alert({
          titlePL: 'To atrapa reklamy',
          bodyPL: 'Ten baner jest rysowany lokalnie i nigdzie nie prowadzi. Aplikacja nie ma sieci reklamowej, ' +
            'nie zbiera danych i nie śledzi Cię. W wersji produkcyjnej byłoby tu miejsce na reklamę, ' +
            'a wersja Premium usuwa je w całości.',
          okPL: 'Rozumiem',
          demo: true
        });
      }
    });
    node.appendChild(cta);

    /* Dismissible. Policy does not require it for a static banner in the normal
       flow that covers nothing, but the class exists, the slot is a stand-in
       for a real one, and "can the user get rid of it" should not be answered
       with "no". It hides this slot for the rest of the session only. */
    var close = mk('button', 'ms-ad__close');
    close.type = 'button';
    close.setAttribute('aria-label', 'Zamknij tę atrapę reklamy');
    close.appendChild(icon('close'));
    close.addEventListener('click', function () {
      if (slot) Ads.hideBanner(slot);
    });
    node.appendChild(close);
  }

  Ads.hideBanner = function (slot) {
    var node = el(SLOT_ELEMENT[slot]);
    if (!node) return;
    clear(node);
    show(node, false);
    adsState.visible[slot] = false;
    Ads.adapter.destroy(slot);
    emit('ads:hidden', { slot: slot });
  };

  Ads.hideAll = function () {
    for (var i = 0; i < Ads.SLOTS.length; i += 1) Ads.hideBanner(Ads.SLOTS[i]);
  };

  Ads.refresh = function () {
    if (!Ads.isEnabled()) {
      Ads.hideAll();
      return;
    }
    var current = ui() && typeof ui().current === 'function' ? ui().current() : null;
    var panelId = current && current.panelId ? current.panelId : null;
    var map = { panelHistory: 'history', panelTools: 'tools', panelMore: 'more' };
    for (var i = 0; i < Ads.SLOTS.length; i += 1) {
      var slot = Ads.SLOTS[i];
      if (map[panelId] === slot) {
        Ads.showBanner(slot);
      } else if (adsState.visible[slot]) {
        Ads.hideBanner(slot);
      }
    }
  };

  Ads.canShowRewarded = function (featureId) {
    var remaining = Ads.rewardsRemainingToday();
    if (featureId === 'noAds') {
      return { ok: false, reasonPL: 'Braku reklam nie da się odblokować reklamą.', remainingToday: remaining };
    }
    if (!Store.feature(featureId)) {
      return { ok: false, reasonPL: 'Ta funkcja nie wymaga odblokowania.', remainingToday: remaining };
    }
    if (Store.has(featureId)) {
      return { ok: false, reasonPL: 'Masz już dostęp do tej funkcji.', remainingToday: remaining };
    }
    if (engineRunning()) {
      return { ok: false, reasonPL: 'Reklama nagradzana nie uruchamia się podczas pomiaru.', remainingToday: remaining };
    }
    if (remaining <= 0) {
      return { ok: false, reasonPL: 'Dzisiejszy limit nagród wyczerpany. Wróć jutro.', remainingToday: 0 };
    }
    var since = Date.now() - adsState.lastRewardAt;
    if (adsState.lastRewardAt && since < REWARD_MIN_GAP_MS) {
      var waitS = Math.ceil((REWARD_MIN_GAP_MS - since) / 1000);
      return { ok: false, reasonPL: 'Kolejną nagrodę można odebrać za ' + waitS + ' s.', remainingToday: remaining };
    }
    return { ok: true, reasonPL: '', remainingToday: remaining };
  };

  Ads.showRewarded = function (featureId) {
    var check = Ads.canShowRewarded(featureId);
    if (!check.ok) {
      emit('ads:blocked', { reasonPL: check.reasonPL });
      return Promise.resolve({ ok: false, cancelled: false, grantedMs: 0, messagePL: check.reasonPL });
    }

    var u = ui();
    var sheet = el('sheetRewarded');
    if (!u || typeof u.openSheet !== 'function' || !sheet) {
      return Promise.resolve({
        ok: false, cancelled: true, grantedMs: 0,
        messagePL: 'Nie można teraz otworzyć reklamy nagradzanej.'
      });
    }

    return Ads.adapter.loadRewarded().then(function (loaded) {
      return new Promise(function (resolve) {
        var duration = loaded && loaded.durationMs ? loaded.durationMs : 15000;
        var skipAfter = loaded && loaded.skipAfterMs ? loaded.skipAfterMs : 5000;
        var startedAt = Date.now();
        var ticker = null;
        var settled = false;

        var feature = Store.feature(featureId);
        var body = sheet.querySelector('.ms-sheet__body') || sheet;
        var head = sheet.querySelector('.ms-sheet__head');

        var titleNode = el('rewardedTitle');
        if (!titleNode && head) {
          titleNode = ensure('rewardedTitle', 'h2', head.querySelector('.ms-sheet__titles') || head, 'ms-sheet__title');
        }
        setText(titleNode, 'Reklama nagradzana (DEMO)');

        clear(body);
        var strip = demoStrip('DEMO — atrapa reklamy. Nic się nie pobiera i nic nie jest śledzone.');
        strip.id = 'rewardedDemoBadge';
        body.appendChild(strip);

        var frame = mk('div', 'ms-demo-frame');
        var reward = mk('p', 'ms-t-body',
          'Nagroda: ' + (feature ? feature.namePL : featureId) + ' na 24 godziny.');
        reward.id = 'rewardedReward';
        frame.appendChild(reward);

        var timer = mk('p', 'ms-t-h2 ms-t-num');
        timer.id = 'rewardedTimer';
        timer.setAttribute('role', 'timer');
        timer.setAttribute('aria-live', 'off');
        frame.appendChild(timer);

        var progress = mk('div', 'ms-progress');
        var fill = mk('div', 'ms-progress__fill');
        progress.appendChild(fill);
        frame.appendChild(progress);

        frame.appendChild(mk('p', 'ms-demo-note',
          'To atrapa. Nie odtwarzamy żadnego materiału z sieci, nie mierzymy oglądalności i nie wysyłamy ' +
          'nic poza to urządzenie. Zamknięcie w dowolnym momencie nie ma żadnych konsekwencji.'));
        body.appendChild(frame);

        var foot = sheet.querySelector('.ms-sheet__foot');
        if (!foot) {
          foot = mk('div', 'ms-sheet__foot');
          sheet.appendChild(foot);
        }
        clear(foot);

        var skip = button('rewardedSkip', 'ms-btn ms-btn--filled ms-btn--block', 'Odbierz nagrodę', function () {
          finish(true);
        });
        skip.disabled = true;
        foot.appendChild(skip);

        // Always available, from the first frame. A close button that appears
        // only after a countdown is the pattern this app refuses to imitate.
        foot.appendChild(button('rewardedClose', 'ms-btn ms-btn--text ms-btn--block', 'Zamknij bez nagrody', function () {
          finish(false);
        }));

        function paint() {
          var elapsed = Date.now() - startedAt;
          var left = Math.max(0, Math.ceil((duration - elapsed) / 1000));
          setText(timer, left > 0 ? 'Pozostało ' + left + ' s' : 'Nagroda gotowa do odebrania');
          var pct = Math.min(100, (elapsed / duration) * 100);
          // Contract token from the visual system: --ms-fill is a 0..100 number.
          fill.style.setProperty('--ms-fill', String(Math.round(pct)));
          if (elapsed >= skipAfter && skip.disabled) {
            skip.disabled = false;
            announce('Możesz odebrać nagrodę.');
          }
          if (elapsed >= duration) {
            global.clearInterval(ticker);
            ticker = null;
          }
        }

        function finish(claim) {
          if (settled) return;
          settled = true;
          if (ticker !== null) {
            global.clearInterval(ticker);
            ticker = null;
          }
          var uu = ui();
          if (uu && typeof uu.closeSheet === 'function') uu.closeSheet('sheetRewarded', { claimed: claim });

          var watched = Date.now() - startedAt;
          if (!claim || watched < skipAfter) {
            resolve({
              ok: false, cancelled: true, grantedMs: 0,
              messagePL: 'Zamknięto bez nagrody. Nic nie tracisz — pomiar działa tak samo.'
            });
            return;
          }

          adsState.rewardsUsed += 1;
          adsState.lastRewardAt = Date.now();
          adsPersist();
          Store.grantTemporary(featureId, Ads.REWARD_MS, 'reward');
          emit('ads:reward', { featureId: featureId, ms: Ads.REWARD_MS });
          resolve({
            ok: true, cancelled: false, grantedMs: Ads.REWARD_MS,
            messagePL: (feature ? feature.namePL : featureId) + ' — odblokowane na 24 godziny (DEMO).'
          });
        }

        paint();
        // The counter is information, not decoration, so it keeps running under
        // prefers-reduced-motion; only the pulsing would have been dropped and
        // there is none here.
        ticker = global.setInterval(paint, reducedMotion() ? 500 : 250);
        /* Escape and a tap on the scrim close the sheet without going through
           either footer button, which left this interval running for the life
           of the tab — repainting a detached node four times a second — and
           left the promise unsettled, so the paywall's .then() never ran.
           finish() already guards against being called twice. */
        once('ui:sheetclose', function (d) {
          if (d && d.sheetId === 'sheetRewarded') finish(false);
        });
        u.openSheet('sheetRewarded', { focusId: 'rewardedClose', dismissible: true });
      });
    });
  };

  /* ==================================================================
     Wiring
     ================================================================== */

  function renderAll() {
    renderAccountPanel();
    renderPremiumPanel();
    Ads.refresh();
  }

  function init() {
    accountLoad();
    billingLoad();
    adsLoad();
    recompute(true);
    renderAll();

    // The shell built its tiles, its table header and its range segment before
    // this module had read a single receipt, and it only ever relearns the
    // answer from store:entitlements. recompute(true) is silent by design (the
    // minute timer must not shout), so on a reload with Premium active nothing
    // ever unlocked. One explicit announcement at start-up closes that gap; it
    // is idempotent, so a listener that has already got it does no work.
    emit('store:entitlements', { entitlements: Store.entitlements(), tier: Store.tier() });

    // A temporary reward expires on the clock, not on a page reload; a minute
    // is precise enough for a 24 h grant and costs nothing.
    global.setInterval(function () { recompute(); }, MINUTE_MS);
  }

  on('app:ready', init);

  on('store:paywall', function (data) {
    // Chapter 12.1: the paywall has exactly one owner. Viz and Tools ask
    // Store.requireFeature() and stop; they never open a sheet themselves.
    openPaywall(data && data.featureId, data && data.context);
  });

  on('store:entitlements', function () {
    Ads.refresh();
    renderPremiumPanel();
    renderAccountPanel();
  });

  on('account:signedin', function () {
    // "Purchases follow the account" — in the simulation that means re-reading
    // the receipts already on the device. It grants nothing new by itself.
    Store.restore().then(function () { renderAccountPanel(); });
  });

  on('engine:started', function () {
    // Ads step aside for the whole duration of a measurement.
    Ads.hideAll();
    scheduleTeaser();
  });

  on('engine:stopped', function () {
    clearTeaser();
    Ads.refresh();
  });

  on('ui:viewchange', function () {
    Ads.refresh();
  });

  /* ------------------------------------------------------------------
     Publication
     ------------------------------------------------------------------ */

  global.Account = Account;
  global.Store = Store;
  global.Ads = Ads;

}(typeof window !== 'undefined' ? window : globalThis));
