/* =====================================================================
   menu.js — the only owner of navigation.
   Builds the bottom navigation bar (#appNav), fills #panelMore and
   #panelAbout, hides the legacy top tab strip and routes every screen
   through window.AppTabs (published by app.js).

   Design notes (why, not what):
   - A bottom bar beats a drawer for this audience: one thumb-reachable
     tap instead of open+pick, and the structure of the app stays visible.
   - The legacy .tabs strip is kept in the DOM but hidden, so app.js keeps
     working untouched and screen readers do not hear duplicated nav.
   - History integration uses pushState WITHOUT touching the URL. Hash
     routing would collide with the in-page anchors of the documentation
     table of contents (#doc-start etc.), which must keep working.
   ===================================================================== */
(function () {
  'use strict';

  var NS = window.BlueMonitor = window.BlueMonitor || {};

  var STORAGE_KEY = 'blueMonitor.nav.v1';
  var MAX_STACK = 10;

  /* ------------------------------------------------------------------
     Inline SVG icons. No external assets anywhere in this app — the
     service worker has to be able to serve everything offline.
     ------------------------------------------------------------------ */
  var ICON_CAMERA =
    '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">' +
    '<path fill="currentColor" d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zm8 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>';

  var ICON_GAUGE =
    '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">' +
    '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M3.6 17.5a9 9 0 1 1 16.8 0"/>' +
    '<line x1="12" y1="17" x2="16.6" y2="10.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    '<circle cx="12" cy="17" r="1.9" fill="currentColor"/></svg>';

  var ICON_STAR =
    '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">' +
    '<path fill="currentColor" d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.6-5.9-3.2-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9z"/></svg>';

  var ICON_MORE =
    '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">' +
    '<path fill="currentColor" d="M3 5.9h18v2.2H3zm0 4.9h18V13H3zm0 4.9h18v2.2H3z"/></svg>';

  var ICON_CHEVRON =
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">' +
    '<path fill="currentColor" d="M9.3 5.3 7.9 6.7 13.2 12l-5.3 5.3 1.4 1.4L16 12z"/></svg>';

  var ICON_WARN =
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">' +
    '<path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>';

  /* ------------------------------------------------------------------
     Screen registry
     ------------------------------------------------------------------ */
  var SCREENS = [
    { id: 'camera',     labelPL: 'Kamera',                 kind: 'tab',     panelId: 'panelCamera',     inBar: true,  iconSvg: ICON_CAMERA, btnId: 'navBtnCamera' },
    { id: 'monitoring', labelPL: 'Monitoring',             kind: 'tab',     panelId: 'panelMonitoring', inBar: true,  iconSvg: ICON_GAUGE,  btnId: 'navBtnMonitoring' },
    { id: 'premium',    labelPL: 'Premium',                kind: 'overlay', panelId: 'panelPremium',    inBar: true,  iconSvg: ICON_STAR,   btnId: 'navBtnPremium', badgeId: 'navBadgePremium' },
    { id: 'more',       labelPL: 'Więcej',                 kind: 'overlay', panelId: 'panelMore',       inBar: true,  iconSvg: ICON_MORE,   btnId: 'navBtnMore' },
    { id: 'account',    labelPL: 'Konto i subskrypcja',    kind: 'overlay', panelId: 'panelAccount',    inBar: false },
    { id: 'docs',       labelPL: 'Dokumentacja',           kind: 'overlay', panelId: 'panelMethodology', inBar: false },
    { id: 'about',      labelPL: 'O aplikacji i kontakt',  kind: 'overlay', panelId: 'panelAbout',      inBar: false },
    { id: 'settings',   labelPL: 'Progi ostrzegania',      kind: 'alias',   target: 'monitoring',       inBar: false }
  ];

  /* ------------------------------------------------------------------
     Module state
     ------------------------------------------------------------------ */
  var inited = false;
  var currentId = null;
  var backStack = [];          // screen ids, newest last, max MAX_STACK
  var navIndex = 0;            // mirrors our own history entries
  var applying = false;        // guards AppTabs -> AppNav -> AppTabs recursion
  var focusReturn = {};        // screenId -> element that opened it
  var listeners = { change: [], ready: [] };
  var navEl = null;
  var navListEl = null;
  var liveEl = null;

  /* ------------------------------------------------------------------
     Small helpers
     ------------------------------------------------------------------ */
  function byId(id) { return document.getElementById(id); }

  function findScreen(id) {
    for (var i = 0; i < SCREENS.length; i++) {
      if (SCREENS[i].id === id) return SCREENS[i];
    }
    return null;
  }

  function barScreens() {
    var out = [];
    for (var i = 0; i < SCREENS.length; i++) {
      if (SCREENS[i].inBar) out.push(SCREENS[i]);
    }
    return out;
  }

  function reducedMotion() {
    try {
      return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (e) { return false; }
  }

  // Every storage access is wrapped: private mode throws on read AND write.
  function readStore() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : null;
      if (parsed && typeof parsed === 'object') return parsed;
    } catch (e) { /* storage unavailable — defaults are fine */ }
    return { lastScreen: null, seenBottomNavHint: false };
  }

  function writeStore(patch) {
    var data = readStore();
    for (var k in patch) {
      if (Object.prototype.hasOwnProperty.call(patch, k)) data[k] = patch[k];
    }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { /* ignore */ }
  }

  function emit(event, payload) {
    var list = listeners[event];
    if (!list) return;
    for (var i = 0; i < list.length; i++) {
      // One broken listener must not stop the others from being notified.
      try { list[i](payload); } catch (e) { /* ignore */ }
    }
  }

  function daysWordPL(n) { return n === 1 ? '1 dzień' : n + ' dni'; }

  /* ------------------------------------------------------------------
     Bottom navigation bar
     ------------------------------------------------------------------ */
  function ensureShell() {
    navEl = byId('appNav');
    if (!navEl) {
      navEl = document.createElement('nav');
      navEl.id = 'appNav';
      document.body.appendChild(navEl);
    }
    navEl.className = 'nav-bar';
    navEl.setAttribute('role', 'navigation');
    navEl.setAttribute('aria-label', 'Menu główne');

    liveEl = byId('navLive');
    if (!liveEl) {
      liveEl = document.createElement('div');
      liveEl.id = 'navLive';
      liveEl.className = 'mz-visually-hidden';
      liveEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(liveEl);
    }
  }

  function buildBar() {
    navEl.innerHTML = '';
    navListEl = document.createElement('ul');
    navListEl.id = 'navList';
    navListEl.className = 'nav-list';
    navListEl.setAttribute('role', 'list');

    var list = barScreens();
    for (var i = 0; i < list.length; i++) {
      navListEl.appendChild(buildBarItem(list[i]));
    }
    navEl.appendChild(navListEl);
    navListEl.addEventListener('keydown', onBarKeydown);
  }

  function buildBarItem(screen) {
    var li = document.createElement('li');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = screen.btnId || ('navBtn_' + screen.id);
    btn.className = 'nav-btn';
    btn.setAttribute('data-screen', screen.id);
    btn.tabIndex = -1;

    var icon = document.createElement('span');
    icon.className = 'nav-btn-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = screen.iconSvg || '';

    var label = document.createElement('span');
    label.className = 'nav-btn-label';
    label.textContent = screen.labelPL;

    btn.appendChild(icon);
    btn.appendChild(label);

    if (screen.badgeId) {
      var badge = document.createElement('span');
      badge.id = screen.badgeId;
      badge.className = 'nav-badge';
      badge.hidden = true;
      btn.appendChild(badge);
    }

    btn.addEventListener('click', function () { onBarActivate(screen, btn); });
    li.appendChild(btn);
    return li;
  }

  function onBarActivate(screen, btn) {
    // The paywall keeps its own "why was this opened" bookkeeping, so route
    // the Premium entry through MonetizationUI when it is loaded.
    if (screen.id === 'premium' && window.MonetizationUI && window.MonetizationUI.openPaywall) {
      window.MonetizationUI.openPaywall('nav', { returnFocusTo: btn });
      return;
    }
    go(screen.id, { from: btn });
  }

  function barButtons() {
    if (!navListEl) return [];
    return Array.prototype.slice.call(navListEl.querySelectorAll('.nav-btn'));
  }

  // Roving tabindex: the bar is a single Tab stop, arrows move inside it.
  function onBarKeydown(ev) {
    var key = ev.key;
    if (key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Home' && key !== 'End') return;
    var btns = barButtons();
    if (!btns.length) return;
    var idx = btns.indexOf(document.activeElement);
    if (idx < 0) idx = 0;
    var next = idx;
    if (key === 'ArrowLeft') next = (idx - 1 + btns.length) % btns.length;
    else if (key === 'ArrowRight') next = (idx + 1) % btns.length;
    else if (key === 'Home') next = 0;
    else if (key === 'End') next = btns.length - 1;
    ev.preventDefault();
    setRovingTo(btns[next]);
    btns[next].focus();
  }

  function setRovingTo(target) {
    var btns = barButtons();
    for (var i = 0; i < btns.length; i++) {
      btns[i].tabIndex = btns[i] === target ? 0 : -1;
    }
  }

  function updateBarState() {
    var btns = barButtons();
    var active = null;
    for (var i = 0; i < btns.length; i++) {
      var isCurrent = btns[i].getAttribute('data-screen') === currentId;
      if (isCurrent) {
        btns[i].setAttribute('aria-current', 'page');
        active = btns[i];
      } else {
        btns[i].removeAttribute('aria-current');
      }
    }
    // When the visible screen is not in the bar (Konto, Dokumentacja,
    // O aplikacji) the first item stays the single Tab stop.
    setRovingTo(active || btns[0] || null);
  }

  /* ------------------------------------------------------------------
     "Więcej" screen
     ------------------------------------------------------------------ */
  function makeListItem(id, titlePL, subPL, onClick) {
    var li = document.createElement('li');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = id;
    btn.className = 'mz-list-item';

    var body = document.createElement('span');
    body.className = 'mz-list-item-body';

    var title = document.createElement('span');
    title.className = 'mz-list-item-title';
    title.textContent = titlePL;

    var sub = document.createElement('span');
    sub.className = 'mz-list-item-sub';
    sub.textContent = subPL;

    body.appendChild(title);
    body.appendChild(sub);

    var chevron = document.createElement('span');
    chevron.className = 'mz-list-chevron';
    chevron.setAttribute('aria-hidden', 'true');
    chevron.innerHTML = ICON_CHEVRON;

    btn.appendChild(body);
    btn.appendChild(chevron);
    btn.addEventListener('click', function () { onClick(btn); });
    li.appendChild(btn);
    return li;
  }

  function makeSection(headingId, titlePL, items) {
    var frag = document.createDocumentFragment();
    var h = document.createElement('h3');
    h.id = headingId;
    h.className = 'mz-section-title';
    h.textContent = titlePL;
    frag.appendChild(h);

    var ul = document.createElement('ul');
    ul.className = 'mz-list';
    ul.setAttribute('role', 'list');
    ul.setAttribute('aria-labelledby', headingId);
    for (var i = 0; i < items.length; i++) ul.appendChild(items[i]);
    frag.appendChild(ul);
    return frag;
  }

  function buildMore() {
    var panel = byId('panelMore');
    if (!panel) return;
    panel.innerHTML = '';

    var h2 = document.createElement('h2');
    h2.id = 'moreTitle';
    h2.className = 'mz-screen-title';
    h2.tabIndex = -1;
    h2.textContent = 'Więcej';
    panel.appendChild(h2);

    // This screen carries an account entry, a working "Przywróć zakupy" and a
    // sales card, so it needs the same standing DEMO notice as the Premium and
    // Account screens — at the TOP, not in the last paragraph after the ad slot.
    var demo = document.createElement('div');
    demo.id = 'moreDemoBanner';
    demo.className = 'mz-demo-banner';
    demo.setAttribute('role', 'note');
    demo.textContent = 'DEMO — SYMULACJA. Plany, ceny, konto i reklamy w tej aplikacji są ' +
      'fikcyjne. Żadna opłata nie zostanie pobrana.';
    panel.appendChild(demo);
    h2.setAttribute('aria-describedby', 'moreDemoBanner');

    // A) upsell card — the only upsell on this screen
    var card = document.createElement('button');
    card.type = 'button';
    card.id = 'moreUpsellCard';
    card.className = 'mz-upsell-card';

    var cardIcon = document.createElement('span');
    cardIcon.className = 'mz-upsell-icon';
    cardIcon.setAttribute('aria-hidden', 'true');
    cardIcon.innerHTML = ICON_STAR;

    var cardBody = document.createElement('span');
    cardBody.className = 'mz-list-item-body';
    var cardTitle = document.createElement('span');
    cardTitle.className = 'mz-upsell-title';
    var cardSub = document.createElement('span');
    cardSub.className = 'mz-upsell-sub';
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSub);

    var cardChevron = document.createElement('span');
    cardChevron.className = 'mz-list-chevron';
    cardChevron.setAttribute('aria-hidden', 'true');
    cardChevron.innerHTML = ICON_CHEVRON;

    card.appendChild(cardIcon);
    card.appendChild(cardBody);
    card.appendChild(cardChevron);
    card.addEventListener('click', function () {
      if (window.MonetizationUI && window.MonetizationUI.openPaywall) {
        window.MonetizationUI.openPaywall('more_screen', { returnFocusTo: card });
      } else {
        go('premium', { from: card });
      }
    });
    panel.appendChild(card);

    // Third rewarded-ad entry point from the ad plan (the other two live under
    // the charts and in the CSV lock dialog). Opt-in only: it never starts by
    // itself, and it names the reward before the fake ad begins.
    var rewarded = document.createElement('button');
    rewarded.type = 'button';
    rewarded.id = 'moreRewardedBtn';
    rewarded.className = 'btn btn-large';
    rewarded.hidden = true;
    rewarded.textContent = 'Obejrzyj reklamę (DEMO) — eksport CSV na 24 h';
    rewarded.addEventListener('click', function () {
      if (!window.MonetizationUI || !window.MonetizationUI.showRewardedAd) {
        announce('Reklama nagradzana jest chwilowo niedostępna.');
        return;
      }
      window.MonetizationUI.showRewardedAd('csvExport', { returnFocusTo: rewarded });
    });
    panel.appendChild(rewarded);

    var thanks = document.createElement('p');
    thanks.id = 'morePremiumThanks';
    thanks.className = 'mz-muted';
    thanks.hidden = true;
    thanks.textContent = 'Masz wersję Premium (DEMO). Dziękujemy!';
    panel.appendChild(thanks);

    // B) USTAWIENIA
    panel.appendChild(makeSection('moreSectionSettings', 'USTAWIENIA', [
      makeListItem('moreBtnThresholds', 'Progi ostrzegania',
        'Ustaw granice stref bezpiecznej, umiarkowanej i szkodliwej.',
        function (btn) { go('settings', { from: btn }); }),
      makeListItem('moreBtnPrivacy', 'Prywatność i reklamy (zmień zgodę)',
        'Zdecyduj, czy reklamy mogą być dopasowane do Ciebie.',
        function () {
          if (window.MonetizationUI && window.MonetizationUI.openConsent) {
            window.MonetizationUI.openConsent(true);
          } else {
            announce('Ustawienia prywatności są chwilowo niedostępne.');
          }
        })
    ]));

    // C) KONTO I ZAKUPY
    panel.appendChild(makeSection('moreSectionAccount', 'KONTO I ZAKUPY', [
      makeListItem('moreBtnAccount', 'Konto i subskrypcja',
        'Sprawdź stan wersji Premium, zarządzaj lub anuluj.',
        function (btn) { go('account', { from: btn }); }),
      makeListItem('moreBtnRestore', 'Przywróć zakupy',
        'Odzyskaj dostęp po ponownej instalacji.',
        function () {
          if (window.MonetizationUI && window.MonetizationUI.restoreFromMenu) {
            window.MonetizationUI.restoreFromMenu();
          } else {
            announce('Przywracanie zakupów jest chwilowo niedostępne.');
          }
        })
    ]));

    // D) POMOC
    panel.appendChild(makeSection('moreSectionHelp', 'POMOC', [
      makeListItem('moreBtnDocs', 'Dokumentacja',
        'Jak działa pomiar, jednostki, normy i strefy.',
        function (btn) { go('docs', { from: btn }); }),
      makeListItem('moreBtnAbout', 'O aplikacji i kontakt',
        'Wersja, dane sprzedawcy, prywatność i kontakt.',
        function (btn) { go('about', { from: btn }); })
    ]));

    // E) ad slot — menu.js only reserves the empty container, MonetizationUI
    //    fills it and decides whether it may be shown at all.
    var ad = document.createElement('div');
    ad.id = 'adSlotMore';
    ad.className = 'ad-slot ad-slot-reserved';
    ad.hidden = true;
    panel.appendChild(ad);

    // F) footer
    var version = document.createElement('p');
    version.id = 'moreVersionLine';
    version.className = 'mz-muted';
    version.textContent = 'Wersja 1.0 · Tryb DEMO monetyzacji · Dane cenowe są fikcyjne';
    panel.appendChild(version);

    updateUpsellCard();
  }

  function updateUpsellCard() {
    var card = byId('moreUpsellCard');
    var thanks = byId('morePremiumThanks');
    if (!card) return;
    var title = card.querySelector('.mz-upsell-title');
    var sub = card.querySelector('.mz-upsell-sub');
    var B = window.Billing;

    var isTrial = !!(B && B.isTrial && B.isTrial());
    var isPremium = !!(B && B.isPremium && B.isPremium()) && !isTrial;

    var rewarded = byId('moreRewardedBtn');
    var rewardedUsable = !!(window.MonetizationUI && window.MonetizationUI.showRewardedAd);

    if (isPremium) {
      card.hidden = true;
      if (thanks) thanks.hidden = false;
      if (rewarded) rewarded.hidden = true;
      return;
    }
    card.hidden = false;
    if (thanks) thanks.hidden = true;
    // A trial already has every premium feature, so there is nothing to unlock.
    if (rewarded) rewarded.hidden = !rewardedUsable || isTrial;

    if (isTrial) {
      var left = 0;
      try { left = B.daysLeftOfTrial ? B.daysLeftOfTrial() : 0; } catch (e) { left = 0; }
      title.textContent = 'Okres próbny — zostało ' + daysWordPL(left);
      sub.textContent = 'Po zakończeniu wrócisz do wersji darmowej. Zobacz plany.';
      card.setAttribute('aria-label',
        'Okres próbny — zostało ' + daysWordPL(left) +
        '. Zobacz plany Premium. Wersja demonstracyjna.');
    } else {
      title.textContent = 'Przejdź na Premium';
      sub.textContent = 'Historia 30 dni, eksport CSV, raporty i brak reklam (DEMO). Pomiar pozostaje bezpłatny.';
      card.setAttribute('aria-label',
        'Przejdź na Premium — historia 30 dni, eksport CSV, raporty i brak reklam. Wersja demonstracyjna.');
    }
  }

  /* ------------------------------------------------------------------
     "O aplikacji i kontakt" screen
     ------------------------------------------------------------------ */
  function makeCard(id, paragraphs) {
    var section = document.createElement('section');
    section.className = 'card';
    if (id) section.id = id;
    for (var i = 0; i < paragraphs.length; i++) {
      var p = document.createElement('p');
      p.textContent = paragraphs[i];
      section.appendChild(p);
    }
    return section;
  }

  function makeSectionTitle(titlePL) {
    var h = document.createElement('h3');
    h.className = 'mz-section-title';
    h.textContent = titlePL;
    return h;
  }

  function makeBackButton(id) {
    var row = document.createElement('div');
    row.className = 'mz-row';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = id;
    btn.className = 'mz-back-btn';
    btn.setAttribute('data-nav-back', '');
    btn.setAttribute('aria-label', 'Wróć do poprzedniego ekranu');
    btn.textContent = '← Wróć';
    row.appendChild(btn);
    return row;
  }

  function buildAbout() {
    var panel = byId('panelAbout');
    if (!panel) return;
    panel.innerHTML = '';

    panel.appendChild(makeBackButton('aboutBackBtn'));

    var h2 = document.createElement('h2');
    h2.id = 'aboutTitle';
    h2.className = 'mz-screen-title';
    h2.tabIndex = -1;
    h2.textContent = 'O aplikacji i kontakt';
    panel.appendChild(h2);

    // This screen carries a fictional Regulamin, fictional seller details and a
    // refunds policy — the kind of content a reader could mistake for the real
    // thing — so it gets the same standing DEMO notice as Premium, Account and
    // "Więcej", at the TOP rather than in the closing paragraph.
    var aboutDemo = document.createElement('div');
    aboutDemo.id = 'aboutDemoBanner';
    aboutDemo.className = 'mz-demo-banner';
    aboutDemo.setAttribute('role', 'note');
    aboutDemo.textContent = 'DEMO — SYMULACJA. Regulamin, dane sprzedawcy, ceny, konto i reklamy ' +
      'na tym ekranie są fikcyjne. Nie zawieramy żadnej umowy i nie pobieramy żadnych opłat.';
    panel.appendChild(aboutDemo);
    h2.setAttribute('aria-describedby', 'aboutDemoBanner');

    // Medical disclaimer first — it is the most important thing on this screen.
    var disclaimer = document.createElement('section');
    disclaimer.id = 'aboutDisclaimer';
    disclaimer.className = 'card mz-disclaimer';
    disclaimer.setAttribute('role', 'note');
    var dHead = document.createElement('h3');
    dHead.innerHTML = '<span class="mz-demo-icon" aria-hidden="true">' + ICON_WARN + '</span> To nie jest wyrób medyczny';
    disclaimer.appendChild(dHead);
    var dText = document.createElement('p');
    dText.textContent = 'Ta aplikacja nie jest wyrobem medycznym. Nie służy do diagnozowania, ' +
      'leczenia ani zapobiegania jakimkolwiek chorobom. Wyniki pomiaru kamerą telefonu mają ' +
      'charakter orientacyjny i nie zastępują badania ani porady lekarza. W sprawach zdrowia ' +
      'wzroku skonsultuj się z lekarzem lub optometrystą. Progi stref w tej aplikacji nie ' +
      'odwzorowują żadnej normy bezpieczeństwa — szczegóły w Dokumentacji, rozdział 3.';
    disclaimer.appendChild(dText);
    panel.appendChild(disclaimer);

    panel.appendChild(makeSectionTitle('Regulamin (DEMO)'));
    panel.appendChild(makeCard('aboutTerms', [
      'To jest prototyp interfejsu. Nie zawieramy z Tobą żadnej umowy, nie sprzedajemy ' +
      'niczego i nie pobieramy żadnych opłat — wszystkie plany, ceny, konta i reklamy w tej ' +
      'aplikacji są symulacją.',
      'Aplikacja jest udostępniana „tak jak jest”, do użytku informacyjnego. Wynik pomiaru ma ' +
      'charakter orientacyjny i nie jest podstawą do decyzji zdrowotnych. W wersji sprzedawanej ' +
      'w Google Play w tym miejscu znalazłby się pełny regulamin usługi cyfrowej wraz z zasadami ' +
      'odnawiania subskrypcji, cenami i danymi sprzedawcy.'
    ]));

    panel.appendChild(makeSectionTitle('Prywatność i dane'));
    panel.appendChild(makeCard('aboutPrivacy', [
      'Obraz z kamery jest analizowany wyłącznie na Twoim urządzeniu i nigdy nie jest ' +
      'wysyłany na żaden serwer. Nie tworzymy kont ani nie zbieramy Twoich danych zdrowotnych. ' +
      'Ustawienia progów, historia pomiarów i stan wersji Premium są zapisywane tylko w pamięci ' +
      'tego urządzenia. Jeśli włączone są reklamy, dostawca reklam może odczytywać identyfikator ' +
      'reklamowy Twojego urządzenia — w tej wersji demonstracyjnej nie dzieje się to naprawdę.'
    ]));

    panel.appendChild(makeSectionTitle('Kontakt i dane sprzedawcy'));
    panel.appendChild(makeCard('aboutSeller', [
      'Sprzedawca: [NAZWA — dane demonstracyjne], [ADRES], NIP: [NIP], ' +
      'e-mail: [E-MAIL], telefon: [TELEFON]. Reklamacje rozpatrujemy w terminie ' +
      '14 dni od zgłoszenia.',
      'Wszystkie dane sprzedawcy na tym ekranie są fikcyjne i służą wyłącznie do ' +
      'testowania interfejsu.'
    ]));

    panel.appendChild(makeSectionTitle('Zwroty i odstąpienie od umowy'));
    panel.appendChild(makeCard('aboutRefunds', [
      'Masz 14 dni na odstąpienie od umowy bez podania przyczyny. Prawo to wygasa, jeśli ' +
      'zażądasz rozpoczęcia świadczenia usługi cyfrowej przed upływem tego terminu i zostaniesz ' +
      'o utracie prawa poinformowany — takie oświadczenie zaznaczasz przed zakupem. Zwrotów za ' +
      'zakupy dokonane w Google Play dokonuje Google: play.google.com/store/account. Niezależnie ' +
      'od tego możesz zgłosić się bezpośrednio do nas na podany wyżej adres e-mail.'
    ]));

    var version = document.createElement('p');
    version.id = 'aboutVersionLine';
    version.className = 'mz-muted';
    version.textContent = 'Wersja 1.0 · Tryb DEMO monetyzacji. Wszystkie ceny, produkty, konta ' +
      'i reklamy w tej aplikacji są fikcyjne i służą wyłącznie do testowania interfejsu.';
    panel.appendChild(version);

    var resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.id = 'aboutResetBtn';
    resetBtn.className = 'btn btn-large';
    resetBtn.textContent = 'Zresetuj stan demonstracyjny';
    resetBtn.addEventListener('click', onResetDemoState);
    panel.appendChild(resetBtn);

    var resetHint = document.createElement('p');
    resetHint.className = 'mz-muted';
    resetHint.id = 'aboutResetHint';
    resetHint.textContent = 'Przywraca wersję darmową, kasuje symulowane zakupy, zgodę na ' +
      'reklamy i kody promocyjne. Nie kasuje ustawionych progów ani zapisanej ' +
      'historii pomiarów — to Twoje dane, nie część symulacji.';
    panel.appendChild(resetHint);
  }

  // QA affordance. blueMonitor.thresholds.v1 is deliberately NOT touched —
  // the user's safety thresholds are not part of the monetization demo.
  function onResetDemoState() {
    var done = function () {
      var msg = 'Zresetowano stan demonstracyjny.';
      if (window.MonetizationUI && window.MonetizationUI.toast) {
        window.MonetizationUI.toast(msg, { type: 'success' });
      }
      announce(msg);
      if (window.MonetizationUI && window.MonetizationUI.refresh) {
        try { window.MonetizationUI.refresh(); } catch (e) { /* ignore */ }
      }
      syncBilling();
    };

    // Ad/onboarding/profile keys belong to monetization-ui.js, but the reset
    // button lives here and the user was promised a full demo wipe.
    var demoKeys = ['blueMonitor.ads.v1', 'blueMonitor.onboarding.v1', 'blueMonitor.profiles.v1'];
    for (var i = 0; i < demoKeys.length; i++) {
      try { localStorage.removeItem(demoKeys[i]); } catch (e) { /* ignore */ }
    }

    if (window.Billing && window.Billing.reset) {
      var p = window.Billing.reset();
      if (p && typeof p.then === 'function') p.then(done, done);
      else done();
    } else {
      done();
    }
  }

  /* ------------------------------------------------------------------
     Routing
     ------------------------------------------------------------------ */
  function panelOf(screen) {
    return screen.panelId ? byId(screen.panelId) : null;
  }

  function focusTargetFor(panel) {
    if (!panel) return null;
    var title = panel.querySelector('.mz-screen-title');
    if (title) {
      if (!title.hasAttribute('tabindex')) title.tabIndex = -1;
      return title;
    }
    // Fallback: the panel itself, so screen readers announce its aria-label
    // (this is what the documentation panel relies on).
    if (panel.getAttribute('aria-label') || panel.getAttribute('aria-labelledby')) {
      if (!panel.hasAttribute('tabindex')) panel.tabIndex = -1;
      return panel;
    }
    var h = panel.querySelector('h2');
    if (h) {
      if (!h.hasAttribute('tabindex')) h.tabIndex = -1;
      return h;
    }
    return null;
  }

  function pushHistory(id, mode) {
    if (!window.history || !history.pushState) return;
    try {
      if (mode === 'replace') {
        history.replaceState({ bmScreen: id, bmIndex: navIndex }, '', location.href);
      } else {
        navIndex += 1;
        history.pushState({ bmScreen: id, bmIndex: navIndex }, '', location.href);
      }
    } catch (e) { /* history unavailable — in-app back button still works */ }
  }

  function pushBackStack(id) {
    if (!id) return;
    backStack.push(id);
    while (backStack.length > MAX_STACK) backStack.shift();
  }

  /* mode: 'push' | 'replace' | 'history' (popstate — do not touch history) */
  function navigate(screen, opts, mode) {
    opts = opts || {};
    var from = currentId;
    var same = from === screen.id;

    if (!same && from && mode === 'push') pushBackStack(from);
    if (mode !== 'history') pushHistory(screen.id, same ? 'replace' : mode);

    currentId = screen.id;

    // Reveal the panel — always through AppTabs, never by touching .hidden.
    applying = true;
    try {
      if (window.AppTabs) {
        if (screen.kind === 'tab' && window.AppTabs.select) {
          window.AppTabs.select(screen.id);
        } else if (screen.kind === 'overlay' && window.AppTabs.showOverlay) {
          window.AppTabs.showOverlay(screen.panelId);
        }
      }
    } finally {
      applying = false;
    }

    updateBarState();

    if (screen.id !== 'premium') writeStore({ lastScreen: screen.id });

    var panel = panelOf(screen);

    // Canvases measured while hidden report a zero-size box, so charts and the
    // camera overlay must be redrawn once the panel is actually laid out.
    requestAnimationFrame(function () {
      if (window.AppTabs && window.AppTabs.redraw) {
        try { window.AppTabs.redraw(); } catch (e) { /* ignore */ }
      }
      if (typeof screen.onShow === 'function') {
        try { screen.onShow(panel); } catch (e) { /* ignore */ }
      }
    });

    if (opts.focus !== false) {
      var restore = null;
      if (opts.restoreFocus && focusReturn[from]) {
        var candidate = focusReturn[from];
        if (candidate && document.contains(candidate)) restore = candidate;
        focusReturn[from] = null;
      }
      var target = restore || (screen.kind === 'overlay' ? focusTargetFor(panel) : null);
      if (target) {
        requestAnimationFrame(function () {
          try { target.focus(); } catch (e) { /* ignore */ }
        });
      }
    }

    announce('Ekran: ' + screen.labelPL);
    emit('change', { from: from, to: screen.id });
  }

  function openSettingsCard() {
    var card = byId('settingsCard') || document.querySelector('details.settings-card');
    if (!card) return;
    card.open = true;
    var summary = card.querySelector('summary');
    requestAnimationFrame(function () {
      // scrollIntoView is missing in some embedded/headless runtimes, and the
      // options-object form is missing in older ones - neither may take the
      // settings card down with it.
      if (typeof card.scrollIntoView === 'function') {
        try {
          card.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
        } catch (e) {
          try { card.scrollIntoView(); } catch (e2) { /* ignore */ }
        }
      }
      if (summary && summary.focus) {
        try { summary.focus(); } catch (e3) { /* ignore */ }
      }
    });
  }

  function go(screenId, opts) {
    opts = opts || {};
    var screen = findScreen(screenId);
    if (!screen) return false;

    if (screen.kind === 'alias') {
      var target = findScreen(screen.target);
      if (!target) return false;
      // Aliases never take focus from the settings summary they open.
      navigate(target, { focus: false }, opts.replace ? 'replace' : 'push');
      openSettingsCard();
      announce('Ekran: ' + screen.labelPL);
      return true;
    }

    if (opts.from) focusReturn[screen.id] = opts.from;
    navigate(screen, opts, opts.replace ? 'replace' : 'push');
    return true;
  }

  function back() {
    if (!backStack.length) return false;

    // Prefer the real history entry so the Android back button and the in-app
    // "Wróć" button stay on the same stack.
    var canPop = !!(window.history && history.state &&
      typeof history.state.bmIndex === 'number' && history.state.bmIndex > 0);
    if (canPop) {
      try { history.back(); return true; } catch (e) { /* fall through */ }
    }

    var targetId = backStack.pop();
    var screen = findScreen(targetId) || findScreen('camera');
    navigate(screen, { focus: true, restoreFocus: true }, 'replace');
    return true;
  }

  function announce(messagePL) {
    if (!liveEl) liveEl = byId('navLive');
    if (!liveEl) return;
    // Re-announce the same text reliably by clearing first.
    liveEl.textContent = '';
    var text = String(messagePL || '');
    window.setTimeout(function () { liveEl.textContent = text; }, 30);
  }

  function setBadge(screenId, textPL) {
    var screen = findScreen(screenId);
    if (!screen) return;
    screen.badgePL = textPL || null;
    var el = screen.badgeId ? byId(screen.badgeId) : null;
    var btn = screen.btnId ? byId(screen.btnId) : null;
    if (el) {
      if (textPL) {
        el.textContent = textPL;
        el.hidden = false;
      } else {
        el.textContent = '';
        el.hidden = true;
      }
    }
    if (btn) {
      // The badge sits inside the button, so fold it into the accessible name.
      if (textPL) btn.setAttribute('aria-label', screen.labelPL + ' — ' + textPL);
      else btn.removeAttribute('aria-label');
    }
  }

  function register(screen) {
    if (!screen || !screen.id) return;
    var existing = findScreen(screen.id);
    if (existing) {
      for (var k in screen) {
        if (Object.prototype.hasOwnProperty.call(screen, k)) existing[k] = screen[k];
      }
    } else {
      SCREENS.push(screen);
    }
    if (inited) {
      buildBar();
      updateBarState();
      registerOverlays();
    }
  }

  function registerOverlays() {
    if (!window.AppTabs || !window.AppTabs.registerOverlay) return;
    for (var i = 0; i < SCREENS.length; i++) {
      var s = SCREENS[i];
      if (s.kind !== 'overlay' || !s.panelId) continue;
      if (!byId(s.panelId)) continue;
      try { window.AppTabs.registerOverlay(s.panelId); } catch (e) { /* ignore */ }
    }
  }

  /* ------------------------------------------------------------------
     Global wiring
     ------------------------------------------------------------------ */
  function wireGlobalHandlers() {
    // Any element opting in with data-nav-back becomes a back button. Screens
    // built by other files can opt in without menu.js knowing about them.
    document.addEventListener('click', function (ev) {
      var el = ev.target;
      while (el && el !== document.body) {
        if (el.nodeType === 1 && el.hasAttribute && el.hasAttribute('data-nav-back')) {
          ev.preventDefault();
          if (!back()) go('camera');
          return;
        }
        el = el.parentNode;
      }
    });

    // Escape leaves an overlay screen. Dialogs own their own Escape handling,
    // so we stay out of the way while one of them is open.
    document.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Escape' && ev.key !== 'Esc') return;
      // monetization-ui.js registers its dialog Escape handler at parse time,
      // i.e. BEFORE this one, and closes the dialog synchronously. By the time
      // we run, dialogIsOpen() is already false — so without this guard the
      // same key press would both close the dialog and leave the screen.
      if (ev.defaultPrevented) return;
      var screen = findScreen(currentId);
      if (!screen || screen.kind !== 'overlay') return;
      if (dialogIsOpen()) return;
      var layer = byId('mzLayer');
      if (layer && ev.target && layer.contains(ev.target)) return;
      ev.preventDefault();
      if (!back()) go('camera');
    });

    window.addEventListener('popstate', function (ev) {
      var st = ev.state;
      // Entries without our marker come from in-page anchors (documentation
      // table of contents) — leave those to the browser.
      if (!st || typeof st.bmScreen !== 'string') return;
      var screen = findScreen(st.bmScreen);
      if (!screen || screen.kind === 'alias') return;
      if (typeof st.bmIndex === 'number') navIndex = st.bmIndex;
      if (backStack.length && backStack[backStack.length - 1] === screen.id) backStack.pop();
      navigate(screen, { focus: true, restoreFocus: true }, 'history');
    });

    // The "i" button and the deep link still call app.js directly; mirror any
    // externally triggered panel change so the bar never lies about the screen.
    if (window.AppTabs && window.AppTabs.onChange) {
      window.AppTabs.onChange(function (payload) {
        if (applying || !payload) return;
        var id = null;
        for (var i = 0; i < SCREENS.length; i++) {
          var s = SCREENS[i];
          if (payload.kind === 'tab' && s.kind === 'tab' && s.id === payload.id) { id = s.id; break; }
          if (payload.kind === 'overlay' && s.kind === 'overlay' && s.panelId === payload.id) { id = s.id; break; }
        }
        if (!id || id === currentId) return;
        var screen = findScreen(id);
        if (!screen) return;
        if (currentId) pushBackStack(currentId);
        pushHistory(id, 'push');
        currentId = id;
        updateBarState();
        if (id !== 'premium') writeStore({ lastScreen: id });
        announce('Ekran: ' + screen.labelPL);
        emit('change', { from: null, to: id });
      });
    }

    var pill = byId('premiumPill');
    if (pill) {
      pill.addEventListener('click', function () {
        if (window.MonetizationUI && window.MonetizationUI.openPaywall) {
          window.MonetizationUI.openPaywall('header_pill', { returnFocusTo: pill });
        } else {
          go('premium', { from: pill });
        }
      });
    }

    // The short medical disclaimer under the gauges links to the full text.
    var discLink = byId('medicalDisclaimerLink');
    if (discLink) {
      discLink.addEventListener('click', function (ev) {
        ev.preventDefault();
        go('about', { from: discLink });
      });
    }

    if (window.Billing && window.Billing.on) {
      window.Billing.on('change', syncBilling);
      window.Billing.on('ready', syncBilling);
    }
  }

  function dialogIsOpen() {
    var layer = byId('mzLayer');
    if (!layer) return false;
    return !!layer.querySelector('.mz-dialog:not([hidden]), .mz-sheet:not([hidden])');
  }

  function syncBilling() {
    var B = window.Billing;
    if (!B || !B.getState) {
      setBadge('premium', null);
      updateUpsellCard();
      return;
    }
    var isTrial = false, isPremium = false, left = 0;
    try {
      isTrial = !!(B.isTrial && B.isTrial());
      isPremium = !!(B.isPremium && B.isPremium());
      left = B.daysLeftOfTrial ? B.daysLeftOfTrial() : 0;
    } catch (e) { /* keep the bar usable no matter what billing does */ }

    if (isTrial) setBadge('premium', daysWordPL(left));
    else if (isPremium) setBadge('premium', 'PRO');
    else setBadge('premium', null);

    updateUpsellCard();
  }

  /* ------------------------------------------------------------------
     init
     ------------------------------------------------------------------ */
  function init() {
    if (inited) return;
    inited = true;

    ensureShell();
    buildBar();
    buildMore();
    buildAbout();

    // Keep the legacy strip in the DOM (app.js still owns selectTab) but out
    // of sight and out of the accessibility tree.
    var legacy = byId('legacyTabs') || document.querySelector('.tabs');
    if (legacy) legacy.hidden = true;

    document.body.classList.add('has-bottom-nav');

    registerOverlays();
    wireGlobalHandlers();
    syncBilling();

    // Decide the starting screen. Deep links win, then the last screen used,
    // and the paywall is never restored — the app always opens on a
    // measurement screen.
    var start = 'camera';
    var deepDocs = location.search.indexOf('tab=methodology') !== -1;
    if (deepDocs) {
      start = 'docs';
    } else {
      var stored = readStore().lastScreen;
      var storedScreen = stored ? findScreen(stored) : null;
      if (storedScreen && storedScreen.kind !== 'alias' && storedScreen.id !== 'premium') {
        start = storedScreen.id;
      }
    }

    navIndex = 0;
    var startScreen = findScreen(start) || findScreen('camera');
    navigate(startScreen, { focus: false }, 'replace');

    emit('ready', { from: null, to: currentId });
  }

  /* ------------------------------------------------------------------
     Public API
     ------------------------------------------------------------------ */
  window.AppNav = {
    SCREENS: SCREENS,
    init: init,
    go: go,
    current: function () { return currentId; },
    back: back,
    register: register,
    setBadge: setBadge,
    announce: announce,
    on: function (event, cb) {
      if (!listeners[event] || typeof cb !== 'function') return;
      listeners[event].push(cb);
      // A listener attached after startup still deserves the 'ready' it missed.
      if (event === 'ready' && inited) {
        try { cb({ from: null, to: currentId }); } catch (e) { /* ignore */ }
      }
    },
    off: function (event, cb) {
      var list = listeners[event];
      if (!list) return;
      var i = list.indexOf(cb);
      if (i >= 0) list.splice(i, 1);
    }
  };

  NS.AppNav = window.AppNav;

  /* --- boot: app.js publishes AppTabs and then fires 'app:ready' --- */
  function boot() { init(); }
  if (window.AppTabs) boot();
  else document.addEventListener('app:ready', boot, { once: true });
})();
