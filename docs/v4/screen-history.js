/* Monitor Światła v4 — ekran HISTORIA.
 *
 * ROLA PLIKU: pokazuje to, co już zostało zmierzone. Nic nie mierzy, nic nie
 * liczy od nowa z pikseli i niczego nie zapisuje do historii — pyta silnik
 * (Engine.buffer / Engine.history / Engine.session), agreguje wynik do postaci,
 * którą rozumie gauge.js, i rysuje.
 *
 * Trzy rzeczy, które trzeba wiedzieć czytając ten plik:
 *
 * 1. Silnik ma DWA źródła danych o różnej rozdzielczości. Bufor na żywo
 *    (Engine.buffer) to pełne odczyty 5 Hz z ostatniej minuty — kształt
 *    { t, values, zones, extra }. Bufor długi (Engine.history) to jeden punkt
 *    na 5 sekund z ostatnich 30 dni — kształt płaski { t, share, brightness,
 *    …, zone }, gdzie `zone` dotyczy WYŁĄCZNIE kanału wiodącego silnika.
 *    Dlatego strefę dla wybranej wielkości liczymy tu sami przez Scale.zone.
 *
 * 2. Engine.history przyjmuje { sinceMs, untilMs, maxPoints } — nie { from, to,
 *    step }. Wartość mniejsza niż rok 2001 jest traktowana jako czas trwania,
 *    więc `{ sinceMs: 3600000 }` znaczy „ostatnia godzina”.
 *
 * 3. Trzydzieści dni to nawet 15 000 punktów. Wykres nigdy nie dostaje surowej
 *    tablicy: krótkie zakresy są przerzedzane do ~320 punktów, długie zwijane
 *    w kubełki godzinowe/dobowe. Statystyka liczy się z tych samych punktów,
 *    z których powstał wykres, w jednym przebiegu.
 *
 * Przerysowanie: przy wejściu w widok, na 'engine:history', na zmianę zakresu,
 * wielkości i progów — oraz w trakcie pomiaru nie częściej niż raz na sekundę
 * (a dla zakresów słupkowych raz na piętnaście sekund, bo do historii i tak
 * wpada jeden punkt na pięć sekund, a kubełek ma godzinę).
 */
(function (global) {
  'use strict';

  var VIEW_ID = 'history';

  /* ------------------------------------------------------------------
     Zakresy czasu
     ------------------------------------------------------------------ */

  // live      — dane z bufora 5 Hz zamiast z historii
  // kind      — 'tape' (przebieg liniowy) albo 'bars' (panorama słupków)
  // bucketMs  — szerokość kubełka agregacji; 0 = bez zwijania, samo przerzedzanie
  // liveMs    — jak często wolno przerysować w trakcie pomiaru
  var RANGES = [
    { id: '1min', key: 'r1min', ms: 60000, live: true, kind: 'tape', bucketMs: 0, gapMs: 1200, liveMs: 1000 },
    { id: '1h', key: 'r1h', ms: 3600000, live: false, kind: 'tape', bucketMs: 15000, gapMs: 20000, liveMs: 1000 },
    { id: '24h', key: 'r24h', ms: 86400000, live: false, kind: 'bars', bucketMs: 3600000, gapMs: 20000, liveMs: 15000 },
    { id: '7d', key: 'r7d', ms: 604800000, live: false, kind: 'bars', bucketMs: 21600000, gapMs: 20000, liveMs: 15000 },
    { id: '30d', key: 'r30d', ms: 2592000000, live: false, kind: 'bars', bucketMs: 86400000, gapMs: 20000, liveMs: 15000 }
  ];

  var TAPE_MAX_POINTS = 320;   // więcej niż pikseli w szerokości wykresu i tak nie widać
  var HOUR_MS = 3600000;
  var COVERAGE_SLOTS = 24;     // „Pokrycie doby” — jeden kafelek na godzinę
  var SESSIONS_MAX = 40;

  // Ikony siedmiu wielkości (załącznik B specyfikacji).
  var METRIC_ICONS = {
    share: 'droplet', brightness: 'sun', kelvin: 'thermometer', melanopic: 'moon',
    flicker: 'waveform', uniformity: 'grid', comfort: 'eye'
  };

  /* ------------------------------------------------------------------
     Drobne narzędzia
     ------------------------------------------------------------------ */

  function UIref() { return global.UI || null; }
  function ScaleRef() { return global.Scale || null; }
  function EngineRef() { return global.Engine || null; }
  function MetricsRef() { return global.Metrics || null; }

  function el(tag, cls, text) {
    var ui = UIref();
    if (ui && typeof ui.el === 'function') return ui.el(tag, cls, text);
    var node = global.document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function clear(node) {
    var ui = UIref();
    if (ui && typeof ui.clear === 'function') { ui.clear(node); return; }
    while (node && node.firstChild) node.removeChild(node.firstChild);
  }

  function on(node, ev, fn) {
    var ui = UIref();
    if (ui && typeof ui.on === 'function') return ui.on(node, ev, fn);
    node.addEventListener(ev, fn);
    return function () { node.removeEventListener(ev, fn); };
  }

  function icon(name, size) {
    var ui = UIref();
    if (ui && typeof ui.icon === 'function') return ui.icon(name, size);
    return el('span', 'is-hidden');
  }

  /** Cały polski tekst tego ekranu pochodzi z UI.T albo ze Scale.TEXT.
   *  Brakujący klucz daje pusty napis, nigdy wyjątku i nigdy angielszczyzny. */
  function T(path) {
    var ui = UIref();
    var cur = ui ? ui.T : null;
    if (!cur) return '';
    var parts = path.split('.');
    for (var i = 0; i < parts.length; i += 1) {
      if (cur === null || cur === undefined) return '';
      cur = cur[parts[i]];
    }
    return typeof cur === 'string' ? cur : '';
  }

  function ST(path) {
    var s = ScaleRef();
    var cur = s ? s.TEXT : null;
    if (!cur) return '';
    var parts = path.split('.');
    for (var i = 0; i < parts.length; i += 1) {
      if (cur === null || cur === undefined) return '';
      cur = cur[parts[i]];
    }
    return typeof cur === 'string' ? cur : '';
  }

  function fill(template, map) {
    var s = ScaleRef();
    if (s && typeof s.fill === 'function') return s.fill(template, map);
    return template || '';
  }

  function isNum(v) {
    return typeof v === 'number' && isFinite(v);
  }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  function fmtDate(ts) {
    var ui = UIref();
    if (ui && typeof ui.fmtDate === 'function') return ui.fmtDate(ts);
    var d = new Date(ts);
    return pad2(d.getDate()) + '.' + pad2(d.getMonth() + 1) + '.' + d.getFullYear();
  }

  function fmtTime(ts) {
    var ui = UIref();
    if (ui && typeof ui.fmtTime === 'function') return ui.fmtTime(ts);
    var d = new Date(ts);
    return pad2(d.getHours()) + ':' + pad2(d.getMinutes());
  }

  function durationWords(ms) {
    var s = ScaleRef();
    return s && typeof s.durationWords === 'function' ? s.durationWords(ms) : '';
  }

  function durationClock(ms) {
    var s = ScaleRef();
    return s && typeof s.duration === 'function' ? s.duration(ms) : '';
  }

  /** '27%' / '4200 K' — liczba z jednostką, zawsze przez Scale (przecinek!). */
  function fmtValue(metricId, value) {
    var s = ScaleRef();
    if (!s) return '';
    var text = s.formatValue(metricId, value);
    if (!isNum(value)) return text;
    return text + (typeof s.unitSuffix === 'function' ? s.unitSuffix(metricId) : '');
  }

  function tone(zone) {
    var ui = UIref();
    if (ui && typeof ui.zoneTone === 'function') {
      var t = ui.zoneTone(zone);
      if (t) return t;
    }
    if (zone === 'good') return 'good';
    if (zone === 'warning') return 'warn';
    if (zone === 'critical') return 'crit';
    return '';
  }

  /** 'ms4-badge--good' albo samo 'ms4-badge' — pusty modyfikator nie ma prawa
   *  trafić do atrybutu class, bo CSS nie ma czego pod nim narysować. */
  function toneClass(base, zone) {
    var t = tone(zone);
    return t ? base + ' ' + base + '--' + t : base;
  }

  function zoneWord(zone) {
    if (zone === 'good') return T('history.zoneGood') || ST('stamp.good');
    if (zone === 'warning') return T('history.zoneWarn') || ST('stamp.warning');
    if (zone === 'critical') return T('history.zoneCrit') || ST('stamp.critical');
    return ST('stamp.none');
  }

  function pct(part, whole) {
    if (!whole) return 0;
    return Math.round((part / whole) * 100);
  }

  /** UI.button z lokalnym zapasem — ekran ma się zbudować także wtedy, gdy
   *  prymityw nie zwróci węzła. */
  function button(opts) {
    var ui = UIref();
    if (ui && typeof ui.button === 'function') {
      var made = ui.button(opts);
      if (made && made.nodeType === 1) return made;
    }
    var cls = 'ms4-btn ms4-btn--' + (opts.variant || 'ghost') + ' ms4-btn--' + (opts.size || 'md');
    if (opts.full) cls += ' ms4-btn--full';
    var node = el('button', cls);
    node.type = 'button';
    if (opts.icon) {
      var ico = icon(opts.icon, opts.size === 'sm' ? 20 : 24);
      ico.setAttribute('class', 'ms4-btn__icon');
      node.appendChild(ico);
    }
    node.appendChild(el('span', 'ms4-btn__label', opts.label || ''));
    if (typeof opts.onClick === 'function') on(node, 'click', opts.onClick);
    return node;
  }

  function show(node, visible) {
    if (!node) return;
    if (visible) node.classList.remove('is-hidden');
    else node.classList.add('is-hidden');
  }

  function currentRange() {
    for (var i = 0; i < RANGES.length; i += 1) if (RANGES[i].id === state.rangeId) return RANGES[i];
    return RANGES[0];
  }

  function rangeLabel(range) { return T('history.' + range.key); }

  function metricLocked(metricId) {
    var m = MetricsRef() ? global.Metrics.byId(metricId) : null;
    if (!m || !m.premium) return false;
    var b = global.Billing;
    if (b && typeof b.isUnlocked === 'function') return !b.isUnlocked(metricId);
    return true;
  }

  function firstFreeMetric() {
    var cat = MetricsRef() ? global.Metrics.CATALOGUE : [];
    for (var i = 0; i < cat.length; i += 1) if (!metricLocked(cat[i].id)) return cat[i].id;
    return cat.length ? cat[0].id : 'share';
  }

  /* ------------------------------------------------------------------
     Stan ekranu
     ------------------------------------------------------------------ */

  var state = {
    rangeId: '1h',
    metricId: 'share',
    built: false,
    entered: false,
    thresholds: null,
    thrStamp: 0,        // rośnie na 'engine:thresholds' — unieważnia wykres
    chart: null,
    chartKey: '',
    lastDrawAt: 0,
    pendingTimer: null,
    tickTimer: null,
    subs: [],
    sessions: [],
    sessionsKey: ''
  };

  var dom = {};   // węzły budowane raz w build(); potem tylko podmieniamy treść

  /* ------------------------------------------------------------------
     Ustawienia zapamiętane w Store
     ------------------------------------------------------------------ */

  /* Preferencje czytamy TYLKO raz, przy pierwszym wejściu. enter() zdarza się przy
     każdym powrocie z innej zakładki, a wybór z tej sesji musi go przeżyć. */
  var prefsRead = false;

  function readPrefs() {
    if (prefsRead) {
      // Przy powrocie sprawdzamy już tylko to, co mogło się zmienić poza ekranem:
      // utratę Premium na wybranej wielkości.
      if (metricLocked(state.metricId)) state.metricId = firstFreeMetric();
      return;
    }
    prefsRead = true;

    var s = null;
    try { if (global.Store && typeof global.Store.get === 'function') s = global.Store.get(); } catch (_) { s = null; }
    var range = s ? s.historyRange : null;
    for (var i = 0; i < RANGES.length; i += 1) if (RANGES[i].id === range) state.rangeId = range;

    var metrics = MetricsRef();
    var wanted = s ? s.historyMetric : null;
    if (!(metrics && global.Metrics.byId(wanted))) wanted = s ? s.leadMetric : null;
    if (metrics && global.Metrics.byId(wanted)) state.metricId = wanted;
    // Wielkość zamknięta kłódką nie może zostać wybrana z pamięci — inaczej
    // po utracie Premium ekran rysowałby dane, za które nikt nie zapłacił.
    if (metricLocked(state.metricId)) state.metricId = firstFreeMetric();
  }

  function savePrefs() {
    try {
      if (global.Store && typeof global.Store.set === 'function') {
        global.Store.set({ historyRange: state.rangeId, historyMetric: state.metricId });
      }
    } catch (_) { /* brak pamięci nie może wywrócić ekranu */ }
  }

  /* ------------------------------------------------------------------
     Zbieranie i agregacja danych
     ------------------------------------------------------------------ */

  /** Punkty wybranej wielkości w wybranym zakresie: [{ t, v, zone }].
   *  Jedno źródło prawdy dla wykresu, statystyki i rozkładu stref. */
  function collect(range) {
    var engine = EngineRef();
    var out = [];
    if (!engine) return out;

    if (range.live) {
      var buf = engine.buffer(range.ms) || [];
      for (var i = 0; i < buf.length; i += 1) {
        var r = buf[i];
        var v = r && r.values ? r.values[state.metricId] : null;
        if (!isNum(v)) continue;
        out.push({ t: r.t, v: v, zone: r.zones ? r.zones[state.metricId] : null });
      }
      return out;
    }

    var pts = engine.history({ sinceMs: range.ms }) || [];
    var scale = ScaleRef();
    for (var j = 0; j < pts.length; j += 1) {
      var p = pts[j];
      var pv = p[state.metricId];
      if (!isNum(pv)) continue;
      // p.zone dotyczy kanału wiodącego silnika, nie tej wielkości — liczymy własną.
      out.push({ t: p.t, v: pv, zone: scale ? scale.zone(state.metricId, pv, state.thresholds) : null });
    }
    return out;
  }

  /** Statystyka liczona w jednym przebiegu po tych samych punktach, które
   *  trafiają na wykres. Czas w strefie to suma odstępów między próbkami —
   *  przerwa dłuższa niż `gapMs` to przerwa w pomiarze, nie czas pomiaru. */
  function summarize(points, range) {
    var out = {
      n: points.length, min: null, avg: null, max: null,
      coveredMs: 0, zoneMs: { good: 0, warning: 0, critical: 0 }, zoneTotal: 0
    };
    if (!points.length) return out;

    var sum = 0, min = Infinity, max = -Infinity;
    for (var i = 0; i < points.length; i += 1) {
      var v = points[i].v;
      sum += v;
      if (v < min) min = v;
      if (v > max) max = v;
      if (i > 0) {
        var dt = points[i].t - points[i - 1].t;
        if (dt > 0 && dt <= range.gapMs) {
          out.coveredMs += dt;
          var z = points[i - 1].zone;
          if (z && out.zoneMs[z] !== undefined) { out.zoneMs[z] += dt; out.zoneTotal += dt; }
        }
      }
    }
    out.min = min;
    out.max = max;
    out.avg = sum / points.length;
    return out;
  }

  /** Przebieg liniowy: kubełki średnich albo równomierne przerzedzenie.
   *  Wynik to [{ t, v }] — kształt, którego oczekuje Gauge.tape. */
  function toTape(points, range) {
    if (!points.length) return [];

    if (range.bucketMs > 0) {
      var out = [];
      var bucketStart = Math.floor(points[0].t / range.bucketMs) * range.bucketMs;
      var sum = 0, n = 0;
      for (var i = 0; i < points.length; i += 1) {
        var b = Math.floor(points[i].t / range.bucketMs) * range.bucketMs;
        if (b !== bucketStart) {
          if (n) out.push({ t: bucketStart + range.bucketMs / 2, v: sum / n });
          bucketStart = b; sum = 0; n = 0;
        }
        sum += points[i].v; n += 1;
      }
      if (n) out.push({ t: bucketStart + range.bucketMs / 2, v: sum / n });
      return out.length > TAPE_MAX_POINTS ? thin(out) : out;
    }

    if (points.length <= TAPE_MAX_POINTS) {
      var plain = new Array(points.length);
      for (var j = 0; j < points.length; j += 1) plain[j] = { t: points[j].t, v: points[j].v };
      return plain;
    }
    return thin(points);
  }

  function thin(points) {
    var step = points.length / TAPE_MAX_POINTS;
    var out = new Array(TAPE_MAX_POINTS);
    for (var i = 0; i < TAPE_MAX_POINTS; i += 1) {
      var p = points[Math.floor(i * step)];
      out[i] = { t: p.t, v: p.v };
    }
    // Ostatni punkt zawsze przeżywa przerzedzenie — prawa krawędź wykresu
    // sprzed dwóch godzin wygląda jak zawieszony pomiar.
    var last = points[points.length - 1];
    out[TAPE_MAX_POINTS - 1] = { t: last.t, v: last.v };
    return out;
  }

  /** Panorama słupków: [{ t, avg, min, max, zone }] dla PEŁNEJ siatki kubełków
   *  obejmującej cały zakres. Gauge.bars ustawia słupek po INDEKSIE w tablicy, więc
   *  zagęszczona lista (same kubełki z próbkami) rozłożyłaby trzy pomiary równo na
   *  całej szerokości i skłamała osią czasu. Puste sloty niosą avg === null —
   *  Gauge.bars je pomija, a pozostałe stoją we właściwym miejscu osi. */
  function toBuckets(points, range) {
    var out = [];
    if (!points.length || !(range.bucketMs > 0)) return out;
    var scale = ScaleRef();
    var now = Date.now();

    // O jeden kubełek więcej niż wynika z dzielenia: ostatni slot to ten trwający.
    var count = Math.ceil(range.ms / range.bucketMs) + 1;
    var first = Math.floor(now / range.bucketMs) * range.bucketMs - (count - 1) * range.bucketMs;

    var acc = new Array(count);
    var i;
    for (i = 0; i < count; i += 1) {
      acc[i] = null;
      out.push({ t: first + i * range.bucketMs + range.bucketMs / 2, avg: null, min: null, max: null, zone: null });
    }

    for (i = 0; i < points.length; i += 1) {
      var idx = Math.floor((points[i].t - first) / range.bucketMs);
      if (idx < 0 || idx >= count) continue;
      var a = acc[idx];
      if (!a) { a = { sum: 0, n: 0, min: Infinity, max: -Infinity }; acc[idx] = a; }
      a.sum += points[i].v;
      a.n += 1;
      if (points[i].v < a.min) a.min = points[i].v;
      if (points[i].v > a.max) a.max = points[i].v;
    }

    for (i = 0; i < count; i += 1) {
      if (!acc[i] || !acc[i].n) continue;
      var avg = acc[i].sum / acc[i].n;
      out[i].avg = avg;
      out[i].min = acc[i].min;
      out[i].max = acc[i].max;
      out[i].zone = scale ? scale.zone(state.metricId, avg, state.thresholds) : null;
    }
    return out;
  }

  /** Pokrycie doby: 24 godzinne kratki, wypełnione tam, gdzie był pomiar. */
  function coverage(points) {
    var now = Date.now();
    var start = Math.floor((now - COVERAGE_SLOTS * HOUR_MS) / HOUR_MS) * HOUR_MS;
    var slots = new Array(COVERAGE_SLOTS);
    for (var i = 0; i < COVERAGE_SLOTS; i += 1) slots[i] = false;
    var done = 0;
    for (var j = 0; j < points.length; j += 1) {
      var idx = Math.floor((points[j].t - start) / HOUR_MS);
      if (idx < 0 || idx >= COVERAGE_SLOTS) continue;
      if (!slots[idx]) { slots[idx] = true; done += 1; }
    }
    return { slots: slots, done: done, total: COVERAGE_SLOTS, start: start };
  }

  /* ------------------------------------------------------------------
     Budowa widoku (raz)
     ------------------------------------------------------------------ */

  function build(root) {
    readPrefs();

    dom.root = el('div', 'ms4-history');

    dom.main = el('div', 'ms4-history__main');
    dom.side = el('div', 'ms4-history__side');
    dom.root.appendChild(dom.main);
    dom.root.appendChild(dom.side);

    dom.main.appendChild(buildChartCard());
    dom.side.appendChild(buildLiveCard());
    dom.side.appendChild(buildStatsCard());
    dom.side.appendChild(buildSessionsCard());

    root.appendChild(dom.root);
    state.built = true;
  }

  function buildChartCard() {
    var card = el('section', 'ms4-card');
    var header = el('div', 'ms4-card__header');
    var titles = el('div', 'ms4-card__titles');
    titles.appendChild(el('h2', 'ms4-card__title', T('history.chartTitle')));
    titles.appendChild(el('p', 'ms4-card__subtitle', T('history.chartSub')));
    header.appendChild(titles);

    var actions = el('div', 'ms4-card__actions');
    dom.exportBtn = button({
      label: T('history.exportShort'), variant: 'ghost', size: 'sm', icon: 'export',
      onClick: openExport
    });
    dom.exportBtn.setAttribute('aria-label', T('history.exportAria'));
    actions.appendChild(dom.exportBtn);
    header.appendChild(actions);
    card.appendChild(header);

    var body = el('div', 'ms4-card__body');

    // Zakres czasu
    dom.ranges = el('div', 'ms4-ranges');
    dom.ranges.appendChild(buildSegmented());
    body.appendChild(dom.ranges);

    // Wybór wielkości
    var chipsScroll = el('div', 'ms4-scroll-x');
    dom.chips = el('div', 'ms4-row-inline');
    dom.chips.setAttribute('role', 'group');
    dom.chips.setAttribute('aria-label', T('history.metricAria'));
    chipsScroll.appendChild(dom.chips);
    body.appendChild(chipsScroll);
    buildChips();

    // Wykres i stan pusty stoją w tym samym miejscu, na zmianę.
    dom.chartWrap = el('div', 'ms4-stack');
    body.appendChild(dom.chartWrap);

    dom.empty = buildEmpty();
    body.appendChild(dom.empty.root);

    // Pokrycie doby — tylko dla zakresu 24 godz.
    dom.coverage = el('div', 'ms4-stack is-hidden');
    dom.coverageTitle = el('h3', 'ms4-section__title', T('history.coverageTitle'));
    dom.coverageBar = el('div', 'ms4-coverage');
    dom.coverageCaption = el('p', 'ms4-coverage__caption');
    dom.coverage.appendChild(dom.coverageTitle);
    dom.coverage.appendChild(dom.coverageBar);
    dom.coverage.appendChild(dom.coverageCaption);
    body.appendChild(dom.coverage);

    card.appendChild(body);

    var footer = el('div', 'ms4-card__footer ms4-row-inline');
    dom.clearBtn = button({
      label: T('history.clear'), variant: 'danger', size: 'sm', icon: 'trash',
      onClick: confirmClear
    });
    footer.appendChild(dom.clearBtn);
    card.appendChild(footer);

    return card;
  }

  /** Segmenty rysowane tu, a nie przez UI.segmented, bo pigułka pod wybranym
   *  segmentem musi znać szerokość opcji — a tę znamy dopiero po ułożeniu. */
  function buildSegmented() {
    var wrap = el('div', 'ms4-segmented ms4-segmented--full');
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', T('history.rangeAria'));

    dom.thumb = el('span', 'ms4-segmented__thumb');
    dom.thumb.setAttribute('aria-hidden', 'true');
    wrap.appendChild(dom.thumb);

    dom.rangeButtons = [];
    for (var i = 0; i < RANGES.length; i += 1) {
      (function (range) {
        var b = el('button', 'ms4-segmented__option', rangeLabel(range));
        b.type = 'button';
        b.setAttribute('aria-label', fill(T('aria.rangeTpl'), { name: rangeLabel(range) }));
        b.setAttribute('aria-pressed', range.id === state.rangeId ? 'true' : 'false');
        if (range.id === state.rangeId) b.classList.add('is-active');
        on(b, 'click', function () { setRange(range.id); });
        dom.rangeButtons.push({ id: range.id, node: b });
        wrap.appendChild(b);
      }(RANGES[i]));
    }
    dom.segmented = wrap;
    return wrap;
  }

  function buildChips() {
    clear(dom.chips);
    var cat = MetricsRef() ? global.Metrics.CATALOGUE : [];
    for (var i = 0; i < cat.length; i += 1) {
      (function (m) {
        var locked = metricLocked(m.id);
        var cls = 'ms4-chip ms4-chip--selectable';
        if (locked) cls += ' ms4-chip--premium is-locked';
        else if (m.id === state.metricId) cls += ' is-selected';
        var chip = el('button', cls);
        chip.type = 'button';
        chip.setAttribute('aria-pressed', (!locked && m.id === state.metricId) ? 'true' : 'false');
        if (locked) {
          chip.setAttribute('aria-label', fill(T('aria.tileLockedTpl'), { name: m.namePL }));
        }
        var ico = icon(locked ? 'lock' : (METRIC_ICONS[m.id] || 'measure'), 16);
        ico.setAttribute('class', 'ms4-chip__icon');
        chip.appendChild(ico);
        chip.appendChild(el('span', 'ms4-chip__label', m.namePL));
        on(chip, 'click', function () {
          if (locked) { openPaywall(m.id); return; }
          setMetric(m.id);
        });
        dom.chips.appendChild(chip);
      }(cat[i]));
    }
  }

  function buildEmpty() {
    var root = el('div', 'ms4-empty is-hidden');
    var ico = el('div', 'ms4-empty__icon');
    var svg = icon('history', 56);
    ico.appendChild(svg);
    var title = el('h3', 'ms4-empty__title');
    var text = el('p', 'ms4-empty__text');
    var action = button({
      label: T('empty.historyKey'), variant: 'tonal', size: 'md',
      onClick: function () { if (global.App && typeof global.App.go === 'function') global.App.go('measure'); }
    });
    action.classList.add('ms4-empty__action');
    root.appendChild(ico);
    root.appendChild(title);
    root.appendChild(text);
    root.appendChild(action);
    return { root: root, title: title, text: text, action: action };
  }

  function buildStatsCard() {
    var card = el('section', 'ms4-card');
    var header = el('div', 'ms4-card__header');
    header.appendChild(el('h2', 'ms4-card__title', T('history.statsTitle')));
    card.appendChild(header);

    var body = el('div', 'ms4-card__body');
    dom.stats = el('div', 'ms4-grid ms4-grid--stats ms4-stats');
    dom.statNodes = {};
    var defs = [
      { id: 'min', label: T('history.statMin') },
      { id: 'avg', label: T('history.statAvg') },
      { id: 'max', label: T('history.statMax') },
      { id: 'time', label: T('history.statTime') },
      { id: 'samples', label: T('history.statSamples') }
    ];
    for (var i = 0; i < defs.length; i += 1) {
      var stat = el('div', 'ms4-stat');
      stat.appendChild(el('div', 'ms4-stat__label', defs[i].label));
      var value = el('div', 'ms4-stat__value ms4-num');
      stat.appendChild(value);
      dom.statNodes[defs[i].id] = value;
      dom.stats.appendChild(stat);
    }
    body.appendChild(dom.stats);

    body.appendChild(el('h3', 'ms4-section__title', T('history.zonesTitle')));
    dom.zonebar = el('div', 'ms4-zonebar');
    dom.zonebar.setAttribute('role', 'img');
    dom.zoneLegend = el('div', 'ms4-zonebar__legend');
    body.appendChild(dom.zonebar);
    body.appendChild(dom.zoneLegend);

    card.appendChild(body);
    return card;
  }

  function buildLiveCard() {
    var card = el('section', 'ms4-card ms4-card--accent is-hidden');
    var header = el('div', 'ms4-card__header');
    header.appendChild(el('h2', 'ms4-card__title', T('history.sessionRunning')));
    card.appendChild(header);

    var body = el('div', 'ms4-card__body');
    var grid = el('div', 'ms4-grid ms4-grid--stats');
    dom.liveNodes = {};
    var defs = [
      { id: 'time', label: T('history.statTime') },
      { id: 'samples', label: T('history.statSamples') },
      { id: 'avg', label: T('history.statAvg') }
    ];
    for (var i = 0; i < defs.length; i += 1) {
      var stat = el('div', 'ms4-stat');
      stat.appendChild(el('div', 'ms4-stat__label', defs[i].label));
      var value = el('div', 'ms4-stat__value ms4-num');
      stat.appendChild(value);
      dom.liveNodes[defs[i].id] = value;
      grid.appendChild(stat);
    }
    body.appendChild(grid);
    card.appendChild(body);
    dom.liveCard = card;
    return card;
  }

  function buildSessionsCard() {
    var card = el('section', 'ms4-card');
    var header = el('div', 'ms4-card__header');
    var titles = el('div', 'ms4-card__titles');
    titles.appendChild(el('h2', 'ms4-card__title', T('history.sessionsTitle')));
    titles.appendChild(el('p', 'ms4-card__subtitle', T('history.sessionsSub')));
    header.appendChild(titles);
    card.appendChild(header);

    var body = el('div', 'ms4-card__body');
    dom.sessions = el('div', 'ms4-list ms4-list--inset ms4-sessions');
    body.appendChild(dom.sessions);

    dom.sessionsEmpty = el('div', 'ms4-empty is-hidden');
    var ico = el('div', 'ms4-empty__icon');
    ico.appendChild(icon('clock', 56));
    dom.sessionsEmpty.appendChild(ico);
    dom.sessionsEmpty.appendChild(el('h3', 'ms4-empty__title', T('empty.sessionsTitle')));
    dom.sessionsEmpty.appendChild(el('p', 'ms4-empty__text', T('empty.sessionsText')));
    body.appendChild(dom.sessionsEmpty);

    card.appendChild(body);
    return card;
  }

  /* ------------------------------------------------------------------
     Reakcje na wybór użytkownika
     ------------------------------------------------------------------ */

  function setRange(id) {
    if (state.rangeId === id) return;
    state.rangeId = id;
    savePrefs();
    syncSegmented();
    var ui = UIref();
    if (ui && typeof ui.announce === 'function') {
      ui.announce(fill(T('aria.rangeTpl'), { name: rangeLabel(currentRange()) }));
    }
    refresh();
  }

  function setMetric(id) {
    if (state.metricId === id) return;
    state.metricId = id;
    savePrefs();
    buildChips();
    refresh();
  }

  function syncSegmented() {
    if (!dom.rangeButtons) return;
    for (var i = 0; i < dom.rangeButtons.length; i += 1) {
      var entry = dom.rangeButtons[i];
      var active = entry.id === state.rangeId;
      entry.node.classList[active ? 'add' : 'remove']('is-active');
      entry.node.setAttribute('aria-pressed', active ? 'true' : 'false');
    }
    positionThumb();
  }

  /** Pigułka pod wybranym segmentem. Odczyt offsetWidth jest tu dozwolony —
   *  to reakcja na kliknięcie i na zmianę rozmiaru okna, nigdy na próbkę. */
  function positionThumb() {
    if (!dom.thumb || !dom.rangeButtons) return;
    var target = null;
    for (var i = 0; i < dom.rangeButtons.length; i += 1) {
      if (dom.rangeButtons[i].id === state.rangeId) target = dom.rangeButtons[i].node;
    }
    if (!target || !target.offsetWidth) return;
    dom.thumb.style.width = target.offsetWidth + 'px';
    dom.thumb.style.transform = 'translateX(' + target.offsetLeft + 'px)';
  }

  function openExport() {
    if (global.Tools && typeof global.Tools.openExport === 'function') global.Tools.openExport();
  }

  function hasExport() {
    return !!(global.Tools && typeof global.Tools.openExport === 'function');
  }

  function openPaywall(metricId) {
    var b = global.Billing;
    if (b && typeof b.openPaywall === 'function') b.openPaywall({ source: VIEW_ID, metricId: metricId });
  }

  function confirmClear() {
    var ui = UIref();
    var engine = EngineRef();
    if (!engine) return;
    if (!ui || typeof ui.dialog !== 'function') { doClear(); return; }
    ui.dialog({
      title: T('history.clear'),
      text: T('confirm.clearHistory'),
      confirm: T('confirm.clearHistoryKey'),
      cancel: T('confirm.cancel'),
      tone: 'danger'
    }).then(function (ok) { if (ok) doClear(); });
  }

  function doClear() {
    var engine = EngineRef();
    if (!engine) return;
    engine.clearHistory();
    state.sessions = [];
    var ui = UIref();
    if (ui && typeof ui.toast === 'function') ui.toast(ST('transient.historyCleared'), 'info');
    refresh();
  }

  /* ------------------------------------------------------------------
     Rysowanie
     ------------------------------------------------------------------ */

  function destroyChart() {
    if (state.chart && typeof state.chart.destroy === 'function') {
      try { state.chart.destroy(); } catch (_) { /* wykres i tak znika z DOM */ }
    }
    state.chart = null;
    state.chartKey = '';
    if (dom.chartWrap) clear(dom.chartWrap);
  }

  /** Wykres powstaje na nowo tylko wtedy, gdy zmienia się jego rodzaj,
   *  wielkość albo progi — zmiana samych danych to update(). */
  function ensureChart(range) {
    var key = range.kind + '|' + state.metricId + '|' + state.thrStamp;
    if (state.chart && state.chartKey === key) {
      if (range.kind === 'tape' && typeof state.chart.setRange === 'function') state.chart.setRange(range.ms);
      return state.chart;
    }
    destroyChart();
    if (!global.Gauge) return null;

    var host = el('div', range.kind === 'tape' ? 'ms4-tape' : 'ms4-bars');
    dom.chartWrap.appendChild(host);
    var made = null;
    try {
      made = range.kind === 'tape'
        ? global.Gauge.tape(host, { metricId: state.metricId, thresholds: state.thresholds })
        : global.Gauge.bars(host, { metricId: state.metricId, thresholds: state.thresholds });
    } catch (_) { made = null; }
    if (made && range.kind === 'tape' && typeof made.setRange === 'function') made.setRange(range.ms);
    state.chart = made;
    state.chartKey = made ? key : '';
    return made;
  }

  function refresh() {
    if (!state.built || !state.entered) return;
    state.lastDrawAt = Date.now();
    if (state.pendingTimer) { global.clearTimeout(state.pendingTimer); state.pendingTimer = null; }

    var engine = EngineRef();
    if (engine && typeof engine.getThresholds === 'function') state.thresholds = engine.getThresholds();

    var range = currentRange();
    var points = collect(range);
    var stats = summarize(points, range);

    var hasAny = points.length > 0;
    show(dom.chartWrap, hasAny);
    show(dom.empty.root, !hasAny);

    if (hasAny) {
      var chart = ensureChart(range);
      if (chart && typeof chart.update === 'function') {
        try {
          chart.update(range.kind === 'tape' ? toTape(points, range) : toBuckets(points, range));
        } catch (_) { /* zły punkt nie może zdjąć całego ekranu */ }
      }
    } else {
      destroyChart();
      renderEmptyState();
    }

    renderStats(stats);
    renderZones(stats);
    renderCoverage(points, range);
    renderSessions();
    renderLive();

    if (dom.clearBtn) {
      var count = engine && typeof engine.historyCount === 'function' ? engine.historyCount() : 0;
      dom.clearBtn.disabled = count === 0;
      dom.clearBtn.classList[count === 0 ? 'add' : 'remove']('is-disabled');
    }
    show(dom.exportBtn, hasExport());
  }

  function renderEmptyState() {
    var engine = EngineRef();
    var totally = !engine || (typeof engine.historyCount === 'function' && engine.historyCount() === 0);
    if (totally) {
      dom.empty.title.textContent = T('empty.historyTitle') || ST('empty.historyEmpty');
      dom.empty.text.textContent = ST('empty.recorderNoHistory') || T('empty.historyText');
      show(dom.empty.action, true);
    } else {
      dom.empty.title.textContent = T('empty.searchTitle');
      dom.empty.text.textContent = ST('empty.recorderNoRange') || T('empty.searchText');
      show(dom.empty.action, false);
    }
  }

  function renderStats(stats) {
    var n = dom.statNodes;
    if (!n) return;
    n.min.textContent = fmtValue(state.metricId, stats.min);
    n.avg.textContent = fmtValue(state.metricId, stats.avg);
    n.max.textContent = fmtValue(state.metricId, stats.max);
    n.time.textContent = stats.coveredMs > 0 ? durationWords(stats.coveredMs) : fmtValue(state.metricId, null);
    n.samples.textContent = String(stats.n);
  }

  function renderZones(stats) {
    clear(dom.zonebar);
    clear(dom.zoneLegend);
    var total = stats.zoneTotal;
    var zones = ['good', 'warning', 'critical'];
    var parts = [];
    for (var i = 0; i < zones.length; i += 1) {
      var share = total ? pct(stats.zoneMs[zones[i]], total) : 0;
      parts.push(zoneWord(zones[i]) + ' ' + share + '%');
      if (total && stats.zoneMs[zones[i]] > 0) {
        var seg = el('span', toneClass('ms4-zonebar__seg', zones[i]));
        seg.style.width = share + '%';
        dom.zonebar.appendChild(seg);
      }
      var legend = el('span', toneClass('ms4-badge', zones[i]) + ' ms4-badge--dot',
        zoneWord(zones[i]) + ' ' + share + '%');
      dom.zoneLegend.appendChild(legend);
    }
    dom.zonebar.setAttribute('aria-label', parts.join(' · '));
  }

  function renderCoverage(points, range) {
    var visible = range.id === '24h';
    show(dom.coverage, visible);
    if (!visible) return;
    var cov = coverage(points);
    clear(dom.coverageBar);
    for (var i = 0; i < cov.slots.length; i += 1) {
      var cell = el('span', 'ms4-coverage__seg' + (cov.slots[i] ? ' is-active' : ''));
      dom.coverageBar.appendChild(cell);
    }
    dom.coverageCaption.textContent = fill(ST('empty.coverageTpl'), { done: cov.done, total: cov.total });
    dom.coverageBar.setAttribute('aria-label', dom.coverageCaption.textContent);
  }

  /* ------------------------------------------------------------------
     Sesje
     ------------------------------------------------------------------ */

  function rememberSession(session) {
    if (!session || !session.startedAt) return;
    for (var i = 0; i < state.sessions.length; i += 1) {
      if (state.sessions[i].startedAt === session.startedAt) { state.sessions[i] = session; return; }
    }
    state.sessions.push(session);
    state.sessions.sort(function (a, b) { return b.startedAt - a.startedAt; });
    if (state.sessions.length > SESSIONS_MAX) state.sessions.length = SESSIONS_MAX;
  }

  function dominantZone(session) {
    var z = session && session.zones ? session.zones : null;
    if (!z) return null;
    var best = null, bestN = -1;
    var keys = ['critical', 'warning', 'good'];
    for (var i = 0; i < keys.length; i += 1) {
      var n = z[keys[i]] || 0;
      if (n > bestN) { bestN = n; best = keys[i]; }
    }
    return bestN > 0 ? best : null;
  }

  /** Lista sesji zmienia się rzadko, a odświeżenie ekranu bywa co sekundę:
   *  klucz pilnuje, żeby te same wiersze nie były budowane od nowa. */
  function renderSessions() {
    if (!dom.sessions) return;
    var list = state.sessions;
    var key = list.length + '|' + state.metricId + '|' + state.thrStamp +
      '|' + (list.length ? list[0].startedAt : 0);
    if (key === state.sessionsKey) return;
    state.sessionsKey = key;
    clear(dom.sessions);
    show(dom.sessionsEmpty, list.length === 0);
    for (var i = 0; i < list.length; i += 1) dom.sessions.appendChild(sessionRow(list[i]));
  }

  function sessionRow(session) {
    var row = el('button', 'ms4-row ms4-session');
    row.type = 'button';
    row.setAttribute('aria-label', T('history.sessionOpen'));

    var zone = dominantZone(session);
    var dot = el('span', toneClass('ms4-badge', zone) + ' ms4-badge--dot', '');
    dot.setAttribute('aria-hidden', 'true');
    var iconWrap = el('span', 'ms4-row__icon');
    iconWrap.appendChild(dot);
    row.appendChild(iconWrap);

    var text = el('div', 'ms4-row__text');
    text.appendChild(el('div', 'ms4-session__when ms4-row__title',
      fmtDate(session.startedAt) + ' · ' + fmtTime(session.startedAt)));
    var samplesWord = (T('history.statSamples') || '').toLowerCase();
    text.appendChild(el('div', 'ms4-session__dur ms4-row__subtitle',
      durationWords(session.durationMs) + ' · ' + session.samples + ' ' + samplesWord));
    row.appendChild(text);

    var avgValue = session.avg ? session.avg[state.metricId] : null;
    var scale = ScaleRef();
    var avgZone = scale && isNum(avgValue) ? scale.zone(state.metricId, avgValue, state.thresholds) : null;
    var avg = el('div', 'ms4-row__value ' + toneClass('ms4-session__avg', avgZone),
      fmtValue(state.metricId, avgValue));
    row.appendChild(avg);

    var chev = icon('chevron-right', 20);
    chev.setAttribute('class', 'ms4-row__chevron');
    row.appendChild(chev);

    on(row, 'click', function () { openSession(session); });
    return row;
  }

  function openSession(session) {
    var ui = UIref();
    if (!ui || typeof ui.sheet !== 'function') return;

    var body = el('div', 'ms4-stack');
    var grid = el('div', 'ms4-grid ms4-grid--stats ms4-stats');
    var defs = [
      { label: T('history.statMin'), value: fmtValue(state.metricId, session.min ? session.min[state.metricId] : null) },
      { label: T('history.statAvg'), value: fmtValue(state.metricId, session.avg ? session.avg[state.metricId] : null) },
      { label: T('history.statMax'), value: fmtValue(state.metricId, session.max ? session.max[state.metricId] : null) },
      { label: T('history.statTime'), value: durationWords(session.durationMs) },
      { label: T('history.statSamples'), value: String(session.samples || 0) }
    ];
    for (var i = 0; i < defs.length; i += 1) {
      var stat = el('div', 'ms4-stat');
      stat.appendChild(el('div', 'ms4-stat__label', defs[i].label));
      stat.appendChild(el('div', 'ms4-stat__value ms4-num', defs[i].value));
      grid.appendChild(stat);
    }
    body.appendChild(grid);

    // Rozkład stref sesji liczy silnik i dotyczy kanału wiodącego —
    // mówimy to wprost strukturą: pasek stoi pod nagłówkiem „Rozkład stref”.
    body.appendChild(el('h3', 'ms4-section__title', T('history.zonesTitle')));
    var bar = el('div', 'ms4-zonebar');
    var legend = el('div', 'ms4-zonebar__legend');
    var zones = ['good', 'warning', 'critical'];
    var total = 0;
    for (var j = 0; j < zones.length; j += 1) total += (session.zones ? session.zones[zones[j]] : 0) || 0;
    for (var k = 0; k < zones.length; k += 1) {
      var count = (session.zones ? session.zones[zones[k]] : 0) || 0;
      var share = pct(count, total);
      if (count > 0) {
        var seg = el('span', toneClass('ms4-zonebar__seg', zones[k]));
        seg.style.width = share + '%';
        bar.appendChild(seg);
      }
      legend.appendChild(el('span', toneClass('ms4-badge', zones[k]) + ' ms4-badge--dot',
        zoneWord(zones[k]) + ' ' + share + '%'));
    }
    body.appendChild(bar);
    body.appendChild(legend);

    var note = el('div', 'ms4-note ms4-note--info');
    var noteIcon = icon('info', 20);
    noteIcon.setAttribute('class', 'ms4-note__icon');
    note.appendChild(noteIcon);
    note.appendChild(el('p', 'ms4-note__text', T('history.sessionsSub')));
    body.appendChild(note);

    ui.sheet({
      title: fmtDate(session.startedAt) + ' · ' + fmtTime(session.startedAt),
      subtitle: durationWords(session.durationMs),
      size: 'auto',
      body: body
    });
  }

  function renderLive() {
    var engine = EngineRef();
    var running = !!(engine && typeof engine.isRunning === 'function' && engine.isRunning());
    show(dom.liveCard, running);
    if (!running) return;
    updateLiveNumbers();
  }

  /** Wywoływane raz na sekundę — wyłącznie trzy przypisania textContent. */
  function updateLiveNumbers() {
    var engine = EngineRef();
    if (!engine || !dom.liveNodes) return;
    var s = engine.session();
    if (!s) return;
    dom.liveNodes.time.textContent = durationClock(s.durationMs);
    dom.liveNodes.samples.textContent = String(s.samples || 0);
    dom.liveNodes.avg.textContent = fmtValue(state.metricId, s.avg ? s.avg[state.metricId] : null);
  }

  /* ------------------------------------------------------------------
     Przerysowania: zdarzenia i dławik
     ------------------------------------------------------------------ */

  /** W trakcie pomiaru dane dochodzą bez przerwy. Wykres liniowy wolno odświeżyć
   *  raz na sekundę; słupkowy raz na piętnaście, bo kubełek ma co najmniej
   *  godzinę i częstsze rysowanie nie zmieniłoby ani jednego piksela. */
  function scheduleRefresh() {
    if (!state.entered) return;
    var minGap = currentRange().liveMs;
    var since = Date.now() - state.lastDrawAt;
    if (since >= minGap) { refresh(); return; }
    if (state.pendingTimer) return;
    state.pendingTimer = global.setTimeout(function () {
      state.pendingTimer = null;
      refresh();
    }, minGap - since);
  }

  function tick() {
    var engine = EngineRef();
    var running = !!(engine && typeof engine.isRunning === 'function' && engine.isRunning());
    if (dom.liveCard) {
      var visible = !dom.liveCard.classList.contains('is-hidden');
      if (running !== visible) show(dom.liveCard, running);
    }
    if (!running) return;
    updateLiveNumbers();
    scheduleRefresh();
  }

  function subscribe() {
    var bus = global.Bus;
    if (!bus) return;
    state.subs.push(bus.on('engine:history', function () { scheduleRefresh(); }));
    state.subs.push(bus.on('engine:thresholds', function () {
      state.thrStamp += 1;      // wykres trzeba zbudować od nowa: pasy stref się zmieniły
      refresh();
    }));
    state.subs.push(bus.on('engine:started', function () { renderLive(); }));
    state.subs.push(bus.on('engine:stopped', function (data) {
      if (data && data.session) rememberSession(data.session);
      refresh();
    }));
    state.subs.push(bus.on('engine:state', function () { renderLive(); }));
    state.subs.push(bus.on('billing:changed', function () {
      if (metricLocked(state.metricId)) { state.metricId = firstFreeMetric(); savePrefs(); }
      buildChips();
      refresh();
    }));
    state.subs.push(bus.on('settings:changed', function () {
      // Zmiana skali tekstu przesuwa segmenty; pigułka musi za nimi nadążyć.
      positionThumb();
    }));
  }

  function unsubscribe() {
    for (var i = 0; i < state.subs.length; i += 1) {
      if (typeof state.subs[i] === 'function') state.subs[i]();
    }
    state.subs = [];
  }

  function onResize() { positionThumb(); }

  /* ------------------------------------------------------------------
     Cykl życia widoku
     ------------------------------------------------------------------ */

  function enter() {
    state.entered = true;
    readPrefs();
    buildChips();
    syncSegmented();

    var engine = EngineRef();
    if (engine) {
      if (typeof engine.getThresholds === 'function') state.thresholds = engine.getThresholds();
      // Ostatnia zakończona sesja przeżywa odświeżenie strony — bierzemy ją,
      // żeby lista nie była pusta po powrocie do aplikacji.
      var last = typeof engine.session === 'function' ? engine.session() : null;
      if (last && last.endedAt) rememberSession(last);
    }

    subscribe();
    global.addEventListener('resize', onResize);
    if (state.tickTimer) global.clearInterval(state.tickTimer);
    state.tickTimer = global.setInterval(tick, 1000);

    refresh();
    // Układ segmentów znany dopiero po pierwszym ułożeniu widoku.
    global.requestAnimationFrame(positionThumb);
  }

  function leave() {
    state.entered = false;
    unsubscribe();
    global.removeEventListener('resize', onResize);
    if (state.tickTimer) { global.clearInterval(state.tickTimer); state.tickTimer = null; }
    if (state.pendingTimer) { global.clearTimeout(state.pendingTimer); state.pendingTimer = null; }
    // Widok poza ekranem nie trzyma wykresu: rAF gauge.js kosztuje tyle samo
    // niezależnie od tego, czy ktoś patrzy.
    destroyChart();
  }

  /* ------------------------------------------------------------------
     Rejestracja w powłoce
     ------------------------------------------------------------------ */

  var SPEC = {
    id: VIEW_ID,
    labelPL: T('nav.history'),
    icon: 'history',
    build: build,
    enter: enter,
    leave: leave
  };

  /** app.js ładuje się PO ekranach, więc window.App zwykle jeszcze nie istnieje.
   *  Rejestrujemy się w chwili, w której się pojawi: przez setter na globalu
   *  (działa, gdy app.js przypisuje window.App), a gdyby przeglądarka na to nie
   *  pozwoliła — przez krótkie sprawdzanie do momentu DOMContentLoaded. */
  function register() {
    if (global.App && typeof global.App.registerView === 'function') {
      // labelPL bierzemy dopiero teraz: ui.js jest już załadowany, słownik gotowy.
      SPEC.labelPL = T('nav.history') || SPEC.labelPL;
      global.App.registerView(SPEC);
      return true;
    }
    return false;
  }

  if (!register()) {
    var done = false;
    var finish = function () {
      if (done) return;
      if (register()) done = true;
    };

    var installed = false;
    try {
      var holder;
      Object.defineProperty(global, 'App', {
        configurable: true,
        enumerable: true,
        get: function () { return holder; },
        set: function (value) {
          holder = value;
          finish();
        }
      });
      installed = true;
    } catch (_) { installed = false; }

    if (!installed) {
      var tries = 0;
      var poll = global.setInterval(function () {
        tries += 1;
        if (done || tries > 60) { global.clearInterval(poll); return; }
        finish();
      }, 25);
    }

    if (global.document) {
      if (global.document.readyState === 'loading') {
        global.document.addEventListener('DOMContentLoaded', finish);
      } else {
        global.setTimeout(finish, 0);
      }
    }
  }

}(typeof window !== 'undefined' ? window : globalThis));
