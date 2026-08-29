/* Monitor Światła v5 — słownik tajski (ไทย).
 *
 * TREŚĆ wzięta z pl.js, TERMINOLOGIA i rejestr — z en.js. Nie jest to kalka
 * żadnego z nich: zdanie tajskie buduje się inaczej, więc przekładany był
 * sens, a nie szyk. Bez zmian zostało to, co niesie znaczenie: liczby, progi,
 * jednostki, nazwy wstawek oraz — CO DO TREŚCI — zastrzeżenia medyczne
 * i zdania o prywatności. Tych ostatnich nie wolno osłabiać ani wzmacniać:
 * „nie zastępuje rozmowy z lekarzem” ma po tajsku znaczyć dokładnie tyle samo,
 * a „obraz nie opuszcza urządzenia” nie może stać się obietnicą szerszą niż
 * polska.
 *
 * TERMINOLOGIA siedmiu wielkości (trzymana bez wyjątków, także w tekstach
 * pomocy i w zdaniach opisowych):
 *   สัดส่วนสีน้ำเงิน (udział niebieskiego), ความสว่างของฉาก (jasność sceny),
 *   อุณหภูมิสี (temperatura barwowa — przyjęty termin naukowy),
 *   ผลต่อนาฬิกาชีวภาพ (wpływ na rytm dobowy; w opisie: อัตราส่วนเมลาโนปิก —
 *   współczynnik melanopiczny), การกะพริบ (migotanie), ความสม่ำเสมอ
 *   (równomierność), ความสบายตา (komfort wzrokowy).
 *   Pojedyncza wielkość to „ค่าที่วัด” (w krótkich napisach samo „ค่า”),
 *   pomiar to „การวัด”, próg to „เกณฑ์”, sesja to „เซสชัน”.
 * STREFY: ปลอดภัย / ปานกลาง / อันตราย — mówią o świetle, a nie o stanie
 * aplikacji, i wchodzą w zdanie „ระดับ: {zone}”.
 *
 * ODSTĘPY I ŁAMANIE WIERSZA: tajski nie rozdziela wyrazów spacją, więc spacja
 * stoi tam, gdzie w tym piśmie stoi naprawdę — na granicy zdań i większych
 * członów zdania (zamiast kropki i przecinka). To jednocześnie jedyne miejsca,
 * w których przeglądarka może bezpiecznie złamać wiersz, więc dłuższe teksty
 * pomocy mają ich kilka. Liczba i jednostka są sklejone spacją nierozdzielającą
 * (\u00A0) tak samo jak w pozostałych słownikach.
 *
 * INTERPUNKCJA: zdania nie kończą się kropką — tajski jej nie stawia, oddziela
 * je spacją. Cudzysłów zapisujemy jako “ ”, półpauza (—) zostaje tam, gdzie
 * oddziela myśl dopowiedzianą. Ułamek dziesiętny pisze się kropką: 1.00, 0.50.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Tekst ze wstawką {nazwa}'   — napis zwykły,
 *   'klucz.kropkowany': { other }                    — forma zależna od liczby.
 * Tajski ma w CLDR JEDNĄ kategorię liczebnika: `other`
 * (new Intl.PluralRules('th').resolvedOptions().pluralCategories), więc obiekty
 * form mają tu jeden klucz. Rzeczownik się nie odmienia; format.plural() skleja
 * „liczba + spacja + wartość formy”, więc wychodzi '3 เซสชัน' i '120 ผลการวัด'.
 * Nazwy wstawek są identyczne jak w pl.js — pilnuje tego keys.test.js.
 * Kolejność wstawek w zdaniu wolno zmieniać (i tak robimy w „{range} ล่าสุด”),
 * nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'มอนิเตอร์แสง',
  'app.description': 'มอนิเตอร์แสง — ใช้กล้องวัดคุณสมบัติของแสงรอบตัวคุณเจ็ดอย่าง ทุกอย่างคำนวณบนอุปกรณ์นี้ ไม่มีอะไรออกไปสู่เครือข่าย',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — มอนิเตอร์แสง',
  'app.skipToContent': 'ข้ามไปยังเนื้อหา',
  'app.nav.aria': 'การนำทางหลัก',
  'app.noscript.title': 'แอปนี้ต้องใช้ JavaScript',
  'app.noscript.text': 'การวัดทั้งหมดเกิดขึ้นในแท็บเบราว์เซอร์นี้ JavaScript คือสิ่งที่อ่านเฟรมจากกล้องและคำนวณค่าแสงทั้งเจ็ดจากเฟรมเหล่านั้น ถ้าไม่มีมัน ก็ไม่มีอะไรให้ใช้วัด เปิดใช้งาน JavaScript สำหรับหน้านี้แล้วเปิดหน้านี้อีกครั้ง — และจะยังไม่มีอะไรถูกส่งออกไปสู่เครือข่ายเช่นเดิม',

  'nav.measure': 'วัด',
  'nav.history': 'ประวัติ',
  'nav.tools': 'เครื่องมือ',
  'nav.support': 'สนับสนุน',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'กำลังวัด',
  'shell.live.aria': 'กำลังวัด {metric}: {value} กลับไปยังหน้าจอการวัด',
  'shell.live.metricFallback': 'ค่าหลัก',
  'shell.action.fallback': 'การทำงานของหน้าจอ',

  'shell.loadFail.title': 'โหลดหน้าจอ “{screen}” ไม่สำเร็จ',
  'shell.loadFail.text': 'ไฟล์บางส่วนน่าจะหายไปจากที่เก็บข้อมูลของอุปกรณ์ เชื่อมต่อเครือข่ายแล้วโหลดหน้านี้ใหม่',
  'shell.fatal.title': 'มีบางอย่างผิดพลาด',
  'shell.fatal.text': 'แอปประกอบหน้าจอไม่สำเร็จ การโหลดหน้าใหม่มักจะเพียงพอ — ผลการวัดและการตั้งค่าที่บันทึกไว้ยังอยู่ที่เดิม',
  'shell.fatal.reload': 'โหลดหน้านี้ใหม่',
  'shell.boot.failTitle': 'เริ่มแอปไม่สำเร็จ',
  'shell.boot.failText': 'ส่วนหลักของแอปไม่เริ่มทำงาน โหลดหน้านี้ใหม่ — ผลการวัดและการตั้งค่าที่บันทึกไว้ยังอยู่ที่เดิม',
  'shell.background.error': 'มีบางอย่างเสียหายอยู่เบื้องหลัง',
  'shell.background.action': 'โหลดใหม่',
  'shell.update.title': 'มีเวอร์ชันใหม่แล้ว',
  'shell.update.action': 'โหลดใหม่',

  'onboarding.title': 'ก่อนเริ่ม',
  'onboarding.lead': 'มอนิเตอร์แสงใช้กล้องมองแสงรอบตัวคุณ แล้วคำนวณออกมาเป็นค่าเจ็ดอย่าง ตั้งแต่สัดส่วนสีน้ำเงินไปจนถึงความสบายตา',
  'onboarding.privacy': 'ภาพไม่ออกไปจากอุปกรณ์นี้ ไม่มีเซิร์ฟเวอร์ ไม่มีบัญชี และไม่มีอะไรถูกอัปโหลด ค่าทั้งเจ็ดใช้ได้ทันที ไม่ต้องลงชื่อเข้าใช้และไม่มีค่าใช้จ่าย',
  'onboarding.honesty': 'นี่เป็นเพียงแนวทางคร่าว ๆ ไม่ใช่เครื่องมือวัด และไม่ใช่การตรวจทางการแพทย์ สิ่งที่วัดไม่ได้เราจะไม่แสดง — แทนที่จะเป็นตัวเลข คุณจะเห็นขีดคั่น',
  'onboarding.start': 'เริ่มกันเลย',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'ดำเนินการ',
  'overlay.toast.close': 'ปิดข้อความ',
  'overlay.sheet.label': 'กล่องโต้ตอบ',
  'overlay.sheet.close': 'ปิด',
  'overlay.dialog.confirm': 'ยืนยัน',
  'overlay.dialog.cancel': 'ยกเลิก',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'ยกเลิก',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Tajski rozdziela człony samą spacją, ale tu spacja byłaby jedynym znakiem
     rozdzielającym w ogóle — przecinek zostaje, żeby przypisy nie zlały się
     w jeden ciąg pisma. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'การวัด',

  'measure.intro.aria': 'เริ่มการวัด',
  'measure.intro.headline': 'ดูว่าคุณอยู่ใต้แสงแบบไหน',
  'measure.intro.lead': 'กล้องจะบอกว่าแสงที่ตกลงบนตัวคุณตอนนี้มีสีน้ำเงินมากแค่ไหน และในช่วงเวลานี้ของวันมันมากเกินไปหรือเปล่า',
  'measure.intro.start': 'เริ่มวัด',
  'measure.intro.hint': 'เบราว์เซอร์จะขออนุญาตใช้กล้อง การวัดจะเริ่มทันทีที่คุณอนุญาต',
  'measure.intro.privacy': 'ภาพจากกล้องถูกประมวลผลบนอุปกรณ์นี้และไม่เคยออกไปจากอุปกรณ์ เราไม่ส่ง ไม่เก็บ และไม่แบ่งปันเฟรมใดเลยแม้แต่เฟรมเดียว',

  'measure.live.aria': 'กำลังวัดอยู่',
  'measure.badge.starting': 'กำลังเริ่ม',
  'measure.badge.paused': 'หยุดชั่วคราว',
  'measure.badge.running': 'กำลังวัด',
  'measure.stale': 'กำลังรอภาพ — ภาพตัวอย่างจะหยุดนิ่งเมื่อแอปอยู่เบื้องหลัง',
  'measure.crop': 'เราวัดจากกลางเฟรม — พื้นที่ที่ทำเครื่องหมายไว้ {percent}% ของความกว้างและความสูงของภาพ',
  'measure.facing.front': 'กล้องหน้า',
  'measure.facing.back': 'กล้องหลัง',

  'measure.boot.title': 'กำลังเปิดกล้อง…',
  'measure.boot.text': 'ถ้าเบราว์เซอร์ขออนุญาต ให้กดอนุญาต — ถ้าไม่มีภาพก็ไม่มีอะไรให้วัด การอนุญาตนี้ครอบคลุมเฉพาะหน้านี้ และคุณเพิกถอนได้ในภายหลัง',
  'measure.boot.cancel': 'ยกเลิก',

  'measure.hold': 'ค่าที่แสดงถูกตรึงไว้ กล้องยังทำงานต่อ แต่ไม่มีอะไรเข้าสู่ประวัติหรือค่าเฉลี่ย',
  'measure.gridHint': 'แตะไทล์เพื่อย้ายค่านั้นขึ้นไปบนหน้าปัดใหญ่',

  'measure.stop': 'หยุด',
  'measure.pause': 'หยุดชั่วคราว',
  'measure.resume': 'ทำต่อ',
  'measure.flip.aria': 'สลับกล้อง',
  'measure.flip.toBack': 'สลับไปกล้องหลัง',
  'measure.flip.toFront': 'สลับไปกล้องหน้า',

  'measure.fail.aria': 'กล้องขัดข้อง',
  'measure.fail.headline': 'กล้องไม่เริ่มทำงาน',
  'measure.fail.retry': 'ลองอีกครั้ง',
  'measure.fail.back': 'กลับ',
  'measure.fail.savedSession': 'เซสชันก่อนถูกขัดจังหวะ ({duration}) ถูกบันทึกลงประวัติแล้ว',
  'measure.error.fallback': 'เปิดกล้องไม่สำเร็จ',

  'measure.summary.aria': 'สรุปเซสชัน',
  'measure.summary.title': 'สรุปเซสชัน',
  'measure.summary.paused': 'หยุดชั่วคราวไป {duration}',
  'measure.summary.nothingMeasured': 'ไม่มีค่าใดเก็บผลได้เลย — กล้องไม่เห็นแสงตลอดทั้งเซสชัน',
  'measure.summary.note': 'ค่าเฉลี่ยนับเฉพาะตัวอย่างที่เก็บนอกช่วงหยุดชั่วคราว ค่าที่ไม่เคยวัดได้จะถูกละไว้ ไม่ถูกนับเป็นศูนย์',
  'measure.summary.nearThreshold': 'ใกล้เกณฑ์ที่สุด',
  'measure.summary.worstPoint': 'จุดที่แย่ที่สุด',
  'measure.summary.averageZone': 'เฉลี่ยอยู่ในระดับ {zone}',
  'measure.summary.tooShort': 'เซสชันนี้กินเวลา {duration} — สั้นเกินกว่าจะเข้าประวัติได้เอง คุณบันทึกด้วยตัวเองได้',
  'measure.summary.again': 'วัดอีกครั้ง',
  'measure.summary.save': 'บันทึกลงประวัติ',
  'measure.summary.saved': 'บันทึกลงประวัติแล้ว',
  'measure.summary.savedToast': 'บันทึกเซสชันลงประวัติแล้ว',
  'measure.summary.close': 'ปิด',

  'measure.method.title': 'เราวัดอย่างไร',
  'measure.method.p1': 'แอปอ่านภาพจากกล้องสิบครั้งต่อวินาที และคำนวณค่าจากพื้นที่กลางเฟรม {percent}% — กรอบเล็งในภาพตัวอย่างคือพื้นที่นั้นพอดี',
  'measure.method.p2': 'กล้องโทรศัพท์มีช่องสัญญาณกว้าง ๆ สามช่อง พร้อมระบบปรับค่าแสงและสมดุลแสงขาวอัตโนมัติของตัวเอง มันเห็นสัดส่วนของแสง ไม่ใช่สเปกตรัมของแสง',
  'measure.method.p3': 'สัดส่วนสีน้ำเงิน ความสว่าง การกะพริบ และความสม่ำเสมอ คือสิ่งที่กล้องวัดได้จริง ส่วนอุณหภูมิสีและผลต่อนาฬิกาชีวภาพเป็นค่าประมาณที่เราบอกไว้อย่างเปิดเผย คำนวณมาจากแม่สี sRGB',
  'measure.method.p4': 'การกะพริบมองเห็นได้เฉพาะที่ต่ำกว่าสี่เฮิรตซ์ การกะพริบจากไฟบ้านที่ 100 Hz อยู่ไกลเกินอัตราการอ่านภาพนี้มาก และจะไม่ถูกรายงานเป็นค่าที่อ่านได้เลย',
  'measure.method.p5': 'ไม่มีตัวเลขใดในนี้เป็นการวัดเชิงโฟโตเมตริกหรือผลทางการแพทย์ ภาพจากกล้องไม่ออกไปจากอุปกรณ์',
  'measure.method.ok': 'เข้าใจแล้ว',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'ยกเลิกการเปิดกล้องแล้ว',
  'measure.announce.stoppedNoSamples': 'หยุดการวัดแล้ว ไม่ได้เก็บตัวอย่างใดเลย',
  'measure.announce.stopped': 'หยุดการวัดแล้ว สรุปเซสชันพร้อมแล้ว',
  'measure.announce.interrupted': 'การวัดถูกขัดจังหวะ สรุปเซสชันพร้อมแล้ว',
  'measure.announce.paused': 'หยุดการวัดชั่วคราว ค่าที่แสดงถูกตรึงไว้',
  'measure.announce.resumed': 'วัดต่อแล้ว',
  'measure.announce.switchedFront': 'สลับไปกล้องหน้าแล้ว เริ่มเซสชันใหม่',
  'measure.announce.switchedBack': 'สลับไปกล้องหลังแล้ว เริ่มเซสชันใหม่',
  'measure.announce.lead': 'ค่าหลัก: {metric}',
  'measure.announce.cameraError': 'กล้องขัดข้อง {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'แสงอยู่ในช่วงปลอดภัยตลอดทั้งเซสชัน — ปล่อยโคมไว้อย่างนี้ แล้วกลับมาวัดอีกครั้งหลังพระอาทิตย์ตก ตอนที่แหล่งแสงอื่นทำงานแทน',
  'measure.advice.share.evening': 'สัดส่วนสีน้ำเงินเฉลี่ยอยู่ที่ {value} — เปิดโหมดกลางคืนบนหน้าจอ และปิดไฟเพดาน เหลือไว้เพียงโคมโทนอุ่นดวงเดียวที่ระดับโต๊ะ',
  'measure.advice.share.day': 'สัดส่วนสีน้ำเงินเฉลี่ยอยู่ที่ {value} — ช่วงกลางวันยังรับได้ แต่ตั้งให้หน้าจอเปลี่ยนเป็นโทนอุ่นโดยอัตโนมัติสองชั่วโมงก่อนเข้านอน',
  'measure.advice.brightness': 'เฟรมสว่างจนล้น (เฉลี่ย {value}) — ขยับออกห่างจากแหล่งแสง หรือลดความสว่างของจอที่กำลังวัด เพราะที่ค่าแสงระดับนี้ ค่าอื่น ๆ ก็เสียความแม่นยำไปด้วย',
  'measure.advice.kelvin.evening': 'อุณหภูมิสีอยู่ที่ {value} โดยเฉลี่ย — หลังพระอาทิตย์ตกให้ลงต่ำกว่า 3000 K โดยสลับโคมไปที่โหมดโทนอุ่น หรือเปลี่ยนเป็นหลอด 2700 K',
  'measure.advice.kelvin.day': 'อุณหภูมิสีอยู่ที่ {value} โดยเฉลี่ย — กลางวันถือเป็นแสงขาวที่ดีและช่วยให้ตื่นตัว แต่ตอนเย็นให้ปรับโคมดวงเดียวกันนี้ไปที่ 2700 K',
  'measure.advice.melanopic.evening': 'ผลต่อนาฬิกาชีวภาพเฉลี่ยอยู่ที่ {value} — สองชั่วโมงก่อนนอนให้ลงต่ำกว่า 0.50 × ด้วยการหรี่ไฟหลัก และให้แสงจากระดับโต๊ะแทนแสงจากเพดาน',
  'measure.advice.melanopic.day': 'ผลต่อนาฬิกาชีวภาพเฉลี่ยอยู่ที่ {value} — ในช่วงเวลานี้ปริมาณเท่านี้เป็นผลดี แต่ตอนเย็นให้เปลี่ยนแหล่งแสงนี้เป็นดวงที่อ่อนกว่าและอุ่นกว่า',
  'measure.advice.flicker': 'การกะพริบขึ้นไปถึงเฉลี่ย {value} — มักมาจากสวิตช์หรี่ไฟหรือแบ็กไลต์ที่ตั้งไว้ต่ำ ให้เพิ่มความสว่างหน้าจอเกิน 40% หรือเปลี่ยนไปใช้สวิตช์หรี่ไฟที่ไม่ใช้ PWM',
  'measure.advice.uniformity': 'แสงตกลงมาไม่สม่ำเสมอ (เฉลี่ย {value}) — วางโคมไว้ด้านข้างโต๊ะ และเพิ่มแหล่งแสงที่สองซึ่งอ่อนกว่าจากฝั่งตรงข้าม แทนการใช้จุดสว่างแรง ๆ เพียงจุดเดียว',
  'measure.advice.comfort': 'ความสบายตาออกมาเฉลี่ยที่ {value} — เริ่มจากการเปลี่ยนทีละอย่าง หรี่แหล่งแสงหลักลงครึ่งหนึ่งก่อน แล้วค่อยไปจัดการเรื่องสีของแสง',
  'measure.advice.default': 'ลองเปลี่ยนสักอย่างหนึ่งในการจัดแสง แล้ววัดใหม่อีกครั้ง — การเทียบสองเซสชันบอกอะไรได้มากกว่าค่าที่อ่านได้เพียงครั้งเดียว',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'ประวัติ',
  'history.action.export': 'ส่งออกประวัติ',

  'history.metricGroup.aria': 'เลือกค่าที่วัด',
  'history.announce.metric': 'ค่าที่วัด: {metric}',
  'history.rangeGroup.aria': 'ช่วงเวลา',
  'history.range.aria': '{range} ล่าสุด',

  'history.stats.title': 'สถิติของช่วงเวลา',
  'history.stats.head': '{metric}\u00A0—\u00A0{range} ล่าสุด',
  'history.stats.note': 'คำนวณจากสิ่งที่กราฟแสดง ช่วงเวลาที่ไม่ได้วัดจะไม่ถูกนับรวม — เราไม่เอาศูนย์ไปแทนที่',
  'history.stat.min': 'ต่ำสุด',
  'history.stat.avg': 'เฉลี่ย',
  'history.stat.max': 'สูงสุด',
  'history.trend.up': 'เพิ่มขึ้นในช่วงนี้',
  'history.trend.flat': 'ไม่มีการเปลี่ยนแปลงชัดเจน',
  'history.trend.down': 'ลดลงในช่วงนี้',
  'history.trend.none': 'ไม่มีข้อมูลให้เทียบ',

  'history.sessions.title': 'เซสชันการวัด',
  'history.sessions.count': '{sessions} เรียงจากใหม่สุด',
  'history.sessions.empty': 'ยังไม่มีเซสชัน',
  'history.sessions.hint': 'เซสชันจะถูกบันทึกเมื่อคุณหยุดการวัด',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'ช่วง: {range}',
  'history.session.noMeasure': 'ไม่ได้วัดอะไรเลย',

  'history.data.title': 'ข้อมูล',
  'history.data.subtitle': 'ประวัติถูกเก็บไว้บนอุปกรณ์นี้เท่านั้น',
  'history.export.csv': 'ส่งออก CSV',
  'history.export.json': 'ส่งออก JSON',
  'history.export.ok': 'เตรียมไฟล์ให้บันทึกแล้ว',
  'history.export.fail': 'เตรียมไฟล์ไม่สำเร็จ ในโหมดส่วนตัว และในหน้าต่างที่ฝังอยู่ในแอปอื่น เบราว์เซอร์จะบล็อกการบันทึก — เปิดหน้านี้ในแท็บปกติ',
  'history.export.sheet.title': 'ส่งออกประวัติ',
  'history.export.sheet.text': 'CSV เปิดได้ในโปรแกรมตารางคำนวณ (คั่นด้วยอัฒภาค ใช้จุลภาคเป็นจุดทศนิยม) ส่วน JSON เก็บทุกอย่างไว้ครบ รวมถึงรายการเซสชันและช่วงที่ไม่ได้วัด',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'ล้างประวัติ',
  'history.clear.title': 'ล้างประวัติหรือไม่',
  'history.clear.text': 'เราจะลบ {points} และ {sessions} การกระทำนี้ย้อนกลับไม่ได้ — ถ้าอยากเก็บข้อมูลไว้ ให้ส่งออกก่อน',
  'history.clear.confirm': 'ล้าง',
  'history.clear.announce': 'ล้างประวัติแล้ว',
  'history.clear.toast': 'ล้างประวัติแล้ว',

  'history.empty.title': 'ยังไม่มีอะไรให้แสดง',
  'history.empty.text': 'ประวัติจะค่อย ๆ เต็มขึ้นระหว่างที่คุณวัด — วินาทีละหนึ่งจุด ทุกอย่างอยู่บนอุปกรณ์นี้',
  'history.empty.action': 'ไปที่หน้าการวัด',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 นาที',
  'range.5m': '5 นาที',
  'range.1h': '1 ชม.',
  'range.24h': '24 ชม.',
  'range.7d': '7 วัน',
  'range.30d': '30 วัน',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'วันที่และเวลา',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'ที่เก็บข้อมูลของอุปกรณ์เต็มแล้ว — ผลการวัดใหม่จะไม่ถูกบันทึกอีกต่อไป',
  'storage.blocked': 'เบราว์เซอร์ไม่ยอมให้บันทึกประวัติ — ข้อมูลจะหายไปเมื่อคุณปิดแท็บ',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'เครื่องมือ',
  'tools.action.about': 'เกี่ยวกับการวัด',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'ภาษา',
  'tools.language.subtitle': 'โดยค่าเริ่มต้น แอปจะใช้ภาษาของอุปกรณ์ การเลือกจากรายการนี้มีผลทันทีและจะถูกจำไว้ในเบราว์เซอร์นี้',
  'tools.language.aria': 'ภาษาของหน้าจอ',
  'tools.language.system': 'อัตโนมัติ',
  'tools.language.announce': 'ภาษาของหน้าจอ: {language}',

  'tools.appearance.title': 'รูปลักษณ์',
  'tools.appearance.theme.title': 'ธีม',
  'tools.appearance.theme.desc': '“อัตโนมัติ” จะตามการตั้งค่าของระบบ',
  'tools.appearance.theme.aria': 'ธีม',
  'tools.theme.system': 'อัตโนมัติ',
  'tools.theme.light': 'สว่าง',
  'tools.theme.dark': 'มืด',
  'tools.appearance.accent.title': 'สีเน้น',
  'tools.appearance.accent.desc': 'สีของปุ่ม การเลือก และแถบเลื่อน',
  'tools.appearance.accent.aria': 'สีเน้น',
  'tools.appearance.textScale.title': 'ขนาดตัวอักษร',
  'tools.appearance.textScale.desc': 'ขยายทั้งหน้าจอ ไม่ใช่แค่คำบรรยาย',
  'tools.appearance.textScale.aria': 'ขนาดตัวอักษร',
  'tools.appearance.density.title': 'ความหนาแน่น',
  'tools.appearance.density.desc': 'แบบกระชับใส่เนื้อหาได้มากขึ้นในหน้าจอเดียว',
  'tools.appearance.density.aria': 'ความหนาแน่นของการจัดวาง',
  'tools.density.comfortable': 'ปกติ',
  'tools.density.compact': 'กระชับ',
  'tools.appearance.motion.title': 'ลดการเคลื่อนไหว',
  'tools.appearance.motion.desc': 'ปิดแอนิเมชันและการไล่เคลื่อนของเข็ม ไม่ว่าอย่างไรเราก็เคารพการตั้งค่าของระบบอยู่แล้ว',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'ทะเล',
  'accent.violet': 'ม่วง',
  'accent.amber': 'อำพัน',
  'accent.mint': 'มินต์',
  'accent.rose': 'กุหลาบ',

  'tools.thresholds.title': 'เกณฑ์',
  'tools.thresholds.subtitle': 'ค่าที่แอปควรเริ่มบอกว่า “ปานกลาง” และค่าที่ควรเริ่มบอกว่า “อันตราย” เกณฑ์เริ่มต้นเป็นข้อเสนอของเรา ไม่ใช่มาตรฐาน — ปรับให้เข้ากับตัวคุณได้',
  'tools.thresholds.warn': 'เกณฑ์เตือน',
  'tools.thresholds.crit': 'เกณฑ์อันตราย',
  'tools.thresholds.warn.aria': 'เกณฑ์เตือน — {metric}',
  'tools.thresholds.crit.aria': 'เกณฑ์อันตราย — {metric}',
  'tools.thresholds.reset': 'ค่าเริ่มต้น',
  'tools.thresholds.reset.aria': 'คืนค่าเกณฑ์เริ่มต้น: {metric}',
  'tools.thresholds.moved': '{threshold} ถูกเลื่อนไปที่ {value}',
  'tools.thresholds.resetAll': 'คืนค่าเกณฑ์ทั้งหมด',
  'tools.thresholds.resetAll.title': 'คืนค่าเกณฑ์เริ่มต้นหรือไม่',
  'tools.thresholds.resetAll.text': 'ค่าทั้งเจ็ดจะกลับไปใช้เกณฑ์ที่แอปเสนอไว้ ประวัติการวัดของคุณยังอยู่ครบ',
  'tools.thresholds.resetAll.confirm': 'คืนค่า',
  'tools.thresholds.resetAll.cancel': 'เก็บของเดิมไว้',
  'tools.thresholds.resetAll.toast': 'เกณฑ์กลับไปเป็นค่าเริ่มต้นแล้ว',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'สูงกว่า {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} และต่ำกว่า',
  'tools.zoneRange.goodBelow': 'ต่ำกว่า {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} และสูงกว่า',

  'tools.calibration.title': 'การปรับเทียบ',
  'tools.calibration.subtitle': 'สำหรับคนที่มีอะไรให้เทียบ',
  'tools.calibration.intro': 'โทรศัพท์สองเครื่องที่ส่องไปยังโคมดวงเดียวกันจะให้ตัวเลขต่างกันเล็กน้อย — เซ็นเซอร์แต่ละตัวมีโทนสีของตัวเอง ถ้าคุณมีค่าที่เชื่อถือได้อยู่ในมือ คุณปรับแต่ละช่องสัญญาณของภาพขึ้นหรือลงเล็กน้อยได้ที่นี่ ตัวคูณทำงานก่อนที่เราจะคำนวณอะไรทั้งสิ้น จึงเปลี่ยนค่าทั้งเจ็ดพร้อมกัน',
  'tools.calibration.neutral': 'ไม่มีอะไรให้เทียบใช่ไหม ปล่อยไว้ที่ 1.00 — นั่นคือค่าจากโรงงานและไม่ทำให้อะไรเสีย',
  'tools.calibration.forward': 'การเปลี่ยนแปลงมีผลนับจากนี้ไป ผลการวัดที่อยู่ในประวัติแล้วจะคงอยู่อย่างที่เป็นในตอนที่บันทึก — เราไม่คำนวณย้อนหลัง เพราะนั่นจะเป็นการแก้ข้อมูลหลังเหตุการณ์',
  'tools.calibration.reset': 'ล้างค่าการปรับเทียบ',
  'tools.calibration.reset.toast': 'ล้างค่าการปรับเทียบแล้ว',
  'tools.calibration.channel.r': 'ช่องสีแดง',
  'tools.calibration.channel.g': 'ช่องสีเขียว',
  'tools.calibration.channel.b': 'ช่องสีน้ำเงิน',
  'tools.calibration.channel.aria': '{channel} — ตัวคูณการปรับเทียบ',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'การวัด',
  'tools.measurement.wake.title': 'ไม่ให้หน้าจอดับ',
  'tools.measurement.wake.desc': 'หน้าจอจะเปิดค้างไว้ระหว่างการวัด แบตเตอรี่จะหมดเร็วขึ้นในช่วงนั้น',
  'tools.measurement.wake.unsupported': 'เบราว์เซอร์นี้ไม่ยอมให้เราหยุดการดับหน้าจอ',
  'tools.measurement.haptics.title': 'การสั่น',
  'tools.measurement.haptics.desc': 'สั่นสั้น ๆ เพื่อยืนยันตอนเริ่ม ตอนหยุด และตอนเปลี่ยนค่าที่วัด',
  'tools.measurement.haptics.unsupported': 'อุปกรณ์นี้ไม่แจ้งว่ามีมอเตอร์สั่น',

  'tools.about.title': 'เกี่ยวกับการวัด',
  'tools.about.subtitle': 'ค่าทั้งเจ็ดคำนวณอะไรกันแน่ และความน่าเชื่อถือของวิธีนี้สิ้นสุดตรงไหน',
  'tools.about.scale': 'ช่วงค่า: {min} ถึง {max}',
  'tools.about.threshold': 'เราเตือนตั้งแต่ {warn} และแจ้งอันตรายตั้งแต่ {crit}',
  'tools.about.thresholdInvert': 'เราเตือนเมื่อต่ำกว่า {warn} และแจ้งอันตรายเมื่อต่ำกว่า {crit}',
  'tools.about.limitsHead': 'สิ่งที่การวัดนี้ทำไม่ได้',
  'tools.about.limit.spectrum.title': 'กล้องไม่ได้เห็นสีอย่างที่เครื่องมือวัดเห็น',
  'tools.about.limit.spectrum.text': 'กล้องโทรศัพท์มีสามช่องสัญญาณ: แดง เขียว และน้ำเงิน ส่วนเครื่องมือวัดแสงจะแยกแสงออกเป็นแถบแคบ ๆ หลายสิบแถบ สิ่งที่คุณเห็นที่นี่คำนวณมาจากตัวเลขสามตัวนั้น — ด้วยวิธีที่สมเหตุสมผล แต่ก็ยังเป็นการคำนวณ ไม่ใช่สเปกตรัมที่วัดได้จริง',
  'tools.about.limit.exposure.title': 'กล้องปรับความสว่างของตัวเอง',
  'tools.about.limit.exposure.text': 'พอหันโทรศัพท์ไปทางหน้าต่าง กล้องจะลดความสว่างของภาพลงเพื่อไม่ให้ภาพสว่างจนล้น “ความสว่างของฉาก” จึงลดลง ทั้งที่ในห้องไม่มีอะไรเปลี่ยนไป ดังนั้นให้เทียบค่านี้ภายในการถ่ายครั้งเดียวกัน ไม่ใช่เทียบระหว่างห้อง',
  'tools.about.limit.flicker.title': 'กล้องที่ช้าจับการกะพริบเร็ว ๆ ไม่ได้',
  'tools.about.limit.flicker.text': 'เราตรวจภาพ {hz} ครั้งต่อวินาที การเต้นที่เร็วกว่า {nyquist} ครั้งต่อวินาทีอาจปรากฏในการวัดแบบนี้ว่าช้ากว่าความเป็นจริง หรือหายไปเลย — และการกะพริบจากไฟบ้านก็เร็วอย่างนั้นพอดี ถ้าแอปจับอะไรได้ ให้ถือว่าเป็นสัญญาณว่า “ตรงนี้มีอะไรเต้นอยู่” ไม่ใช่ความถี่ที่วัดได้',
  'tools.about.limit.medical.title': 'นี่ไม่ใช่การตรวจทางการแพทย์และไม่ใช่คำแนะนำทางการแพทย์',
  'tools.about.limit.medical.text': 'แอปช่วยให้คุณสังเกตว่าแสงรอบตัวเย็น สว่าง หรือไม่นิ่ง และเสนอว่าทำอะไรกับมันได้บ้าง แอปไม่ตัดสินเรื่องสุขภาพของคุณ และไม่ใช้แทนการพูดคุยกับแพทย์ หรือการวัดด้วยเครื่องมือระดับมืออาชีพ',
  'tools.about.privacy': 'ทุกอย่างคำนวณบนอุปกรณ์ของคุณ ภาพจากกล้องไม่ถูกส่งหรือบันทึกไว้ที่ใดเลย — มีเพียงตัวเลขที่คำนวณได้เท่านั้นที่ถูกเก็บลงในหน่วยความจำ',

  'tools.data.title': 'ข้อมูล',
  'tools.data.subtitle': 'ทุกอย่างอยู่ในที่เก็บข้อมูลของเบราว์เซอร์นี้ และไม่ออกไปไหนจากที่นี่',
  'tools.data.summary.empty': 'ยังไม่มีผลการวัดที่บันทึกไว้เลย',
  'tools.data.summary': 'ในที่เก็บข้อมูล: {points} และ {sessions}',
  'tools.data.export.csv': 'ส่งออก CSV',
  'tools.data.export.json': 'ส่งออก JSON',
  'tools.data.clear': 'ล้างประวัติ',
  'tools.data.reset': 'การตั้งค่าเริ่มต้น',
  'tools.data.reset.title': 'คืนค่าการตั้งค่าเริ่มต้นหรือไม่',
  'tools.data.reset.text': 'รูปลักษณ์ เกณฑ์ การปรับเทียบ และการตั้งค่าการวัด จะกลับไปเป็นสถานะแรกเริ่ม ประวัติการวัดของคุณยังอยู่ครบ',
  'tools.data.reset.confirm': 'คืนค่า',
  'tools.data.reset.toast': 'คืนค่าการตั้งค่าเริ่มต้นแล้ว',
  'tools.data.wipe': 'ลบข้อมูลทั้งหมด',
  'tools.data.wipe.title': 'ลบข้อมูลทั้งหมดของแอปหรือไม่',
  'tools.data.wipe.text': 'สิ่งที่จะหายไป: ประวัติการวัดทั้งหมดและรายการเซสชัน เกณฑ์และค่าการปรับเทียบของคุณ รวมถึงการตั้งค่ารูปลักษณ์ แอปจะกลับไปเป็นสถานะเดียวกับตอนเปิดใช้ครั้งแรก',
  'tools.data.wipe.note': 'เราไม่มีสำเนาของข้อมูลนี้ — มันไม่เคยออกไปจากอุปกรณ์นี้ จึงไม่มีที่ใดให้กู้คืนกลับมา',
  'tools.data.wipe.check': 'ฉันเข้าใจว่าการกระทำนี้ย้อนกลับไม่ได้',
  'tools.data.wipe.confirm': 'ลบทั้งหมด',
  'tools.data.wipe.toast': 'ลบข้อมูลทั้งหมดของแอปแล้ว',
  'tools.data.wipe.announce': 'ลบข้อมูลทั้งหมดของแอปแล้ว การตั้งค่ากลับไปเป็นค่าเริ่มต้น',
  'tools.data.storage.blocked': 'เบราว์เซอร์นี้ไม่ยอมให้เก็บอะไรไว้อย่างถาวร (โหมดส่วนตัว หรือข้อมูลเว็บไซต์ถูกบล็อก) ทุกอย่างที่คุณตั้งไว้ที่นี่จะหายไปเมื่อคุณปิดแท็บ',
  'tools.data.storage.full': 'ที่เก็บข้อมูลของเบราว์เซอร์เต็มแล้ว และผลการวัดใหม่จะไม่ถูกบันทึกอีกต่อไป การล้างประวัติจะช่วยให้มีที่ว่างขึ้นมา',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'สนับสนุน',
  'support.free.title': 'ทุกอย่างใช้ได้อยู่แล้ว',
  'support.free.lead': 'ค่าทั้งเจ็ด ประวัติทั้งหมด เกณฑ์ การปรับเทียบ และการส่งออก ใช้ได้ตั้งแต่เปิดครั้งแรก — ไม่ต้องมีบัญชี ไม่มีขีดจำกัด และไม่มีค่าใช้จ่าย',
  'support.free.note': 'การวัดคำนวณบนอุปกรณ์นี้ทั้งหมดและทำงานได้โดยไม่ต้องมีเครือข่าย ที่นี่ไม่มีเวอร์ชันที่ดีกว่าซ่อนอยู่หลังกำแพง',
  'support.why.title': 'ทำไมผมถึงขอ',
  'support.why.lead': 'มอนิเตอร์แสงสร้างขึ้นนอกเวลางาน ไม่มีโฆษณา ไม่มีผู้สนับสนุน และไม่มีบริษัทอยู่เบื้องหลัง การสนับสนุนช่วยจ่ายค่าเวลาที่ใช้แก้ข้อบกพร่อง เพิ่มค่าที่วัดใหม่ ๆ และดูแลสิ่งที่ใช้งานได้อยู่แล้วให้ยังใช้ได้ต่อไป',
  'support.what.title': 'การบริจาคให้อะไรคุณบ้าง',
  'support.what.lead': 'ไม่ให้อะไรเลย การบริจาคไม่ปลดล็อกอะไรทั้งนั้น — ไม่มีฟีเจอร์เพิ่ม ไม่มีตราติดข้างชื่อ ไม่มีสิทธิ์ก่อนใคร ทุกอย่างที่แอปทำได้ คุณมีอยู่แล้ว',
  'support.what.note': 'เหลืออยู่เพียงว่าผมได้รู้ว่ามันเป็นประโยชน์กับใครสักคน เท่านั้นก็เป็นเหตุผลที่เพียงพอจริง ๆ',
  'support.cta.title': 'ถ้าคุณอยากช่วย',
  'support.cta.button': 'เลี้ยงกาแฟผมสักแก้ว',
  'support.cta.nolink': 'ยังไม่ได้เชื่อมต่อโปรไฟล์รับบริจาค เมื่อมีแล้ว ปุ่มจะมาอยู่ตรงนี้',
  'support.cta.privacy': 'ลิงก์นี้จะเปิดหน้า Buy Me a Coffee ภายนอก ในแท็บใหม่ นั่นเป็นช่วงเวลาเดียวที่มีอะไรออกไปจากอุปกรณ์นี้ — ตัวการวัดเองยังอยู่ที่นี่เสมอ',
  'support.cta.privacyFuture': 'เมื่อมีที่อยู่แล้ว ปุ่มนี้จะเปิดหน้า Buy Me a Coffee ภายนอก ในแท็บใหม่ นั่นจะเป็นช่วงเวลาเดียวที่มีอะไรออกไปจากอุปกรณ์นี้ — ตัวการวัดเองยังอยู่ที่นี่เสมอ',
  'support.cta.note': 'ที่นี่ไม่มีการนับถอยหลัง ไม่มีการเตือนซ้ำ และไม่มีหน้าต่างที่เด้งขึ้นมาเอง คำขอนี้รออยู่เฉพาะในแท็บนี้เท่านั้น',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'นาทีล่าสุด',
  'gauge.aria': '{metric}: {value} ระดับ: {zone}',
  'gauge.aria.note': '{metric}: {value} ระดับ: {zone} {note}',
  'gauge.aria.initial': '{metric}: ไม่มีข้อมูล',
  'gauge.value.none': 'ไม่มีข้อมูล',
  /* Odczyt słowny z jednostką: „27 เปอร์เซ็นต์”, „1.20 เท่า”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'ค่าโดยประมาณ',
  'gauge.note.offScale': 'นอกช่วงสเกล',
  'gauge.metric.unknown': 'ค่าที่ไม่รู้จัก',

  'chart.aria.label': 'กราฟประวัติการวัด',
  'chart.hint': 'กราฟแบบโต้ตอบได้ ลูกศรซ้ายและขวาเลื่อนเคอร์เซอร์อ่านค่า Home และ End ไปยังต้นและท้ายของช่วง Escape ซ่อนเคอร์เซอร์',
  'chart.empty.title': 'ไม่มีข้อมูล',
  'chart.empty.text': 'เริ่มวัดได้เลย — กราฟจะปรากฏหลังจากอ่านค่าได้ครั้งแรก',
  'chart.few.title': 'ข้อมูลไม่พอ',
  'chart.few.text': 'เรามีค่าที่อ่านได้เพียงค่าเดียว: {value} การลากเส้นต้องใช้สองค่า',
  'chart.legend.line': 'การวัด',
  'chart.legend.gap': 'ช่วงที่ไม่ได้วัด',
  'chart.aria.head': 'กราฟ: {metric} ช่วง {range}',
  'chart.aria.empty': 'ไม่มีข้อมูลในช่วงนี้',
  'chart.aria.one': 'ค่าที่อ่านได้หนึ่งค่า: {value}',
  'chart.aria.summary': 'ตั้งแต่ {min} ถึง {max} เฉลี่ย {avg} {points}',
  'chart.aria.gaps': 'ชุดข้อมูลมีช่วงว่าง — ตอนนั้นเราไม่ได้วัด',
  'chart.readout.empty': 'ไม่มีข้อมูลในช่วงนี้',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'ข้อมูลไม่พอสำหรับวาดกราฟ',
  'chart.readout.hint': 'ลากไปบนกราฟ หรือใช้ปุ่มลูกศร เพื่ออ่านค่าการวัดทีละค่า',
  'chart.time.now': 'ตอนนี้',
  'chart.time.justNow': 'เมื่อครู่นี้',
  'chart.time.ago': '{duration}ที่แล้ว',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd tajski skrót miesiąca (ส.ค.) i zegar
     dwudziestoczterogodzinny, bo tak formatuje godzinę ustawienie regionalne
     „th”. */
  'chart.sample.ago': '\u221230\u00A0นาที',
  'chart.sample.clock': '00:00',
  'chart.sample.date': '30\u00A0ส.ค.',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'สัดส่วนสีน้ำเงิน',
  'metric.share.short': 'แสงที่เห็นตกอยู่ที่ช่องสีน้ำเงินมากเท่าไร',
  'metric.share.help': 'แยกสีออกจากความสว่าง — นี่คือค่าที่ขยับเมื่อคุณเปิดโหมดกลางคืน',
  'metric.brightness.name': 'ความสว่างของฉาก',
  'metric.brightness.short': 'ความสว่างเฉลี่ยของภาพจากกล้อง',
  'metric.brightness.help': 'เป็นค่าเชิงเปรียบเทียบ ไม่ใช่ลักซ์ — ระบบปรับค่าแสงอัตโนมัติของกล้องคอยเลื่อนค่านี้อยู่เบื้องหลัง',
  'metric.kelvin.name': 'อุณหภูมิสี',
  'metric.kelvin.short': 'แสงเป็นโทนอุ่นหรือโทนเย็น',
  'metric.kelvin.help': 'ต่ำกว่า 3000 K แสงจะอุ่นและนุ่มนวลกว่าในตอนเย็น ส่วน 6500 K คือสีขาวเริ่มต้นของหน้าจอส่วนใหญ่',
  'metric.melanopic.name': 'ผลต่อนาฬิกาชีวภาพ',
  'metric.melanopic.short': 'แสงนี้ส่งผลต่อนาฬิกาชีวภาพแรงแค่ไหน',
  'metric.melanopic.help': 'เป็นค่าประมาณของอัตราส่วนเมลาโนปิก 1.00 คือแสงขาวกลางวันที่เป็นกลาง ส่วนตอนเย็นควรลงต่ำกว่า 0.50',
  'metric.flicker.name': 'การกะพริบ',
  'metric.flicker.short': 'การเต้นของแหล่งแสงที่ตามองไม่เห็น',
  'metric.flicker.help': 'สวิตช์หรี่ไฟและแบ็กไลต์ราคาถูกมักเต้นเป็นจังหวะ ตามองไม่เห็น แต่เป็นสาเหตุที่รู้กันของความล้าและอาการปวดหัว',
  'metric.uniformity.name': 'ความสม่ำเสมอ',
  'metric.uniformity.short': 'แสงกระจายทั่วเฟรมสม่ำเสมอหรือไม่',
  'metric.uniformity.help': 'ค่าต่ำบนหน้าจอหมายถึงแบ็กไลต์รั่วหรือมีแสงสะท้อน ส่วนบนโต๊ะ — โคมที่วางไว้ไม่ดี',
  'metric.comfort.name': 'ความสบายตา',
  'metric.comfort.short': 'คะแนนเดียวแทนตัวเลขหกตัว',
  'metric.comfort.help': 'รวมผลการวัดอื่น ๆ เป็นคะแนน 0–100 แล้วชี้ว่าอะไรฉุดคะแนนลงมากที่สุด น้ำหนักที่ใช้เป็นดุลพินิจของเรา ไม่ใช่มาตรฐาน',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'ปลอดภัย',
  'zone.warn': 'ปานกลาง',
  'zone.crit': 'อันตราย',
  'zone.none': 'ไม่มีข้อมูล',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 ส.ค.'). */
  'date.month.short.1': 'ม.ค.',
  'date.month.short.2': 'ก.พ.',
  'date.month.short.3': 'มี.ค.',
  'date.month.short.4': 'เม.ย.',
  'date.month.short.5': 'พ.ค.',
  'date.month.short.6': 'มิ.ย.',
  'date.month.short.7': 'ก.ค.',
  'date.month.short.8': 'ส.ค.',
  'date.month.short.9': 'ก.ย.',
  'date.month.short.10': 'ต.ค.',
  'date.month.short.11': 'พ.ย.',
  'date.month.short.12': 'ธ.ค.',

  'date.clock': '{hours}:{minutes}',
  /* Kolejność wstawek jest tu taka jak po polsku: tajska data skrócona to
     „30 ส.ค.”, a rok dopisuje się na końcu — „30 ส.ค. 2026”. Rok jest
     gregoriański: bierze go z zegara urządzenia format.js, więc kalendarza
     buddyjskiego tu nie ma. */
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0{year}',
  'date.dateTime': '{date} {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0ชม.',
  'time.duration.hourMinute': '{hours}\u00A0ชม. {minutes}\u00A0นาที',
  'time.duration.hour': '{hours}\u00A0ชม.',
  'time.duration.minuteSecond': '{minutes}\u00A0นาที {seconds}\u00A0วินาที',
  'time.duration.minute': '{minutes}\u00A0นาที',
  'time.duration.second': '{seconds}\u00A0วินาที',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „เมื่อครู่นี้”. */
  'time.justNow': 'เมื่อครู่นี้',
  'time.aMinuteAgo': 'หนึ่งนาทีที่แล้ว',
  'time.minutesAgo': '{minutes}\u00A0นาทีที่แล้ว',
  'time.hoursAgo': '{hours}\u00A0ชั่วโมงที่แล้ว',
  'time.yesterday': 'เมื่อวาน',
  'time.daysAgo': '{days}\u00A0วันที่แล้ว',

  /* Formy zależne od liczby. Tajski ma w CLDR JEDNĄ kategorię: `other`
     (Intl.PluralRules('th') → ['other']) — rzeczownik się nie odmienia, więc
     formą jest samo słowo. Silnik skleja „liczba + spacja + forma”, więc
     wychodzi '3 เซสชัน' i '120 ผลการวัด'. */
  'time.days.plural': { other: 'วัน' },
  'unit.sample.plural': { other: 'ตัวอย่าง' },
  'unit.measurement.plural': { other: 'ผลการวัด' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Tajski nie odmienia rzeczownika — oba klucze zostają (kształt słownika
     jest wspólny dla wszystkich języków), a wartości są tu identyczne. */
  'unit.session.plural': { other: 'เซสชัน' },
  'unit.session.accusative.plural': { other: 'เซสชัน' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to po tajsku dwie
     różne rzeczy: 'จุดข้อมูล' to punkt danych, 'คะแนน' to punkt oceny. */
  'unit.chartPoint.plural': { other: 'จุดข้อมูล' },
  'unit.point.plural': { other: 'คะแนน' },
  'unit.kelvin.plural': { other: 'เคลวิน' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „เปอร์เซ็นต์”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'เปอร์เซ็นต์',
  'unit.spoken.times': 'เท่า',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'ไม่ได้รับอนุญาตให้ใช้กล้อง อนุญาตให้ใช้กล้องกับหน้านี้ในการตั้งค่าเบราว์เซอร์ แล้วลองอีกครั้ง',
  'camera.error.notfound': 'ไม่พบกล้อง ตรวจสอบว่าอุปกรณ์มีกล้อง และกล้องไม่ได้ถูกปิดไว้ในระบบ',
  'camera.error.inuse': 'กล้องถูกแอปอื่นใช้งานอยู่ ปิดแอปหรือแท็บนั้นแล้วลองอีกครั้ง',
  'camera.error.insecure': 'กล้องทำงานได้เฉพาะผ่าน HTTPS หรือบน localhost เท่านั้น เปิดหน้านี้ด้วยที่อยู่ที่ขึ้นต้นด้วย “https://”',
  'camera.error.unsupported': 'เบราว์เซอร์นี้ไม่เปิดให้ใช้กล้องที่นี่ ลองใช้ Chrome หรือ Safari ในหน้าต่างปกติ — ไม่ใช่ในหน้าตัวอย่างที่ฝังอยู่ในแอปอื่น',
  'camera.error.unknown': 'เปิดกล้องไม่สำเร็จ'
};
