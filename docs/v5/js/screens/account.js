/**
 * js/screens/account.js — ekran „Konto” (sekcja 5 kontraktu).
 *
 * Cztery karty w stałej kolejności: konto, plan, korzyści i — dopiero po
 * zalogowaniu — usuwanie konta. Nad nimi wszystkimi, jako pierwsza rzecz na
 * ekranie, stoi plakietka „Demo” ze zdaniem o tym, że nic nie wychodzi do
 * sieci: człowiek ma to wiedzieć, zanim zobaczy pierwszy przycisk logowania
 * i pierwszą cenę.
 *
 * ŻADNEGO CIEMNEGO WZORCA. Rezygnacja z planu to jedno dotknięcie, bez pytania
 * „czy na pewno” i bez oferty zatrzymującej — dokładnie tyle samo, ile zakup.
 * Pełna cena okresowa stoi w każdym wierszu planu wprost, bez gwiazdek
 * i bez odsyłacza do drobnego druku. Okres próbny mówi w tym samym zdaniu, co
 * się stanie po siedmiu dniach.
 *
 * Zdarzenia 'account:changed' i 'billing:changed' NIE przebudowują ekranu:
 * syncAccount() i syncPlan() zmieniają tekst, atrybut `hidden` i stan
 * przycisków w węzłach zbudowanych raz, przy tworzeniu ekranu. Dzięki temu
 * fokus, pozycja przewijania i otwarty arkusz przeżywają każdą zmianę stanu.
 *
 * Karta planu jest widoczna także przed zalogowaniem — symulowany zakup żyje
 * w tej przeglądarce, nie na koncie, więc schowanie go za logowaniem znaczyłoby
 * „zaloguj się, żeby móc zrezygnować”.
 *
 * Markup trzyma się kontraktu z css/screens.css (m5-account__profile,
 * __avatar, __identity, __name, __email, __plan, __plan-name, __plan-meta,
 * __plans, __providers, __benefits, __danger) oraz kontrolek z
 * css/components.css. Jedyny wyjątek: pole tekstowe (arkusz logowania
 * e-mailem i edycji profilu). Biblioteka nie ma jeszcze komponentu pola, więc
 * jego wygląd — wyłącznie na tokenach — niesie stała FIELD_* w tym pliku.
 * Gdy `.m5-field` trafi do components.css, wystarczy usunąć te trzy obiekty.
 */

import { bus } from '../bus.js';
import { h, icon, announce as srSay } from '../ui/dom.js';
import { toast, sheet, dialog } from '../ui/overlays.js';
import { dateShort, plural, relative } from '../format.js';
import { byId } from '../metrics.js';
import * as account from '../account.js';
import * as billing from '../billing.js';

/* Zapasowy wygląd pola tekstowego — patrz nagłówek pliku. Same tokeny, więc
   motyw, gęstość i skala tekstu działają tak samo jak w reszcie aplikacji. */
const FIELD_WRAP_STYLE = { display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' };
const FIELD_LABEL_STYLE = { fontWeight: '600' };
const FIELD_INPUT_STYLE = {
  width: '100%',
  minHeight: 'var(--tap)',
  padding: 'var(--sp-2) var(--sp-4)',
  borderRadius: 'var(--r-md)',
  background: 'var(--surface-sunken)',
  color: 'var(--text-1)',
  boxShadow: 'inset 0 0 0 1px var(--line-strong)'
};
const ERROR_STYLE = { color: 'var(--zone-crit)', fontWeight: '600' };
/* Zdanie o cenie zajmuje w wierszu planu cały wiersz — to jedyna deklaracja
   układu, jakiej ten ekran nie znajduje w screens.css. */
const PLAN_NOTE_STYLE = { flex: '1 1 100%' };

let seq = 0;
const uid = (prefix) => `m5-acc-${prefix}-${++seq}`;

/* Krótkie zdanie drobnym drukiem z ikoną — wygląd daje .m5-screen__note. */
function note(iconName, text) {
  return h('p.m5-screen__note', null, icon(iconName, { size: 16 }), h('span', { text }));
}

/* Pole tekstowe: etykieta związana z kontrolką przez `for`, miejsce na
   komunikat błędu wskazane przez aria-describedby. */
function field({ labelPL, type = 'text', value = '', autocomplete, inputmode, placeholder }) {
  const id = uid('field');
  const input = h('input.m5-field__input', {
    id,
    type,
    value,
    autocomplete,
    inputmode,
    placeholder,
    spellcheck: 'false',
    autocapitalize: 'none',
    style: FIELD_INPUT_STYLE
  });
  const wrap = h('div.m5-field', { style: FIELD_WRAP_STYLE },
    h('label.m5-field__label', { for: id, text: labelPL, style: FIELD_LABEL_STYLE }),
    input);
  return { wrap, input };
}

function setBusy(button, on) {
  if (!button) return;
  button.disabled = on;
  if (on) {
    button.dataset.state = 'busy';
    button.setAttribute('aria-busy', 'true');
  } else {
    delete button.dataset.state;
    button.removeAttribute('aria-busy');
  }
}

export function create() {
  const refs = {};
  const planRows = [];
  const providerButtons = [];
  let offAccount = null;
  let offBilling = null;
  let openLayer = null;   // arkusz otwarty z tego ekranu — zamykamy go przy wyjściu
  let busy = false;       // jedna operacja naraz: logowanie albo zakup
  let mounted = false;

  /* ─────────────────────────────  1. Uczciwość  ───────────────────────── */

  const demoStrip = h('p.m5-screen__demo', { aria: { role: 'note' } },
    h('span.m5-badge.m5-badge--solid', { dataset: { zone: 'warn' }, text: 'Demo' }),
    h('span', { text: 'Konto i płatności są tu w całości udawane.' }));

  const privacyNote = note('lock',
    'Nic nie wychodzi do sieci: nie ma logowania u dostawcy, nie ma płatności ani '
    + 'serwera po drugiej stronie. Wszystko, co tu wpiszesz, zostaje w pamięci tej '
    + 'przeglądarki i znika razem z jej danymi.');

  /* ──────────────────────────────  2. Konto  ──────────────────────────── */

  refs.accountTitle = h('h2.m5-card__title', { id: uid('title'), text: 'Zaloguj się' });

  const providersGrid = h('div.m5-account__providers', null, account.PROVIDERS.map((provider) => {
    const button = h('button.m5-btn.m5-account__provider', {
      type: 'button',
      class: provider.id === 'demo' ? 'm5-btn--primary' : 'm5-btn--ghost',
      dataset: { provider: provider.id },
      // Nazwa dla czytnika zaczyna się widoczną etykietą (wymóg „label in
      // name”), a kończy zdaniem o tym, że to symulacja — plakietki „Demo”
      // nad przyciskami czytnik nie poda przy samym przycisku.
      aria: { label: provider.labelPL + '. ' + provider.hintPL },
      on: { click: () => onProvider(provider, button) }
    }, icon(provider.icon, { size: 20 }), h('span', { text: provider.labelPL }));
    providerButtons.push(button);
    return button;
  }));

  refs.signInBody = h('div.m5-card__body.m5-account__signin', null,
    h('p.m5-screen__lead', {
      text: 'Konto niczego nie odblokowuje: pomiar, historia i narzędzia działają bez '
        + 'logowania. Jest tu po to, żeby pokazać, jak wygląda profil i plan.'
    }),
    providersGrid,
    note('info', 'Nie pytamy o hasło, nie wysyłamy wiadomości, nie prosimy o zgody. '
      + 'Imię i adres podasz dopiero wtedy, gdy sam zechcesz.'));

  refs.avatar = h('span.m5-account__avatar', { aria: { hidden: 'true' }, text: '—' });
  refs.profileName = h('span.m5-account__name', { text: '' });
  refs.profileEmail = h('span.m5-account__email', { text: '' });
  refs.profileMeta = h('span.m5-account__email.m5-account__meta', { text: '' });

  refs.profileBody = h('div.m5-card__body', { hidden: true },
    h('div.m5-account__profile', null,
      refs.avatar,
      h('span.m5-account__identity', null, refs.profileName, refs.profileEmail, refs.profileMeta)));

  refs.editButton = h('button.m5-btn.m5-btn--ghost', {
    type: 'button',
    on: { click: () => openProfileSheet() }
  }, 'Edytuj profil');

  refs.profileFoot = h('div.m5-card__foot', { hidden: true },
    refs.editButton,
    h('button.m5-btn.m5-btn--quiet', {
      type: 'button',
      on: { click: () => onSignOut() }
    }, 'Wyloguj się'));

  const accountCard = h('section.m5-card', { aria: { labelledby: refs.accountTitle.id } },
    h('header.m5-card__head', null, refs.accountTitle),
    refs.signInBody,
    refs.profileBody,
    refs.profileFoot);

  /* ──────────────────────────────  3. Plan  ───────────────────────────── */

  refs.planName = h('span.m5-account__plan-name', { text: '' });
  refs.planMeta = h('span.m5-account__plan-meta', { text: '' });
  refs.lockedLine = h('p.m5-account__plan-meta', { text: '' });

  const plansGrid = h('div.m5-account__plans');

  billing.PLANS.forEach((plan) => {
    const activeMark = h('span.m5-paywall__plan-badge', { text: 'Aktywny', hidden: true });
    const button = h('button.m5-btn.m5-paywall__plan', {
      type: 'button',
      dataset: { plan: plan.id },
      on: { click: () => buy(plan, button) }
    },
    h('span.m5-paywall__plan-name', { text: plan.namePL }),
    h('span.m5-paywall__plan-price', { text: plan.pricePL + ' ' + plan.periodPL }),
    plan.badgePL ? h('span.m5-paywall__plan-badge', { text: plan.badgePL }) : null,
    plan.savingPL ? h('span.m5-paywall__plan-saving', { text: plan.savingPL }) : null,
    activeMark,
    // Pełne zdanie o koszcie stoi w samym przycisku, a nie w przypisie pod
    // spodem: cena ma być widoczna w chwili, w której się ją wybiera.
    h('span.m5-account__plan-meta', {
      style: PLAN_NOTE_STYLE,
      text: [plan.perMonthPL, plan.notePL].filter(Boolean).join('. ')
    }));
    planRows.push({ plan, button, activeMark });
    plansGrid.appendChild(button);
  });

  refs.trialButton = h('button.m5-btn.m5-btn--primary', {
    type: 'button',
    hidden: true,
    on: { click: () => onTrial() }
  }, 'Rozpocznij 7 dni próbnych');

  refs.restoreButton = h('button.m5-btn.m5-btn--ghost', {
    type: 'button',
    hidden: true,
    on: { click: () => onRestore() }
  }, 'Przywróć zakup');

  refs.cancelButton = h('button.m5-btn.m5-btn--ghost', {
    type: 'button',
    hidden: true,
    on: { click: () => onCancel() }
  }, 'Anuluj plan');

  const planTitleId = uid('title');
  const planCard = h('section.m5-card', { aria: { labelledby: planTitleId } },
    h('header.m5-card__head', null,
      h('h2.m5-card__title', { id: planTitleId, text: 'Plan' }),
      h('span.m5-badge.m5-badge--demo', { text: 'Demo' })),
    h('div.m5-card__body', null,
      h('div.m5-account__plan', null, refs.planName, refs.planMeta),
      refs.lockedLine,
      plansGrid,
      note('info', 'Wybór planu niczego nie kosztuje: nie ma pola na kartę, nie ma opłaty '
        + 'i nie ma odnowienia. Zmiana dotyczy wyłącznie tej przeglądarki.')),
    h('div.m5-card__foot', null, refs.trialButton, refs.restoreButton, refs.cancelButton));

  /* ────────────────────────────  4. Korzyści  ─────────────────────────── */

  const benefitsTitleId = uid('title');
  const benefitsCard = h('section.m5-card.m5-account__benefits', { aria: { labelledby: benefitsTitleId } },
    h('header.m5-card__head', null,
      h('h2.m5-card__title', { id: benefitsTitleId, text: 'Co daje pakiet pełny' }),
      h('span.m5-badge.m5-badge--premium', { text: 'Premium' })),
    h('div.m5-card__body', null,
      h('ul.m5-paywall__benefits', null, billing.benefits().map((benefit) => h('li.m5-paywall__benefit', null,
        icon(benefit.icon, { size: 20 }),
        h('span', null,
          h('strong', { text: benefit.titlePL }),
          benefit.textPL ? ' ' + benefit.textPL : null)))),
      h('p.m5-screen__lead', {
        text: 'Wszystkie siedem wielkości liczy się zawsze i dla każdego — pakiet zmienia '
          + 'tylko to, czy liczba jest pokazana. Dlatego odblokowanie działa natychmiast, '
          + 'a historia ma komplet danych od pierwszego dnia.'
      })));

  /* ─────────────────────────  5. Usunięcie konta  ─────────────────────── */

  const dangerTitleId = uid('title');
  refs.dangerCard = h('section.m5-card', { hidden: true, aria: { labelledby: dangerTitleId } },
    h('header.m5-card__head', null,
      h('h2.m5-card__title', { id: dangerTitleId, text: 'Usunięcie konta' })),
    h('div.m5-card__body', null, h('p.m5-screen__lead', {
      text: 'Kasuje profil i symulowaną subskrypcję z tej przeglądarki. Historia pomiarów '
        + 'zostaje — należy do urządzenia, nie do konta.'
    })),
    h('div.m5-card__foot.m5-account__danger', null, h('button.m5-btn.m5-btn--danger', {
      type: 'button',
      on: { click: () => onDelete() }
    }, 'Usuń konto')));

  const el = h('div.m5-account', null,
    demoStrip, privacyNote, accountCard, planCard, benefitsCard, refs.dangerCard);

  /* ──────────────────────────  Synchronizacja  ────────────────────────── */

  /* Fokus przenosimy o jeden obrót pętli później: przycisk, z którego przyszła
     akcja, właśnie znika, a zamykany arkusz sam oddaje fokus temu, co go
     otworzyło — natychmiastowe ustawienie zostałoby zaraz nadpisane. */
  function focusSoon(target) {
    setTimeout(() => {
      if (!mounted || !target || !target.isConnected || target.hidden) return;
      if (target.closest('[hidden]')) return;
      target.focus({ preventScroll: true });
    }, 0);
  }

  function syncAccount() {
    const user = account.user();
    const signedIn = !!user;
    refs.accountTitle.textContent = signedIn ? 'Twój profil' : 'Zaloguj się';
    refs.signInBody.hidden = signedIn;
    refs.profileBody.hidden = !signedIn;
    refs.profileFoot.hidden = !signedIn;
    refs.dangerCard.hidden = !signedIn;
    if (!signedIn) return;
    refs.avatar.textContent = user.avatarInitials;
    // Pusty profil nazywamy pustym, zamiast podstawiać wymyślone imię.
    refs.profileName.textContent = user.name || 'Profil bez imienia';
    refs.profileEmail.textContent = user.email || 'Adres e-mail nie został podany';
    refs.profileMeta.textContent = 'Sposób logowania: ' + user.providerNamePL
      + ' · konto utworzone ' + relative(user.createdAt);
  }

  function syncPlan() {
    const state = billing.entitlement();
    const premium = state.plan === 'premium';
    const trial = state.source === 'trial';

    if (!premium) {
      refs.planName.textContent = 'Wersja bezpłatna';
      refs.planMeta.textContent = 'Cztery z siedmiu wielkości są widoczne. '
        + 'Pozostałe trzy liczą się w tle i czekają pod kłódką.';
    } else if (trial) {
      refs.planName.textContent = 'Okres próbny';
      refs.planMeta.textContent = 'Zostało ' + plural(billing.trialDaysLeft(), 'dzień', 'dni', 'dni')
        + '. Potem wracasz do wersji bezpłatnej — nic się nie odnawia i nie pobieramy opłaty.';
    } else {
      refs.planName.textContent = 'Plan ' + state.planNamePL.toLocaleLowerCase('pl-PL');
      refs.planMeta.textContent = state.pricePL + ' ' + state.periodPL
        + ' · aktywny od ' + dateShort(state.since);
    }

    const locked = billing.lockedMetrics();
    refs.lockedLine.textContent = locked.length
      ? 'Ukryte teraz: ' + locked.map((id) => byId(id).namePL).join(', ') + '.'
      : 'Wszystkie siedem wielkości jest widocznych.';

    planRows.forEach(({ plan, button, activeMark }) => {
      const active = premium && state.planId === plan.id;
      activeMark.hidden = !active;
      // aria-current opisuje bieżący element w zbiorze nawigacyjnym, nie stan
      // posiadania — na przycisku zakupu zostawiamy go tylko dla planu aktywnego
      // (i tak niesie go widoczna plakietka „Aktywny” plus disabled).
      if (active) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
      // Plan aktywny zostaje na ekranie, ale nie da się go kupić drugi raz.
      button.disabled = busy || active;
      const sentence = [plan.namePL, plan.pricePL + ' ' + plan.periodPL, plan.perMonthPL, plan.notePL]
        .filter(Boolean).join('. ');
      button.setAttribute('aria-label',
        (active ? 'Plan aktywny. ' : 'Wybierz plan w symulacji. ') + sentence);
    });

    refs.trialButton.hidden = !billing.trialAvailable();
    refs.restoreButton.hidden = premium;
    refs.cancelButton.hidden = !premium;
    refs.cancelButton.textContent = trial ? 'Zakończ okres próbny' : 'Anuluj plan';
  }

  /* Jedna operacja naraz. Blokada obejmuje też plany i akcje planu, bo zakup
     w trakcie logowania zapisałby uprawnienie na koncie, którego jeszcze nie ma. */
  function lockUi(on) {
    busy = on;
    providerButtons.forEach((button) => { button.disabled = on; });
    planRows.forEach(({ button }) => { button.disabled = on; });
    [refs.trialButton, refs.restoreButton, refs.cancelButton].forEach((button) => {
      button.disabled = on;
    });
    if (!on) syncPlan();   // po odblokowaniu wyłączony zostaje tylko plan aktywny
  }

  /* ────────────────────────────  Logowanie  ───────────────────────────── */

  async function runSignIn(provider, details, button) {
    if (busy) return false;
    lockUi(true);
    setBusy(button, true);
    try {
      const user = await account.signIn(provider.id, details);
      toast('Zalogowano — w symulacji. Dane zostają na tym urządzeniu.', { tone: 'success' });
      srSay('Zalogowano jako ' + (user.name || user.email || provider.shortPL));
      focusSoon(refs.editButton);
      return true;
    } catch (err) {
      // Przerwane logowanie nie jest awarią — nie krzyczymy na czerwono.
      toast(err.messagePL || 'Nie udało się zalogować.',
        { tone: err.code === 'cancelled' ? 'neutral' : 'error' });
      return false;
    } finally {
      setBusy(button, false);
      lockUi(false);
    }
  }

  function onProvider(provider, button) {
    if (provider.needsEmail) {
      openEmailSheet(provider);
      return;
    }
    runSignIn(provider, {}, button);
  }

  function openEmailSheet(provider) {
    const mail = field({
      labelPL: 'Adres e-mail',
      type: 'email',
      autocomplete: 'email',
      inputmode: 'email',
      placeholder: 'ty@przyklad.pl'
    });
    const errorId = uid('error');
    const error = h('p.m5-account__error', {
      id: errorId,
      style: ERROR_STYLE,
      aria: { role: 'alert' },
      hidden: true
    });
    mail.input.setAttribute('aria-describedby', errorId);

    const layer = sheet({
      title: 'Logowanie e-mailem',
      body: [
        h('p.m5-screen__demo', null,
          h('span.m5-badge.m5-badge--solid', { dataset: { zone: 'warn' }, text: 'Demo' }),
          h('span', { text: 'Nie wyślemy żadnej wiadomości i nie sprawdzimy tego adresu.' })),
        mail.wrap,
        error,
        note('lock', 'Adres trafia wyłącznie do pamięci tej przeglądarki. Możesz go usunąć, '
          + 'edytując profil albo kasując konto.')
      ],
      actions: [
        { labelPL: 'Anuluj', tone: 'ghost' },
        {
          labelPL: 'Zaloguj się',
          tone: 'primary',
          keepOpen: true,
          onClick: async (api) => {
            error.hidden = true;
            const value = mail.input.value.trim();
            if (!value) {
              error.hidden = false;
              error.textContent = 'Podaj adres e-mail.';
              mail.input.focus();
              return true;
            }
            if (await runSignIn(provider, { email: value }, null)) api.close();
            return true;
          }
        }
      ],
      onClose: () => {
        // Arkusz zamknięty w trakcie „logowania” musi je przerwać — inaczej
        // zalogowałby użytkownika już po swoim zniknięciu.
        account.cancelSignIn();
        if (openLayer === layer) openLayer = null;
      }
    });
    openLayer = layer;
    mail.input.focus();
  }

  function onSignOut() {
    account.signOut();
    toast('Wylogowano. Profil został usunięty z tej przeglądarki.', { tone: 'neutral' });
    focusSoon(providerButtons[0]);
  }

  function openProfileSheet() {
    const user = account.user();
    if (!user) return;
    const name = field({ labelPL: 'Imię lub nazwa', value: user.name, autocomplete: 'name' });
    const mail = field({
      labelPL: 'Adres e-mail',
      type: 'email',
      value: user.email,
      autocomplete: 'email',
      inputmode: 'email'
    });
    const errorId = uid('error');
    const error = h('p.m5-account__error', {
      id: errorId,
      style: ERROR_STYLE,
      aria: { role: 'alert' },
      hidden: true
    });
    mail.input.setAttribute('aria-describedby', errorId);

    const layer = sheet({
      title: 'Edytuj profil',
      body: [
        h('p.m5-screen__lead', {
          text: 'Oba pola możesz zostawić puste — aplikacja nie potrzebuje ich do niczego.'
        }),
        name.wrap,
        mail.wrap,
        error
      ],
      actions: [
        { labelPL: 'Anuluj', tone: 'ghost' },
        {
          labelPL: 'Zapisz',
          tone: 'primary',
          keepOpen: true,
          onClick: (api) => {
            const mailValue = mail.input.value.trim();
            account.update({ name: name.input.value, email: mailValue });
            // update() pomija adres niepoprawny, żeby nie cofnąć zmiany imienia.
            // Porównujemy więc wynik z tym, co człowiek wpisał: cicha porażka
            // byłaby kłamstwem na ekranie.
            if (mailValue && account.user().email !== mailValue) {
              error.hidden = false;
              error.textContent = 'To nie wygląda na adres e-mail. Pozostałe zmiany zapisaliśmy.';
              mail.input.focus();
              return true;
            }
            toast('Profil zapisany.', { tone: 'success' });
            api.close();
            return true;
          }
        }
      ],
      onClose: () => { if (openLayer === layer) openLayer = null; }
    });
    openLayer = layer;
    name.input.focus();
  }

  async function onDelete() {
    const confirmed = await dialog({
      title: 'Usunąć konto?',
      text: 'Profil i symulowana subskrypcja znikną z tej przeglądarki. Tej operacji nie '
        + 'da się cofnąć. Historia pomiarów zostaje nietknięta.',
      confirmPL: 'Usuń konto',
      cancelPL: 'Zachowaj',
      tone: 'danger'
    });
    if (!confirmed) return;
    account.deleteAccount();
    toast('Konto usunięte razem z symulowaną subskrypcją.', { tone: 'neutral' });
    focusSoon(providerButtons[0]);
  }

  /* ──────────────────────────────  Plan  ──────────────────────────────── */

  async function buy(plan, button) {
    if (busy) return;
    lockUi(true);
    setBusy(button, true);
    srSay('Przetwarzam symulowaną płatność.');
    try {
      const result = await billing.purchase(plan.id);
      if (result.ok) {
        toast('Plan ' + plan.namePL.toLocaleLowerCase('pl-PL') + ' aktywny (symulacja).',
          { tone: 'success' });
        srSay('Pakiet pełny aktywny. Wszystkie siedem wielkości jest widocznych.');
      } else {
        toast(result.messagePL, { tone: 'error' });
      }
    } finally {
      setBusy(button, false);
      lockUi(false);
    }
  }

  function onTrial() {
    try {
      billing.startTrial();
      toast('Okres próbny działa przez 7 dni. Potem sam się kończy.', { tone: 'success' });
      srSay('Okres próbny rozpoczęty. Zostało 7 dni.');
    } catch (err) {
      toast(err.messagePL || 'Nie udało się rozpocząć okresu próbnego.', { tone: 'neutral' });
    }
  }

  function onRestore() {
    const restored = billing.restore();
    toast(restored
      ? 'Zakup przywrócony z pamięci tej przeglądarki.'
      : 'Nie znaleziono zakupu do przywrócenia.',
    { tone: restored ? 'success' : 'neutral' });
  }

  function onCancel() {
    const trial = billing.isTrial();
    if (!billing.cancel()) return;
    toast(trial
      ? 'Okres próbny zakończony. Plany są nadal na ekranie.'
      : 'Plan anulowany. Wrócisz do niego w jednym kroku.',
    { tone: 'neutral' });
    focusSoon(refs.restoreButton);
  }

  /* ───────────────────────────  Cykl życia  ───────────────────────────── */

  function aboutSheet() {
    const layer = sheet({
      title: 'O tej symulacji',
      body: [
        h('p', {
          text: 'Monitor Światła mierzy światło kamerą i liczy wszystko na urządzeniu. '
            + 'Konto, plany i płatności są wyłącznie pokazem interfejsu.'
        }),
        h('ul.m5-paywall__benefits', null, [
          ['lock', 'Zero sieci', 'Aplikacja nie wysyła ani jednego żądania poza własne pliki.'],
          ['user', 'Zero danych osobowych', 'W profilu jest tylko to, co sam wpiszesz.'],
          ['sparkle', 'Zero opłat', 'Nie ma pola na kartę, nie ma rachunku i nie ma odnowienia.']
        ].map(([iconName, title, text]) => h('li.m5-paywall__benefit', null,
          icon(iconName, { size: 20 }),
          h('span', null, h('strong', { text: title }), ' ' + text)))),
        note('info', 'Ustawienia i pomiary skasujesz w Narzędziach, a konto razem '
          + 'z subskrypcją — przyciskiem „Usuń konto”.')
      ],
      actions: [{ labelPL: 'Rozumiem', tone: 'primary' }],
      onClose: () => { if (openLayer === layer) openLayer = null; }
    });
    openLayer = layer;
  }

  return {
    el,
    titlePL: 'Konto',

    actions() {
      return [{ icon: 'info', labelPL: 'O tej symulacji', onClick: aboutSheet }];
    },

    mount() {
      mounted = true;
      syncAccount();
      syncPlan();
      // Zdarzenia zmieniają tekst i widoczność w gotowych węzłach — ekran nie
      // buduje się drugi raz, więc fokus i przewinięcie zostają na miejscu.
      offAccount = bus.on('account:changed', syncAccount);
      offBilling = bus.on('billing:changed', syncPlan);
    },

    unmount() {
      mounted = false;
      if (offAccount) { offAccount(); offAccount = null; }
      if (offBilling) { offBilling(); offBilling = null; }
      account.cancelSignIn();
      if (openLayer) { openLayer.close(); openLayer = null; }
    }
  };
}
