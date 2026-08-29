/* docs/v2/i18n/nl.js — słownik WERSJI 2, niderlandzki.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/nl.js. Kolejność
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
 * REJESTR: forma grzecznościowa „u”, jednolicie w całym pliku — dokładnie tak,
 * jak w docs/shared/i18n/nl.js, z którym ten plik stoi w jednym zdaniu na
 * ekranie. (v5 mówi „je”; to osobna wersja z własnym rejestrem i tu się nią
 * nie sugerujemy.) Cudzysłowy “ … ”, przecinek dziesiętny (0,50), znak %
 * bez odstępu po liczbie. Apostrof zawsze typograficzny (U+2019): ’s avonds,
 * zo’n — prosty rozerwałby napis stojący w apostrofach pojedynczych.
 *
 * TERMINOLOGIA — wzięta co do słowa z warstwy wspólnej: blauwaandeel,
 * scènehelderheid, kleurtemperatuur, circadiane invloed, flikkering,
 * gelijkmatigheid, kijkcomfort; grootheid (metryka), meetwaarde (odczyt),
 * meting (pomiar), sample (próbka), geschiedenis (historia), drempel (próg),
 * zone (strefa). Klucze *.nameLower to te same nazwy w środku zdania —
 * niderlandzki pisze rzeczownik pospolity małą literą.
 *
 * ZASTRZEŻENIA MEDYCZNE i akapity o prywatności przetłumaczone DOKŁADNIE, bez
 * osłabiania i bez dodawania obietnic — to zdania o skutkach prawnych.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (te same co w pl.js i z tego samego powodu):
 *   'zone.warning'        — wspólne mówi „Let op”, ta wersja od zawsze mówi
 *                           „Waarschuwing” (i „Waarschuwingen” w podsumowaniu);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi o pomiarach
 *                           w liczbie mnogiej.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules — niderlandzki ma dwie: one i other.
 */
window.I18nData = window.I18nData || {};
window.I18nData['nl'] = Object.assign(window.I18nData['nl'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Lichtmonitor — blauw licht meten',
  'app.description': 'Lichtmonitor — het blauwaandeel van licht meten met de camera van uw telefoon. Zeven meetwaarden, een grafiek, geschiedenis. Alles beschikbaar, zonder account en zonder kosten.',
  'app.skipToContent': 'Naar de inhoud',
  'app.measuring': 'Meting loopt',
  'app.docsButton': 'Documentatie en uitleg',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — versie 2',

  'nav.aria': 'Hoofdnavigatie',
  'nav.tablistAria': 'Schermen van de app',
  'nav.measure': 'Meten',
  'nav.history': 'Geschiedenis',
  'nav.tools': 'Gereedschap',
  'nav.support': 'Steun',
  'nav.more': 'Meer',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Documentatie',
  'panel.thresholds': 'Drempels en profielen',
  'panel.reports': 'Rapporten',
  'panel.export': 'Gegevens exporteren',
  'panel.compare': 'A/B-vergelijking',
  'panel.calibration': 'Kalibratie met wit papier',
  'panel.screenCheck': 'Mijn monitor controleren',
  'panel.schedule': 'Schema',
  'panel.alerts': 'Blootstellingsalarmen',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Terug',
  'action.close': 'Sluiten',
  'action.refresh': 'Verversen',
  'action.apply': 'Toepassen',
  'action.delete': 'Verwijderen',
  'action.hide': 'Verbergen',
  'action.start': 'Start',
  'action.stop': 'Stop',
  'action.switch': 'Wisselen',
  'action.switchAria': 'Camera wisselen: front- of achtercamera',
  'action.resetDefaults': 'Standaardwaarden herstellen',
  'action.reports': 'Rapporten',
  'action.exportCsv': 'CSV exporteren',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Scherm: {name}',
  'a11y.measureStarted': 'Meting gestart.',
  'a11y.measureStopped': 'Meting gestopt.',
  'a11y.measureStoppedSummary': 'Meting gestopt. Tijd: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'Drempelprofiel toegepast.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Bevestiging',
  'dialog.confirm': 'Bevestigen',
  'dialog.cancel': 'Annuleren',
  'dialog.infoTitle': 'Informatie',
  'dialog.ok': 'Duidelijk',

  'help.sheetTitle': 'Over deze grootheid',
  'help.unit': 'Eenheid',
  'help.scaleRange': 'Schaalbereik',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'Waarschuwing',
  'threshold.crit': 'Kritiek',
  'threshold.warnLabel': 'Waarschuwingsdrempel',
  'threshold.critLabel': 'Kritieke drempel',
  'threshold.warnAria': '{name} — drempel: waarschuwing',
  'threshold.critAria': '{name} — drempel: kritiek',

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

  'firstRun.title': 'Hoe u meet',
  'firstRun.text': 'Druk op “Start”, richt de telefoon op een verlicht oppervlak en houd hem een paar seconden stil. Het kader in het voorbeeld laat zien welk deel de app werkelijk uitleest.',
  'firstRun.close': 'Tip sluiten',

  'camera.live': 'LIVE',
  'camera.idle': 'De camera staat uit. Druk op “Start”, richt de telefoon op een verlicht oppervlak en houd hem een paar seconden stil.',
  'camera.stopped': 'Meting gestopt. Druk op “Start” om opnieuw te meten.',

  'error.cameraStart': 'De camera kon niet worden gestart.',
  'error.engineMissing': 'De meetmodule is niet geladen.',

  'metrics.sevenTitle': 'Zeven meetwaarden',
  'measure.tilesSub': '5 keer per seconde ververst',

  'session.title': 'Deze sessie',
  'session.duration': 'Meettijd',
  'session.samples': 'Aantal samples',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     „Waarschuwingen” to nie to samo słowo co „Waarschuwing” pod suwakiem. */
  'zone.count.good': 'Binnen bereik',
  'zone.count.warning': 'Waarschuwingen',
  'zone.count.critical': 'Kritiek',

  'note.calibrated': 'Meting gekalibreerd met wit papier — de kanalen zijn gelijkgetrokken.',

  'tile.helpAria': 'Wat dit betekent: {name}',
  'tile.noMeasurement': 'Geen meting',
  'tile.outOfScale': 'Buiten de schaal',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Waarschuwing',
  'zone.spoken.warning': 'waarschuwing',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Verloop in de tijd',
  'history.pickHint': 'Kies een grootheid en een bereik',
  'history.metricLabel': 'Grootheid',
  'history.rangeAria': 'Tijdbereik van de grafiek',
  'history.emptyTitle': 'Geen gegevens in dit bereik',
  'history.emptyText': 'Start een meting op het scherm Meten — de grafiek vult zich binnen een paar seconden.',
  'history.tableTitle': 'Laatste meetwaarden',
  'history.tableHide': 'Tabel verbergen',
  'history.tableShow': 'Tabel tonen',
  'history.tableCaption': 'De laatste meetwaarden, de nieuwste bovenaan.',
  'history.tableEmpty': 'Geen meetwaarden. Start een meting op het scherm Meten.',

  'table.time': 'Tijd',
  'table.metric': 'Grootheid',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Niderlandzkie
     „uur” jest krótkie i nie potrzebuje ani skrótu, ani kropki. */
  'range.1m': '1 min',
  'range.1h': '1 uur',
  'range.24h': '24 uur',
  'range.7d': '7 dagen',
  'range.30d': '30 dagen',

  'chart.now': 'nu',
  'chart.countSub': {
    one: '{n} meetwaarde in het gekozen bereik',
    other: '{n} meetwaarden in het gekozen bereik'
  },
  'chart.aria': '{name}, bereik {range}, {count}, laatste waarde {value} {unit}.',
  'chart.ariaZone': '{name}, bereik {range}, {count}, laatste waarde {value} {unit}, zone: {zone}.',
  'chart.ariaEmpty': '{name} — geen gegevens in het bereik {range}.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Wizards en hulpfuncties',
  'tools.note': 'Het gereedschap helpt u een meting te duiden. Alles is meteen beschikbaar, en de meting zelf werkt er onafhankelijk van.',

  'tool.thresholds.sub': 'Wanneer een waarde een waarschuwing moet geven',
  'tool.compare.sub': 'Welk van twee lichten milder is',
  'tool.calibration.sub': 'De enige functie die de nauwkeurigheid werkelijk verhoogt',
  'tool.screenCheck.sub': 'Vijf stappen en een kant-en-klaar oordeel over het scherm',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Drempelschema”
     kontra „Schema”. Tak było i tak zostaje. */
  'tool.schedule.title': 'Drempelschema',
  'tool.schedule.sub': '’s Avonds andere drempels, zonder eraan te denken',
  'tool.alerts.sub': 'Een signaal wanneer de kritieke zone te lang duurt',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Instellingen',
  'more.thresholdsSub': 'Wanneer een waarde een waarschuwing moet geven',
  'more.docsSub': 'Hoe u meet en wat deze meting niet zegt',
  'more.appearanceTitle': 'Weergave en toegankelijkheid',

  'settings.theme': 'Thema',
  'theme.auto': 'Zoals het systeem',
  'theme.light': 'Licht',
  'theme.dark': 'Donker',

  'settings.textScale': 'Tekstgrootte',
  'textScale.100': 'Standaard',
  'textScale.115': 'Groter (115%)',
  'textScale.130': 'Grootst (130%)',

  'settings.contrast': 'Hoger contrast',
  'settings.contrastSub': 'Sterkere randen en donkerdere secundaire tekst.',
  'settings.sound': 'Geluid bij alarmen',
  'settings.soundSub': 'Een kort signaal wanneer een blootstellingsalarm aangaat.',
  'settings.vibrate': 'Trillen bij alarmen',
  'settings.vibrateSub': 'Werkt alleen op apparaten die dat ondersteunen.',

  'more.dataTitle': 'Gegevens',
  'more.clearHistory': 'Meetgeschiedenis wissen',
  'more.clearHistorySub': 'Wist de opgeslagen meetwaarden van dit apparaat. Drempels, profielen en instellingen blijven.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'De app is in zijn geheel gratis. ',
  'more.supportLink': 'U kunt hem vrijwillig steunen.',

  'dialog.clearHistory.title': 'De opgeslagen geschiedenis verwijderen?',
  'dialog.clearHistory.body': {
    one: 'We verwijderen {n} opgeslagen meetpunt van dit apparaat. Dit kan niet ongedaan worden gemaakt. Drempels, profielen en instellingen blijven onaangeroerd.',
    other: 'We verwijderen {n} opgeslagen meetpunten van dit apparaat. Dit kan niet ongedaan worden gemaakt. Drempels, profielen en instellingen blijven onaangeroerd.'
  },
  'dialog.clearHistory.confirm': 'Geschiedenis verwijderen',
  'dialog.clearHistory.cancel': 'Laten staan',

  'toast.historyCleared': 'Meetgeschiedenis verwijderd.',
  'toast.screenUnavailable': 'Dat scherm is in deze versie nog niet beschikbaar.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'Wat deze app meet',
  'docs.leadText': 'De camera van de telefoon kijkt naar een verlicht oppervlak, en vijf keer per seconde middelt de app de kanalen R, G en B uit het middelste deel van het beeld. Uit die drie getallen leidt hij zeven meetwaarden af.',
  'docs.limitsTitle': 'De grenzen van de methode',
  'docs.limitsText': 'Een camera heeft drie brede kleurkanalen, een automatische belichting en een automatische witbalans. Hij meet geen spectrum en kent geen absolute waarden, dus helderheid is een relatieve indicator en geen lux. Kleurtemperatuur en circadiane invloed zijn benaderingen die uit de sRGB-primairen zijn berekend. Bemonstering met {rate} Hz ziet flikkering alleen onder {limit} Hz — netflikkering van 100 Hz ligt buiten bereik en de app zal die nooit als meetwaarde geven.',

  'note.howTo.repeat.title': 'Herhaal de meting',
  'note.howTo.repeat.text': 'Eén meetwaarde is een momentopname. Een tiental seconden meten geeft een betrouwbaarder beeld.',

  'docs.scale': 'Schaal',
  'docs.direction': 'Richting',
  'docs.directionHigher': 'Hoger is beter',
  'docs.directionLower': 'Lager is milder',
  'docs.privacyTitle': 'Gegevens en privacy',
  'docs.privacyText': 'Het camerabeeld wordt nergens naartoe gestuurd en nergens opgeslagen — van elk frame blijven alleen drie getallen over. Metingen, drempels en instellingen staan in het geheugen van de browser op dit apparaat. De app doet geen enkel netwerkverzoek en werkt offline.',
  'docs.freeLine': 'Alle zeven meetwaarden, de geschiedenis, de grafiek, het gereedschap en de offlinemodus werken voor iedereen, zonder account en zonder kosten.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Alles is beschikbaar',
  'support.heroText': 'Alle zeven meetwaarden, de meetgeschiedenis, de grafiek, al het gereedschap en de offlinemodus werken voor iedereen, meteen. Zonder account, zonder limieten en zonder kosten.',
  'support.whyTitle': 'Waarom ik erom vraag',
  'support.whyText': '{app} wordt na werktijd gebouwd en verdient aan niemand iets: geen advertenties, geen gegevensverzameling, niets te verkopen. Het onderhoud en de verdere ontwikkeling — nieuwe meetwaarden, verbeteringen, tests op steeds meer telefoons — kosten tijd. Als de app u van pas is gekomen, kunt u bijdragen. U hoeft het niet.',
  'support.whatTitle': 'Wat een donatie oplevert',
  'support.whatText': 'Niets. Ze ontgrendelt werkelijk niets en versnelt niets — de app ziet er ervoor en erna precies hetzelfde uit en werkt precies hetzelfde. Het enige wat ze geeft, is dat de maker weet dat iemand iets aan dit werk heeft gehad.',
  'support.button': 'Trakteer me op een koffie',
  'support.pendingTitle': 'Het profiel is nog niet aangesloten',
  'support.pendingText': 'Er staat hier nog geen adres waar u steun naartoe kunt sturen. Het verschijnt op deze plek zodra het klaar is — tot die tijd werkt alles in de app precies hetzelfde.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'De knop opent de externe pagina van Buy Me a Coffee in een nieuw tabblad. Dat is het enige moment waarop er iets dit apparaat verlaat — en het gebeurt pas nadat u erop hebt gedrukt. Metingen, geschiedenis en instellingen blijven hier.',
  'privacy.externalPending': 'Zodra het adres er is, opent een druk op de knop een externe pagina in een nieuw tabblad. Dat zal het enige moment zijn waarop er iets dit apparaat verlaat. Metingen, geschiedenis en instellingen blijven hier.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (reserve in ui-core.js)',
  'boot.need.metrics': 'er wordt geen enkele waarde berekend',
  'boot.need.bus': 'de modules zien elkaar niet meer',
  'boot.need.ui': 'er valt niet tussen schermen te wisselen',
  'boot.need.engine': 'de camera en de meting starten niet',
  'boot.need.support': 'het scherm Steun blijft leeg',
  'boot.need.tools': 'het tabblad Gereedschap blijft leeg',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'Deze modules zijn niet geladen: {list}.',
  'boot.consoleHint': 'Controleer de volgorde en de paden van de <script>-tags in index.html.',
  'boot.incompleteTitle': 'De app is onvolledig geladen',
  'boot.incompleteText': '{missing} Ververs de pagina; helpt dat niet, dan zijn de bestanden op de server onvolledig.',
  'boot.newVersion': 'Er is een nieuwe versie van de app.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'Wat de drempels doen. ',
  'thresholds.noteText': 'De waarschuwingsdrempel laat de gele toestand oplichten, de kritieke drempel de rode. Een wijziging werkt meteen — ook op de meetwaarde die al op het scherm staat. Een eigen set drempels kunt u onder een naam opslaan en er weer bij terugkomen wanneer u wilt.',
  'thresholds.profilesTitle': 'Drempelprofielen',
  'thresholds.profilesSub': 'De drie ingebouwde en uw eigen',
  'thresholds.customName': 'Naam van uw eigen profiel',
  'thresholds.customPlaceholder': 'bijvoorbeeld Slaapkamer ’s avonds',
  'thresholds.save': 'Huidige drempels opslaan',
  'thresholds.saveHelp': 'Slaat precies de drempels op die hierboven zijn ingesteld.',

  'profile.builtin.default.name': 'Standaard',
  'profile.builtin.default.desc': 'De drempels uit de catalogus van grootheden — het uitgangspunt voor alle metingen.',
  'profile.builtin.evening.name': 'Avond — mild',
  'profile.builtin.evening.desc': 'Waarschuwt eerder voor koele lichtkleur en circadiane invloed.',
  'profile.builtin.work.name': 'Bureauwerk',
  'profile.builtin.work.desc': 'Laat helder, koel daglicht toe; let op flikkering en gelijkmatigheid.',
  'profile.custom.desc': 'Eigen profiel, opgeslagen op {date}.',

  'toast.thresholdsReset': 'Standaarddrempels hersteld.',
  'toast.thresholdOrder': 'De waarschuwingsdrempel moet lager zijn dan de kritieke.',
  'toast.thresholdOrderInverted': 'Voor deze grootheid moet de waarschuwingsdrempel hoger zijn dan de kritieke.',
  'toast.profileNameMissing': 'Geef een naam voor het profiel op.',
  'toast.profileSaved': 'Profiel “{name}” opgeslagen.',
  'toast.profileApplied': 'Profiel “{name}” toegepast.',
  'toast.profileApplyFailed': 'Dat profiel kon niet worden toegepast.',
  'toast.profileRemoved': 'Profiel verwijderd.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'Waar het schema voor is. ',
  'schedule.noteText': '’s Avonds zijn andere drempels zinvol dan rond het middaguur. Een regel “van–tot” wisselt het profiel vanzelf, zodat u er niet aan hoeft te denken. Het schema start of stopt nooit een meting.',
  'schedule.toggle': 'Automatisch wisselen inschakelen',
  'schedule.toggleSub': 'Wordt elke minuut getoetst aan de klok van het apparaat.',
  'schedule.emptyTitle': 'Geen regels',
  'schedule.emptyText': 'Voeg met de knop hieronder uw eerste regel toe.',
  'schedule.add': 'Regel toevoegen',
  'schedule.to': 'tot',
  'schedule.profile': 'Profiel',
  'schedule.fromAria': 'Regel {n}: begintijd',
  'schedule.toAria': 'Regel {n}: eindtijd',
  'toast.scheduleTimeFormat': 'Geef de tijden op in de notatie 22:00.',
  'toast.scheduleEnded': 'Het schema is afgelopen — de vorige drempels zijn terug.',
  'toast.scheduleApplied': 'Het schema heeft profiel “{name}” ingeschakeld.',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'Wat het alarm doet. ',
  'alerts.noteText': 'Het bewaakt één grootheid en laat pas van zich horen wanneer die de gekozen zone onafgebroken de ingestelde tijd vasthoudt. Het stopt de meting nooit en dekt de knoppen nooit af.',
  'alerts.toggle': 'Blootstellingsalarmen inschakelen',
  'alerts.toggleSub': 'Ze werken alleen tijdens een lopende meting.',
  'alerts.metric': 'Bewaakte grootheid',
  'alerts.level': 'Vanaf welke zone',
  'alerts.level.warning': 'Waarschuwing en hoger',
  'alerts.level.critical': 'Alleen kritiek',
  'alerts.sustain': 'Na hoeveel seconden onafgebroken',
  'alerts.sustainHelp': 'Kortere tijden geven meer vals alarm wanneer u de telefoon beweegt.',
  'alerts.sound': 'Kort geluidssignaal',
  'alerts.soundSub': 'Het geluid wordt lokaal opgewekt. U kunt het ook globaal uitzetten op het scherm Meer.',
  'alerts.barTitle': 'Blootstellingsalarm',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} houdt de waarschuwingszone al {seconds} s vast — nu {value} {unit}.',
  'alerts.message.critical': '{name} houdt de kritieke zone al {seconds} s vast — nu {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'Hoe u vergelijkt. ',
  'compare.noteText': 'Start een meting, richt de camera op de eerste bron en sla die op als A. Wissel zonder de afstand of de hoek te veranderen van licht en sla B op. De vergelijking zegt alleen iets als de scène dezelfde is.',
  'compare.slotA': 'Licht A',
  'compare.slotB': 'Licht B',
  'compare.save': 'Huidige meetwaarde opslaan',
  'compare.savedAt': 'Opgeslagen {date}, {time}',
  'compare.empty': 'Er is nog niets opgeslagen.',
  'compare.verdictTitle': 'Resultaat van de vergelijking',
  'compare.verdictEmpty': 'Sla beide lichten op om te zien welk milder is.',
  'compare.notEnough': 'Te weinig gegevens om deze twee metingen te vergelijken.',
  'compare.tie': 'De twee bronnen komen praktisch hetzelfde uit ({metric}: {a} en {b} {unit}). Het verschil valt binnen de ruis van de meting.',
  'compare.betterA': 'Licht A is het mildere — {metric} is {better} {unit} tegen {worse} {unit}.',
  'compare.betterB': 'Licht B is het mildere — {metric} is {better} {unit} tegen {worse} {unit}.',
  'compare.clear': 'Vergelijking wissen',
  'toast.compareSavedA': 'Licht A opgeslagen.',
  'toast.compareSavedB': 'Licht B opgeslagen.',
  'toast.compareCleared': 'Vergelijking gewist.',
  'toast.measureFirst': 'Start eerst een meting op het scherm Meten.',

  /* Nazwa wielkości w środku zdania. Po niderlandzku — tak jak po polsku —
     rzeczownik pospolity zostaje małą literą; osobne klucze są tu dla
     języków, w których toLowerCase() zepsułby zapis. */
  'metric.share.nameLower': 'blauwaandeel',
  'metric.brightness.nameLower': 'scènehelderheid',
  'metric.kelvin.nameLower': 'kleurtemperatuur',
  'metric.melanopic.nameLower': 'circadiane invloed',
  'metric.flicker.nameLower': 'flikkering',
  'metric.uniformity.nameLower': 'gelijkmatigheid',
  'metric.comfort.nameLower': 'kijkcomfort',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'Waarom dit werkt. ',
  'calib.noteText': 'De sensor van een camera heeft een vaste afwijking tussen zijn kanalen. Een vel wit papier meten laat zien hoe groot die is en maakt het mogelijk hem eraf te trekken. Dit is de enige functie in deze app die de nauwkeurigheid werkelijk verhoogt — en ze maakt van een camera nog altijd geen spectrometer.',
  'calib.step1': 'Leg een vel wit papier onder het licht dat u meet',
  'calib.step2': 'Start de meting en vul het beeld met het papier',
  'calib.step3': 'Druk op “Kalibreren” en beweeg de telefoon 3 seconden niet',
  'calib.done': 'Gekalibreerd op {date}, {time}.',
  'calib.none': 'Geen kalibratie. Meten werkt; behandel de waarden als vergelijkend.',
  'calib.gain': 'Versterking {channel}',
  'calib.gainsLabel': 'Versterking van de kanalen',
  'calib.gainsUnset': 'niet ingesteld',
  'calib.start': 'Kalibreren (3 s)',
  'calib.clear': 'Kalibratie verwijderen',
  'toast.calibCleared': 'Kalibratie verwijderd.',
  'calib.error.noEngine': 'De meetmodule is niet beschikbaar.',
  'calib.error.notRunning': 'Start eerst een meting en richt de camera op een vel wit papier.',
  'calib.error.busy': 'De kalibratie loopt al.',
  'calib.error.tooFewSamples': 'Te weinig samples. Controleer of de meting werkelijk loopt.',
  'calib.error.tooDark': 'Het beeld is te donker om te kalibreren. Verlicht het papier beter en probeer het opnieuw.',
  'calib.error.tooSkewed': 'De afwijking tussen de kanalen is te groot om als kalibratie te aanvaarden. Gebruik wit papier in gelijkmatig licht.',
  'calib.ok': 'Gekalibreerd. Kleurtemperatuur en circadiane invloed zijn nu nauwkeuriger.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'Waar dit voor is. ',
  'screencheck.noteText': 'Vijf stappen controleren een monitor zoals een recensie dat doet: wit bij twee helderheden, de gelijkmatigheid van de achtergrondverlichting, en of de nachtmodus van het systeem werkelijk iets verandert. De wizard leest een meting die al loopt; hij start er zelf geen.',
  'screencheck.step.white100.title': 'Wit bij volle helderheid',
  'screencheck.step.white100.hint': 'Open een witte pagina op de monitor, zet de helderheid op het maximum en vul het beeld met het scherm.',
  'screencheck.step.white20.title': 'Wit bij lage helderheid',
  'screencheck.step.white20.hint': 'Verlaag de helderheid van de monitor tot ongeveer een vijfde en verander de beelduitsnede niet.',
  'screencheck.step.corners.title': 'De hoeken van het scherm',
  'screencheck.step.corners.hint': 'Ga terug naar volle helderheid en laat de camera het hele scherm zien — we controleren de gelijkmatigheid van de achtergrondverlichting.',
  'screencheck.step.nightOff.title': 'Nachtmodus uit',
  'screencheck.step.nightOff.hint': 'Zorg dat het blauwlichtfilter uitgeschakeld is.',
  'screencheck.step.nightOn.title': 'Nachtmodus aan',
  'screencheck.step.nightOn.hint': 'Schakel het blauwlichtfilter van het systeem in en herhaal dezelfde beelduitsnede.',
  'screencheck.stepHeading': 'Stap {n} van {total}: {title}',
  'screencheck.idleTitle': 'De wizard loopt niet',
  'screencheck.idleHint': 'Start een meting op het scherm Meten, kom dan hier terug en druk op “Wizard starten”.',
  'screencheck.next': 'Stap opslaan en verdergaan',
  'screencheck.cancel': 'Afbreken',
  'screencheck.start': 'Wizard starten',
  'screencheck.clearResult': 'Resultaat wissen',
  'screencheck.resultTitle': 'Resultaat',
  'screencheck.resultEmpty': 'Er is nog geen enkele stap opgeslagen.',
  'screencheck.resultPartial': '{done} van {total} stappen opgeslagen. De conclusies verschijnen zodra er iets te vergelijken valt.',
  'screencheck.note.uniformityLow': 'De gelijkmatigheid van de achtergrondverlichting is {value}% — er zijn duidelijke helderheidsverschillen in het beeld.',
  'screencheck.note.uniformityOk': 'De achtergrondverlichting is gelijkmatig ({value}%).',
  'screencheck.note.nightWorks': 'De nachtmodus verlaagt het blauwaandeel met {value} procentpunt — hij werkt.',
  'screencheck.note.nightWeak': 'De nachtmodus verandert het blauwaandeel met slechts {value} procentpunt. Dat is minder dan een systeemfilter gewoonlijk geeft.',
  'screencheck.note.pwm': 'Bij lage helderheid stijgt de flikkering van {from}% naar {to}% — het klassieke teken van pulsbreedtedimmen (PWM).',
  'toast.screencheckDone': 'De wizard is klaar. Het resultaat staat hieronder.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'Waar deze getallen vandaan komen. ',
  'reports.noteText': 'Het rapport wordt berekend uit de geschiedenis die op dit apparaat is opgeslagen — één punt per vijf seconden. De meetmodule verzamelt die vanaf uw eerste meting, dus het rapport is meteen klaar.',
  'reports.rangeAria': 'Bereik van het rapport',
  'reports.day': 'Laatste 24 uur',
  'reports.week': 'Laatste 7 dagen',
  'reports.date': 'Rapport voor {date}.',
  'report.headerDay': 'Dag van {from} tot {to} — {count}.',
  'report.headerWeek': 'Week van {from} tot {to} — {count}.',
  'count.points': { one: '{n} punt', other: '{n} punten' },
  'count.samples': { one: '{n} sample', other: '{n} samples' },
  'report.emptyTitle': 'Geen gegevens in deze periode',
  'report.emptyText': 'Start een meting op het scherm Meten — de geschiedenis slaat zichzelf op.',
  'report.colAvg': 'Gemiddelde',
  'report.colMin': 'Minimum',
  'report.colMax': 'Maximum',
  'report.zonesTitle': 'Verdeling over de zones',
  'report.worstHour': 'Slechtste tijdstip van de dag',
  'report.worstHourNone': 'niets springt eruit',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'Wat u eraan kunt doen',
  'report.disclaimerTitle': 'Dit is geen gezondheidsadvies. ',
  'report.disclaimerText': 'De conclusies volgen uitsluitend uit wat de camera van deze telefoon heeft gezien. De app meet geen spectrum, kent geen lux en stelt geen enkele diagnose.',

  'advice.melanopic': 'De gemiddelde circadiane invloed kwam op {value}×. ’s Avonds is het de moeite waard om onder 0,50 te komen — het eenvoudigst met een warmere lamp of met de nachtmodus.',
  'advice.kelvin': 'Het licht was koel (gemiddeld {value} K). Om te werken is dat prima; twee uur voor het slapengaan is onder 3000 K beter.',
  'advice.flicker': 'Er is merkbare flikkering gemeten (gemiddeld {value}%). Meestal komt die van een goedkope dimmer of van de voeding van de achtergrondverlichting.',
  'advice.uniformity': 'Het licht is ongelijkmatig verdeeld ({value}%). De lamp verplaatsen of de hoek veranderen helpt gewoonlijk meer dan er een andere lamp in draaien.',
  'advice.worstHour': 'Het slechtste tijdstip van de dag is {hour}:00 — daar verzamelen zich de meeste meetwaarden buiten het bereik.',
  'advice.none': 'In deze periode springt er niets buiten het normale bereik uit. Het meest zou nu een vergelijking van twee lichtbronnen in de A/B-vergelijking opleveren.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'Bestandsindeling. ',
  'export.noteText': 'Puntkomma als kolomscheidingsteken, komma als decimaalteken, codering UTF-8 met BOM. Zo’n bestand opent het Nederlandse Excel zonder dat u iets hoeft in te stellen.',
  'export.range': 'Gegevensbereik',
  'export.columns': 'Kolommen in het bestand',
  'export.chipFilled': ' — kolom gevuld',
  'export.help': 'Het bestand bevat alle zeven kolommen — de meetmodule berekent ze vanaf uw eerste meting en ze komen allemaal in het bestand.',
  'export.run': 'CSV-bestand opslaan',
  'export.previewEmpty': 'Geen meetwaarden in dit bereik. Start een meting — de geschiedenis slaat zichzelf op.',
  'csv.range.hour': 'Laatste uur',
  'csv.range.day': 'Laatste 24 uur',
  'csv.range.week': 'Laatste 7 dagen',
  'csv.range.month': 'Laatste 30 dagen',
  'csv.colDate': 'Datum',
  'csv.colTime': 'Tijd',
  'csv.colZone': 'Zone',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'In het gekozen bereik staat geen enkele meetwaarde.',
  'toast.exportFailed': 'Deze browser heeft het opslaan van het bestand niet toegestaan.',
  'toast.exportSaved': {
    one: 'Bestand {filename} opgeslagen ({n} rij).',
    other: 'Bestand {filename} opgeslagen ({n} rijen).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} uur {m} min',
  'duration.ms': '{m} min {s} s',
  'duration.s': '{s} s'
});
