/* docs/v3/i18n/fr.js — słownik WŁASNY wersji v3, francuski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/fr.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * SKĄD TE ZDANIA: treść idzie z docs/v3/i18n/pl.js (redakcja pierwotna),
 * a rejestr i terminologia z docs/v3/i18n/en.js. To NIE JEST kalka żadnego
 * z nich: zdania przełożono na naturalną francuszczyznę. Bez zmian zostaje to,
 * co niesie znaczenie: liczby, progi, jednostki, nazwy wstawek oraz — co do
 * treści — zastrzeżenia medyczne i zdania o prywatności.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js tego katalogu — pilnuje
 * tego docs/shared/i18n/keys.test.js. Kluczy, które stoją w słowniku wspólnym
 * (nazwy stref, zdania oceniające, noty o granicach metody, nazwy i opisy
 * siedmiu wielkości, zastrzeżenie z rozporządzenia (UE) 2017/745), tu NIE MA —
 * poza jednym świadomym nadpisaniem, opisanym przy 'verdict.critical.comfort'.
 *
 * TERMINOLOGIA JEST WZIĘTA Z docs/shared/i18n/fr.js i nie wolno jej tu ruszać:
 *  • siedem wielkości: part de bleu, luminosité de la scène, température de
 *    couleur, impact circadien (w opisie: rapport mélanopique), papillotement,
 *    uniformité, confort visuel;
 *  • strefy: dans la norme / attention / critique — stąd progi nazywają się
 *    „seuil d’attention” i „seuil critique”, tak żeby nazwa progu i nazwa
 *    strefy, w którą on wprowadza, brzmiały tak samo;
 *  • pozostałe stałe odpowiedniki: grandeur (wielkość), mesure (pomiar),
 *    relevé (odczyt), historique (historia), session (sesja), seuil (próg),
 *    étalonnage (kalibracja), échantillon (próbka), bouton (klawisz),
 *    mire (plansza kontrolna).
 *
 * REJESTR: „vous” konsekwentnie, także w komunikatach błędów.
 * TYPOGRAFIA jak w docs/shared/i18n/fr.js: apostrof ’ (U+2019), cudzysłowy
 * « … », zwykła spacja przed „:”, „?” i znakiem „%”, przecinek dziesiętny.
 *
 * ZAPIS LICZB WE WZORACH. Polska redakcja pisze przecinek dziesiętny
 * („0,3320”), angielska kropkę — francuska przecinek, tak jak polska, bo wzory
 * czyta człowiek, a nie parser. Liczby wstawiane przez '{…}' są osobną sprawą:
 * te formatuje warstwa językowa według aktywnego języka.
 */
window.I18nData = window.I18nData || {};
window.I18nData['fr'] = Object.assign(window.I18nData['fr'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. */
  'app.wordmark': 'MONITEUR DE LUMIÈRE',

  'state.idle': 'Prêt',
  'state.starting': 'Démarrage',
  'state.running': 'Mesure',
  'state.runningTpl': 'Mesure {time}',
  'state.stopped': 'Arrêté',
  'state.error': 'Erreur de caméra',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5,0 po francusku, 5.0 po angielsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'Démarrer la mesure',
  'keys.starting': 'Démarrage…',
  'keys.stop': 'Arrêter',
  'keys.flip': 'Changer',
  'keys.flipAria': 'Changer de caméra, avant ou arrière',
  'keys.menu': 'Menu',
  'keys.menuAria': 'Liste des modules',
  'keys.back': '‹ Retour',
  'keys.backAria': 'Retour au tableau de bord',
  'keys.dash': 'Tableau de bord',
  'keys.zoom': 'Agrandir l’aperçu',
  'keys.retry': 'Réessayer',
  'keys.refresh': 'Actualiser',
  'keys.close': 'Fermer',
  'keys.show': 'Afficher',
  'keys.apply': 'Appliquer',
  'keys.remove': 'Supprimer',

  'monitor.legend': 'Aperçu de contrôle',
  'monitor.badge': 'En direct',

  'aim.title': 'Visée',
  'aim.hint': 'Le cadre montre exactement la partie de l’image que l’application mesure.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'Canal principal',
  'readout.thresholdTpl': '(seuil {value})',
  'readout.contextTpl': 'min {min} · moy. {avg} · max {max} — dernières 60 s',
  'readout.contextEmpty': 'aucune donnée des 60 dernières secondes',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'Ce que cela signifie : {name}',
  'aria.channel': '{name}, {value}, {zone}. Afficher en grand.',
  'aria.channelStale': '{name}, aucune donnée. Afficher en grand.',
  'aria.scale': 'Échelle : {name}, de {min} à {max}. Maintenant {value}, {zone}. Seuil d’attention {warn}, seuil critique {crit}.',
  'aria.readout': '{name} : {value}, {zone}.',
  'aria.readoutApprox': '{name} : environ {value}, {zone}. Valeur approchée.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'Échelle du canal principal. Aucune donnée',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': 'Appuyez sur « Démarrer la mesure », dirigez le téléphone vers une surface éclairée et gardez-le immobile quelques secondes.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'Le confort visuel est bas. Regardez dans le module 01 pour voir ce qui l’abaisse.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'Commencez par le bouton « Démarrer la mesure » en bas de l’écran. La caméra ne s’allume qu’après cet appui.',
  'transient.measureStopped': 'Mesure terminée · {time} · enregistrée dans l’historique.',
  'transient.newVersion': 'Une nouvelle version de l’application est disponible.',
  'transient.thresholdsSaved': 'Seuils enregistrés.',
  'transient.thresholdsRejected': 'Non enregistré — le seuil d’attention et le seuil critique ne peuvent pas se croiser.',
  'transient.historyCleared': 'Historique effacé.',

  'live.lead': 'Canal principal : {name}, {value}, {zone}.',
  'live.ready': 'Verdict prêt. {name} {value}, {zone}.',
  'live.started': 'Mesure démarrée.',
  'livebar.stopped': 'Mesure arrêtée',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'Il n’y a encore aucun enregistrement. L’historique s’écrit pendant la mesure — lancez une mesure d’une minute et revenez ici.',
  'empty.recorderNoRange': 'Aucune mesure dans cette plage.',
  'empty.coverageTpl': 'La mesure a couvert {done} heures sur {total}.',
  'empty.reportsNoData': 'Le rapport journalier apparaîtra après la première journée complète de mesures.',
  'empty.compareOneSession': 'La comparaison demande deux sessions terminées. Vous n’en avez qu’une pour l’instant.',
  'empty.exportNoData': 'Il n’y a rien à exporter. Lancez une mesure pour que l’historique ait du contenu.',
  'empty.alertsOff': 'Les alertes sont désactivées. Une fois activées, elles ne fonctionnent que si l’application est ouverte.',
  'empty.scheduleEmpty': 'Aucune heure n’a été définie. La planification ne fonctionne que si l’application est ouverte.',
  'empty.historyEmpty': 'L’historique est vide.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'Liste des modules',

  'modules.01.title': 'Enregistreur',
  'modules.01.desc': 'Le déroulé de la mesure dans le temps, de la minute à trente jours.',
  'modules.02.title': 'Seuils',
  'modules.02.desc': 'Fixez vos propres limites d’attention et d’alarme pour chaque grandeur.',
  'modules.03.title': 'Étalonnage',
  'modules.03.desc': 'Une référence à une source de lumière connue, et ce que l’étalonnage ne corrige pas.',
  'modules.04.title': 'Rapports',
  'modules.04.desc': 'Des bilans journaliers et hebdomadaires présentés comme une impression.',
  'modules.05.title': 'Export',
  'modules.05.desc': 'L’enregistrement des relevés dans un fichier CSV ou JSON, avec les colonnes décrites.',
  'modules.06.title': 'Comparaison',
  'modules.06.desc': 'Deux sessions côte à côte, avec l’écart donné en chiffres.',
  'modules.07.title': 'Test de l’écran',
  'modules.07.desc': 'Des mires pour vérifier votre propre écran, pas à pas.',
  'modules.08.title': 'Planification',
  'modules.08.desc': 'Des mesures aux heures que vous choisissez.',
  'modules.09.title': 'Alertes',
  'modules.09.desc': 'Une notification dès qu’un seuil est franchi — et quand elle ne fonctionnera pas.',
  'modules.10.title': 'Soutien',
  'modules.10.desc': 'L’application est entièrement gratuite. Ici, vous pouvez offrir un café à l’auteur.',
  'modules.11.title': 'Documentation',
  'modules.11.desc': 'Ce que cette mesure est, et ce qu’elle n’est certainement pas.',
  'modules.12.title': 'Réglages',
  'modules.12.desc': 'Thème, taille du texte, réduction des animations, effacement de l’historique.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'Canaux de mesure',
  'channels.pick': 'Afficher en grand',
  'channels.stale': 'aucune donnée',
  'channels.approx': 'valeur approchée',

  'help.unit': 'Unité',
  'help.range': 'Plage',
  'help.thresholds': 'Seuils',
  'help.warn': 'Seuil d’attention',
  'help.crit': 'Seuil critique',
  'help.now': 'maintenant',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „Grandeur” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'Grandeur',
  'col.unit': 'Unité',
  'col.range': 'Plage',
  'col.direction': 'Sens',
  'col.time': 'Heure',
  'col.date': 'Date',
  'col.zone': 'Zone',
  'col.avg': 'Moyenne',
  'col.min': 'Minimum',
  'col.max': 'Maximum',
  'col.name': 'Colonne',
  'col.meaning': 'Contenu',
  'col.channel': 'Canal',
  'col.gain': 'Gain',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'Plage de temps',
  'recorder.range.60s': '60 s',
  'recorder.range.15min': '15 min',
  'recorder.range.1h': '1 h',
  'recorder.range.24h': '24 h',
  'recorder.range.30d': '30 j',
  'recorder.gap': 'aucune mesure',
  'recorder.sessionTitle': 'Statistiques de la session',
  'recorder.zonesCaption': 'Répartition des zones pour la part de bleu',
  'recorder.tableCaption': 'Relevés de la plage choisie',
  'recorder.crosshair': 'Réticule de lecture',
  'recorder.prevAria': 'Point précédent',
  'recorder.nextAria': 'Point suivant',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'Apparence',
  'settings.themeLabel': 'Thème',
  'settings.themeSystem': 'Comme le système',
  'settings.themeLight': 'Clair',
  'settings.themeDark': 'Sombre',
  'settings.themeHint': 'Le thème « comme le système » change en même temps que le réglage du téléphone.',
  'settings.textLabel': 'Taille du texte',
  /* Mnożnik jako LICZBA we wstawce — 1,15 po francusku, 1.15 po angielsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'Agrandit toute l’interface, pas seulement les lettres — les boutons et les lignes grandissent avec le texte.',
  'settings.motionGroup': 'Animations',
  'settings.motionLabel': 'Réduire les animations',
  'settings.motionHint': 'Désactive toutes les transitions. L’aiguille de l’échelle saute alors une fois par seconde au lieu de glisser.',
  'settings.dataTitle': 'Données',
  'settings.clearLabel': 'Effacer l’historique',
  'settings.clearHintTpl': 'L’historique contient en ce moment {count} points enregistrés.',
  'settings.clearHintEmpty': 'L’historique est vide.',
  'settings.clearTitle': 'Effacer l’historique ?',
  'settings.clearConfirm': 'Effacer tout l’historique des mesures ? C’est irréversible.',
  'settings.clearKey': 'Effacer',
  'settings.aboutTitle': 'À propos de l’application',
  'settings.versionTpl': '{app}, version {version}.',
  'settings.offlineText': 'L’application fonctionne sans réseau. Après la première ouverture, tous ses fichiers sont dans la mémoire du navigateur, si bien que le mode avion n’y change rien. Rien n’est envoyé vers un serveur, car l’application ne fait aucune requête réseau.',
  'settings.docsKey': 'Ouvrir la documentation',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'Annuler',
  'common.save': 'Enregistrer',
  'common.reset': 'Rétablir les valeurs par défaut',
  'common.yes': 'Oui',
  'common.no': 'Non',
  'common.on': 'Activé',
  'common.off': 'Désactivé',
  'common.sep': ' · ',
  'common.stepsTitle': 'Pas à pas',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'À quoi servent vos propres seuils',
  'modules.02.intro': 'Un seuil décide du moment où l’application dit « Attention » et de celui où elle dit « Critique ». Les valeurs par défaut relèvent de notre jugement éditorial, pas d’une norme — si vous mesurez dans d’autres conditions, déplacez-les à votre convenance. Le verdict et la phrase du tableau de bord se calculent aussitôt à partir des nouveaux seuils.',
  'modules.02.orderNormal': 'Le seuil d’attention doit se situer en dessous du seuil critique.',
  'modules.02.orderInvert': 'Ici, une valeur plus élevée est meilleure : le seuil d’attention se situe donc au-dessus du seuil critique.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'Aperçu de l’échelle : {name}',
  'modules.02.nowTpl': 'maintenant {value}',
  'modules.02.resetDone': 'Seuils par défaut rétablis.',
  'modules.02.profilesTitle': 'Profils',
  'modules.02.profilesHint': 'Un profil est un jeu de seuils enregistré pour les sept grandeurs. Appliquer un profil les remplace toutes d’un coup.',
  'modules.02.profileSaveKey': 'Enregistrer les seuils actuels',
  'modules.02.profileNameLabel': 'Nom du nouveau profil',
  'modules.02.profileNameHint': 'Le nom reste sur cet appareil. 40 caractères au maximum.',
  'modules.02.profileNameEmpty': 'Indiquez un nom de profil.',
  'modules.02.profileSavedTpl': 'Profil « {name} » enregistré.',
  'modules.02.profileAppliedTpl': 'Profil « {name} » appliqué.',
  'modules.02.profileRemovedTpl': 'Profil « {name} » supprimé.',
  'modules.02.profileFailed': 'Ce profil n’a pas pu être appliqué.',
  'modules.02.profileCustomTpl': 'Votre propre profil, enregistré le {date}.',
  'modules.02.builtin.default.name': 'Par défaut',
  'modules.02.builtin.default.desc': 'Les seuils du catalogue des grandeurs — le point de départ de toutes les mesures.',
  'modules.02.builtin.evening.name': 'Soir — doux',
  'modules.02.builtin.evening.desc': 'Alerte plus tôt sur la couleur froide et sur l’impact circadien.',
  'modules.02.builtin.work.name': 'Travail de bureau',
  'modules.02.builtin.work.desc': 'Admet une lumière du jour vive et froide ; surveille le papillotement et l’uniformité.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'Pourquoi cela marche',
  'modules.03.why': 'Le capteur d’un appareil photo a un écart constant entre ses canaux. Mesurer une feuille de papier blanche montre l’ampleur de cet écart et permet de le retrancher. C’est la seule fonction de cette application qui améliore réellement la précision — et elle ne transforme toujours pas un appareil photo en spectromètre.',
  'modules.03.steps.1': 'Posez une feuille de papier blanche sous la lumière que vous mesurez.',
  'modules.03.steps.2': 'Appuyez sur « Démarrer la mesure » sur le tableau de bord et remplissez le cadre avec la feuille.',
  'modules.03.steps.3': 'Revenez ici, appuyez sur « Étalonner » et ne bougez pas le téléphone pendant trois secondes.',
  'modules.03.runKey': 'Étalonner (3 s)',
  'modules.03.clearKey': 'Supprimer l’étalonnage',
  'modules.03.busyTpl': 'Mesure de la feuille… il reste {sec} s',
  'modules.03.statusNone': 'Aucun étalonnage. La mesure fonctionne ; prenez les valeurs à titre comparatif.',
  'modules.03.statusOnTpl': 'Étalonné le {date} à {time}.',
  'modules.03.gainsTitle': 'Gains des canaux',
  'modules.03.gainR': 'Rouge',
  'modules.03.gainG': 'Vert',
  'modules.03.gainB': 'Bleu',
  'modules.03.gainsNone': 'non défini',
  'modules.03.needRunning': 'Lancez d’abord la mesure et dirigez la caméra vers une feuille de papier blanche.',
  'modules.03.tooFew': 'Trop peu d’échantillons. Vérifiez que la mesure tourne vraiment.',
  'modules.03.tooDark': 'L’image est trop sombre pour un étalonnage. Éclairez mieux la feuille et réessayez.',
  'modules.03.refused': 'L’écart entre les canaux est trop grand pour être accepté comme étalonnage. Utilisez une feuille blanche dans une lumière uniforme.',
  'modules.03.done': 'Étalonné. La température de couleur et l’impact circadien seront désormais plus précis.',
  'modules.03.cleared': 'Étalonnage supprimé.',
  'modules.03.limitsTitle': 'Ce que l’étalonnage ne corrige pas',
  'modules.03.limits.1': 'L’étalonnage égalise les trois canaux de l’appareil photo, et rien de plus. Il ne donne pas de spectre à la caméra : la température de couleur et l’impact circadien restent des approximations calculées à partir des primaires sRGB.',
  'modules.03.limits.2': 'Il ne transforme pas la luminosité de la scène en grandeur absolue — ce nombre reste relatif. Il ne désactive ni l’exposition automatique ni la balance des blancs, qui déplacent le relevé en dessous.',
  'modules.03.limits.3': 'Il ne se reporte pas sur une autre lumière : un étalonnage fait sous une ampoule décrit cette ampoule. Avec une autre source, refaites-le. Et il ne change rien à ce que cette mesure n’est pas — ce n’est toujours pas un examen ni une base pour diagnostiquer une maladie.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'Période du rapport',
  'modules.04.rangeDay': 'Jour',
  'modules.04.rangeWeek': 'Semaine',
  'modules.04.headTpl': 'Du {from} au {to} · {count} points d’historique.',
  'modules.04.tableTitle': 'Bilan',
  'modules.04.tableCaption': 'Moyenne, minimum et maximum sur la période choisie',
  'modules.04.panoramaTitle': 'Panorama',
  'modules.04.panoramaAriaTpl': 'Panorama : {name}, {span}.',
  'modules.04.panoramaSpanDay': 'les dernières 24 heures réparties par heure',
  'modules.04.panoramaSpanWeek': 'la dernière semaine répartie par jour',
  'modules.04.panoramaHint': 'La hauteur et la couleur d’une barre disent la même chose : dans la norme — basse, attention — moyenne, critique — pleine. Un tiret à la base marque une heure sans mesure.',
  'modules.04.coverageDayTpl': 'La mesure a couvert {done} heures sur {total}.',
  'modules.04.coverageWeekTpl': 'La mesure a couvert {done} jours sur {total}.',
  'modules.04.zonesTitle': 'Répartition des zones',
  'modules.04.zonesCaptionTpl': 'Calculée pour le canal principal : {name}.',
  'modules.04.worstTpl': 'Moment le plus difficile : {value}.',
  'modules.04.worstNone': 'aucun ne ressort',
  'modules.04.worstHourTpl': '{hour}',
  'modules.04.adviceTitle': 'Que faire',
  'modules.04.adviceMelanopicTpl': 'L’impact circadien moyen a été de {value}×. Le soir, il vaut mieux descendre sous 0,50 — le plus simple étant une ampoule plus chaude ou le mode nuit.',
  'modules.04.adviceKelvinTpl': 'La lumière était froide ({value} K en moyenne). Pour travailler, c’est impeccable ; dans les deux heures avant le coucher, en dessous de 3000 K est plus doux.',
  'modules.04.adviceFlickerTpl': 'Un papillotement notable est visible ({value} % en moyenne). Il vient d’ordinaire d’un variateur bon marché ou de l’alimentation du rétroéclairage.',
  'modules.04.adviceUniformityTpl': 'La lumière se répartit inégalement ({value} %). Déplacer la lampe ou changer son angle donne d’ordinaire plus que changer l’ampoule.',
  'modules.04.adviceWorstTpl': 'C’est à {hour} que se concentre le plus de relevés hors des seuils.',
  'modules.04.adviceNone': 'Sur cette période, rien ne dépasse les seuils que vous avez fixés.',
  'modules.04.limitsTitle': 'Ceci n’est pas un conseil de santé',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'Les conclusions découlent uniquement de ce qu’a vu la caméra de ce téléphone. L’application ne mesure pas de spectre et ne pose aucun diagnostic.',
  'modules.04.printHint': 'Cette page est pensée comme une impression : le tableau et les légendes se lisent de la même façon sur le papier, sous la loupe du système et dans un lecteur d’écran.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'Plage de données',
  'modules.05.range1h': 'Heure',
  'modules.05.range24h': 'Jour',
  'modules.05.range7d': '7 jours',
  'modules.05.range30d': '30 jours',
  'modules.05.csvKey': 'Enregistrer le fichier CSV',
  'modules.05.jsonKey': 'Enregistrer le fichier JSON',
  'modules.05.formatTitle': 'Format du fichier',
  'modules.05.formatCsv': 'CSV : le point-virgule sépare les colonnes, la virgule est le séparateur décimal, l’encodage est UTF-8 avec la marque d’ordre des octets (BOM). Un tableur réglé sur une langue qui utilise la virgule comme séparateur décimal — le français, par exemple — ouvre un tel fichier sans rien avoir à régler.',
  'modules.05.formatJson': 'JSON : les mêmes données dans le champ « points », avec un point décimal et un horodatage en millisecondes — c’est ce qu’exige le format.',
  'modules.05.resolution': 'L’historique enregistre un point toutes les 5 secondes et remonte à 30 jours. Le fichier ne contient pas la pleine résolution de cinq échantillons par seconde — le moteur ne la garde qu’une minute.',
  'modules.05.offline': 'Le fichier est créé sur l’appareil et reste sur l’appareil. L’export ne se connecte à aucun réseau.',
  'modules.05.columnsTitle': 'Les colonnes expliquées',
  'modules.05.columnsCaption': 'Les colonnes du fichier et leur signification',
  'modules.05.descDate': 'La date du point d’après l’horloge de l’appareil, écrite jour-mois-année.',
  'modules.05.descTime': 'L’heure du point, à la seconde près.',
  'modules.05.descZone': 'La zone de la part de bleu au moment de l’enregistrement. Le moteur n’enregistre la zone que pour cette seule grandeur — pour les autres, déduisez-la des seuils.',
  'modules.05.descMetricTpl': '{short} Unité : {unit}. Plage {min}–{max}.',
  'modules.05.previewTitle': 'Aperçu',
  'modules.05.previewHint': 'Les cinq premières lignes du fichier, exactement telles qu’elles seront enregistrées.',
  'modules.05.savedTpl': 'Fichier {name} enregistré — {rows} lignes.',
  'modules.05.failed': 'Ce navigateur n’a pas permis d’enregistrer le fichier.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'L’application enregistre sur cet appareil chaque session de mesure terminée. Choisissez-en deux pour les voir sur une même bande et lire l’écart en chiffres.',
  'modules.06.noSessions': 'Il n’y a encore aucune session terminée. Lancez une mesure, arrêtez-la et revenez ici.',
  'modules.06.slotA': 'Session A',
  'modules.06.slotB': 'Session B',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'Bande',
  'modules.06.tapeAriaTpl': 'Déroulé de la session {slot}, grandeur {name}.',
  'modules.06.tapeHint': 'Les deux sessions sont étirées à la même largeur : une barre représente la même fraction de la durée, pas la même heure. La hauteur et la couleur disent la même chose que sur le tableau de bord.',
  'modules.06.tapeChannelTpl': 'La bande montre le canal principal : {name}.',
  'modules.06.diffTitle': 'Écart',
  'modules.06.diffCaption': 'Les moyennes des deux sessions et l’écart entre elles',
  'modules.06.clearKey': 'Supprimer les sessions enregistrées',
  'modules.06.cleared': 'Les sessions enregistrées ont été supprimées.',
  'modules.06.savedTpl': 'Session enregistrée : {dur}.',
  'modules.06.limitsTitle': 'Ce que cette comparaison ne dit pas',
  'modules.06.limits': 'Vous comparez deux mesures, pas deux sources de lumière. Si le cadrage, la distance, l’heure de la journée ou la position du téléphone ont changé entre les sessions, l’écart parle aussi de cela. La comparaison la plus honnête, c’est la même scène avant et après un changement d’éclairage.',
  'modules.06.keepTpl': 'Au plus {count} sessions les plus récentes sont conservées.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'Les mires de contrôle s’affichent en plein écran sur cet appareil. Elles servent à regarder l’écran à l’œil : le blanc est-il uniforme, les gris tirent-ils sur une couleur et le rétroéclairage fuit-il dans les coins.',
  'modules.07.steps.1': 'Réglez la luminosité de l’écran sur celle à laquelle vous travaillez d’habitude et désactivez le mode nuit du système.',
  'modules.07.steps.2': 'Choisissez une mire dans la liste ci-dessous. Elle remplira tout l’écran.',
  'modules.07.steps.3': 'Regardez depuis une soixantaine de centimètres, perpendiculairement à l’écran. Puis regardez la même mire de biais.',
  'modules.07.steps.4': 'Sortez avec le bouton « Fermer la mire » ou la touche Échap et passez à la suivante.',
  'modules.07.planesTitle': 'Mires',
  'modules.07.exitKey': 'Fermer la mire',
  'modules.07.showAriaTpl': 'Afficher la mire : {name}',
  'modules.07.planeAriaTpl': 'Mire de contrôle : {name}. Le bouton de fermeture est en bas de l’écran.',
  'modules.07.plane.white.name': 'Blanc',
  'modules.07.plane.white.hint': 'Cherchez les taches, les dominantes de couleur et les zones plus claires près des bords. Le blanc devrait être d’une seule couleur sur toute la surface.',
  'modules.07.plane.gray75.name': 'Gris 75 %',
  'modules.07.plane.gray75.hint': 'Le gris doit être gris. Une dominante verdâtre ou rosée signale que la balance des blancs de l’écran a dérivé.',
  'modules.07.plane.gray50.name': 'Gris 50 %',
  'modules.07.plane.gray50.hint': 'La meilleure mire pour juger d’une dominante. Comparez le centre et les coins.',
  'modules.07.plane.gray25.name': 'Gris 25 %',
  'modules.07.plane.gray25.hint': 'Le gris foncé révèle les fuites du rétroéclairage et les bandes sur les dalles bon marché.',
  'modules.07.plane.black.name': 'Noir',
  'modules.07.plane.black.hint': 'Dans une pièce sombre, on y voit chaque fuite du rétroéclairage et chaque coin éclairci.',
  'modules.07.plane.red.name': 'Rouge pur',
  'modules.07.plane.red.hint': 'Un rouge uniforme révèle les sous-pixels morts et les irrégularités de la dalle.',
  'modules.07.plane.green.name': 'Vert pur',
  'modules.07.plane.green.hint': 'Le vert porte le plus de luminosité — c’est sur lui qu’un pixel abîmé se repère le plus facilement.',
  'modules.07.plane.blue.name': 'Bleu pur',
  'modules.07.plane.blue.hint': 'Le bleu montre la saleté et les traces sur la surface de l’écran mieux que le blanc.',
  'modules.07.plane.grid.name': 'Grille',
  'modules.07.plane.grid.hint': 'Les lignes doivent être aussi nettes dans les coins qu’au centre. Un flou sur les bords relève de la mise à l’échelle de l’image.',
  'modules.07.warn': 'Une mire couvre tout l’écran, le tableau de bord et le bouton de mesure compris. C’est le seul endroit de l’application où cela arrive, et c’est pourquoi le bouton de sortie est grand et toujours visible. Tant que la mire est à l’écran, la mesure continue et ne peut pas être arrêtée — fermez la mire pour revenir aux boutons.',
  'modules.07.cameraTitle': 'Ce que vous ne ferez pas ici',
  'modules.07.camera': 'Un téléphone ne voit pas son propre écran : vous ne mesurerez donc pas ces mires avec le même appareil. Pour mesurer un moniteur, affichez la mire sur le moniteur et mesurez avec le téléphone — deux appareils différents et deux rôles différents.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'La planification vous rappelle de mesurer à une heure fixée. Elle n’allume pas la caméra toute seule : à l’heure prévue, elle affiche un rappel, et vous lancez la mesure avec le bouton « Démarrer la mesure » sur le tableau de bord. Comme la première fois.',
  'modules.08.onlyOpenTitle': 'Quand cela ne fonctionnera pas',
  'modules.08.onlyOpen': 'La planification ne fonctionne que si l’application est ouverte. Un onglet de navigateur fermé ne compte pas le temps et ne rappellera rien. Nous ne demandons pas l’autorisation d’envoyer des notifications système et nous n’envoyons rien sur le réseau.',
  'modules.08.enableLabel': 'Activer les rappels',
  'modules.08.timesTitle': 'Heures',
  'modules.08.timeAriaTpl': 'Heure {n} : heure du rappel',
  'modules.08.addKey': 'Ajouter une heure',
  'modules.08.removeAriaTpl': 'Supprimer l’heure {time}',
  'modules.08.addedTpl': 'Heure {time} ajoutée.',
  'modules.08.removedTpl': 'Heure {time} supprimée.',
  'modules.08.badTime': 'Indiquez l’heure au format 22:00.',
  'modules.08.nextTpl': 'Prochain rappel : {time}.',
  'modules.08.nextNone': 'Les rappels sont désactivés.',
  'modules.08.dueTpl': 'Heure de mesure prévue : {time}.',
  'modules.08.dueKey': 'Afficher le tableau de bord',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'Une alerte surveille une seule grandeur et ne se manifeste que lorsque celle-ci reste dans la zone choisie sans interruption pendant la durée fixée. Elle n’arrête jamais la mesure et ne couvre jamais les boutons.',
  'modules.09.enableLabel': 'Activer les alertes',
  'modules.09.metricLabel': 'Grandeur surveillée',
  'modules.09.levelLabel': 'À partir de quelle zone',
  'modules.09.levelWarning': 'À partir de « Attention »',
  'modules.09.levelCritical': 'Seulement « Critique »',
  'modules.09.sustainLabel': 'Après combien de secondes sans interruption',
  'modules.09.sustainHint': 'Des durées plus courtes donnent plus de fausses alertes quand vous déplacez le téléphone. Nous ne descendons pas sous cinq secondes.',
  'modules.09.soundLabel': 'Un bref signal sonore',
  'modules.09.soundHint': 'Le son est produit sur l’appareil. Rien n’est téléchargé depuis le réseau.',
  'modules.09.cooldownHint': 'Au plus une alerte toutes les deux minutes. Une alarme répétée à chaque échantillon est une alarme que l’on finit par désactiver pour de bon.',
  'modules.09.whenNotTitle': 'Quand une alerte ne fonctionnera pas',
  'modules.09.whenNot': 'La notification vit à l’intérieur de l’application, pas dans le système. Elle ne fonctionnera pas quand l’application est fermée ou cachée en arrière-plan, quand aucune mesure ne tourne, ni quand la grandeur surveillée ne peut pas être mesurée à cet instant. Nous ne demandons pas l’autorisation d’envoyer des notifications système.',
  'modules.09.firedTpl': '{name} : {zone} depuis {sec} s — maintenant {value}.',
  'modules.09.saved': 'Réglages de l’alerte enregistrés.',
  'modules.09.statusOnTpl': 'Surveillance : {name}, {level}, après {sec} s.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'Cette application est gratuite',
  'support.freeText': 'Les sept grandeurs affichent des chiffres dès le premier lancement. L’enregistreur, les seuils, l’étalonnage, les rapports, l’export, la comparaison de sessions et tout l’historique de trente jours fonctionnent sans compte, sans frais et sans limite — de la même façon hors ligne. Rien ici n’est mis de côté contre paiement pour plus tard.',
  'support.whyTitle': 'Pourquoi je le demande',
  'support.whyText': 'Je fais et j’entretiens Moniteur de lumière seul, après les heures de travail. Le soutien paie le temps nécessaire aux corrections, aux tests sur d’autres téléphones et aux prochains outils de la liste des modules. Rien ne cessera de fonctionner si personne ne verse quoi que ce soit.',
  'support.nothingTitle': 'Ce que donne un don',
  'support.nothingText': 'Rien. Aucun chiffre, aucun module et aucun réglage ne se déverrouille après un don, parce que tout est déverrouillé depuis le début. Il reste seulement que je sais que cela a servi à quelqu’un.',
  'support.keyTitle': 'Si vous voulez aider',
  'support.keyLabel': 'Offrez-moi un café',
  'support.keyAria': 'Offrez-moi un café — ouvre une page externe dans un nouvel onglet',
  'support.serviceText': 'Le profil de dons est tenu par un service externe, par exemple Buy Me a Coffee. L’application n’en charge ni script, ni widget, ni image — il n’y a ici qu’un lien ordinaire, et rien d’autre.',
  'support.privacyText': 'Appuyer sur ce bouton ouvre une page externe dans un nouvel onglet, et c’est le seul moment où quelque chose quitte cet appareil. Les mesures, l’historique et les réglages restent là où ils étaient — dans la mémoire de ce navigateur.',
  'support.privacyPendingText': 'Dès que l’adresse sera disponible, appuyer sur le bouton ouvrira une page externe dans un nouvel onglet, et ce sera le seul moment où quelque chose quitte cet appareil. Les mesures, l’historique et les réglages restent là où ils étaient — dans la mémoire de ce navigateur.',
  'support.emptyTitle': 'Le profil n’est pas encore relié',
  'support.emptyText': 'L’adresse du profil de dons n’a pas encore été saisie : il n’y a donc pas ici de bouton qui mènerait nulle part. Le reste de l’application fonctionne sans changement — rien n’attend ce don.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'Ce que cette application NE mesure PAS',
  'docs.notList.1': 'Elle ne mesure pas de spectre. Un appareil photo a trois canaux de couleur larges, une exposition automatique et une balance des blancs automatique.',
  'docs.notList.2': 'Elle ne mesure pas de valeurs absolues. La luminosité de la scène est un indicateur relatif, pas le résultat d’une mesure photométrique.',
  'docs.notList.3': 'Elle ne mesure pas directement la température de couleur. La température de couleur et l’impact circadien sont des approximations calculées à partir des primaires sRGB.',
  'docs.notList.4': 'Elle ne voit pas le papillotement du secteur. Un échantillonnage à 5 Hz ne voit les pulsations qu’en dessous de 2,5 Hz — les 100 Hz du secteur sont hors de portée et l’application ne les donnera jamais comme résultat.',
  'docs.notList.5': 'Elle ne pose pas de diagnostic et ne donne pas de conseil de santé. Aucun résultat n’est ni l’un ni l’autre.',
  'docs.notList.6': 'Elle ne compare votre lumière à aucune référence officielle. Les seuils sont des réglages que vous pouvez changer dans le module 02.',
  'docs.whatTitle': 'Ce qu’elle mesure, et comment',
  'docs.whatLead': 'La caméra du téléphone regarde une surface éclairée, et cinq fois par seconde l’application calcule les moyennes des canaux R, G et B de la partie centrale de l’image. De ces trois nombres elle tire sept indicateurs.',
  'docs.whatCrop': 'Cette partie, ce sont les 60 % centraux de la largeur et les 60 % de la hauteur de l’image — exactement le rectangle que trace le viseur sur l’écran VISÉE. Rien en dehors n’est compté.',
  'docs.whatRate': 'Un échantillon toutes les 200 ms, soit 5 fois par seconde. La dernière minute reste en mémoire en pleine résolution ; tout ce qui est plus ancien est enregistré toutes les 5 secondes et remonte à trente jours.',
  'docs.metricsTitle': 'Les sept grandeurs',
  'docs.formulasTitle': 'Formules',
  'docs.formula.share.formula': 'part de bleu = B / (R + G + B) × 100 %',
  'docs.formula.share.text': 'Calculée sur les valeurs sRGB sans inverser la gamma — délibérément, car c’est la même définition que dans la version précédente de l’application : les seuils fixés autrefois veulent donc toujours dire la même chose. Elle sépare la couleur de la luminosité.',
  'docs.formula.brightness.formula': 'luminosité = (R + G + B) / 3 / 255 × 100 %',
  'docs.formula.brightness.text': 'La valeur moyenne des canaux en pourcentage de la plage. L’exposition automatique la déplace en dessous : c’est donc un indicateur relatif — comparez deux scènes plutôt que de lire un seul chiffre comme une mesure.',
  'docs.formula.kelvin.title': 'Température de couleur — l’approximation de McCamy',
  'docs.formula.kelvin.formula': 'n = (x − 0,3320) / (y − 0,1858)\nCCT = −449 n³ + 3525 n² − 6823,3 n + 5520,33',
  'docs.formula.kelvin.text': 'Nous inversons d’abord la gamma sRGB, puis nous passons par la matrice vers CIE XYZ pour le blanc D65 et nous calculons la chromaticité x, y. La formule de McCamy est fiable à peu près entre 2000 K et 12500 K. En dehors de cette plage, la cubique dérive : le résultat est donc écrêté et signalé comme peu fiable — la ligne de base de l’échelle devient alors pointillée et la phrase « hors du domaine de la méthode » apparaît.',
  'docs.formula.melanopic.title': 'Impact circadien — le rapport mélanopique',
  'docs.formula.melanopic.formula': 'mel = 0,0016 R + 0,3110 G + 0,8460 B\nY = 0,2127 R + 0,7152 G + 0,0722 B\nrésultat = (mel / Y) × normalisation à 1,00 pour le blanc neutre',
  'docs.formula.melanopic.text': 'Les trois canaux en valeurs linéaires. La vraie grandeur est l’intégrale du spectre avec la courbe de sensibilité de la mélanopsine (pic autour de 490 nm) ; un appareil photo a trois canaux larges, nous pondérons donc les primaires sRGB par la sensibilité mélanopique à leurs longueurs d’onde approximatives (R 612 nm, G 549 nm, B 465 nm). Le sens de la variation est fiable, la valeur absolue ne l’est pas — c’est pourquoi ce nombre porte le signe « ≈ ».',
  'docs.formula.flicker.formula': 'papillotement = (max − min) / (max + min) × 100 %',
  'docs.formula.flicker.text': 'La définition de l’IES, calculée sur une fenêtre d’échantillons de luminosité. Nous estimons la fréquence d’après le nombre de passages du signal par sa valeur moyenne. Un échantillonnage à 5 Hz ne voit la modulation qu’en dessous de 2,5 Hz (la limite de Nyquist), et nous ne tenons une fréquence pour fiable qu’entre 0,2 et 2 Hz, à partir d’une amplitude de 0,5 % — en dessous de ce seuil, les passages par la moyenne sont du bruit du capteur, pas la pulsation d’une source.',
  'docs.formula.uniformity.formula': 'uniformité = case la plus sombre / case la plus claire × 100 %',
  'docs.formula.uniformity.text': 'Nous divisons la partie centrale en neuf cases dans une grille 3×3 et nous comparons les extrêmes. 100 %, c’est une lumière répartie parfaitement uniformément. Une valeur faible sur un écran signale une fuite du rétroéclairage ou un reflet ; sur un bureau, une lampe mal placée. C’est la seule grandeur, avec le confort, où plus haut veut dire meilleur.',
  'docs.formula.comfort.formula': '100 points moins les pénalités :\nimpact circadien au-dessus de 0,75 — jusqu’à 35 pts\ncouleur au-dessus de 4000 K — jusqu’à 25 pts\npapillotement au-dessus de 5 % — jusqu’à 25 pts\nuniformité en dessous de 60 % — jusqu’à 15 pts',
  'docs.formula.comfort.text': 'Un seul verdict au lieu de six chiffres. Une grandeur qui n’a pas pu être mesurée ne donne aucune pénalité — une donnée absente ne se fait jamais passer pour un bon résultat. Les pondérations relèvent de notre jugement éditorial, pas d’une norme ; c’est pourquoi le module 01 montre le détail par composante, afin qu’il soit possible de ne pas être d’accord avec ce verdict.',
  'docs.rangesTitle': 'Plages et seuils',
  'docs.rangesLead': 'Les seuils ci-dessous sont ceux qui s’appliquent en ce moment — si vous les avez changés dans le module 02, le tableau montre vos valeurs, pas celles d’usine.',
  'docs.dirNormal': 'plus bas veut dire plus doux',
  'docs.dirInvert': 'plus haut veut dire meilleur',
  'docs.privacyTitle': 'Données et vie privée',
  'docs.privacyText': 'L’image de la caméra n’est envoyée ni enregistrée nulle part — de chaque image ne restent que trois nombres. Les mesures, les seuils et les réglages sont dans la mémoire du navigateur, sur cet appareil. L’application ne fait aucune requête réseau et fonctionne hors ligne.',
  'docs.mdrTitle': 'Avertissement',
  'docs.freeText': 'L’application est entièrement gratuite et le reste : les sept grandeurs, l’historique, les rapports, l’export et le mode hors ligne fonctionnent sans compte, sans frais et sans limite. Qui veut dire merci trouvera le module 10, « Soutien ».',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'L’application s’est chargée de façon incomplète',
  'boot.filesTpl': 'Ces fichiers ne se sont pas chargés : {list}.',
  'boot.modulesTpl': 'Ces modules ne se sont pas annoncés : {list} — ces entrées ne s’ouvriront pas depuis la liste.',
  'boot.modulesRangeTpl': 'modules {from}–{to}',
  'boot.tail': 'Rechargez la page. Si cela n’aide pas, les fichiers sur le serveur sont incomplets.',
  'boot.loss.bus': 'les modules cesseront de se voir et la mesure ne démarrera pas',
  'boot.loss.metrics': 'aucune valeur ne sera calculée',
  'boot.loss.scaleCore': 'la géométrie de l’échelle et le formatage des nombres disparaîtront',
  'boot.loss.scaleText': 'tous les textes de l’interface disparaîtront',
  'boot.loss.shell': 'aucun module ne pourra être ouvert',
  'boot.loss.engine': 'la caméra et la mesure ne démarreront pas',
  'boot.loss.dash': 'le tableau de bord restera vide'
});
