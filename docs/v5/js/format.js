/* Monitor Światła v5 — formatowanie liczb, jednostek, dat i czasu.
 *
 * Jedyne miejsce w aplikacji, w którym liczba zamienia się w tekst dla
 * człowieka: przecinek dziesiętny, spacja nierozdzielająca w tysiącach i przed
 * jednostką, polskie skróty miesięcy i poprawna odmiana liczebników.
 *
 * Świadomie NIE importuje `metrics.js`: bierze katalog wprost z
 * '../../lib/catalogue.js', czyli z pliku, który sam nic nie importuje. Dzięki
 * temu format.js zostaje LIŚCIEM drzewa importów — da się go uruchomić w Node
 * bez DOM, bez kamery i bez całej matematyki pomiaru — a mimo to nie trzyma
 * własnej kopii jednostek ani miejsc po przecinku.
 *
 * Zasada nadrzędna: wartość niezmierzona (`null`, `undefined`, `NaN`,
 * `Infinity`) to pauza, nigdy zero. Zero jest wynikiem pomiaru, pauza jest
 * jego brakiem.
 */

import { CATALOGUE } from '../../lib/catalogue.js';

/* Pauza (myślnik) dla wartości, których nie zmierzono. */
const DASH = '—';

/* Spacja nierozdzielająca — zapisana kodem, bo w źródle jest nie do odróżnienia
 * od zwykłej. Liczba nie może zostać na końcu wiersza w oderwaniu od swojej
 * jednostki ani rozpaść się w środku tysięcy. */
const NBSP = '\u00A0';

/* Miejsca po przecinku i jednostki WYPROWADZONE z katalogu, a nie przepisane
 * obok niego. Wcześniej stały tu dwie ręczne mapy — trzecia kopia tych samych
 * pól — i komentarz przyznawał wprost, że przy dopisaniu wielkości trzeba je
 * uzupełnić ręcznie; to jest dokładnie ten rodzaj obowiązku, o którym się
 * zapomina, a jego skutkiem jest wielkość drukowana bez jednostki i z zerem
 * miejsc po przecinku. Teraz wielkość dopisana w katalogu formatuje się sama. */
const DECIMALS = {};
const UNITS = {};
for (const metric of CATALOGUE) {
  DECIMALS[metric.id] = metric.decimals;
  UNITS[metric.id] = metric.unit;
}

const MONTHS_SHORT = [
  'sty', 'lut', 'mar', 'kwi', 'maj', 'cze',
  'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'
];

/* Instancje Intl są drogie w tworzeniu, a `nf` bywa wołane kilkanaście razy na
 * sekundę podczas pomiaru — trzymamy je w pamięci podręcznej wg liczby miejsc. */
const numberFormats = new Map();

function formatterFor(decimals) {
  let f = numberFormats.get(decimals);
  if (!f) {
    f = new Intl.NumberFormat('pl-PL', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
    numberFormats.set(decimals, f);
  }
  return f;
}

/* Silniki wstawiają w grupach tysięcy raz zwykłą spację, raz wąską
 * nierozdzielającą — ujednolicamy, bo inaczej te same dane wyglądają inaczej
 * na dwóch telefonach. */
function normaliseSpaces(text) {
  return text.replace(/[\u0020\u00A0\u2009\u202F]/g, NBSP);
}

function isMeasured(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function toDate(ts) {
  const d = ts instanceof Date ? ts : new Date(ts);
  return Number.isFinite(d.getTime()) ? d : null;
}

function pad2(n) {
  return n < 10 ? '0' + n : String(n);
}

/* Liczba w polskim zapisie. `decimals` mówi tylko o liczbie miejsc po
 * przecinku — nie o tym, czy wartość jest wiarygodna. */
export function nf(value, decimals = 0) {
  if (!isMeasured(value)) return DASH;
  const places = Number.isFinite(decimals) ? Math.min(6, Math.max(0, Math.trunc(decimals))) : 0;
  // Wartość, która po zaokrągleniu jest zerem, nie może wyjść jako „-0,00” —
  // minus przy zerze czyta się jak usterka, a nie jak pomiar.
  const safe = Math.abs(value) < 0.5 / Math.pow(10, places) ? 0 : value;
  return normaliseSpaces(formatterFor(places).format(safe));
}

/* Sama wartość wielkości, z liczbą miejsc wziętą z lokalnej mapy. */
export function metricValue(metricId, value) {
  return nf(value, DECIMALS[metricId] ?? 0);
}

/* Wartość z jednostką. Gdy pomiaru nie ma, zwracamy samą pauzę — „— %”
 * sugerowałoby, że coś zmierzyliśmy i wyszło nieokreślone. */
export function metricValueUnit(metricId, value) {
  if (!isMeasured(value)) return DASH;
  const unit = UNITS[metricId];
  const text = metricValue(metricId, value);
  return unit ? text + NBSP + unit : text;
}

/* Godzina zegarowa, 24-godzinna: '14:07'. */
export function clock(ts) {
  const d = toDate(ts);
  if (!d) return DASH;
  return pad2(d.getHours()) + ':' + pad2(d.getMinutes());
}

/* Data bez roku: '24 sie'. Rok dokładamy dopiero tam, gdzie jest potrzebny
 * (patrz `relative`) — w historii z ostatnich dni tylko zaśmieca. */
export function dateShort(ts) {
  const d = toDate(ts);
  if (!d) return DASH;
  return d.getDate() + NBSP + MONTHS_SHORT[d.getMonth()];
}

/* '24 sie, 14:07' */
export function dateTime(ts) {
  const d = toDate(ts);
  if (!d) return DASH;
  return dateShort(d) + ', ' + clock(d);
}

/* Czas trwania sesji. Sekundy pokazujemy tylko poniżej dziesięciu minut —
 * dalej są już szumem, a wydłużają napis, który stoi obok wyniku. */
export function duration(ms) {
  if (!isMeasured(ms)) return DASH;
  const total = Math.max(0, Math.round(ms / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  if (days > 0) {
    const dayWord = plural(days, 'dzień', 'dni', 'dni');
    return hours > 0 ? dayWord + ' ' + hours + NBSP + 'godz.' : dayWord;
  }
  if (hours > 0) {
    return minutes > 0
      ? hours + NBSP + 'godz. ' + minutes + NBSP + 'min'
      : hours + NBSP + 'godz.';
  }
  if (minutes > 0) {
    return minutes < 10 && seconds > 0
      ? minutes + NBSP + 'min ' + seconds + NBSP + 's'
      : minutes + NBSP + 'min';
  }
  return seconds + NBSP + 's';
}

/* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglać w dół do zera:
 * dopóki różnica jest mniejsza niż minuta, mówimy „przed chwilą”, a nie
 * „0 min temu”. Poza granicą tygodnia wracamy do konkretnej daty — „37 dni
 * temu” niczego nie ułatwia. */
export function relative(ts, now = Date.now()) {
  const d = toDate(ts);
  const nowDate = toDate(now);
  if (!d || !nowDate) return DASH;

  const diff = nowDate.getTime() - d.getTime();
  // Znacznik z przyszłości to przestawiony zegar, a nie zdarzenie — uczciwiej
  // pokazać datę, niż odliczać do niej.
  if (diff < -60000) return dateTime(d);
  if (diff < 45000) return 'przed chwilą';
  if (diff < 90000) return 'minutę temu';

  const minutes = Math.round(diff / 60000);
  if (minutes < 60) return minutes + NBSP + 'min temu';

  const startOfDay = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const dayDiff = Math.round((startOfDay(nowDate) - startOfDay(d)) / 86400000);

  // „Wczoraj” liczymy po kalendarzu, nie po 24 godzinach: o 1:00 zdarzenie
  // sprzed trzech godzin było dzisiaj, a sprzed pięciu — wczoraj.
  if (dayDiff <= 0) {
    const hours = Math.round(diff / 3600000);
    return hours + NBSP + 'godz. temu';
  }
  if (dayDiff === 1) return 'wczoraj';
  if (dayDiff < 7) return dayDiff + NBSP + 'dni temu';

  return d.getFullYear() === nowDate.getFullYear()
    ? dateShort(d)
    : dateShort(d) + NBSP + d.getFullYear();
}

/* Odmiana liczebnika: '1 pomiar' / '2 pomiary' / '5 pomiarów'. Zwraca liczbę
 * razem z rzeczownikiem, bo po polsku formy nie da się wybrać bez liczby,
 * a rozdzielenie ich kusiłoby do sklejania „na piechotę” w wywołaniach. */
export function plural(n, one, few, many) {
  if (!isMeasured(n)) return DASH + ' ' + many;
  const abs = Math.abs(n);
  const text = nf(n, Number.isInteger(n) ? 0 : 1);
  // Ułamki traktujemy jak formę `many` — tak samo klasyfikuje je Intl.PluralRules
  // dla polskiego, a czwartej formy to API nie przewiduje.
  if (!Number.isInteger(abs)) return text + ' ' + many;
  if (abs === 1) return text + ' ' + one;
  const last = abs % 10;
  const lastTwo = abs % 100;
  const isFew = last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14);
  return text + ' ' + (isFew ? few : many);
}

/* Słowna nazwa strefy — obowiązkowa wszędzie, gdzie strefę pokazuje kolor.
 * Sam kolor nie wystarcza przy deuteranopii. */
export const ZONE_LABEL = {
  good: 'bezpiecznie',
  warn: 'umiarkowanie',
  crit: 'szkodliwie',
  none: 'brak danych'
};
