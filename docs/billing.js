/* =====================================================================
   billing.js — entitlement engine for "Monitoring Światła Szkodliwego".

   Exactly two layers live in this file:

     1) MockBillingBackend — THE ONLY FICTIONAL LAYER. Product catalogue,
        simulated latency, purchase outcomes, promo codes, the fake
        account and the fake purchase clock all live inside it. This is
        the single object to replace when wiring real Google Play Billing
        (Digital Goods API). Nothing outside it may learn that the store
        is a simulation.

     2) The adapter published as window.Billing — it delegates to the
        backend, recomputes derived entitlements, persists state and
        emits events.

   Hard rules honoured here: no DOM access, no network, no thrown errors,
   no rejected promises (failures come back as Result objects), no writes
   to blueMonitor.thresholds.v1, and no trial ever started implicitly.
   ===================================================================== */
(() => {
  'use strict';

  window.BlueMonitor = window.BlueMonitor || {};

  const STATE_VERSION = 1;
  const BILLING_KEY = 'blueMonitor.billing.v1';
  const ACCOUNT_KEY = 'blueMonitor.account.v1';
  const PROMO_KEY = 'blueMonitor.promo.v1';

  const DAY_MS = 24 * 60 * 60 * 1000;
  const TRIAL_DAYS = 7;
  const PAYWALL_COOLDOWN_MS = 24 * 60 * 60 * 1000;
  const WELCOME_OFFER_MS = 24 * 60 * 60 * 1000;
  const RESTORE_THROTTLE_MS = 30000;

  const FEATURES = {
    HISTORY_LONG: 'historyLong',
    CSV_EXPORT: 'csvExport',
    REPORTS: 'reports',
    PROFILES: 'profiles',
    ALERTS: 'alerts',
    BACKGROUND: 'background',
    NO_ADS: 'noAds'
  };
  const FEATURE_IDS = [
    FEATURES.HISTORY_LONG, FEATURES.CSV_EXPORT, FEATURES.REPORTS,
    FEATURES.PROFILES, FEATURES.ALERTS, FEATURES.BACKGROUND, FEATURES.NO_ADS
  ];

  const PRODUCT_IDS = {
    LIFETIME: 'premium_lifetime',
    YEARLY: 'premium_yearly',
    MONTHLY: 'premium_monthly',
    REMOVE_ADS: 'remove_ads'
  };

  /* Gating metadata. Lives next to the feature ids so no UI file has to
     hardcode Polish copy for a locked feature, and so the "what stays
     free forever" promise is written down in exactly one place. */
  const FEATURE_INFO = {
    historyLong: {
      labelPL: 'Historia dłuższa niż 60 sekund',
      descPL: 'Przeglądaj zapisane odczyty z zakresu 1 godziny, 24 godzin, 7 dni i 30 dni.',
      freeFallbackPL: 'W wersji darmowej widzisz ostatnie 60 sekund pomiaru.',
      rewardable: true,
      rewardMs: DAY_MS
    },
    csvExport: {
      labelPL: 'Eksport CSV',
      descPL: 'Zapisz odczyty do pliku CSV i otwórz je w arkuszu kalkulacyjnym.',
      freeFallbackPL: 'W wersji darmowej odczyty możesz oglądać w tabeli na ekranie.',
      rewardable: true,
      rewardMs: DAY_MS
    },
    reports: {
      labelPL: 'Raport dzienny i tygodniowy',
      descPL: 'Podsumowanie czasu spędzonego w każdej strefie, z porównaniem dzień do dnia.',
      freeFallbackPL: 'W wersji darmowej dostępny jest bieżący odczyt i wykresy 60 s.',
      rewardable: false,
      rewardMs: 0
    },
    profiles: {
      labelPL: 'Profile progów',
      descPL: 'Zapisz do pięciu zestawów progów (Dzień, Wieczór, Praca) i przełączaj je jednym dotknięciem.',
      freeFallbackPL: 'W wersji darmowej masz jeden, w pełni edytowalny zestaw progów.',
      rewardable: false,
      rewardMs: 0
    },
    alerts: {
      labelPL: 'Alerty progowe',
      descPL: 'Powiadomienie po dłuższej nieprzerwanej ekspozycji w strefie szkodliwej.',
      freeFallbackPL: 'W wersji darmowej strefę widać na gałkach i na wykresach.',
      rewardable: false,
      rewardMs: 0
    },
    background: {
      labelPL: 'Podsumowanie sesji',
      descPL: 'Po każdym zatrzymaniu pomiaru: czas sesji, liczba odczytów i udział poszczególnych stref.',
      freeFallbackPL: 'W wersji darmowej pomiar działa bez ograniczeń czasowych, ale bez podsumowania sesji.',
      rewardable: false,
      rewardMs: 0
    },
    noAds: {
      labelPL: 'Brak reklam',
      descPL: 'Aplikacja bez żadnych atrap reklam.',
      freeFallbackPL: 'W wersji darmowej reklamy są statyczne i nigdy nie przerywają pomiaru.',
      rewardable: false,
      rewardMs: 0
    }
  };

  /* The measurement core. Written down explicitly so that any future UI can
     ask "is this gated?" instead of guessing. None of these is ever paid. */
  const CORE_FREE_FEATURES = [
    'camera', 'measure', 'gauges', 'charts60s', 'table', 'thresholds', 'docs', 'theme', 'disclaimer'
  ];

  /* ------------------------------------------------------------------
     Storage helpers. Private browsing throws on read AND write, so every
     access is guarded and the app simply keeps running from memory.
     ------------------------------------------------------------------ */
  let storageWorks = true;

  function readJson(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return (parsed && typeof parsed === 'object') ? parsed : null;
    } catch (err) {
      storageWorks = false;
      return null;
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      storageWorks = false;
      return false;
    }
  }

  function removeKey(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      storageWorks = false;
      return false;
    }
  }

  function delay(ms) {
    return new Promise((resolve) => { setTimeout(resolve, Math.max(0, Math.round(ms) || 0)); });
  }

  function clone(value) {
    if (value === null || typeof value !== 'object') return value;
    if (Array.isArray(value)) return value.map(clone);
    const out = {};
    Object.keys(value).forEach((k) => { out[k] = clone(value[k]); });
    return out;
  }

  /* ------------------------------------------------------------------
     Polish money and date formatting, centralised so that three UI files
     cannot drift into three different spellings of the same price.
     ------------------------------------------------------------------ */
  const PL_UNITS = ['zero', 'jeden', 'dwa', 'trzy', 'cztery', 'pięć', 'sześć', 'siedem', 'osiem', 'dziewięć'];
  const PL_TEENS = ['dziesięć', 'jedenaście', 'dwanaście', 'trzynaście', 'czternaście', 'piętnaście', 'szesnaście', 'siedemnaście', 'osiemnaście', 'dziewiętnaście'];
  const PL_TENS = ['', '', 'dwadzieścia', 'trzydzieści', 'czterdzieści', 'pięćdziesiąt', 'sześćdziesiąt', 'siedemdziesiąt', 'osiemdziesiąt', 'dziewięćdziesiąt'];
  const PL_HUNDREDS = ['', 'sto', 'dwieście', 'trzysta', 'czterysta', 'pięćset', 'sześćset', 'siedemset', 'osiemset', 'dziewięćset'];

  // 0–999 covers every price a mobile app shows; anything larger falls back
  // to digits, which screen readers still pronounce correctly.
  function plWords(n) {
    n = Math.floor(Math.abs(Number(n) || 0));
    if (n > 999) return String(n);
    if (n < 10) return PL_UNITS[n];
    if (n < 20) return PL_TEENS[n - 10];
    const out = [];
    const hundreds = Math.floor(n / 100);
    const rest = n % 100;
    if (hundreds > 0) out.push(PL_HUNDREDS[hundreds]);
    if (rest >= 20) {
      out.push(PL_TENS[Math.floor(rest / 10)]);
      if (rest % 10 > 0) out.push(PL_UNITS[rest % 10]);
    } else if (rest >= 10) {
      out.push(PL_TEENS[rest - 10]);
    } else if (rest > 0) {
      out.push(PL_UNITS[rest]);
    }
    return out.join(' ');
  }

  // Polish has three plural forms; getting this wrong is the fastest way to
  // make a paid screen look machine-translated.
  function plPlural(n, one, few, many) {
    const abs = Math.abs(Math.floor(Number(n) || 0));
    if (abs === 1) return one;
    const lastTwo = abs % 100;
    const last = abs % 10;
    if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return few;
    return many;
  }

  function formatMinor(minor) {
    const value = Math.round(Math.abs(Number(minor) || 0));
    const zl = Math.floor(value / 100);
    const gr = value % 100;
    return zl + ',' + (gr < 10 ? '0' + gr : String(gr)) + ' zł';
  }

  // How to name the first billing period of a discounted plan. Promo codes in
  // this catalogue always discount the FIRST period only, never the renewals.
  const FIRST_PERIOD_PL = {
    lifetime: 'jednorazowo',
    ads: 'jednorazowo',
    yearly: 'za pierwszy rok',
    monthly: 'za pierwszy miesiąc'
  };
  const RENEWAL_PERIOD_PL = { yearly: 'rocznie', monthly: 'miesięcznie' };

  function firstPeriodPL(product) {
    return FIRST_PERIOD_PL[product && product.plan] || 'jednorazowo';
  }

  function spokenMinor(minor) {
    const value = Math.round(Math.abs(Number(minor) || 0));
    const zl = Math.floor(value / 100);
    const gr = value % 100;
    const parts = [plWords(zl), plPlural(zl, 'złoty', 'złote', 'złotych')];
    if (gr > 0) {
      parts.push(plWords(gr));
      parts.push(plPlural(gr, 'grosz', 'grosze', 'groszy'));
    }
    return parts.join(' ');
  }

  function formatDatePL(ts) {
    if (ts === null || ts === undefined || !isFinite(ts)) return '';
    try {
      return new Intl.DateTimeFormat('pl-PL', {
        day: 'numeric', month: 'long', year: 'numeric'
      }).format(new Date(ts));
    } catch (err) {
      const d = new Date(ts);
      return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
    }
  }

  function formatDateTimePL(ts) {
    if (ts === null || ts === undefined || !isFinite(ts)) return '';
    try {
      const text = new Intl.DateTimeFormat('pl-PL', {
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
      }).format(new Date(ts));
      // Some engines render "22 sierpnia 2026 o 14:35"; the spec wants a comma.
      return text.replace(' o ', ', ');
    } catch (err) {
      return formatDatePL(ts);
    }
  }

  // Calendar-correct period ends: Play renews on the same day of month/year,
  // not 30/365 days later, and the account screen shows that date verbatim.
  function addMonths(ts, months) {
    const d = new Date(ts);
    const day = d.getDate();
    d.setMonth(d.getMonth() + months);
    if (d.getDate() < day) d.setDate(0); // clamp 31 Jan + 1 month to 28/29 Feb
    return d.getTime();
  }

  function addYears(ts, years) {
    return addMonths(ts, years * 12);
  }

  /* =====================================================================
     ============  MockBillingBackend — FICTIONAL LAYER  =================
     =====================================================================
     Everything below, up to the "END OF FICTIONAL LAYER" marker, pretends
     to be a store server. It never touches localStorage, never touches the
     DOM and never emits events — it only answers questions and returns
     patches for the adapter to apply.

     TO GO LIVE: replace this single object with one that talks to the
     Digital Goods API + Play Billing. Keep the method names and the shape
     of the returned objects and no other file needs to change. A real
     backend MUST set SOURCE to 'PLAY' so that stale demo state is
     detectable and can be discarded on first run.
     ===================================================================== */
  const MockBillingBackend = {
    SOURCE: 'MOCK',
    IS_MOCK: true,
    PACKAGE_NAME: 'pl.przyklad.blueMonitor',

    // Simulated store timings. QA can retune them through setSimulation().
    latencyMs: 1200,
    restoreLatencyMs: 900,
    signInLatencyMs: 700,
    failNext: false,
    unavailable: false,

    // Raw catalogue. priceText/spoken text are derived once at boot so the
    // digits and the words can never disagree.
    RAW_CATALOGUE: [
      {
        id: PRODUCT_IDS.LIFETIME,
        type: 'inapp',
        plan: 'lifetime',
        namePL: 'Premium dożywotnio',
        priceMinor: 14999,
        periodText: 'jednorazowo',
        perMonthText: null,
        savingsText: null,
        badgePL: 'NAJLEPSZA WARTOŚĆ',
        subPL: 'Bez odnawiania. Płacisz raz i korzystasz zawsze.',
        spokenSuffixPL: 'płatność jednorazowa, bez odnawiania',
        termsPL: '149,99 zł, płatność jednorazowa. To nie jest subskrypcja — nic się nie odnawia i nie pobierzemy kolejnej opłaty. Podstawowe funkcje pomiaru (kamera, gałki, wykresy, tabela, progi, Dokumentacja) pozostają bezpłatne.',
        termsTrialPL: null,
        ctaPL: 'Zamawiam i płacę — 149,99 zł jednorazowo',
        ctaTrialPL: null,
        hasTrial: false,
        trialDays: 0,
        featureIds: FEATURE_IDS.slice(),
        visibleOnPaywall: true
      },
      {
        id: PRODUCT_IDS.YEARLY,
        type: 'subs',
        plan: 'yearly',
        namePL: 'Premium rocznie',
        priceMinor: 7999,
        periodText: 'rocznie (odnawia się automatycznie)',
        perMonthText: 'to około 6,67 zł miesięcznie — kwota pobierana jednorazowo raz w roku',
        savingsText: 'Oszczędzasz około 67% względem planu miesięcznego',
        badgePL: 'Z 7-DNIOWYM OKRESEM PRÓBNYM',
        subPL: 'Dostępne 7 dni bezpłatnie. Możesz anulować w każdej chwili.',
        spokenSuffixPL: 'rocznie, to jest około sześć złotych sześćdziesiąt siedem groszy miesięcznie, pobierane jednorazowo raz w roku',
        termsPL: '79,99 zł rocznie. Subskrypcja odnawia się automatycznie co rok, aż do anulowania. Możesz anulować w każdej chwili w Google Play → Subskrypcje, najpóźniej 24 godziny przed końcem okresu rozliczeniowego. Podstawowe funkcje pomiaru pozostają bezpłatne.',
        termsTrialPL: '7 dni bezpłatnie, potem 79,99 zł rocznie. Subskrypcja odnawia się automatycznie co rok, aż do anulowania. Okres próbny kończy się {DATA_KONCA_PROBY}. Aby uniknąć opłaty, anuluj co najmniej 24 godziny wcześniej w Google Play → Subskrypcje albo na ekranie Konto i subskrypcja. To wersja demonstracyjna — żadna opłata nie zostanie pobrana.',
        ctaPL: 'Zamawiam i płacę — 79,99 zł / rok',
        ctaTrialPL: 'Zamawiam z obowiązkiem zapłaty — 7 dni bezpłatnie, potem 79,99 zł / rok',
        hasTrial: true,
        trialDays: TRIAL_DAYS,
        featureIds: FEATURE_IDS.slice(),
        visibleOnPaywall: true
      },
      {
        id: PRODUCT_IDS.MONTHLY,
        type: 'subs',
        plan: 'monthly',
        namePL: 'Premium miesięcznie',
        priceMinor: 1999,
        periodText: 'miesięcznie (odnawia się automatycznie)',
        perMonthText: null,
        savingsText: null,
        badgePL: '',
        subPL: 'Odnawia się co miesiąc. Możesz anulować w każdej chwili.',
        spokenSuffixPL: 'miesięcznie, odnawia się automatycznie co miesiąc',
        termsPL: '19,99 zł miesięcznie. Subskrypcja odnawia się automatycznie co miesiąc, aż do anulowania. Możesz anulować w każdej chwili w Google Play → Subskrypcje, najpóźniej 24 godziny przed końcem okresu rozliczeniowego. Podstawowe funkcje pomiaru pozostają bezpłatne.',
        termsTrialPL: null,
        ctaPL: 'Zamawiam i płacę — 19,99 zł / miesiąc',
        ctaTrialPL: null,
        hasTrial: false,
        trialDays: 0,
        featureIds: FEATURE_IDS.slice(),
        visibleOnPaywall: true
      },
      {
        id: PRODUCT_IDS.REMOVE_ADS,
        type: 'inapp',
        plan: 'ads',
        namePL: 'Usunięcie reklam',
        priceMinor: 1299,
        periodText: 'jednorazowo',
        perMonthText: null,
        savingsText: null,
        badgePL: '',
        subPL: 'Usuwa wszystkie reklamy. Nie odblokowuje historii ani eksportu.',
        spokenSuffixPL: 'płatność jednorazowa, bez odnawiania',
        termsPL: '12,99 zł, płatność jednorazowa. Kupujesz wyłącznie usunięcie reklam — historia 30 dni, eksport CSV, raporty i profile progów pozostają częścią wersji Premium. Podstawowe funkcje pomiaru pozostają bezpłatne.',
        termsTrialPL: null,
        ctaPL: 'Zamawiam i płacę — 12,99 zł jednorazowo',
        ctaTrialPL: null,
        hasTrial: false,
        trialDays: 0,
        featureIds: [FEATURES.NO_ADS],
        // Deliberately absent from the main paywall — it only shows up next
        // to an ad slot, so it cannot cannibalise the Premium decision.
        visibleOnPaywall: false
      }
    ],

    // Fictional promo codes. A real backend would validate these server-side.
    PROMO_CODES: {
      WZROK30: {
        kind: 'discount',
        percent: 30,
        productId: PRODUCT_IDS.YEARLY,
        labelPL: 'Oferta powitalna −30% na pierwszy rok planu rocznego',
        descPL: 'oferta powitalna −30% na pierwszy rok planu rocznego'
      },
      DEMO7: {
        kind: 'grantDays',
        days: 7,
        productId: PRODUCT_IDS.YEARLY,
        labelPL: '7 dni wersji Premium (DEMO)',
        descPL: '7 dni wersji Premium (DEMO)'
      },
      PREMIUMDEMO: {
        kind: 'grantLifetime',
        productId: PRODUCT_IDS.LIFETIME,
        labelPL: 'Dożywotnie odblokowanie wersji Premium (DEMO)',
        descPL: 'dożywotnie odblokowanie wersji Premium (DEMO)'
      },
      BEZREKLAM: {
        kind: 'grantNoAds',
        productId: PRODUCT_IDS.REMOVE_ADS,
        labelPL: 'Usunięcie reklam (DEMO)',
        descPL: 'usunięcie reklam (DEMO)'
      }
    },

    now: function () { return Date.now(); },

    // A real adapter checks for the Digital Goods API here. The mock stays
    // usable in a plain browser, but keeps the unavailable path testable.
    isAvailable: function () { return !this.unavailable; },

    buildCatalogue: function () {
      const self = this;
      return this.RAW_CATALOGUE.map((raw) => {
        const product = clone(raw);
        product.currency = 'PLN';
        product.priceText = formatMinor(raw.priceMinor);
        product.spokenPrice = spokenMinor(raw.priceMinor) + ', ' + raw.spokenSuffixPL;
        product.source = self.SOURCE;
        return product;
      });
    },

    findProduct: function (catalogue, productId) {
      for (let i = 0; i < catalogue.length; i += 1) {
        if (catalogue[i].id === productId) return catalogue[i];
      }
      return null;
    },

    // Effective price after an applicable promo code. Discounts apply to the
    // first billing period only, which is why the caller stores the result
    // as priceMinor rather than mutating the catalogue.
    effectivePriceMinor: function (product, promoCode) {
      if (!product) return 0;
      const promo = promoCode ? this.PROMO_CODES[String(promoCode).toUpperCase()] : null;
      if (!promo || promo.kind !== 'discount') return product.priceMinor;
      if (promo.productId && promo.productId !== product.id) return product.priceMinor;
      return Math.round(product.priceMinor * (100 - promo.percent) / 100);
    },

    // Resolves a simulated purchase. Returns { code, messagePL, patch }.
    // `patch` is a partial BillingState the adapter merges and persists.
    purchase: function (product, opts, state) {
      const self = this;
      const outcome = opts.outcome || 'success';
      return delay(this.latencyMs).then(() => {
        if (self.failNext) {
          self.failNext = false;
          return {
            code: 'PAYMENT_ERROR',
            messagePL: 'Symulacja błędu płatności. Nic nie zostało kupione. Spróbuj ponownie lub zamknij ten ekran.',
            patch: null
          };
        }
        if (outcome === 'cancel') {
          return {
            code: 'USER_CANCELED',
            messagePL: 'Symulacja anulowana. Nic nie zostało kupione. Wszystkie funkcje pomiaru działają dalej bezpłatnie.',
            patch: null
          };
        }
        if (outcome === 'error') {
          return {
            code: 'PAYMENT_ERROR',
            messagePL: 'Symulacja błędu płatności. Nic nie zostało kupione. Spróbuj ponownie lub zamknij ten ekran.',
            patch: null
          };
        }
        if (product.id === PRODUCT_IDS.REMOVE_ADS && state.removeAdsOwned) {
          return {
            code: 'ALREADY_OWNED',
            messagePL: 'Reklamy są już usunięte na tym urządzeniu. Nie pobrano żadnej opłaty.',
            patch: null
          };
        }
        if (product.plan === 'lifetime' && state.plan === 'lifetime' && state.tier === 'premium') {
          return {
            code: 'ALREADY_OWNED',
            messagePL: 'Masz już wersję Premium dożywotnio. Nie pobrano żadnej opłaty.',
            patch: null
          };
        }
        if (opts.withTrial) {
          if (!product.hasTrial) {
            return {
              code: 'INVALID_PRODUCT',
              messagePL: 'Ten plan nie ma okresu próbnego.',
              patch: null
            };
          }
          if (state.trialUsed) {
            return {
              code: 'TRIAL_ALREADY_USED',
              messagePL: 'Okres próbny został już wykorzystany na tym urządzeniu.',
              patch: null
            };
          }
          return {
            code: 'OK',
            messagePL: 'Symulacja zakończona. Rozpoczął się 7-dniowy okres próbny (DEMO). Nie pobrano żadnej opłaty.',
            patch: self.buildTrialPatch(product, state)
          };
        }
        return {
          code: 'OK',
          messagePL: 'Symulacja zakończona. Wersja Premium (DEMO) została włączona. Nie pobrano żadnej opłaty.',
          patch: self.buildPurchasePatch(product, opts, state)
        };
      });
    },

    buildPurchasePatch: function (product, opts, state) {
      const t = this.now();
      const promoCode = opts.promoCode || state.promoCode || null;
      const priceMinor = this.effectivePriceMinor(product, promoCode);
      const patch = {
        source: this.SOURCE,
        purchasedAt: t,
        priceMinor: priceMinor,
        currency: 'PLN'
      };

      if (product.id === PRODUCT_IDS.REMOVE_ADS) {
        // Standalone consumable-style IAP: it grants noAds and nothing else,
        // and it must not overwrite an existing subscription record.
        patch.removeAdsOwned = true;
        if (state.tier === 'free') {
          patch.productId = product.id;
          patch.plan = 'ads';
        }
        return patch;
      }

      patch.productId = product.id;
      patch.plan = product.plan;
      patch.tier = 'premium';
      patch.status = 'active';
      patch.startedAt = t;

      if (product.plan === 'lifetime') {
        patch.autoRenewing = false;
        patch.renewsAt = null;
        patch.expiresAt = null;   // null means "never expires"
      } else if (product.plan === 'yearly') {
        patch.autoRenewing = true;
        patch.renewsAt = addYears(t, 1);
        patch.expiresAt = patch.renewsAt;
      } else {
        patch.autoRenewing = true;
        patch.renewsAt = addMonths(t, 1);
        patch.expiresAt = patch.renewsAt;
      }

      if (promoCode) {
        const promo = this.PROMO_CODES[String(promoCode).toUpperCase()];
        patch.promoCode = promoCode;
        patch.promoDiscountPercent = (promo && promo.kind === 'discount') ? promo.percent : null;
      }
      return patch;
    },

    // Local, card-free trial (Sleep as Android pattern). Play Billing always
    // wants a payment method attached, so a real trial would be a subscription
    // offer instead — that is a backend concern, not a UI one.
    buildTrialPatch: function (product, state) {
      const t = this.now();
      const ends = t + TRIAL_DAYS * DAY_MS;
      return {
        source: this.SOURCE,
        tier: 'trial',
        status: 'trial',
        productId: product.id,
        plan: product.plan,
        autoRenewing: false,
        purchasedAt: null,
        startedAt: t,
        renewsAt: null,
        expiresAt: ends,
        trialUsed: true,
        trialStartedAt: t,
        trialEndsAt: ends,
        priceMinor: 0,
        currency: 'PLN'
      };
    },

    startTrial: function (product, state) {
      const self = this;
      return delay(this.latencyMs).then(() => {
        if (state.trialUsed) {
          return {
            code: 'TRIAL_ALREADY_USED',
            messagePL: 'Okres próbny został już wykorzystany na tym urządzeniu. Wersja darmowa działa dalej bez ograniczeń.',
            patch: null
          };
        }
        if (state.tier === 'premium') {
          return {
            code: 'ALREADY_OWNED',
            messagePL: 'Masz już wersję Premium — okres próbny nie jest potrzebny.',
            patch: null
          };
        }
        return {
          code: 'OK',
          messagePL: 'Rozpoczął się 7-dniowy okres próbny (DEMO). Nie pobrano żadnej opłaty i nie potrzeba karty.',
          patch: self.buildTrialPatch(product, state)
        };
      });
    },

    // "Restore" in the mock re-reads the persisted receipt. A real adapter
    // would query the Play library for the signed-in Google account.
    //
    // readReceipt is a function, not a value, on purpose: the query has to
    // happen when the (simulated) round trip finishes, not when it starts.
    // Reading it up front would let a purchase that completes mid-flight be
    // overwritten by the stale snapshot.
    restore: function (readReceipt) {
      return delay(this.restoreLatencyMs).then(() => {
        const receipt = readReceipt();
        const owns = !!(receipt && (
          receipt.tier === 'premium' ||
          receipt.tier === 'trial' ||
          receipt.removeAdsOwned === true
        ));
        if (!owns) {
          return {
            code: 'NOTHING_TO_RESTORE',
            messagePL: 'Nie znaleziono zapisanych zakupów na tym urządzeniu (DEMO).',
            patch: null,
            receipt: receipt
          };
        }
        return {
          code: 'OK',
          messagePL: 'Przywrócono dostęp do wersji Premium.',
          patch: null,          // nothing to change: the receipt already matches
          receipt: receipt
        };
      });
    },

    cancel: function (state) {
      return delay(this.restoreLatencyMs).then(() => {
        if (state.plan === 'lifetime' || state.tier === 'free' || state.status === 'none' || state.status === 'expired') {
          return {
            code: 'NOT_SUBSCRIBED',
            messagePL: 'Nie masz aktywnej subskrypcji do anulowania. Zakup dożywotni nie odnawia się i nie wymaga anulowania.',
            patch: null
          };
        }
        return {
          code: 'OK',
          messagePL: 'Subskrypcja została anulowana. Zachowujesz dostęp do końca opłaconego okresu.',
          patch: { status: 'canceled', autoRenewing: false, renewsAt: null }
        };
      });
    },

    resume: function (state) {
      return delay(this.restoreLatencyMs).then(() => {
        if (state.status !== 'canceled' && state.status !== 'paused') {
          return {
            code: 'NOT_SUBSCRIBED',
            messagePL: 'Nie ma anulowanej subskrypcji do wznowienia.',
            patch: null
          };
        }
        return {
          code: 'OK',
          messagePL: 'Subskrypcja została wznowiona.',
          patch: { status: 'active', autoRenewing: true, renewsAt: state.expiresAt }
        };
      });
    },

    changePlan: function (product, state) {
      const self = this;
      return delay(this.restoreLatencyMs).then(() => {
        if (product.id === state.productId && state.tier === 'premium') {
          return {
            code: 'ALREADY_OWNED',
            messagePL: 'To jest Twój obecny plan.',
            patch: null
          };
        }
        return {
          code: 'OK',
          messagePL: 'Plan został zmieniony na: ' + product.namePL + ' (symulacja).',
          patch: self.buildPurchasePatch(product, {}, state)
        };
      });
    },

    redeem: function (rawCode, state, redeemedCodes) {
      const self = this;
      const code = String(rawCode || '').trim().toUpperCase();
      return delay(this.restoreLatencyMs).then(() => {
        const promo = self.PROMO_CODES[code];
        if (!promo) {
          return { code: 'INVALID_CODE', messagePL: 'Nieznany kod promocyjny.', patch: null, promoId: code };
        }
        if (redeemedCodes.indexOf(code) >= 0) {
          return { code: 'CODE_USED', messagePL: 'Ten kod został już wykorzystany.', patch: null, promoId: code };
        }
        const t = self.now();
        let patch = null;
        if (promo.kind === 'discount') {
          patch = { promoCode: code, promoDiscountPercent: promo.percent };
        } else if (promo.kind === 'grantDays') {
          patch = {
            source: self.SOURCE,
            tier: 'premium',
            status: 'active',
            productId: promo.productId,
            plan: 'yearly',
            autoRenewing: false,
            purchasedAt: t,
            startedAt: t,
            renewsAt: null,
            expiresAt: t + promo.days * DAY_MS,
            priceMinor: 0,
            promoCode: code,
            promoDiscountPercent: 100
          };
        } else if (promo.kind === 'grantLifetime') {
          patch = {
            source: self.SOURCE,
            tier: 'premium',
            status: 'active',
            productId: promo.productId,
            plan: 'lifetime',
            autoRenewing: false,
            purchasedAt: t,
            startedAt: t,
            renewsAt: null,
            expiresAt: null,
            priceMinor: 0,
            promoCode: code,
            promoDiscountPercent: 100
          };
        } else if (promo.kind === 'grantNoAds') {
          patch = { removeAdsOwned: true, promoCode: code, promoDiscountPercent: 100 };
        }
        return {
          code: 'OK',
          messagePL: 'Kod zastosowany: ' + promo.descPL + '.',
          patch: patch,
          promoId: code
        };
      });
    },

    // Fictional account. Deliberately NOT Google Sign-In: no OAuth, no
    // network, no identity — just a string kept on the device.
    signIn: function (rawEmail) {
      return delay(this.signInLatencyMs).then(() => {
        const email = String(rawEmail || '').trim();
        const valid = email.length >= 5 && email.indexOf('@') > 0 && email.indexOf('.', email.indexOf('@')) > 0;
        if (!valid) {
          return {
            code: 'INVALID_EMAIL',
            messagePL: 'Podaj poprawny adres e-mail, na przykład jan@przyklad.pl.',
            account: null
          };
        }
        return {
          code: 'OK',
          messagePL: 'Zalogowano do konta demonstracyjnego. To nie jest konto Google.',
          account: {
            signedIn: true,
            email: email,
            displayName: 'Konto demonstracyjne',
            avatarLetter: email.charAt(0).toUpperCase(),
            signedInAt: this.now()
          }
        };
      });
    },

    signOut: function () {
      return delay(this.signInLatencyMs).then(() => ({
        code: 'OK',
        messagePL: 'Wylogowano z konta demonstracyjnego. Zakupy pozostają na tym urządzeniu.',
        account: null
      }));
    },

    manageUrl: function (state) {
      const base = 'https://play.google.com/store/account/subscriptions';
      // Nothing bought, or a one-off lifetime purchase: there is no
      // subscription to deep-link to, so never build a "?sku=" with an
      // empty value — the UI shows this string to the user.
      if (!state.productId || state.plan === 'lifetime' || state.plan === 'ads') return base;
      return base + '?sku=' + encodeURIComponent(state.productId) +
        '&package=' + encodeURIComponent(this.PACKAGE_NAME);
    },

    // Never navigates anywhere. The UI shows its own DEMO screen instead.
    openManage: function () {
      return delay(200).then(() => ({
        code: 'OK',
        messagePL: 'To wersja demonstracyjna — w prawdziwej aplikacji nastąpiłoby przejście do Google Play → Subskrypcje. Tutaj nic nie zostało otwarte.',
        patch: null
      }));
    }
  };
  /* ==================  END OF FICTIONAL LAYER  ======================== */

  /* ------------------------------------------------------------------
     Event bus. A listener that throws must not stop the others — the ad
     layer and the nav bar both subscribe to 'change' and one broken
     redraw cannot be allowed to freeze the paywall.
     ------------------------------------------------------------------ */
  const listeners = Object.create(null);

  function on(event, cb) {
    if (typeof cb !== 'function' || !event) return;
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(cb);
  }

  function off(event, cb) {
    const list = listeners[event];
    if (!list) return;
    for (let i = list.length - 1; i >= 0; i -= 1) {
      if (list[i] === cb || list[i].__originalCb === cb) list.splice(i, 1);
    }
  }

  function once(event, cb) {
    if (typeof cb !== 'function') return;
    function wrapper(payload) {
      off(event, wrapper);
      cb(payload);
    }
    wrapper.__originalCb = cb;
    on(event, wrapper);
  }

  function emit(event, extra) {
    const list = listeners[event];
    if (!list || !list.length) return;
    const payload = { state: publicState(), event: event };
    if (extra) {
      Object.keys(extra).forEach((k) => { payload[k] = extra[k]; });
    }
    list.slice().forEach((cb) => {
      try {
        cb(payload);
      } catch (err) {
        // Swallowed on purpose: one bad subscriber must not break the rest.
      }
    });
  }

  /* ------------------------------------------------------------------
     State
     ------------------------------------------------------------------ */
  const CATALOGUE = MockBillingBackend.buildCatalogue();

  function emptyFeatures() {
    const out = {};
    FEATURE_IDS.forEach((id) => { out[id] = false; });
    return out;
  }

  function defaultState() {
    return {
      version: STATE_VERSION,
      source: MockBillingBackend.SOURCE,
      tier: 'free',
      status: 'none',
      productId: null,
      plan: null,
      autoRenewing: false,
      purchasedAt: null,
      startedAt: null,
      renewsAt: null,
      expiresAt: null,
      trialUsed: false,
      trialStartedAt: null,
      trialEndsAt: null,
      promoCode: null,
      promoDiscountPercent: null,
      priceMinor: null,
      currency: 'PLN',
      adsEnabled: true,
      adsConsent: 'unknown',
      account: null,
      temporaryEntitlements: {},
      // Standalone "remove ads" IAP is an entitlement, not a tier — kept as
      // its own flag so buying it never masquerades as a Premium purchase.
      removeAdsOwned: false,
      features: emptyFeatures(),
      updatedAt: 0
    };
  }

  let state = defaultState();
  let initPromise = null;
  let lastRestoreAt = 0;
  let restoreInFlight = false;
  let purchaseInFlight = 0;

  function num(value) {
    return (typeof value === 'number' && isFinite(value)) ? value : null;
  }

  function oneOf(value, allowed, fallback) {
    return allowed.indexOf(value) >= 0 ? value : fallback;
  }

  function normalizeState(raw) {
    const next = defaultState();
    if (!raw || typeof raw !== 'object') return next;
    next.tier = oneOf(raw.tier, ['free', 'trial', 'premium'], 'free');
    next.status = oneOf(raw.status, ['none', 'trial', 'active', 'canceled', 'grace', 'on_hold', 'paused', 'expired'], 'none');
    next.productId = (typeof raw.productId === 'string') ? raw.productId : null;
    next.plan = oneOf(raw.plan, ['monthly', 'yearly', 'lifetime', 'ads'], null);
    next.autoRenewing = raw.autoRenewing === true;
    next.purchasedAt = num(raw.purchasedAt);
    next.startedAt = num(raw.startedAt);
    next.renewsAt = num(raw.renewsAt);
    next.expiresAt = num(raw.expiresAt);
    next.trialUsed = raw.trialUsed === true;
    next.trialStartedAt = num(raw.trialStartedAt);
    next.trialEndsAt = num(raw.trialEndsAt);
    next.promoCode = (typeof raw.promoCode === 'string') ? raw.promoCode : null;
    next.promoDiscountPercent = num(raw.promoDiscountPercent);
    next.priceMinor = num(raw.priceMinor);
    next.currency = (typeof raw.currency === 'string' && raw.currency) ? raw.currency : 'PLN';
    next.adsConsent = oneOf(raw.adsConsent, ['unknown', 'granted', 'denied'], 'unknown');
    next.removeAdsOwned = raw.removeAdsOwned === true;
    next.updatedAt = num(raw.updatedAt) || 0;
    next.source = (typeof raw.source === 'string' && raw.source) ? raw.source : MockBillingBackend.SOURCE;

    if (raw.temporaryEntitlements && typeof raw.temporaryEntitlements === 'object') {
      FEATURE_IDS.forEach((id) => {
        const until = num(raw.temporaryEntitlements[id]);
        if (until) next.temporaryEntitlements[id] = until;
      });
    }
    return next;
  }

  function loadAccount() {
    const raw = readJson(ACCOUNT_KEY);
    if (!raw || raw.signedIn !== true || typeof raw.email !== 'string') return null;
    return {
      signedIn: true,
      email: raw.email,
      displayName: (typeof raw.displayName === 'string' && raw.displayName) ? raw.displayName : 'Konto demonstracyjne',
      avatarLetter: (typeof raw.avatarLetter === 'string' && raw.avatarLetter) ? raw.avatarLetter : raw.email.charAt(0).toUpperCase(),
      signedInAt: num(raw.signedInAt) || 0
    };
  }

  function defaultPromoStore() {
    return {
      redeemedCodes: [],
      welcomeOfferStartedAt: null,
      lastPaywallDismissedAt: null,
      dismissReasons: []
    };
  }

  function loadPromoStore() {
    const raw = readJson(PROMO_KEY);
    const store = defaultPromoStore();
    if (!raw) return store;
    if (Array.isArray(raw.redeemedCodes)) {
      store.redeemedCodes = raw.redeemedCodes.filter((c) => typeof c === 'string');
    }
    store.welcomeOfferStartedAt = num(raw.welcomeOfferStartedAt);
    store.lastPaywallDismissedAt = num(raw.lastPaywallDismissedAt);
    if (Array.isArray(raw.dismissReasons)) {
      store.dismissReasons = raw.dismissReasons.filter((r) => typeof r === 'string').slice(-20);
    }
    return store;
  }

  let promoStore = defaultPromoStore();

  function savePromoStore() {
    writeJson(PROMO_KEY, promoStore);
  }

  /* Which entitlements are owned outright, ignoring rewarded-ad grants.
     Kept beside the state rather than inside it so that BillingState stays
     exactly the shape the contract describes. */
  let permanentFeatures = emptyFeatures();

  /* Derived entitlements. This is the ONLY place where "who gets what" is
     decided, so a gating change never has to be repeated in the UI. */
  function computeFeatures(target) {
    const owned = emptyFeatures();
    const features = emptyFeatures();
    const now = Date.now();
    const premium = target.tier === 'premium' || target.tier === 'trial';

    if (premium) {
      const product = MockBillingBackend.findProduct(CATALOGUE, target.productId);
      const granted = (product && target.tier === 'premium' && product.plan === 'ads')
        ? product.featureIds
        : FEATURE_IDS;
      granted.forEach((id) => { owned[id] = true; });
    }

    // Standalone remove-ads IAP grants exactly one entitlement.
    if (target.removeAdsOwned) owned[FEATURES.NO_ADS] = true;

    FEATURE_IDS.forEach((id) => { features[id] = owned[id]; });

    // Rewarded-ad grants are indistinguishable from paid ones to the UI —
    // that is the point: no caller has to special-case a temporary unlock.
    FEATURE_IDS.forEach((id) => {
      const until = target.temporaryEntitlements[id];
      if (typeof until === 'number' && until > now) features[id] = true;
    });

    permanentFeatures = owned;
    target.features = features;
    target.adsEnabled = !features[FEATURES.NO_ADS];
    return target;
  }

  function persist() {
    writeJson(BILLING_KEY, {
      version: state.version,
      source: state.source,
      tier: state.tier,
      status: state.status,
      productId: state.productId,
      plan: state.plan,
      autoRenewing: state.autoRenewing,
      purchasedAt: state.purchasedAt,
      startedAt: state.startedAt,
      renewsAt: state.renewsAt,
      expiresAt: state.expiresAt,
      trialUsed: state.trialUsed,
      trialStartedAt: state.trialStartedAt,
      trialEndsAt: state.trialEndsAt,
      promoCode: state.promoCode,
      promoDiscountPercent: state.promoDiscountPercent,
      priceMinor: state.priceMinor,
      currency: state.currency,
      adsConsent: state.adsConsent,
      removeAdsOwned: state.removeAdsOwned,
      temporaryEntitlements: state.temporaryEntitlements,
      updatedAt: state.updatedAt
    });
  }

  function publicState() {
    const copy = clone(state);
    copy.account = state.account ? clone(state.account) : null;
    return copy;
  }

  // Applies a backend patch, recomputes entitlements, persists and notifies.
  function commit(patch, options) {
    const opts = options || {};
    if (patch) {
      Object.keys(patch).forEach((key) => { state[key] = patch[key]; });
    }
    state.version = STATE_VERSION;
    state.updatedAt = Date.now();
    computeFeatures(state);
    persist();
    if (!opts.silent) emit('change', opts.extra || null);
    return publicState();
  }

  /* Expiry sweep. Runs at init and whenever the tab becomes visible again;
     a phone can sit backgrounded for days and come back with a dead trial. */
  function sweepExpired() {
    const now = Date.now();
    let changed = false;
    let trialJustExpired = false;

    if (state.tier === 'trial' && state.trialEndsAt && now >= state.trialEndsAt) {
      // Data collected during the trial is deliberately NOT cleared — taking
      // a user's own measurements away for not paying is a hostile pattern.
      state.tier = 'free';
      state.status = 'expired';
      state.autoRenewing = false;
      state.expiresAt = state.trialEndsAt;
      changed = true;
      trialJustExpired = true;
    }

    if (state.tier === 'premium' && state.plan !== 'lifetime' &&
        state.expiresAt && now >= state.expiresAt) {
      state.tier = 'free';
      state.status = 'expired';
      state.autoRenewing = false;
      changed = true;
    }

    Object.keys(state.temporaryEntitlements).forEach((id) => {
      const until = state.temporaryEntitlements[id];
      if (typeof until !== 'number' || until <= now) {
        delete state.temporaryEntitlements[id];
        changed = true;
      }
    });

    return { changed: changed, trialExpired: trialJustExpired };
  }

  /* Result codes returned by this file. Each one means exactly one thing, so
     a caller may branch on `code` and not only on `ok`:
       OK, INVALID_PRODUCT (no such product in the catalogue), INVALID_FEATURE,
       INVALID_EMAIL, INVALID_CONSENT, INVALID_CODE (promo code), CONSENT_REQUIRED,
       USER_CANCELED, PAYMENT_ERROR, ALREADY_OWNED, NOT_SUBSCRIBED,
       TRIAL_ALREADY_USED, CODE_USED, NOTHING_TO_RESTORE, STORAGE_UNAVAILABLE,
       UNAVAILABLE_IN_BROWSER. */
  function result(ok, code, messagePL) {
    return { ok: ok, code: code, messagePL: messagePL, state: publicState() };
  }

  function fromBackend(res) {
    const ok = res.code === 'OK';
    if (res.patch) {
      commit(res.patch);
    }
    return result(ok, res.code, res.messagePL);
  }

  /* ------------------------------------------------------------------
     Auto-restore. Play recommends re-querying the library when the app
     comes back to the foreground; throttled so tab flipping is free.
     ------------------------------------------------------------------ */
  function maybeAutoRestore() {
    const now = Date.now();
    // Never query the library while a purchase is resolving: the answer would
    // describe the world as it was before the purchase landed.
    if (purchaseInFlight > 0 || restoreInFlight) return;
    if (now - lastRestoreAt < RESTORE_THROTTLE_MS) return;
    Billing.restorePurchases();
  }

  function attachVisibilityHook() {
    try {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') maybeAutoRestore();
      });
    } catch (err) {
      // No document (unlikely) — nothing to hook, the app still works.
    }
  }

  /* ------------------------------------------------------------------
     Public API
     ------------------------------------------------------------------ */
  // Effective price when a redeemed code actually changes it, otherwise null.
  function discountedPrice(product) {
    if (!product) return null;
    const effective = MockBillingBackend.effectivePriceMinor(product, state.promoCode);
    return effective === product.priceMinor ? null : effective;
  }

  // One sentence stating the amount that will really be charged, and what
  // happens after the discounted period. Empty when no code is active.
  function promoNote(product) {
    const discounted = discountedPrice(product);
    if (discounted === null) return '';
    const renewal = RENEWAL_PERIOD_PL[product.plan];
    return 'Cena po rabacie (kod ' + String(state.promoCode).toUpperCase() + '): ' +
      formatMinor(discounted) + ' ' + firstPeriodPL(product) +
      (renewal ? (', potem ' + formatMinor(product.priceMinor) + ' ' + renewal) : '') + '.';
  }

  const Billing = {

    VERSION: 'mock-1.0.0',
    IS_MOCK: MockBillingBackend.IS_MOCK,
    FEATURES: FEATURES,
    PRODUCT_IDS: PRODUCT_IDS,
    FEATURE_INFO: FEATURE_INFO,
    CORE_FREE_FEATURES: CORE_FREE_FEATURES.slice(),
    TRIAL_DAYS: TRIAL_DAYS,

    /* --- lifecycle --- */

    init: function () {
      if (initPromise) return initPromise;
      initPromise = new Promise((resolve) => {
        state = normalizeState(readJson(BILLING_KEY));
        state.account = loadAccount();
        promoStore = loadPromoStore();

        const sweep = sweepExpired();
        computeFeatures(state);
        persist();

        emit('ready');
        if (sweep.trialExpired) emit('trial:expired');
        if (sweep.changed) emit('change');

        attachVisibilityHook();
        resolve(publicState());

        // Kick the library query off after 'ready' so subscribers that were
        // added synchronously still see the restore events.
        setTimeout(() => { maybeAutoRestore(); }, 0);
      });
      return initPromise;
    },

    isAvailable: function () {
      return MockBillingBackend.isAvailable();
    },

    /* --- state reads (cheap, synchronous, safe to call often) --- */

    getState: function () {
      return publicState();
    },

    isPremium: function () {
      return state.tier === 'premium' || state.tier === 'trial';
    },

    isTrial: function () {
      return state.tier === 'trial';
    },

    hasFeature: function (featureId) {
      if (!featureId) return false;
      if (CORE_FREE_FEATURES.indexOf(featureId) >= 0) return true;
      if (state.features[featureId] === true) return true;
      return Billing.hasTemporaryEntitlement(featureId);
    },

    featureExpiresAt: function (featureId) {
      const until = state.temporaryEntitlements[featureId];
      if (typeof until === 'number' && until > Date.now()) return until;
      return null;
    },

    daysLeftOfTrial: function () {
      if (state.tier !== 'trial' || !state.trialEndsAt) return 0;
      const left = state.trialEndsAt - Date.now();
      if (left <= 0) return 0;
      return Math.ceil(left / DAY_MS);
    },

    /* --- gating helpers (so no UI file re-derives the rules) --- */

    getFeatureIds: function () {
      return FEATURE_IDS.slice();
    },

    isCoreFree: function (featureId) {
      return CORE_FREE_FEATURES.indexOf(featureId) >= 0;
    },

    // What a given tier would unlock, ignoring the current state. Used by the
    // comparison table and by "what you get" lists.
    featuresForTier: function (tier) {
      const features = emptyFeatures();
      if (tier === 'premium' || tier === 'trial') {
        FEATURE_IDS.forEach((id) => { features[id] = true; });
      }
      return features;
    },

    isFeatureAvailableInTier: function (featureId, tier) {
      if (CORE_FREE_FEATURES.indexOf(featureId) >= 0) return true;
      return Billing.featuresForTier(tier)[featureId] === true;
    },

    // One object with everything a lock screen needs to explain itself.
    describeFeature: function (featureId) {
      const info = FEATURE_INFO[featureId];
      if (!info) {
        return {
          id: featureId,
          labelPL: '',
          descPL: '',
          freeFallbackPL: '',
          rewardable: false,
          rewardMs: 0,
          coreFree: CORE_FREE_FEATURES.indexOf(featureId) >= 0,
          unlocked: Billing.hasFeature(featureId),
          temporary: false,
          expiresAt: null
        };
      }
      const expiresAt = Billing.featureExpiresAt(featureId);
      return {
        id: featureId,
        labelPL: info.labelPL,
        descPL: info.descPL,
        freeFallbackPL: info.freeFallbackPL,
        rewardable: info.rewardable,
        rewardMs: info.rewardMs,
        coreFree: false,
        unlocked: Billing.hasFeature(featureId),
        // True only when the unlock came from a rewarded ad and will lapse.
        temporary: expiresAt !== null && permanentFeatures[featureId] !== true,
        expiresAt: expiresAt
      };
    },

    // Owned outright, as opposed to unlocked by a rewarded ad. The UI uses
    // this to decide whether to say "do {DATA}" next to an unlocked feature.
    hasPermanentFeature: function (featureId) {
      if (CORE_FREE_FEATURES.indexOf(featureId) >= 0) return true;
      return permanentFeatures[featureId] === true;
    },

    /* --- catalogue --- */

    getProducts: function () {
      return CATALOGUE.map(clone);
    },

    getProduct: function (productId) {
      const found = MockBillingBackend.findProduct(CATALOGUE, productId);
      return found ? clone(found) : null;
    },

    getDefaultProductId: function () {
      return PRODUCT_IDS.LIFETIME;
    },

    // Price after any active promo code — the paywall shows this, not the
    // catalogue price, so the button and the terms always agree.
    getEffectivePriceMinor: function (productId) {
      const product = MockBillingBackend.findProduct(CATALOGUE, productId);
      if (!product) return null;
      return MockBillingBackend.effectivePriceMinor(product, state.promoCode);
    },

    // Terms block for the selected plan. `withTrial` swaps in the trial
    // wording and substitutes the real end date. A redeemed discount code is
    // spelled out first: the catalogue literals quote the undiscounted price,
    // and showing an amount other than the one charged would misstate the
    // price (consumer law + Play's price-transparency rules).
    formatTerms: function (productId, withTrial) {
      const product = MockBillingBackend.findProduct(CATALOGUE, productId);
      if (!product) return '';
      let base;
      if (withTrial && product.termsTrialPL) {
        const ends = Date.now() + TRIAL_DAYS * DAY_MS;
        base = product.termsTrialPL.replace('{DATA_KONCA_PROBY}', formatDatePL(ends));
      } else {
        base = product.termsPL;
      }
      const discounted = discountedPrice(product);
      if (discounted === null) return base;
      const catalogue = formatMinor(product.priceMinor);
      const renewal = RENEWAL_PERIOD_PL[product.plan];
      // For a subscription the discount covers the first period only, so the
      // renewal amount has to stay visible in the same breath as the
      // discounted one - substituting every occurrence would read as "55,99 zl
      // every year", which misstates the renewal price (Play's price
      // transparency rules). Rewrite the first "<price> <period>" phrase and
      // leave every later mention of the catalogue amount alone.
      if (renewal) {
        const phrase = catalogue + ' ' + renewal;
        const at = base.indexOf(phrase);
        if (at !== -1) {
          const spelled = formatMinor(discounted) + ' ' + firstPeriodPL(product) +
            ', a następnie ' + phrase;
          base = base.slice(0, at) + spelled + base.slice(at + phrase.length);
          // Both amounts are already spelled out above, so all that is left to
          // add is which code caused the lower one.
          return base + ' Niższa cena pierwszego okresu wynika z kodu ' +
            String(state.promoCode).toUpperCase() + '.';
        }
      }
      // One-off products have a single amount and no renewal: swapping it is
      // both safe and the only correct thing to show.
      return base.split(catalogue).join(formatMinor(discounted)) +
        ' ' + promoNote(product);
    },

    formatCta: function (productId, withTrial) {
      const product = MockBillingBackend.findProduct(CATALOGUE, productId);
      if (!product) return '';
      const discounted = discountedPrice(product);
      if (discounted !== null) {
        const amount = formatMinor(discounted) + ' ' + firstPeriodPL(product);
        return (withTrial && product.ctaTrialPL)
          ? ('Zamawiam z obowiązkiem zapłaty — ' + product.trialDays + ' dni bezpłatnie, potem ' + amount)
          : ('Zamawiam i płacę — ' + amount);
      }
      if (withTrial && product.ctaTrialPL) return product.ctaTrialPL;
      return product.ctaPL;
    },

    /* --- purchase --- */

    startPurchase: function (productId, options) {
      const opts = options || {};
      emit('purchase:start', { productId: productId, options: clone(opts) });

      const product = MockBillingBackend.findProduct(CATALOGUE, productId);
      if (!product) {
        emit('purchase:error', { productId: productId, code: 'INVALID_PRODUCT' });
        return Promise.resolve(result(false, 'INVALID_PRODUCT', 'Nie znaleziono takiego produktu.'));
      }
      if (!MockBillingBackend.isAvailable()) {
        emit('purchase:error', { productId: productId, code: 'UNAVAILABLE_IN_BROWSER' });
        return Promise.resolve(result(false, 'UNAVAILABLE_IN_BROWSER',
          'Zakup jest dostępny tylko w wersji aplikacji zainstalowanej z Google Play. W przeglądarce wszystkie funkcje pomiarowe działają bezpłatnie.'));
      }
      if (opts.consumerConsent !== true) {
        // Consumer-rights statement is legally required before starting a
        // digital service inside the 14-day withdrawal window.
        emit('purchase:error', { productId: productId, code: 'CONSENT_REQUIRED' });
        return Promise.resolve(result(false, 'CONSENT_REQUIRED', 'Aby kontynuować, zaznacz powyższe oświadczenie.'));
      }

      emit('purchase:pending', { productId: productId });
      purchaseInFlight += 1;

      return MockBillingBackend.purchase(product, opts, state).then((res) => {
        if (res.code === 'OK') {
          const isTrial = !!(opts.withTrial && product.hasTrial);
          if (res.patch) commit(res.patch, { silent: true });
          if (isTrial) emit('trial:start', { productId: productId });
          emit('purchase:success', { productId: productId, withTrial: isTrial });
          emit('change');
          return result(true, 'OK', res.messagePL);
        }
        if (res.code === 'USER_CANCELED') {
          emit('purchase:cancel', { productId: productId });
        } else {
          emit('purchase:error', { productId: productId, code: res.code });
        }
        // The contract promises 'change' as the LAST event of every purchase
        // attempt — it is the only event the surfaces subscribe to, so a
        // cancelled or failed attempt has to repaint them too.
        emit('change');
        return result(false, res.code, res.messagePL);
      }).catch(() => result(false, 'PAYMENT_ERROR',
        'Symulacja błędu płatności. Nic nie zostało kupione. Spróbuj ponownie lub zamknij ten ekran.')
      ).then((finalResult) => {
        // Released only once the result is fully settled and persisted, so a
        // background restore can never observe a half-finished purchase.
        purchaseInFlight = Math.max(0, purchaseInFlight - 1);
        return finalResult;
      });
    },

    startTrial: function (productId) {
      const id = productId || PRODUCT_IDS.YEARLY;
      const product = MockBillingBackend.findProduct(CATALOGUE, id);
      if (!product) {
        return Promise.resolve(result(false, 'INVALID_PRODUCT', 'Nie znaleziono takiego produktu.'));
      }
      return MockBillingBackend.startTrial(product, state).then((res) => {
        if (res.code !== 'OK') return result(false, res.code, res.messagePL);
        commit(res.patch, { silent: true });
        emit('trial:start', { productId: id });
        emit('change');
        return result(true, 'OK', res.messagePL);
      }).catch(() => result(false, 'PAYMENT_ERROR', 'Nie udało się rozpocząć okresu próbnego. Spróbuj ponownie.'));
    },

    restorePurchases: function () {
      restoreInFlight = true;
      lastRestoreAt = Date.now();
      emit('restore:start');
      return MockBillingBackend.restore(() => readJson(BILLING_KEY)).then((res) => {
        restoreInFlight = false;
        // Restoring means re-reading the receipt, so the stored record wins:
        // another tab (or, on a real device, another install) may have bought
        // something since this instance loaded.
        if (res.receipt) {
          const account = state.account;
          state = normalizeState(res.receipt);
          state.account = account;
        }
        const sweep = sweepExpired();
        // Always recompute: re-hydration above may have changed the receipt
        // even when the backend had no patch of its own to apply.
        commit(res.patch, { silent: true });
        emit('restore:done', { code: res.code, expiredTrial: sweep.trialExpired });
        if (sweep.trialExpired) emit('trial:expired');
        emit('change');
        return result(res.code === 'OK', res.code, res.messagePL);
      }).catch(() => {
        restoreInFlight = false;
        emit('restore:done', { code: 'NOTHING_TO_RESTORE' });
        return result(false, 'NOTHING_TO_RESTORE', 'Nie znaleziono zapisanych zakupów na tym urządzeniu (DEMO).');
      });
    },

    cancelSubscription: function () {
      return MockBillingBackend.cancel(state).then((res) => {
        if (res.code !== 'OK') return result(false, res.code, res.messagePL);
        commit(res.patch, { silent: true });
        emit('subscription:canceled');
        emit('change');
        const until = state.expiresAt ? formatDatePL(state.expiresAt) : '';
        return result(true, 'OK', until
          ? 'Subskrypcja została anulowana. Zachowujesz dostęp do ' + until + '.'
          : res.messagePL);
      }).catch(() => result(false, 'PAYMENT_ERROR', 'Nie udało się anulować subskrypcji. Spróbuj ponownie.'));
    },

    resumeSubscription: function () {
      return MockBillingBackend.resume(state).then((res) => {
        if (res.code !== 'OK') return result(false, res.code, res.messagePL);
        commit(res.patch, { silent: true });
        emit('subscription:resumed');
        emit('change');
        return result(true, 'OK', res.messagePL);
      }).catch(() => result(false, 'PAYMENT_ERROR', 'Nie udało się wznowić subskrypcji. Spróbuj ponownie.'));
    },

    changePlan: function (productId) {
      const product = MockBillingBackend.findProduct(CATALOGUE, productId);
      if (!product) {
        return Promise.resolve(result(false, 'INVALID_PRODUCT', 'Nie znaleziono takiego produktu.'));
      }
      return MockBillingBackend.changePlan(product, state).then((res) => {
        if (res.code !== 'OK') return result(false, res.code, res.messagePL);
        return fromBackend(res);
      }).catch(() => result(false, 'PAYMENT_ERROR', 'Nie udało się zmienić planu. Spróbuj ponownie.'));
    },

    getManageSubscriptionUrl: function () {
      return MockBillingBackend.manageUrl(state);
    },

    openManageSubscription: function () {
      return MockBillingBackend.openManage().then((res) => result(true, res.code, res.messagePL))
        .catch(() => result(false, 'PAYMENT_ERROR', 'Nie udało się otworzyć zarządzania subskrypcją.'));
    },

    /* --- promo codes --- */

    redeemPromoCode: function (code) {
      const normalized = String(code || '').trim().toUpperCase();
      if (!normalized) {
        return Promise.resolve(result(false, 'INVALID_CODE', 'Nieznany kod promocyjny.'));
      }
      return MockBillingBackend.redeem(normalized, state, promoStore.redeemedCodes).then((res) => {
        if (res.code !== 'OK') return result(false, res.code, res.messagePL);
        if (promoStore.redeemedCodes.indexOf(res.promoId) < 0) {
          promoStore.redeemedCodes.push(res.promoId);
          savePromoStore();
        }
        commit(res.patch, { silent: true });
        emit('promo:applied', { code: res.promoId });
        emit('change');
        return result(true, 'OK', res.messagePL);
      }).catch(() => result(false, 'INVALID_CODE', 'Nieznany kod promocyjny.'));
    },

    // Welcome offer exists only for someone who already saw and closed the
    // paywall. No countdown, no "expires in MM:SS" — that is a dark pattern.
    getPromoOffer: function () {
      if (state.tier !== 'free') return null;
      if (promoStore.redeemedCodes.indexOf('WZROK30') >= 0) return null;
      const started = promoStore.welcomeOfferStartedAt;
      if (!started) return null;
      const availableUntil = started + WELCOME_OFFER_MS;
      if (Date.now() >= availableUntil) return null;
      const promo = MockBillingBackend.PROMO_CODES.WZROK30;
      return {
        code: 'WZROK30',
        discountPercent: promo.percent,
        productId: promo.productId,
        labelPL: promo.labelPL,
        availableUntil: availableUntil
      };
    },

    markPaywallDismissed: function (reason) {
      const now = Date.now();
      promoStore.lastPaywallDismissedAt = now;
      if (typeof reason === 'string' && reason) {
        promoStore.dismissReasons.push(reason);
        if (promoStore.dismissReasons.length > 20) {
          promoStore.dismissReasons = promoStore.dismissReasons.slice(-20);
        }
      }
      // Set once, on the FIRST dismissal only. Re-arming the window on every
      // dismissal would turn a stated deadline into an endlessly renewing one,
      // which is exactly the urgency dark pattern the spec forbids.
      if (!promoStore.welcomeOfferStartedAt) {
        promoStore.welcomeOfferStartedAt = now;
      }
      savePromoStore();
    },

    canShowAutoPaywall: function () {
      if (state.tier !== 'free') return false;
      const last = promoStore.lastPaywallDismissedAt;
      if (!last) return true;
      return (Date.now() - last) > PAYWALL_COOLDOWN_MS;
    },

    /* --- fictional account (no Google Sign-In anywhere) --- */

    signIn: function (email) {
      return MockBillingBackend.signIn(email).then((res) => {
        if (res.code !== 'OK') return result(false, res.code, res.messagePL);
        state.account = res.account;
        writeJson(ACCOUNT_KEY, res.account);
        commit(null, { silent: true });
        emit('account:change', { account: clone(res.account) });
        emit('change');
        return result(true, 'OK', res.messagePL);
      }).catch(() => result(false, 'STORAGE_UNAVAILABLE', 'Nie udało się zapisać konta demonstracyjnego.'));
    },

    signOut: function () {
      return MockBillingBackend.signOut().then((res) => {
        // Signing out must NOT revoke entitlements — losing Premium because
        // you logged out of a demo account would be indefensible.
        state.account = null;
        removeKey(ACCOUNT_KEY);
        commit(null, { silent: true });
        emit('account:change', { account: null });
        emit('change');
        return result(true, 'OK', res.messagePL);
      }).catch(() => result(false, 'STORAGE_UNAVAILABLE', 'Nie udało się wylogować.'));
    },

    getAccount: function () {
      return state.account ? clone(state.account) : null;
    },

    /* --- temporary entitlements (rewarded ad) --- */

    grantTemporaryEntitlement: function (featureId, durationMs, sourcePL) {
      if (FEATURE_IDS.indexOf(featureId) < 0) {
        return Promise.resolve(result(false, 'INVALID_FEATURE', 'Nieznana funkcja.'));
      }
      const ms = (typeof durationMs === 'number' && durationMs > 0) ? durationMs : DAY_MS;
      const until = Date.now() + ms;
      const current = state.temporaryEntitlements[featureId];
      // Never shorten an entitlement the user already has.
      state.temporaryEntitlements[featureId] = (typeof current === 'number' && current > until) ? current : until;
      commit(null, { silent: true });
      emit('entitlement:temporary', {
        featureId: featureId,
        expiresAt: state.temporaryEntitlements[featureId],
        sourcePL: sourcePL || null
      });
      emit('change');
      const info = FEATURE_INFO[featureId];
      const label = info ? info.labelPL : featureId;
      return Promise.resolve(result(true, 'OK',
        'Odblokowano: ' + label + '. Dostęp jest ważny do ' + formatDateTimePL(state.temporaryEntitlements[featureId]) + '.'));
    },

    hasTemporaryEntitlement: function (featureId) {
      const until = state.temporaryEntitlements[featureId];
      return typeof until === 'number' && until > Date.now();
    },

    /* --- ads consent (mock CMP; the real one is the UMP SDK) --- */

    getAdsConsent: function () {
      return state.adsConsent;
    },

    setAdsConsent: function (value) {
      if (value !== 'granted' && value !== 'denied') {
        return Promise.resolve(result(false, 'INVALID_CONSENT', 'Nieprawidłowa wartość zgody.'));
      }
      state.adsConsent = value;
      commit(null, { silent: true });
      emit('consent:change', { adsConsent: value });
      emit('change');
      return Promise.resolve(result(true, 'OK', value === 'granted'
        ? 'Zapisano wybór: reklamy dopasowane.'
        : 'Zapisano wybór: reklamy niedopasowane.'));
    },

    /* --- events --- */

    on: on,
    off: off,
    once: once,

    /* --- formatting --- */

    formatPrice: function (productId) {
      const product = MockBillingBackend.findProduct(CATALOGUE, productId);
      if (!product) return '';
      const effective = MockBillingBackend.effectivePriceMinor(product, state.promoCode);
      return formatMinor(effective);
    },

    formatSpokenPrice: function (productId) {
      const product = MockBillingBackend.findProduct(CATALOGUE, productId);
      if (!product) return '';
      const effective = MockBillingBackend.effectivePriceMinor(product, state.promoCode);
      if (effective === product.priceMinor) return product.spokenPrice;
      return spokenMinor(effective) + ', ' + product.spokenSuffixPL;
    },

    // The amount charged on RENEWAL — always the catalogue price, because a
    // promo code discounts the first billing period only. The account screen
    // must quote this one, never the discounted first-period amount.
    formatRenewalPrice: function (productId) {
      const product = MockBillingBackend.findProduct(CATALOGUE, productId);
      if (!product) return '';
      return formatMinor(product.priceMinor);
    },

    // 'rocznie' / 'miesięcznie', or '' for a one-off product.
    formatRenewalPeriodPL: function (productId) {
      const product = MockBillingBackend.findProduct(CATALOGUE, productId);
      if (!product) return '';
      return RENEWAL_PERIOD_PL[product.plan] || '';
    },

    // 'za pierwszy rok' / 'za pierwszy miesiąc' / 'jednorazowo'.
    formatFirstPeriodPL: function (productId) {
      const product = MockBillingBackend.findProduct(CATALOGUE, productId);
      if (!product) return '';
      return firstPeriodPL(product);
    },

    // One sentence naming the discounted amount and the renewal amount, or ''.
    formatPromoNote: function (productId) {
      const product = MockBillingBackend.findProduct(CATALOGUE, productId);
      if (!product) return '';
      return promoNote(product);
    },

    formatPriceMinor: formatMinor,
    formatSpokenMinor: spokenMinor,
    formatDate: formatDatePL,
    formatDateTime: formatDateTimePL,

    statusLabelPL: function () {
      switch (state.status) {
        case 'trial': return 'OKRES PRÓBNY';
        case 'active': return 'AKTYWNA';
        case 'canceled': return 'ANULOWANA — DOSTĘP DO KOŃCA OKRESU';
        case 'paused': return 'WSTRZYMANA';
        case 'grace':
        case 'on_hold': return 'ZALEGŁOŚĆ W PŁATNOŚCI';
        default: return 'BRAK SUBSKRYPCJI';
      }
    },

    statusDetailPL: function () {
      const product = MockBillingBackend.findProduct(CATALOGUE, state.productId);
      switch (state.status) {
        case 'trial':
          return 'Okres próbny kończy się ' + formatDatePL(state.trialEndsAt) + ', potem ' +
            (product ? product.priceText + ' ' + product.periodText : 'cena według wybranego planu') + '.';
        case 'active':
          if (state.plan === 'lifetime') {
            return 'Kupiono ' + formatDatePL(state.purchasedAt) + '.';
          }
          return 'Odnowi się ' + formatDatePL(state.renewsAt || state.expiresAt) + '.';
        case 'canceled':
          return 'Dostęp do ' + formatDatePL(state.expiresAt) + '.';
        case 'paused':
          return 'Wznowi się ' + formatDatePL(state.expiresAt) + '.';
        case 'grace':
        case 'on_hold':
          return 'Zaktualizuj sposób płatności.';
        default:
          if (state.removeAdsOwned) {
            return 'Masz wykupione usunięcie reklam. Pozostałe funkcje Premium nie są aktywne.';
          }
          return 'Nie masz aktywnej subskrypcji. Wszystkie funkcje pomiaru działają bezpłatnie.';
      }
    },

    /* --- developer / QA tools --- */

    setSimulation: function (options) {
      const opts = options || {};
      if (typeof opts.latencyMs === 'number' && opts.latencyMs >= 0) {
        MockBillingBackend.latencyMs = opts.latencyMs;
        MockBillingBackend.restoreLatencyMs = Math.round(opts.latencyMs * 0.75);
        MockBillingBackend.signInLatencyMs = Math.round(opts.latencyMs * 0.6);
      }
      if (typeof opts.failNext === 'boolean') MockBillingBackend.failNext = opts.failNext;
      if (typeof opts.unavailable === 'boolean') MockBillingBackend.unavailable = opts.unavailable;
    },

    reset: function () {
      // Wipes only the demo keys. blueMonitor.thresholds.v1 is user data and
      // is never touched here — the user set those thresholds themselves.
      removeKey(BILLING_KEY);
      removeKey(ACCOUNT_KEY);
      removeKey(PROMO_KEY);
      state = defaultState();
      promoStore = defaultPromoStore();
      computeFeatures(state);
      state.updatedAt = Date.now();
      persist();
      emit('reset');
      emit('change');
      return Promise.resolve(result(true, 'OK', 'Zresetowano stan demonstracyjny.'));
    },

    debugState: function () {
      return {
        storageWorks: storageWorks,
        state: clone(state),
        promo: clone(promoStore),
        simulation: {
          latencyMs: MockBillingBackend.latencyMs,
          failNext: MockBillingBackend.failNext,
          unavailable: MockBillingBackend.unavailable
        },
        catalogue: CATALOGUE.map((p) => p.id)
      };
    }
  };

  window.Billing = Billing;
  window.BlueMonitor.Billing = Billing;
})();
