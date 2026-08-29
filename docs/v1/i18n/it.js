/* docs/v1/i18n/it.js — słownik WŁASNY wersji v1, włoski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka. Kolejność jest treścią umowy: plik wersji dokłada się do tego samego
 * obiektu i może nadpisać dowolny klucz wspólny — nigdy odwrotnie.
 *
 * DLACZEGO TEN SŁOWNIK JEST SAMOWYSTARCZALNY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar w app.js, własne
 * dwie wielkości zamiast siedmiu i własne nazwy stref („Sicura” zamiast
 * wspólnego „Nella norma”). Dlatego wszystko, co v1 pokazuje, stoi TUTAJ —
 * także klucze, które przypadkiem brzmią tak samo jak wspólne. Zestaw kluczy
 * jest dokładnie taki sam jak w pl.js tego katalogu — pilnuje tego
 * docs/shared/i18n/keys.test.js.
 *
 * SKĄD TE ZDANIA: przekład z polskiej redakcji pierwotnej (pl.js), z angielskim
 * (en.js) jako wzorcem terminologii i rejestru. Polszczyzna tej aplikacji była
 * pisana z rozmysłem, więc przekład idzie za jej treścią zdanie w zdanie —
 * niczego nie skraca i niczego nie dopowiada.
 *
 * TERMINOLOGIA idzie za docs/shared/i18n/it.js i za docs/v5, żeby ta sama rzecz
 * nie nazywała się w v1 inaczej niż w pozostałych wersjach: quota di blu,
 * luminosità scena, temperatura di colore, lettura (odczyt), misurazione
 * (pomiar), cronologia (historia), soglia (próg), zona (strefa). Nazw pięciu
 * wielkości, których v1 nie ma, nie przeniesiono stamtąd wcale. Strefy:
 * sicura / moderata / dannosa — rodzaj żeński, bo opisują „zona”; te same trzy
 * słowa co w v5. Rejestr bezpośredni („tu”), cudzysłowy włoskie « », apostrof
 * typograficzny, przecinek dziesiętny. Zastrzeżenia medyczne i akapity
 * o prywatności przełożone WIERNIE, bez osłabiania i bez dodawania obietnic:
 * to zdania o skutkach prawnych, a nie o stylu.
 *
 * MARKUP W WARTOŚCIACH. Część kluczy (rozdziały Dokumentacji) zawiera znaczniki
 * <b>, <i>, <code> i encje HTML. Wstawiane są przez data-i18n-html, czyli tylko
 * tam, gdzie autor tekstu świadomie tego chciał — nigdy do treści pochodzącej
 * od użytkownika. Bez tego wyróżnienia w akapitach Dokumentacji trzeba by było
 * rozbić każde zdanie na kilkanaście kluczy po jednym słowie.
 */
window.I18nData = window.I18nData || {};
window.I18nData['it'] = Object.assign(window.I18nData['it'] || {}, {

  /* ---- aplikacja ---- */

  'app.name': 'Monitor della Luce Dannosa',
  'app.description': 'Misura con la fotocamera l’intensità del colore blu sullo schermo e la mostra su un grafico chiaro con le zone: sicura, moderata, dannosa.',

  /* ---- wybór języka ---- */

  'language.label': 'Lingua',
  'language.help': 'La lingua di tutta l’app. Tutte le lingue sono già su questo dispositivo — non si scarica nulla e nulla viene inviato da nessuna parte.',
  'language.auto': 'Come il dispositivo',

  /* ---- nawigacja ---- */

  'nav.aria': 'Menu principale',
  'nav.tabsAria': 'Schermate dell’app',
  'nav.announce': 'Schermata: {screen}',
  'nav.camera': 'Fotocamera',
  'nav.monitoring': 'Monitoraggio',
  'nav.support': 'Sostegno',
  'nav.more': 'Altro',
  'nav.docs': 'Documentazione',
  'nav.about': 'Informazioni e contatti',
  'nav.settings': 'Soglie di avviso',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← Indietro',
  'action.back.aria': 'Torna alla schermata precedente',
  'action.openDocs': 'Vai alla documentazione',
  'action.exportCsv': 'Esporta CSV',
  'action.delete': 'Elimina',
  'action.closeNotification': 'Chiudi la notifica',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref — „Sicura / Moderata / Dannosa”, a nie
     wspólne „Nella norma / Attenzione / Critico”. Przymiotniki w rodzaju
     żeńskim, bo opisują „zona”. Wersja plakatowa (zone.badge.*) jest osobnym
     kluczem, a nie zapisem wielkimi literami przez CSS: tureckie „i” i greckie
     akcenty nie znoszą automatycznej zamiany. */

  'zone.good': 'Sicura',
  'zone.warning': 'Moderata',
  'zone.critical': 'Dannosa',
  'zone.none': 'Nessun dato',

  'zone.badge.good': 'SICURA',
  'zone.badge.warning': 'MODERATA',
  'zone.badge.critical': 'DANNOSA',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'Luminosità canale B',
  'metric.raw.unitLabel': '% di luminosità del canale B',
  'metric.share.name': 'Quota di blu',
  'metric.share.longName': 'Quota di blu nella luce',
  'metric.share.unitLabel': '% di quota di blu',
  'stat.overallBrightness': 'Luminosità generale della scena',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': 'Anteprima della fotocamera',
  'camera.pressStart': 'Premi «Start».',
  'camera.start': 'Start',
  'camera.stop': 'Stop',
  'camera.switch': 'Cambia fotocamera',
  'camera.error': 'Non è stato possibile avviare la fotocamera. Controlla il permesso della fotocamera nel browser e riprova. ({message})',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': 'Letture attuali',
  'disclaimer.short': 'Risultato indicativo. Questo non è un dispositivo medico.',
  'disclaimer.more': 'Altro',

  /* ---- wykresy ---- */

  'chart.aria': 'Grafici nel tempo',
  'chart.title': 'Grafici nel tempo (ultimi {seconds} s)',
  'chart.empty': 'Avvia la fotocamera per vedere il grafico',
  'chart.axis.past': '-{seconds}s',
  'chart.axis.now': 'adesso',
  'chart.raw.aria': 'Grafico della luminosità del canale B nel tempo, con le zone sicura, moderata e dannosa evidenziate',
  'chart.share.aria': 'Grafico della quota di blu nella luce nel tempo, con le zone sicura, moderata e dannosa evidenziate',

  /* ---- tabela odczytów ---- */

  'table.show': 'Mostra come tabella',
  'table.hide': 'Nascondi la tabella',
  'table.caption': 'Ultime letture (la più recente in alto)',
  'table.col.time': 'Ora',
  'table.col.zone': 'Zona',

  /* ---- ustawienia progów ---- */

  'settings.title': 'Impostazioni delle soglie di zona',
  'settings.boundary.critical': 'Limite giallo / rosso:',
  'settings.boundary.warning': 'Limite verde / giallo:',

  /* ---- historia i raport (features.js) ---- */

  'history.title': 'Cronologia e rapporto',
  'history.rangeAria': 'Intervallo della cronologia',
  'history.unavailable': 'I dati della cronologia sono temporaneamente non disponibili.',
  'history.empty': 'Nessuna lettura salvata in questo intervallo. Avvia una misurazione — la cronologia si raccoglie da sola.',
  'history.savedReadings': 'Letture salvate: {count}. Ripartizione del tempo per zone:',
  'history.zoneLine': '{zone}: {percent}% ({readings})',

  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 giorni',
  'range.30d': '30 giorni',

  'report.dailyTitle': 'Rapporto giornaliero',
  'report.empty': 'Il rapporto comparirà quando nell’intervallo selezionato ci saranno letture salvate.',
  'report.dailyCaption': 'Quota di tempo nelle zone, giorno per giorno',
  'report.col.day': 'Giorno',
  'report.col.week': 'Settimana',
  'report.col.readings': 'Letture',
  'report.compare.day': 'Confronto giorno per giorno: {day} — {percent}% del tempo nella zona dannosa, {change}',
  'report.compare.dayPending': 'Il confronto giorno per giorno comparirà dopo il secondo giorno di misurazioni.',
  'report.compare.week': 'Confronto settimana per settimana: {week} — {percent}% del tempo nella zona dannosa, {change}',
  'report.compare.weekPending': 'Il confronto settimana per settimana comparirà dopo la seconda settimana di misurazioni.',
  'report.change.same': 'lo stesso di {other}.',
  'report.change.more': '{points} in più rispetto a {other}.',
  'report.change.less': '{points} in meno rispetto a {other}.',
  'report.peak': 'Il maggior numero di letture nella zona dannosa è caduto tra {from} e {to}.',
  'report.peak.none': 'In questo intervallo non sono state salvate letture nella zona dannosa.',
  'report.weeklyTitle': 'Rapporto settimanale',
  'report.weeklyEmpty': 'Il rapporto settimanale comparirà quando nell’intervallo selezionato ci saranno letture salvate.',
  'report.weeklyCaption': 'Quota di tempo nelle zone, settimana per settimana',
  'report.weekLabel': 'Settimana {week} ({year})',
  'report.footnote': 'I numeri indicano la quota delle letture salvate nell’intervallo selezionato, non il tempo esatto di esposizione.',

  /* ---- profile progów ---- */

  'profiles.title': 'Profili di soglie',
  'profiles.empty': 'Non hai ancora salvato alcun profilo.',
  'profiles.itemActive': '{name} (attivo)',
  'profiles.applyAria': 'Applica il profilo {name}',
  'profiles.deleteAria': 'Elimina il profilo {name}',
  'profiles.applied': 'Profilo «{name}» applicato.',
  'profiles.deleted': 'Profilo «{name}» eliminato.',
  'profiles.saved': 'Profilo «{name}» salvato.',
  'profiles.namePlaceholder': 'Nome del profilo (per esempio Sera)',
  'profiles.saveLabel': 'Salva le soglie attuali come profilo',
  'profiles.saveBtn': 'Salva il profilo',
  'profiles.needName': 'Inserisci il nome del profilo.',
  'profiles.limit': {
    one: 'Puoi salvare al massimo {n} profilo. Eliminane uno per aggiungerne un altro.',
    many: 'Puoi salvare al massimo {n} profili. Eliminane uno per aggiungerne un altro.',
    other: 'Puoi salvare al massimo {n} profili. Eliminane uno per aggiungerne un altro.'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku też — ale musi
     zostać bezpieczna dla systemu plików: bez ukośników, dwukropków i znaków
     diakrytycznych. */

  'csv.header': 'ora;luminosita_B_perc;quota_blu_perc;luminosita_scena_perc;zona',
  'csv.filename': 'monitoraggio-luce-{stamp}.csv',
  'csv.empty': 'Non ci sono letture da esportare. Avvia una misurazione e riprova.',
  'csv.done': 'Esportazione in un file CSV: {readings}.',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut. Powód: po polsku wypada tam dopełniacz
     („od 5 minut”), po włosku zmienia się sam rzeczownik („da 1 minuto”, „da
     5 minuti”) — i w każdym z trzydziestu języków może wypaść inaczej. */

  'alert.exposure': {
    one: 'Allarme di soglia: da {n} minuto la lettura è nella zona dannosa. Valuta una pausa oppure riduci la quota di blu sullo schermo.',
    many: 'Allarme di soglia: da {n} minuti la lettura è nella zona dannosa. Valuta una pausa oppure riduci la quota di blu sullo schermo.',
    other: 'Allarme di soglia: da {n} minuti la lettura è nella zona dannosa. Valuta una pausa oppure riduci la quota di blu sullo schermo.'
  },

  'session.title': 'Riepilogo dell’ultima sessione',
  'session.line': 'Tempo di misurazione: {duration}. Letture salvate: {count}.',
  'session.zoneLine': '{zone}: {percent}% del tempo della sessione.',
  'session.endedAt': 'Il riepilogo riguarda la sessione conclusa alle {time}.',
  'session.toast': 'Sessione conclusa: {duration}, {readings}, {percent}% del tempo nella zona dannosa.',

  'duration.seconds': '{n} s',
  'duration.minutesSeconds': '{minutes} min {seconds} s',

  /* ---- liczebniki ----
     Włoski ma trzy kategorie CLDR: one (1), many (zapis skrócony wielkich
     liczb, „1 milione di letture” — czego ta wersja nigdy nie pokazuje,
     dlatego jest równa other) i other, czyli reszta liczb i ułamki. Formę
     wybiera Intl.PluralRules('it'), nie nasza reguła. */

  'count.readings': { one: '{n} lettura', many: '{n} letture', other: '{n} letture' },
  'count.points': {
    one: '{n} punto percentuale',
    many: '{n} punti percentuali',
    other: '{n} punti percentuali'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': 'Altro',
  'more.section.settings': 'IMPOSTAZIONI',
  'more.section.help': 'AIUTO',
  'more.thresholds.title': 'Soglie di avviso',
  'more.thresholds.sub': 'Imposta i limiti delle zone sicura, moderata e dannosa.',
  'more.docs.title': 'Documentazione',
  'more.docs.sub': 'Come funziona la misurazione, unità, norme e zone.',
  'more.about.title': 'Informazioni e contatti',
  'more.about.sub': 'Versione, privacy e contatti.',
  'more.free': 'L’app è interamente gratuita.',
  'more.supportLink': 'Puoi sostenerla volontariamente.',
  'more.version': 'Versione {version} · Tutte le funzioni disponibili senza account e senza costi',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': 'Informazioni e contatti',
  'about.version': 'Versione {version}',
  'about.what.title': 'Che cos’è questa app',
  'about.what.p1': '{app} misura con la fotocamera del telefono quanta luce blu registra il sensore e la mostra su due indicatori e su grafici con le zone. Tutte le funzioni — misurazione, cronologia, rapporti, profili di soglie, allarme di soglia, esportazione CSV e documentazione — sono disponibili per chiunque, senza account e senza costi.',
  'about.what.p2': 'L’app è fornita «così com’è», per uso informativo. Il risultato della misurazione ha carattere indicativo e non costituisce una base per decisioni sanitarie.',
  'about.privacy.title': 'Privacy e dati',
  'about.privacy.p1': 'L’immagine della fotocamera viene analizzata esclusivamente sul tuo dispositivo e non viene mai inviata ad alcun server. Non creiamo account e non raccogliamo i tuoi dati. Le impostazioni delle soglie, i profili e la cronologia delle misurazioni sono salvati soltanto nella memoria di questo dispositivo e di questo browser.',
  'about.privacy.p2': 'L’app non mostra pubblicità e non si rivolge alla rete. L’unica eccezione è il pulsante nella schermata «Sostegno»: quando lo premi, il browser apre una pagina esterna in una nuova scheda. Non succede nulla finché non sei tu a farlo.',
  'about.contact.title': 'Contatti',
  'about.contact.p1': 'Osservazioni, errori e proposte: [E-MAIL]. Rispondiamo appena possibile — è un progetto portato avanti dopo il lavoro.',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': 'Sostegno',
  'support.free.title': 'Tutto è disponibile',
  'support.free.text': 'L’intera app è gratuita: misurazione, cronologia e rapporti, profili di soglie, allarme, esportazione CSV e documentazione. Funziona tutto subito, senza account, senza limiti e senza internet.',
  'support.why': '{app} nasce dopo il lavoro. Se ti è utile, puoi offrirmi un caffè. Aiuta a mantenere l’app e a portarla avanti — a migliorare la misurazione, ad ampliare la documentazione e a verificarla su altri telefoni.',
  'support.nothing': 'Una donazione non sblocca nulla. Non esiste una versione migliore né una peggiore — dopo il sostegno l’app funziona esattamente allo stesso modo. L’unica differenza è che l’autore sa che a qualcuno è servita.',
  'support.button': 'Offrimi un caffè',
  'support.button.aria': 'Offrimi un caffè — apre il profilo per le donazioni in una nuova scheda',
  'support.pending': 'Il profilo per le donazioni non è ancora collegato. Appena ci sarà, in questo punto comparirà il pulsante. Fino ad allora non c’è nulla da fare — l’app è comunque gratuita per intero.',
  'support.privacy': 'Il pulsante apre una pagina esterna (Buy Me a Coffee) in una nuova scheda del browser. È l’unico momento in cui qualcosa lascia questo dispositivo. L’immagine della fotocamera e tutte le tue misurazioni restano qui — non vengono inviate da nessuna parte, né prima del clic né dopo.',
  'support.privacyPending': 'Quando l’indirizzo sarà disponibile, premere il pulsante aprirà una pagina esterna (Buy Me a Coffee) in una nuova scheda del browser. Sarà l’unico momento in cui qualcosa lascia questo dispositivo. L’immagine della fotocamera e tutte le tue misurazioni restano qui — non vengono inviate da nessuna parte.',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': 'Documentazione',

  'disclaimer.title': 'Questo non è un dispositivo medico',
  'disclaimer.body.docs': 'Questa app non è un dispositivo medico. Non serve a diagnosticare, curare né prevenire alcuna malattia. I risultati della misurazione con la fotocamera di un telefono hanno carattere indicativo e non sostituiscono un esame né il parere di un medico. Per le questioni di salute della vista consulta un medico o un optometrista. Le soglie delle zone in questa app non riproducono alcuna norma di sicurezza — i dettagli nel capitolo 3.',
  'disclaimer.body.about': 'Questa app non è un dispositivo medico. Non serve a diagnosticare, curare né prevenire alcuna malattia. I risultati della misurazione con la fotocamera di un telefono hanno carattere indicativo e non sostituiscono un esame né il parere di un medico. Per le questioni di salute della vista consulta un medico o un optometrista. Le soglie delle zone in questa app non riproducono alcuna norma di sicurezza — i dettagli nella documentazione, capitolo 3.',

  'doc.toc.aria': 'Indice della documentazione',
  'doc.toc.title': 'Indice',

  'doc.ch1.title': 'Avvio rapido',
  'doc.ch2.title': 'Come funziona la misurazione',
  'doc.ch3.title': 'Unità e norme',
  'doc.ch4.title': 'Zone e soglie',
  'doc.ch5.title': 'Differenze tra i dispositivi',

  'doc.ch1.heading': '1. Avvio rapido',
  'doc.ch2.heading': '2. Come funziona la misurazione',
  'doc.ch3.heading': '3. Unità e norme',
  'doc.ch4.heading': '4. Zone e soglie',
  'doc.ch5.heading': '5. Differenze tra i dispositivi',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': 'Come misurare in modo più accurato',
  'doc.ch1.tips.li1': 'Nella schermata «Fotocamera» (il primo pulsante della barra in basso) premi «Start» e punta la fotocamera posteriore verso lo schermo o la sorgente di luce che vuoi controllare.',
  'doc.ch1.tips.li2': 'Passa alla schermata «Monitoraggio» (il secondo pulsante della barra in basso) — in alto vedi entrambi gli indicatori insieme e più sotto (scorri) i grafici dei cambiamenti nel tempo. La misurazione continua in background, qualunque schermata tu stia guardando.',
  'doc.ch1.tips.li3': 'Tieni il telefono a una distanza fissa dallo schermo (per esempio 15–20 cm), senza cambiare l’illuminazione dell’ambiente durante la misurazione.',
  'doc.ch1.tips.li4': 'Usa la fotocamera posteriore — ha correzioni automatiche meno aggressive di quella anteriore.',
  'doc.ch1.tips.li5': 'Considera i risultati come indicatori relativi (%), non come unità fisiche assolute — confrontali tra loro (per esempio modalità notturna attiva o disattivata).',
  'doc.ch1.tips.li6': 'Adatta le soglie delle zone nelle impostazioni alla luminosità del tuo schermo (capitolo 4).',

  'doc.ch1.fonts.title': 'Caratteri grandi e indicatori — sempre',
  'doc.ch1.fonts.p1': 'Tutta l’app usa caratteri grandi e leggibili e indicatori a piena dimensione, in modo che le persone ipovedenti (e tutte le altre) possano leggere i dati senza impostazioni aggiuntive. Nella schermata «Monitoraggio» entrambi gli indicatori stanno insieme su una sola schermata, senza scorrere — i grafici dei cambiamenti nel tempo sono subito sotto, a uno scorrimento di distanza.',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': 'Fotocamera del telefono e spettrometro',
  'doc.ch2.spectro.p1.html': 'Misurare davvero «quanta luce blu dannosa c’è» richiede di scomporre la luce nelle sue lunghezze d’onda — è ciò che fa uno <b>spettrometro</b>: un prisma o un reticolo di diffrazione disperde la luce in decine o centinaia di bande strette (per esempio ogni 1–5 nm) e misura la potenza ottica di ciascuna separatamente. Soltanto da una distribuzione spettrale così completa si calcolano unità come lux, lumen o irradianza pesata con la funzione di rischio da luce blu.',
  'doc.ch2.spectro.p2.html': '<b>La fotocamera di un telefono non fa nulla di tutto questo.</b> Ha tre filtri larghi (Bayer: R/G/B), ciascuno dei quali raccoglie luce su un intervallo ampio e sovrapposto di lunghezze d’onda — il «canale blu» non è una banda stretta intorno ai 435–440 nm (il picco del rischio per la retina), ma all’incirca 400–570 nm mescolati con il verde. Per strada si aggiungono il demosaicing, l’esposizione automatica, il bilanciamento del bianco automatico e la compressione gamma sRGB — e il browser non permette di disattivare completamente nessuno di questi passaggi. Di conseguenza il valore del pixel che JavaScript vede non è legato in modo lineare alla potenza ottica reale che cade sul sensore. È un limite fondamentale dell’hardware, non un difetto di questa app.',

  'doc.ch2.raw.title': 'Grafico 1 — Luminosità canale B',
  'doc.ch2.raw.what.html': '<b>Che cosa mostra:</b> la luminosità media del solo canale blu (B) nella porzione campionata dell’immagine, su una scala 0–255 convertita in %.',
  'doc.ch2.raw.algo.html': '<b>L’algoritmo:</b>',
  'doc.ch2.raw.step1': 'Preleviamo un fotogramma dalla fotocamera 5 volte al secondo.',
  'doc.ch2.raw.step2': 'Ritagliamo il 60% centrale dell’inquadratura (così si evitano i bordi dell’immagine e i riflessi laterali).',
  'doc.ch2.raw.step3': 'Riduciamo la porzione ritagliata a una griglia di 32×32 pixel (abbastanza precisa e molto più veloce del calcolo a piena risoluzione — cosa che conta su hardware meno potente, come gli Xiaomi o gli Ulefone di fascia economica).',
  'doc.ch2.raw.step4': 'Facciamo la media del valore B di tutti i 1024 pixel di quella griglia.',
  'doc.ch2.raw.step5.html': '<code>risultato = media_B ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>Perché l’abbiamo mantenuta:</b> è la lettura più semplice e diretta di «quanto segnale blu il sensore stia registrando in generale». Il suo difetto è che mescola la luminosità con il colore — anche una scena molto luminosa ma di un bianco neutro darà un risultato alto, pur non essendo particolarmente «blu». Per questo accanto a essa mostriamo il grafico 2.',

  'doc.ch2.share.title': 'Grafico 2 — Quota di blu nella luce',
  'doc.ch2.share.what.html': '<b>Che cosa mostra:</b> quale percentuale di tutta la luce registrata (R+G+B) è costituita dalla componente blu — cioè lo spostamento del colore verso il freddo, indipendentemente da quanto sia luminosa la scena.',
  'doc.ch2.share.algo.html': '<b>L’algoritmo:</b> gli stessi passaggi 1–4 di sopra, ma invece del solo B calcoliamo:',
  'doc.ch2.share.formula.html': '<code>risultato = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': 'Il bianco neutro (R≈G≈B) dà circa il <b>33%</b>. La luce più calda, più rossa — di meno. Quella fortemente blu — di più, fino al limite di ~100% per una luce quasi puramente blu.',
  'doc.ch2.share.why.html': '<b>Perché è la misura più accurata del «blu dannoso»:</b> è lo stesso principio su cui funzionano i filtri tipo modalità notturna o Night Shift — conta il <b>colore</b>, non la luminosità. Uno schermo molto luminoso ma neutro non verrà segnalato per errore come dannoso; uno attenuato ma fortemente blu, sì. Per questo è questa grandezza a governare il colore della zona nella tabella delle letture.',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': 'Perché non lux né lumen',
  'doc.ch3.units.p1.html': 'Il <b>lumen (lm)</b> descrive il flusso luminoso totale emesso da una sorgente — è una proprietà della sorgente stessa, non di ciò che arriva in un dato punto. Il <b>lux (lx)</b> è già l’illuminamento in un punto (lm/m²) — più vicino a ciò che ci interessa, ma pur sempre un’unità <b>fotometrica</b>: pesa lo spettro con la curva di sensibilità dell’occhio umano alla luminosità (V(λ)), non con la curva di rischio da luce blu. Per una misura vera del rischio serve una terza unità, più stretta: l’irradianza pesata spettralmente in <b>W/m²</b> (norma IEC 62471, picco di sensibilità intorno ai 435–440 nm), e questo richiede uno spettrometro — vedi la sezione qui sopra.',
  'doc.ch3.units.p2.html': 'Anche accontentandosi dei lux: un telefono senza un sensore di luce esterno e calibrato non è in grado di determinarli in modo attendibile. Il sensore di luce integrato nel telefono (dove esiste) misura del resto la luce dal <b>lato opposto</b> della scocca rispetto a quello che punti verso lo schermo con la fotocamera posteriore — misurerebbe quindi la luce dietro le tue spalle, non quella dello schermo. Perciò, invece di indovinare un numero in un’unità che sarebbe comunque inaffidabile, mostriamo un <b>indicatore relativo (%)</b> descritto onestamente — sensato per confronti sullo stesso telefono nelle stesse condizioni (per esempio modalità notturna attiva o disattivata), non come valore assoluto.',

  'doc.ch3.norms.title': 'Esistono norme globali per le soglie di sicurezza?',
  'doc.ch3.norms.p1.html': 'In breve: <b>non esiste una norma espressa in percentuali di un canale della fotocamera</b> — non è affatto un’unità in cui si regoli alcunché. Norme reali sulla luce blu esistono, ma misurano altre grandezze, in altre unità, e riguardano un fenomeno diverso da quello che di solito si ha in mente dicendo «la luce blu affatica gli occhi».',
  'doc.ch3.norms.p2.html': '<b>Danno fotochimico acuto della retina — IEC 62471 / ICNIRP.</b> L’unica «pericolosità della luce blu» effettivamente regolata — una norma per lampade e sistemi di illuminazione, sostenuta dalle linee guida dell’ICNIRP (International Commission on Non-Ionizing Radiation Protection). Classifica le sorgenti nei gruppi di rischio RG0–RG3 sulla base della radianza pesata con la funzione di rischio B(λ), in <b>W·m⁻²·sr⁻¹</b>, con un limite al tempo di esposizione (<code>t_max = 100 / L_B</code> secondi). Gli schermi dei telefoni e dei monitor — anche alla massima luminosità — rientrano in pratica sempre nel <b>RG0 (esente, senza restrizioni)</b>. Quella norma riguarda sorgenti molto più intense (archi di saldatura, alcuni proiettori, LED industriali), non gli schermi di consumo.',
  'doc.ch3.norms.p3.html': '<b>Influenza sul ritmo circadiano e sul sonno — CIE S 026.</b> È il fenomeno di cui di solito si parla (lo schermo alla sera «sveglia») — ma non è un danno all’occhio, bensì un effetto sull’orologio biologico attraverso le cellule gangliari della retina (ipRGC), più sensibili intorno ai 480 nm. La norma CIE S 026:2018 definisce l’unità <b>lux melanopico (melanopic EDI)</b>. La cosa più vicina a un consenso scientifico «ufficiale» è l’articolo di Brown e coautori (<i>PLOS Biology</i>, 2022), che raccomanda a titolo indicativo: alla sera &lt; 10 lux melanopici, di giorno &gt; 250. Sono raccomandazioni di ricercatori del sonno, non una disposizione di legge.',
  'doc.ch3.norms.p4.html': '<b>L’OMS.</b> L’Organizzazione Mondiale della Sanità non pubblica limiti di esposizione alla luce blu propri e indipendenti — per la sicurezza delle radiazioni ottiche rimanda all’ICNIRP (qui sopra). L’unico documento concreto e originale dell’OMS sul tema degli schermi sono le <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i> (2019) — che però riguardano il <b>tempo</b> passato davanti allo schermo, non il colore o l’intensità della luce: nessuno schermo sotto 1 anno di età, al massimo 1 ora dai 2 ai 4 anni. Per gli adulti l’OMS non ha indicazioni numeriche altrettanto specifiche.',
  'doc.ch3.norms.p5.html': '<b>Perché tutto questo comunque non aiuta a calibrare l’app:</b> entrambe le norme (IEC/ICNIRP e CIE) richiedono una distribuzione spettrale completa e una radianza calibrata in una geometria di misura nota — esattamente ciò che un telefono, attraverso il browser, non è in grado di fornire (vedi la sezione «Fotocamera del telefono e spettrometro» qui sopra). Non esiste una conversione «33% di quota di blu = X lux melanopici», quindi le soglie di questa app <b>non riproducono alcuna norma di sicurezza</b> (OMS, IEC, ICNIRP o CIE — per questo indicatore semplicemente non ne esiste una). I valori predefiniti della soglia di quota di blu sono invece ricavati dalle temperature di colore reali della luce e dalla raccomandazione pratica, ampiamente ripetuta, di una luce calda alla sera — una base più solida di un semplice arrotondamento, ma pur sempre non una norma formale (la derivazione completa: capitolo 4). Puoi sempre cambiarli con i tuoi nelle impostazioni.',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': 'Le zone di colore e da dove vengono le soglie',
  'doc.ch4.zones.p1.html': 'Entrambe le grandezze hanno soglie proprie, regolabili in modo indipendente (schermata «Monitoraggio» → «Impostazioni delle soglie di zona», in fondo alla pagina) — 33%/66% sull’una non significa lo stesso che sull’altra (vedi il capitolo 2 qui sopra). È la <b>quota di blu</b> a decidere il colore nella legenda sotto i grafici e nella tabella delle letture:',
  'doc.ch4.zones.li1.html': '<b>Verde — sicura:</b> luce calda o neutra, gli occhi riposano.',
  'doc.ch4.zones.li2.html': '<b>Gialla — moderata:</b> spostamento percettibile verso il blu, conviene fare delle pause.',
  'doc.ch4.zones.li3.html': '<b>Rossa — dannosa:</b> luce fortemente blu, affatica molto gli occhi con un’esposizione prolungata (soprattutto alla sera).',
  'doc.ch4.zones.p2.html': '<b>Da dove vengono questi numeri precisi.</b> La <b>luminosità canale B</b> non ha un punto di riferimento naturale — un valore di soglia sensato dipende esclusivamente da quanto è luminosa la scena che stai riprendendo (è una misura di luminosità, non di colore). Il 33%/66% predefinito resta qui un punto di partenza convenzionale — adattalo per tentativi alla luminosità tipica del tuo schermo o del tuo ambiente.',
  'doc.ch4.zones.p3.html': 'La <b>quota di blu</b> ha soglie predefinite ricavate dalle temperature di colore reali della luce (fisica, non arrotondamento), non da una norma di sicurezza — per questa grandezza una norma simile non esiste (capitolo 3). I punti di riferimento:',
  'doc.ch4.zones.li4.html': '<b>~4000K</b> («bianco caldo», la tipica lampadina LED) → circa il <b>26%</b> di quota di blu. Una luce più calda di questa (temperatura di colore più bassa) è l’intervallo ampiamente raccomandato per la sera da strumenti come f.lux o Night Shift — da qui la soglia inferiore.',
  'doc.ch4.zones.li5.html': '<b>6500K (D65)</b>, il punto di bianco standard della maggior parte degli schermi di telefoni e monitor di fabbrica — circa il <b>33%</b>. Da questo valore in su comincia l’intervallo in cui si applicano tipicamente le raccomandazioni di limitare la luce blu — da qui la soglia superiore.',
  'doc.ch4.zones.p4.html': '<b>Un’avvertenza importante:</b> quanto una luce sia «blu» non dipende dall’ora del giorno, ma le raccomandazioni di limitare la luce blu riguardano in pratica soltanto la <b>sera e la notte</b> — di giorno l’esposizione a una luce fredda e blu (anche solare) è normale, e persino utile al ritmo circadiano. Una zona rossa in pieno giorno guardando uno schermo normale, non modificato, non significa un pericolo reale — la stessa luce alla sera vale invece la pena di limitarla.',
  'doc.ch4.zones.p5.html': 'Le soglie delle due grandezze sono del tutto indipendenti — cambiarne una non influisce sull’altra. Le soglie modificate vengono <b>ricordate su questo dispositivo e in questo browser</b> tra un’apertura e l’altra dell’app (in locale, nulla viene inviato da nessuna parte) — il pulsante «Start» non le riporta ai valori predefiniti.',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': 'Perché l’anteprima ha un aspetto diverso su dispositivi diversi',
  'doc.ch5.devices.p1.html': '<b>Il browser e l’app fotocamera nativa.</b> Quando apri la fotocamera preinstallata sul telefono, il produttore (per esempio Xiaomi) aggiunge all’anteprima dal vivo i propri algoritmi proprietari — HDR in tempo reale, amplificazione digitale della luminosità in poca luce, levigatura. Una pagina web riceve attraverso il browser un flusso dalla fotocamera molto più «grezzo» (la funzione <code>getUserMedia</code>), senza nessuno di quei miglioramenti — quindi per principio apparirà più piatta e più scura della fotocamera nativa, indipendentemente dal telefono.',
  'doc.ch5.devices.p2.html': '<b>Diverse possibilità di controllo della fotocamera.</b> Quanto controllo su esposizione e bilanciamento del bianco il browser riceva davvero dal sistema dipende dal telefono specifico, dal driver della fotocamera e dalla versione di Chrome o WebView — alcuni dispositivi (tipicamente i computer con una fotocamera USB) dichiarano soltanto l’automatismo completo, altri (una parte dei telefoni Android) dichiarano modalità aggiuntive e più avanzate. Una versione precedente di questa app tentava di passare alla modalità di esposizione manuale dove il telefono lo consentiva, senza impostare un valore concreto — cosa che su alcuni telefoni congelava l’immagine su un’esposizione casuale e scura, quella del momento di avvio della fotocamera. Era un errore nel codice (già corretto), non una differenza di unità — ma mostra bene quanto facilmente il comportamento possa variare tra i dispositivi, dato che perfino la stessa riga di codice si attiva solo su una parte di essi.',
  'doc.ch5.devices.p3.html': '<b>Sensori ed elaborazione dell’immagine (ISP) diversi.</b> Anche a parità di codice e con la stessa scena, modelli di telefono diversi hanno sensori di qualità diversa e automatismi del produttore tarati in modo diverso — uno sceglierà l’esposizione in poca luce più in fretta e con più precisione di un altro. Questo, unito al fatto che gli indicatori di questa app sono <b>relativi</b> (vedi il capitolo 3), significa: confronta i risultati (e l’aspetto dell’anteprima) sullo stesso telefono nel tempo, non tra modelli o dispositivi diversi.'
});
