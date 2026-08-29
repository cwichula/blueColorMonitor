/* docs/v1/i18n/zh.js — słownik WŁASNY wersji v1, chiński (uproszczony).
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka. Kolejność jest treścią umowy: plik wersji dokłada się do tego samego
 * obiektu i może nadpisać dowolny klucz wspólny — nigdy odwrotnie.
 *
 * DLACZEGO TEN SŁOWNIK JEST SAMOWYSTARCZALNY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar w app.js, własne
 * dwie wielkości zamiast siedmiu i własne nazwy stref (安全 / 中等 / 有害
 * zamiast wspólnego 正常 / 注意 / 严重). Zestaw kluczy jest więc dokładnie taki
 * sam jak w pl.js tego katalogu — pilnuje tego docs/shared/i18n/keys.test.js.
 *
 * TERMINOLOGIA idzie ze słownika wspólnego docs/shared/i18n/zh.js wszędzie
 * tam, gdzie obie warstwy mówią o tym samym: 蓝光占比 (udział niebieskiego),
 * 场景亮度 (jasność sceny), 色温 (temperatura barwowa), 黑视素 (melanopiczny),
 * 相机 (kamera), 区间 (strefa). Nazw pięciu wielkości, których v1 nie mierzy,
 * nie przeniesiono. Własnym pojęciem tej wersji jest B 通道亮度 (jasność
 * kanału B); nazwy stref brzmią jak w v5: 安全 / 中等 / 有害.
 *
 * LICZEBNIKI: chiński ma w CLDR jedną kategorię — 'other'
 * (Intl.PluralRules('zh')). Rzeczownik nie odmienia się przez liczbę, zmienia
 * się za to klasyfikator (条, 个) — i to on wchodzi w skład formy.
 *
 * INTERPUNKCJA pełnej szerokości (，。：（）“”) zgodnie z normą dla pisma
 * uproszczonego, półpauza podwójna (——) jak w warstwie wspólnej. Symbole
 * jednostek (%, K, nm, ×), nazwy formatów (CSV) i identyfikatory
 * (getUserMedia, D65, [E-MAIL]) zostają bez zmian.
 *
 * MARKUP W WARTOŚCIACH. Klucze z sufiksem `.html` zawierają <b>, <i>, <code>
 * i encje HTML; wstawia je data-i18n-html, czyli tylko tam, gdzie autor tekstu
 * świadomie tego chciał — nigdy do treści pochodzącej od użytkownika.
 */
window.I18nData = window.I18nData || {};
window.I18nData['zh'] = Object.assign(window.I18nData['zh'] || {}, {

  /* ---- aplikacja ---- */

  'app.name': '有害光线监测器',
  'app.description': '用相机测量屏幕上蓝色的强度，并把它画在清晰的图表上，分成安全、中等、有害三个区间。',

  /* ---- wybór języka ---- */

  'language.label': '语言',
  'language.help': '整个应用的语言。所有语言都已在本设备上——不下载任何内容，也不向任何地方发送任何内容。',
  'language.auto': '跟随设备',

  /* ---- nawigacja ---- */

  'nav.aria': '主菜单',
  'nav.tabsAria': '应用界面',
  'nav.announce': '界面：{screen}',
  'nav.camera': '相机',
  'nav.monitoring': '监测',
  'nav.support': '支持',
  'nav.more': '更多',
  'nav.docs': '文档',
  'nav.about': '关于与联系',
  'nav.settings': '警告阈值',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← 返回',
  'action.back.aria': '返回上一个界面',
  'action.openDocs': '前往文档',
  'action.exportCsv': '导出 CSV',
  'action.delete': '删除',
  'action.closeNotification': '关闭提示',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref — 安全 / 中等 / 有害, a nie wspólne
     正常 / 注意 / 严重. Wersja plakatowa (zone.badge.*) jest osobnym kluczem,
     a nie zapisem wielkimi literami przez CSS: pismo chińskie nie zna wielkich
     liter, więc plakietka brzmi tak samo jak nazwa — i właśnie dlatego musi
     stać tu jako osobna wartość, a nie powstawać z tamtej przez text-transform. */

  'zone.good': '安全',
  'zone.warning': '中等',
  'zone.critical': '有害',
  'zone.none': '无数据',

  'zone.badge.good': '安全',
  'zone.badge.warning': '中等',
  'zone.badge.critical': '有害',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'B 通道亮度',
  'metric.raw.unitLabel': 'B 通道亮度 %',
  'metric.share.name': '蓝光占比',
  'metric.share.longName': '光线中的蓝光占比',
  'metric.share.unitLabel': '蓝光占比 %',
  'stat.overallBrightness': '场景整体亮度',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': '相机预览',
  'camera.pressStart': '请按“开始”。',
  'camera.start': '开始',
  'camera.stop': '停止',
  'camera.switch': '切换相机',
  'camera.error': '无法启动相机。请检查浏览器的相机权限，然后重试。（{message}）',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': '当前读数',
  'disclaimer.short': '结果仅供参考。这不是医疗器械。',
  'disclaimer.more': '更多',

  /* ---- wykresy ---- */

  'chart.aria': '随时间变化的图表',
  'chart.title': '随时间变化的图表（最近 {seconds} 秒）',
  'chart.empty': '启动相机即可看到图表',
  'chart.axis.past': '-{seconds}s',
  'chart.axis.now': '现在',
  'chart.raw.aria': 'B 通道亮度随时间变化的图表，并标出安全、中等和有害区间',
  'chart.share.aria': '光线中蓝光占比随时间变化的图表，并标出安全、中等和有害区间',

  /* ---- tabela odczytów ---- */

  'table.show': '显示为表格',
  'table.hide': '隐藏表格',
  'table.caption': '最近的读数（最新的在最上面）',
  'table.col.time': '时间',
  'table.col.zone': '区间',

  /* ---- ustawienia progów ---- */

  'settings.title': '区间阈值设置',
  'settings.boundary.critical': '黄色 / 红色分界：',
  'settings.boundary.warning': '绿色 / 黄色分界：',

  /* ---- historia i raport (features.js) ---- */

  'history.title': '历史与报告',
  'history.rangeAria': '历史范围',
  'history.unavailable': '历史数据暂时不可用。',
  'history.empty': '这个范围内没有保存的读数。开始测量吧——历史会自己积累起来。',
  'history.savedReadings': '已保存的读数：{count}。按区间划分的时间占比：',
  'history.zoneLine': '{zone}：{percent}%（{readings}）',

  'range.1h': '1 小时',
  'range.24h': '24 小时',
  'range.7d': '7 天',
  'range.30d': '30 天',

  'report.dailyTitle': '每日报告',
  'report.empty': '所选范围内有已保存的读数时，报告就会出现。',
  'report.dailyCaption': '各区间的时间占比，逐日列出',
  'report.col.day': '日期',
  'report.col.week': '周',
  'report.col.readings': '读数',
  'report.compare.day': '逐日对比：{day}——{percent}% 的时间处于有害区间，{change}',
  'report.compare.dayPending': '逐日对比会在第二天的测量之后出现。',
  'report.compare.week': '逐周对比：{week}——{percent}% 的时间处于有害区间，{change}',
  'report.compare.weekPending': '逐周对比会在第二周的测量之后出现。',
  'report.change.same': '与 {other} 相同。',
  'report.change.more': '比 {other} 多 {points}。',
  'report.change.less': '比 {other} 少 {points}。',
  'report.peak': '处于有害区间的读数最多出现在 {from} 到 {to} 之间。',
  'report.peak.none': '这个范围内没有保存任何处于有害区间的读数。',
  'report.weeklyTitle': '每周报告',
  'report.weeklyEmpty': '所选范围内有已保存的读数时，每周报告就会出现。',
  'report.weeklyCaption': '各区间的时间占比，逐周列出',
  'report.weekLabel': '第 {week} 周（{year}）',
  'report.footnote': '这些数字是所选范围内已保存读数的占比，不是精确的暴露时间。',

  /* ---- profile progów ---- */

  'profiles.title': '阈值方案',
  'profiles.empty': '你还没有保存任何方案。',
  'profiles.itemActive': '{name}（使用中）',
  'profiles.applyAria': '应用方案 {name}',
  'profiles.deleteAria': '删除方案 {name}',
  'profiles.applied': '已应用方案“{name}”。',
  'profiles.deleted': '已删除方案“{name}”。',
  'profiles.saved': '已保存方案“{name}”。',
  'profiles.namePlaceholder': '方案名称（例如：晚上）',
  'profiles.saveLabel': '把当前阈值保存为方案',
  'profiles.saveBtn': '保存方案',
  'profiles.needName': '请输入方案名称。',
  'profiles.limit': {
    other: '最多可以保存 {n} 个方案。请先删除一个，再添加新的。'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku zostaje
     w alfabecie łacińskim: musi być bezpieczna dla systemu plików i dla
     nagłówka pobierania, a znaki chińskie bywają w nim przekłamywane. */

  'csv.header': '时间;B通道亮度_%;蓝光占比_%;场景亮度_%;区间',
  'csv.filename': 'light-monitoring-{stamp}.csv',
  'csv.empty': '没有可导出的读数。请先开始测量，然后重试。',
  'csv.done': '已将 {readings} 导出为 CSV 文件。',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut. Chiński ma jedną formę, ale kształt
     wpisu zostaje taki sam jak wszędzie: to nie jest miejsce, w którym słownik
     jednego języka odbiega od reszty. */

  'alert.exposure': {
    other: '阈值警报：读数已经在有害区间停留了 {n} 分钟。可以考虑休息一下，或者降低屏幕上的蓝光占比。'
  },

  'session.title': '上一段测量的小结',
  'session.line': '测量时长：{duration}。已保存的读数：{count}。',
  'session.zoneLine': '{zone}：占本次测量时间的 {percent}%。',
  'session.endedAt': '这份小结针对的是 {time} 结束的那段测量。',
  'session.toast': '测量结束：{duration}，{readings}，{percent}% 的时间处于有害区间。',

  'duration.seconds': '{n} 秒',
  'duration.minutesSeconds': '{minutes} 分 {seconds} 秒',

  /* ---- liczebniki ----
     Chiński ma w CLDR jedną kategorię: 'other'. Formę wybiera
     Intl.PluralRules('zh'), nie nasza reguła — rzeczownik się nie odmienia,
     zmienia się za to klasyfikator (条 przy odczytach, 个 przy punktach),
     i on jest częścią formy. */

  'count.readings': { other: '{n} 条读数' },
  'count.points': {
    other: '{n} 个百分点'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': '更多',
  'more.section.settings': '设置',
  'more.section.help': '帮助',
  'more.thresholds.title': '警告阈值',
  'more.thresholds.sub': '设定安全、中等和有害区间的分界。',
  'more.docs.title': '文档',
  'more.docs.sub': '测量的原理、单位、标准和区间。',
  'more.about.title': '关于与联系',
  'more.about.sub': '版本、隐私与联系方式。',
  'more.free': '这个应用完全免费。',
  'more.supportLink': '你可以自愿支持它。',
  'more.version': '版本 {version} · 所有功能都无需账号、无需付费即可使用',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': '关于与联系',
  'about.version': '版本 {version}',
  'about.what.title': '这个应用是什么',
  'about.what.p1': '{app} 用手机相机测量传感器记录到多少蓝光，并把它显示在两个表盘和带区间的图表上。所有功能——测量、历史、报告、阈值方案、阈值警报、CSV 导出和文档——每个人都能使用，无需账号，也不收费。',
  'about.what.p2': '本应用按“现状”提供，仅供参考之用。测量结果只是大致的参考，不能作为健康决定的依据。',
  'about.privacy.title': '隐私与数据',
  'about.privacy.p1': '相机图像只在你的设备上分析，绝不会被发送到任何服务器。我们不创建账号，也不收集你的数据。阈值设置、方案和测量历史只保存在这台设备和这个浏览器的存储中。',
  'about.privacy.p2': '本应用不显示广告，也不与网络通信。唯一的例外是“支持”界面上的按钮：当你点击它时，浏览器会在新标签页中打开一个外部页面。在你自己这样做之前，什么都不会发生。',
  'about.contact.title': '联系',
  'about.contact.p1': '意见、错误和建议：[E-MAIL]。我们会尽快回复——这是一个业余时间维护的项目。',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': '支持',
  'support.free.title': '所有功能都可用',
  'support.free.text': '整个应用都是免费的：测量、历史与报告、阈值方案、警报、CSV 导出和文档。一切都立即可用，无需账号，没有限制，也不需要联网。',
  'support.why': '{app} 是在业余时间做出来的。如果它对你有用，你可以请我喝杯咖啡。这有助于维持这个应用并把它继续做下去——改进测量、补充文档，并在更多手机上检验它。',
  'support.nothing': '捐助不解锁任何东西。没有更好或更差的版本——支持之后，应用的运作完全一样。唯一的区别是，作者知道它对某个人有用。',
  'support.button': '请我喝杯咖啡',
  'support.button.aria': '请我喝杯咖啡——在新标签页中打开捐助页面',
  'support.pending': '捐助页面还没有接上。等它出现，按钮就会站在这个位置。在那之前不需要做任何事——反正整个应用都是免费的。',
  'support.privacy': '这个按钮会在新的浏览器标签页中打开一个外部页面（Buy Me a Coffee）。那是唯一有东西离开这台设备的时刻。相机图像和你所有的测量结果都留在这里——无论在你点击之前还是之后，都不会被发送到任何地方。',
  'support.privacyPending': '等地址出现之后，点击按钮会在新的浏览器标签页中打开一个外部页面（Buy Me a Coffee）。那将是唯一有东西离开这台设备的时刻。相机图像和你所有的测量结果都留在这里——不会被发送到任何地方。',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem .html, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': '文档',

  'disclaimer.title': '这不是医疗器械',
  'disclaimer.body.docs': '本应用不是医疗器械。它不用于诊断、治疗或预防任何疾病。用手机相机测得的结果只是大致的参考，不能替代医生的检查或建议。有关眼睛健康的问题，请咨询医生或验光师。本应用中的区间阈值不对应任何安全标准——详见第 3 章。',
  'disclaimer.body.about': '本应用不是医疗器械。它不用于诊断、治疗或预防任何疾病。用手机相机测得的结果只是大致的参考，不能替代医生的检查或建议。有关眼睛健康的问题，请咨询医生或验光师。本应用中的区间阈值不对应任何安全标准——详见文档第 3 章。',

  'doc.toc.aria': '文档目录',
  'doc.toc.title': '目录',

  'doc.ch1.title': '快速上手',
  'doc.ch2.title': '测量的原理',
  'doc.ch3.title': '单位与标准',
  'doc.ch4.title': '区间与阈值',
  'doc.ch5.title': '设备之间的差异',

  'doc.ch1.heading': '1. 快速上手',
  'doc.ch2.heading': '2. 测量的原理',
  'doc.ch3.heading': '3. 单位与标准',
  'doc.ch4.heading': '4. 区间与阈值',
  'doc.ch5.heading': '5. 设备之间的差异',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': '怎样测得更准',
  'doc.ch1.tips.li1': '在“相机”界面（底部栏的第一个按钮）按“开始”，把后置相机对准你想检查的屏幕或光源。',
  'doc.ch1.tips.li2': '切换到“监测”界面（底部栏的第二个按钮）——上方可以同时看到两个表盘，往下滚动是随时间变化的图表。无论你正在看哪个界面，测量都在后台继续进行。',
  'doc.ch1.tips.li3': '把手机放在与屏幕固定的距离上（例如 15–20 cm），测量过程中不要改变环境照明。',
  'doc.ch1.tips.li4': '使用后置相机——它的自动校正没有前置那么激进。',
  'doc.ch1.tips.li5': '把结果当作相对指标（%），而不是绝对的物理单位——请把它们相互比较（例如夜间模式开启与关闭）。',
  'doc.ch1.tips.li6': '在设置中把区间阈值调整到你自己屏幕的亮度（第 4 章）。',

  'doc.ch1.fonts.title': '大字和表盘——始终如此',
  'doc.ch1.fonts.p1': '整个应用都使用又大又清晰的字体和全尺寸表盘，让视力不好的人（以及所有其他人）无需额外设置就能读到数据。在“监测”界面上，两个表盘一起放得下一屏，无需滚动——随时间变化的图表就在它们下面，再滚一下就能看到。',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': '手机相机与光谱仪',
  'doc.ch2.spectro.p1.html': '真正测量“有多少有害的蓝光”，需要把光按波长分开——这正是<b>光谱仪</b>所做的事：棱镜或衍射光栅把光分散成几十上百条窄带（例如每 1–5 nm 一条），并分别测量每一条上的光功率。只有从这样完整的光谱分布出发，才能算出勒克斯、流明，或者按蓝光危害函数加权的辐照度这类单位。',
  'doc.ch2.spectro.p2.html': '<b>手机相机做不到其中的任何一步。</b>它只有三个宽带滤光片（拜耳阵列：R/G/B），每一个都在很宽、彼此重叠的波长范围内收集光——“蓝色通道”并不是 435–440 nm（视网膜危害的峰值）附近的窄带，而是大致 400–570 nm，还混着绿色。接下来还有去马赛克、自动曝光、自动白平衡和 sRGB 伽马压缩——浏览器不允许把其中任何一步完全关掉。结果就是，JavaScript 看到的像素值与真正落在传感器上的光功率并不成线性关系。这是根本性的硬件限制，不是这个应用的缺陷。',

  'doc.ch2.raw.title': '图表 1——B 通道亮度',
  'doc.ch2.raw.what.html': '<b>它显示什么：</b>在被采样的那部分图像上，仅蓝色（B）通道的平均亮度，按 0–255 的刻度换算成 %。',
  'doc.ch2.raw.algo.html': '<b>算法：</b>',
  'doc.ch2.raw.step1': '每秒 5 次从相机取一帧画面。',
  'doc.ch2.raw.step2': '裁出画面中央的 60%（这样可以避开图像边缘和来自两侧的眩光）。',
  'doc.ch2.raw.step3': '把裁下来的部分缩放到 32×32 像素的网格（足够精确，而且比按全分辨率计算快得多——这在性能较弱的设备上很重要，例如入门级的 Xiaomi 或 Ulefone）。',
  'doc.ch2.raw.step4': '对这个网格全部 1024 个像素的 B 值取平均。',
  'doc.ch2.raw.step5.html': '<code>结果 = B 平均值 ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>我们为什么留着它：</b>这是“传感器究竟收到多少蓝色信号”最简单、最直接的读数。它的缺点是把亮度和颜色混在了一起——一个非常亮、但中性发白的场景同样会给出很高的结果，尽管它并不特别“蓝”。所以我们在它旁边还显示图表 2。',

  'doc.ch2.share.title': '图表 2——光线中的蓝光占比',
  'doc.ch2.share.what.html': '<b>它显示什么：</b>在记录到的全部光（R+G+B）中，蓝色分量占多大比例——也就是颜色向冷色的偏移，与场景有多亮无关。',
  'doc.ch2.share.algo.html': '<b>算法：</b>与上面相同的第 1–4 步，但不是只取 B，而是计算：',
  'doc.ch2.share.formula.html': '<code>结果 = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': '中性白（R≈G≈B）大约给出 <b>33%</b>。更暖、更红的光给出的更少。强烈偏蓝的光更多，对于几乎纯蓝的光，最高接近 ~100%。',
  'doc.ch2.share.why.html': '<b>为什么它是衡量“有害蓝光”更准确的指标：</b>这与夜间模式 / Night Shift 这类滤镜所依据的原理相同——起作用的是<b>颜色</b>，不是亮度。非常亮但中性的屏幕不会被错误地标成有害；昏暗却强烈偏蓝的屏幕则会。所以正是这项指标决定了读数表中区间的颜色。',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': '为什么不用勒克斯或流明',
  'doc.ch3.units.p1.html': '<b>流明（lm）</b>描述的是光源发出的总光通量——这是光源本身的属性，而不是落在某一点上的光。<b>勒克斯（lx）</b>已经是某一点上的照度（lm/m²）——更接近我们想要的东西，但它仍然是<b>光度学</b>单位：它按人眼对亮度的敏感曲线（V(λ)）给光谱加权，而不是按蓝光危害曲线。真正测量危害需要第三种、更窄的单位：以 <b>W/m²</b> 表示的按光谱加权的辐照度（IEC 62471 标准，敏感度峰值约在 435–440 nm），而这需要光谱仪——见上面一节。',
  'doc.ch3.units.p2.html': '即使退一步只谈勒克斯：手机没有外接的、经过校准的光传感器，也无法可靠地测出它。手机内置的光传感器（在有的机型上）测的其实是机身<b>另一面</b>的光，而不是你用后置相机对准屏幕的那一面——也就是说，它测的是你背后的光，而不是屏幕发出的光。所以，与其在一个本来就不可信的单位上猜一个数字，我们宁可显示一个如实标注的<b>相对指标（%）</b>——它适合在同一部手机、同样条件下作比较（例如夜间模式开启与关闭），而不是当作绝对值。',

  'doc.ch3.norms.title': '安全阈值有全球通用的标准吗？',
  'doc.ch3.norms.p1.html': '简短地说：<b>没有以相机通道百分比表示的标准</b>——这根本不是任何法规所使用的单位。关于蓝光的真实标准确实存在，但它们测的是别的量，用的是别的单位，而且涉及的现象也不同于人们说“蓝光让眼睛疲劳”时通常想到的那个。',
  'doc.ch3.norms.p2.html': '<b>视网膜的急性光化学损伤——IEC 62471 / ICNIRP。</b>这是唯一真正受到规范的“蓝光危害”——一项针对灯具和照明系统的标准，并有 ICNIRP（国际非电离辐射防护委员会）的指南作支撑。它按经危害函数 B(λ) 加权的辐亮度，以 <b>W·m⁻²·sr⁻¹</b> 为单位，把光源分入 RG0–RG3 风险组，并给出暴露时间上限（<code>t_max = 100 / L_B</code> 秒）。手机和显示器的屏幕——即使在最高亮度下——实际上总是落在 <b>RG0（豁免，无限制）</b>。这项标准针对的是强度大得多的光源（电焊弧光、某些投影仪、工业 LED），而不是消费级的屏幕。',
  'doc.ch3.norms.p3.html': '<b>对昼夜节律与睡眠的影响——CIE S 026。</b>这才是人们通常想说的那个现象（晚上看屏幕“让人清醒”）——但它不是眼睛的损伤，而是通过视网膜神经节细胞（ipRGC，在 480 nm 附近最敏感）对生物钟产生的影响。CIE S 026:2018 标准定义了<b>黑视素勒克斯（melanopic EDI）</b>这一单位。最接近“官方”的科学共识是 Brown 及其合作者的论文（<i>PLOS Biology</i>，2022），其中给出的大致建议是：晚上 &lt; 10 黑视素勒克斯，白天 &gt; 250。这是睡眠研究者的建议，不是法律规定。',
  'doc.ch3.norms.p4.html': '<b>WHO。</b>世界卫生组织没有发布自己独立的蓝光暴露限值——在光辐射安全方面，它转而引用 ICNIRP（见上）。WHO 关于屏幕唯一一份自己撰写的具体文件是 <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i>（2019）——但它涉及的是在屏幕前度过的<b>时间</b>，而不是光的颜色或强度：1 岁以下不接触屏幕，2–4 岁最多 1 小时。对成年人，WHO 没有同样具体的数字性指引。',
  'doc.ch3.norms.p5.html': '<b>为什么这些还是没法用来校准这个应用：</b>两类标准（IEC/ICNIRP 和 CIE）都需要完整的光谱分布，以及在已知测量几何下经过校准的辐亮度——而这恰恰是手机通过浏览器无法提供的（见上面“手机相机与光谱仪”一节）。不存在“33% 的蓝光占比 = X 黑视素勒克斯”这样的换算，所以本应用中的阈值<b>不对应任何安全标准</b>（WHO、IEC、ICNIRP 或 CIE——对这项指标来说，这样的标准根本不存在）。不过，蓝光占比的默认阈值是从真实的光色温，以及“晚上用暖光”这条广为流传的实用建议推导出来的——这比单纯取整数要扎实，但仍然不是正式标准（完整的推导见第 4 章）。你随时可以在设置中把它们改成自己的数值。',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': '颜色区间，以及阈值从何而来',
  'doc.ch4.zones.p1.html': '两项指标各有自己、可以独立设定的阈值（“监测”界面 →“区间阈值设置”，在页面底部）——一项上的 33%/66% 和另一项上的并不是一回事（见上面第 2 章）。决定图表下方图例和读数表中颜色的，是<b>蓝光占比</b>：',
  'doc.ch4.zones.li1.html': '<b>绿色——安全：</b>暖色或中性的光，眼睛在休息。',
  'doc.ch4.zones.li2.html': '<b>黄色——中等：</b>明显向蓝色偏移，值得多休息几次。',
  'doc.ch4.zones.li3.html': '<b>红色——有害：</b>强烈偏蓝的光，长时间暴露会让眼睛明显疲劳（尤其是在晚上）。',
  'doc.ch4.zones.p2.html': '<b>这些具体的数字从何而来。</b><b>B 通道亮度</b>没有自然的参照点——合理的阈值完全取决于你所拍摄的场景有多亮（它衡量的是亮度，不是颜色）。这里默认的 33%/66% 仍然只是一个约定的起点——请用试的办法，把它调到你自己屏幕／环境的典型亮度上。',
  'doc.ch4.zones.p3.html': '<b>蓝光占比</b>的默认阈值是从真实的光色温推导出来的（是物理，不是取整），而不是来自任何安全标准——对这个量来说，并不存在这样的标准（第 3 章）。参照点：',
  'doc.ch4.zones.li4.html': '<b>~4000K</b>（“暖白”，典型的 LED 灯泡）→ 约 <b>26%</b> 的蓝光占比。比它更暖的光（色温更低）正是 f.lux 或 Night Shift 这类工具广泛建议在晚上使用的范围——下限阈值由此而来。',
  'doc.ch4.zones.li5.html': '<b>6500K（D65）</b>，大多数手机和显示器屏幕出厂时的标准白点——约 <b>33%</b>。从这个值往上，就进入了通常会建议限制蓝光的范围——上限阈值由此而来。',
  'doc.ch4.zones.p4.html': '<b>一个重要的说明：</b>光有多“蓝”并不取决于一天中的时间，但限制蓝光的建议其实只针对<b>傍晚和夜间</b>——白天暴露在冷色的蓝光下（包括阳光）是正常的，甚至对昼夜节律有好处。大白天看着一块普通、未经改动的屏幕而出现红色区间，并不意味着真的有危险——同样的光到了晚上，就值得限制了。',
  'doc.ch4.zones.p5.html': '两项指标的阈值完全独立——改动一项不会影响另一项。改过的阈值会<b>记在这台设备和这个浏览器里</b>，在下一次打开应用时依然有效（都在本地，不会向任何地方发送）——“开始”按钮不会把它们重置为默认值。',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': '为什么预览在不同设备上看起来不一样',
  'doc.ch5.devices.p1.html': '<b>浏览器与手机自带的相机应用。</b>当你打开手机出厂预装的相机时，厂商（例如 Xiaomi）会给实时预览加上自己专有的算法——实时 HDR、弱光下的数字提亮、平滑处理。网页通过浏览器拿到的是“原始”得多的相机数据流（<code>getUserMedia</code> 函数），没有任何这些增强——所以无论用哪一部手机，它天生就会比自带相机看起来更平、更暗。',
  'doc.ch5.devices.p2.html': '<b>对相机的控制能力各不相同。</b>浏览器究竟能从系统那里得到多少对曝光和白平衡的控制权，取决于具体的手机、相机驱动以及 Chrome/WebView 的版本——有些设备（典型的是接 USB 摄像头的电脑）只报告全自动，另一些（部分 Android 手机）则报告更多、更高级的模式。这个应用的早期版本曾试图在手机允许的地方切换到手动曝光模式，却没有设定具体的数值——结果在部分手机上，画面被冻结在相机启动那一刻随机而昏暗的曝光上。那是代码里的错误（已经修好），不是单位上的差别——但它很好地说明了，行为在设备之间有多容易不同，毕竟同一行代码也只在其中一部分设备上才会生效。',
  'doc.ch5.devices.p3.html': '<b>不同的传感器和图像处理（ISP）。</b>即使代码完全相同、场景也一样，不同型号的手机传感器质量不同，厂商的自动调校也不同——有的会比另一部更快、更准地在弱光下确定曝光。再加上本应用中的指标是<b>相对的</b>（见第 3 章），这就意味着：请在同一部手机上按时间比较结果（以及预览的样子），而不是在不同型号或不同设备之间比较。'
});
