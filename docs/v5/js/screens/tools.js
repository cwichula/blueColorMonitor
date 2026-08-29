/* Monitor Światła v5 — ekran „Narzędzia”.
 *
 * Siedem kart: Język, Wygląd, Progi, Kalibracja, Pomiar, O pomiarze, Dane.
 * Język stoi pierwszy, bo od niego zależy zrozumiałość wszystkich pozostałych
 * ustawień — ktoś, kto trafił na aplikację w obcym języku, ma znaleźć tę kartę
 * bez czytania czegokolwiek po drodze.
 *
 * Trzy zasady rządzą tym plikiem. Po pierwsze: każda kontrolka stoi na natywnym
 * elemencie (input[type=radio|checkbox|range], details/summary), bo własna
 * imitacja zawsze gubi którąś ścieżkę klawiatury albo tryb czytnika ekranu.
 * Po drugie: DOM powstaje raz, a `sync()` tylko odświeża wartości — dzięki temu
 * przeciąganie suwaka nie przebudowuje karty i nie wyrywa fokusu. Po trzecie:
 * zapis jest natychmiastowy, bez przycisku „Zapisz”, a toast pojawia się
 * wyłącznie wtedy, gdy skutku nie widać od razu na ekranie.
 */

import { h, icon, clear, mount, download, announce, haptic, reducedMotion } from '../ui/dom.js';
import { toast, dialog, sheet } from '../ui/overlays.js';
import { zoneBar } from '../ui/gauge.js';
import { CATALOGUE } from '../metrics.js';
import { SAMPLE_HZ } from '../camera.js';
import { bus } from '../bus.js';
import * as store from '../store.js';
import * as historyStore from '../history.js';
import { nf, metricValueUnit, plural, zoneLabel } from '../format.js';
import { t, locale, setLanguage, languageInfo, LANGUAGES } from '../i18n/index.js';

/* ─────────────────────────────  Style własne  ────────────────────────────── */

/* Wszystko w :where(), więc specyficzność wynosi zero i css/screens.css nadpisze
   każdą z tych reguł jednym zwykłym selektorem, niezależnie od kolejności
   wczytania. Ekran ma wyglądać poprawnie także w izolacji, ale nie ma prawa
   odbierać stylowania warstwie CSS. */
const STYLE_ID = 'm5-tools-styles';
const STYLE = `
:where(.m5-tools){display:flex;flex-direction:column;gap:var(--sp-5);
  width:100%;max-width:var(--content-max);margin-inline:auto}
:where(.m5-tools__group){display:flex;flex-direction:column;gap:var(--sp-2)}
:where(.m5-tools__group + .m5-tools__group){padding-top:var(--sp-4);
  border-top:1px solid var(--line-1)}
:where(.m5-tools__grouphead){display:flex;align-items:center;gap:var(--sp-2);
  min-height:var(--tap);color:var(--text-1)}
:where(.m5-tools__groupname){flex:1 1 auto;min-width:0;font-size:var(--fs-body);
  font-weight:650;line-height:var(--lh-tight)}
:where(.m5-tools__legend){display:flex;flex-wrap:wrap;gap:var(--sp-1) var(--sp-3);
  margin:0;font-size:var(--fs-xs);color:var(--text-2)}
:where(.m5-tools__legenditem){display:inline-flex;align-items:center;gap:var(--sp-1)}
:where(.m5-tools__dot){display:inline-block;flex:0 0 auto;width:10px;height:10px;
  border-radius:var(--r-pill);background:var(--zone,var(--zone-none));
  box-shadow:inset 0 0 0 1px rgb(0 0 0 / .18)}
:where(.m5-tools__legendrange){font-family:var(--ff-num);
  font-variant-numeric:tabular-nums;color:var(--text-1)}
:where(.m5-tools__note){margin:0;font-size:var(--fs-sm);color:var(--text-2);
  line-height:var(--lh-normal)}
/* --text-3 na --surface-sunken (tło .m5-tools__help i .m5-tools__limits) daje
   4,22:1 — poniżej 4,5:1. Te zdania niosą progi i ograniczenia metody, więc
   hierarchię robi tu mniejszy stopień pisma, a nie słabszy kontrast. */
:where(.m5-tools__note--quiet){color:var(--text-2);font-size:var(--fs-xs)}
:where(.m5-tools__help){border-radius:var(--r-md);background:var(--surface-sunken)}
:where(.m5-tools__help + .m5-tools__help){margin-top:var(--sp-2)}
:where(.m5-tools__summary){display:flex;align-items:center;gap:var(--sp-3);
  min-height:var(--tap);padding:var(--sp-2) var(--sp-3);border-radius:var(--r-md);
  cursor:pointer;list-style:none;font-weight:600;color:var(--text-1)}
:where(.m5-tools__summary)::-webkit-details-marker{display:none}
:where(.m5-tools__summary:focus-visible){outline:3px solid var(--accent-ring);
  outline-offset:-3px}
:where(.m5-tools__summarytext){flex:1 1 auto;min-width:0}
:where(.m5-tools__chevron){flex:0 0 auto;color:var(--text-3);
  transition:transform var(--dur-2) var(--ease-out)}
:where(.m5-tools__help[open]) :where(.m5-tools__chevron){transform:rotate(180deg)}
:where(.m5-tools__helpbody){display:flex;flex-direction:column;gap:var(--sp-2);
  padding:0 var(--sp-3) var(--sp-3)}
:where(.m5-tools__limits){display:flex;flex-direction:column;gap:var(--sp-3);
  padding:var(--sp-4);border-radius:var(--r-md);background:var(--surface-sunken)}
:where(.m5-tools__limitshead){display:flex;align-items:center;gap:var(--sp-2);
  margin:0;font-size:var(--fs-body);font-weight:650;color:var(--text-1)}
:where(.m5-tools__limit){display:flex;flex-direction:column;gap:2px}
:where(.m5-tools__limittitle){font-size:var(--fs-sm);font-weight:600;color:var(--text-1)}
:where(.m5-tools__actions){display:flex;flex-wrap:wrap;gap:var(--sp-2)}
:where(.m5-tools__actions) > :where(.m5-btn){flex:1 1 12rem}
:where(.m5-tools__readout){font-weight:600}
/* Segment i próbka są tu etykietami natywnego radia, nie przyciskami. Wygląd
   dostają z components.css przez [data-state="active"], ale kursor i pierścień
   fokusu były pisane pod <button>: label sam nigdy nie dostanie :focus-visible,
   bo skupia się schowany w nim input. Stąd :focus-within. */
:where(label.m5-seg__item),:where(label.m5-swatch){cursor:pointer}
/* Sam --accent-ring ma alfę .40–.48, więc daje 1,75–2,0:1 — poniżej wymaganych
   3:1 dla wskaźnika fokusu. Dlatego obwódka jest dwuwarstwowa, dokładnie jak
   w base.css: pełny akcent niesie kontrast, poświata daje grubość. */
:where(.m5-seg__item:focus-within){outline:2px solid var(--accent);
  outline-offset:-3px;box-shadow:inset 0 0 0 4px var(--accent-ring)}
:where(.m5-swatch:focus-within){outline:2px solid var(--accent);
  outline-offset:3px;box-shadow:0 0 0 4px var(--accent-ring)}
`;

function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const tag = document.createElement('style');
  tag.id = STYLE_ID;
  tag.textContent = STYLE;
  document.head.appendChild(tag);
}

/* ────────────────────────────────  Drobiazgi  ────────────────────────────── */

let uid = 0;
const nextId = (prefix) => 'm5t-' + prefix + '-' + (uid += 1);

/* Kropka strefy bierze kolor z tokenów przez [data-zone], więc legenda mówi
   dokładnie tym samym językiem koloru co pasek strefowy i kafelek. Stoi zawsze
   obok słowa — sam kolor nie wystarcza przy deuteranopii. */
function zoneDot(zone) {
  return h('span.m5-tools__dot', { dataset: { zone }, aria: { hidden: 'true' } });
}

/* Skala tekstu jest ułamkiem, a nie liczbą ze znakiem procentu doklejonym
   z boku: część języków stawia ten znak przed liczbą, a arabski i perski mają
   go we własnym kroju. Formatowanie zostawiamy Intl, awaryjnie sklejamy sami. */
function percentLabel(scale) {
  try {
    return new Intl.NumberFormat(locale(), {
      style: 'percent', maximumFractionDigits: 0
    }).format(scale);
  } catch (err) {
    return Math.round(scale * 100) + '%';
  }
}

function isDarkNow() {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'dark') return true;
  if (attr === 'light') return false;
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (err) {
    return false;
  }
}

/* Wsparcie sprzętowe sprawdzamy wprost i mówimy o nim w opisie — przełącznik,
   który niczego nie robi, jest gorszy od wyłączonego z wyjaśnieniem. */
function hasVibration() {
  return typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';
}

function hasWakeLock() {
  try {
    return typeof navigator !== 'undefined' && 'wakeLock' in navigator;
  } catch (err) {
    return false;
  }
}

/* Skok suwaka progu. Kelwiny mają zakres 7500 jednostek — krok co 1 K dałby
   7500 przystanków i klawiaturą nie dałoby się przejechać skali. */
function stepFor(metric) {
  if (metric.decimals >= 2) return 0.01;
  if (metric.decimals === 1) return 0.5;
  return (metric.max - metric.min) > 2000 ? 50 : 1;
}

/* Rachunki na progach prowadzimy w liczbie kroków, nie w wartościach: przy
   kroku 0,01 sumowanie zmiennoprzecinkowe po kilku przeciągnięciach rozjechałoby
   wynik o tysięczne i store odrzuciłby zapis jako spoza zakresu. */
function toStep(metric, value, step) {
  return Math.round((value - metric.min) / step);
}

function fromStep(metric, k, step) {
  const raw = metric.min + k * step;
  return Number(raw.toFixed(Math.max(metric.decimals, 2)));
}

/**
 * Dopycha drugi suwak zamiast pozwolić mu się przeskoczyć. Zwraca parę
 * spełniającą niezmiennik: warn < crit na zwykłej skali, warn > crit przy
 * `invert` (tam więcej znaczy lepiej). Odstęp to zawsze co najmniej jeden krok —
 * dwa progi w jednym punkcie skasowałyby strefę „umiarkowanie”.
 */
function pushPair(metric, warnValue, critValue, moved) {
  const step = stepFor(metric);
  const kMax = Math.round((metric.max - metric.min) / step);
  const clampK = (k) => Math.min(kMax, Math.max(0, k));

  let w = clampK(toStep(metric, warnValue, step));
  let c = clampK(toStep(metric, critValue, step));

  if (metric.invert) {
    // Skala odwrócona: próg ostrzeżenia leży WYŻEJ od progu alarmu.
    if (moved === 'warn') {
      if (c >= w) c = clampK(w - 1);
      if (w - c < 1) w = clampK(c + 1);
    } else {
      if (w <= c) w = clampK(c + 1);
      if (w - c < 1) c = clampK(w - 1);
    }
  } else if (moved === 'warn') {
    if (c <= w) c = clampK(w + 1);
    if (c - w < 1) w = clampK(c - 1);
  } else {
    if (w >= c) w = clampK(c - 1);
    if (c - w < 1) c = clampK(w + 1);
  }

  return { warn: fromStep(metric, w, step), crit: fromStep(metric, c, step) };
}

/* Granice stref opisane słowami — najkrótszy sposób powiedzenia, co właśnie
   ustawiono, i jedyny czytelny dla kogoś, kto nie rozróżnia kolorów paska. */
function zoneRanges(metric, warn, crit) {
  const w = metricValueUnit(metric.id, warn);
  const c = metricValueUnit(metric.id, crit);
  if (metric.invert) {
    return [
      { zone: 'good', text: t('tools.zoneRange.goodAbove', { warn: w }) },
      { zone: 'warn', text: t('tools.zoneRange.warnInvert', { crit: c, warn: w }) },
      { zone: 'crit', text: t('tools.zoneRange.critBelow', { crit: c }) }
    ];
  }
  return [
    { zone: 'good', text: t('tools.zoneRange.goodBelow', { warn: w }) },
    { zone: 'warn', text: t('tools.zoneRange.warn', { warn: w, crit: c }) },
    { zone: 'crit', text: t('tools.zoneRange.critAbove', { crit: c }) }
  ];
}

/* ────────────────────────────  Klocki interfejsu  ───────────────────────── */

/* Pomocnicy dostają GOTOWY napis, nie klucz: t() woła ten, kto wie, jakie
   wstawki podstawić. Jeden zwyczaj w całym pliku, żeby nie było dwóch. */
function card({ title, subtitle, flush = false }, ...body) {
  const headingId = nextId('card');
  return h('section.m5-card', { aria: { labelledby: headingId } },
    h('header.m5-card__head', null,
      h('h2.m5-card__title', { id: headingId, text: title }),
      subtitle ? h('p.m5-card__subtitle', { text: subtitle }) : null),
    h('div.m5-card__body', { class: flush ? 'm5-card__body--flush' : null }, ...body));
}

function row({ title: titleText, desc, controlId, control, stack = false, value = null }) {
  // Tytuł jest <label for>, gdy kontrolka ma id — powiększa cel dotyku
  // przełącznika z 24 px do całej szerokości wiersza.
  const title = controlId
    ? h('label.m5-row__title', { for: controlId, text: titleText })
    : h('span.m5-row__title', { text: titleText });
  return h('div.m5-row', { class: stack ? 'm5-row--stack' : null },
    h('div.m5-row__main', null,
      title,
      desc ? h('span.m5-row__desc', { text: desc }) : null),
    value,
    h('div.m5-row__control', null, control));
}

/**
 * Przełącznik segmentowy zbudowany na natywnej grupie radiowej: strzałki
 * przełączają opcje, Tab wchodzi w zaznaczoną, czytnik mówi „2 z 3”. Sam
 * `input` jest schowany klasą sronly (nadal jest skupialny), widoczny jest jego
 * `label` — więc cały segment pozostaje celem dotyku.
 */
function segRadios({ ariaLabel, options, value, onPick }) {
  const entries = new Map();
  const name = nextId('seg');
  const el = h('div.m5-seg.m5-seg--block', { aria: { role: 'radiogroup', label: ariaLabel } });

  options.forEach((opt) => {
    const key = String(opt.id);
    const active = key === String(value);
    const input = h('input.m5-sronly', {
      type: 'radio', name, value: key, checked: active,
      on: { change: () => { if (input.checked) onPick(opt.id); } }
    });
    const label = h('label.m5-seg__item', { dataset: { state: active ? 'active' : 'idle' } },
      input,
      h('span', { text: opt.label }));
    entries.set(key, { input, label });
    el.appendChild(label);
  });

  function sync(next) {
    const key = String(next);
    entries.forEach((entry, id) => {
      const on = id === key;
      entry.input.checked = on;
      entry.label.dataset.state = on ? 'active' : 'idle';
    });
  }

  return { el, sync };
}

/** Próbki akcentu — ta sama grupa radiowa, tylko etykietą jest kolor. */
function accentRadios({ value, onPick }) {
  const entries = new Map();
  const name = nextId('accent');
  const el = h('div.m5-swatches',
    { aria: { role: 'radiogroup', label: t('tools.appearance.accent.aria') } });

  store.ACCENTS.forEach((accent) => {
    const active = accent.id === value;
    const input = h('input.m5-sronly', {
      type: 'radio', name, value: accent.id, checked: active,
      on: { change: () => { if (input.checked) onPick(accent.id); } }
    });
    const label = h('label.m5-swatch', {
      dataset: { state: active ? 'active' : 'idle' },
      style: { '--swatch': isDarkNow() ? accent.swatchDark : accent.swatchLight }
    }, input, h('span.m5-sronly', { text: t(accent.nameKey) }));
    entries.set(accent.id, { input, label, accent });
    el.appendChild(label);
  });

  function sync(next) {
    const dark = isDarkNow();
    entries.forEach((entry, id) => {
      const on = id === next;
      entry.input.checked = on;
      entry.label.dataset.state = on ? 'active' : 'idle';
      // Próbka ma pokazywać ten odcień, który naprawdę zobaczysz w bieżącym
      // motywie — jasny hex na ciemnym tle nie przeszedłby testu kontrastu.
      entry.label.style.setProperty(
        '--swatch', dark ? entry.accent.swatchDark : entry.accent.swatchLight);
    });
  }

  return { el, sync };
}

/**
 * Wybór języka. To ta sama natywna grupa radiowa co przy motywie — strzałki
 * przechodzą po opcjach, czytnik mówi „5 z 31” — tylko ułożona w siatkę:
 * trzydziestu pozycji nie da się podzielić po równo w jednym pasku segmentów,
 * bo każda byłaby węższa od własnej nazwy.
 *
 * Nazwy są endonimami, więc każda niesie własny `lang` (czytnik ekranu ma je
 * przeczytać właściwym głosem, a nie przeliterować po angielsku) i własny `dir`
 * (arabski, urdu i perski układają się w swoją stronę także wtedy, gdy reszta
 * interfejsu jest pisana od lewej).
 */
function languageRadios({ value, onPick }) {
  const entries = new Map();
  const name = nextId('lang');
  const el = h('div.m5-seg.m5-seg--grid',
    { aria: { role: 'radiogroup', label: t('tools.language.aria') } });

  /* „Auto” jest tu tym samym, czym w karcie Wygląd: stanem, w którym decyduje
     urządzenie. Bez tej pozycji świeżo otwarta aplikacja nie miałaby zaznaczonej
     ŻADNEJ opcji — zapamiętany wybór jest wtedy pusty — a raz wybranego języka
     nie dałoby się już oddać z powrotem systemowi. */
  const options = [{ code: 'system', label: t('tools.language.system'), lang: null, dir: null }];

  /* Kolejność alfabetyczna nazwy własnej, a nie kolejność zasięgu z i18n:
     na liście trzydziestu pozycji szuka się wzrokiem jednego słowa, a nie
     czyta jej od góry. Zestawia Intl dla języka bieżącego; gdyby go zabrakło,
     zostaje kolejność źródłowa — też stała, tylko mniej wygodna. */
  const languages = LANGUAGES.slice();
  try {
    const collator = new Intl.Collator(locale());
    languages.sort((a, b) => collator.compare(a.name, b.name));
  } catch (err) { /* brak Intl.Collator — zostaje kolejność z listy języków */ }

  languages.forEach((entry) => options.push({
    code: entry.code, label: entry.name, lang: entry.code, dir: entry.dir
  }));

  options.forEach((opt) => {
    const active = opt.code === String(value);
    const input = h('input.m5-sronly', {
      type: 'radio', name, value: opt.code, checked: active,
      on: { change: () => { if (input.checked) onPick(opt.code); } }
    });
    const label = h('label.m5-seg__item', { dataset: { state: active ? 'active' : 'idle' } },
      input,
      h('span', { text: opt.label, lang: opt.lang, dir: opt.dir }));
    entries.set(opt.code, { input, label });
    el.appendChild(label);
  });

  function sync(next) {
    const key = String(next);
    entries.forEach((entry, code) => {
      const on = code === key;
      entry.input.checked = on;
      entry.label.dataset.state = on ? 'active' : 'idle';
    });
  }

  /* Skupialna w grupie radiowej jest wyłącznie pozycja zaznaczona — po
     przebudowie ekranu wracamy fokusem dokładnie na nią. */
  function focusActive() {
    entries.forEach((entry) => {
      if (entry.input.checked) entry.input.focus({ preventScroll: true });
    });
  }

  return { el, sync, focusActive };
}

function switchControl({ checked, onToggle, disabled = false }) {
  const id = nextId('sw');
  const input = h('input.m5-switch', {
    type: 'checkbox', id, checked, disabled,
    on: { change: () => onToggle(input.checked) }
  });
  return { id, input };
}

/**
 * Suwak z odczytem liczbowym obok tytułu. `aria-valuetext` niesie wartość
 * sformatowaną po polsku z jednostką — samo `aria-valuenow` czytnik przeczyta
 * jako gołą liczbę z kropką dziesiętną, a to brzmi jak zupełnie inna wartość.
 */
function slider({ ariaLabel, min, max, step, value, zone = null, format, onInput }) {
  const readout = h('span.m5-row__value.m5-tools__readout.m5-num', { text: format(value) });
  const input = h('input.m5-slider', {
    type: 'range', min, max, step, value,
    aria: { label: ariaLabel, valuetext: format(value) },
    dataset: zone ? { zone } : {},
    on: { input: () => onInput(Number(input.value)) }
  });

  function paint(next) {
    const span = max - min;
    const fill = span > 0 ? ((next - min) / span) * 100 : 0;
    // WebKit nie umie sam pokolorować przebytej części toru — stąd --fill.
    input.style.setProperty('--fill', Math.max(0, Math.min(100, fill)).toFixed(2) + '%');
    input.setAttribute('aria-valuetext', format(next));
    readout.textContent = format(next);
  }

  function sync(next) {
    if (Number(input.value) !== next) input.value = String(next);
    paint(next);
  }

  paint(value);
  return { input, readout, sync };
}

/* ──────────────────────────────  Karta: Język  ──────────────────────────── */

function languageCard(settings) {
  const radios = languageRadios({
    // Pusty zapis w ustawieniach znaczy „wg urządzenia”; w kontrolce odpowiada
    // mu pozycja „Auto”, więc zaznaczone jest zawsze dokładnie jedno pole.
    value: settings.language || 'system',
    onPick: (code) => {
      /* setLanguage() robi obie rzeczy naraz: przestawia interfejs (bez
         przeładowania strony) i zapisuje wybór w ustawieniach. Kończy
         zdarzeniem 'i18n:changed', na które ten ekran przebudowuje się w
         całości — dlatego tutaj nie odświeżamy niczego ręcznie. */
      setLanguage(code === 'system' ? null : code).then((active) => {
        // Cały ekran właśnie zniknął i wrócił w innym języku. Bez tego zdania
        // czytnik ekranu nie ma skąd wiedzieć, że cokolwiek się stało.
        const info = languageInfo(active);
        announce(t('tools.language.announce', { language: info ? info.name : active }));
      });
    }
  });

  const el = card({
    title: t('tools.language.title'),
    subtitle: t('tools.language.subtitle')
  }, radios.el);

  function sync(next) {
    radios.sync(next.language || 'system');
  }

  return { el, sync, focusActive: radios.focusActive };
}

/* ─────────────────────────────  Karta: Wygląd  ──────────────────────────── */

function appearanceCard(settings) {
  const theme = segRadios({
    ariaLabel: t('tools.appearance.theme.aria'),
    options: [
      { id: 'system', label: t('tools.theme.system') },
      { id: 'light', label: t('tools.theme.light') },
      { id: 'dark', label: t('tools.theme.dark') }
    ],
    value: settings.theme,
    onPick: (id) => store.set({ theme: id })
  });

  const accent = accentRadios({
    value: settings.accent,
    onPick: (id) => store.set({ accent: id })
  });

  const scale = segRadios({
    ariaLabel: t('tools.appearance.textScale.aria'),
    options: store.TEXT_SCALES.map((s) => ({ id: s, label: percentLabel(s) })),
    value: settings.textScale,
    onPick: (id) => store.set({ textScale: Number(id) })
  });

  const density = segRadios({
    ariaLabel: t('tools.appearance.density.aria'),
    options: [
      { id: 'comfortable', label: t('tools.density.comfortable') },
      { id: 'compact', label: t('tools.density.compact') }
    ],
    value: settings.density,
    onPick: (id) => store.set({ density: id })
  });

  const motion = switchControl({
    checked: settings.motion === 'reduced',
    onToggle: (on) => store.set({ motion: on ? 'reduced' : 'system' })
  });

  const el = card({ title: t('tools.appearance.title'), flush: true },
    row({
      title: t('tools.appearance.theme.title'), desc: t('tools.appearance.theme.desc'),
      stack: true, control: theme.el
    }),
    row({
      title: t('tools.appearance.accent.title'), desc: t('tools.appearance.accent.desc'),
      stack: true, control: accent.el
    }),
    row({
      title: t('tools.appearance.textScale.title'), desc: t('tools.appearance.textScale.desc'),
      stack: true, control: scale.el
    }),
    row({
      title: t('tools.appearance.density.title'), desc: t('tools.appearance.density.desc'),
      stack: true, control: density.el
    }),
    row({
      title: t('tools.appearance.motion.title'),
      desc: t('tools.appearance.motion.desc'),
      controlId: motion.id,
      control: motion.input
    }));

  function sync(next) {
    theme.sync(next.theme);
    accent.sync(next.accent);
    scale.sync(next.textScale);
    density.sync(next.density);
    motion.input.checked = next.motion === 'reduced';
  }

  return { el, sync };
}

/* ──────────────────────────────  Karta: Progi  ──────────────────────────── */

function thresholdGroup(metric) {
  const step = stepFor(metric);
  const start = store.thresholdsFor(metric.id) || { warn: metric.warn, crit: metric.crit };

  // Pasek bez znacznika: to podgląd skali, a nie pomiar. Wartości, której nikt
  // teraz nie mierzy, nie wolno tu podstawiać.
  const bar = zoneBar({ metricId: metric.id, value: null, decorative: true });
  const legend = h('p.m5-tools__legend');

  const resetBtn = h('button.m5-btn.m5-btn--quiet.m5-btn--sm', {
    type: 'button',
    aria: { label: t('tools.thresholds.reset.aria', { metric: t('metric.' + metric.id + '.name') }) },
    // Nadpisanie kasujemy, podstawiając null: store.js odrzuca wpis, który nie
    // przechodzi walidacji, więc klucz znika i wracają progi z katalogu.
    on: { click: () => store.set({ thresholds: { [metric.id]: null } }) }
  }, t('tools.thresholds.reset'));

  let warnSlider = null;
  let critSlider = null;

  function paint(warn, crit) {
    legend.textContent = '';
    zoneRanges(metric, warn, crit).forEach((entry) => {
      legend.appendChild(h('span.m5-tools__legenditem', null,
        zoneDot(entry.zone),
        h('span', { text: t('tools.legend.zone', { zone: zoneLabel(entry.zone) }) }),
        h('span.m5-tools__legendrange', { text: entry.text })));
    });
    // zoneBar sam sięga po progi ze store.js przy każdym update — wystarczy go
    // szturchnąć, żeby przestawił pasma.
    bar.update(null);
  }

  let lastPushAnnounce = 0;

  function commit(moved, value) {
    const other = moved === 'warn' ? 'crit' : 'warn';
    const otherBefore = Number((moved === 'warn' ? critSlider : warnSlider).input.value);
    const pair = pushPair(
      metric,
      moved === 'warn' ? value : Number(warnSlider.input.value),
      moved === 'crit' ? value : Number(critSlider.input.value),
      moved
    );
    // Najpierw zapis, potem odmalowanie: pasek czyta progi ze store, więc
    // odwrotna kolejność pokazałaby na moment poprzedni układ pasm.
    store.set({ thresholds: { [metric.id]: pair } });
    warnSlider.sync(pair.warn);
    critSlider.sync(pair.crit);
    paint(pair.warn, pair.crit);

    // pushPair pilnuje warn < crit, przesuwając DRUGI suwak — czyli kontrolkę,
    // na której użytkownik nie stoi. Bez tego zdania zmiana zachodzi bez śladu
    // dla kogoś, kto nie widzi ekranu. Dławimy do ~2 razy na sekundę, bo przy
    // przeciąganiu warunek spełnia się przy każdym kroku.
    const now = Date.now();
    if (Math.abs(pair[other] - otherBefore) > 1e-9 && now - lastPushAnnounce > 450) {
      lastPushAnnounce = now;
      announce(t('tools.thresholds.moved', {
        threshold: t(other === 'crit' ? 'tools.thresholds.crit' : 'tools.thresholds.warn'),
        value: metricValueUnit(metric.id, pair[other])
      }));
    }
  }

  // Widoczna etykieta wiersza otwiera dostępną nazwę suwaka, więc sterowanie
  // głosem („kliknij Próg ostrzeżenia”) trafia w tę samą kontrolkę, którą widać.
  warnSlider = slider({
    ariaLabel: t('tools.thresholds.warn.aria', { metric: t('metric.' + metric.id + '.name') }),
    min: metric.min, max: metric.max, step, value: start.warn, zone: 'warn',
    format: (v) => metricValueUnit(metric.id, v),
    onInput: (v) => commit('warn', v)
  });

  critSlider = slider({
    ariaLabel: t('tools.thresholds.crit.aria', { metric: t('metric.' + metric.id + '.name') }),
    min: metric.min, max: metric.max, step, value: start.crit, zone: 'crit',
    format: (v) => metricValueUnit(metric.id, v),
    onInput: (v) => commit('crit', v)
  });

  const el = h('div.m5-tools__group', null,
    h('div.m5-tools__grouphead', null,
      icon(metric.icon, { size: 20 }),
      h('span.m5-tools__groupname', { text: t('metric.' + metric.id + '.name') }),
      resetBtn),
    bar.el,
    legend,
    row({ title: t('tools.thresholds.warn'), stack: true, control: warnSlider.input, value: warnSlider.readout }),
    row({ title: t('tools.thresholds.crit'), stack: true, control: critSlider.input, value: critSlider.readout }));

  function sync(settings) {
    const current = settings.thresholds[metric.id] || { warn: metric.warn, crit: metric.crit };
    warnSlider.sync(current.warn);
    critSlider.sync(current.crit);
    paint(current.warn, current.crit);
    resetBtn.disabled = !settings.thresholds[metric.id];
  }

  paint(start.warn, start.crit);
  return { el, sync, destroy: () => bar.destroy() };
}

function thresholdsCard(settings) {
  const groups = CATALOGUE.map(thresholdGroup);

  const resetAll = h('button.m5-btn.m5-btn--ghost', {
    type: 'button',
    on: {
      click: async () => {
        const ok = await dialog({
          title: t('tools.thresholds.resetAll.title'),
          text: t('tools.thresholds.resetAll.text'),
          confirmPL: t('tools.thresholds.resetAll.confirm'),
          cancelPL: t('tools.thresholds.resetAll.cancel')
        });
        if (!ok) return;
        const wipe = {};
        CATALOGUE.forEach((m) => { wipe[m.id] = null; });
        store.set({ thresholds: wipe });
        toast(t('tools.thresholds.resetAll.toast'), { tone: 'success' });
      }
    }
  }, t('tools.thresholds.resetAll'));

  const el = card({
    title: t('tools.thresholds.title'),
    subtitle: t('tools.thresholds.subtitle')
  }, ...groups.map((g) => g.el));

  el.appendChild(h('div.m5-card__foot', null, resetAll));

  function sync(next) {
    groups.forEach((g) => g.sync(next));
    resetAll.disabled = Object.keys(next.thresholds).length === 0;
  }

  sync(settings);
  return { el, sync, destroy: () => groups.forEach((g) => g.destroy()) };
}

/* ───────────────────────────  Karta: Kalibracja  ────────────────────────── */

/* Same identyfikatory kanałów — nazwa jest treścią i mieszka w słowniku. */
const CHANNELS = ['r', 'g', 'b'];

const channelName = (id) => t('tools.calibration.channel.' + id);

function calibrationCard(settings) {
  const gainText = (v) => t('tools.calibration.gain', { value: nf(v, 2) });

  const sliders = CHANNELS.map((channel) => ({
    channel,
    control: slider({
      ariaLabel: t('tools.calibration.channel.aria', { channel: channelName(channel) }),
      min: 0.5, max: 1.5, step: 0.01,
      value: settings.calibration[channel],
      format: gainText,
      onInput: (v) => store.set({ calibration: { [channel]: Number(v.toFixed(2)) } })
    })
  }));

  const resetBtn = h('button.m5-btn.m5-btn--ghost', {
    type: 'button',
    on: {
      click: () => {
        store.set({ calibration: { r: 1, g: 1, b: 1 } });
        // Skutku nie widać na tym ekranie poza samymi suwakami, więc mówimy o nim wprost.
        toast(t('tools.calibration.reset.toast'), { tone: 'success' });
      }
    }
  }, t('tools.calibration.reset'));

  const el = card({
    title: t('tools.calibration.title'),
    subtitle: t('tools.calibration.subtitle')
  },
  h('p.m5-tools__note', { text: t('tools.calibration.intro') }),
  h('p.m5-tools__note', { text: t('tools.calibration.neutral') }),
  ...sliders.map(({ channel, control }) => row({
    title: channelName(channel), stack: true, control: control.input, value: control.readout
  })),
  h('p.m5-tools__note.m5-tools__note--quiet', { text: t('tools.calibration.forward') }));

  el.appendChild(h('div.m5-card__foot', null, resetBtn));

  function sync(next) {
    let neutral = true;
    sliders.forEach(({ channel, control }) => {
      const value = next.calibration[channel];
      control.sync(value);
      if (Math.abs(value - 1) > 0.0005) neutral = false;
    });
    resetBtn.disabled = neutral;
  }

  sync(settings);
  return { el, sync };
}

/* ─────────────────────────────  Karta: Pomiar  ──────────────────────────── */

function measurementCard(settings) {
  const wakeSupported = hasWakeLock();
  const vibrateSupported = hasVibration();

  const wake = switchControl({
    checked: settings.keepAwake,
    disabled: !wakeSupported,
    onToggle: (on) => store.set({ keepAwake: on })
  });

  const haptics = switchControl({
    checked: settings.haptics,
    disabled: !vibrateSupported,
    onToggle: (on) => {
      store.set({ haptics: on });
      // Zamiast toastu — samo urządzenie pokazuje, co właśnie włączono.
      if (on) haptic(12, true);
    }
  });

  const el = card({ title: t('tools.measurement.title'), flush: true },
    row({
      title: t('tools.measurement.wake.title'),
      desc: t(wakeSupported
        ? 'tools.measurement.wake.desc'
        : 'tools.measurement.wake.unsupported'),
      controlId: wake.id,
      control: wake.input
    }),
    row({
      title: t('tools.measurement.haptics.title'),
      desc: t(vibrateSupported
        ? 'tools.measurement.haptics.desc'
        : 'tools.measurement.haptics.unsupported'),
      controlId: haptics.id,
      control: haptics.input
    }));

  function sync(next) {
    wake.input.checked = next.keepAwake;
    haptics.input.checked = next.haptics;
  }

  return { el, sync };
}

/* ──────────────────────────  Karta: O pomiarze  ─────────────────────────── */

function thresholdSentence(metric, limits) {
  // Przy `invert` wyższa wartość jest lepsza, więc ostrzegamy PONIŻEJ progu —
  // zdanie musi to powiedzieć, inaczej czyta się jak literówka.
  return t(metric.invert ? 'tools.about.thresholdInvert' : 'tools.about.threshold', {
    warn: metricValueUnit(metric.id, limits.warn),
    crit: metricValueUnit(metric.id, limits.crit)
  });
}

function metricDetails(metric) {
  const limits = store.thresholdsFor(metric.id) || { warn: metric.warn, crit: metric.crit };
  const thresholdEl = h('p.m5-tools__note.m5-tools__note--quiet', {
    text: thresholdSentence(metric, limits)
  });

  const el = h('details.m5-tools__help', null,
    h('summary.m5-tools__summary', null,
      icon(metric.icon, { size: 20 }),
      h('span.m5-tools__summarytext', { text: t('metric.' + metric.id + '.name') }),
      icon('chevronDown', { size: 18, class: 'm5-tools__chevron' })),
    h('div.m5-tools__helpbody', null,
      h('p.m5-tools__note', { text: t('metric.' + metric.id + '.short') }),
      h('p.m5-tools__note', { text: t('metric.' + metric.id + '.help') }),
      h('p.m5-tools__note.m5-tools__note--quiet', {
        text: t('tools.about.scale', {
          min: metricValueUnit(metric.id, metric.min),
          max: metricValueUnit(metric.id, metric.max)
        })
      }),
      thresholdEl));

  function sync(settings) {
    const now = settings.thresholds[metric.id] || { warn: metric.warn, crit: metric.crit };
    thresholdEl.textContent = thresholdSentence(metric, now);
  }

  return { el, sync };
}

/* Uczciwa lista tego, czego ta metoda nie potrafi. Stoi na widoku, nie pod
   rozwinięciem — ograniczenia, których trzeba szukać, nie są ostrzeżeniem.
   FUNKCJA, nie stała: napisy (a w migotaniu także liczby) muszą powstać przy
   rysowaniu, bo stała zamarzłaby w języku z chwili wczytania modułu. */
const LIMIT_IDS = ['spectrum', 'exposure', 'flicker', 'medical'];

function limits() {
  return LIMIT_IDS.map((id) => ({
    title: t('tools.about.limit.' + id + '.title'),
    text: t('tools.about.limit.' + id + '.text', {
      hz: nf(SAMPLE_HZ),
      nyquist: nf(SAMPLE_HZ / 2)
    })
  }));
}

function aboutCard(settings) {
  const items = CATALOGUE.map(metricDetails);

  const el = card({
    title: t('tools.about.title'),
    subtitle: t('tools.about.subtitle')
  },
  ...items.map((i) => i.el),
  h('div.m5-tools__limits', null,
    h('p.m5-tools__limitshead', null,
      icon('alert', { size: 20 }),
      h('span', { text: t('tools.about.limitsHead') })),
    ...limits().map((limit) => h('div.m5-tools__limit', null,
      h('span.m5-tools__limittitle', { text: limit.title }),
      h('p.m5-tools__note', { text: limit.text }))),
    h('p.m5-tools__note.m5-tools__note--quiet', { text: t('tools.about.privacy') }),
    /* Odsyłacz do pełnej polityki. Oba sklepy wymagają go WEWNĄTRZ aplikacji,
       a nie tylko w formularzu konsoli — zapewnienia o prywatności rozsiane po
       ekranach polityką nie są, bo nie mówią o administratorze ani o retencji.
       Cel leży w zakresie aplikacji (docs/v5/prywatnosc.html) i jest w
       APP_SHELL, więc otwiera się bez paska adresu i działa bez sieci. */
    h('p.m5-tools__note', null,
      h('a', {
        href: './prywatnosc.html',
        rel: 'noopener',
        text: t('tools.about.privacyPolicy')
      }))));

  function sync(next) {
    items.forEach((i) => i.sync(next));
  }

  /** Otwiera wszystkie wyjaśnienia — używa tego akcja „O pomiarze” z topbara. */
  function openAll() {
    items.forEach((i) => { i.el.open = true; });
  }

  sync(settings);
  return { el, sync, openAll };
}

/* ──────────────────────────────  Karta: Dane  ───────────────────────────── */

/* Usunięcie wszystkiego jest nieodwracalne i dotyczy także kluczy, których ten
   ekran nie zna z nazwy. */
function wipeEverything() {
  historyStore.clear();

  // Zamiatanie resztek: klucze po starszych wersjach modułów (także po zniesionej
  // symulacji konta i płatności) albo po module, który w tej sesji w ogóle nie
  // został wczytany. Ruszamy wyłącznie własny prefiks — dane wersji v1–v4 leżą
  // w tej samej pamięci i mają tam zostać.
  try {
    const doomed = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (key && key.indexOf('ms5.') === 0) doomed.push(key);
    }
    doomed.forEach((key) => window.localStorage.removeItem(key));
  } catch (err) { /* brak dostępu do pamięci — nie ma czego kasować */ }

  // Na końcu, bo reset() zapisuje ustawienia domyślne i stosuje je na <html>.
  store.reset();
}

/* Potwierdzenie proporcjonalne do skutku: przy operacji, po której nie ma czego
   przywrócić, sam czerwony przycisk to za mało. Odblokowuje go dopiero
   świadome zaznaczenie — nadal jedno dotknięcie i pełna obsługa klawiaturą. */
function confirmWipe() {
  return new Promise((resolve) => {
    const checkId = nextId('wipe');
    let answer = false;

    const confirmBtn = h('button.m5-btn.m5-btn--danger', {
      type: 'button', disabled: true, dataset: { tone: 'danger' },
      on: { click: () => { answer = true; api.close(); } }
    }, t('tools.data.wipe.confirm'));

    const check = h('input.m5-switch', {
      type: 'checkbox', id: checkId,
      on: { change: () => { confirmBtn.disabled = !check.checked; } }
    });

    const api = sheet({
      title: t('tools.data.wipe.title'),
      body: [
        h('p.m5-tools__note', { text: t('tools.data.wipe.text') }),
        h('p.m5-tools__note.m5-tools__note--quiet', { text: t('tools.data.wipe.note') }),
        row({ title: t('tools.data.wipe.check'), controlId: checkId, control: check })
      ],
      actions: [
        { labelPL: t('common.cancel'), tone: 'ghost', autofocus: true, onClick: () => { answer = false; } },
        confirmBtn
      ],
      onClose: () => resolve(answer)
    });
  });
}

function dataCard() {
  const summary = h('p.m5-tools__note');
  const storageNote = h('p.m5-tools__note.m5-tools__note--quiet');

  // Ta sama nazwa pliku co w ekranie Historia: data i godzina, nie sama data —
  // dwa eksporty tego samego dnia nie mogą się nazywać identycznie.
  const stamp = () => {
    const d = new Date();
    const p2 = (n) => (n < 10 ? '0' + n : String(n));
    return d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate())
      + '-' + p2(d.getHours()) + p2(d.getMinutes());
  };

  /* Aplikacja nie ma jak sprawdzić, czy plik naprawdę powstał: dom.download
     klika <a download>, co w trybie prywatnym i w widoku osadzonym w innej
     aplikacji bywa zignorowane. Dlatego komunikat mówi „przygotowany”, a nie
     „zapisany” — i dlatego wyjątek nie leci do obsługi awarii w app.js. */
  function exportFile(kind) {
    try {
      if (kind === 'csv') {
        download('monitor-swiatla-' + stamp() + '.csv', historyStore.exportCSV(),
          'text/csv;charset=utf-8');
      } else {
        download('monitor-swiatla-' + stamp() + '.json', historyStore.exportJSON(),
          'application/json;charset=utf-8');
      }
      toast(t('history.export.ok'), { tone: 'success' });
    } catch (err) {
      // Ten sam klucz co w ekranie Historia: ta sama porażka ma brzmieć tak samo
      // i mówić, co z nią zrobić.
      toast(t('history.export.fail'), { tone: 'error' });
    }
  }

  const exportCsvBtn = h('button.m5-btn.m5-btn--ghost', {
    type: 'button',
    on: { click: () => exportFile('csv') }
  }, icon('download', { size: 20 }), h('span', { text: t('tools.data.export.csv') }));

  const exportJsonBtn = h('button.m5-btn.m5-btn--ghost', {
    type: 'button',
    on: { click: () => exportFile('json') }
  }, icon('download', { size: 20 }), h('span', { text: t('tools.data.export.json') }));

  // Operacja nieodwracalna wygląda tak samo jak w Historii: czerwony przycisk
  // i to samo zdanie w dialogu. Inaczej użytkownik uczy się, że czerwień coś
  // znaczy, a potem trafia na tę samą akcję w kolorze neutralnym.
  const clearBtn = h('button.m5-btn.m5-btn--danger', {
    type: 'button',
    dataset: { tone: 'danger' },
    on: {
      click: async () => {
        const count = historyStore.all().length;
        const sessionCount = historyStore.sessions().length;
        const ok = await dialog({
          title: t('history.clear.title'),
          text: t('history.clear.text', {
            points: plural(count, 'unit.measurement.plural'),
            // Biernik: „Usuniemy … i dwie sesje”. Mianownik trafia niżej,
            // do podsumowania karty.
            sessions: plural(sessionCount, 'unit.session.accusative.plural')
          }),
          confirmPL: t('history.clear.confirm'),
          cancelPL: t('common.cancel'),
          tone: 'danger'
        });
        if (!ok) return;
        haptic(18);
        historyStore.clear();
        toast(t('history.clear.toast'), { tone: 'success' });
      }
    }
  }, icon('trash', { size: 20 }), h('span', { text: t('tools.data.clear') }));

  const resetBtn = h('button.m5-btn.m5-btn--ghost', {
    type: 'button',
    on: {
      click: async () => {
        const ok = await dialog({
          title: t('tools.data.reset.title'),
          text: t('tools.data.reset.text'),
          confirmPL: t('tools.data.reset.confirm'),
          cancelPL: t('common.cancel')
        });
        if (!ok) return;
        store.reset();
        toast(t('tools.data.reset.toast'), { tone: 'success' });
      }
    }
  }, icon('settings', { size: 20 }), h('span', { text: t('tools.data.reset') }));

  const wipeBtn = h('button.m5-btn.m5-btn--danger', {
    type: 'button', dataset: { tone: 'danger' },
    on: {
      click: async () => {
        const ok = await confirmWipe();
        if (!ok) return;
        haptic([18, 60, 18]);
        wipeEverything();
        toast(t('tools.data.wipe.toast'), { tone: 'success' });
        announce(t('tools.data.wipe.announce'));
      }
    }
  }, icon('trash', { size: 20 }), h('span', { text: t('tools.data.wipe') }));

  const el = card({
    title: t('tools.data.title'),
    subtitle: t('tools.data.subtitle')
  },
  summary,
  h('div.m5-tools__actions', null, exportCsvBtn, exportJsonBtn),
  h('div.m5-sep', { aria: { hidden: 'true' } }),
  h('div.m5-tools__actions', null, clearBtn, resetBtn),
  h('div.m5-sep', { aria: { hidden: 'true' } }),
  h('div.m5-tools__actions', null, wipeBtn),
  storageNote);

  function sync() {
    const count = historyStore.all().length;
    const sessionCount = historyStore.sessions().length;

    summary.textContent = count === 0
      ? t('tools.data.summary.empty')
      : t('tools.data.summary', {
        points: plural(count, 'unit.measurement.plural'),
        sessions: plural(sessionCount, 'unit.session.plural')   // mianownik
      });

    // Eksport pustego pliku i czyszczenie pustej historii tylko udawałyby akcję.
    exportCsvBtn.disabled = count === 0;
    exportJsonBtn.disabled = count === 0;
    clearBtn.disabled = count === 0 && sessionCount === 0;

    const state = historyStore.storage();
    let note = '';
    if (state === 'blocked' || !store.isPersistent()) {
      note = t('tools.data.storage.blocked');
    } else if (state === 'full') {
      note = t('tools.data.storage.full');
    }
    storageNote.textContent = note;
    storageNote.hidden = note === '';
  }

  sync();
  return { el, sync };
}

/* ────────────────────────────────  Ekran  ───────────────────────────────── */

export function create() {
  ensureStyles();

  const el = h('div.m5-screen.m5-tools');

  /* Karty powstają w funkcji, a nie raz na zawsze: ten ekran trzyma napisy
     w gotowych węzłach DOM, więc po przełączeniu języka jedynym sposobem, żeby
     nie został na nich stary tekst, jest zbudowanie ich od nowa. Korzeń ekranu
     zostaje ten sam — powłoka trzyma do niego referencję. */
  let cards = null;

  function build() {
    const settings = store.get();
    cards = {
      language: languageCard(settings),
      appearance: appearanceCard(settings),
      thresholds: thresholdsCard(settings),
      calibration: calibrationCard(settings),
      measurement: measurementCard(settings),
      about: aboutCard(settings),
      data: dataCard()
    };
    clear(el);
    mount(el, cards.language.el, cards.appearance.el, cards.thresholds.el,
      cards.calibration.el, cards.measurement.el, cards.about.el, cards.data.el);
  }

  function teardownCards() {
    // Paski stref w karcie Progi trzymają obserwatora rozmiaru — bez tego
    // przebudowa po każdej zmianie języka zostawiałaby ich po sobie coraz więcej.
    if (cards) cards.thresholds.destroy();
    cards = null;
  }

  build();

  const unsubscribe = [];
  let colourScheme = null;
  let onScheme = null;

  function syncSettings(next) {
    cards.language.sync(next);
    cards.appearance.sync(next);
    cards.thresholds.sync(next);
    cards.calibration.sync(next);
    cards.measurement.sync(next);
    cards.about.sync(next);
  }

  /* Nasłuch języka stoi POZA mount(): język wolno przełączyć także wtedy, gdy
     ekran jest odmontowany (przełącznik systemowy, druga zakładka), a wracać
     mamy na gotowe napisy, nie na poprzednie. */
  bus.on('i18n:changed', () => {
    /* Przebudowa wyrzuca z dokumentu element, który miał fokus — a przy zmianie
       języka jest nim niemal zawsze przycisk radiowy z listy języków: klawiatura
       przechodzi po niej strzałkami, a każde przejście zmienia język. Bez
       przywrócenia fokusu po pierwszej strzałce lądowałby na początku dokumentu
       i dalszy wybór klawiaturą byłby niemożliwy. */
    const keepFocus = !!cards && cards.language.el.contains(document.activeElement);
    teardownCards();
    build();
    if (keepFocus) cards.language.focusActive();
  });

  return {
    el,
    // Getter, nie stała: powłoka pyta o tytuł przy każdym wejściu na ekran,
    // a napis ma być w języku, który jest teraz.
    get titlePL() { return t('tools.title'); },

    actions() {
      return [{
        icon: 'info',
        labelPL: t('tools.action.about'),
        // Kartę bierzemy w chwili kliknięcia, nie w chwili budowania akcji:
        // po przełączeniu języka karty są już inne, a powłoka nie pyta o akcje
        // drugi raz.
        onClick: () => {
          const about = cards.about;
          about.openAll();
          // „Mniej ruchu” zabrania właśnie takiego przewinięcia przez kilka ekranów.
          about.el.scrollIntoView({ block: 'start', behavior: reducedMotion() ? 'auto' : 'smooth' });
          // Fokus musi pójść za przewinięciem, inaczej klawiatura zostaje
          // w górnym pasku i użytkownik nie wie, gdzie wylądował.
          const first = about.el.querySelector('summary');
          if (first) first.focus({ preventScroll: true });
        }
      }];
    },

    mount() {
      // Ustawienia i historia mogły się zmienić, gdy ekran był odmontowany.
      syncSettings(store.get());
      cards.data.sync();

      unsubscribe.push(bus.on('settings:changed', (payload) => syncSettings(payload.settings)));
      unsubscribe.push(bus.on('history:changed', () => cards.data.sync()));
      unsubscribe.push(bus.on('history:session', () => cards.data.sync()));

      // Przy theme='system' motyw zmienia się bez udziału store.js, a próbki
      // akcentu muszą wtedy pokazać drugi z dwóch odcieni.
      try {
        colourScheme = window.matchMedia('(prefers-color-scheme: dark)');
        onScheme = () => cards.appearance.sync(store.get());
        if (typeof colourScheme.addEventListener === 'function') {
          colourScheme.addEventListener('change', onScheme);
        } else if (typeof colourScheme.addListener === 'function') {
          colourScheme.addListener(onScheme);
        }
      } catch (err) { /* starsza przeglądarka — próbki odświeży następne wejście */ }
    },

    unmount() {
      while (unsubscribe.length) {
        const off = unsubscribe.pop();
        if (typeof off === 'function') off();
      }
      if (colourScheme && onScheme) {
        if (typeof colourScheme.removeEventListener === 'function') {
          colourScheme.removeEventListener('change', onScheme);
        } else if (typeof colourScheme.removeListener === 'function') {
          colourScheme.removeListener(onScheme);
        }
      }
      colourScheme = null;
      onScheme = null;
    }
  };
}
