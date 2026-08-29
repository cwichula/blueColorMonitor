/* docs/v1/i18n/de.js — słownik WŁASNY wersji v1, niemiecki.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka. Kolejność jest treścią umowy: plik wersji dokłada się do tego samego
 * obiektu i może nadpisać dowolny klucz wspólny — nigdy odwrotnie.
 *
 * DLACZEGO TEN SŁOWNIK JEST SAMOWYSTARCZALNY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar w app.js, własne
 * dwie wielkości zamiast siedmiu i własne nazwy stref („Sicher” zamiast
 * wspólnego „Im Normbereich”). Dlatego wszystko, co v1 pokazuje, stoi TUTAJ —
 * także klucze, które przypadkiem brzmią tak samo jak wspólne. Zestaw kluczy
 * jest dokładnie taki sam jak w pl.js tego katalogu — pilnuje tego
 * docs/shared/i18n/keys.test.js.
 *
 * REJESTR: forma grzecznościowa „Sie”, jednolicie w całym pliku — tak jak
 * w docs/shared/i18n/de.js i w słownikach v2–v4. (v5 mówi „du”; to osobna
 * wersja z własnym rejestrem i tu się nią nie sugerujemy.) Cudzysłowy
 * niemieckie „ … “, przecinek dziesiętny, spacja nierozdzielająca przed
 * znakiem % zgodnie z DIN 5008.
 *
 * TERMINOLOGIA — wzięta co do słowa z warstwy wspólnej wszędzie tam, gdzie
 * v1 mówi o tym samym: Blauanteil (udział niebieskiego), Szenenhelligkeit
 * (jasność sceny), Farbtemperatur, Messwert (odczyt), Verlauf (historia),
 * Sitzung (sesja), Schwelle (próg), Messgröße (metryka). Nazw pozostałych
 * pięciu wielkości warstwy wspólnej tu NIE MA — v1 ich nie mierzy. Własne
 * pojęcie tej wersji to B-Kanal-Helligkeit (jasność kanału B) i Rundanzeige
 * (gałka); każde ma jeden odpowiednik i trzyma się go w całym pliku.
 *
 * ZASTRZEŻENIA MEDYCZNE i akapity o prywatności przetłumaczone DOKŁADNIE, bez
 * osłabiania i bez dodawania obietnic — to zdania o skutkach prawnych.
 *
 * MARKUP W WARTOŚCIACH. Część kluczy (rozdziały Dokumentacji) zawiera znaczniki
 * <b>, <i>, <code> i encje HTML. Wstawiane są przez data-i18n-html, czyli tylko
 * tam, gdzie autor tekstu świadomie tego chciał — nigdy do treści pochodzącej
 * od użytkownika. Bez tego wyróżnienia w akapitach Dokumentacji trzeba by było
 * rozbić każde zdanie na kilkanaście kluczy po jednym słowie.
 */
window.I18nData = window.I18nData || {};
window.I18nData['de'] = Object.assign(window.I18nData['de'] || {}, {

  /* ---- aplikacja ---- */

  'app.name': 'Monitor für schädliches Licht',
  'app.description': 'Misst mit der Kamera, wie stark die blaue Farbe auf einem Bildschirm ist, und zeigt sie in einem übersichtlichen Diagramm mit Zonen: sicher, mäßig, schädlich.',

  /* ---- wybór języka ---- */

  'language.label': 'Sprache',
  'language.help': 'Die Sprache der ganzen App. Alle Sprachen sind bereits auf diesem Gerät — nichts wird heruntergeladen und nichts wird irgendwohin gesendet.',
  'language.auto': 'Wie das Gerät',

  /* ---- nawigacja ---- */

  'nav.aria': 'Hauptmenü',
  'nav.tabsAria': 'Ansichten der App',
  'nav.announce': 'Bildschirm: {screen}',
  'nav.camera': 'Kamera',
  'nav.monitoring': 'Monitoring',
  'nav.support': 'Unterstützen',
  'nav.more': 'Mehr',
  'nav.docs': 'Dokumentation',
  'nav.about': 'Über die App und Kontakt',
  'nav.settings': 'Warnschwellen',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← Zurück',
  'action.back.aria': 'Zurück zum vorherigen Bildschirm',
  'action.openDocs': 'Zur Dokumentation',
  'action.exportCsv': 'CSV-Export',
  'action.delete': 'Löschen',
  'action.closeNotification': 'Benachrichtigung schließen',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref — „Sicher / Mäßig / Schädlich”, a nie
     wspólne „Im Normbereich / Vorsicht / Kritisch”. Wersja plakatowa
     (zone.badge.*) jest osobnym kluczem, a nie zapisem wielkimi literami przez
     CSS: tureckie „i” i greckie akcenty nie znoszą automatycznej zamiany —
     a po niemiecku „ß” przechodzi wielkimi literami w „SS” (MÄSSIG). */

  'zone.good': 'Sicher',
  'zone.warning': 'Mäßig',
  'zone.critical': 'Schädlich',
  'zone.none': 'Keine Daten',

  'zone.badge.good': 'SICHER',
  'zone.badge.warning': 'MÄSSIG',
  'zone.badge.critical': 'SCHÄDLICH',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'B-Kanal-Helligkeit',
  'metric.raw.unitLabel': '% der B-Kanal-Helligkeit',
  'metric.share.name': 'Blauanteil',
  'metric.share.longName': 'Blauanteil des Lichts',
  'metric.share.unitLabel': '% Blauanteil',
  'stat.overallBrightness': 'Gesamte Szenenhelligkeit',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': 'Kameravorschau',
  'camera.pressStart': 'Drücken Sie „Start“.',
  'camera.start': 'Start',
  'camera.stop': 'Stopp',
  'camera.switch': 'Kamera wechseln',
  'camera.error': 'Die Kamera konnte nicht gestartet werden. Prüfen Sie die Kameraberechtigung des Browsers und versuchen Sie es erneut. ({message})',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': 'Aktuelle Messwerte',
  'disclaimer.short': 'Ein Näherungswert. Dies ist kein Medizinprodukt.',
  'disclaimer.more': 'Mehr',

  /* ---- wykresy ---- */

  'chart.aria': 'Diagramme über die Zeit',
  'chart.title': 'Diagramme über die Zeit (letzte {seconds} s)',
  'chart.empty': 'Starten Sie die Kamera, um das Diagramm zu sehen',
  'chart.axis.past': '-{seconds}s',
  'chart.axis.now': 'jetzt',
  'chart.raw.aria': 'Diagramm der B-Kanal-Helligkeit über die Zeit, mit den markierten Zonen sicher, mäßig und schädlich',
  'chart.share.aria': 'Diagramm des Blauanteils des Lichts über die Zeit, mit den markierten Zonen sicher, mäßig und schädlich',

  /* ---- tabela odczytów ---- */

  'table.show': 'Als Tabelle anzeigen',
  'table.hide': 'Tabelle ausblenden',
  'table.caption': 'Letzte Messwerte (neueste oben)',
  'table.col.time': 'Zeit',
  'table.col.zone': 'Zone',

  /* ---- ustawienia progów ---- */

  'settings.title': 'Einstellungen der Zonenschwellen',
  'settings.boundary.critical': 'Grenze Gelb / Rot:',
  'settings.boundary.warning': 'Grenze Grün / Gelb:',

  /* ---- historia i raport (features.js) ---- */

  'history.title': 'Verlauf und Bericht',
  'history.rangeAria': 'Zeitraum des Verlaufs',
  'history.unavailable': 'Die Verlaufsdaten sind vorübergehend nicht verfügbar.',
  'history.empty': 'In diesem Zeitraum sind keine Messwerte gespeichert. Starten Sie eine Messung — der Verlauf entsteht von selbst.',
  'history.savedReadings': 'Gespeicherte Messwerte: {count}. Zeitanteil nach Zonen:',
  'history.zoneLine': '{zone}: {percent} % ({readings})',

  'range.1h': '1 Std.',
  'range.24h': '24 Std.',
  'range.7d': '7 Tage',
  'range.30d': '30 Tage',

  'report.dailyTitle': 'Tagesbericht',
  'report.empty': 'Der Bericht erscheint, sobald im gewählten Zeitraum Messwerte gespeichert sind.',
  'report.dailyCaption': 'Zeitanteil in den Zonen, Tag für Tag',
  'report.col.day': 'Tag',
  'report.col.week': 'Woche',
  'report.col.readings': 'Messwerte',
  'report.compare.day': 'Vergleich von Tag zu Tag: {day} — {percent} % der Zeit in der schädlichen Zone, {change}',
  'report.compare.dayPending': 'Der Vergleich von Tag zu Tag erscheint nach dem zweiten Messtag.',
  'report.compare.week': 'Vergleich von Woche zu Woche: {week} — {percent} % der Zeit in der schädlichen Zone, {change}',
  'report.compare.weekPending': 'Der Vergleich von Woche zu Woche erscheint nach der zweiten Messwoche.',
  'report.change.same': 'genauso viel wie {other}.',
  'report.change.more': '{points} mehr als {other}.',
  'report.change.less': '{points} weniger als {other}.',
  'report.peak': 'Die meisten Messwerte in der schädlichen Zone lagen zwischen {from} und {to}.',
  'report.peak.none': 'In diesem Zeitraum wurden keine Messwerte in der schädlichen Zone gespeichert.',
  'report.weeklyTitle': 'Wochenbericht',
  'report.weeklyEmpty': 'Der Wochenbericht erscheint, sobald im gewählten Zeitraum Messwerte gespeichert sind.',
  'report.weeklyCaption': 'Zeitanteil in den Zonen, Woche für Woche',
  'report.weekLabel': 'Woche {week} ({year})',
  'report.footnote': 'Die Zahlen sind der Anteil der gespeicherten Messwerte im gewählten Zeitraum, nicht die genaue Expositionszeit.',

  /* ---- profile progów ---- */

  'profiles.title': 'Schwellenprofile',
  'profiles.empty': 'Sie haben noch keine Profile gespeichert.',
  'profiles.itemActive': '{name} (aktiv)',
  'profiles.applyAria': 'Profil {name} anwenden',
  'profiles.deleteAria': 'Profil {name} löschen',
  'profiles.applied': 'Profil „{name}“ angewendet.',
  'profiles.deleted': 'Profil „{name}“ gelöscht.',
  'profiles.saved': 'Profil „{name}“ gespeichert.',
  'profiles.namePlaceholder': 'Profilname (zum Beispiel Abend)',
  'profiles.saveLabel': 'Aktuelle Schwellen als Profil speichern',
  'profiles.saveBtn': 'Profil speichern',
  'profiles.needName': 'Geben Sie einen Profilnamen ein.',
  'profiles.limit': {
    one: 'Sie können höchstens {n} Profil speichern. Löschen Sie eines, um ein neues anzulegen.',
    other: 'Sie können höchstens {n} Profile speichern. Löschen Sie eines, um ein neues anzulegen.'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku też — ale musi
     zostać bezpieczna dla systemu plików: bez ukośników i dwukropków, a po
     niemiecku dodatkowo bez umlautów. */

  'csv.header': 'zeit;helligkeit_B_proz;blauanteil_proz;szenenhelligkeit_proz;zone',
  'csv.filename': 'lichtmonitor-{stamp}.csv',
  'csv.empty': 'Es gibt keine Messwerte zum Exportieren. Starten Sie eine Messung und versuchen Sie es erneut.',
  'csv.done': '{readings} in eine CSV-Datei exportiert.',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut. Powód: po polsku wypada tam dopełniacz
     („od 5 minut”), po niemiecku celownik po „seit” („seit 5 Minuten”), a każdy
     z trzydziestu języków rozstrzyga to inaczej. */

  'alert.exposure': {
    one: 'Schwellenalarm: Der Messwert liegt seit {n} Minute in der schädlichen Zone. Denken Sie über eine Pause nach oder verringern Sie den Blauanteil auf dem Bildschirm.',
    other: 'Schwellenalarm: Der Messwert liegt seit {n} Minuten in der schädlichen Zone. Denken Sie über eine Pause nach oder verringern Sie den Blauanteil auf dem Bildschirm.'
  },

  'session.title': 'Zusammenfassung der letzten Sitzung',
  'session.line': 'Messdauer: {duration}. Gespeicherte Messwerte: {count}.',
  'session.zoneLine': '{zone}: {percent} % der Sitzung.',
  'session.endedAt': 'Die Zusammenfassung betrifft die Sitzung, die um {time} endete.',
  'session.toast': 'Sitzung beendet: {duration}, {readings}, {percent} % der Zeit in der schädlichen Zone.',

  'duration.seconds': '{n} s',
  'duration.minutesSeconds': '{minutes} min {seconds} s',

  /* ---- liczebniki ----
     Niemiecki ma dwie kategorie CLDR: one (dokładnie 1) i other — ta druga
     obejmuje też 0 i ułamki („1,5 Messwerte”). Formę wybiera
     Intl.PluralRules('de'), nie nasza reguła. */

  'count.readings': { one: '{n} Messwert', other: '{n} Messwerte' },
  'count.points': {
    one: '{n} Prozentpunkt',
    other: '{n} Prozentpunkte'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': 'Mehr',
  'more.section.settings': 'EINSTELLUNGEN',
  'more.section.help': 'HILFE',
  'more.thresholds.title': 'Warnschwellen',
  'more.thresholds.sub': 'Legen Sie die Grenzen der sicheren, der mäßigen und der schädlichen Zone fest.',
  'more.docs.title': 'Dokumentation',
  'more.docs.sub': 'Wie die Messung funktioniert, Einheiten, Normen und Zonen.',
  'more.about.title': 'Über die App und Kontakt',
  'more.about.sub': 'Version, Datenschutz und Kontakt.',
  'more.free': 'Die App ist vollständig kostenlos.',
  'more.supportLink': 'Sie können sie freiwillig unterstützen.',
  'more.version': 'Version {version} · Alle Funktionen ohne Konto und ohne Gebühr verfügbar',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': 'Über die App und Kontakt',
  'about.version': 'Version {version}',
  'about.what.title': 'Was diese App ist',
  'about.what.p1': '{app} misst mit der Kamera des Telefons, wie viel blaues Licht der Sensor aufzeichnet, und zeigt es auf zwei Rundanzeigen und in Diagrammen mit Zonen. Alle Funktionen — Messung, Verlauf, Berichte, Schwellenprofile, Schwellenalarm, CSV-Export und die Dokumentation — stehen jedem zur Verfügung, ohne Konto und ohne Gebühr.',
  'about.what.p2': 'Die App wird „wie besehen“ bereitgestellt, zur Information. Das Messergebnis hat orientierenden Charakter und ist keine Grundlage für gesundheitliche Entscheidungen.',
  'about.privacy.title': 'Datenschutz und Daten',
  'about.privacy.p1': 'Das Kamerabild wird ausschließlich auf Ihrem Gerät ausgewertet und wird nie an irgendeinen Server gesendet. Wir legen keine Konten an und sammeln Ihre Daten nicht. Die Schwelleneinstellungen, die Profile und der Messverlauf werden nur im Speicher dieses Geräts und dieses Browsers abgelegt.',
  'about.privacy.p2': 'Die App zeigt keine Werbung und spricht nicht mit dem Netz. Die einzige Ausnahme ist die Schaltfläche auf dem Bildschirm „Unterstützen“: Wenn Sie sie drücken, öffnet der Browser eine externe Seite in einem neuen Tab. Nichts geschieht, solange Sie das nicht selbst tun.',
  'about.contact.title': 'Kontakt',
  'about.contact.p1': 'Anmerkungen, Fehler und Vorschläge: [E-MAIL]. Wir antworten, sobald es geht — dieses Projekt wird nach Feierabend gepflegt.',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': 'Unterstützen',
  'support.free.title': 'Alles ist verfügbar',
  'support.free.text': 'Die ganze App ist kostenlos: Messung, Verlauf und Berichte, Schwellenprofile, der Alarm, CSV-Export und die Dokumentation. Alles funktioniert sofort, ohne Konto, ohne Grenzen und ohne Internet.',
  'support.why': '{app} entsteht nach Feierabend. Wenn er Ihnen nützt, können Sie mir einen Kaffee spendieren. Das hilft, die App am Laufen zu halten und weiterzuentwickeln — die Messung zu verbessern, die Dokumentation zu ergänzen und sie auf weiteren Telefonen zu prüfen.',
  'support.nothing': 'Eine Spende schaltet nichts frei. Es gibt keine bessere und keine schlechtere Version — nach einer Unterstützung funktioniert die App genau gleich. Der einzige Unterschied ist, dass der Autor weiß, dass es jemandem genützt hat.',
  'support.button': 'Einen Kaffee spendieren',
  'support.button.aria': 'Einen Kaffee spendieren — öffnet das Spendenprofil in einem neuen Tab',
  'support.pending': 'Das Spendenprofil ist noch nicht angebunden. Sobald es da ist, steht an dieser Stelle die Schaltfläche. Bis dahin ist nichts zu tun — die App ist ohnehin vollständig kostenlos.',
  'support.privacy': 'Die Schaltfläche öffnet eine externe Seite (Buy Me a Coffee) in einem neuen Browser-Tab. Das ist der einzige Moment, in dem irgendetwas dieses Gerät verlässt. Das Kamerabild und alle Ihre Messungen bleiben hier — sie werden nirgendwohin gesendet, weder vor dem Drücken noch danach.',
  'support.privacyPending': 'Sobald die Adresse vorliegt, öffnet ein Druck auf die Schaltfläche eine externe Seite (Buy Me a Coffee) in einem neuen Browser-Tab. Das wird der einzige Moment sein, in dem irgendetwas dieses Gerät verlässt. Das Kamerabild und alle Ihre Messungen bleiben hier — sie werden nirgendwohin gesendet.',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': 'Dokumentation',

  'disclaimer.title': 'Dies ist kein Medizinprodukt',
  'disclaimer.body.docs': 'Diese App ist kein Medizinprodukt. Sie dient nicht der Diagnose, der Behandlung oder der Verhütung irgendwelcher Krankheiten. Die Ergebnisse einer Messung mit der Telefonkamera haben orientierenden Charakter und ersetzen weder eine Untersuchung noch den Rat eines Arztes. Wenden Sie sich in Fragen der Augengesundheit an einen Arzt oder einen Optometristen. Die Zonenschwellen in dieser App bilden keine Sicherheitsnorm ab — Einzelheiten in Kapitel 3.',
  'disclaimer.body.about': 'Diese App ist kein Medizinprodukt. Sie dient nicht der Diagnose, der Behandlung oder der Verhütung irgendwelcher Krankheiten. Die Ergebnisse einer Messung mit der Telefonkamera haben orientierenden Charakter und ersetzen weder eine Untersuchung noch den Rat eines Arztes. Wenden Sie sich in Fragen der Augengesundheit an einen Arzt oder einen Optometristen. Die Zonenschwellen in dieser App bilden keine Sicherheitsnorm ab — Einzelheiten in der Dokumentation, Kapitel 3.',

  'doc.toc.aria': 'Inhaltsverzeichnis der Dokumentation',
  'doc.toc.title': 'Inhalt',

  'doc.ch1.title': 'Schnellstart',
  'doc.ch2.title': 'Wie die Messung funktioniert',
  'doc.ch3.title': 'Einheiten und Normen',
  'doc.ch4.title': 'Zonen und Schwellen',
  'doc.ch5.title': 'Unterschiede zwischen Geräten',

  'doc.ch1.heading': '1. Schnellstart',
  'doc.ch2.heading': '2. Wie die Messung funktioniert',
  'doc.ch3.heading': '3. Einheiten und Normen',
  'doc.ch4.heading': '4. Zonen und Schwellen',
  'doc.ch5.heading': '5. Unterschiede zwischen Geräten',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': 'Wie Sie genauer messen',
  'doc.ch1.tips.li1': 'Drücken Sie auf dem Bildschirm „Kamera“ (die erste Schaltfläche in der unteren Leiste) auf „Start“ und richten Sie die Rückkamera auf den Bildschirm oder auf die Lichtquelle, die Sie prüfen möchten.',
  'doc.ch1.tips.li2': 'Wechseln Sie auf den Bildschirm „Monitoring“ (die zweite Schaltfläche der unteren Leiste) — oben sehen Sie beide Rundanzeigen auf einmal, darunter (scrollen) die Diagramme der Veränderungen über die Zeit. Die Messung läuft im Hintergrund weiter, ganz gleich, welchen Bildschirm Sie gerade ansehen.',
  'doc.ch1.tips.li3': 'Halten Sie das Telefon in gleichbleibendem Abstand zum Bildschirm (zum Beispiel 15–20 cm), ohne die Umgebungsbeleuchtung während der Messung zu ändern.',
  'doc.ch1.tips.li4': 'Verwenden Sie die Rückkamera — ihre automatischen Korrekturen sind weniger aggressiv als die der Frontkamera.',
  'doc.ch1.tips.li5': 'Behandeln Sie die Ergebnisse als relative Indikatoren (%), nicht als absolute physikalische Einheiten — vergleichen Sie sie miteinander (zum Beispiel Nachtmodus ein und aus).',
  'doc.ch1.tips.li6': 'Passen Sie die Zonenschwellen in den Einstellungen an die Helligkeit Ihres eigenen Bildschirms an (Kapitel 4).',

  'doc.ch1.fonts.title': 'Große Schrift und Rundanzeigen — immer',
  'doc.ch1.fonts.p1': 'Die ganze App verwendet große, gut lesbare Schrift und Rundanzeigen in voller Größe, damit sehbehinderte Menschen (und alle anderen) die Daten ohne zusätzliche Einstellungen ablesen können. Auf dem Bildschirm „Monitoring“ passen beide Rundanzeigen zusammen auf einen Bildschirm, ohne Scrollen — die Diagramme der Veränderungen über die Zeit stehen direkt darunter, eine Scrollbewegung weiter.',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': 'Die Telefonkamera und das Spektrometer',
  'doc.ch2.spectro.p1.html': 'Eine echte Messung, „wie viel schädliches blaues Licht es gibt“, verlangt, das Licht in Wellenlängen zu zerlegen — das tut ein <b>Spektrometer</b>: Ein Prisma oder ein Beugungsgitter zerlegt das Licht in Dutzende bis Hunderte schmaler Bänder (zum Beispiel alle 1–5 nm) und misst die optische Leistung in jedem einzeln. Erst aus einer solchen vollständigen Spektralverteilung lassen sich Einheiten wie Lux, Lumen oder die mit der Blaulicht-Gefährdungsfunktion gewichtete Bestrahlungsstärke berechnen.',
  'doc.ch2.spectro.p2.html': '<b>Die Telefonkamera tut nichts davon.</b> Sie hat drei breite Filter (Bayer: R/G/B), von denen jeder Licht aus einem breiten, überlappenden Wellenlängenbereich sammelt — der „Blaukanal“ ist kein schmales Band um 435–440 nm (der Gipfel der Gefährdung für die Netzhaut), sondern grob 400–570 nm, vermischt mit Grün. Unterwegs kommen Demosaicing, automatische Belichtung, automatischer Weißabgleich und die sRGB-Gammakompression hinzu — keinen dieser Schritte lässt der Browser vollständig abschalten. Dadurch hängt der Pixelwert, den JavaScript sieht, nicht linear mit der tatsächlichen optischen Leistung zusammen, die auf den Sensor fällt. Das ist eine grundlegende Beschränkung der Hardware, kein Fehler dieser App.',

  'doc.ch2.raw.title': 'Diagramm 1 — B-Kanal-Helligkeit',
  'doc.ch2.raw.what.html': '<b>Was es zeigt:</b> die mittlere Helligkeit allein des blauen Kanals (B) aus dem abgetasteten Bildausschnitt, auf einer Skala von 0–255, umgerechnet in %.',
  'doc.ch2.raw.algo.html': '<b>Der Algorithmus:</b>',
  'doc.ch2.raw.step1': '5-mal pro Sekunde holen wir ein Bild von der Kamera.',
  'doc.ch2.raw.step2': 'Wir schneiden die mittleren 60 % des Bildes heraus (das vermeidet die Bildränder und den Lichtschein von den Seiten).',
  'doc.ch2.raw.step3': 'Wir skalieren den ausgeschnittenen Teil auf ein Raster von 32×32 Pixeln (genau genug und viel schneller als das Rechnen in voller Auflösung — wichtig auf schwächerer Hardware wie Xiaomi- oder Ulefone-Geräten der Einstiegsklasse).',
  'doc.ch2.raw.step4': 'Wir mitteln den B-Wert aller 1024 Pixel dieses Rasters.',
  'doc.ch2.raw.step5.html': '<code>Ergebnis = Mittelwert_B ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>Warum wir sie behalten haben:</b> Sie ist der einfachste, unmittelbarste Messwert dafür, „wie viel blaues Signal der Sensor überhaupt aufzeichnet“. Ihr Nachteil ist, dass sie Helligkeit mit Farbe vermischt — eine sehr helle, aber neutral weiße Szene ergibt ebenfalls einen hohen Wert, obwohl sie nicht besonders „blau“ ist. Deshalb zeigen wir daneben Diagramm 2.',

  'doc.ch2.share.title': 'Diagramm 2 — Blauanteil des Lichts',
  'doc.ch2.share.what.html': '<b>Was es zeigt:</b> welchen Prozentsatz des gesamten aufgezeichneten Lichts (R+G+B) der blaue Anteil ausmacht — also die Verschiebung der Farbe ins Kühle, unabhängig davon, wie hell die Szene ist.',
  'doc.ch2.share.algo.html': '<b>Der Algorithmus:</b> dieselben Schritte 1–4 wie oben, aber statt B allein rechnen wir:',
  'doc.ch2.share.formula.html': '<code>Ergebnis = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': 'Neutrales Weiß (R≈G≈B) ergibt etwa <b>33 %</b>. Wärmeres, röteres Licht ergibt weniger. Stark blaues Licht mehr, bis zur Grenze von ~100 % für nahezu rein blaues Licht.',
  'doc.ch2.share.why.html': '<b>Warum das das genauere Maß für „schädliches Blau“ ist:</b> Es ist dasselbe Prinzip, nach dem Filter wie der Nachtmodus oder Night Shift arbeiten — es zählt die <b>Farbe</b>, nicht die Helligkeit. Ein sehr heller, aber neutraler Bildschirm wird nicht fälschlich als schädlich markiert; ein gedimmter, aber stark blauer schon. Deshalb steuert diese Messgröße die Farbe der Zone in der Tabelle der Messwerte.',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': 'Warum nicht Lux oder Lumen',
  'doc.ch3.units.p1.html': '<b>Lumen (lm)</b> beschreibt den gesamten Lichtstrom, den eine Quelle abgibt — eine Eigenschaft der Quelle selbst, nicht dessen, was an einem bestimmten Punkt ankommt. <b>Lux (lx)</b> ist bereits die Beleuchtungsstärke an einem Punkt (lm/m²) — näher an dem, worum es geht, aber weiterhin eine <b>fotometrische</b> Einheit: Sie gewichtet das Spektrum mit der Hellempfindlichkeitskurve des menschlichen Auges (V(λ)), nicht mit der Kurve der Blaulichtgefährdung. Für eine echte Messung der Gefährdung braucht es eine dritte, engere Einheit: die spektral gewichtete Bestrahlungsstärke in <b>W/m²</b> (Norm IEC 62471, Empfindlichkeitsgipfel bei etwa 435–440 nm), und das verlangt ein Spektrometer — siehe den Abschnitt oben.',
  'doc.ch3.units.p2.html': 'Selbst wenn man es bei Lux belassen wollte: Ein Telefon ohne externen, kalibrierten Lichtsensor kann sie nicht verlässlich bestimmen. Der eingebaute Lichtsensor des Telefons (wo es einen gibt) misst ohnehin das Licht auf der <b>entgegengesetzten Seite</b> des Gehäuses als der, mit der Sie mit der Rückkamera auf den Bildschirm zielen — er würde also das Licht hinter Ihrem Rücken messen, nicht das vom Bildschirm. Statt eine Zahl in einer Einheit zu raten, die ohnehin unglaubwürdig wäre, zeigen wir deshalb einen ehrlich benannten <b>relativen Indikator (%)</b> — sinnvoll für Vergleiche auf demselben Telefon unter denselben Bedingungen (zum Beispiel Nachtmodus ein und aus), nicht als absoluten Wert.',

  'doc.ch3.norms.title': 'Gibt es weltweite Normen für Sicherheitsschwellen?',
  'doc.ch3.norms.p1.html': 'Kurz: <b>Es gibt keine Norm, die in Prozent eines Kamerakanals ausgedrückt wäre</b> — das ist überhaupt keine Einheit, in der irgendetwas geregelt würde. Echte Normen zu blauem Licht gibt es, aber sie messen andere Größen, in anderen Einheiten, und sie betreffen ein anderes Phänomen als das, was wir gewöhnlich meinen, wenn wir sagen: „Blaues Licht ermüdet die Augen.“',
  'doc.ch3.norms.p2.html': '<b>Akute fotochemische Schädigung der Netzhaut — IEC 62471 / ICNIRP.</b> Die einzige tatsächlich geregelte „Schädlichkeit von blauem Licht“ — eine Norm für Lampen und Beleuchtungssysteme, gestützt auf die Leitlinien der ICNIRP (International Commission on Non-Ionizing Radiation Protection). Sie ordnet Quellen den Risikogruppen RG0–RG3 zu, und zwar anhand der mit der Gefährdungsfunktion B(λ) gewichteten Strahldichte in <b>W·m⁻²·sr⁻¹</b>, mit einer Grenze für die Expositionszeit (<code>t_max = 100 / L_B</code> Sekunden). Bildschirme von Telefonen und Monitoren fallen — selbst bei maximaler Helligkeit — praktisch immer in <b>RG0 (freigestellt, ohne Einschränkungen)</b>. Diese Norm betrifft weit intensivere Quellen (Schweißlichtbögen, manche Projektoren, industrielle LEDs), nicht Bildschirme für Verbraucher.',
  'doc.ch3.norms.p3.html': '<b>Wirkung auf den zirkadianen Rhythmus und den Schlaf — CIE S 026.</b> Das ist das Phänomen, um das es gewöhnlich geht (ein Bildschirm am Abend „macht wach“) — aber das ist keine Schädigung des Auges, sondern eine Wirkung auf die innere Uhr über die Ganglienzellen der Netzhaut (ipRGC), die um 480 nm am empfindlichsten sind. Die Norm CIE S 026:2018 definiert die Einheit <b>melanopisches Lux (melanopic EDI)</b>. Dem „offiziellen“ wissenschaftlichen Konsens am nächsten kommt die Veröffentlichung von Brown und Mitautoren (<i>PLOS Biology</i>, 2022), die als groben Anhaltspunkt empfiehlt: am Abend &lt; 10 melanopische Lux, tagsüber &gt; 250. Das sind Empfehlungen von Schlafforschern, keine Rechtsvorschrift.',
  'doc.ch3.norms.p4.html': '<b>WHO.</b> Die Weltgesundheitsorganisation veröffentlicht keine eigenen, unabhängigen Grenzwerte für die Exposition gegenüber blauem Licht — für die Sicherheit optischer Strahlung verweist sie auf die ICNIRP (oben). Das einzige konkrete eigene Dokument der WHO zum Thema Bildschirme sind die <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i> (2019) — sie betreffen jedoch die <b>Zeit</b> vor dem Bildschirm, nicht die Farbe oder die Stärke des Lichts: kein Bildschirm unter 1 Jahr, höchstens 1 Stunde für 2- bis 4-Jährige. Für Erwachsene hat die WHO keine ebenso konkreten Zahlenvorgaben.',
  'doc.ch3.norms.p5.html': '<b>Warum das trotzdem nicht hilft, die App zu kalibrieren:</b> Beide Normen (IEC/ICNIRP und CIE) verlangen eine vollständige Spektralverteilung und eine kalibrierte Strahldichte in bekannter Messgeometrie — genau das, was ein Telefon über den Browser nicht liefern kann (siehe den Abschnitt „Die Telefonkamera und das Spektrometer“ oben). Es gibt keine Umrechnung „33 % Blauanteil = X melanopische Lux“, deshalb <b>bilden die Schwellen in dieser App keine Sicherheitsnorm ab</b> (WHO, IEC, ICNIRP oder CIE — für diesen Indikator gibt es schlicht keine). Die voreingestellten Werte der Schwelle für den Blauanteil sind dafür aus realen Farbtemperaturen des Lichts abgeleitet und aus der weithin wiederholten, praktischen Empfehlung warmen Lichts am Abend — eine solidere Grundlage als bloßes Runden, aber immer noch keine förmliche Norm (die vollständige Herleitung: Kapitel 4). Sie können sie in den Einstellungen jederzeit auf eigene Werte ändern.',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': 'Die Farbzonen und woher die Schwellen kommen',
  'doc.ch4.zones.p1.html': 'Beide Messgrößen haben eigene, unabhängig einstellbare Schwellen (Bildschirm „Monitoring“ → „Einstellungen der Zonenschwellen“, unten auf der Seite) — 33 %/66 % bei der einen bedeutet nicht dasselbe wie bei der anderen (siehe Kapitel 2 oben). Über die Farbe in der Legende unter den Diagrammen und in der Tabelle der Messwerte entscheidet der <b>Blauanteil</b>:',
  'doc.ch4.zones.li1.html': '<b>Grün — sicher:</b> warmes oder neutrales Licht, die Augen ruhen sich aus.',
  'doc.ch4.zones.li2.html': '<b>Gelb — mäßig:</b> eine merkliche Verschiebung ins Blaue, Pausen sind sinnvoll.',
  'doc.ch4.zones.li3.html': '<b>Rot — schädlich:</b> stark blaues Licht, ermüdet die Augen bei längerer Exposition deutlich (besonders am Abend).',
  'doc.ch4.zones.p2.html': '<b>Woher diese konkreten Zahlen kommen.</b> Die <b>B-Kanal-Helligkeit</b> hat keinen natürlichen Bezugspunkt — ein sinnvoller Schwellenwert hängt allein davon ab, wie hell die Szene ist, die Sie filmen (sie ist ein Maß der Helligkeit, nicht der Farbe). Die voreingestellten 33 %/66 % sind hier weiterhin ein willkürlicher Ausgangspunkt — passen Sie ihn durch Ausprobieren an die typische Helligkeit Ihres Bildschirms und Ihrer Umgebung an.',
  'doc.ch4.zones.p3.html': 'Der <b>Blauanteil</b> hat voreingestellte Schwellen, die aus realen Farbtemperaturen des Lichts abgeleitet sind (Physik, nicht Runden), nicht aus einer Sicherheitsnorm — eine solche Norm gibt es für diese Größe nicht (Kapitel 3). Die Bezugspunkte:',
  'doc.ch4.zones.li4.html': '<b>~4000K</b> („Warmweiß“, eine typische LED-Lampe) → etwa <b>26 %</b> Blauanteil. Licht, das wärmer ist als dieses (eine niedrigere Farbtemperatur), ist der Bereich, der von Werkzeugen wie f.lux oder Night Shift für den Abend breit empfohlen wird — daher die untere Schwelle.',
  'doc.ch4.zones.li5.html': '<b>6500K (D65)</b>, der werkseitige Standard-Weißpunkt der meisten Telefon- und Monitorbildschirme — etwa <b>33 %</b>. Ab diesem Wert aufwärts beginnt der Bereich, in dem üblicherweise Empfehlungen zur Begrenzung von blauem Licht ausgesprochen werden — daher die obere Schwelle.',
  'doc.ch4.zones.p4.html': '<b>Ein wichtiger Vorbehalt:</b> Wie „blau“ das Licht ist, hängt nicht von der Tageszeit ab, aber die Empfehlungen, blaues Licht zu begrenzen, betreffen eigentlich nur den <b>Abend und die Nacht</b> — tagsüber ist die Exposition gegenüber kühlem, blauem Licht (auch gegenüber Sonnenlicht) normal und für den zirkadianen Rhythmus sogar günstig. Eine rote Zone mitten am Tag beim Blick auf einen gewöhnlichen, unveränderten Bildschirm bedeutet keine wirkliche Gefährdung — dasselbe Licht am Abend ist dagegen eine Begrenzung wert.',
  'doc.ch4.zones.p5.html': 'Die Schwellen der beiden Messgrößen sind völlig unabhängig — eine Änderung der einen wirkt sich nicht auf die andere aus. Geänderte Schwellen werden <b>auf diesem Gerät und in diesem Browser gespeichert</b> und bleiben zwischen den Aufrufen der App erhalten (lokal, nichts wird irgendwohin gesendet) — die Schaltfläche „Start“ setzt sie nicht auf die Voreinstellungen zurück.',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': 'Warum die Vorschau auf verschiedenen Geräten anders aussieht',
  'doc.ch5.devices.p1.html': '<b>Der Browser gegenüber der nativen Kamera-App.</b> Wenn Sie die werkseitig auf dem Telefon installierte Kamera öffnen, legt der Hersteller (zum Beispiel Xiaomi) über die Live-Vorschau eigene, geschützte Algorithmen — HDR in Echtzeit, digitale Aufhellung bei schwachem Licht, Glättung. Eine Webseite bekommt über den Browser einen weit „roheren“ Strom von der Kamera (die Funktion <code>getUserMedia</code>), ohne jede dieser Verbesserungen — sie wird also grundsätzlich flacher und dunkler aussehen als die native Kamera, ganz gleich, um welches Telefon es geht.',
  'doc.ch5.devices.p2.html': '<b>Unterschiedliche Möglichkeiten, die Kamera zu steuern.</b> Wie viel Kontrolle über Belichtung und Weißabgleich der Browser vom System überhaupt bekommt, hängt vom konkreten Telefon, vom Kameratreiber und von der Version von Chrome oder WebView ab — manche Geräte (typischerweise Computer mit einer USB-Kamera) melden nur die volle Automatik, andere (ein Teil der Android-Telefone) melden zusätzliche, weiter gehende Modi. Eine frühere Version dieser App versuchte dort, wo das Telefon es zuließ, auf manuelle Belichtung umzuschalten, ohne einen konkreten Wert zu setzen — was auf einem Teil der Telefone das Bild auf einer zufälligen, dunklen Belichtung aus dem Moment des Kamerastarts einfror. Das war ein Fehler im Code (inzwischen behoben), kein Unterschied zwischen den Geräten — aber er zeigt gut, wie leicht sich das Verhalten zwischen Geräten unterscheiden kann, wenn schon dieselbe Zeile Code nur auf einem Teil von ihnen greift.',
  'doc.ch5.devices.p3.html': '<b>Unterschiedliche Sensoren und Bildverarbeitung (ISP).</b> Selbst bei identischem Code und derselben Szene haben verschiedene Telefonmodelle Sensoren unterschiedlicher Qualität und eine unterschiedlich abgestimmte Automatik des Herstellers — das eine trifft die Belichtung bei schwachem Licht schneller und genauer als das andere. Zusammen damit, dass die Indikatoren in dieser App <b>relativ</b> sind (siehe Kapitel 3), heißt das: Vergleichen Sie die Ergebnisse (und das Aussehen der Vorschau) sinnvollerweise auf demselben Telefon über die Zeit, nicht zwischen verschiedenen Modellen oder Geräten.'
});
