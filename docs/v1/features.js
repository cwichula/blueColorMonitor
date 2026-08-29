/* =====================================================================
   features.js — warstwa funkcji analitycznych aplikacji.

   Wszystko, co ten plik buduje, jest dostępne dla każdego, od razu i bez
   warunków: historia długoterminowa, raport dzienny i tygodniowy, profile
   progów, eksport CSV, alert progowy i podsumowanie sesji. Aplikacja jest
   w całości bezpłatna i działa bez konta.

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

  // Klucze zostawione w pamięci przeglądarki przez starsze buildy tej
  // aplikacji. Nic ich już nie zapisuje ani nie czyta; kasujemy je raz, przy
  // starcie, żeby nie zostawiać po sobie śmieci na urządzeniach, które
  // tamte buildy uruchomiły. Kluczy z pomiarami, historią, progami
  // i profilami nie ruszamy.
  var OBSOLETE_KEYS = [
    'blueMonitor.billing.v1',
    'blueMonitor.account.v1',
    'blueMonitor.promo.v1',
    'blueMonitor.ads.v1',
    'blueMonitor.onboarding.v1'
  ];

  var ALERT_EXPOSURE_MS = 5 * 60 * 1000;   // ciągły czas w strefie szkodliwej przed alertem
  var ALERT_COOLDOWN_MS = 15 * 60 * 1000;  // nigdy nie męczymy: najwyżej jeden alert na kwadrans

  /* ---------------------------------------------------------------------
     Warstwa językowa

     T() zamiast I18n.t() wprost: gdyby shared/i18n.js się nie wczytał, ten
     plik ma pokazać klucze, a nie wywrócić panelu historii. Pomiar w app.js
     nigdy nie zależy od warstwy językowej i tak samo nie zależy od niej nic
     tutaj.
     --------------------------------------------------------------------- */

  function T(key, params) {
    var i18n = window.I18n;
    return (i18n && typeof i18n.t === 'function') ? i18n.t(key, params) : String(key);
  }

  function locale() {
    var i18n = window.I18n;
    return (i18n && typeof i18n.locale === 'function') ? i18n.locale() : undefined;
  }

  function zoneName(zone) { return T('zone.' + zone); }
  function zoneBadge(zone) { return T('zone.badge.' + zone); }

  // Liczba stojąca samotnie w komórce tabeli też jest napisem w danym języku:
  // arabski zapisuje ją innymi cyframi, a polski innym separatorem tysięcy.
  function num(value) {
    var i18n = window.I18n;
    return (i18n && typeof i18n.number === 'function') ? i18n.number(value) : String(value);
  }

  // Pełna godzina („07:00”) w zapisie aktywnego języka. Angielski powie
  // „7:00 AM”, polski „07:00” — czyli dokładnie to, co było tu wcześniej.
  function hourLabel(hour) {
    var d = new Date(2000, 0, 1, hour, 0, 0);
    try {
      return new Intl.DateTimeFormat(locale(), { hour: '2-digit', minute: '2-digit' }).format(d);
    } catch (_) {
      return (hour < 10 ? '0' : '') + hour + ':00';
    }
  }

  // Kierunek zmiany jako osobne zdanie podrzędne. Trzy klucze zamiast jednego
  // z „więcej/mniej” w środku: w części języków porównanie zmienia szyk całego
  // zdania, a nie tylko jeden wyraz.
  function changeWording(diff, otherLabel) {
    if (diff === 0) return T('report.change.same', { other: otherLabel });
    if (diff > 0) return T('report.change.more', { points: pointsWord(diff), other: otherLabel });
    return T('report.change.less', { points: pointsWord(Math.abs(diff)), other: otherLabel });
  }

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

  // Odmiana liczebnika należy do Intl.PluralRules aktywnego języka — własnej
  // reguły odmiany tu nie ma i nie może być. Polskie „2 odczyty / 5 odczytów”,
  // rosyjskie „many” i arabskie sześć kategorii są w CLDR, utrzymywane przez
  // kogoś innego i poprawne dla wszystkich trzydziestu języków naraz.
  // Czytniki ekranu wymawiają te napisy, więc „1 dni” to nie literówka,
  // którą użytkownik może pominąć.
  function readingsWord(n) { return T('count.readings', { n: n }); }
  function pointsWord(n) { return T('count.points', { n: n }); }

  function sectionTitle(key) {
    return h('h3', { class: 'ui-section-title', text: T(key) });
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

  function toast(message, opts) {
    opts = opts || {};
    var type = opts.type || 'info';
    var region = toastRegion();
    region.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
    var duration = opts.durationMs || (type === 'error' ? 8000 : 5000);
    var node = h('div', { class: 'ui-toast ui-toast-' + type }, [
      h('span', { class: 'ui-grow', text: message })
    ]);
    var removeNode = function () {
      if (node.parentNode) node.parentNode.removeChild(node);
    };
    // Toast siedzi nad dolnym paskiem i przez cały czas życia łapie dotknięcia,
    // więc zawsze potrzebuje prawdziwego wyjścia — nie tylko licznika czasu.
    node.appendChild(h('button', {
      type: 'button', class: 'ui-toast-close', text: '✕',
      'aria-label': T('action.closeNotification'), onclick: removeNode
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
    panel.appendChild(sectionTitle('history.title'));
    if (lastSessionSummary) panel.appendChild(buildSessionSummaryCard());

    var ranges = [
      { id: 'histRange1h', key: 'range.1h', ms: HOUR_MS },
      { id: 'histRange24h', key: 'range.24h', ms: DAY_MS },
      { id: 'histRange7d', key: 'range.7d', ms: 7 * DAY_MS },
      { id: 'histRange30d', key: 'range.30d', ms: 30 * DAY_MS }
    ];
    var group = h('div', { class: 'ui-row', role: 'group', 'aria-label': T('history.rangeAria') });
    ranges.forEach(function (range) {
      group.appendChild(h('button', {
        id: range.id, type: 'button', class: 'btn', text: T(range.key),
        'aria-pressed': String(historyRangeMs === range.ms),
        onclick: function () { historyRangeMs = range.ms; renderHistoryPanel(); }
      }));
    });
    panel.appendChild(group);

    var summaryBox = h('div', { class: 'ui-stack', 'aria-live': 'polite' });
    var points = [];
    if (!data) {
      summaryBox.appendChild(h('p', { class: 'ui-muted', text: T('history.unavailable') }));
    } else {
      try { points = data.getHistoryLong({ sinceMs: Date.now() - historyRangeMs }) || []; } catch (_) { points = []; }
      var summary = summarizeZones(points);
      if (!summary.total) {
        summaryBox.appendChild(h('p', { class: 'ui-muted', text: T('history.empty') }));
      } else {
        summaryBox.appendChild(h('p', {
          text: T('history.savedReadings', { count: summary.total })
        }));
        ['good', 'warning', 'critical'].forEach(function (zone) {
          summaryBox.appendChild(h('p', {
            // Liczebnik wchodzi w zdanie jako gotowy napis: forma zależy od
            // liczby, a nie od miejsca w zdaniu, więc rozstrzyga ją t() osobno.
            text: T('history.zoneLine', {
              zone: zoneName(zone),
              percent: percentOf(summary.counts[zone], summary.total),
              readings: readingsWord(summary.counts[zone])
            })
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

  // Nazwa dnia („28 sierpnia”) należy do Intl.DateTimeFormat aktywnego języka.
  // Własna tablica nazw miesięcy działała dla jednego języka; dla trzydziestu
  // musiałaby nieść trzydzieści tablic razem z odmianą przez przypadki.
  function dayLabelOf(ts) {
    try {
      return new Intl.DateTimeFormat(locale(), { day: 'numeric', month: 'long' }).format(new Date(ts));
    } catch (_) {
      return new Date(ts).toLocaleDateString();
    }
  }

  function zoneTable(id, captionKey, firstColKey, rows) {
    return h('div', { id: id + 'Wrap', class: 'ui-table-wrap' }, h('table', { id: id, class: 'ui-table' }, [
      h('caption', { text: T(captionKey) }),
      h('thead', {}, h('tr', {}, [
        h('th', { scope: 'col', text: T(firstColKey) }),
        h('th', { scope: 'col', text: zoneName('good') }),
        h('th', { scope: 'col', text: zoneName('warning') }),
        h('th', { scope: 'col', text: zoneName('critical') }),
        h('th', { scope: 'col', text: T('report.col.readings') })
      ])),
      h('tbody', {}, rows.map(function (row) {
        return h('tr', {}, [
          h('th', { scope: 'row', class: 'ui-table-rowhead', text: row.label }),
          h('td', { class: 'ui-table-val', text: num(percentOf(row.good, row.total)) + '%' }),
          h('td', { class: 'ui-table-val', text: num(percentOf(row.warning, row.total)) + '%' }),
          h('td', { class: 'ui-table-val', text: num(percentOf(row.critical, row.total)) + '%' }),
          h('td', { class: 'ui-table-val', text: num(row.total) })
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
    box.appendChild(sectionTitle('report.dailyTitle'));
    if (!points.length) {
      box.appendChild(h('p', { class: 'ui-muted', text: T('report.empty') }));
      return box;
    }

    var days = [];
    var byDay = {};
    var byHour = {};
    points.forEach(function (point) {
      var key = dayKeyOf(point.t);
      if (!byDay[key]) {
        byDay[key] = { key: key, label: dayLabelOf(point.t), total: 0, good: 0, warning: 0, critical: 0 };
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

    box.appendChild(zoneTable('reportTable', 'report.dailyCaption', 'report.col.day', days));

    // Porównanie dzień do dnia, wypisane wprost zamiast zostawione czytelnikowi.
    if (days.length >= 2) {
      var today = percentOf(days[0].critical, days[0].total);
      var before = percentOf(days[1].critical, days[1].total);
      box.appendChild(h('p', {
        id: 'reportCompare',
        text: T('report.compare.day', {
          day: days[0].label,
          percent: today,
          change: changeWording(today - before, days[1].label)
        })
      }));
    } else {
      box.appendChild(h('p', {
        id: 'reportCompare', class: 'ui-muted', text: T('report.compare.dayPending')
      }));
    }

    // Pora doby z największą liczbą odczytów w strefie szkodliwej.
    var peakHour = null;
    Object.keys(byHour).forEach(function (hour) {
      if (peakHour === null || byHour[hour] > byHour[peakHour]) peakHour = hour;
    });
    box.appendChild(h('p', {
      id: 'reportPeak',
      text: peakHour === null
        ? T('report.peak.none')
        : T('report.peak', {
            from: hourLabel(Number(peakHour)),
            to: hourLabel((Number(peakHour) + 1) % 24)
          })
    }));

    // Zestawienie tygodniowe. Pokazywane tylko wtedy, gdy wybrany zakres może
    // w ogóle objąć więcej niż jeden tydzień — inaczej powtarzałoby tabelę dzienną.
    if (historyRangeMs >= 7 * DAY_MS) box.appendChild(buildWeeklySection(points));

    box.appendChild(h('p', { class: 'ui-muted', text: T('report.footnote') }));
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
    return {
      key: isoYear + '-W' + (week < 10 ? '0' : '') + week,
      // Rok idzie jako NAPIS, nie jako liczba: przez Intl.NumberFormat wyszłoby
      // „2 026” z separatorem tysięcy. Numer tygodnia jest liczbą i ma nią być.
      label: T('report.weekLabel', { week: week, year: String(isoYear) })
    };
  }

  function buildWeeklySection(points) {
    var weeks = [];
    var byWeek = {};
    points.forEach(function (point) {
      var info = isoWeekOf(point.t);
      if (!byWeek[info.key]) {
        byWeek[info.key] = { key: info.key, label: info.label, total: 0, good: 0, warning: 0, critical: 0 };
        weeks.push(byWeek[info.key]);
      }
      var week = byWeek[info.key];
      week.total += 1;
      if (week[point.zoneShare] !== undefined) week[point.zoneShare] += 1;
    });
    weeks.sort(function (a, b) { return a.key < b.key ? 1 : -1; });   // najnowszy na górze

    var box = h('div', { class: 'ui-stack' }, [sectionTitle('report.weeklyTitle')]);
    if (!weeks.length) {
      box.appendChild(h('p', { id: 'weeklyEmpty', class: 'ui-muted', text: T('report.weeklyEmpty') }));
      return box;
    }
    box.appendChild(zoneTable('weeklyTable', 'report.weeklyCaption', 'report.col.week', weeks));
    if (weeks.length >= 2) {
      var now = percentOf(weeks[0].critical, weeks[0].total);
      var prev = percentOf(weeks[1].critical, weeks[1].total);
      box.appendChild(h('p', {
        id: 'weeklyCompare',
        text: T('report.compare.week', {
          week: weeks[0].label,
          percent: now,
          change: changeWording(now - prev, weeks[1].label)
        })
      }));
    } else {
      box.appendChild(h('p', {
        id: 'weeklyCompare', class: 'ui-muted', text: T('report.compare.weekPending')
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

    var wrap = h('div', { class: 'ui-stack' }, [sectionTitle('profiles.title')]);
    var list = h('div', { class: 'ui-list' });
    if (!store.list.length) {
      list.appendChild(h('p', { class: 'ui-muted', text: T('profiles.empty') }));
    }
    store.list.forEach(function (profile) {
      // Nazwę profilu wpisał użytkownik, więc nie podlega tłumaczeniu — wchodzi
      // do zdania jako wstawka i nigdy nie jest sklejana z tekstem na sztywno.
      var name = profile.name || profile.namePL || '';
      var row = h('div', { class: 'ui-row' }, [
        h('button', {
          id: 'profileApply_' + profile.id, type: 'button', class: 'btn ui-grow',
          text: store.active === profile.id ? T('profiles.itemActive', { name: name }) : name,
          'aria-label': T('profiles.applyAria', { name: name }),
          onclick: function () {
            if (!data || typeof data.setThresholds !== 'function') return;
            data.setThresholds({ raw: profile.raw, share: profile.share });
            store.active = profile.id;
            saveProfiles(store);
            toast(T('profiles.applied', { name: name }), { type: 'success' });
            renderProfilesPanel();
          }
        }),
        h('button', {
          id: 'profileDelete_' + profile.id, type: 'button', class: 'btn btn-danger',
          text: T('action.delete'),
          'aria-label': T('profiles.deleteAria', { name: name }),
          onclick: function () {
            store.list = store.list.filter(function (p) { return p.id !== profile.id; });
            if (store.active === profile.id) store.active = '';
            saveProfiles(store);
            toast(T('profiles.deleted', { name: name }), { type: 'info' });
            renderProfilesPanel();
          }
        })
      ]);
      list.appendChild(row);
    });
    wrap.appendChild(list);

    var nameInput = h('input', {
      class: 'ui-input', type: 'text', placeholder: T('profiles.namePlaceholder'),
      id: 'profileName', autocomplete: 'off'
    });
    wrap.appendChild(h('label', { for: 'profileName', text: T('profiles.saveLabel') }));
    wrap.appendChild(h('div', { class: 'ui-row' }, [
      nameInput,
      h('button', {
        id: 'profileSaveBtn', type: 'button', class: 'btn', text: T('profiles.saveBtn'),
        onclick: function () {
          var newName = (nameInput.value || '').trim();
          if (!newName) { toast(T('profiles.needName'), { type: 'warning' }); return; }
          if (store.list.length >= PROFILES_MAX) {
            toast(T('profiles.limit', { n: PROFILES_MAX }), { type: 'warning' });
            return;
          }
          if (!data || typeof data.getThresholds !== 'function') return;
          var thresholds = data.getThresholds();
          store.list.push({
            id: 'p' + Date.now(),
            name: newName,
            raw: { warn: thresholds.raw.warn, crit: thresholds.raw.crit },
            share: { warn: thresholds.share.warn, crit: thresholds.share.crit }
          });
          saveProfiles(store);
          toast(T('profiles.saved', { name: newName }), { type: 'success' });
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
      toast(T('csv.empty'), { type: 'warning' });
      return false;
    }
    // Nagłówek pliku jest napisem dla człowieka — Excel pokazuje go w pierwszym
    // wierszu — więc idzie przez słownik. Same liczby zostają w zapisie
    // maszynowym (kropka dziesiętna, ASCII), bo plik ma się dać wczytać
    // niezależnie od tego, w jakim języku był otwarty program, który go zapisał.
    var lines = [T('csv.header')];
    points.forEach(function (p) {
      lines.push([
        csvTimestamp(p.t),
        String(Math.round(p.raw)),
        String(Math.round(p.share)),
        String(Math.round(p.brightness)),
        zoneBadge(p.zoneShare)
      ].join(';'));
    });
    // BOM utrzymuje czytelność polskich znaków po otwarciu pliku w Excelu.
    var blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    // Nazwa pliku podlega tłumaczeniu, ale nie wolno jej zaufać bez ograniczeń:
    // ukośnik albo dwukropek w tłumaczeniu rozbiłby zapis na dysk. Zostawiamy
    // wyłącznie znaki bezpieczne w nazwie pliku na każdym systemie.
    var stamp = csvTimestamp(Date.now()).replace(/[: ]/g, '-');
    var fileName = T('csv.filename', { stamp: stamp }).replace(/[\\/:*?"<>|]/g, '-');
    var link = h('a', { href: url, download: fileName });
    document.body.appendChild(link);
    link.click();
    window.setTimeout(function () {
      if (link.parentNode) link.parentNode.removeChild(link);
      URL.revokeObjectURL(url);
    }, 1000);
    toast(T('csv.done', { readings: readingsWord(points.length) }), { type: 'success' });
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
    // Całe zdanie jest JEDNYM kluczem z formami CLDR, a nie sklejeniem z
    // odmienioną liczbą minut: „od 1 minuty / od 5 minut” to dopełniacz, a nie
    // mianownik z count.minutes — i w każdym języku przypadek wypada inaczej.
    var message = T('alert.exposure', { n: minutes });
    toast(message, { type: 'warning', durationMs: 8000 });
    announce('navLive', message);
    try {
      if (navigator && typeof navigator.vibrate === 'function' && !prefersReducedMotion()) {
        navigator.vibrate([200, 120, 200]);
      }
    } catch (_) { /* wibracja to miły dodatek, nigdy wymóg */ }
  }

  function formatDuration(ms) {
    var totalSeconds = Math.max(0, Math.round((ms || 0) / 1000));
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    if (!minutes) return T('duration.seconds', { n: totalSeconds });
    // Sekundy jako NAPIS, bo mają zostać uzupełnione zerem do dwóch cyfr —
    // „5 min 07 s”. Minuty jako liczba, więc podlegają zapisowi języka.
    return T('duration.minutesSeconds', {
      minutes: minutes,
      seconds: (seconds < 10 ? '0' : '') + num(seconds)
    });
  }

  function fmtDateTime(ts) {
    var d = new Date(ts);
    try {
      return new Intl.DateTimeFormat(locale(), { hour: 'numeric', minute: '2-digit' }).format(d);
    } catch (_) {
      return d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    }
  }

  function onSessionEndForSummary(summary) {
    criticalSince = 0;
    if (!summary) return;
    lastSessionSummary = summary;
    renderHistoryPanel();
    var critical = Math.round(((summary.zoneShares && summary.zoneShares.critical) || 0) * 100);
    toast(T('session.toast', {
      duration: formatDuration(summary.durationMs),
      readings: readingsWord(summary.samples || 0),
      percent: critical
    }), { type: 'info', durationMs: 9000 });
  }

  // Karta pokazywana na górze panelu historii po zakończonej sesji.
  function buildSessionSummaryCard() {
    var summary = lastSessionSummary;
    var shares = (summary && summary.zoneShares) || {};
    var box = h('div', { id: 'sessionSummary', class: 'ui-stack' }, [
      sectionTitle('session.title')
    ]);
    box.appendChild(h('p', {
      text: T('session.line', {
        duration: formatDuration(summary.durationMs),
        count: summary.samples || 0
      })
    }));
    ['good', 'warning', 'critical'].forEach(function (zone) {
      box.appendChild(h('p', {
        text: T('session.zoneLine', {
          zone: zoneName(zone),
          percent: Math.round((shares[zone] || 0) * 100)
        })
      }));
    });
    box.appendChild(h('p', {
      class: 'ui-muted',
      text: T('session.endedAt', { time: fmtDateTime(summary.endedAt) })
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

      // Po zmianie języka oba panele są budowane od nowa. Nie da się ich
      // przetłumaczyć na miejscu: nie niosą kluczy, tylko gotowe zdania
      // złożone z liczb, dat i odmienionych liczebników.
      if (window.I18nDom && typeof window.I18nDom.onChange === 'function') {
        window.I18nDom.onChange(function () {
          renderHistoryPanel();
          renderProfilesPanel();
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
