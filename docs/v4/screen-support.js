/* screen-support.js — ekran WSPARCIE (#/support).
 *
 * ROLA PLIKU. Dwie rzeczy w jednym miejscu:
 *   1. WSPARCIE — jedna, dobrowolna prośba o darowiznę i jeden odnośnik
 *      na zewnętrzny profil. Nic tu nie jest sprzedawane, nic się nie odblokowuje
 *      i nic nie jest zamknięte: wszystkie siedem wielkości działa dla każdego
 *      od pierwszego uruchomienia.
 *   2. ustawienia: motyw, paleta, tekst, ruch, pomiar, dane, o aplikacji.
 *
 * Ten plik zastąpił dawny screen-account.js. Razem z nim zniknęły billing.js
 * i auth.js: nie ma już ani symulowanego konta, ani symulowanej płatności,
 * ani arkusza sprzedażowego, który ten plik kiedyś trzymał.
 *
 * Zasady, które ten plik trzyma świadomie:
 *   — ani jednego polskiego literału: każde zdanie pochodzi z UI.T albo Scale.TEXT;
 *   — ani jednego koloru: jedyne wartości barwne to próbki palet z Store.ACCENTS,
 *     wstawiane inline w gradient dysku, bo próbka musi pokazać kolor, którego
 *     akurat nie ma na ekranie (rozdział 5.K specyfikacji);
 *   — żadnego odliczania, żadnego okna z prośbą i żadnej prośby poza tym ekranem;
 *   — ten ekran nie słucha engine:sample, więc nie ma tu gorącej ścieżki 5 Hz.
 */
(function () {
  'use strict';

  var VIEW_ID = 'support';

  /* ────────────────────────────────────────────────────────────
     TU WPISZ ADRES SWOJEGO PROFILU DAROWIZN.
     Przykłady: 'https://buymeacoffee.com/twojanazwa'
                'https://ko-fi.com/twojanazwa'
                'https://paypal.me/twojanazwa'
     Dopóki tu pusto, aplikacja nie pokazuje martwego przycisku — patrz niżej.
     ─────────────────────────────────────────────────────────── */
  var SUPPORT_URL = '';

  /** Jedna linijka walidacji, która chroni przed wklejeniem 'javascript:' albo
   *  literówką w schemacie. Cokolwiek innego niż https:// traktujemy jak brak
   *  adresu — czyli ekran zachowuje się dokładnie tak, jak przy pustej stałej. */
  function supportUrl() {
    var url = typeof SUPPORT_URL === 'string' ? SUPPORT_URL.trim() : '';
    return url.indexOf('https://') === 0 ? url : '';
  }

  /* Ikony siedmiu wielkości — załącznik B specyfikacji. */
  var METRIC_ICON = {
    share: 'droplet',
    brightness: 'sun',
    kelvin: 'thermometer',
    melanopic: 'moon',
    flicker: 'waveform',
    uniformity: 'grid',
    comfort: 'eye'
  };

  var THEME_TEXT = {
    system: 'support.themeSystem',
    light: 'support.themeLight',
    dark: 'support.themeDark'
  };

  var LONG_STEP_MS = 5000; /* engine.js zapisuje jeden punkt historii na 5 s */

  /* Węzły, które odświeżamy bez przebudowy całego ekranu — inaczej klikanie
     przełącznika gubiłoby fokus. */
  var refs = {
    supportHost: null,
    settingsHost: null,
    swatches: {},
    themes: {},
    leadValue: null,
    historyValue: null
  };
  var offs = [];

  /* ------------------------------------------------------------------ */
  /* Słowniki i drobne narzędzia                                         */
  /* ------------------------------------------------------------------ */

  /** Odczyt ze słownika po ścieżce „a.b.c”. Brak klucza to pusty napis,
   *  nigdy wyjątek — ekran ma działać nawet z niepełnym UI.T. */
  function T(path, fallbackPath) {
    var value = read(window.UI && window.UI.T, path);
    if (!value && fallbackPath) value = read(window.UI && window.UI.T, fallbackPath);
    return value || '';
  }

  function read(rootObj, path) {
    if (!rootObj || !path) return '';
    var parts = path.split('.');
    var cur = rootObj;
    for (var i = 0; i < parts.length; i += 1) {
      if (cur === null || typeof cur !== 'object') return '';
      cur = cur[parts[i]];
    }
    return typeof cur === 'string' ? cur : '';
  }

  function S(path) {
    return read(window.Scale && window.Scale.TEXT, path);
  }

  function fill(template, map) {
    if (!template) return '';
    if (window.Scale && typeof Scale.fill === 'function') return Scale.fill(template, map);
    return template;
  }

  function el(tag, className, text) {
    return UI.el(tag, className, text);
  }

  function icon(name, size) {
    return UI.icon(name, size);
  }

  function on(node, event, fn) {
    return UI.on(node, event, fn);
  }

  /** UI.card / UI.sheet oddają obiekt, UI.button i UI.row — węzeł.
   *  Ta funkcja sprowadza jedno i drugie do węzła. */
  function nodeOf(x) {
    if (!x) return null;
    if (x.nodeType === 1) return x;
    if (x.root && x.root.nodeType === 1) return x.root;
    return null;
  }

  function button(spec) {
    return nodeOf(UI.button(spec));
  }

  function toast(text, tone) {
    if (text) UI.toast(text, tone);
  }

  /** UI.dialog oddaje obietnicę; ta funkcja przyjmuje też wynik natychmiastowy,
   *  żeby jedna implementacja okna nie wywracała całego ekranu. */
  function ask(spec, fn) {
    var result = UI.dialog(spec);
    if (result && typeof result.then === 'function') result.then(fn);
    else fn(!!result);
  }

  function dangerRow(spec) {
    var row = nodeOf(UI.row(spec));
    if (row) row.classList.add('ms4-row--danger');
    return row;
  }

  function settings() {
    return (window.Store && Store.get()) || {};
  }

  /* ------------------------------------------------------------------ */
  /* Małe klocki wizualne                                                */
  /* ------------------------------------------------------------------ */

  function note(tone, iconName, title, text) {
    var root = el('div', 'ms4-note ms4-note--' + tone);
    var mark = icon(iconName, 20);
    mark.classList.add('ms4-note__icon');
    root.appendChild(mark);
    var body = el('div', 'ms4-row__text');
    if (title) body.appendChild(el('p', 'ms4-note__title', title));
    body.appendChild(el('p', 'ms4-note__text', text));
    root.appendChild(body);
    return root;
  }

  function openTextSheet(title, text) {
    var body = el('div', 'ms4-stack');
    body.appendChild(el('p', 'ms4-card__subtitle', text));
    UI.sheet({ title: title, size: 'auto', body: body });
  }

  /* ------------------------------------------------------------------ */
  /* A. Wsparcie — jedyna prośba w całej aplikacji                       */
  /* ------------------------------------------------------------------ */

  /** Prośba pokazuje się wyłącznie tutaj, czyli wtedy, gdy użytkownik sam
   *  wejdzie na tę zakładkę. Żadnego okna po N uruchomieniach, żadnego
   *  przerywnika w trakcie pomiaru, żadnego odliczania. */
  function renderSupport() {
    var host = refs.supportHost;
    if (!host) return;
    UI.clear(host);

    host.appendChild(nodeOf(UI.section(T('support.title'))));

    /* 1. Co ta aplikacja daje za darmo. */
    var freeCard = UI.card({ title: T('support.freeTitle'), className: 'ms4-card' });
    var freeBody = freeCard.body || nodeOf(freeCard);
    freeBody.appendChild(el('p', 'ms4-card__subtitle', T('support.freeText')));
    freeBody.appendChild(metricsStrip());
    host.appendChild(nodeOf(freeCard));

    /* 2. Dlaczego jest prośba. 3. Co daje darowizna — wprost: nic. */
    var askCard = UI.card({ title: T('support.whyTitle'), className: 'ms4-card' });
    var askBody = askCard.body || nodeOf(askCard);
    askBody.appendChild(el('p', 'ms4-card__subtitle', T('support.whyText')));
    askBody.appendChild(note('info', 'info', T('support.nothingTitle'), T('support.nothingText')));
    host.appendChild(nodeOf(askCard));

    /* 4. Przycisk (albo spokojna informacja zamiast niego) i zdanie o prywatności. */
    var actionCard = UI.card({ className: 'ms4-card ms4-support__action' });
    var actionBody = actionCard.body || nodeOf(actionCard);
    var url = supportUrl();
    if (url) {
      actionBody.appendChild(donateLink(url));
      actionBody.appendChild(el('p', 'ms4-field__hint', T('support.donateVia')));
    } else {
      actionBody.appendChild(note('limits', 'info', T('support.noUrlTitle'), T('support.noUrlText')));
    }
    /* Zdanie o prywatności stoi przy przycisku niezależnie od tego, czy przycisk
       akurat jest — obietnica aplikacji obowiązuje tak samo w obu przypadkach.
       Przy pustym adresie mówi o nim w czasie przyszłym, żeby ekran nie opisywał
       jako faktu przycisku, którego akapit wyżej właśnie się wyparł. */
    actionBody.appendChild(note('demo', 'shield', T('support.privacy'),
      url ? T('support.privacyNote') : T('support.privacyNotePending')));
    actionBody.appendChild(el('p', 'ms4-muted ms4-center',
      url ? T('support.thanks') : T('support.thanksPending')));
    host.appendChild(nodeOf(actionCard));
  }

  /** Siedem ikon w jednym rzędzie — dowód na zdanie „wszystko działa bez opłat”
   *  pokazany, a nie tylko napisany. Żadna z nich niczego nie otwiera. */
  function metricsStrip() {
    var strip = el('div', 'ms4-row-inline');
    var cat = (window.Metrics && Metrics.CATALOGUE) || [];
    for (var i = 0; i < cat.length; i += 1) {
      var chip = nodeOf(UI.chip({
        label: cat[i].namePL,
        icon: METRIC_ICON[cat[i].id] || 'info',
        tone: 'good'
      }));
      if (chip) strip.appendChild(chip);
    }
    return strip;
  }

  /** Jedyny odnośnik wychodzący poza to urządzenie w całej aplikacji.
   *  Wygląda jak drugorzędny przycisk tej wersji — nie jak cudza naklejka —
   *  a ikona kubka jest nasza, rysowana w ui.js jak każda inna. */
  function donateLink(url) {
    var a = el('a', 'ms4-btn ms4-btn--tonal ms4-btn--md ms4-btn--full');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', T('support.donateAria'));
    var ic = icon('cup', 24);
    ic.classList.add('ms4-btn__icon');
    a.appendChild(ic);
    a.appendChild(el('span', 'ms4-btn__label', T('support.donate')));
    return a;
  }

  /* ------------------------------------------------------------------ */
  /* E. Ustawienia                                                       */
  /* ------------------------------------------------------------------ */

  function renderSettings() {
    var host = refs.settingsHost;
    if (!host) return;
    UI.clear(host);
    refs.swatches = {};
    refs.themes = {};

    host.appendChild(nodeOf(UI.section(T('support.settingsTitle'))));
    host.appendChild(themeCard());
    host.appendChild(accentCard());
    host.appendChild(nodeOf(UI.section(T('support.textMotion', 'support.settingsTitle'))));
    host.appendChild(textMotionCard());
    host.appendChild(nodeOf(UI.section(T('support.measureGroup', 'nav.measure'))));
    host.appendChild(measureCard());
    host.appendChild(nodeOf(UI.section(T('support.dataTitle'))));
    host.appendChild(dataCard());
    host.appendChild(nodeOf(UI.section(T('support.aboutTitle'))));
    host.appendChild(aboutCard());
    syncSettings();
  }

  function themeCard() {
    var card = UI.card({ title: T('support.theme'), className: 'ms4-card' });
    var body = card.body || nodeOf(card);

    var group = el('div', 'ms4-themepick');
    group.setAttribute('role', 'radiogroup');
    group.setAttribute('aria-label', T('support.theme'));

    var themes = (window.Store && Store.THEMES) || [];
    for (var i = 0; i < themes.length; i += 1) {
      (function (theme) {
        var label = T(THEME_TEXT[theme.id]) || theme.namePL || theme.id;
        var option = el('button', 'ms4-themepick__option');
        option.type = 'button';
        option.setAttribute('role', 'radio');
        option.setAttribute('aria-checked', 'false');
        option.setAttribute('aria-label', fill(T('aria.themeTpl'), { name: label }));
        option.appendChild(el('span', 'ms4-themepick__preview ms4-themepick__preview--' + theme.id));
        option.appendChild(el('span', 'ms4-themepick__label', label));
        on(option, 'click', function () {
          Store.set({ theme: theme.id });
          toast(T('toast.themeChanged'), 'info');
        });
        refs.themes[theme.id] = option;
        group.appendChild(option);
      }(themes[i]));
    }
    body.appendChild(group);
    return nodeOf(card);
  }

  function accentCard() {
    var card = UI.card({
      title: T('support.accent'),
      subtitle: T('support.accentSub'),
      className: 'ms4-card'
    });
    var body = card.body || nodeOf(card);

    var group = el('div', 'ms4-swatches');
    group.setAttribute('role', 'radiogroup');
    group.setAttribute('aria-label', T('support.accent'));

    var accents = (window.Store && Store.ACCENTS) || [];
    for (var i = 0; i < accents.length; i += 1) {
      (function (accent) {
        var option = el('button', 'ms4-swatch');
        option.type = 'button';
        option.setAttribute('role', 'radio');
        option.setAttribute('aria-checked', 'false');
        option.setAttribute('aria-label', fill(T('aria.swatchTpl'), { name: accent.namePL }));

        var disc = el('span', 'ms4-swatch__disc');
        var pair = accent.swatch || [];
        /* Jedyne wartości barwne w tym pliku: próbka musi pokazać kolor palety,
           której akurat nie ma na ekranie. Wartości pochodzą ze Store.ACCENTS. */
        if (pair.length > 1) {
          disc.style.backgroundImage = 'linear-gradient(135deg, ' + pair[0] + ', ' + pair[1] + ')';
        } else if (pair.length === 1) {
          disc.style.backgroundColor = pair[0];
        }
        var check = icon('check', 20);
        check.classList.add('ms4-swatch__check');
        disc.appendChild(check);
        option.appendChild(disc);
        option.appendChild(el('span', 'ms4-swatch__label', accent.namePL));

        on(option, 'click', function () {
          Store.set({ accent: accent.id });
          toast(fill(T('toast.accentChangedTpl'), { name: accent.namePL }), 'info');
        });
        refs.swatches[accent.id] = option;
        group.appendChild(option);
      }(accents[i]));
    }
    body.appendChild(group);
    return nodeOf(card);
  }

  function textMotionCard() {
    var card = UI.card({ className: 'ms4-card' });
    var body = card.body || nodeOf(card);
    var s = settings();

    var scale = UI.segmented({
      options: [
        { id: '1', value: '1', label: T('support.textScale1'), labelPL: T('support.textScale1') },
        { id: '1.15', value: '1.15', label: T('support.textScale115'), labelPL: T('support.textScale115') },
        { id: '1.3', value: '1.3', label: T('support.textScale13'), labelPL: T('support.textScale13') }
      ],
      value: String(s.textScale || 1),
      onChange: function (value) {
        Store.set({ textScale: parseFloat(value) || 1 });
        toast(T('toast.saved'), 'good');
      }
    });

    var list = el('div', 'ms4-list ms4-list--inset');
    list.appendChild(nodeOf(UI.row({
      icon: 'text-size',
      title: T('support.textScale'),
      control: nodeOf(scale)
    })));
    list.appendChild(nodeOf(UI.row({
      icon: 'motion',
      title: T('support.motion'),
      subtitle: T('support.motionSub'),
      control: nodeOf(UI['switch']({
        label: T('support.motion'),
        checked: s.motion === 'reduced',
        onChange: function (checked) {
          Store.set({ motion: checked ? 'reduced' : 'auto' });
          toast(T('toast.saved'), 'good');
        }
      }))
    })));
    list.appendChild(nodeOf(UI.row({
      icon: 'vibration',
      title: T('support.haptics'),
      subtitle: T('support.hapticsSub'),
      control: nodeOf(UI['switch']({
        label: T('support.haptics'),
        checked: s.haptics !== false,
        onChange: function (checked) {
          Store.set({ haptics: !!checked });
          toast(T('toast.saved'), 'good');
        }
      }))
    })));
    body.appendChild(list);

    var preview = el('div', 'ms4-card ms4-card--flat');
    preview.appendChild(el('p', 'ms4-muted', T('support.textScalePreview', 'support.textScale')));
    body.appendChild(preview);
    return nodeOf(card);
  }

  function measureCard() {
    var card = UI.card({ className: 'ms4-card' });
    var body = card.body || nodeOf(card);
    var s = settings();

    var list = el('div', 'ms4-list ms4-list--inset');

    var leadRow = nodeOf(UI.row({
      icon: 'target',
      title: T('support.leadMetric'),
      subtitle: T('measure.leadSheetSub'),
      value: leadName(),
      chevron: true,
      onClick: openLeadSheet
    }));
    refs.leadValue = leadRow.querySelector('.ms4-row__value');
    list.appendChild(leadRow);

    list.appendChild(nodeOf(UI.row({
      icon: 'camera-flip',
      title: T('support.camera', 'measure.flip'),
      control: nodeOf(UI.segmented({
        options: [
          {
            id: 'environment', value: 'environment',
            label: T('support.cameraBack', 'measure.flip'), labelPL: T('support.cameraBack', 'measure.flip')
          },
          {
            id: 'user', value: 'user',
            label: T('support.cameraFront', 'measure.flip'), labelPL: T('support.cameraFront', 'measure.flip')
          }
        ],
        value: s.cameraFacing || 'environment',
        onChange: function (value) {
          Store.set({ cameraFacing: value });
          toast(T('toast.saved'), 'good');
        }
      }))
    })));

    list.appendChild(nodeOf(UI.row({
      icon: 'sliders',
      title: T('tools.thresholds'),
      subtitle: S('modules.02.descPL'),
      chevron: true,
      onClick: function () { goTools(); }
    })));
    list.appendChild(nodeOf(UI.row({
      icon: 'calibrate',
      title: T('tools.calibration'),
      subtitle: S('modules.03.descPL'),
      chevron: true,
      onClick: function () { goTools(); }
    })));

    body.appendChild(list);
    return nodeOf(card);
  }

  function goTools() {
    if (window.App && typeof App.go === 'function') App.go('tools');
  }

  function leadName() {
    var s = settings();
    var metric = window.Metrics ? Metrics.byId(s.leadMetric || 'share') : null;
    return metric ? metric.namePL : '';
  }

  /** Wybór wielkości na dużym wskaźniku. Wszystkie siedem stoi na tej liście
   *  na równych prawach — nie ma tu już ani kłódki, ani wielkości nie do wybrania. */
  function openLeadSheet() {
    var body = el('div', 'ms4-stack');
    body.appendChild(el('p', 'ms4-card__subtitle', T('measure.leadSheetSub')));

    var list = el('div', 'ms4-list');
    var catalogue = (window.Metrics && Metrics.CATALOGUE) || [];
    var current = settings().leadMetric || 'share';

    for (var i = 0; i < catalogue.length; i += 1) {
      (function (metric) {
        var control = metric.id === current ? icon('check', 20) : null;
        list.appendChild(nodeOf(UI.row({
          icon: METRIC_ICON[metric.id] || 'measure',
          title: metric.namePL,
          subtitle: metric.shortPL || '',
          control: control,
          chevron: true,
          onClick: function () {
            Store.set({ leadMetric: metric.id });
            toast(fill(T('toast.leadChangedTpl'), { name: metric.namePL }), 'info');
            sheet.close();
          }
        })));
      }(catalogue[i]));
    }
    body.appendChild(list);

    var sheet = UI.sheet({
      title: T('measure.leadSheetTitle'),
      subtitle: T('support.leadMetric'),
      size: 'auto',
      body: body
    });
  }

  function dataCard() {
    var card = UI.card({ className: 'ms4-card' });
    var body = card.body || nodeOf(card);
    var list = el('div', 'ms4-list ms4-list--inset');

    var sizeRow = nodeOf(UI.row({
      icon: 'history',
      title: T('support.historySize', 'history.title'),
      value: historyValueText()
    }));
    refs.historyValue = sizeRow.querySelector('.ms4-row__value');
    list.appendChild(sizeRow);

    list.appendChild(dangerRow({
      icon: 'trash',
      title: T('support.clearHistory'),
      chevron: true,
      onClick: function () {
        ask({
          title: T('support.clearHistory'),
          text: T('confirm.clearHistory'),
          confirm: T('confirm.clearHistoryKey'),
          cancel: T('confirm.cancel'),
          tone: 'danger'
        }, function (ok) {
          if (!ok) return;
          if (window.Engine) Engine.clearHistory();
          toast(S('transient.historyCleared'), 'info');
          updateHistoryValue();
        });
      }
    }));

    list.appendChild(dangerRow({
      icon: 'refresh',
      title: T('support.clearSettings'),
      chevron: true,
      onClick: function () {
        ask({
          title: T('support.clearSettings'),
          text: T('confirm.resetSettings'),
          confirm: T('confirm.reset'),
          cancel: T('confirm.cancel'),
          tone: 'danger'
        }, function (ok) {
          if (!ok) return;
          Store.reset();
          toast(T('support.clearSettingsOk'), 'good');
          renderSettings();
        });
      }
    }));

    body.appendChild(list);
    return nodeOf(card);
  }

  function historyValueText() {
    var count = (window.Engine && typeof Engine.historyCount === 'function') ? Engine.historyCount() : 0;
    var span = (window.Scale && typeof Scale.durationWords === 'function')
      ? Scale.durationWords(count * LONG_STEP_MS)
      : '';
    var tpl = T('support.historySizeTpl');
    if (!tpl) return String(count);
    return fill(tpl, { count: count, span: span });
  }

  function updateHistoryValue() {
    if (refs.historyValue) refs.historyValue.textContent = historyValueText();
  }

  function aboutCard() {
    var card = UI.card({ className: 'ms4-card' });
    var body = card.body || nodeOf(card);
    var list = el('div', 'ms4-list ms4-list--inset');

    list.appendChild(nodeOf(UI.row({
      icon: 'info',
      title: T('support.version'),
      subtitle: T('support.versionSub'),
      value: T('support.versionValue')
    })));
    list.appendChild(nodeOf(UI.row({
      icon: 'book',
      title: T('tools.docs'),
      subtitle: T('tools.docsDesc'),
      chevron: true,
      onClick: function () { goTools(); }
    })));
    list.appendChild(nodeOf(UI.row({
      icon: 'shield',
      title: T('support.privacy'),
      subtitle: T('support.privacyShort'),
      chevron: true,
      onClick: function () { openTextSheet(T('support.privacy'), T('support.privacyText')); }
    })));
    var licenses = T('support.licenses');
    if (licenses) {
      list.appendChild(nodeOf(UI.row({
        icon: 'report',
        title: licenses,
        chevron: true,
        onClick: function () {
          openTextSheet(licenses, T('support.licensesText', 'support.privacyText'));
        }
      })));
    }

    body.appendChild(list);
    body.appendChild(note('limits', 'info', S('note.dashTitle'), S('note.dashText')));
    return nodeOf(card);
  }

  /** Odświeżenie zaznaczeń bez przebudowy — klikanie próbki nie gubi fokusu. */
  function syncSettings() {
    var s = settings();
    var id;
    for (id in refs.themes) {
      if (Object.prototype.hasOwnProperty.call(refs.themes, id)) {
        var themeOn = (s.theme || 'system') === id;
        refs.themes[id].classList[themeOn ? 'add' : 'remove']('is-selected');
        refs.themes[id].setAttribute('aria-checked', themeOn ? 'true' : 'false');
        refs.themes[id].tabIndex = themeOn ? 0 : -1;
      }
    }
    for (id in refs.swatches) {
      if (Object.prototype.hasOwnProperty.call(refs.swatches, id)) {
        var accentOn = (s.accent || 'ocean') === id;
        refs.swatches[id].classList[accentOn ? 'add' : 'remove']('is-selected');
        refs.swatches[id].setAttribute('aria-checked', accentOn ? 'true' : 'false');
        refs.swatches[id].tabIndex = accentOn ? 0 : -1;
      }
    }
    if (refs.leadValue) refs.leadValue.textContent = leadName();
    updateHistoryValue();
  }

  /* ------------------------------------------------------------------ */
  /* Widok                                                               */
  /* ------------------------------------------------------------------ */

  function build(root) {
    /* Klasy hostów są zaczepieniem układu desktopowego (screens.css, 5.Q):
       ustawienia w szerokiej kolumnie, wsparcie w wąskiej obok nich. */
    refs.supportHost = el('div', 'ms4-stack ms4-support__ask');
    root.appendChild(refs.supportHost);

    refs.settingsHost = el('div', 'ms4-stack ms4-support__settings');
    refs.settingsHost.id = 'supportSettings';
    root.appendChild(refs.settingsHost);

    renderSupport();
    renderSettings();
  }

  function enter() {
    if (window.Bus) {
      offs.push(Bus.on('settings:changed', syncSettings));
      offs.push(Bus.on('engine:history', updateHistoryValue));
    }
    syncSettings();
  }

  function leave() {
    for (var i = 0; i < offs.length; i += 1) {
      if (typeof offs[i] === 'function') offs[i]();
    }
    offs = [];
  }

  /* app.js ładuje się PO ekranach (rozdział 0.2), więc przy pierwszym przebiegu
     window.App jeszcze nie istnieje. Rejestrujemy się wtedy w DOMContentLoaded —
     nasz nasłuch stoi w kolejce przed nasłuchem app.js, bo powstał wcześniej. */
  function registerView() {
    if (!window.App || typeof App.registerView !== 'function') return false;
    App.registerView({
      id: VIEW_ID,
      labelPL: T('nav.support'),
      icon: 'cup',
      build: build,
      enter: enter,
      leave: leave
    });
    return true;
  }

  if (!registerView()) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', registerView);
    } else {
      setTimeout(registerView, 0);
    }
  }

}());
