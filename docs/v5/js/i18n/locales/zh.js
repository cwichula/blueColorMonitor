/* Monitor Światła v5 — słownik chiński uproszczony (简体中文, zh-Hans, mainland).
 *
 * TREŚĆ wzięta z pl.js, TERMINOLOGIA i rejestr — z en.js. Nie jest to kalka
 * żadnego z nich: chińskie zdanie buduje się inaczej, więc przekładany był
 * sens, a nie szyk. Bez zmian zostało to, co niesie znaczenie: liczby, progi,
 * jednostki, nazwy wstawek oraz — CO DO TREŚCI — zastrzeżenia medyczne
 * i zdania o prywatności. Tych ostatnich nie wolno osłabiać ani wzmacniać:
 * „nie zastępuje rozmowy z lekarzem” ma po chińsku znaczyć dokładnie tyle
 * samo, a „obraz nie opuszcza urządzenia” nie może stać się obietnicą szerszą
 * niż polska.
 *
 * TERMINOLOGIA siedmiu wielkości (trzymana bez wyjątków, także w tekstach
 * pomocy i w zdaniach opisowych):
 *   蓝光占比 (udział niebieskiego), 场景亮度 (jasność sceny), 色温 (temperatura
 *   barwowa), 昼夜节律影响 (wpływ na rytm dobowy; w opisie: 黑视素比值 —
 *   współczynnik melanopiczny), 频闪 (migotanie — przyjęty termin oświetleniowy,
 *   nie 闪烁), 均匀度 (równomierność), 视觉舒适度 (komfort wzrokowy).
 * STREFY: 安全 / 中等 / 有害 — mówią o świetle, a nie o stanie aplikacji, i wchodzą
 * w zdanie „区间：{zone}”.
 *
 * INTERPUNKCJA pełnej szerokości (，。、：？) zgodnie z normą dla pisma
 * uproszczonego; cudzysłów “ ”, a półpauza zostaje pojedyncza (—, nie ——), bo
 * napisy w tym interfejsie są krótkie i stoją w wąskich kafelkach.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Tekst ze wstawką {nazwa}'   — napis zwykły,
 *   'klucz.kropkowany': { other }                    — forma zależna od liczby.
 * Chiński ma w CLDR JEDNĄ kategorię liczebnika: `other`
 * (new Intl.PluralRules('zh').resolvedOptions().pluralCategories). Odmiany
 * więc nie ma — jest za to klasyfikator (个 / 条 / 次), który wchodzi w skład
 * formy, bo format.plural() skleja „liczba + spacja + wartość formy”.
 * Nazwy wstawek są identyczne jak w pl.js — pilnuje tego keys.test.js.
 * Kolejność wstawek w zdaniu wolno zmieniać (i tak robimy w datach: chiński
 * pisze rok, potem miesiąc, potem dzień), nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': '光线监测',
  'app.description': '光线监测 — 用摄像头测量你周围光线的七项指标。全部计算都在本设备上完成，没有任何数据发往网络。',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — 光线监测',
  'app.skipToContent': '跳到正文',
  'app.nav.aria': '主导航',
  'app.noscript.title': '本应用需要 JavaScript',
  'app.noscript.text': '整个测量都在这个浏览器标签页里进行：由 JavaScript 读取摄像头画面，并从中算出七项光线指标。没有它就无从测量。请为本页启用 JavaScript 并重新打开 — 仍然不会有任何数据发往网络。',

  'nav.measure': '测量',
  'nav.history': '历史',
  'nav.tools': '工具',
  'nav.support': '支持',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': '测量中',
  'shell.live.aria': '测量中。{metric}：{value}。返回测量界面。',
  'shell.live.metricFallback': '主指标',
  'shell.action.fallback': '界面操作',

  'shell.loadFail.title': '无法载入“{screen}”界面',
  'shell.loadFail.text': '设备存储中可能缺少了一部分文件。请连接网络并刷新页面。',
  'shell.fatal.title': '出了点问题',
  'shell.fatal.text': '应用没能把这个界面组装起来。刷新页面通常就够了 — 已保存的测量和设置都留在原处。',
  'shell.fatal.reload': '刷新页面',
  'shell.boot.failTitle': '应用无法启动',
  'shell.boot.failText': '外壳没有启动。请刷新页面 — 已保存的测量和设置都留在原处。',
  'shell.background.error': '后台出了问题',
  'shell.background.action': '刷新',
  'shell.update.title': '有新版本可用',
  'shell.update.action': '刷新',

  'onboarding.title': '开始之前',
  'onboarding.lead': '光线监测用摄像头观察你周围的光，并从中算出七项指标 — 从蓝光占比到视觉舒适度。',
  'onboarding.privacy': '画面绝不离开本设备：没有服务器，没有账号，也没有任何上传。七项指标全部立即可用，无需登录，也不收费。',
  'onboarding.honesty': '这是大致的参考，既不是测量仪器，也不是医学检查。测不出来的，我们就不显示 — 你看到的会是一道短横，而不是数字。',
  'onboarding.start': '开始吧',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': '执行',
  'overlay.toast.close': '关闭提示',
  'overlay.sheet.label': '窗口',
  'overlay.sheet.close': '关闭',
  'overlay.dialog.confirm': '确认',
  'overlay.dialog.cancel': '取消',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': '取消',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: chiński pisze tu przecinek wyliczeniowy 、,
     a nie przecinek zwykły. */
  'common.listSeparator': '、',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': '测量',

  'measure.intro.aria': '开始测量',
  'measure.intro.headline': '看看你被什么光照着',
  'measure.intro.lead': '摄像头会告诉你，此刻落在你身上的光里有多少蓝光 — 以及在一天里的这个时候，是不是太多了。',
  'measure.intro.start': '开始测量',
  'measure.intro.hint': '浏览器会请求使用摄像头的权限。你一同意，测量就开始。',
  'measure.intro.privacy': '摄像头画面在本设备上处理，绝不离开设备。我们不发送、不保存、也不分享任何一帧画面。',

  'measure.live.aria': '测量进行中',
  'measure.badge.starting': '正在启动',
  'measure.badge.paused': '已暂停',
  'measure.badge.running': '测量中',
  'measure.stale': '正在等待画面 — 应用退到后台时，预览会静止。',
  'measure.crop': '我们测量画面的中央 — 标出的区域是图像宽度和高度的 {percent}%。',
  'measure.facing.front': '前置摄像头',
  'measure.facing.back': '后置摄像头',

  'measure.boot.title': '正在启动摄像头…',
  'measure.boot.text': '如果浏览器询问权限，请同意 — 没有画面就无从测量。这个权限只涉及本页面，之后你可以随时撤销。',
  'measure.boot.cancel': '取消',

  'measure.hold': '读数已冻结。摄像头仍在工作，但不会有数据进入历史或平均值。',
  'measure.gridHint': '点选一个磁贴，把该指标移到大表盘上。',

  'measure.stop': '停止',
  'measure.pause': '暂停',
  'measure.resume': '继续',
  'measure.flip.aria': '切换摄像头',
  'measure.flip.toBack': '切换到后置摄像头',
  'measure.flip.toFront': '切换到前置摄像头',

  'measure.fail.aria': '摄像头错误',
  'measure.fail.headline': '摄像头没有启动',
  'measure.fail.retry': '重试',
  'measure.fail.back': '返回',
  'measure.fail.savedSession': '中断之前的那段测量（{duration}）已保存到历史。',
  'measure.error.fallback': '无法启动摄像头。',

  'measure.summary.aria': '本次测量小结',
  'measure.summary.title': '本次测量小结',
  'measure.summary.paused': '暂停了 {duration}',
  'measure.summary.nothingMeasured': '没有一项指标取得读数 — 整段测量期间，摄像头都没有看到光。',
  'measure.summary.note': '平均值只统计暂停之外的样本。没有测到的指标会被略过，而不是按零计算。',
  'measure.summary.nearThreshold': '最接近阈值',
  'measure.summary.worstPoint': '最弱的一项',
  'measure.summary.averageZone': '平均{zone}',
  'measure.summary.tooShort': '这段测量持续了 {duration} — 太短，不会自己进入历史。你可以手动保存。',
  'measure.summary.again': '再测一次',
  'measure.summary.save': '保存到历史',
  'measure.summary.saved': '已保存到历史',
  'measure.summary.savedToast': '本次测量已保存到历史。',
  'measure.summary.close': '关闭',

  'measure.method.title': '我们是怎么测的',
  'measure.method.p1': '应用每秒对摄像头画面采样十次，并从画面中央 {percent}% 的范围算出各项指标 — 预览里的取景框标的正是这块区域。',
  'measure.method.p2': '手机摄像头只有三个宽带通道，还带着自己的一套自动曝光和自动白平衡。它看到的是光的比例，不是光谱。',
  'measure.method.p3': '蓝光占比、亮度、频闪和均匀度，是摄像头真正测到的量。色温和昼夜节律影响则是明说的近似值，由 sRGB 三原色推算而来。',
  'measure.method.p4': '频闪只有低于四赫兹时才看得出来。市电的 100 Hz 远在这个采样率能够到的范围之外，永远不会作为读数给出。',
  'measure.method.p5': '这些数字都不是光度学测量，也不是医学结果。摄像头画面不会离开本设备。',
  'measure.method.ok': '明白了',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': '已取消启动摄像头。',
  'measure.announce.stoppedNoSamples': '测量已停止。没有采集到任何样本。',
  'measure.announce.stopped': '测量已停止。本次小结已就绪。',
  'measure.announce.interrupted': '测量已中断。本次小结已就绪。',
  'measure.announce.paused': '测量已暂停。读数已冻结。',
  'measure.announce.resumed': '测量已继续。',
  'measure.announce.switchedFront': '已切换到前置摄像头。新的一段测量开始了。',
  'measure.announce.switchedBack': '已切换到后置摄像头。新的一段测量开始了。',
  'measure.announce.lead': '主指标：{metric}。',
  'measure.announce.cameraError': '摄像头错误。{message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': '整段测量里，光线都保持在安全范围内 — 灯就这样放着，等天黑、换了另一个光源之后再测一次。',
  'measure.advice.share.evening': '蓝光占比平均为 {value} — 把屏幕切到夜间模式，关掉顶灯，只留一盏桌面高度的暖色台灯。',
  'measure.advice.share.day': '蓝光占比平均为 {value} — 白天还可以接受，但请把屏幕设成睡前两小时自动转为暖色。',
  'measure.advice.brightness': '画面过曝了（平均 {value}） — 离光源远一点，或者调低被测屏幕的亮度，因为在这样的曝光下，其余指标也会跟着失准。',
  'measure.advice.kelvin.evening': '色温平均保持在 {value} — 天黑之后请降到 3000 K 以下：把灯切到暖光模式，或换一只 2700 K 的灯泡。',
  'measure.advice.kelvin.day': '色温平均保持在 {value} — 白天这是不错的、让人清醒的白光，但到了晚上，请把同一盏灯调到 2700 K。',
  'measure.advice.melanopic.evening': '昼夜节律影响平均为 {value} — 睡前两小时请降到 0.50 × 以下：调暗主光源，并从桌面高度打光，而不是从天花板。',
  'measure.advice.melanopic.day': '昼夜节律影响平均为 {value} — 在这个时段，这样的剂量是有益的，但到了晚上，请把这个光源换成更弱、更暖的。',
  'measure.advice.flicker': '频闪平均达到 {value} — 多半是调光器，或是调得很低的背光：把屏幕亮度提到 40% 以上，或把调光器换成不用 PWM 的。',
  'measure.advice.uniformity': '光落得不均匀（平均 {value}） — 把灯放到桌子的侧面，并在对面加一个较弱的第二光源，而不是只用一个强光点。',
  'measure.advice.comfort': '视觉舒适度平均为 {value} — 先只改一件事：把主光源的亮度调低一半，然后再去管光的颜色。',
  'measure.advice.default': '改动照明里的一件事，再测一次 — 两段测量的对比，比单个读数说明的更多。',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': '历史',
  'history.action.export': '导出历史',

  'history.metricGroup.aria': '选择指标',
  'history.announce.metric': '指标：{metric}',
  'history.rangeGroup.aria': '时间范围',
  'history.range.aria': '最近 {range}',

  'history.stats.title': '范围统计',
  'history.stats.head': '{metric}\u00A0—\u00A0最近 {range}',
  'history.stats.note': '统计的是图表上显示的数据。没有测量的时间不计入 — 我们不拿零去顶替它。',
  'history.stat.min': '最小值',
  'history.stat.avg': '平均值',
  'history.stat.max': '最大值',
  'history.trend.up': '在这个范围内上升',
  'history.trend.flat': '没有明显变化',
  'history.trend.down': '在这个范围内下降',
  'history.trend.none': '没有可比较的数据',

  'history.sessions.title': '测量记录',
  'history.sessions.count': '{sessions}，最新在前',
  'history.sessions.empty': '还没有任何记录',
  'history.sessions.hint': '停止测量后，会保存一条记录。',
  'history.session.desc': '{duration} \u00B7 {samples} \u00B7 {relative}',
  'history.session.spread': '范围：{range}',
  'history.session.noMeasure': '没有测到',

  'history.data.title': '数据',
  'history.data.subtitle': '历史只保存在本设备上。',
  'history.export.csv': '导出 CSV',
  'history.export.json': '导出 JSON',
  'history.export.ok': '文件已准备好保存',
  'history.export.fail': '无法准备文件。在隐私模式下，以及在嵌入其他应用的窗口里，浏览器会阻止保存 — 请在普通标签页中打开本页。',
  'history.export.sheet.title': '导出历史',
  'history.export.sheet.text': 'CSV 可以用电子表格打开（分号分隔，小数点写作逗号）。JSON 保留全部内容，包括记录列表和没有测量的空档。',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': '清空历史',
  'history.clear.title': '要清空历史吗？',
  'history.clear.text': '我们会删除{points}和{sessions}。这无法撤销 — 如果想留住数据，请先导出。',
  'history.clear.confirm': '清空',
  'history.clear.announce': '历史已清空。',
  'history.clear.toast': '历史已清空',

  'history.empty.title': '还没有可显示的内容',
  'history.empty.text': '历史会在测量过程中积累起来 — 每秒一个点。所有数据都留在本设备上。',
  'history.empty.action': '去测量',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 分钟',
  'range.5m': '5 分钟',
  'range.1h': '1 小时',
  'range.24h': '24 小时',
  'range.7d': '7 天',
  'range.30d': '30 天',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': '日期和时间',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': '设备存储已满 — 新的测量不再被保存。',
  'storage.blocked': '浏览器不允许保存历史 — 关闭标签页后，数据就会消失。',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': '工具',
  'tools.action.about': '关于测量',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': '语言',
  'tools.language.subtitle': '默认情况下，应用跟随设备的语言；在这张列表里选定的语言立即生效，并留在这个浏览器里。',
  'tools.language.aria': '界面语言',
  'tools.language.system': '自动',
  'tools.language.announce': '界面语言：{language}。',

  'tools.appearance.title': '外观',
  'tools.appearance.theme.title': '主题',
  'tools.appearance.theme.desc': '“自动”跟随系统设置。',
  'tools.appearance.theme.aria': '主题',
  'tools.theme.system': '自动',
  'tools.theme.light': '浅色',
  'tools.theme.dark': '深色',
  'tools.appearance.accent.title': '强调色',
  'tools.appearance.accent.desc': '按钮、选中项和滑块的颜色。',
  'tools.appearance.accent.aria': '强调色',
  'tools.appearance.textScale.title': '文字大小',
  'tools.appearance.textScale.desc': '放大整个界面，不只是说明文字。',
  'tools.appearance.textScale.aria': '文字大小',
  'tools.appearance.density.title': '密度',
  'tools.appearance.density.desc': '紧凑模式能在一屏里放下更多内容。',
  'tools.appearance.density.aria': '布局密度',
  'tools.density.comfortable': '标准',
  'tools.density.compact': '紧凑',
  'tools.appearance.motion.title': '减少动效',
  'tools.appearance.motion.desc': '关闭动画和指针的平滑滑动。不论这里怎么设，系统的设置我们都会遵守。',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': '海洋',
  'accent.violet': '紫罗兰',
  'accent.amber': '琥珀',
  'accent.mint': '薄荷',
  'accent.rose': '玫瑰',

  'tools.thresholds.title': '阈值',
  'tools.thresholds.subtitle': '从哪个值起，应用该说“中等”，又从哪个值起该说“有害”。默认阈值是我们的建议，不是标准 — 请按自己的情况设定。',
  'tools.thresholds.warn': '警告阈值',
  'tools.thresholds.crit': '警报阈值',
  'tools.thresholds.warn.aria': '警告阈值 — {metric}',
  'tools.thresholds.crit.aria': '警报阈值 — {metric}',
  'tools.thresholds.reset': '默认值',
  'tools.thresholds.reset.aria': '恢复默认阈值：{metric}',
  'tools.thresholds.moved': '{threshold}已移到 {value}。',
  'tools.thresholds.resetAll': '恢复全部阈值',
  'tools.thresholds.resetAll.title': '要恢复默认阈值吗？',
  'tools.thresholds.resetAll.text': '七项指标都会回到应用建议的阈值。测量历史不受影响。',
  'tools.thresholds.resetAll.confirm': '恢复',
  'tools.thresholds.resetAll.cancel': '保留',
  'tools.thresholds.resetAll.toast': '阈值已恢复为默认值',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}：',
  'tools.zoneRange.goodAbove': '高于 {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} 及以下',
  'tools.zoneRange.goodBelow': '低于 {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} 及以上',

  'tools.calibration.title': '校准',
  'tools.calibration.subtitle': '给手头有参照的人。',
  'tools.calibration.intro': '两台手机对着同一盏灯，读数会略有不同 — 每个传感器都有自己的色偏。如果你手边有一个信得过的读数，可以在这里把图像的各个通道稍稍调高或调低。乘数在一切计算之前生效，所以会同时改变七项指标。',
  'tools.calibration.neutral': '没有可参照的？就留在 1.00 — 这是出厂设置，不会弄坏任何东西。',
  'tools.calibration.forward': '改动从现在起生效。已经存进历史的测量，保持保存那一刻的样子 — 我们不会回头重算，因为那等于事后改写数据。',
  'tools.calibration.reset': '重置校准',
  'tools.calibration.reset.toast': '校准已重置',
  'tools.calibration.channel.r': '红色通道',
  'tools.calibration.channel.g': '绿色通道',
  'tools.calibration.channel.b': '蓝色通道',
  'tools.calibration.channel.aria': '{channel} — 校准乘数',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': '测量',
  'tools.measurement.wake.title': '不要熄屏',
  'tools.measurement.wake.desc': '测量时屏幕保持点亮。这时电量会掉得更快。',
  'tools.measurement.wake.unsupported': '这个浏览器不允许我们阻止屏幕熄灭。',
  'tools.measurement.haptics.title': '振动',
  'tools.measurement.haptics.desc': '开始、停止和切换指标时，给一次短促的确认。',
  'tools.measurement.haptics.unsupported': '这台设备没有报告振动马达。',

  'tools.about.title': '关于测量',
  'tools.about.subtitle': '七项指标各自到底算的是什么，以及这套方法的可靠之处到哪里为止。',
  'tools.about.scale': '量程：从 {min} 到 {max}。',
  'tools.about.threshold': '从 {warn} 起提示警告，从 {crit} 起发出警报。',
  'tools.about.thresholdInvert': '低于 {warn} 提示警告，低于 {crit} 发出警报。',
  'tools.about.limitsHead': '这项测量做不到什么',
  'tools.about.limit.spectrum.title': '摄像头看颜色，不像仪器那样',
  'tools.about.limit.spectrum.text': '手机里的摄像头有三个通道：红、绿、蓝。测光仪器会把它们分成几十条窄带。你在这里看到的，是从那三个数字推算出来的 — 推算的方式是合理的，但它终究是计算，不是测到的光谱。',
  'tools.about.limit.exposure.title': '摄像头会自己调节亮度',
  'tools.about.limit.exposure.text': '把手机对着窗户，摄像头就会压暗画面，免得过曝。这时“场景亮度”会跟着下降，尽管房间里什么都没变。所以请在同一个取景里比较这个值，而不是在不同房间之间比较。',
  'tools.about.limit.flicker.title': '慢的摄像头抓不住快的频闪',
  'tools.about.limit.flicker.text': '我们每秒检查画面 {hz} 次。快于每秒 {nyquist} 次的脉动，在这样的测量里可能显得比实际更慢，或者干脆消失 — 而市电的频闪正是这么快。如果应用捕捉到了什么，请把它当作“这里有东西在脉动”的信号，而不是测得的频率。',
  'tools.about.limit.medical.title': '这既不是医学检查，也不是医疗建议',
  'tools.about.limit.medical.text': '本应用帮你注意到周围的光偏冷、偏亮或不安定，并提示可以做些什么。它不对你的健康作出判断，也不能取代与医生的交谈，或用专业仪器所作的测量。',
  'tools.about.privacy': '一切都在你的设备上计算。摄像头画面绝不会被发送或保存到任何地方 — 只有算出来的数字会进入存储。',

  'tools.data.title': '数据',
  'tools.data.subtitle': '所有内容都存在这个浏览器里，绝不从这里出去。',
  'tools.data.summary.empty': '目前还没有保存任何测量。',
  'tools.data.summary': '已存储：{points}和{sessions}。',
  'tools.data.export.csv': '导出 CSV',
  'tools.data.export.json': '导出 JSON',
  'tools.data.clear': '清空历史',
  'tools.data.reset': '默认设置',
  'tools.data.reset.title': '要恢复默认设置吗？',
  'tools.data.reset.text': '外观、阈值、校准和测量设置都会回到最初的状态。测量历史不受影响。',
  'tools.data.reset.confirm': '恢复',
  'tools.data.reset.toast': '已恢复默认设置',
  'tools.data.wipe': '删除全部数据',
  'tools.data.wipe.title': '要删除应用的全部数据吗？',
  'tools.data.wipe.text': '将会消失的有：整个测量历史和记录列表、你的阈值和校准，以及外观设置。应用会回到第一次启动时的状态。',
  'tools.data.wipe.note': '我们没有这些数据的副本 — 它们从未离开过本设备，所以没有地方可以把它们恢复回来。',
  'tools.data.wipe.check': '我明白这无法撤销',
  'tools.data.wipe.confirm': '全部删除',
  'tools.data.wipe.toast': '已删除应用的全部数据',
  'tools.data.wipe.announce': '已删除应用的全部数据。设置已恢复为默认值。',
  'tools.data.storage.blocked': '这个浏览器不允许长期保存任何内容（隐私模式，或网站数据被禁用）。你在这里设定的一切，关闭标签页后都会消失。',
  'tools.data.storage.full': '浏览器的存储已经装满，新的测量不再被保存。清空历史可以腾出空间。',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': '支持',
  'support.free.title': '所有功能都可用',
  'support.free.lead': '七项指标、完整历史、阈值、校准和导出，从第一次启动就能用 — 不需要账号，没有限制，也不收费。',
  'support.free.note': '测量完全在本设备上完成，没有网络也能用。这里没有一个更好的版本被藏在墙后面。',
  'support.why.title': '我为什么开口',
  'support.why.lead': '光线监测是业余时间做出来的，背后没有广告，没有赞助商，也没有公司。你的支持，用来抵付修正问题、做新指标以及维持现有功能所花的时间。',
  'support.what.title': '捐助能换来什么',
  'support.what.lead': '什么也换不来。捐助不解锁任何东西 — 没有额外功能，名字旁边没有徽章，也没有优先权。应用能做的一切，你现在已经全部拥有。',
  'support.what.note': '留下的只有一件事：我知道它对某个人有用。这真的已经是足够的理由。',
  'support.cta.title': '如果你愿意帮忙',
  'support.cta.button': '请我喝杯咖啡',
  'support.cta.nolink': '捐助页面还没有接上。等它出现，这个位置会站着一个按钮。',
  'support.cta.privacy': '这个链接会在新标签页中打开一个外部网站（例如 Buy Me a Coffee）。那是唯一一次有东西离开本设备 — 测量本身始终留在这里。',
  'support.cta.privacyFuture': '等地址就位之后，这个按钮会在新标签页中打开一个外部网站（例如 Buy Me a Coffee）。那将是唯一一次有东西离开本设备 — 测量本身始终留在这里。',
  'support.cta.note': '这里没有倒计时，没有提醒，也没有会自己弹出来的窗口。这个请求只在这个标签页里等着。',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': '最近一分钟',
  'gauge.aria': '{metric}：{value}，区间：{zone}',
  'gauge.aria.note': '{metric}：{value}，区间：{zone}，{note}',
  'gauge.aria.initial': '{metric}：无数据',
  'gauge.value.none': '无数据',
  /* Odczyt słowny z jednostką: „27百分比”, „1.20倍”. Chiński stawia jednostkę
     za liczbą i bez odstępu — stąd wzorzec sklejony. */
  'gauge.value.spoken': '{value}{unit}',
  'gauge.note.approx': '近似值',
  'gauge.note.offScale': '超出量程',
  'gauge.metric.unknown': '未知指标',

  'chart.aria.label': '测量历史图表',
  'chart.hint': '这是可交互的图表。左右方向键移动读数游标，Home 和 End 跳到范围的开头和结尾，Escape 隐藏游标。',
  'chart.empty.title': '无数据',
  'chart.empty.text': '开始测量 — 有了第一批读数，图表就会出现。',
  'chart.few.title': '数据太少',
  'chart.few.text': '目前只有一个读数：{value}。画一条线需要两个。',
  'chart.legend.line': '测量',
  'chart.legend.gap': '测量的空档',
  'chart.aria.head': '图表：{metric}，范围 {range}',
  'chart.aria.empty': '这个范围内没有数据。',
  'chart.aria.one': '只有一个读数：{value}。',
  'chart.aria.summary': '从 {min} 到 {max}，平均 {avg}，{points}。',
  'chart.aria.gaps': '这段数据里有空档 — 那时我们没有在测量。',
  'chart.readout.empty': '这个范围内没有数据。',
  'chart.readout.point': '{metric}：{value}，{time}',
  'chart.readout.pointZone': '{metric}：{value}，{zone}，{time}',
  'chart.readout.few': '数据太少，画不出图表。',
  'chart.readout.hint': '在图表上拖动，或者用方向键，就能读出单个测量值。',
  'chart.time.now': '现在',
  'chart.time.justNow': '刚刚',
  'chart.time.ago': '{duration}前',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} \u00B7 {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd zegar dwudziestoczterogodzinny (tak
     formatują godzinę chińskie ustawienia regionalne) i data z dwucyfrowym
     miesiącem, bo „12月30日” jest szersze niż „8月30日”. */
  'chart.sample.ago': '\u221230\u00A0分钟',
  'chart.sample.clock': '00:00',
  'chart.sample.date': '12月30日',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': '蓝光占比',
  'metric.share.short': '所见的光里，有多少落在蓝色通道上。',
  'metric.share.help': '它把颜色和亮度分开 — 打开夜间模式时，动的正是这个值。',
  'metric.brightness.name': '场景亮度',
  'metric.brightness.short': '摄像头画面的平均亮度。',
  'metric.brightness.help': '这是相对值，不是勒克斯 — 摄像头的自动曝光会在底下把它挪来挪去。',
  'metric.kelvin.name': '色温',
  'metric.kelvin.short': '光是暖的还是冷的。',
  'metric.kelvin.help': '低于 3000 K 的光偏暖，晚上更柔和。6500 K 是多数屏幕的默认白。',
  'metric.melanopic.name': '昼夜节律影响',
  'metric.melanopic.short': '这种光对生物钟的作用有多强。',
  'metric.melanopic.help': '这是黑视素比值的近似。1.00 相当于中性的日光白；晚上值得降到 0.50 以下。',
  'metric.flicker.name': '频闪',
  'metric.flicker.short': '光源看不见的脉动。',
  'metric.flicker.help': '廉价的调光器和背光会脉动。眼睛看不见，但它是疲劳和头痛的已知原因之一。',
  'metric.uniformity.name': '均匀度',
  'metric.uniformity.short': '光在画面里分布得均不均匀。',
  'metric.uniformity.help': '在屏幕上，数值低意味着背光漏光或有反光；在桌面上 — 则是灯放得不对。',
  'metric.comfort.name': '视觉舒适度',
  'metric.comfort.short': '用一个评分代替六个数字。',
  'metric.comfort.help': '它把其余的测量合成 0–100 的评分，并指出最拉低它的是什么。权重是我们的编辑判断，不是标准。',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': '安全',
  'zone.warn': '中等',
  'zone.crit': '有害',
  'zone.none': '无数据',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('8月24日'). Chiński skrót miesiąca to
     liczba z 月 — tak samo brzmi nazwa pełna. */
  'date.month.short.1': '1月',
  'date.month.short.2': '2月',
  'date.month.short.3': '3月',
  'date.month.short.4': '4月',
  'date.month.short.5': '5月',
  'date.month.short.6': '6月',
  'date.month.short.7': '7月',
  'date.month.short.8': '8月',
  'date.month.short.9': '9月',
  'date.month.short.10': '10月',
  'date.month.short.11': '11月',
  'date.month.short.12': '12月',

  'date.clock': '{hours}:{minutes}',
  /* Kolejność wstawek jest inna niż po polsku: chińska data idzie od jednostki
     największej do najmniejszej — '8月30日', '2026年8月30日'. Nazwy wstawek
     zostają te same, zmienia się wyłącznie ich miejsce we wzorcu. */
  'date.short': '{month}{day}日',
  'date.shortWithYear': '{year}年{date}',
  'date.dateTime': '{date} {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. Minuty stojące przy sekundach
     zapisujemy 分, a samodzielne 分钟 — tak dzieli te dwa zapisy chiński
     zwyczaj ('3 分 20 秒', ale '5 分钟'). */
  'time.duration.dayHour': '{days} {hours}\u00A0小时',
  'time.duration.hourMinute': '{hours}\u00A0小时 {minutes}\u00A0分钟',
  'time.duration.hour': '{hours}\u00A0小时',
  'time.duration.minuteSecond': '{minutes}\u00A0分 {seconds}\u00A0秒',
  'time.duration.minute': '{minutes}\u00A0分钟',
  'time.duration.second': '{seconds}\u00A0秒',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „刚刚”. */
  'time.justNow': '刚刚',
  'time.aMinuteAgo': '1\u00A0分钟前',
  'time.minutesAgo': '{minutes}\u00A0分钟前',
  'time.hoursAgo': '{hours}\u00A0小时前',
  'time.yesterday': '昨天',
  'time.daysAgo': '{days}\u00A0天前',

  /* Formy zależne od liczby. Chiński ma w CLDR jedną kategorię: `other`.
     Odmiany nie ma, jest za to klasyfikator (个 / 条 / 次), który wchodzi tu
     w skład formy — format.plural() skleja „liczba + spacja + forma”, więc
     wychodzi '3 次测量' i '12 条记录'. */
  'time.days.plural': { other: '天' },
  'unit.sample.plural': { other: '个样本' },
  'unit.measurement.plural': { other: '次测量' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Chiński nie odmienia rzeczownika — oba klucze zostają (kształt słownika
     jest wspólny dla wszystkich języków), a wartości są tu identyczne. */
  'unit.session.plural': { other: '条记录' },
  'unit.session.accusative.plural': { other: '条记录' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to po chińsku dwie
     różne rzeczy: 个数据点 to punkt danych, 分 to punkt oceny. */
  'unit.chartPoint.plural': { other: '个数据点' },
  'unit.point.plural': { other: '分' },
  'unit.kelvin.plural': { other: '开尔文' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „百分比”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': '百分比',
  'unit.spoken.times': '倍',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': '没有获得使用摄像头的权限。请在浏览器设置中允许本页使用摄像头，然后重试。',
  'camera.error.notfound': '没有找到摄像头。请检查这台设备是否有摄像头，以及它是不是在系统里被关掉了。',
  'camera.error.inuse': '摄像头正被另一个应用占用。请关掉那个应用或标签页，然后重试。',
  'camera.error.insecure': '摄像头只能通过 HTTPS 或在 localhost 上工作。请用以“https://”开头的地址打开本页。',
  'camera.error.unsupported': '这个浏览器在这里不提供摄像头。请在 Chrome 或 Safari 的普通窗口中试试 — 不要在嵌入其他应用的预览窗口里。',
  'camera.error.unknown': '无法启动摄像头。'
};
