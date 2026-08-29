/* Monitor Światła v5 — słownik ukraiński.
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr), ale NIE JEST
 * kalką żadnego z nich — a już na pewno nie kalką rosyjskiego. Terminologia
 * i ortografia są ukraińskie: колірна температура (nie „кольорова”),
 * мерехтіння, меланопічний коефіцієнт, застосунок (nie „додаток”), apostrof
 * pisany jako ’ (пам’ять, з’явиться).
 *
 * Zachowane zostało to, co niesie znaczenie: liczby, progi, jednostki, nazwy
 * wstawek i — co do treści — zastrzeżenia medyczne oraz zdania o prywatności.
 * Tych ostatnich nie wolno osłabiać ani wzmacniać: „nie zastępuje rozmowy
 * z lekarzem” ma po ukraińsku znaczyć dokładnie tyle samo, a „obraz nie
 * opuszcza urządzenia” nie może stać się obietnicą szerszą niż polska.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w tekstach pomocy):
 *   частка синього, яскравість сцени, колірна температура, вплив на добовий
 *   ритм (w opisie: меланопічний коефіцієнт), мерехтіння, рівномірність,
 *   зоровий комфорт.
 * Angielskie „metric” to zawsze показник, „sesja pomiarowa” to сеанс,
 * „próbka” to відлік, a „pomiar” jako rzecz zapisana w historii to вимір.
 * STREFY: безпечно / помірно / шкідливо — mówią o świetle, a nie o stanie
 * aplikacji, i wchodzą w zdanie „зона: {zone}”.
 *
 * SPACJE NIEROZDZIELAJĄCE zapisujemy jako \u00A0, a znak minus jako \u2212 —
 * tak samo jak w pl.js i en.js, bo w źródle nie da się ich odróżnić od zwykłej
 * spacji i od dywizu.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Текст зі вставкою {name}'   — napis zwykły,
 *   'klucz.kropkowany': { one, few, many, other }    — forma zależna od liczby.
 * Ukraiński ma w CLDR cztery kategorie: one, few, many, other. `other` NIE jest
 * tu kopią `many`: dostają ją ułamki, a te po ukraińsku biorą dopełniacz liczby
 * pojedynczej („2,5 бала”). Nazwy wstawek są identyczne jak w pl.js — pilnuje
 * tego keys.test.js; kolejność wstawek w zdaniu wolno zmieniać, nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Монітор світла',
  'app.description': 'Монітор світла — камера вимірює сім показників світла навколо вас. Усе обчислюється на цьому пристрої, нічого не йде в мережу.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Монітор світла',
  'app.skipToContent': 'Перейти до вмісту',
  'app.nav.aria': 'Головна навігація',
  'app.noscript.title': 'Цьому застосунку потрібен JavaScript',
  'app.noscript.text': 'Усе вимірювання відбувається в цій вкладці браузера: саме JavaScript зчитує кадри з камери й обчислює з них сім показників світла. Без нього немає чим вимірювати. Увімкніть JavaScript для цієї сторінки й відкрийте її знову — у мережу так само нічого не піде.',

  'nav.measure': 'Вимір',
  'nav.history': 'Історія',
  'nav.tools': 'Інструменти',
  'nav.support': 'Підтримка',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Вимір триває',
  'shell.live.aria': 'Вимір триває. {metric}: {value}. Повернутися до екрана вимірювання.',
  'shell.live.metricFallback': 'Головний показник',
  'shell.action.fallback': 'Дія екрана',

  'shell.loadFail.title': 'Не вдалося завантажити екран «{screen}»',
  'shell.loadFail.text': 'Найімовірніше, у пам’яті пристрою бракує частини файлів. Під’єднайтеся до мережі та оновіть сторінку.',
  'shell.fatal.title': 'Щось пішло не так',
  'shell.fatal.text': 'Застосунку не вдалося скласти екран. Зазвичай досить оновити сторінку — збережені виміри та налаштування залишаються на місці.',
  'shell.fatal.reload': 'Оновити сторінку',
  'shell.boot.failTitle': 'Не вдалося запустити застосунок',
  'shell.boot.failText': 'Оболонка не стартувала. Оновіть сторінку — збережені виміри та налаштування залишаються на місці.',
  'shell.background.error': 'Щось зламалося у фоні',
  'shell.background.action': 'Оновити',
  'shell.update.title': 'Доступна нова версія',
  'shell.update.action': 'Оновити',

  'onboarding.title': 'Перш ніж почати',
  'onboarding.lead': 'Монітор світла дивиться камерою на світло навколо вас і обчислює з нього сім показників — від частки синього до зорового комфорту.',
  'onboarding.privacy': 'Зображення не залишає цього пристрою: немає ні сервера, ні облікового запису, ні надсилання. Усі сім показників працюють одразу, без входу та без оплати.',
  'onboarding.honesty': 'Це орієнтир, а не вимірювальний прилад і не медичне обстеження. Чого виміряти не вдається, того не показуємо — замість числа побачите риску.',
  'onboarding.start': 'Починаймо',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Виконати',
  'overlay.toast.close': 'Закрити повідомлення',
  'overlay.sheet.label': 'Вікно',
  'overlay.sheet.close': 'Закрити',
  'overlay.dialog.confirm': 'Підтвердити',
  'overlay.dialog.cancel': 'Скасувати',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'Скасувати',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'Вимір',

  'measure.intro.aria': 'Почати вимірювання',
  'measure.intro.headline': 'Подивіться, чим ви освітлені',
  'measure.intro.lead': 'Камера показує, скільки синього в світлі, яке зараз на вас падає, — і чи не забагато його о цій порі доби.',
  'measure.intro.start': 'Почати вимірювання',
  'measure.intro.hint': 'Браузер попросить дозвіл на камеру. Вимірювання почнеться одразу, щойно ви його надасте.',
  'measure.intro.privacy': 'Зображення з камери обробляється на цьому пристрої й ніколи його не залишає. Ми не надсилаємо, не зберігаємо і не передаємо жодного кадру.',

  'measure.live.aria': 'Триває вимірювання',
  'measure.badge.starting': 'Запускаю',
  'measure.badge.paused': 'Призупинено',
  'measure.badge.running': 'Вимір триває',
  'measure.stale': 'Чекаю на зображення — перегляд завмирає, коли застосунок у фоні.',
  'measure.crop': 'Вимірюємо центр кадру — позначені {percent}% ширини й висоти зображення.',
  'measure.facing.front': 'фронтальна камера',
  'measure.facing.back': 'основна камера',

  'measure.boot.title': 'Запускаю камеру…',
  'measure.boot.text': 'Якщо браузер питає про дозвіл, надайте його — без зображення немає чого вимірювати. Дозвіл стосується лише цієї сторінки, і згодом ви можете його відкликати.',
  'measure.boot.cancel': 'Скасувати',

  'measure.hold': 'Показання заморожені. Камера працює далі, але нічого не потрапляє ні в історію, ні в середні значення.',
  'measure.gridHint': 'Виберіть плитку, щоб перенести цей показник на великий індикатор.',

  'measure.stop': 'Зупинити',
  'measure.pause': 'Призупинити',
  'measure.resume': 'Продовжити',
  'measure.flip.aria': 'Перемкнути камеру',
  'measure.flip.toBack': 'Перемкнути на основну камеру',
  'measure.flip.toFront': 'Перемкнути на фронтальну камеру',

  'measure.fail.aria': 'Помилка камери',
  'measure.fail.headline': 'Камера не запустилася',
  'measure.fail.retry': 'Спробувати ще раз',
  'measure.fail.back': 'Назад',
  'measure.fail.savedSession': 'Сеанс до перерви ({duration}) збережено в історії.',
  'measure.error.fallback': 'Не вдалося запустити камеру.',

  'measure.summary.aria': 'Підсумок сеансу',
  'measure.summary.title': 'Підсумок сеансу',
  'measure.summary.paused': 'призупинено на {duration}',
  'measure.summary.nothingMeasured': 'Жоден показник не зібрав виміру — камера не бачила світла протягом усього сеансу.',
  'measure.summary.note': 'Середні значення враховують лише відліки поза призупиненням. Показники, яких не виміряно, пропущено, а не пораховано як нуль.',
  'measure.summary.nearThreshold': 'Найближче до порога',
  'measure.summary.worstPoint': 'Найслабше місце',
  'measure.summary.averageZone': 'у середньому {zone}',
  'measure.summary.tooShort': 'Сеанс тривав {duration} — надто коротко, щоб самому потрапити в історію. Ви можете зберегти його вручну.',
  'measure.summary.again': 'Виміряти ще раз',
  'measure.summary.save': 'Зберегти в історії',
  'measure.summary.saved': 'Збережено в історії',
  'measure.summary.savedToast': 'Сеанс збережено в історії.',
  'measure.summary.close': 'Закрити',

  'measure.method.title': 'Як ми це вимірюємо',
  'measure.method.p1': 'Застосунок бере зображення з камери десять разів на секунду й обчислює показники із середніх {percent}% кадру — рамка в перегляді позначає саме цю ділянку.',
  'measure.method.p2': 'Камера телефона має три широкі канали та власне автоматичне коригування експозиції й балансу білого. Вона бачить пропорції світла, а не його спектр.',
  'measure.method.p3': 'Частка синього, яскравість, мерехтіння та рівномірність — це те, що камера справді вимірює. Колірна температура і вплив на добовий ритм — відверті наближення, обчислені з основних кольорів sRGB.',
  'measure.method.p4': 'Мерехтіння видно лише нижче чотирьох герців. Мережеві 100 Hz лежать далеко за межами частоти вибірки й ніколи не будуть подані як показання.',
  'measure.method.p5': 'Жодне з цих чисел не є фотометричним вимірюванням чи медичним результатом. Зображення з камери не залишає пристрою.',
  'measure.method.ok': 'Зрозуміло',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'Запуск камери перервано.',
  'measure.announce.stoppedNoSamples': 'Вимірювання зупинено. Жодного відліку не зібрано.',
  'measure.announce.stopped': 'Вимірювання зупинено. Підсумок сеансу готовий.',
  'measure.announce.interrupted': 'Вимірювання перервано. Підсумок сеансу готовий.',
  'measure.announce.paused': 'Вимірювання призупинено. Показання заморожені.',
  'measure.announce.resumed': 'Вимірювання продовжено.',
  'measure.announce.switchedFront': 'Перемкнено на фронтальну камеру. Починається новий сеанс.',
  'measure.announce.switchedBack': 'Перемкнено на основну камеру. Починається новий сеанс.',
  'measure.announce.lead': 'Головний показник: {metric}.',
  'measure.announce.cameraError': 'Помилка камери. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'Світло трималося безпечного діапазону протягом усього сеансу — залиште лампу як є і перевірте ще раз після смеркання, коли працює інше джерело.',
  'measure.advice.share.evening': 'Частка синього становила в середньому {value} — увімкніть на екранах нічний режим і згасіть верхнє світло, залишивши одну теплу лампу на висоті столу.',
  'measure.advice.share.day': 'Частка синього становила в середньому {value} — удень це прийнятно, але налаштуйте автоматичний перехід екрана в теплий режим за дві години до сну.',
  'measure.advice.brightness': 'Кадр був пересвітлений (у середньому {value}) — відійдіть від джерела світла або зменште яскравість екрана, який вимірюєте, бо за такої експозиції решта показників теж втрачає точність.',
  'measure.advice.kelvin.evening': 'Колір світла тримався в середньому на {value} — після смеркання спустіться нижче 3000 K: перемкніть лампу в теплий режим або вкрутіть лампочку 2700 K.',
  'measure.advice.kelvin.day': 'Колір світла тримався в середньому на {value} — для дня це добре, бадьорливе біле, але ввечері переставте цю саму лампу на 2700 K.',
  'measure.advice.melanopic.evening': 'Вплив на добовий ритм становив у середньому {value} — за дві години до сну спустіться нижче 0,50 ×, приглушивши головне світло та світячи з висоти столу, а не зі стелі.',
  'measure.advice.melanopic.day': 'Вплив на добовий ритм становив у середньому {value} — о цій порі така доза допомагає, але ввечері замініть це джерело на слабше й тепліше.',
  'measure.advice.flicker': 'Мерехтіння сягало в середньому {value} — зазвичай це димер або низько виставлене підсвічування: підніміть яскравість екрана вище 40% або замініть димер на такий, що працює без ШІМ (PWM).',
  'measure.advice.uniformity': 'Світло падало нерівномірно (у середньому {value}) — поставте лампу збоку від стільниці й додайте друге, слабше джерело з протилежного боку, замість однієї сильної точки.',
  'measure.advice.comfort': 'Зоровий комфорт вийшов у середньому {value} — почніть з однієї зміни: приглушіть головне джерело удвічі, а вже потім беріться за колір світла.',
  'measure.advice.default': 'Змініть одну річ в освітленні й виміряйте його ще раз — порівняння двох сеансів каже більше, ніж окреме показання.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'Історія',
  'history.action.export': 'Експортувати історію',

  'history.metricGroup.aria': 'Вибір показника',
  'history.announce.metric': 'Показник: {metric}',
  'history.rangeGroup.aria': 'Часовий проміжок',
  /* Ukraiński liczebnik nie zniósłby dosłownego „Ostatnie 1 min”: przy jedynce
     zmienia się i przymiotnik, i rodzaj. Etykieta mówi więc o przedziale. */
  'history.range.aria': 'Проміжок: {range}',

  'history.stats.title': 'Статистика проміжку',
  'history.stats.head': '{metric}\u00A0—\u00A0за {range}',
  'history.stats.note': 'Пораховано з того, що видно на графіку. Час без вимірювання не враховуємо — не підставляємо замість нього нуль.',
  'history.stat.min': 'Мінімум',
  'history.stat.avg': 'Середнє',
  'history.stat.max': 'Максимум',
  'history.trend.up': 'зростає в цьому проміжку',
  'history.trend.flat': 'без помітної зміни',
  'history.trend.down': 'спадає в цьому проміжку',
  'history.trend.none': 'немає з чим порівняти',

  'history.sessions.title': 'Сеанси вимірювання',
  'history.sessions.count': '{sessions}, від найновішого',
  'history.sessions.empty': 'Ще жодного сеансу',
  'history.sessions.hint': 'Сеанс зберігається після зупинки вимірювання.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'діапазон: {range}',
  'history.session.noMeasure': 'вимірів немає',

  'history.data.title': 'Дані',
  'history.data.subtitle': 'Історія зберігається лише на цьому пристрої.',
  'history.export.csv': 'Експорт CSV',
  'history.export.json': 'Експорт JSON',
  'history.export.ok': 'Файл готовий до збереження',
  'history.export.fail': 'Не вдалося підготувати файл. У приватному режимі та у вікні, вбудованому в інший застосунок, браузер блокує збереження — відкрийте сторінку у звичайній вкладці.',
  'history.export.sheet.title': 'Експорт історії',
  'history.export.sheet.text': 'CSV відкривається в електронній таблиці (роздільник — крапка з комою, десяткова кома). JSON зберігає все, включно зі списком сеансів і пропусками у вимірюванні.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Очистити історію',
  'history.clear.title': 'Очистити історію?',
  'history.clear.text': 'Видалимо {points} і {sessions}. Це не можна скасувати — якщо хочете зберегти дані, спершу експортуйте їх.',
  'history.clear.confirm': 'Очистити',
  'history.clear.announce': 'Історію очищено.',
  'history.clear.toast': 'Історію очищено',

  'history.empty.title': 'Показувати ще нема чого',
  'history.empty.text': 'Історія наповнюється під час вимірювання — одна точка на секунду. Усе залишається на цьому пристрої.',
  'history.empty.action': 'Перейти до вимірювання',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 хв',
  'range.5m': '5 хв',
  'range.1h': '1 год',
  'range.24h': '24 год',
  'range.7d': '7 днів',
  'range.30d': '30 днів',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Дата й час',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'Пам’ять пристрою заповнена — нові виміри більше не зберігаються.',
  'storage.blocked': 'Браузер не дозволяє зберегти історію — дані зникнуть після закриття вкладки.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Інструменти',
  'tools.action.about': 'Про вимірювання',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Мова',
  'tools.language.subtitle': 'Типово застосунок іде за мовою пристрою; вибір із цього списку діє одразу й залишається в цьому браузері.',
  'tools.language.aria': 'Мова інтерфейсу',
  'tools.language.system': 'Авто',
  'tools.language.announce': 'Мова інтерфейсу: {language}.',

  'tools.appearance.title': 'Вигляд',
  'tools.appearance.theme.title': 'Тема',
  'tools.appearance.theme.desc': '«Авто» іде за налаштуванням системи.',
  'tools.appearance.theme.aria': 'Тема',
  'tools.theme.system': 'Авто',
  'tools.theme.light': 'Світла',
  'tools.theme.dark': 'Темна',
  'tools.appearance.accent.title': 'Колір акценту',
  'tools.appearance.accent.desc': 'Колір кнопок, позначень і повзунків.',
  'tools.appearance.accent.aria': 'Колір акценту',
  'tools.appearance.textScale.title': 'Розмір тексту',
  'tools.appearance.textScale.desc': 'Збільшує весь інтерфейс, а не лише підписи.',
  'tools.appearance.textScale.aria': 'Розмір тексту',
  'tools.appearance.density.title': 'Щільність',
  'tools.appearance.density.desc': 'Щільна вміщає більше вмісту на одному екрані.',
  'tools.appearance.density.aria': 'Щільність макета',
  'tools.density.comfortable': 'Звичайна',
  'tools.density.compact': 'Щільна',
  'tools.appearance.motion.title': 'Менше руху',
  'tools.appearance.motion.desc': 'Вимикає анімації та плавний хід стрілки. Незалежно від цього ми зважаємо на системне налаштування.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Океан',
  'accent.violet': 'Фіолет',
  'accent.amber': 'Бурштин',
  'accent.mint': 'М’ята',
  'accent.rose': 'Троянда',

  'tools.thresholds.title': 'Пороги',
  'tools.thresholds.subtitle': 'Від якого значення застосунок має казати «помірно», а від якого — «шкідливо». Типові пороги — це наша пропозиція, а не норма: налаштуйте їх під себе.',
  'tools.thresholds.warn': 'Поріг попередження',
  'tools.thresholds.crit': 'Поріг тривоги',
  'tools.thresholds.warn.aria': 'Поріг попередження — {metric}',
  'tools.thresholds.crit.aria': 'Поріг тривоги — {metric}',
  'tools.thresholds.reset': 'Типові',
  'tools.thresholds.reset.aria': 'Відновити типові пороги: {metric}',
  'tools.thresholds.moved': '{threshold} пересунуто на {value}.',
  'tools.thresholds.resetAll': 'Відновити всі пороги',
  'tools.thresholds.resetAll.title': 'Відновити типові пороги?',
  'tools.thresholds.resetAll.text': 'Усі сім показників повернуться до порогів, запропонованих у застосунку. Історія вимірювань залишиться недоторканою.',
  'tools.thresholds.resetAll.confirm': 'Відновити',
  'tools.thresholds.resetAll.cancel': 'Залишити',
  'tools.thresholds.resetAll.toast': 'Пороги повернулися до типових',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'вище {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} і менше',
  'tools.zoneRange.goodBelow': 'нижче {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} і більше',

  'tools.calibration.title': 'Калібрування',
  'tools.calibration.subtitle': 'Для тих, хто має з чим порівняти.',
  'tools.calibration.intro': 'Два телефони, наведені на ту саму лампу, покажуть трохи різні числа — кожен сенсор має власний відтінок. Якщо під рукою є вимір, якому ви довіряєте, тут можна обережно підняти або приглушити окремі канали зображення. Множники діють ще до того, як ми щось обчислимо, тож змінюють усі сім показників одразу.',
  'tools.calibration.neutral': 'Немає з чим порівняти? Залиште 1,00 — це заводське значення, і воно нічого не псує.',
  'tools.calibration.forward': 'Зміна діє відтепер. Виміри, збережені в історії раніше, залишаються такими, якими були на момент запису — ми не перераховуємо їх заднім числом, бо це підмінювало б дані після факту.',
  'tools.calibration.reset': 'Скинути калібрування',
  'tools.calibration.reset.toast': 'Калібрування скинуто',
  'tools.calibration.channel.r': 'Червоний канал',
  'tools.calibration.channel.g': 'Зелений канал',
  'tools.calibration.channel.b': 'Синій канал',
  'tools.calibration.channel.aria': '{channel} — множник калібрування',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'Вимірювання',
  'tools.measurement.wake.title': 'Не гасити екран',
  'tools.measurement.wake.desc': 'Під час вимірювання екран залишається увімкненим. Батарея тоді сідає швидше.',
  'tools.measurement.wake.unsupported': 'Цей браузер не дозволяє зупинити згасання екрана.',
  'tools.measurement.haptics.title': 'Вібрація',
  'tools.measurement.haptics.desc': 'Коротке підтвердження на старті, на зупинці та при зміні показника.',
  'tools.measurement.haptics.unsupported': 'Цей пристрій не повідомляє про вібромотор.',

  'tools.about.title': 'Про вимірювання',
  'tools.about.subtitle': 'Що саме обчислює кожен із семи показників і де закінчується сумлінність цього методу.',
  'tools.about.scale': 'Шкала: від {min} до {max}.',
  'tools.about.threshold': 'Попереджаємо від {warn}, оголошуємо тривогу від {crit}.',
  'tools.about.thresholdInvert': 'Попереджаємо нижче {warn}, оголошуємо тривогу нижче {crit}.',
  'tools.about.limitsHead': 'Чого це вимірювання не вміє',
  'tools.about.limit.spectrum.title': 'Камера не бачить кольору так, як вимірювальний прилад',
  'tools.about.limit.spectrum.text': 'Камера в телефоні має три канали: червоний, зелений і синій. Прилад для вимірювання світла розкладає їх на десятки вузьких смуг. Те, що ви тут бачите, виведено з цих трьох чисел — розумним способом, але це все одно обчислення, а не виміряний спектр.',
  'tools.about.limit.exposure.title': 'Камера сама регулює собі яскравість',
  'tools.about.limit.exposure.text': 'Наведіть телефон на вікно — і камера притемнить зображення, щоб його не пересвітити. «Яскравість сцени» тоді падає, хоча в кімнаті нічого не змінилося. Тому порівнюйте це значення в межах одного кадру, а не між приміщеннями.',
  'tools.about.limit.flicker.title': 'Швидкого мерехтіння повільна камера не впіймає',
  'tools.about.limit.flicker.text': 'Ми перевіряємо зображення {hz} разів на секунду. Пульсація, швидша за {nyquist} разів на секунду, у такому вимірюванні може показатися повільнішою, ніж вона є насправді, або зникнути зовсім — а мерехтіння з електромережі саме таке. Якщо застосунок щось вловить, сприймайте це як сигнал «тут щось пульсує», а не як виміряну частоту.',
  'tools.about.limit.medical.title': 'Це не обстеження і не лікарська порада',
  'tools.about.limit.medical.text': 'Застосунок допомагає помітити, що світло навколо холодне, яскраве чи неспокійне, і підказує, що з цим можна зробити. Він не робить висновків про здоров’я і не замінює ні розмови з лікарем, ні вимірювання професійним приладом.',
  'tools.about.privacy': 'Усе обчислюється на вашому пристрої. Зображення з камери нікуди не надсилається і ніде не зберігається — у пам’ять потрапляють лише обчислені числа.',

  'tools.data.title': 'Дані',
  'tools.data.subtitle': 'Усе лежить у пам’яті цього браузера й нікуди звідси не виходить.',
  'tools.data.summary.empty': 'Збережених вимірів поки що немає.',
  'tools.data.summary': 'У пам’яті: {points} і {sessions}.',
  'tools.data.export.csv': 'Експорт CSV',
  'tools.data.export.json': 'Експорт JSON',
  'tools.data.clear': 'Очистити історію',
  'tools.data.reset': 'Типові налаштування',
  'tools.data.reset.title': 'Відновити типові налаштування?',
  'tools.data.reset.text': 'Вигляд, пороги, калібрування та налаштування вимірювання повернуться до початкового стану. Історія вимірювань залишиться недоторканою.',
  'tools.data.reset.confirm': 'Відновити',
  'tools.data.reset.toast': 'Типові налаштування відновлено',
  'tools.data.wipe': 'Видалити всі дані',
  'tools.data.wipe.title': 'Видалити всі дані застосунку?',
  'tools.data.wipe.text': 'Зникнуть: уся історія вимірювань і список сеансів, ваші пороги та калібрування, а також налаштування вигляду. Застосунок повернеться до стану після першого запуску.',
  'tools.data.wipe.note': 'Ми не маємо копії цих даних — вони ніколи не залишали цього пристрою, тож немає звідки їх відновити.',
  'tools.data.wipe.check': 'Розумію, що це не можна скасувати',
  'tools.data.wipe.confirm': 'Видалити все',
  'tools.data.wipe.toast': 'Усі дані застосунку видалено',
  'tools.data.wipe.announce': 'Усі дані застосунку видалено. Налаштування повернулися до типових.',
  'tools.data.storage.blocked': 'Цей браузер не дозволяє нічого зберігати назавжди (приватний режим або заблоковані дані сайтів). Усе, що ви тут налаштуєте, зникне після закриття вкладки.',
  'tools.data.storage.full': 'Пам’ять браузера заповнилася, і нові виміри більше не зберігаються. Очищення історії звільнить місце.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Підтримка',
  'support.free.title': 'Доступне все',
  'support.free.lead': 'Усі сім показників, повна історія, пороги, калібрування та експорт працюють від першого запуску — без облікового запису, без обмежень і без оплати.',
  'support.free.note': 'Вимірювання повністю обчислюється на цьому пристрої й працює без мережі. Тут немає кращої версії, яку ми тримали б за стіною.',
  'support.why.title': 'Чому я про це прошу',
  'support.why.lead': 'Монітор світла постає в позаробочий час, і за ним немає ні реклами, ні спонсора, ні компанії. Підтримка покриває час на виправлення, на нові показники й на утримання того, що вже працює.',
  'support.what.title': 'Що дає пожертва',
  'support.what.lead': 'Нічого. Пожертва нічого не відмикає — жодної додаткової функції, жодного значка біля імені, жодного пріоритету. Усе, що застосунок уміє, ви вже маєте.',
  'support.what.note': 'Залишається тільки те, що я знаю: комусь це знадобилося. Це справді достатня причина.',
  'support.cta.title': 'Якщо хочете допомогти',
  'support.cta.button': 'Пригостіть мене кавою',
  'support.cta.nolink': 'Профіль для пожертв ще не під’єднано. Коли він з’явиться, на цьому місці стане кнопка.',
  'support.cta.privacy': 'Це посилання відкриває зовнішню сторінку Buy Me a Coffee у новій вкладці. Це єдиний момент, коли щось залишає цей пристрій — саме вимірювання завжди залишається тут.',
  'support.cta.privacyFuture': 'Коли адреса з’явиться, кнопка відкриватиме зовнішню сторінку Buy Me a Coffee у новій вкладці. Це буде єдиний момент, коли щось залишає цей пристрій — саме вимірювання завжди залишається тут.',
  'support.cta.note': 'Тут немає ні зворотного відліку, ні нагадувань, ні вікна, яке відкриється саме. Це прохання чекає лише на цій вкладці.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'остання хвилина',
  'gauge.aria': '{metric}: {value}, зона: {zone}',
  'gauge.aria.note': '{metric}: {value}, зона: {zone}, {note}',
  'gauge.aria.initial': '{metric}: немає даних',
  'gauge.value.none': 'немає даних',
  /* Odczyt słowny z jednostką: „27 відсотків”, „1,20 раза”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'наближене значення',
  'gauge.note.offScale': 'поза шкалою',
  'gauge.metric.unknown': 'Невідомий показник',

  'chart.aria.label': 'Графік історії вимірювань',
  'chart.hint': 'Інтерактивний графік. Стрілки вліво та вправо пересувають курсор зчитування, Home і End переходять на початок і кінець проміжку, Escape ховає курсор.',
  'chart.empty.title': 'Немає даних',
  'chart.empty.text': 'Почніть вимірювання — графік з’явиться після перших показань.',
  'chart.few.title': 'Замало даних',
  'chart.few.text': 'Маємо одне показання: {value}. Лінію малюємо від двох.',
  'chart.legend.line': 'вимірювання',
  'chart.legend.gap': 'перерва у вимірюванні',
  'chart.aria.head': 'Графік: {metric}, проміжок {range}',
  'chart.aria.empty': 'У цьому проміжку немає даних.',
  'chart.aria.one': 'Одне показання: {value}.',
  'chart.aria.summary': 'Від {min} до {max}, середнє {avg}, {points}.',
  'chart.aria.gaps': 'У ряді є перерви — тоді ми не вимірювали.',
  'chart.readout.empty': 'У цьому проміжку немає даних.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'Замало даних, щоб намалювати графік.',
  'chart.readout.hint': 'Проведіть по графіку або скористайтеся стрілками, щоб зчитати окремий вимір.',
  'chart.time.now': 'зараз',
  'chart.time.justNow': 'щойно',
  'chart.time.ago': '{duration} тому',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — ukraiński zegar jest dwudziestoczterogodzinny,
     a data ma ten sam szyk co polska: dzień, potem skrót miesiąca. */
  'chart.sample.ago': '\u221230\u00A0хв',
  'chart.sample.clock': '00:00',
  'chart.sample.date': '30\u00A0сер',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'Частка синього',
  'metric.share.short': 'Скільки з побаченого світла припадає на синій канал.',
  'metric.share.help': 'Відокремлює колір від яскравості — саме це значення змінюється, коли ви вмикаєте нічний режим.',
  'metric.brightness.name': 'Яскравість сцени',
  'metric.brightness.short': 'Середня яскравість зображення з камери.',
  'metric.brightness.help': 'Відносне значення, а не люкси — автоматика експозиції камери зсуває його під сподом.',
  'metric.kelvin.name': 'Колірна температура',
  'metric.kelvin.short': 'Тепле світло чи холодне.',
  'metric.kelvin.help': 'Нижче 3000 K світло тепле і ввечері лагідніше. 6500 K — типове біле світло більшості екранів.',
  'metric.melanopic.name': 'Вплив на добовий ритм',
  'metric.melanopic.short': 'Наскільки сильно це світло діє на біологічний годинник.',
  'metric.melanopic.help': 'Наближення меланопічного коефіцієнта. 1,00 — нейтральне денне біле; ввечері варто спускатися нижче 0,50.',
  'metric.flicker.name': 'Мерехтіння',
  'metric.flicker.short': 'Невидиме пульсування джерела світла.',
  'metric.flicker.help': 'Дешеві димери та підсвічування пульсують. Око цього не бачить, але це буває причиною втоми й головного болю.',
  'metric.uniformity.name': 'Рівномірність',
  'metric.uniformity.short': 'Чи рівно світло розкладається в кадрі.',
  'metric.uniformity.help': 'Низьке значення на екрані означає засвітку підсвічування або відблиск; на столі — погано поставлену лампу.',
  'metric.comfort.name': 'Зоровий комфорт',
  'metric.comfort.short': 'Одна оцінка замість шести чисел.',
  'metric.comfort.help': 'Складає решту вимірів у результат від 0 до 100 і показує, що знижує його найдужче. Ваги — це наша редакційна оцінка, а не норма.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'безпечно',
  'zone.warn': 'помірно',
  'zone.crit': 'шкідливо',
  'zone.none': 'немає даних',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 сер'). */
  'date.month.short.1': 'січ',
  'date.month.short.2': 'лют',
  'date.month.short.3': 'бер',
  'date.month.short.4': 'кві',
  'date.month.short.5': 'тра',
  'date.month.short.6': 'чер',
  'date.month.short.7': 'лип',
  'date.month.short.8': 'сер',
  'date.month.short.9': 'вер',
  'date.month.short.10': 'жов',
  'date.month.short.11': 'лис',
  'date.month.short.12': 'гру',

  'date.clock': '{hours}:{minutes}',
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0{year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. Skróty jednostek bez kropki, tak
     jak w ukraińskiej normie: год, хв, с. */
  'time.duration.dayHour': '{days} {hours}\u00A0год',
  'time.duration.hourMinute': '{hours}\u00A0год {minutes}\u00A0хв',
  'time.duration.hour': '{hours}\u00A0год',
  'time.duration.minuteSecond': '{minutes}\u00A0хв {seconds}\u00A0с',
  'time.duration.minute': '{minutes}\u00A0хв',
  'time.duration.second': '{seconds}\u00A0с',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „щойно”. Dni stoją tu jako
     skrót „дн.”, bo ten wzorzec nie przechodzi przez odmianę liczebnika. */
  'time.justNow': 'щойно',
  'time.aMinuteAgo': 'хвилину тому',
  'time.minutesAgo': '{minutes}\u00A0хв тому',
  'time.hoursAgo': '{hours}\u00A0год тому',
  'time.yesterday': 'учора',
  'time.daysAgo': '{days}\u00A0дн. тому',

  /* Formy zależne od liczby. Ukraiński ma w CLDR cztery: `one` (1, 21, 31…),
     `few` (2–4, 22–24…), `many` (5–20, 0…) oraz `other` — tę ostatnią dostają
     ułamki, a te po ukraińsku biorą dopełniacz liczby pojedynczej („2,5 бала”).
     Dlatego `other` NIE jest tu kopią `many`, tak jak w polskim. */
  'time.days.plural': { one: 'день', few: 'дні', many: 'днів', other: 'дня' },
  'unit.sample.plural': { one: 'відлік', few: 'відліки', many: 'відліків', other: 'відліку' },
  'unit.measurement.plural': { one: 'вимір', few: 'виміри', many: 'вимірів', other: 'виміру' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Ukraiński ma w rodzaju męskim nieżywotnym jedną — oba klucze zostają
     (kształt słownika jest wspólny), a wartości są tu identyczne. */
  'unit.session.plural': { one: 'сеанс', few: 'сеанси', many: 'сеансів', other: 'сеансу' },
  'unit.session.accusative.plural': { one: 'сеанс', few: 'сеанси', many: 'сеансів', other: 'сеансу' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to po ukraińsku
     dwa różne słowa: точка na wykresie, бал w ocenie komfortu. */
  'unit.chartPoint.plural': { one: 'точка', few: 'точки', many: 'точок', other: 'точки' },
  'unit.point.plural': { one: 'бал', few: 'бали', many: 'балів', other: 'бала' },
  'unit.kelvin.plural': { one: 'кельвін', few: 'кельвіни', many: 'кельвінів', other: 'кельвіна' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „відсоток”
     tylko czasem, a „×” najczęściej pominie zupełnie. Wzorzec nie zna liczby,
     więc stoi w formie najczęstszej dla zakresu danej wielkości: procenty
     w dopełniaczu mnogim, mnożnik (zawsze ułamkowy) w dopełniaczu pojedynczym. */
  'unit.spoken.percent': 'відсотків',
  'unit.spoken.times': 'раза',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'Немає дозволу на доступ до камери. Дозвольте камеру для цієї сторінки в налаштуваннях браузера й спробуйте ще раз.',
  'camera.error.notfound': 'Камеру не знайдено. Перевірте, чи має пристрій камеру і чи не вимкнена вона в системі.',
  'camera.error.inuse': 'Камеру зайняв інший застосунок. Закрийте той застосунок або вкладку й спробуйте ще раз.',
  'camera.error.insecure': 'Камера працює лише через HTTPS або на localhost. Відкрийте цю сторінку за адресою, що починається з «https://».',
  'camera.error.unsupported': 'Цей браузер не надає тут доступу до камери. Спробуйте Chrome або Safari у звичайному вікні — не в перегляді, вбудованому в інший застосунок.',
  'camera.error.unknown': 'Не вдалося запустити камеру.'
};
