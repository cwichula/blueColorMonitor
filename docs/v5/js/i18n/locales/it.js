/* Monitor Światła v5 — słownik włoski.
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr). NIE JEST
 * KALKĄ żadnego z nich: polskie i angielskie zdania przełożono na naturalną
 * włoszczyznę. Zachowane zostało to, co niesie znaczenie: liczby, progi,
 * jednostki, nazwy wstawek i — co do treści — zastrzeżenia medyczne oraz
 * zdania o prywatności. Tych ostatnich nie wolno osłabiać ani wzmacniać:
 * „nie zastępuje rozmowy z lekarzem” i „obraz nie opuszcza urządzenia”
 * znaczą po włosku dokładnie tyle samo, ani mniej, ani więcej.
 *
 * REJESTR: bezpośrednie „tu” — tak mówią włoskie aplikacje użytkowe; „Lei”
 * brzmiałoby jak pismo z urzędu. Ton rzeczowy i ciepły, bez marketingu.
 * Cudzysłowy włoskie: « … ». Apostrof typograficzny (’), nie prosty.
 * Przecinek dziesiętny (1,00), znak % bez spacji przed liczbą (40%),
 * godzina dwudziestoczterogodzinna.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych i pomocy):
 *   quota di blu, luminosità scena, temperatura di colore, impatto circadiano
 *   (w opisie: rapporto melanopico), sfarfallio, uniformità, comfort visivo.
 * STREFY: sicura / moderata / dannosa — rodzaj żeński, bo strefa wchodzi
 * w zdanie „zona: {zone}”; mówią o świetle, a nie o stanie aplikacji.
 * POZOSTAŁE STAŁE ODPOWIEDNIKI: cronologia (historia), sessione (sesja),
 * campione (próbka), misurazione (pomiar), grandezza (wielkość),
 * soglia (próg), lettura (odczyt).
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Testo con un segnaposto {name}'   — napis zwykły,
 *   'klucz.kropkowany': { one, many, other }               — forma zależna
 *                                                            od liczby.
 * Włoski ma w CLDR trzy formy: `one`, `many` i `other`. Kategoria `many`
 * obsługuje tylko liczby milionowe w zapisie skróconym („1 milione”), których
 * ta aplikacja nigdy nie wyświetla — dlatego jest tu równa `other`, a nie
 * pominięta: keys.test.js wymaga kompletu kategorii CLDR. Nazwy wstawek są
 * identyczne jak w pl.js. Kolejność wstawek w zdaniu wolno zmieniać,
 * nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Monitor della Luce',
  'app.description': 'Monitor della Luce — con la fotocamera misura sette grandezze della luce che ti circonda. Tutto viene calcolato su questo dispositivo, nulla esce in rete.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Monitor della Luce',
  'app.skipToContent': 'Vai al contenuto',
  'app.nav.aria': 'Navigazione principale',
  'app.noscript.title': 'Questa app ha bisogno di JavaScript',
  'app.noscript.text': 'Tutta la misurazione avviene in questa scheda del browser: è JavaScript a leggere i fotogrammi della fotocamera e a calcolarne le sette grandezze della luce. Senza, non c’è nulla con cui misurare. Attiva JavaScript per questa pagina e riaprila — anche allora nulla verrà inviato in rete.',

  'nav.measure': 'Misura',
  'nav.history': 'Cronologia',
  'nav.tools': 'Strumenti',
  'nav.support': 'Sostegno',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Misurazione',
  'shell.live.aria': 'Misurazione in corso. {metric}: {value}. Torna alla schermata di misurazione.',
  'shell.live.metricFallback': 'Grandezza principale',
  'shell.action.fallback': 'Azione della schermata',

  'shell.loadFail.title': 'Impossibile caricare la schermata «{screen}»',
  'shell.loadFail.text': 'Probabilmente mancano alcuni file nella memoria del dispositivo. Collegati alla rete e ricarica la pagina.',
  'shell.fatal.title': 'Qualcosa è andato storto',
  'shell.fatal.text': 'L’app non è riuscita a comporre la schermata. Di solito basta ricaricare la pagina — le misurazioni salvate e le impostazioni restano al loro posto.',
  'shell.fatal.reload': 'Ricarica la pagina',
  'shell.boot.failTitle': 'L’app non è riuscita ad avviarsi',
  'shell.boot.failText': 'L’interfaccia non si è avviata. Ricarica la pagina — le misurazioni salvate e le impostazioni restano al loro posto.',
  'shell.background.error': 'Qualcosa si è rotto in background',
  'shell.background.action': 'Ricarica',
  'shell.update.title': 'È disponibile una nuova versione',
  'shell.update.action': 'Ricarica',

  'onboarding.title': 'Prima di iniziare',
  'onboarding.lead': 'Monitor della Luce usa la fotocamera per osservare la luce intorno a te e ne calcola sette grandezze — dalla quota di blu al comfort visivo.',
  'onboarding.privacy': 'L’immagine non lascia mai questo dispositivo: non c’è un server, non c’è un account e non c’è nulla da caricare. Tutte e sette le grandezze funzionano subito, senza accesso e senza costi.',
  'onboarding.honesty': 'È un orientamento, non uno strumento di misura né un esame medico. Ciò che non si può misurare non viene mostrato — al posto del numero vedrai un trattino.',
  'onboarding.start': 'Iniziamo',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Applica',
  'overlay.toast.close': 'Chiudi il messaggio',
  'overlay.sheet.label': 'Finestra',
  'overlay.sheet.close': 'Chiudi',
  'overlay.dialog.confirm': 'Conferma',
  'overlay.dialog.cancel': 'Annulla',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'Annulla',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'Misura',

  'measure.intro.aria': 'Avvia una misurazione',
  'measure.intro.headline': 'Guarda che luce ti illumina',
  'measure.intro.lead': 'La fotocamera mostra quanto blu c’è nella luce che ti sta illuminando in questo momento — e se a quest’ora del giorno è troppo.',
  'measure.intro.start': 'Inizia la misurazione',
  'measure.intro.hint': 'Il browser chiederà il permesso di usare la fotocamera. La misurazione parte appena lo concedi.',
  'measure.intro.privacy': 'L’immagine della fotocamera viene elaborata su questo dispositivo e non lo lascia mai. Non inviamo, non salviamo e non condividiamo nessun fotogramma.',

  'measure.live.aria': 'Misurazione in corso',
  'measure.badge.starting': 'Avvio',
  'measure.badge.paused': 'In pausa',
  'measure.badge.running': 'Misurazione',
  'measure.stale': 'In attesa dell’immagine — l’anteprima si blocca quando l’app è in background.',
  'measure.crop': 'Misuriamo il centro dell’inquadratura — il {percent}% segnato della larghezza e dell’altezza dell’immagine.',
  'measure.facing.front': 'fotocamera anteriore',
  'measure.facing.back': 'fotocamera posteriore',

  'measure.boot.title': 'Avvio della fotocamera…',
  'measure.boot.text': 'Se il browser chiede il permesso, concedilo — senza immagine non c’è nulla da misurare. Il permesso vale solo per questa pagina e puoi revocarlo in seguito.',
  'measure.boot.cancel': 'Annulla',

  'measure.hold': 'Letture bloccate. La fotocamera continua a funzionare, ma nulla arriva alla cronologia né alle medie.',
  'measure.gridHint': 'Scegli un riquadro per portare quella grandezza sull’indicatore grande.',

  'measure.stop': 'Ferma',
  'measure.pause': 'Pausa',
  'measure.resume': 'Riprendi',
  'measure.flip.aria': 'Cambia fotocamera',
  'measure.flip.toBack': 'Passa alla fotocamera posteriore',
  'measure.flip.toFront': 'Passa alla fotocamera anteriore',

  'measure.fail.aria': 'Errore della fotocamera',
  'measure.fail.headline': 'La fotocamera non è partita',
  'measure.fail.retry': 'Riprova',
  'measure.fail.back': 'Indietro',
  'measure.fail.savedSession': 'La sessione precedente all’interruzione ({duration}) è stata salvata nella cronologia.',
  'measure.error.fallback': 'Non è stato possibile avviare la fotocamera.',

  'measure.summary.aria': 'Riepilogo della sessione',
  'measure.summary.title': 'Riepilogo della sessione',
  'measure.summary.paused': 'in pausa per {duration}',
  'measure.summary.nothingMeasured': 'Nessuna grandezza ha raccolto una lettura — la fotocamera non ha visto luce per tutta la sessione.',
  'measure.summary.note': 'Le medie contano solo i campioni raccolti fuori dalla pausa. Le grandezze mai misurate sono escluse, non contate come zero.',
  'measure.summary.nearThreshold': 'Più vicino alla soglia',
  'measure.summary.worstPoint': 'Punto più debole',
  'measure.summary.averageZone': 'in media {zone}',
  'measure.summary.tooShort': 'La sessione è durata {duration} — troppo poco per entrare da sola nella cronologia. Puoi salvarla a mano.',
  'measure.summary.again': 'Misura di nuovo',
  'measure.summary.save': 'Salva nella cronologia',
  'measure.summary.saved': 'Salvata nella cronologia',
  'measure.summary.savedToast': 'Sessione salvata nella cronologia.',
  'measure.summary.close': 'Chiudi',

  'measure.method.title': 'Come misuriamo',
  'measure.method.p1': 'L’app campiona l’immagine della fotocamera dieci volte al secondo e calcola le grandezze dal {percent}% centrale dell’inquadratura — il mirino nell’anteprima segna esattamente quell’area.',
  'measure.method.p2': 'La fotocamera di un telefono ha tre canali larghi e una propria regolazione automatica di esposizione e bilanciamento del bianco. Vede le proporzioni della luce, non il suo spettro.',
  'measure.method.p3': 'Quota di blu, luminosità, sfarfallio e uniformità sono ciò che la fotocamera misura davvero. Temperatura di colore e impatto circadiano sono approssimazioni dichiarate apertamente, calcolate dalle primarie sRGB.',
  'measure.method.p4': 'Lo sfarfallio si vede solo sotto i quattro hertz. Lo sfarfallio della rete elettrica a 100 Hz è molto oltre la portata di questo campionamento e non verrà mai riportato come lettura.',
  'measure.method.p5': 'Nessuno di questi numeri è una misura fotometrica né un risultato medico. L’immagine della fotocamera non lascia il dispositivo.',
  'measure.method.ok': 'Ho capito',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'Avvio della fotocamera annullato.',
  'measure.announce.stoppedNoSamples': 'Misurazione fermata. Non è stato raccolto alcun campione.',
  'measure.announce.stopped': 'Misurazione fermata. Il riepilogo della sessione è pronto.',
  'measure.announce.interrupted': 'Misurazione interrotta. Il riepilogo della sessione è pronto.',
  'measure.announce.paused': 'Misurazione in pausa. Letture bloccate.',
  'measure.announce.resumed': 'Misurazione ripresa.',
  'measure.announce.switchedFront': 'Passata alla fotocamera anteriore. Inizia una nuova sessione.',
  'measure.announce.switchedBack': 'Passata alla fotocamera posteriore. Inizia una nuova sessione.',
  'measure.announce.lead': 'Grandezza principale: {metric}.',
  'measure.announce.cameraError': 'Errore della fotocamera. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'La luce è rimasta nell’intervallo sicuro per tutta la sessione — lascia la lampada com’è e ricontrolla dopo il tramonto, quando è in funzione un’altra sorgente.',
  'measure.advice.share.evening': 'La quota di blu è stata in media {value} — attiva la modalità notturna sugli schermi e spegni la luce a soffitto, lasciando una sola lampada calda all’altezza della scrivania.',
  'measure.advice.share.day': 'La quota di blu è stata in media {value} — di giorno è accettabile, ma imposta lo schermo perché passi da solo alla modalità calda due ore prima di andare a dormire.',
  'measure.advice.brightness': 'L’inquadratura era sovraesposta (in media {value}) — allontanati dalla sorgente di luce oppure abbassa la luminosità dello schermo che stai misurando, perché con questa esposizione anche le altre grandezze perdono precisione.',
  'measure.advice.kelvin.evening': 'La temperatura di colore si è mantenuta in media su {value} — dopo il tramonto scendi sotto i 3000 K: passa la lampada in modalità calda oppure monta una lampadina da 2700 K.',
  'measure.advice.kelvin.day': 'La temperatura di colore si è mantenuta in media su {value} — per il giorno è un bianco buono e stimolante, ma la sera porta la stessa lampada a 2700 K.',
  'measure.advice.melanopic.evening': 'L’impatto circadiano è stato in media {value} — nelle due ore prima di dormire scendi sotto 0,50 ×, abbassando la luce principale e illuminando dall’altezza della scrivania invece che dal soffitto.',
  'measure.advice.melanopic.day': 'L’impatto circadiano è stato in media {value} — a quest’ora questa dose aiuta, ma la sera sostituisci questa sorgente con una più debole e più calda.',
  'measure.advice.flicker': 'Lo sfarfallio ha raggiunto in media {value} — di solito è un dimmer o una retroilluminazione tenuta troppo bassa: alza la luminosità dello schermo sopra il 40% oppure sostituisci il dimmer con uno senza modulazione PWM.',
  'measure.advice.uniformity': 'La luce cadeva in modo irregolare (in media {value}) — metti la lampada di lato rispetto al piano e aggiungi una seconda sorgente, più debole, dal lato opposto, invece di un unico punto forte.',
  'measure.advice.comfort': 'Il comfort visivo è risultato in media {value} — comincia da un solo cambiamento: dimezza la luminosità della sorgente principale e solo dopo occupati del colore della luce.',
  'measure.advice.default': 'Cambia una cosa nell’illuminazione e misurala di nuovo — il confronto fra due sessioni dice più di una singola lettura.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'Cronologia',
  'history.action.export': 'Esporta la cronologia',

  'history.metricGroup.aria': 'Scelta della grandezza',
  'history.announce.metric': 'Grandezza: {metric}',
  'history.rangeGroup.aria': 'Intervallo di tempo',
  'history.range.aria': 'Ultimi {range}',

  'history.stats.title': 'Statistiche dell’intervallo',
  'history.stats.head': '{metric}\u00A0—\u00A0ultimi {range}',
  'history.stats.note': 'Calcolate da ciò che mostra il grafico. Il tempo senza misurazione non viene conteggiato — non mettiamo uno zero al suo posto.',
  'history.stat.min': 'Minimo',
  'history.stat.avg': 'Media',
  'history.stat.max': 'Massimo',
  'history.trend.up': 'in aumento in questo intervallo',
  'history.trend.flat': 'nessun cambiamento netto',
  'history.trend.down': 'in calo in questo intervallo',
  'history.trend.none': 'nulla con cui confrontare',

  'history.sessions.title': 'Sessioni di misurazione',
  'history.sessions.count': '{sessions}, dalla più recente',
  'history.sessions.empty': 'Ancora nessuna sessione',
  'history.sessions.hint': 'La sessione viene salvata quando fermi la misurazione.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'intervallo: {range}',
  'history.session.noMeasure': 'nessuna misurazione',

  'history.data.title': 'Dati',
  'history.data.subtitle': 'La cronologia è salvata solo su questo dispositivo.',
  'history.export.csv': 'Esporta CSV',
  'history.export.json': 'Esporta JSON',
  'history.export.ok': 'File pronto da salvare',
  'history.export.fail': 'Non è stato possibile preparare il file. In modalità privata, e in una finestra incorporata in un’altra app, il browser blocca il salvataggio — apri la pagina in una scheda normale.',
  'history.export.sheet.title': 'Esportazione della cronologia',
  'history.export.sheet.text': 'Il CSV si apre in un foglio di calcolo (separatore punto e virgola, virgola decimale). Il JSON conserva tutto, compresi l’elenco delle sessioni e i vuoti in cui non è stato misurato nulla.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Cancella la cronologia',
  'history.clear.title': 'Cancellare la cronologia?',
  'history.clear.text': 'Cancelleremo {points} e {sessions}. Non si può annullare — se vuoi conservare i dati, esportali prima.',
  'history.clear.confirm': 'Cancella',
  'history.clear.announce': 'Cronologia cancellata.',
  'history.clear.toast': 'Cronologia cancellata',

  'history.empty.title': 'Non c’è ancora nulla da mostrare',
  'history.empty.text': 'La cronologia si riempie mentre misuri — un punto al secondo. Tutto resta su questo dispositivo.',
  'history.empty.action': 'Vai alla misurazione',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 min',
  'range.5m': '5 min',
  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 giorni',
  'range.30d': '30 giorni',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Data e ora',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'La memoria del dispositivo è piena — le nuove misurazioni non vengono più salvate.',
  'storage.blocked': 'Il browser non permette di salvare la cronologia — i dati spariranno quando chiudi la scheda.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Strumenti',
  'tools.action.about': 'Informazioni sulla misurazione',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Lingua',
  'tools.language.subtitle': 'Per impostazione predefinita l’app segue la lingua del dispositivo; una scelta da questo elenco ha effetto subito e resta in questo browser.',
  'tools.language.aria': 'Lingua dell’interfaccia',
  'tools.language.system': 'Auto',
  'tools.language.announce': 'Lingua dell’interfaccia: {language}.',

  'tools.appearance.title': 'Aspetto',
  'tools.appearance.theme.title': 'Tema',
  'tools.appearance.theme.desc': '«Auto» segue l’impostazione del sistema.',
  'tools.appearance.theme.aria': 'Tema',
  'tools.theme.system': 'Auto',
  'tools.theme.light': 'Chiaro',
  'tools.theme.dark': 'Scuro',
  'tools.appearance.accent.title': 'Colore d’accento',
  'tools.appearance.accent.desc': 'Il colore di pulsanti, selezioni e cursori.',
  'tools.appearance.accent.aria': 'Colore d’accento',
  'tools.appearance.textScale.title': 'Dimensione del testo',
  'tools.appearance.textScale.desc': 'Ingrandisce tutta l’interfaccia, non solo le etichette.',
  'tools.appearance.textScale.aria': 'Dimensione del testo',
  'tools.appearance.density.title': 'Densità',
  'tools.appearance.density.desc': 'Quella compatta fa stare più contenuto in una sola schermata.',
  'tools.appearance.density.aria': 'Densità del layout',
  'tools.density.comfortable': 'Comoda',
  'tools.density.compact': 'Compatta',
  'tools.appearance.motion.title': 'Meno movimento',
  'tools.appearance.motion.desc': 'Disattiva le animazioni e la corsa morbida della lancetta. L’impostazione di sistema viene comunque rispettata.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Oceano',
  'accent.violet': 'Viola',
  'accent.amber': 'Ambra',
  'accent.mint': 'Menta',
  'accent.rose': 'Rosa',

  'tools.thresholds.title': 'Soglie',
  'tools.thresholds.subtitle': 'Il valore a partire dal quale l’app deve dire «moderata» e quello a partire dal quale deve dire «dannosa». Le soglie predefinite sono una nostra proposta, non una norma — impostale come preferisci.',
  'tools.thresholds.warn': 'Soglia di avviso',
  'tools.thresholds.crit': 'Soglia di allarme',
  'tools.thresholds.warn.aria': 'Soglia di avviso — {metric}',
  'tools.thresholds.crit.aria': 'Soglia di allarme — {metric}',
  'tools.thresholds.reset': 'Predefinite',
  'tools.thresholds.reset.aria': 'Ripristina le soglie predefinite: {metric}',
  'tools.thresholds.moved': '{threshold} spostata su {value}.',
  'tools.thresholds.resetAll': 'Ripristina tutte le soglie',
  'tools.thresholds.resetAll.title': 'Ripristinare le soglie predefinite?',
  'tools.thresholds.resetAll.text': 'Tutte e sette le grandezze torneranno alle soglie proposte dall’app. La cronologia delle misurazioni resta intatta.',
  'tools.thresholds.resetAll.confirm': 'Ripristina',
  'tools.thresholds.resetAll.cancel': 'Lascia le mie',
  'tools.thresholds.resetAll.toast': 'Soglie tornate ai valori predefiniti',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'sopra {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} e meno',
  'tools.zoneRange.goodBelow': 'sotto {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} e più',

  'tools.calibration.title': 'Calibrazione',
  'tools.calibration.subtitle': 'Per chi ha qualcosa con cui confrontare.',
  'tools.calibration.intro': 'Due telefoni puntati sulla stessa lampada mostreranno numeri un po’ diversi — ogni sensore ha una dominante sua. Se hai a portata di mano una misura di cui ti fidi, qui puoi alzare o abbassare leggermente i singoli canali dell’immagine. I moltiplicatori agiscono prima di ogni calcolo, quindi cambiano tutte e sette le grandezze insieme.',
  'tools.calibration.neutral': 'Non hai nulla con cui confrontare? Lascia 1,00 — è l’impostazione di fabbrica e non rovina niente.',
  'tools.calibration.forward': 'La modifica vale da adesso in poi. Le misurazioni già presenti nella cronologia restano come erano nel momento del salvataggio — non le ricalcoliamo, perché sarebbe riscrivere i dati a posteriori.',
  'tools.calibration.reset': 'Azzera la calibrazione',
  'tools.calibration.reset.toast': 'Calibrazione azzerata',
  'tools.calibration.channel.r': 'Canale rosso',
  'tools.calibration.channel.g': 'Canale verde',
  'tools.calibration.channel.b': 'Canale blu',
  'tools.calibration.channel.aria': '{channel} — moltiplicatore di calibrazione',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'Misurazione',
  'tools.measurement.wake.title': 'Tieni acceso lo schermo',
  'tools.measurement.wake.desc': 'Durante la misurazione lo schermo resta acceso. La batteria si scarica più in fretta.',
  'tools.measurement.wake.unsupported': 'Questo browser non ci permette di tenere acceso lo schermo.',
  'tools.measurement.haptics.title': 'Vibrazione',
  'tools.measurement.haptics.desc': 'Una breve conferma all’avvio, all’arresto e al cambio di grandezza.',
  'tools.measurement.haptics.unsupported': 'Questo dispositivo non segnala alcun motore di vibrazione.',

  'tools.about.title': 'Informazioni sulla misurazione',
  'tools.about.subtitle': 'Che cosa calcola esattamente ciascuna delle sette grandezze e dove finisce l’onestà di questo metodo.',
  'tools.about.scale': 'Scala: da {min} a {max}.',
  'tools.about.threshold': 'Avvisiamo da {warn} e diamo l’allarme da {crit}.',
  'tools.about.thresholdInvert': 'Avvisiamo sotto {warn} e diamo l’allarme sotto {crit}.',
  'tools.about.limitsHead': 'Che cosa questa misurazione non sa fare',
  'tools.about.limit.spectrum.title': 'La fotocamera non vede i colori come uno strumento di misura',
  'tools.about.limit.spectrum.text': 'La fotocamera di un telefono ha tre canali: rosso, verde e blu. Uno strumento per misurare la luce li scompone in decine di bande strette. Quello che vedi qui è ricavato da quei tre numeri — in modo ragionevole, ma resta un calcolo, non uno spettro misurato.',
  'tools.about.limit.exposure.title': 'La fotocamera si regola da sola la luminosità',
  'tools.about.limit.exposure.text': 'Punta il telefono verso la finestra e la fotocamera scurisce l’immagine per non sovraesporla. La «luminosità scena» allora scende, anche se nella stanza non è cambiato nulla. Perciò confronta questo valore all’interno di una stessa inquadratura, non fra stanze diverse.',
  'tools.about.limit.flicker.title': 'Una fotocamera lenta non coglie lo sfarfallio veloce',
  'tools.about.limit.flicker.text': 'Controlliamo l’immagine {hz} volte al secondo. Una pulsazione più veloce di {nyquist} volte al secondo, in una misura del genere, può apparire più lenta di quanto sia davvero oppure sparire del tutto — e lo sfarfallio della rete elettrica è proprio così veloce. Se l’app rileva qualcosa, prendilo come il segnale che «qui qualcosa pulsa», non come una frequenza misurata.',
  'tools.about.limit.medical.title': 'Non è né un esame né un consiglio medico',
  'tools.about.limit.medical.text': 'L’app aiuta a notare che la luce intorno a te è fredda, intensa o irrequieta, e suggerisce che cosa si può fare. Non esprime giudizi sulla tua salute e non sostituisce un colloquio con un medico né una misura con uno strumento professionale.',
  'tools.about.privacy': 'Tutto viene calcolato sul tuo dispositivo. L’immagine della fotocamera non viene mai inviata né salvata da nessuna parte — in memoria finiscono soltanto i numeri calcolati.',

  'tools.data.title': 'Dati',
  'tools.data.subtitle': 'Tutto sta nella memoria di questo browser e da qui non va da nessuna parte.',
  'tools.data.summary.empty': 'Non ci sono ancora misurazioni salvate.',
  'tools.data.summary': 'In memoria: {points} e {sessions}.',
  'tools.data.export.csv': 'Esporta CSV',
  'tools.data.export.json': 'Esporta JSON',
  'tools.data.clear': 'Cancella la cronologia',
  'tools.data.reset': 'Impostazioni predefinite',
  'tools.data.reset.title': 'Ripristinare le impostazioni predefinite?',
  'tools.data.reset.text': 'Aspetto, soglie, calibrazione e impostazioni di misurazione torneranno allo stato iniziale. La cronologia delle misurazioni resta intatta.',
  'tools.data.reset.confirm': 'Ripristina',
  'tools.data.reset.toast': 'Impostazioni predefinite ripristinate',
  'tools.data.wipe': 'Elimina tutti i dati',
  'tools.data.wipe.title': 'Eliminare tutti i dati dell’app?',
  'tools.data.wipe.text': 'Spariranno: tutta la cronologia delle misurazioni e l’elenco delle sessioni, le tue soglie e la calibrazione e le impostazioni di aspetto. L’app tornerà allo stato del primo avvio.',
  'tools.data.wipe.note': 'Non abbiamo una copia di questi dati — non hanno mai lasciato questo dispositivo, quindi non c’è da dove ripristinarli.',
  'tools.data.wipe.check': 'Ho capito che non si può annullare',
  'tools.data.wipe.confirm': 'Elimina tutto',
  'tools.data.wipe.toast': 'Tutti i dati dell’app sono stati eliminati',
  'tools.data.wipe.announce': 'Tutti i dati dell’app sono stati eliminati. Le impostazioni sono tornate a quelle predefinite.',
  'tools.data.storage.blocked': 'Questo browser non permette di salvare nulla in modo permanente (modalità privata, oppure dati dei siti bloccati). Tutto ciò che imposti qui sparirà quando chiudi la scheda.',
  'tools.data.storage.full': 'La memoria del browser si è riempita e le nuove misurazioni non vengono più salvate. Cancellare la cronologia libererà spazio.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Sostegno',
  'support.free.title': 'Tutto è disponibile',
  'support.free.lead': 'Tutte e sette le grandezze, la cronologia completa, le soglie, la calibrazione e l’esportazione funzionano dal primo avvio — senza account, senza limiti e senza costi.',
  'support.free.note': 'La misurazione viene calcolata interamente su questo dispositivo e funziona senza rete. Qui non c’è una versione migliore tenuta dietro a un muro.',
  'support.why.title': 'Perché lo chiedo',
  'support.why.lead': 'Monitor della Luce nasce dopo il lavoro, senza pubblicità, senza sponsor e senza un’azienda alle spalle. Il sostegno paga il tempo per le correzioni, per nuove grandezze e per tenere in vita ciò che già funziona.',
  'support.what.title': 'Che cosa dà una donazione',
  'support.what.lead': 'Niente. Una donazione non sblocca nulla — nessuna funzione in più, nessun distintivo accanto al nome, nessuna precedenza. Tutto ciò che l’app sa fare, ce l’hai già.',
  'support.what.note': 'Resta soltanto che io so che a qualcuno è servita. È davvero un motivo sufficiente.',
  'support.cta.title': 'Se vuoi dare una mano',
  'support.cta.button': 'Offrimi un caffè',
  'support.cta.nolink': 'Il profilo per le donazioni non è ancora collegato. Quando ci sarà, in questo punto comparirà un pulsante.',
  'support.cta.privacy': 'Questo collegamento apre un sito esterno (per esempio Buy Me a Coffee) in una nuova scheda. È l’unico momento in cui qualcosa lascia questo dispositivo — la misurazione in sé resta sempre qui.',
  'support.cta.privacyFuture': 'Quando l’indirizzo ci sarà, il pulsante aprirà un sito esterno (per esempio Buy Me a Coffee) in una nuova scheda. Sarà l’unico momento in cui qualcosa lascia questo dispositivo — la misurazione in sé resta sempre qui.',
  'support.cta.note': 'Qui non c’è nessun conto alla rovescia, nessun promemoria e nessuna finestra che si apre da sola. Questa richiesta aspetta soltanto in questa scheda.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'ultimo minuto',
  'gauge.aria': '{metric}: {value}, zona: {zone}',
  'gauge.aria.note': '{metric}: {value}, zona: {zone}, {note}',
  'gauge.aria.initial': '{metric}: nessun dato',
  'gauge.value.none': 'nessun dato',
  /* Odczyt słowny z jednostką: „27 per cento”, „1,20 volte”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'valore approssimativo',
  'gauge.note.offScale': 'fuori scala',
  'gauge.metric.unknown': 'Grandezza sconosciuta',

  'chart.aria.label': 'Grafico della cronologia delle misurazioni',
  'chart.hint': 'Grafico interattivo. Le frecce sinistra e destra spostano il cursore di lettura, Home e Fine portano all’inizio e alla fine dell’intervallo, Esc nasconde il cursore.',
  'chart.empty.title': 'Nessun dato',
  'chart.empty.text': 'Avvia la misurazione — il grafico compare dopo le prime letture.',
  'chart.few.title': 'Dati insufficienti',
  'chart.few.text': 'Abbiamo una sola lettura: {value}. Per una linea ne servono due.',
  'chart.legend.line': 'misurazione',
  'chart.legend.gap': 'interruzione della misurazione',
  'chart.aria.head': 'Grafico: {metric}, intervallo {range}',
  'chart.aria.empty': 'Nessun dato in questo intervallo.',
  'chart.aria.one': 'Una sola lettura: {value}.',
  'chart.aria.summary': 'Da {min} a {max}, media {avg}, {points}.',
  'chart.aria.gaps': 'Nella serie ci sono interruzioni — in quei momenti non stavamo misurando.',
  'chart.readout.empty': 'Nessun dato in questo intervallo.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'Dati insufficienti per disegnare un grafico.',
  'chart.readout.hint': 'Trascina sul grafico, oppure usa le frecce, per leggere una singola misurazione.',
  'chart.time.now': 'adesso',
  'chart.time.justNow': 'poco fa',
  'chart.time.ago': '{duration} fa',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} \u00B7 {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — włoski zapisuje godzinę na zegarze
     dwudziestoczterogodzinnym, a skróty miesięcy ma trzyliterowe. */
  'chart.sample.ago': '\u221230\u00A0min',
  'chart.sample.clock': '00:00',
  'chart.sample.date': '30\u00A0ago',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'Quota di blu',
  'metric.share.short': 'Quanta parte della luce che vediamo ricade sul canale blu.',
  'metric.share.help': 'Separa il colore dalla luminosità — è il valore che si muove quando attivi la modalità notturna.',
  'metric.brightness.name': 'Luminosità scena',
  'metric.brightness.short': 'La luminosità media dell’immagine della fotocamera.',
  'metric.brightness.help': 'Un valore relativo, non lux — l’esposizione automatica della fotocamera lo sposta alle nostre spalle.',
  'metric.kelvin.name': 'Temperatura di colore',
  'metric.kelvin.short': 'Se la luce è calda o fredda.',
  'metric.kelvin.help': 'Sotto i 3000 K la luce è calda e alla sera più delicata. 6500 K è il bianco predefinito della maggior parte degli schermi.',
  'metric.melanopic.name': 'Impatto circadiano',
  'metric.melanopic.short': 'Quanto intensamente questa luce agisce sull’orologio biologico.',
  'metric.melanopic.help': 'Un’approssimazione del rapporto melanopico. 1,00 è il bianco neutro della luce diurna; alla sera conviene scendere sotto 0,50.',
  'metric.flicker.name': 'Sfarfallio',
  'metric.flicker.short': 'Pulsazione invisibile della sorgente di luce.',
  'metric.flicker.help': 'I dimmer e le retroilluminazioni economiche pulsano. L’occhio non lo vede, ma è una causa nota di stanchezza e mal di testa.',
  'metric.uniformity.name': 'Uniformità',
  'metric.uniformity.short': 'Se la luce si distribuisce in modo uniforme nell’inquadratura.',
  'metric.uniformity.help': 'Un valore basso su uno schermo indica una perdita di retroilluminazione o un riflesso; sulla scrivania — una lampada messa male.',
  'metric.comfort.name': 'Comfort visivo',
  'metric.comfort.short': 'Un unico punteggio al posto di sei numeri.',
  'metric.comfort.help': 'Riunisce le altre misurazioni in un punteggio da 0 a 100 e mostra che cosa lo abbassa di più. I pesi sono una nostra valutazione redazionale, non una norma.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'sicura',
  'zone.warn': 'moderata',
  'zone.crit': 'dannosa',
  'zone.none': 'nessun dato',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 ago'). */
  'date.month.short.1': 'gen',
  'date.month.short.2': 'feb',
  'date.month.short.3': 'mar',
  'date.month.short.4': 'apr',
  'date.month.short.5': 'mag',
  'date.month.short.6': 'giu',
  'date.month.short.7': 'lug',
  'date.month.short.8': 'ago',
  'date.month.short.9': 'set',
  'date.month.short.10': 'ott',
  'date.month.short.11': 'nov',
  'date.month.short.12': 'dic',

  'date.clock': '{hours}:{minutes}',
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0{year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. */
  'time.duration.dayHour': '{days} {hours}\u00A0h',
  'time.duration.hourMinute': '{hours}\u00A0h {minutes}\u00A0min',
  'time.duration.hour': '{hours}\u00A0h',
  'time.duration.minuteSecond': '{minutes}\u00A0min {seconds}\u00A0s',
  'time.duration.minute': '{minutes}\u00A0min',
  'time.duration.second': '{seconds}\u00A0s',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „poco fa”. */
  'time.justNow': 'poco fa',
  'time.aMinuteAgo': 'un minuto fa',
  'time.minutesAgo': '{minutes}\u00A0min fa',
  'time.hoursAgo': '{hours}\u00A0h fa',
  'time.yesterday': 'ieri',
  'time.daysAgo': '{days}\u00A0giorni fa',

  /* Formy zależne od liczby. Włoski ma w CLDR trzy: `one`, `many` i `other`.
     `many` obsługuje wyłącznie liczby milionowe w zapisie skróconym, których
     ta aplikacja nie wyświetla — dlatego jest równe `other`. */
  'time.days.plural': { one: 'giorno', many: 'giorni', other: 'giorni' },
  'unit.sample.plural': { one: 'campione', many: 'campioni', other: 'campioni' },
  'unit.measurement.plural': { one: 'misurazione', many: 'misurazioni', other: 'misurazioni' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Włoski nie odmienia rzeczownika przez przypadki — oba klucze zostają
     (kształt słownika jest wspólny dla wszystkich języków), a wartości są tu
     identyczne. */
  'unit.session.plural': { one: 'sessione', many: 'sessioni', other: 'sessioni' },
  'unit.session.accusative.plural': { one: 'sessione', many: 'sessioni', other: 'sessioni' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy, choć po włosku brzmią tak samo — w innych językach już nie. */
  'unit.chartPoint.plural': { one: 'punto', many: 'punti', other: 'punti' },
  'unit.point.plural': { one: 'punto', many: 'punti', other: 'punti' },
  /* Nazwy jednostek SI są po włosku nieodmienne: „5000 kelvin”. */
  'unit.kelvin.plural': { one: 'kelvin', many: 'kelvin', other: 'kelvin' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „per cento”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'per cento',
  'unit.spoken.times': 'volte',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, bez rady,
     co zrobić dalej. Każdy kod ma tu jedno zdanie diagnozy i jedno zdanie
     rady. */
  'camera.error.denied': 'Il permesso di usare la fotocamera non è stato concesso. Consenti l’accesso alla fotocamera per questa pagina nelle impostazioni del browser e riprova.',
  'camera.error.notfound': 'Nessuna fotocamera trovata. Controlla che il dispositivo ne abbia una e che non sia disattivata nel sistema.',
  'camera.error.inuse': 'La fotocamera è occupata da un’altra app. Chiudi quell’app o quella scheda e riprova.',
  'camera.error.insecure': 'La fotocamera funziona solo tramite HTTPS oppure su localhost. Apri questa pagina a un indirizzo che inizia con «https://».',
  'camera.error.unsupported': 'Questo browser non mette a disposizione la fotocamera qui. Prova con Chrome o Safari, in una finestra normale — non in un’anteprima incorporata in un’altra app.',
  'camera.error.unknown': 'Non è stato possibile avviare la fotocamera.'
};
