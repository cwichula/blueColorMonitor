/* docs/shared/i18n/ja.js — słownik WSPÓLNY, japoński.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest japoński.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — i tak ma zostać
 * (patrz docs/shared/README.md, rozdział „Warstwa językowa”). Klucza, którego
 * nie ma w angielskim, nie wolno tu dopisać: angielski jest wartością zapasową,
 * więc to on wyznacza zestaw.
 *
 * TERMINOLOGIA: jeden odpowiednik na pojęcie w całym pliku —
 *   色温度 (temperatura barwowa), メラノピック比 (współczynnik melanopiczny),
 *   ちらつき (migotanie; nie kalka „フリッカー”), 均斉度 (równomierność,
 *   termin z techniki oświetleniowej), 概日リズム (rytm dobowy).
 *
 * LICZEBNIKI: japoński ma w CLDR jedną kategorię — 'other'. Obiekty form mają
 * więc dokładnie jeden klucz; to nie jest niedokończone tłumaczenie.
 *
 * ODSTĘPY: między liczbą a jednostką łacińską (3000 K, 5 Hz) zostaje spacja,
 * bo tak składa się te zapisy po japońsku. Symboli jednostek (%, K, ×, Hz)
 * ani zapisu liczb dziesiętnych (1.00, 0.50) nie tłumaczymy.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ja'] = Object.assign(window.I18nData['ja'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu
     (UE) 2017/745, gdzie stoi na początku zdania z partykułą は. */
  'app.name': 'ライトモニター',

  /* ---- wybór języka ---- */

  'language.label': '言語',
  'language.help': 'アプリ全体の表示言語です。すべての言語はすでにこの端末の中にあります。何もダウンロードされず、どこにも送信されません。',
  'language.auto': '端末の設定に合わせる',
  'language.autoHint': '携帯電話またはブラウザで設定されている言語に従います。',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': '青色光の割合',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'パーセント',
  'metric.share.short': '見えている光のうち、青チャンネルが占める割合。',
  'metric.share.help': '色を明るさから切り分けます。ナイトモードを入れたときに動くのは、この値です。',

  'metric.brightness.name': 'シーンの明るさ',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'パーセント',
  'metric.brightness.short': 'カメラ映像の平均的な明るさ。',
  'metric.brightness.help': 'ルクスではなく相対値です。カメラの自動露出が、その下でこの値を動かしています。',

  'metric.kelvin.name': '色温度',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'ケルビン',
  'metric.kelvin.short': '光が暖かいか、冷たいか。',
  'metric.kelvin.help': '3000 K を下回ると光は暖かく、夜には穏やかになります。6500 K はほとんどの画面の標準的な白です。',

  'metric.melanopic.name': '概日リズムへの影響',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': '倍',
  'metric.melanopic.short': 'この光が体内時計にどれだけ強く働きかけるか。',
  'metric.melanopic.help': 'メラノピック比の近似値です。1.00 が中性的な昼光の白で、夜は 0.50 を下回るとよいでしょう。',

  'metric.flicker.name': 'ちらつき',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'パーセント',
  'metric.flicker.short': '目には見えない光源の明滅。',
  'metric.flicker.help': '安価な調光器やバックライトは明滅します。目には見えませんが、疲れや頭痛の原因になることがあります。',

  'metric.uniformity.name': '均斉度',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'パーセント',
  'metric.uniformity.short': 'フレームの中で光が均等に広がっているか。',
  'metric.uniformity.help': '画面で値が低いときは、バックライトの光漏れか映り込みです。机の上なら、ランプの置き方がよくありません。',

  'metric.comfort.name': '目の快適さ',
  'metric.comfort.unit': '点',
  'metric.comfort.unitSpoken': '点',
  'metric.comfort.short': '6 つの数字の代わりに、ひとつの評価。',
  'metric.comfort.help': '他の測定値をまとめて 0〜100 のスコアにし、何がいちばんそれを下げているかを示します。重みは規格ではなく、私たちの編集上の判断です。',

  'comfort.penalty.melanopic': '概日リズムへの影響',
  'comfort.penalty.kelvin': '冷たい光の色',
  'comfort.penalty.flicker': 'ちらつき',
  'comfort.penalty.uniformity': '照明のむら',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': 'カメラを起動するには「スタート」を押してください。',
  'engine.starting': 'カメラを起動しています…',

  'engine.error.permission': 'カメラを使う許可がありません。ブラウザの設定でカメラを許可し、もう一度「スタート」を押してください。',
  'engine.error.notFound': 'カメラが見つかりません。この端末にカメラがあるか、システムで無効になっていないかを確認してください。',
  'engine.error.busy': 'カメラを別のアプリが使用中です。そのアプリを閉じて、もう一度お試しください。',
  'engine.error.unknown': 'カメラを起動できませんでした。',
  'engine.error.unsupported': 'このブラウザは、このページにカメラへのアクセスを許可していません。HTTPS でアプリを開くか、別のブラウザをお使いください。',

  /* ---- strefy ---- */

  'zone.good': '正常範囲',
  'zone.warning': '注意',
  'zone.critical': '警告',
  'zone.none': 'データなし',
  'zone.settling': '判定中',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania, więc bez kropki
     na końcu. Japoński nie zna wielkiej litery, więc brzmi tak samo jak napis
     na plakietce; osobne klucze zostają, bo tego wymaga zestaw. */
  'zone.spoken.good': '正常範囲',
  'zone.spoken.warning': '注意',
  'zone.spoken.critical': '警告',
  'zone.spoken.none': 'データなし',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': '点',
  'unit.hertz': 'Hz',
  'unit.second': '秒',
  'unit.minute': '分',
  'unit.hour': '時間',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'この光は問題ありません。設定したしきい値をどれも超えていません。',
  'verdict.noValue': 'この値はいま測定できません。レンズが覆われていないか確認してください。',
  'verdict.warmup': '評価を確かめています。もう少しの間、端末を動かさずに持ってください。',

  'verdict.warning.share': 'この光のかなりの部分が青チャンネルに集まっています。夜は暗くするとよいでしょう。',
  'verdict.warning.brightness': 'シーンが明るく、カメラは測定範囲の上限近くで動いています。',
  'verdict.warning.kelvin': '光はやや冷たいです。夜には 2700 K あたりの電球のほうが穏やかです。',
  'verdict.warning.melanopic': 'この光は体内時計にかなり強く働きかけます。',
  'verdict.warning.flicker': '光源がはっきりと明滅しています。',
  'verdict.warning.uniformity': 'フレームの中で光の広がりにむらがあります。',
  'verdict.warning.comfort': '目の快適さが下がっています。いくつかのことが重なった結果です。',

  'verdict.critical.share': '青がとても多く含まれています。夜はナイトモードを入れるか、光源を変えてください。',
  'verdict.critical.brightness': 'シーンがとても明るいです。光源を正面から見て測らないでください。',
  'verdict.critical.kelvin': '光が冷たいです。夜はこれがいちばん目を疲れさせます。暖かい電球かナイトモードが助けになります。',
  'verdict.critical.melanopic': 'この光は体内時計に強く働きかけます。夜は 0.50 を下回るとよいでしょう。',
  'verdict.critical.flicker': '光源が強く明滅しています。目の疲れや頭痛の原因になることがあります。',
  'verdict.critical.uniformity': '光の広がりが非常に不均一です。ランプの置き方や画面への映り込みを確認してください。',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': '目の快適さが低い状態です。評価の内訳を見ると、何がそれを下げているのかがわかります。',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'この数字が語らないこと',
  'note.warningTitle': '注意',
  'note.dashTitle': 'この測定が何ではないか',
  'note.dashText': '携帯電話のカメラは広い色チャンネルを 3 つ持ち、ホワイトバランスは自動です。スペクトルは測っていません。色温度と概日リズムへの影響は、sRGB の色から計算した近似値です。このアプリは違いや時間による変化はよく示しますが、測定器の代わりにはならず、いかなる診断も行いません。',
  'note.approxLegend': '≈ 近似値 — スペクトルの測定ではなく、sRGB の色から計算した値です。',
  'note.kelvinOutOfRange': '方法の範囲外です。この色では、色温度の式が信頼できなくなります。',
  'note.flickerOutOfRange': '方法の範囲外です。{rate} Hz のサンプリングでは、{limit} Hz より下の明滅しか見えません。電源由来の 100 Hz は届く範囲になく、このアプリが測定結果として示すことはありません。',
  'note.helpTitle': 'この数字が語らないこと',
  'note.helpText': '携帯電話のカメラは広いチャンネルを 3 つ持つだけで、スペクトルは測りません。この値は比較のための指標です。光どうしの違いや時間による変化はよく示しますが、実験室の測定でも医療情報でもありません。',
  'note.calibration': '校正なしの測定です。値は比較のためのものとして扱ってください。',

  'note.howToTitle': '意味のある測り方',
  'note.howTo.hold.title': '端末を動かさずに持つ',
  'note.howTo.hold.text': '自動露出が落ち着くまでに 2〜3 秒かかります。',
  'note.howTo.aim.title': '照らされた面に向ける',
  'note.howTo.aim.text': '白い紙か明るい壁に向けます。光源を正面から見て測らないでください。',
  'note.howTo.compare.title': '絶対値で判断せず、比べる',
  'note.howTo.compare.text': '照明を変える前と後の同じ場面のほうが、ひとつの数字より多くを語ります。',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Skracanie go w tłumaczeniu nie jest kwestią stylu. */

  'legal.noDiagnosis': 'いかなる測定結果も、診断や健康上の助言ではありません。',
  'legal.mdr': '{app} は、規則 (EU) 2017/745 にいう医療機器ではなく、いかなる病状の診断、予防、監視または治療を目的とするものでもなく、医師または検眼士による診察に代わるものでもありません。',

  /* ---- prywatność ---- */

  'privacy.title': 'この端末から出ていくもの',
  'privacy.short': 'このアプリの中に、ネットワークへ何かを送るものは一つもありません。すべての数字はこの端末で作られ、ここに留まります。',
  'privacy.onDevice': 'カメラはボタンを押したあとにはじめて起動し、映像がこの端末から出ていくことはありません。',
  'privacy.external': 'アプリ全体の中で、何かがこの端末から出ていく唯一の場所がここです。ボタンは外部のページを新しいタブで開き、それが起きるのはボタンを押したあとだけです。測定、履歴、設定はここに留まります。',
  'privacy.externalPending': 'アドレスが用意されると、ボタンは外部のページを新しいタブで開きます。それが、何かがこの端末から出ていく唯一の瞬間になります。測定、履歴、設定はここに留まります。',
  'privacy.storageBlocked': 'このブラウザは何も保存させません（プライベートモード、またはサイトデータのブロック）。測定は動きますが、タブを閉じると履歴は消えます。',

  /* ---- liczebniki ----
     Japoński ma w CLDR jedną kategorię: 'other'. Rzeczownik nie zmienia formy,
     a liczba stoi przy klasyfikatorze (件, 回). Formę wybiera
     Intl.PluralRules('ja'), nie nasza reguła. */

  'count.readings': { other: '{n} 件の測定値' },
  'count.sessions': { other: '{n} 回の測定' },
  'count.seconds': { other: '{n} 秒' },
  'count.minutes': { other: '{n} 分' },
  'count.hours': { other: '{n} 時間' },
  'count.days': { other: '{n} 日' }
});
