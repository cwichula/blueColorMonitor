/* Monitor Światła v5 — słownik niemiecki.
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr). NIE JEST
 * KALKĄ żadnego z nich: polskie i angielskie zdania przełożono na naturalną
 * niemczyznę. Zachowane zostało to, co niesie znaczenie: liczby, progi,
 * jednostki, nazwy wstawek i — co do treści — zastrzeżenia medyczne oraz
 * zdania o prywatności. Tych ostatnich nie wolno osłabiać ani wzmacniać:
 * „nie zastępuje rozmowy z lekarzem” i „obraz nie opuszcza urządzenia”
 * znaczą po niemiecku dokładnie tyle samo, ani mniej, ani więcej.
 *
 * REJESTR: bezpośrednie „du” (małą literą, zgodnie z zaleceniem Dudena dla
 * zwykłego zwracania się do czytelnika) — konsekwentnie w całym pliku, także
 * w komunikatach błędów. Aplikacja mówi ciepło i wprost, jak niemieckie
 * aplikacje użytkowe; „Sie” brzmiałoby tu jak pismo urzędowe.
 * Cudzysłowy niemieckie: „ … “. Przecinek dziesiętny, jak po polsku (1,00).
 * Przed znakiem % stoi spacja nierozdzielająca (DIN 5008).
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych i pomocy):
 *   Blauanteil, Szenenhelligkeit, Farbtemperatur, Zirkadiane Wirkung
 *   (w opisie: melanopischer Faktor), Flimmern, Gleichmäßigkeit, Sehkomfort.
 * STREFY: sicher / mäßig / schädlich — mówią o świetle, a nie o stanie
 * aplikacji, i wchodzą w zdanie „Zone: {zone}” tak samo jak polskie
 * „bezpiecznie / umiarkowanie / szkodliwie”.
 * POZOSTAŁE STAŁE ODPOWIEDNIKI: Verlauf (historia), Sitzung (sesja),
 * Probe (próbka), Messung (pomiar), Größe (wielkość), Schwelle (próg).
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Text mit einer {name}-Einsetzung'   — napis zwykły,
 *   'klucz.kropkowany': { one, other }                       — forma zależna
 *                                                              od liczby.
 * Niemiecki ma w CLDR dwie formy: `one` i `other`. Nazwy wstawek są identyczne
 * jak w pl.js — pilnuje tego keys.test.js. Kolejność wstawek w zdaniu wolno
 * zmieniać (i tak robimy w datach), nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Lichtmonitor',
  'app.description': 'Lichtmonitor — die Kamera misst sieben Größen des Lichts um dich herum. Alles wird auf diesem Gerät berechnet, nichts geht ins Netz.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Lichtmonitor',
  'app.skipToContent': 'Zum Inhalt springen',
  'app.nav.aria': 'Hauptnavigation',
  'app.noscript.title': 'Diese App braucht JavaScript',
  'app.noscript.text': 'Die gesamte Messung läuft in diesem Browser-Tab: JavaScript liest die Bilder der Kamera aus und berechnet daraus die sieben Lichtgrößen. Ohne JavaScript gibt es nichts, womit sich messen ließe. Aktiviere JavaScript für diese Seite und öffne sie erneut — es wird weiterhin nichts ins Netz gesendet.',

  'nav.measure': 'Messen',
  'nav.history': 'Verlauf',
  'nav.tools': 'Werkzeuge',
  'nav.support': 'Unterstützen',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Messung läuft',
  'shell.live.aria': 'Messung läuft. {metric}: {value}. Zurück zum Messbildschirm.',
  'shell.live.metricFallback': 'Leitgröße',
  'shell.action.fallback': 'Bildschirmaktion',

  'shell.loadFail.title': 'Der Bildschirm „{screen}“ ließ sich nicht laden',
  'shell.loadFail.text': 'Wahrscheinlich fehlen Teile der Dateien im Speicher des Geräts. Stelle eine Netzverbindung her und lade die Seite neu.',
  'shell.fatal.title': 'Etwas ist schiefgelaufen',
  'shell.fatal.text': 'Die App konnte den Bildschirm nicht aufbauen. Ein Neuladen der Seite genügt meist — deine gespeicherten Messungen und Einstellungen bleiben, wo sie sind.',
  'shell.fatal.reload': 'Seite neu laden',
  'shell.boot.failTitle': 'Die App konnte nicht starten',
  'shell.boot.failText': 'Die App-Hülle ist nicht gestartet. Lade die Seite neu — deine gespeicherten Messungen und Einstellungen bleiben, wo sie sind.',
  'shell.background.error': 'Im Hintergrund ist etwas kaputtgegangen',
  'shell.background.action': 'Neu laden',
  'shell.update.title': 'Eine neue Version ist verfügbar',
  'shell.update.action': 'Neu laden',

  'onboarding.title': 'Bevor du loslegst',
  'onboarding.lead': 'Der Lichtmonitor schaut mit der Kamera auf das Licht um dich herum und berechnet daraus sieben Größen — vom Blauanteil bis zum Sehkomfort.',
  'onboarding.privacy': 'Das Bild verlässt dieses Gerät nicht: Es gibt keinen Server, kein Konto und nichts zum Hochladen. Alle sieben Größen funktionieren sofort, ohne Anmeldung und ohne Gebühr.',
  'onboarding.honesty': 'Das ist eine Orientierung, kein Messgerät und keine ärztliche Untersuchung. Was sich nicht messen lässt, zeigen wir nicht — statt einer Zahl siehst du einen Strich.',
  'onboarding.start': 'Los geht’s',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Ausführen',
  'overlay.toast.close': 'Meldung schließen',
  'overlay.sheet.label': 'Dialog',
  'overlay.sheet.close': 'Schließen',
  'overlay.dialog.confirm': 'Bestätigen',
  'overlay.dialog.cancel': 'Abbrechen',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'Abbrechen',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'Messen',

  'measure.intro.aria': 'Messung starten',
  'measure.intro.headline': 'Sieh, was dich beleuchtet',
  'measure.intro.lead': 'Die Kamera zeigt, wie viel Blau in dem Licht steckt, das gerade auf dich fällt — und ob das für diese Tageszeit zu viel ist.',
  'measure.intro.start': 'Messung starten',
  'measure.intro.hint': 'Der Browser fragt nach der Erlaubnis für die Kamera. Sobald du sie erteilst, beginnt die Messung.',
  'measure.intro.privacy': 'Das Kamerabild wird auf diesem Gerät verarbeitet und verlässt es nie. Wir senden, speichern und teilen kein einziges Bild.',
  'measure.intro.honesty': 'Das ist kein Medizinprodukt und keine Untersuchung. Die App zeigt eine Näherung des Lichts um dich herum, urteilt nicht über deine Gesundheit und ersetzt kein Gespräch mit einer Ärztin oder einem Arzt.',

  'measure.live.aria': 'Messung läuft',
  'measure.badge.starting': 'Startet',
  'measure.badge.paused': 'Pausiert',
  'measure.badge.running': 'Messung läuft',
  'measure.stale': 'Warte auf das Bild — die Vorschau friert ein, solange die App im Hintergrund ist.',
  'measure.crop': 'Wir messen die Bildmitte — die markierten {percent}\u00A0% der Bildbreite und Bildhöhe.',
  'measure.facing.front': 'Frontkamera',
  'measure.facing.back': 'Rückkamera',

  'measure.boot.title': 'Kamera startet…',
  'measure.boot.text': 'Wenn der Browser nach der Erlaubnis fragt, erteile sie — ohne Bild gibt es nichts zu messen. Die Erlaubnis gilt nur für diese Seite, und du kannst sie später widerrufen.',
  'measure.boot.cancel': 'Abbrechen',

  'measure.hold': 'Messwerte eingefroren. Die Kamera läuft weiter, aber nichts davon gelangt in den Verlauf oder in die Mittelwerte.',
  'measure.gridHint': 'Wähle eine Kachel, um diese Größe auf die große Anzeige zu holen.',

  'measure.stop': 'Stopp',
  'measure.pause': 'Pause',
  'measure.resume': 'Weiter',
  'measure.flip.aria': 'Kamera wechseln',
  'measure.flip.toBack': 'Zur Rückkamera wechseln',
  'measure.flip.toFront': 'Zur Frontkamera wechseln',

  'measure.fail.aria': 'Kamerafehler',
  'measure.fail.headline': 'Die Kamera ist nicht gestartet',
  'measure.fail.retry': 'Erneut versuchen',
  'measure.fail.back': 'Zurück',
  'measure.fail.savedSession': 'Die Sitzung vor dem Abbruch ({duration}) wurde im Verlauf gespeichert.',
  'measure.error.fallback': 'Die Kamera ließ sich nicht starten.',

  'measure.summary.aria': 'Sitzungsübersicht',
  'measure.summary.title': 'Sitzungsübersicht',
  'measure.summary.paused': '{duration} pausiert',
  'measure.summary.nothingMeasured': 'Keine einzige Größe hat einen Messwert gesammelt — die Kamera hat während der ganzen Sitzung kein Licht gesehen.',
  'measure.summary.note': 'Die Mittelwerte zählen nur Proben außerhalb der Pause. Größen, die nie gemessen wurden, bleiben außen vor und werden nicht als Null gezählt.',
  'measure.summary.nearThreshold': 'Am dichtesten an der Schwelle',
  'measure.summary.worstPoint': 'Schwächster Punkt',
  'measure.summary.averageZone': 'im Schnitt {zone}',
  'measure.summary.tooShort': 'Die Sitzung dauerte {duration} — zu kurz, um von allein in den Verlauf zu kommen. Du kannst sie von Hand speichern.',
  'measure.summary.again': 'Erneut messen',
  'measure.summary.save': 'Im Verlauf speichern',
  'measure.summary.saved': 'Im Verlauf gespeichert',
  'measure.summary.savedToast': 'Sitzung im Verlauf gespeichert.',
  'measure.summary.close': 'Schließen',

  'measure.method.title': 'Wie wir das messen',
  'measure.method.p1': 'Die App tastet das Kamerabild zehnmal pro Sekunde ab und berechnet die Größen aus den mittleren {percent}\u00A0% des Bildes — das Fadenkreuz in der Vorschau markiert genau diesen Bereich.',
  'measure.method.p2': 'Eine Handykamera hat drei breite Kanäle sowie eine eigene, automatische Regelung von Belichtung und Weißabgleich. Sie sieht die Verhältnisse des Lichts, nicht sein Spektrum.',
  'measure.method.p3': 'Blauanteil, Helligkeit, Flimmern und Gleichmäßigkeit sind das, was die Kamera wirklich misst. Farbtemperatur und zirkadiane Wirkung sind offen erklärte Näherungen, berechnet aus den sRGB-Grundfarben.',
  'measure.method.p4': 'Flimmern ist nur unterhalb von vier Hertz sichtbar. Netzflimmern mit 100 Hz liegt weit außerhalb der Reichweite dieser Abtastrate und wird nie als Messwert ausgegeben.',
  'measure.method.p5': 'Keine dieser Zahlen ist eine fotometrische Messung oder ein medizinisches Ergebnis. Das Kamerabild verlässt das Gerät nicht.',
  'measure.method.ok': 'Verstanden',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'Kamerastart abgebrochen.',
  'measure.announce.stoppedNoSamples': 'Messung gestoppt. Es wurden keine Proben gesammelt.',
  'measure.announce.stopped': 'Messung gestoppt. Die Sitzungsübersicht ist fertig.',
  'measure.announce.interrupted': 'Messung unterbrochen. Die Sitzungsübersicht ist fertig.',
  'measure.announce.paused': 'Messung pausiert. Messwerte eingefroren.',
  'measure.announce.resumed': 'Messung fortgesetzt.',
  'measure.announce.switchedFront': 'Zur Frontkamera gewechselt. Eine neue Sitzung beginnt.',
  'measure.announce.switchedBack': 'Zur Rückkamera gewechselt. Eine neue Sitzung beginnt.',
  'measure.announce.lead': 'Leitgröße: {metric}.',
  'measure.announce.cameraError': 'Kamerafehler. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'Das Licht blieb die ganze Sitzung über im sicheren Bereich — lass die Lampe, wie sie ist, und prüfe erneut nach Einbruch der Dunkelheit, wenn eine andere Quelle arbeitet.',
  'measure.advice.share.evening': 'Der Blauanteil lag im Schnitt bei {value} — schalte deine Bildschirme in den Nachtmodus und mach das Deckenlicht aus, eine warme Lampe auf Schreibtischhöhe genügt.',
  'measure.advice.share.day': 'Der Blauanteil lag im Schnitt bei {value} — tagsüber ist das in Ordnung, stell deinen Bildschirm aber so ein, dass er zwei Stunden vor dem Schlafengehen automatisch in den warmen Modus wechselt.',
  'measure.advice.brightness': 'Das Bild war überbelichtet (im Schnitt {value}) — geh von der Lichtquelle weg oder dimm den Bildschirm, den du misst, denn bei dieser Belichtung verlieren auch die übrigen Größen an Genauigkeit.',
  'measure.advice.kelvin.evening': 'Die Farbtemperatur hielt sich im Schnitt bei {value} — geh nach Einbruch der Dunkelheit unter 3000 K: Stell die Lampe auf den warmen Modus oder dreh eine Birne mit 2700 K ein.',
  'measure.advice.kelvin.day': 'Die Farbtemperatur hielt sich im Schnitt bei {value} — für den Tag ein gutes, wach machendes Weiß, stell dieselbe Lampe abends aber auf 2700 K.',
  'measure.advice.melanopic.evening': 'Die zirkadiane Wirkung lag im Schnitt bei {value} — geh in den zwei Stunden vor dem Schlafengehen unter 0,50 ×, indem du das Hauptlicht dimmst und von Schreibtischhöhe statt von der Decke leuchtest.',
  'measure.advice.melanopic.day': 'Die zirkadiane Wirkung lag im Schnitt bei {value} — zu dieser Stunde hilft diese Dosis, tausch die Quelle abends aber gegen eine schwächere und wärmere.',
  'measure.advice.flicker': 'Das Flimmern erreichte im Schnitt {value} — dahinter steckt meist ein Dimmer oder eine tief heruntergeregelte Hintergrundbeleuchtung: Stell die Bildschirmhelligkeit über 40 % oder ersetze den Dimmer durch einen ohne PWM.',
  'measure.advice.uniformity': 'Das Licht fiel ungleichmäßig (im Schnitt {value}) — stell die Lampe seitlich zur Arbeitsfläche und ergänze eine zweite, schwächere Quelle von der Gegenseite, statt einen einzigen starken Punkt zu setzen.',
  'measure.advice.comfort': 'Der Sehkomfort kam im Schnitt auf {value} — fang mit einer einzigen Änderung an: Halbiere die Helligkeit der Hauptquelle und kümmere dich erst danach um die Lichtfarbe.',
  'measure.advice.default': 'Ändere eine Sache an deiner Beleuchtung und miss sie erneut — der Vergleich zweier Sitzungen sagt mehr als ein einzelner Messwert.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'Verlauf',
  'history.action.export': 'Verlauf exportieren',

  'history.metricGroup.aria': 'Auswahl der Messgröße',
  'history.announce.metric': 'Größe: {metric}',
  'history.rangeGroup.aria': 'Zeitraum',
  'history.range.aria': 'Letzte {range}',

  'history.stats.title': 'Zeitraumstatistik',
  'history.stats.head': '{metric}\u00A0—\u00A0letzte {range}',
  'history.stats.note': 'Berechnet aus dem, was das Diagramm zeigt. Zeit ohne Messung wird nicht mitgezählt — wir setzen an ihre Stelle keine Null.',
  'history.stat.min': 'Minimum',
  'history.stat.avg': 'Durchschnitt',
  'history.stat.max': 'Maximum',
  'history.trend.up': 'steigt in diesem Zeitraum',
  'history.trend.flat': 'keine deutliche Änderung',
  'history.trend.down': 'fällt in diesem Zeitraum',
  'history.trend.none': 'nichts zum Vergleichen',

  'history.sessions.title': 'Messsitzungen',
  'history.sessions.count': '{sessions}, neueste zuerst',
  'history.sessions.empty': 'Noch keine Sitzung',
  'history.sessions.hint': 'Eine Sitzung wird gespeichert, sobald du die Messung stoppst.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'Bereich: {range}',
  'history.session.noMeasure': 'nichts gemessen',

  'history.data.title': 'Daten',
  'history.data.subtitle': 'Der Verlauf ist nur auf diesem Gerät gespeichert.',
  'history.export.csv': 'CSV exportieren',
  'history.export.json': 'JSON exportieren',
  'history.export.ok': 'Datei zum Speichern bereit',
  'history.export.fail': 'Die Datei ließ sich nicht vorbereiten. Im privaten Modus und in einem Fenster, das in eine andere App eingebettet ist, blockiert der Browser das Speichern — öffne die Seite in einem gewöhnlichen Tab.',
  'history.export.sheet.title': 'Verlauf exportieren',
  'history.export.sheet.text': 'CSV öffnet sich in einer Tabellenkalkulation (Semikolon als Trennzeichen, Komma als Dezimalzeichen). JSON behält alles, samt der Liste der Sitzungen und der Lücken ohne Messung.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Verlauf löschen',
  'history.clear.title': 'Verlauf löschen?',
  'history.clear.text': 'Wir löschen {points} und {sessions}. Das lässt sich nicht rückgängig machen — wenn du die Daten behalten willst, exportiere sie zuerst.',
  'history.clear.confirm': 'Löschen',
  'history.clear.announce': 'Verlauf gelöscht.',
  'history.clear.toast': 'Verlauf gelöscht',

  'history.empty.title': 'Noch nichts zu zeigen',
  'history.empty.text': 'Der Verlauf füllt sich während der Messung — ein Punkt pro Sekunde. Alles bleibt auf diesem Gerät.',
  'history.empty.action': 'Zur Messung',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 Min.',
  'range.5m': '5 Min.',
  'range.1h': '1 Std.',
  'range.24h': '24 Std.',
  'range.7d': '7 Tage',
  'range.30d': '30 Tage',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Datum und Uhrzeit',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'Der Speicher des Geräts ist voll — neue Messungen werden nicht mehr gespeichert.',
  'storage.blocked': 'Der Browser lässt den Verlauf nicht speichern — die Daten sind weg, sobald du den Tab schließt.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Werkzeuge',
  'tools.action.about': 'Über die Messung',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Sprache',
  'tools.language.subtitle': 'Standardmäßig folgt die App der Sprache deines Geräts; eine Wahl aus dieser Liste wirkt sofort und bleibt in diesem Browser.',
  'tools.language.aria': 'Sprache der Oberfläche',
  'tools.language.system': 'Auto',
  'tools.language.announce': 'Sprache der Oberfläche: {language}.',

  'tools.appearance.title': 'Darstellung',
  'tools.appearance.theme.title': 'Design',
  'tools.appearance.theme.desc': '„Auto“ folgt der Systemeinstellung.',
  'tools.appearance.theme.aria': 'Design',
  'tools.theme.system': 'Auto',
  'tools.theme.light': 'Hell',
  'tools.theme.dark': 'Dunkel',
  'tools.appearance.accent.title': 'Akzentfarbe',
  'tools.appearance.accent.desc': 'Die Farbe von Schaltflächen, Auswahl und Reglern.',
  'tools.appearance.accent.aria': 'Akzentfarbe',
  'tools.appearance.textScale.title': 'Textgröße',
  'tools.appearance.textScale.desc': 'Vergrößert die ganze Oberfläche, nicht nur die Beschriftungen.',
  'tools.appearance.textScale.aria': 'Textgröße',
  'tools.appearance.density.title': 'Dichte',
  'tools.appearance.density.desc': 'Kompakt bringt mehr Inhalt auf einen Bildschirm.',
  'tools.appearance.density.aria': 'Layoutdichte',
  'tools.density.comfortable': 'Normal',
  'tools.density.compact': 'Kompakt',
  'tools.appearance.motion.title': 'Weniger Bewegung',
  'tools.appearance.motion.desc': 'Schaltet Animationen und das weiche Nachlaufen des Zeigers ab. Deine Systemeinstellung wird unabhängig davon beachtet.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Ozean',
  'accent.violet': 'Violett',
  'accent.amber': 'Bernstein',
  'accent.mint': 'Minze',
  'accent.rose': 'Rosé',

  'tools.thresholds.title': 'Schwellen',
  'tools.thresholds.subtitle': 'Ab welchem Wert die App „mäßig“ sagen soll und ab welchem „schlecht“. Die Standardschwellen sind unser Vorschlag, keine Norm — stell sie auf dich ein.',
  'tools.thresholds.warn': 'Warnschwelle',
  'tools.thresholds.crit': 'Alarmschwelle',
  'tools.thresholds.warn.aria': 'Warnschwelle — {metric}',
  'tools.thresholds.crit.aria': 'Alarmschwelle — {metric}',
  'tools.thresholds.reset': 'Standard',
  'tools.thresholds.reset.aria': 'Standardschwellen wiederherstellen: {metric}',
  'tools.thresholds.moved': '{threshold} auf {value} verschoben.',
  'tools.thresholds.resetAll': 'Alle Schwellen zurücksetzen',
  'tools.thresholds.resetAll.title': 'Standardschwellen wiederherstellen?',
  'tools.thresholds.resetAll.text': 'Alle sieben Größen kehren zu den Schwellen zurück, die die App vorschlägt. Dein Messverlauf bleibt unberührt.',
  'tools.thresholds.resetAll.confirm': 'Wiederherstellen',
  'tools.thresholds.resetAll.cancel': 'Behalten',
  'tools.thresholds.resetAll.toast': 'Schwellen stehen wieder auf Standard',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'über {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} und darunter',
  'tools.zoneRange.goodBelow': 'unter {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} und darüber',

  'tools.calibration.title': 'Kalibrierung',
  'tools.calibration.subtitle': 'Für alle, die etwas zum Vergleichen haben.',
  'tools.calibration.intro': 'Zwei Handys, auf dieselbe Lampe gerichtet, zeigen leicht unterschiedliche Zahlen — jeder Sensor hat seinen eigenen Farbstich. Wenn du einen Messwert zur Hand hast, dem du vertraust, kannst du die einzelnen Bildkanäle hier behutsam anheben oder absenken. Die Faktoren wirken, bevor überhaupt etwas berechnet wird, und ändern deshalb alle sieben Größen auf einmal.',
  'tools.calibration.neutral': 'Nichts zum Vergleichen? Lass 1,00 stehen — das ist die Werkseinstellung und verdirbt nichts.',
  'tools.calibration.forward': 'Die Änderung gilt ab jetzt. Messungen, die schon im Verlauf stehen, bleiben so, wie sie im Moment des Speicherns waren — wir rechnen sie nicht rückwirkend um, denn das hieße, Daten im Nachhinein auszutauschen.',
  'tools.calibration.reset': 'Kalibrierung zurücksetzen',
  'tools.calibration.reset.toast': 'Kalibrierung zurückgesetzt',
  'tools.calibration.channel.r': 'Rotkanal',
  'tools.calibration.channel.g': 'Grünkanal',
  'tools.calibration.channel.b': 'Blaukanal',
  'tools.calibration.channel.aria': '{channel} — Kalibrierungsfaktor',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'Messung',
  'tools.measurement.wake.title': 'Bildschirm anlassen',
  'tools.measurement.wake.desc': 'Während der Messung bleibt der Bildschirm an. Der Akku leert sich dann schneller.',
  'tools.measurement.wake.unsupported': 'Dieser Browser lässt uns den Bildschirm nicht wach halten.',
  'tools.measurement.haptics.title': 'Vibration',
  'tools.measurement.haptics.desc': 'Eine kurze Bestätigung beim Start, beim Stopp und beim Wechsel der Größe.',
  'tools.measurement.haptics.unsupported': 'Dieses Gerät meldet keinen Vibrationsmotor.',

  'tools.about.title': 'Über die Messung',
  'tools.about.subtitle': 'Was jede der sieben Größen genau berechnet und wo die Ehrlichkeit dieser Methode endet.',
  'tools.about.scale': 'Skala: von {min} bis {max}.',
  'tools.about.threshold': 'Wir warnen ab {warn} und schlagen ab {crit} Alarm.',
  'tools.about.thresholdInvert': 'Wir warnen unter {warn} und schlagen unter {crit} Alarm.',
  'tools.about.limitsHead': 'Was diese Messung nicht kann',
  'tools.about.limit.spectrum.title': 'Eine Kamera sieht Farben nicht wie ein Messgerät',
  'tools.about.limit.spectrum.text': 'Eine Handykamera hat drei Kanäle: Rot, Grün und Blau. Ein Gerät zur Lichtmessung zerlegt sie in Dutzende schmaler Bänder. Was du hier siehst, ist aus diesen drei Zahlen abgeleitet — auf vernünftige Weise, aber es bleibt eine Rechnung und kein gemessenes Spektrum.',
  'tools.about.limit.exposure.title': 'Die Kamera regelt ihre Helligkeit selbst',
  'tools.about.limit.exposure.text': 'Richtest du das Handy auf ein Fenster, dunkelt die Kamera das Bild ab, um es nicht zu überbelichten. Die „Szenenhelligkeit“ fällt dann, obwohl sich im Raum nichts geändert hat. Vergleiche diesen Wert deshalb innerhalb einer Aufnahme und nicht zwischen Räumen.',
  'tools.about.limit.flicker.title': 'Schnelles Flimmern erwischt eine langsame Kamera nicht',
  'tools.about.limit.flicker.text': 'Wir prüfen das Bild {hz} Mal pro Sekunde. Ein Pulsieren, das schneller ist als {nyquist} Mal pro Sekunde, kann in einer solchen Messung langsamer erscheinen, als es wirklich ist, oder ganz verschwinden — und genau so schnell ist das Flimmern aus dem Stromnetz. Wenn die App etwas auffängt, nimm es als Hinweis „hier pulsiert etwas“ und nicht als gemessene Frequenz.',
  'tools.about.limit.medical.title': 'Das ist weder eine ärztliche Untersuchung noch ärztlicher Rat',
  'tools.about.limit.medical.text': 'Die App hilft dir zu bemerken, dass das Licht um dich herum kalt, hell oder unruhig ist, und schlägt vor, was sich dagegen tun lässt. Sie urteilt nicht über deine Gesundheit und ersetzt weder das Gespräch mit einem Arzt noch eine Messung mit einem professionellen Messgerät.',
  'tools.about.privacy': 'Alles wird auf deinem Gerät berechnet. Das Kamerabild wird nirgendwohin gesendet und nirgends gespeichert — in den Speicher gelangen ausschließlich die berechneten Zahlen.',
  'tools.about.privacyPolicy': 'Vollständige Datenschutzerklärung',

  'tools.data.title': 'Daten',
  'tools.data.subtitle': 'Alles liegt im Speicher dieses Browsers und geht von hier nirgendwohin.',
  'tools.data.summary.empty': 'Es sind noch keine Messungen gespeichert.',
  'tools.data.summary': 'Im Speicher: {points} und {sessions}.',
  'tools.data.export.csv': 'CSV exportieren',
  'tools.data.export.json': 'JSON exportieren',
  'tools.data.clear': 'Verlauf löschen',
  'tools.data.reset': 'Standardeinstellungen',
  'tools.data.reset.title': 'Standardeinstellungen wiederherstellen?',
  'tools.data.reset.text': 'Darstellung, Schwellen, Kalibrierung und Messeinstellungen kehren in den Ausgangszustand zurück. Dein Messverlauf bleibt unberührt.',
  'tools.data.reset.confirm': 'Wiederherstellen',
  'tools.data.reset.toast': 'Standardeinstellungen wiederhergestellt',
  'tools.data.wipe': 'Alle Daten löschen',
  'tools.data.wipe.title': 'Alle Daten der App löschen?',
  'tools.data.wipe.text': 'Weg sind dann: der gesamte Messverlauf und die Liste der Sitzungen, deine Schwellen und deine Kalibrierung sowie die Einstellungen zur Darstellung. Die App kehrt in den Zustand des ersten Starts zurück.',
  'tools.data.wipe.note': 'Wir haben keine Kopie dieser Daten — sie haben dieses Gerät nie verlassen, es gibt also nichts, woraus sie sich wiederherstellen ließen.',
  'tools.data.wipe.check': 'Mir ist klar, dass sich das nicht rückgängig machen lässt',
  'tools.data.wipe.confirm': 'Alles löschen',
  'tools.data.wipe.toast': 'Alle Daten der App wurden gelöscht',
  'tools.data.wipe.announce': 'Alle Daten der App wurden gelöscht. Die Einstellungen stehen wieder auf Standard.',
  'tools.data.storage.blocked': 'Dieser Browser lässt nichts dauerhaft speichern (privater Modus oder blockierte Website-Daten). Alles, was du hier einstellst, ist weg, sobald du den Tab schließt.',
  'tools.data.storage.full': 'Der Speicher des Browsers ist voll und neue Messungen werden nicht mehr gespeichert. Das Löschen des Verlaufs schafft Platz.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Unterstützen',
  'support.free.title': 'Alles ist verfügbar',
  'support.free.lead': 'Alle sieben Größen, der vollständige Verlauf, Schwellen, Kalibrierung und Export funktionieren vom ersten Start an — ohne Konto, ohne Grenzen und ohne Gebühr.',
  'support.free.note': 'Die Messung wird vollständig auf diesem Gerät berechnet und funktioniert ohne Netz. Es gibt hier keine bessere Version, die wir hinter einer Mauer halten würden.',
  'support.why.title': 'Warum ich darum bitte',
  'support.why.lead': 'Der Lichtmonitor entsteht nach Feierabend, ohne Werbung, ohne Sponsor und ohne Firma dahinter. Unterstützung bezahlt die Zeit für Korrekturen, für neue Größen und dafür, das Bestehende am Laufen zu halten.',
  'support.what.title': 'Was eine Spende bringt',
  'support.what.lead': 'Nichts. Eine Spende schaltet nichts frei — keine zusätzliche Funktion, kein Abzeichen neben deinem Namen, keinen Vorrang. Alles, was die App kann, hast du schon jetzt.',
  'support.what.note': 'Es bleibt nur, dass ich weiß: Jemandem hat es genützt. Das ist wirklich Grund genug.',
  'support.cta.title': 'Wenn du helfen möchtest',
  'support.cta.button': 'Spendier mir einen Kaffee',
  'support.cta.nolink': 'Das Spendenprofil ist noch nicht angebunden. Sobald es da ist, steht an dieser Stelle eine Schaltfläche.',
  'support.cta.privacy': 'Dieser Link öffnet die externe Seite von Buy Me a Coffee in einem neuen Tab. Das ist der einzige Moment, in dem irgendetwas dieses Gerät verlässt — die Messung selbst bleibt immer hier.',
  'support.cta.privacyFuture': 'Sobald die Adresse steht, öffnet die Schaltfläche die externe Seite von Buy Me a Coffee in einem neuen Tab. Das wird der einzige Moment sein, in dem irgendetwas dieses Gerät verlässt — die Messung selbst bleibt immer hier.',
  'support.cta.note': 'Es gibt hier keinen Countdown, keine Erinnerungen und kein Fenster, das von selbst aufgeht. Diese Bitte wartet nur auf diesem Tab.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'letzte Minute',
  'gauge.aria': '{metric}: {value}, Zone: {zone}',
  'gauge.aria.note': '{metric}: {value}, Zone: {zone}, {note}',
  'gauge.aria.initial': '{metric}: keine Daten',
  'gauge.value.none': 'keine Daten',
  /* Odczyt słowny z jednostką: „27 Prozent”, „1,20 mal”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'Näherungswert',
  'gauge.note.offScale': 'außerhalb der Skala',
  'gauge.metric.unknown': 'Unbekannte Größe',

  'chart.aria.label': 'Diagramm des Messverlaufs',
  'chart.hint': 'Interaktives Diagramm. Pfeil links und Pfeil rechts bewegen den Lesecursor, Pos1 und Ende springen an den Anfang und das Ende des Zeitraums, Escape blendet den Cursor aus.',
  'chart.empty.title': 'Keine Daten',
  'chart.empty.text': 'Starte eine Messung — das Diagramm erscheint nach den ersten Messwerten.',
  'chart.few.title': 'Zu wenig Daten',
  'chart.few.text': 'Wir haben einen Messwert: {value}. Für eine Linie braucht es zwei.',
  'chart.legend.line': 'Messung',
  'chart.legend.gap': 'Lücke in der Messung',
  'chart.aria.head': 'Diagramm: {metric}, Zeitraum {range}',
  'chart.aria.empty': 'Keine Daten in diesem Zeitraum.',
  'chart.aria.one': 'Ein Messwert: {value}.',
  'chart.aria.summary': 'Von {min} bis {max}, Durchschnitt {avg}, {points}.',
  'chart.aria.gaps': 'Die Reihe hat Lücken — dann haben wir nicht gemessen.',
  'chart.readout.empty': 'Keine Daten in diesem Zeitraum.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'Zu wenig Daten, um ein Diagramm zu zeichnen.',
  'chart.readout.hint': 'Zieh über das Diagramm oder nutze die Pfeiltasten, um einen einzelnen Messwert abzulesen.',
  'chart.time.now': 'jetzt',
  'chart.time.justNow': 'gerade eben',
  'chart.time.ago': 'vor {duration}',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd zegar dwudziestoczterogodzinny i kropka
     po dniu, bo tak niemieckie ustawienia regionalne zapisują datę. */
  'chart.sample.ago': '\u221230\u00A0Min.',
  'chart.sample.clock': '00:00',
  'chart.sample.date': '30.\u00A0Aug.',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'Blauanteil',
  'metric.share.short': 'Wie viel des gesehenen Lichts auf den Blaukanal entfällt.',
  'metric.share.help': 'Trennt die Farbe von der Helligkeit — das ist der Wert, der sich bewegt, wenn du den Nachtmodus einschaltest.',
  'metric.brightness.name': 'Szenenhelligkeit',
  'metric.brightness.short': 'Die mittlere Helligkeit des Kamerabildes.',
  'metric.brightness.help': 'Ein relativer Wert, kein Lux — die automatische Belichtung der Kamera verschiebt ihn im Verborgenen.',
  'metric.kelvin.name': 'Farbtemperatur',
  'metric.kelvin.short': 'Ob das Licht warm oder kalt ist.',
  'metric.kelvin.help': 'Unter 3000 K ist das Licht warm und am Abend sanfter. 6500 K ist das Standardweiß der meisten Bildschirme.',
  'metric.melanopic.name': 'Zirkadiane Wirkung',
  'metric.melanopic.short': 'Wie stark dieses Licht auf die innere Uhr wirkt.',
  'metric.melanopic.help': 'Eine Näherung des melanopischen Faktors. 1,00 ist neutrales Tageslichtweiß; am Abend lohnt es sich, unter 0,50 zu gehen.',
  'metric.flicker.name': 'Flimmern',
  'metric.flicker.short': 'Unsichtbares Pulsieren der Lichtquelle.',
  'metric.flicker.help': 'Billige Dimmer und Hintergrundbeleuchtungen pulsieren. Das Auge sieht es nicht, es gilt aber als mögliche Ursache von Müdigkeit und Kopfschmerzen.',
  'metric.uniformity.name': 'Gleichmäßigkeit',
  'metric.uniformity.short': 'Ob sich das Licht gleichmäßig über das Bild verteilt.',
  'metric.uniformity.help': 'Ein niedriger Wert bedeutet auf einem Bildschirm durchscheinende Hintergrundbeleuchtung oder eine Spiegelung; auf dem Schreibtisch — eine schlecht gestellte Lampe.',
  'metric.comfort.name': 'Sehkomfort',
  'metric.comfort.short': 'Eine Bewertung statt sechs Zahlen.',
  'metric.comfort.help': 'Fasst die übrigen Messungen zu einem Wert von 0 bis 100 zusammen und zeigt, was ihn am stärksten senkt. Die Gewichte sind unsere redaktionelle Einschätzung, keine Norm.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'gut',
  'zone.warn': 'mäßig',
  'zone.crit': 'schlecht',
  'zone.none': 'keine Daten',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24. Aug.'). */
  'date.month.short.1': 'Jan.',
  'date.month.short.2': 'Feb.',
  'date.month.short.3': 'März',
  'date.month.short.4': 'Apr.',
  'date.month.short.5': 'Mai',
  'date.month.short.6': 'Juni',
  'date.month.short.7': 'Juli',
  'date.month.short.8': 'Aug.',
  'date.month.short.9': 'Sep.',
  'date.month.short.10': 'Okt.',
  'date.month.short.11': 'Nov.',
  'date.month.short.12': 'Dez.',

  'date.clock': '{hours}:{minutes}',
  /* Kolejność wstawek jak po polsku, ale po dniu stoi kropka: „30. Aug.”.
     Nazwy wstawek zostają te same — zmienia się wyłącznie zapis wokół nich. */
  'date.short': '{day}.\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0{year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0Std.',
  'time.duration.hourMinute': '{hours}\u00A0Std. {minutes}\u00A0Min.',
  'time.duration.hour': '{hours}\u00A0Std.',
  'time.duration.minuteSecond': '{minutes}\u00A0Min. {seconds}\u00A0s',
  'time.duration.minute': '{minutes}\u00A0Min.',
  'time.duration.second': '{seconds}\u00A0s',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „gerade eben”. */
  'time.justNow': 'gerade eben',
  'time.aMinuteAgo': 'vor einer Minute',
  'time.minutesAgo': 'vor {minutes}\u00A0Min.',
  'time.hoursAgo': 'vor {hours}\u00A0Std.',
  'time.yesterday': 'gestern',
  'time.daysAgo': 'vor {days}\u00A0Tagen',

  /* Formy zależne od liczby. Niemiecki ma w CLDR dwie: `one` i `other`.
     Rozstrzyga je Intl.PluralRules dla języka aktywnego. */
  'time.days.plural': { one: 'Tag', other: 'Tage' },
  'unit.sample.plural': { one: 'Probe', other: 'Proben' },
  'unit.measurement.plural': { one: 'Messung', other: 'Messungen' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Niemiecki ma tu jedną — oba klucze zostają (kształt słownika jest wspólny
     dla wszystkich języków), a wartości są identyczne. */
  'unit.session.plural': { one: 'Sitzung', other: 'Sitzungen' },
  'unit.session.accusative.plural': { one: 'Sitzung', other: 'Sitzungen' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy — po niemiecku rozdziela je złożenie „Datenpunkt”. */
  'unit.chartPoint.plural': { one: 'Datenpunkt', other: 'Datenpunkte' },
  'unit.point.plural': { one: 'Punkt', other: 'Punkte' },
  /* Nazwa jednostki po liczbie zostaje nieodmieniona: „3000 Kelvin”. */
  'unit.kelvin.plural': { one: 'Kelvin', other: 'Kelvin' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „Prozent”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'Prozent',
  'unit.spoken.times': 'mal',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'Die Erlaubnis für den Kamerazugriff wurde nicht erteilt. Erlaube die Kamera für diese Seite in den Einstellungen des Browsers oder des Systems und versuch es erneut.',
  'camera.error.notfound': 'Keine Kamera gefunden. Prüfe, ob das Gerät eine hat und ob sie im System nicht abgeschaltet ist.',
  'camera.error.inuse': 'Die Kamera ist von einer anderen App belegt. Schließ diese App oder den Tab und versuch es erneut.',
  'camera.error.insecure': 'Die Kamera funktioniert nur über HTTPS oder auf localhost. Öffne diese Seite unter einer Adresse, die mit „https://“ beginnt.',
  'camera.error.unsupported': 'Dieser Browser gibt die Kamera hier nicht frei. Versuch es in Chrome oder Safari, in einem gewöhnlichen Fenster — nicht in einer Vorschau, die in eine andere App eingebettet ist.',
  'camera.error.unknown': 'Die Kamera ließ sich nicht starten.'
};
