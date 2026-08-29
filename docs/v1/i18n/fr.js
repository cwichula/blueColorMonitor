/* docs/v1/i18n/fr.js — słownik WŁASNY wersji v1, francuski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka. Kolejność jest treścią umowy: plik wersji dokłada się do tego samego
 * obiektu i może nadpisać dowolny klucz wspólny — nigdy odwrotnie.
 *
 * DLACZEGO TEN SŁOWNIK JEST SAMOWYSTARCZALNY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar w app.js, własne
 * dwie wielkości zamiast siedmiu i własne nazwy stref („Sans risque” zamiast
 * wspólnego „Dans la norme”). Dlatego wszystko, co v1 pokazuje, stoi TUTAJ —
 * także klucze, które przypadkiem brzmią tak samo jak wspólne. Gdyby kiedyś
 * warstwa wspólna zmieniła brzmienie stref albo nazwę aplikacji, v1 ma zostać
 * nietknięta.
 *
 * SKĄD TE ZDANIA: przełożono je z pl.js (treść) i z en.js (terminologia oraz
 * rejestr), zdanie po zdaniu, bez skracania i bez dopisywania. Zachowane
 * zostało to, co niesie znaczenie: liczby, progi, jednostki, nazwy wstawek
 * i — co do treści — zastrzeżenia medyczne oraz akapity o prywatności. Tych
 * ostatnich nie wolno osłabiać ani wzmacniać.
 *
 * REJESTR: „vous” w całym pliku, tak jak w docs/v5/js/i18n/locales/fr.js.
 * TYPOGRAFIA za docs/shared/i18n/fr.js: apostrof ’ (U+2019), cudzysłowy
 * francuskie « … », spacja przed „:”, „;”, „?” i przed znakiem %, przecinek
 * dziesiętny. Dzięki apostrofowi ’ nic w tym pliku nie wymaga poprzedzania.
 *
 * TERMINOLOGIA ZE SŁOWNIKA WSPÓLNEGO: „part de bleu”, „luminosité de la
 * scène”, „température de couleur”, „relevé” (odczyt), „seuil” (próg),
 * „étalonnage” (kalibracja). Nazwy pięciu wielkości, których v1 nie mierzy,
 * NIE zostały stąd przeniesione.
 * STREFY: „Sans risque / Modérée / Nocive” — te same słowa co w v5, ale
 * w rodzaju żeńskim, bo w v1 stoją jako przydawka do „zone” (jak polskie
 * „strefa bezpieczna”).
 *
 * MARKUP W WARTOŚCIACH. Część kluczy (rozdziały Dokumentacji) zawiera znaczniki
 * <b>, <i>, <code> i encje HTML. Wstawiane są przez data-i18n-html, czyli tylko
 * tam, gdzie autor tekstu świadomie tego chciał — nigdy do treści pochodzącej
 * od użytkownika.
 */
window.I18nData = window.I18nData || {};
window.I18nData['fr'] = Object.assign(window.I18nData['fr'] || {}, {

  /* ---- aplikacja ---- */

  'app.name': 'Moniteur de lumière nocive',
  'app.description': 'Mesure avec la caméra l’intensité de la couleur bleue sur un écran et la présente sur un graphique clair avec des zones : sans risque, modérée, nocive.',

  /* ---- wybór języka ---- */

  'language.label': 'Langue',
  'language.help': 'La langue de toute l’application. Toutes les langues sont déjà sur cet appareil — rien n’est téléchargé et rien n’est envoyé nulle part.',
  'language.auto': 'Comme l’appareil',

  /* ---- nawigacja ---- */

  'nav.aria': 'Menu principal',
  'nav.tabsAria': 'Vues de l’application',
  'nav.announce': 'Écran : {screen}',
  'nav.camera': 'Caméra',
  'nav.monitoring': 'Suivi',
  'nav.support': 'Soutien',
  'nav.more': 'Plus',
  'nav.docs': 'Documentation',
  'nav.about': 'À propos et contact',
  'nav.settings': 'Seuils d’alerte',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← Retour',
  'action.back.aria': 'Revenir à l’écran précédent',
  'action.openDocs': 'Aller à la documentation',
  'action.exportCsv': 'Exporter en CSV',
  'action.delete': 'Supprimer',
  'action.closeNotification': 'Fermer la notification',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref: przymiotnik odmieniony do rodzaju żeńskiego
     („zone modérée”), a nie wspólne „Dans la norme”. Wersja plakatowa
     (zone.badge.*) jest osobnym kluczem, a nie zapisem wielkimi literami przez
     CSS: tureckie „i” i greckie akcenty nie znoszą automatycznej zamiany. */

  'zone.good': 'Sans risque',
  'zone.warning': 'Modérée',
  'zone.critical': 'Nocive',
  'zone.none': 'Aucune donnée',

  'zone.badge.good': 'SANS RISQUE',
  'zone.badge.warning': 'MODÉRÉE',
  'zone.badge.critical': 'NOCIVE',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'Luminosité du canal B',
  'metric.raw.unitLabel': '% de luminosité du canal B',
  'metric.share.name': 'Part de bleu',
  'metric.share.longName': 'Part de bleu dans la lumière',
  'metric.share.unitLabel': '% de part de bleu',
  'stat.overallBrightness': 'Luminosité générale de la scène',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': 'Aperçu de la caméra',
  'camera.pressStart': 'Appuyez sur « Start ».',
  'camera.start': 'Start',
  'camera.stop': 'Stop',
  'camera.switch': 'Changer de caméra',
  'camera.error': 'Impossible de démarrer la caméra. Vérifiez l’autorisation d’accès à la caméra dans le navigateur et réessayez. ({message})',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': 'Relevés actuels',
  'disclaimer.short': 'Résultat approximatif. Ce n’est pas un dispositif médical.',
  'disclaimer.more': 'Plus',

  /* ---- wykresy ---- */

  'chart.aria': 'Graphiques dans le temps',
  'chart.title': 'Graphiques dans le temps (dernières {seconds} s)',
  'chart.empty': 'Démarrez la caméra pour voir le graphique',
  'chart.axis.past': '-{seconds}s',
  'chart.axis.now': 'maintenant',
  'chart.raw.aria': 'Graphique de la luminosité du canal B dans le temps, avec les zones sans risque, modérée et nocive indiquées',
  'chart.share.aria': 'Graphique de la part de bleu dans la lumière dans le temps, avec les zones sans risque, modérée et nocive indiquées',

  /* ---- tabela odczytów ---- */

  'table.show': 'Afficher en tableau',
  'table.hide': 'Masquer le tableau',
  'table.caption': 'Derniers relevés (le plus récent en haut)',
  'table.col.time': 'Heure',
  'table.col.zone': 'Zone',

  /* ---- ustawienia progów ---- */

  'settings.title': 'Réglages des seuils de zones',
  'settings.boundary.critical': 'Limite jaune / rouge :',
  'settings.boundary.warning': 'Limite vert / jaune :',

  /* ---- historia i raport (features.js) ---- */

  'history.title': 'Historique et rapport',
  'history.rangeAria': 'Plage de l’historique',
  'history.unavailable': 'Les données de l’historique sont momentanément indisponibles.',
  'history.empty': 'Aucun relevé enregistré dans cette plage. Démarrez une mesure — l’historique se constitue tout seul.',
  'history.savedReadings': 'Relevés enregistrés : {count}. Répartition du temps par zone :',
  'history.zoneLine': '{zone} : {percent} % ({readings})',

  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 jours',
  'range.30d': '30 jours',

  'report.dailyTitle': 'Rapport quotidien',
  'report.empty': 'Le rapport apparaîtra lorsque des relevés seront enregistrés dans la plage choisie.',
  'report.dailyCaption': 'Part du temps passé dans chaque zone, jour après jour',
  'report.col.day': 'Jour',
  'report.col.week': 'Semaine',
  'report.col.readings': 'Relevés',
  'report.compare.day': 'Comparaison d’un jour à l’autre : {day} — {percent} % du temps dans la zone nocive, {change}',
  'report.compare.dayPending': 'La comparaison d’un jour à l’autre apparaîtra après un deuxième jour de mesures.',
  'report.compare.week': 'Comparaison d’une semaine à l’autre : {week} — {percent} % du temps dans la zone nocive, {change}',
  'report.compare.weekPending': 'La comparaison d’une semaine à l’autre apparaîtra après une deuxième semaine de mesures.',
  'report.change.same': 'autant que {other}.',
  'report.change.more': '{points} de plus que {other}.',
  'report.change.less': '{points} de moins que {other}.',
  'report.peak': 'C’est entre {from} et {to} que sont tombés le plus de relevés dans la zone nocive.',
  'report.peak.none': 'Aucun relevé dans la zone nocive n’a été enregistré dans cette plage.',
  'report.weeklyTitle': 'Rapport hebdomadaire',
  'report.weeklyEmpty': 'Le rapport hebdomadaire apparaîtra lorsque des relevés seront enregistrés dans la plage choisie.',
  'report.weeklyCaption': 'Part du temps passé dans chaque zone, semaine après semaine',
  'report.weekLabel': 'Semaine {week} ({year})',
  'report.footnote': 'Les chiffres sont la part des relevés enregistrés dans la plage choisie, et non le temps d’exposition exact.',

  /* ---- profile progów ---- */

  'profiles.title': 'Profils de seuils',
  'profiles.empty': 'Vous n’avez encore enregistré aucun profil.',
  'profiles.itemActive': '{name} (actif)',
  'profiles.applyAria': 'Appliquer le profil {name}',
  'profiles.deleteAria': 'Supprimer le profil {name}',
  'profiles.applied': 'Profil « {name} » appliqué.',
  'profiles.deleted': 'Profil « {name} » supprimé.',
  'profiles.saved': 'Profil « {name} » enregistré.',
  'profiles.namePlaceholder': 'Nom du profil (par exemple Soir)',
  'profiles.saveLabel': 'Enregistrer les seuils actuels comme profil',
  'profiles.saveBtn': 'Enregistrer le profil',
  'profiles.needName': 'Indiquez un nom de profil.',
  'profiles.limit': {
    one: 'Vous pouvez enregistrer au maximum {n} profil. Supprimez-en un pour en ajouter un autre.',
    many: 'Vous pouvez enregistrer au maximum {n} de profils. Supprimez-en un pour en ajouter un autre.',
    other: 'Vous pouvez enregistrer au maximum {n} profils. Supprimez-en un pour en ajouter un autre.'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku też — ale musi
     zostać bezpieczna dla systemu plików: bez ukośników i dwukropków. */

  'csv.header': 'heure;canal_b_pct;part_bleu_pct;luminosite_scene_pct;zone',
  'csv.filename': 'moniteur-lumiere-{stamp}.csv',
  'csv.empty': 'Il n’y a aucun relevé à exporter. Démarrez une mesure et réessayez.',
  'csv.done': '{readings} exportés dans un fichier CSV.',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut: po polsku wypada tam dopełniacz („od
     5 minut”), po francusku przy wielkich liczbach dochodzi „de” („depuis
     1 000 000 de minutes”) — i właśnie dlatego pisze się całe zdanie. */

  'alert.exposure': {
    one: 'Alerte de seuil : depuis {n} minute, le relevé est dans la zone nocive. Envisagez une pause, ou de réduire la part de bleu sur l’écran.',
    many: 'Alerte de seuil : depuis {n} de minutes, le relevé est dans la zone nocive. Envisagez une pause, ou de réduire la part de bleu sur l’écran.',
    other: 'Alerte de seuil : depuis {n} minutes, le relevé est dans la zone nocive. Envisagez une pause, ou de réduire la part de bleu sur l’écran.'
  },

  'session.title': 'Résumé de la dernière session',
  'session.line': 'Temps de mesure : {duration}. Relevés enregistrés : {count}.',
  'session.zoneLine': '{zone} : {percent} % du temps de la session.',
  'session.endedAt': 'Le résumé porte sur la session terminée à {time}.',
  'session.toast': 'Session terminée : {duration}, {readings}, {percent} % du temps dans la zone nocive.',

  'duration.seconds': '{n} s',
  'duration.minutesSeconds': '{minutes} min {seconds} s',

  /* ---- liczebniki ----
     Francuski ma trzy kategorie CLDR: one (0 i 1), many (wielkie liczby, przed
     którymi francuski wstawia „de”) i other — cała reszta. Formę wybiera
     Intl.PluralRules('fr'), nie nasza reguła. */

  'count.readings': { one: '{n} relevé', many: '{n} de relevés', other: '{n} relevés' },
  'count.points': {
    one: '{n} point de pourcentage',
    many: '{n} de points de pourcentage',
    other: '{n} points de pourcentage'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': 'Plus',
  'more.section.settings': 'RÉGLAGES',
  'more.section.help': 'AIDE',
  'more.thresholds.title': 'Seuils d’alerte',
  'more.thresholds.sub': 'Fixez les limites des zones sans risque, modérée et nocive.',
  'more.docs.title': 'Documentation',
  'more.docs.sub': 'Comment fonctionne la mesure, les unités, les normes et les zones.',
  'more.about.title': 'À propos et contact',
  'more.about.sub': 'Version, confidentialité et contact.',
  'more.free': 'L’application est entièrement gratuite.',
  'more.supportLink': 'Vous pouvez la soutenir librement.',
  'more.version': 'Version {version} · Toutes les fonctions accessibles sans compte et sans frais',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': 'À propos et contact',
  'about.version': 'Version {version}',
  'about.what.title': 'Ce qu’est cette application',
  'about.what.p1': '{app} mesure avec la caméra du téléphone la quantité de lumière bleue que le capteur enregistre, et la montre sur deux cadrans ainsi que sur des graphiques avec des zones. Toutes les fonctions — la mesure, l’historique, les rapports, les profils de seuils, l’alerte de seuil, l’export CSV et la Documentation — sont accessibles à tout le monde, sans compte et sans frais.',
  'about.what.p2': 'L’application est fournie « telle quelle », pour un usage informatif. Le résultat d’une mesure est approximatif et ne constitue pas une base pour des décisions de santé.',
  'about.privacy.title': 'Confidentialité et données',
  'about.privacy.p1': 'L’image de la caméra est analysée uniquement sur votre appareil et n’est jamais envoyée à un quelconque serveur. Nous ne créons pas de comptes et nous ne collectons pas vos données. Les réglages de seuils, les profils et l’historique des mesures ne sont enregistrés que dans la mémoire de cet appareil et de ce navigateur.',
  'about.privacy.p2': 'L’application n’affiche pas de publicité et ne s’adresse pas au réseau. La seule exception est le bouton de l’écran « Soutien » : quand vous appuyez dessus, le navigateur ouvre une page externe dans un nouvel onglet. Rien ne se passe tant que vous ne le faites pas vous-même.',
  'about.contact.title': 'Contact',
  'about.contact.p1': 'Remarques, bugs et suggestions : [E-MAIL]. Nous répondons dès que nous le pouvons — ce projet est entretenu après les heures de travail.',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': 'Soutien',
  'support.free.title': 'Tout est accessible',
  'support.free.text': 'Toute l’application est gratuite : la mesure, l’historique et les rapports, les profils de seuils, l’alerte, l’export CSV et la Documentation. Tout fonctionne tout de suite, sans compte, sans limite et sans connexion internet.',
  'support.why': '{app} se construit après les heures de travail. Si elle vous sert, vous pouvez m’offrir un café. Cela aide à faire vivre l’application et à la mener plus loin — améliorer la mesure, étoffer la Documentation et la vérifier sur d’autres téléphones.',
  'support.nothing': 'Un don ne débloque rien. Il n’y a pas de version meilleure ni de version moins bonne — après votre soutien, l’application fonctionne exactement de la même façon. La seule différence, c’est que l’auteur sait que cela a servi à quelqu’un.',
  'support.button': 'Offrez-moi un café',
  'support.button.aria': 'Offrez-moi un café — ouvre le profil de dons dans un nouvel onglet',
  'support.pending': 'Le profil de dons n’est pas encore connecté. Dès qu’il le sera, le bouton se tiendra à cet endroit. D’ici là, il n’y a rien à faire — l’application est de toute façon entièrement gratuite.',
  'support.privacy': 'Le bouton ouvre une page externe (Buy Me a Coffee) dans un nouvel onglet du navigateur. C’est le seul moment où quoi que ce soit quitte cet appareil. L’image de la caméra et toutes vos mesures restent ici — elles ne sont envoyées nulle part, ni avant que vous appuyiez, ni après.',
  'support.privacyPending': 'Quand l’adresse sera disponible, appuyer sur le bouton ouvrira une page externe (Buy Me a Coffee) dans un nouvel onglet du navigateur. Ce sera le seul moment où quoi que ce soit quitte cet appareil. L’image de la caméra et toutes vos mesures restent ici — elles ne sont envoyées nulle part.',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': 'Documentation',

  'disclaimer.title': 'Ce n’est pas un dispositif médical',
  'disclaimer.body.docs': 'Cette application n’est pas un dispositif médical. Elle ne sert pas à diagnostiquer, traiter ni prévenir une quelconque maladie. Les résultats mesurés avec la caméra d’un téléphone sont approximatifs et ne remplacent ni un examen ni l’avis d’un médecin. Pour les questions de santé oculaire, consultez un médecin ou un optométriste. Les seuils de zones de cette application ne reproduisent aucune norme de sécurité — détails au chapitre 3.',
  'disclaimer.body.about': 'Cette application n’est pas un dispositif médical. Elle ne sert pas à diagnostiquer, traiter ni prévenir une quelconque maladie. Les résultats mesurés avec la caméra d’un téléphone sont approximatifs et ne remplacent ni un examen ni l’avis d’un médecin. Pour les questions de santé oculaire, consultez un médecin ou un optométriste. Les seuils de zones de cette application ne reproduisent aucune norme de sécurité — détails dans la Documentation, chapitre 3.',

  'doc.toc.aria': 'Table des matières de la documentation',
  'doc.toc.title': 'Table des matières',

  'doc.ch1.title': 'Démarrage rapide',
  'doc.ch2.title': 'Comment fonctionne la mesure',
  'doc.ch3.title': 'Unités et normes',
  'doc.ch4.title': 'Zones et seuils',
  'doc.ch5.title': 'Différences entre les appareils',

  'doc.ch1.heading': '1. Démarrage rapide',
  'doc.ch2.heading': '2. Comment fonctionne la mesure',
  'doc.ch3.heading': '3. Unités et normes',
  'doc.ch4.heading': '4. Zones et seuils',
  'doc.ch5.heading': '5. Différences entre les appareils',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': 'Comment mesurer plus justement',
  'doc.ch1.tips.li1': 'Sur l’écran « Caméra » (le premier bouton de la barre du bas), appuyez sur « Start » et dirigez l’appareil photo arrière vers l’écran ou la source de lumière que vous voulez vérifier.',
  'doc.ch1.tips.li2': 'Passez à l’écran « Suivi » (le deuxième bouton de la barre du bas) — en haut, vous voyez les deux cadrans à la fois, et plus bas (faites défiler) les graphiques des changements dans le temps. La mesure continue en arrière-plan, quel que soit l’écran que vous regardez.',
  'doc.ch1.tips.li3': 'Placez le téléphone à une distance fixe de l’écran (par exemple 15–20 cm), sans changer l’éclairage ambiant pendant la mesure.',
  'doc.ch1.tips.li4': 'Utilisez l’appareil photo arrière — ses corrections automatiques sont moins agressives que celles de l’avant.',
  'doc.ch1.tips.li5': 'Traitez les résultats comme des indicateurs relatifs (%), et non comme des unités physiques absolues — comparez-les entre eux (par exemple mode nuit activé ou désactivé).',
  'doc.ch1.tips.li6': 'Adaptez les seuils de zones dans les réglages à la luminosité de votre propre écran (chapitre 4).',

  'doc.ch1.fonts.title': 'Grands caractères et grands cadrans — toujours',
  'doc.ch1.fonts.p1': 'Toute l’application utilise de grands caractères lisibles et des cadrans pleine taille, pour que les personnes malvoyantes (et tout le monde) puissent lire les données sans réglage supplémentaire. Sur l’écran « Suivi », les deux cadrans tiennent ensemble sur un seul écran, sans défilement — les graphiques des changements dans le temps sont juste en dessous, à un défilement de là.',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': 'Une caméra de téléphone face à un spectromètre',
  'doc.ch2.spectro.p1.html': 'Mesurer vraiment « la quantité de lumière bleue nocive » demande de décomposer la lumière en longueurs d’onde — c’est ce que fait un <b>spectromètre</b> : un prisme ou un réseau de diffraction disperse la lumière en dizaines ou en centaines de bandes étroites (tous les 1–5 nm, par exemple) et mesure la puissance optique de chacune séparément. Ce n’est qu’à partir d’une telle distribution spectrale complète que se calculent des unités comme le lux, le lumen ou l’éclairement énergétique pondéré par la fonction de risque de la lumière bleue.',
  'doc.ch2.spectro.p2.html': '<b>Une caméra de téléphone ne fait rien de tout cela.</b> Elle a trois filtres larges (Bayer : R/G/B), dont chacun recueille la lumière sur une plage large et chevauchante de longueurs d’onde — le « canal bleu » n’est pas une bande étroite autour de 435–440 nm (le pic du risque pour la rétine), mais grosso modo 400–570 nm mêlés de vert. S’y ajoutent le dématriçage, l’exposition automatique, la balance des blancs automatique et la compression gamma sRGB — le navigateur ne laisse désactiver complètement aucune de ces étapes. Résultat : la valeur de pixel que voit JavaScript n’est pas liée linéairement à la puissance optique réelle qui tombe sur le capteur. C’est une limite matérielle fondamentale, pas un défaut de cette application.',

  'doc.ch2.raw.title': 'Graphique 1 — Luminosité du canal B',
  'doc.ch2.raw.what.html': '<b>Ce qu’il montre :</b> la luminosité moyenne du seul canal bleu (B) sur la partie échantillonnée de l’image, sur une échelle 0–255 convertie en %.',
  'doc.ch2.raw.algo.html': '<b>L’algorithme :</b>',
  'doc.ch2.raw.step1': 'Nous prenons une image de la caméra 5 fois par seconde.',
  'doc.ch2.raw.step2': 'Nous découpons les 60 % centraux du cadre (cela évite les bords de l’image et les reflets venus des côtés).',
  'doc.ch2.raw.step3': 'Nous réduisons la partie découpée à une grille de 32×32 pixels (assez précis, et bien plus rapide que de travailler en pleine résolution — ce qui compte sur du matériel moins puissant, comme les Xiaomi ou les Ulefone d’entrée de gamme).',
  'doc.ch2.raw.step4': 'Nous faisons la moyenne de la valeur B des 1024 pixels de cette grille.',
  'doc.ch2.raw.step5.html': '<code>résultat = moyenne_B ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>Pourquoi nous l’avons gardé :</b> c’est le relevé le plus simple et le plus direct de « combien de signal bleu le capteur enregistre en tout ». Son défaut est de mélanger la luminosité et la couleur — une scène très lumineuse mais d’un blanc neutre donnera elle aussi un résultat élevé, alors qu’elle n’est pas particulièrement « bleue ». C’est pourquoi nous montrons le graphique 2 à côté.',

  'doc.ch2.share.title': 'Graphique 2 — Part de bleu dans la lumière',
  'doc.ch2.share.what.html': '<b>Ce qu’il montre :</b> quel pourcentage de toute la lumière enregistrée (R+G+B) représente la composante bleue — autrement dit le déplacement de la couleur vers le froid, indépendamment de la luminosité de la scène.',
  'doc.ch2.share.algo.html': '<b>L’algorithme :</b> les mêmes étapes 1–4 que ci-dessus, mais au lieu du seul B nous calculons :',
  'doc.ch2.share.formula.html': '<code>résultat = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': 'Un blanc neutre (R≈G≈B) donne environ <b>33 %</b>. Une lumière plus chaude, plus rouge — moins. Une lumière fortement bleue — plus, jusqu’à une limite d’environ 100 % pour une lumière presque purement bleue.',
  'doc.ch2.share.why.html': '<b>Pourquoi c’est la mesure la plus juste du « bleu nocif » :</b> c’est le principe même sur lequel reposent les filtres de type mode nuit ou Night Shift — ce qui compte, c’est la <b>couleur</b>, pas la luminosité. Un écran très lumineux mais neutre ne sera pas signalé à tort comme nocif ; un écran atténué mais fortement bleu, si. C’est donc cette mesure qui commande la couleur de la zone dans le tableau des relevés.',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': 'Pourquoi ni lux ni lumens',
  'doc.ch3.units.p1.html': 'Le <b>lumen (lm)</b> décrit le flux lumineux total émis par une source — c’est une propriété de la source elle-même, pas de ce qui arrive en un point donné. Le <b>lux (lx)</b> est déjà l’éclairement en un point (lm/m²) — plus proche de ce qui nous intéresse, mais toujours une unité <b>photométrique</b> : il pondère le spectre par la courbe de sensibilité de l’œil humain à la luminosité (V(λ)), et non par la courbe de risque de la lumière bleue. Mesurer vraiment le risque demande une troisième unité, plus étroite : l’éclairement énergétique pondéré spectralement, en <b>W/m²</b> (norme IEC 62471, pic de sensibilité autour de 435–440 nm), et cela exige un spectromètre — voir la section ci-dessus.',
  'doc.ch3.units.p2.html': 'Même en s’en tenant aux lux : un téléphone sans capteur de lumière externe et étalonné n’est pas capable de les déterminer de façon fiable. Le capteur de lumière intégré au téléphone (là où il existe) mesure d’ailleurs la lumière du <b>côté opposé</b> du boîtier à celui que vous dirigez vers l’écran avec l’appareil photo arrière — il mesurerait donc la lumière derrière votre dos, pas celle de l’écran. Plutôt que de deviner un nombre dans une unité qui serait de toute façon peu fiable, nous montrons un <b>indicateur relatif (%)</b> honnêtement décrit — utile pour comparer sur le même téléphone dans les mêmes conditions (par exemple mode nuit activé ou désactivé), et non comme une valeur absolue.',

  'doc.ch3.norms.title': 'Existe-t-il des normes mondiales pour les seuils de sécurité ?',
  'doc.ch3.norms.p1.html': 'En bref : <b>il n’existe pas de norme exprimée en pourcentage d’un canal de caméra</b> — ce n’est tout simplement pas une unité dans laquelle quoi que ce soit se réglemente. De vraies normes sur la lumière bleue existent, mais elles mesurent d’autres grandeurs, dans d’autres unités, et concernent un autre phénomène que celui auquel on pense d’habitude en disant « la lumière bleue fatigue les yeux ».',
  'doc.ch3.norms.p2.html': '<b>Lésion photochimique aiguë de la rétine — IEC 62471 / ICNIRP.</b> La seule « nocivité de la lumière bleue » réellement réglementée — une norme pour les lampes et les systèmes d’éclairage, appuyée par les recommandations de l’ICNIRP (International Commission on Non-Ionizing Radiation Protection). Elle classe les sources en groupes de risque RG0–RG3 sur la base de la luminance énergétique pondérée par la fonction de risque B(λ), en <b>W·m⁻²·sr⁻¹</b>, avec une limite de temps d’exposition (<code>t_max = 100 / L_B</code> secondes). Les écrans de téléphones et de moniteurs — même à luminosité maximale — tombent en pratique toujours dans <b>RG0 (exempt, sans restriction)</b>. Cette norme vise des sources bien plus intenses (arcs de soudage, certains projecteurs, LED industrielles), pas les écrans grand public.',
  'doc.ch3.norms.p3.html': '<b>Effet sur le rythme circadien et le sommeil — CIE S 026.</b> C’est le phénomène dont il s’agit d’habitude (un écran le soir « réveille ») — mais ce n’est pas une lésion de l’œil, c’est un effet sur l’horloge biologique par les cellules ganglionnaires de la rétine (ipRGC), les plus sensibles autour de 480 nm. La norme CIE S 026:2018 définit l’unité <b>lux mélanopique (melanopic EDI)</b>. Ce qui se rapproche le plus d’un consensus scientifique « officiel » est l’article de Brown et de ses coauteurs (<i>PLOS Biology</i>, 2022), qui recommande à titre indicatif : le soir &lt; 10 lux mélanopiques, en journée &gt; 250. Ce sont des recommandations de chercheurs du sommeil, pas une disposition légale.',
  'doc.ch3.norms.p4.html': '<b>L’OMS.</b> L’Organisation mondiale de la santé ne publie pas de limites d’exposition à la lumière bleue qui lui soient propres et indépendantes — pour la sécurité du rayonnement optique, elle renvoie à l’ICNIRP (ci-dessus). Le seul document concret de l’OMS sur les écrans est <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i> (2019) — et il porte sur le <b>temps</b> passé devant un écran, pas sur la couleur ni sur l’intensité de la lumière : pas d’écran avant 1 an, au maximum 1 heure entre 2 et 4 ans. Pour les adultes, l’OMS n’a pas de recommandation chiffrée aussi précise.',
  'doc.ch3.norms.p5.html': '<b>Pourquoi cela n’aide de toute façon pas à étalonner l’application :</b> les deux familles de normes (IEC/ICNIRP et CIE) exigent une distribution spectrale complète et une luminance énergétique étalonnée dans une géométrie de mesure connue — exactement ce qu’un téléphone ne sait pas fournir à travers un navigateur (voir la section « Une caméra de téléphone face à un spectromètre » ci-dessus). Il n’existe pas de conversion « 33 % de part de bleu = X lux mélanopiques », donc les seuils de cette application <b>ne reproduisent aucune norme de sécurité</b> (OMS, IEC, ICNIRP ou CIE — pour cet indicateur, il n’en existe tout simplement aucune). Les valeurs par défaut du seuil de part de bleu sont en revanche dérivées de températures de couleur réelles de la lumière et de la recommandation pratique, largement répétée, d’une lumière chaude le soir — une base plus solide qu’un simple arrondi, mais toujours pas une norme formelle (dérivation complète : chapitre 4). Vous pouvez toujours les remplacer par les vôtres dans les réglages.',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': 'Les zones de couleur et d’où viennent les seuils',
  'doc.ch4.zones.p1.html': 'Les deux mesures ont leurs propres seuils, réglables indépendamment (écran « Suivi » → « Réglages des seuils de zones », en bas de la page) — 33 %/66 % sur l’une ne veut pas dire la même chose que sur l’autre (voir le chapitre 2 ci-dessus). C’est la <b>part de bleu</b> qui décide de la couleur dans la légende sous les graphiques et dans le tableau des relevés :',
  'doc.ch4.zones.li1.html': '<b>Verte — sans risque :</b> lumière chaude ou neutre, les yeux se reposent.',
  'doc.ch4.zones.li2.html': '<b>Jaune — modérée :</b> déplacement notable vers le bleu, il vaut mieux faire des pauses.',
  'doc.ch4.zones.li3.html': '<b>Rouge — nocive :</b> lumière fortement bleue, nettement fatigante pour les yeux sur une exposition longue (surtout le soir).',
  'doc.ch4.zones.p2.html': '<b>D’où viennent ces nombres précis.</b> La <b>luminosité du canal B</b> n’a pas de point de référence naturel — une valeur de seuil sensée dépend uniquement de la luminosité de la scène que vous filmez (c’est une mesure de luminosité, pas de couleur). Les 33 %/66 % par défaut restent ici un point de départ conventionnel — ajustez-les par essais à la luminosité habituelle de votre écran et de votre environnement.',
  'doc.ch4.zones.p3.html': 'La <b>part de bleu</b> a des seuils par défaut dérivés de températures de couleur réelles de la lumière (de la physique, pas un arrondi), et non d’une quelconque norme de sécurité — une telle norme n’existe pas pour cette grandeur (chapitre 3). Les points de référence :',
  'doc.ch4.zones.li4.html': '<b>~4000K</b> (« blanc chaud », une ampoule LED typique) → environ <b>26 %</b> de part de bleu. Une lumière plus chaude que cela (une température de couleur plus basse) correspond à la plage largement recommandée le soir par des outils comme f.lux ou Night Shift — d’où le seuil inférieur.',
  'doc.ch4.zones.li5.html': '<b>6500K (D65)</b>, le point blanc standard de la plupart des écrans de téléphones et de moniteurs en sortie d’usine — environ <b>33 %</b>. C’est à partir de cette valeur que commence la plage où l’on applique typiquement les recommandations de limitation de la lumière bleue — d’où le seuil supérieur.',
  'doc.ch4.zones.p4.html': '<b>Réserve importante :</b> le degré de « bleu » d’une lumière ne dépend pas de l’heure de la journée, mais les recommandations de limitation de la lumière bleue ne concernent en réalité que le <b>soir et la nuit</b> — en journée, l’exposition à une lumière froide et bleue (celle du soleil comprise) est normale, et même bénéfique pour le rythme circadien. Une zone rouge en plein milieu de la journée face à un écran ordinaire, non modifié, ne signifie pas un danger réel — la même lumière, le soir, mérite déjà d’être limitée.',
  'doc.ch4.zones.p5.html': 'Les seuils des deux mesures sont totalement indépendants — changer l’un n’a aucun effet sur l’autre. Les seuils modifiés sont <b>mémorisés sur cet appareil et dans ce navigateur</b> d’une ouverture de l’application à l’autre (localement ; rien n’est envoyé nulle part) — le bouton « Start » ne les remet pas aux valeurs par défaut.',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': 'Pourquoi l’aperçu n’a pas le même aspect sur des appareils différents',
  'doc.ch5.devices.p1.html': '<b>Le navigateur face à l’application photo native.</b> Quand vous ouvrez l’appareil photo installé d’usine sur le téléphone, le fabricant (Xiaomi, par exemple) ajoute à l’aperçu en direct ses propres algorithmes propriétaires — HDR en temps réel, amplification numérique de la luminosité en basse lumière, lissage. Une page web reçoit à travers le navigateur un flux de la caméra bien plus « brut » (la fonction <code>getUserMedia</code>), sans aucune de ces améliorations — elle aura donc par principe un rendu plus plat et plus sombre que l’appareil photo natif, quel que soit le téléphone.',
  'doc.ch5.devices.p2.html': '<b>Des possibilités de contrôle de la caméra variables.</b> Le degré de contrôle sur l’exposition et la balance des blancs que le navigateur reçoit du système dépend du téléphone précis, du pilote de la caméra et de la version de Chrome ou de WebView — certains appareils (typiquement des ordinateurs avec une caméra USB) ne signalent qu’une automatisation complète, d’autres (une partie des téléphones Android) signalent des modes supplémentaires, plus avancés. Une version antérieure de cette application essayait de passer en mode d’exposition manuelle là où le téléphone le permettait, sans fixer de valeur précise — ce qui, sur une partie des téléphones, figeait l’image sur une exposition sombre et arbitraire, celle de l’instant où la caméra démarrait. C’était un bug dans le code (déjà corrigé), et non une différence d’unités — mais cela montre bien à quel point le comportement peut varier d’un appareil à l’autre, puisque même une seule et même ligne de code ne s’active que sur une partie d’entre eux.',
  'doc.ch5.devices.p3.html': '<b>Des capteurs et des traitements d’image (ISP) différents.</b> Même avec un code identique et la même scène, différents modèles de téléphones ont des capteurs de qualité différente et une automatisation du fabricant réglée différemment — l’un choisira son exposition en basse lumière plus vite et plus juste que l’autre. Cela, joint au fait que les indicateurs de cette application sont <b>relatifs</b> (voir le chapitre 3), signifie : comparez les résultats (et l’aspect de l’aperçu) sur le même téléphone dans le temps, pas entre différents modèles ou appareils.'
});
