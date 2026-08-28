/* docs/v3/i18n/ja.js — słownik WŁASNY wersji v3, japoński.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/ja.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js tego katalogu — pilnuje
 * tego docs/shared/i18n/keys.test.js. Kluczy, które stoją w słowniku wspólnym
 * (nazwy stref, zdania oceniające, noty o granicach metody, nazwy i opisy
 * siedmiu wielkości, zastrzeżenie z rozporządzenia (UE) 2017/745), tu NIE MA —
 * poza jednym świadomym nadpisaniem, opisanym przy 'verdict.critical.comfort'.
 *
 * TERMINOLOGIA JEST WZIĘTA Z docs/shared/i18n/ja.js i nie wolno jej tu ruszać:
 * inaczej ta sama wielkość nazywałaby się na pulpicie inaczej niż w
 * dokumentacji.
 *   青色光の割合 (udział niebieskiego), シーンの明るさ (jasność sceny),
 *   色温度 (temperatura barwowa), 概日リズムへの影響 / メラノピック比
 *   (wpływ na rytm dobowy), ちらつき (migotanie), 均斉度 (równomierność),
 *   目の快適さ (komfort wzrokowy).
 * Strefy: 正常範囲 / 注意 / 警告 / データなし — stąd „próg uwagi” to
 * 注意のしきい値, a „próg krytyczny” 警告のしきい値: próg nazywa się tak jak
 * strefa, do której prowadzi. Pojedyncza wielkość to 指標, pomiar 測定,
 * próg しきい値, pulpit ダッシュボード.
 *
 * KLAWISZ STARTU. Słownik wspólny mówi wprost 「スタート」を押してください
 * ('engine.idle'), więc etykieta 'keys.start' brzmi 'スタート' i tak samo jest
 * cytowana we wszystkich zdaniach v3 — inaczej instrukcja odsyłałaby do
 * klawisza o innej nazwie niż ta na ekranie.
 *
 * REJESTR: uprzejmy です・ます, zwięzły, bez 敬語 wyższego stopnia. Etykiety
 * klawiszy, kafelków i zakładek są rzeczownikami (測定 / 停止 / 履歴), teksty
 * pomocy — pełnymi zdaniami. Zastrzeżenia medyczne i akapity o prywatności
 * przetłumaczone DOKŁADNIE, bez osłabiania i bez dodawania obietnic.
 *
 * ODSTĘPY: między liczbą a jednostką łacińską (5 Hz, 3000 K) zostaje spacja,
 * tak jak w słowniku wspólnym. Symboli jednostek (%, K, ×, Hz), nazw formatów
 * (CSV, JSON) ani zapisu liczb we wzorach nie tłumaczymy — wzory idą z kropką
 * dziesiętną, jak w en.js, bo czyta je człowiek, a nie parser.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ja'] = Object.assign(window.I18nData['ja'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. Japoński nie zna
     wielkiej litery, więc brzmi tak samo jak 'app.name' ze słownika wspólnego. */
  'app.wordmark': 'ライトモニター',

  'state.idle': '準備完了',
  'state.starting': '起動中',
  'state.running': '測定中',
  'state.runningTpl': '測定中 {time}',
  'state.stopped': '停止',
  'state.error': 'カメラのエラー',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5.0 po japońsku, 5,0 po polsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'スタート',
  'keys.starting': '起動中…',
  'keys.stop': '停止',
  'keys.flip': '切り替え',
  'keys.flipAria': 'カメラをフロントとリアで切り替え',
  'keys.menu': 'メニュー',
  'keys.menuAria': 'モジュール一覧',
  'keys.back': '‹ 戻る',
  'keys.backAria': 'ダッシュボードに戻る',
  'keys.dash': 'ダッシュボード',
  'keys.zoom': 'プレビューを拡大',
  'keys.retry': 'もう一度試す',
  'keys.refresh': '再読み込み',
  'keys.close': '閉じる',
  'keys.show': '表示',
  'keys.apply': '適用',
  'keys.remove': '削除',

  'monitor.legend': '確認用プレビュー',
  'monitor.badge': 'ライブ',

  'aim.title': '照準',
  'aim.hint': 'この枠は、アプリが実際に測っている画像の範囲そのものを示しています。',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': '主要チャンネル',
  'readout.thresholdTpl': '（しきい値 {value}）',
  'readout.contextTpl': '最小 {min} · 平均 {avg} · 最大 {max} — 直近 60 秒',
  'readout.contextEmpty': '直近 60 秒のデータがありません',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': '{name} の意味',
  'aria.channel': '{name}、{value}、{zone}。大きな表示に出します。',
  'aria.channelStale': '{name}、データなし。大きな表示に出します。',
  'aria.scale': 'スケール: {name}、{min} から {max} まで。現在 {value}、{zone}。注意のしきい値 {warn}、警告のしきい値 {crit}。',
  'aria.readout': '{name}: {value}、{zone}。',
  'aria.readoutApprox': '{name}: 約 {value}、{zone}。近似値です。',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': '主要チャンネルのスケール。データなし',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': '「スタート」を押し、照らされた面に携帯電話を向けて、数秒間動かさずに持ってください。',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': '目の快適さが低い状態です。モジュール 01 を見ると、何がそれを下げているのかがわかります。',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': '画面下の「スタート」から始めてください。カメラは、押したあとにはじめて起動します。',
  'transient.measureStopped': '測定終了 · {time} · 履歴に保存しました。',
  'transient.newVersion': 'アプリの新しいバージョンがあります。',
  'transient.thresholdsSaved': 'しきい値を保存しました。',
  'transient.thresholdsRejected': '保存しませんでした — 注意のしきい値と警告のしきい値は、たがいに追い越すことができません。',
  'transient.historyCleared': '履歴を消去しました。',

  'live.lead': '主要チャンネル: {name}、{value}、{zone}。',
  'live.ready': '評価ができました。{name} {value}、{zone}。',
  'live.started': '測定を開始しました。',
  'livebar.stopped': '測定を停止しました',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': '記録はまだ一つもありません。履歴は測定している間に書き込まれます — 1 分ほど測定してから、ここに戻ってきてください。',
  'empty.recorderNoRange': 'この範囲には測定がありませんでした。',
  'empty.coverageTpl': '測定は {total} 時間のうち {done} 時間をカバーしました。',
  'empty.reportsNoData': '日次レポートは、測定のある最初の 1 日がそろってから作られます。',
  'empty.compareOneSession': '比較には、終了したセッションが 2 つ必要です。いまは 1 つだけです。',
  'empty.exportNoData': '書き出すものがありません。測定を始めて、履歴に中身を入れてください。',
  'empty.alertsOff': 'アラートはオフです。オンにしても、アプリが開いている間だけ働きます。',
  'empty.scheduleEmpty': '時刻が一つも設定されていません。スケジュールはアプリが開いている間だけ働きます。',
  'empty.historyEmpty': '履歴は空です。',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'モジュール一覧',

  'modules.01.title': 'レコーダー',
  'modules.01.desc': '1 分から 30 日まで、測定の時間ごとの推移。',
  'modules.02.title': 'しきい値',
  'modules.02.desc': '指標ごとに、注意と警告の境目を自分で決めます。',
  'modules.03.title': 'キャリブレーション',
  'modules.03.desc': '既知の光源を基準に合わせること、そしてキャリブレーションでは直らないこと。',
  'modules.04.title': 'レポート',
  'modules.04.desc': '日次と週次のまとめを、印刷物のような体裁で。',
  'modules.05.title': '書き出し',
  'modules.05.desc': '測定値を CSV または JSON ファイルに保存します。列の説明つきです。',
  'modules.06.title': '比較',
  'modules.06.desc': '2 つのセッションを並べて、差を数値で示します。',
  'modules.07.title': '画面テスト',
  'modules.07.desc': '自分のモニターを確かめるためのテストパターン。順を追って。',
  'modules.08.title': 'スケジュール',
  'modules.08.desc': '自分で決めた時刻に測定します。',
  'modules.09.title': 'アラート',
  'modules.09.desc': 'しきい値を超えたときの通知 — そして、それが働かないとき。',
  'modules.10.title': '支援',
  'modules.10.desc': 'このアプリはすべて無料です。ここで作者にコーヒーをおごれます。',
  'modules.11.title': 'ドキュメント',
  'modules.11.desc': 'この測定が何であり、そして何では決してないのか。',
  'modules.12.title': '設定',
  'modules.12.desc': 'テーマ、文字の大きさ、動きの抑制、履歴の消去。',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': '測定チャンネル',
  'channels.pick': '大きな表示に出す',
  'channels.stale': 'データなし',
  'channels.approx': '近似値',

  'help.unit': '単位',
  'help.range': '範囲',
  'help.thresholds': 'しきい値',
  'help.warn': '注意のしきい値',
  'help.crit': '警告のしきい値',
  'help.now': '現在',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „指標” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': '指標',
  'col.unit': '単位',
  'col.range': '範囲',
  'col.direction': '向き',
  'col.time': '時刻',
  'col.date': '日付',
  'col.zone': 'ゾーン',
  'col.avg': '平均',
  'col.min': '最小',
  'col.max': '最大',
  'col.name': '列',
  'col.meaning': '内容',
  'col.channel': 'チャンネル',
  'col.gain': 'ゲイン',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': '時間の範囲',
  'recorder.range.60s': '60 秒',
  'recorder.range.15min': '15 分',
  'recorder.range.1h': '1 時間',
  'recorder.range.24h': '24 時間',
  'recorder.range.30d': '30 日',
  'recorder.gap': '測定なし',
  'recorder.sessionTitle': 'セッションの統計',
  'recorder.zonesCaption': '青色光の割合のゾーン分布',
  'recorder.tableCaption': '選んだ範囲の測定値',
  'recorder.crosshair': '読み取りカーソル',
  'recorder.prevAria': '一つ前の点',
  'recorder.nextAria': '一つ後の点',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': '外観',
  'settings.themeLabel': 'テーマ',
  'settings.themeSystem': 'システムに合わせる',
  'settings.themeLight': 'ライト',
  'settings.themeDark': 'ダーク',
  'settings.themeHint': '「システムに合わせる」テーマは、携帯電話の設定と一緒に変わります。',
  'settings.textLabel': '文字の大きさ',
  /* Mnożnik jako LICZBA we wstawce — 1.15 po japońsku, 1,15 po polsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': '文字だけでなく、画面全体を大きくします — ボタンも行も、文字と一緒に大きくなります。',
  'settings.motionGroup': '動き',
  'settings.motionLabel': '動きを減らす',
  'settings.motionHint': 'すべての遷移を止めます。スケールの針はなめらかに動かず、1 秒に一度跳ぶようになります。',
  'settings.dataTitle': 'データ',
  'settings.clearLabel': '履歴を消去',
  'settings.clearHintTpl': '履歴にはいま {count} 件の点が保存されています。',
  'settings.clearHintEmpty': '履歴は空です。',
  'settings.clearTitle': '履歴を消去しますか？',
  'settings.clearConfirm': '測定履歴をすべて消去しますか？ 取り消せません。',
  'settings.clearKey': '消去',
  'settings.aboutTitle': 'このアプリについて',
  'settings.versionTpl': '{app}、バージョン {version}。',
  'settings.offlineText': 'アプリはネットワークがなくても動きます。一度開いたあとは、すべてのファイルがブラウザーの保存領域にあるので、機内モードでも何も変わりません。アプリはネットワークへの要求を一切行わないため、どのサーバーにも何も送信されません。',
  'settings.docsKey': 'ドキュメントを開く',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'キャンセル',
  'common.save': '保存',
  'common.reset': '既定値に戻す',
  'common.yes': 'はい',
  'common.no': 'いいえ',
  'common.on': 'オン',
  'common.off': 'オフ',
  'common.sep': ' · ',
  'common.stepsTitle': '手順',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': '自分のしきい値は何のためか',
  'modules.02.intro': 'しきい値は、アプリがいつ「注意」と言い、いつ「警告」と言うかを決めます。既定値は規格ではなく、私たちの編集上の判断です — 違う条件で測るなら、自分に合わせて動かしてください。評価もダッシュボードの一文も、すぐに新しいしきい値で計算されます。',
  'modules.02.orderNormal': '注意のしきい値は、警告のしきい値より下になければなりません。',
  'modules.02.orderInvert': 'ここでは値が高いほうがよいので、注意のしきい値は警告のしきい値より上になります。',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'スケールのプレビュー: {name}',
  'modules.02.nowTpl': '現在 {value}',
  'modules.02.resetDone': '既定のしきい値に戻しました。',
  'modules.02.profilesTitle': 'プロファイル',
  'modules.02.profilesHint': 'プロファイルは、七つの指標すべてのしきい値をひとまとめに保存したものです。プロファイルを適用すると、それらが一度に入れ替わります。',
  'modules.02.profileSaveKey': '現在のしきい値を保存',
  'modules.02.profileNameLabel': '新しいプロファイルの名前',
  'modules.02.profileNameHint': '名前はこの端末に残ります。40 文字までです。',
  'modules.02.profileNameEmpty': 'プロファイルの名前を入力してください。',
  'modules.02.profileSavedTpl': 'プロファイル「{name}」を保存しました。',
  'modules.02.profileAppliedTpl': 'プロファイル「{name}」を適用しました。',
  'modules.02.profileRemovedTpl': 'プロファイル「{name}」を削除しました。',
  'modules.02.profileFailed': 'このプロファイルは適用できませんでした。',
  'modules.02.profileCustomTpl': '{date} に保存した自分のプロファイル。',
  'modules.02.builtin.default.name': '既定',
  'modules.02.builtin.default.desc': '指標カタログのしきい値 — すべての測定の出発点です。',
  'modules.02.builtin.evening.name': '夜 — おだやか',
  'modules.02.builtin.evening.desc': '冷たい光の色と概日リズムへの影響について、早めに注意します。',
  'modules.02.builtin.work.name': 'デスクワーク',
  'modules.02.builtin.work.desc': '明るく冷たい昼光は許し、ちらつきと均斉度に目を配ります。',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'なぜこれが効くのか',
  'modules.03.why': 'カメラのセンサーには、チャンネルどうしの決まったずれがあります。白い紙を測ると、そのずれの大きさがわかり、差し引けるようになります。このアプリの中で本当に精度を上げられる唯一の機能です — それでも、カメラが分光器になるわけではありません。',
  'modules.03.steps.1': '測りたい光の下に、白い紙を置いてください。',
  'modules.03.steps.2': 'ダッシュボードで「スタート」を押し、フレームいっぱいに紙を写してください。',
  'modules.03.steps.3': 'ここに戻って「キャリブレーション」を押し、3 秒間、携帯電話を動かさないでください。',
  'modules.03.runKey': 'キャリブレーション（3 秒）',
  'modules.03.clearKey': 'キャリブレーションを削除',
  'modules.03.busyTpl': '紙を測っています… 残り {sec} 秒',
  'modules.03.statusNone': 'キャリブレーションはありません。測定は動きます。値は比較のためのものとして扱ってください。',
  'modules.03.statusOnTpl': '{date} {time} にキャリブレーションしました。',
  'modules.03.gainsTitle': 'チャンネルのゲイン',
  'modules.03.gainR': '赤',
  'modules.03.gainG': '緑',
  'modules.03.gainB': '青',
  'modules.03.gainsNone': '未設定',
  'modules.03.needRunning': 'まず測定を開始し、白い紙にカメラを向けてください。',
  'modules.03.tooFew': 'サンプルが足りません。測定が本当に動いているか確認してください。',
  'modules.03.tooDark': '画像が暗すぎてキャリブレーションできません。紙をもっと明るく照らして、もう一度お試しください。',
  'modules.03.refused': 'チャンネルのずれが大きすぎて、キャリブレーションとして受け入れられません。均一な光の下で白い紙をお使いください。',
  'modules.03.done': 'キャリブレーションしました。色温度と概日リズムへの影響が、これでより正確になります。',
  'modules.03.cleared': 'キャリブレーションを削除しました。',
  'modules.03.limitsTitle': 'キャリブレーションで直らないこと',
  'modules.03.limits.1': 'キャリブレーションが揃えるのは、カメラの三つのチャンネルだけで、それ以上のことはしません。カメラにスペクトルを与えるわけではないので、色温度と概日リズムへの影響は、sRGB の色から計算した近似値のままです。',
  'modules.03.limits.2': 'シーンの明るさを絶対量に変えることもありません — この数値は相対値のままです。自動露出やホワイトバランスを止めることもなく、それらはその下で測定値を動かし続けます。',
  'modules.03.limits.3': 'ほかの光には引き継がれません。ある電球の下で行ったキャリブレーションは、その電球について語るだけです。光源が変わったら、やり直してください。そして、この測定が何ではないかについては、何も変わりません — これは依然として検査ではなく、病気の診断の根拠にもなりません。',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'レポートの期間',
  'modules.04.rangeDay': '1 日',
  'modules.04.rangeWeek': '1 週間',
  'modules.04.headTpl': '{from} から {to} まで · 履歴 {count} 点。',
  'modules.04.tableTitle': 'まとめ',
  'modules.04.tableCaption': '選んだ期間の平均・最小・最大',
  'modules.04.panoramaTitle': 'パノラマ',
  'modules.04.panoramaAriaTpl': 'パノラマ: {name}、{span}。',
  'modules.04.panoramaSpanDay': '直近 1 日を時間ごとに分けたもの',
  'modules.04.panoramaSpanWeek': '直近 1 週間を日ごとに分けたもの',
  'modules.04.panoramaHint': '棒の高さと色は同じことを言っています。正常範囲なら低く、注意なら中ほど、警告なら満杯です。根元の横線は、測定のなかった時間を表します。',
  'modules.04.coverageDayTpl': '測定は {total} 時間のうち {done} 時間をカバーしました。',
  'modules.04.coverageWeekTpl': '測定は {total} 日のうち {done} 日をカバーしました。',
  'modules.04.zonesTitle': 'ゾーンの分布',
  'modules.04.zonesCaptionTpl': '主要チャンネル {name} について計算しています。',
  'modules.04.worstTpl': 'もっとも厳しかった時間帯: {value}。',
  'modules.04.worstNone': 'はっきりしたものはなし',
  'modules.04.worstHourTpl': '{hour}',
  'modules.04.adviceTitle': 'どうすればよいか',
  'modules.04.adviceMelanopicTpl': '概日リズムへの影響は平均 {value}× でした。夜は 0.50 を下回るとよいでしょう — いちばん簡単なのは、暖色の電球かナイトモードです。',
  'modules.04.adviceKelvinTpl': '光は冷たいほうでした（平均 {value} K）。仕事には申し分ありませんが、就寝の 2 時間前には 3000 K を下回るほうが穏やかです。',
  'modules.04.adviceFlickerTpl': 'はっきりしたちらつきが見えます（平均 {value}%）。たいていは安価な調光器か、バックライトの電源が原因です。',
  'modules.04.adviceUniformityTpl': '光の広がりにむらがあります（{value}%）。ランプを動かすか角度を変えるほうが、電球を替えるより効くのがふつうです。',
  'modules.04.adviceWorstTpl': 'しきい値の外に出た測定値がもっとも集まっている時刻は {hour} です。',
  'modules.04.adviceNone': 'この期間には、設定したしきい値を超えて目立つものはありません。',
  'modules.04.limitsTitle': 'これは健康上の助言ではありません',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'ここでの結論は、この携帯電話のカメラが見たものだけから導かれています。アプリはスペクトルを測らず、いかなる診断も行いません。',
  'modules.04.printHint': 'このページは印刷物のように組んであります。表も説明文も、紙の上でも、システムの拡大鏡でも、スクリーンリーダーでも同じように読めます。',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'データの範囲',
  'modules.05.range1h': '1 時間',
  'modules.05.range24h': '1 日',
  'modules.05.range7d': '7 日',
  'modules.05.range30d': '30 日',
  'modules.05.csvKey': 'CSV ファイルを保存',
  'modules.05.jsonKey': 'JSON ファイルを保存',
  'modules.05.formatTitle': 'ファイル形式',
  'modules.05.formatCsv': 'CSV: 列の区切りはセミコロン、小数点はコンマ、文字コードは BOM 付きの UTF-8 です。小数点にコンマを使う地域設定の Excel なら、何も設定せずにこのファイルを開けます。',
  'modules.05.formatJson': 'JSON: 同じデータが「points」フィールドに入ります。小数点はピリオド、時刻はミリ秒のタイムスタンプです — 形式がそれを求めています。',
  'modules.05.resolution': '履歴は 5 秒ごとに 1 点を保存し、30 日前までさかのぼります。1 秒に 5 サンプルという完全な分解能は、ファイルには入りません — エンジンはそれを 1 分間しか保持しません。',
  'modules.05.offline': 'ファイルは端末の中で作られ、端末の中に留まります。書き出しはネットワークに接続しません。',
  'modules.05.columnsTitle': '列の説明',
  'modules.05.columnsCaption': 'ファイルの列と、その意味',
  'modules.05.descDate': '端末の時計による、その点の日付。日‑月‑年の順で書かれます。',
  'modules.05.descTime': '秒までの、その点の時刻。',
  'modules.05.descZone': '保存した時点の、青色光の割合のゾーン。エンジンがゾーンを保存するのはこの指標だけです — ほかの指標については、しきい値から求めてください。',
  'modules.05.descMetricTpl': '{short} 単位: {unit}。範囲 {min}–{max}。',
  'modules.05.previewTitle': 'プレビュー',
  'modules.05.previewHint': 'ファイルの最初の 5 行を、保存されるとおりに示しています。',
  'modules.05.savedTpl': 'ファイル {name} を保存しました — {rows} 行。',
  'modules.05.failed': 'このブラウザーはファイルの保存を許可しませんでした。',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'アプリは、終了した測定セッションをすべてこの端末に保存します。2 つ選ぶと、一つのテープの上に並べて、差を数値で読めます。',
  'modules.06.noSessions': '終了したセッションがまだ一つもありません。測定を開始し、停止してから、ここに戻ってきてください。',
  'modules.06.slotA': 'セッション A',
  'modules.06.slotB': 'セッション B',
  'modules.06.sessionTpl': '{date} {time} · {dur}',
  'modules.06.tapeTitle': 'テープ',
  'modules.06.tapeAriaTpl': 'セッション {slot} の推移、指標 {name}。',
  'modules.06.tapeHint': '両方のセッションを同じ幅に引き伸ばしています。1 本の棒は、同じ時刻ではなく、継続時間の同じ割合を表します。高さと色の意味は、ダッシュボードと同じです。',
  'modules.06.tapeChannelTpl': 'テープが示している主要チャンネル: {name}。',
  'modules.06.diffTitle': '差',
  'modules.06.diffCaption': '両セッションの平均と、その差',
  'modules.06.clearKey': '保存したセッションを削除',
  'modules.06.cleared': '保存したセッションを削除しました。',
  'modules.06.savedTpl': 'セッションを保存しました: {dur}。',
  'modules.06.limitsTitle': 'この比較が語らないこと',
  'modules.06.limits': '比べているのは 2 つの測定であって、2 つの光源ではありません。セッションの間に構図、距離、時間帯、携帯電話の置き方が変わっていれば、差はそのことも表しています。もっとも正直な比較は、照明を変える前と後の、同じ場面どうしです。',
  'modules.06.keepTpl': '記憶しておくのは、新しいほうから {count} セッションまでです。',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'テストパターンは、この端末の画面いっぱいに表示されます。目で画面を見るためのものです。白は均一か、灰色が色に転んでいないか、四隅でバックライトが漏れていないか。',
  'modules.07.steps.1': 'ふだん作業するときの明るさに画面を設定し、システムのナイトモードを切ってください。',
  'modules.07.steps.2': '下の一覧からパターンを選んでください。画面全体に広がります。',
  'modules.07.steps.3': '画面から 60 センチほど離れ、正面から見てください。そのあと、同じパターンを斜めから見ます。',
  'modules.07.steps.4': '「パターンを閉じる」ボタンか Escape キーで抜けて、次に進んでください。',
  'modules.07.planesTitle': 'パターン',
  'modules.07.exitKey': 'パターンを閉じる',
  'modules.07.showAriaTpl': 'パターンを表示: {name}',
  'modules.07.planeAriaTpl': 'テストパターン: {name}。閉じるボタンは画面の下にあります。',
  'modules.07.plane.white.name': '白',
  'modules.07.plane.white.hint': 'むら、色かぶり、縁の近くで明るくなっている部分を探してください。白は面全体で一つの色であるべきです。',
  'modules.07.plane.gray75.name': '灰色 75%',
  'modules.07.plane.gray75.hint': '灰色は灰色であるべきです。緑がかった、あるいはピンクがかった転びは、画面のホワイトバランスがずれている印です。',
  'modules.07.plane.gray50.name': '灰色 50%',
  'modules.07.plane.gray50.hint': '色の転びを見るのに、いちばん適したパターンです。中央と四隅を比べてください。',
  'modules.07.plane.gray25.name': '灰色 25%',
  'modules.07.plane.gray25.hint': '暗い灰色は、バックライトの光漏れと、安価なパネルの縞を映し出します。',
  'modules.07.plane.black.name': '黒',
  'modules.07.plane.black.hint': '暗い部屋では、バックライトの漏れも、明るくなった隅も、すべてここに見えます。',
  'modules.07.plane.red.name': '純赤',
  'modules.07.plane.red.hint': '一様な赤は、死んだサブピクセルとパネルのむらを明らかにします。',
  'modules.07.plane.green.name': '純緑',
  'modules.07.plane.green.hint': '緑はもっとも多くの明るさを運ぶので、壊れたピクセルをいちばん見つけやすいのがこの色です。',
  'modules.07.plane.blue.name': '純青',
  'modules.07.plane.blue.hint': '青は、画面表面の汚れや拭き跡を、白よりもよく見せます。',
  'modules.07.plane.grid.name': 'グリッド',
  'modules.07.plane.grid.hint': '線は、中央と同じだけ四隅でも鋭くあるべきです。縁のにじみは、画像の拡大縮小の問題です。',
  'modules.07.warn': 'パターンは画面全体を覆い、測定ボタンのある操作用ダッシュボードも隠します。アプリの中でそうなるのはここだけで、だからこそ終了ボタンは大きく、常に見えています。パターンが画面にある間、測定は動き続けていて、止めることはできません — ボタンに戻るには、パターンを閉じてください。',
  'modules.07.cameraTitle': 'ここではできないこと',
  'modules.07.camera': '携帯電話は自分の画面を見られないので、これらのパターンを同じ端末で測ることはできません。モニターを測るには、パターンをモニターに表示し、測定は携帯電話で行ってください — 二つの別の端末、二つの別の役割です。',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'スケジュールは、決めた時刻に測定を思い出させます。カメラを自分で起動することはありません。決めた時刻に通知を出すので、測定はダッシュボードの「スタート」で始めてください。最初のときと同じです。',
  'modules.08.onlyOpenTitle': 'これが働かないとき',
  'modules.08.onlyOpen': 'スケジュールはアプリが開いている間だけ働きます。閉じたブラウザーのタブは時間を数えず、何も知らせません。システム通知の許可は求めませんし、ネットワークには何も送信しません。',
  'modules.08.enableLabel': 'リマインダーをオンにする',
  'modules.08.timesTitle': '時刻',
  'modules.08.timeAriaTpl': '時刻 {n}: リマインダーの時刻',
  'modules.08.addKey': '時刻を追加',
  'modules.08.removeAriaTpl': '{time} の時刻を削除',
  'modules.08.addedTpl': '{time} の時刻を追加しました。',
  'modules.08.removedTpl': '{time} の時刻を削除しました。',
  'modules.08.badTime': '22:00 の形式で時刻を入力してください。',
  'modules.08.nextTpl': '次のリマインダー: {time}。',
  'modules.08.nextNone': 'リマインダーはオフです。',
  'modules.08.dueTpl': '予定していた測定の時刻です: {time}。',
  'modules.08.dueKey': 'ダッシュボードを表示',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'アラートは一つの指標を見張り、その指標が選んだゾーンを設定した時間だけ途切れずに保ったときに、はじめて知らせます。測定を止めることも、ボタンを隠すことも、決してありません。',
  'modules.09.enableLabel': 'アラートをオンにする',
  'modules.09.metricLabel': '見張る指標',
  'modules.09.levelLabel': 'どのゾーンから',
  'modules.09.levelWarning': '注意から上',
  'modules.09.levelCritical': '警告のみ',
  'modules.09.sustainLabel': '途切れずに何秒続いたら',
  'modules.09.sustainHint': '時間が短いほど、携帯電話を動かしたときの誤報が増えます。5 秒より下には下げません。',
  'modules.09.soundLabel': '短い通知音',
  'modules.09.soundHint': '音は端末の中で作られます。ネットワークからは何もダウンロードされません。',
  'modules.09.cooldownHint': 'アラートは 2 分に 1 回までです。サンプルごとに鳴る警報は、いずれ切られたままになる警報です。',
  'modules.09.whenNotTitle': 'アラートが働かないとき',
  'modules.09.whenNot': '通知はアプリの中にあり、システムの中にはありません。アプリが閉じているときやバックグラウンドに隠れているとき、測定が動いていないとき、そして見張っている指標がそのときに測れないときには働きません。システム通知の許可は求めません。',
  'modules.09.firedTpl': '{name}: {sec} 秒間 {zone} — 現在 {value}。',
  'modules.09.saved': 'アラートの設定を保存しました。',
  'modules.09.statusOnTpl': '見張り中: {name}、{level}、{sec} 秒後。',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'このアプリは無料です',
  'support.freeText': '七つの指標はすべて、初回起動から数値を表示します。レコーダー、しきい値、キャリブレーション、レポート、書き出し、セッションの比較、そして 30 日分の履歴すべてが、アカウントも料金も制限もなく動きます — オフラインでも同じです。あとから料金と引き換えに渡されるものは、ここには何もありません。',
  'support.whyTitle': 'なぜお願いするのか',
  'support.whyText': 'ライトモニターは、仕事のあとの時間に、私が一人で作って保守しています。支援は、修正に必要な時間、次の携帯電話での検証、そしてモジュール一覧に並ぶ次の道具のために使われます。誰も何も払わなくても、動かなくなるものはありません。',
  'support.nothingTitle': '寄付で得られるもの',
  'support.nothingText': '何もありません。寄付をしても、どの数値も、どのモジュールも、どの設定も解放されません。最初からすべて解放されているからです。残るのは、誰かの役に立ったと私が知ることだけです。',
  'support.keyTitle': '手を貸してくださるなら',
  'support.keyLabel': 'コーヒーをおごる',
  'support.keyAria': 'コーヒーをおごる — 外部のページを新しいタブで開きます',
  'support.serviceText': '寄付のプロフィールは、たとえば Buy Me a Coffee のような外部のサービスが運営しています。アプリはそこからスクリプトもウィジェットも画像も読み込みません — ここにあるのはただのリンクで、それ以外には何もありません。',
  'support.privacyText': 'このボタンを押すと外部のページが新しいタブで開きます。それが、何かがこの端末から出ていく唯一の瞬間です。測定、履歴、設定は元のまま — このブラウザーの保存領域に留まります。',
  'support.privacyPendingText': 'アドレスが用意されたら、ボタンを押すと外部のページが新しいタブで開き、それが、何かがこの端末から出ていく唯一の瞬間になります。測定、履歴、設定は元のまま — このブラウザーの保存領域に留まります。',
  'support.emptyTitle': 'プロフィールはまだつながっていません',
  'support.emptyText': '寄付のプロフィールのアドレスはまだ入力されていないので、どこにもつながらないボタンをここに置いてはいません。アプリの残りの部分はそのまま動きます — この寄付を待っているものは何もありません。',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'このアプリが測らないもの',
  'docs.notList.1': 'スペクトルは測りません。カメラには広い色チャンネルが 3 つあり、露出もホワイトバランスも自動です。',
  'docs.notList.2': '絶対値は測りません。シーンの明るさは相対的な指標であって、測光による測定の結果ではありません。',
  'docs.notList.3': '色温度を直接は測りません。色温度と概日リズムへの影響は、sRGB の色から計算した近似値です。',
  'docs.notList.4': '電源由来のちらつきは見えません。5 Hz のサンプリングで見えるのは 2.5 Hz より下の明滅だけです — 電源由来の 100 Hz は届く範囲になく、アプリがそれを測定結果として示すことは決してありません。',
  'docs.notList.5': '診断は行わず、健康上の助言もしません。どの測定値も、そのどちらでもありません。',
  'docs.notList.6': 'あなたの光を、公的な基準と比べることはありません。しきい値はモジュール 02 で変えられる設定です。',
  'docs.whatTitle': '何を、どう測るのか',
  'docs.whatLead': '携帯電話のカメラが照らされた面を見て、アプリは 1 秒に 5 回、フレーム中央部分の R・G・B チャンネルの平均を計算します。この三つの数値から、七つの指標を導いています。',
  'docs.whatCrop': 'その部分とは、フレームの幅の 60%、高さの 60% にあたる中央 — 「照準」の画面で照準枠が囲んでいる長方形そのものです。その外側は何も計算に入りません。',
  'docs.whatRate': 'サンプルは 200 ms ごと、つまり 1 秒に 5 回です。直近 1 分は完全な分解能でメモリーにあり、それより古いものは 5 秒ごとに保存され、30 日前までさかのぼります。',
  'docs.metricsTitle': '七つの指標',
  'docs.formulasTitle': '計算式',
  'docs.formula.share.formula': '青色光の割合 = B / (R + G + B) × 100%',
  'docs.formula.share.text': 'ガンマを戻さずに sRGB の値のまま計算しています — 意図的です。これは前のバージョンのアプリと同じ定義なので、当時設定したしきい値がいまも同じことを意味します。色を明るさから切り分けます。',
  'docs.formula.brightness.formula': '明るさ = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': 'チャンネルの平均値を、範囲に対する百分率で表したものです。自動露出がその下でこの値を動かすので、相対的な指標です — 一つの数値を測定結果として読むのではなく、二つの場面を比べてください。',
  'docs.formula.kelvin.title': '色温度 — McCamy の近似式',
  'docs.formula.kelvin.formula': 'n = (x − 0.3320) / (y − 0.1858)\nCCT = −449 n³ + 3525 n² − 6823.3 n + 5520.33',
  'docs.formula.kelvin.text': 'まず sRGB のガンマを戻し、次に行列で D65 白色点の CIE XYZ に移して、色度 x, y を計算します。McCamy の式が信頼できるのは、おおよそ 2000 K から 12500 K の間です。その範囲の外では三次式がずれていくので、結果は打ち切られ、信頼できないものとして印が付きます — そのときスケールの基線は破線になり、「方法の範囲外です」という一文が出ます。',
  'docs.formula.melanopic.title': '概日リズムへの影響 — メラノピック比',
  'docs.formula.melanopic.formula': 'mel = 0.0016 R + 0.3110 G + 0.8460 B\nY = 0.2127 R + 0.7152 G + 0.0722 B\n結果 = (mel / Y) × 中性的な白で 1.00 になるよう正規化',
  'docs.formula.melanopic.text': '三つのチャンネルはすべて線形値です。本来の量は、スペクトルとメラノプシンの感度曲線（ピークは 490 nm あたり）との積分です。カメラには広いチャンネルが 3 つしかないので、sRGB の原色を、その近似的な波長（R 612 nm、G 549 nm、B 465 nm）でのメラノピック感度で重み付けしています。変化の向きは信頼できますが、絶対値は信頼できません — だからこの数値には「≈」の記号が付いています。',
  'docs.formula.flicker.formula': 'ちらつき = (max − min) / (max + min) × 100%',
  'docs.formula.flicker.text': 'IES の定義で、明るさのサンプルの窓から計算します。周波数は、信号が平均値を横切る回数から推定します。5 Hz のサンプリングで見える変調は 2.5 Hz より下だけ（ナイキスト限界）で、信頼できると認めるのは、振幅 0.5% 以上で 0.2 Hz から 2 Hz の間の周波数だけです。そのしきい値より下では、平均値を横切るのは光源の明滅ではなく、センサーのノイズです。',
  'docs.formula.uniformity.formula': '均斉度 = もっとも暗い区画 / もっとも明るい区画 × 100%',
  'docs.formula.uniformity.text': '中央部分を 3×3 の格子で九つの区画に分け、両端を比べます。100% は、光が完全に均等に広がっている状態です。画面で値が低ければバックライトの光漏れか映り込み、机の上ならランプの置き方がよくないということです。目の快適さとならんで、高いほうがよい唯一の指標です。',
  'docs.formula.comfort.formula': '100 点から減点:\n概日リズムへの影響が 0.75 超 — 最大 35 点\n光の色が 4000 K 超 — 最大 25 点\nちらつきが 5% 超 — 最大 25 点\n均斉度が 60% 未満 — 最大 15 点',
  'docs.formula.comfort.text': '六つの数値の代わりに、ひとつの評価です。測れなかった指標は、減点をまったく与えません — データがないことが、よい結果のふりをすることは決してありません。重みは規格ではなく、私たちの編集上の判断です。だからこそモジュール 01 は内訳を示します。この評価に同意しないでいられるように。',
  'docs.rangesTitle': '範囲としきい値',
  'docs.rangesLead': '下のしきい値は、いま実際に効いているものです — モジュール 02 で変更したなら、表は工場出荷時の値ではなく、あなたの値を示します。',
  'docs.dirNormal': '低いほど穏やか',
  'docs.dirInvert': '高いほどよい',
  'docs.privacyTitle': 'データとプライバシー',
  'docs.privacyText': 'カメラの映像はどこにも送信も保存もされません — 1 フレームから残るのは三つの数値だけです。測定、しきい値、設定は、この端末のブラウザーの保存領域にあります。アプリはネットワークへの要求を一切行わず、オフラインで動きます。',
  'docs.mdrTitle': '免責事項',
  'docs.freeText': 'アプリはすべて無料で、これからもそうです。七つの指標、履歴、レポート、書き出し、オフラインでの動作が、アカウントも料金も制限もなく使えます。お礼をしたい方は、モジュール 10「支援」をご覧ください。',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'アプリが完全には読み込まれませんでした',
  'boot.filesTpl': '読み込めなかったファイル: {list}。',
  'boot.modulesTpl': '応答しなかったモジュール: {list} — これらの項目は一覧から開けません。',
  'boot.modulesRangeTpl': 'モジュール {from}–{to}',
  'boot.tail': 'ページを再読み込みしてください。それでも直らない場合は、サーバー上のファイルが不完全です。',
  'boot.loss.bus': 'モジュールどうしが見えなくなり、測定が始まりません',
  'boot.loss.metrics': 'どの値も計算されません',
  'boot.loss.scaleCore': 'スケールの形状と数値の書式がなくなります',
  'boot.loss.scaleText': 'インターフェイスの文字がすべてなくなります',
  'boot.loss.shell': 'どのモジュールも開けません',
  'boot.loss.engine': 'カメラと測定が始まりません',
  'boot.loss.dash': 'ダッシュボードが空のままになります'
});
