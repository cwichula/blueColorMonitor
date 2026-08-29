/* Monitor Światła v5 — słownik grecki.
 *
 * Powstał z pl.js (źródło TREŚCI) i z en.js (wzorzec TERMINOLOGII i rejestru).
 * Nie jest kalką żadnego z nich: zdania przełożono na naturalną grekę, a nie
 * słowo w słowo. Zachowane zostało to, co niesie znaczenie: liczby, progi,
 * jednostki, nazwy wstawek i — co do treści — zastrzeżenia medyczne oraz
 * zdania o prywatności. Tych ostatnich nie wolno osłabiać ani wzmacniać:
 * „nie zastępuje rozmowy z lekarzem” ma po grecku znaczyć dokładnie tyle samo,
 * a „obraz nie opuszcza urządzenia” nie może stać się obietnicą szerszą niż
 * polska.
 *
 * REJESTR: grzeczna liczba mnoga (πληθυντικός ευγενείας) — „ρυθμίστε”,
 * „η συσκευή σας”. W greckim oprogramowaniu jest to forma neutralna, a nie
 * urzędowa; tryb rozkazujący w liczbie pojedynczej brzmiałby tu poufale.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych i pomocy):
 *   ποσοστό μπλε, φωτεινότητα σκηνής, θερμοκρασία χρώματος, κιρκάδια επίδραση
 *   (w opisie: μελανοπικός συντελεστής), τρεμόσβημα, ομοιομορφία,
 *   οπτική άνεση.
 * STREFY: ασφαλές / μέτριο / επιβλαβές — przymiotniki w rodzaju nijakim, bo
 * wchodzą w zdanie „ζώνη: {zone}” i „κατά μέσο όρο {zone}”. Greckie przysłówki
 * („ασφαλώς”) znaczyłyby tu co innego.
 * POZOSTAŁE STAŁE ODPOWIEDNIKI: ιστορικό (historia), συνεδρία (sesja),
 * δείγμα (próbka), μέτρηση (pomiar), μέγεθος (wielkość), κατώφλι (próg),
 * ένδειξη (odczyt).
 *
 * ZAPIS: cudzysłowy greckie « », apostrof typograficzny ’ (Γι’ αυτό, απ’ ό,τι),
 * przecinek dziesiętny (1,00 / 0,50), znak zapytania to greckie ; (U+003B),
 * spacje nierozdzielające zapisane jako \u00A0, minus jako \u2212. Procent bez spacji
 * (tak formatuje go CLDR dla greki). Symbole jednostek (%, K, ×, Hz) i skróty
 * czasu z CLDR (ώ., λ., δευτ., ημ.) zostają bez zmian.
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Κείμενο με ένθεμα {name}'   — napis zwykły,
 *   'klucz.kropkowany': { one, other }               — forma zależna od liczby.
 * Grecki ma w CLDR dwie formy: `one` i `other`. Nazwy wstawek są identyczne
 * jak w pl.js — pilnuje tego keys.test.js. Kolejność wstawek w zdaniu wolno
 * zmieniać, nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Μόνιτορ Φωτός',
  'app.description': 'Μόνιτορ Φωτός — μετρά με την κάμερα επτά μεγέθη του φωτός γύρω σας. Όλα υπολογίζονται σε αυτή τη συσκευή, τίποτα δεν φεύγει στο δίκτυο.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Μόνιτορ Φωτός',
  'app.skipToContent': 'Μετάβαση στο περιεχόμενο',
  'app.nav.aria': 'Κύρια πλοήγηση',
  'app.noscript.title': 'Αυτή η εφαρμογή χρειάζεται JavaScript',
  'app.noscript.text': 'Όλη η μέτρηση γίνεται μέσα σε αυτή την καρτέλα του προγράμματος περιήγησης: η JavaScript διαβάζει τα καρέ από την κάμερα και υπολογίζει από αυτά τα επτά μεγέθη του φωτός. Χωρίς αυτήν δεν υπάρχει με τι να μετρήσουμε. Ενεργοποιήστε τη JavaScript για αυτή τη σελίδα και ανοίξτε την ξανά — και πάλι τίποτα δεν θα σταλεί στο δίκτυο.',

  'nav.measure': 'Μέτρηση',
  'nav.history': 'Ιστορικό',
  'nav.tools': 'Εργαλεία',
  'nav.support': 'Υποστήριξη',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Σε μέτρηση',
  'shell.live.aria': 'Μέτρηση σε εξέλιξη. {metric}: {value}. Επιστροφή στην οθόνη μέτρησης.',
  'shell.live.metricFallback': 'Κύριο μέγεθος',
  'shell.action.fallback': 'Ενέργεια οθόνης',

  'shell.loadFail.title': 'Η οθόνη «{screen}» δεν φορτώθηκε',
  'shell.loadFail.text': 'Πιθανότατα λείπουν κάποια αρχεία από τον αποθηκευτικό χώρο της συσκευής. Συνδεθείτε στο δίκτυο και ανανεώστε τη σελίδα.',
  'shell.fatal.title': 'Κάτι πήγε στραβά',
  'shell.fatal.text': 'Η εφαρμογή δεν μπόρεσε να συνθέσει την οθόνη. Η ανανέωση της σελίδας συνήθως αρκεί — οι αποθηκευμένες μετρήσεις και ρυθμίσεις μένουν στη θέση τους.',
  'shell.fatal.reload': 'Ανανέωση σελίδας',
  'shell.boot.failTitle': 'Η εφαρμογή δεν ξεκίνησε',
  'shell.boot.failText': 'Το κέλυφος δεν ξεκίνησε. Ανανεώστε τη σελίδα — οι αποθηκευμένες μετρήσεις και ρυθμίσεις μένουν στη θέση τους.',
  'shell.background.error': 'Κάτι χάλασε στο παρασκήνιο',
  'shell.background.action': 'Ανανέωση',
  'shell.update.title': 'Διαθέσιμη νέα έκδοση',
  'shell.update.action': 'Ανανέωση',

  'onboarding.title': 'Πριν ξεκινήσετε',
  'onboarding.lead': 'Το Μόνιτορ Φωτός κοιτάζει με την κάμερα το φως γύρω σας και υπολογίζει από αυτό επτά μεγέθη — από το ποσοστό μπλε ως την οπτική άνεση.',
  'onboarding.privacy': 'Η εικόνα δεν φεύγει από αυτή τη συσκευή: δεν υπάρχει διακομιστής, δεν υπάρχει λογαριασμός και δεν στέλνεται τίποτα. Και τα επτά μεγέθη λειτουργούν αμέσως, χωρίς σύνδεση και χωρίς χρέωση.',
  'onboarding.honesty': 'Αυτό είναι ένδειξη προσανατολισμού, όχι όργανο μέτρησης ούτε ιατρική εξέταση. Ό,τι δεν μπορεί να μετρηθεί δεν το δείχνουμε — αντί για αριθμό θα δείτε μια παύλα.',
  'onboarding.start': 'Ξεκινάμε',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Εφαρμογή',
  'overlay.toast.close': 'Κλείσιμο μηνύματος',
  'overlay.sheet.label': 'Παράθυρο',
  'overlay.sheet.close': 'Κλείσιμο',
  'overlay.dialog.confirm': 'Επιβεβαίωση',
  'overlay.dialog.cancel': 'Άκυρο',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'Άκυρο',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'Μέτρηση',

  'measure.intro.aria': 'Έναρξη μέτρησης',
  'measure.intro.headline': 'Δείτε τι φως σας φωτίζει',
  'measure.intro.lead': 'Η κάμερα δείχνει πόσο μπλε έχει το φως που πέφτει πάνω σας αυτή τη στιγμή — και αν είναι υπερβολικό για αυτή την ώρα της ημέρας.',
  'measure.intro.start': 'Έναρξη μέτρησης',
  'measure.intro.hint': 'Το πρόγραμμα περιήγησης θα ζητήσει άδεια για την κάμερα. Η μέτρηση ξεκινά μόλις τη δώσετε.',
  'measure.intro.privacy': 'Η εικόνα της κάμερας επεξεργάζεται σε αυτή τη συσκευή και δεν την εγκαταλείπει ποτέ. Δεν στέλνουμε, δεν αποθηκεύουμε και δεν μοιραζόμαστε ούτε ένα καρέ.',
  'measure.intro.honesty': 'Αυτό δεν είναι ιατρική συσκευή ούτε εξέταση. Η εφαρμογή δείχνει μια προσέγγιση του φωτός γύρω σου, δεν κρίνει την υγεία σου και δεν αντικαθιστά τη συζήτηση με γιατρό.',

  'measure.live.aria': 'Μέτρηση σε εξέλιξη',
  'measure.badge.starting': 'Εκκίνηση',
  'measure.badge.paused': 'Σε παύση',
  'measure.badge.running': 'Σε μέτρηση',
  'measure.stale': 'Αναμονή για εικόνα — η προεπισκόπηση παγώνει όσο η εφαρμογή είναι στο παρασκήνιο.',
  'measure.crop': 'Μετράμε το κέντρο του καρέ — το σημειωμένο {percent}% του πλάτους και του ύψους της εικόνας.',
  'measure.facing.front': 'μπροστινή κάμερα',
  'measure.facing.back': 'πίσω κάμερα',

  'measure.boot.title': 'Εκκίνηση κάμερας…',
  'measure.boot.text': 'Αν το πρόγραμμα περιήγησης ζητήσει άδεια, δώστε την — χωρίς εικόνα δεν υπάρχει τι να μετρηθεί. Η άδεια αφορά μόνο αυτή τη σελίδα και μπορείτε να την ανακαλέσετε αργότερα.',
  'measure.boot.cancel': 'Άκυρο',

  'measure.hold': 'Οι ενδείξεις είναι παγωμένες. Η κάμερα συνεχίζει να δουλεύει, αλλά τίποτα δεν καταλήγει στο ιστορικό ούτε στους μέσους όρους.',
  'measure.gridHint': 'Επιλέξτε ένα πλακίδιο για να μεταφέρετε αυτό το μέγεθος στον μεγάλο δείκτη.',

  'measure.stop': 'Διακοπή',
  'measure.pause': 'Παύση',
  'measure.resume': 'Συνέχεια',
  'measure.flip.aria': 'Εναλλαγή κάμερας',
  'measure.flip.toBack': 'Εναλλαγή στην πίσω κάμερα',
  'measure.flip.toFront': 'Εναλλαγή στην μπροστινή κάμερα',

  'measure.fail.aria': 'Σφάλμα κάμερας',
  'measure.fail.headline': 'Η κάμερα δεν ξεκίνησε',
  'measure.fail.retry': 'Δοκιμάστε ξανά',
  'measure.fail.back': 'Πίσω',
  'measure.fail.savedSession': 'Η συνεδρία πριν από τη διακοπή ({duration}) αποθηκεύτηκε στο ιστορικό.',
  'measure.error.fallback': 'Η κάμερα δεν μπόρεσε να ξεκινήσει.',

  'measure.summary.aria': 'Σύνοψη συνεδρίας',
  'measure.summary.title': 'Σύνοψη συνεδρίας',
  'measure.summary.paused': 'σε παύση για {duration}',
  'measure.summary.nothingMeasured': 'Κανένα μέγεθος δεν συγκέντρωσε μέτρηση — η κάμερα δεν είδε φως σε όλη τη συνεδρία.',
  'measure.summary.note': 'Οι μέσοι όροι μετρούν μόνο τα δείγματα εκτός παύσης. Τα μεγέθη που δεν μετρήθηκαν παραλείπονται, δεν λογίζονται ως μηδέν.',
  'measure.summary.nearThreshold': 'Πιο κοντά σε κατώφλι',
  'measure.summary.worstPoint': 'Ασθενέστερο σημείο',
  'measure.summary.averageZone': 'κατά μέσο όρο {zone}',
  'measure.summary.tooShort': 'Η συνεδρία κράτησε {duration} — πολύ λίγο για να μπει μόνη της στο ιστορικό. Μπορείτε να την αποθηκεύσετε χειροκίνητα.',
  'measure.summary.again': 'Νέα μέτρηση',
  'measure.summary.save': 'Αποθήκευση στο ιστορικό',
  'measure.summary.saved': 'Αποθηκεύτηκε στο ιστορικό',
  'measure.summary.savedToast': 'Η συνεδρία αποθηκεύτηκε στο ιστορικό.',
  'measure.summary.close': 'Κλείσιμο',

  'measure.method.title': 'Πώς το μετράμε',
  'measure.method.p1': 'Η εφαρμογή παίρνει δείγματα από την εικόνα της κάμερας δέκα φορές το δευτερόλεπτο και υπολογίζει τα μεγέθη από το μεσαίο {percent}% του καρέ — το στόχαστρο στην προεπισκόπηση σημειώνει ακριβώς αυτή την περιοχή.',
  'measure.method.p2': 'Η κάμερα του τηλεφώνου έχει τρία πλατιά κανάλια και δική της, αυτόματη ρύθμιση έκθεσης και ισορροπίας λευκού. Βλέπει τις αναλογίες του φωτός, όχι το φάσμα του.',
  'measure.method.p3': 'Το ποσοστό μπλε, η φωτεινότητα, το τρεμόσβημα και η ομοιομορφία είναι αυτά που πραγματικά μετρά η κάμερα. Η θερμοκρασία χρώματος και η κιρκάδια επίδραση είναι δηλωμένες προσεγγίσεις, υπολογισμένες από τα βασικά χρώματα του sRGB.',
  'measure.method.p4': 'Το τρεμόσβημα φαίνεται μόνο κάτω από τα τέσσερα χερτς. Το τρεμόσβημα του ηλεκτρικού δικτύου στα 100 Hz βρίσκεται πολύ πέρα από την εμβέλεια αυτής της δειγματοληψίας και δεν θα δοθεί ποτέ ως ένδειξη.',
  'measure.method.p5': 'Κανένας από αυτούς τους αριθμούς δεν είναι φωτομετρική μέτρηση ούτε ιατρικό αποτέλεσμα. Η εικόνα της κάμερας δεν φεύγει από τη συσκευή.',
  'measure.method.ok': 'Κατάλαβα',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'Η εκκίνηση της κάμερας ακυρώθηκε.',
  'measure.announce.stoppedNoSamples': 'Η μέτρηση σταμάτησε. Δεν συλλέχθηκε κανένα δείγμα.',
  'measure.announce.stopped': 'Η μέτρηση σταμάτησε. Η σύνοψη της συνεδρίας είναι έτοιμη.',
  'measure.announce.interrupted': 'Η μέτρηση διακόπηκε. Η σύνοψη της συνεδρίας είναι έτοιμη.',
  'measure.announce.paused': 'Η μέτρηση είναι σε παύση. Οι ενδείξεις πάγωσαν.',
  'measure.announce.resumed': 'Η μέτρηση συνεχίστηκε.',
  'measure.announce.switchedFront': 'Έγινε εναλλαγή στην μπροστινή κάμερα. Ξεκινά νέα συνεδρία.',
  'measure.announce.switchedBack': 'Έγινε εναλλαγή στην πίσω κάμερα. Ξεκινά νέα συνεδρία.',
  'measure.announce.lead': 'Κύριο μέγεθος: {metric}.',
  'measure.announce.cameraError': 'Σφάλμα κάμερας. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'Το φως έμεινε στο ασφαλές εύρος σε όλη τη συνεδρία — αφήστε τη λάμπα όπως είναι και ελέγξτε ξανά μετά το σούρουπο, όταν δουλεύει άλλη πηγή.',
  'measure.advice.share.evening': 'Το ποσοστό μπλε ήταν κατά μέσο όρο {value} — ενεργοποιήστε τη νυχτερινή λειτουργία στις οθόνες και σβήστε το φως της οροφής, αφήνοντας μία ζεστή λάμπα στο ύψος του γραφείου.',
  'measure.advice.share.day': 'Το ποσοστό μπλε ήταν κατά μέσο όρο {value} — μέσα στην ημέρα είναι αποδεκτό, αλλά ρυθμίστε την οθόνη να περνά αυτόματα σε ζεστή λειτουργία δύο ώρες πριν από τον ύπνο.',
  'measure.advice.brightness': 'Το καρέ ήταν υπερφωτισμένο (κατά μέσο όρο {value}) — απομακρυνθείτε από την πηγή φωτός ή χαμηλώστε τη φωτεινότητα της οθόνης που μετράτε, γιατί με τέτοια έκθεση χάνουν σε ακρίβεια και τα υπόλοιπα μεγέθη.',
  'measure.advice.kelvin.evening': 'Η θερμοκρασία χρώματος κρατήθηκε κατά μέσο όρο στα {value} — μετά το σούρουπο κατεβείτε κάτω από 3000 K: αλλάξτε τη λάμπα σε ζεστή λειτουργία ή βάλτε λαμπτήρα 2700 K.',
  'measure.advice.kelvin.day': 'Η θερμοκρασία χρώματος κρατήθηκε κατά μέσο όρο στα {value} — για την ημέρα είναι ένα καλό, τονωτικό λευκό, αλλά το βράδυ ρυθμίστε την ίδια λάμπα στα 2700 K.',
  'measure.advice.melanopic.evening': 'Η κιρκάδια επίδραση ήταν κατά μέσο όρο {value} — τις δύο ώρες πριν από τον ύπνο κατεβείτε κάτω από 0,50 ×, χαμηλώνοντας το κύριο φως και φωτίζοντας από το ύψος του γραφείου αντί από την οροφή.',
  'measure.advice.melanopic.day': 'Η κιρκάδια επίδραση ήταν κατά μέσο όρο {value} — αυτή την ώρα τέτοια δόση βοηθά, αλλά το βράδυ αντικαταστήστε αυτή την πηγή με μια πιο αδύναμη και πιο ζεστή.',
  'measure.advice.flicker': 'Το τρεμόσβημα έφτασε κατά μέσο όρο {value} — συνήθως φταίει ένας ροοστάτης ή ένας πολύ χαμηλά ρυθμισμένος οπίσθιος φωτισμός: ανεβάστε τη φωτεινότητα της οθόνης πάνω από 40% ή αλλάξτε τον ροοστάτη με έναν χωρίς διαμόρφωση PWM.',
  'measure.advice.uniformity': 'Το φως έπεφτε άνισα (κατά μέσο όρο {value}) — βάλτε τη λάμπα στο πλάι του πάγκου και προσθέστε μια δεύτερη, πιο αδύναμη πηγή από την αντίθετη πλευρά, αντί για ένα δυνατό σημείο.',
  'measure.advice.comfort': 'Η οπτική άνεση βγήκε κατά μέσο όρο {value} — ξεκινήστε με μία αλλαγή: χαμηλώστε στο μισό την κύρια πηγή και μόνο μετά ασχοληθείτε με το χρώμα του φωτός.',
  'measure.advice.default': 'Αλλάξτε ένα πράγμα στον φωτισμό σας και μετρήστε ξανά — η σύγκριση δύο συνεδριών λέει περισσότερα από μία μεμονωμένη ένδειξη.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'Ιστορικό',
  'history.action.export': 'Εξαγωγή ιστορικού',

  'history.metricGroup.aria': 'Επιλογή μεγέθους',
  'history.announce.metric': 'Μέγεθος: {metric}',
  'history.rangeGroup.aria': 'Χρονικό εύρος',
  'history.range.aria': 'Τελευταίο διάστημα: {range}',

  'history.stats.title': 'Στατιστικά εύρους',
  'history.stats.head': '{metric}\u00A0—\u00A0τελευταίο διάστημα {range}',
  'history.stats.note': 'Υπολογίζονται από όσα δείχνει το γράφημα. Ο χρόνος χωρίς μέτρηση δεν προσμετράται — δεν βάζουμε μηδέν στη θέση του.',
  'history.stat.min': 'Ελάχιστο',
  'history.stat.avg': 'Μέσος όρος',
  'history.stat.max': 'Μέγιστο',
  'history.trend.up': 'ανεβαίνει σε αυτό το εύρος',
  'history.trend.flat': 'χωρίς σαφή μεταβολή',
  'history.trend.down': 'κατεβαίνει σε αυτό το εύρος',
  'history.trend.none': 'δεν υπάρχει τίποτα για σύγκριση',

  'history.sessions.title': 'Συνεδρίες μέτρησης',
  'history.sessions.count': '{sessions}, από την πιο πρόσφατη',
  'history.sessions.empty': 'Καμία συνεδρία ακόμη',
  'history.sessions.hint': 'Η συνεδρία αποθηκεύεται μόλις σταματήσετε τη μέτρηση.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'εύρος: {range}',
  'history.session.noMeasure': 'καμία μέτρηση',

  'history.data.title': 'Δεδομένα',
  'history.data.subtitle': 'Το ιστορικό είναι αποθηκευμένο μόνο σε αυτή τη συσκευή.',
  'history.export.csv': 'Εξαγωγή CSV',
  'history.export.json': 'Εξαγωγή JSON',
  'history.export.ok': 'Το αρχείο είναι έτοιμο για αποθήκευση',
  'history.export.fail': 'Το αρχείο δεν μπόρεσε να ετοιμαστεί. Σε ιδιωτική περιήγηση και σε παράθυρο ενσωματωμένο σε άλλη εφαρμογή, το πρόγραμμα περιήγησης μπλοκάρει την αποθήκευση — ανοίξτε τη σελίδα σε κανονική καρτέλα.',
  'history.export.sheet.title': 'Εξαγωγή ιστορικού',
  'history.export.sheet.text': 'Το CSV ανοίγει σε υπολογιστικό φύλλο (διαχωριστικό «;», κόμμα ως υποδιαστολή). Το JSON κρατά τα πάντα, μαζί με τη λίστα των συνεδριών και τα κενά όπου δεν μετρήθηκε τίποτα.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Καθαρισμός ιστορικού',
  'history.clear.title': 'Να καθαριστεί το ιστορικό;',
  'history.clear.text': 'Θα διαγραφούν {points} και {sessions}. Αυτό δεν αναιρείται — αν θέλετε να κρατήσετε τα δεδομένα, κάντε πρώτα εξαγωγή.',
  'history.clear.confirm': 'Καθαρισμός',
  'history.clear.announce': 'Το ιστορικό καθαρίστηκε.',
  'history.clear.toast': 'Το ιστορικό καθαρίστηκε',

  'history.empty.title': 'Δεν υπάρχει ακόμη κάτι να δείξουμε',
  'history.empty.text': 'Το ιστορικό γεμίζει καθώς μετράτε — ένα σημείο ανά δευτερόλεπτο. Όλα μένουν σε αυτή τη συσκευή.',
  'history.empty.action': 'Μετάβαση στη μέτρηση',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 λ.',
  'range.5m': '5 λ.',
  'range.1h': '1 ώ.',
  'range.24h': '24 ώ.',
  'range.7d': '7 ημ.',
  'range.30d': '30 ημ.',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Ημερομηνία και ώρα',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'Ο αποθηκευτικός χώρος της συσκευής είναι γεμάτος — οι νέες μετρήσεις δεν αποθηκεύονται πλέον.',
  'storage.blocked': 'Το πρόγραμμα περιήγησης δεν επιτρέπει την αποθήκευση του ιστορικού — τα δεδομένα θα χαθούν μόλις κλείσετε την καρτέλα.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Εργαλεία',
  'tools.action.about': 'Σχετικά με τη μέτρηση',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Γλώσσα',
  'tools.language.subtitle': 'Από προεπιλογή η εφαρμογή ακολουθεί τη γλώσσα της συσκευής· η επιλογή από αυτή τη λίστα ισχύει αμέσως και μένει σε αυτό το πρόγραμμα περιήγησης.',
  'tools.language.aria': 'Γλώσσα διεπαφής',
  'tools.language.system': 'Αυτόματα',
  'tools.language.announce': 'Γλώσσα διεπαφής: {language}.',

  'tools.appearance.title': 'Εμφάνιση',
  'tools.appearance.theme.title': 'Θέμα',
  'tools.appearance.theme.desc': 'Το «Αυτόματα» ακολουθεί τη ρύθμιση του συστήματος.',
  'tools.appearance.theme.aria': 'Θέμα',
  'tools.theme.system': 'Αυτόματα',
  'tools.theme.light': 'Φωτεινό',
  'tools.theme.dark': 'Σκούρο',
  'tools.appearance.accent.title': 'Χρώμα τονισμού',
  'tools.appearance.accent.desc': 'Το χρώμα των κουμπιών, των επιλογών και των ρυθμιστικών.',
  'tools.appearance.accent.aria': 'Χρώμα τονισμού',
  'tools.appearance.textScale.title': 'Μέγεθος κειμένου',
  'tools.appearance.textScale.desc': 'Μεγεθύνει όλη τη διεπαφή, όχι μόνο τις ετικέτες.',
  'tools.appearance.textScale.aria': 'Μέγεθος κειμένου',
  'tools.appearance.density.title': 'Πυκνότητα',
  'tools.appearance.density.desc': 'Η συμπαγής χωράει περισσότερο περιεχόμενο σε μία οθόνη.',
  'tools.appearance.density.aria': 'Πυκνότητα διάταξης',
  'tools.density.comfortable': 'Άνετη',
  'tools.density.compact': 'Συμπαγής',
  'tools.appearance.motion.title': 'Λιγότερη κίνηση',
  'tools.appearance.motion.desc': 'Απενεργοποιεί τα εφέ κίνησης και την ομαλή μετακίνηση της βελόνας. Ανεξάρτητα από αυτό, σεβόμαστε τη ρύθμιση του συστήματος.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Ωκεανός',
  'accent.violet': 'Βιολετί',
  'accent.amber': 'Κεχριμπάρι',
  'accent.mint': 'Μέντα',
  'accent.rose': 'Τριανταφυλλί',

  'tools.thresholds.title': 'Κατώφλια',
  'tools.thresholds.subtitle': 'Από ποια τιμή και πάνω η εφαρμογή θα λέει «μέτριο» και από ποια «κακό». Τα προεπιλεγμένα κατώφλια είναι δική μας πρόταση, όχι πρότυπο — ρυθμίστε τα όπως σας ταιριάζει.',
  'tools.thresholds.warn': 'Κατώφλι προειδοποίησης',
  'tools.thresholds.crit': 'Κατώφλι συναγερμού',
  'tools.thresholds.warn.aria': 'Κατώφλι προειδοποίησης — {metric}',
  'tools.thresholds.crit.aria': 'Κατώφλι συναγερμού — {metric}',
  'tools.thresholds.reset': 'Προεπιλογές',
  'tools.thresholds.reset.aria': 'Επαναφορά προεπιλεγμένων κατωφλιών: {metric}',
  'tools.thresholds.moved': 'Το {threshold} μετακινήθηκε στο {value}.',
  'tools.thresholds.resetAll': 'Επαναφορά όλων των κατωφλιών',
  'tools.thresholds.resetAll.title': 'Επαναφορά των προεπιλεγμένων κατωφλιών;',
  'tools.thresholds.resetAll.text': 'Και τα επτά μεγέθη θα επιστρέψουν στα κατώφλια που προτείνει η εφαρμογή. Το ιστορικό μετρήσεων μένει ανέπαφο.',
  'tools.thresholds.resetAll.confirm': 'Επαναφορά',
  'tools.thresholds.resetAll.cancel': 'Να μείνουν',
  'tools.thresholds.resetAll.toast': 'Τα κατώφλια επανήλθαν στις προεπιλογές',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'πάνω από {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} και κάτω',
  'tools.zoneRange.goodBelow': 'κάτω από {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} και πάνω',

  'tools.calibration.title': 'Βαθμονόμηση',
  'tools.calibration.subtitle': 'Για όσους έχουν κάτι να συγκρίνουν.',
  'tools.calibration.intro': 'Δύο τηλέφωνα στραμμένα στην ίδια λάμπα θα δείξουν ελαφρώς διαφορετικούς αριθμούς — κάθε αισθητήρας έχει τη δική του χροιά. Αν έχετε πρόχειρη μια μέτρηση που εμπιστεύεστε, μπορείτε εδώ να ανεβάσετε ή να κατεβάσετε ελαφρά τα επιμέρους κανάλια της εικόνας. Οι πολλαπλασιαστές δρουν πριν υπολογιστεί οτιδήποτε, οπότε αλλάζουν και τα επτά μεγέθη μαζί.',
  'tools.calibration.neutral': 'Δεν έχετε κάτι για σύγκριση; Αφήστε το στο 1,00 — είναι η εργοστασιακή ρύθμιση και δεν χαλάει τίποτα.',
  'tools.calibration.forward': 'Η αλλαγή ισχύει από τώρα και στο εξής. Οι μετρήσεις που είναι ήδη αποθηκευμένες στο ιστορικό μένουν όπως ήταν τη στιγμή της αποθήκευσης — δεν τις επανυπολογίζουμε, γιατί αυτό θα άλλαζε δεδομένα εκ των υστέρων.',
  'tools.calibration.reset': 'Μηδενισμός βαθμονόμησης',
  'tools.calibration.reset.toast': 'Η βαθμονόμηση μηδενίστηκε',
  'tools.calibration.channel.r': 'Κόκκινο κανάλι',
  'tools.calibration.channel.g': 'Πράσινο κανάλι',
  'tools.calibration.channel.b': 'Μπλε κανάλι',
  'tools.calibration.channel.aria': '{channel} — πολλαπλασιαστής βαθμονόμησης',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'Μέτρηση',
  'tools.measurement.wake.title': 'Να μένει αναμμένη η οθόνη',
  'tools.measurement.wake.desc': 'Κατά τη μέτρηση η οθόνη μένει αναμμένη. Η μπαταρία τότε αδειάζει πιο γρήγορα.',
  'tools.measurement.wake.unsupported': 'Αυτό το πρόγραμμα περιήγησης δεν μας επιτρέπει να κρατήσουμε την οθόνη αναμμένη.',
  'tools.measurement.haptics.title': 'Δόνηση',
  'tools.measurement.haptics.desc': 'Σύντομη επιβεβαίωση στην έναρξη, στη διακοπή και στην αλλαγή μεγέθους.',
  'tools.measurement.haptics.unsupported': 'Αυτή η συσκευή δεν δηλώνει μοτέρ δόνησης.',

  'tools.about.title': 'Σχετικά με τη μέτρηση',
  'tools.about.subtitle': 'Τι ακριβώς υπολογίζει καθένα από τα επτά μεγέθη και πού σταματά η αξιοπιστία αυτής της μεθόδου.',
  'tools.about.scale': 'Κλίμακα: από {min} έως {max}.',
  'tools.about.threshold': 'Προειδοποιούμε από {warn} και σημαίνουμε συναγερμό από {crit}.',
  'tools.about.thresholdInvert': 'Προειδοποιούμε κάτω από {warn} και σημαίνουμε συναγερμό κάτω από {crit}.',
  'tools.about.limitsHead': 'Τι δεν μπορεί να κάνει αυτή η μέτρηση',
  'tools.about.limit.spectrum.title': 'Η κάμερα δεν βλέπει τα χρώματα όπως ένα όργανο μέτρησης',
  'tools.about.limit.spectrum.text': 'Η κάμερα του τηλεφώνου έχει τρία κανάλια: κόκκινο, πράσινο και μπλε. Ένα όργανο μέτρησης φωτός τα αναλύει σε δεκάδες στενές ζώνες. Αυτό που βλέπετε εδώ προκύπτει από αυτούς τους τρεις αριθμούς — με λογικό τρόπο, αλλά παραμένει υπολογισμός, όχι μετρημένο φάσμα.',
  'tools.about.limit.exposure.title': 'Η κάμερα ρυθμίζει μόνη της τη φωτεινότητα',
  'tools.about.limit.exposure.text': 'Όταν στρέψετε το τηλέφωνο σε ένα παράθυρο, η κάμερα σκουραίνει την εικόνα για να μην την υπερφωτίσει. Η «φωτεινότητα σκηνής» τότε πέφτει, παρόλο που στο δωμάτιο δεν άλλαξε τίποτα. Γι’ αυτό συγκρίνετε αυτή την τιμή μέσα στην ίδια λήψη, όχι ανάμεσα σε δωμάτια.',
  'tools.about.limit.flicker.title': 'Μια αργή κάμερα δεν πιάνει το γρήγορο τρεμόσβημα',
  'tools.about.limit.flicker.text': 'Ελέγχουμε την εικόνα {hz} φορές το δευτερόλεπτο. Ένας παλμός γρηγορότερος από {nyquist} φορές το δευτερόλεπτο μπορεί σε μια τέτοια μέτρηση να εμφανιστεί πιο αργός απ’ ό,τι είναι στην πραγματικότητα ή να εξαφανιστεί εντελώς — και το τρεμόσβημα του ηλεκτρικού δικτύου είναι ακριβώς τέτοιο. Αν η εφαρμογή πιάσει κάτι, δείτε το ως ένδειξη ότι «κάτι πάλλεται εδώ» και όχι ως μετρημένη συχνότητα.',
  'tools.about.limit.medical.title': 'Αυτό δεν είναι ιατρική εξέταση ούτε ιατρική συμβουλή',
  'tools.about.limit.medical.text': 'Η εφαρμογή βοηθά να παρατηρήσετε ότι το φως γύρω σας είναι ψυχρό, έντονο ή ανήσυχο, και προτείνει τι μπορεί να γίνει γι’ αυτό. Δεν αποφαίνεται για την υγεία σας και δεν αντικαθιστά τη συζήτηση με γιατρό ούτε τη μέτρηση με επαγγελματικό όργανο.',
  'tools.about.privacy': 'Όλα υπολογίζονται στη συσκευή σας. Η εικόνα της κάμερας δεν στέλνεται και δεν αποθηκεύεται πουθενά — στη μνήμη καταλήγουν μόνο οι υπολογισμένοι αριθμοί.',
  'tools.about.privacyPolicy': 'Πλήρης πολιτική απορρήτου',

  'tools.data.title': 'Δεδομένα',
  'tools.data.subtitle': 'Όλα βρίσκονται στη μνήμη αυτού του προγράμματος περιήγησης και δεν φεύγουν από εδώ πουθενά.',
  'tools.data.summary.empty': 'Δεν υπάρχουν ακόμη αποθηκευμένες μετρήσεις.',
  'tools.data.summary': 'Στη μνήμη: {points} και {sessions}.',
  'tools.data.export.csv': 'Εξαγωγή CSV',
  'tools.data.export.json': 'Εξαγωγή JSON',
  'tools.data.clear': 'Καθαρισμός ιστορικού',
  'tools.data.reset': 'Προεπιλεγμένες ρυθμίσεις',
  'tools.data.reset.title': 'Επαναφορά των προεπιλεγμένων ρυθμίσεων;',
  'tools.data.reset.text': 'Η εμφάνιση, τα κατώφλια, η βαθμονόμηση και οι ρυθμίσεις μέτρησης θα επιστρέψουν στην αρχική τους κατάσταση. Το ιστορικό μετρήσεων μένει ανέπαφο.',
  'tools.data.reset.confirm': 'Επαναφορά',
  'tools.data.reset.toast': 'Έγινε επαναφορά των προεπιλεγμένων ρυθμίσεων',
  'tools.data.wipe': 'Διαγραφή όλων των δεδομένων',
  'tools.data.wipe.title': 'Να διαγραφούν όλα τα δεδομένα της εφαρμογής;',
  'tools.data.wipe.text': 'Θα χαθούν: όλο το ιστορικό μετρήσεων και η λίστα των συνεδριών, τα κατώφλια και η βαθμονόμησή σας, καθώς και οι ρυθμίσεις εμφάνισης. Η εφαρμογή θα επιστρέψει στην κατάσταση της πρώτης εκκίνησης.',
  'tools.data.wipe.note': 'Δεν έχουμε αντίγραφο αυτών των δεδομένων — δεν έφυγαν ποτέ από αυτή τη συσκευή, οπότε δεν υπάρχει από πού να επαναφερθούν.',
  'tools.data.wipe.check': 'Καταλαβαίνω ότι αυτό δεν αναιρείται',
  'tools.data.wipe.confirm': 'Διαγραφή όλων',
  'tools.data.wipe.toast': 'Διαγράφηκαν όλα τα δεδομένα της εφαρμογής',
  'tools.data.wipe.announce': 'Διαγράφηκαν όλα τα δεδομένα της εφαρμογής. Οι ρυθμίσεις επανήλθαν στις προεπιλογές.',
  'tools.data.storage.blocked': 'Αυτό το πρόγραμμα περιήγησης δεν επιτρέπει τη μόνιμη αποθήκευση (ιδιωτική περιήγηση ή αποκλεισμένα δεδομένα ιστότοπων). Ό,τι ρυθμίσετε εδώ θα χαθεί μόλις κλείσετε την καρτέλα.',
  'tools.data.storage.full': 'Η μνήμη του προγράμματος περιήγησης γέμισε και οι νέες μετρήσεις δεν αποθηκεύονται πλέον. Ο καθαρισμός του ιστορικού θα ελευθερώσει χώρο.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Υποστήριξη',
  'support.free.title': 'Όλα είναι διαθέσιμα',
  'support.free.lead': 'Και τα επτά μεγέθη, το πλήρες ιστορικό, τα κατώφλια, η βαθμονόμηση και η εξαγωγή λειτουργούν από την πρώτη εκκίνηση — χωρίς λογαριασμό, χωρίς όρια και χωρίς χρέωση.',
  'support.free.note': 'Η μέτρηση υπολογίζεται εξ ολοκλήρου σε αυτή τη συσκευή και λειτουργεί χωρίς δίκτυο. Δεν υπάρχει εδώ κάποια καλύτερη έκδοση κρυμμένη πίσω από τοίχο.',
  'support.why.title': 'Γιατί το ζητάω',
  'support.why.lead': 'Το Μόνιτορ Φωτός φτιάχνεται εκτός ωραρίου, χωρίς διαφημίσεις, χωρίς χορηγό και χωρίς εταιρεία από πίσω. Η υποστήριξη καλύπτει τον χρόνο για διορθώσεις, για νέα μεγέθη και για τη συντήρηση όσων ήδη λειτουργούν.',
  'support.what.title': 'Τι σας δίνει η δωρεά',
  'support.what.lead': 'Τίποτα. Η δωρεά δεν ξεκλειδώνει τίποτα — καμία επιπλέον λειτουργία, κανένα σήμα δίπλα στο όνομά σας, καμία προτεραιότητα. Ό,τι μπορεί να κάνει η εφαρμογή, το έχετε ήδη.',
  'support.what.note': 'Μένει μόνο ότι ξέρω πως φάνηκε χρήσιμο σε κάποιον. Αυτός είναι πραγματικά αρκετός λόγος.',
  'support.cta.title': 'Αν θέλετε να βοηθήσετε',
  'support.cta.button': 'Κεράστε με έναν καφέ',
  'support.cta.nolink': 'Το προφίλ δωρεών δεν έχει συνδεθεί ακόμη. Όταν συνδεθεί, στη θέση αυτή θα σταθεί ένα κουμπί.',
  'support.cta.privacy': 'Αυτός ο σύνδεσμος ανοίγει την εξωτερική σελίδα του Buy Me a Coffee σε νέα καρτέλα. Είναι η μόνη στιγμή που κάτι φεύγει από αυτή τη συσκευή — η ίδια η μέτρηση μένει πάντα εδώ.',
  'support.cta.privacyFuture': 'Όταν εμφανιστεί η διεύθυνση, το κουμπί θα ανοίγει την εξωτερική σελίδα του Buy Me a Coffee σε νέα καρτέλα. Θα είναι η μόνη στιγμή που κάτι φεύγει από αυτή τη συσκευή — η ίδια η μέτρηση μένει πάντα εδώ.',
  'support.cta.note': 'Δεν υπάρχει εδώ ούτε αντίστροφη μέτρηση, ούτε υπενθυμίσεις, ούτε παράθυρο που ανοίγει μόνο του. Αυτό το αίτημα περιμένει μόνο σε αυτή την καρτέλα.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'τελευταίο λεπτό',
  'gauge.aria': '{metric}: {value}, ζώνη: {zone}',
  'gauge.aria.note': '{metric}: {value}, ζώνη: {zone}, {note}',
  'gauge.aria.initial': '{metric}: χωρίς δεδομένα',
  'gauge.value.none': 'χωρίς δεδομένα',
  /* Odczyt słowny z jednostką: „27 τοις εκατό”, „1,20 φορές”. Osobny wzorzec,
     bo w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'κατά προσέγγιση τιμή',
  'gauge.note.offScale': 'εκτός κλίμακας',
  'gauge.metric.unknown': 'Άγνωστο μέγεθος',

  'chart.aria.label': 'Γράφημα του ιστορικού μετρήσεων',
  'chart.hint': 'Διαδραστικό γράφημα. Τα βέλη αριστερά και δεξιά μετακινούν τον δρομέα ανάγνωσης, τα Home και End πηγαίνουν στην αρχή και στο τέλος του εύρους, το Escape κρύβει τον δρομέα.',
  'chart.empty.title': 'Χωρίς δεδομένα',
  'chart.empty.text': 'Ξεκινήστε μια μέτρηση — το γράφημα θα εμφανιστεί μετά τις πρώτες ενδείξεις.',
  'chart.few.title': 'Πολύ λίγα δεδομένα',
  'chart.few.text': 'Έχουμε μία ένδειξη: {value}. Η γραμμή θέλει δύο.',
  'chart.legend.line': 'μέτρηση',
  'chart.legend.gap': 'κενό στη μέτρηση',
  'chart.aria.head': 'Γράφημα: {metric}, εύρος {range}',
  'chart.aria.empty': 'Χωρίς δεδομένα σε αυτό το εύρος.',
  'chart.aria.one': 'Μία ένδειξη: {value}.',
  'chart.aria.summary': 'Από {min} έως {max}, μέσος όρος {avg}, {points}.',
  'chart.aria.gaps': 'Η σειρά έχει κενά — τότε δεν μετρούσαμε.',
  'chart.readout.empty': 'Χωρίς δεδομένα σε αυτό το εύρος.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'Πολύ λίγα δεδομένα για να σχεδιαστεί γράφημα.',
  'chart.readout.hint': 'Σύρετε πάνω στο γράφημα ή χρησιμοποιήστε τα βέλη για να διαβάσετε μία μεμονωμένη μέτρηση.',
  'chart.time.now': 'τώρα',
  'chart.time.justNow': 'μόλις τώρα',
  'chart.time.ago': 'πριν από {duration}',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd zegar dwunastogodzinny z „π.μ.”, bo tak
     greckie ustawienia regionalne formatują godzinę. */
  'chart.sample.ago': '\u221230\u00A0λ.',
  'chart.sample.clock': '12:00 π.μ.',
  'chart.sample.date': '30\u00A0Αυγ',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'Ποσοστό μπλε',
  'metric.share.short': 'Πόσο από το φως που βλέπουμε αναλογεί στο μπλε κανάλι.',
  'metric.share.help': 'Απομονώνει το χρώμα από τη φωτεινότητα — αυτή είναι η τιμή που αλλάζει όταν ενεργοποιείτε τη νυχτερινή λειτουργία.',
  'metric.brightness.name': 'Φωτεινότητα σκηνής',
  'metric.brightness.short': 'Η μέση φωτεινότητα της εικόνας της κάμερας.',
  'metric.brightness.help': 'Σχετική τιμή, όχι λουξ — η αυτόματη έκθεση της κάμερας τη μετατοπίζει από κάτω.',
  'metric.kelvin.name': 'Θερμοκρασία χρώματος',
  'metric.kelvin.short': 'Αν το φως είναι ζεστό ή ψυχρό.',
  'metric.kelvin.help': 'Κάτω από 3000 K το φως είναι ζεστό και πιο ήπιο το βράδυ. Τα 6500 K είναι το προεπιλεγμένο λευκό των περισσότερων οθονών.',
  'metric.melanopic.name': 'Κιρκάδια επίδραση',
  'metric.melanopic.short': 'Πόσο έντονα δρα αυτό το φως στο βιολογικό ρολόι.',
  'metric.melanopic.help': 'Προσέγγιση του μελανοπικού συντελεστή. Το 1,00 είναι ουδέτερο λευκό ημέρας· το βράδυ αξίζει να κατεβαίνετε κάτω από 0,50.',
  'metric.flicker.name': 'Τρεμόσβημα',
  'metric.flicker.short': 'Αόρατος παλμός της πηγής φωτός.',
  'metric.flicker.help': 'Οι φθηνοί ροοστάτες και οι οπίσθιοι φωτισμοί πάλλονται. Το μάτι δεν το βλέπει, αλλά αναφέρεται ως πιθανή αιτία κόπωσης και πονοκεφάλου.',
  'metric.uniformity.name': 'Ομοιομορφία',
  'metric.uniformity.short': 'Αν το φως απλώνεται ομοιόμορφα μέσα στο καρέ.',
  'metric.uniformity.help': 'Χαμηλή τιμή σε οθόνη σημαίνει διαρροή του οπίσθιου φωτισμού ή αντανάκλαση· στο γραφείο — κακοτοποθετημένη λάμπα.',
  'metric.comfort.name': 'Οπτική άνεση',
  'metric.comfort.short': 'Μία βαθμολογία αντί για έξι αριθμούς.',
  'metric.comfort.help': 'Συνθέτει τις υπόλοιπες μετρήσεις σε βαθμολογία από 0 έως 100 και δείχνει τι τη ρίχνει περισσότερο. Οι συντελεστές βαρύτητας είναι δική μας συντακτική κρίση, όχι πρότυπο.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'καλό',
  'zone.warn': 'μέτριο',
  'zone.crit': 'κακό',
  'zone.none': 'χωρίς δεδομένα',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 Αυγ'). */
  'date.month.short.1': 'Ιαν',
  'date.month.short.2': 'Φεβ',
  'date.month.short.3': 'Μαρ',
  'date.month.short.4': 'Απρ',
  'date.month.short.5': 'Μαΐ',
  'date.month.short.6': 'Ιουν',
  'date.month.short.7': 'Ιουλ',
  'date.month.short.8': 'Αυγ',
  'date.month.short.9': 'Σεπ',
  'date.month.short.10': 'Οκτ',
  'date.month.short.11': 'Νοε',
  'date.month.short.12': 'Δεκ',

  'date.clock': '{hours}:{minutes}',
  'date.short': '{day}\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0{year}',
  'date.dateTime': '{date}, {time}',

  /* Czas trwania. Sekundy tylko poniżej dziesięciu minut — dalej są szumem,
     a wydłużają napis stojący obok wyniku. Skróty jednostek jak w CLDR dla
     greki: ώ. (godzina), λ. (minuta), δευτ. (sekunda). */
  'time.duration.dayHour': '{days} {hours}\u00A0ώ.',
  'time.duration.hourMinute': '{hours}\u00A0ώ. {minutes}\u00A0λ.',
  'time.duration.hour': '{hours}\u00A0ώ.',
  'time.duration.minuteSecond': '{minutes}\u00A0λ. {seconds}\u00A0δευτ.',
  'time.duration.minute': '{minutes}\u00A0λ.',
  'time.duration.second': '{seconds}\u00A0δευτ.',

  /* Ile czasu temu. Progi dobrane tak, żeby nigdy nie zaokrąglić w dół do zera:
     dopóki różnica jest mniejsza niż minuta, mówimy „μόλις τώρα”. */
  'time.justNow': 'μόλις τώρα',
  'time.aMinuteAgo': 'πριν από ένα λεπτό',
  'time.minutesAgo': 'πριν από {minutes}\u00A0λ.',
  'time.hoursAgo': 'πριν από {hours}\u00A0ώ.',
  'time.yesterday': 'χθες',
  'time.daysAgo': 'πριν από {days}\u00A0ημέρες',

  /* Formy zależne od liczby. Grecki ma w CLDR dwie: `one` i `other`.
     Rozstrzyga je Intl.PluralRules dla języka aktywnego. */
  'time.days.plural': { one: 'ημέρα', other: 'ημέρες' },
  'unit.sample.plural': { one: 'δείγμα', other: 'δείγματα' },
  'unit.measurement.plural': { one: 'μέτρηση', other: 'μετρήσεις' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Grecki ma dla „συνεδρία” obie formy równe — oba klucze zostają (kształt
     słownika jest wspólny dla wszystkich języków), a wartości są tu identyczne. */
  'unit.session.plural': { one: 'συνεδρία', other: 'συνεδρίες' },
  'unit.session.accusative.plural': { one: 'συνεδρία', other: 'συνεδρίες' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to po grecku dwa
     różne słowa: σημείο dla danych, βαθμός dla oceny. */
  'unit.chartPoint.plural': { one: 'σημείο', other: 'σημεία' },
  'unit.point.plural': { one: 'βαθμός', other: 'βαθμοί' },
  /* Κέλβιν jest w greckim nieodmienne: „1 κέλβιν”, „3000 κέλβιν”. */
  'unit.kelvin.plural': { one: 'κέλβιν', other: 'κέλβιν' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „τοις εκατό”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'τοις εκατό',
  'unit.spoken.times': 'φορές',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'Δεν δόθηκε άδεια πρόσβασης στην κάμερα. Επιτρέψτε την κάμερα για αυτή τη σελίδα στις ρυθμίσεις του προγράμματος περιήγησης ή του συστήματος και δοκιμάστε ξανά.',
  'camera.error.notfound': 'Δεν βρέθηκε κάμερα. Ελέγξτε αν η συσκευή έχει κάμερα και αν δεν είναι απενεργοποιημένη στο σύστημα.',
  'camera.error.inuse': 'Η κάμερα χρησιμοποιείται από άλλη εφαρμογή. Κλείστε εκείνη την εφαρμογή ή την καρτέλα και δοκιμάστε ξανά.',
  'camera.error.insecure': 'Η κάμερα λειτουργεί μόνο μέσω HTTPS ή σε localhost. Ανοίξτε αυτή τη σελίδα σε διεύθυνση που ξεκινά με «https://».',
  'camera.error.unsupported': 'Αυτό το πρόγραμμα περιήγησης δεν προσφέρει εδώ την κάμερα. Δοκιμάστε σε Chrome ή Safari, σε κανονικό παράθυρο — όχι σε προεπισκόπηση ενσωματωμένη σε άλλη εφαρμογή.',
  'camera.error.unknown': 'Η κάμερα δεν μπόρεσε να ξεκινήσει.'
};
