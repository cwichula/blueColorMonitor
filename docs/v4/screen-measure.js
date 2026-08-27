/* Monitor Światła v4 — screen-measure.js
 *
 * ROLA PLIKU: buduje i obsługuje ekran POMIAR (#/measure) — wizytówkę aplikacji.
 *
 * Ekran składa się z pięciu bloków w kolejności czytania (SPEC 4.2):
 *   1. hero        — duży wskaźnik Gauge.arc kanału wiodącego, plakietka strefy,
 *                    zdanie werdyktu ze Scale.verdict, pasek rozgrzewki i metadane sesji;
 *   2. pasek akcji — Start/Stop, obrót kamery, wybór kanału wiodącego;
 *   3. kamera      — karta podglądu; PRZENOSI (appendChild) węzeł #cameraStage
 *                    z index.html, nigdy nie tworzy drugiego <video>;
 *   4. kafelki     — siedem wielkości, każda z liczbą, paskiem strefowym
 *                    i mikrowykresem; wszystkie widoczne i wybieralne;
 *   5. noty        — „Czym ten pomiar nie jest” (zawsze widoczna) plus noty o ≈
 *                    i o zakresie metody dla temperatury barwowej i migotania.
 *
 * BUDŻET 5 Hz (SPEC 8.3): handler engine:sample odkłada próbkę do zmiennej i prosi
 * o jedną klatkę. Cały rysunek dzieje się w tej klatce i sprowadza się do podmiany
 * textContent istniejących węzłów, style.width paska i — wyłącznie przy faktycznej
 * zmianie strefy — jednego setAttribute('class'). Żadnego tworzenia elementów,
 * żadnego czytania układu, żadnego localStorage. Widok nieaktywny odpina wszystko.
 */
(function (global) {
  'use strict';

  var doc = global.document;

  /* --- stałe czasowe i wizualne, wszystkie z rozdziału 8.3 SPEC.md --- */
  var WARMUP_MS = 3000;          // rozgrzewka ekspozycji kamery
  var VERDICT_HOLD_MS = 4000;    // histereza zdania werdyktu
  var SPARK_EVERY = 5;           // mikrowykres co piątą próbkę (raz na sekundę)
  var SPARK_POINTS = 60;         // 12 s przebiegu w kafelku
  var ANNOUNCE_MIN_MS = 2000;    // region aria-live dostaje najwyżej jeden komunikat na 2 s

  var ZONE_CLASS = { good: 'is-good', warning: 'is-warn', critical: 'is-crit' };
  var ZONE_MOD = { good: 'good', warning: 'warn', critical: 'crit' };

  /* Załącznik B SPEC.md — ikona każdej z siedmiu wielkości. */
  var METRIC_ICON = {
    share: 'droplet', brightness: 'sun', kelvin: 'thermometer', melanopic: 'moon',
    flicker: 'waveform', uniformity: 'grid', comfort: 'eye'
  };
  /* Wielkości wyliczane z barw sRGB, a nie mierzone — kafelek dostaje znak ≈. */
  var APPROX = { kelvin: true, melanopic: true };

  var TILE_BASE = 'ms4-tile';

  /* ==================================================================
     Drobne pomocniki. Wszystkie wołają UI leniwie, bo ui.js ładuje się
     wcześniej, ale nie ma powodu wiązać się z nim w czasie parsowania.
     ================================================================== */

  function T(group, key) {
    var U = global.UI;
    var g = U && U.T ? U.T[group] : null;
    return g && typeof g[key] === 'string' ? g[key] : '';
  }

  function S(group, key) {
    var X = global.Scale && global.Scale.TEXT ? global.Scale.TEXT[group] : null;
    return X && typeof X[key] === 'string' ? X[key] : '';
  }

  function el(tag, className, text) {
    var U = global.UI;
    if (U && typeof U.el === 'function') return U.el(tag, className, text);
    var n = doc.createElement(tag);
    if (className) n.className = className;
    if (text !== undefined && text !== null) n.textContent = String(text);
    return n;
  }

  function icon(name, size) {
    var U = global.UI;
    if (U && typeof U.icon === 'function') {
      var svg = U.icon(name, size);
      if (svg) return svg;
    }
    return doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
  }

  // Ikony to elementy SVG — ich `className` jest tylko do odczytu w starszych
  // silnikach, więc klasę dokładamy przez atrybut, nie przez przypisanie.
  function addCls(node, className) {
    if (!node || !className) return node;
    var cur = node.getAttribute ? node.getAttribute('class') || '' : '';
    node.setAttribute('class', cur ? cur + ' ' + className : className);
    return node;
  }

  function show(node, visible) {
    if (!node) return;
    if (visible) node.classList.remove('is-hidden');
    else node.classList.add('is-hidden');
  }

  function raf(fn) {
    if (typeof global.requestAnimationFrame === 'function') return global.requestAnimationFrame(fn);
    return global.setTimeout(fn, 16);
  }

  function unraf(id) {
    if (!id) return;
    if (typeof global.cancelAnimationFrame === 'function') global.cancelAnimationFrame(id);
    else global.clearTimeout(id);
  }

  function metric(id) {
    return global.Metrics ? global.Metrics.byId(id) : null;
  }

  function catalogue() {
    return global.Metrics && global.Metrics.CATALOGUE ? global.Metrics.CATALOGUE : [];
  }

  function settings() {
    var St = global.Store;
    return St && typeof St.get === 'function' ? St.get() : {};
  }

  function haptic(ms) {
    var s = settings();
    if (!s.haptics) return;
    try {
      if (global.navigator && typeof global.navigator.vibrate === 'function') global.navigator.vibrate(ms);
    } catch (_) { /* wibracje są ozdobą, ich brak nic nie psuje */ }
  }

  /* ==================================================================
     Stan modułu
     ================================================================== */

  var root = null;               // korzeń widoku podany przez app.js
  var builtOk = false;
  var isActive = false;
  var offs = [];                 // funkcje odpinające z Bus.on
  var clockTimer = null;
  var rafId = 0;

  var thresholds = null;
  var leadId = 'share';
  var latest = null;             // ostatnia próbka (referencja z engine.js — nie modyfikujemy jej)
  var sampleNo = 0;
  var startedAt = null;
  var warmupAnnounced = false;
  var lastAnnounceAt = 0;

  var shownVerdictZone = null;   // strefa zdania obecnie na ekranie
  var pendingZone = null;        // strefa, która czeka na 4 s potwierdzenia
  var pendingSince = 0;
  var lastVerdictText = '';
  var lastStampZone = 'x';       // celowo wartość niemożliwa: wymusza pierwsze malowanie
  var lastClockText = '';
  var lastCalibText = '';
  var lastKelvinOk = true;
  var lastFlickerOk = true;
  var hasAnyReading = false;

  var arc = null;
  var tiles = [];                // [{id, root, valueEl, unitEl, ...}]
  var sparkData = {};            // metricId -> [{t, v}]

  /* Węzły, do których piszemy w pętli malowania. */
  var nodes = {};
  var stage = null;              // #cameraStage z index.html
  var video = null;              // #cameraVideo — dotykamy wyłącznie klasy lustra
  var stageHome = null;          // rodzic, do którego stage wraca po zamknięciu powiększenia
  var stageHomeNext = null;
  var previewSheet = null;
  var leadSheet = null;

  /* ==================================================================
     Budowa DOM — wołana raz przez app.js
     ================================================================== */

  function build(viewRoot) {
    root = viewRoot;
    if (!root || !doc) return;

    thresholds = global.Engine && global.Engine.getThresholds ? global.Engine.getThresholds() : null;
    leadId = pickLead(settings().leadMetric);

    root.appendChild(buildErrorBox());
    root.appendChild(buildHero());
    root.appendChild(buildActions());
    root.appendChild(buildCamera());
    root.appendChild(buildTilesSection());
    root.appendChild(buildNotes());

    builtOk = true;
    syncEngineState(global.Engine ? global.Engine.state() : 'idle');
    setLead(leadId, false);
  }

  function pickLead(id) {
    return metric(id) ? id : 'share';
  }

  /* ---- blok błędu kamery: wsuwa się nad treść, nie jest oknem modalnym ---- */

  function buildErrorBox() {
    var box = el('div', 'ms4-note ms4-note--warning ms4-measure__error is-hidden');
    box.setAttribute('role', 'alert');
    box.appendChild(addCls(icon('warning', 20), 'ms4-note__icon'));

    var body = el('div', 'ms4-note__body');
    body.appendChild(el('p', 'ms4-note__title', T('error', 'title')));
    nodes.errorText = el('p', 'ms4-note__text');
    body.appendChild(nodes.errorText);

    var actions = el('div', 'ms4-note__action');
    var retry = mkBtn({
      className: 'ms4-btn ms4-btn--ghost ms4-btn--sm',
      icon: 'refresh', iconSize: 20,
      label: T('error', 'retry'),
      onClick: startMeasurement
    });
    actions.appendChild(retry.root);
    body.appendChild(actions);

    box.appendChild(body);
    nodes.errorBox = box;
    return box;
  }

  /* ---- hero ---- */

  function buildHero() {
    var hero = el('section', 'ms4-card ms4-hero');

    nodes.gaugeBox = el('div', 'ms4-hero__gauge');
    hero.appendChild(nodes.gaugeBox);

    var side = el('div', 'ms4-hero__side');

    var stamp = el('span', 'ms4-stamp ms4-stamp--none ms4-hero__stamp');
    nodes.stampShape = el('span', 'ms4-stamp__shape ms4-stamp__shape--none');
    nodes.stampWord = el('span', 'ms4-stamp__word', S('stamp', 'none'));
    stamp.appendChild(nodes.stampShape);
    stamp.appendChild(nodes.stampWord);
    nodes.stamp = stamp;
    side.appendChild(stamp);

    nodes.verdict = el('p', 'ms4-hero__verdict', S('verdict', 'idle'));
    lastVerdictText = nodes.verdict.textContent;
    side.appendChild(nodes.verdict);

    var warm = el('div', 'ms4-hero__warmup is-hidden');
    warm.setAttribute('aria-hidden', 'true');
    nodes.warmupFill = el('div', 'ms4-hero__warmup-fill');
    warm.appendChild(nodes.warmupFill);
    nodes.warmup = warm;
    side.appendChild(warm);

    var meta = el('p', 'ms4-hero__meta');
    nodes.clock = el('span', 'ms4-hero__clock', T('measure', 'sessionIdle'));
    meta.appendChild(nodes.clock);
    meta.appendChild(el('span', 'ms4-muted', '·'));
    meta.appendChild(el('span', 'ms4-num', T('measure', 'hz')));
    meta.appendChild(el('span', 'ms4-muted', '·'));
    nodes.calib = el('span', null, calibrationText());
    lastCalibText = nodes.calib.textContent;
    meta.appendChild(nodes.calib);
    side.appendChild(meta);

    hero.appendChild(side);
    return hero;
  }

  function calibrationText() {
    var E = global.Engine;
    var cal = E && typeof E.getCalibration === 'function' ? E.getCalibration() : null;
    return cal ? T('measure', 'calibrated') : T('measure', 'notCalibrated');
  }

  /* ---- pasek akcji ---- */

  function mkBtn(o) {
    var b = el('button', o.className);
    b.type = 'button';
    var svg = null;
    if (o.icon) {
      svg = addCls(icon(o.icon, o.iconSize || 24), 'ms4-btn__icon');
      b.appendChild(svg);
    }
    var lab = null;
    if (o.label) {
      lab = el('span', 'ms4-btn__label', o.label);
      b.appendChild(lab);
    }
    if (o.aria) b.setAttribute('aria-label', o.aria);
    if (o.onClick) b.addEventListener('click', o.onClick);
    return { root: b, iconEl: svg, labelEl: lab, iconName: o.icon || '' };
  }

  function setBtnIcon(btn, name, size) {
    if (!btn || btn.iconName === name) return;
    var next = addCls(icon(name, size || 24), 'ms4-btn__icon');
    if (btn.iconEl && btn.iconEl.parentNode) btn.iconEl.parentNode.replaceChild(next, btn.iconEl);
    else btn.root.insertBefore(next, btn.root.firstChild);
    btn.iconEl = next;
    btn.iconName = name;
  }

  function buildActions() {
    var bar = el('div', 'ms4-actions');

    nodes.start = mkBtn({
      className: 'ms4-btn ms4-btn--primary ms4-btn--lg ms4-btn--full ms4-actions__start',
      icon: 'play',
      label: T('measure', 'start'),
      onClick: toggleMeasurement
    });
    bar.appendChild(nodes.start.root);

    nodes.flip = mkBtn({
      className: 'ms4-btn ms4-btn--tonal ms4-btn--icon ms4-btn--lg ms4-actions__flip',
      icon: 'camera-flip',
      aria: T('measure', 'flipAria'),
      onClick: flipCamera
    });
    nodes.flip.root.title = T('measure', 'flip');
    bar.appendChild(nodes.flip.root);

    nodes.lead = mkBtn({
      className: 'ms4-btn ms4-btn--tonal ms4-btn--icon ms4-btn--lg ms4-actions__lead',
      icon: 'target',
      aria: T('measure', 'leadAria'),
      onClick: openLeadSheet
    });
    nodes.lead.root.title = T('measure', 'lead');
    bar.appendChild(nodes.lead.root);

    return bar;
  }

  /* ---- karta podglądu kamery ---- */

  function buildCamera() {
    var card = el('section', 'ms4-card ms4-camera');

    var bar = el('div', 'ms4-camera__bar');
    bar.appendChild(el('span', 'ms4-camera__title', T('measure', 'preview')));

    nodes.expand = mkBtn({
      className: 'ms4-btn ms4-btn--icon ms4-btn--ghost ms4-btn--sm ms4-camera__expand',
      icon: 'expand', iconSize: 20,
      aria: S('monitor', 'open'),
      onClick: openPreviewSheet
    });
    bar.appendChild(nodes.expand.root);

    nodes.toggle = mkBtn({
      className: 'ms4-btn ms4-btn--icon ms4-btn--ghost ms4-btn--sm ms4-camera__toggle',
      icon: 'chevron-down', iconSize: 20,
      aria: T('aria', 'collapsePreview'),
      onClick: toggleCamera
    });
    nodes.toggle.root.setAttribute('aria-expanded', 'true');
    bar.appendChild(nodes.toggle.root);

    card.appendChild(bar);

    // Węzeł z index.html — engine.js trzyma go po ID i pisze do środka.
    // Przenosimy, nigdy nie klonujemy i nigdy nie usuwamy.
    stage = doc.getElementById('cameraStage');
    video = doc.getElementById('cameraVideo');
    if (stage) {
      stage.removeAttribute('hidden');
      card.appendChild(stage);
      nodes.liveBadge = el('span', 'ms4-badge ms4-badge--crit ms4-camera__badge is-hidden',
        T('measure', 'previewLive'));
      stage.appendChild(nodes.liveBadge);
    }

    nodes.cameraHint = el('p', 'ms4-camera__hint', T('measure', 'previewHint'));
    card.appendChild(nodes.cameraHint);

    nodes.camera = card;
    return card;
  }

  function toggleCamera() {
    if (!nodes.camera) return;
    var collapsed = nodes.camera.classList.toggle('is-collapsed');
    nodes.toggle.root.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    nodes.toggle.root.setAttribute('aria-label',
      collapsed ? T('aria', 'expandPreview') : T('aria', 'collapsePreview'));
    nodes.toggle.root.title = collapsed ? T('measure', 'previewShow') : T('measure', 'previewHide');
  }

  function openPreviewSheet() {
    var U = global.UI;
    if (!U || typeof U.sheet !== 'function' || !stage || previewSheet) return;

    var body = el('div', 'ms4-measure__aim');
    stageHome = stage.parentNode;
    stageHomeNext = stage.nextSibling;
    body.appendChild(stage);
    body.appendChild(el('p', 'ms4-note ms4-note--info', S('aim', 'hintPL')));

    var flip = mkBtn({
      className: 'ms4-btn ms4-btn--tonal ms4-btn--md ms4-btn--full',
      icon: 'camera-flip',
      label: S('aim', 'flip'),
      onClick: flipCamera
    });

    previewSheet = U.sheet({
      title: S('aim', 'titlePL'),
      subtitle: T('measure', 'previewHint'),
      size: 'full',
      body: body,
      onClose: closePreviewSheet
    });
    if (previewSheet) {
      addCls(previewSheet.root, 'ms4-measure__aimsheet');
      if (previewSheet.body && body.parentNode !== previewSheet.body) previewSheet.body.appendChild(body);
      if (previewSheet.body) previewSheet.body.appendChild(flip.root);
    }
  }

  function closePreviewSheet() {
    previewSheet = null;
    if (!stage || !stageHome) return;
    // Podgląd wraca dokładnie tam, skąd go zabraliśmy — engine.js nie zauważa przeprowadzki.
    if (stageHomeNext && stageHomeNext.parentNode === stageHome) stageHome.insertBefore(stage, stageHomeNext);
    else stageHome.appendChild(stage);
    stageHome = null;
    stageHomeNext = null;
    // Arkusz mógł zostać zamknięty razem z wyjściem z widoku — wtedy karta jest
    // już pod display:none i podgląd musi natychmiast pojechać na postój.
    if (!isActive) parkStage();
  }

  /* ---- postój podglądu poza widokiem POMIAR ----
     Sekcje nieaktywnych widoków mają display: none. Wideo w takim poddrzewie
     przestaje w części przeglądarek (Safari na iOS, tryby oszczędzania energii)
     dostarczać nowe klatki, a engine.js dalej rysuje z niego co 200 ms — do
     magistrali i do historii szłyby zamrożone wartości udające pomiar.
     Dlatego poza widokiem odstawiamy węzeł do <body> i chowamy go wizualnie,
     nigdy przez display: none. */

  function parkStage() {
    if (!stage || previewSheet || !doc.body) return;
    if (stage.parentNode === doc.body) return;
    addCls(stage, 'ms4-camera__stage--parked');
    doc.body.appendChild(stage);
  }

  function adoptStage() {
    if (!stage || previewSheet || !nodes.camera) return;
    stage.classList.remove('ms4-camera__stage--parked');
    if (stage.parentNode === nodes.camera) return;
    if (nodes.cameraHint && nodes.cameraHint.parentNode === nodes.camera) {
      nodes.camera.insertBefore(stage, nodes.cameraHint);
    } else {
      nodes.camera.appendChild(stage);
    }
  }

  /* ---- siatka kafelków ---- */

  function buildTilesSection() {
    var wrap = el('div', 'ms4-stack');

    var head = el('div', 'ms4-section');
    head.appendChild(el('h2', 'ms4-section__title', T('measure', 'tilesTitle')));
    head.appendChild(el('p', 'ms4-section__sub', T('measure', 'tilesSub')));
    wrap.appendChild(head);

    wrap.appendChild(buildEmpty());

    var grid = el('div', 'ms4-tiles ms4-grid ms4-grid--metrics');
    var cat = catalogue();
    for (var i = 0; i < cat.length; i += 1) {
      var t = buildTile(cat[i]);
      tiles.push(t);
      sparkData[t.id] = [];
      grid.appendChild(t.root);
    }
    nodes.grid = grid;
    wrap.appendChild(grid);
    show(grid, false);
    return wrap;
  }

  function buildEmpty() {
    var box = el('div', 'ms4-empty');
    var ic = el('div', 'ms4-empty__icon');
    ic.appendChild(icon('measure', 56));
    box.appendChild(ic);
    box.appendChild(el('h3', 'ms4-empty__title', T('empty', 'measureTitle')));
    box.appendChild(el('p', 'ms4-empty__text', T('empty', 'measureText')));
    var act = mkBtn({
      className: 'ms4-btn ms4-btn--tonal ms4-btn--md ms4-empty__action',
      icon: 'play', iconSize: 20,
      label: T('empty', 'measureKey'),
      onClick: startMeasurement
    });
    box.appendChild(act.root);
    nodes.empty = box;
    return box;
  }

  function buildTile(m) {
    var btn = el('button', TILE_BASE);
    btn.type = 'button';

    var head = el('div', 'ms4-tile__head');
    head.appendChild(addCls(icon(METRIC_ICON[m.id] || 'info', 20), 'ms4-tile__icon'));
    head.appendChild(el('span', 'ms4-tile__name', m.namePL));
    var badge = el('span', 'ms4-tile__badge');
    if (APPROX[m.id]) badge.textContent = S('readout', 'approxSign');
    head.appendChild(badge);
    btn.appendChild(head);

    var vrow = el('div', 'ms4-tile__valuerow');
    var approx = null;
    if (APPROX[m.id]) {
      approx = el('span', 'ms4-tile__approx', S('readout', 'approxSign'));
      approx.setAttribute('title', S('note', 'approxLegend'));
      vrow.appendChild(approx);
    }
    var value = el('span', 'ms4-tile__value', S('common', 'noValue'));
    vrow.appendChild(value);
    vrow.appendChild(el('span', 'ms4-tile__unit', unitOf(m)));
    btn.appendChild(vrow);

    var sparkBox = el('div', 'ms4-tile__spark');
    btn.appendChild(sparkBox);

    var bar = el('div', 'ms4-tile__bar');
    var fill = el('div', 'ms4-tile__bar-fill');
    bar.appendChild(fill);
    btn.appendChild(bar);

    var zoneWord = el('span', 'ms4-tile__zone', S('stamp', 'none'));
    btn.appendChild(zoneWord);

    var t = {
      id: m.id, root: btn,
      valueEl: value, unitEl: vrow.lastChild, approxEl: approx,
      sparkBox: sparkBox, fillEl: fill, zoneEl: zoneWord,
      valueRow: vrow, spark: null, selected: false, zone: null,
      lastText: S('common', 'noValue'), lastWidth: '', className: TILE_BASE
    };
    btn.addEventListener('click', function () { onTileClick(t); });
    return t;
  }

  function unitOf(m) {
    var Sc = global.Scale;
    if (Sc && typeof Sc.unitSuffix === 'function') {
      var s = Sc.unitSuffix(m.id);
      return s ? s.replace(/^\s+/, '') : '';
    }
    return m.unit || '';
  }

  function onTileClick(t) {
    haptic(10);
    setLead(t.id, true);
  }

  /* ---- noty ---- */

  function buildNotes() {
    var wrap = el('div', 'ms4-stack');

    var limits = el('div', 'ms4-note ms4-note--limits');
    limits.appendChild(addCls(icon('info', 20), 'ms4-note__icon'));
    var lb = el('div', 'ms4-note__body');
    lb.appendChild(el('p', 'ms4-note__title', S('note', 'dashTitle')));
    lb.appendChild(el('p', 'ms4-note__text', S('note', 'dashText')));
    limits.appendChild(lb);
    wrap.appendChild(limits);

    var approx = el('div', 'ms4-note ms4-note--info');
    approx.appendChild(addCls(icon('bulb', 20), 'ms4-note__icon'));
    var ab = el('div', 'ms4-note__body');
    ab.appendChild(el('p', 'ms4-note__text', S('note', 'approxLegend')));
    approx.appendChild(ab);
    wrap.appendChild(approx);

    nodes.noteKelvin = buildRangeNote(S('note', 'kelvinOutOfRange'));
    wrap.appendChild(nodes.noteKelvin);

    nodes.noteFlicker = buildRangeNote(S('note', 'flickerOutOfRange'));
    wrap.appendChild(nodes.noteFlicker);

    return wrap;
  }

  function buildRangeNote(text) {
    var n = el('div', 'ms4-note ms4-note--warning is-hidden');
    n.appendChild(addCls(icon('warning', 20), 'ms4-note__icon'));
    var b = el('div', 'ms4-note__body');
    b.appendChild(el('p', 'ms4-note__text', text));
    n.appendChild(b);
    return n;
  }

  /* ==================================================================
     Kanał wiodący
     ================================================================== */

  function setLead(id, fromUser) {
    var m = metric(id);
    if (!m) return;
    leadId = id;

    if (!arc && global.Gauge && typeof global.Gauge.arc === 'function' && nodes.gaugeBox) {
      arc = global.Gauge.arc(nodes.gaugeBox, { metricId: leadId, thresholds: thresholds });
    } else if (arc && typeof arc.setMetric === 'function') {
      // Scale.bands/ticks są funkcjami budowy — wołamy je tutaj, nigdy przy próbce.
      arc.setMetric(leadId, thresholds);
    }

    for (var i = 0; i < tiles.length; i += 1) {
      var t = tiles[i];
      var sel = t.id === leadId;
      if (sel !== t.selected) { t.selected = sel; applyTileClass(t); }
      t.root.setAttribute('aria-pressed', sel ? 'true' : 'false');
    }

    if (fromUser) {
      var St = global.Store;
      if (St && typeof St.set === 'function') St.set({ leadMetric: leadId });
      var U = global.UI;
      var Sc = global.Scale;
      if (U && typeof U.toast === 'function' && Sc && typeof Sc.fill === 'function') {
        U.toast(Sc.fill(T('toast', 'leadChangedTpl'), { name: m.namePL }), 'info');
      }
      announceLead();
    }
    paintNow();
  }

  function announceLead() {
    var Sc = global.Scale;
    if (!Sc || typeof Sc.announceLead !== 'function') return;
    var v = latest && latest.values ? latest.values[leadId] : null;
    var z = latest && latest.zones ? latest.zones[leadId] : null;
    announce(Sc.announceLead(leadId, v, z));
  }

  function openLeadSheet() {
    var U = global.UI;
    if (!U || typeof U.sheet !== 'function' || leadSheet) return;

    var list = el('div', 'ms4-list ms4-list--inset');
    var cat = catalogue();
    for (var i = 0; i < cat.length; i += 1) list.appendChild(buildLeadRow(cat[i]));

    leadSheet = U.sheet({
      title: T('measure', 'leadSheetTitle'),
      subtitle: T('measure', 'leadSheetSub'),
      size: 'auto',
      body: list,
      onClose: function () { leadSheet = null; }
    });
    if (leadSheet) {
      addCls(leadSheet.root, 'ms4-leadsheet');
      if (leadSheet.body && list.parentNode !== leadSheet.body) leadSheet.body.appendChild(list);
    }
  }

  function buildLeadRow(m) {
    var row = el('button', 'ms4-row');
    row.type = 'button';

    var ic = el('span', 'ms4-row__icon');
    ic.appendChild(icon(METRIC_ICON[m.id] || 'info', 24));
    row.appendChild(ic);

    var text = el('div', 'ms4-row__text');
    text.appendChild(el('p', 'ms4-row__title', m.namePL));
    text.appendChild(el('p', 'ms4-row__subtitle', m.shortPL));
    row.appendChild(text);

    var Sc = global.Scale;
    var v = latest && latest.values ? latest.values[m.id] : null;
    var valueText = !Sc ? S('common', 'noValue') : Sc.formatValue(m.id, v);
    row.appendChild(el('span', 'ms4-row__value', valueText));

    var ctrl = el('span', 'ms4-row__control');
    if (m.id === leadId) ctrl.appendChild(icon('check', 20));
    row.appendChild(ctrl);

    row.addEventListener('click', function () {
      setLead(m.id, true);
      if (leadSheet && typeof leadSheet.close === 'function') leadSheet.close();
      leadSheet = null;
    });
    return row;
  }

  /* ==================================================================
     Sterowanie silnikiem
     ================================================================== */

  function toggleMeasurement() {
    var E = global.Engine;
    if (!E) return;
    // Także w stanie „starting": jeżeli pytanie o zgodę zawisło albo kamerę
    // trzyma inna aplikacja, getUserMedia potrafi nigdy nie odpowiedzieć.
    // Klawisz musi wtedy dawać wyjście, a nie być martwy.
    if (E.isRunning() || E.state() === 'starting') {
      haptic(20);
      E.stop();
      cancelStartWatchdog();
    } else {
      startMeasurement();
    }
  }

  /* ------------------------------------------------------------------
     Czuwak startu

     getUserMedia nie ma limitu czasu. Przeglądarka, która pokazała pytanie
     o zgodę i nie dostała odpowiedzi, zostawia obietnicę nierozstrzygniętą —
     silnik siedzi wtedy w „starting" bez końca, bez błędu i bez próbek.
     Po STARTUP_LIMIT_MS przerywamy próbę i mówimy wprost, co sprawdzić.
     ------------------------------------------------------------------ */
  var STARTUP_LIMIT_MS = 15000;
  var startWatchdog = null;

  function cancelStartWatchdog() {
    if (startWatchdog) { global.clearTimeout(startWatchdog); startWatchdog = null; }
  }

  function armStartWatchdog() {
    cancelStartWatchdog();
    startWatchdog = global.setTimeout(function () {
      startWatchdog = null;
      var E = global.Engine;
      if (!E || E.state() !== 'starting') return;
      E.stop();
      onError({ messagePL: T('error', 'startTimeout') });
    }, STARTUP_LIMIT_MS);
  }

  function startMeasurement() {
    var E = global.Engine;
    if (!E || E.isRunning()) return;
    haptic(10);
    show(nodes.errorBox, false);

    // Plik otwarty z dysku (file://) to dla przeglądarki źródło nieokreślone.
    // Chrome nie potrafi przypisać takiemu źródłu zgody na kamerę i zwykle
    // ANI nie pyta, ANI nie odrzuca — obietnica getUserMedia po prostu nigdy
    // się nie rozstrzyga. Bez tego sprawdzenia jedynym objawem jest klawisz,
    // który na zawsze zostaje na „Uruchamiam…”. Mówimy o tym od razu.
    if (global.location && global.location.protocol === 'file:') {
      onError({ messagePL: T('error', 'fileProtocol') });
      return;
    }

    armStartWatchdog();
    E.start({ facingMode: settings().cameraFacing || 'environment' });
  }

  function flipCamera() {
    var E = global.Engine;
    if (!E || typeof E.switchCamera !== 'function' || !E.isRunning()) return;
    haptic(10);
    E.switchCamera();
  }

  function applyMirror() {
    var E = global.Engine;
    if (!video || !E || typeof E.facingMode !== 'function') return;
    if (E.facingMode() === 'user') video.classList.add('is-mirrored');
    else video.classList.remove('is-mirrored');
  }

  /* ==================================================================
     Reakcje na zdarzenia magistrali
     ================================================================== */

  function syncEngineState(state) {
    var b = nodes.start;
    if (!b) return;
    var running = state === 'running';
    var starting = state === 'starting';

    var cls = 'ms4-btn ' + (running ? 'ms4-btn--danger' : 'ms4-btn--primary') +
      ' ms4-btn--lg ms4-btn--full ms4-actions__start' + (starting ? ' is-loading' : '');
    if (b.root.getAttribute('class') !== cls) b.root.setAttribute('class', cls);

    setBtnIcon(b, (running || starting) ? 'stop' : 'play', 24);
    var label = running ? T('measure', 'stop') : (starting ? T('measure', 'starting') : T('measure', 'start'));
    if (b.labelEl && b.labelEl.textContent !== label) b.labelEl.textContent = label;
    // Nigdy nie wygaszamy klawisza: w „starting" jest jedynym sposobem
    // przerwania próby, która się zacięła (patrz czuwak startu).
    b.root.disabled = false;

    if (nodes.flip) {
      nodes.flip.root.disabled = !running;
      if (running) nodes.flip.root.classList.remove('is-disabled');
      else nodes.flip.root.classList.add('is-disabled');
    }
    show(nodes.liveBadge, running);
    if (!running && !starting) show(nodes.warmup, false);
    if (state !== 'error') show(nodes.errorBox, false);
  }

  function onStarted(data) {
    cancelStartWatchdog();
    startedAt = data && data.startedAt ? data.startedAt : Date.now();
    warmupAnnounced = false;
    show(nodes.errorBox, false);
    show(nodes.warmup, true);
    applyMirror();
    var St = global.Store;
    var E = global.Engine;
    if (St && typeof St.set === 'function' && E && typeof E.facingMode === 'function') {
      St.set({ cameraFacing: E.facingMode() });
    }
    announce(S('live', 'started'));
    tickClock();
  }

  function onStopped(data) {
    startedAt = null;
    show(nodes.warmup, false);
    var Sc = global.Scale;
    var session = data && data.session;
    if (Sc && typeof Sc.announceStopped === 'function' && session) {
      announce(Sc.announceStopped(session.durationMs));
    }
    tickClock();
  }

  function onError(data) {
    cancelStartWatchdog();
    if (!nodes.errorBox) return;
    var msg = data && data.messagePL ? data.messagePL : T('error', 'unknown');
    nodes.errorText.textContent = msg;
    show(nodes.errorBox, true);
    show(nodes.warmup, false);
    startedAt = null;
  }

  function onSample(data) {
    var reading = data && data.reading;
    if (!reading) return;
    latest = reading;
    sampleNo += 1;
    pushSpark(reading);
    requestPaint();
  }

  function pushSpark(reading) {
    for (var i = 0; i < tiles.length; i += 1) {
      var id = tiles[i].id;
      var arr = sparkData[id];
      var v = reading.values ? reading.values[id] : null;
      arr.push({ t: reading.t, v: typeof v === 'number' && isFinite(v) ? v : null });
      if (arr.length > SPARK_POINTS) arr.shift();
    }
  }

  function onThresholds() {
    var E = global.Engine;
    thresholds = E && E.getThresholds ? E.getThresholds() : null;
    if (arc && typeof arc.setMetric === 'function') arc.setMetric(leadId, thresholds);
    paintNow();
  }

  function onCalibration() {
    var text = calibrationText();
    if (nodes.calib && text !== lastCalibText) {
      nodes.calib.textContent = text;
      lastCalibText = text;
    }
  }

  function onSettings(data) {
    var s = (data && data.settings) || settings();
    var next = pickLead(s.leadMetric);
    if (next !== leadId) setLead(next, false);
  }

  function nameOf(id) {
    var m = metric(id);
    return m ? m.namePL : '';
  }

  function fillAria(key, map) {
    var Sc = global.Scale;
    var tpl = T('aria', key);
    return Sc && typeof Sc.fill === 'function' ? Sc.fill(tpl, map) : tpl;
  }

  /* ==================================================================
     Malowanie — jedna klatka na próbkę
     ================================================================== */

  function requestPaint() {
    if (rafId) return;
    rafId = raf(function () { rafId = 0; paint(); });
  }

  function paintNow() {
    if (!builtOk) return;
    paint();
  }

  function paint() {
    if (!builtOk) return;
    var now = Date.now();
    var reading = latest;

    if (reading && !hasAnyReading) {
      hasAnyReading = true;
      show(nodes.empty, false);
      show(nodes.grid, true);
    }

    paintGauge(reading);
    paintStamp(reading);
    paintVerdict(reading, now);
    paintWarmup(now);
    paintTiles(reading);
    paintRangeNotes(reading);
  }

  function paintGauge(reading) {
    if (!arc || typeof arc.update !== 'function') return;
    var v = reading && reading.values ? reading.values[leadId] : null;
    var z = reading && reading.zones ? reading.zones[leadId] : null;
    arc.update(typeof v === 'number' && isFinite(v) ? v : null, z || null);
  }

  function paintStamp(reading) {
    var Sc = global.Scale;
    if (!Sc || !nodes.stamp) return;
    var warming = startedAt !== null && (Date.now() - startedAt) < WARMUP_MS;
    var zone = warming ? 'settling' : (reading && reading.zones ? reading.zones[leadId] || null : null);
    if (zone === lastStampZone) return;
    lastStampZone = zone;

    var mod = zone === 'settling' ? 'none' : (ZONE_MOD[zone] || 'none');
    var word = zone === 'settling' ? S('stamp', 'settling') : Sc.stamp(zone).wordPL;
    // Jedno przypisanie klasy i tylko przy faktycznej zmianie strefy (SPEC 8.3).
    nodes.stamp.setAttribute('class', 'ms4-stamp ms4-stamp--' + mod + ' ms4-hero__stamp');
    nodes.stampShape.setAttribute('class', 'ms4-stamp__shape ms4-stamp__shape--' + mod);
    nodes.stampWord.textContent = word;
  }

  function paintVerdict(reading, now) {
    var Sc = global.Scale;
    if (!Sc || !nodes.verdict) return;

    if (startedAt === null && !reading) {
      setVerdict(S('verdict', 'idle'));
      return;
    }
    if (startedAt !== null && (now - startedAt) < WARMUP_MS) {
      setVerdict(S('verdict', 'warmup'));
      return;
    }
    if (!reading) return;

    var v = Sc.verdict(reading, thresholds);
    if (v.zone !== pendingZone) {
      pendingZone = v.zone;
      pendingSince = now;
    }
    // Histereza 4 s: nowa strefa musi się utrzymać, zanim zdanie się zmieni.
    // Kolor plakietki i liczby zmieniają się od razu — to tylko zdanie czeka.
    if (shownVerdictZone === null || v.zone === shownVerdictZone || (now - pendingSince) >= VERDICT_HOLD_MS) {
      shownVerdictZone = v.zone;
      setVerdict(v.textPL);
    }
  }

  function setVerdict(text) {
    if (!text || text === lastVerdictText) return;
    nodes.verdict.textContent = text;
    lastVerdictText = text;
  }

  function paintWarmup(now) {
    if (!nodes.warmup) return;
    if (startedAt === null) return;
    var elapsed = now - startedAt;
    if (elapsed >= WARMUP_MS) {
      if (!nodes.warmup.classList.contains('is-hidden')) show(nodes.warmup, false);
      if (!warmupAnnounced) {
        warmupAnnounced = true;
        var Sc = global.Scale;
        if (Sc && typeof Sc.announceReady === 'function' && latest) {
          announce(Sc.announceReady(leadId, latest.values[leadId], latest.zones[leadId]));
        }
      }
      return;
    }
    nodes.warmupFill.style.width = Math.round((elapsed / WARMUP_MS) * 100) + '%';
  }

  function paintTiles(reading) {
    var Sc = global.Scale;
    if (!Sc) return;
    var drawSpark = sampleNo % SPARK_EVERY === 0;
    for (var i = 0; i < tiles.length; i += 1) {
      var t = tiles[i];
      var value = reading && reading.values ? reading.values[t.id] : null;
      var zone = reading && reading.zones ? reading.zones[t.id] || null : null;

      var text = Sc.formatValue(t.id, value);
      if (text !== t.lastText) { t.valueEl.textContent = text; t.lastText = text; }

      var pos = Sc.pos(t.id, value);
      var width = (pos === null ? 0 : Math.round(pos)) + '%';
      if (width !== t.lastWidth) { t.fillEl.style.width = width; t.lastWidth = width; }

      if (zone !== t.zone) {
        t.zone = zone;
        applyTileClass(t);
        t.zoneEl.textContent = Sc.stamp(zone).wordPL;
        t.root.setAttribute('aria-label', fillAria('tileTpl', {
          name: nameOf(t.id), value: Sc.spoken(t.id, value), zone: Sc.spokenZone(zone)
        }));
      }
      if (drawSpark && t.spark && typeof t.spark.update === 'function') {
        t.spark.update(sparkData[t.id]);
      }
    }
  }

  function applyTileClass(t) {
    var cls = TILE_BASE;
    if (t.selected) cls += ' is-selected';
    if (t.zone && ZONE_CLASS[t.zone]) cls += ' ' + ZONE_CLASS[t.zone];
    if (cls === t.className) return;
    t.className = cls;
    t.root.setAttribute('class', cls);
  }

  function paintRangeNotes(reading) {
    var extra = reading && reading.extra ? reading.extra : null;
    var kOk = !extra || extra.kelvinReliable !== false;
    if (kOk !== lastKelvinOk) {
      lastKelvinOk = kOk;
      show(nodes.noteKelvin, !kOk);
    }
    var fOk = !extra || extra.flickerWithinRange !== false;
    if (fOk !== lastFlickerOk) {
      lastFlickerOk = fOk;
      show(nodes.noteFlicker, !fOk);
    }
  }

  /* ==================================================================
     Zegar sesji i region aria-live
     ================================================================== */

  function tickClock() {
    if (!nodes.clock) return;
    var E = global.Engine;
    var Sc = global.Scale;
    var text;
    if (E && E.isRunning() && startedAt !== null && Sc && typeof Sc.duration === 'function') {
      text = Sc.duration(Date.now() - startedAt);
    } else {
      text = T('measure', 'sessionIdle');
    }
    if (text !== lastClockText) {
      nodes.clock.textContent = text;
      lastClockText = text;
    }
    if (startedAt !== null && (Date.now() - startedAt) < WARMUP_MS) paintWarmup(Date.now());
  }

  function announce(text) {
    if (!text) return;
    var now = Date.now();
    if (now - lastAnnounceAt < ANNOUNCE_MIN_MS) return;
    lastAnnounceAt = now;
    var U = global.UI;
    if (U && typeof U.announce === 'function') U.announce(text);
  }

  /* ==================================================================
     Cykl życia widoku
     ================================================================== */

  function enter() {
    if (!builtOk) return;
    isActive = true;
    adoptStage();

    var B = global.Bus;
    var E = global.Engine;

    thresholds = E && E.getThresholds ? E.getThresholds() : thresholds;
    latest = E && typeof E.latest === 'function' ? E.latest() : null;
    if (E && E.isRunning()) {
      var s = typeof E.session === 'function' ? E.session() : null;
      startedAt = s && s.startedAt ? s.startedAt : Date.now();
    } else {
      startedAt = null;
    }

    // Mikrowykresy powstają dopiero przy pierwszym wejściu: gauge.js jest
    // wtedy na pewno załadowany, a pusty kafelek nie ma czego rysować.
    ensureSparks();

    if (B) {
      offs.push(B.on('engine:state', function (d) { syncEngineState(d && d.state); }));
      offs.push(B.on('engine:started', onStarted));
      offs.push(B.on('engine:stopped', onStopped));
      offs.push(B.on('engine:error', onError));
      offs.push(B.on('engine:sample', onSample));
      offs.push(B.on('engine:thresholds', onThresholds));
      offs.push(B.on('engine:calibration', onCalibration));
      offs.push(B.on('settings:changed', onSettings));
    }

    clockTimer = global.setInterval(tickClock, 1000);

    syncEngineState(E ? E.state() : 'idle');
    onCalibration();
    applyMirror();
    tickClock();
    paintNow();
  }

  function ensureSparks() {
    var G = global.Gauge;
    if (!G || typeof G.spark !== 'function') return;
    for (var i = 0; i < tiles.length; i += 1) {
      if (tiles[i].spark) continue;
      tiles[i].spark = G.spark(tiles[i].sparkBox, { metricId: tiles[i].id });
    }
    if (!arc && typeof G.arc === 'function' && nodes.gaugeBox) {
      arc = G.arc(nodes.gaugeBox, { metricId: leadId, thresholds: thresholds });
    }
  }

  function leave() {
    isActive = false;
    for (var i = 0; i < offs.length; i += 1) {
      try { offs[i](); } catch (_) { /* odpięcie nie ma prawa wywrócić przejścia między widokami */ }
    }
    offs.length = 0;
    if (clockTimer) { global.clearInterval(clockTimer); clockTimer = null; }
    unraf(rafId);
    rafId = 0;
    // Arkusz podglądu odda węzeł sam (closePreviewSheet), i to on go zaparkuje;
    // bez arkusza parkujemy tutaj, zanim sekcja widoku dostanie display: none.
    var hadPreview = !!previewSheet;
    if (previewSheet && typeof previewSheet.close === 'function') previewSheet.close();
    if (leadSheet && typeof leadSheet.close === 'function') leadSheet.close();
    previewSheet = null;
    leadSheet = null;
    if (!hadPreview) parkStage();
  }

  /* ==================================================================
     Rejestracja widoku
     ================================================================== */

  var VIEW = {
    id: 'measure',
    labelPL: T('nav', 'measure'),
    icon: 'measure',
    build: build,
    enter: enter,
    leave: leave
  };

  /* app.js ładuje się jako OSTATNI (SPEC 0.2), więc w chwili wykonania tego
     pliku window.App jeszcze nie istnieje. Rejestracja czeka w kolejce
     window.__ms4PendingViews, a atrapa App udostępnia tę samą kolejkę pod
     nazwą, której szuka router. Kiedy app.js podstawi prawdziwy obiekt,
     zastanie w kolejce cztery komplety widoków w kolejności skryptów. */
  function registerView(view) {
    var A = global.App;
    if (A && typeof A.registerView === 'function' && !A.__pending) {
      A.registerView(view);
      return;
    }
    var q = global.__ms4PendingViews || (global.__ms4PendingViews = []);
    q.push(view);
    if (!A) global.App = { registerView: registerView, __pending: q };
  }

  registerView(VIEW);

  global.ScreenMeasure = {
    id: 'measure',
    view: VIEW,
    lead: function () { return leadId; },
    setLead: function (id) { setLead(id, false); },
    isActive: function () { return isActive; }
  };

}(typeof window !== 'undefined' ? window : globalThis));
