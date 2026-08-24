/* Monitor Światła v4 — konto użytkownika (auth.js).
 *
 * ROLA PLIKU: warstwa danych i reguł konta. Trzyma profil, listę dostawców
 * logowania i symulowany przebieg logowania. Nie buduje ani jednego węzła DOM
 * — ekran logowania rysuje screen-account.js, korzystając wyłącznie z API
 * poniżej i ze słownika UI.T.auth.
 *
 * UCZCIWOŚĆ. W wersji wysyłanej użytkownikom Auth.CONFIG jest pusty, więc
 * Auth.isDemo() zwraca true i logowanie jest symulacją: nie ma połączenia
 * z Google ani z Facebookiem, nic nie wychodzi do sieci, a profil leży
 * wyłącznie w localStorage tej przeglądarki. Każdy ekran logowania musi nieść
 * plakietkę UI.T.auth.demoBadge i zdanie UI.T.auth.demoText — to nie jest
 * ozdoba, tylko warunek, pod którym ten plik wolno pokazać człowiekowi.
 *
 * Konto niczego nie odblokowuje. Pomiar, historia i wszystkie narzędzia
 * działają bez logowania; konto jest tylko miejscem, w którym widać stan
 * subskrypcji. Stan subskrypcji trzyma billing.js, nie ten plik.
 */
(function (global) {
  'use strict';

  var KEY = 'ms4.account.v1';

  var Auth = {};

  /* ------------------------------------------------------------------
     Konfiguracja prawdziwego logowania
     ------------------------------------------------------------------ */

  /* JAK WŁĄCZYĆ PRAWDZIWE LOGOWANIE — instrukcja, nie ozdoba.
   *
   * Puste pola = tryb demonstracyjny. Żeby logowanie stało się prawdziwe,
   * trzeba wpisać niżej identyfikatory i spełnić cztery warunki, których
   * sam kod spełnić nie może:
   *
   * 1. Google — `google.clientId`.
   *    Konsola Google Cloud → „APIs & Services” → „Credentials” →
   *    „OAuth 2.0 Client ID”, typ „Web application”. Do „Authorized JavaScript
   *    origins” trzeba dopisać dokładny adres aplikacji (np.
   *    https://uzytkownik.github.io). Identyfikator wygląda tak:
   *    '1234567890-abcdefghijklmnop.apps.googleusercontent.com'.
   *
   * 2. Facebook — `facebook.appId`.
   *    developers.facebook.com → nowa aplikacja → produkt „Facebook Login” →
   *    „Settings” → „Valid OAuth Redirect URIs” i „App Domains” z adresem
   *    aplikacji. Identyfikator to sam ciąg cyfr, np. '1234567890123456'.
   *
   * 3. HTTPS. Oba SDK odmawiają działania na http:// (poza localhost).
   *    GitHub Pages daje HTTPS z automatu, własny serwer wymaga certyfikatu.
   *
   * 4. Backend do wymiany tokenu. To jest warunek, o którym najczęściej się
   *    zapomina: token, który dostajemy w przeglądarce, jest wiarygodny
   *    dopiero po sprawdzeniu podpisu po stronie serwera (Google: weryfikacja
   *    JWT kluczami z /oauth2/v3/certs; Facebook: /debug_token z sekretem
   *    aplikacji). Bez tego kroku każdy może podać dowolny token i podać się
   *    za dowolne konto. Sekretu aplikacji NIE WOLNO wpisać w tym pliku —
   *    wszystko, co tu stoi, czyta każdy odwiedzający.
   *
   * Dopóki backendu nie ma, uczciwiej jest zostawić puste pola i tryb
   * demonstracyjny niż udawać logowanie, którego nikt nie sprawdza.
   */
  Auth.CONFIG = {
    google: { clientId: '' },
    facebook: { appId: '' }
  };

  /* ------------------------------------------------------------------
     Pamięć — każdy dostęp osobno w try/catch
     ------------------------------------------------------------------ */

  // Tryb prywatny potrafi rzucić wyjątkiem także przy ODCZYCIE, nie tylko przy
  // zapisie. Jeden try/catch na dostęp to jedyny kształt, który to przeżywa:
  // aplikacja działa wtedy z pamięci procesu i po prostu zapomina po odświeżeniu.
  function readStore(key) {
    try {
      var raw = global.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (_) { return null; }
  }

  function writeStore(key, value) {
    try {
      global.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_) { return false; }
  }

  function removeStore(key) {
    try { global.localStorage.removeItem(key); } catch (_) { /* nic do zrobienia */ }
  }

  function emit(name, data) {
    try {
      if (global.Bus && typeof global.Bus.emit === 'function') global.Bus.emit(name, data);
    } catch (_) { /* zepsuty słuchacz nie może wywrócić logowania */ }
  }

  // Zdanie z UI.T.auth, jeśli słownik już jest; inaczej zapasowe z tego pliku.
  // auth.js ładuje się PO ui.js, ale providers() bywa wołane także z testów,
  // gdzie UI nie istnieje — stąd zapas.
  function text(key, fallback) {
    try {
      if (global.UI && global.UI.T && global.UI.T.auth && global.UI.T.auth[key]) {
        return global.UI.T.auth[key];
      }
    } catch (_) { /* pusto */ }
    return fallback;
  }

  /* ------------------------------------------------------------------
     Dostawcy
     ------------------------------------------------------------------ */

  /* `brandHex` to barwa rozpoznawcza dostawcy podana wyłącznie jako dana
     — sam rysunek ikony (`brand-google`, `brand-facebook`, …) powstaje w ui.js
     i to on jest udokumentowanym wyjątkiem od zakazu barw spoza tokenów.
     Ekran nie musi tego pola używać; służy podpisom i testom kontrastu.
     `real: true` oznacza, że dla tego dostawcy istnieje ścieżka prawdziwego
     logowania, jeśli CONFIG zostanie wypełniony. */
  var PROVIDERS = [
    {
      id: 'google', namePL: 'Google', icon: 'brand-google',
      className: 'ms4-provider--google', brandHex: '#4285F4',
      textKey: 'google', fallbackLabelPL: 'Kontynuuj przez Google', real: true
    },
    {
      id: 'facebook', namePL: 'Facebook', icon: 'brand-facebook',
      className: 'ms4-provider--facebook', brandHex: '#1877F2',
      textKey: 'facebook', fallbackLabelPL: 'Kontynuuj przez Facebooka', real: true
    },
    {
      id: 'apple', namePL: 'Apple', icon: 'brand-apple',
      className: 'ms4-provider--apple', brandHex: null,
      textKey: 'apple', fallbackLabelPL: 'Kontynuuj przez Apple', real: false
    },
    {
      id: 'email', namePL: 'E-mail', icon: 'brand-mail',
      className: 'ms4-provider--email', brandHex: null,
      textKey: 'email', fallbackLabelPL: 'Kontynuuj przez e-mail', real: false
    }
  ];

  function providerById(id) {
    for (var i = 0; i < PROVIDERS.length; i += 1) {
      if (PROVIDERS[i].id === id) return PROVIDERS[i];
    }
    return null;
  }

  Auth.providers = function () {
    var out = [];
    for (var i = 0; i < PROVIDERS.length; i += 1) {
      var p = PROVIDERS[i];
      out.push({
        id: p.id,
        namePL: p.namePL,
        labelPL: text(p.textKey, p.fallbackLabelPL),
        icon: p.icon,
        className: p.className,
        brandHex: p.brandHex,
        // Czy TEN dostawca zaloguje naprawdę przy obecnym CONFIG.
        demo: !hasConfig(p.id)
      });
    }
    return out;
  };

  /* ------------------------------------------------------------------
     Tryb demonstracyjny
     ------------------------------------------------------------------ */

  function hasConfig(providerId) {
    var c = Auth.CONFIG || {};
    if (providerId === 'google') {
      return !!(c.google && typeof c.google.clientId === 'string' && c.google.clientId.length > 0);
    }
    if (providerId === 'facebook') {
      return !!(c.facebook && typeof c.facebook.appId === 'string' && c.facebook.appId.length > 0);
    }
    // Apple i e-mail nie mają w tej aplikacji ścieżki innej niż symulacja.
    return false;
  }

  // Demo dla CAŁEJ aplikacji: dopóki żaden dostawca nie jest skonfigurowany,
  // każdy ekran logowania nosi plakietkę „Tryb demonstracyjny”.
  Auth.isDemo = function () {
    return !(hasConfig('google') || hasConfig('facebook'));
  };

  /* ------------------------------------------------------------------
     Profil
     ------------------------------------------------------------------ */

  var current = null;   // {id, name, email, provider, createdAt}

  function initialsFrom(name, email) {
    var src = (name || '').replace(/\s+/g, ' ').trim();
    if (src) {
      var parts = src.split(' ');
      var first = parts[0].charAt(0);
      var second = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
      return (first + second).toUpperCase();
    }
    var mail = (email || '').trim();
    if (mail) {
      var local = mail.split('@')[0].replace(/[^A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]/g, '');
      if (local.length >= 2) return (local.charAt(0) + local.charAt(1)).toUpperCase();
      if (local.length === 1) return local.toUpperCase();
    }
    return '?';
  }

  // Profil publiczny. `avatar` jest zawsze null: aplikacja nie pobiera żadnych
  // plików graficznych, więc awatar rysujemy z inicjałów (ms4-profile__initials).
  function publicUser(rec) {
    if (!rec) return null;
    return {
      id: rec.id,
      name: rec.name || '',
      email: rec.email || '',
      provider: rec.provider || 'email',
      providerNamePL: (providerById(rec.provider) || { namePL: '' }).namePL,
      initials: initialsFrom(rec.name, rec.email),
      avatar: null,
      createdAt: rec.createdAt || 0
    };
  }

  function validRecord(rec) {
    return !!(rec && typeof rec === 'object' && typeof rec.id === 'string' && rec.id &&
      typeof rec.email === 'string' && providerById(rec.provider));
  }

  function load() {
    var rec = readStore(KEY);
    current = validRecord(rec) ? rec : null;
    // Zapis niezgodny z kontraktem (stara wersja, ręczna edycja) usuwamy,
    // żeby nie wracał przy każdym uruchomieniu.
    if (rec && !current) removeStore(KEY);
  }

  function save() {
    if (current) writeStore(KEY, current);
    else removeStore(KEY);
  }

  function announce(reason) {
    emit('auth:changed', { user: publicUser(current), reason: reason || 'change' });
  }

  Auth.user = function () {
    return publicUser(current);
  };

  Auth.isSignedIn = function () {
    return !!current;
  };

  /* ------------------------------------------------------------------
     Logowanie — przebieg symulowany
     ------------------------------------------------------------------ */

  // Imiona do profilu demonstracyjnego. Losujemy raz, przy pierwszym logowaniu
  // danym dostawcą; potem profil leży w pamięci i już się nie zmienia.
  var DEMO_PEOPLE = [
    { name: 'Anna Kowalska', local: 'anna.kowalska' },
    { name: 'Marek Nowak', local: 'marek.nowak' },
    { name: 'Julia Wiśniewska', local: 'julia.wisniewska' },
    { name: 'Piotr Zieliński', local: 'piotr.zielinski' },
    { name: 'Ewa Lewandowska', local: 'ewa.lewandowska' },
    { name: 'Tomasz Wójcik', local: 'tomasz.wojcik' }
  ];

  var DEMO_DOMAIN = {
    google: 'przyklad.pl',
    facebook: 'przyklad.pl',
    apple: 'prywatny.przyklad.pl',
    email: 'przyklad.pl'
  };

  function demoProfile(providerId, opts) {
    var person = DEMO_PEOPLE[Math.floor(Math.random() * DEMO_PEOPLE.length)];
    var name = opts && opts.name ? String(opts.name).trim() : '';
    var email = opts && opts.email ? String(opts.email).trim() : '';
    if (!name) name = person.name;
    if (!email) email = person.local + '@' + (DEMO_DOMAIN[providerId] || 'przyklad.pl');
    return { name: name, email: email };
  }

  function newId() {
    return 'u' + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
  }

  function fail(code, messageKey, fallback) {
    var err = new Error(text(messageKey, fallback));
    err.code = code;
    return err;
  }

  // Jedno logowanie naraz. Trzymamy je w zmiennej, żeby ekran mógł je przerwać
  // (użytkownik zamyka arkusz w trakcie „Loguję…”) i żeby drugie naciśnięcie
  // przycisku nie uruchomiło dwóch przebiegów.
  var pending = null;

  Auth.isPending = function () {
    return !!pending;
  };

  /* Anulowanie — poza literą kontraktu, ale bez niego arkusz zamknięty w trakcie
     logowania i tak zalogowałby użytkownika po swoim zniknięciu. Odrzuca
     obietnicę błędem o kodzie 'CANCELLED'; ekran ma taki błąd zignorować. */
  Auth.cancelSignIn = function () {
    if (!pending) return false;
    var p = pending;
    pending = null;
    if (p.timer) global.clearTimeout(p.timer);
    p.cancelled = true;
    p.reject(fail('CANCELLED', '', 'Logowanie przerwane.'));
    return true;
  };

  function looksLikeEmail(value) {
    // Świadomie luźno: sprawdzamy tylko to, co obiecuje UI.T.auth.emailBad
    // — jedna małpa i kropka po niej. Adresów i tak nikt nie weryfikuje.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  Auth.signIn = function (providerId, opts) {
    var provider = providerById(providerId);
    opts = opts || {};

    if (!provider) {
      return Promise.reject(fail('PROVIDER_UNKNOWN', '', 'Nieznany sposób logowania.'));
    }

    // Logowanie e-mailem sprawdzamy przed opóźnieniem: błąd w polu ma się
    // pokazać natychmiast, a nie po sekundzie udawanej pracy.
    if (providerId === 'email') {
      var mail = String(opts.email || '').trim();
      if (!mail) return Promise.reject(fail('EMAIL_EMPTY', 'emailEmpty', 'Podaj adres e-mail.'));
      if (!looksLikeEmail(mail)) {
        return Promise.reject(fail('EMAIL_BAD', 'emailBad', 'To nie wygląda na adres e-mail.'));
      }
    }

    if (pending) Auth.cancelSignIn();

    // Konfiguracja wypełniona → próbujemy prawdziwego przebiegu i NIE schodzimy
    // po cichu do symulacji. Ciche zejście byłoby najgorszym z możliwych
    // zachowań: użytkownik widziałby „zalogowano”, nie będąc zalogowanym.
    if (hasConfig(providerId)) {
      return realSignIn(provider);
    }

    return demoSignIn(provider, opts);
  };

  function demoSignIn(provider, opts) {
    return new Promise(function (resolve, reject) {
      var state = { cancelled: false, reject: reject, timer: null };
      pending = state;

      // 600–900 ms: tyle mniej więcej trwa okno dostawcy. Krótsze opóźnienie
      // wygląda na błąd, dłuższe na zawieszenie.
      var delay = 600 + Math.floor(Math.random() * 300);

      state.timer = global.setTimeout(function () {
        if (state.cancelled) return;
        pending = null;

        var profile = demoProfile(provider.id, opts);
        current = {
          id: newId(),
          name: profile.name,
          email: profile.email,
          provider: provider.id,
          createdAt: Date.now()
        };
        save();
        announce('signin');
        resolve(publicUser(current));
      }, delay);
    });
  }

  /* ------------------------------------------------------------------
     Logowanie — przebieg prawdziwy (uruchamia się TYLKO z wypełnionym CONFIG)
     ------------------------------------------------------------------ */

  /* Poniższy kod nigdy nie wykonuje się w wersji demonstracyjnej: bez CONFIG
     Auth.signIn kończy się w demoSignIn i do sieci nie idzie ani jedno żądanie.
     Jest tu po to, żeby podmiana na prawdziwe logowanie polegała na wpisaniu
     dwóch identyfikatorów, a nie na przepisywaniu pliku. */

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var existing = global.document.querySelector('script[data-auth-sdk="' + src + '"]');
      if (existing) {
        if (existing.getAttribute('data-loaded') === '1') { resolve(); return; }
        existing.addEventListener('load', function () { resolve(); });
        existing.addEventListener('error', function () { reject(fail('SDK_FAILED', '', 'Nie udało się wczytać skryptu dostawcy.')); });
        return;
      }
      var s = global.document.createElement('script');
      s.src = src;
      s.async = true;
      s.defer = true;
      s.setAttribute('data-auth-sdk', src);
      s.onload = function () { s.setAttribute('data-loaded', '1'); resolve(); };
      s.onerror = function () { reject(fail('SDK_FAILED', '', 'Nie udało się wczytać skryptu dostawcy.')); };
      global.document.head.appendChild(s);
    });
  }

  // Odczyt ładunku tokenu Google bez sieci. To NIE jest weryfikacja podpisu —
  // ta musi się odbyć na serwerze (punkt 4 instrukcji przy CONFIG).
  function decodeJwtPayload(token) {
    var parts = String(token || '').split('.');
    if (parts.length !== 3) return null;
    try {
      var b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      while (b64.length % 4) b64 += '=';
      var json = decodeURIComponent(global.atob(b64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(json);
    } catch (_) { return null; }
  }

  function realSignIn(provider) {
    if (provider.id === 'google') return realGoogle();
    if (provider.id === 'facebook') return realFacebook();
    return Promise.reject(fail('PROVIDER_UNSUPPORTED', '', 'Ten dostawca nie ma prawdziwego przebiegu.'));
  }

  function realGoogle() {
    return loadScript('https://accounts.google.com/gsi/client').then(function () {
      return new Promise(function (resolve, reject) {
        var g = global.google;
        if (!g || !g.accounts || !g.accounts.id) {
          reject(fail('SDK_FAILED', '', 'Skrypt Google nie udostępnił swojego API.'));
          return;
        }
        g.accounts.id.initialize({
          client_id: Auth.CONFIG.google.clientId,
          callback: function (response) {
            var payload = decodeJwtPayload(response && response.credential);
            if (!payload || !payload.email) {
              reject(fail('SIGNIN_FAILED', '', 'Dostawca nie zwrócił adresu e-mail.'));
              return;
            }
            // MIEJSCE NA WYMIANĘ TOKENU: response.credential trzeba wysłać do
            // własnego backendu i dopiero jego odpowiedź uznać za logowanie.
            adopt({
              name: payload.name || '',
              email: payload.email,
              provider: 'google'
            });
            resolve(publicUser(current));
          }
        });
        g.accounts.id.prompt(function (notification) {
          if (notification && typeof notification.isNotDisplayed === 'function' &&
              (notification.isNotDisplayed() || notification.isSkippedMoment())) {
            reject(fail('CANCELLED', '', 'Logowanie przerwane.'));
          }
        });
      });
    });
  }

  function realFacebook() {
    return loadScript('https://connect.facebook.net/pl_PL/sdk.js').then(function () {
      return new Promise(function (resolve, reject) {
        var FB = global.FB;
        if (!FB) {
          reject(fail('SDK_FAILED', '', 'Skrypt Facebooka nie udostępnił swojego API.'));
          return;
        }
        FB.init({ appId: Auth.CONFIG.facebook.appId, cookie: true, xfbml: false, version: 'v19.0' });
        FB.login(function (response) {
          if (!response || !response.authResponse) {
            reject(fail('CANCELLED', '', 'Logowanie przerwane.'));
            return;
          }
          // MIEJSCE NA WYMIANĘ TOKENU: response.authResponse.accessToken
          // sprawdza backend przez /debug_token z sekretem aplikacji.
          FB.api('/me', { fields: 'name,email' }, function (me) {
            if (!me || me.error || !me.email) {
              reject(fail('SIGNIN_FAILED', '', 'Dostawca nie zwrócił adresu e-mail.'));
              return;
            }
            adopt({ name: me.name || '', email: me.email, provider: 'facebook' });
            resolve(publicUser(current));
          });
        }, { scope: 'public_profile,email' });
      });
    });
  }

  function adopt(profile) {
    current = {
      id: newId(),
      name: profile.name || '',
      email: profile.email || '',
      provider: profile.provider,
      createdAt: Date.now()
    };
    save();
    announce('signin');
  }

  /* ------------------------------------------------------------------
     Wylogowanie, zmiana profilu, usunięcie konta
     ------------------------------------------------------------------ */

  Auth.signOut = function () {
    if (pending) Auth.cancelSignIn();
    if (!current) return false;
    current = null;
    save();
    announce('signout');
    return true;
  };

  // Zmiana imienia albo adresu (arkusz „Edytuj profil”). Inicjały liczą się
  // z nowej wartości same, bo nigdy nie są przechowywane.
  Auth.update = function (patch) {
    if (!current || !patch || typeof patch !== 'object') return Auth.user();
    if (typeof patch.name === 'string') current.name = patch.name.trim();
    if (typeof patch.email === 'string' && looksLikeEmail(patch.email.trim())) {
      current.email = patch.email.trim();
    }
    save();
    announce('update');
    return Auth.user();
  };

  /* Usunięcie konta kasuje TYLKO klucz konta. Stan subskrypcji czyści
     billing.js, który słucha 'auth:changed' z powodem 'deleted' — dzięki temu
     zależność idzie w jedną stronę (billing zna auth, auth nie zna billingu)
     i nie ma dwóch plików piszących do jednego klucza. Historia pomiarów
     zostaje nietknięta: należy do engine.js i do urządzenia, nie do konta. */
  Auth.deleteAccount = function () {
    if (pending) Auth.cancelSignIn();
    current = null;
    removeStore(KEY);
    announce('deleted');
    return true;
  };

  load();

  global.Auth = Auth;

}(typeof window !== 'undefined' ? window : globalThis));
