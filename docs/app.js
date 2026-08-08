(() => {
  'use strict';

  const WINDOW_MS = 60_000;      // how much history the charts show
  const SAMPLE_MS = 200;         // sampling cadence (5 Hz) — light enough for budget phones
  const SAMPLE_SIZE = 32;        // offscreen sampling canvas side, px
  const CROP_FRACTION = 0.6;     // sample the center 60% of the frame

  const ICONS = {
    good: '<path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>',
    warning: '<path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>',
    critical: '<path fill="currentColor" d="M12 2 1 12l11 10 11-10L12 2zm-1 5h2v6h-2V7zm0 8h2v2h-2v-2z"/>'
  };
  const ZONE_LABEL = { good: 'BEZPIECZNA', warning: 'UMIARKOWANA', critical: 'SZKODLIWA' };
  const ZONE_VAR = { good: '--status-good', warning: '--status-warning', critical: '--status-critical' };

  // ---- DOM: camera ----
  const video = document.getElementById('video');
  const overlay = document.getElementById('sampleOverlay');
  const placeholder = document.getElementById('cameraPlaceholder');
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const switchBtn = document.getElementById('switchBtn');

  // ---- DOM: tabs ----
  const tabCamera = document.getElementById('tabCamera');
  const tabGauges = document.getElementById('tabGauges');
  const tabCharts = document.getElementById('tabCharts');
  const panelCamera = document.getElementById('panelCamera');
  const panelGauges = document.getElementById('panelGauges');
  const panelCharts = document.getElementById('panelCharts');
  const panelMethodology = document.getElementById('panelMethodology');

  // ---- DOM: shared stats / controls ----
  const overallBrightnessEl = document.getElementById('overallBrightness');
  const tableToggle = document.getElementById('tableToggle');
  const tableWrap = document.getElementById('tableWrap');
  const readingsBody = document.getElementById('readingsBody');
  const rawWarnSlider = document.getElementById('rawWarnSlider');
  const rawCritSlider = document.getElementById('rawCritSlider');
  const rawWarnLabel = document.getElementById('rawWarnLabel');
  const rawCritLabel = document.getElementById('rawCritLabel');
  const shareWarnSlider = document.getElementById('shareWarnSlider');
  const shareCritSlider = document.getElementById('shareCritSlider');
  const shareWarnLabel = document.getElementById('shareWarnLabel');
  const shareCritLabel = document.getElementById('shareCritLabel');
  const infoBtn = document.getElementById('infoBtn');

  // ---- state ----
  let stream = null;
  let facingMode = 'environment';
  let sampleTimer = null;
  let history = []; // {t, raw, share, brightness, zoneRaw, zoneShare}

  // Independent thresholds per metric — 33%/66% doesn't mean the same thing on
  // both (see the "Dokumentacja" tab), so each gets its own pair.
  //
  // "raw" (blue channel brightness) has no natural reference point — it's a
  // brightness measure, not a color measure — so its defaults stay arbitrary,
  // user-tunable starting points.
  //
  // "share" (blue's share of R+G+B) defaults are derived from real standard
  // illuminant color temperatures, not picked arbitrarily: 4000K ("soft
  // white", ~26% share) and 6500K/D65 (the standard daylight white point most
  // phone/monitor displays ship with by default, ~33% share). Warm light
  // below ~4000K is the range broadly recommended for evening use by tools
  // like f.lux/Night Shift; at-or-past the 6500K default-display baseline is
  // where most "reduce blue light" guidance starts applying. See the
  // "Dokumentacja" tab for the full derivation and sources — this is a
  // colorimetric anchor point, not a regulatory safety standard (none exists
  // for this metric).
  const DEFAULT_THRESHOLDS = {
    raw: { warn: 33, crit: 66 },
    share: { warn: 26, crit: 33 }
  };
  const THRESHOLDS_STORAGE_KEY = 'blueMonitor.thresholds.v1';

  function loadStoredThresholds() {
    try {
      const saved = JSON.parse(localStorage.getItem(THRESHOLDS_STORAGE_KEY));
      if (saved && saved.raw && saved.share
        && Number.isFinite(saved.raw.warn) && Number.isFinite(saved.raw.crit)
        && Number.isFinite(saved.share.warn) && Number.isFinite(saved.share.crit)) {
        return saved;
      }
    } catch (_) { /* localStorage unavailable (private mode etc.) — fall back to defaults */ }
    return null;
  }
  function persistThresholds() {
    try { localStorage.setItem(THRESHOLDS_STORAGE_KEY, JSON.stringify(thresholds)); } catch (_) { /* ignore */ }
  }

  let thresholds = loadStoredThresholds() || {
    raw: { ...DEFAULT_THRESHOLDS.raw },
    share: { ...DEFAULT_THRESHOLDS.share }
  };

  const sampleCanvas = document.createElement('canvas');
  sampleCanvas.width = SAMPLE_SIZE;
  sampleCanvas.height = SAMPLE_SIZE;
  const sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });

  function css(varName) {
    return getComputedStyle(document.body).getPropertyValue(varName).trim();
  }

  function zoneFor(value, t) {
    if (value < t.warn) return 'good';
    if (value < t.crit) return 'warning';
    return 'critical';
  }

  // ---- gauge geometry (shared math, per-instance elements) ----
  // CY sits above the viewBox's vertical middle so the hub — and the needle
  // swinging from it — stay clear of the value/badge text anchored below.
  const CX = 100, CY = 95, R = 78;
  function angleForValue(v) { return 180 - v * 1.8; }
  function polar(cx, cy, r, angleDeg) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
  }
  function arcPath(v0, v1) {
    const a0 = angleForValue(v0);
    const a1 = angleForValue(v1);
    const p0 = polar(CX, CY, R, a0);
    const p1 = polar(CX, CY, R, a1);
    return `M ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} A ${R} ${R} 0 0 1 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
  }

  function createGauge(svgId, valueElId, badgeId) {
    const svg = document.getElementById(svgId);
    const badge = document.getElementById(badgeId);
    return {
      good: svg.querySelector('.gauge-good'),
      warn: svg.querySelector('.gauge-warning'),
      crit: svg.querySelector('.gauge-critical'),
      needle: svg.querySelector('.gauge-needle'),
      valueEl: document.getElementById(valueElId),
      badge,
      icon: badge.querySelector('.status-icon'),
      label: badge.querySelector('.status-label')
    };
  }
  const gaugeRaw = createGauge('gaugeRaw', 'gaugeValueRaw', 'statusBadgeRaw');
  const gaugeShare = createGauge('gaugeShare', 'gaugeValueShare', 'statusBadgeShare');

  function drawGaugeBands(g, t) {
    g.good.setAttribute('d', arcPath(0, t.warn));
    g.warn.setAttribute('d', arcPath(t.warn, t.crit));
    g.crit.setAttribute('d', arcPath(t.crit, 100));
  }
  function setNeedle(g, value) {
    g.needle.style.transform = `rotate(${1.8 * value - 90}deg)`;
  }
  function setStatus(g, zone, value) {
    const cls = zone == null ? 'idle' : zone;
    g.badge.className = `status-badge status-${cls}`;
    g.label.textContent = zone == null ? 'Brak danych' : ZONE_LABEL[zone];
    g.icon.innerHTML = zone == null ? '' : ICONS[zone];
    g.icon.style.color = zone == null ? '' : `var(${ZONE_VAR[zone]})`;
  }
  function updateGauge(g, zone, value) {
    g.valueEl.textContent = value == null ? '--' : `${Math.round(value)}%`;
    setNeedle(g, value == null ? 0 : value);
    setStatus(g, zone, value);
  }

  // ---- charts ----
  function resizeCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    return { w: canvas.width, h: canvas.height };
  }

  function drawChart(canvas, ctx, accessor, emptyMessage, t) {
    const { w, h } = resizeCanvas(canvas);
    ctx.clearRect(0, 0, w, h);

    const padL = 42, padR = 8, padT = 10, padB = 26;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;
    const yFor = (val) => padT + plotH * (1 - val / 100);

    const bands = [
      { from: 0, to: t.warn, color: css('--status-good-bg') },
      { from: t.warn, to: t.crit, color: css('--status-warning-bg') },
      { from: t.crit, to: 100, color: css('--status-critical-bg') }
    ];
    for (const b of bands) {
      const y0 = yFor(b.to), y1 = yFor(b.from);
      ctx.fillStyle = b.color;
      ctx.fillRect(padL, y0, plotW, y1 - y0);
    }

    ctx.strokeStyle = css('--gridline');
    ctx.lineWidth = 1;
    ctx.fillStyle = css('--text-muted');
    ctx.font = `${14 * (window.devicePixelRatio || 1)}px system-ui, sans-serif`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    [0, 25, 50, 75, 100].forEach((tick) => {
      const y = yFor(tick);
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(padL + plotW, y);
      ctx.stroke();
      ctx.fillText(String(tick), padL - 6, y);
    });

    ctx.strokeStyle = css('--baseline');
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, padT + plotH);
    ctx.lineTo(padL + plotW, padT + plotH);
    ctx.stroke();

    const now = Date.now();
    const windowStart = now - WINDOW_MS;
    const visible = history.filter((p) => p.t >= windowStart);

    if (visible.length < 2) {
      ctx.fillStyle = css('--text-muted');
      ctx.textAlign = 'center';
      ctx.font = `${16 * (window.devicePixelRatio || 1)}px system-ui, sans-serif`;
      ctx.fillText(emptyMessage, padL + plotW / 2, padT + plotH / 2);
    } else {
      const xFor = (t) => padL + ((t - windowStart) / WINDOW_MS) * plotW;
      ctx.strokeStyle = css('--series-1');
      ctx.lineWidth = 2 * (window.devicePixelRatio || 1);
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.beginPath();
      visible.forEach((p, i) => {
        const { value } = accessor(p);
        const x = xFor(p.t), y = yFor(value);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();

      const last = visible[visible.length - 1];
      const { value: lastValue, zone: lastZone } = accessor(last);
      const lx = xFor(last.t), ly = yFor(lastValue);
      const dotR = 4 * (window.devicePixelRatio || 1);
      ctx.beginPath();
      ctx.arc(lx, ly, dotR + 2, 0, Math.PI * 2);
      ctx.fillStyle = css('--surface-1');
      ctx.fill();
      ctx.beginPath();
      ctx.arc(lx, ly, dotR, 0, Math.PI * 2);
      ctx.fillStyle = css(`--status-${lastZone}`);
      ctx.fill();
    }

    ctx.fillStyle = css('--text-muted');
    ctx.font = `${14 * (window.devicePixelRatio || 1)}px system-ui, sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('-60s', padL, h - 6);
    ctx.textAlign = 'right';
    ctx.fillText('teraz', padL + plotW, h - 6);
  }

  const chartRawCanvas = document.getElementById('chartRaw');
  const chartRawCtx = chartRawCanvas.getContext('2d');
  const chartShareCanvas = document.getElementById('chartShare');
  const chartShareCtx = chartShareCanvas.getContext('2d');

  function drawCharts() {
    drawChart(chartRawCanvas, chartRawCtx, (p) => ({ value: p.raw, zone: p.zoneRaw }), 'Uruchom kamerę, aby zobaczyć wykres', thresholds.raw);
    drawChart(chartShareCanvas, chartShareCtx, (p) => ({ value: p.share, zone: p.zoneShare }), 'Uruchom kamerę, aby zobaczyć wykres', thresholds.share);
  }

  function drawOverlay() {
    const { w, h } = resizeCanvas(overlay);
    const octx = overlay.getContext('2d');
    octx.clearRect(0, 0, w, h);
    const cw = w * CROP_FRACTION, ch = h * CROP_FRACTION;
    const x = (w - cw) / 2, y = (h - ch) / 2;
    octx.strokeStyle = 'rgba(255,255,255,0.85)';
    octx.lineWidth = 2 * (window.devicePixelRatio || 1);
    octx.setLineDash([8, 6]);
    octx.strokeRect(x, y, cw, ch);
  }

  function pushTableRow(p) {
    const time = new Date(p.t).toLocaleTimeString('pl-PL', { hour12: false });
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${time}</td><td>${Math.round(p.raw)}%</td><td>${Math.round(p.share)}%</td>` +
      `<td><span class="zone-dot" style="background:var(${ZONE_VAR[p.zoneShare]})"></span>${ZONE_LABEL[p.zoneShare]}</td>`;
    readingsBody.prepend(tr);
    while (readingsBody.rows.length > 60) readingsBody.deleteRow(-1);
  }

  // ---- sampling ----
  function takeSample() {
    if (!video.videoWidth) return;
    const vw = video.videoWidth, vh = video.videoHeight;
    const sw = vw * CROP_FRACTION, sh = vh * CROP_FRACTION;
    const sx = (vw - sw) / 2, sy = (vh - sh) / 2;
    sampleCtx.drawImage(video, sx, sy, sw, sh, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
    const { data } = sampleCtx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
    let r = 0, g = 0, b = 0;
    const n = data.length / 4;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i]; g += data[i + 1]; b += data[i + 2];
    }
    r /= n; g /= n; b /= n;

    // Two deliberately different metrics — see the "Dokumentacja" tab for why both exist:
    //  - raw:   plain blue-channel brightness (0-255 -> %). Simple, but conflates brightness with hue.
    //  - share: blue's share of R+G+B. Isolates color shift from brightness — closer to what
    //           actually drives eye strain, and what night-mode filters act on.
    const raw = (b / 255) * 100;
    const share = (b / (r + g + b + 1e-6)) * 100;
    const brightness = ((r + g + b) / 3 / 255) * 100;
    const zoneRaw = zoneFor(raw, thresholds.raw);
    const zoneShare = zoneFor(share, thresholds.share);
    const point = { t: Date.now(), raw, share, brightness, zoneRaw, zoneShare };
    history.push(point);
    const cutoff = Date.now() - WINDOW_MS - SAMPLE_MS;
    history = history.filter((p) => p.t >= cutoff);

    updateGauge(gaugeRaw, zoneRaw, raw);
    updateGauge(gaugeShare, zoneShare, share);
    overallBrightnessEl.textContent = `${Math.round(brightness)}%`;
    pushTableRow(point);
    drawCharts();
  }

  // ---- camera lifecycle ----
  // We deliberately do NOT lock exposure/white-balance to 'manual' here. An earlier
  // version tried that (to reduce reading jitter from auto-exposure hunting), but
  // switching to manual mode without also pinning an explicit exposure value just
  // freezes the camera at whatever it happened to be at that instant — often a dark,
  // not-yet-converged reading — leaving the preview visibly dimmer than the native
  // camera app for the rest of the session. Full auto gives a properly exposed image,
  // matching what the native camera app shows; the "Dokumentacja" tab already covers
  // the measurement-noise trade-off this implies.

  async function startCamera() {
    startBtn.disabled = true;
    try {
      const constraints = { video: { facingMode: { ideal: facingMode }, width: { ideal: 640 }, height: { ideal: 480 } }, audio: false };
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;
      video.classList.toggle('rear', facingMode === 'environment');
      await video.play();
      placeholder.classList.add('hidden');
      drawOverlay();

      stopBtn.disabled = false;
      switchBtn.disabled = false;
      startBtn.textContent = 'Start';
      clearInterval(sampleTimer);
      sampleTimer = setInterval(takeSample, SAMPLE_MS);
    } catch (err) {
      placeholder.classList.remove('hidden');
      placeholder.querySelector('p').textContent =
        'Nie udało się uruchomić kamery. Sprawdź uprawnienia przeglądarki do kamery i spróbuj ponownie. (' + (err && err.message ? err.message : err) + ')';
      startBtn.disabled = false;
    }
  }

  function stopCamera() {
    clearInterval(sampleTimer);
    sampleTimer = null;
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      stream = null;
    }
    video.srcObject = null;
    placeholder.classList.remove('hidden');
    placeholder.querySelector('p').textContent = 'Naciśnij „Start”.';
    startBtn.disabled = false;
    stopBtn.disabled = true;
    switchBtn.disabled = true;
    updateGauge(gaugeRaw, null, null);
    updateGauge(gaugeShare, null, null);
    overallBrightnessEl.textContent = '--%';
  }

  startBtn.addEventListener('click', startCamera);
  stopBtn.addEventListener('click', stopCamera);
  switchBtn.addEventListener('click', async () => {
    facingMode = facingMode === 'environment' ? 'user' : 'environment';
    if (stream) stream.getTracks().forEach((t) => t.stop());
    await startCamera();
  });

  // ---- thresholds (each metric owns its own pair — see the state comment above) ----
  function makeThresholdHandler(kind, warnSlider, critSlider, warnLabel, critLabel, gauge) {
    return () => {
      let warn = Number(warnSlider.value);
      let crit = Number(critSlider.value);
      if (warn >= crit) warn = crit - 1;
      warnSlider.value = String(warn);
      thresholds[kind] = { warn, crit };
      warnLabel.textContent = `${warn}%`;
      critLabel.textContent = `${crit}%`;
      drawGaugeBands(gauge, thresholds[kind]);
      drawCharts();
      persistThresholds();
    };
  }
  const onRawThresholdChange = makeThresholdHandler('raw', rawWarnSlider, rawCritSlider, rawWarnLabel, rawCritLabel, gaugeRaw);
  const onShareThresholdChange = makeThresholdHandler('share', shareWarnSlider, shareCritSlider, shareWarnLabel, shareCritLabel, gaugeShare);
  rawWarnSlider.addEventListener('input', onRawThresholdChange);
  rawCritSlider.addEventListener('input', onRawThresholdChange);
  shareWarnSlider.addEventListener('input', onShareThresholdChange);
  shareCritSlider.addEventListener('input', onShareThresholdChange);

  // ---- table toggle ----
  tableToggle.addEventListener('click', () => {
    const showing = !tableWrap.hidden;
    tableWrap.hidden = showing;
    tableToggle.setAttribute('aria-pressed', String(!showing));
    tableToggle.textContent = showing ? 'Pokaż jako tabelę' : 'Ukryj tabelę';
  });

  // ---- tabs (Kamera / Gałki / Wykresy) ----
  const TABS = [
    { btn: tabCamera, panel: panelCamera, onShow: () => drawOverlay() },
    { btn: tabGauges, panel: panelGauges, onShow: null },
    { btn: tabCharts, panel: panelCharts, onShow: () => drawCharts() }
  ];
  function selectTab(selected) {
    TABS.forEach(({ btn, panel, onShow }) => {
      const isSelected = btn === selected;
      btn.setAttribute('aria-selected', String(isSelected));
      btn.tabIndex = isSelected ? 0 : -1;
      panel.hidden = !isSelected;
      if (isSelected && onShow) requestAnimationFrame(onShow);
    });
    panelMethodology.hidden = true;
  }
  TABS.forEach(({ btn }) => btn.addEventListener('click', () => selectTab(btn)));

  // ---- Dokumentacja (not a tab — reached only via the "i" button) ----
  function showDocs() {
    TABS.forEach(({ btn, panel }) => {
      btn.setAttribute('aria-selected', 'false');
      btn.tabIndex = -1;
      panel.hidden = true;
    });
    panelMethodology.hidden = false;
  }
  infoBtn.addEventListener('click', showDocs);

  // ---- resize ----
  window.addEventListener('resize', () => { drawOverlay(); drawCharts(); });

  // ---- init ----
  // Sync the slider controls/labels to whatever thresholds we ended up with
  // (restored from localStorage, or the defaults) — the HTML's hardcoded
  // `value` attributes only match the defaults by coincidence.
  rawWarnSlider.value = String(thresholds.raw.warn);
  rawCritSlider.value = String(thresholds.raw.crit);
  rawWarnLabel.textContent = `${thresholds.raw.warn}%`;
  rawCritLabel.textContent = `${thresholds.raw.crit}%`;
  shareWarnSlider.value = String(thresholds.share.warn);
  shareCritSlider.value = String(thresholds.share.crit);
  shareWarnLabel.textContent = `${thresholds.share.warn}%`;
  shareCritLabel.textContent = `${thresholds.share.crit}%`;

  drawGaugeBands(gaugeRaw, thresholds.raw);
  drawGaugeBands(gaugeShare, thresholds.share);
  updateGauge(gaugeRaw, null, null);
  updateGauge(gaugeShare, null, null);
  drawCharts();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }

  if (location.search.includes('tab=methodology')) showDocs();
})();
