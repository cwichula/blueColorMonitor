/* =====================================================================
   support.js — cała warstwa dobrowolnego wsparcia w tej wersji.

   To jedyny plik, który wie cokolwiek o darowiznach. Buduje ekran
   „Wsparcie” (#panelSupport); wejście do niego daje dolny pasek nawigacji
   z menu.js. Nic tu nie odblokowuje żadnej funkcji, bo w tej aplikacji nie
   ma funkcji zablokowanych — wszystko działa dla każdego od razu.

   Zero odwołań sieciowych: żadnego skryptu, widżetu ani obrazka z serwera
   Buy Me a Coffee. Jedyny ruch na zewnątrz to odnośnik, który użytkownik
   sam kliknie. Ikonę kubka rysujemy sami, tym samym stylem co reszta ikon.
   ===================================================================== */
(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────────────
     TU WPISZ ADRES SWOJEGO PROFILU BUY ME A COFFEE.
     Przykład: 'https://buymeacoffee.com/twojanazwa'
     Dopóki tu pusto, aplikacja nie pokazuje martwego przycisku — patrz niżej.
     ───────────────────────────────────────────────────────────────────── */
  var SUPPORT_URL = '';

  /* Kubek — rysowany tak samo jak pozostałe ikony wersji: jeden viewBox
     24×24, wypełnienie currentColor, bez pliku i bez zewnętrznego zasobu. */
  var ICON_CUP =
    '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">' +
    '<path fill="currentColor" d="M4 6h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V6zm14 1h1.5A2.5 2.5 0 0 1 22 9.5 2.5 2.5 0 0 1 19.5 12H18v-2h1.5a.5.5 0 0 0 0-1H18V7z"/>' +
    '<rect x="3" y="20" width="15" height="2" rx="1" fill="currentColor"/></svg>';

  /* Przyjmujemy wyłącznie https:// na buymeacoffee.com (albo www.buymeacoffee.com)
     — to jedyny kanał darowizn tej aplikacji, więc walidacja pilnuje nie tylko
     schematu, ale i hosta. Cokolwiek innego traktujemy jak brak adresu, co
     chroni przed wklejeniem javascript:, cudzego serwisu albo literówki. */
  function validUrl() {
    var raw = String(SUPPORT_URL || '').trim();
    if (raw.indexOf('https://') !== 0) return '';
    var host = raw.slice('https://'.length).split(/[/?#]/)[0].toLowerCase();
    return (host === 'buymeacoffee.com' || host === 'www.buymeacoffee.com') ? raw : '';
  }

  function byId(id) { return document.getElementById(id); }

  /* Warstwa językowa. T() zamiast I18n.t() wprost: brak słownika ma pokazać
     klucze, a nie wywrócić ekranu — tak samo jak w pozostałych plikach v1. */
  function T(key, params) {
    var i18n = window.I18n;
    return (i18n && typeof i18n.t === 'function') ? i18n.t(key, params) : String(key);
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        var value = attrs[key];
        if (value === null || value === undefined || value === false) return;
        if (key === 'class') { node.className = value; return; }
        if (key === 'text') { node.textContent = value; return; }
        if (key === 'html') { node.innerHTML = value; return; }
        node.setAttribute(key, String(value));
      });
    }
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function paragraph(key, className, params) {
    var text = T(key, params);
    return el('p', className ? { class: className, text: text } : { text: text });
  }

  function backRow() {
    // data-nav-back to delegowana obsługa powrotu z menu.js — bez własnego wpięcia.
    return el('div', { class: 'ui-row' }, [
      el('button', {
        type: 'button', class: 'ui-back-btn', 'data-nav-back': '',
        'aria-label': T('action.back.aria'), text: T('action.back')
      })
    ]);
  }

  function build() {
    var panel = byId('panelSupport');
    if (!panel) return;
    while (panel.firstChild) panel.removeChild(panel.firstChild);

    panel.appendChild(backRow());

    var title = el('h2', {
      id: 'supportTitle', class: 'ui-screen-title', tabindex: '-1', text: T('support.title')
    });
    panel.appendChild(title);

    var card = el('section', { class: 'ui-support-card' });

    // 1. Co ta aplikacja daje za darmo. Nagłówek brzmi tak samo we wszystkich
    //    wersjach — ta sama rzecz nazywa się tak samo.
    card.appendChild(el('h3', { class: 'ui-support-title', text: T('support.free.title') }));
    card.appendChild(paragraph('support.free.text', 'ui-support-lead'));

    // 2. Dlaczego jest prośba. Nazwa aplikacji jest wstawką, nie sklejeniem:
    //    w części języków stoi w innym miejscu zdania i w innym przypadku.
    card.appendChild(paragraph('support.why', null, { app: T('app.name') }));

    // 3. Co darowizna daje. Musi być napisane wprost.
    card.appendChild(paragraph('support.nothing'));

    // 4. Przycisk albo spokojna informacja o braku adresu — nigdy martwy odnośnik.
    var url = validUrl();
    if (url) {
      card.appendChild(el('a', {
        id: 'supportLink', class: 'ui-support-btn', href: url,
        target: '_blank', rel: 'noopener noreferrer',
        'aria-label': T('support.button.aria')
      }, [
        el('span', { 'aria-hidden': 'true', html: ICON_CUP }),
        el('span', { text: T('support.button') })
      ]));
    } else {
      card.appendChild(el('p', {
        id: 'supportPending', class: 'ui-support-pending', text: T('support.pending')
      }));
    }

    // Zdanie o prywatności stoi przy przycisku, zawsze — ale mówi o tym, co
    // użytkownik naprawdę widzi: przy pustej stałej przycisku na ekranie nie ma,
    // więc zdanie jest w czasie przyszłym i nie odsyła do nieistniejącej kontrolki.
    card.appendChild(paragraph(url ? 'support.privacy' : 'support.privacyPending', 'ui-support-privacy'));

    panel.appendChild(card);
  }

  var initialized = false;

  var api = {
    init: function () {
      if (initialized) return;
      initialized = true;
      build();
      // Zabezpieczenie: menu.js normalnie rejestruje ten panel, ale aplikacja
      // nie może się rozsypać, gdy tamtego pliku zabraknie (stara pamięć
      // podręczna service workera).
      if (window.AppTabs && typeof window.AppTabs.registerOverlay === 'function') {
        window.AppTabs.registerOverlay('panelSupport');
      }
      // Ekran jest budowany od nowa po zmianie języka — nie da się go
      // przetłumaczyć na miejscu, bo zależy też od tego, czy adres darowizn
      // w ogóle jest podłączony (dwa różne zdania o prywatności).
      if (window.I18nDom && typeof window.I18nDom.onChange === 'function') {
        window.I18nDom.onChange(build);
      }
    },
    rebuild: build
  };

  window.BlueMonitor = window.BlueMonitor || {};
  window.AppSupport = api;
  window.BlueMonitor.AppSupport = api;

  function boot() { api.init(); }

  if (window.AppTabs) boot();
  else document.addEventListener('app:ready', boot, { once: true });
})();
