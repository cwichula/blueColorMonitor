/* docs/shared/i18n/el.js — słownik WSPÓLNY, grecki.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest grecki.
 *
 * SKĄD TE ZDANIA: przekład z polskiego (pl.js jest redakcją pierwotną),
 * z angielskim (en.js) jako wzorcem terminologii i rejestru. Ton oryginału —
 * rzeczowy i spokojny, bez marketingu i bez straszenia — został zachowany.
 * Do użytkownika zwracamy się drugą osobą liczby pojedynczej, tak jak robi to
 * polszczyzna oryginału.
 *
 * TERMINOLOGIA: siedem wielkości nazwano przyjętymi terminami greckimi,
 * po jednym odpowiedniku na pojęcie w całym pliku: «Ποσοστό μπλε»,
 * «Φωτεινότητα σκηνής», «Θερμοκρασία χρώματος», «Κιρκάδια επίδραση»
 * (μελανοπικός συντελεστής), «Τρεμόσβημα», «Ομοιομορφία», «Οπτική άνεση».
 * Ułamki zapisujemy po grecku przecinkiem: 1,00 i 0,50.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — i tak ma zostać
 * w każdym z trzydziestu języków (patrz docs/shared/README.md, rozdział
 * „Warstwa językowa”). Klucza, którego nie ma w angielskim, nie wolno tu
 * dopisać: angielski jest wartością zapasową, więc to on wyznacza zestaw.
 */
window.I18nData = window.I18nData || {};
window.I18nData['el'] = Object.assign(window.I18nData['el'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu (UE)
     2017/745, gdzie stoi na początku zdania jako podmiot, bez rodzajnika. */
  'app.name': 'Παρακολούθηση Φωτός',

  /* ---- wybór języka ---- */

  'language.label': 'Γλώσσα',
  'language.help': 'Η γλώσσα όλης της εφαρμογής. Όλες οι γλώσσες βρίσκονται ήδη σε αυτή τη συσκευή — τίποτα δεν κατεβαίνει και τίποτα δεν στέλνεται πουθενά.',
  'language.auto': 'Όπως η συσκευή',
  'language.autoHint': 'Ακολουθεί τη γλώσσα που έχει οριστεί στο τηλέφωνο ή στο πρόγραμμα περιήγησης.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Ποσοστό μπλε',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'τοις εκατό',
  'metric.share.short': 'Πόσο από το φως που βλέπει η κάμερα αντιστοιχεί στο μπλε κανάλι.',
  'metric.share.help': 'Ξεχωρίζει το χρώμα από τη φωτεινότητα — αυτή είναι η τιμή που αλλάζει όταν ενεργοποιείς τη νυχτερινή λειτουργία.',

  'metric.brightness.name': 'Φωτεινότητα σκηνής',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'τοις εκατό',
  'metric.brightness.short': 'Η μέση φωτεινότητα της εικόνας της κάμερας.',
  'metric.brightness.help': 'Σχετική τιμή, όχι lux — ο αυτόματος έλεγχος έκθεσης της κάμερας τη μετακινεί από κάτω.',

  'metric.kelvin.name': 'Θερμοκρασία χρώματος',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'κέλβιν',
  'metric.kelvin.short': 'Αν το φως είναι θερμό ή ψυχρό.',
  'metric.kelvin.help': 'Κάτω από 3000 K το φως είναι θερμό και το βράδυ πιο ήπιο. Τα 6500 K είναι το προεπιλεγμένο λευκό των περισσότερων οθονών.',

  'metric.melanopic.name': 'Κιρκάδια επίδραση',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'φορές',
  'metric.melanopic.short': 'Πόσο έντονα δρα αυτό το φως στο βιολογικό ρολόι.',
  'metric.melanopic.help': 'Προσέγγιση του μελανοπικού συντελεστή. Το 1,00 είναι ουδέτερο λευκό ημέρας· το βράδυ αξίζει να κατεβαίνει κάτω από 0,50.',

  'metric.flicker.name': 'Τρεμόσβημα',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'τοις εκατό',
  'metric.flicker.short': 'Αόρατος παλμός της πηγής φωτός.',
  'metric.flicker.help': 'Τα φθηνά ρυθμιστικά έντασης και οι οπίσθιοι φωτισμοί πάλλονται. Το μάτι δεν το βλέπει, όμως είναι γνωστή αιτία κόπωσης και πονοκεφάλου.',

  'metric.uniformity.name': 'Ομοιομορφία',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'τοις εκατό',
  'metric.uniformity.short': 'Αν το φως κατανέμεται ομοιόμορφα στο κάδρο.',
  'metric.uniformity.help': 'Χαμηλή τιμή σε οθόνη σημαίνει διαρροή του οπίσθιου φωτισμού ή αντανάκλαση· στο γραφείο, κακά τοποθετημένη λάμπα.',

  'metric.comfort.name': 'Οπτική άνεση',
  'metric.comfort.unit': 'μον.',
  'metric.comfort.unitSpoken': 'μονάδες',
  'metric.comfort.short': 'Μία κρίση αντί για έξι αριθμούς.',
  'metric.comfort.help': 'Συνθέτει τις υπόλοιπες μετρήσεις σε βαθμολογία 0–100 και δείχνει τι τη μειώνει περισσότερο. Οι συντελεστές βαρύτητας είναι δική μας συντακτική κρίση, όχι πρότυπο.',

  /* Etykiety składników oceny komfortu — Metrics.comfortIndex zwraca je jako
     `penalties[].id`, więc nazwa klucza idzie za tym identyfikatorem. */
  'comfort.penalty.melanopic': 'Κιρκάδια επίδραση',
  'comfort.penalty.kelvin': 'Ψυχρό χρώμα φωτός',
  'comfort.penalty.flicker': 'Τρεμόσβημα',
  'comfort.penalty.uniformity': 'Ανομοιόμορφος φωτισμός',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Nazwa klawisza
     w cudzysłowie musi brzmieć tak samo jak przycisk w słowniku wersji. */

  'engine.idle': 'Πάτησε «Έναρξη» για να ενεργοποιηθεί η κάμερα.',
  'engine.starting': 'Ενεργοποίηση της κάμερας…',

  'engine.error.permission': 'Δεν δόθηκε άδεια πρόσβασης στην κάμερα. Επίτρεψε την κάμερα στις ρυθμίσεις του προγράμματος περιήγησης και πάτησε ξανά «Έναρξη».',
  'engine.error.notFound': 'Δεν βρέθηκε κάμερα. Έλεγξε αν η συσκευή έχει κάμερα και αν δεν είναι απενεργοποιημένη στο σύστημα.',
  'engine.error.busy': 'Η κάμερα χρησιμοποιείται από άλλη εφαρμογή. Κλείσε την και δοκίμασε ξανά.',
  'engine.error.unknown': 'Δεν ήταν δυνατή η ενεργοποίηση της κάμερας.',
  'engine.error.unsupported': 'Αυτό το πρόγραμμα περιήγησης δεν δίνει σε αυτή τη σελίδα πρόσβαση στην κάμερα. Άνοιξε την εφαρμογή μέσω HTTPS ή χρησιμοποίησε άλλο πρόγραμμα περιήγησης.',

  /* ---- strefy ---- */

  'zone.good': 'Εντός ορίων',
  'zone.warning': 'Προσοχή',
  'zone.critical': 'Κρίσιμο',
  'zone.none': 'Χωρίς δεδομένα',
  'zone.settling': 'Σταθεροποίηση',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania, więc małą literą
     i bez kropki. To nie jest to samo, co napis na plakietce. */
  'zone.spoken.good': 'εντός ορίων',
  'zone.spoken.warning': 'προσοχή',
  'zone.spoken.critical': 'κρίσιμο',
  'zone.spoken.none': 'χωρίς δεδομένα',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'μον.',
  'unit.hertz': 'Hz',
  'unit.second': 'δευτ.',
  'unit.minute': 'λεπ.',
  'unit.hour': 'ώ.',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'Αυτό το φως είναι εντάξει — τίποτα δεν ξεπερνά τα όρια που όρισες.',
  'verdict.noValue': 'Αυτό το μέγεθος δεν μπορεί να μετρηθεί αυτή τη στιγμή. Έλεγξε μήπως κάτι καλύπτει τον φακό.',
  'verdict.warmup': 'Διαμορφώνεται η κρίση — κράτησε το τηλέφωνο ακίνητο για λίγο ακόμη.',

  'verdict.warning.share': 'Αρκετό από αυτό το φως αντιστοιχεί στο μπλε κανάλι. Το βράδυ αξίζει να το χαμηλώσεις.',
  'verdict.warning.brightness': 'Η σκηνή είναι φωτεινή — η κάμερα δουλεύει κοντά στο ανώτερο όριο της μέτρησης.',
  'verdict.warning.kelvin': 'Το φως είναι μάλλον ψυχρό. Το βράδυ μια λάμπα γύρω στα 2700 K είναι πιο ήπια.',
  'verdict.warning.melanopic': 'Αυτό το φως δρα αρκετά έντονα στο βιολογικό ρολόι.',
  'verdict.warning.flicker': 'Η πηγή φωτός πάλλεται αισθητά.',
  'verdict.warning.uniformity': 'Το φως κατανέμεται ανομοιόμορφα στο κάδρο.',
  'verdict.warning.comfort': 'Η οπτική άνεση είναι μειωμένη — συνέβαλαν αρκετά πράγματα μαζί.',

  'verdict.critical.share': 'Πάρα πολύ μπλε. Το βράδυ ενεργοποίησε τη νυχτερινή λειτουργία ή άλλαξε πηγή φωτός.',
  'verdict.critical.brightness': 'Η σκηνή είναι πολύ φωτεινή. Μη μετράς στρέφοντας την κάμερα κατευθείαν στην πηγή φωτός.',
  'verdict.critical.kelvin': 'Το φως είναι ψυχρό. Το βράδυ αυτό κουράζει περισσότερο τα μάτια — μια πιο θερμή λάμπα ή η νυχτερινή λειτουργία θα βοηθήσει.',
  'verdict.critical.melanopic': 'Αυτό το φως δρα έντονα στο βιολογικό ρολόι. Το βράδυ αξίζει να κατεβείς κάτω από 0,50.',
  'verdict.critical.flicker': 'Η πηγή φωτός πάλλεται έντονα. Αυτό είναι γνωστή αιτία κόπωσης των ματιών και πονοκεφάλου.',
  'verdict.critical.uniformity': 'Το φως κατανέμεται πολύ ανομοιόμορφα. Έλεγξε τη θέση της λάμπας ή τις αντανακλάσεις στην οθόνη.',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'Η οπτική άνεση είναι χαμηλή. Δες την ανάλυση της βαθμολογίας για να καταλάβεις τι τη μειώνει.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'Τι δεν λέει αυτός ο αριθμός',
  'note.warningTitle': 'Προσοχή',
  'note.dashTitle': 'Τι δεν είναι αυτή η μέτρηση',
  'note.dashText': 'Η κάμερα του τηλεφώνου έχει τρία πλατιά χρωματικά κανάλια και αυτόματη ισορροπία λευκού — δεν μετρά φάσμα. Η θερμοκρασία χρώματος και η κιρκάδια επίδραση είναι προσεγγίσεις υπολογισμένες από τα βασικά χρώματα sRGB. Η εφαρμογή δείχνει καλά τις διαφορές και τις μεταβολές στον χρόνο· δεν αντικαθιστά όργανο μέτρησης και δεν θέτει καμία διάγνωση.',
  'note.approxLegend': '≈ κατά προσέγγιση τιμή — υπολογισμένη από τα βασικά χρώματα sRGB, όχι από φασματική μέτρηση.',
  'note.kelvinOutOfRange': 'Εκτός του εύρους της μεθόδου — σε αυτό το χρώμα ο τύπος για τη θερμοκρασία χρώματος παύει να είναι αξιόπιστος.',
  /* {rate} i {limit} podaje wywołanie, bo to liczby z silnika (5 Hz, 2,5 Hz),
     a ich zapis jest różny w różnych językach. Grecki, tak jak polski, pisze
     ułamek przecinkiem — dlatego liczby nie wolno wpisać do zdania na sztywno. */
  'note.flickerOutOfRange': 'Εκτός του εύρους της μεθόδου — η δειγματοληψία στα {rate} Hz βλέπει παλμούς μόνο κάτω από {limit} Hz. Το τρεμόσβημα του δικτύου στα 100 Hz είναι εκτός εμβέλειας και η εφαρμογή δεν θα το δώσει ποτέ ως αποτέλεσμα.',
  'note.helpTitle': 'Τι δεν λέει αυτός ο αριθμός',
  'note.helpText': 'Η κάμερα του τηλεφώνου έχει τρία πλατιά κανάλια και δεν μετρά φάσμα. Αυτή η τιμή είναι συγκριτικός δείκτης — δείχνει καλά τις διαφορές ανάμεσα στα φώτα και τις μεταβολές στον χρόνο, δεν είναι όμως ούτε εργαστηριακή μέτρηση ούτε ιατρική πληροφορία.',
  'note.calibration': 'Μέτρηση χωρίς βαθμονόμηση — αντιμετώπισε τις τιμές συγκριτικά.',

  'note.howToTitle': 'Πώς να μετράς σωστά',
  'note.howTo.hold.title': 'Κράτα το τηλέφωνο ακίνητο',
  'note.howTo.hold.text': 'Ο αυτόματος έλεγχος έκθεσης χρειάζεται 2–3 δευτερόλεπτα για να σταθεροποιηθεί.',
  'note.howTo.aim.title': 'Στόχευσε σε φωτισμένη επιφάνεια',
  'note.howTo.aim.text': 'Ένα λευκό χαρτί ή έναν ανοιχτόχρωμο τοίχο. Μη μετράς κοιτάζοντας κατευθείαν στην πηγή φωτός.',
  'note.howTo.compare.title': 'Σύγκρινε, μην κρίνεις απόλυτα',
  'note.howTo.compare.text': 'Η ίδια σκηνή πριν και μετά την αλλαγή του φωτισμού λέει περισσότερα από έναν μεμονωμένο αριθμό.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Terminy wzięto z greckiej wersji tego rozporządzenia
     («ιατροτεχνολογικό προϊόν»). Skracanie go nie jest kwestią stylu. */

  'legal.noDiagnosis': 'Κανένα αποτέλεσμα δεν αποτελεί διάγνωση ούτε συμβουλή υγείας.',
  'legal.mdr': '{app} δεν αποτελεί ιατροτεχνολογικό προϊόν κατά την έννοια του κανονισμού (ΕΕ) 2017/745, δεν προορίζεται για τη διάγνωση, την πρόληψη, την παρακολούθηση ή τη θεραπεία οποιασδήποτε πάθησης και δεν υποκαθιστά την εξέταση από ιατρό ή οπτομέτρη.',

  /* ---- prywatność ---- */

  'privacy.title': 'Τι φεύγει από αυτή τη συσκευή',
  'privacy.short': 'Τίποτα σε αυτή την εφαρμογή δεν στέλνει τίποτα στο δίκτυο. Όλοι οι αριθμοί παράγονται σε αυτή τη συσκευή και εδώ μένουν.',
  'privacy.onDevice': 'Η κάμερα ενεργοποιείται μόνο αφού πατήσεις το κουμπί, και η εικόνα δεν φεύγει ποτέ από αυτή τη συσκευή.',
  'privacy.external': 'Αυτό είναι το μοναδικό σημείο σε όλη την εφαρμογή όπου κάτι φεύγει από αυτή τη συσκευή: το κουμπί ανοίγει μια εξωτερική σελίδα σε νέα καρτέλα, και αυτό συμβαίνει μόνο αφού το πατήσεις. Οι μετρήσεις, το ιστορικό και οι ρυθμίσεις μένουν εδώ.',
  'privacy.externalPending': 'Όταν υπάρξει η διεύθυνση, το κουμπί θα ανοίγει μια εξωτερική σελίδα σε νέα καρτέλα. Αυτή θα είναι η μοναδική στιγμή που κάτι φεύγει από αυτή τη συσκευή. Οι μετρήσεις, το ιστορικό και οι ρυθμίσεις μένουν εδώ.',
  'privacy.storageBlocked': 'Αυτό το πρόγραμμα περιήγησης δεν επιτρέπει να αποθηκευτεί τίποτα (ιδιωτική περιήγηση ή αποκλεισμένα δεδομένα ιστότοπων). Η μέτρηση λειτουργεί, αλλά το ιστορικό θα χαθεί όταν κλείσεις την καρτέλα.',

  /* ---- liczebniki ----
     Grecki ma dwie kategorie CLDR: one (1) i other (cała reszta, także 0
     i ułamki). Formę wybiera Intl.PluralRules('el'), nie nasza reguła. */

  'count.readings': { one: '{n} ένδειξη', other: '{n} ενδείξεις' },
  'count.sessions': { one: '{n} μέτρηση', other: '{n} μετρήσεις' },
  'count.seconds': { one: '{n} δευτερόλεπτο', other: '{n} δευτερόλεπτα' },
  'count.minutes': { one: '{n} λεπτό', other: '{n} λεπτά' },
  'count.hours': { one: '{n} ώρα', other: '{n} ώρες' },
  'count.days': { one: '{n} ημέρα', other: '{n} ημέρες' }
});
