/* docs/v3/i18n/nl.js — słownik WŁASNY wersji v3, niderlandzki.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/nl.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js tego katalogu — pilnuje
 * tego docs/shared/i18n/keys.test.js. Kluczy, które stoją w słowniku wspólnym
 * (nazwy stref, zdania oceniające, noty o granicach metody, nazwy i opisy
 * siedmiu wielkości, zastrzeżenie z rozporządzenia (UE) 2017/745), tu NIE MA —
 * poza jednym świadomym nadpisaniem, opisanym przy 'verdict.critical.comfort'.
 *
 * REJESTR: forma grzecznościowa „u”, dokładnie jak w docs/shared/i18n/nl.js.
 * Oba pliki składają się w JEDEN obiekt napisów, więc rejestr musi być jeden.
 * (Wersja v5 mówi przez „je” — to osobna redakcja tego samego produktu; tutaj
 * rozstrzyga słownik wspólny v3.) Cudzysłowy niderlandzkie: “ … ”. Apostrof
 * typograficzny: ’s avonds. Przecinek dziesiętny (0,50 — 2,5 Hz), znak %
 * bez odstępu po liczbie.
 *
 * TERMINOLOGIA — wzięta ze słownika wspólnego i trzymana bez wyjątków:
 *   blauwaandeel, scènehelderheid, kleurtemperatuur, circadiane invloed
 *   (współczynnik: melanopische factor), flikkering, gelijkmatigheid,
 *   kijkcomfort; „biologische klok”; strefy: Binnen bereik / Let op / Kritiek;
 *   „benaderingen die uit de sRGB-primairen zijn berekend”, „buiten het bereik
 *   van de methode”, „behandel de waarden als vergelijkend”.
 * ODPOWIEDNIKI WŁASNE v3: geschiedenis (historia), sessie (sesja), sample
 *   (próbka), grootheid (wielkość), drempel (próg), waarschuwingsdrempel /
 *   kritieke drempel (próg uwagi / próg krytyczny), dashboard (pulpit),
 *   meetmotor (silnik pomiaru), testbeeld (plansza), recorder (rejestrator),
 *   melding (alert).
 *
 * ZAPIS LICZB WE WZORACH. Polska redakcja pisze przecinek dziesiętny
 * („0,3320”), angielska kropkę — niderlandzki idzie za polskim, bo tak samo
 * zapisuje ułamki. Liczby wstawiane przez '{…}' formatuje warstwa językowa.
 */
window.I18nData = window.I18nData || {};
window.I18nData['nl'] = Object.assign(window.I18nData['nl'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. */
  'app.wordmark': 'LICHTMONITOR',

  'state.idle': 'Gereed',
  'state.starting': 'Starten',
  'state.running': 'Meting',
  'state.runningTpl': 'Meting {time}',
  'state.stopped': 'Gestopt',
  'state.error': 'Camerafout',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5,0 po niderlandzku, 5.0 po angielsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'Meting starten',
  'keys.starting': 'Starten…',
  'keys.stop': 'Stop',
  'keys.flip': 'Wisselen',
  'keys.flipAria': 'Camera wisselen, voor of achter',
  'keys.menu': 'Menu',
  'keys.menuAria': 'Lijst met modules',
  'keys.back': '‹ Terug',
  'keys.backAria': 'Terug naar het dashboard',
  'keys.dash': 'Dashboard',
  'keys.zoom': 'Voorbeeld vergroten',
  'keys.retry': 'Opnieuw proberen',
  'keys.refresh': 'Verversen',
  'keys.close': 'Sluiten',
  'keys.show': 'Tonen',
  'keys.apply': 'Toepassen',
  'keys.remove': 'Verwijderen',

  'monitor.legend': 'Controlevoorbeeld',
  'monitor.badge': 'Live',

  'aim.title': 'Richten',
  'aim.hint': 'Het kader toont precies dat deel van het beeld dat de app meet.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'Hoofdkanaal',
  'readout.thresholdTpl': '(drempel {value})',
  'readout.contextTpl': 'min {min} · gem. {avg} · max {max} — laatste 60 s',
  'readout.contextEmpty': 'geen gegevens uit de laatste 60 s',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'Wat dit betekent: {name}',
  'aria.channel': '{name}, {value}, {zone}. Op de grote weergave tonen.',
  'aria.channelStale': '{name}, geen gegevens. Op de grote weergave tonen.',
  'aria.scale': 'Schaal: {name}, van {min} tot {max}. Nu {value}, {zone}. Waarschuwingsdrempel {warn}, kritieke drempel {crit}.',
  'aria.readout': '{name}: {value}, {zone}.',
  'aria.readoutApprox': '{name}: ongeveer {value}, {zone}. Een benaderde waarde.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'Schaal van het hoofdkanaal. Geen gegevens',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': 'Druk op “Meting starten”, richt de telefoon op een verlicht oppervlak en houd hem een paar seconden stil.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'Het kijkcomfort is laag. Kijk in module 01 om te zien wat het verlaagt.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'Begin met de knop “Meting starten” onder aan het scherm. De camera gaat pas aan nadat u erop hebt gedrukt.',
  'transient.measureStopped': 'Meting beëindigd · {time} · opgeslagen in de geschiedenis.',
  'transient.newVersion': 'Er is een nieuwe versie van de app.',
  'transient.thresholdsSaved': 'Drempels opgeslagen.',
  'transient.thresholdsRejected': 'Niet opgeslagen — de waarschuwingsdrempel en de kritieke drempel mogen elkaar niet passeren.',
  'transient.historyCleared': 'Geschiedenis gewist.',

  'live.lead': 'Hoofdkanaal: {name}, {value}, {zone}.',
  'live.ready': 'Oordeel gereed. {name} {value}, {zone}.',
  'live.started': 'Meting gestart.',
  'livebar.stopped': 'Meting gestopt',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'Er zijn nog geen opnamen. De geschiedenis wordt tijdens het meten geschreven — laat de meting een minuut lopen en kom hier terug.',
  'empty.recorderNoRange': 'In dit bereik is er niet gemeten.',
  'empty.coverageTpl': 'De meting besloeg {done} van {total} uur.',
  'empty.reportsNoData': 'Het dagrapport verschijnt na de eerste volledige dag met metingen.',
  'empty.compareOneSession': 'Voor een vergelijking zijn twee afgeronde sessies nodig. U hebt er voorlopig één.',
  'empty.exportNoData': 'Er is niets te exporteren. Start een meting, zodat de geschiedenis inhoud krijgt.',
  'empty.alertsOff': 'Meldingen staan uit. Eenmaal ingeschakeld werken ze alleen zolang de app open is.',
  'empty.scheduleEmpty': 'Er is geen tijdstip ingesteld. Het schema werkt alleen zolang de app open is.',
  'empty.historyEmpty': 'De geschiedenis is leeg.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'Lijst met modules',

  'modules.01.title': 'Recorder',
  'modules.01.desc': 'Het verloop van de meting in de tijd, van een minuut tot dertig dagen.',
  'modules.02.title': 'Drempels',
  'modules.02.desc': 'Stel uw eigen waarschuwings- en alarmgrenzen in voor elke grootheid.',
  'modules.03.title': 'Kalibratie',
  'modules.03.desc': 'Een referentie naar een bekende lichtbron, en wat kalibratie niet verhelpt.',
  'modules.04.title': 'Rapporten',
  'modules.04.desc': 'Dag- en weekoverzichten in de vorm van een afdruk.',
  'modules.05.title': 'Export',
  'modules.05.desc': 'De metingen opslaan in een CSV- of JSON-bestand, met de kolommen beschreven.',
  'modules.06.title': 'Vergelijking',
  'modules.06.desc': 'Twee sessies naast elkaar, met het verschil in getallen.',
  'modules.07.title': 'Schermtest',
  'modules.07.desc': 'Testbeelden om uw eigen monitor stap voor stap te controleren.',
  'modules.08.title': 'Schema',
  'modules.08.desc': 'Metingen op tijdstippen die u kiest.',
  'modules.09.title': 'Meldingen',
  'modules.09.desc': 'Een melding zodra een drempel wordt overschreden — en wanneer die niet werkt.',
  'modules.10.title': 'Steun',
  'modules.10.desc': 'De app is volledig gratis. Hier kunt u de maker op een koffie trakteren.',
  'modules.11.title': 'Documentatie',
  'modules.11.desc': 'Wat deze meting is, en wat ze zeker niet is.',
  'modules.12.title': 'Instellingen',
  'modules.12.desc': 'Thema, tekstgrootte, minder beweging, geschiedenis wissen.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'Meetkanalen',
  'channels.pick': 'Op de grote weergave tonen',
  'channels.stale': 'geen gegevens',
  'channels.approx': 'een benaderde waarde',

  'help.unit': 'Eenheid',
  'help.range': 'Bereik',
  'help.thresholds': 'Drempels',
  'help.warn': 'Waarschuwingsdrempel',
  'help.crit': 'Kritieke drempel',
  'help.now': 'nu',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „Grootheid” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'Grootheid',
  'col.unit': 'Eenheid',
  'col.range': 'Bereik',
  'col.direction': 'Richting',
  'col.time': 'Tijd',
  'col.date': 'Datum',
  'col.zone': 'Zone',
  'col.avg': 'Gemiddelde',
  'col.min': 'Minimum',
  'col.max': 'Maximum',
  'col.name': 'Kolom',
  'col.meaning': 'Wat erin staat',
  'col.channel': 'Kanaal',
  'col.gain': 'Versterking',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'Tijdbereik',
  'recorder.range.60s': '60 s',
  'recorder.range.15min': '15 min',
  'recorder.range.1h': '1 uur',
  'recorder.range.24h': '24 uur',
  'recorder.range.30d': '30 dagen',
  'recorder.gap': 'geen meting',
  'recorder.sessionTitle': 'Statistieken van de sessie',
  'recorder.zonesCaption': 'Zoneverdeling voor het blauwaandeel',
  'recorder.tableCaption': 'Metingen uit het gekozen bereik',
  'recorder.crosshair': 'Leeskruis',
  'recorder.prevAria': 'Eerder punt',
  'recorder.nextAria': 'Later punt',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'Weergave',
  'settings.themeLabel': 'Thema',
  'settings.themeSystem': 'Zoals het systeem',
  'settings.themeLight': 'Licht',
  'settings.themeDark': 'Donker',
  'settings.themeHint': 'Het thema “zoals het systeem” verandert mee met de instelling van uw telefoon.',
  'settings.textLabel': 'Tekstgrootte',
  /* Mnożnik jako LICZBA we wstawce — 1,15 po niderlandzku, 1.15 po angielsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'Vergroot de hele interface, niet alleen de letters — knoppen en regels groeien mee met de tekst.',
  'settings.motionGroup': 'Beweging',
  'settings.motionLabel': 'Minder beweging',
  'settings.motionHint': 'Schakelt alle overgangen uit. De wijzer van de schaal springt dan één keer per seconde in plaats van vloeiend te lopen.',
  'settings.dataTitle': 'Gegevens',
  'settings.clearLabel': 'Geschiedenis wissen',
  'settings.clearHintTpl': 'De geschiedenis bevat nu {count} opgeslagen punten.',
  'settings.clearHintEmpty': 'De geschiedenis is leeg.',
  'settings.clearTitle': 'Geschiedenis wissen?',
  'settings.clearConfirm': 'De hele meetgeschiedenis wissen? Dit kan niet ongedaan worden gemaakt.',
  'settings.clearKey': 'Wissen',
  'settings.aboutTitle': 'Over de app',
  'settings.versionTpl': '{app}, versie {version}.',
  'settings.offlineText': 'De app werkt zonder netwerk. Na de eerste keer openen staan al haar bestanden in het geheugen van de browser, dus de vliegtuigmodus verandert niets. Er wordt niets naar een server gestuurd, want de app doet geen netwerkverzoeken.',
  'settings.docsKey': 'Documentatie openen',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'Annuleren',
  'common.save': 'Opslaan',
  'common.reset': 'Standaardwaarden herstellen',
  'common.yes': 'Ja',
  'common.no': 'Nee',
  'common.on': 'Aan',
  'common.off': 'Uit',
  'common.sep': ' · ',
  'common.stepsTitle': 'Stap voor stap',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'Waar eigen drempels voor zijn',
  'modules.02.intro': 'Een drempel bepaalt wanneer de app “Let op” zegt en wanneer “Kritiek”. De standaardwaarden zijn ons redactionele oordeel, geen norm — meet u in andere omstandigheden, stel ze dan op uzelf af. Het oordeel en de zin op het dashboard worden meteen met de nieuwe drempels berekend.',
  'modules.02.orderNormal': 'De waarschuwingsdrempel moet onder de kritieke drempel liggen.',
  'modules.02.orderInvert': 'Hier is een hogere waarde beter, dus de waarschuwingsdrempel ligt boven de kritieke.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'Voorbeeld van de schaal: {name}',
  'modules.02.nowTpl': 'nu {value}',
  'modules.02.resetDone': 'Standaarddrempels hersteld.',
  'modules.02.profilesTitle': 'Profielen',
  'modules.02.profilesHint': 'Een profiel is een opgeslagen set drempels voor alle zeven grootheden. Een profiel toepassen verwisselt ze in één keer.',
  'modules.02.profileSaveKey': 'Huidige drempels opslaan',
  'modules.02.profileNameLabel': 'Naam van het nieuwe profiel',
  'modules.02.profileNameHint': 'De naam blijft op dit apparaat. Maximaal 40 tekens.',
  'modules.02.profileNameEmpty': 'Geef een profielnaam op.',
  'modules.02.profileSavedTpl': 'Profiel “{name}” opgeslagen.',
  'modules.02.profileAppliedTpl': 'Profiel “{name}” toegepast.',
  'modules.02.profileRemovedTpl': 'Profiel “{name}” verwijderd.',
  'modules.02.profileFailed': 'Dit profiel kon niet worden toegepast.',
  'modules.02.profileCustomTpl': 'Eigen profiel, opgeslagen op {date}.',
  'modules.02.builtin.default.name': 'Standaard',
  'modules.02.builtin.default.desc': 'De drempels uit de catalogus van grootheden — het uitgangspunt voor elke meting.',
  'modules.02.builtin.evening.name': 'Avond — mild',
  'modules.02.builtin.evening.desc': 'Waarschuwt eerder voor koele lichtkleur en circadiane invloed.',
  'modules.02.builtin.work.name': 'Bureauwerk',
  'modules.02.builtin.work.desc': 'Laat helder, koel daglicht toe; let op flikkering en gelijkmatigheid.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'Waarom dit werkt',
  'modules.03.why': 'De sensor van een camera heeft een vaste afwijking tussen zijn kanalen. Een vel wit papier meten laat zien hoe groot die afwijking is en maakt het mogelijk haar af te trekken. Het is de enige functie in deze app die de nauwkeurigheid werkelijk verhoogt — en ze maakt van een camera nog steeds geen spectrometer.',
  'modules.03.steps.1': 'Leg een vel wit papier onder het licht dat u meet.',
  'modules.03.steps.2': 'Druk op het dashboard op “Meting starten” en vul het kader met het papier.',
  'modules.03.steps.3': 'Kom hier terug, druk op “Kalibreren” en houd de telefoon drie seconden stil.',
  'modules.03.runKey': 'Kalibreren (3 s)',
  'modules.03.clearKey': 'Kalibratie verwijderen',
  'modules.03.busyTpl': 'Bezig met het meten van het papier… nog {sec} s',
  'modules.03.statusNone': 'Geen kalibratie. Meten werkt; behandel de waarden als vergelijkend.',
  'modules.03.statusOnTpl': 'Gekalibreerd op {date} om {time}.',
  'modules.03.gainsTitle': 'Kanaalversterkingen',
  'modules.03.gainR': 'Rood',
  'modules.03.gainG': 'Groen',
  'modules.03.gainB': 'Blauw',
  'modules.03.gainsNone': 'niet ingesteld',
  'modules.03.needRunning': 'Start eerst de meting en richt de camera op een vel wit papier.',
  'modules.03.tooFew': 'Te weinig samples. Controleer of de meting werkelijk loopt.',
  'modules.03.tooDark': 'Het beeld is te donker om te kalibreren. Verlicht het papier beter en probeer het opnieuw.',
  'modules.03.refused': 'De afwijking tussen de kanalen is te groot om als kalibratie te aanvaarden. Gebruik wit papier in gelijkmatig licht.',
  'modules.03.done': 'Gekalibreerd. Kleurtemperatuur en circadiane invloed worden nu nauwkeuriger.',
  'modules.03.cleared': 'Kalibratie verwijderd.',
  'modules.03.limitsTitle': 'Wat kalibratie niet verhelpt',
  'modules.03.limits.1': 'Kalibratie effent de drie kanalen van de camera en niets daarbuiten. Ze geeft de camera geen spectrum, dus kleurtemperatuur en circadiane invloed blijven benaderingen die uit de sRGB-primairen zijn berekend.',
  'modules.03.limits.2': 'Ze maakt van de scènehelderheid geen absolute grootheid — dat getal blijft relatief. Ze schakelt de automatische belichting en de witbalans niet uit, die de meting eronder verschuiven.',
  'modules.03.limits.3': 'Ze draagt niet over naar ander licht: een kalibratie die onder één lamp is gemaakt, beschrijft die lamp. Herhaal haar bij een andere bron. En ze verandert niets aan wat deze meting niet is — ze is nog steeds geen onderzoek en nog steeds geen grond voor het vaststellen van een ziekte.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'Periode van het rapport',
  'modules.04.rangeDay': 'Dag',
  'modules.04.rangeWeek': 'Week',
  'modules.04.headTpl': 'Van {from} tot {to} · {count} punten geschiedenis.',
  'modules.04.tableTitle': 'Overzicht',
  'modules.04.tableCaption': 'Gemiddelde, minimum en maximum over de gekozen periode',
  'modules.04.panoramaTitle': 'Panorama',
  'modules.04.panoramaAriaTpl': 'Panorama: {name}, {span}.',
  'modules.04.panoramaSpanDay': 'de laatste 24 uur, per uur uitgesplitst',
  'modules.04.panoramaSpanWeek': 'de laatste week, per dag uitgesplitst',
  'modules.04.panoramaHint': 'De hoogte en de kleur van een staaf zeggen hetzelfde: binnen bereik — laag, let op — halfhoog, kritiek — vol. Een streepje aan de voet markeert een uur zonder meting.',
  'modules.04.coverageDayTpl': 'De meting besloeg {done} van {total} uur.',
  'modules.04.coverageWeekTpl': 'De meting besloeg {done} van {total} dagen.',
  'modules.04.zonesTitle': 'Zoneverdeling',
  'modules.04.zonesCaptionTpl': 'Berekend voor het hoofdkanaal: {name}.',
  'modules.04.worstTpl': 'Zwaarste tijdstip: {value}.',
  'modules.04.worstNone': 'geen duidelijk tijdstip',
  'modules.04.worstHourTpl': '{hour} uur',
  'modules.04.adviceTitle': 'Wat u eraan kunt doen',
  'modules.04.adviceMelanopicTpl': 'De gemiddelde circadiane invloed kwam op {value}×. ’s Avonds is het de moeite waard om onder 0,50 te komen — het eenvoudigst met een warmere lamp of met de nachtmodus.',
  'modules.04.adviceKelvinTpl': 'Het licht was koel (gemiddeld {value} K). Voor werk is dat prima; in de twee uur voor het slapengaan is onder 3000 K milder.',
  'modules.04.adviceFlickerTpl': 'Er is merkbare flikkering (gemiddeld {value}%). Meestal komt die van een goedkope dimmer of van de voeding van de achtergrondverlichting.',
  'modules.04.adviceUniformityTpl': 'Het licht is ongelijkmatig verdeeld ({value}%). De lamp verplaatsen of de hoek veranderen helpt meestal meer dan een andere lamp indraaien.',
  'modules.04.adviceWorstTpl': 'De meeste metingen buiten de drempels vallen rond {hour} uur.',
  'modules.04.adviceNone': 'In deze periode steekt niets boven de ingestelde drempels uit.',
  'modules.04.limitsTitle': 'Dit is geen gezondheidsadvies',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'De conclusies volgen uitsluitend uit wat de camera van deze telefoon heeft gezien. De app meet geen spectrum en stelt geen enkele diagnose.',
  'modules.04.printHint': 'Deze pagina is opgezet als een afdruk: de tabel en de bijschriften lezen hetzelfde op papier, in het vergrootglas van het systeem en in een schermlezer.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'Gegevensbereik',
  'modules.05.range1h': 'Uur',
  'modules.05.range24h': 'Dag',
  'modules.05.range7d': '7 dagen',
  'modules.05.range30d': '30 dagen',
  'modules.05.csvKey': 'CSV-bestand opslaan',
  'modules.05.jsonKey': 'JSON-bestand opslaan',
  'modules.05.formatTitle': 'Bestandsindeling',
  'modules.05.formatCsv': 'CSV: een puntkomma scheidt de kolommen, een komma is het decimaalteken, de codering is UTF-8 met byte order mark. Een Excel die is ingesteld op een taalgebied met de komma als decimaalteken — zoals het Nederlandse — opent zo’n bestand zonder dat u iets hoeft in te stellen.',
  'modules.05.formatJson': 'JSON: dezelfde gegevens in het veld “points”, met een decimale punt en een tijdstempel in milliseconden — dat vraagt de indeling zo.',
  'modules.05.resolution': 'De geschiedenis slaat één punt per 5 seconden op en reikt 30 dagen terug. De volle resolutie van vijf samples per seconde staat niet in het bestand — de meetmotor bewaart die maar één minuut.',
  'modules.05.offline': 'Het bestand ontstaat op het apparaat en blijft op het apparaat. De export maakt geen verbinding met het netwerk.',
  'modules.05.columnsTitle': 'De kolommen uitgelegd',
  'modules.05.columnsCaption': 'De kolommen van het bestand en wat ze betekenen',
  'modules.05.descDate': 'De datum van het punt volgens de klok van het apparaat, geschreven als dag-maand-jaar.',
  'modules.05.descTime': 'De tijd van het punt, tot op de seconde.',
  'modules.05.descZone': 'De zone van het blauwaandeel op het moment van opslaan. De meetmotor slaat de zone alleen voor die ene grootheid op — voor de overige berekent u die uit de drempels.',
  'modules.05.descMetricTpl': '{short} Eenheid: {unit}. Bereik {min}–{max}.',
  'modules.05.previewTitle': 'Voorbeeld',
  'modules.05.previewHint': 'De eerste vijf regels van het bestand, precies zoals ze worden opgeslagen.',
  'modules.05.savedTpl': 'Bestand {name} opgeslagen — {rows} regels.',
  'modules.05.failed': 'Deze browser heeft het bestand niet laten opslaan.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'De app slaat elke afgeronde meetsessie op dit apparaat op. Kies er twee om ze op één band te zien en het verschil in getallen te lezen.',
  'modules.06.noSessions': 'Er is nog geen afgeronde sessie. Start een meting, stop die en kom hier terug.',
  'modules.06.slotA': 'Sessie A',
  'modules.06.slotB': 'Sessie B',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'Band',
  'modules.06.tapeAriaTpl': 'Het verloop van sessie {slot}, grootheid {name}.',
  'modules.06.tapeHint': 'Beide sessies zijn tot dezelfde breedte uitgerekt: een staaf is hetzelfde deel van de duur, niet hetzelfde tijdstip. Hoogte en kleur zeggen hetzelfde als op het dashboard.',
  'modules.06.tapeChannelTpl': 'De band toont het hoofdkanaal: {name}.',
  'modules.06.diffTitle': 'Verschil',
  'modules.06.diffCaption': 'De gemiddelden van beide sessies en het verschil ertussen',
  'modules.06.clearKey': 'Opgeslagen sessies verwijderen',
  'modules.06.cleared': 'De opgeslagen sessies zijn verwijderd.',
  'modules.06.savedTpl': 'Sessie opgeslagen: {dur}.',
  'modules.06.limitsTitle': 'Wat deze vergelijking niet zegt',
  'modules.06.limits': 'U vergelijkt twee metingen, niet twee lichtbronnen. Zijn tussen de sessies het kader, de afstand, het tijdstip of de stand van de telefoon veranderd, dan gaat het verschil daar ook over. De eerlijkste vergelijking is dezelfde scène voor en na een verandering van de verlichting.',
  'modules.06.keepTpl': 'Er worden hoogstens {count} van de recentste sessies bewaard.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'De testbeelden vullen het hele scherm van dit apparaat. Ze zijn er om het scherm met het blote oog te bekijken: of het wit gelijkmatig is, of de grijzen niet naar een kleur trekken en of de achtergrondverlichting niet langs de hoeken lekt.',
  'modules.07.steps.1': 'Zet de schermhelderheid op het niveau waarop u gewoonlijk werkt en schakel de nachtmodus van het systeem uit.',
  'modules.07.steps.2': 'Kies hieronder een testbeeld uit de lijst. Het vult het hele scherm.',
  'modules.07.steps.3': 'Kijk van ongeveer zestig centimeter, recht op het scherm. Bekijk daarna hetzelfde testbeeld onder een hoek.',
  'modules.07.steps.4': 'Verlaat het met de knop “Testbeeld sluiten” of met de Escape-toets en ga door naar het volgende.',
  'modules.07.planesTitle': 'Testbeelden',
  'modules.07.exitKey': 'Testbeeld sluiten',
  'modules.07.showAriaTpl': 'Testbeeld tonen: {name}',
  'modules.07.planeAriaTpl': 'Testbeeld: {name}. De sluitknop staat onder aan het scherm.',
  'modules.07.plane.white.name': 'Wit',
  'modules.07.plane.white.hint': 'Let op vlekken, kleurzwemen en lichtere plekken bij de randen. Wit hoort over het hele vlak één kleur te zijn.',
  'modules.07.plane.gray75.name': 'Grijs 75%',
  'modules.07.plane.gray75.hint': 'Grijs hoort grijs te zijn. Een groenige of roze zweem betekent dat de witbalans van het scherm is weggelopen.',
  'modules.07.plane.gray50.name': 'Grijs 50%',
  'modules.07.plane.gray50.hint': 'Het beste testbeeld om een kleurzweem te beoordelen. Vergelijk het midden met de hoeken.',
  'modules.07.plane.gray25.name': 'Grijs 25%',
  'modules.07.plane.gray25.hint': 'Donkergrijs laat lekkende achtergrondverlichting en banden op goedkope panelen zien.',
  'modules.07.plane.black.name': 'Zwart',
  'modules.07.plane.black.hint': 'In een donkere kamer ziet u hier elk lek in de achtergrondverlichting en elke opgelichte hoek.',
  'modules.07.plane.red.name': 'Zuiver rood',
  'modules.07.plane.red.hint': 'Egaal rood onthult dode subpixels en oneffenheden in het paneel.',
  'modules.07.plane.green.name': 'Zuiver groen',
  'modules.07.plane.green.hint': 'Groen draagt de meeste helderheid — daarop valt een beschadigde pixel het makkelijkst op.',
  'modules.07.plane.blue.name': 'Zuiver blauw',
  'modules.07.plane.blue.hint': 'Blauw laat vuil en vegen op het schermoppervlak beter zien dan wit.',
  'modules.07.plane.grid.name': 'Raster',
  'modules.07.plane.grid.hint': 'De lijnen horen in de hoeken even scherp te zijn als in het midden. Vervaging aan de randen is een kwestie van beeldschaling.',
  'modules.07.warn': 'Een testbeeld bedekt het hele scherm, ook het dashboard met de meetknop. Dat is de enige plek in de app waar dat gebeurt, en daarom is de sluitknop groot en altijd zichtbaar. Zolang een testbeeld op het scherm staat, loopt de meting door en is die niet te stoppen — sluit het testbeeld om terug te keren naar de knoppen.',
  'modules.07.cameraTitle': 'Wat u hier niet kunt doen',
  'modules.07.camera': 'Een telefoon ziet zijn eigen scherm niet, dus deze testbeelden meet u niet met hetzelfde apparaat. Wilt u een monitor meten, toon het testbeeld dan op de monitor en meet met de telefoon — twee verschillende apparaten en twee verschillende rollen.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'Het schema herinnert u aan een meting op een vast tijdstip. Het zet de camera niet zelf aan: op het afgesproken uur toont het een herinnering, en de meting start u met de knop “Meting starten” op het dashboard. Net als de eerste keer.',
  'modules.08.onlyOpenTitle': 'Wanneer dit niet werkt',
  'modules.08.onlyOpen': 'Het schema werkt alleen zolang de app open is. Een gesloten browsertabblad telt geen tijd en herinnert u aan niets. We vragen geen toestemming voor systeemmeldingen en we sturen niets naar het netwerk.',
  'modules.08.enableLabel': 'Herinneringen inschakelen',
  'modules.08.timesTitle': 'Tijdstippen',
  'modules.08.timeAriaTpl': 'Tijdstip {n}: uur van de herinnering',
  'modules.08.addKey': 'Tijdstip toevoegen',
  'modules.08.removeAriaTpl': 'Tijdstip {time} verwijderen',
  'modules.08.addedTpl': 'Tijdstip {time} toegevoegd.',
  'modules.08.removedTpl': 'Tijdstip {time} verwijderd.',
  'modules.08.badTime': 'Geef de tijd op in de vorm 22:00.',
  'modules.08.nextTpl': 'Eerstvolgende herinnering: {time}.',
  'modules.08.nextNone': 'Herinneringen staan uit.',
  'modules.08.dueTpl': 'Gepland meettijdstip: {time}.',
  'modules.08.dueKey': 'Dashboard tonen',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'Een melding bewaakt één grootheid en laat pas van zich horen wanneer die de gekozen zone ononderbroken de ingestelde tijd vasthoudt. Ze stopt de meting nooit en bedekt de knoppen nooit.',
  'modules.09.enableLabel': 'Meldingen inschakelen',
  'modules.09.metricLabel': 'Bewaakte grootheid',
  'modules.09.levelLabel': 'Vanaf welke zone',
  'modules.09.levelWarning': 'Vanaf “let op” en hoger',
  'modules.09.levelCritical': 'Alleen kritiek',
  'modules.09.sustainLabel': 'Na hoeveel seconden ononderbroken',
  'modules.09.sustainHint': 'Kortere tijden geven meer valse meldingen wanneer u de telefoon verplaatst. Onder vijf seconden gaan we niet.',
  'modules.09.soundLabel': 'Kort geluidssignaal',
  'modules.09.soundHint': 'Het geluid ontstaat op het apparaat. Er wordt niets van het netwerk gehaald.',
  'modules.09.cooldownHint': 'Hoogstens één melding per twee minuten. Een alarm dat bij elke sample wordt herhaald, is een alarm dat voorgoed wordt uitgezet.',
  'modules.09.whenNotTitle': 'Wanneer een melding niet werkt',
  'modules.09.whenNot': 'De melding staat in de app, niet in het systeem. Ze werkt niet wanneer de app gesloten is of op de achtergrond staat, wanneer er geen meting loopt, en wanneer de bewaakte grootheid op dat moment niet te meten is. We vragen geen toestemming voor systeemmeldingen.',
  'modules.09.firedTpl': '{name}: {zone} al {sec} s — nu {value}.',
  'modules.09.saved': 'Instellingen van de melding opgeslagen.',
  'modules.09.statusOnTpl': 'Bewaakt: {name}, {level}, na {sec} s.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'Deze app is gratis',
  'support.freeText': 'Alle zeven grootheden tonen getallen vanaf de eerste start. De recorder, de drempels, de kalibratie, de rapporten, de export, het vergelijken van sessies en de volledige geschiedenis van dertig dagen werken zonder account, zonder betaling en zonder limieten — offline net zo goed. Er is hier niets achter een betaling voor later weggelegd.',
  'support.whyTitle': 'Waarom ik erom vraag',
  'support.whyText': 'Ik maak en onderhoud Lichtmonitor in mijn eentje, na werktijd. Steun gaat naar de tijd voor verbeteringen, voor tests op meer telefoons en voor de volgende gereedschappen in de lijst met modules. Er stopt niets met werken als niemand iets betaalt.',
  'support.nothingTitle': 'Wat een donatie oplevert',
  'support.nothingText': 'Niets. Geen getal, geen module en geen instelling gaat na een donatie open, want alles staat vanaf het begin open. Wat overblijft, is dat ik weet dat iemand er iets aan had.',
  'support.keyTitle': 'Als u wilt helpen',
  'support.keyLabel': 'Trakteer me op een koffie',
  'support.keyAria': 'Trakteer me op een koffie — opent een externe pagina in een nieuw tabblad',
  'support.serviceText': 'Het donatieprofiel wordt door Buy Me a Coffee beheerd en dat is de enige vorm van steun in deze app. De app laadt er geen script, widget of afbeelding van — hier staat een gewone link en verder niets.',
  'support.privacyText': 'Op deze knop drukken opent een externe pagina in een nieuw tabblad, en dat is het enige moment waarop er iets dit apparaat verlaat. Metingen, geschiedenis en instellingen blijven waar ze waren — in het geheugen van deze browser.',
  'support.privacyPendingText': 'Zodra het adres er is, opent een druk op de knop een externe pagina in een nieuw tabblad, en dat zal het enige moment zijn waarop er iets dit apparaat verlaat. Metingen, geschiedenis en instellingen blijven waar ze waren — in het geheugen van deze browser.',
  'support.emptyTitle': 'Het profiel is nog niet aangesloten',
  'support.emptyText': 'Het adres van het donatieprofiel is nog niet ingevuld, dus er staat hier geen knop die nergens heen zou leiden. De rest van de app werkt onveranderd — er wacht niets op die donatie.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'Wat deze app NIET meet',
  'docs.notList.1': 'Ze meet geen spectrum. Een camera heeft drie brede kleurkanalen, een automatische belichting en een automatische witbalans.',
  'docs.notList.2': 'Ze meet geen absolute waarden. De scènehelderheid is een relatieve indicator en niet het resultaat van een fotometrische meting.',
  'docs.notList.3': 'Ze meet de kleurtemperatuur niet rechtstreeks. Kleurtemperatuur en circadiane invloed zijn benaderingen die uit de sRGB-primairen zijn berekend.',
  'docs.notList.4': 'Ze ziet geen netflikkering. Bemonstering met 5 Hz ziet pulseren alleen onder 2,5 Hz — netflikkering van 100 Hz ligt buiten bereik en de app zal die nooit als meetwaarde geven.',
  'docs.notList.5': 'Ze stelt geen diagnose en geeft geen gezondheidsadvies. Geen enkele meetwaarde is het een of het ander.',
  'docs.notList.6': 'Ze vergelijkt uw licht met geen enkele officiële norm. De drempels zijn instellingen die u in module 02 kunt veranderen.',
  'docs.whatTitle': 'Wat ze meet, en hoe',
  'docs.whatLead': 'De camera van de telefoon kijkt naar een verlicht oppervlak, en vijf keer per seconde berekent de app de gemiddelden van de kanalen R, G en B uit het middelste deel van het beeld. Uit die drie getallen leidt ze zeven waarden af.',
  'docs.whatCrop': 'Dat deel is de middelste 60% van de breedte en 60% van de hoogte van het beeld — precies de rechthoek die het vizier op het scherm RICHTEN omlijnt. Daarbuiten wordt niets meegeteld.',
  'docs.whatRate': 'Eén sample per 200 ms, dat is 5 keer per seconde. De laatste minuut ligt op volle resolutie in het geheugen; alles wat ouder is, wordt elke 5 seconden opgeslagen en reikt dertig dagen terug.',
  'docs.metricsTitle': 'De zeven grootheden',
  'docs.formulasTitle': 'Formules',
  'docs.formula.share.formula': 'blauwaandeel = B / (R + G + B) × 100%',
  'docs.formula.share.text': 'Berekend op sRGB-waarden zonder de gamma om te keren — met opzet, want dat is dezelfde definitie als in de vorige versie van de app, dus destijds ingestelde drempels betekenen nog steeds hetzelfde. Het scheidt kleur van helderheid.',
  'docs.formula.brightness.formula': 'helderheid = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': 'De gemiddelde kanaalwaarde als percentage van het bereik. De automatische belichting verschuift die eronder, dus het is een relatieve indicator — vergelijk twee scènes in plaats van één getal als meting te lezen.',
  'docs.formula.kelvin.title': 'Kleurtemperatuur — de benadering van McCamy',
  'docs.formula.kelvin.formula': 'n = (x − 0,3320) / (y − 0,1858)\nCCT = −449 n³ + 3525 n² − 6823,3 n + 5520,33',
  'docs.formula.kelvin.text': 'Eerst keren we de sRGB-gamma om, daarna gaan we met de matrix naar CIE XYZ voor het witpunt D65 en berekenen we de chromaticiteit x, y. De formule van McCamy is ruwweg tussen 2000 K en 12500 K betrouwbaar. Buiten dat bereik loopt de derdegraadsfunctie uit de pas, dus de uitkomst wordt afgekapt en als onbetrouwbaar gemarkeerd — de basislijn van de schaal wordt dan gestreept en de zin “buiten het bereik van de methode” verschijnt.',
  'docs.formula.melanopic.title': 'Circadiane invloed — de melanopische factor',
  'docs.formula.melanopic.formula': 'mel = 0,0016 R + 0,3110 G + 0,8460 B\nY = 0,2127 R + 0,7152 G + 0,0722 B\nresultaat = (mel / Y) × normalisatie naar 1,00 voor neutraal wit',
  'docs.formula.melanopic.text': 'Alle drie de kanalen in lineaire waarden. De echte grootheid is de integraal van het spectrum met de gevoeligheidskromme van melanopsine (piek rond 490 nm); een camera heeft drie brede kanalen, dus wegen we de sRGB-primairen met de melanopische gevoeligheid bij hun benaderde golflengten (R 612 nm, G 549 nm, B 465 nm). De richting van de verandering is betrouwbaar, de absolute waarde niet — daarom staat bij dit getal het teken “≈”.',
  'docs.formula.flicker.formula': 'flikkering = (max − min) / (max + min) × 100%',
  'docs.formula.flicker.text': 'De definitie van IES, berekend uit een venster met helderheidssamples. De frequentie schatten we uit het aantal keren dat het signaal zijn gemiddelde kruist. Bemonstering met 5 Hz ziet modulatie alleen onder 2,5 Hz (de grens van Nyquist), en we aanvaarden een frequentie pas als betrouwbaar tussen 0,2 en 2 Hz bij een amplitude vanaf 0,5% — onder die drempel zijn de kruisingen van het gemiddelde ruis van de sensor en geen pulserende bron.',
  'docs.formula.uniformity.formula': 'gelijkmatigheid = donkerste veld / lichtste veld × 100%',
  'docs.formula.uniformity.text': 'We verdelen het beelddeel in negen velden in een raster van 3×3 en vergelijken de uitersten. 100% is licht dat volmaakt gelijkmatig is verdeeld. Een lage waarde betekent op een scherm doorschijnende achtergrondverlichting of een weerspiegeling, op een bureau — een verkeerd geplaatste lamp. Het is de enige grootheid waarbij, samen met het kijkcomfort, hoger beter betekent.',
  'docs.formula.comfort.formula': '100 punten min straffen:\ncircadiane invloed boven 0,75 — tot 35 ptn\nlichtkleur boven 4000 K — tot 25 ptn\nflikkering boven 5% — tot 25 ptn\ngelijkmatigheid onder 60% — tot 15 ptn',
  'docs.formula.comfort.text': 'Eén oordeel in plaats van zes getallen. Een grootheid die niet te meten was, levert geen enkele straf op — ontbrekende gegevens doen zich nooit voor als een goed resultaat. De wegingen zijn ons redactionele oordeel, geen norm; daarom toont module 01 de opsplitsing in onderdelen, zodat het mogelijk is het met dat oordeel oneens te zijn.',
  'docs.rangesTitle': 'Bereiken en drempels',
  'docs.rangesLead': 'De drempels hieronder zijn die welke nu gelden — hebt u ze in module 02 veranderd, dan toont de tabel uw waarden en niet de fabriekswaarden.',
  'docs.dirNormal': 'lager betekent milder',
  'docs.dirInvert': 'hoger betekent beter',
  'docs.privacyTitle': 'Gegevens en privacy',
  'docs.privacyText': 'Het camerabeeld wordt nergens naartoe gestuurd en nergens opgeslagen — uit elk frame blijven alleen drie getallen over. Metingen, drempels en instellingen liggen in het geheugen van de browser op dit apparaat. De app doet geen enkel netwerkverzoek en werkt offline.',
  'docs.mdrTitle': 'Voorbehoud',
  'docs.freeText': 'De app is volledig gratis en blijft dat: alle zeven grootheden, de geschiedenis, de rapporten, de export en de offlinemodus werken zonder account, zonder betaling en zonder limieten. Wie wil bedanken, vindt module 10 “Steun”.',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'De app is onvolledig geladen',
  'boot.filesTpl': 'Deze bestanden zijn niet geladen: {list}.',
  'boot.modulesTpl': 'Deze modules hebben zich niet gemeld: {list} — die posities gaan niet open vanuit de lijst.',
  'boot.modulesRangeTpl': 'modules {from}–{to}',
  'boot.tail': 'Ververs de pagina. Helpt dat niet, dan zijn de bestanden op de server onvolledig.',
  'boot.loss.bus': 'de modules zien elkaar niet meer en de meting start niet',
  'boot.loss.metrics': 'er wordt geen enkele waarde berekend',
  'boot.loss.scaleCore': 'de geometrie van de schaal en de opmaak van de getallen verdwijnen',
  'boot.loss.scaleText': 'alle teksten van de interface verdwijnen',
  'boot.loss.shell': 'er is geen module te openen',
  'boot.loss.engine': 'de camera en de meting starten niet',
  'boot.loss.dash': 'het dashboard blijft leeg'
});
