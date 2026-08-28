/* Monitor Światła v5 — słownik rosyjski.
 *
 * Powstał z pl.js (źródło TREŚCI) i z en.js (wzorzec TERMINOLOGII i rejestru).
 * Nie jest kalką żadnego z nich: zdania przełożono na naturalną rosyjszczyznę,
 * a nie słowo w słowo. Zachowane zostało to, co niesie znaczenie: liczby,
 * progi, jednostki, nazwy wstawek i — co do treści — zastrzeżenia medyczne
 * oraz zdania o prywatności. Tych ostatnich nie wolno osłabiać ani wzmacniać:
 * „nie zastępuje rozmowy z lekarzem” ma po rosyjsku znaczyć dokładnie tyle
 * samo, a „obraz nie opuszcza urządzenia” nie może stać się obietnicą szerszą
 * niż polska.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych):
 *   доля синего, яркость сцены, цветовая температура, циркадное влияние
 *   (w opisie: меланопический коэффициент), мерцание, равномерность,
 *   зрительный комфорт.
 * STREFY: безопасно / умеренно / вредно — tak jak w pl.js i en.js są to
 * przysłówki, bo wchodzą w zdanie „зона: {zone}” i „в среднем {zone}”.
 *
 * ZAPIS: cudzysłowy rosyjskie « », przecinek dziesiętny (1,00 / 0,50),
 * spacje nierozdzielające jako \u00A0, minus jako \u2212. Symbole jednostek
 * (%, K, ×, Hz) zostają bez zmian, tak jak w pozostałych słownikach.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Текст со вставкой {name}'          — napis zwykły,
 *   'klucz.kropkowany': { one, few, many, other }           — forma zależna od
 *                                                             liczby.
 * Rosyjski ma w CLDR cztery formy: `one` (1, 21, 31…), `few` (2–4, 22–24…),
 * `many` (0, 5–20, 25–30…) i `other` (ułamki: „2,5 измерения”). Nazwy wstawek
 * są identyczne jak w pl.js — pilnuje tego keys.test.js. Kolejność wstawek
 * w zdaniu wolno zmieniać, nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Монитор света',
  'app.description': 'Монитор света — камерой измеряет семь величин света вокруг вас. Всё считается на этом устройстве, ничего не уходит в сеть.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Монитор света',
  'app.skipToContent': 'Перейти к содержимому',
  'app.nav.aria': 'Главная навигация',
  'app.noscript.title': 'Этому приложению нужен JavaScript',
  'app.noscript.text': 'Всё измерение происходит в этой вкладке браузера: именно JavaScript читает кадры с камеры и считает по ним семь величин света. Без него измерять нечем. Включите JavaScript для этой страницы и откройте её заново — в сеть по-прежнему ничего не уйдёт.',

  'nav.measure': 'Измерение',
  'nav.history': 'История',
  'nav.tools': 'Инструменты',
  'nav.support': 'Поддержка',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Идёт измерение',
  'shell.live.aria': 'Идёт измерение. {metric}: {value}. Вернуться к экрану измерения.',
  'shell.live.metricFallback': 'Главная величина',
  'shell.action.fallback': 'Действие экрана',

  'shell.loadFail.title': 'Не удалось загрузить экран «{screen}»',
  'shell.loadFail.text': 'Скорее всего, части файлов нет в памяти устройства. Подключитесь к сети и обновите страницу.',
  'shell.fatal.title': 'Что-то пошло не так',
  'shell.fatal.text': 'Приложению не удалось собрать экран. Обычно достаточно обновить страницу — сохранённые измерения и настройки остаются на месте.',
  'shell.fatal.reload': 'Обновить страницу',
  'shell.boot.failTitle': 'Не удалось запустить приложение',
  'shell.boot.failText': 'Оболочка не запустилась. Обновите страницу — сохранённые измерения и настройки остаются на месте.',
  'shell.background.error': 'Что-то сломалось в фоне',
  'shell.background.action': 'Обновить',
  'shell.update.title': 'Доступна новая версия',
  'shell.update.action': 'Обновить',

  'onboarding.title': 'Прежде чем начать',
  'onboarding.lead': 'Монитор света смотрит камерой на свет вокруг вас и считает по нему семь величин — от доли синего до зрительного комфорта.',
  'onboarding.privacy': 'Изображение не покидает это устройство: нет сервера, нет учётной записи и нечего отправлять. Все семь величин работают сразу, без входа и без оплаты.',
  'onboarding.honesty': 'Это ориентир, а не измерительный прибор и не медицинское обследование. Чего измерить нельзя, того мы не показываем — вместо числа вы увидите прочерк.',
  'onboarding.start': 'Начнём',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Выполнить',
  'overlay.toast.close': 'Закрыть сообщение',
  'overlay.sheet.label': 'Окно',
  'overlay.sheet.close': 'Закрыть',
  'overlay.dialog.confirm': 'Подтвердить',
  'overlay.dialog.cancel': 'Отмена',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'Отмена',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'Измерение',

  'measure.intro.aria': 'Начать измерение',
  'measure.intro.headline': 'Посмотрите, что вас освещает',
  'measure.intro.lead': 'Камера показывает, сколько синего в свете, который падает на вас прямо сейчас, — и не слишком ли его много для этого времени суток.',
  'measure.intro.start': 'Начать измерение',
  'measure.intro.hint': 'Браузер запросит доступ к камере. Измерение начнётся сразу после согласия.',
  'measure.intro.privacy': 'Изображение с камеры обрабатывается на этом устройстве и никогда его не покидает. Мы не отправляем, не сохраняем и не передаём ни одного кадра.',

  'measure.live.aria': 'Измерение выполняется',
  'measure.badge.starting': 'Запуск',
  'measure.badge.paused': 'Пауза',
  'measure.badge.running': 'Идёт измерение',
  'measure.stale': 'Жду изображение — просмотр замирает, когда приложение в фоне.',
  'measure.crop': 'Мы измеряем центр кадра — выделенные {percent}\u00A0% ширины и высоты изображения.',
  'measure.facing.front': 'фронтальная камера',
  'measure.facing.back': 'основная камера',

  'measure.boot.title': 'Запускаю камеру…',
  'measure.boot.text': 'Если браузер спрашивает разрешение, дайте его — без изображения нечего измерять. Разрешение касается только этой страницы, и позже его можно отозвать.',
  'measure.boot.cancel': 'Отмена',

  'measure.hold': 'Показания заморожены. Камера продолжает работать, но в историю и в средние ничего не попадает.',
  'measure.gridHint': 'Выберите плитку, чтобы вывести эту величину на большой индикатор.',

  'measure.stop': 'Остановить',
  'measure.pause': 'Пауза',
  'measure.resume': 'Продолжить',
  'measure.flip.aria': 'Переключить камеру',
  'measure.flip.toBack': 'Переключить на основную камеру',
  'measure.flip.toFront': 'Переключить на фронтальную камеру',

  'measure.fail.aria': 'Ошибка камеры',
  'measure.fail.headline': 'Камера не запустилась',
  'measure.fail.retry': 'Попробовать снова',
  'measure.fail.back': 'Назад',
  'measure.fail.savedSession': 'Сессия до прерывания ({duration}) сохранена в истории.',
  'measure.error.fallback': 'Не удалось запустить камеру.',

  'measure.summary.aria': 'Итоги сессии',
  'measure.summary.title': 'Итоги сессии',
  'measure.summary.paused': 'на паузе {duration}',
  'measure.summary.nothingMeasured': 'Ни одна величина не набрала измерений — камера не видела света всю сессию.',
  'measure.summary.note': 'В средние идут только отсчёты вне паузы. Величины, которые не удалось измерить, пропущены, а не засчитаны как ноль.',
  'measure.summary.nearThreshold': 'Ближе всего к порогу',
  'measure.summary.worstPoint': 'Самое слабое место',
  'measure.summary.averageZone': 'в среднем {zone}',
  'measure.summary.tooShort': 'Сессия длилась {duration} — слишком мало, чтобы попасть в историю самой. Её можно сохранить вручную.',
  'measure.summary.again': 'Измерить снова',
  'measure.summary.save': 'Сохранить в историю',
  'measure.summary.saved': 'Сохранено в истории',
  'measure.summary.savedToast': 'Сессия сохранена в истории.',
  'measure.summary.close': 'Закрыть',

  'measure.method.title': 'Как мы это измеряем',
  'measure.method.p1': 'Приложение берёт изображение с камеры десять раз в секунду и считает величины по центральным {percent}\u00A0% кадра — рамка в просмотре отмечает ровно эту область.',
  'measure.method.p2': 'У камеры телефона три широких канала и собственная автоматическая коррекция экспозиции и баланса белого. Она видит соотношения света, а не его спектр.',
  'measure.method.p3': 'Доля синего, яркость, мерцание и равномерность — это то, что камера действительно измеряет. Цветовая температура и циркадное влияние — открыто заявленные приближения, посчитанные по первичным цветам sRGB.',
  'measure.method.p4': 'Мерцание видно только ниже четырёх герц. Сетевые 100 Hz лежат далеко за пределами частоты выборки и никогда не будут выданы как показание.',
  'measure.method.p5': 'Ни одно из этих чисел не является фотометрическим измерением или медицинским результатом. Изображение с камеры не покидает устройство.',
  'measure.method.ok': 'Понятно',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'Запуск камеры отменён.',
  'measure.announce.stoppedNoSamples': 'Измерение остановлено. Не собрано ни одного отсчёта.',
  'measure.announce.stopped': 'Измерение остановлено. Итоги сессии готовы.',
  'measure.announce.interrupted': 'Измерение прервано. Итоги сессии готовы.',
  'measure.announce.paused': 'Измерение приостановлено. Показания заморожены.',
  'measure.announce.resumed': 'Измерение возобновлено.',
  'measure.announce.switchedFront': 'Переключено на фронтальную камеру. Начинается новая сессия.',
  'measure.announce.switchedBack': 'Переключено на основную камеру. Начинается новая сессия.',
  'measure.announce.lead': 'Главная величина: {metric}.',
  'measure.announce.cameraError': 'Ошибка камеры. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'Свет держался в безопасном диапазоне всю сессию — оставьте лампу как есть и проверьте ещё раз после наступления темноты, когда работает другой источник.',
  'measure.advice.share.evening': 'Доля синего составила в среднем {value} — включите на экранах ночной режим и погасите верхний свет, оставив одну тёплую лампу на высоте стола.',
  'measure.advice.share.day': 'Доля синего составила в среднем {value} — днём это приемлемо, но настройте автоматический переход экрана в тёплый режим за два часа до сна.',
  'measure.advice.brightness': 'Кадр был пересвечен (в среднем {value}) — отойдите от источника света или убавьте яркость измеряемого экрана: при такой экспозиции остальные величины тоже теряют точность.',
  'measure.advice.kelvin.evening': 'Цветовая температура держалась в среднем на {value} — после наступления темноты опуститесь ниже 3000 K: переключите лампу в тёплый режим или вкрутите лампочку 2700 K.',
  'measure.advice.kelvin.day': 'Цветовая температура держалась в среднем на {value} — для дня это хороший, бодрящий белый, но вечером переведите ту же лампу на 2700 K.',
  'measure.advice.melanopic.evening': 'Циркадное влияние составило в среднем {value} — за два часа до сна опуститесь ниже 0,50 ×, приглушив главный свет и освещая с высоты стола, а не с потолка.',
  'measure.advice.melanopic.day': 'Циркадное влияние составило в среднем {value} — в это время суток такая доза помогает, но вечером замените этот источник на более слабый и тёплый.',
  'measure.advice.flicker': 'Мерцание доходило в среднем до {value} — обычно это диммер или низко выставленная подсветка: поднимите яркость экрана выше 40 % или замените диммер на такой, который не использует ШИМ.',
  'measure.advice.uniformity': 'Свет падал неравномерно (в среднем {value}) — поставьте лампу сбоку от столешницы и добавьте второй, более слабый источник с противоположной стороны вместо одной сильной точки.',
  'measure.advice.comfort': 'Зрительный комфорт вышел в среднем {value} — начните с одного изменения: приглушите главный источник вдвое и только потом займитесь цветом света.',
  'measure.advice.default': 'Измените одну вещь в освещении и измерьте его снова — сравнение двух сессий говорит больше, чем одно показание.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'История',
  'history.action.export': 'Экспортировать историю',

  'history.metricGroup.aria': 'Выбор измеряемой величины',
  'history.announce.metric': 'Величина: {metric}',
  'history.rangeGroup.aria': 'Диапазон времени',
  'history.range.aria': 'Последние {range}',

  'history.stats.title': 'Статистика диапазона',
  'history.stats.head': '{metric}\u00A0—\u00A0последние {range}',
  'history.stats.note': 'Считается по тому, что видно на графике. Время без измерения не учитывается — мы не подставляем вместо него ноль.',
  'history.stat.min': 'Минимум',
  'history.stat.avg': 'Среднее',
  'history.stat.max': 'Максимум',
  'history.trend.up': 'растёт в этом диапазоне',
  'history.trend.flat': 'без заметных изменений',
  'history.trend.down': 'падает в этом диапазоне',
  'history.trend.none': 'не с чем сравнить',

  'history.sessions.title': 'Сессии измерений',
  'history.sessions.count': '{sessions}, начиная с последней',
  'history.sessions.empty': 'Пока ни одной сессии',
  'history.sessions.hint': 'Сессия сохраняется после остановки измерения.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'диапазон: {range}',
  'history.session.noMeasure': 'нет измерений',

  'history.data.title': 'Данные',
  'history.data.subtitle': 'История хранится только на этом устройстве.',
  'history.export.csv': 'Экспорт CSV',
  'history.export.json': 'Экспорт JSON',
  'history.export.ok': 'Файл готов к сохранению',
  'history.export.fail': 'Не удалось подготовить файл. В приватном режиме и в окне, встроенном в другое приложение, браузер блокирует сохранение — откройте страницу в обычной вкладке.',
  'history.export.sheet.title': 'Экспорт истории',
  'history.export.sheet.text': 'CSV открывается в электронной таблице (разделитель — точка с запятой, десятичный знак — запятая). JSON сохраняет всё, включая список сессий и пропуски измерения.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Очистить историю',
  'history.clear.title': 'Очистить историю?',
  'history.clear.text': 'Удалим {points} и {sessions}. Отменить это нельзя — если хотите сохранить данные, сначала экспортируйте их.',
  'history.clear.confirm': 'Очистить',
  'history.clear.announce': 'История очищена.',
  'history.clear.toast': 'История очищена',

  'history.empty.title': 'Показывать пока нечего',
  'history.empty.text': 'История наполняется во время измерения — по точке в секунду. Всё остаётся на этом устройстве.',
  'history.empty.action': 'Перейти к измерению',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 мин',
  'range.5m': '5 мин',
  'range.1h': '1 ч',
  'range.24h': '24 ч',
  'range.7d': '7 дн.',
  'range.30d': '30 дн.',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Дата и время',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'Память устройства заполнена — новые измерения больше не сохраняются.',
  'storage.blocked': 'Браузер не разрешает сохранить историю — данные исчезнут после закрытия вкладки.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Инструменты',
  'tools.action.about': 'Об измерении',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Язык',
  'tools.language.subtitle': 'По умолчанию приложение следует языку устройства; выбор из этого списка действует сразу и остаётся в этом браузере.',
  'tools.language.aria': 'Язык интерфейса',
  'tools.language.system': 'Авто',
  'tools.language.announce': 'Язык интерфейса: {language}.',

  'tools.appearance.title': 'Внешний вид',
  'tools.appearance.theme.title': 'Тема',
  'tools.appearance.theme.desc': '«Авто» следует настройке системы.',
  'tools.appearance.theme.aria': 'Тема',
  'tools.theme.system': 'Авто',
  'tools.theme.light': 'Светлая',
  'tools.theme.dark': 'Тёмная',
  'tools.appearance.accent.title': 'Цвет акцента',
  'tools.appearance.accent.desc': 'Цвет кнопок, выделений и ползунков.',
  'tools.appearance.accent.aria': 'Цвет акцента',
  'tools.appearance.textScale.title': 'Размер текста',
  'tools.appearance.textScale.desc': 'Увеличивает весь интерфейс, а не только подписи.',
  'tools.appearance.textScale.aria': 'Размер текста',
  'tools.appearance.density.title': 'Плотность',
  'tools.appearance.density.desc': 'Плотная вмещает больше содержимого на одном экране.',
  'tools.appearance.density.aria': 'Плотность вёрстки',
  'tools.density.comfortable': 'Обычная',
  'tools.density.compact': 'Плотная',
  'tools.appearance.motion.title': 'Меньше движения',
  'tools.appearance.motion.desc': 'Отключает анимации и плавный ход стрелки. Настройку системы мы уважаем в любом случае.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Океан',
  'accent.violet': 'Фиалка',
  'accent.amber': 'Янтарь',
  'accent.mint': 'Мята',
  'accent.rose': 'Роза',

  'tools.thresholds.title': 'Пороги',
  'tools.thresholds.subtitle': 'С какого значения приложение должно говорить «умеренно», а с какого — «вредно». Пороги по умолчанию — наше предложение, а не норма: настройте их под себя.',
  'tools.thresholds.warn': 'Порог предупреждения',
  'tools.thresholds.crit': 'Порог тревоги',
  'tools.thresholds.warn.aria': 'Порог предупреждения — {metric}',
  'tools.thresholds.crit.aria': 'Порог тревоги — {metric}',
  'tools.thresholds.reset': 'По умолчанию',
  'tools.thresholds.reset.aria': 'Вернуть пороги по умолчанию: {metric}',
  'tools.thresholds.moved': '{threshold} сдвинут на {value}.',
  'tools.thresholds.resetAll': 'Вернуть все пороги',
  'tools.thresholds.resetAll.title': 'Вернуть пороги по умолчанию?',
  'tools.thresholds.resetAll.text': 'Все семь величин вернутся к порогам, предложенным в приложении. История измерений останется нетронутой.',
  'tools.thresholds.resetAll.confirm': 'Вернуть',
  'tools.thresholds.resetAll.cancel': 'Оставить',
  'tools.thresholds.resetAll.toast': 'Пороги вернулись к значениям по умолчанию',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'выше {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} и ниже',
  'tools.zoneRange.goodBelow': 'ниже {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} и выше',

  'tools.calibration.title': 'Калибровка',
  'tools.calibration.subtitle': 'Для тех, у кого есть с чем сравнить.',
  'tools.calibration.intro': 'Два телефона, направленные на одну лампу, покажут немного разные числа — у каждого датчика свой оттенок. Если под рукой есть показание, которому вы доверяете, здесь можно слегка усилить или приглушить отдельные каналы изображения. Множители действуют до того, как мы что-либо посчитаем, поэтому меняют сразу все семь величин.',
  'tools.calibration.neutral': 'Не с чем сравнить? Оставьте 1,00 — это заводская настройка, и она ничего не портит.',
  'tools.calibration.forward': 'Изменение действует с этого момента. Измерения, уже сохранённые в истории, остаются такими, какими были в момент записи, — мы не пересчитываем их задним числом, потому что это подменяло бы данные после факта.',
  'tools.calibration.reset': 'Сбросить калибровку',
  'tools.calibration.reset.toast': 'Калибровка сброшена',
  'tools.calibration.channel.r': 'Красный канал',
  'tools.calibration.channel.g': 'Зелёный канал',
  'tools.calibration.channel.b': 'Синий канал',
  'tools.calibration.channel.aria': '{channel} — множитель калибровки',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'Измерение',
  'tools.measurement.wake.title': 'Не гасить экран',
  'tools.measurement.wake.desc': 'Во время измерения экран остаётся включённым. Батарея при этом садится быстрее.',
  'tools.measurement.wake.unsupported': 'Этот браузер не позволяет запретить гашение экрана.',
  'tools.measurement.haptics.title': 'Вибрация',
  'tools.measurement.haptics.desc': 'Короткое подтверждение при старте, остановке и смене величины.',
  'tools.measurement.haptics.unsupported': 'Это устройство не сообщает о вибромоторе.',

  'tools.about.title': 'Об измерении',
  'tools.about.subtitle': 'Что именно считает каждая из семи величин и где заканчивается достоверность этого метода.',
  'tools.about.scale': 'Шкала: от {min} до {max}.',
  'tools.about.threshold': 'Предупреждение — от {warn}, тревога — от {crit}.',
  'tools.about.thresholdInvert': 'Предупреждение — ниже {warn}, тревога — ниже {crit}.',
  'tools.about.limitsHead': 'Чего это измерение не умеет',
  'tools.about.limit.spectrum.title': 'Камера не видит цвета так, как измерительный прибор',
  'tools.about.limit.spectrum.text': 'У камеры в телефоне три канала: красный, зелёный и синий. Прибор для измерения света раскладывает свет на десятки узких полос. То, что вы видите здесь, вычислено из этих трёх чисел — разумным способом, но это всё-таки вычисление, а не измеренный спектр.',
  'tools.about.limit.exposure.title': 'Камера сама регулирует яркость',
  'tools.about.limit.exposure.text': 'Когда вы направите телефон на окно, камера притемнит изображение, чтобы не пересветить его. «Яркость сцены» тогда падает, хотя в комнате ничего не изменилось. Поэтому сравнивайте это значение в пределах одного кадра, а не между помещениями.',
  'tools.about.limit.flicker.title': 'Быстрое мерцание медленная камера не поймает',
  'tools.about.limit.flicker.text': 'Мы проверяем изображение {hz} раз в секунду. Пульсация быстрее {nyquist} раз в секунду может в таком измерении выглядеть медленнее, чем она есть на самом деле, или пропасть совсем — а мерцание от электросети именно такое. Если приложение что-то поймает, считайте это признаком «здесь что-то пульсирует», а не измеренной частотой.',
  'tools.about.limit.medical.title': 'Это не обследование и не медицинская консультация',
  'tools.about.limit.medical.text': 'Приложение помогает заметить, что свет вокруг холодный, яркий или неспокойный, и подсказывает, что с этим можно сделать. Оно не выносит суждений о здоровье и не заменяет разговор с врачом или измерение профессиональным прибором.',
  'tools.about.privacy': 'Всё считается на вашем устройстве. Изображение с камеры никуда не отправляется и не сохраняется — в память попадают только посчитанные числа.',

  'tools.data.title': 'Данные',
  'tools.data.subtitle': 'Всё лежит в памяти этого браузера и никуда отсюда не уходит.',
  'tools.data.summary.empty': 'Сохранённых измерений пока нет.',
  'tools.data.summary': 'В памяти: {points} и {sessions}.',
  'tools.data.export.csv': 'Экспорт CSV',
  'tools.data.export.json': 'Экспорт JSON',
  'tools.data.clear': 'Очистить историю',
  'tools.data.reset': 'Настройки по умолчанию',
  'tools.data.reset.title': 'Вернуть настройки по умолчанию?',
  'tools.data.reset.text': 'Внешний вид, пороги, калибровка и настройки измерения вернутся в исходное состояние. История измерений останется нетронутой.',
  'tools.data.reset.confirm': 'Вернуть',
  'tools.data.reset.toast': 'Настройки по умолчанию возвращены',
  'tools.data.wipe': 'Удалить все данные',
  'tools.data.wipe.title': 'Удалить все данные приложения?',
  'tools.data.wipe.text': 'Исчезнут: вся история измерений и список сессий, ваши пороги и калибровка, а также настройки внешнего вида. Приложение вернётся к состоянию первого запуска.',
  'tools.data.wipe.note': 'У нас нет копии этих данных — они никогда не покидали это устройство, поэтому восстановить их неоткуда.',
  'tools.data.wipe.check': 'Понимаю, что это нельзя отменить',
  'tools.data.wipe.confirm': 'Удалить всё',
  'tools.data.wipe.toast': 'Все данные приложения удалены',
  'tools.data.wipe.announce': 'Все данные приложения удалены. Настройки вернулись к значениям по умолчанию.',
  'tools.data.storage.blocked': 'Этот браузер не позволяет ничего сохранить надолго (приватный режим или заблокированные данные сайтов). Всё, что вы здесь настроите, исчезнет после закрытия вкладки.',
  'tools.data.storage.full': 'Память браузера заполнилась, и новые измерения больше не сохраняются. Очистка истории освободит место.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Поддержка',
  'support.free.title': 'Доступно всё',
  'support.free.lead': 'Все семь величин, полная история, пороги, калибровка и экспорт работают с первого запуска — без учётной записи, без ограничений и без оплаты.',
  'support.free.note': 'Измерение целиком считается на этом устройстве и работает без сети. Здесь нет версии получше, которую держали бы за стеной.',
  'support.why.title': 'Почему я об этом прошу',
  'support.why.lead': 'Монитор света делается в свободное время, за ним нет ни рекламы, ни спонсора, ни компании. Поддержка покрывает время на исправления, на новые величины и на сопровождение того, что уже работает.',
  'support.what.title': 'Что даёт пожертвование',
  'support.what.lead': 'Ничего. Пожертвование ничего не открывает — ни дополнительной функции, ни значка рядом с именем, ни приоритета. Всё, что приложение умеет, у вас уже есть.',
  'support.what.note': 'Остаётся только то, что я знаю: кому-то это пригодилось. Этого правда достаточно.',
  'support.cta.title': 'Если хотите помочь',
  'support.cta.button': 'Угостить кофе',
  'support.cta.nolink': 'Профиль для пожертвований пока не подключён. Когда он появится, на этом месте встанет кнопка.',
  'support.cta.privacy': 'Эта ссылка открывает внешний сайт (например, Buy Me a Coffee) в новой вкладке. Это единственный момент, когда что-либо покидает это устройство — само измерение всегда остаётся здесь.',
  'support.cta.privacyFuture': 'Когда адрес появится, кнопка будет открывать внешний сайт (например, Buy Me a Coffee) в новой вкладке. Это будет единственный момент, когда что-либо покидает это устройство — само измерение всегда остаётся здесь.',
  'support.cta.note': 'Здесь нет ни обратного отсчёта, ни напоминаний, ни окна, которое откроется само. Эта просьба ждёт только на этой вкладке.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'последняя минута',
  'gauge.aria': '{metric}: {value}, зона: {zone}',
  'gauge.aria.note': '{metric}: {value}, зона: {zone}, {note}',
  'gauge.aria.initial': '{metric}: нет данных',
  'gauge.value.none': 'нет данных',
  /* Odczyt słowny z jednostką: „27 процентов”, „1,20 раза”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'приблизительное значение',
  'gauge.note.offScale': 'вне шкалы',
  'gauge.metric.unknown': 'Неизвестная величина',

  'chart.aria.label': 'График истории измерений',
  'chart.hint': 'Интерактивный график. Стрелки влево и вправо двигают курсор считывания, Home и End переходят к началу и концу диапазона, Escape убирает курсор.',
  'chart.empty.title': 'Нет данных',
  'chart.empty.text': 'Запустите измерение — график появится после первых показаний.',
  'chart.few.title': 'Слишком мало данных',
  'chart.few.text': 'У нас одно показание: {value}. Линию рисуем от двух.',
  'chart.legend.line': 'измерение',
  'chart.legend.gap': 'перерыв в измерении',
  'chart.aria.head': 'График: {metric}, диапазон {range}',
  'chart.aria.empty': 'Нет данных в этом диапазоне.',
  'chart.aria.one': 'Одно показание: {value}.',
  'chart.aria.summary': 'От {min} до {max}, среднее {avg}, {points}.',
  'chart.aria.gaps': 'В ряду есть перерывы — тогда мы не измеряли.',
  'chart.readout.empty': 'Нет данных в этом диапазоне.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'Слишком мало данных, чтобы нарисовать график.',
  'chart.readout.hint': 'Проведите по графику или используйте стрелки, чтобы прочитать отдельное измерение.',
  'chart.time.now': 'сейчас',
  'chart.time.justNow': 'только что',
  'chart.time.ago': '{duration} назад',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku. */
  'chart.sample.ago': '\u221230\u00A0мин',
  'chart.sample.clock': '00:00',
  'chart.sample.date': '30\u00A0авг',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'Доля синего',
  'metric.share.short': 'Какая часть видимого света приходится на синий канал.',
  'metric.share.help': 'Отделяет цвет от яркости — именно это значение меняется, когда вы включаете ночной режим.',
  'metric.brightness.name': 'Яркость сцены',
  'metric.brightness.short': 'Средняя яркость изображения с камеры.',
  'metric.brightness.help': 'Относительная величина, а не люксы — автоматика экспозиции камеры незаметно её смещает.',
  'metric.kelvin.name': 'Цветовая температура',
  'metric.kelvin.short': 'Тёплый свет или холодный.',
  'metric.kelvin.help': 'Ниже 3000 K свет тёплый и вечером мягче. 6500 K — белый по умолчанию у большинства экранов.',
  'metric.melanopic.name': 'Циркадное влияние',
  'metric.melanopic.short': 'Насколько сильно этот свет действует на биологические часы.',
  'metric.melanopic.help': 'Приближение меланопического коэффициента. 1,00 — нейтральный дневной белый; вечером стоит опускаться ниже 0,50.',
  'metric.flicker.name': 'Мерцание',
  'metric.flicker.short': 'Незаметное пульсирование источника света.',
  'metric.flicker.help': 'Дешёвые диммеры и подсветки пульсируют. Глаз этого не видит, но это бывает причиной усталости и головной боли.',
  'metric.uniformity.name': 'Равномерность',
  'metric.uniformity.short': 'Ровно ли свет распределён по кадру.',
  'metric.uniformity.help': 'Низкое значение на экране означает засветку подсветки или отражение; на столе — плохо поставленную лампу.',
  'metric.comfort.name': 'Зрительный комфорт',
  'metric.comfort.short': 'Одна оценка вместо шести чисел.',
  'metric.comfort.help': 'Сводит остальные измерения в оценку от 0 до 100 и показывает, что снижает её сильнее всего. Веса — наша редакционная оценка, а не норма.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'безопасно',
  'zone.warn': 'умеренно',
  'zone.crit': 'вредно',
  'zone.none': 'нет данных',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 авг'). */
  'date.month.short.1': 'янв',
  'date.month.short.2': 'фев',
  'date.month.short.3': 'мар',
  'date.month.short.4': 'апр',
  'date.month.short.5': 'май',
  'date.month.short.6': 'июн',
  'date.month.short.7': 'июл',
  'date.month.short.8': 'авг',
  'date.month.short.9': 'сен',
  'date.month.short.10': 'окт',
  'date.month.short.11': 'ноя',
  'date.month.short.12': 'дек',

  'date.clock': '{hours}:{minutes}',
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0{year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0ч',
  'time.duration.hourMinute': '{hours}\u00A0ч {minutes}\u00A0мин',
  'time.duration.hour': '{hours}\u00A0ч',
  'time.duration.minuteSecond': '{minutes}\u00A0мин {seconds}\u00A0с',
  'time.duration.minute': '{minutes}\u00A0мин',
  'time.duration.second': '{seconds}\u00A0с',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „только что”. */
  'time.justNow': 'только что',
  'time.aMinuteAgo': 'минуту назад',
  'time.minutesAgo': '{minutes}\u00A0мин назад',
  'time.hoursAgo': '{hours}\u00A0ч назад',
  'time.yesterday': 'вчера',
  'time.daysAgo': '{days}\u00A0дн. назад',

  /* Formy zależne od liczby. Rosyjski ma w CLDR cztery: `one` (1, 21, 31…),
     `few` (2–4, 22–24…), `many` (0, 5–20, 25–30…) oraz `other` — ułamki, które
     po rosyjsku biorą dopełniacz liczby pojedynczej („2,5 измерения”). */
  'time.days.plural': { one: 'день', few: 'дня', many: 'дней', other: 'дня' },
  'unit.sample.plural': { one: 'отсчёт', few: 'отсчёта', many: 'отсчётов', other: 'отсчёта' },
  'unit.measurement.plural': { one: 'измерение', few: 'измерения', many: 'измерений', other: 'измерения' },
  /* Rosyjski, tak jak polski, ma dla „сессия” inną formę pojedynczą
     w mianowniku („3 сессии, начиная с последней”) i w bierniku („Удалим
     1 сессию”) — stąd dwa klucze, a nie jeden. */
  'unit.session.plural': { one: 'сессия', few: 'сессии', many: 'сессий', other: 'сессии' },
  'unit.session.accusative.plural': { one: 'сессию', few: 'сессии', many: 'сессий', other: 'сессии' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy — po rosyjsku także dwa różne słowa: точка i балл. */
  'unit.chartPoint.plural': { one: 'точка', few: 'точки', many: 'точек', other: 'точки' },
  'unit.point.plural': { one: 'балл', few: 'балла', many: 'баллов', other: 'балла' },
  'unit.kelvin.plural': { one: 'кельвин', few: 'кельвина', many: 'кельвинов', other: 'кельвина' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „процент”
     tylko czasem, a „×” najczęściej pominie zupełnie. Formy dobrane pod
     wartości, które tu naprawdę padają: udział niebieskiego to liczba
     całkowita rzędu kilkudziesięciu („27 процентов”), a mnożnik melanopiczny
     zawsze ma część dziesiętną („1,20 раза”). */
  'unit.spoken.percent': 'процентов',
  'unit.spoken.times': 'раза',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, bez rady,
     co zrobić dalej. Każdy kod ma tu jedno zdanie diagnozy i jedno zdanie
     rady. */
  'camera.error.denied': 'Нет разрешения на доступ к камере. Разрешите камеру для этой страницы в настройках браузера и попробуйте снова.',
  'camera.error.notfound': 'Камера не найдена. Проверьте, есть ли на устройстве камера и не отключена ли она в системе.',
  'camera.error.inuse': 'Камера занята другим приложением. Закройте то приложение или вкладку и попробуйте снова.',
  'camera.error.insecure': 'Камера работает только по HTTPS или на localhost. Откройте эту страницу по адресу, который начинается с «https://».',
  'camera.error.unsupported': 'Этот браузер здесь не даёт доступа к камере. Попробуйте Chrome или Safari, в обычном окне — не в просмотре, встроенном в другое приложение.',
  'camera.error.unknown': 'Не удалось запустить камеру.'
};
