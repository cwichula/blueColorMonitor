/* docs/v3/i18n/sv.js — słownik WŁASNY wersji v3, szwedzki.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/sv.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js tego katalogu — pilnuje
 * tego docs/shared/i18n/keys.test.js. Kluczy, które stoją w słowniku wspólnym
 * (nazwy stref, zdania oceniające, noty o granicach metody, nazwy i opisy
 * siedmiu wielkości, zastrzeżenie z rozporządzenia (UE) 2017/745), tu NIE MA —
 * poza jednym świadomym nadpisaniem, opisanym przy 'verdict.critical.comfort'.
 *
 * REJESTR: bezpośrednie „du”, dokładnie jak w docs/shared/i18n/sv.js. Oba
 * pliki składają się w JEDEN obiekt napisów, więc rejestr musi być jeden.
 * Cudzysłowy szwedzkie: ” … ” (ten sam znak z obu stron). Przecinek
 * dziesiętny (0,50 — 2,5 Hz).
 *
 * TERMINOLOGIA — wzięta ze słownika wspólnego i trzymana bez wyjątków:
 *   blåandel, scenens ljusstyrka, färgtemperatur, dygnsrytmpåverkan
 *   (współczynnik: melanopisk kvot), flimmer, jämnhet, synkomfort;
 *   strefy: Normalt / Varning / Kritiskt; „uppskattningar beräknade ur
 *   sRGB-färger”, „utanför metodens område”, „behandla värdena som
 *   jämförande”.
 * ODPOWIEDNIKI WŁASNE v3: historik (historia), session (sesja), sampel
 *   (próbka), mätning (pomiar), storhet (wielkość), tröskel (próg),
 *   varningströskel / kritisk tröskel (próg uwagi / próg krytyczny),
 *   avläsning (odczyt), zon (strefa), panel (pulpit), inspelare
 *   (rejestrator), testbild (plansza), sikte (celownik).
 *
 * ZAPIS LICZB WE WZORACH. Polska redakcja pisze przecinek dziesiętny
 * („0,3320”), angielska kropkę — szwedzki idzie za polskim, bo tak samo
 * zapisuje ułamki. Liczby wstawiane przez '{…}' formatuje warstwa językowa.
 * Przed znakiem % stawiamy spację, tak jak każe szwedzka typografia.
 */
window.I18nData = window.I18nData || {};
window.I18nData['sv'] = Object.assign(window.I18nData['sv'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. */
  'app.wordmark': 'LJUSMONITOR',

  'state.idle': 'Redo',
  'state.starting': 'Startar',
  'state.running': 'Mäter',
  'state.runningTpl': 'Mäter {time}',
  'state.stopped': 'Stoppad',
  'state.error': 'Kamerafel',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5,0 po szwedzku, 5.0 po angielsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'Starta mätning',
  'keys.starting': 'Startar…',
  'keys.stop': 'Stoppa',
  'keys.flip': 'Vänd',
  'keys.flipAria': 'Byt kamera, främre eller bakre',
  'keys.menu': 'Meny',
  'keys.menuAria': 'Lista över moduler',
  'keys.back': '‹ Tillbaka',
  'keys.backAria': 'Tillbaka till panelen',
  'keys.dash': 'Panel',
  'keys.zoom': 'Förstora förhandsvisningen',
  'keys.retry': 'Försök igen',
  'keys.refresh': 'Läs om',
  'keys.close': 'Stäng',
  'keys.show': 'Visa',
  'keys.apply': 'Tillämpa',
  'keys.remove': 'Ta bort',

  'monitor.legend': 'Kontrollbild',
  'monitor.badge': 'Direkt',

  'aim.title': 'Sikte',
  'aim.hint': 'Ramen visar exakt den del av bilden som appen mäter.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'Huvudkanal',
  'readout.thresholdTpl': '(tröskel {value})',
  'readout.contextTpl': 'min {min} · snitt {avg} · max {max} — senaste 60 s',
  'readout.contextEmpty': 'inga data från de senaste 60 s',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'Vad det betyder: {name}',
  'aria.channel': '{name}, {value}, {zone}. Visa på den stora displayen.',
  'aria.channelStale': '{name}, inga data. Visa på den stora displayen.',
  'aria.scale': 'Skala: {name}, från {min} till {max}. Nu {value}, {zone}. Varningströskel {warn}, kritisk tröskel {crit}.',
  'aria.readout': '{name}: {value}, {zone}.',
  'aria.readoutApprox': '{name}: ungefär {value}, {zone}. Ett ungefärligt värde.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'Huvudkanalens skala. Inga data',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': 'Tryck på ”Starta mätning”, rikta telefonen mot en belyst yta och håll den stilla några sekunder.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'Synkomforten är låg. Titta i modul 01 för att se vad som sänker den.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'Börja med knappen ”Starta mätning” längst ned på skärmen. Kameran slås på först när du trycker på den.',
  'transient.measureStopped': 'Mätningen avslutad · {time} · sparad i historiken.',
  'transient.newVersion': 'Det finns en ny version av appen.',
  'transient.thresholdsSaved': 'Trösklarna sparade.',
  'transient.thresholdsRejected': 'Inte sparat — varningströskeln och den kritiska tröskeln får inte korsa varandra.',
  'transient.historyCleared': 'Historiken rensad.',

  'live.lead': 'Huvudkanal: {name}, {value}, {zone}.',
  'live.ready': 'Omdömet är klart. {name} {value}, {zone}.',
  'live.started': 'Mätningen har börjat.',
  'livebar.stopped': 'Mätningen stoppad',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'Det finns inga inspelningar än. Historiken skrivs medan du mäter — kör en mätning i en minut och kom tillbaka hit.',
  'empty.recorderNoRange': 'Det gjordes ingen mätning i det här intervallet.',
  'empty.coverageTpl': 'Mätningen omfattade {done} av {total} timmar.',
  'empty.reportsNoData': 'Dygnsrapporten kommer efter det första hela dygnet med mätningar.',
  'empty.compareOneSession': 'En jämförelse kräver två avslutade sessioner. Du har en så länge.',
  'empty.exportNoData': 'Det finns inget att exportera. Starta en mätning så att historiken får något innehåll.',
  'empty.alertsOff': 'Larmen är avstängda. När de slås på fungerar de bara medan appen är öppen.',
  'empty.scheduleEmpty': 'Ingen tid är inställd. Schemat fungerar bara medan appen är öppen.',
  'empty.historyEmpty': 'Historiken är tom.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'Lista över moduler',

  'modules.01.title': 'Inspelare',
  'modules.01.desc': 'Mätningens förlopp över tid, från en minut till trettio dagar.',
  'modules.02.title': 'Trösklar',
  'modules.02.desc': 'Ställ in dina egna varnings- och larmgränser för varje storhet.',
  'modules.03.title': 'Kalibrering',
  'modules.03.desc': 'En referens till en känd ljuskälla, och det som kalibreringen inte rättar till.',
  'modules.04.title': 'Rapporter',
  'modules.04.desc': 'Sammanställningar per dygn och vecka, utlagda som en utskrift.',
  'modules.05.title': 'Export',
  'modules.05.desc': 'Avläsningarna sparade till en CSV- eller JSON-fil, med kolumnerna beskrivna.',
  'modules.06.title': 'Jämförelse',
  'modules.06.desc': 'Två sessioner sida vid sida, med skillnaden angiven som ett tal.',
  'modules.07.title': 'Skärmtest',
  'modules.07.desc': 'Testbilder för att kontrollera din egen skärm, steg för steg.',
  'modules.08.title': 'Schema',
  'modules.08.desc': 'Mätningar vid tider du väljer.',
  'modules.09.title': 'Larm',
  'modules.09.desc': 'En avisering när en tröskel överskrids — och när den inte fungerar.',
  'modules.10.title': 'Stöd',
  'modules.10.desc': 'Appen är gratis i sin helhet. Här kan du bjuda upphovsmannen på en kaffe.',
  'modules.11.title': 'Dokumentation',
  'modules.11.desc': 'Vad den här mätningen är, och vad den definitivt inte är.',
  'modules.12.title': 'Inställningar',
  'modules.12.desc': 'Tema, textstorlek, mindre rörelse, rensning av historiken.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'Mätkanaler',
  'channels.pick': 'Visa på den stora displayen',
  'channels.stale': 'inga data',
  'channels.approx': 'ett ungefärligt värde',

  'help.unit': 'Enhet',
  'help.range': 'Område',
  'help.thresholds': 'Trösklar',
  'help.warn': 'Varningströskel',
  'help.crit': 'Kritisk tröskel',
  'help.now': 'nu',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „Storhet” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'Storhet',
  'col.unit': 'Enhet',
  'col.range': 'Område',
  'col.direction': 'Riktning',
  'col.time': 'Tid',
  'col.date': 'Datum',
  'col.zone': 'Zon',
  'col.avg': 'Medelvärde',
  'col.min': 'Minimum',
  'col.max': 'Maximum',
  'col.name': 'Kolumn',
  'col.meaning': 'Vad den innehåller',
  'col.channel': 'Kanal',
  'col.gain': 'Förstärkning',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'Tidsintervall',
  'recorder.range.60s': '60 s',
  'recorder.range.15min': '15 min',
  'recorder.range.1h': '1 tim',
  'recorder.range.24h': '24 tim',
  'recorder.range.30d': '30 dagar',
  'recorder.gap': 'ingen mätning',
  'recorder.sessionTitle': 'Statistik för sessionen',
  'recorder.zonesCaption': 'Zonfördelning för blåandelen',
  'recorder.tableCaption': 'Avläsningar från det valda intervallet',
  'recorder.crosshair': 'Avläsningskors',
  'recorder.prevAria': 'Tidigare punkt',
  'recorder.nextAria': 'Senare punkt',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'Utseende',
  'settings.themeLabel': 'Tema',
  'settings.themeSystem': 'Följ systemet',
  'settings.themeLight': 'Ljust',
  'settings.themeDark': 'Mörkt',
  'settings.themeHint': 'Temat ”följ systemet” ändras tillsammans med inställningen i telefonen.',
  'settings.textLabel': 'Textstorlek',
  /* Mnożnik jako LICZBA we wstawce — 1,15 po szwedzku, 1.15 po angielsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'Förstorar hela gränssnittet, inte bara bokstäverna — knappar och rader växer tillsammans med texten.',
  'settings.motionGroup': 'Rörelse',
  'settings.motionLabel': 'Mindre rörelse',
  'settings.motionHint': 'Stänger av alla övergångar. Skalans visare hoppar då en gång i sekunden i stället för att glida.',
  'settings.dataTitle': 'Data',
  'settings.clearLabel': 'Rensa historiken',
  'settings.clearHintTpl': 'Historiken innehåller just nu {count} sparade punkter.',
  'settings.clearHintEmpty': 'Historiken är tom.',
  'settings.clearTitle': 'Rensa historiken?',
  'settings.clearConfirm': 'Rensa hela mäthistoriken? Det går inte att ångra.',
  'settings.clearKey': 'Rensa',
  'settings.aboutTitle': 'Om appen',
  'settings.versionTpl': '{app}, version {version}.',
  'settings.offlineText': 'Appen fungerar utan nät. Efter den första öppningen ligger alla dess filer i webbläsarens lagring, så flygplansläget ändrar ingenting. Ingenting skickas till någon server, eftersom appen inte gör några nätverksanrop.',
  'settings.docsKey': 'Öppna dokumentationen',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'Avbryt',
  'common.save': 'Spara',
  'common.reset': 'Återställ standard',
  'common.yes': 'Ja',
  'common.no': 'Nej',
  'common.on': 'På',
  'common.off': 'Av',
  'common.sep': ' · ',
  'common.stepsTitle': 'Steg för steg',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'Vad egna trösklar är till för',
  'modules.02.intro': 'En tröskel avgör när appen säger ”Varning” och när den säger ”Kritiskt”. Standardvärdena är vår redaktionella bedömning, inte en standard — mäter du under andra förhållanden, flytta dem så att de passar dig. Omdömet och meningen på panelen räknas ut med de nya trösklarna direkt.',
  'modules.02.orderNormal': 'Varningströskeln måste ligga under den kritiska.',
  'modules.02.orderInvert': 'Här är ett högre värde bättre, så varningströskeln ligger över den kritiska.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'Förhandsvisning av skalan: {name}',
  'modules.02.nowTpl': 'nu {value}',
  'modules.02.resetDone': 'Standardtrösklarna återställda.',
  'modules.02.profilesTitle': 'Profiler',
  'modules.02.profilesHint': 'En profil är en sparad uppsättning trösklar för alla sju storheterna. Att tillämpa en profil byter ut dem allihop på en gång.',
  'modules.02.profileSaveKey': 'Spara de aktuella trösklarna',
  'modules.02.profileNameLabel': 'Namn på den nya profilen',
  'modules.02.profileNameHint': 'Namnet stannar på den här enheten. Högst 40 tecken.',
  'modules.02.profileNameEmpty': 'Ange ett namn på profilen.',
  'modules.02.profileSavedTpl': 'Profilen ”{name}” sparad.',
  'modules.02.profileAppliedTpl': 'Profilen ”{name}” tillämpad.',
  'modules.02.profileRemovedTpl': 'Profilen ”{name}” borttagen.',
  'modules.02.profileFailed': 'Den profilen gick inte att tillämpa.',
  'modules.02.profileCustomTpl': 'Egen profil, sparad {date}.',
  'modules.02.builtin.default.name': 'Standard',
  'modules.02.builtin.default.desc': 'Trösklarna från katalogen över storheter — utgångspunkten för alla mätningar.',
  'modules.02.builtin.evening.name': 'Kväll — mild',
  'modules.02.builtin.evening.desc': 'Varnar tidigare för kall ljusfärg och dygnsrytmpåverkan.',
  'modules.02.builtin.work.name': 'Skrivbordsarbete',
  'modules.02.builtin.work.desc': 'Tillåter ljust, kallt dagsljus; håller koll på flimmer och jämnhet.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'Varför det fungerar',
  'modules.03.why': 'En kamerasensor har en fast avvikelse mellan sina kanaler. Att mäta ett vitt pappersark visar hur stor den är och gör att den går att dra bort. Det är den enda funktionen i den här appen som verkligen höjer noggrannheten — och den gör fortfarande inte kameran till en spektrometer.',
  'modules.03.steps.1': 'Lägg ett vitt pappersark under ljuset du mäter.',
  'modules.03.steps.2': 'Tryck på ”Starta mätning” på panelen och fyll bildrutan med papperet.',
  'modules.03.steps.3': 'Kom tillbaka hit, tryck på ”Kalibrera” och håll telefonen stilla i tre sekunder.',
  'modules.03.runKey': 'Kalibrera (3 s)',
  'modules.03.clearKey': 'Ta bort kalibreringen',
  'modules.03.busyTpl': 'Mäter papperet… {sec} s kvar',
  'modules.03.statusNone': 'Ingen kalibrering. Mätningen fungerar, behandla värdena som jämförande.',
  'modules.03.statusOnTpl': 'Kalibrerad {date} kl. {time}.',
  'modules.03.gainsTitle': 'Kanalernas förstärkning',
  'modules.03.gainR': 'Röd',
  'modules.03.gainG': 'Grön',
  'modules.03.gainB': 'Blå',
  'modules.03.gainsNone': 'inte inställd',
  'modules.03.needRunning': 'Starta mätningen först och rikta kameran mot ett vitt pappersark.',
  'modules.03.tooFew': 'För få sampel. Kontrollera att mätningen verkligen är i gång.',
  'modules.03.tooDark': 'Bilden är för mörk för att kalibrera. Lys upp papperet bättre och försök igen.',
  'modules.03.refused': 'Avvikelsen mellan kanalerna är för stor för att godtas som en kalibrering. Använd ett vitt papper i jämnt ljus.',
  'modules.03.done': 'Kalibrerad. Färgtemperatur och dygnsrytmpåverkan blir noggrannare nu.',
  'modules.03.cleared': 'Kalibreringen borttagen.',
  'modules.03.limitsTitle': 'Vad kalibreringen inte rättar till',
  'modules.03.limits.1': 'Kalibreringen jämnar ut kamerans tre kanaler och ingenting därutöver. Den ger inte kameran något spektrum, så färgtemperatur och dygnsrytmpåverkan förblir uppskattningar beräknade ur sRGB-färger.',
  'modules.03.limits.2': 'Den gör inte scenens ljusstyrka till en absolut storhet — det talet förblir relativt. Den stänger inte av den automatiska exponeringen eller vitbalansen, som förskjuter avläsningen i bakgrunden.',
  'modules.03.limits.3': 'Den överförs inte till annat ljus: en kalibrering gjord under en glödlampa beskriver just den lampan. Vid en annan källa gör om den. Och den ändrar ingenting i vad den här mätningen inte är — den är fortfarande ingen undersökning och ingen grund för att fastställa en sjukdom.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'Rapportens period',
  'modules.04.rangeDay': 'Dygn',
  'modules.04.rangeWeek': 'Vecka',
  'modules.04.headTpl': 'Från {from} till {to} · {count} punkter i historiken.',
  'modules.04.tableTitle': 'Sammanställning',
  'modules.04.tableCaption': 'Medelvärde, minimum och maximum under den valda perioden',
  'modules.04.panoramaTitle': 'Panorama',
  'modules.04.panoramaAriaTpl': 'Panorama: {name}, {span}.',
  'modules.04.panoramaSpanDay': 'det senaste dygnet uppdelat på timmar',
  'modules.04.panoramaSpanWeek': 'den senaste veckan uppdelad på dagar',
  'modules.04.panoramaHint': 'Stapelns höjd och färg säger samma sak: normalt — låg, varning — mellan, kritiskt — full. Ett streck vid basen markerar en timme utan mätning.',
  'modules.04.coverageDayTpl': 'Mätningen omfattade {done} av {total} timmar.',
  'modules.04.coverageWeekTpl': 'Mätningen omfattade {done} av {total} dagar.',
  'modules.04.zonesTitle': 'Zonfördelning',
  'modules.04.zonesCaptionTpl': 'Uträknad för huvudkanalen: {name}.',
  'modules.04.worstTpl': 'Svåraste tiden: {value}.',
  'modules.04.worstNone': 'ingen sticker ut',
  'modules.04.worstHourTpl': 'kl. {hour}',
  'modules.04.adviceTitle': 'Vad du kan göra åt det',
  'modules.04.adviceMelanopicTpl': 'Den genomsnittliga dygnsrytmpåverkan blev {value}×. På kvällen är det värt att gå under 0,50 — enklast med en varmare lampa eller nattläget.',
  'modules.04.adviceKelvinTpl': 'Ljuset var kallt ({value} K i snitt). För arbete är det utan anmärkning; de två timmarna före sömnen är under 3000 K mildare.',
  'modules.04.adviceFlickerTpl': 'Ett märkbart flimmer syns ({value} % i snitt). Oftast ligger en billig dimmer eller bakgrundsbelysningens drivdon bakom det.',
  'modules.04.adviceUniformityTpl': 'Ljuset fördelar sig ojämnt ({value} %). Att flytta lampan eller ändra dess vinkel ger oftast mer än att byta glödlampa.',
  'modules.04.adviceWorstTpl': 'De flesta avläsningarna utanför trösklarna samlas kl. {hour}.',
  'modules.04.adviceNone': 'Under den här perioden är det ingenting som sticker ut över de trösklar du har ställt in.',
  'modules.04.limitsTitle': 'Det här är inget hälsoråd',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'Slutsatserna följer uteslutande av det som den här telefonens kamera såg. Appen mäter inget spektrum och ställer ingen diagnos.',
  'modules.04.printHint': 'Den här sidan är utlagd som en utskrift: tabellen och bildtexterna läses likadant på papper, i systemets förstoringsglas och i en skärmläsare.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'Dataintervall',
  'modules.05.range1h': 'Timme',
  'modules.05.range24h': 'Dygn',
  'modules.05.range7d': '7 dagar',
  'modules.05.range30d': '30 dagar',
  'modules.05.csvKey': 'Spara CSV-filen',
  'modules.05.jsonKey': 'Spara JSON-filen',
  'modules.05.formatTitle': 'Filformat',
  'modules.05.formatCsv': 'CSV: ett semikolon skiljer kolumnerna åt, kommatecknet är decimaltecken, kodningen är UTF-8 med BOM. Ett Excel med svenska regioninställningar öppnar en sådan fil utan att något behöver ställas in.',
  'modules.05.formatJson': 'JSON: samma data i fältet ”points”, med decimalpunkt och tidsstämpel i millisekunder — det är vad formatet kräver.',
  'modules.05.resolution': 'Historiken sparar en punkt var 5:e sekund och når 30 dagar tillbaka. Den fulla upplösningen på fem sampel i sekunden finns inte i filen — motorn håller den bara i en minut.',
  'modules.05.offline': 'Filen skapas på enheten och stannar på enheten. Exporten ansluter inte till något nät.',
  'modules.05.columnsTitle': 'Kolumnerna förklarade',
  'modules.05.columnsCaption': 'Filens kolumner och vad de betyder',
  'modules.05.descDate': 'Punktens datum från enhetens klocka, skrivet dag-månad-år.',
  'modules.05.descTime': 'Punktens tid, på sekunden när.',
  'modules.05.descZone': 'Blåandelens zon i det ögonblick punkten sparades. Motorn sparar zonen bara för den enda storheten — för de övriga räknar du fram den ur trösklarna.',
  'modules.05.descMetricTpl': '{short} Enhet: {unit}. Område {min}–{max}.',
  'modules.05.previewTitle': 'Förhandsvisning',
  'modules.05.previewHint': 'Filens fem första rader, precis så som de kommer att sparas.',
  'modules.05.savedTpl': 'Filen {name} sparad — {rows} rader.',
  'modules.05.failed': 'Den här webbläsaren lät inte filen sparas.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'Appen sparar varje avslutad mätsession på den här enheten. Välj två för att se dem på ett och samma band och läsa skillnaden som ett tal.',
  'modules.06.noSessions': 'Det finns ingen avslutad session än. Starta en mätning, stoppa den och kom tillbaka hit.',
  'modules.06.slotA': 'Session A',
  'modules.06.slotB': 'Session B',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'Band',
  'modules.06.tapeAriaTpl': 'Förloppet för session {slot}, storhet {name}.',
  'modules.06.tapeHint': 'Båda sessionerna är utsträckta till samma bredd: en stapel är samma andel av tiden, inte samma klockslag. Höjden och färgen säger samma sak som på panelen.',
  'modules.06.tapeChannelTpl': 'Bandet visar huvudkanalen: {name}.',
  'modules.06.diffTitle': 'Skillnad',
  'modules.06.diffCaption': 'Båda sessionernas medelvärden och skillnaden mellan dem',
  'modules.06.clearKey': 'Ta bort de sparade sessionerna',
  'modules.06.cleared': 'De sparade sessionerna är borttagna.',
  'modules.06.savedTpl': 'Sessionen sparad: {dur}.',
  'modules.06.limitsTitle': 'Vad den här jämförelsen inte säger',
  'modules.06.limits': 'Du jämför två mätningar, inte två ljuskällor. Om bildutsnittet, avståndet, tiden på dygnet eller telefonens läge ändrades mellan sessionerna, handlar skillnaden också om det. Den ärligaste jämförelsen är samma scen före och efter en förändring av belysningen.',
  'modules.06.keepTpl': 'Högst {count} av de senaste sessionerna sparas.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'Testbilderna visas i helskärm på den här enheten. De är till för att titta på skärmen med egna ögon: om vitt är jämnt, om gråtonerna drar åt något färgstick och om bakgrundsbelysningen läcker i hörnen.',
  'modules.07.steps.1': 'Ställ in skärmens ljusstyrka på den nivå du brukar arbeta vid och stäng av systemets nattläge.',
  'modules.07.steps.2': 'Välj en testbild i listan nedan. Den fyller hela skärmen.',
  'modules.07.steps.3': 'Titta från ungefär sextio centimeter, rakt framifrån. Titta sedan på samma testbild snett från sidan.',
  'modules.07.steps.4': 'Gå ur med knappen ”Stäng testbilden” eller med Escape och gå vidare till nästa.',
  'modules.07.planesTitle': 'Testbilder',
  'modules.07.exitKey': 'Stäng testbilden',
  'modules.07.showAriaTpl': 'Visa testbilden: {name}',
  'modules.07.planeAriaTpl': 'Testbild: {name}. Stängknappen står längst ned på skärmen.',
  'modules.07.plane.white.name': 'Vitt',
  'modules.07.plane.white.hint': 'Leta efter fläckar, färgstick och ljusare partier nära kanterna. Vitt ska vara en enda färg över hela ytan.',
  'modules.07.plane.gray75.name': 'Grått 75 %',
  'modules.07.plane.gray75.hint': 'Grått ska vara grått. Ett grönaktigt eller rosa stick betyder att skärmens vitbalans har glidit.',
  'modules.07.plane.gray50.name': 'Grått 50 %',
  'modules.07.plane.gray50.hint': 'Den bästa testbilden för att bedöma färgstick. Jämför mitten med hörnen.',
  'modules.07.plane.gray25.name': 'Grått 25 %',
  'modules.07.plane.gray25.hint': 'Mörkgrått visar ljusläckage från bakgrundsbelysningen och band på billiga paneler.',
  'modules.07.plane.black.name': 'Svart',
  'modules.07.plane.black.hint': 'I ett mörkt rum syns här varje läckage i bakgrundsbelysningen och varje uppljust hörn.',
  'modules.07.plane.red.name': 'Rent rött',
  'modules.07.plane.red.hint': 'Enfärgat rött avslöjar döda subpixlar och ojämnheter i panelen.',
  'modules.07.plane.green.name': 'Rent grönt',
  'modules.07.plane.green.hint': 'Grönt bär mest ljusstyrka — på det är en trasig pixel lättast att upptäcka.',
  'modules.07.plane.blue.name': 'Rent blått',
  'modules.07.plane.blue.hint': 'Blått visar smuts och strimmor på skärmens yta bättre än vitt gör.',
  'modules.07.plane.grid.name': 'Rutnät',
  'modules.07.plane.grid.hint': 'Linjerna ska vara lika skarpa i hörnen som i mitten. Suddighet vid kanterna är en fråga om bildskalning.',
  'modules.07.warn': 'En testbild täcker hela skärmen, panelen med mätknappen inräknad. Det är det enda stället i appen där det sker, och därför är utgångsknappen stor och alltid synlig. Så länge testbilden ligger på skärmen fortsätter mätningen och går inte att stoppa — stäng testbilden för att komma tillbaka till knapparna.',
  'modules.07.cameraTitle': 'Vad du inte kan göra här',
  'modules.07.camera': 'En telefon ser inte sin egen skärm, så de här testbilderna kan du inte mäta med samma enhet. För att mäta en skärm, visa testbilden på skärmen och mät med telefonen — två olika enheter och två olika roller.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'Schemat påminner dig om att mäta vid en bestämd tid. Det slår inte på kameran av sig självt: vid den utsatta tiden visar det en påminnelse, och mätningen startar du med knappen ”Starta mätning” på panelen. Precis som första gången.',
  'modules.08.onlyOpenTitle': 'När det här inte fungerar',
  'modules.08.onlyOpen': 'Schemat fungerar bara medan appen är öppen. En stängd webbläsarflik räknar ingen tid och påminner inte om någonting. Vi ber inte om tillstånd för systemaviseringar och vi skickar ingenting ut på nätet.',
  'modules.08.enableLabel': 'Slå på påminnelser',
  'modules.08.timesTitle': 'Tider',
  'modules.08.timeAriaTpl': 'Tid {n}: klockslag för påminnelsen',
  'modules.08.addKey': 'Lägg till en tid',
  'modules.08.removeAriaTpl': 'Ta bort tiden {time}',
  'modules.08.addedTpl': 'Tiden {time} tillagd.',
  'modules.08.removedTpl': 'Tiden {time} borttagen.',
  'modules.08.badTime': 'Ange tiden i formatet 22:00.',
  'modules.08.nextTpl': 'Nästa påminnelse: {time}.',
  'modules.08.nextNone': 'Påminnelserna är avstängda.',
  'modules.08.dueTpl': 'Schemalagd tid för mätning: {time}.',
  'modules.08.dueKey': 'Visa panelen',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'Ett larm bevakar en storhet och hör av sig först när den håller sig i den valda zonen utan avbrott under den tid du har ställt in. Det stoppar aldrig mätningen och täcker aldrig knapparna.',
  'modules.09.enableLabel': 'Slå på larm',
  'modules.09.metricLabel': 'Bevakad storhet',
  'modules.09.levelLabel': 'Från vilken zon',
  'modules.09.levelWarning': 'Från varning och uppåt',
  'modules.09.levelCritical': 'Bara kritisk',
  'modules.09.sustainLabel': 'Efter hur många sekunder utan avbrott',
  'modules.09.sustainHint': 'Kortare tider ger fler falsklarm när du flyttar telefonen. Under fem sekunder går vi inte.',
  'modules.09.soundLabel': 'En kort ljudsignal',
  'modules.09.soundHint': 'Ljudet skapas på enheten. Ingenting hämtas från nätet.',
  'modules.09.cooldownHint': 'Högst ett larm varannan minut. Ett larm som upprepas vid varje sampel är ett larm som stängs av för gott.',
  'modules.09.whenNotTitle': 'När ett larm inte fungerar',
  'modules.09.whenNot': 'Aviseringen finns inne i appen, inte i systemet. Den fungerar inte när appen är stängd eller gömd i bakgrunden, när ingen mätning pågår och när den bevakade storheten inte går att mäta just då. Vi ber inte om tillstånd för systemaviseringar.',
  'modules.09.firedTpl': '{name}: {zone} sedan {sec} s — nu {value}.',
  'modules.09.saved': 'Larminställningarna sparade.',
  'modules.09.statusOnTpl': 'Bevakar: {name}, {level}, efter {sec} s.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'Den här appen är gratis',
  'support.freeText': 'Alla sju storheterna visar siffror från första starten. Inspelaren, trösklarna, kalibreringen, rapporterna, exporten, jämförelsen av sessioner och hela historiken från trettio dagar fungerar utan konto, utan avgift och utan gränser — likadant utan nät. Ingenting här är undanlagt bakom en betalning till senare.',
  'support.whyTitle': 'Därför ber jag om det',
  'support.whyText': 'Ljusmonitor gör och underhåller jag ensam, efter arbetstid. Stödet går till tiden för rättningar, för tester på fler telefoner och för nästa verktyg i listan över moduler. Ingenting slutar fungera om ingen betalar något.',
  'support.nothingTitle': 'Vad en gåva ger',
  'support.nothingText': 'Ingenting. Ingen siffra, ingen modul och ingen inställning låses upp efter en gåva, för allt är upplåst från början. Kvar blir bara att jag vet att den kom någon till nytta.',
  'support.keyTitle': 'Om du vill hjälpa till',
  'support.keyLabel': 'Bjud mig på en kaffe',
  'support.keyAria': 'Bjud mig på en kaffe — öppnar en extern sida i en ny flik',
  'support.serviceText': 'Gåvoprofilen drivs av Buy Me a Coffee, och det är den enda formen av stöd i den här appen. Appen laddar inget skript, ingen widget och ingen bild från den — här står en vanlig länk och ingenting utöver den.',
  'support.privacyText': 'Att trycka på den här knappen öppnar en extern sida i en ny flik, och det är det enda tillfället då något lämnar den här enheten. Mätningar, historik och inställningar stannar där de var — i den här webbläsarens lagring.',
  'support.privacyPendingText': 'När adressen finns på plats öppnar ett tryck på knappen en extern sida i en ny flik, och det blir det enda tillfället då något lämnar den här enheten. Mätningar, historik och inställningar stannar där de var — i den här webbläsarens lagring.',
  'support.emptyTitle': 'Profilen är inte kopplad än',
  'support.emptyText': 'Adressen till gåvoprofilen är inte inskriven än, så här står ingen knapp som skulle leda ingenstans. Resten av appen fungerar oförändrat — ingenting väntar på den gåvan.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'Vad den här appen INTE mäter',
  'docs.notList.1': 'Den mäter inget spektrum. En kamera har tre breda färgkanaler, automatisk exponering och automatisk vitbalans.',
  'docs.notList.2': 'Den mäter inga absoluta värden. Scenens ljusstyrka är en relativ indikator, inte resultatet av en fotometrisk mätning.',
  'docs.notList.3': 'Den mäter inte färgtemperaturen direkt. Färgtemperatur och dygnsrytmpåverkan är uppskattningar beräknade ur sRGB-färger.',
  'docs.notList.4': 'Den ser inte nätets flimmer. Sampling med 5 Hz ser bara pulsering under 2,5 Hz — nätets 100 Hz ligger utom räckhåll och appen kommer aldrig att redovisa det som ett mätvärde.',
  'docs.notList.5': 'Den ställer ingen diagnos och ger inget hälsoråd. Inget mätvärde är vare sig det ena eller det andra.',
  'docs.notList.6': 'Den jämför inte ditt ljus med någon officiell norm. Trösklarna är inställningar som du kan ändra i modul 02.',
  'docs.whatTitle': 'Vad den mäter och hur',
  'docs.whatLead': 'Telefonens kamera tittar på en belyst yta, och fem gånger i sekunden räknar appen ut medelvärdena för kanalerna R, G och B i bildrutans mellersta utsnitt. Ur de tre talen härleder den sju mätvärden.',
  'docs.whatCrop': 'Utsnittet är de mellersta 60 % av bredden och 60 % av höjden på bildrutan — precis den rektangel som siktet ritar upp på skärmen SIKTE. Utanför den räknas ingenting.',
  'docs.whatRate': 'Ett sampel var 200:e ms, alltså 5 gånger i sekunden. Den senaste minuten ligger i minnet i full upplösning; allt äldre sparas var 5:e sekund och når trettio dagar tillbaka.',
  'docs.metricsTitle': 'De sju storheterna',
  'docs.formulasTitle': 'Formler',
  'docs.formula.share.formula': 'blåandel = B / (R + G + B) × 100 %',
  'docs.formula.share.text': 'Uträknad på sRGB-värden utan att gamma inverteras — med avsikt, för det är samma definition som i appens föregående version, så trösklar som ställdes in då betyder fortfarande samma sak. Den skiljer färgen från ljusstyrkan.',
  'docs.formula.brightness.formula': 'ljusstyrka = (R + G + B) / 3 / 255 × 100 %',
  'docs.formula.brightness.text': 'Kanalernas genomsnittliga värde i procent av området. Den automatiska exponeringen förskjuter det i bakgrunden, så det är en relativ indikator — jämför två scener i stället för att läsa en enda siffra som en mätning.',
  'docs.formula.kelvin.title': 'Färgtemperatur — McCamys approximation',
  'docs.formula.kelvin.formula': 'n = (x − 0,3320) / (y − 0,1858)\nCCT = −449 n³ + 3525 n² − 6823,3 n + 5520,33',
  'docs.formula.kelvin.text': 'Först inverterar vi sRGB-gamma, sedan går vi via matrisen till CIE XYZ för vitpunkten D65 och räknar ut kromaticiteten x, y. McCamys formel är tillförlitlig ungefär mellan 2000 K och 12500 K. Utanför det området glider tredjegradspolynomet i väg, så resultatet kapas och markeras som otillförlitligt — skalans baslinje blir då streckad och meningen ”utanför metodens område” dyker upp.',
  'docs.formula.melanopic.title': 'Dygnsrytmpåverkan — melanopisk kvot',
  'docs.formula.melanopic.formula': 'mel = 0,0016 R + 0,3110 G + 0,8460 B\nY = 0,2127 R + 0,7152 G + 0,0722 B\nresultat = (mel / Y) × normalisering till 1,00 för neutralt vitt',
  'docs.formula.melanopic.text': 'Alla tre kanalerna i linjära värden. Den sanna storheten är integralen av spektrumet med melanopsinets känslighetskurva (med topp runt 490 nm); en kamera har tre breda kanaler, så vi viktar sRGB-primärfärgerna med melanopisk känslighet vid deras ungefärliga våglängder (R 612 nm, G 549 nm, B 465 nm). Riktningen på förändringen är tillförlitlig, det absoluta värdet är det inte — därför står tecknet ”≈” vid den här siffran.',
  'docs.formula.flicker.formula': 'flimmer = (max − min) / (max + min) × 100 %',
  'docs.formula.flicker.text': 'IES definition, uträknad ur ett fönster av ljusstyrkesampel. Frekvensen uppskattar vi ur antalet gånger signalen passerar sitt medelvärde. Sampling med 5 Hz ser bara modulation under 2,5 Hz (Nyquistgränsen), och vi räknar en frekvens som tillförlitlig först mellan 0,2 och 2 Hz vid en amplitud från 0,5 % — under den tröskeln är passagerna genom medelvärdet sensorbrus, inte en pulserande källa.',
  'docs.formula.uniformity.formula': 'jämnhet = mörkaste rutan / ljusaste rutan × 100 %',
  'docs.formula.uniformity.text': 'Vi delar utsnittet i nio rutor i ett rutnät på 3×3 och jämför ytterligheterna. 100 % är ljus fördelat helt jämnt. Ett lågt värde på en skärm betyder ljusläckage från bakgrundsbelysningen eller en reflex, på skrivbordet — en illa placerad lampa. Det är den enda storheten, tillsammans med komforten, där högre betyder bättre.',
  'docs.formula.comfort.formula': '100 poäng minus avdrag:\ndygnsrytm över 0,75 — upp till 35 p\nljusfärg över 4000 K — upp till 25 p\nflimmer över 5 % — upp till 25 p\njämnhet under 60 % — upp till 15 p',
  'docs.formula.comfort.text': 'Ett omdöme i stället för sex siffror. En storhet som inte gick att mäta ger inget avdrag — data som saknas låtsas aldrig vara ett bra resultat. Vikterna är vår redaktionella bedömning, inte en standard; därför visar modul 01 uppdelningen i beståndsdelar, så att det går att inte hålla med om omdömet.',
  'docs.rangesTitle': 'Områden och trösklar',
  'docs.rangesLead': 'Trösklarna nedan är de som gäller just nu — har du ändrat dem i modul 02 visar tabellen dina värden, inte fabrikens.',
  'docs.dirNormal': 'lägre betyder mildare',
  'docs.dirInvert': 'högre betyder bättre',
  'docs.privacyTitle': 'Data och integritet',
  'docs.privacyText': 'Kamerabilden skickas eller sparas ingenstans — ur varje bildruta blir bara tre tal kvar. Mätningar, trösklar och inställningar ligger i webbläsarens lagring på den här enheten. Appen gör inga nätverksanrop och fungerar utan nät.',
  'docs.mdrTitle': 'Förbehåll',
  'docs.freeText': 'Appen är gratis i sin helhet och förblir det: alla sju storheterna, historiken, rapporterna, exporten och läget utan nät fungerar utan konto, utan avgift och utan gränser. Den som vill tacka hittar modul 10 ”Stöd”.',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'Appen lästes in ofullständigt',
  'boot.filesTpl': 'De här filerna lästes inte in: {list}.',
  'boot.modulesTpl': 'De här modulerna anmälde sig inte: {list} — de posterna öppnas inte från listan.',
  'boot.modulesRangeTpl': 'modulerna {from}–{to}',
  'boot.tail': 'Läs om sidan. Hjälper inte det är filerna på servern ofullständiga.',
  'boot.loss.bus': 'modulerna slutar se varandra och mätningen startar inte',
  'boot.loss.metrics': 'inget värde räknas ut',
  'boot.loss.scaleCore': 'skalans geometri och talformateringen försvinner',
  'boot.loss.scaleText': 'alla texter i gränssnittet försvinner',
  'boot.loss.shell': 'ingen modul går att öppna',
  'boot.loss.engine': 'kameran och mätningen startar inte',
  'boot.loss.dash': 'panelen blir tom'
});
