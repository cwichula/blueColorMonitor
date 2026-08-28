/* Monitor Światła v2 — narzędzia (P4): window.Tools.
 *
 * Written during integration, because the module that was supposed to own the
 * Narzędzia tab never arrived: the shell was building seven empty overlays and
 * an empty list. Everything here follows the same rules as the rest of the app.
 *
 *   1. Measurement is never blocked. Nothing in this file starts, stops or
 *      delays the camera. Two screens (kalibracja, sprawdź mój monitor) READ a
 *      running measurement; neither of them can begin one on its own and
 *      neither interrupts one.
 *   2. This module never gates anything. All seven tools are available to
 *      everybody, always; there is nothing here to ask permission of.
 *   3. Panel, sheet and tab visibility belongs to window.UI. This file writes
 *      `hidden` only on elements it created itself inside its own panels.
 *   4. All arithmetic on readings comes from metrics.js through Engine. The
 *      aggregations below (averages, zone counts, the worst hour) are counting,
 *      not measurement; where a number is an editorial judgement rather than a
 *      standard, the comment says so.
 *
 * Comments are English; not one interface string lives in this file. Wszystkie
 * napisy siedmiu narzędzi leżą w docs/v2/i18n/<kod>.js, a nazwy i jednostki
 * siedmiu wielkości w docs/shared/i18n/<kod>.js. Ten plik zna tylko klucze.
 *
 * Ekrany narzędzi budują się od nowa przy każdym wejściu (RENDERERS reagują na
 * 'ui:viewchange'), więc po zmianie języka wystarczy je odbudować raz —
 * na 'ui:relocalized', czyli po tym, jak powłoka skończy przebudowę własną.
 */
(function (global) {
  'use strict';

  var doc = global.document;
  var Tools = {};

  /* Jedno wejście do warstwy językowej. Bez niej t() oddaje sam klucz:
     ekran wygląda źle, ale stoi i nic nie rzuca. */
  function t(key, params) {
    var I = global.I18n;
    if (I && typeof I.t === 'function') return I.t(key, params);
    return String(key);
  }

  function appName() { return t('app.name'); }

  var DAY_MS = 86400000;
  var HOUR_MS = 3600000;

  var KEY_PROFILES = 'ms2.profiles.v1';
  var KEY_SCHEDULE = 'ms2.schedule.v1';
  var KEY_ALERTS = 'ms2.alerts.v1';
  var KEY_COMPARE = 'ms2.compare.v1';

  /* ------------------------------------------------------------------
     Plumbing — every neighbour is optional
     ------------------------------------------------------------------ */

  function E() { return global.Engine || null; }
  function U() { return global.UI || null; }
  function M() { return global.Metrics || null; }

  function bus() { return global.Bus && typeof global.Bus.emit === 'function' ? global.Bus : null; }

  function emit(name, data) {
    var b = bus();
    if (b) { try { b.emit(name, data || {}); } catch (e) { /* isolated */ } }
  }

  function on(name, cb) {
    var b = bus();
    if (b && typeof b.on === 'function') b.on(name, cb);
  }

  function readJson(key, fallback) {
    try {
      var raw = global.localStorage.getItem(key);
      if (!raw) return fallback;
      var parsed = JSON.parse(raw);
      return parsed === null || parsed === undefined ? fallback : parsed;
    } catch (e) { return fallback; }
  }

  function writeJson(key, value) {
    try { global.localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (e) { return false; }
  }

  function removeKey(key) {
    try { global.localStorage.removeItem(key); } catch (e) { /* ignore */ }
  }

  function toast(message, kind) {
    var u = U();
    if (u && typeof u.toast === 'function') u.toast(message, { kind: kind || 'info' });
  }

  function announce(text, assertive) {
    var u = U();
    if (u && typeof u.announce === 'function') u.announce(text, !!assertive);
  }

  function setting(key) {
    var u = U();
    if (u && typeof u.getSetting === 'function') {
      try { return u.getSetting(key); } catch (e) { return undefined; }
    }
    return undefined;
  }

  /* Katalog wielkości trzyma liczby; nazwy, opisy i jednostki są treścią
     i przychodzą ze słownika wspólnego pod kluczami wyprowadzonymi z id. */
  function metricName(m) { return m ? t('metric.' + m.id + '.name') : ''; }
  function metricUnit(m) { return m ? t('metric.' + m.id + '.unit') : ''; }
  /* Nazwa w środku zdania: osobny klucz, a nie toLowerCase() na nazwie —
     po niemiecku rzeczownik zostaje wielką literą. */
  function metricNameLower(m) { return m ? t('metric.' + m.id + '.nameLower') : ''; }

  /* Zapis liczby po myśli aktywnego języka. Metrics.formatValue jest wspólny
     dla pięciu wersji i zna tylko polski przecinek, więc zostaje siatką
     bezpieczeństwa na wypadek braku Intl. Grupowanie tysięcy wyłączone:
     „5234 K” było i ma zostać jedną liczbą. */
  function fmtValue(metricId, value) {
    var m = M();
    var def = m && typeof m.byId === 'function' ? m.byId(metricId) : null;
    if (typeof value !== 'number' || !isFinite(value)) return '—';
    var I = global.I18n;
    if (def && I && typeof I.number === 'function') {
      var d = typeof def.decimals === 'number' ? def.decimals : 0;
      var out = I.number(value, {
        minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: false
      });
      if (out) return out;
    }
    return m && typeof m.formatValue === 'function' ? m.formatValue(metricId, value) : '—';
  }

  /* Wartość z jednostką — jeden klucz zamiast sklejania w ośmiu miejscach. */
  function valueUnit(m, value) {
    return t('value.withUnit', { value: fmtValue(m.id, value), unit: metricUnit(m) });
  }

  /* Zwykły licznik całkowity (liczba próbek w strefie, numer kroku) w zapisie
     aktywnego języka — bez grupowania tysięcy, tak jak reszta liczb tutaj. */
  function plainNumber(value) {
    var I = global.I18n;
    if (I && typeof I.number === 'function') {
      var out = I.number(Number(value) || 0, { useGrouping: false });
      if (out) return out;
    }
    return String(value);
  }

  function fmtTime(ms) {
    var u = U();
    if (u && typeof u.formatTime === 'function') return u.formatTime(ms);
    return new Date(ms).toISOString().slice(11, 19);
  }

  function fmtDate(ms) {
    var u = U();
    if (u && typeof u.formatDate === 'function') return u.formatDate(ms);
    return new Date(ms).toISOString().slice(0, 10);
  }

  function catalogue() {
    var m = M();
    return m && m.CATALOGUE ? m.CATALOGUE : [];
  }

  function metric(id) {
    var m = M();
    return m && typeof m.byId === 'function' ? m.byId(id) : null;
  }

  /* ------------------------------------------------------------------
     DOM helpers
     ------------------------------------------------------------------ */

  function el(id) {
    try { return doc ? doc.getElementById(id) : null; } catch (e) { return null; }
  }

  function mk(tag, className, text) {
    var node = doc.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function icon(name) {
    var u = U();
    if (u && typeof u.icon === 'function') return u.icon(name);
    var span = mk('span', 'ms-icon ms-icon--' + name);
    span.setAttribute('aria-hidden', 'true');
    return span;
  }

  function clear(node) {
    if (!node) return;
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function btn(id, className, label, iconName, onClick) {
    var b = mk('button', className);
    b.type = 'button';
    if (id) b.id = id;
    if (iconName) b.appendChild(icon(iconName));
    b.appendChild(mk('span', 'ms-btn__label', label));
    if (onClick) b.addEventListener('click', onClick);
    return b;
  }

  function note(kind, title, text) {
    var box = mk('div', 'ms-note ms-note--' + kind);
    box.appendChild(icon(kind === 'warning' ? 'warning' : (kind === 'critical' ? 'critical' : 'info')));
    var body = mk('div', 'ms-note__text');
    if (title) body.appendChild(mk('span', 'ms-note__title', title));
    if (text) body.appendChild(mk('span', null, text));
    box.appendChild(body);
    return box;
  }

  function section(title, sub) {
    var s = mk('section', 'ms-section');
    if (title) {
      var head = mk('div', 'ms-section__head');
      head.appendChild(mk('h2', 'ms-section__title', title));
      if (sub) head.appendChild(mk('p', 'ms-section__sub', sub));
      s.appendChild(head);
    }
    return s;
  }

  function switchRow(id, title, sub, checked, onChange) {
    var label = mk('label', 'ms-switch');
    label.setAttribute('for', id);
    var input = doc.createElement('input');
    input.type = 'checkbox';
    input.className = 'ms-switch__input';
    input.id = id;
    input.checked = !!checked;
    if (onChange) input.addEventListener('change', function () { onChange(input.checked); });
    label.appendChild(input);
    var track = mk('span', 'ms-switch__track');
    track.appendChild(mk('span', 'ms-switch__thumb'));
    label.appendChild(track);
    var text = mk('span', 'ms-switch__text');
    text.appendChild(mk('span', 'ms-switch__label', title));
    if (sub) text.appendChild(mk('span', 'ms-switch__sub', sub));
    label.appendChild(text);
    return label;
  }

  function selectField(id, labelText, options, selected, onChange) {
    var field = mk('div', 'ms-field');
    var label = mk('label', 'ms-field__label', labelText);
    label.setAttribute('for', id);
    field.appendChild(label);
    var wrap = mk('div', 'ms-selectwrap');
    var select = mk('select', 'ms-select');
    select.id = id;
    for (var i = 0; i < options.length; i += 1) {
      var opt = doc.createElement('option');
      opt.value = String(options[i].value);
      opt.textContent = options[i].label;
      if (String(options[i].value) === String(selected)) opt.selected = true;
      select.appendChild(opt);
    }
    if (onChange) select.addEventListener('change', function () { onChange(select.value); });
    wrap.appendChild(select);
    field.appendChild(wrap);
    return field;
  }

  function kv(keyText, valueText) {
    var row = mk('div', 'ms-kv__row');
    row.appendChild(mk('dt', 'ms-kv__key', keyText));
    row.appendChild(mk('dd', 'ms-kv__val', valueText));
    return row;
  }

  function panelHost(panelId) {
    var panel = el(panelId);
    if (!panel) return null;
    var host = panel.querySelector('[data-ms-tools="' + panelId + '"]');
    if (host) { clear(host); return host; }
    host = mk('div', 'ms-section');
    host.setAttribute('data-ms-tools', panelId);
    panel.appendChild(host);
    return host;
  }

  /* ==================================================================
     1. Profiles and thresholds
     ================================================================== */

  /* Built-in profiles are editorial judgements, not standards. "Wieczór" is
     stricter about everything the evidence connects with sleep (melanopic ratio,
     colour temperature, blue share); "Praca" loosens brightness because a well
     lit desk in daylight should not read as a warning all day long. */
  var BUILTIN_PROFILES = [
    {
      id: 'builtin.default', nameKey: 'profile.builtin.default.name',
      descKey: 'profile.builtin.default.desc',
      builtin: true, map: null   // null = Engine.defaultThresholds()
    },
    {
      id: 'builtin.evening', nameKey: 'profile.builtin.evening.name',
      descKey: 'profile.builtin.evening.desc',
      builtin: true,
      map: {
        share: { warn: 20, crit: 26 },
        brightness: { warn: 55, crit: 75 },
        kelvin: { warn: 3400, crit: 4600 },
        melanopic: { warn: 0.45, crit: 0.75 }
      }
    },
    {
      id: 'builtin.work', nameKey: 'profile.builtin.work.name',
      descKey: 'profile.builtin.work.desc',
      builtin: true,
      map: {
        share: { warn: 30, crit: 38 },
        brightness: { warn: 82, crit: 94 },
        kelvin: { warn: 6000, crit: 7200 },
        melanopic: { warn: 1.0, crit: 1.3 },
        flicker: { warn: 6, crit: 14 },
        uniformity: { warn: 70, crit: 45 }
      }
    }
  ];

  function customProfiles() {
    var list = readJson(KEY_PROFILES, []);
    return Array.isArray(list) ? list : [];
  }

  /* Zwracane pozycje mają pola `namePL`/`descPL` — nazwa została z czasów,
     gdy była tam polszczyzna. Dziś stoi w nich napis w AKTYWNYM języku,
     a dla profilu własnego nazwa wpisana ręcznie przez użytkownika: ta jest
     w jego języku i nie podlega tłumaczeniu. */
  Tools.listProfiles = function () {
    var out = [];
    for (var i = 0; i < BUILTIN_PROFILES.length; i += 1) {
      var b = BUILTIN_PROFILES[i];
      out.push({ id: b.id, namePL: t(b.nameKey), descPL: t(b.descKey), builtin: true });
    }
    var custom = customProfiles();
    for (var j = 0; j < custom.length; j += 1) {
      out.push({
        id: custom[j].id, namePL: custom[j].namePL,
        descPL: t('profile.custom.desc', { date: fmtDate(custom[j].at) }),
        builtin: false
      });
    }
    return out;
  };

  function profileMap(id) {
    var engine = E();
    for (var i = 0; i < BUILTIN_PROFILES.length; i += 1) {
      if (BUILTIN_PROFILES[i].id !== id) continue;
      if (BUILTIN_PROFILES[i].map) return BUILTIN_PROFILES[i].map;
      return engine && typeof engine.defaultThresholds === 'function' ? engine.defaultThresholds() : null;
    }
    var custom = customProfiles();
    for (var j = 0; j < custom.length; j += 1) {
      if (custom[j].id === id) return custom[j].map;
    }
    return null;
  }

  Tools.applyProfile = function (id) {
    var engine = E();
    var map = profileMap(id);
    if (!engine || !map || typeof engine.setThresholds !== 'function') return false;
    // 'profile' travels into engine:thresholds so the interface can say where a
    // sudden change of colours came from.
    if (!engine.setThresholds(map, 'profile')) return false;
    var namePL = id;
    var list = Tools.listProfiles();
    for (var i = 0; i < list.length; i += 1) { if (list[i].id === id) namePL = list[i].namePL; }
    emit('tools:profileapplied', { profileId: id, namePL: namePL });
    return true;
  };

  Tools.saveProfile = function (namePL) {
    var engine = E();
    if (!engine || typeof engine.getThresholds !== 'function') return null;
    var name = (namePL || '').replace(/^\s+|\s+$/g, '');
    if (!name) return null;
    var list = customProfiles();
    var entry = {
      id: 'user.' + Date.now().toString(36),
      namePL: name.slice(0, 40),
      map: engine.getThresholds(),
      at: Date.now()
    };
    list.push(entry);
    writeJson(KEY_PROFILES, list);
    return entry;
  };

  Tools.removeProfile = function (id) {
    var list = customProfiles();
    var out = [];
    var removed = false;
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].id === id) { removed = true; continue; }
      out.push(list[i]);
    }
    if (!removed) return false;
    writeJson(KEY_PROFILES, out);
    return true;
  };

  /* ---- the Progi i profile screen ---- */

  function renderThresholds() {
    var host = panelHost('panelThresholds');
    if (!host) return;
    var engine = E();
    var list = catalogue();
    var current = engine && typeof engine.getThresholds === 'function' ? engine.getThresholds() : {};

    host.appendChild(note('info', t('thresholds.noteTitle'), t('thresholds.noteText')));

    /* "Przywróć domyślne" moves ABOVE the sliders. It always existed, but it
       stood underneath roughly 1260px of them, which for the reader is the same
       as not existing. */
    var actions = mk('div', 'ms-row ms-row--end');
    actions.appendChild(btn('btnThresholdsReset', 'ms-btn ms-btn--outline', t('action.resetDefaults'), 'refresh', function () {
      if (engine && typeof engine.resetThresholds === 'function') {
        engine.resetThresholds();
        renderThresholds();
        toast(t('toast.thresholdsReset'), 'info');
      }
    }));
    host.appendChild(actions);

    /* One card per metric instead of fourteen identical sliders in a single
       stack: the pairing of "warning" and "critical" is the thing being edited,
       and in one flat list there was nothing to tell the reader where one
       metric ended and the next began. */
    var sliders = mk('div', 'ms-stack');
    sliders.id = 'thresholdList';
    for (var i = 0; i < list.length; i += 1) {
      var m = list[i];
      var card = mk('div', 'ms-card');
      card.id = 'thCard-' + m.id;
      var cardHead = mk('div', 'ms-card__head');
      cardHead.appendChild(mk('h3', 'ms-card__title', metricName(m)));
      cardHead.appendChild(mk('span', 'ms-spacer'));
      cardHead.appendChild(mk('span', 'ms-card__sub', metricUnit(m)));
      card.appendChild(cardHead);
      card.appendChild(thresholdRow(m, current[m.id] || { warn: m.warn, crit: m.crit }));
      sliders.appendChild(card);
    }
    host.appendChild(sliders);

    /* --- profiles --- */
    var profHead = mk('div', 'ms-section__head');
    profHead.appendChild(mk('h2', 'ms-section__title', t('thresholds.profilesTitle')));
    profHead.appendChild(mk('p', 'ms-section__sub', t('thresholds.profilesSub')));
    host.appendChild(profHead);

    var profiles = mk('div', 'ms-list');
    profiles.id = 'profileList';
    var all = Tools.listProfiles();
    for (var p = 0; p < all.length; p += 1) profiles.appendChild(profileRow(all[p]));
    host.appendChild(profiles);

    var saveCard = mk('div', 'ms-card');
    var field = mk('div', 'ms-field');
    var label = mk('label', 'ms-field__label', t('thresholds.customName'));
    label.setAttribute('for', 'profileNameInput');
    field.appendChild(label);
    var row = mk('div', 'ms-row');
    var input = mk('input', 'ms-input');
    input.type = 'text';
    input.id = 'profileNameInput';
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('placeholder', t('thresholds.customPlaceholder'));
    row.appendChild(input);
    row.appendChild(btn('btnProfileSave', 'ms-btn ms-btn--tonal', t('thresholds.save'), 'check', function () {
      var value = el('profileNameInput') ? el('profileNameInput').value : '';
      if (!value.replace(/^\s+|\s+$/g, '')) {
        toast(t('toast.profileNameMissing'), 'error');
        return;
      }
      var saved = Tools.saveProfile(value);
      if (!saved) return;                       // nothing to save
      toast(t('toast.profileSaved', { name: saved.namePL }), 'success');
      renderThresholds();
    }));
    field.appendChild(row);
    field.appendChild(mk('p', 'ms-help', t('thresholds.saveHelp')));
    saveCard.appendChild(field);
    host.appendChild(saveCard);
  }

  function thresholdRow(m, current) {
    var row = mk('div', 'ms-field');
    row.id = 'thRow-' + m.id;

    // The card heading above already names the metric and its unit.
    row.appendChild(mk('span', 'ms-visually-hidden',
      t('metric.withUnit', { name: metricName(m), unit: metricUnit(m) })));

    // For an inverted metric (higher is better) the warning threshold sits ABOVE
    // the critical one; the labels say which is which so the order never has to
    // be inferred from the slider positions.
    row.appendChild(oneSlider(m, 'thWarn-' + m.id, 'thWarnLabel-' + m.id,
      t('threshold.warn'), t('threshold.warnAria', { name: metricName(m) }),
      current.warn, function (value) { commitThreshold(m, value, null); }));
    row.appendChild(oneSlider(m, 'thCrit-' + m.id, 'thCritLabel-' + m.id,
      t('threshold.crit'), t('threshold.critAria', { name: metricName(m) }),
      current.crit, function (value) { commitThreshold(m, null, value); }));
    return row;
  }

  function sliderStep(m) {
    if (m.id === 'kelvin') return 100;
    if (m.decimals >= 2) return 0.01;
    if (m.decimals === 1) return 0.5;
    return 1;
  }

  /* Caption and current value share one line, the track gets its own — the
     track is 100% wide, so putting all three in one .ms-row wrapped every
     element onto a separate line and made the screen three times as tall. */
  function oneSlider(m, inputId, labelId, caption, ariaLabel, value, onCommit) {
    var wrap = mk('div', null);
    var head = mk('div', 'ms-row');
    var label = mk('label', 'ms-t-cap', caption);
    label.setAttribute('for', inputId);
    head.appendChild(label);
    head.appendChild(mk('span', 'ms-spacer'));

    var input = doc.createElement('input');
    input.type = 'range';
    input.className = 'ms-range';
    input.id = inputId;
    input.min = String(m.min);
    input.max = String(m.max);
    input.step = String(sliderStep(m));
    input.value = String(value);
    /* Etykieta dla czytnika ekranu przychodzi gotowa ze słownika. Wcześniej
       powstawała z podpisu przepuszczonego przez toLowerCase() — zabieg, który
       działa po polsku i psuje niemiecki. */
    input.setAttribute('aria-label', ariaLabel);

    var out = mk('output', 'ms-t-num', valueUnit(m, value));
    out.id = labelId;
    out.setAttribute('for', inputId);

    input.addEventListener('input', function () {
      out.textContent = valueUnit(m, Number(input.value));
    });
    input.addEventListener('change', function () { onCommit(Number(input.value)); });

    head.appendChild(out);
    wrap.appendChild(head);
    wrap.appendChild(input);
    return wrap;
  }

  function commitThreshold(m, warn, crit) {
    var engine = E();
    if (!engine || typeof engine.setThresholds !== 'function') return;
    var patch = {};
    patch[m.id] = {};
    if (warn !== null) patch[m.id].warn = warn;
    if (crit !== null) patch[m.id].crit = crit;
    if (engine.setThresholds(patch, 'user')) return;
    // Rejected: the engine validates all-or-nothing, so the sliders are put back
    // to what is actually in force rather than left showing a value nobody uses.
    toast(t(m.invert ? 'toast.thresholdOrderInverted' : 'toast.thresholdOrder'), 'error');
    syncThresholdInputs();
  }

  function syncThresholdInputs() {
    var engine = E();
    if (!engine || typeof engine.getThresholds !== 'function') return;
    var map = engine.getThresholds();
    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      var m = list[i];
      var th = map[m.id];
      if (!th) continue;
      var w = el('thWarn-' + m.id), c = el('thCrit-' + m.id);
      var wl = el('thWarnLabel-' + m.id), cl = el('thCritLabel-' + m.id);
      if (w) w.value = String(th.warn);
      if (c) c.value = String(th.crit);
      if (wl) wl.textContent = valueUnit(m, th.warn);
      if (cl) cl.textContent = valueUnit(m, th.crit);
    }
  }

  function profileRow(profile) {
    var row = mk('div', 'ms-list__item');
    var iconBox = mk('span', 'ms-list__icon ms-list__icon--accent');
    iconBox.appendChild(icon('tune'));
    row.appendChild(iconBox);
    var text = mk('span', 'ms-list__text');
    text.appendChild(mk('span', 'ms-list__title', profile.namePL));
    text.appendChild(mk('span', 'ms-list__sub', profile.descPL));
    row.appendChild(text);

    var end = mk('span', 'ms-list__end');
    end.appendChild(btn(null, 'ms-btn ms-btn--tonal', t('action.apply'), null, function () {
      if (Tools.applyProfile(profile.id)) {
        syncThresholdInputs();
        toast(t('toast.profileApplied', { name: profile.namePL }), 'success');
      } else {
        toast(t('toast.profileApplyFailed'), 'error');
      }
    }));
    if (!profile.builtin) {
      end.appendChild(btn(null, 'ms-btn ms-btn--text', t('action.delete'), 'trash', function () {
        if (Tools.removeProfile(profile.id)) {
          renderThresholds();
          toast(t('toast.profileRemoved'), 'info');
        }
      }));
    }
    row.appendChild(end);
    return row;
  }

  /* ==================================================================
     2. Schedule
     ================================================================== */

  function defaultSchedule() {
    return {
      enabled: false,
      rules: [
        { id: 'r1', fromMin: 22 * 60, toMin: 6 * 60, profileId: 'builtin.evening' }
      ]
    };
  }

  Tools.getSchedule = function () {
    var s = readJson(KEY_SCHEDULE, null);
    if (!s || typeof s !== 'object' || !Array.isArray(s.rules)) return defaultSchedule();
    return { enabled: !!s.enabled, rules: s.rules.slice() };
  };

  Tools.setSchedule = function (obj) {
    if (!obj || typeof obj !== 'object' || !Array.isArray(obj.rules)) return false;
    var clean = { enabled: !!obj.enabled, rules: [] };
    for (var i = 0; i < obj.rules.length; i += 1) {
      var r = obj.rules[i];
      if (!r || typeof r.fromMin !== 'number' || typeof r.toMin !== 'number') continue;
      clean.rules.push({
        id: r.id || ('r' + i),
        fromMin: Math.max(0, Math.min(1439, Math.round(r.fromMin))),
        toMin: Math.max(0, Math.min(1439, Math.round(r.toMin))),
        profileId: r.profileId || 'builtin.default'
      });
    }
    writeJson(KEY_SCHEDULE, clean);
    return true;
  };

  function nowMinutes() {
    var d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  }

  function ruleCovers(rule, minutes) {
    // A rule that ends before it starts wraps past midnight, which is the
    // common case here (22:00–06:00).
    if (rule.fromMin === rule.toMin) return false;
    if (rule.fromMin < rule.toMin) return minutes >= rule.fromMin && minutes < rule.toMin;
    return minutes >= rule.fromMin || minutes < rule.toMin;
  }

  Tools.activeRule = function () {
    var s = Tools.getSchedule();
    if (!s.enabled) return null;
    var minutes = nowMinutes();
    for (var i = 0; i < s.rules.length; i += 1) {
      if (ruleCovers(s.rules[i], minutes)) return s.rules[i];
    }
    return null;
  };

  var lastScheduleRuleId = null;
  /* What was in force before a rule first took over, so the evening profile can
     be handed back at 06:00. Without this the rule was one-way: "different
     thresholds in the evening" silently became "different thresholds from the
     first evening onwards", and the user saw critical zones in daylight with
     no idea why. */
  var thresholdsBeforeSchedule = null;

  function scheduleTick() {
    var rule = Tools.activeRule();
    var id = rule ? rule.id : null;
    if (id === lastScheduleRuleId) return;
    lastScheduleRuleId = id;
    if (!rule) {
      if (thresholdsBeforeSchedule) {
        var back = thresholdsBeforeSchedule;
        thresholdsBeforeSchedule = null;
        var eng = E();
        if (eng && typeof eng.setThresholds === 'function' && eng.setThresholds(back, 'schedule')) {
          toast(t('toast.scheduleEnded'), 'info');
        }
      }
      return;
    }
    var engine = E();
    var map = profileMap(rule.profileId);
    if (!engine || !map || typeof engine.setThresholds !== 'function') return;
    if (!thresholdsBeforeSchedule && typeof engine.getThresholds === 'function') {
      try { thresholdsBeforeSchedule = engine.getThresholds(); }
      catch (e) { thresholdsBeforeSchedule = null; }
    }
    if (engine.setThresholds(map, 'schedule')) {
      var namePL = rule.profileId;
      var list = Tools.listProfiles();
      for (var i = 0; i < list.length; i += 1) { if (list[i].id === rule.profileId) namePL = list[i].namePL; }
      toast(t('toast.scheduleApplied', { name: namePL }), 'info');
    }
  }

  function minutesToHm(minutes) {
    var h = Math.floor(minutes / 60), m = minutes % 60;
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }

  function hmToMinutes(text) {
    var parts = /^(\d{1,2}):(\d{2})$/.exec(text || '');
    if (!parts) return null;
    var h = Number(parts[1]), m = Number(parts[2]);
    if (h > 23 || m > 59) return null;
    return h * 60 + m;
  }

  function renderSchedule() {
    var host = panelHost('panelSchedule');
    if (!host) return;
    var s = Tools.getSchedule();

    host.appendChild(note('info', t('schedule.noteTitle'), t('schedule.noteText')));

    var card = mk('div', 'ms-card');
    card.appendChild(switchRow('scheduleToggle', t('schedule.toggle'),
      t('schedule.toggleSub'), s.enabled, function (checked) {
        s.enabled = checked;
        Tools.setSchedule(s);
        lastScheduleRuleId = null;
        scheduleTick();
      }));
    host.appendChild(card);

    var rules = mk('div', 'ms-list');
    rules.id = 'scheduleRules';
    if (!s.rules.length) {
      var empty = mk('div', 'ms-empty');
      var emptyIcon = mk('div', 'ms-empty__icon');
      emptyIcon.appendChild(icon('timer'));
      empty.appendChild(emptyIcon);
      empty.appendChild(mk('p', 'ms-empty__title', t('schedule.emptyTitle')));
      empty.appendChild(mk('p', 'ms-empty__text', t('schedule.emptyText')));
      rules.appendChild(empty);
    }
    for (var i = 0; i < s.rules.length; i += 1) rules.appendChild(scheduleRuleRow(s, s.rules[i], i));
    host.appendChild(rules);

    host.appendChild(btn('btnScheduleAdd', 'ms-btn ms-btn--outline ms-btn--block', t('schedule.add'), 'timer', function () {
      var next = Tools.getSchedule();
      next.rules.push({ id: 'r' + Date.now().toString(36), fromMin: 20 * 60, toMin: 23 * 60, profileId: 'builtin.evening' });
      Tools.setSchedule(next);
      renderSchedule();
    }));
  }

  function scheduleRuleRow(schedule, rule, index) {
    var row = mk('div', 'ms-list__item');
    var iconBox = mk('span', 'ms-list__icon ms-list__icon--accent');
    iconBox.appendChild(icon('timer'));
    row.appendChild(iconBox);

    var text = mk('span', 'ms-list__text');
    var fromInput = doc.createElement('input');
    fromInput.type = 'time';
    fromInput.className = 'ms-input';
    fromInput.id = 'scheduleFrom-' + rule.id;
    fromInput.value = minutesToHm(rule.fromMin);
    fromInput.setAttribute('aria-label', t('schedule.fromAria', { n: index + 1 }));

    var toInput = doc.createElement('input');
    toInput.type = 'time';
    toInput.className = 'ms-input';
    toInput.id = 'scheduleTo-' + rule.id;
    toInput.value = minutesToHm(rule.toMin);
    toInput.setAttribute('aria-label', t('schedule.toAria', { n: index + 1 }));

    var times = mk('span', 'ms-row');
    times.appendChild(fromInput);
    times.appendChild(mk('span', 'ms-t-cap', t('schedule.to')));
    times.appendChild(toInput);
    text.appendChild(times);

    var options = [];
    var all = Tools.listProfiles();
    for (var i = 0; i < all.length; i += 1) options.push({ value: all[i].id, label: all[i].namePL });
    text.appendChild(selectField('scheduleProfile-' + rule.id, t('schedule.profile'), options, rule.profileId, function (value) {
      rule.profileId = value;
      Tools.setSchedule(schedule);
      lastScheduleRuleId = null;
    }));

    function commitTimes() {
      var from = hmToMinutes(fromInput.value);
      var to = hmToMinutes(toInput.value);
      if (from === null || to === null) { toast(t('toast.scheduleTimeFormat'), 'error'); return; }
      rule.fromMin = from;
      rule.toMin = to;
      Tools.setSchedule(schedule);
      lastScheduleRuleId = null;
      scheduleTick();
    }
    fromInput.addEventListener('change', commitTimes);
    toInput.addEventListener('change', commitTimes);

    row.appendChild(text);

    var end = mk('span', 'ms-list__end');
    end.appendChild(btn(null, 'ms-btn ms-btn--text', t('action.delete'), 'trash', function () {
      var next = Tools.getSchedule();
      var kept = [];
      for (var j = 0; j < next.rules.length; j += 1) {
        if (next.rules[j].id !== rule.id) kept.push(next.rules[j]);
      }
      next.rules = kept;
      Tools.setSchedule(next);
      renderSchedule();
    }));
    row.appendChild(end);
    return row;
  }

  /* ==================================================================
     3. Exposure alerts
     ================================================================== */

  function defaultAlerts() {
    return { enabled: false, metricId: 'melanopic', level: 'critical', sustainS: 60, sound: true };
  }

  Tools.getAlerts = function () {
    var a = readJson(KEY_ALERTS, null);
    if (!a || typeof a !== 'object') return defaultAlerts();
    var d = defaultAlerts();
    return {
      enabled: !!a.enabled,
      metricId: metric(a.metricId) ? a.metricId : d.metricId,
      level: a.level === 'warning' ? 'warning' : 'critical',
      sustainS: typeof a.sustainS === 'number' && a.sustainS >= 5 ? Math.min(3600, Math.round(a.sustainS)) : d.sustainS,
      sound: a.sound !== false
    };
  };

  Tools.setAlerts = function (cfg) {
    if (!cfg || typeof cfg !== 'object') return false;
    var current = Tools.getAlerts();
    var next = {
      enabled: cfg.enabled === undefined ? current.enabled : !!cfg.enabled,
      metricId: metric(cfg.metricId) ? cfg.metricId : current.metricId,
      level: cfg.level === 'warning' || cfg.level === 'critical' ? cfg.level : current.level,
      sustainS: typeof cfg.sustainS === 'number' && cfg.sustainS >= 5 ? Math.min(3600, Math.round(cfg.sustainS)) : current.sustainS,
      sound: cfg.sound === undefined ? current.sound : !!cfg.sound
    };
    writeJson(KEY_ALERTS, next);
    alertSince = 0;
    return true;
  };

  var alertSince = 0;          // when the watched zone was first entered
  var alertFiredAt = 0;

  // Editorial judgement: one alert per two minutes at most. An alarm that
  // repeats every sample is an alarm people switch off for good.
  var ALERT_COOLDOWN_MS = 120000;

  function zoneRank(zone) {
    return zone === 'critical' ? 2 : (zone === 'warning' ? 1 : 0);
  }

  function onSampleForAlerts(reading) {
    if (!reading || !reading.zones) return;
    var cfg = Tools.getAlerts();
    if (!cfg.enabled) { alertSince = 0; return; }
    var wanted = cfg.level === 'warning' ? 1 : 2;
    var rank = zoneRank(reading.zones[cfg.metricId]);
    if (rank < wanted) { alertSince = 0; return; }
    if (!alertSince) { alertSince = reading.t; return; }
    if (reading.t - alertSince < cfg.sustainS * 1000) return;
    if (Date.now() - alertFiredAt < ALERT_COOLDOWN_MS) return;
    alertFiredAt = Date.now();
    fireAlert(cfg, reading);
  }

  function fireAlert(cfg, reading) {
    var m = metric(cfg.metricId);
    var value = reading.values ? reading.values[cfg.metricId] : null;
    /* Dwa całe zdania w słowniku zamiast jednego z wklejoną nazwą strefy:
       po polsku strefa stoi tu w bierniku, a szyk innych języków bywa inny. */
    var messagePL = t(cfg.level === 'warning' ? 'alerts.message.warning' : 'alerts.message.critical', {
      name: m ? metricName(m) : cfg.metricId,
      seconds: Math.round((reading.t - alertSince) / 1000),
      value: fmtValue(cfg.metricId, value),
      unit: m ? metricUnit(m) : ''
    });

    emit('tools:alert', { metricId: cfg.metricId, level: cfg.level, messagePL: messagePL });
    showAlertBar(messagePL);
    toast(messagePL, 'error');
    if (cfg.sound && setting('sound') !== false) beep();
    if (setting('vibrate') !== false) {
      try { if (global.navigator && global.navigator.vibrate) global.navigator.vibrate([120, 80, 120]); }
      catch (e) { /* unsupported: silence is an acceptable degradation */ }
    }
    // The measurement keeps running. An alert that stopped the camera would
    // destroy the very data the user asked to be warned about.
  }

  /* A short sine burst built with WebAudio. No file, no network, and it is only
     ever produced as a direct consequence of an alert the user switched on. */
  function beep() {
    try {
      var Ctx = global.AudioContext || global.webkitAudioContext;
      if (!Ctx) return;
      var ctx = new Ctx();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 660;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.36);
      osc.onended = function () { try { ctx.close(); } catch (e) { /* ignore */ } };
    } catch (e) { /* autoplay policy or no audio device: not worth a message */ }
  }

  function ensureAlertBar() {
    var bar = el('alertBar');
    if (bar) return bar;
    var u = U();
    bar = mk('div', 'ms-note ms-note--critical');
    bar.id = 'alertBar';
    bar.hidden = true;
    bar.setAttribute('role', 'status');
    bar.appendChild(icon('warning'));
    var text = mk('div', 'ms-note__text');
    text.appendChild(mk('span', 'ms-note__title', t('alerts.barTitle')));
    text.appendChild(mk('span', null, ''));
    bar.appendChild(text);
    bar.appendChild(btn(null, 'ms-btn ms-btn--text', t('action.hide'), 'close', function () { bar.hidden = true; }));
    // Mounted at the end of the measurement screen: never above the controls,
    // never covering the camera.
    if (u && typeof u.mount === 'function') u.mount('panelMeasure', bar);
    else if (el('panelMeasure')) el('panelMeasure').appendChild(bar);
    return bar;
  }

  function showAlertBar(messagePL) {
    var bar = ensureAlertBar();
    if (!bar) return;
    var spans = bar.querySelectorAll('.ms-note__text > span');
    if (spans.length > 1) spans[1].textContent = messagePL;
    bar.hidden = false;
  }

  function renderAlerts() {
    var host = panelHost('panelAlerts');
    if (!host) return;
    var cfg = Tools.getAlerts();

    host.appendChild(note('info', t('alerts.noteTitle'), t('alerts.noteText')));

    var card = mk('div', 'ms-card');
    card.appendChild(switchRow('alertsToggle', t('alerts.toggle'),
      t('alerts.toggleSub'), cfg.enabled, function (checked) {
        Tools.setAlerts({ enabled: checked });
      }));

    var metricOptions = [];
    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      metricOptions.push({ value: list[i].id, label: metricName(list[i]) });
    }
    card.appendChild(selectField('alertsMetricSelect', t('alerts.metric'), metricOptions, cfg.metricId, function (value) {
      Tools.setAlerts({ metricId: value });
    }));

    card.appendChild(selectField('alertsLevelSelect', t('alerts.level'), [
      { value: 'warning', label: t('alerts.level.warning') },
      { value: 'critical', label: t('alerts.level.critical') }
    ], cfg.level, function (value) { Tools.setAlerts({ level: value }); }));

    var field = mk('div', 'ms-field');
    var label = mk('label', 'ms-field__label', t('alerts.sustain'));
    label.setAttribute('for', 'alertsSustainInput');
    field.appendChild(label);
    var input = doc.createElement('input');
    input.type = 'number';
    input.className = 'ms-input';
    input.id = 'alertsSustainInput';
    input.min = '5';
    input.max = '3600';
    input.step = '5';
    input.value = String(cfg.sustainS);
    input.addEventListener('change', function () {
      Tools.setAlerts({ sustainS: Number(input.value) });
    });
    field.appendChild(input);
    field.appendChild(mk('p', 'ms-help', t('alerts.sustainHelp')));
    card.appendChild(field);

    card.appendChild(switchRow('alertsSoundToggle', t('alerts.sound'),
      t('alerts.soundSub'),
      cfg.sound, function (checked) { Tools.setAlerts({ sound: checked }); }));

    host.appendChild(card);
  }

  /* ==================================================================
     4. A/B comparison
     ================================================================== */

  function compareState() {
    var c = readJson(KEY_COMPARE, null);
    return c && typeof c === 'object' ? c : { A: null, B: null };
  }

  Tools.getCompare = function () { return compareState(); };

  Tools.captureCompareSlot = function (slot) {
    if (slot !== 'A' && slot !== 'B') return null;
    var engine = E();
    if (!engine || typeof engine.snapshot !== 'function') return null;
    var snap = engine.snapshot(t(slot === 'A' ? 'compare.slotA' : 'compare.slotB'));
    if (!snap) return null;                    // nothing measured yet
    var state = compareState();
    state[slot] = snap;
    writeJson(KEY_COMPARE, state);
    emit('tools:compare', { slot: slot, snapshot: snap });
    return snap;
  };

  Tools.clearCompare = function () {
    removeKey(KEY_COMPARE);
    emit('tools:compare', { slot: null, snapshot: null });
  };

  /* The verdict deliberately names the metric it used. "B jest łagodniejsze"
     with no reason would be an opinion; with a reason it is a reading the user
     can check on the tiles. */
  function compareVerdict(state) {
    if (!state.A || !state.B) return null;
    var key = 'comfort';
    var a = state.A.values ? state.A.values.comfort : null;
    var b = state.B.values ? state.B.values.comfort : null;
    var higherIsBetter = true;
    if (typeof a !== 'number' || typeof b !== 'number') {
      key = 'melanopic';
      a = state.A.values ? state.A.values.melanopic : null;
      b = state.B.values ? state.B.values.melanopic : null;
      higherIsBetter = false;
    }
    var m = metric(key);
    if (typeof a !== 'number' || typeof b !== 'number' || !m) {
      return { textPL: t('compare.notEnough'), metricId: null };
    }
    var diff = Math.abs(a - b);
    var span = Math.max(1e-6, m.max - m.min);
    if (diff / span < 0.03) {
      return {
        metricId: key,
        textPL: t('compare.tie', {
          metric: metricNameLower(m), a: fmtValue(key, a), b: fmtValue(key, b), unit: metricUnit(m)
        })
      };
    }
    /* Osobny klucz dla A i dla B zamiast wstawiania litery w środek zdania:
       w części języków zdanie zaczyna się od tego, co jest lepsze. */
    var betterIsA = higherIsBetter ? a > b : a < b;
    return {
      metricId: key,
      textPL: t(betterIsA ? 'compare.betterA' : 'compare.betterB', {
        metric: metricNameLower(m),
        better: fmtValue(key, betterIsA ? a : b),
        worse: fmtValue(key, betterIsA ? b : a),
        unit: metricUnit(m)
      })
    };
  }

  function renderCompare() {
    var host = panelHost('panelCompare');
    if (!host) return;
    var state = compareState();

    host.appendChild(note('info', t('compare.noteTitle'), t('compare.noteText')));

    var grid = mk('div', 'ms-grid');
    grid.appendChild(compareCard('A', 'compareSlotA', 'btnCaptureA', state.A));
    grid.appendChild(compareCard('B', 'compareSlotB', 'btnCaptureB', state.B));
    host.appendChild(grid);

    var wrap = mk('div', 'ms-tablewrap');
    var table = mk('table', 'ms-table');
    table.id = 'compareTable';
    var thead = mk('thead', null);
    var htr = mk('tr', null);
    var h0 = mk('th', null, t('table.metric')); h0.setAttribute('scope', 'col');
    var h1 = mk('th', null, t('compare.slotA')); h1.setAttribute('scope', 'col');
    var h2 = mk('th', null, t('compare.slotB')); h2.setAttribute('scope', 'col');
    htr.appendChild(h0); htr.appendChild(h1); htr.appendChild(h2);
    thead.appendChild(htr);
    table.appendChild(thead);

    var tbody = mk('tbody', null);
    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      var m = list[i];
      var tr = mk('tr', null);
      var th = mk('th', null, metricName(m));
      th.setAttribute('scope', 'row');
      tr.appendChild(th);
      tr.appendChild(compareCell(state.A, m));
      tr.appendChild(compareCell(state.B, m));
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    wrap.appendChild(table);
    host.appendChild(wrap);

    var verdict = mk('div', 'ms-card ms-card--accent');
    verdict.id = 'compareVerdict';
    var v = compareVerdict(state);
    verdict.appendChild(mk('h3', 'ms-card__title', t('compare.verdictTitle')));
    verdict.appendChild(mk('p', 'ms-card__sub', v ? v.textPL : t('compare.verdictEmpty')));
    host.appendChild(verdict);

    host.appendChild(btn('btnCompareClear', 'ms-btn ms-btn--outline ms-btn--block', t('compare.clear'), 'trash', function () {
      Tools.clearCompare();
      renderCompare();
      toast(t('toast.compareCleared'), 'info');
    }));
  }

  function compareCard(slot, cardId, buttonId, snapshot) {
    var card = mk('div', 'ms-card');
    card.id = cardId;
    var head = mk('div', 'ms-card__head');
    head.appendChild(mk('h3', 'ms-card__title', t(slot === 'A' ? 'compare.slotA' : 'compare.slotB')));
    card.appendChild(head);
    card.appendChild(mk('p', 'ms-card__sub', snapshot
      ? t('compare.savedAt', { date: fmtDate(snapshot.at), time: fmtTime(snapshot.at) })
      : t('compare.empty')));
    card.appendChild(btn(buttonId, 'ms-btn ms-btn--tonal ms-btn--block', t('compare.save'), 'camera', function () {
      var engine = E();
      if (!engine || typeof engine.isRunning !== 'function' || !engine.isRunning()) {
        toast(t('toast.measureFirst'), 'error');
        return;
      }
      var snap = Tools.captureCompareSlot(slot);
      if (!snap) return;
      renderCompare();
      toast(t(slot === 'A' ? 'toast.compareSavedA' : 'toast.compareSavedB'), 'success');
    }));
    return card;
  }

  function compareCell(snapshot, m) {
    var td = mk('td', null);
    if (!snapshot || !snapshot.values) { td.textContent = '—'; return td; }
    var value = snapshot.values[m.id];
    td.textContent = fmtValue(m.id, value);
    var zone = snapshot.zones ? snapshot.zones[m.id] : null;
    if (zone) td.setAttribute('data-zone', zone);
    return td;
  }

  /* ==================================================================
     5. White-card calibration
     ================================================================== */

  var CALIB_MS = 3000;
  var calibrating = false;

  Tools.calibrationInfo = function () {
    var engine = E();
    var cal = engine && typeof engine.getCalibration === 'function' ? engine.getCalibration() : null;
    if (!cal) return { calibrated: false, at: null, gains: null };
    return { calibrated: true, at: cal.at, gains: { r: cal.gainR, g: cal.gainG, b: cal.gainB } };
  };

  Tools.clearCalibration = function () {
    var engine = E();
    if (engine && typeof engine.setCalibration === 'function') engine.setCalibration(null);
    renderCalibration();
  };

  /* Three seconds of a white sheet under the light being measured. The gains
     equalise the three channel means; this is the ONE feature in the app that
     genuinely improves accuracy, and the copy says exactly that and no more —
     it removes a fixed sensor bias, it does not turn a camera into a
     spectrometer. */
  Tools.startCalibration = function () {
    var engine = E();
    if (!engine || typeof engine.latest !== 'function') {
      return Promise.resolve({ ok: false, messagePL: t('calib.error.noEngine') });
    }
    if (typeof engine.isRunning !== 'function' || !engine.isRunning()) {
      return Promise.resolve({ ok: false, messagePL: t('calib.error.notRunning') });
    }
    if (calibrating) {
      return Promise.resolve({ ok: false, messagePL: t('calib.error.busy') });
    }

    calibrating = true;
    return new Promise(function (resolve) {
      var sumR = 0, sumG = 0, sumB = 0, n = 0;
      var startedAt = Date.now();
      var progress = el('calibProgress');
      var fill = progress ? progress.querySelector('.ms-progress__fill') : null;

      var timer = global.setInterval(function () {
        var reading = engine.latest();
        if (reading) { sumR += reading.r; sumG += reading.g; sumB += reading.b; n += 1; }
        var elapsed = Date.now() - startedAt;
        if (fill) fill.style.setProperty('--ms-fill', String(Math.min(100, Math.round((elapsed / CALIB_MS) * 100))));
        if (elapsed < CALIB_MS) return;

        global.clearInterval(timer);
        calibrating = false;
        if (n < 5) {
          resolve({ ok: false, messagePL: t('calib.error.tooFewSamples') });
          renderCalibration();
          return;
        }
        var r = sumR / n, g = sumG / n, b = sumB / n;
        if (r < 8 || g < 8 || b < 8) {
          resolve({ ok: false, messagePL: t('calib.error.tooDark') });
          renderCalibration();
          return;
        }
        var target = (r + g + b) / 3;
        var ok = engine.setCalibration({ gainR: target / r, gainG: target / g, gainB: target / b, at: Date.now() });
        if (!ok) {
          resolve({ ok: false, messagePL: t('calib.error.tooSkewed') });
          renderCalibration();
          return;
        }
        renderCalibration();
        resolve({ ok: true, messagePL: t('calib.ok') });
      }, 200);
    });
  };

  function renderCalibration() {
    var host = panelHost('panelCalibration');
    if (!host) return;
    var info = Tools.calibrationInfo();

    host.appendChild(note('info', t('calib.noteTitle'), t('calib.noteText')));

    var steps = mk('div', 'ms-list');
    steps.appendChild(calibStep(1, t('calib.step1')));
    steps.appendChild(calibStep(2, t('calib.step2')));
    steps.appendChild(calibStep(3, t('calib.step3')));
    host.appendChild(steps);

    var card = mk('div', 'ms-card');
    var status = mk('p', 'ms-t-body');
    status.id = 'calibStatus';
    status.textContent = info.calibrated
      ? t('calib.done', { date: fmtDate(info.at), time: fmtTime(info.at) })
      : t('calib.none');
    card.appendChild(status);

    var progress = mk('div', 'ms-progress');
    progress.id = 'calibProgress';
    var fill = mk('div', 'ms-progress__fill');
    fill.style.setProperty('--ms-fill', '0');
    progress.appendChild(fill);
    card.appendChild(progress);

    var result = mk('div', 'ms-kv');
    result.id = 'calibResult';
    if (info.calibrated) {
      /* R, G i B to nazwy kanałów sRGB, nie słowa — zostają jak są, a zmienia
         się tylko zdanie wokół nich. Sama liczba idzie przez zapis aktywnego
         języka, tak jak każda inna liczba w aplikacji. */
      result.appendChild(kv(t('calib.gain', { channel: 'R' }), gainText(info.gains.r)));
      result.appendChild(kv(t('calib.gain', { channel: 'G' }), gainText(info.gains.g)));
      result.appendChild(kv(t('calib.gain', { channel: 'B' }), gainText(info.gains.b)));
    } else {
      result.appendChild(kv(t('calib.gainsLabel'), t('calib.gainsUnset')));
    }
    card.appendChild(result);

    var actions = mk('div', 'ms-card__actions');
    actions.appendChild(btn('btnCalibStart', 'ms-btn ms-btn--filled', t('calib.start'), 'refresh', function () {
      var button = el('btnCalibStart');
      var u = U();
      if (u && typeof u.setBusy === 'function') u.setBusy(button, true);
      Tools.startCalibration().then(function (res) {
        var b2 = el('btnCalibStart');
        if (u && typeof u.setBusy === 'function' && b2) u.setBusy(b2, false);
        toast(res.messagePL, res.ok ? 'success' : 'error');
      });
    }));
    actions.appendChild(btn('btnCalibClear', 'ms-btn ms-btn--outline', t('calib.clear'), 'trash', function () {
      Tools.clearCalibration();
      toast(t('toast.calibCleared'), 'info');
    }));
    card.appendChild(actions);
    host.appendChild(card);
  }

  function gainText(value) {
    var I = global.I18n;
    if (I && typeof I.number === 'function') {
      var out = I.number(value, { minimumFractionDigits: 3, maximumFractionDigits: 3, useGrouping: false });
      if (out) return out;
    }
    return value.toFixed(3);
  }

  /* Numer kroku jest liczbą, nie napisem: w arabskim i hindi ma się zapisać
     cyframi tego pisma. */
  function stepNumber(n) {
    var I = global.I18n;
    return (I && typeof I.number === 'function') ? I.number(n) : String(n);
  }

  function calibStep(number, title) {
    var row = mk('div', 'ms-list__item');
    row.appendChild(mk('span', 'ms-list__icon ms-list__icon--accent', stepNumber(number)));
    var text = mk('span', 'ms-list__text');
    text.appendChild(mk('span', 'ms-list__title', title));
    row.appendChild(text);
    return row;
  }

  /* ==================================================================
     6. "Sprawdź mój monitor" wizard
     ================================================================== */

  /* Same identyfikatory kroków; tytuł i podpowiedź wyprowadzamy z klucza,
     żeby lista nie trzymała gotowych napisów w jednym języku. */
  var SCREEN_STEPS = ['white100', 'white20', 'corners', 'nightOff', 'nightOn'];

  function stepTitleOf(key) { return t('screencheck.step.' + key + '.title'); }
  function stepHintOf(key) { return t('screencheck.step.' + key + '.hint'); }

  var screenCheck = { index: -1, results: [] };

  Tools.startScreenCheck = function () {
    screenCheck = { index: 0, results: [] };
    renderScreenCheck();
    return SCREEN_STEPS[0];
  };

  Tools.cancelScreenCheck = function () {
    screenCheck = { index: -1, results: [] };
    renderScreenCheck();
  };

  Tools.screenCheckNext = function () {
    if (screenCheck.index < 0) return null;
    var engine = E();
    if (!engine || typeof engine.snapshot !== 'function') return null;
    var step = SCREEN_STEPS[screenCheck.index];
    var snap = engine.snapshot(stepTitleOf(step));
    if (!snap) return null;
    screenCheck.results.push({ key: step, titlePL: stepTitleOf(step), snapshot: snap });

    var next = screenCheck.index + 1;
    if (next >= SCREEN_STEPS.length) {
      screenCheck.index = -1;
      renderScreenCheck();
      return null;
    }
    screenCheck.index = next;
    renderScreenCheck();
    return SCREEN_STEPS[next];
  };

  Tools.screenCheckResult = function () {
    if (!screenCheck.results.length) return null;
    var out = { steps: [], notesPL: [] };
    var byKey = {};
    for (var i = 0; i < screenCheck.results.length; i += 1) {
      var r = screenCheck.results[i];
      byKey[r.key] = r.snapshot;
      out.steps.push({ key: r.key, titlePL: r.titlePL, values: r.snapshot.values });
    }
    if (byKey.corners && typeof byKey.corners.values.uniformity === 'number') {
      var u = byKey.corners.values.uniformity;
      out.notesPL.push(t(u < 60 ? 'screencheck.note.uniformityLow' : 'screencheck.note.uniformityOk',
        { value: fmtValue('uniformity', u) }));
    }
    if (byKey.nightOn && byKey.nightOff) {
      var on = byKey.nightOn.values.share, off = byKey.nightOff.values.share;
      if (typeof on === 'number' && typeof off === 'number') {
        var drop = off - on;
        out.notesPL.push(drop > 3
          ? t('screencheck.note.nightWorks', { value: fmtValue('share', drop) })
          : t('screencheck.note.nightWeak', { value: fmtValue('share', Math.abs(drop)) }));
      }
    }
    if (byKey.white100 && byKey.white20) {
      var f100 = byKey.white100.values.flicker, f20 = byKey.white20.values.flicker;
      if (typeof f100 === 'number' && typeof f20 === 'number' && f20 > f100 + 3) {
        out.notesPL.push(t('screencheck.note.pwm', {
          from: fmtValue('flicker', f100), to: fmtValue('flicker', f20)
        }));
      }
    }
    return out;
  };

  function renderScreenCheck() {
    var host = panelHost('panelScreenCheck');
    if (!host) return;
    var running = screenCheck.index >= 0;

    host.appendChild(note('info', t('screencheck.noteTitle'), t('screencheck.noteText')));

    var card = mk('div', 'ms-card');
    var stepTitle = mk('h3', 'ms-card__title');
    stepTitle.id = 'screenCheckStep';
    var hint = mk('p', 'ms-card__sub');
    hint.id = 'screenCheckHint';

    if (running) {
      var step = SCREEN_STEPS[screenCheck.index];
      stepTitle.textContent = t('screencheck.stepHeading', {
        n: screenCheck.index + 1, total: SCREEN_STEPS.length, title: stepTitleOf(step)
      });
      hint.textContent = stepHintOf(step);
    } else {
      stepTitle.textContent = t('screencheck.idleTitle');
      hint.textContent = t('screencheck.idleHint');
    }
    card.appendChild(stepTitle);
    card.appendChild(hint);

    var actions = mk('div', 'ms-card__actions');
    if (running) {
      actions.appendChild(btn('btnScreenNext', 'ms-btn ms-btn--filled', t('screencheck.next'), 'check', function () {
        var engine = E();
        if (!engine || typeof engine.isRunning !== 'function' || !engine.isRunning()) {
          toast(t('toast.measureFirst'), 'error');
          return;
        }
        if (!Tools.screenCheckNext()) {
          toast(t('toast.screencheckDone'), 'success');
        }
      }));
      actions.appendChild(btn('btnScreenCancel', 'ms-btn ms-btn--text', t('screencheck.cancel'), 'close', function () {
        Tools.cancelScreenCheck();
      }));
    } else {
      actions.appendChild(btn('btnScreenNext', 'ms-btn ms-btn--filled', t('screencheck.start'), 'play', function () {
        Tools.startScreenCheck();
      }));
      actions.appendChild(btn('btnScreenCancel', 'ms-btn ms-btn--text', t('screencheck.clearResult'), 'trash', function () {
        Tools.cancelScreenCheck();
      }));
    }
    card.appendChild(actions);
    host.appendChild(card);

    var stepsList = mk('div', 'ms-list');
    for (var i = 0; i < SCREEN_STEPS.length; i += 1) {
      var row = mk('div', 'ms-list__item');
      var iconBox = mk('span', 'ms-list__icon' + (i === screenCheck.index ? ' ms-list__icon--accent' : ''));
      iconBox.textContent = stepNumber(i + 1);
      row.appendChild(iconBox);
      var text = mk('span', 'ms-list__text');
      text.appendChild(mk('span', 'ms-list__title', stepTitleOf(SCREEN_STEPS[i])));
      text.appendChild(mk('span', 'ms-list__sub', stepHintOf(SCREEN_STEPS[i])));
      row.appendChild(text);
      stepsList.appendChild(row);
    }
    host.appendChild(stepsList);

    var resultBox = mk('div', 'ms-card');
    resultBox.id = 'screenCheckResult';
    resultBox.appendChild(mk('h3', 'ms-card__title', t('screencheck.resultTitle')));
    var result = Tools.screenCheckResult();
    if (!result) {
      resultBox.appendChild(mk('p', 'ms-card__sub', t('screencheck.resultEmpty')));
    } else {
      for (var n = 0; n < result.notesPL.length; n += 1) {
        resultBox.appendChild(mk('p', 'ms-t-body', result.notesPL[n]));
      }
      if (!result.notesPL.length) {
        resultBox.appendChild(mk('p', 'ms-card__sub', t('screencheck.resultPartial', {
          done: result.steps.length, total: SCREEN_STEPS.length
        })));
      }
    }
    host.appendChild(resultBox);
  }

  /* ==================================================================
     7. Reports
     ================================================================== */

  Tools.report = function (kind, atMs) {
    var engine = E();
    var at = typeof atMs === 'number' ? atMs : Date.now();
    var span = kind === 'week' ? 7 * DAY_MS : DAY_MS;
    var points = [];
    if (engine && typeof engine.history === 'function') {
      try { points = engine.history({ sinceMs: at - span, untilMs: at }) || []; }
      catch (e) { points = []; }
    }
    return aggregate(kind, at, span, points);
  };

  function aggregate(kind, at, span, points) {
    var ids = [];
    var list = catalogue();
    var i, j;
    for (i = 0; i < list.length; i += 1) ids.push(list[i].id);

    var acc = {};
    for (i = 0; i < ids.length; i += 1) acc[ids[i]] = { sum: 0, n: 0, min: Infinity, max: -Infinity };

    var zones = { good: 0, warning: 0, critical: 0 };
    var hours = {};
    for (i = 0; i < points.length; i += 1) {
      var p = points[i];
      for (j = 0; j < ids.length; j += 1) {
        var v = p[ids[j]];
        if (typeof v !== 'number' || !isFinite(v)) continue;
        var a = acc[ids[j]];
        a.sum += v; a.n += 1;
        if (v < a.min) a.min = v;
        if (v > a.max) a.max = v;
      }
      if (p.zone && zones[p.zone] !== undefined) zones[p.zone] += 1;
      var hour = new Date(p.t).getHours();
      if (!hours[hour]) hours[hour] = { good: 0, warning: 0, critical: 0, n: 0 };
      hours[hour].n += 1;
      if (p.zone && hours[hour][p.zone] !== undefined) hours[hour][p.zone] += 1;
    }

    var avg = {}, min = {}, max = {};
    for (i = 0; i < ids.length; i += 1) {
      var e = acc[ids[i]];
      avg[ids[i]] = e.n ? e.sum / e.n : null;
      min[ids[i]] = e.n ? e.min : null;
      max[ids[i]] = e.n ? e.max : null;
    }

    // Worst hour = the hour with the highest share of non-good samples. Ties go
    // to the later hour, because the evening is the one that matters here.
    var worstHour = null, worstScore = -1;
    for (var h in hours) {
      if (!Object.prototype.hasOwnProperty.call(hours, h)) continue;
      var stat = hours[h];
      if (stat.n < 3) continue;                 // three samples is not an hour
      var score = (stat.critical * 2 + stat.warning) / stat.n;
      if (score >= worstScore) { worstScore = score; worstHour = Number(h); }
    }

    return {
      kind: kind === 'week' ? 'week' : 'day',
      atMs: at,
      fromMs: at - span,
      samples: points.length,
      avg: avg, min: min, max: max,
      zones: zones,
      worstHour: worstScore > 0 ? worstHour : null,
      advicePL: advice(avg, zones, worstHour, worstScore)
    };
  }

  /* Three recommendations, in plain Polish, derived from the numbers actually
     collected. Deliberately conservative: they never diagnose anything and they
     never promise a health outcome. */
  function advice(avg, zones, worstHour, worstScore) {
    var out = [];
    if (typeof avg.melanopic === 'number' && avg.melanopic > 0.8) {
      out.push(t('advice.melanopic', { value: fmtValue('melanopic', avg.melanopic) }));
    }
    if (typeof avg.kelvin === 'number' && avg.kelvin > 5000) {
      out.push(t('advice.kelvin', { value: fmtValue('kelvin', avg.kelvin) }));
    }
    if (typeof avg.flicker === 'number' && avg.flicker > 8) {
      out.push(t('advice.flicker', { value: fmtValue('flicker', avg.flicker) }));
    }
    if (typeof avg.uniformity === 'number' && avg.uniformity < 60) {
      out.push(t('advice.uniformity', { value: fmtValue('uniformity', avg.uniformity) }));
    }
    if (worstHour !== null && worstScore > 0.2) {
      out.push(t('advice.worstHour', { hour: worstHour }));
    }
    if (!out.length) {
      out.push(t('advice.none'));
    }
    return out.slice(0, 3);
  }

  Tools.renderReport = function (containerId, report) {
    var host = el(containerId);
    if (!host || !report) return;
    clear(host);

    /* Osobny klucz dla doby i dla tygodnia zamiast wstawiania rzeczownika
       w zdanie: po polsku „Dzień od…”, ale w wielu językach nazwa okresu
       odmienia się razem z przyimkiem. */
    host.appendChild(mk('p', 'ms-t-body',
      t(report.kind === 'week' ? 'report.headerWeek' : 'report.headerDay', {
        from: fmtDate(report.fromMs),
        to: fmtDate(report.atMs),
        count: t('count.points', { n: report.samples })
      })));

    if (!report.samples) {
      var empty = mk('div', 'ms-empty');
      var emptyIcon = mk('div', 'ms-empty__icon');
      emptyIcon.appendChild(icon('doc'));
      empty.appendChild(emptyIcon);
      empty.appendChild(mk('p', 'ms-empty__title', t('report.emptyTitle')));
      empty.appendChild(mk('p', 'ms-empty__text', t('report.emptyText')));
      host.appendChild(empty);
      return;
    }

    var wrap = mk('div', 'ms-tablewrap');
    var table = mk('table', 'ms-table');
    var thead = mk('thead', null);
    var htr = mk('tr', null);
    var cols = [t('table.metric'), t('report.colAvg'), t('report.colMin'), t('report.colMax')];
    for (var c = 0; c < cols.length; c += 1) {
      var th = mk('th', null, cols[c]);
      th.setAttribute('scope', 'col');
      htr.appendChild(th);
    }
    thead.appendChild(htr);
    table.appendChild(thead);

    var tbody = mk('tbody', null);
    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      var m = list[i];
      var tr = mk('tr', null);
      var rowHead = mk('th', null, t('metric.withUnit', { name: metricName(m), unit: metricUnit(m) }));
      rowHead.setAttribute('scope', 'row');
      tr.appendChild(rowHead);
      tr.appendChild(mk('td', null, fmtValue(m.id, report.avg[m.id])));
      tr.appendChild(mk('td', null, fmtValue(m.id, report.min[m.id])));
      tr.appendChild(mk('td', null, fmtValue(m.id, report.max[m.id])));
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    wrap.appendChild(table);
    host.appendChild(wrap);

    var zoneCard = mk('div', 'ms-card ms-card--flat');
    zoneCard.appendChild(mk('h3', 'ms-card__title', t('report.zonesTitle')));
    var dl = mk('dl', 'ms-kv');
    dl.appendChild(kv(t('zone.count.good'), plainNumber(report.zones.good)));
    dl.appendChild(kv(t('zone.count.warning'), plainNumber(report.zones.warning)));
    dl.appendChild(kv(t('zone.count.critical'), plainNumber(report.zones.critical)));
    dl.appendChild(kv(t('report.worstHour'), report.worstHour === null
      ? t('report.worstHourNone')
      : t('report.hour', { hour: report.worstHour })));
    zoneCard.appendChild(dl);
    host.appendChild(zoneCard);

    var adviceCard = mk('div', 'ms-card ms-card--accent');
    adviceCard.appendChild(mk('h3', 'ms-card__title', t('report.adviceTitle')));
    for (var a = 0; a < report.advicePL.length; a += 1) {
      adviceCard.appendChild(mk('p', 'ms-card__sub', report.advicePL[a]));
    }
    host.appendChild(adviceCard);

    /* Zdanie o rozporządzeniu (UE) 2017/745 stoi we własnym kluczu warstwy
       wspólnej i dostawiamy je w całości — nie skraca się go dla stylu. */
    host.appendChild(note('warning', t('report.disclaimerTitle'),
      t('report.disclaimerText') + ' ' + t('legal.mdr', { app: appName() })));
  };

  var reportKind = 'day';

  function renderReports() {
    var host = panelHost('panelReports');
    if (!host) return;

    host.appendChild(note('info', t('reports.noteTitle'), t('reports.noteText')));

    var seg = mk('div', 'ms-segment');
    seg.setAttribute('role', 'group');
    seg.setAttribute('aria-label', t('reports.rangeAria'));
    /* aria-pressed, not aria-selected: aria-selected is only defined for
       gridcell/option/row/tab/columnheader/rowheader/treeitem, so on a plain
       button it was dropped and the chosen range was conveyed by background
       colour alone. ui-core does it this way for the chart range segments; the
       CSS already matches both attributes, so nothing moves visually. */
    var dayBtn = mk('button', 'ms-segment__item');
    dayBtn.id = 'reportKindDay';
    dayBtn.type = 'button';
    dayBtn.setAttribute('aria-pressed', reportKind === 'day' ? 'true' : 'false');
    dayBtn.appendChild(mk('span', null, t('reports.day')));
    dayBtn.addEventListener('click', function () { reportKind = 'day'; renderReports(); });
    var weekBtn = mk('button', 'ms-segment__item');
    weekBtn.id = 'reportKindWeek';
    weekBtn.type = 'button';
    weekBtn.setAttribute('aria-pressed', reportKind === 'week' ? 'true' : 'false');
    weekBtn.appendChild(mk('span', null, t('reports.week')));
    weekBtn.addEventListener('click', function () { reportKind = 'week'; renderReports(); });
    seg.appendChild(dayBtn);
    seg.appendChild(weekBtn);
    host.appendChild(seg);

    var date = mk('p', 'ms-t-cap ms-t-muted', t('reports.date', { date: fmtDate(Date.now()) }));
    date.id = 'reportDate';
    host.appendChild(date);

    var body = mk('div', 'ms-stack');
    body.id = 'reportBody';
    host.appendChild(body);

    Tools.renderReport(body.id, Tools.report(reportKind));
  }

  /* ==================================================================
     8. CSV export
     ================================================================== */

  var CSV_RANGES = [
    { value: '3600000', labelKey: 'csv.range.hour' },
    { value: '86400000', labelKey: 'csv.range.day' },
    { value: '604800000', labelKey: 'csv.range.week' },
    { value: '2592000000', labelKey: 'csv.range.month' }
  ];

  function csvRangeOptions() {
    var out = [];
    for (var i = 0; i < CSV_RANGES.length; i += 1) {
      out.push({ value: CSV_RANGES[i].value, label: t(CSV_RANGES[i].labelKey) });
    }
    return out;
  }

  function csvNumber(value, decimals) {
    if (typeof value !== 'number' || !isFinite(value)) return '';
    // Polish Excel: comma as the decimal separator, semicolon between fields.
    return value.toFixed(decimals).replace('.', ',');
  }

  Tools.buildCsv = function (opts) {
    var o = opts || {};
    var engine = E();
    var span = typeof o.rangeMs === 'number' ? o.rangeMs : DAY_MS;
    var until = typeof o.untilMs === 'number' ? o.untilMs : Date.now();
    var since = typeof o.sinceMs === 'number' ? o.sinceMs : until - span;
    var list = catalogue();
    var ids = [];
    var i, j;
    for (i = 0; i < list.length; i += 1) {
      if (o.metricIds && o.metricIds.indexOf(list[i].id) < 0) continue;
      ids.push(list[i].id);
    }

    var points = [];
    if (engine && typeof engine.history === 'function') {
      try { points = engine.history({ sinceMs: since, untilMs: until }) || []; }
      catch (e) { points = []; }
    }

    /* Nagłówki kolumn są treścią, więc idą przez słownik: plik CSV otwiera
       człowiek i ma w nim przeczytać to samo, co widzi na ekranie. */
    var head = [t('csv.colDate'), t('csv.colTime')];
    for (i = 0; i < ids.length; i += 1) {
      var m = metric(ids[i]);
      head.push(m ? t('csv.colMetric', { name: metricName(m), unit: metricUnit(m) }) : ids[i]);
    }
    head.push(t('csv.colZone'));

    var rows = [head];
    for (i = 0; i < points.length; i += 1) {
      var p = points[i];
      var row = [fmtDate(p.t), fmtTime(p.t)];
      for (j = 0; j < ids.length; j += 1) {
        var def = metric(ids[j]);
        row.push(csvNumber(p[ids[j]], def ? def.decimals : 2));
      }
      row.push(p.zone || '');
      rows.push(row);
    }

    var text = '';
    for (i = 0; i < rows.length; i += 1) text += rows[i].join(';') + '\r\n';

    var stamp = new Date(until);
    var filename = 'monitor-swiatla-' + stamp.getFullYear() +
      '-' + (stamp.getMonth() + 1 < 10 ? '0' : '') + (stamp.getMonth() + 1) +
      '-' + (stamp.getDate() < 10 ? '0' : '') + stamp.getDate() + '.csv';

    return { filename: filename, text: text, rows: rows };
  };

  Tools.exportCsv = function (opts) {
    var csv = Tools.buildCsv(opts);
    if (csv.rows.length < 2) {
      return Promise.resolve({ ok: false, messagePL: t('toast.exportEmpty') });
    }
    try {
      // BOM first: without it Excel opens a UTF-8 file as Windows-1250 and every
      // Polish diacritic in the header turns to rubbish.
      var blob = new global.Blob(['﻿' + csv.text], { type: 'text/csv;charset=utf-8;' });
      var url = global.URL.createObjectURL(blob);
      var link = doc.createElement('a');
      link.href = url;
      link.download = csv.filename;
      doc.body.appendChild(link);
      link.click();
      doc.body.removeChild(link);
      global.setTimeout(function () { global.URL.revokeObjectURL(url); }, 4000);
      return Promise.resolve({
        ok: true, filename: csv.filename, rows: csv.rows.length - 1,
        messagePL: t('toast.exportSaved', { filename: csv.filename, n: csv.rows.length - 1 })
      });
    } catch (e) {
      return Promise.resolve({ ok: false, messagePL: t('toast.exportFailed') });
    }
  };

  function renderExport() {
    var host = panelHost('panelExport');
    if (!host) return;

    host.appendChild(note('info', t('export.noteTitle'), t('export.noteText')));

    var card = mk('div', 'ms-card');
    card.appendChild(selectField('exportRangeSelect', t('export.range'), csvRangeOptions(), '86400000', function () {
      renderExportPreview();
    }));

    var metricsBox = mk('div', 'ms-field');
    metricsBox.appendChild(mk('span', 'ms-field__label', t('export.columns')));
    var chips = mk('div', 'ms-chipbar');
    chips.id = 'exportMetricList';
    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      var m = list[i];
      var chip = mk('span', 'ms-chip ms-chip--filled', metricName(m));
      chip.appendChild(mk('span', 'ms-visually-hidden', t('export.chipFilled')));
      chips.appendChild(chip);
    }
    metricsBox.appendChild(chips);
    metricsBox.appendChild(mk('p', 'ms-help', t('export.help')));
    card.appendChild(metricsBox);
    host.appendChild(card);

    var preview = mk('div', 'ms-tablewrap');
    preview.id = 'exportPreview';
    host.appendChild(preview);
    renderExportPreview();

    host.appendChild(btn('btnExportRun', 'ms-btn ms-btn--filled ms-btn--block', t('export.run'), 'download', function () {
      var select = el('exportRangeSelect');
      Tools.exportCsv({ rangeMs: select ? Number(select.value) : DAY_MS }).then(function (res) {
        toast(res.messagePL, res.ok ? 'success' : 'error');
      });
    }));
  }

  function renderExportPreview() {
    var host = el('exportPreview');
    if (!host) return;
    clear(host);
    var select = el('exportRangeSelect');
    var csv = Tools.buildCsv({ rangeMs: select ? Number(select.value) : DAY_MS });

    var table = mk('table', 'ms-table');
    var thead = mk('thead', null);
    var htr = mk('tr', null);
    for (var c = 0; c < csv.rows[0].length; c += 1) {
      var th = mk('th', null, csv.rows[0][c]);
      th.setAttribute('scope', 'col');
      htr.appendChild(th);
    }
    thead.appendChild(htr);
    table.appendChild(thead);

    var tbody = mk('tbody', null);
    var shown = Math.min(5, csv.rows.length - 1);
    if (!shown) {
      var tr = mk('tr', null);
      var td = mk('td', null, t('export.previewEmpty'));
      td.setAttribute('colspan', String(csv.rows[0].length));
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
    for (var i = 1; i <= shown; i += 1) {
      var row = mk('tr', null);
      for (var j = 0; j < csv.rows[i].length; j += 1) {
        row.appendChild(mk('td', null, csv.rows[i][j]));
      }
      tbody.appendChild(row);
    }
    table.appendChild(tbody);
    host.appendChild(table);
  }

  /* ==================================================================
     9. The Narzędzia list
     ================================================================== */

  /* Wiersze listy trzymają KLUCZE, nie napisy: nazwa ekranu pada tu i w jego
     własnym nagłówku, a wiersz „Harmonogram progów” nazywa się inaczej niż
     ekran „Harmonogram” — dlatego ma własny klucz tytułu. */
  var TOOL_ROWS = [
    { id: 'btnToolProfiles', panelId: 'panelThresholds', iconName: 'tune',
      titleKey: 'panel.thresholds', subKey: 'tool.thresholds.sub' },
    { id: 'btnToolCompare', panelId: 'panelCompare', iconName: 'grid',
      titleKey: 'panel.compare', subKey: 'tool.compare.sub' },
    { id: 'btnToolCalibration', panelId: 'panelCalibration', iconName: 'refresh',
      titleKey: 'panel.calibration', subKey: 'tool.calibration.sub' },
    { id: 'btnToolScreenCheck', panelId: 'panelScreenCheck', iconName: 'monitor',
      titleKey: 'panel.screenCheck', subKey: 'tool.screenCheck.sub' },
    { id: 'btnToolSchedule', panelId: 'panelSchedule', iconName: 'timer',
      titleKey: 'tool.schedule.title', subKey: 'tool.schedule.sub' },
    { id: 'btnToolAlerts', panelId: 'panelAlerts', iconName: 'bell',
      titleKey: 'panel.alerts', subKey: 'tool.alerts.sub' }
  ];

  function renderToolsList() {
    var list = el('toolsList');
    if (!list) return;
    clear(list);
    for (var i = 0; i < TOOL_ROWS.length; i += 1) {
      list.appendChild(toolRow(TOOL_ROWS[i]));
    }
  }

  /* Every row opens its screen. There is nothing left that could refuse. */
  function toolRow(spec) {
    var row = mk('button', 'ms-list__item ms-list__item--button');
    row.id = spec.id;
    row.type = 'button';
    var iconBox = mk('span', 'ms-list__icon ms-list__icon--accent');
    iconBox.appendChild(icon(spec.iconName));
    row.appendChild(iconBox);
    var text = mk('span', 'ms-list__text');
    text.appendChild(mk('span', 'ms-list__title', t(spec.titleKey)));
    text.appendChild(mk('span', 'ms-list__sub', t(spec.subKey)));
    row.appendChild(text);
    var end = mk('span', 'ms-list__end');
    end.appendChild(icon('chevron'));
    row.appendChild(end);
    row.addEventListener('click', function () {
      var u = U();
      if (u && typeof u.showPanel === 'function') u.showPanel(spec.panelId);
    });
    return row;
  }

  /* ==================================================================
     10. Wiring
     ================================================================== */

  var RENDERERS = {
    panelThresholds: renderThresholds,
    panelReports: renderReports,
    panelExport: renderExport,
    panelCompare: renderCompare,
    panelCalibration: renderCalibration,
    panelScreenCheck: renderScreenCheck,
    panelSchedule: renderSchedule,
    panelAlerts: renderAlerts
  };

  function renderAll() {
    renderToolsList();
    for (var panelId in RENDERERS) {
      if (Object.prototype.hasOwnProperty.call(RENDERERS, panelId)) RENDERERS[panelId]();
    }
  }

  function init() {
    renderAll();
    ensureAlertBar();
    // Once a minute is precise enough for a rule expressed in whole minutes and
    // costs nothing next to a 5 Hz sampler.
    global.setInterval(scheduleTick, 60000);
    scheduleTick();
  }

  on('app:ready', init);

  on('engine:sample', function (data) { onSampleForAlerts(data && data.reading); });

  on('engine:stopped', function () { alertSince = 0; });

  on('engine:thresholds', function (data) {
    // A profile or the schedule may have moved the sliders; keep them honest.
    syncThresholdInputs();
    if (data && data.source === 'profile') announce(t('a11y.profileApplied'));
  });

  on('engine:calibration', function () { renderCalibration(); });

  /* Zmiana języka. Nasłuch jest na 'ui:relocalized', a nie na 'i18n:changed':
     tamto zdarzenie przychodzi ZANIM powłoka przebuduje ekrany, a przebudowa
     czyści #panelMeasure razem z paskiem alertu, który mieszka w środku. */
  on('ui:relocalized', function () {
    renderAll();
    ensureAlertBar();
  });

  on('ui:viewchange', function (data) {
    var panelId = data && data.panelId;
    // Redraw on reveal so a screen never shows a stale threshold, a stale
    // calibration or yesterday's report.
    if (RENDERERS[panelId]) RENDERERS[panelId]();
    else if (panelId === 'panelTools') renderToolsList();
  });

  global.Tools = Tools;

}(typeof window !== 'undefined' ? window : globalThis));
