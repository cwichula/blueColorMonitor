/**
 * js/support.js — warstwa wsparcia: jeden adres, jedna walidacja.
 *
 * Cała „monetyzacja” tej aplikacji to dobrowolna darowizna na profilu Buy Me
 * a Coffee. Nic tu nie sprawdza uprawnień, bo uprawnień nie ma: wszystkie
 * siedem wielkości działa dla każdego, od razu i bez konta. Moduł nie odzywa
 * się do sieci — najwyżej podaje adres, który użytkownik może sam kliknąć.
 */

/* ─────────────────────────────────────────────────────────────────────
   TU WPISZ ADRES SWOJEGO PROFILU BUY ME A COFFEE.
   Przykład: 'https://buymeacoffee.com/twojanazwa'
   Dopóki tu pusto, aplikacja nie pokazuje martwego przycisku — patrz niżej.
   ───────────────────────────────────────────────────────────────────── */
const SUPPORT_URL = '';

/* Jedyny dopuszczalny cel darowizny. Buy Me a Coffee prowadzi profile pod
   oboma tymi hostami, więc oba są tu wymienione wprost. */
const SUPPORT_HOSTS = ['buymeacoffee.com', 'www.buymeacoffee.com'];

/**
 * supportUrl() -> string   ('' znaczy „profil nie jest jeszcze podłączony”)
 *
 * Przyjmujemy wyłącznie https i wyłącznie adres w domenie buymeacoffee.com —
 * schemat odcina literówkę i wklejone przez pomyłkę `javascript:` (adres trafia
 * przecież prosto do atrybutu href), a host pilnuje, że jedyną monetyzacją tej
 * aplikacji zostaje Buy Me a Coffee.
 */
export function supportUrl() {
  const raw = String(SUPPORT_URL || '').trim();
  if (!raw) return '';
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:') return '';
    return SUPPORT_HOSTS.indexOf(url.hostname.toLowerCase()) >= 0 ? raw : '';
  } catch (err) {
    return '';                 // nie da się rozebrać na części — traktujemy jak brak
  }
}

/** Czy jest dokąd prowadzić. Ekran wsparcia decyduje tym, co narysować. */
export function hasSupportUrl() {
  return supportUrl() !== '';
}
