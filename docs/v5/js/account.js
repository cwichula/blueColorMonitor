/**
 * js/account.js — symulowane konto użytkownika (v5).
 *
 * ROLA PLIKU: trzyma profil, listę sposobów logowania i udawany przebieg
 * logowania. Nie buduje ani jednego węzła DOM — ekran rysuje screens/account.js.
 * Jedyna zależność: bus.js.
 *
 * UCZCIWOŚĆ. Tu nie ma logowania. Nie ma żądania sieciowego, nie ma SDK
 * dostawcy, nie ma serwera, który cokolwiek sprawdza. „Kontynuuj przez Google”
 * zapisuje wpis w localStorage tej przeglądarki i nic poza tym. Dlatego:
 *   1. Nie zmyślamy danych osobowych. Profil po zalogowaniu jest PUSTY —
 *      imię i adres pojawiają się wtedy i tylko wtedy, gdy człowiek sam je
 *      wpisze. Wymyślone „Anna Kowalska” wyglądałoby jak dane pobrane od
 *      dostawcy, a niczego nie pobraliśmy.
 *   2. Każdy ekran logowania musi nieść plakietkę „Demo” i zdanie o tym, że
 *      dane nie opuszczają urządzenia. To warunek, pod którym wolno ten plik
 *      pokazać człowiekowi.
 *   3. Konto niczego nie odblokowuje. Pomiar, historia i narzędzia działają
 *      bez logowania; uprawnienia trzyma billing.js.
 */

import { bus } from './bus.js';

const KEY = 'ms5.account.v1';

/* Opóźnienie udawanego okna dostawcy. Poniżej pół sekundy wygląda jak
   kliknięcie w nic, powyżej sekundy — jak zawieszenie aplikacji. */
const DELAY_MIN = 600;
const DELAY_MAX = 900;

/* Jak często udawane okno dostawcy „zamyka się” bez logowania. Interfejs musi
   umieć obsłużyć porażkę, więc porażka musi się czasem zdarzać — ale nigdy
   dwa razy pod rząd, bo druga odmowa z rzędu wygląda już jak usterka. */
const CANCEL_RATE = 0.12;

/* ------------------------------------------------------------------
   Pamięć — każdy dostęp osobno w try/catch
   ------------------------------------------------------------------ */

/* Tryb prywatny potrafi rzucić wyjątkiem także przy ODCZYCIE. Bez pamięci
   trwałej konto działa z pamięci procesu i znika razem z kartą — to gorsze
   niż zapis, ale lepsze niż biały ekran. */
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
    /* nic do zrobienia — pamięć procesu i tak jest już wyczyszczona */
  }
}

/* ------------------------------------------------------------------
   Sposoby logowania
   ------------------------------------------------------------------ */

/* `shortPL` to nazwa dostawcy do zdania „Zalogowano przez …” i do inicjału
   awatara, gdy profil jest jeszcze pusty. `needsEmail` mówi ekranowi, że przed
   wywołaniem signIn trzeba poprosić o adres. Wszystkie pozycje są symulacją —
   nie ma tu pola „prawdziwy”, bo nie ma czego nim odróżnić. */
export const PROVIDERS = [
  {
    id: 'demo',
    labelPL: 'Wejdź jako gość',
    shortPL: 'Gość',
    icon: 'sparkle',
    hintPL: 'Bez wpisywania czegokolwiek.',
    needsEmail: false
  },
  {
    id: 'google',
    labelPL: 'Kontynuuj przez Google',
    shortPL: 'Google',
    icon: 'google',
    hintPL: 'Symulacja — okno Google się nie otworzy.',
    needsEmail: false
  },
  {
    id: 'apple',
    labelPL: 'Kontynuuj przez Apple',
    shortPL: 'Apple',
    icon: 'apple',
    hintPL: 'Symulacja — okno Apple się nie otworzy.',
    needsEmail: false
  },
  {
    id: 'email',
    labelPL: 'Kontynuuj przez e-mail',
    shortPL: 'E-mail',
    icon: 'mail',
    hintPL: 'Adres zostaje w tej przeglądarce. Nie wysyłamy żadnej wiadomości.',
    needsEmail: true
  }
];

export function providerById(id) {
  for (let i = 0; i < PROVIDERS.length; i += 1) {
    if (PROVIDERS[i].id === id) return PROVIDERS[i];
  }
  return null;
}

/* ------------------------------------------------------------------
   Profil
   ------------------------------------------------------------------ */

let current = null;         // rekord z pamięci albo null
let pending = null;         // trwające „logowanie” (jedno naraz)
let lastCancelled = false;  // patrz CANCEL_RATE

/* Adres e-mail sprawdzamy świadomie luźno: jedna małpa i kropka po niej.
   Nikt tego adresu nie weryfikuje, więc ostrzejsza reguła odrzucałaby
   poprawne adresy w zamian za nic. */
function looksLikeEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/* Inicjały do awatara. Aplikacja nie pobiera żadnego obrazka, więc awatar jest
   rysowany literami. Kolejność źródeł: imię → adres → nazwa dostawcy; pusty
   profil dostaje literę dostawcy, a nie znak zapytania. */
function initialsFrom(name, email, provider) {
  const clean = String(name || '').replace(/\s+/g, ' ').trim();
  if (clean) {
    const parts = clean.split(' ');
    const first = parts[0].charAt(0);
    const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
    return (first + last).toLocaleUpperCase('pl-PL');
  }
  const mail = String(email || '').trim();
  if (mail) {
    const local = mail.split('@')[0].replace(/[^\p{L}]/gu, '');
    if (local.length >= 2) return local.slice(0, 2).toLocaleUpperCase('pl-PL');
    if (local.length === 1) return local.toLocaleUpperCase('pl-PL');
  }
  const p = providerById(provider);
  return p ? p.shortPL.charAt(0).toLocaleUpperCase('pl-PL') : '?';
}

/* Profil publiczny — jedyny kształt, jaki widzą ekrany. Rekord z pamięci
   zostaje prywatny, żeby nikt nie zapisał go z boku. */
function publicUser(rec) {
  if (!rec) return null;
  const provider = providerById(rec.provider);
  return {
    id: rec.id,
    name: rec.name || '',
    email: rec.email || '',
    avatarInitials: initialsFrom(rec.name, rec.email, rec.provider),
    provider: rec.provider,
    providerNamePL: provider ? provider.shortPL : '',
    createdAt: rec.createdAt || 0
  };
}

function validRecord(rec) {
  return !!(rec && typeof rec === 'object'
    && typeof rec.id === 'string' && rec.id
    && typeof rec.createdAt === 'number' && Number.isFinite(rec.createdAt)
    && providerById(rec.provider));
}

function load() {
  const rec = readStore();
  current = validRecord(rec) ? rec : null;
  // Zapis niezgodny z kontraktem (starsza wersja, ręczna edycja) kasujemy,
  // żeby nie wracał przy każdym uruchomieniu.
  if (rec && !current) removeStore();
}

function save() {
  if (current) writeStore(current);
  else removeStore();
}

/* Powód dopisujemy obok wymaganego pola `user`: billing.js musi odróżnić
   wylogowanie (subskrypcja zostaje) od usunięcia konta (subskrypcja znika),
   a payload z kontraktu sam z siebie tego nie niesie. */
function announce(reason) {
  bus.emit('account:changed', { user: publicUser(current), reason });
}

function newId() {
  return 'u' + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
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

export function user() {
  return publicUser(current);
}

export function isSignedIn() {
  return !!current;
}

export function isPending() {
  return !!pending;
}

/* ------------------------------------------------------------------
   Logowanie
   ------------------------------------------------------------------ */

/* Oczekiwanie, które da się przerwać. Bez tego arkusz zamknięty w trakcie
   „Loguję…” i tak zalogowałby użytkownika po swoim zniknięciu. */
function wait(ms) {
  return new Promise((resolve, reject) => {
    const state = { reject, timer: 0 };
    state.timer = setTimeout(() => {
      if (pending === state) pending = null;
      resolve();
    }, ms);
    pending = state;
  });
}

/** Przerywa trwające logowanie; obietnica z signIn odrzuca się kodem 'cancelled'. */
export function cancelSignIn() {
  if (!pending) return false;
  const state = pending;
  pending = null;
  clearTimeout(state.timer);
  state.reject(fail('cancelled', 'Logowanie przerwane.'));
  return true;
}

/**
 * signIn('google') / signIn('email', {email}) -> Promise<user>
 *
 * Drugi argument jest rozszerzeniem kontraktu: dostawca „e-mail” nie ma skąd
 * wziąć adresu, a zmyślenie go byłoby dokładnie tym, czego ten plik nie robi.
 * Odrzuca błędem z polami `code` i `messagePL`; kody: 'unknown_provider',
 * 'email_empty', 'email_invalid', 'cancelled'.
 */
export async function signIn(providerId, details = {}) {
  const provider = providerById(providerId);
  if (!provider) throw fail('unknown_provider', 'Nieznany sposób logowania.');

  let email = '';
  if (provider.needsEmail) {
    // Błąd w polu ma się pokazać natychmiast, a nie po sekundzie udawanej pracy.
    email = String(details.email ?? '').trim();
    if (!email) throw fail('email_empty', 'Podaj adres e-mail.');
    if (!looksLikeEmail(email)) throw fail('email_invalid', 'To nie wygląda na adres e-mail.');
  }

  const name = String(details.name ?? '').replace(/\s+/g, ' ').trim().slice(0, 60);

  if (pending) cancelSignIn();
  await wait(DELAY_MIN + Math.floor(Math.random() * (DELAY_MAX - DELAY_MIN + 1)));

  // „Gość” to droga bez okna dostawcy — nie ma się co zamknąć, więc nie udajemy,
  // że mogłaby zawieść.
  if (provider.id !== 'demo' && !lastCancelled && Math.random() < CANCEL_RATE) {
    lastCancelled = true;
    throw fail('cancelled', 'Okno dostawcy zamknęło się przed zalogowaniem (symulacja).');
  }
  lastCancelled = false;

  current = {
    id: newId(),
    name,
    email,
    provider: provider.id,
    createdAt: Date.now()
  };
  save();
  announce('signin');
  return publicUser(current);
}

/* ------------------------------------------------------------------
   Wylogowanie, zmiana profilu, usunięcie konta
   ------------------------------------------------------------------ */

export function signOut() {
  if (pending) cancelSignIn();
  if (!current) return false;
  current = null;
  save();
  announce('signout');
  return true;
}

/**
 * update({name, email}) -> user|null
 * Jedyne miejsce, w którym do profilu trafiają dane osobowe — wpisane ręcznie
 * przez człowieka, który patrzy na plakietkę „Demo”. Pusty napis kasuje pole;
 * adres niepoprawny jest pomijany, żeby jedna literówka nie cofnęła zmiany imienia.
 */
export function update(patch) {
  if (!current || !patch || typeof patch !== 'object') return user();
  if (typeof patch.name === 'string') {
    current.name = patch.name.replace(/\s+/g, ' ').trim().slice(0, 60);
  }
  if (typeof patch.email === 'string') {
    const mail = patch.email.trim().slice(0, 120);
    if (!mail) current.email = '';
    else if (looksLikeEmail(mail)) current.email = mail;
  }
  save();
  announce('update');
  return user();
}

/**
 * Usunięcie konta kasuje TYLKO klucz konta. Symulowaną subskrypcję czyści
 * billing.js, który słucha 'account:changed' z powodem 'deleted' — dzięki temu
 * zależność idzie w jedną stronę i do każdego klucza pisze jeden moduł.
 * Historia pomiarów zostaje nietknięta: należy do urządzenia, nie do konta.
 */
export function deleteAccount() {
  if (pending) cancelSignIn();
  current = null;
  removeStore();
  announce('deleted');
  return true;
}

load();
