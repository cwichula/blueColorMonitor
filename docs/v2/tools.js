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
 * Interface strings are Polish; comments are English.
 */
(function (global) {
  'use strict';

  var doc = global.document;
  var Tools = {};

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

  function toast(messagePL, kind) {
    var u = U();
    if (u && typeof u.toast === 'function') u.toast(messagePL, { kind: kind || 'info' });
  }

  function announce(textPL, assertive) {
    var u = U();
    if (u && typeof u.announce === 'function') u.announce(textPL, !!assertive);
  }

  function setting(key) {
    var u = U();
    if (u && typeof u.getSetting === 'function') {
      try { return u.getSetting(key); } catch (e) { return undefined; }
    }
    return undefined;
  }

  function fmtValue(metricId, value) {
    var m = M();
    return m && typeof m.formatValue === 'function' ? m.formatValue(metricId, value) : '—';
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

  function btn(id, className, labelPL, iconName, onClick) {
    var b = mk('button', className);
    b.type = 'button';
    if (id) b.id = id;
    if (iconName) b.appendChild(icon(iconName));
    b.appendChild(mk('span', 'ms-btn__label', labelPL));
    if (onClick) b.addEventListener('click', onClick);
    return b;
  }

  function note(kind, titlePL, textPL) {
    var box = mk('div', 'ms-note ms-note--' + kind);
    box.appendChild(icon(kind === 'warning' ? 'warning' : (kind === 'critical' ? 'critical' : 'info')));
    var body = mk('div', 'ms-note__text');
    if (titlePL) body.appendChild(mk('span', 'ms-note__title', titlePL));
    if (textPL) body.appendChild(mk('span', null, textPL));
    box.appendChild(body);
    return box;
  }

  function section(titlePL, subPL) {
    var s = mk('section', 'ms-section');
    if (titlePL) {
      var head = mk('div', 'ms-section__head');
      head.appendChild(mk('h2', 'ms-section__title', titlePL));
      if (subPL) head.appendChild(mk('p', 'ms-section__sub', subPL));
      s.appendChild(head);
    }
    return s;
  }

  function switchRow(id, titlePL, subPL, checked, onChange) {
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
    text.appendChild(mk('span', 'ms-switch__label', titlePL));
    if (subPL) text.appendChild(mk('span', 'ms-switch__sub', subPL));
    label.appendChild(text);
    return label;
  }

  function selectField(id, labelPL, options, selected, onChange) {
    var field = mk('div', 'ms-field');
    var label = mk('label', 'ms-field__label', labelPL);
    label.setAttribute('for', id);
    field.appendChild(label);
    var wrap = mk('div', 'ms-selectwrap');
    var select = mk('select', 'ms-select');
    select.id = id;
    for (var i = 0; i < options.length; i += 1) {
      var opt = doc.createElement('option');
      opt.value = String(options[i].value);
      opt.textContent = options[i].labelPL;
      if (String(options[i].value) === String(selected)) opt.selected = true;
      select.appendChild(opt);
    }
    if (onChange) select.addEventListener('change', function () { onChange(select.value); });
    wrap.appendChild(select);
    field.appendChild(wrap);
    return field;
  }

  function kv(keyPL, valuePL) {
    var row = mk('div', 'ms-kv__row');
    row.appendChild(mk('dt', 'ms-kv__key', keyPL));
    row.appendChild(mk('dd', 'ms-kv__val', valuePL));
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
      id: 'builtin.default', namePL: 'Domyślny',
      descPL: 'Progi z katalogu metryk — punkt wyjścia dla wszystkich pomiarów.',
      builtin: true, map: null   // null = Engine.defaultThresholds()
    },
    {
      id: 'builtin.evening', namePL: 'Wieczór — łagodny',
      descPL: 'Ostrzega wcześniej o chłodnej barwie i wpływie na rytm dobowy.',
      builtin: true,
      map: {
        share: { warn: 20, crit: 26 },
        brightness: { warn: 55, crit: 75 },
        kelvin: { warn: 3400, crit: 4600 },
        melanopic: { warn: 0.45, crit: 0.75 }
      }
    },
    {
      id: 'builtin.work', namePL: 'Praca przy biurku',
      descPL: 'Dopuszcza jasne, chłodne światło dzienne; pilnuje migotania i równomierności.',
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

  Tools.listProfiles = function () {
    var out = [];
    for (var i = 0; i < BUILTIN_PROFILES.length; i += 1) {
      var b = BUILTIN_PROFILES[i];
      out.push({ id: b.id, namePL: b.namePL, descPL: b.descPL, builtin: true });
    }
    var custom = customProfiles();
    for (var j = 0; j < custom.length; j += 1) {
      out.push({
        id: custom[j].id, namePL: custom[j].namePL,
        descPL: 'Własny profil zapisany ' + fmtDate(custom[j].at) + '.',
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

    host.appendChild(note('info', 'Co robią progi. ',
      'Próg ostrzegawczy zapala żółty stan, próg krytyczny czerwony. Zmiana działa natychmiast — także ' +
      'na odczycie, który już jest na ekranie. Progi są bezpłatne; płatne jest wyłącznie zapisywanie ' +
      'własnych zestawów pod nazwą.'));

    /* "Przywróć domyślne" moves ABOVE the sliders. It always existed, but it
       stood underneath roughly 1260px of them, which for the reader is the same
       as not existing. */
    var actions = mk('div', 'ms-row ms-row--end');
    actions.appendChild(btn('btnThresholdsReset', 'ms-btn ms-btn--outline', 'Przywróć domyślne', 'refresh', function () {
      if (engine && typeof engine.resetThresholds === 'function') {
        engine.resetThresholds();
        renderThresholds();
        toast('Przywrócono progi domyślne.', 'info');
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
      cardHead.appendChild(mk('h3', 'ms-card__title', m.namePL));
      cardHead.appendChild(mk('span', 'ms-spacer'));
      cardHead.appendChild(mk('span', 'ms-card__sub', m.unit));
      card.appendChild(cardHead);
      card.appendChild(thresholdRow(m, current[m.id] || { warn: m.warn, crit: m.crit }));
      sliders.appendChild(card);
    }
    host.appendChild(sliders);

    /* --- profiles --- */
    var profHead = mk('div', 'ms-section__head');
    profHead.appendChild(mk('h2', 'ms-section__title', 'Profile progów'));
    profHead.appendChild(mk('p', 'ms-section__sub', 'Trzy wbudowane są bezpłatne'));
    host.appendChild(profHead);

    var profiles = mk('div', 'ms-list');
    profiles.id = 'profileList';
    var all = Tools.listProfiles();
    for (var p = 0; p < all.length; p += 1) profiles.appendChild(profileRow(all[p]));
    host.appendChild(profiles);

    var saveCard = mk('div', 'ms-card');
    var field = mk('div', 'ms-field');
    var label = mk('label', 'ms-field__label', 'Nazwa własnego profilu');
    label.setAttribute('for', 'profileNameInput');
    field.appendChild(label);
    var row = mk('div', 'ms-row');
    var input = mk('input', 'ms-input');
    input.type = 'text';
    input.id = 'profileNameInput';
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('placeholder', 'np. Sypialnia wieczorem');
    row.appendChild(input);
    row.appendChild(btn('btnProfileSave', 'ms-btn ms-btn--tonal', 'Zapisz bieżące progi', 'check', function () {
      var value = el('profileNameInput') ? el('profileNameInput').value : '';
      if (!value.replace(/^\s+|\s+$/g, '')) {
        toast('Podaj nazwę profilu.', 'error');
        return;
      }
      var saved = Tools.saveProfile(value);
      if (!saved) return;                       // nothing to save
      toast('Zapisano profil „' + saved.namePL + '”.', 'success');
      renderThresholds();
    }));
    field.appendChild(row);
    field.appendChild(mk('p', 'ms-help', 'Zapisuje dokładnie te progi, które są ustawione powyżej.'));
    saveCard.appendChild(field);
    host.appendChild(saveCard);
  }

  function thresholdRow(m, current) {
    var row = mk('div', 'ms-field');
    row.id = 'thRow-' + m.id;

    // The card heading above already names the metric and its unit.
    row.appendChild(mk('span', 'ms-visually-hidden', m.namePL + ' (' + m.unit + ')'));

    // For an inverted metric (higher is better) the warning threshold sits ABOVE
    // the critical one; the labels say which is which so the order never has to
    // be inferred from the slider positions.
    row.appendChild(oneSlider(m, 'thWarn-' + m.id, 'thWarnLabel-' + m.id,
      'Ostrzeżenie', current.warn, function (value) { commitThreshold(m, value, null); }));
    row.appendChild(oneSlider(m, 'thCrit-' + m.id, 'thCritLabel-' + m.id,
      'Krytyczne', current.crit, function (value) { commitThreshold(m, null, value); }));
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
  function oneSlider(m, inputId, labelId, captionPL, value, onCommit) {
    var wrap = mk('div', null);
    var head = mk('div', 'ms-row');
    var label = mk('label', 'ms-t-cap', captionPL);
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
    input.setAttribute('aria-label', m.namePL + ' — próg: ' + captionPL.toLowerCase());

    var out = mk('output', 'ms-t-num', fmtValue(m.id, value) + ' ' + m.unit);
    out.id = labelId;
    out.setAttribute('for', inputId);

    input.addEventListener('input', function () {
      out.textContent = fmtValue(m.id, Number(input.value)) + ' ' + m.unit;
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
    toast(m.invert
      ? 'Dla tej metryki próg ostrzegawczy musi być wyższy niż krytyczny.'
      : 'Próg ostrzegawczy musi być niższy niż krytyczny.', 'error');
    syncThresholdInputs();
  }

  function syncThresholdInputs() {
    var engine = E();
    if (!engine || typeof engine.getThresholds !== 'function') return;
    var map = engine.getThresholds();
    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      var m = list[i];
      var t = map[m.id];
      if (!t) continue;
      var w = el('thWarn-' + m.id), c = el('thCrit-' + m.id);
      var wl = el('thWarnLabel-' + m.id), cl = el('thCritLabel-' + m.id);
      if (w) w.value = String(t.warn);
      if (c) c.value = String(t.crit);
      if (wl) wl.textContent = fmtValue(m.id, t.warn) + ' ' + m.unit;
      if (cl) cl.textContent = fmtValue(m.id, t.crit) + ' ' + m.unit;
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
    end.appendChild(btn(null, 'ms-btn ms-btn--tonal', 'Zastosuj', null, function () {
      if (Tools.applyProfile(profile.id)) {
        syncThresholdInputs();
        toast('Zastosowano profil „' + profile.namePL + '”.', 'success');
      } else {
        toast('Nie udało się zastosować tego profilu.', 'error');
      }
    }));
    if (!profile.builtin) {
      end.appendChild(btn(null, 'ms-btn ms-btn--text', 'Usuń', 'trash', function () {
        if (Tools.removeProfile(profile.id)) {
          renderThresholds();
          toast('Profil usunięty.', 'info');
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
          toast('Harmonogram skończył się — wróciły poprzednie progi.', 'info');
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
      toast('Harmonogram włączył profil „' + namePL + '”.', 'info');
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

    host.appendChild(note('info', 'Po co harmonogram. ',
      'Wieczorem sensowne są inne progi niż w południe. Reguła „od–do” podmienia profil sama, ' +
      'żeby nie trzeba było o tym pamiętać. Harmonogram nigdy nie uruchamia ani nie zatrzymuje pomiaru.'));

    var card = mk('div', 'ms-card');
    card.appendChild(switchRow('scheduleToggle', 'Włącz automatyczne przełączanie',
      'Sprawdzane co minutę na zegarze urządzenia.', s.enabled, function (checked) {
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
      empty.appendChild(mk('p', 'ms-empty__title', 'Brak reguł'));
      empty.appendChild(mk('p', 'ms-empty__text', 'Dodaj pierwszą regułę przyciskiem poniżej.'));
      rules.appendChild(empty);
    }
    for (var i = 0; i < s.rules.length; i += 1) rules.appendChild(scheduleRuleRow(s, s.rules[i], i));
    host.appendChild(rules);

    host.appendChild(btn('btnScheduleAdd', 'ms-btn ms-btn--outline ms-btn--block', 'Dodaj regułę', 'timer', function () {
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
    fromInput.setAttribute('aria-label', 'Reguła ' + (index + 1) + ': godzina początku');

    var toInput = doc.createElement('input');
    toInput.type = 'time';
    toInput.className = 'ms-input';
    toInput.id = 'scheduleTo-' + rule.id;
    toInput.value = minutesToHm(rule.toMin);
    toInput.setAttribute('aria-label', 'Reguła ' + (index + 1) + ': godzina końca');

    var times = mk('span', 'ms-row');
    times.appendChild(fromInput);
    times.appendChild(mk('span', 'ms-t-cap', 'do'));
    times.appendChild(toInput);
    text.appendChild(times);

    var options = [];
    var all = Tools.listProfiles();
    for (var i = 0; i < all.length; i += 1) options.push({ value: all[i].id, labelPL: all[i].namePL });
    text.appendChild(selectField('scheduleProfile-' + rule.id, 'Profil', options, rule.profileId, function (value) {
      rule.profileId = value;
      Tools.setSchedule(schedule);
      lastScheduleRuleId = null;
    }));

    function commitTimes() {
      var f = hmToMinutes(fromInput.value);
      var t = hmToMinutes(toInput.value);
      if (f === null || t === null) { toast('Podaj godziny w formacie 22:00.', 'error'); return; }
      rule.fromMin = f;
      rule.toMin = t;
      Tools.setSchedule(schedule);
      lastScheduleRuleId = null;
      scheduleTick();
    }
    fromInput.addEventListener('change', commitTimes);
    toInput.addEventListener('change', commitTimes);

    row.appendChild(text);

    var end = mk('span', 'ms-list__end');
    end.appendChild(btn(null, 'ms-btn ms-btn--text', 'Usuń', 'trash', function () {
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
    var namePL = m ? m.namePL : cfg.metricId;
    var value = reading.values ? reading.values[cfg.metricId] : null;
    var messagePL = namePL + ' trzyma strefę ' +
      (cfg.level === 'warning' ? 'ostrzegawczą' : 'krytyczną') + ' od ' +
      Math.round((reading.t - alertSince) / 1000) + ' s — teraz ' +
      fmtValue(cfg.metricId, value) + ' ' + (m ? m.unit : '') + '.';

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
    text.appendChild(mk('span', 'ms-note__title', 'Alert ekspozycji'));
    text.appendChild(mk('span', null, ''));
    bar.appendChild(text);
    bar.appendChild(btn(null, 'ms-btn ms-btn--text', 'Ukryj', 'close', function () { bar.hidden = true; }));
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

    host.appendChild(note('info', 'Co robi alert. ',
      'Pilnuje jednej metryki i odzywa się dopiero wtedy, gdy trzyma ona wybraną strefę nieprzerwanie ' +
      'przez ustawiony czas. Nigdy nie zatrzymuje pomiaru i nie zasłania przycisków.'));

    var card = mk('div', 'ms-card');
    card.appendChild(switchRow('alertsToggle', 'Włącz alerty ekspozycji',
      'Działają tylko podczas trwającego pomiaru.', cfg.enabled, function (checked) {
        Tools.setAlerts({ enabled: checked });
      }));

    var metricOptions = [];
    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      metricOptions.push({ value: list[i].id, labelPL: list[i].namePL });
    }
    card.appendChild(selectField('alertsMetricSelect', 'Pilnowana metryka', metricOptions, cfg.metricId, function (value) {
      Tools.setAlerts({ metricId: value });
    }));

    card.appendChild(selectField('alertsLevelSelect', 'Od której strefy', [
      { value: 'warning', labelPL: 'Ostrzegawczej i wyższej' },
      { value: 'critical', labelPL: 'Tylko krytycznej' }
    ], cfg.level, function (value) { Tools.setAlerts({ level: value }); }));

    var field = mk('div', 'ms-field');
    var label = mk('label', 'ms-field__label', 'Po ilu sekundach nieprzerwanie');
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
    field.appendChild(mk('p', 'ms-help', 'Krótsze czasy dają więcej fałszywych alarmów, gdy przesuwasz telefon.'));
    card.appendChild(field);

    card.appendChild(switchRow('alertsSoundToggle', 'Krótki sygnał dźwiękowy',
      'Dźwięk generowany lokalnie. Można go też wyłączyć globalnie na ekranie Więcej.',
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
    var snap = engine.snapshot(slot === 'A' ? 'Światło A' : 'Światło B');
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
      return { textPL: 'Za mało danych, żeby porównać te dwa pomiary.', metricId: null };
    }
    var diff = Math.abs(a - b);
    var span = Math.max(1e-6, m.max - m.min);
    if (diff / span < 0.03) {
      return {
        metricId: key,
        textPL: 'Oba źródła wychodzą praktycznie tak samo (' + m.namePL.toLowerCase() + ': ' +
          fmtValue(key, a) + ' i ' + fmtValue(key, b) + ' ' + m.unit + '). Różnica mieści się w szumie pomiaru.'
      };
    }
    var betterIsA = higherIsBetter ? a > b : a < b;
    return {
      metricId: key,
      textPL: 'Łagodniejsze jest światło ' + (betterIsA ? 'A' : 'B') + ' — ' + m.namePL.toLowerCase() +
        ' wynosi ' + fmtValue(key, betterIsA ? a : b) + ' ' + m.unit + ' wobec ' +
        fmtValue(key, betterIsA ? b : a) + ' ' + m.unit + '.'
    };
  }

  function renderCompare() {
    var host = panelHost('panelCompare');
    if (!host) return;
    var state = compareState();

    host.appendChild(note('info', 'Jak porównywać. ',
      'Uruchom pomiar, skieruj kamerę na pierwsze źródło i zapisz je jako A. Nie zmieniając odległości ' +
      'ani kąta, przełącz światło i zapisz B. Porównanie ma sens tylko wtedy, gdy scena jest ta sama.'));

    var grid = mk('div', 'ms-grid');
    grid.appendChild(compareCard('A', 'compareSlotA', 'btnCaptureA', state.A));
    grid.appendChild(compareCard('B', 'compareSlotB', 'btnCaptureB', state.B));
    host.appendChild(grid);

    var wrap = mk('div', 'ms-tablewrap');
    var table = mk('table', 'ms-table');
    table.id = 'compareTable';
    var thead = mk('thead', null);
    var htr = mk('tr', null);
    var h0 = mk('th', null, 'Metryka'); h0.setAttribute('scope', 'col');
    var h1 = mk('th', null, 'Światło A'); h1.setAttribute('scope', 'col');
    var h2 = mk('th', null, 'Światło B'); h2.setAttribute('scope', 'col');
    htr.appendChild(h0); htr.appendChild(h1); htr.appendChild(h2);
    thead.appendChild(htr);
    table.appendChild(thead);

    var tbody = mk('tbody', null);
    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      var m = list[i];
      var tr = mk('tr', null);
      var th = mk('th', null, m.namePL);
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
    verdict.appendChild(mk('h3', 'ms-card__title', 'Wynik porównania'));
    verdict.appendChild(mk('p', 'ms-card__sub', v
      ? v.textPL
      : 'Zapisz oba światła, żeby zobaczyć, które jest łagodniejsze.'));
    host.appendChild(verdict);

    host.appendChild(btn('btnCompareClear', 'ms-btn ms-btn--outline ms-btn--block', 'Wyczyść porównanie', 'trash', function () {
      Tools.clearCompare();
      renderCompare();
      toast('Porównanie wyczyszczone.', 'info');
    }));
  }

  function compareCard(slot, cardId, buttonId, snapshot) {
    var card = mk('div', 'ms-card');
    card.id = cardId;
    var head = mk('div', 'ms-card__head');
    head.appendChild(mk('h3', 'ms-card__title', 'Światło ' + slot));
    card.appendChild(head);
    card.appendChild(mk('p', 'ms-card__sub', snapshot
      ? 'Zapisano ' + fmtDate(snapshot.at) + ', ' + fmtTime(snapshot.at)
      : 'Jeszcze nic nie zapisano.'));
    card.appendChild(btn(buttonId, 'ms-btn ms-btn--tonal ms-btn--block', 'Zapisz bieżący odczyt', 'camera', function () {
      var engine = E();
      if (!engine || typeof engine.isRunning !== 'function' || !engine.isRunning()) {
        toast('Najpierw uruchom pomiar na ekranie Pomiar.', 'error');
        return;
      }
      var snap = Tools.captureCompareSlot(slot);
      if (!snap) return;
      renderCompare();
      toast('Zapisano światło ' + slot + '.', 'success');
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
      return Promise.resolve({ ok: false, messagePL: 'Moduł pomiaru nie jest dostępny.' });
    }
    if (typeof engine.isRunning !== 'function' || !engine.isRunning()) {
      return Promise.resolve({ ok: false, messagePL: 'Najpierw uruchom pomiar i skieruj kamerę na białą kartkę.' });
    }
    if (calibrating) {
      return Promise.resolve({ ok: false, messagePL: 'Kalibracja już trwa.' });
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
          resolve({ ok: false, messagePL: 'Za mało próbek. Sprawdź, czy pomiar naprawdę działa.' });
          renderCalibration();
          return;
        }
        var r = sumR / n, g = sumG / n, b = sumB / n;
        if (r < 8 || g < 8 || b < 8) {
          resolve({ ok: false, messagePL: 'Obraz jest za ciemny do kalibracji. Doświetl kartkę i spróbuj ponownie.' });
          renderCalibration();
          return;
        }
        var target = (r + g + b) / 3;
        var ok = engine.setCalibration({ gainR: target / r, gainG: target / g, gainB: target / b, at: Date.now() });
        if (!ok) {
          resolve({ ok: false, messagePL: 'Odchył kanałów jest za duży, żeby uznać go za kalibrację. Użyj białej kartki w równym świetle.' });
          renderCalibration();
          return;
        }
        renderCalibration();
        resolve({ ok: true, messagePL: 'Skalibrowano. Temperatura barwowa i wpływ melanopiczny będą teraz dokładniejsze.' });
      }, 200);
    });
  };

  function renderCalibration() {
    var host = panelHost('panelCalibration');
    if (!host) return;
    var info = Tools.calibrationInfo();

    host.appendChild(note('info', 'Dlaczego to działa. ',
      'Matryca aparatu ma stały odchył między kanałami. Zmierzenie białej kartki pokazuje, jak duży, ' +
      'i pozwala go odjąć. To jedyna funkcja w tej aplikacji, która realnie podnosi dokładność — ' +
      'i nadal nie zamienia aparatu w spektrometr.'));

    var steps = mk('div', 'ms-list');
    steps.appendChild(calibStep('1', 'Połóż białą kartkę pod mierzonym światłem'));
    steps.appendChild(calibStep('2', 'Uruchom pomiar i wypełnij kadr kartką'));
    steps.appendChild(calibStep('3', 'Naciśnij „Kalibruj” i nie ruszaj telefonem przez 3 sekundy'));
    host.appendChild(steps);

    var card = mk('div', 'ms-card');
    var status = mk('p', 'ms-t-body');
    status.id = 'calibStatus';
    status.textContent = info.calibrated
      ? 'Skalibrowano ' + fmtDate(info.at) + ', ' + fmtTime(info.at) + '.'
      : 'Brak kalibracji. Pomiar działa, wartości traktuj porównawczo.';
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
      result.appendChild(kv('Wzmocnienie R', info.gains.r.toFixed(3).replace('.', ',')));
      result.appendChild(kv('Wzmocnienie G', info.gains.g.toFixed(3).replace('.', ',')));
      result.appendChild(kv('Wzmocnienie B', info.gains.b.toFixed(3).replace('.', ',')));
    } else {
      result.appendChild(kv('Wzmocnienia kanałów', 'nie ustawione'));
    }
    card.appendChild(result);

    var actions = mk('div', 'ms-card__actions');
    actions.appendChild(btn('btnCalibStart', 'ms-btn ms-btn--filled', 'Kalibruj (3 s)', 'refresh', function () {
      var button = el('btnCalibStart');
      var u = U();
      if (u && typeof u.setBusy === 'function') u.setBusy(button, true);
      Tools.startCalibration().then(function (res) {
        var b2 = el('btnCalibStart');
        if (u && typeof u.setBusy === 'function' && b2) u.setBusy(b2, false);
        toast(res.messagePL, res.ok ? 'success' : 'error');
      });
    }));
    actions.appendChild(btn('btnCalibClear', 'ms-btn ms-btn--outline', 'Usuń kalibrację', 'trash', function () {
      Tools.clearCalibration();
      toast('Kalibracja usunięta.', 'info');
    }));
    card.appendChild(actions);
    host.appendChild(card);
  }

  function calibStep(numberPL, titlePL) {
    var row = mk('div', 'ms-list__item');
    row.appendChild(mk('span', 'ms-list__icon ms-list__icon--accent', numberPL));
    var text = mk('span', 'ms-list__text');
    text.appendChild(mk('span', 'ms-list__title', titlePL));
    row.appendChild(text);
    return row;
  }

  /* ==================================================================
     6. "Sprawdź mój monitor" wizard
     ================================================================== */

  var SCREEN_STEPS = [
    { key: 'white100', titlePL: 'Biel przy pełnej jasności',
      hintPL: 'Otwórz białą stronę na monitorze, ustaw jasność na maksimum i wypełnij kadr ekranem.' },
    { key: 'white20', titlePL: 'Biel przy niskiej jasności',
      hintPL: 'Zmniejsz jasność monitora do około jednej piątej i nie zmieniaj kadru.' },
    { key: 'corners', titlePL: 'Rogi ekranu',
      hintPL: 'Wróć do pełnej jasności i pokaż kamerze cały ekran — sprawdzamy równomierność podświetlenia.' },
    { key: 'nightOff', titlePL: 'Tryb nocny wyłączony',
      hintPL: 'Upewnij się, że filtr światła niebieskiego jest wyłączony.' },
    { key: 'nightOn', titlePL: 'Tryb nocny włączony',
      hintPL: 'Włącz filtr światła niebieskiego w systemie i powtórz ten sam kadr.' }
  ];

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
    var snap = engine.snapshot(step.titlePL);
    if (!snap) return null;
    screenCheck.results.push({ key: step.key, titlePL: step.titlePL, snapshot: snap });

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
      out.notesPL.push(u < 60
        ? 'Równomierność podświetlenia wynosi ' + fmtValue('uniformity', u) + '% — widać wyraźne różnice jasności w kadrze.'
        : 'Podświetlenie jest równe (' + fmtValue('uniformity', u) + '%).');
    }
    if (byKey.nightOn && byKey.nightOff) {
      var on = byKey.nightOn.values.share, off = byKey.nightOff.values.share;
      if (typeof on === 'number' && typeof off === 'number') {
        var drop = off - on;
        out.notesPL.push(drop > 3
          ? 'Tryb nocny obniża udział niebieskiego o ' + fmtValue('share', drop) + ' punktu procentowego — działa.'
          : 'Tryb nocny zmienia udział niebieskiego tylko o ' + fmtValue('share', Math.abs(drop)) +
            ' punktu procentowego. To mniej, niż zwykle daje systemowy filtr.');
      }
    }
    if (byKey.white100 && byKey.white20) {
      var f100 = byKey.white100.values.flicker, f20 = byKey.white20.values.flicker;
      if (typeof f100 === 'number' && typeof f20 === 'number' && f20 > f100 + 3) {
        out.notesPL.push('Przy niskiej jasności migotanie rośnie z ' + fmtValue('flicker', f100) + '% do ' +
          fmtValue('flicker', f20) + '% — to typowy objaw ściemniania impulsowego (PWM).');
      }
    }
    return out;
  };

  function renderScreenCheck() {
    var host = panelHost('panelScreenCheck');
    if (!host) return;
    var running = screenCheck.index >= 0;

    host.appendChild(note('info', 'Do czego to służy. ',
      'Pięć kroków sprawdza monitor tak, jak sprawdza się go w recenzji: biel przy dwóch jasnościach, ' +
      'równomierność podświetlenia i to, czy systemowy tryb nocny naprawdę coś zmienia. ' +
      'Kreator czyta trwający pomiar; sam go nie uruchamia.'));

    var card = mk('div', 'ms-card');
    var stepTitle = mk('h3', 'ms-card__title');
    stepTitle.id = 'screenCheckStep';
    var hint = mk('p', 'ms-card__sub');
    hint.id = 'screenCheckHint';

    if (running) {
      var step = SCREEN_STEPS[screenCheck.index];
      stepTitle.textContent = 'Krok ' + (screenCheck.index + 1) + ' z ' + SCREEN_STEPS.length + ': ' + step.titlePL;
      hint.textContent = step.hintPL;
    } else {
      stepTitle.textContent = 'Kreator nie jest uruchomiony';
      hint.textContent = 'Uruchom pomiar na ekranie Pomiar, potem wróć tutaj i naciśnij „Rozpocznij”.';
    }
    card.appendChild(stepTitle);
    card.appendChild(hint);

    var actions = mk('div', 'ms-card__actions');
    if (running) {
      actions.appendChild(btn('btnScreenNext', 'ms-btn ms-btn--filled', 'Zapisz krok i przejdź dalej', 'check', function () {
        var engine = E();
        if (!engine || typeof engine.isRunning !== 'function' || !engine.isRunning()) {
          toast('Najpierw uruchom pomiar na ekranie Pomiar.', 'error');
          return;
        }
        if (!Tools.screenCheckNext()) {
          toast('Kreator zakończony. Wynik jest poniżej.', 'success');
        }
      }));
      actions.appendChild(btn('btnScreenCancel', 'ms-btn ms-btn--text', 'Przerwij', 'close', function () {
        Tools.cancelScreenCheck();
      }));
    } else {
      actions.appendChild(btn('btnScreenNext', 'ms-btn ms-btn--filled', 'Rozpocznij kreator', 'play', function () {
        Tools.startScreenCheck();
      }));
      actions.appendChild(btn('btnScreenCancel', 'ms-btn ms-btn--text', 'Wyczyść wynik', 'trash', function () {
        Tools.cancelScreenCheck();
      }));
    }
    card.appendChild(actions);
    host.appendChild(card);

    var stepsList = mk('div', 'ms-list');
    for (var i = 0; i < SCREEN_STEPS.length; i += 1) {
      var row = mk('div', 'ms-list__item');
      var iconBox = mk('span', 'ms-list__icon' + (i === screenCheck.index ? ' ms-list__icon--accent' : ''));
      iconBox.textContent = String(i + 1);
      row.appendChild(iconBox);
      var text = mk('span', 'ms-list__text');
      text.appendChild(mk('span', 'ms-list__title', SCREEN_STEPS[i].titlePL));
      text.appendChild(mk('span', 'ms-list__sub', SCREEN_STEPS[i].hintPL));
      row.appendChild(text);
      stepsList.appendChild(row);
    }
    host.appendChild(stepsList);

    var resultBox = mk('div', 'ms-card');
    resultBox.id = 'screenCheckResult';
    resultBox.appendChild(mk('h3', 'ms-card__title', 'Wynik'));
    var result = Tools.screenCheckResult();
    if (!result) {
      resultBox.appendChild(mk('p', 'ms-card__sub', 'Jeszcze nie zapisano żadnego kroku.'));
    } else {
      for (var n = 0; n < result.notesPL.length; n += 1) {
        resultBox.appendChild(mk('p', 'ms-t-body', result.notesPL[n]));
      }
      if (!result.notesPL.length) {
        resultBox.appendChild(mk('p', 'ms-card__sub',
          'Zapisano ' + result.steps.length + ' z ' + SCREEN_STEPS.length +
          ' kroków. Wnioski pojawią się, gdy będzie co porównać.'));
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
      out.push('Średni wpływ na rytm dobowy wyniósł ' + fmtValue('melanopic', avg.melanopic) +
        '×. Wieczorem warto zejść poniżej 0,50 — najprościej przez cieplejszą żarówkę lub tryb nocny.');
    }
    if (typeof avg.kelvin === 'number' && avg.kelvin > 5000) {
      out.push('Światło było chłodne (średnio ' + fmtValue('kelvin', avg.kelvin) +
        ' K). Do pracy to bez zarzutu; na dwie godziny przed snem lepsze jest poniżej 3000 K.');
    }
    if (typeof avg.flicker === 'number' && avg.flicker > 8) {
      out.push('Wykryto zauważalne migotanie (średnio ' + fmtValue('flicker', avg.flicker) +
        '%). Zwykle odpowiada za nie tani ściemniacz albo zasilacz podświetlenia.');
    }
    if (typeof avg.uniformity === 'number' && avg.uniformity < 60) {
      out.push('Światło rozkłada się nierówno (' + fmtValue('uniformity', avg.uniformity) +
        '%). Przesunięcie lampy albo zmiana kąta zwykle daje więcej niż wymiana żarówki.');
    }
    if (worstHour !== null && worstScore > 0.2) {
      out.push('Najgorsza pora dnia to godzina ' + worstHour + ':00 — tam skupia się najwięcej odczytów poza normą.');
    }
    if (!out.length) {
      out.push('W tym okresie nic nie wybija się ponad normę. Najwięcej dałoby teraz porównanie dwóch źródeł światła w porównywarce A/B.');
    }
    return out.slice(0, 3);
  }

  Tools.renderReport = function (containerId, report) {
    var host = el(containerId);
    if (!host || !report) return;
    clear(host);

    host.appendChild(mk('p', 'ms-t-body',
      (report.kind === 'week' ? 'Tydzień' : 'Dzień') + ' od ' + fmtDate(report.fromMs) +
      ' do ' + fmtDate(report.atMs) + ' — ' +
      (U() && U().countPL ? U().countPL(report.samples, 'punkt', 'punkty', 'punktów') : report.samples + ' punktów') + '.'));

    if (!report.samples) {
      var empty = mk('div', 'ms-empty');
      var emptyIcon = mk('div', 'ms-empty__icon');
      emptyIcon.appendChild(icon('doc'));
      empty.appendChild(emptyIcon);
      empty.appendChild(mk('p', 'ms-empty__title', 'Brak danych w tym okresie'));
      empty.appendChild(mk('p', 'ms-empty__text', 'Uruchom pomiar na ekranie Pomiar — historia zapisuje się sama.'));
      host.appendChild(empty);
      return;
    }

    var wrap = mk('div', 'ms-tablewrap');
    var table = mk('table', 'ms-table');
    var thead = mk('thead', null);
    var htr = mk('tr', null);
    var cols = ['Metryka', 'Średnia', 'Minimum', 'Maksimum'];
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
      var rowHead = mk('th', null, m.namePL + ' (' + m.unit + ')');
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
    zoneCard.appendChild(mk('h3', 'ms-card__title', 'Rozkład stref'));
    var dl = mk('dl', 'ms-kv');
    dl.appendChild(kv('W normie', String(report.zones.good)));
    dl.appendChild(kv('Ostrzeżenia', String(report.zones.warning)));
    dl.appendChild(kv('Krytyczne', String(report.zones.critical)));
    dl.appendChild(kv('Najgorsza pora dnia', report.worstHour === null ? 'brak wyraźnej' : report.worstHour + ':00'));
    zoneCard.appendChild(dl);
    host.appendChild(zoneCard);

    var adviceCard = mk('div', 'ms-card ms-card--accent');
    adviceCard.appendChild(mk('h3', 'ms-card__title', 'Co z tym zrobić'));
    for (var a = 0; a < report.advicePL.length; a += 1) {
      adviceCard.appendChild(mk('p', 'ms-card__sub', report.advicePL[a]));
    }
    host.appendChild(adviceCard);

    host.appendChild(note('warning', 'To nie jest porada zdrowotna. ',
      'Wnioski wynikają wyłącznie z tego, co zobaczyła kamera tego telefonu. Aplikacja nie mierzy widma, ' +
      'nie zna luksów i nie stawia żadnej diagnozy. ' +
      'Monitor Światła nie jest wyrobem medycznym w rozumieniu rozporządzenia (UE) 2017/745, nie służy do diagnozowania, zapobiegania, monitorowania ani leczenia jakiegokolwiek stanu chorobowego i nie zastępuje badania u lekarza ani optometrysty.'));
  };

  var reportKind = 'day';

  function renderReports() {
    var host = panelHost('panelReports');
    if (!host) return;

    host.appendChild(note('info', 'Skąd te liczby. ',
      'Raport liczy się z historii zapisanej na tym urządzeniu — po jednym punkcie na pięć sekund. ' +
      'Silnik zbiera ją od pierwszego pomiaru, więc raport jest gotowy od razu.'));

    var seg = mk('div', 'ms-segment');
    seg.setAttribute('role', 'group');
    seg.setAttribute('aria-label', 'Zakres raportu');
    /* aria-pressed, not aria-selected: aria-selected is only defined for
       gridcell/option/row/tab/columnheader/rowheader/treeitem, so on a plain
       button it was dropped and the chosen range was conveyed by background
       colour alone. ui-core does it this way for the chart range segments; the
       CSS already matches both attributes, so nothing moves visually. */
    var dayBtn = mk('button', 'ms-segment__item');
    dayBtn.id = 'reportKindDay';
    dayBtn.type = 'button';
    dayBtn.setAttribute('aria-pressed', reportKind === 'day' ? 'true' : 'false');
    dayBtn.appendChild(mk('span', null, 'Ostatnia doba'));
    dayBtn.addEventListener('click', function () { reportKind = 'day'; renderReports(); });
    var weekBtn = mk('button', 'ms-segment__item');
    weekBtn.id = 'reportKindWeek';
    weekBtn.type = 'button';
    weekBtn.setAttribute('aria-pressed', reportKind === 'week' ? 'true' : 'false');
    weekBtn.appendChild(mk('span', null, 'Ostatnie 7 dni'));
    weekBtn.addEventListener('click', function () { reportKind = 'week'; renderReports(); });
    seg.appendChild(dayBtn);
    seg.appendChild(weekBtn);
    host.appendChild(seg);

    var date = mk('p', 'ms-t-cap ms-t-muted', 'Raport na dzień ' + fmtDate(Date.now()) + '.');
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
    { value: '3600000', labelPL: 'Ostatnia godzina' },
    { value: '86400000', labelPL: 'Ostatnia doba' },
    { value: '604800000', labelPL: 'Ostatnie 7 dni' },
    { value: '2592000000', labelPL: 'Ostatnie 30 dni' }
  ];

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

    var head = ['Data', 'Godzina'];
    for (i = 0; i < ids.length; i += 1) {
      var m = metric(ids[i]);
      head.push(m ? m.namePL + ' [' + m.unit + ']' : ids[i]);
    }
    head.push('Strefa');

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
      return Promise.resolve({ ok: false, messagePL: 'W wybranym zakresie nie ma żadnych odczytów.' });
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
        messagePL: 'Zapisano plik ' + csv.filename + ' (' + (csv.rows.length - 1) + ' wierszy).'
      });
    } catch (e) {
      return Promise.resolve({ ok: false, messagePL: 'Ta przeglądarka nie pozwoliła zapisać pliku.' });
    }
  };

  function renderExport() {
    var host = panelHost('panelExport');
    if (!host) return;

    host.appendChild(note('info', 'Format pliku. ',
      'Średnik jako separator kolumn, przecinek jako separator dziesiętny, kodowanie UTF-8 ze znacznikiem BOM. ' +
      'Taki plik polski Excel otwiera bez ustawiania czegokolwiek.'));

    var card = mk('div', 'ms-card');
    card.appendChild(selectField('exportRangeSelect', 'Zakres danych', CSV_RANGES, '86400000', function () {
      renderExportPreview();
    }));

    var metricsBox = mk('div', 'ms-field');
    metricsBox.appendChild(mk('span', 'ms-field__label', 'Kolumny w pliku'));
    var chips = mk('div', 'ms-chipbar');
    chips.id = 'exportMetricList';
    var list = catalogue();
    for (var i = 0; i < list.length; i += 1) {
      var m = list[i];
      var chip = mk('span', 'ms-chip ms-chip--filled', m.namePL);
      chip.appendChild(mk('span', 'ms-visually-hidden', ' — kolumna wypełniona'));
      chips.appendChild(chip);
    }
    metricsBox.appendChild(chips);
    metricsBox.appendChild(mk('p', 'ms-help',
      'Plik zawiera wszystkie siedem kolumn — silnik liczy je od pierwszego pomiaru ' +
      'i wszystkie trafiają do pliku.'));
    card.appendChild(metricsBox);
    host.appendChild(card);

    var preview = mk('div', 'ms-tablewrap');
    preview.id = 'exportPreview';
    host.appendChild(preview);
    renderExportPreview();

    host.appendChild(btn('btnExportRun', 'ms-btn ms-btn--filled ms-btn--block', 'Zapisz plik CSV', 'download', function () {
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
      var td = mk('td', null, 'Brak odczytów w tym zakresie. Uruchom pomiar — historia zapisuje się sama.');
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

  var TOOL_ROWS = [
    { id: 'btnToolProfiles', panelId: 'panelThresholds', iconName: 'tune',
      titlePL: 'Progi i profile', subPL: 'Kiedy wartość ma zapalać ostrzeżenie' },
    { id: 'btnToolCompare', panelId: 'panelCompare', iconName: 'grid',
      titlePL: 'Porównywarka A/B', subPL: 'Które z dwóch świateł jest łagodniejsze' },
    { id: 'btnToolCalibration', panelId: 'panelCalibration', iconName: 'refresh',
      titlePL: 'Kalibracja białą kartką', subPL: 'Jedyna funkcja, która realnie podnosi dokładność' },
    { id: 'btnToolScreenCheck', panelId: 'panelScreenCheck', iconName: 'monitor',
      titlePL: 'Sprawdź mój monitor', subPL: 'Pięć kroków i gotowy wniosek o ekranie' },
    { id: 'btnToolSchedule', panelId: 'panelSchedule', iconName: 'timer',
      titlePL: 'Harmonogram progów', subPL: 'Inne progi wieczorem, bez pamiętania o tym' },
    { id: 'btnToolAlerts', panelId: 'panelAlerts', iconName: 'bell',
      titlePL: 'Alerty ekspozycji', subPL: 'Sygnał, gdy strefa krytyczna trwa zbyt długo' }
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
    text.appendChild(mk('span', 'ms-list__title', spec.titlePL));
    text.appendChild(mk('span', 'ms-list__sub', spec.subPL));
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
    if (data && data.source === 'profile') announce('Zastosowano profil progów.');
  });

  on('engine:calibration', function () { renderCalibration(); });

  on('ui:viewchange', function (data) {
    var panelId = data && data.panelId;
    // Redraw on reveal so a screen never shows a stale threshold, a stale
    // calibration or yesterday's report.
    if (RENDERERS[panelId]) RENDERERS[panelId]();
    else if (panelId === 'panelTools') renderToolsList();
  });

  global.Tools = Tools;

}(typeof window !== 'undefined' ? window : globalThis));
