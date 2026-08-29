/* docs/v2/i18n/ru.js — słownik WERSJI 2, rosyjski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/ru.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej.
 *
 * SKĄD TE ZDANIA: przekład z polskiego (pl.js jest redakcją pierwotną),
 * z angielskim (en.js) jako wzorcem terminologii i rejestru. Ton oryginału —
 * rzeczowy i spokojny, bez marketingu i bez straszenia — został zachowany.
 *
 * TERMINOLOGIA przepisana z docs/shared/i18n/ru.js i z v5, bez wyjątków:
 * «доля синего», «яркость сцены», «цветовая температура», «циркадное влияние»,
 * «мерцание», «равномерность», «зрительный комфорт»; «величина» na „metrykę”
 * i na „wskaźnik”; «отсчёт» na „odczyt” (za count.readings warstwy wspólnej),
 * «замер» na „próbkę”, «точка» na „punkt” historii. Przecinek dziesiętny
 * (0,50), cudzysłowy « », symbole jednostek (%, K, ×, Hz) bez zmian.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (i dlaczego):
 *   'zone.warning'        — wspólne mówi «Внимание», ta wersja mówi
 *                           «Предупреждение» (i «Предупреждения» w podsumowaniu);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi «Измерения»,
 *                           a nie «Измерение».
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules — rosyjski ma cztery: one (1, 21…), few (2–4…),
 * many (0, 5–20…) i other (ułamki: «1,5 точки»). Patrz nagłówek
 * docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ru'] = Object.assign(window.I18nData['ru'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Монитор света — измерение синего света',
  'app.description': 'Монитор света — измерение доли синего света камерой телефона. Семь величин, график, история. Всё доступно, без учётной записи и без оплаты.',
  'app.skipToContent': 'Перейти к содержимому',
  'app.measuring': 'Идёт измерение',
  'app.docsButton': 'Документация и пояснения',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — версия 2',

  'nav.aria': 'Главная навигация',
  'nav.tablistAria': 'Экраны приложения',
  'nav.measure': 'Измерение',
  'nav.history': 'История',
  'nav.tools': 'Инструменты',
  'nav.support': 'Поддержка',
  'nav.more': 'Ещё',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Документация',
  'panel.thresholds': 'Пороги и профили',
  'panel.reports': 'Отчёты',
  'panel.export': 'Экспорт данных',
  'panel.compare': 'Сравнение A/B',
  'panel.calibration': 'Калибровка белым листом',
  'panel.screenCheck': 'Проверить мой монитор',
  'panel.schedule': 'Расписание',
  'panel.alerts': 'Оповещения о воздействии',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Назад',
  'action.close': 'Закрыть',
  'action.refresh': 'Обновить',
  'action.apply': 'Применить',
  'action.delete': 'Удалить',
  'action.hide': 'Скрыть',
  'action.start': 'Старт',
  'action.stop': 'Стоп',
  'action.switch': 'Сменить',
  'action.switchAria': 'Переключить камеру: фронтальная или основная',
  'action.resetDefaults': 'Вернуть по умолчанию',
  'action.reports': 'Отчёты',
  'action.exportCsv': 'Экспорт CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Экран: {name}',
  'a11y.measureStarted': 'Измерение начато.',
  'a11y.measureStopped': 'Измерение остановлено.',
  'a11y.measureStoppedSummary': 'Измерение остановлено. Время: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'Профиль порогов применён.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Подтверждение',
  'dialog.confirm': 'Подтверждаю',
  'dialog.cancel': 'Отмена',
  'dialog.infoTitle': 'Информация',
  'dialog.ok': 'Понятно',

  'help.sheetTitle': 'Описание величины',
  'help.unit': 'Единица',
  'help.scaleRange': 'Диапазон шкалы',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'Предупреждение',
  'threshold.crit': 'Критично',
  'threshold.warnLabel': 'Порог предупреждения',
  'threshold.critLabel': 'Критический порог',
  'threshold.warnAria': '{name} — порог: предупреждение',
  'threshold.critAria': '{name} — порог: критично',

  /* ==================================================================
     Drobne złożenia liczby, jednostki i nazwy
     ==================================================================
     Wyglądają na zbędne, ale to właśnie one usuwają z kodu sklejanie
     napisów: szyk „wartość jednostka” i nawias po nazwie nie w każdym
     języku wyglądają tak samo. */

  'value.withUnit': '{value} {unit}',
  'metric.withUnit': '{name} ({unit})',
  'range.dash': '{min} – {max}',

  /* ==================================================================
     Ekran Pomiar
     ================================================================== */

  'firstRun.title': 'Как измерять',
  'firstRun.text': 'Нажмите «Старт», направьте телефон на освещённую поверхность и подержите его неподвижно несколько секунд. Рамка в просмотре показывает участок, который приложение действительно читает.',
  'firstRun.close': 'Закрыть подсказку',

  'camera.live': 'В ЭФИРЕ',
  'camera.idle': 'Камера выключена. Нажмите «Старт», направьте телефон на освещённую поверхность и подержите его неподвижно несколько секунд.',
  'camera.stopped': 'Измерение остановлено. Нажмите «Старт», чтобы измерить ещё раз.',

  'error.cameraStart': 'Не удалось запустить камеру.',
  'error.engineMissing': 'Модуль измерения не загрузился.',

  'metrics.sevenTitle': 'Семь величин',
  'measure.tilesSub': 'Обновляется 5 раз в секунду',

  'session.title': 'Эта сессия',
  'session.duration': 'Время измерения',
  'session.samples': 'Число замеров',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     «Предупреждения» to nie to samo słowo co «Предупреждение» pod suwakiem. */
  'zone.count.good': 'В норме',
  'zone.count.warning': 'Предупреждения',
  'zone.count.critical': 'Критично',

  'note.calibrated': 'Измерение откалибровано белым листом — каналы выровнены.',

  'tile.helpAria': 'Что означает: {name}',
  'tile.noMeasurement': 'Нет измерения',
  'tile.outOfScale': 'Вне шкалы',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Предупреждение',
  'zone.spoken.warning': 'предупреждение',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Ход во времени',
  'history.pickHint': 'Выберите величину и диапазон',
  'history.metricLabel': 'Величина',
  'history.rangeAria': 'Диапазон времени графика',
  'history.emptyTitle': 'Нет данных в этом диапазоне',
  'history.emptyText': 'Запустите измерение на экране «Измерение» — график заполнится за несколько секунд.',
  'history.tableTitle': 'Последние отсчёты',
  'history.tableHide': 'Скрыть таблицу',
  'history.tableShow': 'Показать таблицу',
  'history.tableCaption': 'Последние отсчёты измерения, самый новый сверху.',
  'history.tableEmpty': 'Отсчётов нет. Запустите измерение на экране «Измерение».',

  'table.time': 'Время',
  'table.metric': 'Величина',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Te same formy
     co w v5 — to ten sam przełącznik i te same identyfikatory zakresów. */
  'range.1m': '1 мин',
  'range.1h': '1 ч',
  'range.24h': '24 ч',
  'range.7d': '7 дн.',
  'range.30d': '30 дн.',

  'chart.now': 'сейчас',
  'chart.countSub': {
    one: '{n} отсчёт в выбранном диапазоне',
    few: '{n} отсчёта в выбранном диапазоне',
    many: '{n} отсчётов в выбранном диапазоне',
    other: '{n} отсчёта в выбранном диапазоне'
  },
  'chart.aria': '{name}, диапазон {range}, {count}, последнее значение {value} {unit}.',
  'chart.ariaZone': '{name}, диапазон {range}, {count}, последнее значение {value} {unit}, зона: {zone}.',
  'chart.ariaEmpty': '{name} — нет данных в диапазоне {range}.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Мастера и вспомогательные функции',
  'tools.note': 'Инструменты помогают истолковать измерение. Все они доступны сразу, а само измерение работает независимо от них.',

  'tool.thresholds.sub': 'Когда значение должно зажигать предупреждение',
  'tool.compare.sub': 'Какой из двух источников света мягче',
  'tool.calibration.sub': 'Единственная функция, которая реально повышает точность',
  'tool.screenCheck.sub': 'Пять шагов и готовый вывод об экране',
  /* Wiersz listy nazywa się inaczej niż sam ekran: «Расписание порогов»
     kontra «Расписание». Tak było i tak zostaje. */
  'tool.schedule.title': 'Расписание порогов',
  'tool.schedule.sub': 'Вечером другие пороги, и помнить об этом не нужно',
  'tool.alerts.sub': 'Сигнал, когда критичная зона длится слишком долго',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Настройки',
  'more.thresholdsSub': 'Когда значение должно зажигать предупреждение',
  'more.docsSub': 'Как измерять и чего это измерение не говорит',
  'more.appearanceTitle': 'Внешний вид и доступность',

  'settings.theme': 'Тема',
  'theme.auto': 'Как в системе',
  'theme.light': 'Светлая',
  'theme.dark': 'Тёмная',

  'settings.textScale': 'Размер текста',
  'textScale.100': 'Обычный',
  'textScale.115': 'Крупнее (115%)',
  'textScale.130': 'Самый крупный (130%)',

  'settings.contrast': 'Повышенный контраст',
  'settings.contrastSub': 'Более выраженные рамки и более тёмный вспомогательный текст.',
  'settings.sound': 'Звук оповещений',
  'settings.soundSub': 'Короткий сигнал, когда срабатывает оповещение о воздействии.',
  'settings.vibrate': 'Вибрация при оповещениях',
  'settings.vibrateSub': 'Работает только на устройствах, которые её поддерживают.',

  'more.dataTitle': 'Данные',
  'more.clearHistory': 'Очистить историю измерений',
  'more.clearHistorySub': 'Удаляет сохранённые отсчёты с этого устройства. Пороги, профили и настройки остаются.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'Приложение целиком бесплатно. ',
  'more.supportLink': 'Его можно поддержать добровольно.',

  'dialog.clearHistory.title': 'Удалить сохранённую историю?',
  'dialog.clearHistory.body': {
    one: 'Удалим {n} сохранённую точку измерения с этого устройства. Эту операцию нельзя отменить. Пороги, профили и настройки останутся нетронутыми.',
    few: 'Удалим {n} сохранённые точки измерения с этого устройства. Эту операцию нельзя отменить. Пороги, профили и настройки останутся нетронутыми.',
    many: 'Удалим {n} сохранённых точек измерения с этого устройства. Эту операцию нельзя отменить. Пороги, профили и настройки останутся нетронутыми.',
    other: 'Удалим {n} сохранённой точки измерения с этого устройства. Эту операцию нельзя отменить. Пороги, профили и настройки останутся нетронутыми.'
  },
  'dialog.clearHistory.confirm': 'Удалить историю',
  'dialog.clearHistory.cancel': 'Оставить',

  'toast.historyCleared': 'История измерений удалена.',
  'toast.screenUnavailable': 'Этот экран пока недоступен в этой версии.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'Что измеряет это приложение',
  'docs.leadText': 'Камера телефона смотрит на освещённую поверхность, а приложение пять раз в секунду считает средние значения каналов R, G и B по центральному участку кадра. Из этих трёх чисел оно выводит семь величин.',
  'docs.limitsTitle': 'Границы метода',
  'docs.limitsText': 'У камеры три широких цветовых канала, автоматическая экспозиция и автоматический баланс белого. Она не измеряет спектр и не знает абсолютных значений, поэтому яркость — сравнительный показатель, а не люксы. Цветовая температура и циркадное влияние — это приближения, рассчитанные по цветам sRGB. Выборка {rate} Hz видит мерцание только ниже {limit} Hz — сетевые 100 Hz недостижимы, и приложение никогда не покажет их как результат.',

  'note.howTo.repeat.title': 'Повторите измерение',
  'note.howTo.repeat.text': 'Один отсчёт — это моментальный снимок. Десяток секунд измерения даёт более достоверную картину.',

  'docs.scale': 'Шкала',
  'docs.direction': 'Направление',
  'docs.directionHigher': 'Выше — значит лучше',
  'docs.directionLower': 'Ниже — значит мягче',
  'docs.privacyTitle': 'Данные и приватность',
  'docs.privacyText': 'Изображение с камеры никуда не отправляется и нигде не сохраняется — от каждого кадра остаются только три числа. Измерения, пороги и настройки лежат в памяти браузера на этом устройстве. Приложение не делает никаких сетевых запросов и работает в автономном режиме.',
  'docs.freeLine': 'Все семь величин, история, график, инструменты и автономный режим работают для каждого, без учётной записи и без оплаты.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Доступно всё',
  'support.heroText': 'Все семь величин, история измерений, график, все инструменты и автономный режим работают для каждого и сразу. Без учётной записи, без ограничений и без оплаты.',
  'support.whyTitle': 'Почему я об этом прошу',
  'support.whyText': '{app} делается в свободное время и ни на ком не зарабатывает: здесь нет рекламы, не собираются данные и нечего продать. Поддержание и дальнейшее развитие — новые величины, исправления, проверки на новых телефонах — стоят времени. Если приложение вам пригодилось, можно скинуться. Это не обязательно.',
  'support.whatTitle': 'Что даёт пожертвование',
  'support.whatText': 'Ничего. Оно правда ничего не открывает и ничего не ускоряет — приложение выглядит и работает точно так же до него и после него. Даёт оно только то, что автор знает: эта работа кому-то пригодилась.',
  'support.button': 'Угостить кофе',
  'support.pendingTitle': 'Профиль пока не подключён',
  'support.pendingText': 'Здесь пока нет адреса, по которому можно отправить поддержку. Он появится на этом месте, когда будет готов, — до тех пор всё в приложении работает точно так же.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'Кнопка открывает внешнюю страницу Buy Me a Coffee в новой вкладке. Это единственный момент, когда что-либо покидает это устройство, — и происходит он только после вашего нажатия. Измерения, история и настройки остаются здесь.',
  'privacy.externalPending': 'Когда адрес появится, нажатие откроет внешнюю страницу в новой вкладке. Это будет единственный момент, когда что-либо покидает это устройство. Измерения, история и настройки остаются здесь.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (запасной вариант в ui-core.js)',
  'boot.need.metrics': 'ни одно значение не будет посчитано',
  'boot.need.bus': 'модули перестанут видеть друг друга',
  'boot.need.ui': 'экраны нельзя будет переключать',
  'boot.need.engine': 'камера и измерение не запустятся',
  'boot.need.support': 'экран «Поддержка» будет пустым',
  'boot.need.tools': 'вкладка «Инструменты» будет пустой',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'Не загрузились модули: {list}.',
  'boot.consoleHint': 'Проверьте порядок и пути <script> в index.html.',
  'boot.incompleteTitle': 'Приложение загрузилось не полностью',
  'boot.incompleteText': '{missing} Обновите страницу; если это не поможет, файлы на сервере неполные.',
  'boot.newVersion': 'Доступна новая версия приложения.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'Что делают пороги. ',
  'thresholds.noteText': 'Порог предупреждения зажигает жёлтое состояние, критический порог — красное. Изменение действует сразу — в том числе на отсчёте, который уже на экране. Собственный набор порогов можно сохранить под именем и возвращаться к нему когда угодно.',
  'thresholds.profilesTitle': 'Профили порогов',
  'thresholds.profilesSub': 'Три встроенных и ваши собственные',
  'thresholds.customName': 'Название своего профиля',
  'thresholds.customPlaceholder': 'например, Спальня вечером',
  'thresholds.save': 'Сохранить текущие пороги',
  'thresholds.saveHelp': 'Сохраняет ровно те пороги, которые выставлены выше.',

  'profile.builtin.default.name': 'По умолчанию',
  'profile.builtin.default.desc': 'Пороги из каталога величин — отправная точка для всех измерений.',
  'profile.builtin.evening.name': 'Вечер — мягкий',
  'profile.builtin.evening.desc': 'Раньше предупреждает о холодном цвете и о циркадном влиянии.',
  'profile.builtin.work.name': 'Работа за столом',
  'profile.builtin.work.desc': 'Допускает яркий холодный дневной свет; следит за мерцанием и равномерностью.',
  'profile.custom.desc': 'Свой профиль, сохранён {date}.',

  'toast.thresholdsReset': 'Пороги по умолчанию возвращены.',
  'toast.thresholdOrder': 'Порог предупреждения должен быть ниже критического.',
  'toast.thresholdOrderInverted': 'Для этой величины порог предупреждения должен быть выше критического.',
  'toast.profileNameMissing': 'Укажите название профиля.',
  'toast.profileSaved': 'Профиль «{name}» сохранён.',
  'toast.profileApplied': 'Профиль «{name}» применён.',
  'toast.profileApplyFailed': 'Не удалось применить этот профиль.',
  'toast.profileRemoved': 'Профиль удалён.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'Зачем расписание. ',
  'schedule.noteText': 'Вечером разумны не те пороги, что в полдень. Правило «от–до» подменяет профиль само, чтобы об этом не нужно было помнить. Расписание никогда не запускает и не останавливает измерение.',
  'schedule.toggle': 'Включить автоматическое переключение',
  'schedule.toggleSub': 'Проверяется каждую минуту по часам устройства.',
  'schedule.emptyTitle': 'Правил нет',
  'schedule.emptyText': 'Добавьте первое правило кнопкой ниже.',
  'schedule.add': 'Добавить правило',
  'schedule.to': 'до',
  'schedule.profile': 'Профиль',
  'schedule.fromAria': 'Правило {n}: время начала',
  'schedule.toAria': 'Правило {n}: время окончания',
  'toast.scheduleTimeFormat': 'Укажите время в формате 22:00.',
  'toast.scheduleEnded': 'Расписание закончилось — вернулись прежние пороги.',
  'toast.scheduleApplied': 'Расписание включило профиль «{name}».',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'Что делает оповещение. ',
  'alerts.noteText': 'Оно следит за одной величиной и отзывается только тогда, когда она держит выбранную зону без перерыва заданное время. Оно никогда не останавливает измерение и не закрывает кнопки.',
  'alerts.toggle': 'Включить оповещения о воздействии',
  'alerts.toggleSub': 'Работают только во время идущего измерения.',
  'alerts.metric': 'Отслеживаемая величина',
  'alerts.level': 'С какой зоны',
  'alerts.level.warning': 'Предупреждение и выше',
  'alerts.level.critical': 'Только критичная',
  'alerts.sustain': 'Через сколько секунд без перерыва',
  'alerts.sustainHelp': 'Более короткие времена дают больше ложных тревог, когда вы двигаете телефон.',
  'alerts.sound': 'Короткий звуковой сигнал',
  'alerts.soundSub': 'Звук генерируется локально. Его можно выключить и целиком, на экране «Ещё».',
  'alerts.barTitle': 'Оповещение о воздействии',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} держит зону предупреждения уже {seconds} с — сейчас {value} {unit}.',
  'alerts.message.critical': '{name} держит критичную зону уже {seconds} с — сейчас {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'Как сравнивать. ',
  'compare.noteText': 'Запустите измерение, направьте камеру на первый источник и сохраните его как A. Не меняя расстояния и угла, переключите свет и сохраните B. Сравнение имеет смысл только тогда, когда сцена одна и та же.',
  'compare.slotA': 'Свет A',
  'compare.slotB': 'Свет B',
  'compare.save': 'Сохранить текущий отсчёт',
  'compare.savedAt': 'Сохранено {date}, {time}',
  'compare.empty': 'Пока ничего не сохранено.',
  'compare.verdictTitle': 'Результат сравнения',
  'compare.verdictEmpty': 'Сохраните оба источника света, чтобы увидеть, какой из них мягче.',
  'compare.notEnough': 'Слишком мало данных, чтобы сравнить эти два измерения.',
  'compare.tie': 'Оба источника выходят практически одинаковыми ({metric}: {a} и {b} {unit}). Разница укладывается в шум измерения.',
  'compare.betterA': 'Мягче свет A — {metric} составляет {better} {unit} против {worse} {unit}.',
  'compare.betterB': 'Мягче свет B — {metric} составляет {better} {unit} против {worse} {unit}.',
  'compare.clear': 'Очистить сравнение',
  'toast.compareSavedA': 'Свет A сохранён.',
  'toast.compareSavedB': 'Свет B сохранён.',
  'toast.compareCleared': 'Сравнение очищено.',
  'toast.measureFirst': 'Сначала запустите измерение на экране «Измерение».',

  /* Nazwa wielkości w środku zdania. Po rosyjsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. */
  'metric.share.nameLower': 'доля синего',
  'metric.brightness.nameLower': 'яркость сцены',
  'metric.kelvin.nameLower': 'цветовая температура',
  'metric.melanopic.nameLower': 'циркадное влияние',
  'metric.flicker.nameLower': 'мерцание',
  'metric.uniformity.nameLower': 'равномерность',
  'metric.comfort.nameLower': 'зрительный комфорт',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'Почему это работает. ',
  'calib.noteText': 'У матрицы камеры есть постоянный сдвиг между каналами. Измерение белого листа показывает, насколько он велик, и позволяет его вычесть. Это единственная функция в этом приложении, которая реально повышает точность, — и она всё равно не превращает камеру в спектрометр.',
  'calib.step1': 'Положите белый лист под измеряемый свет',
  'calib.step2': 'Запустите измерение и заполните кадр листом',
  'calib.step3': 'Нажмите «Калибровать» и не двигайте телефон 3 секунды',
  'calib.done': 'Откалибровано {date}, {time}.',
  'calib.none': 'Калибровки нет. Измерение работает, значения воспринимайте как сравнительные.',
  'calib.gain': 'Усиление {channel}',
  'calib.gainsLabel': 'Усиления каналов',
  'calib.gainsUnset': 'не задано',
  'calib.start': 'Калибровать (3 с)',
  'calib.clear': 'Удалить калибровку',
  'toast.calibCleared': 'Калибровка удалена.',
  'calib.error.noEngine': 'Модуль измерения недоступен.',
  'calib.error.notRunning': 'Сначала запустите измерение и направьте камеру на белый лист.',
  'calib.error.busy': 'Калибровка уже идёт.',
  'calib.error.tooFewSamples': 'Слишком мало замеров. Проверьте, действительно ли идёт измерение.',
  'calib.error.tooDark': 'Изображение слишком тёмное для калибровки. Осветите лист лучше и попробуйте ещё раз.',
  'calib.error.tooSkewed': 'Сдвиг каналов слишком велик, чтобы принять его за калибровку. Используйте белый лист при ровном освещении.',
  'calib.ok': 'Откалибровано. Цветовая температура и циркадное влияние теперь будут точнее.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'Для чего это нужно. ',
  'screencheck.noteText': 'Пять шагов проверяют монитор так, как его проверяют в обзоре: белый при двух уровнях яркости, равномерность подсветки и то, действительно ли системный ночной режим что-то меняет. Мастер читает уже идущее измерение; сам он его не запускает.',
  'screencheck.step.white100.title': 'Белый при полной яркости',
  'screencheck.step.white100.hint': 'Откройте белую страницу на мониторе, поставьте яркость на максимум и заполните кадр экраном.',
  'screencheck.step.white20.title': 'Белый при низкой яркости',
  'screencheck.step.white20.hint': 'Уменьшите яркость монитора примерно до одной пятой и не меняйте кадр.',
  'screencheck.step.corners.title': 'Углы экрана',
  'screencheck.step.corners.hint': 'Вернитесь к полной яркости и покажите камере весь экран — мы проверяем равномерность подсветки.',
  'screencheck.step.nightOff.title': 'Ночной режим выключен',
  'screencheck.step.nightOff.hint': 'Убедитесь, что фильтр синего света выключен.',
  'screencheck.step.nightOn.title': 'Ночной режим включён',
  'screencheck.step.nightOn.hint': 'Включите системный фильтр синего света и повторите тот же кадр.',
  'screencheck.stepHeading': 'Шаг {n} из {total}: {title}',
  'screencheck.idleTitle': 'Мастер не запущен',
  'screencheck.idleHint': 'Запустите измерение на экране «Измерение», потом вернитесь сюда и нажмите «Запустить мастер».',
  'screencheck.next': 'Сохранить шаг и идти дальше',
  'screencheck.cancel': 'Прервать',
  'screencheck.start': 'Запустить мастер',
  'screencheck.clearResult': 'Очистить результат',
  'screencheck.resultTitle': 'Результат',
  'screencheck.resultEmpty': 'Ни один шаг ещё не сохранён.',
  'screencheck.resultPartial': 'Сохранено {done} шагов из {total}. Выводы появятся, когда будет что сравнивать.',
  'screencheck.note.uniformityLow': 'Равномерность подсветки составляет {value}% — в кадре видны заметные различия яркости.',
  'screencheck.note.uniformityOk': 'Подсветка ровная ({value}%).',
  'screencheck.note.nightWorks': 'Ночной режим снижает долю синего на {value} процентного пункта — он работает.',
  'screencheck.note.nightWeak': 'Ночной режим меняет долю синего лишь на {value} процентного пункта. Это меньше, чем обычно даёт системный фильтр.',
  'screencheck.note.pwm': 'При низкой яркости мерцание растёт с {from}% до {to}% — это типичный признак импульсного затемнения (ШИМ).',
  'toast.screencheckDone': 'Мастер завершён. Результат ниже.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'Откуда эти числа. ',
  'reports.noteText': 'Отчёт считается по истории, сохранённой на этом устройстве, — по одной точке на пять секунд. Движок собирает её с первого измерения, поэтому отчёт готов сразу.',
  'reports.rangeAria': 'Диапазон отчёта',
  'reports.day': 'Последние сутки',
  'reports.week': 'Последние 7 дней',
  'reports.date': 'Отчёт за {date}.',
  'report.headerDay': 'День с {from} по {to} — {count}.',
  'report.headerWeek': 'Неделя с {from} по {to} — {count}.',
  'count.points': { one: '{n} точка', few: '{n} точки', many: '{n} точек', other: '{n} точки' },
  'count.samples': { one: '{n} замер', few: '{n} замера', many: '{n} замеров', other: '{n} замера' },
  'report.emptyTitle': 'Нет данных за этот период',
  'report.emptyText': 'Запустите измерение на экране «Измерение» — история сохраняется сама.',
  'report.colAvg': 'Среднее',
  'report.colMin': 'Минимум',
  'report.colMax': 'Максимум',
  'report.zonesTitle': 'Распределение зон',
  'report.worstHour': 'Худшее время суток',
  'report.worstHourNone': 'явного нет',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'Что с этим делать',
  'report.disclaimerTitle': 'Это не совет по здоровью. ',
  'report.disclaimerText': 'Выводы следуют исключительно из того, что увидела камера этого телефона. Приложение не измеряет спектр, не знает люксов и не ставит никакого диагноза.',

  'advice.melanopic': 'Среднее циркадное влияние составило {value}×. Вечером стоит опуститься ниже 0,50 — проще всего с помощью более тёплой лампочки или ночного режима.',
  'advice.kelvin': 'Свет был холодным (в среднем {value} K). Для работы это безупречно; за два часа до сна лучше ниже 3000 K.',
  'advice.flicker': 'Обнаружено заметное мерцание (в среднем {value}%). Обычно за него отвечает дешёвый диммер или блок питания подсветки.',
  'advice.uniformity': 'Свет распределяется неравномерно ({value}%). Сдвинуть лампу или изменить её угол обычно даёт больше, чем заменить лампочку.',
  'advice.worstHour': 'Худшее время суток — {hour}:00: именно там собирается больше всего отсчётов вне нормы.',
  'advice.none': 'За этот период ничто не выбивается за норму. Больше всего сейчас дало бы сравнение двух источников света в сравнении A/B.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'Формат файла. ',
  'export.noteText': 'Точка с запятой как разделитель столбцов, запятая как десятичный разделитель, кодировка UTF-8 с меткой BOM. Такой файл Excel с русскими региональными настройками открывает без какой-либо настройки.',
  'export.range': 'Диапазон данных',
  'export.columns': 'Столбцы в файле',
  'export.chipFilled': ' — столбец заполнен',
  'export.help': 'Файл содержит все семь столбцов — движок считает их с первого измерения, и все они попадают в файл.',
  'export.run': 'Сохранить файл CSV',
  'export.previewEmpty': 'В этом диапазоне отсчётов нет. Запустите измерение — история сохраняется сама.',
  'csv.range.hour': 'Последний час',
  'csv.range.day': 'Последние сутки',
  'csv.range.week': 'Последние 7 дней',
  'csv.range.month': 'Последние 30 дней',
  'csv.colDate': 'Дата',
  'csv.colTime': 'Время',
  'csv.colZone': 'Зона',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'В выбранном диапазоне нет ни одного отсчёта.',
  'toast.exportFailed': 'Этот браузер не позволил сохранить файл.',
  'toast.exportSaved': {
    one: 'Файл {filename} сохранён ({n} строка).',
    few: 'Файл {filename} сохранён ({n} строки).',
    many: 'Файл {filename} сохранён ({n} строк).',
    other: 'Файл {filename} сохранён ({n} строки).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} ч {m} мин',
  'duration.ms': '{m} мин {s} с',
  'duration.s': '{s} с'
});
