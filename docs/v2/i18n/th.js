/* docs/v2/i18n/th.js — słownik WERSJI 2, tajski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/th.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej.
 *
 * SKĄD TE ZDANIA: treść przełożono z pl.js (redakcja pierwotna), a terminologię
 * i rejestr wzięto z docs/shared/i18n/th.js — jeden odpowiednik na pojęcie
 * w całej aplikacji. Tajskie zdanie buduje się inaczej niż polskie, więc
 * przekładany był sens, a nie szyk; nie zmieniano natomiast tego, co niesie
 * znaczenie: liczb, progów, jednostek, nazw wstawek oraz — CO DO TREŚCI —
 * zdań o prywatności.
 *
 * TERMINOLOGIA (za warstwą wspólną, bez wyjątków):
 *   สัดส่วนสีน้ำเงิน, ความสว่างของฉาก, อุณหภูมิสี, ผลต่อนาฬิกาชีวภาพ,
 *   การกะพริบ, ความสม่ำเสมอ, ความสบายตา — siedem wielkości;
 *   การวัด (pomiar), ค่าที่วัดได้ (odczyt), ค่าที่วัด (metryka),
 *   เกณฑ์ (próg), โปรไฟล์ (profil), ระดับ (strefa),
 *   การสอบเทียบ (kalibracja), สเปกตรัม (widmo), เซสชัน (sesja).
 *
 * INTERPUNKCJA: tajski nie stawia kropki na końcu zdania — granicę zdań
 * wyznacza spacja. Brak kropek nie jest tu niedopatrzeniem. Zostają natomiast
 * półpauzy tam, gdzie polski stawia myślnik, i cudzysłowy “ ” wokół nazw
 * przycisków. Między liczbą a jednostką łacińską (100 Hz, 3000 K) zostaje
 * spacja, a ułamek dziesiętny pisze się kropką (0.50).
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (i dlaczego):
 *   'zone.warning'        — wspólne mówi „ควรระวัง”, ta wersja od zawsze mówi
 *                           „เตือน” (i „คำเตือน” w podsumowaniu);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu; tajski nie zna
 *                           wielkich liter, więc brzmi tak samo jak napis;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi „ผลการวัด”
 *                           (pomiary), a nie o pojedynczym pomiarze.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules — tajski ma jedną kategorię, 'other', więc obiekty form
 * mają tu dokładnie jeden klucz. Patrz nagłówek docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['th'] = Object.assign(window.I18nData['th'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'มอนิเตอร์แสง — การวัดแสงสีน้ำเงิน',
  'app.description': 'มอนิเตอร์แสง — วัดสัดส่วนแสงสีน้ำเงินด้วยกล้องโทรศัพท์ ค่าที่วัดได้เจ็ดค่า กราฟ และประวัติ ทุกอย่างใช้ได้ ไม่ต้องมีบัญชีและไม่มีค่าใช้จ่าย',
  'app.skipToContent': 'ข้ามไปยังเนื้อหา',
  'app.measuring': 'กำลังวัด',
  'app.docsButton': 'เอกสารและคำอธิบาย',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — เวอร์ชัน 2',

  'nav.aria': 'การนำทางหลัก',
  'nav.tablistAria': 'หน้าจอของแอป',
  'nav.measure': 'วัด',
  'nav.history': 'ประวัติ',
  'nav.tools': 'เครื่องมือ',
  'nav.support': 'สนับสนุน',
  'nav.more': 'เพิ่มเติม',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'เอกสาร',
  'panel.thresholds': 'เกณฑ์และโปรไฟล์',
  'panel.reports': 'รายงาน',
  'panel.export': 'ส่งออกข้อมูล',
  'panel.compare': 'เปรียบเทียบ A/B',
  'panel.calibration': 'การสอบเทียบด้วยกระดาษขาว',
  'panel.screenCheck': 'ตรวจจอของฉัน',
  'panel.schedule': 'ตารางเวลา',
  'panel.alerts': 'การแจ้งเตือนการรับแสง',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'กลับ',
  'action.close': 'ปิด',
  'action.refresh': 'รีเฟรช',
  'action.apply': 'ใช้งาน',
  'action.delete': 'ลบ',
  'action.hide': 'ซ่อน',
  'action.start': 'เริ่ม',
  'action.stop': 'หยุด',
  'action.switch': 'สลับ',
  'action.switchAria': 'สลับกล้อง: กล้องหน้าหรือกล้องหลัง',
  'action.resetDefaults': 'คืนค่าเริ่มต้น',
  'action.reports': 'รายงาน',
  'action.exportCsv': 'ส่งออก CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'หน้าจอ: {name}',
  'a11y.measureStarted': 'เริ่มการวัดแล้ว',
  'a11y.measureStopped': 'หยุดการวัดแล้ว',
  'a11y.measureStoppedSummary': 'หยุดการวัดแล้ว ระยะเวลา: {duration} {samples}',
  'a11y.zoneAnnounce': '{name}: {zone} {value} {unit}',
  'a11y.profileApplied': 'ใช้โปรไฟล์ของเกณฑ์แล้ว',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'การยืนยัน',
  'dialog.confirm': 'ยืนยัน',
  'dialog.cancel': 'ยกเลิก',
  'dialog.infoTitle': 'ข้อมูล',
  'dialog.ok': 'เข้าใจแล้ว',

  'help.sheetTitle': 'คำอธิบายค่าที่วัด',
  'help.unit': 'หน่วย',
  'help.scaleRange': 'ช่วงของสเกล',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę.
     Po tajsku wielkich liter nie ma w ogóle, więc rozróżnienie niesie tu samo
     brzmienie zdania. */

  'threshold.warn': 'เตือน',
  'threshold.crit': 'วิกฤต',
  'threshold.warnLabel': 'เกณฑ์เตือน',
  'threshold.critLabel': 'เกณฑ์วิกฤต',
  'threshold.warnAria': '{name} — เกณฑ์: เตือน',
  'threshold.critAria': '{name} — เกณฑ์: วิกฤต',

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

  'firstRun.title': 'วิธีวัด',
  'firstRun.text': 'กด “เริ่ม” เล็งโทรศัพท์ไปที่พื้นผิวที่มีแสงตกกระทบ แล้วถือให้นิ่งสักสองสามวินาที กรอบในภาพตัวอย่างคือส่วนที่แอปอ่านจริง',
  'firstRun.close': 'ปิดคำแนะนำ',

  'camera.live': 'สด',
  'camera.idle': 'กล้องปิดอยู่ กด “เริ่ม” เล็งโทรศัพท์ไปที่พื้นผิวที่มีแสงตกกระทบ แล้วถือให้นิ่งสักสองสามวินาที',
  'camera.stopped': 'หยุดการวัดแล้ว กด “เริ่ม” เพื่อวัดอีกครั้ง',

  'error.cameraStart': 'เปิดกล้องไม่สำเร็จ',
  'error.engineMissing': 'โมดูลการวัดไม่ได้ถูกโหลด',

  'metrics.sevenTitle': 'ค่าที่วัดได้เจ็ดค่า',
  'measure.tilesSub': 'รีเฟรช 5 ครั้งต่อวินาที',

  'session.title': 'เซสชันนี้',
  'session.duration': 'ระยะเวลาการวัด',
  'session.samples': 'จำนวนตัวอย่าง',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     Tajski nie odmienia rzeczownika przez liczbę, więc różnicę niesie tu
     samo słowo: „คำเตือน” (ostrzeżenia) obok „เตือน” pod suwakiem. */
  'zone.count.good': 'อยู่ในเกณฑ์',
  'zone.count.warning': 'คำเตือน',
  'zone.count.critical': 'วิกฤต',

  'note.calibrated': 'การวัดนี้สอบเทียบด้วยกระดาษขาวแล้ว — ช่องสีถูกปรับให้เท่ากัน',

  'tile.helpAria': 'ความหมายของ: {name}',
  'tile.noMeasurement': 'ไม่มีผลการวัด',
  'tile.outOfScale': 'นอกช่วงสเกล',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'เตือน',
  'zone.spoken.warning': 'เตือน',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'การเปลี่ยนแปลงตามเวลา',
  'history.pickHint': 'เลือกค่าที่วัดและช่วงเวลา',
  'history.metricLabel': 'ค่าที่วัด',
  'history.rangeAria': 'ช่วงเวลาของกราฟ',
  'history.emptyTitle': 'ไม่มีข้อมูลในช่วงนี้',
  'history.emptyText': 'เริ่มการวัดที่หน้าจอวัด — กราฟจะเต็มขึ้นภายในไม่กี่วินาที',
  'history.tableTitle': 'ค่าที่วัดได้ล่าสุด',
  'history.tableHide': 'ซ่อนตาราง',
  'history.tableShow': 'แสดงตาราง',
  'history.tableCaption': 'ค่าที่วัดได้ล่าสุด เรียงจากใหม่สุดด้านบน',
  'history.tableEmpty': 'ยังไม่มีค่าที่วัดได้ เริ่มการวัดที่หน้าจอวัด',

  'table.time': 'เวลา',
  'table.metric': 'ค่าที่วัด',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropki po
     „นาที” i z tajskim skrótem godziny „ชม.” — dłuższy zapis łamał się
     na dwie linie. */
  'range.1m': '1 นาที',
  'range.1h': '1 ชม.',
  'range.24h': '24 ชม.',
  'range.7d': '7 วัน',
  'range.30d': '30 วัน',

  'chart.now': 'ตอนนี้',
  'chart.countSub': {
    other: 'ค่าที่วัดได้ {n} ค่าในช่วงที่เลือก'
  },
  'chart.aria': '{name} ช่วง {range} {count} ค่าล่าสุด {value} {unit}',
  'chart.ariaZone': '{name} ช่วง {range} {count} ค่าล่าสุด {value} {unit} ระดับ: {zone}',
  'chart.ariaEmpty': '{name} — ไม่มีข้อมูลในช่วง {range}',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'ตัวช่วยและฟังก์ชันเสริม',
  'tools.note': 'เครื่องมือช่วยให้ตีความผลการวัดได้ ทุกชิ้นใช้ได้ทันที และตัวการวัดเองทำงานได้โดยไม่ต้องพึ่งเครื่องมือเหล่านี้',

  'tool.thresholds.sub': 'ค่าเท่าไรจึงควรขึ้นคำเตือน',
  'tool.compare.sub': 'แสงไหนในสองแบบนุ่มนวลกว่ากัน',
  'tool.calibration.sub': 'ฟังก์ชันเดียวที่เพิ่มความแม่นยำได้จริง',
  'tool.screenCheck.sub': 'ห้าขั้นตอนและได้ข้อสรุปเรื่องหน้าจอ',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „ตารางเวลาของเกณฑ์”
     kontra „ตารางเวลา”. Tak było i tak zostaje. */
  'tool.schedule.title': 'ตารางเวลาของเกณฑ์',
  'tool.schedule.sub': 'ใช้เกณฑ์อีกชุดในตอนเย็นโดยไม่ต้องคอยจำ',
  'tool.alerts.sub': 'ส่งสัญญาณเมื่ออยู่ในระดับวิกฤตนานเกินไป',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'การตั้งค่า',
  'more.thresholdsSub': 'ค่าเท่าไรจึงควรขึ้นคำเตือน',
  'more.docsSub': 'วิธีวัด และสิ่งที่การวัดนี้ไม่ได้บอก',
  'more.appearanceTitle': 'รูปลักษณ์และการเข้าถึง',

  'settings.theme': 'ธีม',
  'theme.auto': 'ตามการตั้งค่าของระบบ',
  'theme.light': 'สว่าง',
  'theme.dark': 'มืด',

  'settings.textScale': 'ขนาดตัวอักษร',
  'textScale.100': 'มาตรฐาน',
  'textScale.115': 'ใหญ่ขึ้น (115%)',
  'textScale.130': 'ใหญ่ที่สุด (130%)',

  'settings.contrast': 'คอนทราสต์สูงขึ้น',
  'settings.contrastSub': 'เส้นขอบหนักแน่นขึ้นและตัวอักษรประกอบเข้มขึ้น',
  'settings.sound': 'เสียงของการแจ้งเตือน',
  'settings.soundSub': 'เสียงสั้น ๆ เมื่อการแจ้งเตือนการรับแสงทำงาน',
  'settings.vibrate': 'สั่นเมื่อมีการแจ้งเตือน',
  'settings.vibrateSub': 'ทำงานเฉพาะบนอุปกรณ์ที่รองรับเท่านั้น',

  'more.dataTitle': 'ข้อมูล',
  'more.clearHistory': 'ล้างประวัติการวัด',
  'more.clearHistorySub': 'ลบค่าที่บันทึกไว้ออกจากอุปกรณ์นี้ เกณฑ์ โปรไฟล์ และการตั้งค่ายังอยู่ครบ',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'แอปนี้ใช้ได้ฟรีทั้งหมด ',
  'more.supportLink': 'คุณสนับสนุนได้ตามสมัครใจ',

  'dialog.clearHistory.title': 'ลบประวัติที่บันทึกไว้หรือไม่',
  'dialog.clearHistory.body': {
    other: 'เราจะลบจุดข้อมูลการวัดที่บันทึกไว้ {n} จุดออกจากอุปกรณ์นี้ การกระทำนี้ย้อนกลับไม่ได้ เกณฑ์ โปรไฟล์ และการตั้งค่าจะไม่ถูกแตะต้อง'
  },
  'dialog.clearHistory.confirm': 'ลบประวัติ',
  'dialog.clearHistory.cancel': 'เก็บไว้',

  'toast.historyCleared': 'ลบประวัติการวัดแล้ว',
  'toast.screenUnavailable': 'หน้าจอนี้ยังไม่มีในเวอร์ชันนี้',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'แอปนี้วัดอะไร',
  'docs.leadText': 'กล้องโทรศัพท์มองไปที่พื้นผิวที่มีแสงตกกระทบ และแอปคำนวณค่าเฉลี่ยของช่อง R G และ B จากพื้นที่กลางเฟรมห้าครั้งต่อวินาที จากตัวเลขสามตัวนี้แอปคำนวณค่าที่วัดได้เจ็ดค่า',
  'docs.limitsTitle': 'ขอบเขตของวิธีวัด',
  'docs.limitsText': 'กล้องมีช่องสีกว้าง ๆ สามช่อง มีระบบปรับค่าแสงอัตโนมัติและสมดุลแสงขาวอัตโนมัติ มันไม่ได้วัดสเปกตรัมและไม่รู้ค่าสัมบูรณ์ ความสว่างจึงเป็นตัวชี้วัดเชิงเปรียบเทียบ ไม่ใช่ลักซ์ อุณหภูมิสีและผลต่อนาฬิกาชีวภาพเป็นค่าประมาณที่คำนวณจากแม่สี sRGB การสุ่มตัวอย่างที่ {rate} Hz เห็นการกะพริบได้เฉพาะที่ต่ำกว่า {limit} Hz เท่านั้น — การกะพริบของไฟบ้านที่ 100 Hz อยู่นอกระยะเอื้อม และแอปจะไม่รายงานค่านั้นเป็นผลการวัดเลย',

  'note.howTo.repeat.title': 'วัดซ้ำอีกครั้ง',
  'note.howTo.repeat.text': 'ค่าที่วัดได้เพียงครั้งเดียวเป็นแค่ภาพนิ่ง การวัดสักสิบกว่าวินาทีให้ภาพที่น่าเชื่อถือกว่า',

  'docs.scale': 'สเกล',
  'docs.direction': 'ทิศทาง',
  'docs.directionHigher': 'ยิ่งสูงยิ่งดี',
  'docs.directionLower': 'ยิ่งต่ำยิ่งนุ่มนวล',
  'docs.privacyTitle': 'ข้อมูลและความเป็นส่วนตัว',
  'docs.privacyText': 'ภาพจากกล้องไม่ถูกส่งและไม่ถูกบันทึกไว้ที่ใดเลย — จากแต่ละเฟรมเหลือไว้เพียงตัวเลขสามตัว ผลการวัด เกณฑ์ และการตั้งค่าอยู่ในที่เก็บข้อมูลของเบราว์เซอร์บนอุปกรณ์นี้ แอปไม่ส่งคำขอใด ๆ ไปยังเครือข่ายและทำงานในโหมดออฟไลน์ได้',
  'docs.freeLine': 'ค่าที่วัดได้ทั้งเจ็ด ประวัติ กราฟ เครื่องมือ และโหมดออฟไลน์ ใช้ได้กับทุกคน ไม่ต้องมีบัญชีและไม่มีค่าใช้จ่าย',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'ทุกอย่างใช้ได้',
  'support.heroText': 'ค่าที่วัดได้ทั้งเจ็ด ประวัติการวัด กราฟ เครื่องมือทุกชิ้น และโหมดออฟไลน์ ใช้ได้กับทุกคนตั้งแต่แรก ไม่ต้องมีบัญชี ไม่มีขีดจำกัด และไม่มีค่าใช้จ่าย',
  'support.whyTitle': 'ทำไมผมถึงขอ',
  'support.whyText': '{app} สร้างขึ้นนอกเวลางานและไม่ได้หาเงินจากใคร ไม่มีโฆษณา ไม่เก็บข้อมูล และไม่มีอะไรจะขาย การดูแลและการพัฒนาต่อ — ค่าที่วัดใหม่ ๆ การแก้ข้อบกพร่อง การทดสอบบนโทรศัพท์รุ่นอื่น ๆ — ล้วนใช้เวลา ถ้าแอปนี้เป็นประโยชน์กับคุณ คุณช่วยสมทบได้ แต่ไม่จำเป็น',
  'support.whatTitle': 'การบริจาคให้อะไรบ้าง',
  'support.whatText': 'ไม่ให้อะไรเลย มันไม่ปลดล็อกอะไรและไม่ทำให้อะไรเร็วขึ้นจริง ๆ — แอปหน้าตาและทำงานเหมือนกันทุกประการทั้งก่อนและหลัง สิ่งเดียวที่ได้คือผู้เขียนได้รู้ว่างานนี้เป็นประโยชน์กับใครสักคน',
  'support.button': 'เลี้ยงกาแฟผมสักแก้ว',
  'support.pendingTitle': 'ยังไม่ได้เชื่อมต่อโปรไฟล์',
  'support.pendingText': 'ที่นี่ยังไม่มีที่อยู่สำหรับส่งการสนับสนุน มันจะปรากฏตรงนี้เมื่อพร้อม — จนถึงตอนนั้นทุกอย่างในแอปทำงานเหมือนเดิมทุกประการ',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'ปุ่มนี้เปิดหน้าเว็บภายนอกของ Buy Me a Coffee ในแท็บใหม่ นั่นเป็นช่วงเวลาเดียวที่มีอะไรออกจากเครื่องนี้ — และเกิดขึ้นก็ต่อเมื่อคุณกดปุ่มแล้วเท่านั้น ผลการวัด ประวัติ และการตั้งค่ายังคงอยู่ที่นี่',
  'privacy.externalPending': 'เมื่อมีที่อยู่เว็บแล้ว การกดปุ่มจะเปิดหน้าเว็บภายนอกในแท็บใหม่ นั่นจะเป็นช่วงเวลาเดียวที่มีอะไรออกจากเครื่องนี้ ผลการวัด ประวัติ และการตั้งค่ายังคงอยู่ที่นี่',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (มีตัวสำรองใน ui-core.js)',
  'boot.need.metrics': 'จะไม่มีค่าใดถูกคำนวณเลย',
  'boot.need.bus': 'โมดูลต่าง ๆ จะมองไม่เห็นกัน',
  'boot.need.ui': 'สลับหน้าจอไม่ได้',
  'boot.need.engine': 'กล้องและการวัดจะไม่เริ่มทำงาน',
  'boot.need.support': 'หน้าจอสนับสนุนจะว่างเปล่า',
  'boot.need.tools': 'แท็บเครื่องมือจะว่างเปล่า',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'โมดูลเหล่านี้ไม่ได้ถูกโหลด: {list}',
  'boot.consoleHint': 'ตรวจสอบลำดับและพาธของแท็ก <script> ใน index.html',
  'boot.incompleteTitle': 'แอปโหลดขึ้นมาไม่ครบ',
  'boot.incompleteText': '{missing} โหลดหน้านี้ใหม่ ถ้ายังไม่หาย แสดงว่าไฟล์บนเซิร์ฟเวอร์ไม่ครบ',
  'boot.newVersion': 'มีแอปเวอร์ชันใหม่แล้ว',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'เกณฑ์ทำอะไร ',
  'thresholds.noteText': 'เกณฑ์เตือนทำให้สถานะเป็นสีเหลือง เกณฑ์วิกฤตทำให้เป็นสีแดง การเปลี่ยนแปลงมีผลทันที — รวมถึงกับค่าที่อยู่บนหน้าจออยู่แล้ว ชุดเกณฑ์ของคุณเองบันทึกไว้พร้อมชื่อได้ แล้วกลับมาใช้เมื่อไรก็ได้',
  'thresholds.profilesTitle': 'โปรไฟล์ของเกณฑ์',
  'thresholds.profilesSub': 'สามชุดที่มีมาให้และชุดของคุณเอง',
  'thresholds.customName': 'ชื่อโปรไฟล์ของคุณเอง',
  'thresholds.customPlaceholder': 'เช่น ห้องนอนตอนเย็น',
  'thresholds.save': 'บันทึกเกณฑ์ปัจจุบัน',
  'thresholds.saveHelp': 'บันทึกเกณฑ์ที่ตั้งไว้ด้านบนนี้พอดี',

  'profile.builtin.default.name': 'ค่าเริ่มต้น',
  'profile.builtin.default.desc': 'เกณฑ์จากแคตตาล็อกของค่าที่วัด — จุดตั้งต้นสำหรับการวัดทุกครั้ง',
  'profile.builtin.evening.name': 'ตอนเย็น — นุ่มนวล',
  'profile.builtin.evening.desc': 'เตือนเร็วขึ้นเรื่องสีแสงโทนเย็นและผลต่อนาฬิกาชีวภาพ',
  'profile.builtin.work.name': 'ทำงานที่โต๊ะ',
  'profile.builtin.work.desc': 'ยอมให้แสงกลางวันสว่างและโทนเย็นได้ แต่คอยดูการกะพริบและความสม่ำเสมอ',
  'profile.custom.desc': 'โปรไฟล์ของคุณเอง บันทึกเมื่อ {date}',

  'toast.thresholdsReset': 'คืนค่าเกณฑ์เริ่มต้นแล้ว',
  'toast.thresholdOrder': 'เกณฑ์เตือนต้องต่ำกว่าเกณฑ์วิกฤต',
  'toast.thresholdOrderInverted': 'สำหรับค่าที่วัดนี้ เกณฑ์เตือนต้องสูงกว่าเกณฑ์วิกฤต',
  'toast.profileNameMissing': 'กรุณาใส่ชื่อโปรไฟล์',
  'toast.profileSaved': 'บันทึกโปรไฟล์ “{name}” แล้ว',
  'toast.profileApplied': 'ใช้โปรไฟล์ “{name}” แล้ว',
  'toast.profileApplyFailed': 'ใช้โปรไฟล์นี้ไม่สำเร็จ',
  'toast.profileRemoved': 'ลบโปรไฟล์แล้ว',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'ตารางเวลามีไว้ทำไม ',
  'schedule.noteText': 'ตอนเย็นเกณฑ์ที่สมเหตุสมผลไม่เหมือนกับตอนเที่ยง กฎ “ตั้งแต่–ถึง” จะสลับโปรไฟล์ให้เอง คุณจะได้ไม่ต้องคอยจำ ตารางเวลาไม่เคยเริ่มและไม่เคยหยุดการวัด',
  'schedule.toggle': 'เปิดการสลับอัตโนมัติ',
  'schedule.toggleSub': 'ตรวจทุกนาทีตามนาฬิกาของอุปกรณ์',
  'schedule.emptyTitle': 'ยังไม่มีกฎ',
  'schedule.emptyText': 'เพิ่มกฎแรกด้วยปุ่มด้านล่าง',
  'schedule.add': 'เพิ่มกฎ',
  'schedule.to': 'ถึง',
  'schedule.profile': 'โปรไฟล์',
  'schedule.fromAria': 'กฎที่ {n}: เวลาเริ่ม',
  'schedule.toAria': 'กฎที่ {n}: เวลาสิ้นสุด',
  'toast.scheduleTimeFormat': 'กรุณาใส่เวลาในรูปแบบ 22:00',
  'toast.scheduleEnded': 'ตารางเวลาสิ้นสุดแล้ว — เกณฑ์ชุดก่อนหน้ากลับมาแล้ว',
  'toast.scheduleApplied': 'ตารางเวลาเปิดใช้โปรไฟล์ “{name}” แล้ว',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'การแจ้งเตือนทำอะไร ',
  'alerts.noteText': 'มันคอยดูค่าที่วัดเพียงค่าเดียว และจะส่งเสียงก็ต่อเมื่อค่านั้นอยู่ในระดับที่เลือกไว้ต่อเนื่องนานเท่าที่คุณตั้งไว้ มันไม่เคยหยุดการวัดและไม่บังปุ่มใด ๆ',
  'alerts.toggle': 'เปิดการแจ้งเตือนการรับแสง',
  'alerts.toggleSub': 'ทำงานเฉพาะระหว่างที่กำลังวัดอยู่เท่านั้น',
  'alerts.metric': 'ค่าที่วัดที่จะคอยดู',
  'alerts.level': 'ตั้งแต่ระดับใด',
  'alerts.level.warning': 'ระดับเตือนขึ้นไป',
  'alerts.level.critical': 'เฉพาะระดับวิกฤต',
  'alerts.sustain': 'ต่อเนื่องกี่วินาทีจึงแจ้ง',
  'alerts.sustainHelp': 'เวลาที่สั้นกว่าทำให้เกิดการแจ้งเตือนผิดพลาดมากขึ้นเวลาคุณขยับโทรศัพท์',
  'alerts.sound': 'เสียงสัญญาณสั้น ๆ',
  'alerts.soundSub': 'เสียงถูกสร้างขึ้นในเครื่อง และปิดทั้งหมดได้ที่หน้าจอเพิ่มเติมเช่นกัน',
  'alerts.barTitle': 'การแจ้งเตือนการรับแสง',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} อยู่ในระดับเตือนมา {seconds} วินาที — ตอนนี้ {value} {unit}',
  'alerts.message.critical': '{name} อยู่ในระดับวิกฤตมา {seconds} วินาที — ตอนนี้ {value} {unit}',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'วิธีเปรียบเทียบ ',
  'compare.noteText': 'เริ่มการวัด เล็งกล้องไปที่แหล่งแสงแรกแล้วบันทึกเป็น A จากนั้นสลับแสงและบันทึกเป็น B โดยไม่เปลี่ยนระยะและมุม การเปรียบเทียบมีความหมายก็ต่อเมื่อเป็นฉากเดียวกันเท่านั้น',
  'compare.slotA': 'แสง A',
  'compare.slotB': 'แสง B',
  'compare.save': 'บันทึกค่าที่วัดได้ตอนนี้',
  'compare.savedAt': 'บันทึกเมื่อ {date} {time}',
  'compare.empty': 'ยังไม่ได้บันทึกอะไรเลย',
  'compare.verdictTitle': 'ผลการเปรียบเทียบ',
  'compare.verdictEmpty': 'บันทึกแสงทั้งสองแบบเพื่อดูว่าแบบไหนนุ่มนวลกว่า',
  'compare.notEnough': 'ข้อมูลไม่พอที่จะเปรียบเทียบการวัดสองครั้งนี้',
  'compare.tie': 'แหล่งแสงทั้งสองออกมาแทบเหมือนกัน ({metric}: {a} และ {b} {unit}) ความต่างอยู่ในระดับสัญญาณรบกวนของการวัด',
  'compare.betterA': 'แสง A นุ่มนวลกว่า — {metric} อยู่ที่ {better} {unit} เทียบกับ {worse} {unit}',
  'compare.betterB': 'แสง B นุ่มนวลกว่า — {metric} อยู่ที่ {better} {unit} เทียบกับ {worse} {unit}',
  'compare.clear': 'ล้างการเปรียบเทียบ',
  'toast.compareSavedA': 'บันทึกแสง A แล้ว',
  'toast.compareSavedB': 'บันทึกแสง B แล้ว',
  'toast.compareCleared': 'ล้างการเปรียบเทียบแล้ว',
  'toast.measureFirst': 'เริ่มการวัดที่หน้าจอวัดก่อน',

  /* Nazwa wielkości w środku zdania. Po polsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. Tajski nie
     zna wielkich liter, więc brzmią tak samo jak nazwy z warstwy wspólnej;
     klucze zostają, bo zestaw jest wspólny dla wszystkich języków. */
  'metric.share.nameLower': 'สัดส่วนสีน้ำเงิน',
  'metric.brightness.nameLower': 'ความสว่างของฉาก',
  'metric.kelvin.nameLower': 'อุณหภูมิสี',
  'metric.melanopic.nameLower': 'ผลต่อนาฬิกาชีวภาพ',
  'metric.flicker.nameLower': 'การกะพริบ',
  'metric.uniformity.nameLower': 'ความสม่ำเสมอ',
  'metric.comfort.nameLower': 'ความสบายตา',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'ทำไมวิธีนี้ถึงได้ผล ',
  'calib.noteText': 'เซ็นเซอร์ของกล้องมีความเอนเอียงคงที่ระหว่างช่องสี การวัดกระดาษขาวแสดงให้เห็นว่ามันมากแค่ไหน และทำให้หักออกได้ นี่เป็นฟังก์ชันเดียวในแอปนี้ที่เพิ่มความแม่นยำได้จริง — และมันก็ยังไม่ได้เปลี่ยนกล้องให้เป็นเครื่องวัดสเปกตรัม',
  'calib.step1': 'วางกระดาษขาวไว้ใต้แสงที่จะวัด',
  'calib.step2': 'เริ่มการวัดและให้กระดาษเต็มเฟรม',
  'calib.step3': 'กด “สอบเทียบ” แล้วอย่าขยับโทรศัพท์เป็นเวลา 3 วินาที',
  'calib.done': 'สอบเทียบเมื่อ {date} {time}',
  'calib.none': 'ยังไม่ได้สอบเทียบ การวัดยังทำงานได้ ให้ใช้ค่าเหล่านี้ในเชิงเปรียบเทียบ',
  'calib.gain': 'อัตราขยาย {channel}',
  'calib.gainsLabel': 'อัตราขยายของช่องสี',
  'calib.gainsUnset': 'ยังไม่ได้ตั้ง',
  'calib.start': 'สอบเทียบ (3 วินาที)',
  'calib.clear': 'ลบค่าการสอบเทียบ',
  'toast.calibCleared': 'ลบค่าการสอบเทียบแล้ว',
  'calib.error.noEngine': 'โมดูลการวัดใช้งานไม่ได้',
  'calib.error.notRunning': 'เริ่มการวัดก่อน แล้วเล็งกล้องไปที่กระดาษขาว',
  'calib.error.busy': 'กำลังสอบเทียบอยู่แล้ว',
  'calib.error.tooFewSamples': 'ตัวอย่างน้อยเกินไป ตรวจสอบว่าการวัดทำงานอยู่จริง',
  'calib.error.tooDark': 'ภาพมืดเกินกว่าจะสอบเทียบได้ เพิ่มแสงให้กระดาษแล้วลองอีกครั้ง',
  'calib.error.tooSkewed': 'ความเอนเอียงของช่องสีมากเกินกว่าจะรับเป็นค่าการสอบเทียบได้ ใช้กระดาษขาวในแสงที่สม่ำเสมอ',
  'calib.ok': 'สอบเทียบแล้ว อุณหภูมิสีและผลต่อนาฬิกาชีวภาพจะแม่นยำขึ้น',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'สิ่งนี้มีไว้ทำอะไร ',
  'screencheck.noteText': 'ห้าขั้นตอนนี้ตรวจจอแบบเดียวกับที่บทรีวิวตรวจ: สีขาวที่ความสว่างสองระดับ ความสม่ำเสมอของไฟส่องหลังจอ และโหมดกลางคืนของระบบเปลี่ยนอะไรจริงหรือไม่ ตัวช่วยนี้อ่านค่าจากการวัดที่กำลังทำงานอยู่ มันไม่เริ่มการวัดเอง',
  'screencheck.step.white100.title': 'สีขาวที่ความสว่างเต็มที่',
  'screencheck.step.white100.hint': 'เปิดหน้าสีขาวบนจอ ตั้งความสว่างไว้สูงสุด แล้วให้หน้าจอเต็มเฟรม',
  'screencheck.step.white20.title': 'สีขาวที่ความสว่างต่ำ',
  'screencheck.step.white20.hint': 'ลดความสว่างของจอลงเหลือราวหนึ่งในห้า และอย่าเปลี่ยนกรอบภาพ',
  'screencheck.step.corners.title': 'มุมของหน้าจอ',
  'screencheck.step.corners.hint': 'กลับไปที่ความสว่างเต็มที่ แล้วให้กล้องเห็นหน้าจอทั้งหมด — เรากำลังตรวจความสม่ำเสมอของไฟส่องหลังจอ',
  'screencheck.step.nightOff.title': 'ปิดโหมดกลางคืน',
  'screencheck.step.nightOff.hint': 'ตรวจให้แน่ใจว่าตัวกรองแสงสีน้ำเงินถูกปิดอยู่',
  'screencheck.step.nightOn.title': 'เปิดโหมดกลางคืน',
  'screencheck.step.nightOn.hint': 'เปิดตัวกรองแสงสีน้ำเงินในระบบ แล้วถ่ายกรอบภาพเดิมซ้ำอีกครั้ง',
  'screencheck.stepHeading': 'ขั้นที่ {n} จาก {total}: {title}',
  'screencheck.idleTitle': 'ตัวช่วยยังไม่ทำงาน',
  'screencheck.idleHint': 'เริ่มการวัดที่หน้าจอวัด แล้วกลับมาที่นี่และกด “เริ่มตัวช่วย”',
  'screencheck.next': 'บันทึกขั้นนี้แล้วไปต่อ',
  'screencheck.cancel': 'ยกเลิก',
  'screencheck.start': 'เริ่มตัวช่วย',
  'screencheck.clearResult': 'ล้างผลลัพธ์',
  'screencheck.resultTitle': 'ผลลัพธ์',
  'screencheck.resultEmpty': 'ยังไม่ได้บันทึกขั้นตอนใดเลย',
  'screencheck.resultPartial': 'บันทึกแล้ว {done} จาก {total} ขั้น ข้อสรุปจะปรากฏเมื่อมีอะไรให้เปรียบเทียบ',
  'screencheck.note.uniformityLow': 'ความสม่ำเสมอของไฟส่องหลังจออยู่ที่ {value}% — เห็นความต่างของความสว่างในเฟรมได้ชัด',
  'screencheck.note.uniformityOk': 'ไฟส่องหลังจอสม่ำเสมอดี ({value}%)',
  'screencheck.note.nightWorks': 'โหมดกลางคืนลดสัดส่วนสีน้ำเงินลง {value} จุดเปอร์เซ็นต์ — ใช้ได้ผล',
  'screencheck.note.nightWeak': 'โหมดกลางคืนเปลี่ยนสัดส่วนสีน้ำเงินเพียง {value} จุดเปอร์เซ็นต์ ซึ่งน้อยกว่าที่ตัวกรองของระบบมักทำได้',
  'screencheck.note.pwm': 'ที่ความสว่างต่ำ การกะพริบเพิ่มจาก {from}% เป็น {to}% — นี่เป็นอาการทั่วไปของการหรี่ไฟแบบพัลส์ (PWM)',
  'toast.screencheckDone': 'ตัวช่วยทำงานเสร็จแล้ว ผลลัพธ์อยู่ด้านล่าง',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'ตัวเลขเหล่านี้มาจากไหน ',
  'reports.noteText': 'รายงานคำนวณจากประวัติที่บันทึกไว้บนอุปกรณ์นี้ — จุดละห้าวินาที เอนจินเก็บประวัตินี้มาตั้งแต่การวัดครั้งแรก รายงานจึงพร้อมใช้ทันที',
  'reports.rangeAria': 'ช่วงของรายงาน',
  'reports.day': '24 ชั่วโมงล่าสุด',
  'reports.week': '7 วันล่าสุด',
  'reports.date': 'รายงานสำหรับวันที่ {date}',
  'report.headerDay': 'วันตั้งแต่ {from} ถึง {to} — {count}',
  'report.headerWeek': 'สัปดาห์ตั้งแต่ {from} ถึง {to} — {count}',
  'count.points': { other: '{n} จุดข้อมูล' },
  'count.samples': { other: '{n} ตัวอย่าง' },
  'report.emptyTitle': 'ไม่มีข้อมูลในช่วงเวลานี้',
  'report.emptyText': 'เริ่มการวัดที่หน้าจอวัด — ประวัติบันทึกตัวเอง',
  'report.colAvg': 'ค่าเฉลี่ย',
  'report.colMin': 'ต่ำสุด',
  'report.colMax': 'สูงสุด',
  'report.zonesTitle': 'การกระจายตามระดับ',
  'report.worstHour': 'ช่วงเวลาที่แย่ที่สุดของวัน',
  'report.worstHourNone': 'ไม่มีช่วงที่เด่นชัด',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'ทำอะไรกับเรื่องนี้ได้บ้าง',
  'report.disclaimerTitle': 'นี่ไม่ใช่คำแนะนำทางสุขภาพ ',
  'report.disclaimerText': 'ข้อสรุปมาจากสิ่งที่กล้องของโทรศัพท์เครื่องนี้เห็นเท่านั้น แอปไม่ได้วัดสเปกตรัม ไม่รู้จักลักซ์ และไม่ได้ให้การวินิจฉัยใด ๆ',

  'advice.melanopic': 'ผลต่อนาฬิกาชีวภาพเฉลี่ยอยู่ที่ {value}× ในตอนเย็นควรลดลงต่ำกว่า 0.50 — วิธีที่ง่ายที่สุดคือใช้หลอดไฟที่อุ่นกว่าหรือเปิดโหมดกลางคืน',
  'advice.kelvin': 'แสงเป็นโทนเย็น (เฉลี่ย {value} K) สำหรับการทำงานถือว่าไม่มีปัญหา แต่สองชั่วโมงก่อนนอนควรต่ำกว่า 3000 K',
  'advice.flicker': 'ตรวจพบการกะพริบที่สังเกตได้ (เฉลี่ย {value}%) มักมาจากสวิตช์หรี่ไฟราคาถูกหรือชุดจ่ายไฟของไฟส่องหลังจอ',
  'advice.uniformity': 'แสงกระจายอย่างไม่สม่ำเสมอ ({value}%) การขยับโคมไฟหรือเปลี่ยนมุมมักได้ผลมากกว่าการเปลี่ยนหลอด',
  'advice.worstHour': 'ช่วงเวลาที่แย่ที่สุดของวันคือ {hour}:00 น. — ค่าที่อยู่นอกเกณฑ์กระจุกตัวอยู่ตรงนั้นมากที่สุด',
  'advice.none': 'ในช่วงเวลานี้ไม่มีอะไรเกินเกณฑ์ ตอนนี้สิ่งที่จะได้ประโยชน์มากที่สุดคือการเทียบแหล่งแสงสองแหล่งในตัวเปรียบเทียบ A/B',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'รูปแบบไฟล์ ',
  'export.noteText': 'ใช้อัฒภาคคั่นคอลัมน์ ใช้จุลภาคเป็นจุดทศนิยม และเข้ารหัส UTF-8 พร้อมเครื่องหมาย BOM ไฟล์แบบนี้เปิดได้ทันทีใน Excel ที่ตั้งภูมิภาคซึ่งใช้จุลภาคเป็นจุดทศนิยม โดยไม่ต้องตั้งค่าอะไรเลย',
  'export.range': 'ช่วงของข้อมูล',
  'export.columns': 'คอลัมน์ในไฟล์',
  'export.chipFilled': ' — คอลัมน์นี้มีข้อมูล',
  'export.help': 'ไฟล์มีคอลัมน์ครบทั้งเจ็ด — เอนจินคำนวณคอลัมน์เหล่านี้ตั้งแต่การวัดครั้งแรก และทั้งหมดถูกใส่ลงในไฟล์',
  'export.run': 'บันทึกไฟล์ CSV',
  'export.previewEmpty': 'ไม่มีค่าที่วัดได้ในช่วงนี้ เริ่มการวัดได้เลย — ประวัติบันทึกตัวเอง',
  'csv.range.hour': '1 ชั่วโมงล่าสุด',
  'csv.range.day': '24 ชั่วโมงล่าสุด',
  'csv.range.week': '7 วันล่าสุด',
  'csv.range.month': '30 วันล่าสุด',
  'csv.colDate': 'วันที่',
  'csv.colTime': 'เวลา',
  'csv.colZone': 'ระดับ',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'ไม่มีค่าที่วัดได้เลยในช่วงที่เลือก',
  'toast.exportFailed': 'เบราว์เซอร์นี้ไม่ยอมให้บันทึกไฟล์',
  'toast.exportSaved': {
    other: 'บันทึกไฟล์ {filename} แล้ว ({n} แถว)'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} ชม. {m} นาที',
  'duration.ms': '{m} นาที {s} วินาที',
  'duration.s': '{s} วินาที'
});
