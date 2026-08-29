/* docs/v1/i18n/ja.js — słownik WŁASNY wersji v1, japoński.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka. Kolejność jest treścią umowy: plik wersji dokłada się do tego samego
 * obiektu i może nadpisać dowolny klucz wspólny — nigdy odwrotnie.
 *
 * DLACZEGO TEN SŁOWNIK JEST SAMOWYSTARCZALNY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar w app.js, własne
 * dwie wielkości zamiast siedmiu i własne nazwy stref (安全 zamiast wspólnego
 * 正常範囲). Dlatego wszystko, co v1 pokazuje, stoi TUTAJ — także klucze,
 * które przypadkiem brzmią tak samo jak wspólne. Gdyby kiedyś warstwa wspólna
 * zmieniła brzmienie stref albo nazwę aplikacji, v1 ma zostać nietknięta.
 *
 * TERMINOLOGIA — brana z docs/shared/i18n/ja.js i nie ruszana:
 *   青色光の割合 (udział niebieskiego), シーンの明るさ (jasność sceny),
 *   色温度, 概日リズム, メラノピックルクス, 医療機器, しきい値 (próg),
 *   測定値 (odczyt, za count.readings), 「スタート」 (klawisz startu, za
 *   engine.idle). Nazw pozostałych pięciu wielkości warstwy wspólnej tu NIE MA,
 *   bo v1 ich nie mierzy.
 *
 * NAZWY STREF: 安全 / 中程度 / 有害 — tak samo jak w nowszej wersji tego samego
 * produktu (docs/v5/js/i18n/locales/ja.js, 'zone.good' / 'zone.warn' /
 * 'zone.crit'), a nie 正常範囲 / 注意 / 警告 warstwy wspólnej. To jest właśnie
 * to własne nazewnictwo, o którym mowa wyżej. Wersja plakatowa (zone.badge.*)
 * brzmi identycznie: japoński nie zna wielkiej litery, a klucz zostaje osobny,
 * bo tego wymaga zestaw.
 *
 * ROZSTRZYGNIĘCIA WŁASNE: „gałka” → ダイヤル; „strefa” → ゾーン;
 * „profil” → プロファイル; „raport” → レポート; „wykres” → グラフ;
 * „spektrometr” → スペクトロメーター（分光器）.
 *
 * LICZEBNIKI: japoński ma w CLDR jedną kategorię — 'other'. Obiekty form mają
 * więc dokładnie jeden klucz; to nie jest niedokończone tłumaczenie.
 *
 * ODSTĘPY: między liczbą a jednostką łacińską (15 cm, 480 nm, 5 回) zostaje
 * spacja, jak w warstwie wspólnej. Symboli jednostek (%, K, ×, nm), nazw
 * formatów (CSV) ani nazwy pliku eksportu nie tłumaczymy.
 *
 * MARKUP W WARTOŚCIACH. Część kluczy (rozdziały Dokumentacji) zawiera znaczniki
 * <b>, <i>, <code> i encje HTML. Wstawiane są przez data-i18n-html, czyli tylko
 * tam, gdzie autor tekstu świadomie tego chciał — nigdy do treści pochodzącej
 * od użytkownika. Bez tego wyróżnienia w akapitach Dokumentacji trzeba by było
 * rozbić każde zdanie na kilkanaście kluczy po jednym słowie.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ja'] = Object.assign(window.I18nData['ja'] || {}, {

  /* ---- aplikacja ---- */

  'app.name': '有害光モニター',
  'app.description': 'カメラで画面の青色の強さを測り、安全・中程度・有害のゾーンを付けた見やすいグラフに表示します。',

  /* ---- wybór języka ---- */

  'language.label': '言語',
  'language.help': 'アプリ全体の表示言語です。すべての言語はすでにこの端末の中にあります。何もダウンロードされず、どこにも送信されません。',
  'language.auto': '端末の設定に合わせる',

  /* ---- nawigacja ---- */

  'nav.aria': 'メインメニュー',
  'nav.tabsAria': 'アプリの画面',
  'nav.announce': '画面: {screen}',
  'nav.camera': 'カメラ',
  'nav.monitoring': 'モニタリング',
  'nav.support': '支援',
  'nav.more': 'その他',
  'nav.docs': 'ドキュメント',
  'nav.about': 'アプリについて・連絡先',
  'nav.settings': '警告しきい値',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← 戻る',
  'action.back.aria': '前の画面に戻る',
  'action.openDocs': 'ドキュメントを開く',
  'action.exportCsv': 'CSV を書き出す',
  'action.delete': '削除',
  'action.closeNotification': '通知を閉じる',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref: 安全 / 中程度 / 有害, a nie wspólne
     正常範囲 / 注意 / 警告. Wersja plakatowa (zone.badge.*) jest osobnym
     kluczem, a nie zapisem wielkimi literami przez CSS: tureckie „i” i greckie
     akcenty nie znoszą automatycznej zamiany, a japoński wielkiej litery nie ma
     w ogóle — brzmi więc tak samo jak nazwa strefy. */

  'zone.good': '安全',
  'zone.warning': '中程度',
  'zone.critical': '有害',
  'zone.none': 'データなし',

  'zone.badge.good': '安全',
  'zone.badge.warning': '中程度',
  'zone.badge.critical': '有害',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'B チャンネルの明るさ',
  'metric.raw.unitLabel': 'B チャンネルの明るさ（%）',
  'metric.share.name': '青色光の割合',
  'metric.share.longName': '光に占める青色光の割合',
  'metric.share.unitLabel': '青色光の割合（%）',
  'stat.overallBrightness': 'シーン全体の明るさ',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': 'カメラのプレビュー',
  'camera.pressStart': '「スタート」を押してください。',
  'camera.start': 'スタート',
  'camera.stop': 'ストップ',
  'camera.switch': 'カメラを切り替える',
  'camera.error': 'カメラを起動できませんでした。ブラウザのカメラの許可を確認して、もう一度お試しください。（{message}）',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': '現在の測定値',
  'disclaimer.short': '目安の値です。これは医療機器ではありません。',
  'disclaimer.more': '詳しく',

  /* ---- wykresy ---- */

  'chart.aria': '時間の経過に沿ったグラフ',
  'chart.title': '時間の経過に沿ったグラフ（直近 {seconds} 秒）',
  'chart.empty': 'グラフを見るにはカメラを起動してください',
  'chart.axis.past': '-{seconds}秒',
  'chart.axis.now': '現在',
  'chart.raw.aria': 'B チャンネルの明るさの時間変化のグラフ。安全・中程度・有害のゾーンを表示しています',
  'chart.share.aria': '光に占める青色光の割合の時間変化のグラフ。安全・中程度・有害のゾーンを表示しています',

  /* ---- tabela odczytów ---- */

  'table.show': '表で見る',
  'table.hide': '表を隠す',
  'table.caption': '最近の測定値（新しいものが上）',
  'table.col.time': '時刻',
  'table.col.zone': 'ゾーン',

  /* ---- ustawienia progów ---- */

  'settings.title': 'ゾーンのしきい値設定',
  'settings.boundary.critical': '黄 / 赤の境界:',
  'settings.boundary.warning': '緑 / 黄の境界:',

  /* ---- historia i raport (features.js) ---- */

  'history.title': '履歴とレポート',
  'history.rangeAria': '履歴の範囲',
  'history.unavailable': '履歴のデータは一時的に利用できません。',
  'history.empty': 'この範囲に保存された測定値はありません。測定を始めてください — 履歴は自動的にたまっていきます。',
  'history.savedReadings': '保存された測定値: {count}。ゾーン別の時間の内訳:',
  'history.zoneLine': '{zone}: {percent}%（{readings}）',

  'range.1h': '1 時間',
  'range.24h': '24 時間',
  'range.7d': '7 日',
  'range.30d': '30 日',

  'report.dailyTitle': '日次レポート',
  'report.empty': '選んだ範囲に測定値が保存されると、レポートが表示されます。',
  'report.dailyCaption': '日ごとの、ゾーン別の時間の割合',
  'report.col.day': '日',
  'report.col.week': '週',
  'report.col.readings': '測定値',
  'report.compare.day': '前日との比較: {day} — 有害ゾーンにいた時間は {percent}%、{change}',
  'report.compare.dayPending': '前日との比較は、2 日目の測定のあとに表示されます。',
  'report.compare.week': '前週との比較: {week} — 有害ゾーンにいた時間は {percent}%、{change}',
  'report.compare.weekPending': '前週との比較は、2 週目の測定のあとに表示されます。',
  'report.change.same': '{other}と同じです。',
  'report.change.more': '{other}より {points} 多いです。',
  'report.change.less': '{other}より {points} 少ないです。',
  'report.peak': '有害ゾーンの測定値がいちばん多かったのは {from} から {to} の間です。',
  'report.peak.none': 'この範囲では、有害ゾーンの測定値は保存されていません。',
  'report.weeklyTitle': '週次レポート',
  'report.weeklyEmpty': '選んだ範囲に測定値が保存されると、週次レポートが表示されます。',
  'report.weeklyCaption': '週ごとの、ゾーン別の時間の割合',
  'report.weekLabel': '第 {week} 週（{year} 年）',
  'report.footnote': 'この数字は、選んだ範囲に保存された測定値の割合であって、光を浴びていた正確な時間ではありません。',

  /* ---- profile progów ---- */

  'profiles.title': 'しきい値のプロファイル',
  'profiles.empty': 'まだ保存されたプロファイルはありません。',
  'profiles.itemActive': '{name}（適用中）',
  'profiles.applyAria': 'プロファイル {name} を適用する',
  'profiles.deleteAria': 'プロファイル {name} を削除する',
  'profiles.applied': 'プロファイル「{name}」を適用しました。',
  'profiles.deleted': 'プロファイル「{name}」を削除しました。',
  'profiles.saved': 'プロファイル「{name}」を保存しました。',
  'profiles.namePlaceholder': 'プロファイル名（例: 夜）',
  'profiles.saveLabel': '現在のしきい値をプロファイルとして保存',
  'profiles.saveBtn': 'プロファイルを保存',
  'profiles.needName': 'プロファイル名を入力してください。',
  'profiles.limit': {
    other: 'プロファイルは最大 {n} 件まで保存できます。新しく追加するには、ひとつ削除してください。'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku zostaje
     w łacince — musi być bezpieczna dla systemu plików i dla nagłówka
     pobierania, a japońskie znaki w nazwie pliku bywają tam przekłamywane. */

  'csv.header': '時刻;Bチャンネルの明るさ_%;青色光の割合_%;シーンの明るさ_%;ゾーン',
  'csv.filename': 'light-monitoring-{stamp}.csv',
  'csv.empty': '書き出せる測定値がありません。測定を始めて、もう一度お試しください。',
  'csv.done': '{readings}を CSV ファイルに書き出しました。',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut. Po japońsku liczba stoi przy
     klasyfikatorze (分) i rzeczownik formy nie zmienia, więc kategoria jest
     jedna — ale klucz zostaje obiektem, bo tego wymaga zestaw. */

  'alert.exposure': {
    other: 'しきい値アラート: {n} 分前から測定値が有害ゾーンにあります。休憩をとるか、画面の青色光の割合を下げることを検討してください。'
  },

  'session.title': '直前のセッションのまとめ',
  'session.line': '測定時間: {duration}。保存された測定値: {count}。',
  'session.zoneLine': '{zone}: セッションの {percent}%。',
  'session.endedAt': 'このまとめは {time} に終了したセッションのものです。',
  'session.toast': 'セッション終了: {duration}、{readings}、有害ゾーンにいた時間は {percent}%。',

  'duration.seconds': '{n} 秒',
  'duration.minutesSeconds': '{minutes} 分 {seconds} 秒',

  /* ---- liczebniki ----
     Japoński ma w CLDR jedną kategorię: 'other'. Rzeczownik nie zmienia formy,
     a liczba stoi przy klasyfikatorze (件). Formę wybiera Intl.PluralRules('ja'),
     nie nasza reguła. */

  'count.readings': { other: '{n} 件の測定値' },
  'count.points': {
    other: '{n} パーセントポイント'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': 'その他',
  'more.section.settings': '設定',
  'more.section.help': 'ヘルプ',
  'more.thresholds.title': '警告しきい値',
  'more.thresholds.sub': '安全・中程度・有害の各ゾーンの境界を設定します。',
  'more.docs.title': 'ドキュメント',
  'more.docs.sub': '測定のしくみ、単位、規格、ゾーンについて。',
  'more.about.title': 'アプリについて・連絡先',
  'more.about.sub': 'バージョン、プライバシー、連絡先。',
  'more.free': 'このアプリはすべて無料です。',
  'more.supportLink': '任意で支援していただくこともできます。',
  'more.version': 'バージョン {version} · すべての機能がアカウントも料金もなしで使えます',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': 'アプリについて・連絡先',
  'about.version': 'バージョン {version}',
  'about.what.title': 'このアプリについて',
  'about.what.p1': '{app} は携帯電話のカメラで、センサーがどれだけ青色光を捉えているかを測り、2 つのダイヤルとゾーン付きのグラフに表示します。測定、履歴、レポート、しきい値のプロファイル、しきい値アラート、CSV の書き出し、ドキュメント — すべての機能が、アカウントも料金もなしで、どなたにも使えます。',
  'about.what.p2': 'このアプリは情報提供のために「現状のまま」提供されます。測定の結果は目安であり、健康に関する判断の根拠になるものではありません。',
  'about.privacy.title': 'プライバシーとデータ',
  'about.privacy.p1': 'カメラの映像はあなたの端末の中だけで解析され、どのサーバーにも送信されることはありません。アカウントは作らず、あなたのデータを集めることもありません。しきい値の設定、プロファイル、測定履歴は、この端末とこのブラウザの保存領域にのみ保存されます。',
  'about.privacy.p2': 'このアプリは広告を表示せず、ネットワークに話しかけることもありません。唯一の例外は「支援」画面のボタンです。それを押すと、ブラウザが外部のページを新しいタブで開きます。あなた自身がそうするまで、何も起こりません。',
  'about.contact.title': '連絡先',
  'about.contact.p1': 'ご意見、不具合、ご提案: [E-MAIL]。できるかぎりお返事します — これは仕事のあとの時間に維持しているプロジェクトです。',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': '支援',
  'support.free.title': 'すべて使えます',
  'support.free.text': 'アプリはすべて無料です。測定、履歴とレポート、しきい値のプロファイル、アラート、CSV の書き出し、ドキュメント。すべてがすぐに動きます。アカウントも、制限も、インターネットも要りません。',
  'support.why': '{app} は仕事のあとの時間に作っています。役に立っているなら、コーヒーをおごってください。それがアプリを保ち、さらに進めるための助けになります — 測定を改善し、ドキュメントを書き足し、もっと多くの携帯電話で確かめるために。',
  'support.nothing': '寄付は何も解放しません。よい版も悪い版もなく、支援したあともアプリはまったく同じように動きます。違いはただひとつ、誰かの役に立ったと作者が知ることだけです。',
  'support.button': 'コーヒーをおごる',
  'support.button.aria': 'コーヒーをおごる — 寄付のページを新しいタブで開きます',
  'support.pending': '寄付のページはまだつながっていません。用意できしだい、ここにボタンが立ちます。それまでは何もする必要はありません — どのみちアプリはすべて無料です。',
  'support.privacy': 'ボタンは外部のページ（Buy Me a Coffee）をブラウザの新しいタブで開きます。この端末から何かが出ていくのは、その瞬間だけです。カメラの映像とあなたの測定はすべてここに残ります — 押す前も押したあとも、どこにも送信されません。',
  'support.privacyPending': 'アドレスが用意できたら、ボタンを押すと外部のページ（Buy Me a Coffee）がブラウザの新しいタブで開きます。それが、この端末から何かが出ていく唯一の瞬間になります。カメラの映像とあなたの測定はすべてここに残ります — どこにも送信されません。',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': 'ドキュメント',

  'disclaimer.title': 'これは医療機器ではありません',
  'disclaimer.body.docs': 'このアプリは医療機器ではありません。いかなる病気の診断、治療、予防を目的とするものでもありません。携帯電話のカメラによる測定の結果は目安であり、診察や医師の助言に代わるものではありません。目の健康に関することは、医師または検眼士にご相談ください。このアプリのゾーンのしきい値は、いかなる安全規格も再現していません — 詳しくは第 3 章をご覧ください。',
  'disclaimer.body.about': 'このアプリは医療機器ではありません。いかなる病気の診断、治療、予防を目的とするものでもありません。携帯電話のカメラによる測定の結果は目安であり、診察や医師の助言に代わるものではありません。目の健康に関することは、医師または検眼士にご相談ください。このアプリのゾーンのしきい値は、いかなる安全規格も再現していません — 詳しくはドキュメントの第 3 章をご覧ください。',

  'doc.toc.aria': 'ドキュメントの目次',
  'doc.toc.title': '目次',

  'doc.ch1.title': 'クイックスタート',
  'doc.ch2.title': '測定のしくみ',
  'doc.ch3.title': '単位と規格',
  'doc.ch4.title': 'ゾーンとしきい値',
  'doc.ch5.title': '端末による違い',

  'doc.ch1.heading': '1. クイックスタート',
  'doc.ch2.heading': '2. 測定のしくみ',
  'doc.ch3.heading': '3. 単位と規格',
  'doc.ch4.heading': '4. ゾーンとしきい値',
  'doc.ch5.heading': '5. 端末による違い',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': 'より正確に測るには',
  'doc.ch1.tips.li1': '「カメラ」画面（下のバーのいちばん左のボタン）で「スタート」を押し、確かめたい画面や光源に背面カメラを向けます。',
  'doc.ch1.tips.li2': '「モニタリング」画面（下のバーの 2 つめのボタン）に移ります — 上に 2 つのダイヤルが一度に見え、その下に（スクロールすると）時間変化のグラフがあります。どの画面を見ていても、測定は背後で動き続けます。',
  'doc.ch1.tips.li3': '携帯電話を画面から一定の距離（たとえば 15〜20 cm）に保ち、測定中は周囲の照明を変えないでください。',
  'doc.ch1.tips.li4': '背面カメラを使ってください — 前面カメラより自動補正が控えめです。',
  'doc.ch1.tips.li5': '結果は絶対的な物理単位ではなく、相対的な指標（%）として扱ってください — たがいに比べます（たとえばナイトモードの入・切）。',
  'doc.ch1.tips.li6': '設定でゾーンのしきい値を、ご自分の画面の明るさに合わせてください（第 4 章）。',

  'doc.ch1.fonts.title': '大きな文字とダイヤル — つねに',
  'doc.ch1.fonts.p1': 'アプリ全体が大きく読みやすい文字と、大きさを削らないダイヤルを使っています。目の見えにくい方（そしてほかのすべての方）が、追加の設定なしにデータを読めるようにするためです。「モニタリング」画面では 2 つのダイヤルがスクロールなしで一画面に収まり、時間変化のグラフはそのすぐ下、ひとスクロール先にあります。',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': '携帯電話のカメラとスペクトロメーター',
  'doc.ch2.spectro.p1.html': '「有害な青色光がどれだけあるか」を本当に測るには、光を波長ごとに分ける必要があります。それを行うのが<b>スペクトロメーター（分光器）</b>です。プリズムや回折格子が光を数十から数百の狭い帯（たとえば 1〜5 nm ごと）に分け、それぞれの光学的な出力を別々に測ります。ルクス、ルーメン、青色光障害関数で重み付けした放射照度といった単位は、こうした完全なスペクトル分布からはじめて計算できます。',
  'doc.ch2.spectro.p2.html': '<b>携帯電話のカメラは、そのどれもしていません。</b>広いフィルターを 3 つ（ベイヤー配列の R/G/B）持つだけで、そのそれぞれが広く重なり合う波長の範囲から光を集めています — 「青チャンネル」は網膜への危険が最大となる 435〜440 nm あたりの狭い帯ではなく、おおよそ 400〜570 nm が緑と混ざったものです。その先にはデモザイク処理、自動露出、自動ホワイトバランス、sRGB のガンマ圧縮が続きます — ブラウザは、そのどの段階も完全に切らせてはくれません。その結果、JavaScript が見ているピクセルの値は、センサーに届く実際の光学的な出力と線形の関係にはありません。これはハードウェアの根本的な制約であって、このアプリの不具合ではありません。',

  'doc.ch2.raw.title': 'グラフ 1 — B チャンネルの明るさ',
  'doc.ch2.raw.what.html': '<b>示すもの:</b> 画像のうち標本にした部分での、青（B）チャンネルだけの平均の明るさ。0〜255 の尺度を % に換算したものです。',
  'doc.ch2.raw.algo.html': '<b>アルゴリズム:</b>',
  'doc.ch2.raw.step1': 'カメラから 1 秒あたり 5 回、フレームを取り込みます。',
  'doc.ch2.raw.step2': 'フレームの中央 60% を切り出します（画像の縁と、横からの光のかぶりを避けるため）。',
  'doc.ch2.raw.step3': '切り出した部分を 32×32 ピクセルの格子に縮小します（十分な精度が保て、フル解像度で計算するよりずっと速い — 廉価な Xiaomi や Ulefone のような非力な端末では、これが効きます）。',
  'doc.ch2.raw.step4': 'その格子の 1024 ピクセルすべての B の値を平均します。',
  'doc.ch2.raw.step5.html': '<code>結果 = 平均B ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>なぜ残したか:</b> 「センサーがそもそもどれだけ青の信号を拾っているか」を、いちばん単純に、直接読める値だからです。弱点は明るさと色を混ぜてしまうことで、とても明るいが中性的に白い場面でも、特別に「青い」わけではないのに高い値が出ます。だからこそ、その隣にグラフ 2 を並べています。',

  'doc.ch2.share.title': 'グラフ 2 — 光に占める青色光の割合',
  'doc.ch2.share.what.html': '<b>示すもの:</b> 記録された光全体（R+G+B）のうち、青の成分が占める割合 — つまり、場面がどれだけ明るいかとは関わりなく、色が冷たい側へどれだけ寄っているかです。',
  'doc.ch2.share.algo.html': '<b>アルゴリズム:</b> 上と同じ 1〜4 の手順ですが、B だけではなく次を計算します:',
  'doc.ch2.share.formula.html': '<code>結果 = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': '中性的な白（R≈G≈B）はおよそ <b>33%</b> になります。より暖かい、赤みのある光はそれより低く、強く青い光はより高く、ほぼ純粋に青い光では ~100% の限界まで上がります。',
  'doc.ch2.share.why.html': '<b>なぜこちらが「有害な青」のより正確な尺度なのか:</b> ナイトモードや Night Shift のようなフィルターが働くのと同じ原理だからです — 効いてくるのは明るさではなく<b>色</b>です。とても明るいが中性的な画面が誤って有害と印を付けられることはなく、暗めでも強く青い画面には付きます。だから測定値の表でゾーンの色を決めているのは、この指標です。',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': 'なぜルクスでもルーメンでもないのか',
  'doc.ch3.units.p1.html': '<b>ルーメン（lm）</b>は、光源が放つ光束の総量を表します — 光源そのものの性質であって、ある一点に届くもののことではありません。<b>ルクス（lx）</b>はすでに一点での照度（lm/m²）で、求めているものに近づきますが、それでも<b>測光</b>の単位です。スペクトルを、青色光障害の曲線ではなく、人の目の明るさに対する感度曲線（V(λ)）で重み付けしています。危険を本当に測るには、3 つめの、もっと狭い単位が要ります。<b>W/m²</b> で表す、スペクトルで重み付けした放射照度です（規格 IEC 62471、感度の頂点は 435〜440 nm あたり）。そしてそれにはスペクトロメーターが必要です — 上の節をご覧ください。',
  'doc.ch3.units.p2.html': 'かりにルクスで済ませるとしても、外部の校正された光センサーのない携帯電話では、それを信頼できる形で求められません。そもそも携帯電話に内蔵された光センサーは（あるところでは）、背面カメラで画面に向ける面とは<b>反対側</b>の光を測ります — つまり画面からの光ではなく、あなたの背中側の光を測ることになります。だからこそ、どのみち信頼できない単位で数字を当てるかわりに、正直に名づけた<b>相対的な指標（%）</b>を示しています — 同じ携帯電話で同じ条件のもとでの比較（たとえばナイトモードの入・切）には意味があり、絶対的な値としては意味がありません。',

  'doc.ch3.norms.title': '安全のしきい値に、世界共通の規格はあるのか',
  'doc.ch3.norms.p1.html': '短く言えば、<b>カメラのチャンネルの割合で表された規格はありません</b> — そもそも何かが規制される単位ではないのです。青色光についての本物の規格は存在しますが、測っているのは別の量で、単位も違い、「青色光は目を疲れさせる」と言うときにふつう思い浮かべるものとは別の現象を扱っています。',
  'doc.ch3.norms.p2.html': '<b>網膜の急性の光化学的障害 — IEC 62471 / ICNIRP。</b>実際に規制されている唯一の「青色光障害」で、ランプと照明システムのための規格です。ICNIRP（国際非電離放射線防護委員会）のガイドラインがこれを支えています。障害関数 B(λ) で重み付けした放射輝度（<b>W·m⁻²·sr⁻¹</b>）にもとづいて光源をリスクグループ RG0〜RG3 に分類し、ばく露時間の上限（<code>t_max = 100 / L_B</code> 秒）を定めます。携帯電話やモニターの画面は — 最大の明るさでも — 実際にはつねに <b>RG0（免除、制限なし）</b>に収まります。この規格が扱うのは、はるかに強い光源（溶接アーク、一部のプロジェクター、産業用 LED）であって、消費者向けの画面ではありません。',
  'doc.ch3.norms.p3.html': '<b>概日リズムと睡眠への影響 — CIE S 026。</b>ふつう問題にされるのはこちらの現象です（夜の画面が「目を覚まさせる」）。ただしこれは目の障害ではなく、480 nm あたりに最も感度の高い網膜の神経節細胞（ipRGC）を通じた、体内時計への働きかけです。規格 CIE S 026:2018 は<b>メラノピックルクス（melanopic EDI）</b>という単位を定めています。「公式」に最も近い科学的な合意は Brown らの論文（<i>PLOS Biology</i>、2022 年）で、目安として夜は &lt; 10 メラノピックルクス、日中は &gt; 250 を勧めています。これは睡眠研究者の推奨であって、法令ではありません。',
  'doc.ch3.norms.p4.html': '<b>WHO。</b>世界保健機関は、青色光のばく露限度を独自に公表していません — 光放射の安全については ICNIRP（上記）に委ねています。画面についての WHO 自身の具体的な文書は <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i>（2019 年）だけで、しかもそれが扱うのは画面の前で過ごす<b>時間</b>であって、光の色や強さではありません。1 歳未満は画面なし、2〜4 歳は最大 1 時間まで。大人については、WHO に同じだけ具体的な数値の指針はありません。',
  'doc.ch3.norms.p5.html': '<b>それでもアプリの校正の助けにならない理由:</b> どちらの規格（IEC/ICNIRP と CIE）も、完全なスペクトル分布と、既知の測定配置で校正された放射輝度を必要とします — まさに携帯電話がブラウザを通しては用意できないものです（上の「携帯電話のカメラとスペクトロメーター」の節をご覧ください）。「青色光の割合 33% = メラノピックルクス X」という換算は存在しません。ですからこのアプリのしきい値は<b>いかなる安全規格も再現していません</b>（WHO、IEC、ICNIRP、CIE — この指標については、そんな規格がそもそも存在しないのです）。ただし青色光の割合の既定のしきい値は、実際の光の色温度と、夜は暖かい光をという広く繰り返されてきた実践的な推奨から導いています — 単に切りのよい数字にするよりは確かな根拠ですが、それでも正式な規格ではありません（導き方の全体は第 4 章）。設定でいつでもご自分の値に変えられます。',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': '色のゾーンと、しきい値の出どころ',
  'doc.ch4.zones.p1.html': '2 つの指標は、それぞれ独立に設定できるしきい値を持っています（「モニタリング」画面 →「ゾーンのしきい値設定」、ページの下のほう） — 一方の 33%/66% は、もう一方の 33%/66% と同じ意味ではありません（上の第 2 章をご覧ください）。グラフの下の凡例と測定値の表で色を決めているのは<b>青色光の割合</b>です:',
  'doc.ch4.zones.li1.html': '<b>緑 — 安全:</b> 暖かい、または中性的な光。目は休んでいます。',
  'doc.ch4.zones.li2.html': '<b>黄 — 中程度:</b> 青のほうへのはっきりした寄り。休憩をとるとよいでしょう。',
  'doc.ch4.zones.li3.html': '<b>赤 — 有害:</b> 強く青い光。長く浴びると目がかなり疲れます（とくに夜）。',
  'doc.ch4.zones.p2.html': '<b>この数字がどこから来たか。</b><b>B チャンネルの明るさ</b>には自然な基準点がありません — 意味のあるしきい値は、写している場面がどれだけ明るいかだけで決まります（これは色ではなく明るさの尺度です）。ここでの既定の 33%/66% は、やはり便宜的な出発点にすぎません — ご自分の画面や周囲の典型的な明るさに合わせて、試しながら調整してください。',
  'doc.ch4.zones.p3.html': '<b>青色光の割合</b>の既定のしきい値は、実際の光の色温度から導かれています（切りのよい数字ではなく、物理です）。安全規格からではありません — この量については、そんな規格が存在しないからです（第 3 章）。基準点は次のとおりです:',
  'doc.ch4.zones.li4.html': '<b>~4000K</b>（「温白色」、よくある LED 電球）→ 青色光の割合はおよそ <b>26%</b>。これより暖かい光（より低い色温度）は、f.lux や Night Shift のような道具が夜に広く勧めている範囲です — 下側のしきい値はここから来ています。',
  'doc.ch4.zones.li5.html': '<b>6500K（D65）</b>、多くの携帯電話やモニターの画面の、工場出荷時の標準の白色点 — およそ <b>33%</b>。この値から上が、青色光を抑える助言がふつうなされる範囲の始まりです — 上側のしきい値はここから来ています。',
  'doc.ch4.zones.p4.html': '<b>大事な断り書き:</b> 光がどれだけ「青い」かは時刻によりませんが、青色光を抑えるという助言が実際に関わるのは<b>夕方と夜</b>だけです — 日中に冷たい青い光（日光も含みます）を浴びるのはふつうのことで、概日リズムにはむしろ好ましくさえあります。手を加えていないふつうの画面を昼間に見ていて赤いゾーンが出ても、それは実際の危険を意味しません — 同じ光でも、夜なら抑える価値があります。',
  'doc.ch4.zones.p5.html': '2 つの指標のしきい値は完全に独立していて、一方を変えてももう一方には影響しません。変更したしきい値は、アプリを次に開いたときのために<b>この端末とこのブラウザに記憶されます</b>（ローカルに保存され、どこにも送信されません） — 「スタート」ボタンで既定値に戻ることはありません。',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': 'なぜプレビューは端末によって見え方が違うのか',
  'doc.ch5.devices.p1.html': '<b>ブラウザと純正のカメラアプリ。</b>携帯電話に最初から入っているカメラを開くと、メーカー（たとえば Xiaomi）はライブのプレビューに自社独自のアルゴリズムを重ねます — リアルタイムの HDR、暗いところでのデジタルな明るさの持ち上げ、なめらか化。ウェブページがブラウザを通して受け取るのは、それよりずっと「生」に近いカメラの映像（<code>getUserMedia</code> という機能）で、そうした加工はひとつも入っていません — ですから原理として、どの携帯電話でも純正のカメラより平坦に、暗く見えます。',
  'doc.ch5.devices.p2.html': '<b>カメラを制御できる範囲の違い。</b>露出とホワイトバランスをブラウザがそもそもどれだけシステムから制御させてもらえるかは、携帯電話の機種、カメラのドライバー、Chrome や WebView の版によって変わります — ある端末（典型的には USB カメラをつないだパソコン）は完全な自動しか申告せず、別の端末（Android の一部の携帯電話）はさらに進んだモードを申告します。このアプリの以前の版は、携帯電話が許すところでは手動露出モードに切り替えようとしていました。具体的な値を設定しないままで — その結果、一部の携帯電話ではカメラ起動の瞬間の、たまたま暗い露出で映像が固まってしまいました。これはコードの不具合（すでに修正済み）であって、単位の違いではありません — ただ、同じ一行のコードでさえ一部の端末でしか効かないほど、ふるまいが端末ごとに違いやすいことをよく示しています。',
  'doc.ch5.devices.p3.html': '<b>センサーと画像処理（ISP）の違い。</b>同じコードで同じ場面でも、携帯電話の機種ごとにセンサーの質は違い、メーカーの自動処理の詰め方も違います — 暗いところで露出を速く正確に決める機種もあれば、そうでない機種もあります。このアプリの指標が<b>相対的</b>である（第 3 章をご覧ください）ことと合わせると、こうなります: 結果（そしてプレビューの見え方）は、機種や端末どうしで比べるのではなく、同じ携帯電話で時間を追って比べてください。'
});
