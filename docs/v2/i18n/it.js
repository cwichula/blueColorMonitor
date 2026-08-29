/* docs/v2/i18n/it.js — słownik WERSJI 2, włoski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/it.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej.
 *
 * SKĄD TE ZDANIA: przekład z polskiej redakcji pierwotnej (pl.js), z angielskim
 * (en.js) jako wzorcem terminologii i rejestru. Zestaw kluczy jest identyczny
 * z pl.js — pilnuje tego docs/shared/i18n/keys.test.js.
 *
 * TERMINOLOGIA idzie za docs/shared/i18n/it.js, bo to tamten plik nazywa
 * siedem wielkości w całej aplikacji: quota di blu, luminosità scena,
 * temperatura colore, impatto circadiano, sfarfallio, uniformità, comfort
 * visivo. Klucze *.nameLower to te same nazwy małą literą, bo stoją w środku
 * zdania. Pozostałe stałe odpowiedniki: cronologia (historia), grandezza
 * (metryka), lettura (odczyt), campione (próbka), misurazione (pomiar),
 * soglia (próg). Rejestr bezpośredni („tu”), cudzysłowy włoskie « », przecinek
 * dziesiętny. Zastrzeżenia medyczne i akapity o prywatności przełożone
 * WIERNIE, bez osłabiania i bez dodawania obietnic — to zdania o skutkach
 * prawnych.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (i dlaczego):
 *   'zone.warning'        — wspólne mówi „Attenzione”, ta wersja od zawsze ma
 *                           tu osobne słowo: „Avviso” (i „Avvisi”
 *                           w podsumowaniu);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi o pomiarach
 *                           w liczbie mnogiej.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules. Włoski ma trzy kategorie: one, many (zapis skrócony
 * wielkich liczb, którego ta wersja nigdy nie pokazuje — dlatego równy other)
 * i other. Patrz nagłówek docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['it'] = Object.assign(window.I18nData['it'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Monitor della Luce — misura della luce blu',
  'app.description': 'Monitor della Luce — misura della quota di luce blu con la fotocamera del telefono. Sette letture, un grafico, la cronologia. Tutto disponibile, senza account e senza costi.',
  'app.skipToContent': 'Vai al contenuto',
  'app.measuring': 'Misurazione in corso',
  'app.docsButton': 'Documentazione e spiegazioni',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — versione 2',

  'nav.aria': 'Navigazione principale',
  'nav.tablistAria': 'Schermate dell\'app',
  'nav.measure': 'Misura',
  'nav.history': 'Cronologia',
  'nav.tools': 'Strumenti',
  'nav.support': 'Sostegno',
  'nav.more': 'Altro',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Documentazione',
  'panel.thresholds': 'Soglie e profili',
  'panel.reports': 'Rapporti',
  'panel.export': 'Esportazione dei dati',
  'panel.compare': 'Confronto A/B',
  'panel.calibration': 'Calibrazione con foglio bianco',
  'panel.screenCheck': 'Controlla il mio monitor',
  'panel.schedule': 'Programmazione',
  'panel.alerts': 'Allerte di esposizione',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Indietro',
  'action.close': 'Chiudi',
  'action.refresh': 'Aggiorna',
  'action.apply': 'Applica',
  'action.delete': 'Elimina',
  'action.hide': 'Nascondi',
  'action.start': 'Start',
  'action.stop': 'Stop',
  'action.switch': 'Cambia',
  'action.switchAria': 'Cambia fotocamera: anteriore o posteriore',
  'action.resetDefaults': 'Ripristina predefinite',
  'action.reports': 'Rapporti',
  'action.exportCsv': 'Esporta CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Schermata: {name}',
  'a11y.measureStarted': 'Misurazione avviata.',
  'a11y.measureStopped': 'Misurazione fermata.',
  'a11y.measureStoppedSummary': 'Misurazione fermata. Tempo: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'Profilo di soglie applicato.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Conferma',
  'dialog.confirm': 'Confermo',
  'dialog.cancel': 'Annulla',
  'dialog.infoTitle': 'Informazione',
  'dialog.ok': 'Ho capito',

  'help.sheetTitle': 'Descrizione della grandezza',
  'help.unit': 'Unità',
  'help.scaleRange': 'Intervallo della scala',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'Avviso',
  'threshold.crit': 'Critico',
  'threshold.warnLabel': 'Soglia di avviso',
  'threshold.critLabel': 'Soglia critica',
  'threshold.warnAria': '{name} — soglia: avviso',
  'threshold.critAria': '{name} — soglia: critico',

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

  'firstRun.title': 'Come misurare',
  'firstRun.text': 'Premi «Start», punta il telefono su una superficie illuminata e tienilo fermo per qualche secondo. Il riquadro nell\'anteprima mostra la parte che l\'app legge davvero.',
  'firstRun.close': 'Chiudi il suggerimento',

  'camera.live': 'IN DIRETTA',
  'camera.idle': 'La fotocamera è spenta. Premi «Start», punta il telefono su una superficie illuminata e tienilo fermo per qualche secondo.',
  'camera.stopped': 'Misurazione fermata. Premi «Start» per misurare di nuovo.',

  'error.cameraStart': 'Non è stato possibile avviare la fotocamera.',
  'error.engineMissing': 'Il modulo di misurazione non è stato caricato.',

  'metrics.sevenTitle': 'Sette letture',
  'measure.tilesSub': 'Aggiornate 5 volte al secondo',

  'session.title': 'Questa sessione',
  'session.duration': 'Tempo di misurazione',
  'session.samples': 'Numero di campioni',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     „Avvisi” to nie to samo słowo co „Avviso” pod suwakiem. */
  'zone.count.good': 'Nella norma',
  'zone.count.warning': 'Avvisi',
  'zone.count.critical': 'Critici',

  'note.calibrated': 'Misura calibrata con un foglio bianco — i canali sono allineati.',

  'tile.helpAria': 'Che cosa significa: {name}',
  'tile.noMeasurement': 'Nessuna misura',
  'tile.outOfScale': 'Fuori scala',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Avviso',
  'zone.spoken.warning': 'avviso',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Andamento nel tempo',
  'history.pickHint': 'Scegli una grandezza e un intervallo',
  'history.metricLabel': 'Grandezza',
  'history.rangeAria': 'Intervallo di tempo del grafico',
  'history.emptyTitle': 'Nessun dato in questo intervallo',
  'history.emptyText': 'Avvia una misurazione nella schermata Misura — il grafico si riempie in pochi secondi.',
  'history.tableTitle': 'Ultime letture',
  'history.tableHide': 'Nascondi la tabella',
  'history.tableShow': 'Mostra la tabella',
  'history.tableCaption': 'Le ultime letture della misurazione, la più recente in alto.',
  'history.tableEmpty': 'Nessuna lettura. Avvia una misurazione nella schermata Misura.',

  'table.time': 'Ora',
  'table.metric': 'Grandezza',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     dłuższy zapis łamał się na dwie linie. */
  'range.1m': '1 min',
  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 giorni',
  'range.30d': '30 giorni',

  'chart.now': 'adesso',
  'chart.countSub': {
    one: '{n} lettura nell\'intervallo scelto',
    many: '{n} letture nell\'intervallo scelto',
    other: '{n} letture nell\'intervallo scelto'
  },
  'chart.aria': '{name}, intervallo {range}, {count}, ultimo valore {value} {unit}.',
  'chart.ariaZone': '{name}, intervallo {range}, {count}, ultimo valore {value} {unit}, zona: {zone}.',
  'chart.ariaEmpty': '{name} — nessun dato nell\'intervallo {range}.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Procedure guidate e funzioni di supporto',
  'tools.note': 'Gli strumenti aiutano a interpretare una misura. Sono tutti disponibili da subito e la misurazione stessa funziona indipendentemente da loro.',

  'tool.thresholds.sub': 'Quando un valore deve accendere un avviso',
  'tool.compare.sub': 'Quale delle due luci è più delicata',
  'tool.calibration.sub': 'L\'unica funzione che migliora davvero la precisione',
  'tool.screenCheck.sub': 'Cinque passi e un giudizio pronto sullo schermo',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Programmazione delle
     soglie” kontra „Programmazione”. Tak było i tak zostaje. */
  'tool.schedule.title': 'Programmazione delle soglie',
  'tool.schedule.sub': 'Soglie diverse alla sera, senza doverci pensare',
  'tool.alerts.sub': 'Un segnale quando la zona critica dura troppo a lungo',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Impostazioni',
  'more.thresholdsSub': 'Quando un valore deve accendere un avviso',
  'more.docsSub': 'Come misurare e che cosa questa misura non dice',
  'more.appearanceTitle': 'Aspetto e accessibilità',

  'settings.theme': 'Tema',
  'theme.auto': 'Come il sistema',
  'theme.light': 'Chiaro',
  'theme.dark': 'Scuro',

  'settings.textScale': 'Dimensione del testo',
  'textScale.100': 'Standard',
  'textScale.115': 'Più grande (115%)',
  'textScale.130': 'Massima (130%)',

  'settings.contrast': 'Contrasto più alto',
  'settings.contrastSub': 'Bordi più marcati e testo secondario più scuro.',
  'settings.sound': 'Suono delle allerte',
  'settings.soundSub': 'Un breve segnale quando si attiva un\'allerta di esposizione.',
  'settings.vibrate': 'Vibrazione con le allerte',
  'settings.vibrateSub': 'Funziona solo sui dispositivi che la supportano.',

  'more.dataTitle': 'Dati',
  'more.clearHistory': 'Cancella la cronologia delle misurazioni',
  'more.clearHistorySub': 'Elimina le letture salvate da questo dispositivo. Soglie, profili e impostazioni restano.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'L\'app è gratuita per intero. ',
  'more.supportLink': 'Puoi sostenerla volontariamente.',

  'dialog.clearHistory.title': 'Eliminare la cronologia salvata?',
  'dialog.clearHistory.body': {
    one: 'Elimineremo {n} punto di misura salvato su questo dispositivo. L\'operazione non si può annullare. Soglie, profili e impostazioni resteranno intatti.',
    many: 'Elimineremo {n} punti di misura salvati su questo dispositivo. L\'operazione non si può annullare. Soglie, profili e impostazioni resteranno intatti.',
    other: 'Elimineremo {n} punti di misura salvati su questo dispositivo. L\'operazione non si può annullare. Soglie, profili e impostazioni resteranno intatti.'
  },
  'dialog.clearHistory.confirm': 'Elimina la cronologia',
  'dialog.clearHistory.cancel': 'Lascia',

  'toast.historyCleared': 'Cronologia delle misurazioni eliminata.',
  'toast.screenUnavailable': 'Questa schermata non è ancora disponibile in questa versione.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'Che cosa misura questa app',
  'docs.leadText': 'La fotocamera del telefono guarda una superficie illuminata e cinque volte al secondo l\'app calcola la media dei canali R, G e B della porzione centrale dell\'inquadratura. Da questi tre numeri ricava sette letture.',
  'docs.limitsTitle': 'I limiti del metodo',
  'docs.limitsText': 'Una fotocamera ha tre ampi canali di colore, l\'esposizione automatica e il bilanciamento del bianco automatico. Non misura uno spettro e non conosce valori assoluti, quindi la luminosità è un indicatore relativo, non lux. La temperatura colore e l\'impatto circadiano sono approssimazioni calcolate dalle primarie sRGB. Il campionamento a {rate} Hz vede lo sfarfallio solo sotto i {limit} Hz — quello di rete a 100 Hz è fuori portata e l\'app non lo riporterà mai come risultato.',

  'note.howTo.repeat.title': 'Ripeti la misura',
  'note.howTo.repeat.text': 'Una singola lettura è un\'istantanea. Una dozzina di secondi di misurazione dà un quadro più attendibile.',

  'docs.scale': 'Scala',
  'docs.direction': 'Direzione',
  'docs.directionHigher': 'Più alto è meglio',
  'docs.directionLower': 'Più basso è più delicato',
  'docs.privacyTitle': 'Dati e privacy',
  'docs.privacyText': 'L\'immagine della fotocamera non viene inviata né salvata da nessuna parte — di ogni fotogramma restano soltanto tre numeri. Misure, soglie e impostazioni stanno nella memoria del browser su questo dispositivo. L\'app non esegue alcuna richiesta di rete e funziona offline.',
  'docs.freeLine': 'Tutte e sette le letture, la cronologia, il grafico, gli strumenti e la modalità offline funzionano per chiunque, senza account e senza costi.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Tutto è disponibile',
  'support.heroText': 'Tutte e sette le letture, la cronologia delle misurazioni, il grafico, tutti gli strumenti e la modalità offline funzionano per chiunque, da subito. Senza account, senza limiti e senza costi.',
  'support.whyTitle': 'Perché lo chiedo',
  'support.whyText': '{app} nasce dopo il lavoro e non guadagna su nessuno: non ha pubblicità, non raccoglie dati e non ha nulla da vendere. Mantenerla e portarla avanti — nuove letture, correzioni, prove su altri telefoni — costa tempo. Se l\'app ti è stata utile, puoi dare una mano. Non sei obbligato.',
  'support.whatTitle': 'Che cosa dà una donazione',
  'support.whatText': 'Niente. Davvero non sblocca nulla e non accelera nulla — l\'app ha lo stesso aspetto e funziona esattamente allo stesso modo prima e dopo. Dà soltanto questo: che l\'autore sappia che questo lavoro è servito a qualcuno.',
  'support.button': 'Offrimi un caffè',
  'support.pendingTitle': 'Il profilo non è ancora collegato',
  'support.pendingText': 'Qui non c\'è ancora un indirizzo a cui inviare un sostegno. Comparirà in questo punto quando sarà pronto — fino ad allora tutto nell\'app funziona esattamente allo stesso modo.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'Il pulsante apre la pagina esterna di Buy Me a Coffee in una nuova scheda. È l\'unico momento in cui qualcosa lascia questo dispositivo — e accade solo dopo che lo hai premuto. Misure, cronologia e impostazioni restano qui.',
  'privacy.externalPending': 'Quando l\'indirizzo ci sarà, premere il pulsante aprirà una pagina esterna in una nuova scheda. Sarà l\'unico momento in cui qualcosa lascia questo dispositivo. Misure, cronologia e impostazioni restano qui.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (riserva in ui-core.js)',
  'boot.need.metrics': 'nessun valore verrà calcolato',
  'boot.need.bus': 'i moduli smetteranno di vedersi',
  'boot.need.ui': 'non sarà possibile cambiare schermata',
  'boot.need.engine': 'la fotocamera e la misurazione non partiranno',
  'boot.need.support': 'la schermata Sostegno sarà vuota',
  'boot.need.tools': 'la scheda Strumenti sarà vuota',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'Questi moduli non sono stati caricati: {list}.',
  'boot.consoleHint': 'Controlla l\'ordine e i percorsi dei tag <script> in index.html.',
  'boot.incompleteTitle': 'L\'app si è caricata in modo incompleto',
  'boot.incompleteText': '{missing} Ricarica la pagina; se non basta, i file sul server sono incompleti.',
  'boot.newVersion': 'È disponibile una nuova versione dell\'app.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'Che cosa fanno le soglie. ',
  'thresholds.noteText': 'La soglia di avviso accende lo stato giallo, la soglia critica quello rosso. La modifica ha effetto subito — anche sulla lettura già presente sullo schermo. Il tuo set di soglie puoi salvarlo con un nome e tornarci quando vuoi.',
  'thresholds.profilesTitle': 'Profili di soglie',
  'thresholds.profilesSub': 'I tre integrati e i tuoi',
  'thresholds.customName': 'Nome del profilo personale',
  'thresholds.customPlaceholder': 'per esempio Camera da letto alla sera',
  'thresholds.save': 'Salva le soglie attuali',
  'thresholds.saveHelp': 'Salva esattamente le soglie impostate qui sopra.',

  'profile.builtin.default.name': 'Predefinito',
  'profile.builtin.default.desc': 'Le soglie dal catalogo delle grandezze — il punto di partenza per tutte le misure.',
  'profile.builtin.evening.name': 'Sera — delicato',
  'profile.builtin.evening.desc': 'Avvisa prima sul colore freddo e sull\'impatto circadiano.',
  'profile.builtin.work.name': 'Lavoro alla scrivania',
  'profile.builtin.work.desc': 'Ammette una luce diurna chiara e fredda; sorveglia lo sfarfallio e l\'uniformità.',
  'profile.custom.desc': 'Profilo personale salvato il {date}.',

  'toast.thresholdsReset': 'Soglie predefinite ripristinate.',
  'toast.thresholdOrder': 'La soglia di avviso deve essere più bassa di quella critica.',
  'toast.thresholdOrderInverted': 'Per questa grandezza la soglia di avviso deve essere più alta di quella critica.',
  'toast.profileNameMissing': 'Inserisci il nome del profilo.',
  'toast.profileSaved': 'Profilo «{name}» salvato.',
  'toast.profileApplied': 'Profilo «{name}» applicato.',
  'toast.profileApplyFailed': 'Non è stato possibile applicare questo profilo.',
  'toast.profileRemoved': 'Profilo eliminato.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'A che cosa serve la programmazione. ',
  'schedule.noteText': 'Alla sera hanno senso soglie diverse da quelle di mezzogiorno. Una regola «da–a» cambia il profilo da sola, così non devi ricordartene. La programmazione non avvia e non ferma mai una misurazione.',
  'schedule.toggle': 'Attiva il cambio automatico',
  'schedule.toggleSub': 'Controllato ogni minuto sull\'orologio del dispositivo.',
  'schedule.emptyTitle': 'Nessuna regola',
  'schedule.emptyText': 'Aggiungi la prima regola con il pulsante qui sotto.',
  'schedule.add': 'Aggiungi una regola',
  'schedule.to': 'a',
  'schedule.profile': 'Profilo',
  'schedule.fromAria': 'Regola {n}: ora di inizio',
  'schedule.toAria': 'Regola {n}: ora di fine',
  'toast.scheduleTimeFormat': 'Inserisci gli orari nel formato 22:00.',
  'toast.scheduleEnded': 'La programmazione è finita — sono tornate le soglie precedenti.',
  'toast.scheduleApplied': 'La programmazione ha attivato il profilo «{name}».',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'Che cosa fa un\'allerta. ',
  'alerts.noteText': 'Sorveglia una sola grandezza e si fa sentire soltanto quando questa mantiene la zona scelta senza interruzioni per il tempo impostato. Non ferma mai la misurazione e non copre i pulsanti.',
  'alerts.toggle': 'Attiva le allerte di esposizione',
  'alerts.toggleSub': 'Funzionano solo durante una misurazione in corso.',
  'alerts.metric': 'Grandezza sorvegliata',
  'alerts.level': 'Da quale zona',
  'alerts.level.warning': 'Da avviso in su',
  'alerts.level.critical': 'Solo critica',
  'alerts.sustain': 'Dopo quanti secondi senza interruzioni',
  'alerts.sustainHelp': 'Tempi più brevi danno più falsi allarmi quando muovi il telefono.',
  'alerts.sound': 'Un breve segnale acustico',
  'alerts.soundSub': 'Il suono è generato localmente. Si può anche disattivare del tutto nella schermata Altro.',
  'alerts.barTitle': 'Allerta di esposizione',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} mantiene la zona di avviso da {seconds} s — adesso {value} {unit}.',
  'alerts.message.critical': '{name} mantiene la zona critica da {seconds} s — adesso {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'Come confrontare. ',
  'compare.noteText': 'Avvia la misurazione, punta la fotocamera sulla prima sorgente e salvala come A. Senza cambiare la distanza né l\'angolo, cambia la luce e salva B. Il confronto ha senso soltanto se la scena è la stessa.',
  'compare.slotA': 'Luce A',
  'compare.slotB': 'Luce B',
  'compare.save': 'Salva la lettura attuale',
  'compare.savedAt': 'Salvata il {date}, {time}',
  'compare.empty': 'Non è ancora stato salvato nulla.',
  'compare.verdictTitle': 'Esito del confronto',
  'compare.verdictEmpty': 'Salva entrambe le luci per vedere quale è più delicata.',
  'compare.notEnough': 'Dati insufficienti per confrontare queste due misure.',
  'compare.tie': 'Le due sorgenti risultano praticamente uguali ({metric}: {a} e {b} {unit}). La differenza rientra nel rumore della misura.',
  'compare.betterA': 'Più delicata è la luce A — {metric} è {better} {unit} contro {worse} {unit}.',
  'compare.betterB': 'Più delicata è la luce B — {metric} è {better} {unit} contro {worse} {unit}.',
  'compare.clear': 'Cancella il confronto',
  'toast.compareSavedA': 'Luce A salvata.',
  'toast.compareSavedB': 'Luce B salvata.',
  'toast.compareCleared': 'Confronto cancellato.',
  'toast.measureFirst': 'Avvia prima una misurazione nella schermata Misura.',

  /* Nazwa wielkości w środku zdania. Po włosku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. */
  'metric.share.nameLower': 'quota di blu',
  'metric.brightness.nameLower': 'luminosità scena',
  'metric.kelvin.nameLower': 'temperatura colore',
  'metric.melanopic.nameLower': 'impatto circadiano',
  'metric.flicker.nameLower': 'sfarfallio',
  'metric.uniformity.nameLower': 'uniformità',
  'metric.comfort.nameLower': 'comfort visivo',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'Perché funziona. ',
  'calib.noteText': 'Il sensore di una fotocamera ha uno scarto fisso fra i canali. Misurare un foglio bianco mostra quanto è grande e permette di sottrarlo. È l\'unica funzione di questa app che migliora davvero la precisione — e non trasforma comunque una fotocamera in uno spettrometro.',
  'calib.step1': 'Metti un foglio bianco sotto la luce da misurare',
  'calib.step2': 'Avvia la misurazione e riempi l\'inquadratura con il foglio',
  'calib.step3': 'Premi «Calibra» e non muovere il telefono per 3 secondi',
  'calib.done': 'Calibrato il {date}, {time}.',
  'calib.none': 'Nessuna calibrazione. La misurazione funziona, considera i valori in senso comparativo.',
  'calib.gain': 'Guadagno {channel}',
  'calib.gainsLabel': 'Guadagni dei canali',
  'calib.gainsUnset': 'non impostati',
  'calib.start': 'Calibra (3 s)',
  'calib.clear': 'Elimina la calibrazione',
  'toast.calibCleared': 'Calibrazione eliminata.',
  'calib.error.noEngine': 'Il modulo di misurazione non è disponibile.',
  'calib.error.notRunning': 'Avvia prima la misurazione e punta la fotocamera su un foglio bianco.',
  'calib.error.busy': 'La calibrazione è già in corso.',
  'calib.error.tooFewSamples': 'Campioni insufficienti. Verifica che la misurazione sia davvero in corso.',
  'calib.error.tooDark': 'L\'immagine è troppo scura per calibrare. Illumina meglio il foglio e riprova.',
  'calib.error.tooSkewed': 'Lo scarto fra i canali è troppo grande per accettarlo come calibrazione. Usa un foglio bianco in luce uniforme.',
  'calib.ok': 'Calibrato. La temperatura colore e l\'impatto circadiano saranno ora più precisi.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'A che cosa serve. ',
  'screencheck.noteText': 'Cinque passi controllano un monitor come lo controlla una recensione: il bianco a due livelli di luminosità, l\'uniformità della retroilluminazione e se la modalità notturna di sistema cambia davvero qualcosa. La procedura guidata legge una misurazione già in corso; non la avvia da sola.',
  'screencheck.step.white100.title': 'Bianco alla massima luminosità',
  'screencheck.step.white100.hint': 'Apri una pagina bianca sul monitor, imposta la luminosità al massimo e riempi l\'inquadratura con lo schermo.',
  'screencheck.step.white20.title': 'Bianco a bassa luminosità',
  'screencheck.step.white20.hint': 'Abbassa la luminosità del monitor a circa un quinto e non cambiare l\'inquadratura.',
  'screencheck.step.corners.title': 'Gli angoli dello schermo',
  'screencheck.step.corners.hint': 'Torna alla massima luminosità e mostra alla fotocamera tutto lo schermo — stiamo controllando l\'uniformità della retroilluminazione.',
  'screencheck.step.nightOff.title': 'Modalità notturna disattivata',
  'screencheck.step.nightOff.hint': 'Assicurati che il filtro della luce blu sia disattivato.',
  'screencheck.step.nightOn.title': 'Modalità notturna attivata',
  'screencheck.step.nightOn.hint': 'Attiva nel sistema il filtro della luce blu e ripeti la stessa inquadratura.',
  'screencheck.stepHeading': 'Passo {n} di {total}: {title}',
  'screencheck.idleTitle': 'La procedura guidata non è avviata',
  'screencheck.idleHint': 'Avvia una misurazione nella schermata Misura, poi torna qui e premi «Inizia».',
  'screencheck.next': 'Salva il passo e vai avanti',
  'screencheck.cancel': 'Interrompi',
  'screencheck.start': 'Inizia la procedura guidata',
  'screencheck.clearResult': 'Cancella l\'esito',
  'screencheck.resultTitle': 'Esito',
  'screencheck.resultEmpty': 'Non è ancora stato salvato alcun passo.',
  'screencheck.resultPartial': 'Salvati {done} passi su {total}. Le conclusioni compariranno quando ci sarà qualcosa da confrontare.',
  'screencheck.note.uniformityLow': 'L\'uniformità della retroilluminazione è {value}% — si vedono differenze di luminosità evidenti nell\'inquadratura.',
  'screencheck.note.uniformityOk': 'La retroilluminazione è uniforme ({value}%).',
  'screencheck.note.nightWorks': 'La modalità notturna abbassa la quota di blu di {value} punti percentuali — funziona.',
  'screencheck.note.nightWeak': 'La modalità notturna cambia la quota di blu solo di {value} punti percentuali. È meno di quanto dia di solito un filtro di sistema.',
  'screencheck.note.pwm': 'A bassa luminosità lo sfarfallio sale da {from}% a {to}% — è il segno tipico dell\'attenuazione a impulsi (PWM).',
  'toast.screencheckDone': 'Procedura guidata conclusa. L\'esito è qui sotto.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'Da dove vengono questi numeri. ',
  'reports.noteText': 'Il rapporto si calcola dalla cronologia salvata su questo dispositivo — un punto ogni cinque secondi. Il motore la raccoglie dalla prima misurazione, quindi il rapporto è pronto da subito.',
  'reports.rangeAria': 'Intervallo del rapporto',
  'reports.day': 'Ultime 24 ore',
  'reports.week': 'Ultimi 7 giorni',
  'reports.date': 'Rapporto del {date}.',
  'report.headerDay': 'Giornata dal {from} al {to} — {count}.',
  'report.headerWeek': 'Settimana dal {from} al {to} — {count}.',
  'count.points': { one: '{n} punto', many: '{n} punti', other: '{n} punti' },
  'count.samples': { one: '{n} campione', many: '{n} campioni', other: '{n} campioni' },
  'report.emptyTitle': 'Nessun dato in questo periodo',
  'report.emptyText': 'Avvia una misurazione nella schermata Misura — la cronologia si salva da sola.',
  'report.colAvg': 'Media',
  'report.colMin': 'Minimo',
  'report.colMax': 'Massimo',
  'report.zonesTitle': 'Distribuzione delle zone',
  'report.worstHour': 'Ora peggiore della giornata',
  'report.worstHourNone': 'nessuna spicca',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'Che cosa farne',
  'report.disclaimerTitle': 'Questo non è un consiglio sanitario. ',
  'report.disclaimerText': 'Le conclusioni derivano esclusivamente da ciò che ha visto la fotocamera di questo telefono. L\'app non misura uno spettro, non conosce i lux e non formula alcuna diagnosi.',

  'advice.melanopic': 'L\'impatto circadiano medio è stato {value}×. Alla sera conviene scendere sotto 0,50 — nel modo più semplice, con una lampadina più calda o la modalità notturna.',
  'advice.kelvin': 'La luce era fredda (in media {value} K). Per il lavoro va benissimo; nelle due ore prima di dormire è meglio stare sotto i 3000 K.',
  'advice.flicker': 'È stato rilevato uno sfarfallio percepibile (in media {value}%). Di solito ne è responsabile un dimmer economico o l\'alimentatore della retroilluminazione.',
  'advice.uniformity': 'La luce si distribuisce in modo non uniforme ({value}%). Spostare la lampada o cambiarne l\'angolo di solito serve più che cambiare la lampadina.',
  'advice.worstHour': 'L\'ora peggiore della giornata sono le {hour}:00 — è lì che si concentrano più letture fuori norma.',
  'advice.none': 'In questo periodo nulla spicca oltre la norma. Adesso la cosa più utile sarebbe confrontare due sorgenti luminose nel confronto A/B.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'Formato del file. ',
  'export.noteText': 'Punto e virgola come separatore di colonna, virgola come separatore decimale, codifica UTF-8 con il marcatore BOM. Un file così l\'Excel italiano lo apre senza dover impostare nulla.',
  'export.range': 'Intervallo dei dati',
  'export.columns': 'Colonne nel file',
  'export.chipFilled': ' — colonna compilata',
  'export.help': 'Il file contiene tutte e sette le colonne — il motore le calcola dalla prima misurazione in poi e tutte finiscono nel file.',
  'export.run': 'Salva il file CSV',
  'export.previewEmpty': 'Nessuna lettura in questo intervallo. Avvia una misurazione — la cronologia si salva da sola.',
  'csv.range.hour': 'Ultima ora',
  'csv.range.day': 'Ultime 24 ore',
  'csv.range.week': 'Ultimi 7 giorni',
  'csv.range.month': 'Ultimi 30 giorni',
  'csv.colDate': 'Data',
  'csv.colTime': 'Ora',
  'csv.colZone': 'Zona',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'Nell\'intervallo scelto non c\'è alcuna lettura.',
  'toast.exportFailed': 'Questo browser non ha permesso di salvare il file.',
  'toast.exportSaved': {
    one: 'File {filename} salvato ({n} riga).',
    many: 'File {filename} salvato ({n} righe).',
    other: 'File {filename} salvato ({n} righe).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} h {m} min',
  'duration.ms': '{m} min {s} s',
  'duration.s': '{s} s'
});
