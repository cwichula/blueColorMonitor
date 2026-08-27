/* =====================================================================
   features.js — warstwa funkcji analitycznych aplikacji.

   Wszystko, co ten plik buduje, jest dostępne dla każdego, od razu i bez
   warunków: historia długoterminowa, raport dzienny i tygodniowy, profile
   progów, eksport CSV, alert progowy i podsumowanie sesji. Nie ma tu
   żadnego sprawdzania uprawnień, bo nie ma czego sprawdzać — aplikacja
   nie dzieli funkcji na darmowe i płatne.

   Podział odpowiedzialności:
   - app.js  — pomiar, wykresy, progi, bufor historii (publikuje AppData),
   - menu.js — nawigacja i ekrany „Więcej” / „O aplikacji”,
   - features.js — to, co czyta i podsumowuje dane pomiarowe,
   - support.js  — ekran „Wsparcie”.

   Ten plik nigdy nie opóźnia ani nie zatrzymuje pomiaru. Alerty i
   podsumowania tylko nasłuchują.
   ===================================================================== */
(function () {
  'use strict';

  var HOUR_MS = 60 * 60 * 1000;
  var DAY_MS = 24 * HOUR_MS;

  var PROFILES_KEY = 'blueMonitor.profiles.v1';
  var PROFILES_MAX = 5;

  // Klucze po nieistniejącej już warstwie sprzedażowej. Kasujemy je raz, przy
  // starcie, żeby nie zostawiać po sobie śmieci w pamięci przeglądarki.
  // Kluczy z pomiarami, historią, progami i profilami nie ruszamy.
  var OBSOLETE_KEYS = [
    'blueMonitor.billing.v1',
    'blueMonitor.account.v1',
    'blueMonitor.promo.v1',
    'blueMonitor.ads.v1',
    'blueMonitor.onboarding.v1'
  ];

  var ALERT_EXPOSURE_MS = 5 * 60 * 1000;   // ciągły czas w strefie szkodliwej przed alertem
  var ALERT_COOLDOWN_MS = 15 * 60 * 1000;  // nigdy nie męczymy: najwyżej jeden alert na kwadrans

  var MONTHS_PL = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
    'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];

  var ZONE_LABEL = { good: 'BEZPIECZNA', warning: 'UMIARKOWANA', critical: 'SZKODLIWA' };
  var ZONE_LABEL_LONG = { good: 'Bezpieczna', warning: 'Umiarkowana', critical: 'Szkodliwa' };

  /* ---------------------------------------------------------------------
     Drobne pomocniki DOM
     --------------------------------------------------------------------- */

  function byId(id) { return document.getElementById(id); }

  function clear(node) { while (node && node.firstChild) node.removeChild(node.firstChild); }

  function append(parent, child) {
    if (child === null || child === undefined) return;
    if (Array.isArray(child)) { child.forEach(function (c) { append(parent, c); }); return; }
    if (typeof child === 'string') { parent.appendChild(document.createTextNode(child)); return; }
    parent.appendChild(child);
  }

  // h('button', { class: 'btn', text: 'OK', onclick: fn }, [dzieci])
  function h(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        var value = attrs[key];
        if (value === null || value === undefined || value === false) return;
        if (key === 'class') { node.className = value; return; }
        if (key === 'text') { node.textContent = value; return; }
        if (key === 'html') { node.innerHTML = value; return; }
        if (key === 'onclick') { node.addEventListener('click', value); return; }
        if (key === 'oninput') { node.addEventListener('input', value); return; }
        if (value === true) { node.setAttribute(key, ''); return; }
        node.setAttribute(key, String(value));
      });
    }
    append(node, children);
    return node;
  }

  function focusLater(node) {
    if (!node) return;
    requestAnimationFrame(function () { try { node.focus(); } catch (_) { /* odpięty z DOM */ } });
  }

  function prefersReducedMotion() {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (_) { return false; }
  }

  // Polski ma trzy formy liczebnika. Czytniki ekranu wymawiają te napisy, więc
  // „1 dni” albo „2 odczyt” to nie literówka, którą użytkownik może pominąć.
  function pluralPL(n, one, few, many) {
    var count = Math.abs(Number(n) || 0);
    var m10 = count % 10;
    var m100 = count % 100;
    if (count === 1) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
    return many;
  }
  function readingsWordPL(n) { return n + ' ' + pluralPL(n, 'odczyt', 'odczyty', 'odczytów'); }
  function minutesWordPL(n) { return n + ' ' + pluralPL(n, 'minuty', 'minut', 'minut'); }
  function pointsWordPL(n) {
    return n + ' ' + pluralPL(n, 'punkt procentowy', 'punkty procentowe', 'punktów procentowych');
  }

  function sectionTitle(textPL) {
    return h('h3', { class: 'ui-section-title', text: textPL });
  }

  function announce(regionId, message) {
    var region = byId(regionId);
    if (!region) return;
    // Ponowne ustawienie tego samego tekstu nie jest odczytywane, więc najpierw czyścimy.
    region.textContent = '';
    window.setTimeout(function () { region.textContent = message; }, 60);
  }

  /* ---------------------------------------------------------------------
     Pamięć lokalna należąca do tego pliku (profile progów)
     --------------------------------------------------------------------- */

  function readJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : fallback;
    } catch (_) { return fallback; }
  }

  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (_) { return false; }
  }

  function dropObsoleteKeys() {
    for (var i = 0; i < OBSOLETE_KEYS.length; i++) {
      try { localStorage.removeItem(OBSOLETE_KEYS[i]); } catch (_) { /* pamięć niedostępna */ }
    }
  }

  /* ---------------------------------------------------------------------
     Powiadomienia (toasty)
     --------------------------------------------------------------------- */

  function toastRegion() {
    var region = byId('uiToastRegion');
    if (!region) {
      region = h('div', { id: 'uiToastRegion', class: 'ui-toast-region', role: 'status', 'aria-live': 'polite' });
      document.body.appendChild(region);
    }
    return region;
  }

  function toast(messagePL, opts) {
    opts = opts || {};
    var type = opts.type || 'info';
    var region = toastRegion();
    region.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
    var duration = opts.durationMs || (type === 'error' ? 8000 : 5000);
    var node = h('div', { class: 'ui-toast ui-toast-' + type }, [
      h('span', { class: 'ui-grow', text: messagePL })
    ]);
    var removeNode = function () {
      if (node.parentNode) node.parentNode.removeChild(node);
    };
    // Toast siedzi nad dolnym paskiem i przez cały czas życia łapie dotknięcia,
    // więc zawsze potrzebuje prawdziwego wyjścia — nie tylko licznika czasu.
    node.appendChild(h('button', {
      type: 'button', class: 'ui-toast-close', text: '✕',
      'aria-label': 'Zamknij powiadomienie', onclick: removeNode
    }));
    region.appendChild(node);
    window.setTimeout(removeNode, duration);
  }

  /* ---------------------------------------------------------------------
     Dostęp do danych pomiarowych
     --------------------------------------------------------------------- */

  function appData() {
    return (window.AppData && typeof window.AppData.getHistoryLong === 'function') ? window.AppData : null;
  }

  function summarizeZones(points) {
    var counts = { good: 0, warning: 0, critical: 0 };
    var total = 0;
    points.forEach(function (p) {
      if (counts[p.zoneShare] !== undefined) { counts[p.zoneShare] += 1; total += 1; }
    });
    return { counts: counts, total: total };
  }

  function percentOf(part, total) { return total ? Math.round((part / total) * 100) : 0; }

  /* ---------------------------------------------------------------------
     Historia i raport
     --------------------------------------------------------------------- */

  var historyRangeMs = HOUR_MS;
  var lastSessionSummary = null;

  function renderHistoryPanel() {
    var container = byId('historyPanel');
    if (!container) return;
    var data = appData();
    // Ten panel jest przebudowywany od zera przy każdej zmianie zakresu, więc
    // element, który miał fokus, trzeba odnaleźć po id — inaczej użytkownik
    // klawiatury po każdym kliknięciu lądowałby z powrotem na <body>.
    var focusedId = (document.activeElement && document.activeElement.id) || null;
    clear(container);

    var panel = h('section', { class: 'card' });
    panel.appendChild(sectionTitle('Historia i raport'));
    if (lastSessionSummary) panel.appendChild(buildSessionSummaryCard());

    var ranges = [
      { id: 'histRange1h', labelPL: '1 h', ms: HOUR_MS },
      { id: 'histRange24h', labelPL: '24 h', ms: DAY_MS },
      { id: 'histRange7d', labelPL: '7 dni', ms: 7 * DAY_MS },
      { id: 'histRange30d', labelPL: '30 dni', ms: 30 * DAY_MS }
    ];
    var group = h('div', { class: 'ui-row', role: 'group', 'aria-label': 'Zakres historii' });
    ranges.forEach(function (range) {
      group.appendChild(h('button', {
        id: range.id, type: 'button', class: 'btn', text: range.labelPL,
        'aria-pressed': String(historyRangeMs === range.ms),
        onclick: function () { historyRangeMs = range.ms; renderHistoryPanel(); }
      }));
    });
    panel.appendChild(group);

    var summaryBox = h('div', { class: 'ui-stack', 'aria-live': 'polite' });
    var points = [];
    if (!data) {
      summaryBox.appendChild(h('p', { class: 'ui-muted', text: 'Dane historii są chwilowo niedostępne.' }));
    } else {
      try { points = data.getHistoryLong({ sinceMs: Date.now() - historyRangeMs }) || []; } catch (_) { points = []; }
      var summary = summarizeZones(points);
      if (!summary.total) {
        summaryBox.appendChild(h('p', {
          class: 'ui-muted',
          text: 'Brak zapisanych odczytów w tym zakresie. Uruchom pomiar — historia zbiera się automatycznie.'
        }));
      } else {
        summaryBox.appendChild(h('p', {
          text: 'Zapisane odczyty: ' + summary.total + '. Podział czasu według stref:'
        }));
        ['good', 'warning', 'critical'].forEach(function (zone) {
          summaryBox.appendChild(h('p', {
            text: ZONE_LABEL_LONG[zone] + ': ' + percentOf(summary.counts[zone], summary.total) +
              '% (' + readingsWordPL(summary.counts[zone]) + ')'
          }));
        });
      }
    }
    panel.appendChild(summaryBox);
    if (data) panel.appendChild(buildReport(points));

    container.appendChild(panel);
    if (focusedId && byId(focusedId)) focusLater(byId(focusedId));
  }

  function dayKeyOf(ts) {
    var d = new Date(ts);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    return d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
  }

  function dayLabelOf(ts) {
    var d = new Date(ts);
    return d.getDate() + ' ' + MONTHS_PL[d.getMonth()];
  }

  function zoneTable(id, captionPL, firstColPL, rows) {
    return h('div', { id: id + 'Wrap', class: 'ui-table-wrap' }, h('table', { id: id, class: 'ui-table' }, [
      h('caption', { text: captionPL }),
      h('thead', {}, h('tr', {}, [
        h('th', { scope: 'col', text: firstColPL }),
        h('th', { scope: 'col', text: 'Bezpieczna' }),
        h('th', { scope: 'col', text: 'Umiarkowana' }),
        h('th', { scope: 'col', text: 'Szkodliwa' }),
        h('th', { scope: 'col', text: 'Odczyty' })
      ])),
      h('tbody', {}, rows.map(function (row) {
        return h('tr', {}, [
          h('th', { scope: 'row', class: 'ui-table-rowhead', text: row.labelPL }),
          h('td', { class: 'ui-table-val', text: percentOf(row.good, row.total) + '%' }),
          h('td', { class: 'ui-table-val', text: percentOf(row.warning, row.total) + '%' }),
          h('td', { class: 'ui-table-val', text: percentOf(row.critical, row.total) + '%' }),
          h('td', { class: 'ui-table-val', text: String(row.total) })
        ]);
      }))
    ]));
  }

  // Raport dzienny i godzinowy. Grupuje bufor długoterminowy po dniach
  // kalendarzowych i po godzinie doby, a różnicę dzień do dnia wypisuje
  // słowami — sama tabela liczb jest trudna do odczytania dla odbiorców,
  // dla których ta aplikacja powstała.
  function buildReport(points) {
    var box = h('div', { class: 'ui-stack' });
    box.appendChild(sectionTitle('Raport dzienny'));
    if (!points.length) {
      box.appendChild(h('p', {
        class: 'ui-muted',
        text: 'Raport pojawi się, gdy w wybranym zakresie będą zapisane odczyty.'
      }));
      return box;
    }

    var days = [];
    var byDay = {};
    var byHour = {};
    points.forEach(function (point) {
      var key = dayKeyOf(point.t);
      if (!byDay[key]) {
        byDay[key] = { key: key, labelPL: dayLabelOf(point.t), total: 0, good: 0, warning: 0, critical: 0 };
        days.push(byDay[key]);
      }
      var day = byDay[key];
      day.total += 1;
      if (day[point.zoneShare] !== undefined) day[point.zoneShare] += 1;
      if (point.zoneShare === 'critical') {
        var hour = new Date(point.t).getHours();
        byHour[hour] = (byHour[hour] || 0) + 1;
      }
    });
    days.sort(function (a, b) { return a.key < b.key ? 1 : -1; });   // najnowszy na górze

    box.appendChild(zoneTable('reportTable', 'Udział czasu w strefach, dzień po dniu', 'Dzień', days));

    // Porównanie dzień do dnia, wypisane wprost zamiast zostawione czytelnikowi.
    if (days.length >= 2) {
      var today = percentOf(days[0].critical, days[0].total);
      var before = percentOf(days[1].critical, days[1].total);
      var diff = today - before;
      var wording;
      if (diff === 0) wording = 'tyle samo co ' + days[1].labelPL + '.';
      else if (diff > 0) wording = 'o ' + pointsWordPL(diff) + ' więcej niż ' + days[1].labelPL + '.';
      else wording = 'o ' + pointsWordPL(Math.abs(diff)) + ' mniej niż ' + days[1].labelPL + '.';
      box.appendChild(h('p', {
        id: 'reportCompare',
        text: 'Porównanie dzień do dnia: ' + days[0].labelPL + ' — ' + today +
          '% czasu w strefie szkodliwej, ' + wording
      }));
    } else {
      box.appendChild(h('p', {
        id: 'reportCompare', class: 'ui-muted',
        text: 'Porównanie dzień do dnia pojawi się po drugim dniu pomiarów.'
      }));
    }

    // Pora doby z największą liczbą odczytów w strefie szkodliwej.
    var peakHour = null;
    Object.keys(byHour).forEach(function (hour) {
      if (peakHour === null || byHour[hour] > byHour[peakHour]) peakHour = hour;
    });
    var pad = function (value) { return (value < 10 ? '0' : '') + value; };
    box.appendChild(h('p', {
      id: 'reportPeak',
      text: peakHour === null
        ? 'W tym zakresie nie zapisano odczytów w strefie szkodliwej.'
        : ('Najwięcej odczytów w strefie szkodliwej między ' + pad(Number(peakHour)) + ':00 a ' +
           pad((Number(peakHour) + 1) % 24) + ':00.')
    }));

    // Zestawienie tygodniowe. Pokazywane tylko wtedy, gdy wybrany zakres może
    // w ogóle objąć więcej niż jeden tydzień — inaczej powtarzałoby tabelę dzienną.
    if (historyRangeMs >= 7 * DAY_MS) box.appendChild(buildWeeklySection(points));

    box.appendChild(h('p', {
      class: 'ui-muted',
      text: 'Liczby to udział zapisanych odczytów w wybranym zakresie, nie dokładny czas ekspozycji.'
    }));
    return box;
  }

  // Numer tygodnia wg ISO-8601. Tygodnie zaczynają się w poniedziałek, czego
  // oczekuje polski czytelnik, a rok jest niesiony razem z numerem, żeby
  // przełom roku nie scalił dwóch różnych tygodni w jeden wiersz.
  function isoWeekOf(ts) {
    var d = new Date(ts);
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var dayIndex = (d.getDay() + 6) % 7;          // 0 = poniedziałek
    d.setDate(d.getDate() - dayIndex + 3);        // czwartek tego tygodnia
    var isoYear = d.getFullYear();
    var firstThursday = new Date(isoYear, 0, 4);
    var firstIndex = (firstThursday.getDay() + 6) % 7;
    firstThursday.setDate(firstThursday.getDate() - firstIndex + 3);
    var week = 1 + Math.round((d - firstThursday) / (7 * DAY_MS));
    return { key: isoYear + '-W' + (week < 10 ? '0' : '') + week, labelPL: 'Tydzień ' + week + ' (' + isoYear + ')' };
  }

  function buildWeeklySection(points) {
    var weeks = [];
    var byWeek = {};
    points.forEach(function (point) {
      var info = isoWeekOf(point.t);
      if (!byWeek[info.key]) {
        byWeek[info.key] = { key: info.key, labelPL: info.labelPL, total: 0, good: 0, warning: 0, critical: 0 };
        weeks.push(byWeek[info.key]);
      }
      var week = byWeek[info.key];
      week.total += 1;
      if (week[point.zoneShare] !== undefined) week[point.zoneShare] += 1;
    });
    weeks.sort(function (a, b) { return a.key < b.key ? 1 : -1; });   // najnowszy na górze

    var box = h('div', { class: 'ui-stack' }, [sectionTitle('Raport tygodniowy')]);
    if (!weeks.length) {
      box.appendChild(h('p', {
        id: 'weeklyEmpty', class: 'ui-muted',
        text: 'Raport tygodniowy pojawi się, gdy w wybranym zakresie będą zapisane odczyty.'
      }));
      return box;
    }
    box.appendChild(zoneTable('weeklyTable', 'Udział czasu w strefach, tydzień po tygodniu', 'Tydzień', weeks));
    if (weeks.length >= 2) {
      var now = percentOf(weeks[0].critical, weeks[0].total);
      var prev = percentOf(weeks[1].critical, weeks[1].total);
      var diff = now - prev;
      box.appendChild(h('p', {
        id: 'weeklyCompare',
        text: 'Porównanie tydzień do tygodnia: ' + weeks[0].labelPL + ' — ' + now +
          '% czasu w strefie szkodliwej, ' +
          (diff === 0 ? ('tyle samo co ' + weeks[1].labelPL + '.')
            : (diff > 0 ? ('o ' + pointsWordPL(diff) + ' więcej niż ' + weeks[1].labelPL + '.')
              : ('o ' + pointsWordPL(Math.abs(diff)) + ' mniej niż ' + weeks[1].labelPL + '.')))
      }));
    } else {
      box.appendChild(h('p', {
        id: 'weeklyCompare', class: 'ui-muted',
        text: 'Porównanie tydzień do tygodnia pojawi się po drugim tygodniu pomiarów.'
      }));
    }
    return box;
  }

  /* ---------------------------------------------------------------------
     Profile progów
     --------------------------------------------------------------------- */

  function profilesStore() {
    var stored = readJSON(PROFILES_KEY, null) || {};
    return {
      active: stored.active || '',
      list: Array.isArray(stored.list) ? stored.list : []
    };
  }

  function saveProfiles(store) { return writeJSON(PROFILES_KEY, store); }

  function renderProfilesPanel() {
    var container = byId('profilesPanel');
    if (!container) return;
    // Ten sam problem z przebudową od zera co w panelu historii: zastosowanie,
    // usunięcie albo zapisanie profilu nie może zrzucić fokusu na <body>.
    var focusedId = (document.activeElement && document.activeElement.id) || null;
    clear(container);
    var data = (window.AppData && typeof window.AppData.getThresholds === 'function') ? window.AppData : null;
    var store = profilesStore();

    var wrap = h('div', { class: 'ui-stack' }, [sectionTitle('Profile progów')]);
    var list = h('div', { class: 'ui-list' });
    if (!store.list.length) {
      list.appendChild(h('p', { class: 'ui-muted', text: 'Nie masz jeszcze zapisanych profili.' }));
    }
    store.list.forEach(function (profile) {
      var row = h('div', { class: 'ui-row' }, [
        h('button', {
          id: 'profileApply_' + profile.id, type: 'button', class: 'btn ui-grow',
          text: profile.namePL + (store.active === profile.id ? ' (aktywny)' : ''),
          'aria-label': 'Zastosuj profil ' + profile.namePL,
          onclick: function () {
            if (!data || typeof data.setThresholds !== 'function') return;
            data.setThresholds({ raw: profile.raw, share: profile.share });
            store.active = profile.id;
            saveProfiles(store);
            toast('Zastosowano profil „' + profile.namePL + '”.', { type: 'success' });
            renderProfilesPanel();
          }
        }),
        h('button', {
          id: 'profileDelete_' + profile.id, type: 'button', class: 'btn btn-danger', text: 'Usuń',
          'aria-label': 'Usuń profil ' + profile.namePL,
          onclick: function () {
            store.list = store.list.filter(function (p) { return p.id !== profile.id; });
            if (store.active === profile.id) store.active = '';
            saveProfiles(store);
            toast('Usunięto profil „' + profile.namePL + '”.', { type: 'info' });
            renderProfilesPanel();
          }
        })
      ]);
      list.appendChild(row);
    });
    wrap.appendChild(list);

    var nameInput = h('input', {
      class: 'ui-input', type: 'text', placeholder: 'Nazwa profilu (np. Wieczór)',
      id: 'profileName', autocomplete: 'off'
    });
    wrap.appendChild(h('label', { for: 'profileName', text: 'Zapisz bieżące progi jako profil' }));
    wrap.appendChild(h('div', { class: 'ui-row' }, [
      nameInput,
      h('button', {
        id: 'profileSaveBtn', type: 'button', class: 'btn', text: 'Zapisz profil',
        onclick: function () {
          var name = (nameInput.value || '').trim();
          if (!name) { toast('Podaj nazwę profilu.', { type: 'warning' }); return; }
          if (store.list.length >= PROFILES_MAX) {
            toast('Możesz zapisać maksymalnie ' + PROFILES_MAX + ' profili. Usuń jeden, aby dodać nowy.', { type: 'warning' });
            return;
          }
          if (!data || typeof data.getThresholds !== 'function') return;
          var thresholds = data.getThresholds();
          store.list.push({
            id: 'p' + Date.now(),
            namePL: name,
            raw: { warn: thresholds.raw.warn, crit: thresholds.raw.crit },
            share: { warn: thresholds.share.warn, crit: thresholds.share.crit }
          });
          saveProfiles(store);
          toast('Zapisano profil „' + name + '”.', { type: 'success' });
          renderProfilesPanel();
        }
      })
    ]));
    container.appendChild(wrap);
    if (focusedId && byId(focusedId)) focusLater(byId(focusedId));
  }

  /* ---------------------------------------------------------------------
     Eksport CSV
     --------------------------------------------------------------------- */

  function pad2(value) { return value < 10 ? '0' + value : String(value); }

  function csvTimestamp(ts) {
    var d = new Date(ts);
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()) + ' ' +
      pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
  }

  function exportCsv() {
    var data = appData();
    var points = [];
    if (data) {
      try { points = data.getHistoryLong({}) || []; } catch (_) { points = []; }
    }
    if (!points.length && window.AppData && typeof window.AppData.getHistory === 'function') {
      try { points = window.AppData.getHistory() || []; } catch (_) { points = []; }
    }
    if (!points.length) {
      toast('Brak odczytów do wyeksportowania. Uruchom pomiar i spróbuj ponownie.', { type: 'warning' });
      return false;
    }
    var lines = ['czas;jasnosc_B_proc;udzial_niebieskiego_proc;jasnosc_sceny_proc;strefa'];
    points.forEach(function (p) {
      lines.push([
        csvTimestamp(p.t),
        String(Math.round(p.raw)),
        String(Math.round(p.share)),
        String(Math.round(p.brightness)),
        ZONE_LABEL[p.zoneShare] || ''
      ].join(';'));
    });
    // BOM utrzymuje czytelność polskich znaków po otwarciu pliku w Excelu.
    var blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var link = h('a', {
      href: url,
      download: 'monitoring-swiatla-' + csvTimestamp(Date.now()).replace(/[: ]/g, '-') + '.csv'
    });
    document.body.appendChild(link);
    link.click();
    window.setTimeout(function () {
      if (link.parentNode) link.parentNode.removeChild(link);
      URL.revokeObjectURL(url);
    }, 1000);
    toast('Wyeksportowano ' + readingsWordPL(points.length) + ' do pliku CSV.', { type: 'success' });
    return true;
  }

  function wireExportButton() {
    var btn = byId('exportCsvBtn');
    if (!btn || btn.getAttribute('data-wired')) return;
    btn.setAttribute('data-wired', '1');
    btn.addEventListener('click', function () { exportCsv(); });
  }

  /* ---------------------------------------------------------------------
     Alert progowy i podsumowanie sesji — dwie funkcje reagujące na pomiar.
     Obie tylko nasłuchują; żadna nigdy nie opóźnia ani nie wstrzymuje próbki.
     --------------------------------------------------------------------- */

  var criticalSince = 0;
  var lastAlertAt = 0;

  function onSampleForAlerts(point) {
    if (!point) return;
    if (point.zoneShare !== 'critical') { criticalSince = 0; return; }
    if (!criticalSince) { criticalSince = point.t; return; }
    var exposureMs = point.t - criticalSince;
    if (exposureMs < ALERT_EXPOSURE_MS) return;
    if (point.t - lastAlertAt < ALERT_COOLDOWN_MS) return;
    lastAlertAt = point.t;
    criticalSince = point.t;   // uzbrajamy od nowa, żeby alert nie powtórzył się od razu
    fireExposureAlert(Math.max(1, Math.round(exposureMs / 60000)));
  }

  function fireExposureAlert(minutes) {
    var message = 'Alert progowy: od ' + minutesWordPL(minutes) + ' odczyt jest w strefie szkodliwej. ' +
      'Rozważ przerwę albo zmniejszenie udziału niebieskiego na ekranie.';
    toast(message, { type: 'warning', durationMs: 8000 });
    announce('navLive', message);
    try {
      if (navigator && typeof navigator.vibrate === 'function' && !prefersReducedMotion()) {
        navigator.vibrate([200, 120, 200]);
      }
    } catch (_) { /* wibracja to miły dodatek, nigdy wymóg */ }
  }

  function formatDurationPL(ms) {
    var totalSeconds = Math.max(0, Math.round((ms || 0) / 1000));
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    if (!minutes) return seconds + ' s';
    return minutes + ' min ' + (seconds < 10 ? '0' : '') + seconds + ' s';
  }

  function fmtDateTime(ts) {
    var d = new Date(ts);
    return d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  }

  function onSessionEndForSummary(summary) {
    criticalSince = 0;
    if (!summary) return;
    lastSessionSummary = summary;
    renderHistoryPanel();
    var critical = Math.round(((summary.zoneShares && summary.zoneShares.critical) || 0) * 100);
    toast('Sesja zakończona: ' + formatDurationPL(summary.durationMs) + ', ' +
      readingsWordPL(summary.samples || 0) + ', ' + critical + '% czasu w strefie szkodliwej.',
      { type: 'info', durationMs: 9000 });
  }

  // Karta pokazywana na górze panelu historii po zakończonej sesji.
  function buildSessionSummaryCard() {
    var summary = lastSessionSummary;
    var shares = (summary && summary.zoneShares) || {};
    var box = h('div', { id: 'sessionSummary', class: 'ui-stack' }, [
      sectionTitle('Podsumowanie ostatniej sesji')
    ]);
    box.appendChild(h('p', {
      text: 'Czas pomiaru: ' + formatDurationPL(summary.durationMs) +
        '. Zapisane odczyty: ' + (summary.samples || 0) + '.'
    }));
    ['good', 'warning', 'critical'].forEach(function (zone) {
      box.appendChild(h('p', {
        text: ZONE_LABEL_LONG[zone] + ': ' + Math.round((shares[zone] || 0) * 100) + '% czasu sesji.'
      }));
    });
    box.appendChild(h('p', {
      class: 'ui-muted',
      text: 'Podsumowanie dotyczy sesji zakończonej ' + fmtDateTime(summary.endedAt) + '.'
    }));
    return box;
  }

  /* ---------------------------------------------------------------------
     Uruchomienie
     --------------------------------------------------------------------- */

  var initialized = false;

  var api = {
    init: function () {
      if (initialized) return;
      initialized = true;

      dropObsoleteKeys();
      toastRegion();
      wireExportButton();
      renderHistoryPanel();
      renderProfilesPanel();

      if (window.AppData && typeof window.AppData.onSessionEnd === 'function') {
        window.AppData.onSessionEnd(onSessionEndForSummary);
      }
      if (window.AppData && typeof window.AppData.onSample === 'function') {
        window.AppData.onSample(onSampleForAlerts);
      }

      // Panel historii jest budowany raz i nie odświeża się sam w trakcie
      // pomiaru (to byłoby przebudowywanie DOM 5 razy na sekundę). Wystarczy
      // odświeżyć go przy każdym wejściu na ekran Monitoring — wtedy pokazuje
      // to, co bufor zdążył zebrać.
      if (window.AppNav && typeof window.AppNav.on === 'function') {
        window.AppNav.on('change', function (payload) {
          if (payload && payload.to === 'monitoring') renderHistoryPanel();
        });
      }
    },
    toast: toast,
    exportCsv: exportCsv,
    refresh: function () {
      wireExportButton();
      renderHistoryPanel();
      renderProfilesPanel();
    }
  };

  window.BlueMonitor = window.BlueMonitor || {};
  window.AppFeatures = api;
  window.BlueMonitor.AppFeatures = api;

  /* --- start: app.js publikuje AppTabs/AppData i dopiero potem zgłasza 'app:ready' --- */
  function boot() { api.init(); }

  if (window.AppTabs) boot();
  else document.addEventListener('app:ready', boot, { once: true });
})();
