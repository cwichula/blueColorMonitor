/* docs/shared/i18n.js — warstwa językowa wersji v1–v4 (klasyczny skrypt).
 *
 * KTO ŁADUJE: v1, v2, v3 i v4. Ten plik musi stać w <head> jako PIERWSZY
 * skrypt strony — przed boot.js, przed metrics.js, przed czymkolwiek, co
 * buduje interfejs. Powód niżej, w akapicie o synchroniczności.
 *
 * CO WYSTAWIA: jedną globalną nazwę `window.I18n` (oraz `window.I18nData` —
 * magazyn wczytanych słowników, opisany niżej). Żadnych innych globali.
 *
 * CZEGO TU NIE WOLNO: wpisywać napisów widocznych dla użytkownika. Ten plik
 * jest silnikiem, nie słownikiem. Jedyny napis, jaki tu jest, to nazwa własna
 * języka w I18n.LANGUAGES — a ta z definicji nie podlega tłumaczeniu.
 *
 * ---------------------------------------------------------------------------
 * DLACZEGO ZNACZNIK <script>, A NIE MODUŁ ES ANI fetch + eval
 * ---------------------------------------------------------------------------
 * Rozważone trzy sposoby doładowania słownika w kodzie klasycznym:
 *
 *  1. import() — odpada. Moduł ES ładuje się zawsze odroczony i zawsze
 *     asynchronicznie, a cała warstwa startu v1–v4 stoi na synchronicznej
 *     kolejności znaczników <script> (boot.js v2 sprawdza listę obecnych
 *     globali, boot.js v3 mapuje moduły na nazwy plików, app.js v4 rozwija
 *     kolejkę __ms4PendingViews). Do tego moduł wymaga CORS, więc otwarcie
 *     docs/vN/index.html z dysku przez file:// przestałoby działać — a tak
 *     wygląda połowa ręcznych sprawdzeń w tym projekcie.
 *  2. fetch + eval — odpada. Wymagałby 'unsafe-eval' w każdej przyszłej
 *     polityce CSP, gubi nazwę pliku w śladzie stosu (błąd w słowniku
 *     zgłasza się jako <anonymous>) i omija zwykłą ścieżkę cache'owania.
 *  3. Wstrzyknięty <script src> — wybrany. Słownik jest wtedy zwykłym
 *     plikiem statycznym: service worker wciąga go do APP_SHELL tak samo jak
 *     resztę, przeglądarka trzyma go w cache HTTP, a błąd składni pokazuje
 *     się z nazwą pliku i numerem linii.
 *
 * ---------------------------------------------------------------------------
 * JAK POGODZONO ASYNCHRONICZNE SŁOWNIKI Z SYNCHRONICZNYM BUDOWANIEM EKRANU
 * ---------------------------------------------------------------------------
 * To jest sedno problemu: v1–v4 budują interfejs synchronicznie, w trakcie
 * wykonania swoich skryptów, a słownik jest osobnym plikiem. Rozwiązanie ma
 * dwie ścieżki i sam wybiera właściwą:
 *
 *  • ŚCIEŻKA SYNCHRONICZNA (podstawowa). Jeżeli ten plik wykonuje się jeszcze
 *    w trakcie parsowania dokumentu i nie ma na sobie `defer` ani `async`, to
 *    dopisuje znaczniki słowników przez document.write. Parser zatrzymuje się
 *    na nich dokładnie tak samo, jak zatrzymuje się na metrics.js czy
 *    engine.js — więc zanim wykona się PIERWSZY skrypt aplikacji, słowniki są
 *    już w pamięci. Dla v1–v4 nie zmienia się zatem nic: dalej wolno budować
 *    interfejs synchronicznie i dalej wolno wołać I18n.t() od pierwszej linii.
 *    document.write jest tu użyte świadomie i w jedynym miejscu, w którym jest
 *    poprawne: skrypt wstawiony przez parser, w trakcie parsowania, dopisujący
 *    zasób z tego samego pochodzenia. (Blokada „document.write w wolnej
 *    sieci” w Chrome dotyczy wyłącznie skryptów z obcego pochodzenia.)
 *
 *  • ŚCIEŻKA ASYNCHRONICZNA (zapasowa). Jeżeli plik wczytano z `defer`,
 *    `async` albo dynamicznie — czyli parsera już nie ma — znaczniki
 *    dopisywane są do <head> z `script.async = false` (co zachowuje kolejność
 *    wykonania), a gotowość zgłasza I18n.ready(). Tą samą ścieżką idzie każda
 *    późniejsza zmiana języka przez setLanguage().
 *
 * I18n.t() nigdy nie rzuca i nigdy nie zwraca `undefined`: dopóki słownik nie
 * dojechał, zwraca wartość angielską, a w ostateczności sam klucz. Ekran
 * zbudowany za wcześnie będzie więc po angielsku, a nie pusty.
 *
 * ---------------------------------------------------------------------------
 * PODZIAŁ SŁOWNIKÓW — WSPÓLNY I WERSJI
 * ---------------------------------------------------------------------------
 * Dla każdego języka ładowane są DWA pliki, zawsze w tej kolejności:
 *
 *    docs/shared/i18n/<kod>.js   treści wspólne dla wszystkich wersji:
 *                                nazwy i opisy siedmiu wielkości, nazwy stref,
 *                                jednostki, zastrzeżenia medyczne, prywatność;
 *    docs/vN/i18n/<kod>.js       treści własne wersji: nazwy ekranów, opisy
 *                                przycisków — wszystko, co opisuje układ tej
 *                                konkretnej wersji.
 *
 * Plik wersji dokłada się do tego samego obiektu, więc może nadpisać dowolny
 * klucz wspólny — i tylko w tę stronę. Nigdy odwrotnie.
 *
 * FORMAT PLIKU SŁOWNIKA (obowiązuje wszystkie 30 języków i wszystkie wersje):
 *
 *    window.I18nData = window.I18nData || {};
 *    window.I18nData['de'] = Object.assign(window.I18nData['de'] || {}, {
 *      'metric.share.name': 'Blauanteil',
 *      'count.readings': { one: '{n} Messwert', other: '{n} Messwerte' }
 *    });
 *
 * Object.assign, a nie zwykłe podstawienie: gdyby plik wersji podstawiał nowy
 * obiekt, skasowałby właśnie wczytaną warstwę wspólną. Słownik nie odwołuje się
 * do window.I18n — dzięki temu jest poprawny nawet wtedy, gdy to ten plik
 * jest tym, który się nie wczytał.
 *
 * ---------------------------------------------------------------------------
 * ZASADY SŁOWNIKA (identyczne dla v5, więc bez odstępstw)
 * ---------------------------------------------------------------------------
 *  • klucze kropkowane, po angielsku, semantyczne ('zone.good', 'metric.share.help');
 *  • wstawki w klamrach '{nazwa}', te same we wszystkich językach;
 *  • liczba mnoga: wartością klucza jest obiekt form CLDR
 *    { one, few, many, other }, rozstrzygany przez Intl.PluralRules — nigdy
 *    własnymi regułami odmiany;
 *  • brak klucza w aktywnym języku → wartość angielska → dopiero potem sam klucz.
 */
(function (global) {
  'use strict';

  var doc = global.document || null;

  /* Angielski, nie polski, jest językiem zapasowym: aplikacja ma trafiać do
     kogoś, kto nie zna polskiego, a nie do kogoś, kto go zna. */
  var FALLBACK = 'en';

  /* Klucz WSPÓLNY dla wszystkich wersji — bez przedrostka ms2/ms3/ms4. v1–v5
     stoją pod jednym pochodzeniem, więc wybór języka zrobiony raz obowiązuje
     wszędzie; wybór języka jest cechą człowieka, nie wersji aplikacji. */
  var STORAGE_KEY = 'ms.lang.v1';

  /* Nazwa WŁASNA języka (endonim), bo listę języków czyta ten, kto szuka
     swojego, a nie ten, kto rozumie polski albo angielski. Kolejność jest
     kolejnością zasięgu na świecie — pierwsze pozycje to te, które trafiają
     w największą liczbę osób. */
  var LANGUAGES = [
    { code: 'en', endonym: 'English',          dir: 'ltr' },
    { code: 'zh', endonym: '中文',              dir: 'ltr' },
    { code: 'hi', endonym: 'हिन्दी',              dir: 'ltr' },
    { code: 'es', endonym: 'Español',          dir: 'ltr' },
    { code: 'fr', endonym: 'Français',         dir: 'ltr' },
    { code: 'ar', endonym: 'العربية',            dir: 'rtl' },
    { code: 'bn', endonym: 'বাংলা',              dir: 'ltr' },
    { code: 'pt', endonym: 'Português',        dir: 'ltr' },
    { code: 'ru', endonym: 'Русский',          dir: 'ltr' },
    { code: 'ur', endonym: 'اردو',              dir: 'rtl' },
    { code: 'id', endonym: 'Bahasa Indonesia', dir: 'ltr' },
    { code: 'de', endonym: 'Deutsch',          dir: 'ltr' },
    { code: 'ja', endonym: '日本語',             dir: 'ltr' },
    { code: 'tr', endonym: 'Türkçe',           dir: 'ltr' },
    { code: 'ko', endonym: '한국어',             dir: 'ltr' },
    { code: 'vi', endonym: 'Tiếng Việt',       dir: 'ltr' },
    { code: 'it', endonym: 'Italiano',         dir: 'ltr' },
    { code: 'th', endonym: 'ไทย',               dir: 'ltr' },
    { code: 'fa', endonym: 'فارسی',             dir: 'rtl' },
    { code: 'pl', endonym: 'Polski',           dir: 'ltr' },
    { code: 'uk', endonym: 'Українська',       dir: 'ltr' },
    { code: 'nl', endonym: 'Nederlands',       dir: 'ltr' },
    { code: 'ta', endonym: 'தமிழ்',              dir: 'ltr' },
    { code: 'te', endonym: 'తెలుగు',              dir: 'ltr' },
    { code: 'ms', endonym: 'Bahasa Melayu',    dir: 'ltr' },
    { code: 'ro', endonym: 'Română',           dir: 'ltr' },
    { code: 'el', endonym: 'Ελληνικά',          dir: 'ltr' },
    { code: 'cs', endonym: 'Čeština',          dir: 'ltr' },
    { code: 'sv', endonym: 'Svenska',          dir: 'ltr' },
    { code: 'hu', endonym: 'Magyar',           dir: 'ltr' }
  ];

  var INDEX = Object.create(null);
  for (var li = 0; li < LANGUAGES.length; li += 1) INDEX[LANGUAGES[li].code] = LANGUAGES[li];

  /* Magazyn słowników. Tworzony tutaj, ale pliki słowników tworzą go u siebie
     tak samo (`window.I18nData = window.I18nData || {}`), żeby nie zależeć od
     kolejności wczytania. */
  global.I18nData = global.I18nData || {};

  var active = FALLBACK;        // kod aktywnego języka
  var isReady = false;
  var syncBoot = false;         // czy poszliśmy ścieżką document.write
  var waiting = [];             // wywołania zwrotne I18n.ready()
  var readyResolve = null;
  var readyPromise = (typeof Promise === 'function')
    ? new Promise(function (resolve) { readyResolve = resolve; })
    : null;

  var requested = Object.create(null);   // adresy już zamówione — nigdy dwa razy

  function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  function known(code) {
    return !!(code && typeof code === 'string' && hasOwn(INDEX, code));
  }

  /* ------------------------------------------------------------------
     Pamięć wyboru — każdy dostęp w try/catch, bo w trybie prywatnym samo
     dotknięcie localStorage potrafi rzucić wyjątkiem.
     ------------------------------------------------------------------ */

  function readStored() {
    try {
      if (!global.localStorage) return null;
      var v = global.localStorage.getItem(STORAGE_KEY);
      return known(v) ? v : null;
    } catch (_) { return null; }
  }

  function writeStored(code) {
    try {
      if (!global.localStorage) return false;
      if (code === null) global.localStorage.removeItem(STORAGE_KEY);
      else global.localStorage.setItem(STORAGE_KEY, code);
      return true;
    } catch (_) { return false; }
  }

  /* ------------------------------------------------------------------
     Wykrywanie języka
     ------------------------------------------------------------------ */

  /* Dopasowanie po samym kodzie języka: 'de-AT' → 'de', 'zh-Hant-TW' → 'zh'.
     Region i pismo są tu świadomie pomijane — mamy jeden słownik na język. */
  function fromNavigator() {
    var nav = global.navigator || {};
    var tags = (nav.languages && nav.languages.length) ? nav.languages
             : (nav.language ? [nav.language] : []);
    for (var i = 0; i < tags.length; i += 1) {
      var tag = String(tags[i] || '').toLowerCase();
      if (!tag) continue;
      if (known(tag)) return tag;
      var base = tag.split('-')[0];
      if (known(base)) return base;
    }
    return null;
  }

  /* ------------------------------------------------------------------
     Ładowanie plików słownika
     ------------------------------------------------------------------ */

  /* Katalog wspólny wyliczamy z adresu TEGO pliku, a nie z adresu strony:
     v1–v4 leżą o jeden poziom niżej, ale robocze kopie i podglądy potrafią
     leżeć gdzie indziej i wtedy sztywna ścieżka '../shared/' by kłamała. */
  function ownScript() {
    if (doc && doc.currentScript) return doc.currentScript;
    if (!doc) return null;
    var all = doc.getElementsByTagName('script');
    for (var i = all.length - 1; i >= 0; i -= 1) {
      if (/(^|\/)i18n\.js(\?|#|$)/.test(all[i].getAttribute('src') || '')) return all[i];
    }
    return null;
  }

  var scriptEl = ownScript();

  function resolve(url) {
    try { return new global.URL(url, doc ? doc.baseURI : undefined).href; }
    catch (_) { return url; }
  }

  var sharedBase = (function () {
    var src = scriptEl ? (scriptEl.getAttribute('src') || '') : '';
    if (!src) return resolve('../shared/i18n/');
    return resolve(src.replace(/[?#].*$/, '').replace(/i18n\.js$/, 'i18n/'));
  }());

  /* Katalog słowników wersji. data-scope="none" wyłącza warstwę własną —
     przydatne dla strony, która jeszcze swojego słownika nie ma. */
  var scope = scriptEl ? (scriptEl.getAttribute('data-scope') || 'i18n') : 'i18n';
  var localBase = (scope === 'none') ? null : resolve(scope + '/');

  function urlsFor(code) {
    var out = [sharedBase + code + '.js'];
    if (localBase) out.push(localBase + code + '.js');   // wersja nadpisuje wspólne
    return out;
  }

  /* Angielski jest ładowany ZAWSZE, nawet gdy aktywny jest inny język: to on
     jest wartością zapasową każdego brakującego klucza. */
  function plan(code) {
    var urls = urlsFor(FALLBACK);
    if (code !== FALLBACK) urls = urls.concat(urlsFor(code));
    var out = [];
    for (var i = 0; i < urls.length; i += 1) {
      if (requested[urls[i]]) continue;
      requested[urls[i]] = true;
      out.push(urls[i]);
    }
    return out;
  }

  function writeTags(urls) {
    for (var i = 0; i < urls.length; i += 1) {
      // Rozcięte '<' + 'script', żeby ten plik dało się bez niespodzianek
      // wkleić także wewnątrz znacznika w HTML-u.
      doc.write('<' + 'script src="' + encodeURI(urls[i]).replace(/"/g, '%22') + '"><' + '/script>');
    }
  }

  function appendTags(urls, done) {
    if (!urls.length) { if (done) done(); return; }
    var left = urls.length;
    function tick() { left -= 1; if (left === 0 && done) done(); }
    for (var i = 0; i < urls.length; i += 1) {
      var s = doc.createElement('script');
      s.src = urls[i];
      /* async = false przy elemencie tworzonym skryptem oznacza „wykonaj
         w kolejności dopisania” — a kolejność jest tu treścią umowy:
         wspólny przed własnym wersji. */
      s.async = false;
      s.onload = tick;
      /* Brak pliku to nie awaria: nieznalezione tłumaczenie ma spaść na
         angielski, a nie zawiesić ready() na zawsze. */
      s.onerror = tick;
      (doc.head || doc.documentElement).appendChild(s);
    }
  }

  function markReady() {
    if (isReady) return;
    isReady = true;
    if (readyResolve) readyResolve(I18n);
    var queue = waiting.slice();
    waiting.length = 0;
    for (var i = 0; i < queue.length; i += 1) {
      try { queue[i](I18n); } catch (err) { report('ready handler threw', err); }
    }
  }

  /* Ścieżka synchroniczna nie ma jak dostać onload od znaczników dopisanych
     przez document.write, więc gotowość rozpoznajemy po skutku: skoro jakiś
     słownik jest w I18nData, to znaczniki się wykonały. Sprawdzamy to leniwie,
     przy pierwszym pytaniu z zewnątrz — bez inline'owego <script>, który
     wymagałby 'unsafe-inline' w przyszłej polityce CSP. */
  function settle() {
    if (isReady || !syncBoot) return;
    if (global.I18nData[active] || global.I18nData[FALLBACK]) markReady();
  }

  function report(what, err) {
    if (global.console && global.console.error) global.console.error('I18n: ' + what, err);
  }

  /* ------------------------------------------------------------------
     Podstawianie wstawek i liczba mnoga
     ------------------------------------------------------------------ */

  /* Nieznana wstawka zostaje w tekście jako '{nazwa}'. Świadomie: pusta dziura
     wygląda jak zwykły literówkowy błąd tłumacza, a widoczne '{count}' od razu
     mówi, że to wywołanie nie podało parametru.

     Parametr, który jest LICZBĄ, zapisujemy po myśli aktywnego języka: 2,5 po
     polsku, 2.5 po angielsku, ٢٫٥ po arabsku, a tysiące z separatorem tego
     języka. Inaczej trzydzieści tłumaczeń dostałoby jeden, angielski zapis
     liczby wklejony w środek zdania. Kto ma już gotowy napis (np. z
     Metrics.formatValue), podaje napis — napisów nie ruszamy. */
  function fill(text, params) {
    if (!params) return text;
    return text.replace(/\{([a-zA-Z0-9_]+)\}/g, function (whole, name) {
      var v = params[name];
      if (v === null || v === undefined) return whole;
      if (typeof v === 'number') return I18n.number(v);
      return String(v);
    });
  }

  function firstForm(forms) {
    for (var k in forms) if (hasOwn(forms, k)) return forms[k];
    return '';
  }

  /* Wybór formy zostawiamy Intl.PluralRules aktywnego języka. Własnych reguł
     odmiany nie piszemy: polskie 2/22 „few”, arabskie „zero”/„two” i rosyjskie
     „many” już tam są i są utrzymywane przez kogoś innego. */
  function plural(forms, params) {
    var n = null;
    if (params) {
      if (typeof params.n === 'number') n = params.n;
      else if (typeof params.count === 'number') n = params.count;
    }
    if (n === null) return forms.other !== undefined ? forms.other : firstForm(forms);
    var category = 'other';
    try { category = new global.Intl.PluralRules(localeTag()).select(n); } catch (_) {}
    if (forms[category] !== undefined) return forms[category];
    if (forms.other !== undefined) return forms.other;
    return firstForm(forms);
  }

  function localeTag() { return active; }

  /* Klucze, których zabrakło. Nie logujemy ich na konsolę — przy 5 Hz jedna
     dziura potrafiłaby wypełnić konsolę w sekundę. Lista służy do sprawdzenia
     kompletności tłumaczeń z konsoli: I18n.missing(). */
  var missing = [];
  var MISSING_CAP = 200;

  function lookup(key) {
    var d = global.I18nData[active];
    if (d && hasOwn(d, key)) return d[key];
    var f = global.I18nData[FALLBACK];
    if (f && hasOwn(f, key)) return f[key];
    if (missing.length < MISSING_CAP && missing.indexOf(key) === -1) missing.push(key);
    return null;
  }

  /* ------------------------------------------------------------------
     Publiczne API
     ------------------------------------------------------------------ */

  var I18n = {

    LANGUAGES: LANGUAGES,
    FALLBACK: FALLBACK,
    STORAGE_KEY: STORAGE_KEY,

    /** Kolejno: zapisany wybór użytkownika → navigator.languages (po samym
     *  kodzie języka) → 'en'. Nigdy 'pl' — polski jest jednym z trzydziestu. */
    detect: function () {
      return readStored() || fromNavigator() || FALLBACK;
    },

    /** Kod aktywnego języka, np. 'de'. */
    language: function () { settle(); return active; },

    /** Znacznik dla Intl (PluralRules, NumberFormat, DateTimeFormat). Dziś
     *  równy kodowi języka; osobna funkcja, żeby ewentualny wariant regionalny
     *  dało się dodać w jednym miejscu. */
    locale: function () { settle(); return localeTag(); },

    /** 'ltr' albo 'rtl' — dla aktywnego języka lub dla podanego kodu. */
    dir: function (code) {
      var entry = INDEX[code || active];
      return entry ? entry.dir : 'ltr';
    },

    /** Czy język jest brany z urządzenia (bo użytkownik nic nie wybrał). */
    isAuto: function () { return readStored() === null; },

    /** Czy klucz istnieje w aktywnym języku albo w angielskim. */
    has: function (key) {
      var d = global.I18nData[active];
      if (d && hasOwn(d, key)) return true;
      var f = global.I18nData[FALLBACK];
      return !!(f && hasOwn(f, key));
    },

    /** Napis pod kluczem. Zawsze zwraca napis:
     *  aktywny język → angielski → sam klucz. */
    t: function (key, params) {
      settle();
      var value = lookup(key);
      if (value === null || value === undefined) return String(key);
      if (typeof value === 'object') value = plural(value, params);
      return fill(String(value), params);
    },

    /** Liczba w zapisie aktywnego języka — 1,5 po polsku, 1.5 po angielsku,
     *  ١٫٥ po arabsku. Napisy z liczbami składa się z t() i tego. */
    number: function (value, options) {
      if (typeof value !== 'number' || !isFinite(value)) return '';
      try { return new global.Intl.NumberFormat(localeTag(), options || undefined).format(value); }
      catch (_) { return String(value); }
    },

    /** Klucze, których zabrakło od startu strony — do sprawdzania kompletności
     *  tłumaczeń bez zaglądania w każdy ekran po kolei. */
    missing: function () { return missing.slice(); },

    /** Wywołanie zwrotne startu. UWAGA: gdy słowniki już są — a na ścieżce
     *  synchronicznej są zawsze — wywoła się NATYCHMIAST, w tym samym takcie.
     *  Tak ma być: to jest właśnie to, co pozwala v1–v4 dalej budować ekran
     *  synchronicznie. Bez argumentu zwraca obietnicę. */
    ready: function (callback) {
      settle();
      if (typeof callback !== 'function') return readyPromise;
      if (isReady) { try { callback(I18n); } catch (err) { report('ready handler threw', err); } }
      else waiting.push(callback);
      return readyPromise;
    },

    /** Zmiana języka: zapisuje wybór, doładowuje słownik, ustawia lang i dir
     *  na <html>, a na końcu rozgłasza 'i18n:changed' przez window.Bus.
     *  `code === null` kasuje wybór i wraca do języka urządzenia.
     *
     *  Kolejność jest celowa: najpierw zapis (żeby po odświeżeniu strony wybór
     *  obowiązywał nawet wtedy, gdy plik słownika się nie wczytał), potem
     *  wczytanie, a przełączenie i rozgłoszenie dopiero na końcu — inaczej
     *  ekran przerysowałby się w połowie na stary słownik. */
    setLanguage: function (code) {
      var target = (code === null || code === 'auto') ? (fromNavigator() || FALLBACK) : code;
      if (!known(target)) {
        report('nieznany kod języka: ' + code, null);
        return readyPromise || null;
      }
      writeStored(code === null || code === 'auto' ? null : target);

      var previous = active;
      var urls = plan(target);

      function finish() {
        active = target;
        applyDocument();
        markReady();
        if (global.Bus && typeof global.Bus.emit === 'function') {
          /* Nazwa zdarzenia w konwencji bus.js: 'obszar:zdarzenie'. Bus nie ma
             pamięci dla tego zdarzenia (sticky jest tylko 'app:ready'), więc
             kto potrzebuje stanu początkowego, bierze go z I18n.ready(). */
          global.Bus.emit('i18n:changed', {
            code: target, dir: I18n.dir(target), previous: previous
          });
        }
      }

      if (!urls.length) {
        finish();
        return readyPromise || null;
      }
      if (!readyPromise) { appendTags(urls, finish); return null; }
      return new Promise(function (done) {
        appendTags(urls, function () { finish(); done(I18n); });
      });
    }
  };

  /* <html lang> i <html dir> — jedno miejsce, w którym warstwa językowa dotyka
     dokumentu. dir na <html> odwraca cały układ w arabskim, urdu i perskim,
     a lang decyduje o łamaniu wyrazów i o głosie czytnika ekranu. */
  function applyDocument() {
    if (!doc || !doc.documentElement) return;
    doc.documentElement.setAttribute('lang', active);
    doc.documentElement.setAttribute('dir', I18n.dir());
  }

  /* ------------------------------------------------------------------
     Start
     ------------------------------------------------------------------ */

  active = I18n.detect();

  if (doc) {
    /* Skrypt wstawiony przez parser, bez defer i async, w trakcie parsowania —
     * tylko wtedy document.write dopisuje do strumienia parsera zamiast
     * skasować gotowy dokument. Każdy inny przypadek idzie ścieżką zapasową. */
    var parserInserted = !!scriptEl && !scriptEl.async && !scriptEl.defer
                       && !scriptEl.hasAttribute('async') && !scriptEl.hasAttribute('defer');
    var urlsAtBoot = plan(active);

    if (parserInserted && doc.readyState === 'loading' && typeof doc.write === 'function') {
      syncBoot = true;
      applyDocument();
      writeTags(urlsAtBoot);
      /* Siatka bezpieczeństwa: gdyby oba pliki słownika nie doszły, settle()
         nigdy by nie zaskoczyło i ready() wisiałoby w nieskończoność. */
      doc.addEventListener('DOMContentLoaded', markReady);
    } else {
      applyDocument();
      appendTags(urlsAtBoot, markReady);
    }
  } else {
    markReady();
  }

  global.I18n = I18n;

}(typeof window !== 'undefined' ? window : globalThis));
