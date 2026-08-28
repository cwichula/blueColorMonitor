/* docs/shared/i18n/it.js — słownik WSPÓLNY, włoski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest włoski.
 *
 * SKĄD TE ZDANIA: przekład z polskiej redakcji pierwotnej (pl.js), z angielskim
 * (en.js) jako wzorcem terminologii i rejestru. Siedem wielkości nazwano
 * przyjętymi terminami włoskimi: „temperatura colore”, „sfarfallio”,
 * „rapporto melanopico” — nie kalkami z angielskiego. Ton rzeczowy, bez
 * marketingu; zastrzeżenie medyczne i zdania o prywatności przełożone wiernie,
 * bez skracania i bez osłabiania.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w en.js — i tak ma zostać
 * w każdym z trzydziestu języków (patrz docs/shared/README.md, rozdział
 * „Warstwa językowa”). Klucza, którego nie ma w angielskim, nie wolno tu
 * dopisać: angielski jest wartością zapasową, więc to on wyznacza zestaw.
 */
window.I18nData = window.I18nData || {};
window.I18nData['it'] = Object.assign(window.I18nData['it'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu
     (UE) 2017/745, gdzie stoi jako podmiot. */
  'app.name': 'Monitor della Luce',

  /* ---- wybór języka ---- */

  'language.label': 'Lingua',
  'language.help': 'La lingua di tutta l\'app. Tutte le lingue sono già su questo dispositivo — non si scarica nulla e nulla viene inviato da nessuna parte.',
  'language.auto': 'Come il dispositivo',
  'language.autoHint': 'Segue la lingua impostata nel telefono o nel browser.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Quota di blu',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'per cento',
  'metric.share.short': 'Quanta parte della luce inquadrata ricade sul canale blu.',
  'metric.share.help': 'Separa il colore dalla luminosità — è questo il valore che cambia quando attivi la modalità notturna.',

  'metric.brightness.name': 'Luminosità scena',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'per cento',
  'metric.brightness.short': 'La luminosità media dell\'immagine della fotocamera.',
  'metric.brightness.help': 'Un valore relativo, non lux — la fotocamera muove al di sotto la propria esposizione automatica.',

  'metric.kelvin.name': 'Temperatura colore',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'kelvin',
  'metric.kelvin.short': 'Se la luce è calda o fredda.',
  'metric.kelvin.help': 'Sotto i 3000 K la luce è calda e alla sera più delicata. 6500 K è il bianco predefinito della maggior parte degli schermi.',

  'metric.melanopic.name': 'Impatto circadiano',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'volte',
  'metric.melanopic.short': 'Quanto intensamente questa luce agisce sull\'orologio biologico.',
  'metric.melanopic.help': 'Un\'approssimazione del rapporto melanopico. 1,00 è il bianco neutro della luce diurna; alla sera conviene scendere sotto 0,50.',

  'metric.flicker.name': 'Sfarfallio',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'per cento',
  'metric.flicker.short': 'Il pulsare invisibile della sorgente luminosa.',
  'metric.flicker.help': 'I dimmer e le retroilluminazioni economiche pulsano. L\'occhio non lo vede, ma è una causa nota di stanchezza e mal di testa.',

  'metric.uniformity.name': 'Uniformità',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'per cento',
  'metric.uniformity.short': 'Se la luce è distribuita in modo uniforme nell\'inquadratura.',
  'metric.uniformity.help': 'Un valore basso su uno schermo indica una perdita di retroilluminazione o un riflesso; su una scrivania, una lampada mal posizionata.',

  'metric.comfort.name': 'Comfort visivo',
  'metric.comfort.unit': 'pt',
  'metric.comfort.unitSpoken': 'punti',
  'metric.comfort.short': 'Un solo giudizio al posto di sei numeri.',
  'metric.comfort.help': 'Raccoglie le altre misure in un punteggio 0–100 e mostra che cosa lo abbassa di più. I pesi sono una nostra valutazione redazionale, non una norma.',

  'comfort.penalty.melanopic': 'Impatto circadiano',
  'comfort.penalty.kelvin': 'Colore freddo della luce',
  'comfort.penalty.flicker': 'Sfarfallio',
  'comfort.penalty.uniformity': 'Illuminazione non uniforme',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': 'Premi «Start» per accendere la fotocamera.',
  'engine.starting': 'Avvio della fotocamera…',

  'engine.error.permission': 'Nessuna autorizzazione ad accedere alla fotocamera. Consenti la fotocamera nelle impostazioni del browser e premi di nuovo «Start».',
  'engine.error.notFound': 'Nessuna fotocamera trovata. Verifica che il dispositivo abbia una fotocamera e che non sia disattivata nel sistema.',
  'engine.error.busy': 'La fotocamera è occupata da un\'altra applicazione. Chiudila e riprova.',
  'engine.error.unknown': 'Non è stato possibile avviare la fotocamera.',
  'engine.error.unsupported': 'Questo browser non dà a questa pagina l\'accesso alla fotocamera. Apri l\'app tramite HTTPS oppure usa un altro browser.',

  /* ---- strefy ---- */

  'zone.good': 'Nella norma',
  'zone.warning': 'Attenzione',
  'zone.critical': 'Critico',
  'zone.none': 'Nessun dato',
  'zone.settling': 'In assestamento',

  'zone.spoken.good': 'nella norma',
  'zone.spoken.warning': 'attenzione',
  'zone.spoken.critical': 'critico',
  'zone.spoken.none': 'nessun dato',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'pt',
  'unit.hertz': 'Hz',
  'unit.second': 's',
  'unit.minute': 'min',
  'unit.hour': 'h',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'Questa luce va bene — nulla supera le soglie impostate.',
  'verdict.noValue': 'Questa grandezza non è misurabile in questo momento. Verifica che nulla copra l\'obiettivo.',
  'verdict.warmup': 'Sto definendo il giudizio — tieni il telefono fermo ancora un momento.',

  'verdict.warning.share': 'Una parte consistente di questa luce ricade sul canale blu. Alla sera conviene attenuarla.',
  'verdict.warning.brightness': 'La scena è luminosa — la fotocamera lavora vicino al limite superiore della misura.',
  'verdict.warning.kelvin': 'La luce è piuttosto fredda. Alla sera una lampadina intorno a 2700 K è più delicata.',
  'verdict.warning.melanopic': 'Questa luce agisce piuttosto intensamente sull\'orologio biologico.',
  'verdict.warning.flicker': 'La sorgente luminosa pulsa in modo evidente.',
  'verdict.warning.uniformity': 'La luce è distribuita in modo non uniforme nell\'inquadratura.',
  'verdict.warning.comfort': 'Il comfort visivo è ridotto — vi concorrono più fattori insieme.',

  'verdict.critical.share': 'Moltissimo blu. Alla sera attiva la modalità notturna oppure cambia la sorgente luminosa.',
  'verdict.critical.brightness': 'La scena è molto luminosa. Non misurare puntando dritto verso la sorgente luminosa.',
  'verdict.critical.kelvin': 'La luce è fredda. Alla sera è ciò che affatica di più gli occhi — una lampadina più calda o la modalità notturna aiutano.',
  'verdict.critical.melanopic': 'Questa luce agisce intensamente sull\'orologio biologico. Alla sera conviene scendere sotto 0,50.',
  'verdict.critical.flicker': 'La sorgente luminosa pulsa fortemente. È una causa nota di affaticamento degli occhi e mal di testa.',
  'verdict.critical.uniformity': 'La luce è distribuita in modo molto disomogeneo. Verifica la posizione della lampada o i riflessi sullo schermo.',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'Il comfort visivo è basso. Guarda come è composto il punteggio per vedere che cosa lo abbassa.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'Che cosa questo numero non dice',
  'note.warningTitle': 'Attenzione',
  'note.dashTitle': 'Che cosa non è questa misura',
  'note.dashText': 'La fotocamera di un telefono ha tre ampi canali di colore e un bilanciamento del bianco automatico — non misura uno spettro. La temperatura colore e l\'impatto circadiano sono approssimazioni calcolate dalle primarie sRGB. L\'app mostra bene le differenze e i cambiamenti nel tempo, non sostituisce uno strumento di misura e non formula alcuna diagnosi.',
  'note.approxLegend': '≈ valore approssimato — calcolato dalle primarie sRGB, non da una misura spettrale.',
  'note.kelvinOutOfRange': 'Fuori dall\'intervallo del metodo — con questo colore la formula della temperatura colore smette di essere attendibile.',
  'note.flickerOutOfRange': 'Fuori dall\'intervallo del metodo — il campionamento a {rate} Hz vede il pulsare solo sotto i {limit} Hz. Lo sfarfallio di rete a 100 Hz è fuori portata e l\'app non lo riporterà mai come risultato.',
  'note.helpTitle': 'Che cosa questo numero non dice',
  'note.helpText': 'La fotocamera di un telefono ha tre ampi canali e non misura uno spettro. Questo valore è un indicatore comparativo — mostra bene le differenze tra le luci e i cambiamenti nel tempo, e non è né una misura di laboratorio né un\'informazione medica.',
  'note.calibration': 'Misura senza calibrazione — considera i valori in senso comparativo.',

  'note.howToTitle': 'Come misurare in modo sensato',
  'note.howTo.hold.title': 'Tieni il telefono fermo',
  'note.howTo.hold.text': 'L\'esposizione automatica ha bisogno di 2–3 secondi per stabilizzarsi.',
  'note.howTo.aim.title': 'Punta su una superficie illuminata',
  'note.howTo.aim.text': 'Un foglio di carta bianco o una parete chiara. Non misurare guardando dritto nella sorgente luminosa.',
  'note.howTo.compare.title': 'Confronta, non giudicare in assoluto',
  'note.howTo.compare.text': 'La stessa scena prima e dopo un cambio di illuminazione dice più di un singolo numero.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Skracanie go w tłumaczeniu nie jest kwestią stylu. */

  'legal.noDiagnosis': 'Nessun risultato è una diagnosi o un consiglio sanitario.',
  'legal.mdr': '{app} non è un dispositivo medico ai sensi del regolamento (UE) 2017/745, non è destinato a diagnosticare, prevenire, monitorare o trattare alcuna condizione patologica e non sostituisce una visita presso un medico o un optometrista.',

  /* ---- prywatność ---- */

  'privacy.title': 'Che cosa esce da questo dispositivo',
  'privacy.short': 'Nulla in questa app invia alcunché in rete. Ogni numero nasce su questo dispositivo e qui resta.',
  'privacy.onDevice': 'La fotocamera si accende solo dopo che hai premuto il pulsante e l\'immagine non lascia mai questo dispositivo.',
  'privacy.external': 'Questo è l\'unico punto dell\'intera app in cui qualcosa lascia questo dispositivo: il pulsante apre una pagina esterna in una nuova scheda, e solo dopo che lo hai premuto. Misure, cronologia e impostazioni restano qui.',
  'privacy.externalPending': 'Quando l\'indirizzo sarà disponibile, il pulsante aprirà una pagina esterna in una nuova scheda. Sarà l\'unico momento in cui qualcosa lascia questo dispositivo. Misure, cronologia e impostazioni restano qui.',
  'privacy.storageBlocked': 'Questo browser non consente di salvare nulla (modalità privata o dati dei siti bloccati). La misura funziona, ma la cronologia sparirà alla chiusura della scheda.',

  /* ---- liczebniki ----
     Włoski ma trzy kategorie CLDR: one (1), many (zapis skrócony wielkich
     liczb: „1 milione di letture”) i other — reszta liczb, także ułamki.
     Formę wybiera Intl.PluralRules('it'), nie nasza reguła. */

  'count.readings': { one: '{n} lettura', many: '{n} letture', other: '{n} letture' },
  'count.sessions': { one: '{n} misurazione', many: '{n} misurazioni', other: '{n} misurazioni' },
  'count.seconds': { one: '{n} secondo', many: '{n} secondi', other: '{n} secondi' },
  'count.minutes': { one: '{n} minuto', many: '{n} minuti', other: '{n} minuti' },
  'count.hours': { one: '{n} ora', many: '{n} ore', other: '{n} ore' },
  'count.days': { one: '{n} giorno', many: '{n} giorni', other: '{n} giorni' }
});
