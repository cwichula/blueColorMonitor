/* Monitor Światła v3 — offer.js — modules 10 (Premium) and 11 (Konto).
 *
 * Everything in this file is a SIMULATION and says so on every surface it
 * draws: an overline, a dashed 2 px frame in --ms3-demo and the mandatory
 * sentence from DESIGN.md 8.7. There is no network call, no payment field, no
 * third-party logo and no third-party sign-in anywhere in this file — grep for
 * `fetch`, `XMLHttpRequest`, `img` or `Google` and you will find nothing.
 *
 * The construction defended in 8.7, and the reason this file is honest:
 * the engine computes all seven quantities for everyone, all the time. The
 * verdict on the dashboard is therefore always based on all seven — including
 * the three that show "———". What the simulated package changes is one thing
 * only: whether those three show their NUMBER. That sentence stands on the
 * Premium screen, is repeated in the offer sheet, and is the reason unlocking
 * works instantly and offline: nothing has to be computed that was not being
 * computed already.
 *
 * Public API (dash.js and the modules ask, they never read storage):
 *   Offer.hasPremium()            -> bool
 *   Offer.isUnlocked(metricId)    -> bool   (free metrics are always true)
 *   Offer.openSheet(metricId)     -> opens the offer sheet (dash.js calls this)
 *   Offer.openOffer(metricId)     -> alias, dash.js probes several names
 *   Offer.account()               -> { email } | null
 *   Offer.grant(planId) / Offer.revoke() / Offer.signIn(email) / Offer.signOut()
 * Every change emits `offer:changed` on the bus; dash.js repaints the strip.
 */
(function (global) {
  'use strict';

  var doc = global.document;

  /* ------------------------------------------------------------------
     Constants
     ------------------------------------------------------------------ */

  var STORE_KEY = 'ms3.entitlement.v1';

  // The three paid quantities, in catalogue order. Read from the catalogue at
  // use time so that a metric changing its `premium` flag needs no edit here.
  function paidMetrics() {
    var out = [];
    var cat = (global.Metrics && global.Metrics.CATALOGUE) || [];
    for (var i = 0; i < cat.length; i += 1) if (cat[i].premium) out.push(cat[i]);
    return out;
  }

  function freeMetrics() {
    var out = [];
    var cat = (global.Metrics && global.Metrics.CATALOGUE) || [];
    for (var i = 0; i < cat.length; i += 1) if (!cat[i].premium) out.push(cat[i]);
    return out;
  }

  /* ------------------------------------------------------------------
     Wording

     Chapter 8 fixes the three mandatory sentences of a simulation screen
     (8.7) but not the rest of an offer. Instead of scattering Polish
     literals through this module — which rule 6 forbids and which would put
     the wording in two homes — the missing sentences are registered into
     Scale.TEXT under keys this file owns. Every string below is then read
     back through T(), exactly like dash.js reads chapter 8.
     ------------------------------------------------------------------ */

  function installText() {
    var S = global.Scale;
    if (!S || !S.TEXT || S.TEXT.offer) return;

    S.TEXT.offer = {
      whatTitle: 'Co odblokowuje pakiet',
      whatText: 'Trzy z siedmiu wielkości pokazują dziś kreski i kłódkę zamiast liczby. Pakiet pokazuje ich liczby. Nic poza tym się nie zmienia.',
      metricsTitle: 'Trzy wielkości w pakiecie',
      freeTitle: 'Co działa bez opłaty',
      freeList: [
        'Wielka liczba, skala z podziałką i zdanie oceny na pulpicie.',
        'Cztery wielkości z liczbami: udział niebieskiego, jasność sceny, temperatura barwowa i wpływ na rytm dobowy.',
        'Rejestrator, progi, kalibracja, raporty, eksport i cała historia pomiarów.',
        'Ocena i werdykt liczone ze wszystkich siedmiu wielkości — także z tych trzech płatnych.'
      ],
      plansTitle: 'Warianty (symulacja)',
      planMonth: 'Miesięcznie',
      planYear: 'Rocznie',
      priceMonth: '9,99 zł',
      priceYear: '79,99 zł',
      pricePer: 'za okres rozliczeniowy',
      buyTpl: 'Włącz pakiet — {plan} (symulacja)',
      confirmTitle: 'Potwierdzenie zakupu (symulacja)',
      confirmTextTpl: 'Włączyć pakiet w wariancie „{plan}” za {price}? To symulacja: nic nie zostanie pobrane, nie ma tu pola na dane karty, a pakiet wyłączysz jednym klawiszem na tym samym ekranie.',
      confirmKey: 'Włącz (symulacja)',
      stateTitle: 'Stan pakietu',
      stateOn: 'Pakiet jest włączony — symulacja',
      stateOff: 'Pakiet jest wyłączony',
      sinceTpl: 'Włączony {date}, wariant „{plan}”.',
      revoke: 'Wyłącz pakiet (symulacja)',
      granted: 'Pakiet Premium włączony (symulacja).',
      revoked: 'Pakiet Premium wyłączony.',
      noPayment: 'Nie ma tu pola na numer karty ani na żadne dane płatnicze — nie da się ich wpisać, bo takiego pola w tej aplikacji nie ma.',
      noLogos: 'Nie ma tu logowania przez Google ani przez Facebooka i nie ma integracji z żadnym systemem płatności. Cała transakcja jest zapisem jednej wartości w pamięci tej przeglądarki.',
      sheetTitle: 'Ta liczba jest w pakiecie Premium',
      sheetLeadTpl: '„{name}” pokazuje kreski, bo jej liczba należy do pakietu. Ocena światła poniżej liczy tę wielkość tak samo jak pozostałe i działa bez opłaty.',
      sheetOpen: 'Zobacz cały opis pakietu',
      unlockedNoteTpl: '„{name}” jest już odblokowana.'
    };

    S.TEXT.account = {
      leadTitle: 'Logowanie',
      signedOut: 'Nie jesteś zalogowany.',
      signedInTpl: 'Zalogowany jako {email}.',
      emailLabel: 'Adres e-mail',
      passwordLabel: 'Hasło',
      emailHint: 'Adres zostaje w pamięci przeglądarki na tym urządzeniu.',
      passwordHint: 'Hasło nie jest nigdzie zapisywane ani z niczym porównywane — pole jest tu po to, żeby ekran wyglądał jak ekran logowania.',
      signIn: 'Zaloguj (symulacja)',
      signOut: 'Wyloguj',
      needEmail: 'Wpisz cokolwiek w polu adresu — symulacja przyjmie każdy wpis.',
      toastIn: 'Zalogowano (symulacja).',
      toastOut: 'Wylogowano.',
      whatFor: 'Konto nie daje w tej aplikacji żadnych uprawnień. Pomiary, progi i historia leżą w pamięci tej przeglądarki i są dostępne bez logowania.',
      noProviders: 'Nie ma tu logowania przez Google ani przez Facebooka. Nie wysyłamy adresu nigdzie — nie ma dokąd, aplikacja nie wykonuje żadnych zapytań sieciowych.'
    };
  }

  installText();

  var warned = {};

  function resolve(path) {
    var table = global.Scale && global.Scale.TEXT;
    if (!table) return null;
    var parts = path.split('.');
    var node = table;
    for (var i = 0; i < parts.length; i += 1) {
      if (node === null || typeof node !== 'object') return null;
      node = node[parts[i]];
    }
    return node;
  }

  function fill(tpl, vars) {
    if (!vars) return tpl;
    return tpl.replace(/\{(\w+)\}/g, function (whole, key) {
      return Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : whole;
    });
  }

  // A missing key is a broken build, not a user error: it warns once in English
  // in the console and renders nothing. It never becomes an invented sentence.
  function T(path, vars) {
    var found = resolve(path);
    if (typeof found !== 'string') {
      if (!warned[path]) {
        warned[path] = true;
        if (global.console && global.console.warn) {
          global.console.warn('offer.js: Scale.TEXT has no "' + path + '"');
        }
      }
      return '';
    }
    return fill(found, vars);
  }

  function TLIST(path) {
    var found = resolve(path);
    return (found && found.length) ? found : [];
  }

  /* ------------------------------------------------------------------
     Tiny DOM helpers — the same shapes dash.js uses
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

  function clear(node) {
    if (!node) return;
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  // Rule 5: every interactive element is a real <button type="button">.
  function keyBtn(labelPL, cls) {
    var btn = make('button', 'ms3-key' + (cls ? ' ' + cls : ''));
    btn.type = 'button';
    put(btn, make('span', 'ms3-key__label', labelPL));
    return btn;
  }

  function note(variant, titlePL, textPL) {
    var box = make('aside', 'ms3-note ms3-note--' + variant);
    put(box, make('span', 'ms3-note__title', titlePL));
    put(box, make('p', 'ms3-note__text', textPL));
    return box;
  }

  function section(titlePL) {
    var sec = make('section', 'ms3-screen__section');
    if (titlePL) put(sec, make('h2', '', titlePL));
    return sec;
  }

  function bulletList(items) {
    var ul = make('ul', 'ms3-list');
    for (var i = 0; i < items.length; i += 1) put(ul, make('li', 'ms3-list__item', items[i]));
    return ul;
  }

  function toast(textPL) {
    if (textPL && global.UI3 && typeof global.UI3.toast === 'function') global.UI3.toast(textPL);
  }

  /* ------------------------------------------------------------------
     Entitlement store — one key, every access guarded (7.7)
     ------------------------------------------------------------------ */

  var state = null;

  function blank() {
    return { premium: false, plan: null, since: null, email: null };
  }

  function readState() {
    var out = blank();
    var raw = null;
    try {
      if (global.localStorage) raw = global.localStorage.getItem(STORE_KEY);
    } catch (_) { raw = null; }          // private mode throws on read as well
    if (!raw) return out;
    var parsed = null;
    try { parsed = JSON.parse(raw); } catch (_) { parsed = null; }
    if (!parsed || typeof parsed !== 'object') return out;
    out.premium = parsed.premium === true;
    out.plan = typeof parsed.plan === 'string' ? parsed.plan : null;
    out.since = typeof parsed.since === 'number' ? parsed.since : null;
    out.email = typeof parsed.email === 'string' ? parsed.email : null;
    return out;
  }

  function ensure() {
    if (!state) state = readState();
    return state;
  }

  function writeState() {
    try {
      if (global.localStorage) global.localStorage.setItem(STORE_KEY, JSON.stringify(ensure()));
    } catch (_) { /* the session still works, it just forgets after a reload */ }
  }

  function announceChange(reason) {
    if (global.Bus && typeof global.Bus.emit === 'function') {
      global.Bus.emit('offer:changed', { premium: ensure().premium, reason: reason });
    }
    renderAll();
  }

  /* ------------------------------------------------------------------
     Plans — data, so the screen and the confirmation read the same row
     ------------------------------------------------------------------ */

  function plans() {
    return [
      { id: 'month', namePL: T('offer.planMonth'), pricePL: T('offer.priceMonth') },
      { id: 'year', namePL: T('offer.planYear'), pricePL: T('offer.priceYear') }
    ];
  }

  function planById(id) {
    var list = plans();
    for (var i = 0; i < list.length; i += 1) if (list[i].id === id) return list[i];
    return null;
  }

  /* Polish date, digits only — no month names to translate and no dependency
     on the browser's locale data being present. */
  function dateWords(ms) {
    if (typeof ms !== 'number' || !isFinite(ms)) return '';
    var d = new Date(ms);
    function two(n) { return (n < 10 ? '0' : '') + n; }
    return two(d.getDate()) + '.' + two(d.getMonth() + 1) + '.' + d.getFullYear();
  }

  /* ------------------------------------------------------------------
     Public API
     ------------------------------------------------------------------ */

  var Offer = {};

  Offer.hasPremium = function () { return ensure().premium === true; };

  Offer.isUnlocked = function (metricId) {
    var m = global.Metrics && global.Metrics.byId ? global.Metrics.byId(metricId) : null;
    if (!m) return false;
    if (!m.premium) return true;
    return Offer.hasPremium();
  };

  Offer.grant = function (planId) {
    var s = ensure();
    s.premium = true;
    s.plan = planById(planId) ? planId : 'month';
    s.since = Date.now();
    writeState();
    announceChange('grant');
    return true;
  };

  Offer.revoke = function () {
    var s = ensure();
    s.premium = false;
    s.plan = null;
    s.since = null;
    writeState();
    announceChange('revoke');
    return true;
  };

  Offer.account = function () {
    var s = ensure();
    return s.email ? { email: s.email } : null;
  };

  Offer.signIn = function (email) {
    var value = String(email || '').replace(/^\s+|\s+$/g, '');
    if (!value) return false;
    ensure().email = value;
    writeState();
    announceChange('signIn');
    return true;
  };

  Offer.signOut = function () {
    ensure().email = null;
    writeState();
    announceChange('signOut');
    return true;
  };

  /* ------------------------------------------------------------------
     The simulation frame — 8.7 and 5.11

     Every surface this file draws starts with it: the overline "Symulacja",
     a dashed 2 px border in --ms3-demo and the mandatory sentence. The frame
     is a container, so nothing this module renders can escape it.
     ------------------------------------------------------------------ */

  function demoFrame(host) {
    var frame = put(host, make('div', 'ms3-demoframe'));
    var head = put(frame, make('div', 'ms3-demoframe__head'));
    put(head, make('span', 'ms3-demoframe__overline', T('demo.overline')));
    put(head, make('span', 'ms3-badge ms3-badge--demo', T('demo.overline')));
    put(frame, make('p', 'ms3-demoframe__oath', T('demo.simulation')));
    return put(frame, make('div', 'ms3-demoframe__body'));
  }

  /* ------------------------------------------------------------------
     Module 10 — Premium
     ------------------------------------------------------------------ */

  var premiumView = null;

  function buildPremium(root) {
    var body = demoFrame(root);

    // The sentence that defends the construction (8.7). It stands FIRST, above
    // anything that could be read as a sales pitch, and it is not collapsible.
    put(body, note('limits', T('demo.overline'), T('demo.fairness')));

    var what = put(body, section(T('offer.whatTitle')));
    put(what, make('p', '', T('offer.whatText')));

    var metrics = put(body, section(T('offer.metricsTitle')));
    var paid = paidMetrics();
    var list = make('div', 'ms3-doc');
    for (var i = 0; i < paid.length; i += 1) {
      var m = paid[i];
      var item = put(list, make('div', 'ms3-doc__item'));
      var head = put(item, make('div', 'ms3-doc__head'));
      put(head, make('h3', 'ms3-doc__title', m.namePL));
      put(head, make('span', 'ms3-badge ms3-badge--premium', T('channels.badgePremium')));
      put(item, make('p', 'ms3-doc__text', m.shortPL));
      put(item, make('p', 'ms3-doc__text', m.helpPL));
    }
    put(metrics, list);

    var free = put(body, section(T('offer.freeTitle')));
    put(free, bulletList(TLIST('offer.freeList')));

    // State + plans + keys. Redrawn whenever the entitlement changes, so the
    // screen never shows a stale "Włącz" next to an active package.
    var live = put(body, make('div', 'ms3-screen__section'));

    put(body, note('limits', T('note.titleLimits'), T('offer.noPayment')));
    put(body, note('limits', T('note.titleLimits'), T('offer.noLogos')));

    premiumView = { live: live };
    renderPremium();
  }

  function renderPremium() {
    if (!premiumView || !premiumView.live) return;
    var host = premiumView.live;
    clear(host);

    var s = ensure();

    put(host, make('h2', '', T('offer.stateTitle')));

    var stamp = put(host, make('p', 'ms3-stamp ms3-stamp--' + (s.premium ? 'good' : 'none')));
    put(stamp, make('span', 'ms3-shape ms3-shape--' + (s.premium ? 'good' : 'none')));
    put(stamp, make('span', 'ms3-stamp__word', s.premium ? T('offer.stateOn') : T('offer.stateOff')));

    if (s.premium) {
      var plan = planById(s.plan);
      put(host, make('p', 'ms3-context', T('offer.sinceTpl', {
        date: dateWords(s.since),
        plan: plan ? plan.namePL : ''
      })));
      var off = put(host, keyBtn(T('offer.revoke'), 'ms3-key--demo ms3-plan'));
      off.addEventListener('click', function () {
        Offer.revoke();
        toast(T('offer.revoked'));
      });
      return;
    }

    put(host, make('p', 'ms3-legend', T('offer.plansTitle')));
    var rows = plans();
    for (var i = 0; i < rows.length; i += 1) {
      put(host, planKey(rows[i]));
    }
  }

  function planKey(plan) {
    var btn = make('button', 'ms3-key ms3-key--demo ms3-plan');
    btn.type = 'button';
    put(btn, make('span', 'ms3-key__label', T('offer.buyTpl', { plan: plan.namePL })));
    put(btn, make('span', 'ms3-plan__price', plan.pricePL));
    btn.addEventListener('click', function () { openConfirm(plan.id); });
    return btn;
  }

  /* ------------------------------------------------------------------
     The purchase confirmation sheet (chapter 3) — a simulation, with no
     field into which a card number could be typed.
     ------------------------------------------------------------------ */

  function openConfirm(planId) {
    var plan = planById(planId);
    if (!plan) return;
    if (!global.UI3 || typeof global.UI3.openSheet !== 'function') return;

    global.UI3.openSheet({
      titlePL: T('offer.confirmTitle'),
      build: function (body) {
        var frame = demoFrame(body);
        put(frame, make('p', '', T('offer.confirmTextTpl', {
          plan: plan.namePL,
          price: plan.pricePL
        })));
        put(frame, note('limits', T('note.titleLimits'), T('offer.noPayment')));

        var keys = put(frame, make('div', 'ms3-keyrow'));
        var yes = put(keys, keyBtn(T('offer.confirmKey'), 'ms3-key--demo'));
        yes.addEventListener('click', function () {
          Offer.grant(plan.id);
          global.UI3.closeSheet();
          toast(T('offer.granted'));
        });
        var no = put(keys, keyBtn(T('common.cancel'), 'ms3-key--ghost'));
        no.addEventListener('click', function () { global.UI3.closeSheet(); });
      }
    });
  }

  /* ------------------------------------------------------------------
     The offer sheet — what dash.js opens when a locked row is touched
     ------------------------------------------------------------------ */

  Offer.openSheet = function (metricId) {
    if (!global.UI3 || typeof global.UI3.openSheet !== 'function') return;
    var m = global.Metrics && global.Metrics.byId ? global.Metrics.byId(metricId) : null;

    global.UI3.openSheet({
      titlePL: T('offer.sheetTitle'),
      build: function (body) {
        var frame = demoFrame(body);

        if (m && Offer.isUnlocked(m.id)) {
          put(frame, make('p', '', T('offer.unlockedNoteTpl', { name: m.namePL })));
        } else if (m) {
          put(frame, make('p', '', T('offer.sheetLeadTpl', { name: m.namePL })));
        }

        // The fairness sentence appears here too: this sheet is the surface a
        // user meets first, long before the module behind it.
        put(frame, note('limits', T('demo.overline'), T('demo.fairness')));

        var paid = paidMetrics();
        var names = [];
        for (var i = 0; i < paid.length; i += 1) names.push(paid[i].namePL);
        put(frame, make('p', 'ms3-context', names.join(T('common.sep'))));

        var keys = put(frame, make('div', 'ms3-keyrow'));
        var open = put(keys, keyBtn(T('offer.sheetOpen'), 'ms3-key--demo'));
        open.addEventListener('click', function () {
          // The shell replaces the sheet layer with the module, so one press of
          // "back" lands on the dashboard and never on an orphaned sheet.
          if (typeof global.UI3.openScreen === 'function') global.UI3.openScreen('10');
        });
        var close = put(keys, keyBtn(T('common.close'), 'ms3-key--ghost'));
        close.addEventListener('click', function () { global.UI3.closeSheet(); });
      }
    });
  };

  Offer.openOffer = Offer.openSheet;

  /* ------------------------------------------------------------------
     Module 11 — Konto
     ------------------------------------------------------------------ */

  var accountView = null;

  function buildAccount(root) {
    var body = demoFrame(root);

    put(body, note('limits', T('demo.overline'), T('demo.account')));

    var live = put(body, make('div', 'ms3-screen__section'));

    put(body, note('limits', T('note.titleLimits'), T('account.whatFor')));
    put(body, note('limits', T('note.titleLimits'), T('account.noProviders')));

    accountView = { live: live };
    renderAccount();
  }

  function renderAccount() {
    if (!accountView || !accountView.live) return;
    var host = accountView.live;
    clear(host);

    var acc = Offer.account();
    put(host, make('h2', '', T('account.leadTitle')));

    if (acc) {
      var stamp = put(host, make('p', 'ms3-stamp ms3-stamp--good'));
      put(stamp, make('span', 'ms3-shape ms3-shape--good'));
      put(stamp, make('span', 'ms3-stamp__word', T('account.signedInTpl', { email: acc.email })));

      var out = put(host, keyBtn(T('account.signOut'), 'ms3-key--ghost'));
      out.addEventListener('click', function () {
        Offer.signOut();
        toast(T('account.toastOut'));
      });
      return;
    }

    var none = put(host, make('p', 'ms3-stamp ms3-stamp--none'));
    put(none, make('span', 'ms3-shape ms3-shape--none'));
    put(none, make('span', 'ms3-stamp__word', T('account.signedOut')));

    var mailField = put(host, make('div', 'ms3-field'));
    var mailId = 'ms3AccountEmail';
    var mailLabel = put(mailField, make('label', 'ms3-field__label', T('account.emailLabel')));
    mailLabel.setAttribute('for', mailId);
    var mail = put(mailField, make('input', 'ms3-field__input'));
    mail.type = 'email';
    mail.id = mailId;
    mail.autocomplete = 'off';
    put(mailField, make('p', 'ms3-field__hint', T('account.emailHint')));

    var passField = put(host, make('div', 'ms3-field'));
    var passId = 'ms3AccountPass';
    var passLabel = put(passField, make('label', 'ms3-field__label', T('account.passwordLabel')));
    passLabel.setAttribute('for', passId);
    var pass = put(passField, make('input', 'ms3-field__input'));
    pass.type = 'password';
    pass.id = passId;
    pass.autocomplete = 'off';
    put(passField, make('p', 'ms3-field__hint', T('account.passwordHint')));

    var go = put(host, keyBtn(T('account.signIn'), 'ms3-key--demo'));
    go.addEventListener('click', function () {
      // The password is read by nobody, here or anywhere else: any address is
      // accepted, and only the address is remembered.
      if (!Offer.signIn(mail.value)) {
        toast(T('account.needEmail'));
        try { mail.focus(); } catch (_) {}
        return;
      }
      toast(T('account.toastIn'));
    });
  }

  /* ------------------------------------------------------------------
     Repaint on every entitlement change, whoever caused it
     ------------------------------------------------------------------ */

  function renderAll() {
    renderPremium();
    renderAccount();
  }

  /* ------------------------------------------------------------------
     Registration — at parse time, so the module index sees both entries the
     first time it is opened (the shell builds it from the registry).
     ------------------------------------------------------------------ */

  function register() {
    if (!global.UI3 || typeof global.UI3.registerModule !== 'function') return;
    var meta = (global.Scale && global.Scale.TEXT && global.Scale.TEXT.modules) || {};

    global.UI3.registerModule({
      no: '10',
      titlePL: (meta['10'] && meta['10'].titlePL) || '',
      descPL: (meta['10'] && meta['10'].descPL) || '',
      build: buildPremium
    });

    global.UI3.registerModule({
      no: '11',
      titlePL: (meta['11'] && meta['11'].titlePL) || '',
      descPL: (meta['11'] && meta['11'].descPL) || '',
      build: buildAccount
    });
  }

  if (global.UI3) register();
  else if (global.Bus && typeof global.Bus.once === 'function') global.Bus.once('app:ready', register);

  global.Offer = Offer;

}(window));
