/* docs/shared/i18n/es.js — słownik WSPÓLNY, hiszpański.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest hiszpański.
 *
 * SKĄD TE ZDANIA: przekład z pl.js (redakcja pierwotna), z en.js jako wzorcem
 * terminologii i rejestru. Ton hiszpański trzyma się oryginału: rzeczowo,
 * ciepło, bez marketingu i bez straszenia. Zwrot do użytkownika przez „tú”,
 * tak jak angielskie „you” i polskie formy bezosobowe.
 *
 * TERMINOLOGIA (jeden odpowiednik na pojęcie w całym pliku): temperatura de
 * color, impacto circadiano / factor melanópico, parpadeo, uniformidad,
 * confort visual, brillo de la escena, proporción de azul.
 *
 * LICZBY: hiszpański zapisuje ułamek przecinkiem (1,00; 0,50) — tak samo jak
 * polski, inaczej niż angielski. {rate} i {limit} podaje wywołanie.
 *
 * CUDZYSŁÓW: comillas latinas «…», zgodnie z uzusem hiszpańskim.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — ani jednego
 * mniej, ani jednego więcej (patrz docs/shared/i18n/keys.test.js).
 */
window.I18nData = window.I18nData || {};
window.I18nData['es'] = Object.assign(window.I18nData['es'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu
     (UE) 2017/745, gdzie stoi jako podmiot. */
  'app.name': 'Monitor de Luz',

  /* ---- wybór języka ---- */

  'language.label': 'Idioma',
  'language.help': 'El idioma de toda la aplicación. Todos los idiomas ya están en este dispositivo: no se descarga nada y no se envía nada a ninguna parte.',
  'language.auto': 'Según el dispositivo',
  'language.autoHint': 'Sigue el idioma configurado en el teléfono o en el navegador.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Proporción de azul',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'por ciento',
  'metric.share.short': 'Qué parte de la luz visible corresponde al canal azul.',
  'metric.share.help': 'Separa el color del brillo: es el valor que cambia cuando activas el modo nocturno.',

  'metric.brightness.name': 'Brillo de la escena',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'por ciento',
  'metric.brightness.short': 'El brillo medio de la imagen de la cámara.',
  'metric.brightness.help': 'Un valor relativo, no lux: la cámara mueve su propia exposición por debajo.',

  'metric.kelvin.name': 'Temperatura de color',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'kelvin',
  'metric.kelvin.short': 'Si la luz es cálida o fría.',
  'metric.kelvin.help': 'Por debajo de 3000 K la luz es cálida y más suave por la noche. 6500 K es el blanco predeterminado de la mayoría de las pantallas.',

  'metric.melanopic.name': 'Impacto circadiano',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'veces',
  'metric.melanopic.short': 'Con qué fuerza actúa esta luz sobre el reloj biológico.',
  'metric.melanopic.help': 'Una aproximación del factor melanópico. 1,00 es el blanco neutro de la luz diurna; por la tarde conviene bajar de 0,50.',

  'metric.flicker.name': 'Parpadeo',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'por ciento',
  'metric.flicker.short': 'Pulsación invisible de la fuente de luz.',
  'metric.flicker.help': 'Los reguladores y las retroiluminaciones baratas pulsan. El ojo no lo ve, pero es una causa conocida de cansancio y dolor de cabeza.',

  'metric.uniformity.name': 'Uniformidad',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'por ciento',
  'metric.uniformity.short': 'Si la luz se reparte por igual en el encuadre.',
  'metric.uniformity.help': 'Un valor bajo en una pantalla indica fuga de retroiluminación o un reflejo; en el escritorio, una lámpara mal colocada.',

  'metric.comfort.name': 'Confort visual',
  'metric.comfort.unit': 'pts',
  'metric.comfort.unitSpoken': 'puntos',
  'metric.comfort.short': 'Una sola valoración en lugar de seis cifras.',
  'metric.comfort.help': 'Reúne el resto de las medidas en una puntuación de 0–100 y muestra qué es lo que más la baja. Los pesos son nuestro criterio editorial, no una norma.',

  /* Etykiety składników oceny komfortu — nazwa klucza idzie za identyfikatorem
     `penalties[].id` z Metrics.comfortIndex. */
  'comfort.penalty.melanopic': 'Impacto circadiano',
  'comfort.penalty.kelvin': 'Color de luz frío',
  'comfort.penalty.flicker': 'Parpadeo',
  'comfort.penalty.uniformity': 'Iluminación desigual',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': 'Pulsa «Start» para encender la cámara.',
  'engine.starting': 'Encendiendo la cámara…',

  'engine.error.permission': 'No hay permiso para usar la cámara. Autoriza la cámara en los ajustes del navegador y pulsa «Start» de nuevo.',
  'engine.error.notFound': 'No se ha encontrado ninguna cámara. Comprueba que el dispositivo tenga cámara y que no esté desactivada en el sistema.',
  'engine.error.busy': 'La cámara está ocupada por otra aplicación. Ciérrala e inténtalo de nuevo.',
  'engine.error.unknown': 'No se ha podido encender la cámara.',
  'engine.error.unsupported': 'Este navegador no da acceso a la cámara en esta página. Abre la aplicación por HTTPS o usa otro navegador.',

  /* ---- strefy ---- */

  'zone.good': 'En rango',
  'zone.warning': 'Atención',
  'zone.critical': 'Crítico',
  'zone.none': 'Sin datos',
  'zone.settling': 'Estabilizando',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania, więc małą literą
     i bez kropki. */
  'zone.spoken.good': 'en rango',
  'zone.spoken.warning': 'atención',
  'zone.spoken.critical': 'crítico',
  'zone.spoken.none': 'sin datos',

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

  'verdict.good': 'Esta luz está bien: nada supera los umbrales que has fijado.',
  'verdict.noValue': 'Esta magnitud no se puede medir ahora. Comprueba que nada tape el objetivo.',
  'verdict.warmup': 'Calculando la valoración: mantén el teléfono quieto un momento más.',

  'verdict.warning.share': 'Buena parte de esta luz corresponde al canal azul. Por la tarde conviene atenuarla.',
  'verdict.warning.brightness': 'La escena es luminosa: la cámara trabaja cerca del límite superior de su rango.',
  'verdict.warning.kelvin': 'La luz es bastante fría. Por la tarde resulta más suave una bombilla de unos 2700 K.',
  'verdict.warning.melanopic': 'Esta luz actúa con bastante fuerza sobre el reloj biológico.',
  'verdict.warning.flicker': 'La fuente de luz pulsa de forma apreciable.',
  'verdict.warning.uniformity': 'La luz se reparte de forma desigual en el encuadre.',
  'verdict.warning.comfort': 'El confort visual está reducido: se han juntado varias cosas a la vez.',

  'verdict.critical.share': 'Muchísimo azul. Por la tarde activa el modo nocturno o cambia la fuente de luz.',
  'verdict.critical.brightness': 'La escena es muy luminosa. No midas apuntando directamente a la fuente de luz.',
  'verdict.critical.kelvin': 'La luz es fría. Por la tarde es lo que más cansa la vista: una bombilla más cálida o el modo nocturno ayudarán.',
  'verdict.critical.melanopic': 'Esta luz actúa con fuerza sobre el reloj biológico. Por la tarde conviene bajar de 0,50.',
  'verdict.critical.flicker': 'La fuente de luz pulsa con fuerza. Es una causa conocida de fatiga visual y dolor de cabeza.',
  'verdict.critical.uniformity': 'La luz se reparte de forma muy desigual. Comprueba la posición de la lámpara o los reflejos en la pantalla.',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'El confort visual es bajo. Mira el desglose de la puntuación para ver qué la baja.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'Lo que esta cifra no dice',
  'note.warningTitle': 'Atención',
  'note.dashTitle': 'Lo que esta medición no es',
  'note.dashText': 'La cámara de un teléfono tiene tres canales de color anchos y un balance de blancos automático: no mide el espectro. La temperatura de color y el impacto circadiano son aproximaciones calculadas a partir de los primarios sRGB. La aplicación muestra bien las diferencias y los cambios a lo largo del tiempo; no sustituye a un medidor y no establece ningún diagnóstico.',
  'note.approxLegend': '≈ valor aproximado: calculado a partir de los primarios sRGB, no de una medición espectral.',
  'note.kelvinOutOfRange': 'Fuera del alcance del método: con este color la fórmula de la temperatura de color deja de ser fiable.',
  /* {rate} i {limit} podaje wywołanie — zapis liczby zależy od języka
     (2.5 po angielsku, 2,5 po hiszpańsku), więc nie wpisuje się go na sztywno. */
  'note.flickerOutOfRange': 'Fuera del alcance del método: un muestreo de {rate} Hz solo ve pulsaciones por debajo de {limit} Hz. Los 100 Hz de la red eléctrica quedan fuera de su alcance y la aplicación nunca los dará como resultado.',
  'note.helpTitle': 'Lo que esta cifra no dice',
  'note.helpText': 'La cámara de un teléfono tiene tres canales anchos y no mide el espectro. Este valor es un indicador comparativo: muestra bien las diferencias entre luces y los cambios a lo largo del tiempo, y no es ni una medición de laboratorio ni información médica.',
  'note.calibration': 'Medición sin calibrar: trata los valores de forma comparativa.',

  'note.howToTitle': 'Cómo medir con sentido',
  'note.howTo.hold.title': 'Mantén el teléfono quieto',
  'note.howTo.hold.text': 'La exposición automática necesita 2–3 segundos para estabilizarse.',
  'note.howTo.aim.title': 'Apunta a una superficie iluminada',
  'note.howTo.aim.text': 'Una hoja de papel blanca o una pared clara. No midas mirando directamente a la fuente de luz.',
  'note.howTo.compare.title': 'Compara, no juzgues en términos absolutos',
  'note.howTo.compare.text': 'La misma escena antes y después de un cambio de iluminación dice más que una sola cifra.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Terminy urzędowe hiszpańskiej wersji rozporządzenia:
     „producto sanitario”, „Reglamento (UE) 2017/745”. Nie skraca się tego
     zdania dla stylu. */

  'legal.noDiagnosis': 'Ningún resultado es un diagnóstico ni un consejo de salud.',
  'legal.mdr': '{app} no es un producto sanitario en el sentido del Reglamento (UE) 2017/745, no está destinado a diagnosticar, prevenir, monitorizar ni tratar ninguna afección médica y no sustituye a un examen realizado por un médico ni por un optometrista.',

  /* ---- prywatność ---- */

  'privacy.title': 'Qué sale de este dispositivo',
  'privacy.short': 'Nada en esta aplicación envía nada a la red. Todas las cifras se generan en este dispositivo y se quedan aquí.',
  'privacy.onDevice': 'La cámara se enciende solo después de que pulses el botón, y la imagen nunca sale de este dispositivo.',
  'privacy.external': 'Este es el único lugar de toda la aplicación en el que algo sale de este dispositivo: el botón abre una página externa en una pestaña nueva, y solo cuando lo pulsas. Las mediciones, el historial y los ajustes se quedan aquí.',
  'privacy.externalPending': 'Cuando la dirección esté disponible, el botón abrirá una página externa en una pestaña nueva. Ese será el único momento en el que algo salga de este dispositivo. Las mediciones, el historial y los ajustes se quedan aquí.',
  'privacy.storageBlocked': 'Este navegador no permite guardar nada (modo privado o datos de sitios bloqueados). La medición funciona, pero el historial desaparecerá al cerrar la pestaña.',

  /* ---- liczebniki ----
     Hiszpański ma trzy kategorie CLDR: one (1), many (całkowite wielokrotności
     miliona w zapisie skróconym — „1 millón DE lecturas”, stąd przyimek „de”)
     i other (cała reszta, także ułamki: „1,5 lecturas”).
     Formę wybiera Intl.PluralRules('es'), nie nasza reguła. */

  'count.readings': { one: '{n} lectura', many: '{n} de lecturas', other: '{n} lecturas' },
  'count.sessions': { one: '{n} sesión', many: '{n} de sesiones', other: '{n} sesiones' },
  'count.seconds': { one: '{n} segundo', many: '{n} de segundos', other: '{n} segundos' },
  'count.minutes': { one: '{n} minuto', many: '{n} de minutos', other: '{n} minutos' },
  'count.hours': { one: '{n} hora', many: '{n} de horas', other: '{n} horas' },
  'count.days': { one: '{n} día', many: '{n} de días', other: '{n} días' }
});
