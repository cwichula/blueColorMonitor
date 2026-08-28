/* docs/shared/i18n/de.js — słownik WSPÓLNY, niemiecki.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest niemiecki.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — i tak ma zostać
 * (patrz docs/shared/README.md, rozdział „Warstwa językowa”). Klucza, którego
 * nie ma w angielskim, nie wolno tu dopisać: angielski jest wartością
 * zapasową, więc to on wyznacza zestaw.
 *
 * REJESTR: forma grzecznościowa „Sie”, jednolicie w całym pliku — aplikacja
 * mówi o zdrowiu i o rozporządzeniu (UE) 2017/745, więc „du” brzmiałoby tu
 * zbyt poufale. Ton rzeczowy i ciepły, bez marketingu.
 *
 * TERMINOLOGIA (jeden odpowiednik na pojęcie): Blauanteil, Szenenhelligkeit,
 * Farbtemperatur, zirkadiane Wirkung (współczynnik: melanopischer Faktor),
 * Flimmern, Gleichmäßigkeit, Sehkomfort; „zegar biologiczny” = innere Uhr.
 *
 * LICZBY: niemiecki zapisuje ułamek przecinkiem (1,00 — 0,50), tak jak polski.
 *
 * LICZEBNIKI: Intl.PluralRules('de') zwraca dwie kategorie — one i other.
 */
window.I18nData = window.I18nData || {};
window.I18nData['de'] = Object.assign(window.I18nData['de'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu
     (UE) 2017/745, gdzie stoi jako podmiot. */
  'app.name': 'Lichtmonitor',

  /* ---- wybór języka ---- */

  'language.label': 'Sprache',
  'language.help': 'Die Sprache der ganzen App. Alle Sprachen sind bereits auf diesem Gerät — nichts wird heruntergeladen und nichts wird irgendwohin gesendet.',
  'language.auto': 'Wie das Gerät',
  'language.autoHint': 'Folgt der Sprache, die im Telefon oder im Browser eingestellt ist.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Blauanteil',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'Prozent',
  'metric.share.short': 'Wie viel des sichtbaren Lichts auf den Blaukanal entfällt.',
  'metric.share.help': 'Trennt die Farbe von der Helligkeit — dieser Wert ändert sich, wenn Sie den Nachtmodus einschalten.',

  'metric.brightness.name': 'Szenenhelligkeit',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'Prozent',
  'metric.brightness.short': 'Die mittlere Helligkeit des Kamerabildes.',
  'metric.brightness.help': 'Ein relativer Wert, kein Lux — die Kamera verschiebt darunter ihre eigene Belichtung.',

  'metric.kelvin.name': 'Farbtemperatur',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'Kelvin',
  'metric.kelvin.short': 'Ob das Licht warm oder kühl ist.',
  'metric.kelvin.help': 'Unter 3000 K ist das Licht warm und am Abend sanfter. 6500 K ist das voreingestellte Weiß der meisten Bildschirme.',

  'metric.melanopic.name': 'Zirkadiane Wirkung',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'mal',
  'metric.melanopic.short': 'Wie stark dieses Licht auf die innere Uhr wirkt.',
  'metric.melanopic.help': 'Eine Näherung des melanopischen Faktors. 1,00 ist neutrales Tageslichtweiß; am Abend lohnt es sich, unter 0,50 zu gehen.',

  'metric.flicker.name': 'Flimmern',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'Prozent',
  'metric.flicker.short': 'Unsichtbares Pulsieren der Lichtquelle.',
  'metric.flicker.help': 'Billige Dimmer und Hintergrundbeleuchtungen pulsieren. Das Auge sieht es nicht, aber es ist eine bekannte Ursache für Müdigkeit und Kopfschmerzen.',

  'metric.uniformity.name': 'Gleichmäßigkeit',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'Prozent',
  'metric.uniformity.short': 'Ob sich das Licht gleichmäßig über das Bild verteilt.',
  'metric.uniformity.help': 'Ein niedriger Wert auf einem Bildschirm bedeutet durchscheinende Hintergrundbeleuchtung oder eine Spiegelung; auf dem Schreibtisch eine schlecht gestellte Lampe.',

  'metric.comfort.name': 'Sehkomfort',
  'metric.comfort.unit': 'Pkt.',
  'metric.comfort.unitSpoken': 'Punkte',
  'metric.comfort.short': 'Ein Urteil statt sechs Zahlen.',
  'metric.comfort.help': 'Fasst die übrigen Messwerte zu einem Wert von 0–100 zusammen und zeigt, was ihn am stärksten senkt. Die Gewichte sind unsere redaktionelle Einschätzung, keine Norm.',

  /* Etykiety składników oceny komfortu — Metrics.comfortIndex zwraca je jako
     `penalties[].id`, więc nazwa klucza idzie za tym identyfikatorem. */
  'comfort.penalty.melanopic': 'Zirkadiane Wirkung',
  'comfort.penalty.kelvin': 'Kühle Lichtfarbe',
  'comfort.penalty.flicker': 'Flimmern',
  'comfort.penalty.uniformity': 'Ungleichmäßige Beleuchtung',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': 'Drücken Sie „Start“, um die Kamera einzuschalten.',
  'engine.starting': 'Kamera wird gestartet…',

  'engine.error.permission': 'Keine Berechtigung für die Kamera. Erlauben Sie die Kamera in den Browsereinstellungen und drücken Sie erneut „Start“.',
  'engine.error.notFound': 'Keine Kamera gefunden. Prüfen Sie, ob das Gerät eine Kamera hat und ob sie im System nicht abgeschaltet ist.',
  'engine.error.busy': 'Die Kamera wird von einer anderen Anwendung benutzt. Schließen Sie sie und versuchen Sie es erneut.',
  'engine.error.unknown': 'Die Kamera konnte nicht gestartet werden.',
  'engine.error.unsupported': 'Dieser Browser gibt dieser Seite keinen Zugriff auf die Kamera. Öffnen Sie die App über HTTPS oder verwenden Sie einen anderen Browser.',

  /* ---- strefy ---- */

  'zone.good': 'Im Normbereich',
  'zone.warning': 'Vorsicht',
  'zone.critical': 'Kritisch',
  'zone.none': 'Keine Daten',
  'zone.settling': 'Wird ermittelt',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania, więc bez kropki.
     Rzeczowniki niemieckie zostają wielką literą, bo taka jest ortografia. */
  'zone.spoken.good': 'im Normbereich',
  'zone.spoken.warning': 'Vorsicht',
  'zone.spoken.critical': 'kritisch',
  'zone.spoken.none': 'keine Daten',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'Pkt.',
  'unit.hertz': 'Hz',
  'unit.second': 's',
  'unit.minute': 'min',
  'unit.hour': 'Std.',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'Dieses Licht ist in Ordnung — nichts überschreitet die von Ihnen gesetzten Schwellen.',
  'verdict.noValue': 'Diese Größe lässt sich gerade nicht messen. Prüfen Sie, ob das Objektiv verdeckt ist.',
  'verdict.warmup': 'Die Bewertung wird ermittelt — halten Sie das Telefon noch einen Moment ruhig.',

  'verdict.warning.share': 'Ein guter Teil dieses Lichts entfällt auf den Blaukanal. Am Abend lohnt es sich, es zu dimmen.',
  'verdict.warning.brightness': 'Die Szene ist hell — die Kamera arbeitet nahe der oberen Grenze ihres Messbereichs.',
  'verdict.warning.kelvin': 'Das Licht ist recht kühl. Am Abend ist eine Lampe um 2700 K sanfter.',
  'verdict.warning.melanopic': 'Dieses Licht wirkt recht stark auf die innere Uhr.',
  'verdict.warning.flicker': 'Die Lichtquelle pulsiert deutlich.',
  'verdict.warning.uniformity': 'Das Licht verteilt sich ungleichmäßig über das Bild.',
  'verdict.warning.comfort': 'Der Sehkomfort ist gemindert — dabei kommen mehrere Dinge zusammen.',

  'verdict.critical.share': 'Sehr viel Blau. Schalten Sie am Abend den Nachtmodus ein oder wechseln Sie die Lichtquelle.',
  'verdict.critical.brightness': 'Die Szene ist sehr hell. Messen Sie nicht, indem Sie direkt in die Lichtquelle blicken.',
  'verdict.critical.kelvin': 'Das Licht ist kalt. Am Abend ermüdet das die Augen am meisten — eine wärmere Lampe oder der Nachtmodus helfen.',
  'verdict.critical.melanopic': 'Dieses Licht wirkt stark auf die innere Uhr. Am Abend lohnt es sich, unter 0,50 zu gehen.',
  'verdict.critical.flicker': 'Die Lichtquelle pulsiert stark. Das ist eine bekannte Ursache für müde Augen und Kopfschmerzen.',
  'verdict.critical.uniformity': 'Das Licht verteilt sich sehr ungleichmäßig. Prüfen Sie die Stellung der Lampe oder Spiegelungen auf dem Bildschirm.',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'Der Sehkomfort ist niedrig. Sehen Sie sich die Aufschlüsselung der Bewertung an, um zu erkennen, was ihn senkt.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'Was diese Zahl nicht sagt',
  'note.warningTitle': 'Vorsicht',
  'note.dashTitle': 'Was diese Messung nicht ist',
  'note.dashText': 'Eine Telefonkamera hat drei breite Farbkanäle und einen automatischen Weißabgleich — sie misst kein Spektrum. Farbtemperatur und zirkadiane Wirkung sind Näherungen, berechnet aus den sRGB-Farben. Die App zeigt Unterschiede und Veränderungen über die Zeit gut; sie ersetzt kein Messgerät und stellt keine Diagnose.',
  'note.approxLegend': '≈ Näherungswert — aus den sRGB-Farben berechnet, nicht aus einer Spektralmessung.',
  'note.kelvinOutOfRange': 'Außerhalb des Bereichs der Methode — bei dieser Farbe wird die Formel für die Farbtemperatur unzuverlässig.',
  /* {rate} i {limit} podaje wywołanie, bo to liczby z silnika (5 Hz, 2,5 Hz),
     a ich zapis jest różny w różnych językach: 2.5 po angielsku, 2,5 po
     niemiecku. Zapisu liczby nie wolno wpisywać do zdania na sztywno. */
  'note.flickerOutOfRange': 'Außerhalb des Bereichs der Methode — die Abtastung mit {rate} Hz sieht Pulsieren nur unterhalb von {limit} Hz. Das Netzflimmern mit 100 Hz liegt außer Reichweite und die App wird es nie als Messwert ausgeben.',
  'note.helpTitle': 'Was diese Zahl nicht sagt',
  'note.helpText': 'Eine Telefonkamera hat drei breite Kanäle und misst kein Spektrum. Dieser Wert ist ein Vergleichsindikator — er zeigt Unterschiede zwischen Lichtquellen und Veränderungen über die Zeit gut und ist weder eine Labormessung noch eine medizinische Information.',
  'note.calibration': 'Messung ohne Kalibrierung — behandeln Sie die Werte als Vergleichswerte.',

  'note.howToTitle': 'Wie man sinnvoll misst',
  'note.howTo.hold.title': 'Halten Sie das Telefon ruhig',
  'note.howTo.hold.text': 'Die automatische Belichtung braucht 2–3 Sekunden, um sich einzupendeln.',
  'note.howTo.aim.title': 'Auf eine beleuchtete Fläche richten',
  'note.howTo.aim.text': 'Ein weißes Blatt Papier oder eine helle Wand. Messen Sie nicht, indem Sie direkt in die Lichtquelle blicken.',
  'note.howTo.compare.title': 'Vergleichen, nicht absolut bewerten',
  'note.howTo.compare.text': 'Dieselbe Szene vor und nach einer Änderung der Beleuchtung sagt mehr als eine einzelne Zahl.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Skracanie go w tłumaczeniu nie jest kwestią stylu. */

  'legal.noDiagnosis': 'Kein Messwert ist eine Diagnose oder eine gesundheitliche Beratung.',
  'legal.mdr': '{app} ist kein Medizinprodukt im Sinne der Verordnung (EU) 2017/745, dient nicht der Diagnose, Verhütung, Überwachung oder Behandlung irgendeines Krankheitszustands und ersetzt keine Untersuchung bei einem Arzt oder einem Optometristen.',

  /* ---- prywatność ---- */

  'privacy.title': 'Was dieses Gerät verlässt',
  'privacy.short': 'Nichts in dieser App sendet etwas ins Netz. Alle Zahlen entstehen auf diesem Gerät und bleiben hier.',
  'privacy.onDevice': 'Die Kamera schaltet sich erst ein, nachdem Sie die Schaltfläche gedrückt haben, und das Bild verlässt dieses Gerät nie.',
  'privacy.external': 'Das ist die einzige Stelle in der ganzen App, an der etwas dieses Gerät verlässt: Die Schaltfläche öffnet eine externe Seite in einem neuen Tab, und das erst, nachdem Sie sie gedrückt haben. Messung, Verlauf und Einstellungen bleiben hier.',
  'privacy.externalPending': 'Sobald die Adresse vorliegt, öffnet die Schaltfläche eine externe Seite in einem neuen Tab. Das wird der einzige Moment sein, in dem etwas dieses Gerät verlässt. Messung, Verlauf und Einstellungen bleiben hier.',
  'privacy.storageBlocked': 'Dieser Browser lässt nichts speichern (privater Modus oder blockierte Websitedaten). Das Messen funktioniert, aber der Verlauf verschwindet, wenn Sie den Tab schließen.',

  /* ---- liczebniki ----
     Niemiecki ma dwie kategorie CLDR: one (dokładnie 1) i other — ta druga
     obejmuje też 0 i ułamki („1,5 Messwerte”). Formę wybiera
     Intl.PluralRules('de'), nie nasza reguła. */

  'count.readings': { one: '{n} Messwert', other: '{n} Messwerte' },
  'count.sessions': { one: '{n} Messung', other: '{n} Messungen' },
  'count.seconds': { one: '{n} Sekunde', other: '{n} Sekunden' },
  'count.minutes': { one: '{n} Minute', other: '{n} Minuten' },
  'count.hours': { one: '{n} Stunde', other: '{n} Stunden' },
  'count.days': { one: '{n} Tag', other: '{n} Tage' }
});
