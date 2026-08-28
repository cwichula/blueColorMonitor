/* docs/shared/i18n/th.js — słownik WSPÓLNY, tajski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest tajski.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — i tak ma zostać
 * (patrz docs/shared/README.md, rozdział „Warstwa językowa”). Klucza, którego
 * nie ma w angielskim, nie wolno tu dopisać: angielski jest wartością zapasową,
 * więc to on wyznacza zestaw.
 *
 * TERMINOLOGIA: jeden odpowiednik na pojęcie w całym pliku —
 *   อุณหภูมิสี (temperatura barwowa), อัตราส่วนเมลาโนปิก (współczynnik
 *   melanopiczny), การกะพริบ (migotanie), ความสม่ำเสมอ (równomierność,
 *   termin z techniki oświetleniowej), นาฬิกาชีวภาพ (zegar biologiczny,
 *   rytm dobowy), สเปกตรัม (widmo), การสอบเทียบ (kalibracja).
 *
 * INTERPUNKCJA: tajski nie stawia kropki na końcu zdania — granicę zdań
 * wyznacza spacja. Brak kropek nie jest tu niedopatrzeniem. Zostają natomiast
 * półpauzy tam, gdzie polski i angielski stawiają myślnik.
 *
 * ODSTĘPY: między liczbą a jednostką łacińską (3000 K, 5 Hz) zostaje spacja.
 * Symboli jednostek (%, K, ×, Hz) nie tłumaczymy, a liczby dziesiętne zapisuje
 * się po tajsku z kropką (1.00, 0.50) — tak jak po angielsku.
 *
 * LICZEBNIKI: tajski ma w CLDR jedną kategorię — 'other'. Obiekty form mają
 * więc dokładnie jeden klucz; to nie jest niedokończone tłumaczenie. Liczba
 * stoi przy klasyfikatorze (ค่า, ครั้ง).
 */
window.I18nData = window.I18nData || {};
window.I18nData['th'] = Object.assign(window.I18nData['th'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu
     (UE) 2017/745, gdzie stoi na początku, w pozycji podmiotu. */
  'app.name': 'มอนิเตอร์แสง',

  /* ---- wybór języka ---- */

  'language.label': 'ภาษา',
  'language.help': 'ภาษาที่ใช้ทั้งแอป ทุกภาษาอยู่ในเครื่องนี้อยู่แล้ว — ไม่มีการดาวน์โหลดและไม่มีการส่งอะไรออกไปที่ใด',
  'language.auto': 'ตามการตั้งค่าเครื่อง',
  'language.autoHint': 'ใช้ภาษาที่ตั้งไว้ในโทรศัพท์หรือในเบราว์เซอร์',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'สัดส่วนสีน้ำเงิน',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'เปอร์เซ็นต์',
  'metric.share.short': 'แสงที่มองเห็นตกอยู่ในช่องสีน้ำเงินมากเพียงใด',
  'metric.share.help': 'แยกสีออกจากความสว่าง — ค่านี้คือค่าที่ขยับเมื่อคุณเปิดโหมดกลางคืน',

  'metric.brightness.name': 'ความสว่างของฉาก',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'เปอร์เซ็นต์',
  'metric.brightness.short': 'ความสว่างเฉลี่ยของภาพจากกล้อง',
  'metric.brightness.help': 'เป็นค่าเชิงเปรียบเทียบ ไม่ใช่ลักซ์ — ระบบปรับค่าแสงอัตโนมัติของกล้องเลื่อนค่านี้อยู่เบื้องหลัง',

  'metric.kelvin.name': 'อุณหภูมิสี',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'เคลวิน',
  'metric.kelvin.short': 'แสงนี้เป็นโทนอุ่นหรือโทนเย็น',
  'metric.kelvin.help': 'ต่ำกว่า 3000 K แสงจะอุ่นและนุ่มนวลกว่าในตอนเย็น ส่วน 6500 K คือสีขาวมาตรฐานของจอส่วนใหญ่',

  'metric.melanopic.name': 'ผลต่อนาฬิกาชีวภาพ',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'เท่า',
  'metric.melanopic.short': 'แสงนี้มีผลต่อนาฬิกาชีวภาพแรงเพียงใด',
  'metric.melanopic.help': 'เป็นค่าประมาณของอัตราส่วนเมลาโนปิก 1.00 คือแสงขาวกลางวันที่เป็นกลาง ในตอนเย็นควรลดลงต่ำกว่า 0.50',

  'metric.flicker.name': 'การกะพริบ',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'เปอร์เซ็นต์',
  'metric.flicker.short': 'การกะพริบของแหล่งกำเนิดแสงที่ตามองไม่เห็น',
  'metric.flicker.help': 'สวิตช์หรี่ไฟและไฟส่องหลังจอราคาถูกมักกะพริบ ตาไม่เห็นการกะพริบนั้น แต่มันเป็นสาเหตุหนึ่งของความล้าและอาการปวดศีรษะ',

  'metric.uniformity.name': 'ความสม่ำเสมอ',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'เปอร์เซ็นต์',
  'metric.uniformity.short': 'แสงกระจายทั่วเฟรมอย่างสม่ำเสมอหรือไม่',
  'metric.uniformity.help': 'ค่าต่ำบนหน้าจอหมายถึงไฟส่องหลังจอรั่วหรือมีแสงสะท้อน ส่วนบนโต๊ะทำงานหมายถึงวางโคมไฟไม่ดี',

  'metric.comfort.name': 'ความสบายตา',
  'metric.comfort.unit': 'คะแนน',
  'metric.comfort.unitSpoken': 'คะแนน',
  'metric.comfort.short': 'คำตัดสินเดียวแทนตัวเลขหกค่า',
  'metric.comfort.help': 'รวมค่าที่วัดได้อื่น ๆ เป็นคะแนน 0–100 และแสดงว่าอะไรทำให้คะแนนลดลงมากที่สุด น้ำหนักของแต่ละส่วนเป็นดุลพินิจของกองบรรณาธิการเรา ไม่ใช่มาตรฐาน',

  /* Etykiety składników oceny komfortu — Metrics.comfortIndex zwraca je jako
     `penalties[].id`, więc nazwa klucza idzie za tym identyfikatorem. */
  'comfort.penalty.melanopic': 'ผลต่อนาฬิกาชีวภาพ',
  'comfort.penalty.kelvin': 'สีแสงโทนเย็น',
  'comfort.penalty.flicker': 'การกะพริบ',
  'comfort.penalty.uniformity': 'แสงไม่สม่ำเสมอ',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Nazwa przycisku
     w cudzysłowie musi brzmieć tak samo jak etykieta przycisku w słowniku
     wersji (docs/vN/i18n/th.js). */

  'engine.idle': 'กด “เริ่ม” เพื่อเปิดกล้อง',
  'engine.starting': 'กำลังเปิดกล้อง…',

  'engine.error.permission': 'ไม่ได้รับอนุญาตให้ใช้กล้อง โปรดอนุญาตการใช้กล้องในการตั้งค่าเบราว์เซอร์ แล้วกด “เริ่ม” อีกครั้ง',
  'engine.error.notFound': 'ไม่พบกล้อง ตรวจสอบว่าอุปกรณ์มีกล้องและกล้องไม่ได้ถูกปิดไว้ในระบบ',
  'engine.error.busy': 'กล้องกำลังถูกใช้งานโดยแอปอื่น ปิดแอปนั้นแล้วลองใหม่อีกครั้ง',
  'engine.error.unknown': 'ไม่สามารถเปิดกล้องได้',
  'engine.error.unsupported': 'เบราว์เซอร์นี้ไม่เปิดให้หน้านี้เข้าถึงกล้อง เปิดแอปผ่าน HTTPS หรือใช้เบราว์เซอร์อื่น',

  /* ---- strefy: jeden język barw dla całej aplikacji ---- */

  'zone.good': 'อยู่ในเกณฑ์',
  'zone.warning': 'ควรระวัง',
  'zone.critical': 'วิกฤต',
  'zone.none': 'ไม่มีข้อมูล',
  'zone.settling': 'กำลังประเมิน',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania. Tajski nie zna
     wielkich liter ani kropki na końcu zdania, więc brzmi tak samo jak napis
     na plakietce; osobne klucze zostają, bo zestaw kluczy jest wspólny dla
     wszystkich języków. */
  'zone.spoken.good': 'อยู่ในเกณฑ์',
  'zone.spoken.warning': 'ควรระวัง',
  'zone.spoken.critical': 'วิกฤต',
  'zone.spoken.none': 'ไม่มีข้อมูล',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'คะแนน',
  'unit.hertz': 'Hz',
  'unit.second': 'วินาที',
  'unit.minute': 'นาที',
  'unit.hour': 'ชม.',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'แสงนี้ใช้ได้ — ไม่มีค่าใดเกินเกณฑ์ที่คุณตั้งไว้',
  'verdict.noValue': 'ตอนนี้วัดค่านี้ไม่ได้ ตรวจดูว่ามีอะไรบังเลนส์อยู่หรือไม่',
  'verdict.warmup': 'กำลังประเมินผล — ถือโทรศัพท์ให้นิ่งอีกสักครู่',

  'verdict.warning.share': 'แสงนี้ตกอยู่ในช่องสีน้ำเงินค่อนข้างมาก ในตอนเย็นควรหรี่ให้เบาลง',
  'verdict.warning.brightness': 'ฉากสว่าง — กล้องทำงานใกล้ขีดบนของช่วงที่วัดได้',
  'verdict.warning.kelvin': 'แสงค่อนข้างเย็น ในตอนเย็นหลอดไฟราว 2700 K จะนุ่มนวลกว่า',
  'verdict.warning.melanopic': 'แสงนี้มีผลต่อนาฬิกาชีวภาพค่อนข้างแรง',
  'verdict.warning.flicker': 'แหล่งกำเนิดแสงกะพริบอย่างเห็นได้ชัด',
  'verdict.warning.uniformity': 'แสงกระจายในเฟรมอย่างไม่สม่ำเสมอ',
  'verdict.warning.comfort': 'ความสบายตาลดลง — มีหลายอย่างประกอบกันเข้า',

  'verdict.critical.share': 'มีสีน้ำเงินมากเป็นพิเศษ ในตอนเย็นให้เปิดโหมดกลางคืนหรือเปลี่ยนแหล่งกำเนิดแสง',
  'verdict.critical.brightness': 'ฉากสว่างมาก อย่าวัดโดยเล็งตรงเข้าไปที่แหล่งกำเนิดแสง',
  'verdict.critical.kelvin': 'แสงเย็นจัด ในตอนเย็นแสงแบบนี้ทำให้ตาล้ามากที่สุด หลอดไฟที่อุ่นกว่าหรือโหมดกลางคืนจะช่วยได้',
  'verdict.critical.melanopic': 'แสงนี้มีผลต่อนาฬิกาชีวภาพอย่างมาก ในตอนเย็นควรลดลงต่ำกว่า 0.50',
  'verdict.critical.flicker': 'แหล่งกำเนิดแสงกะพริบอย่างรุนแรง ซึ่งเป็นสาเหตุหนึ่งของอาการตาล้าและปวดศีรษะ',
  'verdict.critical.uniformity': 'แสงกระจายไม่สม่ำเสมออย่างมาก ตรวจดูตำแหน่งของโคมไฟหรือแสงสะท้อนบนหน้าจอ',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru. */
  'verdict.critical.comfort': 'ความสบายตาอยู่ในระดับต่ำ ดูรายละเอียดของคะแนนเพื่อดูว่าอะไรทำให้คะแนนลดลง',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'สิ่งที่ตัวเลขนี้ไม่ได้บอก',
  'note.warningTitle': 'ควรระวัง',
  'note.dashTitle': 'การวัดนี้ไม่ใช่อะไร',
  'note.dashText': 'กล้องโทรศัพท์มีช่องสีกว้าง ๆ สามช่องและมีการปรับสมดุลแสงขาวอัตโนมัติ — จึงไม่ได้วัดสเปกตรัม อุณหภูมิสีและผลต่อนาฬิกาชีวภาพเป็นค่าประมาณที่คำนวณจากแม่สี sRGB แอปนี้แสดงความแตกต่างและการเปลี่ยนแปลงตามเวลาได้ดี แต่ไม่ได้ใช้แทนเครื่องวัดและไม่ได้ให้การวินิจฉัยใด ๆ',
  'note.approxLegend': '≈ ค่าโดยประมาณ — คำนวณจากแม่สี sRGB ไม่ใช่จากการวัดสเปกตรัม',
  'note.kelvinOutOfRange': 'อยู่นอกช่วงของวิธีวัด — ที่สีเช่นนี้ สูตรคำนวณอุณหภูมิสีเลิกน่าเชื่อถือ',
  /* {rate} i {limit} podaje wywołanie, bo to liczby z silnika (5 Hz, 2,5 Hz),
     a ich zapis jest różny w różnych językach: po tajsku część dziesiętną
     oddziela kropka (2.5). Zapisu liczby nie wolno wpisywać na sztywno. */
  'note.flickerOutOfRange': 'อยู่นอกช่วงของวิธีวัด — การสุ่มตัวอย่างที่ {rate} Hz เห็นการกะพริบได้เฉพาะที่ต่ำกว่า {limit} Hz เท่านั้น การกะพริบของไฟบ้านที่ 100 Hz อยู่นอกระยะเอื้อม และแอปจะไม่รายงานค่านั้นเป็นผลการวัดเลย',
  'note.helpTitle': 'สิ่งที่ตัวเลขนี้ไม่ได้บอก',
  'note.helpText': 'กล้องโทรศัพท์มีช่องสีกว้าง ๆ สามช่องและไม่ได้วัดสเปกตรัม ค่านี้เป็นตัวชี้วัดเชิงเปรียบเทียบ — แสดงความแตกต่างระหว่างแสงแต่ละแบบและการเปลี่ยนแปลงตามเวลาได้ดี แต่ไม่ใช่ผลการวัดในห้องปฏิบัติการและไม่ใช่ข้อมูลทางการแพทย์',
  'note.calibration': 'เป็นการวัดที่ไม่ได้สอบเทียบ — ให้ใช้ค่าเหล่านี้ในเชิงเปรียบเทียบ',

  'note.howToTitle': 'วิธีวัดให้ได้ผลที่มีความหมาย',
  'note.howTo.hold.title': 'ถือโทรศัพท์ให้นิ่ง',
  'note.howTo.hold.text': 'ระบบปรับค่าแสงอัตโนมัติต้องใช้เวลา 2–3 วินาทีจึงจะนิ่ง',
  'note.howTo.aim.title': 'เล็งไปที่พื้นผิวที่มีแสงตกกระทบ',
  'note.howTo.aim.text': 'กระดาษขาวหนึ่งแผ่นหรือผนังสีอ่อน อย่าวัดโดยมองตรงเข้าไปในแหล่งกำเนิดแสง',
  'note.howTo.compare.title': 'จงเปรียบเทียบ อย่าตัดสินเป็นค่าสัมบูรณ์',
  'note.howTo.compare.text': 'ฉากเดียวกันก่อนและหลังการเปลี่ยนแสงบอกอะไรได้มากกว่าตัวเลขเพียงค่าเดียว',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Skracanie go w tłumaczeniu nie jest kwestią stylu. Oznaczenie
     aktu — (EU) 2017/745 — zostaje w postaci urzędowej. */

  'legal.noDiagnosis': 'ไม่มีผลการวัดใดเป็นการวินิจฉัยโรคหรือคำแนะนำทางสุขภาพ',
  'legal.mdr': '{app} ไม่ใช่เครื่องมือแพทย์ตามความหมายของระเบียบ (EU) 2017/745 ไม่ได้มีไว้เพื่อวินิจฉัย ป้องกัน ติดตาม หรือรักษาภาวะทางการแพทย์ใด ๆ และไม่ได้ใช้แทนการตรวจโดยแพทย์หรือนักทัศนมาตร',

  /* ---- prywatność ---- */

  'privacy.title': 'อะไรบ้างที่ออกจากเครื่องนี้',
  'privacy.short': 'ไม่มีสิ่งใดในแอปนี้ที่ส่งอะไรออกไปยังเครือข่าย ตัวเลขทุกค่าเกิดขึ้นบนเครื่องนี้และอยู่ที่นี่',
  'privacy.onDevice': 'กล้องจะเริ่มทำงานหลังจากที่คุณกดปุ่มเท่านั้น และภาพไม่เคยออกจากเครื่องนี้',
  'privacy.external': 'นี่เป็นที่เดียวในทั้งแอปที่มีอะไรออกจากเครื่องนี้ ปุ่มนี้เปิดหน้าเว็บภายนอกในแท็บใหม่ และเกิดขึ้นก็ต่อเมื่อคุณกดปุ่มแล้วเท่านั้น ผลการวัด ประวัติ และการตั้งค่ายังคงอยู่ที่นี่',
  'privacy.externalPending': 'เมื่อมีที่อยู่เว็บแล้ว ปุ่มนี้จะเปิดหน้าเว็บภายนอกในแท็บใหม่ นั่นจะเป็นช่วงเวลาเดียวที่มีอะไรออกจากเครื่องนี้ ผลการวัด ประวัติ และการตั้งค่ายังคงอยู่ที่นี่',
  'privacy.storageBlocked': 'เบราว์เซอร์นี้ไม่ยอมให้บันทึกอะไรเลย (โหมดส่วนตัว หรือมีการบล็อกข้อมูลเว็บไซต์) การวัดยังทำงานได้ แต่ประวัติจะหายไปเมื่อคุณปิดแท็บ',

  /* ---- liczebniki ----
     Tajski ma w CLDR jedną kategorię: 'other'. Rzeczownik nie zmienia formy,
     a liczba stoi przed klasyfikatorem (ค่า, ครั้ง). Formę wybiera
     Intl.PluralRules('th'), nie nasza reguła. */

  'count.readings': { other: 'ค่าที่วัดได้ {n} ค่า' },
  'count.sessions': { other: 'การวัด {n} ครั้ง' },
  'count.seconds': { other: '{n} วินาที' },
  'count.minutes': { other: '{n} นาที' },
  'count.hours': { other: '{n} ชั่วโมง' },
  'count.days': { other: '{n} วัน' }
});
