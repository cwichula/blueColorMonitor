/* Monitor Światła v5 — słownik hiszpański.
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr). NIE JEST
 * KALKĄ żadnego z nich: polskie i angielskie zdania przełożono na naturalną
 * hiszpańszczyznę. Zachowane zostało to, co niesie znaczenie: liczby, progi,
 * jednostki, nazwy wstawek i — co do treści — zastrzeżenia medyczne oraz
 * zdania o prywatności. Tych ostatnich nie wolno osłabiać ani wzmacniać:
 * „nie zastępuje rozmowy z lekarzem” i „obraz nie opuszcza urządzenia”
 * znaczą po hiszpańsku dokładnie tyle samo, ani mniej, ani więcej.
 *
 * REJESTR: bezpośrednie „tú” — konsekwentnie w całym pliku, także
 * w komunikatach błędów. Aplikacja mówi ciepło i wprost, jak hiszpańskie
 * aplikacje użytkowe; „usted” brzmiałoby tu jak pismo urzędowe. Odmiana
 * ogólna (europejska), bez słownictwa lokalnego.
 * Cudzysłowy hiszpańskie (comillas latinas): « … ». Przecinek dziesiętny
 * (1,00 — jak po polsku). Przed znakiem % stoi spacja nierozdzielająca,
 * zgodnie z zaleceniem RAE.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych i pomocy):
 *   proporción de azul, brillo de la escena, temperatura de color,
 *   impacto circadiano (w opisie: factor melanópico), parpadeo, uniformidad,
 *   confort visual.
 * STREFY: seguro / moderado / dañino — mówią o świetle, a nie o stanie
 * aplikacji, i wchodzą w zdanie „zona: {zone}” tak samo jak polskie
 * „bezpiecznie / umiarkowanie / szkodliwie”.
 * POZOSTAŁE STAŁE ODPOWIEDNIKI: historial (historia), sesión (sesja),
 * muestra (próbka), medición (pomiar), magnitud (wielkość), umbral (próg),
 * lectura (odczyt), encuadre (kadr).
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Texto con una inserción {name}'   — napis zwykły,
 *   'klucz.kropkowany': { one, many, other }               — forma zależna
 *                                                            od liczby.
 * Hiszpański ma w CLDR trzy formy: `one`, `many` i `other`. Kategoria `many`
 * obsługuje skrócony zapis wielkich liczb („1 millón”) i w tych rzeczownikach
 * brzmi tak samo jak `other`. Nazwy wstawek są identyczne jak w pl.js —
 * pilnuje tego keys.test.js. Kolejność wstawek w zdaniu wolno zmieniać,
 * nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Monitor de Luz',
  'app.description': 'Monitor de Luz — la cámara mide siete magnitudes de la luz que te rodea. Todo se calcula en este dispositivo, nada sale a la red.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Monitor de Luz',
  'app.skipToContent': 'Ir al contenido',
  'app.nav.aria': 'Navegación principal',
  'app.noscript.title': 'Esta app necesita JavaScript',
  'app.noscript.text': 'Toda la medición ocurre dentro de esta pestaña del navegador: JavaScript lee los fotogramas de la cámara y calcula con ellos las siete magnitudes de la luz. Sin él no hay con qué medir. Activa JavaScript para esta página y vuelve a abrirla — seguirá sin enviarse nada a la red.',

  'nav.measure': 'Medir',
  'nav.history': 'Historial',
  'nav.tools': 'Herramientas',
  'nav.support': 'Apoyo',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Midiendo',
  'shell.live.aria': 'Midiendo. {metric}: {value}. Volver a la pantalla de medición.',
  'shell.live.metricFallback': 'Magnitud principal',
  'shell.action.fallback': 'Acción de la pantalla',

  'shell.loadFail.title': 'No se ha podido cargar la pantalla «{screen}»',
  'shell.loadFail.text': 'Probablemente falten algunos archivos en la memoria del dispositivo. Conéctate a la red y recarga la página.',
  'shell.fatal.title': 'Algo ha salido mal',
  'shell.fatal.text': 'La app no ha podido componer la pantalla. Recargar la página suele bastar — tus mediciones y tus ajustes guardados se quedan donde están.',
  'shell.fatal.reload': 'Recargar la página',
  'shell.boot.failTitle': 'La app no ha podido arrancar',
  'shell.boot.failText': 'El armazón de la app no ha arrancado. Recarga la página — tus mediciones y tus ajustes guardados se quedan donde están.',
  'shell.background.error': 'Algo se ha roto en segundo plano',
  'shell.background.action': 'Recargar',
  'shell.update.title': 'Hay una versión nueva disponible',
  'shell.update.action': 'Recargar',

  'onboarding.title': 'Antes de empezar',
  'onboarding.lead': 'Monitor de Luz usa la cámara para mirar la luz que te rodea y calcula con ella siete magnitudes — de la proporción de azul al confort visual.',
  'onboarding.privacy': 'La imagen nunca sale de este dispositivo: no hay servidor, no hay cuenta y no hay nada que enviar. Las siete magnitudes funcionan desde el primer momento, sin iniciar sesión y sin pagar.',
  'onboarding.honesty': 'Esto es una orientación, no un instrumento de medida ni una prueba médica. Lo que no se puede medir no se muestra — en lugar de un número verás una raya.',
  'onboarding.start': 'Empecemos',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Aplicar',
  'overlay.toast.close': 'Descartar el mensaje',
  'overlay.sheet.label': 'Diálogo',
  'overlay.sheet.close': 'Cerrar',
  'overlay.dialog.confirm': 'Confirmar',
  'overlay.dialog.cancel': 'Cancelar',

  /* Jedyny napis naprawdę wspólny dla kilku ekranów. „Zamknij” świadomie NIE
     jest tu wspólne: raz zamyka arkusz (overlay.sheet.close), raz podsumowanie
     sesji (measure.summary.close) — w części języków to dwa różne słowa. */
  'common.cancel': 'Cancelar',

  /* Separator wyliczenia w jednym zdaniu (przypisy na tarczy wskaźnika).
     Nie jest znakiem uniwersalnym: część języków pisze tu „、” albo „؛”. */
  'common.listSeparator': ', ',

  /* ──────────────────────────────  Ekran pomiaru  ────────────────────────── */

  'measure.title': 'Medir',

  'measure.intro.aria': 'Iniciar una medición',
  'measure.intro.headline': 'Mira qué luz te ilumina',
  'measure.intro.lead': 'La cámara muestra cuánto azul hay en la luz que te está dando ahora mismo — y si es demasiado para esta hora del día.',
  'measure.intro.start': 'Empezar a medir',
  'measure.intro.hint': 'El navegador pedirá permiso para usar la cámara. La medición arranca en cuanto lo concedas.',
  'measure.intro.privacy': 'La imagen de la cámara se procesa en este dispositivo y nunca sale de él. No enviamos, no guardamos ni compartimos ni un solo fotograma.',
  'measure.intro.honesty': 'Esto no es un producto sanitario ni una prueba médica. La aplicación muestra una aproximación de la luz que te rodea; no juzga tu salud ni sustituye una consulta médica.',

  'measure.live.aria': 'Medición en curso',
  'measure.badge.starting': 'Iniciando',
  'measure.badge.paused': 'En pausa',
  'measure.badge.running': 'Midiendo',
  'measure.stale': 'Esperando la imagen — la vista previa se congela mientras la app está en segundo plano.',
  'measure.crop': 'Medimos el centro del encuadre — el {percent}\u00A0% marcado del ancho y del alto de la imagen.',
  'measure.facing.front': 'cámara frontal',
  'measure.facing.back': 'cámara trasera',

  'measure.boot.title': 'Iniciando la cámara…',
  'measure.boot.text': 'Si el navegador pide permiso, concédelo — sin imagen no hay nada que medir. El permiso vale solo para esta página y puedes retirarlo después.',
  'measure.boot.cancel': 'Cancelar',

  'measure.hold': 'Lecturas congeladas. La cámara sigue funcionando, pero nada llega al historial ni a las medias.',
  'measure.gridHint': 'Elige una tarjeta para llevar esa magnitud al indicador grande.',

  'measure.stop': 'Detener',
  'measure.pause': 'Pausar',
  'measure.resume': 'Reanudar',
  'measure.flip.aria': 'Cambiar de cámara',
  'measure.flip.toBack': 'Cambiar a la cámara trasera',
  'measure.flip.toFront': 'Cambiar a la cámara frontal',

  'measure.fail.aria': 'Error de cámara',
  'measure.fail.headline': 'La cámara no se ha iniciado',
  'measure.fail.retry': 'Reintentar',
  'measure.fail.back': 'Volver',
  'measure.fail.savedSession': 'La sesión anterior a la interrupción ({duration}) se ha guardado en el historial.',
  'measure.error.fallback': 'No se ha podido iniciar la cámara.',

  'measure.summary.aria': 'Resumen de la sesión',
  'measure.summary.title': 'Resumen de la sesión',
  'measure.summary.paused': 'en pausa durante {duration}',
  'measure.summary.nothingMeasured': 'Ninguna magnitud llegó a registrar una lectura — la cámara no vio luz en toda la sesión.',
  'measure.summary.note': 'Las medias cuentan solo las muestras tomadas fuera de la pausa. Las magnitudes que no se midieron quedan fuera, no cuentan como cero.',
  'measure.summary.nearThreshold': 'Más cerca del umbral',
  'measure.summary.worstPoint': 'Punto más débil',
  'measure.summary.averageZone': '{zone} de media',
  'measure.summary.tooShort': 'La sesión duró {duration} — demasiado poco para entrar sola en el historial. Puedes guardarla a mano.',
  'measure.summary.again': 'Medir otra vez',
  'measure.summary.save': 'Guardar en el historial',
  'measure.summary.saved': 'Guardada en el historial',
  'measure.summary.savedToast': 'Sesión guardada en el historial.',
  'measure.summary.close': 'Cerrar',

  'measure.method.title': 'Cómo lo medimos',
  'measure.method.p1': 'La app toma muestras de la imagen de la cámara diez veces por segundo y calcula las magnitudes a partir del {percent}\u00A0% central del encuadre — la retícula de la vista previa marca justo esa zona.',
  'measure.method.p2': 'La cámara de un teléfono tiene tres canales anchos y su propia corrección automática de exposición y de balance de blancos. Ve las proporciones de la luz, no su espectro.',
  'measure.method.p3': 'La proporción de azul, el brillo, el parpadeo y la uniformidad son lo que la cámara mide de verdad. La temperatura de color y el impacto circadiano son aproximaciones declaradas abiertamente, calculadas a partir de los primarios sRGB.',
  'measure.method.p4': 'El parpadeo solo se ve por debajo de cuatro hercios. Los 100 Hz de la red eléctrica quedan muy lejos del alcance de este muestreo y nunca se darán como lectura.',
  'measure.method.p5': 'Ninguno de estos números es una medición fotométrica ni un resultado médico. La imagen de la cámara no sale del dispositivo.',
  'measure.method.ok': 'Entendido',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'Inicio de la cámara cancelado.',
  'measure.announce.stoppedNoSamples': 'Medición detenida. No se recogió ninguna muestra.',
  'measure.announce.stopped': 'Medición detenida. El resumen de la sesión está listo.',
  'measure.announce.interrupted': 'Medición interrumpida. El resumen de la sesión está listo.',
  'measure.announce.paused': 'Medición en pausa. Lecturas congeladas.',
  'measure.announce.resumed': 'Medición reanudada.',
  'measure.announce.switchedFront': 'Cambiado a la cámara frontal. Empieza una sesión nueva.',
  'measure.announce.switchedBack': 'Cambiado a la cámara trasera. Empieza una sesión nueva.',
  'measure.announce.lead': 'Magnitud principal: {metric}.',
  'measure.announce.cameraError': 'Error de cámara. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'La luz se mantuvo en el rango seguro durante toda la sesión — deja la lámpara como está y vuelve a comprobarlo al anochecer, cuando alumbre otra fuente.',
  'measure.advice.share.evening': 'La proporción de azul fue de {value} de media — pon el modo nocturno en las pantallas y apaga la luz de techo, dejando una sola lámpara cálida a la altura del escritorio.',
  'measure.advice.share.day': 'La proporción de azul fue de {value} de media — de día es aceptable, pero programa la pantalla para pasar al modo cálido dos horas antes de acostarte.',
  'measure.advice.brightness': 'El encuadre estaba sobreexpuesto ({value} de media) — apártate de la fuente de luz o baja el brillo de la pantalla que estás midiendo, porque con esa exposición las demás magnitudes también pierden precisión.',
  'measure.advice.kelvin.evening': 'La temperatura de color se mantuvo en {value} de media — al anochecer baja de 3000 K: pon la lámpara en modo cálido o monta una bombilla de 2700 K.',
  'measure.advice.kelvin.day': 'La temperatura de color se mantuvo en {value} de media — para el día es un blanco bueno y estimulante, pero por la noche pon esa misma lámpara a 2700 K.',
  'measure.advice.melanopic.evening': 'El impacto circadiano fue de {value} de media — en las dos horas antes de dormir baja de 0,50 ×, atenuando la luz principal y alumbrando desde la altura del escritorio en vez de desde el techo.',
  'measure.advice.melanopic.day': 'El impacto circadiano fue de {value} de media — a esta hora esa dosis ayuda, pero por la noche cambia esta fuente por una más débil y más cálida.',
  'measure.advice.flicker': 'El parpadeo llegó a {value} de media — suele ser un regulador de intensidad o una retroiluminación muy baja: sube el brillo de la pantalla por encima del 40\u00A0% o cambia el regulador por uno sin modulación PWM.',
  'measure.advice.uniformity': 'La luz caía de forma desigual ({value} de media) — coloca la lámpara a un lado de la mesa y añade una segunda fuente más débil desde el lado opuesto, en vez de un solo punto fuerte.',
  'measure.advice.comfort': 'El confort visual salió a {value} de media — empieza por un solo cambio: baja a la mitad el brillo de la fuente principal y solo después ocúpate del color de la luz.',
  'measure.advice.default': 'Cambia una cosa de tu iluminación y vuelve a medirla — comparar dos sesiones dice más que una lectura suelta.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'Historial',
  'history.action.export': 'Exportar el historial',

  'history.metricGroup.aria': 'Elección de magnitud',
  'history.announce.metric': 'Magnitud: {metric}',
  'history.rangeGroup.aria': 'Intervalo de tiempo',
  /* „Últimos {range}” nie przechodzi: podstawiane bywa „24 h” (rodzaj żeński)
     i „7 días” (męski). Forma bez rodzaju działa dla obu. */
  'history.range.aria': '{range} más recientes',

  'history.stats.title': 'Estadísticas del intervalo',
  'history.stats.head': '{metric}\u00A0—\u00A0{range} más recientes',
  'history.stats.note': 'Calculado a partir de lo que muestra el gráfico. El tiempo sin medición no se cuenta — no ponemos un cero en su lugar.',
  'history.stat.min': 'Mínimo',
  'history.stat.avg': 'Media',
  'history.stat.max': 'Máximo',
  'history.trend.up': 'sube en este intervalo',
  'history.trend.flat': 'sin cambio claro',
  'history.trend.down': 'baja en este intervalo',
  'history.trend.none': 'nada con lo que comparar',

  'history.sessions.title': 'Sesiones de medición',
  'history.sessions.count': '{sessions}, las más nuevas primero',
  'history.sessions.empty': 'Todavía ninguna sesión',
  'history.sessions.hint': 'La sesión se guarda al detener la medición.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'rango: {range}',
  'history.session.noMeasure': 'sin medición',

  'history.data.title': 'Datos',
  'history.data.subtitle': 'El historial se guarda solo en este dispositivo.',
  'history.export.csv': 'Exportar CSV',
  'history.export.json': 'Exportar JSON',
  'history.export.ok': 'Archivo listo para guardar',
  'history.export.fail': 'No se ha podido preparar el archivo. En modo privado, y en una ventana incrustada en otra app, el navegador bloquea el guardado — abre la página en una pestaña normal.',
  'history.export.sheet.title': 'Exportación del historial',
  'history.export.sheet.text': 'El CSV se abre en una hoja de cálculo (separado por punto y coma, con la coma como marca decimal). El JSON lo conserva todo, incluida la lista de sesiones y los huecos en los que no se midió nada.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Borrar el historial',
  'history.clear.title': '¿Borrar el historial?',
  'history.clear.text': 'Se eliminarán {points} y {sessions}. No se puede deshacer — si quieres conservar los datos, expórtalos primero.',
  'history.clear.confirm': 'Borrar',
  'history.clear.announce': 'Historial borrado.',
  'history.clear.toast': 'Historial borrado',

  'history.empty.title': 'Todavía no hay nada que mostrar',
  'history.empty.text': 'El historial se llena mientras mides — un punto por segundo. Todo se queda en este dispositivo.',
  'history.empty.action': 'Ir a la medición',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 min',
  'range.5m': '5 min',
  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 días',
  'range.30d': '30 días',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Fecha y hora',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'La memoria del dispositivo está llena — las nuevas mediciones ya no se guardan.',
  'storage.blocked': 'El navegador no deja guardar el historial — los datos desaparecerán al cerrar la pestaña.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Herramientas',
  'tools.action.about': 'Sobre la medición',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Idioma',
  'tools.language.subtitle': 'Por defecto la app sigue el idioma del dispositivo; la elección de esta lista se aplica al momento y se queda en este navegador.',
  'tools.language.aria': 'Idioma de la interfaz',
  'tools.language.system': 'Auto',
  'tools.language.announce': 'Idioma de la interfaz: {language}.',

  'tools.appearance.title': 'Aspecto',
  'tools.appearance.theme.title': 'Tema',
  'tools.appearance.theme.desc': '«Auto» sigue el ajuste del sistema.',
  'tools.appearance.theme.aria': 'Tema',
  'tools.theme.system': 'Auto',
  'tools.theme.light': 'Claro',
  'tools.theme.dark': 'Oscuro',
  'tools.appearance.accent.title': 'Color de acento',
  'tools.appearance.accent.desc': 'El color de los botones, las selecciones y los deslizadores.',
  'tools.appearance.accent.aria': 'Color de acento',
  'tools.appearance.textScale.title': 'Tamaño del texto',
  'tools.appearance.textScale.desc': 'Amplía toda la interfaz, no solo las etiquetas.',
  'tools.appearance.textScale.aria': 'Tamaño del texto',
  'tools.appearance.density.title': 'Densidad',
  'tools.appearance.density.desc': 'La compacta cabe más contenido en una pantalla.',
  'tools.appearance.density.aria': 'Densidad del diseño',
  'tools.density.comfortable': 'Cómoda',
  'tools.density.compact': 'Compacta',
  'tools.appearance.motion.title': 'Menos movimiento',
  'tools.appearance.motion.desc': 'Desactiva las animaciones y el deslizamiento suave de la aguja. El ajuste del sistema se respeta en cualquier caso.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Océano',
  'accent.violet': 'Violeta',
  'accent.amber': 'Ámbar',
  'accent.mint': 'Menta',
  'accent.rose': 'Rosa',

  'tools.thresholds.title': 'Umbrales',
  'tools.thresholds.subtitle': 'A partir de qué valor debe decir la app «moderado» y a partir de cuál «crítico». Los umbrales por defecto son nuestra propuesta, no una norma — ajústalos a tu medida.',
  'tools.thresholds.warn': 'Umbral de aviso',
  'tools.thresholds.crit': 'Umbral de alarma',
  'tools.thresholds.warn.aria': 'Umbral de aviso — {metric}',
  'tools.thresholds.crit.aria': 'Umbral de alarma — {metric}',
  'tools.thresholds.reset': 'Por defecto',
  'tools.thresholds.reset.aria': 'Restaurar los umbrales por defecto: {metric}',
  'tools.thresholds.moved': '{threshold} movido a {value}.',
  'tools.thresholds.resetAll': 'Restaurar todos los umbrales',
  'tools.thresholds.resetAll.title': '¿Restaurar los umbrales por defecto?',
  'tools.thresholds.resetAll.text': 'Las siete magnitudes volverán a los umbrales que propone la app. El historial de mediciones queda intacto.',
  'tools.thresholds.resetAll.confirm': 'Restaurar',
  'tools.thresholds.resetAll.cancel': 'Dejar los míos',
  'tools.thresholds.resetAll.toast': 'Los umbrales han vuelto a los valores por defecto',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'por encima de {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} o menos',
  'tools.zoneRange.goodBelow': 'por debajo de {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} o más',

  'tools.calibration.title': 'Calibración',
  'tools.calibration.subtitle': 'Para quien tenga con qué comparar.',
  'tools.calibration.intro': 'Dos teléfonos apuntando a la misma lámpara darán números algo distintos — cada sensor tiene su propio tinte. Si tienes a mano una medición de la que te fíes, aquí puedes subir o bajar un poco cada canal de la imagen. Los multiplicadores actúan antes de que se calcule nada, así que cambian las siete magnitudes a la vez.',
  'tools.calibration.neutral': '¿No tienes con qué comparar? Déjalo en 1,00 — es el ajuste de fábrica y no estropea nada.',
  'tools.calibration.forward': 'El cambio se aplica a partir de ahora. Las mediciones que ya están en el historial se quedan como estaban en el momento de guardarlas — no las recalculamos, porque eso sería reescribir los datos a posteriori.',
  'tools.calibration.reset': 'Restablecer la calibración',
  'tools.calibration.reset.toast': 'Calibración restablecida',
  'tools.calibration.channel.r': 'Canal rojo',
  'tools.calibration.channel.g': 'Canal verde',
  'tools.calibration.channel.b': 'Canal azul',
  'tools.calibration.channel.aria': '{channel} — multiplicador de calibración',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'Medición',
  'tools.measurement.wake.title': 'Mantener la pantalla encendida',
  'tools.measurement.wake.desc': 'La pantalla sigue encendida mientras mides. La batería baja más deprisa.',
  'tools.measurement.wake.unsupported': 'Este navegador no permite mantener la pantalla encendida.',
  'tools.measurement.haptics.title': 'Vibración',
  'tools.measurement.haptics.desc': 'Una confirmación corta al empezar, al detener y al cambiar de magnitud.',
  'tools.measurement.haptics.unsupported': 'Este dispositivo no informa de ningún motor de vibración.',

  'tools.about.title': 'Sobre la medición',
  'tools.about.subtitle': 'Qué calcula exactamente cada una de las siete magnitudes y dónde acaba la honestidad de este método.',
  'tools.about.scale': 'Escala: de {min} a {max}.',
  'tools.about.threshold': 'Avisamos a partir de {warn} y damos la alarma a partir de {crit}.',
  'tools.about.thresholdInvert': 'Avisamos por debajo de {warn} y damos la alarma por debajo de {crit}.',
  'tools.about.limitsHead': 'Lo que esta medición no puede hacer',
  'tools.about.limit.spectrum.title': 'Una cámara no ve el color como lo ve un instrumento de medida',
  'tools.about.limit.spectrum.text': 'La cámara de un teléfono tiene tres canales: rojo, verde y azul. Un instrumento para medir la luz los descompone en decenas de bandas estrechas. Lo que ves aquí sale de esos tres números — de una forma razonable, pero sigue siendo un cálculo, no un espectro medido.',
  'tools.about.limit.exposure.title': 'La cámara se regula el brillo ella sola',
  'tools.about.limit.exposure.text': 'Apunta el teléfono a una ventana y la cámara oscurece la imagen para no sobreexponerla. El «brillo de la escena» baja entonces, aunque en la habitación no haya cambiado nada. Por eso compara este valor dentro de una misma toma, no entre habitaciones.',
  'tools.about.limit.flicker.title': 'Una cámara lenta no capta el parpadeo rápido',
  'tools.about.limit.flicker.text': 'Comprobamos la imagen {hz} veces por segundo. Un pulso más rápido que {nyquist} veces por segundo puede aparecer en esta medición como más lento de lo que es en realidad, o desaparecer del todo — y el parpadeo de la red eléctrica es justo así de rápido. Si la app capta algo, tómalo como una señal de que «aquí hay algo que pulsa», no como una frecuencia medida.',
  'tools.about.limit.medical.title': 'Esto no es una prueba médica ni un consejo médico',
  'tools.about.limit.medical.text': 'La app ayuda a notar que la luz de alrededor es fría, brillante o inquieta, y sugiere qué se puede hacer al respecto. No emite ningún juicio sobre tu salud y no sustituye una conversación con un médico ni una medición con un medidor profesional.',
  'tools.about.privacy': 'Todo se calcula en tu dispositivo. La imagen de la cámara no se envía ni se guarda en ningún sitio — a la memoria solo llegan los números calculados.',
  'tools.about.privacyPolicy': 'Política de privacidad completa',

  'tools.data.title': 'Datos',
  'tools.data.subtitle': 'Todo está en la memoria de este navegador y de aquí no sale a ninguna parte.',
  'tools.data.summary.empty': 'Todavía no hay ninguna medición guardada.',
  'tools.data.summary': 'En memoria: {points} y {sessions}.',
  'tools.data.export.csv': 'Exportar CSV',
  'tools.data.export.json': 'Exportar JSON',
  'tools.data.clear': 'Borrar el historial',
  'tools.data.reset': 'Ajustes por defecto',
  'tools.data.reset.title': '¿Restaurar los ajustes por defecto?',
  'tools.data.reset.text': 'El aspecto, los umbrales, la calibración y los ajustes de medición volverán a su estado inicial. El historial de mediciones queda intacto.',
  'tools.data.reset.confirm': 'Restaurar',
  'tools.data.reset.toast': 'Ajustes por defecto restaurados',
  'tools.data.wipe': 'Borrar todos los datos',
  'tools.data.wipe.title': '¿Borrar todos los datos de la app?',
  'tools.data.wipe.text': 'Desaparecerán: todo el historial de mediciones y la lista de sesiones, tus umbrales y tu calibración, y tus ajustes de aspecto. La app volverá al estado del primer arranque.',
  'tools.data.wipe.note': 'No tenemos ninguna copia de estos datos — nunca han salido de este dispositivo, así que no hay de dónde recuperarlos.',
  'tools.data.wipe.check': 'Entiendo que esto no se puede deshacer',
  'tools.data.wipe.confirm': 'Borrarlo todo',
  'tools.data.wipe.toast': 'Se han borrado todos los datos de la app',
  'tools.data.wipe.announce': 'Se han borrado todos los datos de la app. Los ajustes han vuelto a los valores por defecto.',
  'tools.data.storage.blocked': 'Este navegador no deja guardar nada de forma permanente (modo privado o datos de sitios bloqueados). Todo lo que ajustes aquí desaparecerá al cerrar la pestaña.',
  'tools.data.storage.full': 'La memoria del navegador se ha llenado y las nuevas mediciones ya no se guardan. Borrar el historial liberará espacio.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Apoyo',
  'support.free.title': 'Todo está disponible',
  'support.free.lead': 'Las siete magnitudes, el historial completo, los umbrales, la calibración y la exportación funcionan desde el primer arranque — sin cuenta, sin límites y sin pagar nada.',
  'support.free.note': 'La medición se calcula por completo en este dispositivo y funciona sin red. Aquí no hay una versión mejor guardada detrás de un muro.',
  'support.why.title': 'Por qué te lo pido',
  'support.why.lead': 'Monitor de Luz se hace fuera del horario de trabajo, sin publicidad, sin patrocinador y sin ninguna empresa detrás. El apoyo paga el tiempo dedicado a las correcciones, a nuevas magnitudes y a mantener vivo lo que ya funciona.',
  'support.what.title': 'Qué te da una donación',
  'support.what.lead': 'Nada. Una donación no desbloquea nada — ninguna función extra, ninguna insignia junto a tu nombre, ninguna prioridad. Todo lo que la app sabe hacer ya lo tienes.',
  'support.what.note': 'Lo único que queda es que yo sepa que a alguien le ha servido. De verdad, es motivo suficiente.',
  'support.cta.title': 'Si quieres ayudar',
  'support.cta.button': 'Invítame a un café',
  'support.cta.nolink': 'El perfil de donaciones todavía no está conectado. Cuando lo esté, en este sitio habrá un botón.',
  'support.cta.privacy': 'Este enlace abre la página externa de Buy Me a Coffee en una pestaña nueva. Ese es el único momento en el que algo sale de este dispositivo — la medición en sí se queda siempre aquí.',
  'support.cta.privacyFuture': 'Cuando la dirección esté puesta, el botón abrirá la página externa de Buy Me a Coffee en una pestaña nueva. Ese será el único momento en el que algo salga de este dispositivo — la medición en sí se queda siempre aquí.',
  'support.cta.note': 'Aquí no hay cuenta atrás, ni recordatorios, ni una ventana que se abra sola. Esta petición espera en esta pestaña y en ningún otro sitio.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'último minuto',
  'gauge.aria': '{metric}: {value}, zona: {zone}',
  'gauge.aria.note': '{metric}: {value}, zona: {zone}, {note}',
  'gauge.aria.initial': '{metric}: sin datos',
  'gauge.value.none': 'sin datos',
  /* Odczyt słowny z jednostką: „27 por ciento”, „1,20 veces”. Osobny wzorzec,
     bo w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'valor aproximado',
  'gauge.note.offScale': 'fuera de escala',
  'gauge.metric.unknown': 'Magnitud desconocida',

  'chart.aria.label': 'Gráfico del historial de mediciones',
  'chart.hint': 'Gráfico interactivo. Las flechas izquierda y derecha mueven el cursor de lectura, Inicio y Fin saltan al principio y al final del intervalo, Escape oculta el cursor.',
  'chart.empty.title': 'Sin datos',
  'chart.empty.text': 'Empieza a medir — el gráfico aparece tras las primeras lecturas.',
  'chart.few.title': 'Datos insuficientes',
  'chart.few.text': 'Tenemos una lectura: {value}. Para trazar una línea hacen falta dos.',
  'chart.legend.line': 'medición',
  'chart.legend.gap': 'hueco en la medición',
  'chart.aria.head': 'Gráfico: {metric}, intervalo {range}',
  'chart.aria.empty': 'Sin datos en este intervalo.',
  'chart.aria.one': 'Una lectura: {value}.',
  'chart.aria.summary': 'De {min} a {max}, media {avg}, {points}.',
  'chart.aria.gaps': 'La serie tiene huecos — entonces no estábamos midiendo.',
  'chart.readout.empty': 'Sin datos en este intervalo.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'No hay datos suficientes para dibujar un gráfico.',
  'chart.readout.hint': 'Arrastra por el gráfico, o usa las flechas, para leer una medición concreta.',
  'chart.time.now': 'ahora',
  'chart.time.justNow': 'hace un momento',
  'chart.time.ago': 'hace {duration}',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd zegar dwudziestoczterogodzinny, bo tak
     hiszpańskie ustawienia regionalne formatują godzinę. */
  'chart.sample.ago': '\u221230\u00A0min',
  'chart.sample.clock': '00:00',
  'chart.sample.date': '30\u00A0ago',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'Proporción de azul',
  'metric.share.short': 'Qué parte de la luz que vemos recae en el canal azul.',
  'metric.share.help': 'Separa el color del brillo — es el valor que se mueve cuando enciendes el modo nocturno.',
  'metric.brightness.name': 'Brillo de la escena',
  'metric.brightness.short': 'El brillo medio de la imagen de la cámara.',
  'metric.brightness.help': 'Un valor relativo, no lux — la exposición automática de la cámara lo desplaza por debajo.',
  'metric.kelvin.name': 'Temperatura de color',
  'metric.kelvin.short': 'Si la luz es cálida o fría.',
  'metric.kelvin.help': 'Por debajo de 3000 K la luz es cálida y más suave por la noche. 6500 K es el blanco por defecto de la mayoría de las pantallas.',
  'metric.melanopic.name': 'Impacto circadiano',
  'metric.melanopic.short': 'Con cuánta fuerza actúa esta luz sobre el reloj biológico.',
  'metric.melanopic.help': 'Una aproximación del factor melanópico. 1,00 es el blanco neutro de la luz de día; por la noche conviene bajar de 0,50.',
  'metric.flicker.name': 'Parpadeo',
  'metric.flicker.short': 'Pulsación invisible de la fuente de luz.',
  'metric.flicker.help': 'Los reguladores y las retroiluminaciones baratas pulsan. El ojo no lo ve, pero se señala como posible causa de cansancio y de dolor de cabeza.',
  'metric.uniformity.name': 'Uniformidad',
  'metric.uniformity.short': 'Si la luz se reparte por igual en el encuadre.',
  'metric.uniformity.help': 'Un valor bajo en una pantalla significa fuga de retroiluminación o un reflejo; en un escritorio — una lámpara mal colocada.',
  'metric.comfort.name': 'Confort visual',
  'metric.comfort.short': 'Una sola nota en vez de seis números.',
  'metric.comfort.help': 'Reúne las demás mediciones en una puntuación de 0 a 100 y muestra qué es lo que más la baja. Los pesos son nuestro criterio editorial, no una norma.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'bueno',
  'zone.warn': 'moderado',
  'zone.crit': 'crítico',
  'zone.none': 'sin datos',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 ago'). Po hiszpańsku małą literą. */
  'date.month.short.1': 'ene',
  'date.month.short.2': 'feb',
  'date.month.short.3': 'mar',
  'date.month.short.4': 'abr',
  'date.month.short.5': 'may',
  'date.month.short.6': 'jun',
  'date.month.short.7': 'jul',
  'date.month.short.8': 'ago',
  'date.month.short.9': 'sep',
  'date.month.short.10': 'oct',
  'date.month.short.11': 'nov',
  'date.month.short.12': 'dic',

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
     dopóki różnica jest mniejsza niż minuta, mówimy „hace un momento”. */
  'time.justNow': 'hace un momento',
  'time.aMinuteAgo': 'hace un minuto',
  'time.minutesAgo': 'hace {minutes}\u00A0min',
  'time.hoursAgo': 'hace {hours}\u00A0h',
  'time.yesterday': 'ayer',
  'time.daysAgo': 'hace {days}\u00A0días',

  /* Formy zależne od liczby. Hiszpański ma w CLDR trzy: `one`, `many`
     i `other`. Kategoria `many` obsługuje skrócony zapis wielkich liczb
     („1 millón”) i w tych rzeczownikach brzmi tak samo jak `other`.
     Rozstrzyga je Intl.PluralRules dla języka aktywnego. */
  'time.days.plural': { one: 'día', many: 'días', other: 'días' },
  'unit.sample.plural': { one: 'muestra', many: 'muestras', other: 'muestras' },
  'unit.measurement.plural': { one: 'medición', many: 'mediciones', other: 'mediciones' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Hiszpański ma tu jedną — oba klucze zostają (kształt słownika jest wspólny
     dla wszystkich języków), a wartości są identyczne. */
  'unit.session.plural': { one: 'sesión', many: 'sesiones', other: 'sesiones' },
  'unit.session.accusative.plural': { one: 'sesión', many: 'sesiones', other: 'sesiones' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy — po hiszpańsku rozdziela je dopowiedzenie „de datos”. */
  'unit.chartPoint.plural': { one: 'punto de datos', many: 'puntos de datos', other: 'puntos de datos' },
  'unit.point.plural': { one: 'punto', many: 'puntos', other: 'puntos' },
  'unit.kelvin.plural': { one: 'kelvin', many: 'kelvins', other: 'kelvins' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „por ciento”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'por ciento',
  'unit.spoken.times': 'veces',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, bez rady,
     co zrobić dalej. Każdy kod ma tu jedno zdanie diagnozy i jedno zdanie
     rady. */
  'camera.error.denied': 'No se ha concedido permiso para usar la cámara. Permite la cámara para esta página en los ajustes del navegador o del sistema e inténtalo de nuevo.',
  'camera.error.notfound': 'No se ha encontrado ninguna cámara. Comprueba que el dispositivo tenga una y que no esté desactivada en el sistema.',
  'camera.error.inuse': 'La cámara está ocupada por otra aplicación. Cierra esa aplicación o esa pestaña e inténtalo de nuevo.',
  'camera.error.insecure': 'La cámara solo funciona por HTTPS o en localhost. Abre esta página en una dirección que empiece por «https://».',
  'camera.error.unsupported': 'Este navegador no ofrece aquí la cámara. Prueba con Chrome o con Safari, en una ventana normal — no en una vista previa incrustada en otra app.',
  'camera.error.unknown': 'No se ha podido iniciar la cámara.'
};
