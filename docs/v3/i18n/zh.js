/* docs/v3/i18n/zh.js — słownik WŁASNY wersji v3, chiński (uproszczony).
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/zh.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js tego katalogu — pilnuje
 * tego docs/shared/i18n/keys.test.js. Kluczy, które stoją w słowniku wspólnym
 * (nazwy stref, zdania oceniające, noty o granicach metody, nazwy i opisy
 * siedmiu wielkości, zastrzeżenie z rozporządzenia (UE) 2017/745), tu NIE MA —
 * poza jednym świadomym nadpisaniem, opisanym przy 'verdict.critical.comfort'.
 *
 * TERMINOLOGIA jest przepisana ze słownika wspólnego docs/shared/i18n/zh.js
 * i nie ma od niej wyjątków: 蓝光占比 (udział niebieskiego), 场景亮度 (jasność
 * sceny), 色温 (temperatura barwowa), 昼夜节律影响 wraz z 黑视素比值 (wpływ na
 * rytm dobowy, współczynnik melanopiczny), 频闪 (migotanie), 均匀度
 * (równomierność), 视觉舒适度 (komfort wzrokowy). Strefy: 正常 / 注意 / 严重 /
 * 无数据. Nazwa aplikacji: 光线监测器. Symbole jednostek (%, K, ×, Hz) i nazwy
 * formatów (CSV, JSON) zostają bez zmian.
 *
 * SŁOWNICTWO WŁASNE WERSJI wzięte z docs/v4/i18n/zh.js — v3 i v4 to ten sam
 * produkt i stoją w jednej powłoce, więc ta sama rzecz nie może się nazywać
 * w nich inaczej: pulpit — 主面板, kanał główny — 主通道, wielkość — 指标,
 * strefa — 区间, odczyt — 读数, próg — 阈值 (注意阈值, 严重阈值), rejestrator —
 * 记录仪, kalibracja — 校准, sesja pomiaru — 测量, profil progów — 方案,
 * taśma — 时间带, plansza — 测试图, harmonogram — 定时提醒.
 *
 * ZASTRZEŻENIA MEDYCZNE i akapity o prywatności przetłumaczone WIERNIE, zdanie
 * w zdanie — bez osłabiania, bez wzmacniania i bez skracania. To zdania
 * o skutkach prawnych.
 *
 * INTERPUNKCJA pełnej szerokości (，。、：？“ ”) zgodnie z normą dla pisma
 * uproszczonego. Myślnik wtrącenia zapisujemy jako 破折号 „——” bez spacji, tak
 * jak w docs/shared/i18n/zh.js — oba pliki stoją obok siebie w jednym zdaniu
 * interfejsu i nie mogą różnić się znakiem.
 *
 * ZAPIS LICZB WE WZORACH. Polska redakcja pisze przecinek dziesiętny
 * („0,3320”), chińska kropkę („0.3320”) — wzory czyta człowiek, a nie parser.
 * Liczby wstawiane przez '{…}' są osobną sprawą: te formatuje warstwa językowa
 * według aktywnego języka.
 */
window.I18nData = window.I18nData || {};
window.I18nData['zh'] = Object.assign(window.I18nData['zh'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. Pismo chińskie
     nie zna wielkich liter, więc znak w znak jak 'app.name'. */
  'app.wordmark': '光线监测器',

  'state.idle': '就绪',
  'state.starting': '正在启动',
  'state.running': '测量中',
  'state.runningTpl': '测量中 {time}',
  'state.stopped': '已停止',
  'state.error': '相机错误',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5.0 po chińsku, 5,0 po polsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': '开始测量',
  'keys.starting': '正在启动…',
  'keys.stop': '停止',
  'keys.flip': '切换',
  'keys.flipAria': '切换前置或后置相机',
  'keys.menu': '菜单',
  'keys.menuAria': '模块列表',
  'keys.back': '‹ 返回',
  'keys.backAria': '返回主面板',
  'keys.dash': '主面板',
  'keys.zoom': '放大预览',
  'keys.retry': '重试',
  'keys.refresh': '刷新',
  'keys.close': '关闭',
  'keys.show': '显示',
  'keys.apply': '应用',
  'keys.remove': '删除',

  'monitor.legend': '监看预览',
  'monitor.badge': '实时',

  'aim.title': '对准',
  'aim.hint': '取景框显示的正是应用所测量的那一块画面。',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': '主通道',
  'readout.thresholdTpl': '（阈值 {value}）',
  'readout.contextTpl': '最小 {min} · 平均 {avg} · 最大 {max}——最近 60 秒',
  'readout.contextEmpty': '最近 60 秒没有数据',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': '这是什么意思：{name}',
  'aria.channel': '{name}，{value}，{zone}。在大显示区上显示。',
  'aria.channelStale': '{name}，无数据。在大显示区上显示。',
  'aria.scale': '刻度：{name}，从 {min} 到 {max}。当前 {value}，{zone}。注意阈值 {warn}，严重阈值 {crit}。',
  'aria.readout': '{name}：{value}，{zone}。',
  'aria.readoutApprox': '{name}：约 {value}，{zone}。这是近似值。',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': '主通道刻度。无数据',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': '按“开始测量”，把手机对准被照亮的表面，拿稳几秒钟。',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': '视觉舒适度很低。到模块 01 里看看是什么拉低了它。',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': '先按屏幕下方的“开始测量”键。相机在你按下之后才会打开。',
  'transient.measureStopped': '测量结束 · {time} · 已保存到历史记录。',
  'transient.newVersion': '应用有新版本。',
  'transient.thresholdsSaved': '阈值已保存。',
  'transient.thresholdsRejected': '未保存——注意阈值和严重阈值不能交错。',
  'transient.historyCleared': '历史记录已清空。',

  'live.lead': '主通道：{name}，{value}，{zone}。',
  'live.ready': '结论已给出。{name} {value}，{zone}。',
  'live.started': '测量已开始。',
  'livebar.stopped': '测量已停止',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': '还没有任何记录。历史记录是在测量过程中写入的——先测量一分钟，再回到这里。',
  'empty.recorderNoRange': '这个范围内没有测量。',
  'empty.coverageTpl': '测量覆盖了 {total} 小时中的 {done} 小时。',
  'empty.reportsNoData': '日报会在第一个有测量的完整日子之后出现。',
  'empty.compareOneSession': '对比需要两次已结束的测量。目前只有一次。',
  'empty.exportNoData': '没有可导出的东西。开始测量，历史记录里才会有内容。',
  'empty.alertsOff': '警报已关闭。即使打开，它们也只在应用处于打开状态时才起作用。',
  'empty.scheduleEmpty': '还没有设定任何时间。定时提醒只在应用打开时才起作用。',
  'empty.historyEmpty': '历史记录是空的。',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': '模块列表',

  'modules.01.title': '记录仪',
  'modules.01.desc': '测量随时间的变化过程，从一分钟到三十天。',
  'modules.02.title': '阈值',
  'modules.02.desc': '为每一项指标设定你自己的注意与严重界线。',
  'modules.03.title': '校准',
  'modules.03.desc': '以已知光源作参照，以及校准修不好的东西。',
  'modules.04.title': '报告',
  'modules.04.desc': '按打印稿排版的日报和周报。',
  'modules.05.title': '导出',
  'modules.05.desc': '把读数保存为 CSV 或 JSON 文件，并附上各列的说明。',
  'modules.06.title': '对比',
  'modules.06.desc': '两次测量并排放，差值以数字给出。',
  'modules.07.title': '屏幕测试',
  'modules.07.desc': '用来检查自己显示器的测试图，一步一步来。',
  'modules.08.title': '定时提醒',
  'modules.08.desc': '在你选定的时间进行测量。',
  'modules.09.title': '警报',
  'modules.09.desc': '越过阈值之后的提示——以及它什么时候不起作用。',
  'modules.10.title': '支持',
  'modules.10.desc': '应用完全免费。可以在这里请作者喝杯咖啡。',
  'modules.11.title': '文档',
  'modules.11.desc': '这个测量是什么，以及它肯定不是什么。',
  'modules.12.title': '设置',
  'modules.12.desc': '主题、文字大小、减少动效、清空历史记录。',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': '测量通道',
  'channels.pick': '在大显示区上显示',
  'channels.stale': '无数据',
  'channels.approx': '近似值',

  'help.unit': '单位',
  'help.range': '范围',
  'help.thresholds': '阈值',
  'help.warn': '注意阈值',
  'help.crit': '严重阈值',
  'help.now': '当前',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „指标” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': '指标',
  'col.unit': '单位',
  'col.range': '范围',
  'col.direction': '方向',
  'col.time': '时间',
  'col.date': '日期',
  'col.zone': '区间',
  'col.avg': '平均值',
  'col.min': '最小值',
  'col.max': '最大值',
  'col.name': '列',
  'col.meaning': '内容',
  'col.channel': '通道',
  'col.gain': '增益',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': '时间范围',
  'recorder.range.60s': '60 秒',
  'recorder.range.15min': '15 分钟',
  'recorder.range.1h': '1 小时',
  'recorder.range.24h': '24 小时',
  'recorder.range.30d': '30 天',
  'recorder.gap': '无测量',
  'recorder.sessionTitle': '本次测量统计',
  'recorder.zonesCaption': '蓝光占比的区间分布',
  'recorder.tableCaption': '所选范围内的读数',
  'recorder.crosshair': '读数十字线',
  'recorder.prevAria': '更早的点',
  'recorder.nextAria': '更晚的点',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': '外观',
  'settings.themeLabel': '主题',
  'settings.themeSystem': '跟随系统',
  'settings.themeLight': '浅色',
  'settings.themeDark': '深色',
  'settings.themeHint': '“跟随系统”主题会随手机的设置一起变化。',
  'settings.textLabel': '文字大小',
  /* Mnożnik jako LICZBA we wstawce — 1.15 po chińsku, 1,15 po polsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': '放大的是整个界面，不只是字——按键和行会随文字一起变大。',
  'settings.motionGroup': '动效',
  'settings.motionLabel': '减少动效',
  'settings.motionHint': '关掉所有过渡动画。刻度指针这时每秒跳一次，而不是平滑滑动。',
  'settings.dataTitle': '数据',
  'settings.clearLabel': '清空历史记录',
  'settings.clearHintTpl': '历史记录中现在有 {count} 个已保存的点。',
  'settings.clearHintEmpty': '历史记录是空的。',
  'settings.clearTitle': '要清空历史记录吗？',
  'settings.clearConfirm': '要清空全部测量历史吗？这无法撤销。',
  'settings.clearKey': '清空',
  'settings.aboutTitle': '关于应用',
  'settings.versionTpl': '{app}，版本 {version}。',
  'settings.offlineText': '应用不联网也能运行。首次打开之后，它的所有文件都存在浏览器里，所以飞行模式不会改变任何事。没有任何内容被发送到任何服务器，因为应用不发出网络请求。',
  'settings.docsKey': '打开文档',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': '取消',
  'common.save': '保存',
  'common.reset': '恢复默认',
  'common.yes': '是',
  'common.no': '否',
  'common.on': '已开启',
  'common.off': '已关闭',
  'common.sep': ' · ',
  'common.stepsTitle': '一步一步来',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': '为什么要设自己的阈值',
  'modules.02.intro': '阈值决定应用什么时候说“注意”，什么时候说“严重”。默认值是我们的编辑判断，不是标准——如果你在别的条件下测量，就把它们挪到适合自己的位置。结论和主面板上的那句话会立刻按新的阈值计算。',
  'modules.02.orderNormal': '注意阈值必须低于严重阈值。',
  'modules.02.orderInvert': '这里数值越高越好，所以注意阈值位于严重阈值之上。',
  'modules.02.sliderAriaTpl': '{name}——{which}',
  'modules.02.previewAriaTpl': '刻度预览：{name}',
  'modules.02.nowTpl': '当前 {value}',
  'modules.02.resetDone': '已恢复默认阈值。',
  'modules.02.profilesTitle': '方案',
  'modules.02.profilesHint': '一个方案就是七项指标阈值的一整套保存。应用某个方案会把它们一次全部换掉。',
  'modules.02.profileSaveKey': '保存当前阈值',
  'modules.02.profileNameLabel': '新方案的名称',
  'modules.02.profileNameHint': '名称只留在这台设备上。最多 40 个字符。',
  'modules.02.profileNameEmpty': '请输入方案名称。',
  'modules.02.profileSavedTpl': '已保存方案“{name}”。',
  'modules.02.profileAppliedTpl': '已应用方案“{name}”。',
  'modules.02.profileRemovedTpl': '已删除方案“{name}”。',
  'modules.02.profileFailed': '无法应用这个方案。',
  'modules.02.profileCustomTpl': '你自己的方案，保存于 {date}。',
  'modules.02.builtin.default.name': '默认',
  'modules.02.builtin.default.desc': '来自指标目录的阈值——所有测量的出发点。',
  'modules.02.builtin.evening.name': '夜晚——温和',
  'modules.02.builtin.evening.desc': '更早地就冷色光和昼夜节律影响发出提醒。',
  'modules.02.builtin.work.name': '桌前工作',
  'modules.02.builtin.work.desc': '允许明亮的冷色日光；盯紧频闪和均匀度。',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': '这为什么有用',
  'modules.03.why': '相机传感器在各通道之间有固定的偏差。测一张白纸就能看出这个偏差有多大，并把它减掉。这是本应用中唯一真正提高准确度的功能——而它仍然不能把相机变成光谱仪。',
  'modules.03.steps.1': '把一张白纸放在要测量的光下面。',
  'modules.03.steps.2': '在主面板上按“开始测量”，让白纸填满画面。',
  'modules.03.steps.3': '回到这里，按“校准”，三秒钟内不要动手机。',
  'modules.03.runKey': '校准（3 秒）',
  'modules.03.clearKey': '删除校准',
  'modules.03.busyTpl': '正在测量白纸…还剩 {sec} 秒',
  'modules.03.statusNone': '没有校准。测量照常工作，请把数值当作比较用。',
  'modules.03.statusOnTpl': '已于 {date} {time} 校准。',
  'modules.03.gainsTitle': '通道增益',
  'modules.03.gainR': '红',
  'modules.03.gainG': '绿',
  'modules.03.gainB': '蓝',
  'modules.03.gainsNone': '未设定',
  'modules.03.needRunning': '请先开始测量，并把相机对准一张白纸。',
  'modules.03.tooFew': '采样太少。请检查测量是否真的在运行。',
  'modules.03.tooDark': '图像太暗，无法校准。请把白纸照亮一些再试一次。',
  'modules.03.refused': '通道偏差太大，不能当作校准。请在均匀的光下使用白纸。',
  'modules.03.done': '已校准。色温和昼夜节律影响现在会更准确。',
  'modules.03.cleared': '校准已删除。',
  'modules.03.limitsTitle': '校准修不好什么',
  'modules.03.limits.1': '校准只是把相机的三个通道拉平，仅此而已。它不会给相机一个光谱，所以色温和昼夜节律影响仍然是由 sRGB 三原色推算出的近似值。',
  'modules.03.limits.2': '它不会把场景亮度变成绝对量——这个数字仍然是相对的。它也不会关掉自动曝光和自动白平衡，而它们会在底层移动读数。',
  'modules.03.limits.3': '它不能挪到别的光上：在某个灯泡下做的校准描述的就是那个灯泡。换了光源就要重做一次。它也丝毫不改变这个测量不是什么——它仍然不是检查，也仍然不能作为诊断疾病的依据。',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': '报告周期',
  'modules.04.rangeDay': '一天',
  'modules.04.rangeWeek': '一周',
  'modules.04.headTpl': '从 {from} 到 {to} · {count} 个历史点。',
  'modules.04.tableTitle': '汇总',
  'modules.04.tableCaption': '所选周期内的平均值、最小值和最大值',
  'modules.04.panoramaTitle': '全景',
  'modules.04.panoramaAriaTpl': '全景：{name}，{span}。',
  'modules.04.panoramaSpanDay': '最近一天按小时划分',
  'modules.04.panoramaSpanWeek': '最近一周按天划分',
  'modules.04.panoramaHint': '柱子的高度和颜色说的是同一件事：正常——矮，注意——中等，严重——满格。底部的一道短横表示这个小时没有测量。',
  'modules.04.coverageDayTpl': '测量覆盖了 {total} 小时中的 {done} 小时。',
  'modules.04.coverageWeekTpl': '测量覆盖了 {total} 天中的 {done} 天。',
  'modules.04.zonesTitle': '区间分布',
  'modules.04.zonesCaptionTpl': '按主通道计算：{name}。',
  'modules.04.worstTpl': '最难熬的时段：{value}。',
  'modules.04.worstNone': '没有明显的',
  'modules.04.worstHourTpl': '{hour} 时',
  'modules.04.adviceTitle': '该拿它怎么办',
  'modules.04.adviceMelanopicTpl': '昼夜节律影响的平均值是 {value}×。晚上不妨降到 0.50 以下——最简单的办法是换更暖的灯泡或打开夜间模式。',
  'modules.04.adviceKelvinTpl': '光偏冷（平均 {value} K）。用来工作没什么问题；睡前两小时，低于 3000 K 会更柔和。',
  'modules.04.adviceFlickerTpl': '能看到明显的频闪（平均 {value}%）。它通常来自廉价的调光器或背光驱动。',
  'modules.04.adviceUniformityTpl': '光分布不均匀（{value}%）。挪动灯的位置或改变角度，通常比换灯泡更有用。',
  'modules.04.adviceWorstTpl': '超出阈值的读数最集中的时刻是 {hour}。',
  'modules.04.adviceNone': '这段时间里没有任何一项越过你设定的阈值。',
  'modules.04.limitsTitle': '这不是健康建议',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': '这些结论仅仅来自这台手机的相机所看到的东西。应用不测量光谱，也不做任何诊断。',
  'modules.04.printHint': '这个页面是照着打印稿设计的：表格和说明文字在纸上、在系统放大镜里和在屏幕阅读器中读起来都一样。',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': '数据范围',
  'modules.05.range1h': '一小时',
  'modules.05.range24h': '一天',
  'modules.05.range7d': '7 天',
  'modules.05.range30d': '30 天',
  'modules.05.csvKey': '保存 CSV 文件',
  'modules.05.jsonKey': '保存 JSON 文件',
  'modules.05.formatTitle': '文件格式',
  'modules.05.formatCsv': 'CSV：用分号分隔各列，小数分隔符是逗号，编码为带 BOM 标记的 UTF-8。区域设置以逗号作小数分隔符的 Excel 打开这种文件时不用做任何设置。',
  'modules.05.formatJson': 'JSON：同样的数据放在“points”字段里，小数点用点号，时间戳以毫秒计——这是格式的要求。',
  'modules.05.resolution': '历史记录每 5 秒保存一个点，最远回溯 30 天。文件里没有每秒五次采样的完整分辨率——引擎只把它保留一分钟。',
  'modules.05.offline': '文件在设备上生成，也留在设备上。导出不连接网络。',
  'modules.05.columnsTitle': '各列说明',
  'modules.05.columnsCaption': '文件的各列及其含义',
  'modules.05.descDate': '取自设备时钟的该点日期，写法为日-月-年。',
  'modules.05.descTime': '该点的时间，精确到秒。',
  'modules.05.descZone': '保存时刻的蓝光占比区间。引擎只为这一项指标保存区间——其余各项请自己按阈值算出来。',
  'modules.05.descMetricTpl': '{short} 单位：{unit}。范围 {min}–{max}。',
  'modules.05.previewTitle': '预览',
  'modules.05.previewHint': '文件的前五行，与保存时完全一致。',
  'modules.05.savedTpl': '已保存文件 {name}——{rows} 行。',
  'modules.05.failed': '这个浏览器不允许保存文件。',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': '应用会把每一次结束的测量保存在这台设备上。选两次，就能在同一条时间带上看到它们，并把差值读成数字。',
  'modules.06.noSessions': '还没有已结束的测量。开始一次测量，把它停下，再回到这里。',
  'modules.06.slotA': '测量 A',
  'modules.06.slotB': '测量 B',
  'modules.06.sessionTpl': '{date}，{time} · {dur}',
  'modules.06.tapeTitle': '时间带',
  'modules.06.tapeAriaTpl': '测量 {slot} 的过程，指标 {name}。',
  'modules.06.tapeHint': '两次测量都拉伸到同样的宽度：一根柱子代表同样的一段时长占比，而不是同一个时刻。高度和颜色的含义与主面板上相同。',
  'modules.06.tapeChannelTpl': '时间带显示的是主通道：{name}。',
  'modules.06.diffTitle': '差值',
  'modules.06.diffCaption': '两次测量的平均值以及它们之间的差值',
  'modules.06.clearKey': '删除已保存的测量',
  'modules.06.cleared': '已删除保存的测量。',
  'modules.06.savedTpl': '已保存这次测量：{dur}。',
  'modules.06.limitsTitle': '这个对比没有告诉你什么',
  'modules.06.limits': '你比较的是两次测量，不是两个光源。如果两次之间取景、距离、时间或手机的摆放变了，差值里也有这些因素。最诚实的对比，是同一个场景在改变照明之前和之后。',
  'modules.06.keepTpl': '最多只记住最近的 {count} 次测量。',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': '测试图会在这台设备上全屏显示。它们是用眼睛看屏幕用的：白色是否均匀，灰色有没有偏色，背光会不会从边角漏出来。',
  'modules.07.steps.1': '把屏幕亮度调到你平常工作时的水平，并关掉系统的夜间模式。',
  'modules.07.steps.2': '从下面的列表里选一张测试图。它会铺满整个屏幕。',
  'modules.07.steps.3': '在大约六十厘米外正对屏幕观看。然后再从侧面看同一张图。',
  'modules.07.steps.4': '用“关闭测试图”键或 Escape 键退出，再看下一张。',
  'modules.07.planesTitle': '测试图',
  'modules.07.exitKey': '关闭测试图',
  'modules.07.showAriaTpl': '显示测试图：{name}',
  'modules.07.planeAriaTpl': '测试图：{name}。关闭键在屏幕下方。',
  'modules.07.plane.white.name': '白',
  'modules.07.plane.white.hint': '找找有没有斑块、偏色和边缘附近发亮的地方。白色在整个表面上应该是同一个颜色。',
  'modules.07.plane.gray75.name': '75% 灰',
  'modules.07.plane.gray75.hint': '灰就该是灰的。偏绿或偏粉说明屏幕的白平衡跑偏了。',
  'modules.07.plane.gray50.name': '50% 灰',
  'modules.07.plane.gray50.hint': '判断偏色最好的一张图。把中间和四角比一比。',
  'modules.07.plane.gray25.name': '25% 灰',
  'modules.07.plane.gray25.hint': '深灰能显出背光漏光和廉价面板上的条带。',
  'modules.07.plane.black.name': '黑',
  'modules.07.plane.black.hint': '在暗房间里，每一处背光漏光和每一个发亮的角都看得见。',
  'modules.07.plane.red.name': '纯红',
  'modules.07.plane.red.hint': '均匀的红色能显出坏掉的子像素和面板的不均匀。',
  'modules.07.plane.green.name': '纯绿',
  'modules.07.plane.green.hint': '绿色承载的亮度最多——在它上面最容易发现坏点。',
  'modules.07.plane.blue.name': '纯蓝',
  'modules.07.plane.blue.hint': '蓝色比白色更能显出屏幕表面的灰尘和污痕。',
  'modules.07.plane.grid.name': '网格',
  'modules.07.plane.grid.hint': '四角的线条应该和中间一样锐利。边缘发虚是图像缩放的问题。',
  'modules.07.warn': '测试图会遮住整个屏幕，也包括带测量键的主面板。这是应用里唯一会这样的地方，所以退出键又大又始终可见。只要测试图还在屏幕上，测量就会继续下去，而且停不下来——关闭测试图才能回到按键。',
  'modules.07.cameraTitle': '这里做不到什么',
  'modules.07.camera': '手机看不见自己的屏幕，所以这些测试图没法用同一台设备来测。要测量显示器，就把测试图显示在显示器上，用手机去测——这是两台不同的设备，两个不同的角色。',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': '定时提醒会在设定的时间提醒你测量。它不会自己打开相机：到点时显示一条提醒，测量仍由你在主面板上按“开始测量”启动。和第一次一样。',
  'modules.08.onlyOpenTitle': '什么时候它不起作用',
  'modules.08.onlyOpen': '定时提醒只在应用打开时才起作用。关掉的浏览器标签页不计时，也不会提醒任何事。我们不申请系统通知权限，也不向网络发送任何内容。',
  'modules.08.enableLabel': '打开提醒',
  'modules.08.timesTitle': '时间',
  'modules.08.timeAriaTpl': '第 {n} 个时间：提醒的时刻',
  'modules.08.addKey': '添加时间',
  'modules.08.removeAriaTpl': '删除 {time} 这个时间',
  'modules.08.addedTpl': '已添加时间 {time}。',
  'modules.08.removedTpl': '已删除时间 {time}。',
  'modules.08.badTime': '请按 22:00 的格式输入时刻。',
  'modules.08.nextTpl': '最近的一次提醒：{time}。',
  'modules.08.nextNone': '提醒已关闭。',
  'modules.08.dueTpl': '计划中的测量时间：{time}。',
  'modules.08.dueKey': '显示主面板',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': '警报只盯一项指标，而且要等它不间断地停在所选区间达到你设定的时长之后才出声。它从不停止测量，也从不遮住按键。',
  'modules.09.enableLabel': '打开警报',
  'modules.09.metricLabel': '要盯的指标',
  'modules.09.levelLabel': '从哪个区间起',
  'modules.09.levelWarning': '从注意起',
  'modules.09.levelCritical': '仅严重',
  'modules.09.sustainLabel': '不间断多少秒之后',
  'modules.09.sustainHint': '时间越短，移动手机时的误报就越多。我们不会低于五秒。',
  'modules.09.soundLabel': '短促的提示音',
  'modules.09.soundHint': '声音在设备上生成。不从网络下载任何内容。',
  'modules.09.cooldownHint': '每两分钟最多一条警报。每次采样都重复的警报，最后只会被永久关掉。',
  'modules.09.whenNotTitle': '警报什么时候不起作用',
  'modules.09.whenNot': '提示在应用内部，不在系统里。应用关闭或退到后台时它不起作用，测量没有运行时不起作用，被盯的指标在那一刻测不出来时也不起作用。我们不申请系统通知权限。',
  'modules.09.firedTpl': '{name}：{zone} 已持续 {sec} 秒——当前 {value}。',
  'modules.09.saved': '警报设置已保存。',
  'modules.09.statusOnTpl': '正在盯：{name}，{level}，持续 {sec} 秒之后。',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': '这个应用是免费的',
  'support.freeText': '七项指标从第一次启动就显示数字。记录仪、阈值、校准、报告、导出、测量对比以及三十天的全部历史，都不需要账号、不收费、没有限制——离线时也一样。这里没有任何东西被留到付费之后才给。',
  'support.whyTitle': '我为什么开口',
  'support.whyText': '光线监测器是我一个人利用业余时间做出来并维护的。你的支持，用来抵付修正问题、在更多手机上测试，以及做模块列表里下一批工具所花的时间。就算没有人出钱，也不会有任何东西停掉。',
  'support.nothingTitle': '捐赠能换来什么',
  'support.nothingText': '什么也换不来。捐赠之后不会解锁任何数字、任何模块、任何设置，因为一切从一开始就是解锁的。剩下的只有一件事：我知道这东西对某个人有用。',
  'support.keyTitle': '如果你想帮忙',
  'support.keyLabel': '请我喝杯咖啡',
  'support.keyAria': '请我喝杯咖啡——会在新标签页中打开外部页面',
  'support.serviceText': '捐赠页面由 Buy Me a Coffee 承载，这也是本应用中唯一的支持方式。应用不会从它那里加载任何脚本、组件或图片——这里只有一个普通的链接，此外什么也没有。',
  'support.privacyText': '按下这个按键会在新标签页中打开一个外部页面，这是唯一有东西离开这台设备的时刻。测量结果、历史记录和设置都留在原处——在这个浏览器的存储里。',
  'support.privacyPendingText': '等地址出现之后，按下这个按键会在新标签页中打开一个外部页面，那将是唯一有东西离开这台设备的时刻。测量结果、历史记录和设置都留在原处——在这个浏览器的存储里。',
  'support.emptyTitle': '捐赠页面还没有接上',
  'support.emptyText': '捐赠页面的地址还没有填进来，所以这里没有一个通向空处的按键。应用的其余部分照常运行——没有任何东西在等这笔捐赠。',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': '这个应用不测量什么',
  'docs.notList.1': '它不测量光谱。相机只有三个宽色彩通道、自动曝光和自动白平衡。',
  'docs.notList.2': '它不测量绝对值。场景亮度是相对指标，不是光度测量的结果。',
  'docs.notList.3': '它不直接测量色温。色温和昼夜节律影响都是由 sRGB 三原色推算出的近似值。',
  'docs.notList.4': '它看不见市电频闪。5 Hz 的采样只能看到低于 2.5 Hz 的脉动——市电的 100 Hz 不在可及范围内，应用永远不会把它作为读数给出。',
  'docs.notList.5': '它不做诊断，也不给健康建议。任何读数都不是这两者中的任何一个。',
  'docs.notList.6': '它不会拿你的光去和任何官方标准比较。阈值只是设置，你可以在模块 02 里改。',
  'docs.whatTitle': '它测量什么，怎么测',
  'docs.whatLead': '手机相机对着被照亮的表面，应用每秒五次算出画面中央那一块里 R、G、B 三个通道的均值。从这三个数字推导出七项读数。',
  'docs.whatCrop': '这一块是画面宽度的中间 60% 和高度的中间 60%——正是“对准”界面上取景框圈出的那个矩形。框外的一切都不计入。',
  'docs.whatRate': '每 200 毫秒一个样本，也就是每秒 5 次。最近一分钟以完整分辨率留在内存里；更早的每 5 秒保存一次，可以回溯三十天。',
  'docs.metricsTitle': '七项指标',
  'docs.formulasTitle': '公式',
  'docs.formula.share.formula': '蓝光占比 = B / (R + G + B) × 100%',
  'docs.formula.share.text': '在 sRGB 数值上直接计算，不做伽马反变换——这是有意的，因为这和应用上一个版本的定义相同，当年设好的阈值现在仍然是同一个意思。它把颜色和亮度分开。',
  'docs.formula.brightness.formula': '亮度 = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': '通道平均值占量程的百分比。自动曝光会在底层移动它，所以这是相对指标——请比较两个场景，而不要把单独一个数字当成测量结果来读。',
  'docs.formula.kelvin.title': '色温——McCamy 近似公式',
  'docs.formula.kelvin.formula': 'n = (x − 0.3320) / (y − 0.1858)\nCCT = −449 n³ + 3525 n² − 6823.3 n + 5520.33',
  'docs.formula.kelvin.text': '先做 sRGB 伽马反变换，再用矩阵按 D65 白点转到 CIE XYZ，算出色度坐标 x、y。McCamy 公式大致在 2000 K 到 12500 K 之间可信。超出这个范围，三次多项式就跑偏了，所以结果会被截断并标为不可信——这时刻度的基线会变成虚线，并出现“超出本方法的范围”这句话。',
  'docs.formula.melanopic.title': '昼夜节律影响——黑视素比值',
  'docs.formula.melanopic.formula': 'mel = 0.0016 R + 0.3110 G + 0.8460 B\nY = 0.2127 R + 0.7152 G + 0.0722 B\n结果 = (mel / Y) × 归一化到中性白为 1.00',
  'docs.formula.melanopic.text': '三个通道都取线性值。真正的量是光谱与黑视素敏感度曲线的积分（峰值约在 490 nm）；相机只有三个宽通道，所以我们按 sRGB 三原色各自的近似波长（R 612 nm、G 549 nm、B 465 nm）用黑视素敏感度给它们加权。变化的方向是可信的，绝对值不可信——所以这个数字旁边有“≈”号。',
  'docs.formula.flicker.formula': '频闪 = (max − min) / (max + min) × 100%',
  'docs.formula.flicker.text': 'IES 的定义，用一段亮度样本窗口算出。频率则由信号穿过均值的次数估算。5 Hz 的采样只能看到低于 2.5 Hz 的调制（奈奎斯特极限），而只有在 0.2 到 2 Hz 之间、幅度从 0.5% 起，我们才把频率当作可信的——低于这个门槛，穿过均值只是传感器噪声，不是光源在脉动。',
  'docs.formula.uniformity.formula': '均匀度 = 最暗的格 / 最亮的格 × 100%',
  'docs.formula.uniformity.text': '我们把这一块画面分成 3×3 的九个格，比较其中最极端的两个。100% 是光分布得完全均匀。屏幕上数值偏低意味着背光漏光或反光，桌面上则意味着灯放得不好。它和舒适度一起，是仅有的越高越好的指标。',
  'docs.formula.comfort.formula': '100 分减去扣分：\n昼夜节律影响高于 0.75——最多 35 分\n光色高于 4000 K——最多 25 分\n频闪高于 5%——最多 25 分\n均匀度低于 60%——最多 15 分',
  'docs.formula.comfort.text': '用一个结论代替六个数字。测不出来的指标不会带来任何扣分——缺数据永远不会冒充好结果。权重是我们的编辑判断，不是标准；所以模块 01 会显示各组成部分的拆解，好让人有不同意这个结论的余地。',
  'docs.rangesTitle': '范围和阈值',
  'docs.rangesLead': '下面的阈值就是此刻生效的那些——如果你在模块 02 里改过，表格显示的是你的数值，不是出厂值。',
  'docs.dirNormal': '越低越柔和',
  'docs.dirInvert': '越高越好',
  'docs.privacyTitle': '数据与隐私',
  'docs.privacyText': '相机图像既不发送也不保存到任何地方——每一帧只留下三个数字。测量结果、阈值和设置都存在这台设备的浏览器存储里。应用不发出任何网络请求，可以离线运行。',
  'docs.mdrTitle': '免责声明',
  'docs.freeText': '应用完全免费，而且会一直如此：七项指标、历史记录、报告、导出和离线模式，都不需要账号、不收费、没有限制。想道谢的人，可以去看模块 10“支持”。',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': '应用没有完整加载',
  'boot.filesTpl': '这些文件没有加载：{list}。',
  'boot.modulesTpl': '这些模块没有报到：{list}——这些条目无法从列表中打开。',
  'boot.modulesRangeTpl': '模块 {from}–{to}',
  'boot.tail': '请刷新页面。如果这样也不行，说明服务器上的文件不完整。',
  'boot.loss.bus': '各模块将互相看不见，测量也无法启动',
  'boot.loss.metrics': '任何数值都不会被算出来',
  'boot.loss.scaleCore': '刻度的几何和数字的格式化都会消失',
  'boot.loss.scaleText': '界面上所有的文字都会消失',
  'boot.loss.shell': '任何模块都打不开',
  'boot.loss.engine': '相机和测量都无法启动',
  'boot.loss.dash': '主面板会是空的'
});
