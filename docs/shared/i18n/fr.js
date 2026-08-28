/* docs/shared/i18n/fr.js — słownik WSPÓLNY, francuski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest francuski.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — klucza, którego
 * nie ma w angielskim, nie wolno tu dopisać: angielski jest wartością zapasową,
 * więc to on wyznacza zestaw (patrz docs/shared/README.md, rozdział
 * „Warstwa językowa”). Pilnuje tego docs/shared/i18n/keys.test.js.
 *
 * TYPOGRAFIA: apostrof francuski zapisujemy znakiem ’ (U+2019), a nie ' —
 * dzięki temu nie trzeba go w tym pliku niczym poprzedzać. Cudzysłowy są
 * francuskie: « … ». Liczby dziesiętne mają przecinek: 1,00 i 0,50.
 *
 * TERMINOLOGIA: „papillotement” (migotanie), „température de couleur”
 * (temperatura barwowa), „rapport mélanopique” (współczynnik melanopiczny) —
 * to terminy przyjęte we francuskiej literaturze oświetleniowej i w całym
 * pliku stoi po jednym odpowiedniku na pojęcie.
 */
window.I18nData = window.I18nData || {};
window.I18nData['fr'] = Object.assign(window.I18nData['fr'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu (UE)
     2017/745, gdzie stoi na początku zdania jako podmiot. */
  'app.name': 'Moniteur de lumière',

  /* ---- wybór języka ---- */

  'language.label': 'Langue',
  'language.help': 'La langue de toute l’application. Toutes les langues sont déjà sur cet appareil — rien n’est téléchargé et rien n’est envoyé nulle part.',
  'language.auto': 'Comme l’appareil',
  'language.autoHint': 'Suit la langue définie dans le téléphone ou le navigateur.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Part de bleu',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'pour cent',
  'metric.share.short': 'La part de la lumière vue qui revient au canal bleu.',
  'metric.share.help': 'Elle sépare la couleur de la luminosité — c’est cette valeur qui bouge quand vous activez le mode nuit.',

  'metric.brightness.name': 'Luminosité de la scène',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'pour cent',
  'metric.brightness.short': 'La luminosité moyenne de l’image de la caméra.',
  'metric.brightness.help': 'Une valeur relative, pas des lux — l’exposition automatique de la caméra la déplace en dessous.',

  'metric.kelvin.name': 'Température de couleur',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'kelvins',
  'metric.kelvin.short': 'La lumière est-elle chaude ou froide.',
  'metric.kelvin.help': 'En dessous de 3000 K, la lumière est chaude et plus douce le soir. 6500 K est le blanc par défaut de la plupart des écrans.',

  'metric.melanopic.name': 'Impact circadien',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'fois',
  'metric.melanopic.short': 'La force avec laquelle cette lumière agit sur l’horloge biologique.',
  'metric.melanopic.help': 'Une approximation du rapport mélanopique. 1,00 est le blanc neutre du jour ; le soir, il vaut mieux descendre sous 0,50.',

  'metric.flicker.name': 'Papillotement',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'pour cent',
  'metric.flicker.short': 'La pulsation invisible de la source de lumière.',
  'metric.flicker.help': 'Les variateurs et les rétroéclairages bon marché pulsent. L’œil ne le voit pas, mais c’est une cause connue de fatigue et de maux de tête.',

  'metric.uniformity.name': 'Uniformité',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'pour cent',
  'metric.uniformity.short': 'La lumière se répartit-elle uniformément dans le cadre.',
  'metric.uniformity.help': 'Une valeur faible sur un écran signale une fuite du rétroéclairage ou un reflet ; sur un bureau, une lampe mal placée.',

  'metric.comfort.name': 'Confort visuel',
  'metric.comfort.unit': 'pts',
  'metric.comfort.unitSpoken': 'points',
  'metric.comfort.short': 'Un seul verdict au lieu de six chiffres.',
  'metric.comfort.help': 'Il réunit les autres mesures en une note de 0 à 100 et montre ce qui l’abaisse le plus. Les pondérations relèvent de notre jugement éditorial, pas d’une norme.',

  /* Etykiety składników oceny komfortu — Metrics.comfortIndex zwraca je jako
     `penalties[].id`, więc nazwa klucza idzie za tym identyfikatorem. */
  'comfort.penalty.melanopic': 'Impact circadien',
  'comfort.penalty.kelvin': 'Lumière froide',
  'comfort.penalty.flicker': 'Papillotement',
  'comfort.penalty.uniformity': 'Éclairage inégal',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': 'Appuyez sur « Start » pour allumer la caméra.',
  'engine.starting': 'Démarrage de la caméra…',

  'engine.error.permission': 'Pas d’autorisation d’accès à la caméra. Autorisez la caméra dans les réglages du navigateur et appuyez de nouveau sur « Start ».',
  'engine.error.notFound': 'Aucune caméra trouvée. Vérifiez que l’appareil possède une caméra et qu’elle n’est pas désactivée dans le système.',
  'engine.error.busy': 'La caméra est occupée par une autre application. Fermez-la et réessayez.',
  'engine.error.unknown': 'Impossible de démarrer la caméra.',
  'engine.error.unsupported': 'Ce navigateur ne donne pas à cette page l’accès à la caméra. Ouvrez l’application en HTTPS ou utilisez un autre navigateur.',

  /* ---- strefy ---- */

  'zone.good': 'Dans la norme',
  'zone.warning': 'Attention',
  'zone.critical': 'Critique',
  'zone.none': 'Aucune donnée',
  'zone.settling': 'Stabilisation',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania, więc małą literą
     i bez kropki. To nie jest to samo, co napis na plakietce. */
  'zone.spoken.good': 'dans la norme',
  'zone.spoken.warning': 'attention',
  'zone.spoken.critical': 'critique',
  'zone.spoken.none': 'aucune donnée',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'pts',
  'unit.hertz': 'Hz',
  'unit.second': 's',
  'unit.minute': 'min',
  'unit.hour': 'h',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'Cette lumière est correcte — rien ne dépasse les seuils que vous avez fixés.',
  'verdict.noValue': 'Cette grandeur ne peut pas être mesurée pour l’instant. Vérifiez que rien ne couvre l’objectif.',
  'verdict.warmup': 'Verdict en cours — gardez le téléphone immobile encore un instant.',

  'verdict.warning.share': 'Une bonne part de cette lumière revient au canal bleu. Le soir, il vaut mieux la baisser.',
  'verdict.warning.brightness': 'La scène est lumineuse — la caméra travaille près du haut de sa plage de mesure.',
  'verdict.warning.kelvin': 'La lumière est assez froide. Le soir, une ampoule autour de 2700 K est plus douce.',
  'verdict.warning.melanopic': 'Cette lumière agit assez fortement sur l’horloge biologique.',
  'verdict.warning.flicker': 'La source de lumière pulse visiblement.',
  'verdict.warning.uniformity': 'La lumière se répartit inégalement dans le cadre.',
  'verdict.warning.comfort': 'Le confort visuel est réduit — plusieurs choses s’y additionnent.',

  'verdict.critical.share': 'Beaucoup de bleu. Le soir, activez le mode nuit ou changez de source de lumière.',
  'verdict.critical.brightness': 'La scène est très lumineuse. Ne mesurez pas en visant droit dans la source de lumière.',
  'verdict.critical.kelvin': 'La lumière est froide. Le soir, c’est ce qui fatigue le plus les yeux — une ampoule plus chaude ou le mode nuit aideront.',
  'verdict.critical.melanopic': 'Cette lumière agit fortement sur l’horloge biologique. Le soir, il vaut mieux descendre sous 0,50.',
  'verdict.critical.flicker': 'La source de lumière pulse fortement. C’est une cause connue de fatigue oculaire et de maux de tête.',
  'verdict.critical.uniformity': 'La lumière se répartit très inégalement. Vérifiez la position de la lampe ou les reflets sur l’écran.',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'Le confort visuel est bas. Regardez le détail de la note pour voir ce qui l’abaisse.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'Ce que ce chiffre ne dit pas',
  'note.warningTitle': 'Attention',
  'note.dashTitle': 'Ce que cette mesure n’est pas',
  'note.dashText': 'La caméra d’un téléphone a trois canaux de couleur larges et une balance des blancs automatique — elle ne mesure pas un spectre. La température de couleur et l’impact circadien sont des approximations calculées à partir des primaires sRGB. L’application montre bien les différences et les changements dans le temps ; elle ne remplace pas un appareil de mesure et ne pose aucun diagnostic.',
  'note.approxLegend': '≈ valeur approchée — calculée à partir des primaires sRGB, et non d’une mesure spectrale.',
  'note.kelvinOutOfRange': 'Hors du domaine de la méthode — à cette couleur, la formule de la température de couleur cesse d’être fiable.',
  /* {rate} i {limit} podaje wywołanie, bo to liczby z silnika (5 Hz, 2,5 Hz),
     a ich zapis jest różny w różnych językach: 2.5 po angielsku, 2,5 po
     francusku. Zapisu liczby nie wolno wpisywać do zdania na sztywno. */
  'note.flickerOutOfRange': 'Hors du domaine de la méthode — un échantillonnage à {rate} Hz ne voit les pulsations qu’en dessous de {limit} Hz. Le papillotement du secteur à 100 Hz est hors de portée et l’application ne le donnera jamais comme résultat.',
  'note.helpTitle': 'Ce que ce chiffre ne dit pas',
  'note.helpText': 'La caméra d’un téléphone a trois canaux larges et ne mesure pas un spectre. Cette valeur est un indicateur comparatif — elle montre bien les différences entre les lumières et les changements dans le temps, et elle n’est ni une mesure de laboratoire ni une information médicale.',
  'note.calibration': 'Mesure sans étalonnage — prenez les valeurs à titre comparatif.',

  'note.howToTitle': 'Comment mesurer utilement',
  'note.howTo.hold.title': 'Gardez le téléphone immobile',
  'note.howTo.hold.text': 'L’exposition automatique a besoin de 2–3 secondes pour se stabiliser.',
  'note.howTo.aim.title': 'Visez une surface éclairée',
  'note.howTo.aim.text': 'Une feuille de papier blanche ou un mur clair. Ne mesurez pas en regardant droit dans la source de lumière.',
  'note.howTo.compare.title': 'Comparez, ne jugez pas dans l’absolu',
  'note.howTo.compare.text': 'La même scène avant et après un changement d’éclairage en dit plus qu’un seul chiffre.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Skracanie go w tłumaczeniu nie jest kwestią stylu. */

  'legal.noDiagnosis': 'Aucun résultat n’est un diagnostic ni un conseil de santé.',
  'legal.mdr': '{app} n’est pas un dispositif médical au sens du règlement (UE) 2017/745, n’est pas destiné à diagnostiquer, prévenir, surveiller ni traiter une quelconque affection et ne remplace pas un examen par un médecin ou un optométriste.',

  /* ---- prywatność ---- */

  'privacy.title': 'Ce qui quitte cet appareil',
  'privacy.short': 'Rien dans cette application n’envoie quoi que ce soit sur le réseau. Chaque chiffre est produit sur cet appareil et y reste.',
  'privacy.onDevice': 'La caméra ne démarre qu’après avoir appuyé sur le bouton, et l’image ne quitte jamais cet appareil.',
  'privacy.external': 'C’est le seul endroit de toute l’application où quelque chose quitte cet appareil : le bouton ouvre une page externe dans un nouvel onglet, et seulement une fois que vous avez appuyé dessus. Les mesures, l’historique et les réglages restent ici.',
  'privacy.externalPending': 'Dès que l’adresse sera disponible, le bouton ouvrira une page externe dans un nouvel onglet. Ce sera le seul moment où quelque chose quitte cet appareil. Les mesures, l’historique et les réglages restent ici.',
  'privacy.storageBlocked': 'Ce navigateur ne laisse rien enregistrer (mode privé ou données de site bloquées). La mesure fonctionne, mais l’historique disparaîtra à la fermeture de l’onglet.',

  /* ---- liczebniki ----
     Francuski ma trzy kategorie CLDR: one (0 i 1), many (wielkie liczby, np.
     milion — francuski wstawia tam „de”: „1 000 000 de relevés”) i other,
     czyli cała reszta. Formę wybiera Intl.PluralRules('fr'), nie nasza reguła. */

  'count.readings': { one: '{n} relevé', many: '{n} de relevés', other: '{n} relevés' },
  'count.sessions': { one: '{n} session', many: '{n} de sessions', other: '{n} sessions' },
  'count.seconds': { one: '{n} seconde', many: '{n} de secondes', other: '{n} secondes' },
  'count.minutes': { one: '{n} minute', many: '{n} de minutes', other: '{n} minutes' },
  'count.hours': { one: '{n} heure', many: '{n} d’heures', other: '{n} heures' },
  'count.days': { one: '{n} jour', many: '{n} de jours', other: '{n} jours' }
});
