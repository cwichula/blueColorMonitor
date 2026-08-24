/* screen-account.js — ekran KONTO (#/account).
 *
 * ROLA PLIKU. Trzy rzeczy w jednym miejscu, bo wszystkie trzy dotyczą tego,
 * kim jesteś i jak aplikacja ma wyglądać:
 *   1. profil i logowanie (arkusz z dostawcami, tryb demonstracyjny),
 *   2. subskrypcja i PAYWALL — arkusz pełnoekranowy, który reszta aplikacji
 *      otwiera przez Billing.openPaywall(); podpinamy go tu przez
 *      Billing.registerPaywall(), bo billing.js z założenia nie zna DOM,
 *   3. ustawienia: motyw, paleta, tekst, ruch, pomiar, dane, o aplikacji.
 *
 * Zasady, które ten plik trzyma świadomie:
 *   — ani jednego polskiego literału: każde zdanie pochodzi z UI.T albo Scale.TEXT;
 *   — ani jednego koloru: jedyne wartości barwne to próbki palet z Store.ACCENTS,
 *     wstawiane inline w gradient dysku, bo próbka musi pokazać kolor, którego
 *     akurat nie ma na ekranie (rozdział 5.K specyfikacji);
 *   — żadnego pola na dane karty i żadnego licznika czasu na paywallu;
 *   — ten ekran nie słucha engine:sample, więc nie ma tu gorącej ścieżki 5 Hz.
 */
(function () {
  'use strict';

  var VIEW_ID = 'account';

  /* Ikony siedmiu wielkości — załącznik B specyfikacji. */
  var METRIC_ICON = {
    share: 'droplet',
    brightness: 'sun',
    kelvin: 'thermometer',
    melanopic: 'moon',
    flicker: 'waveform',
    uniformity: 'grid',
    comfort: 'eye'
  };

  /* Kolejność dostawców jest wiążąca (zadanie B): Google, Facebook, Apple, e-mail. */
  var PROVIDER_ORDER = ['google', 'facebook', 'apple', 'email'];
  var PROVIDER_ICON = {
    google: 'brand-google',
    facebook: 'brand-facebook',
    apple: 'brand-apple',
    email: 'brand-mail'
  };
  var PROVIDER_TEXT = {
    google: 'auth.google',
    facebook: 'auth.facebook',
    apple: 'auth.apple',
    email: 'auth.email'
  };

  var THEME_TEXT = {
    system: 'account.themeSystem',
    light: 'account.themeLight',
    dark: 'account.themeDark'
  };

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var DAY_MS = 24 * 60 * 60 * 1000;
  var LONG_STEP_MS = 5000; /* engine.js zapisuje jeden punkt historii na 5 s */

  /* Węzły, które odświeżamy bez przebudowy całego ekranu — inaczej klikanie
     przełącznika gubiłoby fokus. */
  var refs = {
    profileHost: null,
    subHost: null,
    settingsHost: null,
    swatches: {},
    themes: {},
    leadValue: null,
    historyValue: null
  };
  var offs = [];
  var built = false;

  /* ------------------------------------------------------------------ */
  /* Słowniki i drobne narzędzia                                         */
  /* ------------------------------------------------------------------ */

  /** Odczyt ze słownika po ścieżce „a.b.c”. Brak klucza to pusty napis,
   *  nigdy wyjątek — ekran ma działać nawet z niepełnym UI.T. */
  function T(path, fallbackPath) {
    var value = read(window.UI && window.UI.T, path);
    if (!value && fallbackPath) value = read(window.UI && window.UI.T, fallbackPath);
    return value || '';
  }

  function read(rootObj, path) {
    if (!rootObj || !path) return '';
    var parts = path.split('.');
    var cur = rootObj;
    for (var i = 0; i < parts.length; i += 1) {
      if (cur === null || typeof cur !== 'object') return '';
      cur = cur[parts[i]];
    }
    return typeof cur === 'string' ? cur : '';
  }

  function S(path) {
    return read(window.Scale && window.Scale.TEXT, path);
  }

  function fill(template, map) {
    if (!template) return '';
    if (window.Scale && typeof Scale.fill === 'function') return Scale.fill(template, map);
    return template;
  }

  function el(tag, className, text) {
    return UI.el(tag, className, text);
  }

  function icon(name, size) {
    return UI.icon(name, size);
  }

  function on(node, event, fn) {
    return UI.on(node, event, fn);
  }

  /** UI.card / UI.sheet oddają obiekt, UI.button i UI.row — węzeł.
   *  Ta funkcja sprowadza jedno i drugie do węzła. */
  function nodeOf(x) {
    if (!x) return null;
    if (x.nodeType === 1) return x;
    if (x.root && x.root.nodeType === 1) return x.root;
    return null;
  }

  function button(spec) {
    return nodeOf(UI.button(spec));
  }

  function toast(text, tone) {
    if (text) UI.toast(text, tone);
  }

  /** UI.dialog oddaje obietnicę; ta funkcja przyjmuje też wynik natychmiastowy,
   *  żeby jedna implementacja okna nie wywracała całego ekranu. */
  function ask(spec, fn) {
    var result = UI.dialog(spec);
    if (result && typeof result.then === 'function') result.then(fn);
    else fn(!!result);
  }

  function dangerRow(spec) {
    var row = nodeOf(UI.row(spec));
    if (row) row.classList.add('ms4-row--danger');
    return row;
  }

  function settings() {
    return (window.Store && Store.get()) || {};
  }

  function isPremium() {
    return !!(window.Billing && Billing.isPremium());
  }

  function entitlement() {
    return (window.Billing && Billing.entitlement()) || null;
  }

  function trialDaysLeft() {
    var ent = entitlement();
    if (!ent || !ent.trialUntil) return 0;
    var left = Math.ceil((ent.trialUntil - Date.now()) / DAY_MS);
    return left > 0 ? left : 0;
  }

  function planById(id) {
    var plans = (window.Billing && Billing.PLANS) || [];
    for (var i = 0; i < plans.length; i += 1) if (plans[i].id === id) return plans[i];
    return null;
  }

  function providerName(id) {
    var list = (window.Auth && typeof Auth.providers === 'function') ? Auth.providers() : [];
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].id === id) return list[i].namePL || id;
    }
    return id || '';
  }

  function initialsOf(user) {
    if (!user) return '';
    if (user.initials) return user.initials;
    var source = (user.name || user.email || '').replace(/[^\p{L}\p{N} ]/gu, ' ');
    var parts = source.split(/\s+/);
    var out = '';
    for (var i = 0; i < parts.length && out.length < 2; i += 1) {
      if (parts[i]) out += parts[i].charAt(0).toUpperCase();
    }
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* Małe klocki wizualne                                                */
  /* ------------------------------------------------------------------ */

  function note(tone, iconName, title, text) {
    var root = el('div', 'ms4-note ms4-note--' + tone);
    var mark = icon(iconName, 20);
    mark.classList.add('ms4-note__icon');
    root.appendChild(mark);
    var body = el('div', 'ms4-row__text');
    if (title) body.appendChild(el('p', 'ms4-note__title', title));
    body.appendChild(el('p', 'ms4-note__text', text));
    root.appendChild(body);
    return root;
  }

  function demoBadgeRow(labelPath) {
    var row = el('div', 'ms4-row-inline');
    var badge = nodeOf(UI.badge({ label: T(labelPath), tone: 'demo' }));
    if (badge) row.appendChild(badge);
    return row;
  }

  function benefitRow(benefit) {
    var root = el('div', 'ms4-benefit');
    var mark = icon(benefit.icon, 20);
    mark.classList.add('ms4-benefit__icon');
    root.appendChild(mark);
    var body = el('div', 'ms4-row__text');
    body.appendChild(el('p', 'ms4-benefit__title', benefit.titlePL));
    if (benefit.textPL) body.appendChild(el('p', 'ms4-benefit__text', benefit.textPL));
    root.appendChild(body);
    return root;
  }

  function field(spec) {
    var wrap = el('div', 'ms4-stack');
    var id = 'ms4f-' + Math.random().toString(36).slice(2, 8);
    var label = el('label', 'ms4-field__label', spec.label);
    label.setAttribute('for', id);
    var input = el('input', 'ms4-field');
    input.id = id;
    input.type = spec.type || 'text';
    if (spec.value) input.value = spec.value;
    if (spec.autocomplete) input.setAttribute('autocomplete', spec.autocomplete);
    if (spec.inputmode) input.setAttribute('inputmode', spec.inputmode);
    wrap.appendChild(label);
    wrap.appendChild(input);
    if (spec.hint) wrap.appendChild(el('p', 'ms4-field__hint', spec.hint));
    return { root: wrap, input: input };
  }

  function errorLine() {
    var line = el('p', 'ms4-field__hint is-hidden');
    line.setAttribute('role', 'alert');
    return {
      root: line,
      show: function (text) {
        line.textContent = text;
        line.classList.remove('is-hidden');
      },
      clear: function () {
        line.textContent = '';
        line.classList.add('is-hidden');
      }
    };
  }

  function linksRow() {
    var row = el('div', 'ms4-row-inline ms4-center');
    row.appendChild(button({
      label: T('account.privacy'),
      variant: 'ghost',
      size: 'sm',
      icon: 'shield',
      onClick: function () { openTextSheet(T('account.privacy'), T('account.privacyText')); }
    }));
    var termsTitle = T('auth.termsTitle');
    if (termsTitle) {
      row.appendChild(button({
        label: termsTitle,
        variant: 'ghost',
        size: 'sm',
        icon: 'book',
        onClick: function () { openTextSheet(termsTitle, T('auth.terms')); }
      }));
    }
    return row;
  }

  function openTextSheet(title, text) {
    var body = el('div', 'ms4-stack');
    body.appendChild(el('p', 'ms4-card__subtitle', text));
    body.appendChild(note('demo', 'flask', S('note.titleDemo'), S('demo.simulation')));
    UI.sheet({ title: title, size: 'auto', body: body });
  }

  /* ------------------------------------------------------------------ */
  /* A. Nagłówek profilu                                                 */
  /* ------------------------------------------------------------------ */

  function renderProfile() {
    var host = refs.profileHost;
    if (!host) return;
    UI.clear(host);

    var user = (window.Auth && Auth.user()) || null;
    var card = el('section', 'ms4-card ms4-profile');

    var avatar = el('div', 'ms4-profile__avatar');
    if (user) {
      avatar.appendChild(el('span', 'ms4-profile__initials', initialsOf(user)));
    } else {
      avatar.appendChild(icon('account', 28));
    }
    card.appendChild(avatar);

    var text = el('div', 'ms4-row__text');
    var nameRow = el('div', 'ms4-row-inline');
    nameRow.appendChild(el('h2', 'ms4-profile__name', user ? (user.name || user.email) : T('account.signedOutName')));
    if (isPremium()) {
      var badge = nodeOf(UI.badge({ label: T('nav.premiumOn'), tone: 'premium' }));
      if (badge) {
        badge.classList.add('ms4-profile__badge');
        nameRow.appendChild(badge);
      }
    } else if (trialDaysLeft() > 0) {
      var trial = nodeOf(UI.badge({ label: fill(T('account.subTrialTpl'), { days: trialDaysLeft() }), tone: 'premium' }));
      if (trial) {
        trial.classList.add('ms4-profile__badge');
        nameRow.appendChild(trial);
      }
    }
    text.appendChild(nameRow);

    if (user) {
      var meta = fill(T('account.providerLabelTpl'), { provider: providerName(user.provider) });
      if (user.email) meta += ' · ' + user.email;
      text.appendChild(el('p', 'ms4-profile__mail', meta));
    } else {
      text.appendChild(el('p', 'ms4-profile__mail', T('account.signedOutSub')));
    }
    card.appendChild(text);

    var actions = el('div', 'ms4-profile__actions');
    if (user) {
      actions.appendChild(button({
        label: T('account.accountSheet', 'account.title'),
        variant: 'ghost',
        size: 'sm',
        icon: 'settings',
        onClick: openAccountSheet
      }));
    } else {
      actions.appendChild(button({
        label: T('account.signIn'),
        variant: 'primary',
        size: 'md',
        icon: 'user-plus',
        onClick: openSignInSheet
      }));
    }
    card.appendChild(actions);
    host.appendChild(card);
  }

  /** Arkusz zalogowanego konta: zmiana nazwy, wylogowanie, usunięcie konta. */
  function openAccountSheet() {
    var user = (window.Auth && Auth.user()) || null;
    if (!user) { openSignInSheet(); return; }

    var body = el('div', 'ms4-stack');
    body.appendChild(el('p', 'ms4-card__subtitle', T('account.nameSheetSub', 'auth.nameHint')));

    var nameField = field({
      label: T('auth.nameLabel'),
      value: user.name || '',
      autocomplete: 'nickname'
    });
    body.appendChild(nameField.root);

    var save = button({
      label: T('confirm.save'),
      variant: 'primary',
      size: 'md',
      full: true,
      onClick: function () {
        var value = nameField.input.value.replace(/^\s+|\s+$/g, '');
        if (window.Auth && typeof Auth.update === 'function') Auth.update({ name: value });
        toast(T('toast.saved'), 'good');
      }
    });
    body.appendChild(save);

    var list = el('div', 'ms4-list');
    list.appendChild(nodeOf(UI.row({
      icon: 'logout',
      title: T('account.signOut'),
      chevron: true,
      onClick: function () {
        ask({
          title: T('account.signOut'),
          text: T('account.signOutConfirm'),
          confirm: T('account.signOut'),
          cancel: T('confirm.cancel')
        }, function (ok) {
          if (!ok) return;
          if (window.Auth) Auth.signOut();
          toast(T('auth.signedOut'), 'info');
          sheet.close();
        });
      }
    })));
    list.appendChild(dangerRow({
      icon: 'trash',
      title: T('account.deleteAccount'),
      subtitle: T('account.deleteConfirm'),
      chevron: true,
      onClick: function () {
        ask({
          title: T('account.deleteAccount'),
          text: T('account.deleteConfirm'),
          confirm: T('confirm.delete'),
          cancel: T('confirm.cancel'),
          tone: 'danger'
        }, function (ok) {
          if (!ok) return;
          if (window.Auth) Auth.deleteAccount();
          toast(T('auth.deleted'), 'info');
          sheet.close();
        });
      }
    }));
    body.appendChild(list);
    body.appendChild(note('demo', 'flask', T('auth.demoBadge'), S('demo.account')));

    var sheet = UI.sheet({
      title: T('account.accountSheet', 'account.title'),
      subtitle: user.email || '',
      size: 'auto',
      body: body
    });
  }

  /* ------------------------------------------------------------------ */
  /* B. Logowanie                                                        */
  /* ------------------------------------------------------------------ */

  function openSignInSheet() {
    var closed = false;
    var body = el('div', 'ms4-stack');

    body.appendChild(demoBadgeRow('auth.demoBadge'));
    body.appendChild(note('demo', 'flask', '', T('auth.demoText')));
    body.appendChild(el('p', 'ms4-card__subtitle', T('auth.sub')));

    var stage = el('div', 'ms4-stack');
    body.appendChild(stage);

    var err = errorLine();
    body.appendChild(err.root);
    body.appendChild(el('p', 'ms4-paywall__fine', T('auth.terms')));
    body.appendChild(linksRow());

    var sheet = UI.sheet({
      title: T('auth.title'),
      subtitle: T('auth.sub'),
      size: 'auto',
      body: body,
      onClose: function () { closed = true; }
    });

    function finish(user) {
      if (closed) return;
      toast(fill(T('auth.doneTpl'), { name: (user && (user.name || user.email)) || '' }), 'good');
      sheet.close();
    }

    function failed(buttons) {
      for (var i = 0; i < buttons.length; i += 1) {
        buttons[i].classList.remove('is-loading');
        buttons[i].disabled = false;
      }
      err.show(T('error.unknown'));
    }

    function showProviders() {
      UI.clear(stage);
      err.clear();
      var list = el('div', 'ms4-providers');
      var buttons = [];
      var order = providerIds();

      for (var i = 0; i < order.length; i += 1) {
        (function (id) {
          var btn = el('button', 'ms4-provider ms4-provider--' + id);
          btn.type = 'button';
          var mark = icon(PROVIDER_ICON[id] || 'mail', 20);
          mark.classList.add('ms4-provider__icon');
          btn.appendChild(mark);
          btn.appendChild(el('span', 'ms4-provider__label', T(PROVIDER_TEXT[id] || 'auth.email')));
          on(btn, 'click', function () {
            if (id === 'email') { showEmailForm(); return; }
            err.clear();
            btn.classList.add('is-loading');
            for (var k = 0; k < buttons.length; k += 1) buttons[k].disabled = true;
            Auth.signIn(id).then(finish, function () { failed(buttons); });
          });
          buttons.push(btn);
          list.appendChild(btn);
        }(order[i]));
      }
      stage.appendChild(list);
    }

    function showEmailForm() {
      UI.clear(stage);
      err.clear();

      var form = el('form', 'ms4-authform');
      form.setAttribute('novalidate', 'novalidate');

      var mail = field({
        label: T('auth.emailLabel'),
        hint: T('auth.emailHint'),
        type: 'email',
        inputmode: 'email',
        autocomplete: 'email'
      });
      var pass = field({
        label: T('auth.passwordLabel', 'auth.emailLabel'),
        hint: T('auth.passwordHint', 'auth.terms'),
        type: 'password',
        autocomplete: 'new-password'
      });
      var who = field({
        label: T('auth.nameLabel'),
        hint: T('auth.nameHint'),
        autocomplete: 'nickname'
      });
      form.appendChild(mail.root);
      form.appendChild(pass.root);
      form.appendChild(who.root);

      /* Przycisk typu submit, obsługa wyłącznie w zdarzeniu formularza —
         inaczej kliknięcie wysłałoby formularz dwa razy. */
      var submit = button({
        label: T('auth.submit'),
        variant: 'primary',
        size: 'lg',
        full: true
      });
      submit.type = 'submit';
      form.appendChild(submit);

      form.appendChild(button({
        label: T('auth.back', 'confirm.cancel'),
        variant: 'ghost',
        size: 'sm',
        icon: 'chevron-left',
        full: true,
        onClick: showProviders
      }));

      on(form, 'submit', function (event) {
        event.preventDefault();
        send();
      });

      function send() {
        var address = mail.input.value.replace(/^\s+|\s+$/g, '');
        if (!address) { err.show(T('auth.emailEmpty')); mail.input.focus(); return; }
        if (!EMAIL_RE.test(address)) { err.show(T('auth.emailBad')); mail.input.focus(); return; }
        err.clear();
        submit.classList.add('is-loading');
        submit.disabled = true;
        /* Hasła nie przekazujemy nigdzie dalej — pole istnieje tylko po to,
           żeby formularz wyglądał jak prawdziwy, i mówi o tym podpowiedź. */
        Auth.signIn('email', { email: address, name: who.input.value.replace(/^\s+|\s+$/g, '') })
          .then(finish, function () { failed([submit]); });
      }

      stage.appendChild(form);
      mail.input.focus();
    }

    showProviders();
  }

  function providerIds() {
    var list = (window.Auth && typeof Auth.providers === 'function') ? Auth.providers() : [];
    var out = [];
    var i;
    for (i = 0; i < PROVIDER_ORDER.length; i += 1) {
      var wanted = PROVIDER_ORDER[i];
      for (var j = 0; j < list.length; j += 1) {
        if (list[j].id === wanted) { out.push(wanted); break; }
      }
    }
    return out.length ? out : PROVIDER_ORDER.slice(0);
  }

  /* ------------------------------------------------------------------ */
  /* C. Karta subskrypcji                                                */
  /* ------------------------------------------------------------------ */

  function renderSubscription() {
    var host = refs.subHost;
    if (!host) return;
    UI.clear(host);

    var pro = isPremium();
    var card = UI.card({
      title: T('account.subTitle'),
      className: pro ? 'ms4-subcard ms4-card--premium' : 'ms4-subcard'
    });
    var root = nodeOf(card);
    var body = card.body || root;

    /* Karta subskrypcji jest wejściem do zakupu — także przez „Zacznij 7 dni
       bez opłaty”, które nie otwiera paywalla. Plakietka musi więc stać tutaj,
       a nie dopiero w arkuszu ofert. */
    if (window.Billing && Billing.DEMO) body.appendChild(demoBadgeRow('paywall.badge'));

    body.appendChild(el('p', 'ms4-subcard__state', pro ? T('account.subPremium') : T('account.subFree')));
    body.appendChild(el('p', 'ms4-card__subtitle', pro ? T('account.subPremiumSub') : T('account.subFreeSub')));

    var days = trialDaysLeft();
    if (days > 0) {
      body.appendChild(el('p', 'ms4-card__subtitle', fill(T('account.subTrialTpl'), { days: days })));
    }

    if (pro) {
      var ent = entitlement();
      var plan = ent ? planById(ent.plan) : null;
      var meta = [];
      if (plan) meta.push(T('account.subPlan', 'account.subTitle') + ': ' + plan.namePL);
      if (ent && ent.since) meta.push(T('account.subSince', 'history.statTime') + ': ' + UI.fmtDate(ent.since));
      if (meta.length) body.appendChild(el('p', 'ms4-card__footer', meta.join(' · ')));

      var manage = button({
        label: T('account.subManage'),
        variant: 'ghost',
        size: 'sm',
        icon: 'settings',
        onClick: openManageSheet
      });
      manage.classList.add('ms4-subcard__cta');
      body.appendChild(manage);
    } else {
      var benefits = (window.Billing && Billing.benefits()) || [];
      var shown = el('div', 'ms4-stack');
      for (var i = 0; i < benefits.length && i < 3; i += 1) shown.appendChild(benefitRow(benefits[i]));
      body.appendChild(shown);

      var unlock = button({
        label: T('account.subUnlock'),
        variant: 'premium',
        size: 'md',
        full: true,
        icon: 'crown',
        onClick: function () { openPaywall({ source: 'account' }); }
      });
      unlock.classList.add('ms4-subcard__cta');
      body.appendChild(unlock);

      if (days === 0 && canStartTrial()) {
        body.appendChild(button({
          label: T('account.subTrialCta', 'paywall.ctaTrial'),
          variant: 'tonal',
          size: 'sm',
          full: true,
          icon: 'clock',
          onClick: startTrial
        }));
      }

      body.appendChild(button({
        label: T('account.subRestore'),
        variant: 'ghost',
        size: 'sm',
        full: true,
        icon: 'restore',
        onClick: doRestore
      }));

      // Zdanie stoi pod klawiszami, bo to one uruchamiają symulowany zakup.
      body.appendChild(el('p', 'ms4-card__footer', S('demo.simulation')));
    }

    host.appendChild(root);
  }

  function canStartTrial() {
    if (!window.Billing || typeof Billing.startTrial !== 'function') return false;
    var ent = entitlement();
    return !(ent && ent.trialUntil);
  }

  function startTrial() {
    Billing.startTrial();
    toast(T('paywall.trialStarted'), 'good');
  }

  function doRestore() {
    if (!window.Billing || typeof Billing.restore !== 'function') return;
    var result = Billing.restore();
    var done = function () {
      toast(isPremium() ? T('paywall.restoredOn') : T('paywall.restoredOff'), isPremium() ? 'good' : 'info');
    };
    if (result && typeof result.then === 'function') result.then(done, done);
    else done();
  }

  function openManageSheet() {
    var body = el('div', 'ms4-stack');
    var ent = entitlement();
    var plan = ent ? planById(ent.plan) : null;

    body.appendChild(demoBadgeRow('paywall.badge'));
    body.appendChild(el('p', 'ms4-subcard__state', T('account.subPremium')));
    body.appendChild(el('p', 'ms4-card__subtitle', T('account.subPremiumSub')));

    var list = el('div', 'ms4-list');
    if (plan) {
      list.appendChild(nodeOf(UI.row({
        icon: 'tag',
        title: T('account.subPlan', 'account.subTitle'),
        value: plan.namePL + ' · ' + plan.pricePL
      })));
    }
    if (ent && ent.since) {
      list.appendChild(nodeOf(UI.row({
        icon: 'calendar',
        title: T('account.subSince', 'history.statTime'),
        value: UI.fmtDate(ent.since)
      })));
    }
    var days = trialDaysLeft();
    if (days > 0) {
      list.appendChild(nodeOf(UI.row({
        icon: 'clock',
        title: T('paywall.ctaTrial'),
        value: fill(T('account.subTrialTpl'), { days: days })
      })));
    }
    body.appendChild(list);
    body.appendChild(note('demo', 'flask', '', T('paywall.fine')));

    var actions = el('div', 'ms4-stack');
    actions.appendChild(button({
      label: T('account.subRestore'),
      variant: 'ghost',
      size: 'md',
      full: true,
      icon: 'restore',
      onClick: doRestore
    }));
    actions.appendChild(button({
      label: T('account.subCancel'),
      variant: 'danger',
      size: 'md',
      full: true,
      onClick: function () {
        ask({
          title: T('account.subCancel'),
          text: T('account.subCancelConfirm'),
          confirm: T('account.subCancel'),
          cancel: T('confirm.cancel'),
          tone: 'danger'
        }, function (ok) {
          if (!ok) return;
          Billing.cancel();
          toast(T('paywall.cancelled'), 'info');
          sheet.close();
        });
      }
    }));

    var sheet = UI.sheet({
      title: T('paywall.manageTitle', 'account.subManage'),
      subtitle: T('paywall.badge'),
      size: 'auto',
      body: body,
      actions: actions
    });
  }

  /* ------------------------------------------------------------------ */
  /* D. Paywall                                                          */
  /* ------------------------------------------------------------------ */

  function defaultPlanId() {
    var plans = (window.Billing && Billing.PLANS) || [];
    for (var i = 0; i < plans.length; i += 1) if (plans[i].badgePL) return plans[i].id;
    return plans.length ? plans[0].id : '';
  }

  function openPaywall(opts) {
    opts = opts || {};
    var plans = (window.Billing && Billing.PLANS) || [];
    var selected = defaultPlanId();
    var planNodes = [];

    var body = el('div', 'ms4-paywall');
    body.appendChild(paywallHero(opts.metricId));
    body.appendChild(note('demo', 'flask', T('paywall.badge'), S('demo.simulation')));

    body.appendChild(nodeOf(UI.section(T('paywall.benefitsTitle'))));
    var benefitsBox = el('div', 'ms4-paywall__benefits');
    var benefits = (window.Billing && Billing.benefits()) || [];
    for (var b = 0; b < benefits.length; b += 1) benefitsBox.appendChild(benefitRow(benefits[b]));
    body.appendChild(benefitsBox);

    body.appendChild(nodeOf(UI.section(T('paywall.compareTitle', 'account.subTitle'))));
    body.appendChild(compareTable());

    body.appendChild(nodeOf(UI.section(T('paywall.plansTitle'))));
    var group = el('div', 'ms4-paywall__plans ms4-grid ms4-grid--plans');
    group.setAttribute('role', 'radiogroup');
    group.setAttribute('aria-label', T('paywall.plansTitle'));
    for (var p = 0; p < plans.length; p += 1) {
      (function (plan) {
        var node = planCard(plan, function () { select(plan.id); });
        planNodes.push({ id: plan.id, node: node });
        group.appendChild(node);
      }(plans[p]));
    }
    on(group, 'keydown', function (event) {
      var index = indexOfPlan(selected);
      if (index < 0) return;
      var next = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % planNodes.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + planNodes.length) % planNodes.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = planNodes.length - 1;
      else return;
      event.preventDefault();
      select(planNodes[next].id);
      planNodes[next].node.focus();
    });
    body.appendChild(group);

    body.appendChild(note('info', 'bulb', T('paywall.fairTitle'), T('paywall.fairText')));
    body.appendChild(el('p', 'ms4-paywall__fine', T('paywall.trialNote')));
    /* Drobny druk i odnośniki zostają w treści, NIE w przyklejonym pasku: pasek
       z nimi urastał na telefonie do ~280 px i zasłaniał karty planów. */
    body.appendChild(el('p', 'ms4-paywall__fine', T('paywall.fine')));
    body.appendChild(linksRow());

    /* Pasek akcji: jeden duży przycisk z ceną, pod nim przywracanie i drobny druk. */
    var actions = el('div', 'ms4-stack');
    var initialPlan = planById(selected);
    var cta = button({
      /* Etykieta MUSI być niepusta od startu: UI.button przy pustej etykiecie robi
         z przycisku kwadratowy przycisk ikonowy i nie tworzy węzła etykiety. */
      label: initialPlan
        ? fill(T('paywall.ctaTpl'), { plan: initialPlan.namePL, price: initialPlan.pricePL })
        : T('account.subUnlock'),
      variant: 'premium',
      size: 'lg',
      full: true,
      icon: 'crown',
      onClick: function () { confirmPurchase(); }
    });
    cta.classList.add('ms4-paywall__cta');
    actions.appendChild(cta);

    var restore = button({
      label: T('paywall.restore'),
      variant: 'ghost',
      size: 'sm',
      full: true,
      icon: 'restore',
      onClick: doRestore
    });
    restore.classList.add('ms4-paywall__restore');
    actions.appendChild(restore);

    var sheet = UI.sheet({
      title: T('account.subUnlock'),
      subtitle: T('paywall.badge'),
      size: 'full',
      body: body,
      actions: actions
    });

    function indexOfPlan(id) {
      for (var i = 0; i < planNodes.length; i += 1) if (planNodes[i].id === id) return i;
      return -1;
    }

    function select(id) {
      selected = id;
      for (var i = 0; i < planNodes.length; i += 1) {
        var isOn = planNodes[i].id === id;
        planNodes[i].node.classList[isOn ? 'add' : 'remove']('is-selected');
        planNodes[i].node.setAttribute('aria-checked', isOn ? 'true' : 'false');
        planNodes[i].node.tabIndex = isOn ? 0 : -1;
      }
      syncCta();
    }

    function syncCta() {
      var plan = planById(selected);
      if (!plan) return;
      /* setLabel pisze wyłącznie do <span class="ms4-btn__label">; textContent na całym
         przycisku skasowałby <svg> ikony korony. */
      cta.setLabel(fill(T('paywall.ctaTpl'), { plan: plan.namePL, price: plan.pricePL }));
    }

    function confirmPurchase() {
      var plan = planById(selected);
      if (!plan) return;
      ask({
        title: T('paywall.confirmTitle'),
        text: fill(T('paywall.confirmTpl'), { plan: plan.namePL, price: plan.pricePL + ' ' + (plan.periodPL || '') }),
        confirm: T('paywall.confirmKey'),
        cancel: T('confirm.cancel')
      }, function (ok) {
        if (ok) buy(plan);
      });
    }

    function buy(plan) {
      cta.classList.add('is-loading');
      cta.disabled = true;
      restore.disabled = true;
      UI.announce(T('paywall.busy'));
      var result = Billing.purchase(plan.id);
      var settle = function (res) {
        cta.classList.remove('is-loading');
        cta.disabled = false;
        restore.disabled = false;
        if (res && res.ok === false) { toast(T('error.unknown'), 'crit'); return; }
        showSuccess();
      };
      if (result && typeof result.then === 'function') {
        result.then(settle, function () {
          cta.classList.remove('is-loading');
          cta.disabled = false;
          restore.disabled = false;
          toast(T('error.unknown'), 'crit');
        });
      } else {
        settle(result);
      }
    }

    function showSuccess() {
      UI.clear(body);
      UI.clear(actions);
      actions.classList.add('is-hidden');

      var box = el('div', 'ms4-success');
      var mark = el('div', 'ms4-success__mark');
      mark.appendChild(icon('check-circle', 48));
      box.appendChild(mark);
      box.appendChild(el('h2', 'ms4-empty__title', T('paywall.successTitle')));
      box.appendChild(el('p', 'ms4-empty__text', T('paywall.successText')));
      box.appendChild(button({
        label: T('paywall.successKey'),
        variant: 'primary',
        size: 'lg',
        full: true,
        icon: 'measure',
        onClick: function () {
          sheet.close();
          if (window.App && typeof App.go === 'function') App.go('measure');
        }
      }));
      box.appendChild(el('p', 'ms4-paywall__fine', T('paywall.fine')));
      body.appendChild(box);
      UI.announce(T('paywall.successTitle'));
    }

    select(selected);
  }

  function paywallHero(metricId) {
    var hero = el('header', 'ms4-paywall__hero');
    hero.appendChild(demoBadgeRow('paywall.badge'));

    var crown = el('div', 'ms4-paywall__crown');
    crown.appendChild(icon('crown', 40));
    hero.appendChild(crown);

    hero.appendChild(el('h2', 'ms4-paywall__title', T('paywall.title')));

    var lede = T('paywall.lede');
    var metric = metricId && window.Metrics ? Metrics.byId(metricId) : null;
    if (metric && metric.premium) {
      /* Wywołanie z konkretnego kafelka: pierwsze zdanie mówi wprost o tej wielkości. */
      var first = fill(T('paywall.ledeMetricTpl', 'paywall.lede'), { name: metric.namePL });
      lede = first === lede ? lede : first + ' ' + lede;
    }
    hero.appendChild(el('p', 'ms4-paywall__lede', lede));
    return hero;
  }

  function compareTable() {
    var table = el('div', 'ms4-compare');

    var head = el('div', 'ms4-compare__head');
    head.appendChild(el('span', 'ms4-compare__label', T('paywall.compareTitle', 'account.subTitle')));
    head.appendChild(el('span', 'ms4-compare__cell', T('paywall.compareFree', 'account.subFree')));
    head.appendChild(el('span', 'ms4-compare__cell', T('paywall.comparePremium', 'nav.premiumOn')));
    table.appendChild(head);

    var rows = [
      { text: T('paywall.cmpVerdict'), free: true, pro: true },
      { text: T('paywall.cmpFree4'), free: true, pro: true },
      { text: T('paywall.cmpHistory'), free: true, pro: true },
      { text: T('paywall.cmpPremium3'), free: false, pro: true },
      { text: T('paywall.cmpReports'), free: false, pro: true },
      { text: T('paywall.cmpExport'), free: false, pro: true }
    ];

    for (var i = 0; i < rows.length; i += 1) {
      if (!rows[i].text) continue;
      var row = el('div', 'ms4-compare__row');
      row.appendChild(el('span', 'ms4-compare__label', rows[i].text));
      row.appendChild(compareCell(rows[i].free));
      row.appendChild(compareCell(rows[i].pro));
      table.appendChild(row);
    }
    return table;
  }

  /* Ptaszek nigdy sam: obok ikony stoi słowo dla czytnika ekranu. */
  function compareCell(yes) {
    var cell = el('span', 'ms4-compare__cell');
    var mark = icon(yes ? 'check' : 'minus', 20);
    mark.classList.add('ms4-compare__mark');
    mark.classList.add(yes ? 'ms4-compare__mark--yes' : 'ms4-compare__mark--no');
    cell.appendChild(mark);
    cell.appendChild(el('span', 'ms4-sronly', yes ? T('paywall.cmpYes') : T('paywall.cmpNo')));
    return cell;
  }

  function planCard(plan, onSelect) {
    var node = el('button', 'ms4-plan' + (plan.badgePL ? ' ms4-plan--featured' : ''));
    node.type = 'button';
    node.setAttribute('role', 'radio');
    node.setAttribute('aria-checked', 'false');
    node.setAttribute('aria-label', fill(T('aria.planTpl'), {
      name: plan.namePL,
      price: plan.pricePL,
      period: plan.periodPL || ''
    }));

    if (plan.badgePL) {
      var badge = nodeOf(UI.badge({ label: plan.badgePL, tone: 'premium' }));
      if (badge) {
        badge.classList.add('ms4-plan__badge');
        node.appendChild(badge);
      }
    }

    node.appendChild(el('span', 'ms4-plan__name', plan.namePL));

    var priceRow = el('span', 'ms4-row-inline');
    priceRow.appendChild(el('span', 'ms4-plan__price', plan.pricePL));
    if (plan.periodPL) priceRow.appendChild(el('span', 'ms4-plan__period', plan.periodPL));
    node.appendChild(priceRow);

    if (plan.perMonthPL) node.appendChild(el('span', 'ms4-plan__note', plan.perMonthPL));
    if (plan.notePL) node.appendChild(el('span', 'ms4-plan__note', plan.notePL));

    if (plan.savePctPL) {
      var save = nodeOf(UI.badge({ label: plan.savePctPL, tone: 'good' }));
      if (save) {
        save.classList.add('ms4-plan__save');
        node.appendChild(save);
      }
    }

    var radio = el('span', 'ms4-plan__radio');
    radio.appendChild(icon('check', 14));
    node.appendChild(radio);

    on(node, 'click', onSelect);
    return node;
  }

  /* ------------------------------------------------------------------ */
  /* E. Ustawienia                                                       */
  /* ------------------------------------------------------------------ */

  function renderSettings() {
    var host = refs.settingsHost;
    if (!host) return;
    UI.clear(host);
    refs.swatches = {};
    refs.themes = {};

    host.appendChild(nodeOf(UI.section(T('account.settingsTitle'))));
    host.appendChild(themeCard());
    host.appendChild(accentCard());
    host.appendChild(nodeOf(UI.section(T('account.textMotion', 'account.settingsTitle'))));
    host.appendChild(textMotionCard());
    host.appendChild(nodeOf(UI.section(T('account.measureGroup', 'nav.measure'))));
    host.appendChild(measureCard());
    host.appendChild(nodeOf(UI.section(T('account.dataTitle'))));
    host.appendChild(dataCard());
    host.appendChild(nodeOf(UI.section(T('account.aboutTitle'))));
    host.appendChild(aboutCard());
    syncSettings();
  }

  function themeCard() {
    var card = UI.card({ title: T('account.theme'), className: 'ms4-card' });
    var body = card.body || nodeOf(card);

    var group = el('div', 'ms4-themepick');
    group.setAttribute('role', 'radiogroup');
    group.setAttribute('aria-label', T('account.theme'));

    var themes = (window.Store && Store.THEMES) || [];
    for (var i = 0; i < themes.length; i += 1) {
      (function (theme) {
        var label = T(THEME_TEXT[theme.id]) || theme.namePL || theme.id;
        var option = el('button', 'ms4-themepick__option');
        option.type = 'button';
        option.setAttribute('role', 'radio');
        option.setAttribute('aria-checked', 'false');
        option.setAttribute('aria-label', fill(T('aria.themeTpl'), { name: label }));
        option.appendChild(el('span', 'ms4-themepick__preview ms4-themepick__preview--' + theme.id));
        option.appendChild(el('span', 'ms4-themepick__label', label));
        on(option, 'click', function () {
          Store.set({ theme: theme.id });
          toast(T('toast.themeChanged'), 'info');
        });
        refs.themes[theme.id] = option;
        group.appendChild(option);
      }(themes[i]));
    }
    body.appendChild(group);
    return nodeOf(card);
  }

  function accentCard() {
    var card = UI.card({
      title: T('account.accent'),
      subtitle: T('account.accentSub'),
      className: 'ms4-card'
    });
    var body = card.body || nodeOf(card);

    var group = el('div', 'ms4-swatches');
    group.setAttribute('role', 'radiogroup');
    group.setAttribute('aria-label', T('account.accent'));

    var accents = (window.Store && Store.ACCENTS) || [];
    for (var i = 0; i < accents.length; i += 1) {
      (function (accent) {
        var option = el('button', 'ms4-swatch');
        option.type = 'button';
        option.setAttribute('role', 'radio');
        option.setAttribute('aria-checked', 'false');
        option.setAttribute('aria-label', fill(T('aria.swatchTpl'), { name: accent.namePL }));

        var disc = el('span', 'ms4-swatch__disc');
        var pair = accent.swatch || [];
        /* Jedyne wartości barwne w tym pliku: próbka musi pokazać kolor palety,
           której akurat nie ma na ekranie. Wartości pochodzą ze Store.ACCENTS. */
        if (pair.length > 1) {
          disc.style.backgroundImage = 'linear-gradient(135deg, ' + pair[0] + ', ' + pair[1] + ')';
        } else if (pair.length === 1) {
          disc.style.backgroundColor = pair[0];
        }
        var check = icon('check', 20);
        check.classList.add('ms4-swatch__check');
        disc.appendChild(check);
        option.appendChild(disc);
        option.appendChild(el('span', 'ms4-swatch__label', accent.namePL));

        on(option, 'click', function () {
          Store.set({ accent: accent.id });
          toast(fill(T('toast.accentChangedTpl'), { name: accent.namePL }), 'info');
        });
        refs.swatches[accent.id] = option;
        group.appendChild(option);
      }(accents[i]));
    }
    body.appendChild(group);
    return nodeOf(card);
  }

  function textMotionCard() {
    var card = UI.card({ className: 'ms4-card' });
    var body = card.body || nodeOf(card);
    var s = settings();

    var scale = UI.segmented({
      options: [
        { id: '1', value: '1', label: T('account.textScale1'), labelPL: T('account.textScale1') },
        { id: '1.15', value: '1.15', label: T('account.textScale115'), labelPL: T('account.textScale115') },
        { id: '1.3', value: '1.3', label: T('account.textScale13'), labelPL: T('account.textScale13') }
      ],
      value: String(s.textScale || 1),
      onChange: function (value) {
        Store.set({ textScale: parseFloat(value) || 1 });
        toast(T('toast.saved'), 'good');
      }
    });

    var list = el('div', 'ms4-list ms4-list--inset');
    list.appendChild(nodeOf(UI.row({
      icon: 'text-size',
      title: T('account.textScale'),
      control: nodeOf(scale)
    })));
    list.appendChild(nodeOf(UI.row({
      icon: 'motion',
      title: T('account.motion'),
      subtitle: T('account.motionSub'),
      control: nodeOf(UI['switch']({
        label: T('account.motion'),
        checked: s.motion === 'reduced',
        onChange: function (checked) {
          Store.set({ motion: checked ? 'reduced' : 'auto' });
          toast(T('toast.saved'), 'good');
        }
      }))
    })));
    list.appendChild(nodeOf(UI.row({
      icon: 'vibration',
      title: T('account.haptics'),
      subtitle: T('account.hapticsSub'),
      control: nodeOf(UI['switch']({
        label: T('account.haptics'),
        checked: s.haptics !== false,
        onChange: function (checked) {
          Store.set({ haptics: !!checked });
          toast(T('toast.saved'), 'good');
        }
      }))
    })));
    body.appendChild(list);

    var preview = el('div', 'ms4-card ms4-card--flat');
    preview.appendChild(el('p', 'ms4-muted', T('account.textScalePreview', 'account.textScale')));
    body.appendChild(preview);
    return nodeOf(card);
  }

  function measureCard() {
    var card = UI.card({ className: 'ms4-card' });
    var body = card.body || nodeOf(card);
    var s = settings();

    var list = el('div', 'ms4-list ms4-list--inset');

    var leadRow = nodeOf(UI.row({
      icon: 'target',
      title: T('account.leadMetric'),
      subtitle: T('measure.leadSheetSub'),
      value: leadName(),
      chevron: true,
      onClick: openLeadSheet
    }));
    refs.leadValue = leadRow.querySelector('.ms4-row__value');
    list.appendChild(leadRow);

    list.appendChild(nodeOf(UI.row({
      icon: 'camera-flip',
      title: T('account.camera', 'measure.flip'),
      control: nodeOf(UI.segmented({
        options: [
          {
            id: 'environment', value: 'environment',
            label: T('account.cameraBack', 'measure.flip'), labelPL: T('account.cameraBack', 'measure.flip')
          },
          {
            id: 'user', value: 'user',
            label: T('account.cameraFront', 'measure.flip'), labelPL: T('account.cameraFront', 'measure.flip')
          }
        ],
        value: s.cameraFacing || 'environment',
        onChange: function (value) {
          Store.set({ cameraFacing: value });
          toast(T('toast.saved'), 'good');
        }
      }))
    })));

    list.appendChild(nodeOf(UI.row({
      icon: 'sliders',
      title: T('tools.thresholds'),
      subtitle: S('modules.02.descPL'),
      chevron: true,
      onClick: function () { goTools(); }
    })));
    list.appendChild(nodeOf(UI.row({
      icon: 'calibrate',
      title: T('tools.calibration'),
      subtitle: S('modules.03.descPL'),
      chevron: true,
      onClick: function () { goTools(); }
    })));

    body.appendChild(list);
    return nodeOf(card);
  }

  function goTools() {
    if (window.App && typeof App.go === 'function') App.go('tools');
  }

  function leadName() {
    var s = settings();
    var metric = window.Metrics ? Metrics.byId(s.leadMetric || 'share') : null;
    return metric ? metric.namePL : '';
  }

  /** Wybór wielkości na dużym wskaźniku. Wielkość premium bez dostępu
   *  nie zmienia ustawienia — otwiera ofertę, bo inaczej wskaźnik pokazałby kłódkę. */
  function openLeadSheet() {
    var body = el('div', 'ms4-stack');
    body.appendChild(el('p', 'ms4-card__subtitle', T('measure.leadSheetSub')));

    var list = el('div', 'ms4-list');
    var catalogue = (window.Metrics && Metrics.CATALOGUE) || [];
    var current = settings().leadMetric || 'share';

    for (var i = 0; i < catalogue.length; i += 1) {
      (function (metric) {
        var locked = metric.premium && window.Billing && !Billing.isUnlocked(metric.id);
        var control = null;
        if (locked) {
          control = nodeOf(UI.chip({ label: T('measure.premiumTileWord', 'tools.premiumWord'), icon: 'crown', tone: 'premium' }));
        } else if (metric.id === current) {
          control = icon('check', 20);
        }
        list.appendChild(nodeOf(UI.row({
          icon: METRIC_ICON[metric.id] || 'measure',
          title: metric.namePL,
          subtitle: metric.shortPL || '',
          control: control,
          chevron: !locked,
          onClick: function () {
            if (locked) {
              sheet.close();
              openPaywall({ source: 'lead', metricId: metric.id });
              return;
            }
            Store.set({ leadMetric: metric.id });
            toast(fill(T('toast.leadChangedTpl'), { name: metric.namePL }), 'info');
            sheet.close();
          }
        })));
      }(catalogue[i]));
    }
    body.appendChild(list);

    var sheet = UI.sheet({
      title: T('measure.leadSheetTitle'),
      subtitle: T('account.leadMetric'),
      size: 'auto',
      body: body
    });
  }

  function dataCard() {
    var card = UI.card({ className: 'ms4-card' });
    var body = card.body || nodeOf(card);
    var list = el('div', 'ms4-list ms4-list--inset');

    var sizeRow = nodeOf(UI.row({
      icon: 'history',
      title: T('account.historySize', 'history.title'),
      value: historyValueText()
    }));
    refs.historyValue = sizeRow.querySelector('.ms4-row__value');
    list.appendChild(sizeRow);

    list.appendChild(dangerRow({
      icon: 'trash',
      title: T('account.clearHistory'),
      chevron: true,
      onClick: function () {
        ask({
          title: T('account.clearHistory'),
          text: T('confirm.clearHistory'),
          confirm: T('confirm.clearHistoryKey'),
          cancel: T('confirm.cancel'),
          tone: 'danger'
        }, function (ok) {
          if (!ok) return;
          if (window.Engine) Engine.clearHistory();
          toast(S('transient.historyCleared'), 'info');
          updateHistoryValue();
        });
      }
    }));

    list.appendChild(dangerRow({
      icon: 'refresh',
      title: T('account.clearSettings'),
      chevron: true,
      onClick: function () {
        ask({
          title: T('account.clearSettings'),
          text: T('confirm.resetSettings'),
          confirm: T('confirm.reset'),
          cancel: T('confirm.cancel'),
          tone: 'danger'
        }, function (ok) {
          if (!ok) return;
          Store.reset();
          toast(T('account.clearSettingsOk'), 'good');
          renderSettings();
        });
      }
    }));

    body.appendChild(list);
    return nodeOf(card);
  }

  function historyValueText() {
    var count = (window.Engine && typeof Engine.historyCount === 'function') ? Engine.historyCount() : 0;
    var span = (window.Scale && typeof Scale.durationWords === 'function')
      ? Scale.durationWords(count * LONG_STEP_MS)
      : '';
    var tpl = T('account.historySizeTpl');
    if (!tpl) return String(count);
    return fill(tpl, { count: count, span: span });
  }

  function updateHistoryValue() {
    if (refs.historyValue) refs.historyValue.textContent = historyValueText();
  }

  function aboutCard() {
    var card = UI.card({ className: 'ms4-card' });
    var body = card.body || nodeOf(card);
    var list = el('div', 'ms4-list ms4-list--inset');

    list.appendChild(nodeOf(UI.row({
      icon: 'info',
      title: T('account.version'),
      subtitle: T('account.versionSub'),
      value: T('account.versionValue')
    })));
    list.appendChild(nodeOf(UI.row({
      icon: 'book',
      title: T('tools.docs'),
      subtitle: T('tools.docsDesc'),
      chevron: true,
      onClick: function () { goTools(); }
    })));
    list.appendChild(nodeOf(UI.row({
      icon: 'shield',
      title: T('account.privacy'),
      subtitle: S('demo.simulation'),
      chevron: true,
      onClick: function () { openTextSheet(T('account.privacy'), T('account.privacyText')); }
    })));
    var licenses = T('account.licenses');
    if (licenses) {
      list.appendChild(nodeOf(UI.row({
        icon: 'report',
        title: licenses,
        chevron: true,
        onClick: function () {
          openTextSheet(licenses, T('account.licensesText', 'account.privacyText'));
        }
      })));
    }

    body.appendChild(list);
    body.appendChild(note('limits', 'info', S('note.dashTitle'), S('note.dashText')));
    return nodeOf(card);
  }

  /** Odświeżenie zaznaczeń bez przebudowy — klikanie próbki nie gubi fokusu. */
  function syncSettings() {
    var s = settings();
    var id;
    for (id in refs.themes) {
      if (Object.prototype.hasOwnProperty.call(refs.themes, id)) {
        var themeOn = (s.theme || 'system') === id;
        refs.themes[id].classList[themeOn ? 'add' : 'remove']('is-selected');
        refs.themes[id].setAttribute('aria-checked', themeOn ? 'true' : 'false');
        refs.themes[id].tabIndex = themeOn ? 0 : -1;
      }
    }
    for (id in refs.swatches) {
      if (Object.prototype.hasOwnProperty.call(refs.swatches, id)) {
        var accentOn = (s.accent || 'ocean') === id;
        refs.swatches[id].classList[accentOn ? 'add' : 'remove']('is-selected');
        refs.swatches[id].setAttribute('aria-checked', accentOn ? 'true' : 'false');
        refs.swatches[id].tabIndex = accentOn ? 0 : -1;
      }
    }
    if (refs.leadValue) refs.leadValue.textContent = leadName();
    updateHistoryValue();
  }

  /* ------------------------------------------------------------------ */
  /* Widok                                                               */
  /* ------------------------------------------------------------------ */

  function build(root) {
    /* Klasy hostów są zaczepieniem układu desktopowego (screens.css, 5.Q):
       profil i ustawienia w lewej kolumnie, subskrypcja w prawej. */
    refs.profileHost = el('div', 'ms4-stack ms4-account__profile');
    root.appendChild(refs.profileHost);

    refs.subHost = el('div', 'ms4-stack ms4-account__sub');
    root.appendChild(refs.subHost);

    refs.settingsHost = el('div', 'ms4-stack ms4-account__settings');
    refs.settingsHost.id = 'accountSettings';
    root.appendChild(refs.settingsHost);

    renderProfile();
    renderSubscription();
    renderSettings();
    built = true;
  }

  function refreshAccount() {
    if (!built) return;
    renderProfile();
    renderSubscription();
  }

  function enter() {
    if (window.Bus) {
      offs.push(Bus.on('auth:changed', refreshAccount));
      offs.push(Bus.on('billing:changed', refreshAccount));
      offs.push(Bus.on('settings:changed', syncSettings));
      offs.push(Bus.on('engine:history', updateHistoryValue));
    }
    refreshAccount();
    syncSettings();
  }

  function leave() {
    for (var i = 0; i < offs.length; i += 1) {
      if (typeof offs[i] === 'function') offs[i]();
    }
    offs = [];
  }

  /* app.js ładuje się PO ekranach (rozdział 0.2), więc przy pierwszym przebiegu
     window.App jeszcze nie istnieje. Rejestrujemy się wtedy w DOMContentLoaded —
     nasz nasłuch stoi w kolejce przed nasłuchem app.js, bo powstał wcześniej. */
  function registerView() {
    if (!window.App || typeof App.registerView !== 'function') return false;
    App.registerView({
      id: VIEW_ID,
      labelPL: T('nav.account'),
      icon: 'account',
      build: build,
      enter: enter,
      leave: leave
    });
    return true;
  }

  if (!registerView()) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', registerView);
    } else {
      setTimeout(registerView, 0);
    }
  }

  /* Paywall jest własnością tego pliku, ale wołają go wszystkie ekrany. */
  if (window.Billing && typeof Billing.registerPaywall === 'function') {
    Billing.registerPaywall(openPaywall);
  }
}());
