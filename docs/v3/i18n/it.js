/* docs/v3/i18n/it.js — słownik WŁASNY wersji v3, włoski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/it.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * SKĄD TE ZDANIA: przekład z polskiej redakcji pierwotnej (pl.js), z angielskim
 * (en.js) jako wzorcem terminologii i rejestru. Terminologia siedmiu wielkości,
 * nazwy stref i formuły prawne pochodzą ze słownika WSPÓLNEGO
 * (docs/shared/i18n/it.js) i są tu trzymane bez wyjątku: quota di blu,
 * luminosità scena, temperatura colore, impatto circadiano (w opisie: rapporto
 * melanopico), sfarfallio, uniformità, comfort visivo; strefy: nella norma /
 * attenzione / critico. Pozostałe stałe odpowiedniki: cronologia (historia),
 * sessione (sesja), campione (próbka), misurazione (pomiar), grandezza
 * (wielkość), soglia (próg), lettura (odczyt), pannello (pulpit), tavola
 * (plansza), striscia (taśma).
 *
 * REJESTR: bezpośrednie „tu”, jak we włoskich aplikacjach użytkowych. Ton
 * rzeczowy i ciepły, bez marketingu. Cudzysłowy włoskie « … », apostrof
 * typograficzny (’) — tak samo jak w docs/v3/i18n/en.js. Przecinek dziesiętny
 * we wzorach (0,3320), bo wzór czyta człowiek, a nie parser; liczby wstawiane
 * przez '{…}' formatuje warstwa językowa.
 *
 * CZEGO TU NIE MA — i dlaczego: kluczy, które stoją już w słowniku wspólnym.
 * Nazwy stref, zdania oceniające, noty o granicach metody, nazwy i opisy
 * siedmiu wielkości oraz zastrzeżenie z rozporządzenia (UE) 2017/745 są
 * wspólne dla wersji i tłumaczy się je RAZ — poza jednym świadomym
 * nadpisaniem, opisanym przy 'verdict.critical.comfort'.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w docs/v3/i18n/en.js — pilnuje
 * tego docs/shared/i18n/keys.test.js. Klucza, którego tam nie ma, nie wolno
 * tu dopisywać: angielski jest wartością zapasową, więc to on jest miarą
 * kompletności.
 */
window.I18nData = window.I18nData || {};
window.I18nData['it'] = Object.assign(window.I18nData['it'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. */
  'app.wordmark': 'MONITOR DELLA LUCE',

  'state.idle': 'Pronto',
  'state.starting': 'Avvio',
  'state.running': 'Misurazione',
  'state.runningTpl': 'Misurazione {time}',
  'state.stopped': 'Fermato',
  'state.error': 'Errore fotocamera',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5,0 po włosku, 5.0 po angielsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'Avvia misurazione',
  'keys.starting': 'Avvio…',
  'keys.stop': 'Ferma',
  'keys.flip': 'Cambia',
  'keys.flipAria': 'Cambia fotocamera, anteriore o posteriore',
  'keys.menu': 'Menu',
  'keys.menuAria': 'Elenco dei moduli',
  'keys.back': '‹ Indietro',
  'keys.backAria': 'Torna al pannello',
  'keys.dash': 'Pannello',
  'keys.zoom': 'Ingrandisci l’anteprima',
  'keys.retry': 'Riprova',
  'keys.refresh': 'Ricarica',
  'keys.close': 'Chiudi',
  'keys.show': 'Mostra',
  'keys.apply': 'Applica',
  'keys.remove': 'Elimina',

  'monitor.legend': 'Anteprima di controllo',
  'monitor.badge': 'In diretta',

  'aim.title': 'Mira',
  'aim.hint': 'Il riquadro mostra esattamente la porzione di immagine che l’app misura.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'Canale principale',
  'readout.thresholdTpl': '(soglia {value})',
  'readout.contextTpl': 'min {min} · media {avg} · max {max} — ultimi 60 s',
  'readout.contextEmpty': 'nessun dato degli ultimi 60 s',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'Che cosa significa: {name}',
  'aria.channel': '{name}, {value}, {zone}. Mostra sul display grande.',
  'aria.channelStale': '{name}, nessun dato. Mostra sul display grande.',
  'aria.scale': 'Scala: {name}, da {min} a {max}. Adesso {value}, {zone}. Soglia di attenzione {warn}, soglia critica {crit}.',
  'aria.readout': '{name}: {value}, {zone}.',
  'aria.readoutApprox': '{name}: circa {value}, {zone}. Valore approssimato.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'Scala del canale principale. Nessun dato',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': 'Premi «Avvia misurazione», punta il telefono su una superficie illuminata e tienilo fermo per qualche secondo.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'Il comfort visivo è basso. Guarda nel modulo 01 per vedere che cosa lo abbassa.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'Inizia dal pulsante «Avvia misurazione» in fondo allo schermo. La fotocamera si accende solo dopo che lo hai premuto.',
  'transient.measureStopped': 'Misurazione conclusa · {time} · salvata nella cronologia.',
  'transient.newVersion': 'È disponibile una nuova versione dell’app.',
  'transient.thresholdsSaved': 'Soglie salvate.',
  'transient.thresholdsRejected': 'Non salvate — la soglia di attenzione e la soglia critica non possono scavalcarsi.',
  'transient.historyCleared': 'Cronologia cancellata.',

  'live.lead': 'Canale principale: {name}, {value}, {zone}.',
  'live.ready': 'Giudizio pronto. {name} {value}, {zone}.',
  'live.started': 'Misurazione iniziata.',
  'livebar.stopped': 'Misurazione fermata',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'Non c’è ancora nessuna registrazione. La cronologia si scrive durante la misurazione — avvia una misurazione per un minuto e torna qui.',
  'empty.recorderNoRange': 'In questo intervallo non c’è stata alcuna misurazione.',
  'empty.coverageTpl': 'La misurazione ha coperto {done} ore su {total}.',
  'empty.reportsNoData': 'Il rapporto giornaliero comparirà dopo il primo giorno intero con misurazioni.',
  'empty.compareOneSession': 'Per il confronto servono due sessioni concluse. Per ora ne hai una.',
  'empty.exportNoData': 'Non c’è nulla da esportare. Avvia la misurazione, così la cronologia avrà qualcosa dentro.',
  'empty.alertsOff': 'Gli avvisi sono disattivati. Una volta attivati, funzionano solo mentre l’app è aperta.',
  'empty.scheduleEmpty': 'Non è stata impostata alcuna ora. La pianificazione funziona solo mentre l’app è aperta.',
  'empty.historyEmpty': 'La cronologia è vuota.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'Elenco dei moduli',

  'modules.01.title': 'Registratore',
  'modules.01.desc': 'L’andamento della misurazione nel tempo, da un minuto a trenta giorni.',
  'modules.02.title': 'Soglie',
  'modules.02.desc': 'Imposta i tuoi limiti di attenzione e di allarme per ogni grandezza.',
  'modules.03.title': 'Calibrazione',
  'modules.03.desc': 'Il riferimento a una sorgente di luce nota, e ciò che la calibrazione non sistema.',
  'modules.04.title': 'Rapporti',
  'modules.04.desc': 'Riepiloghi giornalieri e settimanali impaginati come una stampa.',
  'modules.05.title': 'Esportazione',
  'modules.05.desc': 'Il salvataggio delle letture in un file CSV o JSON, con le colonne descritte.',
  'modules.06.title': 'Confronto',
  'modules.06.desc': 'Due sessioni affiancate, con la differenza espressa in numeri.',
  'modules.07.title': 'Test dello schermo',
  'modules.07.desc': 'Tavole di prova per controllare il tuo monitor, passo dopo passo.',
  'modules.08.title': 'Pianificazione',
  'modules.08.desc': 'Misurazioni alle ore che scegli tu.',
  'modules.09.title': 'Avvisi',
  'modules.09.desc': 'Una notifica quando una soglia viene superata — e quando non funzionerà.',
  'modules.10.title': 'Sostegno',
  'modules.10.desc': 'L’app è gratuita per intero. Qui puoi offrire un caffè all’autore.',
  'modules.11.title': 'Documentazione',
  'modules.11.desc': 'Che cos’è questa misurazione e che cosa di sicuro non è.',
  'modules.12.title': 'Impostazioni',
  'modules.12.desc': 'Tema, dimensione del testo, meno movimento, cancellazione della cronologia.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'Canali di misurazione',
  'channels.pick': 'Mostra sul display grande',
  'channels.stale': 'nessun dato',
  'channels.approx': 'valore approssimato',

  'help.unit': 'Unità',
  'help.range': 'Intervallo',
  'help.thresholds': 'Soglie',
  'help.warn': 'Soglia di attenzione',
  'help.crit': 'Soglia critica',
  'help.now': 'adesso',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „Grandezza” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'Grandezza',
  'col.unit': 'Unità',
  'col.range': 'Intervallo',
  'col.direction': 'Direzione',
  'col.time': 'Ora',
  'col.date': 'Data',
  'col.zone': 'Zona',
  'col.avg': 'Media',
  'col.min': 'Minimo',
  'col.max': 'Massimo',
  'col.name': 'Colonna',
  'col.meaning': 'Che cosa contiene',
  'col.channel': 'Canale',
  'col.gain': 'Guadagno',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'Intervallo di tempo',
  'recorder.range.60s': '60 s',
  'recorder.range.15min': '15 min',
  'recorder.range.1h': '1 h',
  'recorder.range.24h': '24 h',
  'recorder.range.30d': '30 giorni',
  'recorder.gap': 'nessuna misurazione',
  'recorder.sessionTitle': 'Statistiche della sessione',
  'recorder.zonesCaption': 'Distribuzione delle zone per la quota di blu',
  'recorder.tableCaption': 'Letture dell’intervallo selezionato',
  'recorder.crosshair': 'Cursore di lettura',
  'recorder.prevAria': 'Punto precedente',
  'recorder.nextAria': 'Punto successivo',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'Aspetto',
  'settings.themeLabel': 'Tema',
  'settings.themeSystem': 'Come il sistema',
  'settings.themeLight': 'Chiaro',
  'settings.themeDark': 'Scuro',
  'settings.themeHint': 'Il tema «come il sistema» cambia insieme all’impostazione del telefono.',
  'settings.textLabel': 'Dimensione del testo',
  /* Mnożnik jako LICZBA we wstawce — 1,15 po włosku, 1.15 po angielsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'Ingrandisce tutta l’interfaccia, non solo le lettere — i pulsanti e le righe crescono insieme al testo.',
  'settings.motionGroup': 'Movimento',
  'settings.motionLabel': 'Riduci il movimento',
  'settings.motionHint': 'Disattiva tutte le transizioni. La lancetta della scala allora salta una volta al secondo invece di scorrere.',
  'settings.dataTitle': 'Dati',
  'settings.clearLabel': 'Cancella la cronologia',
  'settings.clearHintTpl': 'La cronologia contiene adesso {count} punti salvati.',
  'settings.clearHintEmpty': 'La cronologia è vuota.',
  'settings.clearTitle': 'Cancellare la cronologia?',
  'settings.clearConfirm': 'Cancellare tutta la cronologia delle misurazioni? Non si può annullare.',
  'settings.clearKey': 'Cancella',
  'settings.aboutTitle': 'Informazioni sull’app',
  'settings.versionTpl': '{app}, versione {version}.',
  'settings.offlineText': 'L’app funziona senza rete. Dopo la prima apertura tutti i suoi file stanno nella memoria del browser, quindi la modalità aereo non cambia nulla. Nulla viene inviato ad alcun server, perché l’app non effettua richieste di rete.',
  'settings.docsKey': 'Apri la documentazione',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'Annulla',
  'common.save': 'Salva',
  'common.reset': 'Ripristina i valori predefiniti',
  'common.yes': 'Sì',
  'common.no': 'No',
  'common.on': 'Attivato',
  'common.off': 'Disattivato',
  'common.sep': ' · ',
  'common.stepsTitle': 'Passo dopo passo',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'A che cosa servono le tue soglie',
  'modules.02.intro': 'La soglia decide quando l’app dice «Attenzione» e quando dice «Critico». I valori predefiniti sono una nostra valutazione redazionale, non una norma — se misuri in condizioni diverse, spostali come ti serve. Il giudizio e la frase sul pannello si calcolano subito dalle nuove soglie.',
  'modules.02.orderNormal': 'La soglia di attenzione deve stare sotto quella critica.',
  'modules.02.orderInvert': 'Qui un valore più alto è migliore, quindi la soglia di attenzione sta sopra quella critica.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'Anteprima della scala: {name}',
  'modules.02.nowTpl': 'adesso {value}',
  'modules.02.resetDone': 'Soglie predefinite ripristinate.',
  'modules.02.profilesTitle': 'Profili',
  'modules.02.profilesHint': 'Un profilo è un insieme salvato di soglie per tutte e sette le grandezze. Applicare un profilo le sostituisce tutte in una volta.',
  'modules.02.profileSaveKey': 'Salva le soglie attuali',
  'modules.02.profileNameLabel': 'Nome del nuovo profilo',
  'modules.02.profileNameHint': 'Il nome resta su questo dispositivo. Al massimo 40 caratteri.',
  'modules.02.profileNameEmpty': 'Inserisci un nome per il profilo.',
  'modules.02.profileSavedTpl': 'Profilo «{name}» salvato.',
  'modules.02.profileAppliedTpl': 'Profilo «{name}» applicato.',
  'modules.02.profileRemovedTpl': 'Profilo «{name}» eliminato.',
  'modules.02.profileFailed': 'Non è stato possibile applicare questo profilo.',
  'modules.02.profileCustomTpl': 'Profilo personale, salvato il {date}.',
  'modules.02.builtin.default.name': 'Predefinito',
  'modules.02.builtin.default.desc': 'Le soglie dal catalogo delle grandezze — il punto di partenza per ogni misurazione.',
  'modules.02.builtin.evening.name': 'Sera — delicato',
  'modules.02.builtin.evening.desc': 'Avvisa prima sul colore freddo e sull’impatto circadiano.',
  'modules.02.builtin.work.name': 'Lavoro alla scrivania',
  'modules.02.builtin.work.desc': 'Ammette una luce diurna chiara e fredda; sorveglia sfarfallio e uniformità.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'Perché funziona',
  'modules.03.why': 'Il sensore di una fotocamera ha uno scarto fisso tra i suoi canali. Misurare un foglio di carta bianca mostra quanto è grande quello scarto e permette di sottrarlo. È l’unica funzione di quest’app che alza davvero la precisione — e continua comunque a non trasformare una fotocamera in uno spettrometro.',
  'modules.03.steps.1': 'Metti un foglio di carta bianca sotto la luce che stai misurando.',
  'modules.03.steps.2': 'Premi «Avvia misurazione» sul pannello e riempi l’inquadratura con il foglio.',
  'modules.03.steps.3': 'Torna qui, premi «Calibra» e non muovere il telefono per tre secondi.',
  'modules.03.runKey': 'Calibra (3 s)',
  'modules.03.clearKey': 'Elimina la calibrazione',
  'modules.03.busyTpl': 'Misuro il foglio… mancano {sec} s',
  'modules.03.statusNone': 'Nessuna calibrazione. La misurazione funziona; considera i valori in senso comparativo.',
  'modules.03.statusOnTpl': 'Calibrato il {date} alle {time}.',
  'modules.03.gainsTitle': 'Guadagni dei canali',
  'modules.03.gainR': 'Rosso',
  'modules.03.gainG': 'Verde',
  'modules.03.gainB': 'Blu',
  'modules.03.gainsNone': 'non impostati',
  'modules.03.needRunning': 'Avvia prima la misurazione e punta la fotocamera su un foglio di carta bianca.',
  'modules.03.tooFew': 'Troppo pochi campioni. Controlla che la misurazione stia davvero funzionando.',
  'modules.03.tooDark': 'L’immagine è troppo scura per calibrare. Illumina meglio il foglio e riprova.',
  'modules.03.refused': 'Lo scarto tra i canali è troppo grande per accettarlo come calibrazione. Usa carta bianca in una luce uniforme.',
  'modules.03.done': 'Calibrato. La temperatura colore e l’impatto circadiano adesso saranno più precisi.',
  'modules.03.cleared': 'Calibrazione eliminata.',
  'modules.03.limitsTitle': 'Che cosa la calibrazione non sistema',
  'modules.03.limits.1': 'La calibrazione pareggia i tre canali della fotocamera e nulla oltre a questo. Non dà alla fotocamera uno spettro, quindi la temperatura colore e l’impatto circadiano restano approssimazioni calcolate dalle primarie sRGB.',
  'modules.03.limits.2': 'Non trasforma la luminosità scena in una grandezza assoluta — quel numero resta relativo. Non disattiva l’esposizione automatica né il bilanciamento del bianco, che spostano la lettura al di sotto.',
  'modules.03.limits.3': 'Non si trasferisce a un’altra luce: una calibrazione fatta sotto una lampadina descrive quella lampadina. Con una sorgente diversa, ripetila. E non cambia nulla di ciò che questa misurazione non è — continua a non essere un esame e a non essere una base per diagnosticare una malattia.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'Periodo del rapporto',
  'modules.04.rangeDay': 'Giornata',
  'modules.04.rangeWeek': 'Settimana',
  'modules.04.headTpl': 'Da {from} a {to} · {count} punti di cronologia.',
  'modules.04.tableTitle': 'Riepilogo',
  'modules.04.tableCaption': 'Media, minimo e massimo nel periodo selezionato',
  'modules.04.panoramaTitle': 'Panorama',
  'modules.04.panoramaAriaTpl': 'Panorama: {name}, {span}.',
  'modules.04.panoramaSpanDay': 'le ultime 24 ore suddivise per ora',
  'modules.04.panoramaSpanWeek': 'l’ultima settimana suddivisa per giorno',
  'modules.04.panoramaHint': 'L’altezza e il colore di una barra dicono la stessa cosa: nella norma — bassa, attenzione — media, critico — piena. Un trattino alla base indica un’ora senza misurazione.',
  'modules.04.coverageDayTpl': 'La misurazione ha coperto {done} ore su {total}.',
  'modules.04.coverageWeekTpl': 'La misurazione ha coperto {done} giorni su {total}.',
  'modules.04.zonesTitle': 'Distribuzione delle zone',
  'modules.04.zonesCaptionTpl': 'Calcolata per il canale principale: {name}.',
  'modules.04.worstTpl': 'Il momento più difficile: {value}.',
  'modules.04.worstNone': 'nessuno spicca',
  'modules.04.worstHourTpl': 'le ore {hour}',
  'modules.04.adviceTitle': 'Che cosa farci',
  'modules.04.adviceMelanopicTpl': 'L’impatto circadiano medio è stato {value}×. Alla sera conviene scendere sotto 0,50 — nel modo più semplice, con una lampadina più calda o la modalità notturna.',
  'modules.04.adviceKelvinTpl': 'La luce era fredda (in media {value} K). Per lavorare va benissimo; nelle due ore prima di dormire, sotto i 3000 K è più delicata.',
  'modules.04.adviceFlickerTpl': 'Si vede uno sfarfallio percepibile (in media {value}%). Di solito è colpa di un dimmer economico o dell’alimentatore della retroilluminazione.',
  'modules.04.adviceUniformityTpl': 'La luce si distribuisce in modo non uniforme ({value}%). Spostare la lampada o cambiarne l’angolo di solito dà più che cambiare la lampadina.',
  'modules.04.adviceWorstTpl': 'La maggior parte delle letture fuori dalle soglie si concentra alle ore {hour}.',
  'modules.04.adviceNone': 'In questo periodo nulla supera le soglie che hai impostato.',
  'modules.04.limitsTitle': 'Questo non è un consiglio sanitario',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'Le conclusioni derivano soltanto da ciò che ha visto la fotocamera di questo telefono. L’app non misura uno spettro e non formula alcuna diagnosi.',
  'modules.04.printHint': 'Questa pagina è impaginata come una stampa: la tabella e le didascalie si leggono allo stesso modo su carta, con la lente di ingrandimento del sistema e in un lettore di schermo.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'Intervallo dei dati',
  'modules.05.range1h': 'Ora',
  'modules.05.range24h': 'Giornata',
  'modules.05.range7d': '7 giorni',
  'modules.05.range30d': '30 giorni',
  'modules.05.csvKey': 'Salva il file CSV',
  'modules.05.jsonKey': 'Salva il file JSON',
  'modules.05.formatTitle': 'Formato del file',
  'modules.05.formatCsv': 'CSV: il punto e virgola separa le colonne, la virgola è il separatore decimale, la codifica è UTF-8 con il marcatore BOM. Excel impostato su una lingua che usa la virgola come separatore decimale apre un file così senza configurare nulla.',
  'modules.05.formatJson': 'JSON: gli stessi dati nel campo «points», con il punto decimale e la marca temporale in millisecondi — è ciò che il formato richiede.',
  'modules.05.resolution': 'La cronologia salva un punto ogni 5 secondi e arriva fino a 30 giorni indietro. Il file non contiene la risoluzione piena di cinque campioni al secondo — il motore la tiene solo per un minuto.',
  'modules.05.offline': 'Il file nasce sul dispositivo e resta sul dispositivo. L’esportazione non si collega ad alcuna rete.',
  'modules.05.columnsTitle': 'Le colonne spiegate',
  'modules.05.columnsCaption': 'Le colonne del file e il loro significato',
  'modules.05.descDate': 'La data del punto presa dall’orologio del dispositivo, scritta giorno-mese-anno.',
  'modules.05.descTime': 'L’ora del punto, al secondo.',
  'modules.05.descZone': 'La zona della quota di blu al momento del salvataggio. Il motore salva la zona solo per questa unica grandezza — per le altre, ricavala dalle soglie.',
  'modules.05.descMetricTpl': '{short} Unità: {unit}. Intervallo {min}–{max}.',
  'modules.05.previewTitle': 'Anteprima',
  'modules.05.previewHint': 'Le prime cinque righe del file, esattamente come verranno salvate.',
  'modules.05.savedTpl': 'File {name} salvato — {rows} righe.',
  'modules.05.failed': 'Questo browser non ha permesso di salvare il file.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'L’app salva su questo dispositivo ogni sessione di misurazione conclusa. Scegline due per vederle su un’unica striscia e leggere la differenza in numeri.',
  'modules.06.noSessions': 'Non c’è ancora nessuna sessione conclusa. Avvia una misurazione, fermala e torna qui.',
  'modules.06.slotA': 'Sessione A',
  'modules.06.slotB': 'Sessione B',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'Striscia',
  'modules.06.tapeAriaTpl': 'Andamento della sessione {slot}, grandezza {name}.',
  'modules.06.tapeHint': 'Le due sessioni sono distese sulla stessa larghezza: una barra è la stessa frazione della durata, non la stessa ora dell’orologio. L’altezza e il colore dicono la stessa cosa che sul pannello.',
  'modules.06.tapeChannelTpl': 'La striscia mostra il canale principale: {name}.',
  'modules.06.diffTitle': 'Differenza',
  'modules.06.diffCaption': 'Le medie delle due sessioni e la differenza tra loro',
  'modules.06.clearKey': 'Elimina le sessioni salvate',
  'modules.06.cleared': 'Le sessioni salvate sono state eliminate.',
  'modules.06.savedTpl': 'Sessione salvata: {dur}.',
  'modules.06.limitsTitle': 'Che cosa questo confronto non dice',
  'modules.06.limits': 'Stai confrontando due misurazioni, non due sorgenti di luce. Se tra una sessione e l’altra sono cambiati l’inquadratura, la distanza, l’ora del giorno o la posizione del telefono, la differenza parla anche di questo. Il confronto più onesto è la stessa scena prima e dopo un cambio di illuminazione.',
  'modules.06.keepTpl': 'Vengono ricordate al massimo {count} sessioni, le più recenti.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'Le tavole di controllo si mostrano a schermo intero su questo dispositivo. Servono a guardare lo schermo con i propri occhi: se il bianco è uniforme, se i grigi virano verso un colore e se la retroilluminazione trapela agli angoli.',
  'modules.07.steps.1': 'Imposta la luminosità dello schermo a quella con cui lavori di solito e disattiva la modalità notturna di sistema.',
  'modules.07.steps.2': 'Scegli una tavola dall’elenco qui sotto. Riempirà tutto lo schermo.',
  'modules.07.steps.3': 'Guarda da circa sessanta centimetri, perpendicolarmente allo schermo. Poi osserva la stessa tavola di sbieco.',
  'modules.07.steps.4': 'Esci con il pulsante «Chiudi la tavola» o con il tasto Esc e passa alla successiva.',
  'modules.07.planesTitle': 'Tavole',
  'modules.07.exitKey': 'Chiudi la tavola',
  'modules.07.showAriaTpl': 'Mostra la tavola: {name}',
  'modules.07.planeAriaTpl': 'Tavola di controllo: {name}. Il pulsante di chiusura è in fondo allo schermo.',
  'modules.07.plane.white.name': 'Bianco',
  'modules.07.plane.white.hint': 'Cerca macchie, dominanti di colore e zone più chiare vicino ai bordi. Il bianco dovrebbe essere un unico colore su tutta la superficie.',
  'modules.07.plane.gray75.name': 'Grigio 75%',
  'modules.07.plane.gray75.hint': 'Il grigio deve essere grigio. Una dominante verdastra o rosata significa che il bilanciamento del bianco dello schermo è sballato.',
  'modules.07.plane.gray50.name': 'Grigio 50%',
  'modules.07.plane.gray50.hint': 'La tavola migliore per giudicare una dominante. Confronta il centro con gli angoli.',
  'modules.07.plane.gray25.name': 'Grigio 25%',
  'modules.07.plane.gray25.hint': 'Il grigio scuro rivela le perdite di retroilluminazione e le bande sui pannelli economici.',
  'modules.07.plane.black.name': 'Nero',
  'modules.07.plane.black.hint': 'In una stanza buia qui si vede ogni perdita di retroilluminazione e ogni angolo schiarito.',
  'modules.07.plane.red.name': 'Rosso puro',
  'modules.07.plane.red.hint': 'Il rosso uniforme rivela i subpixel morti e le disomogeneità del pannello.',
  'modules.07.plane.green.name': 'Verde puro',
  'modules.07.plane.green.hint': 'Il verde porta più luminosità di tutti — su di esso un pixel guasto si individua più facilmente.',
  'modules.07.plane.blue.name': 'Blu puro',
  'modules.07.plane.blue.hint': 'Il blu mostra lo sporco e le sbavature sulla superficie dello schermo meglio del bianco.',
  'modules.07.plane.grid.name': 'Griglia',
  'modules.07.plane.grid.hint': 'Le linee devono essere nitide negli angoli quanto al centro. La sfocatura ai bordi è una questione di scalatura dell’immagine.',
  'modules.07.warn': 'Una tavola copre tutto lo schermo, compreso il pannello di controllo con il pulsante di misurazione. È l’unico punto dell’app in cui questo accade, ed è per questo che il pulsante di uscita è grande e sempre visibile. Finché la tavola è sullo schermo la misurazione continua e non si può fermare — chiudi la tavola per tornare ai pulsanti.',
  'modules.07.cameraTitle': 'Che cosa qui non puoi fare',
  'modules.07.camera': 'Un telefono non vede il proprio schermo, quindi queste tavole non le misuri con lo stesso dispositivo. Per misurare un monitor, mostra la tavola sul monitor e misura con il telefono — due dispositivi diversi e due ruoli diversi.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'La pianificazione ti ricorda di misurare a un’ora stabilita. Non accende la fotocamera da sola: all’ora fissata mostra un promemoria, e la misurazione la avvii tu con il pulsante «Avvia misurazione» sul pannello. Esattamente come la prima volta.',
  'modules.08.onlyOpenTitle': 'Quando questo non funzionerà',
  'modules.08.onlyOpen': 'La pianificazione funziona solo mentre l’app è aperta. Una scheda del browser chiusa non conta il tempo e non ricorderà nulla. Non chiediamo il permesso per le notifiche di sistema e non inviamo nulla in rete.',
  'modules.08.enableLabel': 'Attiva i promemoria',
  'modules.08.timesTitle': 'Orari',
  'modules.08.timeAriaTpl': 'Orario {n}: ora del promemoria',
  'modules.08.addKey': 'Aggiungi un orario',
  'modules.08.removeAriaTpl': 'Elimina l’orario {time}',
  'modules.08.addedTpl': 'Orario {time} aggiunto.',
  'modules.08.removedTpl': 'Orario {time} eliminato.',
  'modules.08.badTime': 'Inserisci l’ora nel formato 22:00.',
  'modules.08.nextTpl': 'Prossimo promemoria: {time}.',
  'modules.08.nextNone': 'I promemoria sono disattivati.',
  'modules.08.dueTpl': 'Ora di misurazione pianificata: {time}.',
  'modules.08.dueKey': 'Mostra il pannello',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'Un avviso sorveglia una sola grandezza e si fa sentire soltanto quando quella grandezza tiene la zona scelta ininterrottamente per il tempo che hai impostato. Non ferma mai la misurazione e non copre mai i pulsanti.',
  'modules.09.enableLabel': 'Attiva gli avvisi',
  'modules.09.metricLabel': 'Grandezza sorvegliata',
  'modules.09.levelLabel': 'Da quale zona',
  'modules.09.levelWarning': 'Da attenzione in su',
  'modules.09.levelCritical': 'Solo critica',
  'modules.09.sustainLabel': 'Dopo quanti secondi ininterrotti',
  'modules.09.sustainHint': 'Tempi più brevi danno più falsi allarmi quando muovi il telefono. Sotto i cinque secondi non scendiamo.',
  'modules.09.soundLabel': 'Un breve segnale acustico',
  'modules.09.soundHint': 'Il suono nasce sul dispositivo. Nulla viene scaricato dalla rete.',
  'modules.09.cooldownHint': 'Al massimo un avviso ogni due minuti. Un allarme ripetuto a ogni campione è un allarme che si disattiva per sempre.',
  'modules.09.whenNotTitle': 'Quando un avviso non funzionerà',
  'modules.09.whenNot': 'La notifica sta dentro l’app, non nel sistema. Non funzionerà quando l’app è chiusa o nascosta in secondo piano, quando la misurazione non è in corso e quando la grandezza sorvegliata non è misurabile in quel momento. Non chiediamo il permesso per le notifiche di sistema.',
  'modules.09.firedTpl': '{name}: {zone} da {sec} s — adesso {value}.',
  'modules.09.saved': 'Impostazioni dell’avviso salvate.',
  'modules.09.statusOnTpl': 'Sorveglio: {name}, {level}, dopo {sec} s.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'Quest’app è gratuita',
  'support.freeText': 'Tutte e sette le grandezze mostrano numeri dal primo avvio. Il registratore, le soglie, la calibrazione, i rapporti, l’esportazione, il confronto delle sessioni e tutta la cronologia di trenta giorni funzionano senza account, senza pagamenti e senza limiti — allo stesso modo offline. Qui nulla è messo da parte a pagamento per dopo.',
  'support.whyTitle': 'Perché lo chiedo',
  'support.whyText': 'Monitor della Luce lo faccio e lo mantengo da solo, dopo il lavoro. Il sostegno va nel tempo necessario per le correzioni, per le prove su altri telefoni e per i prossimi strumenti nell’elenco dei moduli. Nulla smetterà di funzionare se nessuno versa nulla.',
  'support.nothingTitle': 'Che cosa dà una donazione',
  'support.nothingText': 'Nulla. Nessun numero, nessun modulo e nessuna impostazione si sblocca dopo una donazione, perché tutto è sbloccato dall’inizio. Resta soltanto che io so che a qualcuno è servita.',
  'support.keyTitle': 'Se vuoi dare una mano',
  'support.keyLabel': 'Offrimi un caffè',
  'support.keyAria': 'Offrimi un caffè — apre una pagina esterna in una nuova scheda',
  'support.serviceText': 'Il profilo per le donazioni è gestito da Buy Me a Coffee ed è l’unica forma di sostegno in questa app. L’app non carica da lì alcuno script, widget o immagine — qui c’è un collegamento semplice e nulla oltre a questo.',
  'support.privacyText': 'Premere questo pulsante apre una pagina esterna in una nuova scheda ed è l’unico momento in cui qualcosa lascia questo dispositivo. Misure, cronologia e impostazioni restano dov’erano — nella memoria di questo browser.',
  'support.privacyPendingText': 'Quando l’indirizzo ci sarà, premere il pulsante aprirà una pagina esterna in una nuova scheda e sarà l’unico momento in cui qualcosa lascia questo dispositivo. Misure, cronologia e impostazioni restano dov’erano — nella memoria di questo browser.',
  'support.emptyTitle': 'Il profilo non è ancora collegato',
  'support.emptyText': 'L’indirizzo del profilo per le donazioni non è ancora stato inserito, quindi qui non c’è un pulsante che porterebbe da nessuna parte. Il resto dell’app funziona senza cambiamenti — nulla è in attesa di quella donazione.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'Che cosa quest’app NON misura',
  'docs.notList.1': 'Non misura uno spettro. Una fotocamera ha tre ampi canali di colore, un’esposizione automatica e un bilanciamento del bianco automatico.',
  'docs.notList.2': 'Non misura valori assoluti. La luminosità scena è un indicatore relativo, non il risultato di una misura fotometrica.',
  'docs.notList.3': 'Non misura direttamente la temperatura colore. La temperatura colore e l’impatto circadiano sono approssimazioni calcolate dalle primarie sRGB.',
  'docs.notList.4': 'Non vede lo sfarfallio della rete elettrica. Il campionamento a 5 Hz vede il pulsare solo sotto i 2,5 Hz — i 100 Hz della rete sono fuori portata e l’app non li riporterà mai come risultato.',
  'docs.notList.5': 'Non formula diagnosi e non dà consigli sanitari. Nessun risultato è né l’una né l’altra cosa.',
  'docs.notList.6': 'Non confronta la tua luce con alcun riferimento ufficiale. Le soglie sono impostazioni che puoi cambiare nel modulo 02.',
  'docs.whatTitle': 'Che cosa misura e come',
  'docs.whatLead': 'La fotocamera del telefono guarda una superficie illuminata e cinque volte al secondo l’app calcola le medie dei canali R, G e B della porzione centrale dell’inquadratura. Da quei tre numeri ricava sette indicatori.',
  'docs.whatCrop': 'La porzione è il 60% centrale della larghezza e il 60% dell’altezza del fotogramma — esattamente il rettangolo che il mirino traccia sulla schermata MIRA. Fuori da esso nulla viene conteggiato.',
  'docs.whatRate': 'Un campione ogni 200 ms, cioè 5 volte al secondo. L’ultimo minuto sta in memoria a risoluzione piena; tutto ciò che è più vecchio viene salvato ogni 5 secondi e arriva fino a trenta giorni indietro.',
  'docs.metricsTitle': 'Le sette grandezze',
  'docs.formulasTitle': 'Formule',
  'docs.formula.share.formula': 'quota di blu = B / (R + G + B) × 100%',
  'docs.formula.share.text': 'Calcolata sui valori sRGB senza invertire la gamma — di proposito, perché è la stessa definizione della versione precedente dell’app, così le soglie impostate allora significano ancora la stessa cosa. Separa il colore dalla luminosità.',
  'docs.formula.brightness.formula': 'luminosità = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': 'Il valore medio dei canali in percentuale dell’intervallo. L’esposizione automatica lo sposta al di sotto, quindi è un indicatore relativo — confronta due scene invece di leggere un singolo numero come una misura.',
  'docs.formula.kelvin.title': 'Temperatura colore — l’approssimazione di McCamy',
  'docs.formula.kelvin.formula': 'n = (x − 0,3320) / (y − 0,1858)\nCCT = −449 n³ + 3525 n² − 6823,3 n + 5520,33',
  'docs.formula.kelvin.text': 'Prima invertiamo la gamma sRGB, poi passiamo con la matrice a CIE XYZ per il bianco D65 e calcoliamo la cromaticità x, y. La formula di McCamy è attendibile all’incirca tra 2000 K e 12500 K. Fuori da quell’intervallo la cubica si sfalda, quindi il risultato viene tagliato e segnalato come non attendibile — allora la linea di base della scala diventa tratteggiata e compare la frase «fuori dall’intervallo del metodo».',
  'docs.formula.melanopic.title': 'Impatto circadiano — il rapporto melanopico',
  'docs.formula.melanopic.formula': 'mel = 0,0016 R + 0,3110 G + 0,8460 B\nY = 0,2127 R + 0,7152 G + 0,0722 B\nrisultato = (mel / Y) × normalizzazione a 1,00 per il bianco neutro',
  'docs.formula.melanopic.text': 'Tutti e tre i canali in valori lineari. La grandezza vera è l’integrale dello spettro con la curva di sensibilità della melanopsina (picco intorno ai 490 nm); una fotocamera ha tre canali larghi, quindi pesiamo le primarie sRGB con la sensibilità melanopica alle loro lunghezze d’onda approssimative (R 612 nm, G 549 nm, B 465 nm). La direzione del cambiamento è attendibile, il valore assoluto no — per questo accanto a questo numero sta il segno «≈».',
  'docs.formula.flicker.formula': 'sfarfallio = (max − min) / (max + min) × 100%',
  'docs.formula.flicker.text': 'La definizione IES, calcolata da una finestra di campioni di luminosità. La frequenza la stimiamo dal numero di passaggi del segnale attraverso il valore medio. Il campionamento a 5 Hz vede la modulazione solo sotto i 2,5 Hz (il limite di Nyquist), e riteniamo attendibile una frequenza soltanto tra 0,2 e 2 Hz con un’ampiezza dallo 0,5% in su — sotto quella soglia i passaggi attraverso la media sono rumore del sensore, non il pulsare della sorgente.',
  'docs.formula.uniformity.formula': 'uniformità = campo più scuro / campo più chiaro × 100%',
  'docs.formula.uniformity.text': 'Dividiamo la porzione in nove campi in una griglia 3×3 e confrontiamo gli estremi. 100% è luce distribuita in modo perfettamente uniforme. Un valore basso su uno schermo indica una perdita di retroilluminazione o un riflesso; sulla scrivania — una lampada messa male. È l’unica grandezza, insieme al comfort, in cui più alto significa migliore.',
  'docs.formula.comfort.formula': '100 punti meno le penalità:\nimpatto circadiano sopra 0,75 — fino a 35 pt\ncolore sopra 4000 K — fino a 25 pt\nsfarfallio sopra il 5% — fino a 25 pt\nuniformità sotto il 60% — fino a 15 pt',
  'docs.formula.comfort.text': 'Un solo giudizio al posto di sei numeri. Una grandezza che non si è potuta misurare non dà alcuna penalità — un dato mancante non si spaccia mai per un buon risultato. I pesi sono una nostra valutazione redazionale, non una norma; per questo il modulo 01 mostra la scomposizione nei singoli fattori, così è possibile non essere d’accordo con questo giudizio.',
  'docs.rangesTitle': 'Intervalli e soglie',
  'docs.rangesLead': 'Le soglie qui sotto sono quelle in vigore in questo momento — se le hai cambiate nel modulo 02, la tabella mostra i tuoi valori, non quelli di fabbrica.',
  'docs.dirNormal': 'più basso significa più delicato',
  'docs.dirInvert': 'più alto significa migliore',
  'docs.privacyTitle': 'Dati e privacy',
  'docs.privacyText': 'L’immagine della fotocamera non viene inviata né salvata da nessuna parte — di ogni fotogramma restano soltanto tre numeri. Le misure, le soglie e le impostazioni stanno nella memoria del browser su questo dispositivo. L’app non effettua alcuna richiesta di rete e funziona offline.',
  'docs.mdrTitle': 'Avvertenza',
  'docs.freeText': 'L’app è gratuita per intero e tale resta: tutte e sette le grandezze, la cronologia, i rapporti, l’esportazione e la modalità offline funzionano senza account, senza pagamenti e senza limiti. Chi vuole ringraziare troverà il modulo 10 «Sostegno».',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'L’app si è caricata in modo incompleto',
  'boot.filesTpl': 'Questi file non si sono caricati: {list}.',
  'boot.modulesTpl': 'Questi moduli non si sono presentati: {list} — quelle voci non si apriranno dall’elenco.',
  'boot.modulesRangeTpl': 'moduli {from}–{to}',
  'boot.tail': 'Ricarica la pagina. Se non basta, i file sul server sono incompleti.',
  'boot.loss.bus': 'i moduli smetteranno di vedersi tra loro e la misurazione non partirà',
  'boot.loss.metrics': 'nessun valore verrà calcolato',
  'boot.loss.scaleCore': 'spariranno la geometria della scala e la formattazione dei numeri',
  'boot.loss.scaleText': 'spariranno tutte le scritte dell’interfaccia',
  'boot.loss.shell': 'non si potrà aprire alcun modulo',
  'boot.loss.engine': 'la fotocamera e la misurazione non partiranno',
  'boot.loss.dash': 'il pannello resterà vuoto'
});
