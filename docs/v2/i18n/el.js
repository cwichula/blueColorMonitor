/* docs/v2/i18n/el.js — słownik WERSJI 2, grecki.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/el.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: to samo, co w pl.js tego katalogu — układ TEJ wersji: pięć
 * zakładek, dziewięć ekranów nakładkowych, siedem narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej. Zestaw kluczy jest identyczny
 * z pl.js — pilnuje tego docs/shared/i18n/keys.test.js.
 *
 * TERMINOLOGIA: przepisana z docs/shared/i18n/el.js, bez wyjątków —
 * ποσοστό μπλε, φωτεινότητα σκηνής, θερμοκρασία χρώματος, κιρκάδια επίδραση
 * (μελανοπικός συντελεστής w opisie), τρεμόσβημα, ομοιομορφία, οπτική άνεση.
 * Klucze *.nameLower to te same nazwy małą literą — grecki nie pisze
 * rzeczownika pospolitego w środku zdania wielką literą.
 * Dalsze stałe odpowiedniki: μέγεθος (metryka, mierzona wielkość), ένδειξη
 * (odczyt), μέτρηση (pomiar), συνεδρία (sesja), δείγμα (próbka), ιστορικό
 * (historia), κατώφλι (próg), προφίλ (profil), βαθμονόμηση (kalibracja),
 * άρθρωμα (moduł — «μονάδα» zajęte przez jednostkę miary z klucza 'help.unit').
 * Skróty czasu jak w warstwie wspólnej: ώ., λεπ., δευτ.
 *
 * REJESTR: druga osoba liczby pojedynczej («πάτησε», «στρέψε», «κράτησε»),
 * dokładnie tak jak docs/shared/i18n/el.js — ten plik dopisuje się do tamtego
 * i w jednym zdaniu nie mogą stać dwa różne tryby zwracania się do człowieka.
 * Wersja 5 mówi grzecznym pluralis i nazywa aplikację «Μόνιτορ Φωτός»; tutaj
 * obowiązuje warstwa wspólna wersji 2 z «Παρακολούθηση Φωτός». Cudzysłowy
 * greckie « », ułamek przecinkiem (0,50), pytajnik to greckie ; (U+003B).
 * Nazwa przycisku w cudzysłowie brzmi tak samo jak sam przycisk: «Έναρξη»,
 * «Βαθμονόμηση».
 *
 * LICZEBNIKI: grecki ma dwie kategorie CLDR (one, other) — dokładnie te,
 * których żąda Intl.PluralRules('el').
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (te same co w pl.js i z tego samego powodu):
 *   'zone.warning'        — wspólne mówi «Προσοχή», ta wersja mówi
 *                           «Προειδοποίηση» (i «Προειδοποιήσεις» w liczniku);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi o pomiarach
 *                           w liczbie mnogiej («Οι μετρήσεις»).
 */
window.I18nData = window.I18nData || {};
window.I18nData['el'] = Object.assign(window.I18nData['el'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Παρακολούθηση Φωτός — μέτρηση του μπλε φωτός',
  'app.description': 'Παρακολούθηση Φωτός — μέτρηση του ποσοστού μπλε στο φως με την κάμερα του τηλεφώνου. Επτά μεγέθη, γράφημα, ιστορικό. Όλα διαθέσιμα, χωρίς λογαριασμό και χωρίς χρέωση.',
  'app.skipToContent': 'Μετάβαση στο περιεχόμενο',
  'app.measuring': 'Μέτρηση σε εξέλιξη',
  'app.docsButton': 'Τεκμηρίωση και επεξηγήσεις',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — έκδοση 2',

  'nav.aria': 'Κύρια πλοήγηση',
  'nav.tablistAria': 'Οθόνες της εφαρμογής',
  'nav.measure': 'Μέτρηση',
  'nav.history': 'Ιστορικό',
  'nav.tools': 'Εργαλεία',
  'nav.support': 'Υποστήριξη',
  'nav.more': 'Περισσότερα',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Τεκμηρίωση',
  'panel.thresholds': 'Κατώφλια και προφίλ',
  'panel.reports': 'Αναφορές',
  'panel.export': 'Εξαγωγή δεδομένων',
  'panel.compare': 'Σύγκριση A/B',
  'panel.calibration': 'Βαθμονόμηση με λευκό χαρτί',
  'panel.screenCheck': 'Έλεγχος της οθόνης μου',
  'panel.schedule': 'Πρόγραμμα',
  'panel.alerts': 'Ειδοποιήσεις έκθεσης',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Πίσω',
  'action.close': 'Κλείσιμο',
  'action.refresh': 'Ανανέωση',
  'action.apply': 'Εφαρμογή',
  'action.delete': 'Διαγραφή',
  'action.hide': 'Απόκρυψη',
  'action.start': 'Έναρξη',
  'action.stop': 'Διακοπή',
  'action.switch': 'Εναλλαγή',
  'action.switchAria': 'Εναλλαγή κάμερας: μπροστινή ή πίσω',
  'action.resetDefaults': 'Επαναφορά προεπιλογών',
  'action.reports': 'Αναφορές',
  'action.exportCsv': 'Εξαγωγή CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Οθόνη: {name}',
  'a11y.measureStarted': 'Η μέτρηση ξεκίνησε.',
  'a11y.measureStopped': 'Η μέτρηση σταμάτησε.',
  'a11y.measureStoppedSummary': 'Η μέτρηση σταμάτησε. Χρόνος: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'Το προφίλ κατωφλιών εφαρμόστηκε.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Επιβεβαίωση',
  'dialog.confirm': 'Επιβεβαιώνω',
  'dialog.cancel': 'Άκυρο',
  'dialog.infoTitle': 'Πληροφορία',
  'dialog.ok': 'Κατάλαβα',

  'help.sheetTitle': 'Περιγραφή του μεγέθους',
  'help.unit': 'Μονάδα',
  'help.scaleRange': 'Εύρος κλίμακας',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'Προειδοποίηση',
  'threshold.crit': 'Κρίσιμο',
  'threshold.warnLabel': 'Κατώφλι προειδοποίησης',
  'threshold.critLabel': 'Κρίσιμο κατώφλι',
  'threshold.warnAria': '{name} — κατώφλι: προειδοποίηση',
  'threshold.critAria': '{name} — κατώφλι: κρίσιμο',

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

  'firstRun.title': 'Πώς να μετρήσεις',
  'firstRun.text': 'Πάτησε «Έναρξη», στρέψε το τηλέφωνο σε μια φωτισμένη επιφάνεια και κράτησέ το ακίνητο για λίγα δευτερόλεπτα. Το πλαίσιο στην προεπισκόπηση δείχνει το κομμάτι που διαβάζει πραγματικά η εφαρμογή.',
  'firstRun.close': 'Κλείσιμο της υπόδειξης',

  'camera.live': 'ΖΩΝΤΑΝΑ',
  'camera.idle': 'Η κάμερα είναι κλειστή. Πάτησε «Έναρξη», στρέψε το τηλέφωνο σε μια φωτισμένη επιφάνεια και κράτησέ το ακίνητο για λίγα δευτερόλεπτα.',
  'camera.stopped': 'Η μέτρηση σταμάτησε. Πάτησε «Έναρξη» για να μετρήσεις ξανά.',

  'error.cameraStart': 'Δεν ήταν δυνατή η ενεργοποίηση της κάμερας.',
  'error.engineMissing': 'Το άρθρωμα μέτρησης δεν φορτώθηκε.',

  'metrics.sevenTitle': 'Επτά μεγέθη',
  'measure.tilesSub': 'Ανανέωση 5 φορές το δευτερόλεπτο',

  'session.title': 'Αυτή η συνεδρία',
  'session.duration': 'Χρόνος μέτρησης',
  'session.samples': 'Πλήθος δειγμάτων',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     «Προειδοποιήσεις» to nie to samo słowo co «Προειδοποίηση» pod suwakiem. */
  'zone.count.good': 'Εντός ορίων',
  'zone.count.warning': 'Προειδοποιήσεις',
  'zone.count.critical': 'Κρίσιμα',

  'note.calibrated': 'Μέτρηση βαθμονομημένη με λευκό χαρτί — τα κανάλια εξισώθηκαν.',

  'tile.helpAria': 'Τι σημαίνει: {name}',
  'tile.noMeasurement': 'Χωρίς μέτρηση',
  'tile.outOfScale': 'Εκτός κλίμακας',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Προειδοποίηση',
  'zone.spoken.warning': 'προειδοποίηση',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Εξέλιξη στον χρόνο',
  'history.pickHint': 'Διάλεξε μέγεθος και εύρος',
  'history.metricLabel': 'Μέγεθος',
  'history.rangeAria': 'Χρονικό εύρος του γραφήματος',
  'history.emptyTitle': 'Χωρίς δεδομένα σε αυτό το εύρος',
  'history.emptyText': 'Ξεκίνησε μια μέτρηση στην οθόνη Μέτρηση — το γράφημα γεμίζει σε λίγα δευτερόλεπτα.',
  'history.tableTitle': 'Τελευταίες ενδείξεις',
  'history.tableHide': 'Απόκρυψη του πίνακα',
  'history.tableShow': 'Εμφάνιση του πίνακα',
  'history.tableCaption': 'Οι τελευταίες ενδείξεις της μέτρησης, η πιο πρόσφατη επάνω.',
  'history.tableEmpty': 'Καμία ένδειξη. Ξεκίνησε μια μέτρηση στην οθόνη Μέτρηση.',

  'table.time': 'Ώρα',
  'table.metric': 'Μέγεθος',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Te same skróty
     co w warstwie wspólnej: ώ., λεπ. — plus ημ. dla dni. */
  'range.1m': '1 λεπ.',
  'range.1h': '1 ώ.',
  'range.24h': '24 ώ.',
  'range.7d': '7 ημ.',
  'range.30d': '30 ημ.',

  'chart.now': 'τώρα',
  'chart.countSub': {
    one: '{n} ένδειξη στο επιλεγμένο εύρος',
    other: '{n} ενδείξεις στο επιλεγμένο εύρος'
  },
  'chart.aria': '{name}, εύρος {range}, {count}, τελευταία τιμή {value} {unit}.',
  'chart.ariaZone': '{name}, εύρος {range}, {count}, τελευταία τιμή {value} {unit}, ζώνη: {zone}.',
  'chart.ariaEmpty': '{name} — χωρίς δεδομένα στο εύρος {range}.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Οδηγοί και βοηθητικές λειτουργίες',
  'tools.note': 'Τα εργαλεία βοηθούν να ερμηνεύσεις τη μέτρηση. Όλα είναι διαθέσιμα αμέσως, και η ίδια η μέτρηση λειτουργεί ανεξάρτητα από αυτά.',

  'tool.thresholds.sub': 'Πότε μια τιμή πρέπει να ανάβει προειδοποίηση',
  'tool.compare.sub': 'Ποιο από τα δύο φώτα είναι πιο ήπιο',
  'tool.calibration.sub': 'Η μόνη λειτουργία που ανεβάζει πραγματικά την ακρίβεια',
  'tool.screenCheck.sub': 'Πέντε βήματα και έτοιμο συμπέρασμα για την οθόνη',
  /* Wiersz listy nazywa się inaczej niż sam ekran: «Πρόγραμμα κατωφλιών»
     kontra «Πρόγραμμα». Tak było i tak zostaje. */
  'tool.schedule.title': 'Πρόγραμμα κατωφλιών',
  'tool.schedule.sub': 'Άλλα κατώφλια το βράδυ, χωρίς να το θυμάσαι',
  'tool.alerts.sub': 'Σήμα όταν η κρίσιμη ζώνη κρατά πολλή ώρα',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Ρυθμίσεις',
  'more.thresholdsSub': 'Πότε μια τιμή πρέπει να ανάβει προειδοποίηση',
  'more.docsSub': 'Πώς να μετράς και τι δεν λέει αυτή η μέτρηση',
  'more.appearanceTitle': 'Εμφάνιση και προσβασιμότητα',

  'settings.theme': 'Θέμα',
  'theme.auto': 'Όπως το σύστημα',
  'theme.light': 'Φωτεινό',
  'theme.dark': 'Σκούρο',

  'settings.textScale': 'Μέγεθος κειμένου',
  'textScale.100': 'Κανονικό',
  'textScale.115': 'Μεγαλύτερο (115%)',
  'textScale.130': 'Μέγιστο (130%)',

  'settings.contrast': 'Υψηλότερη αντίθεση',
  'settings.contrastSub': 'Πιο έντονα περιγράμματα και πιο σκούρο βοηθητικό κείμενο.',
  'settings.sound': 'Ήχος ειδοποιήσεων',
  'settings.soundSub': 'Σύντομο σήμα όταν ενεργοποιείται μια ειδοποίηση έκθεσης.',
  'settings.vibrate': 'Δόνηση στις ειδοποιήσεις',
  'settings.vibrateSub': 'Λειτουργεί μόνο σε συσκευές που την υποστηρίζουν.',

  'more.dataTitle': 'Δεδομένα',
  'more.clearHistory': 'Καθαρισμός του ιστορικού μετρήσεων',
  'more.clearHistorySub': 'Διαγράφει τις αποθηκευμένες ενδείξεις από αυτή τη συσκευή. Τα κατώφλια, τα προφίλ και οι ρυθμίσεις μένουν.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'Η εφαρμογή είναι εξ ολοκλήρου δωρεάν. ',
  'more.supportLink': 'Μπορείς να την υποστηρίξεις εθελοντικά.',

  'dialog.clearHistory.title': 'Να διαγραφεί το αποθηκευμένο ιστορικό;',
  'dialog.clearHistory.body': {
    one: 'Θα διαγράψουμε {n} αποθηκευμένο σημείο μέτρησης από αυτή τη συσκευή. Αυτή η ενέργεια δεν αναιρείται. Τα κατώφλια, τα προφίλ και οι ρυθμίσεις θα μείνουν ανέπαφα.',
    other: 'Θα διαγράψουμε {n} αποθηκευμένα σημεία μέτρησης από αυτή τη συσκευή. Αυτή η ενέργεια δεν αναιρείται. Τα κατώφλια, τα προφίλ και οι ρυθμίσεις θα μείνουν ανέπαφα.'
  },
  'dialog.clearHistory.confirm': 'Διαγραφή ιστορικού',
  'dialog.clearHistory.cancel': 'Να μείνει',

  'toast.historyCleared': 'Το ιστορικό μετρήσεων διαγράφηκε.',
  'toast.screenUnavailable': 'Αυτή η οθόνη δεν είναι ακόμη διαθέσιμη σε αυτή την έκδοση.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'Τι μετρά αυτή η εφαρμογή',
  'docs.leadText': 'Η κάμερα του τηλεφώνου κοιτάζει μια φωτισμένη επιφάνεια και η εφαρμογή υπολογίζει πέντε φορές το δευτερόλεπτο τους μέσους όρους των καναλιών R, G και B από το μεσαίο κομμάτι του καρέ. Από αυτούς τους τρεις αριθμούς προκύπτουν επτά μεγέθη.',
  'docs.limitsTitle': 'Τα όρια της μεθόδου',
  'docs.limitsText': 'Η κάμερα έχει τρία πλατιά χρωματικά κανάλια, αυτόματη έκθεση και αυτόματη ισορροπία λευκού. Δεν μετρά φάσμα και δεν γνωρίζει απόλυτες τιμές, οπότε η φωτεινότητα είναι σχετικός δείκτης και όχι lux. Η θερμοκρασία χρώματος και η κιρκάδια επίδραση είναι προσεγγίσεις υπολογισμένες από τα βασικά χρώματα sRGB. Η δειγματοληψία στα {rate} Hz βλέπει το τρεμόσβημα μόνο κάτω από {limit} Hz — το τρεμόσβημα του δικτύου στα 100 Hz είναι εκτός εμβέλειας και η εφαρμογή δεν θα το δώσει ποτέ ως αποτέλεσμα.',

  'note.howTo.repeat.title': 'Επανάλαβε τη μέτρηση',
  'note.howTo.repeat.text': 'Μια μεμονωμένη ένδειξη είναι στιγμιότυπο. Καμιά δεκαπενταριά δευτερόλεπτα μέτρησης δίνουν πιο αξιόπιστη εικόνα.',

  'docs.scale': 'Κλίμακα',
  'docs.direction': 'Κατεύθυνση',
  'docs.directionHigher': 'Ψηλότερα σημαίνει καλύτερα',
  'docs.directionLower': 'Χαμηλότερα σημαίνει πιο ήπιο',
  'docs.privacyTitle': 'Δεδομένα και ιδιωτικότητα',
  'docs.privacyText': 'Η εικόνα της κάμερας δεν στέλνεται και δεν αποθηκεύεται πουθενά — από κάθε καρέ μένουν μόνο τρεις αριθμοί. Οι μετρήσεις, τα κατώφλια και οι ρυθμίσεις βρίσκονται στη μνήμη του προγράμματος περιήγησης σε αυτή τη συσκευή. Η εφαρμογή δεν κάνει κανένα αίτημα στο δίκτυο και λειτουργεί εκτός σύνδεσης.',
  'docs.freeLine': 'Και τα επτά μεγέθη, το ιστορικό, το γράφημα, τα εργαλεία και η λειτουργία εκτός σύνδεσης δουλεύουν για όλους, χωρίς λογαριασμό και χωρίς χρέωση.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Όλα είναι διαθέσιμα',
  'support.heroText': 'Και τα επτά μεγέθη, το ιστορικό μετρήσεων, το γράφημα, όλα τα εργαλεία και η λειτουργία εκτός σύνδεσης δουλεύουν για όλους, από την πρώτη στιγμή. Χωρίς λογαριασμό, χωρίς όρια και χωρίς χρέωση.',
  'support.whyTitle': 'Γιατί το ζητάω',
  'support.whyText': '{app} φτιάχνεται εκτός ωραρίου και δεν κερδίζει από κανέναν: δεν έχει διαφημίσεις, δεν συλλέγει δεδομένα και δεν έχει τίποτα να πουλήσει. Η συντήρηση και η συνέχειά της — νέα μεγέθη, διορθώσεις, δοκιμές σε περισσότερα τηλέφωνα — κοστίζουν χρόνο. Αν η εφαρμογή σού φάνηκε χρήσιμη, μπορείς να βάλεις κι εσύ ένα χεράκι. Δεν είσαι υποχρεωμένος.',
  'support.whatTitle': 'Τι δίνει η δωρεά',
  'support.whatText': 'Τίποτα. Πραγματικά δεν ξεκλειδώνει τίποτα και δεν επιταχύνει τίποτα — η εφαρμογή δείχνει και λειτουργεί ακριβώς το ίδιο πριν και μετά. Δίνει μόνο αυτό: ότι ο δημιουργός ξέρει πως αυτή η δουλειά φάνηκε σε κάποιον χρήσιμη.',
  'support.button': 'Κέρασέ με έναν καφέ',
  'support.pendingTitle': 'Το προφίλ δεν έχει συνδεθεί ακόμη',
  'support.pendingText': 'Δεν υπάρχει ακόμη εδώ διεύθυνση στην οποία να σταλεί υποστήριξη. Θα εμφανιστεί σε αυτή τη θέση όταν είναι έτοιμη — μέχρι τότε όλα στην εφαρμογή λειτουργούν ακριβώς το ίδιο.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'Το κουμπί ανοίγει την εξωτερική σελίδα του Buy Me a Coffee σε νέα καρτέλα. Αυτή είναι η μοναδική στιγμή που κάτι φεύγει από αυτή τη συσκευή — και συμβαίνει μόνο αφού το πατήσεις. Οι μετρήσεις, το ιστορικό και οι ρυθμίσεις μένουν εδώ.',
  'privacy.externalPending': 'Όταν υπάρξει η διεύθυνση, το πάτημα του κουμπιού θα ανοίξει μια εξωτερική σελίδα σε νέα καρτέλα. Αυτή θα είναι η μοναδική στιγμή που κάτι φεύγει από αυτή τη συσκευή. Οι μετρήσεις, το ιστορικό και οι ρυθμίσεις μένουν εδώ.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (εφεδρεία στο ui-core.js)',
  'boot.need.metrics': 'καμία τιμή δεν θα υπολογιστεί',
  'boot.need.bus': 'τα αρθρώματα θα πάψουν να βλέπουν το ένα το άλλο',
  'boot.need.ui': 'δεν θα γίνεται εναλλαγή οθονών',
  'boot.need.engine': 'η κάμερα και η μέτρηση δεν θα ξεκινήσουν',
  'boot.need.support': 'η οθόνη Υποστήριξη θα είναι άδεια',
  'boot.need.tools': 'η καρτέλα Εργαλεία θα είναι άδεια',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'Δεν φορτώθηκαν τα αρθρώματα: {list}.',
  'boot.consoleHint': 'Έλεγξε τη σειρά και τις διαδρομές των <script> στο index.html.',
  'boot.incompleteTitle': 'Η εφαρμογή φορτώθηκε ελλιπώς',
  'boot.incompleteText': '{missing} Ανανέωσε τη σελίδα· αν αυτό δεν βοηθήσει, τα αρχεία στον διακομιστή είναι ελλιπή.',
  'boot.newVersion': 'Υπάρχει νέα έκδοση της εφαρμογής.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'Τι κάνουν τα κατώφλια. ',
  'thresholds.noteText': 'Το κατώφλι προειδοποίησης ανάβει την κίτρινη κατάσταση, το κρίσιμο την κόκκινη. Η αλλαγή ισχύει αμέσως — και στην ένδειξη που βρίσκεται ήδη στην οθόνη. Το δικό σου σύνολο κατωφλιών μπορείς να το αποθηκεύσεις με όνομα και να επιστρέφεις σε αυτό όποτε θέλεις.',
  'thresholds.profilesTitle': 'Προφίλ κατωφλιών',
  'thresholds.profilesSub': 'Τα τρία ενσωματωμένα και τα δικά σου',
  'thresholds.customName': 'Όνομα του δικού σου προφίλ',
  'thresholds.customPlaceholder': 'π.χ. Υπνοδωμάτιο το βράδυ',
  'thresholds.save': 'Αποθήκευση των τρεχόντων κατωφλιών',
  'thresholds.saveHelp': 'Αποθηκεύει ακριβώς τα κατώφλια που έχεις ρυθμίσει παραπάνω.',

  'profile.builtin.default.name': 'Προεπιλογή',
  'profile.builtin.default.desc': 'Τα κατώφλια από τον κατάλογο των μεγεθών — αφετηρία για κάθε μέτρηση.',
  'profile.builtin.evening.name': 'Βράδυ — ήπιο',
  'profile.builtin.evening.desc': 'Προειδοποιεί νωρίτερα για ψυχρό χρώμα και για κιρκάδια επίδραση.',
  'profile.builtin.work.name': 'Δουλειά στο γραφείο',
  'profile.builtin.work.desc': 'Επιτρέπει φωτεινό, ψυχρό φως ημέρας· προσέχει το τρεμόσβημα και την ομοιομορφία.',
  'profile.custom.desc': 'Δικό σου προφίλ, αποθηκευμένο {date}.',

  'toast.thresholdsReset': 'Επαναφέρθηκαν τα προεπιλεγμένα κατώφλια.',
  'toast.thresholdOrder': 'Το κατώφλι προειδοποίησης πρέπει να είναι χαμηλότερο από το κρίσιμο.',
  'toast.thresholdOrderInverted': 'Για αυτό το μέγεθος το κατώφλι προειδοποίησης πρέπει να είναι υψηλότερο από το κρίσιμο.',
  'toast.profileNameMissing': 'Δώσε όνομα στο προφίλ.',
  'toast.profileSaved': 'Το προφίλ «{name}» αποθηκεύτηκε.',
  'toast.profileApplied': 'Το προφίλ «{name}» εφαρμόστηκε.',
  'toast.profileApplyFailed': 'Δεν ήταν δυνατή η εφαρμογή αυτού του προφίλ.',
  'toast.profileRemoved': 'Το προφίλ διαγράφηκε.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'Σε τι χρησιμεύει το πρόγραμμα. ',
  'schedule.noteText': 'Το βράδυ έχουν νόημα άλλα κατώφλια από ό,τι το μεσημέρι. Ένας κανόνας «από–έως» αλλάζει μόνος του το προφίλ, ώστε να μη χρειάζεται να το θυμάσαι. Το πρόγραμμα δεν ξεκινά και δεν σταματά ποτέ τη μέτρηση.',
  'schedule.toggle': 'Ενεργοποίηση της αυτόματης εναλλαγής',
  'schedule.toggleSub': 'Ελέγχεται κάθε λεπτό με το ρολόι της συσκευής.',
  'schedule.emptyTitle': 'Κανένας κανόνας',
  'schedule.emptyText': 'Πρόσθεσε τον πρώτο κανόνα με το κουμπί παρακάτω.',
  'schedule.add': 'Προσθήκη κανόνα',
  'schedule.to': 'έως',
  'schedule.profile': 'Προφίλ',
  'schedule.fromAria': 'Κανόνας {n}: ώρα έναρξης',
  'schedule.toAria': 'Κανόνας {n}: ώρα λήξης',
  'toast.scheduleTimeFormat': 'Δώσε τις ώρες στη μορφή 22:00.',
  'toast.scheduleEnded': 'Το πρόγραμμα τελείωσε — επέστρεψαν τα προηγούμενα κατώφλια.',
  'toast.scheduleApplied': 'Το πρόγραμμα ενεργοποίησε το προφίλ «{name}».',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'Τι κάνει η ειδοποίηση. ',
  'alerts.noteText': 'Παρακολουθεί ένα μέγεθος και μιλά μόνο όταν αυτό κρατά την επιλεγμένη ζώνη αδιάκοπα για τον χρόνο που όρισες. Ποτέ δεν σταματά τη μέτρηση και δεν καλύπτει τα κουμπιά.',
  'alerts.toggle': 'Ενεργοποίηση των ειδοποιήσεων έκθεσης',
  'alerts.toggleSub': 'Λειτουργούν μόνο κατά τη διάρκεια μιας μέτρησης.',
  'alerts.metric': 'Μέγεθος υπό παρακολούθηση',
  'alerts.level': 'Από ποια ζώνη',
  'alerts.level.warning': 'Προειδοποίησης και πάνω',
  'alerts.level.critical': 'Μόνο κρίσιμης',
  'alerts.sustain': 'Μετά από πόσα δευτερόλεπτα αδιάκοπα',
  'alerts.sustainHelp': 'Οι πιο σύντομοι χρόνοι δίνουν περισσότερους ψευδείς συναγερμούς όταν μετακινείς το τηλέφωνο.',
  'alerts.sound': 'Σύντομο ηχητικό σήμα',
  'alerts.soundSub': 'Ο ήχος παράγεται τοπικά. Μπορείς να τον κλείσεις και συνολικά στην οθόνη Περισσότερα.',
  'alerts.barTitle': 'Ειδοποίηση έκθεσης',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} κρατά τη ζώνη προειδοποίησης εδώ και {seconds} δευτ. — τώρα {value} {unit}.',
  'alerts.message.critical': '{name} κρατά την κρίσιμη ζώνη εδώ και {seconds} δευτ. — τώρα {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'Πώς να συγκρίνεις. ',
  'compare.noteText': 'Ξεκίνησε τη μέτρηση, στρέψε την κάμερα στην πρώτη πηγή και αποθήκευσέ την ως A. Χωρίς να αλλάξεις απόσταση ή γωνία, άλλαξε φως και αποθήκευσε το B. Η σύγκριση έχει νόημα μόνο αν η σκηνή είναι η ίδια.',
  'compare.slotA': 'Φως A',
  'compare.slotB': 'Φως B',
  'compare.save': 'Αποθήκευση της τρέχουσας ένδειξης',
  'compare.savedAt': 'Αποθηκεύτηκε {date}, {time}',
  'compare.empty': 'Δεν έχει αποθηκευτεί τίποτα ακόμη.',
  'compare.verdictTitle': 'Αποτέλεσμα της σύγκρισης',
  'compare.verdictEmpty': 'Αποθήκευσε και τα δύο φώτα για να δεις ποιο είναι πιο ήπιο.',
  'compare.notEnough': 'Πολύ λίγα δεδομένα για να συγκριθούν αυτές οι δύο μετρήσεις.',
  'compare.tie': 'Οι δύο πηγές βγαίνουν πρακτικά ίδιες ({metric}: {a} και {b} {unit}). Η διαφορά χωράει μέσα στον θόρυβο της μέτρησης.',
  'compare.betterA': 'Πιο ήπιο είναι το φως A — {metric}: {better} {unit} έναντι {worse} {unit}.',
  'compare.betterB': 'Πιο ήπιο είναι το φως B — {metric}: {better} {unit} έναντι {worse} {unit}.',
  'compare.clear': 'Καθαρισμός της σύγκρισης',
  'toast.compareSavedA': 'Το φως A αποθηκεύτηκε.',
  'toast.compareSavedB': 'Το φως B αποθηκεύτηκε.',
  'toast.compareCleared': 'Η σύγκριση καθαρίστηκε.',
  'toast.measureFirst': 'Ξεκίνησε πρώτα μια μέτρηση στην οθόνη Μέτρηση.',

  /* Nazwa wielkości w środku zdania. Po grecku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. */
  'metric.share.nameLower': 'ποσοστό μπλε',
  'metric.brightness.nameLower': 'φωτεινότητα σκηνής',
  'metric.kelvin.nameLower': 'θερμοκρασία χρώματος',
  'metric.melanopic.nameLower': 'κιρκάδια επίδραση',
  'metric.flicker.nameLower': 'τρεμόσβημα',
  'metric.uniformity.nameLower': 'ομοιομορφία',
  'metric.comfort.nameLower': 'οπτική άνεση',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'Γιατί αυτό λειτουργεί. ',
  'calib.noteText': 'Ο αισθητήρας της κάμερας έχει σταθερή απόκλιση ανάμεσα στα κανάλια. Η μέτρηση ενός λευκού χαρτιού δείχνει πόσο μεγάλη είναι και επιτρέπει να αφαιρεθεί. Είναι η μόνη λειτουργία σε αυτή την εφαρμογή που ανεβάζει πραγματικά την ακρίβεια — και πάλι δεν μετατρέπει την κάμερα σε φασματόμετρο.',
  'calib.step1': 'Βάλε ένα λευκό χαρτί κάτω από το φως που μετράς',
  'calib.step2': 'Ξεκίνησε τη μέτρηση και γέμισε το καρέ με το χαρτί',
  'calib.step3': 'Πάτησε «Βαθμονόμηση» και μην κουνήσεις το τηλέφωνο για 3 δευτερόλεπτα',
  'calib.done': 'Βαθμονομήθηκε {date}, {time}.',
  'calib.none': 'Χωρίς βαθμονόμηση. Η μέτρηση λειτουργεί, αντιμετώπισε τις τιμές συγκριτικά.',
  'calib.gain': 'Ενίσχυση {channel}',
  'calib.gainsLabel': 'Ενισχύσεις των καναλιών',
  'calib.gainsUnset': 'μη ορισμένες',
  'calib.start': 'Βαθμονόμηση (3 δευτ.)',
  'calib.clear': 'Διαγραφή της βαθμονόμησης',
  'toast.calibCleared': 'Η βαθμονόμηση διαγράφηκε.',
  'calib.error.noEngine': 'Το άρθρωμα μέτρησης δεν είναι διαθέσιμο.',
  'calib.error.notRunning': 'Ξεκίνησε πρώτα τη μέτρηση και στρέψε την κάμερα σε ένα λευκό χαρτί.',
  'calib.error.busy': 'Η βαθμονόμηση βρίσκεται ήδη σε εξέλιξη.',
  'calib.error.tooFewSamples': 'Πολύ λίγα δείγματα. Έλεγξε αν η μέτρηση δουλεύει πραγματικά.',
  'calib.error.tooDark': 'Η εικόνα είναι πολύ σκοτεινή για βαθμονόμηση. Φώτισε καλύτερα το χαρτί και δοκίμασε ξανά.',
  'calib.error.tooSkewed': 'Η απόκλιση των καναλιών είναι πολύ μεγάλη για να γίνει δεκτή ως βαθμονόμηση. Χρησιμοποίησε λευκό χαρτί σε ομοιόμορφο φως.',
  'calib.ok': 'Βαθμονομήθηκε. Η θερμοκρασία χρώματος και η κιρκάδια επίδραση θα είναι τώρα πιο ακριβείς.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'Σε τι χρησιμεύει αυτό. ',
  'screencheck.noteText': 'Πέντε βήματα ελέγχουν μια οθόνη όπως την ελέγχει μια δοκιμή σε περιοδικό: λευκό σε δύο φωτεινότητες, ομοιομορφία του οπίσθιου φωτισμού και το αν η νυχτερινή λειτουργία του συστήματος αλλάζει πραγματικά κάτι. Ο οδηγός διαβάζει μια μέτρηση που ήδη τρέχει· δεν την ξεκινά ο ίδιος.',
  'screencheck.step.white100.title': 'Λευκό σε πλήρη φωτεινότητα',
  'screencheck.step.white100.hint': 'Άνοιξε μια λευκή σελίδα στην οθόνη, βάλε τη φωτεινότητα στο μέγιστο και γέμισε το καρέ με την οθόνη.',
  'screencheck.step.white20.title': 'Λευκό σε χαμηλή φωτεινότητα',
  'screencheck.step.white20.hint': 'Χαμήλωσε τη φωτεινότητα της οθόνης περίπου στο ένα πέμπτο και μην αλλάξεις το καρέ.',
  'screencheck.step.corners.title': 'Οι γωνίες της οθόνης',
  'screencheck.step.corners.hint': 'Γύρισε στην πλήρη φωτεινότητα και δείξε στην κάμερα ολόκληρη την οθόνη — ελέγχουμε την ομοιομορφία του οπίσθιου φωτισμού.',
  'screencheck.step.nightOff.title': 'Νυχτερινή λειτουργία κλειστή',
  'screencheck.step.nightOff.hint': 'Βεβαιώσου ότι το φίλτρο μπλε φωτός είναι απενεργοποιημένο.',
  'screencheck.step.nightOn.title': 'Νυχτερινή λειτουργία ανοιχτή',
  'screencheck.step.nightOn.hint': 'Ενεργοποίησε το φίλτρο μπλε φωτός στο σύστημα και επανάλαβε το ίδιο καρέ.',
  'screencheck.stepHeading': 'Βήμα {n} από {total}: {title}',
  'screencheck.idleTitle': 'Ο οδηγός δεν τρέχει',
  'screencheck.idleHint': 'Ξεκίνησε μια μέτρηση στην οθόνη Μέτρηση, μετά γύρισε εδώ και πάτησε «Έναρξη».',
  'screencheck.next': 'Αποθήκευση του βήματος και συνέχεια',
  'screencheck.cancel': 'Διακοπή',
  'screencheck.start': 'Έναρξη του οδηγού',
  'screencheck.clearResult': 'Καθαρισμός του αποτελέσματος',
  'screencheck.resultTitle': 'Αποτέλεσμα',
  'screencheck.resultEmpty': 'Δεν έχει αποθηκευτεί ακόμη κανένα βήμα.',
  'screencheck.resultPartial': 'Αποθηκεύτηκαν {done} από {total} βήματα. Τα συμπεράσματα θα εμφανιστούν όταν θα υπάρχει κάτι να συγκριθεί.',
  'screencheck.note.uniformityLow': 'Η ομοιομορφία του οπίσθιου φωτισμού είναι {value}% — φαίνονται σαφείς διαφορές φωτεινότητας μέσα στο καρέ.',
  'screencheck.note.uniformityOk': 'Ο οπίσθιος φωτισμός είναι ομοιόμορφος ({value}%).',
  'screencheck.note.nightWorks': 'Η νυχτερινή λειτουργία μειώνει το ποσοστό μπλε κατά {value} ποσοστιαίες μονάδες — δουλεύει.',
  'screencheck.note.nightWeak': 'Η νυχτερινή λειτουργία αλλάζει το ποσοστό μπλε μόνο κατά {value} ποσοστιαίες μονάδες. Αυτό είναι λιγότερο από ό,τι δίνει συνήθως ένα φίλτρο του συστήματος.',
  'screencheck.note.pwm': 'Στη χαμηλή φωτεινότητα το τρεμόσβημα ανεβαίνει από {from}% σε {to}% — τυπικό σύμπτωμα παλμικής ρύθμισης της φωτεινότητας (PWM).',
  'toast.screencheckDone': 'Ο οδηγός ολοκληρώθηκε. Το αποτέλεσμα είναι παρακάτω.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'Από πού βγαίνουν αυτοί οι αριθμοί. ',
  'reports.noteText': 'Η αναφορά υπολογίζεται από το ιστορικό που είναι αποθηκευμένο σε αυτή τη συσκευή — ένα σημείο ανά πέντε δευτερόλεπτα. Ο μηχανισμός το συγκεντρώνει από την πρώτη μέτρηση, οπότε η αναφορά είναι έτοιμη αμέσως.',
  'reports.rangeAria': 'Εύρος της αναφοράς',
  'reports.day': 'Το τελευταίο εικοσιτετράωρο',
  'reports.week': 'Οι τελευταίες 7 ημέρες',
  'reports.date': 'Αναφορά για την ημέρα {date}.',
  'report.headerDay': 'Ημέρα από {from} έως {to} — {count}.',
  'report.headerWeek': 'Εβδομάδα από {from} έως {to} — {count}.',
  'count.points': { one: '{n} σημείο', other: '{n} σημεία' },
  'count.samples': { one: '{n} δείγμα', other: '{n} δείγματα' },
  'report.emptyTitle': 'Χωρίς δεδομένα σε αυτή την περίοδο',
  'report.emptyText': 'Ξεκίνησε μια μέτρηση στην οθόνη Μέτρηση — το ιστορικό γράφεται μόνο του.',
  'report.colAvg': 'Μέσος όρος',
  'report.colMin': 'Ελάχιστο',
  'report.colMax': 'Μέγιστο',
  'report.zonesTitle': 'Κατανομή των ζωνών',
  'report.worstHour': 'Η χειρότερη ώρα της ημέρας',
  'report.worstHourNone': 'καμία ξεχωριστή',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'Τι να κάνεις με αυτό',
  'report.disclaimerTitle': 'Αυτό δεν είναι συμβουλή υγείας. ',
  'report.disclaimerText': 'Τα συμπεράσματα προκύπτουν αποκλειστικά από όσα είδε η κάμερα αυτού του τηλεφώνου. Η εφαρμογή δεν μετρά φάσμα, δεν γνωρίζει lux και δεν θέτει καμία διάγνωση.',

  'advice.melanopic': 'Η μέση κιρκάδια επίδραση ήταν {value}×. Το βράδυ αξίζει να κατεβείς κάτω από 0,50 — πιο απλά με μια πιο ζεστή λάμπα ή με τη νυχτερινή λειτουργία.',
  'advice.kelvin': 'Το φως ήταν ψυχρό (κατά μέσο όρο {value} K). Για δουλειά είναι άψογο· δύο ώρες πριν από τον ύπνο καλύτερα κάτω από 3000 K.',
  'advice.flicker': 'Εντοπίστηκε αισθητό τρεμόσβημα (κατά μέσο όρο {value}%). Συνήθως φταίει ένα φθηνό ρυθμιστικό έντασης ή το τροφοδοτικό του οπίσθιου φωτισμού.',
  'advice.uniformity': 'Το φως κατανέμεται ανομοιόμορφα ({value}%). Η μετακίνηση της λάμπας ή η αλλαγή της γωνίας συνήθως δίνει περισσότερα από την αντικατάσταση του λαμπτήρα.',
  'advice.worstHour': 'Η χειρότερη ώρα της ημέρας είναι η {hour}:00 — εκεί συγκεντρώνονται οι περισσότερες ενδείξεις εκτός ορίων.',
  'advice.none': 'Σε αυτή την περίοδο τίποτα δεν ξεπερνά τα όρια. Το πιο χρήσιμο τώρα θα ήταν να συγκρίνεις δύο πηγές φωτός στη σύγκριση A/B.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'Μορφή του αρχείου. ',
  'export.noteText': 'Ο χαρακτήρας «;» ως διαχωριστικό στηλών, το κόμμα ως υποδιαστολή, κωδικοποίηση UTF-8 με σήμανση BOM. Ένα τέτοιο αρχείο το ανοίγει το Excel με ελληνικές ρυθμίσεις χωρίς να χρειάζεται να ρυθμίσεις τίποτα.',
  'export.range': 'Εύρος των δεδομένων',
  'export.columns': 'Στήλες στο αρχείο',
  'export.chipFilled': ' — η στήλη συμπληρώνεται',
  'export.help': 'Το αρχείο περιέχει και τις επτά στήλες — ο μηχανισμός τις υπολογίζει από την πρώτη μέτρηση και όλες καταλήγουν στο αρχείο.',
  'export.run': 'Αποθήκευση του αρχείου CSV',
  'export.previewEmpty': 'Καμία ένδειξη σε αυτό το εύρος. Ξεκίνησε μια μέτρηση — το ιστορικό γράφεται μόνο του.',
  'csv.range.hour': 'Η τελευταία ώρα',
  'csv.range.day': 'Το τελευταίο εικοσιτετράωρο',
  'csv.range.week': 'Οι τελευταίες 7 ημέρες',
  'csv.range.month': 'Οι τελευταίες 30 ημέρες',
  'csv.colDate': 'Ημερομηνία',
  'csv.colTime': 'Ώρα',
  'csv.colZone': 'Ζώνη',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'Στο επιλεγμένο εύρος δεν υπάρχει καμία ένδειξη.',
  'toast.exportFailed': 'Αυτό το πρόγραμμα περιήγησης δεν επέτρεψε την αποθήκευση του αρχείου.',
  'toast.exportSaved': {
    one: 'Αποθηκεύτηκε το αρχείο {filename} ({n} γραμμή).',
    other: 'Αποθηκεύτηκε το αρχείο {filename} ({n} γραμμές).'
  },

  /* ==================================================================
     Czas trwania sesji
     ==================================================================
     Trzy warianty zamiast jednego sklejanego: w wielu językach skrót
     jednostki stoi przed liczbą, a nie po niej. Minuty i sekundy
     przychodzą jako napis z zerem wiodącym — dlatego nie są liczbą. */

  'duration.hm': '{h} ώ. {m} λεπ.',
  'duration.ms': '{m} λεπ. {s} δευτ.',
  'duration.s': '{s} δευτ.'
});
