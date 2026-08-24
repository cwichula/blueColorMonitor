/* Monitor Światła v4 — gauge.js
 *
 * ROLA PLIKU: cała wizualizacja danych aplikacji. Pięć rysunków, wszystkie
 * budowane jako inline SVG w JS, bez jednej biblioteki i bez jednego żądania
 * sieciowego:
 *
 *   Gauge.arc   — wskaźnik 270° z łukami stref, podziałką i wielką liczbą
 *   Gauge.spark — mikrowykres do kafelka wielkości
 *   Gauge.tape  — wykres liniowy historii (1 min … 30 dni)
 *   Gauge.bars  — panorama słupków min/śr/maks (24 godz, 30 dni)
 *   Gauge.ring  — pierścień postępu z liczbą w środku
 *
 * Trzy decyzje, na których stoi cały plik:
 *
 *   1. GEOMETRIA NIE JEST TUTAJ. Pozycja wartości, granice stref i podziałka
 *      pochodzą wyłącznie ze Scale.pos / Scale.bands / Scale.zone / Scale.ticks.
 *      Drugie miejsce, w którym liczy się progi, rozjeżdża się ze scale.js
 *      w tydzień — i wtedy pasek mówi co innego niż wskaźnik.
 *
 *   2. ZERO KOLORÓW W JS. Każda barwa przychodzi z klasy CSS albo z
 *      `currentColor`. Dzięki temu zmiana motywu i zmiana palety akcentu nie
 *      wymagają przerysowania czegokolwiek — przeglądarka przemalowuje same
 *      węzły. To także jedyny sposób, żeby ten plik nie łamał zakazu z 0.3.
 *
 *   3. VIEWBOX W PIKSELACH. Każdy rysunek mierzy swój kontener i ustawia
 *      viewBox równy jego rozmiarowi w pikselach. Dzięki temu `stroke-width: 14`
 *      i `--t-caption` z CSS znaczą dokładnie tyle pikseli, ile mówi
 *      specyfikacja, zamiast skalować się razem z rysunkiem.
 *
 * BUDŻET 5 Hz (SPEC 8.3): w `update()` wolno wyłącznie pisać `textContent`
 * i atrybuty istniejących węzłów. Żaden `update()` poniżej nie tworzy węzła,
 * nie czyta układu i nie woła Scale.bands/Scale.ticks. Budowa węzłów dzieje się
 * w `layout()`, wołanym z ResizeObserver, z `setMetric()` i ze zmiany ustawień.
 *
 * Polszczyzna: wyłącznie ze Scale.TEXT i UI.T. Ten plik nie zawiera własnych
 * zdań — nazwy dostępne dla czytnika ekranu składa ze słowników.
 */
(function (global) {
  'use strict';

  var doc = global.document;
  var NS = 'http://www.w3.org/2000/svg';
  var Gauge = {};

  /* ==================================================================
     Dostęp do sąsiadów — leniwy, nigdy przechwycony przy ładowaniu.
     Zła kolejność <script> ma dać pusty rysunek, nie wyjątek przy parsowaniu.
     ================================================================== */

  function S() { return global.Scale || null; }
  function TEXT() { return global.Scale && global.Scale.TEXT ? global.Scale.TEXT : null; }
  function UIT() { return global.UI && global.UI.T ? global.UI.T : null; }

  function metricOf(id) {
    return global.Metrics ? global.Metrics.byId(id) : null;
  }

  function noValue() {
    var t = TEXT();
    return t ? t.common.noValue : '—';
  }

  function sepText() {
    var t = TEXT();
    return t ? t.common.sep : ' · ';
  }

  /** Pozycja 0..1 na skali wielkości. null = brak pomiaru. */
  function posOf(metricId, value) {
    var s = S();
    if (!s) return null;
    var p = s.pos(metricId, value);
    return p === null ? null : p / 100;
  }

  function fmt(metricId, value) {
    var s = S();
    if (!s) return noValue();
    return s.formatValue(metricId, value);
  }

  function unitOf(metricId) {
    var s = S();
    return s ? s.unitSuffix(metricId) : '';
  }

  /** Próg wielkości: najpierw ten ustawiony przez użytkownika, potem katalogowy. */
  function thresholdValue(metricId, key, thresholds) {
    var t = thresholds ? thresholds[metricId] : null;
    if (t && isNum(t[key])) return t[key];
    var m = metricOf(metricId);
    return m ? m[key] : null;
  }

  /* ==================================================================
     Drobiazgi liczbowe i węzłowe
     ================================================================== */

  function isNum(v) { return typeof v === 'number' && isFinite(v); }

  /* Ograniczenie ruchu ma wyłączyć KAŻDĄ animację, także tę rysowaną w JS —
     CSS-owy blok prefers-reduced-motion nie sięga pętli requestAnimationFrame.
     Czytamy jedno i drugie: jawny wybór w ustawieniach wygrywa nad systemem,
     ale brak wyboru nie unieruchamia preferencji systemowej. */
  function motionReduced() {
    try {
      var root = doc && doc.documentElement;
      if (root && root.getAttribute('data-motion') === 'reduced') return true;
      if (global.matchMedia) return global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) { /* stare przeglądarki: zostaje animacja, i tak jest krótka */ }
    return false;
  }

  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  /** Współrzędne skracamy do dwóch miejsc: krótszy atrybut i — ważniejsze —
   *  brak zapisu przy drgnięciu o setną piksela, którego i tak nie widać. */
  function r2(v) { return Math.round(v * 100) / 100; }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  function svgEl(name, cls) {
    var n = doc.createElementNS(NS, name);
    if (cls) n.setAttribute('class', cls);
    return n;
  }

  // Pamięć ostatnio zapisanej wartości atrybutu. setAttribute na niezmienionej
  // wartości i tak unieważnia styl w części przeglądarek, więc porównujemy sami.
  function memo(node) {
    if (!node.__ms4) node.__ms4 = {};
    return node.__ms4;
  }

  function setAttr(node, name, value) {
    var m = memo(node);
    if (m[name] === value) return;
    m[name] = value;
    node.setAttribute(name, value);
  }

  function setText(node, value) {
    var m = memo(node);
    if (m.__text === value) return;
    m.__text = value;
    node.textContent = value;
  }

  function joinCls(a, b) {
    if (a && b) return a + ' ' + b;
    return a || b || '';
  }

  function setCls(node, base, extra) {
    setAttr(node, 'class', joinCls(base, extra));
  }

  /** Pokazanie/ukrycie węzła SVG. `is-hidden` to jedyne !important w aplikacji. */
  function setShown(node, base, shown) {
    setCls(node, base, shown ? '' : 'is-hidden');
  }

  function setLabel(node, textPL) {
    setAttr(node, 'aria-label', textPL);
    if (node.__title) setText(node.__title, textPL);
  }

  /** Korzeń rysunku: rozciągnięty na kontener, viewBox liczony w pikselach. */
  function rootSvg(cls, labelPL) {
    var svg = svgEl('svg', cls);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('role', 'img');
    svg.setAttribute('focusable', 'false');
    var title = svgEl('title', null);
    title.textContent = labelPL || '';
    svg.appendChild(title);
    svg.__title = title;
    setAttr(svg, 'aria-label', labelPL || '');
    return svg;
  }

  function addClass(node, cls) {
    if (node && node.classList && !node.classList.contains(cls)) node.classList.add(cls);
  }

  function toggleClass(node, cls, on) {
    if (!node || !node.classList) return;
    if (on) node.classList.add(cls); else node.classList.remove(cls);
  }

  var ZONE_MOD = { good: 'good', warning: 'warn', critical: 'crit' };

  function zoneMod(zone) { return ZONE_MOD[zone] || null; }

  /** Strefa wartości: ta podana przez wołającego, a jak jej nie ma — policzona. */
  function zoneOf(metricId, value, zone, thresholds) {
    if (zone) return zone;
    var s = S();
    return s ? s.zone(metricId, value, thresholds) : null;
  }

  /* ==================================================================
     Rozmiar, klatka, pula węzłów
     ================================================================== */

  /** Rozmiar rysunku w pikselach. Mierzymy sam <svg>, nie kontener: kontener
   *  ma padding (`ms4-tape` ma var(--s-3)), a rysunek ma wypełnić pole treści. */
  function measure(svg, fallbackW, fallbackH) {
    var rect = svg.getBoundingClientRect();
    var w = Math.round(rect.width);
    var h = Math.round(rect.height);
    if (w < 2) w = fallbackW;
    if (h < 2) h = fallbackH;
    return { w: w, h: h };
  }

  /** Rozmiar czcionki węzła w pikselach — czytany raz na przebudowę układu,
   *  nigdy w pętli próbek. Od niego zależą marginesy osi przy --text-scale 1,3. */
  function fontPx(node, fallback) {
    if (!global.getComputedStyle) return fallback;
    var v = parseFloat(global.getComputedStyle(node).fontSize);
    return isNum(v) && v > 0 ? v : fallback;
  }

  /** Obserwator rozmiaru z zapasowym nasłuchem na resize okna. */
  function observeSize(node, fn) {
    if (global.ResizeObserver) {
      var ro = new global.ResizeObserver(fn);
      ro.observe(node);
      return function () { ro.disconnect(); };
    }
    global.addEventListener('resize', fn);
    return function () { global.removeEventListener('resize', fn); };
  }

  /** Jedna klatka na serię wywołań: dwie próbki w tej samej klatce dają
   *  jedno rysowanie (SPEC 8.3, „jedna klatka na próbkę”). */
  function framer(draw) {
    var id = 0;
    return {
      request: function () {
        if (id) return;
        id = global.requestAnimationFrame(function () { id = 0; draw(); });
      },
      cancel: function () {
        if (!id) return;
        global.cancelAnimationFrame(id);
        id = 0;
      }
    };
  }

  /** Pula węzłów jednego rodzaju. Wykresy historii zmieniają liczbę słupków
   *  i etykiet przy zmianie zakresu; pula pozwala nie kasować DOM-u, tylko
   *  chować nadmiar klasą `is-hidden`. */
  function makePool(parent, tag, cls) {
    var nodes = [];
    var base = cls || '';
    return {
      at: function (i) {
        while (nodes.length <= i) {
          var n = svgEl(tag, base);
          parent.appendChild(n);
          nodes.push(n);
        }
        setCls(nodes[i], base, '');
        return nodes[i];
      },
      /** Ukrywa wszystko od indeksu `used` w górę. */
      trim: function (used) {
        var i;
        for (i = used; i < nodes.length; i += 1) setCls(nodes[i], base, 'is-hidden');
      },
      length: function () { return nodes.length; }
    };
  }

  /* ==================================================================
     Etykiety czasu — wspólne dla tape i bars
     ================================================================== */

  var MIN = 60000, HOUR = 3600000, DAY = 86400000;

  var TIME_STEPS = [
    10000, 15000, 30000, MIN, 2 * MIN, 5 * MIN, 10 * MIN, 15 * MIN, 30 * MIN,
    HOUR, 2 * HOUR, 3 * HOUR, 6 * HOUR, 12 * HOUR, DAY, 2 * DAY, 7 * DAY
  ];

  /** Krok osi czasu tak dobrany, żeby na osi stanęło najwyżej sześć podpisów. */
  function timeStep(spanMs) {
    var i;
    for (i = 0; i < TIME_STEPS.length; i += 1) {
      if (spanMs / TIME_STEPS[i] <= 6) return TIME_STEPS[i];
    }
    return TIME_STEPS[TIME_STEPS.length - 1];
  }

  /** Znaczniki wyrównane do pełnych jednostek CZASU LOKALNEGO, nie do t0 —
   *  oś, na której godziny wypadają o 13:47, wygląda na zepsutą. */
  function timeTicks(t0, t1) {
    var step = timeStep(Math.max(1, t1 - t0));
    var off = new Date(t0).getTimezoneOffset() * MIN;
    var first = Math.ceil((t0 - off) / step) * step + off;
    var out = [];
    var t = first;
    while (t <= t1 && out.length < 12) {
      if (t >= t0) out.push(t);
      t += step;
    }
    return out;
  }

  /** Godzina, minuta albo data — zależnie od tego, ile obejmuje oś. */
  function timeLabel(ms, spanMs) {
    var d = new Date(ms);
    if (spanMs <= 2 * MIN) return pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
    if (spanMs <= 36 * HOUR) return pad2(d.getHours()) + ':' + pad2(d.getMinutes());
    return d.getDate() + '.' + pad2(d.getMonth() + 1);
  }

  /* ==================================================================
     GAUGE.ARC — wskaźnik 270°
     ================================================================== */

  var ARC_START = 135;        // godzina 7:30 w układzie ekranowym
  var ARC_SWEEP = 270;
  var ARC_STROKE = 14;        // musi zgadzać się z ms4-gauge__track w components.css
  // Igła zaczyna się dopiero za polem liczby. Przy 0,34 R przecinała cyfry
  // w środku tarczy — wskazówka szła po napisie i oba stawały się nieczytelne.
  var NEEDLE_IN = 0.62;
  var NEEDLE_OUT = 0.95;
  var CATCH_MS = 200;         // czas dogonienia wartości przez igłę
  var ARIA_EVERY = 1000;      // nazwa dostępna odświeżana raz na sekundę, nie 5×

  function polar(cx, cy, r, deg) {
    var a = deg * Math.PI / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  }

  function arcPath(cx, cy, r, t0, t1) {
    if (!(t1 > t0 + 0.0005)) return '';
    var a0 = ARC_START + t0 * ARC_SWEEP;
    var a1 = ARC_START + t1 * ARC_SWEEP;
    var p0 = polar(cx, cy, r, a0);
    var p1 = polar(cx, cy, r, a1);
    var large = (a1 - a0) > 180 ? 1 : 0;
    return 'M' + r2(p0.x) + ' ' + r2(p0.y) +
           'A' + r2(r) + ' ' + r2(r) + ' 0 ' + large + ' 1 ' + r2(p1.x) + ' ' + r2(p1.y);
  }

  /** Szerokość napisu bez czytania układu. Cyfry tabularne mają stałą szerokość,
   *  więc oszacowanie jest dokładne co do kilku procent — a jedyne, do czego
   *  służy, to decyzja „czy zmniejszyć liczbę, żeby zmieściła się w kole”. */
  function estWidth(str, fs) {
    var w = 0, i, ch;
    for (i = 0; i < str.length; i += 1) {
      ch = str.charAt(i);
      if (ch >= '0' && ch <= '9') w += 0.60;
      else if (ch === ',' || ch === '.' || ch === ' ') w += 0.30;
      else if (ch === '—') w += 0.95;
      else if (ch === '%' || ch === '×') w += 0.80;
      else w += 0.58;
    }
    return w * fs;
  }

  /** Najdłuższy napis, jaki ta wielkość może pokazać — po nim skalujemy liczbę
   *  raz, przy budowie układu, zamiast mierzyć ją przy każdej próbce. */
  function widestLabel(metricId, withUnit) {
    var m = metricOf(metricId);
    if (!m) return '000';
    var suffix = withUnit ? unitOf(metricId) : '';
    var cand = [m.min, m.max, m.warn, m.crit];
    var best = noValue(), i, s;
    for (i = 0; i < cand.length; i += 1) {
      s = fmt(metricId, cand[i]) + suffix;
      if (s.length > best.length) best = s;
    }
    return best;
  }

  Gauge.arc = function (container, options) {
    if (!container || !doc) return nullApi();
    var opts = options || {};
    var metricId = opts.metricId || 'share';
    var thresholds = opts.thresholds || null;

    addClass(container, 'ms4-gauge');

    var svg = rootSvg('ms4-gauge__svg', '');
    var track = svgEl('path', 'ms4-gauge__track');
    var bandsG = svgEl('g', null);
    var ticksG = svgEl('g', 'ms4-gauge__ticks');
    var labelsG = svgEl('g', null);
    var needleG = svgEl('g', null);
    var needle = svgEl('line', 'ms4-gauge__needle');
    var cap = svgEl('circle', 'ms4-gauge__cap');
    var nameT = svgEl('text', 'ms4-gauge__name');
    var valueG = svgEl('g', null);
    var valueT = svgEl('text', 'ms4-gauge__value');
    var unitT = svgEl('text', 'ms4-gauge__unit');

    needleG.appendChild(needle);
    // Piasta należy do igły, nie do środka tarczy: stała kropka w centrum
    // lądowała na liczbie i wyglądała jak przypadkowy artefakt.
    needleG.appendChild(cap);
    valueG.appendChild(valueT);
    svg.appendChild(track);
    svg.appendChild(bandsG);
    svg.appendChild(ticksG);
    svg.appendChild(labelsG);
    svg.appendChild(needleG);
    svg.appendChild(nameT);
    svg.appendChild(valueG);
    svg.appendChild(unitT);
    container.appendChild(svg);

    // Trzy łuki stref w stałej kolejności; pusta strefa dostaje puste `d`.
    var bandPaths = [
      svgEl('path', 'ms4-gauge__band'),
      svgEl('path', 'ms4-gauge__band'),
      svgEl('path', 'ms4-gauge__band')
    ];
    bandsG.appendChild(bandPaths[0]);
    bandsG.appendChild(bandPaths[1]);
    bandsG.appendChild(bandPaths[2]);

    // Kreska mniejsza nie ma własnej klasy: bierze stroke i grubość z grupy
    // ms4-gauge__ticks. ms4-gauge__tick to w SPEC 5.G kreska WIĘKSZA.
    var minorPool = makePool(ticksG, 'line', '');
    var majorPool = makePool(ticksG, 'line', 'ms4-gauge__tick');
    var labelPool = makePool(labelsG, 'text', 'ms4-gauge__ticklabel');

    setAttr(valueT, 'x', '0');
    setAttr(valueT, 'y', '0');
    setAttr(valueT, 'text-anchor', 'middle');
    setAttr(valueT, 'dominant-baseline', 'central');
    setAttr(nameT, 'text-anchor', 'middle');
    setAttr(nameT, 'dominant-baseline', 'central');
    setAttr(unitT, 'text-anchor', 'middle');
    setAttr(unitT, 'dominant-baseline', 'central');

    var W = 0, H = 0, cx = 0, cy = 0, R = 0, linear = false;
    var barX0 = 0, barX1 = 0, barY = 0;
    var lastValue = null, lastZone = null, lastZoneMod = null, stale = true;
    var target = 0, shown = 0, animId = 0, animLast = 0;
    var ariaAt = 0;
    var dead = false;

    /* ---- nazwa dostępna: całe zdanie ze Scale.TEXT.aria.scale ---- */
    function ariaText() {
      var s = S(), t = TEXT(), m = metricOf(metricId);
      if (!s || !t || !m) return '';
      return s.fill(t.aria.scale, {
        name: m.namePL,
        min: s.spoken(metricId, m.min),
        max: s.spoken(metricId, m.max),
        value: s.spoken(metricId, lastValue),
        zone: s.spokenZone(lastZone),
        warn: s.spoken(metricId, thresholdValue(metricId, 'warn', thresholds)),
        crit: s.spoken(metricId, thresholdValue(metricId, 'crit', thresholds))
      });
    }

    function pushAria(force) {
      var now = Date.now();
      if (!force && now - ariaAt < ARIA_EVERY) return;
      ariaAt = now;
      setLabel(svg, ariaText());
    }

    /* ---- układ: jedyne miejsce, w którym powstają węzły i czyta się style ---- */
    function layout() {
      if (dead) return;
      var size = measure(svg, 260, 260);
      W = size.w;
      H = size.h;
      if (W < 2 || H < 2) return;
      setAttr(svg, 'viewBox', '0 0 ' + W + ' ' + H);

      // Bardzo niski albo bardzo szeroki kontener nie pomieści koła — wtedy
      // wskaźnik degraduje się do poziomego paska z tą samą liczbą.
      linear = H < 150 || (W / H) > 2.1;
      toggleClass(container, 'ms4-gauge--linear', linear);

      var m = metricOf(metricId);
      var s = S();
      var vFont = fontPx(valueT, 64);
      var nFont = fontPx(nameT, 13);

      if (linear) layoutLinear(m, s, vFont);
      else layoutRound(m, s, vFont, nFont);

      // Pasek pokazuje jednostkę przy liczbie, koło — pod nią. Po przejściu
      // między układami napis trzeba złożyć od nowa, inaczej jednostka gubi się
      // albo dubluje aż do następnej próbki.
      applyValueText();
      applyNeedle();
      pushAria(true);
    }

    function applyValueText(known) {
      var isStale = known === undefined
        ? (lastValue === null || posOf(metricId, lastValue) === null)
        : known;
      setText(valueT, isStale
        ? noValue()
        : fmt(metricId, lastValue) + (linear ? unitOf(metricId) : ''));
    }

    function layoutRound(m, s, vFont, nFont) {
      cx = W / 2;
      cy = H / 2;
      R = Math.min(W, H) / 2 - ARC_STROKE / 2 - 4;
      if (R < 20) R = 20;

      setAttr(track, 'd', arcPath(cx, cy, R, 0, 1));

      // Łuki stref
      var bands = s ? s.bands(metricId, thresholds) : [];
      var i, b;
      for (i = 0; i < 3; i += 1) {
        b = bands[i];
        if (!b) {
          setCls(bandPaths[i], 'ms4-gauge__band', 'is-hidden');
          continue;
        }
        setCls(bandPaths[i], 'ms4-gauge__band', 'ms4-gauge__band--' + (zoneMod(b.zone) || 'good'));
        setAttr(bandPaths[i], 'd', arcPath(cx, cy, R, b.from / 100, b.to / 100));
      }

      // Podziałka: kreski wewnątrz pierścienia, podpisy jeszcze bliżej środka.
      var ticks = s ? s.ticks(metricId) : { major: [], minor: [] };
      var rIn = R - ARC_STROKE / 2 - 3;
      var majorAt = {};
      var used = 0, k, p, node;

      for (i = 0; i < ticks.major.length; i += 1) {
        p = ticks.major[i];
        majorAt[p.pos] = true;
        node = majorPool.at(i);
        drawTick(node, p.pos / 100, rIn, 10);
        node = labelPool.at(i);
        var lp = polar(cx, cy, rIn - 22, ARC_START + (p.pos / 100) * ARC_SWEEP);
        setAttr(node, 'x', String(r2(lp.x)));
        setAttr(node, 'y', String(r2(lp.y)));
        setAttr(node, 'text-anchor', 'middle');
        setAttr(node, 'dominant-baseline', 'central');
        setText(node, p.labelPL);
      }
      majorPool.trim(ticks.major.length);
      labelPool.trim(ticks.major.length);

      for (k = 0; k < ticks.minor.length; k += 1) {
        if (majorAt[ticks.minor[k]]) continue;      // nie dublujemy kresek dużych
        drawTick(minorPool.at(used), ticks.minor[k] / 100, rIn, 5);
        used += 1;
      }
      minorPool.trim(used);

      // Igła rysowana pod kątem startowym i obracana transformem — nigdy przez
      // przeliczanie końców przy każdej próbce.
      var a0 = polar(cx, cy, R * NEEDLE_IN, ARC_START);
      var a1 = polar(cx, cy, R * NEEDLE_OUT, ARC_START);
      setCls(needle, 'ms4-gauge__needle', '');
      setAttr(needle, 'x1', String(r2(a0.x)));
      setAttr(needle, 'y1', String(r2(a0.y)));
      setAttr(needle, 'x2', String(r2(a1.x)));
      setAttr(needle, 'y2', String(r2(a1.y)));
      setCls(cap, 'ms4-gauge__cap', '');
      setAttr(cap, 'cx', String(r2(a0.x)));
      setAttr(cap, 'cy', String(r2(a0.y)));
      setAttr(cap, 'r', '4');

      // Trzy napisy w środku: nazwa nad liczbą, jednostka pod nią.
      var rFree = R - ARC_STROKE / 2 - 8;
      var dyName = -0.44 * R;
      var dyValue = 0.02 * R;
      var dyUnit = 0.38 * R;

      setShown(nameT, 'ms4-gauge__name', true);
      setAttr(nameT, 'x', String(r2(cx)));
      setAttr(nameT, 'y', String(r2(cy + dyName)));
      setText(nameT, m ? m.namePL : '');
      fitText(nameT, m ? m.namePL : '', nFont, chord(rFree, Math.abs(dyName) + nFont * 0.6));

      var avail = chord(rFree, Math.abs(dyValue) + vFont * 0.55);
      var scaleV = Math.min(1, avail / Math.max(1, estWidth(widestLabel(metricId, false), vFont)));
      setAttr(valueG, 'transform',
        'translate(' + r2(cx) + ' ' + r2(cy + dyValue) + ') scale(' + r2(scaleV) + ')');

      setShown(unitT, 'ms4-gauge__unit', true);
      setAttr(unitT, 'x', String(r2(cx)));
      setAttr(unitT, 'y', String(r2(cy + dyUnit)));
      setText(unitT, m && m.unit ? m.unit : '');
    }

    function layoutLinear(m, s, vFont) {
      barY = H - ARC_STROKE / 2 - 4;
      barX0 = ARC_STROKE / 2 + 2;
      barX1 = W - ARC_STROKE / 2 - 2;
      var span = Math.max(1, barX1 - barX0);

      setAttr(track, 'd', 'M' + r2(barX0) + ' ' + r2(barY) + 'L' + r2(barX1) + ' ' + r2(barY));

      var bands = s ? s.bands(metricId, thresholds) : [];
      var i, b, xa, xb;
      for (i = 0; i < 3; i += 1) {
        b = bands[i];
        if (!b) {
          setCls(bandPaths[i], 'ms4-gauge__band', 'is-hidden');
          continue;
        }
        xa = barX0 + (b.from / 100) * span;
        xb = barX0 + (b.to / 100) * span;
        setCls(bandPaths[i], 'ms4-gauge__band', 'ms4-gauge__band--' + (zoneMod(b.zone) || 'good'));
        setAttr(bandPaths[i], 'd', 'M' + r2(xa) + ' ' + r2(barY) + 'L' + r2(xb) + ' ' + r2(barY));
      }

      majorPool.trim(0);
      minorPool.trim(0);
      labelPool.trim(0);

      // Znacznik zamiast igły: pionowa kreska przesuwana wzdłuż paska.
      setCls(needle, 'ms4-gauge__needle', '');
      setAttr(needle, 'x1', String(r2(barX0)));
      setAttr(needle, 'y1', String(r2(barY - 11)));
      setAttr(needle, 'x2', String(r2(barX0)));
      setAttr(needle, 'y2', String(r2(barY + 11)));
      setCls(cap, 'ms4-gauge__cap', 'is-hidden');

      setShown(nameT, 'ms4-gauge__name', false);
      setShown(unitT, 'ms4-gauge__unit', false);

      var avail = W - 24;
      var scaleV = Math.min(1, avail / Math.max(1, estWidth(widestLabel(metricId, true), vFont)));
      var free = barY - ARC_STROKE / 2 - 6;
      if (free > 4) scaleV = Math.min(scaleV, free / Math.max(1, vFont * 1.1));
      setAttr(valueG, 'transform',
        'translate(' + r2(W / 2) + ' ' + r2(free / 2 + 2) + ') scale(' + r2(scaleV) + ')');
    }

    function drawTick(node, t, rOuter, len) {
      var deg = ARC_START + t * ARC_SWEEP;
      var a = polar(cx, cy, rOuter, deg);
      var b = polar(cx, cy, rOuter - len, deg);
      setAttr(node, 'x1', String(r2(a.x)));
      setAttr(node, 'y1', String(r2(a.y)));
      setAttr(node, 'x2', String(r2(b.x)));
      setAttr(node, 'y2', String(r2(b.y)));
      return node;
    }

    /** Pół cięciwy koła o promieniu `r` na wysokości `dy` — tyle miejsca w poziomie
     *  zostaje w środku wskaźnika na napis. */
    function chord(r, dy) {
      var inner = r * r - dy * dy;
      return inner > 1 ? 2 * Math.sqrt(inner) : 0;
    }

    /** Napis, który się nie mieści, ściskamy przez textLength zamiast przycinać. */
    function fitText(node, str, fs, avail) {
      var w = estWidth(str, fs);
      if (avail > 8 && w > avail) {
        setAttr(node, 'textLength', String(Math.round(avail)));
        setAttr(node, 'lengthAdjust', 'spacingAndGlyphs');
      } else {
        node.removeAttribute('textLength');
        node.removeAttribute('lengthAdjust');
        memo(node).textLength = undefined;
      }
    }

    /* ---- pętla igły: wykładnicze dogonienie, ~200 ms do celu ---- */
    function applyNeedle() {
      if (linear) {
        var dx = (barX1 - barX0) * shown;
        setAttr(needleG, 'transform', 'translate(' + r2(dx) + ' 0)');
      } else {
        setAttr(needleG, 'transform',
          'rotate(' + r2(shown * ARC_SWEEP) + ' ' + r2(cx) + ' ' + r2(cy) + ')');
      }
    }

    function step(now) {
      animId = 0;
      var dt = animLast ? Math.min(64, now - animLast) : 16;
      animLast = now;
      var diff = target - shown;
      if (Math.abs(diff) < 0.0008) {
        shown = target;
        animLast = 0;
      } else {
        shown += diff * (1 - Math.exp(-dt / (CATCH_MS / 3)));
        animId = global.requestAnimationFrame(step);
      }
      applyNeedle();
    }

    function startAnim() {
      if (Math.abs(target - shown) < 0.0008) return;
      // Ograniczony ruch albo brak rAF (stary webview, karta w tle): igła
      // ustawia się od razu. Bez tego zostałaby na poprzedniej wartości,
      // a wskazówka kłamałaby o tym, co pokazuje liczba w środku.
      if (motionReduced() || typeof global.requestAnimationFrame !== 'function') {
        if (animId) { global.cancelAnimationFrame(animId); animId = 0; }
        shown = target;
        animLast = 0;
        applyNeedle();
        return;
      }
      if (animId) return;
      animLast = 0;
      animId = global.requestAnimationFrame(step);
    }

    /* ---- API ---- */
    var api = {};

    api.update = function (value, zone) {
      if (dead) return;
      var p = posOf(metricId, value);
      var isStale = p === null;
      lastValue = isNum(value) ? value : null;
      lastZone = isStale ? null : zoneOf(metricId, value, zone, thresholds);

      // Liczba nie ma przejścia (SPEC 8.1) — piszemy ją natychmiast.
      applyValueText(isStale);

      if (isStale !== stale) {
        stale = isStale;
        toggleClass(container, 'is-stale', stale);
      }
      var zm = zoneMod(lastZone);
      if (zm !== lastZoneMod) {
        if (lastZoneMod) toggleClass(container, 'is-' + lastZoneMod, false);
        if (zm) toggleClass(container, 'is-' + zm, true);
        lastZoneMod = zm;
      }

      if (!isStale) {
        target = clamp(p, 0, 1);
        startAnim();
      }
      pushAria(false);
    };

    api.setMetric = function (id, thr) {
      if (dead) return;
      if (id) metricId = id;
      if (thr !== undefined) thresholds = thr || null;
      lastValue = null;
      lastZone = null;
      shown = 0;
      target = 0;
      layout();
      api.update(null, null);
    };

    api.destroy = function () {
      if (dead) return;
      dead = true;
      if (animId) { global.cancelAnimationFrame(animId); animId = 0; }
      unobserve();
      if (offSettings) offSettings();
      if (svg.parentNode) svg.parentNode.removeChild(svg);
      toggleClass(container, 'ms4-gauge--linear', false);
      toggleClass(container, 'is-stale', false);
      if (lastZoneMod) toggleClass(container, 'is-' + lastZoneMod, false);
    };

    var unobserve = observeSize(container, layout);
    // Zmiana skali tekstu zmienia rozmiar liczby, a nie rozmiar kontenera —
    // ResizeObserver by tego nie zauważył, więc słuchamy ustawień.
    var offSettings = global.Bus ? global.Bus.on('settings:changed', layout) : null;

    layout();
    api.update(null, null);
    return api;
  };

  /* ==================================================================
     GAUGE.SPARK — mikrowykres do kafelka (bez osi, bez tekstu)
     ================================================================== */

  Gauge.spark = function (container, options) {
    if (!container || !doc) return nullApi();
    var opts = options || {};
    var metricId = opts.metricId || 'share';

    var m = metricOf(metricId);
    var t = TEXT();
    var u = UIT();
    var labelPL = (m ? m.namePL : '') +
      ((u && u.history) ? sepText() + u.history.chartTitle : (t ? sepText() + t.recorder.tableCaption : ''));

    var svg = rootSvg('ms4-spark', labelPL);
    var area = svgEl('path', 'ms4-spark__area');
    var line = svgEl('path', 'ms4-spark__line');
    var dot = svgEl('circle', 'ms4-spark__dot');
    svg.appendChild(area);
    svg.appendChild(line);
    svg.appendChild(dot);
    container.appendChild(svg);
    setAttr(dot, 'r', '2.5');

    var W = 72, H = 28, dead = false;
    var points = null;

    var frame = framer(draw);

    function layout() {
      if (dead) return;
      var size = measure(svg, 72, 28);
      if (size.w === W && size.h === H) return;
      W = size.w;
      H = size.h;
      setAttr(svg, 'viewBox', '0 0 ' + W + ' ' + H);
      frame.request();
    }

    /** Do 28 px wysokości nie ma sensu więcej niż jeden punkt na dwa piksele —
     *  z 15 000 próbek zostaje kilkadziesiąt węzłów ścieżki, nie kilkanaście tysięcy. */
    function draw() {
      if (dead) return;
      var pts = points;
      if (!pts || pts.length < 2 || W < 4 || H < 4) {
        setAttr(line, 'd', '');
        setAttr(area, 'd', '');
        setShown(dot, 'ms4-spark__dot', false);
        return;
      }

      var t0 = pts[0].t, t1 = pts[pts.length - 1].t;
      if (!(t1 > t0)) t1 = t0 + 1;
      var cols = Math.max(2, Math.floor(W / 2));
      var sum = new Array(cols), cnt = new Array(cols);
      var i, k, p;
      for (i = 0; i < cols; i += 1) { sum[i] = 0; cnt[i] = 0; }
      for (i = 0; i < pts.length; i += 1) {
        p = pts[i];
        if (!p || !isNum(p.t) || !isNum(p.v)) continue;
        k = Math.floor((p.t - t0) / (t1 - t0) * cols);
        if (k < 0) k = 0;
        if (k >= cols) k = cols - 1;
        sum[k] += p.v;
        cnt[k] += 1;
      }

      var top = 2, bottom = H - 2;
      var d = '', first = true, lastX = 0, lastY = 0, firstX = 0, n = 0;
      for (i = 0; i < cols; i += 1) {
        if (!cnt[i]) continue;
        var pos = posOf(metricId, sum[i] / cnt[i]);
        if (pos === null) continue;
        var x = r2((i + 0.5) / cols * W);
        var y = r2(bottom - pos * (bottom - top));
        d += (first ? 'M' : 'L') + x + ' ' + y;
        if (first) { firstX = x; first = false; }
        lastX = x;
        lastY = y;
        n += 1;
      }

      if (n < 2) {
        setAttr(line, 'd', '');
        setAttr(area, 'd', '');
        setShown(dot, 'ms4-spark__dot', false);
        return;
      }

      setAttr(line, 'd', d);
      setAttr(area, 'd', d + 'L' + lastX + ' ' + H + 'L' + firstX + ' ' + H + 'Z');
      setShown(dot, 'ms4-spark__dot', true);
      setAttr(dot, 'cx', String(lastX));
      setAttr(dot, 'cy', String(lastY));
    }

    var unobserve = observeSize(container, layout);
    layout();

    return {
      update: function (pts) {
        if (dead) return;
        points = pts;
        frame.request();
      },
      setMetric: function (id) {
        if (dead || !id) return;
        metricId = id;
        var mm = metricOf(id);
        setLabel(svg, (mm ? mm.namePL : '') + (u && u.history ? sepText() + u.history.chartTitle : ''));
        frame.request();
      },
      destroy: function () {
        if (dead) return;
        dead = true;
        frame.cancel();
        unobserve();
        if (svg.parentNode) svg.parentNode.removeChild(svg);
      }
    };
  };

  /* ==================================================================
     GAUGE.TAPE — wykres liniowy historii
     ================================================================== */

  var GAP_MS = 15000;         // dziura szersza niż 15 s to przerwa w pomiarze, nie linia

  Gauge.tape = function (container, options) {
    if (!container || !doc) return nullApi();
    var opts = options || {};
    var metricId = opts.metricId || 'share';
    var thresholds = opts.thresholds || null;
    var rangeMs = isNum(opts.rangeMs) ? opts.rangeMs : HOUR;

    addClass(container, 'ms4-tape');

    var svg = rootSvg('ms4-tape__svg', '');
    var zonesG = svgEl('g', null);
    var gridG = svgEl('g', null);
    var envelope = svgEl('path', 'ms4-tape__band');
    var gaps = svgEl('path', 'ms4-tape__line ms4-tape__gap');
    var line = svgEl('path', 'ms4-tape__line');
    var axisG = svgEl('g', 'ms4-tape__axis');
    var cursorG = svgEl('g', 'ms4-tape__cursor is-hidden');
    var cursorLine = svgEl('line', null);
    var cursorDot = svgEl('circle', null);
    var readoutG = svgEl('g', 'ms4-tape__readout is-hidden');
    var readoutBox = svgEl('rect', null);
    var readoutText = svgEl('text', null);

    cursorG.appendChild(cursorLine);
    cursorG.appendChild(cursorDot);
    readoutG.appendChild(readoutBox);
    readoutG.appendChild(readoutText);
    svg.appendChild(zonesG);
    svg.appendChild(gridG);
    svg.appendChild(envelope);
    svg.appendChild(gaps);
    svg.appendChild(line);
    svg.appendChild(axisG);
    svg.appendChild(cursorG);
    svg.appendChild(readoutG);
    container.appendChild(svg);

    var empty = doc.createElement('p');
    empty.className = 'ms4-tape__empty is-hidden';
    container.appendChild(empty);

    var zonePool = makePool(zonesG, 'rect', 'ms4-tape__zone');
    var gridPool = makePool(gridG, 'line', 'ms4-tape__grid');
    var vLabPool = makePool(axisG, 'text', 'ms4-tape__axislabel');
    var tLabPool = makePool(axisG, 'text', 'ms4-tape__axislabel');

    setAttr(cursorDot, 'r', '4');
    setAttr(readoutBox, 'rx', '8');
    setAttr(readoutText, 'text-anchor', 'middle');
    setAttr(readoutText, 'dominant-baseline', 'central');

    var W = 0, H = 0, padL = 44, padR = 10, padT = 12, padB = 22, fs = 12;
    var plotL = 0, plotR = 0, plotT = 0, plotB = 0;
    var points = null, cols = [], t0 = 0, t1 = 0;
    var dead = false;

    var frame = framer(draw);

    function labelText() {
      var u = UIT(), t = TEXT(), m = metricOf(metricId);
      var head = (u && u.history) ? u.history.chartTitle : (t ? t.recorder.tableCaption : '');
      return head + (m ? sepText() + m.namePL : '');
    }

    function layout() {
      if (dead) return;
      var size = measure(svg, 320, 220);
      W = size.w;
      H = size.h;
      if (W < 8 || H < 8) return;
      setAttr(svg, 'viewBox', '0 0 ' + W + ' ' + H);

      fs = fontPx(vLabPool.at(0), 12);
      vLabPool.trim(0);
      padL = Math.round(fs * 3.2) + 8;
      padR = Math.round(fs * 1.6);
      padT = Math.round(fs * 1.1);
      padB = Math.round(fs * 1.9);

      plotL = padL;
      plotR = Math.max(padL + 10, W - padR);
      plotT = padT;
      plotB = Math.max(padT + 10, H - padB);

      setLabel(svg, labelText());
      frame.request();
    }

    function yFor(value) {
      var p = posOf(metricId, value);
      if (p === null) return null;
      return plotB - p * (plotB - plotT);
    }

    function xFor(t) {
      return plotL + (t - t0) / Math.max(1, t1 - t0) * (plotR - plotL);
    }

    /** Agregacja do jednej kolumny na dwa piksele. Bez niej 30 dni historii
     *  to kilkanaście tysięcy węzłów ścieżki i zablokowany wątek główny. */
    function aggregate() {
      var n = Math.max(2, Math.floor((plotR - plotL) / 2));
      var out = new Array(n);
      var i, k, p, b;
      for (i = 0; i < n; i += 1) out[i] = null;
      if (!points) return out;
      for (i = 0; i < points.length; i += 1) {
        p = points[i];
        if (!p || !isNum(p.t) || !isNum(p.v)) continue;
        if (p.t < t0 || p.t > t1) continue;
        k = Math.floor((p.t - t0) / Math.max(1, t1 - t0) * n);
        if (k < 0) k = 0;
        if (k >= n) k = n - 1;
        b = out[k];
        if (!b) out[k] = { n: 1, sum: p.v, min: p.v, max: p.v, t: p.t };
        else {
          b.n += 1;
          b.sum += p.v;
          if (p.v < b.min) b.min = p.v;
          if (p.v > b.max) b.max = p.v;
          b.t = p.t;
        }
      }
      return out;
    }

    function draw() {
      if (dead || W < 8 || H < 8) return;
      var s = S();
      var now = Date.now();
      t1 = now;
      if (points && points.length) {
        var lastT = points[points.length - 1].t;
        if (isNum(lastT) && lastT > t1) t1 = lastT;
      }
      t0 = t1 - rangeMs;

      drawZones(s);
      drawGrid(s);
      drawSeries();
    }

    function drawZones(s) {
      var bands = s ? s.bands(metricId, thresholds) : [];
      var i, b, ya, yb, node;
      for (i = 0; i < bands.length; i += 1) {
        b = bands[i];
        node = zonePool.at(i);
        ya = plotB - (b.to / 100) * (plotB - plotT);
        yb = plotB - (b.from / 100) * (plotB - plotT);
        setCls(node, 'ms4-tape__zone', 'ms4-tape__zone--' + (zoneMod(b.zone) || 'good'));
        setAttr(node, 'x', String(r2(plotL)));
        setAttr(node, 'y', String(r2(ya)));
        setAttr(node, 'width', String(r2(plotR - plotL)));
        setAttr(node, 'height', String(r2(Math.max(0, yb - ya))));
      }
      zonePool.trim(bands.length);
    }

    function drawGrid(s) {
      var ticks = s ? s.ticks(metricId) : { major: [], minor: [] };
      var used = 0, i, y, node;

      // Oś wartości: pięć poziomów z podziałki wielkości, podpisy po lewej.
      for (i = 0; i < ticks.major.length; i += 1) {
        y = plotB - (ticks.major[i].pos / 100) * (plotB - plotT);
        node = gridPool.at(used);
        used += 1;
        setAttr(node, 'x1', String(r2(plotL)));
        setAttr(node, 'y1', String(r2(y)));
        setAttr(node, 'x2', String(r2(plotR)));
        setAttr(node, 'y2', String(r2(y)));

        node = vLabPool.at(i);
        setAttr(node, 'x', String(r2(plotL - 6)));
        setAttr(node, 'y', String(r2(y)));
        setAttr(node, 'text-anchor', 'end');
        setAttr(node, 'dominant-baseline', 'central');
        setText(node, ticks.major[i].labelPL);
      }
      vLabPool.trim(ticks.major.length);

      // Oś czasu
      var span = t1 - t0;
      var tt = timeTicks(t0, t1);
      var used2 = 0, x;
      for (i = 0; i < tt.length; i += 1) {
        x = xFor(tt[i]);
        if (x < plotL - 1 || x > plotR + 1) continue;
        node = gridPool.at(used);
        used += 1;
        setAttr(node, 'x1', String(r2(x)));
        setAttr(node, 'y1', String(r2(plotT)));
        setAttr(node, 'x2', String(r2(x)));
        setAttr(node, 'y2', String(r2(plotB)));

        node = tLabPool.at(used2);
        used2 += 1;
        setAttr(node, 'x', String(r2(x)));
        setAttr(node, 'y', String(r2(plotB + fs * 0.95)));
        setAttr(node, 'text-anchor', 'middle');
        setAttr(node, 'dominant-baseline', 'central');
        setText(node, timeLabel(tt[i], span));
      }
      gridPool.trim(used);
      tLabPool.trim(used2);
    }

    function drawSeries() {
      cols = aggregate();
      var colMs = (t1 - t0) / cols.length;
      var gapLimit = Math.max(GAP_MS, colMs * 3);

      var d = '', gapD = '', envUp = '', envDown = [];
      var open = false, spread = false;
      var prev = null, prevX = 0, prevY = 0, count = 0;
      var i, b, x, y, yMin, yMax;

      for (i = 0; i < cols.length; i += 1) {
        b = cols[i];
        if (!b) continue;
        y = yFor(b.sum / b.n);
        if (y === null) continue;
        x = plotL + (i + 0.5) / cols.length * (plotR - plotL);
        count += 1;

        if (open && prev !== null && (b.t - prev) > gapLimit) {
          // Przerwa w pomiarze: linia się urywa, a lukę pokazuje kreskowanie.
          gapD += 'M' + r2(prevX) + ' ' + r2(prevY) + 'L' + r2(x) + ' ' + r2(y);
          envUp += closeEnvelope(envDown);
          envDown = [];
          open = false;
        }

        d += (open ? 'L' : 'M') + r2(x) + ' ' + r2(y);

        yMax = yFor(b.max);
        yMin = yFor(b.min);
        if (yMax !== null && yMin !== null) {
          if (b.n > 1) spread = true;
          envUp += (open ? 'L' : 'M') + r2(x) + ' ' + r2(yMax);
          envDown.push(r2(x) + ' ' + r2(yMin));
        }

        open = true;
        prev = b.t;
        prevX = x;
        prevY = y;
      }
      envUp += closeEnvelope(envDown);

      setAttr(line, 'd', count > 1 ? d : '');
      setAttr(gaps, 'd', gapD);
      setAttr(envelope, 'd', spread && count > 1 ? envUp : '');

      var isEmpty = count < 1;
      var t = TEXT();
      if (isEmpty) setText(empty, t ? t.empty.recorderNoRange : '');
      empty.className = 'ms4-tape__empty' + (isEmpty ? '' : ' is-hidden');
      setShown(line, 'ms4-tape__line', !isEmpty);
      if (isEmpty) hideCursor();
    }

    /** Domknięcie obwiedni min–maks: górna krawędź w przód, dolna wstecz. */
    function closeEnvelope(down) {
      if (!down.length) return '';
      var s = '', i;
      for (i = down.length - 1; i >= 0; i -= 1) s += 'L' + down[i];
      return s + 'Z';
    }

    /* ---- krzyż odczytu ---- */

    function hideCursor() {
      setCls(cursorG, 'ms4-tape__cursor', 'is-hidden');
      setCls(readoutG, 'ms4-tape__readout', 'is-hidden');
    }

    function showCursor(clientX) {
      if (!cols.length) return;
      var rect = svg.getBoundingClientRect();
      var x = clientX - rect.left;
      if (x < plotL || x > plotR) { hideCursor(); return; }

      var k = Math.floor((x - plotL) / Math.max(1, plotR - plotL) * cols.length);
      var best = null, bestI = -1, i, step;
      for (step = 0; step < cols.length; step += 1) {
        i = k - step;
        if (i >= 0 && cols[i]) { best = cols[i]; bestI = i; break; }
        i = k + step;
        if (i < cols.length && cols[i]) { best = cols[i]; bestI = i; break; }
      }
      if (!best) { hideCursor(); return; }

      var value = best.sum / best.n;
      var cxp = plotL + (bestI + 0.5) / cols.length * (plotR - plotL);
      var cyp = yFor(value);
      if (cyp === null) { hideCursor(); return; }

      setCls(cursorG, 'ms4-tape__cursor', '');
      setAttr(cursorLine, 'x1', String(r2(cxp)));
      setAttr(cursorLine, 'y1', String(r2(plotT)));
      setAttr(cursorLine, 'x2', String(r2(cxp)));
      setAttr(cursorLine, 'y2', String(r2(plotB)));
      setAttr(cursorDot, 'cx', String(r2(cxp)));
      setAttr(cursorDot, 'cy', String(r2(cyp)));

      var u = UIT(), s = S();
      var when = timeLabel(best.t, t1 - t0);
      var head = (u && u.history && s) ? s.fill(u.history.pointAt, { time: when }) : when;
      setText(readoutText, head + sepText() + fmt(metricId, value) + unitOf(metricId));

      // getComputedTextLength wolno tutaj: to zdarzenie wskaźnika, nie próbka.
      var tw = readoutText.getComputedTextLength ? readoutText.getComputedTextLength() : 120;
      var bw = tw + 20;
      var bh = fs * 2;
      var bx = clamp(cxp - bw / 2, plotL, Math.max(plotL, plotR - bw));
      var by = plotT + 2;
      setCls(readoutG, 'ms4-tape__readout', '');
      setAttr(readoutBox, 'x', String(r2(bx)));
      setAttr(readoutBox, 'y', String(r2(by)));
      setAttr(readoutBox, 'width', String(r2(bw)));
      setAttr(readoutBox, 'height', String(r2(bh)));
      setAttr(readoutText, 'x', String(r2(bx + bw / 2)));
      setAttr(readoutText, 'y', String(r2(by + bh / 2)));
    }

    function onMove(ev) { showCursor(ev.clientX); }
    function onLeave() { hideCursor(); }

    svg.addEventListener('pointermove', onMove);
    svg.addEventListener('pointerdown', onMove);
    svg.addEventListener('pointerleave', onLeave);
    svg.addEventListener('pointercancel', onLeave);

    var unobserve = observeSize(container, layout);
    layout();

    return {
      update: function (pts) {
        if (dead) return;
        points = pts;
        frame.request();
      },
      setRange: function (ms) {
        if (dead || !isNum(ms) || ms <= 0) return;
        rangeMs = ms;
        hideCursor();
        frame.request();
      },
      setMetric: function (id, thr) {
        if (dead) return;
        if (id) metricId = id;
        if (thr !== undefined) thresholds = thr || null;
        setLabel(svg, labelText());
        hideCursor();
        frame.request();
      },
      destroy: function () {
        if (dead) return;
        dead = true;
        frame.cancel();
        unobserve();
        svg.removeEventListener('pointermove', onMove);
        svg.removeEventListener('pointerdown', onMove);
        svg.removeEventListener('pointerleave', onLeave);
        svg.removeEventListener('pointercancel', onLeave);
        if (svg.parentNode) svg.parentNode.removeChild(svg);
        if (empty.parentNode) empty.parentNode.removeChild(empty);
      }
    };
  };

  /* ==================================================================
     GAUGE.BARS — panorama słupków min/śr/maks
     ================================================================== */

  Gauge.bars = function (container, options) {
    if (!container || !doc) return nullApi();
    var opts = options || {};
    var metricId = opts.metricId || 'share';
    var thresholds = opts.thresholds || null;

    addClass(container, 'ms4-bars');

    var svg = rootSvg('ms4-bars__svg', '');
    var barsG = svgEl('g', null);
    var rangesG = svgEl('g', null);
    var axisG = svgEl('g', null);
    svg.appendChild(barsG);
    svg.appendChild(rangesG);
    svg.appendChild(axisG);
    container.appendChild(svg);

    var empty = doc.createElement('p');
    empty.className = 'ms4-bars__empty is-hidden';
    container.appendChild(empty);

    var barPool = makePool(barsG, 'rect', 'ms4-bars__bar');
    var rangePool = makePool(rangesG, 'line', 'ms4-bars__range');
    var labPool = makePool(axisG, 'text', 'ms4-bars__axis');

    var W = 0, H = 0, fs = 12, plotL = 6, plotR = 0, plotT = 8, plotB = 0;
    var buckets = null, dead = false;

    var frame = framer(draw);

    function labelText() {
      var u = UIT(), t = TEXT(), m = metricOf(metricId);
      var head = (u && u.history) ? u.history.statsTitle : (t ? t.recorder.sessionTitle : '');
      return head + (m ? sepText() + m.namePL : '');
    }

    function layout() {
      if (dead) return;
      var size = measure(svg, 320, 180);
      W = size.w;
      H = size.h;
      if (W < 8 || H < 8) return;
      setAttr(svg, 'viewBox', '0 0 ' + W + ' ' + H);

      fs = fontPx(labPool.at(0), 12);
      labPool.trim(0);
      plotL = Math.round(fs * 0.5);
      plotR = Math.max(plotL + 10, W - Math.round(fs * 0.5));
      plotT = Math.round(fs * 0.8);
      plotB = Math.max(plotT + 10, H - Math.round(fs * 1.9));

      setLabel(svg, labelText());
      frame.request();
    }

    function yFor(value) {
      var p = posOf(metricId, value);
      if (p === null) return null;
      return plotB - p * (plotB - plotT);
    }

    function draw() {
      if (dead || W < 8 || H < 8) return;
      var list = buckets && buckets.length ? buckets : null;
      var t = TEXT();
      if (!list) {
        barPool.trim(0);
        rangePool.trim(0);
        labPool.trim(0);
        setText(empty, t ? t.empty.recorderNoRange : '');
        empty.className = 'ms4-bars__empty';
        return;
      }
      empty.className = 'ms4-bars__empty is-hidden';

      var n = list.length;
      var slot = (plotR - plotL) / n;
      var barW = Math.max(2, slot - 2);
      var span = isNum(list[n - 1].t) && isNum(list[0].t) ? list[n - 1].t - list[0].t : DAY;
      var used = 0, usedR = 0, usedL = 0;
      var i, b, y, yMin, yMax, x, mod, node;

      for (i = 0; i < n; i += 1) {
        b = list[i];
        if (!b || !isNum(b.avg)) continue;
        y = yFor(b.avg);
        if (y === null) continue;
        x = plotL + i * slot + (slot - barW) / 2;
        mod = zoneMod(zoneOf(metricId, b.avg, b.zone, thresholds)) || 'good';

        node = barPool.at(used);
        used += 1;
        setCls(node, 'ms4-bars__bar', 'ms4-bars__bar--' + mod);
        setAttr(node, 'x', String(r2(x)));
        setAttr(node, 'y', String(r2(y)));
        setAttr(node, 'width', String(r2(barW)));
        setAttr(node, 'height', String(r2(Math.max(2, plotB - y))));
        setAttr(node, 'rx', String(r2(Math.min(4, barW / 2))));

        yMin = isNum(b.min) ? yFor(b.min) : null;
        yMax = isNum(b.max) ? yFor(b.max) : null;
        if (yMin !== null && yMax !== null && yMin - yMax > 1.5) {
          node = rangePool.at(usedR);
          usedR += 1;
          setCls(node, 'ms4-bars__range', 'ms4-bars__range--' + mod);
          setAttr(node, 'x1', String(r2(x + barW / 2)));
          setAttr(node, 'y1', String(r2(yMax)));
          setAttr(node, 'x2', String(r2(x + barW / 2)));
          setAttr(node, 'y2', String(r2(yMin)));
        }

        // Co czwarty słupek dostaje podpis — gęściej etykiety zlewają się w plamę.
        if (i % 4 === 0 && isNum(b.t)) {
          node = labPool.at(usedL);
          usedL += 1;
          setAttr(node, 'x', String(r2(x + barW / 2)));
          setAttr(node, 'y', String(r2(plotB + fs * 0.95)));
          setAttr(node, 'text-anchor', 'middle');
          setAttr(node, 'dominant-baseline', 'central');
          setText(node, timeLabel(b.t, span));
        }
      }

      barPool.trim(used);
      rangePool.trim(usedR);
      labPool.trim(usedL);
    }

    var unobserve = observeSize(container, layout);
    layout();

    return {
      update: function (list) {
        if (dead) return;
        buckets = list;
        frame.request();
      },
      setMetric: function (id, thr) {
        if (dead) return;
        if (id) metricId = id;
        if (thr !== undefined) thresholds = thr || null;
        setLabel(svg, labelText());
        frame.request();
      },
      destroy: function () {
        if (dead) return;
        dead = true;
        frame.cancel();
        unobserve();
        if (svg.parentNode) svg.parentNode.removeChild(svg);
        if (empty.parentNode) empty.parentNode.removeChild(empty);
      }
    };
  };

  /* ==================================================================
     GAUGE.RING — pierścień postępu
     ================================================================== */

  var RING_R = 28;
  var RING_C = 2 * Math.PI * RING_R;

  Gauge.ring = function (container, options) {
    if (!container || !doc) return nullApi();
    var opts = options || {};
    var max = isNum(opts.max) && opts.max > 0 ? opts.max : 100;
    var value = isNum(opts.value) ? opts.value : null;

    // Pierścień ma stały rozmiar 64 px (SPEC 5.G), więc jego viewBox jest stały:
    // grubość 8 z CSS i --t-h3 w środku znaczą dokładnie tyle, ile mówi tabela.
    var svg = rootSvg('ms4-ring', '');
    setAttr(svg, 'viewBox', '0 0 64 64');
    var track = svgEl('circle', 'ms4-ring__track');
    var fill = svgEl('circle', 'ms4-ring__fill');
    var label = svgEl('text', 'ms4-ring__label');
    svg.appendChild(track);
    svg.appendChild(fill);
    svg.appendChild(label);
    container.appendChild(svg);

    setAttr(track, 'cx', '32');
    setAttr(track, 'cy', '32');
    setAttr(track, 'r', String(RING_R));
    setAttr(fill, 'cx', '32');
    setAttr(fill, 'cy', '32');
    setAttr(fill, 'r', String(RING_R));
    setAttr(fill, 'transform', 'rotate(-90 32 32)');
    setAttr(fill, 'stroke-dasharray', String(r2(RING_C)));
    setAttr(label, 'x', '32');
    setAttr(label, 'y', '32');
    setAttr(label, 'text-anchor', 'middle');
    setAttr(label, 'dominant-baseline', 'central');

    var dead = false;

    function apply() {
      var has = isNum(value);
      var frac = has ? clamp(value / max, 0, 1) : 0;
      setAttr(fill, 'stroke-dashoffset', String(r2(RING_C * (1 - frac))));
      setText(label, has ? String(Math.round(value)) : noValue());
      setLabel(svg, opts.ariaLabel ||
        (has ? Math.round(value) + ' / ' + Math.round(max) : noValue()));
    }

    apply();

    return {
      update: function (v) {
        if (dead) return;
        value = isNum(v) ? v : null;
        apply();
      },
      setMax: function (v) {
        if (dead || !isNum(v) || v <= 0) return;
        max = v;
        apply();
      },
      destroy: function () {
        if (dead) return;
        dead = true;
        if (svg.parentNode) svg.parentNode.removeChild(svg);
      }
    };
  };

  /* ==================================================================
     Atrapa zwracana, gdy wołający nie podał kontenera. Ekran, który zbudował
     się w oderwaniu od dokumentu, ma dostać obiekt o właściwym kształcie,
     a nie wyjątek przy pierwszym update().
     ================================================================== */

  function nullApi() {
    function noop() {}
    return {
      update: noop, setMetric: noop, setRange: noop, setMax: noop, destroy: noop
    };
  }

  global.Gauge = Gauge;

}(typeof window !== 'undefined' ? window : this));
