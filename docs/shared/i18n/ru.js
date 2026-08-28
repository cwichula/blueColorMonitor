/* docs/shared/i18n/ru.js — słownik WSPÓLNY, rosyjski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest rosyjski.
 *
 * SKĄD TE ZDANIA: przekład z polskiego (pl.js jest redakcją pierwotną),
 * z angielskim (en.js) jako wzorcem terminologii i rejestru. Ton oryginału —
 * rzeczowy i spokojny, bez marketingu i bez straszenia — został zachowany.
 *
 * TERMINOLOGIA: siedem wielkości nazwano przyjętymi terminami rosyjskimi,
 * po jednym odpowiedniku na pojęcie w całym pliku: «доля синего»,
 * «яркость сцены», «цветовая температура», «циркадное влияние»
 * (меланопический коэффициент), «мерцание», «равномерность»,
 * «зрительный комфорт».
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — i tak ma zostać
 * w każdym z trzydziestu języków (patrz docs/shared/README.md, rozdział
 * „Warstwa językowa”). Klucza, którego nie ma w angielskim, nie wolno tu
 * dopisać: angielski jest wartością zapasową, więc to on wyznacza zestaw.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ru'] = Object.assign(window.I18nData['ru'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu (UE)
     2017/745, gdzie stoi w mianowniku. Rodzaj męski («Монитор») rządzi tam
     orzeczeniem: «не предназначен». */
  'app.name': 'Монитор света',

  /* ---- wybór języka ---- */

  'language.label': 'Язык',
  'language.help': 'Язык всего приложения. Все языки уже есть на этом устройстве — ничего не скачивается и никуда не отправляется.',
  'language.auto': 'Как на устройстве',
  'language.autoHint': 'Следует языку, заданному в телефоне или в браузере.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Доля синего',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'процентов',
  'metric.share.short': 'Какая часть видимого света приходится на синий канал.',
  'metric.share.help': 'Отделяет цвет от яркости — именно это значение меняется, когда вы включаете ночной режим.',

  'metric.brightness.name': 'Яркость сцены',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'процентов',
  'metric.brightness.short': 'Средняя яркость изображения с камеры.',
  'metric.brightness.help': 'Величина относительная, а не люксы — камера незаметно сдвигает её собственной экспозицией.',

  'metric.kelvin.name': 'Цветовая температура',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'кельвинов',
  'metric.kelvin.short': 'Тёплый этот свет или холодный.',
  'metric.kelvin.help': 'Ниже 3000 K свет тёплый и вечером мягче. 6500 K — белый по умолчанию у большинства экранов.',

  'metric.melanopic.name': 'Циркадное влияние',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'раза',
  'metric.melanopic.short': 'Насколько сильно этот свет действует на биологические часы.',
  'metric.melanopic.help': 'Приближение меланопического коэффициента. 1,00 — нейтральный дневной белый; вечером стоит опускаться ниже 0,50.',

  'metric.flicker.name': 'Мерцание',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'процентов',
  'metric.flicker.short': 'Незаметная глазу пульсация источника света.',
  'metric.flicker.help': 'Дешёвые диммеры и подсветки пульсируют. Глаз этого не видит, но это бывает причиной усталости и головной боли.',

  'metric.uniformity.name': 'Равномерность',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'процентов',
  'metric.uniformity.short': 'Равномерно ли свет распределён по кадру.',
  'metric.uniformity.help': 'Низкое значение на экране означает засветку подсветки или отражение; на столе — плохо поставленную лампу.',

  'metric.comfort.name': 'Зрительный комфорт',
  'metric.comfort.unit': 'балл',
  'metric.comfort.unitSpoken': 'баллов',
  'metric.comfort.short': 'Одна оценка вместо шести чисел.',
  'metric.comfort.help': 'Сводит остальные измерения в оценку 0–100 и показывает, что снижает её сильнее всего. Веса — наша редакционная оценка, а не норма.',

  'comfort.penalty.melanopic': 'Циркадное влияние',
  'comfort.penalty.kelvin': 'Холодный цвет света',
  'comfort.penalty.flicker': 'Мерцание',
  'comfort.penalty.uniformity': 'Неравномерное освещение',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': 'Нажмите «Старт», чтобы включить камеру.',
  'engine.starting': 'Включаю камеру…',

  'engine.error.permission': 'Нет разрешения на доступ к камере. Разрешите камеру в настройках браузера и нажмите «Старт» ещё раз.',
  'engine.error.notFound': 'Камера не найдена. Проверьте, есть ли на устройстве камера и не отключена ли она в системе.',
  'engine.error.busy': 'Камера занята другим приложением. Закройте его и попробуйте ещё раз.',
  'engine.error.unknown': 'Не удалось включить камеру.',
  'engine.error.unsupported': 'Этот браузер не даёт этой странице доступ к камере. Откройте приложение по HTTPS или используйте другой браузер.',

  /* ---- strefy ---- */

  'zone.good': 'В норме',
  'zone.warning': 'Внимание',
  'zone.critical': 'Критично',
  'zone.none': 'Нет данных',
  'zone.settling': 'Определяю',

  'zone.spoken.good': 'в норме',
  'zone.spoken.warning': 'внимание',
  'zone.spoken.critical': 'критично',
  'zone.spoken.none': 'нет данных',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'балл',
  'unit.hertz': 'Hz',
  'unit.second': 'с',
  'unit.minute': 'мин',
  'unit.hour': 'ч',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'С этим светом всё в порядке — ничто не выходит за заданные пороги.',
  'verdict.noValue': 'Эту величину сейчас не измерить. Проверьте, не закрыт ли объектив.',
  'verdict.warmup': 'Определяю оценку — подержите телефон неподвижно ещё немного.',

  'verdict.warning.share': 'Заметная часть этого света приходится на синий канал. Вечером его стоит приглушить.',
  'verdict.warning.brightness': 'Сцена яркая — камера работает у верхней границы измерения.',
  'verdict.warning.kelvin': 'Свет довольно холодный. Вечером мягче бывает лампа около 2700 K.',
  'verdict.warning.melanopic': 'Этот свет довольно сильно действует на биологические часы.',
  'verdict.warning.flicker': 'Источник света заметно пульсирует.',
  'verdict.warning.uniformity': 'Свет распределён по кадру неравномерно.',
  'verdict.warning.comfort': 'Зрительный комфорт снижен — на это наложилось сразу несколько причин.',

  'verdict.critical.share': 'Очень много синего. Вечером включите ночной режим или смените источник света.',
  'verdict.critical.brightness': 'Сцена очень яркая. Не измеряйте, направляя камеру прямо на источник света.',
  'verdict.critical.kelvin': 'Свет холодный. Вечером это утомляет глаза сильнее всего — тёплая лампа или ночной режим помогут.',
  'verdict.critical.melanopic': 'Этот свет сильно действует на биологические часы. Вечером стоит опуститься ниже 0,50.',
  'verdict.critical.flicker': 'Источник света сильно пульсирует. Это бывает причиной усталости глаз и головной боли.',
  'verdict.critical.uniformity': 'Свет распределён очень неравномерно. Проверьте положение лампы или отражения на экране.',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'Зрительный комфорт низкий. Загляните в разбор оценки, чтобы увидеть, что её снижает.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'Чего это число не говорит',
  'note.warningTitle': 'Внимание',
  'note.dashTitle': 'Чем это измерение не является',
  'note.dashText': 'У камеры телефона три широких цветовых канала и автоматический баланс белого — она не измеряет спектр. Цветовая температура и циркадное влияние — это приближения, рассчитанные по цветам sRGB. Приложение хорошо показывает различия и изменения во времени, но не заменяет измерительный прибор и не ставит никакого диагноза.',
  'note.approxLegend': '≈ приблизительное значение — рассчитано по цветам sRGB, а не по измерению спектра.',
  'note.kelvinOutOfRange': 'За пределами метода — при таком цвете формула цветовой температуры перестаёт быть достоверной.',
  'note.flickerOutOfRange': 'За пределами метода — выборка {rate} Hz видит пульсацию только ниже {limit} Hz. Сетевые 100 Hz недостижимы, и приложение никогда не покажет их как результат.',
  'note.helpTitle': 'Чего это число не говорит',
  'note.helpText': 'У камеры телефона три широких канала, и спектр она не измеряет. Это значение — сравнительный показатель: оно хорошо показывает различия между источниками света и изменения во времени, но не является ни лабораторным измерением, ни медицинской информацией.',
  'note.calibration': 'Измерение без калибровки — воспринимайте значения как сравнительные.',

  'note.howToTitle': 'Как измерять осмысленно',
  'note.howTo.hold.title': 'Держите телефон неподвижно',
  'note.howTo.hold.text': 'Автоматике экспозиции нужно 2–3 секунды, чтобы стабилизироваться.',
  'note.howTo.aim.title': 'Наводите на освещённую поверхность',
  'note.howTo.aim.text': 'Белый лист бумаги или светлая стена. Не измеряйте, глядя прямо на источник света.',
  'note.howTo.compare.title': 'Сравнивайте, а не оценивайте абсолютно',
  'note.howTo.compare.text': 'Одна и та же сцена до и после смены освещения говорит больше, чем одно число.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr przetłumaczono wiernie, człon po członie. To sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone — nie skraca się go dla stylu. */

  'legal.noDiagnosis': 'Ни один результат не является диагнозом или советом по здоровью.',
  'legal.mdr': '{app} не является медицинским изделием в значении Регламента (ЕС) 2017/745, не предназначен для диагностики, профилактики, мониторинга или лечения какого-либо болезненного состояния и не заменяет обследования у врача или оптометриста.',

  /* ---- prywatność ---- */

  'privacy.title': 'Что покидает это устройство',
  'privacy.short': 'Ничто в этом приложении не отправляет ничего в сеть. Все числа возникают на этом устройстве и здесь же остаются.',
  'privacy.onDevice': 'Камера включится только после нажатия кнопки, а изображение никогда не покидает это устройство.',
  'privacy.external': 'Это единственное место во всём приложении, где что-либо покидает это устройство: кнопка открывает внешнюю страницу в новой вкладке, и происходит это только после её нажатия. Измерения, история и настройки остаются здесь.',
  'privacy.externalPending': 'Когда адрес появится, кнопка будет открывать внешнюю страницу в новой вкладке. Это будет единственный момент, когда что-либо покидает это устройство. Измерения, история и настройки остаются здесь.',
  'privacy.storageBlocked': 'Этот браузер не позволяет ничего сохранить (приватный режим или заблокированные данные сайтов). Измерение работает, но история исчезнет после закрытия вкладки.',

  /* ---- liczebniki ----
     Rosyjski ma cztery kategorie CLDR: one (1, 21, 31…), few (2–4, 22–24…),
     many (0, 5–20, 11–14…) i other — ta ostatnia dotyczy ułamków:
     «1,5 отсчёта». Formę wybiera Intl.PluralRules('ru'), nie nasza reguła. */

  'count.readings': { one: '{n} отсчёт', few: '{n} отсчёта', many: '{n} отсчётов', other: '{n} отсчёта' },
  'count.sessions': { one: '{n} измерение', few: '{n} измерения', many: '{n} измерений', other: '{n} измерения' },
  'count.seconds': { one: '{n} секунда', few: '{n} секунды', many: '{n} секунд', other: '{n} секунды' },
  'count.minutes': { one: '{n} минута', few: '{n} минуты', many: '{n} минут', other: '{n} минуты' },
  'count.hours': { one: '{n} час', few: '{n} часа', many: '{n} часов', other: '{n} часа' },
  'count.days': { one: '{n} день', few: '{n} дня', many: '{n} дней', other: '{n} дня' }
});
