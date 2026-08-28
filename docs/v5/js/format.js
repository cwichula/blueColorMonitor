/* Monitor Światła v5 — formatowanie liczb, jednostek, dat i czasu.
 *
 * Jedyne miejsce w aplikacji, w którym liczba zamienia się w tekst dla
 * człowieka: separator dziesiętny, separator tysięcy, skróty miesięcy,
 * kolejność dnia i miesiąca oraz odmiana liczebnika — wszystko wzięte z
 * AKTYWNEGO JĘZYKA, a nie zaszyte po polsku.
 *
 * Ten plik nie zna ani jednego napisu: wzorce ('{day} {month}', '{minutes} min
 * temu', formy mnogie) mieszkają w słownikach `js/i18n/locales/*.js`, a ten
 * moduł tylko wstawia w nie liczby. Dzięki temu język, w którym data brzmi
 * 'Aug 24' albo '8月24日', nie wymaga tu żadnej gałęzi `if`.
 *
 * Świadomie NIE importuje `metrics.js`: bierze katalog wprost z
 * '../../lib/catalogue.js', czyli z pliku, który sam nic nie importuje —
 * jednostki i miejsca po przecinku nie są tu przepisane drugi raz z ręki.
 * Przestał być za to LIŚCIEM drzewa importów: doszedł `i18n/index.js` (a z nim
 * pośrednio `store.js`), bo bez znajomości języka nie da się sformatować
 * liczby. Cyklu to nie tworzy — store nie importuje format.js.
 *
 * Zasada nadrzędna: wartość niezmierzona (`null`, `undefined`, `NaN`,
 * `Infinity`) to pauza, nigdy zero. Zero jest wynikiem pomiaru, pauza jest
 * jego brakiem.
 */

import { CATALOGUE } from '../../lib/catalogue.js';
import { bus } from './bus.js';
import { t, locale } from './i18n/index.js';

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

/* ------------------------------------------------------------------
   Instancje Intl
   ------------------------------------------------------------------ */

/* Instancje Intl są drogie w tworzeniu, a `nf` bywa wołane kilkanaście razy na
 * sekundę podczas pomiaru — trzymamy je w pamięci podręcznej. KLUCZ ZAWIERA
 * JĘZYK, bo inaczej po przełączeniu na angielski liczby dalej wychodziłyby z
 * polskiego formatera: to ta sama liczba miejsc po przecinku, więc trafienie w
 * pamięć podręczną byłoby fałszywe. */
const intlCache = new Map();

function cachedIntl(kind, suffix, make) {
  const key = locale() + '|' + kind + '|' + suffix;
  let instance = intlCache.get(key);
  if (!instance) {
    instance = make(locale());
    intlCache.set(key, instance);
  }
  return instance;
}

/* Po zmianie języka stare instancje są już tylko zajętą pamięcią — klucz i tak
 * ich nie dosięgnie. Czyścimy, zamiast trzymać trzydzieści kompletów. */
bus.on('i18n:changed', () => intlCache.clear());

function formatterFor(decimals) {
  return cachedIntl('nf', String(decimals), (lang) => new Intl.NumberFormat(lang, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }));
}

/* Liczba BEZ grupowania tysięcy: numer dnia, rok, godziny, minuty i sekundy.
 * Rok jest tu powodem — `Intl.NumberFormat` zrobiłby z 2025 „2 025”, a to
 * wygląda jak usterka. Formater zamiast String() dlatego, że w językach z
 * własnymi cyframi (ar, hi, bn) rok pisany cyframi arabskimi obok daty pisanej
 * cyframi indyjskimi byłby zlepkiem dwóch systemów. */
function plainFormatter() {
  return cachedIntl('plain', '', (lang) => new Intl.NumberFormat(lang, { useGrouping: false }));
}

/* Zegar oddajemy Intl, a nie wzorcowi ze słownika: wzorzec '{hours}:{minutes}'
 * nie umie powiedzieć „2:05 PM”, a połowa z trzydziestu języków (en, ar, ko,
 * hi…) używa zegara dwunastogodzinnego z porą dnia. Dodawanie kluczy na „AM” i
 * „PM” do trzydziestu słowników byłoby przepisywaniem tego, co ICU już wie.
 * Klucz 'date.clock' zostaje jako droga awaryjna dla środowisk bez Intl.
 * `hour: '2-digit'` nie jest tu upodobaniem: przy 'numeric' polska dziewiąta
 * rano zrobiłaby się „9:05” zamiast dotychczasowego „09:05”. */
function clockFormatter() {
  return cachedIntl('clock', '', (lang) => new Intl.DateTimeFormat(lang, {
    hour: '2-digit',
    minute: '2-digit'
  }));
}

/* Skróty miesięcy bierzemy ze SŁOWNIKA, nie z Intl — mimo że Intl je zna.
 * Powód: skrót miesiąca jest treścią, którą tłumacz ma widzieć i móc poprawić,
 * więc dwanaście kluczy 'date.month.short.N' stoi w każdym z trzydziestu
 * słowników. Wynik ze słownika jest przy tym powtarzalny — ICU bywa dla
 * polskiego zwracał „sie.” z kropką zamiast „sie”, a data nie może wyglądać
 * inaczej na dwóch telefonach ani zmienić się przy podmianie przeglądarki.
 * Intl zostaje jako droga awaryjna dla języka, którego słownik nie ma jeszcze
 * tych kluczy. */
function monthFormatter() {
  return cachedIntl('month', '', (lang) => new Intl.DateTimeFormat(lang, { month: 'short' }));
}

/* ------------------------------------------------------------------
   Pomocnicze
   ------------------------------------------------------------------ */

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

/* Liczba całkowita bez grupowania, w cyfrach aktywnego języka. */
function plainInt(value) {
  try {
    return plainFormatter().format(value);
  } catch (err) {
    return String(value);
  }
}

function monthShort(monthIndex) {
  const key = 'date.month.short.' + (monthIndex + 1);
  const label = t(key);
  if (label !== key) return label;
  // Klucza nie zna ani aktywny język, ani zapas — lepiej skrót z ICU niż
  // 'date.month.short.8' w środku daty.
  try {
    return monthFormatter().format(new Date(2001, monthIndex, 1));
  } catch (err) {
    return plainInt(monthIndex + 1);
  }
}

/* ------------------------------------------------------------------
   Liczby i wielkości
   ------------------------------------------------------------------ */

/* Liczba w zapisie aktywnego języka. `decimals` mówi tylko o liczbie miejsc po
 * przecinku — nie o tym, czy wartość jest wiarygodna. */
export function nf(value, decimals = 0) {
  if (!isMeasured(value)) return DASH;
  const places = Number.isFinite(decimals) ? Math.min(6, Math.max(0, Math.trunc(decimals))) : 0;
  // Wartość, która po zaokrągleniu jest zerem, nie może wyjść jako „-0,00” —
  // minus przy zerze czyta się jak usterka, a nie jak pomiar.
  const safe = Math.abs(value) < 0.5 / Math.pow(10, places) ? 0 : value;
  return normaliseSpaces(formatterFor(places).format(safe));
}

/* Sama wartość wielkości, z liczbą miejsc wziętą z katalogu. */
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

/* ------------------------------------------------------------------
   Daty i czas
   ------------------------------------------------------------------ */

/* Godzina zegarowa: '14:07' po polsku, '2:07 PM' po angielsku. */
export function clock(ts) {
  const d = toDate(ts);
  if (!d) return DASH;
  try {
    return normaliseSpaces(clockFormatter().format(d));
  } catch (err) {
    return t('date.clock', { hours: pad2(d.getHours()), minutes: pad2(d.getMinutes()) });
  }
}

/* Data bez roku: '24 sie'. Rok dokładamy dopiero tam, gdzie jest potrzebny
 * (patrz `relative`) — w historii z ostatnich dni tylko zaśmieca. Kolejność
 * dnia i miesiąca siedzi we wzorcu 'date.short', bo po angielsku jest odwrotna. */
export function dateShort(ts) {
  const d = toDate(ts);
  if (!d) return DASH;
  return t('date.short', { day: plainInt(d.getDate()), month: monthShort(d.getMonth()) });
}

/* '24 sie, 14:07' */
export function dateTime(ts) {
  const d = toDate(ts);
  if (!d) return DASH;
  return t('date.dateTime', { date: dateShort(d), time: clock(d) });
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
    // Dni idą przez odmianę liczebnika, godziny już nie: '3 dni 4 godz.'
    const dayWord = plural(days, 'time.days.plural');
    return hours > 0
      ? t('time.duration.dayHour', { days: dayWord, hours: plainInt(hours) })
      : dayWord;
  }
  if (hours > 0) {
    return minutes > 0
      ? t('time.duration.hourMinute', { hours: plainInt(hours), minutes: plainInt(minutes) })
      : t('time.duration.hour', { hours: plainInt(hours) });
  }
  if (minutes > 0) {
    return minutes < 10 && seconds > 0
      ? t('time.duration.minuteSecond', { minutes: plainInt(minutes), seconds: plainInt(seconds) })
      : t('time.duration.minute', { minutes: plainInt(minutes) });
  }
  return t('time.duration.second', { seconds: plainInt(seconds) });
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
  if (diff < 45000) return t('time.justNow');
  if (diff < 90000) return t('time.aMinuteAgo');

  const minutes = Math.round(diff / 60000);
  if (minutes < 60) return t('time.minutesAgo', { minutes: plainInt(minutes) });

  const startOfDay = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const dayDiff = Math.round((startOfDay(nowDate) - startOfDay(d)) / 86400000);

  // „Wczoraj” liczymy po kalendarzu, nie po 24 godzinach: o 1:00 zdarzenie
  // sprzed trzech godzin było dzisiaj, a sprzed pięciu — wczoraj.
  if (dayDiff <= 0) {
    const hours = Math.round(diff / 3600000);
    return t('time.hoursAgo', { hours: plainInt(hours) });
  }
  if (dayDiff === 1) return t('time.yesterday');
  if (dayDiff < 7) return t('time.daysAgo', { days: plainInt(dayDiff) });

  return d.getFullYear() === nowDate.getFullYear()
    ? dateShort(d)
    : t('date.shortWithYear', { date: dateShort(d), year: plainInt(d.getFullYear()) });
}

/* ------------------------------------------------------------------
   Liczebniki
   ------------------------------------------------------------------ */

/* Reguły odmiany polskiej — używane WYŁĄCZNIE przez przejściowy podpis
 * plural(n, one, few, many) opisany niżej. Nowy kod ich nie dotyka: dla
 * pozostałych dwudziestu dziewięciu języków rozstrzyga Intl.PluralRules. */
function polishForm(abs, one, few, many) {
  if (!Number.isInteger(abs)) return many;
  if (abs === 1) return one;
  const last = abs % 10;
  const lastTwo = abs % 100;
  const isFew = last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14);
  return isFew ? few : many;
}

/**
 * Liczba razem z rzeczownikiem w poprawnej formie: '1 pomiar' / '2 pomiary' /
 * '5 pomiarów'. Zwraca jedno i drugie, bo formy nie da się wybrać bez liczby,
 * a rozdzielenie ich kusiłoby do sklejania „na piechotę” w wywołaniach.
 *
 * Podpis docelowy to `plural(n, 'unit.measurement.plural')` — klucz słownika,
 * którego wartością jest obiekt form CLDR; formę wybiera Intl.PluralRules
 * aktywnego języka. Ułamki dostają w CLDR formę `other`, a w słownikach
 * polskich `other` jest celowo równe `many`, więc „2,5 pomiarów” zostaje jak
 * było.
 *
 * PRZEJŚCIOWO przyjmuje też stary podpis `plural(n, one, few, many)` z trzema
 * polskimi słowami — używa go jeszcze czternaście miejsc w ekranach. Te
 * wywołania znikną w etapie 3 razem z tą gałęzią; do tego czasu odmienia je
 * reguła polska, a nie reguła aktywnego języka, bo przekazane słowa i tak są
 * polskie i tylko polska reguła da z nich napis, który ma sens.
 *
 * UWAGA dla etapu 3: sklejenie „liczba + spacja + słowo” jest tu zaszyte. W
 * części języków liczebnik stoi za rzeczownikiem albo ma inny separator; gdy
 * któryś słownik tego zażąda, formą mnogą stanie się cały wzorzec z '{count}',
 * a nie samo słowo — to zmiana w słownikach, nie tutaj.
 */
export function plural(n, keyOrOne, few, many) {
  if (typeof few === 'string' || typeof many === 'string') {
    if (!isMeasured(n)) return DASH + ' ' + many;
    const text = nf(n, Number.isInteger(n) ? 0 : 1);
    return text + ' ' + polishForm(Math.abs(n), keyOrOne, few, many);
  }

  const key = String(keyOrOne);
  // Bez liczby nie ma czego odmieniać: t() bez `n` oddaje formę najogólniejszą
  // ('other'), czyli to samo słowo, które stary kod dokładał do pauzy.
  if (!isMeasured(n)) return DASH + ' ' + t(key);
  return nf(n, Number.isInteger(n) ? 0 : 1) + ' ' + t(key, { n });
}

/* ------------------------------------------------------------------
   Strefy
   ------------------------------------------------------------------ */

/* Słowna nazwa strefy — obowiązkowa wszędzie, gdzie strefę pokazuje kolor.
 * Sam kolor nie wystarcza przy deuteranopii. */
export function zoneLabel(zone) {
  const id = (zone === 'good' || zone === 'warn' || zone === 'crit') ? zone : 'none';
  return t('zone.' + id);
}

/* PRZEJŚCIOWE: pięć plików sięga jeszcze po `ZONE_LABEL[zone]`. Stała ze
 * zwykłymi napisami zamarzłaby w języku, który był aktywny przy ładowaniu
 * modułu, więc pola są getterami — każde odczytanie pyta słownik na nowo.
 * Etap 3 podmienia wywołania na zoneLabel() i ten obiekt znika. */
export const ZONE_LABEL = Object.freeze({
  get good() { return zoneLabel('good'); },
  get warn() { return zoneLabel('warn'); },
  get crit() { return zoneLabel('crit'); },
  get none() { return zoneLabel('none'); }
});
