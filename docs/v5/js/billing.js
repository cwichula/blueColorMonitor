/**
 * js/billing.js — symulowane plany, zakup i uprawnienia (v5).
 *
 * ROLA PLIKU: katalog planów w złotych, reguły uprawnień i udawany przebieg
 * płatności. Ani jednego węzła DOM — arkusz sprzedażowy rysuje ui/overlays.js,
 * ekran planu screens/account.js. Ten plik wie, CO wolno pokazać; nie wie, jak.
 *
 * REGUŁA UCZCIWOŚCI, na której stoi cała warstwa: camera.js liczy WSZYSTKIE
 * siedem wielkości dla każdego i zawsze — nie pyta o subskrypcję ani razu.
 * Pakiet zmienia wyłącznie to, czy liczba jest pokazana. Stąd trzy rzeczy,
 * których nie wolno zepsuć:
 *   1. Odblokowanie działa natychmiast i bez sieci — nie ma czego doliczać.
 *   2. Historia zbiera komplet od pierwszego dnia dla każdego, więc po zakupie
 *      widać przebieg, który naprawdę się wydarzył, a nie pustą tabelę.
 *   3. Nie ma tu żadnego żądania sieciowego, pola na numer karty ani opłaty.
 *      DEMO === true, a każdy ekran z ceną musi to powiedzieć wprost.
 *
 * Liczby na tekst zamienia wyłącznie format.js (zasada z sekcji 0 kontraktu),
 * dlatego ten plik importuje `nf` — poza drzewem z sekcji 1, ale format.js
 * jest liściem, więc kierunek zależności zostaje zachowany.
 */

import { bus } from './bus.js';
import { CATALOGUE, PREMIUM_IDS, byId } from './metrics.js';
import { user } from './account.js';
import { nf } from './format.js';

export const DEMO = true;

const KEY = 'ms5.billing.v1';
const DAY = 86400000;
const TRIAL_DAYS = 7;

/* Ile trwa udawane okno płatności sklepu. Krócej wygląda na kliknięcie w nic,
   dłużej na zawieszenie aplikacji. */
const PAY_MIN = 900;
const PAY_MAX = 1500;

/* Jak często symulowana płatność zostaje odrzucona. Interfejs musi umieć
   pokazać porażkę, więc porażka musi się czasem zdarzać — ale nigdy dwa razy
   pod rząd, bo pętla odmów w demonstracji to już nie realizm, tylko usterka. */
const DECLINE_RATE = 0.18;

/* W apostrofach niżej stoi spacja nierozdzielająca U+00A0, a nie zwykła —
   „9,99 zł” nie może się złamać między liczbą a walutą. */
const NBSP = ' ';

/* ------------------------------------------------------------------
   Pamięć — każdy dostęp osobno w try/catch (tryb prywatny)
   ------------------------------------------------------------------ */

function readStore() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStore(value) {
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function removeStore() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* nic do zrobienia */
  }
}

/* ------------------------------------------------------------------
   Ceny — jedno źródło, reszta wyliczana
   ------------------------------------------------------------------ */

/* Ceny w groszach, bo tylko na liczbach całkowitych przelicznik miesięczny
   i procent oszczędności wychodzą powtarzalnie. Wszystkie napisy z cenami
   powstają z tych trzech liczb — nie ma drugiego miejsca do poprawienia. */
const PRICE = { monthly: 999, yearly: 5999, lifetime: 14999 };

function zl(minor) {
  return nf(minor / 100, 2) + NBSP + 'zł';
}

const YEARLY_PER_MONTH = Math.round(PRICE.yearly / 12);
const YEARLY_SAVING_PCT = Math.round((1 - PRICE.yearly / (PRICE.monthly * 12)) * 100);
const LIFETIME_YEARS = PRICE.lifetime / PRICE.yearly;

/* Trzy plany w tej kolejności — tak stoją na paywallu i na ekranie konta.
   `badgePL` mówi rzecz sprawdzalną („najniższy koszt miesięczny”), a nie
   zmyślone „najczęściej wybierany”: w symulacji nikt niczego nie wybiera,
   więc społeczny dowód słuszności byłby po prostu kłamstwem.
   `periodPL` sklejane z `pricePL` daje pełne zdanie ceny — bez gwiazdek
   i bez drobnego druku, w którym chowa się prawdziwy koszt. */
export const PLANS = [
  {
    id: 'monthly',
    namePL: 'Miesięczny',
    priceMinor: PRICE.monthly,
    pricePL: zl(PRICE.monthly),
    periodPL: 'miesięcznie',
    perMonthPL: zl(PRICE.monthly) + ' miesięcznie',
    badgePL: null,
    savingPL: null,
    recurring: true,
    notePL: 'Odnawia się co miesiąc. Rezygnujesz w jednym kroku, bez pytań.'
  },
  {
    id: 'yearly',
    namePL: 'Roczny',
    priceMinor: PRICE.yearly,
    pricePL: zl(PRICE.yearly),
    periodPL: 'rocznie',
    perMonthPL: 'ok. ' + zl(YEARLY_PER_MONTH) + ' miesięcznie',
    badgePL: 'Najniższy koszt miesięczny',
    savingPL: 'Taniej o ' + YEARLY_SAVING_PCT + '%',
    recurring: true,
    notePL: 'Odnawia się co rok. Pełna cena ' + zl(PRICE.yearly)
      + ' jest pobierana od razu, bez okresu próbnego w tle.'
  },
  {
    id: 'lifetime',
    namePL: 'Dożywotni',
    priceMinor: PRICE.lifetime,
    pricePL: zl(PRICE.lifetime),
    periodPL: 'jednorazowo',
    perMonthPL: null,
    badgePL: null,
    savingPL: null,
    recurring: false,
    notePL: 'Jedna płatność, nic się nie odnawia. Odpowiada '
      + nf(LIFETIME_YEARS, 1) + ' roku planu rocznego.'
  }
];

export function planById(id) {
  for (let i = 0; i < PLANS.length; i += 1) {
    if (PLANS[i].id === id) return PLANS[i];
  }
  return null;
}

/* ------------------------------------------------------------------
   Korzyści
   ------------------------------------------------------------------ */

/* Pierwsze pozycje powstają z katalogu wielkości, a nie z ręcznej listy —
   dopisanie wielkości premium w metrics.js ma się pokazać w ofercie samo,
   bez drugiej listy do pilnowania. */
const EXTRA_BENEFITS = [
  {
    icon: 'chart',
    titlePL: 'Historia z kompletem kolumn',
    textPL: 'Wykres i statystyki także dla wielkości spod kłódki — zbierają się od pierwszego dnia, więc po zakupie widać przebieg, który naprawdę się wydarzył.'
  },
  {
    icon: 'download',
    titlePL: 'Eksport wszystkich siedmiu wielkości',
    textPL: 'CSV i JSON z pełnym zestawem kolumn zamiast czterech.'
  }
];

export function benefits() {
  const fromCatalogue = PREMIUM_IDS.map((id) => {
    const m = byId(id);
    return {
      icon: m.icon,
      titlePL: m.namePL,
      textPL: m.shortPL
    };
  });
  return fromCatalogue.concat(EXTRA_BENEFITS.map((b) => ({ ...b })));
}

/* ------------------------------------------------------------------
   Stan uprawnienia
   ------------------------------------------------------------------ */

/* `trialUsedAt` żyje dłużej niż samo uprawnienie: okres próbny przysługuje raz
   na urządzenie, więc pamięć o nim musi przetrwać rezygnację. Pełny reset daje
   dopiero usunięcie konta — i tylko dlatego wolno tu w ogóle trzymać taką
   blokadę, że użytkownik ma z niej jawne wyjście. */
let state = { trialUsedAt: null, active: null };
let expiryAnnounced = false;

function normalise(raw) {
  const out = { trialUsedAt: null, active: null };
  if (!raw || typeof raw !== 'object') return out;

  if (typeof raw.trialUsedAt === 'number' && Number.isFinite(raw.trialUsedAt)) {
    out.trialUsedAt = raw.trialUsedAt;
  }

  const a = raw.active;
  if (!a || typeof a !== 'object') return out;
  const source = a.source === 'trial' || a.source === 'purchase' ? a.source : null;
  const since = typeof a.since === 'number' && Number.isFinite(a.since) ? a.since : null;
  if (!source || since === null) return out;
  // Zakup bez znanego planu i próbny z planem to zapisy niezgodne z tym
  // plikiem — uprawnienia z nich nie robimy, bo nie umielibyśmy go opisać.
  const plan = source === 'purchase' ? planById(a.planId) : null;
  if (source === 'purchase' && !plan) return out;
  const trialEndsAt = source === 'trial'
    ? (typeof a.trialEndsAt === 'number' && Number.isFinite(a.trialEndsAt) ? a.trialEndsAt : null)
    : null;
  if (source === 'trial' && trialEndsAt === null) return out;

  out.active = {
    source,
    planId: plan ? plan.id : null,
    since,
    trialEndsAt,
    accountId: typeof a.accountId === 'string' ? a.accountId : null
  };
  return out;
}

function save() {
  if (!state.active && !state.trialUsedAt) removeStore();
  else writeStore(state);
}

/* Zdarzenie leci w następnym obrocie pętli: wygaśnięcie wykrywamy w środku
   odczytu, a odczyt bywa wołany podczas rysowania — ekran nie może przebudować
   się sam spod siebie. */
function announceLater(entitlementSnapshot) {
  setTimeout(() => bus.emit('billing:changed', { entitlement: entitlementSnapshot }), 0);
}

function announce() {
  bus.emit('billing:changed', { entitlement: entitlement() });
}

/* Okres próbny wygasa PRZY ODCZYCIE, bez budzika. Timer na siedem dni i tak nie
   przeżyłby zamknięcia karty, a każdy odczyt (wejście na ekran, zdarzenie,
   sprawdzenie kłódki) i tak przechodzi tędy. */
function prune() {
  const a = state.active;
  if (!a || a.source !== 'trial' || a.trialEndsAt === null) return false;
  if (Date.now() < a.trialEndsAt) return false;
  state.active = null;
  save();
  if (!expiryAnnounced) {
    expiryAnnounced = true;
    announceLater(snapshot());
  }
  return true;
}

function snapshot() {
  const a = state.active;
  const trialUsed = state.trialUsedAt !== null;
  if (!a) {
    return {
      plan: 'free',
      source: 'none',
      planId: null,
      planNamePL: null,
      pricePL: null,
      periodPL: null,
      trialEndsAt: null,
      trialDaysLeft: 0,
      trialUsed,
      since: null,
      accountId: null
    };
  }
  const plan = a.planId ? planById(a.planId) : null;
  return {
    plan: 'premium',
    source: a.source,
    planId: a.planId,
    planNamePL: plan ? plan.namePL : 'Okres próbny',
    pricePL: plan ? plan.pricePL : null,
    periodPL: plan ? plan.periodPL : null,
    trialEndsAt: a.trialEndsAt,
    trialDaysLeft: a.source === 'trial' ? daysLeft(a.trialEndsAt) : 0,
    trialUsed,
    since: a.since,
    accountId: a.accountId
  };
}

/* Dni zaokrąglamy w GÓRĘ: dopóki został choćby kwadrans, to jeszcze „1 dzień”,
   a nie zero. Zero przy działającym dostępie czytałoby się jak usterka. */
function daysLeft(endsAt) {
  if (typeof endsAt !== 'number') return 0;
  const left = endsAt - Date.now();
  if (left <= 0) return 0;
  return Math.max(1, Math.ceil(left / DAY));
}

function load() {
  const raw = readStore();
  state = normalise(raw);
  // Zapis, z którego nic się nie ostało, kasujemy od razu — inaczej wracałby
  // przy każdym uruchomieniu i przy każdym restore().
  if (raw && !state.active && !state.trialUsedAt) removeStore();
  prune();
}

function grant(source, planId, trialEndsAt) {
  const u = user();
  state.active = {
    source,
    planId: planId || null,
    since: Date.now(),
    trialEndsAt: trialEndsAt || null,
    accountId: u ? u.id : null
  };
  expiryAnnounced = false;
  save();
}

function fail(code, messagePL) {
  const err = new Error(messagePL);
  err.code = code;
  err.messagePL = messagePL;
  return err;
}

/* ------------------------------------------------------------------
   API odczytu
   ------------------------------------------------------------------ */

export function entitlement() {
  prune();
  return snapshot();
}

export function isPremium() {
  prune();
  return state.active !== null;
}

export function isTrial() {
  prune();
  return !!(state.active && state.active.source === 'trial');
}

export function trialDaysLeft() {
  prune();
  return state.active && state.active.source === 'trial' ? daysLeft(state.active.trialEndsAt) : 0;
}

/** Czy okres próbny jest jeszcze do wzięcia (raz na urządzenie). */
export function trialAvailable() {
  return !isPremium() && state.trialUsedAt === null;
}

/* Podział na płatne i bezpłatne bierzemy WYŁĄCZNIE z pola `premium` w katalogu.
   Własna lista rozjechałaby się przy pierwszej zmianie i pokazała pod kłódką
   coś, co jest bezpłatne — albo odwrotnie. */
export function isUnlocked(metricId) {
  const m = byId(metricId);
  if (!m) return true;          // nieznana wielkość: nie chowamy niczego przypadkiem
  if (!m.premium) return true;
  return isPremium();
}

export function lockedMetrics() {
  if (isPremium()) return [];
  return CATALOGUE.filter((m) => m.premium).map((m) => m.id);
}

/* ------------------------------------------------------------------
   Zakup, okres próbny, przywracanie, rezygnacja
   ------------------------------------------------------------------ */

let lastDeclined = false;

/**
 * purchase(planId) -> Promise<{ok, code?, messagePL?, planId?, entitlement}>
 * Nigdy nie rzuca: odmowa płatności to zwykły wynik, a nie awaria programu.
 * Komunikat odmowy mówi wprost, że to symulacja i że kolejna próba się uda —
 * udawana odmowa bez tego zdania byłaby zmyśloną informacją o pieniądzach.
 */
export async function purchase(planId) {
  const plan = planById(planId);
  if (!plan) {
    return {
      ok: false,
      code: 'unknown_plan',
      messagePL: 'Nie znamy takiego planu.',
      entitlement: entitlement()
    };
  }

  await new Promise((resolve) => {
    setTimeout(resolve, PAY_MIN + Math.floor(Math.random() * (PAY_MAX - PAY_MIN + 1)));
  });

  if (!lastDeclined && Math.random() < DECLINE_RATE) {
    lastDeclined = true;
    return {
      ok: false,
      code: 'declined',
      messagePL: 'Symulowana płatność odrzucona. Spróbuj jeszcze raz — kolejna próba się uda.',
      entitlement: entitlement()
    };
  }
  lastDeclined = false;

  grant('purchase', plan.id, null);
  announce();
  return { ok: true, planId: plan.id, plan, entitlement: entitlement() };
}

/**
 * startTrial() -> entitlement
 * Rzuca, gdy okres próbny się nie należy (kody 'already_premium', 'trial_used').
 * Świadomie rzuca zamiast zwracać false: ui/overlays.js pokazuje potwierdzenie
 * w bloku try, więc cicha porażka zamieniłaby się tam w kłamstwo na ekranie.
 * Termin zapisujemy jako datę, nie jako liczbę pozostałych dni — dni policzone
 * przy starcie rozjeżdżają się przy każdej zmianie strefy czasowej.
 */
export function startTrial() {
  if (isPremium()) throw fail('already_premium', 'Pakiet pełny jest już aktywny.');
  if (state.trialUsedAt !== null) {
    throw fail('trial_used', 'Okres próbny został już wykorzystany na tym urządzeniu.');
  }
  state.trialUsedAt = Date.now();
  grant('trial', null, Date.now() + TRIAL_DAYS * DAY);
  announce();
  return entitlement();
}

/**
 * restore() -> entitlement | false
 * „Sklepem” jest w symulacji localStorage tej przeglądarki, więc przywracanie
 * to ponowny odczyt klucza — ma sens po odświeżeniu i po zakupie w drugiej
 * karcie. Gdy nie ma czego przywrócić, odpowiadamy `false`: ciche wskrzeszenie
 * premium po rezygnacji byłoby oszustwem w drugą stronę.
 */
export function restore() {
  const found = normalise(readStore());
  // Pamięć o wykorzystanym okresie próbnym przywracamy zawsze — inaczej
  // przywracanie stałoby się sposobem na drugi darmowy tydzień.
  if (found.trialUsedAt !== null && state.trialUsedAt === null) {
    state.trialUsedAt = found.trialUsedAt;
    save();
  }
  if (!found.active) return false;
  if (found.active.source === 'trial' && found.active.trialEndsAt <= Date.now()) return false;

  // Zakup w prawdziwym sklepie należy do konta, nie do urządzenia. Trzymamy się
  // tego: wpis przypisany do innego konta nie jest „nasz”.
  const u = user();
  if (found.active.accountId && u && found.active.accountId !== u.id) return false;

  state.active = found.active;
  expiryAnnounced = false;
  save();
  announce();
  return entitlement();
}

/**
 * cancel() -> boolean
 * Bez pytania „czy na pewno”, bez ekranu z ofertą zatrzymującą, bez opóźnienia:
 * rezygnacja ma być dokładnie tak samo łatwa jak zakup. Plany zostają na
 * ekranie, więc powrót to jedno dotknięcie — i to jest cała „retencja”.
 */
export function cancel() {
  if (!state.active) return false;
  state.active = null;
  expiryAnnounced = false;
  save();
  announce();
  return true;
}

/* ------------------------------------------------------------------
   Powiązanie z kontem
   ------------------------------------------------------------------ */

/* Usunięcie konta kasuje też symulowaną subskrypcję i pamięć o okresie próbnym
   — tak brzmi zdanie, które użytkownik potwierdza na ekranie konta. Zależność
   idzie w jedną stronę: billing.js zna account.js, account.js nie wie o tym
   pliku, więc do klucza 'ms5.billing.v1' pisze tylko jeden moduł. */
bus.on('account:changed', (data) => {
  if (!data || data.reason !== 'deleted') return;
  if (!state.active && state.trialUsedAt === null) return;
  state = { trialUsedAt: null, active: null };
  expiryAnnounced = false;
  removeStore();
  announce();
});

load();
