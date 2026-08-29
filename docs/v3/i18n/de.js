/* docs/v3/i18n/de.js — słownik WŁASNY wersji v3, niemiecki.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/de.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js tego katalogu — pilnuje
 * tego docs/shared/i18n/keys.test.js. Kluczy, które stoją w słowniku wspólnym
 * (nazwy stref, zdania oceniające, noty o granicach metody, nazwy i opisy
 * siedmiu wielkości, zastrzeżenie z rozporządzenia (UE) 2017/745), tu NIE MA —
 * poza jednym świadomym nadpisaniem, opisanym przy 'verdict.critical.comfort'.
 *
 * REJESTR: forma grzecznościowa „Sie”, dokładnie jak w docs/shared/i18n/de.js.
 * Oba pliki składają się w JEDEN obiekt napisów, więc rejestr musi być jeden.
 * Cudzysłowy niemieckie: „ … “. Przecinek dziesiętny (0,50 — 2,5 Hz).
 *
 * TERMINOLOGIA — wzięta ze słownika wspólnego i trzymana bez wyjątków:
 *   Blauanteil, Szenenhelligkeit, Farbtemperatur, zirkadiane Wirkung
 *   (współczynnik: melanopischer Faktor), Flimmern, Gleichmäßigkeit,
 *   Sehkomfort; strefy: Im Normbereich / Vorsicht / Kritisch;
 *   „Näherungen, berechnet aus den sRGB-Farben”, „Außerhalb des Bereichs
 *   der Methode”, „behandeln Sie die Werte als Vergleichswerte”.
 * ODPOWIEDNIKI WŁASNE v3: Verlauf (historia), Sitzung (sesja), Probe
 *   (próbka), Größe (wielkość), Schwelle (próg), Warnschwelle / Alarmschwelle
 *   (próg uwagi / próg krytyczny), Pult (pulpit), Messwerk (silnik pomiaru),
 *   Testbild (plansza), Rekorder (rejestrator).
 *
 * ZAPIS LICZB WE WZORACH. Polska redakcja pisze przecinek dziesiętny
 * („0,3320”), angielska kropkę — niemiecki idzie za polskim, bo tak samo
 * zapisuje ułamki. Liczby wstawiane przez '{…}' formatuje warstwa językowa.
 * Przed znakiem % nie stawiamy spacji — tak jak w docs/shared/i18n/de.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['de'] = Object.assign(window.I18nData['de'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. */
  'app.wordmark': 'LICHTMONITOR',

  'state.idle': 'Bereit',
  'state.starting': 'Startet',
  'state.running': 'Messung',
  'state.runningTpl': 'Messung {time}',
  'state.stopped': 'Gestoppt',
  'state.error': 'Kamerafehler',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5,0 po niemiecku, 5.0 po angielsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'Messung starten',
  'keys.starting': 'Startet…',
  'keys.stop': 'Stopp',
  'keys.flip': 'Wechseln',
  'keys.flipAria': 'Kamera wechseln, vorn oder hinten',
  'keys.menu': 'Menü',
  'keys.menuAria': 'Liste der Module',
  'keys.back': '‹ Zurück',
  'keys.backAria': 'Zurück zum Pult',
  'keys.dash': 'Pult',
  'keys.zoom': 'Vorschau vergrößern',
  'keys.retry': 'Erneut versuchen',
  'keys.refresh': 'Aktualisieren',
  'keys.close': 'Schließen',
  'keys.show': 'Anzeigen',
  'keys.apply': 'Anwenden',
  'keys.remove': 'Löschen',

  'monitor.legend': 'Kontrollvorschau',
  'monitor.badge': 'Live',

  'aim.title': 'Ausrichten',
  'aim.hint': 'Der Rahmen zeigt genau den Bildausschnitt, den die App misst.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'Hauptkanal',
  'readout.thresholdTpl': '(Schwelle {value})',
  'readout.contextTpl': 'min {min} · Mittel {avg} · max {max} — letzte 60 s',
  'readout.contextEmpty': 'keine Daten aus den letzten 60 s',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'Was das bedeutet: {name}',
  'aria.channel': '{name}, {value}, {zone}. Auf der großen Anzeige zeigen.',
  'aria.channelStale': '{name}, keine Daten. Auf der großen Anzeige zeigen.',
  'aria.scale': 'Skala: {name}, von {min} bis {max}. Jetzt {value}, {zone}. Warnschwelle {warn}, Alarmschwelle {crit}.',
  'aria.readout': '{name}: {value}, {zone}.',
  'aria.readoutApprox': '{name}: etwa {value}, {zone}. Ein Näherungswert.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'Skala des Hauptkanals. Keine Daten',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': 'Drücken Sie „Messung starten“, richten Sie das Telefon auf eine beleuchtete Fläche und halten Sie es einige Sekunden ruhig.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'Der Sehkomfort ist niedrig. Sehen Sie in Modul 01 nach, was ihn senkt.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'Beginnen Sie mit der Taste „Messung starten“ am unteren Rand des Bildschirms. Die Kamera schaltet sich erst ein, nachdem Sie sie gedrückt haben.',
  'transient.measureStopped': 'Messung beendet · {time} · im Verlauf gespeichert.',
  'transient.newVersion': 'Es gibt eine neue Version der App.',
  'transient.thresholdsSaved': 'Schwellen gespeichert.',
  'transient.thresholdsRejected': 'Nicht gespeichert — Warnschwelle und Alarmschwelle dürfen einander nicht überkreuzen.',
  'transient.historyCleared': 'Verlauf gelöscht.',

  'live.lead': 'Hauptkanal: {name}, {value}, {zone}.',
  'live.ready': 'Bewertung fertig. {name} {value}, {zone}.',
  'live.started': 'Messung gestartet.',
  'livebar.stopped': 'Messung gestoppt',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'Es gibt noch keine Aufzeichnungen. Der Verlauf entsteht während der Messung — messen Sie eine Minute lang und kommen Sie hierher zurück.',
  'empty.recorderNoRange': 'In diesem Zeitraum wurde nicht gemessen.',
  'empty.coverageTpl': 'Die Messung deckte {done} von {total} Stunden ab.',
  'empty.reportsNoData': 'Der Tagesbericht entsteht nach dem ersten vollen Tag mit Messungen.',
  'empty.compareOneSession': 'Für einen Vergleich braucht es zwei abgeschlossene Sitzungen. Bisher haben Sie eine.',
  'empty.exportNoData': 'Es gibt nichts zu exportieren. Starten Sie eine Messung, damit der Verlauf Inhalt bekommt.',
  'empty.alertsOff': 'Die Alarme sind ausgeschaltet. Nach dem Einschalten wirken sie nur, solange die App geöffnet ist.',
  'empty.scheduleEmpty': 'Es ist keine Uhrzeit eingestellt. Der Zeitplan läuft nur bei geöffneter App.',
  'empty.historyEmpty': 'Der Verlauf ist leer.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'Liste der Module',

  'modules.01.title': 'Rekorder',
  'modules.01.desc': 'Der Verlauf der Messung über die Zeit, von einer Minute bis zu dreißig Tagen.',
  'modules.02.title': 'Schwellen',
  'modules.02.desc': 'Setzen Sie eigene Warn- und Alarmgrenzen für jede Größe.',
  'modules.03.title': 'Kalibrierung',
  'modules.03.desc': 'Der Bezug auf eine bekannte Lichtquelle — und was die Kalibrierung nicht behebt.',
  'modules.04.title': 'Berichte',
  'modules.04.desc': 'Tages- und Wochenübersichten in Form eines Ausdrucks.',
  'modules.05.title': 'Export',
  'modules.05.desc': 'Die Messwerte als CSV- oder JSON-Datei, mit erklärten Spalten.',
  'modules.06.title': 'Vergleich',
  'modules.06.desc': 'Zwei Sitzungen nebeneinander, mit dem Unterschied als Zahl.',
  'modules.07.title': 'Bildschirmtest',
  'modules.07.desc': 'Testbilder, um den eigenen Monitor Schritt für Schritt zu prüfen.',
  'modules.08.title': 'Zeitplan',
  'modules.08.desc': 'Messungen zu selbst gesetzten Zeiten.',
  'modules.09.title': 'Alarme',
  'modules.09.desc': 'Eine Meldung, sobald eine Schwelle überschritten ist — und wann sie ausbleibt.',
  'modules.10.title': 'Unterstützen',
  'modules.10.desc': 'Die App ist vollständig kostenlos. Hier können Sie dem Autor einen Kaffee spendieren.',
  'modules.11.title': 'Dokumentation',
  'modules.11.desc': 'Was diese Messung ist — und was sie ganz sicher nicht ist.',
  'modules.12.title': 'Einstellungen',
  'modules.12.desc': 'Design, Textgröße, weniger Bewegung, Verlauf löschen.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'Messkanäle',
  'channels.pick': 'Auf der großen Anzeige zeigen',
  'channels.stale': 'keine Daten',
  'channels.approx': 'ein Näherungswert',

  'help.unit': 'Einheit',
  'help.range': 'Bereich',
  'help.thresholds': 'Schwellen',
  'help.warn': 'Warnschwelle',
  'help.crit': 'Alarmschwelle',
  'help.now': 'jetzt',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „Größe” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'Größe',
  'col.unit': 'Einheit',
  'col.range': 'Bereich',
  'col.direction': 'Richtung',
  'col.time': 'Uhrzeit',
  'col.date': 'Datum',
  'col.zone': 'Zone',
  'col.avg': 'Durchschnitt',
  'col.min': 'Minimum',
  'col.max': 'Maximum',
  'col.name': 'Spalte',
  'col.meaning': 'Inhalt',
  'col.channel': 'Kanal',
  'col.gain': 'Verstärkung',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'Zeitraum',
  'recorder.range.60s': '60 s',
  'recorder.range.15min': '15 min',
  'recorder.range.1h': '1 Std.',
  'recorder.range.24h': '24 Std.',
  'recorder.range.30d': '30 Tage',
  'recorder.gap': 'keine Messung',
  'recorder.sessionTitle': 'Statistik der Sitzung',
  'recorder.zonesCaption': 'Zonenverteilung für den Blauanteil',
  'recorder.tableCaption': 'Messwerte aus dem gewählten Zeitraum',
  'recorder.crosshair': 'Ablesekreuz',
  'recorder.prevAria': 'Früherer Punkt',
  'recorder.nextAria': 'Späterer Punkt',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'Darstellung',
  'settings.themeLabel': 'Design',
  'settings.themeSystem': 'Wie im System',
  'settings.themeLight': 'Hell',
  'settings.themeDark': 'Dunkel',
  'settings.themeHint': 'Das Design „wie im System“ wechselt zusammen mit der Einstellung des Telefons.',
  'settings.textLabel': 'Textgröße',
  /* Mnożnik jako LICZBA we wstawce — 1,15 po niemiecku, 1.15 po angielsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'Vergrößert die ganze Oberfläche, nicht nur die Buchstaben — Tasten und Zeilen wachsen mit dem Text.',
  'settings.motionGroup': 'Bewegung',
  'settings.motionLabel': 'Bewegung reduzieren',
  'settings.motionHint': 'Schaltet alle Übergänge ab. Der Zeiger der Skala springt dann einmal pro Sekunde, statt zu gleiten.',
  'settings.dataTitle': 'Daten',
  'settings.clearLabel': 'Verlauf löschen',
  'settings.clearHintTpl': 'Im Verlauf stehen jetzt {count} gespeicherte Punkte.',
  'settings.clearHintEmpty': 'Der Verlauf ist leer.',
  'settings.clearTitle': 'Verlauf löschen?',
  'settings.clearConfirm': 'Den ganzen Messverlauf löschen? Das lässt sich nicht rückgängig machen.',
  'settings.clearKey': 'Löschen',
  'settings.aboutTitle': 'Über die App',
  'settings.versionTpl': '{app}, Version {version}.',
  'settings.offlineText': 'Die App funktioniert ohne Netz. Nach dem ersten Öffnen liegen alle ihre Dateien im Speicher des Browsers, der Flugmodus ändert also nichts. Nichts wird an irgendeinen Server gesendet, denn die App stellt keine Netzanfragen.',
  'settings.docsKey': 'Dokumentation öffnen',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'Abbrechen',
  'common.save': 'Speichern',
  'common.reset': 'Standard wiederherstellen',
  'common.yes': 'Ja',
  'common.no': 'Nein',
  'common.on': 'Ein',
  'common.off': 'Aus',
  'common.sep': ' · ',
  'common.stepsTitle': 'Schritt für Schritt',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'Wozu eigene Schwellen',
  'modules.02.intro': 'Die Schwelle entscheidet, wann die App „Vorsicht“ sagt und wann „Kritisch“. Die Standardwerte sind unsere redaktionelle Einschätzung, keine Norm — wenn Sie unter anderen Bedingungen messen, verschieben Sie sie nach Ihrem Bedarf. Die Bewertung und der Satz am Pult werden sofort aus den neuen Schwellen berechnet.',
  'modules.02.orderNormal': 'Die Warnschwelle muss unter der Alarmschwelle liegen.',
  'modules.02.orderInvert': 'Hier ist ein höherer Wert besser, deshalb liegt die Warnschwelle über der Alarmschwelle.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'Vorschau der Skala: {name}',
  'modules.02.nowTpl': 'jetzt {value}',
  'modules.02.resetDone': 'Standardschwellen wiederhergestellt.',
  'modules.02.profilesTitle': 'Profile',
  'modules.02.profilesHint': 'Ein Profil ist ein gespeicherter Satz von Schwellen für alle sieben Größen. Wird ein Profil angewendet, werden sie alle auf einmal ausgetauscht.',
  'modules.02.profileSaveKey': 'Aktuelle Schwellen speichern',
  'modules.02.profileNameLabel': 'Name des neuen Profils',
  'modules.02.profileNameHint': 'Der Name bleibt auf diesem Gerät. Höchstens 40 Zeichen.',
  'modules.02.profileNameEmpty': 'Geben Sie einen Profilnamen an.',
  'modules.02.profileSavedTpl': 'Profil „{name}“ gespeichert.',
  'modules.02.profileAppliedTpl': 'Profil „{name}“ angewendet.',
  'modules.02.profileRemovedTpl': 'Profil „{name}“ gelöscht.',
  'modules.02.profileFailed': 'Dieses Profil ließ sich nicht anwenden.',
  'modules.02.profileCustomTpl': 'Eigenes Profil, gespeichert am {date}.',
  'modules.02.builtin.default.name': 'Standard',
  'modules.02.builtin.default.desc': 'Die Schwellen aus dem Katalog der Größen — der Ausgangspunkt für jede Messung.',
  'modules.02.builtin.evening.name': 'Abend — sanft',
  'modules.02.builtin.evening.desc': 'Warnt früher vor kühler Lichtfarbe und zirkadianer Wirkung.',
  'modules.02.builtin.work.name': 'Arbeit am Schreibtisch',
  'modules.02.builtin.work.desc': 'Lässt helles, kühles Tageslicht zu; achtet auf Flimmern und Gleichmäßigkeit.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'Warum das funktioniert',
  'modules.03.why': 'Der Sensor einer Kamera hat einen festen Versatz zwischen seinen Kanälen. Ein weißes Blatt Papier zu messen zeigt, wie groß dieser Versatz ist, und erlaubt es, ihn abzuziehen. Das ist die einzige Funktion dieser App, die die Genauigkeit wirklich erhöht — und sie macht aus einer Kamera immer noch kein Spektrometer.',
  'modules.03.steps.1': 'Legen Sie ein weißes Blatt Papier unter das Licht, das Sie messen.',
  'modules.03.steps.2': 'Drücken Sie am Pult auf „Messung starten“ und füllen Sie den Bildausschnitt mit dem Blatt.',
  'modules.03.steps.3': 'Kommen Sie hierher zurück, drücken Sie „Kalibrieren“ und halten Sie das Telefon drei Sekunden lang ruhig.',
  'modules.03.runKey': 'Kalibrieren (3 s)',
  'modules.03.clearKey': 'Kalibrierung löschen',
  'modules.03.busyTpl': 'Das Blatt wird gemessen… noch {sec} s',
  'modules.03.statusNone': 'Keine Kalibrierung. Das Messen funktioniert, behandeln Sie die Werte als Vergleichswerte.',
  'modules.03.statusOnTpl': 'Kalibriert am {date} um {time}.',
  'modules.03.gainsTitle': 'Kanalverstärkungen',
  'modules.03.gainR': 'Rot',
  'modules.03.gainG': 'Grün',
  'modules.03.gainB': 'Blau',
  'modules.03.gainsNone': 'nicht gesetzt',
  'modules.03.needRunning': 'Starten Sie zuerst die Messung und richten Sie die Kamera auf ein weißes Blatt Papier.',
  'modules.03.tooFew': 'Zu wenige Proben. Prüfen Sie, ob die Messung wirklich läuft.',
  'modules.03.tooDark': 'Das Bild ist zu dunkel zum Kalibrieren. Beleuchten Sie das Blatt besser und versuchen Sie es erneut.',
  'modules.03.refused': 'Der Versatz zwischen den Kanälen ist zu groß, um ihn als Kalibrierung anzuerkennen. Nehmen Sie ein weißes Blatt Papier in gleichmäßigem Licht.',
  'modules.03.done': 'Kalibriert. Farbtemperatur und zirkadiane Wirkung werden jetzt genauer.',
  'modules.03.cleared': 'Kalibrierung gelöscht.',
  'modules.03.limitsTitle': 'Was die Kalibrierung nicht behebt',
  'modules.03.limits.1': 'Die Kalibrierung gleicht die drei Kanäle der Kamera an und sonst nichts. Sie gibt der Kamera kein Spektrum, deshalb bleiben Farbtemperatur und zirkadiane Wirkung Näherungen, berechnet aus den sRGB-Farben.',
  'modules.03.limits.2': 'Sie macht aus der Szenenhelligkeit keine absolute Größe — diese Zahl bleibt relativ. Sie schaltet weder die automatische Belichtung noch den automatischen Weißabgleich ab, die den Messwert im Verborgenen verschieben.',
  'modules.03.limits.3': 'Sie überträgt sich nicht auf anderes Licht: Eine Kalibrierung unter einer Glühbirne beschreibt genau diese Glühbirne. Bei einer anderen Quelle wiederholen Sie sie. Und sie ändert nichts daran, was diese Messung nicht ist — sie ist weiterhin keine Untersuchung und keine Grundlage für die Diagnose einer Krankheit.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'Zeitraum des Berichts',
  'modules.04.rangeDay': 'Tag',
  'modules.04.rangeWeek': 'Woche',
  'modules.04.headTpl': 'Von {from} bis {to} · {count} Punkte im Verlauf.',
  'modules.04.tableTitle': 'Zusammenstellung',
  'modules.04.tableCaption': 'Durchschnitt, Minimum und Maximum im gewählten Zeitraum',
  'modules.04.panoramaTitle': 'Panorama',
  'modules.04.panoramaAriaTpl': 'Panorama: {name}, {span}.',
  'modules.04.panoramaSpanDay': 'der letzte Tag, aufgeteilt nach Stunden',
  'modules.04.panoramaSpanWeek': 'die letzte Woche, aufgeteilt nach Tagen',
  'modules.04.panoramaHint': 'Höhe und Farbe eines Balkens sagen dasselbe: im Normbereich — niedrig, Vorsicht — mittel, kritisch — voll. Ein Strich an der Grundlinie steht für eine Stunde ohne Messung.',
  'modules.04.coverageDayTpl': 'Die Messung deckte {done} von {total} Stunden ab.',
  'modules.04.coverageWeekTpl': 'Die Messung deckte {done} von {total} Tagen ab.',
  'modules.04.zonesTitle': 'Zonenverteilung',
  'modules.04.zonesCaptionTpl': 'Berechnet für den Hauptkanal: {name}.',
  'modules.04.worstTpl': 'Schwierigste Zeit: {value}.',
  'modules.04.worstNone': 'keine sticht heraus',
  'modules.04.worstHourTpl': '{hour} Uhr',
  'modules.04.adviceTitle': 'Was sich tun lässt',
  'modules.04.adviceMelanopicTpl': 'Die zirkadiane Wirkung lag im Durchschnitt bei {value}×. Am Abend lohnt es sich, unter 0,50 zu gehen — am einfachsten mit einer wärmeren Glühbirne oder dem Nachtmodus.',
  'modules.04.adviceKelvinTpl': 'Das Licht war kühl (im Durchschnitt {value} K). Zum Arbeiten ist das einwandfrei; in den zwei Stunden vor dem Schlafengehen ist unter 3000 K sanfter.',
  'modules.04.adviceFlickerTpl': 'Es ist deutliches Flimmern zu sehen (im Durchschnitt {value}%). Dahinter steckt meist ein billiger Dimmer oder das Netzteil der Hintergrundbeleuchtung.',
  'modules.04.adviceUniformityTpl': 'Das Licht verteilt sich ungleichmäßig ({value}%). Die Lampe zu verschieben oder ihren Winkel zu ändern bringt meist mehr als ein Wechsel der Glühbirne.',
  'modules.04.adviceWorstTpl': 'Die meisten Messwerte außerhalb der Schwellen fallen auf {hour} Uhr.',
  'modules.04.adviceNone': 'In diesem Zeitraum sticht nichts über die gesetzten Schwellen hinaus.',
  'modules.04.limitsTitle': 'Das ist keine gesundheitliche Beratung',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'Die Schlussfolgerungen ergeben sich ausschließlich aus dem, was die Kamera dieses Telefons gesehen hat. Die App misst kein Spektrum und stellt keine Diagnose.',
  'modules.04.printHint': 'Diese Seite ist wie ein Ausdruck angelegt: Tabelle und Beschriftungen lesen sich auf Papier, unter der Systemlupe und im Screenreader gleich.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'Zeitraum der Daten',
  'modules.05.range1h': 'Stunde',
  'modules.05.range24h': 'Tag',
  'modules.05.range7d': '7 Tage',
  'modules.05.range30d': '30 Tage',
  'modules.05.csvKey': 'CSV-Datei speichern',
  'modules.05.jsonKey': 'JSON-Datei speichern',
  'modules.05.formatTitle': 'Dateiformat',
  'modules.05.formatCsv': 'CSV: Ein Semikolon trennt die Spalten, das Komma ist das Dezimalzeichen, die Kodierung ist UTF-8 mit BOM. Ein deutsch eingestelltes Excel öffnet eine solche Datei, ohne dass irgendetwas eingestellt werden muss.',
  'modules.05.formatJson': 'JSON: dieselben Daten im Feld „points“, mit Dezimalpunkt und einem Zeitstempel in Millisekunden — das verlangt das Format.',
  'modules.05.resolution': 'Der Verlauf speichert einen Punkt alle 5 Sekunden und reicht 30 Tage zurück. Die volle Auflösung von fünf Proben pro Sekunde enthält die Datei nicht — die hält das Messwerk nur eine Minute lang.',
  'modules.05.offline': 'Die Datei entsteht auf dem Gerät und bleibt auf dem Gerät. Der Export verbindet sich mit keinem Netz.',
  'modules.05.columnsTitle': 'Die Spalten erklärt',
  'modules.05.columnsCaption': 'Die Spalten der Datei und ihre Bedeutung',
  'modules.05.descDate': 'Das Datum des Punktes aus der Uhr des Geräts, geschrieben als Tag-Monat-Jahr.',
  'modules.05.descTime': 'Die Uhrzeit des Punktes, auf die Sekunde genau.',
  'modules.05.descZone': 'Die Zone des Blauanteils im Moment des Speicherns. Das Messwerk speichert die Zone nur für diese eine Größe — für die übrigen rechnen Sie sie aus den Schwellen aus.',
  'modules.05.descMetricTpl': '{short} Einheit: {unit}. Bereich {min}–{max}.',
  'modules.05.previewTitle': 'Vorschau',
  'modules.05.previewHint': 'Die ersten fünf Zeilen der Datei, genau so, wie sie gespeichert werden.',
  'modules.05.savedTpl': 'Datei {name} gespeichert — {rows} Zeilen.',
  'modules.05.failed': 'Dieser Browser hat das Speichern der Datei nicht zugelassen.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'Die App speichert jede abgeschlossene Messsitzung auf diesem Gerät. Wählen Sie zwei aus, um sie auf einem Band zu sehen und den Unterschied als Zahl zu lesen.',
  'modules.06.noSessions': 'Es gibt noch keine abgeschlossene Sitzung. Starten Sie eine Messung, stoppen Sie sie und kommen Sie hierher zurück.',
  'modules.06.slotA': 'Sitzung A',
  'modules.06.slotB': 'Sitzung B',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'Band',
  'modules.06.tapeAriaTpl': 'Verlauf der Sitzung {slot}, Größe {name}.',
  'modules.06.tapeHint': 'Beide Sitzungen sind auf dieselbe Breite gezogen: Ein Balken ist derselbe Anteil der Dauer, nicht dieselbe Uhrzeit. Höhe und Farbe sagen dasselbe wie am Pult.',
  'modules.06.tapeChannelTpl': 'Das Band zeigt den Hauptkanal: {name}.',
  'modules.06.diffTitle': 'Unterschied',
  'modules.06.diffCaption': 'Die Durchschnitte beider Sitzungen und der Unterschied zwischen ihnen',
  'modules.06.clearKey': 'Gespeicherte Sitzungen löschen',
  'modules.06.cleared': 'Die gespeicherten Sitzungen wurden gelöscht.',
  'modules.06.savedTpl': 'Sitzung gespeichert: {dur}.',
  'modules.06.limitsTitle': 'Was dieser Vergleich nicht sagt',
  'modules.06.limits': 'Sie vergleichen zwei Messungen, nicht zwei Lichtquellen. Haben sich zwischen den Sitzungen der Bildausschnitt, der Abstand, die Tageszeit oder die Haltung des Telefons geändert, dann sagt der Unterschied auch darüber etwas. Der ehrlichste Vergleich ist dieselbe Szene vor und nach einer Änderung der Beleuchtung.',
  'modules.06.keepTpl': 'Gemerkt werden höchstens die letzten {count} Sitzungen.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'Die Testbilder werden auf dem ganzen Bildschirm dieses Geräts angezeigt. Sie dienen dazu, den Bildschirm mit eigenen Augen zu betrachten: ob das Weiß gleichmäßig ist, ob die Grautöne in eine Farbe kippen und ob die Hintergrundbeleuchtung an den Ecken durchscheint.',
  'modules.07.steps.1': 'Stellen Sie die Bildschirmhelligkeit so ein, wie Sie gewöhnlich arbeiten, und schalten Sie den Nachtmodus des Systems aus.',
  'modules.07.steps.2': 'Wählen Sie ein Testbild aus der Liste unten. Es füllt den ganzen Bildschirm.',
  'modules.07.steps.3': 'Schauen Sie aus etwa sechzig Zentimetern senkrecht auf den Bildschirm. Betrachten Sie dasselbe Testbild danach aus einem Winkel.',
  'modules.07.steps.4': 'Verlassen Sie es mit der Taste „Testbild schließen“ oder mit der Escape-Taste und gehen Sie zum nächsten.',
  'modules.07.planesTitle': 'Testbilder',
  'modules.07.exitKey': 'Testbild schließen',
  'modules.07.showAriaTpl': 'Testbild anzeigen: {name}',
  'modules.07.planeAriaTpl': 'Testbild: {name}. Die Taste zum Schließen ist am unteren Rand des Bildschirms.',
  'modules.07.plane.white.name': 'Weiß',
  'modules.07.plane.white.hint': 'Suchen Sie nach Flecken, Farbstichen und helleren Stellen an den Rändern. Weiß sollte auf der ganzen Fläche eine Farbe sein.',
  'modules.07.plane.gray75.name': 'Grau 75%',
  'modules.07.plane.gray75.hint': 'Grau soll grau sein. Ein grünlicher oder rosa Stich bedeutet, dass der Weißabgleich des Bildschirms verrutscht ist.',
  'modules.07.plane.gray50.name': 'Grau 50%',
  'modules.07.plane.gray50.hint': 'Das beste Testbild, um einen Farbstich zu beurteilen. Vergleichen Sie die Mitte mit den Ecken.',
  'modules.07.plane.gray25.name': 'Grau 25%',
  'modules.07.plane.gray25.hint': 'Dunkles Grau zeigt durchscheinende Hintergrundbeleuchtung und Streifen auf billigen Panels.',
  'modules.07.plane.black.name': 'Schwarz',
  'modules.07.plane.black.hint': 'In einem dunklen Raum sieht man hier jede undichte Stelle der Hintergrundbeleuchtung und jede aufgehellte Ecke.',
  'modules.07.plane.red.name': 'Reines Rot',
  'modules.07.plane.red.hint': 'Ein gleichmäßiges Rot deckt tote Subpixel und Unebenheiten des Panels auf.',
  'modules.07.plane.green.name': 'Reines Grün',
  'modules.07.plane.green.hint': 'Grün trägt die meiste Helligkeit — auf ihm fällt ein beschädigtes Pixel am leichtesten auf.',
  'modules.07.plane.blue.name': 'Reines Blau',
  'modules.07.plane.blue.hint': 'Blau zeigt Schmutz und Schlieren auf der Oberfläche des Bildschirms besser als Weiß.',
  'modules.07.plane.grid.name': 'Raster',
  'modules.07.plane.grid.hint': 'Die Linien sollen in den Ecken so scharf sein wie in der Mitte. Unschärfe an den Rändern ist eine Sache der Bildskalierung.',
  'modules.07.warn': 'Ein Testbild verdeckt den ganzen Bildschirm, auch das Steuerpult mit der Taste für die Messung. Das ist die einzige Stelle in der App, an der das geschieht, und deshalb ist die Taste zum Verlassen groß und immer sichtbar. Solange ein Testbild auf dem Bildschirm ist, läuft die Messung weiter und lässt sich nicht stoppen — schließen Sie das Testbild, um zu den Tasten zurückzukehren.',
  'modules.07.cameraTitle': 'Was hier nicht geht',
  'modules.07.camera': 'Ein Telefon sieht seinen eigenen Bildschirm nicht, diese Testbilder lassen sich also nicht mit demselben Gerät messen. Um einen Monitor zu messen, zeigen Sie das Testbild auf dem Monitor an und messen mit dem Telefon — das sind zwei verschiedene Geräte und zwei verschiedene Rollen.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'Der Zeitplan erinnert zu einer festgelegten Zeit an die Messung. Die Kamera schaltet er nicht selbst ein: Zur festgelegten Stunde zeigt er eine Erinnerung, und die Messung starten Sie mit der Taste „Messung starten“ am Pult. Genau wie beim ersten Mal.',
  'modules.08.onlyOpenTitle': 'Wann das nicht funktioniert',
  'modules.08.onlyOpen': 'Der Zeitplan läuft nur bei geöffneter App. Ein geschlossener Browser-Tab zählt keine Zeit und erinnert an nichts. Wir bitten nicht um die Erlaubnis für Systembenachrichtigungen und senden nichts ins Netz.',
  'modules.08.enableLabel': 'Erinnerungen einschalten',
  'modules.08.timesTitle': 'Zeiten',
  'modules.08.timeAriaTpl': 'Zeit {n}: Uhrzeit der Erinnerung',
  'modules.08.addKey': 'Zeit hinzufügen',
  'modules.08.removeAriaTpl': 'Zeit {time} löschen',
  'modules.08.addedTpl': 'Zeit {time} hinzugefügt.',
  'modules.08.removedTpl': 'Zeit {time} gelöscht.',
  'modules.08.badTime': 'Geben Sie die Uhrzeit im Format 22:00 an.',
  'modules.08.nextTpl': 'Nächste Erinnerung: {time}.',
  'modules.08.nextNone': 'Die Erinnerungen sind ausgeschaltet.',
  'modules.08.dueTpl': 'Geplante Zeit für die Messung: {time}.',
  'modules.08.dueKey': 'Pult anzeigen',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'Ein Alarm bewacht eine Größe und meldet sich erst, wenn sie die gewählte Zone ununterbrochen für die eingestellte Zeit hält. Er stoppt nie die Messung und verdeckt nie die Tasten.',
  'modules.09.enableLabel': 'Alarme einschalten',
  'modules.09.metricLabel': 'Bewachte Größe',
  'modules.09.levelLabel': 'Ab welcher Zone',
  'modules.09.levelWarning': 'Ab Vorsicht aufwärts',
  'modules.09.levelCritical': 'Nur kritisch',
  'modules.09.sustainLabel': 'Nach wie vielen Sekunden ununterbrochen',
  'modules.09.sustainHint': 'Kürzere Zeiten geben mehr Fehlalarme, wenn Sie das Telefon bewegen. Unter fünf Sekunden gehen wir nicht.',
  'modules.09.soundLabel': 'Kurzer Signalton',
  'modules.09.soundHint': 'Der Ton entsteht auf dem Gerät. Nichts wird aus dem Netz geladen.',
  'modules.09.cooldownHint': 'Höchstens ein Alarm alle zwei Minuten. Ein Alarm, der bei jeder Probe wiederholt wird, ist ein Alarm, den man für immer ausschaltet.',
  'modules.09.whenNotTitle': 'Wann ein Alarm nicht anschlägt',
  'modules.09.whenNot': 'Die Meldung lebt in der App, nicht im System. Sie kommt nicht, wenn die App geschlossen oder im Hintergrund verborgen ist, wenn keine Messung läuft und wenn sich die bewachte Größe in diesem Moment nicht messen lässt. Wir bitten nicht um die Erlaubnis für Systembenachrichtigungen.',
  'modules.09.firedTpl': '{name}: {zone} seit {sec} s — jetzt {value}.',
  'modules.09.saved': 'Die Einstellungen des Alarms wurden gespeichert.',
  'modules.09.statusOnTpl': 'Bewacht wird: {name}, {level}, nach {sec} s.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'Diese App ist kostenlos',
  'support.freeText': 'Alle sieben Größen zeigen Zahlen vom ersten Start an. Rekorder, Schwellen, Kalibrierung, Berichte, Export, der Vergleich von Sitzungen und der ganze Verlauf von dreißig Tagen funktionieren ohne Konto, ohne Gebühr und ohne Grenzen — offline genauso. Nichts ist hier gegen eine Zahlung für später zurückgelegt.',
  'support.whyTitle': 'Warum ich darum bitte',
  'support.whyText': 'Den Lichtmonitor mache und pflege ich allein, nach Feierabend. Die Unterstützung geht in die Zeit für Korrekturen, für Tests auf weiteren Telefonen und für die nächsten Werkzeuge in der Liste der Module. Nichts hört auf zu funktionieren, wenn niemand etwas zahlt.',
  'support.nothingTitle': 'Was eine Spende bringt',
  'support.nothingText': 'Nichts. Keine Zahl, kein Modul und keine Einstellung schaltet sich nach einer Spende frei, denn alles ist von Anfang an freigeschaltet. Es bleibt nur, dass ich weiß: Jemandem hat es genützt.',
  'support.keyTitle': 'Wenn Sie helfen möchten',
  'support.keyLabel': 'Einen Kaffee spendieren',
  'support.keyAria': 'Einen Kaffee spendieren — öffnet eine externe Seite in einem neuen Tab',
  'support.serviceText': 'Das Spendenprofil führt Buy Me a Coffee, und das ist die einzige Form der Unterstützung in dieser App. Die App lädt von dort weder ein Skript noch ein Widget noch ein Bild — hier steht ein gewöhnlicher Link und sonst nichts.',
  'support.privacyText': 'Ein Druck auf diese Taste öffnet eine externe Seite in einem neuen Tab, und das ist der einzige Moment, in dem irgendetwas dieses Gerät verlässt. Messungen, Verlauf und Einstellungen bleiben, wo sie waren — im Speicher dieses Browsers.',
  'support.privacyPendingText': 'Sobald die Adresse vorliegt, öffnet ein Druck auf die Taste eine externe Seite in einem neuen Tab, und das wird der einzige Moment sein, in dem irgendetwas dieses Gerät verlässt. Messungen, Verlauf und Einstellungen bleiben, wo sie waren — im Speicher dieses Browsers.',
  'support.emptyTitle': 'Das Profil ist noch nicht angebunden',
  'support.emptyText': 'Die Adresse des Spendenprofils ist noch nicht eingetragen, deshalb steht hier keine Taste, die ins Leere führen würde. Der Rest der App funktioniert unverändert — nichts wartet auf diese Spende.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'Was diese App NICHT misst',
  'docs.notList.1': 'Sie misst kein Spektrum. Eine Kamera hat drei breite Farbkanäle, eine automatische Belichtung und einen automatischen Weißabgleich.',
  'docs.notList.2': 'Sie misst keine absoluten Werte. Die Szenenhelligkeit ist ein relativer Indikator und nicht das Ergebnis einer fotometrischen Messung.',
  'docs.notList.3': 'Sie misst die Farbtemperatur nicht direkt. Farbtemperatur und zirkadiane Wirkung sind Näherungen, berechnet aus den sRGB-Farben.',
  'docs.notList.4': 'Sie sieht kein Netzflimmern. Die Abtastung mit 5 Hz sieht Pulsieren nur unterhalb von 2,5 Hz — die 100 Hz aus dem Stromnetz liegen außer Reichweite, und die App wird sie nie als Messwert ausgeben.',
  'docs.notList.5': 'Sie stellt keine Diagnose und gibt keine gesundheitliche Beratung. Kein Messwert ist das eine oder das andere.',
  'docs.notList.6': 'Sie vergleicht Ihr Licht mit keinem amtlichen Maßstab. Die Schwellen sind Einstellungen, die Sie in Modul 02 ändern können.',
  'docs.whatTitle': 'Was sie misst und wie',
  'docs.whatLead': 'Die Kamera des Telefons schaut auf eine beleuchtete Fläche, und die App berechnet fünfmal pro Sekunde die Mittelwerte der Kanäle R, G und B aus dem mittleren Ausschnitt des Bildes. Aus diesen drei Zahlen leitet sie sieben Größen ab.',
  'docs.whatCrop': 'Der Ausschnitt sind die mittleren 60% der Breite und 60% der Höhe des Bildes — genau das Rechteck, das das Fadenkreuz auf dem Bildschirm AUSRICHTEN umreißt. Außerhalb davon wird nichts gerechnet.',
  'docs.whatRate': 'Eine Probe alle 200 ms, also 5-mal pro Sekunde. Die letzte Minute liegt in voller Auflösung im Speicher; alles Ältere wird alle 5 Sekunden gespeichert und reicht dreißig Tage zurück.',
  'docs.metricsTitle': 'Die sieben Größen',
  'docs.formulasTitle': 'Formeln',
  'docs.formula.share.formula': 'Blauanteil = B / (R + G + B) × 100%',
  'docs.formula.share.text': 'Berechnet auf sRGB-Werten, ohne die Gamma umzukehren — mit Absicht, denn das ist dieselbe Definition wie in der vorigen Version der App, und einmal gesetzte Schwellen bedeuten weiterhin dasselbe. Trennt die Farbe von der Helligkeit.',
  'docs.formula.brightness.formula': 'Helligkeit = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': 'Der mittlere Kanalwert in Prozent des Bereichs. Die automatische Belichtung verschiebt ihn im Verborgenen, deshalb ist das ein relativer Indikator — vergleichen Sie zwei Szenen, statt eine einzelne Zahl als Messung zu lesen.',
  'docs.formula.kelvin.title': 'Farbtemperatur — die Näherung nach McCamy',
  'docs.formula.kelvin.formula': 'n = (x − 0,3320) / (y − 0,1858)\nCCT = −449 n³ + 3525 n² − 6823,3 n + 5520,33',
  'docs.formula.kelvin.text': 'Zuerst kehren wir die sRGB-Gamma um, dann gehen wir über die Matrix zu CIE XYZ für den Weißpunkt D65 und berechnen die Chromatizität x, y. Die Formel von McCamy ist etwa zwischen 2000 K und 12500 K verlässlich. Außerhalb dieses Bereichs läuft die kubische Funktion auseinander, deshalb wird das Ergebnis abgeschnitten und als unzuverlässig gekennzeichnet — die Grundlinie der Skala wird dann gestrichelt und es erscheint der Satz „außerhalb des Bereichs der Methode“.',
  'docs.formula.melanopic.title': 'Zirkadiane Wirkung — der melanopische Faktor',
  'docs.formula.melanopic.formula': 'mel = 0,0016 R + 0,3110 G + 0,8460 B\nY = 0,2127 R + 0,7152 G + 0,0722 B\nErgebnis = (mel / Y) × Normierung auf 1,00 für neutrales Weiß',
  'docs.formula.melanopic.text': 'Alle drei Kanäle in linearen Werten. Die wahre Größe ist das Integral des Spektrums mit der Empfindlichkeitskurve des Melanopsins (Maximum bei etwa 490 nm); eine Kamera hat drei breite Kanäle, deshalb gewichten wir die sRGB-Grundfarben mit der melanopischen Empfindlichkeit bei ihren ungefähren Wellenlängen (R 612 nm, G 549 nm, B 465 nm). Die Richtung der Veränderung ist verlässlich, der absolute Wert nicht — deshalb steht bei dieser Zahl das Zeichen „≈“.',
  'docs.formula.flicker.formula': 'Flimmern = (max − min) / (max + min) × 100%',
  'docs.formula.flicker.text': 'Die Definition der IES, berechnet aus einem Fenster von Helligkeitsproben. Die Frequenz schätzen wir aus der Zahl der Durchgänge des Signals durch seinen Mittelwert. Die Abtastung mit 5 Hz sieht Modulation nur unterhalb von 2,5 Hz (die Nyquist-Grenze), und als verlässlich lassen wir erst eine Frequenz zwischen 0,2 und 2 Hz bei einer Amplitude ab 0,5% gelten — unterhalb dieser Schwelle sind die Durchgänge durch den Mittelwert Rauschen des Sensors und kein Pulsieren der Quelle.',
  'docs.formula.uniformity.formula': 'Gleichmäßigkeit = dunkelstes Feld / hellstes Feld × 100%',
  'docs.formula.uniformity.text': 'Wir teilen den Ausschnitt in neun Felder eines 3×3-Rasters und vergleichen die Extreme. 100% ist vollkommen gleichmäßig verteiltes Licht. Ein niedriger Wert bedeutet auf einem Bildschirm durchscheinende Hintergrundbeleuchtung oder eine Spiegelung, auf dem Schreibtisch — eine schlecht gestellte Lampe. Das ist zusammen mit dem Sehkomfort die einzige Größe, bei der höher besser bedeutet.',
  'docs.formula.comfort.formula': '100 Punkte minus Abzüge:\nzirkadiane Wirkung über 0,75 — bis zu 35 Pkt.\nLichtfarbe über 4000 K — bis zu 25 Pkt.\nFlimmern über 5% — bis zu 25 Pkt.\nGleichmäßigkeit unter 60% — bis zu 15 Pkt.',
  'docs.formula.comfort.text': 'Eine Bewertung statt sechs Zahlen. Eine Größe, die sich nicht messen ließ, bringt keinen Abzug — fehlende Daten geben sich nie als gutes Ergebnis aus. Die Gewichte sind unsere redaktionelle Einschätzung, keine Norm; deshalb zeigt Modul 01 die Aufschlüsselung in die einzelnen Anteile, damit man dieser Bewertung widersprechen kann.',
  'docs.rangesTitle': 'Bereiche und Schwellen',
  'docs.rangesLead': 'Die Schwellen unten sind die, die gerade gelten — wenn Sie sie in Modul 02 geändert haben, zeigt die Tabelle Ihre Werte und nicht die ab Werk.',
  'docs.dirNormal': 'niedriger heißt sanfter',
  'docs.dirInvert': 'höher heißt besser',
  'docs.privacyTitle': 'Daten und Privatsphäre',
  'docs.privacyText': 'Das Bild der Kamera wird nirgendwohin gesendet und nirgends gespeichert — aus jedem Einzelbild bleiben nur drei Zahlen. Messungen, Schwellen und Einstellungen liegen im Speicher des Browsers auf diesem Gerät. Die App stellt keine Netzanfragen und funktioniert offline.',
  'docs.mdrTitle': 'Rechtlicher Hinweis',
  'docs.freeText': 'Die App ist vollständig kostenlos und bleibt es: alle sieben Größen, der Verlauf, die Berichte, der Export und der Offlinebetrieb funktionieren ohne Konto, ohne Gebühr und ohne Grenzen. Wer sich bedanken möchte, findet Modul 10 „Unterstützen“.',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'Die App hat sich unvollständig geladen',
  'boot.filesTpl': 'Diese Dateien wurden nicht geladen: {list}.',
  'boot.modulesTpl': 'Diese Module haben sich nicht gemeldet: {list} — diese Einträge lassen sich aus der Liste nicht öffnen.',
  'boot.modulesRangeTpl': 'Module {from}–{to}',
  'boot.tail': 'Laden Sie die Seite neu. Hilft das nicht, sind die Dateien auf dem Server unvollständig.',
  'boot.loss.bus': 'die Module sehen einander nicht mehr und die Messung startet nicht',
  'boot.loss.metrics': 'kein einziger Wert wird berechnet',
  'boot.loss.scaleCore': 'die Geometrie der Skala und die Zahlenformatierung verschwinden',
  'boot.loss.scaleText': 'alle Beschriftungen der Oberfläche verschwinden',
  'boot.loss.shell': 'kein Modul lässt sich öffnen',
  'boot.loss.engine': 'Kamera und Messung starten nicht',
  'boot.loss.dash': 'das Pult bleibt leer'
});
