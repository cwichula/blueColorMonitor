/* Monitor Światła v5 — js/screens/support.js
 *
 * ROLA PLIKU: ekran „Wsparcie”. Cztery karty w stałej kolejności: co aplikacja
 * daje za darmo, dlaczego pada prośba, czego darowizna NIE odblokowuje, i sam
 * przycisk razem ze zdaniem o prywatności.
 *
 * Ekran niczego nie zapisuje i nasłuchuje jednego jedynego zdarzenia: zmiany
 * języka, po której stawia swoje cztery karty od nowa (napisy siedzą w gotowych
 * węzłach, więc inaczej zostałby na nich poprzedni język).
 * Prośba pojawia się wyłącznie wtedy, gdy ktoś sam tu wejdzie — żadnych okien
 * po N uruchomieniach, żadnych przerywników w trakcie pomiaru, żadnego
 * odliczania.
 *
 * Gdy SUPPORT_URL w js/support.js jest pusty (albo nie jest adresem https),
 * ekran wygląda normalnie, tylko w miejscu przycisku stoi spokojne zdanie —
 * nie renderujemy odnośnika prowadzącego donikąd.
 */

import { h, icon, clear, mount } from '../ui/dom.js';
import { bus } from '../bus.js';
import { t } from '../i18n/index.js';
import { supportUrl } from '../support.js';

/* Odstęp między kartą a przyciskiem i wyrównanie stopki karty wsparcia. Kilka
   linii, których nie potrzebuje żaden inny ekran — jadą razem z plikiem,
   dokładnie jak w measure.js. Selektory w :where(), żeby niczego nie przebiły. */
const STYLE_ID = 'm5-support-style';
const STYLE = `
:where(.m5-support__cta){display:flex;flex-wrap:wrap;align-items:center;
  gap:var(--sp-3);min-width:0}
/* Odnośnik-przycisk: <a> nie dziedziczy po <button> ani wysokości, ani
   wyrównania, a cel dotyku ma mieć te same 44 px co reszta akcji. */
:where(.m5-support__link){display:inline-flex;align-items:center;
  justify-content:center;gap:var(--sp-2);min-height:var(--tap);
  text-decoration:none}
:where(.m5-support__nolink){margin:0;color:var(--text-2);font-size:var(--fs-sm);
  line-height:var(--lh-normal)}
`;

function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const tag = document.createElement('style');
  tag.id = STYLE_ID;
  tag.textContent = STYLE;
  document.head.appendChild(tag);
}

let seq = 0;
const uid = () => 'm5-wsp-' + (seq += 1);

/* Karta o jednym nagłówku i jednym-dwóch akapitach — cały ten ekran składa się
   z czterech takich, więc kształt opisujemy raz. Pierwszy argument to GOTOWY
   napis, nie klucz: t() woła ten, kto buduje kartę — tak samo jak w tools.js. */
function card(title, ...body) {
  const titleId = uid();
  return h('section.m5-card', { aria: { labelledby: titleId } },
    h('header.m5-card__head', null, h('h2.m5-card__title', { id: titleId, text: title })),
    h('div.m5-card__body', null, body.filter(Boolean)));
}

/* Cała treść ekranu powstaje TUTAJ, przy każdym rysowaniu. Gdyby karty stały
   raz zbudowane w module albo w domknięciu create(), po przełączeniu języka
   zostałby na nich napis w poprzednim — a ten ekran nie ma żadnego innego
   powodu, żeby się odrysować. */
function build() {
  /* Adres czytamy przy budowie ekranu: stała z js/support.js nie zmienia się
     w trakcie działania aplikacji. */
  const url = supportUrl();

  /* ─────────────────  1. Co ta aplikacja daje za darmo  ────────────────── */

  const freeCard = card(t('support.free.title'),
    h('p.m5-screen__lead', { text: t('support.free.lead') }),
    h('p.m5-screen__note', null,
      /* Świadomie NIE kłódka: to ekran, z którego właśnie zniknął podział na
         wielkości darmowe i płatne, a zamknięta kłódka wracałaby tu jako
         pamiątka po tamtym podziale. Kłódka przy zdaniu o prywatności zostaje
         na ekranie pomiaru, gdzie mówi wyłącznie o obrazie z kamery. */
      icon('info', { size: 16 }),
      h('span', { text: t('support.free.note') })));

  /* ────────────────────────  2. Dlaczego prośba  ───────────────────────── */

  const whyCard = card(t('support.why.title'),
    h('p.m5-screen__lead', { text: t('support.why.lead') }));

  /* ───────────────────────  3. Co daje darowizna  ──────────────────────── */

  /* Najważniejsza karta tego ekranu. Zdanie „darowizna niczego nie odblokowuje”
     musi paść wprost, inaczej ekran czyta się jak cennik bez cen. */
  const whatCard = card(t('support.what.title'),
    h('p.m5-screen__lead', { text: t('support.what.lead') }),
    h('p.m5-screen__note', null,
      icon('heart', { size: 16 }),
      h('span', { text: t('support.what.note') })));

  /* ──────────────────  4. Przycisk i zdanie o prywatności  ─────────────── */

  const ctaRow = h('div.m5-support__cta');

  if (url) {
    /* Wariant obrysowy (drugorzędny), nie akcentowy: prośba ma stać obok treści
       jak zwykła akcja, a nie być największym elementem ekranu. */
    ctaRow.appendChild(h('a.m5-btn.m5-btn--ghost.m5-support__link', {
      href: url,
      target: '_blank',
      rel: 'noopener noreferrer'
    }, icon('coffee', { size: 20 }), h('span', { text: t('support.cta.button') })));
  } else {
    // Pusta stała to nie awaria, tylko stan „jeszcze nie podłączone”. Martwy
    // przycisk byłby gorszy od jego braku: obiecywałby coś, czego nie ma.
    ctaRow.appendChild(h('p.m5-support__nolink', { text: t('support.cta.nolink') }));
  }

  const ctaCard = card(t('support.cta.title'),
    ctaRow,
    // Zdanie o prywatności stoi PRZY przycisku, nie w stopce ekranu: aplikacja
    // na każdym innym ekranie obiecuje, że nic nie wychodzi do sieci, więc
    // jedyny wyjątek trzeba nazwać dokładnie tam, gdzie się go klika.
    h('p.m5-screen__note', null,
      icon('alert', { size: 16 }),
      /* Przy pustej stałej to samo zdanie w czasie przyszłym. Bez niego jedyna
         informacja o wyjściu na zewnątrz znikałaby dokładnie w tym stanie,
         w którym wersja jest wydawana. */
      h('span', { text: t(url ? 'support.cta.privacy' : 'support.cta.privacyFuture') })),
    h('p.m5-screen__note', { text: t('support.cta.note') }));

  return [freeCard, whyCard, whatCard, ctaCard];
}

export function create() {
  ensureStyles();

  const el = h('div.m5-support');
  const fill = () => mount(clear(el), ...build());

  fill();

  /* Jedyny nasłuch tego ekranu — i celowo poza mount(): język wolno przełączyć
     także wtedy, gdy ekran jest odmontowany, a wracać mamy na nowe napisy. */
  bus.on('i18n:changed', fill);

  return {
    el,
    // Getter, nie stała: powłoka pyta o tytuł przy każdym wejściu na ekran.
    get titlePL() { return t('support.title'); },
    actions() { return []; },
    mount() { /* nie ma czego dosubskrybować — język jest wyżej */ },
    unmount() { /* ...ani czego sprzątać */ }
  };
}
