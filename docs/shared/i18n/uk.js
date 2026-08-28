/* docs/shared/i18n/uk.js — słownik WSPÓLNY, ukraiński.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest ukraiński.
 *
 * SKĄD TE ZDANIA: przekład z polskiego (pl.js jest redakcją pierwotną),
 * z angielskim (en.js) jako wzorcem terminologii i rejestru. Ton oryginału —
 * rzeczowy i spokojny, bez marketingu i bez straszenia — został zachowany.
 *
 * TERMINOLOGIA: siedem wielkości nazwano przyjętymi terminami ukraińskimi,
 * po jednym odpowiedniku na pojęcie w całym pliku: «частка синього»,
 * «яскравість сцени», «колірна температура» (a nie potoczne „кольорова”),
 * «циркадний вплив» (меланопічний коефіцієнт), «мерехтіння»,
 * «рівномірність», «зоровий комфорт».
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — i tak ma zostać
 * w każdym z trzydziestu języków (patrz docs/shared/README.md, rozdział
 * „Warstwa językowa”). Klucza, którego nie ma w angielskim, nie wolno tu
 * dopisać: angielski jest wartością zapasową, więc to on wyznacza zestaw.
 */
window.I18nData = window.I18nData || {};
window.I18nData['uk'] = Object.assign(window.I18nData['uk'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu (UE)
     2017/745, gdzie stoi w mianowniku. Rodzaj męski («Монітор») rządzi tam
     orzeczeniem: «не є», «не призначений». */
  'app.name': 'Монітор світла',

  /* ---- wybór języka ---- */

  'language.label': 'Мова',
  'language.help': 'Мова всього застосунку. Усі мови вже є на цьому пристрої — нічого не завантажується і нікуди не надсилається.',
  'language.auto': 'Як на пристрої',
  'language.autoHint': 'Відповідає мові, налаштованій у телефоні або в браузері.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Частка синього',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'відсотків',
  'metric.share.short': 'Яка частина видимого світла припадає на синій канал.',
  'metric.share.help': 'Відокремлює колір від яскравості — саме це значення змінюється, коли ви вмикаєте нічний режим.',

  'metric.brightness.name': 'Яскравість сцени',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'відсотків',
  'metric.brightness.short': 'Середня яскравість зображення з камери.',
  'metric.brightness.help': 'Відносне значення, а не люкси — автоматика експозиції камери непомітно зміщує його під сподом.',

  'metric.kelvin.name': 'Колірна температура',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'кельвінів',
  'metric.kelvin.short': 'Тепле це світло чи холодне.',
  'metric.kelvin.help': 'Нижче 3000 K світло тепле і ввечері лагідніше. 6500 K — типовий білий більшості екранів.',

  'metric.melanopic.name': 'Циркадний вплив',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'раза',
  'metric.melanopic.short': 'Наскільки сильно це світло діє на біологічний годинник.',
  'metric.melanopic.help': 'Наближення меланопічного коефіцієнта. 1,00 — нейтральний денний білий; увечері варто спускатися нижче 0,50.',

  'metric.flicker.name': 'Мерехтіння',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'відсотків',
  'metric.flicker.short': 'Непомітне пульсування джерела світла.',
  'metric.flicker.help': 'Дешеві димери та підсвітки пульсують. Око цього не бачить, але це буває причиною втоми й головного болю.',

  'metric.uniformity.name': 'Рівномірність',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'відсотків',
  'metric.uniformity.short': 'Чи рівномірно світло розподіляється в кадрі.',
  'metric.uniformity.help': 'Низьке значення на екрані означає засвітку підсвітки або відблиск; на столі — погано поставлену лампу.',

  'metric.comfort.name': 'Зоровий комфорт',
  'metric.comfort.unit': 'бал',
  'metric.comfort.unitSpoken': 'балів',
  'metric.comfort.short': 'Одна оцінка замість шести чисел.',
  'metric.comfort.help': 'Складає решту вимірів в оцінку 0–100 і показує, що найбільше її знижує. Ваги — наша редакційна оцінка, а не норма.',

  /* Etykiety składników oceny komfortu — Metrics.comfortIndex zwraca je jako
     `penalties[].id`, więc nazwa klucza idzie za tym identyfikatorem. */
  'comfort.penalty.melanopic': 'Циркадний вплив',
  'comfort.penalty.kelvin': 'Холодний колір світла',
  'comfort.penalty.flicker': 'Мерехтіння',
  'comfort.penalty.uniformity': 'Нерівномірне освітлення',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': 'Натисніть «Старт», щоб увімкнути камеру.',
  'engine.starting': 'Вмикаю камеру…',

  'engine.error.permission': 'Немає дозволу на доступ до камери. Дозвольте камеру в налаштуваннях браузера і натисніть «Старт» ще раз.',
  'engine.error.notFound': 'Камеру не знайдено. Перевірте, чи має пристрій камеру і чи не вимкнена вона в системі.',
  'engine.error.busy': 'Камера зайнята іншим застосунком. Закрийте його і спробуйте ще раз.',
  'engine.error.unknown': 'Не вдалося увімкнути камеру.',
  'engine.error.unsupported': 'Цей браузер не надає цій сторінці доступу до камери. Відкрийте застосунок через HTTPS або скористайтеся іншим браузером.',

  /* ---- strefy ---- */

  'zone.good': 'У нормі',
  'zone.warning': 'Увага',
  'zone.critical': 'Критично',
  'zone.none': 'Немає даних',
  'zone.settling': 'Визначаю',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania, więc małą literą
     i bez kropki. To nie jest to samo, co napis na plakietce. */
  'zone.spoken.good': 'у нормі',
  'zone.spoken.warning': 'увага',
  'zone.spoken.critical': 'критично',
  'zone.spoken.none': 'немає даних',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'бал',
  'unit.hertz': 'Hz',
  'unit.second': 'с',
  'unit.minute': 'хв',
  'unit.hour': 'год',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'Це світло в порядку — ніщо не перевищує встановлених порогів.',
  'verdict.noValue': 'Цю величину зараз не вдається виміряти. Перевірте, чи не закритий об’єктив.',
  'verdict.warmup': 'Визначаю оцінку — потримайте телефон нерухомо ще трохи.',

  'verdict.warning.share': 'Чимала частина цього світла припадає на синій канал. Увечері варто його приглушити.',
  'verdict.warning.brightness': 'Сцена яскрава — камера працює близько до верхньої межі вимірювання.',
  'verdict.warning.kelvin': 'Світло досить холодне. Увечері лагіднішою буває лампа близько 2700 K.',
  'verdict.warning.melanopic': 'Це світло досить сильно діє на біологічний годинник.',
  'verdict.warning.flicker': 'Джерело світла помітно пульсує.',
  'verdict.warning.uniformity': 'Світло розподіляється в кадрі нерівномірно.',
  'verdict.warning.comfort': 'Зоровий комфорт знижений — на це склалося кілька речей водночас.',

  'verdict.critical.share': 'Дуже багато синього. Увечері увімкніть нічний режим або змініть джерело світла.',
  'verdict.critical.brightness': 'Сцена дуже яскрава. Не вимірюйте, дивлячись просто в джерело світла.',
  'verdict.critical.kelvin': 'Світло холодне. Увечері воно найбільше втомлює очі — тепліша лампа або нічний режим допоможуть.',
  'verdict.critical.melanopic': 'Це світло сильно діє на біологічний годинник. Увечері варто спуститися нижче 0,50.',
  'verdict.critical.flicker': 'Джерело світла сильно пульсує. Це буває причиною втоми очей і головного болю.',
  'verdict.critical.uniformity': 'Світло розподіляється дуже нерівномірно. Перевірте розташування лампи або відблиски на екрані.',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'Зоровий комфорт низький. Загляньте в розклад оцінки, щоб побачити, що її знижує.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'Чого це число не каже',
  'note.warningTitle': 'Увага',
  'note.dashTitle': 'Чим це вимірювання не є',
  'note.dashText': 'Камера телефона має три широкі колірні канали й автоматичний баланс білого — вона не вимірює спектра. Колірна температура і циркадний вплив — це наближення, обчислені з кольорів sRGB. Застосунок добре показує різниці та зміни в часі, не замінює вимірювального приладу і не ставить жодного діагнозу.',
  'note.approxLegend': '≈ наближене значення — обчислене з кольорів sRGB, а не з вимірювання спектра.',
  'note.kelvinOutOfRange': 'Поза межами методу — за такого кольору формула колірної температури перестає бути надійною.',
  /* {rate} i {limit} podaje wywołanie, bo to liczby z silnika (5 Hz, 2,5 Hz),
     a ich zapis jest różny w różnych językach: 2.5 po angielsku, 2,5 po ukraińsku.
     Zapisu liczby nie wolno wpisywać do zdania na sztywno. */
  'note.flickerOutOfRange': 'Поза межами методу — дискретизація {rate} Hz бачить пульсування лише нижче {limit} Hz. Мережеві 100 Hz недосяжні, і застосунок ніколи не подасть їх як результат.',
  'note.helpTitle': 'Чого це число не каже',
  'note.helpText': 'Камера телефона має три широкі канали і не вимірює спектра. Це значення є порівняльним показником — воно добре показує різниці між джерелами світла і зміни в часі, а не є результатом лабораторного вимірювання чи медичною інформацією.',
  'note.calibration': 'Вимірювання без калібрування — сприймайте значення порівняльно.',

  'note.howToTitle': 'Як вимірювати розумно',
  'note.howTo.hold.title': 'Тримайте телефон нерухомо',
  'note.howTo.hold.text': 'Автоматиці експозиції потрібно 2–3 секунди, щоб стабілізуватися.',
  'note.howTo.aim.title': 'Спрямуйте на освітлену поверхню',
  'note.howTo.aim.text': 'Білий аркуш паперу або світла стіна. Не вимірюйте, дивлячись просто в джерело світла.',
  'note.howTo.compare.title': 'Порівнюйте, а не оцінюйте абсолютно',
  'note.howTo.compare.text': 'Та сама сцена до і після зміни освітлення каже більше, ніж одне число.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Skracanie go w tłumaczeniu nie jest kwestią stylu. */

  'legal.noDiagnosis': 'Жоден результат не є діагнозом чи порадою щодо здоров’я.',
  'legal.mdr': '{app} не є медичним виробом у розумінні Регламенту (ЄС) 2017/745, не призначений для діагностування, запобігання, моніторингу чи лікування будь-якого захворювання і не замінює огляду в лікаря чи оптометриста.',

  /* ---- prywatność ---- */

  'privacy.title': 'Що покидає цей пристрій',
  'privacy.short': 'Ніщо в цьому застосунку не надсилає нічого в мережу. Усі числа виникають на цьому пристрої і тут залишаються.',
  'privacy.onDevice': 'Камера увімкнеться лише після натискання кнопки, а зображення ніколи не покидає цей пристрій.',
  'privacy.external': 'Це єдине місце в усьому застосунку, де будь-що покидає цей пристрій: кнопка відкриває зовнішню сторінку в новій вкладці, і стається це лише після її натискання. Вимірювання, історія і налаштування залишаються тут.',
  'privacy.externalPending': 'Коли адреса з’явиться, кнопка відкриватиме зовнішню сторінку в новій вкладці. Це буде єдиний момент, коли будь-що покидає цей пристрій. Вимірювання, історія і налаштування залишаються тут.',
  'privacy.storageBlocked': 'Цей браузер не дозволяє нічого зберегти (приватний режим або заблоковані дані сайтів). Вимірювання працює, але історія зникне після закриття вкладки.',

  /* ---- liczebniki ----
     Ukraiński ma cztery kategorie CLDR: one (1, 21, 31…), few (2–4, 22–24…),
     many (0, 5–20, 11–14…) i other — ta ostatnia dotyczy ułamków:
     «1,5 відліку». Formę wybiera Intl.PluralRules('uk'), nie nasza reguła. */

  'count.readings': { one: '{n} відлік', few: '{n} відліки', many: '{n} відліків', other: '{n} відліку' },
  'count.sessions': { one: '{n} вимір', few: '{n} виміри', many: '{n} вимірів', other: '{n} виміру' },
  'count.seconds': { one: '{n} секунда', few: '{n} секунди', many: '{n} секунд', other: '{n} секунди' },
  'count.minutes': { one: '{n} хвилина', few: '{n} хвилини', many: '{n} хвилин', other: '{n} хвилини' },
  'count.hours': { one: '{n} година', few: '{n} години', many: '{n} годин', other: '{n} години' },
  'count.days': { one: '{n} день', few: '{n} дні', many: '{n} днів', other: '{n} дня' }
});
