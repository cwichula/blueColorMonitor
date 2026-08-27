/**
 * js/router.js — router po fragmencie adresu (hash).
 *
 * Cztery trasy, żadnego przeładowania strony i żadnej zależności od serwera:
 * GitHub Pages nie umie przepisywać ścieżek, więc hash jest jedynym routingiem,
 * który zadziała tak samo pod /v5/, pod /blueColorMonitor/docs/v5/ i z pliku
 * skopiowanego na dysk. Router nie zna DOM ani ekranów — ogłasza zmianę na
 * szynie, a montażem zajmuje się app.js.
 */

import { bus } from './bus.js';

export const ROUTES = [
  { id: 'measure', path: '/measure', labelPL: 'Pomiar',    icon: 'gauge' },
  { id: 'history', path: '/history', labelPL: 'Historia',  icon: 'chart' },
  { id: 'tools',   path: '/tools',   labelPL: 'Narzędzia', icon: 'sliders' },
  { id: 'support', path: '/support', labelPL: 'Wsparcie',  icon: 'coffee' }
];

const DEFAULT_ROUTE = ROUTES[0];

let active = DEFAULT_ROUTE;
let listening = false;

/* Rozpoznajemy '#/tools', '#tools', '#/tools?x=1' i '#/Tools/' tak samo:
 * adres bywa przepisywany ręcznie i wklejany, a literówka w wielkości liter
 * nie jest powodem, żeby wyrzucić kogoś na ekran startowy.
 * Nieznana trasa → null; decyzję, co z tym zrobić, podejmuje wywołujący. */
function match(hash) {
  const raw = String(hash || '').replace(/^#/, '').split(/[?#]/)[0];
  const id = raw.replace(/^\/+/, '').replace(/\/+$/, '').toLowerCase();
  if (!id) return null;
  return ROUTES.find((r) => r.id === id) || null;
}

function readHash() {
  try { return window.location.hash; } catch (err) { return ''; }
}

/* Podmiana adresu bez wpisu w historii. Używamy jej tylko przy prostowaniu
 * trasy nieznanej — inaczej przycisk „wstecz” wracałby na adres, który przed
 * chwilą uznaliśmy za nieistniejący, i zapętlał się. */
function replaceHash(path) {
  const target = '#' + path;
  if (readHash() === target) return;
  try {
    if (window.history && typeof window.history.replaceState === 'function') {
      window.history.replaceState(null, '', target);
      return;
    }
  } catch (err) { /* niżej: zwykłe przypisanie, kosztem wpisu w historii */ }
  window.location.hash = target;
}

function settle(route, { silent = false } = {}) {
  const previous = active;
  active = route;
  if (silent || previous === route) return;
  bus.emit('route:changed', { route, previous });
}

/* Jedno źródło prawdy przy każdej zmianie hasha: także tej z przycisku
 * „wstecz”, z zakładki systemowej i ze skrótu w manifeście. */
function onHashChange() {
  const found = match(readHash());
  if (!found) {
    // Adres nie do rozpoznania — prostujemy go po cichu; zdarzenie wyśle
    // wywołanie zwrotne wywołane przez samą podmianę albo linia poniżej.
    replaceHash(DEFAULT_ROUTE.path);
    settle(DEFAULT_ROUTE);
    return;
  }
  settle(found);
}

export function start() {
  if (!listening) {
    window.addEventListener('hashchange', onHashChange);
    listening = true;
  }

  const found = match(readHash());
  const route = found || DEFAULT_ROUTE;
  // Pusty albo błędny adres dostaje trasę domyślną wpisaną w pasek adresu —
  // dzięki temu odświeżenie strony wraca w to samo miejsce.
  if (!found) replaceHash(DEFAULT_ROUTE.path);

  // Pierwsze zdarzenie musi polecieć zawsze, także gdy trasa jest domyślna:
  // to na nim app.js montuje pierwszy ekran.
  active = null;
  settle(route);
  return route;
}

export function go(path) {
  const found = match(path);
  const route = found || DEFAULT_ROUTE;
  if (route === active && match(readHash()) === route) return route;
  // Zwykłe przypisanie, bo przejście między zakładkami MA zostawiać ślad
  // w historii — przycisk „wstecz” to na telefonie podstawowa nawigacja.
  window.location.hash = '#' + route.path;
  return route;
}

export function current() {
  return active || DEFAULT_ROUTE;
}
