/* docs/shared/i18n/zh.js — słownik WSPÓLNY, chiński (uproszczony).
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest chiński.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — klucza, którego
 * nie ma we wzorcu, nie wolno tu dopisać, a żadnego pominąć (pilnuje tego
 * docs/shared/i18n/keys.test.js).
 *
 * TERMINOLOGIA: po jednym odpowiedniku na pojęcie w całym pliku — 蓝光占比
 * (udział niebieskiego), 场景亮度 (jasność sceny), 色温 (temperatura barwowa),
 * 昼夜节律影响 wraz z 黑视素比值 (wpływ na rytm dobowy, współczynnik
 * melanopiczny), 频闪 (migotanie), 均匀度 (równomierność), 视觉舒适度 (komfort
 * wzrokowy). Symbole jednostek (%, K, ×, Hz) zostają bez zmian.
 *
 * LICZEBNIKI: chiński ma w CLDR jedną kategorię — 'other'. Obiekty form mają
 * więc dokładnie ten jeden klucz; sięga po niego Intl.PluralRules('zh').
 */
window.I18nData = window.I18nData || {};
window.I18nData['zh'] = Object.assign(window.I18nData['zh'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu
     (UE) 2017/745, gdzie stoi na początku, w pozycji podmiotu. */
  'app.name': '光线监测器',

  /* ---- wybór języka ---- */

  'language.label': '语言',
  'language.help': '整个应用的语言。所有语言都已在本设备上——不下载任何内容，也不向任何地方发送任何内容。',
  'language.auto': '跟随设备',
  'language.autoHint': '跟随手机或浏览器中设置的语言。',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': '蓝光占比',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': '百分比',
  'metric.share.short': '视野中的光有多少落在蓝色通道上。',
  'metric.share.help': '它把颜色与亮度分开——打开夜间模式时变化的正是这个数值。',

  'metric.brightness.name': '场景亮度',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': '百分比',
  'metric.brightness.short': '相机图像的平均亮度。',
  'metric.brightness.help': '这是相对数值，不是勒克斯——相机的自动曝光会在底层移动它。',

  'metric.kelvin.name': '色温',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': '开尔文',
  'metric.kelvin.short': '光是暖的还是冷的。',
  'metric.kelvin.help': '低于 3000 K 的光偏暖，晚上更柔和。6500 K 是多数屏幕的默认白色。',

  'metric.melanopic.name': '昼夜节律影响',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': '倍',
  'metric.melanopic.short': '这种光对生物钟的作用有多强。',
  'metric.melanopic.help': '黑视素比值的近似值。1.00 是中性日光白；晚上最好降到 0.50 以下。',

  'metric.flicker.name': '频闪',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': '百分比',
  'metric.flicker.short': '光源看不见的脉动。',
  'metric.flicker.help': '廉价的调光器和背光会脉动。眼睛看不见它，但它是已知的疲劳和头痛原因。',

  'metric.uniformity.name': '均匀度',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': '百分比',
  'metric.uniformity.short': '光在画面中是否分布均匀。',
  'metric.uniformity.help': '屏幕上数值偏低意味着背光漏光或反光；桌面上则意味着灯放得不好。',

  'metric.comfort.name': '视觉舒适度',
  'metric.comfort.unit': '分',
  'metric.comfort.unitSpoken': '分',
  'metric.comfort.short': '用一个结论代替六个数字。',
  'metric.comfort.help': '它把其余各项读数合成 0–100 的评分，并指出最拉低评分的因素。权重是我们的编辑判断，不是标准。',

  'comfort.penalty.melanopic': '昼夜节律影响',
  'comfort.penalty.kelvin': '光色偏冷',
  'comfort.penalty.flicker': '频闪',
  'comfort.penalty.uniformity': '照明不均匀',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': '按“开始”打开相机。',
  'engine.starting': '正在启动相机…',

  'engine.error.permission': '没有使用相机的权限。请在浏览器设置中允许使用相机，然后再次按“开始”。',
  'engine.error.notFound': '未找到相机。请检查设备是否有相机，以及它是否在系统中被关闭。',
  'engine.error.busy': '相机正被另一个应用占用。请关闭它后重试。',
  'engine.error.unknown': '无法启动相机。',
  'engine.error.unsupported': '此浏览器不允许本页面使用相机。请通过 HTTPS 打开应用，或改用其他浏览器。',

  /* ---- strefy ---- */

  'zone.good': '正常',
  'zone.warning': '注意',
  'zone.critical': '严重',
  'zone.none': '无数据',
  'zone.settling': '稳定中',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania. Chiński nie ma
     wielkich liter, a wtrącenie i tak nie kończy się kropką, więc brzmi tak
     samo jak napis na plakietce. */
  'zone.spoken.good': '正常',
  'zone.spoken.warning': '注意',
  'zone.spoken.critical': '严重',
  'zone.spoken.none': '无数据',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': '分',
  'unit.hertz': 'Hz',
  'unit.second': '秒',
  'unit.minute': '分钟',
  'unit.hour': '小时',

  /* ---- zdania oceniające ---- */

  'verdict.good': '这里的光没问题——没有一项超过你设定的阈值。',
  'verdict.noValue': '这一项现在测不出来。请检查镜头是否被遮住。',
  'verdict.warmup': '正在得出结论——请把手机再拿稳一会儿。',

  'verdict.warning.share': '这里的光有相当一部分落在蓝色通道上。晚上不妨把它调暗。',
  'verdict.warning.brightness': '场景很亮——相机正工作在量程上限附近。',
  'verdict.warning.kelvin': '光偏冷。晚上用 2700 K 左右的灯泡会更柔和。',
  'verdict.warning.melanopic': '这种光对生物钟的作用相当强。',
  'verdict.warning.flicker': '光源有明显的脉动。',
  'verdict.warning.uniformity': '光在画面中分布不均匀。',
  'verdict.warning.comfort': '视觉舒适度下降了——是几件事叠加造成的。',

  'verdict.critical.share': '蓝光非常多。晚上请打开夜间模式或更换光源。',
  'verdict.critical.brightness': '场景非常亮。不要对着光源直接测量。',
  'verdict.critical.kelvin': '光是冷的。晚上这最伤眼睛——换成更暖的灯泡或打开夜间模式会有帮助。',
  'verdict.critical.melanopic': '这种光对生物钟的作用很强。晚上最好降到 0.50 以下。',
  'verdict.critical.flicker': '光源脉动强烈。这是已知的眼睛疲劳和头痛原因。',
  'verdict.critical.uniformity': '光的分布非常不均匀。请检查灯的位置或屏幕上的反光。',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': '视觉舒适度很低。看看评分的构成，就能知道是什么拉低了它。',

  /* ---- granice metody ---- */

  'note.limitsTitle': '这个数字没有告诉你什么',
  'note.warningTitle': '注意',
  'note.dashTitle': '这个测量不是什么',
  'note.dashText': '手机相机只有三个宽色彩通道和自动白平衡——它并不测量光谱。色温和昼夜节律影响都是由 sRGB 三原色推算出的近似值。这个应用能很好地显示差异和随时间的变化，但它不能替代测量仪器，也不做任何诊断。',
  'note.approxLegend': '≈ 近似值——由 sRGB 三原色推算，而不是来自光谱测量。',
  'note.kelvinOutOfRange': '超出本方法的范围——在这种颜色下，色温公式不再可靠。',
  'note.flickerOutOfRange': '超出本方法的范围——{rate} Hz 的采样只能看到低于 {limit} Hz 的脉动。市电的 100 Hz 不在可及范围内，应用永远不会把它作为读数给出。',
  'note.helpTitle': '这个数字没有告诉你什么',
  'note.helpText': '手机相机只有三个宽通道，并不测量光谱。这个数值是一个比较性的指标——它能很好地显示不同光之间的差异和随时间的变化，但它既不是实验室测量结果，也不是医疗信息。',
  'note.calibration': '未经校准的测量——请把数值当作比较用。',

  'note.howToTitle': '怎样测量才有意义',
  'note.howTo.hold.title': '把手机拿稳',
  'note.howTo.hold.text': '自动曝光需要 2–3 秒才能稳定下来。',
  'note.howTo.aim.title': '对准被照亮的表面',
  'note.howTo.aim.text': '一张白纸或一面浅色的墙。不要对着光源直视测量。',
  'note.howTo.compare.title': '做比较，不要下绝对的判断',
  'note.howTo.compare.text': '同一个场景在改变照明前后的对比，比单独一个数字说明更多。',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr przetłumaczone wiernie, zdanie w zdanie. To sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone — nie skraca się go dla stylu. */

  'legal.noDiagnosis': '任何读数都不是诊断，也不是健康建议。',
  'legal.mdr': '{app} 不是欧盟法规 (EU) 2017/745 意义上的医疗器械，不用于诊断、预防、监测或治疗任何疾病状况，也不能替代医生或验光师的检查。',

  /* ---- prywatność ---- */

  'privacy.title': '什么会离开这台设备',
  'privacy.short': '这个应用中没有任何东西会发送到网络。所有数字都在这台设备上产生，并留在这里。',
  'privacy.onDevice': '相机只有在你按下按钮之后才会启动，图像永远不会离开这台设备。',
  'privacy.external': '这是整个应用中唯一会有东西离开这台设备的地方：这个按钮会在新标签页中打开一个外部页面，而且只有在你按下它之后才会发生。测量结果、历史记录和设置都留在这里。',
  'privacy.externalPending': '等地址出现后，这个按钮会在新标签页中打开一个外部页面。那将是唯一有东西离开这台设备的时刻。测量结果、历史记录和设置都留在这里。',
  'privacy.storageBlocked': '这个浏览器不允许保存任何内容（无痕模式，或网站数据被阻止）。测量仍然可用，但关闭标签页后历史记录会消失。',

  /* ---- liczebniki ----
     Chiński ma w CLDR jedną kategorię: 'other'. Rzeczownik nie odmienia się
     przez liczbę, są za to klasyfikatory (条, 次) — i to one, a nie forma
     rzeczownika, zmieniają się zależnie od tego, co się liczy. */

  'count.readings': { other: '{n} 条读数' },
  'count.sessions': { other: '{n} 次测量' },
  'count.seconds': { other: '{n} 秒' },
  'count.minutes': { other: '{n} 分钟' },
  'count.hours': { other: '{n} 小时' },
  'count.days': { other: '{n} 天' }
});
