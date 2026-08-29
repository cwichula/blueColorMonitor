/* docs/v2/i18n/uk.js — słownik WERSJI 2, ukraiński.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/uk.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej. Zestaw kluczy jest identyczny
 * z pl.js — pilnuje tego docs/shared/i18n/keys.test.js.
 *
 * REJESTR: forma grzecznościowa (druga osoba liczby mnogiej — «натисніть»,
 * «спрямуйте»), jednolicie w całym pliku, dokładnie tak jak w
 * docs/shared/i18n/uk.js, z którym ten plik stoi w jednym zdaniu na ekranie.
 * Ortografia ukraińska, a nie kalka rosyjska: «застосунок» (nie „додаток”),
 * «колірна температура» (nie „кольорова”), apostrof pisany jako ’ (п’ять,
 * з’явиться). Cudzysłowy «…», przecinek dziesiętny (0,50).
 *
 * TERMINOLOGIA — wzięta co do słowa z warstwy wspólnej: частка синього,
 * яскравість сцени, колірна температура, циркадний вплив, мерехтіння,
 * рівномірність, зоровий комфорт. Poza tym, jak w v5: показник (metryka),
 * поріг (próg), історія, вимірювання (pomiar jako czynność), вимір (pomiar
 * jako rzecz zapisana), відлік (próbka, odczyt), сеанс (sesja), калібрування.
 * Klucze *.nameLower to te same nazwy w środku zdania — po ukraińsku małą
 * literą.
 *
 * ZASTRZEŻENIA MEDYCZNE i akapity o prywatności przetłumaczone DOKŁADNIE, bez
 * osłabiania i bez dodawania obietnic — to zdania o skutkach prawnych.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (te same co w pl.js i z tego samego powodu):
 *   'zone.warning'        — wspólne mówi „Увага”, ta wersja od zawsze mówi
 *                           „Попередження” — i tym samym słowem w podsumowaniu,
 *                           bo po ukraińsku liczba mnoga brzmi tu identycznie;
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi o pomiarach
 *                           w liczbie mnogiej.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules — ukraiński ma cztery: one, few, many i other. Ta ostatnia
 * nie jest kopią 'many': dostają ją ułamki, a te biorą dopełniacz liczby
 * pojedynczej („1,5 відліку”). Patrz nagłówek docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['uk'] = Object.assign(window.I18nData['uk'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Монітор світла — вимірювання синього світла',
  'app.description': 'Монітор світла — вимірювання частки синього світла камерою телефона. Сім показників, графік, історія. Усе доступне, без облікового запису і без оплати.',
  'app.skipToContent': 'Перейти до вмісту',
  'app.measuring': 'Триває вимірювання',
  'app.docsButton': 'Документація та пояснення',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — версія 2',

  'nav.aria': 'Головна навігація',
  'nav.tablistAria': 'Екрани застосунку',
  'nav.measure': 'Вимір',
  'nav.history': 'Історія',
  'nav.tools': 'Інструменти',
  'nav.support': 'Підтримка',
  'nav.more': 'Більше',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Документація',
  'panel.thresholds': 'Пороги і профілі',
  'panel.reports': 'Звіти',
  'panel.export': 'Експорт даних',
  'panel.compare': 'Порівняння A/B',
  'panel.calibration': 'Калібрування білим аркушем',
  'panel.screenCheck': 'Перевірити мій монітор',
  'panel.schedule': 'Розклад',
  'panel.alerts': 'Сповіщення про експозицію',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Назад',
  'action.close': 'Закрити',
  'action.refresh': 'Оновити',
  'action.apply': 'Застосувати',
  'action.delete': 'Видалити',
  'action.hide': 'Сховати',
  'action.start': 'Старт',
  'action.stop': 'Стоп',
  'action.switch': 'Перемкнути',
  'action.switchAria': 'Перемкнути камеру: передня або задня',
  'action.resetDefaults': 'Відновити типові',
  'action.reports': 'Звіти',
  'action.exportCsv': 'Експорт CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Екран: {name}',
  'a11y.measureStarted': 'Вимірювання розпочато.',
  'a11y.measureStopped': 'Вимірювання зупинено.',
  'a11y.measureStoppedSummary': 'Вимірювання зупинено. Час: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'Профіль порогів застосовано.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Підтвердження',
  'dialog.confirm': 'Підтверджую',
  'dialog.cancel': 'Скасувати',
  'dialog.infoTitle': 'Інформація',
  'dialog.ok': 'Зрозуміло',

  'help.sheetTitle': 'Опис показника',
  'help.unit': 'Одиниця',
  'help.scaleRange': 'Діапазон шкали',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'Попередження',
  'threshold.crit': 'Критичний',
  'threshold.warnLabel': 'Поріг попередження',
  'threshold.critLabel': 'Критичний поріг',
  'threshold.warnAria': '{name} — поріг: попередження',
  'threshold.critAria': '{name} — поріг: критичний',

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

  'firstRun.title': 'Як виміряти',
  'firstRun.text': 'Натисніть «Старт», спрямуйте телефон на освітлену поверхню і потримайте його нерухомо кілька секунд. Рамка в перегляді показує ту ділянку, яку застосунок справді зчитує.',
  'firstRun.close': 'Закрити підказку',

  'camera.live': 'НАЖИВО',
  'camera.idle': 'Камера вимкнена. Натисніть «Старт», спрямуйте телефон на освітлену поверхню і потримайте його нерухомо кілька секунд.',
  'camera.stopped': 'Вимірювання зупинено. Натисніть «Старт», щоб виміряти ще раз.',

  'error.cameraStart': 'Не вдалося увімкнути камеру.',
  'error.engineMissing': 'Модуль вимірювання не завантажився.',

  'metrics.sevenTitle': 'Сім показників',
  'measure.tilesSub': 'Оновлюється 5 разів на секунду',

  'session.title': 'Цей сеанс',
  'session.duration': 'Час вимірювання',
  'session.samples': 'Кількість відліків',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     Po ukraińsku „Попередження” w liczbie mnogiej brzmi tak samo jak
     w pojedynczej, ale to osobne słowo i osobny klucz. */
  'zone.count.good': 'У нормі',
  'zone.count.warning': 'Попередження',
  'zone.count.critical': 'Критичні',

  'note.calibrated': 'Вимірювання відкалібровано білим аркушем — канали вирівняні.',

  'tile.helpAria': 'Що означає: {name}',
  'tile.noMeasurement': 'Немає виміру',
  'tile.outOfScale': 'Поза шкалою',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Попередження',
  'zone.spoken.warning': 'попередження',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Перебіг у часі',
  'history.pickHint': 'Виберіть показник і діапазон',
  'history.metricLabel': 'Показник',
  'history.rangeAria': 'Часовий діапазон графіка',
  'history.emptyTitle': 'Немає даних у цьому діапазоні',
  'history.emptyText': 'Запустіть вимірювання на екрані «Вимір» — графік заповниться за кілька секунд.',
  'history.tableTitle': 'Останні відліки',
  'history.tableHide': 'Сховати таблицю',
  'history.tableShow': 'Показати таблицю',
  'history.tableCaption': 'Останні відліки вимірювання, найновіші вгорі.',
  'history.tableEmpty': 'Немає відліків. Запустіть вимірювання на екрані «Вимір».',

  'table.time': 'Час',
  'table.metric': 'Показник',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     dłuższy zapis łamał się na dwie linie. */
  'range.1m': '1 хв',
  'range.1h': '1 год',
  'range.24h': '24 год',
  'range.7d': '7 днів',
  'range.30d': '30 днів',

  'chart.now': 'зараз',
  'chart.countSub': {
    one: '{n} відлік у вибраному діапазоні',
    few: '{n} відліки у вибраному діапазоні',
    many: '{n} відліків у вибраному діапазоні',
    other: '{n} відліку у вибраному діапазоні'
  },
  'chart.aria': '{name}, діапазон {range}, {count}, останнє значення {value} {unit}.',
  'chart.ariaZone': '{name}, діапазон {range}, {count}, останнє значення {value} {unit}, зона: {zone}.',
  'chart.ariaEmpty': '{name} — немає даних у діапазоні {range}.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Майстри та допоміжні функції',
  'tools.note': 'Інструменти допомагають витлумачити вимірювання. Усі вони доступні одразу, а саме вимірювання працює незалежно від них.',

  'tool.thresholds.sub': 'Коли значення має вмикати попередження',
  'tool.compare.sub': 'Яке з двох світел лагідніше',
  'tool.calibration.sub': 'Єдина функція, яка справді підвищує точність',
  'tool.screenCheck.sub': 'П’ять кроків і готовий висновок про екран',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Розклад порогів”
     kontra „Розклад”. Tak było i tak zostaje. */
  'tool.schedule.title': 'Розклад порогів',
  'tool.schedule.sub': 'Інші пороги ввечері, без потреби про це пам’ятати',
  'tool.alerts.sub': 'Сигнал, коли критична зона триває надто довго',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Налаштування',
  'more.thresholdsSub': 'Коли значення має вмикати попередження',
  'more.docsSub': 'Як вимірювати і чого це вимірювання не каже',
  'more.appearanceTitle': 'Вигляд і доступність',

  'settings.theme': 'Тема',
  'theme.auto': 'Як у системі',
  'theme.light': 'Світла',
  'theme.dark': 'Темна',

  'settings.textScale': 'Розмір тексту',
  'textScale.100': 'Звичайний',
  'textScale.115': 'Більший (115%)',
  'textScale.130': 'Найбільший (130%)',

  'settings.contrast': 'Вищий контраст',
  'settings.contrastSub': 'Сильніші рамки і темніший допоміжний текст.',
  'settings.sound': 'Звук сповіщень',
  'settings.soundSub': 'Короткий сигнал, коли вмикається сповіщення про експозицію.',
  'settings.vibrate': 'Вібрація при сповіщеннях',
  'settings.vibrateSub': 'Працює лише на пристроях, які її підтримують.',

  'more.dataTitle': 'Дані',
  'more.clearHistory': 'Очистити історію вимірювань',
  'more.clearHistorySub': 'Видаляє збережені відліки з цього пристрою. Пороги, профілі та налаштування залишаються.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'Застосунок повністю безкоштовний. ',
  'more.supportLink': 'Ви можете підтримати його добровільно.',

  'dialog.clearHistory.title': 'Видалити збережену історію?',
  'dialog.clearHistory.body': {
    one: 'Ми видалимо {n} збережену точку виміру з цього пристрою. Цю дію не можна скасувати. Пороги, профілі та налаштування залишаться недоторканими.',
    few: 'Ми видалимо {n} збережені точки виміру з цього пристрою. Цю дію не можна скасувати. Пороги, профілі та налаштування залишаться недоторканими.',
    many: 'Ми видалимо {n} збережених точок виміру з цього пристрою. Цю дію не можна скасувати. Пороги, профілі та налаштування залишаться недоторканими.',
    other: 'Ми видалимо {n} збереженої точки виміру з цього пристрою. Цю дію не можна скасувати. Пороги, профілі та налаштування залишаться недоторканими.'
  },
  'dialog.clearHistory.confirm': 'Видалити історію',
  'dialog.clearHistory.cancel': 'Залишити',

  'toast.historyCleared': 'Історію вимірювань видалено.',
  'toast.screenUnavailable': 'Цей екран поки що недоступний у цій версії.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'Що вимірює цей застосунок',
  'docs.leadText': 'Камера телефона дивиться на освітлену поверхню, а застосунок п’ять разів на секунду обчислює середні значення каналів R, G і B із середньої ділянки кадру. З цих трьох чисел він виводить сім показників.',
  'docs.limitsTitle': 'Межі методу',
  'docs.limitsText': 'Камера має три широкі колірні канали, автоматичну експозицію і автоматичний баланс білого. Вона не вимірює спектра і не знає абсолютних значень, тож яскравість є відносним показником, а не люксами. Колірна температура і циркадний вплив — це наближення, обчислені з кольорів sRGB. Дискретизація {rate} Hz бачить мерехтіння лише нижче {limit} Hz — мережеві 100 Hz недосяжні, і застосунок ніколи не подасть їх як результат.',

  'note.howTo.repeat.title': 'Повторіть вимірювання',
  'note.howTo.repeat.text': 'Один відлік — це миттєвий знімок. Кільканадцять секунд вимірювання дають достовірнішу картину.',

  'docs.scale': 'Шкала',
  'docs.direction': 'Напрямок',
  'docs.directionHigher': 'Вище означає краще',
  'docs.directionLower': 'Нижче означає лагідніше',
  'docs.privacyTitle': 'Дані і приватність',
  'docs.privacyText': 'Зображення з камери нікуди не надсилається і ніде не зберігається — з кожного кадру залишаються лише три числа. Виміри, пороги і налаштування лежать у пам’яті браузера на цьому пристрої. Застосунок не виконує жодних мережевих запитів і працює в режимі офлайн.',
  'docs.freeLine': 'Усі сім показників, історія, графік, інструменти і режим офлайн працюють для кожного, без облікового запису і без оплати.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Доступне все',
  'support.heroText': 'Усі сім показників, історія вимірювань, графік, усі інструменти і режим офлайн працюють для кожного, одразу. Без облікового запису, без обмежень і без оплати.',
  'support.whyTitle': 'Чому я про це прошу',
  'support.whyText': '{app} постає в позаробочий час і ні на кому не заробляє: тут немає реклами, не збираються дані і немає чого продавати. Утримання і подальший розвиток — нові показники, виправлення, тести на наступних телефонах — коштують часу. Якщо застосунок вам знадобився, ви можете докинутися. Не мусите.',
  'support.whatTitle': 'Що дає пожертва',
  'support.whatText': 'Нічого. Справді нічого не відмикає і нічого не пришвидшує — застосунок виглядає і працює точно так само до неї і після неї. Дає лише те, що автор знає: ця праця комусь знадобилася.',
  'support.button': 'Пригостіть мене кавою',
  'support.pendingTitle': 'Профіль ще не під’єднано',
  'support.pendingText': 'Тут ще немає адреси, на яку можна надіслати підтримку. Вона з’явиться на цьому місці, коли буде готова — до того часу все в застосунку працює точно так само.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'Кнопка відкриває зовнішню сторінку Buy Me a Coffee у новій вкладці. Це єдиний момент, коли будь-що покидає цей пристрій — і стається це лише після вашого натискання. Виміри, історія і налаштування залишаються тут.',
  'privacy.externalPending': 'Коли адреса з’явиться, натискання відкриє зовнішню сторінку в новій вкладці. Це буде єдиний момент, коли будь-що покидає цей пристрій. Виміри, історія і налаштування залишаються тут.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (запасний варіант у ui-core.js)',
  'boot.need.metrics': 'жодне значення не буде обчислене',
  'boot.need.bus': 'модулі перестануть бачити одне одного',
  'boot.need.ui': 'не вдасться перемикати екрани',
  'boot.need.engine': 'камера і вимірювання не запустяться',
  'boot.need.support': 'екран «Підтримка» буде порожній',
  'boot.need.tools': 'вкладка «Інструменти» буде порожня',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'Не завантажилися модулі: {list}.',
  'boot.consoleHint': 'Перевірте порядок і шляхи <script> в index.html.',
  'boot.incompleteTitle': 'Застосунок завантажився неповністю',
  'boot.incompleteText': '{missing} Оновіть сторінку; якщо це не допоможе, файли на сервері неповні.',
  'boot.newVersion': 'Є нова версія застосунку.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'Що роблять пороги. ',
  'thresholds.noteText': 'Поріг попередження вмикає жовтий стан, критичний поріг — червоний. Зміна діє негайно — також на відліку, який уже на екрані. Власний набір порогів можна зберегти під назвою і повертатися до нього, коли забажаєте.',
  'thresholds.profilesTitle': 'Профілі порогів',
  'thresholds.profilesSub': 'Три вбудовані та ваші власні',
  'thresholds.customName': 'Назва власного профілю',
  'thresholds.customPlaceholder': 'напр. Спальня ввечері',
  'thresholds.save': 'Зберегти поточні пороги',
  'thresholds.saveHelp': 'Зберігає саме ті пороги, які встановлені вище.',

  'profile.builtin.default.name': 'Типовий',
  'profile.builtin.default.desc': 'Пороги з каталогу показників — відправна точка для всіх вимірювань.',
  'profile.builtin.evening.name': 'Вечір — лагідний',
  'profile.builtin.evening.desc': 'Попереджає раніше про холодний колір і циркадний вплив.',
  'profile.builtin.work.name': 'Робота за столом',
  'profile.builtin.work.desc': 'Допускає яскраве, холодне денне світло; пильнує мерехтіння і рівномірність.',
  'profile.custom.desc': 'Власний профіль, збережений {date}.',

  'toast.thresholdsReset': 'Типові пороги відновлено.',
  'toast.thresholdOrder': 'Поріг попередження має бути нижчим за критичний.',
  'toast.thresholdOrderInverted': 'Для цього показника поріг попередження має бути вищим за критичний.',
  'toast.profileNameMissing': 'Вкажіть назву профілю.',
  'toast.profileSaved': 'Профіль «{name}» збережено.',
  'toast.profileApplied': 'Профіль «{name}» застосовано.',
  'toast.profileApplyFailed': 'Не вдалося застосувати цей профіль.',
  'toast.profileRemoved': 'Профіль видалено.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'Навіщо розклад. ',
  'schedule.noteText': 'Увечері доречні інші пороги, ніж опівдні. Правило «від–до» підміняє профіль саме, щоб не треба було про це пам’ятати. Розклад ніколи не запускає і не зупиняє вимірювання.',
  'schedule.toggle': 'Увімкнути автоматичне перемикання',
  'schedule.toggleSub': 'Перевіряється щохвилини за годинником пристрою.',
  'schedule.emptyTitle': 'Немає правил',
  'schedule.emptyText': 'Додайте перше правило кнопкою нижче.',
  'schedule.add': 'Додати правило',
  'schedule.to': 'до',
  'schedule.profile': 'Профіль',
  'schedule.fromAria': 'Правило {n}: час початку',
  'schedule.toAria': 'Правило {n}: час завершення',
  'toast.scheduleTimeFormat': 'Вкажіть час у форматі 22:00.',
  'toast.scheduleEnded': 'Розклад завершився — повернулися попередні пороги.',
  'toast.scheduleApplied': 'Розклад увімкнув профіль «{name}».',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'Що робить сповіщення. ',
  'alerts.noteText': 'Пильнує один показник і озивається лише тоді, коли той безперервно тримає вибрану зону протягом встановленого часу. Ніколи не зупиняє вимірювання і не затуляє кнопок.',
  'alerts.toggle': 'Увімкнути сповіщення про експозицію',
  'alerts.toggleSub': 'Працюють лише під час вимірювання, що триває.',
  'alerts.metric': 'Показник під наглядом',
  'alerts.level': 'Від якої зони',
  'alerts.level.warning': 'Від попередження і вище',
  'alerts.level.critical': 'Лише критичної',
  'alerts.sustain': 'Через скільки секунд безперервно',
  'alerts.sustainHelp': 'Коротший час дає більше хибних тривог, коли ви пересуваєте телефон.',
  'alerts.sound': 'Короткий звуковий сигнал',
  'alerts.soundSub': 'Звук генерується локально. Його можна також вимкнути глобально на екрані «Більше».',
  'alerts.barTitle': 'Сповіщення про експозицію',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} тримає зону попередження вже {seconds} с — зараз {value} {unit}.',
  'alerts.message.critical': '{name} тримає критичну зону вже {seconds} с — зараз {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'Як порівнювати. ',
  'compare.noteText': 'Запустіть вимірювання, спрямуйте камеру на перше джерело і збережіть його як A. Не змінюючи ні відстані, ні кута, перемкніть світло і збережіть B. Порівняння має сенс лише тоді, коли сцена та сама.',
  'compare.slotA': 'Світло A',
  'compare.slotB': 'Світло B',
  'compare.save': 'Зберегти поточний відлік',
  'compare.savedAt': 'Збережено {date}, {time}',
  'compare.empty': 'Ще нічого не збережено.',
  'compare.verdictTitle': 'Результат порівняння',
  'compare.verdictEmpty': 'Збережіть обидва світла, щоб побачити, яке з них лагідніше.',
  'compare.notEnough': 'Замало даних, щоб порівняти ці два виміри.',
  'compare.tie': 'Обидва джерела виходять практично однаково ({metric}: {a} і {b} {unit}). Різниця вкладається в шум вимірювання.',
  'compare.betterA': 'Лагідніше світло A — {metric} становить {better} {unit} проти {worse} {unit}.',
  'compare.betterB': 'Лагідніше світло B — {metric} становить {better} {unit} проти {worse} {unit}.',
  'compare.clear': 'Очистити порівняння',
  'toast.compareSavedA': 'Світло A збережено.',
  'toast.compareSavedB': 'Світло B збережено.',
  'toast.compareCleared': 'Порівняння очищено.',
  'toast.measureFirst': 'Спершу запустіть вимірювання на екрані «Вимір».',

  /* Nazwa wielkości w środku zdania. Po ukraińsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. */
  'metric.share.nameLower': 'частка синього',
  'metric.brightness.nameLower': 'яскравість сцени',
  'metric.kelvin.nameLower': 'колірна температура',
  'metric.melanopic.nameLower': 'циркадний вплив',
  'metric.flicker.nameLower': 'мерехтіння',
  'metric.uniformity.nameLower': 'рівномірність',
  'metric.comfort.nameLower': 'зоровий комфорт',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'Чому це працює. ',
  'calib.noteText': 'Матриця камери має сталий відхил між каналами. Вимірювання білого аркуша показує, наскільки він великий, і дає змогу його відняти. Це єдина функція в цьому застосунку, яка справді підвищує точність — і вона все одно не перетворює камеру на спектрометр.',
  'calib.step1': 'Покладіть білий аркуш під світлом, яке вимірюєте',
  'calib.step2': 'Запустіть вимірювання і заповніть кадр аркушем',
  'calib.step3': 'Натисніть «Калібрувати» і не рухайте телефоном 3 секунди',
  'calib.done': 'Відкалібровано {date}, {time}.',
  'calib.none': 'Немає калібрування. Вимірювання працює, значення сприймайте порівняльно.',
  'calib.gain': 'Підсилення {channel}',
  'calib.gainsLabel': 'Підсилення каналів',
  'calib.gainsUnset': 'не встановлено',
  'calib.start': 'Калібрувати (3 с)',
  'calib.clear': 'Видалити калібрування',
  'toast.calibCleared': 'Калібрування видалено.',
  'calib.error.noEngine': 'Модуль вимірювання недоступний.',
  'calib.error.notRunning': 'Спершу запустіть вимірювання і спрямуйте камеру на білий аркуш.',
  'calib.error.busy': 'Калібрування вже триває.',
  'calib.error.tooFewSamples': 'Замало відліків. Перевірте, чи вимірювання справді працює.',
  'calib.error.tooDark': 'Зображення надто темне для калібрування. Освітліть аркуш і спробуйте ще раз.',
  'calib.error.tooSkewed': 'Відхил каналів надто великий, щоб визнати його калібруванням. Скористайтеся білим аркушем у рівному світлі.',
  'calib.ok': 'Відкалібровано. Колірна температура і меланопічний вплив тепер будуть точнішими.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'Для чого це служить. ',
  'screencheck.noteText': 'П’ять кроків перевіряють монітор так, як його перевіряють в огляді: білий колір за двох яскравостей, рівномірність підсвітки і те, чи системний нічний режим справді щось змінює. Майстер читає вимірювання, яке вже триває; сам його не запускає.',
  'screencheck.step.white100.title': 'Білий при повній яскравості',
  'screencheck.step.white100.hint': 'Відкрийте білу сторінку на моніторі, встановіть яскравість на максимум і заповніть кадр екраном.',
  'screencheck.step.white20.title': 'Білий при низькій яскравості',
  'screencheck.step.white20.hint': 'Зменште яскравість монітора приблизно до однієї п’ятої і не змінюйте кадру.',
  'screencheck.step.corners.title': 'Кути екрана',
  'screencheck.step.corners.hint': 'Поверніться до повної яскравості і покажіть камері весь екран — перевіряємо рівномірність підсвітки.',
  'screencheck.step.nightOff.title': 'Нічний режим вимкнено',
  'screencheck.step.nightOff.hint': 'Переконайтеся, що фільтр синього світла вимкнений.',
  'screencheck.step.nightOn.title': 'Нічний режим увімкнено',
  'screencheck.step.nightOn.hint': 'Увімкніть системний фільтр синього світла і повторіть той самий кадр.',
  'screencheck.stepHeading': 'Крок {n} з {total}: {title}',
  'screencheck.idleTitle': 'Майстер не запущений',
  'screencheck.idleHint': 'Запустіть вимірювання на екрані «Вимір», потім поверніться сюди і натисніть «Почати».',
  'screencheck.next': 'Зберегти крок і йти далі',
  'screencheck.cancel': 'Перервати',
  'screencheck.start': 'Почати майстра',
  'screencheck.clearResult': 'Очистити результат',
  'screencheck.resultTitle': 'Результат',
  'screencheck.resultEmpty': 'Ще не збережено жодного кроку.',
  'screencheck.resultPartial': 'Збережено {done} з {total} кроків. Висновки з’являться, коли буде що порівнювати.',
  'screencheck.note.uniformityLow': 'Рівномірність підсвітки становить {value}% — у кадрі помітні виразні різниці яскравості.',
  'screencheck.note.uniformityOk': 'Підсвітка рівна ({value}%).',
  'screencheck.note.nightWorks': 'Нічний режим знижує частку синього на {value} відсоткового пункту — працює.',
  'screencheck.note.nightWeak': 'Нічний режим змінює частку синього лише на {value} відсоткового пункту. Це менше, ніж зазвичай дає системний фільтр.',
  'screencheck.note.pwm': 'При низькій яскравості мерехтіння зростає з {from}% до {to}% — це типова ознака імпульсного затемнення (PWM).',
  'toast.screencheckDone': 'Майстра завершено. Результат нижче.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'Звідки ці числа. ',
  'reports.noteText': 'Звіт обчислюється з історії, збереженої на цьому пристрої — по одній точці на п’ять секунд. Рушій збирає її від першого вимірювання, тож звіт готовий одразу.',
  'reports.rangeAria': 'Діапазон звіту',
  'reports.day': 'Остання доба',
  'reports.week': 'Останні 7 днів',
  'reports.date': 'Звіт за {date}.',
  'report.headerDay': 'Доба з {from} до {to} — {count}.',
  'report.headerWeek': 'Тиждень з {from} до {to} — {count}.',
  'count.points': { one: '{n} точка', few: '{n} точки', many: '{n} точок', other: '{n} точки' },
  'count.samples': { one: '{n} відлік', few: '{n} відліки', many: '{n} відліків', other: '{n} відліку' },
  'report.emptyTitle': 'Немає даних за цей період',
  'report.emptyText': 'Запустіть вимірювання на екрані «Вимір» — історія зберігається сама.',
  'report.colAvg': 'Середнє',
  'report.colMin': 'Мінімум',
  'report.colMax': 'Максимум',
  'report.zonesTitle': 'Розподіл зон',
  'report.worstHour': 'Найгірша пора доби',
  'report.worstHourNone': 'немає виразної',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'Що з цим зробити',
  'report.disclaimerTitle': 'Це не порада щодо здоров’я. ',
  'report.disclaimerText': 'Висновки випливають виключно з того, що побачила камера цього телефона. Застосунок не вимірює спектра, не знає люксів і не ставить жодного діагнозу.',

  'advice.melanopic': 'Середній циркадний вплив становив {value}×. Увечері варто спуститися нижче 0,50 — найпростіше тепліша лампа або нічний режим.',
  'advice.kelvin': 'Світло було холодне (у середньому {value} K). Для роботи це бездоганно; за дві години до сну краще нижче 3000 K.',
  'advice.flicker': 'Виявлено помітне мерехтіння (у середньому {value}%). Зазвичай за нього відповідає дешевий димер або блок живлення підсвітки.',
  'advice.uniformity': 'Світло розподіляється нерівномірно ({value}%). Пересунути лампу або змінити кут зазвичай дає більше, ніж замінити лампочку.',
  'advice.worstHour': 'Найгірша пора доби — {hour}:00: саме там збирається найбільше відліків поза нормою.',
  'advice.none': 'За цей період ніщо не виходить за норму. Найбільше зараз дало б порівняння двох джерел світла в порівнянні A/B.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'Формат файлу. ',
  'export.noteText': 'Крапка з комою як роздільник стовпців, кома як десятковий роздільник, кодування UTF-8 з міткою BOM. Такий файл Excel з українськими регіональними налаштуваннями відкриває без жодного налаштування.',
  'export.range': 'Діапазон даних',
  'export.columns': 'Стовпці у файлі',
  'export.chipFilled': ' — стовпець заповнений',
  'export.help': 'Файл містить усі сім стовпців — рушій обчислює їх від першого вимірювання, і всі вони потрапляють до файлу.',
  'export.run': 'Зберегти файл CSV',
  'export.previewEmpty': 'Немає відліків у цьому діапазоні. Запустіть вимірювання — історія зберігається сама.',
  'csv.range.hour': 'Остання година',
  'csv.range.day': 'Остання доба',
  'csv.range.week': 'Останні 7 днів',
  'csv.range.month': 'Останні 30 днів',
  'csv.colDate': 'Дата',
  'csv.colTime': 'Час',
  'csv.colZone': 'Зона',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'У вибраному діапазоні немає жодного відліку.',
  'toast.exportFailed': 'Цей браузер не дозволив зберегти файл.',
  'toast.exportSaved': {
    one: 'Збережено файл {filename} ({n} рядок).',
    few: 'Збережено файл {filename} ({n} рядки).',
    many: 'Збережено файл {filename} ({n} рядків).',
    other: 'Збережено файл {filename} ({n} рядка).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} год {m} хв',
  'duration.ms': '{m} хв {s} с',
  'duration.s': '{s} с'
});
