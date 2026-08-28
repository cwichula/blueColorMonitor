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
import { toast, dialog, sheet } from '../ui/overlays.js';
import { chart } from '../ui/chart.js';
import {
  RANGES, stats, sessions, all, clear as clearHistory,
  exportCSV, exportJSON, storage
} from '../history.js';
import { CATALOGUE, byId, zoneFor } from '../metrics.js';
import { metricValue, dateTime, duration, plural, relative, zoneLabel } from '../format.js';
import { get as getSettings, set as setSettings, thresholdsFor } from '../store.js';
import { t } from '../i18n/index.js';
import { bus } from '../bus.js';

const DASH = '—';
const NDASH = '–';
const NBSP = ' ';

/* Historia dopisuje punkt raz na sekundę, a odświeżenie to przeliczenie serii
   plus pełne przerysowanie canvasa. Dwie sekundy to próg, poniżej którego
   człowiek i tak nie zauważy różnicy, a bateria już tak. */
const REFRESH_EVERY_MS = 2000;

/* Kierunek zmiany opisujemy słowem, nie samą strzałką. Funkcja, a nie stała:
   stała zamarzłaby w języku aktywnym przy wczytaniu modułu, a moduł wczytuje
   się raz na całe uruchomienie aplikacji. */
function trendLabel(trendKey) {
  if (trendKey === '1') return t('history.trend.up');
  if (trendKey === '-1') return t('history.trend.down');
  return t('history.trend.flat');
}

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
  const limits = thresholdsFor(metric.id) || { warn: metric.warn, crit: metric.crit };
  return zoneFor(value, limits.warn, limits.crit, metric.invert) || 'none';
}

/* Znacznik strefy: barwa nigdy nie stoi sama, obok idzie słowo i kształt
   z components.css. */
function zoneTag(zone) {
  return h('span.m5-zone', { dataset: { zone: zone } }, zoneLabel(zone));
}

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
  const openSessions = new Set();      // rozwinięcia przeżywają przebudowę listy
  const chipButtons = new Map();
  const chipLabels = new Map();
  const rangeButtons = new Map();
  const offs = [];

  /* ────────────────────────  Żetony wyboru wielkości  ─────────────────── */

  const chips = h('div.m5-chips', { aria: { role: 'group' } });

  CATALOGUE.forEach((m) => {
    // Nazwa wielkości stoi we własnym <span>, żeby po zmianie języka dało się
    // podmienić sam napis, bez ruszania ikony.
    const label = h('span');
    const btn = h('button.m5-chip', {
      type: 'button',
      dataset: { metric: m.id },
      aria: { pressed: 'false' },
      on: { click: () => pickMetric(m.id) }
    }, icon(m.icon, { size: 16 }), label);
    chipButtons.set(m.id, btn);
    chipLabels.set(m.id, label);
    mount(chips, btn);
  });

  /* Żeton nie dostaje aria-label: nazwa stoi w widocznym <span>, a powtórzenie
     jej atrybutem odbiera przyszłym zmianom (ikona, licznik) prawo do bycia
     przeczytanymi. Zostaje więc sam stan wciśnięcia. */
  function syncChips() {
    chipButtons.forEach((btn, id) => {
      btn.setAttribute('aria-pressed', id === metric.id ? 'true' : 'false');
    });
  }

  function pickMetric(id) {
    const next = byId(id);
    if (!next) return;
    if (next.id === metric.id) return;
    metric = next;
    haptic(8);
    syncChips();
    syncStatsHead();
    if (chartApi) chartApi.setMetric(metric.id);
    // Wiersze sesji pokazują średnią wybranej wielkości, więc lista też jest
    // nieaktualna — podpis zawiera id wielkości i wymusi przebudowę.
    doRefresh();
    announce(t('history.announce.metric', { metric: t('metric.' + metric.id + '.name') }));
  }

  /* ────────────────────────  Przełącznik zakresu  ─────────────────────── */

  const seg = h('div.m5-seg.m5-seg--block', {
    aria: { role: 'radiogroup' },
    on: { keydown: onSegKey }
  });

  RANGES.forEach((r) => {
    // Etykieta zakresu jest treścią słownika (t('range.' + id)), a nie polem
    // rekordu w history.js — inaczej lista zakresów mówiłaby jednym językiem.
    const btn = h('button.m5-seg__item', {
      type: 'button',
      tabindex: '-1',
      dataset: { range: r.id },
      aria: { role: 'radio', checked: 'false' },
      on: { click: () => pickRange(r.id) }
    });
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

  function statCard(withTrend) {
    const value = h('span.m5-stat__value.m5-num', { text: DASH });
    const unit = h('span.m5-stat__unit', { text: '', hidden: true });
    const zone = zoneTag('none');
    const trend = withTrend
      ? h('span.m5-stat__trend', { dataset: { trend: '0' } })
      : null;
    const label = h('span.m5-stat__label');
    const el = h('div.m5-stat', { dataset: { zone: 'none' } },
      label,
      h('span.m5-stat__readout', value, unit),
      zone,
      trend);
    return { el: el, label: label, value: value, unit: unit, zone: zone, trend: trend };
  }

  const statMin = statCard(false);
  const statAvg = statCard(true);
  const statMax = statCard(false);

  const statsHead = h('p.m5-card__subtitle', { text: '' });
  const statsGrid = h('div.m5-history__stats', {
    // Poniżej ok. 8,5 rem etykieta wersalikowa zaczyna się łamać — tak każe
    // dobrać siatkę komentarz przy .m5-stat w components.css.
    style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(8.5rem,1fr));gap:var(--sp-3)'
  }, statMin.el, statAvg.el, statMax.el);

  const statsTitle = h('h2.m5-card__title');
  const statsNote = h('p.m5-row__desc', { style: 'display:block;margin-top:var(--sp-3)' });

  const statsCard = h('section.m5-card',
    h('header.m5-card__head', statsTitle, statsHead),
    h('div.m5-card__body', statsGrid, statsNote));

  /* Cały podpis jest jednym wzorcem ze wstawkami: myślnik, spacje nierozdzielne
     i szyk „wielkość — zakres” należą do języka, nie do kodu. */
  function syncStatsHead() {
    statsHead.textContent = t('history.stats.head', {
      metric: t('metric.' + metric.id + '.name'),
      range: t('range.' + range.id)
    });
  }

  function fillStat(target, value) {
    const zone = zoneOf(metric, value);
    const has = measured(value);
    target.value.textContent = metricValue(metric.id, value);
    target.unit.textContent = metric.unit;
    target.unit.hidden = !has;         // „— %” sugerowałoby pomiar, którego nie było
    target.el.dataset.zone = zone;
    target.zone.dataset.zone = zone;
    target.zone.textContent = zoneLabel(zone);
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
    statAvg.trend.textContent = measured(s.avg) ? trendLabel(key) : t('history.trend.none');
  }

  /* ───────────────────────────────  Sesje  ───────────────────────────── */

  const sessionsList = h('ul.m5-history__sessions', {
    style: 'margin:0;padding:0;list-style:none'
  });

  const sessionsCount = h('p.m5-card__subtitle', { text: '' });

  const sessionsTitle = h('h2.m5-card__title');

  const sessionsCard = h('section.m5-card',
    h('header.m5-card__head', sessionsTitle, sessionsCount),
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

    // Rozwinięcie pokazuje komplet siedmiu wielkości — dokładnie ten sam, który
    // sesja zebrała i który stoi w eksporcie.
    CATALOGUE.forEach((m) => {
      const avg = session.avg ? session.avg[m.id] : null;
      const min = session.min ? session.min[m.id] : null;
      const max = session.max ? session.max[m.id] : null;
      const spread = (measured(min) && measured(max))
        ? metricValue(m.id, min) + NBSP + NDASH + NBSP + metricValue(m.id, max) + NBSP + m.unit
        : t('history.session.noMeasure');
      mount(details, h('div.m5-row',
        h('div.m5-row__main',
          h('span.m5-row__title', { text: t('metric.' + m.id + '.name') }),
          h('span.m5-row__desc', { text: t('history.session.spread', { range: spread }) })),
        h('div.m5-row__control',
          h('span.m5-row__value.m5-num', {
            text: measured(avg) ? metricValue(m.id, avg) + NBSP + m.unit : DASH
          }),
          zoneTag(zoneOf(m, avg)))));
    });

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
        text: t('history.session.desc', {
          duration: duration(lengthMs),
          samples: plural(session.samples || 0, 'unit.sample.plural'),
          relative: relative(session.startedAt)
        })
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
      ? t('history.sessions.count', { sessions: plural(list.length, 'unit.session.plural') })
      : t('history.sessions.empty');

    const signature = signatureOf(list);
    if (signature === sessionSignature) return;
    sessionSignature = signature;

    clearNode(sessionsList);
    if (!list.length) {
      mount(sessionsList, h('li',
        h('p.m5-row__desc', {
          style: 'display:block;padding:var(--sp-3) var(--sp-4) var(--sp-4)',
          text: t('history.sessions.hint')
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
      toast(t('history.export.ok'), { tone: 'success' });
    } catch (err) {
      // Zapis pliku potrafi odmówić w trybie prywatnym i w widoku osadzonym —
      // użytkownik ma się dowiedzieć, że nic nie powstało. Ten sam klucz co w
      // ekranie Narzędzia: ta sama porażka ma brzmieć tak samo.
      toast(t('history.export.fail'), { tone: 'error' });
    }
  }

  /* Napisy przycisków z ikoną trzymamy w osobnych węzłach tekstowych — zmiana
     języka podmienia sam tekst, rysunek zostaje na miejscu. */
  const btnCsvLabel = document.createTextNode('');
  const btnCsv = h('button.m5-btn.m5-btn--ghost', {
    type: 'button',
    dataset: { tone: 'ghost' },
    on: { click: () => exportFile('csv') }
  }, icon('download', { size: 18 }), btnCsvLabel);

  const btnJsonLabel = document.createTextNode('');
  const btnJson = h('button.m5-btn.m5-btn--ghost', {
    type: 'button',
    dataset: { tone: 'ghost' },
    on: { click: () => exportFile('json') }
  }, icon('download', { size: 18 }), btnJsonLabel);

  const btnClearLabel = document.createTextNode('');
  const btnClear = h('button.m5-btn.m5-btn--danger', {
    type: 'button',
    dataset: { tone: 'danger' },
    on: { click: askClear }
  }, icon('trash', { size: 18 }), btnClearLabel);

  const dataTitle = h('h2.m5-card__title');
  const dataSubtitle = h('p.m5-card__subtitle');

  const dataCard = h('section.m5-card',
    h('header.m5-card__head', dataTitle, dataSubtitle),
    h('div.m5-card__body', storageNote,
      h('div.m5-card__actions', {
        style: 'display:flex;flex-wrap:wrap;gap:var(--sp-2)'
      }, btnCsv, btnJson, btnClear)));

  async function askClear() {
    const sessionCount = sessions().length;
    const ok = await dialog({
      title: t('history.clear.title'),
      // Liczba mówi wprost, co znika — „na pewno?" bez liczby jest pytaniem
      // o zgodę w ciemno. Obie liczby wchodzą wstawkami: policzalniki odmienia
      // Intl.PluralRules aktywnego języka, a szyk zdania należy do tłumaczenia.
      text: t('history.clear.text', {
        points: plural(pointCount, 'unit.measurement.plural'),
        sessions: plural(sessionCount, 'unit.session.accusative.plural')
      }),
      confirmPL: t('history.clear.confirm'),
      cancelPL: t('common.cancel'),
      tone: 'danger'
    });
    if (!ok) return;
    clearHistory();
    pointCount = 0;
    openSessions.clear();
    sessionSignature = '';
    doRefresh();
    announce(t('history.clear.announce'));
    toast(t('history.clear.toast'), { tone: 'success' });
  }

  function openExportSheet() {
    sheet({
      title: t('history.export.sheet.title'),
      body: h('p.m5-dialog__text', { text: t('history.export.sheet.text') }),
      // labelPL jako FUNKCJA: overlays.js woła ją ponownie po zmianie języka,
      // więc napisy nadążają nawet przy otwartym arkuszu.
      actions: [
        { labelPL: () => t('history.export.sheet.csv'), tone: 'primary', onClick: () => exportFile('csv') },
        { labelPL: () => t('history.export.sheet.json'), tone: 'ghost', onClick: () => exportFile('json') },
        { labelPL: () => t('common.cancel'), tone: 'quiet' }
      ]
    });
  }

  /* ─────────────────────────────  Stan pusty  ────────────────────────── */

  const emptyTitle = h('p.m5-empty__title');
  const emptyText = h('p.m5-empty__text');
  const emptyActionLabel = document.createTextNode('');

  const empty = h('section.m5-card.m5-card--flat',
    h('div.m5-card__body',
      h('div.m5-empty',
        h('span.m5-empty__icon', icon('chart', { size: 28 })),
        emptyTitle,
        emptyText,
        h('div.m5-empty__actions',
          h('button.m5-btn.m5-btn--primary.m5-btn--lg', {
            type: 'button',
            dataset: { tone: 'primary' },
            on: { click: goMeasure }
          }, icon('play', { size: 20 }), emptyActionLabel)))));

  /* ──────────────────────────────  Korzeń  ───────────────────────────── */

  const el = h('div.m5-screen.m5-history', {
    style: 'display:flex;flex-direction:column;gap:var(--sp-4)'
  }, empty, controlsCard, chartCard, statsCard, sessionsCard, dataCard);

  /* ──────────────────────────────  Napisy  ───────────────────────────────── */

  /* WSZYSTKIE napisy tego ekranu powstają tutaj — raz przy złożeniu widoku i
   * ponownie po każdej zmianie języka. Gdyby stały w wywołaniach h(), zamarzłyby
   * w języku aktywnym w chwili budowy: app.js tworzy instancję ekranu RAZ i
   * trzyma ją do końca działania aplikacji, więc drugiej okazji by nie było. */
  function applyText() {
    chips.setAttribute('aria-label', t('history.metricGroup.aria'));
    chipLabels.forEach((label, id) => { label.textContent = t('metric.' + id + '.name'); });

    seg.setAttribute('aria-label', t('history.rangeGroup.aria'));
    rangeButtons.forEach((btn, id) => {
      const name = t('range.' + id);
      btn.textContent = name;
      btn.setAttribute('aria-label', t('history.range.aria', { range: name }));
    });

    statsTitle.textContent = t('history.stats.title');
    statsNote.textContent = t('history.stats.note');
    statMin.label.textContent = t('history.stat.min');
    statAvg.label.textContent = t('history.stat.avg');
    statMax.label.textContent = t('history.stat.max');

    sessionsTitle.textContent = t('history.sessions.title');

    dataTitle.textContent = t('history.data.title');
    dataSubtitle.textContent = t('history.data.subtitle');
    btnCsvLabel.nodeValue = t('history.export.csv');
    btnJsonLabel.nodeValue = t('history.export.json');
    btnClearLabel.nodeValue = t('history.clear');

    emptyTitle.textContent = t('history.empty.title');
    emptyText.textContent = t('history.empty.text');
    emptyActionLabel.nodeValue = t('history.empty.action');

    syncStatsHead();
    // Wiersze sesji i kafelki statystyk niosą napisy w środku, więc muszą
    // powstać od nowa; podpis listy zerujemy, żeby refreshSessions() nie uznał
    // jej za niezmienioną i naprawdę ją przebudował.
    sessionSignature = '';
    refreshStorageNote();
    refreshStats();
    refreshSessions();
  }

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
    // Napis bierzemy ze STANU pamięci, a nie z komunikatu przyniesionego przez
    // szynę: gotowe zdanie zamarzłoby w języku sprzed przełączenia.
    const text = state === 'full' ? t('storage.full') : t('storage.blocked');
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

  function mountScreen() {
    if (mounted) return;
    mounted = true;

    pointCount = all().length;         // jedyny pełny odczyt bufora; dalej licznik idzie ze zdarzeń
    chartApi = chart({ metricId: metric.id, rangeId: range.id, height: 240 });
    mount(chartHost, chartApi.el);

    syncChips();
    syncRange();
    syncStatsHead();

    offs.push(bus.on('history:changed', (payload) => {
      if (payload && typeof payload.count === 'number') pointCount = payload.count;
      scheduleRefresh();
    }));
    // Zamknięta sesja to zdarzenie rzadkie i widoczne — na nie odświeżamy od razu.
    offs.push(bus.on('history:session', () => doRefresh()));
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

  /* Napisy wpisujemy dopiero teraz i odtwarzamy przy każdej zmianie języka
   * (zdarzenie z kontraktu §4). Nasłuchu nie zdejmujemy nigdzie: instancja
   * ekranu żyje tyle, co aplikacja, więc nie ma czego odsubskrybować. */
  applyText();
  bus.on('i18n:changed', applyText);

  // Ekran podaje KLUCZE, nie gotowe napisy: app.js rozwija je przez t() przy
  // każdym wejściu i po zmianie języka.
  return {
    el: el,
    titleKey: 'history.title',
    actions: () => ([
      { icon: 'download', labelKey: 'history.action.export', onClick: openExportSheet }
    ]),
    mount: mountScreen,
    unmount: unmountScreen
  };
}
