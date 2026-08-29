/* docs/v1/i18n/es.js — słownik WŁASNY wersji v1, hiszpański.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka. Kolejność jest treścią umowy: plik wersji dokłada się do tego samego
 * obiektu i może nadpisać dowolny klucz wspólny — nigdy odwrotnie.
 *
 * DLACZEGO TEN SŁOWNIK JEST SAMOWYSTARCZALNY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar w app.js, własne
 * dwie wielkości zamiast siedmiu i własne nazwy stref („Segura” zamiast
 * wspólnego „En rango”). Dlatego wszystko, co v1 pokazuje, stoi TUTAJ — także
 * klucze, które przypadkiem brzmią tak samo jak wspólne. Zestaw kluczy jest
 * dokładnie taki sam jak w pl.js tego katalogu — pilnuje tego
 * docs/shared/i18n/keys.test.js.
 *
 * SKĄD TE ZDANIA: przekład z pl.js (redakcja pierwotna), z en.js jako wzorcem
 * terminologii i rejestru. Zwrot do użytkownika przez „tú”, cudzysłów «…»,
 * przecinek dziesiętny i spacja nierozdzielająca przed znakiem % (zalecenie
 * RAE) — tak samo jak w docs/shared/i18n/es.js i w słowniku wersji 5.
 *
 * TERMINOLOGIA WZIĘTA Z WARSTWY WSPÓLNEJ (bez wyjątków): proporción de azul,
 * brillo de la escena, temperatura de color, lux melanópico; lectura (odczyt),
 * medición (pomiar), magnitud (wielkość), umbral (próg), encuadre (kadr),
 * historial (historia), sesión (sesja). Przyciski «Start» i «Stop» zostają
 * nietłumaczone — dokumentacja odsyła do nich po nazwie.
 *
 * WŁASNE NAZWY STREF. v1 ma trzy strefy zamiast wspólnych czterech, a jej
 * przymiotniki są uzgodnione z rodzajem żeńskim rzeczownika „zona” („zona
 * segura”), dokładnie tak jak polskie „strefa bezpieczna”. Same leksemy są te
 * z wersji 5 (seguro / moderado / dañino), więc ta sama rzecz nazywa się
 * wszędzie tak samo. Wersja plakatowa (zone.badge.*) jest osobnym kluczem,
 * a nie zapisem wielkimi literami przez CSS.
 *
 * ZASTRZEŻENIA MEDYCZNE i akapity o prywatności przełożono DOKŁADNIE, bez
 * osłabiania i bez dodawania obietnic: to zdania o skutkach prawnych, a nie
 * o stylu. Terminy urzędowe za hiszpańską wersją rozporządzenia (UE) 2017/745:
 * „producto sanitario”.
 *
 * MARKUP W WARTOŚCIACH. Klucze z sufiksem `.html` zawierają <b>, <i>, <code>
 * i encje HTML; wstawia je data-i18n-html, czyli tylko tam, gdzie autor tekstu
 * świadomie tego chciał — nigdy do treści pochodzącej od użytkownika.
 */
window.I18nData = window.I18nData || {};
window.I18nData['es'] = Object.assign(window.I18nData['es'] || {}, {

  /* ---- aplikacja ---- */

  'app.name': 'Monitor de Luz Dañina',
  'app.description': 'Mide con la cámara la intensidad del color azul en una pantalla y la muestra en un gráfico claro con zonas: segura, moderada y dañina.',

  /* ---- wybór języka ---- */

  'language.label': 'Idioma',
  'language.help': 'El idioma de toda la aplicación. Todos los idiomas ya están en este dispositivo: no se descarga nada y no se envía nada a ninguna parte.',
  'language.auto': 'Según el dispositivo',

  /* ---- nawigacja ---- */

  'nav.aria': 'Menú principal',
  'nav.tabsAria': 'Vistas de la aplicación',
  'nav.announce': 'Pantalla: {screen}',
  'nav.camera': 'Cámara',
  'nav.monitoring': 'Monitor',
  'nav.support': 'Apoyo',
  'nav.more': 'Más',
  'nav.docs': 'Documentación',
  'nav.about': 'Acerca de y contacto',
  'nav.settings': 'Umbrales de aviso',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← Volver',
  'action.back.aria': 'Volver a la pantalla anterior',
  'action.openDocs': 'Ir a la documentación',
  'action.exportCsv': 'Exportar CSV',
  'action.delete': 'Eliminar',
  'action.closeNotification': 'Cerrar la notificación',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref: przymiotnik uzgodniony z rodzajem żeńskim
     („zona segura”), a nie wspólne „En rango”. Wersja plakatowa
     (zone.badge.*) jest osobnym kluczem, a nie zapisem wielkimi literami przez
     CSS: tureckie „i” i greckie akcenty nie znoszą automatycznej zamiany. */

  'zone.good': 'Segura',
  'zone.warning': 'Moderada',
  'zone.critical': 'Dañina',
  'zone.none': 'Sin datos',

  'zone.badge.good': 'SEGURA',
  'zone.badge.warning': 'MODERADA',
  'zone.badge.critical': 'DAÑINA',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'Brillo del canal B',
  'metric.raw.unitLabel': '% de brillo del canal B',
  'metric.share.name': 'Proporción de azul',
  'metric.share.longName': 'Proporción de azul en la luz',
  'metric.share.unitLabel': '% de proporción de azul',
  'stat.overallBrightness': 'Brillo general de la escena',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': 'Vista previa de la cámara',
  'camera.pressStart': 'Pulsa «Start».',
  'camera.start': 'Start',
  'camera.stop': 'Stop',
  'camera.switch': 'Cambiar de cámara',
  'camera.error': 'No se ha podido encender la cámara. Comprueba el permiso de cámara del navegador e inténtalo de nuevo. ({message})',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': 'Lecturas actuales',
  'disclaimer.short': 'Resultado aproximado. Esto no es un producto sanitario.',
  'disclaimer.more': 'Más',

  /* ---- wykresy ---- */

  'chart.aria': 'Gráficos a lo largo del tiempo',
  'chart.title': 'Gráficos a lo largo del tiempo (últimos {seconds} s)',
  'chart.empty': 'Enciende la cámara para ver el gráfico',
  'chart.axis.past': '-{seconds}s',
  'chart.axis.now': 'ahora',
  'chart.raw.aria': 'Gráfico del brillo del canal B a lo largo del tiempo, con las zonas segura, moderada y dañina marcadas',
  'chart.share.aria': 'Gráfico de la proporción de azul en la luz a lo largo del tiempo, con las zonas segura, moderada y dañina marcadas',

  /* ---- tabela odczytów ---- */

  'table.show': 'Ver como tabla',
  'table.hide': 'Ocultar la tabla',
  'table.caption': 'Últimas lecturas (la más reciente arriba)',
  'table.col.time': 'Hora',
  'table.col.zone': 'Zona',

  /* ---- ustawienia progów ---- */

  'settings.title': 'Ajustes de los umbrales de zona',
  'settings.boundary.critical': 'Límite amarillo / rojo:',
  'settings.boundary.warning': 'Límite verde / amarillo:',

  /* ---- historia i raport (features.js) ---- */

  'history.title': 'Historial e informe',
  'history.rangeAria': 'Rango del historial',
  'history.unavailable': 'Los datos del historial no están disponibles ahora mismo.',
  'history.empty': 'No hay lecturas guardadas en este rango. Empieza a medir — el historial se llena solo.',
  'history.savedReadings': 'Lecturas guardadas: {count}. Reparto del tiempo por zonas:',
  'history.zoneLine': '{zone}: {percent} % ({readings})',

  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 días',
  'range.30d': '30 días',

  'report.dailyTitle': 'Informe diario',
  'report.empty': 'El informe aparecerá cuando haya lecturas guardadas en el rango elegido.',
  'report.dailyCaption': 'Reparto del tiempo por zonas, día a día',
  'report.col.day': 'Día',
  'report.col.week': 'Semana',
  'report.col.readings': 'Lecturas',
  'report.compare.day': 'Comparación día a día: {day} — {percent} % del tiempo en la zona dañina, {change}',
  'report.compare.dayPending': 'La comparación día a día aparecerá después del segundo día de mediciones.',
  'report.compare.week': 'Comparación semana a semana: {week} — {percent} % del tiempo en la zona dañina, {change}',
  'report.compare.weekPending': 'La comparación semana a semana aparecerá después de la segunda semana de mediciones.',
  'report.change.same': 'igual que {other}.',
  'report.change.more': '{points} más que {other}.',
  'report.change.less': '{points} menos que {other}.',
  'report.peak': 'La mayoría de las lecturas en la zona dañina cayeron entre las {from} y las {to}.',
  'report.peak.none': 'En este rango no se ha guardado ninguna lectura en la zona dañina.',
  'report.weeklyTitle': 'Informe semanal',
  'report.weeklyEmpty': 'El informe semanal aparecerá cuando haya lecturas guardadas en el rango elegido.',
  'report.weeklyCaption': 'Reparto del tiempo por zonas, semana a semana',
  'report.weekLabel': 'Semana {week} ({year})',
  'report.footnote': 'Las cifras son la proporción de lecturas guardadas en el rango elegido, no el tiempo exacto de exposición.',

  /* ---- profile progów ---- */

  'profiles.title': 'Perfiles de umbrales',
  'profiles.empty': 'Todavía no has guardado ningún perfil.',
  'profiles.itemActive': '{name} (activo)',
  'profiles.applyAria': 'Aplicar el perfil {name}',
  'profiles.deleteAria': 'Eliminar el perfil {name}',
  'profiles.applied': 'Se ha aplicado el perfil «{name}».',
  'profiles.deleted': 'Se ha eliminado el perfil «{name}».',
  'profiles.saved': 'Se ha guardado el perfil «{name}».',
  'profiles.namePlaceholder': 'Nombre del perfil (por ejemplo, Tarde)',
  'profiles.saveLabel': 'Guardar los umbrales actuales como perfil',
  'profiles.saveBtn': 'Guardar el perfil',
  'profiles.needName': 'Escribe un nombre de perfil.',
  'profiles.limit': {
    one: 'Puedes guardar como máximo {n} perfil. Elimina uno para añadir otro.',
    many: 'Puedes guardar como máximo {n} de perfiles. Elimina uno para añadir otro.',
    other: 'Puedes guardar como máximo {n} perfiles. Elimina uno para añadir otro.'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku też — ale musi
     zostać bezpieczna dla systemu plików: bez ukośników, dwukropków
     i bez znaków diakrytycznych. */

  'csv.header': 'hora;brillo_B_pct;proporcion_azul_pct;brillo_escena_pct;zona',
  'csv.filename': 'monitor-de-luz-{stamp}.csv',
  'csv.empty': 'No hay lecturas que exportar. Empieza a medir e inténtalo de nuevo.',
  'csv.done': 'Se han exportado {readings} a un archivo CSV.',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut: po polsku wypada tam dopełniacz („od
     5 minut”), po hiszpańsku forma `many` dokłada przyimek „de” („1 millón DE
     minutos”) — tłumacz ma przed sobą całe zdanie, nie jego okrawek. */

  'alert.exposure': {
    one: 'Aviso de umbral: la lectura lleva {n} minuto en la zona dañina. Piensa en hacer una pausa o en bajar la proporción de azul de la pantalla.',
    many: 'Aviso de umbral: la lectura lleva {n} de minutos en la zona dañina. Piensa en hacer una pausa o en bajar la proporción de azul de la pantalla.',
    other: 'Aviso de umbral: la lectura lleva {n} minutos en la zona dañina. Piensa en hacer una pausa o en bajar la proporción de azul de la pantalla.'
  },

  'session.title': 'Resumen de la última sesión',
  'session.line': 'Tiempo de medición: {duration}. Lecturas guardadas: {count}.',
  'session.zoneLine': '{zone}: {percent} % del tiempo de la sesión.',
  'session.endedAt': 'El resumen corresponde a la sesión que terminó a las {time}.',
  'session.toast': 'Sesión terminada: {duration}, {readings}, {percent} % del tiempo en la zona dañina.',

  'duration.seconds': '{n} s',
  'duration.minutesSeconds': '{minutes} min {seconds} s',

  /* ---- liczebniki ----
     Hiszpański ma trzy kategorie CLDR: one (1), many (całkowite wielokrotności
     miliona w zapisie skróconym — „1 millón DE lecturas”, stąd przyimek „de”)
     i other (cała reszta, także ułamki: „1,5 lecturas”). Formę wybiera
     Intl.PluralRules('es'), nie nasza reguła. */

  'count.readings': { one: '{n} lectura', many: '{n} de lecturas', other: '{n} lecturas' },
  'count.points': {
    one: '{n} punto porcentual',
    many: '{n} de puntos porcentuales',
    other: '{n} puntos porcentuales'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': 'Más',
  'more.section.settings': 'AJUSTES',
  'more.section.help': 'AYUDA',
  'more.thresholds.title': 'Umbrales de aviso',
  'more.thresholds.sub': 'Fija los límites de las zonas segura, moderada y dañina.',
  'more.docs.title': 'Documentación',
  'more.docs.sub': 'Cómo funciona la medición, unidades, normas y zonas.',
  'more.about.title': 'Acerca de y contacto',
  'more.about.sub': 'Versión, privacidad y contacto.',
  'more.free': 'La aplicación es gratuita por completo.',
  'more.supportLink': 'Puedes apoyarla voluntariamente.',
  'more.version': 'Versión {version} · Todas las funciones disponibles sin cuenta y sin pagar nada',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': 'Acerca de y contacto',
  'about.version': 'Versión {version}',
  'about.what.title': 'Qué es esta aplicación',
  'about.what.p1': '{app} mide con la cámara del teléfono cuánta luz azul registra el sensor y lo muestra en dos diales y en gráficos con zonas. Todas las funciones — la medición, el historial, los informes, los perfiles de umbrales, el aviso de umbral, la exportación CSV y la documentación — están al alcance de cualquiera, sin cuenta y sin pagar nada.',
  'about.what.p2': 'La aplicación se ofrece «tal cual», para uso informativo. El resultado de una medición es aproximado y no es base para tomar decisiones de salud.',
  'about.privacy.title': 'Privacidad y datos',
  'about.privacy.p1': 'La imagen de la cámara se analiza únicamente en tu dispositivo y nunca se envía a ningún servidor. No creamos cuentas y no recogemos tus datos. Los ajustes de umbrales, los perfiles y el historial de mediciones se guardan solo en la memoria de este dispositivo y de este navegador.',
  'about.privacy.p2': 'La aplicación no muestra publicidad y no se comunica con la red. La única excepción es el botón de la pantalla «Apoyo»: cuando lo pulsas, el navegador abre una página externa en una pestaña nueva. No pasa nada hasta que lo haces tú.',
  'about.contact.title': 'Contacto',
  'about.contact.p1': 'Comentarios, errores y sugerencias: [E-MAIL]. Respondemos siempre que podemos — es un proyecto que se mantiene fuera de horas.',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': 'Apoyo',
  'support.free.title': 'Todo está disponible',
  'support.free.text': 'La aplicación entera es gratuita: la medición, el historial y los informes, los perfiles de umbrales, el aviso, la exportación CSV y la documentación. Todo funciona desde el primer momento, sin cuenta, sin límites y sin conexión a internet.',
  'support.why': '{app} se hace fuera de horas. Si te resulta útil, puedes invitarme a un café. Eso ayuda a mantener la aplicación y a llevarla más lejos — mejorar la medición, ampliar la documentación y comprobarla en más teléfonos.',
  'support.nothing': 'Una donación no desbloquea nada. No hay una versión mejor ni una peor — después de apoyar, la aplicación funciona exactamente igual. La única diferencia es que el autor sabe que a alguien le ha servido.',
  'support.button': 'Invítame a un café',
  'support.button.aria': 'Invítame a un café — abre el perfil de donaciones en una pestaña nueva',
  'support.pending': 'El perfil de donaciones todavía no está conectado. En cuanto lo esté, en este sitio habrá un botón. Hasta entonces no hay nada que hacer — la aplicación es gratuita por completo de todos modos.',
  'support.privacy': 'El botón abre una página externa (Buy Me a Coffee) en una pestaña nueva del navegador. Ese es el único momento en el que algo sale de este dispositivo. La imagen de la cámara y todas tus mediciones se quedan aquí — no se envían a ninguna parte, ni antes de pulsarlo ni después.',
  'support.privacyPending': 'Cuando la dirección esté disponible, al pulsar el botón se abrirá una página externa (Buy Me a Coffee) en una pestaña nueva del navegador. Ese será el único momento en el que algo salga de este dispositivo. La imagen de la cámara y todas tus mediciones se quedan aquí — no se envían a ninguna parte.',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem .html, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': 'Documentación',

  'disclaimer.title': 'Esto no es un producto sanitario',
  'disclaimer.body.docs': 'Esta aplicación no es un producto sanitario. No está destinada a diagnosticar, tratar ni prevenir ninguna enfermedad. Los resultados medidos con la cámara de un teléfono son aproximados y no sustituyen a un examen ni al consejo de un médico. En cuestiones de salud visual, consulta a un médico o a un optometrista. Los umbrales de zona de esta aplicación no reproducen ninguna norma de seguridad — los detalles, en el capítulo 3.',
  'disclaimer.body.about': 'Esta aplicación no es un producto sanitario. No está destinada a diagnosticar, tratar ni prevenir ninguna enfermedad. Los resultados medidos con la cámara de un teléfono son aproximados y no sustituyen a un examen ni al consejo de un médico. En cuestiones de salud visual, consulta a un médico o a un optometrista. Los umbrales de zona de esta aplicación no reproducen ninguna norma de seguridad — los detalles, en la documentación, capítulo 3.',

  'doc.toc.aria': 'Índice de la documentación',
  'doc.toc.title': 'Índice',

  'doc.ch1.title': 'Inicio rápido',
  'doc.ch2.title': 'Cómo funciona la medición',
  'doc.ch3.title': 'Unidades y normas',
  'doc.ch4.title': 'Zonas y umbrales',
  'doc.ch5.title': 'Diferencias entre dispositivos',

  'doc.ch1.heading': '1. Inicio rápido',
  'doc.ch2.heading': '2. Cómo funciona la medición',
  'doc.ch3.heading': '3. Unidades y normas',
  'doc.ch4.heading': '4. Zonas y umbrales',
  'doc.ch5.heading': '5. Diferencias entre dispositivos',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': 'Cómo medir con más acierto',
  'doc.ch1.tips.li1': 'En la pantalla «Cámara» (el primer botón de la barra inferior) pulsa «Start» y apunta con la cámara trasera a la pantalla o a la fuente de luz que quieras comprobar.',
  'doc.ch1.tips.li2': 'Pasa a la pantalla «Monitor» (el segundo botón de la barra inferior) — arriba verás los dos diales a la vez y, más abajo (desplázate), los gráficos de los cambios a lo largo del tiempo. La medición sigue funcionando en segundo plano, mires la pantalla que mires.',
  'doc.ch1.tips.li3': 'Coloca el teléfono a una distancia fija de la pantalla (15–20 cm, por ejemplo), sin cambiar la iluminación del entorno durante la medición.',
  'doc.ch1.tips.li4': 'Usa la cámara trasera — sus correcciones automáticas son menos agresivas que las de la frontal.',
  'doc.ch1.tips.li5': 'Trata los resultados como indicadores relativos (%), no como unidades físicas absolutas — compáralos entre sí (por ejemplo, con el modo nocturno activado y desactivado).',
  'doc.ch1.tips.li6': 'Ajusta los umbrales de zona en los ajustes al brillo de tu propia pantalla (capítulo 4).',

  'doc.ch1.fonts.title': 'Letra grande y diales — siempre',
  'doc.ch1.fonts.p1': 'Toda la aplicación usa una letra grande y legible y diales a tamaño completo, para que las personas con baja visión (y todas las demás) puedan leer los datos sin ajustes adicionales. En la pantalla «Monitor» los dos diales caben juntos en una sola pantalla, sin desplazarse — los gráficos de los cambios a lo largo del tiempo están justo debajo, a un desplazamiento de distancia.',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': 'La cámara de un teléfono frente a un espectrómetro',
  'doc.ch2.spectro.p1.html': 'Medir de verdad «cuánta luz azul dañina hay» exige descomponer la luz en longitudes de onda — eso es justo lo que hace un <b>espectrómetro</b>: un prisma o una red de difracción dispersa la luz en decenas o centenares de bandas estrechas (cada 1–5 nm, por ejemplo) y mide la potencia óptica de cada una por separado. Solo a partir de esa distribución espectral completa se calculan unidades como el lux, el lumen o la irradiancia ponderada por la función de riesgo de la luz azul.',
  'doc.ch2.spectro.p2.html': '<b>La cámara de un teléfono no hace nada de eso.</b> Tiene tres filtros anchos (Bayer: R/G/B), cada uno de los cuales recoge luz de un rango amplio y solapado de longitudes de onda — el «canal azul» no es una banda estrecha en torno a 435–440 nm (el pico del riesgo para la retina), sino más o menos 400–570 nm mezclados con el verde. A eso se añaden el desmosaicado, la exposición automática, el balance de blancos automático y la compresión gamma sRGB — el navegador no deja desactivar por completo ninguno de esos pasos. El resultado es que el valor de píxel que ve JavaScript no guarda una relación lineal con la potencia óptica real que llega al sensor. Es una limitación fundamental del hardware, no un fallo de esta aplicación.',

  'doc.ch2.raw.title': 'Gráfico 1 — Brillo del canal B',
  'doc.ch2.raw.what.html': '<b>Qué muestra:</b> el brillo medio del canal azul (B) por sí solo en la parte muestreada de la imagen, en una escala de 0–255 convertida a %.',
  'doc.ch2.raw.algo.html': '<b>El algoritmo:</b>',
  'doc.ch2.raw.step1': 'Tomamos un fotograma de la cámara 5 veces por segundo.',
  'doc.ch2.raw.step2': 'Recortamos el 60 % central del encuadre (así se evitan los bordes de la imagen y los reflejos de los lados).',
  'doc.ch2.raw.step3': 'Escalamos el fragmento recortado a una retícula de 32×32 píxeles (bastante preciso y mucho más rápido que calcular a resolución completa — algo que importa en equipos menos potentes, como los Xiaomi o Ulefone de gama económica).',
  'doc.ch2.raw.step4': 'Promediamos el valor B de los 1024 píxeles de esa retícula.',
  'doc.ch2.raw.step5.html': '<code>resultado = media_B ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>Por qué lo hemos dejado:</b> es la lectura más sencilla y directa de «cuánta señal azul registra el sensor en total». Su punto débil es que mezcla el brillo con el color — una escena muy luminosa, pero blanca y neutra, también dará un valor alto aunque no sea especialmente «azul». Por eso mostramos el gráfico 2 a su lado.',

  'doc.ch2.share.title': 'Gráfico 2 — Proporción de azul en la luz',
  'doc.ch2.share.what.html': '<b>Qué muestra:</b> qué porcentaje de toda la luz registrada (R+G+B) supone la componente azul — es decir, el desplazamiento del color hacia el frío, independientemente de lo luminosa que sea la escena.',
  'doc.ch2.share.algo.html': '<b>El algoritmo:</b> los mismos pasos 1–4 de arriba, pero en lugar de la B sola calculamos:',
  'doc.ch2.share.formula.html': '<code>resultado = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': 'El blanco neutro (R≈G≈B) da alrededor del <b>33 %</b>. La luz más cálida o más roja da menos. La luz muy azul da más, hasta un límite de ~100 % con luz casi puramente azul.',
  'doc.ch2.share.why.html': '<b>Por qué esta es la medida más precisa de la «luz azul dañina»:</b> es el mismo principio con el que funcionan los filtros del tipo modo nocturno o Night Shift — lo que cuenta es el <b>color</b>, no el brillo. Una pantalla muy luminosa, pero neutra, no quedará marcada falsamente como dañina; una atenuada, pero muy azul, sí. Por eso es esta magnitud la que decide el color de la zona en la tabla de lecturas.',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': 'Por qué no lux ni lúmenes',
  'doc.ch3.units.p1.html': 'El <b>lumen (lm)</b> describe el flujo luminoso total que emite una fuente — es una propiedad de la fuente misma, no de lo que llega a un punto dado. El <b>lux (lx)</b> ya es la iluminancia en un punto (lm/m²) — más cerca de lo que buscamos, pero sigue siendo una unidad <b>fotométrica</b>: pondera el espectro con la curva de sensibilidad del ojo humano al brillo (V(λ)), no con la curva de riesgo de la luz azul. Medir de verdad el riesgo exige una tercera unidad, más estrecha: la irradiancia ponderada espectralmente en <b>W/m²</b> (norma IEC 62471, con el pico de sensibilidad en torno a 435–440 nm), y eso requiere un espectrómetro — véase la sección anterior.',
  'doc.ch3.units.p2.html': 'Incluso si nos conformáramos con los lux: un teléfono sin un sensor de luz externo y calibrado no puede determinarlos de forma fiable. El sensor de luz integrado del teléfono (allí donde lo hay) mide además la luz del <b>lado opuesto</b> de la carcasa a aquel con el que apuntas a la pantalla con la cámara trasera — o sea, mediría la luz que tienes a tu espalda, no la de la pantalla. Por eso, en lugar de adivinar una cifra en una unidad que de todas formas no sería fiable, mostramos un <b>indicador relativo (%)</b> descrito con honestidad — con sentido para comparar en el mismo teléfono y en las mismas condiciones (por ejemplo, con el modo nocturno activado y desactivado), no como valor absoluto.',

  'doc.ch3.norms.title': '¿Existen normas globales para los umbrales de seguridad?',
  'doc.ch3.norms.p1.html': 'En pocas palabras: <b>no hay ninguna norma expresada en porcentaje de un canal de la cámara</b> — eso no es en absoluto una unidad en la que se regule nada. Normas reales sobre la luz azul sí existen, pero miden otras magnitudes, en otras unidades, y se refieren a un fenómeno distinto del que solemos tener en mente al decir «la luz azul cansa la vista».',
  'doc.ch3.norms.p2.html': '<b>Daño fotoquímico agudo de la retina — IEC 62471 / ICNIRP.</b> El único «riesgo por luz azul» realmente regulado — una norma para lámparas y sistemas de iluminación, respaldada por las directrices de la ICNIRP (International Commission on Non-Ionizing Radiation Protection). Clasifica las fuentes en grupos de riesgo RG0–RG3 a partir de la radiancia ponderada por la función de riesgo B(λ), en <b>W·m⁻²·sr⁻¹</b>, con un límite de tiempo de exposición (<code>t_max = 100 / L_B</code> segundos). Las pantallas de teléfonos y monitores — incluso al brillo máximo — caen en la práctica siempre en <b>RG0 (exento, sin restricciones)</b>. Esa norma se refiere a fuentes mucho más intensas (arcos de soldadura, algunos proyectores, LED industriales), no a pantallas de consumo.',
  'doc.ch3.norms.p3.html': '<b>Efecto sobre el ritmo circadiano y el sueño — CIE S 026.</b> Este es el fenómeno del que se suele hablar (la pantalla por la tarde «despeja») — pero no es un daño en el ojo, sino un efecto sobre el reloj biológico a través de las células ganglionares de la retina (ipRGC), más sensibles en torno a 480 nm. La norma CIE S 026:2018 define la unidad <b>lux melanópico (melanopic EDI)</b>. Lo más parecido a un consenso científico «oficial» es el artículo de Brown y coautores (<i>PLOS Biology</i>, 2022), que recomienda a modo orientativo: por la tarde &lt; 10 lux melanópicos y de día &gt; 250. Son recomendaciones de investigadores del sueño, no una norma legal.',
  'doc.ch3.norms.p4.html': '<b>La OMS.</b> La Organización Mundial de la Salud no publica límites de exposición propios e independientes para la luz azul — en seguridad de la radiación óptica remite a la ICNIRP (arriba). El único documento concreto y de autoría propia de la OMS sobre pantallas son las <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i> (2019) — que, sin embargo, se refieren al <b>tiempo</b> pasado ante una pantalla, no al color ni a la intensidad de la luz: nada de pantalla antes del primer año de vida y un máximo de 1 hora entre los 2 y los 4 años. Para los adultos la OMS no tiene orientaciones numéricas igual de concretas.',
  'doc.ch3.norms.p5.html': '<b>Por qué nada de eso ayuda a calibrar la aplicación:</b> ambas familias de normas (IEC/ICNIRP y CIE) exigen una distribución espectral completa y una radiancia calibrada en una geometría de medición conocida — justo lo que un teléfono no puede dar a través del navegador (véase la sección «La cámara de un teléfono frente a un espectrómetro», arriba). No existe ninguna conversión del tipo «33 % de proporción de azul = X lux melanópicos», así que los umbrales de esta aplicación <b>no reproducen ninguna norma de seguridad</b> (OMS, IEC, ICNIRP o CIE — para este indicador sencillamente no existe). Los valores por defecto del umbral de proporción de azul sí están, en cambio, deducidos de temperaturas de color reales de la luz y de la recomendación práctica, repetida por todas partes, de usar luz cálida por la tarde — una base más sólida que un simple redondeo, pero aún así no una norma formal (la deducción completa está en el capítulo 4). Siempre puedes cambiarlos por los tuyos en los ajustes.',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': 'Las zonas de color y de dónde salen los umbrales',
  'doc.ch4.zones.p1.html': 'Las dos magnitudes tienen sus propios umbrales, ajustables por separado (pantalla «Monitor» → «Ajustes de los umbrales de zona», al final de la página) — un 33 %/66 % en una no significa lo mismo que en la otra (véase el capítulo 2, arriba). Es la <b>proporción de azul</b> la que decide el color en la leyenda bajo los gráficos y en la tabla de lecturas:',
  'doc.ch4.zones.li1.html': '<b>Verde — segura:</b> luz cálida o neutra, los ojos descansan.',
  'doc.ch4.zones.li2.html': '<b>Amarilla — moderada:</b> un desplazamiento apreciable hacia el azul, conviene hacer pausas.',
  'doc.ch4.zones.li3.html': '<b>Roja — dañina:</b> luz muy azul, cansa mucho la vista en exposiciones largas (sobre todo por la tarde).',
  'doc.ch4.zones.p2.html': '<b>De dónde salen estas cifras concretas.</b> El <b>brillo del canal B</b> no tiene un punto de referencia natural — un valor de umbral con sentido depende únicamente de lo luminosa que sea la escena que estás filmando (es una medida de brillo, no de color). El 33 %/66 % por defecto sigue siendo aquí un punto de partida convencional — ajústalo a base de pruebas al brillo habitual de tu pantalla y de tu entorno.',
  'doc.ch4.zones.p3.html': 'La <b>proporción de azul</b> tiene unos umbrales por defecto deducidos de temperaturas de color reales de la luz (física, no un redondeo), no de ninguna norma de seguridad — para esta magnitud no existe tal norma (capítulo 3). Los puntos de referencia:',
  'doc.ch4.zones.li4.html': '<b>~4000K</b> («blanco cálido», una bombilla LED típica) → alrededor del <b>26 %</b> de proporción de azul. La luz más cálida que esa (con una temperatura de color más baja) es el rango que herramientas como f.lux o Night Shift recomiendan ampliamente para la tarde — de ahí el umbral inferior.',
  'doc.ch4.zones.li5.html': '<b>6500K (D65)</b>, el punto de blanco estándar de la mayoría de las pantallas de teléfonos y monitores de fábrica — alrededor del <b>33 %</b>. De ese valor hacia arriba empieza el rango en el que se suelen aplicar las recomendaciones de limitar la luz azul — de ahí el umbral superior.',
  'doc.ch4.zones.p4.html': '<b>Una salvedad importante:</b> lo «azul» que sea la luz no depende de la hora del día, pero las recomendaciones de limitar la luz azul se refieren en realidad solo a la <b>tarde y la noche</b> — de día, la exposición a luz fría y azul (también la del sol) es normal, e incluso buena para el ritmo circadiano. Una zona roja en pleno día mirando una pantalla normal y sin modificar no significa un riesgo real — esa misma luz por la tarde sí vale la pena limitarla.',
  'doc.ch4.zones.p5.html': 'Los umbrales de las dos magnitudes son totalmente independientes — cambiar uno no afecta al otro. Los umbrales cambiados <b>se recuerdan en este dispositivo y en este navegador</b> entre una apertura de la aplicación y la siguiente (localmente; no se envía nada a ninguna parte) — el botón «Start» no los devuelve a los valores por defecto.',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': 'Por qué la vista previa se ve distinta en cada dispositivo',
  'doc.ch5.devices.p1.html': '<b>El navegador frente a la aplicación de cámara nativa.</b> Cuando abres la cámara que viene instalada de fábrica en el teléfono, el fabricante (Xiaomi, por ejemplo) añade a la vista previa en directo sus propios algoritmos propietarios — HDR en tiempo real, refuerzo digital del brillo con poca luz, suavizado. Una página web recibe a través del navegador un flujo de la cámara mucho más «crudo» (la función <code>getUserMedia</code>), sin ninguna de esas mejoras — así que, por principio, se verá más plana y más oscura que la cámara nativa, sea cual sea el teléfono.',
  'doc.ch5.devices.p2.html': '<b>Distintas posibilidades de control de la cámara.</b> Cuánto control sobre la exposición y el balance de blancos recibe el navegador del sistema depende del teléfono concreto, del controlador de la cámara y de la versión de Chrome o de WebView — unos dispositivos (normalmente ordenadores con una cámara USB) declaran solo el automatismo completo, otros (algunos teléfonos Android) declaran modos adicionales más avanzados. Una versión anterior de esta aplicación intentaba pasar al modo de exposición manual allí donde el teléfono lo permitía, sin fijar un valor concreto — lo que en parte de los teléfonos congelaba la imagen en una exposición oscura y aleatoria del momento de arrancar la cámara. Fue un fallo del código (ya corregido), no una diferencia de unidades — pero muestra bien lo fácil que es que el comportamiento cambie de un dispositivo a otro, si hasta la misma línea de código se activa solo en algunos de ellos.',
  'doc.ch5.devices.p3.html': '<b>Distintos sensores y procesado de imagen (ISP).</b> Incluso con un código idéntico y la misma escena, los distintos modelos de teléfono tienen sensores de calidad distinta y automatismos del fabricante ajustados de otra manera — uno acertará con la exposición con poca luz más rápido y mejor que otro. Eso, unido a que los indicadores de esta aplicación son <b>relativos</b> (véase el capítulo 3), significa que los resultados (y el aspecto de la vista previa) tiene sentido compararlos en el mismo teléfono a lo largo del tiempo, no entre modelos o dispositivos distintos.'
});
