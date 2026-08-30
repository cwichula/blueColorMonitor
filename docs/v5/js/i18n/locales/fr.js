/* Monitor Światła v5 — słownik francuski.
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr). NIE JEST
 * KALKĄ żadnego z nich: polskie i angielskie zdania przełożono na naturalną
 * francuszczyznę. Zachowane zostało to, co niesie znaczenie: liczby, progi,
 * jednostki, nazwy wstawek i — co do treści — zastrzeżenia medyczne oraz
 * zdania o prywatności. Tych ostatnich nie wolno osłabiać ani wzmacniać:
 * „nie zastępuje rozmowy z lekarzem” i „obraz nie opuszcza urządzenia”
 * znaczą po francusku dokładnie tyle samo, ani mniej, ani więcej.
 *
 * REJESTR: „vous” — konsekwentnie w całym pliku, także w komunikatach błędów.
 * To domyślna forma francuskich aplikacji użytkowych: uprzejma, ale ciepła;
 * „tu” brzmiałoby tu poufale wobec kogoś, kogo aplikacja nie zna.
 * TYPOGRAFIA: cudzysłowy francuskie « … » ze spacją nierozdzielającą
 * w środku, spacja nierozdzielająca przed „:”, „?” i przed znakiem %,
 * apostrof typograficzny (’). Przecinek dziesiętny, jak po polsku (1,00).
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych i pomocy):
 *   part de bleu, luminosité de la scène, température de couleur,
 *   impact circadien (w opisie: rapport mélanopique), papillotement,
 *   uniformité, confort visuel.
 * STREFY: sans risque / modéré / nocif — mówią o świetle, a nie o stanie
 * aplikacji, i wchodzą w zdanie „zone : {zone}” tak samo jak polskie
 * „bezpiecznie / umiarkowanie / szkodliwie”.
 * POZOSTAŁE STAŁE ODPOWIEDNIKI: grandeur (wielkość), mesure (pomiar),
 * historique (historia), session (sesja), échantillon (próbka),
 * seuil (próg), étalonnage (kalibracja), relevé (odczyt).
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Texte avec une insertion {name}'   — napis zwykły,
 *   'klucz.kropkowany': { one, many, other }                — forma zależna
 *                                                             od liczby.
 * Francuski ma w CLDR trzy formy: `one` (0 i 1), `many` (miliony i zapis
 * skrócony) oraz `other`. Nazwy wstawek są identyczne jak w pl.js — pilnuje
 * tego keys.test.js. Kolejność wstawek w zdaniu wolno zmieniać, nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Moniteur de lumière',
  'app.description': 'Moniteur de lumière — votre caméra mesure sept grandeurs de la lumière qui vous entoure. Tout est calculé sur cet appareil, rien ne part sur le réseau.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Moniteur de lumière',
  'app.skipToContent': 'Aller au contenu',
  'app.nav.aria': 'Navigation principale',
  'app.noscript.title': 'Cette application a besoin de JavaScript',
  'app.noscript.text': 'Toute la mesure se passe dans cet onglet du navigateur\u00A0: c’est JavaScript qui lit les images de la caméra et en calcule les sept grandeurs de la lumière. Sans lui, il n’y a rien avec quoi mesurer. Activez JavaScript pour cette page et rouvrez-la — rien ne sera envoyé sur le réseau pour autant.',

  'nav.measure': 'Mesure',
  'nav.history': 'Historique',
  'nav.tools': 'Outils',
  'nav.support': 'Soutien',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Mesure en cours',
  'shell.live.aria': 'Mesure en cours. {metric}\u00A0: {value}. Revenir à l’écran de mesure.',
  'shell.live.metricFallback': 'Grandeur principale',
  'shell.action.fallback': 'Action de l’écran',

  'shell.loadFail.title': 'Impossible de charger l’écran «\u00A0{screen}\u00A0»',
  'shell.loadFail.text': 'Il manque sans doute une partie des fichiers dans la mémoire de l’appareil. Connectez-vous au réseau et rechargez la page.',
  'shell.fatal.title': 'Quelque chose s’est mal passé',
  'shell.fatal.text': 'L’application n’a pas réussi à assembler l’écran. Recharger la page suffit d’habitude — vos mesures enregistrées et vos réglages restent en place.',
  'shell.fatal.reload': 'Recharger la page',
  'shell.boot.failTitle': 'L’application n’a pas pu démarrer',
  'shell.boot.failText': 'L’ossature de l’application n’a pas démarré. Rechargez la page — vos mesures enregistrées et vos réglages restent en place.',
  'shell.background.error': 'Quelque chose s’est cassé en arrière-plan',
  'shell.background.action': 'Recharger',
  'shell.update.title': 'Une nouvelle version est disponible',
  'shell.update.action': 'Recharger',

  'onboarding.title': 'Avant de commencer',
  'onboarding.lead': 'Moniteur de lumière regarde avec la caméra la lumière autour de vous et en calcule sept grandeurs — de la part de bleu au confort visuel.',
  'onboarding.privacy': 'L’image ne quitte pas cet appareil\u00A0: pas de serveur, pas de compte et rien à envoyer. Les sept grandeurs fonctionnent tout de suite, sans connexion et sans frais.',
  'onboarding.honesty': 'C’est un repère, pas un instrument de mesure ni un examen médical. Ce qui ne peut pas être mesuré n’est pas affiché — à la place du nombre, vous verrez un tiret.',
  'onboarding.start': 'C’est parti',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Appliquer',
  'overlay.toast.close': 'Fermer le message',
  'overlay.sheet.label': 'Fenêtre',
  'overlay.sheet.close': 'Fermer',
  'overlay.dialog.confirm': 'Confirmer',
  'overlay.dialog.cancel': 'Annuler',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'Annuler',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'Mesure',

  'measure.intro.aria': 'Démarrer une mesure',
  'measure.intro.headline': 'Voyez ce qui vous éclaire',
  'measure.intro.lead': 'La caméra montre combien de bleu il y a dans la lumière qui tombe sur vous en ce moment — et si c’est trop pour cette heure de la journée.',
  'measure.intro.start': 'Démarrer la mesure',
  'measure.intro.hint': 'Le navigateur va demander l’autorisation d’utiliser la caméra. La mesure démarre dès que vous l’accordez.',
  'measure.intro.privacy': 'L’image de la caméra est traitée sur cet appareil et ne le quitte jamais. Nous n’envoyons, n’enregistrons et ne partageons aucune image.',
  'measure.intro.honesty': 'Ceci n’est ni un dispositif médical ni un examen. L’application montre une approximation de la lumière qui vous entoure ; elle ne juge pas votre santé et ne remplace pas une consultation médicale.',

  'measure.live.aria': 'Mesure en cours',
  'measure.badge.starting': 'Démarrage',
  'measure.badge.paused': 'En pause',
  'measure.badge.running': 'Mesure en cours',
  'measure.stale': 'En attente de l’image — l’aperçu se fige quand l’application passe en arrière-plan.',
  'measure.crop': 'Nous mesurons le centre du cadre — les {percent}\u00A0% marqués de la largeur et de la hauteur de l’image.',
  'measure.facing.front': 'caméra avant',
  'measure.facing.back': 'caméra arrière',

  'measure.boot.title': 'Démarrage de la caméra…',
  'measure.boot.text': 'Si le navigateur demande l’autorisation, accordez-la — sans image, il n’y a rien à mesurer. L’autorisation ne vaut que pour cette page et vous pourrez la retirer plus tard.',
  'measure.boot.cancel': 'Annuler',

  'measure.hold': 'Affichage figé. La caméra continue de tourner, mais plus rien ne va dans l’historique ni dans les moyennes.',
  'measure.gridHint': 'Choisissez une tuile pour amener cette grandeur sur le grand cadran.',

  'measure.stop': 'Arrêter',
  'measure.pause': 'Pause',
  'measure.resume': 'Reprendre',
  'measure.flip.aria': 'Changer de caméra',
  'measure.flip.toBack': 'Passer à la caméra arrière',
  'measure.flip.toFront': 'Passer à la caméra avant',

  'measure.fail.aria': 'Erreur de caméra',
  'measure.fail.headline': 'La caméra n’a pas démarré',
  'measure.fail.retry': 'Réessayer',
  'measure.fail.back': 'Retour',
  'measure.fail.savedSession': 'La session d’avant l’interruption ({duration}) a été enregistrée dans l’historique.',
  'measure.error.fallback': 'Impossible de démarrer la caméra.',

  'measure.summary.aria': 'Résumé de la session',
  'measure.summary.title': 'Résumé de la session',
  'measure.summary.paused': 'en pause pendant {duration}',
  'measure.summary.nothingMeasured': 'Aucune grandeur n’a recueilli de mesure — la caméra n’a pas vu de lumière de toute la session.',
  'measure.summary.note': 'Les moyennes ne comptent que les échantillons pris hors pause. Les grandeurs qui n’ont pas été mesurées sont laissées de côté, pas comptées comme zéro.',
  'measure.summary.nearThreshold': 'Au plus près du seuil',
  'measure.summary.worstPoint': 'Point le plus faible',
  'measure.summary.averageZone': '{zone} en moyenne',
  'measure.summary.tooShort': 'La session a duré {duration} — trop court pour rejoindre l’historique toute seule. Vous pouvez l’enregistrer à la main.',
  'measure.summary.again': 'Mesurer à nouveau',
  'measure.summary.save': 'Enregistrer dans l’historique',
  'measure.summary.saved': 'Enregistrée dans l’historique',
  'measure.summary.savedToast': 'Session enregistrée dans l’historique.',
  'measure.summary.close': 'Fermer',

  'measure.method.title': 'Comment nous mesurons',
  'measure.method.p1': 'L’application échantillonne l’image de la caméra dix fois par seconde et calcule les grandeurs à partir des {percent}\u00A0% centraux du cadre — le réticule de l’aperçu marque exactement cette zone.',
  'measure.method.p2': 'Une caméra de téléphone a trois canaux larges, plus sa propre correction automatique de l’exposition et de la balance des blancs. Elle voit les proportions de la lumière, pas son spectre.',
  'measure.method.p3': 'La part de bleu, la luminosité, le papillotement et l’uniformité sont ce que la caméra mesure vraiment. La température de couleur et l’impact circadien sont des approximations assumées, calculées à partir des primaires sRGB.',
  'measure.method.p4': 'Le papillotement n’est visible qu’en dessous de quatre hertz. Celui du secteur, à 100 Hz, est bien hors de portée de cet échantillonnage et ne sera jamais donné comme relevé.',
  'measure.method.p5': 'Aucun de ces nombres n’est une mesure photométrique ni un résultat médical. L’image de la caméra ne quitte pas l’appareil.',
  'measure.method.ok': 'J’ai compris',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'Démarrage de la caméra annulé.',
  'measure.announce.stoppedNoSamples': 'Mesure arrêtée. Aucun échantillon n’a été recueilli.',
  'measure.announce.stopped': 'Mesure arrêtée. Le résumé de la session est prêt.',
  'measure.announce.interrupted': 'Mesure interrompue. Le résumé de la session est prêt.',
  'measure.announce.paused': 'Mesure en pause. Affichage figé.',
  'measure.announce.resumed': 'Mesure reprise.',
  'measure.announce.switchedFront': 'Passage à la caméra avant. Une nouvelle session commence.',
  'measure.announce.switchedBack': 'Passage à la caméra arrière. Une nouvelle session commence.',
  'measure.announce.lead': 'Grandeur principale\u00A0: {metric}.',
  'measure.announce.cameraError': 'Erreur de caméra. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'La lumière est restée dans la plage sans risque pendant toute la session — laissez la lampe telle quelle et revérifiez à la nuit tombée, quand une autre source prend le relais.',
  'measure.advice.share.evening': 'La part de bleu a été en moyenne de {value} — passez vos écrans en mode nuit et éteignez le plafonnier, en gardant une seule lampe chaude à hauteur de bureau.',
  'measure.advice.share.day': 'La part de bleu a été en moyenne de {value} — c’est acceptable en journée, mais réglez votre écran pour qu’il passe automatiquement en mode chaud deux heures avant le coucher.',
  'measure.advice.brightness': 'Le cadre était surexposé ({value} en moyenne) — éloignez-vous de la source de lumière ou baissez la luminosité de l’écran mesuré, car à cette exposition les autres grandeurs perdent aussi en précision.',
  'measure.advice.kelvin.evening': 'La température de couleur s’est tenue à {value} en moyenne — à la nuit tombée, descendez en dessous de 3000 K\u00A0: passez la lampe en mode chaud ou vissez une ampoule de 2700 K.',
  'measure.advice.kelvin.day': 'La température de couleur s’est tenue à {value} en moyenne — un bon blanc stimulant pour la journée, mais réglez la même lampe sur 2700 K le soir.',
  'measure.advice.melanopic.evening': 'L’impact circadien a été en moyenne de {value} — dans les deux heures avant le coucher, descendez en dessous de 0,50\u00A0×, en atténuant l’éclairage principal et en éclairant depuis la hauteur du bureau plutôt que depuis le plafond.',
  'measure.advice.melanopic.day': 'L’impact circadien a été en moyenne de {value} — à cette heure-ci, cette dose fait du bien, mais le soir, remplacez cette source par une plus faible et plus chaude.',
  'measure.advice.flicker': 'Le papillotement a atteint {value} en moyenne — c’est en général un variateur ou un rétroéclairage réglé très bas\u00A0: montez la luminosité de l’écran au-dessus de 40\u00A0% ou remplacez le variateur par un modèle sans modulation PWM.',
  'measure.advice.uniformity': 'La lumière tombait de façon inégale ({value} en moyenne) — placez la lampe sur le côté du plan de travail et ajoutez une deuxième source, plus faible, du côté opposé, plutôt qu’un seul point fort.',
  'measure.advice.comfort': 'Le confort visuel est ressorti à {value} en moyenne — commencez par un seul changement\u00A0: divisez par deux la luminosité de la source principale, et ne vous occupez de la couleur de la lumière qu’ensuite.',
  'measure.advice.default': 'Changez une chose à votre éclairage et mesurez-le à nouveau — comparer deux sessions en dit plus qu’un relevé isolé.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'Historique',
  'history.action.export': 'Exporter l’historique',

  'history.metricGroup.aria': 'Choix de la grandeur',
  'history.announce.metric': 'Grandeur\u00A0: {metric}',
  'history.rangeGroup.aria': 'Plage de temps',
  'history.range.aria': 'Depuis {range}',

  'history.stats.title': 'Statistiques de la plage',
  'history.stats.head': '{metric}\u00A0—\u00A0depuis {range}',
  'history.stats.note': 'Calculé à partir de ce que montre le graphique. Le temps sans mesure n’est pas compté — nous ne mettons pas zéro à sa place.',
  'history.stat.min': 'Minimum',
  'history.stat.avg': 'Moyenne',
  'history.stat.max': 'Maximum',
  'history.trend.up': 'en hausse sur cette plage',
  'history.trend.flat': 'sans changement net',
  'history.trend.down': 'en baisse sur cette plage',
  'history.trend.none': 'rien à quoi comparer',

  'history.sessions.title': 'Sessions de mesure',
  'history.sessions.count': '{sessions}, la plus récente en premier',
  'history.sessions.empty': 'Aucune session pour l’instant',
  'history.sessions.hint': 'Une session est enregistrée dès que vous arrêtez la mesure.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'plage\u00A0: {range}',
  'history.session.noMeasure': 'rien de mesuré',

  'history.data.title': 'Données',
  'history.data.subtitle': 'L’historique n’est enregistré que sur cet appareil.',
  'history.export.csv': 'Exporter en CSV',
  'history.export.json': 'Exporter en JSON',
  'history.export.ok': 'Fichier prêt à être enregistré',
  'history.export.fail': 'Impossible de préparer le fichier. En navigation privée, et dans une fenêtre intégrée à une autre application, le navigateur bloque l’enregistrement — ouvrez la page dans un onglet ordinaire.',
  'history.export.sheet.title': 'Export de l’historique',
  'history.export.sheet.text': 'Le CSV s’ouvre dans un tableur (point-virgule comme séparateur, virgule décimale). Le JSON garde tout, y compris la liste des sessions et les trous sans mesure.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Effacer l’historique',
  'history.clear.title': 'Effacer l’historique\u00A0?',
  'history.clear.text': 'Cela supprimera {points} et {sessions}. C’est irréversible — si vous voulez garder ces données, exportez-les d’abord.',
  'history.clear.confirm': 'Effacer',
  'history.clear.announce': 'Historique effacé.',
  'history.clear.toast': 'Historique effacé',

  'history.empty.title': 'Rien à montrer pour l’instant',
  'history.empty.text': 'L’historique se remplit au fil de la mesure — un point par seconde. Tout reste sur cet appareil.',
  'history.empty.action': 'Aller à la mesure',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 min',
  'range.5m': '5 min',
  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 jours',
  'range.30d': '30 jours',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Date et heure',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'La mémoire de l’appareil est pleine — les nouvelles mesures ne sont plus enregistrées.',
  'storage.blocked': 'Le navigateur ne permet pas d’enregistrer l’historique — les données disparaîtront à la fermeture de l’onglet.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Outils',
  'tools.action.about': 'À propos de la mesure',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Langue',
  'tools.language.subtitle': 'Par défaut, l’application suit la langue de l’appareil\u00A0; un choix dans cette liste prend effet tout de suite et reste dans ce navigateur.',
  'tools.language.aria': 'Langue de l’interface',
  'tools.language.system': 'Auto',
  'tools.language.announce': 'Langue de l’interface\u00A0: {language}.',

  'tools.appearance.title': 'Apparence',
  'tools.appearance.theme.title': 'Thème',
  'tools.appearance.theme.desc': '«\u00A0Auto\u00A0» suit le réglage du système.',
  'tools.appearance.theme.aria': 'Thème',
  'tools.theme.system': 'Auto',
  'tools.theme.light': 'Clair',
  'tools.theme.dark': 'Sombre',
  'tools.appearance.accent.title': 'Couleur d’accent',
  'tools.appearance.accent.desc': 'La couleur des boutons, des sélections et des curseurs.',
  'tools.appearance.accent.aria': 'Couleur d’accent',
  'tools.appearance.textScale.title': 'Taille du texte',
  'tools.appearance.textScale.desc': 'Agrandit toute l’interface, pas seulement les libellés.',
  'tools.appearance.textScale.aria': 'Taille du texte',
  'tools.appearance.density.title': 'Densité',
  'tools.appearance.density.desc': 'Le mode compact fait tenir plus de contenu sur un écran.',
  'tools.appearance.density.aria': 'Densité de l’affichage',
  'tools.density.comfortable': 'Normale',
  'tools.density.compact': 'Compacte',
  'tools.appearance.motion.title': 'Moins d’animations',
  'tools.appearance.motion.desc': 'Désactive les animations et le glissement de l’aiguille. Le réglage du système est respecté dans tous les cas.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Océan',
  'accent.violet': 'Violet',
  'accent.amber': 'Ambre',
  'accent.mint': 'Menthe',
  'accent.rose': 'Rose',

  'tools.thresholds.title': 'Seuils',
  'tools.thresholds.subtitle': 'À partir de quelle valeur l’application doit dire «\u00A0modéré\u00A0», et à partir de laquelle «\u00A0critique\u00A0». Les seuils par défaut sont notre proposition, pas une norme — réglez-les à votre convenance.',
  'tools.thresholds.warn': 'Seuil d’alerte',
  'tools.thresholds.crit': 'Seuil d’alarme',
  'tools.thresholds.warn.aria': 'Seuil d’alerte — {metric}',
  'tools.thresholds.crit.aria': 'Seuil d’alarme — {metric}',
  'tools.thresholds.reset': 'Par défaut',
  'tools.thresholds.reset.aria': 'Rétablir les seuils par défaut\u00A0: {metric}',
  'tools.thresholds.moved': '{threshold} déplacé sur {value}.',
  'tools.thresholds.resetAll': 'Rétablir tous les seuils',
  'tools.thresholds.resetAll.title': 'Rétablir les seuils par défaut\u00A0?',
  'tools.thresholds.resetAll.text': 'Les sept grandeurs reviendront aux seuils proposés par l’application. Votre historique de mesures reste intact.',
  'tools.thresholds.resetAll.confirm': 'Rétablir',
  'tools.thresholds.resetAll.cancel': 'Garder les miens',
  'tools.thresholds.resetAll.toast': 'Les seuils sont revenus aux valeurs par défaut',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}\u00A0:',
  'tools.zoneRange.goodAbove': 'au-dessus de {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} et en dessous',
  'tools.zoneRange.goodBelow': 'en dessous de {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} et au-dessus',

  'tools.calibration.title': 'Étalonnage',
  'tools.calibration.subtitle': 'Pour celles et ceux qui ont de quoi comparer.',
  'tools.calibration.intro': 'Deux téléphones pointés sur la même lampe donneront des nombres un peu différents — chaque capteur a sa propre teinte. Si vous avez sous la main une mesure de confiance, vous pouvez ici pousser ou retenir légèrement chaque canal de l’image. Les multiplicateurs agissent avant tout calcul, ils changent donc les sept grandeurs à la fois.',
  'tools.calibration.neutral': 'Rien à quoi comparer\u00A0? Laissez 1,00 — c’est le réglage d’usine et il n’abîme rien.',
  'tools.calibration.forward': 'Le changement s’applique à partir de maintenant. Les mesures déjà enregistrées dans l’historique restent telles qu’elles étaient au moment de l’enregistrement — nous ne les recalculons pas, car cela réécrirait les données après coup.',
  'tools.calibration.reset': 'Réinitialiser l’étalonnage',
  'tools.calibration.reset.toast': 'Étalonnage réinitialisé',
  'tools.calibration.channel.r': 'Canal rouge',
  'tools.calibration.channel.g': 'Canal vert',
  'tools.calibration.channel.b': 'Canal bleu',
  'tools.calibration.channel.aria': '{channel} — multiplicateur d’étalonnage',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'Mesure',
  'tools.measurement.wake.title': 'Garder l’écran allumé',
  'tools.measurement.wake.desc': 'L’écran reste allumé pendant la mesure. La batterie descend alors plus vite.',
  'tools.measurement.wake.unsupported': 'Ce navigateur ne permet pas d’empêcher l’écran de s’éteindre.',
  'tools.measurement.haptics.title': 'Vibration',
  'tools.measurement.haptics.desc': 'Une courte confirmation au démarrage, à l’arrêt et au changement de grandeur.',
  'tools.measurement.haptics.unsupported': 'Cet appareil ne signale aucun moteur de vibration.',

  'tools.about.title': 'À propos de la mesure',
  'tools.about.subtitle': 'Ce que calcule exactement chacune des sept grandeurs, et où s’arrête l’honnêteté de cette méthode.',
  'tools.about.scale': 'Échelle\u00A0: de {min} à {max}.',
  'tools.about.threshold': 'Nous alertons à partir de {warn} et donnons l’alarme à partir de {crit}.',
  'tools.about.thresholdInvert': 'Nous alertons en dessous de {warn} et donnons l’alarme en dessous de {crit}.',
  'tools.about.limitsHead': 'Ce que cette mesure ne sait pas faire',
  'tools.about.limit.spectrum.title': 'Une caméra ne voit pas les couleurs comme un instrument de mesure',
  'tools.about.limit.spectrum.text': 'Une caméra de téléphone a trois canaux\u00A0: rouge, vert et bleu. Un instrument de mesure de la lumière les décompose en dizaines de bandes étroites. Ce que vous voyez ici est déduit de ces trois nombres — d’une manière raisonnable, mais cela reste un calcul, pas un spectre mesuré.',
  'tools.about.limit.exposure.title': 'La caméra règle elle-même sa luminosité',
  'tools.about.limit.exposure.text': 'Pointez le téléphone vers une fenêtre et la caméra assombrit l’image pour ne pas la surexposer. La «\u00A0luminosité de la scène\u00A0» baisse alors, alors que rien n’a changé dans la pièce. Comparez donc cette valeur au sein d’une même prise de vue, pas d’une pièce à l’autre.',
  'tools.about.limit.flicker.title': 'Une caméra lente n’attrape pas le papillotement rapide',
  'tools.about.limit.flicker.text': 'Nous examinons l’image {hz} fois par seconde. Une pulsation plus rapide que {nyquist} fois par seconde peut apparaître dans une telle mesure comme plus lente qu’elle ne l’est vraiment, ou disparaître complètement — et le papillotement du secteur est justement de cet ordre. Si l’application détecte quelque chose, prenez-le comme le signe que «\u00A0quelque chose pulse ici\u00A0», pas comme une fréquence mesurée.',
  'tools.about.limit.medical.title': 'Ce n’est ni un examen médical ni un avis médical',
  'tools.about.limit.medical.text': 'L’application vous aide à remarquer que la lumière autour de vous est froide, vive ou agitée, et suggère ce qu’on peut y faire. Elle ne se prononce pas sur votre santé et ne remplace ni une conversation avec un médecin ni une mesure avec un appareil professionnel.',
  'tools.about.privacy': 'Tout est calculé sur votre appareil. L’image de la caméra n’est jamais envoyée ni enregistrée nulle part — seuls les nombres calculés arrivent en mémoire.',
  'tools.about.privacyPolicy': 'Politique de confidentialité complète',

  'tools.data.title': 'Données',
  'tools.data.subtitle': 'Tout se trouve dans la mémoire de ce navigateur et n’en sort jamais.',
  'tools.data.summary.empty': 'Aucune mesure enregistrée pour l’instant.',
  'tools.data.summary': 'En mémoire\u00A0: {points} et {sessions}.',
  'tools.data.export.csv': 'Exporter en CSV',
  'tools.data.export.json': 'Exporter en JSON',
  'tools.data.clear': 'Effacer l’historique',
  'tools.data.reset': 'Réglages par défaut',
  'tools.data.reset.title': 'Rétablir les réglages par défaut\u00A0?',
  'tools.data.reset.text': 'L’apparence, les seuils, l’étalonnage et les réglages de mesure reviendront à leur état initial. Votre historique de mesures reste intact.',
  'tools.data.reset.confirm': 'Rétablir',
  'tools.data.reset.toast': 'Réglages par défaut rétablis',
  'tools.data.wipe': 'Supprimer toutes les données',
  'tools.data.wipe.title': 'Supprimer toutes les données de l’application\u00A0?',
  'tools.data.wipe.text': 'Disparaîtront\u00A0: tout l’historique de mesures et la liste des sessions, vos seuils et votre étalonnage, ainsi que vos réglages d’apparence. L’application reviendra à l’état du premier lancement.',
  'tools.data.wipe.note': 'Nous n’avons aucune copie de ces données — elles n’ont jamais quitté cet appareil, il n’y a donc nulle part d’où les restaurer.',
  'tools.data.wipe.check': 'Je comprends que c’est irréversible',
  'tools.data.wipe.confirm': 'Tout supprimer',
  'tools.data.wipe.toast': 'Toutes les données de l’application ont été supprimées',
  'tools.data.wipe.announce': 'Toutes les données de l’application ont été supprimées. Les réglages sont revenus aux valeurs par défaut.',
  'tools.data.storage.blocked': 'Ce navigateur ne permet d’enregistrer durablement quoi que ce soit (navigation privée, ou données de site bloquées). Tout ce que vous réglez ici disparaîtra à la fermeture de l’onglet.',
  'tools.data.storage.full': 'La mémoire du navigateur est pleine et les nouvelles mesures ne sont plus enregistrées. Effacer l’historique libérera de la place.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Soutien',
  'support.free.title': 'Tout est accessible',
  'support.free.lead': 'Les sept grandeurs, l’historique complet, les seuils, l’étalonnage et l’export fonctionnent dès le premier lancement — sans compte, sans limite et sans frais.',
  'support.free.note': 'La mesure est entièrement calculée sur cet appareil et fonctionne sans réseau. Il n’y a pas ici de meilleure version gardée derrière un mur.',
  'support.why.title': 'Pourquoi je le demande',
  'support.why.lead': 'Moniteur de lumière se construit après les heures de travail, sans publicité, sans sponsor et sans entreprise derrière. Le soutien paie le temps passé aux corrections, aux nouvelles grandeurs et à l’entretien de ce qui marche déjà.',
  'support.what.title': 'Ce qu’apporte un don',
  'support.what.lead': 'Rien. Un don ne débloque rien — aucune fonction supplémentaire, aucun badge à côté de votre nom, aucune priorité. Tout ce que l’application sait faire, vous l’avez déjà.',
  'support.what.note': 'Il reste seulement que je sais que cela a servi à quelqu’un. C’est vraiment une raison suffisante.',
  'support.cta.title': 'Si vous voulez aider',
  'support.cta.button': 'Offrez-moi un café',
  'support.cta.nolink': 'Le profil de dons n’est pas encore connecté. Quand il le sera, un bouton se tiendra à cet endroit.',
  'support.cta.privacy': 'Ce lien ouvre la page externe Buy Me a Coffee dans un nouvel onglet. C’est le seul moment où quelque chose quitte cet appareil — la mesure elle-même reste toujours ici.',
  'support.cta.privacyFuture': 'Quand l’adresse sera en place, le bouton ouvrira la page externe Buy Me a Coffee dans un nouvel onglet. Ce sera le seul moment où quelque chose quitte cet appareil — la mesure elle-même reste toujours ici.',
  'support.cta.note': 'Il n’y a ici ni compte à rebours, ni rappels, ni fenêtre qui s’ouvre toute seule. Cette demande attend sur cet onglet et nulle part ailleurs.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'dernière minute',
  'gauge.aria': '{metric}\u00A0: {value}, zone\u00A0: {zone}',
  'gauge.aria.note': '{metric}\u00A0: {value}, zone\u00A0: {zone}, {note}',
  'gauge.aria.initial': '{metric}\u00A0: aucune donnée',
  'gauge.value.none': 'aucune donnée',
  /* Odczyt słowny z jednostką: „27 pour cent”, „1,20 fois”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'valeur approximative',
  'gauge.note.offScale': 'hors échelle',
  'gauge.metric.unknown': 'Grandeur inconnue',

  'chart.aria.label': 'Graphique de l’historique des mesures',
  'chart.hint': 'Graphique interactif. Les flèches gauche et droite déplacent le curseur de lecture, Début et Fin vont au début et à la fin de la plage, Échap masque le curseur.',
  'chart.empty.title': 'Aucune donnée',
  'chart.empty.text': 'Lancez une mesure — le graphique apparaît après les premiers relevés.',
  'chart.few.title': 'Pas assez de données',
  'chart.few.text': 'Nous avons un seul relevé\u00A0: {value}. Une ligne en demande deux.',
  'chart.legend.line': 'mesure',
  'chart.legend.gap': 'interruption de la mesure',
  'chart.aria.head': 'Graphique\u00A0: {metric}, plage {range}',
  'chart.aria.empty': 'Aucune donnée dans cette plage.',
  'chart.aria.one': 'Un seul relevé\u00A0: {value}.',
  'chart.aria.summary': 'De {min} à {max}, moyenne {avg}, {points}.',
  'chart.aria.gaps': 'La série a des trous — nous ne mesurions pas à ces moments-là.',
  'chart.readout.empty': 'Aucune donnée dans cette plage.',
  'chart.readout.point': '{metric}\u00A0: {value}, {time}',
  'chart.readout.pointZone': '{metric}\u00A0: {value}, {zone}, {time}',
  'chart.readout.few': 'Pas assez de données pour tracer un graphique.',
  'chart.readout.hint': 'Faites glisser le doigt sur le graphique, ou utilisez les flèches, pour lire une mesure isolée.',
  'chart.time.now': 'maintenant',
  'chart.time.justNow': 'à l’instant',
  'chart.time.ago': 'il y a {duration}',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd „sept.”, najdłuższy z francuskich
     skrótów miesięcy, i zegar dwudziestoczterogodzinny. */
  'chart.sample.ago': '\u221230\u00A0min',
  'chart.sample.clock': '00:00',
  'chart.sample.date': '30\u00A0sept.',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'Part de bleu',
  'metric.share.short': 'Quelle part de la lumière vue revient au canal bleu.',
  'metric.share.help': 'Elle sépare la couleur de la luminosité — c’est cette valeur qui bouge quand vous activez le mode nuit.',
  'metric.brightness.name': 'Luminosité de la scène',
  'metric.brightness.short': 'La luminosité moyenne de l’image de la caméra.',
  'metric.brightness.help': 'Une valeur relative, pas des lux — l’exposition automatique de la caméra la décale par en dessous.',
  'metric.kelvin.name': 'Température de couleur',
  'metric.kelvin.short': 'Si la lumière est chaude ou froide.',
  'metric.kelvin.help': 'En dessous de 3000 K, la lumière est chaude et plus douce le soir. 6500 K est le blanc par défaut de la plupart des écrans.',
  'metric.melanopic.name': 'Impact circadien',
  'metric.melanopic.short': 'À quel point cette lumière agit sur l’horloge biologique.',
  'metric.melanopic.help': 'Une approximation du rapport mélanopique. 1,00, c’est le blanc neutre du jour\u00A0; le soir, mieux vaut descendre en dessous de 0,50.',
  'metric.flicker.name': 'Papillotement',
  'metric.flicker.short': 'La pulsation invisible de la source de lumière.',
  'metric.flicker.help': 'Les variateurs et les rétroéclairages bon marché pulsent. L’œil ne le voit pas, mais il est signalé comme une cause possible de fatigue et de maux de tête.',
  'metric.uniformity.name': 'Uniformité',
  'metric.uniformity.short': 'Si la lumière se répartit également dans le cadre.',
  'metric.uniformity.help': 'Une valeur basse sur un écran signale une fuite de rétroéclairage ou un reflet\u00A0; sur un bureau — une lampe mal placée.',
  'metric.comfort.name': 'Confort visuel',
  'metric.comfort.short': 'Une seule note à la place de six nombres.',
  'metric.comfort.help': 'Il réunit les autres mesures en une note de 0 à 100 et montre ce qui la fait le plus baisser. Les pondérations relèvent de notre jugement éditorial, pas d’une norme.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'bon',
  'zone.warn': 'modéré',
  'zone.crit': 'critique',
  'zone.none': 'aucune donnée',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 août'). */
  'date.month.short.1': 'janv.',
  'date.month.short.2': 'févr.',
  'date.month.short.3': 'mars',
  'date.month.short.4': 'avr.',
  'date.month.short.5': 'mai',
  'date.month.short.6': 'juin',
  'date.month.short.7': 'juil.',
  'date.month.short.8': 'août',
  'date.month.short.9': 'sept.',
  'date.month.short.10': 'oct.',
  'date.month.short.11': 'nov.',
  'date.month.short.12': 'déc.',

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
     dopóki różnica jest mniejsza niż minuta, mówimy „à l’instant”. */
  'time.justNow': 'à l’instant',
  'time.aMinuteAgo': 'il y a une minute',
  'time.minutesAgo': 'il y a {minutes}\u00A0min',
  'time.hoursAgo': 'il y a {hours}\u00A0h',
  'time.yesterday': 'hier',
  'time.daysAgo': 'il y a {days}\u00A0jours',

  /* Formy zależne od liczby. Francuski ma w CLDR trzy: `one` (0 i 1), `many`
     (miliony i zapis skrócony) oraz `other`. Rozstrzyga je Intl.PluralRules
     dla języka aktywnego. */
  'time.days.plural': { one: 'jour', many: 'jours', other: 'jours' },
  'unit.sample.plural': { one: 'échantillon', many: 'échantillons', other: 'échantillons' },
  'unit.measurement.plural': { one: 'mesure', many: 'mesures', other: 'mesures' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Francuski ma jedną — oba klucze zostają (kształt słownika jest wspólny dla
     wszystkich języków), a wartości są tu identyczne. */
  'unit.session.plural': { one: 'session', many: 'sessions', other: 'sessions' },
  'unit.session.accusative.plural': { one: 'session', many: 'sessions', other: 'sessions' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy — po francusku rozróżniamy je nazwą. */
  'unit.chartPoint.plural': { one: 'point de données', many: 'points de données', other: 'points de données' },
  'unit.point.plural': { one: 'point', many: 'points', other: 'points' },
  'unit.kelvin.plural': { one: 'kelvin', many: 'kelvins', other: 'kelvins' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „pour cent”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'pour cent',
  'unit.spoken.times': 'fois',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, bez rady,
     co zrobić dalej. Każdy kod ma tu jedno zdanie diagnozy i jedno zdanie
     rady. */
  'camera.error.denied': 'L’autorisation d’accéder à la caméra n’a pas été accordée. Autorisez la caméra pour cette page dans les réglages du navigateur ou du système et réessayez.',
  'camera.error.notfound': 'Aucune caméra trouvée. Vérifiez que l’appareil en a une et qu’elle n’est pas désactivée dans le système.',
  'camera.error.inuse': 'La caméra est occupée par une autre application. Fermez cette application ou cet onglet et réessayez.',
  'camera.error.insecure': 'La caméra ne fonctionne qu’en HTTPS ou sur localhost. Ouvrez cette page à une adresse commençant par «\u00A0https://\u00A0».',
  'camera.error.unsupported': 'Ce navigateur ne donne pas accès à la caméra ici. Essayez Chrome ou Safari, dans une fenêtre ordinaire — pas dans un aperçu intégré à une autre application.',
  'camera.error.unknown': 'Impossible de démarrer la caméra.'
};
