/* Monitor Światła v4 — app.js
 *
 * ROLA PLIKU: powłoka i router. Ten plik nie wie, co jest w środku któregokolwiek
 * z czterech ekranów. Zna tylko ich rejestr: co się nazywa, jaką ma ikonę, jak
 * zbudować, jak wejść i jak wyjść. Z tego rejestru buduje górną belkę, dolną
 * nawigację (telefon, tablet) i boczną (desktop), po czym pilnuje, żeby dokładnie
 * jeden widok był aktywny.
 *
 * Router nie niszczy widoków. Każdy powstaje raz, przy starcie, a potem tylko
 * pokazuje się i chowa — dzięki temu wykres historii nie buduje się od nowa przy
 * każdym przejściu, a ekran pomiaru nie gubi wskaźnika. Cała praca w tle jest
 * odpinana w leave(): widok nieaktywny nie ma prawa słuchać próbek.
 *
 * Ten plik ładuje się ostatni, bo dopiero wtedy rejestr jest kompletny. Na końcu
 * bootstrapu leci Bus.emit('app:ready') — lepki, więc kto się spóźnił, i tak go złapie.
 *
 * Zero polskich literałów: każde słowo pochodzi z UI.T albo ze Scale.TEXT.
 */
(function (global) {
  'use strict';

  var doc = global.document;

  var DEFAULT_VIEW = 'measure';
  var DESKTOP_QUERY = '(min-width: 1024px)';
  var SVG_NS = 'http://www.w3.org/2000/svg';

  var views = [];              // kolejność rejestracji = kolejność w nawigacji
  var index = {};              // id -> wpis rejestru
  var currentId = null;
  var previousId = null;
  var pendingParams = null;
  var booted = false;

  var el = {};                 // węzły powłoki, złapane raz przy starcie
  var mqDesktop = null;

  /* ------------------------------------------------------------------
     Drobiazgi: teksty, ikony, węzły
     ------------------------------------------------------------------ */

  function node(id) { return doc ? doc.getElementById(id) : null; }

  /* Słownik polszczyzny leży w ui.js (UI.T) i w scale.js (Scale.TEXT).
     Brak klucza zwraca pusty napis, nigdy wyjątek — powłoka ma się zbudować
     nawet wtedy, gdy któryś plik nie doszedł. */
  function tr(path, dict) {
    var parts = String(path).split('.');
    var cur = dict;
    for (var i = 0; i < parts.length; i += 1) {
      if (!cur || typeof cur !== 'object') return '';
      cur = cur[parts[i]];
    }
    return typeof cur === 'string' ? cur : '';
  }

  function t(path) {
    return tr(path, (global.UI && global.UI.T) ? global.UI.T : null);
  }

  function ts(path) {
    return tr(path, (global.Scale && global.Scale.TEXT) ? global.Scale.TEXT : null);
  }

  function fill(template, map) {
    if (!template) return '';
    if (global.Scale && typeof global.Scale.fill === 'function') return global.Scale.fill(template, map);
    return template;
  }

  function icon(name, size) {
    if (global.UI && typeof global.UI.icon === 'function') {
      try { return global.UI.icon(name, size); } catch (_) { /* rysujemy zastępczy */ }
    }
    var svg = doc.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', String(size || 24));
    svg.setAttribute('height', String(size || 24));
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('class', 'is-hidden');
    return svg;
  }

  function make(tag, className, textContent) {
    var n = doc.createElement(tag);
    if (className) n.className = className;
    if (textContent) n.textContent = textContent;
    return n;
  }

  function labelOf(view) {
    return view.labelPL || t('nav.' + view.id) || view.id;
  }

  /* ------------------------------------------------------------------
     Rejestr widoków
     ------------------------------------------------------------------ */

  function registerView(def) {
    if (!def || typeof def.id !== 'string' || !def.id) return;
    if (index[def.id]) return;                       // druga rejestracja tego samego id jest błędem autora, nie stanem do obsługi
    var entry = {
      id: def.id,
      labelPL: typeof def.labelPL === 'string' ? def.labelPL : '',
      icon: typeof def.icon === 'string' ? def.icon : def.id,
      build: typeof def.build === 'function' ? def.build : null,
      enter: typeof def.enter === 'function' ? def.enter : null,
      leave: typeof def.leave === 'function' ? def.leave : null,
      desktopOnly: !!def.desktopOnly,
      section: null,
      inner: null,
      tab: null,
      side: null,
      built: false
    };
    views.push(entry);
    index[entry.id] = entry;
    // Rejestracja po starcie (np. widok dołożony później) domawia swoją część
    // powłoki, zamiast czekać na przeładowanie strony.
    if (booted) {
      buildSection(entry);
      buildNav();
      applyBreakpoint();
    }
  }

  /* ------------------------------------------------------------------
     Budowa: sekcje widoków
     ------------------------------------------------------------------ */

  function buildSection(entry) {
    if (!el.viewRoot || entry.section) return;
    var section = make('section', 'ms4-view');
    section.id = 'view-' + entry.id;
    section.setAttribute('data-view', entry.id);
    section.setAttribute('role', 'tabpanel');
    section.setAttribute('aria-labelledby', 'tab-' + entry.id);
    var inner = make('div', 'ms4-view__inner');
    section.appendChild(inner);
    el.viewRoot.appendChild(section);
    entry.section = section;
    entry.inner = inner;

    if (entry.build && !entry.built) {
      entry.built = true;
      try {
        entry.build(inner);
      } catch (err) {
        // Jeden zepsuty ekran nie może zabrać pozostałych trzech.
        if (global.console && console.error) console.error('app.js: build("' + entry.id + '")', err);
      }
    }
  }

  /* ------------------------------------------------------------------
     Budowa: nawigacja dolna i boczna
     ------------------------------------------------------------------ */

  function buildNav() {
    buildTabbar();
    buildSidenav();
    paintNavState();
  }

  function buildTabbar() {
    if (!el.tabBar) return;
    el.tabBar.textContent = '';
    el.tabBar.setAttribute('role', 'tablist');
    el.tabBar.setAttribute('aria-label', t('aria.tabbar') || t('nav.aria'));
    for (var i = 0; i < views.length; i += 1) {
      var v = views[i];
      var btn = make('button', 'ms4-tabbar__item');
      btn.type = 'button';
      btn.id = 'tab-' + v.id;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-controls', 'view-' + v.id);
      btn.setAttribute('aria-selected', 'false');
      btn.setAttribute('tabindex', '-1');
      btn.setAttribute('data-view', v.id);
      btn.appendChild(make('span', 'ms4-tabbar__indicator'));
      var ic = icon(v.icon, 24);
      ic.setAttribute('class', 'ms4-tabbar__icon');
      btn.appendChild(ic);
      btn.appendChild(make('span', 'ms4-tabbar__label', labelOf(v)));
      btn.addEventListener('click', onNavClick);
      btn.addEventListener('keydown', onNavKeydown);
      el.tabBar.appendChild(btn);
      v.tab = btn;
    }
  }

  function buildSidenav() {
    if (!el.sideNav) return;
    el.sideNav.textContent = '';
    // Atrybut hidden w index.html chroni przed mignięciem nawigacji na telefonie,
    // zanim CSS zdąży ją schować. Od tego momentu decyduje wyłącznie CSS.
    el.sideNav.hidden = false;

    var brand = make('div', 'ms4-sidenav__brand');
    var logo = icon('logo', 28);
    logo.setAttribute('class', 'ms4-sidenav__icon');
    brand.appendChild(logo);
    brand.appendChild(make('span', 'ms4-sidenav__label', t('nav.brand') || ts('app.title')));
    el.sideNav.appendChild(brand);

    var list = make('div', 'ms4-sidenav__list');
    list.setAttribute('role', 'tablist');
    list.setAttribute('aria-orientation', 'vertical');
    list.setAttribute('aria-label', t('aria.tabbar') || t('nav.aria'));
    for (var i = 0; i < views.length; i += 1) {
      var v = views[i];
      var btn = make('button', 'ms4-sidenav__item');
      btn.type = 'button';
      btn.id = 'nav-' + v.id;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-controls', 'view-' + v.id);
      btn.setAttribute('aria-selected', 'false');
      btn.setAttribute('tabindex', '-1');
      btn.setAttribute('data-view', v.id);
      var ic = icon(v.icon, 24);
      ic.setAttribute('class', 'ms4-sidenav__icon');
      btn.appendChild(ic);
      btn.appendChild(make('span', 'ms4-sidenav__label', labelOf(v)));
      btn.addEventListener('click', onNavClick);
      btn.addEventListener('keydown', onNavKeydown);
      list.appendChild(btn);
      v.side = btn;
    }
    el.sideNav.appendChild(list);

    el.sideFoot = make('div', 'ms4-sidenav__foot');
    el.sideFootVersion = make('span', 'ms4-sidenav__label', t('nav.version'));
    el.sideFoot.appendChild(el.sideFootVersion);
    el.sideNav.appendChild(el.sideFoot);
  }

  function onNavClick(event) {
    var id = event.currentTarget.getAttribute('data-view');
    if (id) go(id);
  }

  /* Strzałki krążą po zakładkach: lewo/prawo w dolnej nawigacji, góra/dół
     w bocznej, Home i End skaczą na skraje. Wybór aktywuje się od razu —
     zakładek jest cztery i każda jest tanim pokazaniem gotowej sekcji. */
  function onNavKeydown(event) {
    var key = event.key;
    var horizontal = event.currentTarget.classList.contains('ms4-tabbar__item');
    var forward = horizontal ? 'ArrowRight' : 'ArrowDown';
    var back = horizontal ? 'ArrowLeft' : 'ArrowUp';
    var visible = visibleViews();
    if (!visible.length) return;
    var here = 0, i;
    for (i = 0; i < visible.length; i += 1) {
      if (visible[i].id === event.currentTarget.getAttribute('data-view')) { here = i; break; }
    }
    var next = -1;
    if (key === forward) next = (here + 1) % visible.length;
    else if (key === back) next = (here - 1 + visible.length) % visible.length;
    else if (key === 'Home') next = 0;
    else if (key === 'End') next = visible.length - 1;
    if (next < 0) return;
    event.preventDefault();
    var target = visible[next];
    go(target.id);
    var focusOn = horizontal ? target.tab : target.side;
    if (focusOn) focusOn.focus();
  }

  function visibleViews() {
    var out = [];
    for (var i = 0; i < views.length; i += 1) {
      if (views[i].desktopOnly && !isDesktop()) continue;
      out.push(views[i]);
    }
    return out;
  }

  function paintNavState() {
    for (var i = 0; i < views.length; i += 1) {
      var v = views[i];
      var active = v.id === currentId;
      paintNavItem(v.tab, active);
      paintNavItem(v.side, active);
    }
  }

  function paintNavItem(btn, active) {
    if (!btn) return;
    if (active) {
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      btn.setAttribute('aria-current', 'page');
      btn.setAttribute('tabindex', '0');
    } else {
      btn.classList.remove('is-active');
      btn.setAttribute('aria-selected', 'false');
      btn.removeAttribute('aria-current');
      btn.setAttribute('tabindex', '-1');
    }
  }

  /* ------------------------------------------------------------------
     Górna belka
     ------------------------------------------------------------------ */

  /* Prawa strona belki, ekran po ekranie (rozdział 4.5 SPEC.md). Przycisk
     ogłasza zamiar magistralą; jeśli nikt go nie obsłuży, powłoka robi rzecz
     najbliższą sensowi — nigdy nie zostawiamy martwego przycisku. */
  var TOP_ACTIONS = {
    measure: { icon: 'help', labelPath: 'measure.helpAria', action: 'help' },
    history: { icon: 'export', labelPath: 'tools.export', action: 'export' },
    support: { icon: 'settings', labelPath: 'support.settingsTitle', action: 'settings' }
  };

  function paintTopbar() {
    if (!el.topBarTitle) return;
    var v = index[currentId];
    el.topBarTitle.textContent = v ? labelOf(v) : '';

    if (el.topBarStatus) el.topBarStatus.hidden = currentId !== 'measure';

    if (!el.topBarActions) return;
    el.topBarActions.textContent = '';

    var spec = TOP_ACTIONS[currentId];
    if (spec) el.topBarActions.appendChild(buildTopButton(spec));
  }

  function buildTopButton(spec) {
    var btn = make('button', 'ms4-topbar__btn');
    btn.type = 'button';
    btn.setAttribute('aria-label', t(spec.labelPath));
    btn.appendChild(icon(spec.icon, 24));
    btn.addEventListener('click', function () { runTopAction(spec.action); });
    return btn;
  }

  /* Zamiar z belki najpierw idzie do ekranu, który wie, jak go spełnić
     (ustawia payload.handled = true). Zapasowe zachowanie jest zgrubne,
     ale prawdziwe: prowadzi tam, gdzie ta czynność mieszka. */
  function runTopAction(action) {
    var payload = { view: currentId, action: action, handled: false };
    if (global.Bus && typeof global.Bus.emit === 'function') global.Bus.emit('view:action', payload);
    if (payload.handled) return;

    var tools = global.Tools;
    if (action === 'help') {
      if (tools && typeof tools.openDocs === 'function') tools.openDocs();
      else go('tools');
      return;
    }
    if (action === 'export') {
      if (tools && typeof tools.openExport === 'function') tools.openExport();
      else go('tools');
      return;
    }
    if (action === 'settings') scrollToSettings();
  }

  /* Ekran WSPARCIE nie oznacza sekcji ustawień własnym atrybutem, więc szukamy jej
     po tytule ze słownika — nie po literale, którego w tym pliku nie ma. */
  function scrollToSettings() {
    var v = index.support;
    if (!v || !v.inner) return;
    var target = v.inner.querySelector('[data-section="settings"]');
    if (!target) {
      var wanted = t('support.settingsTitle');
      var titles = v.inner.querySelectorAll('.ms4-section__title');
      for (var i = 0; wanted && i < titles.length; i += 1) {
        if (titles[i].textContent === wanted) { target = titles[i]; break; }
      }
    }
    var top;
    if (target && target.getBoundingClientRect) {
      top = target.getBoundingClientRect().top + (global.pageYOffset || 0) - 72;
    } else {
      top = doc.body.scrollHeight;
    }
    try { global.scrollTo({ top: top, behavior: reducedMotion() ? 'auto' : 'smooth' }); }
    catch (_) { global.scrollTo(0, top); }
  }

  /* ------------------------------------------------------------------
     Wskaźnik stanu silnika i zegar sesji
     ------------------------------------------------------------------ */

  var statusDot = null;
  var statusText = null;
  var statusDotMod = '';
  var clockTimer = null;

  function buildStatus() {
    if (!el.topBarStatus) return;
    el.topBarStatus.textContent = '';
    statusDot = make('span', 'ms4-topbar__dot ms4-topbar__dot--idle');
    statusDotMod = 'idle';
    statusText = make('span', null, '');
    el.topBarStatus.appendChild(statusDot);
    el.topBarStatus.appendChild(statusText);
  }

  function paintStatus() {
    if (!statusDot || !statusText) return;
    var state = (global.Engine && typeof global.Engine.state === 'function') ? global.Engine.state() : 'idle';
    var mod = 'idle';
    var label = ts('state.idle');
    if (state === 'starting') {
      mod = 'run';
      label = ts('state.starting');
    } else if (state === 'running') {
      mod = 'run';
      var session = global.Engine.session();
      label = (global.Scale && typeof global.Scale.railRunning === 'function')
        ? global.Scale.railRunning(session ? session.durationMs : 0)
        : ts('state.running');
    } else if (state === 'error') {
      mod = 'crit';
      label = ts('state.error');
    }
    if (mod !== statusDotMod) {
      statusDot.className = 'ms4-topbar__dot ms4-topbar__dot--' + mod;
      statusDotMod = mod;
    }
    if (statusText.textContent !== label) statusText.textContent = label;
  }

  /* Zegar chodzi raz na sekundę i tylko w trakcie pomiaru. Wieszanie go na
     engine:sample dałoby pięć przepisań tego samego napisu na sekundę. */
  function startClock() {
    if (clockTimer) return;
    clockTimer = global.setInterval(function () {
      if (global.Engine && global.Engine.isRunning && global.Engine.isRunning()) paintStatus();
    }, 1000);
  }

  /* ------------------------------------------------------------------
     Routing
     ------------------------------------------------------------------ */

  function hashId() {
    var raw = String(global.location.hash || '').replace(/^#/, '');
    var m = /^\/?([A-Za-z0-9_-]+)/.exec(raw);
    return m ? m[1] : '';
  }

  function validId(id) {
    if (!id || !index[id]) return DEFAULT_VIEW;
    if (index[id].desktopOnly && !isDesktop()) return DEFAULT_VIEW;
    return id;
  }

  function go(id, opts) {
    var target = validId(id);
    pendingParams = (opts && opts.params) ? opts.params : null;
    var wanted = '#/' + target;
    if (String(global.location.hash) !== wanted) {
      // Zmiana hasha sama wywoła hashchange, a ten aktywuje widok — jedno
      // wejście do aktywacji zamiast dwóch ścieżek, które mogłyby się rozjechać.
      global.location.hash = wanted;
      return target;
    }
    activate(target);
    return target;
  }

  function activate(id) {
    var next = index[id];
    if (!next) return;
    if (currentId === id) {
      // Powtórne wejście na ten sam ekran nie przebudowuje niczego, ale pozwala
      // podać nowe parametry (np. „pokaż tę wielkość”).
      if (pendingParams && next.enter) safeEnter(next);
      return;
    }

    var prev = index[currentId];
    if (prev) {
      if (prev.section) prev.section.classList.remove('is-active');
      if (prev.leave) {
        try { prev.leave(); }
        catch (err) { if (global.console && console.error) console.error('app.js: leave("' + prev.id + '")', err); }
      }
      previousId = prev.id;
    }

    currentId = id;
    if (next.section) next.section.classList.add('is-active');
    paintNavState();
    paintTopbar();
    paintStatus();
    global.scrollTo(0, 0);

    safeEnter(next);

    announce(fill(t('aria.viewTpl'), { name: labelOf(next) }));
    if (global.Bus && typeof global.Bus.emit === 'function') global.Bus.emit('view:changed', { id: id });
  }

  function safeEnter(entry) {
    var p = pendingParams;
    pendingParams = null;
    if (!entry.enter) return;
    try { entry.enter(p); }
    catch (err) { if (global.console && console.error) console.error('app.js: enter("' + entry.id + '")', err); }
  }

  function onHashChange() {
    var id = hashId();
    var valid = validId(id);
    if (valid !== id) {
      // Nieznany albo niedostępny adres podmieniamy bez zostawiania śladu
      // w historii — inaczej „wstecz” wracałoby do adresu, którego nie ma.
      global.location.replace(hashless() + '#/' + valid);
      return;
    }
    activate(valid);
  }

  function hashless() {
    return global.location.pathname + global.location.search;
  }

  /* ------------------------------------------------------------------
     Warstwy modalne a przycisk „wstecz”
     ------------------------------------------------------------------ */

  var pushedLayers = 0;
  var expectedPops = 0;

  function layerCount() {
    var n = 0;
    if (el.sheetHost) n += el.sheetHost.childElementCount;
    if (el.dialogHost) n += el.dialogHost.childElementCount;
    return n;
  }

  /* Każdy otwarty arkusz dostaje własny wpis w historii. Dzięki temu systemowy
     gest „wstecz” zamyka arkusz, zamiast wyrzucać z aplikacji — a zamknięcie
     arkusza krzyżykiem sprząta ten wpis, żeby historia nie puchła. */
  function syncLayers() {
    var n = layerCount();
    if (n === pushedLayers) return;
    if (n > pushedLayers) {
      for (var i = pushedLayers; i < n; i += 1) {
        try { global.history.pushState({ ms4Layer: true }, ''); } catch (_) { return; }
      }
      pushedLayers = n;
      return;
    }
    var diff = pushedLayers - n;
    pushedLayers = n;
    expectedPops += 1;
    try { global.history.go(-diff); } catch (_) { expectedPops -= 1; }
  }

  function onPopState() {
    if (expectedPops > 0) { expectedPops -= 1; return; }
    if (layerCount() > 0) {
      pushedLayers = pushedLayers > 0 ? pushedLayers - 1 : 0;
      closeTopLayer();
    }
  }

  /* Zamykanie należy do ui.js, więc powłoka nie sięga do środka arkusza —
     wysyła Escape, czyli dokładnie to, co robi klawiatura. */
  function closeTopLayer() {
    var host = (el.dialogHost && el.dialogHost.childElementCount) ? el.dialogHost : el.sheetHost;
    if (!host || !host.lastElementChild) return;
    var target = host.lastElementChild;
    var ev;
    try {
      ev = new global.KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true, cancelable: true });
    } catch (_) {
      ev = doc.createEvent('Event');
      ev.initEvent('keydown', true, true);
      ev.key = 'Escape';
    }
    target.dispatchEvent(ev);
  }

  function watchLayers() {
    if (!global.MutationObserver) return;
    var observer = new global.MutationObserver(syncLayers);
    if (el.sheetHost) observer.observe(el.sheetHost, { childList: true });
    if (el.dialogHost) observer.observe(el.dialogHost, { childList: true });
  }

  /* ------------------------------------------------------------------
     Klawiatura: spacja startuje i zatrzymuje pomiar
     ------------------------------------------------------------------ */

  var TYPING = { INPUT: 1, TEXTAREA: 1, SELECT: 1, OPTION: 1 };
  var ACTIVATABLE = 'button, a[href], summary, input, select, textarea, [role="button"], [role="tab"], [role="switch"], [role="slider"], [role="checkbox"], [role="radio"], [contenteditable]';

  function onKeyDown(event) {
    if (event.key !== ' ' && event.key !== 'Spacebar' && event.code !== 'Space') return;
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.defaultPrevented) return;
    if (layerCount() > 0) return;                 // w arkuszu spacja należy do arkusza

    var target = event.target;
    if (target) {
      if (TYPING[target.tagName]) return;
      if (target.isContentEditable) return;
      // Na przycisku spacja jest naturalnym sposobem naciśnięcia go i nie wolno
      // jej przechwycić — inaczej „Zapisz” zaczyna włączać kamerę.
      if (target.closest && target.closest(ACTIVATABLE)) return;
    }
    if (!global.Engine || typeof global.Engine.toggle !== 'function') return;
    event.preventDefault();
    global.Engine.toggle();
  }

  /* ------------------------------------------------------------------
     Punkt łamania i drobiazgi powiązane z układem
     ------------------------------------------------------------------ */

  function isDesktop() {
    return !!(mqDesktop && mqDesktop.matches);
  }

  function reducedMotion() {
    var el2 = doc.documentElement;
    if (el2 && el2.getAttribute('data-motion') === 'reduced') return true;
    try { return !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches); }
    catch (_) { return false; }
  }

  function applyBreakpoint() {
    for (var i = 0; i < views.length; i += 1) {
      var v = views[i];
      var hide = !!(v.desktopOnly && !isDesktop());
      if (v.tab) v.tab.classList.toggle('is-hidden', hide);
      if (v.side) v.side.classList.toggle('is-hidden', hide);
    }
    // Widok tylko dla desktopu przestaje istnieć razem z szerokim ekranem.
    if (currentId && index[currentId] && index[currentId].desktopOnly && !isDesktop()) go(DEFAULT_VIEW);
  }

  function announce(textPL) {
    if (!textPL) return;
    if (global.UI && typeof global.UI.announce === 'function') {
      try { global.UI.announce(textPL); } catch (_) { /* komunikat nie jest wart wyjątku */ }
    }
  }

  function toast(textPL, tone) {
    if (!textPL) return;
    if (global.UI && typeof global.UI.toast === 'function') {
      try { global.UI.toast(textPL, tone); } catch (_) { /* jw. */ }
    }
  }

  /* ------------------------------------------------------------------
     Cień pod górną belką
     ------------------------------------------------------------------ */

  var scrollQueued = false;

  function onScroll() {
    if (scrollQueued) return;
    scrollQueued = true;
    global.requestAnimationFrame(function () {
      scrollQueued = false;
      if (!el.topBar) return;
      el.topBar.classList.toggle('is-scrolled', (global.pageYOffset || doc.documentElement.scrollTop || 0) > 8);
    });
  }

  /* ------------------------------------------------------------------
     Service worker
     ------------------------------------------------------------------ */

  var updateOffered = false;

  function registerWorker() {
    var nav = global.navigator;
    if (!nav || !('serviceWorker' in nav)) return;
    var proto = global.location.protocol;
    if (proto !== 'https:' && proto !== 'http:') return;     // file:// nie obsługuje workerów

    nav.serviceWorker.register('sw.js', { scope: './' }).then(function (reg) {
      if (!reg) return;
      if (reg.waiting) offerUpdate(reg);
      reg.addEventListener('updatefound', function () {
        var installing = reg.installing;
        if (!installing) return;
        installing.addEventListener('statechange', function () {
          // Obecny controller znaczy, że to podmiana, a nie pierwsza instalacja.
          if (installing.state === 'installed' && nav.serviceWorker.controller) offerUpdate(reg);
        });
      });
    }).catch(function () {
      // Zostaje tryb bez pamięci podręcznej. Aplikacja działa tak samo,
      // więc nie ma o czym zawiadamiać.
    });
  }

  /* Nowa wersja nigdy nie wchodzi sama: przeładowanie w trakcie pomiaru
     wyrzuciłoby sesję. W trakcie pomiaru mówimy o niej tylko toastem,
     a pytamy dopiero po jego zakończeniu. */
  function offerUpdate(reg) {
    if (updateOffered) return;
    updateOffered = true;
    var ask = function () {
      if (!global.UI || typeof global.UI.dialog !== 'function') {
        toast(ts('transient.newVersion'), 'info');
        return;
      }
      global.UI.dialog({
        title: ts('app.title'),
        text: ts('transient.newVersion'),
        confirm: ts('transient.newVersionKey'),
        cancel: t('confirm.close')
      }).then(function (ok) {
        if (!ok) return;
        if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        global.location.reload();
      });
    };
    if (global.Engine && global.Engine.isRunning && global.Engine.isRunning()) {
      toast(ts('transient.newVersion'), 'info');
      if (global.Bus) global.Bus.once('engine:stopped', function () { global.setTimeout(ask, 600); });
      return;
    }
    ask();
  }

  /* ------------------------------------------------------------------
     Start
     ------------------------------------------------------------------ */

  /* Ekrany ładują się PRZED tym plikiem (rozdział 0.2), więc w chwili ich
     wykonania prawdziwego App jeszcze nie ma. Odkładają się do wspólnej kolejki
     window.__ms4PendingViews (pierwszy z nich stawia też atrapę App, która do
     tej kolejki pisze). Tu ją opróżniamy — w kolejności skryptów, czyli w tej,
     w której mają stanąć w nawigacji. */
  function drainPending() {
    var q = global.__ms4PendingViews;
    if (!q || !q.length) return;
    var pending = q.splice(0, q.length);
    for (var i = 0; i < pending.length; i += 1) registerView(pending[i]);
  }

  /* Sprzątanie po modelu subskrypcyjnym. Wersja 4 trzymała w pamięci przeglądarki
     dwa klucze, które dziś nie znaczą nic: symulowane konto i symulowane
     uprawnienie do płatnych wielkości. Kasujemy je raz, przy starcie, żeby nie
     zostawały w niczyjej przeglądarce w nieskończoność.
     WYŁĄCZNIE te dwa — pomiary, historia, progi i ustawienia są nietykalne. */
  var STALE_KEYS = ['ms4.account.v1', 'ms4.entitlement.v1'];

  function dropStaleKeys() {
    try {
      if (!global.localStorage) return;
      for (var i = 0; i < STALE_KEYS.length; i += 1) global.localStorage.removeItem(STALE_KEYS[i]);
    } catch (_) { /* tryb prywatny rzuca wyjątkiem nawet przy kasowaniu */ }
  }

  function boot() {
    if (booted) return;
    dropStaleKeys();
    drainPending();

    el.appRoot = node('appRoot');
    el.sideNav = node('sideNav');
    el.topBar = node('topBar');
    el.topBarTitle = node('topBarTitle');
    el.topBarStatus = node('topBarStatus');
    el.topBarActions = node('topBarActions');
    el.viewRoot = node('viewRoot');
    el.tabBar = node('tabBar');
    el.sheetHost = node('sheetHost');
    el.dialogHost = node('dialogHost');

    try { mqDesktop = global.matchMedia(DESKTOP_QUERY); } catch (_) { mqDesktop = null; }

    for (var i = 0; i < views.length; i += 1) buildSection(views[i]);
    buildNav();
    buildStatus();

    if (mqDesktop) {
      if (mqDesktop.addEventListener) mqDesktop.addEventListener('change', applyBreakpoint);
      else if (mqDesktop.addListener) mqDesktop.addListener(applyBreakpoint);
    }
    applyBreakpoint();

    global.addEventListener('hashchange', onHashChange);
    global.addEventListener('popstate', onPopState);
    global.addEventListener('scroll', onScroll, { passive: true });
    doc.addEventListener('keydown', onKeyDown);
    watchLayers();

    if (global.Bus) {
      global.Bus.on('engine:state', paintStatus);
      global.Bus.on('engine:started', paintStatus);
      global.Bus.on('engine:stopped', paintStatus);
      global.Bus.on('engine:error', paintStatus);
    }

    startClock();
    onScroll();

    // Pierwsze wejście: adres z paska ma pierwszeństwo, byle był jednym z czterech.
    var wanted = hashId();
    var valid = validId(wanted);
    if (valid !== wanted) global.location.replace(hashless() + '#/' + valid);
    activate(valid);

    booted = true;

    if (global.Store && typeof global.Store.persistent === 'function' && !global.Store.persistent()) {
      // Raz na sesję, nie przy każdym zapisie — obietnica trwałości jest tu fałszywa.
      toast(t('error.storageBlocked'), 'warn');
    }

    registerWorker();

    if (global.Bus && typeof global.Bus.emit === 'function') global.Bus.emit('app:ready', {});
  }

  /* ------------------------------------------------------------------
     API
     ------------------------------------------------------------------ */

  global.App = {
    registerView: registerView,
    go: go,
    back: function () {
      return go(previousId && index[previousId] ? previousId : DEFAULT_VIEW);
    },
    current: function () { return currentId; },
    ready: function () { return booted; }
  };

  // Od tej chwili App istnieje naprawdę: kolejka może się opróżnić, a ekran,
  // który czeka na przypisanie window.App (setter w screen-history.js),
  // zarejestruje się sam, jeszcze zanim ruszy boot().
  drainPending();

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot);
  else boot();

}(typeof window !== 'undefined' ? window : globalThis));
