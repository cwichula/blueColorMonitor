/* Monitor Światła v5 — js/screens/support.js
 *
 * ROLA PLIKU: ekran „Wsparcie”. Cztery karty w stałej kolejności: co aplikacja
 * daje za darmo, dlaczego pada prośba, czego darowizna NIE odblokowuje, i sam
 * przycisk razem ze zdaniem o prywatności.
 *
 * Ekran jest statyczny: buduje się raz, nie subskrybuje żadnego zdarzenia
 * i niczego nie zapisuje. Prośba pojawia się wyłącznie wtedy, gdy ktoś sam tu
 * wejdzie — żadnych okien po N uruchomieniach, żadnych przerywników w trakcie
 * pomiaru, żadnego odliczania.
 *
 * Gdy SUPPORT_URL w js/support.js jest pusty (albo nie jest adresem https),
 * ekran wygląda normalnie, tylko w miejscu przycisku stoi spokojne zdanie —
 * nie renderujemy odnośnika prowadzącego donikąd.
 */

import { h, icon } from '../ui/dom.js';
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
   z czterech takich, więc kształt opisujemy raz. */
function card(titlePL, ...body) {
  const titleId = uid();
  return h('section.m5-card', { aria: { labelledby: titleId } },
    h('header.m5-card__head', null, h('h2.m5-card__title', { id: titleId, text: titlePL })),
    h('div.m5-card__body', null, body.filter(Boolean)));
}

export function create() {
  ensureStyles();

  /* Adres czytamy raz, przy budowie ekranu: stała z js/support.js nie zmienia
     się w trakcie działania aplikacji, a ekran żyje do końca sesji. */
  const url = supportUrl();

  /* ─────────────────  1. Co ta aplikacja daje za darmo  ────────────────── */

  const freeCard = card('Wszystko jest dostępne',
    h('p.m5-screen__lead', {
      text: 'Wszystkie siedem wielkości, pełna historia, progi, kalibracja i eksport '
        + 'działają od pierwszego uruchomienia — bez konta, bez limitów i bez opłat.'
    }),
    h('p.m5-screen__note', null,
      /* Świadomie NIE kłódka: to ekran, z którego właśnie zniknął podział na
         wielkości darmowe i płatne, a zamknięta kłódka wracałaby tu jako
         pamiątka po tamtym podziale. Kłódka przy zdaniu o prywatności zostaje
         na ekranie pomiaru, gdzie mówi wyłącznie o obrazie z kamery. */
      icon('info', { size: 16 }),
      h('span', {
        text: 'Pomiar liczy się w całości na tym urządzeniu i działa bez sieci. '
          + 'Nie ma tu wersji lepszej, którą trzymalibyśmy za ścianą.'
      })));

  /* ────────────────────────  2. Dlaczego prośba  ───────────────────────── */

  const whyCard = card('Dlaczego o to proszę',
    h('p.m5-screen__lead', {
      text: 'Monitor Światła powstaje po godzinach i nie ma za sobą ani reklam, ani '
        + 'sponsora, ani firmy. Wsparcie pokrywa czas na poprawki, nowe wielkości '
        + 'i utrzymanie tego, co już działa.'
    }));

  /* ───────────────────────  3. Co daje darowizna  ──────────────────────── */

  /* Najważniejsza karta tego ekranu. Zdanie „darowizna niczego nie odblokowuje”
     musi paść wprost, inaczej ekran czyta się jak cennik bez cen. */
  const whatCard = card('Co daje darowizna',
    h('p.m5-screen__lead', {
      text: 'Nic. Darowizna niczego nie odblokowuje — żadnej dodatkowej funkcji, '
        + 'żadnego znaczka przy nazwie, żadnego pierwszeństwa. Wszystko, co '
        + 'aplikacja potrafi, masz już teraz.'
    }),
    h('p.m5-screen__note', null,
      icon('heart', { size: 16 }),
      h('span', {
        text: 'Zostaje tylko tyle, że wiem, że to komuś się przydało. To naprawdę '
          + 'wystarczający powód.'
      })));

  /* ──────────────────  4. Przycisk i zdanie o prywatności  ─────────────── */

  const ctaRow = h('div.m5-support__cta');

  if (url) {
    /* Wariant obrysowy (drugorzędny), nie akcentowy: prośba ma stać obok treści
       jak zwykła akcja, a nie być największym elementem ekranu. */
    ctaRow.appendChild(h('a.m5-btn.m5-btn--ghost.m5-support__link', {
      href: url,
      target: '_blank',
      rel: 'noopener noreferrer'
    }, icon('coffee', { size: 20 }), h('span', { text: 'Postaw mi kawę' })));
  } else {
    // Pusta stała to nie awaria, tylko stan „jeszcze nie podłączone”. Martwy
    // przycisk byłby gorszy od jego braku: obiecywałby coś, czego nie ma.
    ctaRow.appendChild(h('p.m5-support__nolink', {
      text: 'Profil darowizn nie jest jeszcze podłączony. Gdy się pojawi, stanie '
        + 'w tym miejscu przycisk.'
    }));
  }

  const ctaCard = card('Jeśli chcesz pomóc',
    ctaRow,
    // Zdanie o prywatności stoi PRZY przycisku, nie w stopce ekranu: aplikacja
    // na każdym innym ekranie obiecuje, że nic nie wychodzi do sieci, więc
    // jedyny wyjątek trzeba nazwać dokładnie tam, gdzie się go klika.
    url
      ? h('p.m5-screen__note', null,
          icon('alert', { size: 16 }),
          h('span', {
            text: 'Ten odnośnik otwiera stronę zewnętrzną (na przykład Buy Me a Coffee) '
              + 'w nowej karcie. To jedyny moment, w którym cokolwiek opuszcza to '
              + 'urządzenie — sam pomiar zostaje tutaj zawsze.'
          }))
      /* Przy pustej stałej to samo zdanie w czasie przyszłym. Bez niego jedyna
         informacja o wyjściu na zewnątrz znikałaby dokładnie w tym stanie,
         w którym wersja jest wydawana. */
      : h('p.m5-screen__note', null,
          icon('alert', { size: 16 }),
          h('span', {
            text: 'Kiedy adres się pojawi, przycisk otworzy stronę zewnętrzną '
              + '(na przykład Buy Me a Coffee) w nowej karcie. Będzie to jedyny '
              + 'moment, w którym cokolwiek opuszcza to urządzenie — sam pomiar '
              + 'zostaje tutaj zawsze.'
          })),
    h('p.m5-screen__note', {
      text: 'Nie ma tu ani odliczania, ani przypomnień, ani okna, które samo się '
        + 'otworzy. Ta prośba czeka wyłącznie na tej zakładce.'
    }));

  const el = h('div.m5-support', null, freeCard, whyCard, whatCard, ctaCard);

  return {
    el,
    titlePL: 'Wsparcie',
    actions() { return []; },
    mount() { /* ekran statyczny — nie ma czego subskrybować */ },
    unmount() { /* ...ani czego sprzątać */ }
  };
}
