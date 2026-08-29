/* docs/v2/i18n/fr.js — słownik WERSJI 2, francuski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/fr.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej.
 *
 * SKĄD TE ZDANIA: przekład z pl.js (treść) i z en.js (terminologia oraz
 * rejestr). To nie jest kalka żadnego z nich: zdania przełożono na naturalną
 * francuszczyznę, a bez zmian zostało to, co niesie znaczenie — liczby, progi,
 * jednostki, nazwy wstawek oraz, co do treści, zdania o prywatności. Tych
 * ostatnich nie wolno ani osłabiać, ani wzmacniać.
 *
 * REJESTR: „vous”, konsekwentnie, także w komunikatach błędów — jak w v5.
 * TYPOGRAFIA: apostrof typograficzny ’ (U+2019), cudzysłowy « … », przecinek
 * dziesiętny (0,50), spacja przed „:”, „?”, „%” i „×”. Spacja zwykła, a nie
 * nierozdzielająca — tak samo jak w docs/shared/i18n/fr.js.
 *
 * TERMINOLOGIA ZE SŁOWNIKA WSPÓLNEGO, trzymana bez wyjątków: part de bleu,
 * luminosité de la scène, température de couleur, impact circadien (w opisie:
 * mélanopique), papillotement, uniformité, confort visuel. Dalej, za v5:
 * grandeur (wielkość, metryka), relevé (odczyt), mesure (pomiar), seuil (próg),
 * étalonnage (kalibracja), échantillon (próbka), session (sesja).
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (i dlaczego):
 *   'zone.warning'        — wspólne mówi „Attention”, ta wersja od zawsze ma
 *                           tu osobne słowo: „Avertissement” (i
 *                           „Avertissements” w podsumowaniu);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi „Les mesures”,
 *                           a nie „la mesure”.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules — francuski ma one, many i other. Patrz nagłówek
 * docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['fr'] = Object.assign(window.I18nData['fr'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Moniteur de lumière — mesure de la lumière bleue',
  'app.description': 'Moniteur de lumière — mesure de la part de lumière bleue avec la caméra du téléphone. Sept grandeurs, un graphique, un historique. Tout est accessible, sans compte et sans frais.',
  'app.skipToContent': 'Aller au contenu',
  'app.measuring': 'Mesure en cours',
  'app.docsButton': 'Documentation et explications',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — version 2',

  'nav.aria': 'Navigation principale',
  'nav.tablistAria': 'Écrans de l’application',
  'nav.measure': 'Mesure',
  'nav.history': 'Historique',
  'nav.tools': 'Outils',
  'nav.support': 'Soutien',
  'nav.more': 'Plus',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Documentation',
  'panel.thresholds': 'Seuils et profils',
  'panel.reports': 'Rapports',
  'panel.export': 'Export des données',
  'panel.compare': 'Comparaison A/B',
  'panel.calibration': 'Étalonnage à la feuille blanche',
  'panel.screenCheck': 'Vérifier mon écran',
  'panel.schedule': 'Programmation',
  'panel.alerts': 'Alertes d’exposition',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Retour',
  'action.close': 'Fermer',
  'action.refresh': 'Actualiser',
  'action.apply': 'Appliquer',
  'action.delete': 'Supprimer',
  'action.hide': 'Masquer',
  'action.start': 'Start',
  'action.stop': 'Stop',
  'action.switch': 'Changer',
  'action.switchAria': 'Changer de caméra : avant ou arrière',
  'action.resetDefaults': 'Rétablir les valeurs par défaut',
  'action.reports': 'Rapports',
  'action.exportCsv': 'Export CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Écran : {name}',
  'a11y.measureStarted': 'Mesure démarrée.',
  'a11y.measureStopped': 'Mesure arrêtée.',
  'a11y.measureStoppedSummary': 'Mesure arrêtée. Durée : {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name} : {zone}, {value} {unit}',
  'a11y.profileApplied': 'Profil de seuils appliqué.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Confirmation',
  'dialog.confirm': 'Confirmer',
  'dialog.cancel': 'Annuler',
  'dialog.infoTitle': 'Information',
  'dialog.ok': 'J’ai compris',

  'help.sheetTitle': 'Description de la grandeur',
  'help.unit': 'Unité',
  'help.scaleRange': 'Plage de l’échelle',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'Avertissement',
  'threshold.crit': 'Critique',
  'threshold.warnLabel': 'Seuil d’avertissement',
  'threshold.critLabel': 'Seuil critique',
  'threshold.warnAria': '{name} — seuil : avertissement',
  'threshold.critAria': '{name} — seuil : critique',

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

  'firstRun.title': 'Comment mesurer',
  'firstRun.text': 'Appuyez sur « Start », pointez le téléphone vers une surface éclairée et gardez-le immobile quelques secondes. Le cadre sur l’aperçu montre la partie que l’application lit réellement.',
  'firstRun.close': 'Fermer l’astuce',

  'camera.live': 'EN DIRECT',
  'camera.idle': 'La caméra est éteinte. Appuyez sur « Start », pointez le téléphone vers une surface éclairée et gardez-le immobile quelques secondes.',
  'camera.stopped': 'Mesure arrêtée. Appuyez sur « Start » pour mesurer de nouveau.',

  'error.cameraStart': 'Impossible de démarrer la caméra.',
  'error.engineMissing': 'Le module de mesure n’a pas été chargé.',

  'metrics.sevenTitle': 'Sept grandeurs',
  'measure.tilesSub': 'Actualisé 5 fois par seconde',

  'session.title': 'Cette session',
  'session.duration': 'Durée de la mesure',
  'session.samples': 'Nombre d’échantillons',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     „Avertissements” to nie to samo słowo co „Attention” z warstwy wspólnej. */
  'zone.count.good': 'Dans la norme',
  'zone.count.warning': 'Avertissements',
  'zone.count.critical': 'Critiques',

  'note.calibrated': 'Mesure étalonnée à la feuille blanche — les canaux sont égalisés.',

  'tile.helpAria': 'Ce que cela signifie : {name}',
  'tile.noMeasurement': 'Aucune mesure',
  'tile.outOfScale': 'Hors échelle',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Avertissement',
  'zone.spoken.warning': 'avertissement',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Évolution dans le temps',
  'history.pickHint': 'Choisissez une grandeur et une plage',
  'history.metricLabel': 'Grandeur',
  'history.rangeAria': 'Plage de temps du graphique',
  'history.emptyTitle': 'Aucune donnée dans cette plage',
  'history.emptyText': 'Lancez une mesure sur l’écran Mesure — le graphique se remplit en quelques secondes.',
  'history.tableTitle': 'Derniers relevés',
  'history.tableHide': 'Masquer le tableau',
  'history.tableShow': 'Afficher le tableau',
  'history.tableCaption': 'Les derniers relevés de mesure, le plus récent en haut.',
  'history.tableEmpty': 'Aucun relevé. Lancez une mesure sur l’écran Mesure.',

  'table.time': 'Heure',
  'table.metric': 'Grandeur',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     dłuższy zapis łamał się na dwie linie. */
  'range.1m': '1 min',
  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 jours',
  'range.30d': '30 jours',

  'chart.now': 'maintenant',
  'chart.countSub': {
    one: '{n} relevé dans la plage choisie',
    many: '{n} de relevés dans la plage choisie',
    other: '{n} relevés dans la plage choisie'
  },
  'chart.aria': '{name}, plage {range}, {count}, dernière valeur {value} {unit}.',
  'chart.ariaZone': '{name}, plage {range}, {count}, dernière valeur {value} {unit}, zone : {zone}.',
  'chart.ariaEmpty': '{name} — aucune donnée dans la plage {range}.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Assistants et fonctions d’appoint',
  'tools.note': 'Les outils aident à interpréter une mesure. Tous sont accessibles tout de suite, et la mesure elle-même fonctionne indépendamment d’eux.',

  'tool.thresholds.sub': 'Quand une valeur doit déclencher un avertissement',
  'tool.compare.sub': 'Laquelle des deux lumières est la plus douce',
  'tool.calibration.sub': 'La seule fonction qui améliore vraiment la précision',
  'tool.screenCheck.sub': 'Cinq étapes et un verdict tout prêt sur votre écran',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Programmation des seuils”
     kontra „Programmation”. Tak było i tak zostaje. */
  'tool.schedule.title': 'Programmation des seuils',
  'tool.schedule.sub': 'D’autres seuils le soir, sans avoir à y penser',
  'tool.alerts.sub': 'Un signal quand la zone critique dure trop longtemps',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Réglages',
  'more.thresholdsSub': 'Quand une valeur doit déclencher un avertissement',
  'more.docsSub': 'Comment mesurer et ce que cette mesure ne dit pas',
  'more.appearanceTitle': 'Apparence et accessibilité',

  'settings.theme': 'Thème',
  'theme.auto': 'Comme le système',
  'theme.light': 'Clair',
  'theme.dark': 'Sombre',

  'settings.textScale': 'Taille du texte',
  'textScale.100': 'Standard',
  'textScale.115': 'Plus grand (115 %)',
  'textScale.130': 'Le plus grand (130 %)',

  'settings.contrast': 'Contraste renforcé',
  'settings.contrastSub': 'Des bordures plus marquées et un texte secondaire plus sombre.',
  'settings.sound': 'Son des alertes',
  'settings.soundSub': 'Un court signal quand une alerte d’exposition se déclenche.',
  'settings.vibrate': 'Vibration lors des alertes',
  'settings.vibrateSub': 'Ne fonctionne que sur les appareils qui la prennent en charge.',

  'more.dataTitle': 'Données',
  'more.clearHistory': 'Effacer l’historique des mesures',
  'more.clearHistorySub': 'Supprime les relevés enregistrés sur cet appareil. Les seuils, les profils et les réglages restent.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'L’application est entièrement gratuite. ',
  'more.supportLink': 'Vous pouvez la soutenir librement.',

  'dialog.clearHistory.title': 'Supprimer l’historique enregistré ?',
  'dialog.clearHistory.body': {
    one: 'Nous supprimerons {n} point de mesure enregistré sur cet appareil. Cette opération est irréversible. Les seuils, les profils et les réglages resteront intacts.',
    many: 'Nous supprimerons {n} de points de mesure enregistrés sur cet appareil. Cette opération est irréversible. Les seuils, les profils et les réglages resteront intacts.',
    other: 'Nous supprimerons {n} points de mesure enregistrés sur cet appareil. Cette opération est irréversible. Les seuils, les profils et les réglages resteront intacts.'
  },
  'dialog.clearHistory.confirm': 'Supprimer l’historique',
  'dialog.clearHistory.cancel': 'Garder',

  'toast.historyCleared': 'Historique des mesures supprimé.',
  'toast.screenUnavailable': 'Cet écran n’est pas encore disponible dans cette version.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'Ce que cette application mesure',
  'docs.leadText': 'La caméra du téléphone regarde une surface éclairée et, cinq fois par seconde, l’application calcule la moyenne des canaux R, G et B de la partie centrale du cadre. De ces trois nombres elle tire sept grandeurs.',
  'docs.limitsTitle': 'Les limites de la méthode',
  'docs.limitsText': 'Un appareil photo a trois canaux de couleur larges, une exposition automatique et une balance des blancs automatique. Il ne mesure pas de spectre et ne connaît aucune valeur absolue : la luminosité est donc un indicateur relatif, et non des lux. La température de couleur et l’impact circadien sont des approximations calculées à partir des primaires sRGB. Un échantillonnage à {rate} Hz ne voit le papillotement qu’en dessous de {limit} Hz — le papillotement du secteur à 100 Hz est hors de portée et l’application ne le donnera jamais comme résultat.',

  'note.howTo.repeat.title': 'Répétez la mesure',
  'note.howTo.repeat.text': 'Un relevé isolé est un instantané. Une dizaine de secondes de mesure donne une image plus fiable.',

  'docs.scale': 'Échelle',
  'docs.direction': 'Sens',
  'docs.directionHigher': 'Plus haut, c’est mieux',
  'docs.directionLower': 'Plus bas, c’est plus doux',
  'docs.privacyTitle': 'Données et vie privée',
  'docs.privacyText': 'L’image de la caméra n’est envoyée ni enregistrée nulle part — de chaque image ne restent que trois nombres. Les mesures, les seuils et les réglages se trouvent dans la mémoire du navigateur, sur cet appareil. L’application n’effectue aucune requête réseau et fonctionne hors connexion.',
  'docs.freeLine': 'Les sept grandeurs, l’historique, le graphique, les outils et le mode hors connexion fonctionnent pour tout le monde, sans compte et sans frais.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Tout est accessible',
  'support.heroText': 'Les sept grandeurs, l’historique des mesures, le graphique, tous les outils et le mode hors connexion fonctionnent pour tout le monde, tout de suite. Sans compte, sans limite et sans frais.',
  'support.whyTitle': 'Pourquoi je le demande',
  'support.whyText': '{app} se construit après les heures de travail et ne gagne d’argent sur personne : pas de publicité, aucune collecte de données, rien à vendre. L’entretien et la suite — de nouvelles grandeurs, des corrections, des tests sur d’autres téléphones — coûtent du temps. Si l’application vous a été utile, vous pouvez participer. Vous n’y êtes pas obligé.',
  'support.whatTitle': 'Ce qu’apporte un don',
  'support.whatText': 'Rien. Vraiment, il ne débloque rien et n’accélère rien — l’application a exactement la même allure et le même fonctionnement avant et après. Il apporte seulement ceci : l’auteur sait que ce travail a servi à quelqu’un.',
  'support.button': 'Offrez-moi un café',
  'support.pendingTitle': 'Le profil n’est pas encore connecté',
  'support.pendingText': 'Il n’y a pas encore ici d’adresse à laquelle envoyer un soutien. Elle apparaîtra à cet endroit quand elle sera prête — d’ici là, tout dans l’application fonctionne exactement pareil.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'Le bouton ouvre la page externe Buy Me a Coffee dans un nouvel onglet. C’est le seul moment où quelque chose quitte cet appareil — et cela n’arrive qu’après votre clic. Les mesures, l’historique et les réglages restent ici.',
  'privacy.externalPending': 'Quand l’adresse sera en place, un clic ouvrira une page externe dans un nouvel onglet. Ce sera le seul moment où quelque chose quitte cet appareil. Les mesures, l’historique et les réglages restent ici.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (secours dans ui-core.js)',
  'boot.need.metrics': 'aucune valeur ne sera calculée',
  'boot.need.bus': 'les modules cesseront de se voir',
  'boot.need.ui': 'impossible de changer d’écran',
  'boot.need.engine': 'la caméra et la mesure ne démarreront pas',
  'boot.need.support': 'l’écran Soutien sera vide',
  'boot.need.tools': 'l’onglet Outils sera vide',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'Ces modules ne se sont pas chargés : {list}.',
  'boot.consoleHint': 'Vérifiez l’ordre et les chemins des balises <script> dans index.html.',
  'boot.incompleteTitle': 'L’application s’est chargée de façon incomplète',
  'boot.incompleteText': '{missing} Rechargez la page ; si cela n’aide pas, les fichiers sont incomplets sur le serveur.',
  'boot.newVersion': 'Une nouvelle version de l’application est disponible.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'Ce que font les seuils. ',
  'thresholds.noteText': 'Le seuil d’avertissement allume l’état jaune, le seuil critique le rouge. Un changement prend effet immédiatement — y compris sur le relevé déjà affiché. Vous pouvez enregistrer votre propre jeu de seuils sous un nom et y revenir quand vous le souhaitez.',
  'thresholds.profilesTitle': 'Profils de seuils',
  'thresholds.profilesSub': 'Les trois profils intégrés et les vôtres',
  'thresholds.customName': 'Nom de votre propre profil',
  'thresholds.customPlaceholder': 'par exemple Chambre le soir',
  'thresholds.save': 'Enregistrer les seuils actuels',
  'thresholds.saveHelp': 'Enregistre exactement les seuils réglés ci-dessus.',

  'profile.builtin.default.name': 'Par défaut',
  'profile.builtin.default.desc': 'Les seuils du catalogue des grandeurs — le point de départ de toutes les mesures.',
  'profile.builtin.evening.name': 'Soirée — doux',
  'profile.builtin.evening.desc': 'Avertit plus tôt d’une couleur froide et d’un impact circadien.',
  'profile.builtin.work.name': 'Travail au bureau',
  'profile.builtin.work.desc': 'Admet une lumière du jour vive et froide ; surveille le papillotement et l’uniformité.',
  'profile.custom.desc': 'Profil personnel enregistré le {date}.',

  'toast.thresholdsReset': 'Seuils par défaut rétablis.',
  'toast.thresholdOrder': 'Le seuil d’avertissement doit être plus bas que le seuil critique.',
  'toast.thresholdOrderInverted': 'Pour cette grandeur, le seuil d’avertissement doit être plus haut que le seuil critique.',
  'toast.profileNameMissing': 'Indiquez un nom de profil.',
  'toast.profileSaved': 'Profil « {name} » enregistré.',
  'toast.profileApplied': 'Profil « {name} » appliqué.',
  'toast.profileApplyFailed': 'Impossible d’appliquer ce profil.',
  'toast.profileRemoved': 'Profil supprimé.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'À quoi sert la programmation. ',
  'schedule.noteText': 'Le soir, ce ne sont pas les mêmes seuils qui ont du sens qu’à midi. Une règle « de–à » change le profil toute seule, pour ne pas avoir à y penser. La programmation ne démarre ni n’arrête jamais une mesure.',
  'schedule.toggle': 'Activer le changement automatique',
  'schedule.toggleSub': 'Vérifié chaque minute sur l’horloge de l’appareil.',
  'schedule.emptyTitle': 'Aucune règle',
  'schedule.emptyText': 'Ajoutez votre première règle avec le bouton ci-dessous.',
  'schedule.add': 'Ajouter une règle',
  'schedule.to': 'à',
  'schedule.profile': 'Profil',
  'schedule.fromAria': 'Règle {n} : heure de début',
  'schedule.toAria': 'Règle {n} : heure de fin',
  'toast.scheduleTimeFormat': 'Indiquez les heures au format 22:00.',
  'toast.scheduleEnded': 'La programmation s’est terminée — les seuils précédents sont revenus.',
  'toast.scheduleApplied': 'La programmation a activé le profil « {name} ».',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'Ce que fait une alerte. ',
  'alerts.noteText': 'Elle surveille une seule grandeur et ne se manifeste que lorsque celle-ci tient la zone choisie sans interruption pendant la durée réglée. Elle n’arrête jamais la mesure et ne masque jamais les boutons.',
  'alerts.toggle': 'Activer les alertes d’exposition',
  'alerts.toggleSub': 'Elles ne fonctionnent que pendant une mesure en cours.',
  'alerts.metric': 'Grandeur surveillée',
  'alerts.level': 'À partir de quelle zone',
  'alerts.level.warning': 'Avertissement et au-dessus',
  'alerts.level.critical': 'Critique seulement',
  'alerts.sustain': 'Après combien de secondes sans interruption',
  'alerts.sustainHelp': 'Des durées plus courtes donnent plus de fausses alertes quand vous bougez le téléphone.',
  'alerts.sound': 'Un court signal sonore',
  'alerts.soundSub': 'Le son est généré localement. On peut aussi le couper globalement sur l’écran Plus.',
  'alerts.barTitle': 'Alerte d’exposition',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} tient la zone d’avertissement depuis {seconds} s — maintenant {value} {unit}.',
  'alerts.message.critical': '{name} tient la zone critique depuis {seconds} s — maintenant {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'Comment comparer. ',
  'compare.noteText': 'Lancez la mesure, pointez la caméra vers la première source et enregistrez-la comme A. Sans changer la distance ni l’angle, changez de lumière et enregistrez B. La comparaison n’a de sens que si la scène est la même.',
  'compare.slotA': 'Lumière A',
  'compare.slotB': 'Lumière B',
  'compare.save': 'Enregistrer le relevé actuel',
  'compare.savedAt': 'Enregistré le {date} à {time}',
  'compare.empty': 'Rien n’a encore été enregistré.',
  'compare.verdictTitle': 'Résultat de la comparaison',
  'compare.verdictEmpty': 'Enregistrez les deux lumières pour voir laquelle est la plus douce.',
  'compare.notEnough': 'Pas assez de données pour comparer ces deux mesures.',
  'compare.tie': 'Les deux sources donnent pratiquement le même résultat ({metric} : {a} et {b} {unit}). L’écart tient dans le bruit de la mesure.',
  'compare.betterA': 'La plus douce est la lumière A — {metric} vaut {better} {unit} contre {worse} {unit}.',
  'compare.betterB': 'La plus douce est la lumière B — {metric} vaut {better} {unit} contre {worse} {unit}.',
  'compare.clear': 'Effacer la comparaison',
  'toast.compareSavedA': 'Lumière A enregistrée.',
  'toast.compareSavedB': 'Lumière B enregistrée.',
  'toast.compareCleared': 'Comparaison effacée.',
  'toast.measureFirst': 'Lancez d’abord une mesure sur l’écran Mesure.',

  /* Nazwa wielkości w środku zdania. Po francusku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. */
  'metric.share.nameLower': 'part de bleu',
  'metric.brightness.nameLower': 'luminosité de la scène',
  'metric.kelvin.nameLower': 'température de couleur',
  'metric.melanopic.nameLower': 'impact circadien',
  'metric.flicker.nameLower': 'papillotement',
  'metric.uniformity.nameLower': 'uniformité',
  'metric.comfort.nameLower': 'confort visuel',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'Pourquoi cela marche. ',
  'calib.noteText': 'Le capteur d’un appareil photo a un écart constant entre ses canaux. Mesurer une feuille blanche montre l’ampleur de cet écart et permet de le retrancher. C’est la seule fonction de cette application qui améliore vraiment la précision — et elle ne transforme toujours pas l’appareil photo en spectromètre.',
  'calib.step1': 'Posez une feuille blanche sous la lumière mesurée',
  'calib.step2': 'Lancez la mesure et remplissez le cadre avec la feuille',
  'calib.step3': 'Appuyez sur « Étalonner » et ne bougez pas le téléphone pendant 3 secondes',
  'calib.done': 'Étalonné le {date} à {time}.',
  'calib.none': 'Aucun étalonnage. La mesure fonctionne ; prenez les valeurs à titre comparatif.',
  'calib.gain': 'Gain {channel}',
  'calib.gainsLabel': 'Gains des canaux',
  'calib.gainsUnset': 'non réglés',
  'calib.start': 'Étalonner (3 s)',
  'calib.clear': 'Supprimer l’étalonnage',
  'toast.calibCleared': 'Étalonnage supprimé.',
  'calib.error.noEngine': 'Le module de mesure n’est pas disponible.',
  'calib.error.notRunning': 'Lancez d’abord la mesure et pointez la caméra vers une feuille blanche.',
  'calib.error.busy': 'Un étalonnage est déjà en cours.',
  'calib.error.tooFewSamples': 'Trop peu d’échantillons. Vérifiez que la mesure fonctionne vraiment.',
  'calib.error.tooDark': 'L’image est trop sombre pour étalonner. Éclairez mieux la feuille et réessayez.',
  'calib.error.tooSkewed': 'L’écart entre les canaux est trop grand pour être retenu comme étalonnage. Utilisez une feuille blanche sous une lumière régulière.',
  'calib.ok': 'Étalonné. La température de couleur et l’impact mélanopique seront maintenant plus précis.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'À quoi cela sert. ',
  'screencheck.noteText': 'Cinq étapes vérifient un écran comme le fait un banc d’essai : le blanc à deux luminosités, l’uniformité du rétroéclairage, et si le mode nuit du système change vraiment quelque chose. L’assistant lit une mesure en cours ; il ne la démarre pas lui-même.',
  'screencheck.step.white100.title': 'Le blanc à pleine luminosité',
  'screencheck.step.white100.hint': 'Ouvrez une page blanche sur l’écran, réglez la luminosité au maximum et remplissez le cadre avec l’écran.',
  'screencheck.step.white20.title': 'Le blanc à faible luminosité',
  'screencheck.step.white20.hint': 'Réduisez la luminosité de l’écran à environ un cinquième et ne changez pas le cadrage.',
  'screencheck.step.corners.title': 'Les coins de l’écran',
  'screencheck.step.corners.hint': 'Revenez à la pleine luminosité et montrez tout l’écran à la caméra — nous vérifions l’uniformité du rétroéclairage.',
  'screencheck.step.nightOff.title': 'Mode nuit désactivé',
  'screencheck.step.nightOff.hint': 'Assurez-vous que le filtre de lumière bleue est désactivé.',
  'screencheck.step.nightOn.title': 'Mode nuit activé',
  'screencheck.step.nightOn.hint': 'Activez le filtre de lumière bleue du système et refaites le même cadrage.',
  'screencheck.stepHeading': 'Étape {n} sur {total} : {title}',
  'screencheck.idleTitle': 'L’assistant n’est pas lancé',
  'screencheck.idleHint': 'Lancez une mesure sur l’écran Mesure, puis revenez ici et appuyez sur « Commencer ».',
  'screencheck.next': 'Enregistrer l’étape et continuer',
  'screencheck.cancel': 'Interrompre',
  'screencheck.start': 'Commencer l’assistant',
  'screencheck.clearResult': 'Effacer le résultat',
  'screencheck.resultTitle': 'Résultat',
  'screencheck.resultEmpty': 'Aucune étape n’a encore été enregistrée.',
  'screencheck.resultPartial': '{done} étapes sur {total} enregistrées. Les conclusions apparaîtront quand il y aura de quoi comparer.',
  'screencheck.note.uniformityLow': 'L’uniformité du rétroéclairage est de {value} % — on voit des différences de luminosité nettes dans le cadre.',
  'screencheck.note.uniformityOk': 'Le rétroéclairage est régulier ({value} %).',
  'screencheck.note.nightWorks': 'Le mode nuit abaisse la part de bleu de {value} points de pourcentage — il fonctionne.',
  'screencheck.note.nightWeak': 'Le mode nuit ne change la part de bleu que de {value} points de pourcentage. C’est moins que ce que donne d’habitude un filtre système.',
  'screencheck.note.pwm': 'À faible luminosité, le papillotement passe de {from} % à {to} % — c’est le signe typique d’une gradation par impulsions (PWM).',
  'toast.screencheckDone': 'Assistant terminé. Le résultat est ci-dessous.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'D’où viennent ces chiffres. ',
  'reports.noteText': 'Le rapport se calcule à partir de l’historique enregistré sur cet appareil — un point toutes les cinq secondes. Le moteur le recueille depuis la première mesure, le rapport est donc prêt tout de suite.',
  'reports.rangeAria': 'Plage du rapport',
  'reports.day': 'Dernières 24 heures',
  'reports.week': 'Les 7 derniers jours',
  'reports.date': 'Rapport du {date}.',
  'report.headerDay': 'Journée du {from} au {to} — {count}.',
  'report.headerWeek': 'Semaine du {from} au {to} — {count}.',
  'count.points': { one: '{n} point', many: '{n} de points', other: '{n} points' },
  'count.samples': { one: '{n} échantillon', many: '{n} d’échantillons', other: '{n} échantillons' },
  'report.emptyTitle': 'Aucune donnée sur cette période',
  'report.emptyText': 'Lancez une mesure sur l’écran Mesure — l’historique s’enregistre tout seul.',
  'report.colAvg': 'Moyenne',
  'report.colMin': 'Minimum',
  'report.colMax': 'Maximum',
  'report.zonesTitle': 'Répartition des zones',
  'report.worstHour': 'Pire moment de la journée',
  'report.worstHourNone': 'aucun ne se détache',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'Que faire',
  'report.disclaimerTitle': 'Ceci n’est pas un conseil de santé. ',
  'report.disclaimerText': 'Les conclusions découlent uniquement de ce qu’a vu la caméra de ce téléphone. L’application ne mesure pas de spectre, ne connaît pas les lux et ne pose aucun diagnostic.',

  'advice.melanopic': 'L’impact circadien moyen a été de {value} ×. Le soir, il vaut mieux descendre sous 0,50 — le plus simplement avec une ampoule plus chaude ou le mode nuit.',
  'advice.kelvin': 'La lumière était froide ({value} K en moyenne). Pour travailler, c’est irréprochable ; dans les deux heures avant le coucher, mieux vaut rester sous 3000 K.',
  'advice.flicker': 'Un papillotement notable a été détecté ({value} % en moyenne). Il vient d’habitude d’un variateur bon marché ou de l’alimentation du rétroéclairage.',
  'advice.uniformity': 'La lumière se répartit inégalement ({value} %). Déplacer la lampe ou changer son angle apporte d’habitude plus que remplacer l’ampoule.',
  'advice.worstHour': 'Le pire moment de la journée est {hour}:00 — c’est là que se concentrent le plus de relevés hors norme.',
  'advice.none': 'Rien ne dépasse la norme sur cette période. Ce qui apporterait le plus maintenant, c’est de comparer deux sources de lumière dans la comparaison A/B.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'Format du fichier. ',
  'export.noteText': 'Point-virgule comme séparateur de colonnes, virgule comme séparateur décimal, encodage UTF-8 avec marque BOM. Un Excel réglé sur le français ouvre un tel fichier sans avoir à régler quoi que ce soit.',
  'export.range': 'Plage de données',
  'export.columns': 'Colonnes du fichier',
  'export.chipFilled': ' — colonne remplie',
  'export.help': 'Le fichier contient les sept colonnes — le moteur les calcule depuis la première mesure et toutes se retrouvent dans le fichier.',
  'export.run': 'Enregistrer le fichier CSV',
  'export.previewEmpty': 'Aucun relevé dans cette plage. Lancez une mesure — l’historique s’enregistre tout seul.',
  'csv.range.hour': 'Dernière heure',
  'csv.range.day': 'Dernières 24 heures',
  'csv.range.week': 'Les 7 derniers jours',
  'csv.range.month': 'Les 30 derniers jours',
  'csv.colDate': 'Date',
  'csv.colTime': 'Heure',
  'csv.colZone': 'Zone',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'Il n’y a aucun relevé dans la plage choisie.',
  'toast.exportFailed': 'Ce navigateur n’a pas permis d’enregistrer le fichier.',
  'toast.exportSaved': {
    one: 'Fichier {filename} enregistré ({n} ligne).',
    many: 'Fichier {filename} enregistré ({n} de lignes).',
    other: 'Fichier {filename} enregistré ({n} lignes).'
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
