/* docs/v2/i18n/de.js — słownik WERSJI 2, niemiecki.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/de.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej. Zestaw kluczy jest identyczny
 * z pl.js — pilnuje tego docs/shared/i18n/keys.test.js.
 *
 * REJESTR: forma grzecznościowa „Sie”, jednolicie w całym pliku — dokładnie
 * tak, jak w docs/shared/i18n/de.js, z którym ten plik stoi w jednym zdaniu na
 * ekranie. (v5 mówi „du”; to osobna wersja z własnym rejestrem i tu się nią
 * nie sugerujemy.) Cudzysłowy niemieckie „ … “, przecinek dziesiętny (0,50),
 * spacja nierozdzielająca przed znakiem % zgodnie z DIN 5008.
 *
 * TERMINOLOGIA — wzięta co do słowa z warstwy wspólnej: Blauanteil,
 * Szenenhelligkeit, Farbtemperatur, zirkadiane Wirkung, Flimmern,
 * Gleichmäßigkeit, Sehkomfort; Verlauf (historia), Messung (pomiar),
 * Probe (próbka), Schwelle (próg), Messgröße (metryka), Messwert (odczyt).
 * Klucze *.nameLower to te same nazwy w środku zdania — rzeczowniki zostają
 * wielką literą, bo taka jest ortografia.
 *
 * ZASTRZEŻENIA MEDYCZNE i akapity o prywatności przetłumaczone DOKŁADNIE, bez
 * osłabiania i bez dodawania obietnic — to zdania o skutkach prawnych.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (te same co w pl.js i z tego samego powodu):
 *   'zone.warning'        — wspólne mówi „Vorsicht”, ta wersja od zawsze mówi
 *                           „Warnung” (i „Warnungen” w podsumowaniu);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi o pomiarach
 *                           w liczbie mnogiej.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules — niemiecki ma dwie: one i other.
 */
window.I18nData = window.I18nData || {};
window.I18nData['de'] = Object.assign(window.I18nData['de'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Lichtmonitor — blaues Licht messen',
  'app.description': 'Lichtmonitor — Messung des Blauanteils im Licht mit der Handykamera. Sieben Messwerte, ein Diagramm, ein Verlauf. Alles verfügbar, ohne Konto und ohne Gebühr.',
  'app.skipToContent': 'Zum Inhalt springen',
  'app.measuring': 'Messung läuft',
  'app.docsButton': 'Dokumentation und Erklärungen',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — Version 2',

  'nav.aria': 'Hauptnavigation',
  'nav.tablistAria': 'Bildschirme der App',
  'nav.measure': 'Messen',
  'nav.history': 'Verlauf',
  'nav.tools': 'Werkzeuge',
  'nav.support': 'Unterstützen',
  'nav.more': 'Mehr',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Dokumentation',
  'panel.thresholds': 'Schwellen und Profile',
  'panel.reports': 'Berichte',
  'panel.export': 'Datenexport',
  'panel.compare': 'A/B-Vergleich',
  'panel.calibration': 'Kalibrierung mit weißem Papier',
  'panel.screenCheck': 'Meinen Bildschirm prüfen',
  'panel.schedule': 'Zeitplan',
  'panel.alerts': 'Expositionswarnungen',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Zurück',
  'action.close': 'Schließen',
  'action.refresh': 'Aktualisieren',
  'action.apply': 'Anwenden',
  'action.delete': 'Löschen',
  'action.hide': 'Ausblenden',
  'action.start': 'Start',
  'action.stop': 'Stopp',
  'action.switch': 'Wechseln',
  'action.switchAria': 'Kamera wechseln: Frontkamera oder Rückkamera',
  'action.resetDefaults': 'Standard wiederherstellen',
  'action.reports': 'Berichte',
  'action.exportCsv': 'CSV-Export',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Bildschirm: {name}',
  'a11y.measureStarted': 'Messung gestartet.',
  'a11y.measureStopped': 'Messung gestoppt.',
  'a11y.measureStoppedSummary': 'Messung gestoppt. Zeit: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'Schwellenprofil angewendet.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Bestätigung',
  'dialog.confirm': 'Bestätigen',
  'dialog.cancel': 'Abbrechen',
  'dialog.infoTitle': 'Information',
  'dialog.ok': 'Verstanden',

  'help.sheetTitle': 'Über diese Messgröße',
  'help.unit': 'Einheit',
  'help.scaleRange': 'Skalenbereich',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tu każdą etykietę. */

  'threshold.warn': 'Warnung',
  'threshold.crit': 'Kritisch',
  'threshold.warnLabel': 'Warnschwelle',
  'threshold.critLabel': 'Kritische Schwelle',
  'threshold.warnAria': '{name} — Schwelle: Warnung',
  'threshold.critAria': '{name} — Schwelle: kritisch',

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

  'firstRun.title': 'Wie man misst',
  'firstRun.text': 'Drücken Sie „Start“, richten Sie das Telefon auf eine beleuchtete Fläche und halten Sie es einige Sekunden ruhig. Der Rahmen in der Vorschau zeigt den Ausschnitt, den die App wirklich liest.',
  'firstRun.close': 'Hinweis schließen',

  'camera.live': 'LIVE',
  'camera.idle': 'Die Kamera ist aus. Drücken Sie „Start“, richten Sie das Telefon auf eine beleuchtete Fläche und halten Sie es einige Sekunden ruhig.',
  'camera.stopped': 'Messung gestoppt. Drücken Sie „Start“, um erneut zu messen.',

  'error.cameraStart': 'Die Kamera konnte nicht gestartet werden.',
  'error.engineMissing': 'Das Messmodul wurde nicht geladen.',

  'metrics.sevenTitle': 'Sieben Messwerte',
  'measure.tilesSub': 'Fünfmal pro Sekunde aktualisiert',

  'session.title': 'Diese Sitzung',
  'session.duration': 'Messdauer',
  'session.samples': 'Anzahl der Proben',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     „Warnungen” to nie to samo słowo co „Warnung” pod suwakiem. */
  'zone.count.good': 'Im Normbereich',
  'zone.count.warning': 'Warnungen',
  'zone.count.critical': 'Kritisch',

  'note.calibrated': 'Messung mit weißem Papier kalibriert — die Kanäle sind angeglichen.',

  'tile.helpAria': 'Was das bedeutet: {name}',
  'tile.noMeasurement': 'Keine Messung',
  'tile.outOfScale': 'Außerhalb der Skala',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Warnung',
  'zone.spoken.warning': 'Warnung',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Verlauf über die Zeit',
  'history.pickHint': 'Wählen Sie eine Messgröße und einen Zeitraum',
  'history.metricLabel': 'Messgröße',
  'history.rangeAria': 'Zeitraum des Diagramms',
  'history.emptyTitle': 'Keine Daten in diesem Zeitraum',
  'history.emptyText': 'Starten Sie eine Messung auf dem Bildschirm „Messen“ — das Diagramm füllt sich in wenigen Sekunden.',
  'history.tableTitle': 'Letzte Messwerte',
  'history.tableHide': 'Tabelle ausblenden',
  'history.tableShow': 'Tabelle anzeigen',
  'history.tableCaption': 'Die letzten Messwerte, der neueste oben.',
  'history.tableEmpty': 'Keine Messwerte. Starten Sie eine Messung auf dem Bildschirm „Messen“.',

  'table.time': 'Uhrzeit',
  'table.metric': 'Messgröße',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Niemieckie
     skróty stoją z kropką („1 Std.”) — pełne słowo łamało się na dwie linie. */
  'range.1m': '1 Min.',
  'range.1h': '1 Std.',
  'range.24h': '24 Std.',
  'range.7d': '7 Tage',
  'range.30d': '30 Tage',

  'chart.now': 'jetzt',
  'chart.countSub': {
    one: '{n} Messwert im gewählten Zeitraum',
    other: '{n} Messwerte im gewählten Zeitraum'
  },
  'chart.aria': '{name}, Zeitraum {range}, {count}, letzter Wert {value} {unit}.',
  'chart.ariaZone': '{name}, Zeitraum {range}, {count}, letzter Wert {value} {unit}, Zone: {zone}.',
  'chart.ariaEmpty': '{name} — keine Daten im Zeitraum {range}.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Assistenten und Hilfsfunktionen',
  'tools.note': 'Die Werkzeuge helfen dabei, eine Messung zu deuten. Alle sind sofort verfügbar, und die Messung selbst funktioniert unabhängig von ihnen.',

  'tool.thresholds.sub': 'Wann ein Wert eine Warnung auslösen soll',
  'tool.compare.sub': 'Welches von zwei Lichtern sanfter ist',
  'tool.calibration.sub': 'Die einzige Funktion, die die Genauigkeit wirklich erhöht',
  'tool.screenCheck.sub': 'Fünf Schritte und ein fertiges Urteil über den Bildschirm',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Schwellenzeitplan”
     kontra „Zeitplan”. Tak było i tak zostaje. */
  'tool.schedule.title': 'Schwellenzeitplan',
  'tool.schedule.sub': 'Andere Schwellen am Abend, ohne daran denken zu müssen',
  'tool.alerts.sub': 'Ein Signal, wenn die kritische Zone zu lange dauert',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Einstellungen',
  'more.thresholdsSub': 'Wann ein Wert eine Warnung auslösen soll',
  'more.docsSub': 'Wie man misst und was diese Messung nicht sagt',
  'more.appearanceTitle': 'Darstellung und Barrierefreiheit',

  'settings.theme': 'Design',
  'theme.auto': 'Wie im System',
  'theme.light': 'Hell',
  'theme.dark': 'Dunkel',

  'settings.textScale': 'Textgröße',
  'textScale.100': 'Standard',
  'textScale.115': 'Größer (115 %)',
  'textScale.130': 'Am größten (130 %)',

  'settings.contrast': 'Höherer Kontrast',
  'settings.contrastSub': 'Stärkere Ränder und dunklerer Hilfstext.',
  'settings.sound': 'Ton der Warnungen',
  'settings.soundSub': 'Ein kurzes Signal, wenn eine Expositionswarnung anspringt.',
  'settings.vibrate': 'Vibration bei Warnungen',
  'settings.vibrateSub': 'Funktioniert nur auf Geräten, die sie unterstützen.',

  'more.dataTitle': 'Daten',
  'more.clearHistory': 'Messverlauf löschen',
  'more.clearHistorySub': 'Löscht die gespeicherten Messwerte von diesem Gerät. Schwellen, Profile und Einstellungen bleiben.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'Die App ist vollständig kostenlos. ',
  'more.supportLink': 'Sie können sie freiwillig unterstützen.',

  'dialog.clearHistory.title': 'Den gespeicherten Verlauf löschen?',
  'dialog.clearHistory.body': {
    one: 'Wir löschen {n} gespeicherten Messpunkt von diesem Gerät. Das lässt sich nicht rückgängig machen. Schwellen, Profile und Einstellungen bleiben unberührt.',
    other: 'Wir löschen {n} gespeicherte Messpunkte von diesem Gerät. Das lässt sich nicht rückgängig machen. Schwellen, Profile und Einstellungen bleiben unberührt.'
  },
  'dialog.clearHistory.confirm': 'Verlauf löschen',
  'dialog.clearHistory.cancel': 'Behalten',

  'toast.historyCleared': 'Messverlauf gelöscht.',
  'toast.screenUnavailable': 'Dieser Bildschirm ist in dieser Version noch nicht verfügbar.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'Was diese App misst',
  'docs.leadText': 'Die Handykamera schaut auf eine beleuchtete Fläche, und fünfmal pro Sekunde berechnet die App die Mittelwerte der Kanäle R, G und B aus dem mittleren Ausschnitt des Bildes. Aus diesen drei Zahlen leitet sie sieben Messwerte ab.',
  'docs.limitsTitle': 'Grenzen der Methode',
  'docs.limitsText': 'Eine Kamera hat drei breite Farbkanäle, eine automatische Belichtung und einen automatischen Weißabgleich. Sie misst kein Spektrum und kennt keine absoluten Werte, deshalb ist die Helligkeit ein relativer Indikator und kein Lux. Farbtemperatur und zirkadiane Wirkung sind Näherungen, berechnet aus den sRGB-Farben. Die Abtastung mit {rate} Hz sieht Flimmern nur unterhalb von {limit} Hz — das Netzflimmern mit 100 Hz liegt außer Reichweite und die App wird es nie als Messwert ausgeben.',

  'note.howTo.repeat.title': 'Wiederholen Sie die Messung',
  'note.howTo.repeat.text': 'Ein einzelner Messwert ist eine Momentaufnahme. Ein gutes Dutzend Sekunden Messung ergibt ein verlässlicheres Bild.',

  'docs.scale': 'Skala',
  'docs.direction': 'Richtung',
  'docs.directionHigher': 'Höher ist besser',
  'docs.directionLower': 'Niedriger ist sanfter',
  'docs.privacyTitle': 'Daten und Privatsphäre',
  'docs.privacyText': 'Das Kamerabild wird nirgendwohin gesendet und nirgends gespeichert — aus jedem Einzelbild bleiben nur drei Zahlen. Messungen, Schwellen und Einstellungen liegen im Speicher des Browsers auf diesem Gerät. Die App stellt keine Netzanfragen und funktioniert offline.',
  'docs.freeLine': 'Alle sieben Messwerte, der Verlauf, das Diagramm, die Werkzeuge und der Offlinebetrieb funktionieren für jeden, ohne Konto und ohne Gebühr.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Alles ist verfügbar',
  'support.heroText': 'Alle sieben Messwerte, der Messverlauf, das Diagramm, alle Werkzeuge und der Offlinebetrieb funktionieren für jeden, sofort. Ohne Konto, ohne Grenzen und ohne Gebühr.',
  'support.whyTitle': 'Warum ich darum bitte',
  'support.whyText': '{app} entsteht nach Feierabend und verdient an niemandem: keine Werbung, keine Datensammlung, nichts zu verkaufen. Der Betrieb und die Weiterentwicklung — neue Messwerte, Korrekturen, Tests auf weiteren Telefonen — kosten Zeit. Wenn Ihnen die App genützt hat, können Sie etwas beisteuern. Sie müssen nicht.',
  'support.whatTitle': 'Was eine Spende bringt',
  'support.whatText': 'Nichts. Sie schaltet wirklich nichts frei und beschleunigt nichts — die App sieht davor und danach genau gleich aus und arbeitet genau gleich. Sie bringt nur so viel, dass der Autor weiß, dass diese Arbeit jemandem genützt hat.',
  'support.button': 'Einen Kaffee spendieren',
  'support.pendingTitle': 'Das Profil ist noch nicht angebunden',
  'support.pendingText': 'Hier gibt es noch keine Adresse, an die sich Unterstützung senden ließe. Sie erscheint an dieser Stelle, sobald sie bereit ist — bis dahin funktioniert in der App alles genau gleich.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'Die Schaltfläche öffnet die externe Seite von Buy Me a Coffee in einem neuen Tab. Das ist der einzige Moment, in dem irgendetwas dieses Gerät verlässt — und er tritt erst ein, nachdem Sie geklickt haben. Messungen, Verlauf und Einstellungen bleiben hier.',
  'privacy.externalPending': 'Sobald die Adresse vorliegt, öffnet ein Klick eine externe Seite in einem neuen Tab. Das wird der einzige Moment sein, in dem irgendetwas dieses Gerät verlässt. Messungen, Verlauf und Einstellungen bleiben hier.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (Ersatz in ui-core.js)',
  'boot.need.metrics': 'kein einziger Wert wird berechnet',
  'boot.need.bus': 'die Module sehen einander nicht mehr',
  'boot.need.ui': 'die Bildschirme lassen sich nicht umschalten',
  'boot.need.engine': 'Kamera und Messung starten nicht',
  'boot.need.support': 'der Bildschirm „Unterstützen“ bleibt leer',
  'boot.need.tools': 'der Reiter „Werkzeuge“ bleibt leer',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'Diese Module wurden nicht geladen: {list}.',
  'boot.consoleHint': 'Prüfen Sie die Reihenfolge und die Pfade der <script>-Tags in index.html.',
  'boot.incompleteTitle': 'Die App wurde unvollständig geladen',
  'boot.incompleteText': '{missing} Laden Sie die Seite neu; wenn das nicht hilft, sind die Dateien auf dem Server unvollständig.',
  'boot.newVersion': 'Es gibt eine neue Version der App.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'Was die Schwellen tun. ',
  'thresholds.noteText': 'Die Warnschwelle löst den gelben Zustand aus, die kritische Schwelle den roten. Eine Änderung wirkt sofort — auch auf den Messwert, der schon auf dem Bildschirm steht. Einen eigenen Satz Schwellen können Sie unter einem Namen speichern und jederzeit wieder aufrufen.',
  'thresholds.profilesTitle': 'Schwellenprofile',
  'thresholds.profilesSub': 'Die drei eingebauten und Ihre eigenen',
  'thresholds.customName': 'Name des eigenen Profils',
  'thresholds.customPlaceholder': 'z. B. Schlafzimmer am Abend',
  'thresholds.save': 'Aktuelle Schwellen speichern',
  'thresholds.saveHelp': 'Speichert genau die Schwellen, die oben eingestellt sind.',

  'profile.builtin.default.name': 'Standard',
  'profile.builtin.default.desc': 'Die Schwellen aus dem Katalog der Messgrößen — der Ausgangspunkt für alle Messungen.',
  'profile.builtin.evening.name': 'Abend — sanft',
  'profile.builtin.evening.desc': 'Warnt früher vor kühler Lichtfarbe und zirkadianer Wirkung.',
  'profile.builtin.work.name': 'Arbeit am Schreibtisch',
  'profile.builtin.work.desc': 'Lässt helles, kühles Tageslicht zu; achtet auf Flimmern und Gleichmäßigkeit.',
  'profile.custom.desc': 'Eigenes Profil, gespeichert am {date}.',

  'toast.thresholdsReset': 'Standardschwellen wiederhergestellt.',
  'toast.thresholdOrder': 'Die Warnschwelle muss niedriger sein als die kritische.',
  'toast.thresholdOrderInverted': 'Bei dieser Messgröße muss die Warnschwelle höher sein als die kritische.',
  'toast.profileNameMissing': 'Geben Sie einen Profilnamen an.',
  'toast.profileSaved': 'Profil „{name}“ gespeichert.',
  'toast.profileApplied': 'Profil „{name}“ angewendet.',
  'toast.profileApplyFailed': 'Dieses Profil ließ sich nicht anwenden.',
  'toast.profileRemoved': 'Profil gelöscht.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'Wozu der Zeitplan. ',
  'schedule.noteText': 'Am Abend sind andere Schwellen sinnvoll als mittags. Eine Regel „von–bis“ tauscht das Profil von selbst, damit man nicht daran denken muss. Der Zeitplan startet und stoppt niemals eine Messung.',
  'schedule.toggle': 'Automatisches Umschalten einschalten',
  'schedule.toggleSub': 'Wird jede Minute gegen die Uhr des Geräts geprüft.',
  'schedule.emptyTitle': 'Keine Regeln',
  'schedule.emptyText': 'Fügen Sie die erste Regel mit der Schaltfläche unten hinzu.',
  'schedule.add': 'Regel hinzufügen',
  'schedule.to': 'bis',
  'schedule.profile': 'Profil',
  'schedule.fromAria': 'Regel {n}: Startzeit',
  'schedule.toAria': 'Regel {n}: Endzeit',
  'toast.scheduleTimeFormat': 'Geben Sie die Uhrzeiten im Format 22:00 an.',
  'toast.scheduleEnded': 'Der Zeitplan ist zu Ende — die vorherigen Schwellen sind zurück.',
  'toast.scheduleApplied': 'Der Zeitplan hat das Profil „{name}“ eingeschaltet.',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'Was die Warnung tut. ',
  'alerts.noteText': 'Sie beobachtet eine einzige Messgröße und meldet sich erst dann, wenn diese die gewählte Zone ununterbrochen über die eingestellte Zeit hält. Sie stoppt niemals die Messung und verdeckt keine Schaltflächen.',
  'alerts.toggle': 'Expositionswarnungen einschalten',
  'alerts.toggleSub': 'Sie wirken nur während einer laufenden Messung.',
  'alerts.metric': 'Beobachtete Messgröße',
  'alerts.level': 'Ab welcher Zone',
  'alerts.level.warning': 'Warnzone und höher',
  'alerts.level.critical': 'Nur die kritische',
  'alerts.sustain': 'Nach wie vielen Sekunden ununterbrochen',
  'alerts.sustainHelp': 'Kürzere Zeiten geben mehr Fehlalarme, wenn Sie das Telefon bewegen.',
  'alerts.sound': 'Kurzes Tonsignal',
  'alerts.soundSub': 'Der Ton wird lokal erzeugt. Er lässt sich auch global auf dem Bildschirm „Mehr“ abschalten.',
  'alerts.barTitle': 'Expositionswarnung',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} hält die Warnzone seit {seconds} s — jetzt {value} {unit}.',
  'alerts.message.critical': '{name} hält die kritische Zone seit {seconds} s — jetzt {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'Wie man vergleicht. ',
  'compare.noteText': 'Starten Sie die Messung, richten Sie die Kamera auf die erste Quelle und speichern Sie sie als A. Ohne Abstand und Winkel zu ändern, wechseln Sie das Licht und speichern B. Der Vergleich hat nur dann einen Sinn, wenn die Szene dieselbe ist.',
  'compare.slotA': 'Licht A',
  'compare.slotB': 'Licht B',
  'compare.save': 'Aktuellen Messwert speichern',
  'compare.savedAt': 'Gespeichert am {date}, {time}',
  'compare.empty': 'Noch nichts gespeichert.',
  'compare.verdictTitle': 'Ergebnis des Vergleichs',
  'compare.verdictEmpty': 'Speichern Sie beide Lichter, um zu sehen, welches sanfter ist.',
  'compare.notEnough': 'Zu wenig Daten, um diese beiden Messungen zu vergleichen.',
  'compare.tie': 'Beide Quellen kommen praktisch gleich heraus ({metric}: {a} und {b} {unit}). Der Unterschied liegt im Rauschen der Messung.',
  'compare.betterA': 'Sanfter ist Licht A — {metric} beträgt {better} {unit} gegenüber {worse} {unit}.',
  'compare.betterB': 'Sanfter ist Licht B — {metric} beträgt {better} {unit} gegenüber {worse} {unit}.',
  'compare.clear': 'Vergleich löschen',
  'toast.compareSavedA': 'Licht A gespeichert.',
  'toast.compareSavedB': 'Licht B gespeichert.',
  'toast.compareCleared': 'Vergleich gelöscht.',
  'toast.measureFirst': 'Starten Sie zuerst eine Messung auf dem Bildschirm „Messen“.',

  /* Nazwa wielkości w środku zdania. Po polsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. Wyjątkiem
     jest przymiotnik w „zirkadiane Wirkung”: on w środku zdania małą. */
  'metric.share.nameLower': 'Blauanteil',
  'metric.brightness.nameLower': 'Szenenhelligkeit',
  'metric.kelvin.nameLower': 'Farbtemperatur',
  'metric.melanopic.nameLower': 'zirkadiane Wirkung',
  'metric.flicker.nameLower': 'Flimmern',
  'metric.uniformity.nameLower': 'Gleichmäßigkeit',
  'metric.comfort.nameLower': 'Sehkomfort',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'Warum das funktioniert. ',
  'calib.noteText': 'Der Sensor der Kamera hat eine feste Abweichung zwischen den Kanälen. Die Messung eines weißen Blattes zeigt, wie groß sie ist, und erlaubt, sie abzuziehen. Das ist die einzige Funktion dieser App, die die Genauigkeit wirklich erhöht — und sie macht aus der Kamera trotzdem kein Spektrometer.',
  'calib.step1': 'Legen Sie ein weißes Blatt unter das gemessene Licht',
  'calib.step2': 'Starten Sie die Messung und füllen Sie das Bild mit dem Blatt',
  'calib.step3': 'Drücken Sie „Kalibrieren“ und bewegen Sie das Telefon 3 Sekunden lang nicht',
  'calib.done': 'Kalibriert am {date}, {time}.',
  'calib.none': 'Keine Kalibrierung. Das Messen funktioniert, behandeln Sie die Werte als Vergleichswerte.',
  'calib.gain': 'Verstärkung {channel}',
  'calib.gainsLabel': 'Verstärkungen der Kanäle',
  'calib.gainsUnset': 'nicht gesetzt',
  'calib.start': 'Kalibrieren (3 s)',
  'calib.clear': 'Kalibrierung löschen',
  'toast.calibCleared': 'Kalibrierung gelöscht.',
  'calib.error.noEngine': 'Das Messmodul ist nicht verfügbar.',
  'calib.error.notRunning': 'Starten Sie zuerst die Messung und richten Sie die Kamera auf ein weißes Blatt.',
  'calib.error.busy': 'Die Kalibrierung läuft bereits.',
  'calib.error.tooFewSamples': 'Zu wenig Proben. Prüfen Sie, ob die Messung wirklich läuft.',
  'calib.error.tooDark': 'Das Bild ist zu dunkel für eine Kalibrierung. Beleuchten Sie das Blatt besser und versuchen Sie es erneut.',
  'calib.error.tooSkewed': 'Die Abweichung der Kanäle ist zu groß, um sie als Kalibrierung anzuerkennen. Verwenden Sie weißes Papier in gleichmäßigem Licht.',
  'calib.ok': 'Kalibriert. Farbtemperatur und zirkadiane Wirkung sind jetzt genauer.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'Wozu das dient. ',
  'screencheck.noteText': 'Fünf Schritte prüfen einen Bildschirm so, wie man ihn in einem Test prüft: Weiß bei zwei Helligkeiten, die Gleichmäßigkeit der Hintergrundbeleuchtung und ob der Nachtmodus des Systems wirklich etwas ändert. Der Assistent liest eine laufende Messung; er startet sie nicht selbst.',
  'screencheck.step.white100.title': 'Weiß bei voller Helligkeit',
  'screencheck.step.white100.hint': 'Öffnen Sie eine weiße Seite auf dem Bildschirm, stellen Sie die Helligkeit auf das Maximum und füllen Sie das Bild mit dem Bildschirm.',
  'screencheck.step.white20.title': 'Weiß bei geringer Helligkeit',
  'screencheck.step.white20.hint': 'Senken Sie die Helligkeit des Bildschirms auf etwa ein Fünftel und ändern Sie den Bildausschnitt nicht.',
  'screencheck.step.corners.title': 'Die Ecken des Bildschirms',
  'screencheck.step.corners.hint': 'Gehen Sie zurück auf volle Helligkeit und zeigen Sie der Kamera den ganzen Bildschirm — wir prüfen die Gleichmäßigkeit der Hintergrundbeleuchtung.',
  'screencheck.step.nightOff.title': 'Nachtmodus aus',
  'screencheck.step.nightOff.hint': 'Vergewissern Sie sich, dass der Blaulichtfilter ausgeschaltet ist.',
  'screencheck.step.nightOn.title': 'Nachtmodus ein',
  'screencheck.step.nightOn.hint': 'Schalten Sie den Blaulichtfilter im System ein und wiederholen Sie denselben Bildausschnitt.',
  'screencheck.stepHeading': 'Schritt {n} von {total}: {title}',
  'screencheck.idleTitle': 'Der Assistent läuft nicht',
  'screencheck.idleHint': 'Starten Sie eine Messung auf dem Bildschirm „Messen“, kommen Sie dann hierher zurück und drücken Sie „Assistenten starten“.',
  'screencheck.next': 'Schritt speichern und weiter',
  'screencheck.cancel': 'Abbrechen',
  'screencheck.start': 'Assistenten starten',
  'screencheck.clearResult': 'Ergebnis löschen',
  'screencheck.resultTitle': 'Ergebnis',
  'screencheck.resultEmpty': 'Es wurde noch kein Schritt gespeichert.',
  'screencheck.resultPartial': '{done} von {total} Schritten gespeichert. Die Schlüsse erscheinen, sobald es etwas zu vergleichen gibt.',
  'screencheck.note.uniformityLow': 'Die Gleichmäßigkeit der Hintergrundbeleuchtung beträgt {value} % — im Bild sind deutliche Helligkeitsunterschiede zu sehen.',
  'screencheck.note.uniformityOk': 'Die Hintergrundbeleuchtung ist gleichmäßig ({value} %).',
  'screencheck.note.nightWorks': 'Der Nachtmodus senkt den Blauanteil um {value} Prozentpunkte — er wirkt.',
  'screencheck.note.nightWeak': 'Der Nachtmodus ändert den Blauanteil nur um {value} Prozentpunkte. Das ist weniger, als ein Systemfilter üblicherweise bringt.',
  'screencheck.note.pwm': 'Bei geringer Helligkeit steigt das Flimmern von {from} % auf {to} % — das ist ein typisches Zeichen für Pulsweitendimmung (PWM).',
  'toast.screencheckDone': 'Der Assistent ist fertig. Das Ergebnis steht unten.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'Woher diese Zahlen kommen. ',
  'reports.noteText': 'Der Bericht wird aus dem Verlauf berechnet, der auf diesem Gerät gespeichert ist — ein Punkt alle fünf Sekunden. Das Messmodul sammelt ihn seit der ersten Messung, deshalb ist der Bericht sofort fertig.',
  'reports.rangeAria': 'Zeitraum des Berichts',
  'reports.day': 'Letzte 24 Stunden',
  'reports.week': 'Letzte 7 Tage',
  'reports.date': 'Bericht für den {date}.',
  'report.headerDay': 'Tag von {from} bis {to} — {count}.',
  'report.headerWeek': 'Woche von {from} bis {to} — {count}.',
  'count.points': { one: '{n} Punkt', other: '{n} Punkte' },
  'count.samples': { one: '{n} Probe', other: '{n} Proben' },
  'report.emptyTitle': 'Keine Daten in diesem Zeitraum',
  'report.emptyText': 'Starten Sie eine Messung auf dem Bildschirm „Messen“ — der Verlauf speichert sich von selbst.',
  'report.colAvg': 'Durchschnitt',
  'report.colMin': 'Minimum',
  'report.colMax': 'Maximum',
  'report.zonesTitle': 'Verteilung der Zonen',
  'report.worstHour': 'Schlechteste Tageszeit',
  'report.worstHourNone': 'keine sticht heraus',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'Was sich damit tun lässt',
  'report.disclaimerTitle': 'Das ist keine gesundheitliche Beratung. ',
  'report.disclaimerText': 'Die Schlüsse folgen ausschließlich aus dem, was die Kamera dieses Telefons gesehen hat. Die App misst kein Spektrum, kennt keine Lux und stellt keine Diagnose.',

  'advice.melanopic': 'Die mittlere zirkadiane Wirkung betrug {value}×. Am Abend lohnt es sich, unter 0,50 zu gehen — am einfachsten mit einer wärmeren Glühbirne oder dem Nachtmodus.',
  'advice.kelvin': 'Das Licht war kühl (im Schnitt {value} K). Für die Arbeit ist das einwandfrei; in den zwei Stunden vor dem Schlafengehen ist unter 3000 K besser.',
  'advice.flicker': 'Es wurde spürbares Flimmern festgestellt (im Schnitt {value} %). Dahinter steckt meist ein billiger Dimmer oder das Netzteil der Hintergrundbeleuchtung.',
  'advice.uniformity': 'Das Licht verteilt sich ungleichmäßig ({value} %). Die Lampe zu verschieben oder ihren Winkel zu ändern bringt meist mehr als ein Wechsel der Glühbirne.',
  'advice.worstHour': 'Die schlechteste Tageszeit ist {hour}:00 Uhr — dort sammeln sich die meisten Messwerte außerhalb der Norm.',
  'advice.none': 'In diesem Zeitraum sticht nichts über die Norm hinaus. Am meisten brächte jetzt ein Vergleich zweier Lichtquellen im A/B-Vergleich.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'Format der Datei. ',
  'export.noteText': 'Semikolon als Spaltentrennzeichen, Komma als Dezimaltrennzeichen, Kodierung UTF-8 mit BOM. Eine solche Datei öffnet das deutsche Excel, ohne dass man etwas einstellen muss.',
  'export.range': 'Zeitraum der Daten',
  'export.columns': 'Spalten in der Datei',
  'export.chipFilled': ' — Spalte gefüllt',
  'export.help': 'Die Datei enthält alle sieben Spalten — das Messmodul berechnet sie ab der ersten Messung und alle landen in der Datei.',
  'export.run': 'CSV-Datei speichern',
  'export.previewEmpty': 'Keine Messwerte in diesem Zeitraum. Starten Sie eine Messung — der Verlauf speichert sich von selbst.',
  'csv.range.hour': 'Letzte Stunde',
  'csv.range.day': 'Letzte 24 Stunden',
  'csv.range.week': 'Letzte 7 Tage',
  'csv.range.month': 'Letzte 30 Tage',
  'csv.colDate': 'Datum',
  'csv.colTime': 'Uhrzeit',
  'csv.colZone': 'Zone',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'Im gewählten Zeitraum gibt es überhaupt keine Messwerte.',
  'toast.exportFailed': 'Dieser Browser hat das Speichern der Datei nicht zugelassen.',
  'toast.exportSaved': {
    one: 'Datei {filename} gespeichert ({n} Zeile).',
    other: 'Datei {filename} gespeichert ({n} Zeilen).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} Std. {m} Min.',
  'duration.ms': '{m} Min. {s} s',
  'duration.s': '{s} s'
});
