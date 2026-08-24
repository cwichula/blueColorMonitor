/* Monitor Światła v5 — js/screens/history.js
 *
 * ROLA PLIKU: ekran „Historia”. Składa wybór wielkości (żetony), wybór zakresu
 * (przełącznik segmentowany), wykres z ui/chart.js, trzy karty statystyk ze
 * wskaźnikiem trendu, listę sesji pomiarowych oraz operacje na danych: eksport
 * CSV/JSON i wyczyszczenie historii z potwierdzeniem.
 *
 * Dwie decyzje, które trzymają ten ekran lekkim: przerysowanie jest dławione do
 * raz na dwie sekundy (historia rośnie 1 Hz, a przeliczenie serii i wykresu jest
 * najdroższą rzeczą na ekranie), a lista sesji przebudowuje się dopiero wtedy,
 * gdy naprawdę się zmieniła — porównujemy jej podpis, nie zawartość DOM.
 */

import { h, clear as clearNode, mount, icon, download, announce, haptic } from '../ui/dom.js';
import { toast, dialog, sheet, paywall } from '../ui/overlays.js';
import { chart } from '../ui/chart.js';
import {
  RANGES, stats, sessions, all, clear as clearHistory,
  exportCSV, exportJSON, storage
} from '../history.js';
import { CATALOGUE, byId, zoneFor } from '../metrics.js';
import { metricValue, dateTime, duration, plural, relative, ZONE_LABEL } from '../format.js';
import { get as getSettings, set as setSettings, thresholdsFor } from '../store.js';
import { bus } from '../bus.js';

const DASH = '—';
const NDASH = '–';
const NBSP = ' ';
const MIDDOT = '·';

/* Historia dopisuje punkt raz na sekundę, a odświeżenie to przeliczenie serii
   plus pełne przerysowanie canvasa. Dwie sekundy to próg, poniżej którego
   człowiek i tak nie zauważy różnicy, a bateria już tak. */
const REFRESH_EVERY_MS = 2000;

const TREND_LABEL = {
  '1': 'rośnie w tym zakresie',
  '0': 'bez wyraźnej zmiany',
  '-1': 'spada w tym zakresie'
};

let seq = 0;

/* Zakres zapisany w ustawieniach mógł pochodzić ze starszej wersji — pilnujemy,
   żeby zawsze wskazywał pozycję istniejącą w history.RANGES. */
function rangeById(id) {
  for (let i = 0; i < RANGES.length; i += 1) {
    if (RANGES[i].id === id) return RANGES[i];
  }
  return null;
}

function measured(value) {
  return typeof value === 'number' && isFinite(value);
}

function zoneOf(metric, value) {
  if (!metric || !measured(value)) return 'none';
  const t = thresholdsFor(metric.id) || { warn: metric.warn, crit: metric.crit };
  return zoneFor(value, t.warn, t.crit, metric.invert) || 'none';
}

/* Znacznik strefy: barwa nigdy nie stoi sama, obok idzie słowo i kształt
   z components.css. */
function zoneTag(zone) {
  return h('span.m5-zone', { dataset: { zone: zone } }, ZONE_LABEL[zone] || ZONE_LABEL.none);
}

/* Ten sam komunikat co w ekranie Narzędzia: ta sama porażka ma brzmieć tak samo
   i mówić, co z nią zrobić. */
const EXPORT_FAIL_PL = 'Nie udało się przygotować pliku. W trybie prywatnym i w oknie osadzonym w innej '
  + 'aplikacji przeglądarka blokuje zapis — otwórz stronę w zwykłej karcie.';

function fileStamp(ts) {
  const d = new Date(ts);
  const p2 = (n) => (n < 10 ? '0' + n : String(n));
  return d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate())
    + '-' + p2(d.getHours()) + p2(d.getMinutes());
}

/* Router stoi w drzewie importów niżej niż ekrany, więc nie wolno go stąd
   zaimportować. Zmiana hasha to dokładnie to, czego router nasłuchuje. */
function goMeasure() {
  window.location.hash = '#/measure';
}

export function create() {
  const uid = 'm5hist' + (seq += 1);
  const settings = getSettings();

  /* Wielkość jest stanem WYŁĄCZNIE tego ekranu — kontrakt trzyma w
     store.leadMetric wielkość wiodącą pomiaru i przestawianie jej z historii
     zmieniałoby wskaźnik-bohatera na drugim ekranie. Startujemy od niej tylko
     dlatego, że to najbliższe temu, czym użytkownik właśnie się zajmował. */
  let metric = byId(settings.leadMetric) || CATALOGUE[0];
  let range = rangeById(settings.historyRange) || rangeById('1h') || RANGES[0];

  let chartApi = null;
  let mounted = false;
  let refreshTimer = null;
  let lastRefreshAt = 0;
  let pointCount = 0;
  let sessionSignature = '';
  let storageMessage = '';
  let billing = null;                  // moduł billing.js, jeśli już istnieje
  const openSessions = new Set();      // rozwinięcia przeżywają przebudowę listy
  const chipButtons = new Map();
  const rangeButtons = new Map();
  const offs = [];

  /* ─────────────────────────────  Uprawnienia  ───────────────────────── */

  /* Dopóki billing.js się nie odezwie, wielkość uznajemy za dostępną: dane już
     leżą na urządzeniu, a zasłonięcie ich na chwilę wyglądałoby jak usterka. */
  function unlocked(id) {
    const m = byId(id);
    if (!m || !m.premium) return true;
    if (!billing || typeof billing.isUnlocked !== 'function') return true;
    try {
      return billing.isUnlocked(id) !== false;
    } catch (err) {
      return true;
    }
  }

  /* ────────────────────────  Żetony wyboru wielkości  ─────────────────── */

  const chips = h('div.m5-chips', {
    aria: { role: 'group', label: 'Wybór mierzonej wielkości' }
  });

  CATALOGUE.forEach((m) => {
    const btn = h('button.m5-chip', {
      type: 'button',
      dataset: { metric: m.id },
      aria: { pressed: 'false' },
      on: { click: () => pickMetric(m.id) }
    }, icon(m.icon, { size: 16 }), h('span', { text: m.namePL }));
    chipButtons.set(m.id, btn);
    mount(chips, btn);
  });

  function syncChips() {
    chipButtons.forEach((btn, id) => {
      const m = byId(id);
      const locked = !unlocked(id);
      btn.setAttribute('aria-pressed', id === metric.id ? 'true' : 'false');
      if (locked) btn.dataset.locked = 'true';
      else delete btn.dataset.locked;
      // Kłódka jest drugim, niezależnym od koloru sygnałem blokady.
      const tail = btn.lastElementChild;
      const hasLock = !!(tail && tail.dataset && tail.dataset.lock === 'true');
      if (locked && !hasLock) {
        const lock = icon('lock', { size: 14 });
        lock.dataset.lock = 'true';
        btn.appendChild(lock);
      } else if (!locked && hasLock) {
        btn.removeChild(tail);
      }
      // Żeton odblokowany nie dostaje aria-label: nazwa stoi w widocznym
      // <span>, a powtórzenie jej atrybutem tylko odbiera przyszłym zmianom
      // (ikona, licznik) prawo do bycia przeczytanymi.
      if (locked) btn.setAttribute('aria-label', m.namePL + ', wielkość premium, zablokowana');
      else btn.removeAttribute('aria-label');
    });
  }

  async function pickMetric(id) {
    const next = byId(id);
    if (!next) return;
    if (!unlocked(id)) {
      haptic(8);
      await paywall(id);
      syncChips();
      if (!unlocked(id)) return;       // nadal zablokowana — zostajemy przy bieżącej
    }
    if (next.id === metric.id) return;
    metric = next;
    haptic(8);
    syncChips();
    syncStatsHead();
    if (chartApi) chartApi.setMetric(metric.id);
    // Wiersze sesji pokazują średnią wybranej wielkości, więc lista też jest
    // nieaktualna — podpis zawiera id wielkości i wymusi przebudowę.
    doRefresh();
    announce('Wielkość: ' + metric.namePL);
  }

  /* ────────────────────────  Przełącznik zakresu  ─────────────────────── */

  const seg = h('div.m5-seg.m5-seg--block', {
    aria: { role: 'radiogroup', label: 'Zakres czasu' },
    on: { keydown: onSegKey }
  });

  RANGES.forEach((r) => {
    const btn = h('button.m5-seg__item', {
      type: 'button',
      tabindex: '-1',
      dataset: { range: r.id },
      aria: { role: 'radio', checked: 'false', label: 'Ostatnie ' + r.labelPL },
      on: { click: () => pickRange(r.id) }
    }, r.labelPL);
    rangeButtons.set(r.id, btn);
    mount(seg, btn);
  });

  function syncRange() {
    rangeButtons.forEach((btn, id) => {
      const on = id === range.id;
      btn.setAttribute('aria-checked', on ? 'true' : 'false');
      // Roving tabindex: grupa radiowa zajmuje jeden przystanek Taba, a wyboru
      // dokonuje się strzałkami — tak zachowuje się natywny zestaw radiowy.
      btn.tabIndex = on ? 0 : -1;
    });
  }

  function pickRange(id) {
    const next = rangeById(id);
    if (!next || next.id === range.id) return;
    range = next;
    haptic(8);
    syncRange();
    syncStatsHead();
    // Zakres, w odróżnieniu od wielkości, jest ustawieniem trwałym — kontrakt
    // trzyma go w store.historyRange.
    setSettings({ historyRange: range.id });
    if (chartApi) chartApi.setRange(range.id);
    doRefresh();
  }

  function onSegKey(event) {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
    if (keys.indexOf(event.key) < 0) return;
    event.preventDefault();
    const ids = RANGES.map((r) => r.id);
    const at = ids.indexOf(range.id);
    let target = at;
    if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = ids.length - 1;
    else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = (at + 1) % ids.length;
    else target = (at - 1 + ids.length) % ids.length;
    pickRange(ids[target]);
    const btn = rangeButtons.get(ids[target]);
    if (btn) btn.focus();
  }

  /* ───────────────────────────────  Wykres  ──────────────────────────── */

  const chartHost = h('div.m5-history__chart');

  const controlsCard = h('section.m5-card',
    h('div.m5-card__body', {
      style: 'display:flex;flex-direction:column;gap:var(--sp-3)'
    }, chips, seg));

  const chartCard = h('section.m5-card',
    h('div.m5-card__body', chartHost));

  /* ─────────────────────────────  Statystyki  ────────────────────────── */

  function statCard(labelPL, withTrend) {
    const value = h('span.m5-stat__value.m5-num', { text: DASH });
    const unit = h('span.m5-stat__unit', { text: '', hidden: true });
    const zone = zoneTag('none');
    const trend = withTrend
      ? h('span.m5-stat__trend', { dataset: { trend: '0' }, text: TREND_LABEL['0'] })
      : null;
    const el = h('div.m5-stat', { dataset: { zone: 'none' } },
      h('span.m5-stat__label', { text: labelPL }),
      h('span.m5-stat__readout', value, unit),
      zone,
      trend);
    return { el: el, value: value, unit: unit, zone: zone, trend: trend };
  }

  const statMin = statCard('Minimum', false);
  const statAvg = statCard('Średnia', true);
  const statMax = statCard('Maksimum', false);

  const statsHead = h('p.m5-card__subtitle', { text: '' });
  const statsGrid = h('div.m5-history__stats', {
    // Poniżej ok. 8,5 rem etykieta wersalikowa zaczyna się łamać — tak każe
    // dobrać siatkę komentarz przy .m5-stat w components.css.
    style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(8.5rem,1fr));gap:var(--sp-3)'
  }, statMin.el, statAvg.el, statMax.el);

  const statsCard = h('section.m5-card',
    h('header.m5-card__head',
      h('h2.m5-card__title', { text: 'Statystyki zakresu' }),
      statsHead),
    h('div.m5-card__body', statsGrid,
      h('p.m5-row__desc', {
        style: 'display:block;margin-top:var(--sp-3)',
        text: 'Liczone z tego, co widać na wykresie. Czas bez pomiaru nie jest '
          + 'wliczany — nie zastępujemy go zerem.'
      })));

  function syncStatsHead() {
    statsHead.textContent = metric.namePL + NBSP + DASH + NBSP + 'ostatnie ' + range.labelPL;
  }

  function fillStat(target, value) {
    const zone = zoneOf(metric, value);
    const has = measured(value);
    target.value.textContent = metricValue(metric.id, value);
    target.unit.textContent = metric.unit;
    target.unit.hidden = !has;         // „— %” sugerowałoby pomiar, którego nie było
    target.el.dataset.zone = zone;
    target.zone.dataset.zone = zone;
    target.zone.textContent = ZONE_LABEL[zone];
  }

  function refreshStats() {
    const s = stats(metric.id, range.id);
    fillStat(statMin, s.min);
    fillStat(statAvg, s.avg);
    fillStat(statMax, s.max);
    const key = String(s.trend === 1 ? 1 : (s.trend === -1 ? -1 : 0));
    statAvg.trend.dataset.trend = key;
    // Kierunek zmiany nie jest sam w sobie oceną — przy wielkościach z `invert`
    // wzrost bywa poprawą, więc mówimy tylko, co dzieje się z liczbą.
    statAvg.trend.textContent = measured(s.avg) ? TREND_LABEL[key] : 'brak danych do porównania';
  }

  /* ───────────────────────────────  Sesje  ───────────────────────────── */

  const sessionsList = h('ul.m5-history__sessions', {
    style: 'margin:0;padding:0;list-style:none'
  });

  const sessionsCount = h('p.m5-card__subtitle', { text: '' });

  const sessionsCard = h('section.m5-card',
    h('header.m5-card__head',
      h('h2.m5-card__title', { text: 'Sesje pomiarowe' }),
      sessionsCount),
    h('div.m5-card__body.m5-card__body--flush', sessionsList));

  function sessionKey(session, index) {
    return session.id || ('s' + session.startedAt + '-' + index);
  }

  function sessionRow(session, index) {
    const key = sessionKey(session, index);
    const panelId = uid + '-sesja-' + index;
    const btnId = panelId + '-btn';
    const lengthMs = (session.endedAt || session.startedAt) - session.startedAt;
    const lead = session.avg ? session.avg[metric.id] : null;
    const open = openSessions.has(key);

    const details = h('div.m5-history__session-details', {
      id: panelId,
      hidden: !open,
      aria: { role: 'region', labelledby: btnId },
      style: 'padding-bottom:var(--sp-3)'
    });

    // Wielkości spod kłódki NIE trafiają do rozwinięcia: na ekranie pomiaru te
    // same kafelki są rozmyte, więc pokazanie tu średnich i zakresów byłoby
    // wyciekiem płatnego odczytu tylnymi drzwiami.
    const hiddenMetrics = CATALOGUE.filter((m) => !unlocked(m.id));

    CATALOGUE.filter((m) => unlocked(m.id)).forEach((m) => {
      const avg = session.avg ? session.avg[m.id] : null;
      const min = session.min ? session.min[m.id] : null;
      const max = session.max ? session.max[m.id] : null;
      const spread = (measured(min) && measured(max))
        ? metricValue(m.id, min) + NBSP + NDASH + NBSP + metricValue(m.id, max) + NBSP + m.unit
        : 'brak pomiaru';
      mount(details, h('div.m5-row',
        h('div.m5-row__main',
          h('span.m5-row__title', { text: m.namePL }),
          h('span.m5-row__desc', { text: 'zakres: ' + spread })),
        h('div.m5-row__control',
          h('span.m5-row__value.m5-num', {
            text: measured(avg) ? metricValue(m.id, avg) + NBSP + m.unit : DASH
          }),
          zoneTag(zoneOf(m, avg)))));
    });

    if (hiddenMetrics.length) {
      mount(details, h('div.m5-row',
        h('div.m5-row__main',
          h('span.m5-row__title', { text: 'Pozostałe wielkości należą do pakietu pełnego' }),
          h('span.m5-row__desc', { text: hiddenMetrics.map((m) => m.namePL).join(', ') })),
        h('div.m5-row__control',
          h('button.m5-btn.m5-btn--sm', {
            type: 'button',
            dataset: { tone: 'primary' },
            on: {
              click: async () => {
                await paywall(hiddenMetrics[0].id);
                if (!mounted) return;
                syncChips();
                sessionSignature = '';
                refreshSessions();
              }
            }
          }, 'Odblokuj'))));
    }

    const button = h('button.m5-row.m5-row--action', {
      id: btnId,
      type: 'button',
      style: 'width:100%;padding-inline:var(--sp-3)',
      aria: { expanded: open ? 'true' : 'false', controls: panelId },
      on: {
        click: (event) => {
          const next = !openSessions.has(key);
          if (next) openSessions.add(key);
          else openSessions.delete(key);
          details.hidden = !next;
          event.currentTarget.setAttribute('aria-expanded', next ? 'true' : 'false');
          haptic(6);
        }
      }
    },
    h('div.m5-row__main',
      h('span.m5-row__title', { text: dateTime(session.startedAt) }),
      h('span.m5-row__desc', {
        text: duration(lengthMs) + ' ' + MIDDOT + ' '
          + plural(session.samples || 0, 'próbka', 'próbki', 'próbek')
          + ' ' + MIDDOT + ' ' + relative(session.startedAt)
      })),
    h('div.m5-row__control',
      h('span.m5-row__value.m5-num', {
        text: measured(lead) ? metricValue(metric.id, lead) + NBSP + metric.unit : DASH
      }),
      zoneTag(zoneOf(metric, lead)),
      icon('chevronDown', { size: 20, class: 'm5-row__chevron' })));

    return h('li', { dataset: { session: key } }, button, details);
  }

  /* Podpis listy: liczba sesji, najnowsza sesja i bieżąca wielkość. Zmiana
     któregokolwiek z tych trzech naprawdę zmienia to, co widać w wierszach —
     przy pozostałych odświeżeniach DOM zostaje nietknięty. */
  function signatureOf(list) {
    const last = list.length ? list[0] : null;
    return list.length + '|' + (last ? last.startedAt + ':' + (last.endedAt || 0) : '0') + '|' + metric.id;
  }

  function refreshSessions() {
    const list = sessions();
    sessionsCount.textContent = list.length
      ? plural(list.length, 'sesja', 'sesje', 'sesji') + ', od najnowszej'
      : 'Jeszcze żadnej sesji';

    const signature = signatureOf(list);
    if (signature === sessionSignature) return;
    sessionSignature = signature;

    clearNode(sessionsList);
    if (!list.length) {
      mount(sessionsList, h('li',
        h('p.m5-row__desc', {
          style: 'display:block;padding:var(--sp-3) var(--sp-4) var(--sp-4)',
          text: 'Sesja zapisuje się po zatrzymaniu pomiaru.'
        })));
      return;
    }
    // Rozwinięcia sesji, których już nie ma, kasujemy — inaczej zbiór rósłby
    // przez cały czas życia ekranu.
    const alive = new Set(list.map(sessionKey));
    openSessions.forEach((key) => { if (!alive.has(key)) openSessions.delete(key); });
    list.forEach((s, i) => mount(sessionsList, sessionRow(s, i)));
  }

  /* ────────────────────────────────  Dane  ───────────────────────────── */

  const storageNote = h('p.m5-row__desc', {
    hidden: true,
    aria: { role: 'status' },
    style: 'display:flex;gap:var(--sp-2);align-items:flex-start;margin-bottom:var(--sp-3)'
  });

  function exportFile(kind) {
    try {
      if (kind === 'csv') {
        download('monitor-swiatla-' + fileStamp(Date.now()) + '.csv',
          exportCSV(), 'text/csv;charset=utf-8');
      } else {
        download('monitor-swiatla-' + fileStamp(Date.now()) + '.json',
          exportJSON(), 'application/json;charset=utf-8');
      }
      toast('Plik przygotowany do zapisu', { tone: 'success' });
    } catch (err) {
      // Zapis pliku potrafi odmówić w trybie prywatnym i w widoku osadzonym —
      // użytkownik ma się dowiedzieć, że nic nie powstało.
      toast(EXPORT_FAIL_PL, { tone: 'error' });
    }
  }

  const btnCsv = h('button.m5-btn.m5-btn--ghost', {
    type: 'button',
    dataset: { tone: 'ghost' },
    on: { click: () => exportFile('csv') }
  }, icon('download', { size: 18 }), 'Eksportuj CSV');

  const btnJson = h('button.m5-btn.m5-btn--ghost', {
    type: 'button',
    dataset: { tone: 'ghost' },
    on: { click: () => exportFile('json') }
  }, icon('download', { size: 18 }), 'Eksportuj JSON');

  const btnClear = h('button.m5-btn.m5-btn--danger', {
    type: 'button',
    dataset: { tone: 'danger' },
    on: { click: askClear }
  }, icon('trash', { size: 18 }), 'Wyczyść historię');

  const dataCard = h('section.m5-card',
    h('header.m5-card__head',
      h('h2.m5-card__title', { text: 'Dane' }),
      h('p.m5-card__subtitle', {
        text: 'Historia jest zapisana wyłącznie na tym urządzeniu.'
      })),
    h('div.m5-card__body', storageNote,
      h('div.m5-card__actions', {
        style: 'display:flex;flex-wrap:wrap;gap:var(--sp-2)'
      }, btnCsv, btnJson, btnClear)));

  async function askClear() {
    const sessionCount = sessions().length;
    const ok = await dialog({
      title: 'Wyczyścić historię?',
      // Liczba mówi wprost, co znika — „na pewno?" bez liczby jest pytaniem
      // o zgodę w ciemno.
      text: 'Usuniemy ' + plural(pointCount, 'pomiar', 'pomiary', 'pomiarów')
        + ' i ' + plural(sessionCount, 'sesję', 'sesje', 'sesji')
        + '. Tego nie da się cofnąć — jeśli chcesz zachować dane, najpierw je wyeksportuj.',
      confirmPL: 'Wyczyść',
      cancelPL: 'Anuluj',
      tone: 'danger'
    });
    if (!ok) return;
    clearHistory();
    pointCount = 0;
    openSessions.clear();
    sessionSignature = '';
    doRefresh();
    announce('Historia wyczyszczona.');
    toast('Historia wyczyszczona', { tone: 'success' });
  }

  function openExportSheet() {
    sheet({
      title: 'Eksport historii',
      body: h('p.m5-dialog__text', {
        text: 'CSV otwiera się w arkuszu kalkulacyjnym (średnik, przecinek dziesiętny). '
          + 'JSON zachowuje wszystko, łącznie z listą sesji i brakami pomiaru.'
      }),
      actions: [
        { labelPL: 'CSV', tone: 'primary', onClick: () => exportFile('csv') },
        { labelPL: 'JSON', tone: 'ghost', onClick: () => exportFile('json') },
        { labelPL: 'Anuluj', tone: 'quiet' }
      ]
    });
  }

  /* ─────────────────────────────  Stan pusty  ────────────────────────── */

  const empty = h('section.m5-card.m5-card--flat',
    h('div.m5-card__body',
      h('div.m5-empty',
        h('span.m5-empty__icon', icon('chart', { size: 28 })),
        h('p.m5-empty__title', { text: 'Nie ma jeszcze czego pokazać' }),
        h('p.m5-empty__text', {
          text: 'Historia zapełnia się w trakcie pomiaru — jeden punkt na sekundę. '
            + 'Wszystko zostaje na tym urządzeniu.'
        }),
        h('div.m5-empty__actions',
          h('button.m5-btn.m5-btn--primary.m5-btn--lg', {
            type: 'button',
            dataset: { tone: 'primary' },
            on: { click: goMeasure }
          }, icon('play', { size: 20 }), 'Przejdź do pomiaru')))));

  /* ──────────────────────────────  Korzeń  ───────────────────────────── */

  const el = h('div.m5-screen.m5-history', {
    style: 'display:flex;flex-direction:column;gap:var(--sp-4)'
  }, empty, controlsCard, chartCard, statsCard, sessionsCard, dataCard);

  /* ───────────────────────  Odświeżanie (dławione)  ──────────────────── */

  function setEmptyState(isEmpty) {
    empty.hidden = !isEmpty;
    // Przy pustej historii nie ma czego wybierać, rysować ani eksportować —
    // pokazujemy jedno wyjście zamiast pięciu martwych kart.
    controlsCard.hidden = isEmpty;
    chartCard.hidden = isEmpty;
    statsCard.hidden = isEmpty;
    sessionsCard.hidden = isEmpty;
    dataCard.hidden = isEmpty;
  }

  function refreshStorageNote() {
    const state = storage();
    if (state === 'ok') { storageNote.hidden = true; return; }
    const text = storageMessage || (state === 'full'
      ? 'Pamięć urządzenia jest pełna — nowe pomiary nie są już zapisywane.'
      : 'Przeglądarka nie pozwala zapisać historii — dane znikną po zamknięciu karty.');
    clearNode(storageNote);
    mount(storageNote, icon('alert', { size: 18 }), h('span', { text: text }));
    storageNote.hidden = false;
  }

  function doRefresh() {
    if (refreshTimer !== null) { clearTimeout(refreshTimer); refreshTimer = null; }
    lastRefreshAt = Date.now();

    const sessionCount = sessions().length;
    setEmptyState(pointCount === 0 && sessionCount === 0);

    const noPoints = pointCount === 0;
    btnCsv.disabled = noPoints;
    btnJson.disabled = noPoints;
    btnClear.disabled = noPoints && sessionCount === 0;

    refreshStorageNote();
    refreshStats();
    refreshSessions();
    if (chartApi) chartApi.refresh();
  }

  function scheduleRefresh() {
    if (!mounted || refreshTimer !== null) return;
    const wait = Math.max(0, REFRESH_EVERY_MS - (Date.now() - lastRefreshAt));
    refreshTimer = setTimeout(() => { refreshTimer = null; doRefresh(); }, wait);
  }

  /* ─────────────────────────────  Cykl życia  ────────────────────────── */

  function loadBilling() {
    // billing.js wczytujemy dynamicznie: gdy modułu nie ma (albo się wywrócił),
    // historia ma nadal działać — po prostu bez kłódek.
    import('../billing.js').then((mod) => {
      billing = mod;
      // Moduł potrafi się rozwiązać już po zejściu z ekranu: subskrypcje są
      // wtedy zdjęte, a wykres zniszczony — przestawianie wielkości i odświeżanie
      // odłączonego drzewa zmieniłoby tylko wybór, z którym użytkownik wyszedł.
      if (!mounted) return;
      syncChips();
      if (unlocked(metric.id)) return;
      const free = CATALOGUE.find((m) => unlocked(m.id)) || CATALOGUE[0];
      metric = free;
      syncChips();
      syncStatsHead();
      if (chartApi) chartApi.setMetric(metric.id);
      doRefresh();
    }).catch(() => { billing = null; });
  }

  function mountScreen() {
    if (mounted) return;
    mounted = true;

    pointCount = all().length;         // jedyny pełny odczyt bufora; dalej licznik idzie ze zdarzeń
    chartApi = chart({ metricId: metric.id, rangeId: range.id, height: 240 });
    mount(chartHost, chartApi.el);

    syncChips();
    syncRange();
    syncStatsHead();
    loadBilling();

    offs.push(bus.on('history:changed', (payload) => {
      if (payload && typeof payload.count === 'number') pointCount = payload.count;
      storageMessage = (payload && payload.messagePL) || '';
      scheduleRefresh();
    }));
    // Zamknięta sesja to zdarzenie rzadkie i widoczne — na nie odświeżamy od razu.
    offs.push(bus.on('history:session', () => doRefresh()));
    // Zmiana uprawnienia zmienia zawartość rozwinięć sesji, a nie ich podpis —
    // dlatego kasujemy sygnaturę, żeby lista naprawdę się przebudowała.
    offs.push(bus.on('billing:changed', () => {
      syncChips();
      sessionSignature = '';
      doRefresh();
    }));
    offs.push(bus.on('settings:changed', (payload) => {
      // Zakres mógł zmienić się poza tym ekranem (np. po przywróceniu ustawień).
      const next = payload && payload.settings ? rangeById(payload.settings.historyRange) : null;
      if (!next || next.id === range.id) return;
      range = next;
      syncRange();
      syncStatsHead();
      if (chartApi) chartApi.setRange(range.id);
      doRefresh();
    }));

    doRefresh();
  }

  function unmountScreen() {
    if (!mounted) return;
    mounted = false;
    if (refreshTimer !== null) { clearTimeout(refreshTimer); refreshTimer = null; }
    while (offs.length) {
      const off = offs.pop();
      if (typeof off === 'function') off();
    }
    // destroy() usuwa element wykresu z DOM — przy powrocie na ekran budujemy go
    // od nowa, dzięki czemu ResizeObserver i nasłuchy nie zostają w tle.
    if (chartApi) { chartApi.destroy(); chartApi = null; }
    clearNode(chartHost);
    sessionSignature = '';             // lista przy powrocie ma się złożyć na nowo
  }

  return {
    el: el,
    titlePL: 'Historia',
    actions: () => ([
      { icon: 'download', labelPL: 'Eksportuj historię', onClick: openExportSheet }
    ]),
    mount: mountScreen,
    unmount: unmountScreen
  };
}
