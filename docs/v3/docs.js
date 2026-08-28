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
     Napisy — dopisywane do Scale.TEXT, jedynego domu napisów tej wersji (9.3).

     Rozdział 8 nie ma tabeli dla ekranu dokumentacji; te zdania pochodzą
     z buildDocsScreen wersji v2 (już zredagowanego) i z metrics.js.

     Od wprowadzenia trzydziestu języków to nie są literały, tylko MAPA kluczy
     warstwy językowej — liściem jest klucz w ./i18n/<kod>.js albo, gdy zdanie
     mówi o pomiarze lub o prawie, w ../shared/i18n/<kod>.js. Nazwa wzoru jest
     nazwą wielkości, więc pięć z siedmiu wskazuje wprost na katalog wspólny;
     dwie mają własne, bo dopisują nazwę przybliżenia.

     Scale.registerText zapamiętuje mapę, więc po zmianie języka dokumentacja
     przebuduje się razem z resztą aplikacji.
     ------------------------------------------------------------------ */

  function mdrSentence() {
    var t = global.I18n ? global.I18n.t.bind(global.I18n) : function (k) { return k; };
    return t('legal.noDiagnosis') + ' ' + t('legal.mdr', { app: t('app.name') });
  }

  var TEXT_SHAPE = {

    docs: {

      notTitle: 'docs.notTitle',
      notList: [
        'docs.notList.1', 'docs.notList.2', 'docs.notList.3',
        'docs.notList.4', 'docs.notList.5', 'docs.notList.6'
      ],

      whatTitle: 'docs.whatTitle',
      whatLead: 'docs.whatLead',
      whatCrop: 'docs.whatCrop',
      whatRate: 'docs.whatRate',

      metricsTitle: 'docs.metricsTitle',

      formulasTitle: 'docs.formulasTitle',
      formulas: [
        {
          titlePL: 'metric.share.name',
          formulaPL: 'docs.formula.share.formula',
          textPL: 'docs.formula.share.text'
        },
        {
          titlePL: 'metric.brightness.name',
          formulaPL: 'docs.formula.brightness.formula',
          textPL: 'docs.formula.brightness.text'
        },
        {
          titlePL: 'docs.formula.kelvin.title',
          formulaPL: 'docs.formula.kelvin.formula',
          textPL: 'docs.formula.kelvin.text'
        },
        {
          titlePL: 'docs.formula.melanopic.title',
          formulaPL: 'docs.formula.melanopic.formula',
          textPL: 'docs.formula.melanopic.text'
        },
        {
          titlePL: 'metric.flicker.name',
          formulaPL: 'docs.formula.flicker.formula',
          textPL: 'docs.formula.flicker.text'
        },
        {
          titlePL: 'metric.uniformity.name',
          formulaPL: 'docs.formula.uniformity.formula',
          textPL: 'docs.formula.uniformity.text'
        },
        {
          titlePL: 'metric.comfort.name',
          formulaPL: 'docs.formula.comfort.formula',
          textPL: 'docs.formula.comfort.text'
        }
      ],

      rangesTitle: 'docs.rangesTitle',
      rangesLead: 'docs.rangesLead',
      colMetric: 'col.metric',
      colUnit: 'col.unit',
      colRange: 'col.range',
      /* Nagłówki dwóch kolumn to nazwy stref — te same, które stoją
         na stemplu pulpitu. Klucz wspólny. */
      colWarn: 'zone.warning',
      colCrit: 'zone.critical',
      colDirection: 'col.direction',
      dirNormal: 'docs.dirNormal',
      dirInvert: 'docs.dirInvert',

      privacyTitle: 'docs.privacyTitle',
      privacyText: 'docs.privacyText',

      mdrTitle: 'docs.mdrTitle',
      /* Zdanie o braku diagnozy plus formuła z rozporządzenia (UE) 2017/745.
         Obie części są wspólne dla wszystkich wersji i tłumaczy się je raz. */
      mdrText: mdrSentence,

      freeText: 'docs.freeText'
    },

    /* Moduł 12 potrzebuje kilku zdań, których 8.x nie wymienia. Dokładają się
       do istniejącej tabeli `settings`, a nie do drugiej — autor modułu szuka
       napisu ustawień w jednym miejscu. Scale.registerText nie nadpisuje tego,
       co już w Scale.TEXT stoi, więc kolejność wczytania niczego nie psuje. */
    settings: {
      appearanceTitle: 'settings.appearanceTitle',
      motionGroup: 'settings.motionGroup',
      themeHint: 'settings.themeHint',
      textHint: 'settings.textHint',
      motionHint: 'settings.motionHint',
      dataTitle: 'settings.dataTitle',
      clearHintTpl: 'settings.clearHintTpl',
      clearHintEmpty: 'settings.clearHintEmpty',
      clearTitle: 'settings.clearTitle',
      aboutTitle: 'settings.aboutTitle',
      /* Nazwa aplikacji jest wstawką, a nie częścią zdania: w kilku językach
         stoi w innym przypadku niż mianownik i tłumacz musi móc ją przestawić.
         {version} zostaje niewypełniony — wpisuje go buildSettings. */
      versionTpl: function () {
        var t = global.I18n ? global.I18n.t.bind(global.I18n) : function (k) { return k; };
        return t('settings.versionTpl', { app: t('app.name') });
      },
      offlineText: 'settings.offlineText',
      docsKey: 'settings.docsKey',
      /* Wybór języka. Wszystkie cztery zdania są wspólne dla wersji — v4 i v5
         pytają o to samo tymi samymi słowami. */
      langLabel: 'language.label',
      langHelp: 'language.help',
      langAuto: 'language.auto',
      langAutoHint: 'language.autoHint'
    }
  };

  function installText() {
    var S = global.Scale;
    if (!S || !S.TEXT || S.TEXT.docs) return;
    if (typeof S.registerText === 'function') S.registerText(TEXT_SHAPE);
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
     Nazwy i opisy siedmiu wielkości

     Metrics.CATALOGUE jest wspólny dla v2-v4 i nosi w sobie polskie namePL,
     shortPL i helpPL. Katalogu nie ruszamy, więc napisy bierzemy z warstwy
     językowej (klucze 'metric.<id>.*'); polski z katalogu został ostatnią
     deską ratunku i nigdy nie powinien być widoczny.
     ------------------------------------------------------------------ */

  function mName(m) {
    var S = global.Scale;
    return (m && S && S.metricName) ? S.metricName(m.id) : (m ? m.namePL : '');
  }

  function mShort(m) {
    var S = global.Scale;
    return (m && S && S.metricShort) ? S.metricShort(m.id) : (m ? m.shortPL : '');
  }

  function mHelp(m) {
    var S = global.Scale;
    return (m && S && S.metricHelp) ? S.metricHelp(m.id) : (m ? m.helpPL : '');
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
      put(head, make('h3', 'ms3-doc__title', mName(m)));
      if (m.id === 'kelvin' || m.id === 'melanopic') {
        put(head, make('span', 'ms3-badge ms3-badge--approx', T('channels.approx')));
      }

      put(item, make('p', 'ms3-doc__text', mShort(m)));
      put(item, make('p', 'ms3-doc__text', mHelp(m)));

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
      var name = put(tr, make('th', null, mName(m)));
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
    /* Ekran buduje się od nowa po każdej zmianie języka, więc stan trzymany
       między wywołaniami trzeba wyzerować — inaczej sync() pisałby po węzłach
       poprzedniego wcielenia ekranu. */
    groups = [];

    /* Język — pierwsza sekcja, przed wyglądem: to ona decyduje o tym, w czym
       jest napisana reszta ekranu. */
    put(root, languageSection());

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
    // Raz na życie karty, nie raz na zbudowanie ekranu: po zmianie języka
    // ekran buduje się ponownie, a druga subskrypcja liczyłaby historię dwa
    // razy przy każdej próbce.
    if (!historyWatched && global.Bus && typeof global.Bus.on === 'function') {
      historyWatched = true;
      global.Bus.on('engine:history', renderSettings);
    }
  }

  var historyWatched = false;

  /* ------------------------------------------------------------------
     Wybór języka (moduł 12)

     Trzydzieści pozycji to za dużo na przełącznik segmentowy z 5.13, więc
     tutaj stoi zwykły <select>: jedna kontrolka, którą czytnik ekranu, gest
     przewijania i klawiatura już znają, i która na telefonie otwiera systemową
     listę wyboru. Nazwy języków są ich WŁASNYMI nazwami (endonimami) i celowo
     nie są tłumaczone — listy szuka ten, kto szuka swojego języka.

     Nic się przy tym nie pobiera: wszystkie słowniki leżą już w pamięci
     przeglądarki razem z resztą aplikacji.
     ------------------------------------------------------------------ */

  var AUTO = 'auto';

  function languageSection() {
    var sec = section(T('settings.langLabel'));
    var I18n = global.I18n;

    /* Nagłówek sekcji JEST etykietą listy — druga etykieta nad kontrolką
       powtarzałaby to samo słowo dwa razy pod rząd, a czytnik ekranu
       przeczytałby je dwa razy. Tak samo rozwiązany jest przełącznik ruchu
       niżej: nazwę nosi grupa, nie kontrolka. */
    var heading = sec.firstChild;
    if (heading) heading.id = 'ms3LangTitle';

    var field = put(sec, make('div', 'ms3-field'));

    var select = put(field, make('select', 'ms3-field__input'));
    select.id = 'ms3Lang';
    if (heading) select.setAttribute('aria-labelledby', 'ms3LangTitle');

    var list = (I18n && I18n.LANGUAGES) ? I18n.LANGUAGES : [];
    var auto = put(select, make('option', null, T('settings.langAuto')));
    auto.value = AUTO;
    for (var i = 0; i < list.length; i += 1) {
      var opt = put(select, make('option', null, list[i].endonym));
      opt.value = list[i].code;
      /* lang na <option> mówi czytnikowi ekranu, jakim głosem przeczytać tę
         jedną pozycję — bez tego lista trzydziestu nazw brzmi jak bełkot. */
      opt.setAttribute('lang', list[i].code);
    }

    select.value = (I18n && I18n.isAuto && I18n.isAuto()) ? AUTO
      : ((I18n && I18n.language && I18n.language()) || AUTO);

    select.addEventListener('change', function () {
      if (!I18n || typeof I18n.setLanguage !== 'function') return;
      I18n.setLanguage(select.value === AUTO ? null : select.value);
    });

    /* Dwa akapity, nie jedno zdanie sklejone spacją: pierwszy mówi, czego
       dotyczy lista, drugi — co znaczy jej pierwsza pozycja. */
    put(field, make('p', 'ms3-field__hint', T('settings.langHelp')));
    put(field, make('p', 'ms3-field__hint', T('settings.langAutoHint')));
    return sec;
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
