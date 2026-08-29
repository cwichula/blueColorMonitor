/* docs/v2/i18n/es.js — słownik WERSJI 2, hiszpański.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/es.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej.
 *
 * SKĄD TE ZDANIA: przekład z pl.js (redakcja pierwotna), z en.js jako wzorcem
 * terminologii i rejestru. Zwrot do użytkownika przez „tú”, cudzysłów «…»,
 * przecinek dziesiętny i spacja nierozdzielająca przed znakiem % (zalecenie
 * RAE) — tak samo jak w docs/shared/i18n/es.js i w słowniku wersji 5.
 *
 * TERMINOLOGIA WZIĘTA Z WARSTWY WSPÓLNEJ (bez wyjątków): proporción de azul,
 * brillo de la escena, temperatura de color, impacto circadiano, parpadeo,
 * uniformidad, confort visual; magnitud (wielkość), lectura (odczyt), medición
 * (pomiar), muestra (próbka), umbral (próg), encuadre (kadr), historial.
 * Przyciski «Start» i «Stop» zostają nietłumaczone — warstwa wspólna odsyła do
 * nich po nazwie ('engine.idle': „Pulsa «Start»…”).
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (te same co w pl.js i z tego samego powodu):
 *   'zone.warning'        — wspólne mówi „Atención”, ta wersja od zawsze mówi
 *                           „Advertencia” (i „Advertencias” w podsumowaniu);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi o pomiarach
 *                           w liczbie mnogiej.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules — hiszpański ma one/many/other, gdzie 'many' obsługuje
 * skrócone wielokrotności miliona („1 millón DE lecturas”, stąd przyimek).
 * Patrz nagłówek docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['es'] = Object.assign(window.I18nData['es'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Monitor de Luz — medición de la luz azul',
  'app.description': 'Monitor de Luz — medición de la proporción de luz azul con la cámara del teléfono. Siete magnitudes, un gráfico, un historial. Todo disponible, sin cuenta y sin pagar nada.',
  'app.skipToContent': 'Ir al contenido',
  'app.measuring': 'Midiendo',
  'app.docsButton': 'Documentación y explicaciones',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — versión 2',

  'nav.aria': 'Navegación principal',
  'nav.tablistAria': 'Pantallas de la aplicación',
  'nav.measure': 'Medir',
  'nav.history': 'Historial',
  'nav.tools': 'Herramientas',
  'nav.support': 'Apoyo',
  'nav.more': 'Más',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Documentación',
  'panel.thresholds': 'Umbrales y perfiles',
  'panel.reports': 'Informes',
  'panel.export': 'Exportación de datos',
  'panel.compare': 'Comparación A/B',
  'panel.calibration': 'Calibración con papel blanco',
  'panel.screenCheck': 'Comprobar mi monitor',
  'panel.schedule': 'Horario',
  'panel.alerts': 'Alertas de exposición',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Volver',
  'action.close': 'Cerrar',
  'action.refresh': 'Actualizar',
  'action.apply': 'Aplicar',
  'action.delete': 'Eliminar',
  'action.hide': 'Ocultar',
  'action.start': 'Start',
  'action.stop': 'Stop',
  'action.switch': 'Cambiar',
  'action.switchAria': 'Cambiar de cámara: frontal o trasera',
  'action.resetDefaults': 'Restaurar los valores por defecto',
  'action.reports': 'Informes',
  'action.exportCsv': 'Exportar CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Pantalla: {name}',
  'a11y.measureStarted': 'Medición iniciada.',
  'a11y.measureStopped': 'Medición detenida.',
  'a11y.measureStoppedSummary': 'Medición detenida. Tiempo: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'Perfil de umbrales aplicado.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Confirmación',
  'dialog.confirm': 'Confirmar',
  'dialog.cancel': 'Cancelar',
  'dialog.infoTitle': 'Información',
  'dialog.ok': 'Entendido',

  'help.sheetTitle': 'Sobre esta magnitud',
  'help.unit': 'Unidad',
  'help.scaleRange': 'Rango de la escala',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'Advertencia',
  'threshold.crit': 'Crítico',
  'threshold.warnLabel': 'Umbral de advertencia',
  'threshold.critLabel': 'Umbral crítico',
  'threshold.warnAria': '{name} — umbral: advertencia',
  'threshold.critAria': '{name} — umbral: crítico',

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

  'firstRun.title': 'Cómo medir',
  'firstRun.text': 'Pulsa «Start», apunta el teléfono a una superficie iluminada y mantenlo quieto unos segundos. El marco de la vista previa muestra la parte que la aplicación lee de verdad.',
  'firstRun.close': 'Cerrar el aviso',

  'camera.live': 'EN DIRECTO',
  'camera.idle': 'La cámara está apagada. Pulsa «Start», apunta el teléfono a una superficie iluminada y mantenlo quieto unos segundos.',
  'camera.stopped': 'Medición detenida. Pulsa «Start» para medir de nuevo.',

  'error.cameraStart': 'No se ha podido encender la cámara.',
  'error.engineMissing': 'El módulo de medición no se ha cargado.',

  'metrics.sevenTitle': 'Siete magnitudes',
  'measure.tilesSub': 'Se actualiza 5 veces por segundo',

  'session.title': 'Esta sesión',
  'session.duration': 'Tiempo de medición',
  'session.samples': 'Muestras',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     „Advertencias” to nie to samo słowo co „Advertencia” pod suwakiem;
     liczone są lectura, więc „Críticas” zgadza się z nimi rodzajem. */
  'zone.count.good': 'En rango',
  'zone.count.warning': 'Advertencias',
  'zone.count.critical': 'Críticas',

  'note.calibrated': 'Medición calibrada con papel blanco: los canales están igualados.',

  'tile.helpAria': 'Qué significa: {name}',
  'tile.noMeasurement': 'Sin medición',
  'tile.outOfScale': 'Fuera de escala',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Advertencia',
  'zone.spoken.warning': 'advertencia',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Evolución en el tiempo',
  'history.pickHint': 'Elige una magnitud y un intervalo',
  'history.metricLabel': 'Magnitud',
  'history.rangeAria': 'Intervalo de tiempo del gráfico',
  'history.emptyTitle': 'No hay datos en este intervalo',
  'history.emptyText': 'Inicia una medición en la pantalla Medir: el gráfico se llenará en unos segundos.',
  'history.tableTitle': 'Últimas lecturas',
  'history.tableHide': 'Ocultar la tabla',
  'history.tableShow': 'Mostrar la tabla',
  'history.tableCaption': 'Las últimas lecturas de la medición, la más reciente arriba.',
  'history.tableEmpty': 'No hay lecturas. Inicia una medición en la pantalla Medir.',

  'table.time': 'Hora',
  'table.metric': 'Magnitud',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     dłuższy zapis łamał się na dwie linie. */
  'range.1m': '1 min',
  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 días',
  'range.30d': '30 días',

  'chart.now': 'ahora',
  'chart.countSub': {
    one: '{n} lectura en el intervalo elegido',
    many: '{n} de lecturas en el intervalo elegido',
    other: '{n} lecturas en el intervalo elegido'
  },
  'chart.aria': '{name}, intervalo {range}, {count}, último valor {value} {unit}.',
  'chart.ariaZone': '{name}, intervalo {range}, {count}, último valor {value} {unit}, zona: {zone}.',
  'chart.ariaEmpty': '{name} — no hay datos en el intervalo {range}.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Asistentes y funciones auxiliares',
  'tools.note': 'Las herramientas ayudan a interpretar la medición. Todas están disponibles de inmediato, y la medición en sí funciona con independencia de ellas.',

  'tool.thresholds.sub': 'Cuándo debe un valor encender una advertencia',
  'tool.compare.sub': 'Cuál de las dos luces es más suave',
  'tool.calibration.sub': 'La única función que mejora la precisión de verdad',
  'tool.screenCheck.sub': 'Cinco pasos y una conclusión sobre tu pantalla',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Horario de umbrales”
     kontra „Horario”. Tak było i tak zostaje. */
  'tool.schedule.title': 'Horario de umbrales',
  'tool.schedule.sub': 'Otros umbrales por la tarde, sin tener que acordarte',
  'tool.alerts.sub': 'Un aviso cuando la zona crítica dura demasiado',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Ajustes',
  'more.thresholdsSub': 'Cuándo debe un valor encender una advertencia',
  'more.docsSub': 'Cómo medir y qué no dice esta medición',
  'more.appearanceTitle': 'Aspecto y accesibilidad',

  'settings.theme': 'Tema',
  'theme.auto': 'Como en el sistema',
  'theme.light': 'Claro',
  'theme.dark': 'Oscuro',

  'settings.textScale': 'Tamaño del texto',
  'textScale.100': 'Estándar',
  'textScale.115': 'Más grande (115 %)',
  'textScale.130': 'El más grande (130 %)',

  'settings.contrast': 'Contraste más alto',
  'settings.contrastSub': 'Bordes más marcados y texto secundario más oscuro.',
  'settings.sound': 'Sonido de las alertas',
  'settings.soundSub': 'Una señal breve cuando se activa una alerta de exposición.',
  'settings.vibrate': 'Vibración en las alertas',
  'settings.vibrateSub': 'Solo funciona en los dispositivos que lo admiten.',

  'more.dataTitle': 'Datos',
  'more.clearHistory': 'Borrar el historial de mediciones',
  'more.clearHistorySub': 'Elimina las lecturas guardadas en este dispositivo. Los umbrales, los perfiles y los ajustes se quedan.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'La aplicación es gratuita por completo. ',
  'more.supportLink': 'Puedes apoyarla voluntariamente.',

  'dialog.clearHistory.title': '¿Borrar el historial guardado?',
  'dialog.clearHistory.body': {
    one: 'Eliminaremos {n} punto de medición guardado en este dispositivo. Esta operación no se puede deshacer. Los umbrales, los perfiles y los ajustes quedarán intactos.',
    many: 'Eliminaremos {n} de puntos de medición guardados en este dispositivo. Esta operación no se puede deshacer. Los umbrales, los perfiles y los ajustes quedarán intactos.',
    other: 'Eliminaremos {n} puntos de medición guardados en este dispositivo. Esta operación no se puede deshacer. Los umbrales, los perfiles y los ajustes quedarán intactos.'
  },
  'dialog.clearHistory.confirm': 'Borrar el historial',
  'dialog.clearHistory.cancel': 'Conservarlo',

  'toast.historyCleared': 'Historial de mediciones borrado.',
  'toast.screenUnavailable': 'Esa pantalla todavía no está disponible en esta versión.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'Qué mide esta aplicación',
  'docs.leadText': 'La cámara del teléfono mira una superficie iluminada y, cinco veces por segundo, la aplicación calcula la media de los canales R, G y B de la parte central del encuadre. De esas tres cifras deduce siete magnitudes.',
  'docs.limitsTitle': 'Los límites del método',
  'docs.limitsText': 'Una cámara tiene tres canales de color anchos, exposición automática y balance de blancos automático. No mide el espectro y no conoce valores absolutos, así que el brillo es un indicador relativo, no lux. La temperatura de color y el impacto circadiano son aproximaciones calculadas a partir de los primarios sRGB. Un muestreo de {rate} Hz solo ve pulsaciones por debajo de {limit} Hz: los 100 Hz de la red eléctrica quedan fuera de su alcance y la aplicación nunca los dará como resultado.',

  'note.howTo.repeat.title': 'Repite la medición',
  'note.howTo.repeat.text': 'Una sola lectura es una instantánea. Una decena de segundos de medición da una imagen más fiable.',

  'docs.scale': 'Escala',
  'docs.direction': 'Dirección',
  'docs.directionHigher': 'Más alto es mejor',
  'docs.directionLower': 'Más bajo es más suave',
  'docs.privacyTitle': 'Datos y privacidad',
  'docs.privacyText': 'La imagen de la cámara no se envía ni se guarda en ninguna parte: de cada fotograma solo quedan tres cifras. Las mediciones, los umbrales y los ajustes están en la memoria del navegador de este dispositivo. La aplicación no hace ninguna petición de red y funciona sin conexión.',
  'docs.freeLine': 'Las siete magnitudes, el historial, el gráfico, las herramientas y el modo sin conexión funcionan para todo el mundo, sin cuenta y sin pagar nada.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Todo está disponible',
  'support.heroText': 'Las siete magnitudes, el historial de mediciones, el gráfico, todas las herramientas y el modo sin conexión funcionan para todo el mundo, desde el primer momento. Sin cuenta, sin límites y sin pagar nada.',
  'support.whyTitle': 'Por qué te lo pido',
  'support.whyText': '{app} se hace fuera del horario de trabajo y no gana nada con nadie: no tiene publicidad, no recoge datos y no tiene nada que vender. Mantenerla y seguir desarrollándola —nuevas magnitudes, correcciones, pruebas en más teléfonos— cuesta tiempo. Si la aplicación te ha servido, puedes contribuir. No tienes por qué.',
  'support.whatTitle': 'Qué te da una donación',
  'support.whatText': 'Nada. De verdad no desbloquea nada ni acelera nada: la aplicación se ve y funciona exactamente igual antes y después. Lo único que da es que el autor sepa que este trabajo le ha servido a alguien.',
  'support.button': 'Invítame a un café',
  'support.pendingTitle': 'El perfil todavía no está conectado',
  'support.pendingText': 'Aquí no hay todavía una dirección a la que enviar tu apoyo. Aparecerá en este sitio cuando esté lista; hasta entonces todo en la aplicación funciona exactamente igual.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'El botón abre la página externa de Buy Me a Coffee en una pestaña nueva. Ese es el único momento en el que algo sale de este dispositivo, y ocurre solo después de que lo pulses. Las mediciones, el historial y los ajustes se quedan aquí.',
  'privacy.externalPending': 'Cuando la dirección esté disponible, al pulsar el botón se abrirá una página externa en una pestaña nueva. Ese será el único momento en el que algo salga de este dispositivo. Las mediciones, el historial y los ajustes se quedan aquí.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (reserva en ui-core.js)',
  'boot.need.metrics': 'no se calculará ningún valor',
  'boot.need.bus': 'los módulos dejarán de verse entre sí',
  'boot.need.ui': 'no se podrá cambiar de pantalla',
  'boot.need.engine': 'la cámara y la medición no arrancarán',
  'boot.need.support': 'la pantalla Apoyo estará vacía',
  'boot.need.tools': 'la pestaña Herramientas estará vacía',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'No se han cargado estos módulos: {list}.',
  'boot.consoleHint': 'Comprueba el orden y las rutas de las etiquetas <script> en index.html.',
  'boot.incompleteTitle': 'La aplicación se ha cargado de forma incompleta',
  'boot.incompleteText': '{missing} Recarga la página; si eso no ayuda, los archivos del servidor están incompletos.',
  'boot.newVersion': 'Hay una versión nueva de la aplicación.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'Qué hacen los umbrales. ',
  'thresholds.noteText': 'El umbral de advertencia enciende el estado amarillo; el umbral crítico, el rojo. El cambio surte efecto de inmediato, también en la lectura que ya está en pantalla. Puedes guardar tu propio conjunto de umbrales con un nombre y volver a él cuando quieras.',
  'thresholds.profilesTitle': 'Perfiles de umbrales',
  'thresholds.profilesSub': 'Los tres integrados y los tuyos',
  'thresholds.customName': 'Nombre de tu propio perfil',
  'thresholds.customPlaceholder': 'p. ej. Dormitorio por la tarde',
  'thresholds.save': 'Guardar los umbrales actuales',
  'thresholds.saveHelp': 'Guarda exactamente los umbrales fijados arriba.',

  'profile.builtin.default.name': 'Por defecto',
  'profile.builtin.default.desc': 'Los umbrales del catálogo de magnitudes: el punto de partida para todas las mediciones.',
  'profile.builtin.evening.name': 'Tarde — suave',
  'profile.builtin.evening.desc': 'Avisa antes del color frío y del impacto circadiano.',
  'profile.builtin.work.name': 'Trabajo de escritorio',
  'profile.builtin.work.desc': 'Admite una luz diurna clara y fría; vigila el parpadeo y la uniformidad.',
  'profile.custom.desc': 'Perfil propio guardado el {date}.',

  'toast.thresholdsReset': 'Umbrales por defecto restaurados.',
  'toast.thresholdOrder': 'El umbral de advertencia debe ser más bajo que el crítico.',
  'toast.thresholdOrderInverted': 'En esta magnitud el umbral de advertencia debe ser más alto que el crítico.',
  'toast.profileNameMissing': 'Indica un nombre de perfil.',
  'toast.profileSaved': 'Perfil «{name}» guardado.',
  'toast.profileApplied': 'Perfil «{name}» aplicado.',
  'toast.profileApplyFailed': 'No se ha podido aplicar ese perfil.',
  'toast.profileRemoved': 'Perfil eliminado.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'Para qué sirve el horario. ',
  'schedule.noteText': 'Por la tarde tienen sentido otros umbrales que a mediodía. Una regla «de–a» cambia el perfil sola, para que no haya que acordarse. El horario nunca inicia ni detiene una medición.',
  'schedule.toggle': 'Activar el cambio automático',
  'schedule.toggleSub': 'Se comprueba cada minuto con el reloj del dispositivo.',
  'schedule.emptyTitle': 'No hay reglas',
  'schedule.emptyText': 'Añade la primera regla con el botón de abajo.',
  'schedule.add': 'Añadir una regla',
  'schedule.to': 'a',
  'schedule.profile': 'Perfil',
  'schedule.fromAria': 'Regla {n}: hora de inicio',
  'schedule.toAria': 'Regla {n}: hora de fin',
  'toast.scheduleTimeFormat': 'Indica las horas en el formato 22:00.',
  'toast.scheduleEnded': 'El horario ha terminado: han vuelto los umbrales anteriores.',
  'toast.scheduleApplied': 'El horario ha activado el perfil «{name}».',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'Qué hace una alerta. ',
  'alerts.noteText': 'Vigila una sola magnitud y avisa únicamente cuando esta se mantiene en la zona elegida sin interrupción durante el tiempo fijado. Nunca detiene la medición ni tapa los botones.',
  'alerts.toggle': 'Activar las alertas de exposición',
  'alerts.toggleSub': 'Solo funcionan mientras hay una medición en curso.',
  'alerts.metric': 'Magnitud vigilada',
  'alerts.level': 'A partir de qué zona',
  'alerts.level.warning': 'De advertencia y superiores',
  'alerts.level.critical': 'Solo la crítica',
  'alerts.sustain': 'Tras cuántos segundos sin interrupción',
  'alerts.sustainHelp': 'Los tiempos más cortos dan más falsas alarmas cuando mueves el teléfono.',
  'alerts.sound': 'Señal sonora breve',
  'alerts.soundSub': 'El sonido se genera en el dispositivo. También se puede desactivar de forma global en la pantalla Más.',
  'alerts.barTitle': 'Alerta de exposición',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} lleva {seconds} s en la zona de advertencia — ahora {value} {unit}.',
  'alerts.message.critical': '{name} lleva {seconds} s en la zona crítica — ahora {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'Cómo comparar. ',
  'compare.noteText': 'Inicia la medición, apunta la cámara a la primera fuente y guárdala como A. Sin cambiar la distancia ni el ángulo, cambia la luz y guarda B. La comparación solo tiene sentido si la escena es la misma.',
  'compare.slotA': 'Luz A',
  'compare.slotB': 'Luz B',
  'compare.save': 'Guardar la lectura actual',
  'compare.savedAt': 'Guardado el {date}, {time}',
  'compare.empty': 'Todavía no se ha guardado nada.',
  'compare.verdictTitle': 'Resultado de la comparación',
  'compare.verdictEmpty': 'Guarda las dos luces para ver cuál es más suave.',
  'compare.notEnough': 'No hay datos suficientes para comparar estas dos mediciones.',
  'compare.tie': 'Las dos fuentes salen prácticamente iguales ({metric}: {a} y {b} {unit}). La diferencia cabe dentro del ruido de la medición.',
  'compare.betterA': 'La más suave es la luz A: {metric} es de {better} {unit} frente a {worse} {unit}.',
  'compare.betterB': 'La más suave es la luz B: {metric} es de {better} {unit} frente a {worse} {unit}.',
  'compare.clear': 'Borrar la comparación',
  'toast.compareSavedA': 'Luz A guardada.',
  'toast.compareSavedB': 'Luz B guardada.',
  'toast.compareCleared': 'Comparación borrada.',
  'toast.measureFirst': 'Primero inicia una medición en la pantalla Medir.',

  /* Nazwa wielkości w środku zdania. Po hiszpańsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. */
  'metric.share.nameLower': 'proporción de azul',
  'metric.brightness.nameLower': 'brillo de la escena',
  'metric.kelvin.nameLower': 'temperatura de color',
  'metric.melanopic.nameLower': 'impacto circadiano',
  'metric.flicker.nameLower': 'parpadeo',
  'metric.uniformity.nameLower': 'uniformidad',
  'metric.comfort.nameLower': 'confort visual',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'Por qué funciona. ',
  'calib.noteText': 'El sensor de la cámara tiene una desviación fija entre sus canales. Medir una hoja de papel blanco muestra cuánta es y permite restarla. Es la única función de esta aplicación que mejora la precisión de verdad — y sigue sin convertir la cámara en un espectrómetro.',
  'calib.step1': 'Pon una hoja de papel blanco bajo la luz que quieres medir',
  'calib.step2': 'Inicia la medición y llena el encuadre con el papel',
  'calib.step3': 'Pulsa «Calibrar» y no muevas el teléfono durante 3 segundos',
  'calib.done': 'Calibrado el {date}, {time}.',
  'calib.none': 'Sin calibración. La medición funciona; trata los valores de forma comparativa.',
  'calib.gain': 'Ganancia {channel}',
  'calib.gainsLabel': 'Ganancias de los canales',
  'calib.gainsUnset': 'sin fijar',
  'calib.start': 'Calibrar (3 s)',
  'calib.clear': 'Borrar la calibración',
  'toast.calibCleared': 'Calibración borrada.',
  'calib.error.noEngine': 'El módulo de medición no está disponible.',
  'calib.error.notRunning': 'Inicia primero la medición y apunta la cámara a una hoja de papel blanco.',
  'calib.error.busy': 'La calibración ya está en curso.',
  'calib.error.tooFewSamples': 'Hay muy pocas muestras. Comprueba que la medición esté funcionando de verdad.',
  'calib.error.tooDark': 'La imagen es demasiado oscura para calibrar. Ilumina mejor el papel e inténtalo de nuevo.',
  'calib.error.tooSkewed': 'La desviación entre canales es demasiado grande para aceptarla como calibración. Usa papel blanco con una luz uniforme.',
  'calib.ok': 'Calibrado. La temperatura de color y el impacto circadiano serán ahora más precisos.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'Para qué sirve. ',
  'screencheck.noteText': 'Cinco pasos comprueban un monitor como lo comprueba un análisis: el blanco con dos brillos, la uniformidad de la retroiluminación y si el modo nocturno del sistema cambia algo de verdad. El asistente lee una medición que ya está en curso; él no la inicia.',
  'screencheck.step.white100.title': 'Blanco a brillo máximo',
  'screencheck.step.white100.hint': 'Abre una página en blanco en el monitor, pon el brillo al máximo y llena el encuadre con la pantalla.',
  'screencheck.step.white20.title': 'Blanco a brillo bajo',
  'screencheck.step.white20.hint': 'Baja el brillo del monitor a una quinta parte aproximadamente y no cambies el encuadre.',
  'screencheck.step.corners.title': 'Las esquinas de la pantalla',
  'screencheck.step.corners.hint': 'Vuelve al brillo máximo y muestra a la cámara toda la pantalla: comprobamos la uniformidad de la retroiluminación.',
  'screencheck.step.nightOff.title': 'Modo nocturno desactivado',
  'screencheck.step.nightOff.hint': 'Asegúrate de que el filtro de luz azul está desactivado.',
  'screencheck.step.nightOn.title': 'Modo nocturno activado',
  'screencheck.step.nightOn.hint': 'Activa el filtro de luz azul del sistema y repite el mismo encuadre.',
  'screencheck.stepHeading': 'Paso {n} de {total}: {title}',
  'screencheck.idleTitle': 'El asistente no está en marcha',
  'screencheck.idleHint': 'Inicia la medición en la pantalla Medir, después vuelve aquí y pulsa «Empezar».',
  'screencheck.next': 'Guardar el paso y seguir',
  'screencheck.cancel': 'Interrumpir',
  'screencheck.start': 'Empezar el asistente',
  'screencheck.clearResult': 'Borrar el resultado',
  'screencheck.resultTitle': 'Resultado',
  'screencheck.resultEmpty': 'Todavía no se ha guardado ningún paso.',
  'screencheck.resultPartial': 'Se han guardado {done} de {total} pasos. Las conclusiones aparecerán cuando haya algo que comparar.',
  'screencheck.note.uniformityLow': 'La uniformidad de la retroiluminación es del {value} %: se ven diferencias de brillo claras en el encuadre.',
  'screencheck.note.uniformityOk': 'La retroiluminación es uniforme ({value} %).',
  'screencheck.note.nightWorks': 'El modo nocturno baja la proporción de azul en {value} puntos porcentuales: funciona.',
  'screencheck.note.nightWeak': 'El modo nocturno cambia la proporción de azul solo en {value} puntos porcentuales. Es menos de lo que suele dar un filtro del sistema.',
  'screencheck.note.pwm': 'Con poco brillo el parpadeo sube del {from} % al {to} %: es el síntoma típico de la atenuación por pulsos (PWM).',
  'toast.screencheckDone': 'Asistente terminado. El resultado está abajo.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'De dónde salen estas cifras. ',
  'reports.noteText': 'El informe se calcula a partir del historial guardado en este dispositivo: un punto cada cinco segundos. El motor lo recoge desde la primera medición, así que el informe está listo de inmediato.',
  'reports.rangeAria': 'Intervalo del informe',
  'reports.day': 'Últimas 24 horas',
  'reports.week': 'Últimos 7 días',
  'reports.date': 'Informe del día {date}.',
  'report.headerDay': 'Día del {from} al {to} — {count}.',
  'report.headerWeek': 'Semana del {from} al {to} — {count}.',
  'count.points': { one: '{n} punto', many: '{n} de puntos', other: '{n} puntos' },
  'count.samples': { one: '{n} muestra', many: '{n} de muestras', other: '{n} muestras' },
  'report.emptyTitle': 'No hay datos en este periodo',
  'report.emptyText': 'Inicia una medición en la pantalla Medir: el historial se guarda solo.',
  'report.colAvg': 'Media',
  'report.colMin': 'Mínimo',
  'report.colMax': 'Máximo',
  'report.zonesTitle': 'Reparto por zonas',
  'report.worstHour': 'Peor momento del día',
  'report.worstHourNone': 'ninguno destaca',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'Qué hacer con esto',
  'report.disclaimerTitle': 'Esto no es un consejo de salud. ',
  'report.disclaimerText': 'Las conclusiones se derivan únicamente de lo que ha visto la cámara de este teléfono. La aplicación no mide el espectro, no conoce los lux y no establece ningún diagnóstico.',

  'advice.melanopic': 'El impacto circadiano medio fue de {value}×. Por la tarde conviene bajar de 0,50, y lo más sencillo es una bombilla más cálida o el modo nocturno.',
  'advice.kelvin': 'La luz era fría ({value} K de media). Para trabajar es impecable; en las dos horas antes de dormir es mejor por debajo de 3000 K.',
  'advice.flicker': 'Se ha detectado un parpadeo apreciable ({value} % de media). Suele deberse a un regulador barato o a la fuente de la retroiluminación.',
  'advice.uniformity': 'La luz se reparte de forma desigual ({value} %). Mover la lámpara o cambiar su ángulo suele dar más que cambiar la bombilla.',
  'advice.worstHour': 'El peor momento del día son las {hour}:00 — ahí se concentran las lecturas fuera de rango.',
  'advice.none': 'En este periodo nada se sale de lo normal. Lo que más aportaría ahora sería comparar dos fuentes de luz en la comparación A/B.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'Formato del archivo. ',
  'export.noteText': 'Punto y coma como separador de columnas, coma como marca decimal, codificación UTF-8 con marca BOM. Un Excel configurado en una región que usa la coma como marca decimal abre un archivo así sin necesidad de ajustar nada.',
  'export.range': 'Intervalo de datos',
  'export.columns': 'Columnas del archivo',
  'export.chipFilled': ' — columna rellenada',
  'export.help': 'El archivo contiene las siete columnas: el motor las calcula desde la primera medición y todas van al archivo.',
  'export.run': 'Guardar el archivo CSV',
  'export.previewEmpty': 'No hay lecturas en este intervalo. Inicia una medición: el historial se guarda solo.',
  'csv.range.hour': 'Última hora',
  'csv.range.day': 'Últimas 24 horas',
  'csv.range.week': 'Últimos 7 días',
  'csv.range.month': 'Últimos 30 días',
  'csv.colDate': 'Fecha',
  'csv.colTime': 'Hora',
  'csv.colZone': 'Zona',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'En el intervalo elegido no hay ninguna lectura.',
  'toast.exportFailed': 'Este navegador no ha permitido guardar el archivo.',
  'toast.exportSaved': {
    one: 'Archivo {filename} guardado ({n} fila).',
    many: 'Archivo {filename} guardado ({n} de filas).',
    other: 'Archivo {filename} guardado ({n} filas).'
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
