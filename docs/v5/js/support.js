/**
 * js/support.js — warstwa wsparcia: jeden adres, jedna walidacja.
 *
 * Cała „monetyzacja” tej aplikacji to dobrowolna darowizna na zewnętrznym
 * profilu. Nic tu nie sprawdza uprawnień, bo uprawnień nie ma: wszystkie
 * siedem wielkości działa dla każdego, od razu i bez konta. Moduł nie odzywa
 * się do sieci — najwyżej podaje adres, który użytkownik może sam kliknąć.
 */

/* ─────────────────────────────────────────────────────────────────────
   TU WPISZ ADRES SWOJEGO PROFILU DAROWIZN.
   Przykłady: 'https://buymeacoffee.com/twojanazwa'
              'https://ko-fi.com/twojanazwa'
              'https://paypal.me/twojanazwa'
   Dopóki tu pusto, aplikacja nie pokazuje martwego przycisku — patrz niżej.
   ───────────────────────────────────────────────────────────────────── */
const SUPPORT_URL = '';

/**
 * supportUrl() -> string   ('' znaczy „profil nie jest jeszcze podłączony”)
 *
 * Przyjmujemy wyłącznie https. To jedna linijka warunku, a odcina zarówno
 * literówkę w schemacie, jak i wklejone przez pomyłkę `javascript:` — adres
 * trafia przecież prosto do atrybutu href.
 */
export function supportUrl() {
  const raw = String(SUPPORT_URL || '').trim();
  if (!raw) return '';
  try {
    return new URL(raw).protocol === 'https:' ? raw : '';
  } catch (err) {
    return '';                 // nie da się rozebrać na części — traktujemy jak brak
  }
}

/** Czy jest dokąd prowadzić. Ekran wsparcia decyduje tym, co narysować. */
export function hasSupportUrl() {
  return supportUrl() !== '';
}
