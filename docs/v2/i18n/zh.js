/* docs/v2/i18n/zh.js — słownik WERSJI 2, chiński (uproszczony).
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/zh.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej.
 *
 * TERMINOLOGIA idzie z docs/shared/i18n/zh.js, bez ani jednego wyjątku:
 *   蓝光占比 (udział niebieskiego), 场景亮度 (jasność sceny), 色温 (temperatura
 *   barwowa), 昼夜节律影响 (wpływ na rytm dobowy), 频闪 (migotanie), 均匀度
 *   (równomierność), 视觉舒适度 (komfort wzrokowy). Kamera to 相机 — tak nazywa
 *   ją warstwa wspólna (engine.*). Strefa w zdaniu to 区间, profil progów to
 *   方案. Symbole jednostek (%, K, ×, Hz), nazwy plików i formatów (CSV, JSON)
 *   zostają bez zmian.
 *
 * INTERPUNKCJA pełnej szerokości (，。：（）“”) zgodnie z normą dla pisma
 * uproszczonego; półpauza zostaje pojedyncza (—), bo napisy w tym interfejsie
 * są krótkie. Spacja domykająca zdanie wiodące ('*.noteTitle', 'more.freeLine')
 * jest po chińsku zbędna — 。 sama tworzy odstęp — więc jej tu nie ma.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (i dlaczego):
 *   'zone.warning'        — wspólne mówi 注意, ta wersja od zawsze mówi
 *                           mocniejsze 警告 (i tym samym słowem liczy strefy);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules — chiński ma jedną kategorię, 'other'. Patrz nagłówek
 * docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['zh'] = Object.assign(window.I18nData['zh'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': '光线监测器 — 测量蓝光',
  'app.description': '光线监测器 — 用手机相机测量光的蓝光占比。七项指标、图表、历史记录。全部功能开放，无需账号，也不收费。',
  'app.skipToContent': '跳到正文',
  'app.measuring': '测量中',
  'app.docsButton': '文档与说明',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — 第 2 版',

  'nav.aria': '主导航',
  'nav.tablistAria': '应用界面',
  'nav.measure': '测量',
  'nav.history': '历史',
  'nav.tools': '工具',
  'nav.support': '支持',
  'nav.more': '更多',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': '文档',
  'panel.thresholds': '阈值与方案',
  'panel.reports': '报告',
  'panel.export': '数据导出',
  'panel.compare': 'A/B 对比',
  'panel.calibration': '白纸校准',
  'panel.screenCheck': '检查我的显示器',
  'panel.schedule': '时间表',
  'panel.alerts': '光照提醒',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': '返回',
  'action.close': '关闭',
  'action.refresh': '刷新',
  'action.apply': '应用',
  'action.delete': '删除',
  'action.hide': '隐藏',
  'action.start': '开始',
  'action.stop': '停止',
  'action.switch': '切换',
  'action.switchAria': '切换相机：前置或后置',
  'action.resetDefaults': '恢复默认',
  'action.reports': '报告',
  'action.exportCsv': '导出 CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': '界面：{name}',
  'a11y.measureStarted': '测量已开始。',
  'a11y.measureStopped': '测量已停止。',
  'a11y.measureStoppedSummary': '测量已停止。时长：{duration}，{samples}。',
  'a11y.zoneAnnounce': '{name}：{zone}，{value} {unit}',
  'a11y.profileApplied': '已应用阈值方案。',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': '确认',
  'dialog.confirm': '确认',
  'dialog.cancel': '取消',
  'dialog.infoTitle': '提示',
  'dialog.ok': '明白了',

  'help.sheetTitle': '指标说明',
  'help.unit': '单位',
  'help.scaleRange': '量程',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': '警告',
  'threshold.crit': '严重',
  'threshold.warnLabel': '警告阈值',
  'threshold.critLabel': '严重阈值',
  'threshold.warnAria': '{name} — 阈值：警告',
  'threshold.critAria': '{name} — 阈值：严重',

  /* ==================================================================
     Drobne złożenia liczby, jednostki i nazwy
     ==================================================================
     Wyglądają na zbędne, ale to właśnie one usuwają z kodu sklejanie
     napisów: szyk „wartość jednostka” i nawias po nazwie nie w każdym
     języku wyglądają tak samo. */

  'value.withUnit': '{value} {unit}',
  'metric.withUnit': '{name}（{unit}）',
  'range.dash': '{min} – {max}',

  /* ==================================================================
     Ekran Pomiar
     ================================================================== */

  'firstRun.title': '如何测量',
  'firstRun.text': '按“开始”，把手机对准被照亮的表面，并稳稳地拿住几秒钟。预览上的取景框标出的，就是应用真正读取的那一块。',
  'firstRun.close': '关闭提示',

  'camera.live': '实时',
  'camera.idle': '相机已关闭。按“开始”，把手机对准被照亮的表面，并稳稳地拿住几秒钟。',
  'camera.stopped': '测量已停止。按“开始”可以再测一次。',

  'error.cameraStart': '无法启动相机。',
  'error.engineMissing': '测量模块没有载入。',

  'metrics.sevenTitle': '七项指标',
  'measure.tilesSub': '每秒刷新 5 次',

  'session.title': '本次测量',
  'session.duration': '测量时长',
  'session.samples': '样本数',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     Chiński nie odmienia rzeczownika przez liczbę, więc licznik nosi tu
     dokładnie to samo słowo co plakietka strefy. */
  'zone.count.good': '正常',
  'zone.count.warning': '警告',
  'zone.count.critical': '严重',

  'note.calibrated': '测量已用白纸校准 — 各通道已拉平。',

  'tile.helpAria': '{name}是什么意思',
  'tile.noMeasurement': '未测量',
  'tile.outOfScale': '超出量程',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': '警告',
  'zone.spoken.warning': '警告',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': '随时间的变化',
  'history.pickHint': '选择指标和范围',
  'history.metricLabel': '指标',
  'history.rangeAria': '图表时间范围',
  'history.emptyTitle': '这个范围内没有数据',
  'history.emptyText': '在“测量”界面开始测量 — 几秒钟后图表就会填满。',
  'history.tableTitle': '最近的读数',
  'history.tableHide': '隐藏表格',
  'history.tableShow': '显示表格',
  'history.tableCaption': '最近的测量读数，最新的在最上面。',
  'history.tableEmpty': '没有读数。请在“测量”界面开始测量。',

  'table.time': '时间',
  'table.metric': '指标',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     dłuższy zapis łamał się na dwie linie. */
  'range.1m': '1 分钟',
  'range.1h': '1 小时',
  'range.24h': '24 小时',
  'range.7d': '7 天',
  'range.30d': '30 天',

  'chart.now': '现在',
  'chart.countSub': {
    other: '所选范围内 {n} 条读数'
  },
  'chart.aria': '{name}，范围 {range}，{count}，最后一个值 {value} {unit}。',
  'chart.ariaZone': '{name}，范围 {range}，{count}，最后一个值 {value} {unit}，区间：{zone}。',
  'chart.ariaEmpty': '{name} — {range} 范围内没有数据。',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': '向导和辅助功能',
  'tools.note': '工具帮你读懂测量结果。它们全部立即可用，而测量本身并不依赖它们。',

  'tool.thresholds.sub': '数值到什么程度该发出警告',
  'tool.compare.sub': '两种光里哪一种更柔和',
  'tool.calibration.sub': '唯一真正提高准确度的功能',
  'tool.screenCheck.sub': '五个步骤，得出关于屏幕的结论',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „阈值时间表”
     kontra „时间表”. Tak było i tak zostaje. */
  'tool.schedule.title': '阈值时间表',
  'tool.schedule.sub': '晚上换一套阈值，不用自己记着',
  'tool.alerts.sub': '严重区间持续太久时给你信号',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': '设置',
  'more.thresholdsSub': '数值到什么程度该发出警告',
  'more.docsSub': '怎样测量，以及这个测量没有告诉你什么',
  'more.appearanceTitle': '外观与无障碍',

  'settings.theme': '主题',
  'theme.auto': '跟随系统',
  'theme.light': '浅色',
  'theme.dark': '深色',

  'settings.textScale': '文字大小',
  'textScale.100': '标准',
  'textScale.115': '较大（115%）',
  'textScale.130': '最大（130%）',

  'settings.contrast': '更高对比度',
  'settings.contrastSub': '更明显的边框和更深的辅助文字。',
  'settings.sound': '提醒声音',
  'settings.soundSub': '光照提醒触发时的一声短提示音。',
  'settings.vibrate': '提醒时振动',
  'settings.vibrateSub': '只在支持振动的设备上有效。',

  'more.dataTitle': '数据',
  'more.clearHistory': '清空测量历史',
  'more.clearHistorySub': '删除本设备上保存的读数。阈值、方案和设置都会保留。',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': '这个应用完全免费。',
  'more.supportLink': '你可以自愿支持它。',

  'dialog.clearHistory.title': '要删除保存的历史吗？',
  'dialog.clearHistory.body': {
    other: '我们会从本设备上删除 {n} 个已保存的测量点。此操作无法撤销。阈值、方案和设置不会受到影响。'
  },
  'dialog.clearHistory.confirm': '删除历史',
  'dialog.clearHistory.cancel': '保留',

  'toast.historyCleared': '测量历史已删除。',
  'toast.screenUnavailable': '这个界面在本版本中还不可用。',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': '这个应用测量什么',
  'docs.leadText': '手机相机看着被照亮的表面，应用每秒五次算出画面中央那一块的 R、G、B 三个通道的平均值。它从这三个数字推出七项指标。',
  'docs.limitsTitle': '方法的边界',
  'docs.limitsText': '相机有三个宽色彩通道、自动曝光和自动白平衡。它不测量光谱，也不知道绝对值，所以亮度是一个相对指标，而不是勒克斯。色温和昼夜节律影响是由 sRGB 三原色推算出的近似值。{rate} Hz 的采样只能看到低于 {limit} Hz 的频闪 — 市电的 100 Hz 不在可及范围内，应用永远不会把它作为读数给出。',

  'note.howTo.repeat.title': '再测一次',
  'note.howTo.repeat.text': '单次读数只是一张快照。测上十几秒，得到的画面更可信。',

  'docs.scale': '量程',
  'docs.direction': '方向',
  'docs.directionHigher': '越高越好',
  'docs.directionLower': '越低越柔和',
  'docs.privacyTitle': '数据与隐私',
  'docs.privacyText': '相机图像不会被发送或保存到任何地方 — 每一帧只留下三个数字。测量结果、阈值和设置都放在这台设备的浏览器存储里。应用不发出任何网络请求，可以离线工作。',
  'docs.freeLine': '全部七项指标、历史记录、图表、工具和离线模式对所有人都可用，无需账号，也不收费。',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': '一切都可以用',
  'support.heroText': '全部七项指标、测量历史、图表、所有工具和离线模式，对所有人立即可用。没有账号，没有限制，也不收费。',
  'support.whyTitle': '我为什么开口',
  'support.whyText': '{app} 是业余时间做出来的，不从任何人身上赚钱：没有广告，不收集数据，也没有什么可卖。维护和继续开发 — 新的指标、修正、在更多手机上测试 — 都要花时间。如果这个应用对你有用，你可以出一份力。你不是非做不可。',
  'support.whatTitle': '捐助能带来什么',
  'support.whatText': '什么也没有。它真的不解锁任何东西，也不让任何事变快 — 捐助之前和之后，应用的样子和用法完全一样。它带来的只有一件事：作者知道这份工作对某个人有用。',
  'support.button': '请我喝杯咖啡',
  'support.pendingTitle': '捐助页面还没有接上',
  'support.pendingText': '这里还没有可以发送支持的地址。等它准备好，就会出现在这个位置 — 在那之前，应用里的一切都照常运作。',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': '这个按钮会在新标签页中打开外部的 Buy Me a Coffee 页面。那是唯一有东西离开这台设备的时刻 — 而且只有在你点击之后才会发生。测量结果、历史记录和设置都留在这里。',
  'privacy.externalPending': '等地址出现后，点击会在新标签页中打开一个外部页面。那将是唯一有东西离开这台设备的时刻。测量结果、历史记录和设置都留在这里。',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js（ui-core.js 中有备用）',
  'boot.need.metrics': '任何数值都算不出来',
  'boot.need.bus': '各个模块会看不见彼此',
  'boot.need.ui': '无法切换界面',
  'boot.need.engine': '相机和测量都不会启动',
  'boot.need.support': '“支持”界面会是空的',
  'boot.need.tools': '“工具”标签页会是空的',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': '这些模块没有载入：{list}。',
  'boot.consoleHint': '请检查 index.html 中 <script> 的顺序和路径。',
  'boot.incompleteTitle': '应用没有完整载入',
  'boot.incompleteText': '{missing} 请刷新页面；如果没有帮助，说明服务器上的文件不完整。',
  'boot.newVersion': '有新版本的应用。',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': '阈值有什么用。',
  'thresholds.noteText': '警告阈值点亮黄色状态，严重阈值点亮红色。改动立刻生效 — 对屏幕上已有的读数也一样。自己的一套阈值可以按名称保存下来，随时再回到它。',
  'thresholds.profilesTitle': '阈值方案',
  'thresholds.profilesSub': '内置的三个和你自己的',
  'thresholds.customName': '自定义方案的名称',
  'thresholds.customPlaceholder': '例如：晚上的卧室',
  'thresholds.save': '保存当前阈值',
  'thresholds.saveHelp': '保存的就是上面设定的这些阈值。',

  'profile.builtin.default.name': '默认',
  'profile.builtin.default.desc': '来自指标目录的阈值 — 所有测量的出发点。',
  'profile.builtin.evening.name': '夜晚 — 柔和',
  'profile.builtin.evening.desc': '对冷色光和昼夜节律影响更早发出警告。',
  'profile.builtin.work.name': '桌前工作',
  'profile.builtin.work.desc': '允许明亮的冷白日光；重点盯住频闪和均匀度。',
  'profile.custom.desc': '{date} 保存的自定义方案。',

  'toast.thresholdsReset': '已恢复默认阈值。',
  'toast.thresholdOrder': '警告阈值必须低于严重阈值。',
  'toast.thresholdOrderInverted': '对这项指标，警告阈值必须高于严重阈值。',
  'toast.profileNameMissing': '请输入方案名称。',
  'toast.profileSaved': '已保存方案“{name}”。',
  'toast.profileApplied': '已应用方案“{name}”。',
  'toast.profileApplyFailed': '无法应用这个方案。',
  'toast.profileRemoved': '方案已删除。',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': '时间表有什么用。',
  'schedule.noteText': '晚上合理的阈值和正午不一样。“从—到”规则会自己替换方案，省得你去记着这件事。时间表从不启动、也从不停止测量。',
  'schedule.toggle': '开启自动切换',
  'schedule.toggleSub': '按设备时钟每分钟检查一次。',
  'schedule.emptyTitle': '没有规则',
  'schedule.emptyText': '用下面的按钮添加第一条规则。',
  'schedule.add': '添加规则',
  'schedule.to': '至',
  'schedule.profile': '方案',
  'schedule.fromAria': '规则 {n}：开始时间',
  'schedule.toAria': '规则 {n}：结束时间',
  'toast.scheduleTimeFormat': '请按 22:00 的格式输入时间。',
  'toast.scheduleEnded': '时间表已结束 — 之前的阈值回来了。',
  'toast.scheduleApplied': '时间表启用了方案“{name}”。',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': '提醒会做什么。',
  'alerts.noteText': '它盯住一项指标，只有当这项指标不间断地停留在所选区间达到你设定的时长时才出声。它从不停止测量，也不会挡住按钮。',
  'alerts.toggle': '开启光照提醒',
  'alerts.toggleSub': '只在测量进行中有效。',
  'alerts.metric': '要盯住的指标',
  'alerts.level': '从哪个区间起',
  'alerts.level.warning': '警告及以上',
  'alerts.level.critical': '仅严重',
  'alerts.sustain': '连续多少秒之后',
  'alerts.sustainHelp': '时间越短，移动手机时误报越多。',
  'alerts.sound': '一声短提示音',
  'alerts.soundSub': '声音在本地生成。也可以在“更多”界面里全局关掉。',
  'alerts.barTitle': '光照提醒',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name}停留在警告区间已有 {seconds} 秒 — 现在是 {value} {unit}。',
  'alerts.message.critical': '{name}停留在严重区间已有 {seconds} 秒 — 现在是 {value} {unit}。',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': '怎样比较。',
  'compare.noteText': '开始测量，把相机对准第一个光源，保存为 A。不改变距离和角度，换一个光源，再保存 B。只有在场景相同的时候，比较才有意义。',
  'compare.slotA': '光源 A',
  'compare.slotB': '光源 B',
  'compare.save': '保存当前读数',
  'compare.savedAt': '已于 {date} {time} 保存',
  'compare.empty': '还什么都没保存。',
  'compare.verdictTitle': '比较结果',
  'compare.verdictEmpty': '把两种光都保存下来，就能看到哪一种更柔和。',
  'compare.notEnough': '数据不足，无法比较这两次测量。',
  'compare.tie': '两个光源的结果几乎一样（{metric}：{a} 和 {b} {unit}）。差异落在测量噪声之内。',
  'compare.betterA': '更柔和的是光源 A — {metric}为 {better} {unit}，另一个是 {worse} {unit}。',
  'compare.betterB': '更柔和的是光源 B — {metric}为 {better} {unit}，另一个是 {worse} {unit}。',
  'compare.clear': '清除比较',
  'toast.compareSavedA': '已保存光源 A。',
  'toast.compareSavedB': '已保存光源 B。',
  'toast.compareCleared': '比较已清除。',
  'toast.measureFirst': '请先在“测量”界面开始测量。',

  /* Nazwa wielkości w środku zdania. Po polsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. Chiński nie
     zna wielkich liter, więc są to dokładnie nazwy z warstwy wspólnej. */
  'metric.share.nameLower': '蓝光占比',
  'metric.brightness.nameLower': '场景亮度',
  'metric.kelvin.nameLower': '色温',
  'metric.melanopic.nameLower': '昼夜节律影响',
  'metric.flicker.nameLower': '频闪',
  'metric.uniformity.nameLower': '均匀度',
  'metric.comfort.nameLower': '视觉舒适度',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': '这为什么有用。',
  'calib.noteText': '相机传感器在各个通道之间有一个固定的偏差。测量一张白纸能看出这个偏差有多大，并把它减掉。这是本应用中唯一真正提高准确度的功能 — 而它仍然不会把相机变成光谱仪。',
  'calib.step1': '把一张白纸放在被测的光下',
  'calib.step2': '开始测量，让白纸填满画面',
  'calib.step3': '按“校准”，并保持手机 3 秒不动',
  'calib.done': '已于 {date} {time} 校准。',
  'calib.none': '尚未校准。测量照常工作，请把数值当作比较用。',
  'calib.gain': '{channel}增益',
  'calib.gainsLabel': '通道增益',
  'calib.gainsUnset': '未设置',
  'calib.start': '校准（3 秒）',
  'calib.clear': '删除校准',
  'toast.calibCleared': '校准已删除。',
  'calib.error.noEngine': '测量模块不可用。',
  'calib.error.notRunning': '请先开始测量，并把相机对准一张白纸。',
  'calib.error.busy': '校准已经在进行中。',
  'calib.error.tooFewSamples': '样本太少。请检查测量是不是真的在运行。',
  'calib.error.tooDark': '图像太暗，无法校准。请把白纸照得亮一些再试一次。',
  'calib.error.tooSkewed': '通道偏差太大，不能当作校准。请在均匀的光下使用白纸。',
  'calib.ok': '已校准。色温和昼夜节律影响现在会更准确。',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': '这是做什么用的。',
  'screencheck.noteText': '五个步骤会像评测那样检查显示器：两种亮度下的白色、背光的均匀度，以及系统的夜间模式是不是真的改变了什么。向导读取正在进行的测量；它自己不会启动测量。',
  'screencheck.step.white100.title': '满亮度下的白色',
  'screencheck.step.white100.hint': '在显示器上打开一个白色页面，把亮度调到最大，让屏幕填满画面。',
  'screencheck.step.white20.title': '低亮度下的白色',
  'screencheck.step.white20.hint': '把显示器亮度降到大约五分之一，不要改变取景。',
  'screencheck.step.corners.title': '屏幕的四角',
  'screencheck.step.corners.hint': '回到满亮度，把整个屏幕拍进画面 — 我们要检查背光的均匀度。',
  'screencheck.step.nightOff.title': '夜间模式关闭',
  'screencheck.step.nightOff.hint': '请确认蓝光过滤已经关闭。',
  'screencheck.step.nightOn.title': '夜间模式开启',
  'screencheck.step.nightOn.hint': '打开系统的蓝光过滤，再拍同样的取景。',
  'screencheck.stepHeading': '第 {n} 步，共 {total} 步：{title}',
  'screencheck.idleTitle': '向导没有运行',
  'screencheck.idleHint': '请在“测量”界面开始测量，然后回到这里按“开始”。',
  'screencheck.next': '保存这一步并继续',
  'screencheck.cancel': '中止',
  'screencheck.start': '开始向导',
  'screencheck.clearResult': '清除结果',
  'screencheck.resultTitle': '结果',
  'screencheck.resultEmpty': '还没有保存任何一步。',
  'screencheck.resultPartial': '已保存 {total} 步中的 {done} 步。等有东西可比的时候，结论就会出现。',
  'screencheck.note.uniformityLow': '背光均匀度为 {value}% — 画面里能看到明显的亮度差异。',
  'screencheck.note.uniformityOk': '背光是均匀的（{value}%）。',
  'screencheck.note.nightWorks': '夜间模式把蓝光占比降低了 {value} 个百分点 — 它起作用。',
  'screencheck.note.nightWeak': '夜间模式只把蓝光占比改变了 {value} 个百分点。这比系统的过滤通常能做到的要少。',
  'screencheck.note.pwm': '在低亮度下，频闪从 {from}% 升到 {to}% — 这是脉宽调光（PWM）的典型症状。',
  'toast.screencheckDone': '向导已结束。结果就在下面。',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': '这些数字从哪里来。',
  'reports.noteText': '报告是从本设备上保存的历史算出来的 — 每五秒一个点。引擎从第一次测量起就在收集它，所以报告立刻就能用。',
  'reports.rangeAria': '报告范围',
  'reports.day': '最近一天',
  'reports.week': '最近 7 天',
  'reports.date': '{date} 的报告。',
  'report.headerDay': '从 {from} 到 {to} 的一天 — {count}。',
  'report.headerWeek': '从 {from} 到 {to} 的一周 — {count}。',
  'count.points': { other: '{n} 个点' },
  'count.samples': { other: '{n} 个样本' },
  'report.emptyTitle': '这段时间内没有数据',
  'report.emptyText': '在“测量”界面开始测量 — 历史会自己保存。',
  'report.colAvg': '平均值',
  'report.colMin': '最小值',
  'report.colMax': '最大值',
  'report.zonesTitle': '区间分布',
  'report.worstHour': '一天中最糟的时段',
  'report.worstHourNone': '没有明显的',
  'report.hour': '{hour}:00',
  'report.adviceTitle': '可以做些什么',
  'report.disclaimerTitle': '这不是健康建议。',
  'report.disclaimerText': '这些结论仅仅来自这部手机的相机所看到的东西。应用不测量光谱，不知道勒克斯，也不作任何诊断。',

  'advice.melanopic': '昼夜节律影响的平均值为 {value}×。晚上值得降到 0.50 以下 — 最简单的办法是换一只更暖的灯泡，或者打开夜间模式。',
  'advice.kelvin': '光偏冷（平均 {value} K）。用来工作没有问题；但睡前两小时，低于 3000 K 更好。',
  'advice.flicker': '检测到明显的频闪（平均 {value}%）。通常是廉价的调光器或背光电源造成的。',
  'advice.uniformity': '光分布得不均匀（{value}%）。挪动灯的位置或改变角度，通常比换灯泡更有用。',
  'advice.worstHour': '一天中最糟的时段是 {hour}:00 — 超出正常范围的读数最集中在那里。',
  'advice.none': '这段时间里没有什么超出正常范围。现在最有价值的，是在 A/B 对比里比较两个光源。',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': '文件格式。',
  'export.noteText': '分号作列分隔符，逗号作小数点，UTF-8 编码并带 BOM 标记。在把逗号当作小数点的区域设置下，Excel 不用做任何设置就能打开这样的文件。',
  'export.range': '数据范围',
  'export.columns': '文件中的列',
  'export.chipFilled': ' — 该列已填充',
  'export.help': '文件包含全部七列 — 引擎从第一次测量起就在计算它们，而且它们全都会进入文件。',
  'export.run': '保存 CSV 文件',
  'export.previewEmpty': '这个范围内没有读数。开始测量吧 — 历史会自己保存。',
  'csv.range.hour': '最近一小时',
  'csv.range.day': '最近一天',
  'csv.range.week': '最近 7 天',
  'csv.range.month': '最近 30 天',
  'csv.colDate': '日期',
  'csv.colTime': '时间',
  'csv.colZone': '区间',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': '所选范围内没有任何读数。',
  'toast.exportFailed': '这个浏览器不允许保存文件。',
  'toast.exportSaved': {
    other: '已保存文件 {filename}（{n} 行）。'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} 小时 {m} 分',
  'duration.ms': '{m} 分 {s} 秒',
  'duration.s': '{s} 秒'
});
