/* docs/v2/i18n/sv.js — słownik WERSJI 2, szwedzki.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/sv.js. Kolejność
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
 * REJESTR: bezpośrednie „du”, jednolicie w całym pliku — dokładnie tak, jak
 * w docs/shared/i18n/sv.js, z którym ten plik stoi w jednym zdaniu na ekranie.
 * Po szwedzku jest to forma neutralna, standardowa także w tekstach urzędowych;
 * forma grzecznościowa „ni” brzmiałaby dziś sztucznie. Cudzysłowy szwedzkie
 * ” … ” (ten sam znak z obu stron), przecinek dziesiętny (0,50). Przed znakiem
 * % i przed „×” w zdaniach stoi spacja nierozdzielająca (U+00A0), wpisana
 * dosłownie — tak samo jak w pozostałych słownikach tego katalogu.
 *
 * TERMINOLOGIA — wzięta co do słowa z warstwy wspólnej: blåandel, scenens
 * ljusstyrka, färgtemperatur, dygnsrytmpåverkan, flimmer, jämnhet, synkomfort;
 * historik (historia), mätning (pomiar), sampel (próbka), tröskel (próg),
 * storhet (metryka, wielkość), avläsning (odczyt), vy (ekran aplikacji) wobec
 * skärm (ekran urządzenia). Klucze *.nameLower to te same nazwy w środku
 * zdania — po szwedzku rzeczowniki pospolite stoją tam małą literą.
 *
 * ZASTRZEŻENIA MEDYCZNE i akapity o prywatności przetłumaczone DOKŁADNIE, bez
 * osłabiania i bez dodawania obietnic — to zdania o skutkach prawnych.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (te same co w pl.js i z tego samego powodu):
 *   'zone.warning'        — po szwedzku oba rejestry schodzą się na słowie
 *                           „Varning”, więc nadpisanie ma tę samą wartość co
 *                           warstwa wspólna; klucz zostaje, bo zestaw kluczy
 *                           jest wspólny dla wszystkich języków, a licznik
 *                           w podsumowaniu i tak mówi „Varningar”;
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi o pomiarach
 *                           w liczbie mnogiej.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules — szwedzki ma dwie: one i other.
 */
window.I18nData = window.I18nData || {};
window.I18nData['sv'] = Object.assign(window.I18nData['sv'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Ljusmonitor — mätning av blått ljus',
  'app.description': 'Ljusmonitor — mätning av ljusets blåandel med telefonens kamera. Sju storheter, ett diagram, historik. Allt tillgängligt, utan konto och utan avgift.',
  'app.skipToContent': 'Hoppa till innehållet',
  'app.measuring': 'Mäter',
  'app.docsButton': 'Dokumentation och förklaringar',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — version 2',

  'nav.aria': 'Huvudnavigering',
  'nav.tablistAria': 'Appens vyer',
  'nav.measure': 'Mätning',
  'nav.history': 'Historik',
  'nav.tools': 'Verktyg',
  'nav.support': 'Stöd',
  'nav.more': 'Mer',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Dokumentation',
  'panel.thresholds': 'Trösklar och profiler',
  'panel.reports': 'Rapporter',
  'panel.export': 'Dataexport',
  'panel.compare': 'A/B-jämförelse',
  'panel.calibration': 'Kalibrering med vitt papper',
  'panel.screenCheck': 'Kontrollera min skärm',
  'panel.schedule': 'Schema',
  'panel.alerts': 'Exponeringslarm',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Tillbaka',
  'action.close': 'Stäng',
  'action.refresh': 'Uppdatera',
  'action.apply': 'Tillämpa',
  'action.delete': 'Ta bort',
  'action.hide': 'Dölj',
  'action.start': 'Start',
  'action.stop': 'Stopp',
  'action.switch': 'Byt',
  'action.switchAria': 'Byt kamera: främre eller bakre',
  'action.resetDefaults': 'Återställ standard',
  'action.reports': 'Rapporter',
  'action.exportCsv': 'Exportera CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Vy: {name}',
  'a11y.measureStarted': 'Mätningen startad.',
  'a11y.measureStopped': 'Mätningen stoppad.',
  'a11y.measureStoppedSummary': 'Mätningen stoppad. Tid: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'Tröskelprofilen är tillämpad.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Bekräftelse',
  'dialog.confirm': 'Bekräfta',
  'dialog.cancel': 'Avbryt',
  'dialog.infoTitle': 'Information',
  'dialog.ok': 'Jag förstår',

  'help.sheetTitle': 'Om den här storheten',
  'help.unit': 'Enhet',
  'help.scaleRange': 'Skalans intervall',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'Varning',
  'threshold.crit': 'Kritiskt',
  'threshold.warnLabel': 'Varningströskel',
  'threshold.critLabel': 'Kritisk tröskel',
  'threshold.warnAria': '{name} — tröskel: varning',
  'threshold.critAria': '{name} — tröskel: kritiskt',

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

  'firstRun.title': 'Så här mäter du',
  'firstRun.text': 'Tryck på ”Start”, rikta telefonen mot en belyst yta och håll den stilla i några sekunder. Ramen i förhandsvisningen visar den del som appen verkligen läser.',
  'firstRun.close': 'Stäng tipset',

  'camera.live': 'LIVE',
  'camera.idle': 'Kameran är avstängd. Tryck på ”Start”, rikta telefonen mot en belyst yta och håll den stilla i några sekunder.',
  'camera.stopped': 'Mätningen stoppad. Tryck på ”Start” för att mäta igen.',

  'error.cameraStart': 'Kameran kunde inte startas.',
  'error.engineMissing': 'Mätmodulen laddades inte in.',

  'metrics.sevenTitle': 'Sju storheter',
  'measure.tilesSub': 'Uppdateras 5 gånger i sekunden',

  'session.title': 'Den här sessionen',
  'session.duration': 'Mättid',
  'session.samples': 'Antal sampel',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     „Varningar” to nie to samo słowo co „Varning” pod suwakiem. */
  'zone.count.good': 'Inom normen',
  'zone.count.warning': 'Varningar',
  'zone.count.critical': 'Kritiska',

  'note.calibrated': 'Mätningen är kalibrerad med vitt papper — kanalerna är utjämnade.',

  'tile.helpAria': 'Vad det betyder: {name}',
  'tile.noMeasurement': 'Ingen mätning',
  'tile.outOfScale': 'Utanför skalan',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Varning',
  'zone.spoken.warning': 'varning',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Förlopp över tid',
  'history.pickHint': 'Välj storhet och intervall',
  'history.metricLabel': 'Storhet',
  'history.rangeAria': 'Diagrammets tidsintervall',
  'history.emptyTitle': 'Inga data i det här intervallet',
  'history.emptyText': 'Starta en mätning i vyn Mätning — diagrammet fylls på inom några sekunder.',
  'history.tableTitle': 'Senaste avläsningarna',
  'history.tableHide': 'Dölj tabellen',
  'history.tableShow': 'Visa tabellen',
  'history.tableCaption': 'De senaste avläsningarna från mätningen, nyaste överst.',
  'history.tableEmpty': 'Inga avläsningar. Starta en mätning i vyn Mätning.',

  'table.time': 'Tid',
  'table.metric': 'Storhet',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     dłuższy zapis łamał się na dwie linie. */
  'range.1m': '1 min',
  'range.1h': '1 tim',
  'range.24h': '24 tim',
  'range.7d': '7 dagar',
  'range.30d': '30 dagar',

  'chart.now': 'nu',
  'chart.countSub': {
    one: '{n} avläsning i det valda intervallet',
    other: '{n} avläsningar i det valda intervallet'
  },
  'chart.aria': '{name}, intervall {range}, {count}, senaste värdet {value} {unit}.',
  'chart.ariaZone': '{name}, intervall {range}, {count}, senaste värdet {value} {unit}, zon: {zone}.',
  'chart.ariaEmpty': '{name} — inga data i intervallet {range}.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Guider och hjälpfunktioner',
  'tools.note': 'Verktygen hjälper dig att tolka en mätning. Alla finns tillgängliga direkt, och själva mätningen fungerar oberoende av dem.',

  'tool.thresholds.sub': 'När ett värde ska tända en varning',
  'tool.compare.sub': 'Vilket av två ljus som är mildare',
  'tool.calibration.sub': 'Den enda funktionen som verkligen höjer noggrannheten',
  'tool.screenCheck.sub': 'Fem steg och ett färdigt omdöme om skärmen',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Tröskelschema”
     kontra „Schema”. Tak było i tak zostaje. */
  'tool.schedule.title': 'Tröskelschema',
  'tool.schedule.sub': 'Andra trösklar på kvällen, utan att du behöver tänka på det',
  'tool.alerts.sub': 'En signal när den kritiska zonen varar för länge',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Inställningar',
  'more.thresholdsSub': 'När ett värde ska tända en varning',
  'more.docsSub': 'Hur du mäter och vad den här mätningen inte säger',
  'more.appearanceTitle': 'Utseende och tillgänglighet',

  'settings.theme': 'Tema',
  'theme.auto': 'Som i systemet',
  'theme.light': 'Ljust',
  'theme.dark': 'Mörkt',

  'settings.textScale': 'Textstorlek',
  'textScale.100': 'Standard',
  'textScale.115': 'Större (115 %)',
  'textScale.130': 'Störst (130 %)',

  'settings.contrast': 'Högre kontrast',
  'settings.contrastSub': 'Kraftigare kanter och mörkare hjälptext.',
  'settings.sound': 'Ljud vid larm',
  'settings.soundSub': 'En kort signal när ett exponeringslarm slår till.',
  'settings.vibrate': 'Vibration vid larm',
  'settings.vibrateSub': 'Fungerar bara på enheter som stöder det.',

  'more.dataTitle': 'Data',
  'more.clearHistory': 'Rensa mäthistoriken',
  'more.clearHistorySub': 'Raderar de sparade avläsningarna från den här enheten. Trösklar, profiler och inställningar blir kvar.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'Appen är gratis i sin helhet. ',
  'more.supportLink': 'Du får gärna stödja den frivilligt.',

  'dialog.clearHistory.title': 'Radera den sparade historiken?',
  'dialog.clearHistory.body': {
    one: 'Vi raderar {n} sparad mätpunkt från den här enheten. Det går inte att ångra. Trösklar, profiler och inställningar lämnas orörda.',
    other: 'Vi raderar {n} sparade mätpunkter från den här enheten. Det går inte att ångra. Trösklar, profiler och inställningar lämnas orörda.'
  },
  'dialog.clearHistory.confirm': 'Radera historiken',
  'dialog.clearHistory.cancel': 'Behåll',

  'toast.historyCleared': 'Mäthistoriken raderad.',
  'toast.screenUnavailable': 'Den vyn finns inte i den här versionen än.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'Vad den här appen mäter',
  'docs.leadText': 'Telefonens kamera tittar på en belyst yta, och fem gånger i sekunden räknar appen ut medelvärdet av kanalerna R, G och B i bildrutans mittparti. Ur de tre talen härleder den sju storheter.',
  'docs.limitsTitle': 'Metodens gränser',
  'docs.limitsText': 'En kamera har tre breda färgkanaler, automatisk exponering och automatisk vitbalans. Den mäter inget spektrum och känner inga absoluta värden, så ljusstyrkan är en relativ indikator och inte lux. Färgtemperatur och dygnsrytmpåverkan är uppskattningar beräknade ur sRGB-färger. Sampling med {rate} Hz ser flimmer bara under {limit} Hz — nätets 100 Hz ligger utom räckhåll och appen kommer aldrig att redovisa det som ett mätvärde.',

  'note.howTo.repeat.title': 'Upprepa mätningen',
  'note.howTo.repeat.text': 'En enstaka avläsning är en ögonblicksbild. Ett tiotal sekunders mätning ger en mer tillförlitlig bild.',

  'docs.scale': 'Skala',
  'docs.direction': 'Riktning',
  'docs.directionHigher': 'Högre är bättre',
  'docs.directionLower': 'Lägre är mildare',
  'docs.privacyTitle': 'Data och integritet',
  'docs.privacyText': 'Kamerabilden skickas inte och sparas inte någonstans — av varje bildruta blir bara tre tal kvar. Mätningar, trösklar och inställningar ligger i webbläsarens lagring på den här enheten. Appen gör inga nätverksanrop och fungerar offline.',
  'docs.freeLine': 'Alla sju storheter, historiken, diagrammet, verktygen och offlineläget fungerar för alla, utan konto och utan avgift.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Allt är tillgängligt',
  'support.heroText': 'Alla sju storheter, mäthistoriken, diagrammet, alla verktyg och offlineläget fungerar för alla, direkt. Inget konto, inga gränser och ingen avgift.',
  'support.whyTitle': 'Därför frågar jag',
  'support.whyText': '{app} byggs på fritiden och tjänar inga pengar på någon: ingen reklam, ingen datainsamling och ingenting att sälja. Att hålla appen i gång och ta den vidare — nya storheter, rättningar, tester på fler telefoner — kostar tid. Har appen kommit dig till nytta får du gärna bidra. Du måste inte.',
  'support.whatTitle': 'Vad en gåva ger dig',
  'support.whatText': 'Ingenting. Den låser verkligen inte upp något och snabbar inte upp något — appen ser ut och fungerar exakt likadant före och efter. Det enda den ger är att upphovsmannen vet att det här arbetet kom någon till nytta.',
  'support.button': 'Bjud mig på en kaffe',
  'support.pendingTitle': 'Profilen är inte kopplad än',
  'support.pendingText': 'Det finns ingen adress här än att skicka stöd till. Den dyker upp på den här platsen när den är klar — till dess fungerar allt i appen precis likadant.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'Knappen öppnar den externa sidan Buy Me a Coffee i en ny flik. Det är det enda tillfället då något lämnar den här enheten — och det sker först när du har tryckt på den. Mätningar, historik och inställningar stannar här.',
  'privacy.externalPending': 'När adressen finns på plats öppnar knappen en extern sida i en ny flik. Det blir det enda tillfället då något lämnar den här enheten. Mätningar, historik och inställningar stannar här.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (reserv i ui-core.js)',
  'boot.need.metrics': 'inget värde kommer att beräknas',
  'boot.need.bus': 'modulerna slutar se varandra',
  'boot.need.ui': 'det går inte att byta vy',
  'boot.need.engine': 'kameran och mätningen startar inte',
  'boot.need.support': 'vyn Stöd blir tom',
  'boot.need.tools': 'fliken Verktyg blir tom',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'De här modulerna laddades inte in: {list}.',
  'boot.consoleHint': 'Kontrollera ordningen och sökvägarna för <script> i index.html.',
  'boot.incompleteTitle': 'Appen laddades in ofullständigt',
  'boot.incompleteText': '{missing} Läs om sidan; hjälper det inte är filerna ofullständiga på servern.',
  'boot.newVersion': 'Det finns en ny version av appen.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'Vad trösklarna gör. ',
  'thresholds.noteText': 'Varningströskeln tänder det gula läget, den kritiska tröskeln det röda. En ändring gäller omedelbart — även för avläsningen som redan står på skärmen. En egen uppsättning trösklar kan du spara under ett namn och återvända till när du vill.',
  'thresholds.profilesTitle': 'Tröskelprofiler',
  'thresholds.profilesSub': 'De tre inbyggda och dina egna',
  'thresholds.customName': 'Namn på din egen profil',
  'thresholds.customPlaceholder': 'till exempel Sovrummet på kvällen',
  'thresholds.save': 'Spara de aktuella trösklarna',
  'thresholds.saveHelp': 'Sparar exakt de trösklar som är inställda ovan.',

  'profile.builtin.default.name': 'Standard',
  'profile.builtin.default.desc': 'Trösklarna ur storhetskatalogen — utgångspunkten för alla mätningar.',
  'profile.builtin.evening.name': 'Kväll — mild',
  'profile.builtin.evening.desc': 'Varnar tidigare för kall ljusfärg och dygnsrytmpåverkan.',
  'profile.builtin.work.name': 'Skrivbordsarbete',
  'profile.builtin.work.desc': 'Tillåter ljust, kallt dagsljus; håller koll på flimmer och jämnhet.',
  'profile.custom.desc': 'Egen profil sparad {date}.',

  'toast.thresholdsReset': 'Standardtrösklarna är återställda.',
  'toast.thresholdOrder': 'Varningströskeln måste vara lägre än den kritiska.',
  'toast.thresholdOrderInverted': 'För den här storheten måste varningströskeln vara högre än den kritiska.',
  'toast.profileNameMissing': 'Ange ett profilnamn.',
  'toast.profileSaved': 'Profilen ”{name}” är sparad.',
  'toast.profileApplied': 'Profilen ”{name}” är tillämpad.',
  'toast.profileApplyFailed': 'Den profilen kunde inte tillämpas.',
  'toast.profileRemoved': 'Profilen borttagen.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'Vad schemat är till för. ',
  'schedule.noteText': 'På kvällen är andra trösklar rimliga än mitt på dagen. En regel av typen ”från–till” byter profil av sig själv, så att du slipper tänka på det. Schemat startar och stoppar aldrig en mätning.',
  'schedule.toggle': 'Slå på automatiskt profilbyte',
  'schedule.toggleSub': 'Kontrolleras varje minut mot enhetens klocka.',
  'schedule.emptyTitle': 'Inga regler',
  'schedule.emptyText': 'Lägg till din första regel med knappen nedan.',
  'schedule.add': 'Lägg till regel',
  'schedule.to': 'till',
  'schedule.profile': 'Profil',
  'schedule.fromAria': 'Regel {n}: starttid',
  'schedule.toAria': 'Regel {n}: sluttid',
  'toast.scheduleTimeFormat': 'Ange tiderna i formatet 22:00.',
  'toast.scheduleEnded': 'Schemat har tagit slut — de tidigare trösklarna är tillbaka.',
  'toast.scheduleApplied': 'Schemat slog på profilen ”{name}”.',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'Vad larmet gör. ',
  'alerts.noteText': 'Det håller koll på en storhet och hör av sig först när den har hållit den valda zonen utan avbrott under den tid du har ställt in. Det stoppar aldrig mätningen och täcker aldrig knapparna.',
  'alerts.toggle': 'Slå på exponeringslarm',
  'alerts.toggleSub': 'De fungerar bara medan en mätning pågår.',
  'alerts.metric': 'Storhet att bevaka',
  'alerts.level': 'Från vilken zon',
  'alerts.level.warning': 'Varning och högre',
  'alerts.level.critical': 'Endast kritiskt',
  'alerts.sustain': 'Efter hur många sekunder utan avbrott',
  'alerts.sustainHelp': 'Kortare tider ger fler falsklarm när du flyttar telefonen.',
  'alerts.sound': 'En kort ljudsignal',
  'alerts.soundSub': 'Ljudet genereras lokalt. Det går också att stänga av globalt i vyn Mer.',
  'alerts.barTitle': 'Exponeringslarm',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} har hållit varningszonen i {seconds} s — nu {value} {unit}.',
  'alerts.message.critical': '{name} har hållit den kritiska zonen i {seconds} s — nu {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'Så här jämför du. ',
  'compare.noteText': 'Starta mätningen, rikta kameran mot den första källan och spara den som A. Byt ljus utan att ändra avstånd eller vinkel och spara B. Jämförelsen betyder något bara om scenen är densamma.',
  'compare.slotA': 'Ljus A',
  'compare.slotB': 'Ljus B',
  'compare.save': 'Spara den aktuella avläsningen',
  'compare.savedAt': 'Sparad {date}, {time}',
  'compare.empty': 'Ingenting sparat än.',
  'compare.verdictTitle': 'Jämförelsens resultat',
  'compare.verdictEmpty': 'Spara båda ljusen för att se vilket som är mildare.',
  'compare.notEnough': 'För lite data för att jämföra de här två mätningarna.',
  'compare.tie': 'De båda källorna hamnar praktiskt taget lika ({metric}: {a} och {b} {unit}). Skillnaden ryms i mätningens brus.',
  'compare.betterA': 'Ljus A är det mildare — {metric} är {better} {unit} mot {worse} {unit}.',
  'compare.betterB': 'Ljus B är det mildare — {metric} är {better} {unit} mot {worse} {unit}.',
  'compare.clear': 'Rensa jämförelsen',
  'toast.compareSavedA': 'Ljus A sparat.',
  'toast.compareSavedB': 'Ljus B sparat.',
  'toast.compareCleared': 'Jämförelsen rensad.',
  'toast.measureFirst': 'Starta först en mätning i vyn Mätning.',

  /* Nazwa wielkości w środku zdania. Po szwedzku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. */
  'metric.share.nameLower': 'blåandel',
  'metric.brightness.nameLower': 'scenens ljusstyrka',
  'metric.kelvin.nameLower': 'färgtemperatur',
  'metric.melanopic.nameLower': 'dygnsrytmpåverkan',
  'metric.flicker.nameLower': 'flimmer',
  'metric.uniformity.nameLower': 'jämnhet',
  'metric.comfort.nameLower': 'synkomfort',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'Därför fungerar det. ',
  'calib.noteText': 'Kamerans sensor har en fast avvikelse mellan kanalerna. Att mäta ett vitt papper visar hur stor den är och gör att den går att dra bort. Det är den enda funktionen i den här appen som verkligen höjer noggrannheten — och den gör fortfarande ingen spektrometer av kameran.',
  'calib.step1': 'Lägg ett vitt papper under ljuset du mäter',
  'calib.step2': 'Starta mätningen och fyll bildrutan med papperet',
  'calib.step3': 'Tryck på ”Kalibrera” och håll telefonen stilla i 3 sekunder',
  'calib.done': 'Kalibrerad {date}, {time}.',
  'calib.none': 'Ingen kalibrering. Mätningen fungerar; behandla värdena som jämförande.',
  'calib.gain': 'Förstärkning {channel}',
  'calib.gainsLabel': 'Kanalförstärkningar',
  'calib.gainsUnset': 'inte inställda',
  'calib.start': 'Kalibrera (3 s)',
  'calib.clear': 'Ta bort kalibreringen',
  'toast.calibCleared': 'Kalibreringen borttagen.',
  'calib.error.noEngine': 'Mätmodulen är inte tillgänglig.',
  'calib.error.notRunning': 'Starta mätningen först och rikta kameran mot ett vitt papper.',
  'calib.error.busy': 'Kalibreringen pågår redan.',
  'calib.error.tooFewSamples': 'För få sampel. Kontrollera att mätningen verkligen är i gång.',
  'calib.error.tooDark': 'Bilden är för mörk för att kalibrera. Lys upp papperet bättre och försök igen.',
  'calib.error.tooSkewed': 'Avvikelsen mellan kanalerna är för stor för att godtas som en kalibrering. Använd ett vitt papper i jämnt ljus.',
  'calib.ok': 'Kalibrerad. Färgtemperatur och dygnsrytmpåverkan blir noggrannare nu.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'Vad det här är till för. ',
  'screencheck.noteText': 'Fem steg kontrollerar en skärm på samma sätt som en recension gör det: vitt vid två ljusstyrkor, bakgrundsbelysningens jämnhet och om systemets nattläge verkligen ändrar något. Guiden läser av en mätning som redan pågår; den startar ingen själv.',
  'screencheck.step.white100.title': 'Vitt vid full ljusstyrka',
  'screencheck.step.white100.hint': 'Öppna en vit sida på skärmen, ställ ljusstyrkan på max och fyll bildrutan med skärmen.',
  'screencheck.step.white20.title': 'Vitt vid låg ljusstyrka',
  'screencheck.step.white20.hint': 'Sänk skärmens ljusstyrka till ungefär en femtedel och ändra inte bildutsnittet.',
  'screencheck.step.corners.title': 'Skärmens hörn',
  'screencheck.step.corners.hint': 'Gå tillbaka till full ljusstyrka och visa kameran hela skärmen — vi kontrollerar bakgrundsbelysningens jämnhet.',
  'screencheck.step.nightOff.title': 'Nattläget avstängt',
  'screencheck.step.nightOff.hint': 'Kontrollera att filtret för blått ljus är avstängt.',
  'screencheck.step.nightOn.title': 'Nattläget påslaget',
  'screencheck.step.nightOn.hint': 'Slå på systemets filter för blått ljus och upprepa samma bildutsnitt.',
  'screencheck.stepHeading': 'Steg {n} av {total}: {title}',
  'screencheck.idleTitle': 'Guiden är inte i gång',
  'screencheck.idleHint': 'Starta en mätning i vyn Mätning, kom sedan tillbaka hit och tryck på ”Starta”.',
  'screencheck.next': 'Spara steget och gå vidare',
  'screencheck.cancel': 'Avbryt',
  'screencheck.start': 'Starta guiden',
  'screencheck.clearResult': 'Rensa resultatet',
  'screencheck.resultTitle': 'Resultat',
  'screencheck.resultEmpty': 'Inget steg är sparat än.',
  'screencheck.resultPartial': '{done} av {total} steg sparade. Slutsatserna dyker upp när det finns något att jämföra.',
  'screencheck.note.uniformityLow': 'Bakgrundsbelysningens jämnhet är {value} % — det syns tydliga skillnader i ljusstyrka i bildrutan.',
  'screencheck.note.uniformityOk': 'Bakgrundsbelysningen är jämn ({value} %).',
  'screencheck.note.nightWorks': 'Nattläget sänker blåandelen med {value} procentenheter — det fungerar.',
  'screencheck.note.nightWeak': 'Nattläget ändrar blåandelen med bara {value} procentenheter. Det är mindre än vad ett systemfilter brukar ge.',
  'screencheck.note.pwm': 'Vid låg ljusstyrka stiger flimret från {from} % till {to} % — det är ett typiskt tecken på pulsbreddsdimning (PWM).',
  'toast.screencheckDone': 'Guiden är klar. Resultatet står nedanför.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'Varifrån de här siffrorna kommer. ',
  'reports.noteText': 'Rapporten räknas ut ur historiken som är sparad på den här enheten — en punkt var femte sekund. Motorn har samlat in den sedan din första mätning, så rapporten är klar direkt.',
  'reports.rangeAria': 'Rapportens intervall',
  'reports.day': 'Senaste dygnet',
  'reports.week': 'Senaste 7 dagarna',
  'reports.date': 'Rapport för {date}.',
  'report.headerDay': 'Dygn från {from} till {to} — {count}.',
  'report.headerWeek': 'Vecka från {from} till {to} — {count}.',
  'count.points': { one: '{n} punkt', other: '{n} punkter' },
  'count.samples': { one: '{n} sampel', other: '{n} sampel' },
  'report.emptyTitle': 'Inga data under den här perioden',
  'report.emptyText': 'Starta en mätning i vyn Mätning — historiken sparar sig själv.',
  'report.colAvg': 'Medelvärde',
  'report.colMin': 'Minimum',
  'report.colMax': 'Maximum',
  'report.zonesTitle': 'Fördelning på zoner',
  'report.worstHour': 'Sämsta tiden på dygnet',
  'report.worstHourNone': 'ingen sticker ut',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'Vad du kan göra åt det',
  'report.disclaimerTitle': 'Det här är inget hälsoråd. ',
  'report.disclaimerText': 'Slutsatserna följer enbart av det som den här telefonens kamera såg. Appen mäter inget spektrum, känner inga lux och ställer ingen diagnos.',

  'advice.melanopic': 'Den genomsnittliga dygnsrytmpåverkan blev {value} ×. På kvällen är det värt att gå under 0,50 — enklast med en varmare lampa eller nattläget.',
  'advice.kelvin': 'Ljuset var kallt (i snitt {value} K). För arbete är det invändningsfritt; två timmar före läggdags är under 3000 K bättre.',
  'advice.flicker': 'Märkbart flimmer upptäcktes (i snitt {value} %). Vanligen ligger en billig dimmer eller bakgrundsbelysningens drivdon bakom det.',
  'advice.uniformity': 'Ljuset fördelar sig ojämnt ({value} %). Att flytta lampan eller ändra dess vinkel ger oftast mer än att byta glödlampa.',
  'advice.worstHour': 'Sämsta tiden på dygnet är klockan {hour}:00 — det är då flest avläsningar utanför normen samlas.',
  'advice.none': 'Ingenting sticker ut utanför normen under den här perioden. Mest skulle du nu ha av att jämföra två ljuskällor i A/B-jämförelsen.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'Filformat. ',
  'export.noteText': 'Semikolon som kolumnavgränsare, komma som decimaltecken, teckenkodning UTF-8 med BOM-markör. En sådan fil öppnar svenskt Excel utan att något behöver ställas in.',
  'export.range': 'Dataintervall',
  'export.columns': 'Kolumner i filen',
  'export.chipFilled': ' — kolumnen ifylld',
  'export.help': 'Filen innehåller alla sju kolumnerna — motorn räknar ut dem från din första mätning och allihop hamnar i filen.',
  'export.run': 'Spara CSV-filen',
  'export.previewEmpty': 'Inga avläsningar i det här intervallet. Starta en mätning — historiken sparar sig själv.',
  'csv.range.hour': 'Senaste timmen',
  'csv.range.day': 'Senaste dygnet',
  'csv.range.week': 'Senaste 7 dagarna',
  'csv.range.month': 'Senaste 30 dagarna',
  'csv.colDate': 'Datum',
  'csv.colTime': 'Tid',
  'csv.colZone': 'Zon',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'Det finns inga avläsningar alls i det valda intervallet.',
  'toast.exportFailed': 'Den här webbläsaren lät inte filen sparas.',
  'toast.exportSaved': {
    one: 'Filen {filename} är sparad ({n} rad).',
    other: 'Filen {filename} är sparad ({n} rader).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} tim {m} min',
  'duration.ms': '{m} min {s} s',
  'duration.s': '{s} s'
});
