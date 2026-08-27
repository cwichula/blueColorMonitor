/* Monitor Światła v3 — docs.js — modules 12 (Dokumentacja) and 13 (Ustawienia).
 *
 * Module 12 is the place where the application says out loud what it cannot do,
 * and it says it FIRST: the screen opens with "Czego ta aplikacja NIE mierzy",
 * before a single word about what it does. The seven quantities, their ranges
 * and their current thresholds are rendered from Metrics.CATALOGUE and
 * Engine.getThresholds(), so a metric documents itself and a threshold the user
 * moved in module 02 is the one printed here.
 *
 * The formulas are transcribed from metrics.js — the same coefficients, the
 * same limits, the same honesty about where each one stops being meaningful.
 * If metrics.js ever changes, this text is wrong and must be changed with it;
 * that is the price of documenting arithmetic in prose, and it is worth paying,
 * because "trust us" is not an answer for a measuring instrument.
 *
 * Module 13 owns nothing. Theme, text size and motion live in UI3 settings,
 * history lives in the engine; this screen is a set of keys pointing at them.
 */
(function (global) {
  'use strict';

  var doc = global.document;

  // Bumped by hand together with CACHE in sw.js. Shown on the settings screen
  // so a support question can start with a version rather than a guess.
  var VERSION = '3.0';

  /* ------------------------------------------------------------------
     Wording — registered into Scale.TEXT, the single home for Polish (9.3).
     Chapter 8 has no table for the documentation screen; these sentences come
     from v2's buildDocsScreen (already proof-read) and from metrics.js.
     ------------------------------------------------------------------ */

  function installText() {
    var S = global.Scale;
    if (!S || !S.TEXT || S.TEXT.docs) return;

    S.TEXT.docs = {

      notTitle: 'Czego ta aplikacja NIE mierzy',
      notList: [
        'Nie mierzy widma. Aparat ma trzy szerokie kanały barwne, automatyczną ekspozycję i automatyczny balans bieli.',
        'Nie mierzy wartości bezwzględnych. Jasność sceny jest wskaźnikiem względnym, a nie wynikiem pomiaru fotometrycznego.',
        'Nie mierzy temperatury barwowej wprost. Temperatura barwowa i wpływ na rytm dobowy to przybliżenia liczone z barw sRGB.',
        'Nie widzi migotania sieciowego. Próbkowanie 5 Hz widzi pulsowanie tylko poniżej 2,5 Hz — sieciowe 100 Hz jest poza zasięgiem i aplikacja nigdy nie poda go jako wyniku.',
        'Nie stawia diagnozy i nie daje porady zdrowotnej. Żaden wynik nie jest ani jednym, ani drugim.',
        'Nie porównuje twojego światła z żadnym urzędowym wzorcem. Progi to ustawienia, które możesz zmienić w module 02.'
      ],

      whatTitle: 'Co mierzy i jak',
      whatLead: 'Kamera telefonu patrzy na oświetloną powierzchnię, a aplikacja pięć razy na sekundę liczy średnie kanałów R, G i B ze środkowego wycinka kadru. Z tych trzech liczb wyprowadza siedem wskaźników.',
      whatCrop: 'Wycinek to środkowe 60% szerokości i 60% wysokości klatki — dokładnie ten prostokąt, który obrysowuje celownik na ekranie CELOWANIE. Poza nim nic nie jest liczone.',
      whatRate: 'Jedna próbka co 200 ms, czyli 5 razy na sekundę. Ostatnia minuta leży w pamięci w pełnej rozdzielczości; wszystko starsze jest zapisywane co 5 sekund i sięga trzydziestu dni wstecz.',

      metricsTitle: 'Siedem wielkości',

      formulasTitle: 'Wzory',
      formulas: [
        {
          titlePL: 'Udział niebieskiego',
          formulaPL: 'udział = B / (R + G + B) × 100%',
          textPL: 'Liczony na wartościach sRGB bez odwracania gamma — celowo, bo to ta sama definicja co w poprzedniej wersji aplikacji i progi ustawione kiedyś dalej znaczą to samo. Izoluje barwę od jasności.'
        },
        {
          titlePL: 'Jasność sceny',
          formulaPL: 'jasność = (R + G + B) / 3 / 255 × 100%',
          textPL: 'Średnia wartość kanałów w procentach zakresu. Automatyka ekspozycji przesuwa ją pod spodem, więc to wskaźnik względny — porównuj dwie sceny, nie odczytuj jednej liczby jako pomiaru.'
        },
        {
          titlePL: 'Temperatura barwowa — przybliżenie McCamy’ego',
          formulaPL: 'n = (x − 0,3320) / (y − 0,1858)\nCCT = −449 n³ + 3525 n² − 6823,3 n + 5520,33',
          textPL: 'Najpierw odwracamy gamma sRGB, potem przechodzimy macierzą na CIE XYZ dla bieli D65 i liczymy chromatyczność x, y. Wzór McCamy’ego jest wiarygodny mniej więcej między 2000 K a 12500 K. Poza tym zakresem sześcian rozjeżdża się, więc wynik jest ucinany i oznaczany jako niewiarygodny — wtedy linia bazowa skali robi się kreskowana i pada zdanie „poza zakresem metody”.'
        },
        {
          titlePL: 'Wpływ na rytm dobowy — współczynnik melanopiczny',
          formulaPL: 'mel = 0,0016 R + 0,3110 G + 0,8460 B\nY = 0,2127 R + 0,7152 G + 0,0722 B\nwynik = (mel / Y) × normalizacja do 1,00 dla neutralnej bieli',
          textPL: 'Wszystkie trzy kanały w wartościach liniowych. Prawdziwa wielkość to całka widma z krzywą czułości melanopsyny (szczyt około 490 nm); aparat ma trzy szerokie kanały, więc ważymy prymarne barwy sRGB czułością melanopiczną przy ich przybliżonych długościach fali (R 612 nm, G 549 nm, B 465 nm). Kierunek zmian jest wiarygodny, wartość bezwzględna nie jest — dlatego przy tej liczbie stoi znak „≈”.'
        },
        {
          titlePL: 'Migotanie',
          formulaPL: 'migotanie = (max − min) / (max + min) × 100%',
          textPL: 'Definicja IES, liczona z okna próbek jasności. Częstotliwość szacujemy z liczby przejść sygnału przez wartość średnią. Próbkowanie 5 Hz widzi modulację tylko poniżej 2,5 Hz (granica Nyquista), a za wiarygodną uznajemy dopiero częstotliwość między 0,2 a 2 Hz przy amplitudzie od 0,5% — poniżej tego progu przejścia przez średnią to szum czujnika, nie pulsowanie źródła.'
        },
        {
          titlePL: 'Równomierność',
          formulaPL: 'równomierność = najciemniejsze pole / najjaśniejsze pole × 100%',
          textPL: 'Wycinek dzielimy na dziewięć pól w siatce 3×3 i porównujemy skrajne. 100% to światło rozłożone idealnie równo. Niska wartość na ekranie oznacza przeświecanie podświetlenia albo odbicie, na biurku — źle ustawioną lampę. To jedyna wielkość, przy której wyżej znaczy lepiej razem z komfortem.'
        },
        {
          titlePL: 'Komfort wzrokowy',
          formulaPL: '100 punktów minus kary:\nrytm dobowy powyżej 0,75 — do 35 pkt\nbarwa powyżej 4000 K — do 25 pkt\nmigotanie powyżej 5% — do 25 pkt\nrównomierność poniżej 60% — do 15 pkt',
          textPL: 'Jedna ocena zamiast sześciu liczb. Wielkość, której nie dało się zmierzyć, nie daje żadnej kary — brak danych nigdy nie udaje dobrego wyniku. Wagi są naszą oceną redakcyjną, nie normą; dlatego moduł 01 pokazuje rozbicie na składniki, żeby dało się z tą oceną nie zgodzić.'
        }
      ],

      rangesTitle: 'Zakresy i progi',
      rangesLead: 'Progi poniżej są tymi, które obowiązują w tej chwili — jeśli zmieniłeś je w module 02, tabela pokazuje twoje wartości, nie fabryczne.',
      colMetric: 'Wielkość',
      colUnit: 'Jednostka',
      colRange: 'Zakres',
      colWarn: 'Uwaga',
      colCrit: 'Krytycznie',
      colDirection: 'Kierunek',
      dirNormal: 'niżej znaczy łagodniej',
      dirInvert: 'wyżej znaczy lepiej',

      privacyTitle: 'Dane i prywatność',
      privacyText: 'Obraz z kamery nigdzie nie jest wysyłany ani zapisywany — z każdej klatki zostają tylko trzy liczby. Pomiary, progi i ustawienia leżą w pamięci przeglądarki na tym urządzeniu. Aplikacja nie wykonuje żadnych zapytań sieciowych i działa w trybie offline.',

      mdrTitle: 'Zastrzeżenie',
      mdrText: 'Żaden wynik nie jest diagnozą ani poradą zdrowotną. Monitor Światła nie jest wyrobem medycznym w rozumieniu rozporządzenia (UE) 2017/745, nie służy do diagnozowania, zapobiegania, monitorowania ani leczenia jakiegokolwiek stanu chorobowego i nie zastępuje badania u lekarza ani optometrysty.',

      freeText: 'Aplikacja jest w całości darmowa i taka zostaje: wszystkie siedem wielkości, historia, raporty, eksport i tryb offline działają bez konta, bez opłat i bez limitów. Kto chce podziękować, znajdzie moduł 10 „Wsparcie”.'
    };

    /* Module 13 needs a few sentences that 8.x does not list. They are added to
       the existing `settings` table rather than to a second one, so a module
       author looking for a settings string finds all of them in one place. */
    var st = S.TEXT.settings;
    if (st) {
      if (!st.appearanceTitle) st.appearanceTitle = 'Wygląd';
      if (!st.motionGroup) st.motionGroup = 'Ruch';
      if (!st.themeHint) st.themeHint = 'Motyw „jak w systemie” zmienia się razem z ustawieniem telefonu.';
      if (!st.textHint) st.textHint = 'Powiększa cały interfejs, nie tylko litery — klawisze i wiersze rosną razem z tekstem.';
      if (!st.motionHint) st.motionHint = 'Wyłącza wszystkie przejścia. Wskazówka skali przeskakuje wtedy raz na sekundę zamiast płynąć.';
      if (!st.dataTitle) st.dataTitle = 'Dane';
      if (!st.clearHintTpl) st.clearHintTpl = 'W historii jest teraz {count} zapisanych punktów.';
      if (!st.clearHintEmpty) st.clearHintEmpty = 'Historia jest pusta.';
      if (!st.clearTitle) st.clearTitle = 'Wyczyścić historię?';
      if (!st.aboutTitle) st.aboutTitle = 'O aplikacji';
      if (!st.versionTpl) st.versionTpl = 'Monitor Światła, wersja {version}.';
      if (!st.offlineText) st.offlineText = 'Aplikacja działa bez sieci. Po pierwszym otwarciu wszystkie jej pliki leżą w pamięci przeglądarki, więc tryb samolotowy niczego nie zmienia. Nic nie jest wysyłane na żaden serwer, bo aplikacja nie wykonuje zapytań sieciowych.';
      if (!st.docsKey) st.docsKey = 'Otwórz dokumentację';
    }
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

  function T(path, vars) {
    var found = resolve(path);
    if (typeof found !== 'string') {
      if (!warned[path]) {
        warned[path] = true;
        if (global.console && global.console.warn) {
          global.console.warn('docs.js: Scale.TEXT has no "' + path + '"');
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
     Tiny DOM helpers
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

  function thresholdsNow() {
    var E = global.Engine;
    if (E && typeof E.getThresholds === 'function') {
      try { return E.getThresholds(); } catch (_) { /* fall through */ }
    }
    return null;
  }

  /* ==================================================================
     Module 12 — Dokumentacja
     ================================================================== */

  function buildDocs(root) {

    /* 1. What it does NOT measure. First, deliberately: an instrument that
          leads with its limits is the whole editorial line of this app. */
    var not = put(root, section(T('docs.notTitle')));
    put(not, bulletList(TLIST('docs.notList')));

    /* 2. What it measures, and how. */
    var what = put(root, section(T('docs.whatTitle')));
    put(what, make('p', '', T('docs.whatLead')));
    put(what, make('p', '', T('docs.whatCrop')));
    put(what, make('p', '', T('docs.whatRate')));

    /* 3. The seven quantities, straight from the catalogue. */
    put(root, metricsSection());

    /* 4. The formulas. */
    put(root, formulasSection());

    /* 5. Ranges and the thresholds in force right now. */
    var ranges = put(root, section(T('docs.rangesTitle')));
    put(ranges, make('p', '', T('docs.rangesLead')));
    put(ranges, rangesTable());

    /* 6. How to measure sensibly — the three points of 8.4, word for word. */
    put(root, howToSection());

    /* 7. Privacy and the disclaimer. */
    var privacy = put(root, section(T('docs.privacyTitle')));
    put(privacy, make('p', '', T('docs.privacyText')));
    put(privacy, make('p', '', T('docs.freeText')));

    put(root, note('limits', T('docs.mdrTitle'), T('docs.mdrText')));
  }

  function metricsSection() {
    var sec = section(T('docs.metricsTitle'));
    var list = put(sec, make('div', 'ms3-doc'));
    var cat = (global.Metrics && global.Metrics.CATALOGUE) || [];

    for (var i = 0; i < cat.length; i += 1) {
      var m = cat[i];
      var item = put(list, make('div', 'ms3-doc__item'));

      var head = put(item, make('div', 'ms3-doc__head'));
      put(head, make('h3', 'ms3-doc__title', m.namePL));
      if (m.id === 'kelvin' || m.id === 'melanopic') {
        put(head, make('span', 'ms3-badge ms3-badge--approx', T('channels.approx')));
      }

      put(item, make('p', 'ms3-doc__text', m.shortPL));
      put(item, make('p', 'ms3-doc__text', m.helpPL));

      var kv = put(item, make('dl', 'ms3-kv'));
      kvRow(kv, T('help.unit'), m.unit);
      kvRow(kv, T('help.range'), rangeWords(m));
      kvRow(kv, T('docs.colDirection'), m.invert ? T('docs.dirInvert') : T('docs.dirNormal'));
    }
    return sec;
  }

  function kvRow(dl, keyPL, valuePL) {
    put(dl, make('dt', 'ms3-kv__key', keyPL));
    put(dl, make('dd', 'ms3-kv__value', valuePL));
  }

  function rangeWords(m) {
    var S = global.Scale;
    var lo = S ? S.formatValue(m.id, m.min) : String(m.min);
    var hi = S ? S.formatValue(m.id, m.max) : String(m.max);
    return lo + ' – ' + hi + ' ' + m.unit;
  }

  function formulasSection() {
    var sec = section(T('docs.formulasTitle'));
    var rows = TLIST('docs.formulas');
    var list = put(sec, make('div', 'ms3-doc'));

    for (var i = 0; i < rows.length; i += 1) {
      var item = put(list, make('div', 'ms3-doc__item'));
      put(item, make('h3', 'ms3-doc__title', rows[i].titlePL));
      // A formula is preformatted text, not a picture: it stays selectable,
      // it survives a screen reader and it scales with the text size setting.
      put(item, make('pre', 'ms3-doc__formula', rows[i].formulaPL));
      put(item, make('p', 'ms3-doc__text', rows[i].textPL));
    }
    return sec;
  }

  function rangesTable() {
    var wrap = make('div', 'ms3-tablewrap');
    var table = put(wrap, make('table', 'ms3-table'));
    put(table, make('caption', 'ms3-sr', T('docs.rangesTitle')));

    var thead = put(table, make('thead'));
    var hr = put(thead, make('tr'));
    var cols = [
      T('docs.colMetric'), T('docs.colUnit'), T('docs.colRange'),
      T('docs.colWarn'), T('docs.colCrit'), T('docs.colDirection')
    ];
    for (var c = 0; c < cols.length; c += 1) {
      var th = put(hr, make('th', null, cols[c]));
      th.setAttribute('scope', 'col');
    }

    var tbody = put(table, make('tbody'));
    var cat = (global.Metrics && global.Metrics.CATALOGUE) || [];
    var th2 = thresholdsNow();
    var S = global.Scale;

    for (var i = 0; i < cat.length; i += 1) {
      var m = cat[i];
      var t = (th2 && th2[m.id]) ? th2[m.id] : { warn: m.warn, crit: m.crit };
      var tr = put(tbody, make('tr'));
      var name = put(tr, make('th', null, m.namePL));
      name.setAttribute('scope', 'row');
      put(tr, make('td', null, m.unit));
      put(tr, make('td', 'ms3-num', rangeWords(m)));
      put(tr, make('td', 'ms3-num', S ? S.formatValue(m.id, t.warn) : String(t.warn)));
      put(tr, make('td', 'ms3-num', S ? S.formatValue(m.id, t.crit) : String(t.crit)));
      put(tr, make('td', null, m.invert ? T('docs.dirInvert') : T('docs.dirNormal')));
    }
    return wrap;
  }

  function howToSection() {
    var sec = section(T('note.howToTitle'));
    var steps = TLIST('note.howTo');
    var list = put(sec, make('ol', 'ms3-steps'));

    for (var i = 0; i < steps.length; i += 1) {
      var li = put(list, make('li', 'ms3-steps__item'));
      // The number is decoration next to a real <ol>, so a screen reader hears
      // the position once, not twice.
      var no = put(li, make('span', 'ms3-steps__no', String(i + 1)));
      no.setAttribute('aria-hidden', 'true');
      var body = put(li, make('span', 'ms3-steps__body'));
      put(body, make('span', 'ms3-steps__title', steps[i].titlePL));
      put(body, make('span', 'ms3-steps__text', steps[i].textPL));
    }
    return sec;
  }

  /* ==================================================================
     Module 13 — Ustawienia
     ================================================================== */

  var settingsView = null;

  function buildSettings(root) {
    var look = put(root, section(T('settings.appearanceTitle')));

    /* Theme. Three states, and "system" is one of them — a two-way switch
       would silently freeze the phone's own dark mode. */
    put(look, segments(
      T('settings.themeLabel'),
      [
        { id: 'system', labelPL: T('settings.themeSystem') },
        { id: 'light', labelPL: T('settings.themeLight') },
        { id: 'dark', labelPL: T('settings.themeDark') }
      ],
      function () { return setting('theme', 'system'); },
      function (id) { if (global.UI3) global.UI3.setTheme(id); },
      T('settings.themeHint')
    ));

    put(look, segments(
      T('settings.textLabel'),
      [
        { id: '1', labelPL: T('settings.text1') },
        { id: '1.15', labelPL: T('settings.text115') },
        { id: '1.3', labelPL: T('settings.text13') }
      ],
      function () { return String(Number(setting('textScale', 1))); },
      function (id) { if (global.UI3) global.UI3.setTextScale(Number(id)); },
      T('settings.textHint')
    ));

    /* Motion. A checkbox, because it is a single yes/no and a real
       <input type="checkbox"> is what a screen reader and a switch control
       both already understand. */
    var motion = put(look, make('div', 'ms3-field'));
    // The legend names the group, the label names the switch. Repeating one
    // sentence in both would make a screen reader say it twice in a row.
    put(motion, make('span', 'ms3-field__label', T('settings.motionGroup')));
    var option = put(motion, make('label', 'ms3-field__option'));
    var box = put(option, make('input', 'ms3-field__check'));
    box.type = 'checkbox';
    box.checked = setting('motion', 'system') === 'reduced';
    put(option, make('span', '', T('settings.motionLabel')));
    box.addEventListener('change', function () {
      if (global.UI3) global.UI3.setMotion(box.checked ? 'reduced' : 'system');
    });
    put(motion, make('p', 'ms3-field__hint', T('settings.motionHint')));

    /* Data. */
    var data = put(root, section(T('settings.dataTitle')));
    var hint = put(data, make('p', 'ms3-field__hint', ''));
    var clearKey = put(data, keyBtn(T('settings.clearLabel'), 'ms3-key--ghost'));
    clearKey.addEventListener('click', openClearSheet);

    /* About. */
    var about = put(root, section(T('settings.aboutTitle')));
    put(about, make('p', '', T('settings.versionTpl', { version: VERSION })));
    put(about, make('p', '', T('settings.offlineText')));
    var toDocs = put(about, keyBtn(T('settings.docsKey'), 'ms3-key--ghost'));
    toDocs.addEventListener('click', function () {
      if (global.UI3 && typeof global.UI3.openScreen === 'function') global.UI3.openScreen('11');
    });

    put(root, note('limits', T('note.titleLimits'), T('docs.privacyText')));

    settingsView = { motion: box, hint: hint };
    renderSettings();

    // The history count changes while the screen is open (a measurement is
    // still running underneath it), so the hint refreshes on the engine's own
    // event rather than on a timer.
    if (global.Bus && typeof global.Bus.on === 'function') {
      global.Bus.on('engine:history', renderSettings);
    }
  }

  function setting(key, fallback) {
    if (global.UI3 && typeof global.UI3.getSetting === 'function') {
      var v = global.UI3.getSetting(key);
      if (v !== undefined && v !== null) return v;
    }
    return fallback;
  }

  function renderSettings() {
    if (!settingsView) return;
    if (settingsView.motion) settingsView.motion.checked = setting('motion', 'system') === 'reduced';

    var E = global.Engine;
    var count = (E && typeof E.historyCount === 'function') ? E.historyCount() : 0;
    if (settingsView.hint) {
      settingsView.hint.textContent = count
        ? T('settings.clearHintTpl', { count: String(count) })
        : T('settings.clearHintEmpty');
    }

    // Segment groups keep their own state; ask each to re-read it.
    for (var i = 0; i < groups.length; i += 1) groups[i]();
  }

  var groups = [];

  /* A range switch (5.13): real buttons, aria-pressed, colour AND an
     underline for the active one, so the state survives greyscale. */
  function segments(labelPL, items, readFn, writeFn, hintPL) {
    var field = make('div', 'ms3-field');
    put(field, make('span', 'ms3-field__label', labelPL));

    var group = put(field, make('div', 'ms3-segments'));
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', labelPL);

    var buttons = [];
    for (var i = 0; i < items.length; i += 1) {
      buttons.push(segmentItem(group, items[i], readFn, writeFn, sync));
    }

    function sync() {
      var current = String(readFn());
      for (var j = 0; j < buttons.length; j += 1) {
        buttons[j].el.setAttribute('aria-pressed', buttons[j].id === current ? 'true' : 'false');
      }
    }

    if (hintPL) put(field, make('p', 'ms3-field__hint', hintPL));
    groups.push(sync);
    sync();
    return field;
  }

  function segmentItem(group, item, readFn, writeFn, sync) {
    var btn = put(group, make('button', 'ms3-segments__item', item.labelPL));
    btn.type = 'button';
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', function () {
      writeFn(item.id);
      sync();
    });
    return { id: String(item.id), el: btn };
  }

  /* Clearing the history is the one destructive action in the whole app, so it
     asks first, in a sheet, with the consequence spelled out (8.5). */
  function openClearSheet() {
    if (!global.UI3 || typeof global.UI3.openSheet !== 'function') return;

    global.UI3.openSheet({
      titlePL: T('settings.clearTitle'),
      build: function (body) {
        put(body, make('p', '', T('settings.clearConfirm')));

        var keys = put(body, make('div', 'ms3-keyrow'));
        var yes = put(keys, keyBtn(T('settings.clearKey'), 'ms3-key--danger'));
        yes.addEventListener('click', function () {
          var E = global.Engine;
          if (E && typeof E.clearHistory === 'function') E.clearHistory();
          global.UI3.closeSheet();
          renderSettings();
          toast(T('transient.historyCleared'));
        });
        var no = put(keys, keyBtn(T('common.cancel'), 'ms3-key--ghost'));
        no.addEventListener('click', function () { global.UI3.closeSheet(); });
      }
    });
  }

  /* ------------------------------------------------------------------
     Registration
     ------------------------------------------------------------------ */

  function register() {
    if (!global.UI3 || typeof global.UI3.registerModule !== 'function') return;
    var meta = (global.Scale && global.Scale.TEXT && global.Scale.TEXT.modules) || {};

    global.UI3.registerModule({
      no: '11',
      titlePL: (meta['11'] && meta['11'].titlePL) || '',
      descPL: (meta['11'] && meta['11'].descPL) || '',
      build: buildDocs
    });

    global.UI3.registerModule({
      no: '12',
      titlePL: (meta['12'] && meta['12'].titlePL) || '',
      descPL: (meta['12'] && meta['12'].descPL) || '',
      build: buildSettings
    });
  }

  if (global.UI3) register();
  else if (global.Bus && typeof global.Bus.once === 'function') global.Bus.once('app:ready', register);

  // Exposed only so boot.js can report "docs.js did not load" by name; nothing
  // in the application calls into it.
  global.Docs = { version: VERSION };

}(window));
