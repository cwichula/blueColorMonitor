/* Monitor Światła v5 — ekran pomiaru: serce aplikacji.
 *
 * Pełna maszyna stanów widoku: pusty -> startowanie -> praca -> pauza ->
 * zatrzymany (podsumowanie) -> błąd. To jedyne miejsce w aplikacji, które
 * zapisuje próbki do historii (dławione do ~1 Hz) i które po zatrzymaniu
 * odkłada sesję przez history.noteSession().
 *
 * Podział, który tłumaczy budowę pliku: cykl życia EKRANU (mount/unmount)
 * rządzi wyłącznie interfejsem, a cykl życia POMIARU biegnie własnym rytmem.
 * Zejście na inną zakładkę nie przerywa ani pomiaru, ani zbierania średnich
 * do podsumowania — przerywa tylko rysowanie i zapis do historii.
 */

import { bus } from '../bus.js';
import * as camera from '../camera.js';
import * as history from '../history.js';
import { CATALOGUE, byId, zoneFor } from '../metrics.js';
import { get as getSettings, set as saveSettings, thresholdsFor } from '../store.js';
import { metricValue, metricValueUnit, duration, clock, plural, zoneLabel } from '../format.js';
import { t, has as hasKey } from '../i18n/index.js';
import { h, icon, clear as clearNode, announce, rafThrottle, haptic } from '../ui/dom.js';
import { heroGauge, metricTile } from '../ui/gauge.js';
import { toast, sheet } from '../ui/overlays.js';

/* ─────────────────────────────  Stałe ekranu  ───────────────────────────── */

/* Kamera próbkuje 10 razy na sekundę, ale historia ma opisywać minuty i
 * godziny, nie dziesiąte części sekundy. Jedna próbka na sekundę wystarcza
 * każdemu zakresowi wykresu, a dziesięciokrotnie mniej obciąża localStorage. */
const PUSH_MS = 1000;

/* Podgląd zamiera, gdy przeglądarka wstrzyma klatki (karta w tle, rozmowa
 * telefoniczna). Po tym czasie bez próbki mówimy o tym wprost, zamiast
 * pokazywać zamrożoną liczbę jak świeży odczyt. */
const STALE_MS = 1500;

/* Poniżej pół minuty sesja jest raczej zerknięciem niż pomiarem, więc nie
 * trafia do historii sama — użytkownik decyduje przyciskiem. */
const SHORT_SESSION_MS = 30000;

/* Odpowiednik CROP_FRACTION z camera.js. Celownik MUSI pokazywać dokładnie ten
 * obszar, który jest mierzony — inaczej podgląd kłamie o tym, co widzi
 * przyrząd. Zmiana kadrowania w camera.js wymaga zmiany tej liczby. */
const CROP_PERCENT = 60;
const CROP_INSET = (100 - CROP_PERCENT) / 2;

const IDS = CATALOGUE.map((m) => m.id);

/* ────────────────────────────  Style komponentu  ───────────────────────── */

/* Tak samo jak w ui/gauge.js: reguły są owinięte w :where(), więc mają zerową
 * specyficzność i css/screens.css nadpisze każdą z nich jednym zwykłym
 * selektorem, niezależnie od kolejności wczytania. Ekran wygląda poprawnie
 * także w izolacji, a nie odbiera stylowania warstwie CSS. */
const STYLE_ID = 'm5-measure-styles';
const STYLE = `
:where(.m5-measure){display:flex;flex-direction:column;gap:var(--sp-5)}
:where(.m5-measure__view){display:flex;flex-direction:column;gap:var(--sp-5);margin:0}
:where(.m5-measure__view[hidden]){display:none}

:where(.m5-measure__intro,.m5-measure__fail){align-items:center;gap:var(--sp-4);
  padding:var(--sp-7) 0 var(--sp-5);text-align:center}
:where(.m5-measure__mark){display:inline-flex;align-items:center;justify-content:center;
  width:88px;height:88px;border-radius:var(--r-pill);
  background:var(--accent-soft);color:var(--accent)}
:where(.m5-measure__fail .m5-measure__mark){background:var(--zone-crit-soft);color:var(--zone-crit)}
:where(.m5-measure__headline){max-width:20ch;font-size:var(--fs-h2);font-weight:650;
  line-height:var(--lh-tight);letter-spacing:-.015em}
:where(.m5-measure__lead){max-width:38ch;color:var(--text-2);
  font-size:var(--fs-body);line-height:var(--lh-normal)}
:where(.m5-measure__cta){width:100%;max-width:24rem}
:where(.m5-measure__hint){max-width:38ch;color:var(--text-3);font-size:var(--fs-xs);
  line-height:var(--lh-normal)}
:where(.m5-measure__privacy){display:flex;align-items:flex-start;gap:var(--sp-2);
  max-width:44ch;margin-top:var(--sp-2);color:var(--text-3);
  font-size:var(--fs-xs);line-height:var(--lh-normal);text-align:left}

/* Podgląd + kolumna statusu w jednym rzędzie. flex-wrap jest ostatnią deską
   ratunku: przy skali tekstu 1,3 na 320 px kolumna statusu nie zmieści się
   obok kafelka i lepiej, żeby zjechała pod niego, niż żeby wypchnęła stronę
   w bok. Podgląd ma wtedy własną, węższą szerokość. */
:where(.m5-measure__stage){display:flex;flex-wrap:wrap;align-items:center;
  gap:var(--sp-4);min-width:0}
/* Kafelek ma stałą szerokość, a wysokość bierze z proporcji strumienia:
   camera.js mierzy 60 % SZEROKOŚCI I WYSOKOŚCI pełnej klatki, więc celownik
   pokrywa się z kadrem pomiarowym tylko wtedy, gdy widać całą klatkę.
   Kwadratowy kafelek z object-fit:cover obciąłby ją z góry i z dołu, a wtedy
   ramka celownika kłamałaby o tym, co jest liczone. */
:where(.m5-measure__preview){position:relative;flex:0 0 auto;width:124px;
  margin:0;overflow:hidden;border-radius:var(--r-lg);
  background:var(--surface-sunken);box-shadow:var(--shadow-inset-line)}
/* Zanim ruszy strumień, wysokości nie ma skąd wziąć — placeholder leży
   bezwzględnie i sam nic nie rozpycha. Kwadrat tylko na ten czas. */
:where(.m5-measure__preview[data-live="false"]){aspect-ratio:1}
@media (min-width:600px){:where(.m5-measure__preview){width:156px}}
:where(.m5-measure__video){display:block;width:100%;height:auto;
  background:var(--surface-sunken)}
/* Przedni obiektyw lustrzymy WYŁĄCZNIE w podglądzie: człowiek szuka w nim
   siebie, a nie kadru. Kadr jest symetryczny, więc pomiaru to nie dotyka. */
:where(.m5-measure__preview[data-facing="user"] .m5-measure__video){transform:scaleX(-1)}
:where(.m5-measure__preview[data-live="false"] .m5-measure__video){opacity:0}
:where(.m5-measure__placeholder){position:absolute;inset:0;display:flex;
  align-items:center;justify-content:center;color:var(--text-3)}
:where(.m5-measure__preview[data-live="true"] .m5-measure__placeholder){display:none}
/* Celownik: obszar mierzony zostaje czysty, reszta kadru gaśnie pod ogromnym
   cieniem przyciętym krawędzią kafelka. Widać od razu, CO jest mierzone. */
:where(.m5-measure__reticle){position:absolute;inset:${CROP_INSET}%;
  border:1.5px solid rgba(255,255,255,.88);border-radius:var(--r-sm);
  box-shadow:0 0 0 100vmax rgba(6,10,18,.44);pointer-events:none}
:where(.m5-measure__preview[data-live="false"] .m5-measure__reticle){display:none}
:where(.m5-measure__reticle)::before,:where(.m5-measure__reticle)::after{
  content:"";position:absolute;left:50%;top:50%;background:rgba(255,255,255,.92)}
:where(.m5-measure__reticle)::before{width:15px;height:1.5px;transform:translate(-50%,-50%)}
:where(.m5-measure__reticle)::after{width:1.5px;height:15px;transform:translate(-50%,-50%)}

/* Kolumna statusu MUSI mieć min-width:0 i bazę mniejszą niż to, co w niej
   stoi. Domyślne min-width:auto elementu flexa liczy się od najdłuższego
   nierozrywalnego kawałka — plakietka .m5-badge ma white-space:nowrap, więc
   bez tego kolumna rozpychała się poza kadr zamiast zawijać. */
:where(.m5-measure__status){display:flex;flex-direction:column;gap:var(--sp-2);
  flex:1 1 9rem;min-width:0}
:where(.m5-measure__statusRow){display:flex;flex-wrap:wrap;align-items:center;
  gap:var(--sp-2);min-width:0}
:where(.m5-measure__statusRow) > *{min-width:0;max-width:100%}
:where(.m5-measure__caption){min-width:0;color:var(--text-2);font-size:var(--fs-xs);
  line-height:var(--lh-normal);overflow-wrap:anywhere;hyphens:auto}
/* Podpis „tylny obiektyw” jest jednym słowem obok plakietki i nie ma prawa
   złamać się w środku ani wypchnąć wiersza — skraca się wielokropkiem. */
:where(.m5-measure__statusRow) > :where(.m5-measure__caption){
  flex:1 1 6rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
  overflow-wrap:normal}
:where(.m5-measure__stale){display:flex;align-items:center;gap:var(--sp-2);
  color:var(--zone-warn);font-size:var(--fs-xs);font-weight:600}
:where(.m5-measure__stale[hidden]){display:none}

:where(.m5-measure__boot){display:flex;flex-direction:column;align-items:flex-start;
  gap:var(--sp-3);padding:var(--sp-5);border-radius:var(--r-lg);
  background:var(--surface-1);box-shadow:var(--shadow-1)}
:where(.m5-measure__bootTitle){font-size:var(--fs-h3);font-weight:650}
:where(.m5-measure__bootText){max-width:44ch;color:var(--text-2);
  font-size:var(--fs-sm);line-height:var(--lh-normal)}

/* Tekst na 14-procentowym tincie strefy czyta się kolorem tekstu, a nie
   --zone-warn-on: ta barwa jest przeznaczona na PEŁNĄ barwę strefy i na tincie
   daje kontrast 1,2:1. Tak samo robi .m5-screen__demo. */
:where(.m5-measure__hold){display:flex;align-items:center;gap:var(--sp-3);
  padding:var(--sp-3) var(--sp-4);border-radius:var(--r-md);
  background:var(--zone-warn-soft);color:var(--text-1);
  font-size:var(--fs-sm);line-height:var(--lh-normal)}
:where(.m5-measure__hold .m5-icon){color:var(--zone-warn)}

:where(.m5-measure__hero){width:100%;max-width:26rem;margin-inline:auto;
  border-radius:var(--r-xl);outline:none}
:where(.m5-measure__hero:focus-visible){outline:3px solid var(--accent-ring);outline-offset:4px}
:where(.m5-measure__hero[data-swap="true"]){animation:m5-measure-swap var(--dur-3) var(--ease-out)}
@keyframes m5-measure-swap{from{opacity:.4;transform:scale(.975)}to{opacity:1;transform:none}}

:where(.m5-measure__grid){display:grid;gap:var(--sp-3);
  grid-template-columns:repeat(2,minmax(0,1fr))}
@media (min-width:560px){:where(.m5-measure__grid){grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (min-width:900px){:where(.m5-measure__grid){grid-template-columns:repeat(4,minmax(0,1fr))}}
:where(.m5-measure__gridHint){color:var(--text-3);font-size:var(--fs-xs);text-align:center}
/* Jedyna reguła poza :where() w tym pliku. Wielkość wiodąca znika z siatki
   atrybutem 'hidden', ale ui/gauge.js nadaje kafelkowi display:flex regułą
   autora — a ta bije display:none z arkusza przeglądarki niezależnie od
   specyficzności. Bez tej linii kafelek-bohater stałby w siatce po raz drugi. */
.m5-measure .m5-tile[hidden]{display:none}

/* Pasek akcji przykleja się do dołu obszaru przewijania. Gradient zamiast
   pełnego tła: pod paskiem widać, że treść trwa dalej. */
:where(.m5-measure__bar){position:sticky;bottom:0;z-index:1;display:flex;
  flex-wrap:wrap;gap:var(--sp-3);
  padding:var(--sp-4) 0 calc(var(--sp-3) + var(--safe-b));
  background:linear-gradient(to top,var(--surface-0) 64%,rgba(0,0,0,0))}
:where(.m5-measure__bar > .m5-btn){flex:1 1 8rem}
/* Bez :where(), bo ta reguła musi wygrać z .m5-btn z components.css — a
   :where() zeruje specyficzność. Tam przycisk dostaje min-width:0 i
   overflow-wrap:anywhere, żeby zdanie („Rozpocznij 7 dni próbnych”) łamało
   się zamiast wypychać układ. Tu etykieta jest JEDNYM słowem: na 320 px oba
   przyciski mieściły się w jednym wierszu tylko dlatego, że wolno im było
   zejść poniżej szerokości słowa — i „Zatrzymaj” pękało w środku na
   „Zatrzyma / j”. Para „overflow-wrap:normal + min-width:min-content”
   przywraca słowu prawo do całej swojej szerokości, więc pasek najpierw
   zawija przyciski jeden pod drugi (flex-wrap wyżej), a dopiero potem
   cokolwiek łamie. Sama zmiana overflow-wrap nie wystarczy: min-width:0
   nadal pozwoliłoby ścisnąć przycisk, tyle że tekst wyszedłby poza jego
   krawędź. */
.m5-measure__bar > .m5-btn{overflow-wrap:normal;min-width:min-content}
:where(.m5-measure__bar > .m5-btn.m5-btn--icon){flex:0 0 auto}

:where(.m5-measure__meta){color:var(--text-2);font-size:var(--fs-sm);
  line-height:var(--lh-normal)}
:where(.m5-measure__stats){display:grid;gap:var(--sp-3);
  grid-template-columns:repeat(auto-fit,minmax(8.5rem,1fr))}
:where(.m5-measure__worst){display:flex;flex-wrap:wrap;align-items:baseline;gap:var(--sp-2)}
:where(.m5-measure__worstName){font-size:var(--fs-h3);font-weight:650}
:where(.m5-measure__worstValue){font-family:var(--ff-num);font-variant-numeric:tabular-nums;
  font-size:var(--fs-h3);font-weight:650;color:var(--zone,var(--zone-none))}
:where(.m5-measure__advice){display:flex;align-items:flex-start;gap:var(--sp-3);
  padding:var(--sp-4);border-radius:var(--r-md);background:var(--accent-soft);
  color:var(--text-1);font-size:var(--fs-body);line-height:var(--lh-normal)}
:where(.m5-measure__advice .m5-icon){color:var(--accent)}
:where(.m5-measure__note){color:var(--text-3);font-size:var(--fs-xs);
  line-height:var(--lh-normal)}
:where(.m5-measure__failText){max-width:44ch;color:var(--text-2);
  font-size:var(--fs-body);line-height:var(--lh-normal)}

/* Faza pomiaru steruje widocznością części „na żywo”. Jeden atrybut zamiast
   sześciu ręcznie przełączanych 'hidden'. */
:where(.m5-measure__live[data-phase="starting"]) :where(.m5-measure__hero,
  .m5-measure__grid,.m5-measure__gridHint,.m5-measure__bar,.m5-measure__hold){display:none}
:where(.m5-measure__live:not([data-phase="starting"])) :where(.m5-measure__boot){display:none}
:where(.m5-measure__live:not([data-phase="paused"])) :where(.m5-measure__hold){display:none}
`;

function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const tag = document.createElement('style');
  tag.id = STYLE_ID;
  tag.textContent = STYLE;
  document.head.appendChild(tag);
}

/* ───────────────────────────  Drobne narzędzia  ─────────────────────────── */

function num(v) {
  return typeof v === 'number' && Number.isFinite(v);
}

function limitsOf(metric) {
  return thresholdsFor(metric.id) || { warn: metric.warn, crit: metric.crit };
}

function zoneOf(metric, value) {
  if (!num(value)) return 'none';
  const limits = limitsOf(metric);
  return zoneFor(value, limits.warn, limits.crit, metric.invert) || 'none';
}

function reducedMotion() {
  if (typeof document === 'undefined') return true;
  const attr = document.documentElement.getAttribute('data-motion');
  if (attr === 'reduced') return true;
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) {
    return false;
  }
}

/* Jak bardzo wielkość odstaje od dobrego zakresu. Ranga strefy decyduje,
 * a odległość od progu ostrzegawczego (znormalizowana zakresem katalogowym)
 * rozstrzyga remisy — inaczej „najgorsza” byłaby po prostu pierwsza z listy.
 * Także wśród wielkości bezpiecznych wygrywa ta najbliżej progu, bo to o niej
 * warto powiedzieć zdanie. */
function severity(metric, value) {
  const zone = zoneOf(metric, value);
  if (zone === 'none') return null;
  const limits = limitsOf(metric);
  const span = Math.abs(metric.max - metric.min) || 1;
  // Dodatnie po złej stronie progu, ujemne po dobrej.
  const past = metric.invert ? (limits.warn - value) / span : (value - limits.warn) / span;
  const rank = zone === 'crit' ? 2 : (zone === 'warn' ? 1 : 0);
  const detail = zone === 'good'
    ? 1 - Math.min(1, Math.max(0, -past))
    : Math.max(0, past);
  return { zone, score: rank + Math.min(0.99, detail) };
}

/* ─────────────────────────────  Zalecenia  ─────────────────────────────── */

/* Jedno zdanie, konkretne i wykonalne dzisiaj wieczorem. Pora dnia ma
 * znaczenie: chłodne, jasne światło o 11:00 jest w porządku, o 22:00 nie —
 * a rada, która tego nie rozróżnia, jest radą dla nikogo. */
function isEvening(ts) {
  const hour = new Date(num(ts) ? ts : Date.now()).getHours();
  return hour >= 19 || hour < 6;
}

function adviceFor(metric, value, zone, endedAt) {
  const evening = isEvening(endedAt);
  const shown = metricValueUnit(metric.id, value);

  if (zone === 'good') return t('measure.advice.good');

  // Wartość wchodzi wstawką {value}: w części języków liczba stoi w zdaniu
  // gdzie indziej niż po polsku i sklejanie odebrałoby tłumaczowi szyk.
  switch (metric.id) {
    case 'share':
      return t(evening ? 'measure.advice.share.evening' : 'measure.advice.share.day', { value: shown });
    case 'brightness':
      return t('measure.advice.brightness', { value: shown });
    case 'kelvin':
      return t(evening ? 'measure.advice.kelvin.evening' : 'measure.advice.kelvin.day', { value: shown });
    case 'melanopic':
      return t(evening ? 'measure.advice.melanopic.evening' : 'measure.advice.melanopic.day', { value: shown });
    case 'flicker':
      return t('measure.advice.flicker', { value: shown });
    case 'uniformity':
      return t('measure.advice.uniformity', { value: shown });
    case 'comfort':
      return t('measure.advice.comfort', { value: shown });
    default:
      return t('measure.advice.default');
  }
}

/* ──────────────────────────────  Ekran  ────────────────────────────────── */

export function create() {
  ensureStyles();

  /* ---- stan ekranu ---- */
  let mounted = false;
  let paused = false;              // HOLD: wskazania zamrożone przez użytkownika
  let switching = false;           // trwa zamiana obiektywu (stop + start)
  let stopping = false;            // trwa nasze zatrzymanie — ignorujemy echo stanu
  let starting = false;            // trwa nasze wywołanie start()
  let lastReading = null;
  let lastReadingAt = 0;
  let lastPushAt = 0;
  let summary = null;              // ostatnia zamknięta sesja do podsumowania
  /* Błąd kamery pamiętamy KODEM, nie gotowym zdaniem: zdanie zamarzłoby w
   * języku sprzed przełączenia, a z kodu napis powstaje na nowo przy każdym
   * rysowaniu. Tak samo faza widoku — plakietka i przycisk pauzy odtwarzają
   * z niej swoje napisy po zmianie języka. */
  let errorCode = '';
  let failNoteMs = 0;              // czas sesji uratowanej przed błędem (0 = brak)
  let phase = 'starting';
  let leadId = resolveLead(getSettings().leadMetric);

  const uiSubs = [];
  let sessionOff = null;
  let sessionAcc = null;
  let pausedAt = 0;
  let staleTimer = 0;
  let swapTimer = 0;

  /* ---- elementy kamery ---- */
  /* Powłoka dostarcza <video> i ukryty <canvas> w index.html. Bierzemy je
   * takimi, jakie są (żeby nie powstał drugi strumień), a gdy ich nie ma —
   * dorabiamy własne, bo pomiar ma działać także w podglądzie samego ekranu. */
  const video = adoptVideo();
  const canvas = adoptCanvas();
  camera.attach({ video, canvas });

  /* ---- widok: stan pusty ---- */
  /* Napis przycisku, który stoi obok ikony, jest osobnym węzłem tekstowym:
   * po zmianie języka podmieniamy sam tekst, nie ruszając rysunku. */
  const startBtnLabel = document.createTextNode('');
  const startBtn = h('button.m5-btn.m5-btn--primary.m5-btn--lg.m5-btn--block.m5-measure__cta', {
    type: 'button',
    on: { click: () => startMeasurement() }
  }, icon('play', { size: 22 }), startBtnLabel);

  const introHeadline = h('h2.m5-measure__headline');
  const introLead = h('p.m5-measure__lead');
  const introHint = h('p.m5-measure__hint');
  const introPrivacy = h('span');

  const introView = h('section.m5-measure__view.m5-measure__intro', null,
    h('span.m5-measure__mark', icon('gauge', { size: 40 })),
    introHeadline,
    introLead,
    startBtn,
    introHint,
    h('p.m5-measure__privacy', null,
      icon('lock', { size: 16 }),
      introPrivacy)
  );

  /* ---- widok: praca (startowanie / praca / pauza) ---- */
  const previewFigure = h('figure.m5-measure__preview', {
    dataset: { live: 'false', facing: camera.facing() }
  },
    video,
    h('span.m5-measure__placeholder', icon('cameraFlip', { size: 26 })),
    h('span.m5-measure__reticle', { aria: { hidden: 'true' } })
  );

  const liveBadge = h('span.m5-badge');
  const facingLabel = h('span.m5-measure__caption', { text: '' });
  const staleText = h('span');
  const staleNote = h('p.m5-measure__stale', { hidden: true, aria: { live: 'polite' } },
    icon('alert', { size: 16 }),
    staleText);

  // Odsetek kadru wchodzi wstawką {percent}: sklejanie liczby z napisem nie
  // przetrwałoby języka, w którym znak procentu stoi przed liczbą.
  const cropCaption = h('p.m5-measure__caption');

  const stage = h('div.m5-measure__stage', null,
    previewFigure,
    h('div.m5-measure__status', null,
      h('div.m5-measure__statusRow', null, liveBadge, facingLabel),
      cropCaption,
      staleNote)
  );

  const bootTitle = h('p.m5-measure__bootTitle');
  const bootText = h('p.m5-measure__bootText');
  const bootCancel = h('button.m5-btn.m5-btn--ghost', {
    type: 'button', on: { click: () => cancelStart() }
  });

  const bootPanel = h('div.m5-measure__boot', null, bootTitle, bootText, bootCancel);

  const holdText = h('span');
  const holdBanner = h('p.m5-measure__hold', { aria: { role: 'status' } },
    icon('alert', { size: 20 }),
    holdText);

  const hero = heroGauge({ metricId: leadId });
  const heroWrap = h('div.m5-measure__hero', { tabindex: '-1' }, hero.el);

  const tiles = CATALOGUE.map((metric) => ({
    metric,
    view: metricTile({
      metricId: metric.id,
      selected: metric.id === leadId,
      onSelect: (id) => setLead(id)
    })
  }));

  const grid = h('div.m5-measure__grid', null, tiles.map((tile) => tile.view.el));
  const gridHint = h('p.m5-measure__gridHint');

  const stopBtnLabel = document.createTextNode('');
  const stopBtn = h('button.m5-btn.m5-btn--primary', {
    type: 'button', on: { click: () => stopMeasurement() }
  }, icon('stop', { size: 20 }), stopBtnLabel);

  const pauseBtn = h('button.m5-btn.m5-btn--ghost', {
    type: 'button', on: { click: () => setPaused(!paused) }
  });

  const flipBtn = h('button.m5-btn.m5-btn--ghost.m5-btn--icon', {
    type: 'button', on: { click: () => flipCamera() }
  }, icon('cameraFlip', { size: 22 }));

  const liveView = h('section.m5-measure__view.m5-measure__live', {
    hidden: true, dataset: { phase: 'starting' }
  }, stage, bootPanel, holdBanner, heroWrap, grid, gridHint,
     h('div.m5-measure__bar', null, stopBtn, pauseBtn, flipBtn));

  /* ---- widok: podsumowanie ---- */
  const summaryView = h('section.m5-measure__view.m5-measure__summary', { hidden: true });

  /* ---- widok: błąd ---- */
  const failText = h('p.m5-measure__failText', { text: '' });
  const failNote = h('p.m5-measure__note', { hidden: true, text: '' });
  const failHeadline = h('h2.m5-measure__headline');
  const failRetry = h('button.m5-btn.m5-btn--primary.m5-btn--lg.m5-btn--block.m5-measure__cta', {
    type: 'button', on: { click: () => startMeasurement() }
  });
  const failBack = h('button.m5-btn.m5-btn--ghost', {
    type: 'button', on: { click: () => { errorCode = ''; failNoteMs = 0; setView('empty'); } }
  });
  const failView = h('section.m5-measure__view.m5-measure__fail', { hidden: true },
    h('span.m5-measure__mark', icon('alert', { size: 40 })),
    failHeadline,
    failText,
    failNote,
    failRetry,
    failBack
  );

  const el = h('div.m5-measure', { dataset: { state: 'empty' } },
    introView, liveView, summaryView, failView);

  /* ──────────────────────────────  Napisy  ───────────────────────────────── */

  /* WSZYSTKIE napisy tego ekranu powstają tutaj — raz przy złożeniu widoku i
   * ponownie po każdej zmianie języka. Gdyby stały w wywołaniach h(), zamarzłyby
   * w języku aktywnym w chwili budowy: app.js tworzy instancję ekranu RAZ i
   * trzyma ją do końca działania aplikacji, więc drugiej okazji by nie było. */
  function applyText() {
    introView.setAttribute('aria-label', t('measure.intro.aria'));
    introHeadline.textContent = t('measure.intro.headline');
    introLead.textContent = t('measure.intro.lead');
    startBtnLabel.nodeValue = t('measure.intro.start');
    introHint.textContent = t('measure.intro.hint');
    introPrivacy.textContent = t('measure.intro.privacy');

    liveView.setAttribute('aria-label', t('measure.live.aria'));
    staleText.textContent = t('measure.stale');
    cropCaption.textContent = t('measure.crop', { percent: CROP_PERCENT });
    bootTitle.textContent = t('measure.boot.title');
    bootText.textContent = t('measure.boot.text');
    bootCancel.textContent = t('measure.boot.cancel');
    holdText.textContent = t('measure.hold');
    gridHint.textContent = t('measure.gridHint');
    stopBtnLabel.nodeValue = t('measure.stop');
    // Wartość wyjściowa; syncFacing() zaraz zastąpi ją opisem kierunku.
    flipBtn.setAttribute('aria-label', t('measure.flip.aria'));

    summaryView.setAttribute('aria-label', t('measure.summary.aria'));

    failView.setAttribute('aria-label', t('measure.fail.aria'));
    failHeadline.textContent = t('measure.fail.headline');
    failRetry.textContent = t('measure.fail.retry');
    failBack.textContent = t('measure.fail.back');

    setPhase(phase);
    syncFacing();
    syncFailText();
    // Podsumowanie jest w całości zbudowane z napisów — składamy je od nowa.
    if (summary) renderSummary(summary);
  }

  /* Napis błędu kamery bierzemy z KODU, a nie z komunikatu przyniesionego przez
   * szynę — dzięki temu po przełączeniu języka mówi w nowym. */
  function cameraErrorText() {
    const key = 'camera.error.' + errorCode;
    return errorCode && hasKey(key) ? t(key) : t('measure.error.fallback');
  }

  function syncFailText() {
    failText.textContent = errorCode ? cameraErrorText() : '';
    failNote.textContent = failNoteMs > 0
      ? t('measure.fail.savedSession', { duration: duration(failNoteMs) })
      : '';
  }

  /* ───────────────────────  Elementy kamery: adopcja  ────────────────────── */

  function adoptVideo() {
    const found = typeof document !== 'undefined'
      ? document.querySelector('video[data-m5-camera], video#cam, video#camera, video#video')
      : null;
    const node = found || h('video');
    node.classList.add('m5-measure__video');
    // Podgląd jest ilustracją do liczb, nie treścią — czytnik ekranu dostaje
    // opis w podpisie kafelka, a nie pusty element multimedialny.
    node.setAttribute('aria-hidden', 'true');
    node.removeAttribute('hidden');
    node.style.removeProperty('display');
    return node;
  }

  function adoptCanvas() {
    const found = typeof document !== 'undefined'
      ? document.querySelector('canvas[data-m5-camera], canvas#camCanvas, canvas#frame')
      : null;
    // Canvas próbkujący nigdy nie jest widoczny; gdy powłoka go nie dała,
    // zostaje poza dokumentem — camera.js i tak czyta z niego piksele.
    return found || h('canvas', { width: 64, height: 64, hidden: true });
  }

  /* ─────────────────────────  Maszyna stanów widoku  ─────────────────────── */

  function setView(state) {
    if (el.dataset.state === state) return;
    el.dataset.state = state;
    introView.hidden = state !== 'empty';
    liveView.hidden = state !== 'live';
    summaryView.hidden = state !== 'summary';
    failView.hidden = state !== 'error';
  }

  function setPhase(next) {
    phase = next;                   // zapamiętana, żeby przeżyła zmianę języka
    liveView.dataset.phase = next;
    previewFigure.dataset.live = String(next !== 'starting');
    liveBadge.textContent = next === 'starting'
      ? t('measure.badge.starting')
      : (next === 'paused' ? t('measure.badge.paused') : t('measure.badge.running'));
    // Zmienna etykieta niesie już stan; aria-pressed=„wciśnięty” przy napisie
    // „Wznów” mówiłoby czytnikowi coś dokładnie odwrotnego.
    pauseBtn.textContent = next === 'paused' ? t('measure.resume') : t('measure.pause');
  }

  function syncFacing() {
    const front = camera.facing() === 'user';
    previewFigure.dataset.facing = camera.facing();
    facingLabel.textContent = front ? t('measure.facing.front') : t('measure.facing.back');
    flipBtn.setAttribute('aria-label',
      front ? t('measure.flip.toBack') : t('measure.flip.toFront'));
  }

  /* Widok wyprowadzamy ze stanu kamery, nie z historii kliknięć — dzięki temu
   * powrót na ekran w trakcie trwającego pomiaru zastaje właściwy obraz, choćby
   * pomiar ruszył przed pierwszym mount(). */
  function syncFromCamera() {
    const state = camera.state();
    if (state === 'error') { setView('error'); return; }
    if (state === 'starting') { setView('live'); setPhase('starting'); return; }
    if (state === 'running') {
      ensureSession();
      setView('live');
      setPhase(paused ? 'paused' : 'running');
      return;
    }
    setView(summary ? 'summary' : 'empty');
  }

  /* ────────────────────────────  Sesja pomiaru  ──────────────────────────── */

  /* Akumulator sesji ma własny nasłuch, niezależny od mount()/unmount().
   * Gdyby żył razem z ekranem, średnia z sesji gubiłaby czas spędzony na innej
   * zakładce — a pomiar wtedy trwa i użytkownik ma prawo oczekiwać, że jest
   * liczony. Do historii NIC wtedy nie idzie: tego pilnuje osobna ścieżka. */
  function ensureSession() {
    if (sessionAcc) return;
    const known = camera.session();
    const startedAt = known && num(known.startedAt) ? known.startedAt : Date.now();
    sessionAcc = { startedAt, samples: 0, pausedMs: 0, acc: {} };
    IDS.forEach((id) => {
      sessionAcc.acc[id] = { sum: 0, n: 0, min: Infinity, max: -Infinity };
    });
    sessionOff = bus.on('camera:reading', onReadingSession);
  }

  function onReadingSession(payload) {
    // Wstrzymanie ma znaczyć dokładnie to, co mówi: próbki z pauzy nie wchodzą
    // do żadnej średniej, bo użytkownik właśnie odłożył telefon albo przestawia
    // lampę — a to nie jest scena, którą chciał zmierzyć.
    if (!sessionAcc || paused) return;
    const reading = payload && payload.reading;
    if (!reading) return;
    sessionAcc.samples += 1;
    for (let i = 0; i < IDS.length; i += 1) {
      const v = reading[IDS[i]];
      if (!num(v)) continue;      // wielkość niezmierzona nie psuje średniej
      const a = sessionAcc.acc[IDS[i]];
      a.sum += v;
      a.n += 1;
      if (v < a.min) a.min = v;
      if (v > a.max) a.max = v;
    }
  }

  function endSession(endedAt) {
    if (sessionOff) { sessionOff(); sessionOff = null; }
    if (!sessionAcc) return null;
    const acc = sessionAcc;
    sessionAcc = null;
    if (paused && pausedAt) acc.pausedMs += Math.max(0, endedAt - pausedAt);
    pausedAt = 0;

    const avg = {}, min = {}, max = {};
    IDS.forEach((id) => {
      const a = acc.acc[id];
      avg[id] = a.n ? a.sum / a.n : null;
      min[id] = a.n ? a.min : null;
      max[id] = a.n ? a.max : null;
    });
    const durationMs = Math.max(0, endedAt - acc.startedAt);
    return {
      startedAt: acc.startedAt,
      endedAt,
      durationMs,
      measuredMs: Math.max(0, durationMs - acc.pausedMs),
      pausedMs: acc.pausedMs,
      samples: acc.samples,
      avg, min, max
    };
  }

  /* Kształt zgodny z camera.session(): history.js dostaje to samo, co dostałby
   * od kamery, plus informację o czasie rzeczywiście mierzonym. */
  function toNote(s) {
    return {
      startedAt: s.startedAt, endedAt: s.endedAt, samples: s.samples,
      pausedMs: s.pausedMs, avg: s.avg, min: s.min, max: s.max
    };
  }

  /* ────────────────────────────  Sterowanie  ─────────────────────────────── */

  async function startMeasurement() {
    if (starting || camera.state() === 'running') return;
    starting = true;
    errorCode = '';
    failNoteMs = 0;
    failNote.hidden = true;
    syncFailText();
    summary = null;
    paused = false;
    lastPushAt = 0;
    lastReadingAt = 0;
    setView('live');
    setPhase('starting');
    syncFacing();
    haptic(12);
    try {
      await camera.start(camera.facing());
    } finally {
      starting = false;
    }
  }

  function cancelStart() {
    // Ta sama flaga co w stopMeasurement(): camera.stop() emituje 'idle'
    // synchronicznie, więc bez niej anulowanie przechodziłoby najpierw ścieżką
    // „pomiar przerwany z zewnątrz” i to ona ustawiałaby widok.
    stopping = true;
    camera.stop();
    stopping = false;
    endSession(Date.now());
    setView(summary ? 'summary' : 'empty');
    announce(t('measure.announce.startCancelled'));
  }

  function stopMeasurement() {
    if (camera.state() !== 'running' && camera.state() !== 'starting') return;
    stopping = true;
    const endedAt = Date.now();
    camera.stop();
    stopping = false;

    const finished = endSession(endedAt);
    paused = false;
    haptic(16);

    if (!finished || finished.samples === 0) {
      // Sesja bez ani jednej próbki nie jest pomiarem — nie ma czego streszczać
      // ani czego odkładać do historii.
      summary = null;
      setView('empty');
      announce(t('measure.announce.stoppedNoSamples'));
      return;
    }

    finished.noted = finished.measuredMs >= SHORT_SESSION_MS;
    if (finished.noted) history.noteSession(toNote(finished));
    summary = finished;
    renderSummary(finished);
    setView('summary');
    announce(t('measure.announce.stopped'));
  }

  function setPaused(next) {
    const flag = !!next;
    if (flag === paused || camera.state() !== 'running') return;
    paused = flag;
    if (paused) {
      pausedAt = Date.now();
    } else if (sessionAcc && pausedAt) {
      sessionAcc.pausedMs += Math.max(0, Date.now() - pausedAt);
      pausedAt = 0;
    }
    setPhase(paused ? 'paused' : 'running');
    haptic(10);
    announce(t(paused ? 'measure.announce.paused' : 'measure.announce.resumed'));
    // Po wznowieniu wskazania mają wrócić natychmiast, bez czekania na próbkę.
    if (!paused && lastReading) paintThrottled(lastReading);
  }

  async function flipCamera() {
    if (switching) return;
    switching = true;
    flipBtn.disabled = true;
    try {
      // Inny obiektyw to inna optyka, więc camera.js zaczyna nową sesję.
      // Nasz akumulator musi zrobić to samo — jedna średnia z obu opisywałaby
      // scenę, której nikt nie widział.
      const previous = endSession(Date.now());
      if (previous && previous.samples > 0 && previous.measuredMs >= SHORT_SESSION_MS) {
        history.noteSession(toNote(previous));
      }
      paused = false;
      lastPushAt = 0;
      setPhase('starting');
      await camera.switchCamera();
      syncFacing();
      announce(t(camera.facing() === 'user'
        ? 'measure.announce.switchedFront'
        : 'measure.announce.switchedBack'));
    } finally {
      switching = false;
      flipBtn.disabled = false;
      syncFromCamera();
    }
  }

  /* ──────────────────────────  Wielkość wiodąca  ─────────────────────────── */

  /* Zapisana wielkość wiodąca bywa nieznana katalogowi: ustawienia przeżyły
   * podmianę wersji albo ktoś poprawił je ręcznie w pamięci przeglądarki.
   * Wtedy wracamy na pierwszą z katalogu, zamiast zostawić pusty wskaźnik. */
  function resolveLead(wanted) {
    const metric = byId(wanted);
    return metric ? metric.id : CATALOGUE[0].id;
  }

  function setLead(id, options) {
    const opts = options || {};
    const metric = byId(id);
    if (!metric || id === leadId) return;
    leadId = id;

    hero.setMetric(id);
    tiles.forEach((tile) => {
      tile.view.setSelected(tile.metric.id === id);
      tile.view.el.hidden = tile.metric.id === id;   // wiodąca stoi na wskaźniku, nie w siatce
    });
    if (lastReading && !paused) hero.update(lastReading);

    // Krótkie mrugnięcie zamiast przesuwania kafelków: ruch tylko na opacity
    // i transform, a czas trwania bierze --dur-3, który przy „mniej ruchu”
    // schodzi do 1 ms.
    heroWrap.dataset.swap = 'true';
    clearTimeout(swapTimer);
    swapTimer = setTimeout(() => { delete heroWrap.dataset.swap; }, 360);

    if (opts.silent !== true) {
      saveSettings({ leadMetric: id });
      haptic(8);
      announce(t('measure.announce.lead', { metric: t('metric.' + metric.id + '.name') }));
      // Kafelek właśnie zniknął z siatki — fokus spadłby na <body>. Przenosimy
      // go na wskaźnik, który niesie pełny odczyt dla czytnika ekranu.
      heroWrap.focus({ preventScroll: true });
      heroWrap.scrollIntoView({
        block: 'nearest',
        behavior: reducedMotion() ? 'auto' : 'smooth'
      });
    }
  }

  function syncTiles() {
    tiles.forEach((tile) => {
      tile.view.setSelected(tile.metric.id === leadId);
      tile.view.el.hidden = tile.metric.id === leadId;
    });
  }

  /* ────────────────────────────  Odczyty  ────────────────────────────────── */

  /* Rysowanie zbite do jednej klatki: przy 10 Hz i siedmiu wskaźnikach nie ma
   * po co dotykać DOM częściej, niż kompozytor jest w stanie pokazać. */
  const paintThrottled = rafThrottle((reading) => {
    hero.update(reading);
    for (let i = 0; i < tiles.length; i += 1) tiles[i].view.update(reading);
  });

  function onReadingUI(payload) {
    const reading = payload && payload.reading;
    if (!reading) return;
    lastReading = reading;
    lastReadingAt = Date.now();
    if (!staleNote.hidden) staleNote.hidden = true;
    if (paused) return;                       // HOLD: nic nie rysujemy i nic nie zapisujemy
    paintThrottled(reading);

    // Historia rośnie tylko wtedy, gdy ekran jest zamontowany — inaczej
    // zbierałaby w tle punkty, o które nikt nie prosił.
    const at = num(reading.t) ? reading.t : Date.now();
    if (mounted && at - lastPushAt >= PUSH_MS) {
      lastPushAt = at;
      history.push(reading);
    }
  }

  function onCameraState(payload) {
    const state = payload && payload.state;
    syncFacing();
    if (stopping || switching) return;        // własne przejścia obsługujemy sami
    if (state === 'running') {
      ensureSession();
      setView('live');
      setPhase(paused ? 'paused' : 'running');
      playPreview();
      return;
    }
    if (state === 'starting') { setView('live'); setPhase('starting'); return; }
    if (state === 'error') return;            // widok błędu stawia camera:error
    // 'idle' bez naszego udziału: kamera zabrana przez inną aplikację.
    finishUnexpectedly(false);
  }

  function onCameraError(payload) {
    // camera.js niesie w zdarzeniu kod błędu; zdania szukamy w słowniku sami.
    errorCode = (payload && payload.code) || '';
    finishUnexpectedly(true);
    syncFailText();
    setView('error');
    announce(t('measure.announce.cameraError', { message: cameraErrorText() }));
  }

  /* Pomiar przerwany nie z naszej ręki (kamera zabrana przez inną aplikację,
   * odmowa w trakcie startu). Dane są prawdziwe, więc dostatecznie długa sesja
   * idzie do historii; przy błędzie zostaje o tym jedno zdanie zamiast
   * podsumowania, bo pierwszą rzeczą do przeczytania jest komunikat. */
  function finishUnexpectedly(isError) {
    const finished = endSession(Date.now());
    paused = false;
    const noted = !!finished && finished.samples > 0 && finished.measuredMs >= SHORT_SESSION_MS;
    if (noted) history.noteSession(toNote(finished));

    if (isError) {
      failNote.hidden = !noted;
      failNoteMs = noted ? finished.measuredMs : 0;
      syncFailText();
      return;
    }
    if (finished && finished.samples > 0) {
      finished.noted = noted;
      summary = finished;
      renderSummary(finished);
      setView('summary');
      announce(t('measure.announce.interrupted'));
    } else {
      setView(summary ? 'summary' : 'empty');
    }
  }

  function playPreview() {
    try {
      const played = video && typeof video.play === 'function' ? video.play() : null;
      if (played && typeof played.catch === 'function') played.catch(() => {});
    } catch (err) { /* podgląd bez play() i tak bywa rysowany */ }
  }

  /* ──────────────────────────  Czuwanie nad klatkami  ────────────────────── */

  function startStaleWatch() {
    stopStaleWatch();
    staleTimer = setInterval(() => {
      const live = camera.state() === 'running' && !paused;
      const stale = live && lastReadingAt > 0 && (Date.now() - lastReadingAt) > STALE_MS;
      if (staleNote.hidden === stale) staleNote.hidden = !stale;
    }, 500);
  }

  function stopStaleWatch() {
    if (staleTimer) clearInterval(staleTimer);
    staleTimer = 0;
  }

  /* ──────────────────────────────  Podsumowanie  ─────────────────────────── */

  function renderSummary(s) {
    clearNode(summaryView);

    // Podsumowanie pokazuje komplet siedmiu wielkości. Ta niezmierzona zostaje
    // na liście z pauzą: jej brak jest informacją, a ciche usunięcie kafelka
    // wyglądałoby jak wynik dobry.
    const shown = CATALOGUE;
    const measured = shown.filter((m) => num(s.avg[m.id]));

    const metaParts = [clock(s.startedAt) + '–' + clock(s.endedAt)];
    metaParts.push(plural(s.samples, 'unit.sample.plural'));
    if (s.pausedMs > 1000) {
      metaParts.push(t('measure.summary.paused', { duration: duration(s.pausedMs) }));
    }

    const stats = h('div.m5-measure__stats', null, shown.map((metric) => {
      const value = s.avg[metric.id];
      const zone = zoneOf(metric, value);
      return h('div.m5-stat', { dataset: { zone } },
        h('span.m5-stat__label', { text: t('metric.' + metric.id + '.name') }),
        h('span.m5-stat__readout', null,
          h('span.m5-stat__value.m5-num', { text: metricValue(metric.id, value) }),
          h('span.m5-stat__unit', { text: metric.unit || '' })),
        h('span.m5-zone', { dataset: { zone }, text: zoneLabel(zone) }));
    }));

    summaryView.appendChild(h('div.m5-card', null,
      h('header.m5-card__head', null,
        h('h2.m5-card__title', { text: t('measure.summary.title') }),
        h('span.m5-badge', { text: duration(s.measuredMs) })),
      h('div.m5-card__body', null,
        h('p.m5-measure__meta', { text: metaParts.join(' · ') }),
        stats,
        measured.length === 0
          ? h('p.m5-measure__note', { text: t('measure.summary.nothingMeasured') })
          : null,
        h('p.m5-measure__note', { text: t('measure.summary.note') }))));

    /* ---- najgorsza wielkość i jedno zdanie zalecenia ---- */
    let worst = null;
    let worstScore = -1;
    measured.forEach((metric) => {
      const sev = severity(metric, s.avg[metric.id]);
      if (!sev || sev.score <= worstScore) return;
      worstScore = sev.score;
      worst = { metric, zone: sev.zone, value: s.avg[metric.id] };
    });

    if (worst) {
      // „Komfort wzrokowy” jest wynikiem złożonym — rada dla niego byłaby
      // ogólnikiem, więc zdanie bierzemy z najgorszej wielkości składowej.
      let source = worst;
      if (worst.metric.id === 'comfort') {
        let alt = null;
        let altScore = -1;
        measured.forEach((metric) => {
          if (metric.id === 'comfort') return;
          const sev = severity(metric, s.avg[metric.id]);
          if (!sev || sev.score <= altScore) return;
          altScore = sev.score;
          alt = { metric, zone: sev.zone, value: s.avg[metric.id] };
        });
        if (alt && alt.zone !== 'good') source = alt;
      }

      summaryView.appendChild(h('div.m5-card', null,
        h('header.m5-card__head', null,
          h('h2.m5-card__title', {
            text: t(worst.zone === 'good'
              ? 'measure.summary.nearThreshold'
              : 'measure.summary.worstPoint')
          })),
        h('div.m5-card__body', null,
          h('p.m5-measure__worst', { dataset: { zone: worst.zone } },
            h('span.m5-measure__worstName', { text: t('metric.' + worst.metric.id + '.name') }),
            h('span.m5-measure__worstValue.m5-num', {
              text: metricValueUnit(worst.metric.id, worst.value)
            }),
            h('span.m5-zone', {
              dataset: { zone: worst.zone },
              text: t('measure.summary.averageZone', { zone: zoneLabel(worst.zone) })
            })),
          h('p.m5-measure__advice', null,
            icon('sparkle', { size: 22 }),
            h('span', { text: adviceFor(source.metric, source.value, source.zone, s.endedAt) })))));
    }

    if (!s.noted) {
      summaryView.appendChild(h('p.m5-measure__note', {
        text: t('measure.summary.tooShort', { duration: duration(s.measuredMs) })
      }));
    }

    /* ---- akcje pod podsumowaniem ---- */
    const actionsRow = h('div.m5-measure__bar', null,
      h('button.m5-btn.m5-btn--primary', {
        type: 'button', on: { click: () => startMeasurement() }
      }, icon('play', { size: 20 }), t('measure.summary.again')));

    if (!s.noted) {
      // Sesja krótsza niż pół minuty nie trafia do historii sama — ale bywa
      // dokładnie tym, co użytkownik chciał zapisać. Decyzja należy do niego.
      const saveBtn = h('button.m5-btn.m5-btn--ghost', { type: 'button' },
        icon('download', { size: 20 }), t('measure.summary.save'));
      saveBtn.addEventListener('click', () => {
        history.noteSession(toNote(s));
        // Średnia zapisana jako jeden punkt zostawia po krótkiej sesji ślad
        // także na wykresie dłuższego zakresu.
        history.push(Object.assign({ t: s.endedAt }, s.avg));
        s.noted = true;
        saveBtn.disabled = true;
        saveBtn.textContent = t('measure.summary.saved');
        toast(t('measure.summary.savedToast'), { tone: 'success' });
      });
      actionsRow.appendChild(saveBtn);
    }

    actionsRow.appendChild(h('button.m5-btn.m5-btn--ghost', {
      type: 'button',
      on: { click: () => { summary = null; setView('empty'); } }
    }, t('measure.summary.close')));

    summaryView.appendChild(actionsRow);
  }

  /* ────────────────────────────  Arkusz metody  ──────────────────────────── */

  function openMethodSheet() {
    sheet({
      title: t('measure.method.title'),
      body: [
        h('p', { text: t('measure.method.p1', { percent: CROP_PERCENT }) }),
        h('p', { text: t('measure.method.p2') }),
        h('p', { text: t('measure.method.p3') }),
        h('p', { text: t('measure.method.p4') }),
        h('p', { text: t('measure.method.p5') })
      ],
      // labelPL jako FUNKCJA: overlays.js woła ją ponownie po zmianie języka,
      // więc napis nadąża nawet przy otwartym arkuszu.
      actions: [{ labelPL: () => t('measure.method.ok'), tone: 'primary' }]
    });
  }

  /* ────────────────────────────  Cykl życia ekranu  ──────────────────────── */

  function onSettingsChanged(payload) {
    const wanted = payload && payload.settings ? payload.settings.leadMetric : null;
    if (wanted && wanted !== leadId) setLead(resolveLead(wanted), { silent: true });
  }

  function mount() {
    if (mounted) return;
    mounted = true;
    lastPushAt = 0;

    uiSubs.push(bus.on('camera:reading', onReadingUI));
    uiSubs.push(bus.on('camera:state', onCameraState));
    uiSubs.push(bus.on('camera:error', onCameraError));
    uiSubs.push(bus.on('settings:changed', onSettingsChanged));

    setLead(resolveLead(getSettings().leadMetric), { silent: true });
    syncTiles();
    syncFacing();
    if (errorCode) syncFailText();
    syncFromCamera();
    startStaleWatch();

    if (camera.state() === 'running') {
      playPreview();
      const known = camera.last();
      if (known) {
        lastReading = known;
        lastReadingAt = Date.now();
        paintThrottled(known);
      }
    }
  }

  /* Sprzątamy WYŁĄCZNIE interfejs. Kamera pracuje dalej, sesja się nalicza,
   * a wskaźniki gasną same, bo przestają dostawać próbki — powrót na ekran
   * zastanie pomiar w toku i od razu go narysuje. */
  function unmount() {
    if (!mounted) return;
    mounted = false;
    uiSubs.splice(0).forEach((off) => off());
    paintThrottled.cancel();
    stopStaleWatch();
    clearTimeout(swapTimer);
    swapTimer = 0;
    delete heroWrap.dataset.swap;
    staleNote.hidden = true;
  }

  function actions() {
    return [{ icon: 'info', labelKey: 'measure.method.title', onClick: openMethodSheet }];
  }

  /* Napisy wpisujemy dopiero teraz i odtwarzamy przy każdej zmianie języka
   * (zdarzenie z kontraktu §4). Nasłuchu nie zdejmujemy nigdzie: instancja
   * ekranu żyje tyle, co aplikacja, więc nie ma czego odsubskrybować. */
  applyText();
  bus.on('i18n:changed', applyText);

  // Ekran podaje KLUCZ tytułu, nie gotowy napis: app.js rozwija go przez t()
  // przy każdym wejściu i po zmianie języka.
  return { el, titleKey: 'measure.title', actions, mount, unmount };
}
