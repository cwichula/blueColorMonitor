/* Monitor Światła v5 — słownik japoński.
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr). NIE JEST
 * KALKĄ żadnego z nich: polskie i angielskie zdania przełożono na naturalną
 * japońszczyznę, a nie słowo w słowo. Zachowane zostało to, co niesie
 * znaczenie: liczby, progi, jednostki, nazwy wstawek i — co do treści —
 * zastrzeżenia medyczne oraz zdania o prywatności. Tych ostatnich nie wolno
 * osłabiać ani wzmacniać: „nie zastępuje rozmowy z lekarzem” ma po japońsku
 * znaczyć dokładnie tyle samo, a „obraz nie opuszcza urządzenia” nie może stać
 * się obietnicą szerszą niż polska.
 *
 * REJESTR: uprzejmy です・ます, ale zwięzły — bez 敬語 wyższego stopnia
 * i bez zwrotów grzecznościowych, których polski i angielski nie mają.
 * Przyciski i etykiety kafelków są rzeczownikami (測定 / 停止 / 履歴), teksty
 * pomocy — pełnymi zdaniami.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych):
 *   ブルー比率, シーンの明るさ, 色温度, 概日リズム影響 (w opisie: メラノピック比),
 *   フリッカー, 均一性, 視覚快適性.
 *   Pojedyncza wielkość to 指標, pomiar to 測定, próg to しきい値.
 * STREFY: 安全 / 中程度 / 有害 — tak jak angielskie safe/moderate/harmful mówią
 * o świetle, a nie o stanie aplikacji, i wchodzą w zdanie „ゾーン: {zone}”.
 *
 * ODSTĘPY: liczba i jednostka są sklejone spacją nierozdzielającą (\u00A0)
 * tak samo jak w pozostałych słownikach — robi to też sam kod (format.js),
 * więc „27 %” i „3 時間” wyglądają w aplikacji jednakowo.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Tekst ze wstawką {nazwa}'   — napis zwykły,
 *   'klucz.kropkowany': { other }                    — forma zależna od liczby.
 * Japoński ma w CLDR JEDNĄ kategorię liczebnika: `other`
 * (Intl.PluralRules('ja') → ['other']), więc obiekty form mają tu jeden klucz.
 * Formą mnogą jest w praktyce klasyfikator (件の…), bo silnik skleja
 * „liczba + spacja + słowo”. Nazwy wstawek są identyczne jak w pl.js —
 * pilnuje tego keys.test.js. Kolejność wstawek w zdaniu wolno zmieniać
 * (i tak robimy w datach: 8月30日, nie „30 sie”), nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': '光モニター',
  'app.description': '光モニター — カメラであなたの周りの光を七つの指標で測ります。すべてこの端末の中で計算され、ネットワークには何も出ていきません。',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — 光モニター',
  'app.skipToContent': '本文へスキップ',
  'app.nav.aria': 'メインナビゲーション',
  'app.noscript.title': 'このアプリには JavaScript が必要です',
  'app.noscript.text': '測定はすべてこのブラウザーのタブの中で行われます。カメラの映像を読み取り、そこから七つの光の指標を計算しているのが JavaScript です。それがなければ、測る手段がありません。このページで JavaScript を有効にして、開き直してください — それでもネットワークには何も送信されません。',

  'nav.measure': '測定',
  'nav.history': '履歴',
  'nav.tools': 'ツール',
  'nav.support': '支援',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': '測定中',
  'shell.live.aria': '測定中。{metric}: {value}。測定画面に戻ります。',
  'shell.live.metricFallback': '主要指標',
  'shell.action.fallback': '画面の操作',

  'shell.loadFail.title': '「{screen}」画面を読み込めませんでした',
  'shell.loadFail.text': 'ファイルの一部が端末の保存領域に残っていないようです。ネットワークに接続して、ページを再読み込みしてください。',
  'shell.fatal.title': '問題が発生しました',
  'shell.fatal.text': 'アプリが画面を組み立てられませんでした。たいていはページの再読み込みで足ります — 保存された測定値と設定はそのまま残ります。',
  'shell.fatal.reload': 'ページを再読み込み',
  'shell.boot.failTitle': 'アプリを起動できませんでした',
  'shell.boot.failText': 'シェルが起動しませんでした。ページを再読み込みしてください — 保存された測定値と設定はそのまま残ります。',
  'shell.background.error': 'バックグラウンドで問題が起きました',
  'shell.background.action': '再読み込み',
  'shell.update.title': '新しいバージョンがあります',
  'shell.update.action': '再読み込み',

  'onboarding.title': 'はじめる前に',
  'onboarding.lead': '光モニターはカメラであなたの周りの光を見て、ブルー比率から視覚快適性まで七つの指標を計算します。',
  'onboarding.privacy': '映像はこの端末から出ません。サーバーもアカウントもなく、送信もありません。七つの指標はすべて最初から使えます。ログインも料金も不要です。',
  'onboarding.honesty': 'これは目安であり、測定器でも医学的検査でもありません。測れないものは表示しません — 数値の代わりにダッシュが出ます。',
  'onboarding.start': 'はじめる',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': '実行',
  'overlay.toast.close': 'メッセージを閉じる',
  'overlay.sheet.label': 'ダイアログ',
  'overlay.sheet.close': '閉じる',
  'overlay.dialog.confirm': '確定',
  'overlay.dialog.cancel': 'キャンセル',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'キャンセル',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': '、',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': '測定',

  'measure.intro.aria': '測定を開始',
  'measure.intro.headline': 'どんな光を浴びているか',
  'measure.intro.lead': '今あなたに当たっている光に青がどれだけ含まれているか、そしてこの時間帯には多すぎないかを、カメラが示します。',
  'measure.intro.start': '測定を開始',
  'measure.intro.hint': 'ブラウザーがカメラの使用許可を求めます。許可するとすぐに測定が始まります。',
  'measure.intro.privacy': 'カメラの映像はこの端末の中で処理され、外に出ることはありません。1 フレームも送信・保存・共有しません。',
  'measure.intro.honesty': 'これは医療機器でも検査でもありません。周囲の光のおおよその状態を示すだけで、健康を判定するものではなく、医師への相談に代わるものでもありません。',

  'measure.live.aria': '測定中',
  'measure.badge.starting': '起動中',
  'measure.badge.paused': '一時停止',
  'measure.badge.running': '測定中',
  'measure.stale': '映像を待っています — アプリがバックグラウンドにある間はプレビューが止まります。',
  'measure.crop': 'フレームの中央を測ります — 印の付いた、画像の幅と高さの {percent} % の範囲です。',
  'measure.facing.front': 'フロントカメラ',
  'measure.facing.back': 'リアカメラ',

  'measure.boot.title': 'カメラを起動しています…',
  'measure.boot.text': 'ブラウザーが許可を求めたら、許可してください — 映像がなければ測るものがありません。許可はこのページだけに適用され、あとから取り消せます。',
  'measure.boot.cancel': 'キャンセル',

  'measure.hold': '表示を固定しました。カメラは動き続けますが、履歴にも平均にも何も入りません。',
  'measure.gridHint': 'タイルを選ぶと、その指標を大きなメーターに移せます。',

  'measure.stop': '停止',
  'measure.pause': '一時停止',
  'measure.resume': '再開',
  'measure.flip.aria': 'カメラを切り替え',
  'measure.flip.toBack': 'リアカメラに切り替え',
  'measure.flip.toFront': 'フロントカメラに切り替え',

  'measure.fail.aria': 'カメラのエラー',
  'measure.fail.headline': 'カメラが起動しませんでした',
  'measure.fail.retry': 'もう一度試す',
  'measure.fail.back': '戻る',
  'measure.fail.savedSession': '中断前のセッション（{duration}）は履歴に保存しました。',
  'measure.error.fallback': 'カメラを起動できませんでした。',

  'measure.summary.aria': 'セッションの要約',
  'measure.summary.title': 'セッションの要約',
  'measure.summary.paused': '一時停止 {duration}',
  'measure.summary.nothingMeasured': 'どの指標も測定値を集められませんでした — セッションの間、カメラは光を見ていません。',
  'measure.summary.note': '平均は一時停止の外で取られたサンプルだけを数えます。一度も測れなかった指標は除外され、ゼロとしては数えません。',
  'measure.summary.nearThreshold': 'しきい値に最も近い指標',
  'measure.summary.worstPoint': '最も弱い点',
  'measure.summary.averageZone': '平均 {zone}',
  'measure.summary.tooShort': 'セッションは {duration} でした — 短すぎて、そのままでは履歴に残りません。手動で保存できます。',
  'measure.summary.again': 'もう一度測る',
  'measure.summary.save': '履歴に保存',
  'measure.summary.saved': '履歴に保存しました',
  'measure.summary.savedToast': 'セッションを履歴に保存しました。',
  'measure.summary.close': '閉じる',

  'measure.method.title': '測定のしくみ',
  'measure.method.p1': 'アプリはカメラの映像を 1 秒に 10 回サンプリングし、フレーム中央の {percent} % から指標を計算します — プレビューの枠が、まさにその範囲です。',
  'measure.method.p2': 'スマートフォンのカメラには広い三つのチャンネルがあり、露出とホワイトバランスを自分で調整します。見えているのは光の比率であって、スペクトルではありません。',
  'measure.method.p3': 'ブルー比率、明るさ、フリッカー、均一性は、カメラが実際に測っている値です。色温度と概日リズム影響は、sRGB の原色から計算した、そうと明示した近似値です。',
  'measure.method.p4': 'フリッカーは 4 ヘルツ以下しか見えません。電源由来の 100 Hz はこのサンプリング速度の遠く外にあり、測定値として示されることはありません。',
  'measure.method.p5': 'これらの数値はいずれも、測光による計測でも医学的な結果でもありません。カメラの映像は端末から出ません。',
  'measure.method.ok': '了解',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'カメラの起動を中止しました。',
  'measure.announce.stoppedNoSamples': '測定を停止しました。サンプルは取得されていません。',
  'measure.announce.stopped': '測定を停止しました。セッションの要約ができました。',
  'measure.announce.interrupted': '測定が中断されました。セッションの要約ができました。',
  'measure.announce.paused': '測定を一時停止しました。表示は固定されています。',
  'measure.announce.resumed': '測定を再開しました。',
  'measure.announce.switchedFront': 'フロントカメラに切り替えました。新しいセッションが始まります。',
  'measure.announce.switchedBack': 'リアカメラに切り替えました。新しいセッションが始まります。',
  'measure.announce.lead': '主要指標: {metric}。',
  'measure.announce.cameraError': 'カメラのエラー。{message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'セッションの間、光は安全な範囲に収まっていました — ランプの設定はこのままにして、別の光源が働く日没後にもう一度確かめてください。',
  'measure.advice.share.evening': 'ブルー比率は平均 {value} でした — 画面をナイトモードにし、天井の照明を消して、机の高さの暖色のランプを一つだけ残してください。',
  'measure.advice.share.day': 'ブルー比率は平均 {value} でした — 日中なら許容範囲ですが、就寝の 2 時間前に画面が自動で暖色に切り替わるよう設定してください。',
  'measure.advice.brightness': 'フレームが露出オーバーでした（平均 {value}） — 光源から離れるか、測っている画面の明るさを下げてください。この露出では、ほかの指標も精度を失います。',
  'measure.advice.kelvin.evening': '色温度は平均 {value} を保っていました — 日没後は 3000 K を下回るように、ランプを暖色モードにするか、2700 K の電球に替えてください。',
  'measure.advice.kelvin.day': '色温度は平均 {value} を保っていました — 日中には目を覚まさせる良い白ですが、夜は同じランプを 2700 K にしてください。',
  'measure.advice.melanopic.evening': '概日リズムへの影響は平均 {value} でした — 就寝前の 2 時間は 0.50 × を下回るように、主照明を暗くし、天井からではなく机の高さから照らしてください。',
  'measure.advice.melanopic.day': '概日リズムへの影響は平均 {value} でした — この時間帯にはその量が役に立ちますが、夜はこの光源を、より弱く暖かいものに替えてください。',
  'measure.advice.flicker': 'フリッカーは平均 {value} に達しました — たいていは調光器か、暗く絞ったバックライトです。画面の明るさを 40 % より上げるか、PWM を使わない調光器に交換してください。',
  'measure.advice.uniformity': '光の当たり方が不均一でした（平均 {value}） — 強い光源を一つ置くのではなく、ランプを机の横に置き、反対側に弱い光源をもう一つ足してください。',
  'measure.advice.comfort': '視覚快適性は平均 {value} でした — まず一つだけ変えてみてください。主照明の明るさを半分にし、光の色はその後で考えます。',
  'measure.advice.default': '照明を一つだけ変えて、もう一度測ってみてください — 二つのセッションを比べるほうが、一回の測定値より多くを語ります。',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': '履歴',
  'history.action.export': '履歴を書き出す',

  'history.metricGroup.aria': '指標の選択',
  'history.announce.metric': '指標: {metric}',
  'history.rangeGroup.aria': '時間の範囲',
  'history.range.aria': '過去{range}',

  'history.stats.title': '範囲の統計',
  'history.stats.head': '{metric}\u00A0—\u00A0過去{range}',
  'history.stats.note': 'グラフに見えているものから計算しています。測定のなかった時間は数えません — その代わりにゼロを置くことはしません。',
  'history.stat.min': '最小',
  'history.stat.avg': '平均',
  'history.stat.max': '最大',
  'history.trend.up': 'この範囲では上昇',
  'history.trend.flat': 'はっきりした変化なし',
  'history.trend.down': 'この範囲では下降',
  'history.trend.none': '比較できるデータなし',

  'history.sessions.title': '測定セッション',
  'history.sessions.count': '{sessions}、新しい順',
  'history.sessions.empty': 'セッションはまだありません',
  'history.sessions.hint': 'セッションは測定を停止すると保存されます。',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': '範囲: {range}',
  'history.session.noMeasure': '測定なし',

  'history.data.title': 'データ',
  'history.data.subtitle': '履歴はこの端末にだけ保存されています。',
  'history.export.csv': 'CSV を書き出す',
  'history.export.json': 'JSON を書き出す',
  'history.export.ok': 'ファイルを保存できます',
  'history.export.fail': 'ファイルを用意できませんでした。プライベートモードや、ほかのアプリに埋め込まれたウィンドウでは、ブラウザーが保存を止めます — 通常のタブでページを開いてください。',
  'history.export.sheet.title': '履歴の書き出し',
  'history.export.sheet.text': 'CSV は表計算ソフトで開けます（区切りはセミコロン、小数点はコンマ）。JSON はセッションの一覧や測定の抜けも含めて、すべてを保持します。',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': '履歴を消去',
  'history.clear.title': '履歴を消去しますか？',
  'history.clear.text': '{points}と{sessions}を削除します。取り消せません — データを残したい場合は、先に書き出してください。',
  'history.clear.confirm': '消去',
  'history.clear.announce': '履歴を消去しました。',
  'history.clear.toast': '履歴を消去しました',

  'history.empty.title': 'まだ表示できるものがありません',
  'history.empty.text': '履歴は測定しながら 1 秒に 1 点ずつ埋まっていきます。すべてこの端末に残ります。',
  'history.empty.action': '測定に移る',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1分',
  'range.5m': '5分',
  'range.1h': '1時間',
  'range.24h': '24時間',
  'range.7d': '7日',
  'range.30d': '30日',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': '日時',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': '端末の保存領域がいっぱいです — 新しい測定値はもう保存されません。',
  'storage.blocked': 'ブラウザーが履歴の保存を許可していません — タブを閉じるとデータは消えます。',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'ツール',
  'tools.action.about': '測定について',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': '言語',
  'tools.language.subtitle': '既定ではアプリは端末の言語に従います。この一覧から選ぶとすぐに反映され、このブラウザーに残ります。',
  'tools.language.aria': '表示言語',
  'tools.language.system': '自動',
  'tools.language.announce': '表示言語: {language}。',

  'tools.appearance.title': '外観',
  'tools.appearance.theme.title': 'テーマ',
  'tools.appearance.theme.desc': '「自動」はシステムの設定に従います。',
  'tools.appearance.theme.aria': 'テーマ',
  'tools.theme.system': '自動',
  'tools.theme.light': 'ライト',
  'tools.theme.dark': 'ダーク',
  'tools.appearance.accent.title': 'アクセントカラー',
  'tools.appearance.accent.desc': 'ボタン、選択、スライダーの色です。',
  'tools.appearance.accent.aria': 'アクセントカラー',
  'tools.appearance.textScale.title': '文字の大きさ',
  'tools.appearance.textScale.desc': 'ラベルだけでなく、画面全体を大きくします。',
  'tools.appearance.textScale.aria': '文字の大きさ',
  'tools.appearance.density.title': '表示密度',
  'tools.appearance.density.desc': '「コンパクト」は一画面により多くの内容が入ります。',
  'tools.appearance.density.aria': 'レイアウトの密度',
  'tools.density.comfortable': '標準',
  'tools.density.compact': 'コンパクト',
  'tools.appearance.motion.title': '動きを減らす',
  'tools.appearance.motion.desc': 'アニメーションと、針のなめらかな動きを止めます。システムの設定はいずれにせよ尊重します。',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'オーシャン',
  'accent.violet': 'バイオレット',
  'accent.amber': 'アンバー',
  'accent.mint': 'ミント',
  'accent.rose': 'ローズ',

  'tools.thresholds.title': 'しきい値',
  'tools.thresholds.subtitle': 'どの値から「中程度」と言い、どの値から「不良」と言うか。既定のしきい値は私たちの提案であって基準ではありません — ご自分に合わせて設定してください。',
  'tools.thresholds.warn': '警告のしきい値',
  'tools.thresholds.crit': '警報のしきい値',
  'tools.thresholds.warn.aria': '警告のしきい値 — {metric}',
  'tools.thresholds.crit.aria': '警報のしきい値 — {metric}',
  'tools.thresholds.reset': '既定値',
  'tools.thresholds.reset.aria': '既定のしきい値に戻す: {metric}',
  'tools.thresholds.moved': '{threshold}を{value}に移しました。',
  'tools.thresholds.resetAll': 'すべてのしきい値を戻す',
  'tools.thresholds.resetAll.title': '既定のしきい値に戻しますか？',
  'tools.thresholds.resetAll.text': '七つの指標すべてが、アプリの提案するしきい値に戻ります。測定履歴はそのまま残ります。',
  'tools.thresholds.resetAll.confirm': '戻す',
  'tools.thresholds.resetAll.cancel': 'このまま',
  'tools.thresholds.resetAll.toast': 'しきい値を既定に戻しました',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': '{warn} より上',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} 以下',
  'tools.zoneRange.goodBelow': '{warn} より下',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} 以上',

  'tools.calibration.title': 'キャリブレーション',
  'tools.calibration.subtitle': '比べられるものをお持ちの方へ。',
  'tools.calibration.intro': '同じランプに向けた 2 台のスマートフォンは、少し違う数値を示します — センサーにはそれぞれ色の癖があるからです。信頼できる測定値が手元にあれば、ここで画像のチャンネルごとに少しずつ上げ下げできます。この倍率は何かを計算する前に効くので、七つの指標すべてが同時に変わります。',
  'tools.calibration.neutral': '比べられるものがありませんか。1.00 のままで結構です — これが初期設定で、何も損ないません。',
  'tools.calibration.forward': '変更はこれ以降に効きます。すでに履歴にある測定値は、保存された時点のまま残ります — あとからデータを書き換えることになるので、さかのぼって計算し直すことはしません。',
  'tools.calibration.reset': 'キャリブレーションをリセット',
  'tools.calibration.reset.toast': 'キャリブレーションをリセットしました',
  'tools.calibration.channel.r': '赤チャンネル',
  'tools.calibration.channel.g': '緑チャンネル',
  'tools.calibration.channel.b': '青チャンネル',
  'tools.calibration.channel.aria': '{channel} — キャリブレーションの倍率',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': '測定',
  'tools.measurement.wake.title': '画面を消さない',
  'tools.measurement.wake.desc': '測定中は画面が点いたままになります。そのぶん電池の減りが早くなります。',
  'tools.measurement.wake.unsupported': 'このブラウザーでは画面の消灯を止められません。',
  'tools.measurement.haptics.title': '振動',
  'tools.measurement.haptics.desc': '開始、停止、指標の切り替えのときに短く知らせます。',
  'tools.measurement.haptics.unsupported': 'この端末は振動モーターを報告していません。',

  'tools.about.title': '測定について',
  'tools.about.subtitle': '七つの指標がそれぞれ何を計算しているのか、そしてこの方法の誠実さがどこで終わるのか。',
  'tools.about.scale': '目盛り: {min} から {max} まで。',
  'tools.about.threshold': '{warn} から警告し、{crit} から警報を出します。',
  'tools.about.thresholdInvert': '{warn} を下回ると警告し、{crit} を下回ると警報を出します。',
  'tools.about.limitsHead': 'この測定にできないこと',
  'tools.about.limit.spectrum.title': 'カメラは測定器のようには色を見ていません',
  'tools.about.limit.spectrum.text': 'スマートフォンのカメラには、赤・緑・青の三つのチャンネルがあります。光を測る機器は、それを何十本もの狭い帯域に分けます。ここに見えているものは、その三つの数値から導いたものです — 妥当なやり方ではありますが、それでも計算であって、測定されたスペクトルではありません。',
  'tools.about.limit.exposure.title': 'カメラは自分で明るさを調整します',
  'tools.about.limit.exposure.text': '窓にスマートフォンを向けると、カメラは露出オーバーにならないように画像を暗くします。部屋では何も変わっていないのに、「シーンの明るさ」はそのとき下がります。ですからこの値は、部屋どうしではなく、同じ一つの構図の中で比べてください。',
  'tools.about.limit.flicker.title': '遅いカメラは速いフリッカーを捉えられません',
  'tools.about.limit.flicker.text': '映像は 1 秒に {hz} 回確認しています。1 秒に {nyquist} 回より速い明滅は、この測定では実際より遅く見えたり、まったく消えたりすることがあります — 電源由来のフリッカーがまさにその速さです。アプリが何かを捉えたら、測定された周波数としてではなく、「ここで何かが明滅している」という合図として受け取ってください。',
  'tools.about.limit.medical.title': 'これは医学的検査でも医学的助言でもありません',
  'tools.about.limit.medical.text': 'このアプリは、周りの光が冷たい、明るい、あるいは落ち着かないことに気づく手助けをし、それに対してできることを提案します。健康について判断を下すものではなく、医師との相談や、専門の測定器による計測に代わるものでもありません。',
  'tools.about.privacy': 'すべてはあなたの端末の中で計算されます。カメラの映像はどこにも送信も保存もされません — 保存領域に入るのは、計算された数値だけです。',
  'tools.about.privacyPolicy': 'プライバシーポリシー全文',

  'tools.data.title': 'データ',
  'tools.data.subtitle': 'すべてはこのブラウザーの保存領域にあり、ここからどこへも出ません。',
  'tools.data.summary.empty': '保存された測定値はまだありません。',
  'tools.data.summary': '保存領域の中: {points}、{sessions}。',
  'tools.data.export.csv': 'CSV を書き出す',
  'tools.data.export.json': 'JSON を書き出す',
  'tools.data.clear': '履歴を消去',
  'tools.data.reset': '既定の設定',
  'tools.data.reset.title': '既定の設定に戻しますか？',
  'tools.data.reset.text': '外観、しきい値、キャリブレーション、測定の設定が初期状態に戻ります。測定履歴はそのまま残ります。',
  'tools.data.reset.confirm': '戻す',
  'tools.data.reset.toast': '既定の設定に戻しました',
  'tools.data.wipe': 'すべてのデータを削除',
  'tools.data.wipe.title': 'アプリのデータをすべて削除しますか？',
  'tools.data.wipe.text': '測定履歴とセッションの一覧、あなたのしきい値とキャリブレーション、そして外観の設定が消えます。アプリは初回起動時の状態に戻ります。',
  'tools.data.wipe.note': 'このデータの控えは私たちにはありません — この端末から一度も出ていないので、戻す先がどこにもありません。',
  'tools.data.wipe.check': '取り消せないことを理解しました',
  'tools.data.wipe.confirm': 'すべて削除',
  'tools.data.wipe.toast': 'アプリのデータをすべて削除しました',
  'tools.data.wipe.announce': 'アプリのデータをすべて削除しました。設定は既定に戻りました。',
  'tools.data.storage.blocked': 'このブラウザーは何も恒久的には保存させません（プライベートモード、またはサイトデータのブロック）。ここで設定したものは、タブを閉じると消えます。',
  'tools.data.storage.full': 'ブラウザーの保存領域がいっぱいになり、新しい測定値はもう保存されません。履歴を消去すると空きができます。',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': '支援',
  'support.free.title': 'すべて使えます',
  'support.free.lead': '七つの指標すべて、完全な履歴、しきい値、キャリブレーション、書き出しが、初回起動から使えます — アカウントも制限も料金もありません。',
  'support.free.note': '測定はすべてこの端末の中で行われ、ネットワークがなくても動きます。壁の向こうにしまってある上位版は、ここにはありません。',
  'support.why.title': 'なぜお願いするのか',
  'support.why.lead': '光モニターは仕事のあとの時間に作っていて、広告もスポンサーも、背後の会社もありません。支援は、修正や新しい指標、そして今動いているものを保ち続けるための時間に充てられます。',
  'support.what.title': '寄付で得られるもの',
  'support.what.lead': '何もありません。寄付は何も解放しません — 追加の機能も、名前の横のバッジも、優先もありません。アプリにできることは、すでに全部お手元にあります。',
  'support.what.note': '残るのは、誰かの役に立ったと私が知ることだけです。それで十分な理由になります。',
  'support.cta.title': '手を貸してくださるなら',
  'support.cta.button': 'コーヒーをおごる',
  'support.cta.nolink': '寄付のページはまだつながっていません。用意できたら、ここにボタンが立ちます。',
  'support.cta.privacy': 'このリンクは外部の Buy Me a Coffee のページを新しいタブで開きます。この端末から何かが出るのはその瞬間だけで、測定そのものは常にここに残ります。',
  'support.cta.privacyFuture': 'アドレスが用意できたら、ボタンは外部の Buy Me a Coffee のページを新しいタブで開きます。この端末から何かが出るのはその瞬間だけで、測定そのものは常にここに残ります。',
  'support.cta.note': 'ここにはカウントダウンも、催促も、勝手に開く窓もありません。このお願いは、このタブの中だけで待っています。',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': '直近 1 分',
  'gauge.aria': '{metric}: {value}、ゾーン: {zone}',
  'gauge.aria.note': '{metric}: {value}、ゾーン: {zone}、{note}',
  'gauge.aria.initial': '{metric}: データなし',
  'gauge.value.none': 'データなし',
  /* Odczyt słowny z jednostką: „27 パーセント”, „1.20 倍”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': '近似値',
  'gauge.note.offScale': '目盛りの外',
  'gauge.metric.unknown': '不明な指標',

  'chart.aria.label': '測定履歴のグラフ',
  'chart.hint': '操作できるグラフです。左右の矢印キーで読み取りカーソルが動き、Home と End で範囲の先頭と末尾に移り、Escape でカーソルが隠れます。',
  'chart.empty.title': 'データなし',
  'chart.empty.text': '測定を始めてください — 最初の測定値が出るとグラフが現れます。',
  'chart.few.title': 'データが足りません',
  'chart.few.text': '測定値は 1 つだけです: {value}。線を引くには 2 つ必要です。',
  'chart.legend.line': '測定',
  'chart.legend.gap': '測定の切れ目',
  'chart.aria.head': 'グラフ: {metric}、範囲 {range}',
  'chart.aria.empty': 'この範囲にデータはありません。',
  'chart.aria.one': '測定値は 1 つ: {value}。',
  'chart.aria.summary': '{min} から {max} まで、平均 {avg}、{points}。',
  'chart.aria.gaps': '系列には切れ目があります — そのとき測定していませんでした。',
  'chart.readout.empty': 'この範囲にデータはありません。',
  'chart.readout.point': '{metric}: {value}、{time}',
  'chart.readout.pointZone': '{metric}: {value}、{zone}、{time}',
  'chart.readout.few': 'グラフを描くにはデータが足りません。',
  'chart.readout.hint': 'グラフ上をドラッグするか矢印キーを使うと、一つひとつの測定値を読めます。',
  'chart.time.now': '現在',
  'chart.time.justNow': 'たった今',
  'chart.time.ago': '{duration}前',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} \u00B7 {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd zegar dwudziestoczterogodzinny i data
     złożona z miesiąca i dnia (12月30日), bo tak japońskie ustawienia
     regionalne zapisują godzinę i datę. */
  'chart.sample.ago': '\u221230\u00A0分',
  'chart.sample.clock': '00:00',
  'chart.sample.date': '12月30日',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'ブルー比率',
  'metric.share.short': '見えている光のうち、青チャンネルが占める割合。',
  'metric.share.help': '明るさから色を切り離した値です — ナイトモードを入れたときに動くのが、この値です。',
  'metric.brightness.name': 'シーンの明るさ',
  'metric.brightness.short': 'カメラ映像の平均的な明るさ。',
  'metric.brightness.help': 'ルクスではなく相対値です — カメラの自動露出が、その下でこの値を動かします。',
  'metric.kelvin.name': '色温度',
  'metric.kelvin.short': '光が暖かいか、冷たいか。',
  'metric.kelvin.help': '3000 K を下回ると光は暖かく、夜にはやさしくなります。6500 K は、ほとんどの画面の既定の白です。',
  'metric.melanopic.name': '概日リズム影響',
  'metric.melanopic.short': 'この光が体内時計にどれだけ強く働くか。',
  'metric.melanopic.help': 'メラノピック比の近似値です。1.00 は中性的な昼光色の白で、夜は 0.50 を下回るとよいでしょう。',
  'metric.flicker.name': 'フリッカー',
  'metric.flicker.short': '光源の、目に見えない明滅。',
  'metric.flicker.help': '安価な調光器やバックライトは明滅します。目には見えませんが、疲れや頭痛の原因のひとつとして指摘されています。',
  'metric.uniformity.name': '均一性',
  'metric.uniformity.short': '光がフレーム全体に均等に広がっているか。',
  'metric.uniformity.help': '画面で値が低ければバックライトの漏れか映り込み、机の上ならランプの置き方が悪いということです。',
  'metric.comfort.name': '視覚快適性',
  'metric.comfort.short': '六つの数値の代わりに、一つの点数。',
  'metric.comfort.help': 'ほかの測定値をまとめて 0 から 100 の点数にし、それを最も下げているものを示します。重みづけは私たちの編集上の判断であって、基準ではありません。',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': '良好',
  'zone.warn': '中程度',
  'zone.crit': '不良',
  'zone.none': 'データなし',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('8月24日'). Japoński zapisuje miesiąc
     liczbą z 月 — to jest tutaj „skrót”. */
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
  /* Kolejność wstawek jest tu inna niż po polsku: japońska data idzie od
     jednostki większej do mniejszej — „8月30日”, nie „30 sie”, i „2024年8月30日”,
     nie „30 sie 2024”. Nazwy wstawek zostają te same — zmienia się wyłącznie
     ich miejsce w zdaniu. */
  'date.short': '{month}{day}日',
  'date.shortWithYear': '{year}年{date}',
  'date.dateTime': '{date} {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0時間',
  'time.duration.hourMinute': '{hours}\u00A0時間 {minutes}\u00A0分',
  'time.duration.hour': '{hours}\u00A0時間',
  'time.duration.minuteSecond': '{minutes}\u00A0分 {seconds}\u00A0秒',
  'time.duration.minute': '{minutes}\u00A0分',
  'time.duration.second': '{seconds}\u00A0秒',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „たった今”. */
  'time.justNow': 'たった今',
  'time.aMinuteAgo': '1\u00A0分前',
  'time.minutesAgo': '{minutes}\u00A0分前',
  'time.hoursAgo': '{hours}\u00A0時間前',
  'time.yesterday': '昨日',
  'time.daysAgo': '{days}\u00A0日前',

  /* Formy zależne od liczby. Japoński ma w CLDR JEDNĄ kategorię: `other`
     (Intl.PluralRules('ja') → ['other']) — nie ma tu czego odmieniać, jest za
     to klasyfikator. Silnik skleja „liczba + spacja + słowo”, więc w wartości
     stoi całe wyrażenie z klasyfikatorem: '3 件のセッション'. Tam, gdzie napis
     siedzi w wąskim wierszu (próbki w opisie sesji), klasyfikator pominięto —
     wydłużałby go bez potrzeby. */
  'time.days.plural': { other: '日' },
  'unit.sample.plural': { other: 'サンプル' },
  'unit.measurement.plural': { other: '件の測定値' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Japoński ma jedną — oba klucze zostają (kształt słownika jest wspólny dla
     wszystkich języków), a wartości są tu identyczne. */
  'unit.session.plural': { other: '件のセッション' },
  'unit.session.accusative.plural': { other: '件のセッション' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy — po japońsku są to dwa różne słowa: データ点 i ポイント. */
  'unit.chartPoint.plural': { other: '件のデータ点' },
  'unit.point.plural': { other: 'ポイント' },
  'unit.kelvin.plural': { other: 'ケルビン' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „パーセント”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'パーセント',
  'unit.spoken.times': '倍',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'カメラの使用が許可されていません。ブラウザーまたはシステムの設定でこのページにカメラを許可して、もう一度お試しください。',
  'camera.error.notfound': 'カメラが見つかりません。この端末にカメラがあるか、システムで無効になっていないかを確認してください。',
  'camera.error.inuse': 'カメラをほかのアプリが使っています。そのアプリかタブを閉じて、もう一度お試しください。',
  'camera.error.insecure': 'カメラは HTTPS または localhost でしか動きません。「https://」で始まるアドレスでこのページを開いてください。',
  'camera.error.unsupported': 'このブラウザーはここでカメラを使わせてくれません。ほかのアプリに埋め込まれたプレビューではなく、通常のウィンドウの Chrome か Safari でお試しください。',
  'camera.error.unknown': 'カメラを起動できませんでした。'
};
