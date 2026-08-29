/* docs/v2/i18n/ja.js — słownik WERSJI 2, japoński.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/ja.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej.
 *
 * TERMINOLOGIA — brana z docs/shared/i18n/ja.js i nie ruszana:
 *   青色光の割合, シーンの明るさ, 色温度, 概日リズムへの影響, ちらつき,
 *   均斉度, 目の快適さ; メラノピック比; strefy 正常範囲 / 注意 / 警告.
 *   Stąd wprost nazwy progów: 注意のしきい値 i 警告のしきい値 — te same słowa
 *   co nazwy stref. Kalibracja to 校正, jak w note.calibration warstwy
 *   wspólnej; klawisz startu to 「スタート」, jak w engine.idle, więc zasłona
 *   podglądu i zdania cytujące klawisz mówią to samo słowo.
 *
 * ROZSTRZYGNIĘCIA WŁASNE (warstwa wspólna tych słów nie zna):
 *   „wskaźnik” i „metryka” → 指標, tak samo jak w nowszej wersji tego samego
 *   produktu (docs/v5/js/i18n/locales/ja.js); „strefa” → ゾーン;
 *   „odczyt” → 測定値, jak w count.readings; „próbka” → サンプル;
 *   „profil” → プロファイル; „punkt pomiaru” → データ点; „próg” → しきい値.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (i dlaczego):
 *   'zone.warning', 'zone.spoken.warning' — polski i angielski mają tu drugie,
 *                           mocniejsze słowo („Ostrzeżenie” zamiast „Uwagi”).
 *                           Japoński go NIE MA: 警告 jest już nazwą strefy
 *                           krytycznej, a trzecie słowo na tę samą strefę
 *                           rozjechałoby się z plakietką i ze zdaniami
 *                           oceniającymi warstwy wspólnej. Zostaje więc 注意 —
 *                           klucz nadpisuje wartość identyczną, świadomie;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi „Pomiary”,
 *                           a nie „Pomiar”.
 *
 * LICZEBNIKI: japoński ma w CLDR jedną kategorię — 'other'. Obiekty form mają
 * więc dokładnie jeden klucz; to nie jest niedokończone tłumaczenie.
 *
 * ODSTĘPY: między liczbą a jednostką zostaje spacja (5 回, 3000 K, 3 秒), tak
 * jak w warstwie wspólnej. Symboli jednostek (%, K, ×, Hz), nazw formatów
 * (CSV, JSON) ani nazw plików nie tłumaczymy.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules. Patrz nagłówek docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ja'] = Object.assign(window.I18nData['ja'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'ライトモニター — 青色光の測定',
  'app.description': 'ライトモニター — 携帯電話のカメラで青色光の割合を測ります。7 つの指標、グラフ、履歴。アカウントも料金もなく、すべて使えます。',
  'app.skipToContent': '本文へスキップ',
  'app.measuring': '測定中',
  'app.docsButton': 'ドキュメントと解説',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — バージョン 2',

  'nav.aria': 'メインナビゲーション',
  'nav.tablistAria': 'アプリの画面',
  'nav.measure': '測定',
  'nav.history': '履歴',
  'nav.tools': 'ツール',
  'nav.support': 'サポート',
  'nav.more': 'その他',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'ドキュメント',
  'panel.thresholds': 'しきい値とプロファイル',
  'panel.reports': 'レポート',
  'panel.export': 'データのエクスポート',
  'panel.compare': 'A/B 比較',
  'panel.calibration': '白い紙で校正',
  'panel.screenCheck': 'モニターを調べる',
  'panel.schedule': 'スケジュール',
  'panel.alerts': '曝露アラート',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': '戻る',
  'action.close': '閉じる',
  'action.refresh': '更新',
  'action.apply': '適用',
  'action.delete': '削除',
  'action.hide': '隠す',
  'action.start': 'スタート',
  'action.stop': '停止',
  'action.switch': '切替',
  'action.switchAria': 'カメラを切り替える: 前面または背面',
  'action.resetDefaults': '初期値に戻す',
  'action.reports': 'レポート',
  'action.exportCsv': 'CSV エクスポート',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': '画面: {name}',
  'a11y.measureStarted': '測定を開始しました。',
  'a11y.measureStopped': '測定を停止しました。',
  'a11y.measureStoppedSummary': '測定を停止しました。測定時間: {duration}、{samples}。',
  'a11y.zoneAnnounce': '{name}: {zone}、{value} {unit}',
  'a11y.profileApplied': 'しきい値のプロファイルを適用しました。',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': '確認',
  'dialog.confirm': '確定',
  'dialog.cancel': 'キャンセル',
  'dialog.infoTitle': 'お知らせ',
  'dialog.ok': '了解',

  'help.sheetTitle': '指標の説明',
  'help.unit': '単位',
  'help.scaleRange': 'スケールの範囲',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę.
     Japoński wielkości liter nie zna, więc wszystkie cztery mówią wprost
     nazwami stref z warstwy wspólnej. */

  'threshold.warn': '注意',
  'threshold.crit': '警告',
  'threshold.warnLabel': '注意のしきい値',
  'threshold.critLabel': '警告のしきい値',
  'threshold.warnAria': '{name} — しきい値: 注意',
  'threshold.critAria': '{name} — しきい値: 警告',

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

  'firstRun.title': '測り方',
  'firstRun.text': '「スタート」を押し、照らされた面に携帯電話を向けて、数秒間動かさずに持ってください。プレビューの枠は、アプリが実際に読み取っている範囲を示しています。',
  'firstRun.close': 'ヒントを閉じる',

  'camera.live': 'ライブ',
  'camera.idle': 'カメラはオフです。「スタート」を押し、照らされた面に携帯電話を向けて、数秒間動かさずに持ってください。',
  'camera.stopped': '測定を停止しました。もう一度測るには「スタート」を押してください。',

  'error.cameraStart': 'カメラを起動できませんでした。',
  'error.engineMissing': '測定モジュールが読み込まれませんでした。',

  'metrics.sevenTitle': '7 つの指標',
  'measure.tilesSub': '1 秒に 5 回更新',

  'session.title': 'このセッション',
  'session.duration': '測定時間',
  'session.samples': 'サンプル数',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     Japoński nie odmienia rzeczownika przez liczbę, więc te trzy nagłówki
     brzmią tak samo jak plakietki stref. */
  'zone.count.good': '正常範囲',
  'zone.count.warning': '注意',
  'zone.count.critical': '警告',

  'note.calibrated': '白い紙で校正済みの測定です — チャンネルはそろえてあります。',

  'tile.helpAria': 'この数字の意味: {name}',
  'tile.noMeasurement': '測定なし',
  'tile.outOfScale': 'スケールの外',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': '注意',
  'zone.spoken.warning': '注意',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': '時間による推移',
  'history.pickHint': '指標と範囲を選んでください',
  'history.metricLabel': '指標',
  'history.rangeAria': 'グラフの時間範囲',
  'history.emptyTitle': 'この範囲にデータはありません',
  'history.emptyText': '「測定」画面で測定を始めてください — グラフは数秒で埋まります。',
  'history.tableTitle': '最新の測定値',
  'history.tableHide': '表を隠す',
  'history.tableShow': '表を表示',
  'history.tableCaption': '最新の測定値、新しい順。',
  'history.tableEmpty': '測定値がありません。「測定」画面で測定を始めてください。',

  'table.time': '時刻',
  'table.metric': '指標',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. */
  'range.1m': '1 分',
  'range.1h': '1 時間',
  'range.24h': '24 時間',
  'range.7d': '7 日',
  'range.30d': '30 日',

  'chart.now': '現在',
  'chart.countSub': {
    other: '選んだ範囲に {n} 件の測定値'
  },
  'chart.aria': '{name}、範囲 {range}、{count}、最新の値 {value} {unit}。',
  'chart.ariaZone': '{name}、範囲 {range}、{count}、最新の値 {value} {unit}、ゾーン: {zone}。',
  'chart.ariaEmpty': '{name} — 範囲 {range} にデータはありません。',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'ウィザードと補助機能',
  'tools.note': 'ツールは測定を読み解く助けになります。どれも最初から使えますし、測定そのものはツールとは無関係に動きます。',

  'tool.thresholds.sub': 'どの値から注意を出すか',
  'tool.compare.sub': '2 つの光のどちらが穏やかか',
  'tool.calibration.sub': '本当に精度を上げる唯一の機能',
  'tool.screenCheck.sub': '5 つの手順で、画面についての結論が出ます',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Harmonogram progów”
     kontra „Harmonogram”. Tak było i tak zostaje. */
  'tool.schedule.title': 'しきい値のスケジュール',
  'tool.schedule.sub': '夜は別のしきい値に — 自分で覚えていなくても',
  'tool.alerts.sub': '警告ゾーンが長く続いたときの合図',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': '設定',
  'more.thresholdsSub': 'どの値から注意を出すか',
  'more.docsSub': '測り方と、この測定が語らないこと',
  'more.appearanceTitle': '外観とアクセシビリティ',

  'settings.theme': 'テーマ',
  'theme.auto': 'システムに合わせる',
  'theme.light': 'ライト',
  'theme.dark': 'ダーク',

  'settings.textScale': '文字の大きさ',
  'textScale.100': '標準',
  'textScale.115': '大きめ (115%)',
  'textScale.130': '最大 (130%)',

  'settings.contrast': 'コントラストを上げる',
  'settings.contrastSub': '枠線を強くし、補助的な文字を濃くします。',
  'settings.sound': 'アラートの音',
  'settings.soundSub': '曝露アラートが働いたときに短く鳴ります。',
  'settings.vibrate': 'アラート時の振動',
  'settings.vibrateSub': '対応している端末でのみ動きます。',

  'more.dataTitle': 'データ',
  'more.clearHistory': '測定履歴を消去',
  'more.clearHistorySub': 'この端末に保存された測定値を削除します。しきい値、プロファイル、設定は残ります。',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'このアプリはすべて無料です。 ',
  'more.supportLink': '任意で支援することもできます。',

  'dialog.clearHistory.title': '保存された履歴を削除しますか？',
  'dialog.clearHistory.body': {
    other: 'この端末から、保存された測定のデータ点を {n} 件削除します。この操作は取り消せません。しきい値、プロファイル、設定はそのまま残ります。'
  },
  'dialog.clearHistory.confirm': '履歴を削除',
  'dialog.clearHistory.cancel': 'このまま残す',

  'toast.historyCleared': '測定履歴を削除しました。',
  'toast.screenUnavailable': 'この画面は、このバージョンではまだ使えません。',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'このアプリが測るもの',
  'docs.leadText': '携帯電話のカメラが照らされた面を見て、アプリは 1 秒に 5 回、フレーム中央部分の R・G・B チャンネルの平均を計算します。この 3 つの数字から 7 つの指標を導きます。',
  'docs.limitsTitle': '方法の限界',
  'docs.limitsText': 'カメラには広い色チャンネルが 3 つあり、露出とホワイトバランスは自動です。スペクトルは測らず、絶対値も知らないので、明るさはルクスではなく相対的な指標です。色温度と概日リズムへの影響は、sRGB の色から計算した近似値です。{rate} Hz のサンプリングでは {limit} Hz より下の明滅しか見えません — 電源由来の 100 Hz は届く範囲になく、このアプリが測定結果として示すことはありません。',

  'note.howTo.repeat.title': '測定を繰り返す',
  'note.howTo.repeat.text': '1 回の測定値はスナップショットです。十数秒測ると、より信頼できる姿が見えます。',

  'docs.scale': 'スケール',
  'docs.direction': '向き',
  'docs.directionHigher': '高いほうがよい',
  'docs.directionLower': '低いほうが穏やか',
  'docs.privacyTitle': 'データとプライバシー',
  'docs.privacyText': 'カメラの映像はどこにも送信も保存もされません — 各フレームから残るのは 3 つの数字だけです。測定、しきい値、設定は、この端末のブラウザの保存領域にあります。アプリはネットワーク通信を一切行わず、オフラインでも動きます。',
  'docs.freeLine': '7 つの指標すべて、履歴、グラフ、ツール、オフライン動作は、アカウントも料金もなく、誰でも使えます。',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'すべて使えます',
  'support.heroText': '7 つの指標すべて、測定履歴、グラフ、すべてのツール、オフライン動作が、誰でも最初から使えます。アカウントも、制限も、料金もありません。',
  'support.whyTitle': 'なぜお願いするのか',
  'support.whyText': '{app} は仕事のあとの時間に作られていて、誰からも収益を得ていません。広告はなく、データも集めず、売るものもありません。維持と、これから先 — 新しい指標、修正、別の携帯電話での検証 — には時間がかかります。このアプリが役に立ったなら、少し手を貸してもらえます。その必要はありません。',
  'support.whatTitle': '寄付で得られるもの',
  'support.whatText': '何もありません。本当に何も解除せず、何も速くしません — アプリは寄付の前も後も、まったく同じに見え、同じように動きます。残るのは、この仕事が誰かの役に立ったと作者が知ることだけです。',
  'support.button': 'コーヒーをおごる',
  'support.pendingTitle': 'プロフィールはまだつながっていません',
  'support.pendingText': '支援を送る先のアドレスは、まだここにありません。用意ができたら、この場所に現れます — それまで、アプリの中のすべてはまったく同じように動きます。',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'ボタンは外部の Buy Me a Coffee のページを新しいタブで開きます。何かがこの端末から出ていくのはその瞬間だけで、それが起きるのはあなたが押したあとです。測定、履歴、設定はここに留まります。',
  'privacy.externalPending': 'アドレスが用意されると、押したときに外部のページが新しいタブで開きます。それが、何かがこの端末から出ていく唯一の瞬間になります。測定、履歴、設定はここに留まります。',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (ui-core.js に予備あり)',
  'boot.need.metrics': '値が一つも計算されません',
  'boot.need.bus': 'モジュールどうしが見えなくなります',
  'boot.need.ui': '画面を切り替えられません',
  'boot.need.engine': 'カメラと測定が動きません',
  'boot.need.support': '「サポート」画面が空になります',
  'boot.need.tools': '「ツール」タブが空になります',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': '次のモジュールが読み込まれませんでした: {list}。',
  'boot.consoleHint': 'index.html の <script> の順序とパスを確認してください。',
  'boot.incompleteTitle': 'アプリが完全に読み込まれませんでした',
  'boot.incompleteText': '{missing} ページを再読み込みしてください。それでも直らない場合は、サーバー上のファイルが不完全です。',
  'boot.newVersion': 'アプリの新しいバージョンがあります。',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'しきい値の働き。 ',
  'thresholds.noteText': '注意のしきい値は黄色の状態を、警告のしきい値は赤の状態を点けます。変更はすぐに効きます — すでに画面に出ている測定値にも効きます。自分の組み合わせは名前を付けて保存でき、いつでも呼び戻せます。',
  'thresholds.profilesTitle': 'しきい値のプロファイル',
  'thresholds.profilesSub': '組み込みの 3 つと自分で作ったもの',
  'thresholds.customName': '自分のプロファイルの名前',
  'thresholds.customPlaceholder': '例: 夜の寝室',
  'thresholds.save': '現在のしきい値を保存',
  'thresholds.saveHelp': '上で設定したしきい値を、そのまま保存します。',

  'profile.builtin.default.name': '標準',
  'profile.builtin.default.desc': '指標のカタログにあるしきい値 — すべての測定の出発点です。',
  'profile.builtin.evening.name': '夜 — おだやか',
  'profile.builtin.evening.desc': '冷たい光の色と概日リズムへの影響を、早めに知らせます。',
  'profile.builtin.work.name': '机での作業',
  'profile.builtin.work.desc': '明るく冷たい昼光を許容し、ちらつきと均斉度に目を配ります。',
  'profile.custom.desc': '{date} に保存した、自分のプロファイル。',

  'toast.thresholdsReset': '初期のしきい値に戻しました。',
  'toast.thresholdOrder': '注意のしきい値は、警告のしきい値より低くなければなりません。',
  'toast.thresholdOrderInverted': 'この指標では、注意のしきい値は警告のしきい値より高くなければなりません。',
  'toast.profileNameMissing': 'プロファイル名を入力してください。',
  'toast.profileSaved': 'プロファイル「{name}」を保存しました。',
  'toast.profileApplied': 'プロファイル「{name}」を適用しました。',
  'toast.profileApplyFailed': 'このプロファイルは適用できませんでした。',
  'toast.profileRemoved': 'プロファイルを削除しました。',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'スケジュールの目的。 ',
  'schedule.noteText': '夜に意味のあるしきい値は、昼のものとは違います。「何時から何時まで」のルールがプロファイルを自分で入れ替えるので、覚えておく必要がありません。スケジュールが測定を開始したり停止したりすることは、決してありません。',
  'schedule.toggle': '自動の切り替えをオンにする',
  'schedule.toggleSub': '端末の時計で 1 分ごとに確認します。',
  'schedule.emptyTitle': 'ルールがありません',
  'schedule.emptyText': '下のボタンで最初のルールを追加してください。',
  'schedule.add': 'ルールを追加',
  /* Łącznik między godziną początku a godziną końca. Japoński zapisuje zakres
     falistą kreską, a nie słowem — „22:00 〜 06:00”. */
  'schedule.to': '〜',
  'schedule.profile': 'プロファイル',
  'schedule.fromAria': 'ルール {n}: 開始時刻',
  'schedule.toAria': 'ルール {n}: 終了時刻',
  'toast.scheduleTimeFormat': '時刻は 22:00 の形式で入力してください。',
  'toast.scheduleEnded': 'スケジュールが終わりました — 前のしきい値に戻りました。',
  'toast.scheduleApplied': 'スケジュールがプロファイル「{name}」を適用しました。',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'アラートの働き。 ',
  'alerts.noteText': '1 つの指標を見張り、その指標が選んだゾーンを、設定した時間だけ途切れずに保ったときにはじめて知らせます。測定を止めることはなく、ボタンを覆うこともありません。',
  'alerts.toggle': '曝露アラートをオンにする',
  'alerts.toggleSub': '測定が動いている間だけ働きます。',
  'alerts.metric': '見張る指標',
  'alerts.level': 'どのゾーンから',
  'alerts.level.warning': '注意から上',
  'alerts.level.critical': '警告のみ',
  'alerts.sustain': '何秒間、途切れずに続いたら',
  'alerts.sustainHelp': '時間を短くすると、携帯電話を動かしたときの誤報が増えます。',
  'alerts.sound': '短い電子音',
  'alerts.soundSub': '音は端末の中で作られます。「その他」画面で全体をオフにすることもできます。',
  'alerts.barTitle': '曝露アラート',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} が {seconds} 秒前から注意ゾーンを保っています — いま {value} {unit}。',
  'alerts.message.critical': '{name} が {seconds} 秒前から警告ゾーンを保っています — いま {value} {unit}。',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': '比べ方。 ',
  'compare.noteText': '測定を開始し、カメラを 1 つ目の光源に向けて A として保存します。距離も角度も変えずに光を切り替えて、B を保存します。この比較は、場面が同じときにだけ意味を持ちます。',
  'compare.slotA': '光 A',
  'compare.slotB': '光 B',
  'compare.save': '現在の測定値を保存',
  'compare.savedAt': '{date} {time} に保存',
  'compare.empty': 'まだ何も保存されていません。',
  'compare.verdictTitle': '比較の結果',
  'compare.verdictEmpty': 'どちらが穏やかかを見るには、両方の光を保存してください。',
  'compare.notEnough': 'この 2 つの測定を比べるには、データが足りません。',
  'compare.tie': '2 つの光源は、ほぼ同じ結果になりました ({metric}: {a} と {b} {unit})。差は測定の揺らぎの中に収まっています。',
  'compare.betterA': '穏やかなのは光 A です — {metric} は {better} {unit} で、もう一方は {worse} {unit} です。',
  'compare.betterB': '穏やかなのは光 B です — {metric} は {better} {unit} で、もう一方は {worse} {unit} です。',
  'compare.clear': '比較を消去',
  'toast.compareSavedA': '光 A を保存しました。',
  'toast.compareSavedB': '光 B を保存しました。',
  'toast.compareCleared': '比較を消去しました。',
  'toast.measureFirst': 'まず「測定」画面で測定を開始してください。',

  /* Nazwa wielkości w środku zdania. Po polsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. Japoński
     wielkości liter nie zna, więc to te same nazwy co w warstwie wspólnej. */
  'metric.share.nameLower': '青色光の割合',
  'metric.brightness.nameLower': 'シーンの明るさ',
  'metric.kelvin.nameLower': '色温度',
  'metric.melanopic.nameLower': '概日リズムへの影響',
  'metric.flicker.nameLower': 'ちらつき',
  'metric.uniformity.nameLower': '均斉度',
  'metric.comfort.nameLower': '目の快適さ',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'なぜこれが効くのか。 ',
  'calib.noteText': 'カメラのセンサーには、チャンネルの間に一定のずれがあります。白い紙を測ると、そのずれの大きさがわかり、差し引けるようになります。このアプリの中で、本当に精度を上げる唯一の機能です — それでも、カメラが分光器になるわけではありません。',
  'calib.step1': '測定したい光の下に白い紙を置きます',
  'calib.step2': '測定を開始し、画面いっぱいに紙を写します',
  'calib.step3': '「校正」を押して、3 秒間、携帯電話を動かさずに持ちます',
  'calib.done': '{date} {time} に校正しました。',
  'calib.none': '校正はありません。測定は動きます。値は比較のためのものとして扱ってください。',
  'calib.gain': '{channel} のゲイン',
  'calib.gainsLabel': 'チャンネルのゲイン',
  'calib.gainsUnset': '未設定',
  'calib.start': '校正する (3 秒)',
  'calib.clear': '校正を削除',
  'toast.calibCleared': '校正を削除しました。',
  'calib.error.noEngine': '測定モジュールが利用できません。',
  'calib.error.notRunning': 'まず測定を開始し、カメラを白い紙に向けてください。',
  'calib.error.busy': '校正はすでに動いています。',
  'calib.error.tooFewSamples': 'サンプルが足りません。測定が本当に動いているか確認してください。',
  'calib.error.tooDark': '映像が暗すぎて校正できません。紙をもっと明るく照らして、もう一度お試しください。',
  'calib.error.tooSkewed': 'チャンネルのずれが大きすぎて、校正として受け入れられません。均一な光の下で、白い紙をお使いください。',
  'calib.ok': '校正しました。色温度と概日リズムへの影響が、これでより正確になります。',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': '何のための機能か。 ',
  'screencheck.noteText': '5 つの手順で、レビュー記事と同じようにモニターを調べます。2 つの明るさでの白、バックライトの均斉度、そしてシステムのナイトモードが本当に何かを変えているか。ウィザードは動いている測定を読むだけで、自分で測定を開始することはありません。',
  'screencheck.step.white100.title': '最大の明るさでの白',
  'screencheck.step.white100.hint': 'モニターに白いページを開き、明るさを最大にして、画面でフレームを埋めてください。',
  'screencheck.step.white20.title': '低い明るさでの白',
  'screencheck.step.white20.hint': 'モニターの明るさを 5 分の 1 ほどに下げ、構図は変えないでください。',
  'screencheck.step.corners.title': '画面の四隅',
  'screencheck.step.corners.hint': '明るさを最大に戻し、画面全体をカメラに写してください — バックライトの均斉度を調べます。',
  'screencheck.step.nightOff.title': 'ナイトモード オフ',
  'screencheck.step.nightOff.hint': 'ブルーライトフィルターが切れていることを確認してください。',
  'screencheck.step.nightOn.title': 'ナイトモード オン',
  'screencheck.step.nightOn.hint': 'システムのブルーライトフィルターを入れて、同じ構図を繰り返してください。',
  'screencheck.stepHeading': '手順 {n} / {total}: {title}',
  'screencheck.idleTitle': 'ウィザードは動いていません',
  'screencheck.idleHint': '「測定」画面で測定を開始し、ここに戻って「開始」を押してください。',
  'screencheck.next': '手順を保存して次へ',
  'screencheck.cancel': '中止',
  'screencheck.start': 'ウィザードを開始',
  'screencheck.clearResult': '結果を消去',
  'screencheck.resultTitle': '結果',
  'screencheck.resultEmpty': 'まだ手順が 1 つも保存されていません。',
  'screencheck.resultPartial': '{total} 手順のうち {done} 手順を保存しました。比べられるものがそろうと、結論が出ます。',
  'screencheck.note.uniformityLow': 'バックライトの均斉度は {value}% です — フレームの中に明るさのはっきりした差が見えます。',
  'screencheck.note.uniformityOk': 'バックライトは均一です ({value}%)。',
  'screencheck.note.nightWorks': 'ナイトモードは青色光の割合を {value} パーセントポイント下げています — 効いています。',
  'screencheck.note.nightWeak': 'ナイトモードは青色光の割合を {value} パーセントポイントしか変えていません。システムのフィルターがふつう与える差より小さい値です。',
  'screencheck.note.pwm': '低い明るさでは、ちらつきが {from}% から {to}% に増えます — パルス調光 (PWM) の典型的な兆候です。',
  'toast.screencheckDone': 'ウィザードが終わりました。結果は下にあります。',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'この数字の出どころ。 ',
  'reports.noteText': 'レポートは、この端末に保存された履歴 — 5 秒ごとに 1 点 — から計算します。エンジンは最初の測定から集めているので、レポートはすぐに出せます。',
  'reports.rangeAria': 'レポートの期間',
  'reports.day': '直近 24 時間',
  'reports.week': '直近 7 日',
  'reports.date': '{date} のレポート。',
  'report.headerDay': '{from} から {to} までの 1 日 — {count}。',
  'report.headerWeek': '{from} から {to} までの 1 週間 — {count}。',
  'count.points': { other: '{n} 件のデータ点' },
  'count.samples': { other: '{n} 件のサンプル' },
  'report.emptyTitle': 'この期間にデータはありません',
  'report.emptyText': '「測定」画面で測定を始めてください — 履歴は自動で保存されます。',
  'report.colAvg': '平均',
  'report.colMin': '最小',
  'report.colMax': '最大',
  'report.zonesTitle': 'ゾーンの内訳',
  'report.worstHour': 'いちばん厳しい時間帯',
  'report.worstHourNone': '目立つものなし',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'どうすればよいか',
  'report.disclaimerTitle': 'これは健康上の助言ではありません。 ',
  'report.disclaimerText': '結論は、この携帯電話のカメラが見たものだけから導かれています。このアプリはスペクトルを測らず、ルクスも知らず、いかなる診断も行いません。',

  'advice.melanopic': '概日リズムへの影響は、平均 {value}× でした。夜は 0.50 を下回るとよいでしょう — いちばん簡単なのは、暖かい電球かナイトモードです。',
  'advice.kelvin': '光は冷ためでした (平均 {value} K)。作業には申し分ありませんが、就寝の 2 時間前には 3000 K を下回るほうが穏やかです。',
  'advice.flicker': 'はっきりとしたちらつきが見つかりました (平均 {value}%)。たいていは、安価な調光器かバックライトの電源が原因です。',
  'advice.uniformity': '光の広がりにむらがあります ({value}%)。ランプを動かすか角度を変えるほうが、電球を替えるより効くのがふつうです。',
  'advice.worstHour': 'いちばん厳しい時間帯は {hour}:00 です — 正常範囲を外れた測定値が、そこにいちばん多く集まっています。',
  'advice.none': 'この期間に、正常範囲を超えて目立つものはありません。いまいちばん役に立つのは、A/B 比較で 2 つの光源を比べてみることです。',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'ファイルの形式。 ',
  /* Polski mówi tu o polskim Excelu; po japońsku byłoby to nieprawdą, bo
     japońska lokalizacja Excela używa kropki dziesiętnej. Zdanie idzie więc
     za angielskim: liczy się ustawienie regionalne, a nie kraj. */
  'export.noteText': '列の区切りはセミコロン、小数点はコンマ、文字コードは BOM 付きの UTF-8 です。小数点にコンマを使うロケールに設定された Excel なら、何も設定せずにこのファイルを開けます。',
  'export.range': 'データの範囲',
  'export.columns': 'ファイルの列',
  'export.chipFilled': ' — 値の入る列',
  'export.help': 'ファイルには 7 つの列がすべて入ります — エンジンは最初の測定から計算していて、そのすべてがファイルに入ります。',
  'export.run': 'CSV ファイルを保存',
  'export.previewEmpty': 'この範囲に測定値はありません。測定を始めてください — 履歴は自動で保存されます。',
  'csv.range.hour': '直近 1 時間',
  'csv.range.day': '直近 24 時間',
  'csv.range.week': '直近 7 日',
  'csv.range.month': '直近 30 日',
  'csv.colDate': '日付',
  'csv.colTime': '時刻',
  'csv.colZone': 'ゾーン',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': '選んだ範囲には測定値が 1 件もありません。',
  'toast.exportFailed': 'このブラウザは、ファイルの保存を許可しませんでした。',
  'toast.exportSaved': {
    other: 'ファイル {filename} を保存しました ({n} 行)。'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} 時間 {m} 分',
  'duration.ms': '{m} 分 {s} 秒',
  'duration.s': '{s} 秒'
});
