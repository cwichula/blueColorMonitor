/* =====================================================================
   i18n-dom.js — spoiwo między silnikiem językowym (shared/i18n.js) a tym,
   co v1 ma wypisane wprost w index.html.

   DLACZEGO TEN PLIK W OGÓLE ISTNIEJE. Napisy budowane w JavaScripcie
   (features.js, menu.js, support.js, część app.js) wołają I18n.t() i mają
   z głowy. Ale połowa tej wersji — nagłówki, przyciski kamery, legenda,
   nagłówki tabeli i całe pięć rozdziałów Dokumentacji — jest zapisana
   bezpośrednio w index.html. Przepisanie tego do JavaScriptu oznaczałoby
   zbudowanie Dokumentacji z kodu i utratę kotwic (#doc-start), ról ARIA
   i czytelnego diffa. Zamiast tego znaczniki zostają na miejscu, a ich
   treść wskazuje klucz:

     data-i18n="klucz"            -> textContent
     data-i18n-html="klucz"       -> innerHTML (tylko akapity Dokumentacji,
                                     w których autor świadomie użył <b>, <i>
                                     albo <code>; nigdy treść od użytkownika)
     data-i18n-attr="atrybut:klucz; atrybut:klucz"
                                  -> atrybuty (aria-label, content, …)

   KIEDY TO SIĘ WYKONUJE. Raz przy starcie — z DOMContentLoaded, czyli po
   sparsowaniu całego dokumentu, a przed pierwszym malowaniem (skrypty na
   końcu <body> blokują parser, więc obraz nie zdąży się pokazać po polsku).
   Drugi raz przy każdej zmianie języka, przed rozgłoszeniem 'i18n:changed'.

   ZMIANA JĘZYKA. v1 nie ładuje bus.js, więc nie ma window.Bus, na którym
   silnik rozgłasza 'i18n:changed'. Zamiast dokładać magistralę dla jednego
   zdarzenia, używamy tej samej konwencji, którą v1 już ma dla 'app:ready':
   zwykłego zdarzenia na obiekcie document. Kto potrzebuje przerysowania,
   woła I18nDom.onChange(cb).

   ODPORNOŚĆ NA BRAK SILNIKA. Gdyby shared/i18n.js się nie wczytał (stara
   pamięć service workera, plik usunięty z serwera), window.I18n nie
   istnieje i każde I18n.t() wywróciłoby aplikację. Dlatego ten plik zakłada
   wtedy atrapę: aplikacja pokazuje klucze zamiast zdań, ale mierzy dalej.
   Pomiar nigdy nie zależy od warstwy językowej.
   ===================================================================== */
(function (global) {
  'use strict';

  var doc = global.document;

  /* ------------------------------------------------------------------
     Atrapa silnika — zakładana tylko wtedy, gdy prawdziwego nie ma.
     ------------------------------------------------------------------ */
  if (!global.I18n || typeof global.I18n.t !== 'function') {
    global.I18n = {
      LANGUAGES: [],
      FALLBACK: 'en',
      t: function (key) { return String(key); },
      number: function (value) { return (typeof value === 'number') ? String(value) : ''; },
      language: function () { return 'en'; },
      locale: function () { return 'en'; },
      dir: function () { return 'ltr'; },
      isAuto: function () { return true; },
      has: function () { return false; },
      missing: function () { return []; },
      ready: function (cb) { if (typeof cb === 'function') cb(this); return null; },
      setLanguage: function () { return null; }
    };
  }

  var I18n = global.I18n;

  /* ------------------------------------------------------------------
     Pojedynczy przebieg po znacznikach
     ------------------------------------------------------------------ */

  function applyText(root) {
    var nodes = root.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i += 1) {
      nodes[i].textContent = I18n.t(nodes[i].getAttribute('data-i18n'));
    }
  }

  function applyHtml(root) {
    var nodes = root.querySelectorAll('[data-i18n-html]');
    for (var i = 0; i < nodes.length; i += 1) {
      nodes[i].innerHTML = I18n.t(nodes[i].getAttribute('data-i18n-html'));
    }
  }

  /* 'aria-label:action.back.aria; content:app.description' — średnik rozdziela
     pary, pierwszy dwukropek rozdziela nazwę atrybutu od klucza. Klucze bywają
     kropkowane, ale dwukropka nie zawierają, więc rozcięcie po pierwszym jest
     jednoznaczne. */
  function applyAttrs(root) {
    var nodes = root.querySelectorAll('[data-i18n-attr]');
    for (var i = 0; i < nodes.length; i += 1) {
      var pairs = nodes[i].getAttribute('data-i18n-attr').split(';');
      for (var j = 0; j < pairs.length; j += 1) {
        var pair = pairs[j];
        var cut = pair.indexOf(':');
        if (cut < 1) continue;
        var attr = pair.slice(0, cut).trim();
        var key = pair.slice(cut + 1).trim();
        if (!attr || !key) continue;
        nodes[i].setAttribute(attr, I18n.t(key));
      }
    }
  }

  function apply(root) {
    var scope = root || doc;
    if (!scope || typeof scope.querySelectorAll !== 'function') return;
    applyText(scope);
    applyHtml(scope);
    applyAttrs(scope);
  }

  /* ------------------------------------------------------------------
     Zmiana języka
     ------------------------------------------------------------------ */

  var listeners = [];

  function announceChange(code) {
    apply(doc);
    var detail = { code: code, dir: I18n.dir() };
    for (var i = 0; i < listeners.length; i += 1) {
      // Jeden zepsuty odbiorca nie może zablokować przerysowania pozostałych
      // ekranów — dokładnie tak samo jak w notify() z app.js.
      try { listeners[i](detail); } catch (_) { /* ignorujemy */ }
    }
    try {
      doc.dispatchEvent(new global.CustomEvent('i18n:changed', { detail: detail }));
    } catch (_) { /* starsza przeglądarka bez konstruktora CustomEvent */ }
  }

  var I18nDom = {

    apply: apply,

    /** Przerysowanie po zmianie języka. Wywołania zwrotne dostają
     *  { code, dir } i biegną PO przebiegu po znacznikach statycznych, więc
     *  mogą bez obaw nadpisać to, co przebieg wpisał (np. etykietę strefy,
     *  która w trakcie pomiaru nie jest już „Brak danych”). */
    onChange: function (cb) {
      if (typeof cb === 'function' && listeners.indexOf(cb) === -1) listeners.push(cb);
    },

    /** Zmiana języka: 'de', albo 'auto'/null dla języka urządzenia.
     *  Silnik dociąga słownik asynchronicznie, więc przerysowanie musi
     *  poczekać na jego obietnicę — inaczej ekran odmalowałby się w połowie
     *  na starym słowniku. */
    setLanguage: function (code) {
      var target = (code === 'auto') ? null : code;
      var result = null;
      try { result = I18n.setLanguage(target); } catch (_) { result = null; }
      if (result && typeof result.then === 'function') {
        result.then(function () { announceChange(I18n.language()); });
      } else {
        announceChange(I18n.language());
      }
    }
  };

  global.I18nDom = I18nDom;

  /* Pierwszy przebieg. Ten plik stoi w <head>, więc dokument jest jeszcze
     w trakcie parsowania i czekamy na DOMContentLoaded; warunek na readyState
     zostaje na wypadek wczytania tego pliku inną drogą. */
  if (doc) {
    if (doc.readyState === 'loading') {
      doc.addEventListener('DOMContentLoaded', function () { apply(doc); });
    } else {
      apply(doc);
    }
  }

}(typeof window !== 'undefined' ? window : globalThis));
