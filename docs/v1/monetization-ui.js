/* Monetization UI layer — every screen, dialog, toast and fake ad of the DEMO
   monetization prototype. This file owns the DOM; window.Billing owns the state.
   It never computes entitlements itself and never touches billing storage —
   that split is what makes swapping the mock backend for real Play Billing a
   one-file change. */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     Constants
     --------------------------------------------------------------------- */

  var DAY_MS = 24 * 60 * 60 * 1000;
  var HOUR_MS = 60 * 60 * 1000;

  var ADS_KEY = 'blueMonitor.ads.v1';
  var ONBOARDING_KEY = 'blueMonitor.onboarding.v1';
  var PROFILES_KEY = 'blueMonitor.profiles.v1';

  var REWARDED_DEFAULT_MS = 30000;      // fake ad length
  var REWARDED_UNLOCK_AFTER_MS = 5000;  // close button becomes active
  var REWARDED_REWARD_MS = DAY_MS;      // temporary entitlement lifetime
  var REWARDED_DAILY_LIMIT = 5;
  var REWARDED_MIN_GAP_MS = 60000;
  var AD_REFRESH_MS = 60000;            // fake banner creative rotation floor
  var INTERSTITIAL_MIN_SESSION_MS = 60000;
  var ALERT_EXPOSURE_MS = 5 * 60 * 1000;   // continuous time in the harmful zone before an alert
  var ALERT_COOLDOWN_MS = 15 * 60 * 1000;  // never nag: at most one alert per quarter hour
  var PROFILES_MAX = 5;

  // Mirrors of Billing's frozen ids. Refreshed from Billing in boot() so the UI
  // never hardcodes feature/product literals once the engine is present.
  var FEATURES = {
    HISTORY_LONG: 'historyLong', CSV_EXPORT: 'csvExport', REPORTS: 'reports',
    PROFILES: 'profiles', ALERTS: 'alerts', BACKGROUND: 'background', NO_ADS: 'noAds'
  };
  var PRODUCT_IDS = {
    LIFETIME: 'premium_lifetime', YEARLY: 'premium_yearly',
    MONTHLY: 'premium_monthly', REMOVE_ADS: 'remove_ads'
  };

  var MONTHS_PL = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
    'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];

  var ZONE_LABEL = { good: 'BEZPIECZNA', warning: 'UMIARKOWANA', critical: 'SZKODLIWA' };
  var ZONE_LABEL_LONG = { good: 'Bezpieczna', warning: 'Umiarkowana', critical: 'Szkodliwa' };

  var MEDICAL_DISCLAIMER =
    'Ta aplikacja nie jest wyrobem medycznym. Nie służy do diagnozowania, leczenia ani ' +
    'zapobiegania jakimkolwiek chorobom. Premium daje dodatkowe funkcje zapisu i analizy ' +
    'danych — nie chroni wzroku i nie zmniejsza żadnego ryzyka zdrowotnego.';

  // Fake banner creatives. Deliberately dull, never colored like a measurement
  // zone and never shaped like an app control (AdMob placement rules + the
  // "don't confuse an ad with a reading" rule from the spec).
  var FAKE_ADS = [
    'Miejsce na reklamę 320 × 100',
    'Tu byłaby reklama partnera',
    'Baner demonstracyjny 320 × 100',
    'Przykładowa kreacja reklamowa'
  ];

  var CHECK_SVG = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">' +
    '<path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>';
  var LOCK_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">' +
    '<path fill="currentColor" d="M12 2a5 5 0 0 0-5 5v3H6a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1h-1V7a5 5 0 0 0-5-5zm-3 8V7a3 3 0 1 1 6 0v3H9zm3 4a1.8 1.8 0 0 1 1 3.3V19h-2v-1.7A1.8 1.8 0 0 1 12 14z"/></svg>';
  var STAR_SVG = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">' +
    '<path fill="currentColor" d="m12 2 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.1 6.1 20.2l1.2-6.6L2.5 9l6.6-.9z"/></svg>';
  var WARN_SVG = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">' +
    '<path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>';

  /* ---------------------------------------------------------------------
     Tiny DOM helpers
     --------------------------------------------------------------------- */

  function byId(id) { return document.getElementById(id); }

  function clear(node) { while (node && node.firstChild) node.removeChild(node.firstChild); }

  function append(parent, child) {
    if (child === null || child === undefined) return;
    if (Array.isArray(child)) { child.forEach(function (c) { append(parent, c); }); return; }
    if (typeof child === 'string') { parent.appendChild(document.createTextNode(child)); return; }
    parent.appendChild(child);
  }

  // h('button', { class: 'btn', text: 'OK', onclick: fn }, [children])
  function h(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        var value = attrs[key];
        if (value === null || value === undefined || value === false) return;
        if (key === 'class') { node.className = value; return; }
        if (key === 'text') { node.textContent = value; return; }
        if (key === 'html') { node.innerHTML = value; return; }
        if (key === 'onclick') { node.addEventListener('click', value); return; }
        if (key === 'oninput') { node.addEventListener('input', value); return; }
        if (key === 'onkeydown') { node.addEventListener('keydown', value); return; }
        if (key === 'onchange') { node.addEventListener('change', value); return; }
        if (value === true) { node.setAttribute(key, ''); return; }
        node.setAttribute(key, String(value));
      });
    }
    append(node, children);
    return node;
  }

  function setHidden(node, hidden) {
    if (!node) return;
    if (hidden) node.setAttribute('hidden', '');
    else node.removeAttribute('hidden');
  }

  function focusLater(node) {
    if (!node) return;
    requestAnimationFrame(function () { try { node.focus(); } catch (_) { /* detached */ } });
  }

  function prefersReducedMotion() {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (_) { return false; }
  }

  // Polish numerals take three forms. Screen readers speak these strings, so
  // "1 dni" or "2 sekund" is not a typo the user can ignore.
  function pluralPL(n, one, few, many) {
    var count = Math.abs(Number(n) || 0);
    var m10 = count % 10;
    var m100 = count % 100;
    if (count === 1) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
    return many;
  }
  function daysWordPL(n) { return n + ' ' + pluralPL(n, 'dzień', 'dni', 'dni'); }
  // The trial length belongs to the catalogue, not to this file. Spelling it
  // out as a literal here means a changed TRIAL_DAYS would leave the offer
  // text stating a period the engine no longer grants.
  function trialDaysWordPL(product) {
    var b = billing();
    var days = (product && product.trialDays) || (b && b.TRIAL_DAYS) || 7;
    return daysWordPL(days);
  }
  function readingsWordPL(n) { return n + ' ' + pluralPL(n, 'odczyt', 'odczyty', 'odczytów'); }
  function minutesWordPL(n) { return n + ' ' + pluralPL(n, 'minuty', 'minut', 'minut'); }

  /* ---------------------------------------------------------------------
     Guarded access to the sibling modules. A missing file (stale service
     worker cache) must degrade, never throw.
     --------------------------------------------------------------------- */

  var FALLBACK_STATE = {
    version: 1, source: 'MOCK', tier: 'free', status: 'none', productId: null, plan: null,
    autoRenewing: false, purchasedAt: null, startedAt: null, renewsAt: null, expiresAt: null,
    trialUsed: false, trialStartedAt: null, trialEndsAt: null, promoCode: null,
    promoDiscountPercent: null, priceMinor: null, currency: 'PLN', adsEnabled: true,
    adsConsent: 'unknown', account: null, temporaryEntitlements: {},
    features: {
      historyLong: false, csvExport: false, reports: false,
      profiles: false, alerts: false, background: false, noAds: false
    },
    updatedAt: 0
  };

  // Deliberately EMPTY. billing.js is the single source of truth for prices,
  // periods and terms; a second catalogue here would drift from it (it already
  // had, before this was removed) and could show a price the engine never
  // charges. With no engine the paywall renders an explanation instead of an
  // offer — see #premiumNoCatalogue in buildPaywall().
  var FALLBACK_PRODUCTS = [];

  function billing() {
    return (window.Billing && typeof window.Billing.getState === 'function') ? window.Billing : null;
  }

  function getState() {
    var b = billing();
    if (!b) return FALLBACK_STATE;
    try {
      var s = b.getState();
      return (s && s.features) ? s : FALLBACK_STATE;
    } catch (_) { return FALLBACK_STATE; }
  }

  function hasFeature(featureId) {
    var b = billing();
    if (b && typeof b.hasFeature === 'function') {
      try { return b.hasFeature(featureId) === true; } catch (_) { return false; }
    }
    return false;
  }

  function isPremiumTier() {
    var b = billing();
    if (b && typeof b.isPremium === 'function') {
      try { return b.isPremium() === true; } catch (_) { return false; }
    }
    return false;
  }

  function trialDaysLeft() {
    var b = billing();
    if (b && typeof b.daysLeftOfTrial === 'function') {
      try { return b.daysLeftOfTrial() || 0; } catch (_) { return 0; }
    }
    return 0;
  }

  function getProducts() {
    var b = billing();
    if (b && typeof b.getProducts === 'function') {
      try {
        var list = b.getProducts();
        if (list && list.length) return list;
      } catch (_) { /* fall through to the empty catalogue */ }
    }
    return FALLBACK_PRODUCTS;
  }

  function getProduct(productId) {
    var list = getProducts();
    for (var i = 0; i < list.length; i++) if (list[i].id === productId) return list[i];
    return null;
  }

  function defaultProductId() {
    var b = billing();
    if (b && typeof b.getDefaultProductId === 'function') {
      try { return b.getDefaultProductId() || PRODUCT_IDS.LIFETIME; } catch (_) { /* ignore */ }
    }
    return PRODUCT_IDS.LIFETIME;
  }

  function billingAvailable() {
    var b = billing();
    if (!b) return false;
    if (typeof b.isAvailable !== 'function') return true;
    try { return b.isAvailable() !== false; } catch (_) { return true; }
  }

  function fmtDate(ts) {
    if (!ts) return '';
    var b = billing();
    if (b && typeof b.formatDate === 'function') {
      try { return b.formatDate(ts); } catch (_) { /* fall through */ }
    }
    var d = new Date(ts);
    return d.getDate() + ' ' + MONTHS_PL[d.getMonth()] + ' ' + d.getFullYear();
  }

  function fmtMinor(minor) {
    var value = Math.round(Math.abs(Number(minor) || 0));
    return Math.floor(value / 100) + ',' + (value % 100 < 10 ? '0' : '') + (value % 100) + ' zł';
  }

  // The price the user will actually be charged, promo code included. It comes
  // from billing.js on purpose: the catalogue literal does not know about a
  // redeemed code, and a paywall that shows a different amount than the one
  // charged misstates the price. The catalogue text is only a fallback for the
  // case where billing.js itself failed to load.
  function fmtPriceOf(product) {
    if (!product) return '';
    var b = billing();
    if (b && typeof b.formatPrice === 'function') {
      try {
        var live = b.formatPrice(product.id);
        if (live) return live;
      } catch (_) { /* fall through to the catalogue literal */ }
    }
    if (product.priceText) return product.priceText;
    return fmtMinor(product.priceMinor);
  }

  // What a screen reader says for a price. billing.js spells the discounted
  // amount out in words; the catalogue string is the fallback.
  function spokenPriceOf(product) {
    if (!product) return '';
    var b = billing();
    if (b && typeof b.formatSpokenPrice === 'function') {
      try {
        var spoken = b.formatSpokenPrice(product.id);
        if (spoken) return spoken;
      } catch (_) { /* fall through */ }
    }
    return product.spokenPrice || fmtPriceOf(product);
  }

  // Catalogue (undiscounted) price, shown struck through next to the
  // discounted one so the saving is visible instead of merely asserted.
  function fmtCatalogPriceOf(product) {
    if (!product) return '';
    if (product.priceText) return product.priceText;
    return fmtMinor(product.priceMinor);
  }

  // 'za pierwszy rok' / 'za pierwszy miesiąc' / 'jednorazowo' — the period the
  // discounted amount covers. Used instead of periodText on a discounted card,
  // because the catalogue periodText describes the RENEWAL, not the first charge.
  function firstPeriodTextOf(product) {
    if (!product) return '';
    var b = billing();
    if (b && typeof b.formatFirstPeriodPL === 'function') {
      try {
        var text = b.formatFirstPeriodPL(product.id);
        if (text) return text;
      } catch (_) { /* fall through */ }
    }
    return product.periodText || '';
  }

  // "potem 79,99 zł rocznie" — the amount that will really be charged on every
  // renewal after a discounted first period. Empty for one-off products.
  function renewalSentenceOf(product) {
    if (!product) return '';
    var b = billing();
    if (!b || typeof b.formatRenewalPrice !== 'function') return '';
    try {
      var period = typeof b.formatRenewalPeriodPL === 'function' ? b.formatRenewalPeriodPL(product.id) : '';
      if (!period) return '';
      return 'potem ' + b.formatRenewalPrice(product.id) + ' ' + period;
    } catch (_) { return ''; }
  }

  // Non-null only when a redeemed promo code really changes the amount.
  function discountedMinorOf(product) {
    if (!product) return null;
    var b = billing();
    if (!b || typeof b.getEffectivePriceMinor !== 'function') return null;
    try {
      var effective = b.getEffectivePriceMinor(product.id);
      if (effective === null || effective === undefined) return null;
      return effective === product.priceMinor ? null : effective;
    } catch (_) { return null; }
  }

  function goScreen(screenId, panelId, fromEl) {
    if (window.AppNav && typeof window.AppNav.go === 'function') {
      return window.AppNav.go(screenId, { from: fromEl });
    }
    if (window.AppTabs && typeof window.AppTabs.showOverlay === 'function') {
      window.AppTabs.showOverlay(panelId);
      return true;
    }
    return false;
  }

  function goBack() {
    if (window.AppNav && typeof window.AppNav.back === 'function' && window.AppNav.back()) return true;
    if (window.AppTabs && typeof window.AppTabs.select === 'function') {
      window.AppTabs.select('monitoring');
      return true;
    }
    return false;
  }

  function announce(regionId, message) {
    var region = byId(regionId);
    if (!region) return;
    // Re-setting identical text is not re-announced by screen readers, so clear first.
    region.textContent = '';
    window.setTimeout(function () { region.textContent = message; }, 60);
  }

  /* ---------------------------------------------------------------------
     Local storage owned by this file (ads, onboarding, threshold profiles)
     --------------------------------------------------------------------- */

  function readJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : fallback;
    } catch (_) { return fallback; }
  }

  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (_) { return false; }
  }

  function todayKey() {
    var d = new Date();
    var m = String(d.getMonth() + 1);
    var day = String(d.getDate());
    if (m.length < 2) m = '0' + m;
    if (day.length < 2) day = '0' + day;
    return d.getFullYear() + '-' + m + '-' + day;
  }

  function adsStore() {
    var s = readJSON(ADS_KEY, null) || {};
    return {
      consent: s.consent || 'unknown',
      rewardedCountToday: typeof s.rewardedCountToday === 'number' ? s.rewardedCountToday : 0,
      rewardedDay: s.rewardedDay || todayKey(),
      lastRewardedAt: s.lastRewardedAt || 0,
      lastInterstitialAt: s.lastInterstitialAt || 0,
      interstitialEnabled: s.interstitialEnabled === true
    };
  }

  function saveAds(patch) {
    var next = adsStore();
    Object.keys(patch).forEach(function (k) { next[k] = patch[k]; });
    writeJSON(ADS_KEY, next);
    return next;
  }

  function rewardedUsedToday() {
    var s = adsStore();
    if (s.rewardedDay !== todayKey()) return 0;   // counter resets at local midnight
    return s.rewardedCountToday;
  }

  function adsConsent() {
    var b = billing();
    if (b && typeof b.getAdsConsent === 'function') {
      try { return b.getAdsConsent() || 'unknown'; } catch (_) { /* fall through */ }
    }
    return adsStore().consent;
  }

  /* ---------------------------------------------------------------------
     Toasts
     --------------------------------------------------------------------- */

  function toastRegion() {
    var region = byId('mzToastRegion');
    if (!region) {
      region = h('div', { id: 'mzToastRegion', class: 'mz-toast-region', role: 'status', 'aria-live': 'polite' });
      document.body.appendChild(region);
    }
    return region;
  }

  function toast(messagePL, opts) {
    opts = opts || {};
    var type = opts.type || 'info';
    var region = toastRegion();
    region.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
    var duration = opts.durationMs || (type === 'error' ? 8000 : 5000);
    var node = h('div', { class: 'mz-toast mz-toast-' + type }, [
      h('span', { class: 'mz-grow', text: messagePL })
    ]);
    var removeNode = function () {
      if (node.parentNode) node.parentNode.removeChild(node);
    };
    if (opts.actionPL && opts.onAction) {
      node.appendChild(h('button', {
        type: 'button', class: 'mz-toast-action', text: opts.actionPL,
        onclick: function () {
          try { opts.onAction(); } catch (_) { /* a listener must not break the toast */ }
          removeNode();
        }
      }));
    }
    // A toast sits above the bottom bar and swallows taps for its whole life,
    // so it always needs a real way out — not just a timeout.
    node.appendChild(h('button', {
      type: 'button', class: 'mz-toast-close', text: '✕',
      'aria-label': 'Zamknij powiadomienie', onclick: removeNode
    }));
    region.appendChild(node);
    window.setTimeout(removeNode, duration);
  }

  /* ---------------------------------------------------------------------
     Dialog plumbing: focus trap, Escape, focus return
     --------------------------------------------------------------------- */

  var dialogStack = [];

  function layer() {
    var node = byId('mzLayer');
    if (!node) {
      node = h('div', { id: 'mzLayer' });
      document.body.appendChild(node);
    }
    return node;
  }

  function focusables(root) {
    var selector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]),' +
      ' textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.prototype.filter.call(root.querySelectorAll(selector), function (node) {
      if (node.hasAttribute('hidden')) return false;
      return node.offsetWidth > 0 || node.offsetHeight > 0 || node === document.activeElement;
    });
  }

  function createDialog(cfg) {
    var root = h('div', {
      id: cfg.id,
      class: 'mz-dialog' + (cfg.className ? ' ' + cfg.className : ''),
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': cfg.titleId,
      hidden: true
    });
    var backdrop = h('div', { class: 'mz-dialog-backdrop', id: cfg.backdropId || null });
    var body = h('div', { class: 'mz-dialog-body' });
    root.appendChild(backdrop);
    root.appendChild(body);
    layer().appendChild(root);
    return { root: root, body: body, backdrop: backdrop, opts: null, returnFocusTo: null };
  }

  function isDialogOpen(dialog) { return dialogStack.indexOf(dialog) >= 0; }

  function openDialog(dialog, opts) {
    dialog.opts = opts || {};
    dialog.returnFocusTo = dialog.opts.returnFocusTo || document.activeElement;
    setHidden(dialog.root, false);
    if (dialogStack.indexOf(dialog) < 0) dialogStack.push(dialog);
    // The title is the focus target on purpose: the DEMO banner, the heading
    // and the order summary all sit ABOVE the first interactive element, so
    // focusing that element would skip the mandatory simulation notice and the
    // price for anyone reading forward with a screen reader.
    var first = dialog.opts.focusEl ||
      dialog.body.querySelector('.mz-dialog-title') ||
      focusables(dialog.body)[0] || dialog.body;
    focusLater(first);
  }

  function closeDialog(dialog) {
    var index = dialogStack.indexOf(dialog);
    if (index >= 0) dialogStack.splice(index, 1);
    setHidden(dialog.root, true);
    var back = dialog.returnFocusTo;
    dialog.returnFocusTo = null;
    if (back && document.contains(back)) focusLater(back);
  }

  document.addEventListener('keydown', function (ev) {
    if (!dialogStack.length) return;
    var dialog = dialogStack[dialogStack.length - 1];
    if (ev.key === 'Escape') {
      if (dialog.opts && typeof dialog.opts.onEscape === 'function') {
        ev.preventDefault();
        dialog.opts.onEscape();
      }
      return;
    }
    if (ev.key !== 'Tab') return;
    var list = focusables(dialog.body);
    if (!list.length) return;
    var first = list[0];
    var last = list[list.length - 1];
    if (!dialog.body.contains(document.activeElement)) {
      ev.preventDefault();
      first.focus();
    } else if (ev.shiftKey && document.activeElement === first) {
      ev.preventDefault();
      last.focus();
    } else if (!ev.shiftKey && document.activeElement === last) {
      ev.preventDefault();
      first.focus();
    }
  });

  /* ---------------------------------------------------------------------
     Shared little builders
     --------------------------------------------------------------------- */

  function demoBanner(id, textPL, critical) {
    return h('div', {
      id: id || null,
      class: 'mz-demo-banner' + (critical ? ' mz-demo-banner-critical' : ''),
      role: 'note'
    }, [
      h('span', { class: 'mz-demo-icon', html: WARN_SVG }),
      h('span', { text: textPL })
    ]);
  }

  function backBar(backId, onBack, extra) {
    var row = h('div', { class: 'mz-row' }, [
      h('button', {
        id: backId, type: 'button', class: 'mz-back-btn',
        'aria-label': 'Wróć do poprzedniego ekranu', text: '← Wróć', onclick: onBack
      }),
      h('span', { class: 'mz-grow' })
    ]);
    if (extra) row.appendChild(extra);
    return row;
  }

  function sectionTitle(textPL) {
    return h('h3', { class: 'mz-section-title', text: textPL });
  }

  /* ---------------------------------------------------------------------
     Premium screen (soft paywall)
     --------------------------------------------------------------------- */

  var paywall = {
    built: false,
    panel: null,
    selectedProductId: null,
    reason: null,
    pending: null,        // { resolve: fn, settled: bool }
    open: false,
    mode: 'buy',          // 'buy' | 'change' (subscriber) | 'owner' (owns it)
    extraProductId: null, // a normally hidden product this visit may also sell
    successTimer: null    // post-purchase "go back" timer, cancelled if the user moves first
  };

  var REASON_TITLES = {
    csv_export: 'Eksport CSV jest w Premium',
    history_long: 'Historia dłuższa niż 60 sekund jest w Premium',
    reports: 'Raport dzienny i tygodniowy jest w Premium',
    profiles: 'Profile progów są w Premium',
    alerts: 'Alerty progowe są w Premium',
    background: 'Podsumowanie sesji jest w Premium',
    remove_ads: 'Usuń reklamy albo przejdź na Premium',
    trial_ended: 'Okres próbny się zakończył',
    auto_value_moment: 'Zapisuj pomiary, nie tylko je oglądaj.'
  };
  var DEFAULT_PAYWALL_TITLE = 'Zapisuj pomiary, nie tylko je oglądaj.';

  var BENEFITS = [
    'Przeglądaj historię z 30 dni zamiast ostatnich 60 sekund.',
    'Eksportuj odczyty do pliku CSV i otwieraj je w arkuszu.',
    'Czytaj raport dzienny i tygodniowy: udział stref dzień po dniu i porównanie z dniem poprzednim.',
    'Włącz alerty progowe, zapisuj własne profile progów i korzystaj z aplikacji bez reklam.'
  ];

  var COMPARE_ROWS = [
    { feature: 'Pomiar na żywo', free: 'dostępne', premium: 'dostępne' },
    { feature: 'Gałki i wykresy', free: 'dostępne', premium: 'dostępne' },
    { feature: 'Historia odczytów', free: '60 sekund', premium: '30 dni' },
    { feature: 'Eksport CSV', free: 'niedostępne', premium: 'dostępne' },
    { feature: 'Raport dzienny i tygodniowy', free: 'niedostępne', premium: 'dostępne' },
    { feature: 'Profile progów', free: '1 profil', premium: 'do 5 profili' },
    { feature: 'Alerty progowe', free: 'niedostępne', premium: 'dostępne' },
    { feature: 'Podsumowanie sesji', free: 'niedostępne', premium: 'dostępne' },
    { feature: 'Reklamy', free: 'tak', premium: 'nie' }
  ];

  var TIMELINE = [
    { when: 'Dziś', what: 'pełny dostęp do funkcji Premium, 0 zł.' },
    { when: 'Dzień 5', what: 'przypomnimy o zbliżającym się końcu okresu próbnego.' },
    { when: 'Dzień 7', what: 'okres próbny się kończy. W tej wersji demonstracyjnej NIE następuje żadne obciążenie — aplikacja wraca do wersji darmowej.' }
  ];

  function planElementId(product) {
    if (product.plan === 'lifetime') return 'planLifetime';
    if (product.plan === 'yearly') return 'planYearly';
    if (product.plan === 'monthly') return 'planMonthly';
    return 'plan_' + product.id;
  }

  // The yearly plan only offers a trial while the local trial has not been used.
  function trialActiveFor(product) {
    return !!(product && product.hasTrial && !getState().trialUsed);
  }

  // Terms and CTA are formatted by billing.js — it is the one place that knows
  // the effective price, the trial end date and the renewal wording. The
  // literals below survive only as a fallback for a missing billing.js.
  function termsFor(product) {
    if (!product) return '';
    var b = billing();
    if (b && typeof b.formatTerms === 'function') {
      try {
        var terms = b.formatTerms(product.id, trialActiveFor(product));
        if (terms) return terms;
      } catch (_) { /* fall through */ }
    }
    if (trialActiveFor(product)) {
      var endsAt = Date.now() + (product.trialDays || 7) * DAY_MS;
      return trialDaysWordPL(product) + ' bezpłatnie, potem ' + fmtPriceOf(product) + ' rocznie. Okres próbny kończy się ' +
        fmtDate(endsAt) + '. Aby uniknąć opłaty, anuluj co najmniej 24 godziny wcześniej. ' +
        'To wersja demonstracyjna — żadna opłata nie zostanie pobrana.';
    }
    return product.termsPL || '';
  }

  function ctaFor(product) {
    if (!product) return 'Zamawiam i płacę';
    var b = billing();
    if (b && typeof b.formatCta === 'function') {
      try {
        var cta = b.formatCta(product.id, trialActiveFor(product));
        if (cta) return cta;
      } catch (_) { /* fall through */ }
    }
    if (trialActiveFor(product)) {
      return 'Zamawiam z obowiązkiem zapłaty — ' + trialDaysWordPL(product) + ' bezpłatnie, potem ' + fmtPriceOf(product) + ' / rok';
    }
    return product.ctaPL || ('Zamawiam i płacę — ' + fmtPriceOf(product));
  }

  function buildPlanCard(product) {
    var card = h('div', {
      id: planElementId(product),
      class: 'mz-plan',
      role: 'radio',
      'aria-checked': 'false',
      tabindex: '-1',
      'data-product': product.id,
      'aria-label': product.namePL + ', ' + spokenPriceOf(product) +
        (trialActiveFor(product) ? ', dostępne ' + trialDaysWordPL(product) + ' bezpłatnie' : '')
    });
    // The catalogue badge for the yearly plan advertises the trial. Once the
    // trial has been used the offer no longer applies to this user, and Play
    // policy treats advertising an unavailable trial as a deceptive offer.
    var badgeText = product.badgePL;
    if (product.hasTrial && !trialActiveFor(product)) badgeText = '';
    if (badgeText) {
      card.appendChild(h('span', { class: 'mz-plan-badge', text: badgeText }));
    }
    card.appendChild(h('span', { class: 'mz-plan-radio', 'aria-hidden': 'true' }));
    card.appendChild(h('span', { class: 'mz-plan-name', text: product.namePL }));
    // A redeemed promo code changes the amount charged, so the old price is
    // shown struck through above the new one instead of silently disappearing.
    if (discountedMinorOf(product) !== null) {
      card.appendChild(h('span', { class: 'mz-price-was' }, [
        h('span', { class: 'mz-visually-hidden', text: 'Cena przed rabatem: ' }),
        h('s', { text: fmtCatalogPriceOf(product) })
      ]));
    }
    // The amount actually charged is always the visually dominant number.
    if (discountedMinorOf(product) !== null) {
      // A promo code discounts the FIRST period only, so the dominant number is
      // labelled "za pierwszy rok", the renewal amount gets its own line, and
      // the catalogue's per-month / savings literals are dropped: they are
      // computed from the undiscounted price and would contradict the card.
      card.appendChild(h('span', {
        class: 'mz-price-major', text: fmtPriceOf(product) + ' ' + firstPeriodTextOf(product)
      }));
      var renewalLine = renewalSentenceOf(product);
      if (renewalLine) {
        card.appendChild(h('span', { class: 'mz-price-minor', text: renewalLine }));
      }
    } else {
      card.appendChild(h('span', { class: 'mz-price-major', text: fmtPriceOf(product) + ' ' + (product.periodText || '') }));
      if (product.perMonthText) {
        card.appendChild(h('span', { class: 'mz-price-minor', text: product.perMonthText }));
      }
      if (product.savingsText) {
        card.appendChild(h('span', { class: 'mz-savings', text: product.savingsText }));
      }
    }
    var sub = '';
    if (product.plan === 'lifetime') sub = 'Bez odnawiania. Płacisz raz i korzystasz zawsze.';
    else if (product.plan === 'yearly') sub = 'Odnawia się automatycznie co rok.' + (trialActiveFor(product) ? ' Dostępne ' + trialDaysWordPL(product) + ' bezpłatnie.' : '');
    else if (product.plan === 'monthly') sub = 'Odnawia się automatycznie co miesiąc.';
    else if (product.subPL) sub = product.subPL;
    if (sub) card.appendChild(h('span', { class: 'mz-plan-sub', text: sub }));

    card.addEventListener('click', function () { selectPlan(product.id, true); });
    card.addEventListener('keydown', function (ev) {
      if (ev.key === ' ' || ev.key === 'Enter') {
        ev.preventDefault();
        selectPlan(product.id, true);
        return;
      }
      var cards = paywallPlanCards();
      var index = cards.indexOf(card);
      var next = -1;
      if (ev.key === 'ArrowDown' || ev.key === 'ArrowRight') next = (index + 1) % cards.length;
      else if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') next = (index - 1 + cards.length) % cards.length;
      else if (ev.key === 'Home') next = 0;
      else if (ev.key === 'End') next = cards.length - 1;
      if (next >= 0) {
        ev.preventDefault();
        var target = cards[next];
        selectPlan(target.getAttribute('data-product'), false);
        target.focus();
      }
    });
    return card;
  }

  var renderedPromoCode = null;
  var renderedTrialUsed = null;
  var renderedExtraProductId = null;

  // Plan cards bake the price into the DOM, so redeeming (or losing) a promo
  // code has to rebuild them — otherwise a card would keep quoting a price the
  // engine no longer charges. Rebuilt only when the code actually changed.
  function syncPlanPrices() {
    var group = byId('premiumPlans');
    if (!group) return;
    var code = getState().promoCode || null;
    // Spending the trial changes the yearly card's badge, subtitle and
    // aria-label, so it has to invalidate the rendered cards just like a code.
    var trialUsed = getState().trialUsed === true;
    var extraId = paywall.extraProductId || null;
    if (code === renderedPromoCode && trialUsed === renderedTrialUsed && extraId === renderedExtraProductId) return;
    renderedPromoCode = code;
    renderedTrialUsed = trialUsed;
    renderedExtraProductId = extraId;
    var focusedId = (document.activeElement && document.activeElement.id) || null;
    clear(group);
    getProducts().forEach(function (product) {
      // remove_ads is normally off the paywall, but the "Usuń reklamy" entry
      // point asks for it explicitly — otherwise the product would be listed,
      // priced and unbuyable from anywhere in the app.
      if (product.visibleOnPaywall === false && product.id !== extraId) return;
      group.appendChild(buildPlanCard(product));
    });
    selectPlan(paywall.selectedProductId || defaultProductId(), false);
    if (focusedId && byId(focusedId)) focusLater(byId(focusedId));
  }

  function paywallPlanCards() {
    var group = byId('premiumPlans');
    if (!group) return [];
    return Array.prototype.slice.call(group.querySelectorAll('.mz-plan'));
  }

  function selectPlan(productId, focusIt) {
    var product = getProduct(productId);
    if (!product) return;
    paywall.selectedProductId = productId;
    paywallPlanCards().forEach(function (card) {
      var selected = card.getAttribute('data-product') === productId;
      card.setAttribute('aria-checked', selected ? 'true' : 'false');
      card.tabIndex = selected ? 0 : -1;
      if (selected && focusIt) card.focus();
    });
    var terms = byId('premiumTerms');
    if (terms) terms.textContent = termsFor(product);
    var buy = byId('premiumBuyBtn');
    if (buy) {
      // A subscriber is not buying a second time — they are moving plans.
      buy.textContent = paywall.mode === 'change'
        ? ('Zmień plan na: ' + product.namePL + ' — ' + fmtPriceOf(product) + ' ' + (product.periodText || ''))
        : ctaFor(product);
    }
    var timeline = byId('premiumTrialTimeline');
    // The timeline explains the yearly trial — irrelevant noise for other plans.
    if (timeline) setHidden(timeline, !trialActiveFor(product));
    updateBuyEnabled();
  }

  function updateBuyEnabled() {
    var check = byId('premiumConsentCheck');
    var buy = byId('premiumBuyBtn');
    var status = byId('premiumBuyStatus');
    if (!check || !buy) return;
    var ok = check.checked === true;
    // aria-disabled, not disabled: a `disabled` button drops out of the Tab
    // order, so a keyboard user would never reach the paywall's main CTA and
    // would never hear why it is inert. onBuyClick refuses the click instead.
    buy.disabled = false;
    buy.setAttribute('aria-disabled', ok ? 'false' : 'true');
    buy.setAttribute('aria-describedby', ok ? 'premiumTerms' : 'premiumBuyStatus premiumTerms');
    if (status) {
      status.textContent = ok ? '' : 'Aby kontynuować, zaznacz powyższe oświadczenie.';
    }
  }

  function buildPaywall() {
    var panel = byId('panelPremium');
    if (!panel) {
      panel = h('div', {
        id: 'panelPremium', class: 'mz-screen', role: 'region',
        'aria-labelledby': 'premiumTitle', hidden: true
      });
      var main = document.querySelector('main');
      (main || document.body).appendChild(panel);
    }
    paywall.panel = panel;
    clear(panel);

    panel.appendChild(backBar('premiumBackBtn', function () { dismissPaywall(); }, h('button', {
      id: 'premiumRestoreBtn', type: 'button', class: 'btn',
      text: 'Przywróć zakupy', onclick: function () { api.restoreFromMenu(); }
    })));

    // The DEMO note comes straight after the back bar, so a screen reader
    // reaches it before the title and before any price on this screen.
    panel.appendChild(demoBanner('premiumDemoBanner',
      'DEMO — SYMULACJA. To prototyp interfejsu. Nie zostanie pobrana żadna opłata, ' +
      'nie są przetwarzane żadne dane płatnicze.', false));

    panel.appendChild(h('div', {
      id: 'welcomeOfferBanner', class: 'mz-upsell-card', hidden: true, role: 'note'
    }));

    panel.appendChild(h('div', { class: 'mz-hero' }, [
      // aria-describedby sits on the TITLE, not on the panel: focus is moved to
      // the title, and a region's description is only announced when focus
      // enters the region itself.
      h('h2', {
        id: 'premiumTitle', class: 'mz-screen-title', tabindex: '-1',
        'aria-describedby': 'premiumDemoBanner', text: DEFAULT_PAYWALL_TITLE
      }),
      h('p', {
        id: 'premiumSubtitle',
        text: 'Wersja darmowa działa dalej bez ograniczeń — pomiar, obie gałki, wykresy 60 s, ' +
          'tabela, progi i cała Dokumentacja pozostają bezpłatne na zawsze.'
      })
    ]));

    panel.appendChild(h('ul', { id: 'premiumBenefits', class: 'mz-benefits' },
      BENEFITS.map(function (text) {
        return h('li', { class: 'mz-benefit' }, [
          h('span', { class: 'mz-benefit-icon', html: CHECK_SVG }),
          h('span', { text: text })
        ]);
      })
    ));

    var plansGroup = h('div', {
      id: 'premiumPlans', class: 'mz-plans', role: 'radiogroup', 'aria-label': 'Wybierz plan Premium'
    });
    getProducts().forEach(function (product) {
      if (product.visibleOnPaywall === false) return;
      plansGroup.appendChild(buildPlanCard(product));
    });
    panel.appendChild(plansGroup);

    if (!billingAvailable()) {
      panel.appendChild(h('p', {
        class: 'mz-terms',
        text: 'Zakup jest dostępny tylko w wersji aplikacji zainstalowanej z Google Play. ' +
          'W przeglądarce wszystkie funkcje pomiarowe działają bezpłatnie.'
      }));
    }

    // Shown when no catalogue could be read at all (billing.js missing from a
    // stale service-worker cache). Never an offer with made-up prices.
    panel.appendChild(h('p', {
      id: 'premiumNoCatalogue', class: 'mz-terms', hidden: true,
      text: 'Katalog produktów jest chwilowo niedostępny, więc nie możemy pokazać planów ani cen. ' +
        'Wszystkie funkcje pomiaru — kamera, obie gałki, wykresy 60 s, tabela, progi i cała ' +
        'Dokumentacja — działają bezpłatnie.'
    }));

    panel.appendChild(sectionTitle('Co dostajesz — porównanie'));
    var table = h('table', { id: 'premiumCompareTable', class: 'mz-compare-table' }, [
      h('caption', { text: 'Porównanie wersji darmowej i Premium' }),
      h('thead', {}, h('tr', {}, [
        h('th', { scope: 'col', text: 'Funkcja' }),
        h('th', { scope: 'col', text: 'Darmowy' }),
        h('th', { scope: 'col', class: 'mz-compare-premium-col', text: 'Premium' })
      ])),
      h('tbody', {}, COMPARE_ROWS.map(function (row) {
        return h('tr', {}, [
          h('th', { scope: 'row', class: 'mz-compare-feature', text: row.feature }),
          compareCell(row.free),
          compareCell(row.premium, true)
        ]);
      }))
    ]);
    panel.appendChild(h('div', { id: 'premiumCompare', class: 'mz-compare' }, table));

    var timeline = h('div', { id: 'premiumTrialTimeline', class: 'mz-timeline', hidden: true }, [
      sectionTitle('Jak działa okres próbny (plan roczny)')
    ]);
    TIMELINE.forEach(function (step) {
      timeline.appendChild(h('div', { class: 'mz-timeline-step' }, [
        h('span', { class: 'mz-timeline-dot', 'aria-hidden': 'true' }),
        h('span', { class: 'mz-timeline-when', text: step.when }),
        h('span', { class: 'mz-timeline-what', text: '— ' + step.what })
      ]));
    });
    panel.appendChild(timeline);

    var promoRow = h('div', { id: 'premiumPromoRow', class: 'mz-promo-row', hidden: true }, [
      h('label', { class: 'mz-visually-hidden', for: 'premiumPromoInput', text: 'Kod promocyjny' }),
      h('input', {
        id: 'premiumPromoInput', class: 'mz-promo-input', type: 'text',
        placeholder: 'Wpisz kod', autocomplete: 'off', autocapitalize: 'characters'
      }),
      h('button', { id: 'premiumPromoApply', type: 'button', class: 'btn', text: 'Użyj kodu', onclick: applyPromo })
    ]);
    panel.appendChild(h('div', { id: 'premiumPromo', class: 'mz-promo' }, [
      h('button', {
        id: 'premiumPromoToggle', type: 'button', class: 'btn-quiet',
        'aria-expanded': 'false', 'aria-controls': 'premiumPromoRow',
        text: 'Mam kod promocyjny',
        onclick: function () {
          var row = byId('premiumPromoRow');
          var toggle = byId('premiumPromoToggle');
          var show = row.hasAttribute('hidden');
          setHidden(row, !show);
          toggle.setAttribute('aria-expanded', show ? 'true' : 'false');
          if (show) focusLater(byId('premiumPromoInput'));
        }
      }),
      promoRow,
      h('p', { id: 'premiumPromoStatus', class: 'mz-promo-status', 'aria-live': 'polite' })
    ]));

    // Shown INSTEAD of the plans to someone who already owns Premium outright.
    panel.appendChild(h('div', { id: 'premiumOwnerBox', class: 'mz-upsell-card', role: 'note', hidden: true }, [
      h('span', { class: 'mz-upsell-icon', html: CHECK_SVG }),
      h('span', { id: 'premiumOwnerTitle', class: 'mz-upsell-title', text: '' }),
      h('span', { id: 'premiumOwnerSub', class: 'mz-upsell-sub', text: '' }),
      h('button', {
        id: 'premiumOwnerAccountBtn', type: 'button', class: 'btn btn-large',
        text: 'Zarządzaj subskrypcją i kontem',
        onclick: function () { api.openAccount({ returnFocusTo: this }); }
      })
    ]));

    panel.appendChild(h('p', { id: 'premiumTerms', class: 'mz-terms' }));

    // A <label> wrapping both the box and the text makes the whole row a touch
    // target — the legally load-bearing control must not be the hardest to hit.
    panel.appendChild(h('label', { id: 'premiumConsentRow', class: 'mz-consent-row', for: 'premiumConsentCheck' }, [
      h('input', {
        id: 'premiumConsentCheck', class: 'mz-consent-check', type: 'checkbox',
        onchange: updateBuyEnabled
      }),
      h('span', {
        id: 'premiumConsentLabel',
        text: 'Żądam rozpoczęcia świadczenia usługi cyfrowej przed upływem 14-dniowego terminu ' +
          'na odstąpienie od umowy i przyjmuję do wiadomości, że z chwilą pełnego wykonania ' +
          'usługi tracę prawo do odstąpienia od umowy.'
      })
    ]));

    panel.appendChild(h('p', { id: 'premiumDisclaimer', class: 'mz-disclaimer', text: MEDICAL_DISCLAIMER }));

    panel.appendChild(h('div', { class: 'mz-sticky-footer' }, [
      h('p', { id: 'premiumBuyStatus', class: 'mz-muted', 'aria-live': 'polite' }),
      h('button', {
        id: 'premiumBuyBtn', type: 'button', class: 'btn btn-primary btn-large',
        'aria-describedby': 'premiumTerms', onclick: onBuyClick
      }),
      // Same size and prominence as the buy button — closing is never a grey link.
      h('button', {
        id: 'premiumDismissBtn', type: 'button', class: 'btn btn-large',
        'aria-label': 'Zamknij ofertę i wróć do aplikacji',
        text: 'Nie teraz — korzystaj bezpłatnie',
        onclick: function () { dismissPaywall(); }
      }),
      h('p', { id: 'premiumLegalLinks', class: 'mz-legal' }, [
        // One button per destination: two differently named controls doing the
        // same thing are noise for a screen reader.
        h('button', {
          id: 'premiumTermsLink', type: 'button', class: 'btn-quiet', text: 'Regulamin i prywatność',
          onclick: function () { goScreen('about', 'panelAbout', this); }
        }),
        h('span', { text: ' · ', 'aria-hidden': 'true' }),
        h('button', {
          type: 'button', class: 'btn-quiet', text: 'Przywróć zakupy',
          onclick: function () { api.restoreFromMenu(); }
        })
      ])
    ]));

    panel.appendChild(h('div', { id: 'premiumLive', class: 'mz-visually-hidden', 'aria-live': 'polite' }));

    paywall.built = true;
    renderedPromoCode = getState().promoCode || null;
    selectPlan(defaultProductId(), false);
    updateBuyEnabled();
    updateWelcomeOffer();
  }

  function compareCell(value, isPremiumCol) {
    var cls = 'mz-compare-val';
    if (value === 'dostępne') cls = 'mz-compare-yes';
    else if (value === 'niedostępne') cls = 'mz-compare-no';
    if (isPremiumCol) cls += ' mz-compare-premium-col';
    // Every cell carries readable text — no bare glyphs for screen readers.
    return h('td', { class: cls, text: value });
  }

  function applyPromo() {
    var input = byId('premiumPromoInput');
    var status = byId('premiumPromoStatus');
    var b = billing();
    if (!input || !status) return;
    var code = (input.value || '').trim();
    if (!code) {
      status.textContent = 'Wpisz kod promocyjny.';
      return;
    }
    if (!b || typeof b.redeemPromoCode !== 'function') {
      status.textContent = 'Kody promocyjne są niedostępne w tej wersji.';
      return;
    }
    status.textContent = 'Sprawdzam kod…';
    b.redeemPromoCode(code).then(function (result) {
      status.textContent = (result && result.messagePL) ? result.messagePL : 'Nieznany kod promocyjny.';
      if (result && result.ok) {
        toast(result.messagePL, { type: 'success' });
        api.refresh();
      }
    });
  }

  function updateWelcomeOffer() {
    var banner = byId('welcomeOfferBanner');
    if (!banner) return;
    var b = billing();
    var offer = null;
    if (b && typeof b.getPromoOffer === 'function') {
      try { offer = b.getPromoOffer(); } catch (_) { offer = null; }
    }
    if (!offer || isPremiumTier()) {
      setHidden(banner, true);
      clear(banner);
      return;
    }
    clear(banner);
    banner.appendChild(h('span', { class: 'mz-upsell-icon', html: STAR_SVG }));
    banner.appendChild(h('span', { class: 'mz-upsell-title', text: offer.labelPL || 'Oferta powitalna' }));
    // No countdown, no "expires in MM:SS" — the spec forbids urgency patterns.
    banner.appendChild(h('span', { class: 'mz-upsell-sub', text: 'Oferta powitalna ważna dziś.' }));
    banner.appendChild(h('button', {
      id: 'welcomeOfferBtn', type: 'button', class: 'btn btn-large',
      text: 'Użyj kodu ' + offer.code,
      onclick: function () {
        var input = byId('premiumPromoInput');
        var row = byId('premiumPromoRow');
        if (input && row) {
          setHidden(row, false);
          var toggle = byId('premiumPromoToggle');
          if (toggle) toggle.setAttribute('aria-expanded', 'true');
          input.value = offer.code;
        }
        applyPromo();
      }
    }));
    setHidden(banner, false);
  }

  function onBuyClick() {
    var product = getProduct(paywall.selectedProductId) || getProduct(defaultProductId());
    if (!product) return;
    var check = byId('premiumConsentCheck');
    if (!check || !check.checked) {
      announce('premiumBuyStatus', 'Aby kontynuować, zaznacz powyższe oświadczenie.');
      focusLater(check);
      return;
    }
    if (!billingAvailable()) {
      showPurchaseUnavailable();
      return;
    }
    if (paywall.mode === 'change') {
      runPlanChange(product);
      return;
    }
    openPurchaseSheet(product, trialActiveFor(product));
  }

  // Plan change goes through Billing.changePlan(), not startPurchase() — the
  // engine replaces the existing subscription instead of stacking a second one.
  function runPlanChange(product) {
    var b = billing();
    if (!b || typeof b.changePlan !== 'function') {
      showPurchaseUnavailable();
      return;
    }
    var buy = byId('premiumBuyBtn');
    if (buy) buy.disabled = true;
    announce('premiumLive', 'Zmieniam plan (symulacja). To potrwa chwilę.');
    b.changePlan(product.id).then(function (result) {
      var ok = !!(result && result.ok);
      var message = (result && result.messagePL) ||
        (ok ? 'Plan został zmieniony (symulacja).' : 'Nie udało się zmienić planu.');
      toast(message, { type: ok ? 'success' : 'warning' });
      announce('premiumLive', message);
      api.refresh();
      if (ok) {
        settlePaywall({ purchased: true, productId: product.id, dismissed: false, code: 'OK' });
        goBack();
      }
    });
  }

  function settlePaywall(result) {
    var pending = paywall.pending;
    paywall.pending = null;
    paywall.open = false;
    if (paywall.successTimer) {
      window.clearTimeout(paywall.successTimer);
      paywall.successTimer = null;
    }
    if (pending && !pending.settled) {
      pending.settled = true;
      pending.resolve(result);
    }
  }

  // Settles the pending openPaywall() promise as "dismissed" WITHOUT navigating.
  // Used when the user already left the screen by another route (bottom bar,
  // Escape handled by menu.js) — navigating again would skip a screen.
  function settleDismissed() {
    if (!paywall.open) return;
    var reason = paywall.reason || 'nav';
    var b = billing();
    if (b && typeof b.markPaywallDismissed === 'function') {
      try { b.markPaywallDismissed(reason); } catch (_) { /* never blocks closing */ }
    }
    settlePaywall({ purchased: false, productId: null, dismissed: true, code: 'USER_CANCELED' });
  }

  function dismissPaywall() {
    settleDismissed();
    goBack();
  }

  // What this screen may offer depends on what the user already has. Selling a
  // product someone already owns is forbidden by Google Play policy — and for
  // a low-vision user a full sales screen after a purchase is simply confusing.
  // A trial user still sees the plans: converting is their own way forward.
  // Everything openPaywall() does to make the screen safe to show again, minus
  // navigation and the promise. Also used when the screen is re-entered from
  // the history stack, which never goes through openPaywall().
  function resetPaywallForVisit() {
    paywall.extraProductId = null;
    paywall.mode = paywallModeFor();
    var title = byId('premiumTitle');
    if (title && paywall.mode === 'owner') title.textContent = 'Twoja wersja Premium (DEMO)';
    syncPlanPrices();
    applyPaywallMode();
    var check = byId('premiumConsentCheck');
    if (check) check.checked = false;   // consent is never carried over
    updateBuyEnabled();
    updateWelcomeOffer();
    selectFirstVisiblePlan();
  }

  // Keeps the radio group usable: applyPaywallMode() can hide the very card
  // that is selected, which would leave the group with no visible checked
  // option and its only tabindex=0 element display:none.
  function selectFirstVisiblePlan() {
    var visible = paywallPlanCards().filter(function (card) {
      return !card.hasAttribute('hidden');
    });
    if (!visible.length) return;
    var stillVisible = visible.some(function (card) {
      return card.getAttribute('data-product') === paywall.selectedProductId;
    });
    selectPlan(stillVisible ? paywall.selectedProductId : visible[0].getAttribute('data-product'), false);
  }

  function paywallModeFor() {
    var b = billing();
    if (!b) return 'buy';
    var premium = false;
    var trial = false;
    try { premium = b.isPremium() === true; } catch (_) { premium = false; }
    try { trial = b.isTrial() === true; } catch (_) { trial = false; }
    if (!premium || trial) return 'buy';
    var plan = getState().plan;
    // An active subscription can still move to another plan; a lifetime
    // purchase has nothing left to buy.
    return (plan === 'yearly' || plan === 'monthly') ? 'change' : 'owner';
  }

  function ownedPlanNamePL() {
    var product = getProduct(getState().productId);
    return product ? product.namePL : 'Premium (DEMO)';
  }

  function applyPaywallMode() {
    var mode = paywall.mode;
    var owner = mode === 'owner';
    var change = mode === 'change';
    // Nothing to sell either when the user owns it already or when no
    // catalogue could be read.
    var noCatalogue = paywallPlanCards().length === 0;
    var hideOffer = owner || noCatalogue;

    setHidden(byId('premiumPlans'), hideOffer);
    setHidden(byId('premiumBuyBtn'), hideOffer);
    setHidden(byId('premiumTerms'), hideOffer);
    setHidden(byId('premiumConsentRow'), hideOffer);
    setHidden(byId('premiumBuyStatus'), hideOffer);
    setHidden(byId('premiumPromo'), hideOffer);
    setHidden(byId('premiumOwnerBox'), !owner);
    setHidden(byId('premiumNoCatalogue'), !noCatalogue);
    if (hideOffer) setHidden(byId('premiumTrialTimeline'), true);

    var dismiss = byId('premiumDismissBtn');
    if (dismiss) {
      dismiss.textContent = owner ? 'Wróć do aplikacji' : 'Nie teraz — korzystaj bezpłatnie';
      dismiss.setAttribute('aria-label', owner
        ? 'Wróć do aplikacji'
        : 'Zamknij ofertę i wróć do aplikacji');
    }

    var subtitle = byId('premiumSubtitle');
    var ownerTitle = byId('premiumOwnerTitle');
    var ownerSub = byId('premiumOwnerSub');
    if (owner) {
      if (ownerTitle) ownerTitle.textContent = 'Masz już ' + ownedPlanNamePL() + ' (DEMO).';
      if (ownerSub) {
        ownerSub.textContent = 'Wszystkie funkcje Premium są odblokowane. Nie ma tu nic do kupienia — ' +
          'szczegóły i rezygnację znajdziesz na ekranie Konto i subskrypcja.';
      }
      if (subtitle) {
        subtitle.textContent = 'Poniżej widzisz, co obejmuje Twoja wersja Premium. ' +
          'Pomiar, obie gałki, wykresy 60 s, tabela, progi i cała Dokumentacja pozostają bezpłatne dla wszystkich.';
      }
    } else if (change) {
      if (subtitle) {
        subtitle.textContent = 'Masz aktywny plan: ' + ownedPlanNamePL() +
          ' (DEMO). Możesz przejść na inny plan — zmiana zastępuje obecny, nie dokłada drugiej opłaty.';
      }
    } else if (subtitle) {
      subtitle.textContent = 'Wersja darmowa działa dalej bez ograniczeń — pomiar, obie gałki, wykresy 60 s, ' +
        'tabela, progi i cała Dokumentacja pozostają bezpłatne na zawsze.';
    }

    // In change mode the plan already owned is not on offer any more.
    var ownedId = change ? getState().productId : null;
    paywallPlanCards().forEach(function (card) {
      setHidden(card, ownedId !== null && card.getAttribute('data-product') === ownedId);
    });
    return ownedId;
  }

  function openPaywall(reason, opts) {
    opts = opts || {};
    if (!paywall.built) buildPaywall();
    // Opening a second paywall over an unresolved one would abandon the first
    // promise forever, and the gate that awaited it would never run.
    if (paywall.pending && !paywall.pending.settled) {
      settlePaywall({ purchased: false, productId: null, dismissed: true, code: 'USER_CANCELED' });
    }
    paywall.reason = reason || 'nav';
    // "Usuń reklamy" is the one entry point allowed to offer the cheap one-off
    // remove_ads product; everywhere else it stays off the plan list.
    paywall.extraProductId = (paywall.reason === 'remove_ads' && !getState().removeAdsOwned)
      ? PRODUCT_IDS.REMOVE_ADS : null;
    paywall.mode = paywallModeFor();
    var title = byId('premiumTitle');
    if (title) {
      title.textContent = paywall.mode === 'owner'
        ? 'Twoja wersja Premium (DEMO)'
        : (REASON_TITLES[paywall.reason] || DEFAULT_PAYWALL_TITLE);
    }
    syncPlanPrices();
    var ownedId = applyPaywallMode();
    if (paywall.mode === 'owner') {
      // Nothing to sell: navigate to the screen, settle the caller straight
      // away so a gate that opened us does not keep waiting.
      updateWelcomeOffer();   // hides the welcome offer banner for an owner
      goScreen('premium', 'panelPremium', opts.returnFocusTo || null);
      focusLater(byId('premiumTitle'));
      return Promise.resolve({ purchased: false, productId: null, dismissed: true, code: 'ALREADY_OWNED' });
    }
    var wanted = opts.productId || paywall.extraProductId || defaultProductId();
    if (ownedId && wanted === ownedId) {
      var alternative = getProducts().filter(function (product) {
        return product.visibleOnPaywall !== false && product.id !== ownedId;
      })[0];
      if (alternative) wanted = alternative.id;
    }
    selectPlan(wanted, false);
    var check = byId('premiumConsentCheck');
    if (check) check.checked = false;   // consent is never pre-ticked
    updateBuyEnabled();
    updateWelcomeOffer();

    var promise = new Promise(function (resolve) {
      paywall.pending = { resolve: resolve, settled: false };
    });
    paywall.open = true;
    goScreen('premium', 'panelPremium', opts.returnFocusTo || null);
    focusLater(byId('premiumTitle'));
    return promise;
  }

  /* ---------------------------------------------------------------------
     Purchase sheet (stands in for the native Google Play sheet)
     --------------------------------------------------------------------- */

  var purchaseSheet = null;

  function ensurePurchaseSheet() {
    if (purchaseSheet) return purchaseSheet;
    purchaseSheet = createDialog({
      id: 'mzPurchaseSheet', titleId: 'mzPurchaseTitle',
      backdropId: 'mzPurchaseBackdrop', className: 'mz-sheet'
    });
    return purchaseSheet;
  }

  function summaryRow(label, value) {
    return h('div', { class: 'mz-row' }, [
      h('span', { class: 'mz-muted', text: label + ' ' }),
      h('span', { class: 'mz-strong', text: value })
    ]);
  }

  function showPurchaseUnavailable() {
    var sheet = ensurePurchaseSheet();
    clear(sheet.body);
    sheet.body.appendChild(demoBanner(null,
      'SYMULACJA PŁATNOŚCI — to nie jest prawdziwa płatność. Żadne pieniądze nie zostaną ' +
      'pobrane, nie są przetwarzane żadne dane karty ani konta.', true));
    sheet.body.appendChild(h('h2', { id: 'mzPurchaseTitle', class: 'mz-dialog-title', tabindex: '-1', text: 'Zakup niedostępny' }));
    sheet.body.appendChild(h('p', {
      id: 'mzPurchaseResult', class: 'mz-result', 'aria-live': 'assertive',
      text: 'Zakup jest dostępny tylko w wersji aplikacji zainstalowanej z Google Play. ' +
        'W przeglądarce wszystkie funkcje pomiarowe działają bezpłatnie.'
    }));
    sheet.body.appendChild(h('div', { class: 'mz-dialog-actions' }, [
      h('button', {
        id: 'mzPurchaseCloseBtn', type: 'button', class: 'btn btn-large', text: 'Zamknij',
        onclick: function () { closeDialog(sheet); }
      })
    ]));
    openDialog(sheet, { onEscape: function () { closeDialog(sheet); } });
  }

  function openPurchaseSheet(product, withTrial) {
    var sheet = ensurePurchaseSheet();
    clear(sheet.body);

    sheet.body.appendChild(demoBanner(null,
      'SYMULACJA PŁATNOŚCI — to nie jest prawdziwa płatność. Żadne pieniądze nie zostaną ' +
      'pobrane, nie są przetwarzane żadne dane karty ani konta.', true));

    sheet.body.appendChild(h('h2', {
      id: 'mzPurchaseTitle', class: 'mz-dialog-title', tabindex: '-1', text: 'Podsumowanie zamówienia'
    }));

    var periodText = product.periodText || '';
    var renewText = product.type === 'subs' ? 'automatyczne, aż do anulowania' : 'nie dotyczy';
    var priceText = withTrial
      ? ('0,00 zł przez ' + trialDaysWordPL(product) + ', potem ' + fmtPriceOf(product))
      : fmtPriceOf(product);
    var summary = h('div', { id: 'mzPurchaseSummary', class: 'mz-stack' }, [
      summaryRow('Produkt:', product.namePL),
      summaryRow('Cena:', priceText)
    ]);
    // The sheet must state the same amount the engine will charge, and say
    // where a lower amount came from.
    if (discountedMinorOf(product) !== null) {
      summary.appendChild(summaryRow('Rabat:',
        'kod ' + String(getState().promoCode || '').toUpperCase() +
        ', cena bez rabatu ' + fmtCatalogPriceOf(product)));
    }
    summary.appendChild(summaryRow('Okres:', periodText));
    summary.appendChild(summaryRow('Odnawianie:', renewText));
    summary.appendChild(summaryRow('Sprzedawca:', '(dane demonstracyjne)'));
    sheet.body.appendChild(summary);

    sheet.body.appendChild(h('p', { class: 'mz-muted', text: 'Wybierz wynik symulacji:' }));

    var actions = h('div', { class: 'mz-dialog-actions' }, [
      h('button', {
        id: 'mzPurchaseSuccessBtn', type: 'button', class: 'btn btn-primary btn-large',
        text: 'Symuluj udany zakup',
        onclick: function () { runPurchase(product, withTrial, 'success'); }
      }),
      h('button', {
        id: 'mzPurchaseCancelBtn', type: 'button', class: 'btn btn-large',
        text: 'Symuluj anulowanie przez użytkownika',
        onclick: function () { runPurchase(product, withTrial, 'cancel'); }
      }),
      h('button', {
        id: 'mzPurchaseErrorBtn', type: 'button', class: 'btn btn-large',
        text: 'Symuluj błąd płatności',
        onclick: function () { runPurchase(product, withTrial, 'error'); }
      }),
      h('button', {
        id: 'mzPurchaseCloseBtn', type: 'button', class: 'btn btn-large', text: 'Zamknij',
        onclick: function () { closeDialog(sheet); }
      })
    ]);
    sheet.body.appendChild(actions);

    sheet.body.appendChild(h('div', {
      id: 'mzPurchaseSpinner', class: 'mz-spinner', role: 'status', 'aria-live': 'polite', hidden: true
    }));
    sheet.body.appendChild(h('p', { id: 'mzPurchaseResult', class: 'mz-result', 'aria-live': 'assertive' }));

    openDialog(sheet, { onEscape: function () { closeDialog(sheet); } });
  }

  function setSheetBusy(busy, messagePL) {
    var sheet = purchaseSheet;
    if (!sheet) return;
    ['mzPurchaseSuccessBtn', 'mzPurchaseCancelBtn', 'mzPurchaseErrorBtn', 'mzPurchaseCloseBtn'].forEach(function (id) {
      var btn = byId(id);
      if (btn) btn.disabled = busy;
    });
    var spinner = byId('mzPurchaseSpinner');
    if (spinner) {
      setHidden(spinner, !busy);
      spinner.textContent = busy ? messagePL : '';
    }
  }

  function runPurchase(product, withTrial, outcome) {
    var b = billing();
    var sheet = purchaseSheet;
    var resultEl = byId('mzPurchaseResult');
    if (!b || typeof b.startPurchase !== 'function') {
      if (resultEl) resultEl.textContent = 'Symulacja niedostępna — brak modułu zakupów.';
      return;
    }
    setSheetBusy(true, 'Przetwarzanie symulowanej płatności… To potrwa chwilę. Nie zamykaj ekranu.');
    if (resultEl) {
      resultEl.textContent = '';
      resultEl.className = 'mz-result';
    }
    b.startPurchase(product.id, {
      outcome: outcome,
      withTrial: !!withTrial,
      consumerConsent: true,
      promoCode: getState().promoCode || undefined
    }).then(function (result) {
      setSheetBusy(false, '');
      var ok = !!(result && result.ok);
      var message = (result && result.messagePL) ? result.messagePL : '';
      if (!message) {
        if (outcome === 'success') message = 'Symulacja zakończona. Wersja Premium (DEMO) została włączona. Nie pobrano żadnej opłaty.';
        else if (outcome === 'cancel') message = 'Symulacja anulowana. Nic nie zostało kupione. Wszystkie funkcje pomiaru działają dalej bezpłatnie.';
        else message = 'Symulacja błędu płatności. Nic nie zostało kupione. Spróbuj ponownie lub zamknij ten ekran.';
      }
      if (resultEl) {
        resultEl.textContent = message;
        resultEl.className = 'mz-result ' + (ok ? 'mz-result-ok' : 'mz-result-error');
      }
      api.refresh();
      if (ok) {
        toast(message, { type: 'success' });
        paywall.successTimer = window.setTimeout(function () {
          paywall.successTimer = null;
          if (sheet && isDialogOpen(sheet)) closeDialog(sheet);
          var onPaywall = !window.AppNav || typeof window.AppNav.current !== 'function' ||
            window.AppNav.current() === 'premium';
          settlePaywall({ purchased: true, productId: product.id, dismissed: false, code: 'OK' });
          // Only leave the paywall if the user is still standing on it. If they
          // already navigated away, going "back" would drag them onto premium.
          if (onPaywall) goBack();
        }, prefersReducedMotion() ? 200 : 900);
      }
    });
  }

  /* ---------------------------------------------------------------------
     Account screen
     --------------------------------------------------------------------- */

  var accountBuilt = false;

  var STATUS_PILL_CLASS = {
    none: 'mz-status-pill-none',
    expired: 'mz-status-pill-none',
    trial: 'mz-status-pill-trial',
    active: 'mz-status-pill-active',
    canceled: 'mz-status-pill-canceled',
    paused: 'mz-status-pill-paused',
    on_hold: 'mz-status-pill-hold',
    grace: 'mz-status-pill-hold'
  };
  var STATUS_LABEL = {
    none: 'BRAK SUBSKRYPCJI',
    expired: 'BRAK SUBSKRYPCJI',
    trial: 'OKRES PRÓBNY',
    active: 'AKTYWNA',
    canceled: 'ANULOWANA — DOSTĘP DO KOŃCA OKRESU',
    paused: 'WSTRZYMANA',
    on_hold: 'ZALEGŁOŚĆ W PŁATNOŚCI',
    grace: 'ZALEGŁOŚĆ W PŁATNOŚCI'
  };

  // Every entry here must be a feature the app actually delivers — this list
  // is what the user reads back after paying.
  var ACCOUNT_FEATURES = [
    { id: 'historyLong', labelPL: 'Historia 30 dni' },
    { id: 'csvExport', labelPL: 'Eksport CSV' },
    { id: 'reports', labelPL: 'Raport dzienny i tygodniowy' },
    { id: 'profiles', labelPL: 'Profile progów' },
    { id: 'alerts', labelPL: 'Alerty progowe' },
    { id: 'background', labelPL: 'Podsumowanie sesji' },
    { id: 'noAds', labelPL: 'Bez reklam' }
  ];

  function buildAccount() {
    var panel = byId('panelAccount');
    if (!panel) {
      panel = h('div', {
        id: 'panelAccount', class: 'mz-screen', role: 'region',
        'aria-labelledby': 'accountTitle', hidden: true
      });
      var main = document.querySelector('main');
      (main || document.body).appendChild(panel);
    }
    clear(panel);

    panel.appendChild(backBar('accountBackBtn', function () { goBack(); }, null));
    panel.appendChild(demoBanner('accountDemoBanner',
      'DEMO — SYMULACJA subskrypcji. Nie ma tu prawdziwych płatności ani konta Google. ' +
      'Wszystkie dane na tym ekranie są fikcyjne.', false));
    panel.appendChild(h('h2', {
      id: 'accountTitle', class: 'mz-screen-title', tabindex: '-1',
      'aria-describedby': 'accountDemoBanner', text: 'Konto i subskrypcja'
    }));
    panel.appendChild(h('div', { id: 'accountStatusCard', class: 'mz-account-card' }));
    panel.appendChild(sectionTitle('Konto (symulacja)'));
    panel.appendChild(h('div', { id: 'accountAccountRow', class: 'mz-list' }));
    panel.appendChild(sectionTitle('Co masz w Premium'));
    panel.appendChild(h('div', { id: 'accountFeatureList', class: 'mz-feature-grid' }));
    panel.appendChild(h('div', { id: 'accountActions', class: 'mz-list' }));
    panel.appendChild(h('p', { id: 'accountNoteLine', class: 'mz-muted' }));
    panel.appendChild(h('p', {
      class: 'mz-muted',
      text: 'Zwrotów za zakupy dokonane w Google Play dokonuje Google: play.google.com/store/account. ' +
        'Niezależnie od tego możesz zgłosić się bezpośrednio do nas — dane kontaktowe znajdziesz ' +
        'w sekcji „O aplikacji i kontakt”.'
    }));
    panel.appendChild(h('div', { id: 'accountLive', class: 'mz-visually-hidden', 'aria-live': 'polite' }));

    accountBuilt = true;
    renderAccount();
  }

  function listRow(cfg) {
    var body = h('span', { class: 'mz-list-item-body' }, [
      h('span', { class: 'mz-list-item-title', text: cfg.titlePL })
    ]);
    if (cfg.subPL) body.appendChild(h('span', { class: 'mz-list-item-sub', text: cfg.subPL }));
    return h('button', {
      id: cfg.id || null,
      type: 'button',
      class: 'mz-list-item' + (cfg.danger ? ' btn-danger' : ''),
      'aria-label': cfg.ariaPL || null,
      onclick: cfg.onclick
    }, [
      body,
      h('span', { class: 'mz-list-chevron', 'aria-hidden': 'true', text: '›' })
    ]);
  }

  function renderAccount() {
    if (!accountBuilt) return;
    var state = getState();
    var status = state.status || 'none';
    var product = state.productId ? getProduct(state.productId) : null;
    // Re-rendering replaces the action rows, so remember where the keyboard was
    // and put it back — otherwise pressing "Anuluj subskrypcję" drops focus to
    // the top of the document.
    var focusedId = (document.activeElement && document.activeElement.id) || null;

    var card = byId('accountStatusCard');
    if (card) {
      clear(card);
      if (status === 'none' || status === 'expired') {
        // No subscription: the card itself becomes the (single) upsell.
        card.appendChild(h('span', { id: 'accountStatusBadge', class: 'mz-status-pill mz-status-pill-none', text: STATUS_LABEL.none }));
        card.appendChild(h('p', { id: 'accountPlanName', class: 'mz-upsell-title', text: 'Korzystasz z wersji darmowej' }));
        card.appendChild(h('p', {
          id: 'accountPriceLine', class: 'mz-upsell-sub',
          text: 'Pomiar, gałki, wykresy 60 s, tabela, progi i Dokumentacja pozostają bezpłatne na zawsze.'
        }));
        // Someone who bought only "Usuń reklamy" is not a subscriber, but the
        // card must not contradict the feature list two sections below, which
        // correctly says ads are gone. billing.js has the exact sentence.
        card.appendChild(h('p', { id: 'accountDateLine', class: 'mz-muted', text: accountDateLine(state, product) }));
        card.appendChild(h('button', {
          type: 'button', class: 'btn btn-primary btn-large', text: 'Zobacz Premium',
          onclick: function () { openPaywall('more_screen', { returnFocusTo: this }); }
        }));
      } else {
        var pillClass = STATUS_PILL_CLASS[status] || 'mz-status-pill-none';
        var label = STATUS_LABEL[status] || STATUS_LABEL.none;
        var b = billing();
        if (b && typeof b.statusLabelPL === 'function') {
          try { label = b.statusLabelPL() || label; } catch (_) { /* keep local label */ }
        }
        card.appendChild(h('span', { id: 'accountStatusBadge', class: 'mz-status-pill ' + pillClass, text: label }));
        card.appendChild(h('p', {
          id: 'accountPlanName', class: 'mz-strong',
          text: product ? product.namePL : 'Premium (DEMO)'
        }));
        // The RENEWAL price, never the discounted first-period price: this is
        // the line a subscriber reads to learn what they will be charged next.
        // A canceled subscription renews nothing, so it must not carry the
        // catalogue's "odnawia się automatycznie" next to a price — that would
        // contradict the status pill right above it.
        var priceLineText = '';
        if (product) {
          priceLineText = (state.status === 'canceled' && product.plan !== 'lifetime')
            ? 'Subskrypcja nie odnowi się — nie pobierzemy kolejnej opłaty.'
            : (renewalPriceOf(product) + ' — ' + (product.periodText || ''));
        }
        card.appendChild(h('p', { id: 'accountPriceLine', text: priceLineText }));
        // What was actually paid is stated separately when a code made it differ.
        // During a trial nothing has been charged yet (priceMinor is 0), so
        // claiming "Zapłacono 0,00 zł" would invent a payment that never happened.
        if (product && state.status !== 'trial' && Number.isFinite(state.priceMinor) &&
          state.priceMinor > 0 && state.priceMinor !== product.priceMinor) {
          card.appendChild(h('p', {
            id: 'accountPaidLine', class: 'mz-muted',
            text: 'Zapłacono ' + fmtMinor(state.priceMinor) + ' za pierwszy okres' +
              (state.promoCode ? (' (kod ' + String(state.promoCode).toUpperCase() + ').') : '.')
          }));
        }
        card.appendChild(h('p', { id: 'accountDateLine', text: accountDateLine(state, product) }));
      }
    }

    var accountRow = byId('accountAccountRow');
    if (accountRow) {
      clear(accountRow);
      var acc = state.account;
      if (acc && acc.signedIn) {
        accountRow.appendChild(h('p', {
          id: 'accountEmail', class: 'mz-list-item-title',
          text: acc.email + ' — konto demonstracyjne, nie jest to konto Google'
        }));
        accountRow.appendChild(listRow({
          id: 'accountSignOutBtn', titlePL: 'Wyloguj z konta demonstracyjnego',
          onclick: function () {
            var b = billing();
            if (!b || typeof b.signOut !== 'function') return;
            b.signOut().then(function (result) {
              toast((result && result.messagePL) || 'Wylogowano z konta demonstracyjnego.', { type: 'info' });
              api.refresh();
            });
          }
        }));
      } else {
        accountRow.appendChild(listRow({
          id: 'accountSignInBtn',
          titlePL: 'Niezalogowany',
          subPL: 'Naciśnij, aby zalogować się do konta demonstracyjnego.',
          ariaPL: 'Niezalogowany — naciśnij, aby zalogować się do konta demonstracyjnego',
          onclick: function () { openSignIn(this); }
        }));
      }
    }

    var featureList = byId('accountFeatureList');
    if (featureList) {
      clear(featureList);
      ACCOUNT_FEATURES.forEach(function (feature) {
        var on = hasFeature(feature.id);
        featureList.appendChild(h('div', { class: 'mz-feature-item' }, [
          h('span', { class: 'mz-benefit-icon', html: on ? CHECK_SVG : LOCK_SVG }),
          h('span', { text: feature.labelPL + (on ? ' — dostępne' : ' — niedostępne') })
        ]));
      });
    }

    var actions = byId('accountActions');
    if (actions) {
      clear(actions);
      actions.appendChild(listRow({
        id: 'accountChangePlanBtn', titlePL: 'Zmień plan',
        subPL: 'Zobacz wszystkie plany Premium (DEMO).',
        onclick: function () { openPaywall('more_screen', { returnFocusTo: this }); }
      }));
      // The cheap one-off is otherwise unreachable: it is hidden from the
      // normal plan list, so without this row somebody who only wants the ads
      // gone would be pushed to a subscription instead.
      if (!isPremiumTier() && !state.removeAdsOwned) {
        var removeAds = getProduct(PRODUCT_IDS.REMOVE_ADS);
        if (removeAds) {
          actions.appendChild(listRow({
            id: 'accountRemoveAdsBtn', titlePL: 'Usuń reklamy — ' + fmtPriceOf(removeAds) + ' jednorazowo',
            subPL: 'Tylko usunięcie reklam, bez pozostałych funkcji Premium (DEMO).',
            onclick: function () { openPaywall('remove_ads', { returnFocusTo: this }); }
          }));
        }
      }
      actions.appendChild(listRow({
        id: 'accountManageBtn', titlePL: 'Zarządzaj subskrypcją',
        subPL: 'Symulacja przejścia do Google Play → Subskrypcje.',
        onclick: function () {
          var b = billing();
          if (!b || typeof b.openManageSubscription !== 'function') return;
          b.openManageSubscription().then(function (result) {
            var message = (result && result.messagePL) ||
              'To wersja demonstracyjna — nie otwieramy Google Play. Prawdziwą subskrypcję anulujesz w Google Play → Subskrypcje.';
            toast(message, { type: 'info' });
            announce('accountLive', message);
          });
        }
      }));
      actions.appendChild(listRow({
        id: 'accountRestoreBtn', titlePL: 'Przywróć zakupy',
        subPL: 'Jeśli kupiłeś lub kupiłaś Premium wcześniej, naciśnij, aby odzyskać dostęp zapisany ' +
          'na tym urządzeniu. W prawdziwej aplikacji użyłbyś tego samego konta Google.',
        onclick: function () { api.restoreFromMenu(); }
      }));
      if (state.status === 'canceled') {
        actions.appendChild(listRow({
          id: 'accountResumeBtn', titlePL: 'Wznów subskrypcję',
          onclick: function () {
            var b = billing();
            if (!b || typeof b.resumeSubscription !== 'function') return;
            b.resumeSubscription().then(function (result) {
              var message = (result && result.messagePL) || 'Subskrypcja została wznowiona.';
              toast(message, { type: 'success' });
              announce('accountLive', message);
              api.refresh();
            });
          }
        }));
      }
      // Cancelling is never hidden and never guarded by a retention screen.
      if (state.status === 'active' || state.status === 'trial' || state.status === 'grace' ||
        state.status === 'on_hold' || state.status === 'paused') {
        actions.appendChild(listRow({
          id: 'accountCancelBtn', titlePL: 'Anuluj subskrypcję', danger: true,
          subPL: 'Anulowanie odbywa się w Google Play. Po anulowaniu zachowujesz dostęp do funkcji ' +
            'Premium do końca opłaconego okresu' + (state.expiresAt ? (' — do ' + fmtDate(state.expiresAt)) : '') +
            '. Nie pobierzemy kolejnej opłaty. W tej wersji demonstracyjnej anulowanie jest tylko symulowane.',
          onclick: function () {
            var b = billing();
            if (!b || typeof b.cancelSubscription !== 'function') return;
            b.cancelSubscription().then(function (result) {
              var message = (result && result.messagePL) || 'Subskrypcja została anulowana.';
              toast(message, { type: result && result.ok ? 'info' : 'warning' });
              announce('accountLive', message);
              api.refresh();
            });
          }
        }));
      }
    }

    var note = byId('accountNoteLine');
    if (note) {
      note.textContent = (state.plan === 'lifetime')
        ? 'Plan dożywotni nie jest subskrypcją — nic się nie odnawia i nie ma czego anulować.'
        : 'Anulowanie zachowuje dostęp do końca opłaconego okresu.';
    }

    if (focusedId) {
      var restored = byId(focusedId);
      if (restored && restored !== document.activeElement) focusLater(restored);
    }
  }

  // Catalogue price of the product — the amount charged on every renewal.
  function renewalPriceOf(product) {
    if (!product) return '';
    var b = billing();
    if (b && typeof b.formatRenewalPrice === 'function') {
      try {
        var text = b.formatRenewalPrice(product.id);
        if (text) return text;
      } catch (_) { /* fall through */ }
    }
    return fmtCatalogPriceOf(product);
  }

  function accountDateLine(state, product) {
    var b = billing();
    if (b && typeof b.statusDetailPL === 'function') {
      try {
        var detail = b.statusDetailPL();
        if (detail) return detail;
      } catch (_) { /* fall through to local wording */ }
    }
    if (state.status === 'trial' && state.trialEndsAt) {
      // No invented amount: without a catalogue entry we simply do not quote one.
      return 'Okres próbny kończy się ' + fmtDate(state.trialEndsAt) +
        (product ? (', potem ' + fmtPriceOf(product)) : '') + '.';
    }
    if (state.status === 'canceled' && state.expiresAt) return 'Dostęp do ' + fmtDate(state.expiresAt) + '.';
    if (state.status === 'paused' && state.renewsAt) return 'Wznowi się ' + fmtDate(state.renewsAt) + '.';
    if ((state.status === 'on_hold' || state.status === 'grace')) return 'Zaktualizuj sposób płatności.';
    if (state.plan === 'lifetime' && state.purchasedAt) return 'Kupiono ' + fmtDate(state.purchasedAt) + '.';
    if (state.renewsAt) return 'Odnowi się ' + fmtDate(state.renewsAt) + '.';
    if (state.purchasedAt) return 'Kupiono ' + fmtDate(state.purchasedAt) + '.';
    return '';
  }

  /* ---------------------------------------------------------------------
     Demo sign-in dialog (no Google Sign-In anywhere)
     --------------------------------------------------------------------- */

  var signInDialog = null;

  function openSignIn(returnFocusTo) {
    if (!signInDialog) {
      signInDialog = createDialog({ id: 'mzSignInDialog', titleId: 'mzSignInTitle' });
    }
    var dialog = signInDialog;
    clear(dialog.body);
    dialog.body.appendChild(demoBanner(null,
      'DEMO — SYMULACJA. To nie jest logowanie do konta Google. Adres zostaje tylko w pamięci ' +
      'tej przeglądarki i nigdzie nie jest wysyłany.', false));
    dialog.body.appendChild(h('h2', {
      id: 'mzSignInTitle', class: 'mz-dialog-title', tabindex: '-1', text: 'Logowanie do konta demonstracyjnego'
    }));
    dialog.body.appendChild(h('label', { for: 'mzSignInEmail', text: 'Adres e-mail (dowolny, fikcyjny)' }));
    var input = h('input', {
      id: 'mzSignInEmail', class: 'mz-promo-input', type: 'email',
      placeholder: 'np. demo@przyklad.pl', autocomplete: 'off'
    });
    dialog.body.appendChild(input);
    var status = h('p', { class: 'mz-promo-status', 'aria-live': 'polite' });
    dialog.body.appendChild(status);
    dialog.body.appendChild(h('div', { class: 'mz-dialog-actions' }, [
      h('button', {
        id: 'mzSignInSubmit', type: 'button', class: 'btn btn-primary btn-large', text: 'Zaloguj (DEMO)',
        onclick: function () {
          var b = billing();
          if (!b || typeof b.signIn !== 'function') {
            status.textContent = 'Logowanie demonstracyjne jest niedostępne.';
            return;
          }
          status.textContent = 'Logowanie…';
          b.signIn((input.value || '').trim()).then(function (result) {
            status.textContent = (result && result.messagePL) || '';
            if (result && result.ok) {
              closeDialog(dialog);
              toast(result.messagePL || 'Zalogowano do konta demonstracyjnego.', { type: 'success' });
              api.refresh();
            }
          });
        }
      }),
      h('button', {
        id: 'mzSignInCancel', type: 'button', class: 'btn btn-large', text: 'Anuluj',
        onclick: function () { closeDialog(dialog); }
      })
    ]));
    // No focusEl here: focus must land on the dialog title so the DEMO banner
    // above it is reached before the e-mail field.
    openDialog(dialog, {
      returnFocusTo: returnFocusTo,
      onEscape: function () { closeDialog(dialog); }
    });
  }

  /* ---------------------------------------------------------------------
     Consent dialog (mock CMP)
     --------------------------------------------------------------------- */

  var consentDialog = null;
  var consentPending = null;

  function openConsent(force) {
    var current = adsConsent();
    if (!force && current !== 'unknown') return Promise.resolve(current);
    if (consentPending) return consentPending.promise;

    if (!consentDialog) {
      consentDialog = createDialog({ id: 'mzConsentDialog', titleId: 'mzConsentTitle' });
    }
    var dialog = consentDialog;
    clear(dialog.body);
    dialog.body.appendChild(demoBanner(null,
      'DEMO — SYMULACJA. Ten ekran niczego nie zapisuje poza pamięcią tej przeglądarki ' +
      'i nie wysyła żadnych danych.', false));
    dialog.body.appendChild(h('h2', {
      id: 'mzConsentTitle', class: 'mz-dialog-title', tabindex: '-1', text: 'Zgoda na reklamy i pliki cookie'
    }));
    dialog.body.appendChild(h('p', {
      id: 'mzConsentText',
      text: 'Aby utrzymać aplikację bezpłatną, wyświetlamy reklamy. Za Twoją zgodą nasi partnerzy ' +
        'reklamowi mogą używać identyfikatora reklamowego i podobnych technologii, aby dopasować ' +
        'reklamy do Ciebie i mierzyć ich skuteczność. Możesz odmówić — aplikacja będzie działać ' +
        'tak samo, a reklamy będą niespersonalizowane. Zgodę możesz zmienić w każdej chwili w: ' +
        'Więcej → Prywatność i reklamy.'
    }));
    dialog.body.appendChild(h('p', {
      class: 'mz-strong',
      text: 'Obraz z kamery jest analizowany wyłącznie na Twoim urządzeniu i nigdy nie jest wysyłany na żaden serwer.'
    }));

    var settle = function (value) {
      var pending = consentPending;
      consentPending = null;
      var b = billing();
      var finish = function () {
        saveAds({ consent: value });
        closeDialog(dialog);
        toast(value === 'granted' ? 'Zapisano wybór: reklamy dopasowane.' : 'Zapisano wybór: reklamy niedopasowane.',
          { type: 'success' });
        api.refreshAds();
        if (pending) pending.resolve(value);
      };
      if (b && typeof b.setAdsConsent === 'function') b.setAdsConsent(value).then(finish, finish);
      else finish();
    };

    // Both buttons are the same size and the same contrast — no nudging.
    dialog.body.appendChild(h('div', { class: 'mz-dialog-actions mz-row' }, [
      h('button', {
        id: 'mzConsentAcceptBtn', type: 'button', class: 'btn btn-large mz-grow', text: 'Zgadzam się',
        onclick: function () { settle('granted'); }
      }),
      h('button', {
        id: 'mzConsentDenyBtn', type: 'button', class: 'btn btn-large mz-grow', text: 'Nie zgadzam się',
        onclick: function () { settle('denied'); }
      })
    ]));

    var promise = new Promise(function (resolve) {
      consentPending = { resolve: resolve, promise: null };
    });
    // Assigned after construction: the executor runs before `promise` exists,
    // and repeated openConsent() calls must return this same promise.
    if (consentPending) consentPending.promise = promise;

    openDialog(dialog, {
      onEscape: function () { settle('denied'); }   // Escape = the privacy-preserving choice
    });
    return promise;
  }

  /* ---------------------------------------------------------------------
     Fake ads: reserved banner slots
     --------------------------------------------------------------------- */

  var adSlotState = {};      // slotId -> { lastRenderAt, creativeIndex, visible }
  var adObserver = null;

  function slotIds() { return ['adSlotMonitoring', 'adSlotMore']; }

  function ensureAdObserver() {
    if (adObserver || typeof window.IntersectionObserver !== 'function') return adObserver;
    adObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.id;
        var slot = adSlotState[id] || (adSlotState[id] = { lastRenderAt: 0, creativeIndex: 0, visible: false });
        slot.visible = entry.isIntersecting;
        if (!entry.isIntersecting) return;
        // First ad impression is what triggers the consent prompt — never app start.
        if (adsConsent() === 'unknown') {
          openConsent(false);
          return;
        }
        renderAdCreative(entry.target, false);
      });
    }, { threshold: 0.2 });
    return adObserver;
  }

  function renderAdCreative(slot, force) {
    var id = slot.id;
    var slotState = adSlotState[id] || (adSlotState[id] = { lastRenderAt: 0, creativeIndex: 0, visible: true });
    var now = Date.now();
    if (!force && slotState.lastRenderAt && (now - slotState.lastRenderAt) < AD_REFRESH_MS) return;
    slotState.lastRenderAt = now;
    var personalized = adsConsent() === 'granted';
    var body = slot.querySelector('.ad-slot-body');
    if (!body) return;
    clear(body);
    var caption = FAKE_ADS[slotState.creativeIndex % FAKE_ADS.length];
    slotState.creativeIndex += 1;
    // Neutral grey rectangle: never a status color, never shaped like a control.
    body.appendChild(h('div', { class: 'ad-slot-fake' }, [
      h('span', { class: 'mz-strong', text: 'REKLAMA DEMO' }),
      h('span', { text: caption }),
      h('span', { text: 'To atrapa. Nie łączymy się z żadną siecią reklamową.' })
    ]));
    var label = slot.querySelector('.ad-slot-label');
    if (label) label.textContent = personalized ? 'Reklama (DEMO)' : 'Reklama (DEMO, niedopasowana)';
  }

  function buildAdSlot(slot) {
    if (slot.querySelector('.ad-slot-body')) return;
    clear(slot);
    slot.className = 'ad-slot ad-slot-reserved';
    slot.setAttribute('role', 'complementary');
    slot.setAttribute('aria-label', 'Reklama demonstracyjna');
    slot.appendChild(h('span', { class: 'ad-slot-label', text: 'Reklama (DEMO)' }));
    slot.appendChild(h('div', { class: 'ad-slot-body' }));
    if (slot.id === 'adSlotMore') {
      slot.appendChild(h('button', {
        type: 'button', class: 'ad-slot-remove',
        text: 'Usuń reklamy',
        'aria-label': 'Usuń reklamy — zobacz opcje zakupu, wersja demonstracyjna',
        onclick: function () { openPaywall('remove_ads', { returnFocusTo: this }); }
      }));
    }
  }

  function showBannerAd(slotId) {
    var slot = byId(slotId);
    if (!slot) return;
    if (hasFeature(FEATURES.NO_ADS) || getState().adsEnabled === false) {
      hideBannerAd(slotId);
      return;
    }
    buildAdSlot(slot);
    setHidden(slot, false);
    var observer = ensureAdObserver();
    if (observer) {
      try { observer.observe(slot); } catch (_) { /* observing twice is harmless */ }
    }
    if (adsConsent() === 'unknown') {
      // Reserved height stays, but the slot shows nothing until consent exists.
      var body = slot.querySelector('.ad-slot-body');
      if (body) clear(body);
      if (!observer && isElementVisible(slot)) openConsent(false);
      return;
    }
    // observe() on an already-observed element is a documented no-op, so a slot
    // that was on screen while consent was granted would stay blank until it
    // scrolled out and back. Draw it here instead.
    if (observer) {
      if (adSlotState[slotId] && adSlotState[slotId].visible) renderAdCreative(slot, true);
    } else {
      renderAdCreative(slot, false);
    }
  }

  function hideBannerAd(slotId) {
    var slot = byId(slotId);
    if (!slot) return;
    setHidden(slot, true);
    var body = slot.querySelector('.ad-slot-body');
    if (body) clear(body);
    if (adObserver) {
      try { adObserver.unobserve(slot); } catch (_) { /* ignore */ }
    }
  }

  function isElementVisible(node) {
    if (!node) return false;
    if (node.hasAttribute('hidden')) return false;
    return node.offsetWidth > 0 || node.offsetHeight > 0;
  }

  function refreshAds() {
    var noAds = hasFeature(FEATURES.NO_ADS) || getState().adsEnabled === false;
    slotIds().forEach(function (id) {
      if (noAds) hideBannerAd(id);
      else showBannerAd(id);
    });
  }

  /* ---------------------------------------------------------------------
     Rewarded ad (opt-in only)
     --------------------------------------------------------------------- */

  var rewardedDialog = null;

  var REWARD_TITLES = {
    csvExport: 'Odblokuj eksport CSV na 24 godziny',
    historyLong: 'Odblokuj historię 24 godzin na jeden dzień'
  };

  // One label, matching the reward that is really granted (24 h, not "one
  // export") — the button, the dialog and the toast must all say the same.
  function rewardedButtonLabel(featureId) {
    return featureId === FEATURES.CSV_EXPORT
      ? 'Obejrzyj reklamę (DEMO) — eksport CSV na 24 h'
      : 'Obejrzyj reklamę (DEMO) — historia na 24 h';
  }

  function rewardTitleFor(featureId) {
    return REWARD_TITLES[featureId] || 'Odblokuj funkcję na 24 godziny';
  }

  function rewardedAllowed() {
    if (rewardedUsedToday() >= REWARDED_DAILY_LIMIT) return 'limit';
    var last = adsStore().lastRewardedAt || 0;
    if (Date.now() - last < REWARDED_MIN_GAP_MS) return 'wait';
    return 'ok';
  }

  function showRewardedAd(featureId, opts) {
    opts = opts || {};
    var durationMs = opts.durationMs || REWARDED_DEFAULT_MS;
    var rewardMs = opts.rewardMs || REWARDED_REWARD_MS;

    return openConsent(false).then(function () {
      return new Promise(function (resolve) {
        if (!rewardedDialog) {
          rewardedDialog = createDialog({ id: 'mzRewardedDialog', titleId: 'mzRewardedTitle' });
        }
        var dialog = rewardedDialog;
        var timer = null;
        var settled = false;
        var granted = false;

        function finish(value) {
          if (settled) return;
          settled = true;
          if (timer) { window.clearInterval(timer); timer = null; }
          closeDialog(dialog);
          resolve(value);
        }

        clear(dialog.body);
        dialog.body.appendChild(demoBanner(null,
          'DEMO — SYMULACJA reklamy. To atrapa: nie odtwarzamy żadnej reklamy, nie łączymy się ' +
          'z siecią reklamową i nie zbieramy żadnych danych.', false));
        dialog.body.appendChild(h('h2', {
          id: 'mzRewardedTitle', class: 'mz-dialog-title', tabindex: '-1', text: rewardTitleFor(featureId)
        }));
        var body = h('div', { id: 'mzRewardedBody', class: 'mz-stack' });
        dialog.body.appendChild(body);
        var actions = h('div', { class: 'mz-dialog-actions' });
        dialog.body.appendChild(actions);
        dialog.body.appendChild(h('p', {
          class: 'mz-muted', text: 'Nie chcesz reklam? Premium usuwa je na stałe.'
        }));
        dialog.body.appendChild(h('button', {
          type: 'button', class: 'btn-quiet', text: 'Zobacz Premium',
          onclick: function () {
            finish(false);
            openPaywall(featureId === FEATURES.CSV_EXPORT ? 'csv_export' : 'history_long', {});
          }
        }));

        var gate = rewardedAllowed();
        if (gate !== 'ok') {
          body.appendChild(h('p', {
            text: gate === 'limit'
              ? 'Dzisiejszy limit reklam nagradzanych został wyczerpany. Spróbuj jutro albo przejdź na Premium.'
              : 'Kolejną reklamę nagradzaną można obejrzeć najwcześniej po minucie przerwy. Spróbuj za chwilę.'
          }));
          actions.appendChild(h('button', {
            id: 'mzRewardedCloseBtn', type: 'button', class: 'btn btn-large', text: 'Nie teraz',
            onclick: function () { finish(false); }
          }));
          openDialog(dialog, {
            returnFocusTo: opts.returnFocusTo,
            onEscape: function () { finish(false); }
          });
          return;
        }

        body.appendChild(h('p', {
          text: 'Obejrzyj reklamę (około 30 sekund), aby odblokować ' +
            (featureId === FEATURES.CSV_EXPORT ? 'eksport odczytów' : 'dostęp do dłuższej historii') +
            ' na 24 godziny. Reklamę można zamknąć po 5 sekundach.'
        }));

        var startBtn = h('button', {
          id: 'mzRewardedStartBtn', type: 'button', class: 'btn btn-primary btn-large',
          text: 'Obejrzyj reklamę (DEMO)', onclick: play
        });
        var closeBtn = h('button', {
          id: 'mzRewardedCloseBtn', type: 'button', class: 'btn btn-large', text: 'Nie teraz',
          onclick: function () {
            if (closeBtn.getAttribute('aria-disabled') === 'true') return;
            if (timer) toast('Reklama przerwana — nagroda nie została przyznana. Możesz spróbować ponownie.', { type: 'warning' });
            finish(false);
          }
        });
        actions.appendChild(startBtn);
        actions.appendChild(closeBtn);

        function play() {
          // Only the gap timestamp is spent here. The daily allowance is charged
          // in grantReward(), so abandoning the ad early costs nothing.
          saveAds({ lastRewardedAt: Date.now() });
          clear(body);
          startBtn.setAttribute('hidden', '');
          closeBtn.textContent = 'Zamknij';
          closeBtn.setAttribute('aria-disabled', 'true');
          var frame = h('div', { class: 'mz-rewarded-frame' }, [
            h('span', { class: 'mz-strong', text: 'REKLAMA DEMO' }),
            h('span', { text: 'To atrapa. Nie łączymy się z żadną siecią reklamową.' })
          ]);
          body.appendChild(frame);
          // aria-live="off": a per-second counter must not spam the screen reader.
          var timerEl = h('p', { id: 'mzRewardedTimer', class: 'mz-rewarded-timer', 'aria-live': 'off' });
          body.appendChild(timerEl);

          var startedAt = Date.now();
          var tick = function () {
            var elapsed = Date.now() - startedAt;
            var leftMs = Math.max(0, durationMs - elapsed);
            var leftSec = Math.ceil(leftMs / 1000);
            timerEl.textContent = 'Pozostało: ' + leftSec + ' s';
            var unlockLeft = Math.ceil(Math.max(0, REWARDED_UNLOCK_AFTER_MS - elapsed) / 1000);
            if (unlockLeft > 0) {
              closeBtn.setAttribute('aria-disabled', 'true');
              // The visible label has to say the same thing as the aria-label:
              // a button that looks live but silently ignores taps is a dead
              // control for exactly the users this app is built for.
              closeBtn.textContent = 'Zamknij za ' + unlockLeft + ' ' +
                pluralPL(unlockLeft, 'sekundę', 'sekundy', 'sekund');
              closeBtn.setAttribute('aria-label', 'Zamknij — dostępne za ' + unlockLeft + ' ' +
                pluralPL(unlockLeft, 'sekundę', 'sekundy', 'sekund'));
            } else {
              closeBtn.setAttribute('aria-disabled', 'false');
              closeBtn.textContent = 'Zamknij';
              closeBtn.setAttribute('aria-label', 'Zamknij reklamę');
            }
            if (leftMs <= 0) {
              window.clearInterval(timer);
              timer = null;
              grantReward();
            }
          };
          tick();
          timer = window.setInterval(tick, 1000);
        }

        function grantReward() {
          var b = billing();
          // The daily allowance is spent only now, when a reward is really given.
          saveAds({
            rewardedDay: todayKey(),
            rewardedCountToday: rewardedUsedToday() + 1,
            lastRewardedAt: Date.now()
          });
          var done = function () {
            granted = true;
            clear(body);
            body.appendChild(h('p', {
              class: 'mz-strong', role: 'status',
              text: 'Odblokowano ' + (featureId === FEATURES.CSV_EXPORT ? 'eksport CSV' : 'dłuższą historię') + ' na 24 godziny.'
            }));
            clear(actions);
            actions.appendChild(h('button', {
              id: 'mzRewardedRewardBtn', type: 'button', class: 'btn btn-primary btn-large',
              text: featureId === FEATURES.CSV_EXPORT ? 'Odbierz i eksportuj teraz' : 'Odbierz i pokaż historię',
              onclick: function () {
                toast('Odblokowano ' + (featureId === FEATURES.CSV_EXPORT ? 'eksport CSV' : 'historię') + ' na 24 godziny.',
                  { type: 'success' });
                finish(true);
              }
            }));
            api.refresh();
            focusLater(byId('mzRewardedRewardBtn'));
          };
          if (b && typeof b.grantTemporaryEntitlement === 'function') {
            b.grantTemporaryEntitlement(featureId, rewardMs, 'reklama nagradzana (DEMO)').then(done, done);
          } else {
            done();
          }
        }

        openDialog(dialog, {
          returnFocusTo: opts.returnFocusTo,
          onEscape: function () {
            if (granted) { finish(true); return; }
            if (timer) toast('Reklama przerwana — nagroda nie została przyznana. Możesz spróbować ponownie.', { type: 'warning' });
            finish(false);
          }
        });
      });
    });
  }

  /* ---------------------------------------------------------------------
     Interstitial — off by default, policy-compliant when switched on
     --------------------------------------------------------------------- */

  var interstitialDialog = null;
  var lastSessionDurationMs = 0;

  function setInterstitialEnabled(enabled) {
    saveAds({ interstitialEnabled: !!enabled });
  }

  function maybeShowInterstitial(trigger) {
    return new Promise(function (resolve) {
      var store = adsStore();
      // 'session_end' is deliberately NOT accepted. An ad fired by pressing
      // "Stop" is exactly the pattern Better Ads / Play policy forbids, so the
      // only accepted trigger is a neutral return to the app.
      if (trigger !== 'neutral_return') return resolve();
      if (!store.interstitialEnabled) return resolve();
      if (hasFeature(FEATURES.NO_ADS) || getState().adsEnabled === false) return resolve();
      if (adsConsent() === 'unknown') return resolve();
      if (Date.now() - (store.lastInterstitialAt || 0) < DAY_MS) return resolve();
      if (lastSessionDurationMs < INTERSTITIAL_MIN_SESSION_MS) return resolve();

      if (!interstitialDialog) {
        interstitialDialog = createDialog({ id: 'mzInterstitialDialog', titleId: 'mzInterstitialTitle' });
      }
      var dialog = interstitialDialog;
      clear(dialog.body);
      dialog.body.appendChild(demoBanner(null,
        'DEMO — SYMULACJA reklamy. To atrapa: nie odtwarzamy żadnej reklamy i nie zbieramy danych.', false));
      dialog.body.appendChild(h('h2', {
        id: 'mzInterstitialTitle', class: 'mz-dialog-title', tabindex: '-1', text: 'Reklama pełnoekranowa (DEMO)'
      }));
      dialog.body.appendChild(h('div', { class: 'mz-rewarded-frame' }, [
        h('span', { class: 'mz-strong', text: 'REKLAMA DEMO' }),
        h('span', { text: 'To atrapa. Nie łączymy się z żadną siecią reklamową.' })
      ]));
      // Close is active from the very first second — no 5 s / 15 s delay.
      dialog.body.appendChild(h('div', { class: 'mz-dialog-actions' }, [
        h('button', {
          id: 'mzInterstitialCloseBtn', type: 'button', class: 'btn btn-large', text: 'Zamknij',
          onclick: function () { closeDialog(dialog); resolve(); }
        })
      ]));
      saveAds({ lastInterstitialAt: Date.now() });
      openDialog(dialog, {
        onEscape: function () { closeDialog(dialog); resolve(); }
      });
    });
  }

  /* ---------------------------------------------------------------------
     Feature gate
     --------------------------------------------------------------------- */

  var lockDialog = null;

  var LOCK_TITLES = {
    csvExport: 'Eksport CSV jest w Premium',
    historyLong: 'Historia dłuższa niż 60 sekund jest w Premium',
    reports: 'Raport dzienny i tygodniowy jest w Premium',
    profiles: 'Profile progów są w Premium',
    alerts: 'Alerty progowe są w Premium',
    background: 'Podsumowanie sesji jest w Premium',
    noAds: 'Brak reklam jest w Premium'
  };
  var LOCK_BODIES = {
    csvExport: 'Zapisz odczyty do pliku CSV i otwórz je w arkuszu kalkulacyjnym.',
    historyLong: 'Przeglądaj historię z zakresów 1 h, 24 h, 7 dni i 30 dni zamiast ostatnich 60 sekund.',
    reports: 'Podsumowanie czasu spędzonego w każdej strefie — dzień do dnia i tydzień do tygodnia.',
    profiles: 'Zapisz różne zestawy progów (dzień, wieczór, praca) i przełączaj je jednym dotknięciem.',
    alerts: 'Powiadomienie po dłuższej nieprzerwanej ekspozycji w strefie szkodliwej.',
    background: 'Automatyczne podsumowanie każdej sesji pomiaru: czas, liczba odczytów i udział stref.',
    noAds: 'Premium usuwa wszystkie reklamy na stałe.'
  };
  var REASON_FOR_FEATURE = {
    csvExport: 'csv_export', historyLong: 'history_long', reports: 'reports',
    profiles: 'profiles', alerts: 'alerts', background: 'background', noAds: 'remove_ads'
  };

  // billing.js keeps one description per feature (label, what it does, what the
  // free version gives instead) precisely so this dialog does not invent its
  // own wording. The literals above stay as a fallback for a missing engine.
  function lockBodyFor(featureId) {
    var b = billing();
    if (b && typeof b.describeFeature === 'function') {
      try {
        var info = b.describeFeature(featureId);
        if (info && info.descPL) {
          return info.descPL + (info.freeFallbackPL ? (' ' + info.freeFallbackPL) : '');
        }
      } catch (_) { /* fall through to the literal */ }
    }
    return LOCK_BODIES[featureId] || '';
  }

  function rewardedByDefault(featureId) {
    return featureId === FEATURES.CSV_EXPORT || featureId === FEATURES.HISTORY_LONG;
  }

  function requirePremium(featureId, opts) {
    opts = opts || {};
    if (hasFeature(featureId)) return Promise.resolve(true);
    var allowRewarded = (opts.allowRewarded === undefined) ? rewardedByDefault(featureId) : !!opts.allowRewarded;
    var reason = opts.reason || REASON_FOR_FEATURE[featureId] || 'nav';

    return new Promise(function (resolve) {
      if (!lockDialog) {
        lockDialog = createDialog({ id: 'mzLockDialog', titleId: 'mzLockTitle' });
      }
      var dialog = lockDialog;
      var settled = false;
      function finish(value) {
        if (settled) return;
        settled = true;
        resolve(value);
      }

      clear(dialog.body);
      dialog.body.appendChild(demoBanner(null,
        'DEMO — SYMULACJA. Wszystkie ceny i zakupy w tej aplikacji są fikcyjne.', false));
      dialog.body.appendChild(h('h2', {
        id: 'mzLockTitle', class: 'mz-dialog-title', tabindex: '-1',
        text: LOCK_TITLES[featureId] || 'Ta funkcja jest w Premium'
      }));
      dialog.body.appendChild(h('p', { text: lockBodyFor(featureId) }));
      dialog.body.appendChild(h('p', {
        class: 'mz-muted',
        text: 'Pomiar, obie gałki, wykresy 60 s, tabela, progi i cała Dokumentacja pozostają bezpłatne.'
      }));

      var actions = h('div', { class: 'mz-dialog-actions' });
      actions.appendChild(h('button', {
        id: 'mzLockPremiumBtn', type: 'button', class: 'btn btn-primary btn-large', text: 'Zobacz Premium',
        onclick: function () {
          closeDialog(dialog);
          openPaywall(reason, { returnFocusTo: opts.returnFocusTo }).then(function (result) {
            finish(!!(result && result.purchased) && hasFeature(featureId));
          });
        }
      }));
      if (allowRewarded) {
        actions.appendChild(h('button', {
          id: 'mzLockRewardedBtn', type: 'button', class: 'btn btn-large',
          text: rewardedButtonLabel(featureId),
          onclick: function () {
            closeDialog(dialog);
            showRewardedAd(featureId, { returnFocusTo: opts.returnFocusTo }).then(function (rewarded) {
              finish(rewarded && hasFeature(featureId));
            });
          }
        }));
      }
      actions.appendChild(h('button', {
        id: 'mzLockCancelBtn', type: 'button', class: 'btn btn-large', text: 'Nie teraz',
        onclick: function () { closeDialog(dialog); finish(false); }
      }));
      dialog.body.appendChild(actions);

      openDialog(dialog, {
        returnFocusTo: opts.returnFocusTo,
        onEscape: function () { closeDialog(dialog); finish(false); }
      });
    });
  }

  /* ---------------------------------------------------------------------
     Inline upsells, lock marks, premium pill
     --------------------------------------------------------------------- */

  var UPSELL_TEXTS = {
    historyLong: {
      title: 'Widzisz ostatnie 60 sekund.',
      sub: 'Premium pokazuje historię z 30 dni, raport dzienny i tygodniowy.'
    },
    profiles: {
      title: 'Profile progów — funkcja Premium.',
      sub: 'Zapisz różne zestawy progów (dzień, wieczór, praca) i przełączaj je jednym dotknięciem.'
    },
    reports: {
      title: 'Raport dzienny i tygodniowy — funkcja Premium.',
      sub: 'Podsumowanie czasu spędzonego w każdej strefie.'
    },
    csvExport: {
      title: 'Eksport CSV — funkcja Premium.',
      sub: 'Zapisz odczyty do pliku i otwórz je w arkuszu kalkulacyjnym.'
    },
    alerts: {
      title: 'Alerty progowe — funkcja Premium.',
      sub: 'Powiadomienie po dłuższej nieprzerwanej ekspozycji w strefie szkodliwej.'
    },
    background: {
      title: 'Podsumowanie sesji — funkcja Premium.',
      sub: 'Po każdym zatrzymaniu pomiaru: czas sesji, liczba odczytów i udział stref.'
    },
    noAds: {
      title: 'Reklamy są tylko w wersji darmowej.',
      sub: 'Premium usuwa je na stałe.'
    }
  };

  function renderUpsell(containerId, featureId, opts) {
    opts = opts || {};
    var container = byId(containerId);
    if (!container) return;
    clear(container);
    if (hasFeature(featureId)) return;   // the component removes itself once granted

    var texts = UPSELL_TEXTS[featureId] || { title: 'Funkcja Premium', sub: '' };
    var card = h('div', { class: 'mz-inline-upsell' }, [
      h('span', { class: 'mz-lock-icon', html: LOCK_SVG }),
      h('span', { class: 'mz-upsell-title', text: texts.title }),
      h('span', { class: 'mz-upsell-sub', text: texts.sub })
    ]);
    var actions = h('div', { class: 'mz-inline-upsell-actions' }, [
      h('button', {
        type: 'button', class: 'btn btn-large', text: 'Zobacz Premium',
        onclick: function () {
          openPaywall(REASON_FOR_FEATURE[featureId] || 'nav', { returnFocusTo: this });
        }
      })
    ]);
    if (!opts.compact && rewardedByDefault(featureId)) {
      actions.appendChild(h('button', {
        type: 'button', class: 'btn btn-large',
        text: rewardedButtonLabel(featureId),
        onclick: function () {
          var from = this;
          showRewardedAd(featureId, { returnFocusTo: from }).then(function () { api.refresh(); });
        }
      }));
    }
    card.appendChild(actions);
    container.appendChild(card);
  }

  function markLocked(node, featureId) {
    if (!node) return;
    if (node.className.indexOf('mz-locked') < 0) node.className += ' mz-locked';
    if (!node.querySelector('.mz-lock-icon')) {
      var icon = h('span', { class: 'mz-lock-icon', 'aria-hidden': 'true', html: LOCK_SVG });
      node.insertBefore(icon, node.firstChild);
    }
    var base = (node.getAttribute('data-base-label') || node.textContent || '').trim();
    node.setAttribute('data-base-label', base);
    node.setAttribute('aria-label', base + ' — funkcja Premium, naciśnij, aby zobaczyć plany');
    // Never disabled: pressing it must open the paywall, not do nothing.
    node.disabled = false;
  }

  function unmarkLocked(node) {
    if (!node) return;
    node.className = node.className.replace(/\s*mz-locked/g, '');
    var icon = node.querySelector('.mz-lock-icon');
    if (icon && icon.parentNode) icon.parentNode.removeChild(icon);
    var base = node.getAttribute('data-base-label');
    if (base) node.setAttribute('aria-label', base);
  }

  function updatePremiumPill() {
    var pill = byId('premiumPill');
    if (!pill) return;
    var label = byId('premiumPillLabel');
    if (!label) {
      label = h('span', { id: 'premiumPillLabel' });
      clear(pill);
      pill.appendChild(label);
    }
    var state = getState();
    if (state.tier === 'premium') {
      label.textContent = 'PRO ✓';
      pill.setAttribute('aria-label', 'Masz wersję Premium (demonstracyjną). Otwórz ekran Premium.');
    } else if (state.tier === 'trial') {
      var days = trialDaysLeft();
      label.textContent = days > 0 ? daysWordPL(days) : daysWordPL(7);
      pill.setAttribute('aria-label', 'Okres próbny — zostało ' + daysWordPL(days) + '. Otwórz ekran Premium.');
    } else {
      label.textContent = 'PRO';
      pill.setAttribute('aria-label', 'Przejdź na Premium — wersja demonstracyjna');
    }
  }

  /* ---------------------------------------------------------------------
     Premium surfaces embedded in the measurement screen
     --------------------------------------------------------------------- */

  var historyRangeMs = HOUR_MS;

  function appData() {
    return (window.AppData && typeof window.AppData.getHistoryLong === 'function') ? window.AppData : null;
  }

  function summarizeZones(points) {
    var counts = { good: 0, warning: 0, critical: 0 };
    var total = 0;
    points.forEach(function (p) {
      if (counts[p.zoneShare] !== undefined) { counts[p.zoneShare] += 1; total += 1; }
    });
    return { counts: counts, total: total };
  }

  // The long buffer is collected for everyone; only reading it is gated, so a
  // fresh purchase immediately shows real history instead of an empty table.
  function renderHistoryPanel() {
    var container = byId('historyUpsell');
    if (!container) return;
    if (!hasFeature(FEATURES.HISTORY_LONG)) {
      renderUpsell('historyUpsell', FEATURES.HISTORY_LONG, {});
      return;
    }
    var data = appData();
    // This panel is rebuilt from scratch on every range change and on every
    // billing event, so the focused control has to be found again by id —
    // otherwise a keyboard user is thrown back to <body> after each click.
    var focusedId = (document.activeElement && document.activeElement.id) || null;
    clear(container);
    var panel = h('section', { class: 'card' });
    panel.appendChild(sectionTitle('Historia i raport (Premium)'));
    // Session summary is the 'background' entitlement: it only appears once a
    // session has actually ended, and only for someone who owns the feature.
    if (lastSessionSummary && hasFeature(FEATURES.BACKGROUND)) {
      panel.appendChild(buildSessionSummaryCard());
    }

    var ranges = [
      { id: 'mzHistRange1h', labelPL: '1 h', ms: HOUR_MS },
      { id: 'mzHistRange24h', labelPL: '24 h', ms: DAY_MS },
      { id: 'mzHistRange7d', labelPL: '7 dni', ms: 7 * DAY_MS },
      { id: 'mzHistRange30d', labelPL: '30 dni', ms: 30 * DAY_MS }
    ];
    var group = h('div', { class: 'mz-row', role: 'group', 'aria-label': 'Zakres historii' });
    ranges.forEach(function (range) {
      group.appendChild(h('button', {
        id: range.id, type: 'button', class: 'btn', text: range.labelPL,
        'aria-pressed': String(historyRangeMs === range.ms),
        onclick: function () { historyRangeMs = range.ms; renderHistoryPanel(); }
      }));
    });
    panel.appendChild(group);

    var summaryBox = h('div', { class: 'mz-stack', 'aria-live': 'polite' });
    if (!data) {
      summaryBox.appendChild(h('p', { class: 'mz-muted', text: 'Dane historii są chwilowo niedostępne.' }));
    } else {
      var points = [];
      try { points = data.getHistoryLong({ sinceMs: Date.now() - historyRangeMs }) || []; } catch (_) { points = []; }
      var summary = summarizeZones(points);
      if (!summary.total) {
        summaryBox.appendChild(h('p', {
          class: 'mz-muted',
          text: 'Brak zapisanych odczytów w tym zakresie. Uruchom pomiar — historia zbiera się automatycznie.'
        }));
      } else {
        summaryBox.appendChild(h('p', {
          text: 'Zapisane odczyty: ' + summary.total + '. Podział czasu według stref:'
        }));
        ['good', 'warning', 'critical'].forEach(function (zone) {
          var percent = Math.round((summary.counts[zone] / summary.total) * 100);
          summaryBox.appendChild(h('p', {
            text: ZONE_LABEL_LONG[zone] + ': ' + percent + '% (' + readingsWordPL(summary.counts[zone]) + ')'
          }));
        });
      }
    }
    panel.appendChild(summaryBox);
    if (data && hasFeature(FEATURES.REPORTS)) {
      var reportPoints = [];
      try { reportPoints = data.getHistoryLong({ sinceMs: Date.now() - historyRangeMs }) || []; } catch (_) { reportPoints = []; }
      panel.appendChild(buildReport(reportPoints));
    }
    container.appendChild(panel);
    if (focusedId && byId(focusedId)) focusLater(byId(focusedId));
  }

  function dayKeyOf(ts) {
    var d = new Date(ts);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    return d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
  }

  function dayLabelOf(ts) {
    var d = new Date(ts);
    return d.getDate() + ' ' + MONTHS_PL[d.getMonth()];
  }

  // Daily and hourly report — the actual "reports" entitlement. It groups the
  // long buffer by calendar day and by hour of day, and states the day-to-day
  // difference in words, because a table of numbers alone is hard to read for
  // the users this app is built for.
  function buildReport(points) {
    var box = h('div', { class: 'mz-stack' });
    box.appendChild(sectionTitle('Raport dzienny'));
    if (!points.length) {
      box.appendChild(h('p', {
        class: 'mz-muted',
        text: 'Raport pojawi się, gdy w wybranym zakresie będą zapisane odczyty.'
      }));
      return box;
    }

    var days = [];
    var byDay = {};
    var byHour = {};
    points.forEach(function (point) {
      var key = dayKeyOf(point.t);
      if (!byDay[key]) {
        byDay[key] = { key: key, labelPL: dayLabelOf(point.t), total: 0, good: 0, warning: 0, critical: 0 };
        days.push(byDay[key]);
      }
      var day = byDay[key];
      day.total += 1;
      if (day[point.zoneShare] !== undefined) day[point.zoneShare] += 1;
      if (point.zoneShare === 'critical') {
        var hour = new Date(point.t).getHours();
        byHour[hour] = (byHour[hour] || 0) + 1;
      }
    });
    days.sort(function (a, b) { return a.key < b.key ? 1 : -1; });   // newest first

    var percent = function (part, total) { return total ? Math.round((part / total) * 100) : 0; };
    var table = h('table', { id: 'mzReportTable', class: 'mz-compare-table' }, [
      h('caption', { text: 'Udział czasu w strefach, dzień po dniu' }),
      h('thead', {}, h('tr', {}, [
        h('th', { scope: 'col', text: 'Dzień' }),
        h('th', { scope: 'col', text: 'Bezpieczna' }),
        h('th', { scope: 'col', text: 'Umiarkowana' }),
        h('th', { scope: 'col', text: 'Szkodliwa' }),
        h('th', { scope: 'col', text: 'Odczyty' })
      ])),
      h('tbody', {}, days.map(function (day) {
        return h('tr', {}, [
          h('th', { scope: 'row', class: 'mz-compare-feature', text: day.labelPL }),
          h('td', { class: 'mz-compare-val', text: percent(day.good, day.total) + '%' }),
          h('td', { class: 'mz-compare-val', text: percent(day.warning, day.total) + '%' }),
          h('td', { class: 'mz-compare-val', text: percent(day.critical, day.total) + '%' }),
          h('td', { class: 'mz-compare-val', text: String(day.total) })
        ]);
      }))
    ]);
    box.appendChild(h('div', { id: 'mzReportTableWrap', class: 'mz-compare' }, table));

    // Day-to-day comparison, spelled out rather than left to the reader.
    if (days.length >= 2) {
      var today = percent(days[0].critical, days[0].total);
      var before = percent(days[1].critical, days[1].total);
      var diff = today - before;
      var wording;
      var pointsWordPL = function (n) {
        return n + ' ' + pluralPL(n, 'punkt procentowy', 'punkty procentowe', 'punktów procentowych');
      };
      if (diff === 0) wording = 'tyle samo co ' + days[1].labelPL + '.';
      else if (diff > 0) wording = 'o ' + pointsWordPL(diff) + ' więcej niż ' + days[1].labelPL + '.';
      else wording = 'o ' + pointsWordPL(Math.abs(diff)) + ' mniej niż ' + days[1].labelPL + '.';
      box.appendChild(h('p', {
        id: 'mzReportCompare',
        text: 'Porównanie dzień do dnia: ' + days[0].labelPL + ' — ' + today +
          '% czasu w strefie szkodliwej, ' + wording
      }));
    } else {
      box.appendChild(h('p', {
        id: 'mzReportCompare', class: 'mz-muted',
        text: 'Porównanie dzień do dnia pojawi się po drugim dniu pomiarów.'
      }));
    }

    // Time of day with the most harmful-zone readings.
    var peakHour = null;
    Object.keys(byHour).forEach(function (hour) {
      if (peakHour === null || byHour[hour] > byHour[peakHour]) peakHour = hour;
    });
    var pad = function (value) { return (value < 10 ? '0' : '') + value; };
    box.appendChild(h('p', {
      id: 'mzReportPeak',
      text: peakHour === null
        ? 'W tym zakresie nie zapisano odczytów w strefie szkodliwej.'
        : ('Najwięcej odczytów w strefie szkodliwej między ' + pad(Number(peakHour)) + ':00 a ' +
           pad((Number(peakHour) + 1) % 24) + ':00.')
    }));

    // Weekly aggregation — the second half of the "raport dzienny i tygodniowy"
    // entitlement. Shown only when the selected range can actually contain more
    // than one week's worth of days, so it never repeats the daily table.
    if (historyRangeMs >= 7 * DAY_MS) {
      box.appendChild(buildWeeklySection(points, percent));
    }

    box.appendChild(h('p', {
      class: 'mz-muted',
      text: 'Liczby to udział zapisanych odczytów w wybranym zakresie, nie dokładny czas ekspozycji.'
    }));
    return box;
  }

  // ISO-8601 week number. Weeks start on Monday, which is what a Polish reader
  // expects, and the year is carried along so a turn of the year cannot merge
  // two different weeks into one row.
  function isoWeekOf(ts) {
    var d = new Date(ts);
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var dayIndex = (d.getDay() + 6) % 7;          // 0 = Monday
    d.setDate(d.getDate() - dayIndex + 3);        // Thursday of this week
    var isoYear = d.getFullYear();
    var firstThursday = new Date(isoYear, 0, 4);
    var firstIndex = (firstThursday.getDay() + 6) % 7;
    firstThursday.setDate(firstThursday.getDate() - firstIndex + 3);
    var week = 1 + Math.round((d - firstThursday) / (7 * DAY_MS));
    return { key: isoYear + '-W' + (week < 10 ? '0' : '') + week, labelPL: 'Tydzień ' + week + ' (' + isoYear + ')' };
  }

  function buildWeeklySection(points, percent) {
    var weeks = [];
    var byWeek = {};
    points.forEach(function (point) {
      var info = isoWeekOf(point.t);
      if (!byWeek[info.key]) {
        byWeek[info.key] = { key: info.key, labelPL: info.labelPL, total: 0, good: 0, warning: 0, critical: 0 };
        weeks.push(byWeek[info.key]);
      }
      var week = byWeek[info.key];
      week.total += 1;
      if (week[point.zoneShare] !== undefined) week[point.zoneShare] += 1;
    });
    weeks.sort(function (a, b) { return a.key < b.key ? 1 : -1; });   // newest first

    var box = h('div', { class: 'mz-stack' }, [sectionTitle('Raport tygodniowy')]);
    if (!weeks.length) {
      box.appendChild(h('p', {
        id: 'mzWeeklyEmpty', class: 'mz-muted',
        text: 'Raport tygodniowy pojawi się, gdy w wybranym zakresie będą zapisane odczyty.'
      }));
      return box;
    }
    var table = h('table', { id: 'mzWeeklyTable', class: 'mz-compare-table' }, [
      h('caption', { text: 'Udział czasu w strefach, tydzień po tygodniu' }),
      h('thead', {}, h('tr', {}, [
        h('th', { scope: 'col', text: 'Tydzień' }),
        h('th', { scope: 'col', text: 'Bezpieczna' }),
        h('th', { scope: 'col', text: 'Umiarkowana' }),
        h('th', { scope: 'col', text: 'Szkodliwa' }),
        h('th', { scope: 'col', text: 'Odczyty' })
      ])),
      h('tbody', {}, weeks.map(function (week) {
        return h('tr', {}, [
          h('th', { scope: 'row', class: 'mz-compare-feature', text: week.labelPL }),
          h('td', { class: 'mz-compare-val', text: percent(week.good, week.total) + '%' }),
          h('td', { class: 'mz-compare-val', text: percent(week.warning, week.total) + '%' }),
          h('td', { class: 'mz-compare-val', text: percent(week.critical, week.total) + '%' }),
          h('td', { class: 'mz-compare-val', text: String(week.total) })
        ]);
      }))
    ]);
    box.appendChild(h('div', { id: 'mzWeeklyTableWrap', class: 'mz-compare' }, table));
    if (weeks.length >= 2) {
      var now = percent(weeks[0].critical, weeks[0].total);
      var prev = percent(weeks[1].critical, weeks[1].total);
      var diff = now - prev;
      var wordsPL = function (n) {
        return n + ' ' + pluralPL(n, 'punkt procentowy', 'punkty procentowe', 'punktów procentowych');
      };
      box.appendChild(h('p', {
        id: 'mzWeeklyCompare',
        text: 'Porównanie tydzień do tygodnia: ' + weeks[0].labelPL + ' — ' + now +
          '% czasu w strefie szkodliwej, ' +
          (diff === 0 ? ('tyle samo co ' + weeks[1].labelPL + '.')
            : (diff > 0 ? ('o ' + wordsPL(diff) + ' więcej niż ' + weeks[1].labelPL + '.')
              : ('o ' + wordsPL(Math.abs(diff)) + ' mniej niż ' + weeks[1].labelPL + '.')))
      }));
    } else {
      box.appendChild(h('p', {
        id: 'mzWeeklyCompare', class: 'mz-muted',
        text: 'Porównanie tydzień do tygodnia pojawi się po drugim tygodniu pomiarów.'
      }));
    }
    return box;
  }

  function profilesStore() {
    var stored = readJSON(PROFILES_KEY, null) || {};
    return {
      active: stored.active || '',
      list: Array.isArray(stored.list) ? stored.list : []
    };
  }

  function saveProfiles(store) {
    // Guard: profile persistence is a premium feature, never written for free tier.
    if (!hasFeature(FEATURES.PROFILES)) return false;
    return writeJSON(PROFILES_KEY, store);
  }

  function renderProfilesPanel() {
    var container = byId('profilesUpsell');
    if (!container) return;
    if (!hasFeature(FEATURES.PROFILES)) {
      renderUpsell('profilesUpsell', FEATURES.PROFILES, { compact: true });
      return;
    }
    // Same rebuild-from-scratch problem as the history panel: applying,
    // deleting or saving a profile must not drop focus to <body>.
    var focusedId = (document.activeElement && document.activeElement.id) || null;
    clear(container);
    var data = (window.AppData && typeof window.AppData.getThresholds === 'function') ? window.AppData : null;
    var store = profilesStore();

    var wrap = h('div', { class: 'mz-stack' }, [sectionTitle('Profile progów (Premium)')]);
    var list = h('div', { class: 'mz-list' });
    if (!store.list.length) {
      list.appendChild(h('p', { class: 'mz-muted', text: 'Nie masz jeszcze zapisanych profili.' }));
    }
    store.list.forEach(function (profile) {
      var row = h('div', { class: 'mz-row' }, [
        h('button', {
          id: 'mzProfileApply_' + profile.id, type: 'button', class: 'btn mz-grow',
          text: profile.namePL + (store.active === profile.id ? ' (aktywny)' : ''),
          'aria-label': 'Zastosuj profil ' + profile.namePL,
          onclick: function () {
            if (!data || typeof data.setThresholds !== 'function') return;
            data.setThresholds({ raw: profile.raw, share: profile.share });
            store.active = profile.id;
            saveProfiles(store);
            toast('Zastosowano profil „' + profile.namePL + '”.', { type: 'success' });
            renderProfilesPanel();
          }
        }),
        h('button', {
          id: 'mzProfileDelete_' + profile.id, type: 'button', class: 'btn btn-danger', text: 'Usuń',
          'aria-label': 'Usuń profil ' + profile.namePL,
          onclick: function () {
            store.list = store.list.filter(function (p) { return p.id !== profile.id; });
            if (store.active === profile.id) store.active = '';
            saveProfiles(store);
            toast('Usunięto profil „' + profile.namePL + '”.', { type: 'info' });
            renderProfilesPanel();
          }
        })
      ]);
      list.appendChild(row);
    });
    wrap.appendChild(list);

    var nameInput = h('input', {
      class: 'mz-promo-input', type: 'text', placeholder: 'Nazwa profilu (np. Wieczór)',
      id: 'mzProfileName', autocomplete: 'off'
    });
    wrap.appendChild(h('label', { for: 'mzProfileName', text: 'Zapisz bieżące progi jako profil' }));
    wrap.appendChild(h('div', { class: 'mz-row' }, [
      nameInput,
      h('button', {
        id: 'mzProfileSaveBtn', type: 'button', class: 'btn', text: 'Zapisz profil',
        onclick: function () {
          var name = (nameInput.value || '').trim();
          if (!name) { toast('Podaj nazwę profilu.', { type: 'warning' }); return; }
          if (store.list.length >= PROFILES_MAX) {
            toast('Możesz zapisać maksymalnie ' + PROFILES_MAX + ' profili. Usuń jeden, aby dodać nowy.', { type: 'warning' });
            return;
          }
          if (!data || typeof data.getThresholds !== 'function') return;
          var thresholds = data.getThresholds();
          store.list.push({
            id: 'p' + Date.now(),
            namePL: name,
            raw: { warn: thresholds.raw.warn, crit: thresholds.raw.crit },
            share: { warn: thresholds.share.warn, crit: thresholds.share.crit }
          });
          saveProfiles(store);
          toast('Zapisano profil „' + name + '”.', { type: 'success' });
          renderProfilesPanel();
        }
      })
    ]));
    container.appendChild(wrap);
    if (focusedId && byId(focusedId)) focusLater(byId(focusedId));
  }

  function updateExportButton() {
    var btn = byId('exportCsvBtn');
    if (!btn) return;
    if (!btn.getAttribute('data-mz-wired')) {
      btn.setAttribute('data-mz-wired', '1');
      btn.setAttribute('data-base-label', (btn.textContent || 'Eksport CSV').trim());
      btn.addEventListener('click', function () { api.exportCsv(); });
    }
    if (hasFeature(FEATURES.CSV_EXPORT)) unmarkLocked(btn);
    else markLocked(btn, FEATURES.CSV_EXPORT);
  }

  /* ---------------------------------------------------------------------
     CSV export
     --------------------------------------------------------------------- */

  function pad2(value) { return value < 10 ? '0' + value : String(value); }

  function csvTimestamp(ts) {
    var d = new Date(ts);
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()) + ' ' +
      pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
  }

  function exportCsv() {
    return requirePremium(FEATURES.CSV_EXPORT, { reason: 'csv_export' }).then(function (allowed) {
      if (!allowed) return false;
      var data = appData();
      var points = [];
      if (data) {
        try { points = data.getHistoryLong({}) || []; } catch (_) { points = []; }
      }
      if (!points.length && window.AppData && typeof window.AppData.getHistory === 'function') {
        try { points = window.AppData.getHistory() || []; } catch (_) { points = []; }
      }
      if (!points.length) {
        toast('Brak odczytów do wyeksportowania. Uruchom pomiar i spróbuj ponownie.', { type: 'warning' });
        return false;
      }
      var lines = ['czas;jasnosc_B_proc;udzial_niebieskiego_proc;jasnosc_sceny_proc;strefa'];
      points.forEach(function (p) {
        lines.push([
          csvTimestamp(p.t),
          String(Math.round(p.raw)),
          String(Math.round(p.share)),
          String(Math.round(p.brightness)),
          ZONE_LABEL[p.zoneShare] || ''
        ].join(';'));
      });
      // BOM keeps Polish characters readable when the file is opened in Excel.
      var blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var link = h('a', { href: url, download: 'monitoring-swiatla-' + csvTimestamp(Date.now()).replace(/[: ]/g, '-') + '.csv' });
      document.body.appendChild(link);
      link.click();
      window.setTimeout(function () {
        if (link.parentNode) link.parentNode.removeChild(link);
        URL.revokeObjectURL(url);
      }, 1000);
      toast('Wyeksportowano ' + readingsWordPL(points.length) + ' do pliku CSV.', { type: 'success' });
      return true;
    });
  }

  /* ---------------------------------------------------------------------
     Value-moment paywall
     --------------------------------------------------------------------- */

  function onboardingStore() {
    var stored = readJSON(ONBOARDING_KEY, null) || {};
    return {
      firstRunAt: stored.firstRunAt || 0,
      valueMomentAt: stored.valueMomentAt || null,
      cameraPrimerSeen: stored.cameraPrimerSeen === true,
      trialReminderShownAt: stored.trialReminderShownAt || null
    };
  }

  // The trial timeline promises a reminder before the trial runs out. Shown
  // once, at boot, from day 5 of 7 onwards — no timers, no repeat nagging.
  function maybeRemindAboutTrialEnd() {
    var state = getState();
    if (state.tier !== 'trial') return;
    var left = trialDaysLeft();
    if (left > 2) return;
    var onboarding = onboardingStore();
    if (onboarding.trialReminderShownAt) return;
    onboarding.trialReminderShownAt = Date.now();
    writeJSON(ONBOARDING_KEY, onboarding);
    toast('Okres próbny kończy się ' + fmtDate(state.trialEndsAt) +
      ' — zostało ' + daysWordPL(left) + '. Potem aplikacja wróci do wersji darmowej, ' +
      'a pomiar działa dalej bezpłatnie.', { type: 'info', durationMs: 8000 });
  }

  function maybeShowValueMomentPaywall() {
    var b = billing();
    if (!b || typeof b.canShowAutoPaywall !== 'function') return;
    var allowed = false;
    try { allowed = b.canShowAutoPaywall() === true; } catch (_) { allowed = false; }
    // Silent no-op when not allowed: no toast, no log, no nagging.
    if (!allowed) return;
    if (dialogStack.length || paywall.open) return;
    // Never interrupt reading. The ad plan forbids monetization surfaces around
    // the documentation (health education) and the account screen, and the
    // measurement keeps running on every screen, so the timer can fire anywhere.
    var screen = (window.AppNav && typeof window.AppNav.current === 'function')
      ? window.AppNav.current() : 'camera';
    if (screen !== 'camera' && screen !== 'monitoring') return;
    var onboarding = onboardingStore();
    onboarding.valueMomentAt = Date.now();
    writeJSON(ONBOARDING_KEY, onboarding);
    openPaywall('auto_value_moment', {});
  }

  /* ---------------------------------------------------------------------
     Public API
     --------------------------------------------------------------------- */

  /* ---------------------------------------------------------------------
     Threshold alerts and session summaries — the two premium features that
     react to measurement. Both listen; neither ever gates, delays or stops a
     sample. The entitlement is checked at the moment of NOTIFYING, never
     before taking the reading.
     --------------------------------------------------------------------- */

  var criticalSince = 0;
  var lastAlertAt = 0;
  var lastSessionSummary = null;

  function onSampleForAlerts(point) {
    if (!point) return;
    if (point.zoneShare !== 'critical') { criticalSince = 0; return; }
    if (!criticalSince) { criticalSince = point.t; return; }
    var exposureMs = point.t - criticalSince;
    if (exposureMs < ALERT_EXPOSURE_MS) return;
    if (!hasFeature(FEATURES.ALERTS)) return;
    if (point.t - lastAlertAt < ALERT_COOLDOWN_MS) return;
    lastAlertAt = point.t;
    criticalSince = point.t;   // re-arm from now, so the alert does not repeat at once
    fireExposureAlert(Math.max(1, Math.round(exposureMs / 60000)));
  }

  // Deliberately free of any price, plan name or "upgrade" wording: the spec
  // forbids attaching a sales message to a health-adjacent warning.
  function fireExposureAlert(minutes) {
    var message = 'Alert progowy: od ' + minutesWordPL(minutes) + ' odczyt jest w strefie szkodliwej. ' +
      'Rozważ przerwę albo zmniejszenie udziału niebieskiego na ekranie.';
    toast(message, { type: 'warning', durationMs: 8000 });
    announce('navLive', message);
    try {
      if (navigator && typeof navigator.vibrate === 'function' && !prefersReducedMotion()) {
        navigator.vibrate([200, 120, 200]);
      }
    } catch (_) { /* vibration is a nicety, never a requirement */ }
  }

  function formatDurationPL(ms) {
    var totalSeconds = Math.max(0, Math.round((ms || 0) / 1000));
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    if (!minutes) return seconds + ' s';
    return minutes + ' min ' + (seconds < 10 ? '0' : '') + seconds + ' s';
  }

  function onSessionEndForSummary(summary) {
    criticalSince = 0;
    lastSessionDurationMs = (summary && summary.durationMs) || 0;
    if (!summary) return;
    lastSessionSummary = summary;
    renderHistoryPanel();
    if (!hasFeature(FEATURES.BACKGROUND)) return;
    var critical = Math.round(((summary.zoneShares && summary.zoneShares.critical) || 0) * 100);
    toast('Sesja zakończona: ' + formatDurationPL(summary.durationMs) + ', ' +
      readingsWordPL(summary.samples || 0) + ', ' + critical + '% czasu w strefie szkodliwej.',
      { type: 'info', durationMs: 9000 });
  }

  // Card shown at the top of the history panel after a finished session.
  function buildSessionSummaryCard() {
    var summary = lastSessionSummary;
    var shares = (summary && summary.zoneShares) || {};
    var box = h('div', { id: 'mzSessionSummary', class: 'mz-stack' }, [
      sectionTitle('Podsumowanie ostatniej sesji')
    ]);
    box.appendChild(h('p', {
      text: 'Czas pomiaru: ' + formatDurationPL(summary.durationMs) +
        '. Zapisane odczyty: ' + (summary.samples || 0) + '.'
    }));
    ['good', 'warning', 'critical'].forEach(function (zone) {
      box.appendChild(h('p', {
        text: ZONE_LABEL_LONG[zone] + ': ' + Math.round((shares[zone] || 0) * 100) + '% czasu sesji.'
      }));
    });
    box.appendChild(h('p', {
      class: 'mz-muted',
      text: 'Podsumowanie dotyczy sesji zakończonej ' + fmtDateTime(summary.endedAt) + '.'
    }));
    return box;
  }

  function fmtDateTime(ts) {
    var b = billing();
    if (b && typeof b.formatDateTime === 'function') {
      try { return b.formatDateTime(ts); } catch (_) { /* fall through */ }
    }
    var d = new Date(ts);
    return d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  }

  var initialized = false;

  var api = {
    init: function () {
      if (initialized) return;
      initialized = true;

      var b = billing();
      if (b) {
        if (b.FEATURES) FEATURES = b.FEATURES;
        if (b.PRODUCT_IDS) PRODUCT_IDS = b.PRODUCT_IDS;
      }

      var onboarding = onboardingStore();
      if (!onboarding.firstRunAt) {
        onboarding.firstRunAt = Date.now();
        writeJSON(ONBOARDING_KEY, onboarding);
      }

      toastRegion();
      layer();
      buildPaywall();
      buildAccount();

      // Defensive: menu.js normally registers these, but the app must not break
      // if that file is missing from a stale service-worker cache.
      if (window.AppTabs && typeof window.AppTabs.registerOverlay === 'function') {
        window.AppTabs.registerOverlay('panelPremium');
        window.AppTabs.registerOverlay('panelAccount');
      }

      // Subscribe BEFORE init(): billing.js emits 'ready' / 'change' /
      // 'trial:expired' synchronously inside its init promise executor, so a
      // listener registered afterwards would miss the expiry notice entirely.
      if (b && typeof b.on === 'function') {
        b.on('change', function () { api.refresh(); });
        b.on('trial:expired', function () {
          toast('Okres próbny się zakończył. Aplikacja wróciła do wersji darmowej — pomiar działa dalej.',
            { type: 'info' });
        });
      }
      if (b && typeof b.init === 'function') {
        b.init().then(function () {
          api.refresh();
          maybeRemindAboutTrialEnd();
        }, function () { api.refresh(); });
      }

      if (window.AppNav && typeof window.AppNav.on === 'function') {
        window.AppNav.on('change', function (payload) {
          // Leaving the paywall by any route (Escape, bottom bar, back) resolves it.
          if (paywall.open && payload && payload.to !== 'premium') settleDismissed();
          // Entering the paywall by a route that bypasses openPaywall (browser
          // Back / popstate) must still clear the consent tick and recompute the
          // mode — a pre-ticked consent to a paid purchase is a forbidden
          // dark pattern and is invalid under art. 38(13) u.p.k.
          if (payload && payload.to === 'premium' && !paywall.open && paywall.built) {
            resetPaywallForVisit();
          }
          if (payload && payload.to === 'account') renderAccount();
          api.refreshAds();
        });
      } else if (window.AppTabs && typeof window.AppTabs.onChange === 'function') {
        window.AppTabs.onChange(function () { api.refreshAds(); });
      }

      if (window.AppData && typeof window.AppData.onSessionEnd === 'function') {
        window.AppData.onSessionEnd(onSessionEndForSummary);
      }
      if (window.AppData && typeof window.AppData.onSample === 'function') {
        window.AppData.onSample(onSampleForAlerts);
      }

      // Escape fallback for overlay screens when menu.js is not present.
      if (!window.AppNav) {
        document.addEventListener('keydown', function (ev) {
          if (ev.key !== 'Escape' || dialogStack.length) return;
          var premiumPanel = byId('panelPremium');
          var accountPanel = byId('panelAccount');
          if (premiumPanel && !premiumPanel.hasAttribute('hidden')) { ev.preventDefault(); dismissPaywall(); }
          else if (accountPanel && !accountPanel.hasAttribute('hidden')) { ev.preventDefault(); goBack(); }
        });
      }

      // menu.js owns panelAbout and already wires this link. We only step in
      // when menu.js is missing (e.g. an old service-worker cache), otherwise
      // both handlers would fire and the screen would be entered twice.
      var discLink = byId('medicalDisclaimerLink');
      if (discLink && !window.AppNav) {
        discLink.addEventListener('click', function (ev) {
          ev.preventDefault();
          goScreen('about', 'panelAbout', discLink);
        });
      }

      api.refresh();
    },

    openPaywall: openPaywall,

    closePaywall: function () {
      if (!paywall.open) return;
      dismissPaywall();
    },

    maybeShowValueMomentPaywall: maybeShowValueMomentPaywall,

    requirePremium: requirePremium,

    openAccount: function (opts) {
      opts = opts || {};
      goScreen('account', 'panelAccount', opts.returnFocusTo || null);
      renderAccount();
      focusLater(byId('accountTitle'));
    },

    restoreFromMenu: function () {
      var b = billing();
      if (!b || typeof b.restorePurchases !== 'function') {
        var failed = { ok: false, code: 'UNAVAILABLE_IN_BROWSER', messagePL: 'Przywracanie zakupów jest niedostępne w tej wersji.', state: getState() };
        toast(failed.messagePL, { type: 'warning' });
        announce('accountLive', failed.messagePL);
        return Promise.resolve(failed);
      }
      return b.restorePurchases().then(function (result) {
        var message = (result && result.messagePL) ||
          (result && result.ok ? 'Przywrócono dostęp do wersji Premium.' : 'Nie znaleziono zapisanych zakupów na tym urządzeniu (DEMO).');
        toast(message, { type: result && result.ok ? 'success' : 'info' });
        announce('accountLive', message);
        announce('premiumLive', message);
        api.refresh();
        return result;
      });
    },

    showBannerAd: showBannerAd,
    hideBannerAd: hideBannerAd,
    refreshAds: refreshAds,
    showRewardedAd: showRewardedAd,
    setInterstitialEnabled: setInterstitialEnabled,
    maybeShowInterstitial: maybeShowInterstitial,
    openConsent: openConsent,
    renderUpsell: renderUpsell,
    markLocked: markLocked,
    updatePremiumPill: updatePremiumPill,
    exportCsv: exportCsv,
    toast: toast,

    refresh: function () {
      updatePremiumPill();
      renderAccount();
      updateWelcomeOffer();
      updateExportButton();
      renderHistoryPanel();
      renderProfilesPanel();
      refreshAds();
      // A promo code changes the prices baked into the plan cards, and a
      // purchase can turn the whole screen from an offer into a receipt.
      if (paywall.built) {
        syncPlanPrices();
        var premiumPanel = byId('panelPremium');
        if (premiumPanel && !premiumPanel.hasAttribute('hidden')) {
          paywall.mode = paywallModeFor();
          applyPaywallMode();
        }
        // Trial length can change the yearly plan's terms and CTA wording.
        // Never re-select a card applyPaywallMode() has just hidden.
        selectFirstVisiblePlan();
      }
    }
  };

  window.BlueMonitor = window.BlueMonitor || {};
  window.MonetizationUI = api;
  window.BlueMonitor.MonetizationUI = api;

  /* ---------------------------------------------------------------------
     Boot — after app.js has published AppTabs/AppData
     --------------------------------------------------------------------- */

  function boot() { api.init(); }

  if (window.AppTabs) boot();
  else document.addEventListener('app:ready', boot, { once: true });
})();
