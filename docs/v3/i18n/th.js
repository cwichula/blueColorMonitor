/* docs/v3/i18n/th.js — słownik WŁASNY wersji v3, tajski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/th.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js tego katalogu — pilnuje
 * tego docs/shared/i18n/keys.test.js. Kluczy, które stoją w słowniku wspólnym
 * (nazwy stref, zdania oceniające, noty o granicach metody, nazwy i opisy
 * siedmiu wielkości, zastrzeżenie z rozporządzenia (UE) 2017/745), tu NIE MA —
 * poza jednym świadomym nadpisaniem, opisanym przy 'verdict.critical.comfort'.
 *
 * TERMINOLOGIA jest przepisana ze słownika wspólnego docs/shared/i18n/th.js
 * i nie ma od niej wyjątków: สัดส่วนสีน้ำเงิน (udział niebieskiego),
 * ความสว่างของฉาก (jasność sceny), อุณหภูมิสี (temperatura barwowa),
 * ผลต่อนาฬิกาชีวภาพ wraz z อัตราส่วนเมลาโนปิก (wpływ na rytm dobowy,
 * współczynnik melanopiczny), การกะพริบ (migotanie), ความสม่ำเสมอ
 * (równomierność), ความสบายตา (komfort wzrokowy), สเปกตรัม (widmo),
 * การสอบเทียบ (kalibracja). Strefy: อยู่ในเกณฑ์ / ควรระวัง / วิกฤต /
 * ไม่มีข้อมูล. Nazwa aplikacji: มอนิเตอร์แสง.
 *
 * NAZWY WŁASNE v3, których w warstwie wspólnej nie ma: แผงควบคุม (pulpit),
 * ช่องวัดหลัก (kanał główny; ช่องสี to kanał BARWNY z tabeli wzmocnień
 * w module 03), มาตรวัด (skala), เกณฑ์ (próg) — stąd เกณฑ์ควรระวัง
 * i เกณฑ์วิกฤต, bo nazwy progów idą za nazwami stref — ค่าที่วัด (wielkość),
 * เซสชัน (sesja), โมดูล (moduł), เครื่องบันทึก (rejestrator), ภาพทดสอบ
 * (plansza).
 *
 * ZASTRZEŻENIA MEDYCZNE i akapity o prywatności przetłumaczone WIERNIE, zdanie
 * w zdanie — bez osłabiania, bez wzmacniania i bez skracania. To zdania
 * o skutkach prawnych.
 *
 * INTERPUNKCJA: tajski nie stawia kropki na końcu zdania — granicę zdań
 * wyznacza spacja i tylko tam przeglądarka może złamać wiersz. Brak kropek nie
 * jest niedopatrzeniem. Cudzysłów zapisujemy jako “ ”, półpauza (—) zostaje
 * tam, gdzie polszczyzna stawia myślnik wtrącenia. Między liczbą a jednostką
 * łacińską (3000 K, 5 Hz) zostaje spacja.
 *
 * ZAPIS LICZB WE WZORACH. Polska redakcja pisze przecinek dziesiętny
 * („0,3320”), tajska kropkę („0.3320”) — jak w docs/shared/i18n/th.js i jak
 * po angielsku. Wzory czyta człowiek, a nie parser. Liczby wstawiane przez
 * '{…}' są osobną sprawą: te formatuje warstwa językowa według aktywnego
 * języka. Symbole jednostek (%, K, ×, Hz, ms, nm), nazwy formatów (CSV, JSON)
 * i identyfikatory techniczne zostają bez zmian.
 */
window.I18nData = window.I18nData || {};
window.I18nData['th'] = Object.assign(window.I18nData['th'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. Pismo tajskie
     nie zna wielkich liter, więc napis brzmi tak samo jak nazwa aplikacji. */
  'app.wordmark': 'มอนิเตอร์แสง',

  'state.idle': 'พร้อม',
  'state.starting': 'กำลังเริ่ม',
  'state.running': 'กำลังวัด',
  'state.runningTpl': 'กำลังวัด {time}',
  'state.stopped': 'หยุดแล้ว',
  'state.error': 'กล้องขัดข้อง',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5.0 po tajsku, 5,0 po polsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'เริ่มวัด',
  'keys.starting': 'กำลังเริ่ม…',
  'keys.stop': 'หยุด',
  'keys.flip': 'สลับกล้อง',
  'keys.flipAria': 'สลับกล้องหน้า/หลัง',
  'keys.menu': 'เมนู',
  'keys.menuAria': 'รายการโมดูล',
  'keys.back': '‹ กลับ',
  'keys.backAria': 'กลับไปยังแผงควบคุม',
  'keys.dash': 'แผงควบคุม',
  'keys.zoom': 'ขยายภาพตัวอย่าง',
  'keys.retry': 'ลองอีกครั้ง',
  'keys.refresh': 'โหลดใหม่',
  'keys.close': 'ปิด',
  'keys.show': 'แสดง',
  'keys.apply': 'ใช้',
  'keys.remove': 'ลบ',

  'monitor.legend': 'ภาพตัวอย่างสำหรับตรวจสอบ',
  'monitor.badge': 'สด',

  'aim.title': 'การเล็ง',
  'aim.hint': 'กรอบนี้แสดงส่วนของภาพที่แอปวัดจริง ๆ อย่างตรงไปตรงมา',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'ช่องวัดหลัก',
  'readout.thresholdTpl': '(เกณฑ์ {value})',
  'readout.contextTpl': 'ต่ำสุด {min} · เฉลี่ย {avg} · สูงสุด {max} — 60 วินาทีล่าสุด',
  'readout.contextEmpty': 'ไม่มีข้อมูลจาก 60 วินาทีล่าสุด',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'ความหมายของ {name}',
  'aria.channel': '{name} {value} {zone} แสดงบนหน้าปัดใหญ่',
  'aria.channelStale': '{name} ไม่มีข้อมูล แสดงบนหน้าปัดใหญ่',
  'aria.scale': 'มาตรวัด: {name} ตั้งแต่ {min} ถึง {max} ตอนนี้ {value} {zone} เกณฑ์ควรระวัง {warn} เกณฑ์วิกฤต {crit}',
  'aria.readout': '{name}: {value} {zone}',
  'aria.readoutApprox': '{name}: ประมาณ {value} {zone} เป็นค่าโดยประมาณ',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'มาตรวัดของช่องวัดหลัก ไม่มีข้อมูล',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': 'กด “เริ่มวัด” เล็งโทรศัพท์ไปที่พื้นผิวที่มีแสงตกกระทบ แล้วถือให้นิ่งสักสองสามวินาที',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'ความสบายตาอยู่ในระดับต่ำ ดูที่โมดูล 01 เพื่อดูว่าอะไรทำให้ค่านี้ลดลง',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'เริ่มจากปุ่ม “เริ่มวัด” ที่ด้านล่างของหน้าจอ กล้องจะเปิดก็ต่อเมื่อคุณกดปุ่มนั้นแล้วเท่านั้น',
  'transient.measureStopped': 'วัดเสร็จแล้ว · {time} · บันทึกลงประวัติแล้ว',
  'transient.newVersion': 'มีแอปเวอร์ชันใหม่แล้ว',
  'transient.thresholdsSaved': 'บันทึกเกณฑ์แล้ว',
  'transient.thresholdsRejected': 'ไม่ได้บันทึก — เกณฑ์ควรระวังกับเกณฑ์วิกฤตต้องไม่สลับข้างกัน',
  'transient.historyCleared': 'ล้างประวัติแล้ว',

  'live.lead': 'ช่องวัดหลัก: {name} {value} {zone}',
  'live.ready': 'ผลการประเมินพร้อมแล้ว {name} {value} {zone}',
  'live.started': 'เริ่มการวัดแล้ว',
  'livebar.stopped': 'หยุดการวัดแล้ว',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'ยังไม่มีข้อมูลที่บันทึกไว้เลย ประวัติจะถูกบันทึกในระหว่างการวัด — ลองวัดสักหนึ่งนาทีแล้วกลับมาที่นี่',
  'empty.recorderNoRange': 'ในช่วงเวลานี้ไม่มีการวัด',
  'empty.coverageTpl': 'การวัดครอบคลุม {done} จาก {total} ชั่วโมง',
  'empty.reportsNoData': 'รายงานรายวันจะเกิดขึ้นหลังจากมีการวัดครบหนึ่งวันเต็มวันแรก',
  'empty.compareOneSession': 'การเปรียบเทียบต้องใช้เซสชันที่จบแล้วสองเซสชัน ตอนนี้คุณมีเพียงเซสชันเดียว',
  'empty.exportNoData': 'ไม่มีอะไรให้ส่งออก เริ่มการวัดเพื่อให้ประวัติมีเนื้อหา',
  'empty.alertsOff': 'การแจ้งเตือนถูกปิดอยู่ เมื่อเปิดแล้วจะทำงานเฉพาะตอนที่แอปเปิดอยู่เท่านั้น',
  'empty.scheduleEmpty': 'ยังไม่ได้ตั้งเวลาใดไว้ ตารางเวลาทำงานเฉพาะตอนที่แอปเปิดอยู่เท่านั้น',
  'empty.historyEmpty': 'ประวัติว่างเปล่า',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'รายการโมดูล',

  'modules.01.title': 'เครื่องบันทึก',
  'modules.01.desc': 'ความเปลี่ยนแปลงของการวัดตามเวลา ตั้งแต่หนึ่งนาทีจนถึงสามสิบวัน',
  'modules.02.title': 'เกณฑ์',
  'modules.02.desc': 'ตั้งขอบเขตการเตือนและการแจ้งเหตุของคุณเองสำหรับค่าที่วัดแต่ละค่า',
  'modules.03.title': 'การสอบเทียบ',
  'modules.03.desc': 'การอ้างอิงกับแหล่งกำเนิดแสงที่รู้ค่า และสิ่งที่การสอบเทียบแก้ไม่ได้',
  'modules.04.title': 'รายงาน',
  'modules.04.desc': 'สรุปรายวันและรายสัปดาห์ในรูปแบบของงานพิมพ์',
  'modules.05.title': 'การส่งออก',
  'modules.05.desc': 'บันทึกค่าที่วัดได้ลงไฟล์ CSV หรือ JSON พร้อมคำอธิบายคอลัมน์',
  'modules.06.title': 'การเปรียบเทียบ',
  'modules.06.desc': 'สองเซสชันวางเคียงกัน พร้อมผลต่างที่บอกเป็นตัวเลข',
  'modules.07.title': 'ทดสอบหน้าจอ',
  'modules.07.desc': 'ภาพทดสอบสำหรับตรวจจอของคุณเอง ทีละขั้น',
  'modules.08.title': 'ตารางเวลา',
  'modules.08.desc': 'การวัดตามเวลาที่กำหนดไว้ล่วงหน้า',
  'modules.09.title': 'การแจ้งเตือน',
  'modules.09.desc': 'การแจ้งเตือนเมื่อค่าเกินเกณฑ์ — และตอนที่มันจะไม่ทำงาน',
  'modules.10.title': 'สนับสนุน',
  'modules.10.desc': 'แอปนี้ฟรีทั้งหมด ที่นี่คุณเลี้ยงกาแฟผู้เขียนได้',
  'modules.11.title': 'เอกสารประกอบ',
  'modules.11.desc': 'การวัดนี้คืออะไร และแน่นอนว่าไม่ใช่อะไร',
  'modules.12.title': 'การตั้งค่า',
  'modules.12.desc': 'ธีม ขนาดตัวอักษร การลดการเคลื่อนไหว การล้างประวัติ',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'ช่องวัดทั้งหมด',
  'channels.pick': 'แสดงบนหน้าปัดใหญ่',
  'channels.stale': 'ไม่มีข้อมูล',
  'channels.approx': 'ค่าโดยประมาณ',

  'help.unit': 'หน่วย',
  'help.range': 'ช่วงค่า',
  'help.thresholds': 'เกณฑ์',
  'help.warn': 'เกณฑ์ควรระวัง',
  'help.crit': 'เกณฑ์วิกฤต',
  'help.now': 'ตอนนี้',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „ค่าที่วัด” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'ค่าที่วัด',
  'col.unit': 'หน่วย',
  'col.range': 'ช่วงค่า',
  'col.direction': 'ทิศทาง',
  'col.time': 'เวลา',
  'col.date': 'วันที่',
  'col.zone': 'ระดับ',
  'col.avg': 'เฉลี่ย',
  'col.min': 'ต่ำสุด',
  'col.max': 'สูงสุด',
  'col.name': 'คอลัมน์',
  'col.meaning': 'เนื้อหา',
  /* Tabela wzmocnień w module 03: wiersze to czerwony, zielony i niebieski,
     więc chodzi o kanał BARWNY, a nie o kanał pomiarowy z pulpitu. */
  'col.channel': 'ช่องสี',
  'col.gain': 'อัตราขยาย',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'ช่วงเวลา',
  'recorder.range.60s': '60 วินาที',
  'recorder.range.15min': '15 นาที',
  'recorder.range.1h': '1 ชม.',
  'recorder.range.24h': '24 ชม.',
  'recorder.range.30d': '30 วัน',
  'recorder.gap': 'ไม่มีการวัด',
  'recorder.sessionTitle': 'สถิติของเซสชัน',
  'recorder.zonesCaption': 'การกระจายของระดับสำหรับสัดส่วนสีน้ำเงิน',
  'recorder.tableCaption': 'ค่าที่วัดได้จากช่วงเวลาที่เลือก',
  'recorder.crosshair': 'เส้นเล็งอ่านค่า',
  'recorder.prevAria': 'จุดก่อนหน้า',
  'recorder.nextAria': 'จุดถัดไป',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'รูปลักษณ์',
  'settings.themeLabel': 'ธีม',
  'settings.themeSystem': 'ตามระบบ',
  'settings.themeLight': 'สว่าง',
  'settings.themeDark': 'มืด',
  'settings.themeHint': 'ธีม “ตามระบบ” จะเปลี่ยนไปพร้อมกับการตั้งค่าของโทรศัพท์',
  'settings.textLabel': 'ขนาดตัวอักษร',
  /* Mnożnik jako LICZBA we wstawce — 1.15 po tajsku, 1,15 po polsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'ขยายทั้งหน้าจอ ไม่ใช่แค่ตัวอักษร — ปุ่มและแถวจะโตขึ้นไปพร้อมกับข้อความ',
  'settings.motionGroup': 'การเคลื่อนไหว',
  'settings.motionLabel': 'ลดการเคลื่อนไหว',
  'settings.motionHint': 'ปิดการเปลี่ยนภาพแบบค่อยเป็นค่อยไปทั้งหมด เข็มของมาตรวัดจะกระโดดวินาทีละครั้งแทนที่จะไหลไปอย่างต่อเนื่อง',
  'settings.dataTitle': 'ข้อมูล',
  'settings.clearLabel': 'ล้างประวัติ',
  'settings.clearHintTpl': 'ตอนนี้ในประวัติมีจุดที่บันทึกไว้ {count} จุด',
  'settings.clearHintEmpty': 'ประวัติว่างเปล่า',
  'settings.clearTitle': 'ล้างประวัติหรือไม่',
  'settings.clearConfirm': 'ล้างประวัติการวัดทั้งหมดหรือไม่ การกระทำนี้ย้อนกลับไม่ได้',
  'settings.clearKey': 'ล้าง',
  'settings.aboutTitle': 'เกี่ยวกับแอป',
  'settings.versionTpl': '{app} เวอร์ชัน {version}',
  'settings.offlineText': 'แอปทำงานได้โดยไม่ต้องมีเครือข่าย หลังจากเปิดครั้งแรก ไฟล์ทั้งหมดของแอปจะอยู่ในที่เก็บข้อมูลของเบราว์เซอร์ โหมดเครื่องบินจึงไม่เปลี่ยนอะไรเลย ไม่มีอะไรถูกส่งไปยังเซิร์ฟเวอร์ใด เพราะแอปไม่ได้ส่งคำขอผ่านเครือข่ายเลย',
  'settings.docsKey': 'เปิดเอกสารประกอบ',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'ยกเลิก',
  'common.save': 'บันทึก',
  'common.reset': 'คืนค่าเริ่มต้น',
  'common.yes': 'ใช่',
  'common.no': 'ไม่',
  'common.on': 'เปิด',
  'common.off': 'ปิด',
  'common.sep': ' · ',
  'common.stepsTitle': 'ทีละขั้น',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'ทำไมต้องตั้งเกณฑ์ของตัวเอง',
  'modules.02.intro': 'เกณฑ์เป็นตัวกำหนดว่าแอปจะบอกว่า “ควรระวัง” เมื่อใด และบอกว่า “วิกฤต” เมื่อใด ค่าเริ่มต้นเป็นดุลพินิจของกองบรรณาธิการเรา ไม่ใช่มาตรฐาน — ถ้าคุณวัดในสภาพแวดล้อมที่ต่างออกไป ก็เลื่อนเกณฑ์ให้เข้ากับตัวคุณได้ คำตัดสินและประโยคบนแผงควบคุมจะคำนวณจากเกณฑ์ใหม่ทันที',
  'modules.02.orderNormal': 'เกณฑ์ควรระวังต้องอยู่ต่ำกว่าเกณฑ์วิกฤต',
  'modules.02.orderInvert': 'ค่านี้ยิ่งสูงยิ่งดี เกณฑ์ควรระวังจึงอยู่สูงกว่าเกณฑ์วิกฤต',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'ตัวอย่างมาตรวัด: {name}',
  'modules.02.nowTpl': 'ตอนนี้ {value}',
  'modules.02.resetDone': 'คืนค่าเกณฑ์เริ่มต้นแล้ว',
  'modules.02.profilesTitle': 'โปรไฟล์',
  'modules.02.profilesHint': 'โปรไฟล์คือชุดเกณฑ์ของค่าที่วัดทั้งเจ็ดที่บันทึกไว้ การใช้โปรไฟล์จะเปลี่ยนเกณฑ์ทั้งหมดพร้อมกันในครั้งเดียว',
  'modules.02.profileSaveKey': 'บันทึกเกณฑ์ปัจจุบัน',
  'modules.02.profileNameLabel': 'ชื่อของโปรไฟล์ใหม่',
  'modules.02.profileNameHint': 'ชื่อนี้อยู่บนอุปกรณ์นี้เท่านั้น ยาวได้ไม่เกิน 40 ตัวอักษร',
  'modules.02.profileNameEmpty': 'กรุณาระบุชื่อโปรไฟล์',
  'modules.02.profileSavedTpl': 'บันทึกโปรไฟล์ “{name}” แล้ว',
  'modules.02.profileAppliedTpl': 'ใช้โปรไฟล์ “{name}” แล้ว',
  'modules.02.profileRemovedTpl': 'ลบโปรไฟล์ “{name}” แล้ว',
  'modules.02.profileFailed': 'ใช้โปรไฟล์นี้ไม่สำเร็จ',
  'modules.02.profileCustomTpl': 'โปรไฟล์ของคุณเอง บันทึกเมื่อ {date}',
  'modules.02.builtin.default.name': 'ค่าเริ่มต้น',
  'modules.02.builtin.default.desc': 'เกณฑ์จากรายการค่าที่วัด — จุดตั้งต้นของการวัดทุกครั้ง',
  'modules.02.builtin.evening.name': 'ตอนเย็น — นุ่มนวล',
  'modules.02.builtin.evening.desc': 'เตือนเร็วขึ้นเรื่องสีแสงโทนเย็นและผลต่อนาฬิกาชีวภาพ',
  'modules.02.builtin.work.name': 'ทำงานที่โต๊ะ',
  'modules.02.builtin.work.desc': 'ยอมให้แสงกลางวันสว่างและโทนเย็นได้ แต่คุมการกะพริบและความสม่ำเสมอ',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'ทำไมวิธีนี้จึงได้ผล',
  'modules.03.why': 'เซ็นเซอร์ของกล้องมีความเบี่ยงเบนคงที่ระหว่างช่องสี การวัดกระดาษขาวหนึ่งแผ่นแสดงให้เห็นว่าความเบี่ยงเบนนั้นมากเพียงใด และทำให้หักออกได้ นี่เป็นฟังก์ชันเดียวในแอปนี้ที่เพิ่มความแม่นยำได้จริง — และก็ยังไม่ได้ทำให้กล้องกลายเป็นสเปกโตรมิเตอร์',
  'modules.03.steps.1': 'วางกระดาษขาวหนึ่งแผ่นไว้ใต้แสงที่คุณกำลังวัด',
  'modules.03.steps.2': 'กด “เริ่มวัด” บนแผงควบคุม แล้วให้กระดาษเต็มเฟรม',
  'modules.03.steps.3': 'กลับมาที่นี่ กด “สอบเทียบ” แล้วอย่าขยับโทรศัพท์เป็นเวลาสามวินาที',
  'modules.03.runKey': 'สอบเทียบ (3 วินาที)',
  'modules.03.clearKey': 'ลบค่าการสอบเทียบ',
  'modules.03.busyTpl': 'กำลังวัดกระดาษ… เหลืออีก {sec} วินาที',
  'modules.03.statusNone': 'ยังไม่มีการสอบเทียบ การวัดทำงานได้ ให้ใช้ค่าเหล่านี้ในเชิงเปรียบเทียบ',
  'modules.03.statusOnTpl': 'สอบเทียบเมื่อ {date} เวลา {time}',
  'modules.03.gainsTitle': 'อัตราขยายของช่องสี',
  'modules.03.gainR': 'สีแดง',
  'modules.03.gainG': 'สีเขียว',
  'modules.03.gainB': 'สีน้ำเงิน',
  'modules.03.gainsNone': 'ยังไม่ได้ตั้ง',
  'modules.03.needRunning': 'เริ่มการวัดก่อน แล้วเล็งกล้องไปที่กระดาษขาว',
  'modules.03.tooFew': 'ตัวอย่างน้อยเกินไป ตรวจดูว่าการวัดกำลังทำงานอยู่จริง',
  'modules.03.tooDark': 'ภาพมืดเกินกว่าจะสอบเทียบได้ ให้แสงกับกระดาษมากขึ้นแล้วลองอีกครั้ง',
  'modules.03.refused': 'ความเบี่ยงเบนระหว่างช่องสีมากเกินกว่าจะถือเป็นการสอบเทียบ ใช้กระดาษขาวในแสงที่สม่ำเสมอ',
  'modules.03.done': 'สอบเทียบแล้ว ตอนนี้อุณหภูมิสีและผลต่อนาฬิกาชีวภาพจะแม่นยำขึ้น',
  'modules.03.cleared': 'ลบค่าการสอบเทียบแล้ว',
  'modules.03.limitsTitle': 'สิ่งที่การสอบเทียบแก้ไม่ได้',
  'modules.03.limits.1': 'การสอบเทียบปรับสามช่องสีของกล้องให้เสมอกัน และไม่ทำอะไรมากไปกว่านั้น มันไม่ได้ให้สเปกตรัมแก่กล้อง อุณหภูมิสีและผลต่อนาฬิกาชีวภาพจึงยังคงเป็นค่าประมาณที่คำนวณจากแม่สี sRGB',
  'modules.03.limits.2': 'มันไม่ได้เปลี่ยนความสว่างของฉากให้กลายเป็นค่าสัมบูรณ์ — ตัวเลขนั้นยังคงเป็นค่าเชิงเปรียบเทียบ และมันไม่ได้ปิดระบบปรับค่าแสงอัตโนมัติหรือสมดุลแสงขาวอัตโนมัติ ซึ่งเลื่อนค่าที่อ่านได้อยู่เบื้องหลัง',
  'modules.03.limits.3': 'มันไม่ถ่ายทอดไปยังแสงแบบอื่น: การสอบเทียบที่ทำใต้หลอดไฟดวงหนึ่งอธิบายได้เฉพาะหลอดดวงนั้น เมื่อเปลี่ยนแหล่งกำเนิดแสงให้ทำใหม่อีกครั้ง และมันไม่เปลี่ยนอะไรเลยในเรื่องที่ว่าการวัดนี้ไม่ใช่อะไร — มันยังคงไม่ใช่การตรวจ และยังคงไม่ใช่พื้นฐานสำหรับการวินิจฉัยโรค',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'ช่วงเวลาของรายงาน',
  'modules.04.rangeDay': 'วัน',
  'modules.04.rangeWeek': 'สัปดาห์',
  'modules.04.headTpl': 'ตั้งแต่ {from} ถึง {to} · จุดในประวัติ {count} จุด',
  'modules.04.tableTitle': 'สรุป',
  'modules.04.tableCaption': 'ค่าเฉลี่ย ค่าต่ำสุด และค่าสูงสุดในช่วงเวลาที่เลือก',
  'modules.04.panoramaTitle': 'ภาพรวม',
  'modules.04.panoramaAriaTpl': 'ภาพรวม: {name} {span}',
  'modules.04.panoramaSpanDay': 'หนึ่งวันล่าสุด แยกตามชั่วโมง',
  'modules.04.panoramaSpanWeek': 'หนึ่งสัปดาห์ล่าสุด แยกตามวัน',
  'modules.04.panoramaHint': 'ความสูงและสีของแท่งบอกสิ่งเดียวกัน: อยู่ในเกณฑ์ — แท่งเตี้ย ควรระวัง — แท่งปานกลาง วิกฤต — แท่งเต็ม ขีดที่ฐานหมายถึงชั่วโมงที่ไม่มีการวัด',
  'modules.04.coverageDayTpl': 'การวัดครอบคลุม {done} จาก {total} ชั่วโมง',
  'modules.04.coverageWeekTpl': 'การวัดครอบคลุม {done} จาก {total} วัน',
  'modules.04.zonesTitle': 'การกระจายของระดับ',
  'modules.04.zonesCaptionTpl': 'คำนวณสำหรับช่องวัดหลัก: {name}',
  'modules.04.worstTpl': 'ช่วงเวลาที่หนักที่สุด: {value}',
  'modules.04.worstNone': 'ไม่มีช่วงใดเด่นชัด',
  'modules.04.worstHourTpl': 'เวลา {hour}',
  'modules.04.adviceTitle': 'ทำอะไรกับเรื่องนี้ได้บ้าง',
  'modules.04.adviceMelanopicTpl': 'ผลต่อนาฬิกาชีวภาพโดยเฉลี่ยอยู่ที่ {value}× ในตอนเย็นควรลดลงต่ำกว่า 0.50 — วิธีที่ง่ายที่สุดคือเปลี่ยนเป็นหลอดไฟที่อุ่นกว่าหรือเปิดโหมดกลางคืน',
  'modules.04.adviceKelvinTpl': 'แสงเป็นโทนเย็น (เฉลี่ย {value} K) สำหรับการทำงานถือว่าไม่มีที่ติ แต่ในสองชั่วโมงก่อนเข้านอน ต่ำกว่า 3000 K จะนุ่มนวลกว่า',
  'modules.04.adviceFlickerTpl': 'เห็นการกะพริบได้อย่างชัดเจน (เฉลี่ย {value}%) ต้นเหตุมักเป็นสวิตช์หรี่ไฟราคาถูกหรือชุดขับไฟส่องหลังจอ',
  'modules.04.adviceUniformityTpl': 'แสงกระจายอย่างไม่สม่ำเสมอ ({value}%) การขยับโคมไฟหรือเปลี่ยนมุมมักได้ผลมากกว่าการเปลี่ยนหลอด',
  'modules.04.adviceWorstTpl': 'ค่าที่อยู่นอกเกณฑ์กระจุกตัวมากที่สุดในเวลา {hour}',
  'modules.04.adviceNone': 'ในช่วงเวลานี้ไม่มีอะไรโดดเกินเกณฑ์ที่คุณตั้งไว้',
  'modules.04.limitsTitle': 'นี่ไม่ใช่คำแนะนำทางสุขภาพ',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'ข้อสรุปเหล่านี้มาจากสิ่งที่กล้องของโทรศัพท์เครื่องนี้เห็นเท่านั้น แอปไม่ได้วัดสเปกตรัมและไม่ได้ให้การวินิจฉัยใด ๆ',
  'modules.04.printHint': 'หน้านี้ออกแบบมาให้เป็นเหมือนงานพิมพ์: ตารางและคำบรรยายอ่านได้เหมือนกันทั้งบนกระดาษ ในแว่นขยายของระบบ และในโปรแกรมอ่านหน้าจอ',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'ช่วงของข้อมูล',
  'modules.05.range1h': 'ชั่วโมง',
  'modules.05.range24h': 'วัน',
  'modules.05.range7d': '7 วัน',
  'modules.05.range30d': '30 วัน',
  'modules.05.csvKey': 'บันทึกไฟล์ CSV',
  'modules.05.jsonKey': 'บันทึกไฟล์ JSON',
  'modules.05.formatTitle': 'รูปแบบไฟล์',
  'modules.05.formatCsv': 'CSV: อัฒภาคคั่นระหว่างคอลัมน์ จุลภาคเป็นตัวคั่นทศนิยม เข้ารหัสแบบ UTF-8 พร้อมเครื่องหมาย BOM โปรแกรม Excel ที่ตั้งค่าภูมิภาคซึ่งใช้จุลภาคเป็นตัวคั่นทศนิยมจะเปิดไฟล์แบบนี้ได้โดยไม่ต้องตั้งค่าอะไรเลย',
  'modules.05.formatJson': 'JSON: ข้อมูลชุดเดียวกันอยู่ในฟิลด์ “points” ใช้จุดทศนิยมและเวลาประทับเป็นมิลลิวินาที — รูปแบบนี้กำหนดไว้อย่างนั้น',
  'modules.05.resolution': 'ประวัติบันทึกหนึ่งจุดทุก 5 วินาที และย้อนหลังได้ถึง 30 วัน ไฟล์ไม่ได้บรรจุความละเอียดเต็มที่ห้าตัวอย่างต่อวินาที — ส่วนนั้นเอนจินเก็บไว้เพียงหนึ่งนาทีเท่านั้น',
  'modules.05.offline': 'ไฟล์ถูกสร้างขึ้นในเครื่องและอยู่ในเครื่อง การส่งออกไม่เชื่อมต่อกับเครือข่ายใดเลย',
  'modules.05.columnsTitle': 'คำอธิบายคอลัมน์',
  'modules.05.columnsCaption': 'คอลัมน์ของไฟล์และความหมายของแต่ละคอลัมน์',
  'modules.05.descDate': 'วันที่ของจุดตามนาฬิกาของเครื่อง เขียนแบบวัน-เดือน-ปี',
  'modules.05.descTime': 'เวลาของจุด ละเอียดถึงระดับวินาที',
  'modules.05.descZone': 'ระดับของสัดส่วนสีน้ำเงินในขณะที่บันทึก เอนจินบันทึกระดับไว้สำหรับค่าที่วัดเพียงค่าเดียวนี้เท่านั้น — ค่าอื่นให้คำนวณเอาจากเกณฑ์',
  'modules.05.descMetricTpl': '{short} หน่วย: {unit} ช่วงค่า {min}–{max}',
  'modules.05.previewTitle': 'ตัวอย่าง',
  'modules.05.previewHint': 'ห้าแถวแรกของไฟล์ ตรงตามที่จะถูกบันทึกจริง',
  'modules.05.savedTpl': 'บันทึกไฟล์ {name} แล้ว — {rows} แถว',
  'modules.05.failed': 'เบราว์เซอร์นี้ไม่ยอมให้บันทึกไฟล์',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'แอปบันทึกทุกเซสชันการวัดที่จบแล้วไว้บนอุปกรณ์นี้ เลือกสองเซสชันเพื่อดูทั้งคู่บนแถบเวลาเดียวกันและอ่านผลต่างเป็นตัวเลข',
  'modules.06.noSessions': 'ยังไม่มีเซสชันที่จบแล้วเลย เริ่มการวัด หยุดการวัด แล้วกลับมาที่นี่',
  'modules.06.slotA': 'เซสชัน A',
  'modules.06.slotB': 'เซสชัน B',
  'modules.06.sessionTpl': '{date} {time} · {dur}',
  'modules.06.tapeTitle': 'แถบเวลา',
  'modules.06.tapeAriaTpl': 'ความเปลี่ยนแปลงของเซสชัน {slot} ค่าที่วัด {name}',
  'modules.06.tapeHint': 'ทั้งสองเซสชันถูกยืดให้กว้างเท่ากัน: หนึ่งแท่งคือสัดส่วนเวลาเดียวกันของช่วงที่วัด ไม่ใช่เวลานาฬิกาเดียวกัน ความสูงและสีบอกสิ่งเดียวกับบนแผงควบคุม',
  'modules.06.tapeChannelTpl': 'แถบเวลาแสดงช่องวัดหลัก: {name}',
  'modules.06.diffTitle': 'ผลต่าง',
  'modules.06.diffCaption': 'ค่าเฉลี่ยของทั้งสองเซสชันและผลต่างระหว่างกัน',
  'modules.06.clearKey': 'ลบเซสชันที่บันทึกไว้',
  'modules.06.cleared': 'ลบเซสชันที่บันทึกไว้แล้ว',
  'modules.06.savedTpl': 'บันทึกเซสชันแล้ว: {dur}',
  'modules.06.limitsTitle': 'สิ่งที่การเปรียบเทียบนี้ไม่ได้บอก',
  'modules.06.limits': 'คุณกำลังเปรียบเทียบการวัดสองครั้ง ไม่ใช่แหล่งกำเนิดแสงสองแหล่ง ถ้าระหว่างสองเซสชันมีการเปลี่ยนกรอบภาพ ระยะห่าง ช่วงเวลาของวัน หรือตำแหน่งของโทรศัพท์ ผลต่างก็บอกเรื่องเหล่านั้นด้วย การเปรียบเทียบที่ตรงไปตรงมาที่สุดคือฉากเดียวกันก่อนและหลังการเปลี่ยนแสง',
  'modules.06.keepTpl': 'ระบบจำเซสชันล่าสุดไว้ได้ไม่เกิน {count} เซสชัน',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'ภาพทดสอบจะแสดงเต็มหน้าจอของอุปกรณ์นี้ ใช้สำหรับดูหน้าจอด้วยตาเปล่า: สีขาวสม่ำเสมอหรือไม่ สีเทาเอนไปทางสีใดหรือเปล่า และไฟส่องหลังจอรั่วตามมุมหรือไม่',
  'modules.07.steps.1': 'ตั้งความสว่างหน้าจอไว้ที่ระดับที่คุณใช้ทำงานตามปกติ และปิดโหมดกลางคืนของระบบ',
  'modules.07.steps.2': 'เลือกภาพทดสอบจากรายการด้านล่าง ภาพจะเต็มทั้งหน้าจอ',
  'modules.07.steps.3': 'มองจากระยะประมาณหกสิบเซนติเมตร ให้ตั้งฉากกับหน้าจอ จากนั้นดูภาพเดียวกันจากมุมเฉียง',
  'modules.07.steps.4': 'ออกด้วยปุ่ม “ปิดภาพทดสอบ” หรือปุ่ม Escape แล้วไปยังภาพถัดไป',
  'modules.07.planesTitle': 'ภาพทดสอบ',
  'modules.07.exitKey': 'ปิดภาพทดสอบ',
  'modules.07.showAriaTpl': 'แสดงภาพทดสอบ: {name}',
  'modules.07.planeAriaTpl': 'ภาพทดสอบ: {name} ปุ่มปิดอยู่ที่ด้านล่างของหน้าจอ',
  'modules.07.plane.white.name': 'สีขาว',
  'modules.07.plane.white.hint': 'มองหารอยด่าง คราบสี และบริเวณที่สว่างขึ้นใกล้ขอบ สีขาวควรเป็นสีเดียวกันทั่วทั้งพื้นที่',
  'modules.07.plane.gray75.name': 'สีเทา 75%',
  'modules.07.plane.gray75.hint': 'สีเทาต้องเป็นสีเทา ถ้าอมเขียวหรืออมชมพู แปลว่าสมดุลแสงขาวของหน้าจอเพี้ยนไปแล้ว',
  'modules.07.plane.gray50.name': 'สีเทา 50%',
  'modules.07.plane.gray50.hint': 'เป็นภาพที่ดีที่สุดสำหรับดูคราบสี ให้เทียบตรงกลางกับตามมุม',
  'modules.07.plane.gray25.name': 'สีเทา 25%',
  'modules.07.plane.gray25.hint': 'สีเทาเข้มเผยให้เห็นการรั่วของไฟส่องหลังจอและแถบลายบนจอราคาถูก',
  'modules.07.plane.black.name': 'สีดำ',
  'modules.07.plane.black.hint': 'ในห้องมืด ภาพนี้จะเผยให้เห็นการรั่วของไฟส่องหลังจอทุกจุดและมุมที่สว่างขึ้นทุกมุม',
  'modules.07.plane.red.name': 'สีแดงล้วน',
  'modules.07.plane.red.hint': 'สีแดงเนื้อเดียวเผยให้เห็นซับพิกเซลที่ตายและความไม่สม่ำเสมอของจอ',
  'modules.07.plane.green.name': 'สีเขียวล้วน',
  'modules.07.plane.green.hint': 'สีเขียวให้ความสว่างมากที่สุด จึงหาพิกเซลที่เสียได้ง่ายที่สุดบนภาพนี้',
  'modules.07.plane.blue.name': 'สีน้ำเงินล้วน',
  'modules.07.plane.blue.hint': 'สีน้ำเงินแสดงคราบสกปรกและรอยเปื้อนบนผิวหน้าจอได้ดีกว่าสีขาว',
  'modules.07.plane.grid.name': 'ตาราง',
  'modules.07.plane.grid.hint': 'เส้นตามมุมต้องคมเท่ากับที่ตรงกลาง ความเบลอที่ขอบเป็นเรื่องของการปรับขนาดภาพ',
  'modules.07.warn': 'ภาพทดสอบบังทั้งหน้าจอ รวมถึงแผงควบคุมที่มีปุ่มวัดด้วย นี่เป็นที่เดียวในแอปที่เกิดเรื่องแบบนี้ ปุ่มออกจึงมีขนาดใหญ่และมองเห็นได้ตลอดเวลา ตราบใดที่ภาพทดสอบยังอยู่บนหน้าจอ การวัดจะทำงานต่อไปและหยุดไม่ได้ — ปิดภาพทดสอบเพื่อกลับไปยังปุ่มต่าง ๆ',
  'modules.07.cameraTitle': 'สิ่งที่ทำที่นี่ไม่ได้',
  'modules.07.camera': 'โทรศัพท์มองไม่เห็นหน้าจอของตัวเอง คุณจึงวัดภาพทดสอบเหล่านี้ด้วยอุปกรณ์เครื่องเดียวกันไม่ได้ ถ้าจะวัดจอคอมพิวเตอร์ ให้แสดงภาพทดสอบบนจอนั้น แล้ววัดด้วยโทรศัพท์ — เป็นอุปกรณ์สองเครื่องและสองบทบาทที่ต่างกัน',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'ตารางเวลาจะเตือนให้คุณวัดตามเวลาที่กำหนดไว้ มันไม่เปิดกล้องเอง: เมื่อถึงเวลาที่ตั้งไว้จะแสดงคำเตือน แล้วคุณเริ่มการวัดด้วยปุ่ม “เริ่มวัด” บนแผงควบคุม เหมือนกับที่ทำในครั้งแรกทุกอย่าง',
  'modules.08.onlyOpenTitle': 'เมื่อใดที่วิธีนี้จะไม่ทำงาน',
  'modules.08.onlyOpen': 'ตารางเวลาทำงานเฉพาะตอนที่แอปเปิดอยู่เท่านั้น แท็บเบราว์เซอร์ที่ปิดไปแล้วไม่นับเวลาและจะไม่เตือนอะไรทั้งนั้น เราไม่ขออนุญาตส่งการแจ้งเตือนของระบบ และไม่ส่งอะไรออกไปสู่เครือข่าย',
  'modules.08.enableLabel': 'เปิดการเตือน',
  'modules.08.timesTitle': 'เวลา',
  'modules.08.timeAriaTpl': 'เวลาที่ {n}: เวลาของการเตือน',
  'modules.08.addKey': 'เพิ่มเวลา',
  'modules.08.removeAriaTpl': 'ลบเวลา {time}',
  'modules.08.addedTpl': 'เพิ่มเวลา {time} แล้ว',
  'modules.08.removedTpl': 'ลบเวลา {time} แล้ว',
  'modules.08.badTime': 'ระบุเวลาในรูปแบบ 22:00',
  'modules.08.nextTpl': 'การเตือนครั้งถัดไป: {time}',
  'modules.08.nextNone': 'การเตือนถูกปิดอยู่',
  'modules.08.dueTpl': 'ถึงเวลาวัดตามที่กำหนดไว้: {time}',
  'modules.08.dueKey': 'แสดงแผงควบคุม',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'การแจ้งเตือนเฝ้าดูค่าที่วัดเพียงค่าเดียว และจะส่งเสียงก็ต่อเมื่อค่านั้นอยู่ในระดับที่เลือกไว้ต่อเนื่องกันครบตามเวลาที่ตั้งไว้ มันไม่เคยหยุดการวัดและไม่เคยบังปุ่ม',
  'modules.09.enableLabel': 'เปิดการแจ้งเตือน',
  'modules.09.metricLabel': 'ค่าที่เฝ้าดู',
  'modules.09.levelLabel': 'เริ่มจากระดับใด',
  'modules.09.levelWarning': 'ตั้งแต่ควรระวังขึ้นไป',
  'modules.09.levelCritical': 'เฉพาะวิกฤต',
  'modules.09.sustainLabel': 'หลังจากต่อเนื่องกันกี่วินาที',
  'modules.09.sustainHint': 'เวลาที่สั้นกว่าจะทำให้เกิดการแจ้งเตือนผิดพลาดมากขึ้นเมื่อคุณขยับโทรศัพท์ เราไม่ลงต่ำกว่าห้าวินาที',
  'modules.09.soundLabel': 'เสียงเตือนสั้น ๆ',
  'modules.09.soundHint': 'เสียงเกิดขึ้นในเครื่อง ไม่มีอะไรถูกดาวน์โหลดจากเครือข่าย',
  'modules.09.cooldownHint': 'แจ้งเตือนได้ไม่เกินหนึ่งครั้งต่อสองนาที การแจ้งเตือนที่ดังซ้ำทุกตัวอย่างคือการแจ้งเตือนที่จะถูกปิดไปตลอดกาล',
  'modules.09.whenNotTitle': 'เมื่อใดที่การแจ้งเตือนจะไม่ทำงาน',
  'modules.09.whenNot': 'การแจ้งเตือนอยู่ภายในแอป ไม่ใช่ในระบบ มันจะไม่ทำงานเมื่อแอปถูกปิดหรือถูกซ่อนไว้เบื้องหลัง เมื่อการวัดไม่ได้ทำงาน และเมื่อค่าที่เฝ้าดูวัดไม่ได้ในขณะนั้น เราไม่ขออนุญาตส่งการแจ้งเตือนของระบบ',
  'modules.09.firedTpl': '{name}: {zone} มาแล้ว {sec} วินาที — ตอนนี้ {value}',
  'modules.09.saved': 'บันทึกการตั้งค่าการแจ้งเตือนแล้ว',
  'modules.09.statusOnTpl': 'กำลังเฝ้าดู: {name} {level} หลังจาก {sec} วินาที',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'แอปนี้ฟรี',
  'support.freeText': 'ค่าที่วัดทั้งเจ็ดแสดงตัวเลขตั้งแต่เปิดใช้ครั้งแรก เครื่องบันทึก เกณฑ์ การสอบเทียบ รายงาน การส่งออก การเปรียบเทียบเซสชัน และประวัติทั้งสามสิบวัน ใช้ได้โดยไม่ต้องมีบัญชี ไม่มีค่าใช้จ่าย และไม่มีขีดจำกัด — เหมือนกันทุกอย่างในโหมดออฟไลน์ ที่นี่ไม่มีอะไรถูกกันไว้ให้ต้องจ่ายเงินในภายหลัง',
  'support.whyTitle': 'ทำไมผมถึงขอ',
  'support.whyText': 'ผมสร้างและดูแลมอนิเตอร์แสงด้วยตัวเองนอกเวลางาน การสนับสนุนไปเป็นเวลาที่ใช้แก้ข้อบกพร่อง ทดสอบบนโทรศัพท์รุ่นอื่น ๆ และสร้างเครื่องมือถัดไปในรายการโมดูล ถ้าไม่มีใครจ่ายอะไรเลย ก็จะไม่มีอะไรหยุดทำงาน',
  'support.nothingTitle': 'การบริจาคให้อะไรบ้าง',
  'support.nothingText': 'ไม่ให้อะไรเลย ไม่มีตัวเลข ไม่มีโมดูล และไม่มีการตั้งค่าใดที่ปลดล็อกหลังการบริจาค เพราะทุกอย่างปลดล็อกอยู่แล้วตั้งแต่ต้น เหลืออยู่เพียงว่าผมได้รู้ว่ามันเป็นประโยชน์กับใครสักคน',
  'support.keyTitle': 'ถ้าคุณอยากช่วย',
  'support.keyLabel': 'เลี้ยงกาแฟผมสักแก้ว',
  'support.keyAria': 'เลี้ยงกาแฟผมสักแก้ว — เปิดหน้าเว็บภายนอกในแท็บใหม่',
  'support.serviceText': 'โปรไฟล์รับบริจาคดำเนินการโดย Buy Me a Coffee และนั่นคือรูปแบบเดียวของการสนับสนุนในแอปนี้ แอปไม่ได้โหลดสคริปต์ วิดเจ็ต หรือรูปภาพใดจากที่นั่นเลย — ที่อยู่ตรงนี้เป็นเพียงลิงก์ธรรมดา และไม่มีอะไรมากไปกว่านั้น',
  'support.privacyText': 'การกดปุ่มนี้เปิดหน้าเว็บภายนอกในแท็บใหม่ และนั่นเป็นช่วงเวลาเดียวที่มีอะไรออกไปจากอุปกรณ์นี้ ผลการวัด ประวัติ และการตั้งค่ายังคงอยู่ที่เดิม — ในที่เก็บข้อมูลของเบราว์เซอร์นี้',
  'support.privacyPendingText': 'เมื่อมีที่อยู่เว็บแล้ว การกดปุ่มจะเปิดหน้าเว็บภายนอกในแท็บใหม่ และนั่นจะเป็นช่วงเวลาเดียวที่มีอะไรออกไปจากอุปกรณ์นี้ ผลการวัด ประวัติ และการตั้งค่ายังคงอยู่ที่เดิม — ในที่เก็บข้อมูลของเบราว์เซอร์นี้',
  'support.emptyTitle': 'ยังไม่ได้เชื่อมต่อโปรไฟล์',
  'support.emptyText': 'ยังไม่ได้กรอกที่อยู่ของโปรไฟล์รับบริจาค ที่นี่จึงไม่มีปุ่มที่จะพาไปสู่ที่ที่ไม่มีอยู่ ส่วนที่เหลือของแอปทำงานเหมือนเดิม — ไม่มีอะไรรอการบริจาคนี้อยู่',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'สิ่งที่แอปนี้ไม่ได้วัด',
  'docs.notList.1': 'ไม่ได้วัดสเปกตรัม กล้องมีช่องสีกว้าง ๆ สามช่อง มีการปรับค่าแสงอัตโนมัติและสมดุลแสงขาวอัตโนมัติ',
  'docs.notList.2': 'ไม่ได้วัดค่าสัมบูรณ์ ความสว่างของฉากเป็นตัวชี้วัดเชิงเปรียบเทียบ ไม่ใช่ผลของการวัดเชิงโฟโตเมตริก',
  'docs.notList.3': 'ไม่ได้วัดอุณหภูมิสีโดยตรง อุณหภูมิสีและผลต่อนาฬิกาชีวภาพเป็นค่าประมาณที่คำนวณจากแม่สี sRGB',
  'docs.notList.4': 'ไม่เห็นการกะพริบของไฟบ้าน การสุ่มตัวอย่างที่ 5 Hz เห็นการเต้นได้เฉพาะที่ต่ำกว่า 2.5 Hz — การกะพริบของไฟบ้านที่ 100 Hz อยู่นอกระยะเอื้อม และแอปจะไม่รายงานค่านั้นเป็นผลการวัดเลย',
  'docs.notList.5': 'ไม่ได้ให้การวินิจฉัยและไม่ได้ให้คำแนะนำทางสุขภาพ ไม่มีผลการวัดใดเป็นอย่างใดอย่างหนึ่งในสองอย่างนั้น',
  'docs.notList.6': 'ไม่ได้เปรียบเทียบแสงของคุณกับมาตรฐานทางการใด ๆ เกณฑ์เป็นการตั้งค่าที่คุณเปลี่ยนได้ในโมดูล 02',
  'docs.whatTitle': 'วัดอะไร และวัดอย่างไร',
  'docs.whatLead': 'กล้องโทรศัพท์มองไปที่พื้นผิวที่มีแสงตกกระทบ และแอปคำนวณค่าเฉลี่ยของช่อง R, G และ B จากส่วนกลางของเฟรมห้าครั้งต่อวินาที จากตัวเลขสามตัวนั้น แอปคำนวณต่อออกมาเป็นตัวชี้วัดเจ็ดค่า',
  'docs.whatCrop': 'ส่วนที่ใช้คือ 60% ของความกว้างและ 60% ของความสูงตรงกลางเฟรม — เป็นรูปสี่เหลี่ยมเดียวกันกับที่กรอบเล็งวาดไว้บนหน้าจอ “การเล็ง” พอดี สิ่งที่อยู่นอกกรอบนั้นไม่ถูกนำมาคำนวณเลย',
  'docs.whatRate': 'หนึ่งตัวอย่างทุก 200 ms หรือ 5 ครั้งต่อวินาที หนึ่งนาทีล่าสุดอยู่ในหน่วยความจำที่ความละเอียดเต็ม ส่วนที่เก่ากว่านั้นถูกบันทึกทุก 5 วินาที และย้อนหลังได้ถึงสามสิบวัน',
  'docs.metricsTitle': 'ค่าที่วัดทั้งเจ็ด',
  'docs.formulasTitle': 'สูตรคำนวณ',
  'docs.formula.share.formula': 'สัดส่วนสีน้ำเงิน = B / (R + G + B) × 100%',
  'docs.formula.share.text': 'คำนวณบนค่า sRGB โดยไม่ย้อนแกมมา — เป็นความตั้งใจ เพราะเป็นนิยามเดียวกับในแอปเวอร์ชันก่อน เกณฑ์ที่เคยตั้งไว้จึงยังหมายถึงสิ่งเดิม วิธีนี้แยกสีออกจากความสว่าง',
  'docs.formula.brightness.formula': 'ความสว่าง = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': 'ค่าเฉลี่ยของช่องสีคิดเป็นเปอร์เซ็นต์ของช่วงค่า ระบบปรับค่าแสงอัตโนมัติเลื่อนค่านี้อยู่เบื้องหลัง จึงเป็นตัวชี้วัดเชิงเปรียบเทียบ — ให้เทียบสองฉากเข้าด้วยกัน อย่าอ่านตัวเลขเพียงค่าเดียวเป็นผลการวัด',
  'docs.formula.kelvin.title': 'อุณหภูมิสี — ค่าประมาณของ McCamy',
  'docs.formula.kelvin.formula': 'n = (x − 0.3320) / (y − 0.1858)\nCCT = −449 n³ + 3525 n² − 6823.3 n + 5520.33',
  'docs.formula.kelvin.text': 'ก่อนอื่นเราย้อนแกมมาของ sRGB จากนั้นแปลงด้วยเมทริกซ์ไปเป็น CIE XYZ สำหรับจุดขาว D65 แล้วคำนวณค่าความเป็นสี x, y สูตรของ McCamy เชื่อถือได้ประมาณระหว่าง 2000 K ถึง 12500 K นอกช่วงนั้นพหุนามกำลังสามจะเพี้ยนไป ผลลัพธ์จึงถูกตัดและถูกทำเครื่องหมายว่าไม่น่าเชื่อถือ — เมื่อนั้นเส้นฐานของมาตรวัดจะกลายเป็นเส้นประ และจะมีประโยคว่า “อยู่นอกช่วงของวิธีวัด” ปรากฏขึ้น',
  'docs.formula.melanopic.title': 'ผลต่อนาฬิกาชีวภาพ — อัตราส่วนเมลาโนปิก',
  'docs.formula.melanopic.formula': 'mel = 0.0016 R + 0.3110 G + 0.8460 B\nY = 0.2127 R + 0.7152 G + 0.0722 B\nผลลัพธ์ = (mel / Y) × การปรับให้เป็น 1.00 สำหรับสีขาวที่เป็นกลาง',
  'docs.formula.melanopic.text': 'ทั้งสามช่องสีอยู่ในค่าเชิงเส้น ปริมาณที่แท้จริงคืออินทิกรัลของสเปกตรัมกับเส้นโค้งความไวของเมลาโนปซิน (ยอดอยู่ราว 490 nm) กล้องมีช่องสีกว้าง ๆ เพียงสามช่อง เราจึงถ่วงน้ำหนักแม่สี sRGB ด้วยความไวเมลาโนปิกที่ความยาวคลื่นโดยประมาณของแต่ละแม่สี (R 612 nm, G 549 nm, B 465 nm) ทิศทางของการเปลี่ยนแปลงเชื่อถือได้ แต่ค่าสัมบูรณ์เชื่อถือไม่ได้ — ด้วยเหตุนี้ตัวเลขนี้จึงมีเครื่องหมาย “≈” กำกับอยู่',
  'docs.formula.flicker.formula': 'การกะพริบ = (max − min) / (max + min) × 100%',
  'docs.formula.flicker.text': 'เป็นนิยามของ IES คำนวณจากหน้าต่างตัวอย่างของความสว่าง เราประมาณความถี่จากจำนวนครั้งที่สัญญาณตัดผ่านค่าเฉลี่ย การสุ่มตัวอย่างที่ 5 Hz เห็นการมอดูเลตได้เฉพาะที่ต่ำกว่า 2.5 Hz (ขีดจำกัดไนควิสต์) และเราถือว่าความถี่น่าเชื่อถือก็ต่อเมื่ออยู่ระหว่าง 0.2 ถึง 2 Hz ที่แอมพลิจูดตั้งแต่ 0.5% ขึ้นไป — ต่ำกว่าเกณฑ์นั้น การตัดผ่านค่าเฉลี่ยคือสัญญาณรบกวนของเซ็นเซอร์ ไม่ใช่การเต้นของแหล่งกำเนิดแสง',
  'docs.formula.uniformity.formula': 'ความสม่ำเสมอ = เซลล์ที่มืดที่สุด / เซลล์ที่สว่างที่สุด × 100%',
  'docs.formula.uniformity.text': 'เราแบ่งส่วนกลางเฟรมออกเป็นเก้าเซลล์ในตาราง 3×3 แล้วเทียบเซลล์ที่สุดขั้วทั้งสอง 100% คือแสงที่กระจายอย่างสม่ำเสมอสมบูรณ์แบบ ค่าต่ำบนหน้าจอหมายถึงไฟส่องหลังจอรั่วหรือมีแสงสะท้อน ส่วนบนโต๊ะทำงานหมายถึงวางโคมไฟไม่ดี นี่เป็นค่าเดียวที่ยิ่งสูงยิ่งดี เช่นเดียวกับความสบายตา',
  'docs.formula.comfort.formula': '100 คะแนน ลบด้วยคะแนนที่ถูกหัก:\nผลต่อนาฬิกาชีวภาพสูงกว่า 0.75 — หักได้ถึง 35 คะแนน\nสีแสงสูงกว่า 4000 K — หักได้ถึง 25 คะแนน\nการกะพริบสูงกว่า 5% — หักได้ถึง 25 คะแนน\nความสม่ำเสมอต่ำกว่า 60% — หักได้ถึง 15 คะแนน',
  'docs.formula.comfort.text': 'คำตัดสินเดียวแทนตัวเลขหกค่า ค่าที่วัดไม่ได้จะไม่ถูกหักคะแนนเลย — การไม่มีข้อมูลไม่เคยแสร้งเป็นผลที่ดี น้ำหนักของแต่ละส่วนเป็นดุลพินิจของกองบรรณาธิการเรา ไม่ใช่มาตรฐาน ด้วยเหตุนี้โมดูล 01 จึงแสดงการแยกย่อยตามองค์ประกอบ เพื่อให้ไม่เห็นด้วยกับคำตัดสินนี้ได้',
  'docs.rangesTitle': 'ช่วงค่าและเกณฑ์',
  'docs.rangesLead': 'เกณฑ์ด้านล่างคือเกณฑ์ที่ใช้อยู่ในขณะนี้ — ถ้าคุณเปลี่ยนมันในโมดูล 02 ตารางจะแสดงค่าของคุณ ไม่ใช่ค่าจากโรงงาน',
  'docs.dirNormal': 'ยิ่งต่ำยิ่งนุ่มนวล',
  'docs.dirInvert': 'ยิ่งสูงยิ่งดี',
  'docs.privacyTitle': 'ข้อมูลและความเป็นส่วนตัว',
  'docs.privacyText': 'ภาพจากกล้องไม่ถูกส่งและไม่ถูกบันทึกไว้ที่ใดเลย — จากแต่ละเฟรมเหลือไว้เพียงตัวเลขสามตัว ผลการวัด เกณฑ์ และการตั้งค่าอยู่ในที่เก็บข้อมูลของเบราว์เซอร์บนอุปกรณ์นี้ แอปไม่ได้ส่งคำขอผ่านเครือข่ายใดเลยและทำงานในโหมดออฟไลน์',
  'docs.mdrTitle': 'ข้อสงวนสิทธิ์',
  'docs.freeText': 'แอปนี้ฟรีทั้งหมดและจะเป็นเช่นนั้นต่อไป: ค่าที่วัดทั้งเจ็ด ประวัติ รายงาน การส่งออก และโหมดออฟไลน์ ใช้ได้โดยไม่ต้องมีบัญชี ไม่มีค่าใช้จ่าย และไม่มีขีดจำกัด ใครที่อยากขอบคุณจะพบโมดูล 10 “สนับสนุน”',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'แอปโหลดมาไม่ครบ',
  'boot.filesTpl': 'ไฟล์ที่โหลดไม่สำเร็จ: {list}',
  'boot.modulesTpl': 'โมดูลที่ไม่รายงานตัว: {list} — รายการเหล่านี้จะเปิดจากรายการโมดูลไม่ได้',
  'boot.modulesRangeTpl': 'โมดูล {from}–{to}',
  'boot.tail': 'โหลดหน้านี้ใหม่ ถ้ายังไม่ช่วย แสดงว่าไฟล์บนเซิร์ฟเวอร์ไม่ครบ',
  'boot.loss.bus': 'โมดูลจะมองไม่เห็นกันและการวัดจะไม่เริ่ม',
  'boot.loss.metrics': 'จะไม่มีค่าใดถูกคำนวณเลย',
  'boot.loss.scaleCore': 'เรขาคณิตของมาตรวัดและการจัดรูปแบบตัวเลขจะหายไป',
  'boot.loss.scaleText': 'ข้อความทั้งหมดในหน้าจอจะหายไป',
  'boot.loss.shell': 'จะเปิดโมดูลใดไม่ได้เลย',
  'boot.loss.engine': 'กล้องและการวัดจะไม่เริ่ม',
  'boot.loss.dash': 'แผงควบคุมจะว่างเปล่า'
});
