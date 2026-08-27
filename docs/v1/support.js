/* =====================================================================
   support.js — cała warstwa dobrowolnego wsparcia w tej wersji.

   To jedyny plik, który wie cokolwiek o darowiznach. Buduje ekran
   „Wsparcie” (#panelSupport); wejście do niego daje dolny pasek nawigacji
   z menu.js. Nic tu nie odblokowuje żadnej funkcji, bo w tej aplikacji nie
   ma funkcji zablokowanych — wszystko działa dla każdego od razu.

   Zero odwołań sieciowych: żadnego skryptu, widżetu ani obrazka z serwera
   serwisu darowizn. Jedyny ruch na zewnątrz to odnośnik, który użytkownik
   sam kliknie. Ikonę kubka rysujemy sami, tym samym stylem co reszta ikon.
   ===================================================================== */
(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────────────
     TU WPISZ ADRES SWOJEGO PROFILU DAROWIZN.
     Przykłady: 'https://buymeacoffee.com/twojanazwa'
                'https://ko-fi.com/twojanazwa'
                'https://paypal.me/twojanazwa'
     Dopóki tu pusto, aplikacja nie pokazuje martwego przycisku — patrz niżej.
     ───────────────────────────────────────────────────────────────────── */
  var SUPPORT_URL = '';

  /* Kubek — rysowany tak samo jak pozostałe ikony wersji: jeden viewBox
     24×24, wypełnienie currentColor, bez pliku i bez zewnętrznego zasobu. */
  var ICON_CUP =
    '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">' +
    '<path fill="currentColor" d="M4 6h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V6zm14 1h1.5A2.5 2.5 0 0 1 22 9.5 2.5 2.5 0 0 1 19.5 12H18v-2h1.5a.5.5 0 0 0 0-1H18V7z"/>' +
    '<rect x="3" y="20" width="15" height="2" rx="1" fill="currentColor"/></svg>';

  /* Przyjmujemy wyłącznie https://. Cokolwiek innego traktujemy jak brak
     adresu — jedna linijka, a chroni przed wklejeniem javascript: albo
     literówką w schemacie. */
  function validUrl() {
    var raw = String(SUPPORT_URL || '').trim();
    return raw.indexOf('https://') === 0 && raw.length > 'https://'.length ? raw : '';
  }

  function byId(id) { return document.getElementById(id); }

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

  function paragraph(textPL, className) {
    return el('p', className ? { class: className, text: textPL } : { text: textPL });
  }

  function backRow() {
    // data-nav-back to delegowana obsługa powrotu z menu.js — bez własnego wpięcia.
    return el('div', { class: 'ui-row' }, [
      el('button', {
        type: 'button', class: 'ui-back-btn', 'data-nav-back': '',
        'aria-label': 'Wróć do poprzedniego ekranu', text: '← Wróć'
      })
    ]);
  }

  function build() {
    var panel = byId('panelSupport');
    if (!panel) return;
    while (panel.firstChild) panel.removeChild(panel.firstChild);

    panel.appendChild(backRow());

    var title = el('h2', {
      id: 'supportTitle', class: 'ui-screen-title', tabindex: '-1', text: 'Wsparcie'
    });
    panel.appendChild(title);

    var card = el('section', { class: 'ui-support-card' });

    // 1. Co ta aplikacja daje za darmo. Nagłówek brzmi tak samo we wszystkich
    //    wersjach — ta sama rzecz nazywa się tak samo.
    card.appendChild(el('h3', { class: 'ui-support-title', text: 'Wszystko jest dostępne' }));
    card.appendChild(paragraph(
      'Cała aplikacja jest bezpłatna: pomiar, historia i raporty, profile progów, ' +
      'alert, eksport CSV i Dokumentacja. Wszystko działa od razu, bez konta, bez ' +
      'limitów i bez internetu.',
      'ui-support-lead'
    ));

    // 2. Dlaczego jest prośba.
    card.appendChild(paragraph(
      'Monitoring Światła Szkodliwego powstaje po godzinach. Jeśli Ci się przydaje, ' +
      'możesz postawić mi kawę. To pomaga utrzymać aplikację i rozwijać ją dalej — ' +
      'poprawiać pomiar, dopisywać Dokumentację i sprawdzać ją na kolejnych telefonach.'
    ));

    // 3. Co darowizna daje. Musi być napisane wprost.
    card.appendChild(paragraph(
      'Darowizna niczego nie odblokowuje. Nie ma wersji lepszej ani gorszej — po ' +
      'wsparciu aplikacja działa dokładnie tak samo. Jedyna różnica jest taka, że ' +
      'autor wie, że komuś to się przydało.'
    ));

    // 4. Przycisk albo spokojna informacja o braku adresu — nigdy martwy odnośnik.
    var url = validUrl();
    if (url) {
      card.appendChild(el('a', {
        id: 'supportLink', class: 'ui-support-btn', href: url,
        target: '_blank', rel: 'noopener noreferrer',
        'aria-label': 'Postaw mi kawę — otwiera profil darowizn w nowej karcie'
      }, [
        el('span', { 'aria-hidden': 'true', html: ICON_CUP }),
        el('span', { text: 'Postaw mi kawę' })
      ]));
    } else {
      card.appendChild(el('p', {
        id: 'supportPending', class: 'ui-support-pending',
        text: 'Profil darowizn nie jest jeszcze podłączony. Gdy tylko się pojawi, ' +
          'przycisk stanie w tym miejscu. Do tego czasu nic nie trzeba robić — ' +
          'aplikacja i tak jest w całości bezpłatna.'
      }));
    }

    // Zdanie o prywatności stoi przy przycisku, zawsze — ale mówi o tym, co
    // użytkownik naprawdę widzi: przy pustej stałej przycisku na ekranie nie ma,
    // więc zdanie jest w czasie przyszłym i nie odsyła do nieistniejącej kontrolki.
    card.appendChild(paragraph(
      url
        ? 'Przycisk otwiera stronę zewnętrzną (na przykład Buy Me a Coffee) w nowej ' +
          'karcie przeglądarki. To jedyny moment, w którym cokolwiek opuszcza to ' +
          'urządzenie. Obraz z kamery i wszystkie Twoje pomiary zostają tutaj — ' +
          'nie są nigdzie wysyłane, ani przed kliknięciem, ani po nim.'
        : 'Kiedy adres się pojawi, kliknięcie przycisku otworzy stronę zewnętrzną ' +
          '(na przykład Buy Me a Coffee) w nowej karcie przeglądarki. Będzie to ' +
          'jedyny moment, w którym cokolwiek opuszcza to urządzenie. Obraz z kamery ' +
          'i wszystkie Twoje pomiary zostają tutaj — nie są nigdzie wysyłane.',
      'ui-support-privacy'
    ));

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
