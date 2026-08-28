/* Monitor Światła v5 — silnik językowy.
 *
 * ROLA PLIKU: jedyne miejsce w aplikacji, które wie cokolwiek o językach.
 * Trzyma listę trzydziestu obsługiwanych języków, wykrywa właściwy, dociąga
 * słownik, oddaje napis przez t() i rozgłasza zmianę przez szynę zdarzeń.
 * Żaden inny moduł nie zagląda do katalogu `locales/` i nie zna kodów języków.
 *
 * Trzy zasady, na których stoi ten moduł:
 * 1. ANGIELSKI JEST ZAPASEM, nie polski. Gdy urządzenie mówi w języku, którego
 *    nie mamy, interfejs jest angielski; gdy w aktywnym słowniku brakuje
 *    klucza, wartość bierzemy z angielskiego, a dopiero na końcu oddajemy sam
 *    klucz. Polski jest jednym z trzydziestu języków, nie wyróżnionym.
 * 2. Brak słownika nie jest awarią. Nieudany import pliku (literówka w kodzie,
 *    utrata sieci przed zapisem w pamięci podręcznej) zostawia aplikację przy
 *    zapasie, zamiast wywracać start.
 * 3. Wybór użytkownika mieszka tam, gdzie reszta ustawień — w `store.js`, pod
 *    kluczem 'ms5.settings.v1'. Ten moduł nie dotyka localStorage sam.
 */

import { bus } from '../bus.js';
import * as store from '../store.js';

/* Trzydzieści języków w kolejności zasięgu (od najczęstszego), bo taka była
   decyzja o zakresie — ekran ustawień może je sobie posortować alfabetycznie.
   NAZWA JEST ENDONIMEM, czyli nazwą języka w tym języku: listy języków szuka
   ten, kto danego języka potrzebuje, a nie ten, kto rozumie język bieżący.
   Kierunek pisma trzymamy tutaj, a nie w słownikach, bo musi być znany ZANIM
   słownik się wczyta — inaczej pierwsze malowanie poszłoby w złą stronę. */
export const LANGUAGES = [
  { code: 'en', name: 'English',          dir: 'ltr' },
  { code: 'zh', name: '中文',              dir: 'ltr' },
  { code: 'hi', name: 'हिन्दी',              dir: 'ltr' },
  { code: 'es', name: 'Español',          dir: 'ltr' },
  { code: 'fr', name: 'Français',         dir: 'ltr' },
  { code: 'ar', name: 'العربية',            dir: 'rtl' },
  { code: 'bn', name: 'বাংলা',             dir: 'ltr' },
  { code: 'pt', name: 'Português',        dir: 'ltr' },
  { code: 'ru', name: 'Русский',          dir: 'ltr' },
  { code: 'ur', name: 'اردو',               dir: 'rtl' },
  { code: 'id', name: 'Bahasa Indonesia', dir: 'ltr' },
  { code: 'de', name: 'Deutsch',          dir: 'ltr' },
  { code: 'ja', name: '日本語',            dir: 'ltr' },
  { code: 'tr', name: 'Türkçe',           dir: 'ltr' },
  { code: 'ko', name: '한국어',            dir: 'ltr' },
  { code: 'vi', name: 'Tiếng Việt',        dir: 'ltr' },
  { code: 'it', name: 'Italiano',         dir: 'ltr' },
  { code: 'th', name: 'ไทย',               dir: 'ltr' },
  { code: 'fa', name: 'فارسی',             dir: 'rtl' },
  { code: 'pl', name: 'Polski',           dir: 'ltr' },
  { code: 'uk', name: 'Українська',       dir: 'ltr' },
  { code: 'nl', name: 'Nederlands',       dir: 'ltr' },
  { code: 'ta', name: 'தமிழ்',             dir: 'ltr' },
  { code: 'te', name: 'తెలుగు',             dir: 'ltr' },
  { code: 'ms', name: 'Bahasa Melayu',    dir: 'ltr' },
  { code: 'ro', name: 'Română',           dir: 'ltr' },
  { code: 'el', name: 'Ελληνικά',         dir: 'ltr' },
  { code: 'cs', name: 'Čeština',          dir: 'ltr' },
  { code: 'sv', name: 'Svenska',          dir: 'ltr' },
  { code: 'hu', name: 'Magyar',           dir: 'ltr' }
];

/** Język, w którym mówimy, gdy nie umiemy powiedzieć nic lepszego. */
export const DEFAULT_LANGUAGE = 'en';

const BY_CODE = new Map(LANGUAGES.map((entry) => [entry.code, entry]));

/* Słowniki już wczytane: kod -> płaska mapa kluczy. Import tego samego pliku
   drugi raz i tak oddałby ten sam moduł, ale mapa oszczędza obietnicę i
   pozwala pytać o gotowość synchronicznie. */
const dictionaries = new Map();

let active = DEFAULT_LANGUAGE;
let activeDict = null;
let fallbackDict = null;
let started = null;             // obietnica z init(); zarazem znacznik „już wystartowano”

/* ------------------------------------------------------------------
   Ostrzeżenia tylko dla programisty
   ------------------------------------------------------------------ */

function isDev() {
  try {
    const host = window.location.hostname;
    return window.location.protocol === 'file:'
      || host === 'localhost' || host === '127.0.0.1'
      || host === '::1' || host === '[::1]' || host.endsWith('.localhost');
  } catch (err) {
    return false;               // brak window: Node, worker — cisza
  }
}

/* Brakujący klucz wołany z pętli rysowania potrafi wypisać się sto razy na
   sekundę i zasypać konsolę; ostrzegamy o każdym raz. */
const warned = new Set();

function warnOnce(message) {
  if (!isDev() || warned.has(message)) return;
  warned.add(message);
  console.warn('[i18n] ' + message);
}

/* ------------------------------------------------------------------
   Kody języków
   ------------------------------------------------------------------ */

/** Czy mamy taki język (dokładny kod, bez regionu). */
export function isSupported(code) {
  return typeof code === 'string' && BY_CODE.has(code.toLowerCase());
}

/** Wpis listy dla kodu albo null — ekran ustawień bierze stąd nazwę własną. */
export function languageInfo(code) {
  return BY_CODE.get(String(code || '').toLowerCase()) || null;
}

/* Znacznik BCP-47 na nasz kod: 'de-AT' -> 'de', 'zh-TW' -> 'zh', 'pt-BR' -> 'pt'.
   Podkreślenie zamieniamy na myślnik, bo Android bywa podaje 'pl_PL'.
   Nierozpoznany znacznik zwraca null — decyzję, co wtedy, podejmuje detect(). */
function normalise(tag) {
  if (typeof tag !== 'string' || tag === '') return null;
  const lower = tag.toLowerCase().replace(/_/g, '-');
  if (BY_CODE.has(lower)) return lower;
  const primary = lower.split('-')[0];
  return BY_CODE.has(primary) ? primary : null;
}

function deviceLanguages() {
  try {
    const nav = window.navigator;
    if (!nav) return [];
    const list = Array.isArray(nav.languages) && nav.languages.length
      ? nav.languages
      : [nav.language];
    return list.filter((tag) => typeof tag === 'string');
  } catch (err) {
    return [];                  // brak navigator (Node, test) — zostanie zapas
  }
}

function savedChoice() {
  try {
    return normalise(store.get().language);
  } catch (err) {
    return null;                // ustawienia niedostępne — wykrywamy z urządzenia
  }
}

/* Pierwszy znacznik z urządzenia, który umiemy obsłużyć. Listę czytamy PO
   KOLEI, bo pierwsza pozycja bywa językiem, którego nie mamy, a druga —
   takim, który mamy. */
function fromDevice() {
  const tags = deviceLanguages();
  for (let i = 0; i < tags.length; i += 1) {
    const code = normalise(tags[i]);
    if (code) return code;
  }
  return null;
}

/**
 * Kolejność jest zamierzona: wybór użytkownika bije urządzenie, urządzenie
 * bije zapas.
 */
export function detect() {
  return savedChoice() || fromDevice() || DEFAULT_LANGUAGE;  // ANGIELSKI, nie polski
}

/* ------------------------------------------------------------------
   Ładowanie słowników
   ------------------------------------------------------------------ */

async function loadDictionary(code) {
  if (dictionaries.has(code)) return dictionaries.get(code);
  let dict = null;
  try {
    const module = await import('./locales/' + code + '.js');
    const value = module && module.default;
    if (value && typeof value === 'object') dict = value;
    else console.warn('[i18n] słownik "' + code + '" nie ma domyślnego eksportu');
  } catch (err) {
    console.warn('[i18n] nie udało się wczytać słownika "' + code + '":', err);
  }
  dictionaries.set(code, dict);   // także null: drugi raz nie próbujemy
  return dict;
}

/* Zapas ładujemy raz i trzymamy do końca życia karty: sięga do niego KAŻDY
   brakujący klucz, więc dociąganie go na żądanie byłoby wyścigiem. */
async function ensureFallback() {
  if (fallbackDict) return fallbackDict;
  fallbackDict = await loadDictionary(DEFAULT_LANGUAGE);

  /* Ratunek, nie wybór języka. Gdyby angielskiego zabrakło (plik jeszcze nie
     powstał, sieć padła przed zapisem w pamięci podręcznej), interfejs
     złożyłby się z nazw kluczy — 'measure.start' zamiast napisu na przycisku.
     Wtedy i TYLKO wtedy sięgamy po słownik źródłowy: zdanie w cudzym języku
     jest zrozumialsze niż kropkowany identyfikator. Ta gałąź milknie sama,
     gdy locales/en.js istnieje. */
  if (!fallbackDict) {
    fallbackDict = await loadDictionary('pl');
    if (fallbackDict) console.warn('[i18n] brak locales/en.js — awaryjnie używam słownika źródłowego');
  }
  return fallbackDict;
}

async function activateDictionary(code) {
  const dict = await loadDictionary(code);
  if (dict) {
    active = code;
    activeDict = dict;
    return active;
  }
  /* Słownika nie ma — zostajemy przy zapasie, ale mówimy o tym uczciwie:
     locale() musi zwracać język, w którym NAPRAWDĘ mówimy, bo bierze go Intl
     do dat, liczb i odmiany. Kłamstwo tutaj dałoby angielskie zdania z polską
     odmianą liczebnika. */
  active = (fallbackDict && fallbackDict === dictionaries.get(DEFAULT_LANGUAGE))
    ? DEFAULT_LANGUAGE
    : 'pl';
  activeDict = fallbackDict;
  return active;
}

/* ------------------------------------------------------------------
   Napisy
   ------------------------------------------------------------------ */

function own(dict, key) {
  return !!dict && Object.prototype.hasOwnProperty.call(dict, key);
}

function lookup(key) {
  if (own(activeDict, key)) return activeDict[key];
  if (own(fallbackDict, key)) {
    warnOnce('klucz "' + key + '" nieobecny w języku "' + active + '" — biorę z zapasu');
    return fallbackDict[key];
  }
  return undefined;
}

/* Instancje Intl.PluralRules są drogie w tworzeniu, a odmiana bywa liczona w
   pętli rysowania — trzymamy je w pamięci podręcznej po języku. */
const pluralRules = new Map();

function rulesFor(code) {
  let rules = pluralRules.get(code);
  if (!rules) {
    try {
      rules = new Intl.PluralRules(code);
    } catch (err) {
      rules = new Intl.PluralRules(DEFAULT_LANGUAGE);
    }
    pluralRules.set(code, rules);
  }
  return rules;
}

/* Kolejność awaryjna form idzie od najogólniejszej do najwęższej: język, w
   którego słowniku brakuje akurat tej kategorii, dostanie formę najbliższą
   sensem, a nie pusty napis. */
const FORM_ORDER = ['other', 'many', 'few', 'two', 'one', 'zero'];

function pickForm(forms, params) {
  const raw = params && (typeof params.n === 'number' ? params.n
    : (typeof params.count === 'number' ? params.count : null));

  if (raw !== null && Number.isFinite(raw)) {
    // Operand CLDR jest wartością bezwzględną; wołanie po abs zdejmuje
    // wątpliwość, gdyby któraś przeglądarka liczyła inaczej.
    const category = rulesFor(active).select(Math.abs(raw));
    if (own(forms, category)) return forms[category];
  }
  for (let i = 0; i < FORM_ORDER.length; i += 1) {
    if (own(forms, FORM_ORDER[i])) return forms[FORM_ORDER[i]];
  }
  return '';
}

/* Wstawka, której wywołujący nie podał, zostaje w napisie w klamrach: '{time}'
   widać w interfejsie od razu i da się to naprawić, a puste miejsce wygląda
   jak zamierzone. */
function interpolate(text, params) {
  if (!params || text.indexOf('{') === -1) return text;
  return text.replace(/\{([A-Za-z0-9_]+)\}/g, (whole, name) => {
    const value = params[name];
    if (value === undefined || value === null) {
      warnOnce('brak wstawki "' + name + '" dla napisu: ' + text);
      return whole;
    }
    return String(value);
  });
}

/**
 * Napis dla klucza. Zawsze zwraca napis — nigdy undefined, nigdy null.
 * Gdy wartością klucza jest obiekt form CLDR, formę rozstrzyga
 * Intl.PluralRules aktywnego języka po `params.n` (albo `params.count`).
 */
export function t(key, params) {
  const raw = lookup(key);
  if (raw === undefined) {
    warnOnce('brak klucza "' + key + '" — pokazuję sam klucz');
    return String(key);
  }
  const text = (raw !== null && typeof raw === 'object') ? pickForm(raw, params) : raw;
  return interpolate(String(text), params);
}

/** Czy klucz w ogóle istnieje (w aktywnym języku albo w zapasie). */
export function has(key) {
  return lookup(key) !== undefined;
}

/* ------------------------------------------------------------------
   Stan
   ------------------------------------------------------------------ */

/** Kod aktywnego języka — ten sam, który dostaje Intl (daty, liczby, odmiana). */
export function locale() {
  return active;
}

/** 'ltr' albo 'rtl' dla aktywnego języka. */
export function dir() {
  const entry = BY_CODE.get(active);
  return entry ? entry.dir : 'ltr';
}

function applyToRoot() {
  try {
    const root = document.documentElement;
    if (!root) return;
    root.setAttribute('lang', active);
    root.setAttribute('dir', dir());
  } catch (err) { /* brak DOM: Node, test — nie ma czego oznaczać */ }
}

/* ------------------------------------------------------------------
   Zmiana języka
   ------------------------------------------------------------------ */

/**
 * Ustawia język i zapamiętuje wybór. `null` (albo 'system') znaczy „wg
 * urządzenia” i kasuje zapamiętany wybór.
 *
 * Kolejność jest istotna: NAJPIERW słownik, dopiero potem zapis ustawień.
 * store.set() rozgłasza 'settings:changed', a ekran, który na to zdarzenie
 * odrysuje się natychmiast, musi zastać już nowe napisy — inaczej mrugnie
 * starym językiem.
 */
export async function setLanguage(code) {
  const wanted = (code === null || code === undefined || code === 'system')
    ? null
    : normalise(code);

  if (code && !wanted) {
    warnOnce('nieznany kod języka "' + code + '" — wracam do wykrywania z urządzenia');
  }

  await ensureFallback();
  const previous = active;
  await activateDictionary(wanted || fromDevice() || DEFAULT_LANGUAGE);

  try {
    store.set({ language: wanted });
  } catch (err) {
    console.warn('[i18n] nie udało się zapisać wyboru języka:', err);
  }

  applyToRoot();
  if (active !== previous) bus.emit('i18n:changed', { lang: active, dir: dir(), previous });
  return active;
}

/**
 * Start. Woła się raz, PRZED pierwszym rysowaniem — po powrocie z tej
 * obietnicy t() oddaje już prawdziwe napisy. Kolejne wywołania oddają tę samą
 * obietnicę, więc moduł, który nie wie, czy start już był, może ją bezpiecznie
 * poczekać. Nigdy nie odrzuca: brak słownika to gorszy interfejs, nie awaria.
 */
export function init() {
  if (started) return started;
  started = (async () => {
    await ensureFallback();
    await activateDictionary(detect());
    applyToRoot();

    /* Zmiana języka systemu w trakcie działania (przełącznik w Androidzie,
       ustawienia macOS) nie przeładowuje strony. Reagujemy tylko wtedy, gdy
       użytkownik nie wybrał języka ręcznie — jego wybór jest ważniejszy niż
       ustawienie systemu. */
    try {
      window.addEventListener('languagechange', () => {
        if (savedChoice()) return;
        setLanguage(null);
      });
    } catch (err) { /* brak window — nie ma czego nasłuchiwać */ }

    return active;
  })();
  return started;
}

/** Obietnica gotowości dla modułów, które ładują się po starcie. */
export function ready() {
  return started || init();
}
