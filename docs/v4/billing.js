/* Monitor Światła v4 — oferta, zakup i uprawnienia (billing.js).
 *
 * ROLA PLIKU: katalog planów, reguły uprawnień i symulowany przebieg zakupu.
 * Ani jednego węzła DOM — paywall rysuje screen-account.js i podpina się tu
 * przez Billing.registerPaywall(fn). Ten plik wie, CO wolno pokazać; nie wie,
 * jak to wygląda.
 *
 * REGUŁA UCZCIWOŚCI, na której stoi cała ta warstwa:
 * silnik liczy WSZYSTKIE SIEDEM wielkości dla każdego i zawsze — engine.js nie
 * pyta o subskrypcję ani razu. Pakiet zmienia wyłącznie to, czy liczba jest
 * pokazana. Wynikają z tego trzy rzeczy, których nie wolno zepsuć:
 *   1. Odblokowanie działa natychmiast i bez sieci — nie ma czego doliczać,
 *      dane już są.
 *   2. Werdykt spod wskaźnika (Scale.verdict) jest bezpłatny i liczy się ze
 *      wszystkich siedmiu, także z tych trzech pod kłódką. Ocena światła nigdy
 *      nie jest towarem.
 *   3. Historia zbiera komplet od pierwszego dnia dla każdego, więc po zakupie
 *      widać przebieg, który naprawdę się wydarzył, a nie pustą tabelę.
 *
 * TRYB DEMONSTRACYJNY. Billing.DEMO === true: nie ma żadnego żądania sieciowego,
 * nie ma pola na numer karty, nie ma opłaty. Zakup zmienia jeden wpis w pamięci
 * tej przeglądarki i można go cofnąć jednym przyciskiem. Każdy ekran oferty
 * musi nieść plakietkę UI.T.paywall.badge i drobny druk UI.T.paywall.fine.
 */
(function (global) {
  'use strict';

  var KEY = 'ms4.entitlement.v1';
  var DAY = 86400000;

  var Billing = {};

  Billing.DEMO = true;

  /* ------------------------------------------------------------------
     Pamięć i magistrala
     ------------------------------------------------------------------ */

  function readStore(key) {
    try {
      var raw = global.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (_) { return null; }
  }

  function writeStore(key, value) {
    try {
      global.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_) { return false; }
  }

  function removeStore(key) {
    try { global.localStorage.removeItem(key); } catch (_) { /* nic do zrobienia */ }
  }

  function emit(name, data) {
    try {
      if (global.Bus && typeof global.Bus.emit === 'function') global.Bus.emit(name, data);
    } catch (_) { /* zepsuty słuchacz nie może wywrócić zakupu */ }
  }

  /* ------------------------------------------------------------------
     Ceny — jedno źródło, reszta wyliczana
     ------------------------------------------------------------------ */

  // Ceny trzymamy w groszach, bo tylko na liczbach całkowitych przelicznik
  // miesięczny i procent oszczędności wychodzą powtarzalnie. Wszystkie napisy
  // z cenami powstają z tych trzech liczb — nie ma drugiego miejsca do poprawienia.
  var PRICE = { monthly: 999, yearly: 5999, lifetime: 14999 };

  // Polski zapis kwoty: przecinek dziesiętny, odstęp przed „zł”, groszy zawsze dwie cyfry.
  function zl(minor) {
    var whole = Math.floor(minor / 100);
    var cents = minor % 100;
    return whole + ',' + (cents < 10 ? '0' + cents : String(cents)) + ' zł';
  }

  var perMonthOfYear = Math.round(PRICE.yearly / 12);                       // 500 gr
  var savePercent = Math.round((1 - PRICE.yearly / (PRICE.monthly * 12)) * 100); // 50

  /* Trzy plany, w tej kolejności — tak stoją na paywallu i tak wchodzą do
     ms4-grid--plans. `featured` niesie klasę ms4-plan--featured (środkowa karta
     podniesiona na tablecie i desktopie). */
  Billing.PLANS = [
    {
      id: 'monthly',
      namePL: 'Miesięczny',
      priceMinor: PRICE.monthly,
      pricePL: zl(PRICE.monthly),
      periodPL: '/mies.',
      perMonthPL: zl(PRICE.monthly) + '/mies.',
      savePctPL: null,
      badgePL: null,
      trialDays: 0,
      recurring: true,
      featured: false,
      notePL: 'Płatność co miesiąc, rezygnacja w każdej chwili.'
    },
    {
      id: 'yearly',
      namePL: 'Roczny',
      priceMinor: PRICE.yearly,
      pricePL: zl(PRICE.yearly),
      periodPL: '/rok',
      perMonthPL: zl(perMonthOfYear) + '/mies.',
      savePctPL: '-' + savePercent + '%',
      badgePL: 'Najczęściej wybierany',
      trialDays: 7,
      recurring: true,
      featured: true,
      notePL: 'Pierwsze 7 dni bez opłaty, potem ' + zl(PRICE.yearly) + ' za rok.'
    },
    {
      id: 'lifetime',
      namePL: 'Dożywotni',
      priceMinor: PRICE.lifetime,
      pricePL: zl(PRICE.lifetime),
      periodPL: 'jednorazowo',
      perMonthPL: null,
      savePctPL: null,
      badgePL: null,
      trialDays: 0,
      recurring: false,
      featured: false,
      notePL: 'Jedna płatność, bez odnawiania. Odpowiada trzem latom planu rocznego.'
    }
  ];

  // Plan domyślnie zaznaczony po otwarciu paywalla.
  Billing.DEFAULT_PLAN = 'yearly';

  Billing.planById = function (id) {
    for (var i = 0; i < Billing.PLANS.length; i += 1) {
      if (Billing.PLANS[i].id === id) return Billing.PLANS[i];
    }
    return null;
  };

  /* ------------------------------------------------------------------
     Korzyści — pięć wpisów, każdy z ikoną z rozdziału 6
     ------------------------------------------------------------------ */

  var BENEFITS = [
    {
      icon: 'waveform', titlePL: 'Migotanie w liczbach',
      textPL: 'Zobaczysz, o ile procent pulsuje źródło światła i czy pomiar mieści się w zasięgu metody.'
    },
    {
      icon: 'grid', titlePL: 'Równomierność kadru',
      textPL: 'Dziewięć pól obrazu porównanych ze sobą — od razu widać przeświecanie i odbicia.'
    },
    {
      icon: 'eye', titlePL: 'Komfort wzrokowy',
      textPL: 'Jedna ocena 0–100 z rozpisaniem, co ją najbardziej obniża.'
    },
    {
      icon: 'report', titlePL: 'Raporty i porównania',
      textPL: 'Zestawienia dobowe i tygodniowe oraz dwie sesje obok siebie z różnicą podaną liczbowo.'
    },
    {
      icon: 'export', titlePL: 'Eksport z pełnym kompletem kolumn',
      textPL: 'CSV i JSON ze wszystkimi siedmioma wielkościami, a nie tylko czterema.'
    }
  ];

  Billing.benefits = function () {
    var out = [];
    for (var i = 0; i < BENEFITS.length; i += 1) {
      out.push({ icon: BENEFITS[i].icon, titlePL: BENEFITS[i].titlePL, textPL: BENEFITS[i].textPL });
    }
    return out;
  };

  /* ------------------------------------------------------------------
     Uprawnienie
     ------------------------------------------------------------------ */

  // {plan, since, trialUntil, source} albo null. `source`: 'purchase' | 'trial' | 'restore'.
  var record = null;
  var trialTimer = null;

  function validRecord(rec) {
    return !!(rec && typeof rec === 'object' && Billing.planById(rec.plan) &&
      typeof rec.since === 'number' && isFinite(rec.since));
  }

  function trialExpired(rec, now) {
    return !!(rec && typeof rec.trialUntil === 'number' && rec.trialUntil > 0 && now >= rec.trialUntil);
  }

  function load() {
    var rec = readStore(KEY);
    if (rec && !validRecord(rec)) { removeStore(KEY); rec = null; }
    record = validRecord(rec) ? rec : null;
    if (record && trialExpired(record, Date.now())) {
      // Okres próbny minął przy zamkniętej karcie — kasujemy go po cichu przy
      // starcie, bo nikt nie czeka jeszcze na zdarzenie.
      record = null;
      removeStore(KEY);
    }
    scheduleTrialEnd();
  }

  function save() {
    if (record) writeStore(KEY, record);
    else removeStore(KEY);
    scheduleTrialEnd();
  }

  /* Wygaśnięcie okresu próbnego w OTWARTEJ karcie. Bez tego użytkownik siedzący
     w aplikacji przez tydzień widziałby premium po terminie aż do odświeżenia. */
  function scheduleTrialEnd() {
    if (trialTimer) { global.clearTimeout(trialTimer); trialTimer = null; }
    if (!record || !record.trialUntil) return;
    var left = record.trialUntil - Date.now();
    if (left <= 0) return;
    // setTimeout nie przyjmuje więcej niż ~24,8 dnia; przy dłuższym terminie
    // budzimy się wcześniej i ustawiamy kolejny budzik.
    var wait = Math.min(left, 2147483000);
    trialTimer = global.setTimeout(function () {
      trialTimer = null;
      if (record && trialExpired(record, Date.now())) {
        record = null;
        removeStore(KEY);
        announce('trialEnded');
      } else {
        scheduleTrialEnd();
      }
    }, wait);
  }

  function snapshot() {
    if (!record) return null;
    var plan = Billing.planById(record.plan);
    var isTrial = record.source === 'trial' && !!record.trialUntil;
    return {
      plan: record.plan,
      planNamePL: plan ? plan.namePL : '',
      pricePL: plan ? plan.pricePL : '',
      since: record.since,
      trialUntil: record.trialUntil || 0,
      source: record.source,
      trial: isTrial,
      daysLeft: isTrial ? Billing.trialDaysLeft() : 0,
      active: true
    };
  }

  function announce(reason) {
    emit('billing:changed', { entitlement: snapshot(), premium: Billing.isPremium(), reason: reason || 'change' });
  }

  Billing.entitlement = function () {
    // Sprawdzenie terminu przy każdym odczycie: karta mogła spać.
    Billing.isPremium();
    return snapshot();
  };

  Billing.isPremium = function () {
    if (!record) return false;
    if (trialExpired(record, Date.now())) {
      record = null;
      removeStore(KEY);
      scheduleTrialEnd();
      // Zdarzenie leci w następnym obrocie pętli: isPremium() bywa wołane
      // w środku rysowania i nie może przebudować ekranu spod siebie.
      global.setTimeout(function () { announce('trialEnded'); }, 0);
      return false;
    }
    return true;
  };

  Billing.isTrial = function () {
    return !!(Billing.isPremium() && record && record.source === 'trial');
  };

  Billing.trialDaysLeft = function () {
    if (!record || !record.trialUntil) return 0;
    var left = record.trialUntil - Date.now();
    if (left <= 0) return 0;
    return Math.max(1, Math.ceil(left / DAY));
  };

  /* Czy liczbę tej wielkości wolno pokazać. Podział bierzemy WYŁĄCZNIE z pola
     `premium` w Metrics.CATALOGUE — własna lista w tym pliku rozjechałaby się
     z katalogiem przy pierwszej zmianie i pokazała pod kłódką coś, co jest
     bezpłatne, albo odwrotnie. */
  Billing.isUnlocked = function (metricId) {
    var m = global.Metrics && typeof global.Metrics.byId === 'function'
      ? global.Metrics.byId(metricId) : null;
    if (!m) return true;   // nieznana wielkość: nie chowamy niczego przypadkiem
    if (!m.premium) return true;
    return Billing.isPremium();
  };

  Billing.lockedMetrics = function () {
    var out = [];
    var cat = (global.Metrics && global.Metrics.CATALOGUE) || [];
    for (var i = 0; i < cat.length; i += 1) {
      if (cat[i].premium && !Billing.isPremium()) out.push(cat[i].id);
    }
    return out;
  };

  /* ------------------------------------------------------------------
     Zakup, okres próbny, przywracanie, rezygnacja
     ------------------------------------------------------------------ */

  function grant(planId, source, trialDays) {
    record = {
      plan: planId,
      since: Date.now(),
      trialUntil: trialDays ? Date.now() + trialDays * DAY : 0,
      source: source
    };
    save();
  }

  /* Symulowany zakup. Przebieg ma dwa etapy na magistrali — 'billing:purchase'
     ze stage 'processing', a po opóźnieniu 'success' — żeby paywall mógł
     pokazać stan „Przetwarzam…” i ekran sukcesu bez własnych liczników czasu.
     W symulacji zakup zawsze się udaje: udawana odmowa płatności byłaby
     zmyśloną informacją o czymś, czego w ogóle nie ma. */
  Billing.purchase = function (planId) {
    var plan = Billing.planById(planId);
    if (!plan) {
      return Promise.resolve({ ok: false, code: 'PLAN_UNKNOWN', entitlement: snapshot() });
    }
    emit('billing:purchase', { stage: 'processing', planId: planId, plan: plan });

    return new Promise(function (resolve) {
      // 900–1400 ms: tyle mniej więcej trwa okno płatności sklepu. Krócej
      // wygląda na kliknięcie w nic, dłużej na zawieszenie aplikacji.
      var delay = 900 + Math.floor(Math.random() * 500);
      global.setTimeout(function () {
        grant(planId, 'purchase', 0);
        emit('billing:purchase', { stage: 'success', planId: planId, plan: plan, entitlement: snapshot() });
        announce('purchased');
        resolve({ ok: true, planId: planId, plan: plan, entitlement: snapshot() });
      }, delay);
    });
  };

  /* Okres próbny działa natychmiast — nie ma czego przetwarzać, a przycisk
     „Zacznij 7 dni bez opłaty” ma dawać dostęp od razu. Termin liczymy od
     teraz i zapisujemy jako datę, nie jako pozostałą liczbę dni: dni policzone
     przy starcie rozjeżdżają się przy każdej zmianie strefy czasowej. */
  Billing.startTrial = function () {
    var plan = Billing.planById('yearly');
    var days = plan && plan.trialDays ? plan.trialDays : 7;
    grant('yearly', 'trial', days);
    announce('trialStarted');
    return snapshot();
  };

  /* Przywracanie zakupów. W symulacji „sklepem” jest localStorage tej
     przeglądarki, więc szukamy w nim ponownie — to ma sens po odświeżeniu albo
     gdy zakup zrobiono w drugiej karcie. Po rezygnacji wpisu nie ma i uczciwa
     odpowiedź brzmi „nie znaleziono”, a nie ciche wskrzeszenie premium. */
  Billing.restore = function () {
    return new Promise(function (resolve) {
      global.setTimeout(function () {
        var rec = readStore(KEY);
        if (validRecord(rec) && !trialExpired(rec, Date.now())) {
          record = rec;
          scheduleTrialEnd();
          announce('restored');
          resolve({ ok: true, restored: true, entitlement: snapshot() });
        } else {
          if (rec) removeStore(KEY);
          resolve({ ok: true, restored: false, entitlement: null });
        }
      }, 500 + Math.floor(Math.random() * 300));
    });
  };

  Billing.cancel = function () {
    if (!record) return false;
    record = null;
    save();
    announce('cancelled');
    return true;
  };

  /* ------------------------------------------------------------------
     Paywall — billing.js nie zna DOM
     ------------------------------------------------------------------ */

  var paywallFn = null;

  Billing.registerPaywall = function (fn) {
    paywallFn = typeof fn === 'function' ? fn : null;
  };

  /* Wołane zewsząd: z kafelka pod kłódką, z karty subskrypcji, z narzędzia
     premium. `source` i `metricId` przekazujemy dalej, bo paywall potrafi
     zacząć od korzyści dotyczącej wielkości, w którą użytkownik właśnie stuknął. */
  Billing.openPaywall = function (opts) {
    if (!paywallFn) {
      if (global.console && console.warn) {
        console.warn('Billing.openPaywall: brak zarejestrowanego paywalla (screen-account.js).');
      }
      return false;
    }
    return paywallFn(opts || {});
  };

  /* ------------------------------------------------------------------
     Powiązanie z kontem
     ------------------------------------------------------------------ */

  /* Usunięcie konta kasuje też stan subskrypcji — tak brzmi zdanie, które
     użytkownik potwierdza (UI.T.account.deleteConfirm). Zależność idzie
     w jedną stronę: billing.js słucha auth.js, auth.js nie wie o istnieniu
     tego pliku, więc do klucza 'ms4.entitlement.v1' pisze tylko jeden moduł. */
  try {
    if (global.Bus && typeof global.Bus.on === 'function') {
      global.Bus.on('auth:changed', function (data) {
        if (!data || data.reason !== 'deleted') return;
        if (!record) return;
        record = null;
        save();
        announce('accountDeleted');
      });
    }
  } catch (_) { /* brak magistrali nie może zablokować oferty */ }

  load();

  global.Billing = Billing;

}(typeof window !== 'undefined' ? window : globalThis));
