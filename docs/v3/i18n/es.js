/* docs/v3/i18n/es.js — słownik WŁASNY wersji v3, hiszpański.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/es.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * SKĄD TE ZDANIA: przekład z pl.js (redakcja pierwotna), z en.js jako wzorcem
 * terminologii i rejestru. Ton hiszpański trzyma się oryginału: rzeczowo,
 * ciepło, bez marketingu i bez straszenia. Zwrot do użytkownika przez „tú”,
 * tak samo jak w docs/shared/i18n/es.js i w słowniku v5.
 *
 * CZEGO TU NIE MA — i dlaczego: kluczy, które stoją już w słowniku wspólnym
 * (docs/shared/i18n/es.js) z DOKŁADNIE tym samym zdaniem. Nazwy stref, zdania
 * oceniające, noty o granicach metody, nazwy i opisy siedmiu wielkości oraz
 * zastrzeżenie medyczne są wspólne dla wersji i tłumaczy się je RAZ — poza
 * jednym świadomym nadpisaniem, opisanym przy 'verdict.critical.comfort'.
 *
 * TERMINOLOGIA JEST PRZEJĘTA ZE SŁOWNIKA WSPÓLNEGO, bez ani jednego wyjątku:
 * proporción de azul, brillo de la escena, temperatura de color, impacto
 * circadiano (w opisie: factor melanópico), parpadeo, uniformidad, confort
 * visual. Strefy: en rango / atención / crítico — stąd „umbral de atención”
 * i „umbral crítico”, a nie „de aviso” i „de alarma”. Stałe odpowiedniki
 * dzielone z v5: historial, sesión, muestra, medición, magnitud, umbral,
 * lectura, encuadre.
 *
 * ZASTRZEŻENIA MEDYCZNE i akapity o prywatności przełożone WIERNIE, bez
 * osłabiania i bez dodawania obietnic — to zdania o skutkach prawnych.
 *
 * ZAPIS LICZB WE WZORACH. Polska redakcja pisze przecinek dziesiętny
 * („0,3320”), angielska kropkę („0.3320”); hiszpański idzie za polskim.
 * Liczby wstawiane przez '{…}' formatuje warstwa językowa. Przed znakiem %
 * i × stoi spacja nierozdzielająca, zapisana jako '\u00A0' — zgodnie
 * z zaleceniem RAE i tak samo jak w słowniku v5.
 *
 * CUDZYSŁÓW: comillas latinas «…», jak w docs/shared/i18n/es.js.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js tego katalogu —
 * pilnuje tego docs/shared/i18n/keys.test.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['es'] = Object.assign(window.I18nData['es'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. */
  'app.wordmark': 'MONITOR DE LUZ',

  'state.idle': 'Listo',
  'state.starting': 'Iniciando',
  'state.running': 'Midiendo',
  'state.runningTpl': 'Midiendo {time}',
  'state.stopped': 'Detenido',
  'state.error': 'Error de cámara',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5,0 po hiszpańsku, 5.0 po angielsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'Empezar a medir',
  'keys.starting': 'Iniciando…',
  'keys.stop': 'Detener',
  'keys.flip': 'Cambiar',
  'keys.flipAria': 'Cambiar de cámara, frontal o trasera',
  'keys.menu': 'Menú',
  'keys.menuAria': 'Lista de módulos',
  'keys.back': '‹ Volver',
  'keys.backAria': 'Volver al panel',
  'keys.dash': 'Panel',
  'keys.zoom': 'Ampliar la vista previa',
  'keys.retry': 'Reintentar',
  'keys.refresh': 'Recargar',
  'keys.close': 'Cerrar',
  'keys.show': 'Mostrar',
  'keys.apply': 'Aplicar',
  'keys.remove': 'Eliminar',

  'monitor.legend': 'Vista previa de control',
  'monitor.badge': 'En directo',

  'aim.title': 'Apuntado',
  'aim.hint': 'La retícula marca exactamente la parte de la imagen que mide la aplicación.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'Canal principal',
  'readout.thresholdTpl': '(umbral {value})',
  'readout.contextTpl': 'mín {min} · media {avg} · máx {max} — últimos 60 s',
  'readout.contextEmpty': 'sin datos de los últimos 60 s',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'Qué significa: {name}',
  'aria.channel': '{name}, {value}, {zone}. Mostrar en el indicador grande.',
  'aria.channelStale': '{name}, sin datos. Mostrar en el indicador grande.',
  'aria.scale': 'Escala: {name}, de {min} a {max}. Ahora {value}, {zone}. Umbral de atención {warn}, umbral crítico {crit}.',
  'aria.readout': '{name}: {value}, {zone}.',
  'aria.readoutApprox': '{name}: aproximadamente {value}, {zone}. Valor aproximado.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'Escala del canal principal. Sin datos',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': 'Pulsa «Empezar a medir», apunta el teléfono a una superficie iluminada y mantenlo quieto unos segundos.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'El confort visual es bajo. Mira el módulo 01 para ver qué lo baja.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'Empieza por el botón «Empezar a medir» al final de la pantalla. La cámara se enciende solo después de que lo pulses.',
  'transient.measureStopped': 'Medición terminada · {time} · guardada en el historial.',
  'transient.newVersion': 'Hay una versión nueva de la aplicación.',
  'transient.thresholdsSaved': 'Umbrales guardados.',
  'transient.thresholdsRejected': 'No se ha guardado: el umbral de atención y el umbral crítico no pueden cruzarse.',
  'transient.historyCleared': 'Historial borrado.',

  'live.lead': 'Canal principal: {name}, {value}, {zone}.',
  'live.ready': 'Valoración lista. {name} {value}, {zone}.',
  'live.started': 'Medición iniciada.',
  'livebar.stopped': 'Medición detenida',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'Todavía no hay ningún registro. El historial se escribe mientras mides: mide durante un minuto y vuelve aquí.',
  'empty.recorderNoRange': 'En este intervalo no hubo ninguna medición.',
  'empty.coverageTpl': 'La medición cubrió {done} de {total} horas.',
  'empty.reportsNoData': 'El informe diario aparecerá después del primer día completo con mediciones.',
  'empty.compareOneSession': 'Para comparar hacen falta dos sesiones terminadas. Por ahora tienes una.',
  'empty.exportNoData': 'No hay nada que exportar. Empieza a medir para que el historial tenga contenido.',
  'empty.alertsOff': 'Las alertas están desactivadas. Una vez activadas, funcionan solo mientras la aplicación está abierta.',
  'empty.scheduleEmpty': 'No se ha fijado ninguna hora. La programación funciona solo mientras la aplicación está abierta.',
  'empty.historyEmpty': 'El historial está vacío.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'Lista de módulos',

  'modules.01.title': 'Registrador',
  'modules.01.desc': 'El curso de la medición a lo largo del tiempo, de un minuto a treinta días.',
  'modules.02.title': 'Umbrales',
  'modules.02.desc': 'Fija tus propios límites de atención y de alarma para cada magnitud.',
  'modules.03.title': 'Calibración',
  'modules.03.desc': 'Una referencia a una fuente de luz conocida, y lo que la calibración no arregla.',
  'modules.04.title': 'Informes',
  'modules.04.desc': 'Resúmenes diarios y semanales compuestos como una impresión.',
  'modules.05.title': 'Exportación',
  'modules.05.desc': 'Guardar las lecturas en un archivo CSV o JSON, con las columnas explicadas.',
  'modules.06.title': 'Comparación',
  'modules.06.desc': 'Dos sesiones una al lado de la otra, con la diferencia dada en cifras.',
  'modules.07.title': 'Prueba de pantalla',
  'modules.07.desc': 'Patrones para comprobar tu propio monitor, paso a paso.',
  'modules.08.title': 'Programación',
  'modules.08.desc': 'Mediciones a las horas que elijas.',
  'modules.09.title': 'Alertas',
  'modules.09.desc': 'Un aviso cuando se supera un umbral — y cuándo no funcionará.',
  'modules.10.title': 'Apoyo',
  'modules.10.desc': 'La aplicación es gratuita por completo. Aquí puedes invitar a un café al autor.',
  'modules.11.title': 'Documentación',
  'modules.11.desc': 'Qué es esta medición y qué no es con toda seguridad.',
  'modules.12.title': 'Ajustes',
  'modules.12.desc': 'Tema, tamaño del texto, menos movimiento, borrado del historial.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'Canales de medición',
  'channels.pick': 'Mostrar en el indicador grande',
  'channels.stale': 'sin datos',
  'channels.approx': 'valor aproximado',

  'help.unit': 'Unidad',
  'help.range': 'Rango',
  'help.thresholds': 'Umbrales',
  'help.warn': 'Umbral de atención',
  'help.crit': 'Umbral crítico',
  'help.now': 'ahora',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „Magnitud” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'Magnitud',
  'col.unit': 'Unidad',
  'col.range': 'Rango',
  'col.direction': 'Dirección',
  'col.time': 'Hora',
  'col.date': 'Fecha',
  'col.zone': 'Zona',
  'col.avg': 'Media',
  'col.min': 'Mínimo',
  'col.max': 'Máximo',
  'col.name': 'Columna',
  'col.meaning': 'Qué contiene',
  'col.channel': 'Canal',
  'col.gain': 'Ganancia',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'Intervalo de tiempo',
  'recorder.range.60s': '60 s',
  'recorder.range.15min': '15 min',
  'recorder.range.1h': '1 h',
  'recorder.range.24h': '24 h',
  'recorder.range.30d': '30 días',
  'recorder.gap': 'sin medición',
  'recorder.sessionTitle': 'Estadísticas de la sesión',
  'recorder.zonesCaption': 'Reparto de zonas de la proporción de azul',
  'recorder.tableCaption': 'Lecturas del intervalo seleccionado',
  'recorder.crosshair': 'Cursor de lectura',
  'recorder.prevAria': 'Punto anterior',
  'recorder.nextAria': 'Punto siguiente',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'Aspecto',
  'settings.themeLabel': 'Tema',
  'settings.themeSystem': 'Como el sistema',
  'settings.themeLight': 'Claro',
  'settings.themeDark': 'Oscuro',
  'settings.themeHint': 'El tema «como el sistema» cambia junto con el ajuste del teléfono.',
  'settings.textLabel': 'Tamaño del texto',
  /* Mnożnik jako LICZBA we wstawce — 1,15 po hiszpańsku, 1.15 po angielsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'Amplía toda la interfaz, no solo las letras: los botones y las filas crecen junto con el texto.',
  'settings.motionGroup': 'Movimiento',
  'settings.motionLabel': 'Menos movimiento',
  'settings.motionHint': 'Desactiva todas las transiciones. La aguja de la escala salta entonces una vez por segundo en lugar de deslizarse.',
  'settings.dataTitle': 'Datos',
  'settings.clearLabel': 'Borrar el historial',
  'settings.clearHintTpl': 'Ahora mismo el historial guarda {count} puntos.',
  'settings.clearHintEmpty': 'El historial está vacío.',
  'settings.clearTitle': '¿Borrar el historial?',
  'settings.clearConfirm': '¿Borrar todo el historial de mediciones? Esto no se puede deshacer.',
  'settings.clearKey': 'Borrar',
  'settings.aboutTitle': 'Sobre la aplicación',
  'settings.versionTpl': '{app}, versión {version}.',
  'settings.offlineText': 'La aplicación funciona sin red. Después de la primera apertura todos sus archivos están en la memoria del navegador, así que el modo avión no cambia nada. No se envía nada a ningún servidor, porque la aplicación no hace ninguna petición de red.',
  'settings.docsKey': 'Abrir la documentación',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'Cancelar',
  'common.save': 'Guardar',
  'common.reset': 'Restablecer',
  'common.yes': 'Sí',
  'common.no': 'No',
  'common.on': 'Activado',
  'common.off': 'Desactivado',
  'common.sep': ' · ',
  'common.stepsTitle': 'Paso a paso',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'Para qué sirven tus propios umbrales',
  'modules.02.intro': 'Un umbral decide cuándo la aplicación dice «Atención» y cuándo «Crítico». Los valores por defecto son nuestro criterio editorial, no una norma: si mides en otras condiciones, muévelos a tu medida. La valoración y la frase del panel se calculan con los umbrales nuevos al momento.',
  'modules.02.orderNormal': 'El umbral de atención tiene que quedar por debajo del crítico.',
  'modules.02.orderInvert': 'Aquí un valor más alto es mejor, así que el umbral de atención queda por encima del crítico.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'Vista previa de la escala: {name}',
  'modules.02.nowTpl': 'ahora {value}',
  'modules.02.resetDone': 'Umbrales por defecto restaurados.',
  'modules.02.profilesTitle': 'Perfiles',
  'modules.02.profilesHint': 'Un perfil es un conjunto guardado de umbrales de las siete magnitudes. Aplicar un perfil los cambia todos a la vez.',
  'modules.02.profileSaveKey': 'Guardar los umbrales actuales',
  'modules.02.profileNameLabel': 'Nombre del perfil nuevo',
  'modules.02.profileNameHint': 'El nombre se queda en este dispositivo. 40 caracteres como máximo.',
  'modules.02.profileNameEmpty': 'Escribe un nombre de perfil.',
  'modules.02.profileSavedTpl': 'Perfil «{name}» guardado.',
  'modules.02.profileAppliedTpl': 'Perfil «{name}» aplicado.',
  'modules.02.profileRemovedTpl': 'Perfil «{name}» eliminado.',
  'modules.02.profileFailed': 'No se ha podido aplicar este perfil.',
  'modules.02.profileCustomTpl': 'Perfil propio guardado el {date}.',
  'modules.02.builtin.default.name': 'Por defecto',
  'modules.02.builtin.default.desc': 'Los umbrales del catálogo de magnitudes: el punto de partida de todas las mediciones.',
  'modules.02.builtin.evening.name': 'Tarde — suave',
  'modules.02.builtin.evening.desc': 'Avisa antes del color frío y del impacto circadiano.',
  'modules.02.builtin.work.name': 'Trabajo de escritorio',
  'modules.02.builtin.work.desc': 'Admite luz de día intensa y fría; vigila el parpadeo y la uniformidad.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'Por qué funciona',
  'modules.03.why': 'El sensor de una cámara tiene una desviación fija entre sus canales. Medir una hoja de papel blanco muestra cuánta es y permite restarla. Es la única función de esta aplicación que mejora la precisión de verdad — y aun así no convierte una cámara en un espectrómetro.',
  'modules.03.steps.1': 'Pon una hoja de papel blanco bajo la luz que quieres medir.',
  'modules.03.steps.2': 'Pulsa «Empezar a medir» en el panel y llena el encuadre con el papel.',
  'modules.03.steps.3': 'Vuelve aquí, pulsa «Calibrar» y no muevas el teléfono durante tres segundos.',
  'modules.03.runKey': 'Calibrar (3 s)',
  'modules.03.clearKey': 'Eliminar la calibración',
  'modules.03.busyTpl': 'Midiendo el papel… quedan {sec} s',
  'modules.03.statusNone': 'Sin calibración. La medición funciona; trata los valores de forma comparativa.',
  'modules.03.statusOnTpl': 'Calibrado el {date} a las {time}.',
  'modules.03.gainsTitle': 'Ganancias de los canales',
  'modules.03.gainR': 'Rojo',
  'modules.03.gainG': 'Verde',
  'modules.03.gainB': 'Azul',
  'modules.03.gainsNone': 'sin ajustar',
  'modules.03.needRunning': 'Empieza a medir primero y apunta la cámara a una hoja de papel blanco.',
  'modules.03.tooFew': 'Muy pocas muestras. Comprueba que la medición esté funcionando de verdad.',
  'modules.03.tooDark': 'La imagen es demasiado oscura para calibrar. Ilumina mejor el papel e inténtalo de nuevo.',
  'modules.03.refused': 'La desviación entre canales es demasiado grande para aceptarla como calibración. Usa papel blanco con luz uniforme.',
  'modules.03.done': 'Calibrado. La temperatura de color y el impacto circadiano serán ahora más precisos.',
  'modules.03.cleared': 'Calibración eliminada.',
  'modules.03.limitsTitle': 'Lo que la calibración no arregla',
  'modules.03.limits.1': 'La calibración iguala los tres canales de la cámara y nada más. No le da un espectro a la cámara, así que la temperatura de color y el impacto circadiano siguen siendo aproximaciones calculadas a partir de los primarios sRGB.',
  'modules.03.limits.2': 'No convierte el brillo de la escena en una magnitud absoluta: esa cifra sigue siendo relativa. No desactiva la exposición automática ni el balance de blancos, que desplazan la lectura por debajo.',
  'modules.03.limits.3': 'No se traslada a otra luz: una calibración hecha con una bombilla describe esa bombilla. Con otra fuente, repítela. Y no cambia nada de lo que esta medición no es: sigue sin ser un examen y sigue sin ser una base para diagnosticar ninguna enfermedad.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'Periodo del informe',
  'modules.04.rangeDay': 'Día',
  'modules.04.rangeWeek': 'Semana',
  'modules.04.headTpl': 'Del {from} al {to} · {count} puntos de historial.',
  'modules.04.tableTitle': 'Resumen',
  'modules.04.tableCaption': 'Media, mínimo y máximo en el periodo seleccionado',
  'modules.04.panoramaTitle': 'Panorama',
  'modules.04.panoramaAriaTpl': 'Panorama: {name}, {span}.',
  'modules.04.panoramaSpanDay': 'el último día repartido por horas',
  'modules.04.panoramaSpanWeek': 'la última semana repartida por días',
  'modules.04.panoramaHint': 'La altura y el color de la barra dicen lo mismo: en rango — baja, atención — media, crítico — llena. Una raya en la base marca una hora sin medición.',
  'modules.04.coverageDayTpl': 'La medición cubrió {done} de {total} horas.',
  'modules.04.coverageWeekTpl': 'La medición cubrió {done} de {total} días.',
  'modules.04.zonesTitle': 'Reparto de zonas',
  'modules.04.zonesCaptionTpl': 'Calculado para el canal principal: {name}.',
  'modules.04.worstTpl': 'Momento más difícil: {value}.',
  'modules.04.worstNone': 'ninguno destaca',
  'modules.04.worstHourTpl': 'las {hour}',
  'modules.04.adviceTitle': 'Qué hacer con esto',
  'modules.04.adviceMelanopicTpl': 'El impacto circadiano medio fue de {value}\u00A0×. Por la tarde conviene bajar de 0,50, lo más fácil con una bombilla más cálida o con el modo nocturno.',
  'modules.04.adviceKelvinTpl': 'La luz era fría ({value} K de media). Para trabajar es impecable; en las dos horas antes de dormir resulta más suave por debajo de 3000 K.',
  'modules.04.adviceFlickerTpl': 'Se aprecia un parpadeo notable ({value}\u00A0% de media). Suele deberse a un regulador barato o a la fuente de la retroiluminación.',
  'modules.04.adviceUniformityTpl': 'La luz se reparte de forma desigual ({value}\u00A0%). Mover la lámpara o cambiar su ángulo suele dar más que cambiar la bombilla.',
  'modules.04.adviceWorstTpl': 'La mayoría de las lecturas fuera de los umbrales se concentra a las {hour}.',
  'modules.04.adviceNone': 'En este periodo nada sobresale por encima de los umbrales fijados.',
  'modules.04.limitsTitle': 'Esto no es un consejo de salud',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'Las conclusiones salen únicamente de lo que vio la cámara de este teléfono. La aplicación no mide el espectro y no establece ningún diagnóstico.',
  'modules.04.printHint': 'Esta página está pensada como una impresión: la tabla y los pies se leen igual en papel, con la lupa del sistema y en un lector de pantalla.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'Intervalo de datos',
  'modules.05.range1h': 'Hora',
  'modules.05.range24h': 'Día',
  'modules.05.range7d': '7 días',
  'modules.05.range30d': '30 días',
  'modules.05.csvKey': 'Guardar el archivo CSV',
  'modules.05.jsonKey': 'Guardar el archivo JSON',
  'modules.05.formatTitle': 'Formato del archivo',
  'modules.05.formatCsv': 'CSV: el punto y coma separa las columnas, la coma es el separador decimal, la codificación es UTF-8 con marca BOM. Un Excel configurado con la coma como separador decimal abre este archivo sin ajustar nada.',
  'modules.05.formatJson': 'JSON: los mismos datos en el campo «points», con punto decimal y marca de tiempo en milisegundos — así lo exige el formato.',
  'modules.05.resolution': 'El historial guarda un punto cada 5 segundos y llega hasta 30 días atrás. El archivo no contiene la resolución completa de cinco muestras por segundo: el motor la conserva solo durante un minuto.',
  'modules.05.offline': 'El archivo se crea en el dispositivo y se queda en el dispositivo. La exportación no se conecta a ninguna red.',
  'modules.05.columnsTitle': 'Descripción de las columnas',
  'modules.05.columnsCaption': 'Las columnas del archivo y su significado',
  'modules.05.descDate': 'La fecha del punto según el reloj del dispositivo, escrita día-mes-año.',
  'modules.05.descTime': 'La hora del punto, con precisión de un segundo.',
  'modules.05.descZone': 'La zona de la proporción de azul en el momento de guardar. El motor guarda la zona solo para esa magnitud; para las demás, calcúlala a partir de los umbrales.',
  'modules.05.descMetricTpl': '{short} Unidad: {unit}. Rango {min}–{max}.',
  'modules.05.previewTitle': 'Vista previa',
  'modules.05.previewHint': 'Las cinco primeras filas del archivo, exactamente como se guardarán.',
  'modules.05.savedTpl': 'Archivo {name} guardado — {rows} filas.',
  'modules.05.failed': 'Este navegador no ha dejado guardar el archivo.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'La aplicación guarda en este dispositivo cada sesión de medición terminada. Elige dos para verlas en una misma cinta y leer la diferencia en cifras.',
  'modules.06.noSessions': 'Todavía no hay ninguna sesión terminada. Empieza a medir, detén la medición y vuelve aquí.',
  'modules.06.slotA': 'Sesión A',
  'modules.06.slotB': 'Sesión B',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'Cinta',
  'modules.06.tapeAriaTpl': 'Curso de la sesión {slot}, magnitud {name}.',
  'modules.06.tapeHint': 'Las dos sesiones están estiradas al mismo ancho: una barra es la misma parte de la duración, no la misma hora. La altura y el color dicen lo mismo que en el panel.',
  'modules.06.tapeChannelTpl': 'La cinta muestra el canal principal: {name}.',
  'modules.06.diffTitle': 'Diferencia',
  'modules.06.diffCaption': 'Las medias de las dos sesiones y la diferencia entre ellas',
  'modules.06.clearKey': 'Eliminar las sesiones guardadas',
  'modules.06.cleared': 'Se han eliminado las sesiones guardadas.',
  'modules.06.savedTpl': 'Sesión guardada: {dur}.',
  'modules.06.limitsTitle': 'Lo que esta comparación no dice',
  'modules.06.limits': 'Comparas dos mediciones, no dos fuentes de luz. Si entre las sesiones cambió el encuadre, la distancia, la hora del día o la posición del teléfono, la diferencia habla también de eso. La comparación más honesta es la misma escena antes y después de un cambio de iluminación.',
  'modules.06.keepTpl': 'Se recuerdan como mucho las {count} sesiones más recientes.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'Los patrones de control se muestran a pantalla completa en este dispositivo. Sirven para mirar la pantalla con los ojos: si el blanco es uniforme, si los grises tiran a algún color y si la retroiluminación se escapa por las esquinas.',
  'modules.07.steps.1': 'Pon el brillo de la pantalla al nivel con el que sueles trabajar y desactiva el modo nocturno del sistema.',
  'modules.07.steps.2': 'Elige un patrón de la lista de abajo. Llenará toda la pantalla.',
  'modules.07.steps.3': 'Mira desde unos sesenta centímetros, de frente a la pantalla. Después mira el mismo patrón desde un ángulo.',
  'modules.07.steps.4': 'Sal con el botón «Cerrar el patrón» o con la tecla Escape y pasa al siguiente.',
  'modules.07.planesTitle': 'Patrones',
  'modules.07.exitKey': 'Cerrar el patrón',
  'modules.07.showAriaTpl': 'Mostrar el patrón: {name}',
  'modules.07.planeAriaTpl': 'Patrón de control: {name}. El botón de cierre está al final de la pantalla.',
  'modules.07.plane.white.name': 'Blanco',
  'modules.07.plane.white.hint': 'Busca manchas, dominantes de color y zonas más claras junto a los bordes. El blanco debería ser un solo color en toda la superficie.',
  'modules.07.plane.gray75.name': 'Gris 75\u00A0%',
  'modules.07.plane.gray75.hint': 'El gris tiene que ser gris. Un tono verdoso o rosado significa que el balance de blancos de la pantalla se ha desviado.',
  'modules.07.plane.gray50.name': 'Gris 50\u00A0%',
  'modules.07.plane.gray50.hint': 'El mejor patrón para juzgar el tono. Compara el centro con las esquinas.',
  'modules.07.plane.gray25.name': 'Gris 25\u00A0%',
  'modules.07.plane.gray25.hint': 'El gris oscuro revela las fugas de retroiluminación y las bandas de los paneles baratos.',
  'modules.07.plane.black.name': 'Negro',
  'modules.07.plane.black.hint': 'En una habitación a oscuras aquí se ve cada fuga de retroiluminación y cada esquina aclarada.',
  'modules.07.plane.red.name': 'Rojo puro',
  'modules.07.plane.red.hint': 'El rojo uniforme revela los subpíxeles muertos y las desigualdades del panel.',
  'modules.07.plane.green.name': 'Verde puro',
  'modules.07.plane.green.hint': 'El verde lleva la mayor parte del brillo: sobre él es más fácil detectar un píxel dañado.',
  'modules.07.plane.blue.name': 'Azul puro',
  'modules.07.plane.blue.hint': 'El azul muestra la suciedad y las marcas de la superficie de la pantalla mejor que el blanco.',
  'modules.07.plane.grid.name': 'Cuadrícula',
  'modules.07.plane.grid.hint': 'Las líneas tienen que ser igual de nítidas en las esquinas que en el centro. El desenfoque de los bordes es cosa del escalado de la imagen.',
  'modules.07.warn': 'El patrón tapa toda la pantalla, también el panel de control con el botón de medición. Es el único sitio de la aplicación donde eso ocurre, y por eso el botón de salida es grande y siempre visible. Mientras el patrón está en pantalla la medición sigue corriendo y no se puede detener: cierra el patrón para volver a los botones.',
  'modules.07.cameraTitle': 'Lo que aquí no puedes hacer',
  'modules.07.camera': 'Un teléfono no ve su propia pantalla, así que estos patrones no los puedes medir con el mismo dispositivo. Para medir un monitor, muestra el patrón en el monitor y mide con el teléfono: son dos dispositivos distintos y dos papeles distintos.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'La programación te recuerda que midas a una hora fijada. No enciende la cámara por su cuenta: a la hora señalada muestra un recordatorio, y la medición la inicias tú con el botón «Empezar a medir» del panel. Igual que la primera vez.',
  'modules.08.onlyOpenTitle': 'Cuándo esto no funcionará',
  'modules.08.onlyOpen': 'La programación funciona solo mientras la aplicación está abierta. Una pestaña del navegador cerrada no cuenta el tiempo y no recuerda nada. No pedimos permiso para enviar notificaciones del sistema y no enviamos nada a la red.',
  'modules.08.enableLabel': 'Activar los recordatorios',
  'modules.08.timesTitle': 'Horas',
  'modules.08.timeAriaTpl': 'Hora {n}: hora del recordatorio',
  'modules.08.addKey': 'Añadir una hora',
  'modules.08.removeAriaTpl': 'Eliminar la hora {time}',
  'modules.08.addedTpl': 'Hora {time} añadida.',
  'modules.08.removedTpl': 'Hora {time} eliminada.',
  'modules.08.badTime': 'Escribe la hora en el formato 22:00.',
  'modules.08.nextTpl': 'Próximo recordatorio: {time}.',
  'modules.08.nextNone': 'Los recordatorios están desactivados.',
  'modules.08.dueTpl': 'Hora de medición programada: {time}.',
  'modules.08.dueKey': 'Mostrar el panel',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'Una alerta vigila una sola magnitud y se pronuncia solo cuando esa magnitud se mantiene en la zona elegida sin interrupción durante el tiempo fijado. Nunca detiene la medición y nunca tapa los botones.',
  'modules.09.enableLabel': 'Activar las alertas',
  'modules.09.metricLabel': 'Magnitud vigilada',
  'modules.09.levelLabel': 'Desde qué zona',
  'modules.09.levelWarning': 'Desde atención hacia arriba',
  'modules.09.levelCritical': 'Solo crítico',
  'modules.09.sustainLabel': 'Tras cuántos segundos sin interrupción',
  'modules.09.sustainHint': 'Los tiempos más cortos dan más falsas alarmas cuando mueves el teléfono. De cinco segundos no bajamos.',
  'modules.09.soundLabel': 'Señal sonora corta',
  'modules.09.soundHint': 'El sonido se genera en el dispositivo. No se descarga nada de la red.',
  'modules.09.cooldownHint': 'Como mucho una alerta cada dos minutos. Una alarma repetida en cada muestra es una alarma que se acaba desactivando para siempre.',
  'modules.09.whenNotTitle': 'Cuándo no funcionará una alerta',
  'modules.09.whenNot': 'El aviso vive dentro de la aplicación, no en el sistema. No funcionará cuando la aplicación esté cerrada u oculta en segundo plano, cuando la medición no esté en marcha ni cuando la magnitud vigilada no se pueda medir en ese momento. No pedimos permiso para enviar notificaciones del sistema.',
  'modules.09.firedTpl': '{name}: {zone} desde hace {sec} s — ahora {value}.',
  'modules.09.saved': 'Ajustes de la alerta guardados.',
  'modules.09.statusOnTpl': 'Vigilando: {name}, {level}, tras {sec} s.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'Esta aplicación es gratuita',
  'support.freeText': 'Las siete magnitudes muestran cifras desde el primer arranque. El registrador, los umbrales, la calibración, los informes, la exportación, la comparación de sesiones y todo el historial de treinta días funcionan sin cuenta, sin pagos y sin límites — igual sin conexión. Aquí no hay nada reservado tras un pago para más adelante.',
  'support.whyTitle': 'Por qué te lo pido',
  'support.whyText': 'Monitor de Luz lo hago y lo mantengo yo solo, fuera del horario de trabajo. El apoyo va al tiempo que hace falta para las correcciones, para las pruebas en más teléfonos y para las próximas herramientas de la lista de módulos. Nada dejará de funcionar si nadie aporta nada.',
  'support.nothingTitle': 'Qué te da una donación',
  'support.nothingText': 'Nada. Ninguna cifra, ningún módulo y ningún ajuste se desbloquean con una donación, porque todo está desbloqueado desde el principio. Lo único que queda es que yo sepa que a alguien le ha servido.',
  'support.keyTitle': 'Si quieres ayudar',
  'support.keyLabel': 'Invítame a un café',
  'support.keyAria': 'Invítame a un café — abre una página externa en una pestaña nueva',
  'support.serviceText': 'El perfil de donaciones lo lleva un servicio externo, por ejemplo Buy Me a Coffee. La aplicación no carga de él ningún script, ningún widget ni ninguna imagen: aquí hay un enlace normal y nada más.',
  'support.privacyText': 'Pulsar este botón abre una página externa en una pestaña nueva, y ese es el único momento en el que algo sale de este dispositivo. Las mediciones, el historial y los ajustes se quedan donde estaban — en la memoria de este navegador.',
  'support.privacyPendingText': 'Cuando la dirección esté disponible, pulsar el botón abrirá una página externa en una pestaña nueva y ese será el único momento en el que algo salga de este dispositivo. Las mediciones, el historial y los ajustes se quedan donde estaban — en la memoria de este navegador.',
  'support.emptyTitle': 'El perfil todavía no está conectado',
  'support.emptyText': 'La dirección del perfil de donaciones todavía no está puesta, así que aquí no hay ningún botón que lleve a ninguna parte. El resto de la aplicación funciona igual: nada está esperando esa donación.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'Lo que esta aplicación NO mide',
  'docs.notList.1': 'No mide el espectro. Una cámara tiene tres canales de color anchos, exposición automática y balance de blancos automático.',
  'docs.notList.2': 'No mide valores absolutos. El brillo de la escena es un indicador relativo, no el resultado de una medición fotométrica.',
  'docs.notList.3': 'No mide la temperatura de color directamente. La temperatura de color y el impacto circadiano son aproximaciones calculadas a partir de los primarios sRGB.',
  'docs.notList.4': 'No ve el parpadeo de la red eléctrica. Un muestreo de 5 Hz solo ve pulsaciones por debajo de 2,5 Hz: los 100 Hz de la red quedan fuera de su alcance y la aplicación nunca los dará como resultado.',
  'docs.notList.5': 'No establece ningún diagnóstico y no da consejos de salud. Ningún resultado es ni lo uno ni lo otro.',
  'docs.notList.6': 'No compara tu luz con ningún patrón oficial. Los umbrales son ajustes que puedes cambiar en el módulo 02.',
  'docs.whatTitle': 'Qué mide y cómo',
  'docs.whatLead': 'La cámara del teléfono mira una superficie iluminada y, cinco veces por segundo, la aplicación calcula las medias de los canales R, G y B del recorte central del encuadre. De esas tres cifras deduce siete indicadores.',
  'docs.whatCrop': 'El recorte es el 60\u00A0% central del ancho y el 60\u00A0% del alto del fotograma — exactamente el rectángulo que dibuja la retícula en la pantalla APUNTADO. Fuera de él no se cuenta nada.',
  'docs.whatRate': 'Una muestra cada 200 ms, es decir, 5 veces por segundo. El último minuto está en la memoria a resolución completa; todo lo más antiguo se guarda cada 5 segundos y llega hasta treinta días atrás.',
  'docs.metricsTitle': 'Las siete magnitudes',
  'docs.formulasTitle': 'Fórmulas',
  'docs.formula.share.formula': 'proporción = B / (R + G + B) × 100\u00A0%',
  'docs.formula.share.text': 'Calculada sobre valores sRGB sin invertir la gamma — a propósito, porque es la misma definición que en la versión anterior de la aplicación y los umbrales fijados entonces siguen significando lo mismo. Separa el color del brillo.',
  'docs.formula.brightness.formula': 'brillo = (R + G + B) / 3 / 255 × 100\u00A0%',
  'docs.formula.brightness.text': 'El valor medio de los canales en porcentaje del rango. La exposición automática lo desplaza por debajo, así que es un indicador relativo: compara dos escenas en lugar de leer una sola cifra como una medición.',
  'docs.formula.kelvin.title': 'Temperatura de color — la aproximación de McCamy',
  'docs.formula.kelvin.formula': 'n = (x − 0,3320) / (y − 0,1858)\nCCT = −449 n³ + 3525 n² − 6823,3 n + 5520,33',
  'docs.formula.kelvin.text': 'Primero invertimos la gamma sRGB, luego pasamos con la matriz a CIE XYZ para el blanco D65 y calculamos la cromaticidad x, y. La fórmula de McCamy es fiable más o menos entre 2000 K y 12500 K. Fuera de ese intervalo la cúbica se desvía, así que el resultado se recorta y se marca como poco fiable: la línea base de la escala pasa entonces a ser discontinua y aparece la frase «fuera del alcance del método».',
  'docs.formula.melanopic.title': 'Impacto circadiano — el factor melanópico',
  'docs.formula.melanopic.formula': 'mel = 0,0016 R + 0,3110 G + 0,8460 B\nY = 0,2127 R + 0,7152 G + 0,0722 B\nresultado = (mel / Y) × normalización a 1,00 para el blanco neutro',
  'docs.formula.melanopic.text': 'Los tres canales en valores lineales. La magnitud real es la integral del espectro con la curva de sensibilidad de la melanopsina (con su máximo cerca de 490 nm); una cámara tiene tres canales anchos, así que ponderamos los primarios sRGB con la sensibilidad melanópica en sus longitudes de onda aproximadas (R 612 nm, G 549 nm, B 465 nm). La dirección del cambio es fiable, el valor absoluto no — por eso junto a esta cifra está el signo «≈».',
  'docs.formula.flicker.formula': 'parpadeo = (máx − mín) / (máx + mín) × 100\u00A0%',
  'docs.formula.flicker.text': 'La definición de la IES, calculada sobre una ventana de muestras de brillo. La frecuencia la estimamos a partir del número de veces que la señal cruza su valor medio. Un muestreo de 5 Hz solo ve modulaciones por debajo de 2,5 Hz (el límite de Nyquist), y damos por fiable una frecuencia únicamente entre 0,2 y 2 Hz con una amplitud desde el 0,5\u00A0% — por debajo de ese umbral los cruces de la media son ruido del sensor, no la pulsación de una fuente.',
  'docs.formula.uniformity.formula': 'uniformidad = celda más oscura / celda más clara × 100\u00A0%',
  'docs.formula.uniformity.text': 'Dividimos el recorte en nueve celdas en una cuadrícula de 3×3 y comparamos los extremos. El 100\u00A0% es luz repartida de forma perfectamente uniforme. Un valor bajo en una pantalla indica fuga de retroiluminación o un reflejo; en el escritorio, una lámpara mal colocada. Es la única magnitud, junto con el confort, en la que más alto significa mejor.',
  'docs.formula.comfort.formula': '100 puntos menos las penalizaciones:\nimpacto circadiano por encima de 0,75 — hasta 35 pts\ncolor por encima de 4000 K — hasta 25 pts\nparpadeo por encima del 5\u00A0% — hasta 25 pts\nuniformidad por debajo del 60\u00A0% — hasta 15 pts',
  'docs.formula.comfort.text': 'Una sola valoración en lugar de seis cifras. Una magnitud que no se ha podido medir no da ninguna penalización: la falta de datos nunca se hace pasar por un buen resultado. Los pesos son nuestro criterio editorial, no una norma; por eso el módulo 01 muestra el desglose en componentes, para que se pueda no estar de acuerdo con esta valoración.',
  'docs.rangesTitle': 'Rangos y umbrales',
  'docs.rangesLead': 'Los umbrales de abajo son los que rigen ahora mismo: si los cambiaste en el módulo 02, la tabla muestra tus valores, no los de fábrica.',
  'docs.dirNormal': 'más bajo significa más suave',
  'docs.dirInvert': 'más alto significa mejor',
  'docs.privacyTitle': 'Datos y privacidad',
  'docs.privacyText': 'La imagen de la cámara no se envía ni se guarda en ninguna parte: de cada fotograma solo quedan tres cifras. Las mediciones, los umbrales y los ajustes están en la memoria del navegador de este dispositivo. La aplicación no hace ninguna petición de red y funciona sin conexión.',
  'docs.mdrTitle': 'Aviso legal',
  'docs.freeText': 'La aplicación es gratuita por completo y así se queda: las siete magnitudes, el historial, los informes, la exportación y el modo sin conexión funcionan sin cuenta, sin pagos y sin límites. Quien quiera dar las gracias encontrará el módulo 10, «Apoyo».',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'La aplicación se ha cargado de forma incompleta',
  'boot.filesTpl': 'No se han cargado estos archivos: {list}.',
  'boot.modulesTpl': 'Estos módulos no se han presentado: {list} — esas entradas no se abrirán desde la lista.',
  'boot.modulesRangeTpl': 'módulos {from}–{to}',
  'boot.tail': 'Recarga la página. Si eso no ayuda, los archivos del servidor están incompletos.',
  'boot.loss.bus': 'los módulos dejarán de verse entre sí y la medición no arrancará',
  'boot.loss.metrics': 'no se calculará ningún valor',
  'boot.loss.scaleCore': 'desaparecerán la geometría de la escala y el formato de los números',
  'boot.loss.scaleText': 'desaparecerán todos los textos de la interfaz',
  'boot.loss.shell': 'no se podrá abrir ningún módulo',
  'boot.loss.engine': 'la cámara y la medición no arrancarán',
  'boot.loss.dash': 'el panel se quedará vacío'
});
