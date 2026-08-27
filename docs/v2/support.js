/* Monitor Światła v2 — warstwa wsparcia (dobrowolna darowizna).
 *
 * This is the whole money-adjacent surface of the application, and it is
 * deliberately one small file. There is no account, no store, no entitlement
 * and no advertising layer any more: every one of the seven metrics, the whole
 * history, all seven tools and the offline mode work for everybody, always,
 * with no condition attached. Nothing in this file can gate a feature, because
 * this file exposes nothing a feature could ask.
 *
 * It owns exactly two things:
 *   1. the "Wsparcie" screen (#panelSupport) — four short blocks and, when an
 *      address is configured, one outgoing link;
 *   2. a one-off clean-up of the localStorage keys the removed modules used to
 *      write. Measurements, thresholds, profiles and settings are never touched.
 *
 * No network of any kind. The donation service's own widget would fetch a
 * script from its servers on every launch, which would break both the offline
 * mode and the promise this application makes on every screen; the cup icon is
 * therefore drawn locally, in styles.css, exactly like every other icon here.
 *
 * Interface strings are Polish; code comments are English. Project rule.
 */
(function (global) {
  'use strict';

  /* ---------------------------------------------------------------------
     TU WPISZ ADRES SWOJEGO PROFILU DAROWIZN.
     Przykłady: 'https://buymeacoffee.com/twojanazwa'
                'https://ko-fi.com/twojanazwa'
                'https://paypal.me/twojanazwa'
     Dopóki tu pusto, aplikacja nie pokazuje martwego przycisku — patrz niżej.
     --------------------------------------------------------------------- */
  var SUPPORT_URL = '';

  var doc = global.document;

  /* ------------------------------------------------------------------
     Address validation — one line, and it earns its keep
     ------------------------------------------------------------------
     Only https: is accepted. A typo in the scheme, an http: address or a
     pasted `javascript:` URL all resolve to "no address configured", which is
     a state the screen already renders correctly. There is no third case.
     ------------------------------------------------------------------ */

  function supportUrl() {
    var raw = typeof SUPPORT_URL === 'string' ? SUPPORT_URL.trim() : '';
    if (!raw) return '';
    try {
      var u = new global.URL(raw);
      return u.protocol === 'https:' ? u.href : '';
    } catch (e) {
      return '';
    }
  }

  /* ------------------------------------------------------------------
     Plumbing — every neighbour is optional
     ------------------------------------------------------------------ */

  function ui() { return global.UI || null; }

  function on(name, cb) {
    var b = global.Bus;
    if (b && typeof b.on === 'function') b.on(name, cb);
  }

  function mk(tag, className, text) {
    var node = doc.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function icon(name, size) {
    var u = ui();
    if (u && typeof u.icon === 'function') return u.icon(name, size);
    var span = mk('span', 'ms-icon ms-icon--' + name + (size ? ' ms-icon--' + size : ''));
    span.setAttribute('aria-hidden', 'true');
    return span;
  }

  function clear(node) {
    if (!node) return;
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  /* ------------------------------------------------------------------
     Clean-up after the removed modules
     ------------------------------------------------------------------
     A device that ran an earlier build still carries those keys. They are dead
     weight and, worse, they are a record of a simulated transaction that no
     longer means anything, so they go on the first launch of this version.
     The list is explicit: no prefix sweep, because ms2.history, ms2.settings,
     ms2.thresholds and ms2.profiles share that prefix and must survive.
     ------------------------------------------------------------------ */

  var LEGACY_KEYS = [
    'ms2.billing.v1',
    'ms2.account.v1',
    'ms2.cloud.v1',
    'ms2.ads.v1',
    'ms2.tour.v1'
  ];

  function forgetLegacy() {
    for (var i = 0; i < LEGACY_KEYS.length; i += 1) {
      try { global.localStorage.removeItem(LEGACY_KEYS[i]); } catch (e) { /* private mode */ }
    }
  }

  /* ------------------------------------------------------------------
     The screen
     ------------------------------------------------------------------ */

  function card(titlePL, textPL) {
    var box = mk('div', 'ms-card ms-card--flat');
    box.appendChild(mk('h3', 'ms-card__title', titlePL));
    box.appendChild(mk('p', 'ms-t-body', textPL));
    return box;
  }

  function buildSupportScreen() {
    var panel = doc.getElementById('panelSupport');
    if (!panel) return;
    var host = panel.querySelector('.ms-main__inner') || panel;
    clear(host);

    var section = mk('section', 'ms-section');
    section.id = 'supportBody';

    /* --- 1. what the application gives, unconditionally --- */
    var hero = mk('div', 'ms-card ms-card--hero');
    var heroHead = mk('div', 'ms-card__head');
    var heroIcon = mk('span', 'ms-list__icon ms-list__icon--support');
    heroIcon.appendChild(icon('cup'));
    heroHead.appendChild(heroIcon);
    heroHead.appendChild(mk('h2', 'ms-card__title', 'Wszystko jest dostępne'));
    hero.appendChild(heroHead);
    hero.appendChild(mk('p', 'ms-card__sub',
      'Wszystkie siedem wskaźników, historia pomiarów, wykres, wszystkie narzędzia ' +
      'i tryb offline działają dla każdego, od razu. Bez konta, bez limitów i bez opłat.'));
    section.appendChild(hero);

    /* --- 2. why the app asks at all --- */
    section.appendChild(card('Dlaczego o to proszę',
      'Monitor Światła powstaje po godzinach i nie zarabia na nikim: nie ma reklam, ' +
      'nie zbiera danych i nie ma czego sprzedać. Utrzymanie i dalszy rozwój — nowe ' +
      'wskaźniki, poprawki, testy na kolejnych telefonach — kosztują czas. Jeżeli ' +
      'aplikacja Ci się przydała, możesz się dorzucić. Nie musisz.'));

    /* --- 3. the sentence that has to be said in so many words --- */
    section.appendChild(card('Co daje darowizna',
      'Nic. Naprawdę nic nie odblokowuje i niczego nie przyspiesza — aplikacja ' +
      'wygląda i działa dokładnie tak samo przed nią i po niej. Daje tylko tyle, ' +
      'że autor wie, że ta praca komuś się przydała.'));

    /* --- 4. the button, or an honest note in its place --- */
    var url = supportUrl();
    var actions = mk('div', 'ms-card');

    if (url) {
      var link = mk('a', 'ms-btn ms-btn--support ms-btn--block');
      link.id = 'supportLink';
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.appendChild(icon('cup', 'sm'));
      link.appendChild(mk('span', 'ms-btn__label', 'Postaw mi kawę'));
      actions.appendChild(link);
    } else {
      /* An address that is not configured yet is not an error and not a bug
         report: the screen stays whole, and the one thing that cannot honestly
         be rendered — a link to nowhere — simply is not rendered. */
      var pending = mk('div', 'ms-note ms-note--info');
      pending.id = 'supportPending';
      pending.appendChild(icon('info'));
      var pendingText = mk('div', 'ms-note__text');
      pendingText.appendChild(mk('span', 'ms-note__title', 'Profil nie jest jeszcze podłączony'));
      pendingText.appendChild(mk('span', null,
        'Nie ma tu jeszcze adresu, pod który można przesłać wsparcie. ' +
        'Pojawi się w tym miejscu, kiedy będzie gotowy — do tego czasu ' +
        'wszystko w aplikacji działa dokładnie tak samo.'));
      pending.appendChild(pendingText);
      actions.appendChild(pending);
    }

    /* Obligatory, and it sits with the button rather than in a footer: this is
       the single moment in the whole application when anything leaves the
       device, and a program that repeats "pomiar zostaje u Ciebie" on every
       screen owes the user that sentence exactly here. */
    var privacy = mk('p', 'ms-t-cap ms-t-muted');
    privacy.id = 'supportPrivacy';
    privacy.textContent = url
      ? 'Przycisk otwiera zewnętrzną stronę (na przykład Buy Me a Coffee) w nowej karcie. ' +
        'To jedyny moment, w którym cokolwiek opuszcza to urządzenie — i dzieje ' +
        'się dopiero po Twoim kliknięciu. Pomiary, historia i ustawienia zostają tutaj.'
      : 'Kiedy adres się pojawi, kliknięcie otworzy zewnętrzną stronę w nowej karcie. ' +
        'Będzie to jedyny moment, w którym cokolwiek opuszcza to urządzenie. ' +
        'Pomiary, historia i ustawienia zostają tutaj.';
    actions.appendChild(privacy);

    section.appendChild(actions);
    host.appendChild(section);
  }

  /* ------------------------------------------------------------------
     Wiring
     ------------------------------------------------------------------ */

  function init() {
    forgetLegacy();
    buildSupportScreen();
  }

  on('app:ready', init);

  var Support = {
    /* Read-only, and the empty string is a legitimate answer. Nothing in the
       application branches on it except this file's own screen. */
    url: supportUrl,
    isConfigured: function () { return supportUrl() !== ''; },
    render: buildSupportScreen
  };

  global.Support = Support;

}(typeof window !== 'undefined' ? window : globalThis));
